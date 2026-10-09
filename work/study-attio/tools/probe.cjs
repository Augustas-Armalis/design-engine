// node probe.cjs <img> <scale> "name:x,y,w,h" ...   (CSS coords) -> ink bbox in CSS px, bg colour, darkest ink colour, dominant non-bg colours
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs');
(async () => {
  const [file, scale, ...boxes] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');
  const res = await p.evaluate(async ({ src, scale, boxes }) => {
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const out = [];
    for (const bx of boxes) {
      const [name, r] = bx.split(':'); const [X, Y, W, H] = r.split(',').map(Number);
      const s = +scale; const d = x.getImageData(X * s, Y * s, W * s, H * s).data; const w = W * s, h = H * s;
      const hist = {}; for (let k = 0; k < d.length; k += 4) { const key = (d[k] >> 2 << 2) + ',' + (d[k + 1] >> 2 << 2) + ',' + (d[k + 2] >> 2 << 2); hist[key] = (hist[key] || 0) + 1; }
      const sorted = Object.entries(hist).sort((a, b) => b[1] - a[1]);
      const bg = sorted[0][0].split(',').map(Number);
      let minx = 1e9, miny = 1e9, maxx = -1, maxy = -1, dark = [255, 255, 255], dl = 999;
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const k = (j * w + i) * 4; const diff = Math.abs(d[k] - bg[0]) + Math.abs(d[k + 1] - bg[1]) + Math.abs(d[k + 2] - bg[2]); if (diff > 60) { if (i < minx) minx = i; if (i > maxx) maxx = i; if (j < miny) miny = j; if (j > maxy) maxy = j; const L = d[k] + d[k + 1] + d[k + 2]; if (L < dl) { dl = L; dark = [d[k], d[k + 1], d[k + 2]]; } } }
      out.push(`${name}: bg(${bg}) ink x ${(X + minx / s).toFixed(2)}-${(X + (maxx + 1) / s).toFixed(2)} y ${(Y + miny / s).toFixed(2)}-${(Y + (maxy + 1) / s).toFixed(2)} (w ${((maxx - minx + 1) / s).toFixed(2)} h ${((maxy - miny + 1) / s).toFixed(2)}) darkest(${dark}) top: ${sorted.slice(0, 5).map(e => e[0] + 'x' + e[1]).join(' ')}`);
    }
    return out;
  }, { src: data, scale, boxes });
  console.log(res.join('\n'));
  await b.close();
})();
