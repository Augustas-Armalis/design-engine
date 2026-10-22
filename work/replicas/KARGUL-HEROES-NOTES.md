# Kargul hero replicas A-D (2026-10-22): study only, never published

Four of Marcel Kargul's hero folds were rebuilt at their original pixel size. Each comes from a different layout family in `knowledge/web/kargul-heroes.md` and none is Chatsheet, which `#/khero` already covers. Routes are `#/kheroa`..`#/kherod` in `work/replicas/app` (dev server http://localhost:4395).

Every number in the code was read from the original with `knowledge/benchmarks/kargul-heroes/_scripts/` (`kh.py`, `fontsolve.mjs`, `rle.py`, `dots.py`, `graph.py`, `cells2.py`, `linetrace.py`, `trace.py`). The code doubles as the measurement log. Registration was checked box by box with `rico-tools/cmp.mjs` (region files in `work/replicas/kheroes/`) and with the official overlays from `tools/compare.mjs`.

His copy, logos and client marks stay here. Third-party logos are flat stand-ins or traces of his file, and none of it goes into a deliverable.

| # | Family | Reference (CSS size, scale) | Mean abs RGB diff | Overlay |
|---|---|---|---|---|
| A | F10 centred over a generative field (light) | `originals/case-gopher-01.png` (1440x1035, 2x) | 3.96 | `cmp-kheroa-*` |
| B | F3 split copy / illustration (dark) | `originals/swipe-volcano-p21.png` (1440x1155, 1.1042) | 3.95 | `cmp-kherob-*` |
| C | F9 centred over a system diagram (dark) | `originals/case-supermetal-00.png` (1440x1035, 2x) | 1.72 | `cmp-kheroc-*` |
| D | F1 centred over the product (light) | `originals/case-defendlab-01.png` (1440x1035, 2x) | 4.97 | `cmp-kherod-*` |

## A. Gopher: "Alpha for everyone"

**Registered (box deltas in CSS px):**
- h1 +1/0/0/-0.5;
- tagline 0/0/0/-1;
- primary pill 0/+1/-1/-1.5;
- both CTA labels within 1;
- nav mark within 1;
- the three lines of the second block within 2;
- the paragraph lines within 1-2.5.

**Not registered:**
- the brand face, Cy Grotesk, which is commercial. General Sans 400 was the closest free fit (word-width error 0.7%), so glyph shapes ghost inside words;
- the partner logos, which are traces;
- the nav links, which are 4 px wide in total.

**Measured:**
- Page `#fbf7eb`, one ink `#08281a`, one green `#018440`, and hairlines `#e3e3d7` that also colour the inactive dots.
- **Dot field.** `dots.py` found 1060 dots on a 12.36 px lattice (719 grey, 341 green). Radius is quantised to 1, 1.5, 2, 2.5 and 3 px: the dots fade by getting smaller, not lighter. They form two rising "market" bar clusters that leave the copy column (x 320..1120) empty.
- **h1.** 86 px, weight 400, one line, sentence case. The tagline is 34 px in INK, not grey: a second headline.
- **CTAs.** Green pill 188x50.5 and a cream pill with a 1px `#e3e3d7` ring, 14 apart, 27.5 under the tagline.
- **Grid.** The nav is cells (logo cell 220..367.5, theme cell 1165..1219). The logo strip has 200 px cells at y 474.5..566.5, and rails at x 220 / 1219 continue below.
- **Second block.** 31/36 regular, with a node-link constellation (34 nodes, 39 edges, in green, ink and grey) drawn as a market line.

## B. Volcano SDK: "Build MCP-Powered AI Agents in Minutes"

**Registered:**
- both h1 lines (0-0.9);
- the subtitle lines (within 0.9);
- the orange CTA and its label;
- the code chip;
- the card title and lines;
- the section titles (within about 3.6).

**Not registered:**
- the pixel wordmark and line 1's pixel words, which are traced from his file;
- the card button icon;
- isolated pixel colours at cell edges, where the export anti-aliases.

**Measured:**
- **Pixel art.** The volcano is a real grid: 16.075 CSS px cells (17.75 device px; fitted to 25 cell edges, residual at most 0.8 px), 1045 cells in about 200 flat colours. The lava ramp runs `#fcda52` → `#faa43f` → `#f16f33` → `#e6482c` → `#c7342a` → `#651113`, the rock is `#281826`, and the sea runs `#094f7a` → `#0d739b`. Embers fly out as single cells.
- **Horizon.** The black hero ends in two rows of black, white and blue cells that dither into the white section (y about 900..970). The section edge is the illustration.
- **h1.** Line 1 mixes Inter ("Build") with a pixel face ("MCP-Powered"). Line 2 is Inter 650, 64.5/-0.05em (word-fit 0.26%). Left edge x 40.8 (the copy column is the page gutter, 40).
- **Subtitle.** Inter 18.2 `#b2b2b2`.
- **CTAs.** Orange square `#f95e39` 205x51 (radius 0) plus a `#121212` "npm install" code chip of the same height: the second CTA is a command, not a button.
- **Card.** A `#141414` "Using Cursor?" card 705x133 under the CTAs: below-CTA proof is a product action.

