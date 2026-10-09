// node cap.cjs <outdir> name|url ...   -> fold-<name>.png, full-<name>.png, imgs-<name>.json
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs'); const path = require('path');
const [out, ...pages] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  for (const p of pages) {
    const [name, url] = p.split('|');
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const pg = await ctx.newPage();
    try {
      await pg.goto(url, { waitUntil: 'load', timeout: 60000 });
      await pg.evaluate(() => document.fonts.ready);
      await pg.waitForTimeout(3500);
      // dismiss cookie banners visually only by hiding (no accepting)
      await pg.screenshot({ path: path.join(out, `fold-${name}.png`) });
      // scroll to trigger lazy loads
      const h = await pg.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < h; y += 700) { await pg.evaluate(y => window.scrollTo(0, y), y); await pg.waitForTimeout(250); }
      await pg.evaluate(() => window.scrollTo(0, 0)); await pg.waitForTimeout(1200);
      const imgs = await pg.evaluate(() => {
        const r = [];
        document.querySelectorAll('img').forEach(i => { const bb = i.getBoundingClientRect(); r.push({ t: 'img', src: i.currentSrc || i.src, nw: i.naturalWidth, nh: i.naturalHeight, w: Math.round(bb.width), h: Math.round(bb.height), alt: i.alt }); });
        document.querySelectorAll('video').forEach(v => { const bb = v.getBoundingClientRect(); r.push({ t: 'video', src: v.currentSrc || v.src || (v.querySelector('source')||{}).src, poster: v.poster, w: Math.round(bb.width), h: Math.round(bb.height) }); });
        return r;
      });
      fs.writeFileSync(path.join(out, `imgs-${name}.json`), JSON.stringify(imgs, null, 1));
      const H = Math.min(h, 16000);
      await pg.setViewportSize({ width: 1440, height: 900 });
      await pg.screenshot({ path: path.join(out, `full-${name}.png`), fullPage: true });
      console.log('ok', name, h, imgs.length);
    } catch (e) { console.log('fail', name, e.message.split('\n')[0]); }
    await ctx.close();
  }
  await b.close();
})();
