---
source: web:https://github.com/gr8rstudio/gr8r-studio (read from corpus/tanjim-src/gr8r-studio, no LICENSE) + web:https://x.com/Tanjim38 (347 own posts, 4 Jul to 21 Oct 2026) + live demos gr8r-taskmanagement.vercel.app, gr8r-studio.vercel.app, flights-gr8r.vercel.app (Contrail), aether-planetary-ops.vercel.app (Aether), orbit-agent-workspace.vercel.app (Aurora), knowspace.si, getgradients.com, gr8r-sticker-studio.vercel.app, savari.io, gr8rstudio.com (all captured 2026-10-22; tint-storefront-download.vercel.app returns a Vercel 404)
chapter: Tanjim (@Tanjim38, gr8r studio): the product-UI system read from source, run locally, measured live, and how his X posts are framed
pages: n/a (measured 2026-10-22)
topic_tags: [product-ui, app-shell, sidebar, table, kanban, calendar, timeline, density, tokens, dark-mode, motion, micro-details, empty-states, onboarding, x-posts, showcase, tanjim, gr8r]
status: studied
evidence: knowledge/benchmarks/tanjim-x/ (app/ 80 captures light+dark 1440x900@2x + computed.json; live/<slug>/ fold-2x, full-1x, frames 0/400/1200ms, dom.json; img-classification.tsv; sheets/01-06; vid-frames/)
tokens: system/product-ui/gr8r-tokens.json (every value with file:line)
---

# Tanjim / gr8r studio: the measured study

> **Credits and licence.** Tanjim Islam (@Tanjim38) and gr8r studio own all of this. The gr8r-studio repo has **no LICENSE**, so it is all-rights-reserved: we read and measure it and we write our own code. Nothing here (code, copy, the Gr8r logo, sample names, screenshots) goes into a deliverable. Captures in `knowledge/benchmarks/tanjim-x/` are kept for measurement only.

Source paths below are relative to `corpus/tanjim-src/gr8r-studio/src/`. `[L]` = live DOM measurement (`live/<slug>/dom.json`), `[A]` = our local run (`app/computed.json`), `post:<id>` = an X post in `posts.json`.

## 0. What he is, in one paragraph

Tanjim designs and builds dense, data-heavy SaaS product UI: task management, CRM, workflow builders, agent workspaces, fintech mobile. His craft is **calm density**: 13.5px body text, 30px controls, 40px rows, warm greys, one accent, one ring per box, and motion that is spent only on state changes. He ships it as real, running code, built with AI ("Claude Opus 5.5 + Senior Product Design Engineer", post:2112964568616169890), and posts it as product walkthroughs. His open-source app is plain Vite, vanilla JS and hand-written CSS, with no UI kit. The polish is in the tokens and in the hundred small states, not in a component library.

## 1. The measured system (gr8r-studio)

Full table with sources: `system/product-ui/gr8r-tokens.json`. These are the values that matter.

| Axis | Value | Source |
|---|---|---|
| Neutrals, light | bg `#fbfaf8`, side `#f4f3f0`, surface `#fff`, s2 `#f6f5f2` (hover), s3 `#eeede9` (pressed), sunken `#f7f6f3`; warm hue ~45° throughout | styles/tokens.css:7-12 |
| Lines, light | border `#e9e7e2`, strong `#dad7d0` (inputs, secondary buttons), divider `#f0eeea` (rows inside a box) | tokens.css:15-17 |
| Text, light | `#1d1c1a` / `#57544e` / `#6b6760` / `#8c8880` (the 4th step is for resting icons only) | tokens.css:19-22 |
| Neutrals, dark | bg `#1a1a19`, side `#151514`, surface `#1d1d1c`, s2 `#252524`, s3 `#2d2d2b`, sunken `#181817`, border `#2c2b29`, strong `#3a3936`, text `#eceae5` / `#b5b2ab` / `#9a968f` / `#6f6c66` | tokens.css:141-156 |
| Accent | indigo `#4b5bd6` light / `#8e9af3` dark, on-accent `#fff` / `#12131c`; soft 10%, line 38% color-mix; 6 swappable accent pairs | tokens.css:25-30, 181-200 |
| Semantics | each hue redefined for dark (green `#25754b` -> `#5cba86`, red `#b23c30` -> `#e57d70`, amber `#8f5e0e` -> `#d8a443`); soft tints 10-12% | tokens.css:32-43, 159-167 |
| Shadows, light | sm `0 1px 2px rgba(28,25,20,.05)`; card `0 1px 2px …04 + 0 0 0 1px border`; pop `0 12px 32px -8px …16, 0 2px 6px -2px …06, ring`; drag `0 16px 36px -10px …28, ring strong` | tokens.css:51-54 |
| Shadows, dark | card = ring only; pop `0 16px 40px -10px rgba(0,0,0,.6) + ring strong` | tokens.css:174-177 |
| Radius | 4 / 6 / 8 / 10 / 12 + full; controls 6, cards 8, containers 10, overlays 12, chips 5 | tokens.css:56-60; overlays.css:27 |
| Spacing | 4pt scale declared (4..48); real insets 14 (panels), 8 (menus/rows), gutter 24 (16 mobile) | tokens.css:62-70, 93 |
| Type | Geist 400/450/500/600 + Geist Mono 400; body 13.5/1.45; scale 11 / 12 / 12.5 / 13.5 / 14.5 / 16 / 19 / 23; `ss01`,`cv11` | tokens.css:72-81; base.css:17-22 |
| Type roles | page h1 23/600/-0.022em/1.2 balance; project h1 19/600/-0.018em; KPI 22/600/-0.02em tabular; panel title 13.5/600; buttons and tabs 12.5/500; meta 12; eyebrow 11/600/+0.06em upper | shell.css:386-393; panels.css:57-63 |
| Icons | Lucide, **stroke 1.8**, 16 in nav, 14 in buttons, 12 in meta; resting text-4, hover text-2 | core/icons.js:11; shell.css:150-156 |
| Control heights | 22 / 26 / 30 / 36 (xs / sm / md / lg); button 30h pad 0 11; input 30h pad 0 10; tab 36; badge 20; seg button 24 in a 28 track | tokens.css:83-86; components.css |
| Density | row 40 (34 compact); sidebar row 30 (26); list head 32; table th 34 / td 36; timeline row 36; menu item 30; palette item 38; calendar cell min 112 | tokens.css:88-90, 201-207 |
| Layout | sidebar 252 (52 collapsed); topbar 46; page max 1160; drawer 620; modal 560 at 10vh; palette 640 at 12vh; popover 200-320 pad 4; board column 284 | tokens.css:87-91; overlays.css |
| Motion | dur 140ms; ease `cubic-bezier(.23,1,.32,1)`; spring `(.34,1.56,.64,1)`; drawer `(.32,.72,0,1)`; route riseIn 8px .36s stagger 35ms; modal .26s; popover .16s; drawer .34s; KPI count-up 520ms | tokens.css:94-97; motion.css; shell/render.js:207-226 |

