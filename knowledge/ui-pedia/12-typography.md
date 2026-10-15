---
source: ui-pedia
chapter: Typography (Design Basics)
pages: 251-285
topic_tags: [typography, type-scale, line-height, kerning, tracking, leading, hierarchy, font-choice, font-weight, white-space, contrast, consistency, responsive-type]
status: studied
---

# Typography (Design Basics)

The chapter is mostly qualitative. It gives a terminology layer (anatomy, families, novelty/cultural faces, kerning/tracking/leading) and then "10 practices for good typography". Hard numbers are almost absent: the only explicit ones are line-height 1.5x body size as a starting point, a family can have up to 20 styles (Futura: 22), and the worked type-scale figure (H1 Heavy, H2 Bold, H3 Bold, Subtitle Regular, Body 1 Regular, Button Medium). Figures show direction (tighter / looser, more / less) without pixel values, so no sizes are invented here.

## 1. Core ideas

1. Typography is "the art of organizing typefaces on the interface to make all copy readable, legible and scalable"; it is more than choosing an aesthetic font, and the book calls it "probably the most important part" of UI design. (p.251)
2. Type is a visual communication tool: it conveys content in a clear hierarchy and encourages users to stay longer or buy. (p.252, p.254)
3. People scan instead of reading line by line; scannable, well-organised type is what impresses and engages them. (p.253)
4. Four stated benefits of good type: (1) readability, legibility, accessibility (faster find/understand), (2) consistent tone and mood, (3) standing out and being remembered (brand recall), (4) boosting sales by removing distraction. (p.255, p.256, p.258)
5. Typeface style sets tone before a word is read: cartoon font with warm colours, soft lines, bold strokes = fun and personal; plain, simple, serious type = serious tone for the whole product. (p.256)
6. Novelty and cultural faces are strong but "quickly become overbearing" and carry pre-baked connotations; handle with caution. (p.262)
7. Type is fitted into space with three levers: kerning (one pair), tracking (whole run), leading (line-to-line). (p.263-265)
8. Display typeface and text typeface can be different jobs: a very distinctive brand face unfit for long reading or small sizes is reserved for display sizes (headlines, infrequent), paired with a more legible face for most small text. (p.266)
9. Fewer weights and fewer typefaces: each extra weight costs load time and licence, and too many fonts emphasise too many elements, "creating unnecessary noises". Try size before weight for hierarchy. (p.269-270)
10. Size and line-height are coupled; start from body size x 1.5 and let that drive a baseline grid that also defines icon sizes, margins, padding, spacing and component sizing. (p.270-271)
11. Hierarchy comes from headings/titles, shape and size (with enough spacing), and colour (contrast, gradients, colour blocks). (p.274-278)
12. Define the whole type scale up front, for every platform, and share it with the team; test it on devices in a prototype. (p.279, p.283-284)

## 2. Rules

### 2.1 Choosing typefaces and tone

- **RULE** Pick the typeface to match the product's tone and theme; deliver page content "in the appropriate mood and tone".
  **Why** Style communicates personality (fun vs serious) before the content is read.
  **Applies to** all. **Check** `visual`. **Source** (p.256, p.266)

- **RULE** Map face character to use case as the book does: bold, fat, rounded face for attention on illustrated/cartoon-style sites (shown: heavy slab-like "APPLE / Mac Book M2 Chip" headline); pixelated face for a retro 1980s-90s game-style app ("SABO FRUITS / BUY NOW"); curly, unique script for personal or portfolio sites, not company sites ("Butterflu Kids").
  **Why** Each face carries a context; mismatched context reads as wrong tone.
  **Applies to** landing page | mobile. **Check** `visual`. **Source** (p.267-268)

- **RULE** If a brand has a very distinctive typeface that is unsuitable for extended reading or small sizes, reserve it for infrequent display sizes (headlines) and pair it with a more legible typeface for the majority of low-size text.
  **Why** Distinctive faces degrade at small size and in long copy.
  **Applies to** all. **Check** font-family on `h1`/hero vs `p`, `label`, `input`, `small`: distinctive face absent from body-size text. **Source** (p.266)

- **RULE** Treat novelty styles (inline, ink/brush, script, whimsical, hand-drawn) as accent only; do not set sustained or functional text in them, and do not try to synthesise bold/italic on them.
  **Why** They "quickly become overbearing"; they exist only as designed, so faux bold/italic is not possible/valid. Script fonts also cannot be tracked much because ligatures split and produce imbalanced spacing.
  **Applies to** landing page. **Check** `visual`; computed `font-weight`/`font-style` on novelty face equals the weights actually loaded. **Source** (p.260-262, p.264)

