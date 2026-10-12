# Product UI screen archetypes

Fourteen screens the engine builds for product UI and hero dashboards. Each gives the layout at 1440x900 (CSS px), the must-have details, the data rules and the references to open side by side. Numbers resolve to `system/product-ui/tokens.json`; rules cited as PU-xx are in `knowledge/web/product-ui-deep.md`, PUI-xx in `knowledge/web/product-ui-in-marketing.md`, HR-xx in `knowledge/web/heyrico-product-design.md`, FH-xx in `knowledge/web/flohoeller-craft.md`.

Shared shell for every screen unless stated: sidebar 248 (232-260) on `color.panel` with a 1 px hairline; rows 28 on a 30 pitch; 44 px top bar with a hairline; content on `color.page`, 24 px gutters; one icon library (Lucide 1.5); 3-4 text sizes (PU-32); one primary action per view (PU-09); state by fill only (PU-05). In a hero, render the whole screen at about 0.8 zoom so 11-12 px text stays >= 11 rendered for focal data (PUI-11, founder hero rule), and run the build-in top to bottom with rolling numbers (founder).

Before calling any screen done: generic-tell audit (PU-39) passes, at least six micro-details (PU-40), every sum/count/time reconciles (PUI-46/47), and a side-by-side with the listed reference at equal zoom (`tools/compare.mjs`).

---

## 1. Inbox / triage

**Job** clear a queue of items that need the user (mentions, assignments, approvals, tickets).
**Layout** shell + list pane 380-420 (two-line rows) + detail pane (rest) with its own 44 px header; optional right properties column 240.
**List** segmented filter pills with counts ("Priority 4 · Other 12") on top; rows 50-58 (PU-20): avatar 32 with a 14 px action badge (assigned / mentioned / quoted / update), 8 px accent unread dot before the title, title 13/500, reason line 12-13 secondary ("Didier assigned the issue to you"), right column status glyph over relative time ("1h", "4h", "13h", "22h"); read rows drop one text tier (PU-31).
**Detail** the item itself (issue, thread, email) with the reply composer docked at the bottom.
**Must-haves** unread count in the sidebar row; keyboard hints ("E archive", "S snooze") in a footer or tooltip; one truncated title; snooze/done as ghost icon buttons on row hover.
**Data** times strictly descending; counts in filters equal the rows shown.
**References** `deep/raster-linear-changelog-6.png` (Linear Inbox), `deep/raster-campsite-0.png`, Superhuman (`deep/superhuman-fold.png`).
**Fails** bold + coloured unread rows; avatars without the reason badge; time column not aligned.

## 2. Table / CRM records

**Job** scan, filter and edit many records of one object.
**Layout** shell + header (view switcher 28 px with view-type tile, "Sort" and "Filter" dashed ghost chips, search, primary "New" at the right) + table filling the pane + optional right sheet 480-560 for a record preview.
**Table** rows 36-40, header 36 (PU-15/16); first column = 16 checkbox + 16 logo/avatar + name 13-14/500; numeric columns right-aligned tabular with muted units (PU-18); one filled chip per row, other statuses as glyph + text; person pills 22; AI-filled columns marked with a sparkle in the header (Attio); aggregate row 26-32 at the bottom ("2,813 count", "$83,560,165 sum").
**Must-haves** row hover fill; bulk-action bar floating bottom-centre on selection ("2 selected"); one truncated cell; sticky header; column-type icons in headers.
**Data** 10+ believable rows, varied amounts, mixed statuses, sum row reconciles; no repeated row numbers (Clay slip).
**References** `knowledge/benchmarks/attio/crop-home-table.png`, `knowledge/benchmarks/kargul-crm/crop-table-rows.png`, `deep/dub-analytics-frame0.png`, `deep/geist-table.png`.
**Fails** 53 px rows; zebra; left-aligned money; three badge styles in one row.

## 3. Analytics dashboard

