---
source: web:apple.com (iphone-18-pro, apple-watch-ultra-4, macbook-pro), linear.app, stripe.com, ramp.com, notion.com, spline.design, mercury.com, resend.com, granola.ai, plain.com, lindy.ai, cursor.com, lovable.dev, dub.co, cal.com, retool.com, posthog.com, framer.com, bentogrids.com, dribbble.com/tags/bento-grid (measured 2026-10-10 with Playwright: 1440x900 @2x plus 390x844 @1x, computed-style and bounding-box reads per tile, hover diffs of computed styles); also builds on the 15 sites in bento-craft.md (2026-10-09)
chapter: Bento sections: layout taxonomy, cell-visual taxonomy, rhythm, copy, motion, dark vs light, mobile reflow, premium vs template
pages: n/a (36 new 2x captures in knowledge/benchmarks/bento/, index in CREDITS.md; layouts in system/sections/bento-layouts.json; cell recipes in system/sections/bento-cells.md)
topic_tags: [bento, feature-grid, layout, tiles, cell-visual, product-ui, stat-tile, photo, 3d-render, globe, chart, hover, clip-path, mobile-reflow, dark-mode, two-tone-title, apple, linear, stripe, ramp, founder-priority]
status: studied
---

# Bento sections

Why this note exists: the founder made "individual bento sections" and "bento visuals" a priority. `bento-craft.md` (2026-10-09) already covers how the inside of a tile is built: the visual as a layer, crop plus mask, true-scale UI, ghost layers, glass, keycaps, marquees, R1-R13 recipes and the pre-ship checklist. This note does not repeat any of that. It adds:

- (a) a layout taxonomy of 15 grids with measured ranges (`system/sections/bento-layouts.json`)
- (b) a taxonomy of 28 cell-visual types, each with its build recipe and the amateur version to avoid (`system/sections/bento-cells.md`)
- (c) rules for rhythm, copy length, motion, dark vs light and mobile
- (d) what separates Apple, Linear, Stripe and Ramp from the template bentos on bentogrids.com and Dribbble

Numbers come from computed styles and bounding boxes unless a line says "(screenshot)". Anything synthesised is tagged `[engine note]`. Founder rules (`knowledge/founder/founder-taste.md`) outrank everything here. Where a measured site contradicts one, section 5 says which wins.

## 1. Core ideas

1. **The grid is chosen by how many claims there are and how they compare, not by taste.** Three equal claims make a 3-up (Cursor, Lovable, Lindy). One lead plus supporting claims makes 2+3 (Ramp) or 2/3+1/3 (Stripe). Six parallel specs make a uniform 3x2 (Apple "Worth the upgrade"). Eight small extras make an icon catalogue (Cal 4x2). More than about 7 claims leave the bento for a tabbed switcher, a scroll stack or a scrolly list (Dub, Lovable, Retool, Lindy).
2. **2026 bentos write the title as a sentence and drop the body.** Ramp (5 tiles, 39-50 chars, no body), Notion (34-43 chars, no body), Apple (27-72 chars, no body) and Stripe set one two-tone line: the dark lead phrase is the claim, the grey continuation is the explanation ("**Cards & Expenses** that handle themselves"). Label-plus-body tiles survive where the visual needs explaining (Spline, Resend, Lovable, Cursor: 2-5 word title plus a 60-120 char body).
3. **Radius is a brand voice, not a function of tile size.** Measured outer radii run 4 (Cursor), 6 (Stripe, Vercel), 8 (Plain), 12 (Ramp, Notion, Linear), 16 (Lovable, Cal, Supabase, Clerk), 24 (Spline, Resend) and 28 (Apple). Tool-precise brands go tight, consumer and creative brands go soft. The tile size barely changes it: Apple keeps 28 on 337x300 and on 480x401 tiles.
4. **The premium tile is one material, lit once.** Ramp: warm grey `lab(95.6)` plus a 1px 10% border plus a dotted particle field. Stripe: `#e5edf5` frame plus the brand gradient bleeding from one corner. Apple: pure black tiles inside a `#1d1d1f` panel. Spline: white 8% on black. Template bentos (bentogrids.com, Dribbble) change the background per tile: purple glow, green block, photo, white.
5. **Apple's bento is a spec sheet, not a product demo.** Uniform 337x300 tiles (radius 28, gap 20) hold one fact each: a 48px/600 number with a 19px/600 grey line, or a product render bleeding off the bottom, centred. A compare selector re-fills every tile ("Select an iPhone to compare"). Premium comes from object photography and restraint, not from UI.
6. **Linear and Granola drop the box entirely.** Linear's FIG triptych is 3 columns divided by 1px hairlines: a FIG 0.N mono label (12px Berkeley Mono), an isometric line drawing of 265-304px, then a 15/510 title and a 15/400 grey body. Its feature sections compose overlapping live UI straight on the page background. Granola uses full-width hairline topic rows (serif title left, body right) over 1280x527 photo plates. The bento idea survives as rhythm and hairlines, not tiles.
7. **Hover is a mechanism inside the tile, never a lift.** Across 10 grids hover-diffed (about 45 tiles), no tile shell translated or scaled. What moves: Ramp's 16px corner arrow, Cal's overlay (opacity 0 to 1), Lovable's inner UI (0.25s `cubic-bezier(0.16,1,0.3,1)`), Resend's visual (8 elements, 0.15s), Cursor's phone (3.1s loop). Stripe's tile appears to grow: its `clip-path` goes from `inset(4px 4.83px round 6px)` to `inset(0 round 6px)` in 0.8s `cubic-bezier(0.165,0.84,0.44,1)` while a gradient border fades in (0.25s) and the corner icon's arrows move out 2px (0.6s). Layout never shifts.
8. **On mobile the bento becomes a stack of equal tiles.** 6 of 10 measured grids give every tile the same height at 390px: Stripe 360x527, Notion 358x385, Spline 358x400, Resend 342x526, Lovable 374x425, Apple 161x192 in 2 columns. Ramp keeps 2 heights (one per desktop row: 520 and 448). Cursor sizes to content (414/530/354) and reads less tidy. Small catalogue tiles become a horizontal scroller (Notion 294x367) or a 2-col grid (Cal 170x170, Apple stat tiles).
9. **Dark bentos are lit edges on near-black, not glows.** Resend: transparent tiles with `1px solid rgba(214,235,253,0.19)`, radius 24, and a brighter centre on the top hairline. Spline: `rgba(255,255,255,0.08)` fills, radius 24, no border. Linear: no tiles at all. Lovable's dark stack is the one exception: a pastel glow rises from the bottom edge of each 880x500 panel, kept below the visual. The template-gallery dark bentos (purple orbs, neon numbers) are what to avoid.
10. **One hero cell, contrasted types, one accent.** Ramp: 2 large UI tiles over 3 smaller ones (a chat-over-card, an invoice form, a table, a treasury chart, a logo cloud), with the brand lime used only on the page CTA. Stripe: a checkout plus POS composite (lead), then a usage meter, a chat-commerce flow, a card render and a dot globe, then a wide connected-accounts table. No two adjacent tiles share a visual type.