- **RULE** Use "cultural" faces (fake-Japanese or fake-Chinese looking letterforms, Disney-style, Coca-Cola-style logotype scripts) only with awareness; they "immediately" give the design a preconceived connotation.
  **Why** They carry strong built-in cultural/brand messages.
  **Applies to** landing page. **Check** `visual`. **Source** (p.262)

- **RULE** Work with brand/marketing on the typefaces; typefaces are "another way to quietly convey the correct tone and personality" and have to fit into the system.
  **Why** Type is part of brand expression and must be integrated rather than imposed.
  **Applies to** all (process). **Check** n/a. **Source** (p.266)

### 2.2 Weights, styles, families

- **RULE** Keep the list of font weights/variants short; plan how many weights are needed for clear hierarchy on the most complicated screen, and load only those.
  **Why** Loading all weights of a family is inefficient and costs more to license.
  **Applies to** all. **Check** count of distinct `font-weight` values in use and of loaded font files (`@font-face`). **Source** (p.269-270)

- **RULE** Before adding a weight, check whether the hierarchy can be achieved by raising type size instead.
  **Why** Size alone can separate levels without adding a font file.
  **Applies to** all. **Check** `visual`. **Source** (p.269-270)

- **RULE** For rare italic needs (one or two tiny uses), weigh loading an extra webfont against using browser-rendered italics.
  **Why** Cost/benefit of an extra file vs faux-italic rendering.
  **Applies to** all. **Check** `@font-face` for italic present only if used often. **Source** (p.269)

- **RULE** Use bold for headlines, for highlighting crucial areas of text, and for links (makes links stand out and easier to see). Use italics mainly for words in a different language or for reference links.
  **Why** Bold signals importance/clickability; italic signals "foreign / referenced".
  **Applies to** all. **Check** `visual`. **Source** (p.259)

- **RULE** Use a typeface family's range deliberately: a family can have up to ~20 styles (Futura shown with 22: light, condensed, semi-bold, extra bold, bold condensed, book italic...). Use a condensed cut when a lot of letters must fit in a small space; use extra bold (or extra bold condensed) for headline type; light for contrast with bold.
  **Why** Staying inside one family gives hierarchy with unified character.
  **Applies to** all. **Check** `visual`. **Source** (p.259)

- **RULE** Do not use too many typefaces or fonts in one view. The bad example mixes a bold sans, a thin cursive script and a condensed caps face inside one two-line quote ("Happiness is a Direction, not a PLACE"); the good one is a single plain face in one weight.
  **Why** "Too many fonts may emphasize too many elements, creating unnecessary noises to distract users."
  **Applies to** all. **Check** number of distinct `font-family` values across the page (target: few); `visual`. **Source** (p.270)

### 2.3 Sizes, line-height, scale

- **RULE** Start line-height at 1.5 x font size (for body copy at the base size) and derive the rest from it.
  **Why** It is a workable default and gives a base for a baseline grid.
  **Applies to** all. **Check** computed line-height / font-size on `p` is about 1.5. **Source** (p.271)

- **RULE** Use the body line-height as the unit of an underlying baseline grid in which all sizes are mapped or evenly divided; let it also set icon sizes, margins, padding, spacing and general UI component sizing.
  **Why** Ties text rhythm to every other dimension so the layout is systematic.
  **Applies to** all. **Check** icon sizes, paddings, margins are multiples/divisions of the base line-height. **Source** (p.271)

- **RULE** Decide up front how many type sizes you need and which sizes pair with which weights/styles; cover helper text, form labels, body, subheads and headlines.
  **Why** An undefined size set leads to ad-hoc sizes and inconsistency.
  **Applies to** all. **Check** set of distinct computed `font-size` values is small and matches the scale. **Source** (p.271)

- **RULE** Define how sizes behave across devices and viewports; the largest scale differences are on larger displays. Choose the unit deliberately (px, rem, em, vh/vw as a fluid unit) and formalise values as tokens/variables instead of hard-coding.
  **Why** Maintainability and responsive consistency.
  **Applies to** all. **Check** font sizes come from CSS variables/tokens; no hard-coded one-off sizes. **Source** (p.272)

