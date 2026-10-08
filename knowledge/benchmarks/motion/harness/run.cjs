const fs = require('fs'), path = require('path');
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const OUT = '/Users/augustas/dev/design-engine/knowledge/benchmarks/motion';
const SAMPLER = fs.readFileSync(path.join(__dirname, 'sampler.js'), 'utf8');
const SITES = {
  linear: 'https://linear.app', vercel: 'https://vercel.com', stripe: 'https://stripe.com', raycast: 'https://www.raycast.com',
  resend: 'https://resend.com', clerk: 'https://clerk.com', attio: 'https://attio.com', framer: 'https://www.framer.com',
  cursor: 'https://cursor.com', posthog: 'https://posthog.com', dub: 'https://dub.co', granola: 'https://www.granola.ai',
  plain: 'https://www.plain.com', commslayer: 'https://commslayer.com', alignui: 'https://alignui.com',
};
const TARGETS = [0, 150, 300, 500, 800, 1200, 2000];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newCtx(browser, reduced) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: reduced ? 'reduce' : 'no-preference', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', locale: 'en-US' });
  await ctx.addInitScript(SAMPLER);
  return ctx;
}

async function hero(browser, name, url, reduced) {
  const ctx = await newCtx(browser, reduced);
  const page = await ctx.newPage();
  const frames = [];
  let cdp;
  if (!reduced) {
    cdp = await ctx.newCDPSession(page);
    cdp.on('Page.screencastFrame', (f) => { frames.push({ ts: f.metadata.timestamp * 1000, data: f.data }); cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); });
    await cdp.send('Page.startScreencast', { format: 'png', maxWidth: 720, maxHeight: 450, everyNthFrame: 1 });
  }
  const navStart = Date.now();
  try { await page.goto(url, { waitUntil: 'commit', timeout: 45000 }); } catch (e) { await ctx.close(); return { error: 'goto ' + e.message }; }
  try { await page.waitForLoadState('load', { timeout: 30000 }); } catch (e) {}
  let fcp = null;
  for (let i = 0; i < 40 && fcp == null; i++) { fcp = await page.evaluate(() => window.__mx && window.__mx.fcp).catch(() => null); if (fcp == null) await sleep(100); }
  await sleep(4500);
  if (cdp) await cdp.send('Page.stopScreencast').catch(() => {});
  const dump = await page.evaluate(() => window.__mx.dump());
  return { ctx, page, frames, dump, navStart };
}

async function filmstrip(name, h) {
  const { frames, dump } = h; if (!frames.length) return null;
  const fcp = dump.fcp ?? 0, origin = dump.origin;
  const rel = frames.map((f) => ({ t: f.ts - origin, data: f.data }));
  const saved = [];
  for (const T of TARGETS) {
    const want = fcp + T; let pick = rel[0];
    for (const f of rel) if (f.t <= want) pick = f;
    fs.writeFileSync(path.join(OUT, `${name}-${T}.png`), Buffer.from(pick.data, 'base64'));
    saved.push({ target: T, frameT: Math.round(pick.t - fcp) });
  }
  return { nFrames: frames.length, firstFrameRelFcp: Math.round(rel[0].t - fcp), lastFrameRelFcp: Math.round(rel[rel.length - 1].t - fcp), saved };
}

async function scrollPhase(page) {
  await page.evaluate(() => { window.__mx.reset('scroll', 500); });
  await page.mouse.move(720, 450);
  const info = [];
  let prev = -1, same = 0;
  for (let i = 0; i < 55; i++) {
    await page.evaluate((i) => window.__mx.mark('step', { i }), i);
    await page.mouse.wheel(0, 450);
    await sleep(650);
    const y = await page.evaluate(() => [scrollY, document.documentElement.scrollHeight]);
    info.push(y);
    if (y[0] === prev) { same++; if (same >= 2) break; } else same = 0;
    prev = y[0];
  }
  await sleep(1500);
  return info;
}

async function tabsPhase(page) {
  const n = await page.evaluate(() => document.querySelectorAll('[role=tab]').length);
  if (!n) return { tabs: 0 };
  const res = { tabs: n, trials: [] };
  for (let k = 0; k < Math.min(2, n - 1); k++) {
    const loc = page.locator('[role=tab]').nth(k + 1);
    try {
      await loc.scrollIntoViewIfNeeded({ timeout: 3000 });
      await sleep(900);
      await page.evaluate(() => window.__mx.reset('tab', 300));
      await sleep(150);
      await page.evaluate(() => window.__mx.mark('click'));
      await loc.click({ timeout: 3000 });
      await sleep(1400);
      const d = await page.evaluate(() => window.__mx.dump());
      res.trials.push({ index: k + 1, dump: d });
    } catch (e) { res.trials.push({ index: k + 1, error: e.message.slice(0, 80) }); }
  }
  return res;
}