## 2. Rules (BE-01 to BE-32)

### 2.1 Choosing the layout

- **RULE** BE-01 Pick the layout from the claim count and the hierarchy before drawing anything. 3 equal claims: 3-up (L13). 4 equal: 2x2 or media-caption 2x2 (L09). 5 with one theme: 2+3 (L03). 6 parallel specs: uniform 3x2 (L01). 6-7 with a lead: 2/3+1/3 then 3 then full (L04), or 12-col lead (L07). 8 small extras: icon catalogue (L14). 8+ deep features: tabs, scroll stack or scrolly list (L15). Ids refer to `system/sections/bento-layouts.json`.
  **Why** Every measured premium grid maps cleanly to its content count; template galleries cram 9-12 mixed cells to look "rich".
  **Applies to** landing page, product page. **Check** DIRECTION.md names the layout id and the claim count; the tile count matches the layout's `tiles` range. **Source** Ramp 5, Apple 6, Stripe 6, Notion 3+5, Cal 8, Cursor 3, Lovable 3, Dub/Lovable/Retool/Lindy sequenced

- **RULE** BE-02 Give each grid exactly one hero cell: the largest tile, the richest visual and the core claim, placed top-left or as a full-width row. It runs 1.5-2.7x the area of a supporting tile: Ramp 644x483 vs 421x526 (1.4x), Stripe 828x686 vs 409x690 (2.0x), Notion 602x560 vs 239x160 (8.8x across tiers), Supabase 538x400 vs 263x400 (2.0x). Uniform grids (Apple 3x2, Cursor 3-up, Cal 4x2) have no hero and must then carry the same visual type in every tile.
  **Why** A single entry point sets reading order; two equal "leads" split attention.
  **Applies to** landing page. **Check** count tiles whose area is >= 1.4x the median: exactly 1, or 0 if every tile shares one visual type. **Source** Ramp, Stripe, Notion, Supabase, Apple, Cursor

- **RULE** BE-03 Keep every row edge on the grid and change row height between tiers, not within a row. Ramp row 1 is 483 tall (4:3 tiles) and row 2 is 526 (portrait 0.8). Stripe rows are 686-690 then 456. Spline's brick alternates 596+460 and 460+596 at one row height of 400.
  **Why** Different heights per tier make the hierarchy; ragged tops inside a row read as a mistake (bento-craft 2.1 covers spans).
  **Applies to** landing page. **Check** tiles in one row share top and bottom within 1px; at most 3 distinct row heights per grid. **Source** Ramp, Stripe, Spline

- **RULE** BE-04 Use the offset (brick) layout only for 4 tiles of equal importance: alternate wide and narrow at about 1.3:1 (Spline 596/460, gap 24) so the vertical gutter steps. Use the 2-col masonry only for photo-led headline tiles (Apple MBP: 480 columns, tiles 401/241 in one column and 380/230 in the other, gap 20).
  **Why** The step gives four equal claims some movement without inventing a fake hierarchy.
  **Applies to** landing page. **Check** brick: widths alternate per row and the ratio is in [1.2, 1.45]. **Source** Spline, Apple MacBook Pro

- **RULE** BE-05 Past about 7 features, stop growing the grid and sequence it: a tab list beside one stage (Dub: an active tab with a 1px green left rule, inactive tabs at about 40% opacity; Lovable: an active tab with a gradient underline and an 880x500 stage), a sticky headline with stacked cards (Retool: the active card in a pastel gradient, inactive cards dimmed grey), or a numbered scrolly list with one sticky visual (Lindy: 01/02/03, inactive items at about 40%).
  **Why** Each feature keeps a full-size visual instead of shrinking into a 9-cell mosaic.
  **Applies to** landing page. **Check** any grid with more than 7 content tiles is either a catalogue of small tiles (BE-06) or is converted to tabs, stack or scrolly. **Source** Dub, Lovable, Retool, Lindy, PostHog

- **RULE** BE-06 Run a catalogue of "and also" extras as a separate small-tile grid after the main bento: equal squares of 160-240px, one icon plate, a 2-4 word label, no visual (Cal 180x180 4x2 gap 12, centred; Notion 239x160 x5 under its bento).
  **Why** Small extras would dilute the hero grid; a quiet catalogue closes the section.
  **Applies to** landing page. **Check** catalogue tiles <= 240px, identical size, each holding only an icon, a label and an optional one-line body. **Source** Cal, Notion

