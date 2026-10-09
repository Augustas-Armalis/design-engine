// trace blue lines in a chart region: for each x column, find runs of "blue" pixels (b - r > thr). Output css coords.
import fs from 'node:fs'; import { PNG } from 'pngjs';
const [file, x0, y0, x1, y1, s, step = 3] = process.argv.slice(2); const img = PNG.sync.read(fs.readFileSync(file));
const S = Number(s); const solid = [], dotted = [];
for (let x = +x0; x <= +x1; x += +step) { const runs = []; let st = null, minL = 999, minY = 0;
  for (let y = +y0; y <= +y1 + 1; y++) { const i = (y * img.width + x) * 4; const [r, g, b] = [img.data[i], img.data[i+1], img.data[i+2]];
    const blue = y <= +y1 && b - r > 35; if (blue) { if (st === null) { st = y; minL = 999; } const l = r + g; if (l < minL) { minL = l; minY = y; } }
    else if (st !== null) { runs.push({ st, en: y - 1, y: minY, sat: 510 - minL }); st = null; } }
  // strongest run = solid line, weaker = dotted
  runs.sort((a, b) => b.sat - a.sat);
  const sol = runs[0] && runs[0].sat > 200 && (runs[0].en - runs[0].st) >= 2 ? runs[0] : null;
  if (sol) solid.push([+(x / S).toFixed(1), +(sol.y / S).toFixed(1)]);
  for (const r of runs) if (r !== sol && (!sol || Math.abs(r.y - sol.y) > 4)) { dotted.push([+(x / S).toFixed(1), +(r.y / S).toFixed(1)]); break; }
}
console.log(JSON.stringify({ solid, dotted }));