- **RULE** Establish a size for all fonts/typefaces from the start in a type scale and share it with the team for every platform (Android, iOS, Web), stating which platform/context each scale applies to.
  **Why** Scalable type across screen sizes requires one agreed scale.
  **Applies to** all (process). **Check** presence of a documented scale. **Source** (p.278-279)

- **RULE** Worked scale shown: H1 Heavy, H2 Bold, H3 Bold, Subtitle Regular, Body 1 Regular, Button Medium (H1 > H2 > H3 > Subtitle in size; Subtitle, Body 1 and Button are drawn at about the same size; no px values given). Replicate that structure: weight steps down from Heavy to Regular as size steps down, with Medium reserved for button labels.
  **Why** Weight plus size together make the levels distinct.
  **Applies to** all. **Check** computed weight order h1 >= h2 >= h3 >= body; button weight 500-ish. **Source** (p.279)

### 2.4 Kerning, tracking, leading

- **RULE** Kerning: adjust the space between two specific letters only when that one letter is too far from or too close to its neighbours (e.g. the space after an initial capital looks odd in some typefaces). Kern letter by letter on wordmark logos so the whole word is balanced.
  **Why** Better letter-to-letter balance. In the figure "PX" unkerned leaves a visible gap between P and X; kerned, X tucks in toward P's bowl (dashed guides show the closed gap).
  **Applies to** logos | display headlines. **Check** `visual`. **Source** (p.263-264)

- **RULE** Tracking: adjust the spacing of all letters in a run to fit more letters into a short space, to open up letters that are too close, or to make a block of words look evenly bordered/justified.
  **Why** One global control for density.
  **Applies to** all. **Check** computed `letter-spacing` on type classes. **Source** (p.264-265)

- **RULE** Do not track script fonts much.
  **Why** Ligatures split and create imbalanced spaces.
  **Applies to** script faces. **Check** `letter-spacing` on script text near 0. **Source** (p.264)

- **RULE** Tighten letter spacing on larger type (headings, banners, titles).
  **Why** Large type looks too loose at default spacing.
  **Applies to** all. **Check** negative/smaller `letter-spacing` on `h1`-`h3`, hero text. **Source** (p.274)

- **RULE** Loosen letter spacing on smaller type (body text, error messages, notifications) for improved reading.
  **Why** Small text needs more air between letters to stay legible. The comparison figure "Which one is easier to read...?" puts a small, cramped, tight-leaded paragraph on the left and a larger, looser, more open paragraph on the right; the right is the intended answer.
  **Applies to** all. **Check** `letter-spacing` >= 0 on body/helper/error text. **Source** (p.274)

- **RULE** Leading (line spacing, baseline to baseline) changes the look of a paragraph; do not set lines tight. The figure compares a very tight block (lines almost touching, arrow short) with an open block (arrow longer): open is the readable version. Starting point is 1.5 x font size.
  **Why** Leading and x-height jointly determine how a paragraph appears.
  **Applies to** all. **Check** line-height / font-size on paragraphs. **Source** (p.265, p.271)

- **RULE** Take x-height into account when setting leading: a lower x-height relative to cap height leaves more white space between lines; a larger x-height relative to cap height makes the leading look more balanced and orderly.
  **Why** Perceived line gap depends on x-height, not only line-height number.
  **Applies to** font choice. **Check** compare font x-height ratio when choosing the face; `visual`. **Source** (p.265)

### 2.5 Space around text

- **RULE** Balance white space with information: enough white space for a clear layout and easier reading, but not so much the page looks "empty" and is hard to use and navigate; and not so little that the interface is congested and packed.
  **Why** Both extremes impede finding information. In the figure, "Less White Space" (marked with a red cross) is a text block packed to the edges with tight leading beside an image; "More White Space" (green check) has the same text shortened with more space between lines and paragraphs and a wider gutter.
  **Applies to** all. **Check** `visual`; line-height and paragraph spacing present. **Source** (p.272-273)

- **RULE** Pay attention to both white space around elements/blocks of text and text space (letter and line spacing) inside the text.
  **Why** Both affect readability of copy.
  **Applies to** all. **Check** `visual`. **Source** (p.273-274)

### 2.6 Hierarchy

- **RULE** Build visual hierarchy with headings, subheadings, titles and subtitles. The example landing page uses a nav, a centred headline "How Become a UI Designer..?" bigger and darker than its subtitle line, a single filled "Watch More" button, then a section label "UI New Books" above a row of four image cards with small captions.
  **Why** Hierarchical headings "stand out the important information visually" and make reading and scanning easy.
  **Applies to** all. **Check** computed size ordering h1 > h2 > h3 > body > caption. **Source** (p.275-276)

