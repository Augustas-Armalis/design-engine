---
source: web:https://practicaltypography.com/ (Matthew Butterick, Butterick's Practical Typography; pages summary-of-key-rules, typography-in-ten-minutes, introduction, why-does-typography-matter, what-is-good-typography, who-is-typography-for, where-do-the-rules-come-from, maxims-of-page-layout, typewriter-habits, color, websites, paragraph-and-character-styles, afterword; fetched 2026-10-08)
chapter: Practical Typography - core rules, philosophy, maxims, colour
pages: n/a (web source, about 155 pages crawled from the home-page table of contents)
topic_tags: [typography, butterick, principles, body-text, hierarchy, consistency, color, web-habits, typewriter-habits, restraint]
status: studied
---

# Practical Typography - core rules and principles

Raw text: `corpus/web/practical-typography/txt/*.txt` (private, gitignored). Everything below is written in my own words. Numbers are Butterick's, copied exactly. Sibling notes: `practical-typography-size-and-spacing.md`, `-font-choice.md`, `-punctuation-and-details.md`, `-layout-and-tables.md`.

**Unit translation [engine note].** The book is written for print and word processors first; the web is treated as the same craft. 1 pt = 1.333 CSS px (96 dpi), so print 10-12 pt is 13.3-16 px. Percent line spacing maps to unitless `line-height` (130% = 1.3), and "letterspacing 5-12%" maps to `letter-spacing` in em. Word-processor menu paths are skipped here; only the CSS equivalents the author names are kept.

## 1. Core ideas

1. **Body text decides the whole document.** There is more body text than anything else, so its look dominates the impression. Four choices drive it: point size, line spacing, line length, font. Fix those first, then worry about the rest.
2. **Typography is judged by utility, not prettiness.** Good typography reinforces the meaning of the text; a pleasant-looking treatment that weakens the message is a failure, an ugly one that delivers it is a success. Highway signs and a speed-limit sign with the number 75 dominant are his examples.
3. **The reader's attention is the scarce resource.** Readers are rationally looking for a reason to stop. Typography conserves attention by reducing the effort of reading mechanics. Butterick's "first law": given several documents, readers form judgements on typography when substance is otherwise equal.
4. **Write for the real reader, not the idealised one.** Real readers have short attention, low interest, can be persuaded by others, and do not care about your happiness. Simulate that reader.
5. **One standard.** There is no separate "academic", "legal" or "business" typography; hold your output to the standard of professionally published books, newspapers and magazines. Rules come from professional custom and the majority of typography authorities, with a few practical shortcuts.
6. **Most bad habits are leftovers from the typewriter** (two spaces, straight quotes, underlining, double spacing, 12 pt default, one-inch margins). They survived the mechanical limitation that caused them.
7. **Restraint beats decoration.** Emphasis tools (bold, italic, caps, colour, rules, centring) lose force when stacked. White space is the cheapest, subtlest tool.
8. **Consistency is the structure the reader sees.** Same thing looks same, different thing looks different; define formatting once, by role, and reuse.
9. **Imitate good work; eye is the final judge.** Grids, ratios and rules are scaffolding; making two samples and looking beats arguing.
10. **The web is held to the same craft.** The mid-90s web habits (tiny text, giant headings, system fonts, link walls, colour blocks) are over; the new danger is template homogeneity, "ugly swapped for boring".

## 2. Rules

### 2.1 Principles and process

- **RULE [PT-CR-01]** Decide how the body text looks before anything else: pick base size, line height, measure and typeface for `p` first, then derive headings, captions and components from them.
  **Why** Body text is the largest share of any page, so those four values set legibility and the first impression.
  **Applies to** all (strongest for content, docs, long-form, marketing body copy).
  **Check** the four computed values (`font-size`, `line-height`, characters per line, `font-family`) exist as tokens on `p` before heading tokens do; `visual` for process.
  **Source** practicaltypography.com/body-text.html; /maxims-of-page-layout.html; /typography-in-ten-minutes.html

- **RULE [PT-CR-02]** Judge each typographic choice by whether it makes the message easier to receive, not by how it looks in isolation; make the most important element of a text (a number, a warning, the product name) the visually dominant one.
  **Why** Typography is utilitarian; a treatment that buries the key fact fails even if elegant.
  **Applies to** all.
  **Check** `visual`: squint test, the element a first-time reader should see first is the highest-contrast/largest one.
  **Source** practicaltypography.com/what-is-good-typography.html

- **RULE [PT-CR-03]** Design for the actual reader: short attention, low prior interest, looking for an exit. Cut or demote anything that costs attention without helping the point (extra levels, ornaments, decorative type).
  **Why** Attention is finite and, once withdrawn, the reader is gone.
  **Applies to** all.
  **Check** `visual`; heuristic: count competing emphasis devices per screen (see PT-CR-09).
  **Source** practicaltypography.com/why-does-typography-matter.html; /who-is-typography-for.html

