# Rico (@_heyrico / Ace Studio) replicas R1-R6: notes

Study only, never published. All six references are Rico's work (case-page CDN originals from acedesign.io, or his live site); credits and capture method in `knowledge/benchmarks/heyrico-x/CREDITS.md`, the rules learnt in `knowledge/web/heyrico-deep-2026-10.md` (RD-01..38).

Method, the same for all six:
- The scale is read from a 1 px stroke (RD-02), then the font family, size, weight and tracking are solved from ink widths (`work/replicas/rico-tools/fit.mjs`, `fitscale.mjs`).
- Edges and colours come from `rico-tools/edges.mjs` (batched row/column scans in CSS px) and `ink.mjs`.
- Every element is placed absolutely at its measured position. `rico-tools/cmp.mjs` renders ours at the reference's own device scale and prints ink-box deltas per named region (`rico-tools/r<N>-regions.txt`). Overlays come from `tools/compare.mjs`.
- Every replica root sets `corner-shape: round` (RD-16), because the engine's global `squircle.css` would reshape his circular corners.
- Logos, avatars, illustrations and photo art are neutral placeholders of the same size, never his assets.

Registration summary (final `cmp.mjs` run, |dx|, |dy|, |dw|, |dh| per region):

| Replica | Regions | <= 1 px | Median max-delta | Over 1 px |
|---|---|---|---|---|
| R1 table | 82 | 70 | 0.5 | region artefacts (boxes started on another fill), placeholder logo, Lucide glyph shapes |
| R2 sidebar | 25 | 25 | 0.43 | none |
| R3 composer | 20 | 19 | 0.3 | mic glyph (1.5) |
| R4 chart card | 12 | 12 | 0.33 | none |
| R5 onboarding | 18 | 17 | 0.33 | one feature line on card 2 (+2 width) |
| R6 marketing | 22 | 21 | 0.5 | "150+" (GT America Mono vs Fragment Mono glyphs) |

Gate (`tools/gate.mjs --kind product-ui`): `align.vertical-centre` and `align.horizontal-centre` PASS on all six (0/87 in R1, 0/4 in R2, R3 and R5, 0/1 in R4 and R6) and `align.clipped` PASS. Replicas use absolutely placed text, so the census covers only the flex/grid boxes (chips, badges, CTAs).
Gate FAILs that are faithful to the reference and kept as findings:
- R1 and R3: `type.sizes.product` 5 > 4. His dense screens use 5 sizes.
- R6: 4 FAIL (type sizes, weight 300, r3 on a 32 px button, and contrast artefacts from text sitting on sibling boxes). This is his studio register; see RD-35.

---

## R1: Aster "Companies / Database" table (dashboard / table)
- **Route** `#/ricor1`, file `app/src/RicoR1.tsx`, 1600x1000.
- **Reference** `knowledge/benchmarks/heyrico-x/live/work-aster/cdn/04-j7ppicbkvDTp99s211DT9AmBUU.png`, 6400x4000 = 4x (grid lines are 4 px). The same screen is X 2099121946437071193 (653 likes).
- **Overlay** `work/replicas/cmp-ricor1-side.png`, `-overlay.png`.
- **What registered:**
  - Window, sidebar, header and toolbar bands, table grid and footer: exact (0 px).
  - 60+ text boxes: within 0.25-0.75 px at 4x.
  - Status glyphs and tags: 0 px.
- **Key values:**
  - Window 1440x900 at 80,50, 1 px #E5E5E5 ring, r9.
  - Sidebar 238 wide, #FBFBFB, 1 px #EEEFF2 divider.
  - Header band 38. Toolbar 28 px controls at y 100. Head row 35 px #FAFAFA. Rows 38, except Airbnb 43.
  - Columns at 559, 819, 1019, 1219, 1419. Footer bar 36 px #FCFCFC.
  - SF Pro 500 throughout: nav 13 (-0.15), table 14 (-0.2), revenue 14 (-0.3), funding 13 (-0.25), headers 13 #404040, tags 12 (-0.25), group labels 11, "99+" 10.5/400.
  - Greys: #262626, #737373, #A1A1A1.
  - Tags: 22 px, r6, Tailwind 400 text on a 100-hue inset ring.
  - Primary button: gradient #2B2B2B to #1A1A1A, 1 px #121212 ring, 12% inset top line.
  - Active row: #F0F0F0, r8, 224x28. Nav pitch 29.
  - Checkboxes: 12 px, r4, 0.75 px #E5E5E5 ring.

## R2: Twin sidebar + "Slack for your agents" card (sidebar / nav)
- **Route** `#/ricor2`, file `app/src/RicoR2.tsx`, 600x340.
- **Reference** `.../live/work-twin/cdn/04-E9t0AJ7QwxEHeHetAyauJuTwSA.png`, 4200x2380 = 7x. The scale comes from his own spec: rows are 196 px on a 210 pitch (28/30), the Connect pill is 168 (24) and the card padding 117 (about 16).
- **Overlay** `cmp-ricor2-side.png`, `-overlay.png`.
- **What registered:** all 25 regions within 0.86 px (tile, badge, card, CTA and row fill exact).
- **Key values:**
  - #F8F8F6 canvas. #FCFCFC sheet at 60,40, 240 wide, r14, soft 0.6 px #D9D9D8 edge.
  - Yellow tile 20 px, #FFDB3F, r6, #E5C539 inner ring. Serif wordmark 18/600.
  - Nav SF 13/400, -0.04, #5D5D5D, icons #7F7F7F.
  - Rows 28 on a 30 pitch. Active row 216x28 #F3F3F1, r8, label #333. Badge 14 px #00A6F4.
  - "Workspace" 12/400 #9E9E9E.
  - Promo card 240x140 #333, r16. Title 12/500 white. Body 12/400 #BFBFBF. Connect pill 212x24 white.

