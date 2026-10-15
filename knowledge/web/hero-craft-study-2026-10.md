---
source: web:live sites by Kargul Studio clients (zeroleaks, runinfra, supermetal, hunt, listkit, rork, uplinq, sideshift, ostium, defendlab, sf-tensor, opero, stardust, amtrades), Lué Studio clients (antimetal, authkit, reflect, dimension, firecrawl), Rico/Ace clients (twin, langdock, blackbox), and sites by Jakub Krehel (interfere, interfaces.dev, jakub.kr), Emil Kowalski (emilkowal.ski, aiforui.dev), Rauno Freiberg (rauno.me, devouringdetails.com), Paco Coursey (paco.me), Raphael Salaja (userinterface.wiki; employer warp.dev), Mariana Castilho (uilabs.dev; employer tryprofound.com), Josh Puckett (graphicalui.com, interfacecraft.dev), Nitish Khagwal (khagwal.com), Steve Schoger (ui.sh), Tobias van Schneider (mymind.com, semplice.com), MDS (shiftnudge.com), Pablo Stanley (hilos.sh), Jim Raptis (brandbird.app), lochie (aave.com, family.co), Flo Hoeller (affectui.com), Jordan Hughes (untitledui.com), plus kargul.studio and lue.studio
chapter: Hero craft from top designers' shipped work: compositions, less-is-more, tiny details, fonts, buttons
pages: n/a (52 live folds captured 2026-10-15 with Playwright Chromium, 1440x900 at DPR 2; 51 kept)
topic_tags: [hero, landing-page, saas, ai-saas, layout, composition, whitespace, less-is-more, details, typography, fonts, buttons, hover, press, nav, spacing-rhythm, measured]
status: studied
---

# Hero craft from top designers' shipped work (2026-10)

Evidence: `knowledge/benchmarks/x-heroes-2026-10/` holds one fold per site (`<slug>-fold.jpg`), the computed-style probe per site (`measure/<slug>.json`), and `CREDITS.md`, which says who made what and how we know. Tags: **[M]** measured from computed styles or pixel statistics; **[P]** read off the 2x capture; **[V]** eyeballed judgement. Kargul, Rico and Basit were already studied (`kargul-*.md`, `heyrico-*.md`, `basit-craft.md`). This note adds what those studies did not have:

1. **The designers' live client sites.** The Kargul study had read client fonts off gallery sheets, "not from client sites" (kargul-deep-study section 7). This note measures 14 of his live clients.
2. **Eight more designers' shipped heroes:** Lué Studio (Oğuz Yağız Kara), Jakub Krehel, Josh Puckett, Tobias van Schneider, Steve Schoger, Pablo Stanley, MDS and Nitish Khagwal. The craft-poster group (Emil, Rauno, Paco, Raphael, Mariana) is measured too, for the less-is-more end of the range.
3. **Explicit "less is more" numbers:** quiet share, copy word counts, the number of units in the fold, and the vertical rhythm.
4. **Hover and press measured as computed-style diffs**, not described from memory.

This note does not repeat `product-heroes.md` (23 big-brand heroes, frame geometry), `type-voices.md` (50 h1s), `button-grammars.md`, `nav-grammars.md`, `light-hero-grammars.md` or kargul-saas-playbook section 5 (dashboard micro-details). Founder rules in `knowledge/founder/founder-taste.md` outrank everything here. Where this data disagrees with them, section 5 says so and the founder rule wins.

## 1. Core ideas

