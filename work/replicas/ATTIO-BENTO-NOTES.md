# Attio feature bento ("Your team, amplified"): replica notes (internal study)

This is an internal study and is never published.

- **Reference:** `knowledge/benchmarks/attio/bento-ref@2x.png`, 2086x2826 px (1043x1413 CSS at 2x).
  - Captured live from `https://attio.com/` on 2026-10-21 with Playwright at 1440 wide, 2x, `reducedMotion: 'reduce'`. Reduced motion gives the static final state: the radar does not bob, the rings do not pulse, and the composer shows its finished result list.
  - The site header and cookie layer were hidden before the element screenshot.
  - It is one `<article>` from the "Agents" feature column (x 372.5 to 1415 on the page): a heading band, a full-width product stage, and two half cells.
- **Replica:** `work/replicas/app/src/AttioBento.tsx`, route `#/abento`.
- **Render:** `work/replicas/attio-bento-replica@2x.png`.
- **Overlays:**
  - `work/replicas/cmp-abento-diff@2x.png`: 2x difference blend. Black means identical.
  - `work/replicas/cmp-abento-onion@2x.png`: 2x, 50% onion.
  - `work/replicas/cmp-abento-overlay.png` and `cmp-abento-side.png`: from `tools/compare.mjs`.
- **Sources of the measurements:**
  - Live DOM: `getBoundingClientRect` relative to the article, plus computed styles.
  - Probes of the 2x reference pixels: `tools/probe.mjs`, plus a two-image bbox script in scratch.

## Why this section
It is the richest bento on the home page:
- one dominant product cell (a real table with a drafted email over it);
- two quieter cells, each with one product proof (an AI composer with results, and a radar of enrichment signals).

Every surface is light. Every edge is a hairline or a three-layer whisper shadow.

## What registered (2x device px, ours minus ref)
| Element | Drift |
|---|---|
| h3, both h4s, both descriptions (verbatim copy, ink bbox) | 0 / 0 / 0 / 0 |
| Section rules (band/stage 550, stage/cells 1860, cell divider 1042, bottom 2822) | 0 |
| Table card edges, email card edges, stage fill | 0 |
| Table: header rules, column rules, 9 data-row rules (960, 1034 ... 1538) | 0 |
| Column header text, icons, plus, sparkle (same strings) | 0 |
| ICP pills (box + text), checkboxes, logo tiles, owner faces | 0 (box), <=1 (text) |
| Collaborator avatars, +1, Share, dropdowns (box, icon, text, chevron) | 0 |
| New person / Send email / Discard / Save draft / Ask button | 0 to 1 |
| Email card labels, title, desc, To row, CC/BCC, body first line | 0 |
| Composer (box, placeholder, send button), list card, list rows | 0 (row names <=1) |
| Radar outer ring, inner ring, centre disc | 0 |
| Chips | rects 0, labels +-1 to 2 (our label widths differ) |

## What did not register (and why)
- **Content.** All product data is our own sample data, so text that differs shows in the diff by design:
  - companies, owners, research notes, email, list and chip labels;
  - "Accounts to work", "All Accounts", "Ask Orbit".
  - The h3, h4 and p copy is kept verbatim only so the overlay can register.
- **Logos, avatars and the radial mark** are neutral placeholders (tinted initial tiles, soft initial circles, and a hand-drawn arch mark in the 46x43 box). The real photos and logos are not copied.
- **Icons**: lucide (`Info`, `MessageCircle`, `CircleHelp`, `EllipsisVertical`, `Columns2`, `BadgeCheck`, `Sparkles`, `User`, `ScanSearch`, `Plus`) stands in at Attio's measured boxes. Attio's own icons are filled 13px glyphs, so the glyph interiors differ.
- **Radar centre shadow**: the ref is a CSS `drop-shadow(0 8px 20px rgba(28,40,64,.12))` on an SVG circle. An SVG `feDropShadow` with the same values renders 2-3 levels lighter, so I raised it to `stdDeviation 12, opacity .17`. The far tail is still about 1-2 levels lighter.

## Two measurement traps found (write these into any future Attio replica)
1. **The capture origin sits 1px left of the article.**
   - The stage fill starts at device x 2, not 0, so the article is placed at `left: 1`.
   - Vertically, the article sits at +0.2 (a section rule at 274.8 paints at device 550).
   - Always probe a known rule before trusting DOM offsets.