Rendered check [A]: h1 23px / 600 / -0.506px; primary button 99.6x30 `rgb(75,91,214)` r6; active sidebar row 235x30 white + `0 1px 2px rgba(0,0,0,.05), 0 0 0 1px #e9e7e2`, dark `#2d2d2b` with no ring; kcard r8 266x95; seg track 28h `#eeede9`. The Vercel deployments match the local run byte for byte in fonts, radii and shadows [L gr8r-taskmanagement, gr8r-studio-demo].

### 1b. The showcase apps use different systems, built by the same rules

| App | Ground and text | Type | Shapes and edges | Motion | Framework [L] |
|---|---|---|---|---|---|
| Contrail (flights, dark) | lab 6 page, lab 9 cards, lab 95 text | h1 Geist 52/500/-0.03em; UI Inter 14/400-500, 22/500 section | cards **34px** radius with 1px lab-17 border; pills 9999; segmented 14 | hover is colour only, .16s `(.22,1,.36,1)`; skeletons hold layout at 400ms | Next.js |
| Aether (Mars ops, dark over a 3D scene) | ink `#f8f6f2` at 97/85/72/55/18% alpha, a `--line` of 10% white | Inter Variable 10-15px, tracked uppercase labels (10/500), 12.5 values | glass panels r16: `linear-gradient(180deg,#1e1c1ac2,#11100fb8)`, `blur(28px) saturate(140%) brightness(.82)`, edge `inset 0 1px 0 #ffffff1f, inset 0 0 0 1px #ffffff14`, lift `0 24px 48px -24px #0009` | boot console, then the scene resolves from a blur; hover `rgba(255,255,255,.09)` .25s | React + Vite, 2 canvases |
| Aurora (agents, dark) | bg `#050505`, panel `#0a0a0b`, raised `#0f1011`; fg `#ededef`/`#a0a0a8`/`#6d6d76`/`#46464d`; lines at 6/9.5/15% white | Geist 13 / 12.5 / 11.5, Geist Mono for ids and times | radius 6 controls, 8-10 panels, avatars round | hover `rgba(255,255,255,.035)` .12s, press .065; ease `(.2,.8,.2,1)` | React (no Next) |
| Knowspace (light, editorial) | canvas `#f8f8f6`, ink `#141413` ladder, line = ink 10% / 16% at **0.5px** | Newsreader Variable 60/360/-0.035em display + Geist UI | shadow `0 0 0 .5px ink/.1, 0 1px 2px, 0 6px 16px, 0 18px 40px` (4 warm layers) | logo-mark preloader, then objects drift in; CTA hover lightness + lift | React + Vite |
| Get Gradients (dark tool) | `#0b0b0c`, fields `#19191b`, hover `#202023` | Inter Variable 11-12 | radius 5-6 controls; handles `0 0 0 2px #fff, 0 0 0 3px rgba(0,0,0,.35), 0 3px 10px` | hover .15s `(.22,1,.36,1)`; spring `(.34,1.56,.64,1)` | React + Vite + Tailwind |
| Sticker Studio (light, playful) | `#f4f4f4`, ink `#171717`, brand `#00a3ff` | Geist Variable 54/650/-0.045em h1, Mono 11.5 labels | cards r18 `0 0 0 1px rgba(0,0,0,.06), 0 1px 2px .03, 0 10px 30px -18px .14`; primary has an inset top highlight + a brand-tinted drop | stickers pop in one after another | React + Vite |
| gr8rstudio.com, savari.io (marketing) | `#fafafa` / `#fdfdfd` | Funnel Display 64/500 h1 + Geist Mono CTAs (gr8r); Geist 64/600 h1 + Inter (Savari) | pill CTAs with 3-4 layer brand-tinted shadows (gr8r `rgba(239,62,35,.16)…`) | Framer word reveals | Framer |

The constant across all of them: **ink is a ladder of one hue** (warm greys in gr8r, alpha-of-ivory in Aether, cool greys in Aurora); **lines are alpha, not grey hex**; **every hover is a lightness step of roughly 3-9% with no hue change**; **durations are 120-250ms with an expo-out curve**.

## 2. Rules

