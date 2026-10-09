---
source: web:https://sales-crm-kargulstudio.vercel.app
chapter: Kargul Studio sales CRM (live demo) - product UI teardown, consistency-first
pages: n/a (web, measured 2026-10-09)
topic_tags: [saas-app-ui, product-ui, dashboard, table, sidebar, radius, icon-centring, spacing, type-scale, shadows, dark-mode, motion, focus, data-viz, benchmark]
status: studied
---

# Kargul sales CRM: what makes the product UI feel finished

Measured 2026-10-09 with Playwright (chromium) at 1440x900 @2x (plus one 390x844 pass for the mobile shell) against https://sales-crm-kargulstudio.vercel.app. Raw data: `knowledge/benchmarks/kargul-crm/measurements.json` (aggregates, every state) and the screenshots in the same folder (`dark-main.png`, `dark-ov-*.png` overlays, `crop-*.png` component and hover/focus crops, `dark-mobile-390-*.png`). Companion notes: `knowledge/benchmarks/marcel-kargul-profile.md`, `fully-specced-bar.md`. Nothing private was accessed: only rendered pixels, computed styles, the public DOM class names, the served CSS and the served JS chunks. I did not read the public GitHub repo for this teardown.

## 1. Core ideas

1. **It is one screen, not an app.** The live build is a single "Companies" view (sidebar, header, tabs, filter toolbar, 18-row table, aggregate footer). Sidebar items, the Deals/Forecast tabs (only the underline moves), Help, Invite teammates, Add Billings, Export and the column headers do nothing. Everything real is in overlays: command search, notifications popover, profile sheet, company detail sheet, owner profile sheet, four filter menus, a New Company dialog with validation. The URL never changes. Lesson: the quality comes from one screen executed to the pixel, not from breadth.
2. **Dark only, by design.** `color-scheme: dark` is set on `:root`; there is no `.dark` class, no theme toggle, and emulating `prefers-color-scheme: light` renders the identical dark UI (screenshot `light-prefers-color-scheme-main.png`). The only `prefers-color-scheme` media query in the bundles belongs to the framework error page. So "light and dark for every view" is impossible here; the dark system is the whole system.
3. **Consistency is arithmetic, not eyeballing.** Every single-line label has `line-height: 1` inside a fixed-height flex container with `align-items: center`, and control heights are derived: 12px text + 9px padding x2 = 30px; 12px icon + 18px = 30px. That produces optical centring with no per-component nudges: across 24 icon-only controls the icon box centre is 0.00px from the container centre; across 84 icon+label controls the icon centre is 0.00px from the label line centre (section 5.1).
4. **One control height (30px), one field height (36px), one pill radius.** All actions, icon buttons, filter pills, nav rows, the profile pill and sheet footers are 30px tall and fully rounded; every text field and select is 36px tall with an 8px radius. Two shapes, two heights, no third.
5. **Type is nearly two sizes.** 14px for content and nav, 12px for chrome (captions, buttons, headers, labels), 16px only for titles, 24/28px only for two numerals. One family (Geist variable), weights 400/500/600, tracking left at `normal` except a -0.01em brand name and +1px uppercase eyebrows. Hierarchy comes from colour level (5 text greys) not size.
6. **Surfaces are a tight grey ladder with hairlines, not shadows.** Page `#161616`, sidebar `#171717`, card `#1b1d20`, controls `#1e1e1e`, raised/active `#2a2a2a`, hairline `#232323`, strong line `#393939`. Depth on controls is a three-layer micro-shadow (dark outer ring + 10% white top highlight + 6% white inner ring). Big shadows exist only on overlays (0 16px 40px at 50% black plus a 1px near-black ring and a `#393939` border).
7. **One easing curve, one hover duration.** Every transition is 150ms on an ease-out-quart (`cubic-bezier(.25,1,.5,1)`, the file calls it power3-out). Overlays open 200-350ms on that curve and close 150-250ms on its in-curve (`.5,0,.75,0`). No press scale, no idle animation, no layout animation, no spring.
8. **Product detail carries the polish.** Quantised segmented win-probability meters (17 segments, red-amber-green by position), 14-bar sparklines, 50%-opacity-tinted semantic tags with matching 1px borders, real company logos in 25%-radius tiles, real face avatars with a 1px inner white/10 outline, tabular numerals right-aligned under right-aligned headers. These are the things a "diagram-looking" build lacks.
9. **Stack facts (public):** Next.js (Turbopack chunks), Tailwind v4, shadcn/ui-style wrappers (`data-slot` attributes: tabs, table, dialog, sheet, popover, dropdown-menu, select, checkbox, slider, command, scroll-area, kbd) on Radix primitives, `cmdk` for the command palette, Geist variable (100-900), a custom stroke icon set (14px grid, 1.4 stroke, round caps and joins; 16px grid, 1.333 stroke for checkbox), Next `Image` for avatars/logos. No chart library: all data viz is hand-built spans. No toast component in the bundle.

## 2. Rules

### 2.1 Roundness (radius ladder)

- **RULE** Use three radius families in product UI: pill (fully rounded) for every action, badge, chip, tab-like pill and avatar; 8px for fields, list rows, cards, nav rows, small menus; 12px for dialogs, popovers and the command palette. Sub-element chrome steps down to 6px (kbd, menu items, 24px tiles), 4px (checkbox), 2px (meter container) and 1px (meter segments).
  **Why** A short, fixed ladder means any two adjacent surfaces differ by a whole rung or are identical; there are no 7px/9px/10px neighbours to read as drift.
  **Applies to** SaaS app UI. **Check** Collect `border-top-left-radius` of all bordered/filled elements; the set must be within {1,2,4,6,8,12,pill} (measured set also includes tile radii 5/12.5/14, see next rule). **Source** all 8 captured states; `measurements.json > radiusByComp`

- **RULE** Make actions pills and fields rectangles: buttons, icon buttons, filter pills, tags, count chips and the profile pill are `radius: 9999px`; inputs, selects, textareas, the date field are 36px tall with an 8px radius.
  **Why** Shape tells role: a pill is something you press, a rounded rectangle is something you type in. The split is never broken in the file.
  **Applies to** SaaS app UI. **Check** Every `button` radius is pill except nav rows, row-link buttons inside cells and notification items (8px); every `input`/`select-trigger` radius is 8px. **Source** toolbar, New Company dialog

- **RULE** Give logo and app tiles a radius of 25% of their side (24px tile 6px, 32px 8px, 50px 12.5px, 56px 14px, the sidebar logo 32px rect rx 8).
  **Why** A fixed proportion keeps the squircle character identical at every size so the same brand mark never looks like two different shapes.
  **Applies to** SaaS app UI. **Check** `radius / width` of logo tiles = 0.25 (+-0.01). **Source** command palette, profile sheet, detail sheet, New Company upload tile, sidebar header

- **RULE** Step an inner radius one rung below its container's rung instead of solving concentric geometry: popup 12px with 6px inner padding holds 8px rows; popup 8px with 4px padding holds 6px rows.
  **Why** Strict concentric math (12 - 6 - 1 = 5px) produces odd values and breaks the ladder; the one-rung step stays optically right when the inset is 4-6px.
  **Applies to** SaaS app UI. **Check** Child row radius equals the next-lower ladder value than its popup. **Source** command palette, notifications, sort/filter menus

- **RULE** Draw segmented meters with a 2px container radius and 1px segment radius; checkboxes are 16px with a 4px radius.
  **Why** Micro-radii scale with the object; a 1px segment inside a 2px track reads as one crisp bar, 4px matches the control scale below pills.
  **Applies to** SaaS app UI. **Check** meter container `border-radius: 2px`, segments 1px; checkbox 16x16 at 4px. **Source** table rows, detail sheet

### 2.2 Heights, centring and icons

- **RULE** Fix one height for every action control (30px) and a second for fields (36px): buttons, icon buttons, filter pills, profile pill, nav rows, dialog/sheet footer buttons are all 30px. Nothing is 28, 32 or 34.
  **Why** A single height makes toolbars align on one baseline and lets controls sit side by side in any row without adjustment.
  **Applies to** SaaS app UI. **Check** `getBoundingClientRect().height` of all `button` elements in header/toolbar/footers is 30 (+-0.5); inputs/selects 36. **Source** header, toolbar, dialogs, sheets

