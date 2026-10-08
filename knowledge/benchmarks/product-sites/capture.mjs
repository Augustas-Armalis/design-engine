#!/usr/bin/env node
// Full-homepage capture + section measurement.
// usage (from repo root): node knowledge/benchmarks/product-sites/capture.mjs <slug> <url> [<slug> <url> ...]
// writes <slug>-full.png, slices/<slug>-NN.png (1440x1800) and raw/<slug>.json
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
fs.mkdirSync(path.join(dir, 'raw'), { recursive: true });
fs.mkdirSync(path.join(dir, 'slices'), { recursive: true });

function measure() {
  const cs = e => getComputedStyle(e);
  const vw = innerWidth;
  const R = e => { const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, b: r.bottom + scrollY, r: r.right + scrollX }; };
  const vis = e => { const s = cs(e); const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const SKIP = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'LINK', 'META'];
  const kids = e => [...e.children].filter(c => !SKIP.includes(c.tagName) && vis(c));
  const H = document.documentElement.scrollHeight;
  const txt = e => (e.innerText || '').trim().replace(/\s+/g, ' ');
  const hist = (arr, n = 6) => { const m = {}; arr.forEach(k => m[k] = (m[k] || 0) + 1); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n); };
  const round = v => Math.round(v);
  const effBg = e => { let n = e; while (n && n !== document.documentElement) { const c = cs(n).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c; n = n.parentElement; } const c = cs(document.documentElement).backgroundColor; return c; };
  const typo = e => { const s = cs(e), r = R(e); return { text: txt(e).slice(0, 140), tag: e.tagName.toLowerCase(), size: parseFloat(s.fontSize), weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, fam: s.fontFamily.split(',')[0].replace(/["']/g, ''), color: s.color, align: s.textAlign, tt: s.textTransform, w: round(r.w), h: round(r.h), x: round(r.x), y: round(r.y), lines: Math.round(r.h / (parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.2)) }; };

  // locate section container
  let cur = document.body, path = [];
  for (let i = 0; i < 10; i++) {
    const ks = kids(cur);
    const blocks = ks.filter(k => R(k).h >= 120);
    if (blocks.length >= 5) break;
    const big = [...ks].sort((a, b) => R(b).h - R(a).h)[0];
    if (!big || R(big).h < H * 0.45) break;
    cur = big; path.push(big.tagName.toLowerCase() + (big.id ? '#' + big.id : ''));
  }
  const containerDesc = path.join(' > ');
  const footerEl = [...document.querySelectorAll('footer')].filter(vis).sort((a, b) => R(b).y - R(a).y)[0] || null;
  const headerEl = [...document.querySelectorAll('header, nav, [role=banner]')].filter(vis)[0] || null;
  let blocks = kids(cur).filter(k => R(k).h >= 40);

  const sec = (el, idx) => {
    const r = R(el);
    const o = { idx, tag: el.tagName.toLowerCase(), cls: (el.className && el.className.toString().slice(0, 70)) || '', id: el.id || '', top: round(r.y), h: round(r.h), w: round(r.w) };
    const s = cs(el);
    o.bg = effBg(el); o.ownBg = s.backgroundColor; o.bgImg = s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 60) : null;
    o.borderTop = s.borderTopWidth + ' ' + s.borderTopColor; o.borderBottom = s.borderBottomWidth + ' ' + s.borderBottomColor;
    o.padT = s.paddingTop; o.padB = s.paddingBottom;
    // content bbox
    const all = [...el.querySelectorAll('*')].filter(vis);
    const leaves = all.filter(e => {
      if (SKIP.includes(e.tagName)) return false;
      const r2 = R(e);
      const isMedia = ['IMG', 'VIDEO', 'CANVAS', 'SVG', 'PICTURE', 'IFRAME'].includes(e.tagName.toUpperCase());
      const hasText = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0);
      if (!(isMedia || hasText || e.tagName === 'BUTTON')) return false;
      if (isMedia && r2.w >= vw - 4 && r2.h >= r.h * 0.8) return false; // full-bleed bg
      if (r2.y < r.y - 2 || r2.b > r.y + r.h + 2) return false; // clip to section
      const pos = cs(e).position; if (pos === 'fixed') return false;
      return true;
    });
    if (leaves.length) {
      let minY = 1e9, maxB = -1, minX = 1e9, maxR = -1;
      leaves.forEach(l => { const q = R(l); if (q.y < minY) minY = q.y; if (q.b > maxB) maxB = q.b; if (q.x < minX) minX = q.x; if (q.r > maxR) maxR = q.r; });
      o.effPadT = round(minY - r.y); o.effPadB = round(r.y + r.h - maxB); o.contentL = round(minX); o.contentR = round(maxR); o.contentW = round(maxR - minX);
    }
    // container (widest centered descendant narrower than viewport)
    let best = null;
    all.forEach(e => { const q = R(e); if (q.w > 500 && q.w < vw - 8 && Math.abs(q.x - (vw - q.r)) < 6 && q.h > 60) { if (!best || q.w > R(best).w) best = e; } });
    if (best) { const bs = cs(best); o.container = { w: round(R(best).w), maxW: bs.maxWidth, bl: bs.borderLeftWidth, br: bs.borderRightWidth, padL: bs.paddingLeft }; }
    // heading
    const hs = [...el.querySelectorAll('h1,h2,h3')].filter(vis);
    let hd = hs[0];
    if (!hd) { let bigE = null; leaves.forEach(l => { if (['IMG', 'VIDEO', 'CANVAS', 'SVG', 'PICTURE', 'IFRAME'].includes(l.tagName.toUpperCase())) return; const f = parseFloat(cs(l).fontSize); if (!bigE || f > bigE.f) bigE = { f, e: l }; }); if (bigE && bigE.f >= 20) hd = bigE.e; }
    { // css padding chain
      let n = el, mx = { t: 0, b: 0 }; for (let i = 0; i < 4 && n; i++) { const st = cs(n); mx.t = Math.max(mx.t, parseFloat(st.paddingTop) || 0); mx.b = Math.max(mx.b, parseFloat(st.paddingBottom) || 0); const ks = kids(n); n = ks.length === 1 ? ks[0] : null; }
      o.cssPadT = mx.t; o.cssPadB = mx.b;
    }
    if (hd) {
      o.heading = typo(hd); o.headingOffset = round(R(hd).y - r.y);
      // sub
      const hr = R(hd);
      const sub = leaves.filter(l => { const q = R(l); return q.y >= hr.b - 4 && q.y < hr.b + 120 && txt(l).length > 25 && !['A', 'BUTTON'].includes(l.tagName) && l !== hd; })[0];
      if (sub) o.sub = typo(sub);
      const eb = leaves.filter(l => { const q = R(l); return q.b <= hr.y + 4 && q.b > hr.y - 90 && txt(l).length > 0 && txt(l).length <= 45 && parseFloat(cs(l).fontSize) <= 16 && l !== hd && !['IMG', 'VIDEO', 'CANVAS', 'SVG'].includes(l.tagName.toUpperCase()); }).sort((a, b) => R(b).y - R(a).y)[0];
      if (eb) o.eyebrow = typo(eb);
      o.allHeadings = hs.slice(0, 10).map(h => ({ t: h.tagName.toLowerCase(), s: parseFloat(cs(h).fontSize), text: txt(h).slice(0, 80) }));
    }
    // cards
    const cards = all.filter(e => {
      const q = R(e); const st = cs(e);
      if (q.w < 140 || q.w > 760 || q.h < 70 || q.h > 760) return false;
      const br = parseFloat(st.borderTopLeftRadius); if (!(br >= 6)) return false;
      const hasShadow = st.boxShadow !== 'none'; const hasBorder = parseFloat(st.borderTopWidth) > 0 && st.borderTopStyle !== 'none';
      const bgDiff = st.backgroundColor !== 'rgba(0, 0, 0, 0)' && st.backgroundColor !== effBg(el);
      return hasShadow || hasBorder || bgDiff;
    });
    // keep outermost only
    const outer = cards.filter(c => !cards.some(o2 => o2 !== c && o2.contains(c)));
    o.cardCount = outer.length;
    o.cardRadius = hist(outer.map(c => cs(c).borderTopLeftRadius.split(' ')[0]), 4);
    o.cardShadow = hist(outer.map(c => cs(c).boxShadow === 'none' ? 'none' : cs(c).boxShadow.slice(0, 110)), 3);
    o.cardBorder = hist(outer.map(c => { const s = cs(c); return parseFloat(s.borderTopWidth) > 0 ? s.borderTopWidth + ' ' + s.borderTopColor : 'none'; }), 3);
    o.cardPad = hist(outer.map(c => cs(c).paddingTop + '/' + cs(c).paddingLeft), 3);
    o.cardBg = hist(outer.map(c => cs(c).backgroundColor), 3);
    o.cardSizes = outer.slice(0, 8).map(c => { const q = R(c); return round(q.w) + 'x' + round(q.h); });
    // media
    const med = (sel, minW) => all.filter(e => e.matches(sel) && R(e).w >= minW).length;
    o.media = { img: med('img', 200), svg: med('svg', 250), video: all.filter(e => e.tagName === 'VIDEO').length, canvas: all.filter(e => e.tagName === 'CANVAS').length, iframe: all.filter(e => e.tagName === 'IFRAME').length };
    // logo row hint
    const small = all.filter(e => ['IMG', 'svg'].includes(e.tagName) && R(e).h <= 56 && R(e).h >= 12 && R(e).w <= 220 && R(e).w >= 24);
    o.smallGlyphs = small.length;
    // links & buttons
    o.links = all.filter(e => e.tagName === 'A').length; o.buttons = all.filter(e => e.tagName === 'BUTTON' || (e.tagName === 'A' && parseFloat(cs(e).borderTopLeftRadius) >= 6 && cs(e).backgroundColor !== 'rgba(0, 0, 0, 0)')).length;
    o.words = txt(el).split(' ').filter(Boolean).length;
    o.snippet = txt(el).slice(0, 220);
    o.sticky = all.some(e => cs(e).position === 'sticky') ? true : false;
    return o;
  };

  const out = { vw, pageHeight: H, title: document.title, containerPath: containerDesc, bodyBg: cs(document.body).backgroundColor, htmlBg: cs(document.documentElement).backgroundColor, bodyFont: cs(document.body).fontFamily.split(',')[0].replace(/["']/g, '') };
  out.sections = blocks.map((b, i) => sec(b, i));
  // header
  if (headerEl) { const q = R(headerEl); const s = cs(headerEl); out.header = { h: round(q.h), pos: s.position, bg: s.backgroundColor, blur: s.backdropFilter, borderB: s.borderBottomWidth + ' ' + s.borderBottomColor, links: [...headerEl.querySelectorAll('a')].filter(vis).map(a => txt(a)).filter(Boolean).slice(0, 14) }; }
  // all h2 sizes
  out.h2 = [...document.querySelectorAll('h2')].filter(vis).map(h => ({ text: txt(h).slice(0, 90), size: parseFloat(cs(h).fontSize), weight: cs(h).fontWeight, ls: cs(h).letterSpacing, lh: cs(h).lineHeight, y: round(R(h).y), w: round(R(h).w), align: cs(h).textAlign }));
  out.h3sizes = hist([...document.querySelectorAll('h3')].filter(vis).map(h => parseFloat(cs(h).fontSize)), 5);
  // footer
  if (footerEl) {
    const q = R(footerEl); const s = cs(footerEl);
    const lists = [...footerEl.querySelectorAll('ul, nav, div')].filter(e => vis(e) && [...e.children].filter(c => c.tagName === 'A' || (c.tagName === 'LI' && c.querySelector('a'))).length >= 3);
    const outerLists = lists.filter(l => !lists.some(o2 => o2 !== l && l.contains(o2)));
    const links = [...footerEl.querySelectorAll('a')].filter(vis);
    const leaves = [...footerEl.querySelectorAll('*')].filter(e => vis(e) && ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || ['IMG', 'svg'].includes(e.tagName)));
    let minY = 1e9, maxB = -1; leaves.forEach(l => { const r2 = R(l); minY = Math.min(minY, r2.y); maxB = Math.max(maxB, r2.b); });
    out.footer = { top: round(q.y), h: round(q.h), bg: effBg(footerEl), borderTop: s.borderTopWidth + ' ' + s.borderTopColor, effPadT: round(minY - q.y), effPadB: round(q.y + q.h - maxB), linkCount: links.length, linkSize: hist(links.map(a => parseFloat(cs(a).fontSize)), 3), linkColor: hist(links.map(a => cs(a).color), 2), colCount: outerLists.length, colHeads: outerLists.slice(0, 8).map(l => { const prev = l.previousElementSibling; const first = l.parentElement && [...l.parentElement.children][0]; return txt(first && first !== l ? first : l).slice(0, 30); }), colX: outerLists.map(l => round(R(l).x)), text: txt(footerEl).slice(0, 700), svgCount: [...footerEl.querySelectorAll('svg')].filter(vis).length, bigWordmark: [...footerEl.querySelectorAll('*')].some(e => vis(e) && parseFloat(cs(e).fontSize) >= 100) };
  }
  // vertical rails: elements ~1px wide and tall
  const rails = [...document.querySelectorAll('*')].filter(e => { const q = R(e); return q.w <= 2 && q.h >= 600 && vis(e); }).length;
  const borderRails = [...document.querySelectorAll('main *, body > div > div')].filter(e => { const s = cs(e); const q = R(e); return q.h > 1500 && (parseFloat(s.borderLeftWidth) > 0 && s.borderLeftStyle !== 'none') && q.w > 600; }).length;
  out.rails = { thin: rails, borderRails };
  return out;
}

const targets = process.argv.slice(2);
const measureOnly = targets.includes('--measure-only');
const tl = targets.filter(t => t !== '--measure-only');
const b = await chromium.launch();
for (let i = 0; i < tl.length; i += 2) {
  const slug = tl[i], url = tl[i + 1];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', locale: 'en-US' });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    try { await p.waitForLoadState('networkidle', { timeout: 15000 }); } catch {}
    await p.waitForTimeout(3500);
    // try decline cookies (privacy-preserving)
    for (const t of ['Reject all', 'Reject', 'Decline', 'Only necessary', 'Necessary only', 'Opt out of all', 'Opt out']) { try { const btn = p.getByRole('button', { name: new RegExp('^' + t, 'i') }).first(); if (await btn.isVisible({ timeout: 300 })) { await btn.click({ timeout: 800 }); break; } } catch {} }
    await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    // progressive scroll
    let lastH = 0;
    for (let pass = 0; pass < 3; pass++) {
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(180); }
      await p.waitForTimeout(800);
      const h2 = await p.evaluate(() => document.documentElement.scrollHeight);
      if (h2 === lastH) break; lastH = h2;
    }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1500);
    await p.evaluate(() => document.fonts.ready);
    const data = await p.evaluate(measure);
    data.url = url; data.slug = slug;
    fs.writeFileSync(path.join(dir, 'raw', slug + '.json'), JSON.stringify(data, null, 1));
    const H = data.pageHeight;
    if (measureOnly) { console.log('measured', slug, 'H=', H, 'sections=', data.sections.length); await ctx.close(); continue; }
    try { await p.screenshot({ path: path.join(dir, slug + '-full.png'), fullPage: true }); } catch (e) { console.log('full fail', slug, e.message.slice(0, 80)); }
    const n = Math.ceil(H / 1800);
    for (let k = 0; k < Math.min(n, 14); k++) {
      await p.evaluate(v => window.scrollTo(0, v), k * 1800); await p.waitForTimeout(500);
      await p.screenshot({ path: path.join(dir, 'slices', `${slug}-${String(k).padStart(2, '0')}.png`), fullPage: true, clip: { x: 0, y: k * 1800, width: 1440, height: Math.min(1800, H - k * 1800) } });
    }
    console.log('ok', slug, 'H=', H, 'sections=', data.sections.length);
  } catch (e) { console.log('FAIL', slug, e.message.slice(0, 120)); }
  await ctx.close();
}
await b.close();
