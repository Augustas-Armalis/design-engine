#!/usr/bin/env node
// Preflight: the one command that runs every check before anything reaches the founder (founder 2026-10-22: "sometimes
// complete magic, sometimes complete bullshit... buttons not centred, missing a background blur... build algorithms/rules
// for yourself to check everything every time"). The router (.claude/skills/design-engine/SKILL.md) requires 0 FAIL.
//
//   nice -n 19 node tools/preflight.mjs <url> --kind <kind> --name <name> [--w 1440 --h 900] [--direction work/<n>/DIRECTION.md]
//       [--artboard] [--anchor all|tl|tr|bl|br|none] [--png a.png,b.png] [--format <system/x/formats.json id>]
//       [--seams 464,928] [--skip gate,design-view,check,clipscan,probes] [--wait 4500]
//
// Steps, one browser at a time:
//   1 gate.mjs        censuses by kind (edges, radius ladder, type, colour, button grammar, hero composition, centring box
//                     model, text crossing a crop, text half-faded by a mask, scope and motion)
//   2 design_view.mjs hero-light | hero-dark | post-component: the candidate beside the rated references, format checks
//   3 check.mjs       correctness (overflow, semantics, AA contrast, targets); --artboard (or a non-page kind) = one viewport
//   4 clipscan.cjs    text wider than its clip box, SVG shapes outside their viewBox, children cut by overflow:hidden
//   5 own probes      load (fonts fall back, broken images, page errors); optical label centring (cap-height box, the
//                     "top padding looks bigger" bug); icon glyph centring (painted bbox, not the svg box); grey twins
//                     (DE-05); heavy primaries per view (DE-06); small things cut at any frame edge (DE-02); the fold
//                     ends on purpose (margin, mask/blur fade, or a big deliberate bleed; no text cut at the bottom);
//                     post insets (equal on the anchored corner, bleeding off the other two edges); strip seams; alpha
//                     fills over patterns (DE-04); reference names and placeholder copy (hard no-copy rule)
//   6 exports         --png files: long side >= 2000 px (XP-11), ratio matches the --format canvas, <= 5 MB (X API)
// Writes reports/<name>/preflight.json and preflight.md, prints one PASS/FAIL table, exits 1 on any FAIL.
// Calibration and the numbers behind each threshold: docs/PREFLIGHT.md.
import { chromium } from 'playwright'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d }
const has = (n) => argv.includes(`--${n}`)
const url = argv.find((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'))
const KINDS = {
  'hero-light': { w: 1440, h: 900, dv: 'hero-light', page: true },
  'hero-dark': { w: 1440, h: 900, dv: 'hero-dark', page: true },
  'full-website': { w: 1440, h: 900, page: true },
  audit: { w: 1440, h: 900, page: true },
  'client-app': { w: 1440, h: 900, page: true },
  'section-bento': { w: 1440, h: 900 },
  'product-ui': { w: 1440, h: 900 },
  'post-component': { w: 1200, h: 800, dv: 'post-component' },
}
const kind = flag('kind', 'hero-light'), name = flag('name', 'preflight')
if (!url || has('help') || !KINDS[kind]) {
  console.error(`usage: node tools/preflight.mjs <url> --kind <${Object.keys(KINDS).join('|')}> --name <name> [--w --h] [--direction f] [--artboard] [--anchor all|tl|tr|bl|br|none] [--png a,b] [--format id] [--seams x1,x2] [--skip steps]`)
  process.exit(2)
}
const K = KINDS[kind]
const W = +flag('w', K.w), H = +flag('h', K.h), WAIT = +flag('wait', 4500)
const skip = new Set((flag('skip', '') || '').split(',').filter(Boolean))
const artboard = has('artboard') || !K.page
const out = path.join(root, 'reports', name); fs.mkdirSync(out, { recursive: true })
const T0 = Date.now()

const C = [] // { group, id, status: PASS|WARN|FAIL|INFO, value, want, detail }
const add = (group, id, status, value, want, detail = '') => C.push({ group, id, status, value, want, detail: Array.isArray(detail) ? detail.join('; ') : String(detail ?? '') })
const steps = []
const readJSON = (p) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')) } catch { return null } }
const run = (label, args) => {
  const t = Date.now()
  const r = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 240000 })
  return { label, code: r.status, out: `${r.stdout || ''}${r.stderr || ''}`, ms: Date.now() - t }
}
const fresh = (p) => { const j = readJSON(p); return j && fs.statSync(p).mtimeMs >= T0 ? j : null }

// ---------- 1 gate ----------
const sizeArgs = ['--w', String(W), '--h', String(H)]
if (!skip.has('gate')) {
  const args = ['tools/gate.mjs', url, '--kind', kind, '--name', name, ...sizeArgs, '--wait', String(WAIT)]
  if (flag('direction')) args.push('--direction', flag('direction'))
  const r = run('gate', args)
  const g = fresh(path.join(out, 'gate.json'))
  if (!g) { add('gate', 'gate.ran', 'FAIL', `exit ${r.code}`, 'gate.json written', r.out.slice(-400)); steps.push({ step: 'gate', status: 'FAIL', fail: 1, warn: 0, ms: r.ms }) }
  else {
    for (const c of g.checks) if (c.status === 'FAIL' || c.status === 'WARN') add('gate', `${c.census}/${c.id}`, c.status, c.value, c.want, c.detail)
    add('gate', 'gate.summary', g.summary.fail ? 'FAIL' : 'PASS', `${g.summary.fail} fail, ${g.summary.warn} warn, ${g.summary.pass} pass`, '0 FAIL', `reports/${name}/gate.json`)
    steps.push({ step: 'gate', status: g.summary.fail ? 'FAIL' : 'PASS', fail: g.summary.fail, warn: g.summary.warn, ms: r.ms })
  }
}

