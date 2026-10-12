---
source: web:kargul.studio case galleries (285 images, all classified) + X @marcelkargul (223 posts via api.fxtwitter.com/2/profile/marcelkargul/statuses, 217 media items, 40 downloaded) + github.com/kargulstudio sales-crm (MIT), workflow-editor, kanban (no licence; values only), run locally and censused with Playwright 2026-10-12
chapter: Kargul SaaS dashboard playbook: a buildable spec for a Marcel-level dashboard (shell, headers, KPIs, charts, tables, filters, sheets, empty states, light + dark tokens, borders and nesting, the 8 repeated layouts)
pages: n/a (web + source; measured 2026-10-12)
topic_tags: [saas-app-ui, dashboard, product-ui, kpi, charts, tables, borders, nesting, radius, tokens, light-mode, dark-mode, icons, motion, layouts, kargul, benchmark, founder-bar]
status: studied
companion: knowledge/web/kargul-crm-teardown.md (live CRM pixels), knowledge/web/kargul-source-study.md (repo code), knowledge/web/kargul-deep-study.md (studio site, bento, presentation), knowledge/benchmarks/marcel-kargul-profile.md, system/product-ui/kargul-tokens.json
---

# Kargul SaaS playbook: how to build a dashboard at Marcel's level

This note EXTENDS the four existing Kargul notes; it does not repeat their component tables (CRM sidebar, filter pill, command palette, sheet, meter and sparkline recipes live in `kargul-crm-teardown.md` and `kargul-source-study.md`). What is new here: (a) every one of the 285 gallery images classified and the product-UI ones read in detail, (b) 223 X posts (previous study reached 60) including his 315-shot product thread, (c) a border / ring / nesting census of five views of the three repos (`knowledge/benchmarks/kargul-x/borders-census.json`), (d) the dashboard-specific parts the earlier notes lacked: KPI strips, chart grammar, card header bands, list cards, page headers, light-mode tokens, and the 8 layouts he repeats.

**Evidence** (all new files in `knowledge/benchmarks/kargul-x/`):
- `posts.json` (223 statuses, 22 Sep - 12 Oct 2026: text, counts, media URLs), `media-urls.txt` (217 media), `CREDITS.md`.
- `kx-<postIndex>-<n>-<postId>.png|jpg` (40 images: 38 product UI, 1 type demo, 1 settings). File names start with the post's index in `posts.json`.
- `gallery-classification.tsv` (all 285 gallery images, class + note).
- `borders-census.json` (per view: border strings with ink-alpha, dividers, rings, separation method per surface, 400 nesting records: insets, parent/child radius, parent padding).

**Provenance codes** used below: **[M]** measured with getComputedStyle on the repos run locally (CRM 4461, workflow 4462, kanban 4463, 1440x900); **[P]** pixel-sampled from his images; **[E]** estimated from X images normalised so a nav/body label is 14px (his X exports are 1.4-2.2x crops, so E is +/-10%); **[G]** read off gallery images. The repos are studio templates (CLAUDE.md, agent skills); treat values as the studio pipeline's output, not one designer's hand. Never copy client work, logos or the unlicensed code; reimplement from the numbers.

## 1. Core ideas

1. **Two modes, one floor.** His product work splits into *tool pages* (one object list at full fidelity: CRM, kanban, runs, contacts; 14/12px, 30px controls, hairline sheets) and *overview pages* (the "dashboard" people mean: a 24px greeting or title, a filter row, a KPI strip, one signature chart, one or two list cards, a table). The floor (one control height, icon = text size, tabular numbers, believable data, wired controls) is identical in both. 35 of the ~140 product images I read (99 gallery + ~40 X) are overview dashboards; it is the single most repeated screen (section 4).
2. **The KPI row is one object, not four cards.** In most of his overviews the KPIs sit in ONE bordered card split by 1px vertical hairlines (uniops-02, zeroleaks-01, agent-arcade-14/17, X 170, 101, 108, 133, 052-0, 209); the alternative is separate cards with a grey header band (X 119, 151, 157). Floating shadowed stat cards appear mainly in his dark tactile style (workflow overview) and in the kanban tiles, and still share one recipe.
3. **Charts compare something.** Previous-period series (X 119 "This year / Previous year" with two tooltips), labelled dashed averages (X 101 "Avg. view 392"), "compared to Previous periode" in the filter row (X 151), two-series stacks (X 170), delta lines on every headline number. Lone uncompared series are rare in the overviews I read and always sit next to a delta.
4. **Borders are measured, not guessed: structure 5-8% ink, objects 10-15%.** Light hairlines are `#ededed` on white = 7.6% of the ink `#121212`; on the `#fafafa` sidebar the same hex reads 5.6%; card footer dividers `#e7e7e9` = 9.8% [M]. Dark flat structure `#232323` on `#161616` = 5.7% of `#f9fbff`; object borders `#363636`/`#393939` = 14-15% [M]. Inner list dividers drop to 2.6% (`#f1f1f1` on `#f7f7f7`) [P].
5. **Each theme separates surfaces a different way, and never mixes.** Census of surfaces per view [M]: kanban light = `ring` 30 + `ring+drop` 28, zero full CSS borders on objects (borders only on structural bars); CRM flat dark = `fill+border` 33 of 48; workflow tactile dark = `fill+ring+drop` 24 + `ring+drop` 24 (dark outer ring, 4% inner highlight). The founder-relevant lesson: *borders draw structure, rings draw objects, fills draw state, shadows draw height*.
6. **Structure is flush; only floating things are round.** Sidebar, header, tabs, toolbar, table and sheet are edge-to-edge with radius 0 and 1px hairlines; cards, controls, popovers and tiles are rounded [M census: every bar/section record has `rP 0`]. Card header bands and footer dividers run flush to the card edge (inset 0) while content inside sits at the card padding (16/20).
7. **Inner radius steps one rung down; it is not concentric math.** Node shell r12 at 5px padding holds r10; overview card r16 at 20px padding holds an r14 list; popover r12 at 6px holds r8 rows; menu r8 at 4px holds r6 items [M]. Gaps between sibling cards are slightly smaller than the cards' own padding (kanban 14 vs 16; workflow 16 vs 20) so a group reads as one block.
8. **Light is his default for dashboards; dark is a brand choice.** Of the 35 overview dashboards, 25 are light (white or `#fafafa` canvas, `#fafafa`/`#f0efeb` sidebar), 10 dark (pure black ZeroLeaks, `#0c0c0f` tactile, `#0e121b` navy Copecart, `#161616` flat CRM). Several clients get both (Copecart 01/04, ecom-jobs 01/12, agent-arcade, uniops 02/03).
9. **Numbers are typeset, not just printed.** Tabular everywhere, often a mono face for money and KPIs in light analytics (X 151 `$2,746.00`, X 170 `$9,237.40`, `$920,000`), units and currency muted at the same size (`16/50`, `42 hour 18 minutes`, muted `$`), display tracking by his own published rule: 16px 0%, 36px -3%, 100px+ -5 to -6%, never past -6% (X post 2109273659038650501).
10. **What he says about craft (X).** "design in figma - build with the help of claude - spend hours fixing small details manually" (post 2106802573114065103); the free dashboards Figma file is offered to "see exactly how we think about spacing, sizing, typography, and layout"; his critique of a $200k/month studio: "bad hierarchy. no spacing system. typography that looks like it was picked randomly". The bar is spacing system + hierarchy + type, executed to the pixel.

## 2. Rules

### 2.1 Shell and page structure

- **RULE KS-01** Pick the page's layout from the 8 Kargul layouts (section 4) before drawing anything; a dashboard product needs at least L1 (analytics overview), L2 (object table) and L3 (list + detail) or L7 (settings) so it reads as a product, and every page uses one shell.
  **Why** His galleries always show 4-12 screens of one product (Clokora 6, Copecart 10, ListKit 9, ZeroLeaks 8, TxtCart 8); the overview alone reads as a template.
  **Applies to** SaaS app UI. **Check** the build ships >= 3 distinct page layouts from section 4 sharing one sidebar/header component. **Source** gallery-classification.tsv (28 dashboard + 10 table + 7 settings + 7 detail images across 13 products)