## C. Supermetal: "Sync Data at The Speed of Light"

**Registered (0 px on every text box):**
- both h1 lines;
- all three subtitle lines;
- the chamfered primary;
- the secondary;
- both CTA labels.

Nav right and the nav button are within 0.5. The S mark and logo are within 0.5 (traced). The meta line is within 0.5.

**Not registered:**
- the 16 database logos (flat stand-ins);
- the connector curves (bend radius approximated);
- the floor glow falloff.

**Measured:**
- **Canvas.** Page `#111111` with content rails at x 139.5 / 1300 (1px `#1b1b1b`). Outside the rails, steep stripes at a 9.25 px pitch: the rails are a texture, not a line.
- **Type.** Chakra Petch 500 throughout. h1 64/-0.03em, line pitch 60. Subtitle 17/500 `#a0a0a0`, 3 lines with a 22 px pitch.
- **Primary.** A 180x51 `#ea580c` with a 1px `#ee793d` edge and 45° chamfers (19 px) at top-right and bottom-left. The logo's hexagon angle becomes the button shape.
- **Secondary.** `#1d1d1d` with a 1px `#282828` edge.
- **Meta line.** "Built in Rust and Apache Arrow" with an orange glyph, 24 below the CTAs.
- **Diagram.**
  - 16 integration tiles (56x66 `#000`, 1px `#2f2c2a`, chamfer 16 at the outer top, 10 at the inner bottom) in two staggered columns per side.
  - Each tile is wired by a 1px `#2a2a2a` line through a 7 px node with a dashed orange lead-in, bending into a straight run that lands on the core face at a 22 px pitch.
  - The core is a 179x178 black cube with a 6x12 dot grid and the orange S, on a perspective floor grid with an orange glow under it.

## D. DefendLab: "Advanced Code Security That Thinks"

**Registered:**
- h1 line 1 +1/0/0/-0.5 and line 2 +2.5/-0.5/+1/-1.5;
- subtitle within 0.5-1;
- the Learn More label;
- nav links, Sign in and the nav button within 0.5-2;
- wordmark;
- dashboard title, subtitle, card title row, tabs and sidebar row within 0.5-2.

**Not registered:**
- the primary's shadow footprint (+5 px: his shadow is tighter than the live CSS);
- the seven integration logos (stand-ins);
- glyph-level drift inside the h1, because he sets Inter Display and this build uses Inter text optical sizing.

**Measured:**
- **Type.** h1 Inter 70/500/-3.65px (live: -4.2px at 70; the case export reads about 0.5 px looser), 2 lines, Title Case, ink top 159.
- **Subtitle.** 19.8/26 `#707070`, 14 below the h1.
- **CTAs.** 54 below the subtitle: ink gradient `#333`→`#1d1d1d` 157x51 r15 + white 140x53 r15 with a 1px `#efefef` ring.
- **Background.** `#fafafa` with circuit-board traces at 3-7% black (`linetrace.py` bands), with pad nodes. A green field rises from y about 360 and saturates at the sides, while the centre column stays light: 44x13 mesh, `#f7f9f7` centre vs `#d3efdc` sides at y 500, `#81da9f` at the fold edge.
- **Integration row.** Seven white discs (d 52, the centre one d 70 with a green halo) at y 625, between the CTAs and the product: the proof row is the integrations.
- **Product.**
  - A glass frame (1px white ring, 18% white fill, r26) at x 40..1384.5 from y 716 holds the app at an 11 px inset (r16).
  - Sidebar 246 wide, main panel with a `#ebeefa` edge, 56 px header, tab group r8 `#f6f6f6`, search r8.
  - Title 22.5/600, card r16 with three tinted tiles (white → 8% hue tint at 105°) and 35 px icon squircles.

## Gate

These are calibration studies, not deliverables, so `gate.mjs` was not run as a pass/fail. Expected canon disagreements:
- C: radius 0 chamfers;
- B: square CTAs;
- A: 86 px h1 at weight 400;
- A and D: no element above the h1.

The canon is updated from them in `knowledge/web/kargul-heroes.md` (KH rules), not here.
