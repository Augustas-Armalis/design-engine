---
source: web:attio.com (home, /platform/data, /platform/reporting, /platform/workflows, /platform/ai, /platform/ask, /platform/call-intelligence, /platform/productivity, /platform/sequences, /platform/enrichment, /platform/universal-context, /changelog + 7 changelog entries, /help + 3 help articles)
chapter: Attio product UI - shell, records table, kanban, record page, reports, filters, command menu, colour, type, motion; plus a 6-round 1:1 recreation of the Deals table
pages: n/a (web; Playwright 1440x900 @2x, measured 2026-10-09)
topic_tags: [saas-app-ui, product-ui, crm, table, sidebar, kanban, record-page, filters, command-menu, chips, attribute-types, reports, charts, density, typography, colour, shadows, motion, recreation, benchmark, attio]
status: studied
---

# Attio product UI: what "premium CRM at high density" is made of

Private study, credit Attio. Founder trigger: the engine's `work/acquisity-dashboard` was rejected as "nothing like Attio... too noobish" (`knowledge/founder/founder-taste.md`, last rule: the product-UI bar is Kargul, heyrico and Attio; recreate reference screens 1:1 before building). This note is the evidence for that bar. Nothing was signed into, nothing published.

**Evidence (all in `knowledge/benchmarks/attio/`)**
- `fold-*.png` / `full-*.png`: 23 pages at 1440x900 @2x (home, 10 platform pages, changelog + 7 entries, help + 3 articles). `imgs-*.json`: every image/video each page serves.
- `img/`: 53 product images downloaded at the largest size served (most 2000-4536 px wide), including the 4536x2252 original of the Deals table used for the recreation (`img/data-sales-screen-original-4536x2252.png`), the record-page, activity-timeline, current-user-filter and workflows changelog shots (3840x2160), 7 help-doc screenshots (lists, view switcher, filter builder, report types, report table, report menu, templates), the redesigned command palette, sequences, reporting, call intelligence, AI and productivity bento images, and the Vimeo poster of the kanban changelog video. All were read.
- `measure-home-*.json` + `crop-home-*.png`: computed styles of every element in the six live-HTML product blocks on attio.com (hero app window, Companies table + send-email panel, kanban, workflow canvas, charts + AI answer, record page). Summaries via `work/study-attio/tools/analyze.cjs`.
- `slices/home-*.png`: the homepage scrolled in 850 px steps (live UI in context). `motion/*-contact.png`: time-lapse frames of the live kanban and table animations; `motion/ci1-contact.png` shows the call-intelligence video is only a webcam clip.
- `work/study-attio/round-1..6.png` (+ `.json` diff stats): the recreation.

Tags: [M] measured from live DOM, [R] measured from the 4x reference raster (hairline/ink-band/colour probes), [V] visual reading of a served image, [X] learned in the recreation.

## 1. Core ideas