- **RULE [PT-CR-04]** Hold in-product text and documents to the same bar as published books and periodicals: no exemption for "just a UI", "just an internal doc" or "just a landing page".
  **Why** Current tools give writers the same typesetting capability as publishers; excuses are gone.
  **Applies to** all.
  **Check** `visual`; run the typewriter-habit audit (PT-CR-14).
  **Source** practicaltypography.com/where-do-the-rules-come-from.html

- **RULE [PT-CR-05]** Split every layout into foreground (the content the reader came for, usually body text) and background (nav, address blocks, footers, labels). Do not let background elements upstage foreground ones, and differentiate using only position, size, font and occasionally colour.
  **Why** A limited toolbox for distinction means spending it on the foreground.
  **Applies to** landing page | SaaS app UI | docs.
  **Check** `visual`; heuristic: footer/nav type is not larger or heavier than body.
  **Source** practicaltypography.com/maxims-of-page-layout.html; /letterhead.html

- **RULE [PT-CR-06]** Adjust by the smallest increment that is visibly different: half a point at a time for size, small steps for spacing and colour.
  **Why** The gap between "not enough" and "too much" is small; large jumps overshoot and add noise.
  **Applies to** all.
  **Check** `visual`; heuristic: adjacent text-size steps within a component differ by under about 25 percent unless it is a deliberate display jump.
  **Source** practicaltypography.com/maxims-of-page-layout.html; /point-size.html; /headings.html

- **RULE [PT-CR-07]** When a typographic choice cannot be settled by argument, render both options and compare them by eye; do not rely on a formula (golden ratio, modular scale, grid) as proof of quality.
  **Why** Numerical justification substitutes for visual judgement; the eye is the final judge.
  **Applies to** all.
  **Check** `visual`.
  **Source** practicaltypography.com/maxims-of-page-layout.html; /headings.html; /grids.html

- **RULE [PT-CR-08]** Be consistent: elements with the same role get the same treatment everywhere; elements that look different must differ in role. Relate each new element to something already on the page (alignment, size, spacing) rather than placing it freely.
  **Why** Typography silently tells the reader the structure; inconsistency reads as random.
  **Applies to** all.
  **Check** count distinct (font-size, weight, line-height) tuples per role (`h2`, `p`, `small`, buttons); more than 1 per role across the site is a fail; computed margins of same-role blocks equal.
  **Source** practicaltypography.com/maxims-of-page-layout.html

- **RULE [PT-CR-09]** Keep it simple: if the design asks for three colours and five fonts, reduce. Do not decorate the page edges with clutter, and do not add a logo or ornament to every page without need.
  **Why** Every added device dilutes the others; Butterick says emphasise everything and you emphasise nothing.
  **Applies to** all.
  **Check** distinct font families on a page ≤ 2-3 (see PT-FC-11), distinct text colours ≤ 3-4 plus link colour; `visual`.
  **Source** practicaltypography.com/maxims-of-page-layout.html; /color.html

- **RULE [PT-CR-10]** Imitate typography you admire: find it in books, signage and sites, identify the fonts (inspect `font-family` in CSS; colophons in books) and emulate the choices rather than inventing from scratch.
  **Why** Seeing why good examples work is faster than theory.
  **Applies to** all.
  **Check** `visual`; process rule.
  **Source** practicaltypography.com/maxims-of-page-layout.html; /identifying-fonts.html

- **RULE [PT-CR-11]** Work outward from the text, not inward from the page edges: size the text block first, and let margins and white space be what is left over. Do not fill space just because it exists.
  **Why** Mediocre layouts come from a perceived need to fill the container; empty margins are fine.
  **Applies to** landing page | docs | presentations.
  **Check** text column width is set by a `max-width` for the text, not by viewport edge; page padding/margin of the text column at desktop ≥ 5 percent of the viewport width; `visual`.
  **Source** practicaltypography.com/maxims-of-page-layout.html; /page-margins.html; /presentations.html

- **RULE [PT-CR-12]** Define formatting once, by role, and reuse it: name CSS classes/tokens for what an element is (`.block-quotation`, `.caption`) not for how it looks, and give inline-level and block-level formatting separate, inheritable definitions.
  **Why** Central definitions make global edits trivial and force consistency; a name tied to appearance goes stale.
  **Applies to** all.
  **Check** CSS class names do not encode values (`.bold-11pt`, `.blue-text`); each text role has one rule set; `visual` for the review.
  **Source** practicaltypography.com/paragraph-and-character-styles.html

### 2.2 Website habits and homogeneity

