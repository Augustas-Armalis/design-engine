// logo_drawkit.cjs: draw logo marks with real Bezier craft instead of compass primitives.
// Method and rules: system/logo/drawing-method.md, knowledge/web/logo-drawing.md (LD-01..LD-30).
//
// Needs paper.js (MIT) and, for wordmarks, opentype.js (MIT). They are NOT in package.json; install without saving:
//   npm install --no-save paper@0.12.18 paperjs-offset@2.2.1 opentype.js@2.0.0
// (verified 2026-10-10 on Node 24: paper runs headless in Node for geometry, booleans, simplify and pathData;
//  only exportSVG needs a DOM, so this kit writes path data itself).
//
// Every function works in an arbitrary unit box (draw at 1000 for precision) and toMarkSvg() fits the result to the
// 100-unit box that tools/logo.mjs `present` and work/<name>/brand/marks.mjs expect.
let paper
try { paper = require('paper') } catch { throw new Error('logo_drawkit: run `npm install --no-save paper@0.12.18 paperjs-offset@2.2.1 opentype.js@2.0.0` first') }
paper.setup(new paper.Size(1000, 1000))
const { Path, Point, CompoundPath, Segment } = paper

// ---------- curve tension ----------
/** Handle ratio (Tunni tension) of a superellipse quadrant |x|^n + |y|^n = 1 drawn with one cubic per quadrant.
 *  n = 2 -> 0.5523 (circle), 2.5 -> 0.688, 3 -> 0.783, 4 -> 0.909 (squircle). Type curves sit at ~0.58-0.70. */
const tension = (n) => (8 * Math.pow(2, -1 / n) - 4) / 3

/** Superellipse with nodes on the four extrema and axis-aligned handles (type-design node discipline).
 *  nX tension along the horizontal sides, nY along the vertical ones; pass different values for a "squarer top". */
function superellipse(cx, cy, rx, ry, n = 2.6, nY = n) {
  const tx = tension(n), ty = tension(nY)
  return new Path({
    segments: [
      new Segment(new Point(cx + rx, cy), new Point(0, -ry * ty), new Point(0, ry * ty)),
      new Segment(new Point(cx, cy + ry), new Point(rx * tx, 0), new Point(-rx * tx, 0)),
      new Segment(new Point(cx - rx, cy), new Point(0, ry * ty), new Point(0, -ry * ty)),
      new Segment(new Point(cx, cy - ry), new Point(-rx * tx, 0), new Point(rx * tx, 0)),
    ], closed: true,
  })
}

// ---------- strokes with a width profile ----------
/** Sweep a variable-width stroke along a spine path. w(u) = full width at u in [0,1] (taper, swell, thin-at-junction).
 *  Each side is fitted separately with paper's least-squares simplify (few nodes, smooth) and joined by straight caps. */
function sweep(spine, w, { samples = 72, tolerance = 0.5 } = {}) {
  const L = spine.length, left = new Path(), right = new Path()
  for (let i = 0; i <= samples; i++) {
    const off = Math.min(L, (i / samples) * L), p = spine.getPointAt(off), nrm = spine.getNormalAt(off), h = Math.max(0.5, w(i / samples) / 2)
    left.add(p.add(nrm.multiply(h))); right.add(p.subtract(nrm.multiply(h)))
  }
  left.simplify(tolerance); right.simplify(tolerance); right.reverse()
  const outline = left.clone(); outline.join(right); outline.closePath()
  left.remove(); right.remove()
  return outline
}
/** Common width profiles (multiply by the base stroke). */
const profiles = {
  taper: (from = 1, to = 0.3, ease = 1.6) => (u) => from + (to - from) * Math.pow(u, ease),
  swell: (end = 0.7, mid = 1) => (u) => end + (mid - end) * Math.sin(Math.PI * u),
  pinch: (at = 0.5, depth = 0.18, spread = 0.12) => (u) => 1 - depth * Math.exp(-((u - at) ** 2) / (2 * spread * spread)), // thin where another stroke joins
}
/** Monoline outline with round or butt caps (paperjs-offset). Use when the stroke is constant; prefer sweep() otherwise. */
function outlineStroke(spine, width, cap = 'round') {
  const { PaperOffset } = require('paperjs-offset')
  return PaperOffset.offsetStroke(spine, width / 2, { cap, join: 'round' })
}

