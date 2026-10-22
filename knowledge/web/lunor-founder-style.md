---
source: web:https://lunor.design (founder Augustas's Figma library; designs by @AugustasDesign, @_heyrico and 14 other verified designers)
chapter: Lunor founder style (heroes, bentos, product UI, the site itself)
pages: n/a (338 library designs, 11 site pages, crawled 2026-10-22)
topic_tags: [hero, bento, typography, spacing, buttons, nav, backgrounds, product-ui, founder-taste, measurement]
status: studied
---

# Lunor: the founder's own style, measured

The founder: "fully study all of the designs from lunor.design (they're mostly mine, and Rico's) ... study bentos from it as well, and all that's my style stuff ... you'll see the hero varieties and what's good." This note turns that library into numbers and rules. It is evidence of the founder's taste, so it outranks generic web studies. Canon pages still decide; section 9 lists where they disagree with this evidence, as proposed edits.

## 0. Corpus and method (read before trusting any number)

**What Lunor is.** A paid Figma library (338 designs on 2026-10-22, public JSON at `/api/designs`, `/api/profiles?adminOnly=true`). Each design is one preview image plus a Figma clipboard payload that needs Premium. Authorship comes from the `created_by` field:
- the founder (@AugustasDesign): 150 designs (98 heroes, 8 dashboards, 18 components, 9 branding objects, 6 buttons, 6 bentos, 5 pricing, 3 footers, plus FAQ, testimonial and waitlist sections);
- Rico (@_heyrico): 80 designs (54 dashboards, 9 components, 5 bentos, 2 heroes, 2 mobile);
- @j_kyorov: 57 designs;
- 13 other designers: 51 designs.

The founder's "Biggest rule" page says designs can be used freely if you customise the design, copy and colours, or credit "Lunor". The engine studies them and never ships one box for box.

**Originals and scale.** The preview `image_url` is the uploaded original (Supabase public object, no transform). All 338 were downloaded to `knowledge/benchmarks/lunor/<category>/img/<handle>__<slug>.webp`.
- **Every original is exactly 1440 wide** (frames of 1440x890, 960, 1024 and so on). These are 1x exports. No 2x originals exist.
- Export scale was checked against a known 1px line: in the Cluno hero the product frame edge is one pixel of `#e7e7e7` at x=220 and the top edge is one pixel at y=558. **1 image px = 1 CSS px.**
- The files are lossy WebP (19 MB for all 338). Colours are good to about ±2 levels and edges to about ±1px.

**Site captures.** These are at `knowledge/benchmarks/lunor/site/<page>/fold@2x.png` and `full@1x.png`:
- home, library, library?category=hero, library?category=bento, pricing, big-rule, designer, career, contact, request-design, and one detail page (Vectorly).
- No cookie banner was shown, and no forms were touched.
- Each detail-page visit POSTs a view counter, so only one detail page was opened. The other 337 designs came straight from the API.
- The DOM and computed styles are in `site/dom-home.json`.