- **RULE KS-02** Build the shell to these numbers: sidebar 254px (234-272), header bar 58px (14/16 padding), nav rows 30px at 4px gap (34 pitch), sections padded 12px and separated by full-width 1px hairlines, a 57px workspace block on top and a plan/user block at the bottom; the whole nav fits 900px tall.
  **Why** One ladder (12/8/6/30/14) reused everywhere is what makes the sidebar look machined; X dashboards normalise to the same band (sidebar 234-254, rows 33-36).
  **Applies to** SaaS app UI. **Check** sidebar width 234-272; nav row height 30 (X-style 32-36 allowed if every row matches); no group clipped at 1440x900. **Source** [M] CRM/kanban; [E] X 119, 101, 170, 151

- **RULE KS-03** Draw structure flush and objects round: sidebar, header, tabs, toolbar, table and sheet are edge-to-edge with radius 0 and 1px hairlines; only cards, controls, chips, popovers and tiles get a radius.
  **Why** Census: every bar/section/table record has parent radius 0; rounding a structural bar makes the shell look like stacked cards.
  **Applies to** SaaS app UI. **Check** `getComputedStyle(header|aside|[role=tablist]|table).borderRadius == 0`; cards >= 12. **Source** [M] borders-census.json (crm, kb-board, wf nests)

- **RULE KS-04** When the canvas needs depth, inset the main panel: dark page `#0c0c0f` with the app panel `#111114` inset 6px top/right/bottom at r10 behind a 70px rail; light app background `#f7f7f7`/`#fafafa` with the content panel inset 6-8px at r12-16 and a 1px ring; the sidebar sits on the page colour, not on the panel.
  **Why** The inset frame makes the app one object and gives the sidebar its own plane (workflow, uniops-02, X 096, X 013).
  **Applies to** SaaS app UI. **Check** main panel offset 6-8px from viewport edges, radius 10-16, sidebar background = page background. **Source** [M] workflow editor-app; [G] uniops-02; [P] X 096 (rail `#0c0c0f`, main `#111114`)

- **RULE KS-05** Use two page-header patterns only: tool pages get a 16px/500 title (plus breadcrumb or a 20px status pill) in the 58px bar; overview pages get a 24/600 title (or a greeting) with a 14/24 subline at 60% ink, 18px down to the tabs/filter row, 40px down to the content, content capped at 1200px with 32px side padding.
  **Why** In an app the object is the hero; the overview is the only page that reads top-down like a report.
  **Applies to** SaaS app UI. **Check** title size 16 on list/board/canvas pages, 24 only on overview; overview container max-width 1200 and padding 32. **Source** [M] workflow overview.tsx, CRM header; [G] clokora-01, txtcart-00, uniops-02; [E] X 119, 170

- **RULE KS-06** Put one filter row of 30px controls under the overview title: split pills `Label Value ⌄` (Range Last 30 days, Scope All tools, Role All roles), a comparison selector (`Last 7 days | compared to | Previous period`), a granularity select (Daily/Weekly) on the left; Refresh as a ghost and one primary `+ Action` on the right.
  **Why** The filter row states what every number on the page means; the comparison selector is what makes deltas trustworthy.
  **Applies to** SaaS app UI. **Check** one row, all controls equal height (28-32), exactly one filled primary, a comparison control present. **Source** [G] uniops-02, copecart-01/04; [E] X 151, 170, 159

### 2.2 KPIs

- **RULE KS-07** Build the KPI row as ONE card split into 3-5 equal cells by 1px vertical hairlines (no gap, no per-cell shadow): each cell 16px padding (16-22), a label row (14-16px outline icon + 14/500 muted label, optional 12px muted sub-label), 12-20px gap, a value at 24-28px/600 tabular (mono allowed), then the delta line.
  **Why** One object with dividers reads as a single instrument panel and costs half the edges of four cards; it is the most common KPI construction in his overviews.
  **Applies to** SaaS app UI. **Check** KPI container has one border/ring; children separated by `border-left` 1px at 5-8% ink; value font-size 24-28. **Source** [G] uniops-02, zeroleaks-01, agent-arcade-14/17; [E] X 170, 101, 108, 142, 127

- **RULE KS-08** When KPIs or charts need a title and an action, give the card a flush header band: band fill one step off the body (`#fafafa` on white; `#18181c` on `#141417`), 52-68px tall, padded 14x18, holding a 24-28px colour tile with a white filled glyph, a 14-16/600 title and a right-aligned kebab, `↗` button or Share; a 1px hairline under the band; the body stays white/card colour. Use this one header grammar on every card of the page.
  **Why** The band separates "what this is" from "the number" without a second card; one header grammar is the founder's consistency rule.
  **Applies to** SaaS app UI. **Check** every card header is the same component and height; the band touches the card's top and side edges (inset 0). **Source** [M] workflow overview-top-posts (`#18181c` band, 14x18 padding); [E] X 119, 151 (band ~52-60 tall); founder-taste.md (card-header rule)

- **RULE KS-09** Write every delta as glyph + coloured percentage + muted context in one line under the value (`▲ +78.9% since Feb 28`, `↑ 10.6% vs last month`), or as a 20px pill (12/600, 20% status tint, min-width 56) aligned right on the value baseline; mute units and secondary parts at the same size as the value (`16/50`, `42 hour 18 minutes`, `$`), never colour the value itself.
  **Why** The delta is the reading of the number; muted units keep the figure the focal point.
  **Applies to** SaaS app UI. **Check** value colour = foreground; delta colour = success/danger only on glyph + %; unit spans use the muted token. **Source** [M] workflow stat card (pill 20px, 20% tint, unit 24px at 50%); [G] uniops-02; [E] X 170, 101, 151, 119

### 2.3 Charts

- **RULE KS-10** Make every chart compare: a previous-period series in a second hue or dotted grey, or a dashed reference line labelled in its series colour at the left (`Avg. view 392`), and say what is compared in the filter row or legend.
  **Why** His overview charts almost always carry a second series, a reference line or a compare-to control; comparison is what turns a decoration into a decision.
  **Applies to** SaaS app UI and product heroes. **Check** each chart has >= 2 series or >= 1 reference line plus a legend/label naming the comparison. **Source** [E] X 119 (This year / Previous year), X 101 (two labelled averages), X 151 (compared to Previous periode), X 170 (Male/Female stacked)

- **RULE KS-11** Grid every chart with dashed hairlines on both axes (light ~6-8% ink; dark `3 6` dash at 10% white), y ticks 12px at 30-45% ink right-aligned in a 28px gutter, x labels either every bucket or just the ends (`Jan 31 ... Today`), and the plot inset 16-20px inside its card.
  **Why** Dashed grids sit behind data without boxing it; a fixed axis gutter keeps stacked charts aligned.
  **Applies to** SaaS app UI. **Check** grid `stroke-dasharray` set; tick font 12; axis gutter 24-32px. **Source** [M] workflow overview-growth-chart (AXIS_WIDTH 28, dash 3 6 at 0.1, ticks 12px white/30); [E] X 101, 119, 170, 151

- **RULE KS-12** Draw bars with a rounded top (r4-6) as a tinted body plus a 4-5px solid cap in the series colour; draw the selected/latest bucket fully solid with a series-tint column band behind it and its x label in the series colour; pair grouped bars 5px apart; keep zero buckets as 2-4px ghost bars so the time axis never has holes.
  **Why** Tint + cap reads as a bar without heavy colour mass; the solid bucket gives the eye a "now".
  **Applies to** SaaS app UI. **Check** inactive bar fill <= 35% of series colour; one solid bucket per chart; zero values render a ghost bar. **Source** [P] X 101 (cap `#2db374` over tint `#c0ead6`, band `#def5eb`), X 170 (ghost bars), X 151 (bars `#e6f3fd` under the line)

