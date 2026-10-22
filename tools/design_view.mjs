#!/usr/bin/env node
// Design view: put a candidate next to what "good" looks like, measured, before anything reaches the founder.
// It renders the candidate, measures it against the format spec (X posts: knowledge/web/x-design-posts.md +
// system/variety/x-post-formats.json; heroes: hero-craft study + founder-taste + accepted Kestrel/Quorum), shows it
// beside the references from system/design-view/refs.json at the same height and at X's 514px feed size, and writes
// reports/<name>/design-view.{html,json,png}. Read the PNG. A FAIL here means do not deliver.
//
//   node tools/design_view.mjs <url> --kind post-component|hero-light|hero-dark --name <name> [--w 1200 --h 800]
//
// Post pages: mark the component with data-subject. Hero pages: mark the product with data-product (or role=img).
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [url, ...rest] = process.argv.slice(2)
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d }
const kind = flag('kind', 'post-component'), name = flag('name', 'candidate')
if (!url) { console.error('usage: node tools/design_view.mjs <url> --kind post-component|hero-light|hero-dark --name <name> [--w --h]'); process.exit(1) }
const refs = JSON.parse(fs.readFileSync(path.join(root, 'system/design-view/refs.json'), 'utf8'))[kind]
const isPost = kind.startsWith('post')
const W = +flag('w', isPost ? 1200 : 1440), H = +flag('h', isPost ? 800 : 900)
const out = path.join(root, 'reports', name); fs.mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
await page.goto(url); await page.waitForTimeout(+flag('wait', 4500))
const shot = path.join(out, 'design-view-candidate.png')
await page.screenshot({ path: shot, timeout: 90000 })

// ---- DOM measurements
const dom = await page.evaluate(({ isPost, W, H }) => {
  const R = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, b: r.bottom, r: r.right } }
  const texts = [...document.querySelectorAll('body *')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.getBoundingClientRect().width > 0)
  // effective font size: computed size times every ancestor's CSS zoom (Chromium reports font-size before zoom)
  const fs = (e) => { let z = 1; for (let a = e; a; a = a.parentElement) z *= parseFloat(getComputedStyle(a).zoom) || 1; return parseFloat(getComputedStyle(e).fontSize) * z }
  if (isPost) {
    const subj = document.querySelector('[data-subject]')
    const sr = subj ? R(subj) : null
    const inSubj = (e) => subj && subj.contains(e)
    const subjText = texts.filter(inSubj).map(fs)
    const outsideBig = texts.filter((e) => !inSubj(e) && fs(e) >= 28).map((e) => e.textContent.trim().slice(0, 40))
    return { subject: sr, minText: subjText.length ? Math.min(...subjText) : null, outsideBig }
  }
  const h1 = document.querySelector('h1'); const cs = h1 && getComputedStyle(h1)
  const hr = h1 && R(h1)
  const sub = h1 && [...document.querySelectorAll('p')].find((p) => p.getBoundingClientRect().top > hr.b - 2 && p.getBoundingClientRect().top < hr.b + 120)
  const subR = sub && R(sub), subCs = sub && getComputedStyle(sub)
  const ctas = [...document.querySelectorAll('main a, main button')].filter((e) => { const r = e.getBoundingClientRect(); return r.height >= 32 && r.top > (subR ? subR.b : hr.b) - 4 && r.top < H })
  const ctaR = ctas.map(R)
  // the product: tagged, or the largest element below the headline that holds a real app's worth of text (>= 15 text nodes)
  const dense = (el) => [...el.querySelectorAll('*')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())).length
  const below = [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return !e.contains(h1) && r.bottom > hr.b && r.width > W * 0.3 && r.width < W * 1.05 && r.height > 120 && dense(e) >= 15 })
  const prod = document.querySelector('[data-product]') || below.sort((a, b) => R(b).w * Math.min(R(b).h, H) - R(a).w * Math.min(R(a).h, H))[0]
  const pr = prod ? R(prod) : null
  const words = h1 ? h1.textContent.trim().split(/\s+/) : []
  return {
    h1: h1 && { text: h1.textContent.trim(), size: parseFloat(cs.fontSize), weight: +cs.fontWeight, track: parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize), lines: Math.round(hr.h / parseFloat(cs.lineHeight || cs.fontSize)), words: words.length, family: cs.fontFamily.split(',')[0], top: hr.y, bottom: hr.b, titleCase: words.every((w) => /^[A-Z0-9’'"“(]/.test(w) || /^(a|an|the|of|to|in|on|for|and|or)$/i.test(w)) },
    sub: subR && { size: parseFloat(subCs.fontSize), lines: Math.round(subR.h / parseFloat(subCs.lineHeight)), width: subR.w, top: subR.y, bottom: subR.b },
    ctas: ctaR.map((r) => Math.round(r.h)), ctaTop: ctaR.length ? Math.min(...ctaR.map((r) => r.y)) : null, ctaBottom: ctaR.length ? Math.max(...ctaR.map((r) => r.b)) : null,
    product: pr && { top: pr.y, visible: Math.max(0, Math.min(pr.b, H) - Math.max(pr.y, 0)) * Math.max(0, Math.min(pr.r, W) - Math.max(pr.x, 0)) / (W * H) },
  }
}, { isPost, W, H })