// ---------- corners ----------
/** Round only convex (outer) corners of a polygonal path; concave (inner) corners stay sharp or get `inner` radius.
 *  mode 'circular': a circular-arc fillet of radius r (curvature jumps 0 -> 1/r at both tangent points: G1, reads as
 *  "rounded rectangle"). mode 'continuous': both handles run to the corner vertex (P1 = P2 = V), so curvature is 0 where
 *  the curve meets each straight edge and ramps up to the middle (G2 with the edges, the squircle / iOS corner);
 *  spread (1.4-2.0) scales the tangent distance so the corner reads about as big as a circular r.
 *  Verify with tools/logo_curves.mjs: continuous corners report curvatureJumps = 0. */
function filletOuter(path, r, { mode = 'circular', spread = 1.6, inner = 0 } = {}) {
  const pts = path.segments.map((s) => s.point.clone()), n = pts.length, area = path.area, out = []
  for (let i = 0; i < n; i++) {
    const p = pts[i], a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n]
    const v1 = a.subtract(p).normalize(), v2 = b.subtract(p).normalize(), cross = v1.x * v2.y - v1.y * v2.x
    const convex = area > 0 ? cross < 0 : cross > 0, rr = convex ? r : inner
    if (!rr) { out.push(new Segment(p)); continue }
    const theta = Math.acos(Math.max(-1, Math.min(1, v1.dot(v2)))), turn = Math.PI - theta
    const want = (rr * (mode === 'continuous' ? spread : 1)) / Math.tan(theta / 2)
    const d = Math.min(want, a.subtract(p).length * 0.45, b.subtract(p).length * 0.45)
    const hl = mode === 'continuous' ? d : d * Math.tan(turn / 2) * (4 / 3) * Math.tan(turn / 4) // circular: exact arc handle
    out.push(new Segment(p.add(v1.multiply(d)), null, v1.multiply(-hl)))
    out.push(new Segment(p.add(v2.multiply(d)), v2.multiply(-hl), null))
  }
  return new Path({ segments: out, closed: true })
}

// ---------- junctions ----------
/** Crotch points where two shapes' outlines cross (compute them; never guess coordinates). */
const crotches = (a, b, keep = () => true) => a.getIntersections(b).map((x) => x.point).filter(keep)
/** Ink trap: cut a narrow wedge into a concave junction so it does not clog at small sizes. The direction into the
 *  ink is found by sampling a ring around the crotch. depth ~0.15-0.3 stroke, width ~0.08-0.15 stroke. */
function inkTrap(shape, crotch, depth, width) {
  const N = 144, inside = []
  for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2; inside.push(shape.contains(crotch.add(new Point(Math.cos(a), Math.sin(a)).multiply(depth)))) }
  let best = null
  for (let i = 0; i < N; i++) {
    if (!inside[i] || inside[(i - 1 + N) % N]) continue
    let j = i; while (inside[(j + 1) % N] && j - i < N) j++
    if (!best || j - i > best[1] - best[0]) best = [i, j]
  }
  if (!best) return shape
  const a = ((best[0] + best[1]) / 2 / N) * Math.PI * 2, d = new Point(Math.cos(a), Math.sin(a)), nrm = new Point(-d.y, d.x)
  const wedge = new Path({ segments: [crotch.subtract(d.multiply(width)).subtract(nrm.multiply(width / 2)), crotch.add(d.multiply(depth)), crotch.subtract(d.multiply(width)).add(nrm.multiply(width / 2))], closed: true })
  return shape.subtract(wedge)
}

// ---------- node hygiene ----------
/** Split every curve at its horizontal / vertical extrema so nodes sit on extrema with axis-aligned handles. */
function addExtrema(item) {
  for (const p of item.children ? item.children : [item]) {
    for (let i = p.curves.length - 1; i >= 0; i--) {
      const c = p.curves[i]
      const ts = [...c.getTimesWithTangent(new Point(1, 0)), ...c.getTimesWithTangent(new Point(0, 1))].filter((t) => t > 0.02 && t < 0.98).sort((x, y) => y - x)
      for (const t of ts) c.divideAtTime(t)
    }
  }
  return item
}

// ---------- optical ----------
/** Overshoot a round part: scale it about its own centre by pct (0.01-0.03 for rounds, up to 0.05 for points). */
function overshoot(item, pct = 0.02) { item.scale(1 + pct, item.bounds.center); return item }
/** Rotational copies (radial family) of one drawn module about c. */
function rotateCopies(module, n, c = new Point(500, 500), offsetDeg = 0) {
  let acc = null
  for (let i = 0; i < n; i++) { const m = module.clone(); m.rotate(offsetDeg + (360 / n) * i, c); acc = acc ? acc.unite(m) : m }
  return acc
}

