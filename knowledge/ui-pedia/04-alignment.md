---
source: ui-pedia
chapter: Alignment
pages: 86-102
topic_tags: [alignment, grid, layout, text-alignment, optical-alignment, numerals, tables, media-object, container]
status: studied
---

# Alignment (UI Pedia, Principles)

Page numbering: all cites are PDF pages (printed page = PDF page - 1). All figures were opened and are described. The book gives few numbers in this chapter (the only real numeric content is the invoice figures and the "x/y" optical-alignment idea); the rest is figure-led.

## 1. Core ideas

1. **Alignment = edges or center-lines of objects lining up on a common (unseen) line.** Text-align controls in Google Docs/Word are the everyday example. (p.86, p.87)
2. **Alignment is how rows and columns of a table connect items.** Items in the same row/column read as connected; this makes information easier to scan. (p.87)
3. **Four reasons alignment matters:** aesthetics/first impressions; organisation that eases navigation and finding things; unity (and, when played with, deliberate variation); guiding users to see connections between elements without extra helpers. (p.87, p.88)
4. **Two axes of alignment:** vertical alignment (top / center / bottom on an invisible *horizontal* line) and horizontal alignment (left / center / right on an invisible *vertical* line). One of the three options per axis is usually enough. (p.89, p.91, p.92)
5. **Pick the alignment edge by how much the heights differ:** dramatically different heights -> top or bottom; slightly different -> center. (p.90)
6. **A max-width container is the simplest way to guarantee left/right alignment.** (p.92)
7. **Center only single elements in a row; left-align running text (for LTR audiences).** (p.93)
8. **Align like with like:** in a media object, center icons on one axis and left-align all text on another. (p.93, p.94)
9. **Edge alignment:** anchoring corners of different blocks to shared horizontal and vertical lines guides the eye from piece to piece. (p.94, p.95)
10. **Optical alignment:** mathematically exact alignment can look wrong when shapes have uneven weight; adjust by eye. (p.95)
11. **Numbers are right-aligned** so units, tens, hundreds and decimals line up for scanning. (p.99, p.100, p.101)
12. **Alignment + proximity unify elements** (logo + slogan); mixed alignments make parts look like separate designs. (p.98, p.99)
13. **Use layout grids** to keep alignment and gutter widths consistent. (p.101)
14. **Misalignment can be used deliberately to attract attention** but is hard and takes practice. (p.102)

## 2. Rules

### Foundations

- **RULE** Align elements to shared edges or center-lines; every element should line up with something else on the page.
  **Why** Shared lines give the eye predictable stops, reading as organised, professional and unified.
  **Applies to** all. **Check** collect the left/right/top/bottom/center coordinates of sibling elements (getBoundingClientRect); count distinct x-positions per column and distinct y-positions per row; flag near-misses of 1-3 px. **Source** (p.86, p.87, p.102)

- **RULE** Connect related items by aligning them in the same row or column, as a table does; use this to make information scannable.
  **Why** Row/column alignment signals relatedness without borders or labels ("without the need for external helpers").
  **Applies to** SaaS app UI, tables, forms, pricing. **Check** items in a group share one x (column) or one y (row) edge. **Source** (p.87, p.88)

- **RULE** When a list repeats a pattern (marker + title + description), start every row's marker on one x and every row's text on one x.
  **Why** Figure p.98: left = "In Alignment": four rows, each a blue dot + bold title bar + two grey description lines; dots all on one dashed vertical guide, title bars all start at the same x. Right = "Out of Alignment": the dots are staggered on the guide (row 2 shifted right, row 3 slightly right, row 4 shifted left of the guide) and the text start moves with each dot, so the left edge zigzags. The book states the aligned version is "more pleasing to look at".
  **Applies to** all (lists, feeds, settings rows, notification lists). **Check** `left` of the icon/avatar element identical across rows; `left` of the text block identical across rows. **Source** (p.98)