- **RULE** BE-07 Use a hairline grid or no box at all when the brand voice is engineered and dark (Linear FIG triptych: 3 columns at about 426px pitch with 1px dividers; Framer: a hairline 3x3 inside one 25-radius frame; Plain: 1px dashed cells on deep green; Dub: 1px vertical page rails). Keep text and visual on the same column edge.
  **Why** Hairlines say precision and let the drawings breathe; boxes would add a sixth surface to a near-black page.
  **Applies to** landing page (dark or technical brands). **Check** divider lines are 1px at <= 12% white or a 1px dashed accent at <= 40%; no tile fill. **Source** Linear, Framer, Plain, Dub

### 2.2 Tile shell

- **RULE** BE-08 Choose the radius by brand voice and keep it identical across tiles: 4-6 for precise tool brands (Cursor 4, Stripe 6, Vercel 6), 8-16 for product SaaS (Plain 8, Ramp 12, Notion 12, Lovable 16, Cal 16), 24-30 for consumer or creative brands (Spline 24, Resend 24, Apple 28, Raycast 30). Inner plates and windows step down: Cursor plate 4 inside 4, Lovable inner UI 24 inside 16 (bleeding, so it is not nested), Cal icon plate 12 inside 16.
  **Why** Radius is the loudest shape signal on the page; one voice across tiles, nav and buttons is what reads designed.
  **Applies to** all. **Check** computed `border-radius` of every tile is equal; it sits in the band for the brand voice named in DIRECTION.md; it matches the bound system's radius ladder. **Source** Cursor, Stripe, Vercel, Ramp, Notion, Lovable, Cal, Spline, Resend, Apple

- **RULE** BE-09 Scale the gap with the radius and the tile size: 4-12 for tight radii and dense grids (Stripe visible gap about 14 at rest, Cursor 10, Clerk 8, Lovable 12, Cal 12), 20-32 for soft radii and large tiles (Apple 20, Ramp 24, Spline 24, Notion 24, Resend 32, Mercury 32). Never pair radius 24+ with a gap under 16.
  **Why** Soft corners need air or the corners crowd one another; tight tiles read as one surface when gaps are small.
  **Applies to** landing page. **Check** gap/radius in [0.8, 2.5] across measured premium grids (Stripe 2.3, Cursor 2.5, Ramp 2.0, Spline 1.0, Apple 0.7, Resend 1.3). **Source** measured grids above

- **RULE** BE-10 On light pages give tiles a 2-5 L-point step from the page and edge them once: a warm grey fill plus a 1px border at about 10% ink (Ramp `lab(95.6)` with `rgba(33,33,33,0.1)`), a cool tinted frame (Stripe `#e5edf5`), or a whisper shadow on white over grey (Cal `0 1px 5px -4px rgba(36,36,36,.7), 0 4px 8px rgba(36,36,36,.05)`). Lovable shows that no edge at all works when the tile is white on a warm `oklch(0.97)` page.
  **Why** A small step reads as paper; a strong border or shadow makes cards, not a bento. This is the founder's one-edge rule applied to tiles.
  **Applies to** light pages. **Check** tile vs page lightness step in [2, 6] L*; exactly one of {border, ring, shadow} per tile. **Source** Ramp, Stripe, Cal, Lovable; founder-taste (one edge treatment)

- **RULE** BE-11 On dark pages use one of three shells: a transparent tile with a 1px cool hairline at 15-20% (Resend `rgba(214,235,253,0.19)`, radius 24), a white 6-8% fill without a border (Spline `rgba(255,255,255,0.08)`, radius 24), or no tile (Linear). Apple's inversion also works on black: black tiles inside a lighter `#1d1d1f`-class panel. Never fill dark tiles with coloured gradients behind the text.
  **Why** Light must come from the visual (render, UI window, glow at the bottom edge), as `dark-mode-premium.md` measured; coloured tile fills look like the template galleries.
  **Applies to** dark pages. **Check** tile fill alpha <= 0.08 white or a hairline <= 0.2; saturated pixels sit inside the visual, not behind the copy. **Source** Resend, Spline, Linear, Apple, gallery negatives

- **RULE** BE-12 Put a single corner affordance on clickable tiles: a 16px arrow in a 32-38px button top-right (Ramp arrow, Stripe expand icon, Notion 32px black round arrow beside the title). It is the only thing that moves on hover besides the visual: the arrow nudges 2-5px or the icon's arrows split by 2px.
  **Why** It tells the user the tile opens without a "Learn more" link in every tile, and it gives hover something precise to do.
  **Applies to** landing page. **Check** clickable tiles share one affordance in one corner; hover diff touches the affordance and the visual only. **Source** Ramp, Stripe, Notion

### 2.3 Type and copy

- **RULE** BE-13 Write the tile title as one two-tone sentence when the visual explains itself: 5-9 words, 34-63 characters, the claim in the full-ink colour and the continuation in about 55-60% ink, at 19-24px with weight 400-600 (Ramp 24/400, Notion 22/700 single tone, Apple 19/600 at 56% white, Stripe about 22/400 from the screenshot). No separate body.
  **Why** One line carries claim and proof; the visual does the rest. Measured: Ramp 5/5 tiles have no body, Notion 3/3, Apple 4/6.
  **Applies to** landing page bentos with rich visuals. **Check** title chars in [30, 65]; two colour spans with a lightness gap >= 35 L*; no `p` under the title. **Source** Ramp, Notion, Apple, Stripe