- **RULE** Use contrast of size and weight plus enough spacing for hierarchy: a big, bold, short title states the service quickly, followed by small body text that explains in detail (example: "All in one solution to your Finance problems" large and bold, small body paragraph below, then two buttons: filled "Get Started" and outlined "Watch Demo").
  **Why** Catches the eye quickly, then explains; the two work together as a clear layout.
  **Applies to** landing page. **Check** hero title/body size ratio visibly large; `visual`. **Source** (p.277)

- **RULE** Use colour contrast, colour gradients and colour blocks to separate hierarchy levels. Example: a full-bleed saturated blue hero band with white title text "Guide Me Academy" above three equal colour-block tiles (yellow, mint, pink), each with one object.
  **Why** Colour blocks mark sections and levels at a glance.
  **Applies to** landing page. **Check** `visual`. **Source** (p.278)

### 2.7 Contrast and emphasis

- **RULE** Use colour to make crucial text stand out against a neutral background; in the example form, error text is red on white and field states use green (valid) and red (invalid) with check/cross icons: the red top message ("One Of Fields Is Incorrect Or Invalid. Please, Follow The Examples In Order To Continue.") and the red-tinted invalid field cannot be missed.
  **Why** Colour is the most common contrast tool; errors should be hard to overlook.
  **Applies to** forms | SaaS app UI. **Check** error text colour differs strongly from background; pair with icon (the figure uses icon plus colour, not colour alone). **Source** (p.280)

- **RULE** Combine uppercase and lowercase for contrast: the example sets a mixed-case tagline, then a wide-tracked all-caps heading "WE LOVE AND BREATHE CODE ." in the brand slate, then mixed-case body text.
  **Why** Case change signals a different role without a new font.
  **Applies to** landing page. **Check** all-caps headings have positive `letter-spacing` (the figure shows widely spaced caps). **Source** (p.281)

- **RULE** Use italic, bold or underlined text to pull attention unconsciously to key words. Example: italic purple eyebrow "Composite user interfaces", an all-caps bold line with a script word "Graphical" overlapping, and an italic blue-highlighted acronym "CUI".
  **Why** A different text style draws the eye.
  **Applies to** all. **Check** `visual`. **Source** (p.281)
  Caution: the figure's overlapping script word collides with the line above (see section 4).

### 2.8 Copy, consistency, motion, testing

- **RULE** Keep UI text as simple and brief as possible, informative but concise ("never make your users think"); but do not go so short or basic that users get confused.
  **Why** Short copy supports scanning; over-short copy confuses and produces a negative outcome.
  **Applies to** all. **Check** `visual` / word counts of headings and body blurbs. Example shows a headline of two lines, a one-sentence deck and a tiny caption. **Source** (p.282-283)

- **RULE** Keep typography consistent: use consistent colours, font sizes and font kinds so the visitor is not distracted or confused.
  **Why** Consistency is a primary concept of typographic design and of UX overall.
  **Applies to** all. **Check** the same role uses the same family/size/weight/colour on every page (distinct computed styles per role = 1). **Source** (p.282-283)

- **RULE** Add lightweight animation and interaction to banner/subtitle copy to engage visitors on arrival.
  **Why** Interactive text raises engagement and buys time to make the pitch. (opinion; no durations or easing given in the text; the Figma panel in the next figure happens to show "Smart animate", "Ease in a..." and 600ms, but that is a prototype UI screenshot, not a recommendation)
  **Applies to** landing page. **Check** `visual`. **Source** (p.283)

- **RULE** Prototype and test type before production. In the prototype: (1) check type scales on a variety of devices, (2) check animations and interactions work as expected, (3) experiment with colours, white spaces and sizes for the desired result. If possible, invite real users to test details and give feedback.
  **Why** Saves time and money; catches typographic problems early.
  **Applies to** all (process). **Check** n/a. **Source** (p.283-285)

### Audit additions (audit 2026-10-15)

- **RULE** Below the heading levels, let the small roles share one size and separate them by weight and role instead: in the type-scale card only H1, H2, H3 and Subtitle step down in size, while Subtitle, Body 1 and Button are drawn at about the same size, with Button set apart by Medium weight against Regular body (figure-derived; the text does not say this).
  **Why** Extra sizes near body size are hard to tell apart; a weight change separates a button label from body copy more cleanly than a 1-2px size step.
  **Applies to** all. **Check** computed `font-size` of subtitle/body/button roles equal or within 1px; button `font-weight` one step above body (e.g. 500 vs 400). **Source** (p.279) (audit 2026-10-15)

