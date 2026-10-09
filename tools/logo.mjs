#!/usr/bin/env node
// Constructed logo marks: every mark is built from exact geometry (circles, rounded rects, arcs, rotations, boolean cuts
// via masks) on a 100-unit grid, never drawn freehand. Families and their parameter ranges live in system/logo/families.json
// (from the logo-craft study); numeric targets for a good mark live in system/logo/anatomy.json (from measured marks).
//
//   node tools/logo.mjs sheet <name> [--family radial,grid,...] [--n 4] [--seed 1] [--word "Tandem"] [--font "Inter Variable"]
//        -> work/<name>/brand/sheet.html + sheet.png: every candidate at 160/64/32/16 px, ink on light, light on ink,
//           plus a nav lockup (mark + wordmark) for each
//   node tools/logo.mjs present <name> --from work/<name>/brand/marks.mjs [--word W] [--brand #hex] [--font F]
//        -> work/<name>/brand/present.png: each designed candidate on white, on the brand colour and on ink, at 32/16 px,
//           in the measured nav lockup (mark 1.43x cap height, gap 0.28x mark), with its one-sentence idea and its
//           measured coverage / parts / aspect against knowledge/web/logo-craft.md
//   node tools/logo.mjs export <name> <family> '<json params>' [--word "Tandem"]
//        -> work/<name>/brand/<name>-mark.svg (currentColor, square viewBox) + lockup preview
//
// A mark is good when it reads at 16px in one colour, has 2-5 parts, one radius logic, gaps >= the smallest stroke, and one
// idea a client can say in a sentence. The sheet exists so that judgement is made by eye at every size, not at 256px only.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const flag = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d }
const r2 = (v) => Math.round(v * 100) / 100
const rad = (d) => (d * Math.PI) / 180

// tiny deterministic PRNG so a seed reproduces a sheet
function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }

/** arc path (centre cx,cy, radius r, from a0 to a1 degrees, clockwise) */
function arc(cx, cy, r, a0, a1) {
  const p0 = [cx + r * Math.cos(rad(a0)), cy + r * Math.sin(rad(a0))], p1 = [cx + r * Math.cos(rad(a1)), cy + r * Math.sin(rad(a1))]
  const large = ((a1 - a0 + 360) % 360) > 180 ? 1 : 0
  return `M${r2(p0[0])} ${r2(p0[1])}A${r} ${r} 0 ${large} 1 ${r2(p1[0])} ${r2(p1[1])}`
}

let uid = 0
const id = (p) => `${p}${++uid}`

