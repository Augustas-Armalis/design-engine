#!/usr/bin/env node
// logo_measure.mjs: measure the construction of a logo mark SVG and check it against system/logo/anatomy.json.
// Usage: node tools/logo_measure.mjs <mark.svg> [more.svg ...] [--mode alpha|dark|light] [--renders <dir>] [--json <out.json>]
//   mode: alpha = every painted pixel is ink (default); dark = white fills are knock-outs; light = measure the white glyph on a coloured tile.
// The SVG is treated as data: scripts, handlers, foreignObject and external refs are stripped, and it renders under a no-script CSP.
// Metrics are those of knowledge/web/logo-anatomy-measured.md (32 reference marks, 2026-10-09).
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Treat downloaded SVG as data: drop scripts, event handlers, foreignObject, external references.
function sanitize(s) {
  return s
    .replace(/<\?xml[^>]*>/g, '').replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<script[^>]*\/>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\s on[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, ' ')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, '')
    .replace(/(xlink:href|href)\s*=\s*("(?:https?:|javascript:)[^"]*"|'(?:https?:|javascript:)[^']*')/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

const CSP = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:">`;

// Put the svg inline at long side L (keeping viewBox aspect), page origin 0,0.
async function renderInline(page, svgText, L) {
  await page.setContent(`<!doctype html><html><head>${CSP}<style>html,body{margin:0;padding:0;background:transparent}#h{position:absolute;left:0;top:0;line-height:0}</style></head><body><div id="h">${svgText}</div></body></html>`);
  return page.evaluate((L) => {
    const svg = document.querySelector('#h > svg');
    let vb = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal : null;
    if (!vb) {
      const w = parseFloat(svg.getAttribute('width')) || svg.getBBox().width, h = parseFloat(svg.getAttribute('height')) || svg.getBBox().height;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`); vb = svg.viewBox.baseVal;
    }
    const ar = vb.width / vb.height;
    const W = ar >= 1 ? L : Math.round(L * ar), H = ar >= 1 ? Math.round(L / ar) : L;
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.style.width = W + 'px'; svg.style.height = H + 'px'; svg.style.display = 'block'; svg.style.overflow = 'hidden';
    return { W, H, vb: [vb.x, vb.y, vb.width, vb.height] };
  }, L);
}

function decode(buf) { return PNG.sync.read(buf); }
function encodeGray(w, h, gray) { // gray: Float32 0..1 ink amount -> black on white
  const png = new PNG({ width: w, height: h });
  for (let i = 0; i < w * h; i++) { const v = Math.round(255 * (1 - gray[i])); png.data[i * 4] = png.data[i * 4 + 1] = png.data[i * 4 + 2] = v; png.data[i * 4 + 3] = 255; }
  return PNG.sync.write(png);
}

function lum(r, g, b) { const f = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }

function maskFrom(png, mode) {
  const { width: w, height: h, data } = png; const m = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const a = data[i * 4 + 3]; if (a < 128) continue;
    const L = lum(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
    if (mode === 'alpha') m[i] = 1; else if (mode === 'dark') m[i] = L < 0.8 ? 1 : 0; else if (mode === 'light') m[i] = L >= 0.8 ? 1 : 0;
  }
  return m;
}

function bbox(m, w, h) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (m[y * w + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return { x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}


const INF = 1e20;

// ---------- EDT (Felzenszwalb) ----------
function edt1d(f, n, d, v, z) {
  let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
    k++; v[k] = q; z[k] = s; z[k + 1] = INF;
  }
  k = 0; for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
}
// squared distance from each pixel to nearest pixel where seed==1
function edtTo(seed, w, h) {
  const g = new Float64Array(w * h); for (let i = 0; i < w * h; i++) g[i] = seed[i] ? 0 : INF;
  const n = Math.max(w, h), f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) f[y] = g[y * w + x]; edt1d(f, h, d, v, z); for (let y = 0; y < h; y++) g[y * w + x] = d[y]; }
  for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) f[x] = g[y * w + x]; edt1d(f, w, d, v, z); for (let x = 0; x < w; x++) g[y * w + x] = d[x]; }
  return g;
}
// local thickness (diameter of largest inscribed disk containing p) by granulometry
function localThickness(S, w, h) {
  const T = new Float32Array(w * h);
  const outside = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) outside[i] = S[i] ? 0 : 1;
  const din = edtTo(outside, w, h); // squared dist to nearest outside pixel
  let maxd = 0; for (let i = 0; i < w * h; i++) if (S[i] && din[i] > maxd) maxd = din[i];
  maxd = Math.sqrt(maxd);
  const radii = []; for (let r = 0.5; r <= Math.min(6, maxd); r += 0.5) radii.push(r); let r = 6; while (r < maxd) { r *= 1.07; radii.push(Math.min(r, maxd)); }
  const E = new Uint8Array(w * h);
  for (const r of radii) {
    let any = 0; for (let i = 0; i < w * h; i++) { E[i] = S[i] && din[i] > r * r ? 1 : 0; any |= E[i]; }
    if (!any) break;
    const dd = edtTo(E, w, h); const rr = (r + 0.5) * (r + 0.5);
    for (let i = 0; i < w * h; i++) if (S[i] && dd[i] <= rr) T[i] = 2 * r + 1;
  }
  for (let i = 0; i < w * h; i++) if (S[i] && T[i] === 0) T[i] = 1;
  return T;
}
function pct(vals, ps) { const a = Float32Array.from(vals).sort(); return ps.map(p => a.length ? a[Math.min(a.length - 1, Math.floor(p / 100 * a.length))] : null); }

// ---------- connected components ----------
function components(M, w, h, conn8 = true, minArea = 0) {
  const lab = new Int32Array(w * h); let n = 0; const areas = []; const st = new Int32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (!M[i] || lab[i]) continue; n++; let sp = 0, a = 0; st[sp++] = i; lab[i] = n;
    while (sp) { const p = st[--sp]; a++; const x = p % w, y = (p / w) | 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; if (!conn8 && dx && dy) continue; const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue; const q = yy * w + xx; if (M[q] && !lab[q]) { lab[q] = n; st[sp++] = q; } } }
    areas.push(a);
  }
  return { count: areas.filter(a => a >= minArea).length, areas, lab };
}
function holes(M, w, h, minArea) { // background components not touching border
  const B = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) B[i] = M[i] ? 0 : 1;
  const { lab, areas } = components(B, w, h, false);
  const border = new Set(); for (let x = 0; x < w; x++) { border.add(lab[x]); border.add(lab[(h - 1) * w + x]); } for (let y = 0; y < h; y++) { border.add(lab[y * w]); border.add(lab[y * w + w - 1]); }
  let c = 0; areas.forEach((a, i) => { if (!border.has(i + 1) && a >= minArea) c++; }); return c;
}
// crop + pad mask
function cropPad(M, w, h, bb, pad) {
  const W = bb.w + 2 * pad, H = bb.h + 2 * pad, o = new Uint8Array(W * H);
  for (let y = 0; y < bb.h; y++) for (let x = 0; x < bb.w; x++) o[(y + pad) * W + x + pad] = M[(y + bb.y0) * w + x + bb.x0];
  return { M: o, w: W, h: H };
}
// area-average downsample of a binary mask into N x N canvas, mark fit to long side = N*fill
function downsample(M, w, h, N, fill = 1) {
  const bb = bbox(M, w, h); const s = (N * fill) / Math.max(bb.w, bb.h);
  const out = new Float32Array(N * N); const offX = (N - bb.w * s) / 2, offY = (N - bb.h * s) / 2;
  const sub = 4; // supersample each source pixel
  for (let y = bb.y0; y <= bb.y1; y++) for (let x = bb.x0; x <= bb.x1; x++) {
    if (!M[y * w + x]) continue;
    for (let sy = 0; sy < sub; sy++) for (let sx = 0; sx < sub; sx++) {
      const tx = Math.floor(offX + (x - bb.x0 + (sx + 0.5) / sub) * s), ty = Math.floor(offY + (y - bb.y0 + (sy + 0.5) / sub) * s);
      if (tx >= 0 && ty >= 0 && tx < N && ty < N) out[ty * N + tx] += 1 / (sub * sub);
    }
  }
  const area = 1 / (s * s); for (let i = 0; i < N * N; i++) out[i] = Math.min(1, out[i] / area);
  return { gray: out, scale: s };
}
function iou(A, B, n) { let i = 0, u = 0; for (let k = 0; k < n; k++) { if (A[k] && B[k]) i++; if (A[k] || B[k]) u++; } return u ? i / u : 0; }
function transformMask(M, w, h, fn) { const o = new Uint8Array(w * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const [sx, sy] = fn(x + 0.5, y + 0.5); const xi = Math.floor(sx), yi = Math.floor(sy); if (xi >= 0 && yi >= 0 && xi < w && yi < h) o[y * w + x] = M[yi * w + xi]; } return o; }
function convexHullMask(M, w, h) {
  const pts = []; for (let y = 0; y < h; y++) { let a = -1, b = -1; for (let x = 0; x < w; x++) if (M[y * w + x]) { if (a < 0) a = x; b = x; } if (a >= 0) { pts.push([a, y], [b + 1, y], [a, y + 1], [b + 1, y + 1]); } }
  pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = []; for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  const hull = lo.slice(0, -1).concat(up.slice(0, -1));
  const o = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const p = [x + 0.5, y + 0.5]; let ins = true; for (let i = 0; i < hull.length; i++) { if (cr(hull[i], hull[(i + 1) % hull.length], p) < 0) { ins = false; break; } } o[y * w + x] = ins ? 1 : 0; }
  return o;
}

// ---------- vector outline sampling (in page) ----------
function sampleOutlines(mode) {
  const svg = document.querySelector('#h > svg'); const R = svg.getBoundingClientRect();
  for (const u of Array.from(svg.querySelectorAll('use'))) {
    if (u.closest('defs,symbol,clipPath,mask')) continue;
    const href = (u.getAttribute('href') || u.getAttribute('xlink:href') || '').slice(1); const t = href && document.getElementById(href); if (!t) continue;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const x = parseFloat(u.getAttribute('x') || 0), y = parseFloat(u.getAttribute('y') || 0);
    g.setAttribute('transform', (u.getAttribute('transform') || '') + ` translate(${x},${y})`);
    if (u.getAttribute('style')) g.setAttribute('style', u.getAttribute('style'));
    for (const c of (t.tagName.toLowerCase() === 'symbol' ? Array.from(t.childNodes) : [t])) g.appendChild(c.cloneNode(true));
    u.replaceWith(g);
  }
  const lumOf = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return { L: 0.2126 * f(p[0]) + 0.7152 * f(p[1]) + 0.0722 * f(p[2]), a: p.length > 3 ? p[3] : 1 }; };
  const els = Array.from(svg.querySelectorAll('path,rect,circle,ellipse,line,polyline,polygon')).filter(el => !el.closest('defs,clipPath,mask,symbol,pattern,marker'));
  const out = []; const kinds = { fill: 0, stroke: 0, both: 0, skipped: 0 }; const colours = new Set(); let gradient = false;
  for (const el of els) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) { kinds.skipped++; continue; }
    const hasFill = cs.fill !== 'none' && parseFloat(cs.fillOpacity) > 0;
    const hasStroke = cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0 && parseFloat(cs.strokeOpacity) > 0;
    if (!hasFill && !hasStroke) { kinds.skipped++; continue; }
    if (/url\(/.test(cs.fill) || /url\(/.test(cs.stroke)) gradient = true;
    const fl = lumOf(cs.fill);
    if (hasFill && !hasStroke && fl) {
      if (fl.a === 0) { kinds.skipped++; continue; }
      if (mode === 'dark' && fl.L >= 0.8) { kinds.skipped++; continue; }
      if (mode === 'light' && fl.L < 0.8) { kinds.skipped++; continue; }
    }
    if (hasFill) colours.add(cs.fill); if (hasStroke) colours.add(cs.stroke);
    kinds[hasFill && hasStroke ? 'both' : hasFill ? 'fill' : 'stroke']++;
    let L; try { L = el.getTotalLength(); } catch { continue; }
    if (!(L > 0)) continue;
    const M = el.getScreenCTM(); const sc = Math.sqrt(Math.abs(M.a * M.d - M.b * M.c));
    const n = Math.min(40000, Math.ceil(L * sc / 1.0));
    const pts = [];
    for (let i = 0; i <= n; i++) { const p = el.getPointAtLength(L * i / n).matrixTransform(M); pts.push([+(p.x - R.left).toFixed(3), +(p.y - R.top).toFixed(3)]); }
    out.push({ tag: el.tagName, stroke: hasStroke ? parseFloat(cs.strokeWidth) * sc : 0, fill: hasFill, pts });
  }
  return { out, kinds, colours: Array.from(colours), gradient, W: R.width, H: R.height };
}

const wrap = a => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
function analyseOutline(vec, bb) {
  const H = bb.h; // px
  const segsAll = []; let totalLen = 0; const angleHist = new Float64Array(180); let sharp = 0; const rounded = []; const arcs = []; let straightLen = 0, arcLen = 0;
  for (const el of vec.out) {
    // split into subpaths at jumps; drop points outside the mark bbox (lockup residue)
    let cur = []; const subs = [];
    for (const p of el.pts) {
      const inside = p[0] >= bb.x0 - 2 && p[0] <= bb.x1 + 3 && p[1] >= bb.y0 - 2 && p[1] <= bb.y1 + 3;
      if (!inside) { if (cur.length > 4) subs.push(cur); cur = []; continue; }
      if (cur.length && Math.hypot(p[0] - cur[cur.length - 1][0], p[1] - cur[cur.length - 1][1]) > 3) { if (cur.length > 4) subs.push(cur); cur = []; }
      if (!cur.length || Math.hypot(p[0] - cur[cur.length - 1][0], p[1] - cur[cur.length - 1][1]) > 0.2) cur.push(p);
    }
    if (cur.length > 4) subs.push(cur);
    for (let P of subs) {
      if (P.length < 6) continue;
      let len0 = 0; for (let i = 0; i < P.length - 1; i++) len0 += Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]);
      const closed = Math.hypot(P[0][0] - P[P.length - 1][0], P[0][1] - P[P.length - 1][1]) < 1.5;
      if (closed) P = P.concat(P.slice(1, 12));
      const n = P.length;
      const ds = []; const th = [];
      for (let i = 0; i < n - 1; i++) { const dx = P[i + 1][0] - P[i][0], dy = P[i + 1][1] - P[i][1]; ds.push(Math.hypot(dx, dy)); th.push(Math.atan2(-dy, dx)); }
      const len = len0; totalLen += len;
      // sharp corners: turning > 25deg concentrated within <= 2 steps
      const turn = th.map((t, i) => i ? wrap(t - th[i - 1]) : 0);
      const isCorner = new Uint8Array(th.length);
      for (let i = 1; i < th.length; i++) {
        if (Math.abs(turn[i]) > 0.21) { let j = i, tot = 0; while (j < th.length && Math.abs(turn[j]) > 0.21 && j - i < 3) { tot += turn[j]; j++; } if (j - i <= 2 && Math.abs(tot) > 0.44) { sharp++; for (let k = Math.max(0, i - 3); k < Math.min(th.length, j + 3); k++) isCorner[k] = 1; } i = j; }
      }
      // smoothed curvature
      const k = 3; const kap = new Float64Array(th.length).fill(NaN);
      for (let i = k; i < th.length - k; i++) { if (isCorner[i]) continue; let a = 0; for (let j = i - k + 1; j <= i + k; j++) a += turn[j]; let s = 0; for (let j = i - k; j < i + k; j++) s += ds[j]; kap[i] = s ? a / s : 0; }
      // greedy segmentation by curvature
      let i = 0; const segs = [];
      while (i < th.length) {
        if (isNaN(kap[i])) { i++; continue; }
        let j = i, sum = 0, cnt = 0, sl = 0, st = 0;
        while (j < th.length && !isNaN(kap[j])) { const mean = cnt ? sum / cnt : kap[j]; if (cnt > 3 && Math.abs(kap[j] - mean) > 0.3 * Math.abs(mean) + 0.25 / H) break; sum += kap[j]; cnt++; sl += ds[j]; st += turn[j]; j++; }
        const mk = sum / cnt; const dir = (() => { let sx = 0, sy = 0; for (let q = i; q < j; q++) { sx += Math.cos(2 * th[q]) * ds[q]; sy += Math.sin(2 * th[q]) * ds[q]; } return ((Math.atan2(sy, sx) / 2) * 180 / Math.PI + 180) % 180; })();
        segs.push({ len: sl, kap: mk, turn: st, dir, r: Math.abs(mk) > 1e-9 ? 1 / Math.abs(mk) : Infinity });
        i = j;
      }
      const fix = len / ds.reduce((a, b) => a + b, 0); segs.forEach(g => g.len *= fix);
      for (let s = 0; s < segs.length; s++) {
        const g = segs[s];
        if (g.r > 3 * H || Math.abs(g.turn) < 0.035 && g.len > 0.02 * H) { g.type = 'line'; straightLen += g.len; const d = Math.round(g.dir) % 180; angleHist[d] += g.len; }
        else if (Math.abs(g.turn) >= 0.17 && g.len >= 0.01 * H) { g.type = 'arc'; arcLen += g.len; arcs.push({ r: g.r / H, len: g.len, turn: Math.abs(g.turn) }); }
        else g.type = 'free';
      }
      for (let s = 0; s < segs.length; s++) {
        const g = segs[s]; if (g.type !== 'arc') continue;
        const nb = (dir) => { let q = s + dir, skipped = 0; for (let c = 0; c < 6; c++) { const idx = (q + segs.length) % segs.length; const x = segs[idx]; if (!x || idx === s) return null; if (x.type === 'line') return x; if (x.len > 0.03 * H) return null; skipped += Math.abs(x.turn); q += dir; } return null; };
        const a = nb(-1), b = nb(1);
        const t = Math.abs(g.turn) * 180 / Math.PI;
        if (t >= 30 && t <= 200 && g.r / H < 0.25 && a && b && a.len > 0.02 * H && b.len > 0.02 * H) rounded.push(g.r / H);
      }
      segsAll.push(...segs);
    }
  }
  // angle peaks
  const peaks = []; const hist = Array.from(angleHist);
  const sm = hist.map((_, d) => hist[(d + 179) % 180] + hist[d] + hist[(d + 1) % 180] + 0.5 * (hist[(d + 178) % 180] + hist[(d + 2) % 180]));
  const used = new Uint8Array(180);
  for (let t = 0; t < 6; t++) { let best = -1, bd = -1; for (let d = 0; d < 180; d++) if (!used[d] && sm[d] > best) { best = sm[d]; bd = d; } if (bd < 0 || best <= 0) break; let share = 0; for (let e = -3; e <= 3; e++) { const q = (bd + e + 180) % 180; share += used[q] ? 0 : hist[q]; used[q] = 1; } if (share / (straightLen || 1) < 0.04) continue; peaks.push({ deg: bd, share: +(share / straightLen).toFixed(3) }); }
  const fam = { orth: 0, d45: 0, d30_60: 0, other: 0 };
  hist.forEach((v, d) => { const m15 = Math.min(d % 15, 15 - d % 15); const m = d % 90; if (Math.min(m, 90 - m) <= 2) fam.orth += v; else if (Math.abs(m - 45) <= 2) fam.d45 += v; else if (Math.min(Math.abs(m - 30), Math.abs(m - 60)) <= 2) fam.d30_60 += v; else fam.other += v; });
  for (const key in fam) fam[key] = straightLen ? +(fam[key] / straightLen).toFixed(3) : 0;
  // arc radius clusters
  arcs.sort((a, b) => a.r - b.r); const cl = [];
  for (const a of arcs) { const c = cl.find(c => Math.abs(Math.log(a.r / c.r)) < 0.1); if (c) { c.r = (c.r * c.len + a.r * a.len) / (c.len + a.len); c.len += a.len; c.turn += a.turn; } else cl.push({ ...a }); }
  const radii = cl.filter(c => c.len / (arcLen || 1) >= 0.05).sort((a, b) => b.len - a.len).slice(0, 5).map(c => ({ rPctH: +(c.r * 100).toFixed(1), share: +(c.len / arcLen).toFixed(2), turnDeg: Math.round(c.turn * 180 / Math.PI) }));
  rounded.sort((a, b) => a - b);
  return {
    outlineLenPerH: +(totalLen / H).toFixed(1),
    straightShare: +(straightLen / totalLen).toFixed(3), arcShare: +(arcLen / totalLen).toFixed(3), freeShare: +(1 - (straightLen + arcLen) / totalLen).toFixed(3),
    sharpCorners: sharp, roundedCorners: rounded.length, cornerRadiusPctH: rounded.length ? +(rounded[Math.floor(rounded.length / 2)] * 100).toFixed(1) : null,
    anglePeaks: peaks, angleFamilies: fam, arcRadii: radii,
  };
}

async function measure(page, svgRaw, mode = "alpha", name = "mark", rendersDir = null) {
  const svgText = sanitize(svgRaw);
  const L = 1024;
  const { W, H } = await renderInline(page, svgText, L);
  const png = decode(await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, omitBackground: true }));
  const vec = await page.evaluate(sampleOutlines, mode);
  const M0 = maskFrom(png, mode);
  const bb0 = bbox(M0, W, H);
  // colour inventory from raster (painted pixels inside mark)
  const qc = new Map(); let painted = 0;
  for (let y = bb0.y0; y <= bb0.y1; y++) for (let x = bb0.x0; x <= bb0.x1; x++) { const i = y * W + x; if (!M0[i]) continue; painted++; const d = png.data; const key = ((d[i * 4] >> 4) << 8) | ((d[i * 4 + 1] >> 4) << 4) | (d[i * 4 + 2] >> 4); qc.set(key, (qc.get(key) || 0) + 1); }
  const cols = Array.from(qc.values()).sort((a, b) => b - a); const nColours = cols.filter(c => c / painted >= 0.02).length; const topCover = cols.slice(0, nColours).reduce((a, b) => a + b, 0) / painted;
  // analysis grid: crop to bbox, pad, downsample to long side 512
  const crop = cropPad(M0, W, H, bb0, 0);
  const ds512 = downsample(crop.M, crop.w, crop.h, 512 + 16, 512 / (512 + 16));
  const A = new Uint8Array(ds512.gray.length); for (let i = 0; i < A.length; i++) A[i] = ds512.gray[i] >= 0.5 ? 1 : 0;
  const N = 528; const abb = bbox(A, N, N);
  const inkArea = A.reduce((a, b) => a + b, 0);
  const minA = Math.max(4, 0.0002 * abb.w * abb.h);
  const comp = components(A, N, N, true, minA); const nHoles = holes(A, N, N, minA);
  // symmetry
  let cx = 0, cy = 0; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (A[y * N + x]) { cx += x + 0.5; cy += y + 0.5; } cx /= inkArea; cy /= inkArea;
  const bcx = abb.x0 + abb.w / 2, bcy = abb.y0 + abb.h / 2;
  const sym = {};
  sym.mirrorV = Math.max(iou(A, transformMask(A, N, N, (x, y) => [2 * cx - x, y]), N * N), iou(A, transformMask(A, N, N, (x, y) => [2 * bcx - x, y]), N * N));
  sym.mirrorH = Math.max(iou(A, transformMask(A, N, N, (x, y) => [x, 2 * cy - y]), N * N), iou(A, transformMask(A, N, N, (x, y) => [x, 2 * bcy - y]), N * N));
  sym.mirrorD = Math.max(iou(A, transformMask(A, N, N, (x, y) => [cx + (y - cy), cy + (x - cx)]), N * N), iou(A, transformMask(A, N, N, (x, y) => [cx - (y - cy), cy - (x - cx)]), N * N));
  sym.rot = {};
  for (const n of [2, 3, 4, 5, 6, 8, 12]) { const a = 2 * Math.PI / n, c = Math.cos(a), s = Math.sin(a); let best = 0; for (const [ox, oy] of [[cx, cy], [bcx, bcy]]) best = Math.max(best, iou(A, transformMask(A, N, N, (x, y) => [ox + c * (x - ox) - s * (y - oy), oy + s * (x - ox) + c * (y - oy)]), N * N)); sym.rot[n] = +best.toFixed(3); }
  for (const k of ['mirrorV', 'mirrorH', 'mirrorD']) sym[k] = +sym[k].toFixed(3);
  const rotOrder = [12, 8, 6, 5, 4, 3, 2].find(n => sym.rot[n] >= 0.9) || 1;
  // thickness
  const T = localThickness(A, N, N); const inkT = []; for (let i = 0; i < N * N; i++) if (A[i]) inkT.push(T[i]);
  const [t5, t25, t50, t95] = pct(inkT, [5, 25, 50, 95]);
  const hull = convexHullMask(A, N, N); const G = new Uint8Array(N * N); let gapArea = 0, hullArea = 0; for (let i = 0; i < N * N; i++) { if (hull[i]) hullArea++; if (hull[i] && !A[i]) { G[i] = 1; gapArea++; } }
  let g5 = null, g50 = null;
  if (gapArea > 0.01 * hullArea) { const TG = localThickness(G, N, N); const gv = []; for (let i = 0; i < N * N; i++) if (G[i]) gv.push(TG[i]); [g5, g50] = pct(gv, [5, 50]); }
  // separations: min distance between distinct parts; smallest counter (max inscribed diameter of smallest hole)
  let minPartGap = null, minCounter = null;
  { const { lab, areas } = components(A, N, N, true); const big = areas.map((a, i) => [a, i + 1]).filter(([a]) => a >= minA).map(([, l]) => l);
    if (big.length > 1 && big.length <= 24) { for (const l of big) { const seed = new Uint8Array(N * N); for (let i = 0; i < N * N; i++) seed[i] = lab[i] === l ? 1 : 0; const d = edtTo(seed, N, N); for (let i = 0; i < N * N; i++) if (lab[i] && lab[i] !== l && big.includes(lab[i])) { const v = Math.sqrt(d[i]); if (minPartGap == null || v < minPartGap) minPartGap = v; } } }
    const Bg = new Uint8Array(N * N); for (let i = 0; i < N * N; i++) Bg[i] = A[i] ? 0 : 1; const hb = components(Bg, N, N, false); const border = new Set(); for (let x = 0; x < N; x++) { border.add(hb.lab[x]); border.add(hb.lab[(N - 1) * N + x]); } for (let y = 0; y < N; y++) { border.add(hb.lab[y * N]); border.add(hb.lab[y * N + N - 1]); }
    const din = edtTo(A, N, N); const maxIn = new Map(); for (let i = 0; i < N * N; i++) { const l = hb.lab[i]; if (!l || border.has(l) || hb.areas[l - 1] < minA) continue; const v = Math.sqrt(din[i]); if (!maxIn.has(l) || v > maxIn.get(l)) maxIn.set(l, v); }
    for (const v of maxIn.values()) if (minCounter == null || 2 * v < minCounter) minCounter = 2 * v; }
  const Hh = abb.h; const pc = v => v == null ? null : +(v / Hh * 100).toFixed(1);
  // renders and survival
  const surv = {};
  // hi-res features: parts (ink comps) and holes (enclosed bg comps), in crop coords
  const sA = 512 / Math.max(crop.w, crop.h), oAx = (N - crop.w * sA) / 2, oAy = (N - crop.h * sA) / 2;
  const feats = [];
  { const inkL = components(A, N, N, true).lab; const Bg = new Uint8Array(N * N); for (let i = 0; i < N * N; i++) Bg[i] = A[i] ? 0 : 1; const bgL = components(Bg, N, N, false).lab;
    const border = new Set(); for (let x = 0; x < N; x++) { border.add(bgL[x]); border.add(bgL[(N - 1) * N + x]); } for (let y = 0; y < N; y++) { border.add(bgL[y * N]); border.add(bgL[y * N + N - 1]); }
    const fm = new Map();
    for (let i = 0; i < N * N; i++) { const k = A[i] ? 'p' + inkL[i] : (border.has(bgL[i]) ? null : 'h' + bgL[i]); if (!k) continue; if (!fm.has(k)) fm.set(k, []); fm.get(k).push(i); }
    for (const [k, px] of fm) { if (px.length < minA) continue; feats.push({ type: k[0], px }); }
  }
  const totInk = inkArea; let totHole = 0; feats.forEach(f => { if (f.type === 'h') totHole += f.px.length; });
  function featureSurvival(B, n, scale) {
    const off = [(n - crop.w * scale) / 2, (n - crop.h * scale) / 2];
    const inkL = components(B, n, n, true).lab; const Bg = new Uint8Array(n * n); for (let i = 0; i < n * n; i++) Bg[i] = B[i] ? 0 : 1; const bgL = components(Bg, n, n, false).lab;
    const border = new Set(); for (let x = 0; x < n; x++) { border.add(bgL[x]); border.add(bgL[(n - 1) * n + x]); } for (let y = 0; y < n; y++) { border.add(bgL[y * n]); border.add(bgL[y * n + n - 1]); }
    const claim = new Map(); const res = [];
    for (const f of feats) {
      const votes = new Map();
      for (const i of f.px) { const x = (i % N + 0.5 - oAx) / sA, y = ((i / N | 0) + 0.5 - oAy) / sA; const tx = Math.floor(off[0] + x * scale), ty = Math.floor(off[1] + y * scale); if (tx < 0 || ty < 0 || tx >= n || ty >= n) continue; const q = ty * n + tx; let lab = null; if (f.type === 'p' && B[q]) lab = 'p' + inkL[q]; if (f.type === 'h' && !B[q] && !border.has(bgL[q])) lab = 'h' + bgL[q]; if (lab) votes.set(lab, (votes.get(lab) || 0) + 1); }
      let best = null, bv = 0; for (const [l, v] of votes) if (v > bv) { bv = v; best = l; }
      const w = f.type === 'p' ? f.px.length / totInk : f.px.length / (totHole || 1);
      const r = { type: f.type, w, lab: best, area: f.px.length }; res.push(r);
      if (best) { if (!claim.has(best)) claim.set(best, []); claim.get(best).push(r); }
    }
    for (const [, rs] of claim) { rs.sort((a, b) => b.area - a.area); rs.slice(1).forEach(r => r.merged = true); }
    let kept = 0, tot = 0, lostBig = 0; for (const r of res) { const ok = r.lab && !r.merged; const wt = Math.sqrt(r.w); tot += wt; if (ok) kept += wt; else if (r.w >= 0.05) lostBig++; }
    return { features: res.length, kept: res.filter(r => r.lab && !r.merged).length, keptWeighted: +(tot ? kept / tot : 1).toFixed(2), lostBig };
  }
  for (const n of [16, 32, 64, 256]) {
    const { gray, scale } = downsample(crop.M, crop.w, crop.h, n, 1);
    if (rendersDir) fs.writeFileSync(path.join(rendersDir, `${name}-${n}.png`), encodeGray(n, n, gray));
    if (n <= 64) {
      const B = new Uint8Array(n * n); for (let i = 0; i < n * n; i++) B[i] = gray[i] >= 0.5 ? 1 : 0;
      const c = components(B, n, n, true, 1).count, hNo = holes(B, n, n, 1);
      // ink px of mark height at this size
      const hpx = crop.h * scale;
      const fs_ = featureSurvival(B, n, scale);
      surv[n] = { ...fs_, holds: fs_.lostBig === 0 && fs_.keptWeighted >= 0.85, parts: c, holes: hNo, heightPx: +hpx.toFixed(1), minInkPx: +(pc(t5) / 100 * hpx).toFixed(2), minGapPx: g5 == null ? null : +(pc(g5) / 100 * hpx).toFixed(2), topology: c === comp.count && hNo === nHoles };
    }
  }
  const outline = analyseOutline(vec, bb0);
  // fill/stroke share
  return {
    name, mode,
    aspect: +(bb0.w / bb0.h).toFixed(3),
    parts: comp.count, holes: nHoles, partAreas: comp.areas.filter(a => a >= minA).map(a => +(a / inkArea).toFixed(3)).sort((a, b) => b - a).slice(0, 8),
    colours: nColours, colourCover: +topCover.toFixed(2), gradient: vec.gradient || topCover < 0.85,
    construction: vec.kinds, strokeWidthsPctH: vec.out.filter(e => e.stroke).map(e => +(e.stroke / bb0.h * 100).toFixed(1)).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
    coverageBBox: +(inkArea / (abb.w * abb.h)).toFixed(3), coverageHull: +(inkArea / hullArea).toFixed(3),
    symmetry: { ...sym, rotOrder },
    thicknessPctH: { p5: pc(t5), p25: pc(t25), p50: pc(t50), p95: pc(t95) },
    gapPctH: { p5: pc(g5), p50: pc(g50), gapShareOfHull: +(gapArea / hullArea).toFixed(3) },
    minPartGapPctH: pc(minPartGap), minCounterPctH: pc(minCounter),
    outline, survival: surv,
  };
}

// ---------- check against anatomy.json ----------
function check(m, A) {
  const out = []; const t = A.mark;
  const add = (id, level, msg) => out.push({ id, level, msg });
  const sep = [m.minPartGapPctH, m.minCounterPctH].filter(v => v != null);
  const minSep = sep.length ? Math.min(...sep) : null;
  if (m.construction.stroke + m.construction.both > 0) add('LA-01', 'warn', `stroked shapes present (${m.construction.stroke + m.construction.both}); outline strokes to fills`);
  // rotational repeats count once per module (slack-2019: 8 parts / rot4 = 2 modules)
  const rot = m.symmetry.rotOrder >= 2 && m.symmetry.rot[m.symmetry.rotOrder] >= t.symmetry.exactMin ? m.symmetry.rotOrder : 1;
  const feat = Math.ceil(m.parts / rot) + Math.ceil(m.holes / rot);
  if (feat > t.partsPlusHoles.max) add('LA-03', 'fail', `parts+holes per module ${feat} > ${t.partsPlusHoles.max}`);
  else if (feat > t.partsPlusHoles.target[1]) add('LA-03', 'warn', `parts+holes per module ${feat} above target ${t.partsPlusHoles.target[1]}`);
  if (m.outline.outlineLenPerH > t.outlineLenPerH.max) add('LA-03', 'fail', `outline length ${m.outline.outlineLenPerH} x height > ${t.outlineLenPerH.max}`);
  else if (m.outline.outlineLenPerH > t.outlineLenPerH.target[1]) add('LA-03', 'warn', `outline length ${m.outline.outlineLenPerH} x height > ${t.outlineLenPerH.target[1]}`);
  if (m.thicknessPctH.p25 < t.thinStrokeP25PctH.fail) add('LA-04', 'fail', `thin strokes ${m.thicknessPctH.p25}% of height < ${t.thinStrokeP25PctH.fail}%`);
  else if (m.thicknessPctH.p25 < t.thinStrokeP25PctH.min) add('LA-04', 'warn', `thin strokes ${m.thicknessPctH.p25}% of height < ${t.thinStrokeP25PctH.min}%`);
  if (minSep != null && minSep < t.minSeparationPctH.fail) add('LA-05', 'fail', `narrowest gap/counter ${minSep}% of height < ${t.minSeparationPctH.fail}%`);
  else if (minSep != null && minSep < t.minSeparationPctH.min) add('LA-05', 'warn', `narrowest gap/counter ${minSep}% of height < ${t.minSeparationPctH.min}%`);
  if (m.coverageBBox < t.coverageBBox.hard[0] || m.coverageBBox > t.coverageBBox.hard[1]) add('LA-06', 'fail', `ink coverage ${m.coverageBBox} outside ${t.coverageBBox.hard}`);
  else if (m.coverageBBox < t.coverageBBox.target[0] || m.coverageBBox > t.coverageBBox.target[1]) add('LA-06', 'warn', `ink coverage ${m.coverageBBox} outside target ${t.coverageBBox.target}`);
  if (m.aspect < t.aspect.hard[0] || m.aspect > t.aspect.hard[1]) add('LA-07', 'fail', `aspect ${m.aspect} outside ${t.aspect.hard}`);
  else if (m.aspect < t.aspect.target[0] || m.aspect > t.aspect.target[1]) add('LA-07', 'warn', `aspect ${m.aspect} outside target ${t.aspect.target}`);
  const o = m.outline;
  if (o.straightShare >= 0.3 && rot < 5) { /* radial marks (rot >= 5) legitimately use many directions */ const top = o.anglePeaks.slice(0, t.angleSystem.maxDirections).reduce((s, p) => s + p.share, 0); if (top < t.angleSystem.minShareInTopDirections) add('LA-08', 'warn', `straight edges spread over ${o.anglePeaks.length} directions (top ${t.angleSystem.maxDirections} hold ${(top * 100).toFixed(0)}%)`); }
  if (o.arcShare >= 0.3 && o.arcRadii.length > t.arcRadii.maxFamilies) add('LA-09', 'info', `${o.arcRadii.length} radius families (> ${t.arcRadii.maxFamilies})`);
  const s = m.symmetry; const best = Math.max(s.mirrorV, s.mirrorH, s.mirrorD, ...Object.values(s.rot));
  if (best > t.symmetry.brokenMax && best < t.symmetry.exactMin) add('LA-11', 'warn', `near-symmetry ${best.toFixed(3)}: make it exact (>= ${t.symmetry.exactMin}) or clearly broken (<= ${t.symmetry.brokenMax})`);
  const s16 = m.survival[16];
  if (!s16.holds) add('LA-14', 'warn', `16px: ${s16.features - s16.kept}/${s16.features} parts/counters merge or vanish (thinnest ${s16.minInkPx}px)`);
  if (s16.minInkPx < t.survival16.minFeaturePx) add('LA-14', 'warn', `16px: thinnest feature ${s16.minInkPx}px < ${t.survival16.minFeaturePx}px`);
  if (m.colours > 1 && m.gradient) add('LA-13', 'info', 'gradient fill; verify the one-colour version separately');
  return out;
}

// ---------- CLI ----------
const args = process.argv.slice(2); const files = []; let mode = 'alpha', rendersDir = null, jsonOut = null;
for (let i = 0; i < args.length; i++) { if (args[i] === '--mode') mode = args[++i]; else if (args[i] === '--renders') rendersDir = args[++i]; else if (args[i] === '--json') jsonOut = args[++i]; else files.push(args[i]); }
if (!files.length) { console.log('usage: node tools/logo_measure.mjs <mark.svg>... [--mode alpha|dark|light] [--renders <dir>] [--json <out.json>]'); process.exit(2); }
if (rendersDir) fs.mkdirSync(rendersDir, { recursive: true });
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'system/logo/anatomy.json'), 'utf8'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
const all = {}; let worst = 0;
for (const f of files) {
  const name = path.basename(f).replace(/\.svg$/i, '');
  const m = await measure(page, fs.readFileSync(f, 'utf8'), mode, name, rendersDir);
  const issues = check(m, A); m.checks = issues; all[name] = m;
  const fails = issues.filter(x => x.level === 'fail').length, warns = issues.filter(x => x.level === 'warn').length;
  worst = Math.max(worst, fails ? 2 : warns ? 1 : 0);
  console.log(`${name}: aspect ${m.aspect} | parts ${m.parts} holes ${m.holes} | ink ${(m.coverageBBox * 100).toFixed(0)}% | stroke p25 ${m.thicknessPctH.p25}% H | min gap ${[m.minPartGapPctH, m.minCounterPctH].filter(v => v != null).join('/') || '-'}% H | outline ${m.outline.outlineLenPerH}H | straight ${(m.outline.straightShare * 100).toFixed(0)}% arc ${(m.outline.arcShare * 100).toFixed(0)}% | 16px ${m.survival[16].holds ? 'holds' : 'loses detail'}`);
  for (const x of issues) console.log(`  ${x.level.toUpperCase()} ${x.id} ${x.msg}`);
  if (!issues.length) console.log('  PASS all anatomy checks');
}
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(all, null, 1));
await browser.close();
process.exit(worst === 2 ? 1 : 0);
