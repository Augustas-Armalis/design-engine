// node compare.cjs <round>  -> renders dist at 1134x563@4, writes render-N.png, round-N.png (side-by-side + onion + diff), prints diff stats
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs'); const path = require('path');
const W = '/Users/augustas/dev/design-engine/work/study-attio';
const N = process.argv[2];
const http = require('http');
const serve = () => new Promise(res => { const root = W + '/app/dist'; const srv = http.createServer((q, r) => { let f = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (f.endsWith('/')) f += 'index.html'; fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } const ext = path.extname(f); r.writeHead(200, { 'content-type': { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2' }[ext] || 'application/octet-stream' }); r.end(d); }); }); srv.listen(0, () => res(srv)); });
(async () => {
  const srv = await serve(); const port = srv.address().port;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1134, height: 563 }, deviceScaleFactor: 4 });
  await p.goto(`http://127.0.0.1:${port}/index.html`); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  await p.screenshot({ path: `${W}/render-${N}.png` });
  const ref = 'data:image/png;base64,' + fs.readFileSync(`${W}/ref/reference.png`).toString('base64');
  const ren = 'data:image/png;base64,' + fs.readFileSync(`${W}/render-${N}.png`).toString('base64');
  const q = await b.newPage({ viewport: { width: 2300, height: 1240 }, deviceScaleFactor: 1 });
  await q.setContent(`<html><body style="margin:0;background:#888;font:600 14px Inter,system-ui;color:#fff">
  <div style="position:absolute;left:10px;top:4px">REFERENCE (Attio)</div><div style="position:absolute;left:1160px;top:4px">ROUND ${N} RENDER</div>
  <img src="${ref}" style="position:absolute;left:10px;top:24px;width:1134px;height:563px">
  <img src="${ren}" style="position:absolute;left:1156px;top:24px;width:1134px;height:563px">
  <div style="position:absolute;left:10px;top:600px">ONION 50%</div><div style="position:absolute;left:1160px;top:600px">DIFFERENCE (black = identical)</div>
  <div style="position:absolute;left:10px;top:620px;width:1134px;height:563px;background:#fff"><img src="${ref}" style="position:absolute;inset:0;width:100%;height:100%"><img src="${ren}" style="position:absolute;inset:0;width:100%;height:100%;opacity:.5"></div>
  <div style="position:absolute;left:1156px;top:620px;width:1134px;height:563px;isolation:isolate"><img src="${ref}" style="position:absolute;inset:0;width:100%;height:100%"><img src="${ren}" style="position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:difference"></div>
  </body></html>`);
  await q.waitForTimeout(500);
  await q.screenshot({ path: `${W}/round-${N}.png` });
  // stats + 2x difference crops for reading
  const stats = await q.evaluate(async ({ ref, ren }) => {
    const load = async (s) => { const i = new Image(); i.src = s; await i.decode(); const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const g = c.getContext('2d'); g.drawImage(i, 0, 0); return g.getImageData(0, 0, i.width, i.height).data; };
    const a = await load(ref), r = await load(ren); let sum = 0, bad = 0; const n = a.length / 4;
    const zones = { sidebar: [0, 0, 238, 563], topbar: [238, 0, 1134, 49], viewbar: [238, 49, 1134, 97], sortbar: [238, 97, 1134, 143], header: [238, 143, 1134, 178], rows: [238, 178, 1134, 538], footer: [238, 538, 1134, 563] };
    const z = {}; for (const k in zones) z[k] = [0, 0];
    for (let k = 0; k < n; k++) { const d = (Math.abs(a[k * 4] - r[k * 4]) + Math.abs(a[k * 4 + 1] - r[k * 4 + 1]) + Math.abs(a[k * 4 + 2] - r[k * 4 + 2])) / 3; sum += d; if (d > 24) bad++;
      const x = (k % 4536) / 4, y = Math.floor(k / 4536) / 4; for (const key in zones) { const [x0, y0, x1, y1] = zones[key]; if (x >= x0 && x < x1 && y >= y0 && y < y1) { z[key][0] += d > 24 ? 1 : 0; z[key][1]++; } } }
    const out = { meanAbs: +(sum / n).toFixed(2), pctPixelsOff: +(100 * bad / n).toFixed(2) }; for (const k in z) out[k] = +(100 * z[k][0] / z[k][1]).toFixed(2); return out;
  }, { ref, ren });
  fs.writeFileSync(`${W}/round-${N}.json`, JSON.stringify(stats, null, 1));
  console.log(JSON.stringify(stats));
  await b.close(); srv.close();
})();
