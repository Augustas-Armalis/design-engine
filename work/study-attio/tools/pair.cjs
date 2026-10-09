// node pair.cjs <round> <out> x y w h [zoom]  -> ref crop above render crop (CSS coords, rendered at zoom px per css px)
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs');
const W = '/Users/augustas/dev/design-engine/work/study-attio';
(async () => {
  const [N, out, x, y, w, h, z = '4'] = process.argv.slice(2); const Z = +z;
  const ref = 'data:image/png;base64,' + fs.readFileSync(`${W}/ref/reference.png`).toString('base64');
  const ren = 'data:image/png;base64,' + fs.readFileSync(`${W}/render-${N}.png`).toString('base64');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w * Z, height: h * Z * 2 + 6 }, deviceScaleFactor: 1 });
  const im = (s, top) => `<div style="position:absolute;left:0;top:${top}px;width:${w * Z}px;height:${h * Z}px;overflow:hidden"><img src="${s}" style="position:absolute;left:${-x * Z}px;top:${-y * Z}px;width:${1134 * Z}px;height:${563 * Z}px;image-rendering:pixelated"></div>`;
  await p.setContent(`<body style="margin:0;background:#f0f">${im(ref, 0)}${im(ren, h * Z + 6)}</body>`); await p.waitForTimeout(300);
  await p.screenshot({ path: out }); await b.close();
})();
