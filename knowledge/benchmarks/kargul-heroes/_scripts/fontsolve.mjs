#!/usr/bin/env node
// Solve a headline's family / weight / size / tracking from measured ink widths and ink heights of its lines.
//   node fontsolve.mjs <h1.json> [--top 4] [--only id,id]
// h1.json: [{ id, lines: [[text, inkWidthCss, inkHeightCss], ...] }]. One Chromium; fonts from Google Fonts + system.
// Model per family x weight: ink width(line) = size * u(line) + ls * (glyphs - 1); ink height = size * v(line).
// Size and tracking are least-squares fitted on the widths (one line: size from the height), then scored by the
// relative width residual + relative height residual. Tracking outside -0.09..+0.03 em is penalised.
import { chromium } from '/Users/augustas/Documents/Larpo front-end engine/node_modules/playwright/index.mjs'
import fs from 'node:fs'
const a = process.argv.slice(2); const opt = (n, d) => { const i = a.indexOf('--' + n); if (i < 0) return d; const v = a[i + 1]; a.splice(i, 2); return v }
const top = +opt('top', 4), only = opt('only', '')
let items = JSON.parse(fs.readFileSync(a[0], 'utf8')).filter(x => x.lines.length && x.lines.every(l => l[1] > 0))
if (only) items = items.filter(x => only.split(',').includes(x.id))
const VAR = ['Inter', 'Inter Tight', 'Geist', 'DM Sans', 'Manrope', 'Instrument Sans', 'Plus Jakarta Sans', 'Figtree', 'Onest', 'Hanken Grotesk', 'Schibsted Grotesk', 'Bricolage Grotesque', 'Funnel Display', 'Albert Sans', 'Sora', 'Outfit', 'Urbanist', 'Red Hat Display', 'Libre Franklin', 'Public Sans', 'Work Sans', 'Rubik', 'Archivo', 'Host Grotesk', 'Space Grotesk', 'Source Serif 4', 'Lora', 'Newsreader', 'Fraunces', 'EB Garamond', 'Literata', 'Crimson Pro', 'Playfair Display', 'Gelasio', 'Young Serif', 'Geist Mono', 'JetBrains Mono', 'Mona Sans', 'Hubot Sans', 'Golos Text', 'Wix Madefor Display', 'Familjen Grotesk', 'Gantari', 'Be Vietnam Pro', 'Lexend', 'Epilogue', 'Nunito Sans', 'Rethink Sans', 'Afacad', 'Spline Sans']
const STATIC = { 'Chakra Petch': [300, 400, 500, 600, 700], 'Instrument Serif': [400], 'Space Mono': [400, 700], 'IBM Plex Sans': [300, 400, 500, 600, 700], 'IBM Plex Mono': [400, 500], 'DM Serif Display': [400], 'Libre Caslon Text': [400, 700], 'Poppins': [300, 400, 500, 600, 700], 'Montserrat': [400, 500, 600, 700], 'Satoshi': [] }
const SYS = { 'system-ui': [300, 400, 500, 600, 700], 'Helvetica Neue': [300, 400, 500, 700], 'Georgia': [400, 700], 'Times New Roman': [400, 700], 'Aspekta': [300, 400, 500, 600, 700], 'Clash Display': [400, 500, 600, 700], 'Avenir Next': [400, 500, 600, 700] }
const EXTRA = JSON.parse(process.env.EXTRA || '[]') // [[family, [weights], cssUrl]]
const fams = [...EXTRA.map(([f, w]) => [f, w]), ...VAR.map(f => [f, [300, 350, 400, 450, 500, 550, 600, 650, 700]]), ...Object.entries(STATIC).filter(([, w]) => w.length), ...Object.entries(SYS)]
const css = VAR.map(f => `family=${f.replace(/ /g, '+')}:wght@300..700`).concat(Object.entries(STATIC).filter(([, w]) => w.length).map(([f, w]) => `family=${f.replace(/ /g, '+')}:wght@${w.join(';')}`))
const links = []
for (let i = 0; i < css.length; i += 12) links.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${css.slice(i, i + 12).join('&')}&display=block">`)
for (const [, , u] of EXTRA) links.push(`<link rel="stylesheet" href="${u}">`)
const ONLYF = process.env.FAMS ? process.env.FAMS.split(',') : null
const b = await chromium.launch(); const p = await b.newPage()
await p.setContent(`<html><head>${links.join('')}</head><body></body></html>`, { waitUntil: 'networkidle' })
const allText = [...new Set(items.flatMap(x => x.lines.map(l => l[0])))].join(' ')
await p.evaluate(async ({ fams, allText }) => { const ps = []; for (const [f, ws] of fams) for (const w of ws) ps.push(document.fonts.load(`${w} 40px "${f}"`, allText).catch(() => null)); await Promise.all(ps) }, { fams, allText })
const res = await p.evaluate(({ items, fams, top, ONLYF }) => {
  const c = document.createElement('canvas').getContext('2d'); const out = []
  const ok = (f, w) => document.fonts.check(`${w} 40px "${f}"`) && [...document.fonts].some(ff => ff.family.replace(/"/g, '') === f && ff.status === 'loaded') || ['system-ui', 'Helvetica Neue', 'Georgia', 'Times New Roman', 'Aspekta', 'Clash Display', 'Avenir Next'].includes(f) || f.startsWith('FS ')
  for (const it of items) {
    const cands = []
    for (const [f, ws] of fams) for (const w of ws) {
      if (ONLYF && !ONLYF.includes(f)) continue
      if (!ok(f, w)) continue
      c.font = `${w} 100px "${f}"`; c.letterSpacing = '0px'
      const L = it.lines.map(([t, W, Hh]) => { const m = c.measureText(t); return { t, W, Hh, u: (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) / 100, v: (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) / 100, n: [...t].length } })
      // width equations: every line, plus every word when word widths were measured
      const E = L.map(l => ({ W: l.W, u: l.u, n1: l.n - 1 }))
      for (const ln of it.lines) if (ln[3]) ln[0].split(' ').forEach((wd, i) => { const m = c.measureText(wd); E.push({ W: ln[3][i], u: (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) / 100, n1: [...wd].length - 1 }) })
      let size, ls
      if (E.length >= 2) {
        let suu = 0, sun = 0, snn = 0, suw = 0, snw = 0
        for (const l of E) { suu += l.u * l.u; sun += l.u * l.n1; snn += l.n1 * l.n1; suw += l.u * l.W; snw += l.n1 * l.W }
        const det = suu * snn - sun * sun
        if (Math.abs(det) < 1e-6) { size = L[0].Hh / L[0].v; ls = 0 } else { size = (suw * snn - sun * snw) / det; ls = (suu * snw - sun * suw) / det }
      } else { size = L[0].Hh / L[0].v; ls = (L[0].W - size * L[0].u) / (L[0].n - 1) }
      if (!(size > 8 && size < 200)) continue
      let ew = 0, eh = 0
      for (const l of E) ew += Math.abs(size * l.u + ls * l.n1 - l.W) / Math.max(l.W, 1)
      for (const l of L) eh += Math.abs(size * l.v - l.Hh) / l.Hh
      ew /= E.length; eh /= L.length
      const lsem = ls / size; const pen = lsem < -0.09 ? (-0.09 - lsem) * 4 : lsem > 0.03 ? (lsem - 0.03) * 4 : 0
      cands.push({ f, w, size: +size.toFixed(1), lsem: +lsem.toFixed(3), ew: +(ew * 100).toFixed(2), eh: +(eh * 100).toFixed(2), score: ew + eh * 0.6 + pen })
    }
    cands.sort((x, y) => x.score - y.score)
    // keep best weight per family
    const seen = new Set(); const best = []
    for (const x of cands) { if (seen.has(x.f)) continue; seen.add(x.f); best.push(x); if (best.length >= top) break }
    out.push({ id: it.id, best })
  }
  return out
}, { items, fams, top, ONLYF })
for (const r of res) console.log(r.id.padEnd(22), r.best.map(x => `${x.f} ${x.w} ${x.size}px ls${x.lsem}em (w${x.ew}% h${x.eh}%)`).join(' | '))
fs.writeFileSync(a[0].replace(/\.json$/, '-solved.json'), JSON.stringify(res, null, 1))
await b.close()
