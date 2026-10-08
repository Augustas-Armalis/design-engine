---
source: web:https://practicaltypography.com/ (Matthew Butterick; pages tables, rules-and-borders, grids-of-numbers, columns, grids, widow-and-orphan-control, keep-lines-together, keep-with-next-paragraph, page-break-before, page-layout, maxims-of-page-layout, sample-documents, research-papers, letterhead, business-cards, resumes, presentations, websites, responsive-web-design, screen-reading-considerations, the-infinite-pixel-screen; fetched 2026-10-08)
chapter: Practical Typography - tables, grids, columns, page-level layout, document types
pages: n/a (web source)
topic_tags: [typography, butterick, tables, number-alignment, rules-borders, grids, columns, widows-orphans, presentations, dark-slides, research-paper, letterhead, resume, websites, layout]
status: studied
---

# Practical Typography - tables, grids, columns, document layouts

Raw text: `corpus/web/practical-typography/txt/`. Wording is mine. Print-specific production advice (paper, printers, PDF, scanning) is omitted; web-relevant principles and measurable numbers are kept.

## 1. Core ideas

1. Tables are the right tool for gridded data and for complex alignment; the common defects of default tables are cell borders that clutter and cell margins that are too tight.
2. The golden rule of number grids: in a column, digits with the same meaning must align vertically. Different number kinds (quantity, nominal, ordinal, percentage) need different alignment; tabular figures are a precondition.
3. Rules and borders are used sparingly: increasing space comes first, then thin single lines; chartjunk (heavy gridlines) hides data.
4. Grids are a guide, not a guarantee: coarser and simpler is better, they need not be symmetric, and the eye is the final judge. Do not treat alignment to a grid as proof of quality.
5. Columns help shorten line length in print (two or three on letter paper), but on the web the open-ended page height makes them less useful.
6. Widow/orphan and keep-together controls are print concerns; on the web the equivalent is avoiding a lone short word on the last line and avoiding a stranded heading.
7. The sample documents all apply the same recipe: larger margins, shorter line length (about 65 characters), smaller type, tighter spacing, better fonts, one space, hyphenation, no underlining, and a foreground/background split.
8. Slides are read in a dark room; optimise them for reading in the dark: black background, thin sans, pale grey text, stable base size.
9. Websites: the 90s habits are mostly gone; the risk now is template sameness.

## 2. Rules

### 2.1 Tables

- **RULE [PT-LT-01]** Use a table for genuinely tabular content (grids of numbers, comparison data); for other alignment problems the author is happy to use a table, but in a web build choose CSS grid or flex for non-tabular layout and keep `table` for data.
  **Why** Tables are the right tool where white-space characters cannot do the job; layout tables are a semantic and accessibility cost.
  **Applies to** SaaS app UI | pricing | docs.
  **Check** `table` elements contain tabular data (headers present, `th` scope); layout done with grid/flex. (The second half is an [engine note]; the book also mentions CSS grid as a newer, more flexible option.)
  **Source** practicaltypography.com/tables.html

- **RULE [PT-LT-02]** Start every table with all cell borders off (`border: none` on `table`, `tr`, `td`, `th`) and add lines back only where they help; the text itself creates an implied grid.
  **Why** Cell borders are useful while loading the table and clutter it once full, especially with many small cells.
  **Applies to** SaaS app UI | docs | pricing.
  **Check** computed `border-width` on `td` is 0; any border present is deliberate (rows-only or columns-only).
  **Source** practicaltypography.com/tables.html; /rules-and-borders.html

- **RULE [PT-LT-03]** Increase cell padding to improve a dense table: start around 0.03 in (about 3 px) and add 0.01 in (about 1 px) at a time; top and bottom padding may exceed side padding. The book's own site uses `padding: 0.4em` on cells.
  **Why** Default cell margins, especially in Word, are too tight; a little padding goes a long way.
  **Applies to** SaaS app UI | docs.
  **Check** computed `td` padding block ≥ 3 px (soft; 0.03 in); text does not touch rules; compare row height to line-height (≥ 1.4x for dense rows is mine).
  **Source** practicaltypography.com/tables.html (cell-margin section); styles.css [M]

