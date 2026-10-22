#!/usr/bin/env node
// Solve font family/size/weight/tracking from ink widths. node fit.mjs --scale 4 --fonts "Inter,SF" "text|inkWpx" ...
// Fonts: Inter (fontsource Inter Variable), SF (system-ui = SF Pro on macOS), Geist, Manrope, plus any CSS family name.
import { chromium } from 'playwright'
import fs from 'node:fs'
const a = process.argv.slice(2); const opt = (n, d) => { const i = a.indexOf('--' + n); if (i < 0) return d; const v = a[i + 1]; a.splice(i, 2); return v }
const scale = +opt('scale', 1), fonts = opt('fonts', 'Inter,SF').split(','), wts = opt('w', '400,500,600').split(',').map(Number)
const lss = opt('ls', '0,-0.1,-0.15,-0.2,-0.31,-0.4').split(',').map(Number)
const items = a.map(s => { const [t, w] = s.split('|'); return { t, w: +w / scale } })
const NM = '/Users/augustas/Documents/Larpo front-end engine/work/replicas/app/node_modules/@fontsource-variable'
const ff = { Inter: `${NM}/inter/files/inter-latin-wght-normal.woff2`, Geist: `${NM}/geist/files/geist-latin-wght-normal.woff2`, Manrope: `${NM}/manrope/files/manrope-latin-wght-normal.woff2`, GeistMono: `${NM}/geist-mono/files/geist-mono-latin-wght-normal.woff2`, Lora: `${NM}/lora/files/lora-latin-wght-normal.woff2`, Serif4: `${NM}/source-serif-4/files/source-serif-4-latin-wght-normal.woff2` }
const faces = Object.entries(ff).filter(([k, f]) => fonts.includes(k) && fs.existsSync(f)).map(([k, f]) => `@font-face{font-family:${k};src:url(data:font/woff2;base64,${fs.readFileSync(f).toString('base64')}) format('woff2');font-weight:100 900}`).join('')
const b = await chromium.launch(); const p = await b.newPage()
await p.setContent(`<style>${faces}</style>` + fonts.map(f => `<div style="font-family:${f === 'SF' ? 'system-ui' : f}">x</div>`).join(''))
for (const f of fonts) await p.evaluate(f => document.fonts.load(`500 16px ${f}`), f === 'SF' ? 'system-ui' : f)
const res = await p.evaluate(({ items, fonts, wts, lss }) => {
  const c = document.createElement('canvas').getContext('2d'); const out = []
  for (const f of fonts) {
    const fam = f === 'SF' ? 'system-ui' : f; let tot = 0; const rows = []
    for (const it of items) {
      const cands = []
      for (let size = 9; size <= 72; size += 0.5) for (const wt of wts) for (const ls of lss) {
        c.font = `${wt} ${size}px ${fam}`; c.letterSpacing = `${ls}px`
        const m = c.measureText(it.t); const ink = m.actualBoundingBoxRight + m.actualBoundingBoxLeft
        cands.push({ size, wt, ls, ink, err: Math.abs(ink - it.w) })
      }
      cands.sort((x, y) => x.err - y.err); tot += cands[0].err
      rows.push(`  ${it.t.slice(0, 28).padEnd(28)} target ${it.w.toFixed(2)}  ` + cands.slice(0, 5).map(x => `${x.size}/${x.wt}/${x.ls}=${x.ink.toFixed(2)}`).join('  '))
    }
    out.push(`## ${f}  mean best err ${(tot / items.length).toFixed(3)}`, ...rows)
  }
  return out
}, { items, fonts, wts, lss })
console.log(res.join('\n')); await b.close()