// ---------- 2 design view ----------
if (K.dv && !skip.has('design-view')) {
  const r = run('design-view', ['tools/design_view.mjs', url, '--kind', K.dv, '--name', name, ...sizeArgs])
  const d = fresh(path.join(out, 'design-view.json'))
  if (!d) { add('design-view', 'design-view.ran', 'FAIL', `exit ${r.code}`, 'design-view.json written', r.out.slice(-400)); steps.push({ step: 'design-view', status: 'FAIL', fail: 1, warn: 0, ms: r.ms }) }
  else {
    for (const c of d.checks) if (c.status === 'FAIL') add('design-view', c.id, 'FAIL', c.value, c.want, c.rule)
    add('design-view', 'design-view.summary', d.fails ? 'FAIL' : 'PASS', `${d.fails} fail`, '0 FAIL', `reports/${name}/design-view.png (read it beside the references)`)
    steps.push({ step: 'design-view', status: d.fails ? 'FAIL' : 'PASS', fail: d.fails, warn: 0, ms: r.ms })
  }
}

// ---------- 3 check.mjs ----------
if (!skip.has('check')) {
  const args = ['tools/check.mjs', url, '--out', out, '--name', 'check']
  if (artboard) args.push('--w', String(W), '--h', String(H))
  const r = run('check', args)
  const c = fresh(path.join(out, 'check', 'report.json'))
  if (!c) { add('check', 'check.ran', 'FAIL', `exit ${r.code}`, 'check report written', r.out.slice(-400)); steps.push({ step: 'check', status: 'FAIL', fail: 1, warn: 0, ms: r.ms }) }
  else {
    // contrast: when the gate ran, its census decides (it splits page text, FAIL, from product text drawn as a picture, WARN);
    // check.mjs measures both alike, so its contrast findings become WARN here. Every other check.mjs fail stays a FAIL.
    const gateRan = C.some((x) => x.id === 'gate.summary')
    const contrastOnly = (k) => /contrast/.test(k.id) || (/axe-serious/.test(k.id) && /^(color-contrast(×\d+)?[;,\s]*)+$/.test(String(k.detail).trim()))
    let fails = 0
    for (const v of c.viewports) for (const k of v.checks) if (k.status === 'fail') {
      const soft = gateRan && contrastOnly(k)
      if (!soft) fails++
      add('check', `${v.name}/${k.id}`, soft ? 'WARN' : 'FAIL', k.value, k.threshold, `${soft ? 'judged by gate contrast census (product text is WARN there) | ' : ''}${k.detail}`)
    }
    add('check', 'check.summary', fails ? 'FAIL' : 'PASS', `${fails} fail, ${c.summary.warn + c.summary.fail - fails} warn`, '0 FAIL', `${artboard ? `one ${W}x${H} viewport (artboard)` : 'desktop + mobile'}; reports/${name}/check/report.md`)
    steps.push({ step: 'check', status: fails ? 'FAIL' : 'PASS', fail: fails, warn: c.summary.warn + c.summary.fail - fails, ms: r.ms })
  }
}

// ---------- 4 clipscan ----------
if (!skip.has('clipscan')) {
  const r = run('clipscan', ['tools/clipscan.cjs', url, String(W), String(H)])
  const lines = r.out.trim().split('\n').filter(Boolean)
  const n = +(lines.at(-1)?.match(/^(\d+) issue/)?.[1] ?? NaN)
  const st = Number.isNaN(n) || n ? 'FAIL' : 'PASS'
  add('clipscan', 'clip.cut-off', st, Number.isNaN(n) ? `exit ${r.code}` : n, '0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden)', lines.slice(0, -1).slice(0, 8))
  steps.push({ step: 'clipscan', status: st, fail: st === 'FAIL' ? 1 : 0, warn: 0, ms: r.ms })
}

// ---------- 5 own probes ----------
const names = readJSON(path.join(root, 'system/canon/no-copy-names.json')) || { names: [], stock: [] }
const anchor = flag('anchor', null)
const seams = (flag('seams', '') || '').split(',').filter(Boolean).map(Number)

