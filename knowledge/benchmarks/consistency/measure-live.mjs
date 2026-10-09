// Live consistency measurement: icon centring in controls, radius-by-height, control heights, nested radius, text cap-centring.
// usage: node knowledge/benchmarks/consistency/measure-live.mjs <slug> <url> [dpr=2]
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const [slug, url, dprArg] = process.argv.slice(2);
const dpr = +(dprArg || 2);
setTimeout(() => { console.log("TIMEOUT", slug); process.exit(2); }, 150000);

const PAGE_FN = () => {
  const out = { icons: [], radii: [], controls: [], nests: [], meta: {} };
  const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) > 0.05; };
  const pf = (v, ref) => { if (!v) return 0; return v.endsWith('%') ? parseFloat(v) / 100 * ref : (parseFloat(v) || 0); };
  const effRadii = (el) => { const cs = getComputedStyle(el), r = el.getBoundingClientRect(); const w = r.width, h = r.height;
    const cs4 = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'].map((k) => { const s = cs[k].split(' '); return [pf(s[0], w), pf(s[1] || s[0], h)]; });
    // CSS scales all radii down when adjacent sum exceeds the side
    let f = 1; const [tl, tr, br, bl] = cs4;
    f = Math.min(f, w / Math.max(1e-6, tl[0] + tr[0]), w / Math.max(1e-6, bl[0] + br[0]), h / Math.max(1e-6, tl[1] + bl[1]), h / Math.max(1e-6, tr[1] + br[1]));
    return cs4.map(([a, b]) => Math.min(a, b) * f); };
  const hasChrome = (el) => { const cs = getComputedStyle(el); const bg = cs.backgroundColor; const m = bg.match(/[\d.]+/g) || []; const a = bg.startsWith('rgba') || bg.startsWith('color') ? parseFloat(m[3] ?? 1) : (bg === 'transparent' ? 0 : 1);
    const bw = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    return (a > 0.02 && bg !== 'rgba(0, 0, 0, 0)') || bw > 0 || (cs.boxShadow && cs.boxShadow !== 'none') || cs.backgroundImage !== 'none'; };
  const isInteractive = (el) => el.matches('button,a,[role=button],[role=tab],[role=menuitem],[role=option],summary,input,select,label') ;
  const capCache = {};
  const capHeight = (cs) => { const key = cs.fontFamily + cs.fontSize + cs.fontWeight; if (capCache[key]) return capCache[key]; const c = document.createElement('canvas').getContext('2d'); c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; const m = c.measureText('H'); const x = c.measureText('x'); return (capCache[key] = { cap: m.actualBoundingBoxAscent, xh: x.actualBoundingBoxAscent, asc: m.fontBoundingBoxAscent, desc: m.fontBoundingBoxDescent }); };
  const textInfo = (box) => { // first text node with visible text
    const w = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
    const nodes = []; let n; while ((n = w.nextNode())) nodes.push(n); if (!nodes.length) return null;
    const rg = document.createRange(); rg.selectNodeContents(nodes[0]); const rs = [...rg.getClientRects()].filter((r) => r.width > 0); if (!rs.length) return null;
    const r = rs.find((q) => q.width >= 4 && q.height >= 4); if (!r) return null; const par = nodes[0].parentElement; const cs = getComputedStyle(par);
    const { cap, xh, asc, desc } = capHeight(cs);
    // content area is centred on the line box in a single-line inline; baseline = top + ascent (+ half-leading already inside rect height)
    const baseline = r.top + asc + ((r.height - (asc + desc)) / 2);
    return { rect: r, cs, capCy: baseline - cap / 2, xCy: baseline - xh / 2, lineCy: (r.top + r.bottom) / 2, fs: parseFloat(cs.fontSize), cap, text: nodes[0].textContent.trim().slice(0, 24) };
  };
  const inkBox = (svg) => { const parts = svg.querySelectorAll('path,circle,rect,line,polyline,polygon,ellipse'); let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, n = 0;
    parts.forEach((p) => { const cs = getComputedStyle(p); if ((cs.fill === 'none' && (cs.stroke === 'none' || parseFloat(cs.strokeWidth) === 0)) || p.closest('defs,clipPath,mask')) return; if (p.matches('rect') && p.getAttribute('fill') === 'none') return; const r = p.getBoundingClientRect(); if (!r.width && !r.height) return; n++; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); });
    return n ? { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 } : null; };

  // ---------- icons in containers
  const all = [...document.querySelectorAll('svg')].filter(vis);
  for (const svg of all) {
    const sr = svg.getBoundingClientRect(); if (sr.width > 64 || sr.height > 64 || sr.width < 8) continue;
    let box = svg.parentElement; let found = null;
    for (let i = 0; i < 4 && box && box !== document.body; i++, box = box.parentElement) { const r = box.getBoundingClientRect(); if (r.height > 120 || r.width > 520) break; if (isInteractive(box) || (hasChrome(box) && effRadii(box)[0] >= 0)) { found = box; if (isInteractive(box) || hasChrome(box)) break; } }
    if (!found || !hasChrome(found) && !isInteractive(found)) continue;
    const br = found.getBoundingClientRect(); const cs = getComputedStyle(found);
    const svgs = found.querySelectorAll('svg'); const txt = textInfo(found);
    const ink = inkBox(svg); const scx = sr.left + sr.width / 2, scy = sr.top + sr.height / 2;
    const row = { tag: found.tagName.toLowerCase(), role: found.getAttribute('role') || '', cls: (found.className && found.className.baseVal === undefined ? String(found.className) : '').slice(0, 60),
      boxW: +br.width.toFixed(2), boxH: +br.height.toFixed(2), svgW: +sr.width.toFixed(2), svgH: +sr.height.toFixed(2), kind: txt ? 'icon+text' : (svgs.length === 1 ? 'icon-only' : 'multi-icon'),
      dx: +(scx - (br.left + br.width / 2)).toFixed(2), dy: +(scy - (br.top + br.height / 2)).toFixed(2),
      radius: +effRadii(found)[0].toFixed(2), display: cs.display, fs: cs.fontSize, lh: cs.lineHeight,
      relLeft: +(sr.left - br.left).toFixed(3), relTop: +(sr.top - br.top).toFixed(3), relRight: +(br.right - sr.right).toFixed(3), relBottom: +(br.bottom - sr.bottom).toFixed(3),
      parityW: +((br.width - sr.width) / 2 % 1).toFixed(2), parityH: +((br.height - sr.height) / 2 % 1).toFixed(2) };
    if (ink) { row.inkDx = +(ink.cx - scx).toFixed(2); row.inkDy = +(ink.cy - scy).toFixed(2); row.inkW = +ink.w.toFixed(2); row.inkH = +ink.h.toFixed(2); }
    if (txt) { row.textLineDy = +(scy - txt.lineCy).toFixed(2); row.textCapDy = +(scy - txt.capCy).toFixed(2); row.textXDy = +(scy - txt.xCy).toFixed(2); row.fsNum = txt.fs; row.cap = +txt.cap.toFixed(2); row.label = txt.text; row.iconToFont = +(sr.height / txt.fs).toFixed(2);
      row.textAfter = (txt.rect.left > sr.right) ? 'after' : 'before'; row.gap = +(txt.rect.left > sr.right ? txt.rect.left - sr.right : sr.left - txt.rect.right).toFixed(2); }
    out.icons.push(row);
  }

  // ---------- controls & text centring
  const cEls = [...document.querySelectorAll('button,a[class*=btn i],a[class*=button i],[role=button],input:not([type=hidden]):not([type=checkbox]):not([type=radio]),select,textarea')].filter(vis);
  for (const el of cEls) { const r = el.getBoundingClientRect(); if (r.height < 16 || r.height > 120 || r.width < 16) continue; const cs = getComputedStyle(el); if (!hasChrome(el) && !el.matches('input,select,textarea')) continue;
    const txt = el.matches('input,select,textarea') ? null : textInfo(el);
    const row = { tag: el.tagName.toLowerCase(), w: +r.width.toFixed(2), h: +r.height.toFixed(2), radius: +effRadii(el)[0].toFixed(2), fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight, ls: cs.letterSpacing, ff: cs.fontFamily.split(',')[0].replace(/"/g, ''),
      pt: cs.paddingTop, pr: cs.paddingRight, pb: cs.paddingBottom, pl: cs.paddingLeft, bw: cs.borderTopWidth, hasSvg: !!el.querySelector('svg') };
    if (txt && !row.hasSvg) { row.capDy = +(txt.capCy - (r.top + r.height / 2)).toFixed(2); row.lineDy = +(txt.lineCy - (r.top + r.height / 2)).toFixed(2); row.cap = +txt.cap.toFixed(2); row.label = txt.text; }
    out.controls.push(row);
  }

  // ---------- radius rows + nesting
  const els = [...document.querySelectorAll('body *')];
  let cnt = 0;
  for (const el of els) { if (cnt > 4000) break; if (el.closest('svg')) continue; const r = el.getBoundingClientRect(); if (r.height < 12 || r.height > 400 || r.width < 12) continue; if (!vis(el)) continue;
    const rad = effRadii(el); const mx = Math.max(...rad); if (mx <= 0) continue; if (!hasChrome(el)) continue; cnt++;
    out.radii.push({ tag: el.tagName.toLowerCase(), inter: isInteractive(el), w: +r.width.toFixed(1), h: +r.height.toFixed(2), r: +Math.min(...rad).toFixed(2), rmax: +mx.toFixed(2), pill: mx >= Math.min(r.width, r.height) / 2 - 0.6 });
    // nesting: nearest ancestor with radius and chrome
    let p = el.parentElement; while (p && p !== document.body && !(hasChrome(p) && Math.max(...effRadii(p)) > 0)) p = p.parentElement;
    if (p && p !== document.body) { const pr = p.getBoundingClientRect(); const pc = getComputedStyle(p); const bwL = parseFloat(pc.borderLeftWidth), bwT = parseFloat(pc.borderTopWidth), bwR = parseFloat(pc.borderRightWidth), bwB = parseFloat(pc.borderBottomWidth);
      const insets = { l: r.left - pr.left - bwL, t: r.top - pr.top - bwT, rr: pr.right - r.right - bwR, b: pr.bottom - r.bottom - bwB }; const pR = effRadii(p);
      // corners: tl uses (l,t), tr uses (rr,t), br (rr,b), bl (l,b)
      const pairs = [[insets.l, insets.t, pR[0], rad[0]], [insets.rr, insets.t, pR[1], rad[1]], [insets.rr, insets.b, pR[2], rad[2]], [insets.l, insets.b, pR[3], rad[3]]];
      for (const [a, b, rp, rc] of pairs) { if (a < -0.6 || b < -0.6) continue; if (Math.abs(a - b) > 0.6) continue; const gap = (a + b) / 2; if (gap < 0.6 || gap > rp) continue; out.nests.push({ gap: +gap.toFixed(2), rp: +rp.toFixed(2), rc: +rc.toFixed(2), expected: +Math.max(0, rp - gap).toFixed(2), childH: +r.height.toFixed(1), tag: el.tagName.toLowerCase() }); break; }
    }
  }
  out.meta = { title: document.title, w: innerWidth, dpr: devicePixelRatio, svgCount: all.length, fonts: [...new Set([...document.querySelectorAll('button,h1,p')].slice(0, 30).map((e) => getComputedStyle(e).fontFamily.split(',')[0]))] };
  return out;
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: dpr, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' });
const page = await ctx.newPage();
try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 }); } catch (e) { console.log('goto warn', e.message.slice(0, 100)); }
try { await page.waitForLoadState('networkidle', { timeout: 15000 }); } catch {}
await page.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < Math.min(H, 9000); y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); await document.fonts.ready; });
await page.waitForTimeout(1200);
const res = await page.evaluate(PAGE_FN);
res.meta.url = url; res.meta.slug = slug; res.meta.when = new Date().toISOString();
fs.mkdirSync(new URL('./raw/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL(`./raw/${slug}.json`, import.meta.url), JSON.stringify(res));
console.log(slug, 'icons', res.icons.length, 'controls', res.controls.length, 'radii', res.radii.length, 'nests', res.nests.length, res.meta.title.slice(0, 50));
await browser.close();