- **RULE [PT-CR-13]** Avoid the five mid-90s web habits: body text that is too small; headings that are enormous; reliance on a handful of system fonts (Arial, Georgia, Verdana); page edges crammed with navigation links; layouts built from large blocks of colour.
  **Why** Each began as a technology limitation that no longer exists.
  **Applies to** landing page | SaaS app UI | docs.
  **Check** computed body font-size on long-form prose ≥ 15 px (see PT-SZ-01); h1/body ratio not ~2.0x browser default for content pages (see PT-SZ-22 on display exceptions); font-family first entry not a generic system face; link count in header/footer edge regions ≤ 7-8 (opinion).
  **Source** practicaltypography.com/websites.html

- **RULE [PT-CR-14]** Run a "typewriter habit" audit on any text-bearing surface and fix every hit: straight quotes; two spaces between sentences; multiple hyphens for dashes; (TM)/(c) instead of ™/©; three periods for an ellipsis; non-curly apostrophes; ignoring accents; more than one word space in a row; tabs in place of tables; blank lines for vertical space; letter x/hyphen for math symbols; rules built from repeated characters; underlining; monospaced body; abused all caps; 12 pt default body; ignoring kerning and letterspacing; heavy centring; only single/double line spacing; margins fixed at one inch.
  **Why** They are the compact list of inherited errors; each has a mechanical fix.
  **Applies to** all.
  **Check** regexes over text nodes for `"`/`'` pairs, `\.\s\s`, `--`, `\(c\)|\(TM\)`, `\.\.\.`, `\d x \d`; computed `text-decoration: underline` on non-link text; `p` empty or `<br><br>` chains; `visual` for the rest.
  **Source** practicaltypography.com/typewriter-habits.html

- **RULE [PT-CR-15]** Do not let a template, theme or UI kit decide the typography: copy the idea from outside the web (books, posters, art, software, other designed objects), and avoid trend-by-template (video backgrounds, 960 grid, hamburger over full-bleed stock photo).
  **Why** Template systems smooth the technical work but spread the same choices everywhere ("ugly swapped for boring").
  **Applies to** landing page.
  **Check** `visual` (compare with reference set); links to existing detector T01/T04 in `knowledge/web/typography.md`.
  **Source** practicaltypography.com/websites.html

### 2.3 Colour and contrast

- **RULE [PT-CR-16]** Use colour with restraint: if everything is coloured, nothing is emphasised. In text, favour several shades of one colour over several contrasting hues.
  **Why** Light-dark contrast draws the eye more powerfully than hue; coloured body text at normal size is not noticed unless loud.
  **Applies to** all.
  **Check** distinct non-neutral text colours on a page ≤ 2 (link/accent); hue count in `color` declarations on text; `visual`.
  **Source** practicaltypography.com/color.html

- **RULE [PT-CR-17]** On screens, consider setting long-form body text in a dark grey rather than pure black (and pure white backgrounds are harsh when paired with pure black type). Keep contrast at WCAG AA or better; this is about reducing glare, not about low contrast.
  **Why** A screen emits light and has harsher contrast than paper, so softened black is more comfortable; one reason e-readers let readers lower contrast.
  **Applies to** docs | landing page | long-form (opinion: stated as a consideration, "can be more comfortable").
  **Check** text colour luminance contrast against background ≥ 4.5:1 (engine floor) and not `#000` on `#fff` for article body (soft rule); `visual`.
  **Source** practicaltypography.com/color.html; /presentations.html

- **RULE [PT-CR-18]** Do not place coloured type on a coloured background unless it is clearly justified; the author says he usually wishes the designer had not. Keep clickability colour for links and avoid colouring non-clickable text the same way.
  **Why** Coloured-on-coloured loses legibility; colour is the idiomatic web signal for "clickable", so reusing it misleads.
  **Applies to** all.
  **Check** contrast of every text/background pair ≥ 4.5:1; non-link elements do not use the computed link colour.
  **Source** practicaltypography.com/color.html

- **RULE [PT-CR-19]** Colour intensity depends on size and weight as well as hue: a thin or small font can carry a more intense colour than a heavy or large one, so reduce saturation as type gets bigger or bolder.
  **Why** Larger/heavier glyphs cover more area, so the same colour reads louder.
  **Applies to** all.
  **Check** `visual`; heuristic: saturated text colours mostly at font-size < 18 px or weight < 600.
  **Source** practicaltypography.com/color.html

## 3. Numbers & scales