- **RULE** Give headings a different colour from body copy as well as a larger size: the text says "A different color enhances the visual effect" of hierarchical headings, and in the example the headline is near-black while the subtitle under it is mid-grey.
  **Why** Colour difference adds a second cue, so the heading stands out faster when scanning.
  **Applies to** all. **Check** computed `color` of `h1`-`h3` differs from `p` (heading darker or brand-coloured); `visual`. **Source** (p.275-276) (audit 2026-10-15)

- **RULE** When a novelty, script, ink or pixel face carries the display word, set the supporting line under or beside it in a plain sans: "INK BANDITS" and "Milkshake" each sit over a small bold sans tagline "Time Stop the working"; "Butterflu Kids" (script) has a small sans label "Way to Schhol" in the corner; "Mac Book M2 Chip" (heavy slab) has a plain sans subline "A1 Faster Machine In world".
  **Why** The plain line keeps the readable content legible while the novelty face carries only the mood (figure pattern repeated across four examples).
  **Applies to** landing page. **Check** the element following a novelty/script display element uses the body/UI sans family; `visual`. **Source** (p.261, p.267-268) (audit 2026-10-15)

- **RULE** For a "current of total" index counter, emphasise the current number and mute the total: "02/04" and "09/08" with the "/04" and "/08" in light grey; "09/22" with "09" in accent blue and "/22" in grey; a hero slider counter "01/12" sits centred between two short hairlines (figure-derived).
  **Why** Two tones let the eye read position first and range second without a label.
  **Applies to** landing page. **Check** counter markup has two spans with different `color`, current darker or accent; `visual`. **Source** (p.253, p.282) (audit 2026-10-15)

- **RULE** In a card text stack, order the type as the example does: a small muted-grey category label ("Computers", "Desktop") above a medium-weight two-line title ("Create Design Portfolio"), then tiny body text, then a hairline rule, then the large counter (figure-derived).
  **Why** Each level differs in size, weight or colour, so the card scans top to bottom with one dominant line (the title).
  **Applies to** landing page | SaaS app UI. **Check** label `color` lighter and `font-size` smaller than card title; `visual`. **Source** (p.253) (audit 2026-10-15)

- **RULE** For a centred uppercase/lowercase contrast block, use this stack: a mixed-case eyebrow line ("Be me you are UI designer") flanked left and right by short horizontal hairlines that fade out at their outer ends, then a bold all-caps heading with very wide tracking in the brand slate, then mixed-case centred body directly beneath (figure-derived).
  **Why** Case change plus tracking marks the heading as a different role without a second font; the hairlines frame the eyebrow as a label.
  **Applies to** landing page. **Check** caps heading `text-transform: uppercase` or caps text with `letter-spacing` clearly positive (~0.2em+ by eye); `visual`. **Source** (p.281) (audit 2026-10-15)

- **RULE** In form validation, keep the valid fields in their normal fill and add only a green check icon inside the right end of the field; switch the invalid field's fill to a pink/red tint with a red cross icon in the same position; put the error summary at the top of the form as red text beside a filled red circular "i" icon. Field labels sit above each field in small bold dark text.
  **Why** Only the broken field changes surface colour, so the eye goes straight to it; the icon carries the state as well as the colour.
  **Applies to** forms. **Check** valid input `background-color` equals default; invalid input background differs and has an icon; error summary precedes the first field; `visual`. **Source** (p.280) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Starting line-height | 1.5 x font size (body, base size) | (p.271) |
| Typeface family size | "up to 20" styles (Futura: 22 styles) | (p.259) |
| Type scale in figure | H1 Heavy; H2 Bold; H3 Bold; Subtitle Regular; Body 1 Regular; Button Medium (no px given) | (p.279) |
| Number of practices | 10 (Typefaces; Weight/Styles; Space; Hierarchy; Scalable; Contrast; Short text; Consistency; Animate; Prototype/test) | (p.266-285) |
| Letter spacing, large type | tighten | (p.274) |
| Letter spacing, small type | loosen | (p.274) |
| Anatomy terms in figure | Ascender line, X-height, Base line, Descender line; ear, bar, shoulder, closed/open counter, stem (spelled "Steam"), loop, bowl (spelled "Bowel"), link, serif, ascender (spelled "Acender"), descender (spelled "Decender") | (p.251) |