- **RULE** Elements that belong to one brand/identity block (logo + slogan, heading + subheading) should share one alignment edge (both left-aligned) and sit close together.
  **Why** Figure p.99: left = Pixsel Academy logo (round icon + wordmark) with the two-line slogan "Teaching the foundations of design" left-aligned beneath, left edges flush with the logo; right = same pair but the slogan is right-aligned (ragged against the logo), "looks like elements of different designs". Goal: "bring unity in the branding" and show both elements are one design element. "Common alignment and proximity with design elements can unify them."
  **Applies to** all (headers, footers, cards, hero). **Check** left edge of subline == left edge of logo/wordmark block. **Source** (p.98, p.99)

### Vertical alignment (items on a shared horizontal line)

- **RULE** Align a row of items on a common top, bottom or center line; you need not align all three.
  **Why** One consistent horizontal line is enough to read the row as ordered. Figure p.89: three identical cards (image-header on top, text lines below) with three dashed horizontal guides at the top edge, image/text boundary, and bottom edge; all three cards coincide on all lines.
  **Applies to** card rows, button rows, toolbars. **Check** equal `top` (or `bottom` / vertical center) across siblings. **Source** (p.89)

- **RULE** If the items' heights differ dramatically, align by top (or bottom).
  **Why** Figure p.90: main body (tall) and sidebar (short) share the top edge, and their headings align too, which establishes the connection. Tops-align avoids a floating short block.
  **Applies to** main + sidebar layouts, columns of unequal length. **Check** `top` of both containers equal and first heading baselines equal. **Source** (p.90)

- **RULE** If heights differ only somewhat, align by center.
  **Why** Figure p.91: header nav bar with a round logo, three text links and a filled CTA, all centered on one dashed horizontal line across the bar even though the pieces have different heights.
  **Applies to** headers/navbars, icon + label rows, buttons with leading icons. **Check** vertical center of each item within the row within 1 px (`align-items: center`). **Source** (p.90, p.91)

### Horizontal alignment (items on a shared vertical line)

- **RULE** Align items on a common left, right or center vertical line; again one of the three suffices.
  **Why** Figure p.91: 2 x 3 grid of identical cards. Guides show the left edge, center and right edge of each card as vertical dashed lines: columns line up across both rows.
  **Applies to** card grids, sections stacked vertically, forms. **Check** same `left` per column across rows. **Source** (p.91, p.92)

- **RULE** Set a max-width on all content from the start; content then aligns to the same left and right edges regardless of push left/right.
  **Why** The "invisible box" guarantees consistent edges. Figure p.92: whole landing-page mock with two vertical guides marking the content column; logo, nav end, hero text, hero image, cards, banner, and footer columns all start/stop at those two guides, while the header and footer bars extend full width.
  **Applies to** landing page, SaaS app UI. **Check** every section's content box shares the same container left/right (same max-width and padding); no section uses a different gutter. **Source** (p.92)

- **RULE** Use center alignment only when there is a single element in the row (the standard case: a call-to-action block: heading, short paragraph, button, all on one center axis).
  **Why** Figure p.93: one purple panel with a dashed vertical center line passing through "Call to Action" heading, 3-line centered paragraph (bold "Lorem ipsum", "Cras nulla risus") and a white pill "Button"; all pieces share the center axis.
  **Applies to** landing page CTAs, empty states, hero. **Check** items' horizontal centers equal the container center (+-1 px). **Source** (p.93)

- **RULE** Left-align body text and multi-line text when the audience reads left to right.
  **Why** With left alignment the eye jumps from the end of one line to the start of the next predictably; after a few lines readability degrades with centered or right alignment.
  **Applies to** all. **Check** computed `text-align` on `p`, `li`, multi-line blocks is `start/left` (or `right` for RTL); flag `center` on paragraphs of more than ~3 lines. **Source** (p.93, p.96)

### Compound patterns

- **RULE** Media objects (icon + text rows): center each icon on a common vertical axis and left-align all text on a second vertical axis; align like items with like items.
  **Why** Icons of variable width otherwise cause misalignment. Figure p.94: "PROPERTY FEATURES" card: small caps label top-left; three rows each with an icon of different width (pin, key, car) centered on one dashed vertical guide, and to the right a bold title ("Beautiful Waterfront Location", "Fast check-in experience", "Free secure parking") plus 1-2 grey description lines, all text starting at one dashed guide. The result "gives a perfect look and balance".
  **Applies to** feature lists, settings lists, notifications. **Check** icon center x equal across rows; text block `left` equal across rows. **Source** (p.93, p.94)

