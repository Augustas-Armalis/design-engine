// Halyard thumbnail sweep (drawing-method step 2): 33 rough silhouettes across 6 families from CONCEPTS.md.
// Run from the repo root: node work/halyard/brand/sweep.cjs  -> work/halyard/brand/sweep.png (120px, 16px, 2px-blurred 32px)
const K = require('../../../tools/logo_drawkit.cjs')
const { Path, Point } = K
const items = []
const P = (x, y) => new Point(x, y)

// sail blade: straight luff (tack -> head), full curved leech (head -> clew), slightly curved foot back to the tack
function sail(tack, head, clew, full = 0.25, footCurve = 0.06) {
  const p = new Path({ closed: true })
  p.moveTo(tack); p.lineTo(head)
  const d = clew.subtract(head), n = new Point(d.y, -d.x).normalize(d.length * full) // outward normal (to the right of head->clew)
  p.cubicCurveTo(head.add(d.multiply(0.33)).add(n), head.add(d.multiply(0.72)).add(n.multiply(0.8)), clew)
  const f = tack.subtract(clew), fn = new Point(-f.y, f.x).normalize(f.length * footCurve)
  p.cubicCurveTo(clew.add(f.multiply(0.33)).add(fn), clew.add(f.multiply(0.66)).add(fn), tack)
  return p
}

// F1 one sail mid-hoist (concept 1): fullness x tilt
for (const full of [0.12, 0.24, 0.36]) for (const tilt of [-8, 0, 10]) {
  const s = sail(P(330, 880), P(380, 110), P(800, 800), full); s.rotate(tilt, P(500, 500))
  items.push({ key: `sail f${full} t${tilt}`, item: s })
}
// F2 jib + main, offset by a step (concept 2)
for (const step of [90, 180]) for (const full of [0.18, 0.3]) {
  const main = sail(P(470, 880), P(500, 100), P(860, 820), full)
  const jib = sail(P(150, 900), P(420, 100 + step + 140), P(430, 900), -full * 0.8, 0)
  items.push({ key: `jib+main s${step} f${full}`, item: main.unite(jib) })
}
// F3 H with a hoisted crossbar (concept 3): bar tilt x bar height
for (const tilt of [10, 20, 30]) for (const by of [300, 420]) {
  const l = new Path.Rectangle({ point: [170, 120], size: [190, 760], radius: 40 })
  const r = new Path.Rectangle({ point: [640, 120], size: [190, 760], radius: 40 })
  const bar = new Path.Rectangle({ point: [300, by], size: [400, 150], radius: 20 }); bar.rotate(-tilt, P(500, by + 75))
  items.push({ key: `H bar t${tilt} y${by}`, item: l.unite(r).unite(bar) })
}
// F4 mast + sail H (concept 4)
for (const full of [0.15, 0.3]) for (const gap of [40, 110]) {
  const mast = new Path.Rectangle({ point: [170, 100], size: [180, 800], radius: 40 })
  const s = sail(P(350 + gap, 860), P(390 + gap, 140), P(860, 760), full)
  items.push({ key: `mast+sail f${full} g${gap}`, item: mast.unite(s) })
}
// F5 the halyard line over a sheave (concept 5): curl x taper
for (const curl of [0.7, 1.1]) for (const to of [0.25, 0.45, 0.7]) {
  const sp = new Path({ segments: [[330, 900], [330, 430]] })
  sp.cubicCurveTo([330, 170], [700, 150], [700, 400]); sp.cubicCurveTo([700, 400 + 220 * curl], [560, 470 + 260 * curl], [560, 460 + 200 * curl])
  items.push({ key: `line c${curl} to${to}`, item: K.sweep(sp, (u) => 230 * K.profiles.taper(1, to)(u)) })
}
// F6 a mass with the falling curve bitten out (concept 7)
for (const n of [2.4, 3.2]) for (const tilt of [-24, 16]) {
  const body = K.superellipse(500, 500, 400, 400, n)
  const bite = K.superellipse(700, 290, 260, 200, n + 0.4); bite.rotate(tilt, P(700, 290))
  items.push({ key: `bite n${n} t${tilt}`, item: body.subtract(bite) })
}

const out = items.map((x) => ({ key: x.key, svg: K.toMarkSvg(K.addExtrema(x.item)) }))
K.renderSheet(out, __dirname + '/sweep.png', { cols: 6 }).then(() => console.log(`sweep: ${out.length} cells -> work/halyard/brand/sweep.png`))