(No px sizes, ratios, measure widths or contrast ratios are given in this chapter.)

Figure measurements (estimated from the page images by eye or by pixel counting; NOT stated in the text, so treat as approximate evidence, not book rules):
- Type-scale card cap heights: H1 : H2 ≈ 1.4, H2 : H3 ≈ 1.28, H3 : Subtitle ≈ 1.2; Subtitle, Body 1 and Button ≈ equal; H1 ≈ 2.1x Body 1. The weight labels (HEAVY, BOLD, REGULAR, MEDIUM) are set right-aligned in caps at one size. "Body 1" implies numbered body styles (no Body 2 shown). (p.279) (audit 2026-10-15)
- Leading figure: same font size and same line breaks in both cards; line pitch ≈ 18 vs ≈ 25 image px (open ≈ 1.4x tight). If the open card is the book's 1.5 default, the tight card is ≈ 1.05-1.1. (p.265) (audit 2026-10-15)
- "Which one is easier to read" figure: right paragraph type ≈ 1.28x larger than left, line pitch ≈ 1.6x (≈ 22 vs ≈ 14 image px); both hold about 41-45 characters per line, so the difference is size + leading + tracking, not measure. (p.274) (audit 2026-10-15)
- "Less vs More White Space" cards: same font size in both; the good card has slightly more leading (≈ 19.5 vs 18 image px pitch, ≈ 1.08x), a larger heading-to-body gap (≈ 31 vs 23 image px), the copy split into three paragraphs, and less copy; the text-to-image gutter is about the same. (p.273) (audit 2026-10-15)
- Hero headline vs its subtitle/body, by character width: ≈ 1.65x on the "How Become a UI Designer..?" page; ≈ 1.8x on the "All in one solution to your Finance problems" hero (title there is medium weight in the figure, though the caption calls it "big, bold"). Section label "UI New Books" ≈ 1.7x the card captions. (p.275, p.277) (audit 2026-10-15)
- All-caps heading tracking on the case-contrast example: very wide, roughly 0.2-0.3em by eye; small all-caps lines in the Futura poster are also widely tracked. (p.259, p.281) (audit 2026-10-15)
- Cultural faces: "far fewer options than novelty styles". Novelty faces: "hundreds" of styles beyond bold/italic. (p.260, p.262) (audit 2026-10-15)

## 4. Dos and Don'ts

| Do | Don't | Source |
|---|---|---|
| One face, one weight for a simple quote ("Happiness is a Direction, not a place.") | Mix bold sans, thin cursive and condensed caps in one two-line sentence (green check vs red cross card pair) | (p.270) |
| Text block with more white space: shorter lines, open leading, wider gutter beside image | Text block packed full width with tight leading ("Less White Space", red cross) | (p.273) |
| Larger, looser-spaced body paragraph (right) | Small, tight-tracked, tight-leaded paragraph (left) | (p.274) |
| Open line spacing (long arrow) | Tight line spacing (lines nearly touching) | (p.265) |
| Kerned "PX" with X tucked in | Unkerned "PX" with visible gap | (p.263) |
| Large bold headline + small body copy + two buttons | n/a (positive example only) | (p.277) |
| Red/green with icons on white to flag errors | n/a (positive example only) | (p.280) |
| Distinctive display face on headline, readable sans for small text (example: slab-like heavy headline "Mac Book M2 Chip" over a plain sans subline) | Distinctive face for long reading or small sizes | (p.266-267) |
| Script/novelty as accent in a hero (e.g. "Milkshake", "INK BANDITS") over photography | Script/novelty for body text; heavy tracking of script | (p.261-264) |

Observed flaws in the book's own figures (useful as negative lessons, not endorsed by the text):
- p.281 italic/bold example: the script word "Graphical" overlaps the line "THE MOST COMMON CUI IS A" above it; collisions like that hurt legibility (engine note: visible in the image only; the text does not criticise it).
- p.280 invalid-field label and field text are small, low-contrast grey on pale tint (visible in figure); the error message at top is small red text.
- Several demo screens use very small caption and body text (nav items, card captions) relative to headlines.

Audit additions (audit 2026-10-15):

