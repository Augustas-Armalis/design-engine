# Canon: product UI (our own app screens and hero dashboards)

Decided defaults, 2026-10-21. For screens inside an existing client app, `client-app.md` wins (build from the client's kit). Evidence: `founder-taste L<n>`, accepted builds, Kargul measured tokens (KMD-xx). Gate numbers: `system/canon/product-ui.json`.

## Floor references
- **Light app:** Ferry, `work/acquisity-dashboard/v3-1440x900@2x.png` (ledger `2026-10-09-ferry`, "not bad actually, you're getting better"), side-by-side `v3-vs-attio-side.png`.
- **Light hero dashboard:** the Quorum Insights app (`knowledge/engine-accepted/quorum/`) and Kestrel's dashboard (radius ladder L166).
- **Dark app:** Kite dashboard, `work/kite/dashboard-1440x900@2x.png` (founder: "you cooked with the dashboard, best thing in the world", L443 Why).
- **Calibration replicas:** `work/replicas/clokora-kargul-replica@2x.png`, `search-kargul-replica@2x.png`, `finance-alignui-replica@2x.png`, `decision-affectui-replica@2x.png` with their `cmp-*-overlay.png`.

## Reading set (5 files)
1. this page
2. `knowledge/web/kargul-micro-details.md` sections 1-3 (KMD-01..23, shadow tiers)
3. `knowledge/web/borders-and-nesting.md` section 4 (BN-01..12)
4. `knowledge/web/attio-product-ui.md` (sidebar)
5. the last 5 ledger rounds

## Decided numbers

| Part | Default | Source |
|---|---|---|
| Grammar | compact and calm, one size smaller than instinct: rows 28-30 on a 30-32 pitch (table rows 38-40 when one line; 52-60 when a row carries an avatar, logo or second line, KC-11), controls 28-32 (form inputs 40-48, KC-10), one control height per toolbar, labels 13-14, icons 14-16 at text size | L230; KMD-11, KMD-16; KC-10, KC-11 |
| Sidebar | Attio: 212-260 wide, one outline icon family (Phosphor regular 16 or Lucide 16 at stroke 1.5-1.75), record types as 16px solid tiles r4.5 with a white glyph, real pages grouped under sentence-case headers, fits 900px tall, quiet top (one workspace tile >= 8px inset, name, chevron; at most one light search field with kbd) | L307, L331, L334 |
| Active row | a quiet fill step (grey on a white sidebar, or a white ringed tile on a grey sidebar) + darker text + the icon in its fill weight; no accent bar, chevron or accent outline | L230, L307; Quorum |
| Type | one sans (Inter display cut) for the whole product, plus one mono only for IDs and times; <= 4 sizes in the main view; weights 500/600; hierarchy from two text greys, not size | L86, L199, L230, L452 |
| Numbers | KPI values 18-20 / 600 tabular (Quorum summary 20/600); money in the sans with muted decimals; numbers roll digit by digit when they animate | L86, L230, L319 |
| Surfaces | page + cards, or sidebar + page: <= 2 surface fills; canvas and sidebar share one neutral, chroma < 0.01 | L230, L391 |
| Edges | white cards with a 1px ink-alpha ring (6-10%, `#ececec`-class), no blur at rest; controls ring + `0 1px 2px rgb(0 0 0/.045)`; only floating layers get blur (popover `0 4.5px 13px /.055`); <= 3 shadow recipes on the page, one edge per box | L199, L376; KMD-03..05 |
| Radius ladder (rendered) | 8 sidebar items, badges, tooltips, inner segments; 12 the 32px controls, small buttons, inputs; 16 cards, bubbles, app surface; 22 outer frame (Kite 25/16 double bezel); <= 5 distinct radii; nested = outer - inset | L166, L373; BN-06 |
| Accent | one accent (ink is the default); colour only where it means something (late = red, needs action = one warm dot); <= 2 hue families; tints ~8%; filled chips <= 1 per row, other statuses icon + text | L199, L310, L391 |
| Ringed boxes | <= 25 in a 1440x900 fold; separate with space first | L391; BN-05 |
| Card header | one grammar everywhere: 16px solid tile + white glyph, 14/600 title, soft meta, actions right, 48px band | L310 |
| Spacing | card padding 16, page gutters 24, 2px between rows, 20 between cards; inside < between < section | L230; BN-07 |
| Charts | compare against something (previous period dotted grey under a 1.5px accent line), monotone smoothing, dashed gridlines, hover crosshair + tooltip, end-point dot; bars with rounded caps | L310, L479 |
| Content | believable, coherent sample data labelled sample; real images or real UI captures, never grey bars | L403; principle 4 |
| One view | build one primary view to full detail with working interactions; secondary content in sheets, popovers, dialogs | L230 |
| Volume | test 1 / 4 / 12 / 40 items and a 60-character name; ellipsis + title, max-height 60dvh scroll in lists and popovers | L473 |
| Dark | graphite, not blue (`#0a0a0b` canvas); one light ring (white 7-10%) + soft drop per box, depth from the fill gradient; never ring + inset highlight; dark visuals on dark bands | L246, L412, L467 |
| In a hero | <= 3 regions, <= 12 distinct components, text >= 12.5px at hero scale (~0.8 zoom), no accent ring on a "selected" card | L158, L352 |

## Contradictions resolved

| Topic | Default | Alternative only when | Superseded lines |
|---|---|---|---|
| Product density (audit 4.1) | one view at Kargul detail: sidebar + one main view + one AI/decision moment, >= 10 data points, >= 8 rows | none | L18 / L54 (simple hero card, Tideline era) |
| KPI weight | 18-20 / 600 tabular (Marcel also sets KPIs at ~600 in several products, KC-14) | 28 / 400 only when the floor is Kargul's roomy overview page (Clokora) and DIRECTION says so; one weight per product | KMD-18 as a default |
| Small-control radius | 8 for sidebar items and badges (Kestrel r2, loved) | a sharp Kargul family (KMD-10) only for a brand whose DIRECTION binds it | L158 ("sidebar item radius <= 6") |
| Dark depth | ring + soft drop + fill gradient | flat dark (no drops, one-step lines, KMD-06) for an operator / technical brand | Kite v2 "inner top light + ring" recipe (L467) |

## Never (rejected, with evidence)
- Boxed, colourful, cramped, or an "AlignUI template" reading with uppercase labels, 24px numbers, 32px padding (Acquisity v1/v2, L230).
- Re-skinning the reference layout box for box (L234, L238).
- 5 accent hue families, coloured logos and monograms, 55 ringed boxes, 3 surface layers (Settle, L391).
- A second icon library; hand-drawn SVG icons (L22, L310, L331).
- Clipped workspace marks, a dark "New" pill with a kbd chip in the sidebar (Tandem, L334).
- Dashed "Drop here" boxes or dark cards dragged across a light app (Perch, L397).
- Three competing box-shadow recipes; border + 1px ring on one element; double pixel strokes (Kaching visuals, L199, L467).
- A divider that stops 1-2px short of the card ring (L380).

## Pre-delivery checklist
1. Side-by-side at equal zoom with the named reference via `tools/compare.mjs` (L238).
2. Census: font sizes <= 4, weights in {500, 600}, one sans + optional mono, one icon library.
3. Shadow strings <= 3; zero ring + inset doubles; zero border + ring.
4. Radii per height band on the ladder; nested radii concentric within 1px; squircle share >= 90%.
5. Hue families <= 2 (excluding photos); ringed boxes <= 25; surface fills <= 2; canvas chroma < 0.01.
6. Controls in one row share height to the pixel; icon x and label x identical down the sidebar; counts on one right column (L331).
7. Volume fixtures 1/4/12/40 + long names: no clip, no overflow, every scroll container has a max-height.
8. Every state captured: hover, selected, focus, empty, loading, error, long content.

## Open
- One fixed control height for our own apps. Across 58 measured screens (KC-10), Kargul's toolbar controls are 32-36: 33 light and 32 dark at precise scale. The canon gives 28-32 until a founder verdict picks one.
- Light-mode table row pitch for hero dashboards at 0.8 zoom vs full apps: not measured on Ferry. Kargul's full-app tables run 52-61 (KC-11).
- **Chart hues (for the founder, KC-13).** Kargul dashboards keep the chrome to one accent but let the chart carry 3-5 categorical hues inside the plot. Dashboards run 2.6% saturated pixels, against 0.8% for app screens. The canon's ≤ 2 hue families (L391) stays until the founder rules on charts.

## Founder verdict 2026-10-22 (cadence-app r8, partial)
On the Cadence calendar built in Tanjim's post system, the founder said: "his style is not my favorite... it's good for variety yet I wouldn't use it". So the Tanjim/gr8r system (Manrope 400, warm wells, 0.5px hairlines; TG-01..38) is a variety option only, never the default product floor. The default product floor stays Rico/Kargul/AlignUI detail (see this page). Take from him only the method (post system vs code system, solving the font from line widths, centring discipline), not the look.

## Correction 2026-10-22, from the Rico and Kargul pixel replicas (RD-05, KMD-27/28)
Both founder-named masters' own screens failed our product gate. They use body weight 400 (60-80% of text) and 6-10 type sizes in 0.5-1px steps (13.5, 17.5), with hierarchy carried by ink against one grey and by half-step sizes, not by bold. The canon now allows weights {400, 450, 500, 550, 600} and up to 10 sizes in a product view (`system/canon/product-ui.json`). The 500/600-only rule and the 4-size cap are superseded. Contrast stays at 4.5:1 even though both use roughly 3:1 secondary greys (KMD-32, RD-10).

## Founder verdict 2026-10-22 (cprodk r1, reject) and r2 floor
On the Cadence week in Marcel's grammar: "too similar to marcel and stupid looking at the top, no apple like stuff... too little rounded, I don't like very edgy designs... too little small details or shadows or nifty stuff... lacks proper dashboard sidebar and components - redo completely in the style of alignui and affectui".
Decided, replacing the Kargul-sharp option as a default:
- **No OS or browser chrome** on our own product shots (no traffic lights, no URL bar). The frame is the AlignUI double bezel: frame r36 on a weak grey, 8px inset, white main panel r28.
- **Rounder ladder:** tray 20, cards 16, controls and icon tiles 10, segmented option 8, chips 6-7, avatars and pills round. The Kargul family (KMD-10/31) is now only for a brand whose DIRECTION binds it.
- **A proper dashboard sidebar:**
  - workspace switcher (logo tile and a selector button) and a search field with a kbd;
  - uppercase group labels, nav rows 36 tall r10, a white ringed active row with an accent icon, and count badges;
  - teams with kbd shortcuts, and calendars or filters with coloured checkboxes;
  - a plan or trial card, and a user row with an avatar, online dot and verified mark.
- **Nifty details are required**, at least 8 kinds per screen:
  - icon tiles, delta badges, mini visuals in KPI cards (bars, ring, sparkline, avatar stack);
  - stroke status badges with a dot, avatar stacks with a +N;
  - a segmented control, kbd chips, a switch, a copy button;
  - a live dot, an availability strip, and the affectUI decision tray with tactile ink buttons.
- **Nothing runs behind an element:**
  - rails stop short of their markers;
  - a highlight never covers a rail;
  - a chart tooltip sits outside the plot, and the active column is an opaque band over the gridlines;
  - selected fills are solid, never alpha over gridlines.
- Floor: `work/cadence-app/product-align@2x.png` (`#/cproda`, r2, awaiting verdict).

## Founder verdict 2026-10-22 (cproda r2, reject) and r3 floor
"too information heavy and unpolished and not clear nor nicely styled... everything is a little mess". The six-block dashboard (KPI cards, timeline, decision tray, link card, chart, team table) inside a frame + bezel + panel is the failure. The default for our own product shots is now:
- **One window:** one hairline and one soft drop. No grey bezels, no double frames.
- **Three regions at most:** a quiet sidebar, ONE primary view, and one AI rail that answers one question and offers one action (ink).
- **Numbers:** at most one slim joined strip of 3, never a row of KPI cards.
- **Everything else** goes in overlays, never on the page.
- Floor: `work/cadence-app/product-b@2x.png` (`#/cprodb`, r3, awaiting verdict).
- **cprodb r1 (partial: "too little detail... no affectUI feel")**: calm structure is not enough; every region needs affectUI-grade detail.
  - AI rail: a settled thought row ("Checked 5 calendars in 4s") with source chips, inline citation chips in the answer, date-tile options, and a composer in a tray (a scope picker, a mic, ink send, a synced-status strip).
  - Header: a people filter and a segmented week nav.
  - Number strip: one mini visual per number.
  - Sidebar: tinted count badges, team avatar stacks, a Next-up tray card and a live user status.
  - Data agrees everywhere: the now-line, "next up in N min" and the user's status tell the same time.