- **RULE** Use edge alignment: anchor one or more corners of neighbouring blocks to shared horizontal and vertical lines (top edge of the text block with top edge of the image, bottom of the button with bottom of the image, inner edges with container edges).
  **Why** Anchoring items "in each corner" guides the eye from one piece to the next. Figure p.94: purple banner; left = headline bar, two description lines, a white "Button" pill; right = wireframe image placeholder. Horizontal guides: headline bar top == image top; button bottom == image bottom. Vertical guides: text/button left edge and image right edge sit on the container's content edges.
  **Applies to** hero sections, split sections, cards with media. **Check** `top` of text block == `top` of media; `bottom` of last element == `bottom` of media; left and right edges on container. **Source** (p.94, p.95)

- **RULE** Where exact geometric alignment looks wrong, optically align: nudge the shape until it looks centered/aligned, rather than trusting the numbers.
  **Why** An element's uneven visual weight distribution makes a mathematically centered shape look off. Figure p.95: two circular buttons with a play triangle. Left, "Center Alignment": the triangle's bounding box is centered, so the gaps left and right of the triangle (marked x and x) are equal; it looks shifted left. Right, "Optical Alignment": gaps marked x (left) and y (right), unequal: the triangle is deliberately moved right (by roughly a tenth of its width, measured from the figure; no number in the book), so the visual mass sits at the circle's center.
  **Applies to** icons in circles/buttons, play/arrow glyphs, asymmetric logos, text inside pills. **Check** visual; compare bounding-box centering vs centroid centering and nudge by eye. **Source** (p.95)

### Text alignment

- **RULE** Left-aligned text is the easiest to read; default to it.
  **Why** Figure p.96: three identical paragraph cards (9 lines each) labelled Left / Center / Right Alignment. Left is easiest; center "not so bad but a bit odd"; right is difficult.
  **Applies to** all (LTR). **Check** `text-align`. **Source** (p.96)

- **RULE** Center alignment is acceptable for short text of a few sentences: headings and slogans.
  **Why** Few lines remove the ragged-start problem. (The paragraph in the figure was nevertheless judged harder than left.)
  **Applies to** landing page, empty states. **Check** centered blocks <= ~3 lines (book: "after a few lines" it suffers). **Source** (p.93, p.96)

- **RULE** Do not right-align running text in LTR languages; right alignment is the default for right-to-left languages, where left alignment would look weird.
  **Why** Right-ragged starts make each new line hard to find; but RTL scripts invert the convention.
  **Applies to** all. **Check** `dir` and `text-align` consistent. **Source** (p.96, p.97)

- **RULE** Justified text is for print/multi-column text composition; the justification acts as the separator between columns. Avoid on short web columns.
  **Why** Newspaper columns use it; long unseparated lines make readers lose their place. Figure p.97: two narrow columns of lorem ipsum in a rounded outlined box with both edges flush; uneven word and letter spacing is visible (line 3 of column 2 is visibly squeezed, lines in column 1 widely letter-spaced), showing the cost.
  **Applies to** editorial/print layouts only. **Check** `text-align: justify` only with hyphenation and wide columns; visual rivers. **Source** (p.97)

### Numbers, tables, grid

- **RULE** Right-align numeric columns (prices, totals); also align decimal points.
  **Why** Units, tens, hundreds (and cents) stack in the same columns so magnitudes are comparable at a glance; with left alignment the decimals become confusing.
  **Applies to** invoices, tables, dashboards, pricing. **Check** `text-align: right` on numeric cells and `font-variant-numeric: tabular-nums`; decimal-places constant. **Source** (p.99, p.100, p.101)
  Figure p.100: two invoice cards, "Item Description | Price (USD)": Clay Pot 100.54, Sharpie 5.00, Pencil 24.24, Key Chain 24.00, Eraser 4.99, dashed rule, Sub Total: 158.77, Tax: 0.00, dashed rule, Grand Total: 158.77 (bold). Left card: prices flush right (cents stack under cents). Right card: prices flush left (decimal points zig-zag; 100.54 vs 5.00 lose their column). Descriptions and the "Item Description" header left-aligned in both; the "Price (USD)" header follows its value column (right edge shared in the proper card, left edge shared in the left-aligned card). Labels "Sub Total:", "Tax:", "Grand Total:" right-aligned next to the value column in both.

