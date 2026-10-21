---
source: measured (Playwright canvas crops and pixel profiles, 2026-10-21) on knowledge/benchmarks/bento/kargul-services-bento.png (2880x1920 @2x), kargul-deep/gallery boomtax-01/02, chatsheet-02/04, opero-labs-01/02, uplinq-12/14, lemon-01, gopher-06, defendlab-05, bento/linear-fig-triptych.png; web:https://www.ibm.com/design/language/illustration/isometric-style/design ; web:https://en.wikipedia.org/wiki/Isometric_projection ; web:https://en.wikipedia.org/wiki/Isometric_video_game_graphics ; web:https://pixelparmesan.com/fundamentals-of-isometric-pixel-art/ ; web:https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect ; founder verdict 2026-10-21 (founder-taste.md, Cadence bento v3); shading study 2026-10-21 (section 10): web:https://www.ibm.com/design/language/illustration/isometric-style/design volumes + examples, web:https://workos.com, kargul-deep/gallery chatsheet-01/04, boomtax-02/03, lemon-01, uplinq-12/14, bento/clerk-bento-a.png; benchmarks in knowledge/benchmarks/iso-shading/
chapter: Isometric line art for SaaS bento and feature cells: projection, stroke ladder, fills, nodes, composition, SVG construction, shading and colour
pages: n/a (web + measured)
topic_tags: [isometric, line-art, shading, colour, face-ramp, gradient, glow, contact-shadow, oklch, illustration, bento, svg, stroke, hatch, dots, grain, projection, dark-mode, light-mode, kargul, linear]
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

## 10. Shading and colour (ISO-19..30), measured 2026-10-21

**Answer.** The studios add colour to iso line art without losing the clean read by keeping the *construction* monochrome and putting colour into **one object family**: a three-face ramp in one hue (top lightest, lit side mid, shade side darkest), a gentle gradient across each side face, a 1px edge highlight under the front top edge, a soft tinted contact shadow, and, for the one focal object, an emitted glow pool. Guides, grids, connectors and neutral objects stay grey (cool-tinted at C <= 0.006). Light mode lifts colour by tinting (accent at 6-40% chroma on near-white faces); dark mode keeps objects within +-0.04 L of the ground and lets only the payload and its glow carry hue. Kit: `system/iso/iso.tsx` modes `shaded-light` / `shaded-dark`, `<Plate tone accent glow>` (specimen rows 3-4 and the last two cells of `system/iso/demo.png`).

### 10.1 Measured faces (OKLCH L / C, hue in brackets)

