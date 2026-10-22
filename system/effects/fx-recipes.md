# FX recipes: measured visual and effect layers, as reusable code

Eleven effect layers rebuilt to registration from studio work (2026-10-22). The replicas are `work/replicas/app/src/FxR1..FxR8.tsx` (`#/fxr1`..`#/fxr8`). The study, with rules FX-01.., is `knowledge/web/effects-replicas-2026-10.md`.

Every number below was **measured on the reference, not chosen**. Each recipe names its **brand variables**: change those per brand and keep the ratios. The brand-neutral defaults are the measured values.

## How to use

- **Pick the recipe by the job, not the look.** A light source, a material, a field or a meter.
- **Re-measure after you rebrand.** Render the build and run `work/replicas/fx/fxmeasure.py` against a reference crop. Tone dE is reported on a blurred image, because grain phase is noise.
- **Budget:**
  - at most two looping effects in the first screen (EF rule);
  - every canvas is drawn once (no rAF) unless motion is in scope.
- **Canvas DPR.** Size the canvas at 2x and draw in CSS px: `cv.width = W*2; g.scale(2,2)`.

---

## R1. One-hue light field (scalar intensity + tone LUT)

**From:** FxR1, a 45deg light shaft on a near-black hero.
**Use for:** dark heroes lit by one coloured light.

**The trick.** Every pixel is one hue scaled toward black: R:G:B stays about 255:96:42 from `#050201` to `#fe6e2f`. So compute a scalar `I(x,y)` and push it through a measured ramp. Never mix colours.

```ts
// brand: HUE_RAMP (sample your hue from black to its clipped peak), ANGLE (s = x + y is 45deg), widths
const RAMP = [[0,[5,2,1]],[.06,[13,5,2]],[.12,[26,9,4]],[.2,[45,16,7]],[.3,[78,28,12]],[.42,[114,41,17]],
  [.52,[140,50,21]],[.64,[174,63,26]],[.76,[214,78,33]],[.86,[248,88,37]],[.93,[253,96,41]],[1,[254,110,47]]]
const s = x + y, v = x - y                                  // across / along the shaft
const across = sstep(250, 560, s) * (1 - sstep(690, 860, s))  // wide soft upper edge, ~120px lower edge
             + 0.28 * Math.exp(-(((s - 380) / 60) ** 2))      // faint second band
             + (s > 760 ? 0.16 * Math.exp(-(s - 760) / 95) : 0) // exponential tail under the edge
const along = Math.pow(clamp01((v + 200) / 820), 1.4) + 0.11 * Math.exp(-(((v + 170) / 190) ** 2))
let I = across * along * (1 + streak(s))                     // streaks: 70 lines, +-8%, 0.6-2.2px wide
I += 0.4 * Math.max(0, 1 - Math.hypot((x - 80) / 1.6, y + 40) / 200) ** 1.2 // weak corner wash
```

**Measured along the axis:**

| v (along) | 620 | 520 | 420 | 320 | 220 | 160 | -80 |
|---|---|---|---|---|---|---|---|
| I | .97 | .86 | .66 | .50 | .40 | .30 | .06 |

**Result.** Tone dE 5.6 mean, 2.9 median (blur 1.5 CSS px). Shift +1/+1 px.

## R2. Long soft shadows from one light (ray march)

**From:** FxR1. Glass nodes block the shaft and cast shadows to the lower-left.

For each pixel, march toward the light. Shadow softness grows with the distance to the occluder. A point inside a glass node is **not** shadowed by that node, because glass transmits.

```ts
// brand: LIGHT_DIR, reach 260, hardness 0.12
let sh = 1; const own = nodeAt(x, y)
for (let t = 4; t < 260; t += 4) {
  const k = nodeAt(x + t * 0.72, y - t * 0.72)               // toward the light (+1,-1)
  if (k >= 0 && k !== own) { sh = Math.min(sh, 0.12 + 0.88 * sstep(40, 260, t)); break }
}
I *= sh
```

## R3. Rim-lit glass node (rim stroke + displaced bloom)

