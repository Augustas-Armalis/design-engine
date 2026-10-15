#!/usr/bin/env node
// trace_logo.mjs: turn a raster logo (png/jpg/webp, e.g. a Pinterest reference) into a clean single-colour SVG mark.
//
//   node tools/trace_logo.mjs <image> <out.svg> [--threshold 128] [--invert auto|yes|no] [--scale 4]
//        [--smooth 2] [--eps 0.35] [--min-area 0.002] [--pad 0] [--sheet out-compare.png]
//
// How: render the image to a canvas in headless Chromium (upscaled with bilinear smoothing so the contour is sub-pixel),
// decide which side is "ink" from the corner pixels (dark mark on light or light mark on dark), run marching squares with
// linear interpolation, chain the segments into closed loops, drop specks, smooth (moving average), simplify (RDP), and
// write each loop as Catmull-Rom cubic Béziers into one evenodd path, normalised to a 100-unit viewBox, fill=currentColor.
// --sheet writes a side-by-side of the source crop and the traced SVG at 256/64/32/16 px for the eye check.
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const pos = args.filter((a, i) => !a.startsWith('--') && !(args[i - 1] || '').startsWith('--'))
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d }
const [src, out] = pos
if (!src || !out) { console.error('usage: node tools/trace_logo.mjs <image> <out.svg> [--threshold 128] [--invert auto|yes|no] [--scale 4] [--smooth 2] [--eps 0.35] [--min-area 0.002] [--pad 0] [--sheet compare.png]'); process.exit(1) }
const TH = +opt('threshold', 128), SCALE = +opt('scale', 4), SMOOTH = +opt('smooth', 2), EPS = +opt('eps', 0.35)
const MINA = +opt('min-area', 0.002), PAD = +opt('pad', 0), INV = opt('invert', 'auto'), SHEET = opt('sheet', '')

const ext = path.extname(src).slice(1).toLowerCase().replace('jpg', 'jpeg')
const dataUrl = `data:image/${ext};base64,${fs.readFileSync(src).toString('base64')}`
const browser = await chromium.launch()
const page = await browser.newPage()
const img = await page.evaluate(async ({ dataUrl, SCALE }) => {
  const im = new Image(); im.src = dataUrl; await im.decode()
  const w = im.naturalWidth * SCALE, h = im.naturalHeight * SCALE
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const g = c.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'
  g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); g.drawImage(im, 0, 0, w, h)
  const d = g.getImageData(0, 0, w, h).data, L = new Array(w * h)
  for (let i = 0; i < w * h; i++) L[i] = Math.round(0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2])
  return { w, h, L }
}, { dataUrl, SCALE })
const { w, h, L } = img

// ink side: corners are background. Light corners -> ink is dark (value = 255 - L), else ink is light.
const corners = [0, w - 1, (h - 1) * w, h * w - 1].map((i) => L[i])
const lightBg = corners.reduce((a, b) => a + b, 0) / 4 > 128
const inv = INV === 'auto' ? lightBg : INV === 'yes'
const v = (x, y) => { if (x < 0 || y < 0 || x >= w || y >= h) return 0; const l = L[y * w + x]; return inv ? 255 - l : l }

