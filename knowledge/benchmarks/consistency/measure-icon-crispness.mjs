// How crisp is a 24-grid stroke icon (Lucide menu: three horizontal lines, 2px stroke on a 24 grid) when drawn at other sizes / half-pixel offsets?
// metric: share of ink-column pixels that are mid-grey (anti-aliased) rather than solid. lower = crisper.
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const { PNG } = require('/Users/augustas/dev/design-engine/node_modules/pngjs');
const MENU = (extra) => `<path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="#000" stroke-linecap="butt" ${extra}/>`;
const browser = await chromium.launch(); const out = [];
for (const dpr of [1, 2]) {
  const page = await (await browser.newContext({ viewport: { width: 200, height: 120 }, deviceScaleFactor: dpr })).newPage();
  for (const size of [14, 15, 16, 18, 20, 24, 32]) for (const off of [0, 0.5]) for (const mode of ['scaled stroke 2 (viewBox units)', 'fixed 1.5px non-scaling', 'fixed 1px non-scaling']) {
    const extra = mode.startsWith('scaled') ? 'stroke-width="2"' : mode.includes('1.5') ? 'stroke-width="1.5" vector-effect="non-scaling-stroke"' : 'stroke-width="1" vector-effect="non-scaling-stroke"';
    await page.setContent(`<!doctype html><body style="margin:0;background:#fff"><div style="position:absolute;left:${20 + off}px;top:${20 + off}px;line-height:0"><svg width="${size}" height="${size}" viewBox="0 0 24 24" style="display:block;overflow:visible">${MENU(extra)}</svg></div></body>`);
    const png = PNG.sync.read(await page.screenshot({ clip: { x: 10, y: 10, width: 60, height: 60 } }));
    // sample the column in the middle of the lines (x = 20 + size/2)
    const cx = Math.round((10 + size / 2) * dpr); let ink = 0, grey = 0, solid = 0;
    for (let y = 0; y < png.height; y++) { const l = png.data[(y * png.width + cx) * 4]; if (l < 250) { ink++; if (l > 40 && l < 215) grey++; else solid++; } }
    out.push({ dpr, size, offset: off, mode, inkPx: ink, greyPx: grey, greyShare: ink ? +(grey / ink).toFixed(2) : null });
  }
  await page.context().close();
}
await browser.close();
fs.writeFileSync(new URL('./icon-crispness.json', import.meta.url), JSON.stringify(out, null, 1));
for (const dpr of [1, 2]) { console.log('DPR', dpr); for (const mode of ['scaled stroke 2 (viewBox units)', 'fixed 1.5px non-scaling', 'fixed 1px non-scaling']) console.log(' ', mode.padEnd(34), [14, 15, 16, 18, 20, 24, 32].map((s) => { const a = out.find((o) => o.dpr === dpr && o.size === s && o.offset === 0 && o.mode === mode); const b = out.find((o) => o.dpr === dpr && o.size === s && o.offset === 0.5 && o.mode === mode); return `${s}:${a.greyShare}/${b.greyShare}`; }).join(' ')); }