// in-page measurement; returns plain data
const probe = (cfg) => {
  const { W, H, banned } = cfg
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true }); const cache = new Map()
  const rgba = (c) => {
    if (cache.has(c)) return cache.get(c)
    cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1)
    const d = cv.getImageData(0, 0, 1, 1).data; const v = [d[0], d[1], d[2], d[3] / 255]; cache.set(c, v); return v
  }
  const lin = (x) => { x /= 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4 }
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
  const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3]))
  const oklch = ([r, g, b]) => {
    const R = lin(r), G = lin(g), B = lin(b)
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    return { L, C: Math.hypot(A, Bb) }
  }
  const hex = (c) => '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
  const txt = (el) => (el.getAttribute?.('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28)
  const all = [...document.querySelectorAll('body *')]
  const shown = (el) => { const r = el.getBoundingClientRect(); if (r.width < 0.5 || r.height < 0.5) return null; const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') return null; return r }
  const opacityOf = (el) => { let o = 1; for (let a = el; a && a.nodeType === 1; a = a.parentElement) o *= +getComputedStyle(a).opacity; return o }
  const masked = (el) => { for (let a = el; a && a.nodeType === 1; a = a.parentElement) { const cs = getComputedStyle(a); if ((cs.maskImage && cs.maskImage !== 'none') || (cs.webkitMaskImage && cs.webkitMaskImage !== 'none')) return true } return false }
  const inView = (r) => r.right > 0 && r.bottom > 0 && r.left < W && r.top < H
  // the part of a box its clipping ancestors (overflow hidden/clip) let through; a box clipped by its own card never
  // reaches the frame edge
  const clipRect = (el) => {
    let l = -Infinity, t = -Infinity, r = Infinity, b = Infinity
    for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const cs = getComputedStyle(a)
      if (/hidden|clip/.test(cs.overflowX + cs.overflowY) && !a.hasAttribute('data-xframe')) { const q = a.getBoundingClientRect(); l = Math.max(l, q.left); t = Math.max(t, q.top); r = Math.min(r, q.right); b = Math.min(b, q.bottom) }
    }
    return { l, t, r, b }
  }
  // fill of an element: its background colour, or the average of a linear gradient's stops when that is more opaque
  const fillOf = (el) => {
    const cs = getComputedStyle(el); let c = rgba(cs.backgroundColor)
    if (/^linear-gradient/.test(cs.backgroundImage)) {
      const stops = (cs.backgroundImage.match(/rgba?\([^)]*\)/gi) || []).map(rgba)
      if (stops.length) { const avg = [0, 1, 2, 3].map((i) => stops.reduce((s, x) => s + x[i], 0) / stops.length); if (avg[3] > c[3]) c = avg }
    }
    return c
  }
  const surfaceUnder = (el) => { for (let a = el.parentElement; a; a = a.parentElement) { const f = fillOf(a); if (f[3] >= 0.85) return f } return [255, 255, 255, 1] }
  const hasRing = (cs) => /0(px)?\s+0(px)?\s+0(px)?\s+(0\.5|1|1\.5)px/.test(cs.boxShadow) || ['Top', 'Right', 'Bottom', 'Left'].every((s) => parseFloat(cs[`border${s}Width`]) >= 0.5 && cs[`border${s}Style`] !== 'none')
  const isControlBox = (el, r, cs) => {
    if (r.height < 16 || r.height > 64 || r.width > 440 || r.width < 14) return false
    return (fillOf(el)[3] > 0.04 || hasRing(cs)) && parseFloat(cs.borderTopLeftRadius) >= 3
  }
  const textNodes = (el) => { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const a = []; let n; while ((n = w.nextNode())) if (n.textContent.trim()) a.push(n); return a }
  const res = { fonts: [], labels: [], icons: [], fills: {}, rings: {}, primaries: [], edge: [], bottom: [], window: null, alpha: [], banned: [], placeholder: [], seamText: [] }

  // fonts: the first family of every text element must be available, or it silently renders in a fallback face
  const fams = new Map()
  for (const el of all) { if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) || !shown(el)) continue; const f = getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, ''); fams.set(f, (fams.get(f) || 0) + 1) }
  const generic = /^(serif|sans-serif|monospace|system-ui|ui-sans-serif|ui-monospace|ui-serif|cursive|fantasy|-apple-system|BlinkMacSystemFont|inherit)$/i
  const width = (font) => { cv.font = font; return cv.measureText('mmmmmmmmmmlli1WQ@#jy').width }
  for (const [f, n] of fams) { if (generic.test(f)) continue; const ok = width(`32px "${f}", monospace`) !== width('32px monospace') || width(`32px "${f}", serif`) !== width('32px serif'); res.fonts.push({ family: f, uses: n, ok }) }

  // optical label centring: the label's optical box (x-height box when it has lowercase, cap box otherwise) sits centred
  const byControl = new Map()
  for (const t of textNodes(document.body)) {
    const p = t.parentElement; if (!p || !shown(p)) continue
    let ctl = null
    for (let a = p; a && a !== document.body; a = a.parentElement) { const r = a.getBoundingClientRect(), cs = getComputedStyle(a); if (r.height > 64) break; if (isControlBox(a, r, cs)) { ctl = a; break } }
    if (!ctl) continue
    if (!byControl.has(ctl)) byControl.set(ctl, []); byControl.get(ctl).push(t)
  }
  for (const [ctl, nodes] of byControl) {
    const r = ctl.getBoundingClientRect(); if (!inView(r) || opacityOf(ctl) < 0.5) continue
    const rng = document.createRange(); const lines = []
    for (const t of nodes) {
      rng.selectNodeContents(t); const rects = [...rng.getClientRects()].filter((q) => q.width > 0.5)
      if (rects.length !== 1) { lines.length = 0; lines.push(null); break }
      const cs = getComputedStyle(t.parentElement)
      cv.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      const m = cv.measureText(t.textContent), asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent
      const q = rects[0], k = q.height / (asc + desc || 1), base = q.top + asc * k
      // optical box: cap height to baseline (descenders ignored); see the threshold note at optical.label-centre
      const s = t.textContent.trim()
      const top = base - cv.measureText('H').actualBoundingBoxAscent * k
      lines.push({ top, base, text: s })
    }
    if (!lines.length || lines.includes(null)) continue
    const tops = lines.map((l) => l.top), bases = lines.map((l) => l.base)
    if (Math.max(...bases) - Math.min(...bases) > 2) continue // two text rows (date tiles, two-line options): not a one-line control
    const inkTop = Math.min(...tops), inkBot = Math.max(...bases)
    const ccs = getComputedStyle(ctl), bt = parseFloat(ccs.borderTopWidth) || 0, bb = parseFloat(ccs.borderBottomWidth) || 0
    const gt = inkTop - (r.top + bt), gb = r.bottom - bb - inkBot
    if (gt < 0 || gb < 0) continue // label taller than its box (inline tags inside text): the box census handles those
    res.labels.push({ text: lines.map((l) => l.text).join(' ').slice(0, 28), h: +r.height.toFixed(1), top: +gt.toFixed(2), bottom: +gb.toFixed(2), diff: +(gt - gb).toFixed(2), x: Math.round(r.left), y: Math.round(r.top) })
  }

  // icon-only controls: the painted glyph (fill/stroke geometry), not the svg box, sits centred
  for (const el of all) {
    const r = shown(el); if (!r || !inView(r)) continue
    const cs = getComputedStyle(el)
    if (!isControlBox(el, r, cs) || r.width / r.height < 0.75 || r.width / r.height > 1.33 || textNodes(el).length) continue
    const svgs = el.querySelectorAll('svg'); if (svgs.length !== 1) continue
    let L = Infinity, T = Infinity, R = -Infinity, B = -Infinity
    for (const g of svgs[0].querySelectorAll('path, circle, rect, line, polyline, polygon, ellipse')) {
      const gs = getComputedStyle(g); if ((gs.fill === 'none' && gs.stroke === 'none') || +gs.opacity === 0 || gs.display === 'none') continue
      const q = g.getBoundingClientRect(); if (q.width < 0.1 && q.height < 0.1) continue
      L = Math.min(L, q.left); T = Math.min(T, q.top); R = Math.max(R, q.right); B = Math.max(B, q.bottom)
    }
    if (!Number.isFinite(L)) continue
    res.icons.push({ w: Math.round(r.width), h: Math.round(r.height), dx: +((L + R) / 2 - (r.left + r.width / 2)).toFixed(2), dy: +((T + B) / 2 - (r.top + r.height / 2)).toFixed(2), x: Math.round(r.left), y: Math.round(r.top), aria: el.getAttribute('aria-label') || '' })
  }

  // greys by role: neutral fills (area-weighted) and neutral 1px edges, composited on the surface under them
  for (const el of all) {
    const r = shown(el); if (!r || !inView(r)) continue
    const cs = getComputedStyle(el), area = Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0))
    const bg = rgba(cs.backgroundColor)
    if (bg[3] >= 0.9 && area >= 300 && !/gradient|url\(/.test(cs.backgroundImage)) { const o = oklch(bg); if (o.C <= 0.012) { const h = hex(bg); (res.fills[h] ||= { L: +o.L.toFixed(4), area: 0, n: 0, at: txt(el) || el.tagName.toLowerCase() }); res.fills[h].area += area; res.fills[h].n++ } }
    const ring = cs.boxShadow.match(/(rgba?\([^)]*\)|#[0-9a-f]{3,8})\s+0(px)?\s+0(px)?\s+0(px)?\s+1px/i)
    const edge = ring ? ring[1] : parseFloat(cs.borderTopWidth) >= 0.5 && cs.borderTopStyle !== 'none' ? cs.borderTopColor : null
    if (edge) { const e = rgba(edge); if (e[3] > 0.02) { const comp = over(e, surfaceUnder(el)); const o = oklch(comp); if (o.C <= 0.012) { const h = hex(comp); (res.rings[h] ||= { L: +o.L.toFixed(4), n: 0, at: txt(el) || el.tagName.toLowerCase() }); res.rings[h].n++ } } }
  }

  // heavy primaries: one-line text controls whose fill stands >= 3:1 off the surface under them (ink on light, white on dark)
  const prods = [...document.querySelectorAll('[data-product]')]
  for (const el of byControl.keys()) {
    const r = el.getBoundingClientRect(); if (!inView(r) || r.height < 24 || r.height > 60 || opacityOf(el) < 0.5) continue
    const s = txt(el); if (s.length <= 2) continue // avatars, initials, day numbers
    if (Math.abs(r.width - r.height) < 2 && parseFloat(getComputedStyle(el).borderTopLeftRadius) >= r.height / 2 - 1) continue // circles
    const f = fillOf(el); if (f[3] < 0.85) continue
    const cr = contrast(f, surfaceUnder(el))
    const pr = el.closest('[data-product]')
    if (cr >= 3) res.primaries.push({ text: s, region: pr ? `product${prods.indexOf(pr) + 1}` : 'page', contrast: +cr.toFixed(1), fill: hex(f), x: Math.round(r.left), y: Math.round(r.top) })
  }

  // edges: small painted things (chips, avatars, buttons, icons, rows) cut by a frame edge
  const cutShare = (r) => { const iw = Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0)), ih = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)); return (iw * ih) / (r.width * r.height) }
  const edgesOf = (r) => [r.left < -0.5 && 'left', r.right > W + 0.5 && 'right', r.top < -0.5 && 'top', r.bottom > H + 0.5 && 'bottom'].filter(Boolean)
  for (const el of all) {
    const r = shown(el); if (!r || !inView(r)) continue
    // small = short side < 120 and long side < 60% of the frame (a chip, a button, an avatar, a row); a big visual may bleed
    if (Math.min(r.width, r.height) >= 120 || Math.max(r.width, r.height) >= Math.max(W, H) * 0.6 || (el.closest('svg') && !el.matches('svg'))) continue
    const cs = getComputedStyle(el)
    if (!(fillOf(el)[3] > 0.04 || hasRing(cs) || el.matches('svg, img, canvas, video'))) continue
    const sh = cutShare(r); if (sh <= 0.02 || sh >= 0.98) continue
    if (r.left >= -0.5 && r.right <= W + 0.5 && r.top >= -0.5) continue // only cut at the bottom: fold.end judges that edge
    const k = clipRect(el); if (k.l > 0.5 && k.r < W - 0.5 && k.t > 0.5) continue // its own card cuts it first (the gate's crop census judges that)
    res.edge.push({ el: el.tagName.toLowerCase(), text: txt(el), edges: edgesOf(r), share: +sh.toFixed(2), w: Math.round(r.width), h: Math.round(r.height), faded: masked(el) || opacityOf(el) < 0.35, x: Math.round(r.left), y: Math.round(r.top) })
  }
  // bottom edge: text lines and boxes crossing it (the gate exempts the fold bottom; this decides if the fold ends on purpose)
  const rng = document.createRange()
  // a fade over the edge: a backdrop blur, or a linear gradient with a transparent stop (a colour field behind is not a fade)
  const fadeLayer = (e) => { const cs = getComputedStyle(e); return /blur/.test(cs.backdropFilter || '') || (/linear-gradient/.test(cs.backgroundImage) && /transparent|rgba\([^)]*,\s*0(\.0+)?\)/.test(cs.backgroundImage)) }
  // by geometry, not elementsFromPoint: blur overlays are pointer-events:none, which elementsFromPoint skips
  const fades = all.filter((e) => fadeLayer(e) && shown(e))
  const coveredAt = (x, y, p) => fades.some((e) => { if (e === p || p.contains(e) || e.contains(p)) return false; const q = e.getBoundingClientRect(); return x >= q.left && x <= q.right && y >= q.top && y <= q.bottom })
  for (const t of textNodes(document.body)) {
    const p = t.parentElement; if (!p || !shown(p)) continue
    rng.selectNodeContents(t)
    for (const q of rng.getClientRects()) {
      if (q.width < 1 || q.top >= H || q.bottom <= H + 0.5 || q.right <= 0 || q.left >= W || clipRect(p).b < H - 0.5) continue
      const share = (H - q.top) / q.height; if (share <= 0.02) continue
      const x = Math.min(Math.max(q.left + q.width / 2, 1), W - 1)
      res.bottom.push({ kind: 'text', text: t.textContent.trim().slice(0, 24), share: +share.toFixed(2), faded: masked(p) || opacityOf(p) < 0.35 || coveredAt(x, H - 2, p), x: Math.round(q.left), h: Math.round(q.height) })
    }
  }
  for (const el of all) {
    const r = shown(el); if (!r || r.top >= H || r.bottom <= H + 0.5 || r.right <= 0 || r.left >= W || clipRect(el).b < H - 0.5) continue
    if (!(fillOf(el)[3] > 0.04 || hasRing(getComputedStyle(el)) || el.matches('img, canvas, video, svg'))) continue
    if (r.width >= W * 0.98 && r.height >= H * 0.98) continue // the canvas itself
    const x = Math.min(Math.max(r.left + r.width / 2, 1), W - 1)
    res.bottom.push({ kind: 'box', el: el.tagName.toLowerCase(), text: txt(el), h: Math.round(r.height), cutPx: Math.round(r.bottom - H), cutShare: +((r.bottom - H) / r.height).toFixed(2), faded: masked(el) || opacityOf(el) < 0.35 || coveredAt(x, H - 2, el) })
  }

  // the subject window (post insets): data-subject, else data-product, else the largest rounded painted box covering >= 20%
  let win = document.querySelector('[data-subject]') || document.querySelector('[data-product]')
  if (!win) {
    let best = 0
    for (const el of all) { const r = shown(el); if (!r) continue; const cs = getComputedStyle(el); if (parseFloat(cs.borderTopLeftRadius) < 10 || !(fillOf(el)[3] > 0.5 || hasRing(cs))) continue; const a = r.width * r.height; if (a >= W * H * 0.2 && a > best && r.width < W * 1.6) { best = a; win = el } }
  }
  if (win) { const r = win.getBoundingClientRect(); res.window = { el: win.tagName.toLowerCase(), left: +r.left.toFixed(1), top: +r.top.toFixed(1), right: +(W - r.right).toFixed(1), bottom: +(H - r.bottom).toFixed(1), w: Math.round(r.width), h: Math.round(r.height) } }

  // strip seams: text cut by an internal crop line of a carousel (each strip shows half of it)
  for (const sx of cfg.seams) for (const t of textNodes(document.body)) {
    rng.selectNodeContents(t)
    for (const q of rng.getClientRects()) if (q.left < sx - 1 && q.right > sx + 1 && q.top < H && q.bottom > 0) res.seamText.push({ seam: sx, text: t.textContent.trim().slice(0, 24), y: Math.round(q.top) })
  }

  // DE-04: translucent fills (no backdrop blur) over a pattern, text or line layer
  for (const el of all) {
    const r = shown(el); if (!r || !inView(r) || r.width * r.height < 1600) continue
    const cs = getComputedStyle(el), bg = rgba(cs.backgroundColor)
    if (bg[3] <= 0.05 || bg[3] >= 0.95 || /blur/.test(cs.backdropFilter || '') || /gradient|url\(/.test(cs.backgroundImage)) continue
    const under = document.elementsFromPoint(Math.min(Math.max(r.left + r.width / 2, 0), W - 1), Math.min(Math.max(r.top + r.height / 2, 0), H - 1)).filter((e) => e !== el && !el.contains(e) && !e.contains(el))
    const pattern = under.find((e) => /repeating|url\(/.test(getComputedStyle(e).backgroundImage) || /radial-gradient[^,]*,[^)]*\)\s*,?\s*$/.test(getComputedStyle(e).backgroundSize === 'auto' ? '' : getComputedStyle(e).backgroundImage) || (e.matches('svg') && e.getBoundingClientRect().width > r.width * 0.5))
    if (pattern) res.alpha.push({ text: txt(el), alpha: +bg[3].toFixed(2), over: pattern.tagName.toLowerCase(), x: Math.round(r.left), y: Math.round(r.top) })
  }

  // copy: reference names (no-copy rule) and placeholder text in the visible page
  const body = document.body.innerText || ''
  const re = (n, f) => new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, f)
  for (const n of banned.names) if (re(n, 'i').test(body)) res.banned.push(n)
  for (const n of banned.stock) if (re(n, n === 'TODO' || n === 'FIXME' ? '' : 'i').test(body)) res.placeholder.push(n)
  res.images = [...document.images].filter((i) => shown(i) && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc || i.src)
  return res
}

