---
source: web:linear.app (home DOM windows, /plan, /build, /insights, /asks, /agents, /intake, /coding-sessions, /changelog), vercel.com/geist (34 component pages, light + dark), ui.shadcn.com (dashboard-01, sidebar-07, examples/tasks, examples/dashboard; light + dark), cursor.com, dub.co (+ /analytics), cal.com/rick, docs.stripe.com, supabase.com (+ /ui), campsite.com, plain.com, clay.com, granola.ai, notion.com/product/calendar (+ /mail), superhuman.com, arc.net, mercury.com/invoicing, ramp.com/accounts-payable, pro.alignui.com, tremor.so/blocks, untitledui.com/react/components, next-learn-dashboard.vercel.sh; plus the engine's earlier measured studies of Attio, Kargul, Rico and Flo Hoeller
chapter: Product UI, deep: app shell anatomy, component standards, type/colour/radius/shadow/state systems, dark product UI, and what separates studio-grade product screens from admin templates
pages: n/a (web; Playwright Chromium 1440x900 DPR 2, getComputedStyle probe, pixel measurement on raster shots; captured 2026-10-10)
topic_tags: [product-ui, saas-app-ui, app-shell, sidebar, table, list, inbox, kanban, calendar, command-menu, menu, popover, modal, toast, badge, kbd, input, composer, tabs, kpi, chart, agent-panel, typography, colour, radius, shadow, focus, states, dark-mode, density, micro-details, benchmark, linear, geist, shadcn, cursor]
status: studied
extends: knowledge/web/product-ui-in-marketing.md (PUI-01..50, frames, crops and charts in heroes), knowledge/web/attio-product-ui.md, knowledge/web/kargul-crm-teardown.md, knowledge/web/kargul-source-study.md, knowledge/web/heyrico-product-design.md (HR-01..60), knowledge/web/heyrico-recreation-lessons.md, knowledge/web/flohoeller-craft.md (FH-01..20), knowledge/web/consistency-mechanics.md. Read those for frames, Attio/Kargul/Rico specifics and the centring/radius mechanics; this note adds the cross-product component standards and the screens.
---

# Product UI, deep: how studio-grade app screens are built

Companion data: `system/product-ui/tokens.json` (numeric standards per component, light and dark) and `system/product-ui/screens.md` (14 screen archetypes). Evidence: `knowledge/benchmarks/product-ui/deep/` (171 shots + `measurements.json`, sources in `knowledge/benchmarks/product-ui/CREDITS.md`).

Evidence tags: **[M]** computed style measured live in this study; **[P]** pixel-measured on a raster product shot (export scale stated or inferred from text size); **[V]** read visually, no number claimed; **[R]** measured in an earlier repo study (file named); **[G]** the generic baseline (shadcn/ui defaults), used as the counter-example because it is what an unbriefed model reproduces.

## 1. Core ideas

1. **Premium product UI is one notch smaller than the generic default on every axis, and the differences are measurable.** shadcn's dashboard-01 [G][M]: nav rows 32 on a 36 px pitch at 14/400, Lucide icons 16 px at stroke 2, table rows 53 px, KPI figures 30 px, sidebar 288 px. Linear's DOM app window [M]: rows 28 on 30 at 13/510, icons 14 at stroke ~1, list rows 40, sidebar 232. Attio, Kargul, Rico and Campsite land between the two and nearer to Linear (sidebar 238-260, pitch 30-32, table rows 36-43) [R][P]. "Looks like a template" is mostly these five numbers.
2. **A product screen uses 3-4 text sizes and 2-3 weights.** Linear's app window: 12 px carries 64 of 92 text nodes and 13 px another 20; weights 400 (meta) and 510 (labels/titles), 590 only for the workspace name and thread titles [M]. Cursor's agent window: 11/12/13 only [M]. Kargul: 14 and 12 [R]. shadcn adds 16 and 30 [G][M].
3. **Hierarchy comes from a 3-step grey ramp, not size.** Linear dark: #f7f8f8 (emphasis) / #d0d6e0 (primary) / #8a8f98 (secondary) / #62666d (tertiary) [M]. Geist light: #171717 / #4d4d4d / #8f8f8f; dark #ededed / #a1a1a1 / #8f8f8f [M]. Cursor warm: #26251e at 100 / 60 / 40% alpha [M]. Each product has exactly one ramp and every string sits on it.
4. **Edges are rings, and dark mode raises the ring alpha about 1.8x while the drop shadows stay the same.** Geist: card/menu ring `0 0 0 1px rgba(0,0,0,.08)` light, `rgba(255,255,255,.145)` dark; the drop layers (`0 1px 1px 2%`, `0 4px 8px -4px 4%`, `0 16px 24px -8px 6%`) are identical in both themes, so on black the ring alone carries the edge [M]. Linear uses white 5 / 8 / 12% hairlines and an inset `0 0 0 1px #23252a` [M].
5. **Overlays share one recipe and differ only by offset.** Geist's popover, menu and toast use the same four-layer stack; the command menu pushes the two soft layers to 8/16 and 24/32; the modal swaps them for `0 32px 72px -12px 6%, 0 8px 32px -12px 8%, 0 8px 24px -12px 12%` [M]. All overlays are radius 12. Three overlay tiers, one ring, one radius.
6. **Rows carry the product, and each row type has a fixed anatomy.** Linear issue row (40 px): 16 px priority glyph at x36, ID 13/400 grey at x60, 14 px status glyph, title 13/510, then right-aligned metadata in 12/510 grey, label chips 24 px, a 16 px avatar and a 12/400 date [M]. Cursor agent row (51 px, two lines): status check, title 12, right-aligned relative time "now / 10m / 30m / 45m", second line "+20 -3 · Drafted implementati..." [M]. Dub event row (45 px): link with favicon, 16 px avatar, flag, "$49 USD" with the unit muted, "Oct 10, 5:01 PM" stepping back four minutes per row [M].
7. **Micro-details are the realism layer and they are cheap**: counts beside labels ("In Review 3", "Priority 4 / Other 12"), relative timestamps in one right column, diff counts in green/red, unread dots, read rows dimmed, presence dots, keycaps in the search field, truncation with ellipsis on the longest string, units muted after values [M][P]. Every premium screen has 5+ of these; the generic one has 1-2.
8. **Selection and hover are fills one surface step away, never outlines.** Linear active nav: white 4% [M]; Linear group header: white 2% [M]; Geist command item selected: black 5% [M]; Geist selected tab: #ebebeb on white [M]; Cursor selected agent row: #ebeae5 on #f2f1ed [M]. Dub outlines the selected KPI card with 2 px black [M], the one outlined selection in the set.
9. **Primary actions are rare inside the app.** Linear's app window shows no filled primary button at all; Cursor's composer has one 20 px round send button; Geist dialogs end with one ink primary beside a white ringed Cancel [M]. shadcn's sidebar opens with a full-width black "Quick Create" pill [G][M], the pattern the founder rejected ("sidebar top wtf").
10. **Agent UI shows the work as rows, not as chat bubbles.** Cursor: user prompt in a hairline card, then plain grey process lines ("Read about-acme.md", "Read brand-guidelines.pdf", "Thought 6s"), agent text without a bubble, file-change cards ("app/page.tsx +52 -0"), composer with "Agent" mode chip and model picker [M]. Linear: "Worked for 10 sec", result card "Changed 2 files +22 -10", model badge "Opus 5" at 11 px [M]. Superhuman Docs AI: answer as bullets plus a row of four 16 px actions (copy, download, thumbs) [P].
11. **Warm neutrals are now a premium signal, not a mistake.** Cursor's window is #f7f7f4 / #f2f1ed with ink #26251e and hairlines at rgba(38,37,30,.08-.10) [M]; Granola uses #f7f7f2 paper with a serif note title [M]. The ramp still has three steps; only the hue moves.

