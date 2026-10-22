---
source: web:https://kargul.studio (home, /work, 32 case studies) + web:https://x.com/marcelkargul (49 posts 12-20 Oct 2026 via api.fxtwitter.com) + github.com/kargulstudio (MIT sales-crm, values cross-checked)
chapter: Kargul Studio micro-details, measured at pixel level - the shadow, ring, radius, spacing, type and colour values that make his product UI look professional
pages: n/a (2880x2070 case originals + X originals, measured 2026-10-20)
topic_tags: [saas-app-ui, product-ui, micro-details, shadows, borders, rings, radius, spacing, type, colour, dark-mode, light-mode, chips, avatars, tables, popovers, modals, charts, benchmark, founder-bar, replication]
status: studied
companions: knowledge/web/kargul-saas-playbook.md (KS-), kargul-source-study.md, kargul-crm-teardown.md, kargul-deep-study.md, system/product-ui/kargul-tokens.json
tokens: system/product-ui/kargul-micro-tokens.json
evidence: knowledge/benchmarks/kargul-studio-2026-10/ (CREDITS.md, cases.json, _scripts/), knowledge/benchmarks/kargul-x/latest/ + posts-latest.json
---

> **Corrected 2026-10-22 by the full corpus.** See `kargul-corpus-2026-10.md` §8. The bigger sample corrects KMD-01/03/10/11/16/18 and several element values; use the corrected numbers there.

# Kargul Studio micro-details, measured

**The answer in one paragraph.** His screens look professional because the small values come from one closed system, not from taste per component. The greys are a published palette (they match the AlignUI neutral and gray ladders hex for hex: `#171717 #5c5c5c #7b7b7b #a3a3a3 #d1d1d1 #ebebeb #f7f7f7`, navy `#0e121b #181b25 #222530 #717784 #99a0ae`), and the text ladder is the same in light and dark when written as ink alpha (1 / .70 / .52 / .38 / .19). Separation is a 1px ring almost everywhere: a resting light card has no blur shadow at all, only a `#ececec` ring whose bottom edge is about 3% darker; a control adds a 2px-blur drop at 4-5%; only floating layers (popover 13px blur at 5.5%, hover card two layers, modal on a scrim) get real shadow, and dark mode gets none. Colour lives in pairs: a tint fill plus very dark text of the same hue (`#ffebec`/`#681219`), mint avatars with deep-teal initials, outlined status chips in dark. Each product owns one radius family (Clokora 3-9px, UniOps 6-20px and pill nav, AM Trades 4.5-16px) and one control height (32px in AM, 30 in the CRM, 34 in CopeCart). Icons sit one step dimmer than the label next to them. Numbers are regular weight at 28px, not bold. Those are the "tiny stuff" the founder means; every value below has a file and a crop.

**How it was measured.** Pages: Playwright Chromium 1440x900 at DPR 2 (`knowledge/benchmarks/kargul-studio-2026-10/<case>/page-full.png`). Images: originals from `cdn.sanity.io` at 2880x2070 (the earlier gallery held 1800x1294 copies; the new files are 1.6x sharper) and X originals (`pbs.twimg.com ...&name=orig`). Measurement: `_scripts/probe.mjs` loads an image into a canvas and reads pixels (edge scans, ink boxes, corner-arc fits, edge profiles); `_scripts/shadowfit.py` fits 1-2 `box-shadow` layers (erfc falloff, blur = 2 sigma) to the luminance falloff outside an edge. Both were calibrated on rendered references: corner fit within 3% of the true radius (it reads 3% low on 1px rings, so ring radii below are reported as fitted and should round up half a pixel); the shadow fit recovered `0 1px 2px .05, 0 4px 12px .06` as `0 1px 2px .06, 0 4px 12px .05`.

**Scale per image.** Studio originals that show a 1px border as exactly 2 identical pixels are at an exact 2x (clokora-00/06, am-trades-*, copecart-00, zeroleaks-00, listkit-00, plunio-02, kxl-014, kxl-020, kxl-032-1). kxl-046 (CRM) is exactly 3x (3-pixel hairlines). kxl-031 is 4096 wide for a 1440 frame (2.844x). uniops-02 is the one ambiguous file: 14px Inter caps give 2.0x, the browser traffic lights (12px) give 1.81x; values below use 2.0 and flag it.

**Evidence tags.** [M] CSS measured from the MIT repo (borders-census.json, kargul-source-study.md). [P] pixel-measured here. [V] eyeballed. Crop coordinates are image pixels `x0..x1 x y0..y1` in the named file (studio files are under `knowledge/benchmarks/kargul-studio-2026-10/`, X files under `knowledge/benchmarks/kargul-x/latest/`).

## 1. Core ideas

1. **The palette is a kit palette, used verbatim.** Clokora and AM Trades text and borders hit AlignUI neutral steps exactly (`#171717`, `#5c5c5c`, `#7b7b7b`, `#a3a3a3`, `#d1d1d1`, `#ebebeb`, `#f7f7f7`, `#1c1c1c`, `#333333`) [P]; CopeCart's navy dark hits AlignUI gray 950/900/800/500/400 exactly (`#0e121b`, `#181b25`, `#222530`, `#717784`, `#99a0ae`) [P]; AM Trades ships an AlignUI-named token sheet (`bg-strong-950`, `bg-surface-800`, `bg-weak-50`, `text-sub-600`, `text-soft-400`, `text-disabled-300`) (am-trades-11). He does not invent greys; he picks a ladder and never leaves it.
2. **Hierarchy by ink alpha, identical in both modes.** Light (ink `#171717` on `#fafafa`): secondary `#5c5c5c` = .70, tertiary `#a3a3a3` = .38, faint `#d1d1d1` = .18. Dark AM (ink `#e2e2e2` on `#0a0a0a`): `#a3a3a3` = .71, `#7b7b7b` = .52, `#5c5c5c` = .38, icons `#333333` = .19, separator dots `#242424` = .12 [P]. Same rungs, mirrored.
3. **Rings, not shadows, at rest.** The resting light card is `1px #ececec` with no blur; its bottom row reads `#e5e5e5` against `#ececec` sides, i.e. a hairline drop of about 3% [P clokora-00]. Controls add `0 1px 2px` at 4-5%. Real blur appears only on things that float.
4. **Floating layers get one soft wide layer, not a stack of greys.** Calendar popover `ring #e6e6e6 + 0 4.5px 13px rgb(0 0 0/.055)`; ListKit hover card `0 2px 1px .05 + 0 10px 8px .07` with nothing above the top edge; Plunio modal on a 22% scrim `ring rgb(0 0 0/.07) + 0 2px 1px .08 + 0 10px 8px .06` [P fitted].
5. **Dark mode is flat and lit by borders.** AM Trades, CopeCart and ZeroLeaks have no drop shadows at all; every surface edge is one 1px line one step above the surface (`#1c1c1c` on `#0a0a0a`, `#222530` on `#0e121b`, `#141414` on `#000`) [P]. CopeCart uses one surface colour for sidebar, page and card alike; only borders and the active nav fill (`#181b25`) separate them.
6. **Colour comes in same-hue pairs.** Tint fill + deep text of the same hue: Urgent `#ffebec`/`#681219`, Medium `#fff3eb`/`#71330a`, avatar `#ffc0c5`/`#681219`, mint avatar `#d9f6f1`/`#0b4340` (CRM) and `#def2f1`/`#0d4749` (settings), Waiting `#f4eee6`/`#b36100`, ZeroLeaks delta `#001409`/`#00aa4f`, dark banners `#0d2016` fill + `#0e2b1b` border + `#c2f5da` title + `#9ecbb3` body [P]. Never a saturated fill with white text except the one primary button.
7. **Each product owns a radius family and a control height.** Clokora is sharp (bars 3, Stop button 4, tab 4.6, chip 0, cards 8.75); UniOps is soft (chips 6, controls 10, list cards 16, KPI strip 20, nav fully round); AM Trades sits between (chips 4.5, filters 6-7, buttons 8, table 10, hero 12, list cards 15) [P]. Controls: AM 32, CRM 29-30, CopeCart 34, Plunio 36, settings input 40 [P].
8. **Icons are quieter than text.** AM filter icon `#333333` beside its label `#5c5c5c` and value `#a3a3a3`; Preview play icon `#333333` beside `#a3a3a3` text; CRM column-type icons `#969696` beside `#585858` header text [P].
9. **Weights stay low.** KPI values are regular at 28px (Clokora `25.0h`, ZeroLeaks `48`), the greeting is regular at 24px, titles are 500 [V]. Nothing in the app chrome looks bold.
10. **Data marks are drawn to the type.** Clokora bars are 64px wide with 20px gaps, r3, `#1f1f1f`, under two-line caps axis labels (day `#a3a3a3` 12px caps, date `#d1d1d1`) [P]; UniOps setup progress is 35x4.5 dashes at 4px gaps [P]; CopeCart grid is solid `#181b25` horizontals plus dashed `#222530` verticals (4/4) [P].

## 2. Rules

- **RULE KMD-01** Take the grey ladder from one published scale and use its exact steps: light neutral `#171717 / #5c5c5c / #7b7b7b / #a3a3a3 / #d1d1d1 / #ebebeb / #f7f7f7 / #fafafa`, navy dark `#0e121b / #181b25 / #222530 / #717784 / #99a0ae`; never tune a grey per component.
  **Why** Two products and a token sheet hit the same hexes exactly; a closed ladder is why nothing looks "slightly off".
  **Applies to** SaaS app UI. **Check** distinct text/border greys in a view all belong to the bound ladder (script: collect computed colours, diff against the token list). **Source** [P] clokora-06 (h1 `#171717` 456..666 x 413..449, meta `#5c5c5c`, eyebrow `#a3a3a3`), am-trades-07, copecart-00, am-trades-11 token sheet