**Job** answer "how are we doing and why" for one domain.
**Layout** shell + header (title, range segmented control 7D / 30D / 3M / 12M, compare toggle, export ghost button) + KPI row of 3-4 cards (16 px padding, 20 px gaps) + one wide chart card (chart 200-240 tall) + a 2-column row (ranked bars or table + breakdown chart).
**KPI** label 12/500 secondary with a dashed-underline definition, value 18-24/600 tabular, delta 11-12 with sign and unit on the baseline, micro-visual (sparkline or micro-bars with the latest period in the accent) (PU-27).
**Chart** one focal 1.5-2 px line + previous period dashed grey, 3-5 dashed gridlines, 11-12 px ticks, hover crosshair + tooltip + end-point dot, one annotation (PUI-36..44, founder chart rule).
**Must-haves** "Updated 2m ago" meta; a segmented meter for a rate; a ranked list with thumbnails; legend swatches 8 px.
**Data** KPI value equals the chart's last point; breakdown parts sum to the total.
**References** `knowledge/benchmarks/heyrico/analytics-light-cropped-window.jpg`, `knowledge/benchmarks/attio/crop-home-charts.png`, `deep/linear-insights-img0.png`, `deep/dub-analytics-frame0.png`.
**Fails** 30 px bold KPI figures; rainbow series; charts with no comparison.

## 4. Settings

**Job** change account, workspace and product preferences safely.
**Layout** settings nav replaces the app sidebar (same 248 width, grouped sentence-case labels, 28 px rows with 15 px icons) + content pane: centred column 596-740 on a white inset panel 6 px inside the window (Rico) or directly on the page.
**Sections** page title 16-18/500 + one-line description; sections 32 apart; each section a hairline card r12 with rows 56-64: label 13-14/500 + helper 12-13 secondary on the left, control right-aligned (switch, select 32, button sm) (HR-45, tokens `components.settings`).
**Must-haves** a destructive zone at the bottom in its own card with a text-danger button; unsaved-changes bar or inline Save per section; an avatar/logo upload row; a plan/usage summary row linking to billing.
**Data** real-looking values (workspace slug, domain, time zone).
**References** `knowledge/benchmarks/heyrico/` settings shots, `deep/geist-toggle.png`, `deep/geist-choicebox.png`.
**Fails** full-width forms with 1200 px inputs; every row a separate card with shadow; uppercase section labels.

## 5. Document / notes editor

**Job** write or review a long-form document, optionally with AI.
**Layout** shell (often collapsed to a 56 rail) + 44 px header (breadcrumb "Marketing / Q2 Campaign Brief", presence avatars 24 overlapping 6, Share ghost button) + centred reading column 680-720 + optional AI side panel 360-400.
**Body** title 28-32 in the product's display or serif face (the one place it is allowed), headings 16-18/600, body 15-16/26, muted sub-bullets, inline highlight as a yellow mark (Superhuman), comments as margin dots.
**Must-haves** "Enhancing notes" / "Saving..." status pill with a spinner (Granola); slash-command menu (components.menu); word count or last-edited meta; a selection toolbar 32 px.
**Data** the document reads like a real brief, not lorem; AI citations point to real sections.
**References** `deep/granola-fold.png`, `deep/raster-superhuman-3.png`.
**Fails** app chrome as heavy as the content; body at 13 px; AI output in a coloured bubble.

## 6. Chat / agent workspace

**Job** delegate a task to an agent and review what it did.
**Layout** shell + runs list 220-240 (two-line rows: status check, title, relative time, "+20 -3 · Drafted implementation") + conversation 520-640 + optional preview/diff pane (rest).
**Conversation** user prompt in a hairline card; process rows 24 px ("Read about-acme.md", "Thought 6s", "Worked for 10 sec", collapsible, shimmering while running); answer as plain 13/20 text; result cards (file icon + path + "+52 -0"); response actions 16 px; composer docked bottom with mode chip ("Agent"), model picker ("Opus 5" text + chevron), attach icon and round send (PU-30, tokens `components.agentPanel`).
**Must-haves** a live state (one run "Working..." with a shimmer); a model badge; diff counts in success/danger; a "Ready for review n" group.
**Data** durations, file names and diff counts consistent between the list row and the conversation.
**References** `deep/cursor-frame2.png`, `deep/linear-home-win1.png` (agent panel), `deep/raster-alignui-pro-0.png`, `deep/raster-superhuman-3.png`.
**Fails** both sides in bubbles; no process rows; a giant centred composer with nothing else (unless it is the empty state).