// ---- pixel measurements (in a canvas, no native deps)
const px = await page.evaluate(async ({ data, W, H }) => {
  const img = new Image(); img.src = data; await img.decode()
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); g.drawImage(img, 0, 0, W, H)
  const d = g.getImageData(0, 0, W, H).data
  const at = (x, y) => { const i = (y * W + x) * 4; return [d[i], d[i + 1], d[i + 2]] }
  const lum = ([r, gg, b]) => 0.2126 * r + 0.7152 * gg + 0.0722 * b
  // border band: outer 6% of the frame
  const band = []; const m = Math.round(Math.min(W, H) * 0.06)
  for (let y = 0; y < H; y += 4) for (let x = 0; x < W; x += 4) if (x < m || y < m || x > W - m || y > H - m) band.push(at(x, y))
  const L = band.map(lum), mean = L.reduce((a, b) => a + b, 0) / L.length
  // canvas solidity = the cleanest of the four corner patches (content may bleed off one or two edges)
  const cs = Math.round(Math.min(W, H) * 0.08), corner = (x0, y0) => { const v = []; for (let y = y0; y < y0 + cs; y += 2) for (let x = x0; x < x0 + cs; x += 2) v.push(lum(at(x, y))); const mu = v.reduce((a, b) => a + b, 0) / v.length; return Math.sqrt(v.reduce((a, b) => a + (b - mu) ** 2, 0) / v.length) }
  const std = Math.min(corner(0, 0), corner(W - cs, 0), corner(0, H - cs), corner(W - cs, H - cs))
  const chroma = band.map(([r, gg, b]) => Math.max(r, gg, b) - Math.min(r, gg, b)).reduce((a, b) => a + b, 0) / band.length
  // whole-frame: share of colourful pixels and quiet 16px blocks
  let colour = 0, n = 0, quiet = 0, blocks = 0
  for (let y = 0; y < H; y += 3) for (let x = 0; x < W; x += 3) { const [r, gg, b] = at(x, y); n++; if (Math.max(r, gg, b) - Math.min(r, gg, b) > 60) colour++ }
  for (let by = 0; by + 16 <= H; by += 16) for (let bx = 0; bx + 16 <= W; bx += 16) { const v = []; for (let y = by; y < by + 16; y += 4) for (let x = bx; x < bx + 16; x += 4) v.push(lum(at(x, y))); const mu = v.reduce((a, b) => a + b, 0) / v.length; const s = Math.sqrt(v.reduce((a, b) => a + (b - mu) ** 2, 0) / v.length); blocks++; if (s < 4) quiet++ }
  return { bandMeanL: Math.round(mean), bandStdL: +std.toFixed(1), bandChroma: +chroma.toFixed(1), colourShare: +(colour / n).toFixed(3), quietShare: +(quiet / blocks).toFixed(2) }
}, { data: 'data:image/png;base64,' + fs.readFileSync(shot).toString('base64'), W, H })

