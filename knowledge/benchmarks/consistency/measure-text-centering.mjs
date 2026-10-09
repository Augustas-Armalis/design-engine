// Pixel-measured vertical centring of button labels per font: where does the ink of caps / x-height sit relative to the box centre?
// Also measures the fix `text-box: trim-both cap alphabetic`. usage: node measure-text-centering.mjs
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const { PNG } = require('/Users/augustas/dev/design-engine/node_modules/pngjs');
const FONTS = [['Inter', 'Inter:wght@500'], ['Geist', 'Geist:wght@500'], ['DM Sans', 'DM+Sans:wght@500'], ['Manrope', 'Manrope:wght@500'], ['Plus Jakarta Sans', 'Plus+Jakarta+Sans:wght@500'], ['IBM Plex Sans', 'IBM+Plex+Sans:wght@500'], ['Roboto', 'Roboto:wght@500'], ['Space Grotesk', 'Space+Grotesk:wght@500'], ['Instrument Sans', 'Instrument+Sans:wght@500'], ['Figtree', 'Figtree:wght@500'], ['Outfit', 'Outfit:wght@500'], ['Sora', 'Sora:wght@500'], ['Public Sans', 'Public+Sans:wght@500'], ['Onest', 'Onest:wght@500'], ['Hanken Grotesk', 'Hanken+Grotesk:wght@500'], ['Bricolage Grotesque', 'Bricolage+Grotesque:wght@500'], ['Satoshi-like: Albert Sans', 'Albert+Sans:wght@500'], ['system-ui', null]];
const links = FONTS.filter((f) => f[1]).map((f) => `family=${f[1]}`).join('&');
const SIZES = [[13, 20, 32], [14, 20, 40], [16, 24, 48]]; // font-size, line-height, box height
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 4 });
const page = await ctx.newPage();
await page.setContent(`<html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?${links}&display=block"></head><body style="margin:0;background:#fff"></body></html>`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const rows = [];
for (const [fam] of FONTS) {
  const family = fam.includes(':') ? fam.split(': ')[1] : fam;
  for (const [fs_, lh, H] of SIZES) {
    for (const mode of ['normal', 'trim']) for (const label of ['HOME', 'none', 'Settings']) {
      const css = `display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:${H}px;padding:0 16px;margin:0;font:500 ${fs_}px/${lh}px '${family}',system-ui;color:#000;background:#fff;border:0;` ; const inner = mode === 'trim' ? `<span style="text-box:trim-both cap alphabetic">${label}</span>` : label;
      await page.evaluate(({ css, inner, family }) => { document.body.innerHTML = `<div style="padding:20px"><button id=b style="${css}">${inner}</button></div>`; return document.fonts.load(`500 14px '${family}'`).catch(() => {}); }, { css, inner, family });
      await page.waitForTimeout(40);
      const box = await page.evaluate(() => { const r = document.getElementById('b').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
      const png = PNG.sync.read(await page.screenshot({ clip: { x: box.x, y: box.y, width: box.w, height: box.h } }));
      const S = 4; let top = null, bot = null;
      for (let y = 0; y < png.height; y++) { let dark = false; for (let x = 0; x < png.width; x++) { if (png.data[(y * png.width + x) * 4] < 128) { dark = true; break; } } if (dark) { if (top === null) top = y; bot = y; } }
      const inkTop = top / S, inkBot = (bot + 1) / S; const centre = (inkTop + inkBot) / 2;
      rows.push({ font: family, fs: fs_, lh, H, mode, label, boxH: box.h, inkTop, inkBot, inkCentreOffset: +(centre - box.h / 2).toFixed(3) });
    }
  }
}
await browser.close();
fs.writeFileSync(new URL('./text-centering.json', import.meta.url), JSON.stringify(rows, null, 1));
console.log(rows.length);