| Item | Value | Source page |
|---|---|---|
| The four body-text choices | point size, line spacing, line length, font | body-text, summary-of-key-rules |
| Web body size | 15-25 px (print 10-12 pt) | summary-of-key-rules, point-size |
| Line spacing | 120-145 percent of point size | summary-of-key-rules, line-spacing |
| Line length | 45-90 characters including spaces (or 2-3 lowercase alphabets) | summary-of-key-rules, line-length |
| Letterspacing for caps and small caps | 5-12 percent (0.05-0.12 em) | summary-of-key-rules, letterspacing |
| First-line indent | 1-4 times point size, or 4-10 pt between paragraphs, never both | summary-of-key-rules |
| Exclamation points | one in a document longer than three pages | summary-of-key-rules |
| Typefaces per document | second tolerable, third rare, four or more almost never | mixing-fonts |
| Heading levels | three at most, two better | headings |
| 50 percent grey | start point for text on a black slide | presentations |
| Reading limit of the eye | 1-2 arcminutes of detail (about 143 ppi at 24 in, 286 ppi at 12 in) | screen-reading-considerations |

## 4. Dos and Don'ts

| Do | Don't | Source |
|---|---|---|
| Set body text first and keep one base size | Start by choosing a hero or decoration | body-text |
| Dominant element = the thing the reader must see (the "75" on a speed-limit sign) | Same-size treatment of number and caption | what-is-good-typography |
| Give a block quotation or note a different role style | Hand-format each instance | paragraph-and-character-styles |
| Show tiny increments of emphasis | Jump from 12 pt to 14-15 pt for a heading | point-size, headings |
| Dark/soft text on a light page; softened white on a black slide | Pure black on pure white for slides; pure white on pure black | color, presentations |
| One or two shades of the same hue | Several contrasting colours on text | color |
| Use real design inspiration from outside the web | Another hamburger button over a stock photo | websites |

## 5. Exceptions & judgement calls

- **Opinion vs hard rule.** The author flags many items as taste (ligatures, small-cap capitals, oldstyle figures, bullets, justify vs left-align). Hard rules are the typewriter-habit fixes (curly quotes, one space, real dashes, ellipsis, ™/©) and the four body-text ranges.
- **Print bias.** He explicitly differs by medium on colour and size; his web advice is lighter on numbers.
- **Conflicts with `knowledge/web/typography.md` (T-*) and `knowledge/ui-pedia/12-typography.md`:**
  - *Modular scales.* T-SC-01 seeds a scale from a ratio (1.2 to 1.333) and then adjusts by eye; Butterick rejects modular scales for heading sizing outright ("never used one, never will") and warns that ratios are numerical alibis. The two agree on "adjust by eye"; they disagree on whether to start from a ratio. [engine note] Keep ratio-seeded scales as a convenience only if the hand-adjusted result passes the visual check; never accept a ratio as the justification.
  - *Dark-grey body text.* Butterick suggests dark grey rather than black on screen; T-SC-06 asks for three text tones, all ≥ 4.5:1. Compatible: soften only to the AA floor.
  - *Business context.* ui-pedia p.271 sets line-height 1.5 as the starting point; see the line-spacing conflict in `practical-typography-size-and-spacing.md`.
  - *Handwritten/script faces.* Butterick bans novelty/script fonts for professional documents; T-PA-06 allows a script as a single large accent. See font-choice note.
- **Relevance gap.** Many pages are Word/Pages click-paths, printer and paper advice, PDF export and font-licensing; they carry no web rule. Listed in section 7.

## 6. Figures worth keeping

- /what-is-good-typography.html: three versions of a speed-limit sign, only the one where "75" dominates and "speed limit" is secondary works.
- /why-does-typography-matter.html: two-second resume comparison.
- /typewriter-habits.html: consolidated checklist (above).
- /presentations.html: before/after slide (giant white rectangle vs calm black slide with pale grey type).

## 7. Open questions and coverage

- Pages with no rule content for the web (read, nothing extractable): about-matthew-butterick, acknowledgments, how-to-use, how-to-pay-for-this-book, why-you-should-pay, legal, contact, mb-fonts, mb-lectures-and-articles, bibliography, commentary (billionaires-typewriter, economics-year-one, why-racket-why-lisp, effluents-influence-affluence, typographic-humor, why-theres-no-e-book-or-pdf), the-copyright-status-of-fonts, how-to-work-with-a-designer, how-this-book-was-made, printers-and-paper, how-to-make-a-pdf, how-to-embed-fonts-in-a-word-document, concourse-index, common-accented-characters, afterword (rhetoric; point: typography is advocacy for readers), why-typography-matters, what-is-typography, type-composition, text-formatting, page-layout, font-recommendations, appendix (chapter heads).
- One link on the home page points to an off-site URL (matthewbutterick.com/extinction-level-capitalism.html) and was not fetched; it is not part of the book.
- "Typewriter habits" check list uses counts that are not in the book; thresholds marked "(opinion)" are mine.