- **RULE KS-13** On hover or selection, snap to the bucket: a dashed vertical guide (16% ink), a 4px ring dot (surface fill, 2px stroke), and an r8 tooltip 12px above the point with the value at 14/550 tabular and the period at 11px 50%; for two-series comparisons show one tooltip per series (top and bottom of the band) over a 10% tinted month band.
  **Why** Snapping avoids jitter; dual tooltips make the comparison legible without a table.
  **Applies to** SaaS app UI. **Check** tooltip radius 8, offset 12; one guide line; dual tooltips when series = 2 comparison. **Source** [M] workflow growth chart; [E] X 119 (2025: 143 sold / 2024: 132 sold over a pink March band)

- **RULE KS-14** Lines are 1.5-2px in light UI (3px only for one signature dark chart with a glow), smoothed monotone or stepped for weekly buckets, with an area fill fading 16% to 0 and an end dot on the latest value; replay the draw (900ms, area 400ms) by re-keying the chart on filter change.
  **Why** Thin lines over a soft area read precise; a redraw tells the user the data changed.
  **Applies to** SaaS app UI. **Check** line stroke-width <= 2 in light; area gradient 0.16 -> 0; chart group key includes range/tab. **Source** [M] workflow overview-growth-chart; [E] X 151, 119, 096