1. **One text style does 90% of the work: Inter 14/20 at weight 500.** In the live table 45 of 49 text nodes are 14/500; in the hero window 27 of 47; in the kanban 48 of 72. Hierarchy comes from colour (ink, 55%, 40% black) and from 600 on a handful of titles, not from size. The whole product uses two weights (500, 600) and sizes 10-20, with 14 dominant. [M]
2. **Everything interactive is 28 px; rows are 32 (nav) and 36 (table).** Toolbar buttons, icon buttons, kanban card actions, sidebar items (24.6 rendered = 28 x 0.88 frame scale) are 28 high with radius 8-9; the table header is 35 and rows 36 on a 1 px grid; sidebar items step 32 px. [M][R]
3. **The shell is greyscale; colour lives only in data.** Sidebar #fbfbfb, canvas #fff, hairlines #eeeff1 (chrome) and #e6e7ea (grid). Colour appears in record-type tiles (14 px, solid), view-type tiles, status/select chips, avatar rings and company logos, never in chrome, borders or headings. The only chromatic UI control is the primary blue button (#266df0). [M][R]
4. **Edges are drawn with blur, not with lines.** Floating controls carry `0 0 2px rgba(28,40,64,0.18), 0 1px 3px rgba(0,0,0,0.04)`: a 2 px soft halo instead of a 1 px ring. At 4x the edge ramps 251-250-249-248-246-243-242-239 over 2 px; a hard 1 px ring reads cheaper next to it. Cards and windows use a 1 px hairline (#eeeff1 or 5-6% black) and at most a whisper of shadow. [M][R][X]
5. **Every chip is a three-value recipe: tint fill, one-step-darker 1 px border, deep text.** Blue #e5eeff / #d6e5ff / #183c81, green #ddf9e4 / #c7f4d3 / #075a39, purple #f5eeff / #e8ddfe / #4711bb, cyan #daf4fc / #c3edf9 / #0a5a70, yellow #fff3cc / #ffebad / #705500, pink #feecf1 / #fddde7 / #6f065d, grey #f4f5f6 / #eeeff1 / #5c5e63. 22 high, radius 7, 5 px side padding, same 14/500 as the cell. [R]
6. **Attribute types each have one rendering, everywhere.** Record name = 16 px logo + text with a 1 px #e7e7e7 underline; select/status = tinted chip; person/relationship = pill (radius 11, #fbfbfb fill, #e6e7ea border, 12 px round avatar, grey text); currency = right-aligned ink number; email = blue chip; date = plain ink; score = green chip; stage = 8-12 px dot + label. Reused across table, kanban card, record page and filter builder. [R][V][M]
7. **Real proof at tiny size makes it believable.** Real company logos at 16 px (Retool, Stripe, Notion...), real photos in 12-20 px avatars, believable names, amounts that vary in magnitude ($3,200 to $100,200), footer aggregates ($83,560,165 sum, 2,813 count). Nothing is a grey placeholder bar. [R]
8. **Density is high but the grid is calm.** 10 rows, 5 columns, 3 toolbars and a full sidebar in 1134x563; it stays calm because every row aligns on 4 px (row text bands every 36.00 px exactly), every column shares one padding (8 px), and all text is one size. [R]
9. **Toolbars are layered by role, each its own 48 px band with a hairline:** title + presence (48), view switcher + view actions (48), sort/filter (46), then the table. Empty sort/filter are dashed ghost chips, so the bar shows its affordance without noise. [R]
10. **Overlays reuse the same pieces:** the command palette, view-switcher dropdown, filter builder, templates modal and compose window are white r12-16 surfaces with the soft halo shadow, 28-32 px rows, grey uppercase 12 px group labels, keycaps for shortcuts and a footer bar with ↑↓ Navigate + secondary + primary(↵). [V]
11. **Marketing shows the product as live HTML, scaled 0.88-1.0, inside a frame recipe** (frame r16, 6 px padding, inner window r12 with 5% border, ring 6% + four stacked 2.4-4% shadows) and lets it act (cards drag, panels slide in, text streams). [M]
12. **What the rejected Acquisity dashboard did instead** (read from `work/acquisity-dashboard/dashboard-1440x900.png`): greeting header, KPI strip, area chart, uppercase sidebar labels, 32-40 px controls, one accent everywhere, no logos or photos, no records. It looks like a dashboard template; Attio looks like a database you work in. The fix is records-first structure and data-type rendering, not more polish on cards. [V]

## 2. Rules

### 2.1 Shell (sidebar, top bar, layout)

- **RULE** Build the app shell as sidebar 238 px (237 + 1 px right hairline #eeeff1) on #fbfbfb, main canvas #fff, and stack the main area as 48 px bands each closed by a 1 px #eeeff1 hairline (title bar, view bar, sort/filter bar 46 px), with the table directly under them.
  **Why** Equal bands separated by hairlines give a calm, scannable chrome; the sidebar tint is the only surface change.
  **Applies to** SaaS app UI. **Check** sidebar width 236-240; hairline y positions at 48/96/142 (+/-1) in a 563 px tall view; sidebar bg within 2 levels of #fbfbfb. **Source** img/data-sales-screen (hairline scan at 4x: y 48, 96, 142, 177; x 237) [R]

- **RULE** Make sidebar nav rows 32 px pitch with a 14 px icon at x 15, the label at x 35 (gap 6, row padding 8), 14/20 weight 500 tracking -0.28 px in #242629.
  **Why** One pitch and one icon column make 15 nav items read as a single list.
  **Applies to** SaaS app UI. **Check** consecutive nav label tops differ by 32.0 px; icon left edge 15 +/- 1; label left 35 +/- 1. **Source** img/data-sales-screen ink bands 106, 138, 170, 202, 234, 266 [R]; hero window rows 24.6 = 28 x 0.88 with padding 0 8 gap 6 [M]

- **RULE** Mark the active sidebar row with a #f4f5f6 fill, radius 9, inset 6-8 px from both sidebar edges, and nothing else (no accent bar, no bold, no icon tint).
  **Why** Selection is a state; a neutral fill keeps colour reserved for data.
  **Applies to** SaaS app UI. **Check** active row bg rgb(244,245,246) or rgb(238,239,241); no border/outline; font-weight unchanged. **Source** img/data-sales-screen (Deals row) [R]; hero window Home row bg rgb(238,239,241) r9 [M]

- **RULE** Group sidebar sections under 12/16 weight 500 labels in #75777c with a 12 px chevron at x 19 (collapsible), sentence case, never uppercase, with 8 px extra space above each group.
  **Why** Sentence-case grey labels with a disclosure chevron are quieter than uppercase eyebrow labels and show the groups can fold.
  **Applies to** SaaS app UI. **Check** section label fontSize 12, weight 500, text-transform none, colour rgb(117,119,124) or 55% black; chevron present. **Source** img/data-sales-screen ("Favorites", "Records") [R]; hero window "Favorites"/"Records" 12/500 55% black [M]

- **RULE** Give each record type in the sidebar a 14 px solid colour tile, radius 4, with a white filled 10 px glyph (People and Companies #266df0, Deals #fd9038, Partnerships #0eb472, Invoices #dba600); use outline 14 px icons for app sections (Notifications, Tasks, Notes, Emails, Reports, Automations).
  **Why** Filled tiles mark "data you own" and become the object's identity across views, chips and filters; outline icons mark tools.
  **Applies to** SaaS app UI. **Check** record-type icons 14x14 radius 3.5-5 with solid bg and white glyph; tool icons are stroke icons with no fill. **Source** img/data-sales-screen colour probe [R]; hero window object tiles 14 r4.8 with 5% border [M]

- **RULE** Put the workspace switcher in a 48 px header: 24 px logo tile radius 7, 8 px gap, name 16/600 tracking -0.3 px, a 16 px chevron, and a sidebar-collapse icon (18-20 px, #75777c) right-aligned at 15 px from the edge.
  **Why** The switcher is the only 16/600 element in the sidebar, which anchors the column without a big logo.
  **Applies to** SaaS app UI. **Check** header height 48 +/- 1, logo 24 px, name 16/600. **Source** img/data-sales-screen [R]; hero window workspace name 16/600 [M]

- **RULE** Put "Quick actions ⌘K" and a search icon button with a "/" keycap as two 28 px white buttons (radius 9, gap 8) directly under the workspace header; widths about 161 and 50.
  **Why** Keyboard entry points are the first thing in the sidebar; keycaps teach the shortcut without a tooltip.
  **Applies to** SaaS app UI. **Check** two buttons, height 28, radius 8-9, each with a kbd chip 18 high radius 6 and 11 px grey text. **Source** img/data-sales-screen [R]; hero window Quick Actions 167x24.6 r8, kbd 24x17.6 r6 border 5% [M]

- **RULE** Show presence in the title bar as 24 px avatar rings overlapping by 8 px (1 px ring in a distinct colour per person, 1 px white gap, 20 px photo or initial) followed by a 22 px "+1" circle in #f8f9fa with a #e6e7ea border.
  **Why** Coloured rings make a collaborative product visible at 24 px without a "Share" call-out.
  **Applies to** SaaS app UI. **Check** avatar 24 px, negative margin -8, ring colour differs per avatar, overflow chip 22 px 10 px text. **Source** measure-home-table (rings 24 px, border 1px #266df0 / #9b69ff / #f97514, "+1" 22 px) [M]; img/data-sales-screen [R]

### 2.2 Records table

- **RULE** Set table rows to 36 px pitch with a 1 px #e6e7ea bottom and right grid line on every cell, the header row 35 px plus its hairline, and cell padding 0 8 px; omit the last column's right line.
  **Why** A full grid in a very light grey reads as a spreadsheet you can edit, which is the product promise; 36 px holds a 22 px chip with 7 px air.
  **Applies to** SaaS app UI. **Check** row text bands repeat every 36.0 px; grid colour rgb(230,231,234); cell padding-left 8. **Source** img/data-sales-screen (rows 178 + 36n) [R]; measure-home-table (cells 36 high, border-bottom 1px #eeeff1, padding 0 8) [M]

- **RULE** Write column headers as 14/500 ink (not grey, not uppercase) with a 14 px attribute-type icon 6 px before the label; the first column carries the select-all checkbox and a 12 px "+" (add column) right-aligned.
  **Why** The icon tells the data type (tag, currency, person, select) so the header can stay the same size and colour as the cells.
  **Applies to** SaaS app UI. **Check** th fontSize 14, weight 500, colour equals cell ink, text-transform none, one icon per header. **Source** img/data-sales-screen ("Deal +", "Type", "Potential value (USD)", "Point of contact", "Source") [R]; measure-home-table headers 14/500 rgb(36,38,41) with 13 px icons [M]

- **RULE** Make the primary column a 16 px checkbox (radius 5, 1 px #ccc border in rows, #e6e7ea in the header), 10 px gap, a 16 px company logo, then the record name with a 1 px #e7e7e7 underline offset 2-3 px under the baseline.
  **Why** The light underline says "this opens a record" without link-blue; logos make each row a real company at a glance.
  **Applies to** SaaS app UI. **Check** first-column cell contains checkbox 16 px, img 14-16 px, underlined name; underline colour lightness >= 90%. **Source** img/data-sales-screen [R]; measure-home-table (text-decoration underline, logos 14 px) [M]

- **RULE** Right-align currency and numbers in ink 14/500 with 9-10 px right padding, keep the unit in the header ("Potential value (USD)"), and let magnitudes vary naturally ($3,200 to $100,200).
  **Why** Right alignment lets the eye compare magnitudes; putting the unit in the header removes repeated noise from 10 cells.
  **Applies to** SaaS app UI. **Check** numeric cells justify-content flex-end; currency code appears once in the header. **Source** img/data-sales-screen [R]

- **RULE** End the table with a 26 px aggregate row: "2,813 count", "$83,560,165 sum" (value in #111, label in #75777c, 8 px gap, right-aligned) and "+ Add calculation" in #75777c in every other column.
  **Why** Aggregates prove the table is a live database, and the grey "+ Add calculation" shows the capability without a button.
  **Applies to** SaaS app UI. **Check** footer row present; value darker than its label; empty columns show an add affordance. **Source** img/data-sales-screen; img/help-lists ("24 count", "+ Add calculation") [R][V]

- **RULE** Fill a demo table with 10+ rows of real-looking records (recognisable company logos, photographed contacts, varied amounts, mixed statuses) and label it as sample data in the surrounding page.
  **Why** Believability comes from variety and real faces/logos at 12-16 px; uniform rows or grey bars read as a wireframe.
  **Applies to** SaaS app UI | landing page. **Check** >= 8 rows; >= 4 distinct chip values per select column; avatars are photos or initials with colour, not grey blobs. **Source** img/data-sales-screen, img/help-lists, measure-home-table [R][V]

### 2.3 Chips and attribute types

- **RULE** Render select and status values as chips 22 px high, radius 7, padding 0 5 px, 1 px border one step darker than the fill, text 14/500 in the deepest shade of the same hue (blue #e5eeff/#d6e5ff/#183c81, green #ddf9e4/#c7f4d3/#075a39, purple #f5eeff/#e8ddfe/#4711bb, cyan #daf4fc/#c3edf9/#0a5a70, yellow #fff3cc/#ffebad/#705500, pink #feecf1/#fddde7/#6f065d, grey #f4f5f6/#eeeff1/#5c5e63).
  **Why** The darker border crisps the chip edge on white at 1x; the deep same-hue text passes contrast without turning the chip into a badge.
  **Applies to** SaaS app UI. **Check** chip height 22, radius 6-8, border colour differs from fill by 1 step of the same hue, text contrast >= 4.5:1 on the fill. **Source** img/data-sales-screen colour probes on 30 chips [R]

- **RULE** Use the same chip height and text size as the cell text (22 px chip in a 36 px row, 14 px text); never shrink chip text to 11-12 px inside a table.
  **Why** Same-size chips keep one baseline across the row; smaller chip text is what makes generated tables look fiddly.
  **Applies to** SaaS app UI. **Check** chip fontSize equals neighbouring cell fontSize. **Source** img/data-sales-screen; measure-home-table score chip 22 px 14/500 green rgb(0,125,83) on rgb(224,252,237) border rgb(203,247,225) r7 [R][M]

- **RULE** Render a person/relationship value as a pill: 22 px high, radius 11, #fbfbfb fill, 1 px #e6e7ea border, 12 px round photo at 5 px left padding, 6 px gap, name in #75777c.
  **Why** A pill (not a chip) says "this is a linked record"; grey text keeps a column of names quieter than the status chips beside it.
  **Applies to** SaaS app UI. **Check** relationship cell uses full-round radius, avatar 12 px, text colour lighter than ink. **Source** img/data-sales-screen ("Emily Johnson" ...) [R]

- **RULE** Give each attribute type one rendering and reuse it in table, kanban card, record page and filter builder: name = logo + underlined text, select = chip, person = avatar + name, currency = "USD" grey + amount ink, date = ink text, email = blue chip, stage = 8-12 px dot + label.
  **Why** Consistent type rendering is what lets a dense CRM feel learnable; the eye learns the vocabulary once.
  **Applies to** SaaS app UI. **Check** the same attribute renders with the same component in every view. **Source** img/data-sales-screen, slices/home-05 (kanban "USD $20,800"), crop-home-record (email chip), img/help-lists (stage dots) [R][M][V]

- **RULE** Show an AI-filled or computed attribute with a small sparkle icon in its column header (Industry ✦, Research agent ✦) and keep the cell itself styled like any other value.
  **Why** The provenance is in the schema, not in every cell; the data stays calm.
  **Applies to** SaaS app UI. **Check** AI columns marked once at the header; cells unchanged. **Source** img/help-lists, measure-home-table ("ICP Score" and "Research agent" headers with 13 px sparkle at 40% black) [V][M]

### 2.4 Controls, view switcher, sort and filter

- **RULE** Build toolbar buttons 28 px high, radius 9, white, with the soft-halo shadow `0 0 2px rgba(28,40,64,0.18), 0 1px 3px rgba(0,0,0,0.04)` and no border; 14 px icon, 6 px gap, 14/500 ink label, 6-7 px left and 9-10 px right padding.
  **Why** The 2 px blurred halo gives a crisp-but-soft edge that a 1 px ring cannot; asymmetric padding optically centres icon + text.
  **Applies to** SaaS app UI. **Check** button height 28, radius 8-9, box-shadow contains a 0 0 2px layer at alpha 0.15-0.2 and no 0 0 0 1px ring. **Source** measure-home-hero-window and measure-home-workflow (same shadow token on buttons and nodes) [M]; edge ramp at 4x [R]

- **RULE** Make the primary in-app button #266df0 with a 1 px rgba(0,0,0,0.1) border, white 14/500 text, 28 px high radius 8, and a blue-tinted shadow `0 2px 4px -2px rgba(15,107,233,0.12), 0 3px 6px -2px rgba(15,107,233,0.08)`; one per view.
  **Why** A tinted shadow keeps the blue from looking pasted on white; one primary per view keeps it meaningful.
  **Applies to** SaaS app UI. **Check** at most one bg #266df0 button per view; its shadow colour is blue-tinted. **Source** measure-home-table ("New person") [M]; img/help-lists ("Add Company"), img/sequences-preview ("Enroll recipients") [V]

- **RULE** Show the active view as a white 28 px dropdown button whose leading 14 px tile encodes the view type (green 2x2 grid = table, orange columns = kanban), followed by the view name and a chevron; put "View settings" next to it or at the right with "Import / Export".
  **Why** The tile tells the layout before you read the name, and the switcher lives where the data is, not in a tab bar.
  **Applies to** SaaS app UI. **Check** view switcher has a coloured type tile + name + chevron. **Source** img/data-sales-screen ("All deals"), img/help-create-new-view ("Candidate Pipeline" orange, "All Applications" green), measure-home-table ("All Companies" 12 px green icon) [R][V][M]

- **RULE** Make the view-switcher dropdown a white r12 popover with a "Search views..." input row, views listed with type tile + name + ⋮ (active view in blue text, not filled), a hairline, and a "+ Create new view" footer row on a grey fill.
  **Why** Search first scales to dozens of views; marking the active view by text colour avoids a second selection style.
  **Applies to** SaaS app UI. **Check** popover radius 12, first row is a search input, active item uses accent text colour only. **Source** img/help-create-new-view [V]

- **RULE** When no sort or filter is set, show "Sort" and "Filter" as dashed ghost chips: 28-29 px, radius 9, 1 px dashed #e3e3e6 border, #fbfbfb fill, 14 px icon + 14/500 #75777c label, separated by a 1 px x 20 px #eeeff1 divider.
  **Why** Dashed outlines read as "empty slot you can fill", which invites use without adding visual weight.
  **Applies to** SaaS app UI. **Check** empty sort/filter controls use border-style dashed and grey text. **Source** img/data-sales-screen, img/help-lists, img/sequences-preview ("Filter") [R][V]

- **RULE** Build the filter editor as rows of 32 px segment pills (Where | attribute ▾ | operator ▾ | value ▾ | ⋮), nested groups inside a #f8f9fa inset panel radius 12, a toggleable "And ⟲" connector pill, and text actions "+ Add filter", "Delete group", "Clear all filters"; show an applied advanced filter as a chip with a count ("Advanced filter 3") plus an attached ⋮ segment.
  **Why** Each clause reads as a sentence; nesting by inset panel is clearer than indentation; counts make hidden filters visible.
  **Applies to** SaaS app UI. **Check** filter rows are sentence-ordered segment controls; groups have an inset bg; applied filters show a count. **Source** img/help-filter-reports, img/cl-filter-user [V]

- **RULE** Render keyboard hints as keycaps 18 px high, radius 6, 1 px #e4e4e8 border, 11/16 #75777c, 3.5-4 px side padding, inside the control they trigger (⌘K, /, T, N, ↵).
  **Why** In-place keycaps teach shortcuts continuously; they also signal "keyboard-first" at a glance.
  **Applies to** SaaS app UI. **Check** kbd height 17-20, radius 5-6, fontSize 11. **Source** img/data-sales-screen, measure-home-hero-window (kbd 24x17.6 r6, 11 px, 40% black), img/cl-cmdpalette [R][M][V]

### 2.5 Kanban

- **RULE** Build kanban columns 272 px wide with white-80% fill, radius 12 12 0 0, padding 8, a header of 12 px colour dot + 14/600 title + count chip (16 px, radius 5, 4% black fill, 6% border, 11/500) + "+" icon button, and cards 248 px wide with 8 px gaps.
  **Why** The stage colour lives only in the dot; the column itself stays neutral so the cards carry the data.
  **Applies to** SaaS app UI. **Check** column header dot 8-12 px; count chip 16 px; column bg neutral. **Source** measure-home-kanban [M]; slices/home-05 [V]; img/help-create-new-view ("Screening 3") [V]

- **RULE** Make a kanban card a white r12 box with a 1 px rgba(0,0,0,0.06) border and no shadow at rest; inside, attribute rows at 32 px pitch (14 px grey icon + 14/500 value), then a footer of three 28 px ghost icon buttons (notes, tasks, comments) and a right-aligned age chip ("12d", 12/500 50% black with a clock).
  **Why** Cards are mini record pages: the same attribute rows, a fixed footer for actions, and an age that shows staleness without a colour alarm.
  **Applies to** SaaS app UI. **Check** card radius 12, border alpha 0.05-0.07, row pitch 32, footer icon buttons 28 px. **Source** measure-home-kanban (rows at y 137/169/201/233/265; buttons 28 r8; "12d" 12/500 rgba(0,0,0,0.5)) [M]

- **RULE** Show a dragged kanban card rotated 2-4 degrees, lifted with a larger soft shadow and slightly scaled, while its slot stays open in the source column; on drop update both column counts.
  **Why** Rotation plus shadow reads as "picked up" physically; updating counts closes the loop.
  **Applies to** SaaS app UI. **Check** visual: drag state has rotation and an elevated shadow; counts change on drop. **Source** motion/kanban-contact.png (live homepage, 1.6-3.2 s), img/cl-kanban-video-poster (blue 2 px outline + tint when dragged in the 2022 version) [V]

- **RULE** On multi-select, float a bulk-action bar at the bottom centre: count chip ("2 selected"), white 32 px action buttons (Add to collection, Send email, More ▾) and a close ×, on a white r12 surface with a soft shadow.
  **Why** Bulk actions appear only when relevant and stay out of the toolbar the rest of the time.
  **Applies to** SaaS app UI. **Check** bulk bar is hidden with 0 selected and appears bottom-centre with a count. **Source** img/cl-kanban-video-poster [V]

### 2.6 Record page and activity

- **RULE** Lay out a record page as a left column (~340 px) with logo/avatar 40 px, name 20/600, an action row (one labelled button such as "Compose email" or "Add to list" + 28 px ringed icon buttons + ⋮), a collapsible "Details" list of attribute rows (14 px icon + 12-14 px grey label in a fixed ~140 px column + 14/500 value), and a right area with tabs (Overview, Activity, Emails 12, Notes 4, Tasks 6, Files, Calls 6, Deals 4).
  **Why** Attributes left and activity right matches how people scan a record: who is this, then what happened.
  **Applies to** SaaS app UI. **Check** label column fixed width, labels grey and truncated with ellipsis ("Last intera..."), tab labels carry count chips. **Source** img/cl-recordpage-new-record-layout, crop-home-record (labels 12/500 rgb(117,119,124), values 14/500 -0.28) [V][M]

- **RULE** Put count chips on tabs and section headers as 16-18 px grey chips (4% fill, 6% border, 11-12 px) right after the label, never as coloured badges.
  **Why** Counts inform without competing; coloured badges are reserved for unread or overdue.
  **Applies to** SaaS app UI. **Check** count chips neutral unless signalling urgency. **Source** img/cl-recordpage, img/cl-timeline, img/sequences-preview ("Recipients 158") [V]

- **RULE** Write activity rows as "Avatar Name verb object" with the name in ink, the verb in grey and the object underlined ("Michael Chang attended an in-person meeting"), the relative time right-aligned in grey 12-14 px, and a 20 px ringed type icon on a vertical connector line.
  **Why** Sentence-shaped events scan faster than columns; colour separates actor, action and object without bold.
  **Applies to** SaaS app UI. **Check** event rows mix ink and grey in one line; time right-aligned; timeline connector present. **Source** crop-home-record, img/cl-recordpage, img/cl-timeline [M][V]

- **RULE** Group the activity timeline under time headings ("Upcoming" in amber, "This week", "Today"/"In 2 days" right-aligned in amber for future items) and render meetings as r12 cards with a 3 px green left bar, title, time, participant avatars and a blue "Join meeting" button.
  **Why** Amber marks the future, green bars mark meetings; everything else stays neutral.
  **Applies to** SaaS app UI. **Check** future items use one warm accent; meeting cards have a coloured leading bar. **Source** img/cl-recordpage, img/cl-timeline [V]

- **RULE** Show highlights on a record as a grid of r12 cards (1 px #eeeff1 border, padding 12-16) each with a 12/500 grey label + 14 px icon top-right and a 14-16 px value (Summary with sparkle, Upcoming with a date tile "THU 29", Company with logo, Sales Outreach with a segmented 4 px progress bar).
  **Why** Each card answers one question; the label/icon/value grammar is identical so the grid reads as one instrument.
  **Applies to** SaaS app UI. **Check** highlight cards share label style, radius 12 and border; values are real data. **Source** crop-home-record (cards r12, border rgb(238,239,241), segments 4 px pills) [M]

### 2.7 Reports and charts

- **RULE** Put each chart in a white r12 card with a 14/500 title, an info icon, an object chip (People/Companies tile + name), a ⋮ menu top-right, and the card shadow `0 0 1px 1px rgba(0,22,62,0.01), 0 4px 12px -1px rgba(0,22,62,0.04), 0 1px 3px -1px rgba(0,22,62,0.18)`.
  **Why** Naming the data source on the card makes every chart traceable to records, which is the CRM's credibility.
  **Applies to** SaaS app UI. **Check** chart card has title + source chip + menu; radius 12. **Source** measure-home-charts [M]; img/reporting-dashboard ("Coolness · People", "MRR · Companies") [V]

- **RULE** Use saturated categorical colours in charts (blue #266df0, amber #f5a300, red #ff5454, green, purple, cyan) with 1-2 px white gaps between stacked segments, dashed 1 px grid lines, 10-12 px grey axis labels and a 12 px "Count" axis title rotated; legends as 8-10 px dots + 12-14 px labels centred above the plot.
  **Why** Charts are the one place colour is allowed to be loud; white gaps and dashed grids keep loud colour from looking heavy.
  **Applies to** SaaS app UI. **Check** chart series colours are saturated hues; grid dashed; segment separators white. **Source** crop-home-charts (axis 10/500 rgb(117,119,124), legend 12/500), img/help-download-report-table, img/help-duplicate-report [M][V]

- **RULE** Offer a time-range segmented control (7D 30D 3M 6M 12M All) as a grey track with a white selected segment, and a "Refresh data" secondary + "Add report" primary at the top right of a dashboard.
  **Why** Range is the most-used dashboard control; a segmented track makes the current range obvious.
  **Applies to** SaaS app UI. **Check** range control is a segmented track with one white thumb. **Source** img/reporting-dashboard [V]

- **RULE** Under a report, show "Calculated values" as a collapsible grey-header table (dot + category, count) with a download-as-CSV icon button and a tooltip; offer report types as a list of r12 option cards (32 px icon tile + 14/500 title + grey description).
  **Why** The numbers behind the chart are one click away, which builds trust; option cards explain choices in one line each.
  **Applies to** SaaS app UI. **Check** chart has an adjacent data table; type picker items have title + description. **Source** img/help-download-report-table, img/help-report-type-options [V]

- **RULE** Design empty states as a quiet line illustration (isometric, grey strokes with one accent-blue element) above a 14/500 ink title and a 14 px grey instruction ("Input needed to display chart / Select a data source").
  **Why** The empty state tells the next action in five words; one blue element ties the drawing to the UI accent.
  **Applies to** SaaS app UI. **Check** empty state has title + instruction; illustration grey with <= 1 accent colour. **Source** img/help-report-type-options [V]

### 2.8 Command menu, overlays, AI

- **RULE** Build the command palette as a two-pane r12-16 dialog: a 48 px search input ("Search quick actions and records..."), a left list grouped by 12/500 uppercase grey labels (NOW, COMPANIES, QUICK ACTIONS) with 24 px ringed icon tiles and right-aligned keycaps, the selected row a #f4f5f6 r8 fill, a right pane previewing the highlighted record, and a footer with "↑ ↓ Navigate" keycaps plus a secondary and a primary(↵) button.
  **Why** The preview pane turns search into action without leaving the keyboard; group labels make a long list scannable.
  **Applies to** SaaS app UI. **Check** palette has search, grouped list, preview pane, footer with keycaps. **Source** img/cl-cmdpalette-redesigned-command-palette [V]

- **RULE** Use the same dialog footer everywhere: "↑ ↓ Navigate" at left, then a white secondary ("Create note", "Start from scratch") and a blue primary with an inline ↵ keycap ("Open Meeting ↵", "Preview template ↵") at right.
  **Why** One footer grammar across overlays makes every dialog operable the same way.
  **Applies to** SaaS app UI. **Check** dialog footers share layout and include a keycap on the primary. **Source** img/cl-cmdpalette, img/help-list-templates [V]

- **RULE** Slide side panels (compose email, record preview) in from the right over the table, r12, white, with the soft card shadow and their own header ("Send email" 12/500 grey label + 16-18/500 title + grey summary), leaving the table visible and dimmed by nothing.
  **Why** The panel keeps the list in context; no scrim means the user never loses their place.
  **Applies to** SaaS app UI. **Check** side panel overlaps content without a backdrop; radius 12. **Source** crop-home-table + motion/table-contact.png (panel enters 0.4-1.2 s) [M][V]

- **RULE** Show AI work as product objects: a collapsible "2 tools used ▾" line, a shimmering "Thinking" label while streaming, answers as numbered records with inline record chips (logo + name in a bordered row), and thumbs/copy/regenerate icon buttons; never a coloured chat bubble.
  **Why** The AI proves it read the CRM by returning records you can open; a grey streaming state reads as work, not decoration.
  **Applies to** SaaS app UI | landing page. **Check** AI output contains linked record chips; tool use is disclosed. **Source** crop-home-charts ("2 tools used", "Brightloop" chip), slices/home-07/09, fold-home ("Thinking" gradient text) [M][V]

- **RULE** Draw workflow canvases on a dotted #f4f5f6 field with white r15 nodes (216x74, 26 px tinted icon tile r7, 15/500 title, 12/500 grey subtitle), 1 px grey connectors with rounded corners and small arrowheads, output ports as 6 px dots, branch labels (True/False) at the node edge, and a blue "Trigger" tab plus green "✓ Triggered/Completed" status chips above nodes.
  **Why** Nodes reuse the card and chip vocabulary, so the builder feels like the same product; status chips show the run, not just the graph.
  **Applies to** SaaS app UI. **Check** nodes radius 14-16; connectors 1 px with radius corners; run status uses the green chip recipe. **Source** measure-home-workflow (nodes 216x74 r15, icon tile 26 r7, title 15/500, sub 12/500 55%, chip #e0fced/#cbf7e1/#007d53), crop-home-workflow [M][V]

### 2.9 Type, colour, depth

- **RULE** Set product UI in Inter with exactly two weights: 500 for everything (labels, values, buttons, nav, headers) and 600 only for page title, workspace name, record name and kanban column titles.
  **Why** With size fixed at 14, a single 600 step is enough hierarchy; 400 body text looks thin next to 500 controls at this density.
  **Applies to** SaaS app UI. **Check** distinct font-weights in the app = {500, 600}; 600 count <= 6 per screen. **Source** measure-home-* (all six blocks: weights 500/600 only) [M]

- **RULE** Use 14/20 for all content and controls, 12/16 for labels and meta, 11/16 for keycaps and counts, 10 for avatar initials and chart axes, 16/20 (600) for page and workspace titles, and 20/24 (600) for a record title; no other sizes.
  **Why** Six sizes with 14 carrying 60-90% of text is what keeps a dense screen calm.
  **Applies to** SaaS app UI. **Check** font-size set within {10, 11, 12, 14, 16, 20}; share of 14 px >= 60% of text nodes. **Source** measure-home-table (45/49 at 14), measure-home-hero-window, measure-home-kanban [M]

- **RULE** Track 14 px UI text at -0.28 px (-2%) in the app shell and sidebar and -0.14 px (-1%) in marketing-scaled tables; track 12 px at -0.16 px or 0 and 16 px titles at -0.2 to -0.3 px.
  **Why** Inter at 14/500 is wide; -2% tightens it to the Attio texture; the recreation's text widths only matched after switching 14 px to -0.28.
  **Applies to** SaaS app UI. **Check** letter-spacing on 14 px text between -0.3 and -0.13 px. **Source** measure-home-hero-window (-0.28 on sidebar), measure-home-table (-0.14), round-1 -> round-2 text-band match [M][X]

- **RULE** Colour text with a four-step neutral ramp: ink #242629 (rgb 36,38,41), secondary #505155, muted #75777c, faint #9fa1a7 (or 55% / 40% black on white); use #111 only for aggregate figures.
  **Why** A fixed ramp holds hierarchy at one size; four steps cover value, label, meta and disabled.
  **Applies to** SaaS app UI. **Check** text colours outside chips <= 5 neutrals. **Source** measure-home-table, crop-home-record (rgb(117,119,124), rgb(159,161,167)), img/data-sales-screen footer #111 [M][R]

- **RULE** Use two hairline greys: #eeeff1 for chrome separators and card borders, #e6e7ea for the table grid and relationship pills; never a darker border on a resting surface.
  **Why** Two close greys separate "frame" from "data grid" without any line being noticed on its own.
  **Applies to** SaaS app UI. **Check** border colours on resting elements in {#eeeff1, #e6e7ea, rgba(0,0,0,0.05-0.06)}. **Source** img/data-sales-screen hairline scan; measure-home-table/record borders [R][M]

- **RULE** Keep one accent (#266df0) for primary buttons, links, selected-in-list text, checkboxes and toggles; give every other hue a job in data (chips, tiles, chart series, avatar rings).
  **Why** One blue for "act here" plus many hues for "this is data" is the opposite of a brand-colour-everywhere dashboard.
  **Applies to** SaaS app UI. **Check** accent used only on interactive elements; chrome contains no other saturated colour. **Source** measure-home-table (#266df0 on button, checkbox, ring), img/help-lists, img/cl-timeline toggles [M][V]

- **RULE** Use three depth levels only: resting card = 1 px hairline, no shadow (kanban, highlight cards); floating control = soft halo `0 0 2px rgba(28,40,64,0.18), 0 1px 3px rgba(0,0,0,0.04)`; popover/panel = halo + `0 4px 12px -1px` at 4% navy.
  **Why** Depth tells what you can grab; flat cards keep the board calm, haloed controls look pressable.
  **Applies to** SaaS app UI. **Check** distinct box-shadow tokens <= 3 per screen; kanban cards have no shadow. **Source** measure-home-kanban (cards border only), measure-home-hero-window, measure-home-charts [M]

- **RULE** Size icons at 14 px with a 1.25 px stroke in rows, headers and buttons (12 px for chevrons, 16-20 px only for the sidebar toggle and header icon buttons), coloured ink in headers and nav and 40-55% black for trailing affordances.
  **Why** 14/1.25 matches the stem weight of Inter 14/500; heavier strokes look clip-art at this density.
  **Applies to** SaaS app UI. **Check** icons in rows 13-14 px; stroke-width 1.2-1.4 effective. **Source** measure-home-table (13 px svgs), measure-home-kanban (40 x 14 px svgs), round-2 stroke fix [M][X]

### 2.10 Motion

- **RULE** Animate state with short, plain transitions: colour and background 0.3 s cubic-bezier(0.4,0,0.2,1), opacity 0.2 s, transform 0.3 s; reserve choreography for demos (card drag, panel slide, streaming text, edges lighting in sequence).
  **Why** The product feels fast because hovers and toggles barely move; motion is spent where it explains a workflow.
  **Applies to** SaaS app UI | landing page. **Check** transition durations <= 0.3 s on controls; no entrance animation on static chrome. **Source** measure-home-workflow and -charts transitions [M]; motion/*-contact.png [V]

- **RULE** In marketing demos, animate the product doing one job per block: rows appear then a side panel slides in with a drafted email (table), a card lifts, tilts and lands in the next stage (kanban), the AI streams "Thinking" then an answer with record chips (AI), connectors light up node by node with status chips (workflow).
  **Why** Each loop proves a verb (send, move, ask, automate); generic fade-ins prove nothing.
  **Applies to** landing page. **Check** each animated product block demonstrates one user action end to end. **Source** motion/table-contact.png, motion/kanban-contact.png, slices/home-01..08 [V]

### 2.11 Recreation lessons (what the engine got wrong first, and how the gap closed)

- **RULE** Before rebuilding a reference, measure it at its native scale: scan for hairlines (exact y/x of every separator), ink bands (text cap/baseline per row) and colours at chip centres and edges; build only from those numbers.
  **Why** Round 1 built from eyeballed values was 5.18% pixels off; after building from probes the same layout reached 2.0% in one round.
  **Applies to** SaaS app UI. **Check** a measurements table exists before code; recreation diff < 2.5% pixels off by round 2. **Source** work/study-attio round-1.json (5.18%) -> round-2.json (2.01%) [X]

- **RULE** Render a static build for overlay through an HTTP server (or an in-process one), never file:// with type="module" scripts.
  **Why** Round 1's first render was a blank white page: module scripts are blocked on file://, and a blank render silently invalidates the comparison.
  **Applies to** all. **Check** render is non-blank (pixel variance > 0) before computing diffs. **Source** work/study-attio round 1 (first attempt) [X]

- **RULE** Track Inter 14/500 at -0.28 px for Attio-grade app text; the engine's default -0.14 px made every label 1-2 px wider and pushed chips, keycaps and right-aligned values out of alignment.
  **Why** Width error accumulates along a row; at 14 px, 1% tracking moves "Quick actions" by 1.7 px.
  **Applies to** SaaS app UI. **Check** ink-band left/right edges of labels within 0.5 px of the reference. **Source** round-1 vs round-2 ink bands (Notifications 35.0-115.25 ref vs 37.0-117.25 r1 -> 35.0 r2) [X]

- **RULE** Replace the engine's 1 px ring + drop shadow on white controls with Attio's 2 px blur halo; check the edge at 4x: the reference ramps over 2 px (251 -> 239), a ring jumps in one pixel (250 -> 235).
  **Why** The hard ring was the single most "generated-looking" detail in round 1; the halo is softer and still crisper than no edge.
  **Applies to** SaaS app UI. **Check** sample 8 pixels across a button edge at 4x; no single-step drop > 8 levels. **Source** round-2 pixel ramps (QA button left edge) [R][X]

- **RULE** Use a 1.25 px stroke at 14 px for line icons and pick glyphs per meaning (equalizer-with-knobs for Filter, arrows for Sort, tag for select, circled $ for currency, person for relationship); the engine's default 1.5-2 px stroke and generic sliders read heavier than the type.
  **Why** In round 1 every icon was the darkest thing in its row; at 1.25 px icon and text share one stem weight.
  **Applies to** SaaS app UI. **Check** icon stroke visually equals the 14/500 text stem; no icon darker than its label. **Source** round-1 -> round-2/5 pair crops (sortbar 1.57% -> 0.65%) [X]

- **RULE** Size small chips by measured padding, not by feel: Attio chips are 5 px side padding (engine used 6) and relationship pills 5/6 px (engine used 5/8); recheck right edges with an ink-band scan.
  **Why** A 1 px per-side error is invisible alone but shifts 20 chips in a column into a visibly different rhythm.
  **Applies to** SaaS app UI. **Check** chip right ink edge within 0.5 px of the reference. **Source** round-2 row-band scan (type chip 466-541 vs ref 466-540) [X]

- **RULE** Sample every categorical colour from the reference instead of reusing a palette (Companies is the same #266df0 as People, Deals #fd9038, Partnerships #0eb472, Invoices #dba600), and use filled glyphs in object tiles.
  **Why** Round 2's guessed tile colours and outline glyphs were the largest remaining sidebar error; filled white glyphs on solid tiles are Attio's object identity.
  **Applies to** SaaS app UI. **Check** tile colours match sampled hex within deltaE 2. **Source** round-3 sidebar pair crop, colour probes [R][X]

- **RULE** Stop iterating when the remaining diff is font rasterisation and proprietary glyphs (here 1.78% pixels off, mean abs 2.19/255, every edge within 0.5 px); record the residue instead of hand-drawing icons to close it.
  **Why** Attio ships its own icon set; the founder rule bans hand-drawn SVG icons, so the nearest professional glyph is the correct stopping point.
  **Applies to** all. **Check** residual diff map shows only glyph interiors and text AA, no edge offsets. **Source** round-6.png difference panel; founder-taste icon rule [X]

## 3. Numbers & scales

**Recreated Deals table (1134 x 563 CSS, reference rendered at 4x)** [R][X]

| Element | Value |
|---|---|
| Sidebar | 237 + 1 px border #eeeff1, bg #fbfbfb |
| Bands (main) | title 48, view bar 48, sort/filter 46, header 35, rows 36, footer 26; hairlines at y 48/96/142/177 |
| Columns | 220 / 160 / 179 / 156 / rest; grid #e6e7ea; cell padding 0 8 |
| Nav rows | 32 pitch, padding 0 8, icon 14 at x 15, label x 35, active fill #f4f5f6 r9 |
| Buttons | 28 h, r9, white, halo shadow; icon 14, gap 6; kbd 18 h r6 #e4e4e8 11 px |
| Dashed chips | 29 h r9, 1 px dashed #e3e3e6, fill #fbfbfb, text #75777c |
| Checkbox | 16, r5, border #ccc (rows) / #e6e7ea (header) |
| Logos | 16 px, record name underline 1 px #e7e7e7 |
| Chips | 22 h, r7, pad 0 5, 1 px border (see 2.3) |
| Relationship pill | 22 h, r11, #fbfbfb, border #e6e7ea, avatar 12, text #75777c |
| Avatar presence | 24 ring (1 px colour) + 20 photo, overlap -8; "+1" 22 #f8f9fa |
| Type | Inter 14/20/500 -0.28; titles 16/600 -0.3; labels 12/16/500; kbd 11 |

**Live DOM tokens (attio.com, 2026-10-09)** [M]

| Token | Value |
|---|---|
| Ink / secondary / muted / faint | rgb(36,38,41) / rgb(80,81,85) / rgb(117,119,124) or 55% black / rgb(159,161,167) or 40% black |
| Hairlines | #eeeff1 (238,239,241), #e6e7ea (230,231,234), rgba(0,0,0,0.05-0.06) |
| Accent | #266df0; green #00d17e; orange #f97514; purple #9b69ff; amber #f5a300; red #ff5454 |
| Score chip | bg #e0fced, border #cbf7e1, text #007d53, 22 h r7 pad 0 4 |
| Control shadow | 0 0 2px rgba(28,40,64,0.18), 0 1px 3px rgba(0,0,0,0.04) |
| Primary shadow | 0 2px 4px -2px rgba(15,107,233,0.12), 0 3px 6px -2px rgba(15,107,233,0.08) |
| Chart card shadow | 0 0 1px 1px rgba(0,22,62,0.01), 0 4px 12px -1px rgba(0,22,62,0.04), 0 1px 3px -1px rgba(0,22,62,0.18) |
| Hero frame | r16, padding 0 6 6, bg rgba(247,247,248,0.8), ring 6% + 0 1 2 / 0 3 6 / 0 8 14 / 0 16 28 at 2.4/3/3.5/4% |
| Inner window | r12, 1 px 5% border; sidebar 239 x #fbfbfb; scale 0.88 (28 px -> 24.6) |
| Kanban | column 272 w, r12 12 0 0, pad 8, 80% white; card 248 w r12 6% border; rows 32 pitch; count chip 16 r5 |
| Workflow node | 216 x 74, r15; icon tile 26 r7; title 15/500 -0.15; sub 12/500 55% |
| Record highlights | cards r12, border #eeeff1; progress segments 4 px pills |
| Transitions | colour/bg 0.3 s cubic-bezier(0.4,0,0.2,1); opacity 0.2 s; transform 0.3 s |

**Recreation diff by round** (pixels off = mean channel diff > 24/255) [X]

| Round | Change | Pixels off | Mean abs |
|---|---|---|---|
| 1 | first build from eyeballed values | 5.18% | 8.59 |
| 2 | tracking -0.28, sidebar offsets, halo shadow, icon strokes, chip/pill padding, footer row | 2.01% | 2.58 |
| 3 | object tile colours + filled glyphs, nav insets, Type header icon, underline | 1.82% | 2.26 |
| 4 | view-bar paddings, sort/filter offsets | 1.78% | 2.18 |
| 5 | filter glyph, sidebar toggle | 1.78% | 2.19 |
| 6 | Source icon trial (reverted: no public match) | 1.78% | 2.19 |

## 4. Dos and Don'ts

- **Do** (Attio Deals table): records-first page, three 48 px toolbars, 36 px grid rows, 14/500 everywhere, chips with border, logos and faces at 16/12 px, aggregate footer. **Don't** (engine's Acquisity dashboard): greeting header + KPI strip + area chart + uppercase sidebar labels; looks like a template, no records, no data types. [V]
- **Do** soft 2 px halo on white controls. **Don't** 1 px ring + drop shadow (round 1): hard edge, reads generated. [R][X]
- **Do** sentence-case grey group labels with chevrons ("Favorites", "Records"). **Don't** uppercase tracked eyebrow labels (MAIN, CRM, OUTREACH) as in the rejected build. [R][V]
- **Do** colour only in data (chips, tiles, rings, charts). **Don't** accent-tinted icons, accent bars and accent fills in chrome. [M][V]
- **Do** person values as grey-text pills with photos. **Don't** person values as bold ink text or coloured initials only. [R]
- **Do** dashed ghost Sort/Filter when empty. **Don't** solid buttons for empty states, which look like applied filters. [R]
- **Do** an empty-state line illustration with a five-word instruction. **Don't** an empty card with "No data". [V]

## 5. Exceptions & judgement calls

- Attio's homepage table uses -0.14 px tracking at 14 px while the app image uses -0.28 px; the scaled marketing frame (0.88) is why: tighter tracking would close up after scaling. Use -0.28 at native size, -0.14 for UI rendered at 0.85-0.95 scale. [M][engine note]
- Attio's sidebar items are 32 px pitch in the static image and 28 px (24.6 scaled) in the live hero; the live hero is a compressed marketing version. For product builds use 32 pitch; for a hero frame 28 is acceptable. [R][M]
- The founder's Kestrel radius ladder (8/12/16/22) is softer than Attio's (8-9 controls, 7 chips, 12 cards, 16 frame). For Attio-grade product UI use Attio's; keep Kestrel's for heroes where the founder asked for "smooth" roundness. Write the choice in DIRECTION.md. [engine note]
- Charts are the one loud-colour zone; on a landing page Attio even uses gradient-faded bars (reporting image). Inside the app, keep solid fills with white separators. [V]
- Attio uses its own icon set; the closest public sets (Lucide 1.25 stroke, Remix line) are acceptable but glyph shapes differ (Sort arrows with a plus, select icon). Do not hand-draw to match (founder rule). [X]
- The call-intelligence videos on attio.com are webcam stock clips, not UI; motion evidence for the product comes from the live HTML blocks. [V]

## 6. Figures worth keeping

- `img/data-sales-screen-original-4536x2252.png`: the canonical Attio records table; the recreation target.
- `img/help-lists.png`: Companies list with stage dots, multi-chip Industry cells, AI-filled Description, link column, aggregates.
- `img/cl-recordpage-new-record-layout.png` and `img/cl-timeline-filter-activity-timeline.png`: record page + activity timeline + view-settings popover with toggles.
- `img/cl-cmdpalette-redesigned-command-palette.png`: two-pane command menu with preview and footer grammar.
- `img/help-filter-reports.png`: nested filter builder.
- `img/help-create-new-view.png`: view switcher popover and kanban column header.
- `img/cl-kanban-video-poster.jpg`: kanban drag state + bulk-action bar.
- `img/sequences-sequences-preview.png`: list + detail split with a step timeline (green done, dashed pending).
- `img/reporting-reporting-refresh-dashboard-transparent-3x.png`, `img/help-download-report-table.png`, `img/help-report-type-options.png`: reports, data table, empty state.
- `crop-home-*.png` + `measure-home-*.json`: live measured blocks. `work/study-attio/round-1.png` vs `round-6.png`: before/after of the recreation.

## 7. Open questions

- Hover, focus and pressed states of table cells, chips and sidebar rows could not be observed without signing in; the help images show only a grey row fill on hover in menus (#f4f5f6). Not measured.
- Dark mode: Attio's marketing site shows dark sections (Universal Context, Signals) but no dark product UI was found publicly; no rules taken.
- The kanban changelog video (Vimeo 764543263) was only sampled via its poster; frame-by-frame easing of the drag was not measured.
- Exact sidebar active-pill bounds in the reference (x 9.5-225.75, height about 36) were measured from a fill band and may be off by 1 px at the rounded corners.
- Attio's own icon set name and stroke metrics are unknown; 1.25 px is the best visual match, not a measured spec.
