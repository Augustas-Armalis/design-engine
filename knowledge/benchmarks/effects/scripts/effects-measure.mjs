// Effects & materials measurement: shadows, glass, grain, masks, gradients, corner shapes, animations.
// usage: node effects-measure.mjs <name> <url> [--scheme light|dark] [--wait 3500] [--full]
// Writes ../raw/<name>.json and ../raw/<name>-fold.png (1440x900 @1x). Read-only on the site: no clicks, no logins.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.resolve(HERE, '../raw');
const a = process.argv.slice(2);
const name = a[0], url = a[1];
const flag = (n, d) => { const i = a.indexOf('--' + n); return i > -1 ? a[i + 1] : d; };
const scheme = flag('scheme', 'light');
const wait = +flag('wait', 3500);

const measure = () => {
  const out = { url: location.href, title: document.title };
  const cs = (el, p) => getComputedStyle(el, p);
  const short = (s, n = 260) => (s || '').toString().slice(0, n);
  const desc = el => {
    const c = typeof el.className === 'string' ? el.className : (el.getAttribute('class') || '');
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (c ? '.' + c.trim().split(/\s+/).slice(0, 4).join('.') : '');
  };
  const rect = el => { const r = el.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; };
  const vis = el => { const r = el.getBoundingClientRect(); const s = cs(el); return r.width > 2 && r.height > 2 && s.display !== 'none' && s.visibility !== 'hidden'; };
  const els = Array.from(document.querySelectorAll('body *')).filter(vis).slice(0, 9000);
  const shadows = {}, glass = [], blends = [], masks = [], filters = [], grads = [], urls = [], corner = [], clip = [], anims = {}, borderImg = [], textShadow = {}, radii = {};
  const add = (map, k, info) => { if (!map[k]) map[k] = { n: 0, ex: [] }; map[k].n++; if (map[k].ex.length < 3) map[k].ex.push(info); };
  for (const el of els) {
    for (const pseudo of [null, '::before', '::after']) {
      const s = cs(el, pseudo);
      if (pseudo && (s.content === 'none' || s.content === 'normal')) continue;
      const who = desc(el) + (pseudo || '');
      const r = rect(el);
      const br = s.borderTopLeftRadius;
      const info = { el: who, rect: r, radius: br, bg: s.backgroundColor, border: s.borderTopWidth !== '0px' ? `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}` : null };
      if (s.boxShadow && s.boxShadow !== 'none') add(shadows, s.boxShadow, info);
      if (!pseudo && br && br !== '0px') add(radii, br, { el: who, h: r[3] });
      const bf = s.backdropFilter || s.webkitBackdropFilter;
      if (bf && bf !== 'none') glass.push({ ...info, backdropFilter: bf, bgImage: short(s.backgroundImage), boxShadow: short(s.boxShadow), opacity: s.opacity });
      if (s.mixBlendMode && s.mixBlendMode !== 'normal') blends.push({ ...info, blend: s.mixBlendMode, opacity: s.opacity, bgImage: short(s.backgroundImage, 200), filter: s.filter });
      const mi = s.maskImage || s.webkitMaskImage;
      if (mi && mi !== 'none') masks.push({ ...info, mask: short(mi, 400), composite: s.maskComposite || s.webkitMaskComposite, maskSize: s.maskSize, maskRepeat: s.maskRepeat, opacity: s.opacity });
      if (s.filter && s.filter !== 'none') filters.push({ ...info, filter: s.filter, opacity: s.opacity });
      const bi = s.backgroundImage;
      if (bi && bi !== 'none') {
        if (/gradient/.test(bi)) grads.push({ ...info, bg: short(bi, 500), size: s.backgroundSize, clip: s.backgroundClip || s.webkitBackgroundClip, opacity: s.opacity, blend: s.mixBlendMode, bgBlend: s.backgroundBlendMode });
        if (/url\(/.test(bi)) { const u = bi.match(/url\("?([^")]+)"?\)/g) || []; urls.push({ ...info, urls: u.map(x => short(x, 160)), size: s.backgroundSize, repeat: s.backgroundRepeat, opacity: s.opacity, blend: s.mixBlendMode }); }
      }
      const shp = s.getPropertyValue('corner-shape') || s.getPropertyValue('corner-top-left-shape');
      if (shp && !/^((round|superellipse\(1\))\s*)*$/.test(shp.trim()) && br !== '0px') corner.push({ ...info, cornerShape: shp });
      if (s.clipPath && s.clipPath !== 'none') clip.push({ ...info, clipPath: short(s.clipPath, 300) });
      if (s.animationName && s.animationName !== 'none') add(anims, s.animationName + ' ' + s.animationDuration + ' ' + s.animationTimingFunction + ' ' + s.animationIterationCount, { el: who, rect: r });
      if (s.borderImageSource && s.borderImageSource !== 'none') borderImg.push({ ...info, src: short(s.borderImageSource, 300), slice: s.borderImageSlice });
      if (!pseudo && s.textShadow && s.textShadow !== 'none') add(textShadow, s.textShadow, { el: who });
    }
  }
  // svg filters in DOM (feTurbulence, feDisplacementMap)
  out.svgFilters = Array.from(document.querySelectorAll('filter')).slice(0, 12).map(f => short(f.outerHTML, 600));
  out.canvases = Array.from(document.querySelectorAll('canvas')).filter(vis).map(c => ({ el: desc(c), rect: rect(c), w: c.width, h: c.height }));
  out.videos = Array.from(document.querySelectorAll('video')).filter(vis).map(v => ({ el: desc(v), rect: rect(v), src: short(v.currentSrc, 160) }));
  const sortMap = m => Object.entries(m).sort((x, y) => y[1].n - x[1].n).map(([k, v]) => ({ value: k, n: v.n, ex: v.ex }));
  Object.assign(out, {
    counts: { elements: els.length, shadows: Object.keys(shadows).length, glass: glass.length, blends: blends.length, masks: masks.length, filters: filters.length, gradients: grads.length, urlBgs: urls.length, cornerShape: corner.length, clipPath: clip.length, borderImage: borderImg.length },
    shadows: sortMap(shadows).slice(0, 60), radii: sortMap(radii).slice(0, 25), glass: glass.slice(0, 30), blends: blends.slice(0, 30), masks: masks.slice(0, 40), filters: filters.slice(0, 30), gradients: grads.slice(0, 60), urlBgs: urls.slice(0, 30), cornerShape: corner.slice(0, 30), clipPath: clip.slice(0, 20), animations: sortMap(anims).slice(0, 30), borderImage: borderImg.slice(0, 10), textShadow: sortMap(textShadow).slice(0, 10)
  });
  // same-origin stylesheet scan for at-rules
  const atProps = [], keyframes = [];
  for (const sh of document.styleSheets) {
    let rules; try { rules = sh.cssRules; } catch (e) { continue; }
    const walk = list => { for (const r of list || []) { if (r.constructor.name === 'CSSPropertyRule') atProps.push(short(r.cssText, 200)); if (r.constructor.name === 'CSSKeyframesRule') keyframes.push(short(r.cssText, 500)); if (r.cssRules) walk(r.cssRules); } };
    walk(rules);
  }
  out.atProperty = atProps.slice(0, 30); out.keyframes = keyframes.slice(0, 40);
  out.sheetHrefs = Array.from(document.querySelectorAll('link[rel=stylesheet]')).map(l => l.href).slice(0, 20);
  return out;
};

const grepCss = (txt) => {
  const pats = { cornerShape: /corner-(?:[a-z-]*-)?shape\s*:[^;}]+/g, superellipse: /superellipse\([^)]*\)/g, squircle: /squircle/g, feTurbulence: /feTurbulence[^>]{0,200}/g, maskComposite: /(?:-webkit-)?mask-composite\s*:[^;}]+/g, atProperty: /@property\s+--[\w-]+\s*\{[^}]+\}/g, backdrop: /backdrop-filter\s*:[^;}]+/g, inOklab: /in (?:oklab|oklch)[^,)]*/g, conic: /conic-gradient\([^;]{0,160}/g, plusLighter: /plus-lighter/g, offsetPath: /offset-path\s*:[^;}]+/g, paintWorklet: /paint\([\w-]+\)/g };
  const res = {};
  for (const [k, re] of Object.entries(pats)) { const m = txt.match(re) || []; res[k] = { n: m.length, ex: [...new Set(m.map(x => x.slice(0, 220)))].slice(0, 6) }; }
  return res;
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
const page = await ctx.newPage();
const cssTexts = [];
page.on('response', async r => { try { const ct = r.headers()['content-type'] || ''; if (ct.includes('text/css')) cssTexts.push(await r.text()); } catch (e) { } });
try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) { console.error('goto', e.message); }
await page.waitForTimeout(wait);
await page.addStyleTag({ content: '[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],#onetrust-banner-sdk,.osano-cm-window{display:none!important}' }).catch(() => { });
await page.screenshot({ path: path.join(RAW, `${name}-fold.png`) });
// slow scroll to trigger lazy sections
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < Math.min(H, 14000); y += 700) { await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(220); }
await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600);
const data = await page.evaluate(measure);
const inline = await page.evaluate(() => Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n') + '\n' + document.documentElement.outerHTML.slice(0, 3_000_000));
data.cssGrep = grepCss(cssTexts.join('\n') + '\n' + inline);
data.scheme = scheme; data.measuredAt = new Date().toISOString(); data.chromium = browser.version();
fs.writeFileSync(path.join(RAW, `${name}.json`), JSON.stringify(data, null, 1));
console.log(name, JSON.stringify(data.counts), 'grep:', Object.entries(data.cssGrep).filter(([k, v]) => v.n).map(([k, v]) => k + '=' + v.n).join(' '));
await browser.close();