- **RULE** BE-14 When the tile needs a body, use a 2-5 word label (16-20px, 400-600) plus a body of 60-120 characters at 14-16px in 55-65% ink, at most 3 lines and 300-460px wide (Spline 20/500 + 16/400 at 60% white; Resend 20/400 + 14/400 `#a1a4a5`; Lovable 16/600 + 14/400 `#616161`; Cursor 16/400 + 16/400 at 60%). Mercury and Cursor set label and body at the same size and separate them by weight or alpha only (Mercury 18/480 + 18/360).
  **Why** Same-size, two-weight pairs read calmer and more editorial than a big title over small grey text.
  **Applies to** landing page. **Check** body chars in [60, 120] and lines <= 3; label words <= 5. **Source** Spline, Resend, Lovable, Cursor, Mercury

- **RULE** BE-15 Keep the copy in one corner and on one edge across the grid; add a small eyebrow only when tiles belong to named product areas (Notion "Capture knowledge" above a 22/700 title; Plain 12/400 in accent green, "Channels"; Linear FIG 0.N in 12px mono at the top, title at the bottom).
  **Why** An eyebrow turns a grid into a product map; on generic claims it is noise.
  **Applies to** landing page. **Check** if eyebrows exist, every tile has one and each names a real product area or figure number. **Source** Notion, Plain, Linear

- **RULE** BE-16 Centre tile text only in uniform spec grids where every tile is a single centred fact or object (Apple 3x2: centred 19/600 caption, 48/600 number, render bottom-centre; Cal catalogue: centred icon plate plus label). Every product-UI bento left-aligns.
  **Why** A centred fact over a centred object is symmetric; centred text over a cropped UI fragment fights the crop (bento-craft 2.3).
  **Applies to** landing page. **Check** text-align centre only where every tile's visual is horizontally centred. **Source** Apple, Cal, Ramp, Stripe, Notion

