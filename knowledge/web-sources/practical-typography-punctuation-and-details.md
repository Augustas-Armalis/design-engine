---
source: web:https://practicaltypography.com/ (Matthew Butterick; chapter "Type composition": straight-and-curly-quotes, apostrophes, foot-and-inch-marks, one-space-between-sentences, question-marks-and-exclamation-points, emoticons-and-emoji, semicolons-and-colons, paragraph-and-section-marks, parentheses-brackets-and-braces, hyphens-and-dashes, ampersands, signature-lines, trademark-and-copyright-symbols, ellipses, accented-characters, white-space-characters, word-spaces, nonbreaking-spaces, tabs-and-tab-stops, hard-line-breaks, carriage-returns, hard-page-breaks, optional-hyphens, math-symbols, web-and-email-addresses, emails; fetched 2026-10-08)
chapter: Practical Typography - punctuation, symbols and white-space characters
pages: n/a (web source)
topic_tags: [typography, butterick, punctuation, quotes, apostrophes, dashes, ellipsis, ampersand, nbsp, white-space, math-symbols, trademark, accents, urls, soft-hyphen]
status: studied
---

# Practical Typography - punctuation, symbols and white-space characters

Raw text: `corpus/web/practical-typography/txt/`. Wording is mine. Keyboard shortcuts for Windows/Mac/Word/Pages are skipped; HTML entities and CSS equivalents are kept. Character checks below can be run as regexes over text nodes (rendered text, excluding `code`, `pre`, `kbd`, `samp`, `script`).

## 1. Core ideas

1. Good typography starts with typing the right characters. Most errors here are leftovers from the typewriter, whose small keyboard forced approximations.
2. Each character is a tool: curly quotes for quotation, a real apostrophe, real dashes of two sizes, a true ellipsis, ™ © ® symbols, × − ÷ for arithmetic.
3. White-space characters are different tools: word space, nonbreaking space, tab, hard line break, paragraph break, page break. In HTML, any run of ordinary white space collapses to one space, except non-breaking spaces.
4. Punctuation should neither crowd nor strand: use non-breaking spaces to glue marks and abbreviations to their references.
5. Overuse is a defect: ampersands, exclamation points, emoji, em dashes with extra spaces and hyphens are all moderated.

## 2. Rules

### 2.1 Quotation marks and apostrophes

- **RULE [PT-PD-01]** Use curly (typographic) quotation marks, never straight ones, in all rendered text: ‘ ’ “ ” (`&lsquo; &rsquo; &ldquo; &rdquo;`). Ship pages as UTF-8 so the characters survive. Exception: straight quotes are acceptable in email and are required in source code.
  **Why** Curly quotes are more legible and match the other characters; straight quotes are a typewriter habit and "one of the most grievous and inept" errors given decades of smart-quote automation.
  **Applies to** all text content, UI strings, marketing copy.
  **Check** regex on visible text nodes: `["']` adjacent to word characters outside `code/pre/kbd` ⇒ flag (T19).
  **Source** practicaltypography.com/straight-and-curly-quotes.html

- **RULE [PT-PD-02]** Convert quotes automatically in content pipelines (smart-quote plugins, a vetted JS converter), do not hand-roll a straight-to-curly converter, and never run conversion over code samples or backticks. Pasted or imported plain text needs the same conversion. Fix quotes first, then leading apostrophes.
  **Why** Edge cases (leading apostrophes, nested quotes, other languages) are easy to get wrong.
  **Applies to** CMS | markdown | docs pipelines.
  **Check** tests with `'70s`, `rock 'n' roll`, `"nested 'quote'"`, and a code block that must remain untouched.
  **Source** practicaltypography.com/straight-and-curly-quotes.html

- **RULE [PT-PD-03]** The HTML `<q>` element inserts locale-appropriate curly quotes only when an ancestor has a `lang` attribute; it takes the marks out of the text stream and does not fix apostrophes, so treat it as limited help.
  **Why** Quote glyphs vary by language (spacing and shapes).
  **Applies to** all (HTML).
  **Check** `<q>` ancestors have `lang`; `html[lang]` is set.
  **Source** practicaltypography.com/straight-and-curly-quotes.html