- **RULE** Use layout grids (design-tool column grids) so that every layout element snaps to a column and gutter width stays consistent across the screen.
  **Why** Grids guarantee consistent alignment and gutters. Figure p.101: bank/hotel app mockups on two phones overlaid with lavender column bands: four columns, three white gutters of equal width, margins at both sides; list items, titles, prices and cards start and end on column edges (left phone: Notification list with circular status icons, titles "Payment Sucessful!", "E-Wallet Connected", "Hotel Booking Cancelled", "2 Step verification"; right phone: hotel list with thumbnail, name, location, rating and price at right edge).
  **Applies to** mobile, SaaS app UI, landing page. **Check** element left/right edges coincide with CSS grid track edges; constant `gap`. **Source** (p.101)

### Deliberate misalignment

- **RULE** Misalign only on purpose, to draw attention, and only when you can pull it off; the book calls it difficult but feasible with practice.
  **Why** An off-grid element is conspicuous against an otherwise strict alignment.
  **Applies to** landing page, editorial layouts. **Check** visual; count deviations: at most a few intentional ones. **Source** (p.102)

### Audit additions (audit 2026-10-15)

- **RULE** In a row of sibling cards, align the internal division lines too, not only the outer top and bottom: give every card the same media-header height so the image/text boundary forms one continuous horizontal line across the row.
  **Why** Figure p.89 draws three guides, top edge, image/text boundary and bottom edge, and all three cards hit all three; a shared internal line makes the row read as one set.
  **Applies to** landing page, SaaS app UI (card rows, pricing tiers). **Check** `getBoundingClientRect().bottom` of each card's media element equal across the row (+-1 px). **Source** (p.89) (audit 2026-10-15)

- **RULE** In side-by-side containers of unequal height, use the same top inner padding in each so their first headings sit on one line, as well as aligning the container tops.
  **Why** Figure p.90 draws two dashed guides, one through both container tops and one through both heading bars; the book says "both containers and their headings are aligned to establish a connection".
  **Applies to** main + sidebar, dashboard panels. **Check** computed `padding-top` equal on both containers; first heading `top` equal. **Source** (p.90) (audit 2026-10-15)

- **RULE** Align a numeric column's header to the same edge as its values: "Price (USD)" sits right-aligned so its right edge equals the right edge of the figures below; text columns ("Item Description") stay left-aligned with their values.
  **Why** Figure p.100: in the proper invoice the Price header's right edge lines up with the value column's right edge; in the left-aligned invoice the header and values share a left edge instead. A header on the other edge from its data breaks the column.
  **Applies to** tables, invoices, dashboards. **Check** `th` `text-align` equals the `td` `text-align` of the same column; header right edge == cell right edge for numeric columns. **Source** (p.100) (audit 2026-10-15)

- **RULE** Put the currency or unit once in the column header ("Price (USD)") and show every value with the same number of decimals, keeping trailing zeros (5.00, 24.00, 0.00, never 5 or 24).
  **Why** Figure p.100 values carry no currency sign and always two decimals, which is what lets the cents stack under the cents when right-aligned.
  **Applies to** tables, invoices, pricing, dashboards. **Check** every numeric cell in a column matches one decimal pattern (e.g. `/^\d+\.\d{2}$/`); unit appears in the header, not per cell. **Source** (p.100) (audit 2026-10-15)