## 7. Calendar

**Job** see and change time: meetings, tasks, bookings.
**Layout** left pane 230-248: mini-month (cell pitch 27, today solid accent square r6, current week grey band), calendar list with 12 px colour squares r3, "Add calendar account"; main week grid: header 44 (range title, "Week" select, "Today" button, arrows), day header row 40 ("Wed 21"), hour column 56 wide with 11-12 px labels, hour rows 48-58 (PU-28).
**Events** 12-16% tint of the calendar hue + 3-4 px left bar, title 12/500 and time 11-12 in a darkened shade of the hue, radius 6; weekend columns one surface step darker; now-line 1 px accent with an 8 px dot.
**Must-haves** an event being dragged (lifted shadow, original slot outlined); an all-day row; time-zone label at the top of the hour column; overlapping events split side by side.
**Data** event times match their position; no event ends before it starts.
**References** `deep/raster-notion-calendar-6.png`, `deep/cal-booking-frame0.png`, `deep/geist-calendar.png`.
**Fails** black text on saturated event fills; heavy hour lines; every event a different random colour.

## 8. Kanban board

**Job** move work through statuses.
**Layout** shell + header (view switcher, filters, group-by, "New issue") + columns 272-300 with 12 px gaps scrolling horizontally; the last column cut by the window edge with a fade in hero crops.
**Columns** header 40: status glyph 14 + title 13/510 + count secondary + add/more icons; body padding 8; cards one surface step up, ring, r9-12, padding 12: ID 11-12 secondary + priority glyph, title 13/500 (2 lines max), badge row (one filled), assignee 16 (PU-29).
**Must-haves** one card mid-drag (rotated 2-4 degrees, lifted shadow, dashed placeholder); an empty column with a quiet "No issues" line; card counts in headers that match the cards.
**References** `deep/linear-home-win2.png`, `knowledge/benchmarks/attio/crop-home-kanban.png`, Kargul kanban (`knowledge/web/kargul-source-study.md`).
**Fails** columns as heavy boxes with shadows; cards with five chips; counts that disagree with the cards.

## 9. Record detail + inspector

**Job** understand and act on one object (deal, issue, customer).
**Layout** shell + 44 px header (breadcrumb + ID, pager "1 / 84", prev/next, more) + main column (title 20/600, description, activity timeline) + right inspector 280-320 (properties as 24-28 px label/value rows: label 12 secondary, value 12-13 primary, editable on hover).
**Main** activity rows "Avatar Name verb object · 2min ago" with the name in ink, the verb in grey (Attio/Linear); comments with 14-16 px avatars; sub-items as a mini list.
**Must-haves** highlights grid of 2-4 small cards (Attio); relation pills (person 22 pill with 12 px photo); a linked item with a status glyph; a composer at the bottom of the activity.
**Data** timeline in order; properties consistent with the list view the record came from.
**References** `deep/linear-home-win1.png`, `knowledge/benchmarks/attio/crop-home-record.png`.
**Fails** inspector as a stack of cards; property labels uppercase; timeline without times.

## 10. Onboarding / setup checklist

**Job** take a new workspace from empty to first value.
**Layout** option A: two-pane card centred in the window (left form column ~460: 14/500 title, 13 helper, 36 px fields, brand chips; right visual: a live preview of what is being set up) (HR-44). Option B: in-app checklist card r12 pinned in the dashboard or sidebar footer: 16 px progress ring + "2 of 5", steps 40 px (done = success check, label secondary, no strike; current = primary label + one inline action).
**Must-haves** a skip link; the step that is current visually obvious without colour floods; an integration step with two app icons joined by dots (HR-40); the empty states the user will see next already designed.
**Data** progress ring fraction equals done steps.
**References** Rico onboarding/modal shots (`knowledge/benchmarks/heyrico/`), `deep/geist-empty-state.png`.
**Fails** a 6-step wizard with a full-width stepper; confetti; progress bars that disagree with the list.

