---
source: ui-pedia
chapter: Layout and Grids (Design Basics)
pages: 215-250
topic_tags: [layout, grid, columns, gutters, margins, baseline-grid, responsive, breakpoints, fixed-vs-fluid, figma, 12-column, symmetric, asymmetric, broken-grid]
status: studied
---

# Layout and Grids

Printed page = PDF page - 1. This chapter is mostly definitional and tool-oriented. Hard numbers are few: a 12-column default, an 8px/4px base unit for gutters and line-heights, a 8px baseline row, a list of reference device sizes and one set of breakpoint example widths. Many "rules" are the book's advice in prose with no numbers; they are labelled `(opinion)` or `process` where that applies. The last ~10 pages (p.239-250) are a gallery of tools and templates and contain almost no rules.

## 1. Core ideas

1. **Layout = structure + predictability.** Layouts give users "a predictable pattern and a sense of familiarity"; grids are the foundation that keeps "visual balance" from page to page. (p.215)
2. **A grid is intersecting horizontal and vertical lines splitting a screen into columns and rows.** It is a backbone for positioning, aligning and arranging, "whether real or imagined" (it can be implicit, not drawn). (p.217; examples p.217 Pixsel site with pink column overlay, p.218 CNN page with pink column overlay)
3. **Three parts to every grid: columns, gutters, margins.** Columns = where content is placed; gutters = spaces between columns, should be a multiple of the base unit; margin = negative space between the outside column edge and the frame. (p.219-220)
4. **Two families: symmetric (centre axis, equal columns/rows, comfortable) and asymmetric / "fractured" / "broken" (no centre, more creative yet still organised).** (p.220-221, p.234)
5. **Four named grid types: manuscript (one column), column (typically 12), modular (columns x rows = cells), baseline (dense 8px horizontal rows).** (p.222-224)
6. **Responsive grid = adapts to many screen sizes.** Two container behaviours: fixed (container constant, outer margin grows/shrinks) and fluid (container in percentages, margin and gutter constant, column width changes). Breakpoints switch the layout between ranges. (p.225-229)
7. **Grids are a team contract.** Define spatial method and grid early, with everyone agreeing: consistency, explicit dev requirements, faster delivery. (p.233)
8. **Constraints help creativity** ("No order without rules"), but the grid is a tool, not a cage: you may leave it deliberately to emphasise something. (p.236, p.237)
9. **Test and iterate the grid**, like any other part of the product. (p.241)

## 2. Rules

### 2.1 Grid anatomy and construction

- **RULE** Build every layout from three explicit parts: columns, gutters, outer margins. Decide the column count, column width (or stretch), gutter width and margin before placing content.
  **Why** These three values fully define the grid; content placement then becomes mechanical alignment instead of per-element guessing.
  **Applies to** all. **Check** the page's CSS exposes a single container with defined column count, `gap`/gutter, and horizontal padding/margin tokens; no ad hoc side spacing per section. **Source** (p.219, p.235)

- **RULE** Make gutter widths a multiple of the base unit (8px, or 4px per the baseline tip).
  **Why** Keeps horizontal spacing on the same rhythm as vertical spacing; the book states it directly: gutters "should be a multiple of the base unit in width".
  **Applies to** all. **Check** computed `column-gap` / `gap` % 8 == 0 (or % 4 == 0). **Source** (p.219-220, p.225)

- **RULE** Before opening the grid tool, answer three questions: how many columns and rows; what column width and row height; whether block size or gutter width must be fixed. Customise grid settings to the layout's needs.
  **Why** Grids control proportions and relationships between page elements, so they must fit the design rather than the other way round.
  **Applies to** all. **Check** process: grid spec written down (columns, gutter, margin, row height) before visual work. **Source** (p.235)

- **RULE** If no bespoke grid is needed, default to a 12-column grid.
  **Why** 12 divides into halves, thirds, fourths and sixths, so most layouts can be built from it (this reason is given for the column grid on p.222-223).
  **Applies to** landing page | SaaS app UI | all web. **Check** container uses 12 tracks (`repeat(12, 1fr)`) unless a spec says otherwise; spans are in {1,2,3,4,6,12} where possible. **Source** (p.222-223, p.235)

- **RULE** Place elements inside grid fields (columns), not inside gutters.
  **Why** Guarantees consistent alignment of all elements on the page; gutters are the separation, not content area.
  **Applies to** all. **Check** element left/right edges coincide with column edges of the grid (bounding boxes vs column boundaries). **Source** (p.236)

- **RULE** Pay attention to the three spacing layers together: spacing between items, margin outside the grid, gutters between grid blocks. Any of them can "significantly impact" how the grid works.
  **Why** A correct column structure still looks wrong if outer margin, gutter and inter-item spacing are not tuned together.
  **Applies to** all. **Check** visual; also verify gutter, outer margin and item gaps all come from the spacing scale. **Source** (p.237)

