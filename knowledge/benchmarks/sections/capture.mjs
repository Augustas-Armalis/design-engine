#!/usr/bin/env node
// Section anatomy capture: full-page overview (1x JPEG) + per-block measurements + 2x crops of every block and the footer.
// usage (from repo root):
//   node knowledge/benchmarks/sections/capture.mjs --list knowledge/benchmarks/sections/targets.json [--only slug,slug] [--conc 4] [--crops <dir>]
// writes raw/<slug>.json, full/<slug>.jpg; crops (2x) go to --crops (default: ./_crops, staging; curated copies live in <section>/)
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const list = JSON.parse(fs.readFileSync(arg('--list', path.join(dir, 'targets.json')), 'utf8'));
const only = arg('--only', '') ? arg('--only').split(',') : null;
const CONC = +arg('--conc', 4);
const CROPS = arg('--crops', path.join(dir, '_crops'));
const SKIPCROPS = args.includes('--no-crops');
fs.mkdirSync(path.join(dir, 'raw'), { recursive: true });
fs.mkdirSync(path.join(dir, 'full'), { recursive: true });
fs.mkdirSync(CROPS, { recursive: true });

function measure() {
  const cs = e => getComputedStyle(e);
  const vw = innerWidth;
  const R = e => { const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, b: r.bottom + scrollY, r: r.right + scrollX }; };
  const vis = e => { const s = cs(e); const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const SKIP = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'LINK', 'META'];
  const MEDIA = ['IMG', 'VIDEO', 'CANVAS', 'SVG', 'PICTURE', 'IFRAME'];
  const isMedia = e => MEDIA.includes(e.tagName.toUpperCase());
  const kids = e => [...e.children].filter(c => !SKIP.includes(c.tagName) && vis(c));
  const H = document.documentElement.scrollHeight;
  const txt = e => (e.innerText || e.textContent || '').trim().replace(/\s+/g, ' ');
  const own = e => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').trim().replace(/\s+/g, ' ');
  const hist = (arr, n = 6) => { const m = {}; arr.forEach(k => m[k] = (m[k] || 0) + 1); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n); };
  const med = a => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
  const rd = v => Math.round(v);
  const transparent = c => !c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent';
  const effBg = e => { let n = e; while (n && n !== document.documentElement) { const c = cs(n).backgroundColor; if (!transparent(c)) return c; n = n.parentElement; } return cs(document.documentElement).backgroundColor; };
  const typo = e => { const s = cs(e), r = R(e); const lh = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.2; return { text: txt(e).slice(0, 160), tag: e.tagName.toLowerCase(), size: parseFloat(s.fontSize), weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, fam: s.fontFamily.split(',')[0].replace(/["']/g, ''), color: s.color, align: s.textAlign, tt: s.textTransform, w: rd(r.w), h: rd(r.h), x: rd(r.x), y: rd(r.y), lines: Math.max(1, Math.round(r.h / lh)) }; };
  const leavesOf = (el, clip) => [...el.querySelectorAll('*')].filter(e => {
    if (SKIP.includes(e.tagName) || !vis(e)) return false;
    const q = R(e);
    if (clip && (q.y < clip.y - 2 || q.b > clip.b + 2)) return false;
    if (cs(e).position === 'fixed') return false;
    if (isMedia(e)) return !(q.w >= vw - 4 && clip && q.h >= clip.h * 0.8);
    return own(e).length > 0 || e.tagName === 'BUTTON' || e.tagName === 'INPUT';
  });

  // ---- block list -------------------------------------------------------
  let cur = document.body;
  for (let i = 0; i < 12; i++) {
    const ks = kids(cur);
    const blocks = ks.filter(k => R(k).h >= 120);
    if (blocks.length >= 5) break;
    const big = [...ks].sort((a, b) => R(b).h - R(a).h)[0];
    if (!big || R(big).h < H * 0.45) break;
    cur = big;
  }
  const bigH2 = el => [...el.querySelectorAll('h2, h3')].filter(h => vis(h) && parseFloat(cs(h).fontSize) >= 26).length;
  const expand = (el, depth = 0) => {
    const q = R(el);
    const ks = kids(el).filter(k => R(k).h >= 40);
    if (depth < 5 && q.h > 2000 && bigH2(el) >= 2 && ks.length >= 2) return ks.flatMap(k => expand(k, depth + 1));
    return [el];
  };
  let footerEl = [...document.querySelectorAll('footer, [role=contentinfo]')].filter(e => vis(e) && R(e).h > 60 && R(e).w >= vw * 0.5).sort((a, b) => R(b).b - R(a).b || R(b).h - R(a).h)[0] || null;
  if (footerEl) { let p = footerEl.parentElement; while (p && p !== document.body && R(p).h < R(footerEl).h + 400 && R(p).y >= R(footerEl).y - 400 && p.tagName !== 'MAIN') { if (p.querySelectorAll('footer').length === 1 && R(p).h > R(footerEl).h + 4) footerEl = p; p = p.parentElement; } }
  if (!footerEl) { const c = [...document.querySelectorAll('body *')].filter(e => { const q = R(e); return vis(e) && q.w >= vw * 0.6 && q.b >= H - 600 && q.h < 1800 && q.h > 120 && e.querySelectorAll('a').length >= 12; }); footerEl = c.sort((a, b) => R(b).h - R(a).h)[0] || null; }
  let blocks = kids(cur).filter(k => R(k).h >= 40);
  // siblings of the ancestors of the chosen container (footer, pre-footer bands that sit outside <main>)
  for (let n = cur; n && n !== document.body; n = n.parentElement) { const par = n.parentElement; if (!par) break; kids(par).forEach(s => { if (s !== n && !s.contains(cur) && R(s).h >= 40 && R(s).w >= vw * 0.5) blocks.push(s); }); }
  blocks = blocks.filter(b => !blocks.some(o2 => o2 !== b && o2.contains(b)));
  // gap fill: content that sits between chosen blocks in another subtree
  { const sorted = [...blocks].sort((a, b) => R(a).y - R(b).y); const gaps = []; let lastB = sorted.length ? R(sorted[0]).y : 0; if (lastB > 200) gaps.push([0, lastB]); sorted.forEach(b => { const q = R(b); if (q.y - lastB > 150) gaps.push([lastB, q.y]); lastB = Math.max(lastB, q.b); }); if (H - lastB > 150) gaps.push([lastB, H]);
    const cand = [...document.querySelectorAll('body *')].filter(e => { if (SKIP.includes(e.tagName)) return false; const q = R(e); return q.h >= 80 && q.w >= vw * 0.5 && vis(e); });
    gaps.forEach(([a, b]) => { const inG = cand.filter(e => { const q = R(e); return q.y >= a - 2 && q.b <= b + 2 && !blocks.some(x => x.contains(e) || e.contains(x)); }); inG.filter(e => !inG.some(o2 => o2 !== e && o2.contains(e))).forEach(e => blocks.push(e)); }); }
  blocks = blocks.flatMap(b => expand(b));
  // drop blocks fully inside the footer, keep order by y
  for (let k = 0; k < 4; k++) blocks = blocks.flatMap(b => footerEl && b !== footerEl && b.contains(footerEl) ? kids(b).filter(c => R(c).h >= 40) : [b]);
  blocks = blocks.filter(b => !(footerEl && (footerEl.contains(b) || b === footerEl))).sort((a, b) => R(a).y - R(b).y);
  blocks = blocks.filter((b, i) => !blocks.some((o2, j) => j !== i && o2.contains(b)));
  // if a block contains the footer, cut it out by keeping it but flagging
  const DATE = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.? \d{1,2},? \d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2} (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{4}\b/gi;
  const surface = (e, base) => { const st = cs(e); const hasShadow = st.boxShadow !== 'none'; const hasBorder = parseFloat(st.borderTopWidth) > 0 && st.borderTopStyle !== 'none' && !transparent(st.borderTopColor); const bgDiff = !transparent(st.backgroundColor) && st.backgroundColor !== base; return hasShadow || hasBorder || bgDiff || (st.backgroundImage !== 'none' && parseFloat(st.borderTopLeftRadius) >= 6); };

  const blockInfo = (el, idx) => {
    const r = R(el); const s = cs(el);
    const o = { idx, tag: el.tagName.toLowerCase(), id: el.id || '', cls: (el.className && el.className.toString().slice(0, 60)) || '', top: rd(r.y), h: rd(r.h), w: rd(r.w), x: rd(r.x) };
    o.bg = effBg(el); o.ownBg = s.backgroundColor; o.bgImg = s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 80) : null; o.radius = s.borderTopLeftRadius;
    { let n = el, mx = { t: 0, b: 0 }; for (let i = 0; i < 5 && n; i++) { const st = cs(n); mx.t = Math.max(mx.t, parseFloat(st.paddingTop) || 0); mx.b = Math.max(mx.b, parseFloat(st.paddingBottom) || 0); const ks = kids(n); n = ks.length === 1 ? ks[0] : null; } o.cssPadT = mx.t; o.cssPadB = mx.b; }
    const all = [...el.querySelectorAll('*')].filter(vis);
    const leaves = leavesOf(el, r);
    if (leaves.length) { let a = 1e9, b = -1, l = 1e9, rr = -1; leaves.forEach(e => { const q = R(e); a = Math.min(a, q.y); b = Math.max(b, q.b); l = Math.min(l, q.x); rr = Math.max(rr, q.r); }); o.effPadT = rd(a - r.y); o.effPadB = rd(r.b - b); o.contentL = rd(l); o.contentR = rd(rr); o.contentW = rd(rr - l); }
    let best = null; all.forEach(e => { const q = R(e); if (q.w > 480 && q.w < vw - 8 && Math.abs(q.x - (vw - q.r)) < 6 && q.h > 60) { if (!best || q.w > R(best).w) best = e; } });
    if (best) o.containerW = rd(R(best).w);
    // heading group
    const hs = [...el.querySelectorAll('h1,h2,h3')].filter(h => vis(h) && txt(h).length > 2);
    let hd = hs.sort((a, b) => parseFloat(cs(b).fontSize) - parseFloat(cs(a).fontSize) || R(a).y - R(b).y)[0];
    if (hd && parseFloat(cs(hd).fontSize) < 22) { const top = [...el.querySelectorAll('h1,h2,h3')].filter(vis).sort((a, b) => R(a).y - R(b).y)[0]; hd = top || hd; }
    if (!hd) { let bigE = null; leaves.forEach(l => { if (isMedia(l)) return; const f = parseFloat(cs(l).fontSize); if (txt(l).length > 6 && (!bigE || f > bigE.f + 0.5)) bigE = { f, e: l }; }); if (bigE && bigE.f >= 24) hd = bigE.e; }
    if (hd) {
      const hr = R(hd); o.heading = typo(hd); o.headingFromTop = rd(hr.y - r.y);
      const eb = leaves.filter(l => { const q = R(l); return !isMedia(l) && q.b <= hr.y + 2 && q.b > hr.y - 80 && txt(l).length > 0 && txt(l).length <= 48 && parseFloat(cs(l).fontSize) <= 16 && !hd.contains(l); }).sort((a, b) => R(b).y - R(a).y)[0];
      if (eb) { o.eyebrow = typo(eb); o.eyebrowGap = rd(hr.y - R(eb).b); let p = eb; for (let i = 0; i < 3 && p && p !== el; i++) { const st = cs(p); if (!transparent(st.backgroundColor) || (parseFloat(st.borderTopWidth) > 0 && st.borderTopStyle !== 'none')) { o.eyebrow.chip = { bg: st.backgroundColor, border: st.borderTopWidth + ' ' + st.borderTopStyle + ' ' + st.borderTopColor, radius: st.borderTopLeftRadius, h: rd(R(p).h), padX: st.paddingLeft }; break; } p = p.parentElement; } }
      const sub = leaves.filter(l => { const q = R(l); return !isMedia(l) && q.y >= hr.b - 4 && q.y < hr.b + 110 && txt(l).length > 30 && !['A', 'BUTTON'].includes(l.tagName) && !hd.contains(l) && parseFloat(cs(l).fontSize) < parseFloat(cs(hd).fontSize); }).sort((a, b) => R(a).y - R(b).y)[0];
      let gb = hr.b;
      if (sub) { o.sub = typo(sub); o.subGap = rd(R(sub).y - hr.b); gb = Math.max(gb, R(sub).b); }
      const ctas = all.filter(e => (e.tagName === 'A' || e.tagName === 'BUTTON') && R(e).y > gb - 2 && R(e).y < gb + 90 && R(e).h >= 28 && R(e).h <= 60 && txt(e).length > 1 && txt(e).length < 40);
      if (ctas.length && ctas.length <= 3) { o.groupCtas = ctas.map(c => txt(c)).slice(0, 3); o.ctaGap = rd(R(ctas[0]).y - gb); gb = Math.max(gb, ...ctas.map(c => R(c).b)); }
      o.groupBottom = rd(gb - r.y);
      const content = all.filter(e => { const q = R(e); if (q.y < gb + 4 || q.y > r.b) return false; if (hd.contains(e) || e.contains(hd)) return false; return (isMedia(e) && q.w >= 120 && q.h >= 60) || (q.h >= 80 && q.w >= 200 && surface(e, effBg(e.parentElement || el))); }).sort((a, b) => R(a).y - R(b).y)[0];
      if (content) o.headToContent = rd(R(content).y - gb);
      o.allHeadings = [...el.querySelectorAll('h1,h2,h3,h4')].filter(vis).slice(0, 14).map(h => ({ t: h.tagName.toLowerCase(), s: parseFloat(cs(h).fontSize), w: cs(h).fontWeight, text: txt(h).slice(0, 70) }));
    }
    // card cluster
    const base = effBg(el);
    const cards = all.filter(e => { const q = R(e); if (q.w < 140 || q.w > 960 || q.h < 60 || q.h > 1000) return false; return surface(e, effBg(e.parentElement || el)) && parseFloat(cs(e).borderTopLeftRadius) >= 0; });
    const outer = cards.filter(c => !cards.some(o2 => o2 !== c && o2.contains(c)));
    if (outer.length >= 2) {
      const rows = {}; outer.forEach(c => { const k = Math.round(R(c).y / 8); (rows[k] = rows[k] || []).push(c); });
      const rowArr = Object.values(rows).sort((a, b) => b.length - a.length);
      const mainRow = rowArr[0].sort((a, b) => R(a).x - R(b).x);
      const gaps = []; for (let i = 1; i < mainRow.length; i++) gaps.push(rd(R(mainRow[i]).x - R(mainRow[i - 1]).r));
      o.cards = { n: outer.length, cols: mainRow.length, rows: rowArr.filter(r2 => r2.length >= 2).length, w: med(outer.map(c => rd(R(c).w))), h: med(outer.map(c => rd(R(c).h))), sizes: outer.slice(0, 10).map(c => rd(R(c).w) + 'x' + rd(R(c).h)), gap: med(gaps.filter(g => g >= 0 && g < 120)), radius: hist(outer.map(c => cs(c).borderTopLeftRadius), 3), pad: hist(outer.map(c => cs(c).paddingTop + '/' + cs(c).paddingLeft), 3), bg: hist(outer.map(c => cs(c).backgroundColor), 3), border: hist(outer.map(c => { const st = cs(c); return parseFloat(st.borderTopWidth) > 0 && st.borderTopStyle !== 'none' ? st.borderTopWidth + ' ' + st.borderTopColor : 'none'; }), 2), shadow: hist(outer.map(c => cs(c).boxShadow === 'none' ? 'none' : cs(c).boxShadow.slice(0, 120)), 2) };
    }
    // features
    const T = txt(el).toLowerCase();
    o.words = T.split(' ').filter(Boolean).length;
    o.snippet = txt(el).slice(0, 260);
    const imgs = all.filter(e => isMedia(e));
    o.f = {
      img: imgs.filter(e => e.tagName === 'IMG' && R(e).w >= 120).length,
      bigMedia: imgs.filter(e => R(e).w >= 400 && R(e).h >= 220).length,
      video: all.filter(e => e.tagName === 'VIDEO').length, canvas: all.filter(e => e.tagName === 'CANVAS').length,
      logoish: imgs.filter(e => { const q = R(e); return q.h >= 12 && q.h <= 64 && q.w >= 40 && q.w <= 260 && q.w / q.h >= 1.6; }).length,
      squareIcons: imgs.filter(e => { const q = R(e); return q.h >= 24 && q.h <= 72 && Math.abs(q.w - q.h) <= 4; }).length,
      avatars: imgs.filter(e => { const q = R(e); const br = parseFloat(cs(e).borderTopLeftRadius) || parseFloat(cs(e.parentElement).borderTopLeftRadius); return q.w >= 20 && q.w <= 72 && Math.abs(q.w - q.h) <= 3 && br >= q.w / 2 - 1; }).length,
      marquee: all.some(e => { const q = R(e); const an = cs(e).animationName; return q.w > vw * 1.25 && an && an !== 'none'; }) || all.some(e => { const q = R(e); return q.w > vw * 1.6 && q.h < 220 && cs(e).transform !== 'none'; }),
      details: el.querySelectorAll('details, summary').length, expanded: el.querySelectorAll('[aria-expanded]').length,
      tabs: el.querySelectorAll('[role=tab]').length, tables: el.querySelectorAll('table').length, tr: el.querySelectorAll('tr').length,
      quotes: el.querySelectorAll('blockquote, q, figure blockquote').length + (T.match(/[“”"]/g) || []).length / 2,
      prices: (T.match(/[$€£]\s?\d+|\/\s?mo\b|per month|per user|\/month|billed (annually|yearly|monthly)/g) || []).length,
      bigNums: leaves.filter(l => !isMedia(l) && parseFloat(cs(l).fontSize) >= 32 && /\d/.test(txt(l)) && /^[\d.,%x×+$€£<>~kmbtKMBT\s\/:-]{1,12}$/.test(txt(l))).map(l => ({ t: txt(l), s: parseFloat(cs(l).fontSize), w: cs(l).fontWeight })).slice(0, 8),
      steps: leaves.filter(l => /^(0?[1-9]|step \d+|\d\.)$/i.test(txt(l))).length,
      email: el.querySelectorAll('input[type=email], input[placeholder*="mail" i]').length, inputs: el.querySelectorAll('input, textarea').length,
      compliance: (T.match(/soc ?2|iso ?27001|gdpr|hipaa|encrypt|saml|sso\b|penetration|ccpa|trust center|audit log/g) || []).length,
      integ: (T.match(/integrat|connect(s|or)?\b|works with|plug(s|in)|marketplace|apps\b/g) || []).length,
      faq: /faq|frequently asked|questions/.test(T) ? 1 : 0,
      dates: (T.match(DATE) || []).length,
      sticky: all.some(e => cs(e).position === 'sticky'),
      buttons: all.filter(e => e.tagName === 'BUTTON' || (e.tagName === 'A' && parseFloat(cs(e).borderTopLeftRadius) >= 4 && !transparent(cs(e).backgroundColor) && R(e).h >= 28 && R(e).h <= 60)).length,
      links: all.filter(e => e.tagName === 'A').length,
      switch: el.querySelectorAll('[role=switch], [role=radiogroup], [role=tablist]').length + (/(monthly|annual|yearly)/.test(T) ? 1 : 0),
      checks: el.querySelectorAll('svg').length,
      h2count: bigH2(el)
    };
    return o;
  };

  const out = { vw, pageHeight: H, title: document.title, bodyBg: cs(document.body).backgroundColor, htmlBg: cs(document.documentElement).backgroundColor, bodyFont: cs(document.body).fontFamily.split(',')[0].replace(/["']/g, '') };
  out.blocks = blocks.map((b, i) => blockInfo(b, i));
  // announcement / top strip candidates
  const headerEl = [...document.querySelectorAll('header, nav, [role=banner]')].filter(vis).sort((a, b) => R(a).y - R(b).y)[0] || null;
  if (headerEl) { const q = R(headerEl); const st = cs(headerEl); out.header = { y: rd(q.y), h: rd(q.h), w: rd(q.w), pos: st.position, bg: st.backgroundColor }; }
  out.topStrips = [...document.querySelectorAll('body *')].filter(e => { if (!vis(e)) return false; const q = R(e); return q.y < 90 && q.w >= vw * 0.7 && q.h >= 22 && q.h <= 64 && txt(e).length >= 8 && txt(e).length <= 180 && e.querySelectorAll('a').length <= 3; }).filter((e, i, arr) => !arr.some(o2 => o2 !== e && e.contains(o2) && R(o2).h === R(e).h)).slice(0, 5).map(e => { const q = R(e); const st = cs(e); const t = e.querySelector('a, span, p') || e; return { y: rd(q.y), h: rd(q.h), w: rd(q.w), bg: effBg(e), text: txt(e).slice(0, 160), size: parseFloat(cs(t).fontSize), weight: cs(t).fontWeight, color: cs(t).color, links: e.querySelectorAll('a').length }; });
  // all section headings on the page
  out.h2 = [...document.querySelectorAll('h2')].filter(h => vis(h) && txt(h).length > 2).map(h => { const q = R(h); const s = cs(h); return { text: txt(h).slice(0, 100), size: parseFloat(s.fontSize), weight: s.fontWeight, ls: s.letterSpacing, lh: s.lineHeight, fam: s.fontFamily.split(',')[0].replace(/["']/g, ''), y: rd(q.y), x: rd(q.x), w: rd(q.w), h: rd(q.h), align: s.textAlign, words: txt(h).split(' ').length }; });
  // footer deep
  if (footerEl) {
    const q = R(footerEl); const s = cs(footerEl);
    const all = [...footerEl.querySelectorAll('*')].filter(vis);
    const links = all.filter(e => e.tagName === 'A');
    const groups = all.filter(e => { const ls = [...e.children].filter(c => vis(c) && (c.tagName === 'A' || ((c.tagName === 'LI' || c.tagName === 'DIV') && c.querySelector('a') && c.querySelectorAll('a').length === 1))); if (ls.length < 2) return false; const xs = ls.map(c => rd(R(c).x)); return Math.max(...xs) - Math.min(...xs) <= 4; });
    const og = groups.filter(g => !groups.some(o2 => o2 !== g && g.contains(o2) && o2.children.length >= 2));
    const cols = og.map(g => { const gl = [...g.querySelectorAll('a')].filter(vis); const ys = gl.map(a => R(a).y).sort((a, b) => a - b); const pitch = []; for (let i = 1; i < ys.length; i++) pitch.push(rd(ys[i] - ys[i - 1])); let head = null; let p = g; for (let i = 0; i < 3 && p && !head; i++) { let prev = p.previousElementSibling; while (prev && !vis(prev)) prev = prev.previousElementSibling; if (prev && txt(prev).length > 0 && txt(prev).length < 40 && prev.querySelectorAll('a').length <= 1) head = prev; p = p.parentElement; } return { x: rd(R(g).x), y: rd(R(g).y), w: rd(R(g).w), n: gl.length, pitch: med(pitch), head: head ? typo(head) : null, link: gl[0] ? typo(gl[0]) : null }; }).filter(c => c.n >= 2).sort((a, b) => a.x - b.x || a.y - b.y);
    const leaves = leavesOf(footerEl, null);
    let a = 1e9, b = -1; leaves.forEach(l => { const r2 = R(l); a = Math.min(a, r2.y); b = Math.max(b, r2.b); });
    const social = links.filter(l => /(x\.com|twitter|github|linkedin|youtube|discord|instagram|threads|bsky|tiktok|facebook|medium\.com|dribbble|mastodon|reddit)/i.test(l.href || '')).length;
    const big = all.filter(e => { const r2 = R(e); return r2.w >= vw * 0.45 && (isMedia(e) && r2.h >= 60 || parseFloat(cs(e).fontSize) >= 80 && own(e).length > 1); }).map(e => { const r2 = R(e); return { tag: e.tagName.toLowerCase(), w: rd(r2.w), h: rd(r2.h), fromBottom: rd(q.b - r2.b), size: parseFloat(cs(e).fontSize), text: own(e).slice(0, 30), color: cs(e).color }; }).slice(0, 4);
    const legal = all.filter(e => /©|\(c\)|copyright/i.test(own(e))).map(e => ({ y: rd(R(e).y), fromBottom: rd(q.b - R(e).b), text: own(e).slice(0, 90), size: parseFloat(cs(e).fontSize), color: cs(e).color }))[0] || null;
    const ft = txt(footerEl).toLowerCase();
    let inner = null; all.forEach(e => { const r2 = R(e); const st = cs(e); if (r2.h > q.h * 0.5 && r2.w < vw - 20 && parseFloat(st.borderTopLeftRadius) >= 8 && !transparent(st.backgroundColor) && (!inner || r2.h > inner.h)) inner = { w: rd(r2.w), h: rd(r2.h), radius: st.borderTopLeftRadius, bg: st.backgroundColor, x: rd(r2.x) }; });
    const brand = all.filter(e => (e.tagName === 'svg' || e.tagName === 'IMG') && R(e).y < q.y + 200 && R(e).w >= 20 && R(e).w <= 220 && R(e).h <= 60).sort((x1, x2) => R(x1).y - R(x2).y || R(x1).x - R(x2).x)[0];
    out.footer = {
      top: rd(q.y), h: rd(q.h), bg: effBg(footerEl), ownBg: s.backgroundColor, bgImg: s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 80) : null, borderTop: s.borderTopWidth + ' ' + s.borderTopStyle + ' ' + s.borderTopColor, radius: s.borderTopLeftRadius, inner,
      cssPadT: parseFloat(s.paddingTop), cssPadB: parseFloat(s.paddingBottom), effPadT: rd(a - q.y), effPadB: rd(q.b - b), contentL: leaves.length ? rd(Math.min(...leaves.map(l => R(l).x))) : null, contentR: leaves.length ? rd(Math.max(...leaves.map(l => R(l).r))) : null,
      linkCount: links.length, linkSize: hist(links.map(l => parseFloat(cs(l).fontSize)), 3), linkWeight: hist(links.map(l => cs(l).fontWeight), 2), linkColor: hist(links.map(l => cs(l).color), 2),
      cols, colCount: cols.length,
      brand: brand ? { x: rd(R(brand).x), y: rd(R(brand).y - q.y), w: rd(R(brand).w), h: rd(R(brand).h) } : null,
      big, legal,
      email: footerEl.querySelectorAll('input[type=email], input[placeholder*="mail" i]').length, inputs: footerEl.querySelectorAll('input').length,
      status: /all systems|operational|system status|\bstatus\b/.test(ft) ? (ft.match(/all systems[^.]{0,30}|[a-z ]{0,20}operational/) || ['status'])[0] : null,
      social, theme: all.filter(e => /theme|dark mode|light mode|system/i.test((e.getAttribute('aria-label') || '') + ' ' + (e.getAttribute('title') || ''))).length + (footerEl.querySelector('[role=radiogroup]') ? 1 : 0),
      lang: footerEl.querySelectorAll('select').length + (/english|language|\ben-us\b|region/.test(ft) ? 1 : 0),
      canvas: footerEl.querySelectorAll('canvas').length, video: footerEl.querySelectorAll('video').length, svg: footerEl.querySelectorAll('svg').length,
      animated: all.filter(e => { const an = cs(e).animationName; return an && an !== 'none'; }).length,
      compliance: (ft.match(/soc ?2|iso ?27001|gdpr|hipaa|ccpa/g) || []).length,
      headings: [...footerEl.querySelectorAll('h2,h3,h4,h5,h6,p,span,div')].filter(e => vis(e) && parseFloat(cs(e).fontSize) >= 28 && own(e).length > 4).slice(0, 3).map(typo),
      buttons: all.filter(e => (e.tagName === 'BUTTON' || e.tagName === 'A') && !transparent(cs(e).backgroundColor) && R(e).h >= 30 && R(e).h <= 60 && txt(e).length > 1).map(e => txt(e).slice(0, 30)).slice(0, 6),
      text: txt(footerEl).slice(0, 900)
    };
  }
  return out;
}

async function run(t, browser) {
  const { slug, url } = t;
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', locale: 'en-US', colorScheme: 'light', reducedMotion: 'no-preference' });
  const p = await ctx.newPage();
  const t0 = Date.now();
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 50000 });
    try { await p.waitForLoadState('networkidle', { timeout: 12000 }); } catch {}
    await p.waitForTimeout(2500);
    // decline non-essential cookies (privacy-preserving choice), then close any modal
    for (const name of ['Reject all', 'Reject All', 'Reject', 'Decline all', 'Decline', 'Deny', 'Only necessary', 'Necessary only', 'Use necessary cookies only', 'Opt out of all', 'Refuse']) {
      try { const btn = p.getByRole('button', { name: new RegExp('^\\s*' + name, 'i') }).first(); if (await btn.isVisible({ timeout: 250 })) { await btn.click({ timeout: 1000 }); await p.waitForTimeout(400); break; } } catch {}
    }
    try { await p.keyboard.press('Escape'); } catch {}
    await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' }).catch(() => {});
    let lastH = 0;
    for (let pass = 0; pass < 3; pass++) {
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(h, 40000); y += 450) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(110); }
      await p.waitForTimeout(700);
      const h2 = await p.evaluate(() => document.documentElement.scrollHeight);
      if (Math.abs(h2 - lastH) < 20) break; lastH = h2;
    }
    // hide leftover cookie/consent banners without accepting them
    await p.evaluate(() => { document.querySelectorAll('[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],#onetrust-banner-sdk,#CybotCookiebotDialog,.osano-cm-window,[aria-label*=cookie i]').forEach(e => { const r = e.getBoundingClientRect(); const pos = getComputedStyle(e).position; if ((pos === 'fixed' || pos === 'sticky') && r.height < 600) e.style.setProperty('display', 'none', 'important'); }); });
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1200);
    await p.evaluate(() => document.fonts.ready);
    const data = await p.evaluate(measure);
    Object.assign(data, { url, slug, kind: t.kind || 'home', site: t.site || slug, finalUrl: p.url(), captured: new Date().toISOString().slice(0, 10) });
    fs.writeFileSync(path.join(dir, 'raw', slug + '.json'), JSON.stringify(data, null, 1));
    const H = Math.min(data.pageHeight, 22000);
    try { await p.screenshot({ path: path.join(dir, 'full', slug + '.jpg'), fullPage: true, clip: { x: 0, y: 0, width: 1440, height: H }, scale: 'css', type: 'jpeg', quality: 68 }); } catch (e) { console.log('full fail', slug, e.message.slice(0, 80)); }
    if (!SKIPCROPS) {
      const cd = path.join(CROPS, slug); fs.mkdirSync(cd, { recursive: true });
      const shots = data.blocks.map(b => ({ name: 'b' + String(b.idx).padStart(2, '0'), y: b.top, h: b.h }));
      if (data.footer) shots.push({ name: 'footer', y: Math.max(0, data.footer.top - 40), h: data.footer.h + 40 });
      shots.push({ name: 'top', y: 0, h: 140 });
      const maxShots = t.kind === 'home' || !t.kind ? 40 : 10;
      for (const sh of shots.slice(0, maxShots)) {
        if (sh.h < 40 || sh.y >= data.pageHeight) continue;
        const h = Math.min(sh.h, sh.name === 'footer' ? 1700 : 1500, data.pageHeight - sh.y);
        try { await p.screenshot({ path: path.join(cd, sh.name + '.jpg'), fullPage: true, clip: { x: 0, y: sh.y, width: 1440, height: h }, scale: 'device', type: 'jpeg', quality: 86 }); } catch (e) { }
      }
    }
    console.log('ok', slug, 'H=', data.pageHeight, 'blocks=', data.blocks.length, 'footer=', data.footer ? data.footer.h : '-', ((Date.now() - t0) / 1000).toFixed(0) + 's');
  } catch (e) { console.log('FAIL', slug, e.message.slice(0, 140)); }
  await ctx.close();
}

const todo = list.filter(t => !only || only.includes(t.slug));
const browser = await chromium.launch();
let i = 0;
await Promise.all(Array.from({ length: CONC }, async () => { while (i < todo.length) { const t = todo[i++]; await run(t, browser); } }));
await browser.close();
