import { chromium } from '/Users/augustas/dev/design-engine/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [listFile, outFile] = process.argv.slice(2);
const names = fs.readFileSync(listFile, 'utf8').split(/\s+/).filter(Boolean);
const b = await chromium.launch();
const p = await b.newPage();
await p.setContent('<canvas id=c></canvas>');
const res = {};
for (const n of names) {
  const f = (process.env.DIR||"details")+`/${n}.png`; if (!fs.existsSync(f)) { console.log('missing', n); continue; }
  const data = 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
  res[n] = await p.evaluate(async (data) => {
    const img = new Image(); img.src = data; await img.decode();
    const W = Math.min(900, img.width), H = Math.round(img.height * W / img.width);
    const c = document.getElementById('c'); c.width = W; c.height = H; const x = c.getContext('2d'); x.drawImage(img, 0, 0, W, H);
    const d = x.getImageData(0, 0, W, H).data;
    // bg = mode of border pixels quantised
    const cnt = {}; const q = (i) => ((d[i] >> 4) << 8) | ((d[i + 1] >> 4) << 4) | (d[i + 2] >> 4);
    // ignore outer white frame: find inner box by scanning for the dominant region; use pixels 3% inside
    const m = Math.round(Math.min(W, H) * 0.03);
    for (let i = 0; i < W * H; i += 3) { const k = q(i * 4); cnt[k] = (cnt[k] || 0) + 1; }
    const bk = +Object.entries(cnt).sort((a, b) => b[1] - a[1])[0][0];
    const bg = [((bk >> 8) & 15) * 16 + 8, ((bk >> 4) & 15) * 16 + 8, (bk & 15) * 16 + 8];
    const ink = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) { const r = d[i * 4] - bg[0], g = d[i * 4 + 1] - bg[1], bl = d[i * 4 + 2] - bg[2]; ink[i] = Math.sqrt(r * r + g * g + bl * bl) > 90 ? 1 : 0; }
    // restrict to the region whose colour == bg (to drop outer white frame) : find bbox of bg-coloured pixels
    let bx0 = W, by0 = H, bx1 = 0, by1 = 0;
    for (let Y = 0; Y < H; Y++) for (let X = 0; X < W; X++) { const i = Y * W + X; const r = d[i * 4] - bg[0], g = d[i * 4 + 1] - bg[1], bl = d[i * 4 + 2] - bg[2]; if (Math.abs(r) + Math.abs(g) + Math.abs(bl) < 40) { if (X < bx0) bx0 = X; if (X > bx1) bx1 = X; if (Y < by0) by0 = Y; if (Y > by1) by1 = Y; } }
    for (let Y = 0; Y < H; Y++) for (let X = 0; X < W; X++) if (X < bx0 + 4 || X > bx1 - 4 || Y < by0 + 4 || Y > by1 - 4) ink[Y * W + X] = 0;
    // components (4-conn) + drop noise
    const lab = new Int32Array(W * H); let L = 0; const comps = [];
    for (let i = 0; i < W * H; i++) if (ink[i] && !lab[i]) { L++; let st = [i]; lab[i] = L; let a = 0, x0 = W, y0 = H, x1 = 0, y1 = 0; while (st.length) { const j = st.pop(); a++; const X = j % W, Y = (j / W) | 0; if (X < x0) x0 = X; if (X > x1) x1 = X; if (Y < y0) y0 = Y; if (Y > y1) y1 = Y; for (const k of [j - 1, j + 1, j - W, j + W]) if (k >= 0 && k < W * H && ink[k] && !lab[k] && Math.abs((k % W) - X) <= 1) { lab[k] = L; st.push(k); } } comps.push({ L, a, x0, y0, x1, y1 }); }
    const minA = W * H * 0.00015; const keep = comps.filter(c => c.a >= minA);
    const keepSet = new Set(keep.map(c => c.L)); for (let i = 0; i < W * H; i++) if (ink[i] && !keepSet.has(lab[i])) ink[i] = 0;
    // column projection segments
    const colHas = new Uint8Array(W); for (let i = 0; i < W * H; i++) if (ink[i]) colHas[i % W] = 1;
    const segs = []; let s = -1; for (let X = 0; X <= W; X++) { if (X < W && colHas[X]) { if (s < 0) s = X; } else if (s >= 0) { segs.push([s, X - 1]); s = -1; } }
    const segBox = ([a, z]) => { let y0 = H, y1 = 0; for (let Y = 0; Y < H; Y++) for (let X = a; X <= z; X++) if (ink[Y * W + X]) { if (Y < y0) y0 = Y; if (Y > y1) y1 = Y; } return { x0: a, x1: z, y0, y1, h: y1 - y0 + 1, w: z - a + 1 }; };
    const boxes = segs.map(segBox);
    // DT helper (chamfer) on mask region
    const dt = (mask, bx) => { const w = bx.x1 - bx.x0 + 3, h = bx.y1 - bx.y0 + 3; const D = new Float32Array(w * h); for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) { const X = bx.x0 - 1 + xx, Y = bx.y0 - 1 + yy; const inside = X >= 0 && Y >= 0 && X < W && Y < H && mask(X, Y); D[yy * w + xx] = inside ? 1e9 : 0; } for (let yy = 1; yy < h; yy++) for (let xx = 1; xx < w - 1; xx++) { const i = yy * w + xx; if (D[i]) D[i] = Math.min(D[i], D[i - 1] + 1, D[i - w] + 1, D[i - w - 1] + 1.414, D[i - w + 1] + 1.414); } for (let yy = h - 2; yy >= 0; yy--) for (let xx = w - 2; xx >= 1; xx--) { const i = yy * w + xx; if (D[i]) D[i] = Math.min(D[i], D[i + 1] + 1, D[i + w] + 1, D[i + w + 1] + 1.414, D[i + w - 1] + 1.414); } const ridge = []; for (let yy = 1; yy < h - 1; yy++) for (let xx = 1; xx < w - 1; xx++) { const i = yy * w + xx, v = D[i]; if (v >= 1.5 && v >= D[i - 1] && v >= D[i + 1] && v >= D[i - w] && v >= D[i + w]) ridge.push(v); } ridge.sort((a, b) => a - b); return ridge.length ? { med: 2 * ridge[ridge.length >> 1], max: 2 * ridge[ridge.length - 1] } : null; };
    const inkM = (X, Y) => ink[Y * W + X] === 1;
    const between = (bx) => (X, Y) => { if (ink[Y * W + X] || X < bx.x0 || X > bx.x1 || Y < bx.y0 || Y > bx.y1) return false; let l = 0, r = 0, u = 0, dn = 0; for (let k = X - 1; k >= bx.x0; k--) if (ink[Y * W + k]) { l = 1; break; } for (let k = X + 1; k <= bx.x1; k++) if (ink[Y * W + k]) { r = 1; break; } for (let k = Y - 1; k >= bx.y0; k--) if (ink[k * W + X]) { u = 1; break; } for (let k = Y + 1; k <= bx.y1; k++) if (ink[k * W + X]) { dn = 1; break; } return (l && r) && (u && dn); };
    const describe = (bx) => { let a = 0; for (let Y = bx.y0; Y <= bx.y1; Y++) for (let X = bx.x0; X <= bx.x1; X++) a += ink[Y * W + X]; const ls = new Set(); for (let Y = bx.y0; Y <= bx.y1; Y++) for (let X = bx.x0; X <= bx.x1; X++) if (ink[Y * W + X]) ls.add(lab[Y * W + X]); const st = dt(inkM, bx), gp = dt(between(bx), bx); return { w: bx.x1 - bx.x0 + 1, h: bx.y1 - bx.y0 + 1, aspect: +((bx.x1 - bx.x0 + 1) / (bx.y1 - bx.y0 + 1)).toFixed(2), coverage: +(a / ((bx.x1 - bx.x0 + 1) * (bx.y1 - bx.y0 + 1))).toFixed(2), parts: ls.size, stroke: st && +(st.med / (bx.y1 - bx.y0 + 1)).toFixed(3), strokeMax: st && +(st.max / (bx.y1 - bx.y0 + 1)).toFixed(3), gap: gp && +(gp.med / (bx.y1 - bx.y0 + 1)).toFixed(3), gapToStroke: st && gp ? +(gp.med / st.med).toFixed(2) : null }; };
    const union = (bs) => bs.reduce((u, c) => ({ x0: Math.min(u.x0, c.x0), x1: Math.max(u.x1, c.x1), y0: Math.min(u.y0, c.y0), y1: Math.max(u.y1, c.y1) }), { x0: W, x1: 0, y0: H, y1: 0 });
    if (!boxes.length) return null;
    const all = union(boxes);
    const out = { segs: boxes.length, all: describe(all) };
    if (boxes.length >= 3) {
      const gaps = boxes.slice(1).map((b, i) => b.x0 - boxes[i].x1);
      const sorted = [...gaps].sort((a, b) => a - b); const med = sorted[sorted.length >> 1]; const gi = gaps.indexOf(Math.max(...gaps));
      if (gaps[gi] > 1.8 * med) {
        const left = boxes.slice(0, gi + 1), right = boxes.slice(gi + 1);
        const markSide = left.length <= right.length ? 'left' : 'right';
        const mk = markSide === 'left' ? left : right, wd = markSide === 'left' ? right : left;
        const mb = union(mk), wb = union(wd); const hs = wd.map(b => b.h).sort((a, b) => a - b);
        const wst = dt(inkM, wb);
        const mdesc = describe(mb);
        out.combo = { markSide, mark: mdesc, wordH: wb.y1 - wb.y0 + 1, letterHMax: hs[hs.length - 1], letterHMed: hs[hs.length >> 1], markToWordBbox: +((mb.y1 - mb.y0 + 1) / (wb.y1 - wb.y0 + 1)).toFixed(2), markToTallLetter: +((mb.y1 - mb.y0 + 1) / hs[hs.length - 1]).toFixed(2), markToXish: +((mb.y1 - mb.y0 + 1) / hs[hs.length >> 1]).toFixed(2), gapToMarkH: +(gaps[gi] / (mb.y1 - mb.y0 + 1)).toFixed(2), gapToTallLetter: +(gaps[gi] / hs[hs.length - 1]).toFixed(2), wordStrokeToTall: wst && +(wst.med / hs[hs.length - 1]).toFixed(3), markStrokeToWordStroke: wst && mdesc.stroke ? +((mdesc.stroke * (mb.y1 - mb.y0 + 1)) / wst.med).toFixed(2) : null, markCenterOffset: +(((mb.y0 + mb.y1) / 2 - (wb.y0 + wb.y1) / 2) / (wb.y1 - wb.y0 + 1)).toFixed(2) };
      }
    }
    return out;
  }, data);
  console.log(n, JSON.stringify(res[n]));
}
fs.writeFileSync(outFile, JSON.stringify(res, null, 1));
await b.close();
