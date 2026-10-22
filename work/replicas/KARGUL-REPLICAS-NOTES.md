# Kargul replicas R1-R6 (2026-10-22): study only, never published

Six more of Marcel Kargul's screens were rebuilt to registration from originals, not recompressions. Five are sanity.io case originals (2880x2070, exact 2x: every 1px rule is 2 identical device px). The sixth is his X `name=orig` upload, because no case page holds it. Routes are `#/kargulr1`..`#/kargulr6` in `work/replicas/app`. Each default export renders at the reference's CSS size. Every coordinate in the code is the reference's 2x pixel reading, halved by `d()`, so the source doubles as the measurement log. Study only: his copy, logos and data stay here and never go into a deliverable.

**Method (2026-10-22).**
- **Pixel probe without Chromium.** I used a PyMuPDF probe. Its commands: `items` (text-line bands split into ink boxes), `erow`/`ecol` (concise edges), `rad` (circular corner fit to the edge offsets), and `trace` (per-column centre of a line colour, simplified by RDP). This kept us to one Chromium for renders.
- **Fonts solved from width sets.** Each family was checked on 4-8 strings, by canvas ink widths and by DOM advances with fontsource faces loaded from the CDN.
- **Iteration loop.** Render at 2x, diff against the reference, read the red/blue ink offsets, then re-probe the same boxes on both images.
- **Official overlays.** `tools/compare.mjs`, at `work/replicas/cmp-kargulr<N>-side.png` and `-overlay.png`.

**Refreshed posts.** `knowledge/benchmarks/kargul-x/new-2026-10-22/` holds page1/page2 JSON and `media.txt`.
- New design posts:
  - `kxn-2112998823715103027-0.jpg`: Lemon mac app (2880x2070, the same frame as case `lemon-06`).
  - `kxn-2112998516767281562-0..3`: branding.
  - `kxn-2112914617944998068-0.jpg`: SideShift "perfect mobile app ... 430px width, 932px height", the same frame as `sideshift-07`.
- Dropped as third-party: the mindcloud.co site.

| # | Kind | Reference (CSS size) | Mean abs diff | Overlay |
|---|---|---|---|---|
| R1 | Full SaaS dashboard (light) | `kargul-studio-2026-10/uniops/uniops-02.png` (1440x1035) | 4.2 | `cmp-kargulr1-*` |
| R2 | Dense table / CRM + hover card | `kargul-studio-2026-10/listkit/listkit-00.png` (1440x1035) | 7.3 | `cmp-kargulr2-*` |
| R3 | Component post (event popover over the week grid; 716 likes, his top post) | `kargul-x/latest/kxl-014-1-2111515571179122856.jpg` (480x1024) | 3.8 | `cmp-kargulr3-*` |
| R4 | Dark product view (navy) | `kargul-studio-2026-10/copecart/copecart-00.png` (1440x1035) | 1.9 | `cmp-kargulr4-*` |
| R5 | Mobile (3 iPhone screens) | `kargul-studio-2026-10/sideshift/sideshift-07.png` (1440x1035) | 6.3 | `cmp-kargulr5-*` |
| R6 | Marketing bento section | `kargul-studio-2026-10/rork/rork-00.png` (1440x1035) | 0.9 | `cmp-kargulr6-*` |

The diff is the mean absolute RGB difference per pixel at 2x. It is dominated by the parts that are not registered by design: his raster illustrations (R5), the brand marks, and his unidentified ListKit face (R2).

## R1 UniOps dashboard (uniops-02)

**Registered:**
- every card edge, divider, pill and button box within 1px;
- all 9 sidebar rows;
- KPI, time and setup strip text within 0-1px after two type passes;
- list rows: tiles, avatars, titles and meta within 1px;
- chips and the progress dashes.

**Not registered:**
- brand tiles: Higgsfield, Frame.io and Claude are flat colour stand-ins;
- remix icons stand in for his icon set (about 1px glyph differences);
- the Connect button glow is slightly heavier than his.