**From:** FxR1. A 159px node, r22.

- **Rim.** A 1.5px stroke with a gradient from the corner that faces the light: `#ffe09a` at 0, `#ffb06a` at .28, the hue at .55 (alpha .7), the hue at alpha .08 at 1.
- **Bloom.** Behind the top and lit side, a 14px stroke in the hue at .75. Blur it 6, then displace it with low-frequency turbulence (`baseFrequency .06`, scale 10). The glow then looks like flame, not a CSS box-shadow.
- **Glass.** The fill shows the field: top `#140805` at .35, bottom at .8. A 10px grid of 1px lines at .75 in the darkest ramp colour.

```svg
<filter id="bloom"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" result="n"/>
  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/>
  <feDisplacementMap in="b" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G"/></filter>
```

## R4. Crackling fibre wire

**From:** FxR1.

- A polyline through waypoints, resampled every 2.6px. Each sample is jittered along the normal by +-1.6px from a seeded RNG, with the endpoints pinned.
- Draw it twice: a 2.4px copy blurred 2.2 at .35, then a crisp 1.1px wire in the hue.
- **Brand variables:** amplitude (1-2.5), step (2-4), hue.

## R5. Emitted-light orb (shell + core + top light + emission)

**From:** FxR2, a violet orb. Frame 640x510.

| Layer | Geometry | Paint |
|---|---|---|
| halo | r164 to r232 around the shell | stops at r164 `#5a2ed0` .85 / 172 .55 / 190 `#2c1a55` .35 / 210 .2 / 232 0 |
| atmosphere | stroke ring r173, 18 wide, blur 6 | `#9a66ff` .8, masked to the top: 1 at y110, .8 at y166, 0 at y270 |
| glass shell | circle r164 | vertical: `#e2c8ff` rim, `#f8efff` for the top 11% (the white cap), `#f2a6ff` 15%, `#bf6cff` 24%, `#9050f8` 37%, `#7c50d6` 56%, `#5f36c4` 79%, `#7a50d8` bottom; + an edge radial (white 0 at .9, .45 at 1) |
| core | circle r146, **offset 18px down, tangent to the shell at the bottom** | vertical: `#f6ebff` > `#faa8ff` (3%) > `#d087ff` (8%) > `#aa6eff` (16%) > `#7c4cff` (26%) > `#5f3cfa` (40%) > `#4528e6` (54%) > `#3a24c4` (68%) > `#3c2a9c` (82%) > `#6e50b8` (92%) > `#e9d4ff` |
| meridians | ellipses rx = 20k, ry = r (k = 1..7) + centre line | 1.1px `#e2c4ff` at .72; each band is brightest at its **outer** meridian (radial bbox gradient: 0 at 1-1/k, .22 at 1-.35/k, .45 at 1) |
| emission under | ellipse 175x56 at the bottom | `#5a1ff0` .95 to 0 (the core lights the floor below it) |
| flares | where an orbit pierces the shell | white radial, r 18-22 (white to .3 at 30%, .35 at 60%, 0 at 1) |
| grain | feTurbulence 1.1, two octaves | white at .07 on the core, dark at .5 on the shell |

**Result.** Shift 0/-0.5 px. Tone dE 8.2 at a 5px blur (10.0 at 1.5px; the meridian phase dominates).

## R6. Coloured bezel rim light (the frame is the light)

**From:** FxR3, a product window on `#121212`.

- **The bezel's own fill is the light.** 8.5px solid, outer r18, inner r11.
- **No glow, no bloom, no shadow.** The pixel 1px outside the bezel is the page colour.

```css
/* brand: CORNER (the light's origin), the cobalt -> steel ramp, the counter-light */
.bezel { border-radius: 18px; background:
  radial-gradient(ellipse 700px 610px at 32px 21px, #1a66d6 0, #1963d0 28px, #1d62cb 68px, #1a54ac 108px, #174792 148px,
    #174184 188px, #173d78 228px, #17396c 268px, #173460 308px, #172e52 348px, #162845 388px, #172740 428px,
    #17243b 468px, #172132 548px, #171f2e 588px, #171d29 628px, rgba(23,28,37,0) 700px),
  radial-gradient(ellipse 560px 760px at 1110px 780px, rgba(62,128,180,.9) 0, rgba(40,90,140,.6) 300px, rgba(28,50,85,.35) 480px, transparent 620px),
  #171c25; }
.bezel > .inner { inset: 8.5px; border-radius: 11px; background: #121212; }
```