- **RULE** Define grid and spatial rules early in the project and treat them as agreed across designer and developer; use the same grid on every important page (a layout template for key pages).
  **Why** Uniform sizes/spacing/blocks, fewer misunderstandings between design and dev, faster delivery, quicker hierarchy gains.
  **Applies to** all. **Check** process: one shared container/grid component reused across pages; page-level layout differs only in spans, not in container definition. **Source** (p.233-235)

### 2.2 Symmetric, asymmetric and broken grids

- **RULE** Use a symmetric grid (equal columns/rows around a centre axis) to build comfortable, aesthetically acceptable layouts. Use an asymmetric (fractured, "broken") grid when you want a more distinctive, eye-catching presentation and brand statement, while keeping it organised.
  **Why** Symmetry reads as comfortable and ordered; asymmetry reads as creative and unique ("more fascinating and eye-catching", "wow users and advertise product brands"). Both are valid; choose for effect.
  **Applies to** landing page | portfolio | editorial. **Check** visual: does the layout have a centre axis (symmetric) or deliberately offset blocks (asymmetric)? Is that a deliberate choice? **Source** (p.219-221, p.234)

- **RULE** (opinion) Do not treat a broken grid as chaos: the book's asymmetric examples (p.220 figure, p.247 Altason) keep blocks of different sizes on a shared set of edges, not random placement.
  **Why** Asymmetric grids are "creative yet well-organized"; the organisation is the point.
  **Applies to** landing page | portfolio. **Check** visual: blocks still share edges/alignments. **Source** (p.220-221, p.246-247)

### 2.3 Grid types and when each applies

- **RULE** Manuscript grid (a single column spanning the whole content area): use for long text blocks and when specifying margins on a block of text.
  **Why** One column is the simplest layout and suits continuous reading content.
  **Applies to** articles/prose pages. **Check** one content column with defined side margins. **Source** (p.221-222)

- **RULE** Column grid: use as the default for web applications; it splits the frame into evenly spaced vertical fields that objects align to. For responsive work, use 12 columns.
  **Why** "The most prevalent layout for web applications".
  **Applies to** SaaS app UI | landing page. **Check** 12 equal tracks with constant gutter. **Source** (p.222-223)

- **RULE** Modular grid: use when you need both column and row rules; vertical columns and horizontal rows meet to form cells (modules) that can be used singly or merged into larger blocks.
  **Why** Adds layout rules in the second dimension (dashboards, card galleries, image galleries).
  **Applies to** dashboards | galleries | product grids. **Check** rows have defined height/step; blocks span whole modules. **Source** (p.224; figure p.223)

