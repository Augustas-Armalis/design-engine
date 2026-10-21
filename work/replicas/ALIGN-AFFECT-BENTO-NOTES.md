# AlignUI and affectUI bentos: measured anatomy and the spec to build Cadence bentos from

Captured 2026-10-21, read-only Playwright, Chromium, 1440 wide, deviceScaleFactor 2, non-essential cookies declined, no forms.
Study only, never published. Replicas are our own code written from computed styles and pixel probes.

| | AlignUI | affectUI (Flo Hoeller) |
|---|---|---|
| source | `https://pro.alignui.com/block-preview/default/features-04` (PRO blocks > Features 04, the iframe behind `pro.alignui.com/blocks/features`) | `https://www.affectui.com/` home, section "One file per piece, code you own" |
| reference | `knowledge/benchmarks/bento/alignui-live-bento@2x.png` (2880x2090 = 1440x1045) | `knowledge/benchmarks/bento/affectui-live-bento@2x.png` (2016x1218 = 1008x608, the section box) |
| replica | `#/alignbento`, `work/replicas/app/src/AlignBento.tsx`, render `work/replicas/alignbento-replica@2x.png` | `#/affectbento`, `work/replicas/app/src/AffectBento.tsx`, render `work/replicas/affectbento-replica@2x.png` |
| overlay | `work/replicas/cmp-alignbento-{side,overlay}.png` | `work/replicas/cmp-affectbento-{side,overlay}.png` |
| registration | header, tabs, cards, titles and descriptions: 0.0px ink delta. Inner components: 0-1px (row icons and arrows up to 1.5px, % strings up to 1px). Inner card edges are 0.5px off on the bottom edge only (Chrome snaps the half pixel). | everything measured is 0.0px, except the Follow button (0.5px) and the cursor (1.5px, our own glyph). Card borders, stage rings, tiles, split edge and toggle are pixel-identical. |
| what differs on purpose | `%` glyph: their inner cards are raster PNGs whose `%` is narrower than Inter Variable's; we tighten `%` strings by -0.5px. Row icons are the nearest Remix glyphs. | logos, centre mark, memoji, cursor and folder are our own neutral placeholders (no brand marks). |

Other AlignUI candidates looked at: alignui.com home has no true bento (code+preview frame, a 3x3 dark feature grid, a 4x2 block gallery); PRO Features 01/06/07 are bentos of plain tiles or phone mockups; Features 04 is the one with real product components, so it is the reference. affectUI also has a 2-up MCP card pair (`lp-section` above, 2 tiles in a 1px framed well) not replicated here.

Animation capture method (affectUI loops are CSS keyframes): `document.getAnimations()`, `pause()`, set `currentTime` per loop (install 4200 ms of 6 s, tweak 5000 ms of 10 s, theme 1800 ms of 6 s). That gives a deterministic frame with the DOM and the screenshot in the same state. Script: scratchpad `scripts/afref.mjs`.

---

## 1. AlignUI Features 04 (light, "card well + white instrument card")

### Page and header (from computed styles)
- Canvas white `#fff`. Container 1280 centred, padding 96 top/bottom, 28 sides, so content is 1224 wide at x 108.
- Badge: 28 high, radius 9, fill `#f7f7f7`, no ring (ring tokens present but transparent), padding 0 10 0 7, gap 4. Icon slot 16x16 holding a 6px `#335cff` dot. Label 14/20/500, tracking -0.084px (-0.6%), `#5c5c5c`.
- Title: margin-top 12, 48/56/550, tracking -0.48px (-1%), `#171717`. Inter Variable with optical size auto (opsz follows size).
- Description: margin-top 16, max 528 wide, 16/24/400, tracking -0.176px (-1.1%), `#5c5c5c`. The second line is a `<span>` at weight 500, same colour: emphasis by weight, never by colour.
- Header to tabs 40, tabs to grid 40.

### Tabs (segmented chips above the bento)
- 40 high, padding 8 14, gap 8, radius 12, label 16/24/500/-0.176. Icon 22 box, glyph scaled 0.9 (renders 20).
- Active: fill `rgba(71,108,255,0.10)`, text and icon `#335cff`, no shadow.
- Inactive: fill `#fff`, text `#5c5c5c`, icon `#a3a3a3`, shadow `0 3px 3px -1.5px rgba(23,23,23,.04), 0 1px 1px -0.5px rgba(23,23,23,.04), 0 0 0 1px #ebebeb`.
- Chip gap 12. Icons: RiBarChartFill, RiDiscussFill, RiMacFill.