- **RULE [PT-PD-04]** Apostrophes are ’ (the closing single quote, `&rsquo;`) and point downward everywhere, including at the start of a word (’70s, rock ’n’ roll, Patent ’211). Smart-quote engines usually get a leading apostrophe wrong (they emit an opening quote): fix by hand.
  **Why** The mark stands for omitted letters, not the opening of a quotation.
  **Applies to** all.
  **Check** regex: `‘(\d{2}s|n’|em\b)` (opening quote before digits or ’n’) ⇒ flag.
  **Source** practicaltypography.com/apostrophes.html

- **RULE [PT-PD-05]** Foot and inch marks (and arcminutes/seconds) are straight marks (`'` and `"`), or true primes ′ ″ if the font has them; do not curl them. In quoted material, take care so the straight mark is not mistaken for a closing quote.
  **Why** They are not quotation marks. Straight is the reliable choice because pro fonts often lack the prime glyphs.
  **Applies to** copy with measurements, coordinates.
  **Check** regex for `\d[’”]` (curly after a digit in a measurement) ⇒ review.
  **Source** practicaltypography.com/foot-and-inch-marks.html

- **RULE [PT-PD-06]** Never use quotation marks for emphasis; use bold or italic.
  **Why** Quotes signal quotation or irony.
  **Applies to** copy.
  **Check** `visual` / copy review.
  **Source** practicaltypography.com/straight-and-curly-quotes.html

- **RULE [PT-PD-07]** Hawaiian okina is an opening single quote (‘), not an apostrophe (Hawai‘i, O‘ahu), or omit it (Hawaii); smart-quote tools produce the wrong mark mid-word. Likewise handle other languages' quote conventions explicitly.
  **Why** The okina is a letter pointing upward.
  **Applies to** localised content.
  **Check** `Hawai’i`, `O’ahu` regex ⇒ flag.
  **Source** practicaltypography.com/apostrophes.html

### 2.2 Spaces, breaks and white space

- **RULE [PT-PD-08]** Put exactly one space after sentence-ending punctuation (and after any punctuation); exception: two are tolerable only in a monospaced font and still unnecessary.
  **Why** One space is the settled professional custom; double spaces open "rivers" of white space; a period is mostly white space already.
  **Applies to** all text. (In HTML, browsers collapse double spaces, so check source text and markdown output.)
  **Check** regex over source text nodes `[.!?:;]\s{2,}\S` (T19).
  **Source** practicaltypography.com/one-space-between-sentences.html; /word-spaces.html

- **RULE [PT-PD-09]** Use one word space at a time to separate words; never use runs of spaces, tabs or repeated `&nbsp;` to align or indent. Use margins, padding, `text-indent`, flex/grid or table layout.
  **Why** Spacing hacks break when text reflows; HTML collapses spaces anyway.
  **Applies to** all.
  **Check** regex ` {2,}`; `<p>&nbsp;</p>`; leading `&nbsp;` indents.
  **Source** practicaltypography.com/word-spaces.html; /white-space-characters.html; /nonbreaking-spaces.html