- **RULE** Baseline grid: use dense horizontal rows (the book's sample is 8px rows, alternating red/blue) as text alignment and vertical spacing rules, "in the same way that ruled paper does". Align texts, photos, videos, cards and other objects to it.
  **Why** Gives clear, tight typography and stronger visual hierarchy.
  **Applies to** all. **Check** vertical positions (top of blocks, paddings, margins) land on multiples of 8px (or 4px). **Source** (p.224, p.236)

- **RULE** Set every line-height to a multiple of the base unit (8px, or 4px) so text sits on the baseline grid.
  **Why** Text lines then fall on the baseline rows, and stacked text blocks keep the rhythm.
  **Applies to** all. **Check** computed `line-height` px % 4 == 0 (or % 8 == 0) for every text style; computed block heights stay on that step. **Source** (p.225, tip)

### 2.4 Responsive behaviour

- **RULE** Design the layout in percentages and proportions, not exact pixels, so it works across screen sizes. Always keep responsive design in mind while working with grids.
  **Why** A responsive grid adapts to multiple screens, unlike a fixed-grid layout that "can only be viewed on one device".
  **Applies to** all. **Check** container and column widths use `%`/`fr`/`minmax()`/`clamp()`; no fixed pixel widths for layout containers beyond a max-width. **Source** (p.225, p.238)

- **RULE** Fixed behaviour: container width and position stay constant while the viewport changes; the outer margin grows or shrinks. Use it to keep all parts proportional, but watch large screens: it can leave too much vacant space in the margins.
  **Why** Predictable proportions, at the cost of unused side space on extra-large screens.
  **Applies to** landing page | content sites. **Check** at the widest breakpoint measure side whitespace vs container width. **Source** (p.226)

- **RULE** Fluid behaviour: container width is measured in percentages, so it changes with the screen; column width grows or shrinks while margin and gutter stay constant. Use it to make use of the available screen space, but watch for stretched-out items on wide screens.
  **Why** Uses all available space; the trade-off is elements that look stretched.
  **Applies to** SaaS app UI | dashboards. **Check** resize across a range: margins and gutters constant px, column widths change; verify cards/images do not look overstretched at the top end. **Source** (p.227)

- **RULE** Establish a defined set of breakpoints and say how the design behaves at each one. Express breakpoints in px, as ranges. There is no mandatory set, but use a set.
  **Why** Lets teams describe responsive behaviour consistently and adapt layouts without hurting the experience.
  **Applies to** all. **Check** stylesheet has a small, finite set of breakpoint tokens; no one-off `@media` widths. **Source** (p.228)

- **RULE** At each breakpoint the layout may change a little (e.g. increase gutter size) or a lot (e.g. increase font size, change column count, content layout, and the UI elements used). Design this deliberately per breakpoint.
  **Why** One scaled copy of the desktop layout does not fit mobile; the figure on p.215 shows column count and arrangement changing per width.
  **Applies to** all. **Check** per breakpoint: column count, gutter, margin, font sizes recorded as tokens. **Source** (p.229; figure p.215)

- **RULE** With fluid behaviour, each layout expands until it reaches a breakpoint, then switches to the next breakpoint's layout (example: the "tiny" layout switches to the "medium" layout at 600px).
  **Why** Defines when a layout stops stretching and re-flows.
  **Applies to** all. **Check** a layout never stretches beyond its next breakpoint; there is a visible layout change at each breakpoint. **Source** (p.229)

- **RULE** When documenting or demonstrating responsive behaviour, use the smallest device size inside a breakpoint's range as the representative frame (exception: the "Small" breakpoint).
  **Why** The smallest width in a range is the worst case for that layout.
  **Applies to** design handoff. **Check** process: test frames taken at the lower bound of each range. **Source** (p.229)

### 2.5 Using Figma grids (tool-specific; process)

- **RULE** Add layout grids to any frame, not only the top-level artboard: top-level frames (desktop, tablet, mobile) and nested frames (framed content areas, components).
  **Why** Alignment rules then apply at component level as well as page level (p.230 figure: three nested frames with 2, 5 and 7 columns holding image tiles).
  **Applies to** design files. **Check** process. **Source** (p.230)

- **RULE** Use constraints to control how elements resize relative to their parent frame (e.g. pin a button to a corner and keep its exact size and padding as the frame resizes). With a stretch layout grid, constraints are relative to the nearest column, keeping fixed spacing (gutter) between items.
  **Why** Makes designs behave correctly across device sizes without redrawing.
  **Applies to** design files. **Check** process (CSS equivalent: `position`/`inset` offsets, or grid placement). **Source** (p.231; figure p.231)

- **RULE** Customise the on-canvas grid colour and opacity so it is easy to see and distinguish from content.
  **Why** The grid is only useful as an alignment aid if it stays visible against the design.
  **Applies to** design files. **Check** process. **Source** (p.232; panel values listed in section 3)

### 2.6 Process rules

- **RULE** (opinion) Do not fear grid constraints; "No order without rules" and creative restrictions "help you not just see your work from a different perspective, but also develop better solutions" and a more original look.
  **Why** Rules produce order; the restrictions force better solutions.
  **Applies to** all. **Check** visual/process. **Source** (p.236)

- **RULE** Break the grid on purpose, only when it emphasises a certain aspect or area of the page. You do not have to start and end work inside a grid field.
  **Why** An element that leaves the grid draws attention; this only works against a visible background of discipline.
  **Applies to** landing page | editorial. **Check** visual: each grid break has a stated emphasis target; most elements still align. **Source** (p.237 "Point to be noted")

- **RULE** Sketch rough grid layout ideas on pen and paper early (list everything that comes to mind), then move to a precise digital tool as the project progresses and negotiation over details begins.
  **Why** Paper is the fastest way to iterate ideas; precise tools are better for negotiating specifics.
  **Applies to** all. **Check** process. **Source** (p.238-239)

- **RULE** Keep testing and iterating the grid arrangement; testing cannot be avoided whatever the product.
  **Why** The grid is a design decision and can be wrong like any other.
  **Applies to** all. **Check** process: grid re-checked at each breakpoint after content changes. **Source** (p.241)

### Audit additions (audit 2026-10-15)

- **RULE** Make the outer margin wider than the gutter, and the gutter clearly narrower than a column. Every grid diagram in the chapter does this: anatomy figure margin : gutter : column = 2 : 1 : 3.25 (p.219); column-grid figure margin = 1 column width, column : gutter = 1.8 : 1 (p.223); fixed-behaviour figure margin 24px vs gutter about 15px, column about 36px (p.226); Pixsel landing overlay column : gutter = 2.35 : 1 (p.217).
  **Why** A margin narrower than the gutter makes the page edge read as just another gap, so the content block loses its frame; a gutter close to column width breaks content into islands.
  **Applies to** all. **Check** computed container `padding-inline` (or outer margin) > grid `column-gap`; column track width >= 1.8x `column-gap`. **Source** (p.217, p.219, p.223, p.226) (audit 2026-10-15)

- **RULE** In a modular grid use the same gutter on both axes; the book's default module is square (column width = row height, 8 columns x 4 rows, one gutter value horizontally and vertically). Even when tracks are unequal (Example Grid Set: column widths about 1 : 1 : 2.25, row heights about 1 : 2.3 : 1), keep a single gap value.
  **Why** Equal gaps on both axes make modules read as one matrix; different row and column gaps make the matrix look like separate strips.
  **Applies to** dashboards | galleries | card grids. **Check** computed `row-gap` == `column-gap` on grid containers. **Source** (p.223, p.241) (audit 2026-10-15)

- **RULE** Scale the column count with the viewport, not just the column width: the chapter's title figure steps 2 -> 4 -> 8 -> 12 columns across four widening frames (pixel-counted), and the Material mobile figure uses a 4-column grid with two cards each spanning 2 columns and the card gap equal to the gutter. At the 8-column width the cards gain side margin and centre; at 12 columns three cards sit in one row and two blocks in the row below.
  **Why** 12 columns on a phone gives tracks too narrow to hold anything; halving the count per step keeps spans meaningful at every width.
  **Applies to** all. **Check** count grid tracks per breakpoint: <= 4 at phone widths (320-428), 8 at tablet, 12 at desktop (or a documented equivalent). **Source** (p.215, p.246) (audit 2026-10-15)

- **RULE** At each breakpoint change what is shown, not only its size. The Three.se example: at 320 one product card per view with arrows and a scroll-progress bar; at 660 three product cards per view; at 770 a 6-item category shortcut row (icon + label + chevron) appears under the promo banner; at 1024 the hamburger is replaced by text nav links in the header, the hero gains prev/next arrows, and the headline is visibly larger at each step.
  **Why** Wider screens can afford secondary navigation and more items per row; hiding them on narrow screens protects the primary content.
  **Applies to** landing page | e-commerce | all. **Check** visual: per breakpoint, list which components appear, disappear or change count; there should be at least one structural change per breakpoint, not only scaling. **Source** (p.228) (audit 2026-10-15)

- **RULE** Design breakpoints mobile-first: start from the smallest layout and adjust "as it goes up from mobile to desktop". The grid systems the book recommends (Bootstrap 12-column, CSS Wizardry) are described as mobile-first, and the 12-column template series ships a Mobile First variant of each template.
  **Why** Starting narrow forces content priority; wider layouts then add, rather than squeeze.
  **Applies to** all. **Check** base CSS styles the narrowest layout; layout media queries use `min-width`, not `max-width`. **Source** (p.228, p.245, p.249) (audit 2026-10-15)

- **RULE** When a card's frame narrows, switch it from image-beside-text (image left; title, two-line body and button right) to image-above-text (image top, then title, body, button), rather than shrinking both halves; in the narrow 2-up card grid every card uses the stacked version.
  **Why** Side-by-side content in a narrow card leaves both the image and the text column too narrow to read.
  **Applies to** all (cards). **Check** at each breakpoint measure the text column width inside cards; if it falls below a readable line, the card should be stacked. **Source** (p.232 figure) (audit 2026-10-15)

- **RULE** For a feature-plus-stack section (Lift Mag), put the feature card across 2 of 3 columns and stack 2 smaller cards in the third column so that their two heights plus the gap equal the feature card's height exactly (figure: 95 + 16 + 101 = 212 units); the 3-up carousel row above uses the same 3 columns and gap, with a dot pager whose active dot is an elongated pill.
  **Why** Shared column edges and an exact height sum make the asymmetric block read as deliberate, not as leftover space.
  **Applies to** landing page | editorial | magazine/video sites. **Check** bounding boxes: feature width = 2 columns + 1 gap; stacked heights + gap = feature height (+-1px). **Source** (p.248) (audit 2026-10-15)

- **RULE** In an asymmetric (masonry) gallery, vary item heights inside columns but keep the outer top and bottom edges flush: on Altason the four columns hold 2, 3, 2 and 3 images of different heights, all start on one line and end on one line, with one gap value in both directions.
  **Why** The flush outer edges are the "well-organised" part of an asymmetric grid; ragged ends read as unfinished.
  **Applies to** galleries | portfolio | landing page. **Check** the bottom edge of the last item in every column is equal (+-1px); `row-gap` == `column-gap`. **Source** (p.247) (audit 2026-10-15)

- **RULE** Nested frames and components may carry their own column grids independent of the page grid (page 10 columns, nested frames 9, 8 and 8 columns in one figure; frames of 2, 5 and 7 columns in another), while the frames themselves are placed on the page grid (in the p.231 figure the top frame spans all 10 page columns and the lower frames start on page column edges, only approximately for the last one).
  **Why** A component needs alignment rules at its own scale; forcing page columns through a small card gives tracks too narrow to use.
  **Applies to** SaaS app UI | design files | components. **Check** component internal layout uses its own grid/flex tokens; component outer edges align to page columns. **Source** (p.230, p.231) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Default column grid | 12 columns (halves, thirds, fourths, sixths) | p.222-223, p.235 |
| Gutter | multiple of the base unit | p.219-220 |
| Base unit | 8px, or 4px | p.225 tip |
| Baseline row | 8px (sample alternates red and blue) | p.224 |
| Line-height | an increment of the base unit (8 or 4px) | p.225 |
| Figma column panel (p.232 example) | Count 9; Type Stretch; Width Auto; Margin 11; Gutter 10; colour FF0000 at 10% | p.232 image (checked) |
| Figma colour picker (p.232 example) | Solid, hex 758EFE at 30% | p.232 image (checked) |
| Mockplus grid dialog | Grid block size 20 px; thick lines every 10 blocks; Dark #FF0000, Light #FF0000 | p.239 image |
| "Fixed behaviour" figure | outer frame 490 px; inner container 444 px; side margin 24 px; flexible margin outside | p.226 image (see open questions) |
| Breakpoint demo widths (Three.se site) | 320, 660, 770, 1024 | p.228 image |
| Tiny -> medium layout switch | 600 px | p.229 text |
| Phone dimensions | 320x568, 375x667, 375x710, 375x812, 428x926 | p.229 image (zoom-checked) |
| Tablet dimensions | 1024x1366, 744x1133, 1366x1024, 1133x744 | p.229 image (zoom-checked) |
| Desktop dimensions | 1728x1117, 1512x982, 1440x1024 | p.229 image (zoom-checked) |
| Line-height samples | labels 12, 16, 18, 20 Pxls next to text of increasing size | p.225 image |
| Column counts shown on the p.215 title figure | roughly 2, 4, 8, 12 columns for four widening frames (visual estimate) | p.215 image |
| Column counts in p.230 figure | frames with Counts 2, 5, 7 | p.230 image |
| Title figure column counts, pixel-counted | 2, 4, 8, 12 columns (confirms the visual estimate above) (audit 2026-10-15) | p.215 image |
| Grid anatomy figure proportions | 5 columns; margin : gutter : column = 80 : 40 : 130 (2 : 1 : 3.25), measured at 144 dpi (audit 2026-10-15) | p.219 image |
| Column grid figure | 8 columns (not 12); column 72, gutter 40, left margin 72 (column : gutter 1.8 : 1) at 144 dpi (audit 2026-10-15) | p.223 image |
| Modular grid figure | 8 columns x 4 rows = 32 square modules (72 x 72), gutter 40 on both axes, at 144 dpi (audit 2026-10-15) | p.223 image |
| Baseline grid figure | about 21 rows: thin red line + blue band repeating at a constant pitch (8px per the text) (audit 2026-10-15) | p.224 image |
| Fixed behaviour figure, measured | figure is drawn at exactly 2x (490px = 980 px at 144 dpi); 9 columns of about 36px, 8 gutters of about 15px (9 x 36 + 8 x 15 = 444); measured side margin 23px vs label 24 (audit 2026-10-15) | p.226 image |
| Fluid behaviour figure, measured | wide frame 9 columns (column 52, gutter 22, margin 33 at 144 dpi); narrow frame 4 columns (column 60, gutter 26, margin 30); gutter/margin close but not identical in the drawing (audit 2026-10-15) | p.227 image |
| Pixsel landing overlay | 8 columns, column : gutter = 94 : 40 (2.35 : 1), columns start at the frame's content edge (audit 2026-10-15) | p.217 image |
| Constraints figure | page grid 10 columns (column 65, gutter 43 at 144 dpi); nested frames carry 9, 8 and 8 internal columns (audit 2026-10-15) | p.231 image |
| Breakpoint demo content per width | 320: 1 product per view + arrows + progress bar; 660: 3 products; 770: + 6-item category shortcut row; 1024: + text nav links (hamburger gone), hero prev/next arrows (audit 2026-10-15) | p.228 image (zoom-checked) |
| Material mobile figure | 4-column grid, 2 cards each spanning 2 columns, card gap = gutter, hamburger app bar (audit 2026-10-15) | p.246 image |
| Layoutit generator defaults | `grid-template-columns: 1fr 1fr 1fr 1fr`; `grid-template-rows: 1fr 1fr 1fr`; `gap: 1px 1px`; `grid-template-areas`; options: Apply CSS repeat function, Use grid-template-areas for positioning (on; "if disabled, numbers will be used"), Add prefixes to grid names, Include legacy grid spec for IE 10/11 (audit 2026-10-15) | p.240 image (zoom-checked) |
| Mockplus extra settings | Responsive layout toggle with Auto / Manual; Fixed width and Fixed height checkboxes; Make default settings checkbox (audit 2026-10-15) | p.239 image |
| Example Grid Set | 3 x 3 areas: column widths about 1 : 1 : 2.25, row heights about 1 : 2.3 : 1, one gap value on both axes (audit 2026-10-15) | p.241 image |
| Lift Mag | 3-column carousel row; feature card = 2 columns + 1 gap; stacked pair 95 + 16 + 101 = 212 = feature height (figure units) (audit 2026-10-15) | p.248 image |
| Altason | 4 columns (the 4th narrower, about 136 vs 173 units), 2 / 3 / 2 / 3 images per column, flush top and bottom edges (audit 2026-10-15) | p.247 image |
| Malika Favre | 5 x 3 square tiles with zero gutter (tiles butt edge to edge) (audit 2026-10-15) | p.248 image |
| 12-column template series | Responsive: rows of 12 / 6+6 / 4+4+4 / 3x4 / 5 equal / 2x6 spans; Ex 2: 8 rows of two blocks where the left block grows each row and the right shrinks (01/02 ... 17/18) (audit 2026-10-15) | p.249 image |

## 4. Dos and Don'ts

- **Baseline alignment, bad vs good (p.237 figure).** Two identical paragraph cards, title "Why read about UI design..?" followed by a ten-line paragraph. Left card (red cross badge): the baseline-grid lines run through the middle of the text as strike-throughs, i.e. text is not on the baseline rows. Right card (green tick): the lines sit under every text line like underlines, i.e. each text baseline lands on a grid row. Lesson: align text so the baseline grid rows coincide with the text baselines.
- **Fixed vs fluid (p.226 and p.227 figures).** Fixed: a 9-column layout (9 columns, 8 gutters; corrected in audit 2026-10-15) in a 490px frame with a 444px container, 24px side margins, with a "flexible margin" outside the frame, so the margin absorbs width change. Fluid: two column grids at different widths (a wide one with 9 columns and a narrow one with 4; corrected in audit 2026-10-15), the same margin and gutter widths in both, only column width differs.
- **Symmetric vs asymmetric (p.220, p.221 figures).** Symmetric: a 2x2 grid of equal-sized rectangles (a Master Card logo tile, a "06" tile, a title tile and a "009" text tile). Asymmetric: a dark-blue-grey canvas with black blocks of varied sizes (round "Pxl" badge, two tall narrow blocks, a wide text block, offset photos); no centre line, blocks offset from each other.
- **Grid in a real page (p.217, p.218 figures).** A pink column overlay on a landing page (nav, hero text left, book image centre, bullets right, dark footer banner) and on the CNN home page shows text, images and videos aligned to columns.
- **Responsive page reflow (p.215 title figure).** Four frames of the same page (purple header band, three green cards, two orange blocks): at the narrowest widths everything stacks full-width with a few columns; at tablet width the green cards narrow and are centred with side margin while orange blocks go side by side; at desktop width the three green cards sit in one row and the two orange blocks sit in a row below on about 12 columns. Column count and arrangement change per width.
- **Shared grid vocabulary figures (p.222-224).** Column grid = 8 equal vertical stripes (pixel-counted; the text says 12 is typical, the figure draws 8; corrected in audit 2026-10-15); modular grid = same 8 stripes crossed by 4 horizontal bands (corrected in audit 2026-10-15); baseline grid = very thin horizontal stripes about 8px apart.
- **Gallery of grids (p.240-249).** Example Grid Set (3x3 areas of unequal widths and heights), Website Grid Layout Set (2x2 image cards with overlaid title and caption), Restaurant CSS grid (two columns of image + title + description + rating + price cards), isometric shoe grid (3D cube tiles), CSS Wizardry (rows of Grid 1.1...8.2 with varying column spans and offsets), Bootstrap (12-column stripes with a 3-column block; the figure shows 8 stripes), Flexbox Grid (rows split into two blocks of varying proportion), Altason (4 columns of images of varying heights: asymmetric), Malika Favre (5x3 square images: symmetric), Lift Mag (3-up carousel of equal cards above a large feature card + two small cards), 12-column templates (responsive and mobile-first variants, 6 stacked rows of spans).
- **Breakpoint reflow, Three.se (p.228, zoom-checked).** Same page at 320 / 660 / 770 / 1024. What changes is content, not only size: product cards per view go 1 -> 3; a 6-item category shortcut row appears only from 770; at 1024 the hamburger + search icons give way to text nav links (and a right-aligned "Företag" link), the hero gets prev/next arrows, and the headline grows at every step. Lesson: each breakpoint adds or removes components. (audit 2026-10-15)
- **Card reflow under constraints (p.232 figure).** One card shown three ways: wide = image left, title + two-line body + "View More" button right; narrow = image on top, text and button below; in a 2-up card grid on a column overlay every card uses the stacked form. Lesson: a card switches orientation when its frame narrows instead of squeezing both halves. (audit 2026-10-15)
- **Nested grids (p.231 figure).** A pink 10-column page grid; a full-width frame with its own 9-column grid; below it three frames with their own 9, 8 and 8 column grids. Lesson: components keep their own grids while the frames sit on the page grid. (audit 2026-10-15)
- **Material mobile grid (p.246 figure).** Phone frame with app bar (hamburger), title "Pixselacademy", two rounded shadowed cards side by side; translucent blue stripes mark a 4-column grid whose middle gutter is exactly the gap between the cards. (audit 2026-10-15)
- **Symmetric, zero gutter vs asymmetric masonry (p.247, p.248).** Malika Favre: 5 x 3 equal square tiles butting edge to edge, no gutter, read as one poster wall (symmetric). Altason: 4 columns of rounded images of different heights with equal gaps, outer top and bottom edges flush (asymmetric but organised). (audit 2026-10-15)
- **CSS Wizardry rows (p.244).** Rows show spans and offsets: a row of 4 equal blocks, the next row the same blocks in reversed order (Grid 6.4, 6.3, 6.2, 6.1: "easily reversible"), then a centred pair offset from the left (7.1, 7.2) and a pair pushed right past the container edge (8.1, 8.2). (audit 2026-10-15)
- **Flexbox Grid (p.245).** A full-width row, then five rows of two blocks where the left block widens step by step and the right narrows, with one constant gap: column sizes and offsets are free but the gap is not. (audit 2026-10-15)
- **Restaurant CSS grid (p.243).** 2 x 2 horizontal cards (square image left; title, two-line description, 5-star rating with 4.3, price right) under a header row of logo block left and title + subtitle right; one gap value between all cards. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- **Symmetric vs asymmetric is a choice, not a ranking.** The book says symmetric = comfortable, asymmetric = unique and personalised. Which one to use depends on whether the product wants calm and legibility (app UI) or a brand statement (portfolio, brand site).
- **Fixed vs fluid has opposite failure modes.** Fixed leaves too much empty margin on extra-large screens; fluid can stretch items. The book gives no verdict. (p.226-227)
- **Leaving the grid is allowed.** Use it to emphasise a part of the page. (p.237)
- **Pen and paper vs digital tool** is a project-phase decision: paper early, polished digital draught later. (p.238-239)
- **"Base unit" ambiguity:** the book says 8px (sample row height and anatomy) and also "8x or 4px" in the tip. Choose one base unit per project (4px for finer type control, 8px for coarser rhythm).
- **Percentages vs pixels** (p.238) is stated generically; yet the book's own fixed-behaviour and breakpoint figures use pixel values, so pixel anchors (margins 24px, breakpoints) are expected alongside percentage widths.
- **[engine note]** Fixed-width layouts today normally mean a centred `max-width` container with fluid padding; "fluid" means percentage width up to that max. The book's two behaviours are best combined: fluid up to a max-width, fixed margin thereafter. This is not stated in the book.
- **[engine note]** The book's breakpoint widths (320/660/770/1024, "tiny -> medium at 600px") are one example site's values, not a recommended standard. Do not hard-code them as the engine's defaults without a decision elsewhere.
- **[engine note]** The tool and template gallery (Mockplus, Layoutit, CSS Wizardry, Bootstrap, Material, Flexbox Grid, etc.) is dated and tool-specific; the engine should use CSS Grid/Flexbox tokens instead.

## 6. Figures worth keeping

Copied to `examples/ui-pedia/layout-and-grids/`.

- p.215: four widths of one page with column overlays; column count and arrangement change per breakpoint (best single responsive figure).
- p.217: pink column overlay on a simple landing page (nav, hero, image, bullets, footer banner): what "grid, real or imagined" looks like.
- p.218: CNN home page with column overlay.
- p.219: grid anatomy: 5 columns with margin / column / gutter / margin labels and "Counts 5" bracket.
- p.220: symmetric grid example (2x2 equal tiles).
- p.221: asymmetric (fractured) grid example.
- p.223: column grid (8 stripes; corrected in audit 2026-10-15) and modular grid (8 stripes plus 4 rows, square modules).
- p.225: baseline tip: 12/16/18/20 Pxls text samples on baseline rows.
- p.226: fixed behaviour: 490/444 px, 24px side margin, flexible outer margin.
- p.227: fluid behaviour: two widths, same margin/gutter, different column width.
- p.228: breakpoints: same page at 320 / 660 / 770 / 1024.
- p.229: reference device sizes (phone, tablet, desktop).
- p.231: constraints relative to nearest column with a stretch layout grid.
- p.237: baseline grid bad (strike-through) vs good (underline) text alignment.
- p.245: Bootstrap 12-column stripes with block spanning columns.
- p.247: Altason asymmetric gallery example (images of varied height on 4 columns).
- p.249: 12-column template series (responsive and mobile-first row-span patterns).
- p.228 (zoomed): best evidence that breakpoints change components, not just sizes (1 -> 3 products, shortcut row from 770, text nav at 1024). (audit 2026-10-15)
- p.232 top figure: card switching from horizontal to stacked as its frame narrows. (audit 2026-10-15)
- p.248 Lift Mag: feature card over 2 of 3 columns with an exact-height stacked pair. (audit 2026-10-15)

## 7. Open questions

- **p.225 figure (12/16/18/20 Pxls):** the labels could be font sizes or line-box heights; the tip text says line-heights should be 8x or 4px increments, but 18 is not a multiple of 4 and 12 is not a multiple of 8. Flag: contradiction or sloppy figure.
- **p.226 figure:** 490 - 2x24 = 442, but the label says 444 (so the "24 Pxls" side margin and 444px container do not sum exactly); the figure shows 9 columns and 8 gutters (corrected in audit 2026-10-15) although the surrounding text is about 12-column grids. Treat as illustrative only.
- **p.245 Bootstrap figure:** text says 12-column; the pink stripes shown number only 8 (3 under the block + 5 to its right). Illustrative only.
- **p.232 Figma panel:** the panel shows colour FF0000 at 10% while the picker next to it shows 758EFE at 30%; the book gives no rule on what colour/opacity to pick, only "make easier to see and distinguish".
- **p.228:** breakpoint ranges are stated to exist but the book does not list a table of ranges (only the example widths 320/660/770/1024 and "600px tiny -> medium"). "A few to get you started" appears to refer to a table that is not in the text.
- **p.215 figure column counts** (2/4/8/12) are my visual estimate; the book does not label them.
- **OCR corrections made:** p.221 "Mnuscript" = Manuscript; p.222 "Modul1r" = Modular; p.246 "Altason" confirmed; p.243 "Isomtric" = Isometric as printed (book spelling "Isomtric").
- **Pages with no rule content:**
  - p.215: title page and intro (covered in core idea 1).
  - p.216: intro plus history trivia (blue ink, T-rulers, hand-drawn grids; images drawn as rectangles with crossed lines): no rule content.
  - p.239: Mockplus tool description (numbers in section 3 only).
  - p.240: Mockplus and Layoutit tool descriptions: no rule content.
  - p.241-250: examples and templates gallery (tool/template listings and descriptions: Example Grid Set, Website Grid Layout Set, Restaurant CSS Grid, Isometric Ecommerce CSS Grid, CSS Wizardry, Bootstrap, Material Responsive Grid, Flexbox Grid, Altason, Malika Favre, Lift Mag, grid layout template series). p.250 contains a single sentence ("You can use the source code ... by copying it"); no rule content.
  - p.242, p.243, p.244, p.246, p.249: gallery figures only.
  - Note: the text promises "10 examples" but lists 12.
- **Coverage:** all pages 215-250 accounted for.
- (audit 2026-10-15) corrected: p.223 column-grid figure column count, was "12 equal vertical stripes" (section 4) and "12 stripes" (section 6), page shows 8 columns with margins (p.223). The text's "often made up of 12 columns" is unchanged; the drawing simply does not show 12.
- (audit 2026-10-15) corrected: p.223 modular-grid figure rows, was "about 8 rows", page shows 4 rows of square modules (p.223).
- (audit 2026-10-15) corrected: p.226 fixed-behaviour figure, was "10 columns and 9 gutters" / "10-column layout", page shows 9 columns and 8 gutters (p.226). With that count the figure is internally consistent: 9 x ~36 + 8 x ~15 = 444.
- (audit 2026-10-15) corrected: p.227 fluid figure, was "about 10 columns" and "about 5", page shows 9 and 4 columns (p.227).
- (audit 2026-10-15) method: column counts and ratios were measured from a 144 dpi render of the PDF (colour-run profiles across each figure), not estimated by eye. Ratios are reliable; absolute px values are figure units, not CSS px, except p.226, which is drawn at exactly 2x.
- (audit 2026-10-15) open: the p.227 fluid figure does not hold margin and gutter exactly constant between its two frames (gutter 22 vs 26, margin 33 vs 30 at 144 dpi) even though the text says they stay constant. Treat the text as the rule.
- (audit 2026-10-15) open: the 12-column template on p.249 includes a row of 5 equal blocks, which 12 columns cannot divide evenly; the book does not explain it.
- (audit 2026-10-15) coverage: p.216 and the p.217 callout (blue-ink history trivia, "blue ink did not show up on pre-print films") have no rule content; p.218 text ("grids essential as device and screen counts grow"; Figma adds styles, sizing limits, stacked frames) is context only; p.232-234 benefit prose is covered by existing rules in 2.1 and 2.2; p.250 is a single sentence with no rule content.