### Shell and layout
- **RULE TG-01** Build the app shell as a grid: a fixed 252px sidebar, then `minmax(0,1fr)`. Give the sidebar its own tone, one step darker than the page (light `#f4f3f0` vs a white main; dark `#151514` vs `#1d1d1c`). Separate them with a single 1px border-right. Collapse the sidebar to 52px with icon-only rows and right-side tooltips.
  **Why** The tone change alone tells the eye "navigation, not content", so the main area can stay white and quiet. **Applies to** SaaS app UI. **Check** `.side` width 252, bg differs from `.main` by 3-6 L, one border. **Source** shell.css:7-26, 245-270; tokens.css:8-9,87.
- **RULE TG-02** Use one horizontal content edge (`--gutter`, 24px; 16px under 900px) for the breadcrumb, page header, toolbar, list checkbox, first table cell, board and timeline labels. Pull padded wrappers back by their inner inset so the first visible glyph lands on the gutter.
  **Why** One left line through every layer is what makes a dense screen look designed rather than assembled. **Applies to** SaaS app UI. **Check** the left x of the crumb text, h1, toolbar first control, first table cell text and first board column are equal ±1px. **Source** tokens.css:92-93; shell.css:285,299; list.css:267-271; table.css:107-111; projects-files.css:107-111.
- **RULE TG-03** Keep the topbar to 46px with a 1px bottom line, holding: the breadcrumb (12.5px; the current crumb text, 500), a 220x26 search pill on the sunken tone with a ⌘K kbd, a bell with a 7px accent dot ringed 2px in surface, a secondary "New" split button, and the avatar. Nothing else goes there.
  **Why** The topbar is wayfinding plus the three global verbs (search, notify, create). Page actions belong in the page header. **Applies to** SaaS app UI. **Check** topbar height 46 and at most 5 controls. **Source** shell.css:279-346; shell/layout.js:190-201.
- **RULE TG-04** Page header: an h1 at 23/600/-0.022em with `text-wrap: balance`, a 13.5px text-2 subline that includes a real fact (the date, a count), and actions right-aligned (secondary buttons, then one primary). Leave a 20px gap to content and centre content pages at max 1160. Full-bleed views (board, table, timeline) drop the max-width and take the whole main area.
  **Why** A small h1 keeps the data dominant. The fact in the subline makes the page feel alive. **Applies to** SaaS app UI. **Check** h1 font-size 22-24, weight 600, one primary per header. **Source** shell.css:359-405; pages/home.js:40-41.

### Sidebar
- **RULE TG-05** Sidebar rows are 30px high, 8px padding, gap 9, r6, 13.5px at weight 450, with a 16px icon in text-4. Hover fills surface-3. In light mode the selected row is a raised white tab (`0 1px 2px rgba(0,0,0,.05), 0 0 0 1px border`, weight 500). In dark mode the selected row is a flat surface-3 fill with no ring.
  **Why** In light mode a lifted white tile reads as selection without colour. In dark mode a ring would glow, so lightness carries it instead. **Applies to** SaaS app UI. **Check** `.sitem.on` box-shadow present in light and none in dark. **Source** shell.css:110-149.
- **RULE TG-06** Group the sidebar with 11px / 600 / +0.06em uppercase text-3 headers. Hide the group's "+" until the group is hovered. Give each project a coloured 18px r5 icon tile (hue at 16%, glyph at 72% in dark), a 6px status dot that swaps to "…" and a chevron on hover, and nested sub-views on a 1px left rail. Counts are tabular 11px. The unread count is the only filled accent pill.
  **Why** Hierarchy comes from type and indentation, colour is kept for identity (projects) and urgency (unread), and actions appear only when the hand is there. **Applies to** SaaS app UI. **Check** exactly one filled accent element in the sidebar. **Source** shell.css:88-240; tokens.css:128.

### Controls and states
- **RULE TG-07** Size controls on the 22 / 26 / 30 / 36 ladder: 30 is the default for buttons, inputs, selects and icon buttons; 26 for toolbar and topbar chips; 22 for in-row icon buttons; 36 for auth and large forms. Text is 12.5px/500 in 30px buttons and 12px in 26px ones. Every control in the 26-36 band has radius 6.
  **Why** A dense desktop tool earns compactness by being exact: one radius, few heights, and the icon gap fixed at 6. **Applies to** SaaS app UI. **Check** census of control heights ⊂ {20,22,24,26,30,36}; radius 6 for 26-36. **Source** tokens.css:83-86; components.css:4-154, 227-243.
- **RULE TG-08** Use four button variants: primary (accent with an `inset 0 -1px 0 rgba(0,0,0,.12)` bottom bevel, hover = accent mixed 12% toward text), secondary (surface, border-strong, shadow-sm, hover surface-2), ghost (text-2, hover surface-2 plus text), and danger. All press to `scale(.97)`. Disabled is opacity .45 with no shadow. Loading keeps the width and replaces the label with a 14px spinner.
  **Why** Hover darkens toward the text colour, not toward black, so it works in both themes from one formula. The bevel gives the primary a pressed-in tactility without a gradient. **Applies to** all. **Check** `:hover` changes background lightness only; the label width stays constant while loading. **Source** components.css:28-118.
- **RULE TG-09** One state language across the app: hover = one surface step up; pressed or on = two steps; selected row = accent-soft (10%); selected option or card = accent border plus a 3px accent-soft halo; focus-visible = a 2px accent outline at offset 1; form focus = an accent border plus a 3px soft halo; error = a red border plus a 3px red-soft halo, with a 12px icon message; done = text-3 with a line-through.
  **Why** When every component uses the same 6 states, users learn the app once. **Applies to** all. **Check** grep for hover colours outside surface-2/3; every `.on`/`.sel` maps to the list. **Source** components.css:255-275; base.css:69-76; list.css:42-44; auth.css:152-155.