- **RULE [PT-LT-04]** If a table needs lines, draw only the ones that separate (between rows with a `tr + tr` top border, or between columns with a `td + td` left border), single solid, 0.5-1 pt thick (about 0.67-1.33 px, i.e. a 1 px hairline on screen); no dotted/dashed/double patterns; avoid borders thicker than 1 pt (noise that upstages the data).
  **Why** You want to see the data, not the lines; thinner than 0.5 pt will not reproduce, thicker competes.
  **Applies to** SaaS app UI | docs | pricing.
  **Check** computed `border-top-width` on `tr + tr` ≤ 1.5 px; `border-style: solid` only; border colour contrast low (his site: 1 px `#ccc`).
  **Source** practicaltypography.com/rules-and-borders.html; /tables.html; styles.css [M]

- **RULE [PT-LT-05]** Before adding a rule or a box, ask whether more space above and below does the job; rules and borders, like caps and bold, are used sparingly. For rules on headings, put them above the heading rather than below.
  **Why** White space separates without adding marks; a rule above divides the end of the last section from the new one.
  **Applies to** all.
  **Check** `visual`; count of bordered containers on a screen (soft).
  **Source** practicaltypography.com/rules-and-borders.html

- **RULE [PT-LT-06]** Never build rules or borders from repeated characters (hyphens, dashes, underscores, parentheses, equals signs); use border or `<hr>`.
  **Why** Typewriter habit; breaks on edit and when pasted.
  **Applies to** all.
  **Check** regex `[-_=]{5,}` in text nodes.
  **Source** practicaltypography.com/rules-and-borders.html

### 2.2 Numbers in grids

- **RULE [PT-LT-07]** In any column of numbers, align digits that carry the same meaning vertically; do not apply one alignment to everything. Quantities (money, weights) go right-aligned or decimal-aligned; nominal numbers (invoice numbers) right-align when their structure builds from the right; ZIP codes left-align; phone numbers right-align.
  **Why** A digit's meaning depends on its position relative to the (possibly implied) decimal point, so typography must reflect the number kind or it misleads.
  **Applies to** SaaS app UI | pricing | dashboards | invoices.
  **Check** numeric `td` has `text-align: right` (or decimal alignment via fixed decimals + right); ZIP/postal `text-align: left`; `font-variant-numeric: tabular-nums` on the column.
  **Source** practicaltypography.com/grids-of-numbers.html

- **RULE [PT-LT-08]** Use tabular figures in number columns (see PT-FC-24 for the test). Put currency symbols, commas and cents consistently so cents and dollars line up; add a leading zero to quantities between 0 and 1; once any value in a column has a thousands comma, give all of them commas (a comma is mandatory in a column even for 4-digit values).
  **Why** Without a comma, 6736 does not line up with 16,736; equal widths are needed for alignment.
  **Applies to** SaaS app UI | pricing | dashboards.
  **Check** within a numeric column, all values share the same decimal places (money) and the same grouping separators; leading `0.` present for values < 1.
  **Source** practicaltypography.com/grids-of-numbers.html

- **RULE [PT-LT-09]** Pad money columns to a fixed number of decimals, but do not pad physical quantities with zeros: 98 and 98.000 pounds differ in claimed precision.
  **Why** Measurements communicate precision as well as magnitude.
  **Applies to** dashboards | reports.
  **Check** n/a (copy decision); money columns have constant decimals.
  **Source** practicaltypography.com/grids-of-numbers.html

- **RULE [PT-LT-10]** Format column labels last; they may follow a different alignment (centred over right-aligned numbers) if it looks right, since readers do not notice. Keep line spacing even, remove garish colour schemes and needlessly thick borders, and use a refined font instead of a default one.
  **Why** Labels are secondary to the numbers; unevenness or noise distracts.
  **Applies to** SaaS app UI | reports.
  **Check** row heights constant (variance ≈ 0); at most 1 accent colour in the table.
  **Source** practicaltypography.com/grids-of-numbers.html

### 2.3 Columns, widows, grids

- **RULE [PT-LT-11]** In print, use two or three columns on a letter-size page (four is too many) as a way to get shorter lines without huge margins, and align baselines across columns by making paragraph spacing zero or a whole multiple of the line spacing. On the web use CSS multi-column only for small amounts of text or link lists that fit one screen; page height is open-ended, which defeats columns.
  **Why** Columns shorten line length but require fixed vertical space.
  **Applies to** docs | footers | long link lists.
  **Check** `column-count` ≤ 3 on prose; `column-count` containers have bounded height or short content; `break-inside: avoid` on list items.
  **Source** practicaltypography.com/columns.html

