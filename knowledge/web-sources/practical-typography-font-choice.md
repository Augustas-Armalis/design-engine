---
source: web:https://practicaltypography.com/ (Matthew Butterick; pages font-recommendations, font-basics, system-fonts, free-fonts, charter, bad-fonts, goofy-fonts, monospaced-fonts, mixing-fonts, bold-or-italic, underlining, all-caps, small-caps, ligatures, alternate-figures, ordinals, opentype-features, the *-alternatives pages, equity/valkyrie/century-supra/concourse/heliotrope/triplicate/hermes-maia/advocate, mb-fonts, screen-reading-considerations; fetched 2026-10-08)
chapter: Practical Typography - font choice, emphasis styling, OpenType details
pages: n/a (web source)
topic_tags: [typography, butterick, font-choice, system-fonts, free-fonts, pairing, mixing-fonts, bold-italic, all-caps, small-caps, ligatures, numerals, tabular-figures, opentype, underline]
status: studied
---

# Practical Typography - font choice, emphasis, OpenType details

Raw text: `corpus/web/practical-typography/txt/`. Wording is mine. The author sells fonts (MB Type: Equity, Valkyrie, Century Supra, Concourse, Heliotrope, Hermes Maia, Triplicate, Advocate) and says so; his recommendations of own fonts are flagged (opinion/commercial) and not turned into rules. Prices he quotes ($20-50 per style, under $200 per family) are omitted as not relevant.

## 1. Core ideas

1. The fastest, most visible upgrade to typography is a better font than the one the system or template supplies.
2. A default is not a decision. Times New Roman, Arial and (for Adobe users) Minion mark the absence of a choice. Fame and ubiquity are not quality.
3. System fonts were designed for 1990s screens or are overexposed. High-resolution screens have removed most of the special benefit of "screen fonts" (Georgia, Verdana, Calibri, Cambria).
4. A few free fonts are genuinely good (Charter, Source Serif, Source Code, IBM Plex, Cooper Hewitt, Fira Mono); the vast majority are poor.
5. Novelty, script, handwriting and monospaced fonts are wrong for body text; monospace is fine for code.
6. A second typeface is usually tolerable, a third rarely, a fourth almost never. Mixing works best when each font has a stable role, and lower contrast between faces often works better than high contrast.
7. Bold and italic are for emphasis and are mutually exclusive; both lose force with overuse. Underlining is a typewriter workaround.
8. All caps and small caps need letterspacing; fake small caps are a tell; ligatures are mandatory only where letters collide; figures come in four kinds (lining/oldstyle x proportional/tabular) and should match context.
9. OpenType features require both font and software support. All desktop browsers support them; mobile was spotty at the time of writing.
10. Where a page sits on the "fonts as software" scale: web fonts need a licence for the use.

## 2. Rules

### 2.1 Choosing fonts

- **RULE [PT-FC-01]** Choose a deliberately selected, high-quality text face for the product rather than whatever the platform, template or tool defaults to; budget for or source a properly made family if body text matters.
  **Why** A professional font transfers a designer's skill into every page and is the quickest visible quality gain.
  **Applies to** landing page | docs | long-form. (SaaS UI may use platform fonts for chrome; see section 5.)
  **Check** computed first `font-family` of `p`/`h1` not in the default list (Times New Roman, Arial, Calibri, Cambria, Verdana, Tahoma, Trebuchet, Comic Sans, Minion, plus framework defaults per T01); `visual`.
  **Source** practicaltypography.com/font-recommendations.html; /typography-in-ten-minutes.html

- **RULE [PT-FC-02]** Never use Times New Roman or Arial for brand/product typography, and treat Minion, Calibri, Cambria and other bundled defaults as non-choices to replace. Arial is the sans of last resort.
  **Why** They are chosen because they are present, not because they fit; Arial is a clone of Helvetica without its consistency and is permanently associated with indifference.
  **Applies to** all.
  **Check** computed `font-family` stack: first family is not one of {Times New Roman, Arial, Calibri, Cambria, Minion, Comic Sans MS, Papyrus}; a stack that falls back to them is fine only as fallback.
  **Source** practicaltypography.com/times-new-roman-alternatives.html; /helvetica-and-arial-alternatives.html; /minion-alternatives.html; /system-fonts.html

