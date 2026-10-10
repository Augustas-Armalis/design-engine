# Drawing method: how the engine draws a logo mark

This is the executable recipe behind `knowledge/web/logo-drawing.md` (rules LD-01..LD-30). It replaces "pick a family, set parameters, ship" (`tools/logo.mjs sheet`), which produced compass-built marks the founder called road signs. The silhouette targets in `logo-craft.md` (LG-*) and `logo-anatomy-measured.md` (LA-*) still apply; they are the floor, not the method.

The shape of the work, as studios do it: **concepts -> 30+ thumbnails -> 3-4 routes -> draw the chosen route node by node -> optical pass -> refinement sheet -> small-size cut -> presentation in context.**

## 0. Toolchain

| Need | Library | Status (tested 2026-10-10, Node 24) | Use |
|---|---|---|---|
| Path booleans, Bezier fitting, curve maths | **paper.js** 0.12.18 (MIT) | Installs with `--no-save`; runs headless in Node (`require('paper')`, `paper.setup(new paper.Size(1000,1000))`). Unite/subtract/intersect, `simplify()` (Schneider least-squares fit), `getIntersections`, `getTimesWithTangent`, `divideAtTime`, `getCurvatureAtTime` all work. `exportSVG` needs a DOM: write `item.pathData` instead. | The drawing engine. Wrapped by `tools/logo_drawkit.cjs`. |
| Stroke outlining (constant width) | **paperjs-offset** 2.2.1 (MIT) | Works with the `paper` main entry. `offsetStroke(path, w/2, {cap, join})`. Output carries small kinks (measured 4 on a test hook) | Monoline marks only; prefer `sweep()` for anything tapered. |
| Glyph outlines for wordmarks | **opentype.js** 2.0.0 (MIT) | Parses TTF/OTF/WOFF (not WOFF2). Build paper paths from `path.commands` (a path-string round trip into paper fails on Q commands). Static TTFs: `curl -A "Mozilla/4.0" "https://fonts.googleapis.com/css2?family=Geist:wght@500"` returns `.ttf` URLs. | `setWord()`, `probeX()` in the drawkit. |
| Bezier maths without a scene graph | **bezier-js** 6.1.4 (MIT) | Works (`curvature`, `offset`, `extrema`, `reduce`) | Optional checks; the drawkit does not need it. |
| Polygon booleans | **polygon-clipping** 0.15.7 (MIT), **clipper-lib** 6.4.2 (BSL) | Work, but polygons only (curves must be flattened) | Pixel/grid marks only. |
| Path normalising | **svg-path-commander** 2.3.3 (MIT), **svgpath** 2.6.0 (MIT) | Work | Not needed: `tools/logo_curves.mjs` has its own parser. |
| Simplify polylines | **simplify-js** 1.2.4 (BSD-2) | Works | Not needed: paper's `simplify()` fits Beziers directly. |
| Render, rasterise, sheets | **playwright** (already a repo dependency) | Yes | `renderSheet()`, `tools/logo.mjs present`, `tools/logo_measure.mjs`. |
| Curve QA | **`tools/logo_curves.mjs`** (in repo, no dependencies) | Yes | Nodes, kinks, extrema, tension vs circle, drawn share, curvature jumps, inflections. |

Install once at the repo root without touching `package.json` or the lockfile:

```bash
npm install --no-save paper@0.12.18 paperjs-offset@2.2.1 opentype.js@2.0.0
```

All geometry is drawn in a 1000-unit box for precision; `toMarkSvg()` fits the result into the 100-unit box that `work/<name>/brand/marks.mjs` and `node tools/logo.mjs present` expect.

## 1. Concepts (LD-01, LD-23)

Write `work/<name>/brand/CONCEPTS.md`: 8-12 one-sentence concepts, each tagged with its source. At least 4 source types:

- `letter`: the initial or a letter pair, and what its counter or stroke could become.
- `product`: something the product already shows or does (Replit's prompt, Perplexity's citation asterisk, OpenAI's cursor dot, Stripe's i-dot slash): a UI element, a status, a gesture.
- `verb`: what the product does, as motion (hand off, wait, approve, follow).
- `name`: what the word means or sounds like.
- `figure-ground`: a double reading where the negative space is a second object.

Strike any concept that is the category's picture (sparkle, brain, chat bubble, shield, globe, rocket, round gradient blob) or that puts a letter inside a container (LD-20).