- **RULE TG-10** Segmented controls are a surface-3 track (2px padding, 2px gap, r6) holding 24px r5 buttons at 12px/500. The on segment is a white tile with `0 1px 2px rgba(0,0,0,.08), 0 0 0 1px border`. Use them for view modes and small tab sets inside panels. Use underline tabs (36px, a 2px text-colour bar inset 8px, scaleX entrance .26s) for page-level views.
  **Why** Two tab grammars with two jobs: a segment switches a lens, a tab navigates a page. **Applies to** SaaS app UI. **Check** no underline tabs inside panels; no segments in the page header nav. **Source** components.css:403-493.
- **RULE TG-11** Make status and priority glyphs, not pills. Status is a 14px circle family (dashed ring backlog, ring todo, half-pie in-progress amber, three-quarter pie review violet, filled check done green). Priority is three rising 2.6px bars, and urgent is a red 12px rounded square with "!". Pair each glyph with a label or a tooltip.
  **Why** A glyph carries status at 14px in a row without a coloured block, so a 40-row list stays calm. **Applies to** SaaS app UI. **Check** status cells use svg glyphs; no filled status pills in rows. **Source** ui/helpers.js:21-46; design-system.js:46.
- **RULE TG-12** Labels are 20px chips: a 6px r2 colour square + text-2 on the surface with a 1px border. Tinted badges (green / amber / red / accent at 10-12%) drop the border. Filter chips are 26px accent-soft with an accent-line border and an 18px close button.
  **Why** Colour sits in a 6px swatch instead of the whole chip, so 3 labels on a card never shout. **Applies to** all. **Check** label chip background = surface, the swatch is the only hue. **Source** components.css:496-583.
- **RULE TG-13** Avatars are initials at 40% of size / 600, with the background as the member hue at 17% on the surface and the text as the hue 55% mixed toward text. Each carries a 1.5px surface ring so stacks overlap by -5px cleanly. The presence dot is 30% of the size with a 2px ring. Unassigned is a dashed 1.3px circle.
  **Why** Tinted initials are legible in both themes and need no photos. The ring is what makes an overlapping stack look cut out. **Applies to** all. **Check** `.av` box-shadow `0 0 0 1.5px surface`. **Source** components.css:611-668.

### Data views
- **RULE TG-14** List rows: 40px (34 compact), a CSS grid of columns, a 1px divider line (not a border), hover surface-2, selected accent-soft, a drag handle shown on hover only, a mono 11px task key in text-3, and title hover = an underline in border-strong at offset 3. Group headers are 36px at 12.5/600 with a count in text-3. The inline "Add task" row is 34px text-3.
  **Why** Rows use the lighter divider tone so the column structure, not the lines, organises the page. **Applies to** SaaS app UI. **Check** row min-height 40; separators use `--divider`. **Source** list.css:8-158.
- **RULE TG-15** Tables: sticky 34px headers at 12px/500 text-2, 36px cells with 1px divider right and bottom borders, a sticky first column on the gutter, a 6px column-resize hit area that shows accent-line on hover, inline editing as a 2px accent inset ring, and group rows on sunken at 32px/600.
  **Why** Spreadsheet behaviours (resize, sticky, inline edit) with UI-weight lines. **Applies to** SaaS app UI. **Check** th 34 / td 36; editing cell box-shadow inset 2px accent. **Source** table.css:9-111.
- **RULE TG-16** Kanban: 284px columns on the sunken tone (r10, a 1px divider border, 12px gap) with a 12.5/600 header + status glyph + count, and actions at .55 opacity until hovered. Cards are white r8, edged by `shadow-card` (a ring, not a border), padded 10/12, gap 8: labels, a 13.5/450 title, a subtask progress line, then a meta row (key, priority, due, comments, avatar pushed right). Hover strengthens the ring and lifts the card 1px. Quick actions appear as a floating 22px icon group at top-right.
  **Why** Column tone vs white card gives depth with no shadow. Meta at 12px text-3 keeps the title dominant. **Applies to** SaaS app UI. **Check** card ring via box-shadow; meta font 12; the title is the only 13.5 text. **Source** board.css:4-166; motion.css:252-259.
- **RULE TG-17** Calendar month grid: 7 columns, cells min 112px with divider lines, out-of-month days on sunken, the day number as a 22px circle (accent fill for today), and events as 22px r5 chips (hue 11% fill + 22% border, or dashed for calendar events vs tasks). Show "+N more" at 11px and a "+" button on cell hover.
  **Why** Tinted chips at 11% let 4 events per day stay readable without a rainbow. **Applies to** SaaS app UI. **Check** event chip fill alpha ≤ 15%. **Source** calendar.css:4-119.
- **RULE TG-18** Timeline: a 300px task column (170 on mobile) beside a scrollable grid with a 52px two-row header (month names sticky at left 8, day numbers 11px tabular, today in accent 600), weekends as sunken bands, weekly gridlines, and a 2px accent today line at .7 opacity. Bars are 24px r6, hue 16% fill + 45% border, with progress as a 26% inner fill, the assignee avatar inside the bar, and labels outside when the bar is short. Milestones are 12px rotated squares. Dependencies are curved SVG connectors.
  **Why** Progress-inside-bar and tint-not-fill keep 20 bars legible. Sticky month labels mean the context never scrolls away. **Applies to** SaaS app UI. **Check** bar height 24; today line 2px. **Source** timeline.css:4-229; views/timeline.js:60-162.