// ---- families: each returns inner SVG for a 100x100 box, ink = currentColor ----
const F = {
  /** n identical petals rotated about the centre. petal: 'ellipse' | 'pill' | 'drop' | 'circle' */
  radial({ n = 6, petal = 'pill', len = 0.46, width = 0.2, inner = 0.12, rot = 0 }) {
    const L = len * 100, W = width * 100, I = inner * 100
    let one
    if (petal === 'circle') one = `<circle cx="50" cy="${r2(50 - I - W / 2)}" r="${r2(W / 2)}"/>`
    else if (petal === 'ellipse') one = `<ellipse cx="50" cy="${r2(50 - I - L / 2)}" rx="${r2(W / 2)}" ry="${r2(L / 2)}"/>`
    else if (petal === 'drop') one = `<path d="M50 ${r2(50 - I)} C ${r2(50 + W * 0.9)} ${r2(50 - I - L * 0.45)} ${r2(50 + W / 2)} ${r2(50 - I - L)} 50 ${r2(50 - I - L)} C ${r2(50 - W / 2)} ${r2(50 - I - L)} ${r2(50 - W * 0.9)} ${r2(50 - I - L * 0.45)} 50 ${r2(50 - I)}Z"/>`
    else one = `<rect x="${r2(50 - W / 2)}" y="${r2(50 - I - L)}" width="${r2(W)}" height="${r2(L)}" rx="${r2(W / 2)}"/>`
    return Array.from({ length: n }, (_, i) => `<g transform="rotate(${r2(rot + (360 / n) * i)} 50 50)">${one}</g>`).join('')
  },

  /** modular grid: cells on a k x k grid, each cell a rounded square, a disc or a quarter disc, one radius for all */
  grid({ k = 3, cells = [1, 1, 0, 1, 0, 1, 0, 1, 1], gap = 0.06, radius = 0.35, shapes = null }) {
    const G = gap * 100, u = (100 - G * (k - 1)) / k
    let out = ''
    cells.forEach((on, i) => {
      if (!on) return
      const x = (i % k) * (u + G), y = Math.floor(i / k) * (u + G), s = shapes?.[i] ?? 'sq'
      if (s === 'disc') out += `<circle cx="${r2(x + u / 2)}" cy="${r2(y + u / 2)}" r="${r2(u / 2)}"/>`
      else if (s.startsWith('q')) { // quarter disc whose centre is the named corner
        const c = { 'q-tl': [x, y], 'q-tr': [x + u, y], 'q-br': [x + u, y + u], 'q-bl': [x, y + u] }[s]
        const a0 = { 'q-tl': 0, 'q-tr': 90, 'q-br': 180, 'q-bl': 270 }[s]
        out += `<path d="M${r2(c[0])} ${r2(c[1])}L${r2(c[0] + u * Math.cos(rad(a0)))} ${r2(c[1] + u * Math.sin(rad(a0)))}A${r2(u)} ${r2(u)} 0 0 1 ${r2(c[0] + u * Math.cos(rad(a0 + 90)))} ${r2(c[1] + u * Math.sin(rad(a0 + 90)))}Z"/>`
      } else out += `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(u)}" height="${r2(u)}" rx="${r2(u * radius)}"/>`
    })
    return out
  },

  /** a solid base shape with a second shape cut out of it (negative space) */
  cut({ base = 'circle', hole = 'circle', hx = 0.62, hy = 0.38, hr = 0.3, baseR = 0.3 }) {
    const m = id('m')
    const b = base === 'circle' ? `<circle cx="50" cy="50" r="50"/>` : `<rect width="100" height="100" rx="${baseR * 100}"/>`
    const h = hole === 'circle' ? `<circle cx="${hx * 100}" cy="${hy * 100}" r="${hr * 100}" fill="#000"/>`
      : hole === 'slot' ? `<rect x="${hx * 100 - hr * 100}" y="${hy * 100 - hr * 30}" width="${hr * 200}" height="${hr * 60}" rx="${hr * 30}" fill="#000"/>`
      : `<rect x="${hx * 100 - hr * 100}" y="${hy * 100 - hr * 100}" width="${hr * 200}" height="${hr * 200}" rx="${hr * 40}" fill="#000"/>`
    return `<mask id="${m}"><rect x="-10" y="-10" width="120" height="120" fill="#fff"/>${h}</mask><g mask="url(#${m})">${b}</g>`
  },

  /** concentric arcs (orbits) with butt or round caps, each turned by a step */
  orbit({ rings = 3, stroke = 0.11, gap = 0.06, sweep = 270, step = 40, cap = 'round', dot = true }) {
    const S = stroke * 100, Gp = gap * 100
    let out = ''
    for (let i = 0; i < rings; i++) {
      const r = 50 - S / 2 - i * (S + Gp); if (r <= S / 2) break
      out += `<path d="${arc(50, 50, r2(r), -90 + i * step, -90 + i * step + sweep)}" fill="none" stroke="currentColor" stroke-width="${r2(S)}" stroke-linecap="${cap}"/>`
    }
    const rin = 50 - S / 2 - rings * (S + Gp)
    if (dot && rin > 4) out += `<circle cx="50" cy="50" r="${r2(Math.min(rin, S * 0.9))}"/>`
    return out
  },

  /** stacked pills: bars with round ends, lengths and offsets describe a rhythm */
  stack({ bars = [1, 0.72, 0.44], h = 0.22, gap = 0.1, align = 'left', skew = 0 }) {
    const H = h * 100, Gp = gap * 100, total = bars.length * H + (bars.length - 1) * Gp, y0 = 50 - total / 2
    return bars.map((b, i) => {
      const w = b * 100, x = align === 'left' ? 0 : align === 'right' ? 100 - w : 50 - w / 2
      return `<rect x="${r2(x + skew * i * 100)}" y="${r2(y0 + i * (H + Gp))}" width="${r2(w)}" height="${r2(H)}" rx="${r2(H / 2)}"/>`
    }).join('')
  },

  /** rings linked over/under: each ring is cut where the previous one passes over it (upper crossing only) */
  link({ n = 2, r = 0.27, stroke = 0.11, spread = 0.36, angle = 0, cutw = 0.045 }) {
    const R = r * 100, S = stroke * 100, D = spread * 100
    const cs = Array.from({ length: n }, (_, i) => { const a = rad(angle + (360 / n) * i - 90); return n === 2 ? [50 + (i ? D / 2 : -D / 2), 50] : [50 + (D / 1.6) * Math.cos(a), 50 + (D / 1.6) * Math.sin(a)] })
    let out = ''
    cs.forEach(([x, y], i) => {
      const m = id('k'), prev = cs[(i - 1 + n) % n]
      const cover = i === 0 && n === 2 ? '' : `<clipPath id="${m}c"><rect x="-10" y="-10" width="120" height="60"/></clipPath><circle cx="${r2(prev[0])}" cy="${r2(prev[1])}" r="${r2(R)}" fill="none" stroke="#000" stroke-width="${r2(S + cutw * 200)}" clip-path="url(#${m}c)"/>`
      out += `<mask id="${m}"><rect x="-10" y="-10" width="120" height="120" fill="#fff"/>${cover}</mask>`
      out += `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r2(R)}" fill="none" stroke="currentColor" stroke-width="${r2(S)}" mask="url(#${m})"/>`
    })
    return out
  },

  /** pseudo-3D fold: two parallelograms meeting at a crease, the second at a lighter ink (opacity) */
  fold({ w = 0.42, h = 0.78, shear = 0.24, tint = 0.45 }) {
    const W = w * 100, H = h * 100, Sh = shear * 100, x0 = 50 - W, y0 = 50 - H / 2
    const a = `M${r2(x0)} ${r2(y0 + Sh)}L50 ${r2(y0)}L50 ${r2(y0 + H - Sh)}L${r2(x0)} ${r2(y0 + H)}Z`
    const b = `M50 ${r2(y0)}L${r2(50 + W)} ${r2(y0 + Sh)}L${r2(50 + W)} ${r2(y0 + H)}L50 ${r2(y0 + H - Sh)}Z`
    return `<path d="${a}"/><path d="${b}" opacity="${tint}"/>`
  },
}