const pageErrors = [], consoleErrors = []
if (!skip.has('probes')) {
  const t = Date.now()
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 })
  page.on('pageerror', (e) => pageErrors.push(e.message.slice(0, 160)))
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)) })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {})
  await page.waitForTimeout(WAIT)
  await page.evaluate(() => document.fonts.ready)
  const P = await page.evaluate(probe, { W, H, seams, banned: { names: names.names.map((n) => n.name), stock: names.stock } })
  await page.screenshot({ path: path.join(out, 'preflight-frame.png') })
  await browser.close()
  steps.push({ step: 'probes', status: 'done', fail: 0, warn: 0, ms: Date.now() - t })
  fs.writeFileSync(path.join(out, 'preflight-probes.json'), JSON.stringify(P, null, 1))

  // load
  const badFonts = P.fonts.filter((f) => !f.ok)
  add('load', 'load.fonts', badFonts.length ? 'FAIL' : 'PASS', `${P.fonts.length - badFonts.length}/${P.fonts.length}`, 'every named font family is available (no silent fallback face)', badFonts.map((f) => `${f.family} x${f.uses} falls back`))
  add('load', 'load.images', P.images.length ? 'FAIL' : 'PASS', P.images.length, '0 broken or unloaded <img>', P.images.slice(0, 4))
  add('load', 'load.page-errors', pageErrors.length ? 'FAIL' : 'PASS', pageErrors.length, '0 uncaught page errors', pageErrors.slice(0, 3))
  if (consoleErrors.length) add('load', 'load.console-errors', 'WARN', consoleErrors.length, '0 console errors', consoleErrors.slice(0, 3))

  // optical centring
  // diff = top gap - bottom gap of the cap box. Calibrated on h4a (Inter loaded): every accepted label sits at -1.96..-0.07
  // (centred or a touch high); the pre-lift "Sign up" the founder called out ("top padding looks bigger") was +0.81.
  // Lowercase mass sits below the cap middle, so a cap box that is even half a pixel low reads low: band [-2.5, +0.6].
  const offLabels = P.labels.filter((l) => l.diff > 0.6 || l.diff < -2.5)
  add('optical', 'optical.label-centre', offLabels.length ? 'FAIL' : 'PASS', `${offLabels.length}/${P.labels.length}`, 'one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5)', offLabels.slice(0, 8).map((l) => `"${l.text}" h${l.h} top ${l.top} bottom ${l.bottom} (${l.diff > 0 ? 'low' : 'high'} ${Math.abs(l.diff)}px) at ${l.x},${l.y}`))
  const offIcons = P.icons.filter((i) => Math.max(Math.abs(i.dx), Math.abs(i.dy)) > 1.25)
  add('optical', 'optical.icon-centre', offIcons.length ? 'FAIL' : 'PASS', `${offIcons.length}/${P.icons.length}`, 'icon-only controls: painted glyph centre within 1.25px of the box centre', offIcons.slice(0, 8).map((i) => `${i.w}x${i.h} ${i.aria} dx ${i.dx} dy ${i.dy} at ${i.x},${i.y}`))

  // greys: two distinct near-identical neutrals in one role read as drift (cproda r1: "not the same gray")
  const twins = (map, maxD, minShare) => {
    const e = Object.entries(map).filter(([, v]) => v.area == null || v.area >= W * H * minShare).sort((a, b) => b[1].L - a[1].L), o = []
    for (let i = 0; i < e.length; i++) for (let j = i + 1; j < e.length; j++) { const d = Math.abs(e[i][1].L - e[j][1].L); if (d > 0.0015 && d <= maxD) o.push(`${e[i][0]} (${e[i][1].at}) vs ${e[j][0]} (${e[j][1].at}) dL ${d.toFixed(4)}`) }
    return o
  }
  const fillTw = twins(P.fills, 0.008, 0.002), ringTw = twins(P.rings, 0.006, 0)
  add('grey', 'grey.fill-twins', fillTw.length ? 'FAIL' : 'PASS', fillTw.length, 'no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05)', fillTw.slice(0, 6))
  add('grey', 'grey.edge-twins', ringTw.length ? 'WARN' : 'PASS', ringTw.length, 'no two neutral 1px edges within dL 0.006 (composited on their surface)', ringTw.slice(0, 6))
  add('grey', 'grey.census', 'INFO', `${Object.keys(P.fills).length} fills, ${Object.keys(P.rings).length} edges`, 'neutral greys in use', Object.entries(P.fills).sort((a, b) => b[1].area - a[1].area).slice(0, 8).map(([h, v]) => `${h} L${v.L} ${Math.round((v.area / (W * H)) * 1000) / 10}%`))

  // primaries per view
  const regions = {}
  for (const p of P.primaries) (regions[p.region] ||= []).push(p)
  const heavy = Object.entries(regions).filter(([, l]) => l.length > 1)
  add('primary', 'primary.per-view', heavy.length ? 'FAIL' : 'PASS', Object.entries(regions).map(([k, l]) => `${k}:${l.length}`).join(' ') || '0', '<= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary")', heavy.flatMap(([k, l]) => l.map((p) => `${k} "${p.text}" ${p.fill} ${p.contrast}:1`)))

  // edges and the fold
  const edgeBad = P.edge.filter((e) => !e.faded)
  add('edge', 'edge.small-cut', edgeBad.length ? 'FAIL' : 'PASS', edgeBad.length, 'no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02)', edgeBad.slice(0, 8).map((e) => `${e.el} "${e.text}" ${e.w}x${e.h} ${Math.round(e.share * 100)}% visible at ${e.edges.join('/')} (${e.x},${e.y})`))
  const bText = P.bottom.filter((b) => b.kind === 'text'), bBox = P.bottom.filter((b) => b.kind === 'box')
  const cutText = bText.filter((b) => !b.faded), smallCut = bBox.filter((b) => !b.faded && (b.h < 120 || b.cutShare < 0.25))
  const mode = !P.bottom.length ? 'margin' : P.bottom.every((b) => b.faded) ? 'fade' : !cutText.length && !smallCut.length ? 'deliberate cut' : 'accidental cut'
  add('edge', 'fold.end', mode === 'accidental cut' ? 'FAIL' : 'PASS', mode, 'the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge', [...cutText.map((b) => `text "${b.text}" ${Math.round(b.share * 100)}% visible`), ...smallCut.map((b) => `${b.el} "${b.text}" h${b.h} cut ${b.cutPx}px (${Math.round(b.cutShare * 100)}%)`)].slice(0, 8))

  // post insets
  if (anchor && anchor !== 'none') {
    const w = P.window
    if (!w) add('post', 'post.insets', 'FAIL', 'no window', 'a subject window (data-subject / data-product / largest rounded box)')
    else {
      const ins = { l: w.left, t: w.top, r: w.right, b: w.bottom }
      const eq = (a, b) => Math.abs(a - b) <= 2 && a >= 8
      const bleeds = (x, frame) => x <= -frame * 0.05
      let ok, want
      if (anchor === 'all') { const v = Object.values(ins); ok = Math.max(...v) - Math.min(...v) <= 2 && Math.min(...v) >= 8; want = 'equal canvas inset on all four sides (+-2px)' }
      else {
        const vy = anchor[0] === 't' ? 't' : 'b', vx = anchor[1] === 'l' ? 'l' : 'r', oy = vy === 't' ? 'b' : 't', ox = vx === 'l' ? 'r' : 'l'
        ok = eq(ins[vy], ins[vx]) && bleeds(ins[oy], H) && bleeds(ins[ox], W)
        want = `equal insets on ${vy}${vx} (+-2px), window bleeds off ${oy} and ${ox} by >= 5% (cadence-xpost r1)`
      }
      add('post', 'post.insets', ok ? 'PASS' : 'FAIL', `l ${ins.l} t ${ins.t} r ${ins.r} b ${ins.b}`, want, `${w.el} ${w.w}x${w.h}`)
    }
  }
  if (seams.length) add('post', 'post.seams', P.seamText.length ? 'WARN' : 'PASS', P.seamText.length, 'strip seams fall in gutters (text across a seam is split between two carousel images)', P.seamText.slice(0, 6).map((s) => `x${s.seam} "${s.text}" y${s.y}`))
  if (P.alpha.length) add('edge', 'alpha.over-pattern', 'WARN', P.alpha.length, 'translucent fills sit on solid ground or carry a backdrop blur (DE-04)', P.alpha.slice(0, 6).map((a) => `"${a.text}" alpha ${a.alpha} over ${a.over} at ${a.x},${a.y}`))
  add('copy', 'copy.reference-names', P.banned.length ? 'FAIL' : 'PASS', P.banned.length, 'no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json)', P.banned)
  add('copy', 'copy.placeholder', P.placeholder.length ? 'FAIL' : 'PASS', P.placeholder.length, 'no stock brand or placeholder text (Acme, Lorem ipsum, TODO...)', P.placeholder)
}