- **RULE [PT-FC-03]** If you must use system fonts, pick from the "generally tolerable" tier; use "OK in limited doses" sparingly; avoid the "questionable" tier; never use the "fatal to credibility" tier. Fonts marked plausible for body text: Athelas, Avenir, Bell MT, Book Antiqua, Californian FB, Calisto MT, Century Schoolbook, Charter, Franklin Gothic, Garamond, Gill Sans (and MT), Goudy Old Style, Helvetica (and Neue), Hoefler Text, Iowan Old Style, Optima, Palatino, Seravek, Sitka.
  **Why** The ranking blends practical and aesthetic considerations; these are the system faces with usable design.
  **Applies to** docs | email | drafts | web fallbacks.
  **Check** compare the computed font-family string against the tier lists in section 3; flag any F-tier or C-tier body font.
  **Source** practicaltypography.com/system-fonts.html

- **RULE [PT-FC-04]** Do not pick a font because it was "optimised for the screen" in the 1990s (Georgia, Verdana, Calibri, Cambria, Tahoma, Trebuchet): on high-resolution displays the legibility advantage is gone, and they look clunky in print.
  **Why** Their design details were sanded off for coarse pixel grids; today's screens exceed what the eye can resolve at normal reading distances.
  **Applies to** all.
  **Check** `font-family` first entry not in that list when device-pixel-ratio ≥ 2 targets.
  **Source** practicaltypography.com/screen-reading-considerations.html; /system-fonts.html; /georgia-alternatives.html

- **RULE [PT-FC-05]** When an open or free licence is required, use the short list of good free families: Charter, Source Serif (with Source Code for mono), IBM Plex (sans, serif, mono), Cooper Hewitt (sans), Fira Mono; do not browse the long tail of free fonts for quality.
  **Why** Most free fonts are poor in design and craft; the named ones were funded by organisations that value design (Adobe, Smithsonian, IBM) or are historic quality designs.
  **Applies to** open-source | docs | landing page.
  **Check** `font-family` first entry in the allow-list or in a vetted catalogue (`knowledge/web/font-catalogue.md`); `visual`.
  **Source** practicaltypography.com/free-fonts.html; /charter.html; /cambria-alternatives.html; /courier-alternatives.html

- **RULE [PT-FC-06]** Consider Charter for screen body text where no licence budget exists: it was designed in 1987 (Matthew Carter) to survive 300 dpi laser printers and fax output, so it holds up on coarse screens; it ships as a system font on recent macOS and the Bitstream original is freely redistributable with its notice kept.
  **Why** Designed for low-resolution output; sturdy at text sizes.
  **Applies to** docs | long-form | email-adjacent.
  **Check** `visual`; licence notice retained if self-hosted (Bitstream notice).
  **Source** practicaltypography.com/charter.html

- **RULE [PT-FC-07]** Avoid novelty, script, handwriting and "circus" fonts (Stencil, Brush Script, Papyrus, Comic Sans, Copperplate, the Microsoft Office scripts, etc.) in professional reading material.
  **Why** Distinctive is fine, goofy is not; they carry overtones that undercut the message. Also Bookman and Bodoni are "skunked": Bodoni's high contrast tires the eye after a few words; Bookman reads as dated.
  **Applies to** all body and UI text. Display exceptions: see section 5.
  **Check** computed `font-family` not in the novelty/script list for any text with > 40 characters; `visual`.
  **Source** practicaltypography.com/goofy-fonts.html; /bad-fonts.html; /system-fonts.html

- **RULE [PT-FC-08]** Do not use monospaced fonts for ordinary text; use them for software code, terminal output and similar content where the compressed syntax benefits from fixed widths.
  **Why** They exist for typewriter mechanics, take more horizontal space (fewer words per line), and are harder to read. The need for aligned digits is met by tabular figures in proportional fonts.
  **Applies to** all (except `code`, `pre`, data IDs).
  **Check** `p`/`li`/`td` prose with computed monospace family is a fail; `code`, `pre`, `kbd`, `samp` are fine.
  **Source** practicaltypography.com/monospaced-fonts.html