// marching squares on the ink field, iso = TH; edges keyed so segments can be chained
const segs = new Map(), pts = new Map()
const key = (p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`
const lerp = (x0, y0, v0, x1, y1, v1) => { const t = (TH - v0) / (v1 - v0); return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t] }
const table = { 1: [['L', 'B']], 2: [['B', 'R']], 3: [['L', 'R']], 4: [['R', 'T']], 5: [['L', 'T'], ['R', 'B']], 6: [['B', 'T']], 7: [['L', 'T']],
  8: [['T', 'L']], 9: [['T', 'B']], 10: [['T', 'R'], ['B', 'L']], 11: [['T', 'R']], 12: [['R', 'L']], 13: [['R', 'B']], 14: [['B', 'L']] }
for (let y = -1; y < h; y++) for (let x = -1; x < w; x++) {
  const a = v(x, y), b = v(x + 1, y), c = v(x + 1, y + 1), d = v(x, y + 1)
  const idx = (a > TH ? 8 : 0) | (b > TH ? 4 : 0) | (c > TH ? 2 : 0) | (d > TH ? 1 : 0)
  if (idx === 0 || idx === 15) continue
  const E = { T: () => lerp(x, y, a, x + 1, y, b), R: () => lerp(x + 1, y, b, x + 1, y + 1, c),
    B: () => lerp(x, y + 1, d, x + 1, y + 1, c), L: () => lerp(x, y, a, x, y + 1, d) }
  for (const [p, q] of table[idx]) {
    const P = E[p](), Q = E[q](), kp = key(P), kq = key(Q)
    if (kp === kq) continue
    pts.set(kp, P); pts.set(kq, Q)
    ;(segs.get(kp) || segs.set(kp, []).get(kp)).push(kq)
    ;(segs.get(kq) || segs.set(kq, []).get(kq)).push(kp)
  }
}
// chain into loops: undirected walk over the segment graph (each contour point has two neighbours)
const loops = [], seen = new Set()
for (const k0 of segs.keys()) {
  if (seen.has(k0)) continue
  const loop = []; let prev = null, cur = k0
  for (let guard = 0; guard < 1e7 && cur && !seen.has(cur); guard++) {
    seen.add(cur); loop.push(pts.get(cur))
    const nb = segs.get(cur).filter((k) => k !== prev && !seen.has(k))
    prev = cur; cur = nb[0]
  }
  if (loop.length > 8) loops.push(loop)
}
const area = (P) => { let s = 0; for (let i = 0; i < P.length; i++) { const [x0, y0] = P[i], [x1, y1] = P[(i + 1) % P.length]; s += x0 * y1 - x1 * y0 } return s / 2 }
const smooth = (P, r) => P.map((_, i) => { let sx = 0, sy = 0; for (let k = -r; k <= r; k++) { const q = P[(i + k + P.length) % P.length]; sx += q[0]; sy += q[1] } return [sx / (2 * r + 1), sy / (2 * r + 1)] })
const rdp = (P, e) => {
  if (P.length < 3) return P
  const [a, b] = [P[0], P[P.length - 1]], dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1
  let md = 0, mi = 0
  for (let i = 1; i < P.length - 1; i++) { const d = Math.abs(dy * P[i][0] - dx * P[i][1] + b[0] * a[1] - b[1] * a[0]) / n; if (d > md) { md = d; mi = i } }
  return md > e ? [...rdp(P.slice(0, mi + 1), e).slice(0, -1), ...rdp(P.slice(mi), e)] : [a, b]
}
const kept = loops.filter((P) => Math.abs(area(P)) > MINA * w * h)
  .map((P) => { let Q = P; for (let i = 0; i < SMOOTH; i++) Q = smooth(Q, 2); const half = Math.floor(Q.length / 2); return [...rdp(Q.slice(0, half + 1), EPS * SCALE).slice(0, -1), ...rdp(Q.slice(half), EPS * SCALE).slice(0, -1)] })
  .filter((P) => P.length >= 4)
if (!kept.length) { console.error('no shapes found: try --invert yes|no or a different --threshold'); await browser.close(); process.exit(1) }

// normalise: width 100 units, height by aspect, centred, PAD units of breathing room
const xs = kept.flat().map((p) => p[0]), ys = kept.flat().map((p) => p[1])
const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys)
const s = (100 - PAD * 2) / Math.max(x1 - x0, y1 - y0)
const vbW = (x1 - x0) * s + PAD * 2, vbH = (y1 - y0) * s + PAD * 2
const N = (p) => [(p[0] - x0) * s + PAD, (p[1] - y0) * s + PAD]
const f = (n) => +n.toFixed(2)
// Catmull-Rom through the simplified points -> cubic Béziers (closed)
const toPath = (P) => {
  const Q = P.map(N), n = Q.length
  let d = `M${f(Q[0][0])} ${f(Q[0][1])}`
  for (let i = 0; i < n; i++) {
    const p0 = Q[(i - 1 + n) % n], p1 = Q[i], p2 = Q[(i + 1) % n], p3 = Q[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`
  }
  return d + 'Z'
}
const d = kept.map(toPath).join('')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(vbW)} ${f(vbH)}" fill="currentColor"><path fill-rule="evenodd" d="${d}"/></svg>\n`
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true })
fs.writeFileSync(out, svg)
console.log(`traced ${kept.length} loop(s), ${kept.reduce((a, P) => a + P.length, 0)} nodes, ink=${inv ? 'dark' : 'light'}, viewBox ${f(vbW)}x${f(vbH)} -> ${out} (${svg.length} B)`)

if (SHEET) {
  // source crop (same bounds) beside the trace at 256/64/32/16 px
  const bx = x0 / SCALE, by = y0 / SCALE, bw = (x1 - x0) / SCALE, bh = (y1 - y0) / SCALE
  const side = Math.max(bw, bh) * 1.16, k = 256 / side
  const ix = -(bx - (side - bw) / 2) * k, iy = -(by - (side - bh) / 2) * k
  const cells = [256, 64, 32, 16].map((z) => `<div class="c"><div class="m" style="width:${z}px;height:${z}px">${svg}</div><span>${z}px</span></div>`).join('')
  await page.setViewportSize({ width: 1100, height: 330 })
  await page.setContent(`<style>body{margin:0;display:flex;gap:28px;align-items:center;padding:24px;background:#f5f5f5;font:12px system-ui;color:#666}
    .c{display:flex;flex-direction:column;align-items:center;gap:8px}.m{display:flex;align-items:center;justify-content:center;color:#171717}
    .m svg{width:86%;height:86%}.src{width:256px;height:256px;overflow:hidden;position:relative;box-shadow:0 0 0 1px #ddd}
    .src img{position:absolute;left:${ix}px;top:${iy}px;transform-origin:0 0;transform:scale(${k})}</style>
    <div class="c"><div class="src"><img src="${dataUrl}"></div><span>source</span></div>${cells}`)
  await page.waitForTimeout(150)
  await page.screenshot({ path: SHEET, fullPage: true })
  console.log(`sheet -> ${SHEET}`)
}
await browser.close()