// ---------- 6 exports ----------
const pngs = (flag('png', '') || '').split(',').filter(Boolean)
if (pngs.length) {
  const fmts = readJSON(path.join(root, 'system/x/formats.json'))
  const fmt = flag('format') ? fmts?.formats?.find((f) => f.id === flag('format')) : null
  if (flag('format') && !fmt) add('export', 'export.format', 'FAIL', flag('format'), 'a format id from system/x/formats.json')
  for (const f of pngs) {
    const p = path.resolve(root, f)
    if (!fs.existsSync(p)) { add('export', `export.${path.basename(f)}`, 'FAIL', 'missing', 'file exists', f); continue }
    const buf = fs.readFileSync(p), isPng = buf.slice(1, 4).toString() === 'PNG'
    const w = isPng ? buf.readUInt32BE(16) : null, h = isPng ? buf.readUInt32BE(20) : null, mb = buf.length / 1048576
    let ratioOk = true, ratioWant = 'any ratio'
    if (fmt && w) {
      const c = /strip/.test(path.basename(f)) && fmt.strip ? fmt.strip : fmt.canvas
      if (fmt.ratioRange && !/strip/.test(path.basename(f))) { ratioOk = w / h >= fmt.ratioRange[0] - 0.01 && w / h <= fmt.ratioRange[1] + 0.01; ratioWant = `ratio ${fmt.ratioRange.join('-')}` }
      else if (Array.isArray(c)) { const want = c[0] / c[1]; ratioOk = Math.abs(w / h - want) / want <= 0.02; ratioWant = `ratio ${c[0]}:${c[1]} (+-2%)` }
    }
    const st = !isPng ? 'WARN' : Math.max(w, h) < 2000 || !ratioOk || mb > 5 ? 'FAIL' : 'PASS'
    add('export', `export.${path.basename(f)}`, st, isPng ? `${w}x${h} ${mb.toFixed(2)}MB` : 'not a PNG', `long side >= 2000px (XP-11), ${ratioWant}, <= 5 MB (X API image limit)`, path.relative(root, p))
  }
}

