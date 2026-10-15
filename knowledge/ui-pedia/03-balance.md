---
source: ui-pedia
chapter: Balance
pages: 71-85
topic_tags: [balance, visual-weight, composition, symmetry, asymmetry, tension, hierarchy, buttons]
status: studied
---

# Balance (UI Pedia, Principles)

Page numbering: all cites are PDF pages (printed page = PDF page - 1). The book gives almost no numeric values in this chapter; it teaches by comparison figures. Every figure was opened and is described below.

## 1. Core ideas

1. **Balance is the distribution of visual weight, not physical weight.** A basketball and a bowling ball weigh very different amounts but compete for attention equally, so a picture of them is visually balanced. Design is constrained by perception. (p.71, p.72)
2. **Visual weight = how distinctive an element is relative to its surroundings.** It is a perceived measure, not a measured one. (p.73)
3. **Four levers set visual weight: size, color, contrast, density.** Change any one and the weight changes, other things equal. (p.73-75)
4. **Contrast is relative to the background, so the same colored object can gain or lose weight just by changing what is behind it.** Dark-red panel: the pink square sinks, the yellow square takes the focus. (p.74, p.75)
5. **Density: a tightly packed element weighs more than a loosely spaced one of identical outer size.** White space is a balancing tool. (p.75)
6. **Imbalance produces visual tension; viewers read it as "something looks strange" about the design.** Default to balance. (p.76, p.77)
7. **Balance and tension are not mutually exclusive.** Tension is allowed when deliberate. Primary/secondary buttons are the book's example: emphasise one without destabilising the pair. (p.77, p.78)
8. **Four types of balance: symmetrical/formal, asymmetrical/informal, radial, mosaic/crystallographic.** Balance is normally established across an unseen vertical or horizontal axis; diagonal or multiple axes also work. (p.79-84)
9. **Symmetry is stable and orderly but not automatically interesting.** Asymmetry creates movement but is harder to tune: it needs experimentation. (p.80, p.82)
10. **Types can be combined for a more dynamic design.** (p.85)
11. **Working method: step back, ask if the whole composition feels balanced; if one piece draws too much attention, redistribute weight by size, color, contrast, density.** (p.85)

## 2. Rules

- **RULE** Judge balance by perceived visual weight, not by element count, pixel area alone or real-world object weight.
  **Why** The eye weighs distinctiveness and attention-pull; similar-looking competition means balance even when the "real" weights differ (basketball vs bowling ball).
  **Applies to** all. **Check** visual (squint / blur test). **Source** (p.71, p.72)

- **RULE** When two elements should feel equal, make them compete for attention equally; to make one dominant, raise its weight on purpose through size, color, contrast or density.
  **Why** Visual weight is a metric of how distinctive an element is compared to its surroundings.
  **Applies to** all. **Check** visual; mechanical proxy: compare area, background-contrast ratio, saturation and ink coverage of the two elements. **Source** (p.73)

