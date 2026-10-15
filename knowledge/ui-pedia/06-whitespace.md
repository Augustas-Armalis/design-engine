---
source: ui-pedia
chapter: Whitespace
pages: 114-128
topic_tags: [whitespace, negative-space, spacing, legibility, hierarchy, brand-tone, focus]
status: studied
---

# Whitespace

The chapter defines whitespace, splits it two ways (macro vs micro; active vs passive), lists the factors that decide how much to use, and gives three design considerations (legibility, tone/branding, focus). It gives almost no pixel values: it is a conceptual chapter. All numeric guidance has to come from other chapters; nothing numeric is invented here.

## 1. Core ideas

1. **Whitespace is the canvas.** It is the area between design elements and also between glyphs; it holds the parts together and lets them "stand out" (Mads Soegaard quote, p.114-115, p.116).
2. **It need not be white.** Any colour, texture, pattern or backdrop image can be whitespace; it is any area with no UI element or specific content (p.116, p.127).
3. **Clients under-value it.** Many clients and supervisors see it as waste that could hold more information or graphics; the book argues it is a tool for balancing features and organising content (p.116).
4. **It reduces irritation.** Bombarded users get irritated; whitespace relaxes people and lets them "breathe"; prevents clutter (the kitchen-appliance-manual example) (p.116-117).
5. **Macro vs micro** is classified by density and ratio (p.117): macro = big gaps between main layout pieces and around the layout (container for the whole design); micro = small gaps between lines, paragraphs, grid images, menu links.
6. **Micro whitespace sets legibility**, macro whitespace sets structure and tone (p.118-119, p.124-125).
7. **Active vs passive** (p.123): active whitespace structures the page and leads the reader through content; passive whitespace (between glyphs and lines) just makes it look and read well without directing flow.
8. **Four factors decide the mix:** content, design, user, brand (p.121-122, p.127). There is no universal ratio.
9. **Tone:** lots of macro whitespace reads as minimalism/elegance; little macro whitespace (news sites) reads as informative (p.125).
10. **Focus:** varying whitespace around a feature creates focal points and prioritises it; used in branding and print (p.126).
11. **Google lesson:** early Google.com had so much whitespace that, during user tests on slow connections, users kept waiting for the page to download even though everything was already on screen; designers added a copyright notice at the bottom to signal the page had finished loading (p.118, p.120).

## 2. Rules

- **RULE** Treat whitespace as a content-bearing design element, not leftover. Do not fill empty areas just because they are empty; defend it against "use the space for more information" requests.
  **Why** Whitespace balances design features, organises content and prevents cluttered pages; under information overload users get irritated and bail (call the helpline, per the manual example).
  **Applies to** all. **Check** visual; (as a guard) no section where every region is filled edge to edge. **Source** (p.116, p.117)

- **RULE** Use macro whitespace to organise material in the layout and guide the user through content blocks: page margins to the left and right of the content, and the space between content blocks.
  **Why** It acts as a container for the whole design; large-picture structure.
  **Applies to** landing page, SaaS app UI. **Check** measure outer page margins and inter-section gaps; they should be clearly larger than any in-component gap. **Source** (p.118, p.127)

- **RULE** Use micro whitespace inside design elements: between text lines, between paragraphs, between grid pictures, between menu links, between the image, label, heading and body of a card.
  **Why** It directly drives legibility; the amount of micro whitespace governs reading speed and comprehension.
  **Applies to** all. **Check** line-height, paragraph margin, gap between list/menu items, card internal padding and stacked-element gaps; each should be non-zero and consistent. **Source** (p.119, p.127)

- **RULE** Give card contents room: the book's "good" card has visible padding on all sides and distinct gaps between category label ("Travelling"), headline ("Why Travel the World this year?") and body text; the "bad" card has the label touching the image bottom, text hugging the left/right edges and almost no gaps between label, heading and body.
  **Why** Cramped micro spacing makes the same content look cluttered and harder to scan.
  **Applies to** cards, SaaS app UI, landing page. **Check** card padding > 0 on all sides and consistent; gap label-to-heading, heading-to-body nonzero (the book gives no values; the visual ratio of good card padding to card width is about 8-9%: derived from the figure, about 28px on a 335px-wide card). **Source** (p.114 figure)

- **RULE** As content volume rises, macro whitespace shrinks and micro whitespace must grow; keep the balance so pages are not "solid slabs of data".
  **Why** News and information-dense sites rely on micro whitespace to stay comprehensible (Boulton, 2007); user reading comfort is critical.
  **Applies to** dense UI, news/content pages, dashboards. **Check** in dense layouts compare line-height/paragraph spacing before cutting them. **Source** (p.121)