- **RULE TG-19** Dashboard home: a greeting h1 with a date fact, then a 4-cell stats strip joined into one bordered box (internal 1px dividers, no gaps), each cell a 12.5px label + icon, a 22/600 tabular value, and a 12px delta in green / red / text-3. Below it, a `1.55fr / 1fr` grid (gap 16) of r10 panels, each with a 13.5/600 title and a ghost or segment action at the right.
  **Why** One joined strip reads as a single instrument, and 4 loose cards would not. The asymmetric grid makes the work list primary. **Applies to** SaaS app UI. **Check** `.stats` one border and r10; grid 1.55:1. **Source** panels.css:29-78; pages/home.js:42-48.
- **RULE TG-20** Charts in panels are minimal: 4px r4 progress bars on surface-3 that grow from 0 over .8s on entry, a 6px stacked bar with 2px gaps, tabular percentages in text-3. In his posts, chart cards are a donut + legend list, or a 2-series line chart with legend chips and a Monthly/Weekly/Daily segment (post:2094007479067701562 and others).
  **Why** Charts in work apps are status, not analytics theatre. **Applies to** SaaS app UI. **Check** no chart without a numeric label; bars ≤ 6px. **Source** components.css:671-709; motion.css:109-115.

### Overlays
- **RULE TG-21** Overlay tiers: popover (r10, 4px padding, 30px r6 items, 200-320 wide, popIn .16s from -4px scale .97, origin top-left), modal (r12, 560 wide at 10vh, header 14/16, footer with a top line, modalIn .26s from 8px scale .97), drawer (620 wide, slides 48px over .34s on `(.32,.72,0,1)` with the body staggered 40ms), command palette (640 at 12vh, 50px input, scope pills, 38px items, a footer of kbd hints on sunken). All share `shadow-pop`.
  **Why** One elevation recipe, three radii and three entrance distances make every layer feel related. **Applies to** SaaS app UI. **Check** each overlay uses shadow-pop; radius 10/12. **Source** overlays.css:13-170, 445-749.
- **RULE TG-22** Drawers are property sheets: a 46px header with crumbs, a mono key and icon actions; a 19/600 editable title; then a 112px key column of 30px rows (icon + label in text-2, value as a 26px pill button that opens a popover); then description, subtasks with a progress bar, attachments and comments. Edit in place everywhere: hover shows surface-2, focus shows a 1px border-strong ring.
  **Why** No edit mode. Each field is its own button, so the drawer reads as a document but behaves as a form. **Applies to** SaaS app UI. **Check** kv rows 30px; values are buttons. **Source** projects-files.css:160-186; overlays.css:153-300; app/drawer-light.png.
- **RULE TG-23** Toasts and the bulk bar are inverted (text colour as background, text-inv as foreground), r8/r10, with `shadow-pop`, a spring entrance and an inline action ("Undo", "Open"). The bulk bar floats 24px above the bottom, centred, with 1px 20%-alpha separators.
  **Why** Inversion is the one place the app is loud, because a toast must be seen once and then go. **Applies to** SaaS app UI. **Check** toast bg = `--text`. **Source** overlays.css:751-812; list.css:168-210.

### Empty, loading, error, onboarding
- **RULE TG-24** Empty states are small and centred: a 22px text-4 line icon (no illustration), a 14.5/600 title, a 12.5px text-2 line at most 340 wide, and one small button (primary to create, secondary to clear). Errors use the same shape with a red glyph and always say what is safe ("Your data is safe."). Permission and 404 states name the owner or the cause.
  **Why** Each one is a calm sentence with a way out, never a mascot. **Applies to** all. **Check** empty-state icon ≤ 24px; one button. **Source** states.css:4-37; pages/design-system.js:149-170.
- **RULE TG-25** Skeletons copy the real layout (the same stats strip, the same 40px rows with varied 38-68% widths, the same card anatomy) and shimmer at 1.3s ease-in-out between surface-3 and surface-2. Routes render instantly. Motion carries the transition, not a fake wait.
  **Why** A skeleton that matches the final geometry prevents layout shift and reads as speed. **Applies to** all. **Check** skeleton rows match the real row height. **Source** shell/skeletons.js:1-31; states.css:39-53; shell/render.js:70-73.
- **RULE TG-26** Auth is a 380px column at 6vh: brand, a centred 23/600 h1, a text-2 sub, SSO buttons, an "or" hairline divider, 36px fields, a password strength bar of 3px segments, and text links in the accent. Onboarding steps are 28x3 progress dashes, 3-up option cards (r10, accent ring + halo when on), slide-in-right .36s, and a finale where checklist rows pop in 120ms apart with spring checks. His posted auth flows add a full-height oil-painting panel beside the form (post:2094328328081584408).
  **Why** The form is the same small system as the app. The delight is in sequencing, not decoration. **Applies to** onboarding. **Check** auth card max-width 380; option `.on` uses the halo. **Source** pages/auth.css:4-195; motion.css:180-229.

### Dark mode
- **RULE TG-27** Redefine dark, never invert: keep the light hue (warm 40-50°) in every dark step (`#151514 … #3a3936`), lighten the accent (`#4b5bd6` -> `#8e9af3`) and flip on-accent to near-black, re-tune each semantic hue brighter, mix identity colours 72% with the text colour, drop drop-shadows on cards (ring only), and replace raised-white selections with surface-3 fills.
  **Why** Inverted light themes go muddy and glow. A redefined palette keeps contrast and hue honest. **Applies to** all. **Check** dark `--shadow-card` has no blur; dark accent L > light accent L; dark surfaces share one hue. **Source** tokens.css:100-179; shell.css:140-149.
