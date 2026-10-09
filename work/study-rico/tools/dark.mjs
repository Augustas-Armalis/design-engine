// darkest pixels in boxes: node dark.mjs img "name x0 y0 x1 y1" ...
import fs from 'node:fs'; import { PNG } from 'pngjs';
const [file, ...boxes] = process.argv.slice(2); const img = PNG.sync.read(fs.readFileSync(file));
for (const b of boxes) { const [name, ...r] = b.split(' '); const [x0, y0, x1, y1] = r.map(Number); const px = [];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = (y * img.width + x) * 4; px.push([img.data[i], img.data[i+1], img.data[i+2]]); }
  px.sort((a, b) => (a[0]+a[1]+a[2]) - (b[0]+b[1]+b[2])); const k = Math.max(3, Math.floor(px.length * 0.01)); const avg = [0,1,2].map(c => Math.round(px.slice(0, k).reduce((s, p) => s + p[c], 0) / k));
  console.log(name.padEnd(16), '#' + avg.map(v => v.toString(16).padStart(2, '0')).join(''), ' (darkest 1%)'); }