// ---------- outputs ----------
const count = (s) => C.filter((c) => c.status === s).length
const summary = { pass: count('PASS'), warn: count('WARN'), fail: count('FAIL') }
const report = { tool: 'preflight', url, kind, name, generated: new Date().toISOString(), viewport: { W, H }, artboard, anchor, summary, steps, checks: C, ms: Date.now() - T0 }
fs.writeFileSync(path.join(out, 'preflight.json'), JSON.stringify(report, null, 1))
const order = { FAIL: 0, WARN: 1, PASS: 2, INFO: 3 }
const sorted = [...C].sort((a, b) => order[a.status] - order[b.status])
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
const md = [`# Preflight: ${name}`, '', `${url}  `, `kind \`${kind}\`, ${W}x${H}${artboard ? ' artboard' : ''}${anchor ? `, anchor ${anchor}` : ''}, ${report.generated.slice(0, 16).replace('T', ' ')} UTC`, '',
  `**${summary.fail ? `FAIL: ${summary.fail} fail` : 'PASS: 0 fail'}, ${summary.warn} warn, ${summary.pass} pass**`, '',
  '| step | status | fail | warn | seconds |', '|---|---|---|---|---|', ...steps.map((s) => `| ${s.step} | ${s.status} | ${s.fail} | ${s.warn} | ${(s.ms / 1000).toFixed(1)} |`), '',
  '| status | check | value | want | detail |', '|---|---|---|---|---|', ...sorted.filter((c) => c.status !== 'INFO' || c.group === 'grey').map((c) => `| ${c.status} | ${c.group}/${c.id} | ${esc(c.value)} | ${esc(c.want)} | ${esc(c.detail).slice(0, 400)} |`), ''].join('\n')
fs.writeFileSync(path.join(out, 'preflight.md'), md)
console.log(`preflight ${name} [${kind}] ${W}x${H}${artboard ? ' artboard' : ''} ${url}`)
for (const c of sorted) { if (c.status === 'INFO' || (c.status === 'PASS' && c.group === 'gate' && !has('verbose'))) continue; console.log(`  ${c.status.padEnd(4)} ${c.group}/${c.id}: ${c.value}${c.status !== 'PASS' ? `  (want ${c.want})${c.detail ? `\n         ${String(c.detail).slice(0, 260)}` : ''}` : ''}`) }
console.log(`${summary.fail ? 'FAIL' : 'PASS'} ${name}: ${summary.fail} fail, ${summary.warn} warn, ${summary.pass} pass in ${((Date.now() - T0) / 1000).toFixed(0)}s -> reports/${name}/preflight.md`)
process.exit(summary.fail ? 1 : 0)
