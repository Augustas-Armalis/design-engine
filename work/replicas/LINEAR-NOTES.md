# Linear homepage fold (dark): replica study notes

Internal study, never published. Route `#/linear` in `work/replicas/app` (`src/LinearHero.tsx`).
Reference: `knowledge/benchmarks/dark/linear-fold-1440x900@2x.png` (1440x900 CSS @2x), computed styles in `linear.measure.json`, type tuples in `type-buttons/linear.json`.
Our render: `work/replicas/linear-hero-replica@2x.png`. Overlay: `work/replicas/cmp-linear-overlay.png`, side-by-side `cmp-linear-side.png`.

Method: every position comes from reference pixels (bright-run extents at 2x, /2) and the same probe run on our render, diffed until each text run's left/right/cap-top matched within 0.5-1px. Surface colours came from region means (mean RGB + sd) over 10k+ px per region, not eyeballed.

Substitutions: Inter Variable (fontsource, opsz axis on) for Linear's "Inter Variable"; h1 extents register to the half-pixel, so optical sizing does not change the 64px cut visibly. Geist Mono at 11.4px for the code chip (Linear's mono is different; the advance width is matched, not the letterforms). Logo marks are neutral placeholders (disc with two cuts), the wordmark is plain Inter 20.6/600 sized to Linear's wordmark box (111-166.5 x 28-43.5). Avatars are drawn silhouettes, icons are lucide stand-ins. Copy is kept verbatim only so type tuples can be registered; it is Linear's copy and must not leave this study.