| Source | Ground | Top | Lit side (right) | Shade side (left) | Gradient | Edge / outline | Shadow / glow |
|---|---|---|---|---|---|---|---|
| IBM volumes, purple cube | white | 0.75 / 0.15 | 0.66 / 0.22 | 0.59 front -> 0.48 back / 0.22 | horizontal, darker toward the back silhouette (-0.11) | none (faces meet) | flat |
| IBM translucent cubes | white | 0.93 / 0.03 | 0.83 / 0.08 | ~0.80 | none | none | flat grey cast shadow on plate: 0.80 -> 0.73 (-0.07), hard edge |
| IBM dark scene | 0.345 (H243) | 0.88 sheet | 0.67 edges (-0.22) | - | - | - | hard drop -0.08 L; emitter disc rings white -> 0.75 accent, disc side 0.40 accent, beam column = ground + 3% accent |
| ChatSheet tiles (light) | 0.973 (H265, #f5f6f8) | white + 1px dot grain | band 0.96 / 0.02 at the front | band 0.86 / 0.07 at the back silhouette | horizontal fade back -> front, plus +0.02 L top -> bottom (bounce) | outline 0.76 / 0.08 same hue; bottom edge 0.60 | contact = tinted band 0.95 / 0.02 just below the base, ~20px; halo +0.02 L around the hub |
| ChatSheet hub disc | 0.973 | rim 0.87 / 0.06 | side 0.22 / 0.06 (navy ink) | same | none | - | blue-tinted contact under the side |
| Boomtax neutral disc | white | 1.00 | 0.90 (-0.10, H275 C0.006) | 0.90 | none | top edge 0.76; **1px highlight just below it 0.92 (+0.02 over the face)** | soft long grey shadow |
| Boomtax glow plates | white | 0.925 / 0.12 (green) | - | - | radial: pale at the rim, stronger toward the hub | stroke 0.775 / 0.19 | bloom = accent radial behind/under the plates |
| Lemon box (cream) | 0.96 warm | plate 0.95 -> white toward the front (+0.005) | 0.41 / 0.035 green | 0.41 (left vs right only 3/255 apart) | thin left rim +0.05 | plate side band white, brighter downward | contact plate outline 0.80, fill -0.02 |
| Uplinq slabs (dark) | 0.159 neutral | **0.142 (darker than ground)**, 0.217 / 0.02 where the hologram tints it | 0.173 | 0.173 | none | cyan outline only on the payload frame | teal glow around the payload; cyan dots are the only saturated pixels |
| Clerk objects (dark) | 0.25 (H286) | - | - | - | light cone from above: 0.46 at source -> ground over ~300 CSS px | outer rim 0.19 (-0.06), inner highlight 0.28 (+0.03) | - |
| Kargul services (dark mono) | #313131 | -3 levels | +2 levels + grain | -7 levels + hatch | none | alpha ladder | none |

### 10.2 Rules

- **ISO-19 RULE** Shade with a three-face ramp in one hue: top lightest, lit side next, shade side darkest. Solid accent object: top = L_a + 0.14 at 0.7 x chroma, lit = L_a + 0.05, shade = L_a - 0.02 (front) -> L_a - 0.13 (back). Neutral light: top 1.00, lit 0.955, shade 0.905. Neutral dark: top 0.255, lit 0.215, shade 0.175 on a 0.17-0.19 ground.
  **Why** One consistent ramp is what makes a set read as lit by one sun (IBM, pixel-art convention: lit side, then top, then shade; for UI art the top leads because the light is high). **Check** sample three faces: top > lit > shade, steps 0.04-0.10 L, hue within +-5deg. **Source** [M] IBM volumes; Boomtax; ChatSheet; web:IBM isometric style (one light source).
- **ISO-20 RULE** Colour lives in families, not in strokes: derive every colour of an object (top, sides, outline, edge highlight, contact shadow, glow, inlay) from one hex in OKLCH, keep the hue fixed and move only L and C. At most one accent family plus one semantic signal (e.g. one green check) per cell.
  **Why** Mixed hues per object read as clip art; one family keeps colour clean. **Check** all coloured pixels of an object within +-6deg hue. **Source** [M] ChatSheet (blue family incl. outline 0.76/0.08 and navy side), Boomtax (blue + one green), Uplinq (cyan only).
- **ISO-21 RULE** Side faces get a gentle gradient, never the top: light mode fades the side from the back silhouette (darker, more chroma) to the front edge (lighter), 0.03-0.11 L; dark mode darkens downward (light from above) by 0.02-0.03 L. Tops stay flat (<= 0.005 L drift).
  **Why** A side gradient gives volume without banding; a gradient top looks like a 2014 icon. **Check** top face L range <= 0.01; side face range 0.02-0.12. **Source** [M] IBM left face 0.59 -> 0.48, ChatSheet band 0.86 -> 0.96, Lemon plate top +0.005.
- **ISO-22 RULE** Grounded objects get a soft contact shadow: the projected footprint +2 units, offset 3 units toward the shadow side (+y), blurred 6-9px; light = slate at 10-14% (or the family tint at L0.90-0.95), dark = black 55-65%. Floating layers: no contact under them (or fade it by height); pick soft contact *or* the flat cast shadow (ISO-18) per set.
  **Why** The contact shadow seats the object on the drawing; a hard drop shadow belongs to the flat-cast family. **Check** shadow alpha falls to 0 within ~10px of the footprint; one shadow style per section. **Source** [M] ChatSheet tinted contact band; Boomtax soft shadows; IBM flat shadow -0.07 L (the other family).
- **ISO-23 RULE** Add one 1px edge highlight just under the front top edge of every extruded object: white 85-90% in light, white 18-22% (or the family at L0.85, 50%) in dark. Never a glow on the edge.
  **Why** It separates top from side at small sizes the way light catches a bevel; it is the cheapest premium cue. **Check** a 1px line 1px below the front chain, +0.02-0.03 L over the side face. **Source** [M] Boomtax 0.92 over 0.90; Clerk inner highlight +0.03.
- **ISO-24 RULE** Glow only from the focal object, only on the ground (or its own top) as a radial pool in the family colour: light 22-30% at the centre, dark 20-35% with screen blend, radius 1.0-1.7 x the footprint. In dark mode coloured pixels stay <= ~3% of the cell (dark-mode-premium).
  **Why** Light must come from an object (founder dark rule); a pool under the answer pulls the eye without colouring the scene. **Check** glow centred under one object; no glow behind type. **Source** [M] Uplinq payload, Boomtax green bloom, WorkOS chip, IBM emitter.
- **ISO-25 RULE** In exploded stacks colour exactly one layer (the payload or the brand layer) in the tint family; the others stay neutral, connectors stay grey.
  **Why** The coloured layer is the story ("this is the part we add"); colouring all layers flattens the explosion. **Check** count coloured layers = 1. **Source** [M] Uplinq (cyan payload layer), Lemon (green box under a white plate).
- **ISO-26 RULE** Inside faces, colour goes to one solid inlay (brand mark, chip, answer row) at the full accent; everything else on the face is hairline or grain at neutral alpha.
  **Why** ISO-12 still holds: one solid per cell. **Check** one element at L_a/C_a per cell. **Source** [M] ChatSheet hub inlay, Boomtax check button, Opero logo block.
- **ISO-27 RULE** Light-mode tint family: top 0.985 / 0.06C, lit 0.935 / 0.26C, shade 0.865 / 0.36C (back end 0.83 / 0.42C), outline 0.70 / 0.5C, contact 0.90 / 0.25C at 60%. Dark tint family: top 0.27 / 0.30C, lit 0.235, shade 0.19 (bottoms -0.03), outline 0.75 / 0.75C. (C = the accent's chroma.)
  **Why** These reproduce ChatSheet's blue tiles and Uplinq's teal slabs from one hex. **Check** `accentFamily(hex, mode, "tint")`. **Source** [M] ChatSheet band 0.856/0.071 on accent C0.205 (=0.35C); Uplinq tinted top 0.217/0.021.
- **ISO-28 RULE** Ink variant (light only): a near-black side in the accent hue (L0.20-0.24, 0.28C) under a tinted top, for the one hub object that must out-weigh a field of white tiles.
  **Why** The darkest mass in a light scene is the focal point without needing saturation. **Check** only one ink object per section. **Source** [M] ChatSheet hub side 0.22/0.06; Lemon dark-green box.
- **ISO-29 RULE** Dark mode objects sit within +-0.04 L of the ground: sides may be lighter than the ground and the top darker (Uplinq) or the top lighter (Clerk/engine default); edge them with the alpha ladder and the edge highlight rather than with bright fills.
  **Why** Bright fills in dark scenes turn line art into a render; low-contrast volumes keep the payload the only light. **Check** neutral face L in ground +-0.05. **Source** [M] Uplinq top 0.142 / sides 0.173 on 0.159; Clerk rim -0.06 / highlight +0.03.
- **ISO-30 RULE** Where colour may not go: guides, grids, dimension leaders, neutral satellites, text bars and the cell background. Connectors may take the accent only for the one active path (dashed, primary alpha). Never two glows, never a gradient on a stroke, never blend-mode lighting on faces (IBM).
  **Why** Coloured construction lines are what makes iso art look busy. **Check** grep the art: accent hex only on the focal family, one connector and inlays. **Source** web:IBM (avoid screen/multiply/overlay effects); [M] all references keep guides grey.

### 10.3 Palette recipe (one hex in, a full scene out)

1. Convert the accent to OKLCH (L_a, C, h). Keep h fixed for the whole family.
2. Neutrals: light faces 1.00 / 0.955 / 0.905 with C 0.003-0.006 at h (or the system's neutral hue); dark faces 0.255 / 0.215 / 0.175 on a 0.17-0.19 ground.
3. Pick the focal object's strength: `solid` (IBM ramp from L_a), `tint` (light pastel family / dark tinted slab), or `ink` (light only).
4. Outline: family stroke (tint 0.70 / 0.5C light, 0.75 / 0.75C dark; solid L_a - 0.22). Neutral objects keep the grey alpha ladder.
5. Highlight: 1px under the front top edge (ISO-23). Contact: blurred footprint (ISO-22). Glow: one pool under the focal (ISO-24).
6. Budget: one accent family + at most one semantic colour; dark coloured pixels <= 3%; light accent-tinted area <= ~15% of the cell, full-chroma pixels <= 3%.

Kit: `isoTheme("shaded-light" | "shaded-dark", accent)`, `accentFamily(hex, mode, "tint" | "solid" | "ink")` -> `FaceSet`, `<Plate|Box|Tower tone accent glow contact edgeHighlight ground>`, `<Stack layerTone accent glow>`, `<Wall tone>`, `<Glow at radius strength>`, `<ContactShadow at w d>`, `useFamily()`, `oklch()`, `hexToOklch()`.

### 10.4 Open questions

1. No primary source was found for how Kargul builds the ChatSheet / Boomtax gradients (Rive vs Figma exports); numbers are rendered results from 1800px JPEG captures (compression adds about +-2 levels).
2. Linear, Vercel, Stripe, Supabase and Raycast pages captured on 2026-10-21 had no shaded isometric art (their bento visuals are product UI or flat line art), so they are not in the shading table.
3. Light direction differs by source (IBM shades the left face darker, as the kit does; pixel-art guides make the lit side brighter than the top). The kit keeps top > lit > shade; test the other order only with a founder verdict.

## 11. Kargul cell replica: what pixel registration proved (ISO-31..38), 2026-10-21

Rebuilt the Branding cell of `knowledge/benchmarks/bento/kargul-services-bento.png` in `work/replicas/app/src/KargulIso.tsx` (route `#/kiso`) and overlaid it with `tools/compare.mjs` until plates, nodes, marks and guides registered within ~2px (`work/replicas/cmp-kargul-iso-overlay.png`). Every number below was solved back from his pixels into plane coordinates, not eyeballed.

### ISO-31: Flat sheets, not boxes
- **Rule:** his objects are zero-thickness sheets in true 30° iso. They have no side faces and no shading. Depth comes only from stacking: a lower sheet sits a fixed drop below (36 css under a 133x98 sheet, about 0.37 of the short side).
- **Why:** our versions extruded slabs and shaded faces, which reads as 3D-model clip art. His reads as a drafted diagram.
- **Check:** count the polygons per object. It should be one quad per layer and no side faces.
- **Source:** Kargul services bento, Branding cell, measured 2026-10-21.

### ISO-32: Occlusion by fill, hierarchy by stroke
- **Rule:** the top sheet is filled slightly darker than the cell (`#2a2a2a` on `#313131`), so it hides what lies beneath.
- **Stroke ladder:** the top edge is about 62% white, the lower and satellite edges about 30%, the guides about 14%. All strokes are 1px and no stroke is thicker.
- **Why:** the ladder lives in alpha, not width.
- **Check:** every stroke is 1px and there are three alpha steps.
- **Source:** same cell.

### ISO-33: Diamond nodes on corners only
- **Rule:** nodes are small iso diamonds (half-width 4.5, height ratio 0.58) and sit only on sheet corners. They are light (`#e2e2e2`) on the focal sheet and mid-grey (`#6b6b6b`) below.
- **Never:** circles, dots on edge midpoints, or coloured nodes.
- **Why:** our circles and points were the "generic points" the founder named.
- **Source:** same cell.

### ISO-34: One solid white mark per scene
- **Rule:** exactly one fully white shape per cell: the subject, laid flat on the focal sheet in plane coordinates. A second copy on a satellite sheet sits at about 36% white and 0.78 scale.
- **Everything else is grey line or texture.**
- **Source:** same cell.

### ISO-35: Marks are drawn in the plane
- **Rule:** the subject shape is built in plane units, then projected with the same matrix as the sheets. Stadium pills keep their long axis on the plane x axis.
- **His mark solved into the plane:** two short pills (length 15.4) on the middle row, one long pill (29.4) above and one below, all radius 5.5.
- **Never:** draw a screen-space icon and skew it, or drop in a Remix or lucide icon.
- **Check:** every arc point goes through `pr()`.
- **Source:** same cell.

### ISO-36: Textures live on the hidden layer
- **Rule:** the lower sheet carries the texture. That means a hatch of 1px lines at 2.2-unit pitch clipped to a plane quad, a fractal-noise grain clipped to a plane quad (clip it, or the filter region leaks as a screen rectangle), a big outlined letter at 4.5px stroke and about 32% alpha, and 1px text rows.
- **Most of it stays hidden** under the top sheet, and only the edges peek out.
- **Why:** detail you glimpse reads richer than detail you are shown.
- **Source:** same cell.

### ISO-37: Guides extend every sheet edge
- **Rule:** each edge of the focal and lower sheets is extended in both directions as a dashed `3 3` line at about 14% white, running to the cell edge.
- **Why:** this builds the perspective grid the scene sits in. Guides from a few corners are not enough.
- **Source:** same cell.

### ISO-38: Palette is greys only
- **Rule:** the full cell uses page `#232323`, cell `#313131`, sheet `#2a2a2a`/`#303030`, strokes at white alpha, and one white mark. There is no hue at all.
- **Colour, if any, is a later owned touch on one element.**
- **Why:** our violet glows and tints were the "colors" the founder called off.
- **Source:** same cell.
