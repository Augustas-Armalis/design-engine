---
source: ui-pedia
chapter: Proportion (golden ratio)
pages: 103-113
topic_tags: [proportion, golden-ratio, typography, layout, grid, image-cropping]
status: studied
---

# Proportion

The whole chapter is about one proportional system, the golden ratio (phi, about 1.618), and four places the book applies it in UI: text sizes, line height, image cropping and page layout. The book is openly lukewarm about it ("just as legitimate as any other approach", p.113), so treat everything below as a reference system, not a law.

## 1. Core ideas

1. **Definition.** Two quantities a and b (a>b) are in the golden ratio phi if a/b = (a+b)/a. Property: 1/(phi-1) = phi. phi = 1.618 (p.104, p.106). Known since around 500 BC (Phidias, Plato, Euclid); aliases: golden mean, golden section, divine proportion (Da Vinci) (p.103).
2. **Golden rectangle.** Sides in ratio 1 : 1.618 (b=1, a=1.618). Cut off a square whose side equals the short side, and the remainder is again a golden rectangle (p.106). This is the generator of everything else in the chapter.
3. **Golden spiral.** Repeat the cut forever (rectangle ABCD into square ABEF plus rectangle EFDC, then recurse into EFDC) and join opposite corners of the squares to get the spiral (p.107). The spiral converges on a focal point in one corner of the original rectangle.
4. **Claimed perceptual basis (weak evidence, opinion).** The book cites a Rizzolatti / Di Dio study (statue vs distorted copies) and claims "beauty is partly genetic"; it also says the ratio is "commonly claimed" to produce organic, balanced, preferred compositions, and lists the pyramids of Giza, the Parthenon and the Mona Lisa as examples (p.104-105). No UI-specific evidence is offered.
5. **Type.** Heading size and body line height can each be body size x 1.618 (16px body gives about 26px) (p.108-109).
6. **Line height is not free.** Golden line height has to give way as line length grows: longer lines need more interlinear space (2004 University of Reading study) (p.110).
7. **Image crop.** Put the image's main point at the spiral's tight end when cropping (p.110).
8. **Layout.** Golden rectangle = square + smaller golden rectangle = main content + sidebar. Subdivide the sidebar again to get header / logo / local-nav cells (p.111-112).
9. **Honest limit.** On responsive sites the ratio cannot hold at every viewport; build a basic ratio-based grid, align components to it, and accept the benefit "on some screen sizes" (p.111).

## 2. Rules

- **RULE** Header font size = body font size x 1.618. 16px body -> 16 x 1.618 = 25.88, round to 26px.
  **Why** Sizes related by one constant ratio read as a proportionate system rather than arbitrary picks.
  **Applies to** all. **Check** computed font-size of h1/h2 divided by body font-size is about 1.618 (tolerance suggest +-0.05). **Source** (p.108, p.109)

- **RULE** Body line height = font size x 1.618 (16px body -> 26px line height, i.e. about 1.625).
  **Why** The book's figure shows the 26px version (heading 26px / body 16px / line-height 26px) reads easier than the compared 18px heading / 16px body / 19px line-height version ("the increase in line height makes reading easier").
  **Applies to** all (short to medium text blocks; see next rule for long lines). **Check** line-height / font-size on `p` is about 1.6. **Source** (p.108, p.109)

- **RULE** Increase line height as line length increases; do not hold line height fixed when the measure gets longer. Use a golden-ratio typography calculator (font size + line width in, optimum line height out) if you want to derive it.
  **Why** Long lines make the eye struggle to find the start of the next line; extra interlinear space lets it "readily detect the next line below" (2004 University of Reading).
  **Applies to** all. **Check** line-height grows with the `ch` width of the text column. **Source** (p.109-110)

- **RULE** When cropping a photo, place its main subject at the golden spiral's focal end. In the book's example the crop is a landscape rectangle whose spiral tightens into the lower right; the red tree sits in the upper-right square and the small figure sits in the spiral's innermost square, with open sky filling the large left square.
  **Why** Gives the image a compelling composition with the focal point off-centre.
  **Applies to** landing page hero images, cards. **Check** visual (subject centre falls near the spiral eye, roughly 61.8% across and about 61.8% of the way down/up depending on spiral orientation; derived). **Source** (p.110)

- **RULE** For a two-column page, split the viewport rectangle (golden, e.g. roughly 1024 x 633) into a square (main content) and a smaller golden rectangle (sidebar).
  **Why** The square/golden-rectangle division gives main-content-plus-sidebar "structure and balance"; book calls the result "perfect for a main content area and sidebar".
  **Applies to** landing page, SaaS app UI (sidebar plus content). **Check** sidebar width : main width is about 1 : 1.618 (see Numbers). **Source** (p.111, p.112)

- **RULE** Build a layout from the ratio in four steps: (1) draw a 1 : 1.618 rectangle as the browser window (roughly 1024px x 633px); (2) duplicate it, rotate it vertically, keep proportions locked, resize it to fit inside the larger rectangle; (3) repeat inside the new rectangle until the grid structure you want exists; (4) align elements (logo, global navigation, local navigation, main content) to that grid.
  **Why** Gives a repeatable, proportionally related set of regions.
  **Applies to** landing page, SaaS app UI. **Check** visual / measure that element edges coincide with the derived grid lines. **Source** (p.112)