## Registration result (mean abs RGB diff per region, 0-255)
| Region | Diff | Notes |
|---|---|---|
| hero (h1, sub, New/Loops) | 0.06 | identical to the half-pixel: h1 extents 79.5-861 x 280.5-404.5 in both |
| nav | 1.75 | links, Log in, Sign up within 0.5px; residual is the placeholder logo |
| panel header | 3.2 | text within 0.5px; residual is icon shapes + grain |
| sidebar | 3.7 | 11 rows register; residual is icon glyphs (Linear's custom set) |
| agent panel | 3.6 | edges, bubble, ctx row within 0.5-1px |
| body (issue) | 5.0 | text within 1px; avatars are silhouettes not photos |
| frame edges / outer light | 3.7 | frame 60/527/1380, panel 300/535/1372, agent 959/706/1358 exact; grain is uncorrelated noise |

## Measured tokens

### Surface ladder (observed fold pixels; hue 246-248, chroma .003 throughout)
| Role | Hex | OKLCH L | Note |
|---|---|---|---|
| canvas | `#08090a` | .139 | meta theme-color = canvas |
| nav bar | `#090a0b` observed | .144 | `rgba(10,10,11,.6)` + `blur(20px)`; measured nav bg `rgba(11,11,11,.8)` over canvas reads 9-10 |
| frame (sidebar) | `#131516` observed (19.4/20.6/21.8) | ~.185 | +.046 L over canvas; computed `#101112` + grain |
| main panel | `#17181a` observed (23/24.2/25.4) | ~.205 | one step up, inset 8px into the frame |
| agent panel | `#1b1c1d` observed (26.6/27.8/29) | ~.22 | the raised, floating surface |
| bubble / code chip | `#262728` (37.5/38.8/39.9) | ~.26 | white .05 over the agent panel |
| selected row (Favorites) | white .03 over frame (28-30) | | |
| tool pill fill | white .02 over panel (28-30) | | |
Steps are +.03 to +.05 L each. Four surfaces, one hue. No surface is ever lighter than L .26 in the fold except the CTA.

### Text ladder
| Tier | Hex | Use |
|---|---|---|
| 1 | `#f7f8f8` (L .978, 18.7:1) | h1, wordmark, chat bubble text |
| 2 | `#e2e4e7` | in-product primary (issue title, IDs, panel names) |
| 2b | `#d0d6e0` (L .874) | "New", sidebar items |
| 3 | `#bdc0c5` | issue description |
| 4 | `#8a8f98` (L .649, 6.1:1) | nav links, sub, feed text, timestamps |
| 5 | `#62666d` (L .509, 3.4:1) | 12px section labels only (Workspace, Favorites) |
Measured text-colour counts on the page: `#8a8f98` 2953 chars, `#d0d6e0` 2809, `#62666d` 888, `#f7f8f8` 720. The page is mostly grey; white is rationed to the h1.

### Borders and edges
- Resting hairline: `rgba(255,255,255,.08)` on 268 elements (flat on canvas `#1c1d1e`). Nav bottom, panel ring, panel header divider, tool pills.
- Strong hairline `.12` on 44 elements (chips, comment card). Agent panel ring observed ~.14-.15 (first device px `#454648` over `#1b1c1d`).
- Frame ring observed `#242526`-`#262728` on canvas = white ~.11 (border .08 plus the masked spotlight copy near top-left).
- Black outer rings: `0 0 0 1px rgba(0,0,0,.2)` on 8 elements; the comment card shows a 1px black line (`#111112`) directly above its white .12 top edge.
- Inset shadow `rgba(0,0,0,.2) 0 0 12px inset` on 7 elements (panel recess).

### Radii
9999px x72 (CTA, tool pills, ghost buttons), 8px x29, 12px x26 (frame, agent panel, comment card), 9px x18 (main panel; inset 8px inside a 12px frame, so strict concentric would be 4: Linear keeps the inner radius larger and does not follow concentric nesting), 4px x25 (chips), 6px x10 (selected row). Linear uses plain circular corners, no squircle (the study opts out of the engine's default).

### Shadows
- Product frame and agent panel: `rgba(0,0,0,.25) 0 2px 32px 0` + `rgba(0,0,0,.2) 0 0 0 1px`.
- CTA: five near-invisible layers `0 8px 2px 0 / .01 0 5px 2px / .04 0 3px 2px / .07 0 1px 1px / .08 0 0 1px` (a contact shadow, not a glow).
- Inside the frame: `rgba(255,255,255,.08) 0 0 0 .5px inset` (x5), `rgba(255,255,255,.05) 0 0 0 1px inset` (x4).

### Type tuples
| Element | size/weight/line-height/tracking | colour |
|---|---|---|
| h1 | 64 / 510 / 64 / -1.408px (-.022em), two lines, left aligned | `#f7f8f8` |
| sub | 15 / 400 / 24 / -.165px (-.011em) | `#8a8f98` |
| nav link, Log in | 13 / 400 | `#8a8f98` |
| Sign up | 13 / 510, h32 pill, 12px padding, 72.5px wide | `#08090a` on `#e5e5e6` |
| New / Loops -> | 15 / 510 `#d0d6e0` + 15 / 400 `#8a8f98`, 12px gap | |
| sidebar item | 13 / 510, row pitch 30, icon 14 at x84, text x106 | `#d0d6e0` |
| sidebar label | 12 / 510 + 8px ▼ | `#62666d` |
| issue header | 12 / 510, ID tracked +.1px | `#e2e4e7` |
| issue title | 20 / 590 / -.2px | `#e2e4e7` |
| description | 14 / 400 / ~21px / -.15px | `#bdc0c5` |
| "Activity" | 16 / 590 | `#e2e4e7` |
| feed row | 12 / 400, names at 510 one tone brighter | `#8a8f98` / `#959ba4` |
| code chip | mono 11.4, chip 105x23.5, r5, white .05 fill + .10 ring, 8px side padding | `#e2e4e7` |
Weights are the variable-font values 510 and 590, not 500/600: they sit between Medium and Semibold and are part of the voice.

### Spacing and grid (CSS px)
- Content column 80-1360 (1280). Frame 60-1380 (column + 20 each side). Light wash 12-1428 (1416).
- Nav 73 tall incl. 1px hairline at y72; CTA 20-52 (centred at 36).
- h1 box 272-400 (199px below the nav); sub box 432-456 (32px under the h1 box); "New Loops" right-aligned to 1358 on the sub's baseline row.
- Frame top 527 (71px under the sub): the product starts at 58.6% of the fold height and fills the rest; only 373px of it is visible.
- Frame -> panel inset 8px (top and right); sidebar 240 wide (60-300).
- Panel header 44 (divider at y579); tool pills 28px, 6px gap, at y588; issue content column starts x374 (74px into the panel).
- Agent panel 400 wide at x959, top 706; bubble 342x60 r8 at 1006/768.5, text inset 10px.

### Button anatomy
- Primary = inverse pill: `#e5e5e6` fill + same-colour 1px border, label canvas `#08090a`, 13/510, h32, padding 12, micro contact shadow. Hover to `#fff` in .16s `cubic-bezier(.25,.46,.45,.94)` (implemented).
- Secondary = ghost text: no fill, `#8a8f98`; hover fill white .08 and text `#f7f8f8` (implemented).
- In-product tools: 28px pills, white .02 fill, inset 1px white .08; split pill 60 wide with a 1px divider.
- The hero has no button at all: the only hero CTA is a text link ("New Loops ->"). The conversion button lives in the nav.

### Light / glow recipe
- There is no light on the canvas. 0.0% chromatic pixels in the fold (only the 14px yellow status icon and star carry colour).
- One wash: a 1416x768 layer under the frame, `radial-gradient(52.53% 57.5% at 50% 100%, rgba(8,9,10,0), rgba(8,9,10,.5)), linear-gradient(#08090a 10%, #d0d6e0 100%)`. Observed only in the 12px and 48px gutters beside the frame, rising from canvas at y~605 to `#1f2121` at y900 (about +.09 L per 100px). Replicated at opacity .63.
- Border spotlight: a second bordered layer (1px white .14 here) masked `radial-gradient(200px 200px at 8% 0%, #000, rgba(0,0,0,.6) 30%, rgba(0,0,0,.2) 50%, transparent 70%)`, which brightens only the top-left of the frame edge.
- Grain: every frame surface has sd 1.2-1.7 levels of noise; the canvas has sd 0.0. Replicated with an feTurbulence tile, `mix-blend-mode: overlay` at .22, placed over the frame only (it brightens by ~11%, so the surfaces are authored about 2 levels darker).

## Rules: what makes this dark mode premium

1. **One hue, many steps.** Canvas, frame, panel, agent panel and chips all sit at hue 246-248 and chroma .003, separated only by lightness (+.046, +.02, +.017, +.04 L). Evidence: observed means 8/9/10 -> 19.4/20.6/21.8 -> 23/24.2/25.4 -> 26.6/27.8/29 -> 37.5/38.8/39.9; B-R is +2.4 to +2.8 on every surface. A neutral grey mixed into this would read as a different material.
2. **White is rationed.** `#f7f8f8` is used for 720 characters on the whole page, all in headings, against 2953 of `#8a8f98`. In the fold it is the h1, the wordmark and one chat bubble. Everything else is a grey tier, so the headline is the only thing at 18.7:1.
3. **The hero has no light and no colour; the product is the light.** Chromatic area 0.0%. The only gradient is a pale wash under the frame that is visible in 12-60px gutters; the frame (L .185-.26) is the brightest large object in the fold, so the eye lands on the product without any blob or glow.
4. **Edge the window three ways, quietly.** 1px ring (white ~.11 observed), a light-side spotlight (masked border copy at 8% 0%), and a soft dark drop `0 2px 32px .25` plus a black `0 0 0 1px .2`. No single layer is visible on its own; together the frame reads machined.
5. **Hairlines are .08, strong lines .12, nothing louder.** 268 elements use white .08, 44 use .12. Even the floating agent panel tops out around .15. Dividers are drawn as alpha white so they adapt to whatever surface they sit on.
6. **Nest surfaces upward, not outward.** The main panel is inset 8px inside the frame, one step lighter, with its own .08 ring and a 12px inset black shadow; the agent panel floats one step lighter again with the frame's drop shadow. Depth comes from lightness steps + rings, never from a coloured border.
7. **Weights between the named weights.** 510 for UI and the h1, 590 for in-product headings. The h1 at 64/510/-0.022em is medium, not bold: the size carries the hierarchy, the weight stays calm. (Engine note: matches "premium heroes set h1 at 400-550".)
8. **Two gaps only around the copy.** 32px from h1 box to sub, 71px from sub to frame, 199px of empty canvas above the h1. The fold is about 58% empty canvas above the product, and the product is cropped by the fold edge rather than shown whole.
9. **The CTA is inverse and nearly flat.** `#e5e5e6` pill, 32px, a contact shadow whose strongest layer is .08 alpha, hover to pure `#fff` in 160ms. No glow, no gradient, no colour. The hero itself only carries a text link.
10. **Grain lives on surfaces, never on the canvas.** sd 1.2-1.7 on every frame surface, sd 0.0 on canvas and nav. It makes the product read as a lit physical panel while the canvas stays an exact token (`#08090a`, also the theme-color).
11. **Small UI text is real product density.** 12-14px text, 30px sidebar rows, 28px tool pills, 6px gaps, IDs tracked a touch, timestamps a tier dimmer. The product shows one specific workflow (an agent fixing a real issue), not decorative cards.
12. **Status colour is tiny and single.** The only saturated pixels are the 14px yellow in-progress icon and star (`#f6d500`-ish) and the 14px indigo review icon (`#6d78d5`); each is under 200px² and carries meaning.

## What did not register / open items
- Icon glyphs: Linear's custom icon set (Pulse, My issues, Initiatives, the list-cursor tool, the copy-ID tool) is approximated with lucide; positions and sizes match, shapes do not.
- Avatars are silhouettes (the reference shows photos).
- Grain is a statistical match (mean and sd), not the same noise.
- The sidebar `nav::after` blur(80px) glow noted in dark-mode-premium.md is not visible in the measured means (sidebar top 20.6 vs mid 19.4, a 1-level lift) and is approximated by the border spotlight only.
