// detect long horizontal/vertical uniform lines in an image: node lines.cjs <img>
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const file = process.argv[2];
  const b = await chromium.launch(); const p = await b.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');
  const res = await p.evaluate(async (src) => {
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data; const W = c.width, H = c.height;
    const px = (i, j) => { const k = (j * W + i) * 4; return [d[k], d[k + 1], d[k + 2]]; };
    const H_lines = [];
    for (let j = 0; j < H; j++) { // row: count pixels that are light grey (not white) in a run
      let run = 0, best = 0, col = null;
      for (let i = 0; i < W; i++) { const [r, g, bb] = px(i, j); const isLine = r < 248 && r > 200 && Math.abs(r - g) < 6 && Math.abs(g - bb) < 8; if (isLine) { run++; if (run > best) { best = run; col = [r, g, bb]; } } else run = 0; }
      if (best > W * 0.25) H_lines.push([j, best, col.join(',')]);
    }
    const V_lines = [];
    for (let i = 0; i < W; i++) { let run = 0, best = 0, col = null; for (let j = 0; j < H; j++) { const [r, g, bb] = px(i, j); const isLine = r < 248 && r > 200 && Math.abs(r - g) < 6 && Math.abs(g - bb) < 8; if (isLine) { run++; if (run > best) { best = run; col = [r, g, bb]; } } else run = 0; } if (best > H * 0.3) V_lines.push([i, best, col.join(',')]); }
    return { W, H, H_lines, V_lines, corner: px(5, 5), side: px(100, 1500), main: px(2500, 1500) };
  }, data);
  console.log(JSON.stringify(res));
  await b.close();
})();
