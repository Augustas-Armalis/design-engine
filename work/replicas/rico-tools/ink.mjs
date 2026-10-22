#!/usr/bin/env node
// Batch ink boxes in one Chromium: node ink.mjs <image> [--tol 40] [--scale s] name:x,y,w,h ...
// For each region: bbox of pixels differing from the region's top-left colour by > tol (max channel), in image px and /scale.
// Also prints the darkest pixel colour in the region (text colour estimate) and the bg colour.
import { chromium } from 'playwright'
import fs from 'node:fs'
const a = process.argv.slice(2); const opt = (n, d) => { const i = a.indexOf('--' + n); if (i < 0) return d; const v = a[i + 1]; a.splice(i, 2); return v }
const tol = +opt('tol', 40), scale = +opt('scale', 1), bgArg = opt('bg', '')
const [img, ...regs] = a
const mime = img.endsWith('.png') ? 'image/png' : 'image/jpeg'
const data = `data:${mime};base64,${fs.readFileSync(img).toString('base64')}`
const b = await chromium.launch(); const p = await b.newPage()
const out = await p.evaluate(async ({ data, regs, tol, scale, bgArg }) => {
  const im = new Image(); im.src = data; await im.decode()
  const c = new OffscreenCanvas(im.width, im.height), g = c.getContext('2d'); g.drawImage(im, 0, 0)
  const L = [`${im.width}x${im.height}`]
  for (const r of regs) {
    const [name, box] = r.split(':'); const [x, y, w, h] = box.split(',').map(Number)
    const d = g.getImageData(x, y, w, h).data
    const bg = bgArg ? bgArg.match(/../g).map(v => parseInt(v, 16)) : [d[0], d[1], d[2]]
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1, dark = [255, 255, 255], dl = 1e9, n = 0
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const o = (j * w + i) * 4, px = [d[o], d[o + 1], d[o + 2]]
      if (Math.max(...px.map((v, k) => Math.abs(v - bg[k]))) > tol) { n++; x0 = Math.min(x0, i); x1 = Math.max(x1, i); y0 = Math.min(y0, j); y1 = Math.max(y1, j); const l = px[0] * .3 + px[1] * .59 + px[2] * .11; const bl = bg[0] * .3 + bg[1] * .59 + bg[2] * .11; const far = Math.abs(l - bl); if (-far < dl) { dl = -far; dark = px } }
    }
    const hx = v => '#' + v.map(q => q.toString(16).padStart(2, '0')).join('')
    if (x1 < 0) { L.push(`${name}: empty (bg ${hx(bg)})`); continue }
    const X0 = x + x0, Y0 = y + y0, W = x1 - x0 + 1, H = y1 - y0 + 1, s = scale
    L.push(`${name}: img ${X0},${Y0} ${W}x${H} | css ${(X0 / s).toFixed(2)},${(Y0 / s).toFixed(2)} ${(W / s).toFixed(2)}x${(H / s).toFixed(2)} | ink ${hx(dark)} bg ${hx(bg)} n${n}`)
  }
  return L
}, { data, regs, tol, scale, bgArg })
console.log(out.join('\n')); await b.close()