- **RULE KMD-02** Write the text ladder as ink alpha and keep the same rungs in light and dark: primary 1.0, secondary .70, tertiary .52, quaternary .38, icon .19, separator .12.
  **Why** Measured light .70/.38/.18 and dark AM .71/.52/.38/.19/.12: the modes feel like one product because the contrast steps are identical.
  **Applies to** SaaS app UI. **Check** (c - bg)/(ink - bg) for each text colour within +-.04 of a rung. **Source** [P] clokora-00, am-trades-07

- **RULE KMD-03** Give a resting light card a 1px ring one step below the page (`#ececec` on `#fafafa`, `#e9e9e9` on `#f7f7f7`) and no blur shadow; if anything, a hairline drop `0 1px 0 rgb(0 0 0/.03)`.
  **Why** The shipped KPI and list cards have zero falloff beyond 1px; blur on resting cards is the template tell.
  **Applies to** SaaS app UI, light. **Check** luminance 2-8px below a card edge within 1% of the page. **Source** [P] clokora-00 col x=600 y 925..945 (`#ffffff` -> `#e5e5e5 #e9e9e9 #f7f7f7 #f9f9f9 #fafafa`), sides `#ececec` only

- **RULE KMD-04** Give controls (inputs, filter pills, secondary buttons, sort pills) a 1px ring plus `0 1px 2px rgb(0 0 0/.045)`; their bottom border pixel reads about 2-4% darker than the sides.
  **Why** The drop is what makes a white control read as pressable on a white page; it is barely measurable (2.7% at 1px, gone by 3px).
  **Applies to** SaaS app UI, light. **Check** shadow fit on the control bottom: blur <= 3px, alpha .03-.06. **Source** [P] kxl-046-2 sort pill col x=1000 y 740..770; kxl-031 input col x=1900 y 1150..1170 and Upload button; listkit-00 Quick search (cool-tinted: `#e2e4e9` ring, falloff `#eceeef`..`#f8fafb`)

- **RULE KMD-05** Shadow only floating layers, with one wide soft layer: popover/menu `0 0 0 1px #e6e6e6, 0 4px 13px rgb(0 0 0/.055)`; hover card/dropdown `0 0 0 1px #e8e8e8, 0 2px 1px rgb(0 0 0/.05), 0 10px 8px rgb(0 0 0/.07)`; modal on scrim `0 0 0 1px rgb(0 0 0/.07), 0 2px 1px rgb(0 0 0/.08), 0 10px 8px rgb(0 0 0/.06)`.
  **Why** Fitted on three of his floating layers; the falloff ends at 12-17px and nothing shows above the top edge of the hover card (positive y offset only).
  **Applies to** SaaS app UI, light. **Check** popover shadow alpha <= .06 per layer, blur <= 16px, no shadow visible above the top edge beyond the ring. **Source** [P] kxl-014-1 popover 263..868 x 1463..1972; listkit-00 hover card 831..1400 x 297..751; plunio-02 modal 1196..1940 x 744..1328

- **RULE KMD-06** In dark mode use no drop shadows; separate every surface with a 1px line exactly one ladder step above it (`#1c1c1c` on `#0a0a0a`/`#121212`, `#222530` on `#0e121b`, `#141414` on `#000`) and show the active nav row as a fill of that same step.
  **Why** Three dark products measured flat; the line colour equals the active-fill colour, so the whole UI uses two values.
  **Applies to** SaaS app UI, dark. **Check** no box-shadow with blur > 0 on resting dark surfaces; border colour = nav active fill. **Source** [P] am-trades-07 (border rows `#1c1c1c`, nav active `#1c1c1c`), copecart-00 (`#222530` 2px at x 652..653), zeroleaks-00 (`#141414` hairlines)

- **RULE KMD-07** Make the content panel the deepest surface in dark (AM: canvas `#2e2e2e`, sidebar `#121212`, panel `#0a0a0a`) or one shared surface (CopeCart `#0e121b` everywhere); never lift the main panel above the sidebar.
  **Why** Content sits in the darkest well; chrome is one step lighter, so the eye lands on data.
  **Applies to** SaaS app UI, dark. **Check** L(panel) <= L(sidebar). **Source** [P] am-trades-07 (200,700) `#121212` vs (600,700) `#0a0a0a`; copecart-00

- **RULE KMD-08** Build status chips as same-hue pairs: light = tint fill + deep text (`#ffebec`/`#681219`, `#fff3eb`/`#71330a`, `#f4eee6`/`#b36100`), 20-21px tall; dark = 1px outline + text in the status colour on the surface (`#4785ff`, `#fa7319`), 18px tall, or a near-black tint (`#001409`/`#00aa4f`).
  **Why** Every chip measured follows this; white-on-saturated chips never appear.
  **Applies to** SaaS app UI. **Check** chip text and fill share hue within 15deg; text L* < 35 on light tints. **Source** [P] uniops-02 Urgent 2498..2605 x 1597..1640; clokora-06 WAITING 686..836 x 412..452; am-trades-07 PREMIUM 1614..1748 x 802..838; zeroleaks-00 +10% 981..1080 x 253..291

- **RULE KMD-09** Colour initials avatars with a pale tint and deep same-hue letters, reusing the chip pairs (red avatar `#ffc0c5` uses the Urgent text `#681219`); 20px in tables, 24-25px in lists with a 1-1.5px white ring when stacked, 40-44px in rows and profiles.
  **Why** The avatar palette is the status palette; no extra colours enter the UI.
  **Applies to** SaaS app UI. **Check** avatar fill/ink pairs exist in the chip palette. **Source** [P] kxl-046-2 EB 873..933 x 921..977 (`#d9f6f1`/`#0b4340`); uniops-02 S 1353..1403 (`#ffc0c5`/`#681219`); kxl-031 EB 1588..1715 (`#def2f1`/`#0d4749`, 44px); am-trades-07 MR 40px `#1c1c1c`/`#939393`

- **RULE KMD-10** Pick one radius family per product and keep every rounded thing on it: sharp (bars 3, buttons 4, chips 0-2, cards 8-9), medium (chips 4-5, controls 6-8, tables 10, cards 12-16) or soft (chips 6, controls 9-10, cards 16-20, nav rows fully round).
  **Why** Clokora, AM Trades and UniOps each measure as one coherent family; mixing families is what reads as assembled.
  **Applies to** all. **Check** list rendered radii per control height; every value is in the chosen family. **Source** [P] clokora-00/06, am-trades-02/07, uniops-02 (fits in section 3.2)

- **RULE KMD-11** Use one control height per product (32 in a dense dark app, 29-30 in a CRM, 34-36 in a looser dashboard, 40 for form inputs) and give buttons, filters, search and selects in the same bar that height.
  **Why** AM search, filters, Preview and primary are all 32px; the CRM sort pill and Add person are both 29-30px.
  **Applies to** SaaS app UI. **Check** controls in one toolbar share a height to the pixel. **Source** [P] am-trades-07 search 570..634, filters 570..634; am-trades-02 Preview 808..871; am-trades-01 primary 1114..1178; kxl-046-2 button 219..309 @3x, sort 660..750 @3x

- **RULE KMD-12** Set icons one ladder step dimmer than the label beside them (label `#5c5c5c` -> icon `#333333` in dark; header text `#585858` -> type icon `#969696` in light) and size them to the text (16 next to 14px).
  **Why** The label carries the meaning; a dimmer icon keeps rows calm and stops icons from becoming the focal point.
  **Applies to** SaaS app UI. **Check** icon contrast < adjacent text contrast. **Source** [P] am-trades-07 filter icon 1822..1852 x 592..612; am-trades-02 Preview icon `#333333`; kxl-046-0 th icon `#969696` vs text `#585858`

- **RULE KMD-13** Draw the active tab as text going to primary ink plus a 1px accent underline exactly the width of the label, sitting on the 1px divider.
  **Why** A 1px line the width of the word is the quietest selected state that still reads; full-width or 2-3px bars look heavy.
  **Applies to** SaaS app UI. **Check** underline height 1px, width = label text width +-2px. **Source** [P] am-trades-07 underline 762..796 y 527..528 `#4785ff`, active text `#e2e2e2`, idle `#7b7b7b`

- **RULE KMD-14** Give the primary button a hue-tinted shadow, never grey: `0 3px 4px rgb(<brand> / .09)` plus a long faint tail, a 1px rim one shade darker than the fill and a top-to-bottom gradient of about 6% lightness (`#5e48f3` -> `#4e35f1`); in a flat dark product use a flat solid fill (`#4785ff`) with no shadow.
  **Why** The CRM Add person button glows indigo, not grey; AM Trades' Resume lesson is flat. Both are deliberate; the grey drop under a coloured button is the amateur version.
  **Applies to** SaaS app UI. **Check** shadow pixels below a primary have the button hue (R/G ratio), not neutral. **Source** [P] kxl-046-2 863..1223 x 220..308 (glow `#eae1ff` -> `#fcfbff` over 7px); am-trades-01 946..1238 x 1114..1178

- **RULE KMD-15** Style the light table header as a band only 1-2% off the body (`#fbfbfb` on white) with a `#eaeaea` divider, 37-42px tall, 12-13px text at the secondary rung, and a 16px type icon at a lighter rung before each label.
  **Why** The header separates without becoming a grey bar.
  **Applies to** SaaS app UI. **Check** header fill within 2% of body; header text lighter than cell text. **Source** [P] kxl-046-2 (700,830) `#fbfbfb`; kxl-046-0 thead 780..891 @3x, text `#585858`, icon `#969696`; listkit-00 header 330..414

