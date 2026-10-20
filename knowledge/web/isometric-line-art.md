---
source: measured (Playwright canvas crops and pixel profiles, 2026-10-21) on knowledge/benchmarks/bento/kargul-services-bento.png (2880x1920 @2x), kargul-deep/gallery boomtax-01/02, chatsheet-02/04, opero-labs-01/02, uplinq-12/14, lemon-01, gopher-06, defendlab-05, bento/linear-fig-triptych.png; web:https://www.ibm.com/design/language/illustration/isometric-style/design ; web:https://en.wikipedia.org/wiki/Isometric_projection ; web:https://en.wikipedia.org/wiki/Isometric_video_game_graphics ; web:https://pixelparmesan.com/fundamentals-of-isometric-pixel-art/ ; web:https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect ; founder verdict 2026-10-21 (founder-taste.md, Cadence bento v3)
chapter: Isometric line art for SaaS bento and feature cells: projection, stroke ladder, fills, nodes, composition, SVG construction
pages: n/a (web + measured)
topic_tags: [isometric, line-art, illustration, bento, svg, stroke, hatch, dots, grain, projection, dark-mode, light-mode, kargul, linear]
status: studied
---

# Isometric line art (the Kargul bento style), measured

**Answer.** The style the founder loves is a technical drawing, not an illustration: one true-isometric projection (30deg axes, 1.732:1 diamonds) for every object in the set, one 1px stroke weight whose *alpha* carries the hierarchy (dark: focal 66%, others 28-42%, guides 18%, grid 12% white), flat fills only one or two steps off the cell colour, side faces separated by treatment (a 3px hatch on the shade face, grain on the lit face) instead of by gradients, and a small kit of technical marks (6px in-plane square nodes that read as 10x6 diamonds, dashed 4/2 guides that fade away from the object, 1px dots on a 5px pitch, dotted leaders to mono labels). There is exactly one solid bright fill per cell: the brand mark or the answer. Precision comes from construction, not care: compute every point in world space, project it in code, emit screen-space paths with no transforms, and build curves as in-plane Beziers whose control points are projected. The kit is `system/iso/iso.tsx` (specimen `system/iso/demo.png`).

## 1. Core ideas

1. **Kargul uses true isometric, Linear uses 2:1 dimetric.** Kargul plate edges measure 30.4deg and his diamond nodes 20x12 device px (ratio 1.67-1.73, i.e. a projected square); Opero edges 29.6deg. Linear's FIG triptych edges measure exactly 0.5 slope (26.565deg). The 2:1 slope exists because it stair-steps cleanly on square pixels; 30deg cannot be drawn with uniform whole-pixel steps (Pixel Parmesan, Wikipedia). [M][W]
2. **One stroke weight, alpha hierarchy (dark).** Every Kargul line is ~1 CSS px (2.0-2.4 device px vertical cross-section across a 30deg line = 1.04 CSS px). Hierarchy is lightness: top-layer outline peaks at 177-191 on #313131 (62-69% white), lower layer outline 106 (28%), in-plane UI detail 108-110 (29%), vertical dashed edges 102 (26%), dashed guides 81-93 (16-21%), dotted grid 75 (13%). [M]
3. **Light mode ranks by weight and grey.** Opero: outline 1.25-1.5 CSS px at #1e1e1e, inner text lines 1 CSS px at ~#969696. Boomtax connectors ~1.2 CSS px at #aaa-#b2b2b2. ChatSheet outlines ~1.5 CSS px at #7d8fbf (one hue family). [M]
4. **Faces are flat; treatment separates them.** Kargul plate fill is #2e2e2e on a #313131 cell (3 levels darker). The shade face carries dark hatch lines (min 25-33 on a 46 face, i.e. black ~30%) at a ~3.5 CSS px vertical period, parallel to the face's long edge; the lit face carries fine grain. Light from screen-right: lit face right, hatch left. No gradients on Kargul's dark faces; ChatSheet light uses a white-to-#dbe6ff in-face gradient. [M]
5. **Nodes are squares drawn in the surface's plane.** On a top plane they become diamonds (10.4x6 CSS px: a 6-unit square); on vertical layers they become parallelograms (~5 CSS px). Top-layer nodes are solid #d9d9d9 (~81%); lower-layer nodes mid-grey (~28%). Depth = node alpha. [M]
6. **Guides are dashed, fine, and fade.** Ground guides: dash ~4 CSS / gap ~2 CSS (12 device px period), alpha rising from 16% far away to 21% near the object, so lines brighten toward the hero. Fine grid lines are 1px square dots at a 5 CSS px pitch. Vertical drop edges between layers: dash 2 / gap 1 CSS. Opero light floor grid: dash ~4 / gap ~3 CSS with small + marks at intersections. [M]
7. **Exploded layers carry the story.** Branding: logo plate floating 36 CSS px above a hatched/grain sheet whose side is ~98 CSS px (gap ~0.37 x side). Full-stack: app slab 14.6 CSS px thick on a 78 CSS px side (0.19 x side) with satellite plates on axis connectors. Product UI: 3 upright layers stepped along one axis, back layers textured (pixel grid, halftone), front layer the brightest outline. Uplinq dark: two dark slabs with a gap ~1.5x their thickness and a cyan accent only on the payload. [M]
8. **Text inside the art is texture.** Kargul never writes real copy on plates: text = a grain-filled bar plus 2-4 hairlines; a real word appears only as a tool mark (NEXT.js, px). [M]
9. **The art is a crop of a bigger system.** Scenes are ~1.9-2.2x the tile width and bleed off its edges (kargul-deep-study). Full websites fades its card stack into the cell at the bottom; guides run to the cell edge. [M]
10. **One accent.** Kargul dark: solid white only on the brand mark. Boomtax: blue tiles + one green check, everything else grey. ChatSheet: one black plate as the pivot among blue. Opero: the solid black logo block. Defendlab: red halftone glow only around the exploit. [M]
11. **IBM's isometric system agrees on the craft rules:** snap anchor points to grid intersections, never use non-isometric angles for primary elements, build curves from quarter circles on the grid, keep nested curves equally spaced with increasing radii, one light source and one shadow style per illustration or set, avoid blend-mode lighting effects. [W]