- **RULE** Set summary rows (Sub Total, Tax, Grand Total) as bold labels right-aligned flush against the value column, separated from the line items and from the grand total by a divider line, with the grand total value in bold.
  **Why** Figure p.100: a dashed rule under the last item, "Sub Total:" and "Tax:" labels ending just left of the value column, a second dashed rule, then "Grand Total: 158.77" with the value bold; label and value read as one pair because they meet at the column edge.
  **Applies to** invoices, checkout summaries, pricing calculators. **Check** summary labels `text-align: right` and end at a fixed gap from the value column; grand-total value `font-weight` > line values. **Source** (p.100) (audit 2026-10-15)

- **RULE** In list rows on a grid, put the trailing value (price) on the right edge of the last column at the same x in every row, with its secondary meta ("/night") and row action (bookmark icon) right-aligned beneath it.
  **Why** Figure p.101 hotel list: $27, $24, $33, $50 all end on the right column edge, "/night" and a bookmark icon stack under each price; the left thumbnail and the text block each start on fixed column edges.
  **Applies to** mobile, SaaS app UI (lists, search results). **Check** right edge of the price element identical across rows and equal to the grid's last track edge. **Source** (p.101) (audit 2026-10-15)

- **RULE** A subline that belongs to a logo must share the logo's anchor edge; aligning it to some other edge of the lockup (e.g. the wordmark's right end) still reads as two designs.
  **Why** Figure p.99 bad case: the slogan is right-aligned so its right edge meets the end of "Pixsel Academy", yet the pair is judged to look "like elements of different designs"; only sharing the logo's left edge unifies them.
  **Applies to** headers, footers, brand lockups. **Check** subline `left` == logo-block `left` (LTR). **Source** (p.98, p.99) (audit 2026-10-15)

- **RULE** In a media-object list, centre each icon vertically on its own text block (title + 1-2 description lines) and keep one fixed gap between the icon axis and the text axis on every row.
  **Why** Figure p.94: pin, key and car icons of different widths sit centred on one vertical guide, each vertically centred on its three-line block, and every bold title starts on the second guide; constant spacing is what makes it read as "like items with like items" (vertical centring measured from the figure, not stated).
  **Applies to** feature lists, settings, notifications. **Check** icon vertical centre within 2 px of its text block's vertical centre; `left(text) - centerX(icon)` constant across rows. **Source** (p.93, p.94) (audit 2026-10-15)

- **RULE** A featured card may be raised (taller, set higher, white with a stronger shadow) for emphasis, but it must stay inside the same column band and container edges as its siblings.
  **Why** Figures p.88 and p.92: in a row of three cards the middle card is lifted above the others and enlarged, yet it still sits in its column and the outer cards still meet the container guides; emphasis comes from depth, not from breaking the grid (shown in the figures, not stated in the text).
  **Applies to** landing page (feature trios, pricing "popular" tier). **Check** featured card's left/right edges within its grid track; siblings' outer edges on the container edges. **Source** (p.88, p.92) (audit 2026-10-15)

## 3. Numbers & scales

No type sizes or spacing values are given in this chapter. Everything numeric is either a count from a figure or example data.

