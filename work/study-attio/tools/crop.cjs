// node crop.cjs <img> <x> <y> <w> <h> <out>   (raw pixel coords, output at native res)
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs');
(async () => {
  const [file, x, y, w, h, out] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  const data = 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');
  await p.setContent(`<html><body style="margin:0;overflow:hidden"><img src="${data}" style="position:absolute;left:${-x}px;top:${-y}px;image-rendering:pixelated"></body></html>`);
  await p.waitForTimeout(300);
  await p.screenshot({ path: out });
  await b.close();
})();