- **RULE** Choose the macro/micro mix from four factors: content, design (the style the designer chooses), user (demographics, audience research), brand message.
  **Why** The book's explicit list of drivers; there is no universal rule of thumb.
  **Applies to** all. **Check** the brief states audience and brand tone before spacing is chosen. **Source** (p.121-122, p.127)

- **RULE** Do not apply one "ideal" whitespace ratio across audiences; test with the target users.
  **Why** "There is no rule of thumb to apply consistently between audiences"; "They are the only ones who can tell you how they feel about your creations".
  **Applies to** all. **Check** n/a (process). **Source** (p.121-122, p.126)

- **RULE** Use generous whitespace when the brand should signal quality or high budget (the book cites Apple, Mercedes-Benz, IKEA). (opinion)
  **Why** Whitespace use can indicate a company's budget and thus perceived product quality. The book asks "what evidence do they have" rather than proving it.
  **Applies to** landing page. **Check** visual. **Source** (p.122)

- **RULE** Pick the macro amount by tone: large macro whitespace for minimalism and elegance; smaller macro whitespace for sites meant to look informative (news).
  **Why** Whitespace contributes to the overall tone (Kyrnin, 2015).
  **Applies to** landing page, content sites. **Check** visual. **Source** (p.125; softened p.126 "These signs aren't forged in stone")

- **RULE** Make passive whitespace do legibility work: build in space between characters (tracking/kerning), between lines (leading) and between paragraphs. Text with almost none ("crushed and compressed") is "quite difficult to read".
  **Why** Figure comparison, left column of p.123: no whitespace is a wall of text.
  **Applies to** all. **Check** letter-spacing/line-height/paragraph margin not collapsed to zero; see p.123 columns. **Source** (p.123, p.124)

- **RULE** Add active whitespace on top of passive: use gaps, indents, sidebars/pull-outs and pull quotes to guide the reader through a long text, turning the "wall of text" into a navigable layout.
  **Why** Active whitespace improves page structure and leads the user through the information.
  **Applies to** long-form text, articles, docs. **Check** visual: long text has more than uniform paragraph spacing (headings, pull quotes, margin notes). **Source** (p.123-124, p.127-128)

- **RULE** When choosing font, size, colour, style, leading, kerning and tracking, account for the whitespace they create.
  **Why** Micro whitespace is critical to legibility; changing the whitespace arrangement significantly changes reading performance and user experience; happy readers stay on the page.
  **Applies to** all. **Check** n/a (process); computed leading/tracking reviewed with the type choice. **Source** (p.125)

- **RULE** Use whitespace around an element to create a focal point: more space around the thing you want noticed.
  **Why** Prioritising features is strategy; space is one of the visual techniques to draw attention; used in branding and print to focus brand messages.
  **Applies to** landing page hero/CTA, pricing highlights. **Check** visual: key CTA has more clearance than surrounding items. **Source** (p.126)

