---
source: ui-pedia
chapter: Perception (Gestalt principles, visual hierarchy, colour perception)
pages: 154-173
topic_tags: [perception, gestalt, figure-ground, similarity, proximity, common-region, continuity, closure, focal-point, visual-hierarchy, color-accessibility]
status: studied
---

# Perception (Principles)

Conceptual chapter: it teaches how the brain groups and ranks what it sees, then shows seven Gestalt laws with dot-grid diagrams and one real-site example each. There are no numeric specs; the diagrams carry the information. Page 173 is a hand-off into the next part of the book (Design Basics).

## 1. Core ideas

1. Sensation is the senses gathering information; perception is the brain organising and interpreting it. Culture, past experience and expectation all shape perception. Designers can never fully control it but can design for its psychological bases. (p.154)
2. Seeing is not believing: perception can be manipulated (optical illusions). The Kanizsa triangle (three notched discs plus an outlined triangle) shows the mind inventing a shape that is not drawn. (p.155, p.157)
3. Culture changes perception: the "carpentered world" theory holds that people living among straight lines and right angles are more prone to the Muller-Lyer illusion. In a classic 1963 study (Segal et al.) Europeans and Americans were most sensitive, Kalahari hunter-gatherers least. Conclusion: test with your target audience. (p.155-156)
4. Gestalt psychology (1930s-40s): the mind makes a unified whole out of fragmented, chaotic input. "The whole is other than the sum of the parts" (Kurt Koffka). (p.156)
5. The Gestalt principles are shortcuts describing how the brain builds structure by default; they help decide which design devices suit a context (hierarchy, background shading, gradients, how to group related items), direct attention and behaviour, and make products that are beautiful and intuitive. (p.158-160)
6. Seven principles are covered: figure-ground, similarity, proximity, common region, continuity, closure, focal point. They overlap and work together. (p.160)
7. Proximity beats colour and shape; continuity beats colour similarity; a border (common region) can create a group even when spacing, shape and colour are identical. So grouping strength order implied by the book: common-region border / proximity / continuity are stronger than colour or shape similarity. (p.163-166)
8. Visual hierarchy = how we scan to judge which elements matter more. It is driven by contrast between parts plus the Gestalt principles, reading order, colour and shape. (p.170-171)
9. Colour is perceived oddly (colour constancy, tetrachromacy), so never rely on colour alone to communicate. (p.171-172)

## 2. Rules

### Figure-ground
- **RULE** In every screen make it unmistakable which area is the figure (what to attend to) and which is the ground (what to ignore). Put the core content on a distinct, lighter/clearer surface over a differentiated backdrop.
  **Why** Visitors decide figure vs ground within moments and subconsciously, on each screen; the decision tells them where to look and what to skip.
  **Applies to** all. **Check** `visual`; mechanically: the primary content container has a measurable contrast against the page background (surface vs background colour or shadow), and decorative elements are lower in contrast than the content. **Source** (p.160-161)
- Example: Basecamp 3 homepage. A white content panel (headline "Working with other people? Struggling to keep everyone on the same page?", the illustration and the sign-up form) sits on a warm cream/beige backdrop with illustration and nav in the margin; you know to focus on the white foreground sections. (p.161)

### Similarity
- **RULE** Elements that look alike (shape, colour, size, treatment) will be read as one group with the same purpose; so make things that do the same job look the same, and things that do different jobs look different.
  **Why** People group similar items and assume the same function.
  **Applies to** all. **Check** group controls by role and compare computed styles: same role -> same colour/size/shape; different role -> at least one visible difference. **Source** (p.162)
- **RULE** Use one colour consistently for links so all link text is recognisable as the same kind of thing and distinct from body text (GitHub: blue text = links).
  **Why** Similarity signals shared purpose.
  **Applies to** all. **Check** all `a` elements share a colour distinct from body text. **Source** (p.163)
- **RULE** Differentiate page sections by colour/treatment (GitHub: grey top bar, black hero, blue bottom band each serve a different role).
  **Why** Similarity within a band and difference between bands communicates different roles.
  **Applies to** landing page. **Check** `visual`; adjacent sections have distinct background treatments. **Source** (p.163)

### Proximity
- **RULE** Place related items close together and unrelated items farther apart; the space between groups must be visibly larger than the space within groups.
  **Why** Near items look linked; proximity "overpowers differences in color, form, and other characteristics".
  **Applies to** all (cards, forms, lists, footers, pricing, labels with inputs). **Check** measure gap inside group vs gap between groups: inter-group gap must clearly exceed intra-group gap (the figure uses roughly 2x-3x or more; the book gives no ratio). **Source** (p.164-165)