export function mark(family, p) {
  uid = 0
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 108 108" fill="currentColor">${F[family](p)}</svg>`
}

// ---- candidate generation: sample good ranges per family ----
function sample(family, rnd) {
  const pick = (a) => a[Math.floor(rnd() * a.length)], between = (a, b) => r2(a + (b - a) * rnd())
  switch (family) {
    case 'radial': { const n = pick([3, 4, 5, 6, 8]); return { n, petal: pick(['pill', 'ellipse', 'drop', 'circle']), len: between(0.3, 0.46), width: between(0.16, n > 5 ? 0.22 : 0.3), inner: between(0, 0.14), rot: pick([0, 180 / n]) } }
    case 'grid': { const k = pick([2, 3]); const cells = Array.from({ length: k * k }, () => (rnd() > 0.35 ? 1 : 0)); cells[0] = 1; const shapes = cells.map(() => pick(['sq', 'sq', 'disc', 'q-tl', 'q-tr', 'q-br', 'q-bl'])); return { k, cells, gap: between(0.05, 0.1), radius: pick([0.2, 0.3, 0.5]), shapes } }
    case 'cut': return { base: pick(['circle', 'square']), hole: pick(['circle', 'slot', 'square']), hx: between(0.5, 0.72), hy: between(0.28, 0.5), hr: between(0.18, 0.32), baseR: pick([0.24, 0.3]) }
    case 'orbit': return { rings: pick([2, 3]), stroke: between(0.1, 0.15), gap: between(0.05, 0.09), sweep: pick([180, 240, 270, 300]), step: pick([0, 45, 90, 120, 180]), cap: pick(['round', 'butt']), dot: rnd() > 0.4 }
    case 'stack': { const n = pick([2, 3]); return { bars: n === 2 ? [1, between(0.45, 0.7)] : [1, between(0.6, 0.8), between(0.3, 0.5)], h: between(0.2, 0.26), gap: between(0.08, 0.12), align: pick(['left', 'center', 'right']), skew: pick([0, 0, 0.08, -0.08]) } }
    case 'link': return { n: pick([2, 2, 3]), r: between(0.22, 0.3), stroke: between(0.09, 0.13), spread: between(0.3, 0.42), angle: pick([0, 30, 45]), cutw: 0.045 }
    case 'fold': return { w: between(0.34, 0.46), h: between(0.66, 0.86), shear: between(0.14, 0.3), tint: pick([0.35, 0.5, 0.65]) }
  }
}