**Measured:**
- **Scale.** Exactly 2.0. Eight nav labels fit Inter 14/450 within 0.5px each, which closes the 2.0-vs-1.81 open question. Traffic lights are 11.5px.
- **Window and panels.**
  - Window r25. Title bar `#eeeeee`. URL pill `#efefef` r7.
  - Content `#f7f7f7`. App panel ring `#e9e9e9`, r21.
- **Cards** (1px `#e6e6e6` ring, bottom about 3% darker):
  - KPI strip: 1030x121, r22.5, four cells of 257px split by 1px rules. Icon at a 22px inset, text column at 52.
  - Time strip r22.5. Setup card r22 with a 1px inner rule.
  - List cards: 330.5 wide at 20px gaps, r18, rows at a 57.5px pitch.
- **Type:**
  - card titles 14/400 `#2f2f2f`;
  - subs 13 `#8b8b8b`;
  - KPI values 24/400;
  - compound values "42 hour 18 minutes" at 22.5, with the unit words in `#7b7b7b` at the same size;
  - list rows 15/450, larger than the card titles;
  - "View all" 13 `#4785ff`;
  - section caps 11/500 `#979797`;
  - header 15/500 plus a 14 grey sub after a 3px dot.
- **Filter pills:** 32.5h r10, white, `#e6e6e6` ring + `0 1px 2px .05`, grey label + ink value at one size.
- **Connect primary:**
  - fill `#4ea9ff` → `#4886fd`, inset top `#70c7ff`, ring `#4682fb`;
  - 33.5h r10.
- **Controls, chips and avatars:**
  - Progress dashes 35x5 at a 4px gap: `#1daf61` done, `#e6e6e6` to do.
  - Collapse button: 23.5 circle with a ring.
  - Urgent chip: 54x21.5 r6, `#ffebec` / `#681219`.
  - KPI avatars: 16.5 with a 1.5 white ring at a 16.5 pitch.
- **Centring.** Pill labels are centred on the cap (cap centre = box centre within 0.5px).

## R2 ListKit People (listkit-00)

**Registered:**
- window, sidebar, every table rule (20 rows at a 38px pitch), header band, row text starts, chips, channel icons;
- the hover card box and its fields (within 1-2px);
- sidebar rows after one pass.

**Not registered:**
- **Face.** Not identified. SF Pro (system-ui) fits best at about 1px per string; Manrope, Figtree, Red Hat, Instrument Sans, Jakarta, DM Sans, Inter (opsz 14/22/32), Geist and Helvetica were all worse or equal. Line ends register but inner words drift 2-6px (ghosting in the overlay).
- Company logos are flat colour tiles.

**Measured:**
- **Palette:**
  - one ink `#0d2a4c` for all text, secondary `#536880`;
  - sidebar `#f8fafb`; rules `#e2e4e9` (frame, controls) and `#ebecf0` (rows); accent `#288dff`.
  - Every status colour is a stock Tailwind v4 triple (50 fill / 100 ring / 500-600 text): emerald `#ecfdf5/#d0fae5/#00bc7d`, orange `#fff7ed/#ffedd4/#ff6900`, indigo `#eef2ff/#e0e7ff/#4f39f6`, yellow `#fefce8/#fef9c2/#d08700`, red `#fef2f2/#ffe2e2/#fb2c36`, lime `#7ccf00`. The badge is rose-500 `#ff2056`.
- **Table:**
  - frame r10, ring `#e2e4e9`;
  - header band `#f8fafb` 42h, 13/500 labels with 14px icons;
  - rows 38, names 13.5/400;
  - job titles one step smaller (12.4) in the same ink;
  - descriptions truncated at a fixed 308px;
  - company names underlined in `#d5dae1`, offset 3 (a link without colour);
  - social icons `#8a96a5`;
  - industry chips 22h r6, 11/500.
- **Hover card:**
  - 302x228, r11.5, the KMD-05 L3 shadow (nothing above the top edge);
  - 32px avatar;
  - 11/500 labels over 13.5/500 values in two columns 138px apart;
  - full-width footer button 28h with a `#ebecf0` ring.
- **Controls:** filter buttons 30h r7. Quick search 30h r8 with the cool shadow `0 1.5px 3px rgb(13 42 76/.055)`. Active nav 30h r6 `#e5f2ff`.

## R3 Calendar event popover (kxl-014-1)