- **RULE [PT-LT-12]** Treat widow/orphan control as optional: apply it where widows or orphans cause a visible problem, accepting blank lines at the bottom of pages as the cost. On the web the practical problem is a lone short word on the last line of a paragraph; fix it with a non-breaking space before the last word or, as an [engine note], `text-wrap: pretty`.
  **Why** Widows (last line at top of the next page) can be one word and are more distracting than orphans; control costs blank lines.
  **Applies to** print CSS | long-form articles.
  **Check** last line of paragraphs ≥ about 20 percent of the longest line (T11); `orphans/widows` ≥ 2 in print CSS (soft).
  **Source** practicaltypography.com/widow-and-orphan-control.html

- **RULE [PT-LT-13]** Use keep-together and keep-with-next on headings (always) and on short blocks that must stay whole (signature blocks, a label plus its option list). Do not apply keep-together to long paragraphs by default: it only works on whole paragraphs and leaves bigger gaps.
  **Why** A heading stranded at the bottom of a page or a split signature block looks like a mistake.
  **Applies to** print CSS | PDF export.
  **Check** `h1-h6 { break-after: avoid }` and `figure, .signature { break-inside: avoid }` in print CSS (the book itself says CSS is "not applicable"; the properties are an [engine note]).
  **Source** practicaltypography.com/keep-lines-together.html; /keep-with-next-paragraph.html

- **RULE [PT-LT-14]** Use a coarse, simple grid and treat it as guidance: grids can guide position, size or alignment of visible elements and of invisible spacing; keep it as simple as possible, because a complicated grid is no grid; do not demand symmetry or that everything sit on the grid. The grid may emerge from consistent decisions rather than be defined first.
  **Why** Fewer alignment options means more consistency; rigid grids give false security ("aligned to the grid, therefore good").
  **Applies to** all.
  **Check** spacing values come from a short scale (≤ 8-10 values) rather than arbitrary numbers; `visual`.
  **Source** practicaltypography.com/grids.html

- **RULE [PT-LT-15]** For scalable web layouts the author starts from a 1rem grid (tied to the viewport with a media query) or a 1vw grid; for print a pica grid (1 pica = 12 pt) to derive coarser text-block grids. Baseline grids are unnecessary for book or website layouts (too much rigidity and work).
  **Why** A basic unit makes sizes related; baselines matter mainly in wide multi-column pages.
  **Applies to** all.
  **Check** [engine note] unit base is rem; avoid `vw`-only sizes for type (conflict with T-FL-01, see section 5).
  **Source** practicaltypography.com/grids.html

### 2.4 Document-type recipes (apply to docs, reports, email, pitch pages)

- **RULE [PT-LT-16]** Research papers / long documents: larger page margins so line length is about 65 characters, smaller point size, tighter line spacing, a better font pair, one space after sentences, hyphenation on, headings not underlined, no first-line indent that is too deep; the result fits as many words per page as the old 1 in / 12 pt / double layout.
  **Why** The old layout is a typewriter artefact; the revised one reads like a book.
  **Applies to** docs | reports.
  **Check** measure ≈ 65 characters (45-90), body size in range, `line-height` 1.2-1.45, no underline in headings.
  **Source** practicaltypography.com/research-papers.html; /page-margins.html

- **RULE [PT-LT-17]** Letterhead and header/footer matter: make the content of the page (the letter) the foreground and the address block the background; the address block must not dominate or sit in a huge top margin; avoid centred multi-line blocks, avoid using both first-line indents and paragraph spacing, avoid screen-optimised fonts in print, start the letter near the top of the page, prefer a simple two-column arrangement.
  **Why** Foreground-background relationship should be visible at a glance.
  **Applies to** email templates | PDFs | site headers.
  **Check** header height ≤ about 15 percent of the first viewport on content pages (mine); `visual`.
  **Source** practicaltypography.com/letterhead.html

- **RULE [PT-LT-18]** Business cards and other tiny canvases: shrink and simplify. Remove everything nonessential, build the layout outward from the text, never push information to the corners ("baseball diamond"), use one good font family, a consistent small size (text on cards is often 6-8 pt), letterspace caps and small caps, keep colour understated (the louder the colour, the less of it).
  **Why** Text-first layout produces coherent white space; edge-first layouts look mediocre.
  **Applies to** cards | badges | compact components (profile cards, tags).
  **Check** `visual`; letter-spacing on caps ≥ 0.05em; at most 2 type sizes.
  **Source** practicaltypography.com/business-cards.html

