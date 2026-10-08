const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const OUT = path.join(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });

function pageMeasure() {
  const cs = el => getComputedStyle(el);
  const vw = innerWidth;
  const vis = el => { const r = el.getBoundingClientRect(); const s = cs(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const txt = el => (el.innerText || '').trim().replace(/\s+/g, ' ');
  const typo = el => { const s = cs(el), r = el.getBoundingClientRect(); return { text: txt(el).slice(0, 70), family: s.fontFamily.slice(0, 70), size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, tt: s.textTransform, align: s.textAlign, w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top + scrollY), left: Math.round(r.left), tag: el.tagName.toLowerCase(), balance: s.textWrap }; };
  const hist = (arr, n = 8) => { const m = {}; arr.forEach(k => m[k] = (m[k] || 0) + 1); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n); };
  const alpha = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return c.startsWith('color(') ? 1 : 0; const p = m[1].split(/[ ,\/]+/).filter(Boolean); return p.length > 3 ? parseFloat(p[3]) : 1; };
  const all = Array.from(document.body.querySelectorAll('*'));
  const o = {};
  o.vw = vw; o.pageHeight = document.documentElement.scrollHeight;
  o.title = document.title;
  o.htmlBg = cs(document.documentElement).backgroundColor; o.bodyBg = cs(document.body).backgroundColor; o.bodyColor = cs(document.body).color;
  o.colorScheme = cs(document.documentElement).colorScheme;
  // text elements
  const textEls = all.filter(el => Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim().length > 0) && vis(el) && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName));
  const h1 = Array.from(document.querySelectorAll('h1')).find(vis);
  o.h1 = h1 ? typo(h1) : null;
  const top = textEls.filter(e => e.getBoundingClientRect().top < 1000 && e.getBoundingClientRect().top + scrollY >= 0);
  let big = null; top.forEach(e => { const f = parseFloat(cs(e).fontSize); if (!big || f > big.f) big = { f, e }; });
  o.largestHeroText = big ? typo(big.e) : null;
  o.h2 = Array.from(document.querySelectorAll('h2')).filter(vis).slice(0, 4).map(typo);
  o.h3 = Array.from(document.querySelectorAll('h3')).filter(vis).slice(0, 2).map(typo);
  const ps = Array.from(document.querySelectorAll('p')).filter(e => vis(e) && txt(e).length > 70);
  o.p = ps.slice(0, 3).map(typo);
  o.heroP = (() => { const h = h1 || (big && big.e); if (!h) return null; const hr = h.getBoundingClientRect(); const c = textEls.filter(e => { const r = e.getBoundingClientRect(); return r.top >= hr.bottom - 5 && r.top < hr.bottom + 250 && txt(e).length > 25 && !/^(A|BUTTON)$/.test(e.tagName); })[0]; return c ? typo(c) : null; })();
  // type scale: weighted by chars
  const scale = {}; textEls.forEach(e => { const s = cs(e); const k = `${s.fontFamily.split(',')[0].replace(/["']/g, '')}|${parseFloat(s.fontSize).toFixed(0)}|${s.fontWeight}`; scale[k] = (scale[k] || 0) + txt(e).length; });
  o.typeScale = Object.entries(scale).sort((a, b) => b[1] - a[1]).slice(0, 14);
  o.fontFamiliesUsed = hist(textEls.map(e => cs(e).fontFamily.split(',')[0].replace(/["']/g, '')), 5);
  o.sizesDistinct = Array.from(new Set(textEls.map(e => parseFloat(cs(e).fontSize)))).sort((a, b) => a - b);
  o.lsHist = hist(textEls.map(e => { const s = cs(e); if (s.letterSpacing === 'normal') return 'normal'; return (parseFloat(s.letterSpacing) / parseFloat(s.fontSize)).toFixed(3) + 'em'; }), 6);
  // nav
  const header = Array.from(document.querySelectorAll('header, [role=banner], nav')).find(vis);
  if (header) {
    const r = header.getBoundingClientRect(), s = cs(header);
    const items = Array.from(header.querySelectorAll('a,button')).filter(vis);
    const lefts = items.map(i => i.getBoundingClientRect().left), rights = items.map(i => i.getBoundingClientRect().right);
    // find outermost fixed/sticky ancestor-or-self
    let fx = header, pos = s.position; for (let p = header; p && p !== document.body; p = p.parentElement) { const ps2 = cs(p).position; if (ps2 === 'fixed' || ps2 === 'sticky') { fx = p; pos = ps2; break; } }
    const fr = fx.getBoundingClientRect(), fs = cs(fx);
    o.nav = { tag: header.tagName, h: Math.round(r.height), outerH: Math.round(fr.height), top: Math.round(fr.top), w: Math.round(fr.width), position: pos, bg: fs.backgroundColor, bgHeader: s.backgroundColor, backdrop: fs.backdropFilter, bb: fs.borderBottom, shadow: fs.boxShadow, contentLeft: Math.round(Math.min(...lefts)), contentRight: Math.round(Math.max(...rights)), nLinks: items.length, linkTexts: items.map(i => txt(i)).filter(Boolean).slice(0, 14), linkTypo: items.filter(i => txt(i)).slice(0, 3).map(typo), hasLogoSvgOrImg: !!header.querySelector('svg,img'), px: s.paddingLeft + '/' + s.paddingRight };
  }
  // CTAs
  const ctaEls = Array.from(document.querySelectorAll('a,button,[role=button]')).filter(e => { if (!vis(e)) return false; const t = txt(e); if (t.length < 2 || t.length > 40) return false; const r = e.getBoundingClientRect(); return r.top < 1000 && r.height >= 24; });
  o.ctas = ctaEls.slice(0, 40).map(e => { const s = cs(e), r = e.getBoundingClientRect(); const a = alpha(s.backgroundColor); const bw = parseFloat(s.borderTopWidth); return { text: txt(e).slice(0, 30), inHeader: header ? header.contains(e) : false, kind: a > 0.3 ? 'filled' : (bw > 0 ? 'outline' : 'text'), h: Math.round(r.height), w: Math.round(r.width), radius: s.borderTopLeftRadius, bg: s.backgroundColor, color: s.color, border: bw ? `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}` : null, size: s.fontSize, weight: s.fontWeight, pad: `${s.paddingTop} ${s.paddingRight}`, shadow: s.boxShadow === 'none' ? null : s.boxShadow.slice(0, 120), family: s.fontFamily.split(',')[0] }; }).filter(c => c.kind !== 'text').slice(0, 14);
  // container chain from h1 or big
  const anchor = h1 || (big && big.e);
  if (anchor) { const ch = []; for (let p = anchor; p && p !== document.documentElement; p = p.parentElement) { const s = cs(p), r = p.getBoundingClientRect(); ch.push({ tag: p.tagName.toLowerCase() + (p.className && typeof p.className === 'string' ? '.' + p.className.split(' ')[0].slice(0, 24) : ''), w: Math.round(r.width), maxW: s.maxWidth, pl: s.paddingLeft, ml: s.marginLeft, disp: s.display, ta: s.textAlign }); } o.chain = ch.slice(0, 9); }
  // sections
  const cand = Array.from(document.querySelectorAll('section, main > div, main > section, [data-section], footer')).filter(e => vis(e) && e.getBoundingClientRect().height > 180);
  const secs = cand.filter(e => !cand.some(o2 => o2 !== e && o2.contains(e))).length >= 3 ? cand.filter(e => !cand.some(o2 => o2 !== e && o2.contains(e))) : cand;
  const leafSel = 'h1,h2,h3,h4,p,a,button,img,video,canvas,svg,li,span';
  o.sections = secs.slice(0, 16).map(sec => {
    const r = sec.getBoundingClientRect(), s = cs(sec);
    const leaves = Array.from(sec.querySelectorAll(leafSel)).filter(l => { if (!vis(l)) return false; const lr = l.getBoundingClientRect(); if (lr.width < 8 || lr.height < 8) return false; if (['SPAN', 'A', 'LI', 'SVG'].includes(l.tagName.toUpperCase()) && !txt(l) && !/svg/i.test(l.tagName)) return false; const ps2 = cs(l).position; return ps2 !== 'absolute' || l.tagName === 'H2' || l.tagName === 'H1'; });
    let minT = Infinity, maxB = -Infinity, minL = Infinity, maxR = -Infinity;
    leaves.forEach(l => { const lr = l.getBoundingClientRect(); if (lr.width > vw * 0.98) return; minT = Math.min(minT, lr.top); maxB = Math.max(maxB, lr.bottom); minL = Math.min(minL, lr.left); maxR = Math.max(maxR, lr.right); });
    const hd = sec.querySelector('h1,h2');
    return { cls: (sec.className && typeof sec.className === 'string' ? sec.className.split(' ')[0].slice(0, 28) : ''), tag: sec.tagName.toLowerCase(), top: Math.round(r.top + scrollY), h: Math.round(r.height), pt: s.paddingTop, pb: s.paddingBottom, effPt: isFinite(minT) ? Math.round(minT - r.top) : null, effPb: isFinite(maxB) ? Math.round(r.bottom - maxB) : null, contentW: isFinite(minL) ? Math.round(maxR - minL) : null, contentL: isFinite(minL) ? Math.round(minL) : null, bg: s.backgroundColor, heading: hd ? txt(hd).slice(0, 50) : '', hSize: hd ? cs(hd).fontSize : null, hAlign: hd ? cs(hd).textAlign : null };
  });
  // radius / shadow / border histograms
  const boxes = all.filter(e => { if (!vis(e)) return false; const r = e.getBoundingClientRect(); return r.width >= 24 && r.height >= 24 && r.width < vw * 0.98; });
  o.radiusAll = hist(boxes.map(e => cs(e).borderTopLeftRadius).filter(x => x !== '0px'), 10);
  const cardLike = boxes.filter(e => { const s = cs(e); const r = e.getBoundingClientRect(); return r.width > 180 && r.height > 100 && (alpha(s.backgroundColor) > 0.02 || parseFloat(s.borderTopWidth) > 0 || s.boxShadow !== 'none') && s.borderTopLeftRadius !== '0px'; });
  o.radiusCards = hist(cardLike.map(e => cs(e).borderTopLeftRadius), 6);
  o.radiusMedia = hist(Array.from(document.querySelectorAll('img,video,canvas')).filter(vis).map(e => cs(e).borderTopLeftRadius).filter(x => x !== '0px'), 4);
  o.radiusInputs = hist(Array.from(document.querySelectorAll('input,select,textarea')).filter(vis).map(e => cs(e).borderTopLeftRadius), 3);
  o.shadows = hist(boxes.map(e => cs(e).boxShadow).filter(x => x !== 'none').map(x => x.slice(0, 170)), 6);
  o.borders = hist(boxes.filter(e => parseFloat(cs(e).borderTopWidth) > 0).map(e => { const s = cs(e); return `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`; }), 6);
  o.cardBgs = hist(cardLike.map(e => cs(e).backgroundColor), 5);
  // grids
  const grids = all.filter(e => vis(e) && cs(e).display === 'grid');
  o.grids = hist(grids.map(e => { const s = cs(e); const n = s.gridTemplateColumns === 'none' ? 0 : s.gridTemplateColumns.split(' ').length; return `${n}col gap ${s.columnGap}/${s.rowGap}`; }), 10);
  const flexGaps = all.filter(e => vis(e) && cs(e).display === 'flex' && cs(e).gap !== 'normal').map(e => cs(e).gap);
  o.flexGaps = hist(flexGaps, 8);
  // colours weighted by area
  const bgm = {}; all.forEach(e => { if (!vis(e)) return; const s = cs(e); if (alpha(s.backgroundColor) < 0.9) return; const r = e.getBoundingClientRect(); const a = Math.min(r.width, vw) * Math.min(r.height, 4000); bgm[s.backgroundColor] = (bgm[s.backgroundColor] || 0) + a; });
  o.bgByArea = Object.entries(bgm).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => [k, Math.round(v / (vw * document.documentElement.scrollHeight) * 100) + '%']);
  o.textColors = hist(textEls.map(e => cs(e).color), 6);
  const lm = {}; textEls.forEach(e => { if (e.tagName === 'A' || e.closest('a')) { const c = cs(e).color; lm[c] = (lm[c] || 0) + 1; } }); o.linkColors = Object.entries(lm).sort((a, b) => b[1] - a[1]).slice(0, 3);
  // features
  const cnt = s => document.querySelectorAll(s).length;
  o.counts = { video: cnt('video'), canvas: cnt('canvas'), iframe: cnt('iframe'), svg: cnt('svg'), img: cnt('img'), picture: cnt('picture'), spline: cnt('spline-viewer'), lottie: cnt('lottie-player,dotlottie-player') };
  o.heroMedia = { video: !!Array.from(document.querySelectorAll('video')).find(v => vis(v) && v.getBoundingClientRect().top < 900), canvas: !!Array.from(document.querySelectorAll('canvas')).find(v => vis(v) && v.getBoundingClientRect().top < 900), bigImg: Array.from(document.querySelectorAll('img,picture,svg')).filter(v => { const r = v.getBoundingClientRect(); return vis(v) && r.width > 400 && r.height > 250 && r.top < 900; }).length };
  const w = window;
  o.libs = { gsap: !!w.gsap, lenis: !!document.querySelector('.lenis,html.lenis') || !!w.Lenis, locomotive: !!document.querySelector('[data-scroll-container],.has-scroll-smooth'), next: !!w.__NEXT_DATA__ || !!document.getElementById('__next') || !!document.querySelector('script[src*="_next/static"]'), framer: !!document.querySelector('[data-framer-name],[data-framer-component-type]') || !!document.querySelector('script[src*="framer"]'), webflow: !!document.documentElement.getAttribute('data-wf-page'), three: !!w.THREE, astro: !!document.querySelector('astro-island'), nuxt: !!w.__NUXT__, tailwindish: all.slice(0, 400).filter(e => typeof e.className === 'string' && /\b(flex|px-\d|py-\d|text-\w+)\b/.test(e.className)).length > 60 };
  o.sticky = all.filter(e => cs(e).position === 'sticky').length; o.fixed = all.filter(e => cs(e).position === 'fixed' && vis(e)).length;
  o.snap = all.filter(e => cs(e).scrollSnapType !== 'none').length;
  return o;
}

function miniMeasure() {
  const cs = el => getComputedStyle(el);
  const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && cs(el).visibility !== 'hidden' && cs(el).display !== 'none'; };
  const h1 = Array.from(document.querySelectorAll('h1')).find(vis);
  const header = Array.from(document.querySelectorAll('header, nav')).find(vis);
  let fx = header; for (let p = header; p && p !== document.body; p = p.parentElement) { const ps = cs(p).position; if (ps === 'fixed' || ps === 'sticky') { fx = p; break; } }
  return { h1: h1 ? { size: cs(h1).fontSize, lh: cs(h1).lineHeight, w: Math.round(h1.getBoundingClientRect().width) } : null, navH: fx ? Math.round(fx.getBoundingClientRect().height) : null, overflowX: document.documentElement.scrollWidth > innerWidth + 2 };
}

function cssAnalysis(css) {
  const out = {};
  const times = []; const eases = {}; const props = {};
  for (const m of css.matchAll(/transition(?:-duration)?\s*:\s*([^;}]+)/g)) {
    const v = m[1];
    for (const t of v.matchAll(/(?<![\w.-])(\d*\.?\d+)(ms|s)\b/g)) { const ms = t[2] === 's' ? parseFloat(t[1]) * 1000 : parseFloat(t[1]); if (ms > 0) times.push(ms); }
    for (const e of v.matchAll(/cubic-bezier\([^)]+\)|ease-in-out|ease-out|ease-in|\bease\b|linear\(|\blinear\b|spring/g)) eases[e[0].replace(/\s+/g, '')] = (eases[e[0].replace(/\s+/g, '')] || 0) + 1;
  }
  for (const m of css.matchAll(/(?:animation-timing-function|--ease[\w-]*|--easing[\w-]*|--transition[\w-]*)\s*:\s*([^;}]+)/g)) for (const e of m[1].matchAll(/cubic-bezier\([^)]+\)/g)) eases[e[0].replace(/\s+/g, '')] = (eases[e[0].replace(/\s+/g, '')] || 0) + 1;
  const th = {}; times.forEach(t => th[t] = (th[t] || 0) + 1);
  out.durations = Object.entries(th).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k}ms x${v}`);
  out.easings = Object.entries(eases).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => `${k} x${v}`);
  const feat = { keyframes: /@keyframes/g, scrollTimeline: /animation-timeline|view-timeline|scroll-timeline/g, startingStyle: /@starting-style/g, viewTransition: /view-transition/g, backdropFilter: /backdrop-filter/g, blendMode: /mix-blend-mode/g, clipPath: /clip-path/g, maskImage: /mask-image/g, atProperty: /@property/g, colorMix: /color-mix\(/g, oklch: /oklch\(/g, textWrapBalance: /text-wrap\s*:\s*(balance|pretty)/g, fontVariation: /font-variation-settings/g, fontFeature: /font-feature-settings/g, has: /:has\(/g, container: /@container/g, clamp: /clamp\(/g, linearEasing: /linear\(\s*0/g, gradient: /(linear|radial|conic)-gradient/g, prefersReduced: /prefers-reduced-motion/g, darkMode: /prefers-color-scheme:\s*dark|\.dark\b|data-theme/g, ligature: /font-variant-ligatures|"calt"|"ss0\d"|"cv\d\d"|"zero"|"tnum"|tabular-nums/g };
  out.features = {}; for (const [k, re] of Object.entries(feat)) { const n = (css.match(re) || []).length; if (n) out.features[k] = n; }
  out.fontFaces = Array.from(new Set(Array.from(css.matchAll(/@font-face\s*\{[^}]*?font-family:\s*["']?([^;"'}]+)/g)).map(m => m[1].trim()))).slice(0, 12);
  const vars = []; const seen = new Set();
  for (const b of css.matchAll(/(?::root|html|body|\.dark|\[data-theme[^\]]*\])[^{}]*\{([^{}]*)\}/g)) for (const d of b[1].matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) { if (/^--(tw|framer|radix|webkit|chakra)/.test(d[1]) || seen.has(d[1])) continue; seen.add(d[1]); vars.push([d[1], d[2].trim().slice(0, 60)]); }
  out.varCount = vars.length;
  out.colorVars = vars.filter(([k, v]) => /#[0-9a-f]{3,8}\b|rgb|hsl|oklch|oklab|color\(/i.test(v)).slice(0, 40);
  out.spaceRadiusVars = vars.filter(([k]) => /radius|space|spacing|gap|container|max-w|width|font|size|ease|duration|shadow|leading|tracking/i.test(k)).slice(0, 40);
  out.cssBytes = css.length;
  return out;
}

async function run(site, browser) {
  const { id, url } = site;
  const res = { id, url, measured: new Date().toISOString().slice(0, 10) };
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', locale: 'en-US', reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  const cssChunks = [];
  page.on('response', async r => { try { const ct = r.headers()['content-type'] || ''; if (ct.includes('text/css') && r.status() === 200) cssChunks.push(await r.text()); } catch (e) {} });
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    res.status = resp && resp.status(); res.finalUrl = page.url();
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500);
    // dismiss nothing; scroll to trigger lazy
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < Math.min(H, 14000); y += 700) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(120); }
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, id + '.png') });
    res.m = await page.evaluate(pageMeasure);
    const inline = await page.evaluate(() => Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n'));
    // also same-origin sheets via CSSOM fallback
    const cssom = await page.evaluate(() => { let t = ''; for (const s of document.styleSheets) { try { for (const r of s.cssRules) t += r.cssText + '\n'; } catch (e) {} } return t.length < 6e6 ? t : ''; });
    const css = cssChunks.join('\n') + '\n' + inline + '\n' + (cssChunks.length ? '' : cssom);
    res.css = cssAnalysis(css);
    res.resp = {};
    for (const w of [1920, 1024, 390]) { await page.setViewportSize({ width: w, height: 900 }); await page.waitForTimeout(700); res.resp[w] = await page.evaluate(miniMeasure); }
    // fonts loaded
    res.fontsLoaded = await page.evaluate(() => Array.from(document.fonts).filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '') + ' ' + f.weight).slice(0, 14));
  } catch (e) { res.error = String(e).slice(0, 300); }
  await ctx.close();
  fs.writeFileSync(path.join(OUT, id + '.json'), JSON.stringify(res, null, 1));
  console.log('done', id, res.error || res.status);
}

(async () => {
  const sites = JSON.parse(fs.readFileSync(process.argv[2]));
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled'] });
  const q = sites.slice(); const workers = Array.from({ length: 4 }, async () => { while (q.length) await run(q.shift(), browser); });
  await Promise.all(workers); await browser.close();
})();
