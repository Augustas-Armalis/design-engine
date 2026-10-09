// node bands.cjs <img> <scale> x0 x1 y0 y1 [axis=y|x] [thresh]  -> list ink bands along axis (CSS px), using bg = most common colour
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs');
(async () => {
  const [file, scale, x0, x1, y0, y1, axis = 'y', th = '60'] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage();
  const data = 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');
  const r = await p.evaluate(async ({ src, s, x0, x1, y0, y1, axis, th }) => {
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const X = x0 * s, Y = y0 * s, W = (x1 - x0) * s, H = (y1 - y0) * s; const d = g.getImageData(X, Y, W, H).data;
    const hist = {}; for (let k = 0; k < d.length; k += 4) { const key = d[k] + ',' + d[k + 1] + ',' + d[k + 2]; hist[key] = (hist[key] || 0) + 1; }
    const bg = Object.entries(hist).sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number);
    const N = axis === 'y' ? H : W, M = axis === 'y' ? W : H; const ink = [];
    for (let a = 0; a < N; a++) { let n = 0; for (let m = 0; m < M; m++) { const i = axis === 'y' ? m : a, j = axis === 'y' ? a : m; const k = (j * W + i) * 4; if (Math.abs(d[k] - bg[0]) + Math.abs(d[k + 1] - bg[1]) + Math.abs(d[k + 2] - bg[2]) > th) n++; } ink.push(n); }
    const bands = []; let st = -1; for (let a = 0; a <= N; a++) { const on = a < N && ink[a] > 0; if (on && st < 0) st = a; if (!on && st >= 0) { bands.push([(st / s + (axis === 'y' ? y0 : x0)).toFixed(2), (a / s + (axis === 'y' ? y0 : x0)).toFixed(2)]); st = -1; } }
    return { bg, bands };
  }, { src: data, s: +scale, x0: +x0, x1: +x1, y0: +y0, y1: +y1, axis, th: +th });
  console.log('bg', r.bg.join(','), '\n' + r.bands.map(b => b.join('-') + ` (${(b[1] - b[0]).toFixed(2)})`).join('\n'));
  await b.close();
})();