// ---------- fonts (wordmarks) ----------
/** opentype.js path -> paper CompoundPath (built command by command; do not round-trip through a path string). */
function otToPaper(otPath) {
  const cp = new CompoundPath(); let cur = null
  for (const c of otPath.commands) {
    if (c.type === 'M') { cur = new Path(); cur.moveTo(new Point(c.x, c.y)); cp.addChild(cur) }
    else if (c.type === 'L') cur.lineTo(new Point(c.x, c.y))
    else if (c.type === 'Q') cur.quadraticCurveTo(new Point(c.x1, c.y1), new Point(c.x, c.y))
    else if (c.type === 'C') cur.cubicCurveTo(new Point(c.x1, c.y1), new Point(c.x2, c.y2), new Point(c.x, c.y))
    else if (c.type === 'Z') cur.closePath()
  }
  return cp
}
/** Set a word from a static TTF/OTF/WOFF (not woff2) as editable glyph outlines.
 *  tracking in em (-0.01..-0.03 at display size); spacing[i] adds em units after glyph i (manual optical spacing). */
function setWord(font, text, { size = 200, x = 0, baseline = 250, tracking = -0.02, kerning = true, spacing = {} } = {}) {
  const s = size / font.unitsPerEm, glyphs = []
  for (let i = 0; i < text.length; i++) {
    const g = font.charToGlyph(text[i]), next = text[i + 1] ? font.charToGlyph(text[i + 1]) : null
    glyphs.push({ ch: text[i], x, path: otToPaper(g.getPath(x, baseline, size)) })
    x += g.advanceWidth * s + (next && kerning ? font.getKerningValue(g, next) * s : 0) + (next ? (tracking + (spacing[i] || 0)) * size : 0)
  }
  return { glyphs, width: x, capHeight: (font.tables.os2.sCapHeight || 0) * s, xHeight: (font.tables.os2.sxHeight || 0) * s }
}
/** Measure a glyph by probing: x positions where a horizontal line at fraction fy of its height crosses the outline. */
function probeX(item, fy) {
  const b = item.bounds, y = b.top + b.height * fy, line = new Path.Line(new Point(b.left - 5, y), new Point(b.right + 5, y))
  const xs = item.getIntersections(line).map((h) => h.point.x).sort((m, n) => m - n); line.remove(); return xs
}

// ---------- output ----------
const pd = (item) => item.pathData
/** Fit an item into the 100-unit box (centred, keeping aspect, `pad` units margin) and return inner SVG for marks.mjs. */
function toMarkSvg(item, pad = 4) {
  const c = item.clone(), b = c.bounds, k = (100 - 2 * pad) / Math.max(b.width, b.height)
  c.scale(k, b.center); c.position = new Point(50, 50)
  const d = c.pathData; c.remove()
  return `<path fill-rule="nonzero" d="${d}"/>`
}
const svgDoc = (inner, box = 100) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box} ${box}" fill="currentColor">${inner}</svg>`

/** Render a thumbnail sheet: items = [{ key, svg }] (svg = inner SVG in the 100 box). Black on white at `size`,
 *  plus the same at 16px and a 2px-blurred 32px silhouette, so a sweep of 30+ sketches is judged by eye at once. */
async function renderSheet(items, outPng, { size = 120, cols = 6 } = {}) {
  const { chromium } = require('playwright')
  const cell = (it) => {
    const src = 'data:image/svg+xml;base64,' + Buffer.from(svgDoc(it.svg)).toString('base64')
    return `<figure><img src="${src}" width="${size}" height="${size}"><div class="s"><img src="${src}" width="16" height="16"><img class="b" src="${src}" width="32" height="32"></div><figcaption>${it.key}</figcaption></figure>`
  }
  const html = `<style>body{margin:16px;font:11px ui-monospace,monospace;display:grid;grid-template-columns:repeat(${cols},${size + 24}px);gap:12px}figure{margin:0;padding:12px;background:#fff;border:1px solid #ddd}.s{display:flex;gap:10px;align-items:center;margin-top:8px}.b{filter:blur(2px)}figcaption{margin-top:6px;color:#555}</style>${items.map(cell).join('')}`
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: cols * (size + 36) + 32, height: 800 } })
  await p.setContent(html); await p.waitForTimeout(150); await p.screenshot({ path: outPng, fullPage: true }); await b.close()
}

module.exports = { paper, Path, Point, CompoundPath, Segment, tension, superellipse, sweep, profiles, outlineStroke, filletOuter, crotches, inkTrap, addExtrema, overshoot, rotateCopies, otToPaper, setWord, probeX, pd, toMarkSvg, svgDoc, renderSheet }