- **RULE** Size: the larger element carries more weight (book's figure: a large rounded square left of a roughly half-width rounded square of the same pink, bottoms on a shared baseline, left clearly dominant).
  **Why** Most obvious weight lever.
  **Applies to** all. **Check** bounding-box area ratio of the elements flanking an axis. **Source** (p.73)

- **RULE** Color: saturated/hot colors (the book's hot pink-red) carry more weight than a pale yellow-lime of the same size on a light neutral ground. Treat this as a tendency, not a law.
  **Why** Perception of a color depends on the colors around it; the red "commands our attention".
  **Applies to** all. **Check** visual; compare saturation/chroma against the surrounding background. **Source** (p.74)

- **RULE** Contrast: weight follows contrast against the element's own background. Darkening the background behind an element reduces its contrast and its weight; raising contrast on a neighbour shifts focus to that neighbour.
  **Why** Figure p.75: same pink and yellow squares on a mid pink-red panel. The pink square (low contrast vs panel) fades, the lime-yellow square (high contrast) now wins. The reverse was true on the light background (p.74).
  **Applies to** all. **Check** contrast ratio of each element vs its immediate background. **Source** (p.74, p.75)

- **RULE** Density: when two elements share size, color and contrast, the denser one (more ink, less internal gap) is heavier. Open up gaps/white space inside the heavier one to bring it back into balance.
  **Why** Figure p.75: two squares built from identical grids of small pink squares; the left grid has visible gaps, the right grid is nearly solid. Right looks heavier. "White space can help to achieve equilibrium."
  **Applies to** all. **Check** ink-coverage ratio (non-background pixels / area) per element; icon fill vs outline. **Source** (p.75)

- **RULE** Combine levers: tiny changes in size, color, contrast or density visibly change weight; use them together to tune balance.
  **Why** The levers are additive.
  **Applies to** all. **Check** visual. **Source** (p.75, p.76)

- **RULE** In a centered hero, do not load one half of the page. If centered text keeps vertical-axis symmetry, the left and right halves still need similar weight (logo + a left-hand CTA vs nothing on the right reads lopsided).
  **Why** Figure p.76: purple hero (logo top-left, four nav items top-right with the last wider, centered headline "The Conversion Platforms for Marketers", 3-line centered paragraph, ONE outlined CTA "PREVIEW THE PAGE BUILDER" sitting left-of-centre). The text is centered, but the single CTA makes the left half "visibly heavier", producing tension and a sense that "something appears strange".
  **Applies to** landing page. **Check** compare ink/weight left vs right of the page's vertical center line; visual. **Source** (p.76)

- **RULE** Fix the lopsided hero by adding a counterweight on the light side of the same visual size: a second outlined CTA to the right of the first ("HOW UNBOUNCE HELPS YOU"), so the pair sits symmetrically about the center line.
  **Why** Figure p.77: same hero, now two equal outlined buttons side by side, centered as a pair; the page is "evenly balanced on both sides". "Our brains prefer balance over stress."
  **Applies to** landing page. **Check** the pair's combined center aligns with the text's center axis; visual. **Source** (p.77)

- **RULE** Create hierarchy between a primary and a secondary button without breaking balance: make the primary stronger through color/fill, but give the secondary a comparable *density* (a solid fill, e.g. white) rather than leaving it as a thin outline next to a solid primary.
  **Why** Figure p.78 shows three attempts, each a pair "Secondary Button" (left) / "Primary Button" (right):
  (a) "Insufficient Contrast": secondary = dark navy outline, white fill, dark text; primary = outline only in the brand purple, purple text on light. Primary is harder to read, and the secondary now looks heavier. Wrong.
  (b) "Too Much Tension": secondary unchanged (dark outline); primary = solid purple/blue gradient fill with white text. Contrast fixed, but the primary is now "significantly too heavy" next to a thin outline.
  (c) "Balance & Tension": secondary = solid white filled pill/rounded rect, no outline, dark text; primary = solid purple fill, white text. The densities match and the color difference carries the hierarchy. Correct.
  **Applies to** all (buttons, CTA pairs, dialog footers). **Check** both buttons filled (or both comparably dense); primary differs by color, not by fill vs outline; visual. **Source** (p.77, p.78, p.79)

- **RULE** Use tension deliberately and sparingly: avoid visual strain from accidental loss of equilibrium; use visual tension only "with care and purpose" to get a desired effect.
  **Why** Brains prefer balance; deliberate tension can direct attention.
  **Applies to** all. **Check** visual; ask whether each point of imbalance is intentional. **Source** (p.77, p.85)

- **RULE** Symmetrical/formal balance: mirror the visual weight across the axis (vertical, horizontal or any line through the middle). Use it when you want stability, order and a clear, strong message.
  **Why** Equal weight on both sides makes the composition stable and orderly and gives the viewer a stronger sense of what is being communicated.
  **Applies to** all (heroes, pricing rows, login screens). **Check** reflect the layout across the axis; compare bounding boxes and colors. **Source** (p.79, p.80, p.81)

- **RULE** In a symmetrical layout, keep value (lightness) matched on both sides; a light-valued side opposite a dark-valued side breaks the balance even if shapes and positions mirror exactly.
  **Why** Figure p.80: top = three purple squares left and three purple squares right of a tall light-grey bar, dashed center axis through it ("perfectly balanced"); bottom = the identical layout with the left three squares in pale grey. Now the dark right side feels heavier.
  **Applies to** all. **Check** compare mean luminance of left vs right of the axis. **Source** (p.80)

- **RULE** Do not rely on pure mirror symmetry alone; mirror the weight but vary the techniques on each side to keep the design from being boring.
  **Why** "Symmetrical balance doesn't always relay an interesting design."
  **Applies to** all. **Check** visual. **Source** (p.80, p.81)

- **RULE** Asymmetrical/informal balance: use unequal elements on each side, balanced by position and stacking, like a seesaw or beam scale. Options: several small elements against one large; smaller elements placed further from the center.
  **Why** Weight times distance. It keeps balance while adding visual interest, movement and tension.
  **Applies to** all (hero with big illustration vs stacked small items, feature sections). **Check** visual; weigh each side by area x contrast x distance from the axis. **Source** (p.81, p.82)

- **RULE** In an asymmetric layout one side may feel heavier, as long as the whole is still balanced; expect to experiment because the two sides cannot be matched exactly.
  **Why** Perfect matching is impossible, feel must be tuned.
  **Applies to** all. **Check** visual iteration (step back, blur). **Source** (p.81, p.82)

- **RULE** Radial balance: arrange objects, colors or textures at equal distances around a single point (usually the center, not always), like a snowflake or seesaw about a pivot.
  **Why** Equal distribution about a point balances without any left-right axis.
  **Applies to** all (logo marks, orbit/diagram layouts, circular galleries). **Check** radial distribution; equal radii for equal weights. **Source** (p.83)

- **RULE** Mosaic/crystallographic balance: for "organized chaos" with no focal point, give all elements some uniform emphasis so it works together on close inspection.
  **Why** Uniform emphasis across many parts replaces a focal point.
  **Applies to** all (dense galleries, pattern backgrounds, icon walls). **Check** no element outweighs the rest; visual. **Source** (p.83, p.84)

- **RULE** Step back and judge the whole composition; if one piece draws too much attention, redistribute weight by changing size, color, contrast, density.
  **Why** Balance is a whole-composition property.
  **Applies to** all. **Check** blur/squint test; thumbnail view. **Source** (p.85)

- **RULE** Combine types of balance (e.g. symmetrical frame with asymmetrical content) for a more dynamic, lively design.
  **Why** Single-type compositions are static.
  **Applies to** all. **Check** visual. **Source** (p.85)

### Audit additions (audit 2026-10-15)

- **RULE** When shapes of different geometry must carry equal weight (icon sets, logo rows, shape bullets), draw the circle, triangle and diamond larger than the square so they overshoot the square's top and bottom guides (diamond overshoots most); shapes set to the same nominal height read as unequal, with the pointed and round ones looking lighter (read from the "Unbalanced / Balanced" figure).
  **Why** A square fills its bounding box; circles, triangles and diamonds leave empty corners, so equal boxes give unequal visual mass.
  **Applies to** all (icons, logo walls, feature bullets). **Check** visual; compare ink area per shape, not bounding-box height. **Source** (p.71) (audit 2026-10-15)

- **RULE** Keep paired buttons identical in width, height, corner radius and label size; change only fill, outline and text colour when tuning the primary/secondary relationship (all three button pairs in the figure share the same box).
  **Why** With geometry held constant, the weight difference comes only from the lever being tuned (color/density), so the pair stays balanced.
  **Applies to** all (CTA pairs, dialog footers). **Check** computed width/height/border-radius equal across the pair. **Source** (p.78) (audit 2026-10-15)

- **RULE** A borderless solid-white secondary button on a light page separates from the background with a soft neutral drop shadow rather than an outline; the solid primary carries a soft shadow tinted in its own fill colour (the "Balance & Tension" row).
  **Why** The shadow gives the white button edge and density without the thin dark outline that made the earlier pairs unbalanced.
  **Applies to** all. **Check** secondary has `border: none` and a low-opacity neutral `box-shadow`; primary shadow hue matches its fill. **Source** (p.78) (audit 2026-10-15)

## 3. Numbers & scales

The chapter contains no numeric thresholds (no px, ratios or percentages). Values below are only counts/structure from figures.

| Item | Value | Page |
|---|---|---|
| Visual weight factors | 4: size, color, contrast, density | p.73 |
| Types of balance | 4: symmetrical, asymmetrical, radial, mosaic | p.79 |
| Axes of balance | vertical and horizontal most common; diagonal or multiple possible | p.79 |
| Button states compared | 3: insufficient contrast, too much tension, balance and tension | p.78 |
| Size demo | large square ~ 2x the side of the small square (approx., from figure) | p.73 |
| Asymmetry demo | 1 large square vs 2x2 cluster of 4 circles across a dashed axis | p.81 |
| Symmetry demo | 3 squares / tall bar / 3 squares across a dashed axis | p.80 |
| Optical-weight demo | 2 rows x 4 shapes (square, circle, triangle, diamond); balanced row enlarges circle/triangle/diamond past the square's guides (audit 2026-10-15) | p.71 |
| Button-pair demo | 3 rows x 2 buttons, all six the same width/height/radius; only fill/outline/text colour vary (audit 2026-10-15) | p.78 |
| Asymmetry UI demo | 1 large single-hue chat bubble (left) vs 4 small multi-hue bubbles (orange, cyan, green, pink) stacked right (audit 2026-10-15) | p.82 |

## 4. Dos and Don'ts

| Do | Don't | Page |
|---|---|---|
| Hero with two equal outlined CTAs centered under centered copy; both halves equal | Centered copy with a single outlined CTA left of center and nothing on the right (left half "visibly heavier", reads strange) | p.76 vs p.77 |
| Secondary = solid white fill, primary = solid brand fill: same density, color separates them | Secondary solid-dark-outline + primary outline-only brand color (primary hard to read, secondary heavier) | p.78 |
| Secondary = solid white fill next to solid primary | Secondary thin dark outline next to a solid, saturated primary (primary far too heavy) | p.78 |
| Three purple tiles each side with matching value | Left tiles pale grey vs right dark purple: right feels heavier though shapes mirror | p.80 |
| Large block on left balanced by a cluster of 4 smaller shapes on the right (seesaw) | Two unrelated unequal masses with no compensating position | p.81, p.82 |
| Open the gaps of a dense element to reduce its weight | Same size and color but one element packed solid, the other airy (heavier looks dominant) | p.75 |
| Use background change to rebalance (dark panel sinks the pink, lifts yellow) | Assume a color keeps the same weight on every background | p.74, p.75 |
| Enlarge round/pointed shapes past the square's guides so a mixed row reads even (audit 2026-10-15) | Set square, circle, triangle and diamond to the same height (the round and pointed ones look smaller) (audit 2026-10-15) | p.71 |
| One large calm block on one side vs a cluster of small, more saturated multi-colour items on the other; a slight lean toward the large side is accepted as balanced (audit 2026-10-15) | Matching the two sides exactly in an asymmetric layout (the book says it cannot be done; tune by eye) (audit 2026-10-15) | p.82 |

## 5. Exceptions & judgement calls

- Balance is "required" for harmony (p.85), but tension is a legitimate tool when deliberate ("done correctly"). The book does not say how to decide; it says use "care and purpose" (p.77).
- The color-weight claim (red beats yellow) is explicitly not universal ("This isn't always the case", p.74). Contrast flips it (p.75).
- The book calls asymmetry harder and requires experimentation, not a formula (p.82).
- Mosaic balance relies on an art example (Jackson Pollock painting) and has no UI guidance beyond "uniform emphasis"; apply with caution in product UI.
- [engine note] In UI, the two common balance tasks are (a) page-level left/right weight in heroes, (b) hierarchy between sibling actions. The book's button experiment says: keep siblings equal in *density* (fill vs outline) and separate them by color. This conflicts with the common ghost-button secondary pattern; treat the ghost pattern as acceptable when the primary is only moderately saturated and the outline contrast is strong, and verify by eye.
- [engine note] A mechanical proxy for visual weight: area x (1 - transparency) x contrast-vs-background x saturation x ink density, weighed about the axis by distance. The book gives no formula; this is only a checking heuristic.

## 6. Figures worth keeping

Copied to `examples/ui-pedia/balance/`:
- p.71: unbalanced vs balanced shape rows (square, circle, triangle, diamond) between red dashed guides. Unbalanced row: all four shapes have the same nominal height (122-ish px in the page render), so the diamond and triangle look smaller/lighter than the square. Balanced row: circle, triangle and diamond are drawn larger than the square (overshooting the guides, diamond largest) so all four carry equal visual weight. This is the book's only picture of 'equal perceived weight needs unequal geometry' (interpretation read from the image; the page text only defines balance).
- p.73: size lever, large vs small pink rounded squares.
- p.74: color lever, hot pink vs lime-yellow squares on a pale ground.
- p.75: contrast lever (same squares on dark pink panel) and density lever (two dot grids).
- p.76: unbalanced hero (single left CTA) with the heavier-left half.
- p.77: balanced hero with two CTAs.
- p.78: the three button pairs (insufficient contrast / too much tension / balance & tension).
- p.80: symmetrical balance and the value-shift counterexample.
- p.82: asymmetrical balance in a UI mock (large purple chat bubble left, four small colored bubbles right).
- p.83: radial balance example (circular thumbnail wheel).

## 7. Open questions

- p.78: the text says "The Button's primary color is yellow in this scenario" but the figure shows the primary button in purple/blue. Treat the colour as an example only; the lesson (density matching) does not depend on it.
- p.78: the exact fills in the three button variants were read from the image (outline vs solid); no hex values given.
- p.79: "perfectly balanced design" text says "same visual rate" (typo for weight).
- p.71: figure labelled "Unbalanced / Balanced" but the page text does not explain what differs (read from the image: shapes of equal nominal size look unequal; the balanced row enlarges circle/triangle/diamond relative to the square). Interpretation, not stated by the book.
- Pages with no extractable rule content: p.72 (basketball/bowling ball illustration only; idea captured in section 1, no further rule), p.79 first half (definitions), p.84 (Jackson Pollock image only; no rule), p.85 (summary, rules captured).
- (audit 2026-10-15) Lighter-pass audit: every page p.71-85 text read and every page image viewed (p.72 and p.79 included). Pages with no further rule content: p.72 (ball illustration), p.79 (definitions; figure is on p.80), p.84 (Pollock painting only), p.85 (summary). No numeric errors found; no corrections.