| Item | Value | Page |
|---|---|---|
| Reasons alignment matters | 4 (aesthetics, organisation, unity, guidance) | p.87, p.88 |
| Alignment axes | 2 (vertical = top/center/bottom; horizontal = left/center/right) | p.89, p.91 |
| Horizontal options | left, center, right | p.91 |
| Vertical options | top, center, bottom | p.89 |
| Text alignments covered | left, center, right, justified | p.96, p.97 |
| Text "few lines" limit for centered text | not specified ("after a few lines readability suffers") | p.93 |
| Grid in bank-app figure | 4 columns, 3 gutters (counted from figure, not stated) | p.101 |
| Invoice sample figures | 100.54, 5.00, 24.24, 24.00, 4.99; Sub Total 158.77; Tax 0.00; Grand Total 158.77 | p.100 |
| Optical alignment | triangle nudged right (toward its point); amount not stated, ~10% of triangle width measured from figure | p.95 |
| Etymology | "align" from French "a" (to) + "ligne" (line) | p.102 |
| Optical alignment gaps (measured from figure at page scale) | centred: left gap x = right gap x ~70 px; optical: left x ~79 px, right y ~58 px, triangle ~97 px wide, so a shift of ~10-11 px = ~11% of triangle width toward its point (audit 2026-10-15) | p.95 |
| Text-alignment demo | 3 cards, 9 lines each, ~14-25 characters per line; the centre card is the highlighted (filled) one (audit 2026-10-15) | p.96 |
| CTA block (measured from figure) | heading + 3-line centred paragraph + pill button on one axis; paragraph measure ~2/3 of the panel width (~555 of ~825 px) (audit 2026-10-15) | p.93 |
| Card rows on shared guides | 3 horizontal guides per card row: top edge, media/text boundary, bottom edge (audit 2026-10-15) | p.89 |
| Unequal containers | 2 guides: container tops and first-heading tops (audit 2026-10-15) | p.90 |
| Invoice decimals | 2 decimals on every value incl. trailing zeros (5.00, 24.00, 0.00); unit only in header "Price (USD)" (audit 2026-10-15) | p.100 |
| Hotel list (grid figure) | prices $27, $24, $33, $50 on the right column edge, "/night" beneath (audit 2026-10-15) | p.101 |

## 4. Dos and Don'ts

| Do | Don't | Page |
|---|---|---|
| Dots and titles all start on one x per column in a list | Row-by-row zigzag of marker and text left edges | p.98 |
| Logo + slogan both left-aligned, tight | Logo left-aligned, slogan right-aligned (looks like two separate designs) | p.99 |
| Prices right-aligned so cents stack | Prices left-aligned so decimal points drift | p.100 |
| Media object: icons centered on one axis, all text left-aligned on a second axis | Variable-width icons left-aligned, so text start varies | p.94 |
| Max-width container; every section on the same two edges | Sections with different widths/gutters | p.92 |
| Top-align tall main column and short sidebar (headings aligned too) | Center-align a very short sidebar next to a tall column | p.90 |
| Center-align items in a navbar of mixed heights | Top-align nav items with unequal heights | p.91 |
| Left-align paragraphs (LTR) | Center or right-align multi-line paragraphs | p.93, p.96 |
| Center alignment for a CTA block / headings / slogans | Center alignment for long text | p.93, p.96 |
| Optically nudge play-triangle inside the circle | Mathematically center the bounding box of the triangle | p.95 |
| Corners anchored: text-block top == image top; button bottom == image bottom | Text and image tops and bottoms floating at unrelated heights | p.94, p.95 |
| "Price (USD)" header right-aligned over right-aligned prices (shared right edge) | Header and prices both left-aligned, so the header's edge and the decimal points drift together (audit 2026-10-15) | p.100 |
| Slogan shares the logo's left edge | Slogan right-aligned to the wordmark's right end: it is aligned to something, but to a different anchor than the logo, so the lockup splits into two designs (audit 2026-10-15) | p.99 |
| List markers centred on one guide, every title bar starting at one x (4 rows) | Markers jittered off the guide by small amounts (row 2 right, row 3 slightly right, row 4 left) with text following each marker: even a few px of zigzag reads as "Out of Alignment" (audit 2026-10-15) | p.98 |
| Justified text only in multi-column print composition | Justified narrow columns (~30 characters): figure shows stretched letter-spacing on lines 1-3 of column 1, squeezed letters on line 3 of column 2, and an unjustified short last line in each column (audit 2026-10-15) | p.97 |
| Raised featured middle card that stays in its column band | (implicit) a featured card that pushes outside the container guides (audit 2026-10-15) | p.88, p.92 |

## 5. Exceptions & judgement calls