- The far rim ends at a cool steel `#171c25` (L 10 on an L 5.5 page). It **never** ends at black, so the frame still reads as one object.
- **Result.** Bezel dE 3.0 mean (pixels inside the 8.5px band only). Edges within 0.5px.

## R7. Converging translucent strands + ordered-dither grain

**From:** FxR4, a ribbon on `#131d18`.

- **The strands.** A lobe is 16-26 cubic strands. They start spread along one frame edge (off-frame, so no caps show) and converge on a round tip, each adding 5-9% white. Brightness then builds toward the tip by itself. Add 6-7 stacked "sheets": the same centreline stroked at shrinking widths (150 to 54) at .075 each. The outer sheets run past the tip by 110/60/25px and give the layered rounded ends.
- **The grain.** Dither the tone with a 4x4 Bayer matrix at **1 CSS px per cell** (draw at CSS resolution, `image-rendering: pixelated`), 7 levels, between bg and paper white `#e2e0d8`.

```ts
const BAYER = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v => (v + .5) / 16)
const q = Math.min(L, Math.floor(v * L + BAYER[(y & 3) * 4 + (x & 3)])) / L   // L = 7
rgb = BG + (FG - BG) * q
```

- **Brand variables:** BG, FG, the strand counts, the tip positions, the dither cell (1-2px) and the levels (5-8).
- **Result.** Shift +0.5/0. Tone dE 9.4 at a 3px blur. The shape is approximate (strands were placed by eye, about 20-40px off in places).

## R8. Polar halftone of ring dots with a light band and a hue walk

**From:** FxR5. Frame 240x420, page `#030303`.

- **Lattice.** A polar lattice about an off-frame centre `(-384, 287)`. Columns are arcs with `R_k = 560 - 16.9k`; rows are shared angles `theta_i = .0134 + .029 i`. So the row pitch shrinks leftward: 16.2 at R560, 14.2 at R492, 12.8 at R441.
- **Dots.** Ellipses w x 1.15w with a dark slot (0.8 x 1.5 at w 8.5, colour x .28): they read as ring glyphs.
  - band dots: 8.0 / 7.8 / 7.6 / 7.1 / 6.6 / 5.8px by column;
  - off-band dots: 4.1px grey;
  - far columns: 1-2px.
- **Light band.** A plateau, not a gaussian. It rises 3.5px per column leftward.

  | y | 245 | 260 | 277 | 294 | 311 | 327-343 | 359 | 375 | 391 | 407 | 420 |
  |---|---|---|---|---|---|---|---|---|---|---|---|
  | t | .10 | .30 | .58 | .84 | .96 | 1 | .98 | .87 | .64 | .32 | .12 |

- **Hue walk** by column, right to left: `#f57f46 #ed9653 #bb9970 #73887f #345a6c #1d2a33`, then grey. Off-band grey goes from `#212121` (y 230) down to `#101010` (y 85).
- **Brand variables:** the palette (5-6 stops from warm to cool), the centre and radius, the band table.
- **Result.** Dot centres within 0.5-1px (blob fit). dE 0.76 overall, 1.9 inside the lit region.

## R9. Line-wave ribbon (one formula, two families)

**From:** FxR6. Page `#f2f5f6`, lines 1px `#156975`.

```ts
// N = 30 lines, f = i/(N-1). mid/half/phi are Catmull-Rom splines through knots (x, top, bottom, phi)
y = mid(x) + half(x) * Math.sin(phi(x) + Math.asin(2 * f - 1))
// phi = 0: a flat sheet with even spacing (6px at x 150); phi -> +-pi/2: it folds and lines cross (the mesh); half -> 0: a pinch
```