1. **The vertical rhythm is nearly fixed: h1, then about 17, sub, 32, CTA, about 96, product.** These are medians across the designer-made SaaS heroes: h1 to sub 17px (n=30, most 12-24), sub to CTA row 32px (n=25, most 22-38), CTA bottom to the product frame 96px (n=9, range 40-155) [M]. The gaps grow by about 1 : 1.8 : 5.3. Designers make the CTA-to-product gap the biggest gap in the hero, larger than the 60px median of the big-brand heroes (`product-heroes.md`). The extra space is what makes the work look calm.
2. **About 78% of a premium fold is quiet.** The median `quietBlockShare` (16px blocks with luminance std < 4) is 0.78 across 34 SaaS heroes [M]. Personal sites by Emil, Paco, Jakub, Mariana and Raphael run 0.89-0.95 [M]. The busiest heroes (hilos 0.24 wallpaper, untitledui 0.49 collage, blackbox 0.58 log text) put the copy on a solid card or a solid half, so the copy itself still sits on quiet pixels [P].
3. **The copy is short and the CTAs are few.** Median h1 + subtitle = 22.5 words (8-40) [M]. The h1 median is 56px, weight 500 and -0.025em; 24 of 34 are set at 400-500 and only 3 at 700 [M]. The subtitle is 18px (13-24) [M]. One or two CTAs; no designer hero has three primary-looking buttons [M].
4. **Hero CTAs are about 1.2x the nav CTA, or exactly the same.** Nav primaries have a median height of 36px (28-48, n=31) and hero primaries 46px (34-56, n=28) [M]. In 19 paired sites the hero/nav height ratio has a median of 1.23; 5 of the 19 use the identical size in both places (zeroleaks 44/44, uplinq 38/38, amtrades 40/40, sf-tensor 40/40, profound 32/32) [M].
5. **A rounded-rectangle CTA uses a radius of 0.17-0.28 of its height (median about 0.23).** Measured: 8/36, 8/40, 10/36, 10/40, 12/50, 14/50, 14/52, 8/44, 8/46 [M]. Pills are 12 of 28; radius 8-14 is 13 of 28; sharp 0-4 is 3 of 28 [M].
6. **Hover moves alpha or lightness by one step and never changes the size.** 15 primaries were diffed. Eleven only change fill: alpha .95→.80 (interfere), 1→.88 (zeroleaks), 1→.86 (antimetal), or a lightness step of roughly ±8-10 L (aave #252228→#3b383e, family #171717→#121212, opero oklch .696→.596, listkit #288dff→#1e6abf) [M]. Only sideshift lifts, by 1px with a bigger shadow. Only uplinq and warp change hue (cyan ring; ink→electric blue) [M]. Press is scale 0.98-0.992 or a second alpha step (interfere .80→.714) [M].
7. **The serif is back as a SaaS display voice, at 400-500, in about one hero in six.** Six of 34 SaaS h1s are serifs: antimetal (Test Signifier 54/400), twin (Sebenta 58/500), mymind (Louize 140/400), hilos (custom 48/400), sf-tensor (system Georgia 56/400) and interfacecraft (Signifier 50/400) [M]. All of them are text-weight serifs with calm contrast, not Didones. That fits the founder's rejection of Bodoni-class luxury.
8. **One device per headline, and the device is usually colour on one word.** runinfra puts a green highlighter block on "agents", firecrawl turns "clean web data" orange, listkit makes "1,000" and "immediately" blue, opero colours its third line green, and profound places an inline Claude glyph [P]. ui.sh and shiftnudge use a two-tone sentence instead, merging h1 and sub into one paragraph: ink first sentence, grey continuation [M spanColors]. No hero stacks two devices.
9. **Proof sits under the CTA as a quiet line, not a wall.** Examples: "14 days free. Cancel anytime." (sideshift), "7-day free trial · No credit card required" plus "4.6 from 397 reviews · 100k users · 3M agents built" (twin), "Built in Rust and Apache Arrow" (supermetal), "Trusted by 3,000+ brands" with only the number bold, then a greyscale logo row (sideshift) [P].
10. **Studios make each client different on purpose.** Within Kargul's 14 live clients, the h1 faces are Geist, Inter, Chakra Petch, TWK Lausanne, DM Sans, Manrope, SF Pro and Georgia. CTA shapes are pill, r8, r10, r14, chamfered r0 and square r0 [M]. This is the founder's range rule as practised by the studio he rates highest.

## 2. Rules

IDs are HC-xx. Each "Source" names the measured sites.

### 2.1 Composition and rhythm

- **RULE [HC-01]** Space the hero copy on the 18 / 32 / ~96 rhythm: h1 to sub 12-24px, sub to CTA 28-36px, and CTA bottom to the product or visual 80-110px. If the fold is tight, cut the 96 to no less than 64 (the founder minimum) before you touch the 18 or the 32.
  **Why** The gaps must grow down the stack so that the copy reads as one block and the product as the next block. The designer medians are 17/32/96 [M]; when the gaps are equal, the hero reads as a list.
  **Applies to** landing page. **Check** `sub.top - h1.bottom` in [12, 24]; `cta.top - sub.bottom` in [28, 36]; `frame.top - cta.bottom` in [64, 110]. **Source** aave 12/32, kargul 18/36, zeroleaks 16/36/98, warp 18/27/96, amtrades 12/32/100, uplinq 22/22/86, sftensor 16/28/131 [M]

- **RULE [HC-02]** With nothing between the nav and the h1, use the founder's 80-90px gap as the default. Go down to 50-60px only for very large centred type (64px or more), and up to 120-180px only when the visual sits beside the copy rather than under it.
  **Why** The designer gaps spread from 52 to 268px, median 122 (n=17) [M]. The tight ones are big-type centred heroes (sideshift 52, supermetal 55, sf-tensor 56, defendlab 74) where the type carries the air. The loose ones are splits or heroes with the product below the fold (antimetal 180, twin 183, rork 208, hilos 268). Product-under-copy heroes cluster at 84-144 (warp 84, mymind 86, zeroleaks 88, amtrades 120, interfere 144). The founder rule (80-90) sits in that cluster and wins.
  **Applies to** landing page. **Check** `h1.top - nav.bottom`. **Source** 17 heroes with no eyebrow (section 3.2) [M]

- **RULE [HC-03]** Keep at least 70% of the fold quiet (16px blocks with luminance std < 4), and aim for 75-85%. If the art is busy (a wallpaper, a collage, a log), put the copy on a solid surface: a white card, a solid half, or a plain band.
  **Why** The median is 0.78; the founders' "less is more" verdicts and the designer folds converge there. The three busy exceptions all buy back calm behind the text: hilos puts the copy in a white card r24 with a 3px border and 40px padding; untitledui keeps a solid left half; blackbox holds a solid black band above its window.
  **Applies to** landing page. **Check** pixel probe `quietBlockShare >= 0.70`, or the copy box sits on a solid fill. **Source** 34 SaaS folds [M]; hilos, untitledui, blackbox [P]

- **RULE [HC-04]** Keep h1 + subtitle at 12-30 words and the h1 at 3-8 words. Over 30 words, cut the subtitle first.
  **Why** The median is 22.5 words (8-40) [M]. The heroes over 30 (opero 40 words with a 4-line sub, ostium 33) are the ones that look most like templates in the set [V].
  **Applies to** landing page. **Check** word count of h1 + first sub. **Source** 30 SaaS heroes [M]

- **RULE [HC-05]** Count the units in the hero, excluding the nav. Five is the calm default: h1, sub, CTA pair, one proof line, one visual. Seven is the ceiling. An eighth unit must replace one of the others.
  **Why** The calmest heroes are interfere, zeroleaks, antimetal and langdock at 5 units, sideshift, kargul and supermetal at 6, and twin at 7 [V]. Listkit has 9+ (chip, h1, sub, 2 CTAs, link button, micro line, stats row, booking widget, chat bubble) and reads as a sales page, not a designed hero [V].
  **Applies to** landing page. **Check** visual count of distinct blocks below the nav (an announcement strip counts). **Source** section 3.6

- **RULE [HC-06]** End the hero with the product or visual, set off by the largest gap. A floating object (orb, phone trio, logo hub) may sit in that gap, but only one object, centred on the copy axis.
  **Why** Reflect (orb under the copy, framed app from y697), stardust (globe in a node ring), supermetal (logo hub with integrations either side) and aave (phone trio) each use one object between the CTA and the fold [P].
  **Applies to** landing page. **Check** at most one non-UI object between the CTA and the frame. **Source** reflect, stardust, supermetal, aave [P]

### 2.2 Headline and type

- **RULE [HC-07]** Set the SaaS h1 at 48-72px, weight 400-550, tracking -0.02 to -0.05em, leading 1.0-1.1. Go above 72px only when the type is the visual (mymind 140, semplice 145, khagwal's wordmark).
  **Why** The medians are 56px, weight 500, -0.025em and 1.07 leading (n=34) [M]. Heavy weights appear only on rotators and brand-loud sites (listkit 600, hunt 600, opero 700, brandbird 700) [M].
  **Applies to** landing page. **Check** computed h1 size, weight, `letter-spacing / size`, `line-height / size`. **Source** section 3.4 [M]

- **RULE [HC-08]** Turn on the face's alternates on the display line: Inter cv01/cv05/cv11/ss03, Geist "salt" or the face's ss sets. Use `text-wrap: balance` on the h1.
  **Why** Designers ship these settings and template sites do not: aave cv11, interfere ss03, profound cv01 cv05 ss03, aiforui cv01 ss03, kargul.studio "salt" [M]. `text-wrap: balance` is set on 12 of 34 h1s and `pretty` on 2 [M].
  **Applies to** landing page. **Check** `font-feature-settings` is not `normal` on an Inter or Geist h1; `text-wrap` is `balance` or `pretty`. **Source** aave, interfere, profound, aiforui, kargul [M]

- **RULE [HC-09]** Mute the subtitle by giving it the h1 colour at 60-70% alpha, or a light weight (300) at full ink. Do not use a separate grey hex.
  **Why** Alpha keeps the subtitle in the h1's hue family on any ground. Measured: aave 0.65, antimetal 0.7, ostium 0.7, profound 0.6, supermetal 0.6, uplinq 0.7, warp 0.62. Langdock and uplinq use 18/300 under a 500 h1 [M].
  **Applies to** landing page. **Check** sub colour = h1 colour with alpha 0.55-0.72, or sub weight <= 350. **Source** aave, antimetal, ostium, profound, supermetal, uplinq, warp, langdock [M]

- **RULE [HC-10]** A serif h1 in SaaS is a text-weight serif (400-500, moderate contrast) at 48-60px with tracking -0.01 to -0.04em, paired with a neutral grotesk UI (Inter, Geist). Never a Didone.
  **Why** All six serif heroes follow this pattern: antimetal Signifier 400 with Geist, twin Sebenta 500 with Inter, hilos custom 400 with Geist, sf-tensor Georgia 400 with Inter, interfacecraft Signifier 400 with the system font, mymind Louize 400 [M]. The founder rejected the Bodoni costume (founder-taste 86).
  **Applies to** landing page. **Check** serif h1 weight <= 500, size 48-60 (unless type-as-visual), body family is a grotesk. **Source** antimetal, twin, hilos, sftensor, interfacecraft [M]

- **RULE [HC-11]** Use one headline device at most, and prefer colour on one word or a one-word highlighter block over gradients.
  **Why** runinfra, firecrawl, listkit and opero colour one word or line; profound uses one inline glyph; none uses a gradient fill [P]. Two devices on one line (brandbird's coloured rotator plus Inter 700 plus a 3-line h1) read as a template [V].
  **Applies to** landing page. **Check** count of distinct h1 span colours plus inline images plus background-clip <= 2 colours, with 1 device. **Source** runinfra, firecrawl, listkit, opero, profound [P]

### 2.3 Buttons

- **RULE [HC-12]** Size the hero primary at 40-52px tall, label 14-16px at weight 500, padding 16-24px horizontal. A rounded rectangle gets radius ≈ 0.2-0.28 × height; otherwise use a full pill.
  **Why** The median height is 46 (34-56) and the label median 14-16 at 500 [M]. Radius/height ratios for non-pill CTAs: aiforui/hunt/reflect 0.22, stardust 0.2, zeroleaks 0.18, untitledui 0.17, amtrades/sf-tensor 0.25, twin 0.24, defendlab 0.27, opero 0.28, firecrawl 0.28 [M]. The founder's Kaching spec (14/44 = 0.32) sits at the soft end.
  **Applies to** landing page. **Check** height in [40, 52]; radius / height in [0.17, 0.32] or pill. **Source** section 3.5 [M]

- **RULE [HC-13]** Make the hero CTA either about 1.2x the nav CTA's height or exactly the same height. Never make it smaller than the nav button.
  **Why** The paired median ratio is 1.23 and 5 of 19 sites are identical (section 3.1) [M]. A one-step jump says "this is the main action" without shouting.
  **Applies to** landing page. **Check** hero primary height / nav primary height in {1.0} ∪ [1.15, 1.5]. **Source** kargul 54/42, sideshift 52/44, langdock 43/35, zeroleaks 44/44, uplinq 38/38 [M]

- **RULE [HC-14]** Hover changes only fill alpha or lightness, by one step (alpha -0.07 to -0.15, or about 8-10 OKLCH L), over 120-200ms with an ease-out curve. Press adds scale 0.98-0.99 or a second alpha step. No lift on light heroes unless the brand's button is physical.
  **Why** 11 of 15 diffed primaries do exactly this; durations are 100-200ms (family 100, interfere/zeroleaks/opero/listkit 150, affectui 180, antimetal 200) with curves `cubic-bezier(0,0,.2,1)`, `(.23,1,.32,1)`, `(.22,1,.36,1)` [M]. Press: aave scale .9915, affectui .992, sideshift .98, interfere alpha .80→.714 [M].
  **Applies to** all. **Check** hover diff touches only background/opacity, and the transform is none; press transform scale in [0.98, 0.995]. **Source** section 3.7 [M]

- **RULE [HC-15]** Give a paired CTA row a reason for its widths: either equal widths (min-width on both), or natural widths with matching padding. Never make the secondary visibly wider than the primary by accident.
  **Why** Equal or near-equal pairs are common: zeroleaks 190/190, stardust 161/161, uplinq 138/139, listkit 173/174, untitledui 193/190 [M]. Where widths differ, the primary is the longer label (kargul 151/142, twin 177/155).
  **Applies to** landing page. **Check** |w1 - w2| <= 2px, or the primary is wider, or the padding is identical. **Source** zeroleaks, stardust, uplinq, listkit, untitledui, kargul, twin [M]

- **RULE [HC-16]** A one-line reassurance sits 12-20px under the primary, at 13-14px in sub colour: price/trial terms or one fact ("Built in Rust and Apache Arrow"). Use one line only; never pair it with a stat row and a logo wall in the same fold.
  **Why** sideshift, twin, opero and supermetal do this; it answers the objection right at the button [P].
  **Applies to** landing page. **Check** at most one text line directly under the CTA row, at 12-14px. **Source** sideshift, twin, opero, supermetal [P]

### 2.4 Nav

- **RULE [HC-17]** Keep the nav track 52-82px tall (median 68.5 [M]), links 13-15px at 400-500 with 6-14px horizontal padding, and one filled action. The other actions are text or a ring.
  **Why** Measured link sizes: 13 (interfere, affectui, twin, runinfra), 14 (most), 15 (family, sideshift, sf-tensor); link padding `0 8px` (interfere), `0 11px` (affectui), `6px 14px` (antimetal), `12px 16px` (sf-tensor) [M].
  **Applies to** landing page. **Check** nav box height in [52, 82]; link font-size in [13, 15]; exactly one filled nav button. **Source** section 3.1 [M]

- **RULE [HC-18]** When the nav is a pill or capsule, consider splitting it into separate objects that match the layout: links capsule left, logo capsule centre, actions capsule right (antimetal, in liquid glass with `backdrop-filter: blur(2.6px) saturate(1.8)` and an SVG displacement filter). Or move the nav into the product stage (dimension floats it at the bottom of the hero stage).
  **Why** These are new nav grammars not in `nav-grammars.md` and they break the "white pill left" sameness the founder complained about [M/P].
  **Applies to** landing page. **Check** DIRECTION.md names the nav grammar; it differs from the last build. **Source** antimetal, dimension [M/P]

### 2.5 Visual and proof

- **RULE [HC-19]** When the product is data (an API, infra, a model host), the hero visual can be one live chart at about 560x280 with three KPI cells under it, set beside left-aligned copy. Do not add a dashboard.
  **Why** runinfra shows a scatter of models (speed vs price) with one highlighted model in a ring badge plus "140 tok/s · $0.01 / 1M · 76.6% cache hit". It proves the claim in one look with about 20 marks [P].
  **Applies to** landing page. **Check** visual is one chart plus at most 3 KPIs; units are muted and smaller than the values. **Source** runinfra [P]

- **RULE [HC-20]** Frame the hero visual like a figure when the brand is technical: a caption "[ fig. 1 — the factory ]", a 1px frame, and mono rail labels. Or set the product inside the page rails with small square ticks where the rails cross.
  **Why** warp (figure caption, vertical "WARP · HOME · 2026" rail text, a 32px inner pad, r6) and zeroleaks (square ticks at the rail intersections around the dashboard) turn the product into a document, which reads as rigorous [P].
  **Applies to** landing page. **Check** visual: either a figure caption or rail ticks, not both. **Source** warp, zeroleaks [P]

- **RULE [HC-21]** For a busy art layer (an illustrated wallpaper, a photo, a node field), put the copy in one solid card at r20-24 with 32-40px padding. Inside it: a mark, the h1, the sub, the CTA pair and a micro line. Nothing else in the fold.
  **Why** hilos does this over a black-and-white character wallpaper (card 672x444, r24, 3px ink border, padding 40) [M]. Only the card reads, so the busy wallpaper becomes brand texture.
  **Applies to** landing page. **Check** copy card has a solid fill; quiet share inside the card >= 0.9. **Source** hilos [M]

## 3. Numbers & scales

### 3.1 Per-site hero measurements (1440x900) [M]

`h1` = size/weight/tracking em/leading; `gaps` = h1→sub / sub→CTA / CTA→frame (px); `CTA` = height × radius, label size/weight; `quiet` = quietBlockShare; `sat` = saturated pixel share.

| Site (designer) | Nav h | h1 face | h1 | h1 top y | Align | Sub | Gaps | Hero CTA | Nav CTA h | quiet | sat |
|---|---|---|---|---|---|---|---|---|---|---|---|
| zeroleaks (Kargul) | 81 | Geist | 48/500/-.024/1.14 | 169 | centre | 16/400, 2 lines | 16/36/98 | 44 × r8, 14/500; pair 190/190 | 44 | .78 | 0 |
| runinfra (Kargul) | 60 | Inter | 56/500/-.025/1.08 | 223 | left | 16/400, 2 lines | 28/–/– | rect r0 lime "Get an API key ›" [P] | 40 | .77 | .020 |
| supermetal (Kargul) | 72 | Chakra Petch | 64/500/-.03/.94 | 127 | centre | 17/500, 2 lines | 20/38/– | 52 × r0 chamfered, 16/500 | 38 | .84 | .015 |
| sideshift (Kargul) | 76 | Geist | 72/550/-.035/1.10 | 128 | centre | 22/400, 2 lines | 20/32/140 (logos) | 52 pill, 16/600 | 44 | .82 | 0 |
| uplinq (Kargul) | 116* | TWK Lausanne | 66/500/-.02/1.04 | 204 | centre | 18/300, 3 lines | 22/22/86 | 38 pill, 13.5/400 | 38 | .83 | .003 |
| defendlab (Kargul) | 77 | Inter Display | 70/500/-.06/1.05 | 151 | centre | 20/500, 2 lines | 18/49/– | 52 × r14, 20/500 | 41 | .78 | .007 |
| sf-tensor (Kargul) | 81 | Georgia (system serif) | 56/400/-.035/1.06 | 137 | centre | 16/420, 2 lines | 16/28/131 | 40 × r10, 14/510 | 40 | .69 | .050 |
| amtrades (Kargul) | 72 | Inter Variable | 56/400/-.054/1.14 | 192 | centre | 18/400, 2 lines | 12/32/100 | 40 × r10, 12/400 | 40 | .82 | .011 |
| opero (Kargul) | 69 | SF Pro (system) | 56/700/-.025/1.10 | 232 | left | 18/400, 4 lines | 24/32/– | 50 × r14, 14/600 | 36 | .75 | .040 |
| stardust (Kargul) | 73 | Manrope | 63/400/-.02/1.05 | 176 | centre | 18/400, 1 line | –/74/– | 40 × r8, 16/400 | 32 | .79 | .137 |
| ostium (Kargul) | 60 | Manrope | 38.75/500/-.02/1.06 | 206 | left | 20/400, 4 lines | 23/36/– | 48 × r0 gradient, 16/400 | 32 | .73 | .013 |
| listkit (Kargul) | 109* | DM Sans | 72/600/-.06/1.05 | 239 | centre | 14-ish, 2 lines | –/–/– | 56 pill, 18/600 | 48 | .68 | .099 |
| hunt (Kargul) | – | Inter | 80/600/-.04 | 384 | centre | 2 lines [P] | – | 36 × r8 [P] | 36 | .64 | .025 |
| kargul.studio | 54 | Geist | 52/700/-.03/1.07 | 209 | centre | 16/500, 3 lines | 18/36/– | 54 pill, 15/700 | 42 | .84 | 0 |
| antimetal (Lué) | 76 | Test Signifier | 54/400/-.037/1.10 | 256 | left | 24/400 serif, 3 lines | 32/82/– | 46 pill, 14/500 + dashed secondary | 33 | .86 | 0 |
| firecrawl (Lué) | 100* | Suisse | 60/500/-.005/1.07 | 362 | centre | 16/400, 2 lines | 16/26/– | 36 × r10, 14/450 | 32 | .79 | .043 |
| reflect (Lué) | – | Aeonik Pro | 72/500/0/1.11 | 221 | centre | 16/400, 2 lines | 12/32/268 (orb) | 36 × r8 | – | .78 | .126 |
| dimension (Lué) | nav at bottom | Geist | 48/500/0/1.0 | 104 | left column | 14/400 bullets | – | 38 pill | – | .80 | .574 |
| twin (Rico) | 53 | Sebenta (serif) | 58/500/-.03/1.02 | 276 | centre | 16/400, 2 lines | 28/28/312 | 50 × r12, 16/500 | 28 | .85 | .014 |
| langdock (Rico) | 52 | STK Bureau Sans | 52/500/-.04/1.10 | 172 | centre | 18/300, 2 lines | 12/32/76 | 43 pill, 14/400 | 35 | .81 | .001 |
| blackbox (Rico client) | 65 | Berkeley Mono | 80/500/-.015/.95 | 149 | left | 14/500 mono | –/–/40 | 50 pill, 13/700 caps +0.78px | 36 | .58 | .001 |
| interfere (Krehel) | 64 | InterVariable | 56/500/-.01/1.0 | 208 | left, CTA right | 15 right column [P] | –/–/52 | 32 × r8, 13/500 | 28 | .72 | .002 |
| profound (Castilho employer) | 32 | Inter Variable | 48/500/-.0225/1.17 | 216 | centre | 18/400, 2 lines | 16/32/112 | 32 × r8, 14/500 | 32 | .76 | .001 |
| warp (Salaja employer) | 64 | Azeret Semi Mono | 54/400/-.037/1.05 | 148 | left | 16 mono, 1 line | 18/27/96 | 34 × r4, 12/500 caps +0.6px | 32 | .69 | .005 |
| hilos (Stanley) | 83 | custom serif | 48/400/-.01/1.05 | 351 | centre in card | 14/400, 2 lines | 16/28/– | 49 pill, 14/600 | 33 | .24 | 0 |
| mymind (van Schneider) | 87 | Louize (serif) | 140/400/-.06/.85 | 173 | centre | 20 with inline chips | 4/–/– | platform pills [P] | 42 | .76 | .035 |
| aave (lochie employer) | 82 | Aave Repro | 72/550/-.05/1.10 | 232 | centre | 20/400, 1 line | 12/32/72 | 48 pill, 17/500 | 32 | .77 | .002 |
| family (lochie ex) | 94 | Family (custom) | 68/500/-.02/1.10 | 221 | centre | 17/500, 2 lines | 6/22/– | 48 × r32 (pill), 17/500 | 33 | .74 | .091 |
| affectui (Hoeller) | 68 | Inter | 46/500/-.03/1.13 | 296 | centre | 16/400, 2 lines | 0/28/– | 42 pill, 14/500 | 28 | .82 | .001 |
| untitledui (Hughes) | 56 | Inter | 44/600/-.02/1.25 | 452 | left, bottom | 18/400, 3 lines | 16/–/– | 46 × r8, 16/600 | 39 | .49 | .018 |
| aiforui (Kowalski) | – | Inter | 48/575/-.025/1.08 | 276 | centre | 20/400, 2 lines | 24/48/– | 36 × r8 in email capsule | – | .92 | .005 |
| interfacecraft (Puckett) | 64 | Signifier | 50/400/-.025/1.0 | 194 | centre | 18/400, 2 lines | 24/–/– | none (Login only) | 32 | .84 | .107 |
| ui.sh (Schoger) | 69 | InterVariable | 36/500/-.025/1.22 two-tone | 149 | left | merged into h1 | – | none | 28 | .65 | .002 |
| shiftnudge (MDS) | 49 | Söhne | 36/400/-.02/1.14 two-tone | 289 | left | merged into h1 | – | 51 × r4 caps [P] | 31 | .89 | .105 |

\* = the nav box includes an announcement strip. `–` = not applicable or not reliably measured.

### 3.2 Medians (designer-made SaaS heroes) [M]

| Measure | Median | Range | n |
|---|---|---|---|
| h1 size | 56 px | 38.75-140 | 34 |
| h1 weight | 500 | 400 (8) · 500 (16) · 550 (2) · 575 (1) · 600 (4) · 700 (3) | 34 |
| h1 tracking | -0.025 em | -0.06 to 0 | 34 |
| h1 leading | 1.07 | 0.85-1.25 (excluding mis-read rotators) | 34 |
| h1 characters | 34.5 | 5-72 | 32 |
| h1 top y | 212 | 104-452 | 34 |
| nav bottom → h1 top (no eyebrow) | 122 | 52-268 | 17 |
| subtitle size | 18 px | 13-24 | 33 |
| h1 → sub | 17 px | 0-32 (most 12-24) | 30 |
| sub → CTA | 32 px | 22-131 (most 22-38) | 25 |
| CTA → product frame | 96 px | 40-155 | 9 |
| product/visual top y | 544 | 372-860 | 13 |
| hero CTA height | 46 px | 34-56 | 28 |
| nav CTA height | 36 px | 28-48 | 31 |
| hero/nav CTA ratio | 1.23 | 1.0-1.79 | 19 |
| CTA label | 14-16 px @ 500 | 12-20 @ 400-700 | 28 |
| nav box height | 68.5 px | 32-94 (strips excluded) | 26 |
| h1 + sub words | 22.5 | 8-40 | 30 |
| quiet share | 0.78 | 0.24-0.92 | 34 |
| saturated pixels | 1.3% | 0-57% (dimension photo sky) | 34 |
| distinct font sizes in fold (below nav) | 5 | 2-9 | 34 |
| section padding (sections with padding) | 96 px | 56-144 | 12 sites |

Section padding values measured [M]: warp 56, listkit 80, opero 80, hilos 96, twin 96/112, interfere 96/120/144, affectui 112, blackbox 112, ostium 112, authkit 120, sideshift 64-112. The 96 median agrees with `section-anatomy.md`.

### 3.3 Hero composition catalogue (20 distinct compositions)

Positions are px at 1440x900. Each layout was measured where marked [M]; otherwise it was read off the capture [P].

| # | Composition | Layout (px) | Seen on | What makes it work |
|---|---|---|---|---|
| C01 | **Split header row over a bleeding app** | h1 left x120 y208 w444 (56/500, 2 lines); sub + CTA pair right-aligned to x1320 on the same band (CTA y288, 32px); app frame x172 y372 w1384 r8, bleeding right and bottom; a pastel wash bleeds in behind the frame's left edge [M] | interfere (Krehel) | The copy takes 150px of height, so the app gets 528px of the fold. Calm because every element sits on one of two edges |
| C02 | **Centred stack, dashboard inside rails with corner ticks** | h1 centre y169 w672 (48/500); equal CTA pair 190×44 at y379; dashboard from about y521, bounded by 1px rails with square ticks at the crossings; KPI strip with hairline cell dividers [M/P] | zeroleaks (Kargul) | Dark, almost no colour (sat 0), and the rails carry the frame instead of a shadow |
| C03 | **Left copy + one live chart** | eyebrow "Backed by [Y] Combinator" y~105; h1 x164 y223 w435 (56/500) with a green highlighter on one word; chart x716 y125 560×280 with a ringed highlight point; 3 KPI cells under the chart [M/P] | runinfra (Kargul) | The data proves the claim; no dashboard |
| C04 | **Serif editorial left + generative particle field right** | three glass capsules as nav (links / logo / actions, r82); h1 serif x120 y256 one line (54/400); sub 24/1.2 serif, 3 lines; ink pill 46 + dashed-border secondary with corner brackets at y515; canvas particle constellation over the right half [M] | antimetal (Lué) | Warm grey ground #d0d0d0 [M], one ink colour, and the field is the product idea (autonomous system) |
| C05 | **Copy card on an illustrated wallpaper** | full-bleed b/w character pattern; white card x384 y228 672×444, r24, 3px ink border, padding 40; inside: mark, h1 48/400, sub 14, two 49px pills, micro line; nav pill 559×51 with 2px ink border [M] | hilos (Stanley) | The busiest fold in the set (quiet .24) still reads, because only the card holds information |
| C06 | **Centred stack + device trio** | app badge eyebrow; h1 one line 72/550 -0.05em y232; sub 20 one line; 48px lavender pill; three phones from y~500, the centre one in front, cut by the fold [M/P] | aave (lochie employer) | One line of h1 and one of sub leave the phones half the fold |
| C07 | **Centred serif + orbiting avatars** | announcement strip 40; h1 Sebenta 58/500 y276; sub 16; yellow 50 r12 + white 50 r12 with ▶; micro line; rating row; faint concentric rings carrying 7 avatar and app-logo tiles around the copy; product frame starts y860 [M/P] | twin (Rico) | Warm paper ground, one yellow; people imply "employee" without a product shot |
| C08 | **Poster serif + chip sentence** | h1 Louize 140/400 lh .85 -0.06em, 2 lines, w1300; the sub sentence holds coloured outline chips for each noun; 3 platform pills; app video frame from y734, r12; one huge pastel halo circle behind [M/P] | mymind (van Schneider) | The type is the visual; the chips turn the subtitle into a product demo |
| C09 | **Mono figure frame** | h1 Azeret mono 54/400 left x154 y148, 2 lines; mono sub one line; caps CTAs 34 r4 at y332; figure frame x188 y462 1064×447 r6, caption "[ fig. 1 — the factory ]", a live grid of task squares; vertical rail labels [M/P] | warp | Reads as a technical paper; colour only in the live squares |
| C10 | **Framed-sheet split with screenshot glow** | inset nav inside a gridded sheet (x80 y24 w1281 h60); h1 left x80 y206 (38.75/500); sub 20, 4 lines; square gradient CTA r0 48; product screenshot x697 y179 w663 with a soft orange glow; investor wordmarks strip [M] | ostium Gateway (Kargul) | A small h1 is fine when the screenshot is the hero |
| C11 | **Mono statement + encrypted log window** | caps eyebrow with a coloured square; h1 Berkeley Mono 80/500 lh .95 left x88 w1264, 2 lines; one caps pill CTA 50 with an arrow; window frame x88 y419 1264×608 r12 holding a log with ENCRYPTED / NOT ENCRYPTED toggle chips over a photo strip [M] | blackbox (Rico client) | The toggle chip is the proposition, shown as UI |
| C12 | **Centred stack + one glowing object, product behind** | chip eyebrow; h1 72/500 centre y221; two 36px buttons; a violet orb under the CTAs; app frame from y697 r24 with an 8px inset ring [M] | reflect (Lué), stardust (Kargul: globe in a node ring with 4 metric cards) | One light source, then the product |
| C13 | **AI composer as the hero product** | h1 60 centre; composer field about 840×60 under the sub with Build / Model selectors and a mic; platform segmented tabs (iPhone / Android / Web) below; phone cut by the fold [P] | rork (Kargul), firecrawl (Lué: composer with Search / Scrape / Map / Crawl tabs and an orange arrow button, plus a grid with crosshair marks) | The first action happens inside the hero |
| C14 | **Sentence with inline tiles, no subtitle** | the h1 is one sentence 48/500 with chips or icons inline for each noun ("systems", "Aa type", "Cursor"); only Changelog and Login in the nav [P] | graphical (Puckett) | The headline demonstrates the product; nothing else is needed |
| C15 | **Index column + stage** | left column 416px: eyebrow, h1 48/500, 4 icon bullets, pill CTA, then a numbered feature index 01-07 (rows 40px, r10, active tinted); right: a big stage on a photographic sky; nav as a floating pill at the stage bottom [M] | dimension (Lué) | Tabs and hero merged; the nav moves into the product world |
| C16 | **Split copy + phone with floating event chips** | eyebrow chip; h1 56/700 3 lines, the last line green; sub 4 lines; two 50 r14 CTAs; check-marked trust row; phone right x1340, with 4 small event cards stacked down its left side [M/P] | opero (Kargul) | Chips say what the agent did while you slept |
| C17 | **Two-tone paragraph + card grid** | one paragraph h1 36/500: ink sentence + grey continuation (x248 w944); straight into a 3-column grid of black cards (304×384 r16) with mono labels and line illustrations [M] | ui.sh (Schoger), shiftnudge (MDS, dark, 36/400) | Lets the catalogue be the hero |
| C18 | **Bottom-aligned left copy + isometric collage right** | copy bottom-left (h1 y452, 44/600) with an avatar + rating row and three equal CTAs; right half an isometric tilted collage of product screens bleeding off top and right [M/P] | untitledui (Hughes) | The collage is busy; the copy half stays plain |
| C19 | **Dark centred + integration hub** | h1 Chakra Petch 64/500 centre; chamfered CTAs 52; proof line; a central logo block with source tiles in columns left and right joined by faint lines [M/P] | supermetal (Kargul) | Shows "sync" as topology; one orange |
| C20 | **Light centred over circuit rails + tool row + product floor** | h1 70/500 -0.06em 2 lines y151; sub 20/500 at 60% alpha; 52 r14 pair; a row of 7 integration icons in circles; product frame from about y940 rising out of a green gradient floor; circuit lines in the background [M/P] | defendlab (Kargul) | A circuit motif tied to "runtime" behind calm type |

Also seen, outside SaaS: **giant mega-type poster** (semplice 145/400 lh .76 on full-bleed yellow; khagwal's wordmark across the full width under a 60/400 two-line statement); **centred narrow-column personal site** (Emil, Paco, Jakub: one ~640px column centred at x≈400, 14-16px text at 1.65-1.75 leading, no images, quiet .89-.95) [M].

### 3.4 Fonts actually shipped (h1 face, weight, size, tracking; companions) [M]

| Class | Sites (h1 tuple) | Companions shipped |
|---|---|---|
| Inter family (10) | interfere InterVariable 56/500/-.01 ss03; runinfra 56/500/-.025; defendlab Inter Display 70/500/-.06; amtrades 56/400/-.054; profound 48/500/-.0225 cv01 cv05 ss03; untitledui 44/600/-.02; affectui 46/500/-.03; aiforui 48/575/-.025 cv01 ss03; hunt 80/600/-.04 (Inter Tight loaded); brandbird 44/700/0 | Berkeley Mono, Departure Mono and Heldane Text (interfere); Geist Mono (hunt) |
| Geist (4) | zeroleaks 48/500/-.024; sideshift 72/550/-.035; kargul.studio 52/700/-.03 "salt"; dimension 48/500/0 | Geist Mono; TWK Lausanne (sideshift logo) |
| Licensed or custom grotesk (7) | aave Aave Repro 72/550/-.05 cv11; family Family 68/500/-.02; langdock STK Bureau Sans 52/500/-.04; uplinq TWK Lausanne 66/500/-.02; firecrawl Suisse 60/500/-.005; reflect Aeonik Pro 72/500/0; semplice Maison Neue 145/400/-.051 | IBM Plex Mono + Doto (uplinq); Geist Mono + Roboto Mono (firecrawl); LFE Sans (family) |
| Free grotesk (3) | listkit DM Sans 72/600/-.06; stardust Manrope 63/400/-.02; ostium Manrope 38.75/500/-.02 | Instrument Sans body (ostium) |
| Serif, text weight (6) | antimetal Test Signifier 54/400/-.037; twin Sebenta 58/500/-.03; mymind Louize 140/400/-.06; hilos custom 48/400/-.01; sf-tensor Georgia 56/400/-.035; interfacecraft Signifier 50/400/-.025 | Geist + Geist Mono (antimetal, hilos); Inter + Ioskeley Mono (twin); Inter + Geist Mono (sf-tensor) |
| Mono display (2) | warp Azeret Semi Mono 54/400/-.037; blackbox Berkeley Mono 80/500/-.015 tabular | theFuture + Matter (warp); Darker Grotesque + Archivo (blackbox) |
| Tech display (1) | supermetal Chakra Petch 64/500/-.03 | Chakra Petch everywhere |
| System SF Pro (2) | opero 56/700/-.025; rork 60/600/0 | none loaded |

Body copy across the set: 13-24px, median 16-18, leading 1.4-1.75 [M]. Interfere runs 13/20 body under a 56 h1 (the dense-product register); antimetal runs 24/1.2 serif (the editorial register).

### 3.5 Buttons actually shipped (hero primary / secondary) [M unless noted]

| Site | Primary | Secondary | Hover | Press | Transition |
|---|---|---|---|---|---|
| zeroleaks | 190×44 r8, #fafafa on black, 14/500, pad 8/20 | 190×44 r8 black, 1px #141414 border | fill → 88% alpha | – | 150ms (.23,1,.32,1) |
| interfere | 71×32 r8, rgba(0,0,0,.95), 13/500, pad 0/12 | white, 0.5px 6% ring stack | .95 → .80 | → .714 | 150ms (0,0,.2,1) |
| sideshift | 237×52 pill, ink + 103° white sheen gradient, 16/600 -0.32px, shadow 0 2 3 .24 | – | translateY(-1px), shadow 0 3 6 .22 | scale .98 | 150ms (.22,1,.36,1) |
| kargul.studio | 151×54 pill, #232323, 15/700 -0.12px, pad 18/24 | 142×54 pill white | – | – | 300ms (.76,0,.24,1) |
| aave | 215×48 pill, lavender p3, 17/500 -0.17px | text pill, 5% ink fill | #252228 → #3b383e (nav) | scale .9915 | 150ms |
| affectui | 138×42 pill, gradient #323137→#201e25 + 1px #0d0d0d ring + 0 2 4 10% | 115×42 pill, 4% ink fill | gradient lightens ~10 | scale .992 | 180ms (.22,1,.36,1) |
| antimetal | 135×46 pill, #1a1614, 14/500 | 186×48 pill, 1px dashed 26% ink, corner brackets [P] | → 86% alpha | – | 200ms (.4,0,.2,1) |
| family | 210×48 r32, #171717, 17/500 -0.22px | 198×48, #f6f4ef warm fill | → #121212 | – | 100ms |
| opero | 238×50 r14, oklch(.696 .17 162) green, 14/600 | 205×50 r14 white, 1px border | L .696 → .596 | – | 150ms (.4,0,.2,1) |
| listkit | 173×56 pill, #288dff, 18/600 -0.54px | 174×56 pill, #f8f9fa | → #1e6abf | – | 150ms |
| twin | 177×50 r12, #ffda40, 1px 10% ink border, 16/500 | 155×50 r12 white, 3-layer hairline shadow, ▶ | label opacity .9 | – | 200ms (.4,0,.2,1) |
| defendlab | 156×52 r14, ink gradient #1f1f1f→#1c1917, 20/500 -0.4px | 141×54 r14 white, 1px #efefef | – | – | 200ms |
| sf-tensor | 153×40 r10, blue gradient #4a82fc→#034ef2, 14/510 | 159×40 r10 white | – | – | 150ms |
| uplinq | 138×38 pill white on #080808, 13.5/400 + ↗ | 139×38 pill, 3% white + 1px #181818 | → #dffdfe + 2px cyan ring + 28px glow; arrow exits (9,-9) | – | 180ms / shadow 240ms |
| supermetal | 160×52 r0 chamfered (clip) orange, 16/500 | 118×52 r0 chamfered, 5% white | → rgb(255,104,17) | – | 400ms (.7,0,0,1) |
| warp | 193×34 r4 ink, 12/500 caps +0.6px | 218×34 r4 white, 1px 10% ink | ink → #2a1eff electric blue | – | 150ms |
| stardust | 161×40 r8, violet gradient + inset glow -8px 16px + 1px top highlight | 161×40 r8, 1% white + violet inset rims | (filter) | – | 250ms (.645,.045,.355,1) |
| reflect | 206×36 r8, 1px border on dark | chip 175×32 r32 with inset violet glow | inset glow .12 → .24 | – | 450ms (.6,.6,0,1) |
| profound | 102×32 r8 white, 14/500 | 100×32 r8 #333 | opacity → .7 | – | 200ms |
| untitledui | 193×46 r8 white, 1px #d4d4d4 + inset -2px 5% skeuo bottom | Buy now #7f56d9 (nav) | → #fafafa | – | 200ms linear |
| blackbox | 158×50 pill #f2f2f0, 13/700 caps +0.78px + ↗ | – | (filter) | – | 200ms |
| ostium | 191×48 r0, orange gradient to right | – | – | scale (100ms ease-out) | 100ms |
| hilos | 181×49 pill #141510, 14/600 | 222×49 pill, 2px ink border | (filter) | – | 120ms (.16,1,.3,1) |

### 3.6 Less-is-more counts (units in the hero below the nav) [V]

| Units | Sites | Read |
|---|---|---|
| 3-4 | graphical (h1 + logo + changelog), interfacecraft (h1, sub, card fan), aiforui (h1, sub, email capsule, byline) | Product as manifesto; works when the headline demonstrates the product |
| 5 | interfere, zeroleaks, antimetal, langdock, sf-tensor | The calm default: h1, sub, CTA pair, one visual (+ nothing) |
| 6 | sideshift (h1, sub, CTA, micro line, trust line, logos), kargul.studio (chip, h1, sub, CTAs, logos), supermetal (h1, sub, CTAs, proof line, hub), aave, uplinq | Adds exactly one proof element |
| 7 | twin (strip, h1, sub, CTAs, micro, rating row, avatar ring), defendlab (h1, sub, CTAs, icon row, product, circuit bg), runinfra, hilos | The ceiling; each extra is small and muted |
| 8+ | firecrawl (banner, chip, h1, sub, CTA, connect pill, composer, grid marks), opero, listkit (9+) | Reads busy or sales-led [V] |

## 4. Tiny details that make it look professional (not in kargul-saas-playbook section 5)

1. **Equal-width CTA pairs**: zeroleaks 190/190, stardust 161/161, uplinq 138/139, listkit 173/174, untitledui 193/190 [M].
2. **A hero CTA one step above the nav CTA** (about 1.23x), or identical. Never a random height in between [M].
3. **Hover by alpha**: an ink button at .95 that drops to .80 on hover and .714 on press (interfere). Two steps, no colour change [M].
4. **Press scale .98-.992**: sideshift .98, affectui .992, aave .9915 [M].
5. **A sheen inside the ink pill**: a 103° linear gradient from transparent to 14% white across a black pill, with a 0 2px 3px 24% shadow (sideshift) [M].
6. **A gradient ink button with a 1px darker ring and a 2px soft drop**: affectui's #323137→#201e25 plus `0 0 0 1px #0d0d0d, 0 2px 4px rgba(0,0,0,.1)` [M].
7. **Asymmetric nav-button padding to fit a kbd hint**: interfere "Sign up D" uses padding `0 6px 0 10px`, so the key glyph sits closer to the right edge [M].
8. **A dashed-border secondary with corner brackets** (antimetal "Explore the research": 1px dashed at 26% ink) [M/P]. A technical "draft" read for an R&D link.
9. **Chamfered CTA corners** on an infra brand (supermetal, r0 + diagonal clip on two corners) [P].
10. **The subtitle as the h1 colour at 60-70% alpha**, not a grey hex (aave .65, antimetal .7, profound .6, supermetal .6) [M].
11. **Subtitle at weight 300** under a 500 h1 (langdock 18/300, uplinq 18/300) for contrast without grey [M].
12. **Font features on display type**: Inter cv01/cv05/cv11/ss03, Geist "salt" [M].
13. **`text-wrap: balance`** on 12 of 34 h1s, `pretty` on 2 [M].
14. **Global tabular numerals** where numbers appear: blackbox sets tabular-nums on 1,515 elements, sideshift 284, runinfra 72 [M].
15. **Units muted and smaller than values** in hero KPIs: "140 tok/s", "$0.01 / 1M", "76.6% cache hit" (runinfra) [P].
16. **Only the number is bold** in a trust line: "Trusted by **3,000+** brands" (sideshift) [P].
17. **A middle-dot micro line** under the CTA: "7-day free trial · No credit card required" (twin) [P].
18. **A figure caption on the hero visual** "[ fig. 1 — the factory ]" plus vertical rail labels (warp) [P].
19. **Square ticks where the rails cross**, around the product frame (zeroleaks) [P].
20. **A live availability chip with a pulsing dot**: "Accepting 3 more projects for Q4 2026", dot scale 1→2.28 while fading (kargul.studio) [M].
21. **Inline noun chips in the subtitle**, each a different soft colour outline (mymind: notes, bookmarks, inspiration, articles, images) [P].
22. **A one-word highlighter block** that starts a few px before the word and ends after it (runinfra's lime block on "agents") [P].
23. **The nav split into three separate glass capsules** with a liquid-glass SVG filter (antimetal) [M].
24. **An announcement strip** as its own thin band, not a pill above the h1: firecrawl (an orange 32px bar inside the container), uplinq (a 40px mono caps strip "NEW · ... READ IT"), twin and kargul.studio [M/P].
25. **A greyscale logo row with the edge logos fading out** under the CTA instead of a "trusted by" grid (sideshift; Replit fades at the left) [P].

## 5. Exceptions & judgement calls

**Less-is-more decision rules** ([engine note], from the counts above):

- **Start at 5 units** (h1, sub, CTA pair, one visual, nothing else). Add a unit only if it answers a question the visitor has at the button: price or trial terms gets the micro line; "is this real?" gets a proof line or a logo row; "what does it do?" gets the visual. Stop at 7.
- **Remove in this order when the fold is crowded:** the announcement chip above the h1 (already a founder rule), the second proof element, the third subtitle line, the secondary CTA's icon, background texture near the copy. Never remove the visual's air (CTA → visual ≥ 64px) or shrink the h1 first.
- **Add instead of remove when the hero reads "empty":** the founder's split-hero round 3 called a bare title/sub/buttons hero "too empty". The designers fill it with substance, not decoration: runinfra's 3 KPI cells, opero's check-marked trust row, twin's rating row. One quiet row of facts, never a second visual.
- **Busy art needs a solid island:** if quiet share drops under 0.70 because of art, put the copy on a card (hilos) or keep one half plain (untitledui).
- **Colour budget:** median 1.3% saturated pixels. The high-colour heroes are photo or wallpaper led (dimension sky .57, stardust .14, reflect .13, listkit .10) [M]. Keep a product-led light hero under 3%.

**Conflicts with founder rules (the founder wins):**

- **Title Case** (founder rule 3): most designer h1s are sentence case (interfere, zeroleaks, twin, antimetal, runinfra, sf-tensor) [M]. Keep Title Case for our builds.
- **No full stop** (founder 20): many designer h1s end with a full stop (antimetal, twin, sideshift, kargul.studio, aiforui-style statements) [M]. Keep no full stop.
- **Secondary text-only, no play icon** (founder 38): twin and family use ▶ "Watch video" secondaries [P]. Keep ours text-only.
- **Frame top at or above about 510px** (founder 106): the designer median is 544 [M]. Ours is the stricter rule because the founder wants enough product in the fold. The designers' extra air (the CTA → product gap of 96) is still worth copying: get it by tightening the copy block, not by pushing the product lower.
- **Hero CTA 44px** (founder 34/119): the designer median is 46. Consistent.
- **Kaching button radius 14 at 44** (ratio 0.32) is softer than the designer median (about 0.23). Both are inside the measured range; keep the founder value when the product UI is soft, as the founder rule says.

**Where the data is noisy:** rotator h1s (brandbird, rork, stardust, hunt) mis-report the line count. The CTA → frame gap exists only where a framed product sits under the CTA (n=9).

## 6. Figures worth keeping

All in `knowledge/benchmarks/x-heroes-2026-10/`:

- `interfere-fold.jpg`: C01 split header row; the calmest product hero in the set.
- `zeroleaks-fold.jpg`: C02 rails with corner ticks, equal CTA pair, sat 0.
- `runinfra-fold.jpg`: C03 chart as hero, highlighter word, muted units.
- `antimetal-fold.jpg`: C04 serif editorial plus particle field, three-capsule glass nav, dashed secondary.
- `hilos-fold.jpg`: C05 copy card on a busy wallpaper.
- `twin-fold.jpg`: C07 serif, warm paper, avatar ring, micro line, rating row.
- `mymind-fold.jpg`: C08 poster serif with chip sentence.
- `warp-fold.jpg`: C09 mono figure frame.
- `blackbox-fold.jpg`: C11 mono statement with a toggle-chip window.
- `sideshift-fold.jpg`: sheen pill, micro line, bold-number trust line, fading logo row.
- `supermetal-fold.jpg`: chamfered CTAs, integration hub.
- `dimension-fold.jpg`: C15 index column, nav inside the stage.
- `emil-fold.jpg`, `paco-fold.jpg`, `jakub-fold.jpg`: the extreme less-is-more register (quiet .89-.95).

## 7. Open questions

- **Attribution:** live sites are credited to the studio that lists them (`CREDITS.md`). They may have been changed by in-house teams since. For twin and langdock, Rico's scope may be product UI only. Warp, Profound, Aave and Family are employers of the named designers, not proven individual work.
- **X timelines of the new designers** (Oğuz, Nitish, MDS, Josh Puckett) were not read post by post. Only bios came from api.fxtwitter.com. Their posted concept heroes (as opposed to shipped sites) are not in this study.
- **Motion was not recorded.** Load-in timelines, rotators and the orb, particle and composer animations are visible only as single frames. Next step: `tools/record.mjs` on interfere, antimetal, reflect, sideshift.
- **Mobile folds were not captured.**
- **Banners and overlays still visible:** aave, brandbird, langdock (consent overlay dims the fold, so its quiet and colour numbers are off), ostium, rork, runinfra.
- **Unresolved names:** Mason Yarnell, "Arnav", Mohamed Hassan and "Dimi / Spectrum" could not be resolved to a designer with public SaaS hero work (search and fxtwitter handles returned unrelated people), so they are not in the study.
- **Measured but not deeply studied:** the hunt h1 is split into per-letter spans, so its line count and box are unreliable. The firecrawl h1 sits at y362 because an announcement bar and a 100px sticky nav precede it.