- **RULE KMD-16** Pick the row pitch from the row's content: 38-40px for one-line table rows, 56-60px for two-line list rows, 76px for rows with a 40px avatar and two lines; divider 1px one step off the surface.
  **Why** Measured CRM 40, ListKit 38, search results 56, UniOps list 57, Clokora invoice 60, AM users 76.
  **Applies to** SaaS app UI. **Check** pitch per row type is constant in a view. **Source** [P] kxl-046-0 dividers 888,1008,1128 @3x; listkit-00 rows 490,566,642; clokora-06 rows 1246,1366,1486; am-trades-07 rows 897,1049

- **RULE KMD-17** Build overview pages on a 1200px container with 14px card gaps, 36px between blocks, 16-18px from a block label to its card and 20/24px card padding (top-bottom/sides).
  **Why** Clokora overview: four 290px KPI cards at 14px gaps fill 1200 exactly; labels sit 18px above cards; blocks are 36px apart.
  **Applies to** SaaS app UI. **Check** container 1200; gaps 14/16; block spacing 32-40. **Source** [P] clokora-00 KPI edges 322,902,930,1510,1538,2118,2146,2726 @2x; Activity label 1006, chart card 1066

- **RULE KMD-18** Set KPI values regular (400) at 28px and the page greeting regular at 24px; keep 500 for titles and labels; never bold numerals in app chrome.
  **Why** Regular large numerals read expensive and calm; bold KPIs read like a template.
  **Applies to** SaaS app UI. **Check** font-weight of KPI values <= 450. **Source** [V] clokora-00 `25.0h` 375..509 x 775..817 (cap 41px @2x = 28px), zeroleaks-00 `48`

- **RULE KMD-19** Put hairline grids and crosshair marks under data, not boxes: solid horizontals one step off the surface, dashed verticals (4/4) one step lighter, and in technical brands a 11px "+" mark in a mid grey at grid intersections.
  **Why** CopeCart and ZeroLeaks build their whole chart and KPI structure from these two lines.
  **Applies to** SaaS app UI, data viz. **Check** grid lines 1px, dash pattern 4/4, colours from the ladder. **Source** [P] copecart-00 gridV x=859 y 630..700 (`#222530` dashes), gridH `#181b25`; zeroleaks-00 "+" at (540,207) `#525252`

- **RULE KMD-20** Draw radios as 16px rings: 1.5px accent ring with a 4.5px dot when on, 1.5px `#aeaeae` ring when off, no fill in either state.
  **Why** Matches his setup checklist; a filled radio is heavier than everything around it.
  **Applies to** SaaS app UI. **Check** radio 16px, ring 1.5px, inner dot 4-5px. **Source** [P] uniops-02 1691..1722 x 1295..1326 (on), 2205..2236 x 1295..1326 (off)

- **RULE KMD-21** Build a command/search modal as two floating surfaces (a 55px search bar and a results panel, both r16, 16px apart) over a ~22-25% black scrim with background blur; results use a 30px segmented filter, a mono 12px uppercase section label and 56px two-line rows with a 16px coloured icon tile.
  **Why** His latest search modal post (25k views) splits input and results; the gap is the signature.
  **Applies to** SaaS app UI. **Check** two surfaces, gap 12-16, scrim alpha .2-.3. **Source** [P] kxl-020-0 bar 700.. x 312..422, panel from y 456, scrim `#c0c0c0`-`#c6c6c6`

- **RULE KMD-22** Make dark banners full-bleed 100-104px bands: fill a 6-8% tint of the status hue on black, 1px top and bottom border one step brighter, title a very light tint, body a mid tint, and an outlined 24px button in the saturated status colour; stack them 14px apart.
  **Why** AM Trades' four banner states use exactly this recipe; it keeps status colour off large areas while staying unmistakable.
  **Applies to** SaaS app UI, dark. **Check** banner fill chroma low (L < 15), saturated colour only on the button outline/text. **Source** [P] am-trades-06 col x=2000: green 562..770, blue 798..1006, orange 1034..1242, red 1270..1478

- **RULE KMD-23** Measure a reference screen before building its twin: scale from a crisp 1px line (2 or 3 identical pixels), radius by arc fit, shadow by falloff fit; replicate those numbers, not the eyeballed look.
  **Why** Eyeballed values in earlier engine builds were 1-4px off on radii and 2-5x heavy on shadows; this study's measured values are the spec.
  **Applies to** all. **Check** `node knowledge/benchmarks/kargul-studio-2026-10/_scripts/probe.mjs <img> "<code>"` and `python3 _scripts/shadowfit.py <spec.json>` outputs recorded in the build's DIRECTION.md. **Source** this study (methods section)

## 3. Numbers and scales

### 3.1 Per-element spec (CSS px; light / dark)