- Center alignment is fine for headings/slogans/CTAs but, per the book, harder to read for paragraphs; "after a few lines" is the threshold and no number is given (p.93, p.96). [engine note] Practical cap 2-3 lines / ~60 characters wide.
- Right alignment is right for RTL languages and for numerals; wrong for LTR prose (p.96, p.97, p.99).
- Justified text is a print convention; the book frames it as multi-column composition where justification separates columns; the figure shows its spacing cost (p.97). [engine note] On the web it needs wide columns plus `hyphens: auto` to avoid rivers.
- Optical alignment contradicts mechanical centering; the book says to use your eye (p.95). Judge visually, then document the offset.
- Alignment can be broken on purpose to attract attention; the book warns it is difficult (p.102).
- The book mixes a "vertical alignment" naming convention: vertical alignment = aligning to an invisible horizontal line (p.89). Keep the book's definition in mind when reading "vertical" and "horizontal" alignment.
- [engine note] With consistent container padding, both left and right edges align automatically; centered sections still have to respect the same container edges.
- [engine note] For numeric columns, right alignment also needs tabular figures (`font-variant-numeric: tabular-nums`) and a fixed number of decimals, or digits still won't stack; the book only shows the alignment.

## 6. Figures worth keeping

Copied to `examples/ui-pedia/alignment/`:
- p.86: landing-page mock over a column-grid overlay (logo, nav, hero text left, image right, 3 cards, banner, 3-column footer) plus the Docs toolbar alignment icons.
- p.88: same page with highlighted column bands: heading, buttons, cards, banner and footer columns all snapping to the same 3-4 columns.
- p.89: three cards on shared top/mid/bottom guides.
- p.90: tall main column + short sidebar, top aligned.
- p.91: center-aligned nav bar; 2x3 card grid with left/center/right guides.
- p.92: max-width container guides on a full-page layout.
- p.93: center-aligned CTA block with axis.
- p.94: media-object card (icons centered, text left) and edge-alignment banner.
- p.95: optical vs center alignment of a play button (x/x vs x/y gaps).
- p.96: left/center/right text blocks.
- p.97: justified two-column text with uneven spacing.
- p.98: in-alignment vs out-of-alignment list rows.
- p.99: logo + slogan left vs right aligned.
- p.100: invoice with right-aligned vs left-aligned prices.
- p.101: grid overlay on bank/hotel app screens.
- p.88 / p.92 (audit 2026-10-15): the middle card of the three-card row is raised and enlarged (white, stronger shadow) while staying in its column band: a reference for a "featured" card that does not break the grid.
- p.100 (audit 2026-10-15): also the reference for invoice/summary anatomy: unit in header, 2-decimal values, dashed dividers, right-aligned bold summary labels meeting the value column, bold grand total.

## 7. Open questions

- p.95: no numeric offset for the optical-alignment nudge; the direction (play triangle moved right, toward its point, so left gap x > right gap y) was read from the figure labels x/x vs x/y.
- p.100: in the "proper alignment" card the Tax value (0.00) sits ~10 px lower than its label "Tax:", and Sub Total/Tax values are lighter weight than the Grand Total; these are figure imperfections, not rules.
- p.101: the book says it used grids to "keep a consistent gutter width" but gives no column count, margin or gutter size; the 4-column count is my reading of the picture.
- p.93: the figure shows the CTA paragraph with a few bold phrases; the book does not comment on this.
- p.97 text: "Column separation is used because using long sentences can cause readers to lose track" is the book's claim; it is about long lines, not alignment per se.
- Pages with little or no rule content: p.86 (definition + Docs toolbar screenshot; rule captured in section 1), p.102 (etymology plus two statements, captured: exceptions and "point to be noted").
- (audit 2026-10-15) corrected: p.96 text-alignment cards, was "8 lines each", page shows 9 lines each (p.96).
- (audit 2026-10-15) corrected: p.100 figure description, was "Descriptions and header labels left-aligned in both", page shows the "Price (USD)" header right-aligned over the values in the proper invoice and left-aligned with them in the bad one (p.100).
- (audit 2026-10-15) coverage: all 17 page images p.86-102 viewed. p.87 and p.88 (text) are the definition and the four reasons, no numeric content; p.102 is etymology + summary. The only measurable content in the chapter lives in the figures (p.89-p.101); new rules above are read from those figures and flagged where the text does not state them.
- (audit 2026-10-15) p.88 grid overlay: the pink bands are of unequal width (three pink bands with two narrower white bands), so the column count of this figure cannot be read reliably; do not cite it as a 3- or 4-column grid.