- **RULE [PT-FC-09]** For printed body text prefer a serif font (the traditional, still best choice). On the web either serif or sans works; sans was favoured on screen only because early low-resolution rendering suited it.
  **Why** Books, newspapers and magazines set body in serif for good reason; modern screens render serifs well.
  **Applies to** docs | long-form (print); web is free.
  **Check** n/a (judgement); `visual`.
  **Source** practicaltypography.com/body-text.html

- **RULE [PT-FC-10]** Make the body family complete before using it: roman, italic, bold, bold italic and (if used) a real small-caps style; avoid families that lack a true italic. For sans text faces without a distinct italic, use bold for emphasis rather than synthetic slant.
  **Why** Synthesised styles look wrong; a sans italic is usually just a slanted roman that does not stand out.
  **Applies to** all (font loading).
  **Check** `@font-face` set contains the weights/styles used; `font-synthesis: none` plus no computed style without a matching loaded face (see T-FO-07).
  **Source** practicaltypography.com/font-basics.html; /bold-or-italic.html

### 2.2 Mixing fonts

- **RULE [PT-FC-11]** Use few families: one is enough (vary size, weight, small caps); a second is usually fine; a third is rarely fine; four or more almost never. Treat all slides in a deck as one document.
  **Why** Diminishing returns; every extra face dilutes consistency.
  **Applies to** all.
  **Check** distinct first-families across text on a page ≤ 2 (mono excluded) as the soft target, ≤ 3 hard ceiling (T14).
  **Source** practicaltypography.com/mixing-fonts.html

- **RULE [PT-FC-12]** Give every font a consistent role (e.g., one for body and one for headings; one for the centre of the page and one for edge matter such as footers and line numbers; one for list markers and one for list text) and switch faces only at paragraph or block boundaries, not mid-paragraph.
  **Why** Roles make the mix read as intentional.
  **Applies to** all.
  **Check** within `p`, no inline `font-family` change except `code`/`kbd`; role tokens (`--font-display`, `--font-text`, `--font-mono`).
  **Source** practicaltypography.com/mixing-fonts.html

- **RULE [PT-FC-13]** When pairing, prefer faces that are close rather than maximally contrasting; any two clearly different fonts can work (serif with serif is fine: newspapers set body and headline in different serifs). A reliable shortcut: combine families by the same designer.
  **Why** Low contrast between fonts can work like low-contrast colour pairing; designer-matched families share structure.
  **Applies to** all.
  **Check** `visual`; catalogue field `designer` equal for the pair (soft).
  **Source** practicaltypography.com/mixing-fonts.html

### 2.3 Emphasis styles

- **RULE [PT-FC-14]** Treat bold and italic as mutually exclusive and use as little of either as possible; never run whole paragraphs in bold, never underline bold text, avoid bold italic.
  **Why** If everything is emphasised nothing is; bold/italic are designed to contrast with roman and are harder to read in long runs.
  **Applies to** all.
  **Check** `p` where `font-weight ≥ 600` for the whole paragraph; elements with both `font-style: italic` and bold weight on > 1 line; `<strong>` inside `<em>`.
  **Source** practicaltypography.com/bold-or-italic.html

- **RULE [PT-FC-15]** In serif fonts use italic for gentle emphasis and bold for heavier emphasis; in sans-serif fonts skip italic and use bold. If you need a third option, use caps or small caps. Semibold reads a little easier than bold; bold gives more contrast (his preference, opinion).
  **Why** Serif italics are genuinely different letterforms and stand out; many sans italics are slanted romans.
  **Applies to** all.
  **Check** `em` in sans text: computed italic is distinguishable (`visual`); weight tokens defined for emphasis.
  **Source** practicaltypography.com/bold-or-italic.html