function sheetHtml(name, cands, word, font) {
  const tile = (c, i) => `
  <figure class="c">
    <div class="big">${c.svg}</div>
    <div class="row"><span style="width:64px">${c.svg}</span><span style="width:32px">${c.svg}</span><span style="width:16px">${c.svg}</span>
      <span class="inv"><span style="width:32px">${c.svg}</span><span style="width:16px">${c.svg}</span></span></div>
    <div class="lock"><span class="lm">${c.svg}</span><span class="wm">${word}</span></div>
    <figcaption>#${i + 1} ${c.family}<br><code>${JSON.stringify(c.p).replace(/"/g, '')}</code></figcaption>
  </figure>`
  return `<!doctype html><meta charset="utf-8"><title>${name} marks</title>
<style>
@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.0.18/index.css');
body{margin:0;padding:40px;background:#f4f4f4;font-family:'${font}','Inter Variable',system-ui;color:#0a0a0a}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.c{margin:0;background:#fff;border-radius:16px;padding:20px;box-shadow:0 0 0 1px #e8e8e8}
.big{width:160px;height:160px;margin:4px auto 16px}.big svg{width:100%;height:100%}
.row{display:flex;align-items:center;gap:14px;justify-content:center}.row span{display:inline-flex}.row svg{width:100%;height:auto}
.inv{display:inline-flex;gap:10px;align-items:center;background:#0a0a0a;color:#fff;padding:8px 10px;border-radius:8px}
.lock{display:flex;align-items:center;gap:8px;justify-content:center;margin-top:18px}.lm{width:24px;display:inline-flex}.lm svg{width:100%}
.wm{font-size:20px;font-weight:600;letter-spacing:-0.03em}
figcaption{margin-top:14px;font:11px/1.4 ui-monospace,monospace;color:#8a8a8a;word-break:break-all}
</style><div class="g">${cands.map(tile).join('')}</div>`
}