| Element | Light (measured) | Dark (measured) |
|---|---|---|
| Button primary | CRM: 30h, r8 (fit 7.9), fill gradient `#5e48f3`->`#4e35f1` (mid `#482df4`), rim `#341dc7`/`#311db0`, glow `0 3px 4px rgb(69 38 255/.09)` + tail to 7px, label 14 white [P kxl-046-2]. Clokora ink button `#171717` [P]. Tactile ink (dashboard post): gradient `#6a6a6a` top highlight -> `#424242` -> `#313131` [P kxl-043] | AM: 32h, r8, flat `#4785ff`, no shadow, 147w [P am-trades-01]. UniOps: 36h, r8.5, gradient `#70c7ff` top line -> `#4c9cff` -> `#4886fd`, blue glow below ~6px (`#09285e` -> `#16171c`) [P kxl-032-1] |
| Button secondary | Plunio Cancel 36h r10 white, ring `#ececec`, bottom `#e7e7e7` + `0 0 2px .07` [P]; Settings Upload 28h r7.3 ring + `0 0 2px .09` [P kxl-031] | AM Preview 32h r8, fill `#121212`, 1px `#1c1c1c`, text `#a3a3a3`, icon `#333333` [P am-trades-02] |
| Button destructive | Plunio Delete 36h, flat `#eb4747`, text white [P] | n/a |
| Button ghost / quiet | UniOps Discard: no fill, text `#c3c3c3` [P dark]; Clokora Stop on dark bar: 32h r4 fill `#3c3c3c` [P] | same |
| Icon button | UniOps collapse 23x23 r6.7 fill `#f2f2f2` ring `#e5e5e5` [P, 2.0x assumed] | AM nav icons 16, `#5c5c5c` [P] |
| Input / search | Settings input 40h r8.4 white, ring `#ebebeb`, bottom `#e0e0e0` + `0 1px 2px .04`; label 12-13 `#5f5f5f`, value 14 `#181818`, hint `#959595` [P kxl-031 @2.844]. CRM search 29h r8.6 white ring `#ebebeb`, placeholder `#939393` [P @3x] | AM search 32h r7, fill = panel `#0a0a0a`, 1px `#1c1c1c`, placeholder + icon `#5c5c5c` [P] |
| Select / filter pill | CopeCart-light & UniOps filter 33h r9.7 white ring, label `#8a8a8a` + value `#2f2f2f` [P] | AM filter 32h r6 fill `#121212` 1px `#1c1c1c`, label `#5c5c5c`, value `#a3a3a3`, icon `#333333`; CopeCart 34h r8.6 `#0e121b` 1px `#222530` text `#99a0ae` [P]. Focused select (UniOps): 1px `#5782e1` ring, fill `#181d23` (blue-tinted), text `#fcffff` [P] |
| Chip / badge | Neutral (CRM source): 24h r5.6 `#f7f7f7` ring `#e7e7e7` + 1/3px bottom lip, text 12 `#5e5e5e` [P]. Priority 21h r6 tint pairs [P]. Count badge 21h r5.6 `#f7f7f7` ring `#e5e5e5` text `#626262` [P]. Clokora WAITING 20h r0 `#f4eee6`/`#b36100` 10-11 caps [P]. ListKit notification 18px circle `#ff2056` [P] | AM outline chip 18h r4.5, 1px `#4785ff`/`#fa7319`, text same, 11 caps; AM LOCKED 20h r4.5 fill `#1c1c1c` text `#a3a3a3` 11 caps + lock `#5c5c5c`; ZeroLeaks delta 20h r~1.5 `#001409`/`#00aa4f` [P] |
| Avatar | 20 (CRM table), 25 (UniOps list, white 1.5px ring when stacked), 44 (settings) - tint/deep pairs [P] | 40, `#1c1c1c` fill, initials `#939393` 14 [P am-trades-07] |
| Card | Clokora 1px `#ececec`, r8.75, no blur, pad 20/24, gap 14 [P]; UniOps list card r16.4, KPI strip r20.6, ring `#e6e6e6`-`#e9e9e9` on `#f7f7f7` [P]; settings card r14.8 [P] | AM list card r15, 1px `#1c1c1c`, 79h, gap 12; hero card r12 `#0f0f10` [P]; CopeCart chart card r19.6 [P] |
| KPI card | Clokora 290x134, label 14 `#5c5c5c`, value 28/400 `#171717`, delta row 14 (`#077356`-ish green arrow + `#5c5c5c` "vs. last week"), dot status after label [P] | ZeroLeaks cell: 18px icon `#7a7a7a`, delta chip top-right, label 11 caps `#7a7a7a`, value 28-29 `#e0e0e0`; cells split by `#141414` hairlines with "+" corners [P] |
| Table header | `#fbfbfb` band, `#eaeaea` divider, 37h (CRM) / 42h (ListKit), 12.5 text `#585858`, 16 icon `#969696`, r10 on the outer frame [P] | AM: band `#121212`, 37h, 11 caps `#5c5c5c`, table r10 [P] |
| Table row | 40 pitch (CRM), 38 (ListKit), name 14 `#191919` / `#0d2a4c` navy (ListKit), divider `#eaeaea` [P] | 76 pitch (40 avatar + 2 lines), name 13-14 `#e2e2e2`, email `#5c5c5c`, divider `#1c1c1c`, actions `#525252` [P] |
| Sidebar item | UniOps active: pill r17 (fully round), 34h, fill `#ebebeb`, text `#2e2e2e` 14, chevron [P @2.0]; ListKit active `#e5f2ff` r6 text+icon `#288dff`, 30h [P]; CRM rail tile 33x33 r8 `#f1effd` indigo icon `#4526ff` [P @3x] | AM active 32h r10, fill `#1c1c1c`, text `#e4e4e4`, count `#5c5c5c`; idle `#a3a3a3` [P]. CopeCart active `#181b25` r8.6, 32h; ZeroLeaks `#141414` r6.6 [P] |
| Tab / segmented | Search modal segmented 30h r6-8 track ring `#ededed`, active white + ring + bottom `#f5f5f5`, active `#060606`, idle `#636363` [P]; ListKit count tab `#ebf5ff` r8 `#288dff` [P]; Clokora nav tab r4.6 active `#ededed` [P] | Underline 1px label-width `#4785ff`, active `#e2e2e2`, idle `#7b7b7b` (AM); UniOps idle `#929292` [P] |
| Popover / menu | Calendar popover r12 (fit 11.1), ring `#e6e6e6`, `0 4.5px 13px rgb(0 0 0/.055)`, pad 16, rows 30 pitch with 16 icons `#868885`, title 14 `#0a0a0a`, desc `#5e5e5c` [P]. ListKit hover card r11-12 (two-layer shadow above) [P] | UniOps menu: fill `#141414`, 1px `#222222`-`#272727`, item hover `#1d1d1d`, item text `#c4c4c4` -> `#ffffff` on hover, ~35h rows [P] |
| Modal | Plunio confirm r29, white, no border, ring rgb(0 0 0/.07), shadow see RULE KMD-05, 56px icon tile `#fef1f1` + icon `#eb4747`, title `#171717`, body `#5c5c5c`, footer divider `#ebebeb`, two equal 36h buttons; scrim `#c2c2c2`-`#c8c8c8` (about 22% black over white) [P]. Search modal r16 x2 [P] | n/a |
| Banner / toast | n/a | AM banners: green fill `#0d2016` border `#0e2b1b` title `#c2f5da` body `#9ecbb3` btn `#1daf61`; blue `#121628`/`#151b36`/`#c0d5ff`/`#9dafd4`/`#4785ff`; orange `#27170c`/`#351d0d`/`#ffd9c0`/`#d4b29c`; red `#250f11`/`#321214`; 103h, 14 apart [P] |
| Chart | Clokora bars 64w gap 20 r3 `#1f1f1f`, axis two-line caps 12 `#a3a3a3` + `#d1d1d1`; dashboard post: line `#f5600c` 2px, area tint `#faefe9` fading, dashed grid `#eeeeee`, dashed black cursor, white-ringed points [P] | CopeCart line `#405bfb` 2px, grid solid `#181b25` + dashed `#222530` 4/4; tooltip `#0e121b` 1px `#222530` with a faint second line `#181b25` 2px below, date `#717784`, value 16-18 white, delta `#1daf61` [P]. ZeroLeaks bars track `#141414` fill `#a3a3a3` [P] |
| Progress / steps | UniOps dashes 35x4.5 gap 4 done `#1daf61` todo `#e6e6e6`, label `2/4` [P] | n/a |
| Radio | 16, 1.5 ring `#4785ff` + 4.5 dot / ring `#aeaeae` [P] | n/a |
| Calendar event | tint fill + deep text pairs: blue `#c5e3ff`/`#173857`, pink `#ffcade`/`#5f283f`, green tint/`#174a37`; selected event 2px dark border `#645629` on `#fde6a0`, r7 [P kxl-014-1] | n/a |
| Code editor | n/a | bg `#111216`, active line `#181d23`, line numbers `#575a63` / active `#b3bac4`, keyword `#8ca0db`, string `#b0d09f`, type `#76d4bc`, function `#dccb86`, warning `#af8a5d`; translucent sidebar over wallpaper, active row `#343d46` with top highlight `#3b444b` [P kxl-003] |

### 3.2 Radius ladder (fitted, CSS px; members)

| Radius | Members |
|---|---|
| 0-2 | Clokora WAITING chip (0), ZeroLeaks delta chip (~1.5), table and structural bars (0, [M]) |
| 3-4.5 | Clokora bars 3, Clokora tile 3.5, Stop button 3.75, search-modal icon tile 4.4, AM chips 4.5, ListKit kbd 4.5, Clokora tab 4.6 |
| 6-7 | AM filter 6, ListKit search/nav 6, CRM/UniOps chips 5.6-5.7, UniOps icon button 6.7, ZeroLeaks nav 6.6, banner button 6.5, AM search 6.9, Upload button 7.3, ListKit filter 6.75 |
| 8-9 | CRM primary 7.9, CRM rail tile 7.7, AM Preview 7.75, CRM sort/search 8.6, settings input 8.4, CopeCart filter/nav 8.6, Clokora KPI 8.75 |
| 10 | AM table 9.75, AM nav 10.5, UniOps filter 9.7, CRM table frame 10.2, Plunio Cancel 9.75 |
| 12 | calendar popover 11.1, ListKit hover card 10.75, AM hero card 11.9 |
| 14-16 | settings card 14.8, AM list card 14.5, search bar + panel 15.9, UniOps list card 16.4 |
| 20 | UniOps KPI strip 20.6, CopeCart chart card 19.6, CRM window frame 19.8 |
| 28-30 | Plunio modal 28.75 |
| pill | UniOps nav rows (34h, r17), avatars, radios, dots |

Nesting check [P]: AM table r10 inside panel (r0 structure); Plunio modal r29 holds 36px buttons r10 at 16px inset (outer - inset = 13, buttons 10: a rung below, not strict concentric, same as KS nesting rule).

### 3.3 Spacing and sizes (CSS px)

| Item | Value | Source |
|---|---|---|
| Container | 1200 (Clokora overview + invoice) | [P] clokora-00, -06 |
| Card gap | 14 (Clokora KPI), 12 (AM list cards), 16 (search bar to panel) | [P] |
| Block gap | 36 (KPI -> Activity label, chart -> Recent activity) | [P] clokora-00 |
| Label -> card | 16-18 | [P] clokora-00 |
| Card padding | 20 top/bottom, 24 sides (Clokora KPI); 16 popover; 24 modal sides | [P] |
| Header bar | 72 (Clokora top nav incl. divider) | [P] |
| Dark banner | 103 tall, 14 apart | [P] am-trades-06 |
| Controls | 32 AM; 29-30 CRM; 33-34 UniOps/CopeCart; 36 Plunio/UniOps save; 40 settings input; 55 search bar | [P] |
| Chips | 18 (AM outline), 20 (AM filled, Clokora, ZeroLeaks), 21 (UniOps priority), 24 (CRM source) | [P] |
| Row pitch | 38 ListKit, 40 CRM, 56 search results, 57 UniOps list, 60 Clokora invoice, 76 AM users | [P] |
| Nav row | 30 ListKit, 32 AM/CopeCart/ZeroLeaks, 34 UniOps | [P] |
| Avatars | 20 / 25 / 40 / 44 | [P] |
| Icon tiles | 16-17 (search results), 33 (CRM rail), 48 (Clokora invoice), 56 (Plunio modal) | [P] |
| Bars | 64 wide, 20 gap (Clokora) | [P] |
| Radio | 16 | [P] |

### 3.4 Type tuples (size from cap height; Inter cap = .727 em)

| Role | Size / weight | Colour (light / dark) | Source |
|---|---|---|---|
| Page greeting / title | 24 / 400-500 | `#171717` / `#e2e2e2` | [P] clokora-00 G cap 36px@2x; am-trades-07 "Users" cap 36px@2x |
| KPI value | 28 / 400 | `#171717` / `#e0e0e0` | [P] clokora-00 cap 41@2x; zeroleaks-00 cap 42@2x |
| Big revenue | 32 / 500 | `#ffffff` | [P] copecart-00 cap 48@2x |
| Card title / modal title | 14-16 / 500 | `#171717` | [P] plunio-02, uniops-02 |
| Body / nav / cell | 14 / 400 (nav 400-500) | `#171717`-`#191919`, nav `#5b5b5b` / `#a3a3a3`-`#c4c4c4` | [P] cap 20-21@2x, 30@3x |
| Secondary line | 13-14 / 400 | `#5c5c5c` / `#5c5c5c`-`#7b7b7b` | [P] |
| Table header | 12-13 / 400-500 | `#585858` / caps 11 `#5c5c5c` | [P] kxl-046 cap 27@3x |
| Caps label / chip | 11 / 500 uppercase, slight positive tracking [V] | `#a3a3a3` / `#7a7a7a` | [P] cap 16@2x |
| Mono eyebrow | 12 mono uppercase (Geist Mono [V]) | `#666666` | [P] kxl-020 cap 17@2x |
| Axis | 12 caps + 12 digits | `#a3a3a3` + `#d1d1d1` | [P] clokora-00 cap 17@2x |
| Faces | Inter in UniOps, AM, ListKit, CRM, settings [V]; a Geist-like grotesk in Clokora and ZeroLeaks [V]; Geist Mono for eyebrows and the code editor [V]; tracking normal at 11-16px [V] | | |