- **RULE** On a nearly empty page, give a cue that the page is complete (the Google example: a copyright notice at the bottom told users the page had loaded).
  **Why** Users unaccustomed to so much whitespace waited for more content to download.
  **Applies to** minimalist pages, search/home screens. **Check** visual. **Source** (p.120) *(book states what Google did; applying it as a rule is the engine's reading of that story.)*

- **RULE** Remember whitespace can be any colour/texture/pattern/background image; the point is "no UI elements or specific content", not white pixels.
  **Why** Definition.
  **Applies to** all. **Check** n/a. **Source** (p.116, p.127)

### Audit additions (audit 2026-10-15)

- **RULE** When a card feels cramped, keep the card size and buy whitespace by scaling the content down rather than enlarging the card: the book's good card shrinks the image height, label, heading and body all to about 86% of the bad card's (image 175 -> 151 drawn px, heading line 292 -> 252 px wide) and spends the freed space on a text inset of about 28px on a 334px card (about 8%), with the image left full-bleed to the card edges and only the text block inset.
  **Why** Same card, same copy: the only change is type/image scale versus padding, and the padded version reads calmer and easier to scan.
  **Applies to** cards, landing page, SaaS app UI. **Check** card text inset >= about 8% of card width; image edge-to-edge inside the card while text is inset; label/heading/body sizes reduced before the card is enlarged. **Source** (p.114 figure, measured) (audit 2026-10-15)

- **RULE** Inside a card, make the gap below the image equal to the side padding (about 28px in the good card), keep label -> heading (about 22px) larger than heading -> body (about 15px), and leave a slightly larger bottom padding (about 33px).
  **Why** Equal top/side inset makes the text block read as one framed unit; the decreasing inner gaps bind the heading to its body more tightly than to the category label.
  **Applies to** cards. **Check** `padding-left` == gap image-bottom -> label top (+-4px); gap(label, heading) > gap(heading, body); padding-bottom >= padding-left. **Source** (p.114 figure, measured, not stated in text) (audit 2026-10-15)

- **RULE** Set the gaps between stacked text elements (label -> heading, heading -> body) at about twice the gap between lines inside an element: in the book's micro-whitespace figure the label -> heading and heading -> body bands are both about 19px, while the bands between heading lines (about 11px) and body lines (about 8px) are roughly half that.
  **Why** Element gaps must read as separations and line gaps as continuations; if they are equal, label, heading and body merge into one block.
  **Applies to** all (cards, list items, hero copy stacks). **Check** for each text stack, gap between elements >= 1.7 x the leading gap (line-height minus font-size) inside the larger element. **Source** (p.119 figure, measured) (audit 2026-10-15)

- **RULE** In a horizontal media card, let the image take a full-height block of about 43% of the card width and surround the text block with a roughly even field of macro whitespace: about 40px from the image edge, about 40px top, about 43px right, about 50px bottom on a 285px-tall card.
  **Why** The book highlights this even field (light blue) as the macro whitespace that contains the card's content; uneven insets would push the text against one edge.
  **Applies to** cards, list rows with media, landing page feature rows. **Check** text-block insets within +-25% of each other; image width / card width about 0.4-0.45. **Source** (p.118 figure, measured) (audit 2026-10-15)

- **RULE** Give single-purpose pages (search, a single-input start page) extensive macro whitespace so the one task is the only thing in view; the book credits Google's homepage simplicity with "less work for your eyes and mind" so users can "concentrate on the purpose" (to find something).
  **Why** Less clutter lowers visual effort and keeps attention on the one action; pair with the completion cue rule above so the sparse page does not look unfinished.
  **Applies to** landing page, search/home screens, onboarding steps. **Check** visual: one focal control, no competing blocks in the first viewport. **Source** (p.118, p.120) (audit 2026-10-15)

## 3. Numbers & scales

The chapter gives no pixel values. The only numbers are:

| Item | Value | Source |
|---|---|---|
| Boulton citation | 2007, news websites rely on micro whitespace | p.121 |
| Kyrnin citation | 2015, macro whitespace and tone | p.125 |
| Whitespace-influencing factors | 4 (content, design, user, brand) | p.121-122, p.127 |
| Whitespace taxonomies | 2 (macro/micro; active/passive) | p.117, p.123 |
| Design considerations for negative space | 3 (legibility; tone and branding; focus and attention) | p.125-126 |
| Figure-derived (not in text) | good card padding about 8-9% of card width (about 28px on 335px-wide drawn card); bad card padding about 2% | p.114 image |
| Good card spacing (p.114, measured on a 334px-wide drawn card) | side inset about 28px; image bottom -> label about 28px; label -> heading about 22px; heading -> body about 15px; bottom padding about 33px. Bad card: side inset about 5px, image -> label about 5px | p.114 image (audit 2026-10-15) |
| Good vs bad card scale (p.114) | image height 175 -> 151 drawn px; label, heading and body widths all about 0.86 x the bad card's (type about 14% smaller) | p.114 image (audit 2026-10-15) |
| Micro whitespace bands (p.119, measured) | label -> heading about 19px; heading line 1 -> line 2 about 11px; heading -> body about 19px; body line -> body line about 8px. Element gap about 2x line gap | p.119 image (audit 2026-10-15) |
| Macro whitespace card (p.118, measured) | card about 825 x 285 drawn px; image about 352px wide (about 43%); text insets about 40 left (from image), 40 top, 43 right, 50 bottom | p.118 image (audit 2026-10-15) |

## 4. Dos and Don'ts

- **Don't / Do (p.114):** two identical cards (image on top, "Travelling" label in purple, bold headline "Why Travel the World this year?", grey body "If you travel, you will not only learn about foreign cultures, but about your own as well."). Bad (red X): label touches the image, text almost at the card's left edge, headline and body tightly stacked, little bottom padding. Good (green check): label separated from the image, about 28px side padding, clear gaps between label, headline and body, body text slightly smaller.
- **Macro example (p.118):** horizontal card; photo left (about 42%), text on the right. The macro whitespace, shown highlighted in light blue, is the empty field around the text block: padding to the right and above/below the text inside the card (macro = the space around/between the main pieces).
- **Micro example (p.119):** same card with pink bands marking the small gaps: between the "Travelling" label and headline, between the two lines of the headline, between headline and body, and between body lines.
- **Twitter web UI (p.122):** light blue highlights = macro: empty gutters left of the left nav, between left nav / feed / right column, and outer margins around the page; pink highlights = micro: space between nav items, between rows in the feed, between tweet text lines and metadata. Shows both layers coexisting on a dense interface.
- **Text treatments (p.123, three columns of lorem ipsum):** left "No white space applied": tiny, dense single block, hard to read; middle "Passive white space applied": normal leading, paragraph breaks and margins, much easier; right "Passive & active white space applied": same plus a bold side-heading column (pull-out headings), an italic pull quote, and blank-line gaps between paragraphs, giving the reader entry points. Lesson: each layer of whitespace adds legibility, the last adds navigation.
- **Card figure, finer detail (p.114):** the good card does not simply add padding; it shortens the image (about 151 vs 175 drawn px) and sets every text element about 14% smaller, so the same card height holds the same copy with roughly 28px of air on the sides and under the image. In the bad card the purple label sits about 5px under the image and about 5px from the card edge, reading as a caption glued to the photo. (audit 2026-10-15)
- **Twitter overlay, module gaps (p.122):** besides outer margins and column gutters, the blue (macro) bands also mark the gap between stacked modules inside one column: under the "Welcome back / Get started" module before the first tweet, and between the "What's happening" and "Who to follow" boxes in the right column. Pink (micro) bands sit between left-nav items, between the composer field and its icon row, and between the Welcome title and its description. Lesson: macro vs micro is decided by what the gap separates (modules vs parts of one module), not by which column it is in. (audit 2026-10-15)
- **No-whitespace column, precisely (p.123):** the left column's leading is below the font size, so ascenders and descenders of adjacent lines overlap, and the bold heading sits directly on the first body line with no gap; tracking is also tight. This is the "crushed and compressed" failure (p.124). The middle column restores normal leading and line breaks per paragraph but still has no blank-line paragraph gaps; the right column adds blank-line gaps, a narrower main measure with a large bold pull-out set in the freed side column, and an italic pull quote isolated by space above and below. (audit 2026-10-15)

## 5. Exceptions & judgement calls

- The book openly says there is no rule of thumb for the macro/micro ratio and that its tone signals "aren't forged in stone" (p.121, p.126): a news site with tight macro whitespace is legitimate; a luxury brand with generous macro whitespace is legitimate.
- The brand/budget claim (Apple, Mercedes-Benz, IKEA) is an assertion without evidence given (p.122).
- "Increase micro whitespace as content increases" (p.121) can conflict with "keep it minimal": the resolution the book gives is to shrink macro space first, not micro.
- [engine note] Sparse is not automatically good: the Google story shows that a sparse page needs a completion cue, and the active/passive split suggests that purely decorative gaps should be separated from gaps that carry grouping information (see 07-proximity.md).
- [engine note] Because the chapter gives no numbers, the engine's spacing scale (system/) is the right place for concrete values; this note only supplies the principle for where each tier applies.

## 6. Figures worth keeping

- p.114: bad vs good card spacing (the clearest before/after in the chapter).
- p.118: macro whitespace highlighted on a card.
- p.119: micro whitespace highlighted on the same card.
- p.122: macro (blue) and micro (pink) overlay on Twitter web.
- p.123: three-column text comparison: none / passive / passive + active.

Copied to examples/ui-pedia/whitespace/.

## 7. Open questions

- Coverage: p.114-128 all read; p.115 is a full-page quote (no rule content beyond the Soegaard quote); p.128 is two lines ("statement and standing out", end of the passive/active recap); p.127 is the summary recap (four factors, macro for layout, micro inside elements, passive vs active).
- p.119 states "People read more slowly when content appears in margins outside of regular paragraphs. They find it more difficult to comprehend than text with no margins." The sentence is garbled or contradicts the preceding claim that margin whitespace helps; it likely refers to marginal annotations/text in margins. Do not use as a rule; flag.
- p.118 says macro whitespace is "easier to detect" and cites Google.com as the best macro example but the page shows no Google screenshot; no values given.
- The book never quantifies margins, gaps, or ratios (no px/rem or ratio values anywhere in this chapter).
- p.114 is the chapter title page and also carries the bad/good card figure plus the canvas intro text (the chapter spans PDF 114-128).
- (audit 2026-10-15) corrected: section 4 p.123 right-column description said the active version adds "indentation", was "and indentation", page shows no first-line or block indents; the active additions are blank-line paragraph gaps, a bold pull-out in a side column and an italic pull quote (p.123). The section 2 rule's word "indents" is left as written but is not supported by the figure.
- (audit 2026-10-15) Coverage re-check: all 15 page images p.114-128 viewed. The chapter text has no px values; every number added in this audit is measured from the figures on p.114, p.118 and p.119 (drawn px at page scale) and is labelled measured. Pages with no rule content: p.115 (full-page Soegaard quote on a gradient), p.116 (definition and client objection, covered), p.117 (manual example, covered), p.121-122 text (four factors, covered), p.124-127 (recap of figure and three considerations, covered), p.128 (two-line tail of the recap).
- (audit 2026-10-15) Format fix: rules written as `**RULE (qualifier)**` were invisible to `tools/build_index.py` (its opener regex does not accept a parenthesised qualifier inside the bold), so they never reached `system/rules/index.json`. Normalised to `**RULE** <text> (qualifier)`; wording unchanged.
