#!/usr/bin/env node
// Delivery gate: one command per kind, measured censuses, FAIL blocks delivery (docs/PROCESS-AUDIT-2026-10-21.md 3.2 + 5.3).
//
//   node tools/gate.mjs <url> --kind <hero-light|hero-dark|section-bento|product-ui|client-app|post-component|full-website|audit>
//                       --name <name> [--direction work/<name>/DIRECTION.md] [--dark] [--w 1440 --h 900] [--wait 4500]
//                       [--force-report]
//
// Renders at 1440x900 @2x (--w/--h override, e.g. 1200x800 for a design_view post frame; plus 390x844 for full-website/audit), runs the censuses
// below on the visible elements of the fold, writes reports/<name>/gate.json, gate-fold.png and report.json (the shape
// tools/ledger.mjs reads: name, summary, fingerprint, viewports[0].screenshots.fold), prints PASS/WARN/FAIL lines and exits 1
// on any FAIL. An existing report.json written by check.mjs is left alone (it carries a richer fingerprint) unless
// --force-report. Mark the hero product with [data-product] and a post subject with [data-subject].
//
// Censuses: correctness (overflow, one h1, AA contrast, 24px targets with the WCAG 2.5.8 spacing exception), edge & shadow
// (distinct shadow strings, border+ring doubles, ring+inset highlight), radius ladder (rendered radius per height band,
// nested radius), type (families, sizes, weights, h1 tuple), colour (OKLCH accent hue families, dark canvas chroma and
// colourful pixel share), button grammar (one primary recipe, primaries in the hero, CTA height/radius, icon-led secondary),
// hero composition (nothing between nav and h1, subtitle lines, CTA->product gap, product share and transform), scope & motion
// (DIRECTION scope:/motion:/changes:/chip: lines; no running animation, loop or video when motion is none), crop & fade
// (text lines crossing a crop edge or half-faded by a mask; knowledge/founder/canon/designers-eye.md DE-01/DE-07).
//
// Thresholds: system/canon/<kind>.json (every key optional, ranges are [min,max]); FALLBACK below fills any missing key.
// Calibration (2026-10-21). The aim was that accepted builds do not FAIL on measurement artefacts:
//  - Runs: Kestrel (accepted, :4392) and Quorum (accepted, :4391) as hero-light; Kite landing (accepted dark, kite app
//    #/landing) as hero-dark; Weft (rejected, :4382) as the negative; replicas #/kiso and #/bentok as post-component;
//    Kaching (shipped, :4343) as full-website/audit.
//  - Shadows: the count is of *elevation* shadows, meaning the blurred outset layers of non-control boxes. Rings are edges,
//    insets are material, and button recipes are checked by the button census. Raw strings over-counted Kestrel (11).
//  - Product internals are counted apart: shadows, sizes, weights, mono and categorical hues inside [data-product]
//    (or the guessed product) are WARN or INFO, not page FAILs. Quorum's tag chips use 4 hues plus status colours.
//  - Accent hues: a family needs >= 2 uses or >= 400px2, and hues cluster within 25deg. Red, amber and green are status
//    hues unless one of them is the brand. Kestrel uses blue plus red and green deltas.
//  - Font sizes are rounded to whole px, because scaled products make sub-pixel twins (Kite: 9 -> 7).
//  - A gradient button is primary only when the average of its stops contrasts >= 2.2:1 with the canvas. Kite's dark
//    "Book a demo" is a secondary.
//  - Radius bands are [a, b), so a 32px control sits in "32-40" (founder L166: 32px controls 12). The CTA rule is
//    r >= min(12, 0.3h): L156 + L367, and Quorum's 12px at 48px.
//  - Results: Kite 0 fail, kiso/bentok 0 fail, Weft 6 fail. Kestrel's 2 fails and Quorum's 1 are real conflicts with
//    the canon, not artefacts:
//    - Kestrel: the 54px CTA-to-product gap. Kestrel was accepted 10-08; the >= 64 rule dates from Strata, 10-09.
//    - Kestrel: one 450-weight CTA sub-label.
//    - Quorum: 650-weight avatar initials in its Ask card, which the product guess misses. Tag the card data-product.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d }
const has = (n) => argv.includes(`--${n}`)
const url = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'))
const KINDS = ['hero-light', 'hero-dark', 'section-bento', 'product-ui', 'client-app', 'post-component', 'full-website', 'audit']
const kind = flag('kind', 'hero-light'), name = flag('name', 'gate')
if (!url || has('help') || !KINDS.includes(kind)) {
  console.error(`usage: node tools/gate.mjs <url> --kind <${KINDS.join('|')}> --name <name> [--direction work/<name>/DIRECTION.md] [--dark] [--w --h --wait] [--force-report]`)
  process.exit(2)
}
const dark = kind === 'hero-dark' || has('dark')
const isHero = kind.startsWith('hero'), isPost = kind === 'post-component', isSite = kind === 'full-website' || kind === 'audit'
const W = +flag('w', 1440), H = +flag('h', 900), WAIT = +flag('wait', 4500)
const out = path.join(root, 'reports', name); fs.mkdirSync(out, { recursive: true })

// ---- thresholds: canon file, then fallback ----
const FALLBACK = {
  floor: [],
  h1: { sizePx: [52, 72], weight: [450, 600], trackingEm: [-0.055, -0.03], maxWords: 6, maxLines: 2 },
  subtitle: { maxLines: 2, lastLineMinShare: 0.4 },
  cta: { heightPx: [40, 56], radiusPx: null, maxPrimary: 1 },
  radiusLadder: { '0-24': [4, 10], '24-36': [6, 14], '36-56': [8, 18], '56-160': [10, 24], '160-100000': [12, 32] },
  maxShadowStrings: 3, maxFontFamilies: 2, maxFontSizes: isHero ? 8 : 10, weights: [400, 450, 500, 550, 600],
  maxAccentHues: kind === 'product-ui' || kind === 'client-app' ? 4 : 2, canvas: { maxChroma: dark ? 0.02 : 0.03 }, maxColourfulPixelShare: dark ? 0.03 : null,
  hero: { ctaProductGapPx: [64, 120], productMinFoldShare: 0.2, nothingBetweenNavAndH1: true },
  motionDefault: 'none',
}
const canonPath = path.join(root, 'system', 'canon', `${kind}.json`)
let canon = {}
try { if (fs.existsSync(canonPath)) canon = JSON.parse(fs.readFileSync(canonPath, 'utf8')) } catch (e) { console.error(`canon ${canonPath} unreadable: ${e.message}`) }
const pick = (key, sub) => {
  const c = sub ? canon[key]?.[sub] : canon[key]; const f = sub ? FALLBACK[key]?.[sub] : FALLBACK[key]
  return c !== undefined && c !== null ? { v: c, src: 'canon' } : { v: f, src: 'fallback' }
}
const val = (k, s) => pick(k, s).v
const inR = (x, r) => x != null && Array.isArray(r) ? x >= r[0] - 1e-9 && x <= r[1] + 1e-9 : true

// ---- DIRECTION lint ----
let direction = null
const dirPath = flag('direction')
if (dirPath) {
  const p = path.resolve(root, dirPath)
  const txt = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null
  const line = (k) => { const m = txt && txt.match(new RegExp(`^\\s*(?:[-*]\\s*)?\\**${k}\\**\\s*:\\**\\s*(.+)$`, 'im')); return m ? m[1].replace(/\*+/g, '').trim() : null }
  direction = { path: dirPath, exists: !!txt, scope: line('scope'), motion: line('motion'), changes: line('changes'), chip: line('chip'), mode: line('mode') }
}
const motionNone = direction?.motion ? /^(none|no\b|off|static|still)/i.test(direction.motion) : false
const chipDeclared = direction?.chip ? /^(yes|true|on)/i.test(direction.chip) : false

