---
source: ui-pedia
chapter: Tables and Graphs (Design Basics) - in practice a DATA TABLE chapter; no graph/chart guidance exists in this range
pages: 357-389
topic_tags: [tables, data-table, alignment, numbers, tabular-figures, row-styles, density, sticky-header, column-management, sorting, row-details, bulk-actions, inline-editing, saas-app-ui]
status: studied
---

# Tables and Graphs (data tables)

Printed page = PDF page - 1. All citations below are PDF pages. Despite the title, the chapter is entirely about data tables for business/enterprise apps. The only "graph" is a decorative stacked bar chart on the chapter opener (p.357), with no rules attached. The chapter says filtering and searching will be covered "on our future updates" (p.379), so they are not covered here.

## 1. Core ideas

1. Tables are the most effective way to organise complex information in a digestible manner; their bad reputation (cold, intimidating) is "undeserved" when designed well (p.358). A good table gives clarity and helps people decide and act (p.357).
2. Before designing, answer four questions: (a) what data is in the cells (short numeric strings like dates and sums vs paragraphs, links, files), (b) what the user will do (read/compare to extract insight vs edit numbers, update statuses, assign people), (c) which devices, (d) how much customisable viewing is needed (search, filter, sort, density) (p.358-359).
3. A table is three things: data, columns, rows. Peak interaction comes from balancing what can be done with those three for the specific product (p.360).
4. Alignment is driven by data type, not by taste: text left, numbers right, headers match their column, never centre (p.361-363, 365, 372).
5. Reduce visual noise: no vertical separators by default, hairline horizontal rules are the recommended default row style, grid only for very data-heavy tables (p.366-369).
6. Give control instead of forcing one view: freeze, hide, resize, density, column menus, sticky header (p.371-377).
7. Dense tables should not carry a permanent column of buttons; reveal actions on hover, on selection, or in a secondary view (p.380-386).
8. Row details can live inline (expand), in a modal, or in a side panel; pick by dev cost vs content volume vs how much context you may break (p.381-385).
9. Editing is a friction dial: inline = least friction, expanded-row or modal = more friction and fewer errors for high-stakes data. Every edit must end with an explicit confirmation (p.386-389).
10. Defaults should be tested with users, not assumed (author's own usability testing led to "show all" as pagination default, p.378).

## 2. Rules

### 2.1 Planning
- **RULE** Decide four things before drawing a table: cell data type (short numeric strings vs paragraphs/links/files), user task (read/compare vs edit/update/assign), target devices (mobile vs large desktop monitor), and whether view customisation (search, filter, sort, density) is needed.
  **Why** Table UX "varies dramatically" with each answer; the same layout does not serve reading and editing, or phone and monitor.
  **Applies to** SaaS app UI | all. **Check** visual / brief review. **Source** (p.358-359)

### 2.2 Text columns and headers
- **RULE** Left-align every text column (anything made of letters: names, strings, links, paragraphs).
  **Why** Western readers read left to right; a common left edge is a scan line. Do not "reinvent the wheel".
  **Applies to** all (Western/LTR). **Check** computed `text-align` on text cells is `left`/`start`. **Source** (p.361)
- **RULE** Header alignment must equal the alignment of its column's data (left header over left text, right header over right numbers).
  **Why** Mismatched headers leave distracting whitespace and superfluous visual noise.
  **Applies to** all. **Check** header cell `text-align` equals body cell `text-align` in same column. **Source** (p.361, 372)
- **RULE** Never centre-align table cells or column text (the book: "Don't (EVER) use center alignment").
  **Why** Centred ragged edges make the eye jump, hurting reading, mental calculation, row comparison, fast scanning and spotting anomalies.
  **Applies to** all. **Check** no `text-align:center` on `td`/`th` in data tables. **Source** (p.362)
- **RULE** Do not repeat the column's word inside every cell. Put the shared word in the header and keep only the qualifier in the rows (e.g. header "Design Category", cells "UI", "Graphic", "UI & 3D" instead of "UI Design", "Graphic Design", "UI & 3D Design"; or header "Lead", cells "Qualified", "Nurturing").
  **Why** Repetition is visual noise; with a fixed header, a user who forgets the column's context can look back at the header instantly.
  **Applies to** SaaS app UI | all. **Check** detect a common word/suffix shared by >=80% of cells in a column. **Source** (p.362-363)

### 2.3 Numeric columns
- **RULE** Right-align quantitative numbers (amounts: money and quantities; measures; percentages) so digits align by decimal position. Prepare data so every value in the column has the same number of decimal digits.
  **Why** Right alignment makes magnitude comparison and arithmetic across rows easy; it only works if decimals are normalised.
  **Applies to** all. **Check** numeric cell `text-align:right`; same decimal count per column. **Source** (p.363, 365)
- **RULE** Use tabular (fixed-width) digits in numeric columns. The book says "monospace typeface"; the goal is that every digit has the same width, so $1,111.11 does not look smaller than $999.99.
  **Why** Proportional digits (a "1" narrower than a "9") break column alignment and fool comparisons.
  **Applies to** all. **Check** `font-variant-numeric: tabular-nums` (or a monospace/tabular font) on numeric cells. **Source** (p.364)
- **RULE** Qualitative numbers may be left-aligned: dates, zip/postal codes, phone numbers. If the first column is a date written in digits, left-align it. "Otherwise, all the numbers should be oriented to the right."
  **Why** They are technically digits but not numerical values you compare by magnitude; right-aligning a first-column date looks strange.
  **Applies to** all. **Check** classify column type; quantitative -> right, identifier-like numbers -> left. **Source** (p.364-365)
- **RULE** Column-management summary: textual data left; numeric data not related to size (date, zip, phone) left; numeric data related to size (count, percent) right; headers aligned according to their column data.
  **Why** One alignment per data type keeps the table predictable.
  **Applies to** all. **Check** as above. **Source** (p.372)

### 2.4 Columns and separators
- **RULE** Do not add vertical dividers by default; columns hold the same kind of information so dividers "aren't necessary".
  **Why** Vertical separators make a table look cluttered.
  **Applies to** all. **Check** no `border-left/right` on cells unless grid style is chosen deliberately. **Source** (p.365-366)
- **RULE** If separators are used: light grey, border no more than 1px.
  **Why** Heavy dark rules (the figure's bad example uses near-black vertical lines) dominate the data.
  **Applies to** all. **Check** separator width <= 1px and low-contrast grey versus the surface. **Source** (p.366)

### 2.5 Row style (choose by data volume)
- **RULE** Default to horizontal lines only (1px hairline between rows, generous whitespace). Book calls this "the most popular and recommended approach for all data sets of any size".
  **Why** Keeps the reader's place with minimal noise.
  **Applies to** SaaS app UI | all. **Check** row `border-bottom` only, no vertical borders, no zebra. **Source** (p.367-368)
- **RULE** Use the full grid (horizontal + vertical lines, spreadsheet-style) only for tables with a lot of data.
  **Why** Largest separation between data points, but the extra lines are distracting.
  **Applies to** SaaS app UI. **Check** grid style only when row x column count is large. **Source** (p.367)
- **RULE** Use zebra stripes (alternating row background) for larger data sets, only where the alternating pattern is evident and a highlighted row will not be mistaken for a special/selected row.
  **Why** Helps users retain their place while reading.
  **Applies to** SaaS app UI. **Check** alternating row backgrounds; confirm stripe tint is distinct from hover/selected colours. **Source** (p.368)
- **RULE** Use free form (no dividers at all) only for small data sets where users do not need help keeping their place. A header underline is still present in the figure.
  **Why** Maximum minimalism, lowest noise.
  **Applies to** all. **Check** no row borders; row count small. **Source** (p.369)

### 2.6 Vertical alignment inside cells
- **RULE** Vertically centre cell content when row height varies only slightly (up to 3 lines).
  **Why** Centring distributes the whitespace evenly in the row, which makes the table easier to scan.
  **Applies to** SaaS app UI. **Check** `vertical-align: middle` when max lines per row <= 3. **Source** (p.370)
- **RULE** Top-align cell content when row height fluctuates by more than three or four lines (long multi-line text).
  **Why** Guarantees the start of every cell is visible at first glance.
  **Applies to** all. **Check** `vertical-align: top` on tables with variable, tall rows. **Source** (p.370-371)
- **RULE** Never bottom-align multi-line cells.
  **Why** Content can be clipped by the browser viewport edge, forcing scroll; if scrolling then jumps to the next row the experience is choppy and jarring, and users may never see the complete cell.
  **Applies to** all. **Check** no `vertical-align: bottom` in data tables. **Source** (p.371)

### 2.7 Viewing options and column management
- **RULE** Provide customised viewing choices for complex tables: at minimum a "Columns Shown" menu and a designated location for a horizontal scrollbar.
  **Why** They are visual cues that the user is in command and can widen the view by scrolling horizontally.
  **Applies to** SaaS app UI. **Check** column-visibility control present; scroll container visible. **Source** (p.371-372)
- **RULE** Let users freeze (make sticky) the leftmost column when scrolling horizontally, as essential as a fixed header when scrolling vertically. Occasionally freeze the rightmost column too (usually summary text such as totals).
  **Why** Keeps the row identity visible while other columns scroll.
  **Applies to** SaaS app UI (wide tables). **Check** `position: sticky; left:0` on first column. **Source** (p.372)
- **RULE** Expose per-column preferences through a dropdown on each column heading (small chevron beside the label) with items such as Freeze and Hide; the frozen column is shown with a tinted background and a shadow edge, the column being hidden highlighted in the accent colour.
  **Why** Some preferences are built into the UI, others are user choices; a header menu is where users look.
  **Applies to** SaaS app UI. **Check** header menu present. **Source** (p.372-373)
- **RULE** Let users hide columns that are irrelevant to their role or goal; do not force them through "dozens of columns".
  **Why** Irrelevant columns create mental strain and dissatisfaction.
  **Applies to** SaaS app UI. **Check** hide action available for wide tables. **Source** (p.373)
- **RULE** Prefer a layout where column resizing is unnecessary (spacing already adequate), which needs clean, regular, predictable data. When data is irregular or the table is user-editable, allow resizing, with a drag handle that appears on hover over the column separator.
  **Why** Resizing is a fallback for unpredictable content.
  **Applies to** SaaS app UI. **Check** resize handle (col-resize cursor) on header separators for editable tables. **Source** (p.374)

### 2.8 Row management: density
- **RULE** Let users switch table density (typical for data-heavy tables). Typical row heights: 40px condensed, 48px regular, 56px relaxed (text list). Control lives as a small icon switcher (three icons) outside the table, near the header controls.
  **Why** Reading styles differ; on a desk monitor a calm, less dense table is fine, but on a smaller screen or when comparing quickly, users need more rows visible.
  **Applies to** SaaS app UI | mobile. **Check** computed `tr` height in {40,48,56}; density toggle exists. **Source** (p.374-376)

### 2.9 Scrolling, sticky header/footer, pagination
- **RULE** Both axes must scroll smoothly. Row visibility tied to scroll position plus very tall multi-line rows makes scrolling jerky.
  **Why** Jerky scroll destroys reading flow.
  **Applies to** SaaS app UI. **Check** visual / performance test with tall rows. **Source** (p.377)
- **RULE** Make the header sticky. If actions live in a control-panel row (filters, dropdowns), include that row in the sticky part. A sticky footer is allowed for totals (figure shows a bottom row with total 50,203).
  **Why** Keeps the user in context while navigating the table.
  **Applies to** SaaS app UI. **Check** `position: sticky; top:0` on `thead`/control row. **Source** (p.377-378)
- **RULE** Contextual controls may appear only once one or more rows are selected, as a toolbar at the bottom of the window.
  **Why** User keeps context and understands what they are acting on.
  **Applies to** SaaS app UI. **Check** bulk toolbar hidden at 0 selected. **Source** (p.377)
- **RULE** Always tell users how many rows they are seeing out of the total ("universe count").
  **Why** Prevents users from not knowing whether the table is complete.
  **Applies to** SaaS app UI. **Check** count label like "x of y". **Source** (p.378)
- **RULE** Usability-test the table's default view. The author's tests showed users almost always opened the dropdown to choose "see all", so the author sets the default to show all data, shows the line count, and relies on simple horizontal + vertical scroll instead of paging (opinion/author experience).
  **Why** Viewport height and width only allow so much at once; paging adds friction when users want everything.
  **Applies to** SaaS app UI. **Check** default page size; evidence from testing. **Source** (p.378)

### 2.10 Sorting
- **RULE** At minimum offer column sorting: a small chevron beside the heading is "a quick win with big rewards".
  **Why** Cheapest high-value interaction on any table.
  **Applies to** SaaS app UI. **Check** sort affordance on sortable headers. **Source** (p.379)
- **RULE** Pick a default sort that makes sense for the data: most recent entries (created or edited recently), or the items needing most attention first (lowest inventory, most urgent priority).
  **Why** Surfaces what users most likely need first.
  **Applies to** SaaS app UI. **Check** default `sort` defined per table. **Source** (p.379)
- **RULE** The sort icon must not disturb header alignment relative to column content. For right-aligned numeric columns put the icon to the LEFT of the label so the label's right edge still lines up with the numbers; do not append it on the right where it pushes the text off the numbers' edge.
  **Why** Header text must stay flush with its data (see header-alignment rule).
  **Applies to** all. **Check** header label right edge == cell text right edge in numeric columns. **Source** (p.379-380, figure p.380)
- **RULE** Standard sort options: alphabetical A-Z / Z-A, recency oldest-to-newest / newest-to-oldest, size largest-to-smallest / smallest-to-largest.
  **Why** Covers the three common data orderings.
  **Applies to** SaaS app UI. **Check** visual. **Source** (p.380)

### 2.11 Actionable interactions
- **RULE** Do not clutter dense tables with always-visible buttons; reveal actions via hover states where and when needed (row details, bulk actions, inline editing). Discoverability is critical.
  **Why** Tables are dense by nature.
  **Applies to** SaaS app UI. **Check** row-level actions appear on `:hover`/focus (and must also be reachable by keyboard/touch). **Source** (p.380-381)
- **RULE** Show that a row opens a secondary view by making the entire row react on hover (figure: whole row turns light blue, pointer hand) - it signals clickable details.
  **Why** Affordance without extra buttons.
  **Applies to** SaaS app UI. **Check** `tr:hover` background + cursor pointer when row is actionable. **Source** (p.381-382)
- **RULE** Choose the row-detail pattern by cost and content volume:
  - Inline expandable row: technically more expensive; natural; leaves space inside or outside column confines; trigger = whole row or a chevron on the row's left/right edge (p.382-383).
  - Modal/overlay: more disruptive (pulls user out of table context) but easier to build; trigger = whole row, a "View More" link, or a three-dot menu (p.383-384).
  - Quick-view sidebar: the most scalable; best when lots of room, scrolling or sub-tabs are needed; same triggers (p.384-385).
  **Why** Trade-off between development resources, amount of data, and context preservation.
  **Applies to** SaaS app UI. **Check** visual. **Source** (p.381-385)
- **RULE** Multi-select: show a checkbox on row hover to signal the row is actionable; actions (Delete, Export, Duplicate, ...) appear only when one or more rows are selected. Selection state: header checkbox shows indeterminate "minus", selected row checkbox checked, and a bar above the header shows "1 Selected" with an action dropdown.
  **Why** Efficient use of space; limits clutter.
  **Applies to** SaaS app UI. **Check** bulk bar rendered only when selection count >= 1. **Source** (p.385-386)

### 2.12 Editing
- **RULE** Signal editable cells on hover with a text cursor / input-like cell (figure: white raised rounded field with soft shadow appears over the cell). Inline editing in the original view is the low-friction option: reduces friction and preserves context (neighbouring rows/columns still visible).
  **Why** Few clicks to start; context kept.
  **Applies to** SaaS app UI. **Check** hover style on editable cells; cursor `text`. **Source** (p.386-387)
- **RULE** When friction is wanted (high-stakes data that should not be tampered with excessively), make fields editable only inside the inline expanded row or inside a modal with read-only and/or read-write fields.
  **Why** Having to click through reduces the chance of error; a modal keeps everything in one place and lets you choose which fields are editable.
  **Applies to** SaaS app UI. **Check** high-stakes fields not inline-editable. **Source** (p.387-388)
- **RULE** Every edit must end with explicit confirmation when leaving the secondary view or inline cell: click-out, Enter, a checkmark icon, or a Save button. Pair with a cancel (figure: red X + green check small buttons on the expanded row; modal has plain "Cancel" text button + filled accent "Save").
  **Why** User needs to know the change was committed.
  **Applies to** SaaS app UI | forms. **Check** Save/confirm affordance present; Enter submits; Esc/Cancel reverts. **Source** (p.389, 387-388)

### Audit additions (audit 2026-10-15)

- **RULE** Let users reorder columns by dragging the column header; while dragging, lift the whole column (header plus cells) as one rounded, accent-tinted floating strip under a grab cursor, next to the same header menu that offers Freeze and Hide.
  **Why** Section "Record & Hide" (figure: "Book Name" column lifted in lavender with a hand cursor on its header) pairs reordering with hiding as the way users shape the view to their role.
  **Applies to** SaaS app UI. **Check** header is draggable (`draggable`/drag handle) and the dragged column renders as one floating unit. **Source** (p.373) (audit 2026-10-15)

- **RULE** Draw the column-resize handle as a full-height accent-coloured line on the hovered column separator, with small left/right arrow nubs at the header row.
  **Why** The line shows exactly which boundary moves and how far it runs; the arrows tell the user it drags sideways (resize figure).
  **Applies to** SaaS app UI. **Check** on separator hover: accent 1-2px line spans header to last row, `cursor: col-resize`. **Source** (p.374) (audit 2026-10-15)

- **RULE** Put per-column filter controls in a control row directly under the header row, each control sitting inside its own column (date picker "2022" under the name column, comparison select "> 2022" under a number column, "All" select under price); keep this row inside the sticky header, and the same row may repeat at the bottom as a sticky footer carrying a column total (50,203).
  **Why** A filter placed in its column needs no label and stays visible while scrolling.
  **Applies to** SaaS app UI. **Check** filter inputs share x-range with their column; control row is within the `position: sticky` header. **Source** (p.377, p.378) (audit 2026-10-15)

- **RULE** Lay an inline expanded row's details out on the same column grid as its parent row (e.g. "Credit Total : 12,998,098" under Subscribed, "Total refund : 3298" under UnSubscribed, a row label under Plans), as "Label : value" pairs, on a surface lighter (white) than the table body.
  **Why** Keeping the column grid preserves context; the lighter surface separates detail from data rows (expanded-row figure).
  **Applies to** SaaS app UI. **Check** detail cells align to parent column x-positions; detail row background differs from data rows. **Source** (p.383) (audit 2026-10-15)

- **RULE** Give every row-detail overlay (modal card or quick-view sidebar) a title at the top, a divider under it, and a small circular close (X) button in the top-right corner; the sidebar can carry extra sections (e.g. "Attach File" with a dark filled "Download File" button) separated by dividers.
  **Why** The user must always see what record they are looking at and how to get back to the table (modal and sidebar figures).
  **Applies to** SaaS app UI. **Check** overlay has a heading and a close button with an accessible name in the top-right. **Source** (p.384, p.385) (audit 2026-10-15)

- **RULE** In an expanded row, show a small accent-coloured pencil icon button at the row's bottom-right as the entry to edit mode; in edit mode turn each editable value into a white input field and replace the pencil with a pair of small square buttons, red X (cancel) and green check (confirm).
  **Why** Editing behind a click adds the friction wanted for high-stakes data, and the paired buttons give explicit commit or cancel (edit-row figure).
  **Applies to** SaaS app UI. **Check** read mode shows an edit trigger; edit mode shows cancel and confirm, and Enter/Escape map to them. **Source** (p.388) (audit 2026-10-15)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Column separator thickness | <= 1px, light grey | p.366 |
| Row density (text) | 40px condensed / 48px regular / 56px relaxed | p.375 |
| Row density (figure labels) | "40 PXL", "45 PXL", "50 PXL" (conflicts with text, see section 7) | p.375-376 |
| Vertical-centre limit | up to 3 lines of cell text | p.370 |
| Top-align threshold | row height varies by more than "three or four lines" | p.370 |
| Decimal alignment | same number of decimal digits in a column | p.363 |
| Filter row values (figure) | date select "2022", comparison "> 2022", select "All"; footer total 50,203 (audit 2026-10-15) | p.377-378 |
| Trend chips in price cells (figure) | mini area chart with "+20%" (teal/green) and "-34%" (red) (audit 2026-10-15) | p.377-378 |
| Number grouping in figures | "6,99,308.00", "2,34,456", also "12,323,345" (mixed Indian/Western grouping, mock data) | p.364, 380 |

Colours seen in figures (approximate, read from images, not stated in text):
- Table card: rounded corners, very light grey-lavender surface, 1px light dividers; header text small and grey-blue; body text near-black.
- Zebra row tint: pale periwinkle (rows 01 and 03 tinted, header and rows 02/04 plain) (p.368).
- Row hover/selected-for-details: light sky blue fill across the full row (p.382).
- Sticky header with control row: lavender-blue header fill with a white control row beneath containing outlined dropdowns (p.377).
- Primary action ("Save", "Download File"): periwinkle / slate-blue filled button; Cancel is plain text (p.388, 385).

## 4. Dos and Don'ts

| Topic | Bad (as drawn) | Good (as drawn) | Page |
|---|---|---|---|
| Text alignment | Centre-aligned headers and cells ("Selling Books", "Pixselacedemy" centred); red X | Left-aligned text columns, headers left, "Name Of The Books" | p.361 |
| Heading vs column | Header centred/over-spaced vs left-aligned body text; centred text column | Header sits flush with its column content | p.361-362 |
| Duplication | Every Category cell reads "UI Design"/"Graphic Design"/"UI & 3D Design", repeated word highlighted | Header "Design Category", cells "UI", "Graphic", "UI & 3D" | p.362-363 |
| Numbers | Left-aligned numerics with dark vertical dividers (12,405.09 / 6,99,308.00 ragged) | Right-aligned so decimals line up | p.363-364 |
| Column separators | Near-black 1px+ vertical lines between all columns | Faint light-grey separators, or none | p.366 |
| Multi-line cells | Bottom-aligned text in cells, "Pixsel 2" label also bottom; red X | Top-aligned multi-line text (tall rows); vertical centre when only 1-3 lines | p.370-371 |
| Sort icon | Chevron after the label in right-aligned numeric headers pushes the label away from the numbers' right edge; red X | Chevron placed before (left of) the label so text stays flush right; green check | p.380 |
| Sort icon form (audit 2026-10-15) | (not shown as bad) | Stacked up/down caret pair in the accent colour, header labels in the accent/grey-blue; left-aligned text column ("Plans") has no sort icon | p.380-386 |
| Column reorder (audit 2026-10-15) | (not shown as bad) | Dragged column lifted as one rounded lavender strip, grab cursor on its header, Freeze/Hide menu beside it | p.373 |
| Trend in a numeric cell (audit 2026-10-15) | (not discussed) | Small mini-chart chip after the price with a coloured % change (+20% green, -34% red); figure only, no text rule | p.377-378 |
| Selection bar (audit 2026-10-15) | (not shown as bad) | Grey band above the header; right-aligned "1 Selected" count and an action select; checkboxes in a left column; header checkbox shows the indeterminate minus | p.386 |

## 5. Exceptions & judgement calls

- Row style: the book gives horizontal lines as the all-size default (p.367) yet also says grid is "best for tables with a lot of data" (p.367) and zebra suits "larger data sets" (p.368) and free form suits small ones (p.369). Treat horizontal lines as default and escalate to zebra/grid with data volume.
- Pagination default is author opinion based on personal usability tests ("I found it to be more user pleasant"); not a universal rule (p.378). Very large data sets still need virtualisation or paging, which the book does not address. [engine note]
- Resizable columns are described as a workaround; the ideal table needs none (p.374).
- Editing: inline (less friction) and secondary-view (more friction) are both valid; choose by how costly an error is (p.386-387).
- Qualitative numbers (date, zip, phone) can be left-aligned, which creates an exception to "numbers right", but only if no magnitude comparison is intended (p.364-365).
- [engine note] The book's own mock tables break its alignment rules: on p.367-378 the numeric columns (Selling Books, Instock Books, Book Price) are left-aligned and headers carry trailing colons, while the p.380+ tables (Plans/Subscribed/UnSubscribed) right-align numbers. Follow the written rules, not the early mockups.
- [engine note] "Monospace typeface" for numbers (p.364) is better implemented as tabular-nums on the product's normal font; the figure itself only illustrates right-alignment, not a font change.
- [engine note] Hover-only reveals (p.380-386) must have keyboard-focus and touch alternatives; the book does not say so.
- [engine note] Text-align left/right assumes LTR; for RTL, mirror (text start, numbers end).

## 6. Figures worth keeping

Copied to `examples/ui-pedia/tables-and-graphs/`:
- p.361: left-align text columns, bad (centred) vs good side by side.
- p.362: centred vs left header alignment, bad vs good.
- p.363: duplicate-word cells vs header carrying the shared word.
- p.364: left-aligned numbers with dark dividers vs right-aligned numbers.
- p.366: heavy vs faint column separators.
- p.367: full grid style and horizontal-lines style with avatar rows.
- p.368: zebra stripes (and the horizontal-lines figure above it).
- p.370: vertical centre for short rows, top-align for tall multi-line rows (good cases).
- p.371: bottom-aligned multi-line cell, the bad case.
- p.373: header dropdown with Freeze/Hide, frozen column look, hidden column highlight.
- p.376: 45/50 px row density examples and the density icon switcher beside a filter dropdown.
- p.377: sticky header with control row (dropdown filters) and clipped rows scrolling beneath.
- p.380: sort chevron bad vs good placement, with sorting-options list.
- p.382: row hover state (full-row light blue + pointer) and inline expanded row.
- p.383: modal for row details.
- p.385: quick-view sidebar.
- p.386: multi-select checkbox states and "1 Selected" bar.
- p.387: inline cell edit chips (hover/edit state on Date/Distance/Elevation).
- p.388: expanded-row edit with red X / green check, and the edit modal with Cancel/Save.
- p.389: close-up of inline edit chip and modal Cancel/Save feedback.

## 7. Open questions

- Density values conflict: text says 40/48/56px (p.375) but the figures label rows "40 PXL" (p.375), "45 PXL" and "50 PXL" (p.376). Verified on the page images. Unresolved; the 40/48/56 text list is the more standard and is used above.
- p.364 text says "monospace typeface"; no figure shows a font change. Interpreted as tabular digits.
- p.370 says "up to 3 lines" for centring and "more than three or four lines" for top-align; the gap (3-4 lines) is unspecified.
- Sticky footer: p.377-378 shows a bottom row with total 50,203 and the same filter controls as the header; the text only says controls can appear in a bottom toolbar on selection. Whether the total row and the selection toolbar are the same component is unclear.
- Filtering and searching: explicitly deferred by the author (p.379); no rules.
- Graphs/charts: no content in this range. The p.357 hero shows a stacked bar chart (dark navy "Stock Books" plus periwinkle "Selling Books" series, y-axis 0-70, dashed axes, legend top right) with no commentary. A chart chapter may live elsewhere in the book.
- OCR noise confirmed as harmless: "1" for "a" in many figure labels ("Gr1phic", "Le1rn"), "Enterprice" and "Attech File"/"Premimum Plan" are actual typos inside the book's mockups.
- Pages with no rule content: p.357 (title, intro, decorative figure; only the statement that tables should provide clarity and assist decisions), p.360 (section heading "Elements of Table" and "Types of data" intro only; ideas captured in section 1).
- (audit 2026-10-15) The p.373 sub-heading reads "Record & Hide" on the page image (not an OCR error); the figure shows a column being dragged, so it most likely means "Reorder & Hide". Recorded as reorder in the audit rule.
- (audit 2026-10-15) p.373 freeze figure: the frozen left columns (Sr.No, Profile Name) appear on a plain white surface with a shadow on their right edge, while the scrolling area looks slightly tinted; the existing rule's "frozen column is shown with a tinted background" may have the tint reversed. Not corrected; check the full-size image before relying on it.
- (audit 2026-10-15) Lighter-pass audit: every page p.357-389 text read and every page image viewed. Text-only pages (no figure): p.358, p.359, p.360, p.365, p.372, p.379, p.381. No numeric errors found; no corrections.
