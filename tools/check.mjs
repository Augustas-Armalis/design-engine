#!/usr/bin/env node
// Render-and-check: load a page at desktop + mobile, screenshot it, measure it, report.
// usage: node tools/check.mjs <url | path/to/file.html> [--name label] [--out reports]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(here, 'thresholds.json'), 'utf8'));
const axeSource = fs.readFileSync(path.join(here, '..', 'node_modules', 'axe-core', 'axe.min.js'), 'utf8');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i > -1 ? args[i + 1] : d; };
const positional = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] || '').startsWith('--'));
const target = positional[0];
if (!target) { console.error('usage: check.mjs <url|file> [--name x] [--out dir]'); process.exit(2); }
const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(path.resolve(target)).href;
const name = flag('name', (url.split('/').filter(Boolean).pop() || 'page').replace(/\W+/g, '-'));
const outDir = path.resolve(flag('out', path.join(here, '..', 'reports')), name);
fs.mkdirSync(outDir, { recursive: true });

// ---- in-page measurement (runs in the browser, returns plain data) ----
const measure = (cfg) => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const rgba = (c) => {
    if (cache.has(c)) return cache.get(c);
    cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1);
    const d = cv.getImageData(0, 0, 1, 1).data; const v = [d[0], d[1], d[2], d[3] / 255];
    cache.set(c, v); return v;
  };
  const lum = ([r, g, b]) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3]));
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0; };
  const label = (el) => (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList[0] ? '.' + el.classList[0] : '')).slice(0, 60);
  const hueOf = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return null; const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return ((h * 60) + 360) % 360; };
  const bgOf = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none') return { unknown: true };
      const c = rgba(s.backgroundColor);
      if (c[3] > 0) { layers.push(c); if (c[3] >= 1) break; }
    }
    let base = [255, 255, 255];
    for (const c of layers.reverse()) base = over(c, base);
    return { rgb: base };
  };

  const body = document.body; const all = [...document.querySelectorAll('body *')].filter(visible);
  const textEls = all.filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0));
  const out = { textCount: textEls.length };

  // typography
  const fams = new Map(), sizes = new Map(); const small = [], lowContrast = [], badLeading = [];
  for (const el of textEls) {
    const s = getComputedStyle(el); const px = parseFloat(s.fontSize);
    const fam = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    fams.set(fam, (fams.get(fam) || 0) + 1); sizes.set(Math.round(px), (sizes.get(Math.round(px)) || 0) + 1);
    if (px < cfg.type.minAnyTextPx) small.push(`${label(el)} ${px}px`);
    const lh = s.lineHeight === 'normal' ? 1.2 : parseFloat(s.lineHeight) / px;
    const isHeading = /^H[1-6]$/.test(el.tagName) || px >= 28;
    const long = el.textContent.trim().length > 90;
    if (isHeading && lh > cfg.type.headingLineHeightMax + 0.001) badLeading.push(`${label(el)} lh ${lh.toFixed(2)}`);
    if (!isHeading && long && (lh < cfg.type.bodyLineHeight[0] - 0.001 || lh > cfg.type.bodyLineHeight[1] + 0.001)) badLeading.push(`${label(el)} lh ${lh.toFixed(2)}`);
    const bg = bgOf(el);
    if (!bg.unknown) {
      const fg = rgba(s.color); const c = ratio(over(fg, bg.rgb), bg.rgb);
      const weight = +s.fontWeight; const large = px >= cfg.contrast.largePx || (px >= 18.66 && weight >= 700);
      const min = large ? cfg.contrast.largeMin : cfg.contrast.bodyMin;
      if (c < min) lowContrast.push(`${label(el)} ${c.toFixed(2)}:1 (${px}px) "${el.textContent.trim().slice(0, 24)}"`);
    }
  }
  out.fontFamilies = [...fams.entries()].sort((a, b) => b[1] - a[1]);
  out.fontSizes = [...sizes.entries()].sort((a, b) => a[0] - b[0]);
  out.smallText = small.slice(0, 10); out.lowContrast = lowContrast.slice(0, 12); out.lowContrastCount = lowContrast.length;
  out.badLeading = badLeading.slice(0, 10); out.badLeadingCount = badLeading.length;
  const bodyP = [...document.querySelectorAll('p, li')].filter(visible).filter((e) => e.textContent.trim().length > 90);
  const bodySizes = bodyP.map((e) => parseFloat(getComputedStyle(e).fontSize));
  out.bodyMedianPx = bodySizes.length ? bodySizes.sort((a, b) => a - b)[Math.floor(bodySizes.length / 2)] : null;

  // line length (chars per rendered line)
  const lineLens = [];
  for (const el of bodyP) {
    const s = getComputedStyle(el); const lh = s.lineHeight === 'normal' ? parseFloat(s.fontSize) * 1.2 : parseFloat(s.lineHeight);
    const lines = Math.round(el.getBoundingClientRect().height / lh);
    const len = el.textContent.trim().length;
    if (lines >= 2) lineLens.push({ el: label(el), cpl: Math.round(len / lines) });
  }
  out.lineLength = lineLens.slice(0, 40);

  // layout
  out.overflowPx = document.documentElement.scrollWidth - window.innerWidth;
  out.overflowers = all.filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 6).map(label);

  // headings
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((h) => +h.tagName[1]);
  out.h1Count = hs.filter((n) => n === 1).length;
  out.headingSkips = hs.some((n, i) => i > 0 && n - hs[i - 1] > 1);
  const h1 = document.querySelector('h1');
  if (h1) { const s = getComputedStyle(h1); out.h1 = { px: parseFloat(s.fontSize), lh: s.lineHeight, ls: s.letterSpacing, weight: s.fontWeight, family: s.fontFamily.split(',')[0].replace(/["']/g, ''), text: h1.textContent.trim().slice(0, 120) }; }

  // interactive targets (inline links in running text are exempt, per WCAG 2.5.8)
  const tgt = [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button]')].filter(visible)
    .filter((e) => !(e.tagName === 'A' && e.closest('p, li') && getComputedStyle(e).display === 'inline'));
  const minSide = window.innerWidth < 600 ? cfg.targets.mobileMinPx : cfg.targets.desktopMinPx;
  out.smallTargets = tgt.filter((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height) < minSide - 0.5; }).slice(0, 10).map((e) => { const r = e.getBoundingClientRect(); return `${label(e)} ${Math.round(r.width)}x${Math.round(r.height)}`; });
  out.targetCount = tgt.length; out.targetMinSide = minSide;

  // spacing + radius
  let on = 0, tot = 0; const radii = new Set(); const offVals = new Map();
  for (const el of all) {
    const s = getComputedStyle(el);
    for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'rowGap', 'columnGap']) {
      const v = parseFloat(s[p]); if (!v || isNaN(v) || v < 1) continue; tot++;
      const ok = Math.abs(v / cfg.spacing.gridPx - Math.round(v / cfg.spacing.gridPx)) < 0.13;
      if (ok) on++; else { const k = Math.round(v * 10) / 10; offVals.set(k, (offVals.get(k) || 0) + 1); }
    }
    const r = parseFloat(s.borderTopLeftRadius); if (r > 0) radii.add(r >= cfg.ai_tells.pillRadiusPx - 1 ? 'pill' : Math.round(r));
  }
  out.spacingOnGrid = tot ? on / tot : 1; out.spacingSamples = tot; out.offGridTop = [...offVals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  out.radii = [...radii];

  // images, meta
  out.imgNoAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length;
  out.title = document.title; out.lang = document.documentElement.lang; out.viewportMeta = !!document.querySelector('meta[name=viewport]');

  // AI tells
  const txt = body.innerText.toLowerCase();
  out.bannedHits = cfg.ai_tells.bannedPhrases.filter((p) => txt.includes(p));
  const navs = [...document.querySelectorAll('header, nav')].filter(visible);
  out.pillNav = navs.some((n) => [n, ...n.querySelectorAll('div, ul')].some((e) => {
    const s = getComputedStyle(e); const r = e.getBoundingClientRect();
    return parseFloat(s.borderTopLeftRadius) >= Math.min(r.height / 2, 200) - 1 && r.height < 90 && r.height > 28 && e.querySelectorAll('a').length >= 3 && (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.borderTopWidth !== '0px');
  }));
  if (h1) {
    const prev = h1.previousElementSibling || h1.parentElement?.previousElementSibling;
    if (prev) { const s = getComputedStyle(prev); out.eyebrowAllCaps = s.textTransform === 'uppercase' && parseFloat(s.fontSize) <= 14 && prev.textContent.trim().length < 40; out.eyebrowText = prev.textContent.trim().slice(0, 40); }
  }
  let purpleGrad = 0, glow = 0; const palette = new Set();
  for (const el of all) {
    const s = getComputedStyle(el);
    if (s.backgroundImage.includes('gradient')) {
      const hues = [...s.backgroundImage.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)/g)].map((m) => hueOf([+m[1], +m[2], +m[3]]))
        .concat([...s.backgroundImage.matchAll(/oklch\([^\s]+\s+[^\s]+\s+([\d.]+)/g)].map((m) => +m[1]));
      if (hues.some((h) => h != null && h >= cfg.ai_tells.purpleBlueHueRange[0] && h <= cfg.ai_tells.purpleBlueHueRange[1])) purpleGrad++;
    }
    for (const m of s.boxShadow.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)[^)]*\)\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/g)) {
      const [r, g, b] = [+m[1], +m[2], +m[3]]; const chroma = Math.max(r, g, b) - Math.min(r, g, b);
      if (+m[6] >= cfg.ai_tells.glowBlurPx && chroma > 60) glow++;
    }
    const c = rgba(s.backgroundColor);
    if (c[3] > 0.5) { const h = hueOf(c); if (h != null && Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]) > 40) palette.add(Math.round(h / 15) * 15); }
  }
  out.purpleGradients = purpleGrad; out.glowShadows = glow; out.accentHues = [...palette].sort((a, b) => a - b);

  // fingerprint pieces for the diversity check
  const hdr = document.querySelector('header, nav');
  out.navHeight = hdr ? Math.round(hdr.getBoundingClientRect().height) : null;
  const widths = all.filter((e) => ['MAIN', 'SECTION', 'DIV'].includes(e.tagName)).map((e) => Math.round(e.getBoundingClientRect().width)).filter((w) => w > 600 && w < window.innerWidth - 8);
  out.contentWidthMode = widths.length ? Object.entries(widths.reduce((m, w) => (m[w] = (m[w] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1])[0][0] : null;
  const secs = [...document.querySelectorAll('section')].filter(visible).map((e) => parseFloat(getComputedStyle(e).paddingTop)).filter((n) => n > 0);
  out.sectionPadMedian = secs.length ? secs.sort((a, b) => a - b)[Math.floor(secs.length / 2)] : null;
  out.sectionCount = secs.length;
  return out;
};

// ---- turn raw metrics into checks ----
const mk = (id, status, value, threshold, detail = '') => ({ id, status, value, threshold, detail });
function evaluate(m, vp, axe) {
  const c = []; const t = T;
  const serious = axe.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
  const minor = axe.violations.filter((v) => !['serious', 'critical'].includes(v.impact));
  const fmt = (vs) => vs.map((v) => `${v.id}×${v.nodes.length}`).join(', ');
  c.push(mk('layout.horizontal-overflow', m.overflowPx > t.overflow.maxHorizontalOverflowPx ? 'fail' : 'pass', m.overflowPx, `<= ${t.overflow.maxHorizontalOverflowPx}px`, m.overflowers.join(', ')));
  c.push(mk('type.min-text-size', m.smallText.length ? 'fail' : 'pass', m.smallText.length, `no text < ${t.type.minAnyTextPx}px`, m.smallText.join('; ')));
  c.push(mk('type.body-size', m.bodyMedianPx == null ? 'info' : m.bodyMedianPx >= t.type.minBodyPx ? 'pass' : 'warn', m.bodyMedianPx, `>= ${t.type.minBodyPx}px`));
  c.push(mk('type.line-height', m.badLeadingCount ? 'warn' : 'pass', m.badLeadingCount, `body ${t.type.bodyLineHeight.join('-')}, headings <= ${t.type.headingLineHeightMax}`, m.badLeading.join('; ')));
  c.push(mk('type.font-families', m.fontFamilies.length > t.type.maxFontFamilies ? 'warn' : 'pass', m.fontFamilies.length, `<= ${t.type.maxFontFamilies}`, m.fontFamilies.map(([f, n]) => `${f}(${n})`).join(', ')));
  c.push(mk('type.size-count', m.fontSizes.length > t.type.maxDistinctFontSizes ? 'warn' : 'pass', m.fontSizes.length, `<= ${t.type.maxDistinctFontSizes}`, m.fontSizes.map(([s]) => s).join(',')));
  const badLen = m.lineLength.filter((l) => l.cpl < t.type.lineLengthChars[0] || l.cpl > t.type.lineLengthChars[1]);
  c.push(mk('type.line-length', vp.name === 'mobile' ? 'info' : badLen.length ? 'warn' : 'pass', badLen.length, `${t.type.lineLengthChars.join('-')} chars/line`, badLen.slice(0, 5).map((l) => `${l.el} ${l.cpl}`).join('; ')));
  c.push(mk('color.contrast', m.lowContrastCount ? 'fail' : 'pass', m.lowContrastCount, `body >= ${t.contrast.bodyMin}:1, large >= ${t.contrast.largeMin}:1 (text on gradients/images not measured)`, m.lowContrast.join('; ')));
  c.push(mk('targets.size', m.smallTargets.length ? 'warn' : 'pass', m.smallTargets.length, `>= ${m.targetMinSide}px`, m.smallTargets.join('; ')));
  c.push(mk('spacing.on-grid', m.spacingOnGrid >= t.spacing.minOnGridRatio ? 'pass' : 'warn', +m.spacingOnGrid.toFixed(2), `>= ${t.spacing.minOnGridRatio} on ${t.spacing.gridPx}px grid`, 'off-grid: ' + m.offGridTop.map(([v, n]) => `${v}px×${n}`).join(', ')));
  c.push(mk('shape.radius-count', m.radii.length > t.radius.maxDistinct ? 'warn' : 'pass', m.radii.length, `<= ${t.radius.maxDistinct}`, m.radii.join(',')));
  c.push(mk('semantics.h1', m.h1Count === 1 ? 'pass' : 'fail', m.h1Count, 'exactly 1'));
  c.push(mk('semantics.heading-order', m.headingSkips ? 'warn' : 'pass', m.headingSkips, 'no skipped levels'));
  c.push(mk('semantics.page-meta', m.title && m.lang && m.viewportMeta ? 'pass' : 'fail', `${m.title ? 'title ' : ''}${m.lang ? 'lang ' : ''}${m.viewportMeta ? 'viewport' : ''}`, 'title + lang + viewport'));
  c.push(mk('semantics.img-alt', m.imgNoAlt ? 'fail' : 'pass', m.imgNoAlt, '0 images without alt'));
  c.push(mk('a11y.axe-serious', serious.length ? 'fail' : 'pass', serious.length, '0 serious/critical', fmt(serious)));
  c.push(mk('a11y.axe-minor', minor.length ? 'warn' : 'pass', minor.length, '0 moderate/minor', fmt(minor)));
  // AI tells
  c.push(mk('ai.banned-phrases', m.bannedHits.length ? 'warn' : 'pass', m.bannedHits.length, '0 cliché phrases', m.bannedHits.join(', ')));
  const onlyDefault = m.fontFamilies.length && m.fontFamilies.every(([f]) => t.ai_tells.defaultSansFamilies.some((d) => f.toLowerCase().includes(d)));
  c.push(mk('ai.default-font-only', onlyDefault ? 'warn' : 'pass', m.fontFamilies.map(([f]) => f).join(', '), 'not only Inter/Geist/system'));
  c.push(mk('ai.pill-nav', m.pillNav ? 'warn' : 'pass', m.pillNav, 'no floating pill nav'));
  c.push(mk('ai.eyebrow-caps', m.eyebrowAllCaps ? 'warn' : 'pass', m.eyebrowAllCaps ?? false, 'no reflex all-caps eyebrow above h1', m.eyebrowText || ''));
  c.push(mk('ai.purple-blue-gradient', m.purpleGradients ? 'warn' : 'pass', m.purpleGradients, '0 purple/blue gradients'));
  c.push(mk('ai.glow-shadows', m.glowShadows ? 'warn' : 'pass', m.glowShadows, '0 coloured glow shadows'));
  return c;
}

// ---- run ----
const browser = await chromium.launch();
const report = { target: url, name, generated: new Date().toISOString(), viewports: [], summary: { pass: 0, warn: 0, fail: 0 }, fingerprint: {} };
for (const vp of T.viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.width < 600, hasTouch: vp.width < 600 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
  });
  const m = await page.evaluate(measure, T);
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const r = await window.axe.run();
    return { violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target.join(' ')).slice(0, 5) })) };
  });
  const full = path.join(outDir, `${vp.name}-full.png`); const fold = path.join(outDir, `${vp.name}-fold.png`);
  await page.screenshot({ path: fold });
  await page.screenshot({ path: full, fullPage: true });
  const checks = evaluate(m, vp, axe);
  for (const k of checks) if (report.summary[k.status] !== undefined) report.summary[k.status]++;
  report.viewports.push({ name: vp.name, width: vp.width, height: vp.height, screenshots: { fold, full }, checks });
  if (vp.name === 'desktop') report.fingerprint = { h1: m.h1, fonts: m.fontFamilies.map(([f]) => f), accentHues: m.accentHues, radii: m.radii, navHeight: m.navHeight, contentWidth: m.contentWidthMode, sectionPad: m.sectionPadMedian, sectionCount: m.sectionCount, bodyPx: m.bodyMedianPx };
  await ctx.close();
}
await browser.close();

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
const icon = { pass: 'PASS', warn: 'WARN', fail: 'FAIL', info: 'info' };
let md = `# Check: ${name}\n\n${url}\n\n**${report.summary.fail} fail · ${report.summary.warn} warn · ${report.summary.pass} pass**\n\n`;
for (const v of report.viewports) {
  md += `## ${v.name} (${v.width}px)\n\n![](${path.basename(v.screenshots.fold)})\n\n| status | check | value | limit | detail |\n|---|---|---|---|---|\n`;
  for (const k of v.checks) md += `| ${icon[k.status]} | ${k.id} | ${String(k.value).replace(/\|/g, '/')} | ${k.threshold} | ${String(k.detail).replace(/\|/g, '/').slice(0, 200)} |\n`;
  md += '\n';
}
md += `## Fingerprint\n\n\`\`\`json\n${JSON.stringify(report.fingerprint, null, 2)}\n\`\`\`\n`;
fs.writeFileSync(path.join(outDir, 'report.md'), md);
console.log(`${name}: ${report.summary.fail} fail, ${report.summary.warn} warn, ${report.summary.pass} pass -> ${path.join(outDir, 'report.md')}`);
for (const v of report.viewports) for (const k of v.checks) if (k.status === 'fail' || k.status === 'warn') console.log(`  [${icon[k.status]}] ${v.name} ${k.id}: ${k.value} (limit ${k.threshold}) ${k.detail}`.slice(0, 260));
process.exit(report.summary.fail ? 1 : 0);