- **RULE** Derive control height from content, not a height token: single-line label at `line-height: 1` plus equal vertical padding (12px text + 9px x2 = 30px; 12px icon + 9px x2 = 30px; 14px text with `height: 30px` and zero vertical padding for nav rows).
  **Why** When height is the sum of line box and padding, text and icon are centred by construction; there is no half-leading to compensate for.
  **Applies to** SaaS app UI. **Check** For buttons: `line-height == font-size`; `height == font-size + 2 * padding-top`. **Source** buttons, filter pills

- **RULE** Set `line-height: 1` on single-line UI text (nav, buttons, table cells, tags, captions) and let `display:flex; align-items:center` do the vertical centring; keep taller line-heights (about 1.15 at 14px) only for wrapped paragraphs.
  **Why** Default 1.5 line-heights add uneven half-leading that shifts text relative to icons; line-height 1 gives a measured cap-centre offset of 0.03px at 14px and 0.26px at 12px.
  **Applies to** SaaS app UI. **Check** `line-height / font-size == 1` on `button, th, td, nav a`; text cap-centre within 0.5px of container centre. **Source** `measurements.json > textCentring`

- **RULE** Size icons by the control they sit in: 12px inside 30px text buttons and pills (Export, New Company, filter chevrons, status badge); 14px for icon-only 30px buttons, nav rows and cell icons; 16px for the 24px close button and checkboxes; 12px dots in the 24px row action. Never scale an icon to "fill" the control.
  **Why** A fixed icon-to-control ratio (about 0.4-0.47) keeps visual weight equal across the whole surface.
  **Applies to** SaaS app UI. **Check** `svg` box size per container class: 12 or 14 or 16 only. **Source** `measurements.json > iconCentring.sizes`

- **RULE** Make icon-only buttons exact squares (30x30 or 24x24) with zero padding and centre the icon with flex; the icon box centre must equal the button centre to 0.00px.
  **Why** Any padding asymmetry or inline-svg baseline gap shows up as a visibly off-centre glyph at 2x; zero padding plus flex removes both.
  **Applies to** SaaS app UI. **Check** For each icon-only button: |icon centre - button centre| <= 0.5px on both axes. **Source** header icon buttons, row action buttons (24 measured, max glyph offset 0.29px)

- **RULE** Put a 6px gap between an icon and its label in buttons, nav rows and menu rows (4px only inside the 20px status badge, 2px between badge dot and text); centre the icon on the label's line box, not on the cap height.
  **Why** Aligning to the line box (which is what flex centring does) matches the cap centre within 0.3px at these sizes and avoids optical hacks.
  **Applies to** SaaS app UI. **Check** `column-gap: 6px` on button/nav; icon vertical centre - label line-box centre = 0. **Source** nav, toolbar, command items

- **RULE** Use one icon set drawn on a 14px grid with stroke width about 10% of the grid (1.4 at 14px), round caps and joins, `currentColor`, and set the svg size to the grid size at the control's tier; stroke then scales to 1.2px at 12px and 1.4px at 14px without per-icon overrides.
  **Why** Stroke proportional to icon size keeps line weight consistent against 12px and 14px text; mixing sets or hand-set stroke widths is the usual source of "icons look off".
  **Applies to** SaaS app UI. **Check** all `svg path` `stroke-width / viewBox width` within 0.083-0.1; one stroke-linecap value. **Source** sidebar, toolbar, checkbox (16px grid at 1.333)

- **RULE** Keep text-only badges optically centred with a fixed height and symmetric ink padding: 22px tag, 8px padding plus 1px border on each side (measured ink 9/9), cap-centre offset 0.03px; 16px count chip with min-width 24px and 4px padding (ink 5/5).
  **Why** A fixed 22px height at 14px/lh1 puts cap-centre on the box centre; the border is counted inside the padding budget so left and right are equal.
  **Applies to** SaaS app UI. **Check** tag `height == 22`, `padding-left == padding-right`, text range left inset == right inset. **Source** table segment tags, sidebar count chips

- **RULE** Reserve the width of a tab's bold state with an invisible bold copy of the label stacked on the visible one in the same grid cell, so activating a tab never shifts its neighbours.
  **Why** Weight change widens text; without a reserve the row reflows on every click.
  **Applies to** SaaS app UI. **Check** tab trigger width identical in active and inactive state. **Source** tabs (page and notifications popover)

### 2.3 Spacing

- **RULE** Build spacing on a 4px grid with half-steps for tight pairs: 4/8/12/16/20/24 for padding and gaps between groups; 2/6/10 only as inner gaps (icon-label 6px, chip groups 4px and 8px, meter segment gap 2px). Odd values (1/3/9/11) appear only to cancel a 1px border so the outer size lands on an even number.
  **Why** Measured spacing: 60% of 2,600 padding/margin/gap values are multiples of 4, 88% are even; the remaining odd 12% are 1/3 (hairlines), 9 and 11 (8 and 10 plus a border).
  **Applies to** SaaS app UI. **Check** Frequency table of paddings/gaps: odd values only on elements that have a 1px border or on 1px dividers. **Source** `measurements.json > spacingFreq`

- **RULE** Use the same panel padding everywhere in overlays: 20px vertical and 24px horizontal for dialog sections, 20px all round for sheet sections, 16px for popover header, 12px for popover list items, 6px list inset; section gaps 16px; label-to-field gap 8px.
  **Why** One panel rhythm means a dialog, sheet and popover read as the same product; users can scan section starts by the same distance each time.
  **Applies to** SaaS app UI. **Check** Dialog fieldset padding 20/24, row gap 16; sheet section padding 20, gap 16 (12 in the score card section); popover list `ul` padding 6 gap 2. **Source** New Company dialog, detail sheet, notifications

- **RULE** Give structural bars fixed heights and reuse them: sheet and popover header 56px, dialog header 77px (title + description), sheet footer 62px, dialog footer 63px (16 + 30 + 16 + 1 border), command input row 48px, command column header 36px, command footer 40px, table header 38px, table row 42px (43 with the 1px divider), tab row 45px.
  **Why** Fixed bar heights stop content from changing chrome size and give the same vertical cadence across overlays.
  **Applies to** SaaS app UI. **Check** Geometry table in section 3.10. **Source** `measurements.json > geometry`

- **RULE** Align table header text edges with cell content edges using the same horizontal padding (12px) and the same justification per column: numeric columns right-justified in both `th` and `td`, text columns left, icon columns centred; give cell links a negative margin equal to their padding so the visible content still lines up with the header.
  **Why** Header and cell share one grid (CSS subgrid), so column edges are identical by construction.
  **Applies to** SaaS app UI. **Check** For each column: `th` and first-row `td` have equal box `left`/`width` and the same `justify-content`. **Source** table (9 columns measured, all equal)

- **RULE** Align sidebar section eyebrows to the outer edge of the nav rows (both start at the 12px nav padding edge), not to the icons inside rows.
  **Why** The eyebrow and the row pill share a left edge, so the active row's pill, the labels and the dividers form one column.
  **Applies to** SaaS app UI. **Check** eyebrow `left == nav row left` (12px). **Source** sidebar

### 2.4 Type

- **RULE** Run product UI on two working sizes: 14px for content, nav and fields, 12px for chrome (buttons, headers, captions, labels, menu items); add 16px only for titles and 24-28px only for hero numerals.
  **Why** Two sizes with 2px difference stay distinguishable through weight and colour, which removes decision noise and keeps density high.
  **Applies to** SaaS app UI. **Check** Distinct `font-size` among text elements <= 5, with 12 and 14 covering >= 85% of text nodes. **Source** `measurements.json > typeTuples` (14px: 219+202+19 nodes, 12px: 118+12+10+6+4+4 nodes)

- **RULE** Use one variable family across the whole product UI (here Geist 100-900, `antialiased`), weights 400 for content, 500 for labels/nav/active tab/page title, 600 for dialog titles and one hero numeral; never 700+.
  **Why** One family and three weights make weight the only variable, so hierarchy is legible at a glance.
  **Applies to** SaaS app UI. **Check** `font-weight` in {400,500,600}; one `font-family`. **Source** all states

