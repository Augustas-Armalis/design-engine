#!/usr/bin/env node
// Computed-style diff between two renders: proves a revision round changed only what it meant to change
// (founder feedback-playbook rule 2: "diff computed styles against the loved build before shipping a tweak"; Kestrel r3
// sharpened every radius by ~4px and nobody saw it until the founder did).
//
//   node tools/style_diff.mjs <urlA> <urlB> [--selector main] [--out reports/<name>/style-diff.json]
//                             [--allow font-size,color,...] [--w 1440 --h 900] [--wait 4500] [--top 30] [--no-scroll] [--svg]
//
// Renders both at 1440x900 (dpr 1), scrolls through to fire in-view reveals, finishes finite animations, then pairs the
// visible elements under --selector (default body) by DOM path + own text, falling back to unique text + tag, then to the
// same path with changed text. For each pair it reports the computed properties that differ: font-size/weight/family,
// letter-spacing, line-height, color, background (colour + image), border (width/style/colour per side), border-radius
// (per corner), box-shadow, padding, gap, and width/height when they move more than 1px. Unpaired elements are listed as
// added/removed (SVG internals are compared for style but not size unless --svg). --allow takes property groups (font-size font-weight font-family letter-spacing line-height color
// background border border-radius box-shadow padding gap width height text structure); any change outside them exits 1.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d }
const VALUED = new Set(['--selector', '--out', '--allow', '--w', '--h', '--wait', '--top'])
const [A, B] = argv.filter((a, i) => !a.startsWith('--') && !VALUED.has(argv[i - 1]))
if (!A || !B || argv.includes('--help')) { console.error('usage: node tools/style_diff.mjs <urlA> <urlB> [--selector main] [--out reports/<name>/style-diff.json] [--allow groups] [--w --h --wait --top] [--no-scroll]'); process.exit(2) }
const sel = flag('selector', 'body'), W = +flag('w', 1440), H = +flag('h', 900), WAIT = +flag('wait', 4500), TOP = +flag('top', 30)
const outFile = path.resolve(root, flag('out', path.join('reports', 'style-diff', 'style-diff.json')))
const allow = flag('allow') ? new Set(flag('allow').split(/[,\s]+/).filter(Boolean)) : null

// property -> group (the vocabulary of --allow and of DIRECTION `changes:`)
const GROUPS = {
  fontSize: 'font-size', fontWeight: 'font-weight', fontFamily: 'font-family', letterSpacing: 'letter-spacing', lineHeight: 'line-height', color: 'color',
  backgroundColor: 'background', backgroundImage: 'background', boxShadow: 'box-shadow', rowGap: 'gap', columnGap: 'gap',
  paddingTop: 'padding', paddingRight: 'padding', paddingBottom: 'padding', paddingLeft: 'padding',
  borderTopLeftRadius: 'border-radius', borderTopRightRadius: 'border-radius', borderBottomRightRadius: 'border-radius', borderBottomLeftRadius: 'border-radius',
}
for (const s of ['Top', 'Right', 'Bottom', 'Left']) for (const k of ['Width', 'Style', 'Color']) GROUPS[`border${s}${k}`] = 'border'
const PROPS = Object.keys(GROUPS)

const collect = (page) => page.evaluate(({ sel, PROPS }) => {
  const host = document.querySelector(sel) || document.body
  const pathOf = (el) => {
    const parts = []
    for (let e = el; e && e !== host; e = e.parentElement) {
      const sib = [...(e.parentElement?.children || [])].filter((x) => x.tagName === e.tagName)
      parts.unshift(`${e.tagName.toLowerCase()}${sib.length > 1 ? `[${sib.indexOf(e) + 1}]` : ''}`)
    }
    return parts.join('>') || host.tagName.toLowerCase()
  }
  const own = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').trim().replace(/\s+/g, ' ').slice(0, 40)
  const out = []
  for (const el of [host, ...host.querySelectorAll('*')]) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el)
    if (r.width < 1 || r.height < 1 || s.display === 'none' || s.visibility === 'hidden') continue
    const props = {}; for (const p of PROPS) props[p] = s[p]
    const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/)[0] : el.className?.baseVal?.split(' ')[0]
    out.push({ path: pathOf(el), tag: el.tagName.toLowerCase(), label: `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${cls ? '.' + cls : ''}`.slice(0, 48), text: own(el) || (el.getAttribute('aria-label') || '').slice(0, 40), svgChild: !!el.parentElement?.closest('svg'), w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: Math.round(r.left), y: Math.round(r.top + scrollY), props })
  }
  return out
}, { sel, PROPS })