- **RULE** Only "loosely follow" the golden layout. Do not try to enforce it at every viewport; set up a basic ratio grid, align components to it, and take the benefit at the screen sizes where it holds.
  **Why** Responsive layouts cannot keep fixed ratios across viewports.
  **Applies to** all. **Check** visual at desktop width; do not fail breakpoints below it. **Source** (p.111)

- **RULE (opinion)** Treat the golden ratio as a reference for beginners or for designers who want a mathematical approach, not as superior to other sizing/proportion methods.
  **Why** Book: some designers are fascinated, others consider it "just as legitimate as any other approach".
  **Applies to** all. **Check** n/a. **Source** (p.113)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| phi | 1.618 (1.6180...) | p.106 |
| Definition | phi = a/b = (a+b)/a, a>b | p.104 |
| Property | 1/(phi - 1) = phi | p.104 |
| Golden rectangle | b = 1, a = 1.618 | p.106 |
| Body font (example) | 16px | p.108 |
| Heading from body | 16 x 1.618 = 25.88 -> ~26px | p.108-109 |
| Line height from body | 16 x 1.618 = 25.88 -> ~26px (about 1.625 x font size) | p.108-109 |
| Comparison (non-golden) | heading 18px, body 16px, line-height 19px (about 1.19) | p.109 figure |
| Browser-window golden rectangle | roughly 1024px x 633px (1024 / 1.618 = 632.9) | p.112 |
| Derived 2-col split of 1024 x 633 window | main = square 633px; sidebar = portrait golden rect, 633 tall x about 391 wide (633 / 1.618). Derived from p.112 steps, not stated in text | p.112 |
| Reading study | University of Reading, 2004: long lines need more leading | p.110 |

The book's multiplication gives 25.88, but 16 x 1.618 = 25.888 (would round to 25.89). Immaterial, the book rounds to 26px.

## 4. Dos and Don'ts

- **Do (p.109 figure, top card):** heading 26px bold, body 16px with 26px line height, in a card with generous airy leading. **Don't (bottom card):** heading only 18px, body 16px with 19px line height; heading barely distinguished from body and lines packed. Same paragraph text in both.
- **Do (p.110, p.112 figure):** two-column layout with the square as main area and a narrower golden-rectangle sidebar that itself subdivides into squares (small cells at its top, usable for logo and nav). Final wireframe (p.112 step 4): Logo in the top-left small cell, Global Navigation across the top over the main area, Local Navigation in the lower sidebar, Main Content Area filling the square.
- **Do (p.103 opening figure):** a landing hero where the spiral overlay shows the headline and CTAs in the large left square, and the illustration (basketball player) in the right-hand column where the spiral tightens, with the dunking arm/hoop at the spiral eye. Shows the system applied to a real hero, not just theory.
- **Do (p.110):** crop an image so the focal subject lies in the small end of the spiral. No explicit bad crop is shown.

## 5. Exceptions & judgement calls

- The book itself hedges (p.111, p.113). It admits the ratio cannot be fully supported across responsive viewports and that other proportional systems are equally valid.
- Golden line height (about 1.625) conflicts with the later caveat that line height must scale with measure (p.110): the golden number is a default for a typical measure, not a constant.
- The biology/neuroscience claim ("beauty is partly genetic") is asserted on one study and the book gives no UI evidence (opinion, p.104).
- [engine note] 26px/16px = 1.625 sits inside the usual 1.5-1.65 body-leading band, so the golden rule and conventional leading advice agree at 16px; for headings, 1.618 x body is a very large step at big sizes (a 24px body would give 39px headings; a 20px body gives 32px), so check that headings do not overpower in dense app UI. [engine note] The golden spiral crop is a composition aid; for the engine's hero sections the ratio is best used for choosing column splits (about 62/38) rather than for type.

## 6. Figures worth keeping

- p.103: landing hero with golden spiral overlay (headline/CTAs in big square, illustration at spiral eye).
- p.107: golden rectangle ABCD subdivided into squares with the spiral drawn (construction).
- p.109: heading/body/line-height comparison, golden (26/16/26) vs non-golden (18/16/19).
- p.110: photo cropped to the spiral (red tree + figure at spiral end).
- p.111: sidebar = narrow golden rectangle subdivided; main content = square.
- p.112: four-step layout construction ending in a labelled wireframe (Logo / Global Navigation / Local Navigation / Main Content Area).

Copied to /Users/augustas/dev/design-engine/examples/ui-pedia/proportion/.

## 7. Open questions

- p.103-113 are all covered; no page was uninterpretable. Pages with no rule content beyond history/definition: p.103 (history, hero image), p.104 (formula, study), p.105 (examples in art; Mona Lisa head/torso a1/b1, a2/b2 diagram), p.106 (rectangle construction). p.113 is a closing hedge.
- The p.109 figure text repeats "16 = 16 x 1.618" with the phi glyph dropped; the p.108 text shows it is 16phi = 16 x 1.618. Also the figure labels "line-hieght" (typo in the book's image).
- The book does not say whether the spiral should open to the left or right for the crop, or how to handle portrait crops. Not specified.
- The book does not say what to do with sidebar vs main ordering at narrow widths (stacking order) beyond "hard to support across viewports".