- **RULE** Do not rely on colour to bind or separate groups when spacing says otherwise; spacing wins.
  **Why** In the figure, alternating navy/purple dots arranged in three pairs of columns read as three groups, not as a navy group and a purple group.
  **Applies to** all. **Check** `visual`. **Source** (p.164-165)

### Common region
- **RULE** When there is not enough space to separate groups with distance, enclose each group in a border, panel or other closed boundary.
  **Why** Elements inside the same closed region are grouped, even when spacing, shape, colour are identical.
  **Applies to** all (cards, panels, tables, dashboards). **Check** each logical group shares a container (border or filled background); no container spans unrelated items. **Source** (p.165)

### Continuity
- **RULE** Align related items along a clear line or curve (row, column, carousel, stepper) so they read as a connected series; the eye follows the line.
  **Why** Elements on a line/curve look more linked than off-line ones; continuity is a stronger indicator of relatedness than colour similarity.
  **Applies to** all (product rows, carousels, steps, timelines, nav). **Check** members of a series share a baseline/axis (equal top offsets, equal gaps); off-axis outliers are avoided unless intentional. **Source** (p.166-167)
- Example: Amazon product carousel: four book cards in one horizontal row with equal width, identical structure (cover, title, author, star rating with count, format, price with prime tick) and left/right arrow controls at the ends; the row tells you the items are comparable and linked. (p.167)

### Closure
- **RULE** You may leave gaps in shapes (logos, icons, illustrations); the viewer's mind completes recognisable forms from past experience. Use it to make simpler, lighter marks.
  **Why** The brain prefers one identifiable pattern and fills the blanks.
  **Applies to** landing page | brand marks | icons. **Check** `visual`: the shape remains recognisable at small size with gaps. **Source** (p.167-168)
- Examples: a black-shape zebra (no outlines, only stripes and fragments); IBM (blue horizontal stripes), NBC (peacock fan), Zendesk (Z from solid wedge shapes), Funding Circle (circle assembled from separated quarter shapes). (p.168)

### Focal point
- **RULE** Give each view one visually dominant element and make it the one you want read/clicked first (usually the primary CTA). What differs most from its surroundings captures attention first.
  **Why** Whatever stands out visually captures and holds attention first; focus then moves to the rest.
  **Applies to** all. **Check** the primary CTA has the highest contrast/saturation/size difference among interactive elements; at most one such element per view/section. **Source** (p.169)
- Example: figure of 3 rows by 6 columns of identical navy circles with one tilted saturated red (pink-red) square replacing one circle at row 2, column 4: the red square is seen first. Twilio hero: dark photographic background, white all-caps headline "BUILD APPS THAT COMMUNICATE WITH EVERYONE IN THE WORLD"; two buttons below, an outlined ghost "See Use Cases" and a solid red "Get a free API key": the red CTA is the focal point; nav "SIGN UP" is an outline button, "LOG IN" is plain text. (p.169)

### Visual hierarchy
- **RULE** Establish hierarchy deliberately using contrast between parts, Gestalt grouping, reading order, colour and shape. Important elements must look more significant than the rest.
  **Why** Viewers scan to judge relative importance; hierarchy is the lever that tells them what to focus on.
  **Applies to** all. **Check** squint test / `visual`; heading levels differ visibly (h1 vs h4), the primary action is the most contrasted element. **Source** (p.170-171)
- **RULE** Order content for the reading direction of the audience: in a Western setting, left-to-right and top-to-bottom, so the most important content goes top-left/top and flow runs down.
  **Why** Hierarchy is determined by the flow and order of elements.
  **Applies to** all (LTR audiences). **Check** primary heading and CTA appear early in DOM and top-left of the layout; mirror for RTL. **Source** (p.171)
- **RULE** Use colour plus shape to force a hierarchy where one item must be noticed immediately: iOS home screen notification badge is a saturated red circle with a white count (e.g. 303, 1,295) on the app icon corner; the eye goes to the badged icons first.
  **Why** A small saturated, distinctively shaped mark among calmer icons becomes the focal point.
  **Applies to** mobile | SaaS app UI (badges, unread counts). **Check** badge colour is the only saturated red on the screen; keep it small. **Source** (p.170-171)
- **RULE** Differentiate heading levels (h1 vs h4) so the hierarchy reads without the markup.
  **Why** The h1/h4 difference is a direct hierarchy cue.
  **Applies to** all. **Check** computed font-size/weight steps strictly decrease h1 > h2 > ... **Source** (p.171)

