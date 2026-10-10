#!/usr/bin/env node
// Type-specific measurements inside one section's y-range (logos, testimonials, metrics, faq, cta, pricing, table).
// usage: node knowledge/benchmarks/sections/measure-types.mjs tasks.json out.json [--conc 4]
// tasks: [{ slug, url, type, y, h }]  (y/h in CSS px at 1440 from raw/<slug>.json; type 'pricing'/'table' scans the whole page when h is 0)
import { chromium } from 'playwright';
import fs from 'node:fs';
const [tf, of] = process.argv.slice(2);
const CONC = process.argv.includes('--conc') ? +process.argv[process.argv.indexOf('--conc') + 1] : 4;
const tasks = JSON.parse(fs.readFileSync(tf, 'utf8'));
const byUrl = {}; tasks.forEach(t => (byUrl[t.url] = byUrl[t.url] || []).push(t));

function M(tasks) {
  const cs = e => getComputedStyle(e); const rd = Math.round;
  const R = e => { const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, b: r.bottom + scrollY, r: r.right + scrollX }; };
  const vis = e => { const s = cs(e); const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05; };
  const own = e => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').trim().replace(/\s+/g, ' ');
  const txt = e => (e.innerText || '').trim().replace(/\s+/g, ' ');
  const med = a => { a = a.filter(v => v != null && !isNaN(v)).sort((x, y) => x - y); return a.length ? a[Math.floor(a.length / 2)] : null; };
  const hist = (a, n = 4) => { const m = {}; a.forEach(k => m[k] = (m[k] || 0) + 1); return Object.entries(m).sort((x, y) => y[1] - x[1]).slice(0, n); };
  const tr = c => !c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent';
  const effBg = e => { let n = e; while (n && n !== document.documentElement) { const c = cs(n).backgroundColor; if (!tr(c)) return c; n = n.parentElement; } return 'rgb(255, 255, 255)'; };
  const H = document.documentElement.scrollHeight;
  const out = [];
  for (const t of tasks) {
    const y0 = t.h ? t.y : 0, y1 = t.h ? t.y + t.h : H;
    const inR = e => { const q = R(e); return q.y >= y0 - 2 && q.b <= y1 + 2; };
    const all = [...document.querySelectorAll('body *')].filter(e => vis(e) && inR(e) && cs(e).position !== 'fixed');
    const texts = all.filter(e => own(e).length > 0);
    const T = e => { const s = cs(e); return { size: parseFloat(s.fontSize), weight: s.fontWeight, ls: s.letterSpacing, lh: s.lineHeight, fam: s.fontFamily.split(',')[0].replace(/["']/g, ''), color: s.color, tt: s.textTransform }; };
    const o = { slug: t.slug, type: t.type, y: t.y, h: t.h };
    if (t.type === 'logos') {
      const g = all.filter(e => ['IMG', 'svg'].includes(e.tagName) && !e.closest('svg svg')).filter(e => { const q = R(e); return q.h >= 10 && q.h <= 72 && q.w >= 30 && q.w <= 280; });
      const outer = g.filter(e => !g.some(o2 => o2 !== e && o2.contains(e)));
      o.n = outer.length; o.h = med(outer.map(e => rd(R(e).h))); o.hRange = outer.length ? [rd(Math.min(...outer.map(e => R(e).h))), rd(Math.max(...outer.map(e => R(e).h)))] : null; o.w = med(outer.map(e => rd(R(e).w)));
      const rows = {}; outer.forEach(e => { const k = rd(R(e).y / 24); (rows[k] = rows[k] || []).push(e); });
      const rr = Object.values(rows).filter(r => r.length >= 2); o.rows = rr.length;
      const gaps = []; rr.forEach(r => { r.sort((a, b) => R(a).x - R(b).x); for (let i = 1; i < r.length; i++) gaps.push(rd(R(r[i]).x - R(r[i - 1]).r)); }); o.gap = med(gaps.filter(v => v > 0 && v < 300));
      o.opacity = hist(outer.map(e => { let op = 1, n = e; for (let i = 0; i < 4 && n; i++) { op *= parseFloat(cs(n).opacity); n = n.parentElement; } return op.toFixed(2); }), 3);
      o.filter = hist(outer.map(e => cs(e).filter), 2);
      const cap = texts.filter(e => txt(e).length > 10 && txt(e).length < 140).sort((a, b) => R(a).y - R(b).y)[0]; if (cap) o.caption = { text: txt(cap).slice(0, 80), ...T(cap) };
    }
    if (t.type === 'testimonials') {
      const q = texts.filter(e => own(e).length > 60);
      o.quoteSize = hist(q.map(e => parseFloat(cs(e).fontSize)), 4); o.quoteWeight = hist(q.map(e => cs(e).fontWeight), 2); o.quoteLh = hist(q.map(e => (parseFloat(cs(e).lineHeight) / parseFloat(cs(e).fontSize)).toFixed(2)), 2); o.quoteLs = hist(q.map(e => cs(e).letterSpacing), 2);
      o.quoteLen = med(q.map(e => own(e).length)); o.nQuotes = q.length;
      const cards = all.filter(e => { const r = R(e); if (r.w < 200 || r.w > 900 || r.h < 120 || r.h > 900) return false; const s = cs(e); const has = !tr(s.backgroundColor) && s.backgroundColor !== effBg(e.parentElement) || (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') || s.boxShadow !== 'none'; return has && q.some(x => e.contains(x)); });
      const oc = cards.filter(c => !cards.some(o2 => o2 !== c && c.contains(o2) && q.some(x => o2.contains(x))));
      o.cards = oc.length; o.cardW = med(oc.map(c => rd(R(c).w))); o.cardH = med(oc.map(c => rd(R(c).h))); o.cardR = hist(oc.map(c => cs(c).borderTopLeftRadius), 2); o.cardPad = hist(oc.map(c => cs(c).paddingTop + '/' + cs(c).paddingLeft), 2); o.cardBg = hist(oc.map(c => cs(c).backgroundColor), 2); o.cardBorder = hist(oc.map(c => parseFloat(cs(c).borderTopWidth) > 0 ? cs(c).borderTopWidth + ' ' + cs(c).borderTopColor : 'none'), 2); o.cardShadow = hist(oc.map(c => cs(c).boxShadow.slice(0, 90)), 1);
      const av = all.filter(e => { const r = R(e); if (!(e.tagName === 'IMG' || cs(e).backgroundImage !== 'none')) return false; const br = parseFloat(cs(e).borderTopLeftRadius); return r.w >= 16 && r.w <= 96 && Math.abs(r.w - r.h) <= 3 && br >= r.w / 2 - 2; });
      o.avatar = med(av.map(e => rd(R(e).w))); o.nAvatars = av.length;
      const names = texts.filter(e => { const l = own(e).length; return l >= 3 && l <= 40 && parseFloat(cs(e).fontSize) <= 17; }); o.nameSize = hist(names.map(e => parseFloat(cs(e).fontSize)), 3);
    }
    if (t.type === 'metrics') {
      const n = texts.filter(e => parseFloat(cs(e).fontSize) >= 26 && /\d/.test(own(e)) && /^[\d.,%x×+$€£<>~kmbtKMBT\s\/:-]{1,14}$/.test(own(e)));
      o.n = n.length; o.num = n.slice(0, 8).map(e => ({ t: own(e), ...T(e) }));
      const caps = n.map(e => { const r = R(e); return texts.filter(c => c !== e && !/^[\d.,%x+$\s]+$/.test(own(c)) && R(c).y >= r.b - 4 && R(c).y < r.b + 60 && Math.abs(R(c).x - r.x) < 40 && own(c).length > 3)[0]; }).filter(Boolean);
      o.cap = hist(caps.map(c => parseFloat(cs(c).fontSize)), 3); o.capGap = med(n.map((e, i) => caps[i] ? rd(R(caps[i]).y - R(e).b) : null));
      const xs = n.map(e => R(e).x).sort((a, b) => a - b); const d = []; for (let i = 1; i < xs.length; i++) if (xs[i] - xs[i - 1] > 40) d.push(rd(xs[i] - xs[i - 1])); o.colPitch = med(d);
    }
    if (t.type === 'faq') {
      let rows = all.filter(e => e.matches('summary, button[aria-expanded], [role=button][aria-expanded]'));
      rows = rows.filter(e => { const r = R(e); return r.w >= 240 && r.h >= 24 && txt(e).length > 8; });
      o.n = rows.length; o.rowH = med(rows.map(e => rd(R(e).h))); o.rowW = med(rows.map(e => rd(R(e).w))); o.rowX = med(rows.map(e => rd(R(e).x)));
      const ys = rows.map(e => R(e).y).sort((a, b) => a - b); const p = []; for (let i = 1; i < ys.length; i++) p.push(rd(ys[i] - ys[i - 1])); o.pitch = med(p);
      const qt = rows.map(e => [...e.querySelectorAll('*')].concat([e]).filter(x => own(x).length > 8)[0]).filter(Boolean); o.q = qt[0] ? T(qt[0]) : null;
      o.icon = med(rows.map(e => { const s = e.querySelector('svg'); return s ? rd(R(s).w) : null; }));
      o.divider = hist(rows.map(e => { let n = e; for (let i = 0; i < 3 && n; i++) { const s = cs(n); if (parseFloat(s.borderBottomWidth) > 0 && s.borderBottomStyle !== 'none') return s.borderBottomWidth + ' ' + s.borderBottomColor; if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') return 'top ' + s.borderTopWidth + ' ' + s.borderTopColor; n = n.parentElement; } return 'none'; }), 2);
      o.rowBg = hist(rows.map(e => { let n = e; for (let i = 0; i < 3 && n; i++) { const s = cs(n); if (!tr(s.backgroundColor)) return s.backgroundColor + ' r' + s.borderTopLeftRadius; n = n.parentElement; } return 'none'; }), 2);
      const ans = all.filter(e => own(e).length > 60 && !rows.some(r => r.contains(e))); o.answer = ans[0] ? T(ans[0]) : null; o.openAnswers = ans.length;
      const h2 = all.filter(e => /^H[1-3]$/.test(e.tagName) && txt(e).length > 2)[0]; if (h2) { const r = R(h2); o.head = { text: txt(h2).slice(0, 50), x: rd(r.x), w: rd(r.w), ...T(h2) }; o.layout = rows.length && R(rows[0]).x > r.r ? 'split' : 'stacked'; }
    }
    if (t.type === 'cta') {
      const btn = all.filter(e => (e.tagName === 'A' || e.tagName === 'BUTTON') && !tr(cs(e).backgroundColor) && R(e).h >= 28 && R(e).h <= 64 && txt(e).length > 1 && txt(e).length < 40);
      o.buttons = btn.map(e => ({ t: txt(e).slice(0, 30), h: rd(R(e).h), w: rd(R(e).w), r: cs(e).borderTopLeftRadius, bg: cs(e).backgroundColor, size: parseFloat(cs(e).fontSize) })).slice(0, 3);
      const panel = all.filter(e => { const r = R(e); const s = cs(e); return r.w >= 560 && r.w < 1436 && r.h >= 200 && parseFloat(s.borderTopLeftRadius) >= 6 && (!tr(s.backgroundColor) || s.backgroundImage !== 'none'); }).sort((a, b) => R(b).w * R(b).h - R(a).w * R(a).h)[0];
      if (panel) { const r = R(panel); o.panel = { w: rd(r.w), h: rd(r.h), r: cs(panel).borderTopLeftRadius, bg: cs(panel).backgroundColor, img: cs(panel).backgroundImage !== 'none' }; }
      const hd = all.filter(e => /^H[1-3]$/.test(e.tagName) || parseFloat(cs(e).fontSize) >= 30).filter(e => own(e).length > 4).sort((a, b) => parseFloat(cs(b).fontSize) - parseFloat(cs(a).fontSize))[0];
      if (hd) { const r = R(hd); o.head = { text: txt(hd).slice(0, 60), w: rd(r.w), align: cs(hd).textAlign, ...T(hd) }; const b0 = btn[0]; if (b0) o.headToBtn = rd(R(b0).y - r.b); }
      const micro = texts.filter(e => { const s = parseFloat(cs(e).fontSize); return s <= 14 && btn.length && R(e).y > R(btn[0]).b && R(e).y < R(btn[0]).b + 80 && own(e).length > 6; })[0]; if (micro) o.micro = { text: own(micro).slice(0, 60), size: parseFloat(cs(micro).fontSize) };
      o.input = all.filter(e => e.tagName === 'INPUT' || e.tagName === 'TEXTAREA').length;
    }
    if (t.type === 'pricing') {
      const priceRe = /^\s*([$€£]\s?\d[\d,.]*|\d[\d,.]*\s?[$€£]|free|custom|let.s talk|contact (us|sales))\s*$/i;
      const prices = texts.filter(e => priceRe.test(own(e)) && parseFloat(cs(e).fontSize) >= 24);
      const cardsOf = prices.map(p => { let n = p.parentElement; let best = null; for (let i = 0; i < 9 && n && n !== document.body; i++) { const r = R(n); if (r.w >= 200 && r.w <= 520 && r.h >= 260 && r.h <= 1500) best = n; if (r.w > 560) break; n = n.parentElement; } return best; }).filter(Boolean);
      const uniq = [...new Set(cardsOf)].filter(c => c.querySelectorAll('a, button').length >= 1);
      o.plans = uniq.length; o.price = prices[0] ? T(prices[0]) : null; o.priceSizes = hist(prices.map(e => parseFloat(cs(e).fontSize)), 3);
      o.cardW = med(uniq.map(c => rd(R(c).w))); o.cardH = med(uniq.map(c => rd(R(c).h)));
      const xs = uniq.map(c => R(c)).sort((a, b) => a.x - b.x); const g = []; for (let i = 1; i < xs.length; i++) if (Math.abs(xs[i].y - xs[i - 1].y) < 40) g.push(rd(xs[i].x - xs[i - 1].r)); o.gap = med(g);
      o.cardR = hist(uniq.map(c => cs(c).borderTopLeftRadius), 3); o.cardPad = hist(uniq.map(c => cs(c).paddingTop + '/' + cs(c).paddingLeft), 3);
      o.cardBg = uniq.map(c => cs(c).backgroundColor); o.cardBorder = uniq.map(c => parseFloat(cs(c).borderTopWidth) > 0 && cs(c).borderTopStyle !== 'none' ? cs(c).borderTopWidth + ' ' + cs(c).borderTopColor : 'none'); o.cardShadow = uniq.map(c => cs(c).boxShadow === 'none' ? 'none' : 'shadow');
      o.cardTop = uniq.map(c => rd(R(c).y)); o.cardHs = uniq.map(c => rd(R(c).h));
      o.features = med(uniq.map(c => c.querySelectorAll('li').length || [...c.querySelectorAll('svg')].length));
      o.ctaH = med(uniq.map(c => { const b = [...c.querySelectorAll('a, button')].filter(x => R(x).h >= 28 && R(x).h <= 60 && txt(x).length > 2)[0]; return b ? rd(R(b).h) : null; }));
      const tog = all.filter(e => /^(monthly|annual|yearly|annually|billed (monthly|yearly|annually))/i.test(own(e)) && R(e).y < (xs[0] ? xs[0].y : 2000)); o.toggle = tog.length ? { text: own(tog[0]).slice(0, 30), y: rd(R(tog[0]).y), toCards: xs[0] ? rd(xs[0].y - R(tog[0]).b) : null } : null;
      o.badge = texts.filter(e => /most popular|recommended|popular|best value/i.test(own(e)) && own(e).length < 30).map(e => own(e)).slice(0, 2);
    }
    if (t.type === 'table') {
      let rows = all.filter(e => e.tagName === 'TR' || e.getAttribute('role') === 'row');
      if (rows.length < 6) { const cands = all.filter(e => { const r = R(e); return r.w >= 700 && r.h >= 28 && r.h <= 90 && e.children.length >= 3 && [...e.children].every(c => Math.abs(R(c).y - r.y) < 6); }); rows = cands.filter(c => !cands.some(o2 => o2 !== c && c.contains(o2))); }
      o.rows = rows.length; o.rowH = med(rows.map(e => rd(R(e).h))); o.cols = med(rows.map(e => e.children.length)); o.firstCol = med(rows.map(e => e.children[0] ? rd(R(e.children[0]).w) : null)); o.w = med(rows.map(e => rd(R(e).w)));
      o.cell = rows[3] && rows[3].children[0] ? T(rows[3].children[0]) : null;
      o.sticky = all.filter(e => cs(e).position === 'sticky' && R(e).w > 600).length;
      o.rowBorder = hist(rows.map(e => { const s = cs(e); const c = e.children[0] ? cs(e.children[0]) : s; return (parseFloat(s.borderBottomWidth) || parseFloat(c.borderBottomWidth)) ? 'hair' : (tr(s.backgroundColor) ? 'none' : 'zebra/bg'); }), 2);
      o.groups = all.filter(e => (e.tagName === 'TH' || /^H[3-6]$/.test(e.tagName)) && own(e).length > 2 && own(e).length < 40).length;
      o.checkSvg = med(all.filter(e => e.tagName === 'svg' && rows.some(r => r.contains(e))).map(e => rd(R(e).w)));
    }
    out.push(o);
  }
  return out;
}

const urls = Object.keys(byUrl); const res = [];
const browser = await chromium.launch(); let i = 0;
await Promise.all(Array.from({ length: CONC }, async () => { while (i < urls.length) { const url = urls[i++]; const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' }); const p = await ctx.newPage();
  try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 50000 }); try { await p.waitForLoadState('networkidle', { timeout: 10000 }); } catch {}
    await p.waitForTimeout(2000);
    for (const name of ['Reject all', 'Reject All', 'Reject', 'Decline', 'Deny', 'Only necessary', 'Necessary only']) { try { const b = p.getByRole('button', { name: new RegExp('^\\s*' + name, 'i') }).first(); if (await b.isVisible({ timeout: 250 })) { await b.click({ timeout: 800 }); break; } } catch {} }
    const h = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < Math.min(h, 30000); y += 500) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(90); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
    const r = await p.evaluate(M, byUrl[url]); res.push(...r); console.log('ok', url, r.length);
  } catch (e) { console.log('FAIL', url, e.message.slice(0, 100)); }
  await ctx.close(); } }));
await browser.close();
fs.writeFileSync(of, JSON.stringify(res, null, 1));
