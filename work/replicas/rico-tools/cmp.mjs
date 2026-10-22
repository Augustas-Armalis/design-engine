#!/usr/bin/env node
// Box-by-box registration: node cmp.mjs <url> <ref.png> <regions.txt> --w W --h H --scale S [--tol 40] [--save out.png] [--only name,name]
// regions.txt lines: name x y w h   (CSS px; the region should start on background). Renders ours at the ref's scale,
// computes the ink bbox in each region in both images (bg = region's top-left pixel of each image) and prints deltas in CSS px.
import { chromium } from 'playwright'
import fs from 'node:fs'
const a = process.argv.slice(2); const opt = (n, d) => { const i = a.indexOf('--' + n); if (i < 0) return d; const v = a[i + 1]; a.splice(i, 2); return v }
const W = +opt('w', 1440), H = +opt('h', 900), S = +opt('scale', 2), tol = +opt('tol', 40), save = opt('save', ''), only = opt('only', '')
const [url, ref, regFile] = a
let regs = fs.readFileSync(regFile, 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(l => { const [n, ...v] = l.split(/\s+/); return [n, ...v.map(Number)] })
if (only) regs = regs.filter(r => only.split(',').some(o => r[0].startsWith(o)))
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: S })
await p.goto(url, { waitUntil: 'networkidle' }).catch(() => {}); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200)
const shot = await p.screenshot(); if (save) fs.writeFileSync(save, shot)
const q = await b.newPage()
const mime = ref.endsWith('.png') ? 'image/png' : 'image/jpeg'
const res = await q.evaluate(async ({ A, B, regs, S, tol }) => {
  const load = async (src) => { const im = new Image(); im.src = src; await im.decode(); const c = new OffscreenCanvas(im.width, im.height); const g = c.getContext('2d'); g.drawImage(im, 0, 0); return { g, w: im.width, h: im.height } }
  const ra = await load(A), rb = await load(B)
  const k = ra.w / rb.w // ref px per our px
  const ink = (R, x, y, w, h) => {
    x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h)
    const d = R.g.getImageData(x, y, w, h).data; const bg = [d[0], d[1], d[2]]; let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1, n = 0, dk = 0, dc = bg
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const o = (j * w + i) * 4; const df = Math.max(Math.abs(d[o] - bg[0]), Math.abs(d[o + 1] - bg[1]), Math.abs(d[o + 2] - bg[2])); if (df > tol) { n++; if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; if (df > dk) { dk = df; dc = [d[o], d[o + 1], d[o + 2]] } } }
    const hx = c => '#' + c.map(v => v.toString(16).padStart(2, '0')).join('')
    return x1 < 0 ? null : { x: x + x0, y: y + y0, w: x1 - x0 + 1, h: y1 - y0 + 1, n, c: hx(dc), bg: hx(bg) }
  }
  const out = []
  for (const [n, x, y, w, h] of regs) {
    const s1 = S * k, s2 = S
    const A1 = ink(ra, x * s1, y * s1, w * s1, h * s1), B1 = ink(rb, x * s2, y * s2, w * s2, h * s2)
    if (!A1 || !B1) { out.push(`${n.padEnd(16)} ${A1 ? `ref ${(A1.x / s1).toFixed(2)},${(A1.y / s1).toFixed(2)} ${(A1.w / s1).toFixed(2)}x${(A1.h / s1).toFixed(2)} ${A1.c}/${A1.bg}` : 'REF EMPTY'} ${B1 ? '' : 'OURS EMPTY'}`); continue }
    const f = v => (v >= 0 ? '+' : '') + v.toFixed(2)
    const dx = B1.x / s2 - A1.x / s1, dy = B1.y / s2 - A1.y / s1, dw = B1.w / s2 - A1.w / s1, dh = B1.h / s2 - A1.h / s1
    const bad = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dw), Math.abs(dh)) > 1 ? ' <<' : ''
    out.push(`${n.padEnd(16)} ref ${(A1.x / s1).toFixed(2)},${(A1.y / s1).toFixed(2)} ${(A1.w / s1).toFixed(2)}x${(A1.h / s1).toFixed(2)} ${A1.c}/${A1.bg} | d ${f(dx)} ${f(dy)} ${f(dw)} ${f(dh)} ours ${B1.c}/${B1.bg} ink ${(B1.n / (s2 * s2) / Math.max(1, A1.n / (s1 * s1))).toFixed(2)}${bad}`)
  }
  return out
}, { A: `data:${mime};base64,${fs.readFileSync(ref).toString('base64')}`, B: `data:image/png;base64,${shot.toString('base64')}`, regs, S, tol })
console.log(res.join('\n')); await b.close()