- **RULE KS-15** Put micro-viz inside KPI cells and rows instead of extra chart cards: a 5-bar mini spark at the cell's right edge (latest bar solid accent, others 30-60% tints of the same hue, 24-32px tall), segmented meters (17 segments in tables), 6px distribution bars, 14-bar sparklines; build them as DOM/SVG without a chart library.
  **Why** Micro-viz makes every number look alive at no layout cost (X 151's three KPI cells each carry a 5-bar spark in their own hue).
  **Applies to** SaaS app UI. **Check** each KPI cell has a value + delta + optional micro-viz; no axis on micro-viz. **Source** [E] X 151; [M] CRM segment-bar / sparkline, kanban overview Bar

- **RULE KS-16** Spend colour on one accent plus at most three series hues from one tuned set (light: blue `#328ff9`, orange `#f49515`, green `#2db374`, violet `#5954fe`; tactile dark: gradient `#4961fc -> #7649fc -> #bd49fc -> #12a8ff`), legends as 8px rounded-square dots, status colours kept separate from series colours.
  **Why** His charts stay calm because hue count is capped and the same hue means the same series on every card.
  **Applies to** SaaS app UI. **Check** distinct saturated hues across all charts on a page <= 4; legend markers 8-10px squares r2. **Source** [P] X 170, 151; [M] workflow chart stops

### 2.4 Tables and list cards

- **RULE KS-17** Tables: header 38px (12px subtle; uppercase 12px +1px tracking in analytics, or a leading 14px type icon per column in CRM views), rows 42px + 1px divider, edge cell padding equal to the card inset (12 flush tables, 16 in cards), numbers tabular (mono allowed) and right-aligned with their header, status as an 8px dot or square + word, at most one filled chip per row, hover = 4% ink (light) or card @60% (dark), selected = solid tint (`#f1effc` light, `#1b1d20` dark).
  **Why** One grid for header and cells and one colour budget per row keeps dense data calm.
  **Applies to** SaaS app UI. **Check** th 38, td 42; filled chips per row <= 1; `th`/`td` share x and justification. **Source** [M] CRM; [P] X 001-2 (`#f1effc` selected, column type icons, `#f2f2f2` vertical dividers), X 151 (square status dots)

- **RULE KS-18** Fill rows with typed objects, not text: tinted-initial avatars (20-32px, pale hue bg with the same hue's dark text), logo tiles at 25% radius, IDs with a muted `#` prefix, links in the accent, dates with a 14px calendar icon and `Today/Yesterday` words, overdue as danger text with an alert-circle (`Oct 10 · Overdue`), a hover-only expand button in the first cell.
  **Why** Six data types per row is what makes his tables look like working software, not reports.
  **Applies to** SaaS app UI. **Check** >= 4 data types per row; overdue uses danger + icon; no lorem. **Source** [E] X 001-0/2, 025-0, 151; [M] CRM company-row

- **RULE KS-19** Build list cards (Usage by tool, Needs attention, Top customers) as: header `Title · qualifier` (14/500 + muted) with a `View all ↗` accent link right; rows 44-48px with a 20-24px logo/avatar tile, 14px name, right-aligned muted meta joined by middle dots (`9 users · 9h 47m`) or one tinted chip (`Urgent`); dividers inset to the content edges at 2.5-4% ink, never full-bleed.
  **Why** Inset dividers mark rows without slicing the card; the `↗` link sends the user to the full table.
  **Applies to** SaaS app UI. **Check** row dividers start and end at the card padding; meta uses `·` separators; one chip max per row. **Source** [G] uniops-02 (row line `#f1f1f1` on `#f7f7f7`); [E] X 151 (Top Customer Locations, flags + %), X 170 (worklist chips Urgent/Medium/Low)

### 2.5 Borders, rings and nesting

- **RULE KS-20** Set border colour by role as a share of the ink: structural hairlines 5-8% (light `#ededed` on white = 7.6%, on `#fafafa` = 5.6%; dark `#232323` on `#161616` = 5.7%), object edges 10-15% (light card footer `#e7e7e9` = 9.8%; dark fields/popups `#393939` = 15.4%), inner list dividers 2.5-4%, tags 14-29% of their own hue; width 1px everywhere, 0.5px only on tiny count chips, 2px only for focus, 3px only for the light card halo.
  **Why** Two strengths (structure vs object) let edges carry meaning; anything above ~20% ink reads like a wireframe.
  **Applies to** SaaS app UI. **Check** for every bordered element compute a = (bg - c)/(bg - ink): structure 0.05-0.08, objects 0.09-0.16, no neutral border > 0.2. **Source** [M] borders-census.json (crm, kb-board, kb-overview); [P] gallery uniops-02

- **RULE KS-21** Separate surfaces with one method per theme: light floating objects (controls, cards, popovers) use box-shadow rings (`0 0 0 1px #ededed`, or the card's `0 0 0 3px rgb(205 205 205/.12)` halo plus two tiny drops) and never a CSS border; dark flat surfaces use fill + 1px border; dark tactile surfaces use a darker outer ring (`0 0 0 1px rgb(0 0 0/.12-.4)`) plus a 4% white inner highlight drawn as a last-child overlay. CSS borders are reserved for structural lines and fields.
  **Why** Census: kanban 0 bordered objects vs 58 ringed; CRM 33 of 51 fill+border; workflow 60 of 74 ring-based. Mixing methods on one page is what looks assembled.
  **Applies to** SaaS app UI. **Check** in light mode, elements with border on all four sides are only inputs/selects/tags; cards/controls have `box-shadow` containing `0 0 0`. **Source** [M] borders-census.json `methods`; kanban globals.css shadow tokens

- **RULE KS-22** Nest by padding, flush the bands: content inside a card sits at the card padding (16; 20 for large cards; stat cards 19/20/18), while header bands, footer dividers and tables run flush (inset 0) to the card edges; popups inset rows 6px (r12) or 4px (r8); node shells pad 5/5/7; segmented tracks pad 1px; the inner radius is one rung below the outer (16 -> 14, 12 -> 10, 12 -> 8, 8 -> 6), not outer minus inset.
  **Why** Flush bands make the card one material; one-rung radii stay optically right at 4-20px insets where strict concentric math gives odd or negative values.
  **Applies to** SaaS app UI. **Check** nest records: child inset = parent padding (+-1) or 0; child radius in the ladder and < parent radius. **Source** [M] borders-census.json nests (kanban card footer inset 0 + chips at 16; workflow node r12 p5 -> r10; top-posts r16 p20 -> r14 list; segmented r9 p1)

- **RULE KS-23** Make the sibling gap slightly smaller than the cards' own padding (cards padded 16 -> gap 14; padded 20 -> gap 16; rows of cards 20 apart; header to content 40), and step padding down by level: page 32 -> card 20/16 -> cell 12-16 -> control 8-9 -> icon-label 6 -> chip 4.
  **Why** A gap below the inner padding binds a card group into one block; one descending ladder is the "spacing system" he says weak studios lack.
  **Applies to** SaaS app UI. **Check** card grid gap / card padding between 0.8 and 1.0; every padding/gap value in {2,4,6,8,12,14,16,20,24,32,40}. **Source** [M] kanban overview (p16, gap 14), workflow overview (p20, gap 16/20, header 40); X post 2105272615610802346

- **RULE KS-24** Apply the leading-tile inset rule inside every row, button and card header: the tile's left inset equals its top and bottom insets; tiles are 16/20/24/28/40px with radius 25-28% of the side, filled with a solid or glossy colour and a white filled glyph; outline icons stay outline everywhere else.
  **Why** Equal insets make the tile look seated; his KPI and section tiles (X 119, 151, 170) always sit on equal margins.
  **Applies to** SaaS app UI. **Check** `node tools/check.mjs` probe `shape.inset-tile` passes; tile radius/side 0.25-0.28. **Source** founder-taste.md (inset-tile rule); [M] CRM logo tiles 25%, workflow badge 40/r11; [E] X 119, 151, 170

### 2.6 Type, icons, controls

- **RULE KS-25** Run the app on 14px content and 12px chrome with 16px titles, one 24px page title on overviews and one KPI size (28/600/-0.03em tabular, or Inter Display 40/48/500 with a 24px 50% unit in a tactile dark build); weights 400/500/600 only; tracking 0 at 16px and below, -3% at 36px, -5 to -6% from 100px, never tighter than -6%.
  **Why** Few sizes leave weight and grey to carry hierarchy; the tracking ladder is his own published rule.
  **Applies to** SaaS app UI and dashboards in heroes. **Check** distinct font sizes in the fold <= 5; no weight >= 700; letter-spacing/size matches the ladder. **Source** [M] CRM/kanban/workflow; X post 2109273659038650501 (16px 0%, 36px -3%, 100px+ -5 to -6%)

- **RULE KS-26** Use one outline icon set sized to the text: 14px in nav rows, cells and icon buttons, 12px inside 30px text buttons, 16px only for close and checkboxes; stroke about 10% of the grid (1.4 at 14, 1.5 at 16); filled glyphs only inside colour tiles; per the founder, Lucide is the default set.
  **Why** Icon/text ratio 0.85-1.15 keeps rows word-led; his CRM/kanban icons are 14px exports at 1.4/1.167 stroke.
  **Applies to** SaaS app UI. **Check** one icon library imported; svg size / adjacent font-size 0.85-1.15. **Source** [M] CRM (14 x35, 12 x26, 16 x17), kanban (73 of 78 at 14); founder-taste.md (Lucide rule)

- **RULE KS-27** Give every action one height (30px; 24 for row actions) and one shape family per product (pills in flat dark, r10 in light), the primary as ink `#121212` in light (one brand-accent CTA per view at most), split filter pills, a sliding white segmented indicator on a muted track, and mark the active nav row either as a white pill with a 1px ring and a 1-2px lift on a grey sidebar or as an accent tint with a 3px edge bar; hover changes only text/icon colour on nav rows.
  **Why** One height lines toolbars up; reserving fill for "you are here" keeps the sidebar quiet.
  **Applies to** SaaS app UI. **Check** buttons in a row share height; nav hover leaves background unchanged; one filled accent per view. **Source** [M] CRM/kanban buttons; [E] X 170 (white active pill), X 101 (tint + 3px bar `#29b672`), X 119 (full-bleed tint row)

### 2.7 States, motion, data

- **RULE KS-28** Design progress and empty states as objects: setup progress as 4 dashes (40x4px, 8px gap, done `#25ad61`, todo `#e8e8e8`) with a `2/4` label and a checklist strip of hairline cells (check-circle done, ring-circle current in accent, empty circle todo); empty states keep the container's geometry (table row 120px, board tile 130px dashed r16) with a 40px icon tile, 14/500 title, 12px line and one ghost action.
  **Why** Empty and in-progress states are where templates go blank; his are designed screens (plunio-04, listkit-07, runinfra-01).
  **Applies to** SaaS app UI. **Check** every list/card has an empty variant; setup progress uses segmented dashes. **Source** [P][G] uniops-02; [M] CRM/kanban empty states; [G] plunio-04, runinfra-01, listkit-05/07

- **RULE KS-29** Animate state, not decoration: hover 150ms `cubic-bezier(.25,1,.5,1)` on colour/background/shadow only; popovers 200 in / 150 out from the trigger; sheets 350/250; charts redraw 900ms on filter change; KPI digits roll per digit; stat cards may fade a top glow in 600ms on hover; no idle loops except live states (a running timer, a run in progress); all of it behind `reducedMotion="user"`.
  **Why** A calm dashboard feels expensive; motion signals change.
  **Applies to** SaaS app UI. **Check** no `transition: all`; infinite animations only on live elements; chart group re-keys on filter. **Source** [M] all three repos; [G] clokora-01 (live timer bar)

- **RULE KS-30** Seed coherent, derived, dated data: one sample company/workspace, 6-18 named people reused across screens, values derived from base records (totals equal sums), relative dates (`Today`, `Yesterday`, `2h ago`), at least one overdue item, one pre-selected row, compact values (`9h 47m`, `$2.48M`, `+12 others`); label it sample per the engine's no-invented-proof rule.
  **Why** His screens read as live products because every number agrees with every other; vague data is the template tell.
  **Applies to** SaaS app UI and product heroes. **Check** sums match across KPI, chart and table; no lorem; sample label present on marketing use. **Source** [M] CRM lib/companies.ts; [G] uniops-02, clokora-01/03; CLAUDE.md principle 4

- **RULE KS-31** Pair light and dark by geometry, not inversion: same sizes, radii and ladders; dark surfaces step 1-3 points for structure and 6-10 for state (`#161616` / `#171717` / `#1b1d20` / `#1e1e1e` / `#2a2a2a`), dark borders 5.7% structure and 15% object, rings turn into a darker outer ring plus a 4% inner highlight, series colours lighten one step, white primary or one accent.
  **Why** His paired screens (Copecart 01/04, ecom-jobs 01/12) match pixel-for-pixel in geometry; only the surface logic changes.
  **Applies to** SaaS app UI (light + dark). **Check** compare computed geometry of the same screen in both themes: identical boxes; colour tokens from kargul-tokens.json `light` / `dark`. **Source** [G] copecart-01 vs 04, ecom-jobs-01 vs 12; [M] CRM, workflow tokens

- **RULE KS-32** Judge the dashboard against his references at equal zoom before shipping: put the fold next to X 151, 170, 101 or gallery uniops-02 (light) and X 096 or zeroleaks-01 (dark) with `tools/compare.mjs`, and check the five things he would: one spacing ladder, one header grammar, comparison in every chart, borders at 5-15% ink, numbers typeset (tabular, muted units).
  **Why** The founder judges product UI side by side ("nothing like Marcel... too noobish"); a named checklist turns taste into a pass.
  **Applies to** SaaS app UI. **Check** `tools/compare.mjs` overlay exists in the report; the five items are answered in DIRECTION.md. **Source** CLAUDE.md craft reminders; knowledge/benchmarks/kargul-x/

## 3. Numbers and scales

Machine-readable: `system/product-ui/kargul-tokens.json`. The tables below are the human version plus what the JSON cannot say.

### 3.1 Shell and page

| Part | Value | Prov. |
|---|---|---|
| Sidebar | 254 (234-272); collapsed 60; rail 70 / 236; resizable 200-400 | M, E |
| Workspace block | 57 (12 padding, 32px logo tile r8, 14/500 name over 12px subtitle) | M |
| Nav row | 30 (X normalises 33-36), radius 8, 14px icon, 6px gap, 8px side padding | M, E |
| Section | padding 12, row gap 4, 41px from last row to next first row, full-width hairline | M |
| Header bar | 58 (14/16 padding); kanban 63 = 16 + 30 + 16 + 1 | M |
| Tabs row | 45 (16px gap, underline 1px foreground) | M |
| Toolbar / filter row | 62 (16 padding, 8px between pills) | M |
| Overview container | max 1200, padding 32/32/40, title->filters 18, header->content 40, row gap 20, grid gap 16 | M |
| Inset app panel | 6 (dark) / 6-8 (light), radius 10-16 | M, G |
| Card grid gap | 14 (p16 cards), 16 (p20 cards), 20 between card rows; X 20-24 | M, E |

### 3.2 Components (dashboard-specific; others in the companion notes)

| Component | Spec | Prov. |
|---|---|---|
| KPI strip | one card, 3-5 cells, 1px vertical hairlines, cell padding 16 (16-22), height 118-140; label row icon 14-16 + 14/500 muted; value 24-28/600 tabular or mono | G, E |
| KPI banded card | header band 52-64 (`#fafafa` / `#18181c`), 24-32 tile, 14-16/600 title, kebab/↗ 28-30 button; body value 28 + delta | E |
| KPI tile (kanban) | r16, p16, gap 12, label 14/500 muted, value 28/600/-0.03em tabular | M |
| Stat card (tactile dark) | min-h 145, r16, padding 19/20/18, gap 20, 40px badge r11, label 16/550 60%, value Inter Display 40/48/500, unit 24 at 50%, delta pill 20h | M |
| Chart card | min-h 399, header band 68 (14x18 pad), plot inset 16-20, axis gutter 28, ticks 12 | M |
| Delta | glyph + % in status colour + muted "vs last month"; pill 20h 12/600 20% tint min-w 56 | M, E |
| Bars (light) | top r4-6, tint body + 4-5px solid cap, pair gap 5, selected bucket solid + tint column band, ghost zero bars | P, E |
| Line (light) | 1.5-2px, area 16% -> 0, end dot r4 | E |
| Line (dark signature) | 3px, 4-stop gradient, drop glow dy7 blur 6.5 50% accent, sparkle dots | M |
| Tooltip | r8, offset 12, value 14/550 tabular, meta 11 at 50%; light = white card + ring + soft drop | M, E |
| Reference line | dashed, series colour, label at left in series colour 12-14px | E |
| Breakdown bar | 24-32 tall, 4px segment gaps, pill ends, remainder `#e8e8e8`, legend rows: 8px square dot, label, mono value, delta | E |
| Setup progress | 4 dashes 40x4, gap 8, done `#25ad61`, todo `#e8e8e8`, label `2/4` | P |
| Table | header 38, row 42 (+1), cell pad 12 (16 in cards), selected `#f1effc` / `#1b1d20` | M, P |
| List card row | 44-48, tile 20-24, inset dividers 2.5-4% ink, meta joined by `·` | G, E |
| Detail panel inline | 360-420 wide, 1px left hairline, key/value rows 32-34 with label column ~35% and 14px type icons, footer meta + danger text action | E |
| Detail sheet | 480/560, header 56, footer 62, sections 20 | M |

### 3.3 Borders as ink alpha (census, `borders-census.json`)

| View | Most common edges | Ink alpha | Method share (surfaces) |
|---|---|---|---|
| CRM flat dark | 1px `#232323` bottom on `#161616` (24 dividers); 1px `#363636` full; tag borders | 0.057; 0.139; 0.14-0.29 | fill+border 33, fill+ring+drop 11, fill 4 |
| Workflow tactile dark | 1px `#000` on controls; rings `0 0 0 1px rgb(0 0 0/.12-.4)`; inset `rgb(253 253 255/.04)` x12-19 | darker than surface; +4% highlight | fill+ring+drop 24, ring+drop 24, border+ring+drop 10 |
| Kanban light board | `#e7e7e9` top divider in cards (10); `#ededed` bars | 0.098; 0.076 (0.056 on sidebar) | ring 30, ring+drop 17, fill 3 |
| Kanban light overview | `#ededed` bottom dividers; card halo 3px `rgb(205 205 205/.12)` | 0.076 | ring+drop 11, fill 3 |
| Gallery uniops-02 (light) | `#eaeaea` cell dividers, `#e8e8e8` band divider, `#f1f1f1` list rows on `#f7f7f7` | 0.057; 0.066; 0.026 | single-colour page, border-only cards |
| X 170 / 001 / 151 (light) | `#eeeeee` header line, `#f2f2f2` vertical cell dividers, `#ededed`-ish card rings | 0.072; 0.055 | ring cards on white or `#fafafa` |

### 3.4 Nesting (container -> child)

| Container | Padding | Child | Child inset | Radii outer -> inner |
|---|---|---|---|---|
| Kanban card | 16 | footer strip (border-top `#e7e7e9`) | 0 (flush) | 16 -> 0 |
| Kanban card footer | 16 | 30px chips | 16 / 17 | 0 -> pill |
| Kanban column | 16 | cards | 16 left/right, 14 between | 0 -> 16 |
| Workflow top-posts card | 20 | header band | 0 (flush, 68 tall) | 16 -> 0 |
| same | 20 | inner list | 20 | 16 -> 14 |
| Workflow stat card | 19/20/18 | 40px badge | 19 top, 20 left | 16 -> 11 |
| Workflow node | 5/5/7 | body | 6 incl. 1px border | 12 -> 10 |
| Segmented track (dark) | 1 | tab buttons | 1, gap 2 | 9 -> 2 |
| Segmented track (light) | 0 | white indicator + ring | 0 | 10 -> 10 |
| CRM sidebar section | 12 | nav row | 12 | 0 -> 8 |
| CRM nav row | 8 | count chip | 8 right | 8 -> pill |
| CRM popover / menu | 6 / 4 | rows | 6 / 4 | 12 -> 8 / 8 -> 6 |

### 3.5 Light and dark tokens (summary; full list in JSON)

| Role | Light | Dark flat | Dark tactile |
|---|---|---|---|
| Page | `#ffffff` (alt `#fafafa`) | `#161616` | `#0c0c0f` page, `#111114` app |
| Sidebar | `#fafafa` (warm `#f0efeb`) | `#171717` | rail on page colour |
| Card | `#ffffff` | `#1b1d20` | `#141417` |
| Card header band | `#fafafa` | n/a | `#18181c` |
| Table head | `#f7f7f7` / `#fcfcfc` | transparent | `#16161a` |
| Muted fill | `#f0f0f0` | `#2a2a2a` | `#121215` track |
| Border (structure) | `#ededed` | `#232323` | `rgb(0 0 0/.12-.4)` ring |
| Border (object) | `#e7e7e9` | `#393939` | 1px `#000` + 4% inner |
| Text | `#121212` / `#757575` / `#a1a1a1` | `#f9fbff` / `#a4a4a4` / `#7f7f7f` / `#676767` | white / 60% / 50% / 30% |
| Primary | ink `#121212` | `#4124fb` | `#5016ff` |
| Selected row | `#f1effc` | `#1b1d20` | one step lighter |
| Status | success `#47ba39` (`#25ad61`), warning `#ff6e00`, danger `#ef1111` | `#22c55e` / `#fbbf24` / `#f97373` | `#1fc16b` / `#f05959` |
| Series | `#328ff9`, `#f49515`, `#2db374`, `#5954fe` | trend `#00b562` / `#395e4d` | `#4961fc -> #7649fc -> #bd49fc -> #12a8ff` |

Navy variant (Copecart, TxtCart dark): page `#0e121b`, borders `#20232c`, strong `#343844` [P].

### 3.6 Type tuples

14/14/400 (body), 14/130%/500/-0.02em (light Linear-style body), 14/14/500 (nav), 12/12/400 (chrome), 12/12/500 (buttons), 12 uppercase +1px (eyebrows) or 12 mono -0.03em (light group labels), 16/16/600 (card/dialog titles), 24/32/600 (overview title), 14/24 at 60% (overview sub), 28/28/600/-0.03em tabular (KPI), 40/48/500 Inter Display (KPI tactile), 12/600 (delta pill), 12 at 30% (axis), 14/550 + 11 at 50% (tooltip). Display tracking ladder: 16 -> 0%, 36 -> -3%, 100+ -> -5 to -6%.

### 3.7 Icons

One outline set (repos: Untitled UI exports via SVGR; founder default: Lucide). 12 (inside 30px text buttons), 14 (nav, cells, icon buttons), 16 (close, checkbox), 18-20 (tactile UI only), 22 (glyph in a 40px stat badge). Stroke 1.4 @14, 1.167 @14 (kanban), 1.5 @16-18. Colour tiles 16/20/24/28/40 with white filled glyphs, radius 25-28%.

### 3.8 Motion

Hover 150ms `(.25,1,.5,1)`; chevron 200; popover 200/150 scale .97; dialog 250/200 scale .95; sheet 350/250; collapse 200-300 `(.7,0,0,1)` on width or grid-rows; layout spring 0.3s bounce 0; chart draw 900, area 400; stat glow 600; label colour 400; press: none in flat tools, scale .98 only on tactile/brand pills.

## 4. The 8 dashboard layouts he repeats

Counts are images showing the layout across the gallery (G) and X (X), from my classification pass (approximate for X, where one post can hold several layouts). Numbers are 1440-wide CSS px: [M] where a repo implements the layout, otherwise [E].

**L1. Analytics overview** (G 11, X 24; the most repeated). Gallery: copecart-01/04/05, txtcart-00, uniops-02, zeroleaks-01, listkit-09, agent-arcade-02/17, defendlab-02, clokora-01. X: 151, 170, 101, 119, 102, 108, 110, 113, 126, 127, 133, 142, 157, 158, 159, 163, 096, 089, 052 (4 boards), 014, 060-2, 069, 198-3, 209.
```
+--------+---------------------------------------------------------------+
| WS 57  | Title 24/600 · subline 14 60%                    [Share][+ New]| 32 top pad
|--------|  [Range Last 30d v][compared to Prev v][Daily v]   [Refresh]  | 30 controls, 18 gap
| nav 30 |  +-----------+-----------+-----------+-----------+            | 40 to content
| x 8-12 |  | (i) Label | (i) Label | (i) Label | (i) Label |  KPI strip  | 118-140 tall, 1 card
|        |  | 28 value  | 28 value  | 16/50     | 3 to rev. |  hairlines  | cells p16
|--------|  | ▲ +8% vs  | ▼ -2% vs  | +24 avail |           |             |
| EYEBROW|  +-----------+-----------+-----------+-----------+            | 16-20 gap
| nav    |  +-------------------------------+ +-----------------+         |
|        |  | [■] Chart title   [Weekly v]  | | List · qualifier|         | chart min-h ~400
|        |  | $2,746.00 ▲10.6%              | | row 44-48  ·meta|         | 2/3 + 1/3
|        |  | dashed grid, 2 series, band    | | row        chip |         |
|--------|  +-------------------------------+ +-----------------+         |
| plan   |  +----------------------------------------------------+       |
| user   |  | Table header 38 | rows 42 ...                        |       |
+--------+---------------------------------------------------------------+
```
Numbers: container max 1200 (32 padding); KPI cell padding 16; chart card header band 68 or a 16/600 title row; chart/list split 2:1 (X 151: 920/590 of 1550 [E]; workflow 1:1 [M]); card gap 16-20. Variant **L1b three-column** (X 170, 159; G clokora-01): main column + a 300-360px right rail (worklist, calendar strip, AI panel) with its own header tile.

**L2. Object table page** (G 8, X 7). G: listkit-01/06, sf-tensor-01, uniops-05, agent-arcade-14, clokora-03, ecom-jobs-08/13. X: 001-0, 025-0, 082 (sales-crm), 090, 137, 052-1, 048-0.
```
+--------+---------------------------------------------------------------+
| side   | Title 16/500 [status pill 20]          [search][bell][avatar] | 58
| 254    |---------------------------------------------------------------|
|        | Tab (count)  Tab  Tab                                          | 45
|        |---------------------------------------------------------------|
|        | [Label|Value v][Label|Value v][Sort v]      [Export][+ New]   | 62
|        |---------------------------------------------------------------|
|        | [ ] Name      Tag      Owner   $ Value  Meter     Date    ...  | 38 header
|        | [ ] row 42 + 1px divider (whole row clickable -> sheet)        | 43 pitch
|        | ...                                                            |
|        |---------------------------------------------------------------|
|        | 18 in view | + Sum | + Avg | + Add calculation                 | 39 footer
+--------+---------------------------------------------------------------+
         (bulk select -> floating bar bottom-centre: "4 rows selected · Delete · Change status · Download")
```
[M] CRM: first data row at y=205; rows 43 pitch; footer 39. Bulk bar from listkit-06 [G].

**L3. List + inline detail panel** (G 4, X 6). G: clokora-06, sf-tensor-04, ecom-jobs-04, plunio-06. X: 001-2, 025-2, 013-2, 048, 099, 152.
```
+--------+--------------------------------------+------------------------+
| side   | Breadcrumb / Title                   | Panel title         x  | 56
|        | [Open to: Workspace v] [search]      |------------------------|
|        | T First | T Last | @ Email | # Co.   | (LF) Name 16/500       |
|        | row (selected #f1effc) [↗ on hover]  |      link@domain       |
|        | row                                  | T Label      Value     | 32-34 rows
|        | row                                  | @ Label      Value     | label col ~35%
|        | + Add person                         | ! Next date  Oct 10·Overdue
|        |                                      | Notes [textarea]       |
|        |                                      |------------------------|
|        |                                      | Added Oct 9  Delete    | 62
+--------+--------------------------------------+------------------------+
```
Panel 360-420 [E] inline with a 1px left hairline (not an overlay); overlay sheets 480/560 [M] when the list must stay full width.

**L4. Three-pane inbox / chat** (G 3, X 9). G: listkit-02, copecart-10, lemon-06. X: 045, 053, 100, 115, 118, 122, 135, 171, 059.
```
+------+----------------+------------------------------+--------------+
| side | Inbox (filters)| Thread header   [Close][...] | Details      |
|      | [search]       |------------------------------| key/value    |
|      | item 64-72     | message bubble / mail block  | tags         |
|      |  name · time   | ...                          | links        |
|      |  2-line preview|------------------------------|              |
|      |  chip          | composer (r12, toolbar, send)|              |
+------+----------------+------------------------------+--------------+
```
List column ~300-340, details rail ~280-320 [E]; unread = 6px dot + 2% fill, never bold rows [M CRM notifications].

**L5. Workspace home / greeting** (G 6, X 5). G: clokora-01, lemon-00, plunio-02, txtcart-00, copecart-06, runinfra-01. X: 013-0, 096, 106, 143, 197.
```
+--------+---------------------------------------------------------------+
| side   | Good morning, Ersad 24/600   Wednesday 7 October · 2 tasks due|
|        | [live bar: task name ........ 00:23  $30.73  [Stop]]  (dark ink)|
|        | My tasks                                                        |
|        |  v Today (2)    + Add a task...                                 |
|        |    o task row                       chip · project · Today      |
|        |  > This week (3)   > Later (4)                                  |
|        | Recently visited  [card][card][card][card]                      |
|        | Recent mentions   row · row                                     |
+--------+---------------------------------------------------------------+
```
Content column 640-760 centred or left at 32 [E]; or an empty-state composer centred ("What do you want to create?", runinfra-01, listkit-07).

**L6. Builder canvas + inspector** (G 2, X 8). G: txtcart-16, listkit-03. X: 027, 044, 060-0, 094, 116, 172, 202-1, 205.
```
+------+--------------+--------------------------------+-----------------+
| side | Steps palette| dot-grid canvas                | Inspector 320   |
|      | ACTIONS      |   [Trigger node]               | Title           |
|      |  item 36     |        |                       | field 36        |
|      | LISTENERS    |   [Decision] -- Default / Else | field           |
|      | RULES        |      |            |            | + Add filter    |
|      |              |   [Action]   [Action]          |-----------------|
|      |              |            [- 80% +]           | Delete     Save |
+------+--------------+--------------------------------+-----------------+
```
[M] workflow: node 400 wide r12, header 36, actions panel 320 at 16/16 inset, zoom controls 32 squares, edges 2px with 8px rounded elbows.

**L7. Settings** (G 6, X 2). G: clokora-04, uniops-03, zeroleaks-08, txtcart-20, txtcart-06, listkit-04. X: 194, 022.
```
+--------+--------------+-----------------------------------------------+
| side   | Settings     | Section title 14/600                          |
|        | Make it yours| Description 12-14 muted                       |
|        | o Profile    | +-------------------------------------------+ |
|        | o Work prefs | | [tile] Row title      CONNECTED   [Action]| | row 56-64
|        | o Payments > | |        desc 12 muted                      | |
|        | o Notif.     | |-------------------------------------------| |
|        | o Security   | | [tile] Row title                  [toggle]| |
|        |              | +-------------------------------------------+ |
|        |              |             [Discard] [Save changes]          |
+--------+--------------+-----------------------------------------------+
```
Sub-nav 180-220 [E]; content column max ~720; rows grouped in one bordered card with hairline dividers; Save/Discard in the page header (uniops-03) or bottom right (X 194); destructive action alone at the bottom left in danger.

**L8. Card grid browse** (G 8, X 3). G: zeroleaks-12, plunio-02, copecart-09, ecom-jobs-03, listkit-08, txtcart-19, uniops-01, zeroleaks-04. X: 107, 120, 056.
```
+--------+---------------------------------------------------------------+
| side   | Title · desc                                     [+ New]      |
|        | KPI strip (optional, 4 cells)                                  |
|        | [search........] [All status v] [Sort v]         [grid|list]  |
|        | +-----------+ +-----------+ +-----------+                      |
|        | | tile  name| | tile  name| |           |  3 cols, gap 16-20   |
|        | | status ·  | |           | |           |  card r12-16 p16     |
|        | | 3 stat cells (hairline)   |           |                      |
|        | | tags   Scan now ↗          |           |                      |
|        | +-----------+ +-----------+ +-----------+                      |
+--------+---------------------------------------------------------------+
```
Cards repeat the KPI-strip grammar in miniature (3 stat cells with hairlines, zeroleaks-12) and end with one ghost action.

## 5. The 20 micro-details that make his screens look premium

1. KPI strips as one card with hairline cell dividers (KS-07).
2. Units, `$` and secondary parts muted at the value's own size: `16/50`, `42 hour 18 minutes` (uniops-02).
3. Meta joined by middle dots: `9 users · 9h 47m · 18%` (uniops-02, X 151).
4. `View all ↗` with the north-east arrow for "go to the full list" (uniops-02).
5. Column headers with a leading type icon (T for text, envelope for email, calendar for dates) like Attio (X 001, 025).
6. Bars with a solid cap over a tint body; one solid "now" bucket over a tinted column band (X 101).
7. Ghost bars for zero buckets so the axis has no holes (X 170).
8. Labelled dashed average lines in the series colour (X 101).
9. Two tooltips for a two-year comparison, top and bottom of the highlighted band (X 119).
10. A 5-bar mini spark inside each KPI cell, latest bar solid (X 151).
11. Status as an 8px square or dot + word (`Failed`, `Success`, `Pending`) instead of filled chips (X 151).
12. Priority chips with a signal-bars glyph in tinted pills (`Urgent` `#fff0ec`, `Medium`, `Low` `#eaf5f1`) (X 170).
13. Overdue as danger text with an alert-circle: `Oct 10 · Overdue` (X 001).
14. Tinted-initial avatars: pale hue background with the same hue's dark letters (`LF` green, `EB` teal) (X 001).
15. Selected row tinted lavender `#f1effc` with an expand button appearing in the first cell (X 001-2).
16. Card header band flush to the card edge, one step off the body colour (X 119, workflow `#18181c`).
17. Segmented setup progress `▬ ▬ ▭ ▭ 2/4` and a checklist strip of hairline cells (uniops-02).
18. A live element on the overview: the dark timer bar `00:23 / $30.73 [Stop]` (clokora-01), a `Test mode` toggle in the filter row (X 151).
19. Error toast as a red pill bottom-centre with an inline `Retry` chip (X 001-0).
20. Square technical cards with corner tick marks and mono numerals for a dev/infra brand (X 151 Trackify), a deliberate one-off identity move on an otherwise standard grid.

## 6. Gallery classification (all 285 originals) and X study

### 6.1 Gallery
`gallery-classification.tsv` lists every file. Totals: brand 77, landing 42, bento 41, dashboard 28, landing-hero 26, onboarding 17, mobile 12, table 10, settings 7, detail 7, form 6, modal 5, empty-state 5, canvas 2. Product UI (dashboard + table + settings + detail + form + modal + empty + canvas + onboarding + mobile) = 99 images across 15 products; product-heavy cases: ecom-jobs 11, listkit 9, copecart 9, zeroleaks 8, txtcart 8, lemon 8, agent-arcade 7, clokora 6, uniops 5, plunio 5, sf-tensor 4. (The 63 `sheet-*` files are contact sheets of the same images.)

Product-UI images read in detail and what each teaches:
- **uniops-02** (light admin): browser chrome frame, grey `#f7f7f7` monochrome page, 4-cell KPI strip with icon + title + sub-label + value + muted unit, two wide time cells, setup checklist with segmented progress, three list cards with inset dividers and `View all ↗`, chips `Urgent`/`Medium`. The best single light reference.
- **uniops-03 / 05** (dark settings, light team table): settings rows with icon tile + label + description + select right, open dropdown; members table with tinted-initial avatars, role select pills, tool logo, status dot `Online/Offline/Away`, pending invites section.
- **zeroleaks-01 / 10 / 11 / 12** (black security): 4-cell KPI strip with icon top-left and delta chip top-right, score ring 65% with bar breakdown, attack timeline with severity chips, recent-activity table (status dot, model logo, mini bar, date, ↗); report with ring + severity legend + radar; new-scan code editor + option cards; agent cards grid.
- **copecart-01 / 04 / 05** (navy dark + light pair): icon rail + sidebar, filter pills incl. `compared to Previous period`, big revenue line card + side report list, three key-metric cards each with its own chart type (line, two-colour bars, step), channel cards with area charts.
- **clokora-00 / 01 / 03 / 04 / 06** (light time tracker, top nav): projects grid with LOGGED/UNBILLED labels, overview with greeting + live timer bar + 4 KPI cards + black bar chart + recent/pending lists, tracker with day-grouped rows and day subtotals, settings with bordered row cards, invoice detail with summary rail.
- **txtcart-00 / 09 / 16 / 19 / 20** (light + navy SMS): 5 KPI cells with delta pills, three mini-table cards, quick actions, leaderboard; milestones badges; flow builder; marketplace; settings with phone-number table and world map.
- **listkit-01 / 02 / 03 / 06 / 09** (light outreach): grouped sidebar with kbd search and count badges, People table with hover card, inbox 3-pane, workflow builder, bulk-action bar, 8-KPI analytics + multi-line chart + recent replies.
- **agent-arcade-02 / 05 / 14 / 17** (dark + light fintech): portfolio value + delta chip + range tabs + multi-line chart + positions table; leaderboard cards with sparklines and meter bars.
- **sf-tensor-01..04** (navy-gradient sidebar + white content): runs table with two chips, new-run form with left-accent sections, run log console + key-value rail.
- **ecom-jobs-01 / 04 / 07 / 08 / 13** (dark + light hiring): post-a-job builder rows, company-intel detail with sparkline and 4 hairline stat cells, filter rail variants (facets, counts, include/exclude), applicant cards with AI insight boxes.
- **plunio-02..06** (light video): library grid, delete confirm (red icon tile, red primary), empty state with illustration, upload dropzone, video detail with right form panel.
- **lemon-00 / 02 / 06**, **runinfra-01**, **sideshift-01 / 05**, **defendlab-02**, **43-05 / 06**: AI assistant home and chat, desktop onboarding with option cards, composer-first empty home, gamified hub, security repo tree with severity cards, investor application steps.

### 6.2 X (@marcelkargul, 223 posts, 22 Sep - 12 Oct 2026)
- **Mix.** 123 top-level posts, 100 self-replies (84 of them are the images of one thread: "a thread of our recent product design work (315 shots)", 3 Oct, 45.8k views, 716 bookmarks), 91 top-level posts with media (133 items: 114 photos, 19 videos; 217 media items in all with the thread). He posts 5-6+ times a day by his own statement (post 2107783570798600415).
- **What he posts.** Product UI shots (dashboards, CRMs, workflow editors, AI chat, mobile banking, settings, onboarding) are the largest group; then studio/brand work (isometric illustration sets, brand assets, pitch decks), then growth/business takes (pricing, outreach, agency economics), resource lists, and personal setup posts.
- **What earns bookmarks** (top 10 by bookmarks): open-sourced repos (sales-crm 611k views / 8,585 bookmarks; workflow-editor 2,004; kanban 1,001), a list of design resource sites (1,703), the free dashboards Figma file (1,107), a "how we designed this dashboard in under 1 hour" video (852), the 315-shot thread (716), the brand-system video (577). Give-aways and process beat polish alone.
- **Captions.** Median 57 characters; 84% start lowercase; 53% carry an emoji (😏 😁 🤩 😍 🫠 😶‍🌫️); 19% carry a link (usually moved into a self-reply `https://kargul.studio`); media posts median 9 words; patterns: `<thing> UI <emoji>` ("workflow editor UI 🫠", "calendar mobile UI 😶‍🌫️"), superlative bait ("most apps will never reach this level of design 😍", "no one else designs products this damn clean"), before/after ("minimalism is king 👑").
- **Presentation.** Product shots exported 2048-4096 wide on flat neutral canvases (`#5e5e5e` behind light UI in X 151/096, white in 101/119/170, `#e5e5e5` in 001), window cropped off one edge, sets of 2-4 equal crops; mobile in 3-up rows.
- **Type stance.** "After using 100s of different fonts, I realized nothing beats Inter and Geist" (46k views) plus the tracking ladder in KS-25.

## 7. Dos and Don'ts

- **Do** one KPI card with hairline cells (uniops-02). **Don't** four floating shadowed KPI cards with icons in circles and a gradient.
- **Do** a comparison in every chart (X 119, 101). **Don't** a lone blue area chart with a static tooltip (the engine's Acquisity v2 failure, kargul-source-study 4.1).
- **Do** borders at 5-8% ink for structure and rings for objects. **Don't** `#d4d4d4`-class borders (~18-20% ink) on every card plus a drop shadow plus a fill step.
- **Do** flush header bands and inset content at the card padding. **Don't** pad the header band inside the card so it floats as a second card.
- **Do** one-rung inner radii (16 -> 14). **Don't** equal radii on frame and child, or radii off the ladder (7, 9, 11) except the stat badge rule.
- **Do** tinted-initial avatars and logo tiles at 25%. **Don't** grey initials circles in every row.
- **Do** `View all ↗` and middle-dot meta. **Don't** "See more" buttons in every card.
- **Don't** copy his weak spots: `#676767` 12px captions (3.2:1) and `#454545` eyebrows (1.9:1) in the CRM, 30% white axis labels; lift small text to 4.5:1.

## 8. Exceptions and judgement calls

- **Mono numerals** are a brand move in his light analytics shots (X 151, 170), not in his repos (Geist/Inter tabular). Use mono when the product is technical/financial; otherwise tabular proportional.
- **Square cards with corner ticks** (X 151) break the r16 ladder on purpose for a developer brand; one identity move per product, recorded as an override.
- **Card vs strip:** use separate KPI cards (kanban tiles, workflow stat cards) when each card carries its own micro-chart or hover glow; otherwise the strip.
- **Founder ladder vs Kargul:** in-app work follows these ladders; hero product shots keep the founder-approved soft ladder (Kestrel 8/12/16/22) and the founder's hero density rule (<= 3 regions, text >= 12.5px).
- **X estimates** [E] come from crops exported at 1.4-2.2x; when a value matters, prefer the [M] repo value; where only [E] exists (KPI strip height, panel widths), treat it as a range.
- [engine note] The workflow tactile dark style breaks the "<= 4 shadows" habit by design (18 named recipes); keep the recipes named and reused.

## 9. Figures worth keeping

`knowledge/benchmarks/kargul-x/`: `kx-151-0` (light analytics overview, banded KPI cells with mini sparks, line+bars, map list, transactions), `kx-170-0` (KPI strip, stacked bars, breakdown bar, worklist rail), `kx-101-0` (capped bars, labelled averages, active-nav tint + edge bar), `kx-119-0` (banded KPI cards, dual-tooltip comparison band), `kx-001-0/2/3` (light CRM list, inline detail panel, error toast), `kx-025-0/2` (Attio-like companies table and detail), `kx-048-0/1/3` (projects list, light command palette, invite dialog), `kx-052-0..3` (four dashboards from the free Figma file), `kx-096-0` (tactile dark overview), `kx-108-0`, `kx-110-0`, `kx-113-0`, `kx-126-0`, `kx-127-0`, `kx-133-0`, `kx-142-0`, `kx-157-0`, `kx-159-0`, `kx-209-0` (more overviews), `kx-092-0` (calendar), `kx-089-0` (dark analytics + config rail), `kx-090-0` (dark team table), `kx-099-0` (report builder), `kx-102-0` (grouped bars), `kx-194-0` (settings), `kx-036-0` (dark actions menu detail), `kx-013-0/2` (home + task detail), `kx-014-0` (sales dashboard), `kx-060-1/2`, `kx-008-0` (Geist tracking demo). Gallery: `uniops-02`, `uniops-03`, `uniops-05`, `zeroleaks-01/10/12`, `copecart-01/04/05`, `clokora-01/03/04/06`, `txtcart-00/16/20`, `listkit-01/06/09`, `agent-arcade-02/14`, `plunio-02..06`. Repos: `knowledge/benchmarks/kargul-src/wf-08-overview.png`, `kb-13-overview.png`, `crm-01-companies.png`.

## 10. Open questions

- X images are presentation crops at unknown zoom; all [E] numbers assume a 14px label. A Figma inspection of his free dashboards file (link in post 2107524099018764393) would replace them with exact values; it needs a Figma login, which was not attempted.
- fxtwitter paging was stopped at 25 pages (223 posts, back to 22 Sep 2026); older posts were not read.
- No repo implements L1 in light mode with a large chart (kanban overview has tiles and distribution bars only); the light chart grammar (KS-10..14) rests on images.
- The authorship caveat stands: posts say "we design"; the bar is the studio's output.