## 2. Rules

- **ISO-01 RULE** Choose one projection per site and use it in every cell: true isometric (30deg, cube top = 1.732:1 diamond) for the Kargul look; 2:1 dimetric (26.565deg) only when the art is hairline-only at 1 device px and crispness beats fidelity (Linear).
  **Why** Mixed angles read as clip art from different packs; 30deg is what Kargul ships, 2:1 is what renders cleanest at 1px.
  **Applies to** bento, feature, hero art. **Check** measure two edges per cell: slope 0.577 (iso) or 0.500 (dimetric) +-0.01; diamond node w/h 1.73 or 2.0. **Source** [M] Kargul 30.4deg, Opero 29.6deg, Linear 0.500; Wikipedia; Pixel Parmesan.
- **ISO-02 RULE** Dark mode: one stroke weight (1 CSS px) and a 4-step alpha ladder: focal 0.66, primary 0.42, secondary/detail 0.28, guide 0.18, grid 0.12 (white on #2e-#31 grey). Light mode: focal 1.5px #1e1e1e, primary 1.25px 78% ink, secondary/detail 1px 40-42% ink, guide 1px 30%, grid 1px 14%.
  **Why** Equal weights make five unlike scenes one set; alpha (dark) or weight+grey (light) gives depth without clutter.
  **Applies to** all iso art. **Check** sample stroke peaks: no more than 2 distinct widths per scene; focal peak >= 2x the guide peak above background. **Source** [M] Kargul profiles; Opero, Boomtax, ChatSheet.
- **ISO-03 RULE** Never scale or skew a stroked element. Project points in code and emit screen-space paths; render the SVG 1:1 (width = viewBox width); add `vector-effect="non-scaling-stroke"` only as a guard.
  **Why** An SVG `matrix()` on a stroked group shears the stroke (thick on one axis, thin on the other) and stretches dashes; non-scaling-stroke fixes width but dash behaviour under transforms is not guaranteed (open question 1).
  **Applies to** SVG builds. **Check** grep the art: no `transform=` on any element with a stroke; no `patternTransform` with scale. **Source** MDN vector-effect; [engine note].
- **ISO-04 RULE** Build every curve in the object's own plane as cubic Beziers (rounded corners, circles via k = 0.5523) and project the control points; never draw an ellipse by eye.
  **Why** A parallel projection is affine and affine maps preserve Beziers, so the result is the exact projected circle (on the top plane a 1.732:1 ellipse at 0deg); eyeballed ellipses are the first amateur tell.
  **Applies to** all iso art. **Check** an iso circle's bbox ratio = 1.732 (top plane); corner arcs tangent to both edges. **Source** [engine note]; IBM (curves from quarter circles on the grid).
- **ISO-05 RULE** For 1px work at DPR 1, snap projected points to 0.5px and set vertical edges on x.5; at DPR >= 2 do not snap (geometricPrecision). Prefer 2:1 dimetric if the art must look crisp on DPR-1 screens.
  **Why** A 1px line centred on an integer pixel blurs over two pixels; 30deg diagonals anti-alias whatever you do, 2:1 steps are clean.
  **Applies to** SVG builds. **Check** vertical edge x mod 1 = 0.5 at DPR 1. **Source** Pixel Parmesan; [engine note].
- **ISO-06 RULE** Fill faces flat and close to the ground: dark plate top = cell -3 levels (#2e2e2e on #313131), shade face -7 (#2a2a2a) + a hatch of black 30-34% at 3px spacing parallel to the face's long edge, lit face +2 (#333) + grain 18-22%. Light: top #fff, shade #f3f3f3, lit #fafafa.
  **Why** Low-contrast fills keep the line the hero; treatment (hatch vs grain) separates faces without gradient banding.
  **Applies to** plates, boxes, towers. **Check** face lightness within 8 levels of the cell; exactly one face hatched per prism. **Source** [M] Kargul full-stack and landing-pages side faces.
- **ISO-07 RULE** Keep one light direction for the whole set (default from screen-right: right face lit, left face hatched, cast shadows fall toward +y / screen-left-down) and one shadow style (flat or gradient, never both).
  **Why** Different shadow angles imply several suns and break the "engineered" read.
  **Applies to** iso sets. **Check** visual: hatched face on the same side in every cell. **Source** IBM light source + shadow types; [M] Kargul.
- **ISO-08 RULE** Draw nodes as squares in the surface's own plane: 6 units on top planes (renders 10.4x6px diamond), ~5 units on walls; top-layer nodes solid (#d9d9d9 dark / #1e1e1e light), lower layers at 28-30%; cable ends as in-plane ring circles with background fill.
  **Why** A screen-space square or circle on an iso surface is the wrong projection and looks pasted on.
  **Applies to** all iso art. **Check** diamond w/h = 1.73 +-0.05; node sizes identical across cells. **Source** [M] Kargul 20x12 device px nodes; Opero ring nodes.
- **ISO-09 RULE** Guides: 1px dashed 4/2 (dark) or 5/4 (light), along iso axes only, from the object's corners to past the cell edge, fading from 0.18 near the object to 0 at the edge. Grid: 1px dots on a 5px pitch (dark) or a dashed floor with 2.5-unit + marks (light), radially faded.
  **Why** Guides tie the object to the cell's structure (it sits on a drawing, it does not float), and the fade keeps the edge quiet.
  **Applies to** bento cells. **Check** guide alpha decreasing with distance; no guide at a non-iso angle. **Source** [M] Kargul dash period 12 device px, alpha 16->21% toward the plate; Opero floor.
- **ISO-10 RULE** One hero object per cell, drawn as the product's own object (its plate, its stack, its screens), at 45-65% of the cell's art area, cropped by the cell when the scene is a system; satellites at secondary alpha on axis connectors.
  **Why** One focal point per viewport; the object explains the product, a decorative cube does not.
  **Applies to** bento. **Check** visual + count: exactly one element at focal alpha per cell. **Source** [M] all Kargul tiles; kargul-deep-study (art 1.8-2.3x tile width).
- **ISO-11 RULE** Explode layers on z with a gap of 0.3-0.4x the plate side (or stack packed sheets at a 5px pitch); connect exploded corners with 2/1 dashed verticals; the top layer is focal, lower layers step down the alpha ladder.
  **Why** An exploded view shows composition (logo over system, app over data) in one glance.
  **Applies to** stacks. **Check** gap/side ratio 0.3-0.4; connectors dashed. **Source** [M] Kargul branding 0.37, full-stack slab 0.19 thickness; Boomtax packed stacks ~5px.
- **ISO-12 RULE** One solid bright fill per cell: the brand mark, the answer row or the payload. Everything else is line, flat near-ground fill, hatch, grain or dots. In colour builds the accent is one hue on <= 3% of the cell.
  **Why** The eye goes to the only solid; two solids split attention.
  **Applies to** bento, hero art. **Check** count fills with lightness > 80% (dark) or < 20% (light): exactly 1 per cell. **Source** [M] Kargul logo, Opero logo block, ChatSheet black plate, Uplinq cyan.
- **ISO-13 RULE** Callouts: anchor node on the object, a 1px dotted leader (1/3) with at most one elbow, ending in an upright pill (18px tall, radius 9, 1px ring at primary alpha, mono 10px caps +0.06em). Labels never get projected unless they are a tool mark printed on a surface.
  **Why** Upright labels read; a projected label is part of the object (Kargul's "px"), not a callout.
  **Applies to** iso art with annotation. **Check** leader angle = an iso axis or horizontal; pill height 18px. **Source** [M] Kargul dotted leader to the px mark; [engine note] pill spec matches the chip row (10.5px caps).
- **ISO-14 RULE** Fade the scene into the cell: radial mask from ~65% radius, or a bottom fade over the last 25% of the art; guides run past the edge.
  **Why** A scene that ends in a hard rectangle reads as a pasted image.
  **Applies to** bento. **Check** art opacity at the cell edge <= 0.2. **Source** [M] Kargul full websites stack fade, perspective grid fade.
- **ISO-15 RULE** Text inside the art is texture: a grain bar (5-6 units tall, 40-55% width) plus 2-4 hairlines 4 units apart; real words only as tool marks (product names, units).
  **Why** Fake copy at 4px is noise; texture implies content at the right density.
  **Applies to** cards, screens in art. **Check** no `<text>` inside projected planes except marks. **Source** [M] Kargul branding/full-stack bars; Opero text lines.
- **ISO-16 RULE** Concentric nested corners in-plane: inner radius = outer radius - inset; plates r 0 (Kargul technical) or ~10-15% of the short side (ChatSheet, Boomtax friendly); towers r 2-3 units; UI cards on plates r 6.
  **Why** IBM: nested curves stay equally spaced with increasing radii; one radius family per set.
  **Applies to** all iso art. **Check** |R_outer - (R_inner + inset)| <= 1 unit. **Source** IBM rounded corners and nesting; [M] ChatSheet plates, Kargul towers.
- **ISO-17 RULE** Route cables along iso axes with rounded elbows (radius 6-8 units) and ring nodes at the ends; dashed when the link is logical, solid when physical.
  **Why** Orthogonal routes keep the drawing engineered; free curves only for one deliberate gesture (Opero's S-cable, Kargul's dashed S-path through the stack).
  **Applies to** connectors. **Check** every straight segment parallel to x, y or z. **Source** [M] Boomtax, Opero.
- **ISO-18 RULE** In light mode cast shadows are flat (#111 at 6%, optional grain) offset ~1 unit on the light axis per unit of height, or soft and long (Boomtax) but never both in one set.
  **Why** Flat stipple shadows keep the line-art register; blurred drop shadows switch to 3D render.
  **Applies to** light iso art. **Check** one shadow style per section. **Source** [M] Opero flat grain shadows; Boomtax soft shadows; IBM.

## 3. Numbers and scales

Kargul services bento (dark, CSS px at 1440, measured from 2880-wide @2x capture):

| Element | Width | Colour on #313131 | Pattern |
|---|---|---|---|
| Focal outline (top layer) | 1.0 | 177-191 (white 62-69%) | solid |
| Lower layer outline | 0.75-1 | 106 (28%) | solid |
| In-plane UI detail | 1 | 108-110 (29%) | solid |
| Vertical layer edges | 1 | 102 (26%) | dash 2 / gap 1 |
| Ground guides | 1 | 81-93 (16-21%, rising toward the object) | dash ~4 / gap ~2 (period 6) |
| Dotted grid | 1x1 dot | 75 (13%) | pitch 5 |
| Shade-face hatch | 1 | 25-33 on a 46 face (black ~30%) | period ~3.5 vertical |
| Lower plate hatch | 1 | 58-60 on 53 (white ~4%) | pitch ~3.3 perpendicular |
| Diamond node | 10.4 x 6 | 217 (#d9d9d9) top / ~28% lower | 6-unit in-plane square |
| Plate fill | - | #2e2e2e (cell #313131) | flat |
| Exploded gap | 36 for a 98 side (0.37) | - | - |
| Slab thickness | 14.6 for a 78 side (0.19) | - | - |
| Solid accent | logo only | #ffffff | - |

Light references:

| Source | Outline | Detail | Guides | Faces | Thickness | Plate radius |
|---|---|---|---|---|---|---|
| Opero | 1.25-1.5 #1e1e1e | 1 ~#969696 | dash ~4/3, + marks | white, flat grain shadow | ~0.1 x side | ~4 |
| Boomtax | ~1.2 #555-#aaa | 1 grey | none (vertical page stripes) | #fff/#eee/#e5e5e5, soft long shadow | stacked sheets 5px pitch | ~12% side |
| ChatSheet | ~1.5 #7d8fbf | 1 blue-grey | dashed 4/4 blue-grey | white -> #dbe6ff gradient, faint dots | ~7% side (8 on 115) | ~15% side |
| Linear (dark) | 0.5-0.75 (1 device px) 50% on #090a0b | same | none | none (line only) | packed | ~4 |

Projection constants: iso axis angle 30deg, cos 0.8660, sin 0.5, diamond 1.732:1, view elevation 35.264deg, axis foreshortening 0.8165 (ignored in isometric *drawing*, which draws true lengths). 2:1 dimetric: 26.565deg, ex = (0.894, 0.447), vertical factor 1.0954 to keep a cube a cube (30deg elevation).

## 4. Dos and Don'ts

- **Do** compute points and emit paths (kit `makeProjector().p`). **Don't** wrap a flat drawing in `transform="matrix(0.866 0.5 -0.866 0.5 0 0)"` and stroke it: the stroke shears and dashes stretch.
- **Do** build a rounded plate as an in-plane rounded rect with projected Bezier handles. **Don't** round the *screen* corners of a diamond (the corners come out symmetric and wrong).
- **Do** find side faces from the projected silhouette (leftmost -> front -> rightmost). **Don't** draw a rounded slab's sides as two parallelograms; the round corners leave gaps.
- **Do** rank dark lines by alpha at one weight. **Don't** go 0.5px for detail and 2px for outlines in dark mode; Kargul does not.
- **Do** one hatched face, one grain face. **Don't** gradient every face (reads as a 2014 icon set).
- **Do** make nodes in-plane squares. **Don't** drop screen-space circles at corners.
- **Do** run guides to the edge and fade them. **Don't** stop guides at the object or draw them at full strength.
- **Don't** letter real copy on plates; **do** use grain bars and hairlines.

## 5. Exceptions and judgement calls

- Linear's 2:1 dimetric is a legitimate alternative (cleaner 1px), but the founder's reference is Kargul: default iso, and never mix in one site.
- Colour: the Kargul services set is monochrome; his client sets (ChatSheet blue, Boomtax blue+green, Lemon green, Uplinq cyan) keep the same construction and add one hue family. The construction rules hold; the alpha ladder becomes a single-hue ramp.
- Organic gestures (Kargul's landing-page curl, Opero's S-cable, the dashed S through the website stack) break ISO-17 on purpose, once per cell, as the motion line.
- Flat line art (Gopher 2x2, Defendlab cards) is a sibling style: same stroke/one-accent rules, no projection. Do not mix flat and iso cells in one bento.
- [engine note] Kargul animates these in Rive; for web builds, animate layer z (explode/collapse 8-16 units, 600-900ms smooth), guide dash offset (slow, <= 1 loop), and the accent only. At most two looping effects per screen (effects-materials).

## 6. Figures worth keeping

- `knowledge/benchmarks/bento/kargul-services-bento.png`: the five-tile reference (branding exploded plate, product UI layers, full-stack slab, landing curl + towers, website card stack).
- `kargul-deep/gallery/opero-labs-02.jpg`: best light-mode line weights, + mark floor grid, flat grain shadows, ring cable nodes.
- `kargul-deep/gallery/chatsheet-02.jpg`: rounded light plates with in-face gradient, dashed paths, one black pivot plate.
- `kargul-deep/gallery/boomtax-01.jpg`: conveyor system with packed stacks and orthogonal rounded cables.
- `kargul-deep/gallery/uplinq-12.jpg`, `uplinq-14.jpg`: dark slabs with a single cyan payload; towers rising on a dotted path.
- `bento/linear-fig-triptych.png`: 2:1 dimetric hairline stacks.
- `system/iso/demo.png`: the kit's specimen (all primitives dark and light, two composed cells).

## 7. Open questions

1. Dash lengths under `vector-effect: non-scaling-stroke` with a transform: MDN does not say whether dashes are computed in screen or user space; behaviour may differ by engine. The kit avoids the case by never transforming strokes. Verify before relying on it.
2. The Kargul tiles are Rive canvases rendered at 2x; the exact source stroke values (in Rive units) are unknown; numbers above are rendered results.
3. Hatch angle on the shade face reads as parallel to the long edge in the full-stack slab but steeper in the landing curl; may be two different settings. The kit defaults to the iso axis angle.
4. No primary source found for how Linear, Vercel, Stripe, Supabase, Raycast, Clerk or Resend build their iso art (searched 2026-10-21); only Linear was measured, locally.
5. IBM's page names specific corner-radius specifications in an image not readable as text; numbers not captured.

## 8. Detail checklist (pro vs amateur)

1. Every edge on 30deg (or 26.565deg), none hand-angled.
2. Diamonds 1.732:1, measured.
3. Iso circles are projected (1.732:1), tangent to their plate edges.
4. One stroke weight in dark; two at most in light.
5. Alpha ladder, not random greys; focal is the brightest line in the cell.
6. Round joins and caps everywhere; no mitre spikes at 30deg corners.
7. Side band of rounded slabs follows the corner curve; silhouette verticals at the extreme points.
8. Bottom edge drawn at one step lower alpha than the top outline.
9. Exactly one hatched face per prism, hatch spacing 3px, clipped cleanly.
10. Grain on the lit face and on text bars, never on lines.
11. Corner nodes on technical plates; nodes dim on lower layers.
12. Dashed verticals between exploded layers, aligned to the corners.
13. Guides along iso axes from the corners, fading outward, through the cell edge.
14. Grid dots square, 1px, 5px pitch, faded radially.
15. Text = grain bar + hairlines; tool marks only as words.
16. In-plane UI (bars, avatars, chips) drawn in the plane, not pasted flat.
17. Nested radii concentric.
18. Draw order correct (back before front), no line visible through a filled face.
19. Cables on axes with rounded elbows, ring nodes at the ends.
20. One solid accent per cell.
21. Same light side in every cell; one shadow style.
22. Callout pills upright, mono caps, 18px, dotted leader with one elbow.
23. Scene cropped by the cell edge or faded into it; never a hard rectangle.
24. Same object scale across cells (node size and stroke identical).
25. 1:1 SVG; no transforms on strokes; checked at 400% zoom.

## 9. Construction method (SVG)

1. **World space**: x runs screen right-down, y left-down, z up; units are px at true length (isometric drawing convention).
2. **Projector**: `screen = origin + x*ex + y*ey + z*ez`, iso `ex = (0.8660, 0.5)`, `ey = (-0.8660, 0.5)`, `ez = (0, -1)`; dimetric `ex = (0.894, 0.447)`, `ez = (0, -1.0954)`. Equivalent SVG matrix for the top plane: `matrix(0.866 0.5 -0.866 0.5 ox oy)` (use only for unstroked fills such as dot patterns).
3. **Planes**: an object face is `o + a*u + b*v` (top: u=x, v=y; left face: u=x, v=-z; right face: u=-y, v=-z). Anything drawn on a face (UI rows, nodes, circles, hatch) is built in (a, b) and projected.
4. **Curves**: cubic Beziers with k = 0.5523 in-plane, project the control points (exact under affine projection).
5. **Side faces of rounded slabs**: sample the top outline, find leftmost, rightmost and front (max y) points, take the ring walk between them that passes the front, extrude it by -h*ez, split at the front point into shade and lit faces.
6. **Fills**: hatch = screen-space parallel lines at the iso angle, clipped to the face path; grain = feTurbulence alpha noise clipped to the face; dots = userSpaceOnUse pattern with 1px rects.
7. **Strokes**: one theme ladder; `stroke-linejoin/linecap: round`, `vector-effect: non-scaling-stroke`, SVG at 1:1, `shape-rendering: geometricPrecision`; snap to 0.5px only for DPR-1 targets.
8. **Order**: grid, guides, connectors, back objects, front objects, callouts. Fade with a mask on the scene group.

Kit API: see `system/iso/iso.tsx` header and `Demo.tsx` (IsoScene, makeProjector/project, planes + planeRoundRect/planeCircle/routePath/polyPath, Plate, Box, Tower, Stack, Card, Wall, Node, Plus, Callout, Connector, GuideLines, IsoGrid, Hatch, Texture, isoTheme, useIso, useStroke).