- **RULE [PT-PD-10]** Glue references to their labels with a non-breaking space (`&nbsp;`, U+00A0): after § and ¶ and before the number; after abbreviations such as Ex., Fig.; after honorifics and titles (Sgt., Ms.); between © and the year; between a number and a unit or foot/inch pair (6' 10"); and on the open side of an ellipsis when text sits on only one side. Prefer writing `&nbsp;` in source so it is visible.
  **Why** A line break between the pair separates the label from its value and confuses the reader.
  **Applies to** all copy with references, units, citations.
  **Check** regex: `(§|¶|©|Fig\.|Ex\.|Sgt\.|Ms\.|Mr\.|Dr\.)\s\S` where the whitespace is a normal space ⇒ flag; units `\d\s(px|kg|km|ms|GB|MB)` with normal space (soft, mine).
  **Source** practicaltypography.com/nonbreaking-spaces.html; /paragraph-and-section-marks.html; /trademark-and-copyright-symbols.html; /foot-and-inch-marks.html

- **RULE [PT-PD-11]** Use a thin space (`&thinsp;`, about half a word space) only where a normal space is visibly too large, e.g. between initials (W. A. Dwiggins).
  **Why** A subtle optical fix; do not stretch the idea to sentence spacing.
  **Applies to** copy with initials.
  **Check** `visual`.
  **Source** practicaltypography.com/word-spaces.html

- **RULE [PT-PD-12]** Use a hard line break (`<br>`) only to break lines inside one paragraph (address lines, signature blocks, a heading you want to wrap at a chosen place, centred short text); never to create a new paragraph and never as vertical spacing. Where possible, prefer `text-wrap: balance` or `max-width` for heading wraps [engine note].
  **Why** It is "same paragraph, different line"; stacked breaks are brittle.
  **Applies to** all.
  **Check** no `<br><br>`; `<br>` count in prose paragraphs ≤ 1 per ~5 lines (soft, mine).
  **Source** practicaltypography.com/hard-line-breaks.html; /carriage-returns.html

- **RULE [PT-PD-13]** Use real paragraph elements for paragraphs (one block per paragraph) and one structural break at a time; do not insert empty paragraphs for spacing.
  **Why** Extra returns create unpredictable gaps as content reflows.
  **Applies to** all.
  **Check** `p:empty` or `p` containing only `&nbsp;`/`<br>` ⇒ flag.
  **Source** practicaltypography.com/carriage-returns.html

- **RULE [PT-PD-14]** Do not use tab characters or runs of spaces for tabular layout; use a table for real tabular data and flex or grid for aligned collections of elements (HTML has no tab stops). A tab leader (dotted fill) must be a style, not typed dots.
  **Why** Tabs are a typewriter column mechanism; tables are the maintainable tool.
  **Applies to** all.
  **Check** `\t` in text nodes; pre-formatted columns of data outside `pre/code`.
  **Source** practicaltypography.com/tabs-and-tab-stops.html

- **RULE [PT-PD-15]** Reveal and inspect invisible characters when debugging layout; when taking over foreign content, display white-space characters first to find hidden problems.
  **Why** Invisible characters cause most formatting mysteries.
  **Applies to** content QA.
  **Check** n/a (process).
  **Source** practicaltypography.com/white-space-characters.html

- **RULE [PT-PD-16]** Do not use hard page breaks via blank content; use style-level page-break rules for classes of headings. (CSS: only meaningful for print; the author calls HTML page-break tags "neither common nor useful".)
  **Why** Blank-line page breaks shift when content changes.
  **Applies to** print CSS | PDF export.
  **Check** `break-before: page` on section classes in print CSS rather than empty blocks.
  **Source** practicaltypography.com/hard-page-breaks.html

### 2.3 Hyphens, dashes, ellipses

- **RULE [PT-PD-17]** Use the three marks for different jobs: hyphen (-) for line-end hyphenation and compound words/phrasal adjectives (five-dollar bills, high-school grades; not after -ly adverbs; usually not after prefixes such as nonprofit); en dash (–, `&ndash;`) for ranges (1880–1912, pages 330–39) and for connections or contrasts between pairs (conservative–liberal); em dash (—, `&mdash;`) for a break in the sentence stronger than a comma and weaker than a colon or parentheses.
  **Why** Each has a defined meaning and width; the em dash is about the width of a capital H, the en dash about half that.
  **Applies to** all copy.
  **Check** regex: `\d-\d` between numerals in ranges (should be en dash); ` - ` between words; `--`/`---`; `to`/`from` pairs not combined with en dash.
  **Source** practicaltypography.com/hyphens-and-dashes.html

- **RULE [PT-PD-18]** If a range is introduced with "from", pair it with "to" instead of an en dash (from 1880 to 1912); do not use a slash where an en dash is correct; use a hyphen (not en dash) for a compound personal name (Mr. and Mrs. Sarbanes-Oxley).
  **Why** Standard usage; the en dash for joint authors of a law is different from a married name.
  **Applies to** copy.
  **Check** regex `from \d{3,4}[–-]\d{3,4}`.
  **Source** practicaltypography.com/hyphens-and-dashes.html

- **RULE [PT-PD-19]** Set dashes flush against the neighbouring words; if em dashes look crushed (especially on screen) it is acceptable to add word spaces on both sides. Do not adopt spaced en dashes (Bringhurst's Canadian practice) in US text.
  **Why** US convention; font spacing differs.
  **Applies to** copy.
  **Check** consistent use of one dash style across a site; `visual`.
  **Source** practicaltypography.com/hyphens-and-dashes.html

- **RULE [PT-PD-20]** Never approximate dashes with two or three hyphens.
  **Why** Typewriter habit.
  **Applies to** all.
  **Check** regex `(?<!-)--(?!-)|---` outside code.
  **Source** practicaltypography.com/hyphens-and-dashes.html

- **RULE [PT-PD-21]** Use the real ellipsis character … (`&hellip;`), never three periods and never periods with spaces; if spaces around it are unwanted, remove them, and put a non-breaking space on the open side when text is on one side only. If a boss insists on spaced periods, use non-breaking spaces between the dots. In interrupted speech prefer an em dash.
  **Why** Three periods are too tight; spaced periods too loose and can break across lines.
  **Applies to** all copy and UI strings (loading states "Loading…").
  **Check** regex `\.\.\.` and `\. \. \.` ⇒ flag.
  **Source** practicaltypography.com/ellipses.html

### 2.4 Symbols and special characters

- **RULE [PT-PD-22]** Use the symbol characters ™ ® © and not alphabetic stand-ins ((TM), (R), (c)). ™/® are superscript-like marks set directly after the word with no space; © takes a non-breaking space before the year. Use either the word "Copyright" or ©, not both. Beware auto-replace turning "Section 12(c)" into 12©.
  **Why** Proper symbols are the right size and height; auto-replacement corrupts legal references.
  **Applies to** footers | legal copy.
  **Check** regex `\(c\)|\(TM\)|\(R\)` outside code; `Copyright ©` redundancy; `©\s?\d{4}` with normal space.
  **Source** practicaltypography.com/trademark-and-copyright-symbols.html

- **RULE [PT-PD-23]** Use ampersands sparingly: correct when part of a proper name (Fromage & Cracotte LLP); otherwise treat as a contraction and avoid in formal text.
  **Why** Typographic shorthand for "and".
  **Applies to** copy.
  **Check** `&` in running prose (outside brand names) ⇒ review (opinion).
  **Source** practicaltypography.com/ampersands.html

- **RULE [PT-PD-24]** Use real math symbols: × (`&times;`) for multiplication and dimensions (8.5″ × 14″), − (`&minus;`) for minus (an en dash is acceptable), ÷ (`&divide;`), +, =. Do not use the letter x or a hyphen.
  **Why** Alphabetic stand-ins are typewriter habits.
  **Applies to** specs, pricing, dimension copy.
  **Check** regex `\d\s?x\s?\d` (T19), `\d\s-\s\d`.
  **Source** practicaltypography.com/math-symbols.html

- **RULE [PT-PD-25]** Follow § and ¶ with a non-breaking space; spell out Section/Paragraph at the start of a sentence; double the mark (§§, ¶¶) for multiple references.
  **Why** Keeps symbol and number together.
  **Applies to** legal and academic copy.
  **Check** regex `[§¶]\s` with normal space; sentence-initial `§`.
  **Source** practicaltypography.com/paragraph-and-section-marks.html

- **RULE [PT-PD-26]** Spell names with their accents (Dürer, François Truffaut, Plácido Domingo) always; for loanwords follow a dictionary (naive, melee, coupe have dropped accents; cause célèbre, piña colada keep them). Be careful with ß: the book advises avoiding Eszett outside German.
  **Why** A name without its accents is misspelled.
  **Applies to** copy | localisation.
  **Check** spell-check dictionary; `visual`.
  **Source** practicaltypography.com/accented-characters.html

- **RULE [PT-PD-27]** Do not give parentheses, brackets or braces the emphasis style of the text they enclose (keep them roman) unless an italic glyph would collide with a roman parenthesis; kerning does not help between different styles.
  **Why** They are punctuation, not content.
  **Applies to** docs.
  **Check** `em` and `strong` starting or ending with `(`, `[`, `{`.
  **Source** practicaltypography.com/parentheses-brackets-and-braces.html

### 2.5 Tone punctuation

- **RULE [PT-PD-28]** Budget exclamation points: one in a document longer than three pages; never two in a row. Use question marks more (turning a topic sentence into a question is often simpler).
  **Why** Overused exclamation points lose force; questions are underused.
  **Applies to** copy | UI strings | marketing.
  **Check** count `!` per page text ≤ 1 per ~3 printed pages (about 1 per 1,500 words; soft, mine); `!!`.
  **Source** practicaltypography.com/question-marks-and-exclamation-points.html

- **RULE [PT-PD-29]** Use emoticons/emoji only in casual contexts (email, texts); not in formal or professional documents (resume, legal); do not punctuate every sentence with them; emoji render differently by platform, so do not rely on nuance. Orient sideways emoticons for the writing system (:-) in English).
  **Why** Casual shorthand; platform-dependent appearance.
  **Applies to** copy | UI tone.
  **Check** emoji codepoints in headings/legal text ⇒ review; `visual`.
  **Source** practicaltypography.com/emoticons-and-emoji.html

- **RULE [PT-PD-30]** Use semicolons and colons correctly: a semicolon joins two independent sentences or separates list items that contain commas; do not use one before a conjunction or to attach a subordinate clause; a colon links an introduction to its completion.
  **Why** Frequent mistaking of the two.
  **Applies to** copy.
  **Check** copy review.
  **Source** practicaltypography.com/semicolons-and-colons.html

### 2.6 Hyphenation helpers and addresses

- **RULE [PT-PD-31]** Insert a soft hyphen (`&shy;`, U+00AD) in words a hyphenation dictionary mishandles (jargon, trade names, odd proper names, e.g. True&shy;Type) so they hyphenate correctly; it is invisible until needed and works only where automatic hyphenation or line fitting uses it. Soft hyphens are better supported than CSS `hyphens` in some engines, which also allows server-side hyphenation.
  **Why** Dictionary hyphenation fails on unusual words.
  **Applies to** headings with brand names | narrow columns | justified text.
  **Check** brand names in narrow columns do not break mid-syllable (`visual`); copy-paste of text with `&shy;` removed from search indexes.
  **Source** practicaltypography.com/optional-hyphens.html; /hyphenation.html

- **RULE [PT-PD-32]** Do not hyphenate web addresses or email addresses; hyphens inside them are mistaken for part of the address. Where they must wrap (print), set break points yourself; on the web hide them behind link text and do not show long URLs. Where a URL is shown, use `overflow-wrap: anywhere` or `word-break` [engine note] rather than hyphenation.
  **Why** One unbroken string; hyphens alter meaning.
  **Applies to** all.
  **Check** `a` and `.url` elements have `hyphens: none`; long strings do not overflow the container.
  **Source** practicaltypography.com/web-and-email-addresses.html

- **RULE [PT-PD-33]** In email, treat typography as limited: use common system fonts and no spacing tricks that depend on a font, or treat email as a typography-free zone; send text (not an image) for contact details so they can be copied.
  **Why** Fonts do not travel with email; client rendering is inconsistent.
  **Applies to** transactional email.
  **Check** email HTML uses web-safe stack with fallbacks; contact info is text.
  **Source** practicaltypography.com/emails.html

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Spaces after a sentence | 1 | one-space-between-sentences |
| Thin space | about half a word space | word-spaces |
| Em dash width | roughly a capital H (digital fonts run narrower than the em) | hyphens-and-dashes |
| En dash width | about half the em dash | hyphens-and-dashes |
| Exclamation budget | 1 per document longer than 3 pages | question-marks-and-exclamation-points |
| HTML entities | `&lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &hellip; &trade; &reg; &copy; &para; &sect; &times; &divide; &minus; &nbsp; &thinsp; &shy; &prime; &Prime;` | various |
| Character | Unicode | HTML |
|---|---|---|
| Opening single / closing single | U+2018 / U+2019 | `&lsquo;` `&rsquo;` |
| Opening double / closing double | U+201C / U+201D | `&ldquo;` `&rdquo;` |
| En dash / em dash | U+2013 / U+2014 | `&ndash;` `&mdash;` |
| Ellipsis | U+2026 | `&hellip;` |
| Minus / times / divide | U+2212 / U+00D7 / U+00F7 | `&minus;` `&times;` `&divide;` |
| Soft hyphen / nbsp / thin space | U+00AD / U+00A0 / U+2009 | `&shy;` `&nbsp;` `&thinsp;` |

(The Unicode code points are standard facts supplied by me [engine note]; the book gives Windows alt-codes and HTML entities.)

## 4. Dos and Don'ts

| Right | Wrong | Source |
|---|---|---|
| “That’s a ‘magic’ shoe.” | "That's a 'magic' shoe." | straight-and-curly-quotes |
| In the ’70s, rock ’n’ roll | In the ‘70s, rock ‘n’ roll | apostrophes |
| from a … to z | from a ... to z; from a . . . to z | ellipses |
| 12 × 34 − 56 = 352 | 12 x 34 - 56 = 352 | math-symbols |
| 8.5″ × 14″ | 8.5″ x 14″ | math-symbols |
| © 2026 MegaCorp™ | (c) 2026 MegaCorp (TM) | trademark-and-copyright-symbols |
| § 1782 (non-breaking space after §) | § at end of line, 1782 on next | paragraph-and-section-marks |
| “She’s 6' 10".” (straight marks inside curly quotes) | “She’s 6’ 10”.” | foot-and-inch-marks |
| Was Munchausen syndrome diagnosed before the 1960s? | We now turn our attention to the issue of whether … | question-marks-and-exclamation-points |
| “Yes, that’s true, but—” (interrupted speech) | “Yes, that’s true, but …” | ellipses |

## 5. Exceptions & judgement calls

- **Overlap with `knowledge/web/typography.md`.** T-WR-04 and detector T19 already require curly quotes, en/em dashes, true ellipsis, × and non-breaking spaces; this note confirms them from the primary source and adds: apostrophe direction (`’70s`), the straight-mark exception for feet/inches and code, the non-breaking-space inventory (§, ¶, ©, Fig., Ex., honorifics, units, 6' 10"), `<q>` + `lang`, soft hyphens, URL no-hyphenation, exclamation budget, emoji limits, `&thinsp;` for initials.
- **Exclamation budget vs product voice.** The one-per-three-pages rule is for documents; marketing and UI microcopy can break it, but multiple exclamation marks in one block still reads as shouting (opinion).
- **Em-dash spacing.** He permits spaces to cure crushed dashes on screen; consistency across the site matters more than which choice.
- **Straight quotes in email.** Acceptable; do not extend the allowance to web pages.
- **Minus.** An en dash is acceptable as a minus; the typographically exact U+2212 `&minus;` is still best for UI numbers.
- **Typed ligatures, tabs and signature lines** are print/word-processor topics; only the "don't hand-insert ligatures" and "use tables not tabs" ideas survive.
- **Language scope.** Rules reflect US English; other languages have different quote glyphs and spacing, as the book notes.

## 6. Figures worth keeping

- /straight-and-curly-quotes.html: the entity/shortcut table and the wrong/right shoe example.
- /apostrophes.html: ’70s and rock ’n’ roll.
- /nonbreaking-spaces.html and /paragraph-and-section-marks.html: § broken from its number versus glued.
- /ellipses.html: broken ". . ." across a line break.
- /math-symbols.html: 8.5″ × 14″.

## 7. Open questions and coverage

- Pages with only Word/Pages instructions and no web rule (read): signature-lines (underscore run, not an HTML technique), hard-page-breaks (print), carriage-returns, tabs-and-tab-stops, white-space-characters (HTML collapsing recorded), word-spaces, optional-hyphens (soft hyphen recorded).
- The book never states whether to use `&nbsp;` or `white-space: nowrap` for units; the second is an [engine note] alternative.
- Character count thresholds for `<br>` and exclamation per word count are mine.