**Registered:**
- every grid line;
- all 14 events (box, title and time within 0-1px after the type pass);
- the now line and dot;
- the toolbar;
- the popover box and every popover row (within 1px).

**Not registered:**
- glyph-level drift of about 1-2px inside the longest popover line;
- left-edge cut-off event titles (the text is unknown).

**Measured:**
- **Grid:**
  - hour = 64px, lines 1px `#e8e8e8`;
  - day columns 125.67 (a fractional 7-way split);
  - weekend column `#fafaf8`;
  - header row 55px with "Wed" 14 grey + "14" 14/500.
- **Events:**
  - top = hour line + 4, height = duration x 64 - 2 (so back-to-back events show a 2px gap), r8;
  - title 14/480 at a 7.6px inset, time 13/-0.03em at an 18px pitch;
  - 30-minute events centre their single line;
  - text inset 7-8.5px.
  - Events are not snapped to the day lines: they start 18-30px right of each line (composed for the post).
  - The selected event has an inset 1.5px `#66531b` ring, and its content shifts 2px inward.
- **Now line:** a 1px `#e0735a` hairline across the whole week, a 2px bar only through today, and a 9px dot on today's left line, all under the events.
- **Toolbar:** Today 65x32 r8; the arrow pair is one 67x32 control with a 1px divider; segmented 32h track `#ededed` with a white 62x26 thumb r6.5.
- **Popover:**
  - 304x256, r12, ring `#e6e6e6` + `0 4px 14px rgb(0 0 0/.05)`;
  - header: 10.5px swatch r2.5 + 14 grey label + three 15px icons;
  - title 14/500;
  - detail rows at a 30px pitch, 15px icons `#8a8a8a`, a 13px icon-text gap, text 14 at -0.012em;
  - description 14/18 grey.
- **Type:** one family (Inter), two sizes (14, 13), hierarchy carried by ink vs grey.

## R4 CopeCart Overview, navy dark (copecart-00)

**Registered:**
- rail, sidebar and panel rules;
- filters, chart card, report column, footer strip;
- all three metric cards, the bars and the step line (within 1px);
- the main and small revenue lines traced column by column (vertices within about 1.5px).

**Not registered:**
- the segmented thumb and rail accent shapes (about 2px);
- remix icons;
- the logo is redrawn.

**Measured:**
- **Surfaces:**
  - one surface `#0e121b` for the rail, sidebar, page and cards;
  - raised `#181b25` (active nav, segmented track, footer strip, report icon discs, tooltip under-edge);
  - every edge a 1px `#222530` rule;
  - no blur shadow anywhere.
- **Text:** `#ffffff` / `#99a0ae` / `#717784`; axis labels 13 `#717784`.
- **Main line:** 1.3px `#405bfb`, mitre joins, straight segments at about 35px sampling; a 4px dot on the selected point.
- **Tooltip:** `#0e121b`, ring `#222530`, plus a solid `0 3px 0 #181b25` second edge (a shadow built from a raised-step line).
- **Grid:** solid horizontals `#181b25` every 43.5px; dashed verticals `#222530` 4/4 at the day centres.
- **Bars:** pairs 15px wide with a 4px gap at a 50px pitch, rounded on top only, sitting on the card edge. Purple `#7d52f4`, amber `#f6b51e`.
- **Chips and controls:** 20h r5, `#123c2e` / `#1fc16b` and `#471b26` / `#fb3748`. Filters 34h r9. Share buttons 28h r8.
- **Values:** 24/500, titles 17.5/500.

## R5 SideShift learning app, three phones (sideshift-07)

**Registered:**
- phone frames (430x932, r32.5, 32 apart);
- status bars;
- lesson cards (ring, tint, box);
- connector line, play buttons, module cards, rings;
- path nodes and labels, tooltips, section titles (text within 0-2px).

**Not registered (by design):**
- his 3D raster illustrations: flat gradient placeholders of the same box;
- the cloud header and the concentric background circles: CSS approximations.

