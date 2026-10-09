#!/usr/bin/env node
// Measure the same named boxes in reference and render: ink bbox (pixels darker than the box's corner bg by > thr),
// darkest-1% ink colour, and the deltas in CSS px. Flags anything off by more than 0.5 css px.
//   node cmp.mjs <ref.png> <render.png> <boxes.json> <scale> [only-name-substring]
// boxes.json: { "name": [x0, y0, x1, y1, thr?] } in reference image pixels.
import fs from 'node:fs'; import { PNG } from 'pngjs';
const [refP, renP, boxesP, sc, only] = process.argv.slice(2); const S = Number(sc);
const A = PNG.sync.read(fs.readFileSync(refP)), B = PNG.sync.read(fs.readFileSync(renP));
const boxes = JSON.parse(fs.readFileSync(boxesP, 'utf8'));
const lum = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
function meas(img, [x0, y0, x1, y1, thr = 40]) {
  const W = img.width, d = img.data; const bgI = (y0 * W + x0) * 4; const bg = lum(d, bgI);
  let bx0 = 1e9, by0 = 1e9, bx1 = -1, by1 = -1; const ink = [];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = (y * W + x) * 4; const L = lum(d, i); if (bg - L > thr) { bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y); ink.push([L, d[i], d[i + 1], d[i + 2]]); } }
  if (bx1 < 0) return null; ink.sort((a, b) => a[0] - b[0]); const k = Math.max(2, Math.floor(ink.length * 0.02));
  const col = [1, 2, 3].map((c) => Math.round(ink.slice(0, k).reduce((s, p) => s + p[c], 0) / k));
  return { x: bx0, y: by0, w: bx1 - bx0 + 1, h: by1 - by0 + 1, n: ink.length, col: '#' + col.map((v) => v.toString(16).padStart(2, '0')).join('') };
}
const f = (v) => (v >= 0 ? '+' : '') + (v / S).toFixed(1);
let bad = 0;
for (const [name, box] of Object.entries(boxes)) {
  if (only && !name.includes(only)) continue;
  const a = meas(A, box), b = meas(B, box);
  if (!a || !b) { console.log(`${name.padEnd(22)} ${a ? '' : 'REF-EMPTY'} ${b ? '' : 'RENDER-EMPTY'}`); continue; }
  const dx = b.x - a.x, dy = b.y - a.y, dw = b.w - a.w, dh = b.h - a.h, dn = ((b.n - a.n) / a.n * 100).toFixed(0);
  const off = [dx, dy, dw, dh].some((v) => Math.abs(v / S) > 0.6); if (off) bad++;
  console.log(`${off ? '!!' : 'ok'} ${name.padEnd(22)} dx ${f(dx).padStart(5)} dy ${f(dy).padStart(5)} dw ${f(dw).padStart(5)} dh ${f(dh).padStart(5)}  ink ${dn.padStart(4)}%  col ${a.col}->${b.col}  ref(css) ${(a.x / S).toFixed(1)},${(a.y / S).toFixed(1)} ${(a.w / S).toFixed(1)}x${(a.h / S).toFixed(1)}`);
}
console.log(`${bad} boxes off by > 0.6 css px`);