## R3: Alpaca "Super Computer" composer (composer)
- **Route** `#/ricor3`, file `app/src/RicoR3.tsx`, 720x406.
- **Reference** `.../live/work-alpaca/cdn/10-Ppebb0ihyNnYaPqCZrvFR99w.png`, 7200x4060 = 10x (the card stroke is exactly 10 px).
- **Overlay** `cmp-ricor3-side.png`, `-overlay.png`.
- **What registered:** all text within 0.6 px. Composer, icon squares, chip, send and cards exact. Icons within 1 px, except the mic glyph (1.5).
- **Key values:**
  - SF title 19/400 (-0.2) with a filled plane mark.
  - Composer 480x124 at 120,106, r19.5, 0.7 px #E4E4E5 ring, 0 1px 2px 5%.
  - Placeholder 14/400 #7F7F7F at 0 tracking.
  - 24 px ringed icon squares, r8, 8 px apart.
  - Model chip #F6F6F7, r8, 168 wide: 13/400 label, "New" 11/400 #3082FF.
  - Send 24 px circle #B7D8F6 while empty.
  - Suggestion cards 152x99, 12 px gaps, 1 px #F6F6F7 stroke, r16.5, no shadow. Titles 13/500 #292929, subtitles 12/400 #5C5C5C.
  - Pixel band: 2.4 px squares on a 4.75 px pitch (our deterministic stand-in).

## R4: Scout "Growth" bar-chart card (chart card)
- **Route** `#/ricor4`, file `app/src/RicoR4.tsx`, 460x300.
- **Reference** `.../live/work-scout/crop-04-growth-card-x1770-y1155-1380x900.png`. This is a lossless crop of `work-scout/cdn/04-fNEy2UmGaNPLjSJ0XdgFa2wico.png` (5160x3000 = 3x; the window border is exactly 3 px).
- **Overlay** `cmp-ricor4-side.png`, `-overlay.png`.
- **What registered:** all 12 bars at 0 px (one at 1 px width). Every text box within 0.67 px.
- **Key values:**
  - Inter. Label "Growth" 13/500 #838693. Period 12/500, right-aligned at 433.
  - Value 17.5/450 #434356. Delta 12/400 #08AB4C with a 10.7 px green arrow dot.
  - Card 440.7x274.7, r6.5, 0.34 px #DEE0E2 ring and a faint drop, on #FCFCFC.
  - Bars 25.67 wide on a 31.75 pitch, #4E9BFD, r3.3, baseline 233.
  - Month numbers 12.5/400, centred on the bars.

## R5: Alpaca onboarding "Start free, no demo required" (onboarding)
- **Route** `#/ricor5`, file `app/src/RicoR5.tsx`, 1720x1000.
- **Reference** `.../live/work-alpaca/cdn/02-cnCMWO6D91bvX8A5iedHzyk4HA.png`, 5160x3000 = 3x.
- **Overlay** `cmp-ricor5-side.png`, `-overlay.png`.
- **What registered:** CTA buttons, chips and cards exact. Text within 0.67 px, except one card-2 feature line (+2 px width).
- **Key values:**
  - Inter. Title 18/500. Subtitle 14/400 #646465. Plan names 18/600 (-0.08).
  - Description 14/400 (-0.1). "What you get:" 12/500 #414141. Features 13/400 #5D5D5D on a 28 pitch.
  - #F0F0F0 canvas. 1440x900 window at 140,50 with a 0.5 px #D8D8D9 ring.
  - Cards 320x480, 24 gap, r16. 0.5 px #E3E3E3 ring plus a 2.5% halo. 80 px art header.
  - Chips 20 px, r6: "Free" #F0F0F0, price #F4F8FC / #DBE7FD ring / #0A6EAB text.
  - CTAs 280x40 pills: #333 and #0091FF.

## R6: acedesign.io home fold (marketing section)
- **Route** `#/ricor6`, file `app/src/RicoR6.tsx`, 1440x900.
- **Reference** `.../live/home/fold-1440@2x.png`, a live capture. Every box and type tuple was read from the DOM (`live/home/fold-dom.txt`).
- **Overlay** `cmp-ricor6-side.png`, `-overlay.png`.
- **What registered:**
  - Anton headline: pixel-identical (0 px on all four lines; Anton is his actual face). Crop ticks exact.
  - Nav, buttons, labels and body text: within 0.5-1 px with the stand-in fonts.
- **Key values:**
  - #000 page. Lime #E1F435. Header line 1 px #191919 at y 59.
  - Anton 40/42 caps, -1.2. Ticks 9x9, 2 px thick.
  - Body: GT America Lt 14/21 (-0.14) and Rg 16/22.4 (-0.4) in #BFBFBF. Stand-in Libre Franklin, tracking re-fitted to -0.2 / -0.53.
  - Mono labels: GT America Mono Lt 11-12 with +0.1em. Stand-in Fragment Mono.
  - Buttons 216x40, square: lime fill, or a 1 px white outline.
  - Companies box: 1 px #1A1A1A lines with white 6 px cross ticks.
  - Stair stats: 182 px boxes rising 40 px each, values 20 px mono.
- **Fonts installed for this replica:** `@fontsource/anton`, `@fontsource-variable/libre-franklin`, `@fontsource/fragment-mono`. Chosen from rendered widths across 23 sans and 16 mono Google faces.