// ================= in-page census (returns plain data) =================
const census = (cfg) => {
  const { W, H } = cfg
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true }); const cache = new Map()
  const rgba = (c) => {
    if (cache.has(c)) return cache.get(c)
    cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1)
    const d = cv.getImageData(0, 0, 1, 1).data; const v = [d[0], d[1], d[2], d[3] / 255]; cache.set(c, v); return v
  }
  // colour maths: WCAG luminance, sRGB -> OKLCH
  const lin = (x) => { x /= 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4 }
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
  const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3]))
  const oklch = ([r, g, b]) => {
    const R = lin(r), G = lin(g), B = lin(b)
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    return { L, C: Math.hypot(A, Bb), h: ((Math.atan2(Bb, A) * 180) / Math.PI + 360) % 360 }
  }
  const hex = (c) => '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
  const tag = (el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : ''}`.slice(0, 48)
  const txt = (el) => (el.getAttribute?.('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 32)
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
  const tagged = [...document.querySelectorAll('[data-product]')].find((e) => e.getBoundingClientRect().width > 0) || null
  // a data-subject nested inside the product (an embedded component post) is not the page's subject
  const subject = [...document.querySelectorAll('[data-subject]')].find((e) => !e.parentElement?.closest('[data-product]')) || null
  const h1 = [...document.querySelectorAll('h1')].find((h) => h.getBoundingClientRect().width > 0)
  // the product: tagged, else (with an h1) the largest dense block below the headline (design_view's rule)
  let product = tagged
  if (!product && h1 && !subject && cfg.guessProduct) {
    const hr = h1.getBoundingClientRect()
    const dense = (el) => { let n = 0; for (const e of el.querySelectorAll('*')) if ([...e.childNodes].some((t) => t.nodeType === 3 && t.textContent.trim())) n++; return n }
    const media = (e) => e.matches('img, canvas, video, picture') || /url\(/.test(getComputedStyle(e).backgroundImage) || !!e.querySelector('img, canvas, video')
    const below = [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return !e.contains(h1) && r.top < H && r.bottom > hr.bottom && r.width > W * 0.3 && r.width < W * 1.05 && r.height > 120 })
    const big = (a, b) => { const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(); return B.width * Math.min(B.height, H) - A.width * Math.min(A.height, H) }
    product = below.filter((e) => dense(e) >= 15).sort(big)[0] || below.filter(media).sort(big)[0] || null
  }
  // every [data-product] element is product (a bento has one per cell), plus the guessed product when untagged
  const inProd = (el) => !!el.closest?.('[data-product]') || (!!product && product.contains(el))
  // rendered lines of a block: cluster the client rects of its text nodes by vertical centre
  const lineBoxes = (el) => {
    const rs = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    for (let n = w.nextNode(); n; n = w.nextNode()) { if (!n.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n); for (const q of rg.getClientRects()) if (q.width > 1) rs.push(q) }
    const lh = parseFloat(getComputedStyle(el).fontSize) * 0.5; const L = []
    for (const q of rs.sort((a, b) => a.top - b.top)) { const c = q.top + q.height / 2; const l = L.find((x) => Math.abs(x.c - c) < lh); if (l) { l.l = Math.min(l.l, q.left); l.r = Math.max(l.r, q.right) } else L.push({ c, l: q.left, r: q.right }) }
    return L.map((x) => x.r - x.l)
  }
  const opacityOf = (el) => { let o = 1; for (let a = el; a && a.nodeType === 1; a = a.parentElement) o *= +getComputedStyle(a).opacity; return o }
  const scaleOf = (el) => { const r = el.getBoundingClientRect(); return el.offsetWidth > 0 ? Math.min(4, Math.max(0.25, r.width / el.offsetWidth)) : 1 }
  const vis = (el) => {
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false
    if (r.bottom <= 0 || r.top >= H || r.right <= 0 || r.left >= W) return false
    const s = getComputedStyle(el); if (s.visibility === 'hidden' || s.display === 'none' || s.contentVisibility === 'hidden') return false
    return opacityOf(el) > 0.05
  }
  const all = [...document.querySelectorAll('body *')].filter((e) => !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'HEAD'].includes(e.tagName) && vis(e))
  const scope = subject ? all.filter((e) => subject.contains(e) || e === subject) : all
  const res = { W, H, elements: all.length, hasProduct: !!product, productTagged: !!tagged, hasSubject: !!subject }

  // page canvas colour (for compositing and dark checks)
  let canvas = [255, 255, 255]
  for (const e of [document.body, document.documentElement]) { const c = rgba(getComputedStyle(e).backgroundColor); if (c[3] > 0.5) { canvas = c.slice(0, 3); break } }
  // the visible canvas is often painted by a wrapper div (React roots), not body: walk up from what sits under the fold's
  // side margins and take the first opaque background found at the majority of sample points
  { const pts = [[6, H * 0.5], [W - 6, H * 0.5], [W * 0.5, 6], [6, H - 6], [W - 6, 6]], seen = {}
    for (const [x, y] of pts) { let e = document.elementFromPoint(x, y); while (e && e !== document.documentElement) { const c = rgba(getComputedStyle(e).backgroundColor); if (c[3] > 0.5) { const k = c.slice(0, 3).join(','); seen[k] = (seen[k] || 0) + 1; break } e = e.parentElement } }
    const best = Object.entries(seen).sort((a, b) => b[1] - a[1])[0]; if (best && best[1] >= 2) canvas = best[0].split(',').map(Number) }
  res.canvasCss = hex(canvas)

  // ---- correctness ----
  res.overflowPx = document.documentElement.scrollWidth - innerWidth
  res.overflowers = [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 1 && r.width > 0 && getComputedStyle(e).position !== 'fixed' }).slice(0, 6).map(tag)
  res.h1Count = [...document.querySelectorAll('h1')].filter((h) => { const r = h.getBoundingClientRect(); return r.width > 0 && getComputedStyle(h).visibility !== 'hidden' }).length
  const bgOf = (el) => {
    const layers = []
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e)
      if (s.backgroundImage !== 'none') return null
      const c = rgba(s.backgroundColor); if (c[3] > 0) { layers.push(c); if (c[3] >= 1) break }
    }
    let base = canvas.slice(); for (const c of layers.reverse()) base = over(c, base); return base
  }
  const textEls = scope.filter(ownText)
  const lowC = []
  for (const el of textEls) {
    if (el.closest('svg') || el.closest('[aria-hidden="true"]')) continue
    const s = getComputedStyle(el); const bg = bgOf(el); if (!bg) continue
    if (s.backgroundClip === 'text' || s.webkitTextFillColor === 'transparent' || s.webkitTextFillColor === 'rgba(0, 0, 0, 0)') continue
    const fg = rgba(s.color); const op = opacityOf(el)
    const c = ratio(over([fg[0], fg[1], fg[2], fg[3] * op], bg), bg)
    const px = parseFloat(s.fontSize) * scaleOf(el); const large = px >= 24 || (px >= 18.66 && +s.fontWeight >= 700)
    if (c < (large ? 3 : 4.5)) lowC.push({ el: tag(el), text: txt(el).slice(0, 24), ratio: +c.toFixed(2), px: Math.round(px), product: inProd(el) })
  }
  res.lowContrast = lowC
  const tgts = all.filter((e) => e.matches('a[href], button, input:not([type=hidden]), select, textarea, [role=button], summary'))
    .filter((e) => !e.closest('[inert], [aria-hidden="true"]') && !inProd(e) && getComputedStyle(e).pointerEvents !== 'none')
    .filter((e) => !(e.tagName === 'A' && e.closest('p, li') && getComputedStyle(e).display === 'inline'))
  const rects = tgts.map((e) => { const r = e.getBoundingClientRect(); return { e, r, cx: r.left + r.width / 2, cy: r.top + r.height / 2, small: Math.min(r.width, r.height) < 23.5 } })
  const dRect = (x, y, r) => Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom))
  res.smallTargets = rects.filter((a) => a.small).filter((a) => rects.some((b) => b !== a && !b.e.contains(a.e) && !a.e.contains(b.e) && (b.small ? Math.hypot(a.cx - b.cx, a.cy - b.cy) < 24 : dRect(a.cx, a.cy, b.r) < 12)))
    .map((a) => `${txt(a.e) || tag(a.e)} ${Math.round(a.r.width)}x${Math.round(a.r.height)}`)
  res.undersizedSpaced = rects.filter((a) => a.small).length - res.smallTargets.length

  // ---- edge & shadow ----
  const splitTop = (s) => { const o = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { o.push(cur.trim()); cur = '' } else cur += ch } if (cur.trim()) o.push(cur.trim()); return o }
  const parseShadow = (s) => {
    if (!s || s === 'none') return []
    return splitTop(s).map((L) => {
      const colM = L.match(/(rgba?|oklch|oklab|lab|lch|hsla?|color)\([^()]*\)|#[0-9a-f]{3,8}\b|\b(transparent|currentcolor|black|white)\b/i)
      const col = colM ? rgba(colM[0]) : [0, 0, 0, 1]
      const nums = L.replace(colM ? colM[0] : '', '').match(/-?[\d.]+px|\b0\b/g)?.map((n) => parseFloat(n)) || []
      const [x = 0, y = 0, blur = 0, spread = 0] = nums
      return { inset: /\binset\b/.test(L), x, y, blur, spread, a: col[3], col, raw: L }
    }).filter((l) => l.a > 0.004 && (l.x || l.y || l.blur || l.spread))
  }
  const norm = (ls) => ls.map((l) => `${l.inset ? 'inset ' : ''}${l.x} ${l.y} ${l.blur} ${l.spread} ${hex(l.col)}/${l.a.toFixed(2)}`).join(', ')
  const shadowsPage = new Map(), shadowsProd = new Map(), elevPage = new Map(), elevProd = new Map(); const doubles = [], ringInset = []
  const borderPx = (s) => Math.max(...['Top', 'Right', 'Bottom', 'Left'].map((k) => s[`border${k}Style`] !== 'none' && rgba(s[`border${k}Color`])[3] > 0.02 ? parseFloat(s[`border${k}Width`]) : 0))
  for (const el of scope) {
    const s = getComputedStyle(el); const ls = parseShadow(s.boxShadow); if (!ls.length) continue
    const key = norm(ls); const m = inProd(el) ? shadowsProd : shadowsPage; if (!m.has(key)) m.set(key, []); m.get(key).push(tag(el))
    // elevation = the blurred outset layers only (rings are edges, insets are material); controls carry their own material
    const drop = norm(ls.filter((l) => !l.inset && l.blur > 0))
    if (drop && !el.matches('button, a[href], [role=button], input, select, textarea')) { const e = inProd(el) ? elevProd : elevPage; if (!e.has(drop)) e.set(drop, []); e.get(drop).push(tag(el)) }
    const ring = ls.some((l) => !l.inset && !l.x && !l.y && !l.blur && l.spread > 0)
    const innerRing = ls.some((l) => l.inset && !l.x && !l.y && !l.blur && l.spread > 0)
    const insetHi = ls.some((l) => l.inset && (l.y || l.x) && l.blur <= 1.5)
    if ((ring || innerRing) && borderPx(s) >= 0.5) doubles.push(`${tag(el)} "${txt(el).slice(0, 18)}" border ${borderPx(s)}px + ${ring ? 'ring' : 'inner ring'}${inProd(el) ? ' (product)' : ''}`)
    if (ring && (insetHi || innerRing) && !el.matches('button, a[href], [role=button], input')) ringInset.push(`${tag(el)} "${txt(el).slice(0, 18)}"${inProd(el) ? ' (product)' : ''}`)
  }
  const top = (m) => [...m.entries()].sort((a, b) => b[1].length - a[1].length).map(([k, v]) => ({ shadow: k, count: v.length, sample: v[0] }))
  res.shadows = { page: top(shadowsPage), product: top(shadowsProd), elevPage: top(elevPage), elevProd: top(elevProd) }; res.doubleEdges = doubles; res.ringInset = ringInset

  // ---- radius ladder + nesting ----
  const boxes = []
  for (const el of scope) {
    const s = getComputedStyle(el); const r0 = parseFloat(s.borderTopLeftRadius); if (!(r0 > 0)) continue
    const edge = rgba(s.backgroundColor)[3] > 0.02 || s.backgroundImage !== 'none' || borderPx(s) >= 0.5 || parseShadow(s.boxShadow).length || (s.overflow !== 'visible' && el.querySelector('img, video, canvas, svg'))
    if (!edge) continue
    const r = el.getBoundingClientRect(); const k = scaleOf(el); if (r.width < 8 || r.height < 8) continue
    const rad = Math.min(r0 * k, Math.min(r.width, r.height) / 2)
    boxes.push({ el, w: r.width, h: r.height, rad, pill: rad >= Math.min(r.width, r.height) / 2 - 0.75, product: inProd(el), control: el.matches('button, a[href], [role=button], input, select, textarea') })
  }
  res.boxes = boxes.map((b) => ({ el: tag(b.el), text: txt(b.el).slice(0, 18), h: +b.h.toFixed(1), w: Math.round(b.w), rad: +b.rad.toFixed(1), pill: b.pill, product: b.product, control: b.control }))
  const nested = []
  for (const b of boxes) {
    if (b.pill) continue
    let p = null; for (let a = b.el.parentElement; a; a = a.parentElement) { const f = boxes.find((x) => x.el === a); if (f) { p = f; break } }
    if (p && !p.pill && b.rad > p.rad + 0.75) nested.push(`${tag(b.el)} r${b.rad.toFixed(1)} inside ${tag(p.el)} r${p.rad.toFixed(1)}`)
  }
  res.nestedRadius = nested

  // ---- type ----
  const fam = new Map(), sizes = new Map(), prodSizes = new Map(), weights = new Map()
  const mono = /mono|code|courier|menlo|consolas|monaco/i
  for (const el of textEls) {
    const s = getComputedStyle(el); const f = s.fontFamily.split(',')[0].replace(/["']/g, '').trim(); const p = inProd(el)
    if (!((p || cfg.appKind) && mono.test(f))) fam.set(f, (fam.get(f) || 0) + 1)
    const px = Math.round(parseFloat(s.fontSize) * scaleOf(el))  // whole px: scaled products make sub-pixel variants of one size
    ;(p ? prodSizes : sizes).set(px, ((p ? prodSizes : sizes).get(px) || 0) + 1)
    const w = +s.fontWeight; weights.set(w, (weights.get(w) || []).concat(p ? `${tag(el)}*` : tag(el)))
  }
  res.fonts = [...fam.entries()].sort((a, b) => b[1] - a[1])
  res.fontSizes = [...sizes.entries()].sort((a, b) => a[0] - b[0]); res.productFontSizes = [...prodSizes.entries()].sort((a, b) => a[0] - b[0])
  res.weights = [...weights.entries()].map(([w, l]) => [w, l.length, l]).sort((a, b) => a[0] - b[0])
  if (h1) {
    const s = getComputedStyle(h1), r = h1.getBoundingClientRect(), k = scaleOf(h1), fs = parseFloat(s.fontSize) * k
    const nLines = lineBoxes(h1).length
    const words = (h1.innerText || h1.textContent).trim().split(/\s+/).filter(Boolean)
    res.h1 = { text: (h1.innerText || h1.textContent).trim().replace(/\s+/g, ' ').slice(0, 120), px: fs, weight: +s.fontWeight, trackingEm: (parseFloat(s.letterSpacing) || 0) / parseFloat(s.fontSize), words: words.length, lines: nLines || Math.round(r.height / (parseFloat(s.lineHeight) * k || fs * 1.1)), family: s.fontFamily.split(',')[0].replace(/["']/g, ''), lh: s.lineHeight, top: r.top, bottom: r.bottom, left: r.left, right: r.right, fullStop: /[.]$/.test(h1.textContent.trim()), opsz: s.fontOpticalSizing, fvs: s.fontVariationSettings }
  }

  // ---- colour: accent hue families (OKLCH chroma > 0.06), composited over the canvas ----
  const acc = [], accP = []
  const addC = (c, el, area, where) => {
    if (!c || c[3] < 0.05) return; const comp = over(c, canvas); const o = oklch(comp)
    if (o.C > 0.06) (inProd(el) ? accP : acc).push({ h: o.h, C: o.C, area, el: tag(el), where, hex: hex(comp) })
  }
  const colourTokens = (s) => s.match(/(rgba?|oklch|oklab|lab|lch|hsla?|color)\([^()]*\)/gi) || []
  for (const el of scope) {
    if (el.closest('img, video, picture')) continue
    const s = getComputedStyle(el), r = el.getBoundingClientRect(), area = Math.min(r.width, W) * Math.min(r.height, H)
    if (ownText(el)) addC(rgba(s.color), el, Math.min(area, 2000), 'text')
    addC(rgba(s.backgroundColor), el, area, 'bg')
    if (s.backgroundImage !== 'none') for (const t of colourTokens(s.backgroundImage)) addC(rgba(t), el, area * 0.3, 'gradient')
    if (borderPx(s) >= 0.5) addC(rgba(s.borderTopColor), el, (r.width + r.height) * 2, 'border')
    if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) { if (s.fill && s.fill !== 'none' && !s.fill.startsWith('url')) addC(rgba(s.fill), el, area, 'svg'); if (s.stroke && s.stroke !== 'none' && !s.stroke.startsWith('url')) addC(rgba(s.stroke), el, (r.width + r.height), 'svg') }
  }
  const families = (list) => {
    const fams = []
    for (const a of list.sort((x, y) => x.h - y.h)) { const f = fams.find((x) => Math.min(Math.abs(x.h - a.h), 360 - Math.abs(x.h - a.h)) <= 25); if (f) { f.items.push(a); f.area += a.area } else fams.push({ h: a.h, items: [a], area: a.area }) }
    return fams.map((f) => ({ hue: Math.round(f.h), count: f.items.length, area: Math.round(f.area), maxC: +Math.max(...f.items.map((i) => i.C)).toFixed(3), sample: `${f.items[0].hex} ${f.items[0].where} ${f.items[0].el}` })).sort((a, b) => b.area - a.area)
  }
  res.accentFamilies = families(acc); res.productAccentFamilies = families(accP)

  // ---- buttons ----
  const navEl = [...document.querySelectorAll('header, nav, [role=banner]')].find((n) => { const r = n.getBoundingClientRect(); return r.width > W * 0.4 && r.top < 120 && r.height < 160 && r.height > 20 })
  const btnInfo = (el) => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect(), bg = rgba(s.backgroundColor)
    const filled = bg[3] > 0.6 || s.backgroundImage !== 'none'
    const edged = borderPx(s) >= 0.5 || parseShadow(s.boxShadow).some((l) => !l.blur && l.spread > 0)
    // a gradient fill reads as the average of its stops (Kite's dark "Book a demo" gradient is a secondary, its white one a primary)
    const stops = s.backgroundImage !== 'none' ? colourTokens(s.backgroundImage).map(rgba).filter((c) => c[3] > 0.05) : []
    const base = bg[3] > 0 ? over(bg, canvas) : canvas
    const solid = stops.length ? [0, 1, 2].map((i) => stops.reduce((a, c) => a + over(c, base)[i], 0) / stops.length) : filled ? base : canvas
    const strong = filled && ratio(solid, canvas) >= 2.2
    const firstChild = [...el.childNodes].find((n) => (n.nodeType === 3 && n.textContent.trim()) || n.nodeType === 1)
    const lead = firstChild && firstChild.nodeType === 1 && (firstChild.tagName.toLowerCase() === 'svg' || firstChild.querySelector?.('svg') && !firstChild.textContent.trim())
    const rad = Math.min(parseFloat(s.borderTopLeftRadius) * scaleOf(el), r.height / 2)
    return { el: tag(el), text: txt(el).slice(0, 24), h: +r.height.toFixed(1), w: Math.round(r.width), top: r.top, bottom: r.bottom, rad: +rad.toFixed(1), role: strong ? 'primary' : filled || edged ? 'secondary' : 'text', nav: !!navEl && navEl.contains(el), leadIcon: !!lead && !!txt(el),
      pill: rad >= r.height / 2 - 0.75, background: s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 120) : hex(over(bg, canvas)), shadow: norm(parseShadow(s.boxShadow)) || 'none',
      recipe: `r${rad >= r.height / 2 - 0.75 ? 'pill' : rad.toFixed(0)} h${Math.round(r.height)} bg ${s.backgroundImage !== 'none' ? 'img:' + s.backgroundImage.slice(0, 60) : hex(over(bg, canvas)) + '/' + bg[3].toFixed(2)} sh ${norm(parseShadow(s.boxShadow)) || 'none'}` }
  }
  const btnSel = 'button, [role=button], a[href], input[type=submit], input[type=button]'
  const btnFilter = (e) => { const r = e.getBoundingClientRect(); return r.height >= 24 && r.height <= 72 && r.width >= 40 && !e.closest('[inert], [aria-hidden="true"]') && !inProd(e) && !(e.tagName === 'A' && e.closest('p, li') && getComputedStyle(e).display === 'inline') && !e.parentElement?.closest(btnSel) }
  res.buttons = scope.filter((e) => e.matches(btnSel)).filter(btnFilter).map(btnInfo)
  if (cfg.wholePage) res.pageButtons = [...document.querySelectorAll(btnSel)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && getComputedStyle(e).visibility !== 'hidden' && opacityOf(e) > 0.05 }).filter(btnFilter).map(btnInfo)

  // ---- hero composition ----
  const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 0
  res.nav = navEl ? { el: tag(navEl), bottom: navBottom, height: navEl.getBoundingClientRect().height } : null
  if (h1) {
    const hr = h1.getBoundingClientRect()
    res.betweenNavAndH1 = all.filter((e) => {
      if (e.contains(h1) || (navEl && (navEl.contains(e) || e.contains(navEl))) || e.closest('[aria-hidden="true"]') && !ownText(e)) return false
      const r = e.getBoundingClientRect(); if (r.top < navBottom - 1 || r.bottom > hr.top + 2 || r.height <= 2 || r.width > W * 0.9) return false
      if (r.right < hr.left - 40 || r.left > hr.right + 40) return false
      const s = getComputedStyle(e)
      return ownText(e) || e.matches('img, svg, video, canvas, button, a, input') || (rgba(s.backgroundColor)[3] > 0.05 && r.width < W * 0.9) || borderPx(s) >= 0.5
    }).filter((e, _, arr) => !arr.some((o) => o !== e && o.contains(e))).slice(0, 6).map((e) => `${tag(e)} "${txt(e).slice(0, 24)}" y ${Math.round(e.getBoundingClientRect().top)}`)
    const sub = [...document.querySelectorAll('p')].find((p) => { const r = p.getBoundingClientRect(); return r.width > 0 && r.top > hr.bottom - 2 && r.top < hr.bottom + 120 && !inProd(p) })
    if (sub) {
      const ws = lineBoxes(sub); const sr = sub.getBoundingClientRect()
      res.subtitle = { text: sub.textContent.trim().slice(0, 80), lines: ws.length, widths: ws.map(Math.round), lastShare: ws.length > 1 ? +(ws[ws.length - 1] / ws[0]).toFixed(2) : 1, top: sr.top, bottom: sr.bottom, width: Math.round(sr.width) }
    }
    const prod = product
    if (prod) {
      const r = prod.getBoundingClientRect(); const tf = []
      for (let a = prod; a && a !== document.body; a = a.parentElement) { const t = getComputedStyle(a).transform; if (t && t !== 'none') tf.push(t) }
      const tilted = tf.some((t) => { const n = t.match(/-?[\d.e]+/g).map(Number); if (t.startsWith('matrix3d')) return Math.abs(n[1]) > 1e-3 || Math.abs(n[2]) > 1e-3 || Math.abs(n[4]) > 1e-3 || Math.abs(n[6]) > 1e-3 || Math.abs(n[3]) > 1e-6 || Math.abs(n[7]) > 1e-6; return Math.abs(n[1]) > 1e-3 || Math.abs(n[2]) > 1e-3 })
      res.product = { tagged: !!tagged, el: tag(prod), top: r.top, left: r.left, width: r.width, share: +(Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)) * Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)) / (W * H)).toFixed(3), tilted, transforms: tf.slice(0, 3) }
    }
  }

  // ---- fingerprint pieces (ledger.mjs axes) ----
  const widths = all.filter((e) => ['MAIN', 'SECTION', 'DIV'].includes(e.tagName)).map((e) => Math.round(e.getBoundingClientRect().width)).filter((w) => w > 600 && w < innerWidth - 8)
  res.contentWidth = widths.length ? +Object.entries(widths.reduce((m, w) => (m[w] = (m[w] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1])[0][0] : null
  const secs = [...document.querySelectorAll('section')].filter((e) => e.getBoundingClientRect().height > 0).map((e) => parseFloat(getComputedStyle(e).paddingTop)).filter((n) => n > 0)
  res.sectionPad = secs.length ? secs.sort((a, b) => a - b)[Math.floor(secs.length / 2)] : null
  res.sectionCount = document.querySelectorAll('section').length
  res.navNumbered = [...document.querySelectorAll('header a, nav a')].some((a) => /^\s*0\d/.test(a.textContent))
  res.scrollHeight = document.documentElement.scrollHeight
  res.videos = [...document.querySelectorAll('video')].map((v) => { const r = v.getBoundingClientRect(); return { src: (v.currentSrc || v.querySelector('source')?.src || '').split('/').pop(), inFold: r.bottom > 0 && r.top < H && r.width > 0, playing: !v.paused } })
  const bodyP = [...document.querySelectorAll('p, li')].filter((e) => e.getBoundingClientRect().width > 0 && e.textContent.trim().length > 90).map((e) => parseFloat(getComputedStyle(e).fontSize)).sort((a, b) => a - b)
  res.bodyPx = bodyP.length ? bodyP[Math.floor(bodyP.length / 2)] : null
  // ---- centring (founder 2026-10-22: "you miss that always centering"): content of every control, pill, chip, badge and
  // avatar must sit centred in its box. Content box = union of text Range rects (font content area) + svg/img boxes.
  // Vertical: always. Horizontal: when the box intends centring (justify/text-align centre, icon-only, square/circle).
  // Clipped: content spilling outside an overflow-hidden box (the clipped avatar initials). ----
  const cands = all.filter((el) => {
    if (el.closest('[inert], [aria-hidden="true"]') || el.matches('input, textarea, select, svg *, [role=switch], [role=slider], [aria-checked]')) return false // switches/sliders place their knob by state, not centred
    const r = el.getBoundingClientRect(); if (!(r.width > 0 && r.top < H && r.bottom > 0 && r.height >= 12 && r.height <= 64 && r.width <= 420)) return false
    const st = getComputedStyle(el), bgA = rgba(st.backgroundColor)[3], ring = parseShadow(st.boxShadow).some((l) => !l.blur && l.spread > 0) || borderPx(st) >= 0.5
    const boxed = bgA > 0.04 || st.backgroundImage !== 'none' || ring
    return boxed && (el.matches('button, a, [role=button], [role=tab]') || parseFloat(st.borderTopLeftRadius) >= 3)
  })
  const off = [], offX = [], clipped = []
  for (const el of cands) {
    const r = el.getBoundingClientRect(), st = getComputedStyle(el)
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, n = 0, onlyIcon = true
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      if (!t.textContent.trim() || t.parentElement.closest('svg')) continue
      const rg = document.createRange(); rg.selectNodeContents(t)
      for (const q of rg.getClientRects()) if (q.width > 0) { x0 = Math.min(x0, q.left); y0 = Math.min(y0, q.top); x1 = Math.max(x1, q.right); y1 = Math.max(y1, q.bottom); n++; onlyIcon = false }
    }
    // small solid dots/swatches (status dots, legend marks) count as content
    for (const g of el.querySelectorAll('*')) { if (g.children.length || g.closest('svg')) continue; const q = g.getBoundingClientRect(), gs = getComputedStyle(g); if (q.width > 0 && q.width <= 12 && q.height <= 12 && rgba(gs.backgroundColor)[3] > 0.3) { x0 = Math.min(x0, q.left); y0 = Math.min(y0, q.top); x1 = Math.max(x1, q.right); y1 = Math.max(y1, q.bottom); n++ } }
    for (const g of el.querySelectorAll('svg, img')) { if (g.parentElement.closest('svg')) continue; const q = g.getBoundingClientRect(); if (q.width > 0 && q.width < r.width + 1) { x0 = Math.min(x0, q.left); y0 = Math.min(y0, q.top); x1 = Math.max(x1, q.right); y1 = Math.max(y1, q.bottom); n++ } }
    if (!n) continue
    // nested boxed children own their own centring: skip parents whose content is mostly another candidate
    if (cands.some((c) => c !== el && el.contains(c))) continue // a box holding other checked boxes is a container, not a control
    const dy = (y0 + y1) / 2 - (r.top + r.height / 2), dx = (x0 + x1) / 2 - (r.left + r.width / 2)
    const name = `${tag(el)} "${txt(el).slice(0, 16)}" h${Math.round(r.height)}`
    const grid = st.display.includes('grid'), flex = st.display.includes('flex'), col = flex && st.flexDirection.startsWith('column')
    // multi-line blocks laid out top-down (event cards, list items) are top-aligned on purpose: judge them only when they ask for centring
    const wantY = !col || st.justifyContent === 'center'
    const wantX = onlyIcon || (flex && !col && st.justifyContent === 'center') || (col && st.alignItems === 'center') || (grid && (st.justifyItems.includes('center') || st.justifyContent === 'center')) || (!flex && !grid && st.textAlign === 'center') || Math.abs(r.width - r.height) < 2
    if (wantY && Math.abs(dy) > 1.01) off.push(`${name} dy ${dy.toFixed(1)}px`)
    if (wantX && Math.abs(dx) > 1.01) offX.push(`${name} dx ${dx.toFixed(1)}px`)
    // ellipsis truncation reports the full text width: judge clipping horizontally only where nothing truncates on purpose
    const ellip = [el, ...el.querySelectorAll('*')].some((d) => getComputedStyle(d).textOverflow === 'ellipsis')
    if (st.overflow !== 'visible' && ((!ellip && (x0 < r.left - 0.5 || x1 > r.right + 0.5)) || y0 < r.top - 0.5 || y1 > r.bottom + 0.5)) clipped.push(name)
  }
  res.centring = { checked: cands.length, off, offX, clipped }
  return res
}

// ---- pixel census of a PNG (in-page canvas, no native deps) ----
const pixels = async (page, file, { W, H }) => page.evaluate(async ({ data, W, H }) => {
  const img = new Image(); img.src = data; await img.decode()
  const c = new OffscreenCanvas(W, H); const g = c.getContext('2d'); g.drawImage(img, 0, 0, W, H); const d = g.getImageData(0, 0, W, H).data
  const lin = (x) => { x /= 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4 }
  const ok = (r, gg, b) => { const R = lin(r), G = lin(gg), B = lin(b); const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s; return { L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, C: Math.hypot(A, Bb) } }
  const modes = new Map(); let n = 0, colourful = 0
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
    const i = (y * W + x) * 4, r = d[i], gg = d[i + 1], b = d[i + 2]; n++
    const k = (r >> 2) << 12 | (gg >> 2) << 6 | (b >> 2); modes.set(k, (modes.get(k) || 0) + 1)
    if (ok(r, gg, b).C > 0.08) colourful++
  }
  const [mk, mc] = [...modes.entries()].sort((a, b) => b[1] - a[1])[0]
  const rgb = [(mk >> 12) * 4 + 2, ((mk >> 6) & 63) * 4 + 2, (mk & 63) * 4 + 2], o = ok(...rgb)
  return { canvasHex: '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join(''), canvasChroma: +o.C.toFixed(4), canvasL: +o.L.toFixed(3), canvasShare: +(mc / n).toFixed(3), colourfulShare: +(colourful / n).toFixed(4) }
}, { data: 'data:image/png;base64,' + fs.readFileSync(file).toString('base64'), W, H })
const diffShots = async (page, a, b, { W, H }) => page.evaluate(async ({ a, b, W, H }) => {
  const load = async (s) => { const i = new Image(); i.src = s; await i.decode(); const c = new OffscreenCanvas(W, H); const g = c.getContext('2d'); g.drawImage(i, 0, 0, W, H); return g.getImageData(0, 0, W, H).data }
  const A = await load(a), B = await load(b); let n = 0, ch = 0
  for (let i = 0; i < A.length; i += 16) { n++; if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 24) ch++ }
  return +(ch / n).toFixed(4)
}, { a: 'data:image/png;base64,' + a.toString('base64'), b: 'data:image/png;base64,' + b.toString('base64'), W, H })

// ---- crop & fade probe (knowledge/founder/canon/designers-eye.md DE-01, DE-07; founder 2026-10-22: "develop a designer's
// eye for random clipping and half-visible things"). Works on TEXT LINES (Range client rects), because a visual bleeding
// off the frame is a decision while a word cut by an edge or a fade is an accident.
//  - crossing: a text line partly outside the viewport's left/right/top edge or a clipping ancestor's box (overflow not
//    visible). Visible share between 2% and 98% counts; the fold bottom is exempt (products are meant to run off it),
//    and lines fully hidden (< 2%) are ignored (scrollers, carousels).
//  - half-faded: a text line under a mask-image ancestor whose effective mask alpha, measured from three screenshots
//    (as is, mask removed, layer hidden: alpha = |as-is - hidden| / |unmasked - hidden| over ink pixels), either changes
//    by > 0.35 across the line (a fade edge runs through the words) or averages 0.12-0.6 (the line is visibly half there).
//    A gentle fold fade (Tempra h4a: alpha 1 -> 0.7 across 55px) varies < 0.1 per line and passes.
const cropProbe = async (page, { W, H }) => {
  const info = await page.evaluate(({ W, H }) => {
    const tag = (el) => `${el.tagName.toLowerCase()}${typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : ''}`.slice(0, 40)
    const masked = [], crossing = [], lines = []
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    let n
    while ((n = tw.nextNode())) {
      const txt = n.textContent.replace(/\s+/g, ' ').trim(); if (!txt) continue
      const el = n.parentElement; if (!el) continue
      const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue
      let op = 1; for (let a = el; a; a = a.parentElement) op *= +getComputedStyle(a).opacity; if (op < 0.05) continue
      const rg = document.createRange(); rg.selectNodeContents(n)
      for (const r of rg.getClientRects()) {
        if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= H || r.right <= 0 || r.left >= W) continue
        let L = Math.max(r.left, 0), R = Math.min(r.right, W), T = Math.max(r.top, 0), B = r.bottom
        const edges = []
        if (r.left < -0.5) edges.push('viewport-left'); if (r.right > W + 0.5) edges.push('viewport-right'); if (r.top < -0.5) edges.push('viewport-top')
        let mk = null
        for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
          const s = getComputedStyle(a)
          if (!mk && ((s.maskImage && s.maskImage !== 'none') || (s.webkitMaskImage && s.webkitMaskImage !== 'none'))) mk = a
          if (a === el && s.overflow === 'visible') continue
          const ox = s.overflowX !== 'visible', oy = s.overflowY !== 'visible'
          if (!ox && !oy) continue
          const b = a.getBoundingClientRect()
          // an ellipsis truncation is a deliberate cut: clip it, do not report it
          if (ox) { if (s.textOverflow !== 'ellipsis') { if (r.left < b.left - 0.5) edges.push(`${tag(a)} left`); if (r.right > b.right + 0.5) edges.push(`${tag(a)} right`) } L = Math.max(L, b.left); R = Math.min(R, b.right) }
          if (oy) { if (r.top < b.top - 0.5) edges.push(`${tag(a)} top`); if (r.bottom > b.bottom + 0.5 && b.bottom < H - 0.5) edges.push(`${tag(a)} bottom`); T = Math.max(T, b.top); if (b.bottom < H - 0.5) B = Math.min(B, b.bottom) }
        }
        const share = Math.max(0, R - L) * Math.max(0, B - T) / (r.width * r.height)
        const line = { text: txt.slice(0, 28), x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }
        if (share > 0.02 && share < 0.98 && edges.length) crossing.push({ ...line, share: +share.toFixed(2), edge: edges[0] })
        if (mk && share > 0.02) {
          let k = masked.indexOf(mk); if (k < 0) { masked.push(mk); k = masked.length - 1 }
          lines.push({ ...line, k, x: Math.max(0, line.x), w: Math.min(W, r.right) - Math.max(0, r.left), h: Math.min(H, r.bottom) - Math.max(0, r.top), y: Math.max(0, line.y) })
        }
      }
    }
    masked.forEach((m, i) => m.setAttribute('data-gate-mask', String(i)))
    return { crossing, lines, nMasked: masked.length }
  }, { W, H })
  const faded = []
  for (let k = 0; k < Math.min(info.nMasked, 8); k++) {
    const ls = info.lines.filter((l) => l.k === k && l.w > 2 && l.h > 2); if (!ls.length) continue
    const sel = `[data-gate-mask="${k}"]`
    const shot = async () => (await page.screenshot({ scale: 'css' })).toString('base64')
    const A = await shot()
    const saved = await page.evaluate((sel) => { const e = document.querySelector(sel); const o = [e.style.maskImage, e.style.webkitMaskImage, e.style.opacity]; e.style.maskImage = 'none'; e.style.webkitMaskImage = 'none'; return o }, sel)
    const Bs = await shot()
    await page.evaluate((sel) => { document.querySelector(sel).style.opacity = '0' }, sel)
    const Cs = await shot()
    await page.evaluate(({ sel, saved }) => { const e = document.querySelector(sel); [e.style.maskImage, e.style.webkitMaskImage, e.style.opacity] = saved }, { sel, saved })
    const res = await page.evaluate(async ({ A, Bs, Cs, ls, W, H }) => {
      const load = async (s) => { const i = new Image(); i.src = 'data:image/png;base64,' + s; await i.decode(); const c = new OffscreenCanvas(W, H); const g = c.getContext('2d'); g.drawImage(i, 0, 0, W, H); return g.getImageData(0, 0, W, H).data }
      const a = await load(A), b = await load(Bs), c = await load(Cs)
      return ls.map((l) => {
        const rows = []
        for (let y = Math.floor(l.y); y < Math.min(H, Math.ceil(l.y + l.h)); y++) {
          const al = []
          for (let x = Math.floor(l.x); x < Math.min(W, Math.ceil(l.x + l.w)); x++) {
            const i = (y * W + x) * 4; let num = 0, den = 0
            for (let ch = 0; ch < 3; ch++) { num += Math.abs(a[i + ch] - c[i + ch]); den += Math.abs(b[i + ch] - c[i + ch]) }
            if (den > 60) al.push(Math.min(1, num / den))
          }
          if (al.length >= 2) rows.push(al.reduce((s, v) => s + v, 0) / al.length)
        }
        if (rows.length < 2) return null
        const mean = rows.reduce((s, v) => s + v, 0) / rows.length
        return { ...l, min: +Math.min(...rows).toFixed(2), max: +Math.max(...rows).toFixed(2), mean: +mean.toFixed(2) }
      }).filter(Boolean)
    }, { A, Bs, Cs, ls, W, H })
    for (const r of res) if (r.max - r.min > 0.35 || (r.mean > 0.12 && r.mean < 0.6)) faded.push(r)
  }
  await page.evaluate(() => document.querySelectorAll('[data-gate-mask]').forEach((e) => e.removeAttribute('data-gate-mask')))
  return { crossing: info.crossing, faded, maskedLines: info.lines.length }
}

// ================= run =================
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch((e) => console.error('goto:', e.message))
await page.waitForTimeout(WAIT)
await page.evaluate(() => document.fonts.ready).catch(() => {})

// motion probe before anything is finished: running animations in the fold, videos, and a pixel diff 800ms apart
const motion = await page.evaluate((H) => {
  const run = document.getAnimations().filter((a) => a.playState === 'running').map((a) => {
    const t = a.effect?.target; const r = t?.getBoundingClientRect?.(); const timing = a.effect?.getComputedTiming?.() || {}
    return { name: a.animationName || a.transitionProperty || a.constructor.name, target: t ? (t.tagName.toLowerCase() + (typeof t.className === 'string' && t.className ? '.' + t.className.split(' ')[0] : '')).slice(0, 40) : '-', inFold: !!r && r.bottom > 0 && r.top < H && r.width > 0, infinite: timing.iterations === Infinity }
  })
  return { running: run.filter((a) => a.inFold) }
}, H)
const s1 = await page.screenshot({ scale: 'css' }); await page.waitForTimeout(800); const s2 = await page.screenshot({ scale: 'css' })
motion.pixelChange = await diffShots(page, s1, s2, { W, H })
// settle finite entrance animations so the census reads end states
await page.evaluate(async () => { document.getAnimations().forEach((a) => { try { if (a.effect.getComputedTiming().iterations !== Infinity) a.finish() } catch {} }); await new Promise((r) => setTimeout(r, 150)) })
const foldPng = path.join(out, 'gate-fold.png'), cssPng = path.join(out, 'gate-fold-1x.png')
await page.screenshot({ path: cssPng, scale: 'css', timeout: 60000 })
// a 2x capture of a busy WebGL/rAF page can stall in swiftshader: fall back to the 1x capture rather than crash
await page.screenshot({ path: foldPng, timeout: 45000 }).catch((e) => { console.error(`2x fold capture failed (${e.message.split('\n')[0]}); using the 1x capture`); fs.copyFileSync(cssPng, foldPng) })
const cfgBase = { W, H, guessProduct: isHero || isSite, appKind: kind === 'product-ui' || kind === 'client-app' }
const m = await page.evaluate(census, { ...cfgBase, wholePage: false })
const px = await pixels(page, cssPng, { W, H })
const crop = await cropProbe(page, { W, H })
let fullPng = null, site = null, mobile = null
if (isSite) {
  await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 140)) } scrollTo(0, 0); await new Promise((r) => setTimeout(r, 400)); document.getAnimations().forEach((a) => { try { if (a.effect.getComputedTiming().iterations !== Infinity) a.finish() } catch {} }) })
  site = await page.evaluate(census, { ...cfgBase, wholePage: true })
  fullPng = path.join(out, 'gate-full.png'); await page.screenshot({ path: fullPng, fullPage: true, scale: 'css', timeout: 120000 }).catch(() => { fullPng = null })
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  const mp = await mctx.newPage(); await mp.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await mp.waitForTimeout(WAIT)
  await mp.evaluate(() => document.getAnimations().forEach((a) => { try { if (a.effect.getComputedTiming().iterations !== Infinity) a.finish() } catch {} }))
  const mPng = path.join(out, 'gate-mobile-fold.png'); await mp.screenshot({ path: mPng })
  mobile = { ...(await mp.evaluate(census, { ...cfgBase, W: 390, H: 844, wholePage: false })), shot: mPng }
  await mctx.close()
}
if (!fullPng) fullPng = foldPng // single-fold kinds: the fold is the artefact (full-website/audit capture the whole page)
await browser.close()

// ================= checks =================
const C = []
const add = (census, id, status, value, want, detail = '') => C.push({ census, id, status, value: typeof value === 'number' ? +value.toFixed(3) : value, want, detail: Array.isArray(detail) ? detail.join('; ') : String(detail) })
const ok = (b) => (b ? 'PASS' : 'FAIL')
const okW = (b) => (b ? 'PASS' : 'WARN')
const srcOf = (k, s) => (pick(k, s).src === 'canon' ? ' [canon]' : '')

// correctness
add('correctness', 'overflow.x', ok(m.overflowPx <= 0), `${m.overflowPx}px`, '0px horizontal overflow', m.overflowers)
const needsH1 = isHero || isSite
add('correctness', 'h1.count', needsH1 ? ok(m.h1Count === 1) : ok(m.h1Count <= 1), m.h1Count, needsH1 ? 'exactly 1' : '0-1 (a section, post or app view needs no h1, never two)')
const lcPage = m.lowContrast.filter((x) => !x.product), lcProd = m.lowContrast.filter((x) => x.product)
add('correctness', 'contrast.page', ok(!lcPage.length), lcPage.length, 'text >= 4.5:1 (>= 3:1 at 24px+), outside the product', lcPage.slice(0, 6).map((x) => `${x.el} "${x.text}" ${x.ratio}:1 ${x.px}px`))
add('correctness', 'contrast.product', okW(!lcProd.length), lcProd.length, 'product text >= 4.5:1 (WARN: the product is a picture, but it must still read)', lcProd.slice(0, 6).map((x) => `${x.el} "${x.text}" ${x.ratio}:1 ${x.px}px`))
add('correctness', 'targets.24px', ok(!m.smallTargets.length), m.smallTargets.length, 'controls >= 24px, or spaced per WCAG 2.5.8', `${m.smallTargets.slice(0, 6).join('; ')}${m.undersizedSpaced ? ` (${m.undersizedSpaced} undersized but spaced: ok)` : ''}`)
if (mobile) {
  add('correctness', 'mobile.overflow.x', ok(mobile.overflowPx <= 0), `${mobile.overflowPx}px`, '0px at 390px', mobile.overflowers)
  add('correctness', 'mobile.targets.24px', ok(!mobile.smallTargets.length), mobile.smallTargets.length, 'controls >= 24px at 390px (44px preferred)', mobile.smallTargets.slice(0, 6))
  const mlc = mobile.lowContrast.filter((x) => !x.product)
  add('correctness', 'mobile.contrast.page', ok(!mlc.length), mlc.length, 'AA at 390px', mlc.slice(0, 4).map((x) => `${x.el} "${x.text}" ${x.ratio}:1`))
}

// edge & shadow
const maxSh = val('maxShadowStrings')
add('edge', 'shadow.levels', ok(m.shadows.elevPage.length <= maxSh), m.shadows.elevPage.length, `<= ${maxSh} distinct elevation shadows (blurred outset layers of non-control boxes) in the fold outside the product${srcOf('maxShadowStrings')}`, m.shadows.elevPage.slice(0, 6).map((s) => `${s.shadow} x${s.count} (${s.sample})`))
add('edge', 'shadow.levels.product', okW(m.shadows.elevProd.length <= maxSh + 1), m.shadows.elevProd.length, `<= ${maxSh + 1} elevation shadows inside the product (one grey scale, L199)`, m.shadows.elevProd.slice(0, 6).map((s) => `${s.shadow} x${s.count} (${s.sample})`))
add('edge', 'shadow.strings', 'INFO', `${m.shadows.page.length} page, ${m.shadows.product.length} product`, 'distinct full box-shadow strings (rings, insets and control materials included)', m.shadows.page.slice(0, 8).map((s) => `${s.shadow} x${s.count} (${s.sample})`))
add('edge', 'edge.border+ring', ok(!m.doubleEdges.length), m.doubleEdges.length, 'no element with both a 1px border and a ring shadow (one edge per box, BN / L199)', m.doubleEdges.slice(0, 6))
add('edge', 'edge.ring+inset', okW(!m.ringInset.length), m.ringInset.length, 'no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt', m.ringInset.slice(0, 6))

// radius ladder
const ladder = val('radiusLadder')
const bandOf = (h) => Object.entries(ladder).find(([k]) => { const [a, b] = k.split('-').map(Number); return h >= a - 0.25 && h < b - 0.25 })  // [a, b): a 32px control is in "32-40"
const offBoxes = [], offCtl = []
for (const b of m.boxes) {
  if (b.pill) continue
  const band = bandOf(b.h); if (!band) continue
  if (!inR(b.rad, band[1])) (b.control && !b.product ? offCtl : offBoxes).push(`${b.el} "${b.text}" h${b.h} r${b.rad} (band ${band[0]}: ${band[1].join('-')})${b.product ? ' [product]' : ''}`)
}
add('radius', 'radius.ladder.controls', ok(!offCtl.length), offCtl.length, `page controls sit in their height band${srcOf('radiusLadder')}; pills/circles exempt`, offCtl.slice(0, 6))
// founder cadence-glass r1 "roudness": off-ladder boxes FAIL when more than a quarter of the fold's boxes miss their band
// share is judged on the page's own boxes; boxes inside the product follow the product canon and are reported apart
const pageBoxes = m.boxes.filter((b) => !b.pill && !b.product), offPage = offBoxes.filter((t) => !t.endsWith('[product]')), offProd = offBoxes.filter((t) => t.endsWith('[product]'))
const boxTotal = pageBoxes.length, boxShare = boxTotal ? offPage.length / boxTotal : 0
if (offProd.length) add('radius', 'radius.ladder.product', 'WARN', `${offProd.length}`, 'boxes inside [data-product] off the hero ladder (judge them with --kind product-ui)', offProd.slice(0, 6))
add('radius', 'radius.ladder.boxes', boxShare > 0.25 ? 'FAIL' : okW(!offPage.length), `${offPage.length}/${boxTotal}`, `boxes sit in their height band ${JSON.stringify(ladder)}`, offBoxes.slice(0, 6))
add('radius', 'radius.nested', okW(!m.nestedRadius.length), m.nestedRadius.length, 'a child radius never exceeds its parent (concentric: inner = outer - inset)', m.nestedRadius.slice(0, 6))

// type
const maxFam = val('maxFontFamilies')
add('type', 'type.families', ok(m.fonts.length <= maxFam), m.fonts.length, `<= ${maxFam} families in the fold (mono ignored inside [data-product]${kind === 'product-ui' || kind === 'client-app' ? ' and across app kinds' : ''})${srcOf('maxFontFamilies')}`, m.fonts.map(([f, n]) => `${f}(${n})`))
const maxSz = val('maxFontSizes')
const prodSizes = m.hasProduct && m.productFontSizes.length > 0, sizeSet = prodSizes ? m.productFontSizes : m.fontSizes
add('type', prodSizes ? 'type.sizes.product' : 'type.sizes', ok(sizeSet.length <= maxSz), sizeSet.length, `<= ${maxSz} distinct sizes ${prodSizes ? 'inside the product view' : 'in the fold'}${srcOf('maxFontSizes')}`, sizeSet.map(([s, n]) => `${s}(${n})`))
if (prodSizes) add('type', 'type.sizes.page', 'INFO', m.fontSizes.length, 'distinct sizes outside the product', m.fontSizes.map(([s, n]) => `${s}(${n})`))
const allowedW = val('weights')
const badW = m.weights.filter(([w]) => !allowedW.includes(w)).map(([w, , list]) => [w, list.filter((e) => !e.endsWith('*')), list.filter((e) => e.endsWith('*'))])
const badPage = badW.filter(([, p]) => p.length), badProd = badW.filter(([, , q]) => q.length)
add('type', 'type.weights', pick('weights').src === 'canon' ? ok(!badPage.length) : okW(!badPage.length), m.weights.map(([w, n]) => `${w}x${n}`).join(' '), `weights in {${allowedW.join(',')}} outside the product${srcOf('weights')}`, badPage.map(([w, p]) => `${w} x${p.length} (${p[0]})`))
if (m.hasProduct) add('type', 'type.weights.product', okW(!badProd.length), badProd.length, `product weights in {${allowedW.join(',')}} (WARN: product UI type has its own canon)`, badProd.map(([w, , q]) => `${w} x${q.length} (${q[0].slice(0, -1)})`))
if (m.h1) {
  const h = m.h1, hc = { sizePx: val('h1', 'sizePx'), weight: val('h1', 'weight'), trackingEm: val('h1', 'trackingEm'), maxWords: val('h1', 'maxWords'), maxLines: val('h1', 'maxLines') }
  const st = (b) => (isHero ? ok(b) : b ? 'PASS' : 'INFO')
  // h1 size: +-0.25px tolerance for line-metric rounding
  add('type', 'h1.size', st(inR(h.px, hc.sizePx && [hc.sizePx[0] - 0.25, hc.sizePx[1] + 0.25])), `${h.px.toFixed(1)}px`, `${hc.sizePx?.join('-')}px${srcOf('h1', 'sizePx')}`, `${h.family} "${h.text.slice(0, 50)}"`)
  add('type', 'h1.weight', st(inR(h.weight, hc.weight)), h.weight, `${hc.weight?.join('-')}${srcOf('h1', 'weight')}`)
  add('type', 'h1.tracking', st(inR(h.trackingEm, hc.trackingEm)), `${h.trackingEm.toFixed(3)}em`, `${hc.trackingEm?.join(' to ')}em${srcOf('h1', 'trackingEm')}`)
  add('type', 'h1.words', st(h.words <= hc.maxWords), h.words, `<= ${hc.maxWords} words${srcOf('h1', 'maxWords')}`)
  add('type', 'h1.lines', st(h.lines <= hc.maxLines), h.lines, `<= ${hc.maxLines} lines${srcOf('h1', 'maxLines')}`)
  if (isHero) add('type', 'h1.full-stop', ok(!h.fullStop), h.fullStop ? 'ends with .' : 'none', 'hero headlines have no full stop (L98)')
  if (/inter/i.test(h.family) && h.px >= 40) add('type', 'h1.inter-opsz', okW(h.opsz !== 'none'), h.opsz, 'big Inter is the display cut: opsz axis + font-optical-sizing auto (L452; the file import cannot be seen from computed style)')
} else if (needsH1) add('type', 'h1.present', 'FAIL', 'none', 'one visible h1')

// colour
const maxHue = val('maxAccentHues')
// status hues (red/pink, amber, green) carry meaning (deltas, errors, success) and are reported apart, unless one of them is
// the brand accent (the largest non-status family wins; if every family is a status hue, the largest one is the brand)
const isStatus = (h) => h <= 45 || h >= 345 || (h >= 60 && h <= 100) || (h >= 125 && h <= 170)
const famCount = m.accentFamilies.filter((f) => f.count >= 2 || f.area >= 400)
const brand = famCount.find((f) => !isStatus(f.hue)) || famCount[0]
const accents = famCount.filter((f) => f === brand || !isStatus(f.hue)), status = famCount.filter((f) => !accents.includes(f))
const fmtF = (f) => `h${f.hue} x${f.count} area ${f.area} C${f.maxC} (${f.sample})`
add('colour', 'colour.accent-hues', ok(accents.length <= maxHue), accents.length, `<= ${maxHue} accent hue families ${m.hasProduct ? 'outside the product ' : ''}(OKLCH C > 0.06, 25deg clusters, >= 2 uses or >= 400px2; status red/amber/green apart)${srcOf('maxAccentHues')}`, accents.map(fmtF))
if (m.hasProduct) {
  // categorical data colours (tags, avatars, series) live in the product: Quorum (accepted) carries 4 + status
  const pf = m.productAccentFamilies.filter((f) => f.count >= 2 || f.area >= 400), pAcc = pf.filter((f) => !isStatus(f.hue))
  add('colour', 'colour.accent-hues.product', okW(pAcc.length <= maxHue + 2), pAcc.length, `<= ${maxHue + 2} non-status hue families inside the product (tags and series are categorical)`, pf.map(fmtF))
}
add('colour', 'colour.status-hues', status.length <= 3 ? 'INFO' : 'WARN', status.length, 'semantic status hue families (red/amber/green) used for deltas and states', status.map(fmtF))
const maxCh = val('canvas', 'maxChroma')
const gateCanvas = dark || pick('canvas', 'maxChroma').src === 'canon'
add('colour', 'colour.canvas-chroma', gateCanvas ? ok(px.canvasChroma <= maxCh) : 'INFO', px.canvasChroma, gateCanvas ? `canvas (mode colour of the fold) OKLCH chroma <= ${maxCh}${srcOf('canvas', 'maxChroma')}` : 'canvas chroma (gated on dark kinds, or when the canon sets canvas.maxChroma)', `mode colour ${px.canvasHex} covers ${Math.round(px.canvasShare * 100)}% of the fold, L ${px.canvasL}`)
const maxCol = val('maxColourfulPixelShare')
add('colour', 'colour.colourful-pixels', dark && maxCol != null ? ok(px.colourfulShare <= maxCol) : 'INFO', `${(px.colourfulShare * 100).toFixed(2)}%`, dark && maxCol != null ? `<= ${(maxCol * 100).toFixed(1)}% of fold pixels with OKLCH C > 0.08${srcOf('maxColourfulPixelShare')}` : 'share of colourful pixels (gated on dark kinds)')

// button grammar
const ctaCfg = { heightPx: val('cta', 'heightPx'), radiusPx: val('cta', 'radiusPx'), maxPrimary: val('cta', 'maxPrimary'), minPrimary: canon?.cta?.minPrimary }
const census_buttons = (list, label, regionTest = () => true) => {
  const prim = list.filter((b) => b.role === 'primary' && !b.nav && regionTest(b))
  const recipes = [...new Set(prim.map((b) => b.recipe))]
  add('buttons', `${label}.primary-recipe`, ok(recipes.length <= 1), recipes.length, 'every primary CTA shares one computed recipe (radius, height, background, shadow)', recipes.slice(0, 4).map((r) => `${r} (${prim.find((b) => b.recipe === r).text})`))
  return prim
}
// centring census runs for every kind
add('align', 'align.vertical-centre', ok(!m.centring.off.length), `${m.centring.off.length}/${m.centring.checked}`, 'content of every control, pill, chip, badge and avatar sits vertically centred (<= 1px)', m.centring.off.slice(0, 8))
add('align', 'align.horizontal-centre', ok(!m.centring.offX.length), `${m.centring.offX.length}/${m.centring.checked}`, 'centred boxes (icon-only, square, circle, justify/text-align centre) centre their content horizontally (<= 1px)', m.centring.offX.slice(0, 8))
add('align', 'align.clipped', ok(!m.centring.clipped.length), m.centring.clipped.length, 'no content clipped by its own box (initials, labels)', m.centring.clipped.slice(0, 8))
add('align', 'crop.text-crossing', ok(!crop.crossing.length), crop.crossing.length, 'no text line crosses a crop edge (viewport left/right/top, or a clipping box); the fold bottom is exempt (designers-eye DE-07)', crop.crossing.slice(0, 8).map((c) => `"${c.text}" ${Math.round(c.share * 100)}% visible at ${c.edge} (${c.x},${c.y})`))
add('align', 'crop.text-half-faded', ok(!crop.faded.length), `${crop.faded.length}/${crop.maskedLines}`, 'no text line half-faded by a mask: alpha varies < 0.35 across the line and its mean is not 0.12-0.6 (designers-eye DE-01)', crop.faded.slice(0, 8).map((f) => `"${f.text}" alpha ${f.min}-${f.max} mean ${f.mean} at (${f.x},${f.y})`))
const foldPrim = census_buttons(m.buttons, 'fold')
if (site?.pageButtons) census_buttons(site.pageButtons, 'page')
const navPrim = m.buttons.filter((b) => b.role === 'primary' && b.nav)
if (navPrim.length && foldPrim.length) add('buttons', 'nav-vs-hero', foldPrim.some((b) => navPrim.some((n) => n.recipe === b.recipe)) ? 'WARN' : 'PASS', `${navPrim.length} nav primary`, 'the nav CTA must not repeat the hero CTA recipe (L300)', navPrim.map((b) => `${b.text}: ${b.recipe}`))
if (isHero) {
  const heroBtns = m.buttons.filter((b) => !b.nav && b.role !== 'text' && (!m.h1 || b.top > m.h1.top - 4))
  add('buttons', 'hero.primary-count', ok(foldPrim.length <= ctaCfg.maxPrimary && foldPrim.length >= (ctaCfg.minPrimary ?? 1)), foldPrim.length, `${ctaCfg.minPrimary ?? 1}-${ctaCfg.maxPrimary} primary CTA in the hero (0 allowed only when the canon sets minPrimary 0: Linear puts its CTA in the nav)${srcOf('cta', 'maxPrimary')}`, foldPrim.map((b) => b.text))
  add('buttons', 'hero.cta-height', (ctaCfg.minPrimary === 0 && !heroBtns.length) ? 'PASS' : ok(heroBtns.length > 0 && heroBtns.every((b) => inR(b.h, ctaCfg.heightPx))), heroBtns.map((b) => b.h).join(',') || 'none', `${ctaCfg.heightPx.join('-')}px${srcOf('cta', 'heightPx')}`, heroBtns.map((b) => `${b.text} h${b.h}`))
  const radBad = heroBtns.filter((b) => (ctaCfg.radiusPx ? !inR(b.rad, ctaCfg.radiusPx) && b.rad < b.h / 2 - 0.75 : b.rad < Math.min(12, 0.3 * b.h) - 0.25))
  add('buttons', 'hero.cta-radius', ok(!radBad.length), heroBtns.map((b) => b.rad).join(','), ctaCfg.radiusPx ? `${ctaCfg.radiusPx.join('-')}px or a pill [canon]` : 'radius >= min(12px, 0.3 x height), or a pill (L156 + L367: 12-18px at 44-52px)', radBad.map((b) => `${b.text} r${b.rad} h${b.h}`))
  const leadSec = m.buttons.filter((b) => !b.nav && b.role !== 'primary' && b.leadIcon)
  add('buttons', 'hero.secondary-icon', okW(!leadSec.length), leadSec.length, 'secondary hero buttons are text-only, no leading icon (L170)', leadSec.map((b) => b.text))
}

// hero composition
if (isHero) {
  const hc = { gap: val('hero', 'ctaProductGapPx'), share: val('hero', 'productMinFoldShare'), between: val('hero', 'nothingBetweenNavAndH1') }
  const btw = m.betweenNavAndH1 || []
  add('hero', 'hero.nav-to-h1', hc.between && !chipDeclared ? ok(!btw.length) : 'INFO', btw.length, chipDeclared ? 'DIRECTION declares chip: yes' : 'nothing visible between the nav and the h1 (L142)', btw)
  if (m.h1 && m.nav) add('hero', 'hero.h1-offset', 'INFO', Math.round(m.h1.top - m.nav.bottom), 'h1 top ~80-90px under the nav (L142)')
  const s = m.subtitle
  add('hero', 'hero.subtitle-lines', s ? ok(s.lines <= val('subtitle', 'maxLines')) : 'WARN', s ? s.lines : 'none', `<= ${val('subtitle', 'maxLines')} lines${srcOf('subtitle', 'maxLines')}`, s ? `"${s.text}" widths ${s.widths.join('/')}` : 'no <p> within 120px under the h1')
  if (s && s.lines > 1) add('hero', 'hero.subtitle-last-line', ok(s.lastShare >= val('subtitle', 'lastLineMinShare')), s.lastShare, `last line >= ${val('subtitle', 'lastLineMinShare')} of the first (no orphan, L361)${srcOf('subtitle', 'lastLineMinShare')}`)
  const p = m.product
  const heroBtns = m.buttons.filter((b) => !b.nav && b.role !== 'text' && (!m.h1 || b.top > m.h1.top - 4))
  const ctaBottom = heroBtns.length ? Math.max(...heroBtns.map((b) => b.bottom)) : null
  if (!p) add('hero', 'hero.product', 'FAIL', 'none', 'a product in the fold: mark it [data-product]')
  else {
    const side = m.h1 && p.top < m.h1.bottom
    // no hero CTA (Linear keeps its CTA in the nav): measure from the subtitle's bottom instead
    const gap = ctaBottom != null ? p.top - ctaBottom : (ctaCfg.minPrimary === 0 && s?.bottom != null) ? p.top - s.bottom : null
    add('hero', 'hero.cta-product-gap', side ? 'PASS' : ok(gap != null && inR(gap, hc.gap)), side ? 'side stage' : gap != null ? `${Math.round(gap)}px` : 'no CTA', `${hc.gap.join('-')}px from CTA bottom to product top, or a side stage${srcOf('hero', 'ctaProductGapPx')}`, `product ${p.tagged ? '[data-product]' : '(guessed: tag it)'} ${p.el} top ${Math.round(p.top)}`)
    add('hero', 'hero.product-share', ok(p.share >= hc.share), `${Math.round(p.share * 100)}%`, `product >= ${Math.round(hc.share * 100)}% of the fold${srcOf('hero', 'productMinFoldShare')}`)
    add('hero', 'hero.product-transform', ok(!p.tilted), p.tilted ? 'tilted' : 'straight', 'product frame straight-on at rest, no rotate/perspective (L394)', p.transforms)
    if (!p.tagged) add('hero', 'hero.product-tagged', 'WARN', 'untagged', 'mark the hero product with data-product so the census is exact')
  }
}
if (isPost) add('composition', 'subject.marked', ok(m.hasSubject), m.hasSubject ? 'yes' : 'no', 'mark the post component with data-subject')

// scope & motion
if (direction) {
  const miss = ['scope', 'motion'].filter((k) => !direction[k])
  add('scope', 'direction.lint', ok(direction.exists && !miss.length), direction.exists ? (miss.length ? `missing ${miss.join(', ')}` : 'ok') : 'file not found', 'DIRECTION has `scope:` and `motion:` lines (and `changes:` on revision rounds)', `scope: ${direction.scope || '-'} | motion: ${direction.motion || '-'} | changes: ${direction.changes || '-'}`)
  const loops = motion.running.filter((a) => a.infinite), live = motion.running
  const vidFold = m.videos.filter((v) => v.inFold)
  if (motionNone) {
    add('scope', 'motion.none.animations', ok(!live.length), live.length, 'motion: none -> no running CSS/Web Animations in the fold after load', live.slice(0, 6).map((a) => `${a.name} on ${a.target}${a.infinite ? ' (loop)' : ''}`))
    add('scope', 'motion.none.pixels', ok(motion.pixelChange <= 0.002), `${(motion.pixelChange * 100).toFixed(2)}%`, 'motion: none -> fold pixels still across 800ms (catches JS/canvas/WebGL loops)')
    add('scope', 'motion.none.video', ok(!vidFold.length), vidFold.length, 'motion: none -> no <video> in the fold', vidFold.map((v) => v.src))
  } else add('scope', 'motion.observed', 'INFO', `${live.length} running, ${loops.length} loops, ${(motion.pixelChange * 100).toFixed(2)}% pixels moving`, `motion: ${direction.motion || '-'}`)
  const wantsVideo = /video|mp4|reel|film/i.test(`${direction.scope} ${direction.motion}`)
  if (m.videos.length) add('scope', 'scope.video', ok(wantsVideo), m.videos.length, 'no <video> unless scope/motion asks for one (L358, L512)', m.videos.map((v) => v.src))
  if (direction.scope && /hero/i.test(direction.scope) && !/landing|page|site|full|section/i.test(direction.scope)) add('scope', 'scope.hero-only', okW(m.scrollHeight <= H * 1.5), `${m.scrollHeight}px tall`, 'scope says hero: the page should not extend into more sections', `sections: ${m.sectionCount}`)
} else add('scope', 'direction.lint', 'INFO', 'not given', 'pass --direction work/<name>/DIRECTION.md to gate scope, motion and changes')

// declared overrides: a DIRECTION line `override: <check-id> because <reason>` turns that check's FAIL into a WARN
// marked "overridden", so deliberate breaks stay visible in the report but don't block delivery (CLAUDE.md principle 1)
if (direction?.exists) {
  const dtxt = fs.readFileSync(dirPath, 'utf8')
  const ov = [...dtxt.matchAll(/override:\s*`?([a-z0-9][\w.+-]*)`?\s+because\s+([^\n]+)/gi)].map((x) => ({ id: x[1], why: x[2].trim() }))
  for (const c of C) { const o = ov.find((x) => x.id === c.id || x.id === `${c.census}/${c.id}`); if (o && c.status === 'FAIL') { c.status = 'WARN'; c.detail = `overridden in DIRECTION: ${o.why}${c.detail ? ' | ' + c.detail : ''}` } }
  direction.overrides = ov
}

// ================= outputs =================
const count = (s) => C.filter((c) => c.status === s).length
const summary = { pass: count('PASS'), warn: count('WARN'), fail: count('FAIL'), info: count('INFO') }
const gate = { tool: 'gate', url, kind, name, dark, generated: new Date().toISOString(), viewport: { W, H, dpr: 2 }, canon: fs.existsSync(canonPath) ? path.relative(root, canonPath) : null, direction, summary, checks: C, measured: { ...m, boxes: m.boxes.length }, pixels: px, motion, site: site && { pageButtons: site.pageButtons }, mobile: mobile && { overflowPx: mobile.overflowPx, smallTargets: mobile.smallTargets, h1: mobile.h1, shot: mobile.shot } }
fs.writeFileSync(path.join(out, 'gate.json'), JSON.stringify(gate, null, 1))

// report.json in check.mjs shape, so ledger.mjs add/similar work for gate-only pieces
const reportPath = path.join(out, 'report.json')
let existing = null; try { existing = JSON.parse(fs.readFileSync(reportPath, 'utf8')) } catch {}
const keepCheck = existing && existing.source !== 'gate' && !has('force-report')
if (!keepCheck) {
  const lower = (s) => ({ PASS: 'pass', WARN: 'warn', FAIL: 'fail', INFO: 'info' })[s]
  const p = m.product, h = m.h1
  const heroLayout = !h ? 'unknown' : !p ? ((h.left + h.right) / 2 > W * 0.4 && (h.left + h.right) / 2 < W * 0.6 ? 'centered-type' : 'type-only') : p.top >= h.bottom - 10 ? 'copy-above-visual' : (h.left + h.right) / 2 < W * 0.45 && p.left > W * 0.4 ? 'split-left-copy' : (h.left + h.right) / 2 > W * 0.55 ? 'split-right-copy' : 'integrated'
  const report = {
    source: 'gate', tool: 'gate', target: url, name, kind, generated: gate.generated, summary: { pass: summary.pass, warn: summary.warn, fail: summary.fail },
    viewports: [{ name: 'desktop', width: W, height: H, screenshots: { fold: foldPng, full: fullPng }, checks: C.map((c) => ({ id: `${c.census}.${c.id}`, status: lower(c.status), value: c.value, threshold: c.want, detail: c.detail })) }]
      .concat(mobile ? [{ name: 'mobile', width: 390, height: 844, screenshots: { fold: mobile.shot, full: mobile.shot }, checks: [] }] : []),
    fingerprint: {
      h1: h && { px: h.px, lh: h.lh, ls: `${(h.trackingEm * h.px).toFixed(2)}px`, weight: String(h.weight), family: h.family, text: h.text },
      fonts: m.fonts.map(([f]) => f), accentHues: [...new Set(accents.map((f) => Math.round(f.hue / 15) * 15))].sort((a, b) => a - b),
      radii: [...new Set(m.boxes.map((b) => (b.pill ? 'pill' : Math.round(b.rad))))], navHeight: m.nav ? Math.round(m.nav.height) : null, contentWidth: m.contentWidth,
      sectionPad: m.sectionPad, sectionCount: m.sectionCount, bodyPx: m.bodyPx, heroLayout, navNumbered: m.navNumbered,
      // primary CTA's computed recipe, for ledger.mjs's button axis
      button: (() => { const b = m.buttons.find((x) => x.role === 'primary' && !x.nav) || m.buttons.find((x) => x.role === 'primary') || m.buttons.find((x) => x.role === 'secondary'); return b ? { height: Math.round(b.h), radius: b.pill ? 'pill' : Math.round(b.rad), background: b.background, shadow: b.shadow, role: b.role, from: 'gate primary CTA' } : undefined })(),
    },
  }
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
}

const order = { FAIL: 0, WARN: 1, PASS: 2, INFO: 3 }
console.log(`gate ${name} [${kind}${dark ? ', dark' : ''}] ${url}`)
console.log(`canon: ${gate.canon || 'none (built-in fallbacks)'}${direction ? ` | direction: ${direction.path}` : ''}`)
for (const c of [...C].sort((a, b) => order[a.status] - order[b.status])) {
  if (c.status === 'INFO' && !has('verbose')) continue
  console.log(`  ${c.status.padEnd(4)} ${c.census}/${c.id}: ${c.value}  (want ${c.want})${c.detail && c.status !== 'PASS' ? `\n         ${c.detail.slice(0, 300)}` : ''}`)
}
console.log(`${name}: ${summary.fail} fail, ${summary.warn} warn, ${summary.pass} pass -> reports/${name}/gate.json${keepCheck ? ' (report.json from check.mjs kept)' : ', report.json'}`)
process.exit(summary.fail ? 1 : 0)