- **RULE [PT-FC-16]** Do not give the emphatic style to punctuation or brackets that sit just outside the emphasised words, unless an italic character would collide with an adjacent roman character.
  **Why** Surrounding punctuation is part of the sentence, not the emphasised phrase.
  **Applies to** docs | articles.
  **Check** `em`/`strong` content does not start or end with `(`, `)`, `,`, `.`, quote marks (regex on innerHTML).
  **Source** practicaltypography.com/bold-or-italic.html; /parentheses-brackets-and-braces.html

- **RULE [PT-FC-17]** Use black, ultra, heavy and other weights heavier than bold only at large sizes (headlines), not for body text.
  **Why** They are designed for display; at text sizes they clog.
  **Applies to** all.
  **Check** computed `font-weight ≥ 800` on text with `font-size < 24px`; flag.
  **Source** practicaltypography.com/bold-or-italic.html

- **RULE [PT-FC-18]** Do not underline for emphasis or in headings; use bold or italic instead, and (for headings) caps, small caps or size if needed. In web links, colour alone is the author's preference (he thinks the industry has moved on from underlined links); see section 5 for the accessibility caveat.
  **Why** Underlining is a typewriter workaround, mechanically applied rather than designed to match the font; mainstream publishers use it sparingly or not at all.
  **Applies to** all non-link text.
  **Check** `text-decoration: underline` on non-`a` elements is a fail; underline on `a` evaluated against PT-FC-19.
  **Source** practicaltypography.com/underlining.html; /headings.html; /color.html

- **RULE [PT-FC-19]** Colour is the idiomatic way to mark clickable text. If links are not underlined, make them distinguishable by colour and weight, and do not colour non-clickable text to look like links.
  **Why** Readers learn colour = clickable.
  **Applies to** all.
  **Check** `a` colour differs from body text colour with contrast ratio ≥ 3:1 against surrounding text (WCAG 1.4.1 [engine note]) or underline present; non-link elements do not reuse the link colour.
  **Source** practicaltypography.com/color.html; /underlining.html

### 2.4 Caps, small caps, ligatures

- **RULE [PT-FC-20]** Use all caps only for stretches shorter than one line: headings shorter than a line, headers, footers, captions, labels, letterhead. Never capitalise whole paragraphs (more so in bold). Always add letterspacing (5-12 percent) and keep kerning on. Apply caps by formatting (`text-transform: uppercase`) not by typing capitals, so it can be toggled.
  **Why** Caps lose the varied word contour of lowercase and are less familiar to read; long runs fatigue readers and emphasise nothing. To emphasise a paragraph, use a rule, a heading label such as "Important", or a larger size.
  **Applies to** all.
  **Check** `text-transform: uppercase` on blocks with > 1 line (computed height > line-height) or > ~30 characters is a fail; companion check letter-spacing/size ≥ 0.05; typed ALL CAPS strings > 20 characters in source.
  **Source** practicaltypography.com/all-caps.html; /summary-of-key-rules.html

- **RULE [PT-FC-21]** Use real small caps only (font has an `smcp`/`c2sc` feature or a separate small-caps file); if you do not have them, do not use small caps at all. Do not use the word processor/browser small-cap switch on a font without real small caps. Add letterspacing and kerning as for caps.
  **Why** Synthetic small caps are scaled capitals: too tall and too light compared with the surrounding text.
  **Applies to** all.
  **Check** in CSS: `font-variant-caps: small-caps` only when the loaded font exposes `smcp` (test: rendered x-height of the small caps vs capital glyph stroke width); `font-synthesis-small-caps: none` [engine note]; `visual`.
  **Source** practicaltypography.com/small-caps.html

- **RULE [PT-FC-22]** Leave ligatures off unless letters actually collide: only the f+i (and f+l, ffi) combination is "mandatory" when the glyphs overlap, which you check in regular, bold and italic styles. Otherwise ligatures are a stylistic choice that makes body text look somewhat old-fashioned. Never use the Th ligature.
  **Why** Digital type has no physical collisions; extra ligatures add quaintness and the Th ligature is overly ornamental in common text.
  **Applies to** docs | long-form.
  **Check** `font-variant-ligatures` is `common-ligatures` (or default) only if a collision exists (fi at 16-24 px); `discretionary-ligatures` off; no Th ligature (`dlig`); do not insert ligature characters by hand (they break spell-check, hyphenation and search).
  **Source** practicaltypography.com/ligatures.html