### 3.5 Colour ladders

| Ladder | Values |
|---|---|
| Light neutral (Clokora, AM sheet) | page `#fafafa`, card `#ffffff`, weak `#f7f7f7`, nav-active `#ededed`, tile `#e8e8e8`, border `#ececec`/`#ebebeb`, faint `#d1d1d1`, tertiary `#a3a3a3`, secondary `#5c5c5c`, ink `#171717` |
| Light warm-grey (UniOps) | page `#f7f7f7`, nav active `#ebebeb`, border `#e6e6e6`-`#e9e9e9`, icon button `#f2f2f2`, ink `#2e2e2e`-`#303030`, secondary `#8a8a8a`-`#8b8b8b` |
| Light navy-ink (ListKit) | sidebar `#f8fafb`, border `#e2e4e9`/`#e5e7eb`, kbd `#f3f4f6`, ink `#0d2a4c` (all text), secondary `#536880`, accent `#288dff`, active `#e5f2ff`, tab `#ebf5ff`, badge `#ff2056` |
| Light CRM (X) | page/card `#ffffff`, header band `#fbfbfb`, chip `#f7f7f7`, border `#eaeaea`, ink `#191919`, nav `#5b5b5b`, th `#585858`, placeholder `#939393`, icons `#969696`, accent `#4526ff`, rail active `#f1effd`, overdue `#de2342` |
| Dark neutral (AM) | canvas `#2e2e2e`, sidebar `#121212`, panel `#0a0a0a`, raised `#121212`, border/active `#1c1c1c`, card `#0f0f10`, text `#e2e2e2` / `#a3a3a3` / `#7b7b7b` / `#5c5c5c`, icon `#333333`-`#525252`, dot `#242424`, accent `#4785ff`, success `#1daf61`, orange `#fa7319` |
| Dark navy (CopeCart) | surface `#0e121b` (all), raised/grid `#181b25`, border `#222530`, text `#ffffff` / `#99a0ae` / `#717784`, line `#405bfb`, success `#1daf61` |
| Dark black (ZeroLeaks) | surface `#000000`, line/active `#141414`, crosshair `#525252`, text `#e0e0e0` / `#7a7a7a` / `#666666` / `#3d3d3d`, bars `#a3a3a3`, success `#00aa4f` on `#001409` |
| Dark UniOps (X) | window `#151515`, border `#232323`, divider `#1e1e1e`-`#262626`, icon circle `#1e1e1e`, menu `#141414` / `#222222` / hover `#1d1d1d`, text `#ffffff` / `#c4c4c4` / `#a8a8a8` / `#9d9d9d` / `#929292`, accent gradient `#4c9cff` |
| AM token sheet (am-trades-11) | text-strong `#0f0f0f`, text-sub `#5c5c5c`, text-soft `#a3a3a3`, text-disabled `#d1d1d1`; bg-strong `#0f0f0f`, bg-surface `#242424`, bg-sub `#d1d1d1`, bg-soft `#ebebeb`, bg-weak `#f7f7f7`; primary dark `#2c61c9`, base `#4785ff`, alpha `#d3e2ff`/`#e2ebff`; blue `#223eae`/`#2849d1`; orange `#b85613`/`#cf6015`/`#e16715`/`#ffdac1`/`#ffe6d6`; red `#ae222e`/`#d12836`/`#e93644`/`#ffc1c6`/`#ffd6d8`; green `#1d7747`/`#1a8e50`/`#1eaf62`/`#c3f5db`/`#d1fbe9` |
| Status (cross-product) | success `#1daf61` (UniOps, AM, CopeCart), blue `#4785ff` (UniOps link + radio, AM primary), Urgent `#ffebec`/`#681219`, Medium `#fff3eb`/`#71330a`, Waiting `#f4eee6`/`#b36100`, destructive `#eb4747` + tint `#fef1f1` |

### 3.6 Shadow tiers (fitted)

| Tier | Use | box-shadow | Fit rms | Evidence |
|---|---|---|---|---|
| L0 ring | resting card, panel | `0 0 0 1px #ececec` (+ optional `0 1px 0 rgb(0 0 0/.03)`) | .0018 | clokora-00 |
| L1 control | input, filter, secondary button | `0 0 0 1px #ebebeb, 0 1px 2px rgb(0 0 0/.045)` | .0011-.0033 | kxl-046-2 sort, kxl-031 input/button, listkit-00 search (`0 1.5px 3px rgb(13 42 76/.055)` cool) |
| L1b chip lip | neutral chip | `0 0 0 1px #e7e7e7, 0 1px 0 rgb(0 0 0/.05)` | .0066 | kxl-046-2 chip |
| L2 popover | popover, menu, calendar card | `0 0 0 1px #e6e6e6, 0 4.5px 13px rgb(0 0 0/.055)` | .0018 | kxl-014-1 |
| L3 hover card | hover card, dropdown over content | `0 0 0 1px #e8e8e8, 0 2px 1px rgb(0 0 0/.05), 0 10px 8px rgb(0 0 0/.07)` | .0054 | listkit-00 |
| L4 modal | dialog over scrim | `0 0 0 1px rgb(0 0 0/.07), 0 2px 1px rgb(0 0 0/.08), 0 10px 8px rgb(0 0 0/.06)`; scrim `rgb(0 0 0/.22)` + blur | .0161 | plunio-02, kxl-020 |
| Brand glow | primary on light | `0 0 0 1px <brand-700>, 0 3px 4px rgb(<brand>/.09), 0 6px 16px rgb(<brand>/.04)` | .0058 (hue fit) | kxl-046-2 |
| Dark | every resting dark surface | none; 1px line one step up | n/a | am-trades, copecart, zeroleaks |
| Dark glow (exception) | UniOps Save | blue glow under the button (~6px, `#09285e` at 1px) | eyeballed fit | kxl-032-1 |

Cross-check with the repo [M]: the MIT sales-crm (flat dark) uses controls `0 0 0 1px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.10), inset 0 0 0 1px rgba(255,255,255,.06)` and overlays `0 16px 40px rgba(0,0,0,.5)`; the kanban light app uses `0 1px 2px rgb(0 0 0/.08), 0 0 0 1px #ededed` for controls and `0 4px 12px .06, 0 12px 32px .08` for popovers. The pixel fits here are lighter: the client screens use about half the alpha of the repo's light popover (.055 vs .06+.08) and no inset highlights in light or flat-dark client work. The repo is the studio template; the client screens are the shipped bar. Borders agree: repo light ring `#ededed` vs measured `#ebebeb`-`#ececec`; repo dark `#232323` vs measured `#1c1c1c` (AM) and `#232323` (UniOps X).

## 4. The 25 tiny details that make it professional

| # | Detail (measured) | Evidence (file, crop) |
|---|---|---|
| 1 | Text greys are AlignUI neutral steps exactly: `#171717` ink, `#5c5c5c` secondary, `#a3a3a3` tertiary, `#d1d1d1` faint | clokora-06 456..666 x 413..449 (h1), 318..383 x 647..664 (eyebrow); am-trades-11 text swatches y 1000 |
| 2 | Navy dark is AlignUI gray exactly: `#0e121b` / `#181b25` / `#222530` / `#717784` / `#99a0ae` | copecart-00 (900,520), (500,293), row y=500 x 652, tooltip date 1280..1400 x 775..805 |
| 3 | The text ladder has the same ink-alpha rungs in light (.70/.38/.18) and dark (.71/.52/.38/.19/.12) | clokora-00, am-trades-07 |
| 4 | A resting light card has no blur; its bottom hairline is 3% darker than its sides (`#e5e5e5` vs `#ececec`) | clokora-00 col x=600 y 925..945; row y=800 x 318..330 |
| 5 | Controls carry a 2px-blur drop at 4.5%, gone 3px below | kxl-046-2 col x=1000 y 740..770 |
| 6 | Neutral chips have a 1/3px darker bottom lip | kxl-046-2 col x=600 y 970..995 (@3x) |
| 7 | Popovers use one wide soft layer `0 4.5px 13px /.055`, ring `#e6e6e6`, r12 | kxl-014-1 263..868 x 1463..1972 |
| 8 | Hover cards cast nothing above their top edge (positive offset only), 17px tail below | listkit-00 col x=1100 y 280..800 |
| 9 | The primary's shadow is indigo, not grey (`#eae1ff` at 1px), with a darker 1px rim and a 6% top-to-bottom gradient | kxl-046-2 863..1223 x 220..308 |
| 10 | Dark products have zero drop shadows; edges are one 1px step (`#1c1c1c` on `#0a0a0a`) | am-trades-07 row y=700 x 422..434, col x=600 y 210..222 |
| 11 | The dark content panel is darker than its sidebar (`#0a0a0a` vs `#121212`) | am-trades-07 (600,700) vs (200,700) |
| 12 | CopeCart uses one surface for sidebar, page and card; only borders separate | copecart-00 (400,700), (1000,250), (900,520) all `#0e121b` |
| 13 | Dark status chips are outlines: 1px `#4785ff` + same text, 18px, r4.5, 11px caps | am-trades-07 1614..1748 x 802..838 |
| 14 | Icons sit a rung below their label: filter icon `#333333`, label `#5c5c5c`, value `#a3a3a3` | am-trades-07 1822..1852 x 592..612, 1870..1955, 1965..2010 |
| 15 | Active tab underline is 1px and exactly the label's width | am-trades-07 x 762..796, y 527..528 |
| 16 | Priority chips are tint + near-black same hue: `#ffebec`/`#681219`, `#fff3eb`/`#71330a` | uniops-02 2498..2605 x 1597..1640 |
| 17 | The red avatar reuses the Urgent chip's text colour `#681219`; mint avatars `#d9f6f1`/`#0b4340` | uniops-02 1353..1403 x 1593..1643; kxl-046-2 873..933 x 921..977 |
| 18 | Overdue is coloured text + alert icon (`#de2342`), not a chip | kxl-046-2 93..423 x 931..971 |
| 19 | The table header band is only 1.6% off white (`#fbfbfb`) with a `#eaeaea` divider; column icons `#969696` beside `#585858` labels | kxl-046-2 (700,830); kxl-046-0 1165..1410 x 815..850 |
| 20 | Clokora runs a sharp ladder (bars r3, button r4, chip r0, cards r8.75) while UniOps runs soft (chips 6, cards 16-20, nav pill) | clokora-00 bar 372..500 x 1476..1604; uniops-02 KPI 619..796 |
| 21 | Overview math: four 290px cards at 14px gaps = a 1200 container; 36px between blocks; 18px label to card | clokora-00 row y=700 edges 322..2726 |
| 22 | KPI numerals are regular weight at 28px; greeting regular at 24 | clokora-00 375..509 x 775..817; 326..823 x 369..411 |
| 23 | Dark banners: 6-8% hue tint fill, 1px brighter-tint border, title/body in two light tints, outlined 24px button | am-trades-06 col x=2000 y 562..1478; 834..939 x 692..739 |
| 24 | Search modal splits bar and results into two r16 surfaces 16px apart over a 22% scrim; mono caps section label `#666666` | kxl-020-0 700.. x 312..456, 738..910 x 612..642 |
| 25 | Technical brand: `#141414` hairline grid with `#525252` 11px "+" marks at intersections; square delta chip `#001409`/`#00aa4f` | zeroleaks-00 (540,207); 981..1080 x 253..291 |