- **RULE** BE-17 Use a single large figure as the whole visual only inside a spec grid, and then mix figure tiles with object tiles (Apple: 2 of 6 tiles are figures, "22 more hours" and "50% charge", at 48/600 with -0.144px tracking; the rest are renders). Put the unit in a smaller line above ("Up to") and the qualifier below in grey (19/600 `#86868b`). Allow a glyph inside the figure (Apple's green battery after "hours"). Elsewhere keep to one figure per grid (bento-craft 2.5).
  **Why** Alternating figures and objects keeps a spec sheet rhythmic; all-figure grids are the "2TB / 1,600 / 25M" template.
  **Applies to** landing page. **Check** figure tiles <= 1/3 of the grid, and no two figure tiles share an edge (Apple places its two diagonally: end of row 1, start of row 2). **Source** Apple iPhone and Watch, bentogrids/Dribbble negatives

### 2.4 Cell visuals

- **RULE** BE-18 Assign every tile a visual type from `system/sections/bento-cells.md` and never repeat a type in adjacent tiles; in grids of 5+ use at least 4 types (Ramp 5 tiles: chat-over-object, form UI, table UI, chart UI, logo cloud; Stripe 6 tiles: device plus checkout, usage meter, chat commerce, card render, dot globe, table).
  **Why** Contrast of construction is what makes six tiles feel like six ideas; the type table makes the choice explicit.
  **Applies to** landing page. **Check** DIRECTION.md lists tile, visual type id and claim; adjacent tiles differ in type; distinct types >= min(4, n-1). **Source** Ramp, Stripe, Notion, Apple

- **RULE** BE-19 Give the hero tile a composite visual of 2-3 layers: a main surface plus one floating overlay that shows the action (Notion: a Meetings table plus a floating recording pill; a dashboard plus an "ask" bar; Ramp: a black card plus two chat bubbles that narrate the automation; Stripe: a POS terminal in front of a checkout window).
  **Why** The overlay is the verb; the surface is the noun. One layer shows a screen, two layers show the product doing something.
  **Applies to** hero tile. **Check** the hero visual has >= 2 overlapping layers and one of them is a state (recording, typing, matched, approved). **Source** Notion, Ramp, Stripe

- **RULE** BE-20 Use a brand material field behind the UI in at most every other tile, drawn from the brand's own identity: Stripe's ribbon gradient bleeding from one corner, Ramp's dotted particle arcs at about 10-20% ink, Dub's dotted globe, Lovable's radial colour halo masked behind the UI. The field never sits behind the copy.
  **Why** A material field is the brand's signature, as in founder rule "signature visual field"; on every tile it becomes wallpaper.
  **Applies to** landing page. **Check** material field present in 30-60% of tiles; its bounding box does not intersect the title box, or it is under 8% alpha there. **Source** Stripe, Ramp, Dub, Lovable; founder-taste (signature visual)

- **RULE** BE-21 Show physical products, chips and cards as studio renders that bleed off the tile edge or float on a glow, never as CSS boxes: Apple's iPhone back is 337x195 flush to the tile bottom; the A20 chip is a 148px render with a soft light rim; Ramp's black card is cropped by the tile bottom; Stripe's gradient card is centred with a white lower half.
  **Why** Objects are bought with photography or 3D; a div card with a chip glyph is the amateur tell.
  **Applies to** landing page. **Check** object visuals are `img`/`picture`/`video`/`canvas` from authored files; they touch or cross a tile edge or sit on a lit field. **Source** Apple, Ramp, Stripe, Mercury

- **RULE** BE-22 Use a photo plate (a real landscape, interior or painterly image behind an app window) when the brand voice is warm or human: Granola 1280x527 split 900+443 with square corners; Cursor's 1300x715 plate at radius 4 with windows on `0 22px 70px 4px rgba(0,0,0,.3), 0 0 0 .5px rgba(0,0,0,.15)`; Apple MBP's full-bleed photo under a 40/600 headline. Keep the plate desaturated or tinted toward the brand palette.
  **Why** A photo supplies light, depth and a mood that flat grey cannot, and the UI on top stays the proof.
  **Applies to** landing page (warm, consumer, creative). **Check** the plate image is real photography or painting, not a CSS gradient; the window shadow follows the measured stack; the plate's hue stays within about 25deg of the brand hue or is neutral (founder palette rule). **Source** Granola, Cursor, Apple

- **RULE** BE-23 For integration breadth, show marks around a hub with empty slots: a centre app glowing in brand colour (Lovable), a mascot (Lindy), or a "YOUR AGENT HERE" dashed slot (Plain), with marks fading toward the tile edges (Ramp's cloud fades to about 10% at the rim) and hatched or dashed empty cells (Lindy, Plain).
  **Why** The empty slot and the fade say "and many more" honestly; a full wall of 30 logos says nothing.
  **Applies to** landing page. **Check** marks come from supplied files or an icon package; opacity falls to <= 0.3 at the tile edge; at least one designed empty slot or hub. **Source** Lovable, Lindy, Plain, Ramp

- **RULE** BE-24 Prove scale with live counters and a feed, not a static big number: Dub's mono figures in brand orange (243,239,149 / 4,151,225,464 / $2,530,996,022.66) beside a dotted globe and a fading feed of event cards ("New sign up", "New click", "New sale").
  **Why** A ticking number and arriving events show the system is running; a static "10M+" is a claim.
  **Applies to** infrastructure, analytics, payments. **Check** counter uses tabular or mono figures; feed items fade to <= 0.3 at the edge; the motion pauses off-screen and under reduced motion. **Source** Dub

### 2.5 Motion

- **RULE** BE-25 Make hover a mechanism inside the tile and keep the shell's box fixed: animate the corner affordance (2-5px), the inner UI (0.15-0.25s state change) or a reveal overlay (opacity 0 to 1); if the tile should feel like it grows, use the Stripe recipe: `clip-path: inset(4px round R)` at rest to `inset(0 round R)` on hover, 0.8s `cubic-bezier(0.165,0.84,0.44,1)`, plus a border glow at opacity 0 to 1 in 0.25s.
  **Why** About 45 tiles hover-diffed across 10 grids: zero shell transforms; Stripe's clip-path grows the tile without reflow or a shadow lift.
  **Applies to** landing page. **Check** hover diff: shell `transform` unchanged; any growth via `clip-path`; durations in [0.15, 0.8]s. **Source** Ramp, Cal, Lovable, Resend, Stripe hover diffs

- **RULE** BE-26 Give each tile its own one-loop story, tied to its claim, and stagger tiles by in-view rather than by a global timeline: Cursor's phone list shimmers "Working" on a 3.1s loop; Linear's composer caret blinks at 1.25s; Stripe animates its chat-commerce and usage meter on hover; Apple's tiles are still.
  **Why** It extends the founder rule that each visual has its own build-in; a uniform fade-up across six tiles reads as a card template.
  **Applies to** landing page. **Check** at most one loop per tile; loop period >= 1.2s; first 800ms differ between any two tiles (filmstrip). **Source** Cursor, Linear, Stripe; founder-taste (own build-in)

- **RULE** BE-27 Treat video tiles as posters first: a still frame that already reads, a quiet play/pause control in a corner (Mercury's 32px round play button bottom-left, PostHog's pause top-right), and autoplay only muted and in view.
  **Why** Videos load late and stall; the poster must carry the claim alone. Mercury, Plain and Spline ship mp4 tiles.
  **Applies to** landing page. **Check** `video` has `poster`, `muted`, `playsinline`; a visible pause control; paused under reduced motion. **Source** Mercury, Plain, Spline, PostHog

### 2.6 Dark vs light, mobile, honesty

- **RULE** BE-28 Decide light or dark per page, then bind the bento's material to it: light bentos use warm or cool tinted tiles, 1px 10% edges and colour inside the visual (Ramp, Stripe, Notion, Cursor, Lovable, Cal, Mercury); dark bentos use hairline or 8% shells, renders and UI as the light sources, and at most one bottom-edge glow per panel (Resend, Spline, Linear, Lovable-dark, Apple).
  **Why** Of 21 sections captured for this note, 11 are light and 10 dark; none mixes shell recipes within one grid.
  **Applies to** all. **Check** one shell recipe per grid; dark grids pass the dark-mode-premium checks (coloured pixels <= 3% of the section outside visuals). **Source** measured grids; dark-mode-premium.md

- **RULE** BE-29 Reflow to one column of equal-height tiles at 390px, 16-24px side gutter, the same radius (or a proportionally smaller one for 2-col stat tiles: Apple 28 to 15), gap 9-48: Stripe 360x527, Spline 358x400 (pad 40 kept), Resend 342x526 (gap 48), Lovable 374x425 (gap 12). Spec tiles go to 2 columns (Apple 161x192, Cal 170x170). Small catalogue rows become a horizontal scroller with a peeking next card (Notion 294x367).
  **Why** Equal heights keep the rhythm the desktop grid had; founder rule: "on mobile all the same heights".
  **Applies to** mobile. **Check** at 390px every tile in the main grid has the same height within 2px (or one height per desktop tier); stat tiles are 2-up; no visual is scaled below 60% of desktop size (crop instead). **Source** Stripe, Spline, Resend, Lovable, Apple, Cal, Notion; founder-taste

- **RULE** BE-30 Crop the visual for mobile instead of shrinking it: keep UI text at 11px or more by re-anchoring the fragment to the tile's left or bottom edge and letting more of it fall off (Stripe and Ramp keep 13-15px UI at 358-360px tile width).
  **Why** Scaling a desktop composition by 0.4 turns UI into texture; cropping keeps it real.
  **Applies to** mobile. **Check** smallest UI text inside visuals at 390px >= 10px; the visual's anchor edge is the same as on desktop. **Source** Stripe, Ramp mobile captures

- **RULE** BE-31 Label sample data once and keep it believable: realistic names, amounts and ids that agree across tiles (Ramp's $240.00 OpenAI receipt is matched to "Tooling"; Stripe's 1,878,108,957 tokens; Notion's ZEN-1201 issue ids). PostHog shows a small "Sample data" tag in the window chrome. Never invent customer logos or endorsements.
  **Why** Coherent sample data is what lets a bento look shipped; the engine's honesty rule still applies (CLAUDE.md principle 4).
  **Applies to** all. **Check** numbers that recur across tiles match; one sample caption per section or in one window chrome; no third-party logos presented as customers. **Source** Ramp, Stripe, Notion, PostHog; CLAUDE.md

### 2.7 Premium vs template

- **RULE** BE-32 Before shipping, run the template test against `gallery-bentogrids.png` and `gallery-dribbble-bento.png`; the bento fails if 3 or more of these hold: (1) more than 7 cells with no catalogue split; (2) 3+ different tile backgrounds; (3) 2+ big-number tiles outside a spec grid; (4) purple or neon glows behind copy; (5) centred icon-plus-label in tiles that also hold UI; (6) avatars, emoji or stock 3D orbs as the visual; (7) no tile crops its visual; (8) one hover behaviour (lift or scale) on every tile.
  **Why** These are the eight traits shared by the gallery bentos and absent from every Apple, Linear, Stripe and Ramp grid measured.
  **Applies to** all bentos. **Check** score the 8 traits in REVIEW.md or DIRECTION.md; 3 or more traits is a fail. **Source** bentogrids.com, Dribbble bento-grid tag (negatives); Apple, Linear, Stripe, Ramp (positives)

## 3. Numbers & scales

### 3.1 Measured grids (2026-10-10, 1440 viewport)

| Site / section | Layout id | Tiles (WxH css px) | Gap | Radius | Shell | Copy tuple | Mobile 390 |
|---|---|---|---|---|---|---|---|
| Apple iPhone 18 Pro "Worth the upgrade" | L01 | 6 x 337x300 | 20 | 28 | `#000` tiles in a lighter panel (about 36 radius, screenshot) | 19/600 +0.228px at 56% white; figure 48/600 -0.144px `#f5f5f7`; qualifier 19/600 `#86868b` | 2-col 161x192, r15 |
| Apple Watch Ultra 4 | L01 | 337x300 | 20 | 28 | same | figure 48/600 in `rgb(0,217,89)` | 2-col 161x192 |
| Apple MacBook Pro | L02 | 480x401/241, 480x380/230 | 20 | 28 | `#1d1d1f`, pad 40, full-bleed photo | 40/600 or 28/600 white, no body | 1-col 328, r28, pad 30 |
| Linear FIG triptych | L11 | 3 columns at about 426 pitch | 0, 1px dividers | none | page `#08090a` | label 12/400 Berkeley Mono `#8a8f98`; 15/510 -0.165px `#d0d6e0`; 15/400 `#8a8f98`; svg 265-304px | stacked |
| Stripe "Flexible solutions" | L04 | 828x686 + 409x690; 3 x 409x690; 1245x456 | about 5 (about 14 visible at rest) | 6 | `#e5edf5` frame, white inner, clip inset 4px | about 22/400 (screenshot), expand button 38px | 1-col 360x527 |
| Ramp "One platform" | L03 | 2 x 644x483; 3 x 421x526 | 24 | 12 | `lab(95.6)` + 1px `rgba(33,33,33,.1)` | 24/400 two-tone, 39-50 chars, no body | 1-col 358x520 / 358x448 |
| Notion "AI where your team works" | L05 | 2 x 602x560; 1229x364; 5 x 239x160 | 24 | 12 | light grey step on white | eyebrow + 22/700 -0.25px, 32px arrow | 1-col 358x385; small row scrolls 294x367 |
| Spline "Agentic 3D" | L06 | 596x400 + 460x400; 460 + 596 | 24 | 24 | `rgba(255,255,255,.08)`, pad 40 | 20/500 at 90%; 16/400 at 60%; checklist 14 | 1-col 358x400 |
| Mercury "head start" | L09 media-caption | 4 x 496x331 media + caption below | 32 | about 16 (screenshot) | `#efeeeb`-class stage, grain, blur | 18/480 + 18/360 same size | 1-col |
| Resend DX / contacts | L13 (2-up) | 2 x 600x526 | 32 | 24 | transparent + 1px `rgba(214,235,253,.19)` | icon 20 + 20/400 + 14-16/400 `#a1a4a5` | 1-col 342x526, gap 48 |
| Cursor "Stay on the frontier" | L13 | 3 x 427x553 | 10 | 4 | `#f2f1ed` on `#f7f7f4`, inset plate `#e6e5e0` 392x392 | 16/400 + 16/400 at 60%, orange link | 1-col 353, content height |
| Lovable "One platform" | L13 | 3 x 365x425 | 12 | 16 | white on `oklch(.97)`, no edge | 16/600 + 14/400 `#616161` | 1-col 374x425 |
| Plain agents | L12 | 793x480 + 3 x 387x220 | 20 | 8-9 | `#f9f6f1` cream | caption below small tiles | 1-col 318 |
| Plain approach (dark) | L11 | 3x2 cells | about 28 (screenshot) | about 8 (screenshot) | 1px dashed green on `#0b2416`-class | eyebrow 12/400 green; 18/500; 18/400 | 1-col |
| Cal "so much more" | L14 | 8 x 180x180 | 12 | 16 | white, whisper shadow | 14/400 centred; icon plate 64 r12 | 2-col 170x170 |
| Granola "Works everywhere" | L15 photo plate | 1280x527 (900+443) | about 4 | 0 | photo plates | serif 32/400 left, 22/400 right | stacked |

### 3.2 Ranges across all measured premium bentos (this note + bento-craft)

| Property | Range | Median-ish | Notes |
|---|---|---|---|
| Outer radius | 4-30 | 12-16 | brand voice, BE-08 |
| Gap | 5-40 | 12-24 | scales with radius, BE-09 |
| Text padding | 16-40 | 24 | Cursor 16-17.5; Notion, Stripe, Lovable 24; Ramp about 32; Apple, Spline, Resend 40 |
| Title size | 14-24 (figures 40-54) | 18-22 | sentence titles 19-24, labels 15-20 |
| Title length | labels 1-5 words; sentences 34-72 chars | - | BE-13, BE-14 |
| Body | 0 or 60-120 chars, <= 3 lines | - | 14-18px, 55-65% ink |
| Tiles per main grid | 3-7 (+ catalogue of 5-8) | 5-6 | BE-01, BE-06 |
| Hero tile area vs supporting | 1.4-2.1x (same tier) | 2x | BE-02 |
| Hover duration | 0.15-0.8s; loops 1.25-3.1s | 0.25s | BE-25, BE-26 |
| Mobile tile | 342-374 wide, equal heights 385-527 | about 400-520 | BE-29 |

### 3.3 Layout taxonomy (full spec in system/sections/bento-layouts.json)

| Id | Name | Grid | Measured on |
|---|---|---|---|
| L01 | Uniform spec grid 3x2 | 3 equal cols, 2 rows, ratio about 1.12 | Apple iPhone, Apple Watch |
| L02 | Offset masonry 2-col | 2 cols, alternating tall/short | Apple MacBook Pro |
| L03 | 2 over 3 | row of 2 halves over row of 3 thirds | Ramp |
| L04 | Two-thirds lead, three, full | 6 cols: 4+2, 2+2+2, 6 | Stripe |
| L05 | 2 + full-wide + catalogue strip | 2 halves, 1 full, 5 small | Notion |
| L06 | Brick (alternating offset) | 2 rows of wide+narrow, mirrored | Spline |
| L07 | 12-col lead plus small | span 6 + 3 + 3, then 3s | Supabase |
| L08 | 3-col with tall spans | tall = 2 short + gap | Clerk, Vercel |
| L09 | 2x2 (tile or media-caption) | 2 equal cols, 2 rows | Cal, Mercury |
| L10 | Full-width lead plus 2 | full row over 2 halves | Raycast |
| L11 | Hairline grid / triptych | 0 gap, 1px dividers in one frame or none | Framer, Linear, Plain, Dub |
| L12 | Wide plus 3 small, text in the slot | wide visual + side copy, 3 small below | Plain |
| L13 | Uniform 2-up / 3-up feature cards | 2-3 equal cols, one row | Cursor, Lovable, Resend, Lindy |
| L14 | Icon catalogue | 4-5 equal small squares, 1-2 rows | Cal, Notion |
| L15 | Sequenced (tabs, scroll stack, scrolly, unboxed, photo plate) | not a grid | Dub, Lovable, Retool, Lindy, Linear, Granola |

### 3.4 Cell-visual taxonomy (full recipes in system/sections/bento-cells.md)

C01 live UI fragment, C02 UI plus floating overlay, C03 chat/agent thread, C04 single figure, C05 figure with glyph, C06 product photo bleed, C07 hero render on glow, C08 full-bleed photo plus headline, C09 photo plate behind window, C10 brand gradient field, C11 particle or dot field, C12 globe or map with arcs, C13 chart with tooltip, C14 funnel or flow chart, C15 code or terminal card, C16 node workflow, C17 integration hub with empty slots, C18 action-chip cluster, C19 object render (card, chip, badge), C20 device mockup, C21 isometric line drawing, C22 compliance seal cluster, C23 icon plate, C24 video poster loop, C25 live counter plus event feed, C26 selector/state control, C27 skeuomorphic key or object (bento-craft R11), C28 people/portrait grid.

## 4. Dos and Don'ts

- **Do** write "**Procure to pay** without chasing approvals" as one two-tone line over a real invoice form (Ramp). **Don't** stack a 3-word title, a 2-line body and a "Learn more" link in every tile and then add a small icon visual.
- **Do** let the hero tile hold a composite (card plus narrating chat bubbles, Ramp; POS plus checkout, Stripe). **Don't** make the hero tile just a bigger version of the small ones.
- **Do** keep tiles one material with one edge (Ramp warm grey + 10% border). **Don't** give each tile its own background colour (the bentogrids "Sync" and "Technexus" boards).
- **Do** grow the tile on hover with a clip-path and nudge one arrow (Stripe, Ramp). **Don't** translateY(-4px) plus a shadow bloom on every tile.
- **Do** mix figure tiles with render tiles in a spec grid (Apple 2 of 6). **Don't** fill a grid with "2TB / 1,600 / 12K / 25M" figure tiles and gradient orbs (gallery negatives).
- **Do** use a hairline triptych with FIG labels and line drawings on a dark technical page (Linear). **Don't** box isometric drawings in glowing purple tiles.
- **Do** sequence 8+ features in tabs or a scroll stack (Dub, Lovable, Retool). **Don't** shrink 12 features into a 4x3 mosaic.
- **Do** reflow to equal-height single-column tiles and crop the visuals (Stripe 360x527). **Don't** scale the desktop composition down until the UI text is 6px.
- **Do** narrate the automation in the visual ("We're grabbing your receipt... no action from you!", Ramp). **Don't** label rows "sample" inside the UI (bento-craft 2.6).

### 4.1 What makes Apple, Linear, Stripe and Ramp premium (and what the template bento does instead)

| Trait | Premium (measured) | Template (bentogrids, Dribbble) |
|---|---|---|
| Material | one tile recipe, one edge (Ramp, Stripe, Apple black in a panel) | 3-6 tile backgrounds per board |
| Hierarchy | 1 hero, tiers by row height (Ramp 483/526, Stripe 686/456) | 8-12 cells of random size |
| Copy | sentence title 34-63 chars or label + 60-120 char body | 1-word labels plus fake KPIs |
| Visual | real UI at 9-15px, studio renders, photo plates, brand material | avatars, emoji, gradient orbs, icons centred in tiles |
| Crop | visual bleeds off >= 1 edge (Apple phone back, Ramp card, Notion window) | small complete objects floating mid-tile |
| Colour | one accent, inside the visual (Apple green only on the Watch figure) | purple/neon glows behind text |
| Motion | per-tile mechanism; clip-path growth; still tiles allowed (Apple) | uniform lift and glow on every tile |
| Data | coherent sample data, matched across tiles | "25M users", "1,600 req/s" decoration |
| Mobile | equal-height single column, cropped visuals | the same mosaic squeezed |

## 5. Exceptions & judgement calls

- **Founder "no grey stage boxes" vs Mercury and Cursor.** Mercury puts each visual in a 496x331 grey stage with the caption below; Cursor insets a `#e6e5e0` 392x392 plate. The founder rule (Kaching round 2) wins for engine builds: visuals sit on the tile's own surface. A stage is allowed only when it is itself material (a photo plate, Granola; depth-of-field blur and grain, Mercury) and DIRECTION.md says `override: founder-bento-no-stage because <material>`. [engine note]
- **Sentence titles vs bento-craft's "1-4 words".** Both are measured. Use the 1-4 word label when the body explains (Spline, Resend, Lovable) and the two-tone sentence when the visual explains (Ramp, Notion, Apple). Never use both in one grid.
- **Centred text.** Allowed only in L01 spec grids and L14 catalogues (BE-16). Apple's centring works because every tile is a single centred object or figure.
- **Still tiles.** Apple's upgrade grid has no hover and no animation (only a 0.344s background-colour transition) and still reads premium, because the renders carry it. Founder rule on build-ins applies to product-UI bentos; a photographic spec grid may stay still. [engine note]
- **Radius 4.** Cursor's 4px tiles look intentional only because nav, buttons and plates all share near-square corners and the palette is warm paper. Do not drop to 4 in a soft system.
- **Unboxed compositions (Linear intake).** These are not bentos, but they replace one. Use L15 "unboxed" when one feature deserves a full-width scene; then the next section can return to a grid.
- **Dark glow.** Lovable's bottom pastel glow is the one measured coloured glow inside a dark tile. It sits under the visual, at the bottom edge, and never behind copy. That is the line between it and the template purple orbs.
- **Mobile radius.** Apple scales its tile radius 28 to 15 for 161px tiles; Lindy grows 8 to 24 on mobile. Keep the ladder proportional (radius / tile short side about 0.09 for soft brands). [engine note]

## 6. Figures worth keeping

All in `knowledge/benchmarks/bento/` (2x; credits in CREDITS.md).
- `apple-iphone-upgrade-3x2.png`, `apple-watch-upgrade-3x2.png`, `mobile-apple-iphone-upgrade.png`: the spec-grid gold standard, figure and render alternation, the 2-col mobile.
- `apple-mbp-masonry-2col.png`: photo-plate headline tiles with gradient line icons, offset masonry.
- `linear-fig-triptych.png`, `linear-intake-unboxed.png`: no-box bento; FIG labels; live UI composed on the page.
- `stripe-flexible-6col.png`, `hover-stripe-billing-rest.png` / `-hover.png`, `mobile-stripe-flexible.png`: L04, brand gradient field, clip-path hover.
- `ramp-platform-2plus3.png`, `hover-ramp-rest.png` / `-hover.png`, `mobile-ramp-platform.png`: two-tone sentence titles, particle field, corner arrow.
- `notion-ai-2plus1plus5.png`: eyebrow + title + arrow, composite visuals, catalogue strip.
- `spline-agentic-brick.png`, `mobile-spline-agentic.png`: brick layout on dark, 3D on an isometric floor.
- `mercury-media-caption-2x2.png`: media-caption 2x2 with depth-of-field objects.
- `resend-dx-2up-dark.png`, `resend-contacts-2up-dark.png`: dark hairline shells (some visuals did not render headless).
- `granola-photo-plate.png`, `cursor-alternating-plates.png`, `cursor-frontier-3up.png`: photo and painterly plates; radius-4 paper voice.
- `plain-dashed-3x2-dark.png`, `plain-agents-1plus3.png`: dashed cells with empty slots; wide plus 3.
- `lovable-platform-3up.png`, `lovable-tabbed-stack-dark.png`, `dub-tabbed-funnel.png`, `retool-scroll-stack.png`, `lindy-scrolly-numbered.png`: sequenced alternatives (L15).
- `dub-globe-feed.png`: live counters plus event feed.
- `cal-icon-tiles-4x2.png`: catalogue tiles with screwed icon plates.
- `gallery-bentogrids.png`, `gallery-dribbble-bento.png`: template patterns to avoid (BE-32).

## 7. Open questions

- Resend's tile visuals again rendered partly empty headless (webhook line only); its shell numbers are reliable, its visuals are not.
- Stripe's tile titles did not resolve to a text node in the tile walk; the ~22/400 figure is read from the screenshot.
- Plain's dark cell radius and gap, Mercury's media radius and Apple's outer panel radius are screenshot reads.
- Mercury rendered dark at 1440 @1x and light at @2x in two runs (theme by time or user agent?); colours in 3.1 come from the light capture.
- PostHog, Arc, Webflow, Figma and Config have no bento on their current homepages (see CREDITS.md); they were not used for rules except PostHog's tabbed pattern.
- Hover was diffed on 10 grids; scroll-linked motion (Retool stack, Lindy scrolly, Lovable tabs) was observed in captures, not timed.
- Dribbble and bentogrids show other people's shots; they are used only as negative patterns, never as visual references to copy.