- **Opacity ramps in from the edge:** x 60 = .18, 100 = .36, 150 = .61, 200 = .82, 300 = .93, 400 = 1.
- **Ghost family.** The same construction with `phi + 0.9`, half x 1.15, lifted up to 30px, at .13 opacity. It gives depth without a shadow.
- **The node.** A pointy-top hexagon r36 with a 1px `#9cc3c8` edge and a white halo r90 (`#fbfcfc` to the page).
- **Result.** Shift +1/-0.5. Tone dE 1.85 at a 3px blur over the line region.

## R10. Two-white double card + segmented tick meter

**From:** FxR7. Page `#f2f1ed`.

- **Two whites carry the hierarchy.** Outer card `#fcfcfa`, r7.3. Inner card `#ffffff` inset 4px on three sides, r6, open to the header above it.
- **Hairline-scale edges:**
  - outer: `0 0 0 .5px rgba(48,40,20,.13), 0 1px 2px rgba(48,40,20,.09)` (edge pixel 10% darker, 14% along the bottom);
  - inner: `0 0 0 .25px rgba(0,0,0,.10), 0 1px 2px rgba(48,40,20,.05)`.
- **Meter.** 83 ticks, each 2.33 x 16, pitch 5.33, fully rounded. Track `#f0f0f0`; active ticks are one saturated hue per row (`#00bcff #00c951 #615fff #ff6900`). Rows are 72px apart.
- **Draw the ticks in SVG, not divs.** Divs snap to device pixels and sub-pixel ticks look uneven.
- **Result.** Shift 0/0. dE 0.94.

## R11. Grainy painted gradient header + glass tiles

**From:** FxR8. A modal on a `#b8b8b8` dim; header 69px, modal r24.

- **2D gradient.** A saturated top row blended into a pastel bottom row (mask 0 at the top + 7px, 1 at the bottom - 3px). A 3px melt into the white body.
  - **Top row:** `#c8b5f2` 0, `#bfaff1` 125, `#b69bf1` 170, `#ae81ec` 200, `#f56dcf` 215, `#fa57a5` 245, `#f77385` 260, `#faaf6f` 275, `#fabe7b` 305, `#fbb986` 335, `#faac8f` 350, `#f78397` 380, `#fa5599` 395, `#f86bbe` 425, `#ee8bdb` 440, `#d4a9ef` 455, `#c6b0f1` 470 (x in a 510 frame).
  - **Bottom row:** the same positions pulled to `#c7b4f1 .. #f1a2f2 .. #fcc9ed .. #c9a4f0`.
- **Grain.** Monochrome (channel correlation .95-1.0), std 8-9/255, independent per device pixel. Do not lag-correlate it along rows: that reads as horizontal streaks.
- **Glass tile.** 40x40, r10:

  ```css
  background: rgba(255,255,255,.16);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.38);
  backdrop-filter: blur(6px) saturate(1.1);
  ```

  White glyphs. Joining dots: 6px, white .22 fill, white .55 ring, 11.7 pitch.
- **Result.** Shift -0.5/-0.5. Header dE 5.9 (grain std matched: 7.2 vs 7.2-9.2 per channel).

---

## The measuring kit (work/replicas/fx/)

| Tool | What it does |
|---|---|
| `fxrefs.py` | Regenerates the reference crops at a 2 px/CSS-px grid. |
| `fxrun.mjs <n>` | Renders `#/fxr<n>` at 2x and measures it. |
| `fxmeasure.py` | Phase-correlation shift, dE on blurred Lab, dL, per-tile dE, heat map, and row/col profile modes. |
| `fxprobe.py` | Colour and L* at points, rows, columns, peaks and percentiles. |
| `fxblobs.py` | Dot and node centres, sizes and colours (fits lattices). |
| `fxgrid.py` | A labelled CSS grid over a crop, for reading coordinates. |
| `fxside.py` | Reference / ours / heat side-by-side. |
| `fxall.mjs` | The final pass, including `tools/compare.mjs` overlays (`cmp-fxr<n>-side/overlay.png`). |
