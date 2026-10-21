# Linear homepage: statement + FIG 0.1-0.3 triptych + Intake start (dark). Replica study notes

Internal study, never published. Route `#/lbento` in `work/replicas/app` (`src/LinearBento.tsx`).
Reference: `knowledge/benchmarks/bento/linear-fig-triptych.png` (1440x1150 CSS @2x). Overlay: `work/replicas/cmp-lbento-overlay.png`, side-by-side `cmp-lbento-side.png`.

How it was measured: I loaded the live page with Playwright at 1440 @2x and scrolled to the section. I read the computed styles, the illustration SVG geometry, the CSS rules (`GJ9TEa_*`, `_3fVNxW_*`, `_4qHHWa_*`) and the projected screen centre of every dot-grid circle. The live capture sits exactly 2 CSS px below the reference (every ink box +4 device px), so all y values below are in the reference frame (live minus 2).

I wrote the line art from my own parametrisation: one fillet-polygon generator plus a slab, a card and a band generator. It is not a copy of their path data. Their standalone SVG, rendered at the same offsets, gives the same device pixels as ours: at (1454,1000) theirs is 161 and ours 163, and row 970 matches to 1-3 levels.

Substitutions:
- Berkeley Mono (the FIG labels) is replaced by Geist Mono at 11.65px, so the ink box matches exactly (81-128 x 323.5-332.5 CSS). The glyph shapes differ.
- The dot-grid opacities are the animation frame frozen in the reference, solved from its pixels.