- **RULE** Keep tracking at `normal` for UI text; apply tracking only to the brand name (-0.01em) and to uppercase eyebrows (+1px at 12px, about +0.083em).
  **Why** Tight tracking on small UI text hurts legibility; uppercase caps need positive tracking to stay readable.
  **Applies to** SaaS app UI. **Check** `letter-spacing` is 0 except `text-transform: uppercase` (+1px) and brand text. **Source** sidebar header, section eyebrows

- **RULE** Set numerals in tables and money columns with tabular figures, right-aligned, header right-aligned too; prefix currency with a muted `$` and a space (the symbol is a separate lighter span); keep large single stats (28px/600, 24px/400) proportional.
  **Why** Tabular digits make columns of values comparable at a glance; a muted symbol keeps the number the dominant element.
  **Applies to** SaaS app UI. **Check** numeric `td` has `font-variant-numeric: tabular-nums` and `justify-content: flex-end`; matching `th` also flex-end. **Source** table (202 numeric nodes tabular)

- **RULE** Define section labels as one eyebrow style (12px, uppercase, +1px tracking, weight 400 in overlays and 500 in the sidebar) and use it for every grouping label (TEAM, CONTACT, PIPELINE HEALTH, SCORE CARD, COMPANY, OWNERSHIP & DEAL).
  **Why** A single recognisable label style makes grouping obvious without borders or boxes.
  **Applies to** SaaS app UI. **Check** all group labels share size/transform/tracking. **Source** sidebar, sheets, dialog

- **RULE** Express text hierarchy with five grey levels on a fixed ladder (primary `#f9fbff`, soft `#a4a4a4`, muted `#7f7f7f`, subtle `#676767`, faint `#454545`) and change colour on hover to the next level up, not a new hue; keep body-size text at >= 4.5:1.
  **Why** Colour level encodes importance so size can stay constant; skipping contrast on small captions is a known weakness here (subtle 3.2:1, faint 1.87:1).
  **Applies to** SaaS app UI. **Check** Measure each text colour on its surface; flag < 4.5:1 for <= 14px text. **Source** `measurements.json > contrast`

### 2.5 Surfaces, borders and shadows (dark)

- **RULE** Build a dark surface ladder from one near-black page colour with steps of 1-3 lightness points for panels (page `#161616`, sidebar `#171717`, sidebar header `#181818`) and larger steps for interactive layers (card `#1b1d20`, control `#1e1e1e`, raised/active `#2a2a2a`, hover `#333333`); never use pure black or a pure-white-based light surface.
  **Why** Small steps between structural panels keep the page calm; bigger steps only where state changes, so the eye reads state not structure.
  **Applies to** SaaS app UI (dark). **Check** Computed backgrounds of page, panels, controls, active states form a monotonic ladder; panel-to-panel delta <= 3/255 per channel. **Source** `measurements.json > tokens`