// ---- the checks (each cites its rule)
const C = []
const add = (id, ok, value, want, rule) => C.push({ id, status: ok === null ? 'info' : ok ? 'pass' : 'FAIL', value, want, rule })
if (isPost) {
  const ratio = W / H
  add('format.ratio', ratio >= 0.79 && ratio <= 1.78, ratio.toFixed(3), '0.79-1.78 (one slot of X\'s table, KC-24: 4:5 1080x1350, 1:1, 7:8 pairs, 8:9, 16:9; square is normal for one component: Marcel kx-036, Kuleszo kz-129/274)', 'XP-07 / XP-04 / KC-24, measured refs')
  add('format.export-px', W * 2 >= 2000, `${W * 2}x${H * 2}`, '>= 2000 px wide', 'XP-11')
  add('canvas.solid', px.bandStdL <= 5 && px.bandChroma <= 14, `corner std ${px.bandStdL}, chroma ${px.bandChroma}`, 'solid canvas (cleanest corner std <= 5: Marcel streak 4.3, Kuleszo 0.0; chroma <= 14): no gradient blobs, glass, dither, wallpapers', 'XP-08, measured refs')
  const share = dom.subject ? dom.subject.w / W : null
  add('subject.marked', !!dom.subject, dom.subject ? 'yes' : 'no', 'mark the component with data-subject', 'design view')
  add('subject.crop', share !== null && ((share >= 0.35 && share <= 0.75) || (share >= 0.12 && share <= 0.2)), share?.toFixed(2), 'close crop 35-75% of frame width (component at 1.5-2x; Kuleszo 55-75%), or far 12-20%', 'XP-09, AKZ')
  const feed = dom.minText ? dom.minText * (514 / W) : null
  add('subject.feed-legible', feed !== null && feed >= 6.5, feed?.toFixed(1) + 'px at 514px feed', 'smallest component text >= 6.5px in the 514px feed tile (scale the component up, not the text down)', 'XP-28')
  add('media.no-headline', dom.outsideBig.length === 0, dom.outsideBig.join(' | ') || 'none', 'no headline text in the media; the caption carries the words', 'XP-12')
} else {
  const h = dom.h1 || {}, s = dom.sub || {}
  add('product.visible', !!dom.product && dom.product.visible >= 0.2, dom.product ? `${Math.round(dom.product.visible * 100)}% of fold` : 'none', 'the real product is in the fold (>= 20% of it): the hero must say what the product is in 3 seconds; abstract art fails', 'founder: Quorum v4.1, Kestrel, "clean never means sparse"')
  add('product.top', !!dom.product && dom.product.top <= 600, dom.product ? Math.round(dom.product.top) : '-', 'product top <= 600px', 'founder Kite hero; Basit 48-66%')
  add('h1.size', h.size >= 52 && h.size <= 72, h.size, '52-72px (lean 52-60)', 'Kestrel 72 accepted; founder Kite "about 52, not 66-80"; HC median 56')
  add('h1.weight', h.weight >= 450 && h.weight <= 600, h.weight, '450-600', 'founder hero rules; type-voices')
  add('h1.tracking', h.track <= -0.03 && h.track >= -0.055, h.track?.toFixed(3) + 'em', '-0.03 to -0.055em', 'BA-04; Kestrel/Quorum -0.045')
  add('h1.lines', h.lines === 2, h.lines, '2 balanced lines', 'founder Kite/Quorum')
  add('h1.words', h.words >= 3 && h.words <= 6, h.words, '3-6 words with an idea in them', 'founder: "short and specific"')
  add('h1.case', h.titleCase === true, h.titleCase ? 'Title Case' : 'sentence/other', 'Title Case, no full stop (founder default for SaaS heroes)', 'founder Kite hero')
  add('sub.width', s.width <= 640, `${Math.round(s.width || 0)}px, ${s.lines} lines`, '<= 640px wide (2 hand-set lines preferred)', 'founder: "the subtitle now wtf" (a 1000px line)')
  add('gap.h1-sub', dom.sub && s.top - h.bottom >= 12 && s.top - h.bottom <= 26, dom.sub ? Math.round(s.top - h.bottom) : '-', '12-26px', 'HC-01')
  add('gap.sub-cta', dom.ctaTop && dom.sub && dom.ctaTop - s.bottom >= 24 && dom.ctaTop - s.bottom <= 40, dom.ctaTop && dom.sub ? Math.round(dom.ctaTop - s.bottom) : '-', '24-40px', 'HC-01')
  add('gap.cta-product', dom.product && dom.ctaBottom && (dom.product.top < dom.h1.top || (dom.product.top - dom.ctaBottom >= 48 && dom.product.top - dom.ctaBottom <= 120)), dom.product && dom.ctaBottom ? Math.round(dom.product.top - dom.ctaBottom) : '-', '48-120px below the CTAs, or a side stage (split)', 'HC-01; Kestrel 54 accepted')
  add('cta.height', dom.ctas.length > 0 && dom.ctas.every((x) => x >= 40 && x <= 56), dom.ctas.join(','), '40-56px', 'HC 46 median; founder 44-48')
  add('fold.quiet', px.quietShare >= 0.4, px.quietShare, '>= 0.40 of 16px blocks quiet (Kestrel 0.46 accepted; premium median 0.78)', 'HC-03')
  add('fold.colour', kind === 'hero-dark' ? px.colourShare <= 0.08 : null, px.colourShare, kind === 'hero-dark' ? '<= 8% saturated pixels in dark' : 'info', 'dark-mode-premium')
}
const fails = C.filter((c) => c.status === 'FAIL').length

