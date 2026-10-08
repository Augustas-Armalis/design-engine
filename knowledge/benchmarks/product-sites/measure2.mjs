#!/usr/bin/env node
// Heading-anchored rhythm + card clusters. usage (repo root): node knowledge/benchmarks/product-sites/measure2.mjs <slug> <url> [...]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
fs.mkdirSync(path.join(dir, 'raw2'), { recursive: true });

function measure() {
  const cs = e => getComputedStyle(e);
  const vw = innerWidth;
  const R = e => { const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, b: r.bottom + scrollY, r: r.right + scrollX }; };
  const vis = e => { const s = cs(e); const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const txt = e => (e.innerText || '').trim().replace(/\s+/g, ' ');
  const H = document.documentElement.scrollHeight;
  const MEDIA = ['IMG', 'VIDEO', 'CANVAS', 'svg', 'PICTURE', 'IFRAME'];
  const all = [...document.body.querySelectorAll('*')].filter(e => !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'PATH', 'G', 'DEFS', 'CIRCLE', 'RECT', 'LINE', 'USE'].includes(e.tagName.toUpperCase()) && vis(e));
  const footer = [...document.querySelectorAll('footer')].filter(vis).sort((a, b) => R(b).y - R(a).y)[0];
  const footTop = footer ? R(footer).y : H;
  const nav = [...document.querySelectorAll('header, nav')].filter(vis)[0];
  const isFixedAnc = e => { let n = e; while (n && n !== document.body) { const p = cs(n).position; if (p === 'fixed') return true; n = n.parentElement; } return false; };
  const leaves = all.filter(e => {
    if (isFixedAnc(e)) return false;
    const r = R(e);
    if (MEDIA.includes(e.tagName) || MEDIA.includes(e.tagName.toLowerCase())) { if (r.w >= vw - 4 && r.h > 500) return false; return r.w >= 24 && r.h >= 12; }
    return [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0);
  });
  // anchors: heading-ish
  const cand = all.filter(e => {
    if (isFixedAnc(e)) return false;
    if (!([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0) || /^H[1-6]$/.test(e.tagName))) return false;
    const t = txt(e); if (t.length < 6 || t.length > 200) return false;
    const fs_ = parseFloat(cs(e).fontSize);
    const r = R(e);
    if (r.y > footTop - 10) return false;
    if (e.closest('button, a[class*=btn], nav, header') && !/^H[1-3]$/.test(e.tagName)) return false;
    return (/^H[1-3]$/.test(e.tagName) && fs_ >= 24) || fs_ >= 36;
  }).sort((a, b) => R(a).y - R(b).y);
  // dedupe: parent/child, near duplicates
  const anchors = [];
  cand.forEach(e => {
    const r = R(e);
    const prev = anchors[anchors.length - 1];
    if (prev) {
      const pr = R(prev);
      if (prev.contains(e) || e.contains(prev)) return;
      if (Math.abs(r.y - pr.y) < 28) return;
      if (r.y < pr.b + 8 && Math.abs(parseFloat(cs(e).fontSize) - parseFloat(cs(prev).fontSize)) < 2) return; // second line of same heading split into spans
    }
    anchors.push(e);
  });
  const out = { vw, H, footTop: Math.round(footTop), navH: nav ? Math.round(R(nav).h) : null, anchors: [] };
  anchors.forEach((a, i) => {
    const r = R(a), s = cs(a);
    const lhPx = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.2;
    const fsz = parseFloat(s.fontSize);
    // previous content bottom: leaves entirely above this heading and below prev anchor... measure gap to nearest leaf bottom above heading top
    // eyebrow first (so the seam is measured above the eyebrow chip, not between chip and heading)
    const eb0 = leaves.filter(l => { const q = R(l); return q.b <= r.y + 3 && q.b > r.y - 70 && Math.abs(q.x - r.x) < 700 && txt(l).length > 0 && txt(l).length <= 40 && parseFloat(cs(l).fontSize) <= 16 && !MEDIA.includes(l.tagName) && !MEDIA.includes(l.tagName.toLowerCase()); }).sort((x, y) => R(y).b - R(x).b)[0];
    let groupTop = r.y; if (eb0) { let t = R(eb0).y; // include chip container
      let c = eb0; while (c.parentElement && c.parentElement !== document.body && R(c.parentElement).h < 60 && R(c.parentElement).y >= r.y - 90) { c = c.parentElement; t = Math.min(t, R(c).y); } groupTop = Math.min(groupTop, t); }
    let prevB = 0;
    leaves.forEach(l => { const q = R(l); if (q.b <= groupTop + 2 && q.b > prevB && !(a.contains(l))) prevB = q.b; });
    const nextAnchor = anchors[i + 1];
    const endY = nextAnchor ? R(nextAnchor).y : footTop;
    // heading block = a + sibling lines in same visual block
    let lastB = 0; leaves.forEach(l => { const q = R(l); if (q.y >= r.y - 2 && q.b <= endY + 2 && q.b > lastB) lastB = q.b; });
    // eyebrow: nearest short leaf above heading within 70px
    const eb = leaves.filter(l => { const q = R(l); return q.b <= r.y + 3 && q.b > r.y - 70 && Math.abs(q.x - r.x) < 700 && txt(l).length > 0 && txt(l).length <= 40 && parseFloat(cs(l).fontSize) <= 16 && !MEDIA.includes(l.tagName) && !MEDIA.includes(l.tagName.toLowerCase()); }).sort((x, y) => R(y).b - R(x).b)[0];
    // subtitle: next text leaf below heading within 110px
    const sub = leaves.filter(l => { const q = R(l); return q.y >= r.b - 4 && q.y < r.b + 110 && txt(l).length > 20 && !['A', 'BUTTON'].includes(l.tagName) && !a.contains(l) && parseFloat(cs(l).fontSize) < fsz; }).sort((x, y) => R(x).y - R(y).y)[0];
    // first big block (media/card) after heading within next 700px
    const blocks = all.filter(e => { const q = R(e); if (q.y < r.b || q.y > r.b + 700 || q.y > endY) return false; if (q.w < 300 || q.h < 160) return false; if (q.w > vw - 4) return false; return MEDIA.includes(e.tagName) || MEDIA.includes(e.tagName.toLowerCase()) || (parseFloat(cs(e).borderTopLeftRadius) >= 8 && (cs(e).boxShadow !== 'none' || parseFloat(cs(e).borderTopWidth) > 0 || cs(e).backgroundColor !== 'rgba(0, 0, 0, 0)')); }).sort((x, y) => R(x).y - R(y).y)[0];
    // bg at heading
    let bg = null; { let n = a; while (n && n !== document.documentElement) { const c = cs(n).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)') { bg = c; break; } n = n.parentElement; } }
    // section ancestor: largest ancestor not containing another anchor
    let sec = a; while (sec.parentElement && sec.parentElement !== document.body) { const p = sec.parentElement; if (anchors.some(o => o !== a && p.contains(o))) break; sec = p; }
    const sr = R(sec);
    const ss = cs(sec);
    out.anchors.push({
      i, text: txt(a).slice(0, 110), tag: a.tagName.toLowerCase(), chars: txt(a).length, words: txt(a).split(' ').length,
      size: fsz, weight: s.fontWeight, lsEm: s.letterSpacing === 'normal' ? 0 : +(parseFloat(s.letterSpacing) / fsz).toFixed(3), lhRatio: +(lhPx / fsz).toFixed(2), lines: Math.round(r.h / lhPx), w: Math.round(r.w), x: Math.round(r.x), align: s.textAlign, fam: s.fontFamily.split(',')[0].replace(/["']/g, ''), color: s.color,
      y: Math.round(r.y), groupTop: Math.round(groupTop), gapAbove: Math.round(groupTop - prevB), gapBelowLastContent: Math.round(endY - lastB), sectionContentH: Math.round(lastB - r.y),
      eyebrow: eb ? { text: txt(eb), size: parseFloat(cs(eb).fontSize), upper: cs(eb).textTransform === 'uppercase' || txt(eb) === txt(eb).toUpperCase(), mono: /mono|courier|code/i.test(cs(eb).fontFamily), pill: parseFloat(cs(eb).borderTopLeftRadius) >= 6 } : null,
      sub: sub ? { chars: txt(sub).length, size: parseFloat(cs(sub).fontSize), lines: Math.round(R(sub).h / (parseFloat(cs(sub).lineHeight) || parseFloat(cs(sub).fontSize) * 1.4)), w: Math.round(R(sub).w), color: cs(sub).color } : null,
      firstBlock: blocks ? { dy: Math.round(R(blocks).y - r.b), w: Math.round(R(blocks).w), h: Math.round(R(blocks).h), radius: cs(blocks).borderTopLeftRadius, tag: blocks.tagName.toLowerCase() } : null,
      bg, secTop: Math.round(sr.y), secH: Math.round(sr.h), secTag: sec.tagName.toLowerCase(), secPadT: ss.paddingTop, secPadB: ss.paddingBottom, secBgImg: ss.backgroundImage !== 'none',
      secBorderT: ss.borderTopWidth + ' ' + ss.borderTopColor,
    });
  });
  // card clusters
  const bgOf = e => { let n = e.parentElement; while (n && n !== document.documentElement) { const c = cs(n).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)') return c; n = n.parentElement; } return 'rgba(255,255,255,1)'; };
  const cards = all.filter(e => {
    if (isFixedAnc(e)) return false;
    const q = R(e); if (q.y > footTop || q.y < 700) return false;
    if (q.w < 200 || q.w > 900 || q.h < 140 || q.h > 900) return false;
    const st = cs(e); const br = parseFloat(st.borderTopLeftRadius); if (!(br >= 6) || st.borderTopLeftRadius.includes('%')) return false;
    const hasShadow = st.boxShadow !== 'none'; const hasBorder = parseFloat(st.borderTopWidth) > 0 && st.borderTopStyle !== 'none';
    const bgDiff = st.backgroundColor !== 'rgba(0, 0, 0, 0)' && st.backgroundColor !== bgOf(e);
    return hasShadow || hasBorder || bgDiff;
  });
  const outer = cards.filter(c => !cards.some(o => o !== c && o.contains(c)));
  const key = c => { const s = cs(c); return [s.borderTopLeftRadius.split(' ')[0], parseFloat(s.borderTopWidth) > 0 ? s.borderTopWidth + ' ' + s.borderTopColor : 'noborder', s.boxShadow === 'none' ? 'noshadow' : s.boxShadow.slice(0, 90), s.backgroundColor].join(' | '); };
  const clusters = {};
  outer.forEach(c => { const k = key(c); (clusters[k] = clusters[k] || []).push(c); });
  out.cardClusters = Object.entries(clusters).sort((a, b) => b[1].length - a[1].length).slice(0, 4).map(([k, els]) => {
    // sibling gaps
    const gaps = {};
    els.forEach(c => { const q = R(c); els.forEach(d => { if (d === c) return; const p = R(d); if (Math.abs(p.y - q.y) < 6 && p.x > q.r - 1 && p.x - q.r < 80) gaps[Math.round(p.x - q.r)] = (gaps[Math.round(p.x - q.r)] || 0) + 1; }); });
    const pads = {}; els.forEach(c => { const k2 = cs(c).paddingTop + '/' + cs(c).paddingLeft; pads[k2] = (pads[k2] || 0) + 1; });
    return { key: k, n: els.length, sizes: els.slice(0, 6).map(c => Math.round(R(c).w) + 'x' + Math.round(R(c).h)), gapMode: Object.entries(gaps).sort((a, b) => b[1] - a[1])[0] || null, padMode: Object.entries(pads).sort((a, b) => b[1] - a[1])[0] };
  });
  // content left mode of headings
  const lefts = {}; out.anchors.filter(a => a.align === 'left' || a.align === 'start').forEach(a => { lefts[a.x] = (lefts[a.x] || 0) + 1; });
  out.headingLeftMode = Object.entries(lefts).sort((a, b) => b[1] - a[1])[0] || null;
  // fixed/sticky nav info
  if (nav) { const s = cs(nav); out.nav = { pos: s.position, h: Math.round(R(nav).h), bg: s.backgroundColor, blur: s.backdropFilter, radius: s.borderTopLeftRadius }; }
  return out;
}

const targets = process.argv.slice(2);
const b = await chromium.launch();
for (let i = 0; i < targets.length; i += 2) {
  const slug = targets[i], url = targets[i + 1];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', locale: 'en-US' });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    try { await p.waitForLoadState('networkidle', { timeout: 15000 }); } catch {}
    await p.waitForTimeout(3000);
    await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    let lastH = 0;
    for (let pass = 0; pass < 3; pass++) {
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(150); }
      await p.waitForTimeout(600);
      const h2 = await p.evaluate(() => document.documentElement.scrollHeight);
      if (h2 === lastH) break; lastH = h2;
    }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1200);
    const data = await p.evaluate(measure);
    data.slug = slug; data.url = url;
    fs.writeFileSync(path.join(dir, 'raw2', slug + '.json'), JSON.stringify(data, null, 1));
    console.log('ok', slug, 'anchors', data.anchors.length, 'H', data.H);
  } catch (e) { console.log('FAIL', slug, e.message.slice(0, 120)); }
  await ctx.close();
}
await b.close();