2. **Inter Variable metrics differ from Attio's static "inter".**
   - At 10, 13 and 14px our glyphs paint 1px higher and about 0.5px right in the same box. At 12, 16 and 18px they land exactly.
   - The 24px interDisplay h3 (Inter opsz 32) needs +1px.
   - The fix is a measured `translate: -0.5px 1px` on text only, never on boxes. A box that carries text styling (the ICP pill) needs its text in a child span.

## Measured anatomy

### Grid
| Band | y (CSS) | Height | Fill | Notes |
|---|---|---|---|---|
| Heading band | 0-274.8 | 274.8 | `#fafafb` | h3 at x = 100%/18 = 57.9; padding 112 top / 80 bottom (`xl:pt-28 xl:pb-20`) |
| Rule | 274.8 | 1 | `#e4e7ec` | |
| Product stage | 275.8-929.8 | 654 | `#f3f4f6` | overflow hidden |
| Rule | 929.8 | 1 | `#e4e7ec` | |
| Two cells | 930.8-1410.8 | 480 | `#fafafb` | each 521.25 wide; 1px `#e4e7ec` right rule on the left cell |
| Rule | 1410.8 | 1 | `#e4e7ec` | |

- Article width 1042.5, with no outer radius and no card chrome.
- The bento is a ruled sheet: cells are separated by 1px rules, not gaps. There are no gutters, no rounded cells and no shadows on cells.
- The stage is one step darker (`#f3f4f6`) than the cells (`#fafafb`). That step alone marks it as the hero cell.

### Product stage composition (the big cell)
- **Composition:** a 900x508 group centred in the stage with `translate(-50%,-50%)`.
  - Group origin: x 71.25, y 348.8.
  - Insets: 73 from the stage top, 71 left, 79 right, 79 bottom.
- **Table card:** 756x457.
  - White, radius 12, no border, no shadow. It sits on `#f3f4f6` purely by value contrast.
  - It is masked `linear-gradient(to right, #000 38%, transparent 100%)`, so the right 62% dissolves into the stage. That is how the stage "crops" the product.
- **Email card:** 340x465 at (623.25, 385.8).
  - It overlaps the table by 204px, starting 37px lower than the table and ending 45px below it.
  - Radius 12, shadow `0 0 1px 1px rgba(0,22,62,.01), 0 4px 12px -1px rgba(0,22,62,.04), 0 1px 3px -1px rgba(0,22,62,.18)`.
  - It is the only lifted object, so the eye lands on the agent's output, not on the table.
- **Table internals** (all CSS px, true product density, not marketing-inflated):
  - **Rows 1 and 2:** title bar 48, then view bar 48, each with a 1px `#eeeff1` bottom rule.
  - **Columns:** 176 / 140 / 160 / 280, each with a 1px `#eeeff1` right rule.
  - **Header and data rows:**
    - The header row is 36 tall.
    - Data rows run at a 36 pitch starting at 37. The row stack begins 1px below the header, which is why the header rule and the first data row do not touch.
    - The last row has no rule.
  - **Row content offsets:**
    - checkbox 16 (radius 5, `#e6e7ea`) at x 16, y +10.5;
    - logo tile 16 (radius 4.8, 1px `rgba(0,0,0,.05)` ring) at x 40;
    - name at x 61, underlined in ink;
    - ICP pill 22 tall at col +9, y +7.5;
    - owner face 16 at col +12, name at col +32;
    - research text at col +9.
  - **ICP pill:** radius 7, `#e0fced` fill, `#cbf7e1` 1px border, `#007d53` 14/500 text, padding 0 4.
  - **Collaborators:** 24px white rings with a 1px coloured border, 20px faces at +2, 18px pitch (6px overlap), then a 22px `#f8f9fa` "+1".
  - **Controls:** 28 tall, radius 8.
    - Outline dropdowns: 1px `#eeeff1`.
    - White buttons: `0 1px 3px rgba(0,0,0,.04), 0 0 2px rgba(28,40,64,.18)`, a blurred hairline, not a border.
    - Blue buttons: `#266df0`, 1px `rgba(0,0,0,.1)` border, drop `0 2px 4px -2px rgba(15,107,233,.12), 0 3px 6px -2px rgba(15,107,233,.08)`.