**How heroes were measured (all 127 heroes, 98 of them the founder's).** Method scripts are in `knowledge/benchmarks/lunor/method/`.
1. **Text lines:** macOS Vision OCR gives the text lines.
2. **Ink box per line:** an ink analyser (`ink.py`) measures each line's left and right ink edges, ink top, baseline, x-height top, colour and coverage.
3. **Font solving from line widths** (`render.mjs`, `solve.py`):
   - each h1 line's OCR text is rendered in 99 font/weight candidates (Inter display and text cuts, Geist, DM Sans, Manrope, Plus Jakarta, Inter Tight, Aspekta, Satoshi, Switzer, General Sans, SF Pro, Figtree, Poppins and others);
   - size comes from the ink ascent ratio, and tracking from the leftover width;
   - candidates are ranked on x-height ratio, ink area (weight) and tracking plausibility.
4. **Overlay check:** the top 10 candidates, each at 3 size variants, are rendered at the solved size and tracking in the hero's own colours, and pixel-diffed against the original (`verify.py`).
   - A best mean grey error of 17 or less is "trusted". 44 founder heroes and 56 heroes overall pass.
   - `method/font-solve-check.png` shows original and solved render pairs for 10 heroes. They overlay letter for letter.
   - The failures are heroes whose h1 shares a line with a serif-italic word or sits on a photo, or where OCR misread the line. Those heroes are classified by eye only.
5. **Calibration** on known renders: Inter display 550/58/-0.045 was solved as 58.6/-0.048; Geist 500/64/-0.04 as 64.0/-0.040; Inter text 400/56/-0.03 as 56.2/-0.032. SF Pro was not recovered reliably (it was confused with Inter Tight and Manrope), so treat the SF Pro labels as "an SF-like grotesk".
6. **Gaps** are reported in two ways:
   - **optical** (ink to ink, or box to ink, as seen in a screenshot);
   - **CSS estimate**, using line boxes built from the solved font's ascent and descent and the measured line pitch.
   - The CSS estimate is what `getBoundingClientRect` gates compare against.
7. **Buttons and chips:** boxes are found by scanning out from the text until the fill or ring ends. Radius is fitted to the corner profile and checked by eye on 6x zooms.

**Outputs:**
- `classification.tsv` (all 338: file, project, kind, layout family, theme, author, views, copies, note, measured h1);
- `hero-measurements.tsv` (127 heroes, with a trusted flag);
- `designs-api.json`;
- contact sheets in `knowledge/benchmarks/lunor/sheets/`: `heroes.jpg`, `bentos.jpg`, `product.jpg`, `branding.jpg`, `sections-other.jpg`.

## 1. Core ideas

1. **Polish is fixed; the brand world varies.** Across 98 founder heroes the type tuple, rhythm and button scale barely move: h1 ~54px, 2 lines, sub ~18px in 2 lines, CTAs ~40 tall, 9 apart. What changes from brief to brief is the font family, the layout family, the background world and the light or dark mode (51 light, 47 dark). This matches his own description: "mostly playing with fonts, layouts, bg colours, roundness, but always professional, sleek and consistent".
2. **The headline is medium-sized and medium-weight.** The trusted median is 53.7px (IQR 50.9-60.4). 70% of weights are 400-500, and 450 is the most common. Tracking is moderate (median -0.030em) and leading is open (pitch about 1.2x size). He gets confidence from air and from a strong visual, not from a heavy, crushed headline.
3. **Tight copy block, wide air around it.** The sub hugs the h1 (optical 31, CSS about 13). The CTAs sit clearly lower (optical 48, CSS about 42). The product or proof sits about 90 below the CTAs. Copy reads as one tight unit floating in space.
4. **The subtitle is short and narrow.** It is 2 lines in 39 of 41 heroes, with a median width of 372px (IQR 345-411) at about 18px. That is roughly 45-55 characters per line, hand-broken into two balanced phrases.
5. **Every fold has a world.** Each hero carries one signature background idea, never a flat page. Examples:
   - light rays or glass streaks, a lavender halo arch, frosted keycap tiles over a gradient, silk ribbons;
   - bevelled dark arches, light beams, planet-horizon glows, a dither dot field;
   - a radial line burst, an embossed mark, a cinematic photo.

   This is the "signature visual concept" the cadence-hero r2 verdict asked for.
6. **Product is real and cut by the fold.** In the centred product family (25 of 98), a full app frame 1000-1100 wide starts about 560px down and runs off the bottom. It shows real-looking data at the same detail as his dashboards (KPI row, chart, table).
7. **Buttons are small, compact and tactile.**
   - CTAs are 40 tall (IQR 39-43) with radius about 9-11 (rounded rect) or full pills (r 20-22). They come as a pair 9px apart.
   - The primary is ink with a gradient or a bottom rim. The secondary is white or ghost with a hairline.
   - Nav buttons are about 36 tall.
8. **Bento cells are tight, and full of product.** Grid gaps are 12px. Cells are filled with real UI fragments cropped by the cell edge, or with soft monochrome 3D objects. Titles are weight 500 with grey descriptions. There is no iso line art in his bentos.
9. **Rico is the product layer.** Rico's 54 dashboards are the app-density reference. The founder's own 8 dashboards follow the same grammar with his touches: an inset white panel on a grey canvas, icon-tile KPI cards and ink + violet bar pairs. Rico's style itself is in `heyrico-deep-2026-10.md`.

## 2. Hero varieties (layout families, founder's 98)

Families come from visual classification (`classification.tsv`, column `subkind_or_layout`). Numbers come from trusted measurements where they exist; n is the trusted count. "Recent" means the 27 dated uploads (Aug 2025 to Feb 2026). The 71 from 2025-07-31 were a bulk upload of older work.

| Family | Count (light) | Recent | What it is | Measured (median) | Exemplars (most viewed or copied) |
|---|---|---|---|---|---|
| **C-PROD**: centred copy over the product | 25 (17) | 9 | Centred chip? + h1 + sub + 2 CTAs, then a full app frame (1000-1100 wide, top ~535-615) cut by the fold, on a tinted light stage or a dark glow | h1 53.7 (n10), ink top 200, sub 19 (by ascent), h1→sub 30 opt, sub→CTA 48 opt, CTA→frame 79-103 | Modula (203 views, 72 copies), Stacker, Chrona, Outflux, Cluno, Classior, Mailo, Auto-AI |
| **LEFT-TEXT**: left copy on a signature field | 17 (4) | 10 | h1 block on the left third (x ≈ 95-120), the right side and bottom given to a field: light beam, tilted wallet dashboard, embossed logo, silk ribbons, frosted tiles, diagonal file cards. Often a logo row bottom-left | h1 53.8 (n10), ink top 188, sub 17.9, h1→sub 29, sub→CTA 49 | Vectorly (newest), Syntara, Forma, Orbit, Layere, Flowela, Folderly |
| **C-STAGE**: centred copy over an object or light scene | 13 (1) | 4 | No app frame. The visual is a scene: bevelled arch frames, a planet horizon, glass light streaks, an icon arc, a 3-step process strip. Mostly dark | h1 57.1 (n6), ink top 236 (sits lower), h1→sub 31.5, sub→CTA 51.5 | Ressoul (shown on the Lunor home), Senture, Nexar, SeoPilot |
| **C-MEDIA**: centred copy over media cards | 10 (6) | 1 | A row of photo or video tiles, or a single video card, under the copy | h1 58.6 (n2), ink top 162 | Astrel, Briefly, Cloud, Outlined |
| **SPLIT-PHOTO** | 8 (7) | 0 | Left copy, right rounded photo panel (r ~24) with stat chips or cards | h1 51.6 (n6), h1→sub 35 | Cohere, Skiley, Bupup, Growth View |
| **SPLIT-PROD** | 5 (2) | 3 | Left copy, right app panel (often tilted or bleeding off the right) | h1 50.1 (n2) | Tandem, Archain, Orren |
| **SPLIT-TOP** | 3 (1) | 1 | Copy top-left (or h1 left and CTAs right), with a dashboard across the full width below | h1 55.1 (n2) | Inkflow, Datawheel |
| **PHOTO** | 4 (2) | 0 | Full-bleed cinematic photo, often in an inset rounded frame, with a serif-italic accent word and a glass nav | not trusted (photo) | Altego, Outride, Chill House |
| **Singletons** | 13 | 2 | C-COMPOSER (Admint), C-CARD (Enerjoy), C-CARDS (Caldy, 89/700 Geist), C-OBJECT (Postly envelope), C-WIDGETS (Copywiz), SPLIT-STAGE (Luminor line burst), SPLIT-ART (Super Side ribbed glass), SPLIT-EDITORIAL (Flowforge), SPLIT-BOTTOM (Sublytic), C-PRODUCT-PHOTO (iShop, Phoneria), SPLIT-PRODUCT-PHOTO (Wirelesa), C-DEVICE (Babylonflow) | | |

What makes each family good:

**C-PROD**
- One frame, real data, cut by the fold, nothing floating over it.
- The stage behind it is coloured. Examples: Modula's lavender arch halo behind the copy, Outflux's blue gradient stage holding the app, and Chrona's blue light rays.
- In Stacker, a faded wordmark logo row ("Integrated with the best") sits about 53 below the CTAs, and the frame comes after it.

**LEFT-TEXT**
- The right two-thirds is not empty: it holds the signature field.
- The h1 sits high (ink top 136-206) with a tight sub.
- The CTAs are small (35-40).

**C-STAGE**
- Dark scenes lit from an object, never blobs. Examples: Nexar's bevelled arches, Trackify and Moony's horizons, Ressoul's process strip.
- The h1 sits lower (ink top ~236) to make room for the scene above and around it.

**Every family**
- Two lines of h1, two lines of sub, two CTAs.
- There is always a fourth element: chip, logo row, product, stats or a scene.

## 3. Numbers and scales

### 3.1 Hero type and rhythm (founder, trusted n=44 unless noted)

| Measure | Median | IQR (p25-p75) | Range | Note |
|---|---|---|---|---|
| h1 size | **53.7px** | 50.9-60.4 | 44-67 (89 Caldy) | 2 lines in 41/44 |
| h1 weight | **450** (mode) | 450-600 | 400-700 | 400: 5, 450: 14, 500: 12, 550: 1, 600: 9, 700: 3 |
| h1 tracking | **-0.030em** | -0.040 to -0.019 | -0.068 (Modula) to +0.009 | |
| h1 line pitch / size | **1.20** | 1.10-1.22 | 0.99-1.31 | Figma "auto" (~1.2) or 110% |
| h1 ink top (y of cap/ascender top) | 199 | 182-225 | 136-277 | CSS box top ≈ ink top − 12 |
| h1 colour | light: near-black `#000`-`#19191b`; dark: `#fff` | | | contrast median 18.5:1 (light), 19.7:1 (dark) |
| sub size | **~18px** | 17.4 (width-solved, t=0) / 18.3 (ascent-solved) | 15-20 | true value 17-18, slight negative tracking |
| sub lines / pitch | 2 / 1.4 | 1.3-1.5 | | 39/41 two lines |
| sub width | **372px** | 345-411 | 129-546 | narrow measure |
| sub colour | light ≈ `#686a6b` on `#fefefe` (5.2:1); dark ≈ `#b3b3b7` on `#0b0b0c` (8.6:1) | | | |
| h1 → sub | **31 optical / 13 CSS** | 27-33 / 11-16 | | baseline to sub ascender top |
| sub → CTA top | **48 optical / 42 CSS** | 47-54 / 42-48 | | |
| CTA → next element | 92 (direct to product) | 79-103 | 119-168 with a logo or tab row between | logo row ~53 under the CTAs |
| chip → h1 | **32-37 optical / ~22-25 CSS** | 30-41 / 18-28 (n12 auto) | | probes: Modula 36, Nexar 32, Classior 29, Stacker ~30 |
| Element above h1 | 32/98 founder heroes (chip, rating or avatar row, sparkle mark) | | | C-PROD 12/25, C-STAGE 7/13, LEFT-TEXT 6/17, recent 9/27 |
| Logo row in fold | 26/98 | | | faded mono wordmarks |

### 3.2 CTAs and chips

| Part | Measured | Material |
|---|---|---|
| Hero CTA height | **40** (IQR 39-43, range 34-48) | Modula 41, Senture 43, Vectorly 37, Nexar 41, Cluno 40, Chrona 39 |
| Hero CTA radius | **11** (IQR 9-16). Two clusters: rounded rect r 8-11, or full pill r 20-22 (Senture, Cluno, Forma, Nexar, Ressoul, Layere, Auto-AI) | |
| CTA gap | **9** (IQR 9-13) | |
| CTA width | 147 (IQR 131-172) | text 15-17px, side padding ~22-26 |
| Primary (light) | ink `#1b1a1d`-`#2b2b2b` | either a vertical gradient (Vectorly `#2b2b2b`→`#181818` plus a 1px `#585858` top light) or a flat body with a 1px dark outer ring and a lighter bottom inner rim (Modula `#29`→`#3c` over the bottom 4 rows): keycap tactile |
| Secondary (light) | white `#fafafe`, barely graded | 1px tinted ring or soft tinted drop (Modula ring `#d4d5ee` lavender, Vectorly a pink glow shadow), text only, no icon or a small chevron |
| Primary (dark) | flat white `#fdfdfd` pill or rounded rect | 1px dark outer edge |
| Secondary (dark) | `#141414`-`#201b28` fill + hairline ring | |
| Chip above h1 | 29-32 tall | either a rounded rect r ~7 holding an inner white "New" tag plus tinted text (Modula: ring `#d3d3e5`, text indigo), or a pill with a small icon (Nexar: fill `#131313`, ring `#232323`; Stacker: fill `#edeef9`, ring `#cbc9e7`, indigo text) |

### 3.3 Nav (founder heroes, n=88 with 3+ nav rows)

| Part | Measured |
|---|---|
| Link size | ascent 12 → ~15-16px, grey; the active link is ink and often sits in a tinted capsule (Cluno, Stacker, Nexar) |
| Vertical position | link baseline ~55 (nav centre ~y 45-50) |
| Content edges | wide (x ≈ 64-120 to 1320-1376) or contained (x ≈ 220-240 to 1200) |
| Nav CTAs | **36 tall** (IQR ~33-39), r ~11 or pill. Usually a pair: white or ghost "Log in" plus ink "Sign up" |
| Container | about 70% plain links on the page; about 25% inside a hairline-ringed rounded bar (Modula, Stacker, Cluno, Boostly: 1070-1100 wide, r ~14, `#f9f9f9` fill) |

### 3.4 Product frame in heroes (C-PROD)

| Hero | Frame top | Frame width | CTA→frame |
|---|---|---|---|
| Cluno | 558 | 1000 | 95 |
| Modula | 545 | 1070 (white bezel, r ~24, nested inner panel) | 84 |
| Stacker | 588 | 1100 | 143 (logo row between) |
| Mailo | 557 | 1191 | 103 |
| Auto-AI | 535 | 986 | 92 |
| Classior | 484 | 900 | 92 |
| Insightly | 567 | 1002 | 79 |
| Atlaso | 614 | 958 | 119 |

The visible product height is 280-350px (31-39% of an 890 fold). The frame content is a real dashboard, often the founder's own "Lunor" dashboard (Stacker and Cluno reuse it).

### 3.5 Fonts (trusted n=44, founder)

| Family | Count | Typical tuple |
|---|---|---|
| Inter, display cut (opsz auto) | 9 | 450-550 / 49-67 / -0.02 to -0.044 (Senture 67/450/-0.042, Cluno 60/550/-0.030) |
| Inter, text cut (opsz 14) | 6 | 450-500 / 48-59 / -0.044 to -0.068 (Modula 54/500/-0.068) |
| Manrope | 7 | 500-600 / 44-63 / -0.03 (Ressoul 56/500/-0.031) |
| Inter Tight | 4 | 400-600 / 49-54 / ~0 |
| Aspekta (installed on the founder's machine) | 4 | 450-500 / 51-54 / -0.015 to -0.024 (Outflux, Chrona, Asaro, SeoPilot) |
| Plus Jakarta Sans | 3 | 500-700 / 45-63 |
| Geist | 3 | 400-700 / 56-89 / -0.036 to -0.046 (Vectorly 56/450/-0.046) |
| Switzer, Poppins | 2 each | |
| Satoshi, Figtree, DM Sans, SF-like | 1 each | |

Serif-italic accent words (an Instrument Serif-like italic for one word of the h1) appear in 12 of 98 heroes: Altego, Crownsite, Webby, Outride, Fast Fun, Flowforge, Outlined, Quantum Media, Woodling, Yasser VFX, Tweroid and others, mostly PHOTO and agency briefs. A two-tone h1 (second line grey, or a white-to-grey gradient) appears in about 5 (Nexar, Moony, Pluno; Rico's Zenus).

### 3.6 The Lunor site itself (DOM, `site/dom-home.json`)

| Token | Value |
|---|---|
| Font | DM Sans variable (100-1000), one family |
| Page | `#000`; surfaces `#141415`; rings `#222225` (1px); deeper wells `#0b0b0c` |
| h1 | 48 / 550 / -0.05em (-2.4px) / lh 1.2, white; sits at y 208 beside a product preview |
| Sub | 18 / 450 / -0.03em / lh 1.5, `#afafb6` |
| h2 | 30 / 550 / -0.035em / lh 1.2 |
| Chip | 35 tall, r 11, `#141415` + `#222225` ring, a count cell ("16+") split by a hairline from the text |
| Hero CTAs | 44 tall, r 12: white primary (18/500) and `#141415` secondary with a chevron |
| Nav | 48 tall bar with a hairline bottom; search field 400x39 r 10 centred; "Sign In" white 34 r 10 and "Get access" `#141415` 36 r 10 |
| Cards | r 14 (library and feature cards), r 16 (steps), r 18 (pricing); the Lifetime card uses a `rgba(255,255,255,.25)` ring plus a white 4% outer ring |
| Category chips | 16/500 `#666670`, r ~11 |
| Motion | colour and background transitions 150ms `cubic-bezier(0,0,.2,1)`; no scroll animation; keyframes only for the spinner and toasts |

## 4. Bento grammar (founder 6, Rico 5, others 4)

| Bento | Grid (px) | Gap | Cell radius | Surface and edge | Copy | Visual inside |
|---|---|---|---|---|---|---|
| **Syntara** (founder, light) | 3 equal cells 406x400 (x 100/518/935, y 274) | **12** | ~10 | fill `#f2f4f5` (cool grey) on `#fff`; 1px ring `#ebebed` (~8% ink) plus a faint 2px drop | bottom-left at 22 inset: title ~24/500 ink, desc ~18/400 `#8f9193`, 2 lines | soft monochrome 3D: white pill nodes on grey lines, radar rings, % keycaps; no colour |
| **Inkflow** (founder, dark) | 3 cells 385x310 over 2 cells 585x310 (x 130 to 1311) | **12** | ~11 | fill `#111113`-`#131215` on `#0f0f0f`; 1px ring `#1c1c1e` | top-left at 16 inset: title ~18/500 white, desc ~14/400 grey, 2 lines | real product fragments cropped by the cell edge: contract cards, KPI tiles 150/267, signature, recent-contracts table, a perspective-tilted nav list, a hatched area chart |
| **Plasma** (founder, dark violet) | 2 rows alternating 425+718 / 717+425 (x 140 to 1298) | **12** | ~16-18 | dark cells, ring `#1b1a21`, violet radial glow inside each cell | bottom-left at ~26 inset: title ~36/500 white, desc ~18/400 light grey | tilted glass UI cards (bot config, campaign feed, stat tiles, app nav) |
| **Lunor** (founder, dark, the site's own) | 3 stacked list cards 674x207 | 31 | ~20 | `#151515` on `#000`; 1px ring `#1c1c1c` plus a 2px top highlight; a 205-wide icon well `#0b0b0b` split by a 2px hairline | title ~40/500 white, desc ~28/400 `#b1b1b3`, 2 lines, left of centre | glossy grey 3D icons (folder, badge-check, flame) |
| **Crownsite** (founder, dark) | 3 cells ~403 wide | 12-13 | ~14 | dark, hairline | top-left: title ~30/500, desc ~19/400 grey | photo and website collage, avatars, a purple promo card |
| **Webby** (founder, dark) | 2x2 framework | ~12 | ~14 | dark | title + desc top-left | photos plus website screenshots, blue accent chips |
| Rico **Cliento** (light) | 3 visual cells, then a hairline-divided row of 3 icon+title+desc items | ruled | ~12 | `#f8faf9` wells, fading UI | icon 16 + title ~16/500 + desc ~14 grey | a growth chart with avatar, faded UI rows, deal card |
| Rico **Taskplus-2** (dark) | 4x2 ruled sheet, columns 320 wide (x 80/400/720/1040) | 0 (1px rules) | none | `#1b1b1b` | icon tile, title 15/500 white, desc 12 grey | none (text grid) |
| Rico **Zenus-2** (light) | 2 white cards 592 wide on `#fafafa` | 16 | ~16 | white cards, hairline | title + desc under the visual | attendance table, payroll chart |

Founder bento rules from these:
- **Gap 12** (4 of 5 grids).
- **Radius 10-20:** small cells r 10-12, large or hero cells r 16-20.
- **Title weight 500**, and title : description about 1.3-1.45 (24/18, 18/14, 40/28).
- **Copy pinned to one corner,** the same corner in every cell of one bento.
- **The visual is product.** It is either real UI fragments cropped by the cell (dark), or soft monochrome 3D objects (light). Colour comes from one accent glow (Plasma violet) or none at all (Syntara).
- **Section head:** a centred h2 ~44-48/500 Title Case (Syntara, Crownsite) or a left 2-line h2 ~40/500 (Inkflow). Rico adds a chip above and a two-tone second line (Cliento).

## 5. Product UI notes

**Founder dashboards (8: Lunor light and dark, Inkflow light and dark, Orren, Cluno, Folderly, Creator Marketing).**
- The app is an inset white panel (r ~12) on a grey canvas, 8px from the window edge. The sidebar (225 wide) sits on the grey.
- Nav rows have a 32px pitch.
- KPI cards (~94 tall) have a 56px grey icon tile, r 8, on the right.
- Paired bars are ink and violet (`#2a2a2a` plus `#8b8cf0`-class), with a floating tooltip card.
- The documents list is stacked bordered rows (r 8, ~46 tall).
- Table rows are 40px with hairline column dividers. Status chips carry an icon (Active and Offline). Tags are outlined chips.
- Every app has a light and a dark twin.
- These dashboards are also the product shown inside his C-PROD heroes. Stacker and Cluno embed the Lunor dashboard.

**Rico (54 dashboards plus 9 components)** is the density reference:
- light and dark twins of CRM, calendar, email, payroll, projects (board, list and timeline), crypto and newsletter apps;
- see `heyrico-deep-2026-10.md` RD-01..38 for his measured system.

**Founder components and materials (18 components, 6 buttons, 9 branding objects).** He studies materials more than layouts:
- keycap gradient buttons (blue and violet, r 12, with a coloured under-glow);
- a submerged cyan glass capsule;
- a neumorphic light-mode pill;
- tinted status buttons on dark (Cold, Warm, Closed, Lost: a coloured icon with a 1px tint ring and a 6% tint fill);
- an arrow-box CTA (a dark capsule with an inset white square arrow tile);
- deep soft drop shadows under dark buttons;
- frosted glass folders;
- photo cards inside a thick white bezel (Porsche, about r 28 outer);
- revenue cards whose bars fade to transparent at the base (green, red);
- a capsule bar chart with a hatched active bar.

## 6. Rules (LN-01..LN-36)

Each rule gives the rule, then Why, Applies to, Check and Source.

- **RULE LN-01** Set the hero h1 at 50-60px (default 54), weight 450-500, tracking -0.02 to -0.04em (default -0.03), line pitch 1.1-1.2, exactly 2 lines.
  **Why** this is the founder's own median tuple across 44 measured heroes. Medium size and medium weight read premium; air and the visual carry the confidence.
  **Applies to** light and dark SaaS heroes.
  **Check** computed font-size, weight and letter-spacing of `h1`; `getClientRects().length == 2`.
  **Source** hero-measurements.tsv; section 3.1.

- **RULE LN-02** Keep the h1 colour solid: near-black (`#000`-`#1a1a1c`) on light, `#fff` on dark. A second-line grey or a white-to-grey fade is the only two-tone allowed.
  **Why** 44/44 trusted heroes use a solid ink h1 (contrast 18.5-19.7:1). Two-tone appears only as a fade on line 2 (Nexar, Pluno).
  **Applies to** heroes.
  **Check** h1 colour in the computed style; no gradient text unless it is a fade on line 2.
  **Source** section 3.1; Nexar, Pluno.

- **RULE LN-03** Place the subtitle 12-16px CSS (about 28-33 optical) under the h1, at 17-18px, 2 lines, max width 380-440px, grey (light ≈ `#686a6b`, dark ≈ `#b3b3b7`).
  **Why** the founder's copy block is tight and narrow. The median sub is 372px wide at h1→sub 13 CSS.
  **Applies to** heroes.
  **Check** `sub.getBoundingClientRect().top − h1.bottom` is 12-16; width ≤ 440; 2 lines.
  **Source** section 3.1.

- **RULE LN-04** Put the CTA row 40-48px CSS (about 48-54 optical) under the subtitle.
  **Why** this is the measured gap (median 42 CSS / 48 optical). It separates action from message more than h1→sub does.
  **Applies to** heroes.
  **Check** CTA top − sub bottom.
  **Source** section 3.1.

- **RULE LN-05** The rhythm ratio is chip→h1 ≈ h1→sub (about 30 optical) < sub→CTA (about 48) < CTA→product (about 90).
  **Why** this order of gaps is identical across C-PROD, LEFT-TEXT and C-STAGE (section 2 medians).
  **Applies to** heroes.
  **Check** measure all four gaps; each one is larger than the previous.
  **Source** sections 2 and 3.1.

- **RULE LN-06** Hero CTAs are 38-43 tall (default 40), 8-10 apart, as a pair (primary + secondary). Radius is either r 9-11 rounded rect or a full pill, matched to the nav buttons.
  **Why** median 40 tall, r 11, gap 9. The two radius clusters both occur in his best heroes (Modula r 9, Senture pill).
  **Applies to** heroes and nav.
  **Check** box heights; the radius equals nav-button radius scaled to the same family.
  **Source** section 3.2.

- **RULE LN-07** On light, make the primary CTA tactile ink. Use either a vertical gradient (`#2b2b2b`→`#181818`) with a 1px lighter top line, or a flat `#1b1a1d` body with a 1px dark outer ring and a lighter 3-4px bottom inner rim. The secondary is white with a tinted hairline or a tinted soft drop. It is text only.
  **Why** these are the measured pixel profiles of Vectorly and Modula, his two most recent or most copied heroes.
  **Applies to** light heroes.
  **Check** probe a column through the button: a gradient or rim exists; the secondary has no icon box.
  **Source** section 3.2 probes.

- **RULE LN-08** On dark, make the primary CTA a flat white pill or rounded rect, and the secondary a near-black fill (`#141414`-`#201b28`) with a hairline ring.
  **Why** Nexar, Ressoul, Forma, Layere and Auto-AI all do this. Light comes from the white button, not a glow.
  **Applies to** dark heroes.
  **Check** primary fill ≥ `#f5f5f5`; no box-shadow glow on the resting primary.
  **Source** section 3.2.

- **RULE LN-09** When an element sits above the h1, make it a 29-32 tall chip about 32-36px optical (22-25 CSS) above the h1 ink. Use one of two forms: a rounded-rect chip (r ~7) holding an inner "New" tag plus tinted text, or a pill with a 14px icon. Tint it with the brand hue: a lavender or indigo ring and text on light; `#131313` fill with a `#232323` ring on dark.
  **Why** this is the measured anatomy of Modula, Stacker, Nexar and Classior. It is never the stock "[New] text →" capsule.
  **Applies to** heroes.
  **Check** chip height 29-32; h1 ink top − chip bottom is 30-37.
  **Source** section 3.2; probes.

- **RULE LN-10** The fold always has a fourth unit beyond nav and the copy block. It is one of: a product frame, a logo row, a stats row, a feature strip, a media card or a scene. That unit sits 80-100px under the CTAs, or 50-55 for a logo row.
  **Why** All 98 founder heroes have one (checked by eye on the contact sheet). Empty folds do not exist in his work. This is the cadence-hero r1 "empty" verdict, quantified.
  **Applies to** heroes.
  **Check** the first non-background row under the CTAs is ≤ 110px below them.
  **Source** sections 2 and 3.4.

- **RULE LN-11** In the centred product family, show one real app frame 1000-1100 wide, starting at y 535-590, cut by the fold, with 280-350px visible.
  **Why** these are the measured Cluno, Modula, Stacker, Auto-AI and Insightly frames.
  **Applies to** C-PROD heroes.
  **Check** frame rect: width 1000-1100, top 535-590, transform identity.
  **Source** section 3.4.

- **RULE LN-12** The background is a named signature world tied to the brand, and it lives behind or around the visual, never as blobs behind the type. Examples: light rays, a halo arch, frosted keycap tiles over a gradient, silk ribbons, bevelled arches, light beams, a planet horizon, a dither dots field, a line burst, an embossed mark, a cinematic photo.
  **Why** every founder hero has exactly one. This is the "signature visual concept" demanded in the cadence-hero r2 verdict.
  **Applies to** heroes.
  **Check** `DIRECTION.md` names the world; the h1 region's background varies by less than 6 L*.
  **Source** section 2; `heroes.jpg`.

- **RULE LN-13** Rotate the family from a measured pool per brief. Choose from: Inter display, Inter text cut, Manrope, Aspekta, Inter Tight, Geist, Plus Jakarta, Switzer, Satoshi. One family per fold.
  **Why** he uses 12 families across 44 heroes. Variety lives in the font while the tuple (LN-01) stays fixed.
  **Applies to** heroes.
  **Check** one `font-family` on h1, sub, CTAs and nav; the family differs from the last build.
  **Source** section 3.5.

- **RULE LN-14** The Inter text cut (opsz 14) at display size is allowed only with tighter tracking (-0.05 to -0.068em) and weight 450-500. The display cut takes -0.02 to -0.045.
  **Why** Modula (his most copied hero, 72 copies) is Inter text 500 at -0.068em. Tight tracking compensates for the wider text cut.
  **Applies to** heroes.
  **Check** opsz axis value against the letter-spacing range.
  **Source** section 3.5.

- **RULE LN-15** A serif-italic accent word is an owned decision for brand, agency, travel and editorial briefs. Use one word, same size, an Instrument Serif-like italic, and never on a product-SaaS h1 by default.
  **Why** it appears in 12/98 heroes, almost all PHOTO and agency heroes.
  **Applies to** brand heroes.
  **Check** at most one `<em>` serif span in the h1; `DIRECTION.md` lists it as an owned decision.
  **Source** section 3.5.

- **RULE LN-16** Nav links are 15-16px grey; the active link is ink, optionally in a tinted capsule. The nav CTA pair (white or ghost "Log in" plus ink "Sign up") is 34-38 tall in the hero CTA's radius family. The nav centre is at y 40-50.
  **Why** these are the measured medians (ascent 12, nav CTA 36, baseline 55).
  **Applies to** heroes.
  **Check** computed font-size of nav links; nav CTA heights; the nav row's centre y.
  **Source** section 3.3.

- **RULE LN-17** The nav is either plain links on the page (default) or a hairline-ringed rounded bar (r ~14, about 1070-1100 wide, `#f9f9f9`-class fill) for contained, centred heroes.
  **Why** these are the two grammars in his work (about 70/25).
  **Applies to** heroes.
  **Check** nav container computed style.
  **Source** section 3.3.

- **RULE LN-18** Use a light fold and a dark fold equally often across briefs. Dark folds use solid `#0b0b0c`-`#121214` grounds lit by an object or scene. Light folds use `#fff`-`#f6f6f6` with a tinted stage.
  **Why** the split is 51 light and 47 dark. Dark C-STAGE heroes are lit by arches, horizons and beams.
  **Applies to** heroes.
  **Check** ground colour; no radial blob behind the h1.
  **Source** section 2.

- **RULE LN-19** An h1 is at most 2 lines and 3-8 words. Title Case is the default; sentence case is allowed when the line reads as a sentence. Use full stops only for two parallel sentences ("Run Your Business. Not Countless Tools.").
  **Why** this matches his copy: Forma has 7 words in sentence case, Stacker uses two sentences, Cluno has 5 words.
  **Applies to** heroes.
  **Check** word count ≤ 8; lines = 2.
  **Source** hero-measurements.tsv `h1_text`.

- **RULE LN-20** In left-aligned heroes, set the copy column at x 95-121 with the h1 ink top at 136-210. Give the right two-thirds and the bottom to the signature field or a tilted or bleeding product.
  **Why** these are the measured Vectorly, Forma, Flowela and Syntara positions.
  **Applies to** LEFT-TEXT and SPLIT heroes.
  **Check** h1 left x; the right half is not empty.
  **Source** section 2.

- **RULE LN-21** In centred heroes, the h1 ink top is at about 185-240 (C-PROD ~200, C-STAGE ~236). That leaves 120-170 of air under the nav.
  **Why** these are the measured medians, lower than our canon's 150.
  **Applies to** centred heroes.
  **Check** h1 rect top.
  **Source** section 2.

- **RULE LN-22** A logo row is faded mono wordmarks (30-45% opacity) in one line, under the CTAs or at the bottom-left, labelled ("Integrated with the best", "Trusted by ..."). The logos are always placeholders unless the client supplies real ones.
  **Why** it appears in 26/98, for example Stacker and Layere. It is proof without colour noise, and the engine never invents customers.
  **Applies to** heroes.
  **Check** the logo row's opacity and greyscale; the logos are marked sample.
  **Source** section 2.

- **RULE LN-23** Bento grid gap is 12px (light and dark), with the container about 1180-1240 wide.
  **Why** 4 of 5 founder grid bentos measure 12. A tight gap makes the bento read as one object.
  **Applies to** bento sections.
  **Check** the distance between adjacent cell rects.
  **Source** section 4.

- **RULE LN-24** Bento cell radius is r 10-12 for cells under about 420 wide and r 16-20 for large or alternating cells. Nested wells are concentric (outer − inset).
  **Why** measured: Syntara 10, Inkflow 11, Plasma 16-18, Lunor list 20.
  **Applies to** bentos.
  **Check** computed border-radius per cell width; inner radius = outer − padding.
  **Source** section 4. See section 9 for the conflict with "rounder".

- **RULE LN-25** Light bento cell: a cool-grey fill (`#f2f4f5`) on a white page, a 1px ring about 8% ink (`#ebebed`) and an optional 1-2px faint drop. Dark bento cell: a fill 2-4 L above the page (`#111113` on `#0f0f0f`, `#151515` on `#000`), a 1px ring about +12 L (`#1c1c1e`), and an optional 1-2px top highlight.
  **Why** these are the measured surfaces of Syntara, Inkflow and the Lunor list bento.
  **Applies to** bentos.
  **Check** probe the fill, ring and outside pixels.
  **Source** section 4.

- **RULE LN-26** Bento copy is a title at weight 500 plus a 2-line grey description at about 0.72-0.78x the title size. It is pinned to the same corner in every cell, with an inset of 16-26 that scales with the cell.
  **Why** measured tuples: 24/18, 18/14, 36/18, 40/28. Copy is always top-left or bottom-left, consistent within a bento.
  **Applies to** bentos.
  **Check** title weight; ratio; identical inset per cell.
  **Source** section 4.

- **RULE LN-27** Fill dark bento cells with real product fragments cropped by the cell edge (KPI tiles, tables, cards, charts, a perspective-tilted list). Fill light bento cells with soft monochrome 3D objects (white pills, rings, keycaps on grey). Never use an empty cell, and never a lone icon.
  **Why** this is what his six bentos do. It is the founder's own grammar, distinct from the Kargul iso canon.
  **Applies to** bentos.
  **Check** each cell contains a `data-product` fragment or a drawn object; the visual crosses at least one cell edge (dark) or fills at least 55% of the cell (light).
  **Source** section 4.

- **RULE LN-28** Bento colour is grey/ink plus at most one accent glow per section (Plasma violet), or none (Syntara).
  **Why** these are the measured palettes.
  **Applies to** bentos.
  **Check** coloured-pixel share per cell ≤ about 10%, with one hue.
  **Source** section 4.

- **RULE LN-29** Bento section head: a centred h2 44-48/500 Title Case, or a left-aligned 2-line h2 ~40/500. The grid starts about 90-110 under the h2.
  **Why** measured on Syntara, Crownsite and Inkflow.
  **Applies to** bentos.
  **Check** h2 tuple and the gap to the grid top.
  **Source** section 4.

- **RULE LN-30** For a list-style feature block, use stacked cards about 670 wide with a 31-32 gap, r 20, and a darker 205-wide icon well on the left split by a hairline. Put a glossy grey 3D icon in the well, and a title ~40/500 plus a 2-line desc ~28/400 beside it.
  **Why** this is Lunor's own home-page bento (the founder's product).
  **Applies to** feature lists.
  **Check** card rect, well width, radius.
  **Source** section 4.

- **RULE LN-31** A product app is an inset white panel (r ~12) on a grey canvas, 8px from the window edge. Use a 225 sidebar on the canvas, 32px nav pitch, ~94-tall KPI cards with a 56px icon tile, and 40px table rows with hairline column rules. Ship a light and a dark twin.
  **Why** these are the founder's Lunor and Inkflow dashboards, which also sit inside his heroes.
  **Applies to** product UI and the hero product.
  **Check** rects and pitches; both themes exist.
  **Source** section 5.

- **RULE LN-32** Chart pairs are ink plus one accent (violet `#8b8cf0`-class or blue), with a floating white tooltip card. Revenue bars may fade to transparent at the base.
  **Why** this recurs across his dashboards and components (dashboard-2, revenue cards, recent-tasks chart).
  **Applies to** product UI.
  **Check** 2 series hues maximum; the tooltip is a card, not a native title.
  **Source** section 5.

- **RULE LN-33** Buttons are material studies with a mechanism. Choose from: keycap (gradient body plus a bottom rim plus a coloured under-glow), submerged glass, neumorphic pill, tinted status (a 1px tint ring plus about 6% tint fill plus a coloured icon), or arrow-box (an inset white square tile). Pick one per brand; never mix two materials.
  **Why** these are his 6 button studies plus the Lunor CTAs.
  **Applies to** all buttons.
  **Check** one button recipe per page (box-shadow census).
  **Source** section 5; `branding.jpg`.

- **RULE LN-34** A site's own chrome stays inside one radius family. Lunor uses 10 (nav buttons and search), 11 (chips), 12 (CTAs), 14 (cards), 16 (steps) and 18 (pricing), a monotonic ladder by box size.
  **Why** this is the measured Lunor DOM. Consistent roundness is what the founder calls "consistent".
  **Applies to** all.
  **Check** radius by box-height band rises monotonically.
  **Source** section 3.6.

- **RULE LN-35** Default motion is colour and background transitions at 150ms `cubic-bezier(0,0,.2,1)`. Use nothing on scroll unless motion is in scope.
  **Why** the Lunor site does exactly this; the founder's stills carry the design.
  **Applies to** sites.
  **Check** transition durations; no scroll-linked animation in an unscoped build.
  **Source** section 3.6.

- **RULE LN-36** Measure a founder reference with the Lunor method before copying a number. Solve the font from line widths with an overlay check (error ≤ 17), and report optical and CSS gaps separately.
  **Why** eyeballed numbers caused the cadence-hero r2 spacing reject.
  **Applies to** studies.
  **Check** `method/` scripts output exists for the reference.
  **Source** section 0.

## 7. Founder style in one page (decided defaults for the engine)

**Hero, any mode**
- **Canvas:** 1440x890.
- **Pick a layout family** by rotation:
  - C-PROD (centred over the real app);
  - LEFT-TEXT (left copy over a signature field);
  - C-STAGE (centred over a lit object or scene);
  - SPLIT-PROD or SPLIT-PHOTO as alternates.
- **Pick a font** from the pool: Inter display, Inter text cut, Manrope, Aspekta, Inter Tight, Geist, Plus Jakarta, Switzer.
- **Pick a mode** (light or dark, alternating) and **name the signature world** for the background.

**Copy block**
- Chip (optional, about 1 in 3; 30 tall), then 32 optical (24 CSS).
- **h1:** 54px / 450-500 / -0.03em / pitch 1.15-1.2, 2 lines, 3-8 words, solid ink or white. Then 30 optical (13 CSS).
- **Sub:** 18px grey, 2 balanced lines, ≤ 420 wide. Then 48 optical (42 CSS).
- **CTAs:** 40 tall, gap 9.
  - Light: tactile ink + white text-only.
  - Dark: white + near-black ringed.
  - Radius r 10 or a full pill, matching the nav buttons.

**After the CTAs (always)**
- C-PROD: a product frame 1000-1100 wide at y ~560 cut by the fold, about 90 under the CTAs.
- Or a faded logo row about 53 under the CTAs, then the product.
- Or a stats or feature strip, or a scene.

**Nav**
- Links 15-16 grey, active link in ink or a tinted capsule.
- Log in (ghost or white) + Sign up (ink), 36 tall.
- Plain on the page, or a ringed rounded bar about 1080 wide.

**Bento**
- Gap 12; cells r 10-12 (small) and 16-20 (large).
- **Light:** grey `#f2f4f5` cells with an 8% ring and soft monochrome 3D objects.
- **Dark:** cells +3 L over the page, a +12 L ring, and real product fragments cropped by the cell edge.
- **Copy:** title 500 + grey desc at ~0.75x, pinned to one corner.
- **Accent:** one glow maximum.
- **Head:** centred h2 ~46/500 or a left 2-line h2 ~40/500.

**Product**
- An inset white app panel on a grey canvas, 225 sidebar, 32 pitch, 40 rows, icon-tile KPIs, ink + violet charts, light and dark twins.
- Density from Rico (`heyrico-deep-2026-10.md`).

**Never**
- An empty fold.
- A heavy 700 crushed h1 as the default.
- Gradient text on line 1.
- Blobs behind the type.
- A stock "[New] →" capsule.
- Iso line art in a founder-style bento.
- Lone icons in cells.
- Mixing two button materials.
- Shipping a Lunor design box for box: customise design, copy and colour (Lunor's "Biggest rule").

## 8. Dos and Don'ts (from the corpus)

**Do:**
- Modula: lavender halo arch behind the copy, a tinted "New" chip, tactile ink + white CTAs, a white-bezel app frame cut by the fold. It is his most copied design.
- Senture: an Inter display 67/450 h1, pill CTAs, glass light streaks, an integration-icon arc at the bottom.
- Nexar (dark): bevelled arch frames, a fade on h1 line 2, a white pill CTA, 4 feature tiles in a dark tray.

**Don't:** the library holds only published work, so it contains no rejects. Negative evidence stays in the ledger. Do not read low view counts as rejects: views depend on upload date and on free vs premium status.

## 9. Canon conflicts (proposed edits, not applied)

Each row gives the canon value, then the Lunor evidence, then the proposed edit.

| # | Canon (file: line or row) | Lunor evidence | Proposed edit |
|---|---|---|---|
| 1 | hero-light "h1, split 58 / 550 / -0.045em / lh 1.03"; "centred 68-72 / 550 / -0.045em / lh 1.04"; JSON `h1.sizePx [56,72]`, `weight [500,550]`, `trackingEm [-0.05,-0.04]` | median 53.7 (IQR 51-60); weight mode 450, 70% at 400-500, 550 in 1/44; tracking median -0.030 (IQR -0.040 to -0.019); pitch 1.20 (IQR 1.10-1.22) | h1 default 54 (range 50-62; 68-72 only for a Kestrel-type full-dashboard hero); weight 450-500; tracking -0.02 to -0.04 (text cut -0.05 to -0.068); lh 1.1-1.2. JSON: `sizePx [50,62]`, `weight [450,500]`, `trackingEm [-0.045,-0.02]` |
| 2 | hero-light Rhythm "h1 -> sub 20; sub -> CTA 32" | h1→sub 13 CSS (31 optical); sub→CTA 42 CSS (48 optical) | h1→sub 12-16 CSS; sub→CTA 40-48 CSS. This directly answers the r2 "spacing pill → h1 and CTAs → proof were wrong" verdict |
| 3 | hero-light Subtitle "17/27 or 18/28 ... measure <= 620px" | 17-18px is consistent; width median 372 (IQR 345-411) | keep the size; max width 440 (centred) / 420 (left) |
| 4 | hero-light CTAs "Primary 44-48 tall, radius 12-14"; JSON `cta.heightPx [44,48]` | median 40 (IQR 39-43); r 9-11 or full pill; gap 9 | heightPx [38,44], default 40; radius r 9-11 or pill (matching the nav); add `ctaGapPx [8,10]` |
| 5 | hero-light Nav "right side text only ('Sign in' grey, 'Start free →' ink with underline)"; "links 14/500"; r1 "links 15, nav CTAs 36 tall" | nav CTAs are buttons (ghost or white + ink) 36 tall; links 15-16; the active link is often in a tinted capsule | replace "text only" with "a Log in + Sign up button pair, 34-38 tall, in the hero CTA radius family"; links 15-16 |
| 6 | hero-light r1 verdict "Above the h1: one element is REQUIRED" | present in 32/98 overall, 12/25 C-PROD, 7/13 C-STAGE, 6/17 LEFT-TEXT, 9/27 recent | make it "default for centred families; optional for LEFT-TEXT and SPLIT when the signature field fills the fold". Keep the chip anatomy of LN-09. **Needs founder confirmation:** his own work contradicts "required" |
| 7 | hero-light "h1, centred ... top ~150px (80-90px under the nav)" | centred h1 ink top median ~200 (C-PROD) and ~236 (C-STAGE) | centred h1 ink top 185-240; CSS top ≈ 175-225 |
| 8 | hero-light Product placement "centred: frame >= 1000 wide, top <= 520px" | frame 1000-1100 wide, top 535-614 (median ~560), CTA→frame 79-103 | centred frame top 535-590, CTA→frame 84-100; a logo row may sit between (+50) |
| 9 | hero-light Type family "Inter Variable display cut ... one family"; Never "Plain `@fontsource-variable/inter` at display size" | 12 families across 44 heroes; the Inter text cut at display in 6, including Modula (most copied) at 500 / -0.068 | the type family rotates from the LN-13 pool (still one family per fold). The text cut is allowed with tracking ≤ -0.05 (LN-14). Keep the ban on the text cut at default tracking |
| 10 | hero-light "h1 copy Title Case, 2 lines max, no full stop, <= 5 words" | 2 lines always; 3-8 words; sentence case and two-sentence heads with full stops occur | ≤ 8 words; sentence case allowed; full stops only for two parallel sentences |
| 11 | hero-light Never "Heavy 600-700 h1 with crushed tracking; poster didone serif" | 600-700 appears in 12/44, at moderate tracking (-0.02 to -0.04), mainly in Manrope and Jakarta; a serif-italic accent word in 12/98 | keep "no crushed heavy h1"; allow 600 for Manrope or Jakarta at ≥ -0.035; add the serif-italic accent word as an owned decision (LN-15), not a didone poster |
| 12 | hero-light Colour "one accent (Quorum indigo)"; "Background ONE quiet layer" (already superseded by r1/r2) | every hero has a named signature world (LN-12); the light accent is lavender or indigo or blue most often | fold LN-12's catalogue into the r1/r2 "living signature layer" bullet as the approved pool |
| 13 | section-bento Grid "gap 24, container x 108 (1224 wide)" | founder gap 12 in 4/5 grids (Rico 16 or ruled 0); container 1180-1240 | gap 12 (founder grammar) or 16 (Rico cards); keep 24 only for the Kargul iso grammar |
| 14 | section-bento Cell "r24 squircle"; r1 bento verdict "outer cards 24-32" | founder cells r 10-12 (small) and 16-20 (large); none at 24-32 | **Conflict with the verdict, needs founder confirmation.** Proposal: founder-grammar cells r 16-20 for large cells and r 12 for small ones, with inner wells concentric. If he still wants rounder, go to 24 for cells ≥ 500 wide |
| 15 | section-bento Cell copy "title 18 / 600 / -0.02em ... body 14/22 pinned 24px from the bottom; caps chip row" | title weight 500; sizes 18-40 scaling with the cell; desc ≈ 0.75x the title; no chip row; copy in one corner (top-left or bottom-left) | title 500; title:desc ≈ 1.3-1.45; inset 16-26; the chip row is optional, not default |
| 16 | section-bento Style "Kargul services-bento grammar ... drawing the product's own objects" as the default | founder bentos: real product fragments cropped by the cell (dark), soft monochrome 3D objects (light), glass cards with one violet glow; no iso line art | add a **"Lunor product-fragment bento"** grammar as an approved floor beside Kargul iso, Linear FIG, AlignUI and affectUI (LN-23..LN-29); make it the default when the brief asks for "my style" |
| 17 | section-bento Cell fill "`#f6f6f6`, ring 5%, no shadow" | light `#f2f4f5` + ring `#ebebed` (~8%) + an optional faint 2px drop; dark +3 L fill, +12 L ring, optional top highlight | allow the 8% ring and a 1-2px drop for the founder grammar; add the dark recipe |
| 18 | section-bento Section head "centred h2 44 / 550 / -0.04em" | centred h2 ~44-48 at 500, or a left 2-line ~40/500 | weight 500; allow the left 2-line head |

## 10. Exceptions and judgement calls

- **The 1x originals limit precision.** Tracking is good to about ±0.005em, size to about ±1px, radius to ±2px, colour to ±2 levels. The CSS gap estimates depend on font metrics from Chrome and on the measured pitch; for one-line subs a 1.5x line height is assumed.
- **A visual ranking.** Views and copies are biased by upload date and by free vs premium status. Modula (203 views, 72 copies) and Auto-AI, Tandem and Stacker (171-174 views) lead. Treat this as weak evidence of what users like, not of what the founder rates highest.
- **Rico's two heroes** (Cliento, Zenus) are C-PROD with Inter display 500-650. Rico's h1→sub is looser (39 optical) and his sub→CTA is 60. Rico is the product-density source, not the hero source.
- [engine note] The founder's "I like more rounded stuff" (cadence-bento-rico r1) may compare against Rico's small radii (4-8 on controls) rather than his own 10-20 cells. Hence row 14 asks him.

## 11. Figures worth keeping

- `knowledge/benchmarks/lunor/sheets/heroes.jpg`: all 127 heroes, founder first, labelled by family.
- `sheets/bentos.jpg`, `sheets/product.jpg`, `sheets/branding.jpg`, `sheets/sections-other.jpg`.
- `method/font-solve-check.png`: 10 original-vs-solved h1 pairs (the font proof).
- Single references:
  - `hero/img/AugustasDesign__modula.webp` (C-PROD light);
  - `hero/img/AugustasDesign__vectorly.webp` (LEFT-TEXT light, keycap tile field);
  - `hero/img/AugustasDesign__senture.webp` (C-STAGE light);
  - `hero/img/AugustasDesign__nexar.webp` (C-STAGE dark);
  - `hero/img/AugustasDesign__forma.webp` (LEFT-TEXT dark);
  - `bento/img/AugustasDesign__inkflow-bento.webp` (dark product-fragment bento);
  - `bento/img/AugustasDesign__syntara-bento.webp` (light 3D-object bento);
  - `dashboard/img/AugustasDesign__dashboard-2.webp` (the founder's app).
- Site: `site/home/fold@2x.png`.

## 12. Open questions

1. Above-h1 element: required (r1 verdict) or default for centred families only (his own 33%)? See row 6.
2. Bento radius: 16-20 (his Lunor bentos) or 24-32 (r1 bento verdict)? See row 14.
3. SF Pro could not be confirmed by the solver. The four "sfpro" labels are SF-like grotesks (Insightly, Journey, Layere, Webby-2).
4. 71 of the 98 founder heroes share one upload date (2025-07-31), so their real chronology is unknown. "Recent" covers only the 27 dated uploads.
5. The Figma files (premium clipboard payloads) were not read. Exact Figma values (line-height mode, letter-spacing %, auto-layout gaps) would replace the CSS estimates if the founder exports them.
6. 71 heroes (54 of them the founder's) have no trusted h1 solve (photo backgrounds, serif-italic mixed lines, OCR splits). Their families and notes are visual only.
