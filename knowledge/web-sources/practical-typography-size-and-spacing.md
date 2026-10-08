---
source: web:https://practicaltypography.com/ (Matthew Butterick; pages point-size, line-spacing, line-length, page-margins, body-text, first-line-indents, space-between-paragraphs, space-above-and-below, centered-text, justified-text, hyphenation, letterspacing, kerning, metrics-vs-optical-spacing, headings, hierarchical-headings, block-quotations, bulleted-and-numbered-lists, responsive-web-design, em-sizing, screen-reading-considerations; plus the book's own styles.css; fetched 2026-10-08)
chapter: Practical Typography - size, spacing, measure, alignment, headings
pages: n/a (web source)
topic_tags: [typography, butterick, point-size, line-height, measure, line-length, letter-spacing, kerning, hyphenation, alignment, headings, paragraph-spacing, responsive]
status: studied
---

# Practical Typography - size, spacing, measure, alignment, headings

Raw text: `corpus/web/practical-typography/txt/` and `_styles.css` (the book's own stylesheet, fetched once; private, gitignored). All wording is mine; numbers are the author's unless marked.

**Unit translation [engine note].** 72 pt = 1 in; 1 pt = 1.333 CSS px. So print 10-12 pt = 13.3-16 px; "12 pt with 1.5-2.0 in margins" is a print-only statement. Percent line spacing = unitless `line-height`; `letterspacing` percent = `em`. "Characters per line" is a measured quantity, independent of unit.

## 1. Core ideas

1. Four body-text numbers matter most: size (15-25 px on the web), leading (120-145 percent), measure (45-90 characters), font. Everything else is secondary.
2. Screens need bigger type than paper: readers sit farther away and screen fonts are built from relatively few pixels. The web's tradition of tiny text came from 1990s 14-inch monitors and is obsolete.
3. The web's other legacy, giant headings, came from the browser's default `h1` at about 200 percent of body. Emphasis never needed a doubling; space and small increments do it more subtly.
4. Line length is the biggest lever on legibility: shorter lines make the return sweep easier. Margins exist to make lines shorter; the edge of the window is not the edge of the text.
5. Spacing is paired: use either a first-line indent or space between paragraphs, never both.
6. As size shrinks, shrink line spacing and line length with it (newspapers read well because the columns are narrow and the leading snug).
7. Justification needs hyphenation; hyphenation is optional on a left-aligned rag; neither belongs in headings.
8. Letterspacing is for capitals (5-12 percent). Lowercase body text is fine at zero.
9. Headings are a structure problem first (fewer levels) and a typography problem second (minimal increments, space, bold not italic).
10. Responsive design does not change the rules: the line-length band applies at every viewport width.

## 2. Rules

### 2.1 Size

- **RULE [PT-SZ-01]** Set long-form body text at 15-25 px on the web (10-12 pt in print) and fine-tune for the specific font; do not default to 12 pt print habits or to tiny web text.
  **Why** Reading distance is greater on screen and screen glyphs have few pixels, so each extra pixel row helps; the old small-text habit came from low-resolution monitors.
  **Applies to** landing page | docs | long-form. For dense product UI see section 5 (conflict).
  **Check** median computed `font-size` of `p` elements with more than 100 characters is in 15-25 px; flag body prose < 15 px.
  **Source** practicaltypography.com/point-size.html; /summary-of-key-rules.html

- **RULE [PT-SZ-02]** Judge size by eye per font, not by the numeric size alone: two fonts at the same size can look different because the glyphs occupy different fractions of the em. To match a new font to an old one, set the same text in both and adjust the new size until lines break in nearly the same places.
  **Why** Point size is the em box, not the glyph height; x-height and width vary by design.
  **Applies to** all (font swaps, fallback matching, pairing).
  **Check** compare x-height/em and average advance width between faces; `font-size-adjust` or manual scaling so rendered x-height matches within ±0.02 em (the threshold is mine, see T-PA-03 in `knowledge/web/typography.md`).
  **Source** practicaltypography.com/point-size.html; /em-sizing.html

- **RULE [PT-SZ-03]** Raise emphasis by size in half-point steps (about +0.67 px at a time) rather than big jumps; for an 11 pt body, start at 11.5 pt, not 14 pt.
  **Why** Small differences are visible at text size and keep the page quiet.
  **Applies to** all (in-text emphasis, sub-headings, captions).
  **Check** `font-size` ratio between body and any in-flow emphasis/subhead ≤ about 1.15 before a deliberate heading jump (soft, mine).
  **Source** practicaltypography.com/point-size.html; /headings.html

- **RULE [PT-SZ-04]** When reducing point size, also reduce line spacing and line length; small type with generous leading and a wide column reads badly.
  **Why** Newspaper type is tiny but stays legible because the lines are short and tight.
  **Applies to** all (captions, footnotes, tables).
  **Check** for text smaller than body: its max-width in characters ≤ body max-width; line-height ratio ≤ body ratio (soft).
  **Source** practicaltypography.com/point-size.html

### 2.2 Line spacing

- **RULE [PT-SZ-05]** Set line spacing to 120-145 percent of the font size, i.e. a unitless `line-height` of 1.2-1.45; never leave "single" (browser `normal`, often about 1.15-1.2 [engine note]) or "double", and never use px or % values that do not scale with inheritance.
  **Why** Single is dense and hard to read; double (and 1.5-lines) is looser than optimal. His samples: 110 percent too tight, 135 percent right, 170 percent too loose.
  **Applies to** all prose; see section 5 for how this lines up with 1.5-1.65 elsewhere in the repo.
  **Check** computed `line-height / font-size` on body paragraphs in 1.2-1.45 (engine accepts up to 1.5, see section 5); `line-height` authored as a number; flag `normal`.
  **Source** practicaltypography.com/line-spacing.html; /typography-in-ten-minutes.html

- **RULE [PT-SZ-06]** Adjust line spacing within the band to the font: faces that look small (small x-height) need less leading, faces that look large need more.
  **Why** Perceived line gap is a function of x-height, not only the line-height number.
  **Applies to** all (pairings, font swaps).
  **Check** `visual`; heuristic: x-height/em above ~0.52 push toward 1.4+; below ~0.45 toward 1.25-1.35 (my numbers, not the author's).
  **Source** practicaltypography.com/line-spacing.html (by-the-way note); /point-size.html

- **RULE [PT-SZ-07]** To fit content to a space, change line spacing before point size: it affects length more than size does.
  **Why** Leading is the cheaper, less visible lever on document length.
  **Applies to** docs | print.
  **Check** n/a (process).
  **Source** practicaltypography.com/line-spacing.html

### 2.3 Measure and margins

- **RULE [PT-SZ-08]** Keep average line length at 45-90 characters including spaces (or 2-3 lowercase alphabets, i.e. about 52-78 characters) at every viewport width; measure it in characters per line, not in inches, ems or pixels.
  **Why** Longer lines make the eye's return to the next line harder; characters per line works at any size, while physical width does not.
  **Applies to** all prose (body paragraphs, long descriptions); not to headlines or short UI labels.
  **Check** canvas-measure average advance width, then `p` width / width-per-character, or count characters on rendered lines with Range rects; pass band 45-90 (flag <35 or >95 desktop, per T08).
  **Source** practicaltypography.com/line-length.html; /summary-of-key-rules.html

- **RULE [PT-SZ-09]** Do not let text run edge to edge of the window; give the text block margins as large as needed to hit the character band, even if it leaves much of the viewport empty.
  **Why** Margins are the main control of line length; fear of white space produces the "paid by the square inch" look.
  **Applies to** landing page | docs | article pages.
  **Check** text-container `max-width` (or equivalent width cap) present on prose; at viewport ≥ 1280, prose width < 60 percent of the viewport (soft, mine).
  **Source** practicaltypography.com/page-margins.html

- **RULE [PT-SZ-10]** In responsive layouts, guard the measure explicitly at every breakpoint: scale size and element width at the same rate, or cap the element with `max-width`; test that prose stays inside 45-90 characters from the smallest to the largest width.
  **Why** Responsive designs often scale images and nav but leave body text reflowing from edge to edge, which is the typical failure.
  **Applies to** landing page | docs | SaaS app (prose areas).
  **Check** measure characters per line at 360, 768, 1024, 1440 and 1920 px viewports; all within the band for prose paragraphs.
  **Source** practicaltypography.com/responsive-web-design.html

- **RULE [PT-SZ-11]** Do not trust the CSS `ch` unit as a proxy for "characters per line": it is the advance width of the digit zero, which is wider than the average letter in running text, so a `65ch` box fits more than 65 average characters.
  **Why** The author warns that `ch` is not a useful stand-in for average characters per line.
  **Applies to** all.
  **Check** whatever unit is used for `max-width`, confirm the actual characters per line by measurement (PT-SZ-08), not by the nominal `ch` number.
  **Source** practicaltypography.com/responsive-web-design.html

- **RULE [PT-SZ-12]** Be careful tying a mobile layout to pixel-width media queries: as phones have grown, thresholds drift upward, and a mobile layout can then appear in large desktop windows. A CSS pixel on a phone and on a desktop display are not the same visual size because reading distance differs.
  **Why** Media queries cannot tell desktop from mobile; the author even suggests JavaScript device detection, which [engine note] is not recommended here (use container queries and input/pointer media features).
  **Applies to** all.
  **Check** media query min/max-width thresholds ≤ ~1024 px for "mobile" layouts; `visual` at 768 and 1024.
  **Source** practicaltypography.com/responsive-web-design.html; /screen-reading-considerations.html

- **RULE [PT-SZ-13]** If the text will only ever be read on screen, shrinking page margins and raising point size is reasonable (screens are smaller than letter paper); if it could be printed, keep a print-optimised layout.
  **Why** A downloadable document is read on both media.
  **Applies to** docs (HTML versus PDF).
  **Check** n/a (judgement).
  **Source** practicaltypography.com/screen-reading-considerations.html

### 2.4 Paragraph signalling

- **RULE [PT-SZ-14]** Mark paragraph starts with either a first-line indent of 1-4 times the font size (`text-indent: 1em` to `4em`) or space between paragraphs, never both. Skip the indent on the first paragraph of a text and on paragraphs right after a heading. Use the low end in narrow blocks (3 in or less), the high end in wide ones.
  **Why** One signal suffices; an indent smaller than the type size is invisible, bigger than four times detaches the first line from the left edge.
  **Applies to** docs | articles.
  **Check** for `p + p`: either `text-indent` > 0 or `margin-top`/`margin-bottom` > 0 but not both; `text-indent` between 1em and 4em when used.
  **Source** practicaltypography.com/first-line-indents.html; /summary-of-key-rules.html

- **RULE [PT-SZ-15]** When separating paragraphs with space, use 4-10 pt (5.3-13.3 px), which the book states as 50-100 percent of the body size (about 0.5em to 1em); larger type needs proportionally more.
  **Why** It must be seen but not make paragraphs feel disconnected.
  **Applies to** all prose.
  **Check** computed gap between consecutive `p` (collapsed margin) / `font-size` in 0.5-1.0.
  **Source** practicaltypography.com/space-between-paragraphs.html

- **RULE [PT-SZ-16]** Create vertical space with margins on the element (or a spacing token), not with empty paragraphs, repeated `<br>`, or stacked returns; prefer spacing "after" a block and use "before" only in special cases such as a block quotation.
  **Why** Extra returns break unpredictably on edit; word processors take the larger of the after/before spaces, so symmetric before-and-after settings give less than intended (CSS margins collapse the same way [engine note]).
  **Applies to** all.
  **Check** no empty `p`; no consecutive `<br>`; margin patterns consistent across blocks.
  **Source** practicaltypography.com/space-between-paragraphs.html; /carriage-returns.html

### 2.5 Alignment and hyphenation

- **RULE [PT-SZ-17]** Default to left-aligned text. Centre only short phrases and titles (a name on letterhead, a major section heading), and use hard line breaks to choose where centred lines break; never centre a whole text block.
  **Why** Both edges of a centred block are uneven, so reading is harder and the block aligns poorly with other elements. Books, newspapers and magazines rarely centre text.
  **Applies to** all.
  **Check** `text-align: center` on `p` or blocks with > 3 lines is a fail (T20 uses > 200 characters).
  **Source** practicaltypography.com/centered-text.html; /headings.html

- **RULE [PT-SZ-18]** Justified text is a taste choice, but if used it must be hyphenated; on the web, where the browser's justification engine is rudimentary, prefer left alignment. Never distribute justification space between letters.
  **Why** Word spacing in each line is stretched; without hyphenation gaps become huge. Letter-spacing variation line to line wrecks the font's designed spacing.
  **Applies to** all.
  **Check** `text-align: justify` requires computed `hyphens: auto` and `lang` set; `letter-spacing` is constant across lines.
  **Source** practicaltypography.com/justified-text.html; /hyphenation.html

- **RULE [PT-SZ-19]** Hyphenation: mandatory with justified text; optional on a left-aligned rag (turn it off if it does not help; it improves evenness but not legibility); essential as lines get shorter; always off in headings (`hyphens: none`). Use a soft hyphen to fix a word that hyphenates badly.
  **Why** With few words per line, breaking only at spaces leaves ragged or gappy lines; headings are short and hyphens there cause more harm than good.
  **Applies to** all.
  **Check** computed `hyphens` on headings is `none`/`manual`; on narrow columns (< 40 characters) prose has `hyphens: auto` or text is not justified.
  **Source** practicaltypography.com/hyphenation.html; /headings.html; /optional-hyphens.html

### 2.6 Letterspacing and kerning

- **RULE [PT-SZ-20]** Add 5-12 percent letterspacing (`letter-spacing: 0.05em` to `0.12em`) to all-caps and small-caps text, especially at small sizes; do not exceed the point where extra letters would fit in the gaps.
  **Why** Capitals are drawn to sit next to lowercase, so they look too tight in a row. Include the spacing in the style definition so it is never forgotten.
  **Applies to** all (labels, eyebrows, tags, small-caps runs).
  **Check** for `text-transform: uppercase` or `font-variant-caps: small-caps`: computed `letter-spacing / font-size` in 0.05-0.12.
  **Source** practicaltypography.com/letterspacing.html; /all-caps.html; /small-caps.html

- **RULE [PT-SZ-21]** Leave lowercase body text at default spacing. Body-text fonts are spaced for about 9-13 pt; letterspace lowercase only below about 9 pt (12 px) to keep letters distinct, and remove letterspacing from lowercase at headline sizes.
  **Why** Fonts tuned for the text-size band need the opposite correction at the extremes.
  **Applies to** all.
  **Check** body `letter-spacing` 0 at 13-17 px; display sizes may be negative (see T-LS-01); text < 12 px may be slightly positive.
  **Source** practicaltypography.com/letterspacing.html

- **RULE [PT-SZ-31]** Keep kerning on at all sizes and use the font's built-in metrics for spacing; do not replace font spacing with algorithmic "optical" spacing except to rescue a font with bad spacing or one pushed beyond its design range.
  **Why** Kerning pairs and spacing are the designer's most consequential work; synthetic spacing guesses wrong on asymmetric letters (a, r, t) and creates jitter in body text.
  **Applies to** all.
  **Check** computed `font-kerning` is not `none`; no CSS that zeroes `letter-spacing` overrides within words; `visual`.
  **Source** practicaltypography.com/kerning.html; /metrics-vs-optical-spacing.html

### 2.7 Headings

- **RULE [PT-SZ-22]** Make headings only slightly bigger than body: use the smallest increment that is visibly different (for 12 pt body, go to 12.5 or 13 pt, about +4 to +8 percent); do not follow the browser habit of doubling.
  **Why** Emphasis does not need a doubling; small size changes plus space and bold already separate a heading. In-document headings differ in job from display type (hero/headline).
  **Applies to** docs | articles | long-form prose. Not a rule for marketing display type (see section 5).
  **Check** for in-article `h2`/`h3`: `font-size` ratio to body ≤ about 1.25 when body is ≥ 16 px (soft; the book states +4-8 percent in print). For product pages see T-SC-03.
  **Source** practicaltypography.com/headings.html; /point-size.html

- **RULE [PT-SZ-23]** Limit heading levels to three, two if possible; cure over-deep outlines structurally rather than inventing more styles (bold, italic, underline, caps, indent) to tell levels apart.
  **Why** Readers cannot hold more than three levels; stacking tricks creates train-wreck headings.
  **Applies to** docs | articles | long-form.
  **Check** count of distinct heading levels used in one article ≤ 3 (`h1` title plus two or three).
  **Source** practicaltypography.com/headings.html

- **RULE [PT-SZ-24]** Style headings in sentence case, bold (or just regular), left-aligned, not underlined, not all caps, not italic, and not centred; heading text should be a phrase, not a full sentence if caps would be needed.
  **Why** Bold is easier to read and stands out better than italic; all-caps and Title Case read as shouting or as titles; headings that are sentences are too long for caps.
  **Applies to** docs | articles | long-form; landing hero headings may be centred (exception in section 5).
  **Check** `h2-h4`: computed `text-transform: none`, `text-decoration: none`, `font-style: normal`; `text-align` not centre in running prose.
  **Source** practicaltypography.com/headings.html

- **RULE [PT-SZ-25]** Emphasise headings with space above and below first (more above than below so a heading belongs to the text it introduces), then with small size or weight changes. If paragraphs are separated by space, the space around headings must be larger still.
  **Why** White space adds emphasis without adding a mark; headings relate to what follows, not what precedes.
  **Applies to** docs | articles | landing sections.
  **Check** `margin-top` of `h2/h3` > `margin-bottom`, ratio ≥ 1.2 (the book gives no figure; T-SC-08 suggests ≥ 1.4); heading gap > paragraph gap; top margin not so large that a heading falls off the first screen.
  **Source** practicaltypography.com/space-above-and-below.html; /headings.html

- **RULE [PT-SZ-26]** If a bold heading looks heavy, reduce its size by 0.5-1 pt instead of raising it; use two indent levels at most even if there are more heading levels; put a rule above a heading rather than below it so it separates sections instead of tying the heading to its own text.
  **Why** Darker colour compensates size; random indents look messy; a rule above divides the previous section from the new one.
  **Applies to** docs.
  **Check** `visual`; `border-top` rather than `border-bottom` on section headings (soft).
  **Source** practicaltypography.com/headings.html; /rules-and-borders.html

- **RULE [PT-SZ-27]** Keep headings with the text they introduce: prevent hyphenation, and prevent a break between a heading and its first line (`break-after: avoid`, `break-inside: avoid`, `text-wrap: balance` as [engine note] aids).
  **Why** A heading stranded at the bottom of a page or column looks like an error.
  **Applies to** print CSS | multi-column | PDF export.
  **Check** `h1-h6` have `break-after: avoid` in print stylesheets; none at the bottom of a page in a print preview.
  **Source** practicaltypography.com/headings.html; /keep-with-next-paragraph.html (the book says "not applicable" in CSS; the CSS properties are an [engine note])

- **RULE [PT-SZ-28]** For hierarchical numbering use tiered numbers (1, 1.1, 1.1.1), not Roman numerals, letters or romanettes; produce them with CSS counters (`counter-increment`, `counter()` with nested counters).
  **Why** Numbers alone avoid ambiguity (is lowercase `i` first or ninth?), and a tiered number is unique so position in the hierarchy is clear.
  **Applies to** docs | specs.
  **Check** numbered headings use digits with dots only.
  **Source** practicaltypography.com/hierarchical-headings.html

### 2.8 Quotations and lists

- **RULE [PT-SZ-29]** Format block quotations in a slightly smaller size and tighter line spacing, indented 2-5 em on the left (0.5 to 1 in in print) and optionally the same on the right; no quotation marks around them; keep them rare and edited, not a dump of source text.
  **Why** The indent must be noticeable but not shrink the measure below range; long block quotes signal "skip this" to readers.
  **Applies to** docs | articles. (Pull quotes in marketing pages are a separate display style.)
  **Check** `blockquote`: `margin-left`/`padding-inline-start` between 2em and 5em; no leading/trailing quote glyphs; line-height ≤ body.
  **Source** practicaltypography.com/block-quotations.html

- **RULE [PT-SZ-30]** Use real list markup (`ul`/`ol`) for bullets and numbers. The marker may be a different font or a smaller size than the item; markers should be only as large as needed (hollow bullets read as subtler than solid), never an asterisk, and simple geometric dingbats beat pictorial ones.
  **Why** Manual lists are error-prone; an oversized marker competes with the text.
  **Applies to** all.
  **Check** no lines starting with `•`, `-`, `*` or `1.` typed inside `p`; marker size ≤ 1.1em (soft).
  **Source** practicaltypography.com/bulleted-and-numbered-lists.html

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| 1 pt | 1.333 CSS px (72 pt per inch; 96 px per inch) | point-size [engine note on px] |
| Body size, print | 10-12 pt (13.3-16 px); 10.5 and 11.5 pt allowed | point-size |
| Body size, web | 15-25 px | point-size |
| Business-card text | 6-8 pt (caps and lowercase equally legible there) | point-size |
| Emphasis increment | half a point (0.5 pt) | point-size, headings |
| Heading bump | body 12 pt to 12.5-13 pt | headings |
| Bold heading offset | reduce 0.5 or 1 pt when the bold is heavy | headings |
| Line spacing band | 120-145 percent | line-spacing |
| Line-spacing samples | 110 percent too tight; 135 percent fine; 170 percent too loose | line-spacing |
| Word processor options | "Single" about 117 percent; "1.5 lines" about 175; "Double" about 233 (all miss the band); Word multiple 1.03-1.24 equals 120-145 percent | line-spacing |
| Line length | 45-90 characters; 2-3 alphabets (the 26-letter alphabet repeated 2.31 times shown as ok) | line-length |
| Print margins at 12 pt | 1.5-2.0 in each side (one inch is "not enough") | page-margins |
| Asymmetric margins | difference between left and right ≥ 1 in; bottom margin ≈ 0.25 in more than top | page-margins |
| First-line indent | 1-4 times the font size (12 pt text: 12-48 pt = 0.17-0.67 in) | first-line-indents |
| Space between paragraphs | 4-10 pt, or 50-100 percent of body size | space-between-paragraphs |
| Block quote indent | 0.5-1 in left; web about 2-5 em | block-quotations |
| Letterspacing caps | 5-12 percent = `0.05em`-`0.12em`; Word: 0.6-1.4 pt per 12 pt | letterspacing |
| Lowercase letterspacing | fonts are spaced for about 9-13 pt; add below 9 pt, remove at headline sizes | letterspacing |
| Kerning | always on (Word: kerning for fonts 8 pt and above) | kerning |
| Heading levels | max 3, prefer 2 | headings |
| Slide base size | fit 12-15 lines of text on screen; same size on every slide | presentations |

Line-height and measure arithmetic [engine note, derived from the above and not in the book]:

| Body px | line-height at 1.20 | at 1.35 | at 1.45 |
|---|---|---|---|
| 16 | 19.2 | 21.6 | 23.2 |
| 18 | 21.6 | 24.3 | 26.1 |
| 20 | 24.0 | 27.0 | 29.0 |
| 22 | 26.4 | 29.7 | 31.9 |
| 24 | 28.8 | 32.4 | 34.8 |

Width for 45-90 characters, assuming an average text character about 0.47 em wide (typical text faces; measure your own font): 16 px 340-680 px; 18 px 380-760 px; 20 px 420-850 px. The same box in `ch` is narrower or wider depending on the font; one `ch` is the width of "0", usually more than the average letter, so a `65ch` box often yields more than 65 characters.

Reading-resolution facts (screen-reading-considerations): the eye resolves 1-2 arcminutes; at 24 in about 143 ppi is visible, at 12 in about 286 ppi; a 100 dpi LCD has under 3 percent of the pixel area of a 600 dpi laser printer. Display examples he cites: phone 326 ppi, desktop 185 ppi.

The book's own stylesheet (measured from `styles.css`, 2026-10-08) [M]:

| Item | Value |
|---|---|
| Root font size | 24 px at viewport ≥ 1000 px; 18 px at ≤ 520 px; `2.4vw` in between (vw-only, not zoom-safe) |
| Body size per face | Equity 0.98rem (23.5 px at 24 px root) / lh 1.40; Century Supra 0.93rem / 1.46; Valkyrie 0.91rem / 1.45; Concourse 1.00rem / 1.35; Heliotrope 0.96rem / 1.42; Hermes Maia 0.88rem / 1.52; Triplicate 0.85rem / 1.45 |
| Content width | body `max-width` 1000 px; content left margin 12rem, right 2.5rem, so about 652 px of text at the 24 px root (about 60 characters for Equity, my estimate), 1.5rem margins on mobile |
| Title block | uppercase, 2.3rem, `letter-spacing: 0.02em`, line-height 1.1, `hyphens: none` |
| Headings | 125 percent size with line-height 1.10 and `font-weight: bolder`; deck 115 percent at 1.25 |
| Aside / small print | 0.83rem, lh 1.4, colour `#667`, `letter-spacing: 0.015em`, `hyphens: none` |
| Table cells | padding 0.4em, no outer border, only 1px `#ccc` rules between rows and between columns, width 95 percent |
| Numerals | `font-variant-numeric: oldstyle-nums` on serif body faces, normal in tables |
| Links | `text-decoration: none`, accent colour `#933`, hover tint |

Observation [engine note]: the book's own line-heights (1.35-1.52, median about 1.45) sit at or just above the top of its stated band, at a measure of roughly 60 characters.

## 4. Dos and Don'ts

| Do | Don't | Source |
|---|---|---|
| Body 15-25 px, leading 1.2-1.45 unitless, 45-90 characters | 12 pt, single or double spacing, one-inch margins on letter paper (a 6.5 in line) | point-size, line-spacing, page-margins |
| Page margins larger than the 1 in default; asymmetry when wanted | Text flowing to the browser edge | page-margins |
| Indent first line 1-4x or space 4-10 pt, one of them | Both together; indent with spaces or tabs | first-line-indents |
| Space around headings, bold, minimal size bump | Underlined, centred, all-caps, 5(a)(1)(iv)-style headings | headings |
| Left-align web text, hyphenate if you justify | Justified without hyphenation (rivers) | justified-text |
| 5-12 percent on caps | Spreading letters until others fit between | letterspacing |
| Break a heading at a logical place with a hard line break | Pressing return to break a heading (creates a new paragraph) | hard-line-breaks |

## 5. Exceptions & judgement calls

Conflicts with existing notes:

- **Line spacing (important).** Butterick: 1.2-1.45 unitless. `knowledge/web/typography.md` T-LH-01: body 1.5-1.65 (landing), 1.4-1.5 (dense UI); `knowledge/ui-pedia/12-typography.md` (p.271): start at 1.5. The book's own pages use 1.35-1.52 at about 60 characters. [engine note] Resolution: for prose with a 45-75 character measure and a typical x-height, 1.3-1.5 is the defensible band; use above 1.5 only for measures > 75 characters, large x-height faces, or light-on-dark text (T-LH-03); T06's 1.3-1.85 detector window stays valid as a loose gate. Treat 1.5 as the engine ceiling for ordinary body, not the floor. Display and heading leading are not covered by Butterick; T-LH-01's lower values remain.
- **Body size.** Butterick 15-25 px for prose; T-SC-04 (16-20 landing, 14 app UI, 13 dense). Prose agrees (T-SC-04 already cites him). Product UI below 15 px is not covered by his advice, which is about reading text; keep 14/13 for UI chrome, but flag any long-form reading surface in an app below 15 px.
- **`ch` unit.** T-ME-01 recommends `max-width: 65ch`; Butterick advises skipping `ch` because it is the width of zero. Reconcile by keeping `ch` as a quick implementation and verifying characters per line by measurement; the existing T-ME-01 check (canvas-measured glyph width) is already the right test. Zero is typically wider than average lowercase text, so `65ch` tends to land above 65 characters (the book's research-paper example targets about 65).
- **Viewport units for scaling text.** Butterick suggests scaling point size and element width together with `vw`; T-FL-01/T-FL-02 forbid vw-only sizes (WCAG 1.4.4). His own site sets the root to `2.4vw` between 521 and 999 px, which is a vw-only root. [engine note] Follow T-FL-01 (rem plus vw in `clamp()`); use his idea only as: width and size scale together.
- **Modular scale.** Rejected by the author (see core note). T-SC-01's ratio seeds are acceptable only as a starting point.
- **Heading size.** The book wants +4-8 percent for in-document headings. Landing-page display headings measured in T-SC-03 (H1:body ≥ 2.5) are a different job (display type, not signposts); no conflict as long as the two roles are not mixed (article `h2` inside a marketing page uses the subtle rule, hero `h1` the display rule).
- **Uppercase and tracking.** Butterick 5-12 percent for caps; T-SC-07/T-LS-02 give +0.05 to +0.12em: same.
- **Negative tracking at display size.** He says only "remove letterspacing from lowercase at larger sizes" and gives no figure; the -0.02 to -0.05em values in T-LS-01 are measured, not his.
- **Hyphenation support.** The book says `hyphens: auto` is spotty (it was; the page predates wide support). [engine note, verify caniuse] `hyphens: auto` with `lang` is now broadly usable, so the rule stands for justified or narrow text.
- **Centred text.** T-ME-03 allows centring up to 3 lines / ~60 characters; Butterick allows only short phrases and titles. Compatible; prefer his stricter version for prose.
- **Tracking vs ligatures [engine note].** Non-zero `letter-spacing` disables optional ligatures in browsers; relevant for caps with 0.05-0.12em tracking (see font-choice note).
- **Opinion flags.** "Dark grey beats black on screen", "left-align on the web", "hollow bullets" are the author's taste.

## 6. Figures worth keeping

- /line-spacing.html: three paragraphs at 110, 135, 170 percent.
- /line-length.html: the alphabet test (2.31 alphabets in a line).
- /point-size.html: Sabon, Times New Roman, Arno at the same size but visibly different; the same text in two fonts with the size adjusted to match line breaks.
- /first-line-indents.html: three indent depths (too small, too large, right).
- /page-margins.html: document A (1 in margins, 12 pt, double) versus document B (2 in margins, 11 pt, 15 pt leading): B looks more like a book and holds as many words per page.
- /justified-text.html and /hyphenation.html: rivers without hyphens; hyphenated heading versus not.

## 7. Open questions and coverage

- The book never gives a figure for heading space above/below or an exact paragraph spacing in em beyond "50-100 percent"; ratios in checks marked "soft" are mine.
- Em-sizing, optional-hyphens and kerning pages give no web numbers beyond those above.
- "Word multiple 1.03-1.24 equals 120-145 percent" is a Microsoft Word quirk, not applicable to CSS (CSS is a straight multiple).