## 2. Rules

Format per `knowledge/SCHEMA.md`. Numbers are measured unless marked as an engine default (E).

### 2.1 App shell

- **RULE [PU-01]** Make the app sidebar 232-260 px wide at a 1440 viewport (default 248), never 280+.
  **Why** Every studio-grade shell measured sits in this band; 288 px is the generic default and makes the content column feel pushed.
  **Applies to** SaaS app UI | hero dashboards. **Check** sidebar `offsetWidth` 224-264 px at 1440. **Source** Linear 232 in a 1320 window [M]; Attio 238 [R attio-product-ui.md]; Campsite ~240 [P, 2x]; Kargul 254 [R kargul-crm-teardown.md]; Rico 256-260 [R heyrico-recreation-lessons.md]; shadcn 288 [G][M].

- **RULE [PU-02]** Build nav rows 28 px tall on a 30 px pitch (2 px gap), radius 8, padding-inline 7-8, icon-label gap 8; allow 30-32 tall rows only for 14 px labels.
  **Why** The 2 px gap keeps hover pills from touching; a 36 px pitch is what makes a sidebar read "admin template".
  **Applies to** SaaS app UI. **Check** nav item heights in {28, 30, 32}; pitch - height <= 4; radius 8. **Source** Linear 28 / pitch 30 / pad 0 7 / gap 8 [M]; Rico 28/30 [R]; Campsite pitch 31 [P]; Kargul 30 [R]; Attio pitch 32 [R]; shadcn 32 / pitch 36 [G][M].

- **RULE [PU-03]** Set nav labels at 13/20 weight 500-510 (or 14/20 at 500 when the whole product runs on 14), icons 14-16 px at stroke 1-1.5 in the label's secondary grey; never 14/400 in pure black with stroke-2 icons.
  **Why** A slightly heavier, smaller label reads crisper than a larger regular one; stroke 2 at 16 px is Lucide's default and is the most visible generic tell.
  **Applies to** SaaS app UI. **Check** nav label fontSize 13-14, fontWeight >= 500; svg stroke-width <= 1.75 at 16 px. **Source** Linear 13/510, icons 14 [M]; Rico 13/500 [R]; Attio 14/500 with 14-16 px icons [R]; founder Lucide 1.5-1.75 rule; shadcn 14/400, 16 px stroke 2 [G][M].