## 11. Command palette

**Job** jump anywhere or run any action from the keyboard.
**Layout** dialog 640 wide, r12, top third of the viewport (y ~ 120-160), scrim 40% (light) / 60% (dark); input row 52 (16 px text, search icon, "Esc" keycap); grouped results (labels 12-13/500 secondary): "Suggestions", "Navigation", "Actions", "Records"; items 40 r6 with 16 px icon, label 14/400, right meta (shortcut keycaps or record type) (PU-24).
**Must-haves** the first item selected at 5% fill; a record result with a logo/avatar; an action with a keycap chord; footer hints row 40 ("↑↓ Navigate · ↵ Open · Esc"); optional two-pane preview (Attio) at 1000 wide.
**References** `deep/geist-command-menu-open.png` (+ dark), Raycast (`knowledge/benchmarks/product-ui/raycast-frame0.png`), Attio command palette (`knowledge/benchmarks/attio/fold-cl-cmdpalette.png`).
**Fails** palette as a plain search box; items at 48+ px; coloured selected row.

## 12. Billing / plan and usage

**Job** see what you pay, what you use, and change plan.
**Layout** inside settings (screen 4): plan summary card (two columns split by a hairline: "Current plan Pro · $48 / month" and "Next invoice Nov 1 · $96"), usage card with segmented tick meters (24-30 ticks, 2 px gaps, one per metric, "8,412 / 10,000 runs"), plan picker (2-3 cards; selected = 6-8% accent tint + 1 px accent border, the one allowed accent outline; price chip r6), invoices table (date, number in mono 12, amount right-aligned tabular, status badge, download icon).
**Must-haves** a "Manage payment method" row with a card brand glyph and "•••• 4242"; an upcoming-renewal date; a usage meter near its limit in warning colour.
**Data** usage totals equal the meters; invoice amounts consistent with the plan price; sample data labelled as sample in heroes; never real card numbers.
**References** Rico wallet/billing recreation (`knowledge/web/heyrico-recreation-lessons.md`), `deep/raster-mercury-invoicing-2.png`, `deep/raster-ramp-bills-2.png`, Stripe docs UI (`deep/stripe-docs-fold.png`).
**Fails** a pricing-page clone inside the app; three equal loud plan cards; meters as plain progress bars without numbers.

## 13. Activity feed / team home

**Job** see what changed across the workspace since the last visit.
**Layout** shell (with channels/spaces groups) + centred feed column 720-800 (page title 28-36/600, segmented "For me / Created / All", composer card 64 tall) + right people panel 240 ("4 online" with presence dots, team groups).
**Feed** day separators ("Today", "Yesterday") with a hairline; items pitch ~68: avatar or app mark 32, title 14/500, preview 13 secondary truncating with the comment count in a 16 px boxed chip, channel badge at the right (emoji/glyph + name) (Campsite).
**Must-haves** presence dots; at least one integration item (app mark avatar); unread separator or "New" pill; truncation.
**References** `deep/raster-campsite-0.png`.
**Fails** cards with shadows for every post; timestamps missing; people panel without status.

## 14. Developer / docs console (API keys, logs, deployments)

**Job** operate a technical product: deployments, logs, keys, docs.
**Layout** shell + header + either a log/deploy table (rows 36-40, status dots, mono 12 for IDs, hashes, durations right-aligned "185ms") or a docs layout (left nav 248, content 680, right code panel 480 sticky with language tabs and a copy button).
**Must-haves** status dots with text ("Ready", "Building", "Error"); relative times; a copyable key field (masked "sk_test_...4f2a", copy icon, never a real key); code blocks 13/20 mono with line numbers in the tertiary grey and one highlighted line; a "Production" environment badge.
**Data** deploy durations and times coherent; log levels consistent with colours.
**References** `deep/stripe-docs-fold.png`, `deep/geist-status-dot.png`, `deep/geist-table.png`, Vercel observability (`knowledge/benchmarks/product-ui/vercel-obs-frame0.png`), `deep/linear-home-win0.png` (code diff).
**Fails** neon syntax colours on pure black; mono for everything; logs without timestamps.