**Measured:**
- **Size claim confirmed.** 430x932 CSS exactly, as his post states.
- **Face.** SF Pro, not SF Pro Rounded as the caption says: the terminals are flat and the width sets fit SF Pro within 0.5px.
- **Type:** 24/600 screen title, 20/600 section, 17/500 card title, 15 tab label, 13-13.5 body, 13/500 node labels, 17/600 iOS time.
- **Lesson cards:**
  - 98h at a 120 pitch, r12;
  - completed: 1px `#0bbb46` ring on `#f4fcf4`; not started: white + `#e6e6e6`;
  - a 3px green connector line runs through the gaps.
- **Play button:**
  - 44px, gradient `#4acc76` → `#15bd4d`;
  - 1px darker rim, 8px soft drop: the only drop shadow on the screen.
- **Module card:** white r16, 1px `#e4e4e4`, "Module 1" 13 `#1db3fb` over a 17/500 title, 44px progress ring with a 3.5 stroke.

## R6 Rork features bento (rork-00)

**Registered:**
- all five cards and wells;
- phones, notch pills, code rows (glyph boxes within 1px), eye, tiles, columns;
- gauge rings, ticks, needle, hub; phone list, titles.

**Not registered:** the Android head, the Apple mark and the App Store glyph are approximations (about 2-4px).

**Measured:**
- **Section:** page `#202020`; card `#2b2b2b` r35 (circular, rms 0.6px); well `#202020` inset 10.5 sides / 13 top, r29.
- **Illustrations:**
  - one 4-step grey ladder (`#303030` `#383838` `#504e4e` `#656262`), white for the single focal object per cell, one colour in the whole section (Android green);
  - tile radius = 0.19 x tile size (23/126, 33/186, 45.5/240, 74/381).
- **Titles:** Helvetica Neue 500 36/-0.02em; centred in the row-1 cells, left at 43px in the row-2 cells.
- **Phones:** 6px `#504e4e` outline stroke, outer r46.5, screen r17. "</" glyphs are 6px round strokes.
- **Gauge:**
  - centre 17px above the well bottom;
  - 3-tone band, brightest next to the needle;
  - ticks every 15° skipping 0;
  - nothing right of the needle.

## Gate results (`node tools/gate.mjs <url> --kind product-ui`)

**Alignment:**
- `align.horizontal-centre` and `align.clipped` pass on all six.
- `align.vertical-centre` passes on R1 (after correcting the pill labels down 1.5px to his measured cap position), R2, R4, R5 and R6.
- R3 keeps 11/17 flags. All 11 are calendar event blocks, whose text is top-aligned at 7.6px by design: a false positive for multi-line event blocks.

**Other FAILs.** The remaining FAILs are the canon disagreeing with Marcel's own measured screens, recorded as rule corrections below:
- `type.weights` (400 is his body weight everywhere);
- `type.sizes` (6-10 sizes per app view);
- `radius.ladder.boxes` (cards r18-35 and r8 events);
- `contrast.page` (his secondary greys sit at about 3:1, and absolute-positioned replica text also confuses the census);
- `colour.canvas-chroma` on the navy view.

## Synthesis: rules learnt or corrected (folded into `knowledge/web/kargul-micro-details.md` §11, KMD-24..KMD-49)