- **RULE [PU-04]** Head each nav group with a 24 px row holding a 12/16 weight 500-510 label in the tertiary grey, sentence case, 12-16 px of air above it, aligned to the item text edge.
  **Why** The group label is a quiet divider; uppercase tracked eyebrows (Cursor's "READY FOR REVIEW 5" at 11 px) belong to a product voice the founder has ruled out for engine work.
  **Applies to** SaaS app UI. **Check** group label height 24, fontSize 11-12, `text-transform: none`, gap from the previous row 12-16 px. **Source** Linear "Workspace"/"Favorites" 24 px rows, 12/510 #62666d, 16 px after the last item [M]; Campsite group pitch 43.5 vs row pitch 31 [P]; Cursor uppercase eyebrow [M] (counter-example); founder no-uppercase rule.

- **RULE [PU-05]** Encode states as a fill ladder, one surface step each: hover = ink or white at 3-4%, selected/active = 4-6% (or the next surface token), pressed = +2%; text weight and size never change between states.
  **Why** One ladder keeps every list, tab and menu consistent and avoids layout shift; outlines and accent fills turn state into decoration.
  **Applies to** SaaS app UI. **Check** selected element background differs from its container by one surface step; no border or outline colour change on selection; fontWeight equal across states. **Source** Linear active nav white 4%, group header white 2% [M]; Geist selected command item black 5%, selected tab #ebebeb on #fff [M]; Cursor selected row #ebeae5 on #f2f1ed [M]; Dub 2 px black KPI outline [M] (counter-example).

- **RULE [PU-06]** Give the main area a 44-48 px top bar: breadcrumb or record ID + title at 12-13/510, then right-aligned 28 px icon buttons, a pager ("1 / 84") or the share/presence cluster; separate it from content with a 1 px hairline (white 5% dark, #ebebeb light).
  **Why** The bar is chrome, so it is short and quiet; 56+ px headers with 20 px titles make a screen look like a marketing page.
  **Applies to** SaaS app UI. **Check** first row of the main pane 44-48 px; title fontSize <= 14 (page titles inside content may be 16-20). **Source** Linear issue header 44 px, `DRV-8852 Faster app launch` 12/510, pager "1 / 84" 12/400, hairline white 5% [M]; Attio 48 [R]; shadcn 48 [G][M]; Kargul 58 [R].

- **RULE [PU-07]** Size secondary panes from three widths: 200-240 (lists, properties), 320-400 (agent/chat, inspector), 480-560 (detail sheets); centred reading columns 540-740 (dialogs 540, command 640, settings 596-740).
  **Why** A small set of pane widths makes three-pane layouts line up across screens and keeps reading measure under ~75 characters.
  **Applies to** SaaS app UI. **Check** pane widths fall in the three bands +/- 8 px. **Source** Linear properties column 207 and agent panel 398 [M]; Cursor list pane 219 + chat 314 [M]; Attio record column ~340 [R]; Kargul sheets 480/560 [R]; Geist modal 540, command menu 640 [M]; Rico settings column 596 [R] and ~740 [R heyrico-product-design.md].

### 2.2 Buttons, inputs, small controls

- **RULE [PU-08]** Use one action height per product for in-app buttons (28, 30 or 32), 36 only inside forms and dialogs, 40 only for a page-level CTA; size by height word, not by padding.
  **Why** Mixed heights in a toolbar are the first thing that reads unfinished; dense products pick the small rung and stay on it.
  **Applies to** SaaS app UI. **Check** distinct in-app button heights <= 2 per screen (excluding dialogs). **Source** Linear 28/r8 [M]; Attio 28/r9 [R]; Kargul 30 pill [R]; Rico 32/r10 [R]; Geist sm 32/r6, md 36/r6, lg 40/r8 [M]; Cal.com 28-30 and 36 at r10 [M].

- **RULE [PU-09]** Build the secondary button as white with a 1 px ring at 8% ink (dark: white 14% ring on the surface), primary as solid ink #171717 with white 14/500 text; one primary per view.
  **Why** A ring renders crisper than a border plus shadow at 1x and costs no layout; the ink primary is the system's only heavy object.
  **Applies to** SaaS app UI. **Check** secondary `box-shadow` starts `0 0 0 1px` with alpha 0.06-0.10 (light); primary count per view <= 1. **Source** Geist secondary `0 0 0 1px #ebebeb`, primary #171717 [M]; Geist dark ring rgba(255,255,255,.14) [M]; founder `.btn-white` rule.

- **RULE [PU-10]** Square the inner corners of joined controls (split buttons, input + addon, date range pairs) and keep the outer corners at the control radius.
  **Why** Rounded inner corners leave a notch at the seam and break the group into separate objects.
  **Applies to** SaaS app UI. **Check** adjacent controls with touching edges have 0 radius on the touching side. **Source** Geist split button `6 0 0 6` / `0 6 6 0` at 32 and 36, `8 0 0 8` at 40; calendar combobox `5 0 0 5` [M]; consistency-mechanics.md joined-controls rule.

- **RULE [PU-11]** Make text inputs 32/36/40 with padding-inline 12, 14 px text (16 at 40), and a ring rather than a border; a composer is a multi-line field (13-14 px, padding 8) above a 20-28 px chip row: mode chip, model picker as text + chevron, round send button at the right.
  **Why** Inputs share the button ladder; the composer is a small toolbar, so its controls drop a rung.
  **Applies to** SaaS app UI | agent UI. **Check** input heights in {32, 36, 40}; composer chip row items 20-28 px. **Source** Geist inputs 32/36/40 px12 [M]; Kargul 36/r8 px12 [R]; Cursor composer 13 px placeholder "Plan, search, build anything...", "Agent" chip 20 px pill 11/400 on #e6e5e0, "Grok 4.7" model text 11 px + chevron, 20 px round send [M]; Rico composer r~20 [R].

- **RULE [PU-12]** Render keycaps 20 px tall, radius 4, 12/400 ink on white with a 1 px ring at 8% (dark: white ring), padding 0 4-6; show "⌘K" inside the right edge of the search field and "Esc" in the command palette header.
  **Why** Keycaps are the cheapest proof that the product is keyboard-first and they anchor the small end of the scale.
  **Applies to** SaaS app UI. **Check** `kbd` height 18-21, radius 4-6. **Source** Geist "/" 20x20 r4 12 px, "⌘ K" in search, "Esc" 20 px in command menu [M]; Attio 18/r6 [R]; Raycast 21/r4 [R product-ui-in-marketing.md].

- **RULE [PU-13]** Pick one badge grammar per product and use it everywhere: tinted (fill 8-14% + same-hue text, Attio/Rico/Kargul), outline pill (transparent, 1 px ring 8%, colour dot or 12 px glyph, Linear/shadcn), or solid (white text on full hue, Geist). Heights 20-24, text 11-12/500; at most one filled chip per row.
  **Why** Mixed badge grammars are the fastest way to make a table look assembled; one filled chip per row keeps the eye on the one status that matters.
  **Applies to** SaaS app UI. **Check** distinct badge style signatures (bg alpha class x border presence) per screen <= 2 (status + count); filled chips per table row <= 1. **Source** Linear label chips 24 pill, 1 px white 8%, 12/510 grey with a 12 px colour glyph [M]; shadcn 22 pill outline 12/500 [G][M]; Geist 24 pill 12/500 pad 12 and 20 pill 11/500 pad 8, solid [M]; Attio 22/r7 tinted [R]; Rico 20/r6 tinted [R]; founder one-filled-chip rule.

- **RULE [PU-14]** Use segmented tabs (28-32 tall, radius 6, 13 px, neutral selected fill) for views of one dataset and underline tabs (2 px ink under 14/400-500, ~48 px tall) for page sections; show counts inline in the muted grey, not as coloured pills.
  **Why** Two tab types with clear jobs prevent "tabs that look like buttons that look like chips".
  **Applies to** SaaS app UI. **Check** selected segmented tab differs only in fill; counts share the tab's font size at the secondary colour. **Source** Geist secondary tabs 32/r6/13 px with #ebebeb selected, underline tabs 50 tall with 2 px ink [M]; Linear inbox "Priority 4 / Other 12" pill segments [P]; Attio count chips [R]; shadcn "Past Performance 3" chips [G][M].

### 2.3 Rows, tables, lists

- **RULE [PU-15]** Set data-table rows to 36-44 px (default 40) with a 36-40 px header; 48+ px rows only for two-line cells or editorial tables.
  **Why** Row height is the main density dial; 53 px rows (shadcn default) show half the records of a 36 px table in the same window.
  **Applies to** SaaS app UI. **Check** median `tr`/`[role=row]` height 36-44. **Source** Attio 36 [R]; Geist 40 + 36 header [M]; Linear list 40 [M]; Kargul 42+1 [R]; Linear insights table 44 [P, 2x]; Dub 45 [M]; Clay ~47 [P, assumed 2x]; shadcn 53 + 40 header [G][M].

- **RULE [PU-16]** Write column headers at 12-14/500 in the secondary grey (or ink at 14/500 when cells are grey), same horizontal padding as the cells (8-12), sentence case; right-align numeric headers with their column.
  **Why** Header and cell edges must share one x; a header that is louder than the data competes with it.
  **Applies to** SaaS app UI. **Check** th padding-inline == td padding-inline; numeric th `text-align: right`. **Source** Geist th 14/500 #4d4d4d, padding 0 8, td 14/400 padding 10 8, numeric column right-aligned in both [M]; Dub header 14/500 ink over 14/400 #404040 cells [M]; Attio 14/500 ink headers [R]; Kargul 12 px #676767 headers, 12 px padding [R].

- **RULE [PU-17]** Choose one gridline regime: horizontal hairlines only (default) or a full cell grid only when the product is a spreadsheet (CRM records, enrichment tables). Hairlines are 1 px #e5e5e5-#ebebeb light, white 5-8% dark; no zebra striping.
  **Why** Full grids say "editable spreadsheet" and double the line count; zebra stripes appear in none of the premium products measured.
  **Applies to** SaaS app UI. **Check** count of vertical cell borders = 0 unless DIRECTION.md declares a grid product; no alternating row backgrounds. **Source** Geist, Kargul, Linear insights: row hairlines only [M][R][P]; Attio, Dub, Clay: full grid [R][M][P]; zebra in 0 of 12 products.

- **RULE [PU-18]** Right-align numbers in tabular figures, put the unit or currency code after the value in the muted grey ("$49 USD"), and keep IDs and dates in the secondary grey at the meta size (12 px).
  **Why** Aligned digits scan as a column; muting units keeps the value as the strongest ink in the cell.
  **Applies to** SaaS app UI. **Check** numeric cells `font-variant-numeric: tabular-nums` and `text-align: right`; unit spans use the tertiary colour. **Source** Dub "$49 USD" with USD #a3a3a3 [M]; Geist right-aligned numeric column [M]; Attio/Kargul tabular right-aligned money [R]; Clay left-aligned numbers [P] (counter-example).

- **RULE [PU-19]** Build single-line list rows at 40 px: leading glyph(s) 14-16 px, ID in secondary 13/400, title 13/510 primary and allowed to truncate, then a right-aligned metadata cluster (12/510 grey chips, 16 px avatar, 12/400 date) on a fixed right edge.
  **Why** IDs before titles and a fixed right column make a list scannable in two passes (what, then status/owner/when).
  **Applies to** SaaS app UI. **Check** metadata cluster right edge identical across rows; title has `text-overflow: ellipsis`. **Source** Linear issue rows: padding 0 28 0 36, glyph 16 at x36, ID at x60, status 14 at x141, title at x164, meta 12/510, avatar 16, date "Oct 9" 12/400 [M].

- **RULE [PU-20]** Build two-line rows (inbox, agent runs, feed) at 50-58 px with title and preview 18-24 px apart: title 12-13/500 primary, preview 12-13/400 secondary truncating, relative time right-aligned on the title line, and an optional status glyph or diff counts on the second line.
  **Why** Two lines are the minimum that tells who/what plus why; keeping time in one right column makes recency scannable.
  **Applies to** SaaS app UI. **Check** row height 50-58, time strings right-aligned to one x. **Source** Cursor 51 px rows, padding 10 12 10 14, "now / 10m / 30m / 45m", "+135 -21 · Bioinformatics Tools" [M]; Linear inbox two-line rows, avatar 0.65 x pitch, "1h / 4h / 13h / 22h" [P]; Campsite feed title-to-preview 23.5 px, item pitch 68 [P, 2x].

- **RULE [PU-21]** Group list rows under 36 px group headers: radius 8, fill one step up (white 2% dark / #fafafa light), status glyph 14-16 + label 13/510 + count 13/510 secondary, actions at the right on hover.
  **Why** Grouped status buckets are the core structure of issue, deal and ticket lists; the count is the realism cue.
  **Applies to** SaaS app UI. **Check** group header height 34-38, contains a count. **Source** Linear "In Review 3" header 36/r8, fill white 2%, padding 8, gap 8 [M]; Notion Calendar task groups "Not started 3", "In progress 2" with tinted status pills [P].

### 2.4 Overlays

- **RULE [PU-22]** Build menus as radius 12 popovers with 4-6 px inner padding and items 32-36 px at radius = menu radius - padding (12 - 6 = 6), 14/400 text, padding-inline 8, icons 16; destructive items change text colour only.
  **Why** Concentric item corners and a single item height make a menu feel machined; a red-filled delete row shouts.
  **Applies to** SaaS app UI. **Check** item radius = popover radius - padding (+/- 1); item heights identical; destructive item background transparent. **Source** Geist menu 200 wide, r12, pad 6, items 36/r6/px8, "Delete" #cb2a2f text [M]; shadcn items 32/r6, padding 6 8, menu 128 wide [G][M]; Kargul 168 wide, r8, pad 4, items 28/r6 at 12 px [R].

- **RULE [PU-23]** Use three overlay shadow tiers, each beginning with the same 1 px ring: popover/menu/toast `0 0 0 1px a8, 0 1px 1px a2, 0 4px 8px -4px a4, 0 16px 24px -8px a6`; command palette `... 0 8px 16px -4px a4, 0 24px 32px -8px a6`; modal `0 0 0 1px a8, 0 32px 72px -12px a6, 0 8px 32px -12px a8, 0 8px 24px -12px a12` (aN = black at N%). Resting cards get the ring plus at most `0 2px 2px a4`.
  **Why** Shared ring + rising soft layers gives a readable depth order; negative spread keeps the shadow under the object instead of haloing it.
  **Applies to** SaaS app UI. **Check** every floating layer's box-shadow starts with a `0 0 0 1px` ring; offsets increase menu < command < modal; card shadows <= 2 layers. **Source** Geist materials, menu, toast, command menu, modal (light and dark) [M]; shadcn popover `0 4px 6px -1px 10%, 0 2px 4px -2px 10%` [G][M] (heavier, no ring).

- **RULE [PU-24]** Build the command palette 600-640 wide, radius 12: a 48-56 px input row (16-18 px text, search glyph, "Esc" keycap right), 12-13 px group labels in the secondary grey, items 36-40 px radius 6 padding-inline 8 inside an 8 px list padding, selected item at 5% ink, optional footer hints ("↑↓ Navigate", "↵ Open").
  **Why** It is the most-used power surface; matching menu metrics makes it feel like part of one system.
  **Applies to** SaaS app UI. **Check** dialog width 600-640, item height 36-40, radius 6. **Source** Geist 640x321, input 18 px, Esc 20 px kbd, "Suggestions" 13/19.5 label, items 36/r6, list padding 8, selected rgba(0,0,0,.05) [M]; Kargul input row 48, rows 40 [R]; Attio 48 input + footer hints [R]; Raycast 56/40 [R].

- **RULE [PU-25]** Build modals 480-560 wide, radius 12: title 16-20/600 at -0.02em, description 14/20 secondary, body fields 36 px, footer right-aligned with a white ringed Cancel and one ink primary at 32-36 px; scrim 40-60% black.
  **Why** A modal is a focused form; one primary and a quiet cancel make the decision obvious.
  **Applies to** SaaS app UI. **Check** dialog width 480-560, title fontWeight >= 600, exactly one filled button. **Source** Geist 540 wide, "Create Token" 20/26/600/-0.4px, body 14/20, Cancel white + Submit #171717 at 32 [M]; Kargul header 77 px with 16/600 title [R]; Kargul scrim 55-60% [R]. Engine overlay: Cancel uses `variant="ghost"` in coss per user CLAUDE.md.

- **RULE [PU-26]** Anchor toasts 24 px from the bottom-right corner, radius 12, the popover shadow tier, 14/21 text with an optional 13 px secondary line, one 32 px dismiss icon button; status is an icon or a dot, never a coloured fill.
  **Why** Toasts are peripheral; a filled red or green slab steals focus from the work.
  **Applies to** SaaS app UI. **Check** toast container offset 24 from right and bottom; background = surface token. **Source** Geist toaster anchored at 1416, 876 in a 1440x900 viewport, r12, 14/21, dismiss 32 [M]; engine coss rule: `toastManager.add()` only.

### 2.5 Domain components

- **RULE [PU-27]** Show KPI values at 18-24 px weight 500-600 in tabular figures with a 12/500 secondary label above and a delta or micro-visual (sparkline, micro-bars, meter) beside; never 30+ px bold figures inside the app.
  **Why** In-app KPIs are scanned in a row, not read as headlines; a micro-visual makes the number a trend.
  **Applies to** SaaS app UI | hero dashboards. **Check** KPI value fontSize 18-24. **Source** Rico 18/24 semibold [R]; Attio, Kargul KPI cards [R]; Dub KPI cards with a gradient sparkline [M]; shadcn 30 px [G][M]; founder micro-visual rule.

- **RULE [PU-28]** Build calendars with: hour rows 48-58 px separated by 1 px ~5% hairlines, weekends tinted one surface step, events as a 12-16% tint of the calendar colour with a 3-4 px solid left bar and text in a dark shade of the same hue (title 500, time 400 below), today as a solid accent square in the mini-month, the current week as a grey band.
  **Why** Tint + bar keeps dense weeks legible; same-hue text avoids black text sitting on coloured fills.
  **Applies to** SaaS app UI. **Check** event background alpha 0.12-0.18 of the account hue; event has a 3-4 px left bar; hour pitch 48-60. **Source** Notion Calendar: hour pitch ~58, mini-month pitch ~27, task line pitch ~27 (export ~2.6x inferred from 12 px digits) [P]; Cal.com booking day cells 59/r8 14/500, time slots 36/r10, weekday labels 12/500 at +1.2 px tracking [M].

- **RULE [PU-29]** Build kanban columns 272-300 wide with 12 px gaps, a 36-42 px header (status glyph 14 + title 12-14/510-600 + count secondary + add/more icons right), and cards one surface step up with a 1 px ring, radius 9-12, padding 12, ID 10-12 px secondary, title 13 px, meta chips 24.
  **Why** Narrow columns show 4-5 statuses at 1440; the card is a compressed list row, so it reuses the row's metadata grammar.
  **Applies to** SaaS app UI. **Check** column width 272-300, card radius 9-12, cards share one meta chip style with the list view. **Source** Linear columns 300 on a 312 pitch, header 42, cards #0f1011 + 1 px white 8% at r9, ID 10/400 #62666d, label chips 24 [M]; Attio columns 272, cards r12 [R].

- **RULE [PU-30]** Lay out an agent panel as: header (avatar or mark 16-24 + agent name 13/500 + model badge 11 px), the user prompt in a hairline card or neutral bubble, process lines as plain 12-13 px secondary rows with tool verbs and durations ("Read about-acme.md", "Thought 6s", "Worked for 10 sec"), the answer as plain text at 13/20-21, result cards (r8, 1 px ring, file or object + counts in green/red), a row of 16 px response actions, and the composer at the bottom.
  **Why** Process rows and result cards make the output feel computed and reviewable; chat bubbles for the agent make it feel like a toy.
  **Applies to** SaaS app UI | agent UI. **Check** agent answer has no bubble background; at least one process row and one result card. **Source** Cursor agent window [M]; Linear agent panel header 48 px, "Opus 5" 18/r4 11 px badge, "Worked for 10 sec", "Changed 2 files +22 -10" [M]; Superhuman Docs AI actions row [P]; Rico HR-43 [R].

- **RULE [PU-31]** Build inbox rows with an avatar carrying a small action-glyph badge (assigned, mentioned, quoted, update), an 8 px unread dot in the accent before the title, read rows dimmed to the secondary/tertiary tier, and a right column of status glyph over relative time; filter with segmented pills that carry counts.
  **Why** The avatar badge says why the item is here without a word; dimming read rows is the cheapest triage cue.
  **Applies to** SaaS app UI. **Check** unread and read rows differ in text colour tier, not in font weight; times right-aligned. **Source** Linear Inbox (changelog shot): unread dot #5e6ad2-class purple, read rows dimmed, "1h / 4h / 13h / 22h" [P]; Campsite feed comment-count chips "1 / 8 / 3" [P].

### 2.6 Type, colour, radius, focus, dark

- **RULE [PU-32]** Run a product screen on 3-4 font sizes from {11, 12, 13, 14} plus one title size from {16, 18, 20}; 12-13 px should carry >= 60% of text nodes in dense views.
  **Why** Few sizes plus weight/colour steps is what makes dense UI calm; every extra size is a seam.
  **Applies to** SaaS app UI. **Check** distinct computed font sizes in the main view <= 5; share of 12-13 px >= 60% (dense) or 13-14 px >= 60% (comfortable). **Source** Linear 12 px on 64 of 92 nodes, 13 on 20 [M]; Cursor 11/12/13 [M]; Kargul 14/12 [R]; Geist 14/13/12 + 20 [M]; shadcn 14/12/16/30 [G][M].

- **RULE [PU-33]** Use weights 400 (meta, body) and 500-510 (labels, titles, values) and keep 590-600 for page titles and figures; product text runs at tracking 0 at <= 14 px, -0.02em at 20, -0.04em at 24.
  **Why** A two-weight UI reads as one voice; tight tracking belongs to display sizes only.
  **Applies to** SaaS app UI. **Check** distinct weights <= 3; letter-spacing 0 for fontSize <= 14. **Source** Linear 400/510 + 590 [M]; Geist headings 20/26/600/-0.4px and 24/32/600/-0.96px, body tracking normal [M]; HR-01 [R]; Kargul tracking normal [R].

- **RULE [PU-34]** Define exactly one text ramp of 3 steps + disabled and route every string through it: light #171717 / #4d4d4d / #8f8f8f (Geist) or ink at 100 / 60 / 40% (Cursor); dark #ededed / #a1a1a1 / #8f8f8f (Geist) or #f7f8f8 / #d0d6e0 / #8a8f98 / #62666d (Linear).
  **Why** Hierarchy from colour lets every row stay at 12-13 px.
  **Applies to** SaaS app UI. **Check** distinct neutral text colours in a view <= 5. **Source** Geist light and dark [M]; Linear [M]; Cursor rgb(38,37,30) at 1 / .6 / .4 [M]; Stripe docs #1a1f36 / #3c4257 / #697386 [M].

- **RULE [PU-35]** Build light surfaces in three steps (#ffffff content, #fafafa sidebar/tray, #f2f2f2-#f5f5f5 hover/muted) with rings at 8% ink and hairlines at #e5e5e5-#ebebeb; a warm theme shifts the same steps to about #f7f7f4 / #f2f1ed / #ebeae5 with hairlines at the ink hue 8-10%.
  **Why** Three steps are enough for page, panel and state; warm steps read crafted when the ramp stays monotone.
  **Applies to** SaaS app UI. **Check** distinct background colours in a view <= 4 (excluding status tints). **Source** Geist #fff / #fafafa / #f2f2f2, ring #ebebeb [M]; shadcn #fff / #fafafa / #f5f5f5, border #e5e5e5 [G][M]; Cursor #f7f7f4 / #f2f1ed / #ebeae5, hairline rgba(38,37,30,.08-.10) [M]; Granola #f7f7f2 [M].

- **RULE [PU-36]** Build dark product surfaces from a near-black page and 1-2 lightness steps: page #000-#0a0a0a (Geist #000, Linear #08090a), panels #0a0a0a-#0f1011, raised controls #161718-#171717, muted #262626; rings white 8-14.5%, hairlines white 5-8%, and keep the light theme's drop shadows unchanged.
  **Why** Light-to-dark is mainly a ring-alpha change (Geist 8% black -> 14.5% white, ~1.8x); lifting every surface or adding glows is what makes dark UI look like a template.
  **Applies to** SaaS app UI (dark). **Check** page L* <= 5; panel-to-page L* difference 1-4; ring alpha 0.08-0.15 white. **Source** Geist dark materials, menu, modal, table [M]; Linear #08090a / #0f1011 / #161718, hairlines white 5/8/12%, inset ring #23252a [M]; shadcn dark #0a0a0a / #171717 / #262626, borders white 10/15% [G][M]; Kargul #161616 / #232323 / #393939 [R]; Rico #1c1c1c, white 4% hairlines [R].

- **RULE [PU-37]** Use a radius ladder keyed to height and nest inward: 4 at 16-20 px (kbd, mini chips), 6 at 28-36 px items and menu rows, 6-8 at 32-40 px controls (founder soft ladder: 8 / 12 for engine builds), 9-12 for cards and kanban cards, 12 for every overlay, pills only for chips, avatars and icon-only circles.
  **Why** The measured systems keep 3-4 non-pill radii; overlays at one radius tie menus, toasts, command and modals together.
  **Applies to** SaaS app UI. **Check** distinct non-pill radii in a view <= 5; all overlays share one radius. **Source** Geist 4 / 6 / 8 / 12 [M]; Linear 4 / 8 / 9 / 12 + pills [M]; Cursor 4 / 8 / 10 + pills [M]; Stripe docs 4 / 6 [M]; shadcn 4 / 6 / 8 / 10 / 14 [G][M]; founder ladder 8 / 12 / 16 / 22 (founder-taste.md, owned).

- **RULE [PU-38]** Draw focus as a 3 px ring outside the control in the accent at 40-50% alpha (or 2 px solid + 2 px offset), visible on keyboard focus only; never remove it and never use it as the selected style.
  **Why** A soft wide ring is visible on any surface without shifting layout; reusing it for selection confuses focus and state.
  **Applies to** SaaS app UI. **Check** `:focus-visible` box-shadow or outline width 2-3 px with alpha 0.4-0.5 (or solid with offset). **Source** Linear `0 0 0 3px rgba(94,106,210,.4)` on one control in the kanban mock (focus or selection) [M]; shadcn `0 0 0 3px` ring colour at 50% [G][M]; fixing-accessibility guidance.

### 2.7 Premium vs generic

- **RULE [PU-39]** Before shipping a product screen, run the generic-tell audit and fix every hit: sidebar > 264 px; nav pitch > 32; nav labels 14/400 black; 16 px stroke-2 icons; table rows > 44 (single-line); KPI figures > 24 px; a filled dark CTA in the sidebar; more than 5 font sizes; uppercase tracked group labels; zebra rows; coloured selection outlines.
  **Why** Each item is a measured default of the generic baseline that no premium product in the set shares; together they are the "too noobish" verdict in numbers.
  **Applies to** SaaS app UI | hero dashboards. **Check** all eleven checks pass in `check.mjs`-style probes (proposed), or each hit is an override in DIRECTION.md. **Source** shadcn dashboard-01 [G][M] vs Linear, Geist, Cursor [M], Attio, Kargul, Rico [R]; founder verdicts on Acquisity v1/v2 and Tandem.

- **RULE [PU-40]** Put at least six micro-details on every primary screen, chosen from: counts beside group and tab labels, relative timestamps in one right column, diff or delta counts in green/red, unread dot + dimmed read rows, presence dots on avatars, a keycap hint, one truncated string, muted units after values, IDs in the secondary grey, status glyphs (ring / half / full) instead of words, a model or version badge, an empty/zero state in one cell; every one must reconcile with the rest of the data.
  **Why** Micro-details are what make a screen believable at a glance; one wrong sum or reset counter undoes them (Clay's table numbers rows 1-7 then 4-9).
  **Applies to** SaaS app UI | hero dashboards. **Check** count of the listed detail types visible in the view >= 6; sums, counts and sequences reconcile (script per PUI-46). **Source** Linear, Cursor, Dub, Geist [M]; Linear inbox, Campsite, Notion Calendar [P]; Clay row-number slip [P] (counter-example).

## 3. Numbers & scales

### 3.1 Method and caveats

Playwright Chromium, 1440x900, DPR 2; light everywhere, dark for Geist (11 pages), shadcn dashboard-01 and the Linear windows (dark by default). An in-page probe read `getComputedStyle` on every visible descendant of a page or of a detected product window and bucketed text tuples, control heights x radius, rows, icons, radii, shadows (transparent Tailwind layers stripped), borders, surfaces and floating layers; menus, command menus, modals, toasts and filters were opened by clicking. Raster shots were rendered at natural size and measured with a hairline/text-band scanner; export scale is stated per number ("2x" assumed when the image is about twice the rendered width and the text bands match 12-14 px; "inferred" when computed from digit or cap heights). Caveats: Linear's homepage windows are marketing DOM, not the shipped app (they match the shipped app's metrics closely, and Linear's kanban uses 10 px IDs that may be scaled); Geist numbers come from its docs demos; shadcn is the generic baseline by design; Dub's KPI figures render through a number component that the probe did not read; height.app is offline; logged-in products (Notion, Superhuman, Mercury, Ramp, Plain, Supabase Studio, Arc) were measured only from their marketing images.

### 3.2 App shell anatomy

| product | sidebar w | nav row h / pitch | nav text | icons | group label | active state | top bar | right pane |
|---|---|---|---|---|---|---|---|---|
| Linear (DOM window 1320 wide) [M] | 232 (inset 8 in window) | 28 / 30, r8, pad 0 7, gap 8 | 13/510 #d0d6e0 | 14 (custom, stroke ~1); header 16 | 24 row, 12/510 #62666d, 16 px above | white 4% fill | 44, hairline white 5%; ID + title 12/510; pager "1 / 84" | properties 207; agent panel 398 (header 48) |
| Attio [R attio-product-ui.md] | 238 + 1 hairline, #fbfbfb | 28-32 / 32 | 14/500 | 14-16 | 12/16/500 #75777c, chevron | #f4f5f6, r9 | 48 (24 tile r7) | record column ~340 |
| Kargul CRM [R kargul-crm-teardown.md] | 254 | 30 | 14/500 | 14 | 12 eyebrow (uppercase in that product) | raised fill + micro-shadow | 58 | sheets 480/560 |
| Rico [R heyrico-recreation-lessons.md] | 256-260, pad 12 | 28 / 30 | 13/500 | 14 at ~1.25 | 11-12 sentence case | #ededed r8 | 32 workspace row | n/a |
| Campsite [P, 2x] | ~240 | ~28 / 31; group pitch 43.5 | ~14/500 | 16 | 12 "Favorites", "Channels" with caret | grey fill r8 | none (page title 36 px in content) | people panel ~240 with presence |
| Cursor agent window [M] | list pane 219 | 51 (two-line), pad 10 12 10 14 | 12/400 | 14-16, stroke 1 | 11/14 uppercase +0.05 px | #ebeae5 fill | 51 window bar | chat 314 + preview |
| Notion Calendar [P, ~2.6x] | ~230 | 27 (mini-month) | ~14/400 | 16 | 12 account email | today = red square | 44 (Week, Today controls) | task pane ~190 |
| shadcn dashboard-01 [G][M] | 288 (272 + 8 inset) | 32 / 36, r8, pad 8, gap 8 | 14/400 black | 16 stroke 2 | 12 "Documents" | grey fill | 48 | n/a |

### 3.3 Buttons and small controls by height

| height | Geist [M] | Linear [M] | Cursor [M] | Cal.com [M] | shadcn [G][M] | others [R] |
|---|---|---|---|---|---|---|
| 16-20 | kbd 20 r4 12/400; badge 20 pill 11/500 | model badge 18 r4 11/400 | mode chip 20 pill 11/400; send 20 circle | | count/checkbox 16 r4 | Attio kbd 18 r6; Rico chip 20 r6 |
| 22-24 | badge 24 pill 12/500; icon button 24 r4 | label chip 24 pill 12/510; code chip 24 r4 12/400 | | 24 weekday | badge 22 pill 12/500 | Attio chip 22 r7; Kargul tag 22 pill |
| 28 | | nav + buttons 28 r8; icon buttons 28 pill | icon buttons 28 r4 | 28 r10 | 28 r8 | Attio toolbar 28 r9; Rico filter 28 r6 |
| 30-32 | sm button 32 r6 14/500 pad-x 6; select 32 r6; tab 32 r6 13 | | | 30 r10 | button 32 r8; menu item 32 r6 | Kargul action 30 pill; Rico button 32 r10 |
| 36 | md button 36 r6 pad-x 10; input 36; menu item 36 r6; command item 36 r6 | group header 36 r8 | | slot 36 r10 | input/button 36 r8 | Kargul field 36 r8 |
| 40 | lg button 40 r8 16/500 pad-x 14; input 40 16 px | issue row 40 | | | | |

### 3.4 Tables and lists

| product | row h | header h / style | cell padding | grid | numbers | in-cell items |
|---|---|---|---|---|---|---|
| Attio [R] | 36 pitch | 35 + hairline, 14/500 ink with type icon | 9-10 right | full grid #e6e7ea | right, tabular, unit in header | chips 22 r7, person pill 22 r11 |
| Geist [M] | 40 | 36, 14/500 #4d4d4d | 10 8 | row hairlines | right-aligned column | n/a |
| Linear list [M] | 40 | none (group headers 36) | 0 28 0 36 | none | n/a | label chips 24, avatar 16, date 12 |
| Kargul [R] | 42 + 1 | 38, 12/#676767 | 12 | row hairlines #232323 | right, tabular, muted $ | tags 22 pill |
| Linear insights [P, 2x] | 44 | 13-14 grey | 16 | row + column hairlines white | count column | priority bar glyphs |
| Dub [M] | 45 | 14/500 ink | ~16 | full grid #e5e5e5 | "$49 USD", unit #a3a3a3 | favicon, avatar 16, flag 16 |
| Clay [P, 2x assumed] | ~47 | 14/400 grey on #f7f7f2 | ~12 | full grid | left-aligned (counter-example) | highlighted row yellow-green |
| Cursor runs [M] | 51 (2 lines) | uppercase eyebrow | 10 12 10 14 | none | "+20 -3" green/red | status check 16 |
| shadcn [G][M] | 53 | 40, 14/500 ink | 8 | row hairlines #e5e5e5 | left | outline badge 22, drag handle |

### 3.5 Overlays

| layer | Geist [M] | shadcn [G][M] | Kargul [R] | Linear [M] |
|---|---|---|---|---|
| menu | 200 w, r12, pad 6, items 36 r6 px8 14/400, destructive text #cb2a2f | 128 w, pad 4 + 1 border, items 32 r6 pad 6 8 14/400 | 168 w, r8, pad 4, items 28 r6 12 px | n/a |
| menu/toast shadow | ring 8%; 0 1 1 2%; 0 4 8 -4 4%; 0 16 24 -8 6% (dark ring white 14.5%) | 0 4 6 -1 10%; 0 2 4 -2 10% + border | 0 16 40 + ring + border | chat panel 0 2 32 25% [R] |
| command | 640 x 321, r12, input 18 px, Esc kbd 20, label 13/19.5, items 36 r6, list pad 8, selected black 5% | n/a | input row 48, column header 36, rows 40, r12 | n/a |
| command shadow | ring; 0 1 1 2%; 0 8 16 -4 4%; 0 24 32 -8 6% | | | |
| modal | 540 w, r12, title 20/26/600/-0.4px, body 14/20, buttons 32 | | header 77, title 16/600, pad 20/24, scrim 55-60% | |
| modal shadow | ring 8%; 0 32 72 -12 6%; 0 8 32 -12 8%; 0 8 24 -12 12% | | | |
| toast | r12, 14/21, dismiss 32, 24 px from bottom-right | | notifications popover 400 w r12 header 56 | |

### 3.6 Type per product (main view)

| product | sizes (share) | weights | tracking | families |
|---|---|---|---|---|
| Linear window [M] | 12 (70%), 13 (22%), 10, 11, 14, 16, 20 | 400 / 510 / 500 / 590 | normal | Inter Variable (+ Berkeley Mono for code [R]) |
| Cursor agent [M] | 11, 12, 13 (+ 17.28 serif in the preview) | 400 / 500 | 11 px +0.0484 px | system sans + mono 12/19.5 |
| Geist docs [M] | 14/20 body, 13, 12/16, headings 20/26/600 and 24/32/600 | 400 / 500 / 600 | -0.4 px at 20, -0.96 px at 24 | Geist, Geist Mono |
| Stripe docs [M] | 13/20 (code), 16/26 body, 12/16/500 labels, 14/20/600 | 400 / 500 / 600 | normal | system UI + Menlo |
| Cal.com booking [M] | 14/20/500, 12/16/500 +1.2 px weekday labels, 16/24/600 month | 300 / 400 / 500 / 600 | weekday +1.2 px | Inter + Cal Sans |
| Dub [M] | 14/24 cells, 14/20 | 400 / 500 | normal | Inter-class |
| shadcn [G][M] | 14 (67%), 12, 16, 30 | 500 / 400 / 600 | normal | Geist |

### 3.7 Colour roles

| role | Geist light | Geist dark | Linear dark | Cursor warm | shadcn light / dark [G] |
|---|---|---|---|---|---|
| page | #ffffff | #000000 | #08090a | #f2f1ed | #ffffff / #0a0a0a |
| panel / sidebar | #fafafa | #0a0a0a | #0f1011 | #f7f7f4 | #fafafa / #0a0a0a |
| raised / hover | #f2f2f2 | white 6% | #161718; white 2-4% | #ebeae5 | #f5f5f5 / #262626 |
| text primary | #171717 | #ededed | #d0d6e0 (emphasis #f7f8f8) | #26251e | #0a0a0a / #fafafa |
| text secondary | #4d4d4d | #a1a1a1 | #8a8f98 | #26251e 60% | #737373 / #a1a1a1 |
| text tertiary | #8f8f8f | #8f8f8f | #62666d | #26251e 40% | |
| ring / edge | black 8% | white 14.5% | white 8%; inset #23252a | ink 10% | border #e5e5e5 / white 10% |
| hairline | #ebebeb | #1f1f1f-#2e2e2e | white 5% | ink 8% | #e5e5e5 / white 10% |
| danger text | #cb2a2f | #ff6166 | #f34e52 | #cf2d56 | red-600 |
| success | #297a3a | | #27a644 | #1f8a65 | |

### 3.8 Pixel measurements on raster shots

| shot | scale | measured |
|---|---|---|
| Linear insights dashboard (`linear-insights-img0`) | screenshot 2x of a ~1:1 export | table rows 44 px; hairlines white-alpha (L 19-41 on page L 13); KPI "58m" ~56 px display figure |
| Linear Inbox dark (`raster-linear-changelog-6`) | zoom ~4.6x | two-line rows 263 px pitch = ~57 px; avatar 0.65 x pitch; times 1h/4h/13h/22h |
| Notion Calendar (`raster-notion-calendar-6`) | ~2.6x inferred | hour pitch ~58; mini-month pitch ~27; task lines ~27 |
| Campsite feed (`raster-campsite-0`) | 2x assumed | sidebar pitch 31, group pitch 43.5; feed title-to-preview 23.5, item pitch 68 |
| Clay table (`raster-clay-4`) | 2x assumed | rows ~47; full grid; row numbers repeat (data slip) |

## 4. Dos and Don'ts

- **Do** run nav at 28 on a 30 pitch with 13/510 labels and 14 px icons (Linear). **Don't** ship 32 on 36 at 14/400 with stroke-2 icons (shadcn dashboard-01).
- **Do** keep the sidebar top quiet: workspace mark + name + chevron, two 28 px pill icon buttons (Linear). **Don't** open the sidebar with a full-width black "Quick Create" pill (shadcn).
- **Do** put a count beside every group and tab label ("In Review 3", "Priority 4"). **Don't** leave group headers as bare words.
- **Do** right-align numbers with muted units ("$49 USD", Dub). **Don't** left-align numbers in a numeric column (Clay).
- **Do** keep row numbers, sums and timestamps coherent (Dub's events step back 4 minutes per row). **Don't** reset a sequence mid-table (Clay rows 1-7, then 4-9).
- **Do** make every overlay r12 with the same ring and rising soft layers (Geist). **Don't** mix a borderless shadow-md popover with ringed menus in one product.
- **Do** dim read inbox rows to the secondary tier (Linear). **Don't** bold unread rows and also colour them.
- **Do** show an agent's work as process rows and result cards (Cursor, Linear). **Don't** draw the agent's answer in a coloured bubble.
- **Do** select by fill one step away (Geist command 5%, Linear 4%). **Don't** outline the selected card (Dub's 2 px black KPI border is the one exception measured and still reads heavy).
- **Do** use one badge grammar. **Don't** combine solid, tinted and outline chips in one table.

## 5. Exceptions & judgement calls

- `[engine note]` **Founder ladder wins over peer averages.** The measured peers put 32 px controls at r6-10; the founder-accepted Kestrel ladder (8 / 12 / 16 / 22) is owned. `tokens.json` lists the peer range and the founder default separately; builds use the founder default unless DIRECTION.md says otherwise.
- **Uppercase eyebrows** are a real premium-product choice (Cursor, Kargul CRM) but the founder ruled them out for engine product UI; keep sentence case.
- **Full grids** are right for spreadsheet products (Attio, Clay, Dub events). Declare it; do not default to it.
- **Solid badges** (Geist) suit status-heavy developer tools with few badges per screen; in CRM tables with a badge per row they get loud fast, so prefer tinted or outline.
- **Geist's 14 px base and 36-40 px menu items** are comfortable-density; Linear/Kargul/Rico are dense (12-13 px, 28-30). Pick one density per product and change it with padding, not height (consistency-mechanics.md).
- **Warm neutrals** (Cursor, Granola) work only with a monotone ramp and hairlines in the same hue; a warm page with cool grey text reads dirty.
- **Linear's 10 px kanban IDs** are below the 11 px floor of PUI-33; treat them as decorative meta in a marketing mock, not a product standard.
- **shadcn is not "bad"**: it is a neutral starting kit. Its defaults are the counter-example only because premium products all tighten them in the same direction.

## 6. Figures worth keeping

All under `knowledge/benchmarks/product-ui/deep/`.
- `linear-home-win1.png`: dark app window, sidebar 28/30, issue header, activity, agent panel with process line and result card. `linear-home-win0.png`: grouped issue list + code diff. `linear-home-win2.png`: kanban + Slack-style thread.
- `cursor-frame2.png`: warm light agent window (runs list, process rows, file-change cards, composer, live preview, CLI overlay).
- `dub-analytics-frame0.png`: KPI cards with sparklines and a coherent events table with muted units.
- `geist-menu-open.png`, `geist-command-menu-open.png`, `geist-modal-open.png`, `geist-toast-open.png` (+ `-dark`): overlay tiers; `geist-button.png`, `geist-table.png`, `geist-badge.png`, `geist-materials(-dark).png`: control ladder, table, badges, material shadows.
- `shadcn-dashboard01-fold.png` (+ `-dark-fold`): the generic baseline to diff against.
- `raster-linear-changelog-6.png` (inbox), `raster-linear-changelog-1.png` (usage chart), `raster-notion-calendar-6.png` (calendar + tasks), `raster-campsite-0.png` (feed + presence), `raster-superhuman-3.png` (Docs AI panel), `raster-clay-4.png` (spreadsheet table and its numbering slip), `raster-alignui-pro-0/1.png` (AI chat and analytics templates), `raster-mercury-invoicing-2/3.png`, `raster-ramp-bills-2.png` (approval), `cal-booking-frame0.png` (booking calendar).

## 7. Open questions

- The shipped Linear, Notion Calendar, Superhuman and Plain apps were not measured logged-in; numbers come from marketing DOM and raster shots. A founder-provided screen recording of a real workspace would confirm row pitches.
- Hover and pressed states were measured only where a state was exposed (selected items, tabs); hover deltas rest on Geist and Linear selected fills.
- Switch, checkbox, skeleton and onboarding-checklist numbers are taken from earlier studies (Rico, Kargul, consistency-mechanics.md); a dedicated pass on Radix Themes and Geist switches would tighten them.
- The generic-tell audit (PU-39) is not yet a `check.mjs` probe; the checks are written so they can be added without changing thresholds elsewhere.