const render = async (browser, url) => {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
  await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch((e) => console.error(`goto ${url}: ${e.message}`))
  await page.waitForTimeout(WAIT)
  await page.evaluate(async (scroll) => {
    await document.fonts.ready
    if (scroll) { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)) } scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300)) }
    // finite entrances jump to their end; loops rewind to t=0 and pause, so two renders of one build diff to nothing
    document.getAnimations().forEach((a) => { try { if (a.effect.getComputedTiming().iterations !== Infinity) a.finish(); else { a.pause(); a.currentTime = 0 } } catch {} })
    await new Promise((r) => setTimeout(r, 100))
  }, !argv.includes('--no-scroll'))
  // JS-driven timelines (motion/react, count-ups) are not Web Animations: wait until two snapshots 500ms apart agree (max 6s)
  const snap = () => page.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => !e.parentElement?.closest('svg')).map((e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}` }).join(',') + document.body.innerText)
  let prev = await snap(), settled = false
  for (let t = 0; t < 12 && !settled; t++) { await page.waitForTimeout(500); const cur = await snap(); settled = cur === prev; prev = cur }
  if (!settled) console.error(`note: ${url} was still moving after ${WAIT + 6000}ms; diffs may include animation frames`)
  const els = await collect(page); await page.close(); return els
}

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const [ea, eb] = [await render(browser, A), await render(browser, B)]
await browser.close()

// ---- pairing ----
const pairs = []; const usedA = new Set(), usedB = new Set()
const index = (list, key) => { const m = new Map(); list.forEach((e, i) => { const k = key(e); if (!m.has(k)) m.set(k, []); m.get(k).push(i) }); return m }
const pass = (keyFn, via, filter = () => true) => {
  const ib = index(eb, keyFn)
  ea.forEach((e, i) => {
    if (usedA.has(i) || !filter(e)) return
    const cand = (ib.get(keyFn(e)) || []).filter((j) => !usedB.has(j))
    if (!cand.length) return
    if (via === 'text' && cand.length > 1) return // ambiguous text: leave for the path pass
    usedA.add(i); usedB.add(cand[0]); pairs.push({ a: e, b: eb[cand[0]], via })
  })
}
pass((e) => `${e.path}|${e.text}`, 'path+text')
pass((e) => `${e.tag}|${e.text}`, 'text', (e) => e.text.length >= 3)
pass((e) => e.path, 'path')
const removed = ea.filter((_, i) => !usedA.has(i)), added = eb.filter((_, j) => !usedB.has(j))

// ---- diff ----
const changes = []; const byGroup = {}
for (const { a, b, via } of pairs) {
  const d = []
  for (const p of PROPS) {
    if (a.props[p] === b.props[p]) continue
    // a border colour/style with no width on either side is invisible (it follows currentColor): not a change
    const side = p.match(/^border(Top|Right|Bottom|Left)(Color|Style)$/); if (side && parseFloat(a.props[`border${side[1]}Width`]) === 0 && parseFloat(b.props[`border${side[1]}Width`]) === 0) continue
    d.push({ prop: p, group: GROUPS[p], from: a.props[p], to: b.props[p] })
  }
  // geometry inside an <svg> is drawing (often JS-animated pulses), not layout: sized only with --svg
  const geo = !a.svgChild || argv.includes('--svg')
  if (geo && Math.abs(a.w - b.w) > 1) d.push({ prop: 'width', group: 'width', from: a.w, to: b.w })
  if (geo && Math.abs(a.h - b.h) > 1) d.push({ prop: 'height', group: 'height', from: a.h, to: b.h })
  if (via === 'path' && a.text !== b.text) d.push({ prop: 'text', group: 'text', from: a.text, to: b.text })
  if (!d.length) continue
  // collapse per-side/per-corner props with one value change into one line
  const seen = new Set(); const lines = []
  for (const c of d) { const k = `${c.group}|${c.from}|${c.to}`; if (seen.has(k)) continue; seen.add(k); lines.push(c) }
  changes.push({ el: b.label, path: b.path, text: b.text, via, count: lines.length, changes: lines })
  for (const c of lines) { const g = (byGroup[c.group] ||= { elements: 0, samples: [] }); g.elements++; if (g.samples.length < 3) g.samples.push(`${b.label} "${b.text.slice(0, 18)}": ${c.prop} ${c.from} -> ${c.to}`) }
}
changes.sort((x, y) => y.count - x.count)
const groupsRanked = Object.entries(byGroup).sort((x, y) => y[1].elements - x[1].elements)
const disallowed = allow ? groupsRanked.filter(([g]) => !allow.has(g)).map(([g]) => g).concat(!allow.has('structure') && (added.length || removed.length) ? ['structure'] : []) : []

const result = { a: A, b: B, selector: sel, viewport: { W, H }, generated: new Date().toISOString(), elements: { a: ea.length, b: eb.length, paired: pairs.length, changed: changes.length, added: added.length, removed: removed.length },
  groups: Object.fromEntries(groupsRanked), allow: allow ? [...allow] : null, disallowed, changes, added: added.slice(0, 200).map((e) => ({ el: e.label, path: e.path, text: e.text, w: e.w, h: e.h })), removed: removed.slice(0, 200).map((e) => ({ el: e.label, path: e.path, text: e.text, w: e.w, h: e.h })) }
fs.mkdirSync(path.dirname(outFile), { recursive: true }); fs.writeFileSync(outFile, JSON.stringify(result, null, 1))

console.log(`style diff ${A}  ->  ${B}  (${sel}, ${W}x${H})`)
console.log(`elements: ${ea.length} -> ${eb.length}; paired ${pairs.length} (${pairs.filter((p) => p.via !== 'path+text').length} by fallback), changed ${changes.length}, added ${added.length}, removed ${removed.length}`)
console.log('\nproperty groups changed (elements):')
for (const [g, v] of groupsRanked) console.log(`  ${(allow && !allow.has(g) ? '! ' : '  ') + g.padEnd(15)} ${String(v.elements).padStart(4)}   e.g. ${v.samples[0]}`)
if (!groupsRanked.length) console.log('    none')
// identical change sets (a row of chips restyled together) print once with a count
const sig = new Map()
for (const c of changes) { const k = c.changes.filter((x) => x.prop !== 'text' && x.prop !== 'width' && x.prop !== 'height').map((x) => `${x.prop}:${x.from}>${x.to}`).join('|') || c.path; if (!sig.has(k)) sig.set(k, []); sig.get(k).push(c) }
const ranked = [...sig.values()].sort((x, y) => y[0].count * y.length - x[0].count * x.length)
console.log(`\ntop ${Math.min(TOP, ranked.length)} change sets (${changes.length} elements):`)
for (const g of ranked.slice(0, TOP)) { const c = g[0]; console.log(`  ${g.length > 1 ? `x${g.length} ` : ''}${c.el} "${c.text.slice(0, 24)}"${g.length > 1 ? ` (+${g.slice(1, 3).map((o) => `"${o.text.slice(0, 12)}"`).join(', ')}${g.length > 3 ? ', ...' : ''})` : ''} [${c.via}]: ${c.changes.map((x) => `${x.prop} ${String(x.from).slice(0, 40)} -> ${String(x.to).slice(0, 40)}`).join('; ').slice(0, 300)}`) }
if (added.length || removed.length) console.log(`\nstructure: +${added.length} / -${removed.length} elements (e.g. +${added.slice(0, 3).map((e) => `${e.label} "${e.text.slice(0, 16)}"`).join(', ') || '-'}; -${removed.slice(0, 3).map((e) => `${e.label} "${e.text.slice(0, 16)}"`).join(', ') || '-'})`)
console.log(`\n-> ${path.relative(root, outFile)}`)
if (allow) { if (disallowed.length) { console.log(`UNINTENDED CHANGES: ${disallowed.join(', ')} (allowed: ${[...allow].join(', ')})`); process.exit(1) } console.log(`only allowed groups changed (${[...allow].join(', ')})`) }