## Registration result (2x, green channel, ref vs ours)
| Region | Mean abs diff (0-255) | Pixels off by more than 24 |
|---|---|---|
| statement (3 lines) | 0.03 | 218 / 792k (AA only) |
| FIG 0.1 plates | 0.04 | 134 / 384k (sun dome top is sampled at 24 points, not Bezier; one spot where the lifted plate's shadow sits 1-2 levels darker in the ref) |
| FIG 0.2 cubes | 0.13 | 413 / 384k (dot AA; one stroke crossing at the front cube's back corner) |
| FIG 0.3 cards | 0.03 | 1 / 448k |
| titles / descriptions x3 | 0.00 | 0 |
| column dividers, keyline, Intake | 0.00 | 0 |
| FIG labels | 2.47 | substitute font, box exact |

Everything registers within half a pixel. The only visible residuals are the label glyphs.

## Measured tokens (CSS px, reference frame)

### Section spacing
- Statement h2 box 40-184: three lines of 48. Ink cap top 45.5, ink bottom 187.
- 136 from the h2 box to the triptych top.
- Triptych 320-788, height 468, `justify-content: flex-end`.
- 160 from the triptych bottom to the keyline (948/949).
- About 168 from the keyline to the Intake title cap top (1118, `text-box: trim-both cap alphabetic`).
- The 136/160/168 pattern means the section breathes about 3x the 48px headline size.

### Column grid
- The content column is 80-1360 (1280 wide), split into three columns of 426.67 each.
- Insets:
  - Column 1: 0 left, 32 right.
  - Column 2: 32 both sides.
  - Column 3: 32 left, 0 right.
- Text x positions: 80 / 538.67 / 965.33. The outer columns sit flush with the 80px page column; only the inner edges get the 32 gutter.
- Statement and Intake titles sit at x 78: h2 box at 46, padded 32. That is 2px left of the column, the optical overshoot of the capitals.
- The Intake description starts at 752, which is 720 (half of 1440) plus 32.

### Divider
- The divider is the column's `border-right` 1px `rgba(255,255,255,.08)`, rendered `#1b1c1d` on `#08090a`.
- It runs the full column height (320-788). It does not run under the statement or into the gaps.
- The last column has no border, and there are no outer frames.

### Section keyline
- Two stacked 1px full-bleed lines: `#000` at 948, then white .08 at 949. The black line is a shadow, so the hairline reads as cut into the page.

### FIG label
- Tuple: mono 12 / 400 / 16.8, uppercase, `#8a8f98` at opacity .4, which renders `#3c3e43` (L ~.30).
- Placed absolute at the column's top-left (top 0, left = the column inset).
- It is the dimmest text on the page, below the 12px section labels (`#62666d`). It reads as a drawing annotation, not content.

### Title and description
| Element | Tuple | Colour |
|---|---|---|
| title | 15 / 510 / 24 / -0.165px | `#d0d6e0` |
| description | 15 / 400 / 24 / -0.165px, max-width 368, `text-wrap: balance` | `#8a8f98` |

- The title and description have an 8px gap. The block is pinned to the column bottom: title 708-732, description 740-788.
- Title and body are the same size; hierarchy comes only from weight (510 vs 400) and one tone step.

### Statement
- One h2, 48 / 510 / 48 / -1.056px (-.022em), `font-feature-settings "cv01","ss03"`, max-width 1250.
- It is not balanced: `text-wrap: wrap`. Balancing re-breaks the lines (our global `h2 {text-wrap: balance}` had to be overridden).
- Two tones at the same weight:
  - The lead sentence is a `<strong>` at 510 (not bold) in `#f7f8f8` (tier 1).
  - The continuation is `#8a8f98` (tier 4).
  - Tone alone splits claim from explanation.

### Intake start
| Element | Tuple | Colour | Box |
|---|---|---|---|
| title | 48 / 510 / 48 / -1.056 | `#f7f8f8` | "Intake<br>and integrations", max 18ch |
| description | 24 / 400 / 31.92 / -0.288 | `#d0d6e0` | 38ch (566.4), starts at the half-way line |

- Both use `text-box: trim-both cap alphabetic`, so the title cap top (1118) and the description cap top (1119.4) align on the box edges, not on line boxes.

## Line-art recipe (LA-01..15): how to draw new objects in exactly this style

**LA-01 Projection: 2:1 dimetric, not 30deg iso.**
- Every receding edge has slope exactly ±0.5 (26.565deg); verticals stay vertical.
- A square of half-diagonal w projects to a rhombus w wide and w/2 tall (plate: half-width 120, half-height 60; cube: 55.75 / 27.875).
- Evidence: every edge in all three figures, for example a top edge from (129.183, 8.974) to (14.145, 66.493), dx -115.04, dy 57.52.

**LA-02 Stroke weight: 0.5 CSS px, which is one device pixel at 2x.**
- Never 1px for object edges. The SVG is drawn at 1:1 at fractional page offsets.
- A pixel-aligned edge renders at full ink (`#d0d6e0` exactly at device x 1198); an unaligned one splits over two px (`#64686d` + `#c9cfd9`).
- The only 1px strokes are the dotted guides (LA-09).

**LA-03 Ink ladder: four solid hexes, no alpha.**
| Ink | Role | Rendered (2x) |
|---|---|---|
| `#d0d6e0` (tier 2b, L ~.87) | the silhouettes of the subject objects | |
| `#62666d` (tier 5) | a secondary object family (the cards) | |
| `#3e3e44` | hidden or back edges, the glyph, guides, outlines of objects that sit behind | `#38383d`-`#3c3c42` |
| `#2e2e32` | inner fold edges on cubes and cards | |

- The ladder reuses the text tiers, so the drawing and the copy share one grey scale.

**LA-04 Fills are the page colour: occlusion is the only depth cue.**
- Every object is filled `#08090a`, the same as the canvas, and painted back to front, so nearer objects hide farther lines.
- There are no face tones, no gradients and no lighter tops. Measured fill pixels inside objects equal the canvas (sd 0).

**LA-05 One interior line per object: the top face's front edge.**
- The silhouette is stroked plus exactly one fold: the V where the top face meets the two front faces, round-capped.
- Plates inset it 6.857 from the sides (5.7% of the half-width) and drop it 0.86. Cubes inset it 5.75 with no drop.
- The vertical front edge between the two side faces is never drawn, so the box reads as a soft object, not a wireframe.

**LA-06 Screen-space circular fillets, three radii by vertex role.**
- Every sharp vertex gets a circular fillet in screen space; tangent distance d = r / tan(theta/2). That is d = r/2 at the 126.87deg back/front vertices and d = 0.618r at the 116.57deg side vertices.
| Object | back | side | front-bottom | inner fold |
|---|---|---|---|---|
| plates | 6.86 | 3.43 | 10.29 | 10.29 |
| cubes | 7.75 | 3.75 | 7.75 | 8 |
| cards | 1.44 | 3.13 (ends) | | 3.38 |
- On plates the front corner is 1.5x the back corner, so it reads as the nearer, softer corner.

**LA-07 Dimming by depth role, not by alpha.**
- In a stack, every plate's top silhouette is bright, but the front-bottom chain is `#3e3e44` on all plates except the lowest, whose bottom closes the stack silhouette in `#d0d6e0`.
- In the cube cluster, the objects that sit behind or below (the low slab, the floating lid) take `#3e3e44` outlines; the four principal cubes take `#d0d6e0`.

**LA-08 Fades come from page-coloured halos, never from gradients on strokes.**
- Each nearer object carries a Figma "out" drop shadow in the page colour, drawn as a separate fill path before the object.
  - Cubes: blur sigma 16, no offset, `#08090a` at 100%.
  - The lifted plate: sigma 6, dy 4, 60%.
- Lines of farther objects fade out as they approach a nearer object. For example, the low slab's `#3e3e44` edge renders `#333439`, about -20%.
- There are no masks or gradients on strokes anywhere.

**LA-09 Dotted construction guides only in the gaps.**
- 1px `#3e3e44`, `stroke-dasharray: 1 3`, round caps, which gives 2px capsules on a 4px pitch.
- They are vertical through the three visible corners (left and right inset .43, plus the front centre).
- They are masked out over every plate's front-face band (the face band ±3.6px), so they appear only between the lifted plate and the stack, and across the stack's top face. They read as an exploded-view alignment.

**LA-10 Explode by lifting one layer.**
- Stack: 5 plates at pitch 16.30 with thickness 20.54. The pitch is 0.79h, so the plates overlap and each shows only a sliver of side.
- The top plate is lifted 48 above the stack (2.9 pitches), with its own shadow.
- Hover lifts further: `--purpose-lift` 31.667px, `transform .7s cubic-bezier(.32,.72,0,1)`. The idea "many layers, one surfaced" is told only by spacing.

**LA-11 Marks on a face are drawn in the face plane as hairlines.**
- The sunset glyph is a circle in the top plane: a 2:1 ellipse, rx 54.86 (0.457 of the half-width), centred on the face centre +0.86.
- It is sliced into alternating 4.064px bands: dome, two bars, a lens. Stroked `#3e3e44` 0.5, no fill.
- The mark is dimmer than the object it sits on (`#3e3e44` on a `#d0d6e0`-edged plate), so the object stays the subject.

**LA-12 Dot-grid labels as live data.**
- A 5x5 grid of r1 dots at 3.5 pitch in a 16px tile, `#e4e5e9`, group opacity .7, resting .3 per dot. Dots animate to 1 to show agent activity.
- It lies on a cube top via CSS 3D: `rotateX(60deg) rotateY(3deg) rotate(43deg) scale(.85-.9)`, perspective 1000.
- Its affine equivalent per dot step is u ≈ (2.17, 1.14), v ≈ (-2.03, 1.03) (fit error 0.04px). We draw it as `matrix(u/3.5, v/3.5, centre)`.
- Only three of six cubes carry one, and it is the only element that can outshine the `#d0d6e0` edges.

**LA-13 Rhythm objects from one primitive repeated on an iso axis.**
- FIG 0.3 is 15 identical thin slabs: length 118.06 x 59.03, thickness 3.13 x 1.565. They are stepped by (-8.45, +4.225) along the other axis, on one ground line.
- Heights follow a peak profile: 20.5, 34.0, 54.3, 81.4, 128.7 (max, 5th from the back), 81.4, 54.3, 34.0, 20.5, 13.8, 10.4, 8.7, 7.85 x3.
- They are drawn back to front in mid ink `#62666d`, with a `#2e2e32` fold line along the top-front edge and down the right end.

**LA-14 Scale and placement.**
- Objects are 265-304 wide in a 426 column (62-71%), centred in the space between the FIG label and the text block (the CSS grid uses `place-items: center`).
- About 60px clear above the title. One object or cluster per column, all at the same visual weight. No object touches a divider.

**LA-15 Monochrome by construction.**
- The whole section has no chroma beyond the inks' faint blue (`#d0d6e0` B-R +16). Colour, light and shading are all absent.
- Hierarchy comes from the ink ladder (LA-03), occlusion (LA-04) and halos (LA-08).
- This is the dark-mode counterpart of the Kargul grey-only rule (ISO-38), with thinner lines: 0.5 vs 1px.

## Differences from the Kargul iso grammar (ISO-31..38)
| Axis | Kargul | Linear |
|---|---|---|
| projection | true 30deg iso | 2:1 dimetric |
| objects | flat sheets | real volumes (slabs, cubes, cards) with rounded fillets |
| edges | three alpha steps at 1px | solid hexes from the text ladder at 0.5px |
| nodes | diamond corner nodes | none |
| guides | dashed guides run to the cell edge | 1-3 dotted guides only inside the explosion gaps |

Both share page-coloured fills, no shading, greys only, and one detail glimpsed on a top face.

## Open items
- The FIG label glyphs (Berkeley Mono) are not available. Geist Mono at 11.65px matches the ink box, not the letterforms.
- The reference frame shows the lifted plate's shadow 1-2 levels darker at one spot (device row 970, x 371+) than both the standalone SVG and ours. This is probably a transition frame; we did not chase it.
- The dot-grid opacities are one animation frame. The live page cycles them (classes `grid-dot-r-c-upDown | pong | agent`).