| Do | Don't | Source |
|---|---|---|
| Single sans in one regular-to-medium weight for the whole quote | Bold "Happiness" + regular "is a" + thin script "not" + condensed caps "PLACE": four style changes in eight words (adds weight mixing within the sans, not only three families) (audit 2026-10-15) | (p.270) |
| Open leading at the same size and same line breaks (line pitch ≈ 1.4x the tight card) | Identical paragraph with lines almost touching; only leading differs, proving leading alone changes the paragraph (audit 2026-10-15) | (p.265) |
| Same text split into short paragraphs with a bigger gap under the heading and less copy | One unbroken 17-line block running from heading to card bottom (audit 2026-10-15) | (p.273) |
| Novelty display word + plain sans tagline under it ("INK BANDITS" / "Time Stop the working") | n/a (positive pattern repeated on p.261, p.267, p.268) (audit 2026-10-15) | (p.261, p.267-268) |
| Primary filled CTA ("Get Started", dark slate) left, secondary outlined CTA ("Watch Demo") right, both the same height and width under a two-line title | n/a (positive example only) (audit 2026-10-15) | (p.277) |
| Valid field: normal light fill + green check; invalid field: pink fill + red cross; red "i" summary at top | n/a (positive example; see figure flaws below) (audit 2026-10-15) | (p.280) |

Further figure flaws seen in the audit (not criticised by the text) (audit 2026-10-15):
- p.280 error summary is written in Title Case On Every Word and misspells "Invaild"; sentence case would read faster. Labels use a space before the colon ("Mail Address :").
- p.281 the centred body line under the caps heading runs about 95 characters on one line, much wider than the heading above it.
- p.279 the type-scale figure does not render its own labels faithfully: "H 3" is drawn visibly lighter than "H 2" although both are labelled BOLD.

## 5. Exceptions & judgement calls

- Distinctive/novelty faces vs readability: the book both praises distinctive typography for recall ("unusual and excellent typography helps customers recall the brand", p.258) and warns novelty faces become overbearing (p.262). Resolution implied: use at display sizes only, in one place, and keep body text in a legible face.
- "Keep text short" vs "do not be too short": brief is good, but over-short copy can confuse. (p.282-283)
- White space: neither too little nor too much; the book gives no ratio. (p.273)
- Weight vs size for hierarchy: prefer to try size first, but the book's own scale uses weight steps (Heavy/Bold/Regular/Medium) too. (p.270-271, p.279)
- Animating copy (p.283) is promoted without constraints; opinion. No reduced-motion or performance caveats given.
- Italic/bold/underline emphasis (p.281) is promoted as "unconscious" attention-getting; the book does not caution against overuse.
- Line-height 1.5 (p.271) is described as "a good place to start", i.e. a default to adjust, and the x-height remark (p.265) implies faces with small x-height need less/more leading depending on look; no numbers.
- [engine note] The book says tighten tracking on large type and loosen on small type; modern practice is the same (about -0.01em to -0.03em on large headings, 0 to +0.02em on small text) but those values are NOT in the book; treat as engine defaults to be set in `system/`.
- [engine note] 1.5 line-height is for body; headings usually need less (1.1-1.3) and the book does not say so. The earlier SCHEMA example quotes 1.5-1.65 body / 1.1-1.25 headings from the engine's own prior, not from this chapter.
- [engine note] Faux italic/bold: the book says novelty fonts cannot be made bold/italic; in CSS, browsers will synthesise them unless `font-synthesis: none` is set, so check for synthesised weights when using novelty faces.

## 6. Figures worth keeping

Copied to `examples/ui-pedia/typography/`:
- p.251: letter anatomy diagram on the word "Typography" (ear, bar, shoulder, counters, stem, loop, bowl, link, serif, ascender/descender, with ascender line, x-height, base line, descender line).
- p.256: Jeff Butler comic-artist site; cartoon type + warm primaries = playful tone.
- p.259: Futura family specimen (light, book, extra bold, condensed, caps, italic in one poster).
- p.263: kerning "PX" before/after with dashed guides.
- p.264: tracking before/after on a script word (wider vs tighter, with arrows).
- p.265: leading comparison, tight vs open paragraph, with arrows.
- p.267: bold fat display face on dark product hero ("Mac Book M2 Chip").
- p.268: pixelated face on a fruit brand ("SABO FRUITS") and curly script ("Butterflu Kids").
- p.270: too many fonts (red cross) vs one font (green check).
- p.273: Less vs More white space card comparison.
- p.274: "Which one is easier to read" tight/small vs loose/larger paragraph; also the two letter-spacing rules.
- p.275: heading hierarchy example landing page.
- p.277: big bold hero title + small body + filled and outline buttons.
- p.279: type scale card (H1 Heavy ... Button Medium).
- p.280: form with red error message, green/red field states.
- p.281: uppercase/lowercase contrast and italic/bold emphasis examples.
- p.253: card text stack (muted category label, two-line title, tiny body, hairline, two-tone "02/04" counter) and hero slider counter "01/12" between hairlines. (audit 2026-10-15)
- p.282: two-tone "09/22" counter (accent current, grey total) above a two-line title and tiny deck; active nav item marked by a dot under the label. (audit 2026-10-15)
- p.261: novelty display words ("INK BANDITS", "Milkshake") each paired with a plain bold sans tagline. (audit 2026-10-15)