### Grid and cards
- 3 columns of 392, gap 24 (`grid-template-columns: 392px 392px 392px`). Equal tiles; the bento rhythm comes from the inner component, not from spans.
- Card (well): fill `#f7f7f7`, radius 32, padding 10, flex column, gap 32, no border, no shadow. Height comes from content (572.9).
- Header block inside the card: padding 30 30 0.
  - Icon tile 48x48, radius 14, fill `#fff`, shadow `0 3px 3px -1.5px rgba(23,23,23,.04), 0 1px 1px -0.5px rgba(23,23,23,.04), 0 0 0 1px rgba(23,23,23,.02)`. Glyph 28 box scaled 0.9 (ink 21), `#335cff`. RiFolderChart2Fill, RiPieChartFill, RiUserFill.
  - Title: margin-top 32 (to the icon tile), 20/28/500, tracking 0, `#171717`.
  - Description: margin-top 8, 16/24/**500**, tracking -0.176, `#5c5c5c`, 2 lines max at 312 wide.
- Inner instrument card (the "image"): 372 x 327 slot, card-in-card. White surface 369 x 321.5 inset 1.5/1 from the slot, radius 22 at the outer ring (32 outer - 10 padding: concentric). Ring OUTSIDE the white: `0 0 0 1px rgba(23,23,23,.022)` (reads `#f2f2f2` on `#f7f7f7`, invisible on white), plus `0 1px 1px -0.5px rgba(23,23,23,.045), 0 3px 3px -1.5px rgba(23,23,23,.045)` (bottom edge reads `#e3e3e3` then fades over 4px). The card's bottom sits 14px above the well's bottom: the well's padding is 10 and the shadow takes the rest.
- Live DOM fact: on the live page the inner cards are raster PNGs (`alignui.com/images/blocks/features-4-image-{1,2,3}.png`, 750x659 for 372x327, so a 375-wide design at 2x). The marketing layer is HTML; the product proof is a designed image, art-directed at 2x.

### Inner card anatomy (CSS px from the white card's slot origin)
- Inset 21 on all sides (1 ring + 20 padding). Content width ~330.
- Header row: title 14/20/400 `#5c5c5c` at top 20; optional info glyph RiInformationFill 14 `#d1d1d1` 4px after the title. Right: stroke button 28 high (27.5), radius 8, inset ring `#ebebeb`, shadow `0 1px 2px rgba(10,13,20,.03)`, label 14/20/400 `#5c5c5c`, padding-x 10, right edge 21 from the card edge, top 21.
- KPI row (top 44.5): number 24/32/400 `#171717` (rendered 23.8 because of the 0.992 raster scale), then either a delta "+2.1%" 14px `#1fc16b` + " vs last week" `#5c5c5c`, or a pill badge 20 high, radius full, 12/16/500: AlignUI "light" badge = fill `{family}-200`, text `{family}-950` (red `#ffc0c5`/`#681219`, green `#c2f5da`/`#0b4627`). KPI to badge gap 8-10.
- Body starts at y 96 in every card (24 below the KPI row):
  - Marketing: 3 stacked bars 12.5 high, radius 4, gap 4.5, ratio about 40/45/15, colours `#fa7319`, `#f6b51e`, `#22d3bb`. Legend at y 124: 16px slot with an 8px dot, gap 4, label 12/16/400 `#5c5c5c`, items 16 apart. Dashed rule at y 161: 1px `#ebebeb`, 5 on 3 off. Table head at y 183: 12/16/400 `#a3a3a3`, columns at x 21 / 200 / 287. Rows at 215 + 35.75n: 18px outline glyph `#a3a3a3` (RiUser3Line, RiTimeLine, RiFocus3Line), label 14/20/400 `#5c5c5c` at x 47, value at x 202, arrow 17.5 (green `#1fc16b` up, red `#fb3748` down) at x 286.5, delta at x 307.
  - Traffic: solid rule 1px `#ebebeb` at y 97.5. 3 columns at x 21 / 142 / 262 (pitch 121), vertical separators 1px `#ebebeb` at x 126.5 and 246.5 from y 120 to 303. Column: label 14/20 `#a3a3a3` (y 120), value 19.8/28/400 `#171717` (y 143.7), delta 14px `#5c5c5c` + 20px arrow at y 259 (gap 3), colour bar 89 x 8.5, radius 2, at y 294.5 (`#f6b51e`, `#47c2ff`, `#7d52f4`).
  - Retention: 12 x 12 triangle heatmap, cells 26 x 15, radius 2, pitch 27.64 x 15.97 (gaps about 1.6 x 1), three tones of one hue: `#335cff`, `#9db1ff`, `#ced8ff`. Axis labels 1-12 at y 297, 12/16 `#a3a3a3`, centred on columns.
- Palette inside the card: only the AlignUI neutrals (`#171717`, `#5c5c5c`, `#a3a3a3`, `#d1d1d1`, `#ebebeb`) plus one series palette per chart. The accent blue appears in the outer icons, active tab and heatmap only.

### Radius ladder (rendered)
| element | height | radius |
|---|---|---|
| card well | 573 | 32 |
| inner instrument card | 322 | 22 (outer ring), concentric with 32 - 10 |
| outer icon tile | 48 | 14 |
| tab chip | 40 | 12 |
| badge (eyebrow) | 28 | 9 |
| inner stroke button | 28 | 8 |
| pill badge | 20 | full |
| bars | 12.5 | 4 |
| colour bar, heatmap cell | 8.5 / 15 | 2 |

### Elevation recipes
- `tile`: `0 3px 3px -1.5px rgba(23,23,23,.04), 0 1px 1px -0.5px rgba(23,23,23,.04), 0 0 0 1px rgba(23,23,23,.02)` (icon tiles, and with a 0.045 lift on the inner card).
- `chip-stroke`: same two lifts + `0 0 0 1px #ebebeb` (inactive tabs).
- `button-stroke-xs`: `inset 0 0 0 1px #ebebeb, 0 1px 2px rgba(10,13,20,.03)`.
- Wells never carry a shadow or a border: depth is grey well (`#f7f7f7`) vs white instrument.

---

## 2. affectUI "One file per piece" (light, "white tile + framed stage + live mini-UI")

### Tokens (live `:root`, light)
`--bg #f5f5f5`, `--card #fff`, `--preview #fafafa`, `--muted-bg rgba(0,0,0,.04)`, `--hover-bg rgba(0,0,0,.05)`, `--text #0a0a0a`, `--text-muted #737373`, `--text-subtle rgba(0,0,0,.4)`, `--border #e5e5e5`, `--card-stroke rgba(10,10,10,.055)` (`#0a0a0a0e`), `--pro-from #dd0674`, `--pro-to #5e3ee0`, `--radius-card 14`, `--radius-pill 999`, `--ease-out cubic-bezier(.22,1,.36,1)`. Section page fill `#fff`. Body type 13 / 18.571. Font: static Inter (fontsource, text cut), so with Inter Variable set `font-variation-settings: "opsz" 14` (auto opsz makes the 28px title 14px too narrow). Mono = `ui-monospace, SFMono-Regular, Menlo`.

### Section and grid
- Section max 1008, padding-bottom 112. Intro: centred title 28/34/500, tracking -0.7px (-2.5%), `#0a0a0a`, forced 2-line break. Grid padding-top 32 (title to tiles), `repeat(3, minmax(0,1fr))`, gap 14 (tiles 326.66 wide). "Learn more" row padding-top 32: secondary pill 36 high, padding 0 15, fill `rgba(0,0,0,.04)` (hover `.05`), 13/18.571/500.

### Tile (`lp-tile`)
- Fill `#fff`, border 1px `rgba(10,10,10,.055)`, radius 14, padding 6 6 18, flex column. No shadow at rest.
- Stage (`lp-tile__stage`): height 220, radius 8 (= 14 - 6, concentric), fill `#fafafa`, ring `inset 0 0 0 1px rgba(10,10,10,.055)`, `overflow: hidden`, `display: grid; place-items: center`, margin-bottom 16.
- Title: 15/22/500, tracking -0.2px, padding 0 12 4 (so the text aligns 18px in from the tile edge = 6 + 12). Text: 13/20/400 `#737373`, padding 0 12. Tile height 328.

### Stage compositions (the inner UI is real DOM, tiny, and centred)
- Shared mini-component kit ("tray"): grey well `rgba(0,0,0,.04)` radius 12 padding 3, a 24px head row (10.5px/500 `#0a0a0a`, padding 0 8 1, gap 6, meta right-aligned `rgba(0,0,0,.4)` weight 400), and a white card inside: border 1px `#e5e5e5`, radius 9 (12 - 3, concentric). Rows inside cards 24-26 high.
- Stage 1 Install (`ba-install`, 250 wide, gap 8 between trays, centred): terminal tray (`>_` 9px/600 mono `#737373`, meta "zsh"); card padding 8 10, mono 10/15, `$` `rgba(0,0,0,.4)`/500, command typed with a 1.5px caret, "✓ Created 1 file" `#1f8a4c`. File tray: 15x13 glass folder, meta "2 files"; card padding 4, file rows 24 high radius 6 padding 0 6 gap 7, 10.5px `#737373`; ext chip 8px/600/13 radius 4 padding 0 4 on `rgba(0,0,0,.04)`; the new row is `rgba(0,0,0,.05)` with a violet ext chip (`#5e3ee0` at 12%) and a "New" pill (9px/500/15, `#dd0674` on 10%).
- Stage 2 Tweak (`ba-tweak`): dotted field `radial-gradient(#e5e5e5 1px, transparent 1.2px)` at 12px, offset 6px. A 290x180 box centred and `scale: .88`. Left: Preview tray 124x180 (profile card: 30px avatar circle on `#dd0674` 10%, name 10.5/13/500, role 9/11, stats 8.5 with 600 numerals, full-width button 9.5/500 radius = the radius control's value). Right column 158 wide at x 132, trays at y 0/62/124 with 26px rows: Accent (five 11px swatches gap 9, a 17px selection ring `0 0 0 1.25px #0a0a0a`), Radius (3px track `rgba(0,0,0,.04)`, ink fill, 10px white thumb with 1.25px ink ring, tabular value), Shadow (24x14 switch, `#1f8a4c` on, 10px knob `0 1px 2px rgba(0,0,0,.2)`). A cursor (fill `#141b34`, 1.7px white keyline, `drop-shadow(0 2px 4px rgba(0,0,0,.18))`) drives it; the profile card gets `0 12px 24px -10px rgba(0,0,0,.25), 0 2px 4px rgba(0,0,0,.05)` when "Soft lift" is on.
- Stage 3 Theme (`ba-theme`): two identical layers (light `#fafafa`, dark `#121213`), the dark one revealed by `clip-path: inset(0 0 0 X)`, a 1px edge `rgba(143,143,143,.4)` at X, and a 30x17 toggle `rgba(143,143,143,.35)` with a 13px knob at top/right 10. Content: an integration grid sized in container units (`u = width / 1200`, 1200x560 design space, 140-unit tiles on a 160 pitch, centre tile 168). Tile radius 22u, fill `rgb(255 255 255 / a)` with `a` falling off from the centre (0.545 near, 0.355 far), ring `inset 0 0 0 1u rgb(0 0 0 / .15*(.7+.3k))`, shadow only below `0 12u 14u -10u rgb(0 0 0 / .06*(.65+.35k))`; dark: tile `rgb(35 35 38 / a)`, ring white .1, shadow x4; centre tile `#fff`/`#2a2a2d`, ring `.14`/white `.16`, shadow `0 16u 18u -12u` `.14`/`.5`.
- Motion (live): CSS keyframes only, 6 s and 10 s loops, `--ease-out`, `steps(28)` typing, every loop disabled under `prefers-reduced-motion`. Animated `--ba-r` (registered custom property) drives the button radius, slider fill and value together.

### Radius ladder (rendered)
| element | height | radius |
|---|---|---|
| tile | 328 | 14 |
| stage | 220 | 8 (14 - 6) |
| tray | 50-88 | 12 |
| tray card | 26-58 | 9 (12 - 3) |
| file row, ext chip | 24 / 13 | 6 / 4 |
| Learn more, pills, switch, toggle | 36 / 15 / 14 / 17 | full |
| integration tile / centre | 34 / 41 | 5.4 / 6.8 (22u / 28u) |

---

## 3. Bento spec to build from (Cadence)

Pick ONE grammar per section; do not blend the two in one grid.

**Shared rules**
1. Equal columns, no spans: 3 x 392 gap 24 at 1224 content (AlignUI) or 3 x fr gap 14 at 1008 (affectUI). The rhythm comes from what is inside each tile.
2. Every nested corner is concentric: inner radius = outer radius - the padding between them (32/22 with 10; 14/8 with 6; 12/9 with 3). Measure rendered radii, never class names.
3. One edge per box: a well is fill only (AlignUI) or a 1px alpha border (affectUI); never border + shadow on the same outer tile.
4. Hairlines are alpha-on-ink: `rgba(10,10,10,.055)` (affectUI) or `rgba(23,23,23,.02)` ring + `#ebebeb` dividers (AlignUI). Divider colour inside product UI is `#ebebeb` / `#e5e5e5`, never darker.
5. Header block above the stage is always the same three lines: icon or none, title, 2-line description. Description is muted grey and at most 2 lines at the tile width.
6. Text tuples (copy exactly): AlignUI title 20/28/500/0, desc 16/24/500/-0.176, eyebrow 14/20/500/-0.084, section h 48/56/550/-0.48, sub 16/24/400/-0.176. affectUI title 15/22/500/-0.2, desc 13/20/400 `#737373`, section h 28/34/500/-0.7.
7. Grey ramp only for text: AlignUI `#171717 / #5c5c5c / #a3a3a3 / #d1d1d1`; affectUI `#0a0a0a / #737373 / rgba(0,0,0,.4)`. One accent hue; charts get their own small series palette.
8. The stage holds a real, believable mini product UI (numbers, names, states), never an illustration of a feature. Sample data must be internally coherent.

**AlignUI grammar (grey well + white instrument card)**
9. Well: `#f7f7f7`, radius 32, padding 10, gap 32, no shadow. Copy block padding 30 30 0; 48px white icon tile radius 14 with the `tile` shadow; title 32 below it; desc 8 below the title.
10. Instrument card: white, radius 22, inset 21 for content, ring outside `rgba(23,23,23,.022)` + lift `0 1px 1px -.5px rgba(23,23,23,.045), 0 3px 3px -1.5px rgba(23,23,23,.045)`. It fills the well's width and bleeds to 10px from the well's bottom.
11. Instrument header: 14/20/400 `#5c5c5c` label at top 20 + 28px stroke button (radius 8, inset `#ebebeb` ring, `0 1px 2px rgba(10,13,20,.03)`), KPI row 24/32/400 at top 44 with a delta (14px green `#1fc16b`/red `#fb3748`) or a 20px pill (`-200` fill, `-950` text). Body always starts at y 96.
12. Data marks: radius 4 for 12px bars, 2 for small cells and colour bars; heatmaps use three tones of one hue (base, +50% tint, +75% tint).
13. Icons: Remix, fill style in tiles and chips, line style in tables; glyphs scaled 0.9 inside their box; 22 in chips, 28 in tiles, 18 in rows.
14. Tabs above the grid are 40px chips (radius 12): active = 10% accent fill + accent text; inactive = white + `#ebebeb` ring + 2-layer 4% lift.

**affectUI grammar (white tile + framed stage)**
15. Tile: white, 1px `rgba(10,10,10,.055)` border, radius 14, padding 6 6 18; stage 220 high, radius 8, `#fafafa`, inset 1px ring same alpha, overflow hidden, content centred; title/desc padded 12 (text sits 18 from the tile edge).
16. Mini-UI is built from one kit: tray (3px `rgba(0,0,0,.04)` well, radius 12, 24px head 10.5/500 with right-aligned meta at 40% ink) holding a white card (1px `#e5e5e5`, radius 9). Rows 24-26 high, type 8-10.5px, mono for code and hex.
17. Scale the mini-UI as a whole (`scale: .88` on a fixed 290x180 box) instead of shrinking each value; keep a 12px dotted field `radial-gradient(#e5e5e5 1px, transparent 1.2px)` behind configurator-type stages only.
18. Colour is rationed: one ink, one green (`#1f8a4c`) for success/on, one brand pair (`#dd0674` pink, `#5e3ee0` violet) as 10-12% tints with full-strength text. Everything else is grey.
19. Show a state change inside the stage (typing, a toggle, a light/dark split with a 1px `rgba(143,143,143,.4)` edge): one per tile, CSS keyframes on 6-10 s loops with `cubic-bezier(.22,1,.36,1)`, all disabled under reduced motion. A cursor (ink `#141b34`, 1.7px white keyline, `drop-shadow(0 2px 4px rgba(0,0,0,.18))`) can drive it.
20. Size dense decorative grids in container units (`u = width / design width`) so the radius, ring (1u) and shadow stay proportional; fade tile opacity with distance from a highlighted centre tile.
21. Shadows inside stages are below-only: negative spread (`0 12u 14u -10u`) so nothing glows on the sides or top.

**Gate before delivery**
22. Rebuild the chosen reference at its pixel size first (`#/alignbento` or `#/affectbento`), then swap in Cadence content tile by tile and keep the overlay registered on the frame: tile edges, stage edges, title and description baselines within 1px.
23. Measure every radius and shadow as rendered (`getComputedStyle`) and diff against the tables above before calling it done.