Also measured, worth reusing: setup progress dashes 35x4.5 at 4px gaps `#1daf61`/`#e6e6e6` (uniops-02 2200..2504 y 1170..1180); radio 16px rings (uniops-02 1691..1722 x 1295..1326); CopeCart tooltip's faint second line 2px under its border (copecart-00 col x=1400 y 885..895); Clokora axis labels as two-line caps in two greys (clokora-00 410..460 x 1635..1690); pastel syntax palette on `#111216` (kxl-003).

## 5. Dos and Don'ts

- **Do** pick a published ladder (AlignUI neutral or gray) and use its hexes. **Don't** sample a grey from a screenshot and nudge it: `#5c5c5c` vs `#5e5e5e` is invisible alone and visible across a page.
- **Do** separate light resting cards with a ring only (clokora-00). **Don't** put `0 4px 12px` on resting cards; that tier belongs to popovers (kxl-014-1).
- **Do** tint a coloured button's shadow with its own hue (kxl-046-2). **Don't** put a grey drop under a blue button.
- **Do** keep dark flat and border-lit (am-trades-07, copecart-00). **Don't** add glows to resting dark controls; UniOps Save is the one exception he ships (see 6).
- **Do** use one control height across a toolbar (am-trades-07: 32/32/32). **Don't** mix a 36px button with 32px filters in one bar.
- **Do** make icons dimmer than labels (am-trades-07). **Don't** give icons the label colour or the accent colour at rest.

## 6. Exceptions and judgement calls

- **Resting glow in dark.** UniOps' dark settings ships a blue gradient Save button with a glow (kxl-032-1), which contradicts the founder's dark rule ("no glow on a resting button", CLAUDE.md). Treat it as his exception for a single primary on a settings page; the engine keeps the founder rule unless overridden in DIRECTION.md.
- **Repo vs client values.** The MIT repos are heavier (inset highlights, 5-layer primary, 0.5 alpha overlays) than the client screens. When the two disagree, the client screens (pixel-measured here) are the target for client work; the repo values are the tactile/brand variant.
- **Radius families.** Do not average the families into one ladder; pick one per product (KMD-10).
- **Scale uncertainty.** uniops-02 values assume 2.0x; if the window is a 1440 frame (1.81x) every UniOps size grows about 10% (nav 38, controls 37, text 15-16). Prefer the exact-2x files for absolute sizes.
- **[engine note]** The AlignUI match is from recalled AlignUI palette values plus the AM Trades token sheet naming; verify against alignui.com before declaring it in a system file.

## 7. Figures worth keeping

clokora-00 (light overview), clokora-06 (invoice detail), uniops-02 (light admin), am-trades-07 (dark table), am-trades-06 (dark banners), am-trades-11 (token sheet), copecart-00 (navy dashboard), zeroleaks-00 (black technical), listkit-00 (navy-ink table + hover card), plunio-02 (confirm modal), kxl-046-0..2 (CRM people list), kxl-014-0..2 (calendar + popover), kxl-020-0 (search modal), kxl-031-0 (profile settings), kxl-032-0..3 (UniOps mac app light + dark), kxl-003-0 (code editor).

## 8. Replication set (rebuild pixel for pixel)

Studio paths are under `knowledge/benchmarks/kargul-studio-2026-10/`, X paths under `knowledge/benchmarks/kargul-x/latest/`. "CSS frame" is the image divided by the scale.

1. **Light dashboard: Clokora overview** - `clokora/clokora-00.png`, 2880x2070, scale 2.0, visible CSS window 1398x985 from x=42, y=50 on a `#2e2e2e` canvas, bleeding off the right and bottom edges. Shows top-nav time tracker: greeting, live timer bar, 4 KPI cards, 14-day bar chart, recent activity + pending invoices. Build: page `#fafafa`; top nav 72 tall with a 28px logo tile (radius [V] ~4), centred tab group (active `#ededed` r4.6, 28h, 16 icons), divider `#ebebeb`; container 1200 at x=119; date 14 `#5c5c5c`, greeting 24/400 `#171717` 8px below; timer bar 74h `#171717` r8, 2px green accent bar at the left [V hue], 14/500 white title + 14 `#a3a3a3` meta, right: 28px green timer `#47b194` + `/ $30.73` `#a3a3a3` + Stop 87x32 r4 `#3c3c3c`; 30 gap; 4 KPI cards 290x134, gap 14, 1px `#ececec` r9, pad 20/24, label 14 `#5c5c5c` + 5px status dot, value 28/400, delta row 14; 36 gap; "Activity · last 14 days" + legend right; chart card 338h with bars 64w/20 gap r3 `#1f1f1f`, axis two-line caps 12; list cards with a 2px `#077356` left accent per row, dividers `#f0f0f0`.

2. **Light dashboard: UniOps admin** - `uniops/uniops-02.png`, 2880x2070, scale 2.0 (alt 1.81), visible window 2796px wide (1398 CSS at 2.0x), Chrome-style frame with traffic lights and URL pill, bleeding off the bottom. Shows sidebar workspace nav + dashboard: filter pills, 3-cell KPI strip, time cards, setup checklist with 4-dash progress, usage-by-member and needs-attention lists. Build: page `#f7f7f7`; sidebar 270 with 44px app icon tile, section caps 12 `#8b8b8b`, nav rows 34h pill r17 (active `#ebebeb`, 14 `#2e2e2e`); main panel inset with 1px `#e9e9e9` top-left r20; title 16/500 + `·` + sub 16 `#8b8b8b`; filter pills 33h r10 white ring `#e6e6e6` (label `#8a8a8a` + value `#2f2f2f` + chevron); KPI strip one card r20 with 1px vertical dividers, cells 16 icon + 14/500 title + 14 `#8b8b8b` sub + 24 value + 25px stacked avatars; checklist strip with radios (KMD-20) and dashes 35x4.5; list cards r16, header 14/500 + `View all ↗` `#4785ff`, rows 57 pitch, divider `#e9e9e9`, chips 21h r6 tint pairs, 23px brand tiles r6.

3. **Dark dashboard: CopeCart overview (navy)** - `copecart/copecart-00.png`, 2880x2070, scale 2.0, visible CSS window 1405x984 from x=35, y=51, bleeding off the right and bottom. Shows icon rail + sidebar with segmented Community/Creator, overview with filter pills, revenue line chart card with tooltip, report list, 3 key-metric cards. Build: one surface `#0e121b`, borders `#222530`, nav active `#181b25` r8.6 32h, segmented track 32h with active `#0e121b` inset; title 18/500 white + 14 `#99a0ae` sub; filters 34h r8.6 1px `#222530` text `#99a0ae`; chart card r20, label 14 `#99a0ae`, value 32/500 white + delta `#1daf61` 14 + `vs prev` `#99a0ae`; grid solid `#181b25` + dashed `#222530` 4/4; line 2px `#405bfb`; tooltip r10 1px `#222530` + date 12 `#717784` + value 18 white.