### 2.5 Figures and OpenType

- **RULE [PT-FC-23]** Choose figure style to fit the context: lining figures are never wrong, are best with capitals and in tables; oldstyle figures suit lowercase running text (serif body) and look wrong next to caps; proportional figures are preferred in body text, tabular figures are essential for vertically aligned columns.
  **Why** Figures were not designed with the alphabet; the four combinations (lining/oldstyle x proportional/tabular) serve different contexts.
  **Applies to** docs | tables | pricing | dashboards.
  **Check** `font-variant-numeric` per context: `tabular-nums lining-nums` in tables and prices; `oldstyle-nums proportional-nums` optional in serif prose; no `oldstyle-nums` on uppercase runs.
  **Source** practicaltypography.com/alternate-figures.html; /grids-of-numbers.html

- **RULE [PT-FC-24]** Verify tabular figures by test, not assumption: type a line of zeros above a line of ones; if both lines have the same width the digits are tabular. Many system fonts default to tabular lining digits, and most proportional fonts include tabular figures by default.
  **Why** Alignment depends on the font actually having the property, and some software cannot activate OpenType (Excel).
  **Applies to** SaaS app | pricing | tables.
  **Check** measure `00000000` vs `11111111` width in the loaded font; equal means tabular; else apply `tabular-nums` and re-test (see T-NU-02).
  **Source** practicaltypography.com/alternate-figures.html; /grids-of-numbers.html

- **RULE [PT-FC-25]** Do not superscript ordinals (1st, 2nd, 304th); write them at full size. Avoid `<sup>` for ordinals.
  **Why** Superscripted ordinals are tiny and hard to read; use special superscript glyphs only if the font provides legible ones.
  **Applies to** all text.
  **Check** regex on `<sup>` content `^(st|nd|rd|th)$` inside digits.
  **Source** practicaltypography.com/ordinals.html

- **RULE [PT-FC-26]** Treat OpenType features as available only when both the font and the rendering software support them. In CSS use `font-feature-settings` or the high-level `font-variant-*` properties; confirm the feature is actually in the served web font (subsetting can strip them).
  **Why** A feature selected but unsupported silently does nothing.
  **Applies to** all (font loading).
  **Check** feature test render (width/shape change) after applying `font-feature-settings`/`font-variant-*`; subset retains required feature tables.
  **Source** practicaltypography.com/opentype-features.html

- **RULE [PT-FC-27]** Check that the font tuned for your platform's rasteriser looks even: the author serves slightly heavier body weights to Windows than Mac because Windows renders lighter. Test body weight on at least Windows and macOS.
  **Why** Rasterisation differs by OS.
  **Applies to** landing page | docs.
  **Check** screenshot comparison on Windows and macOS (opinion; the book states it as a practice, not a rule).
  **Source** practicaltypography.com/responsive-web-design.html (by-the-way note)

- **RULE [PT-FC-28]** Respect font licences: licences are normally per user or per site; one purchased licence shared among a larger group violates it, and web use needs web-font rights.
  **Why** Fonts are software under a licence.
  **Applies to** all.
  **Check** licence file/receipt in repo for each non-open family; web-font rights covered.
  **Source** practicaltypography.com/font-basics.html; /the-copyright-status-of-fonts.html

## 3. Numbers & scales

System-font tiers (from /system-fonts.html; * marked plausible for body text on the original page):