- **RULE** Separate regions with 1px hairlines at `#232323` and use `#393939` (about 16 points lighter) for anything that must stand on its own: popups, inputs, cards inside sheets, kbd; use white at 4-8% alpha for dividers inside components (the filter-pill split is 1px white/8).
  **Why** Two border strengths express "structure" versus "object"; alpha dividers adapt to the surface under them.
  **Applies to** SaaS app UI (dark). **Check** Borders in {#232323, #393939, white/4-8%, tinted tag borders}; 1px width everywhere except the 0.5px count chip. **Source** table, popups, filter pills

- **RULE** Give every raised control the same three-layer micro-shadow: 1px outer ring at 40% black, 1px top inset highlight at 10% white, 1px inner ring at 6% white; primary gets a richer stack (4px 4px drop at 32% grey, 1px near-black ring, top inset highlight 20% white 4px/6px blur, 1px inset ring 15% white, bottom inner shade 15% black 8px/14px).
  **Why** An inset top highlight plus ring reads as a physical edge on dark without any visible blur; identical recipe means every control matches.
  **Applies to** SaaS app UI (dark). **Check** `box-shadow` of all secondary controls is the same string; primary has its own single string. **Source** `measurements.json > shadows`

- **RULE** Reserve large shadows for overlays and use one token: `0 16px 40px rgba(0,0,0,.5)` plus a 1px `#0e0e0e` ring, paired with a 1px `#393939` border and a `rgba(0,0,0,.6)` scrim with a 6px backdrop blur; apply it identically to dialog, popover, menu, select popup and command palette.
  **Why** A dark UI needs the border for edge definition and the shadow only for separation from the scrim; one token keeps every layer at the same height.
  **Applies to** SaaS app UI (dark). **Check** All overlay `box-shadow` strings identical; scrim `backdrop-filter: blur(6px)`. **Source** all overlays. [engine note] This conflicts numerically with the founder's cards rule (blur <= 24px, alpha <= 0.16), which was written for light surfaces; scope that rule to light cards.

- **RULE** Colour semantic tags as tinted triplets (background about 12% saturated tint, 1px border one step lighter, text at 85-90% lightness of the same hue) from one token set of ten (blue, purple, green, moss, red, orange, amber, teal, yellow, neutral), each with measured text contrast 6.7-11.3:1.
  **Why** Triplets guarantee readable contrast and consistent edge weight on dark, so ten colours still read as one family.
  **Applies to** SaaS app UI (dark). **Check** Each tag has bg, border, text from the same `--tag-<hue>-*` triplet; text contrast >= 4.5:1 on its bg. **Source** table tags, `measurements.json > tokens.tags`

- **RULE** Put a 1px inner outline at white/10% (inset by its own width) on every avatar and logo image so light photos do not bleed into the dark surface; give stacked or overlapping avatars a 2px ring in the surface colour.
  **Why** A hairline defines the circle edge without adding a visible border; the surface-coloured ring cuts clean overlaps.
  **Applies to** SaaS app UI (dark). **Check** avatar element `outline: 1px solid rgba(255,255,255,.1)`, `outline-offset: -1px`. **Source** table owner column, notifications, sheets

### 2.6 Components and layout

- **RULE** Build the sidebar as: fixed 254px wide, 1px right border `#232323`, header block 57px (12px padding, 32px logo tile, 14px/500 brand with -0.01em tracking above a 12px `#676767` subtitle), nav sections with 12px padding and 4px gap separated by 1px dividers, rows 30px tall at 14px/500 with 8px radius, 6px icon gap and 14px icons, a footer block holding the plan/billing control.
  **Why** Every number on the ladder (12/8/6/30/14) is reused; the sidebar becomes a proof that the ladder works.
  **Applies to** SaaS app UI. **Check** sidebar width 254; nav row height 30, radius 8, icon 14, gap 6; section pitch constant. **Source** sidebar (`crop-sidebar.png`)

- **RULE** Mark the active nav row with a raised `#2a2a2a` pill, foreground text, `#d0d4dd` icon and the 3-layer micro-shadow; inactive rows are `#7f7f7f` text and `#676767` icon that both lift to foreground/`#d0d4dd` on hover with no background change; utility rows (Invite, Help) sit one level lower in grey.
  **Why** Hover changes only colour so the pill remains reserved for "you are here"; utility rows de-emphasised by colour instead of size.
  **Applies to** SaaS app UI (dark). **Check** active row `background-color: #2a2a2a`; inactive hover `background-color` unchanged. **Source** sidebar hover crops

- **RULE** Build the page header as a 58px row (14px vertical, 16px horizontal padding): 16px/500 title plus a 20px status badge (3px padding, 12px dot icon in `#16c89e`, 12px text) on the left; search and bell icon buttons (30px) and a 30px profile pill (20px avatar, 5px inset on the avatar side, 7px on the text side) on the right; a 6px red notification dot with a 2px surface-coloured ring at 7px from top and right.
  **Why** Equal 30px controls with an avatar inset to match the pill's vertical padding make the pill look concentric.
  **Applies to** SaaS app UI. **Check** header height 58; controls 30; avatar inset = (30 - 20) / 2 on the leading side. **Source** header crop

- **RULE** Build filter pills as one split control: a 30px pill with a `#676767` 12px label segment (9px side padding), a 1px white/8% divider, a foreground value segment (9px padding, 6px gap) and a 12px chevron that rotates 180deg in 200ms when the menu opens; give the open pill the raised `#2a2a2a` fill.
  **Why** Label and value in one pill saves a column of labels and shows the current state without opening anything.
  **Applies to** SaaS app UI. **Check** pill height 30, divider 1px, chevron `transform: rotate(180deg)` when `data-state=open`. **Source** toolbar

- **RULE** Build tables on a CSS subgrid with `border-collapse` rows: header 38px at 12px/`#676767`, rows 42px plus a 1px `#232323` divider (43 pitch), 12px cell padding, row hover `#1b1d20` at 60% alpha, selected row solid `#1b1d20` with a matching bottom border, 16px checkbox in a 20px-gap lead cell, whole row clickable, a 24px ghost action button at the right.
  **Why** Subgrid keeps header and cells in lockstep; hover and selected use the same card colour at two strengths so the states relate.
  **Applies to** SaaS app UI. **Check** `th` 38, `td` 42, `tr` pitch 43; hover and selected backgrounds from the same token. **Source** table (`crop-table-rows.png`)

- **RULE** Give owner and secondary links inside cells a ghost hit area: 28px tall pill, negative horizontal margin equal to the 6px padding so the avatar stays aligned with the column header, hover fill white/6%.
  **Why** A padded hover target aligned to the content edge keeps the column optically straight while giving a comfortable target.
  **Applies to** SaaS app UI. **Check** owner link `margin-left == -padding-left`; hover bg white at 6%. **Source** table owner column

- **RULE** Add a 39px aggregate bar at the bottom of a data table: grid of equal cells with 1px gaps and an outline in the border colour, 12px labels, first cell showing the count in foreground and the rest as ghost "+ Sum of ..." calculators.
  **Why** Aggregates anchored to the table's bottom edge read as part of the data, not a footer.
  **Applies to** SaaS app UI. **Check** footer height 39 and cell dividers 1px. **Source** footer crop

- **RULE** Build text fields at 36px / 8px radius / 12px horizontal padding / 14px text on the `#1e1e1e` control surface with a 1px `#393939` border; focus changes only the border colour to `#676767` (no ring), error changes it to `#f97373` with a 12px error line below in the same red; selects share the exact box and put a 12px chevron on the right.
  **Why** One field box for input and select makes forms align; focus by border colour avoids a second visual language inside fields.
  **Applies to** SaaS app UI (dark). **Check** `input`/`select-trigger` height 36, radius 8; focus `border-color #676767`, `box-shadow: none`. **Source** New Company dialog (`dark-ov-newcompany-validation.png`)

- **RULE** Build a dialog as header (title 16px/600, description 12px `#a4a4a4`, 20px/24px padding, 1px divider) + scrolling body of fieldsets separated by 1px dividers with eyebrow labels + footer (16px/24px padding, 1px top divider, Cancel as a quiet 30px pill and a primary pill with a leading 12px plus icon); width 560 at 1440.
  **Why** Dividers instead of cards keep the long form flat; the same padding recipe repeats per fieldset.
  **Applies to** SaaS app UI. **Check** header height 77, fieldset padding 20/24, footer height 63. **Source** New Company dialog

- **RULE** Build a detail sheet that slides from the right: 560px wide for entity detail and 480px for owner/profile, 1px `#393939` left border, 56px header (14px icon + 14px title, 24px close button with 16px icon), scrolling sections with 20px padding and eyebrow labels, 62px footer with help link left and Cancel plus primary right.
  **Why** A sheet keeps the list visible behind the scrim, so context is never lost; fixed header and footer keep actions reachable.
  **Applies to** SaaS app UI. **Check** sheet width 560/480, header 56, footer 62. **Source** detail and profile sheets

- **RULE** Build the command palette as a 12px-radius dialog with a 48px input row (14px search icon, 10px gap, Esc kbd), a 36px column header row, 40-44px result rows (8px radius, 10px horizontal padding, 16px gap, 24px logo tile) showing the same columns as the table, and a 40px footer with kbd hints (20px kbd, 6px radius, 6px padding).
  **Why** Reusing the table's columns and tag/meter components makes search results a faithful miniature of the table.
  **Applies to** SaaS app UI. **Check** input row 48, header 36, footer 40; result row shows tags, owner, meter. **Source** `dark-ov-search.png`

- **RULE** Build menus as 168px-wide popups with 8px radius, 4px inner padding, a 12px `#676767` group label, 28px items at 12px with 6px radius and a 24px left inset reserving room for a 6px selected dot; highlighted item fills white/6% and lifts text from `#a4a4a4` to foreground.
  **Why** A reserved check column keeps item text aligned whether or not an item is selected.
  **Applies to** SaaS app UI. **Check** item height 28, left padding 24, hover background white at 6%. **Source** sort/filter menus (`dark-ov-menu-sortby-highlight.png`)

- **RULE** Build a notifications popover as 400px wide, 12px radius, 56px header (title 16px/600 with a 16px count chip, ghost "Mark all as read" 30px), a 37px tab row, list inset 6px with 2px gap and 12px-padding 8px-radius items holding a 32px avatar with a 16px app badge, name in 14px/500, meta in 12px `#676767` and a 6px red unread dot.
  **Why** Unread state is shown with one dot and a preview card; no bold-whole-row or background colour change is needed.
  **Applies to** SaaS app UI. **Check** popover width 400, tabs 37, item padding 12. **Source** `dark-ov-notifications.png`

### 2.7 Data visualisation

- **RULE** Draw inline metrics as quantised segmented meters: container 74x14 with 2px padding and 2px gap, 17 segments of about 2.2x10px at 1px radius, colour by position (red then amber then green) and unfilled segments `#3a3a3a`; the filled count equals round(value x segments) (82% shows 14/17) and the percentage sits right-aligned in a 4ch box.
  **Why** Segmentation turns a continuous percentage into a countable texture that stays legible at 74px, and colour-by-position encodes risk without a legend.
  **Applies to** SaaS app UI (dark). **Check** meter segments count, gap 2px, filled/total ~ value. **Source** table win probability, command results

- **RULE** Use one meter grammar at every size: in sheets the same meter stretches to full width (63 segments of about 6.2x8px, 12px container with 1px border white/4%, 2px gap), one meter per stage coloured as a single hue (red, amber, green) instead of a gradient.
  **Why** A single grammar scales from cell to sheet; hue per row avoids a rainbow bar in a stacked list.
  **Applies to** SaaS app UI (dark). **Check** same `gap` and radii at both sizes. **Source** detail sheet, New Company dialog (live preview of the probability meter)

- **RULE** Draw sparklines as 14 bars 4px wide with 1px gaps, heights from 2 to 14px, 1px radius, two greens (strong `#00b562`, muted `#395e4d`) in a 14px-high box; the same micro-chart appears larger (22px) next to a 24px hero numeral.
  **Why** Bar sparklines need no axes; two tones of one hue show emphasis without extra colours.
  **Applies to** SaaS app UI (dark). **Check** bar width 4, gap 1, two background colours. **Source** table Activity Trend column, detail sheet

- **RULE** Use hand-built DOM spans (not a chart library) for micro-charts in dense tables and reserve a library for large charts; none of the micro-charts has an axis, gridline or tooltip.
  **Why** Spans render in the same pixel grid as the type and need no resize logic; omitting axes is acceptable only for tiny relative-trend glyphs next to a number.
  **Applies to** SaaS app UI. **Check** no `svg`/`canvas` in table rows. **Source** table (no chart, axis, grid or tooltip exists on this screen; the Forecast tab shows the same table)

### 2.8 Interaction states and motion

- **RULE** Use one hover grammar: raised controls move one surface step (`#1e1e1e` to `#2a2a2a`, `#2a2a2a` to `#333333`, primary `#4124fb` to `#4b30ff`), ghost items gain white/6% fill, rows gain `#1b1d20` at 60%, nav and tabs change only text/icon colour one level up (`#7f7f7f` to `#f9fbff`, `#676767` to `#a4a4a4`), checkboxes brighten `#323232` to `#393939`.
  **Why** Predictable one-step hover makes the interface feel coherent and avoids extra colours.
  **Applies to** SaaS app UI (dark). **Check** hovered computed colours per control type (table in 3.8). **Source** `measurements.json > hover`

- **RULE** Time every control transition at 150ms with `cubic-bezier(.25,1,.5,1)` on `background-color, color, box-shadow` only (tabs: `color, border-color`; fields: `border-color`); rotate chevrons in 200ms on the same curve; never transition `all` on controls.
  **Why** One duration and curve gives uniform response; listing properties prevents layout properties animating.
  **Applies to** SaaS app UI. **Check** computed `transition-duration: 0.15s` and `transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1)` on `button, tr, th`. **Source** `measurements.json > transitions`

- **RULE** Open overlays on ease-out-quart and close them faster on ease-in: popover and menus 200ms in, 150ms out with scale .95-.97 plus fade; dialog 250ms in, 200ms out scale .95 plus fade; command palette 200ms in, 150ms out scale .98; sheet 350ms in, 250ms out translate X 100% to 0; scrim fades with the same timing; close is about 0.75x the open duration.
  **Why** Entering needs time to be perceived and leaving should not hold the user; popovers derive their transform origin from the trigger so they grow from it.
  **Applies to** SaaS app UI. **Check** `animation-duration` and `animation-timing-function` on `[data-state=open|closed]`. **Source** `measurements.json > animations`

- **RULE** Show keyboard focus as a 2px ring (no offset) at the ring token `#676767` at 60% alpha on every button, checkbox, link and row control; fields use border colour; tabs use text colour; do not use the browser outline.
  **Why** One recognisable ring on pills follows their radius (box-shadow follows border-radius) and never shifts layout.
  **Applies to** SaaS app UI (dark). **Check** `:focus-visible` `box-shadow` ring 2px spread 0 blur 0 on buttons; `outline: none`. **Source** `measurements.json > focusRing`, `crop-focus-*.png`

- **RULE** If the product gives no press feedback, say so deliberately: this UI has no `:active` transform or colour change; the hover state persists while pressed. Add press feedback only if the brand needs tactility (the Kaching spec uses scale .98).
  **Why** This is a measured absence, recorded so it is not copied by accident as a "rule".
  **Applies to** SaaS app UI. **Check** `getComputedStyle` of a button while the mouse is down: `transform: none`. **Source** `measurements.json > press`

- **RULE** Tie only the chevron rotation to `prefers-reduced-motion: no-preference`; the overlay enter/exit animations here are not gated and should be gated in new builds.
  **Why** Only one utility in the served CSS is motion-safe gated; reduced-motion users still get scale/slide overlays.
  **Applies to** SaaS app UI. **Check** `@media (prefers-reduced-motion: reduce)` disables overlay scale/translate. **Source** served CSS (1 occurrence of the query)

### 2.9 Process rules taken from how this UI was made

- **RULE** Name five type roles as CSS utilities and reuse them (here: lead 14px, caption 12px, eyebrow 12px uppercase +1px, plus h1/h2 16px and numeral 24-28px) with `line-height: 1` baked in, so components cannot invent their own line-height.
  **Why** Type roles with line-height baked in are what make every control's centring mathematically identical.
  **Applies to** SaaS app UI. **Check** `line-height == font-size` on role classes. **Source** served CSS (`lead-style`, `caption-style`, `eyebrow-style`)

- **RULE** Keep the control recipe in one shared base (inline-flex, center, 6px gap, nowrap, pill radius, 150ms transition, focus ring) and vary only background, text colour, shadow and size across variants.
  **Why** Variants that share a base cannot drift in radius, gap or focus.
  **Applies to** SaaS app UI. **Check** all `button` elements share `transition-property`, `border-radius`, `column-gap`. **Source** class inventory (public DOM)

- **RULE** Build the demo screen with believable coherent data: 18 real company names with real logos, owners with face avatars, plausible values in a descending order, dates, win probabilities in the range 22-86%, and one pre-selected row, so every state in a screenshot looks like a working product.
  **Why** The founder's bar is "rich, believable product UI"; real logos and faces carry as much polish as any token.
  **Applies to** SaaS app UI. **Check** visual: no lorem ipsum, no "User 1". **Source** main table. [engine note] Mark any such sample data as sample per the engine's no-invented-proof rule.

## 3. Numbers & scales

### 3.1 Component spec table (all measured; px; dark mode)

| Component | Height | Padding | Radius | Icon | Font (size/weight/lh/tracking) | Fill, border, shadow |
|---|---|---|---|---|---|---|
| Sidebar width | 900 (full) | nav 12 | none | n/a | n/a | `#171717`, 1px right `#232323` |
| Sidebar header | 57 incl. 1px border | 12 | tile 8 (32px) | 32px tile | brand 14/500/1/-0.14px; sub 12/400/1 `#676767` | `#181818`, border-b `#232323` |
| Sidebar nav row | 30 (active 32 + 3px margin) | 8 sides, 0 vertical | 8 | 14 | 14/500/1/normal | idle transparent, `#7f7f7f`; active `#2a2a2a` + 3-layer micro shadow |
| Sidebar eyebrow | 12 | 0 | n/a | n/a | 12/500/1/+1px uppercase `#454545` | none |
| Sidebar count chip | 16 (min-w 24) | 4 | pill | none | 12/400/1 `#cfcfcf` | `#2a2a2a`, 0.5px `#414141`, 0.5px `#0e0e0e` ring |
| Page header | 58 | 14 / 16 | n/a | n/a | h1 16/500/16 | transparent |
| Status badge | 20 | 3 / 5 / 3 / 3 | pill | 12 dot `#16c89e` | 12/400/1 | `#2a2a2a`, 1px `#363636` |
| Icon button 30 | 30x30 | 0 | pill | 14 | n/a | `#1e1e1e`; hover `#2a2a2a`; 3-layer micro shadow |
| Profile pill | 30 | 5 / 7 / 5 / 5, gap 6 | pill | avatar 20 | 12/400/1 | same as icon button |
| Tab trigger | 45 (page) / 37 (popover) | 16 vertical (12 in popover), 16 gap between tabs | none | none | 12/400 idle, 12/500 active | border-b 1px: foreground active, transparent idle; text `#676767` to `#f9fbff`; hover `#a4a4a4` |
| Filter pill (split) | 30 | label 9, value 9, gap 6 | pill | chevron 12 `#898b8d` | 12/400 label `#676767`, 12/400 value foreground | `#1e1e1e`, micro shadow, divider 1px white/8 |
| Button secondary (Export) | 30 | 9 all, gap 6 | pill | 12 | 12/500/1 | `#1e1e1e` (Cancel in sheets: `#232323`), micro shadow |
| Button primary | 30 | 9 all, gap 6 | pill | 12 | 12/500/1 | `#4124fb`, hover `#4b30ff`, 5-layer shadow |
| Ghost row action | 24x24 | 0 | pill | 12 (dots) / 16 (close) | n/a | transparent, hover white/6% |
| Input / select | 36 | 12 horizontal | 8 | chevron 12 | 14/400/1 | `#1e1e1e`, 1px `#393939`; focus border `#676767`; error `#f97373` |
| Tag (segment/stage) | 22 | 8 + 1px border | pill | none | 14/400/1 | tint triplet per hue; neutral `+N` has 6px padding |
| Avatar | 20 (table), 32 (notification), 50 (profile) | n/a | pill | n/a | n/a | bg `#f2f2f2`, outline 1px white/10 inset |
| Logo tile | 24 / 32 / 50 / 56 | n/a | 25% of side | n/a | n/a | `#2a2a2a`, ring/shadow |
| Table header cell | 38 | 12 horizontal | none | none | 12/400/1 `#676767` (tabular on numeric) | transparent |
| Table row / cell | 42 (+1 divider = 43) | 12 horizontal | none | calendar 14, row dots 12 | 14/400/1 (numeric tabular) | divider `#232323`; hover `#1b1d20` 60%; selected `#1b1d20` |
| Checkbox | 16 | 0 | 4 | 16 | n/a | stroke `#323232`; checked fill `#FFDB4B` (hard-coded, not `--warning`) |
| Win-probability meter | 14 (74 wide) | 2, gap 2 | 2 (segment 1) | none | % text 14/400 tabular 4ch right | `white/8` track, segments red/amber/green, empty `#3a3a3a` |
| Sparkline | 14 (69 wide) | 0, gap 1 | bar 1 | none | n/a | `#00b562` / `#395e4d` |
| Aggregate footer | 39 | cell 12 | none | + 12 | 12/400 | cells outlined 1px `#232323` |
| KPI tile (sheet) | 62 (124 wide) / profile 62 (216 wide) | 11 + 1px border, gap 12 | 8 | 12 | label 12 `#a4a4a4`; value 14/400 | 1px `#393939`, transparent |
| Score card | 104-120 | 16, gap 16 | 8 | star pill 16 | title 16/400, body 14/400/16.1 `#a4a4a4` | `#1b1d20`; 0 4px 4px 32% grey, 1px `#0e0e0e` ring, inset white 8% |
| Chart card | none on this screen | | | | | the sheet meters (63 segments, 12px container) are the only chart-like card |
| Dropdown menu | 174-362 (168 wide) | 4 inner; item 28 px 8 / pl 24 | popup 8; item 6 | selected dot 6 | 12/400/1 `#a4a4a4`; label `#676767` | `#161616`, 1px `#393939`, overlay shadow |
| Popover (notifications) | 515 (400 wide) | header 16, list 6, item 12 | 12 | avatar 32 | title 16/600; names 14/500 | `#161616`, 1px `#393939`, overlay shadow |
| Command palette | 486 (960 wide) | input row 16, list 6, row px 10 | 12; row 8 | 14, tile 24 | 14/400 | `#161616`, 1px `#393939`, overlay shadow |
| Dialog | 812 (560 wide) | header 20/24, fieldsets 20/24, footer 16/24 | 12 | close 16 in 24px button | title 16/600; labels 12 `#a4a4a4` | `#161616`, 1px `#393939`, overlay shadow |
| Sheet | 900 (560 / 480 wide) | header 0/24 x 56, sections 20, footer 0/24 x 62 | 0 (flush), 1px left border `#393939` | 14 title icon | title 14/400; numerals 28/600 and 24/400 | `#161616` |
| Toast | not present in the bundle | | | | | |
| Slider | 16 thumb, 6 track | n/a | pill | n/a | value 12 | thumb `#f9fbff` with 0 2px 6px 50% black + 1px 40% ring; track `#3a3a3a`, fill `#a4a4a4` |
| Kbd | 20 (min-w 20) | 6 | 6 | n/a | 12/400/1 `#a4a4a4` | `#2a2a2a`, 1px `#393939` |

### 3.2 Radius ladder (px) with members

| Radius | Members |
|---|---|
| pill (9999) | buttons, icon buttons, filter pills, profile pill, tags, count chips, status badge, avatars, slider, scroll thumb |
| 14 / 12.5 | 56px and 50px logo tiles (25% of side) |
| 12 | dialog, notifications popover, command palette |
| 8 | inputs, selects, sidebar rows, command rows, notification items, menus (popup), sheet cards, 32px tiles |
| 6 | kbd, menu items, 24px tiles |
| 5 | 16px app badge on notification avatars (31%, off the 25% rule) |
| 4 | checkbox |
| 2 | meter container |
| 1 | meter and sparkline segments |
| 0 | sheet, table rows, tab triggers |

### 3.3 Spacing frequency (all captured states, 2,600 values)

| Value (px) | 1 | 2 | 3 | 4 | 6 | 8 | 9 | 10 | 11 | 12 | 16 | 20 | 24 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Count | 65 | 240 | 158 | 324 | 397 | 478 | 60 | 78 | 32 | 535 | 108 | 82 | 36 |

Gaps only: 1:46, 2:122, 3:76, 4:270, 6:242, 8:252, 10:38, 12:104, 16:59, 20:38. Paddings only: 2:118, 4:54, 6:153, 8:226, 9:60, 10:40, 11:32, 12:431, 16:49, 20:44, 24:36. Sidebar section blocks: 12px padding, 4px gap, constant 41px gap between a section's last row and the next section's first row.

### 3.4 Type scale (tuples, counts across captured states)

| Size / weight / line-height / tracking | Count | Role |
|---|---|---|
| 14 / 400 / 14 / normal | 219 | cell text, names, tags, field text |
| 14 / 400 / 14 / normal, tabular | 202 | numeric cells |
| 12 / 400 / 12 / normal | 118 | captions, labels, sidebar subtitle, filter value |
| 14 / 500 / 14 | 19 | nav, owner names, help link |
| 12 / 500 / 12 | 12 | buttons |
| 14 / 400 / 16.1 | 12 | wrapped paragraphs |
| 12 / 400 / 12 / +1px uppercase | 10 | overlay eyebrows |
| 12 / 500 / 18 | 6 | filter values |
| 16 / 600 / 16 | 5 | dialog and popover titles, entity name |
| 14 / 500 / 16.1 | 5 | notification names |
| 12 / 500 / 12 / +1px uppercase `#454545` | 4 | sidebar eyebrows |
| 12 / 400 / 18 `#676767` | 4 | filter labels |
| 12 / 400 / 12, tabular | 4 | numeric headers |
| 14 / 500 / 14 / -0.14px | 2 | brand name |
| 16 / 500 / 16 | 1 | page h1 |
| 28 / 600 / 28 | 1 | hero percentage (sheet) |
| 24 / 400 / 24 | 1 | hero numeral (sheet) |

### 3.5 Icon sizes by control

| Control | Icon | Notes |
|---|---|---|
| 30px text buttons, pills, status badge | 12 | 1.2px rendered stroke |
| 30px icon-only, nav rows (30), cell icons, command items | 14 | 1.4px rendered stroke |
| 24px ghost buttons | 12 (dots) or 16 (close) | |
| Checkbox | 16 | 16px grid, 1.333 stroke |
| Notification app badge | 10 | in a 16px tile |

### 3.6 Dark token table (the only theme; `:root`)

| Token | Value | Use |
|---|---|---|
| `--background` / `--popover` | `#161616` | page, dialogs, popovers, sheets |
| `--sidebar` | `#171717` | sidebar |
| `--sidebar-accent` | `#181818` | sidebar header and footer blocks |
| `--card` | `#1b1d20` | selected/hover row, score card |
| `--secondary` / `--input` bg | `#1e1e1e` | controls, fields |
| `--border` / `--sidebar-border` | `#232323` | hairlines |
| `--muted` / `--accent` / `--sidebar-primary` | `#2a2a2a` | raised, active nav, chips, kbd |
| hover on `--muted` | `#333333` | |
| `--line-strong` / `--input` | `#393939` | popup, field and card borders |
| `--track` | `#3a3a3a` | meter and slider track |
| `--faint` | `#454545` | sidebar eyebrows |
| `--ring` / `--subtle` | `#676767` | focus ring colour (at 60%), th, captions |
| `--muted-foreground` / `--sidebar-foreground` | `#7f7f7f` | nav text |
| `--soft` | `#a4a4a4` | descriptions, labels, menu items |
| `--chip` | `#cfcfcf` | chip text |
| `--icon` | `#d0d4dd` | active icon |
| `--foreground` | `#f9fbff` | primary text (cool white) |
| `--primary` | `#4124fb` (hover `#4b30ff`) | primary button |
| `--success` / `--warning` / `--danger` | `#22c55e` / `#fbbf24` / `#f97373` | meter segments, errors, notification dot |
| `--trend` / `--trend-muted` | `#00b562` / `#395e4d` | sparklines |
| `--status` | `#16c89e` | status dot |
| Tag triplets (bg / border / text) | blue `#1d2b3e/#23354c/#bfdbfe`; purple `#231f3a/#4b437b/#b7aee9`; green `#1f3a2d/#275137/#b1ebc5`; moss `#23451d/#2e5029/#b1ebc5`; red `#3e1d1e/#4c2324/#febfc6`; orange `#3e291d/#764d35/#eeb390`; amber `#31221b/#6c4830/#fed7aa`; teal `#102a27/#3b6149/#22c55e`; yellow `#33301a/#5a5228/#fde68a`; neutral `#2a2a2a/#363636/#cfcfcf` | |
| Scrim | black at 60% + backdrop blur 6px | overlays |
| Contrast | foreground 17.5:1; soft 7.3:1; muted on sidebar 4.5:1; subtle 3.2:1; faint 1.9:1; primary text on primary 7.1:1; tag text 6.7-11.3:1 | measured on `#161616`/`#171717` |

### 3.7 Shadows and borders (full strings)

| Component | `box-shadow` |
|---|---|
| Secondary controls (icon button, pill, filter pill, nav active, billing) | `0 0 0 1px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.10), inset 0 0 0 1px rgba(255,255,255,.06)` |
| Primary button | `0 4px 4px rgba(42,42,42,.32), 0 0 0 1px #0e0e0e, inset 0 4px 6px rgba(255,255,255,.20), inset 0 0 0 1px rgba(255,255,255,.15), inset 0 -8px 14px rgba(0,0,0,.15)` |
| Overlay token (dialog, popover, menu, select, command) | `0 16px 40px rgba(0,0,0,.5), 0 0 0 1px #0e0e0e` plus 1px `#393939` border |
| Score card | `0 4px 4px rgba(42,42,42,.32), 0 0 0 1px #0e0e0e, inset 0 1px 0 rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.08)` |
| Count chip | `0 0 0 .5px #0e0e0e` plus 0.5px `#414141` border |
| Slider thumb | `0 2px 6px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4)` |
| Focus ring (buttons) | `0 0 0 2px` at `#676767` 60% (replaces/stacks with the control's micro shadow) |
| Avatar | outline 1px white/10, offset -1px; stacked avatars 2px ring in surface colour |

### 3.8 Hover, focus and motion tables

Hover (computed before to after, 450ms after pointer enters):

| Control | Change |
|---|---|
| Nav row idle | text `#7f7f7f` to `#f9fbff`; icon `#676767` to `#d0d4dd`; no bg |
| Nav row active | none |
| Utility rows (Invite, Help) | text `#676767` to `#f9fbff` |
| Tab idle | text `#676767` to `#a4a4a4` |
| Filter pill, Export, search, bell, profile pill | bg `#1e1e1e` to `#2a2a2a` |
| Primary | bg `#4124fb` to `#4b30ff` |
| Billing button | bg `#2a2a2a` to `#333333` |
| Table row | transparent to `#1b1d20` at 60% |
| Row action, owner link | transparent to white/6% |
| Checkbox | stroke `#323232` to `#393939` |
| Press (mouse down) | no transform, no colour beyond hover |

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Control hover/focus | background-color, color, box-shadow | 150ms | `cubic-bezier(.25,1,.5,1)` |
| Tab | color, border-color | 150ms | same |
| Field | border-color | 150ms | same |
| Chevron rotate | rotate 180deg | 200ms | same (only motion-safe-gated item) |
| Dialog in / out | opacity + scale .95 to 1 / reverse | 250 / 200ms | out-quart in, `(.5,0,.75,0)` out |
| Sheet in / out | translateX 100% to 0 / reverse; scrim fade | 350 / 250ms | same |
| Popover in / out | opacity + scale .97, origin = trigger | 200 / 150ms | same |
| Menu, select in / out | opacity + scale .95 | 200 / 150ms | same |
| Command palette in / out | opacity + scale .98 | 200 / 150ms | same |
| Scrollbar | fade in | 150ms | same |
| Idle | none (no infinite animations, no layout animation, no spring) | | |
| One outlier | help link colour transition | 150ms | `(.76,0,.24,1)` (power3-in-out), unlike every other control |

Easing token names in the CSS: `ease-power1..4` in/out/in-out and `ease-smooth-in-out` `(.7,0,0,1)`, plus Tailwind default; the product uses power3-out and power3-in only.

### 3.9 Data-viz specs

| Element | Spec |
|---|---|
| Win-prob meter (table) | 74x14, padding 2, gap 2, 17 segments 2.23x10, container radius 2, segment radius 1, track `white/8` + empty `#3a3a3a`, 14 filled at 82% |
| Win-prob meter (sheet) | full width 519x12, 1px border white/4, padding 1, gap 2, 63 segments 6.2x8 |
| Sparkline | 14 bars, 4 wide, 1 gap, heights 2/4/5/7/10/11/14, container 69x14 (22 high in sheet), colours `#00b562`, `#395e4d` |
| Slider + meter | 6px track (pill), 16px thumb, live meter below the slider |
| Charts, gridlines, tooltips | none exist on this screen |

### 3.10 Layout geometry at 1440x900

| Part | Geometry |
|---|---|
| Sidebar | x0-254, border-right 1px; header 57; nav sections 210/131/101/130 px high; utility block 86 (y747-833); plan block 67 (y833-900) |
| Main | x254-1440 (1186 wide): header 0-58, tabs 58-103, toolbar 103-165 (62 high), table header 166-205 (38 + dividers), rows pitch 43 from y205, aggregate footer 861-900 (39) |
| Table columns (x, w) | Company 254/153, Segment 410/211, Owner 624/143, Open Deals 770/88, Pipeline 861/101, Win Prob 965/143, Trend 1111/99, Last Interaction 1213/165, Action 1381/59 |
| Dialog | 560 wide at 1440, 812 high; header 77, fieldsets 270/276/124, footer 63 |
| Sheet | 560 (detail) / 480 (profile) wide, 900 high; header 56, footer 62; section heights 90/96/246/202/442 |
| Command palette | 960 wide, 486 high; input 48, header 36, footer 40 |
| Popover | 400 wide, 515 high; header 56, tabs 37 |
| Mobile (390x844) | sidebar becomes a nav sheet; header gains a 30px hamburger; toolbar collapses to Filters + Export + primary; table scrolls horizontally with the first columns visible; aggregate footer becomes a 2x2 grid |

## 4. Dos and Don'ts

**Do (shown by the live UI)**
- Pills for every action, 8px rectangles for fields (`dark-main.png`, `dark-ov-newcompany-validation.png`): shape separates press from type.
- Icon-only 30px buttons with a 14px icon and a 6px notification dot at 7px/7px with a surface-coloured 2px ring (`crop-header-tabs-toolbar.png`): dot never touches the glyph.
- One split filter pill per filter with label, hairline, value, chevron (`crop-header-tabs-toolbar.png`): saves a toolbar row.
- Table numerals tabular and right-aligned under right-aligned headers; currency symbol muted (`crop-table-rows.png`).
- Quantised 17-segment meter next to its percentage and a 14-bar sparkline in the same row (`crop-table-rows.png`): two small data views, one hue family.
- Real logos in 25%-radius tiles and real face avatars with a 1px inner outline (`dark-ov-search.png`, `dark-ov-profile-sheet.png`).
- Dialog fieldsets separated by hairlines with uppercase eyebrow labels and a live meter below the slider (`dark-ov-newcompany-validation.png`).
- Overlays that grow from the trigger, with a blurred 60% scrim (`dark-ov-detail-sheet.png`).

**Don't (what this UI avoids, or where it slips)**
- No third radius for actions: no 6px or 10px buttons next to pills; none exists.
- No shadows on cards in the page body: depth comes from surface steps and hairlines.
- No separate focus language per component beyond the three used (ring on pills, border on fields, colour on tabs); do not add a fourth.
- No chart axes for micro-charts; if a larger chart is added it needs axes and tooltips, which this reference does not demonstrate.
- No press scale: this reference is not the model for pressed feedback.
- Do not copy the sub-AA captions (`#676767` at 12px = 3.2:1; sidebar eyebrows `#454545` = 1.9:1) when the product must meet WCAG.

## 5. Exceptions & judgement calls

### 5.1 Consistency report (founder priority)

**Perfectly consistent (measured)**

| Axis | Result |
|---|---|
| Icon centring, icon-only (24 controls: 30px and 24px buttons, 56px upload tile) | icon box centre offset 0.00px on both axes for all 24; glyph bounding-box centre max 0.29px (bell), median 0.00px |
| Icon centring, icon + label (84 controls after excluding 2 measurement artefacts: the logo tile against a 2-line text block and the palette search icon against the Esc kbd) | icon centre vs label line-box centre 0.00px for every control; vs cap-height centre median 0.03px at 14px labels and 0.26px at 12px labels, max 0.32px |
| Text vertical centring | text cap-centre vs container centre: 14px nav and cells +0.03px; 12px buttons, pills, th, menu items -0.26px; tags (22px) +0.03px; tabs -0.76px (1px bottom border); all within 1px |
| Text horizontal balance in text-only badges | tags 9/9 px (8 + 1 border) for 30 of 30 coloured tags; count chips 5/5 and 8.44/8.44; `+N` chips 7px left (6 + border) by design |
| Action height | every header, toolbar, nav and footer button is exactly 30px (nav active 32 with a 3px margin hack); every field is exactly 36px |
| Pill radius | 100% of buttons, tags, chips, filter pills, avatars are fully rounded; 0 exceptions |
| Field radius | 8px on all 8 field elements measured (4 inputs, 4 selects) |
| Overlay radius | 12px on dialog, popover, command palette (3 of 3); menus 8px (2 of 2) |
| Row/column geometry | all 18 rows 43px pitch; all 9 th/td pairs share x and width; numeric columns justified end in both header and cell |
| Hover/transition | all 200+ interactive elements use 150ms and one curve (one outlier link) |
| Focus ring | 2px ring, same token, on every focusable element tabbed (sidebar rows, header controls, checkboxes, row buttons) |
| Overlay chrome | identical shadow string, 1px `#393939` border, 6px blur scrim on every overlay |
| Type | 5 sizes, 3 weights, one family, line-height equals font size on all single-line UI text |
| Spacing | 88% even values; odd values only as border compensation |

**Drift found (small, honest)**

1. Sidebar active row is 32px tall while idle rows are 30px; the first list item carries a 3px bottom margin so the pitch stays 30px from the second row on. The active pill is therefore 2px taller than its neighbours' pills.
2. Three title treatments: page h1 16/500, dialog and popover titles 16/600, sheet titles 14/400 with a leading 12px icon.
3. Two sheet widths (560 detail, 480 profile) and three different header heights (sheet and popover 56, dialog 77, command 48) by content type, not by one rule.
4. Badge heights: 16 (count chip), 20 (status badge, kbd), 22 (tag); `+N` neutral chip padding 6 versus 8 on coloured tags.
5. The 16px app badge on notification avatars uses a 5px radius (31%), every other tile uses 25%.
6. Checked checkbox and indeterminate header checkbox use a hard-coded `#FFDB4B` inside the SVG, not the `--warning` token (`#fbbf24`) that the meter uses; checkbox idle stroke `#323232` is also a literal.
7. Secondary button fill differs by context: Export/filter/icon buttons `#1e1e1e`, Cancel in sheet footers `#232323` (the border colour).
8. Meter vertical inset: table meter 2px (14px box, 10px segments), sheet meter 1px inside a 1px border (12px box, 8px segments).
9. Native `type=date` control shows the browser calendar glyph, outside the icon set (`dark-ov-newcompany-validation.png`).
10. One link (help in sheet footer) transitions on the in-out curve `(.76,0,.24,1)`; everything else uses out-quart.
11. Text contrast: `#676767` captions 3.2:1 and `#454545` sidebar eyebrows 1.9:1 are below WCAG AA for 12px text; only the five-grey ladder is consistent, not accessible.
12. Sidebar header (57px) and page header (58px) are 1px apart; no visible divider on the page header so it does not show.
13. Input focus ring and button focus ring are different grammars (border vs 2px ring); consistent within each class but two systems.
14. Non-functional demo parts (nav, tabs, Export, Help, billing) look interactive and give hover feedback but do nothing; the UI would need real routes to prove state consistency across views.

### 5.2 Judgement calls

- **Pill radius for all actions is a brand choice.** It gives a friendly, compact CRM feel but caps density tricks; the shape/height split (pill 30, field 8/36) is the transferable part, not pill-ness. For Larpo's Kaching spec (14px radius buttons) keep the same split principle with its own values.
- **Line-height 1 everywhere is only safe with fixed-height containers and single-line text.** It breaks multi-line labels and descenders in uppercase-free text in tight boxes; wrapped paragraphs here switch to about 1.15.
- **No press feedback and no spring motion** is a restrained choice that reads as precise; the founder's Kaching spec has press scale .98. Pick one deliberately per brand.
- **Dark-only avoids half the consistency problem** (no token pairs to keep in sync). For a light+dark product, build the ladder logic (1-3 point panel steps, hairline strengths, tint triplets) as paired tokens and measure both; this teardown cannot show light-mode behaviour.
- **Overlay shadow (0 16px 40px at 50%) contradicts the founder's whisper-shadow rule** for light cards; it works because the dark scrim already separates and a 1px light border defines the edge. Scope the founder rule to light surfaces.
- **Real brand logos and portraits carry perceived quality.** The engine must source licensed or clearly sample imagery; do not hand-draw logos (founder rule).

## 6. Figures worth keeping

All in `knowledge/benchmarks/kargul-crm/`:
- `dark-main.png`: full screen default state (sidebar + header + tabs + toolbar + table + aggregate footer).
- `crop-sidebar.png`, `crop-header-tabs-toolbar.png`, `crop-table-rows.png`, `crop-footer-aggregate.png`: component crops at 2x for radius, centring and spacing inspection.
- `dark-ov-search.png`, `dark-ov-search-query-ap.png`, `dark-ov-search-empty.png`: command palette, filtered and empty state.
- `dark-ov-notifications.png`, `dark-ov-notifications-unread.png`: popover with unread dots and tabs.
- `dark-ov-detail-sheet.png`, `dark-ov-detail-sheet-scrolled.png`, `dark-ov-profile-sheet.png`, `dark-ov-profile-sheet-scrolled.png`, `dark-ov-owner-profile-sheet.png`: sheets with meters, KPI tiles, score cards.
- `dark-ov-menu-sortby.png`, `dark-ov-menu-sortby-highlight.png`, `dark-ov-menu-owners.png`, `dark-ov-menu-stage.png`, `dark-ov-menu-lastactivity.png`: menus (highlight state in the second).
- `dark-ov-newcompany-validation.png`, `dark-ov-newcompany-select-open.png`: dialog with validation error and an open select.
- `dark-main-row-selected.png`, `dark-main-scrolled-bottom.png`, `dark-tab-deals.png`, `dark-tab-forecast.png`: row selection, scroll end, tab states.
- `crop-hover-*.png`, `crop-focus-*.png`: hover and focus states per control.
- `dark-mobile-390-main.png`, `dark-mobile-390-nav.png`: mobile composition.
- `light-prefers-color-scheme-main.png`: proof that light scheme emulation renders the same dark UI.
- `measurements.json`: raw aggregates (tokens, radius ladder, icon and text centring, spacing, type, shadows, transitions, hover, focus, animations, geometry, contrast).

## 7. Open questions

- No light mode exists, so light/dark parity could not be measured; ask the founder whether product UI deliverables must ship both and, if so, derive the light ladder from these dark steps rather than copy a light reference.
- The Forecast and Deals tabs show the same Companies table (state is only the tab underline); the sidebar items, Export, Help, Invite teammates and Add Billings do nothing. Charts, a kanban board, an empty state, a toast and a loading/skeleton state were not reachable on the live site, so their styling is unknown. A toast library does not appear in the bundles.
- The sidebar active row 32px vs 30px difference may be intentional (a slightly larger active pill) or a leftover; the first-row 3px margin suggests it was patched to prevent a shift.
- `onSelect`-style behaviours (keyboard navigation in the table, menus) were checked only for focus rings and menu arrows; full keyboard model and roving tabindex were not audited.
- Reduced-motion: only one utility is gated in the served CSS; there may be additional handling in JS not inspected.
- Mobile was captured once at 390x844 and not measured numerically.
- Marcel's own role in this CRM (design vs direction) is unverified here; the profile note records that public sources credit the studio and its skills (`better-ui`, `emil-design-eng`), not individual design decisions. The measured grammar above (one easing curve, 12/14px pair, 30px controls) matches Emil-style craft, but this note does not claim authorship.
- Not measured: hover on the sheet's inner dropdowns (Last 30 Days), star-rating pill details, calendar picker popup, and the exact segment-colour interpolation rule of the meters (red/amber/green by position; thresholds were not extracted).
