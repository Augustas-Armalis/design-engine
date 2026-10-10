#!/usr/bin/env node
// Bezier anatomy of a logo mark: how its curves are DRAWN, not just how its silhouette measures.
// Dependency-free (own path parser, arc -> cubic conversion, group transforms). Reads SVG as text only; never executes it.
//
//   node tools/logo_curves.mjs <file.svg|dir> [--json out.json] [--quiet]
//
// Per mark it reports:
//   nodes            on-curve points (after arcs, circles, ellipses and rects are converted to cubics)
//   segs             line / cubic counts; curvedShare = share of outline length that is curved
//   joins            every node between two segments: corner (> 12 deg turn), smooth (G1, <= 1.5 deg), kink (1.5-12 deg:
//                    meant to be smooth and is not: the classic drawing error)
//   extremaOnNodes   share of smooth curve nodes whose tangent is horizontal or vertical (type-design discipline);
//                    missingExtrema = curves that reach an x/y extreme in their interior (no node there)
//   tension          Tunni tension of each cubic divided by the tension a circular arc of the same turn would have.
//                    1.00 = circle arc; > 1 = fuller / squarer (superellipse-like); < 1 = flatter / pointier.
//                    circleLike = |ratio - 1| <= 0.04 and handles balanced within 8%; drawnShare = curved length that is
//                    NOT circle-like (custom tension or unbalanced handles) -> the "drawn, not compassed" signal.
//   balance          median |log(h0/h1)| of normalised handles: 0 = symmetric handles; > 0.15 = tension shifts along the curve
//   g2               at smooth joins, min(k0,k1)/max(k0,k1) of curvature on both sides (1 = curvature continuous, G2);
//                    curvatureJumps = smooth joins where curvature changes by > 2x (line->arc, arc->different arc): G1 only
//   inflections      cubics that change bending direction (S-curves)
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const flag = (k) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : undefined }
const quiet = args.includes('--quiet')
const target = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && args[i - 1] !== '--quiet'))
if (!target) { console.error('usage: node tools/logo_curves.mjs <file.svg|dir> [--json out.json]'); process.exit(2) }

// ---------- affine helpers ----------
const I = [1, 0, 0, 1, 0, 0]
const mul = (m, n) => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]]
const ap = (m, [x, y]) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]
function parseTransform(s) {
  let m = I
  if (!s) return m
  for (const [, fn, raw] of s.matchAll(/(matrix|translate|scale|rotate|skewX|skewY)\s*\(([^)]*)\)/g)) {
    const v = raw.trim().split(/[\s,]+/).map(Number)
    let t = I
    if (fn === 'matrix') t = v
    else if (fn === 'translate') t = [1, 0, 0, 1, v[0], v[1] || 0]
    else if (fn === 'scale') t = [v[0], 0, 0, v[1] ?? v[0], 0, 0]
    else if (fn === 'rotate') {
      const a = (v[0] * Math.PI) / 180, c = Math.cos(a), s2 = Math.sin(a)
      t = [c, s2, -s2, c, 0, 0]
      if (v.length > 2) t = mul(mul([1, 0, 0, 1, v[1], v[2]], t), [1, 0, 0, 1, -v[1], -v[2]])
    } else if (fn === 'skewX') t = [1, 0, Math.tan((v[0] * Math.PI) / 180), 1, 0, 0]
    else if (fn === 'skewY') t = [1, Math.tan((v[0] * Math.PI) / 180), 0, 1, 0, 0]
    m = mul(m, t)
  }
  return m
}