- **RULE [PT-LT-19]** Resumes / dense profile documents: avoid density; allow a second page if needed; put the most important information on page one and never assume the reader sees page two; keep headings from dominating the body; make names of schools/employers and the where/when immediately visible; use gentle bullets; move nonessential content to the second page.
  **Why** Dense text with headings that outweigh content hides the substance; skimmability is the goal.
  **Applies to** profile pages | CV-style layouts.
  **Check** `visual`; heading font-size ≤ about 1.25 x body inside the document.
  **Source** practicaltypography.com/resumes.html

### 2.5 Presentations

- **RULE [PT-LT-20]** For slides shown in a dim room, optimise for reading in the dark: start from a black background (not dark grey or a gradient), use a thin sans-serif, begin text at 50 percent grey and brighten only until it is legible (thinner type needs to be brighter); pure white text on pure black has uncomfortable contrast.
  **Why** Pupils dilate in dim rooms, so large white rectangles hurt and cost attention; the fewest photons that can be read is the aim.
  **Applies to** slide decks | dark-mode presentation surfaces | kiosk screens in dim rooms.
  **Check** background `#000` (or near), text luminance contrast ≥ 4.5:1 (50 percent grey `#808080` on black is about 5.3:1 [engine note]); body text colour not `#fff` on `#000` for sustained text.
  **Source** practicaltypography.com/presentations.html

- **RULE [PT-LT-21]** Pick one base point size that fits 12-15 lines of text on a slide and use it on every slide, even slides with one line; turn off auto-fit-to-box shrinking (change the text, not the size); avoid centred text, huge centred headlines and bright saturated colours (prefer pale shades); the layout need not fill the full width of wide screens as long as it is consistent.
  **Why** Changing sizes slide to slide is annoying; wide aspect ratios are inconvenient for typography.
  **Applies to** slide decks.
  **Check** `font-size` of body text constant across slides; `text-align: center` count; auto-fit disabled.
  **Source** practicaltypography.com/presentations.html

- **RULE [PT-LT-22]** For slides in a lit room avoid pure black text on a pure white background: use a light grey background or dark grey type to reduce contrast; remember that a pale grey background projected under normal light reads as white (simultaneous contrast).
  **Why** Reading comfort.
  **Applies to** slide decks | light-theme pages.
  **Check** not `#000`-on-`#fff` for presentation body text.
  **Source** practicaltypography.com/presentations.html

- **RULE [PT-LT-23]** Omit list bullets when every point is shorter than one line; bullets exist to mark where an item starts when items run to multiple lines.
  **Why** The visual cue is redundant for one-liners.
  **Applies to** slide decks | short lists.
  **Check** `ul` where all `li` ≤ one line may use `list-style: none`.
  **Source** practicaltypography.com/presentations.html; /bulleted-and-numbered-lists.html

### 2.6 Websites

- **RULE [PT-LT-24]** Bring ideas from outside web conventions (books, posters, art, software, other designed objects) into web typography and layout, avoiding both the 90s habits (tiny text, huge headings, system-font monoculture, edge link walls, colour-block layouts) and the template-era monoculture; experimentation is valuable, and browser limitations are no longer an excuse.
  **Why** The web has no centuries-old tradition, so benchmarks must come from other media.
  **Applies to** landing page | docs.
  **Check** see PT-CR-13/-15; `visual`.
  **Source** practicaltypography.com/websites.html