async function hoverPhase(page) {
  await page.evaluate(() => { window.scrollTo(0, 0); });
  await sleep(1200);
  const census = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('a,button,[role=tab],[role=button],summary').forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.width < 8 || r.height < 8) return;
      const cs = getComputedStyle(el);
      const d = cs.transitionDuration.split(',').map((s) => parseFloat(s) * (s.includes('ms') ? 1 : 1000));
      if (!d.some((x) => x > 0)) return;
      out.push({ props: cs.transitionProperty.slice(0, 80), dur: cs.transitionDuration, ease: cs.transitionTimingFunction.slice(0, 80), delay: cs.transitionDelay, inView: r.top < innerHeight && r.bottom > 0, cls: (el.tagName + '.' + (typeof el.className === 'string' ? el.className : '')).slice(0, 50), h: Math.round(r.height), w: Math.round(r.width) });
    });
    return { total: document.querySelectorAll('a,button,[role=tab],[role=button],summary').length, withTransition: out.length, sample: out.slice(0, 60) };
  });
  const targets = await page.evaluate(() => {
    const c = []; const seen = new Set();
    document.querySelectorAll('header a, nav a, main a, main button, a[class*=btn],a[class*=button],button').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 30 || r.height < 20 || r.top < 0 || r.bottom > 880 || r.left < 0 || r.right > 1440) return;
      const k = Math.round(r.left / 20) + ',' + Math.round(r.top / 20); if (seen.has(k)) return; seen.add(k);
      c.push({ x: r.left + r.width / 2, y: r.top + r.height / 2, name: ((el.textContent || '').trim().slice(0, 20)) || el.tagName, big: r.width * r.height });
    });
    return c.slice(0, 8);
  });
  const hovers = [];
  for (const t of targets.slice(0, 6)) {
    await page.mouse.move(5, 5); await sleep(300);
    await page.evaluate(() => window.__mx.reset('hover', 0));
    await sleep(100);
    await page.mouse.move(t.x, t.y, { steps: 3 }); await sleep(450);
    const d = await page.evaluate(() => { const D = window.__mx.dump(); return { anims: D.anims.filter((a) => a.ps !== "finished"), els: D.els.slice(0, 12).map((e) => ({ desc: e.desc, n: e.series.length, first: e.series[0].slice(1), last: e.series[e.series.length - 1].slice(1), dur: e.series[e.series.length - 1][0] - e.series[1][0] })), wapi: D.wapi }; });
    hovers.push({ target: t.name, anims: d.anims.slice(0, 12).map((a) => ({ type: a.type, name: a.name, dur: a.duration, delay: a.delay, ease: a.easing, props: a.props.slice(0, 5), target: a.target.slice(0, 40) })), els: d.els, wapi: d.wapi.slice(0, 4) });
  }
  return { census, hovers };
}

async function runSite(browser, name) {
  const url = SITES[name];
  const rec = { name, url, ts: new Date().toISOString() };
  try {
    const h = await hero(browser, name, url, false);
    if (h.error) { rec.error = h.error; return rec; }
    rec.title = await h.page.title().catch(() => '');
    rec.film = await filmstrip(name, h);
    rec.hero = h.dump;
    try { rec.scroll = { steps: null, dump: null }; rec.scroll.steps = await scrollPhase(h.page); rec.scroll.dump = await h.page.evaluate(() => window.__mx.dump()); } catch (e) { rec.scrollError = e.message; }
    try { rec.tabs = await tabsPhase(h.page); } catch (e) { rec.tabsError = e.message; }
    try { rec.hover = await hoverPhase(h.page); } catch (e) { rec.hoverError = e.message; }
    await h.ctx.close();
    try { const r = await hero(browser, name, url, true); if (!r.error) { rec.reduced = r.dump; await r.ctx.close(); } } catch (e) { rec.reducedError = e.message; }
  } catch (e) { rec.error = e.message; }
  return rec;
}

(async () => {
  const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SITES);
  const browser = await chromium.launch({ headless: true });
  for (const n of names) {
    const t = Date.now();
    const rec = await runSite(browser, n);
    fs.writeFileSync(path.join(OUT, 'raw', n + '.json'), JSON.stringify(rec));
    console.log(n, rec.error ? 'ERROR ' + rec.error : 'ok', ((Date.now() - t) / 1000).toFixed(1) + 's', rec.hero ? `els=${rec.hero.els.length} anims=${rec.hero.anims.length} fcp=${Math.round(rec.hero.fcp)} frames=${rec.film && rec.film.nFrames}` : '');
  }
  await browser.close();
})();