// measured nav lockup: Inter cap height ~0.727 em, mark = 1.43 x cap, gap = 0.28 x mark (knowledge/web/logo-craft.md section 5)
function presentHtml(name, list, word, font, brand) {
  const fs20 = 20, cap = fs20 * 0.727, mh = Math.round(cap * 1.43), gap = Math.round(mh * 0.28)
  const tile = (m, i) => `
  <figure class="c" data-k="${m.k}">
    <div class="trio">
      <div class="f w"><span class="m">${m.svg}</span></div>
      <div class="f b" style="background:${brand}"><span class="m">${m.svg}</span></div>
      <div class="f d"><span class="m">${m.svg}</span></div>
    </div>
    <div class="small"><span style="width:32px">${m.svg}</span><span style="width:24px">${m.svg}</span><span style="width:16px">${m.svg}</span>
      <span class="inv"><span style="width:24px">${m.svg}</span><span style="width:16px">${m.svg}</span></span>
      <span class="lock"><span style="width:${mh}px;height:${mh}px">${m.svg}</span><span class="wm" style="margin-left:${gap}px">${word}</span></span></div>
    <figcaption><b>${String.fromCharCode(65 + i)} · ${m.k}</b> ${m.idea}<span class="met"></span></figcaption>
    <canvas class="probe" width="200" height="200" hidden></canvas><template>${m.svg}</template>
  </figure>`
  return `<!doctype html><meta charset="utf-8"><title>${name} marks</title>
<style>
@import url('https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.0.18/index.css');
body{margin:0;padding:40px;background:#f2f2f2;font-family:'${font}','Inter Variable',system-ui;color:#0a0a0a}
h1{font-size:22px;font-weight:600;letter-spacing:-0.02em;margin:0 0 20px}
.g{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.c{margin:0;background:#fff;border-radius:20px;padding:14px;box-shadow:0 0 0 1px #e6e6e6}
.trio{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.f{aspect-ratio:1;border-radius:12px;display:grid;place-items:center}.f.w{background:#fafafa;box-shadow:inset 0 0 0 1px #eee;color:#0a0a0a}.f.b{color:#fff}.f.d{background:#0c0c0d;color:#f5f5f5}
.m{width:42%;display:block}.m svg,.small svg,.lock svg{width:100%;height:100%;display:block}
.small{display:flex;align-items:center;gap:14px;padding:16px 6px 6px}.small>span{display:inline-flex}
.inv{gap:10px;align-items:center;background:#0a0a0a;color:#fff;padding:7px 9px;border-radius:8px}
.lock{margin-left:auto;align-items:center;display:inline-flex}.wm{font-size:${fs20}px;font-weight:600;letter-spacing:-0.03em;line-height:1}
figcaption{padding:10px 6px 4px;font-size:13px;line-height:1.45;color:#555}figcaption b{color:#0a0a0a;font-weight:600}
.met{display:block;margin-top:6px;font:11.5px/1.4 ui-monospace,monospace;color:#888}
</style><h1>${word}: mark candidates</h1><div class="g">${list.map(tile).join('')}</div>`
}

// runs in the page: rasterise each mark at 200px, then coverage of its ink bbox, connected parts, bbox aspect
async function measureInPage() {
  const out = []
  for (const fig of document.querySelectorAll('figure.c')) {
    const svg = fig.querySelector('template').innerHTML.replace('fill="currentColor"', 'fill="#000"').replace(/currentColor/g, '#000')
    const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await img.decode()
    const c = fig.querySelector('canvas'), x = c.getContext('2d'); x.clearRect(0, 0, 200, 200); x.drawImage(img, 0, 0, 200, 200)
    const d = x.getImageData(0, 0, 200, 200).data, ink = new Uint8Array(40000)
    let x0 = 200, y0 = 200, x1 = 0, y1 = 0, n = 0
    for (let i = 0; i < 40000; i++) if (d[i * 4 + 3] > 127) { ink[i] = 1; n++; const px = i % 200, py = (i / 200) | 0; x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py) }
    const seen = new Uint8Array(40000); let parts = 0
    for (let i = 0; i < 40000; i++) if (ink[i] && !seen[i]) { let size = 0; const st = [i]; seen[i] = 1; while (st.length) { const j = st.pop(); size++; const px = j % 200, py = (j / 200) | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const qx = px + dx, qy = py + dy; if (qx < 0 || qy < 0 || qx > 199 || qy > 199) continue; const q = qy * 200 + qx; if (ink[q] && !seen[q]) { seen[q] = 1; st.push(q) } } } if (size > 12) parts++ }
    const w = x1 - x0 + 1, h = y1 - y0 + 1, coverage = Math.round((n / (w * h)) * 100) / 100, aspect = Math.round((Math.max(w, h) / Math.min(w, h)) * 100) / 100
    const flags = []; if (parts > 4) flags.push('too many parts (>4)'); if (coverage < 0.27 || coverage > 0.75) flags.push('coverage outside 0.27-0.75'); if (aspect > 1.61) flags.push('aspect > 1.61')
    fig.querySelector('.met').textContent = `coverage ${coverage} · parts ${parts} · aspect ${aspect}${flags.length ? ' · ' + flags.join(', ') : ''}`
    out.push({ k: fig.dataset.k, coverage, parts, aspect, flags })
  }
  return out
}

