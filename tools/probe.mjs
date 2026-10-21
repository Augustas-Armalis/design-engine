#!/usr/bin/env node
// Pixel probe for replicas: read exact colours and find edges in a reference PNG/JPG instead of eyeballing.
//   node tools/probe.mjs <image> px x,y [x,y ...]          -> hex + rgb at each point
//   node tools/probe.mjs <image> row y [x0 x1]             -> runs of similar colour along a row (edges + fills)
//   node tools/probe.mjs <image> col x [y0 y1]             -> same down a column
//   node tools/probe.mjs <image> box x y w h               -> bbox of pixels that differ from the box's corner colour
// Coordinates are image pixels (a 2x capture: divide by 2 for CSS). --tol <n> sets the run tolerance (default 10).
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { extname, resolve } from 'node:path'

const args = process.argv.slice(2)
const tolI = args.indexOf('--tol'); const tol = tolI >= 0 ? +args.splice(tolI, 2)[1] : 10
const [img, mode, ...rest] = args
if (!img || !mode) { console.log('usage: node tools/probe.mjs <image> px|row|col|box ... [--tol n]'); process.exit(1) }
const mime = extname(img).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg'
const data = `data:${mime};base64,${readFileSync(resolve(img)).toString('base64')}`

const b = await chromium.launch(); const p = await b.newPage()
const out = await p.evaluate(async ({ data, mode, rest, tol }) => {
  const im = new Image(); im.src = data; await im.decode()
  const c = new OffscreenCanvas(im.width, im.height); const g = c.getContext('2d'); g.drawImage(im, 0, 0)
  const all = g.getImageData(0, 0, im.width, im.height).data
  const px = (x, y) => { const o = (y * im.width + x) * 4; return [all[o], all[o + 1], all[o + 2]] }
  const hex = (a) => '#' + a.map((v) => v.toString(16).padStart(2, '0')).join('')
  const near = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i]))) <= tol
  const runs = (pts) => { const r = []; let s = 0; for (let i = 1; i <= pts.length; i++) if (i === pts.length || !near(pts[i].c, pts[s].c)) { r.push(`${pts[s].k}..${pts[i - 1].k} ${hex(pts[s].c)}`); s = i } return r }
  const L = []
  if (mode === 'px') for (const s of rest) { const [x, y] = s.split(',').map(Number); const v = px(x, y); L.push(`${x},${y} ${hex(v)} rgb(${v.join(' ')})`) }
  if (mode === 'row' || mode === 'col') {
    const at = +rest[0], a = +(rest[1] ?? 0), z = +(rest[2] ?? (mode === 'row' ? im.width - 1 : im.height - 1)), pts = []
    for (let k = a; k <= z; k++) pts.push({ k, c: mode === 'row' ? px(k, at) : px(at, k) })
    L.push(...runs(pts))
  }
  if (mode === 'box') {
    const [x, y, w, h] = rest.map(Number), bg = px(x, y); let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (!near(px(i, j), bg)) { x0 = Math.min(x0, i); x1 = Math.max(x1, i); y0 = Math.min(y0, j); y1 = Math.max(y1, j) }
    L.push(`bg ${hex(bg)} content bbox x ${x0}..${x1} y ${y0}..${y1} (${x1 - x0 + 1}x${y1 - y0 + 1})`)
  }
  return [`${im.width}x${im.height}`, ...L]
}, { data, mode, rest, tol })
console.log(out.join('\n')); await b.close()
