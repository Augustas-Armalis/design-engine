#!/usr/bin/env node
// Batch edge scans in one Chromium: node edges.mjs <img> --scale S --tol T  row:y:x0:x1 col:x:y0:y1 ...  (CSS px in, CSS px out)
import { chromium } from 'playwright'
import fs from 'node:fs'
const a = process.argv.slice(2); const opt = (n, d) => { const i = a.indexOf('--' + n); if (i < 0) return d; const v = a[i + 1]; a.splice(i, 2); return v }
const S = +opt('scale', 1), tol = +opt('tol', 4), minrun = +opt('min', 0)
const [img, ...scans] = a
const mime = img.endsWith('.png') ? 'image/png' : 'image/jpeg'
const b = await chromium.launch(); const p = await b.newPage()
const out = await p.evaluate(async ({ data, scans, S, tol, minrun }) => {
  const im = new Image(); im.src = data; await im.decode()
  const c = new OffscreenCanvas(im.width, im.height), g = c.getContext('2d'); g.drawImage(im, 0, 0)
  const hx = v => '#' + v.map(q => q.toString(16).padStart(2, '0')).join('')
  const L = []
  for (const s of scans) {
    const [m, at, f, t] = s.split(':'); const A = Math.round(+at * S), F = Math.round(+f * S), T = Math.round(+t * S)
    const d = m === 'row' ? g.getImageData(F, A, T - F + 1, 1).data : g.getImageData(A, F, 1, T - F + 1).data
    const n = T - F + 1, runs = []; let st = 0
    const px = i => [d[i * 4], d[i * 4 + 1], d[i * 4 + 2]]
    for (let i = 1; i <= n; i++) { if (i === n || Math.max(...px(i).map((v, k) => Math.abs(v - px(st)[k]))) > tol) { runs.push([st, i - 1, px(st)]); st = i } }
    L.push(`${s}: ` + runs.filter(r => r[1] - r[0] + 1 >= minrun).map(r => `${((F + r[0]) / S).toFixed(2)}-${((F + r[1] + 1) / S).toFixed(2)} ${hx(r[2])}`).join(' | '))
  }
  return L
}, { data: `data:${mime};base64,${fs.readFileSync(img).toString('base64')}`, scans, S, tol, minrun })
console.log(out.join('\n')); await b.close()