- **RULE TG-28** In his dark showcase apps (Aurora, Get Gradients, Aether) the text is a 4-step ladder (Aurora `#ededef / #a0a0a8 / #6d6d76 / #46464d`) and lines are white at 6 / 9.5 / 15%. Hover is white at 3.5% and press at 6.5%, over .12s. Glass is used only when there is a scene behind it (Aether: `blur(28px) saturate(140%) brightness(.82)` + an inset top highlight + an inset 1px ring).
  **Why** Alpha lines and fills adapt to whatever surface they sit on. Blur is earned only by real content behind the panel. **Applies to** dark UI. **Check** `--line` values are rgba; backdrop-filter only over canvas or video. **Source** [L aurora, aether dom.json rootVars].

### Motion and micro-details
- **RULE TG-29** One-shot motion only, gated to the render that caused it. Route content rises 8px over .36s with 35ms stagger capped at the 4th child. Progress bars grow .8s. KPIs count up over 520ms (skipped under 2 and under reduced motion). Full re-renders never replay any of these. Reduced motion collapses everything to a .12s fade.
  **Why** Motion that replays on every state change is noise. Motion tied to one cause reads as response. **Applies to** all. **Check** animations are keyed to fx flags or one-time classes; there is a `prefers-reduced-motion` block. **Source** shell/render.js:79-84,186-226; motion.css:91-118,263-314.
- **RULE TG-30** Celebrate completion physically: the check pops (.55 -> 1.2 -> 1 over .42s spring), the title strike is drawn left to right at 58% height over .38s, the row washes green-soft for 1s, a dropped card lands from scale 1.04 / -1.2° with the drag shadow over .5s spring, and a new item rises in and washes accent-soft over 1.4s.
  **Why** Feedback says "this happened, here" and then disappears. These moments are what gets filmed for X. **Applies to** SaaS app UI. **Check** done, drop and add each have one named keyframe. **Source** motion.css:29-90, 140-179.
- **RULE TG-31** Ship the details nobody will notice (his words, post:2107859500191694895, the 815-like top post): focus and scroll restored across full re-renders; every clickable thing keyboard-reachable with a role; a skip link; native `<select>` kept as the source of truth behind a designed menu; tooltips delayed .35s; key-cap kbd with a 1.5px bottom border; scrollbars 10px with a 3px transparent border; hidden scrollbars where a bar would shift alignment (sidebar, board columns, inbox); `ss01`/`cv11` on; tabular numbers on every count; the caret in the accent; selection at accent 22%.
  **Why** Users feel these as "it just works", and the commented source shows each one was a deliberate fix. **Applies to** all. **Check** walk the list on a build. **Source** shell/render.js:85-124,141-184; base.css:22,41-153; shell.css:77-87; board.css:235-241; panels.css:104-113.
- **RULE TG-32** Write the "why" next to alignment fixes in code (`/* no top border: the toolbar above already draws that line */`, `/* the first crumb starts exactly on the content gutter */`). Never let two adjacent boxes both draw the shared line, and never let a row separator touch a panel edge.
  **Why** One line per edge is the difference between crisp and doubled hairlines. **Applies to** all. **Check** no 2px-looking seams at toolbar/list and panel/row joins. **Source** list.css:4-7; panels.css:84-87; shell.css:299.

### Showcase apps: complex data, calm
- **RULE TG-33** Make complex data calm with the same four moves in every app: (1) one ink hue in 4-5 alpha or lightness steps for all text; (2) colour only for status (Aether: one green for nominal, one amber for warning, used in tiny dots); (3) tracked uppercase 10-11px labels over large tabular values (Aether telemetry `TEMP / -16.2 °C`, unit at half size); (4) group into a few large panels with generous inner padding and thin progress bars (Aether power / propellant / oxygen strip).
  **Why** Hierarchy by type size, case and alpha lets 30 numbers share one screen without fighting. **Applies to** dashboards. **Check** fold hue census: ≤ 2 non-neutral hues, each under 3% of pixels. **Source** [L aether fold-2x, dom.json]; [L contrail]; [L aurora].