### Colour perception & culture
- **RULE** Never use colour alone to communicate meaning (status, errors, links in text, chart series); pair with another cue (icon, text, shape, underline).
  **Why** Colour perception varies (colour constancy under different light; colour blindness; tetrachromats see more), so colour-only encoding fails for some users.
  **Applies to** all. **Check** for every colour-coded state there is a second non-colour indicator; run a greyscale/colour-blind simulation. **Source** (p.171-172)
- **RULE** Test designs with the target audience, because culture and environment affect perception.
  **Why** Perception is shaped by material culture (carpentered-world example).
  **Applies to** all (especially international products). **Check** n/a (user test). **Source** (p.155-156)

### Audit additions (audit 2026-10-15)

- **RULE** Make the focal element differ from its neighbours in more than one attribute at once: in the figure the one element seen first is a different colour (saturated red vs navy), a different shape (square vs circle) and a different angle (rotated about 10-15 degrees) inside a regular 6x3 grid; in the Twilio hero the focal CTA is solid red while its sibling is a ghost outline on the dark photo.
  **Why** Each extra difference adds contrast against the surroundings, so the focal point wins at a glance (read from figures).
  **Applies to** all (primary CTA, alerts, highlighted plan). **Check** the focal element differs from siblings in at least 2 of: hue/saturation, shape/fill, size, orientation. **Source** (p.169) (audit 2026-10-15)

- **RULE** When splitting a set into groups by spacing, make the gap between groups several times the gap inside a group; the proximity figure splits a 4x4 dot set into two groups with a gutter about 3-4x the inter-dot gap, and the colour-vs-proximity figure uses a gutter many times wider still.
  **Why** A clearly larger gutter makes the grouping unambiguous; a gap only slightly larger than the internal gap reads as uneven spacing, not as two groups (ratio measured from the page render, the book gives no number).
  **Applies to** all (card grids, form sections, footers, nav clusters). **Check** inter-group gap / intra-group gap >= 3 where grouping is meant. **Source** (p.164) (audit 2026-10-15)

## 3. Numbers & scales

The chapter gives no measurements. Reference facts and figure parameters:

| Item | Value | Page |
|---|---|---|
| Gestalt principles covered | 7 (figure-ground, similarity, proximity, common region, continuity, closure, focal point) | p.160 |
| Gestalt psychology era | 1930s-1940s | p.156 |
| Muller-Lyer study | Segal et al., 1963 | p.155-156 |
| Western reading order | left-to-right, top-to-bottom | p.171 |
| Basecamp stat on page | "10,772 companies" in the last week | p.161 |
| Amazon carousel | 4 items per row, shown with arrows | p.167 |
| iOS badge counts in figure | 303 and 1,295 | p.170 |
| Proximity figure 1 | 4x4 evenly spaced navy dots = one group; 4x4 purple dots with a wider gutter between columns 2 and 3 = two groups | p.164 |
| Proximity figure 2 | 3 pairs of 4 rows (navy column adjacent to purple column), wide gap between pairs = three groups | p.164 |
| Common-region figure | 5x3 dots in one bordered box beside 3x3 dots in another, same dot size and gaps | p.165 |
| Focal-point figure | 6x3 navy circles, 1 red square | p.169 |
| Proximity figure 1, measured | dot about 45px, inter-dot gap about 15px, split gutter about 55px (about 3-4x the gap), page render at 1056px width; approximate (audit 2026-10-15) | p.164 |
| Focal-point square rotation | about 10-15 degrees, read from figure (audit 2026-10-15) | p.169 |
| Common-region figure, measured | the two bordered boxes nearly touch (gap about 6px) yet read as two groups (audit 2026-10-15) | p.165 |

## 4. Dos and Don'ts