## 2. Thumbnail sweep: 30+ silhouettes, judged black at small size (LD-02)

Each concept becomes one or more generator families with 3-6 parameters; sweep them on a grid. The generators below were run end to end (22-cell test sheet, scratch).

```js
// work/<name>/brand/sweep.cjs  (run from the repo root: node work/<name>/brand/sweep.cjs)
const K = require('../../../tools/logo_drawkit.cjs')
const { Path, Point } = K
const items = []

// A. mass with a bite: superellipse body, tilted superellipse bite (tension n, tilt, bite size)
for (const n of [2.2, 2.8, 3.4]) for (const tilt of [-28, -12, 14]) {
  const body = K.superellipse(500, 500, 400, 400, n)
  const bite = K.superellipse(620, 400, 250, 300, n + 0.4); bite.rotate(tilt, new Point(620, 400))
  items.push({ key: `bite n${n} t${tilt}`, item: body.subtract(bite) })
}
// B. one stroke with a width profile along a spine (curl, taper)
for (const curl of [0.6, 1, 1.4]) for (const to of [0.25, 0.5]) {
  const sp = new Path({ segments: [[320, 900], [320, 450]] })
  sp.cubicCurveTo([320, 160], [760, 160], [760, 470])
  sp.cubicCurveTo([760, 470 + 300 * curl], [440, 470 + 260 * curl], [480, 470 + 40 * curl])
  items.push({ key: `hook c${curl} ${to}`, item: K.sweep(sp, (u) => 220 * K.profiles.taper(1, to)(u)) })
}
// C. letter skeleton: stem + bowl stroke, tilted, outer corners continuous, joins pinched
for (const ang of [8, 16]) {
  const stem = K.filletOuter(new Path.Rectangle({ point: [250, 100], size: [180, 800] }), 50, { mode: 'continuous' })
  stem.rotate(ang, new Point(340, 500))
  const arc = new Path({ segments: [[340, 520]] }); arc.cubicCurveTo([520, 300], [820, 360], [760, 640]); arc.cubicCurveTo([720, 860], [480, 900], [360, 800])
  const bowl = K.sweep(arc, (u) => 190 * K.profiles.pinch(0.02, 0.35, 0.08)(u) * K.profiles.pinch(0.98, 0.3, 0.06)(u))
  items.push({ key: `mono a${ang}`, item: stem.unite(bowl) })
}
// D. radial: one drawn, tapered blade repeated 3-5 times
for (const n of [3, 4, 5]) {
  const sp = new Path({ segments: [[500, 470]] }); sp.cubicCurveTo([520, 330], [640, 180], [800, 160])
  items.push({ key: `blade x${n}`, item: K.rotateCopies(K.sweep(sp, K.profiles.taper(150, 40, 0.8)), n) })
}

const out = items.map((x) => ({ key: x.key, svg: K.toMarkSvg(K.addExtrema(x.item)) }))
K.renderSheet(out, __dirname + '/sweep.png') // each cell: 120px, 16px, and a 2px-blurred 32px silhouette
```

Other generator families worth having (same pattern): a letter skeleton taken from the brand font (`setWord()` one glyph, then exaggerate one stroke), metaball nodes (circles united, then `filletOuter` on the necks via an offset in/out), parallel offset repeats (Swell-like wakes: one spine, `sweep` twice with an offset spine), an interlock of two identical drawn modules rotated 180 deg, a mass with a negative-space letter cut.

Rules for the sweep:
- At least 30 cells across at least 4 families; vary the idea, not only the numbers.
- Judge at the small sizes on the sheet, not at 120px. Discard anything that is a blob at 16px, reads as a known logo, or fails the signage test (LD-20).
- Keep 6 candidates and write one sentence each. Converge to 3-4 routes that come from different concept sources (LD-03). Merging two is fine.

## 3. Draw the chosen route properly (LD-05..LD-14)

Rebuild the chosen thumbnail as a clean drawing; do not polish the sweep output.

**3a. Skeleton first.** Write the mark as spines (strokes) and masses (bowls, slabs). One stroke value (or two in a ratio >= 1.6), one angle system (0/90, 45, 30/60, or one tilt of 8-25 deg), one terminal rule.

**3b. Curves with tension.**