- **RULE TG-34** Give each showcase product one signature world object and keep the UI quiet around it: Aether's real-time 3D Mars terrain with floating labels on leader lines; Aurora's orbiting agent faces (a sun "Atlas" with planets); Contrail's 3D cabin seat-picker; Knowspace's ring of photographed objects; Sticker Studio's die-cut stickers inside a Figma-style selection frame with a `1080 × 1080` size tag.
  **Why** One memorable object makes the post stop the scroll, and calm chrome makes the product look shippable. **Applies to** landing, product showcase. **Check** exactly one illustrative or 3D element per fold. **Source** [L live/*/fold-2x.png].
- **RULE TG-35** Use tooling metaphors as decoration only where the product is a tool: a Figma selection box with corner handles and a size pill (Sticker Studio), a canvas with a dotted grid, a zoom percentage and a timeline scrubber (Get Gradients), a monospace status bar with branch, run, motion and token count (Aurora footer).
  **Why** Builder chrome signals "real tool" to a designer and engineer audience. **Applies to** product UI and hero. **Check** visual. **Source** [L sticker-studio, getgradients, aurora].

### How his posts are framed (X)
- **RULE TG-36** Static post images are 4:3 (3200x2400) or 1.4:1 (3360x2400) exports of one full app screen, floating on a pale grey (`~#f3f3f3`) or white canvas with a large soft shadow and generous margin. Multi-screen posts are 2-4 images of the same app, one screen each. Sets of isolated cards (one component centred on white with a soft shadow) are posted as 4-image grids.
  **Why** A single full screen proves a real product, and the canvas margin survives X's crop. **Applies to** X posts. **Check** export 2x+ at 4:3 or 1.4:1; the app fills 75-85% of the width. **Source** post:2074140966265725057, post:2089974617314410586, post:2094007479067701562.
- **RULE TG-37** Videos are of two kinds. Long-form: 40-111s, 1232-1710 wide, live cursor screen recordings of the running DARK app in a browser window over a glossy blue-violet macOS-style wallpaper, posted with a demo link (top 5 posts by likes). Short loops: 6-14s at 4:3 with a camera push-in on one feature (calendar, timeline, workflow canvas), on a light canvas.
  **Why** Long-form proves it is real and built. Short loops sell one interaction. Both show motion, and stills cannot. **Applies to** X posts. **Check** a long-form video has a demo URL in the copy. **Source** post:2107859500191694895, post:2107185019269648886, post:2102666513409036770; vid-frames/index.tsv.

## 3. Numbers and scales

See section 1 and `system/product-ui/gr8r-tokens.json`. Derived ratios worth keeping:
- Body to h1 is 13.5 -> 23 (1.70x). The KPI value 22 sits one step under the h1. A dense app can hold its largest text at 23px.
- Sidebar row 30 : list row 40 : menu item 30 : palette item 38. Rows that hold a single line are 30, rows that hold metadata are 38-40.
- Light hover step is about 1.5 L (`#fff` -> `#f6f5f2`), press about 4.5 L (`#eeede9`). Dark hover is about 3 L (`#1d1d1c` -> `#252524`), press about 6 L.
- Entrance distances: popover 4px, modal and route 8px, toast 14px, drawer 48px. Distance grows with surface size.

## 4. Dos and Don'ts (from his own posts and code)
- **Do** pair a light canvas-framed still with a dark live-recording video for the same product (gr8r: post:2078890085425266847 light 4:3 loop, L518; post:2107859500191694895 dark recording, L815).
- **Do** post the isolated component set separately from the full screen (post:2094007479067701562, 4 cards, L68). **Don't** expect it to perform like a full screen: isolated-card posts have a median of 48 likes vs 100 for full dashboards.
- **Don't** post phone photos of a laptop screen as the main image: those are personal or "studio life" posts and sit at a median of 18 likes (img kind `other`).
- When someone labelled his AI-built work "slop", he quote-posted it ("How is this SLOP?", post:2101928454035751022, 11 likes). The defence is the detail list in TG-31. Arguing gets no reach; shipping the details does.

## 5. Exceptions and judgement calls
- His marketing sites (gr8rstudio.com, Savari) are Framer builds with heavier, brand-tinted multi-layer CTA shadows and Funnel Display or Geist 64px headlines. The restraint rules (TG-07/08) are for product UI. Marketing CTAs at his studio are loud on purpose. [engine note] This matches our canon split between hero and product-ui.
- Showcase apps break the gr8r token set freely (Contrail cards r34, Sticker cards r18, Aether glass r16). What carries over is the method (one-hue ink ladder, alpha lines, lightness hovers, expo-out 120-250ms), not the values.
- The gr8r spacing scale is declared but many components hard-code 10/11/14px insets. Treat 14 (panel) and 8 (menu/row) as the real working insets, not the 4pt scale.
- Contrail sets its h1 in Geist and its UI in Inter on the same page. He mixes two grotesks for display vs UI. [engine note] Allowed only when the display face is used once.

## 6. Figures worth keeping
- `knowledge/benchmarks/tanjim-x/app/home-light.png`, `home-dark.png`: shell, stats strip, grid2, panels.
- `app/project-board-dark.png`: kanban in dark, column vs card tone.
- `app/project-timeline-light.png`: gantt with dependencies, milestones and the today line.
- `app/drawer-light.png`: property-sheet drawer.
- `app/command-palette-*.png`, `popover-create-*.png`, `toast-*.png`, `list-bulk-select-*.png`, `onboarding-0..3-*.png`, `states-*.png`, `design-system-*.png`.
- `live/aether/fold-2x.png`: calm dense telemetry over a 3D scene. `live/aurora/fold-2x.png`: dark agent workspace. `live/contrail/fold-2x.png`: dark consumer search. `live/knowspace/fold-2x.png`: editorial serif plus objects.
- `live/load-frames-sheet.jpg`: the load-in of 8 sites at 0 / 400 / 1200 ms.
- `sheets/01-06`: the best posts by kind, the top video frames and the live folds.

## 7. Open questions
- The 3200x2400 post exports are 4:3 at 2x of a 1600x1200 frame. The app inside is scaled down (about 0.75 of 1440). Measure post images only after solving that scale, or use the local run (CSL-01 applies).
- Videos were sampled at 0.05s and 3s, not frame-stepped. Motion timings for posts come from the source CSS, not from the videos.
- `tint-storefront-download.vercel.app` is gone (Vercel 404, 2026-10-22). Not studied.
- Likes are confounded with topic: the top dark recordings are also the "open source" and "Claude" posts. Dark vs light is not tested in isolation.

## 8. What performs on X (347 posts, 4 Jul to 21 Oct 2026)

Measured from `posts.json` (326 own non-reply posts) and `img-classification.tsv`:

| Format | Posts | Median likes | Median views |
|---|---|---|---|
| Video | 104 | **99.5** | **7,908** |
| 2-4 image set | 31 | 86 | 7,127 |
| Single image | 108 | 48 | 3,270 |
| Text only | 83 | 9 | 1,286 |

| Image aspect (first media) | Posts | Median likes | Median views |
|---|---|---|---|
| Static 1.4:1 (3360x2400) | 23 | **131** | **12,296** |
| Video 16:10 | 7 | 120 | 6,691 |
| Video 4:3 | 78 | 105.5 | 8,857 |
| Static square | 11 | 85 | 7,680 |
| Static 4:3 | 29 | 53 | 2,611 |
| Static portrait | 15 | 23 | 2,114 |

| Image content kind (per post) | Posts | Median likes |
|---|---|---|
| Full dashboard screen | 47 | **100** (max 414) |
| Sidebar crop | 3 | 85 |
| Chart / analytics screen | 11 | 65 |
| Modal over a dimmed app | 17 | 64 |
| Onboarding / auth | 8 | 52.5 |
| Mobile (phones on grey) | 22 | 47 |
| Isolated component cards | 10 | 38.5 |
| Landing sections | 6 | 34.5 |
| Other (desk photos, screenshots, memes) | 24 | 18.5 |

Findings for the X design engine:
1. **Motion wins.** Video doubles static single images on likes and views. The top 7 posts of all time are videos (815, 804, 797, 701, 689, 518, 495 likes).
2. **A real, working product with a link beats a picture of one.** The top two are a live gr8r walkthrough ("details nobody will notice", 815) and "Should I open source…" with a demo link (804, 97.8k views). Building in public (stars counts, open-sourcing) and the "Claude + designer" frame (11 posts, median 168 vs 72) carry the reach.
3. **Show the whole app, wide.** A full dashboard screen at 1.4:1 or 4:3, floating on a pale canvas with a soft shadow, is the best static format (1.4:1 median 131 likes, 12.3k views). Portrait and single-phone posts underperform (23 median). Mobile is best as 3-4 phones side by side on grey (post:2099004037873926195 travel foldable is the exception at 405).
4. **Dark for the hero video, light for the stills.** The long recordings are dark app windows over a saturated blue wallpaper (the only colour in the frame). The stills are light warm-grey apps on near-white. Dark stills sit at a median of 42.5 likes.
5. **One idea per post, short copy.** Captions are 1-2 lines ("Task timeline", "Calendar webapp design & motion"). Copy length makes no difference (≤60 chars: 72 median vs 75). The visual carries the post.
6. **Isolated components and process shots underperform.** Cards on white (48), Figma canvases and desk photos (18.5) are weak as the main image. Use them as replies or carousel extras.

## How to design like Tanjim: a checklist

Before building:
- [ ] Pick one ink hue and write a 4-step text ladder plus border, strong border and divider for light AND dark (dark redefined, same hue). TG-27
- [ ] Choose one accent pair (light, dark) and soft (10%) and line (38%) mixes. Every other colour is status or identity, used at 6px or as 10-16% tints. TG-12, TG-17
- [ ] Set the type at 13.5 body / 12.5 controls / 12 meta / 11 eyebrow / 14.5 section / 19-23 titles, at most weight 600, tabular numbers, Geist + Geist Mono for ids. TG-04
- [ ] Use the 22/26/30/36 height ladder, radius 6 for controls, 8 cards, 10 containers, 12 overlays. TG-07

Shell and views:
- [ ] Sidebar 252 a tone darker; topbar 46; one gutter line through every layer. TG-01..03
- [ ] Rows 40 with divider lines; tables 34/36 with sticky header and first column; kanban columns on sunken with ring-edged white cards. TG-14..16
- [ ] Status as glyphs, priority as bars, labels as 6px swatches. TG-11, TG-12
- [ ] A stats strip as one joined box; asymmetric 1.55:1 panel grid. TG-19

States and overlays:
- [ ] Six states only (hover, pressed, selected, focus, error, disabled) built from surface steps and accent-soft halos. TG-09
- [ ] Popover 10 / modal 12 / drawer 620 / palette 640, one shadow-pop, entrance distance scaled to size. TG-21
- [ ] Empty, loading and error states for every view: small line icon, one sentence, one button; skeletons that match the real geometry. TG-24, TG-25

Motion and details:
- [ ] 140ms colour transitions; expo-out `(.23,1,.32,1)`; spring only for confirmations (check, toast, drop). TG-29, TG-30
- [ ] One-shot entrances gated to their cause; reduced motion to a .12s fade. TG-29
- [ ] The TG-31 detail list: focus restore, keyboard reach, tooltip delay, key-cap kbd, hidden misaligning scrollbars, `ss01`, caret and selection in the accent.
- [ ] One line per edge; write the reason next to every alignment fix. TG-32

Showcase and posting:
- [ ] One signature world object per showcase product; chrome stays quiet. TG-34
- [ ] Post a live dark recording with a demo link, and light 4:3 / 1.4:1 stills of full screens on a pale canvas. TG-36, TG-37

## Addendum 2026-10-22: his posts use a different system from his code (measured by pixel replica)
The 414-like kanban post (`img/2074140966265725057-0.jpg`, replica `work/replicas/app/src/TanjimKanban.tsx`, notes `work/replicas/TANJIM-KANBAN-NOTES.md`) is not his open-source app rendered. It is a post system:
- **Type:** Manrope 400 only (40/16/14/13/12/10), solved from 13 line widths.
- **Edges:** 0.5px hairline rings.
- **Controls:** 34px at r8.
- **Sidebar:** 232 wide.
- **Header:** h1 40/400 over a 16px breadcrumb.
- **Spacing:** one 16 gutter.
- **Surfaces:** the warm well ladder.

His code uses Geist 13.5 with 600 titles at 23px. **Rule TG-38:** for X stills, design in the post system, and use the code system only for shipped product. **Check:** solve the font from line widths before choosing a system. Applied in `work/replicas/app/src/CadenceApp.tsx` (`#/capp`).