// ---------- path parsing to absolute segments: {type:'L'|'C', p:[[x,y]...]} grouped in subpaths ----------
function tokenize(d) { return d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g) || [] }
const KAPPA = 0.5522847498
function arcToCubics(x1, y1, rx, ry, phi, fa, fs2, x2, y2) {
  // SVG implementation notes F.6.5: endpoint -> centre parameterisation, then <= 90deg cubic pieces
  if (rx === 0 || ry === 0) return [[[x1, y1], [x2, y2]]]
  const cp = Math.cos(phi), sp = Math.sin(phi)
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2
  const x1p = cp * dx + sp * dy, y1p = -sp * dx + cp * dy
  rx = Math.abs(rx); ry = Math.abs(ry)
  const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry)
  if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam) }
  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p
  let co = Math.sqrt(Math.max(0, num / (rx * rx * y1p * y1p + ry * ry * x1p * x1p)))
  if (fa === fs2) co = -co
  const cxp = (co * rx * y1p) / ry, cyp = (-co * ry * x1p) / rx
  const cx = cp * cxp - sp * cyp + (x1 + x2) / 2, cy = sp * cxp + cp * cyp + (y1 + y2) / 2
  const ang = (ux, uy, vx, vy) => { const a = Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy); return a }
  const t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
  let dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry)
  if (!fs2 && dt > 0) dt -= 2 * Math.PI
  if (fs2 && dt < 0) dt += 2 * Math.PI
  const n = Math.max(1, Math.ceil(Math.abs(dt) / (Math.PI / 2) - 1e-9))
  const step = dt / n, k = (4 / 3) * Math.tan(step / 4)
  const out = []
  const pt = (t) => [cx + rx * Math.cos(t) * cp - ry * Math.sin(t) * sp, cy + rx * Math.cos(t) * sp + ry * Math.sin(t) * cp]
  const der = (t) => [-rx * Math.sin(t) * cp - ry * Math.cos(t) * sp, -rx * Math.sin(t) * sp + ry * Math.cos(t) * cp]
  for (let i = 0; i < n; i++) {
    const a = t1 + i * step, b = a + step
    const p0 = pt(a), p3 = pt(b), d0 = der(a), d3 = der(b)
    out.push([p0, [p0[0] + k * d0[0], p0[1] + k * d0[1]], [p3[0] - k * d3[0], p3[1] - k * d3[1]], p3])
  }
  return out
}
function parsePath(d) {
  const tk = tokenize(d); let i = 0, cmd = null
  let cx = 0, cy = 0, sx = 0, sy = 0, lc = null, lq = null
  const subs = []; let cur = null
  const num = () => Number(tk[i++])
  const isNum = () => i < tk.length && !/[a-zA-Z]/.test(tk[i])
  const start = (x, y) => { cur = { segs: [], closed: false, start: [x, y] }; subs.push(cur) }
  const line = (x, y) => { if (!cur) start(cx, cy); if (x !== cx || y !== cy) cur.segs.push({ type: 'L', p: [[cx, cy], [x, y]] }); cx = x; cy = y }
  const cubic = (p1, p2, p3) => { if (!cur) start(cx, cy); cur.segs.push({ type: 'C', p: [[cx, cy], p1, p2, p3] }); cx = p3[0]; cy = p3[1] }
  while (i < tk.length) {
    if (/[a-zA-Z]/.test(tk[i])) cmd = tk[i++]
    else if (!cmd) { i++; continue }
    const C = cmd.toUpperCase(), ox = cmd === cmd.toLowerCase() ? cx : 0, oy = cmd === cmd.toLowerCase() ? cy : 0
    if (C === 'Z') { if (cur) { line(sx, sy); cur.closed = true; cur = null } cx = sx; cy = sy; lc = lq = null; cmd = null; continue }
    if (!isNum()) { cmd = null; continue }
    if (C === 'M') { const x = num() + ox, y = num() + oy; start(x, y); cx = sx = x; cy = sy = y; cmd = cmd === 'm' ? 'l' : 'L'; lc = lq = null; continue }
    if (C === 'L') { line(num() + ox, num() + oy); lc = lq = null }
    else if (C === 'H') { line(num() + ox, cy); lc = lq = null }
    else if (C === 'V') { line(cx, num() + (cmd === 'v' ? cy : 0)); lc = lq = null }
    else if (C === 'C') { const p1 = [num() + ox, num() + oy], p2 = [num() + ox, num() + oy], p3 = [num() + ox, num() + oy]; cubic(p1, p2, p3); lc = p2; lq = null }
    else if (C === 'S') { const p1 = lc ? [2 * cx - lc[0], 2 * cy - lc[1]] : [cx, cy]; const p2 = [num() + ox, num() + oy], p3 = [num() + ox, num() + oy]; cubic(p1, p2, p3); lc = p2; lq = null }
    else if (C === 'Q' || C === 'T') {
      let q
      if (C === 'Q') q = [num() + ox, num() + oy]; else q = lq ? [2 * cx - lq[0], 2 * cy - lq[1]] : [cx, cy]
      const p3 = [num() + ox, num() + oy]
      cubic([cx + (2 / 3) * (q[0] - cx), cy + (2 / 3) * (q[1] - cy)], [p3[0] + (2 / 3) * (q[0] - p3[0]), p3[1] + (2 / 3) * (q[1] - p3[1])], p3); lq = q; lc = null
    } else if (C === 'A') {
      const rx = num(), ry = num(), rot = (num() * Math.PI) / 180, fa = num() ? 1 : 0, fs2 = num() ? 1 : 0, x = num() + ox, y = num() + oy
      for (const c of arcToCubics(cx, cy, rx, ry, rot, fa, fs2, x, y)) { if (c.length === 2) line(x, y); else cubic(c[1], c[2], c[3]) }
      lc = lq = null
    } else { i++ }
  }
  return subs.filter((s) => s.segs.length)
}
// shapes -> path d
const attr = (a, k) => { const m = a.match(new RegExp(`(?:^|\\s)${k}\\s*=\\s*["']([^"']*)["']`)); return m ? m[1] : undefined }
const nf = (v, d = 0) => (v === undefined ? d : parseFloat(v))
function shapeToD(tag, a) {
  if (tag === 'path') return attr(a, 'd') || ''
  if (tag === 'circle' || tag === 'ellipse') {
    const cx = nf(attr(a, 'cx')), cy = nf(attr(a, 'cy')), rx = tag === 'circle' ? nf(attr(a, 'r')) : nf(attr(a, 'rx')), ry = tag === 'circle' ? rx : nf(attr(a, 'ry'))
    return `M${cx + rx} ${cy}A${rx} ${ry} 0 0 1 ${cx} ${cy + ry}A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx} ${cy - ry}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}Z`
  }
  if (tag === 'rect') {
    const x = nf(attr(a, 'x')), y = nf(attr(a, 'y')), w = nf(attr(a, 'width')), h = nf(attr(a, 'height'))
    let rx = attr(a, 'rx'), ry = attr(a, 'ry'); rx = nf(rx ?? ry); ry = nf(ry ?? attr(a, 'rx')); rx = Math.min(rx, w / 2); ry = Math.min(ry, h / 2)
    if (!rx || !ry) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`
    return `M${x + rx} ${y}H${x + w - rx}A${rx} ${ry} 0 0 1 ${x + w} ${y + ry}V${y + h - ry}A${rx} ${ry} 0 0 1 ${x + w - rx} ${y + h}H${x + rx}A${rx} ${ry} 0 0 1 ${x} ${y + h - ry}V${y + ry}A${rx} ${ry} 0 0 1 ${x + rx} ${y}Z`
  }
  if (tag === 'polygon' || tag === 'polyline') {
    const v = (attr(a, 'points') || '').trim().split(/[\s,]+/).map(Number)
    let d = ''; for (let k = 0; k + 1 < v.length; k += 2) d += (k ? 'L' : 'M') + v[k] + ' ' + v[k + 1]
    return d + (tag === 'polygon' ? 'Z' : '')
  }
  return ''
}
function extract(svg) {
  svg = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/<(defs|clipPath|mask|style|script|title|desc|metadata|linearGradient|radialGradient|filter)[\s\S]*?<\/\1>/g, '')
  const stack = [I], subs = []
  for (const m of svg.matchAll(/<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g)) {
    const [, close, tag, a, self] = m
    if (close) { if (tag === 'g' || tag === 'svg' || tag === 'a') stack.pop(); continue }
    const t = mul(stack[stack.length - 1], parseTransform(attr(a, 'transform')))
    if (tag === 'g' || tag === 'svg' || tag === 'a') { if (!self) stack.push(tag === 'svg' ? I : t); continue }
    if (!['path', 'circle', 'ellipse', 'rect', 'polygon', 'polyline'].includes(tag)) continue
    const fill = attr(a, 'fill'); if (fill === 'none' && !attr(a, 'stroke')) continue
    for (const sp of parsePath(shapeToD(tag, a))) {
      sp.segs = sp.segs.map((s) => ({ type: s.type, p: s.p.map((q) => ap(t, q)) }))
      subs.push(sp)
    }
  }
  return subs
}

// ---------- geometry ----------
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], len = (v) => Math.hypot(v[0], v[1]), cross = (a, b) => a[0] * b[1] - a[1] * b[0], dot = (a, b) => a[0] * b[0] + a[1] * b[1]
function bez(p, t) { const u = 1 - t; return [u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0], u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1]] }
function d1(p, t) { const u = 1 - t; return [3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]), 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1])] }
function d2(p, t) { const u = 1 - t; return [6 * u * (p[2][0] - 2 * p[1][0] + p[0][0]) + 6 * t * (p[3][0] - 2 * p[2][0] + p[1][0]), 6 * u * (p[2][1] - 2 * p[1][1] + p[0][1]) + 6 * t * (p[3][1] - 2 * p[2][1] + p[1][1])] }
const curvAt = (p, t) => { const a = d1(p, t), b = d2(p, t), l = len(a); return l < 1e-9 ? 0 : cross(a, b) / (l * l * l) }
function segLen(s) { if (s.type === 'L') return len(sub(s.p[1], s.p[0])); let L = 0, prev = s.p[0]; for (let k = 1; k <= 24; k++) { const q = bez(s.p, k / 24); L += len(sub(q, prev)); prev = q } return L }
function isFlatCubic(s) { const ch = sub(s.p[3], s.p[0]), l = len(ch); if (l < 1e-9) return false; return Math.abs(cross(ch, sub(s.p[1], s.p[0]))) / l < 1e-3 * l && Math.abs(cross(ch, sub(s.p[2], s.p[0]))) / l < 1e-3 * l }
function tanOut(s) { if (s.type === 'L') return sub(s.p[1], s.p[0]); for (const q of [s.p[1], s.p[2], s.p[3]]) { const v = sub(q, s.p[0]); if (len(v) > 1e-9) return v } return [1, 0] }
function tanIn(s) { const e = s.p[s.p.length - 1]; if (s.type === 'L') return sub(e, s.p[0]); for (const q of [s.p[2], s.p[1], s.p[0]]) { const v = sub(e, q); if (len(v) > 1e-9) return v } return [1, 0] }
const angBetween = (a, b) => (Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (len(a) * len(b) || 1)))) * 180) / Math.PI
function kEnd(s, end) { if (s.type === 'L') return 0; return curvAt(s.p, end ? 1 : 0) }
// Tunni tension vs circle: returns {ratio, balance} or null for degenerate / > 170deg turns
function tension(s) {
  const [p0, p1, p2, p3] = s.p, v0 = sub(p1, p0), v1 = sub(p2, p3)
  const h0 = len(v0), h1 = len(v1); if (h0 < 1e-9 || h1 < 1e-9) return null
  const den = cross(v0, v1); if (Math.abs(den) < 1e-9) return null
  const w = sub(p3, p0), ta = cross(w, v1) / den, tb = cross(w, v0) / den // I = p0 + ta*v0 = p3 + tb*v1
  if (ta <= 0 || tb <= 0) return null
  const I0 = ta * h0, I1 = tb * h1 // distances from endpoints to the tangent intersection
  const turn = angBetween(v0, sub(p3, p2)) // direction change across the curve
  if (turn < 5 || turn > 175) return null
  const th = (turn * Math.PI) / 180, circ = ((4 / 3) * Math.tan(th / 4)) / Math.tan(th / 2)
  const t0 = h0 / I0, t1 = h1 / I1
  return { ratio: (t0 + t1) / 2 / circ, balance: Math.abs(Math.log(t0 / t1)), turn }
}
function interiorExtrema(p) {
  let n = 0
  for (const ax of [0, 1]) {
    const a = -p[0][ax] + 3 * p[1][ax] - 3 * p[2][ax] + p[3][ax], b = 2 * (p[0][ax] - 2 * p[1][ax] + p[2][ax]), c = p[1][ax] - p[0][ax]
    const roots = []
    if (Math.abs(a) < 1e-9) { if (Math.abs(b) > 1e-9) roots.push(-c / b) } else { const D = b * b - 4 * a * c; if (D >= 0) { roots.push((-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)) } }
    n += roots.filter((t) => t > 0.04 && t < 0.96).length
  }
  return n
}
const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2 }
const r3 = (v) => (v === null || v === undefined ? null : Math.round(v * 1000) / 1000)

function analyse(svgText) {
  const subs = extract(svgText)
  let xs = [], ys = []
  for (const sp of subs) for (const s of sp.segs) for (const q of s.p) { xs.push(q[0]); ys.push(q[1]) }
  const H = Math.max(...ys) - Math.min(...ys) || 1
  let nodes = 0, lines = 0, cubics = 0, curvedL = 0, totalL = 0, corners = 0, smooth = 0, kinks = 0, smoothCurveNodes = 0, extremaNodes = 0, missingExtrema = 0, inflections = 0
  const ratios = [], balances = [], g2 = []; let circleLikeL = 0, tensionL = 0, jumps = 0, squarer = 0, flatter = 0
  for (const sp of subs) {
    // drop zero-length segments, treat flat cubics as lines
    const segs = sp.segs.filter((s) => segLen(s) > 1e-6 * H).map((s) => (s.type === 'C' && isFlatCubic(s) ? { type: 'L', p: [s.p[0], s.p[3]] } : s))
    const n = segs.length; nodes += n
    for (let k = 0; k < n; k++) {
      const s = segs[k], L = segLen(s); totalL += L
      if (s.type === 'L') lines++
      else {
        cubics++; curvedL += L
        missingExtrema += interiorExtrema(s.p)
        const k0 = curvAt(s.p, 0.02), k1 = curvAt(s.p, 0.5), k2 = curvAt(s.p, 0.98)
        if ((k0 > 0 && k2 < 0) || (k0 < 0 && k2 > 0) || (k0 * k1 < 0)) inflections++
        const t = tension(s)
        if (t) { ratios.push(t.ratio); balances.push(t.balance); tensionL += L; if (Math.abs(t.ratio - 1) <= 0.04 && t.balance <= 0.08) circleLikeL += L; else if (t.ratio > 1.04) squarer += L; else if (t.ratio < 0.96) flatter += L }
      }
      if (!sp.closed && k === n - 1) continue
      const nx = segs[(k + 1) % n]; if (!nx) continue
      const turn = angBetween(tanIn(s), tanOut(nx))
      if (turn > 12) corners++
      else if (turn > 1.5) kinks++
      else {
        smooth++
        if (s.type === 'C' || nx.type === 'C') {
          smoothCurveNodes++
          const tv = tanOut(nx), a = Math.abs((Math.atan2(tv[1], tv[0]) * 180) / Math.PI) % 90
          if (a < 2 || a > 88) extremaNodes++
          const ka = Math.abs(kEnd(s, true)), kb = Math.abs(kEnd(nx, false))
          const mx = Math.max(ka, kb), mn = Math.min(ka, kb)
          if (mx > 1e-9) { g2.push(mn / mx); if (mx > 2 * mn) jumps++ }
        }
      }
    }
  }
  return {
    subpaths: subs.length, nodes, lines, cubics,
    curvedShare: r3(curvedL / (totalL || 1)),
    joins: { corner: corners, smooth, kink: kinks },
    extremaOnNodes: smoothCurveNodes ? r3(extremaNodes / smoothCurveNodes) : null,
    missingExtrema,
    tension: { median: r3(median(ratios)), p10: r3(ratios.length ? [...ratios].sort((a, b) => a - b)[Math.floor(ratios.length * 0.1)] : null), p90: r3(ratios.length ? [...ratios].sort((a, b) => a - b)[Math.floor(ratios.length * 0.9)] : null), circleLikeShare: tensionL ? r3(circleLikeL / tensionL) : null, drawnShare: tensionL ? r3(1 - circleLikeL / tensionL) : null, squarerShare: tensionL ? r3(squarer / tensionL) : null, flatterShare: tensionL ? r3(flatter / tensionL) : null },
    balance: r3(median(balances)),
    g2: { medianRatio: r3(median(g2)), curvatureJumps: jumps, smoothCurveJoins: smoothCurveNodes },
    inflections,
  }
}

const files = fs.statSync(target).isDirectory() ? fs.readdirSync(target).filter((f) => f.endsWith('.svg')).sort().map((f) => path.join(target, f)) : [target]
const out = {}
for (const f of files) {
  try { out[path.basename(f, '.svg')] = analyse(fs.readFileSync(f, 'utf8')) } catch (e) { out[path.basename(f, '.svg')] = { error: String(e.message || e) } }
}
if (flag('json')) fs.writeFileSync(flag('json'), JSON.stringify(out, null, 2))
if (!quiet) {
  const pad = (v, w) => String(v ?? '-').padStart(w)
  console.log('mark'.padEnd(24) + pad('nodes', 6) + pad('curved', 7) + pad('corner', 7) + pad('smooth', 7) + pad('kink', 5) + pad('extr%', 6) + pad('miss', 5) + pad('tens', 6) + pad('p10', 6) + pad('p90', 6) + pad('circ%', 6) + pad('drawn%', 7) + pad('bal', 6) + pad('g2', 6) + pad('jump', 5) + pad('infl', 5))
  for (const [k, r] of Object.entries(out)) {
    if (r.error) { console.log(k.padEnd(24) + ' error: ' + r.error); continue }
    const pc = (v) => (v === null ? '-' : Math.round(v * 100))
    console.log(k.padEnd(24) + pad(r.nodes, 6) + pad(pc(r.curvedShare), 7) + pad(r.joins.corner, 7) + pad(r.joins.smooth, 7) + pad(r.joins.kink, 5) + pad(pc(r.extremaOnNodes), 6) + pad(r.missingExtrema, 5) + pad(r.tension.median, 6) + pad(r.tension.p10, 6) + pad(r.tension.p90, 6) + pad(pc(r.tension.circleLikeShare), 6) + pad(pc(r.tension.drawnShare), 7) + pad(r.balance, 6) + pad(r.g2.medianRatio, 6) + pad(r.g2.curvatureJumps, 5) + pad(r.inflections, 5))
  }
}