4. **Table/list: AM Trades users (dark)** - `am-trades/am-trades-07.png`, 2880x2070, scale 2.0, visible CSS window 1406x980 from y=43, bleeding off the left edge. Shows sidebar with counts, Users page: title + sub, underline tabs, search + 2 filters, users table with outline plan chips, verified dots, dates and row actions. Build: canvas `#2e2e2e`, sidebar `#121212` (nav 32h r10, active `#1c1c1c`, text `#a3a3a3`/`#e4e4e4`, counts `#5c5c5c` right-aligned), panel `#0a0a0a` with 1px `#1c1c1c` and top bar 54h; content column from x=381; title 24/500 `#e2e2e2`, sub 14 `#6d6d6d`; tabs 14 with 1px label-width underline `#4785ff`; toolbar: search 32h r7 (flex) + filters 32h r6 `#121212`; table r10 1px `#1c1c1c`, header band `#121212` 37h with 11 caps `#5c5c5c`; rows 76 pitch, 40 avatar `#1c1c1c`, name 14 `#e2e2e2` + email 14 `#5c5c5c` `·` time; chips KMD-08 dark; verified = 5px dot + 14 text `#1daf61`; date 14 `#7b7b7b`; actions 16 `#525252` at 30px pitch.

5. **Settings / form: Profile settings** - `kxl-031-0-2110484440866582618.jpg`, 4096x2877, scale 2.844, CSS frame 1440x1012. Shows settings sidebar + Profile form: upload-photo card with mint avatar, two-column fields with inline hints, email field, divider, Language and region section. Build: white page, header 30h band `#e0e0e0` top chrome then 31px title row with divider `#ececec`; content column from x=540, width ~720; section title 18-20/500 `#191919`, sub 14 `#595959` 8px below; upload card r15 ring `#ebebeb`, pad 24, 44 avatar `#def2f1`/`#0d4749`, title 14/500 + sub 13 `#595959`, Upload button 28h r7 L1 shadow; labels 13 `#5f5f5f` with `·` hint `#959595`, 8px above inputs; inputs 40h r8 L1 shadow, value 14 `#181818`, 2-col gap 8; divider `#ebebeb` 16px below last field.

6. **Modal / popover: Plunio delete confirm (+ calendar popover)** - `plunio/plunio-02.png`, 2880x2070, scale 2.0; modal CSS 372x292 inside a visible 1376x900 window (from x=64, y=68), centred on a `#c2c2c2`-`#c8c8c8` scrim over the library grid. Build: modal r29 white, L4 shadow; centred 56 icon tile `#fef1f1` r16 [V] with 24 trash `#eb4747`; title 18/500 `#171717` 24 below tile; body 14 `#5c5c5c` centred 2 lines, line-height ~20; divider `#ebebeb` full width 20 below; footer pad 16/16, two equal 36h buttons gap 10: Cancel white r10 ring `#ececec` L1, Delete flat `#eb4747` r10 white 14/500. Alternate popover: `kxl-014-1-2111515571179122856.jpg` 960x2048 @2x, popover 303x255 r12 L2, header row swatch 10px `#e0ce60` r2 + 14 `#616360` + three 16px icon buttons, title 14/500 `#0a0a0a`, detail rows 30 pitch with 16 icons `#868885`.

7. **Detail: Clokora invoice** - `clokora/clokora-06.png`, 2880x2070, scale 2.0, visible CSS window 1402x992 from x=38, y=43. Shows breadcrumb, invoice header (48 tile, INV number 24, Waiting chip, meta), From/Bill to block, issued/due/status row, line-item table, totals, right summary rail. Build: page `#fafafa`, top nav as replica 1, breadcrumb row 47h with divider; container 1200: main 914 + 1px rail divider `#ebebeb` + rail 250; header tile 48 `#e8e8e8` r4 + 24/400 `#171717` + chip 20h r0 `#f4eee6`/`#b36100` 10 caps + meta 13 `#5c5c5c` joined by `·`; right amount 20/500; caps labels 11 `#a3a3a3`, values 14/500 `#171717`; table header caps 11 `#a3a3a3`, rows 60 pitch dividers `#ebebeb`, numbers right-aligned tabular 14 `#5c5c5c`; totals right column, "Total due" value 20/500; rail cells 110 pitch, caps label + 18/400 value.

8. **Latest-X component: search modal** - `kxl-020-0-2111131955404128683.jpg`, 2880x2048, scale 2.0, CSS 1440x1024. Shows a blurred AI-assistant app under a scrim with a two-part command palette: search bar and results panel (segmented filter, Recent chats list, right column of filters). Build: scrim `rgb(0 0 0/.22)` + backdrop blur ~4px over the app; bar at x=350, y=156, ~900 wide, 55h r16 white, 16 search icon `#919191` + 16 placeholder `#636363` [V size]; 16 gap; panel r16 white L2/L4 hybrid (ring + `0 0 6px rgb(0 0 0/.06)`), pad 16; segmented 30h track ring `#ededed`, items 14, active white + ring + 1px bottom shade, active `#060606`, idle `#636363`; caps mono label 12 `#666666` 24 below; rows 56 pitch: 17px tile r4 (`#346eda`, orange, violet, red, green) + title 14/500 `#0c0c0c` + sub 14 `#626262`. CRM alternate: `kxl-046-0..2` (1540x3060 @3x, CSS 513x1020 each slice): icon rail 70 with 33px active tile `#f1effd` r8, list sidebar with count badges 21h r6, table frame r10 header `#fbfbfb` 37h, rows 40, chips 24h r6, avatars 20, Add person 30h r8 indigo glow.

## 9. What was new vs the existing studies

- 300 case images re-downloaded at the 2880x2070 originals (earlier gallery: 1800x1294); 118 product-UI originals kept, of which 18 are new to the engine (AM Trades 12, Rork 6) plus 1 Stardust image re-ordered; 2 new case studies (AM Trades, Rork) and one new case template (Overview / Challenge / Outcome / Gallery carousel / Testimonial / Tools used).
- 49 X posts after 12 Oct 2026, 39 images kept (design posts only; personal, LinkedIn and third-party-site screenshots removed).
- First pixel-fitted shadow tiers, arc-fitted radii, ink-alpha ladders and exact palette provenance (AlignUI neutral/gray). The earlier notes had estimated (E) values for X shots; this note replaces them with [P] values where measured.

## 10. Open questions

- AlignUI palette match: confirm the recalled AlignUI hexes against the live kit before encoding "AlignUI neutral" as a named system.
- Font identity: Clokora and ZeroLeaks look Geist-like but this was not verified glyph by glyph; tracking was not measured (needs a known string at a known size).
- (resolved 2026-10-22, KMD-24: exactly 2.0) uniops-02 scale (2.0 vs 1.81) was not fully resolved: 14px caps and the 2796px visible frame (1398 CSS at 2.0x) favour 2.0, the 22px traffic lights favour 1.81; hairlines render about 2.5px wide.
- Hover and pressed states are only visible in two places (UniOps menu hover `#1d1d1d`, focused select); no light hover state was captured.
- Weights are [V]; stem-width measurement on JPEG X files was too noisy to separate 400 from 450.
- Videos in the latest posts (showreel, ZeroLeaks, AM Trades, sideshift app-store) were not frame-sampled; thumbnails only.

## 11. Replica pass 2026-10-22: six more screens rebuilt to registration (new and corrected rules)

Evidence: `work/replicas/KARGUL-REPLICAS-NOTES.md`, the replicas `work/replicas/app/src/KargulR1..R6.tsx` (`#/kargulr1..6`) and the overlays `work/replicas/cmp-kargulr<N>-side.png` / `-overlay.png`. The references are:
- `kargul-studio-2026-10/uniops/uniops-02.png` (R1);
- `listkit/listkit-00.png` (R2);
- `kargul-x/latest/kxl-014-1-...jpg` (R3, 716 likes);
- `copecart/copecart-00.png` (R4);
- `sideshift/sideshift-07.png` (R5);
- `rork/rork-00.png` (R6).

All are exact 2x. Values are CSS px. [R] means measured on the original and confirmed by a registered replica: the overlay agrees within about 1px. This section corrects §1-§3 where they disagree.

- **RULE KMD-24** Treat studio case originals as exact 2x and solve the scale from a label set, not from OS chrome.
  **Why** uniops-02 is 2.0: eight sidebar labels fit Inter 14/450 within 0.5px each. The 22px traffic lights were 11.5px chrome, not a 1.81x clue. This closes the §6/§10 open question.
  **Check** fit 6-8 strings with the fonttest before taking any size. **Source** [R] R1

- **RULE KMD-25** Fit radii on the outer edge of a ring-edged card. Corrected UniOps values:
  - KPI and time strips: r22.5;
  - setup card: r22;
  - list cards: r18;
  - app panel: r21;
  - window: r25.
  **Why** The §3.2 fits (20.6, 16.4) read about 10% low because they started inside the 1px ring. The replica only registered at the corrected values.
  **Check** a corner-offset fit from the first ring pixel, rms < 0.8px. **Source** [R] R1 (619,554), (619,1446), (567,329), (134,130) @2x

- **RULE KMD-26** Identify the kit per product before naming tokens. ListKit is stock Tailwind v4 plus one navy ink:
  - chips are 50 fill / 100 ring / 500-600 text triples: emerald `#ecfdf5/#d0fae5/#00bc7d`, orange `#fff7ed/#ffedd4/#ff6900`, indigo `#eef2ff/#e0e7ff/#4f39f6`, yellow `#fefce8/#fef9c2/#d08700`, red `#fef2f2/#ffe2e2/#fb2c36`, lime `#7ccf00`;
  - the badge is rose-500 `#ff2056`;
  - ink `#0d2a4c`, accent `#288dff`.
  CopeCart is AlignUI gray; UniOps and Clokora are AlignUI neutral.
  **Why** It corrects KMD-01's "always AlignUI". He uses whatever stock ladder the product's kit ships, verbatim.
  **Check** every status hex in a view is one ladder's step. **Source** [R] R2 chips row 1-20; R4