- **Email card internals:**
  - Padding 12.
  - Text stack:
    - "Send email" label 12/500/16 `rgba(0,0,0,.55)` at y 12;
    - title 16/600/20 `#242629` at y 36;
    - desc 12/500/16 muted, two lines, at y 62.
  - Inner field box: inset 10 (320x303), radius 14, 1px `#eeeff1`.
    - To row 41, subject row 40, then body 14/500/20 `white-space: pre` at y 92.
  - Footer 52: Send email (blue), Discard (ghost, muted), and Save draft (white) pinned right.

### Half cells
- **Header block:**
  - x = 100%/36 = 28.9 (half the band's inset);
  - h4 at y +44;
  - desc at +26 (4px gap under a 22px h4 line).
- **Visual area:** starts 146 below the cell top (114 header + 32 gap), 334 tall, overflow hidden. Visuals are centred horizontally in the cell.
- **Left visual (AI composer):**
  - Composer: 392x46, radius 12, white, shadow `0 0 1px 1px rgba(0,22,62,.02), 0 2px 6px -1px rgba(0,22,62,.06), 0 1px 2px -1px rgba(0,22,62,.24)`.
    - Placeholder 13/500/18 `rgba(0,0,0,.4)` at x 15.
    - 28px blue send button at 40% opacity (idle).
  - Results card: 12px below the composer, 392x217, radius 12, same card shadow as the email card.
    - Header 10/500/13 muted.
    - Six 30px rows (radius 10) with a 15px tile, name 13/500/18 ink, and meta 11/500/15 `rgba(0,0,0,.4)` with a 4px gap.
- **Right visual (radar):** a 320x320 SVG, centred.
  - Rings: r148 and r100, stroked `rgba(28,40,64,.9)` at opacity .067 / .11.
  - Disc: r56 white with a .05 stroke and a navy drop.
  - Four chips: 26 tall, rx 9, stroke 1.27, 13/500 text.
  - Chip tint families (fill / stroke / ink):
    - green `#e0fced` / `#cbf7e1` / `#007d53`;
    - yellow `#fdf7c4` / `#fcef7e` / `#665a00`;
    - blue `#e5eeff` / `#d6e5ff` / `#215bc4`;
    - violet `#f5f0ff` / `#e8ddfe` / `#6238b5`.

### Type tuples (size / weight / line-height / tracking / colour)
| Role | Tuple |
|---|---|
| h3 (band) | interDisplay 24 / 500 / 27.6 (1.15) / -0.24 (-0.01em), ink `#1c1d1f`, second sentence `#6f7988`, balanced, max 560, 3 lines (217+172 / 407 / 412 px) |
| h4 (cell) | inter 18 / 500 / 22 / -0.18, `#1c1d1f` |
| Cell desc | inter 16 / 500 / 22 / -0.16, `#8f99a8`, max 352, 2 lines |
| Product UI | 14 / 500 / 20 / -0.14, `#242629`; muted `rgba(0,0,0,.55)`; faint `rgba(0,0,0,.4)`; button grey `#505155` |
| Card label / desc | 12 / 500 / 16 / -0.16 |
| Card title | 16 / 600 / 20 / -0.16 (the only 600 in the section) |
| Composer / list | 13 / 500 / 18; meta 11 / 500 / 15; list header 10 / 500 / 13 |

`ss03` is on everywhere. There is no 400 weight anywhere: hierarchy comes from size and colour only.

### Radii (rendered)
| Element | Radius |
|---|---|
| Cells | 0 |
| Cards (table, email, composer, results) | 12 |
| Email inner field box | 14 |
| List rows | 10 |
| Chips | 9 |
| Buttons, dropdowns, send | 8 |
| ICP pill | 7 |
| CC/BCC hover box | 6 |
| Checkbox, list tile | 5 |
| Logo tile | 4.8 |
| Doc tile | 4.2 |

The email inner field box (14) is rounder than its card (12) and is not concentric. Attio favours a soft inner well over strict nesting.

## Rules (with measured evidence)
1. **AB-01: A bento can be a ruled sheet, not a set of floating cards.**
   - Cells share 1px `#e4e7ec` rules with no gap, no radius and no shadow. The article is 1042.5 wide with rules at 274.8, 929.8 and 1410.8 and a divider at 521.25.
   - Premium comes from the objects inside, not from the cell chrome.
2. **AB-02: Mark the hero cell with one value step, not a border or a colour.**
   - The stage is `#f3f4f6`; the band and the half cells are `#fafafb`. That is a 7-unit step, and nothing else distinguishes it.
3. **AB-03: Product in the hero cell is real density at real size.**
   - Rows 36, controls 28, 14/500 UI type, columns 176/140/160/280, 16px checkboxes and tiles.
   - Nothing is scaled or inflated for marketing.
4. **AB-04: Crop the product with a mask, not the cell edge.**
   - The table card is 756 wide but masked `#000 38% -> transparent 100%` to the right, so it dissolves into the stage. Only the email card keeps a hard silhouette.
5. **AB-05: Exactly one object is lifted.**
   - The table has no shadow and no border; white on `#f3f4f6` is enough.
   - The email card alone carries the three-layer navy shadow (max alpha .18 at 1-3px; the soft layer is .04 at 12px). It overlaps the table by 204px and drops 37px lower: "the agent's output on top of the data".
6. **AB-06: Shadows are navy whispers in three layers.**
   - Cards use `0 0 1px 1px rgba(0,22,62,.01) + 0 4px 12px -1px rgba(0,22,62,.04) + 0 1px 3px -1px rgba(0,22,62,.18)`.
   - The composer, the interactive field, gets a firmer variant (.02/.06/.24).
   - Blue buttons get a blue-tinted drop (`rgba(15,107,233,.12/.08)`).
   - No shadow is black or grey.
7. **AB-07: White controls use a blurred hairline instead of a border.**
   - Save draft and Ask use `0 0 2px rgba(28,40,64,.18), 0 1px 3px rgba(0,0,0,.04)`.
   - Outline dropdowns use a plain 1px `#eeeff1`.
   - Primary buttons get a 1px `rgba(0,0,0,.1)` edge on the blue.
8. **AB-08: Two rule colours, two jobs.**
   - Marketing structure uses `#e4e7ec` (lab 91.5, cool).
   - Product structure uses `#eeeff1` (lighter, nearly neutral).
   - The product reads as a different material from the page it sits in.
9. **AB-09: The cell header is a two-line micro-tuple at a fixed inset.**
   - h4 18/500/22 ink, then a 4px gap, then desc 16/500/22 `#8f99a8` capped at 352px.
   - It sits at 100%/36 from the cell edge and 44 from its top; the visual starts 32 below the desc.
   - Both cells use identical offsets, so the two titles align on one baseline (974.8).
10. **AB-10: The band heading carries its subhead inside the h3.**
    - One 24/500 interDisplay sentence: ink for the claim, `#6f7988` for the explanation, balanced to 3 lines in a 560 box.
    - There is no eyebrow, no separate paragraph and no CTA.
11. **AB-11: Half-cell visuals are centred, contained proofs.**
    - The composer group is 392 wide and centred, with 64 on each side of 520.
    - The radar is 320 and centred.
    - Each visual answers its h4 literally: "Free your reps" is a composer that already returned 6 accounts; "Agents dig" is enrichment signals orbiting a company.
12. **AB-12: Signal colour lives only in small tinted chips from one recipe.**
    - Every coloured element is a light fill + a slightly darker 1-1.27px stroke + a dark ink from the same hue: ICP pill `#e0fced`/`#cbf7e1`/`#007d53`, and the four radar chips.
    - The only saturated colour is the `#266df0` primary (two buttons, the checked box, the doc tile).
13. **AB-13: Idle states are shown as idle.**
    - The composer's send button sits at opacity .4 next to the placeholder "Ask something...". The result list underneath proves the outcome without faking an in-progress state.
14. **AB-14: Motion is decorative-only and switches off cleanly.**
    - The radar rings pulse (3.6s) and the chips bob 5px (3.8-4.85s, staggered delays), all inside `@media (prefers-reduced-motion: reduce) { animation: none }`.
    - The composer types its query only with motion on. With reduced motion the final state (result list) is what renders.
15. **AB-15: Radii are by role, not by strict nesting.**
    - Cards 12, inner well 14, rows 10, chips 9, controls 8, pill 7, checkbox 5, tiles 4.8.
    - The inner field box is rounder than its card, which reads as a soft "well". Ours keeps plain circular arcs: the squircle is reset to `corner-shape: round` inside the page.