## 7. Open questions

- No pixel values for any figure; sizes in figures cannot be reproduced exactly.
- p.251: "probab;y the most half important part" is OCR/typo damage in the source; the book's intent is "probably the most important part".
- p.263 "Karning Apply" and p.251 "Steam/Bowel/Acender/Decender" are misspellings in the figures themselves (stem, bowl, ascender, descender).
- p.280 mobile-number field (+91-9909099343) is shown invalid without saying why; no inline per-field error text is shown, only the top message and an icon (weak error design; not commented on by the book).
- p.282-283 the home-page example keeps text "09/22" counter and a tiny sentence; the book says nothing about minimum text size.
- The practice list at p.266 calls them "best 10 practices"; heading numbering 1-10 spans p.266-284, with "Choosing Typefaces" starting at PDF p.266 (printed 265).

Page accounting (PDF pages):
- p.251 intro + anatomy figure (rules: definition, anatomy terms)
- p.252 role of typography
- p.253 scanning + example hero
- p.254 pull-quote (no extra rule content; restates hierarchy/communication)
- p.255 benefit 1
- p.256 benefit 2 + comic site figure
- p.257 pull-quote (no extra rule content; restates tone)
- p.258 benefits 3-4, bold/italic intro
- p.259 bold/italic usage, families, Futura figure
- p.260 novelty styles, inline
- p.261 ink, script
- p.262 novelty caution, cultural styles
- p.263 type fitting, kerning
- p.264 kerning cont., tracking
- p.265 tracking cont., leading
- p.266 practice 1 choosing typefaces
- p.267 typeface by mood, bold/fat, pixelated
- p.268 pixelated, curly examples
- p.269 bad-typography poster (decorative, no rule content beyond figure caption), practice 2 weights
- p.270 weights cont., too many fonts, size intro
- p.271 sizes and line-height
- p.272 responsiveness, white space
- p.273 white space figure, text space
- p.274 letter-spacing rules, readability figure, practice 4 intro
- p.275 headings and titles figure
- p.276 pull-quote (no extra rule content; restates headings hierarchy)
- p.277 shape and size figure
- p.278 colours figure, practice 5 intro
- p.279 type scale, practice 6 intro
- p.280 colour contrast form figure
- p.281 case and emphasis figures
- p.282 practices 7-8
- p.283 practices 8-10
- p.284 prototyping figure and checklist
- p.285 final sentence on user testing

Audit notes (audit 2026-10-15):
- (audit 2026-10-15) corrected: type-scale rule said "sizes decrease down the list", was that; page shows H1 > H2 > H3 > Subtitle with Subtitle, Body 1 and Button drawn at about the same size (p.279)
- (audit 2026-10-15) observation, not corrected: the white-space rule and Dos row describe the good card as having "a wider gutter"; measured on the image, the text-to-image gutter is about the same in both cards (≈ 11-13 image px); the real differences are paragraph breaks, heading gap, slightly more leading and less copy (p.273).
- (audit 2026-10-15) p.270 prints a stray placeholder sentence under "Do not use too many typefaces and fonts" ("This page could not be loaded. If you have cookies disabled ... please try enabling."); it is a copy error in the book, not content.
- (audit 2026-10-15) p.276 pull-quote is not empty of content: its last sentence "A different color enhances the visual effect" is now captured as a rule.
- (audit 2026-10-15) no rule content: p.252 (chapter intro, "additional swashes" teaser), p.254 and p.257 (pull-quotes restating earlier text), p.255 (benefit 1 restated in core ideas), p.258 (benefits 3-4, already in core ideas), p.269 poster (decorative), p.284-285 prototyping tool mention (Mockplus, Figma) beyond the checklist already captured.
- (audit 2026-10-15) all 35 page images (p.251-285) were viewed; page-image measurements in section 3 are estimates from the rendered pages at 1056 px width.
