#!/usr/bin/env node
// Pixel measurement helper for the recreation study.
//   node px.mjs crop <in.png> <x> <y> <w> <h> <zoom> <out.png>   nearest-neighbour zoom crop (+ 10px grid ticks)
//   node px.mjs color <in.png> <x> <y> [r]                       hex of pixel (avg over r radius)
//   node px.mjs row <in.png> <y> <x0> <x1> [thr]                  print x where colour changes by > thr (default 12)
//   node px.mjs col <in.png> <x> <y0> <y1> [thr]                  same vertically
//   node px.mjs ink <in.png> <x0> <y0> <x1> <y1> [bgthr]          bounding box of "ink" (pixels darker than bg by > bgthr)
//   node px.mjs runs <in.png> <axis:x|y> <pos> <a0> <a1> [thr]    dark runs along a line (text/ink extents)
import fs from 'node:fs';
import { PNG } from 'pngjs';
const [cmd, file, ...a] = process.argv.slice(2);
const img = PNG.sync.read(fs.readFileSync(file));
const W = img.width, H = img.height;
const px = (x, y) => { x = Math.max(0, Math.min(W - 1, x | 0)); y = Math.max(0, Math.min(H - 1, y | 0)); const i = (y * W + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const lum = (c) => 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
const dist = (p, q) => Math.max(Math.abs(p[0] - q[0]), Math.abs(p[1] - q[1]), Math.abs(p[2] - q[2]));
const n = (v) => Number(v);

if (cmd === 'crop') {
  const [x, y, w, h, z, out] = [n(a[0]), n(a[1]), n(a[2]), n(a[3]), n(a[4]), a[5]];
  const o = new PNG({ width: w * z, height: h * z });
  for (let yy = 0; yy < h * z; yy++) for (let xx = 0; xx < w * z; xx++) {
    const sx = x + Math.floor(xx / z), sy = y + Math.floor(yy / z);
    let c = px(sx, sy);
    // tick marks every 10 source px along top/left edge
    if ((yy < 4 && sx % 10 === 0) || (xx < 4 && sy % 10 === 0)) c = [255, 0, 0];
    const i = (yy * w * z + xx) * 4; o.data[i] = c[0]; o.data[i + 1] = c[1]; o.data[i + 2] = c[2]; o.data[i + 3] = 255;
  }
  fs.writeFileSync(out, PNG.sync.write(o)); console.log(`wrote ${out} ${w * z}x${h * z} (src ${x},${y} ${w}x${h}) ticks every 10px`);
} else if (cmd === 'color') {
  const [x, y, r = 0] = a.map(n); let s = [0, 0, 0], k = 0;
  for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const c = px(x + dx, y + dy); s[0] += c[0]; s[1] += c[1]; s[2] += c[2]; k++; }
  console.log(hex(s.map((v) => v / k)));
} else if (cmd === 'row' || cmd === 'col') {
  const [p, s0, s1, thr = 12] = a.map(n); let prev = null, out = [];
  for (let t = s0; t <= s1; t++) { const c = cmd === 'row' ? px(t, p) : px(p, t); if (prev && dist(c, prev) > thr) out.push(`${t}:${hex(c)}`); prev = c; }
  console.log(`start ${hex(cmd === 'row' ? px(s0, p) : px(p, s0))} | ` + out.join(' '));
} else if (cmd === 'ink') {
  const [x0, y0, x1, y1, thr = 40] = a.map(n); const bg = px(x0, y0); let bx0 = 1e9, by0 = 1e9, bx1 = -1, by1 = -1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (lum(bg) - lum(px(x, y)) > thr) { bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y); }
  console.log(`bg ${hex(bg)} ink box x ${bx0}-${bx1} (w ${bx1 - bx0 + 1}) y ${by0}-${by1} (h ${by1 - by0 + 1})`);
} else if (cmd === 'runs') {
  const [axis, pos, a0, a1, thr = 40] = [a[0], n(a[1]), n(a[2]), n(a[3]), n(a[4] ?? 40)];
  const get = (t) => (axis === 'x' ? px(t, pos) : px(pos, t)); const bg = get(a0); let runs = [], st = null;
  for (let t = a0; t <= a1; t++) { const ink = lum(bg) - lum(get(t)) > thr; if (ink && st === null) st = t; if (!ink && st !== null) { runs.push([st, t - 1]); st = null; } }
  if (st !== null) runs.push([st, a1]);
  console.log(runs.map(([s, e]) => `${s}-${e}`).join(' '));
} else if (cmd === 'lines') {
  // text lines in a box: rows with ink (darker than local bg sample at x0,row by > thr); prints y-run and x-extent per line, scaled by /s
  const [x0, y0, x1, y1, thr = 40, s = 1] = a.map(n); let st = null, xs = [1e9, -1]; const out = [];
  const rowInk = (y) => { const bg = px(x0, y); let lo = 1e9, hi = -1; for (let x = x0; x <= x1; x++) if (lum(bg) - lum(px(x, y)) > thr) { lo = Math.min(lo, x); hi = Math.max(hi, x); } return [lo, hi]; };
  for (let y = y0; y <= y1 + 1; y++) { const [lo, hi] = y <= y1 ? rowInk(y) : [1e9, -1]; if (hi >= 0) { if (st === null) { st = y; xs = [lo, hi]; } else xs = [Math.min(xs[0], lo), Math.max(xs[1], hi)]; } else if (st !== null) { out.push(`y ${st}-${y - 1} (h${y - st}) x ${xs[0]}-${xs[1]} | css y ${(st / s).toFixed(1)}-${(y / s).toFixed(1)} x ${(xs[0] / s).toFixed(1)}-${((xs[1] + 1) / s).toFixed(1)}`); st = null; } }
  console.log(out.join('\n'));
} else console.log('unknown cmd');