// ---- the view
const rel = (p) => path.relative(out, path.join(root, p))
const html = `<!doctype html><meta charset="utf-8"><title>Design view: ${name}</title>
<style>body{margin:0;background:#f4f4f5;font:14px/1.45 Inter,system-ui,sans-serif;color:#111}h1{font-size:20px;margin:0 0 4px}.wrap{padding:24px}
.row{display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap}.card{background:#fff;border-radius:12px;padding:12px;box-shadow:0 0 0 1px #0001}
.card img{display:block;height:${isPost ? 300 : 340}px;width:auto;border-radius:6px}.cap{font-size:12px;color:#555;max-width:520px;margin-top:6px}
.feed{width:514px}.feed img{width:514px;height:auto}table{border-collapse:collapse;width:100%;margin-top:16px;background:#fff;border-radius:12px;overflow:hidden}
td,th{padding:7px 10px;border-bottom:1px solid #eee;text-align:left;vertical-align:top}.FAIL{color:#c01818;font-weight:700}.pass{color:#137a3a;font-weight:600}.info{color:#777}
.verdict{font-size:16px;font-weight:700;margin:12px 0;color:${fails ? '#c01818' : '#137a3a'}}</style>
<div class="wrap"><h1>Design view: ${name} (${refs.label})</h1><div class="cap">spec: ${refs.spec}</div>
<div class="verdict">${fails ? `${fails} FAIL: do not deliver` : 'All measured checks pass. Now compare by eye: is it as rich, as finished, as the references?'}</div>
<div class="row"><div class="card"><b>Candidate</b><img src="design-view-candidate.png"></div>${isPost ? `<div class="card feed"><b>As X shows it (514px feed tile)</b><img src="design-view-candidate.png"></div>` : ''}</div>
<h1 style="margin-top:20px">What good looks like</h1><div class="row">${refs.refs.map((r) => `<div class="card"><img src="${rel(r.path)}"><div class="cap">${r.why}</div></div>`).join('')}</div>
<table><tr><th>check</th><th>status</th><th>value</th><th>want</th><th>rule</th></tr>${C.map((c) => `<tr><td>${c.id}</td><td class="${c.status}">${c.status}</td><td>${c.value}</td><td>${c.want}</td><td>${c.rule}</td></tr>`).join('')}</table>
<div class="cap" style="margin-top:12px">pixels: ${JSON.stringify(px)}</div></div>`
fs.writeFileSync(path.join(out, 'design-view.html'), html)
fs.writeFileSync(path.join(out, 'design-view.json'), JSON.stringify({ url, kind, W, H, dom, px, checks: C, fails }, null, 1))
const v = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
await v.goto('file://' + path.join(out, 'design-view.html')); await v.waitForTimeout(500)
await v.screenshot({ path: path.join(out, 'design-view.png'), fullPage: true })
await browser.close()
console.log(`${name} [${kind}]: ${fails} fail, ${C.filter((c) => c.status === 'pass').length} pass -> reports/${name}/design-view.png`)
for (const c of C.filter((c) => c.status === 'FAIL')) console.log(`  FAIL ${c.id}: ${c.value} (want ${c.want}; ${c.rule})`)
process.exit(fails ? 1 : 0)