- **RULE [PT-LT-25]** Do not let an element on a responsive page ignore the typographic rules at small widths: body text stays inside the line-length band, navigation and images scale, and the text must not be left at a fixed size reflowing edge to edge.
  **Why** The early responsive failure mode.
  **Applies to** all (see PT-SZ-10).
  **Check** same as PT-SZ-10.
  **Source** practicaltypography.com/responsive-web-design.html

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Border thickness | 0.5-1 pt (about 0.67-1.33 px); table borders on the site: 1 px `#ccc` | rules-and-borders, styles.css |
| Cell margin start | about 0.03 in (about 3 px), step 0.01 in (about 1 px) | tables |
| Cell padding on the site | 0.4em; th 0.3rem 0.5rem | styles.css [M] |
| Table width on the site | 95 percent, collapsed borders | styles.css [M] |
| Columns | 2-3 on 8.5 x 11 in; 4 too many | columns |
| Page margins | 1 in default is too small; 1.5-2.0 in at 12 pt; left/right asymmetry ≥ 1 in to be visible | page-margins |
| Line length target in the research-paper makeover | about 65 characters | research-papers |
| Business card text | 6-8 pt | point-size |
| Slide size | 12-15 lines at the base size | presentations |
| Slide colours | black background; text starts at 50% grey | presentations |
| Pica | 1 pica = 12 pt | grids |
| Grid unit on the web | 1rem (with media query) or 1vw | grids |
| 4K screens | 3840 x 2160 px, four times the pixels of HDTV (1920 x 1080) | the-infinite-pixel-screen |
| Eye limit | 1-2 arcminutes; about 143 ppi at 24 in, 286 ppi at 12 in | screen-reading-considerations |
| Letter paper | 8.5 x 11 in with 1 in margins gives a 6.5 in line, which he says professionals never use for single-block text | page-margins |

## 4. Dos and Don'ts

| Do | Don't | Source |
|---|---|---|
| Table with no cell borders and padded cells | Boxed grid with tight cells | tables |
| Right/decimal-align quantities, left-align ZIP codes | Same alignment for all columns | grids-of-numbers |
| Thin single rules between rows only | Thick, double or dashed borders | rules-and-borders |
| Heading that moves with its text | Heading at the bottom of a column | keep-with-next-paragraph |
| Black slide, 50% grey text brightened until legible | Giant white rectangle with huge centred headline | presentations |
| One base slide size | Auto-shrink per slide | presentations |
| Text-first business card | Baseball-diamond layout | business-cards |
| Résumé allowed to run to a second page | Cramming to one page | resumes |

## 5. Exceptions & judgement calls

Conflicts and cross-references (`knowledge/web/typography.md`, `knowledge/ui-pedia/12-typography.md`, `15-tables-and-graphs.md`, `11-layout-and-grids.md`):

- **Tables for layout.** The book says tables are fine for side-by-side or floating layout; a modern build should use CSS grid/flex for layout and reserve `table` for data (a11y). [engine note]
- **vw units.** Butterick likes `1vw` grids and scaling text with `vw`; T-FL-01/-02 forbid vw-only sizes (zoom failure). Use `clamp()` with a rem term. His own site uses a vw-only root between 521 and 999 px.
- **Modular grids.** The book distrusts ratio-driven grids; ui-pedia 05/11 (proportion, grids) and T-SC-01 are more ratio-friendly. Treat ratios as scaffolding; eye decides.
- **Tabular figures.** Matches T-NU-01; his zeros-over-ones test is a clear mechanical check.
- **Number alignment in dashboards.** Right-align quantities (T-NU-01 covers tabular-nums; alignment direction is the addition). Left-aligned numeric columns are a common UI error.
- **Dark slides.** Black background and soft text matches dark-mode guidance; engine contrast floor remains 4.5:1. The author's "pure black, not dark grey" is for projectors; for UI dark themes use the engine's own dark-mode rules.
- **Gradients.** The book calls a subtle brightness gradient behind type acceptable for a sense of dimension (opinion); T16 flags gradient-filled headings (a different thing, text clip).
- **Columns on the web.** The book finds them of little use; multi-column prose on web pages is better replaced by a single measured column.
- **Print-only controls.** Widows/orphans, page-break-before, keep-together are noted as "not applicable" to CSS in the book; modern CSS has `break-*`, `widows`, `orphans` (print only).

## 6. Figures worth keeping

- /tables.html: cluttered vs clean `Athos Porthos Aramis` table; dense vs padded phone table.
- /rules-and-borders.html: wrong (heavy) vs right table.
- /grids-of-numbers.html: before/after number grid with the alignment annotations.
- /page-margins.html: documents A and B.
- /presentations.html: before/after slide.
- /research-papers.html, /letterhead.html, /business-cards.html, /resumes.html: before/after layouts with bulleted defect lists.
- /grids.html: Gutenberg Bible spread, four vertical and two horizontal lines.

## 7. Open questions and coverage

- /sample-documents.html (index) and /page-layout.html (chapter intro) have no rule content.
- /page-break-before.html: print-only, "not applicable" in CSS; recorded as an [engine note] mapping only.
- Spot-check not done for the sample-document images; only text lists were used.
