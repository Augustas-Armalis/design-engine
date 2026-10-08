const fs = require('fs'), path = require('path');
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const OUT = '/Users/augustas/dev/design-engine/knowledge/benchmarks/motion';
const SAMPLER = fs.readFileSync(path.join(__dirname, 'sampler.js'), 'utf8');
const SITES = { linear: 'https://linear.app', vercel: 'https://vercel.com', stripe: 'https://stripe.com', raycast: 'https://www.raycast.com', resend: 'https://resend.com', clerk: 'https://clerk.com', attio: 'https://attio.com', framer: 'https://www.framer.com', cursor: 'https://cursor.com', dub: 'https://dub.co', granola: 'https://www.granola.ai', plain: 'https://www.plain.com', commslayer: 'https://commslayer.com', alignui: 'https://alignui.com', posthog: 'https://posthog.com' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const snap = () => {
  const sub = (el) => { const cs = getComputedStyle(el); return { t: cs.transform, o: cs.opacity, s: cs.boxShadow.slice(0, 60), bg: cs.backgroundColor, bc: cs.borderTopColor, sc: cs.scale, tr: cs.translate, f: cs.filter }; };
  return sub;
};
async function run(browser, name) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' });
  await ctx.addInitScript(SAMPLER);
  const page = await ctx.newPage();
  const out = { name, press: null, cards: [] };
  try {
    await page.goto(SITES[name], { waitUntil: 'load', timeout: 40000 }).catch(() => {});
    await sleep(4500);
    // primary CTA
    const cta = await page.evaluate(() => {
      const c = [...document.querySelectorAll('main a, main button, a, button')].filter((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 70 && r.height > 28 && r.height < 70 && r.top > 100 && r.bottom < 880 && r.left >= 0 && r.right < 1440 && cs.backgroundColor !== 'rgba(0, 0, 0, 0)'; });
      c.sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return ra.top - rb.top; });
      const el = c[0]; if (!el) return null; el.setAttribute('data-mx-cta', '1'); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, txt: (el.textContent || '').trim().slice(0, 24) };
    });
    if (cta) {
      const read = () => page.evaluate(() => { const el = document.querySelector('[data-mx-cta]'); const cs = getComputedStyle(el); return { t: cs.transform, sc: cs.scale, tr: cs.translate, bg: cs.backgroundColor, sh: cs.boxShadow.slice(0, 50), td: cs.transitionDuration, te: cs.transitionTimingFunction.slice(0, 60), tp: cs.transitionProperty.slice(0, 60) }; });
      await page.mouse.move(5, 5); await sleep(400);
      const rest = await read();
      await page.evaluate(() => window.__mx.reset('hover', 0)); await sleep(100);
      await page.mouse.move(cta.x, cta.y, { steps: 2 }); await sleep(500);
      const hover = await read();
      const hAnims = await page.evaluate(() => window.__mx.dump().anims.filter((a) => a.ps !== 'finished' && a.type === 'CSSTransition').map((a) => ({ n: a.name, d: a.duration, e: a.easing, tg: a.target.slice(0, 30) })));
      await page.mouse.down(); await sleep(250);
      const down = await read();
      await page.mouse.up(); await sleep(100);
      out.press = { cta: cta.txt, rest, hover, down, hoverTransitions: hAnims.slice(0, 6) };
    }
    // cards
    const cards = await page.evaluate(() => {
      const res = [];
      const all = [...document.querySelectorAll('article, a, div, li')];
      for (const el of all) {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        const rad = parseFloat(cs.borderTopLeftRadius) || 0;
        const hasEdge = cs.boxShadow !== 'none' || parseFloat(cs.borderTopWidth) > 0 || cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
        if (r.width >= 260 && r.width <= 760 && r.height >= 140 && r.height <= 620 && rad >= 8 && hasEdge && r.top + scrollY > 700 && el.children.length >= 1) {
          if (res.some((x) => Math.abs(x.y - (r.top + scrollY)) < 40 && Math.abs(x.x - r.left) < 40)) continue;
          res.push({ x: r.left, y: r.top + scrollY, w: r.width, h: r.height, idx: res.length });
          el.setAttribute('data-mx-card', String(res.length - 1));
        }
        if (res.length >= 5) break;
      }
      return res;
    });
    for (const c of cards.slice(0, 4)) {
      try {
        const loc = page.locator(`[data-mx-card="${c.idx}"]`);
        await loc.scrollIntoViewIfNeeded({ timeout: 3000 }); await sleep(1200);
        const box = await loc.boundingBox(); if (!box) continue;
        const rd = () => page.evaluate((i) => { const el = document.querySelector(`[data-mx-card="${i}"]`); const s = (e) => { const cs = getComputedStyle(e); return { t: cs.transform, sc: cs.scale, tr: cs.translate, sh: cs.boxShadow.slice(0, 70), bg: cs.backgroundColor, bc: cs.borderTopColor, td: cs.transitionDuration, te: cs.transitionTimingFunction.slice(0, 50), tp: cs.transitionProperty.slice(0, 50), op: cs.opacity }; }; return { self: s(el), kids: [...el.querySelectorAll('img,svg,video,div')].slice(0, 6).map((k) => ({ tag: k.tagName, ...s(k) })) }; }, c.idx);
        await page.mouse.move(2, 450); await sleep(500);
        const rest = await rd();
        await page.evaluate(() => window.__mx.reset('hover', 0)); await sleep(100);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 }); await sleep(700);
        const hov = await rd();
        const anims = await page.evaluate(() => window.__mx.dump().anims.filter((a) => a.ps !== 'finished' && (a.type === 'CSSTransition' || a.duration < 2000) && a.iterations !== 'Infinity').map((a) => ({ n: a.name, d: a.duration, e: String(a.easing).slice(0, 50), tg: a.target.slice(0, 30), p: a.props.slice(0, 3), from: a.from, to: a.to })));
        out.cards.push({ w: Math.round(c.w), h: Math.round(c.h), rest, hov, anims: anims.slice(0, 10) });
        await page.mouse.move(2, 450); await sleep(300);
      } catch (e) { out.cards.push({ error: e.message.slice(0, 60) }); }
    }
  } catch (e) { out.error = e.message; }
  await ctx.close();
  return out;
}
(async () => {
  const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SITES);
  const browser = await chromium.launch();
  const all = {};
  for (const n of names) { const t = Date.now(); all[n] = await run(browser, n); console.log(n, ((Date.now() - t) / 1000).toFixed(0) + 's', all[n].error || '', 'cards', all[n].cards.length); }
  fs.writeFileSync(path.join(OUT, 'raw', '_hover2-' + names[0] + '.json'), JSON.stringify(all));
  await browser.close();
})();