- **DO** Group by distance first (p.164 figure): equal gaps = one set; a wider gutter splits it into two sets.
- **DON'T** Expect colour to override spacing (p.164 bottom figure): navy and purple dots sit in alternating columns yet read as three pair-groups because the pairs are close and the gaps between pairs are wide.
- **DO** Use a border when space is tight (p.165 figure): two boxes with a thin light grey-blue stroke, directly adjacent, each holding identical dots; they read as two groups with caption "Adding a border to the elements helps to create groups if you don't have space to show the same."
- **DO** Let shape and colour carry a similarity grouping (p.162 figure): a 7x7 grid where circles form a central diamond/cross and triangles fill the outer corners; the circles and the triangles read as two groups (the book's text says "circles and squares", the image shows triangles).
- **DO** Use colour columns for grouping (p.163 figure): a 4-row, 8-column grid of identical circles, columns alternate light grey and a coloured column (violet-blue, slate, lavender, navy); each column reads as a distinct group even though shapes are identical.
- **DO** Continuity (p.166 figure): a curve of purple dots descending from top-left crosses a horizontal line of dots (navy on the left, purple on the right) and continues into navy dots at the lower right; the eye follows each line through the colour change, so the curve's purple dots associate with the curve's navy dots rather than with the purple dots on the horizontal line.
- **DO** Closure (p.157 figure): three dark navy discs, each with a wedge removed, positioned at triangle vertices, produce a perceived white triangle. (p.155 version adds a faint purple outline triangle to reveal the illusory shape.)
- **DON'T** Rely on colour alone (p.172 text).
- **DO** Focal point (p.169 figure): one saturated red square, rotated, among 17 identical navy circles; it is seen first because it differs in colour, shape and angle at once. (audit 2026-10-15)
- **DO** Figure-ground (p.161 figure): Basecamp puts the headline and illustration on one white panel and the sign-up form in a separate white card on the right, both on a cream backdrop, with a hand-drawn arrow from the panel toward the form. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- The book states proximity overpowers colour/form and that continuity beats colour similarity; it does not rank proximity vs common region vs continuity against each other, and says they "overlap and work together". [engine note] When signals conflict, put a container or distance on the side the viewer should trust; do not use colour as the sole grouping device.
- Figure-ground is described with a muddled sentence ("fade into the background (the text) (the ground)"); the intended meaning is figure = foreground element, ground = background. (p.160)
- Culture: the book only gives the carpentered-world example and "left to right, top to bottom in a Western cultural setting"; it does not give rules for RTL or other cultures beyond "test with your audience".
- Closure is used in logos; the book does not discuss closure in icon sizing or UI controls. [engine note] Use gap-based marks only when the whole shape is still recognisable at the smallest display size.
- Tetrachromacy is mentioned as curiosity; the actionable point is only the accessibility rule.
- p.156-157 and p.158: the book overlaps "Gestalt principles" with "visual hierarchy"; its claim that hierarchy is influenced by contrast plus Gestalt grouping is not elaborated with numbers.

## 6. Figures worth keeping

- p.155: Kanizsa triangle with faint outline: illusory contour demonstration.
- p.157: three notched discs only: closure/illusory triangle.
- p.161: Basecamp figure-ground (white content panel on cream).
- p.162: shape similarity grid (circles vs triangles).
- p.163: colour-column similarity grid, plus GitHub (grey top bar / black hero / blue band; blue links).
- p.164: proximity: one group vs two groups, and colour overpowered by spacing.
- p.165: common region: two bordered boxes of identical dots.
- p.166: continuity: crossing curve and line of dots (the Amazon example text is here, its carousel image is at the top of p.167).
- p.167: Amazon four-book row with arrows (continuity); start of closure.
- p.168: zebra and IBM/NBC/Zendesk/Funding Circle logos (closure).
- p.169: red square among navy circles; Twilio CTA focal point.
- p.170: iOS icon grid with red notification badges (hierarchy by colour and shape).

## 7. Open questions

- p.173: no rule content: transition page ("Okay..."): states the aim of UI design is to increase user happiness; names two aspects, UI Principles (done) and UI Design Basics (forms, tables, gradients, ... next part); claims an internet product's perceived worth is directly influenced by UI quality.
- p.154: the "Seeing is not believing" intro is conceptual only; captured in section 1.
- p.158-159: persuasion/"modify our behaviour" claim is stated without examples; no rule beyond core idea 5.
- p.162: OCR/text says "circles and squares" but the figure shows circles and triangles; flagged.
- p.163 OCR garbles "which is also distinct from and distinct from the blue section"; the book text itself is garbled; meaning: three sections (grey, black, blue) are mutually distinct.
- p.166/167: the Amazon carousel image sits on the page after the Continuity text ("products below"), at the top of p.167.
- p.171 and p.172: text-only pages (h1/h4, colour constancy; tetrachromacy and the colour-accessibility point); images checked, no figures; captured above.
- No quantified contrast or spacing ratios are given anywhere in this chapter; any numeric thresholds must come from other sources.
- (audit 2026-10-15) Lighter-pass audit: every page p.154-173 text read and every page image viewed. Text-only pages (no figure): p.154, p.156, p.158, p.159, p.160, p.171, p.172, p.173. No numeric errors found; no corrections.
- (audit 2026-10-15) Cross-chapter tension: the Twilio focal-point example (p.169) pairs a ghost outline secondary with a solid red primary, which is the 'Too Much Tension' pairing that 03-balance (p.78) warns against. The two chapters optimise for different goals (focal pull vs balance); the book does not reconcile them.
