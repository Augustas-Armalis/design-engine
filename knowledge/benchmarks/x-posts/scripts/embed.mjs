// Screenshot X's public embed page (platform.twitter.com, no login) and measure media tile boxes.
import { createRequire } from 'node:module';
const require = createRequire('/Users/augustas/dev/design-engine/package.json');
const { chromium } = require('playwright');
import fs from 'node:fs';
const [outDir, ...ids] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 560, height: 1100 }, deviceScaleFactor: 2, colorScheme: 'light' });
const res = {};
for (const spec of ids) {
  const [id, name] = spec.split(':');
  const p = await ctx.newPage();
  try {
    await p.goto(`https://platform.twitter.com/embed/Tweet.html?id=${id}&theme=light&dnt=true`, { waitUntil: 'networkidle', timeout: 45000 });
    await p.waitForTimeout(2500);
    const m = await p.evaluate(() => {
      const art = document.querySelector('article') || document.body;
      const r = art.getBoundingClientRect();
      const imgs = [...document.querySelectorAll('img[src*="pbs.twimg.com/media"], img[src*="amplify_video_thumb"], img[src*="ext_tw_video_thumb"], video')].map(e => { const q = e.getBoundingClientRect(); const box = e.closest('a,div[style]')?.getBoundingClientRect() || q; return { tag: e.tagName, w: Math.round(box.width), h: Math.round(box.height), ratio: +(box.width / box.height).toFixed(3), x: Math.round(box.x), y: Math.round(box.y) }; });
      return { article: { w: Math.round(r.width), h: Math.round(r.height), x: r.x, y: r.y }, media: imgs };
    });
    res[id] = m;
    const el = await p.$('article');
    const file = `${outDir}/${name || id}.png`;
    if (el) await el.screenshot({ path: file }); else await p.screenshot({ path: file });
    console.log(id, JSON.stringify(m.media));
  } catch (e) { console.log('ERR', id, e.message.slice(0, 100)); }
  await p.close();
}
fs.writeFileSync(`${outDir}/embed-measure-${Date.now()}.json`, JSON.stringify(res, null, 1));
await b.close();