```js
// bowls and counters: superellipse, nodes on the 4 extrema, axis-aligned handles
const bowl = K.superellipse(560, 600, 300, 300, 2.4)          // outer: tension(2.4) = 0.664 (ratio 1.20 vs circle)
const counter = K.superellipse(580, 600, 170, 175, 2.6)       // inner: higher tension than outer (LD-06)
K.tension(2) // -> 0.552 circle ; 2.1 -> 0.584 ; 2.4 -> 0.664 ; 2.6 -> 0.709 ; 3 -> 0.783 ; 4 -> 0.909 squircle
```

Targets (LD-06): outer contours at a tension ratio of 1.05-1.27 against a circle (`logo_curves` `tension.median`), counters 0.03-0.05 above their outer contour. Hand-placed curves follow the type rules: nodes on extrema (`K.addExtrema(item)` after booleans), a node at every inflection, the fewest nodes, handles never crossing, both handles of a segment at similar relative length unless you mean to move the curve's shoulder.

**3c. Strokes with weight.** Use `sweep(spine, w)` with a profile, not a constant outline:

```js
const spine = new Path({ segments: [[300, 860], [300, 420]] })
spine.cubicCurveTo([300, 200], [740, 160], [760, 440]); spine.cubicCurveTo([780, 700], [500, 720], [470, 520])
const hook = K.sweep(spine, (u) => 210 * K.profiles.taper(1, 0.3)(u))      // free terminal tapers (LD-12)
const joined = K.sweep(spine, (u) => 190 * K.profiles.pinch(0.5, 0.18)(u)) // thin where another stroke crosses (LD-14)
```

**3d. Corners.** Outer corners soft, inner corners sharp, unless the voice says otherwise:

```js
const slab = K.filletOuter(polygon, 40, { mode: 'continuous', spread: 1.6 }) // G2 with the edges (LD-10)
const crisp = K.filletOuter(polygon, 40, { mode: 'circular' })              // G1, only for tiny radii
```

**3e. Junctions.** Compute crotches, never guess them. Pinch first; ink-trap only for marks used at 24px and below:

```js
const crotchPts = K.crotches(stem, bowl, (p) => p.x > 400)   // where the outlines cross
let m = stem.unite(bowl).subtract(counter)
for (const c of crotchPts) m = K.inkTrap(m, c, 26, 14)        // depth 0.15-0.3 stroke, width 0.08-0.15 stroke
```

**3f. Terminals.** Cut ends with a rectangle or wedge rotated to the mark's angle system (`subtract` a `Path.Rectangle` rotated by the declared tilt). One terminal rule per mark (LD-13).

**3g. Clean-up.** `K.addExtrema(m)`; then run the curve QA:

```bash
node tools/logo_curves.mjs work/<name>/brand/<mark>.svg
# engine-drawn targets: kink 0, extr% >= 90, miss 0, tens 1.03-1.30 (drawn) or a written LD-22 override (compass),
# jump / smooth-curve joins <= 0.3, bal <= 0.15 unless a shoulder is shifted on purpose
```

## 4. Optical pass (LD-15..LD-19)

Do these after the geometry is right, and record each value in DIRECTION.md:

| Correction | Amount | How |
|---|---|---|
| Overshoot rounds / points | 1-3% / 3-5% of H beyond the flats | `K.overshoot(roundPart, 0.02)` before the boolean with flat parts |
| Horizontals thinner | 3-7% vs verticals | separate bar and stem widths in the skeleton |
| Square beside a circle | square about 0.86 of the circle's diameter | size primitives by eye; start at 0.86 |
| Optical centre | 0-3% above geometric centre in favicons / avatars | shift the mark up inside its square |
| Inverse | thin 2-4% of stroke for white on dark | offset the outline inward: `PaperOffset.offset(m, -0.03 * stroke)` |
| Joins | pinch 10-25%, or an ink trap at 24px and below | `profiles.pinch`, `inkTrap` |

Then the "perfect vs optical" check (LD-18): put the as-constructed version next to the corrected one at 256 and 32px; keep whichever looks right, and write down what moved.

## 5. Refinement sheet (LD-04)

Generate 6-12 variants of the chosen drawing in small steps and judge them side by side, the way Koto showed Bolt a 2% angle change:

```js
const steps = []
for (const tilt of [10, 12, 14]) for (const n of [2.6, 2.75, 2.9]) for (const taper of [0.3, 0.4]) {
  steps.push({ key: `t${tilt} n${n} tp${taper}`, svg: K.toMarkSvg(drawMark({ tilt, n, taper })) }) // drawMark = your route as a function
}
K.renderSheet(steps, __dirname + '/refine-1.png', { size: 200, cols: 6 })
```

