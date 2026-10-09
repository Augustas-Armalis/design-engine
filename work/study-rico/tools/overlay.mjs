#!/usr/bin/env node
// Compose reference vs render as an HTML page of data URLs and screenshot it:
//   panel 1 reference | panel 2 render | panel 3 50% onion-skin | panel 4 pixel diff (pixelmatch, red = differs)
//   node overlay.mjs <ref.png> <render.png> <out.png> [scale=0.5] [crop x,y,w,h in ref px]
// Prints the pixelmatch mismatch % (threshold 0.1) as a progress number.
import fs from 'node:fs'; import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch'; import { chromium } from 'playwright';
const [refP, renP, out, sc = '0.5', crop] = process.argv.slice(2);
const ref = PNG.sync.read(fs.readFileSync(refP)); let ren = PNG.sync.read(fs.readFileSync(renP));
const W = ref.width, H = ref.height;
if (ren.width !== W || ren.height !== H) { // pad/crop render to ref size
  const r2 = new PNG({ width: W, height: H }); r2.data.fill(255);
  for (let y = 0; y < Math.min(H, ren.height); y++) for (let x = 0; x < Math.min(W, ren.width); x++) { const i = (y * W + x) * 4, j = (y * ren.width + x) * 4; for (let k = 0; k < 4; k++) r2.data[i + k] = ren.data[j + k]; }
  ren = r2;
}
const diff = new PNG({ width: W, height: H });
const n = pixelmatch(ref.data, ren.data, diff.data, W, H, { threshold: 0.1, alpha: 0.25, diffColor: [230, 30, 30] });
const pct = (100 * n / (W * H)).toFixed(2);
const url = (png) => 'data:image/png;base64,' + PNG.sync.write(png).toString('base64');
const [cx, cy, cw, ch] = crop ? crop.split(',').map(Number) : [0, 0, W, H];
const s = Number(sc), pw = Math.round(cw * s), ph = Math.round(ch * s);
const panel = (src, label, extra = '') => `<figure><div class="v" style="width:${pw}px;height:${ph}px">${src}${extra}</div><figcaption>${label}</figcaption></figure>`;
const img = (u, op = 1) => `<img src="${u}" style="position:absolute;left:${-cx * s}px;top:${-cy * s}px;width:${W * s}px;height:${H * s}px;opacity:${op}">`;
const html = `<html><body style="margin:0;background:#222;font:600 14px system-ui;color:#ddd"><div style="display:flex;gap:12px;padding:12px">
${panel(img(url(ref)), 'reference (Rico)')}${panel(img(url(ren)), 'recreation')}${panel(img(url(ref)) + img(url(ren), 0.5), '50% onion')}${panel(img(url(diff)), `pixel diff ${pct}%`)}
</div><style>figure{margin:0}.v{position:relative;overflow:hidden;background:#fff}figcaption{padding-top:6px}</style></body></html>`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: pw * 4 + 60, height: ph + 50 } });
await p.setContent(html); await p.waitForTimeout(200); await p.screenshot({ path: out, fullPage: true }); await b.close();
console.log(`${out}  mismatch ${pct}%`);
