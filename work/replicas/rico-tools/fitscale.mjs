#!/usr/bin/env node
// Find the export scale: node fitscale.mjs --font SF|Inter --w 400,500 "text|inkW" ...  For scales 1..6 step 0.05 report how well every
// string lands on a whole (or half) px size at one weight/tracking. Ink width is measured at the candidate size directly.
import { chromium } from 'playwright'
import fs from 'node:fs'
const a = process.argv.slice(2); const opt = (n, d) => { const i = a.indexOf('--' + n); if (i < 0) return d; const v = a[i + 1]; a.splice(i, 2); return v }
const font = opt('font', 'SF'), wts = opt('w', '400,500').split(',').map(Number), lss = opt('ls', '0,-0.15,-0.3').split(',').map(Number)
const smin = +opt('smin', 1), smax = +opt('smax', 6), step = +opt('step', 0.05)
const items = a.map(s => { const [t, w] = s.split('|'); return { t, w: +w } })
const NM = '/Users/augustas/Documents/Larpo front-end engine/work/replicas/app/node_modules/@fontsource-variable'
const ff = { Inter: `${NM}/inter/files/inter-latin-wght-normal.woff2`, Geist: `${NM}/geist/files/geist-latin-wght-normal.woff2` }
const fam = font === 'SF' ? 'system-ui' : font
const b = await chromium.launch(); const p = await b.newPage()
await p.setContent(ff[font] ? `<style>@font-face{font-family:${font};src:url(data:font/woff2;base64,${fs.readFileSync(ff[font]).toString('base64')}) format('woff2');font-weight:100 900}</style><div style="font-family:${font}">x</div>` : '<div>x</div>')
await p.evaluate(f => document.fonts.load(`500 16px ${f}`), fam)
const res = await p.evaluate(({ items, fam, wts, lss, smin, smax, step }) => {
  const c = document.createElement('canvas').getContext('2d')
  const inkAt = (t, size, wt, ls) => { c.font = `${wt} ${size}px ${fam}`; c.letterSpacing = `${ls}px`; const m = c.measureText(t); return m.actualBoundingBoxRight + m.actualBoundingBoxLeft }
  const out = []
  for (let S = smin; S <= smax + 1e-9; S += step) {
    let tot = 0; const pick = []
    for (const it of items) {
      let best = { err: 1e9 }
      for (let size = 9; size <= 40; size += 1) for (const wt of wts) for (const ls of lss) { const e = Math.abs(inkAt(it.t, size, wt, ls) - it.w / S); if (e < best.err) best = { err: e, size, wt, ls } }
      tot += best.err; pick.push(`${best.size}/${best.wt}/${best.ls}`)
    }
    out.push({ S: +S.toFixed(3), err: tot / items.length, pick: pick.join(' ') })
  }
  return out.sort((x, y) => x.err - y.err).slice(0, 8).map(o => `S ${o.S}  mean err ${o.err.toFixed(3)} css px  ${o.pick}`)
}, { items, fam, wts, lss, smin, smax, step })
console.log(res.join('\n')); await b.close()