1. **Scale.** Case originals are exact 2x. UniOps-02 is 2.0, not 1.81 (KMD §6 open question closed).
2. **Corrected radii.** UniOps radii were read about 10% low: KPI strip r22.5 (not 20.6), list cards r18 (not 16.4), app panel r21, window r25. Fit the outer edge of a ring, not the inner fill.
3. **The palette is not always AlignUI.** ListKit is stock Tailwind v4 (50/100/500-600 triples) + one navy ink. CopeCart is AlignUI gray. Identify the kit per product before naming tokens (corrects KMD-01).
4. **Weight 400 is the body weight.** 60-80% of the text in every app view, with 450-500 only for titles, values and active items. The product-ui canon rule "weights in {500,600}" is wrong for app UI.
5. **App views carry 6-10 sizes, not 4,** but step in half-pixels around 13-14. Hierarchy is ink vs grey, size steps of 0.5-1px, and list-row titles larger than card titles.
6. **Secondary greys sit about 3:1** (`#717784` on `#0e121b`, `#8b8b8b` on `#f7f7f7`, `#8d8d8d` on `#f4fcf4`). Copy the structure, not the sub-AA grey: keep 4.5:1 in our builds.
7. **Status triples.** Status colour = a tint fill + a 1px ring one step darker + saturated text (ListKit chips, SideShift lessons, CopeCart chips): three values, never a saturated fill.
8. **Card radius tracks card size, not a control-height ladder:** r8 (events 62h), r10 (table), r16-18 (list cards), r21-22.5 (strips, panels), r32.5-35 (phones, bento cards).
9. **Tile radius ∝ size.** Illustration and app tiles use r ≈ 0.19 x side, circular corners.
10. **Inner radius is not concentric.** A well inside a card keeps r29 inside r35 at a 10.5 inset (not 24.5): the inner corner stays nearly parallel-looking.
11. **Dark has no shadows; elevation is a lighter step.** One surface + one rule colour + one raised step; even a tooltip's "shadow" is a solid `0 3px 0` line in the raised step.
12. **Calendar geometry:** 64px hour; event = slot + 4 top inset, height - 2 (a 2px gap between back-to-back events); title at a 7.6px inset; half-hour events centre one line; selected = inset 1.5px dark ring + 2px content shift.
13. **Now indicator, three parts:** a 1px hairline across all days + a 2px bar through today only + a 9px dot on the day line, under the events.
14. **Popover detail rows:** a 30px pitch, 15px icons one rung lighter than the text, a 13px icon-text gap, a 14/500 title; a header with a 10px colour swatch + three icon actions.
15. **Label-value pills.** Filters show a grey label and an ink value at one size inside one control ("Range Last 30 days").
16. **Strip cards.** One card split by 1px rules beats separate KPI cards; icon at 22, text at 52 (icon + 14 gap), value 24/400.
17. **Compound values** keep one size and grey the unit words ("42 hour 18 minutes", "16/50").
18. **Table hierarchy in one ink.** Size steps (13.5 name, 12.4 role) and a coloured underline for links (`#d5dae1`, offset 3); truncate the longest column at a fixed width.
19. **Mobile.** iPhone 430x932 frames, SF Pro (not Rounded), iOS sizes 24/20/17/15/13. The only drop shadow is on the round primary play button.
20. **Progress through structure:** completed items get a ring + tint, a 3px connector runs through the gaps, and a 44px ring carries the count.
21. **Illustration grammar** (marketing bento): a 4-step grey ladder + white focal + one brand colour per section. Strokes 6px round, geometry primitives only.
22. **Charts:**
    - straight segments with mitre joins (no curve smoothing) at about 35px sampling, 1.3px line;
    - grid solid horizontals one step up, dashed verticals 4/4;
    - bars rounded on top only, sitting on the card edge.
23. **Optical centring.** Control labels centre on the cap (cap centre = box centre within 0.5px). Event blocks top-align: the gate's align census needs an exception for multi-line blocks.
24. **Design posts are composed, not computed.** In the calendar post, events drift 18-30px off the day lines. Measure the post for type and colour, but take grid behaviour from his case originals.
25. **Fonts per product:** Inter (UniOps, CopeCart, calendar), SF Pro (SideShift and probably ListKit), Helvetica Neue 500 (Rork marketing titles). Solve each from a 6-8 string width set before building.
26. **Fractional sizes are real.** At exact 2x he ships 13.5 and 17.5px text; do not round them to integers when replicating.

**What makes Marcel's work read premium (measured):**
- **One family per product.** Text is 400 at 13-15px; hierarchy comes from ink vs one grey and 0.5-1px size steps, not weight.
- **Surfaces stay flat.** One surface colour plus one raised step, every edge a 1px rule one step off the surface. The only blur is on floating layers (popover at 5%, hover card at 5-7%) and on the round primary action.
- **Colour is rationed.** One accent (`#4785ff` / `#288dff` / `#405bfb`). Status appears only as 50/100/600-style tint triples. Marketing illustrations use 4 greys + white + one hue.
- **Geometry repeats exactly:** 38/57.5/64px row pitches, 120px card pitch, 30px popover rows, radii scaled to the box (r ≈ 0.19 x tile side, r22.5 strips, r35 cards).
- **Text sits on the cap centre** within half a pixel.
