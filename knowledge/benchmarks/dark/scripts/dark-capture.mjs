// usage: node dark-capture.mjs <name> <url> [--no-shots] [--scheme dark|light] [--wait 3500]
import { chromium } from 'playwright';
import fs from 'node:fs';
const ROOT = '/Users/augustas/dev/design-engine/knowledge/benchmarks/dark';
const a = process.argv.slice(2);
const name = a[0], url = a[1];
const flag = (n, d) => { const i = a.indexOf('--' + n); return i > -1 ? a[i + 1] : d; };
const scheme = flag('scheme', 'dark');
const wait = +flag('wait', 3500);
const noShots = a.includes('--no-shots');
const nSlices = +flag('slices', 3);

const measureFn = () => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const parse = (c) => {
    if (!c) return null;
    c = c.trim();
    if (c === 'transparent') return [0, 0, 0, 0];
    let alpha = 1;
    let m = c.match(/^rgba?\(([^)]+)\)$/);
    if (m) { const p = m[1].split(/[ ,\/]+/).filter(Boolean); return [parseFloat(p[0]), parseFloat(p[1]), parseFloat(p[2]), p.length > 3 ? (p[3].endsWith('%') ? parseFloat(p[3]) / 100 : parseFloat(p[3])) : 1]; }
    // other color spaces: strip alpha, rasterize
    const am = c.match(/\/\s*([\d.]+%?)\s*\)$/);
    if (am) { alpha = am[1].endsWith('%') ? parseFloat(am[1]) / 100 : parseFloat(am[1]); c = c.replace(/\/\s*[\d.]+%?\s*\)$/, ')'); }
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], alpha];
  };
  const hex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const cr = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  // oklab L
  const oklabL = (r, g, b) => { const R = lin(r), G = lin(g), B = lin(b); const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s; };
  const oklabC = (r, g, b) => { const R = lin(r), G = lin(g), B = lin(b); const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s; return Math.sqrt(A * A + Bb * Bb); };
  const oklabH = (r, g, b) => { const R = lin(r), G = lin(g), B = lin(b); const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s; return (Math.atan2(Bb, A) * 180 / Math.PI + 360) % 360; };
  const over = (top, bot) => { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; };
  const cs = el => getComputedStyle(el);
  const vis = el => { const r = el.getBoundingClientRect(); const s = cs(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const doc = document.documentElement;
  const out = {};
  out.title = document.title; out.vw = innerWidth; out.pageHeight = doc.scrollHeight;
  out.colorScheme = { html: cs(doc).colorScheme, body: cs(document.body).colorScheme, metaTheme: (document.querySelector('meta[name=theme-color]') || {}).content || null, htmlClass: doc.className.slice(0, 120), dataTheme: doc.getAttribute('data-theme') || doc.getAttribute('data-mode') || doc.getAttribute('data-color-mode') || null };
  // page background
  let pageBg = parse(cs(doc).backgroundColor); if (!pageBg || pageBg[3] < 0.5) { const b = parse(cs(document.body).backgroundColor); if (b && b[3] >= 0.5) pageBg = b; }
  // maybe a wrapper div is the real bg
  if (!pageBg || pageBg[3] < 0.5) { const w = Array.from(document.body.children).find(e => { const b = parse(cs(e).backgroundColor); return b && b[3] > 0.9 && e.getBoundingClientRect().width > innerWidth * 0.9; }); if (w) pageBg = parse(cs(w).backgroundColor); }
  if (!pageBg || pageBg[3] < 0.5) pageBg = [255, 255, 255, 1];
  out.pageBg = hex(pageBg[0], pageBg[1], pageBg[2]); out.pageBgOklabL = +oklabL(...pageBg).toFixed(3); out.pageBgOklabC = +oklabC(...pageBg).toFixed(3); out.pageBgOklabH = +oklabH(...pageBg).toFixed(0);
  const all = Array.from(document.body.querySelectorAll('*')).filter(vis);
  // effective background of element: composite ancestor chain
  const effBg = (el) => {
    const chain = []; for (let p = el; p && p !== document.documentElement; p = p.parentElement) { const c = parse(cs(p).backgroundColor); if (c && c[3] > 0) { chain.push(c); if (c[3] >= 0.99) break; } }
    let base = pageBg; for (let i = chain.length - 1; i >= 0; i--) base = over(chain[i], base); return base;
  };
  // root custom properties
  const props = {};
  try { for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch (e) { continue; } for (const r of rules || []) { const walk = (rule) => { if (rule.style && rule.selectorText && /^(:root|html|\.dark|\[data-theme.*dark|:root\.dark|html\.dark|body)/.test(rule.selectorText)) { for (const p of rule.style) if (p.startsWith('--')) { props[rule.selectorText.slice(0, 40) + ' ' + p] = rule.style.getPropertyValue(p).trim().slice(0, 80); } } if (rule.cssRules) for (const rr of rule.cssRules) walk(rr); }; walk(r); } } } catch (e) { }
  // keep only color-ish tokens
  const colorish = Object.entries(props).filter(([k, v]) => /(bg|background|surface|border|text|fg|foreground|color|gray|grey|neutral|card|stroke|line|accent|primary|ink|muted|overlay|shadow)/i.test(k) && /(#|rgb|hsl|oklch|oklab|color\(|lab\(|lch\(|var\(|\d+ \d+ \d+|[\d.]+%)/.test(v));
  out.cssVarCount = Object.keys(props).length;
  out.cssVars = colorish.slice(0, 120);
  // surfaces: area-weighted by effective bg for elements with opaque-ish bg
  const surf = {}; const overlay = {};
  all.forEach(el => {
    const s = cs(el); const c = parse(s.backgroundColor); if (!c || c[3] <= 0) return;
    const r = el.getBoundingClientRect(); const area = Math.min(r.width, innerWidth) * Math.min(r.height, 3000); if (area < 2500) return;
    if (c[3] >= 0.9) { const k = hex(c[0], c[1], c[2]); (surf[k] = surf[k] || { n: 0, area: 0, ex: [] }); surf[k].n++; surf[k].area += area; if (surf[k].ex.length < 2) surf[k].ex.push((el.tagName.toLowerCase() + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '')).slice(0, 40)); }
    else { const parent = effBg(el.parentElement || el); const eff = over(c, parent); const k = s.backgroundColor + ' => ' + hex(eff[0], eff[1], eff[2]); (overlay[k] = overlay[k] || { n: 0, area: 0 }); overlay[k].n++; overlay[k].area += area; }
  });
  const fmtSurf = Object.entries(surf).map(([k, v]) => { const c = parse(k.length === 7 ? 'rgb(' + [1, 3, 5].map(i => parseInt(k.slice(i, i + 2), 16)).join(',') + ')' : k); return { hex: k, L: +oklabL(c[0], c[1], c[2]).toFixed(3), C: +oklabC(c[0], c[1], c[2]).toFixed(3), H: +oklabH(c[0], c[1], c[2]).toFixed(0), n: v.n, area: Math.round(v.area), ex: v.ex }; }).sort((x, y) => y.area - x.area).slice(0, 14);
  out.surfaces = fmtSurf;
  out.overlays = Object.entries(overlay).sort((x, y) => y[1].area - x[1].area).slice(0, 14).map(([k, v]) => ({ bg: k, n: v.n, area: Math.round(v.area) }));
  // borders
  const bord = {}; const rad = {};
  all.forEach(el => { const s = cs(el); ['Top', 'Right', 'Bottom', 'Left'].forEach(side => { const w = parseFloat(s['border' + side + 'Width']); if (w > 0 && w <= 2 && s['border' + side + 'Style'] !== 'none') { const c = s['border' + side + 'Color']; const k = c + ' @' + w + 'px'; bord[k] = (bord[k] || 0) + 1; } }); const sh = s.boxShadow; if (sh && sh !== 'none') { /* collect ring-like shadows */ } const r = s.borderTopLeftRadius; if (r !== '0px') rad[r] = (rad[r] || 0) + 1; });
  const flatBord = Object.entries(bord).map(([k, n]) => { const col = k.split(' @')[0]; const c = parse(col); let eff = null; if (c) { const e = over(c, pageBg); eff = hex(e[0], e[1], e[2]); } return { border: k, n, alpha: c ? +c[3].toFixed(3) : null, flatOnPage: eff, L: c ? +oklabL(...over(c, pageBg)).toFixed(3) : null }; }).sort((x, y) => y.n - x.n).slice(0, 12);
  out.borders = flatBord; out.radii = Object.entries(rad).sort((x, y) => y[1] - x[1]).slice(0, 8);
  // shadows
  const shad = {}; all.forEach(el => { const s = cs(el).boxShadow; if (s && s !== 'none') shad[s] = (shad[s] || 0) + 1; });
  out.shadows = Object.entries(shad).sort((x, y) => y[1] - x[1]).slice(0, 10).map(([k, n]) => ({ shadow: k.slice(0, 260), n }));
  out.nShadowEls = Object.values(shad).reduce((a, b) => a + b, 0);
  // text
  const txtEls = all.filter(el => Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim().length > 0) && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName));
  const tc = {};
  txtEls.forEach(el => { const s = cs(el); const c = parse(s.color); if (!c) return; const t = (el.innerText || '').trim().length; const bg = effBg(el); const fg = c[3] < 1 ? over(c, bg) : c; const k = s.color; if (!tc[k]) tc[k] = { chars: 0, n: 0, fg: hex(fg[0], fg[1], fg[2]), alpha: +c[3].toFixed(3), contrast: +cr(lum(fg[0], fg[1], fg[2]), lum(bg[0], bg[1], bg[2])).toFixed(2), L: +oklabL(fg[0], fg[1], fg[2]).toFixed(3), bg: hex(bg[0], bg[1], bg[2]), size: s.fontSize, weight: s.fontWeight, ex: (el.innerText || '').trim().slice(0, 28) }; tc[k].chars += t; tc[k].n++; });
  out.textColors = Object.entries(tc).sort((x, y) => y[1].chars - x[1].chars).slice(0, 12).map(([k, v]) => ({ color: k, ...v }));
  // typography
  const h1 = Array.from(document.querySelectorAll('h1')).find(vis);
  const tp = el => { if (!el) return null; const s = cs(el); return { text: (el.innerText || '').trim().slice(0, 60), family: s.fontFamily.slice(0, 60), size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, smooth: s.webkitFontSmoothing || s['-webkit-font-smoothing'], bgClip: s.webkitBackgroundClip, bgImage: (s.backgroundImage || '').slice(0, 140), textShadow: s.textShadow === 'none' ? null : s.textShadow.slice(0, 100) }; };
  out.h1 = tp(h1);
  out.body = tp(document.body); out.bodySmoothing = cs(document.body).webkitFontSmoothing; out.textRendering = cs(document.body).textRendering;
  const heroP = (() => { if (!h1) return null; const hr = h1.getBoundingClientRect(); return txtEls.find(e => { const r = e.getBoundingClientRect(); return r.top >= hr.bottom - 5 && r.top < hr.bottom + 260 && (e.innerText || '').trim().length > 25 && !/^(A|BUTTON)$/.test(e.tagName); }); })();
  out.heroP = tp(heroP);
  // CTAs
  const cta = Array.from(document.querySelectorAll('a,button,[role=button]')).filter(e => { if (!vis(e)) return false; const t = (e.innerText || '').trim(); if (t.length < 2 || t.length > 30) return false; const r = e.getBoundingClientRect(); return r.top < 900 && r.height >= 24; }).map(e => { const s = cs(e); const c = parse(s.backgroundColor); const r = e.getBoundingClientRect(); const bw = parseFloat(s.borderTopWidth); return { text: (e.innerText || '').trim().slice(0, 24), h: Math.round(r.height), kind: c && c[3] > 0.3 ? 'filled' : (bw > 0 ? 'outline' : 'text'), bg: s.backgroundColor, color: s.color, border: bw ? s.borderTopWidth + ' ' + s.borderTopColor : null, radius: s.borderTopLeftRadius, shadow: s.boxShadow === 'none' ? null : s.boxShadow.slice(0, 200), bgImage: s.backgroundImage === 'none' ? null : s.backgroundImage.slice(0, 120), size: s.fontSize, weight: s.fontWeight }; }).filter(c => c.kind !== 'text').slice(0, 8);
  out.ctas = cta;
  // nav
  const hdr = Array.from(document.querySelectorAll('header,[role=banner],nav')).find(vis);
  if (hdr) { let fx = hdr; for (let p = hdr; p && p !== document.body; p = p.parentElement) { const ps = cs(p).position; if (ps === 'fixed' || ps === 'sticky') { fx = p; break; } } const s = cs(fx), r = fx.getBoundingClientRect(); out.nav = { h: Math.round(r.height), bg: s.backgroundColor, backdrop: s.backdropFilter, bb: s.borderBottom, shadow: s.boxShadow === 'none' ? null : s.boxShadow.slice(0, 120), linkColor: (() => { const a = hdr.querySelector('a'); return a ? cs(a).color : null; })() }; }
  // gradients, canvas, video, noise, images, filters
  const grads = {}; let nGrad = 0, radial = 0, conic = 0, linear = 0, urlbg = 0, blurEls = 0, mixBlend = 0, maskEls = 0, backdropEls = 0;
  const gradEx = [];
  all.forEach(el => { const s = cs(el); const bi = s.backgroundImage; if (bi && bi !== 'none') { if (/radial-gradient/.test(bi)) { radial++; if (gradEx.length < 6) gradEx.push(bi.slice(0, 220)); } if (/conic-gradient/.test(bi)) conic++; if (/linear-gradient/.test(bi)) linear++; if (/url\(/.test(bi)) urlbg++; } if (s.filter && /blur/.test(s.filter)) blurEls++; if (s.backdropFilter && s.backdropFilter !== 'none') backdropEls++; if (s.mixBlendMode !== 'normal') mixBlend++; if ((s.maskImage && s.maskImage !== 'none') || (s.webkitMaskImage && s.webkitMaskImage !== 'none')) maskEls++; });
  out.effects = { radial, conic, linear, urlbg, blurEls, backdropEls, mixBlend, maskEls, gradEx, canvas: document.querySelectorAll('canvas').length, video: document.querySelectorAll('video').length, svg: document.querySelectorAll('svg').length, img: document.querySelectorAll('img').length };
  // noise detection: any bg-image data uri svg with feTurbulence or noise png names
  out.noise = Array.from(document.querySelectorAll('*')).some(e => /feTurbulence|noise|grain/i.test(cs(e).backgroundImage || '')) || Array.from(document.querySelectorAll('img')).some(i => /noise|grain/i.test(i.src));
  // heading gradient text
  const gradText = Array.from(document.querySelectorAll('h1,h2,h3')).filter(vis).filter(e => /gradient/.test(cs(e).backgroundImage) || Array.from(e.querySelectorAll('*')).some(c => /gradient/.test(cs(c).backgroundImage))).length;
  out.gradientHeadings = gradText;
  // accent: most saturated colour among filled buttons / links
  const sat = {}; all.forEach(el => { const s = cs(el); [s.color, s.backgroundColor, s.borderTopColor].forEach(col => { const c = parse(col); if (!c || c[3] < 0.5) return; const C = oklabC(c[0], c[1], c[2]); if (C > 0.1) { const k = hex(c[0], c[1], c[2]); sat[k] = (sat[k] || 0) + 1; } }); });
  out.accents = Object.entries(sat).sort((x, y) => y[1] - x[1]).slice(0, 6).map(([k, n]) => { const c = parse('rgb(' + [1, 3, 5].map(i => parseInt(k.slice(i, i + 2), 16)).join(',') + ')'); return { hex: k, n, L: +oklabL(...c).toFixed(3), C: +oklabC(...c).toFixed(3), H: +oklabH(...c).toFixed(0) }; });
  return out;
};

const b = await chromium.launch();
const ctxo = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme, reducedMotion: 'no-preference' });
const lsArg = flag('ls', null);
if (lsArg) { const [k, v] = lsArg.split('='); await ctxo.addInitScript(([k, v]) => { try { localStorage.setItem(k, v); } catch (e) { } }, [k, v]); }
const p = await ctxo.newPage();
p.on('dialog', d => d.dismiss().catch(() => { }));
try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) { console.log('goto err', e.message.slice(0, 100)); }
try { await p.waitForLoadState('networkidle', { timeout: 15000 }); } catch (e) { }
await p.waitForTimeout(wait);
// try to dismiss cookie banners
for (const t of ['Reject all', 'Reject', 'Decline', 'Only necessary', 'Necessary only', 'Deny', 'Got it', 'Accept all', 'Accept']) { try { const el = p.getByRole('button', { name: new RegExp('^' + t, 'i') }).first(); if (await el.isVisible({ timeout: 200 })) { await el.click({ timeout: 800 }); await p.waitForTimeout(400); break; } } catch (e) { } }
fs.mkdirSync(ROOT, { recursive: true });
if (!noShots) await p.screenshot({ path: `${ROOT}/${name}-fold-1440x900@2x.png` });
let m;
try { m = await p.evaluate(measureFn); } catch (e) { m = { error: e.message }; }
// scroll through to trigger reveals, measure again full-page and capture slices
const H = await p.evaluate(() => document.documentElement.scrollHeight);
const stepY = 900;
for (let y = 0; y < Math.min(H, 9000); y += 450) { await p.evaluate(yy => window.scrollTo(0, yy), y); await p.waitForTimeout(250); }
await p.waitForTimeout(600);
let mFull;
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
try { mFull = await p.evaluate(measureFn); } catch (e) { mFull = { error: e.message }; }
if (!noShots) {
  // section slices: evenly distributed positions after fold
  const maxY = Math.max(0, H - 900);
  const pos = []; for (let i = 1; i <= nSlices; i++) pos.push(Math.round(maxY * i / (nSlices + 1) / 100) * 100);
  let i = 1;
  for (const y of pos) { await p.evaluate(yy => window.scrollTo(0, yy), y); await p.waitForTimeout(1200); await p.screenshot({ path: `${ROOT}/${name}-s${i}-y${y}@2x.png` }); i++; }
}
fs.writeFileSync(`${ROOT}/${name}.measure.json`, JSON.stringify({ url, scheme, pageHeight: H, fold: m, full: mFull }, null, 1));
console.log('done', name, 'H=', H, 'bg=', m.pageBg, 'scheme', JSON.stringify(m.colorScheme));
await b.close();