Pick by eye at 256 and 32px. Repeat in smaller steps if two neighbours tie. Write which step won and why.

## 6. Small-size cut (LD-27)

If the main mark fails LA-04/LA-05 at 16px (`node tools/logo_measure.mjs`), redraw it for 16-24px: strokes +10-20%, gaps and counters opened to >= 7.5% H, the finest detail dropped, the same silhouette. Save it as `<name>-mark-small.svg`.

## 7. Wordmark (LD-24..LD-26)

```js
const opentype = require('opentype.js'); const fs = require('fs')
const font = opentype.parse(fs.readFileSync('work/<name>/brand/fonts/Geist-500.ttf').buffer) // static TTF, not woff2
const w = K.setWord(font, 'tandem', { size: 200, x: 20, baseline: 250, tracking: -0.02, spacing: { 0: 0.01 } }) // spacing: em after glyph i
// edit 1 (the only edit, say): cut the t's crossbar back to its stem, found by measurement not by guess
const t = w.glyphs[0], b = t.path.bounds, stemLeft = K.probeX(t.path, 0.8)[0]
t.path = t.path.subtract(new K.Path.Rectangle({ from: [b.left - 1, b.top - 1], to: [stemLeft, b.top + b.height * 0.5] }))
const d = w.glyphs.map((g) => g.path.pathData).join(' ')
fs.writeFileSync('work/<name>/brand/wordmark.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.ceil(w.width + 40)} 300" fill="currentColor"><path d="${d}"/></svg>`)
```

- Choose a base face with character for this brand (not the build's UI font by default); name it in DIRECTION.md.
- Make 1-3 edits from the menu: one letter's width (Figma's m), an ascender cut to cap height (Discord's d), a severed join (Lyft's f-t), a recut letter (Tumblr's t and r), a negative-space cut tied to the product (Bolt's bolt), a custom weight between two instances, a ligature (Mozilla's ://). Each edit must tie to the product or fix a spacing or colour problem.
- Space by eye: tighten 1-3% at display size, then set individual pairs with `spacing`; review the word upside down and at 16-24px.
- Lockup: mark 1.25-1.6x cap height (`w.capHeight`), gap 0.22-0.33x mark height, mark centred on the cap band (LG-21, LA pairing numbers).

## 8. Tests, then presentation (LD-20, LD-21, LD-28, LD-30)

1. `node tools/logo_curves.mjs work/<name>/brand/` : drawing quality (section 3g targets). Paste the line into DIRECTION.md as `curves: nodes=.. kink=0 extr=..% tens=.. drawn=..% jumps=..`.
2. `node tools/logo_measure.mjs work/<name>/brand/<mark>.svg` : silhouette floor (LA-01..20).
3. Signage test (LD-20), answered in DIRECTION.md: letter in a container? mirror-symmetric, static and orthogonal? circle arcs and rectangles only at one stroke? one reading only? Any yes means redraw, or an LD-22 override with stated relationships.
4. Two brand-mark signals named (LD-21): double reading / asymmetry with balance / implied motion / weight contrast / custom curve with tension / non-obvious cut / product-owned primitive.
5. `node tools/logo.mjs present <name> --from work/<name>/brand/marks.mjs --word <Name> --brand <hex>` : white, brand field, ink, 32/24/16px, measured nav lockup. Each marks.mjs entry is `{ idea, svg: K.toMarkSvg(item) }`.
6. Reference comparison: the finalists next to 6 logosystem references on the same brand field (`knowledge/benchmarks/logos/process/closeread-logosystem-sheet.png` and `logosystem-*.png`). If ours looks like a pictogram next to them, go back to step 2.
7. In place: the chosen mark in the nav, favicon and product avatar of the live build.
8. Show the founder: the route board (3-4 routes), the refinement sheet, the presentation sheet, the in-place screenshots. Record the verdict.

## 9. What not to do

- Do not ship anything straight out of the sweep; sweep output is a pencil sketch.
- Do not put a letter in a disc, square or shield.
- Do not use circle arcs and rectangles only, at one stroke, symmetric, unless LD-22 is argued in writing.
- Do not guess coordinates for crotches, stems or terminals. Measure them with `crotches()` and `probeX()`.
- Do not trust `paperjs-offset` output without running `logo_curves`: it adds small kinks. Prefer `sweep()`.
- Do not present six variants of one idea as six options.