| Tier | Fonts |
|---|---|
| A: generally tolerable | Athelas*, Avenir*, Bell MT*, Book Antiqua*, Californian FB*, Calisto MT*, Century Schoolbook*, Charter*, Franklin Gothic*, Garamond*, Gill Sans*, Gill Sans MT*, Goudy Old Style*, Helvetica*, Helvetica Neue*, Hoefler Text*, Iowan Old Style*, Optima*, Palatino*, Seravek*, Sitka* |
| B: OK in limited doses | Agency FB, Big Caslon, Bodoni MT, ITC Bodoni 72, Calibri*, Candara, Centaur, Constantia, Corbel, Futura*, Geneva, Gloucester MT Extra Condensed, High Tower Text*, Modern No. 20, Perpetua*, Rockwell, Segoe UI*, Tw Cen MT* |
| C: questionable | Andale Mono, Baskerville*, Berlin Sans FB, Bernard MT Condensed, Cambria*, Castellar, Century Gothic, Cochin, Consolas, Cooper Black, Courier, Courier New, Didot, Elephant, Engravers MT, Eras ITC, Felix Titling, Georgia, Haettenschweiler, Impact, Lucida (all), Maiandra GD, Menlo, Niagara, Onyx, Plantagenet Cherokee, Skia, Times New Roman* |
| F: fatal to credibility | Algerian, American Typewriter, Apple Casual, Apple Chancery, Arial (all styles), Bauhaus 93, Blackadder, ITC Bradley Hand, Britannic Bold, Broadway, Brush Script MT, Bookman Old Style, Century, Chalkboard, Chalkduster, Chiller, Colonna MT, Comic Sans MS, Copperplate, Curlz MT, Edwardian Script, Footlight MT Light, Forte, Freestyle Script, French Script, Gabriola, Gigi, Goudy Stout, Harlow, Harrington, Herculanum, Imprint MT Shadow, Informal Roman, Jokerman, Juice ITC, Kristen ITC, Kunstler Script, Luminari, Magneto, Marker Felt, Matura, Mistral, Monaco, Monotype Corsiva, Noteworthy, OCR A Extended, Old English Text, Palace Script, Papyrus, Parchment, Playbill, Phosphate, Poor Richard, Pristina, Rage Italic, Ravie, Savoye, Script MT Bold, Segoe Print, Segoe Script, SignPainter, Snap ITC, Snell Roundhand, Stencil, Showcard Gothic, Tahoma, Tempus Sans, Trattatello, Trebuchet MS, Verdana, Viner Hand, Vivaldi, Vladimir Script, Wide Latin, Zapfino, and all others |