async function shot(html, out) {
  const { chromium } = await import('playwright')
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 })
  await pg.setContent(html, { waitUntil: 'networkidle' }); await pg.screenshot({ path: out, fullPage: true }); await b.close()
}

const [cmd, name] = args
if (cmd && name && fs.realpathSync(fileURLToPath(import.meta.url)) === fs.realpathSync(process.argv[1])) {
  const dir = path.join(root, 'work', name, 'brand'); fs.mkdirSync(dir, { recursive: true })
  const word = flag('word', name[0].toUpperCase() + name.slice(1)), font = flag('font', 'Inter Variable')
  if (cmd === 'sheet') {
    const fams = flag('family', Object.keys(F).join(',')).split(','), per = Number(flag('n', 4)), rnd = rng(Number(flag('seed', 1)))
    const cands = fams.flatMap((f) => Array.from({ length: per }, () => { const p = sample(f, rnd); return { family: f, p, svg: mark(f, p) } }))
    const html = sheetHtml(name, cands, word, font)
    fs.writeFileSync(path.join(dir, 'sheet.html'), html)
    fs.writeFileSync(path.join(dir, 'sheet.json'), JSON.stringify(cands.map(({ family, p }) => ({ family, p })), null, 1))
    await shot(html, path.join(dir, 'sheet.png'))
    console.log(`sheet: ${cands.length} marks -> ${path.relative(root, path.join(dir, 'sheet.png'))}`)
  } else if (cmd === 'present') {
    const from = path.resolve(root, flag('from', `work/${name}/brand/marks.mjs`)), brand = flag('brand', '#2f6bff')
    const marks = (await import(`file://${from}?t=${Date.now()}`)).default
    const list = Object.entries(marks).map(([k, m]) => ({ k, idea: m.idea, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" overflow="visible">${m.svg}</svg>` }))
    const html = presentHtml(name, list, word, font, brand)
    fs.writeFileSync(path.join(dir, 'present.html'), html)
    const { chromium } = await import('playwright')
    const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 })
    await pg.setContent(html, { waitUntil: 'networkidle' })
    const metrics = await pg.evaluate(measureInPage)
    await pg.screenshot({ path: path.join(dir, 'present.png'), fullPage: true }); await b.close()
    fs.writeFileSync(path.join(dir, 'present.json'), JSON.stringify(metrics, null, 1))
    for (const m of metrics) console.log(`${m.k.padEnd(16)} coverage ${m.coverage}  parts ${m.parts}  aspect ${m.aspect}  ${m.flags.join(', ') || 'ok'}`)
    console.log(`present: ${list.length} marks -> ${path.relative(root, path.join(dir, 'present.png'))}`)
} else if (cmd === 'export') {
    const family = args[2], p = JSON.parse(args[3] || '{}'), svg = mark(family, p)
    fs.writeFileSync(path.join(dir, `${name}-mark.svg`), svg)
    const html = sheetHtml(name, [{ family, p, svg }], word, font).replace('repeat(4,1fr)', '1fr').replace('padding:40px;', 'padding:40px;width:420px;')
    await shot(html, path.join(dir, `${name}-mark-preview.png`))
    console.log(`export: ${path.relative(root, path.join(dir, `${name}-mark.svg`))}`)
  }
} else if (!cmd) {
  console.error('usage: node tools/logo.mjs sheet <name> [--family a,b] [--n 4] [--seed 1] [--word W] | export <name> <family> <json>')
}
