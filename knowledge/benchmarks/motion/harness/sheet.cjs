const fs = require('fs'), path = require('path');
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const OUT = '/Users/augustas/dev/design-engine/knowledge/benchmarks/motion';
const T = [0, 150, 300, 500, 800, 1200, 2000];
(async () => {
  const names = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 100 } });
  for (const n of names) {
    const imgs = T.map((t) => { const f = path.join(OUT, `${n}-${t}.png`); return fs.existsSync(f) ? `<figure><img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}"><figcaption>${t}ms</figcaption></figure>` : ''; }).join('');
    await p.setContent(`<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(4,350px);gap:6px;padding:6px;font:12px sans-serif;color:#fff}figure{margin:0}img{width:350px;display:block}</style>${imgs}`);
    await p.screenshot({ path: path.join(OUT, `${n}-sheet.png`), fullPage: true });
  }
  await b.close();
})();
