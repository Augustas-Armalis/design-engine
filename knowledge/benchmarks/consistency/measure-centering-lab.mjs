// Controlled lab: which CSS recipes centre a 16px/15px icon inside a box, measured on rendered pixels (ink bbox centre vs box centre).
// usage: node measure-centering-lab.mjs
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const { PNG } = require('/Users/augustas/dev/design-engine/node_modules/pngjs');
const SQ = (n) => `<svg ${n} viewBox="0 0 24 24" fill="#000"><rect x="2" y="2" width="20" height="20"/></svg>`; // solid square: ink == svg box, so ink centre == svg centre
const base = 'box-sizing:border-box;margin:0;padding:0;border:0;background:#fff;font:14px/20px Arial,sans-serif;color:#000;';
const cases = [
  ['inline-block box + inline svg (baseline trap)', (s, B) => `<div style="${base}display:inline-block;width:${B}px;height:${B}px;text-align:center">${SQ(`width=${s} height=${s}`)}</div>`],
  ['same, svg display:block + margin:auto', (s, B) => `<div style="${base}display:inline-block;width:${B}px;height:${B}px">${SQ(`width=${s} height=${s} style="display:block;margin:auto;position:relative;top:${(B - s) / 2}px"`)}</div>`],
  ['inline-block box line-height:0 + svg', (s, B) => `<div style="${base}display:inline-block;width:${B}px;height:${B}px;text-align:center;line-height:0">${SQ(`width=${s} height=${s}`)}</div>`],
  ['inline-block + svg vertical-align:middle', (s, B) => `<div style="${base}display:inline-block;width:${B}px;height:${B}px;text-align:center;line-height:${B}px">${SQ(`width=${s} height=${s} style="vertical-align:middle"`)}</div>`],
  ['inline-flex center/center', (s, B) => `<div style="${base}display:inline-flex;align-items:center;justify-content:center;width:${B}px;height:${B}px">${SQ(`width=${s} height=${s}`)}</div>`],
  ['inline-grid place-items:center', (s, B) => `<div style="${base}display:inline-grid;place-items:center;width:${B}px;height:${B}px">${SQ(`width=${s} height=${s}`)}</div>`],
  ['<button> UA defaults + inline svg', (s, B) => `<button style="width:${B}px;height:${B}px;background:#fff;border:0;display:inline-block">${SQ(`width=${s} height=${s}`)}</button>`],
  ['inline-block box, text-align:center, line-height = box height, svg vertical-align:middle', (s, B) => `<div style="${base}display:inline-block;width:${B}px;height:${B}px;text-align:center;line-height:${B}px">${SQ(`width=${s} height=${s} style="vertical-align:middle"`)}</div>`],
  ['<button> inline-flex center/center, padding:0', (s, B) => `<button style="${base}display:inline-flex;align-items:center;justify-content:center;width:${B}px;height:${B}px">${SQ(`width=${s} height=${s}`)}</button>`],
];
const browser = await chromium.launch();
const out = [];
for (const dpr of [1, 2]) {
  const ctx = await browser.newContext({ viewport: { width: 300, height: 200 }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  for (const [s, B] of [[16, 32], [15, 32], [16, 33], [15, 33], [20, 36], [14, 28]]) {
    for (const [name, fn] of cases) {
      await page.setContent(`<!doctype html><body style="margin:0;background:#fff"><div style="position:absolute;left:20px;top:20px;line-height:0;font-size:0">${fn(s, B)}</div></body>`);
      const box = await page.evaluate(() => { const e = document.body.firstElementChild.firstElementChild; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
      const png = PNG.sync.read(await page.screenshot({ clip: { x: box.x, y: box.y, width: box.w, height: box.h } }));
      let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
      for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) if (png.data[(y * png.width + x) * 4] < 128) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      if (x1 < 0) { out.push({ dpr, icon: s, box: B, name, error: 'no ink (clipped/shrunk)' }); continue; }
      // the square's ink is 20/24 of the svg: ink centre == svg centre
      out.push({ dpr, icon: s, box: B, name, dx: +(((x0 + x1 + 1) / 2 - png.width / 2) / dpr).toFixed(3), dy: +(((y0 + y1 + 1) / 2 - png.height / 2) / dpr).toFixed(3), inkW: +((x1 - x0 + 1) / dpr).toFixed(2), expectedInkW: +(s * 20 / 24).toFixed(2) });
    }
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(new URL('./centering-lab.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(out.length);
