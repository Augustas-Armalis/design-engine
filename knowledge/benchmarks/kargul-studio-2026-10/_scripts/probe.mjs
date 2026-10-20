// usage: node probe.mjs <image> <jsfile-or-code> ; helpers in page: W,H,P(x,y)->[r,g,b], hex(x,y), L(x,y) luminance, row(y,x0,x1), col(x,y0,y1),
// crop(x,y,w,h,zoom,out) saves zoomed nearest-neighbour PNG
import { createRequire } from 'module'; import fs from 'fs'; import path from 'path';
const require = createRequire('/Users/augustas/Documents/Larpo front-end engine/package.json');
const { chromium } = require('playwright');
const [img, codeArg] = process.argv.slice(2);
const code = fs.existsSync(codeArg) ? fs.readFileSync(codeArg, 'utf8') : codeArg;
const ext = path.extname(img).slice(1).replace('jpg', 'jpeg');
const b = await chromium.launch(); const p = await b.newPage();
const crops = [];
await p.exposeFunction('saveCrop', (name, dataUrl) => { fs.writeFileSync(name, Buffer.from(dataUrl.split(',')[1], 'base64')); });
await p.setContent('<canvas id=c></canvas>');
const data = 'data:image/' + ext + ';base64,' + fs.readFileSync(img).toString('base64');
const out = await p.evaluate(async ({ data, code }) => {
  const im = new Image(); im.src = data; await im.decode();
  const W = im.naturalWidth, H = im.naturalHeight;
  const c = document.getElementById('c'); c.width = W; c.height = H; const g = c.getContext('2d'); g.drawImage(im, 0, 0);
  const D = g.getImageData(0, 0, W, H).data;
  const P = (x, y) => { x = Math.round(x); y = Math.round(y); const i = (y * W + x) * 4; return [D[i], D[i + 1], D[i + 2]]; };
  const toHex = a => '#' + a.map(v => v.toString(16).padStart(2, '0')).join('');
  const hex = (x, y) => toHex(P(x, y));
  const L = (x, y) => { const [r, gg, bb] = P(x, y); return 0.2126 * r + 0.7152 * gg + 0.0722 * bb; };
  const row = (y, x0, x1) => { const a = []; for (let x = x0; x <= x1; x++) a.push(hex(x, y)); return a; };
  const col = (x, y0, y1) => { const a = []; for (let y = y0; y <= y1; y++) a.push(hex(x, y)); return a; };
  const rowL = (y, x0, x1) => { const a = []; for (let x = x0; x <= x1; x++) a.push(Math.round(L(x, y))); return a; };
  const colL = (x, y0, y1) => { const a = []; for (let y = y0; y <= y1; y++) a.push(Math.round(L(x, y))); return a; };
  const runs = (arr) => { const r = []; let s = 0; for (let i = 1; i <= arr.length; i++) if (i === arr.length || arr[i] !== arr[s]) { r.push([s, i - s, arr[s]]); s = i; } return r; };
  // transitions along a row where |dL|>t
  const edgesRow = (y, x0, x1, t = 6) => { const e = []; let prev = L(x0, y); for (let x = x0 + 1; x <= x1; x++) { const v = L(x, y); if (Math.abs(v - prev) > t) e.push([x, Math.round(prev), Math.round(v)]); prev = v; } return e; };
  const edgesCol = (x, y0, y1, t = 6) => { const e = []; let prev = L(x, y0); for (let y = y0 + 1; y <= y1; y++) { const v = L(x, y); if (Math.abs(v - prev) > t) e.push([y, Math.round(prev), Math.round(v)]); prev = v; } return e; };
  // corner radius: (cx,cy)=bounding corner point (outer edge of shape), dx,dy = direction into the shape (+1/-1). inside/outside luminance given or sampled.
  const radius = (cx, cy, dx, dy, lin, lout) => {
    // walk diagonal
    let prev = null; let d = null;
    for (let s = 0; s < 400; s++) { const v = L(cx + dx * s, cy + dy * s); const f = (v - lout) / (lin - lout); if (f >= 0.5) { if (prev !== null) { d = s - 1 + (0.5 - prev) / (f - prev); } else d = s; break; } prev = f; }
    if (d === null) return null;
    const diag = d * Math.SQRT2; return +(diag / (Math.SQRT2 - 1) / Math.SQRT2 * 1).toFixed(2); // r = d_axis/(1-1/sqrt2)
  };
  // profile across a straight edge: from (x,y) step (dx,dy) n px -> luminance list
  const prof = (x, y, dx, dy, n) => { const a = []; for (let s = 0; s < n; s++) a.push(+L(x + dx * s, y + dy * s).toFixed(1)); return a; };
  const profHex = (x, y, dx, dy, n) => { const a = []; for (let s = 0; s < n; s++) a.push(hex(x + dx * s, y + dy * s)); return a; };
  const crop = async (x, y, w, h, z, name) => { const cc = document.createElement('canvas'); cc.width = w * z; cc.height = h * z; const gg = cc.getContext('2d'); gg.imageSmoothingEnabled = false; gg.drawImage(c, x, y, w, h, 0, 0, w * z, h * z); await window.saveCrop(name, cc.toDataURL('image/png')); return name; };
  const alphaOver = (c, bg, ink) => { // fraction of ink mixed into bg giving c, per channel avg
    const a = [0, 1, 2].map(i => (c[i] - bg[i]) / ((ink[i] - bg[i]) || 1)); return +(a.reduce((s, v) => s + v, 0) / 3).toFixed(3); };

  // corner fit: (x0,y0) = corner of the bounding box (outer edge), dx,dy = +-1 into the shape, test(L)=true when pixel belongs to edge/shape. scans rows near the corner.
  const corner = (x0, y0, dx, dy, test, maxR = 120) => {
    const pts = [];
    for (let k = 0; k < maxR; k++) { const y = y0 + dy * k; let off = null; for (let s = 0; s < maxR * 1.2; s++) { if (test(L(x0 + dx * s, y), x0 + dx * s, y)) { off = s; break; } } if (off === null) break; pts.push([k, off]); if (off === 0 && k > 3) break; }
    // fit r: off(k) = r - sqrt(r^2 - (r-k)^2) for k<r, else 0
    let best = null;
    for (let r = 1; r <= maxR; r += 0.25) { let e = 0, n = 0; for (const [k, o] of pts) { const kk = k + 0.5; const pred = kk < r ? r - Math.sqrt(Math.max(0, r * r - (r - kk) ** 2)) : 0; e += (pred - o) ** 2; n++; } e /= n; if (!best || e < best[1]) best = [r, e]; }
    // squircle hint: compare diag inset vs circle
    return { r: best && best[0], rms: best && +Math.sqrt(best[1]).toFixed(2), pts: pts.slice(0, 40).map(p => p[1]).join(',') };
  };

  const inkbox = (x0, y0, x1, y1, thr = 0.5) => { const bg = L(x0, y0); let ink = bg; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const v = L(x, y); if (Math.abs(v - bg) > Math.abs(ink - bg)) ink = v; }
    let minx = 1e9, miny = 1e9, maxx = -1, maxy = -1; for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const f = (L(x, y) - bg) / ((ink - bg) || 1); if (f > thr) { minx = Math.min(minx, x); maxx = Math.max(maxx, x); miny = Math.min(miny, y); maxy = Math.max(maxy, y); } }
    return { x: minx, y: miny, w: maxx - minx + 1, h: maxy - miny + 1, bg: Math.round(bg), ink: Math.round(ink) }; };
  // stem width: count ink pixels on a row segment with weighted coverage
  const stem = (y, x0, x1) => { const bg = L(x0, y); let ink = bg; for (let x = x0; x <= x1; x++) { const v = L(x, y); if (Math.abs(v - bg) > Math.abs(ink - bg)) ink = v; } let s = 0; for (let x = x0; x <= x1; x++) s += Math.max(0, Math.min(1, (L(x, y) - bg) / ((ink - bg) || 1))); return +s.toFixed(2); };
  const fn = new Function('ctx', 'with(ctx){ return (async()=>{' + code + '})(); }');
  return await fn({ W, H, P, hex, L, row, col, rowL, colL, runs, edgesRow, edgesCol, radius, prof, profHex, crop, alphaOver, toHex, corner, inkbox, stem });
}, { data, code });
console.log(JSON.stringify(out, null, 0));
await b.close();