- **RULE KMD-27** Set app-view body text at weight 400 (60-80% of all text). Reserve 450-500 for titles, values and the active nav item, and 600 only for mobile titles.
  **Why** All six screens measure this way. The product-ui canon check "weights in {500,600}" fails every one of his screens.
  **Applies to** product UI, not heroes. **Check** the weight census share of 400 >= 0.6. **Source** [R] R1-R5 gate `type.weights`

- **RULE KMD-28** Allow 6-10 type sizes in an app view, stepping 0.5-1px around 13-15. Carry hierarchy by ink vs one grey, and make list-row titles larger than the card titles above them:
  - UniOps: card title 14, row title 15/450, sub 13;
  - ListKit: name 13.5, job 12.4.
  **Why** Measured on every app screen. The "<= 4 sizes" canon is a hero rule.
  **Check** adjacent text roles differ by <= 1px or by ink. **Source** [R] R1, R2, R4

- **RULE KMD-29** Keep fractional sizes when replicating: 13.5px body (ListKit, SideShift), 17.5px titles (CopeCart), 22.5px compound values (UniOps).
  **Why** At exact 2x the ink widths only fit at the half-pixel. Rounding to 14 or 18 put every line end 2-5px off.
  **Source** [R] R2, R4, R1

- **RULE KMD-30** Do not copy his secondary greys for contrast. They sit at about 3:1:
  - `#717784` on `#0e121b`: 3.0;
  - `#8b8b8b` on `#f7f7f7`: 3.2;
  - `#8d8d8d` on `#f4fcf4`: 3.3.
  Our builds keep 4.5:1 and take his structure only.
  **Why** The gate's `contrast.page` FAILs the reference itself. The premium read comes from the ink/grey split, not from the exact grey.
  **Source** [R] R1, R4, R5

- **RULE KMD-31** Choose card radius by card size, not by the control-height band:
  - r8: 62px calendar events;
  - r10: tables;
  - r16-18: list cards;
  - r21-22.5: strips and panels;
  - r32.5-35: phones and bento cards.
  **Why** The canon's `radius.ladder.boxes` bands (cap 25) FAIL all six references.
  **Check** radius grows with the box's short side. **Source** [R] R1-R6

- **RULE KMD-32** Give illustration and app tiles a radius proportional to the side, about 0.19 x side, with circular corners: 23/126, 33/186, 45.5/240, 74/381.
  **Why** The four Rork tiles fit within 1px, rms 0.5-0.75; not squircles.
  **Source** [R] R6 cell 4

- **RULE KMD-33** Keep an inset well's radius close to its card's, not concentric: a well r29 inside a card r35 at a 10.5 side / 13 top inset (concentric would be 24.5).
  **Why** It reads as an even rim. A strictly concentric inner corner looks pinched at that inset.
  **Source** [R] R6

- **RULE KMD-34** Build dark product UI from one surface, one raised step and one rule, with no blur:
  - surface `#0e121b` (rail, sidebar, page, cards);
  - raised `#181b25` (active nav, segmented track, footer strip, icon discs);
  - rule `#222530`.
  A floating tooltip gets a solid second edge `0 3px 0 #181b25` instead of a shadow.
  **Why** Registered to 1.9 mean diff, with no shadow anywhere. It extends KMD-06 with the tooltip construction.
  **Source** [R] R4

- **RULE KMD-35** Draw line charts as straight segments with mitre joins (no curve smoothing):
  - about 35px sampling, a 1.3px line in the one accent `#405bfb`;
  - a 4px dot on the selected point;
  - solid horizontals one step up, dashed 4/4 verticals at category centres;
  - axis labels 13 in the third grey under the plot.
  Bars come in pairs, 15 wide with a 4 gap at a 50 pitch, rounded on top only and sitting on the card edge.
  **Source** [R] R4 main, small and step lines traced column by column

- **RULE KMD-36** Calendar geometry:
  - hour 64px;
  - event top = slot + 4 and height = duration x 64 - 2, r8;
  - title 14/480 at a 7.6px inset, time 13 at -0.03em on an 18px pitch;
  - half-hour events centre their one line;
  - the selected event gets an inset 1.5px dark same-hue ring, and its content shifts 2px inward.
  **Why** All 14 events registered within 1px. **Source** [R] R3

- **RULE KMD-37** Draw the "now" indicator in three parts, all under the events, in one warm colour (`#e0735a`):
  - a 1px hairline across every day;
  - a 2px bar through today only;
  - a 9px dot on today's left day line.
  **Source** [R] R3

- **RULE KMD-38** Build popover detail rows as:
  - rows at a 30px pitch;
  - 15px icons one rung lighter than the text (`#8a8a8a` beside ink);
  - a 13px icon-to-text gap;
  - text 14 at -0.012em;
  - a 14/500 title.
  The header is a 10px colour swatch (r2.5) + a 14 grey category + three 15px icon actions. The popover is 304x256, r12, ring `#e6e6e6` + `0 4px 14px rgb(0 0 0/.05)`.
  **Source** [R] R3 (confirms and tightens KMD-05 L2)

- **RULE KMD-39** Put a grey label and an ink value at one size inside one filter control ("Range **Last 30 days**", "Scope **All tools**"). Pills are 32.5h r10, white on `#f7f7f7`, ring `#e6e6e6` + `0 1px 2px .05`.
  **Source** [R] R1

- **RULE KMD-40** Prefer one strip card split by 1px rules over separate KPI cards:
  - icon at a 22px inset, text column at 52 (icon 16 + 14 gap);
  - title 14, sub 13 grey;
  - value 24/400, with a grey 13.5 qualifier on the value's baseline.
  **Source** [R] R1 (four 257px cells)

- **RULE KMD-41** Keep compound values at one size and grey only the unit words: "42 *hour* 18 *minutes*" at 22.5 with the units in `#7b7b7b`; "16*/50*" with the "/50" in `#a3a3a3`.
  **Source** [R] R1

- **RULE KMD-42** Build table hierarchy in one ink:
  - size steps (13.5 name, 12.4 role);
  - links shown by a pale underline (`#d5dae1`, offset 3), not colour;
  - a 42h header band only 1-2% off the body (`#f8fafb`) with 13/500 labels and 14px icons;
  - 38px rows split by `#ebecf0`;
  - the free-text column truncated at a fixed width (308px).
  **Source** [R] R2 (tightens KMD-15/16)

- **RULE KMD-43** Mobile frames:
  - 430x932 at r32.5, 32px apart;
  - SF Pro at the iOS ladder 24/600, 20/600, 17/500, 15, 13-13.5, 13/500;
  - status time 17/600.
  His caption says "SF Pro Rounded", but the shipped frame is SF Pro: terminals are flat and the widths fit SF Pro within 0.5px.
  **Source** [R] R5; X post 2112914617944998068

- **RULE KMD-44** Show progress by structure:
  - completed items get a 1px saturated ring on their 50 tint (`#0bbb46` on `#f4fcf4`);
  - not-started items stay white with a `#e6e6e6` ring;
  - a 3px connector runs through the 22px gaps;
  - a 44px ring with a 3.5 stroke carries the count.
  The only drop shadow on the screen sits under the round primary action (44px play, gradient `#4acc76` → `#15bd4d`, 1px darker rim, 8px drop).
  **Source** [R] R5

- **RULE KMD-45** Marketing illustrations use one 4-step grey ladder (`#303030` `#383838` `#504e4e` `#656262`) + white for the single focal object per cell + one brand hue per section, built from primitives: 6px round strokes, pills, rounded rects, arcs. Titles are Helvetica Neue 500 36/-0.02em, centred in the narrow row and left-aligned at 43px in the wide row.
  **Source** [R] R6 (0.9 mean diff)

- **RULE KMD-46** Centre control labels on the cap: cap centre = box centre within 0.5px. Calendar event blocks are the exception: top-aligned at 7.6px.
  **Why** UniOps pill labels registered only after moving down 1.5px to his cap position. The gate's `align.vertical-centre` then passed; it still flags the event blocks, a known false positive for multi-line blocks.
  **Source** [R] R1, R3

- **RULE KMD-47** Read his X design posts for type and colour, and take grid behaviour from case originals. In the calendar post, events drift 18-30px off the day lines (composed, not computed): never copy that offset into product code.
  **Source** [R] R3

- **RULE KMD-48** Solve the face per product from a 6-8 string width set before building:
  - Inter: UniOps, CopeCart, the calendar post;
  - SF Pro: SideShift, and the closest fit for ListKit (about 1px per string, still unidentified);
  - Helvetica Neue 500: Rork marketing titles.
  **Why** One wrong face makes every inner word drift 2-6px even when line ends register (ListKit overlay).
  **Source** [R] R1-R6

- **RULE KMD-49** Rank his work's premium read by these measured constants, in order:
  - one family at 400 with ink/grey hierarchy;
  - flat surfaces with 1px one-step rules, blur only on floating layers and the round primary;
  - one accent, with status only as 50/100/600 triples;
  - exact repeated pitches (38 / 57.5 / 64 / 120 / 30);
  - radii scaled to box size;
  - labels on the cap centre.
  **Source** [R] R1-R6 synthesis (KARGUL-REPLICAS-NOTES.md)

Canon corrections these rules imply (for `system/canon/product-ui.json` when the founder confirms): `type.weights` should allow 400 as the app body weight, `type.sizes` should allow 6-10 in app views, `radius.ladder.boxes` should scale with box size above 80px, and `align.vertical-centre` should exempt multi-line event blocks.