Guidance: for print, tier A only; for screens (presentations, websites) A and B acceptable; C avoid; F never. These rankings are print-era and mix practical and aesthetic factors (author's blend).

Alternatives the author names (opinion; useful to note the pattern "pick a more refined face in the same genre"):

| If you were about to use | He suggests instead |
|---|---|
| Helvetica / Arial | Neue Haas Grotesk, Concourse, Hermes Maia, Atlas |
| Times New Roman | Plantin, Equity |
| Georgia | Miller, Century Supra, Harriet, Chronicle |
| Verdana | Hermes Maia, Concourse, Alright Sans, Sweet Sans, Breuer |
| Calibri | Concourse, Guardian Sans, Seravek, Fort |
| Cambria | Guardian Egyptian, Elena, Skolar, Charter, Source Serif |
| Palatino / Book Antiqua | Valkyrie, Palatino Nova, Iowan Old Style, Verdigris |
| Baskerville | Baskerville 10, Ingeborg, Kingfisher |
| Century Schoolbook | Century Supra, Miller, Harriet, Ingeborg |
| Gill Sans | Ideal Sans, Brandon Text, Verlag, Concourse |
| Courier / Courier New | Triplicate, Pitch, Input, Fira Mono |
| Minion | Equity, Valkyrie, Century Supra, Lyon |

Other numbers: fonts mixed: 1 enough, 2 tolerable, 3 rare, 4+ almost never. Body family cores: roman, italic, bold, bold italic, roman small caps (5 styles). Charter: designed 1987, Bitstream release 1992. Caps/small-caps letterspacing: 5-12 percent.

## 4. Dos and Don'ts

| Do | Don't | Source |
|---|---|---|
| Real small caps (OpenType `smcp`) with 5-12% tracking | Browser-synthesised small caps | small-caps |
| Lining figures with capitals; tabular in tables | Oldstyle figures beside capitals ("TOP 40 IN 1987" wrong) | alternate-figures |
| Turn ligatures on where fi collides | Th ligature, hand-inserted ligature characters | ligatures |
| Bold for emphasis in sans, italic in serif | Bold italic, underlined bold, whole paragraphs in bold | bold-or-italic |
| Proportional body font; monospace for code | Monospace body copy | monospaced-fonts |
| 1-2 families, clear roles | A different face per element | mixing-fonts |
| Font by a family designed for print when printing | Screen-optimised faces in print | system-fonts |

## 5. Exceptions & judgement calls

Conflicts and notes against `knowledge/web/typography.md` and `knowledge/ui-pedia/12-typography.md`:

- **System fonts on the web.** Butterick (print-era and early-web lens) says avoid system fonts; T-FO-07 and many shipped SaaS stacks end with `system-ui`. [engine note] His A-list reflects 2010s OS libraries; modern UI system fonts (SF, Segoe UI Variable, Roboto) were not evaluated. Treat his rule as "do not let the default be the design", not "never use `system-ui` for product chrome". T01 (default-font tell) is consistent.
- **Georgia and Verdana.** He puts them in C and F tiers; the engine's catalogue may still list Georgia-like faces. Prefer catalogue picks.
- **Script / handwriting faces.** He bans them for professional documents; T-PA-06 permits one large accent per viewport (annotations, signatures). Resolution: his ban is about documents that invite sustained reading; a single large accent is not "body text". The two agree that neither belongs in body or UI.
- **Bodoni / high-contrast Didone.** He calls high-contrast Bodoni annoying after three words; T-PA-04 already limits hairline serifs to large sizes. Consistent.
- **Underlined links.** He argues links need not be underlined. WCAG 1.4.1 requires a non-colour cue unless link colour has 3:1 contrast against surrounding text (and a hover/focus cue). [engine note] Keep the a11y floor; pass both checks. See the a11y notes in this folder.
- **Oldstyle numerals.** The book's site uses `oldstyle-nums` in serif prose but normal in tables; T-NU-03 says `lining-nums` default in UI and oldstyle only in serif prose: compatible.
- **Tabular figures by default.** He says most proportional fonts include tabular figures by default; T-NU-02 found that Inter, Geist and others have the feature but not by default (and DM Sans etc. not at all). The zeros-over-ones test is the reliable check; do not rely on his generalisation.
- **Letterspacing and ligatures [engine note].** When `letter-spacing` is non-zero, browsers disable optional ligatures, so tracked caps will never ligate.
- **Font names are not evidence of quality.** Names of dead typographers (Garamond, Baskerville, Caslon) are unprotected and appear on very different designs (Stempel Garamond versus ITC Garamond are as different as two cartoon siblings). Evaluate the rendering, not the name. (Judgement from font-basics.)
- **Commercial interest.** Many recommendations name the author's own fonts; ignore the names, keep the genre pairings.

## 6. Figures worth keeping

- /ligatures.html: fi row in Concourse (no collision) vs Equity (collision), fixed by liga.
- /small-caps.html: fake vs real small caps, legal citation example.
- /alternate-figures.html: lining vs oldstyle in TOP 40 IN 1987; tabular vs proportional $ columns; zeros-over-ones test.
- /all-caps.html: contour comparison of lowercase vs caps ("Legible Shapes").
- /system-fonts.html: Georgia vs Miller comparison; tier chart.

## 7. Open questions and coverage

- The *-alternatives pages (courier, palatino, baskerville, century-schoolbook, georgia, verdana, gill-sans, cambria, calibri, minion, helvetica-and-arial, times-new-roman) and the eight family pages (equity ... advocate) are product/taste commentary; only the substitution pattern and design facts are recorded. Family-page prices, file counts and weights are not relevant to rules.
- /times-new-roman-alternatives.html is history plus a verdict (default font connotes apathy; alternatives Plantin and Equity); no further rule content.
- /system-fonts.html's last bullet (web text rendering relies on OS rasterisation; Georgia and Verdana were created for web) is recorded in PT-FC-04's rationale.
