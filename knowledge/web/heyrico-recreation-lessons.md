---
source: web:x.com/_heyrico (recreation study of two public posts; reference images in knowledge/benchmarks/heyrico/)
chapter: Recreation lessons: rebuilding two of Rico's light product screens 1:1 and measuring the gaps
pages: n/a (study build at work/study-rico/, overlays round-1..5-analytics.png, round-1..4-wallet.png)
topic_tags: [product-ui, saas-app, dashboard, settings, sidebar, kpi, chart, meter, typography, density, spacing, radius, icons, colour, recreation, heyrico]
status: studied
---

# Rico recreation lessons: what 1:1 rebuilding taught about product-UI craft

Credit: both screens are by **rico (@_heyrico)**, Ace Studio. This is a private study of public posts. Nothing here is to be published or presented as our work. The rebuilds live in `work/study-rico/` and are for learning only.

Screens rebuilt:
- **A. Analytics dashboard**: `analytics-light-cropped-window.jpg` (status/2085041405643395353). Light browser window with sidebar, filter chips, KPI cards, a line chart, ranked product bars and a cropped session card.
- **B. Settings / Wallet**: `settings-wallet-segmented-meters.jpg` (status/2084686700647977333). Settings shell with grouped nav, a centred column, a plan/billing card, six segmented usage meters and an API-limits card.

Method (repeatable: `work/study-rico/tools/`):
1. Work out the export scale. Inter ink widths of 20 strings were fitted with `fit.mjs` at candidate scales. The answer was the one where every string landed on a whole size and the frame came out at a round Figma size: A = 1.7578 (1800/1024, an 832x1024 frame), B = 1.125 (a 1600x1024 frame).
2. Measure with `px.mjs` (zoom crops with 10px ticks, colour samples, edge scans, text-line runs) and `trace.mjs` (pull the chart polyline out of the pixels).
3. Rebuild in Vite + React + Tailwind v4 + Inter, using lucide, remix and phosphor icons. Render with Playwright at the reference's DPR (`render.mjs`).
4. `cmp.mjs` measures about 70 named boxes in both images: ink bbox, darkest-ink colour and ink-density delta, all in CSS px. `overlay.mjs` builds a reference | recreation | 50% onion | pixelmatch-diff strip.
5. Progress: A went from 48 boxes off by more than 0.6 css px down to 18, all at 1-2 image px (pixel diff 3.24% -> 2.35%, most of it text anti-aliasing against the JPEG). B ended with every box within about 1 image px (0.9 css) and a 1.22% pixel diff. The remaining gaps are JPEG blur, icon-set glyph shapes and font rasterisation.

## 1. Core ideas

1. **Our product UI is about 25-40% too big.** The rejected Acquisity dashboard had a 272px sidebar, 36px rows on a 40px pitch, 20px icons, 14px labels, 24px KPI numbers and 32px padding. Rico has 260/28 on a 30 pitch/14/13/18/24. Everything is one notch smaller, and that one notch is the gap between "noob" and "pro".
2. **Hierarchy comes from colour and position, not size or weight.** Nearly all text is 500. There are two greys, and size steps are 1px (11/12/13). 600 appears only on metric values. Nothing in the dashboard is above 18px.
3. **Surfaces barely differ.** Page, sidebar and canvas are the same #fafafa. A single 1px hairline separates sidebar from content. Cards are white with a 1px #ededed border and no shadow. In the whole dashboard exactly one element has a shadow: the "Getting started" card.
4. **Spacing is tight inside, generous between.** Rows sit 2px apart and card padding is 16, but the gaps are 20 between cards, 24 under the chips and about 45 between sidebar groups. Related things nearly touch; groups breathe.
5. **Colour is reserved for data.** Blue appears only in bars, the line, legend dots, meters and the progress ring. Delta colours are muted (#30934f, #d2434b) and smaller (11px) than the value they qualify.
6. **Settings is a sheet on a tray.** A #fbfbfb window holds the nav directly. Content sits on a white inset panel (r14, 1px border) 6px inside the window. Cards inside nest concentrically (outer r12, inner r7, inset 5).
7. **The measurements are not all on a 4px grid.** Gaps of 2, 3, 6, 7, 10, 20 and 24 and a 59.6 row pitch show up. The rhythm is optical: values were tuned by eye in Figma, not snapped to tokens. Copy the measured value, not the nearest token.
8. **Icons are small and light.** 14px in the nav (11.5px of ink), 13px in card labels, 15-16px in settings. Stroke sits around 1.2-1.5px, from Huge Icons-class sets. Our remix "line" icons read heavier, and a wrong glyph shape is the most visible remaining difference.
9. **Inter 500 at 1x renders lighter than his medium.** At 1.125x the settings text measured 10-20% less ink than the reference at weight 500. 550 matched. At 1.76x, 500 matched within the JPEG noise.
10. **Overlay iteration is where the learning happens.** Round 1 already looked "close" by eye, yet `cmp` found 48 errors of 1-5px (chip text wrap, icon gaps, dashed underline span, tabular-figure widths). Only measurement finds those.

## 2. Rules

### 2.1 Density and the sidebar

- **RULE** Make the app sidebar 256-260px wide with 12px inner padding; never 272px+ with 20px padding.
  **Why** A narrow rail with small padding gives the content column the width and makes the nav read as a quiet index, not a second page.
  **Applies to** SaaS app UI. **Check** sidebar width 248-264 at 1x; nav row inset from sidebar edge = 12 (+1 border). **Source** analytics-light-cropped-window.jpg, round-1-analytics.png (measured 260 and 12; engine Acquisity used 272/px-5)

- **RULE** Make nav rows 28px tall on a 30px pitch (2px gap); sub-items under an expanded parent sit on a 28px pitch with no gap.
  **Why** 28px rows are dense enough to show 20+ destinations without scrolling and still clear touch-free pointer targets; the zero-gap sub-list reads as one group.
  **Applies to** SaaS app UI. **Check** row height 28, consecutive row centres 30 apart (28 inside a sub-list). **Source** analytics-light-cropped-window.jpg + settings-wallet-segmented-meters.jpg, round-2 both (engine used h-9 rows on a 40 pitch)

- **RULE** Set nav labels at 13px/500, tracking 0 to -0.3px, with 14-15px icons 8px from the row's left edge and a 10px icon-to-label gap.
  **Why** A 13px label with a 14px glyph keeps icon and text at the same optical weight; a 20px icon beside 14px text shouts.
  **Applies to** SaaS app UI. **Check** label font-size 13; icon box 14-15; label x - icon x = 24-25. **Source** analytics-light-cropped-window.jpg, round-2-analytics.png (ink widths fit 13/500/0 for Quick actions, Analytics, Campaign)

- **RULE** Write sidebar group labels at 11-12px sentence case in a lighter grey, left-aligned with the nav icons; never uppercase with letter-spacing.
  **Why** A small lowercase label in a light tone groups by whitespace and colour, so the nav stays monochrome and calm.
  **Applies to** SaaS app UI. **Check** text-transform none; font-size 11-12; label x == icon x (+-1). **Source** analytics (Tools/Pinned/Chat 12/400 -0.3) and wallet (Account/Billing 11/500 #a3a3a3), round-3 both (engine used .sub-xs uppercase 0.04em)

- **RULE** Put about 45px between the centre of a group's last row and the next group label's centre, and about 29px from the label centre to the first row centre.
  **Why** The between-group gap must be clearly larger than the 30px row pitch so groups separate without divider lines.
  **Applies to** SaaS app UI. **Check** label centre - previous row centre = 44-46; first row centre - label centre = 28-30. **Source** both screens, round-2 (Apps -> Tools 45.8, Referral -> Preferences 44.8)

- **RULE** Show the active nav row as a full-width fill (#ededed on #fafafa, or #f0f0f0 on #fbfbfb), radius 8, height 28; switch its label and icon from the sub grey to the strong colour. No accent bar, no chevron, no accent-coloured icon.
  **Why** A 3-4% tone step plus darker text is enough to mark location; an accent bar and coloured icon add a second visual language to the nav.
  **Applies to** SaaS app UI. **Check** active row bg L* within 4 of sidebar bg; no element with the accent colour in the nav. **Source** analytics round-2 and wallet round-3 (engine used fill + chevron + 4px accent bar + primary icon)

- **RULE** Build the workspace header as a 32px row: a 16px logo tile (r4), the name at 13/500 strong 10px after it, a 16px chevron right after the name, and the collapse icon right-aligned; then a 28px "Quick actions" field (white, 1px #ededed, r8, 14px icon, shortcut letter right at 8px).
  **Why** A 16px tile and 13px name keep identity compact; a 40px avatar and two-line name (our default) eat a third of the fold of a 1024 frame.
  **Applies to** SaaS app UI. **Check** logo tile 16; header row 32; search field 28 tall, r8. **Source** analytics-light-cropped-window.jpg, round-2-analytics.png

- **RULE** Show chat or recent items as text-only rows (13/500, about 10.5px left padding), with no icon and the label truncated with an ellipsis.
  **Why** Recents are many and change often; dropping the icon tells them apart from fixed destinations.
  **Applies to** SaaS app UI. **Check** recent rows have no svg; text x = row x + 10-11. **Source** analytics, round-2-analytics.png (chat1 text at 79.1 vs row 68)

- **RULE** Close the sidebar with one floating progress card (36px tall, white, r10, ring at about 5% plus a 0 2px 5px shadow at about 9%), a 1px hairline 12px below it, and a 24px-tall row holding an 18px dark tile, a 14/500 status line and a 24px black mini CTA (r7, 13/500).
  **Why** The only shadow on the screen marks the single "next step" object; the hairline separates account status from navigation.
  **Applies to** SaaS app UI. **Check** exactly one shadowed element in the sidebar; CTA height 24. **Source** analytics, round-2-analytics.png (gs-card fixed from 1px ring to ring + 2px drop)

### 2.2 Page frame and surfaces

- **RULE** Use the same grey (#fafafa) for canvas, sidebar and page background, and separate the sidebar from the content with a single 1px hairline (#efefef).
  **Why** A single plane with one hairline reads as one calm surface; tinting the sidebar and the page differently adds a third tone to manage.
  **Applies to** SaaS app UI. **Check** sidebar bg == page bg; one 1px border between them; no shadow. **Source** analytics-light-cropped-window.jpg, round-1-analytics.png (sampled #fafafa at sidebar, page and canvas)

- **RULE** Make content cards white with a 1px #ededed border, radius 14, and no shadow on a #fafafa page.
  **Why** White-on-near-white plus a hairline gives just enough separation; a shadow would make every card a floating object competing for attention.
  **Applies to** SaaS app UI. **Check** card bg #fff, border 1px L* ~93, box-shadow none, radius 14 (corner offset 1.65px at 7.4px in). **Source** analytics, round-1-analytics.png

- **RULE** In settings, put the nav directly on a #fbfbfb window and the content on a white inset panel 6px inside the window (r14, 1px #f0f0f0 border); the window itself has radius about 8 and no border on a #ededed canvas.
  **Why** The inset sheet makes the content area the focal surface and the nav a tray around it, without any shadow.
  **Applies to** SaaS app UI. **Check** panel inset 6-7px from window top/right/bottom; panel radius 14; sidebar has no bg of its own. **Source** settings-wallet-segmented-meters.jpg, round-1-wallet.png

- **RULE** Nest cards concentrically: inner radius = outer radius minus inset (outer r12, inset 5, inner r7), with the outer card tinted #fbfbfb and the inner card white.
  **Why** Concentric radii keep the gap between two curved edges even; a tinted outer card groups the plan summary with the meters below it.
  **Applies to** SaaS app UI. **Check** r_inner == r_outer - inset (+-1). **Source** settings-wallet-segmented-meters.jpg, round-1-wallet.png (corner scans: outer ~10.7, inner ~7)

- **RULE** Pad the main column 24px from the sidebar edge, put 24px under the filter row, and 20px between cards in both directions.
  **Why** Equal gutters make the cards one grid; 32px padding (our default) wastes width at a 1440 frame.
  **Applies to** SaaS app UI. **Check** first card x - sidebar border x = 24; chips bottom -> cards top = 24; card gaps = 20. **Source** analytics, round-1-analytics.png (KPI 268 + 20 + 268; chart top 322 = KPI bottom 302 + 20)

- **RULE** Centre a settings column of about 596px in the content panel, with 20px inner card padding.
  **Why** A narrow centred column keeps label-left/value-right rows scannable on a wide panel.
  **Applies to** SaaS app UI. **Check** column centre == panel centre (+-1); width 590-600; text x = card x + 19-20. **Source** settings-wallet-segmented-meters.jpg, round-1-wallet.png

- **RULE** Draw the browser bezel 50px tall with a 1px #f2f2f2 bottom hairline: 12px traffic lights on a 20px pitch starting 20px from the edge and centred vertically, 26px chevrons in #6b6b6b (forward in #b5b5b5), and a 27px #f2f2f2 pill URL bar with a 15px plus icon, an 11px lock and 13/400 -0.15 text.
  **Why** A thin, quiet bezel tells the viewer "real product in a browser" without stealing weight from the app.
  **Applies to** landing page. **Check** bezel height 50; traffic-light centres 20 apart; URL pill height 26-28. **Source** analytics, round-2-analytics.png

- **RULE** Give the presentation window a 16px radius and a 1px #ececec border with no shadow, on a canvas the same grey as the app page, and run it off the right and bottom.
  **Why** With the canvas matching the page, only the hairline defines the window, so it sits flat and the UI is the subject.
  **Applies to** landing page. **Check** window radius 16 at 1x (28px at 1.76x); box-shadow none. **Source** analytics, round-1-analytics.png (corner scan)

### 2.3 Type and colour

- **RULE** Cap dashboard type at 18px: page title 16/500, metric values 18/600 tracking 0, labels 12/500, controls 13/500, axis and meta 12/400. Nothing larger inside the app frame.
  **Why** Small, close sizes make the screen read as a tool; 24px KPI numbers (our default) make it read as a marketing slide.
  **Applies to** SaaS app UI. **Check** max computed font-size in the app frame <= 18 (title 16-16.5). **Source** analytics round-2 (fit: $168,920 = 18/600/0, Analytics title = 16/500/0)

- **RULE** Use 600 only for metric values; set everything else, including grey secondary labels, at 500 (550 for medium text rendered at 1x).
  **Why** One weight for all UI text moves hierarchy onto colour and size, which is calmer than a 400/500/600 mix.
  **Applies to** SaaS app UI. **Check** distinct weights in the frame <= 3 (400 axis, 500 or 550 UI, 600 metrics). **Source** both screens, round-4-wallet.png (ink density matched only at 550 at 1.125x)

- **RULE** Use two text greys in the dashboard: strong #262626 and sub #6e6e6e (axis dates #757575). In the settings theme use strong #333-#424242, nav #494949, meta #828282, labels #a3a3a3. Never #171717 strong on a #fafafa page.
  **Why** A slightly lifted black (L* ~15) on near-white keeps contrast high but soft; the 2-step ramp ranks title vs everything else.
  **Applies to** SaaS app UI. **Check** distinct text colours <= 4 per screen; strong L* 14-28. **Source** both screens, round-2 (darkest-ink matching via cmp.mjs: #252525 vs render #262626; wallet #4a vs #494949)

- **RULE** Set 12-13px Inter at tracking 0 and 14px at -0.31px. Keep -0.1 to 0 on 18px values. Do not apply a uniform -0.15px.
  **Why** Inter is already tight at 12-13px; extra negative tracking at small sizes hurts legibility, while 14px+ needs a touch.
  **Applies to** SaaS app UI. **Check** letter-spacing 0 on 12-13px, about -0.3 on 14px. **Source** analytics round-2 fits (Quick actions 13/500/0, Getting started 14/500/-0.31)

- **RULE** Show deltas at 11/500 in muted semantic colours (green about #30934f, red about #d2434b), 7px after the value on its baseline.
  **Why** A smaller, quieter delta is read as a qualifier of the number, not a second headline.
  **Applies to** SaaS app UI. **Check** delta font-size <= value - 6; same flex baseline; gap 7. **Source** analytics, round-2-analytics.png (+47% fits 11/500)

- **RULE** Use the blue accent only for data: bars #0077e6, line #519dfa, current-period dot #0077e6, previous-period #519dfa, meters #559ff6, progress ring. Controls and buttons stay neutral.
  **Why** If blue only ever means "data", the eye goes to the numbers first.
  **Applies to** SaaS app UI. **Check** accent hue present only in svg/chart/meter elements, never on buttons or nav. **Source** both screens, round-1 colour samples

- **RULE** Do not turn on tabular figures (tnum) for large standalone values; reserve tnum for numbers that align in columns.
  **Why** Tabular digits are wider: "$168,920" at 18px rendered 2.3px wider than the reference and pushed the delta right by 5px.
  **Applies to** SaaS app UI. **Check** KPI value has no font-variant-numeric: tabular-nums unless stacked in a column. **Source** analytics, round-1 -> round-2 (kpi1-value dw +2.3 -> -1.1 css)

### 2.4 Components

- **RULE** Build filter chips 28px tall, r6, white with a 1px #ededed border: a 14-15px icon in the sub grey 6-7px from the left, a 13/500 strong label 6px after it, a 14px up/down chevron in strong 7px from the right, 12px between chips, and no wrapping.
  **Why** Identical compact chips with the selector glyph read as a filter bar, not as buttons.
  **Applies to** SaaS app UI. **Check** height 28; radius 6; white-space nowrap; gap 12. **Source** analytics, round-1 -> round-2 (chip text wrapped in round 1)

- **RULE** Lay out KPI cards at about 268x94: a 12/500 label with a 13px globe icon 3px before it, both underlined by one 1px dashed #dedede line, the value 18/600 about 44px below the label, and a cluster of 7 spark bars (8px wide, 2px gap, r2, #ededed, 16-26px tall) bottom-aligned with the value and right-aligned at 16px padding.
  **Why** Label, value and trend sit in reading order; the dashed underline signals "has a definition" without an info icon.
  **Applies to** SaaS app UI. **Check** card height 92-96; value cap top = card top + 60; spark bars 8/2/r2. **Source** analytics, round-2-analytics.png (dash spans icon+label at y+31)

- **RULE** Draw line charts with 1px #f0f0f0 gridlines 44px apart, 12px left-aligned y labels at the card padding, the plot starting about 65px in, a 1.5px solid series and a 1px dotted comparison in the same hue, and a two-item legend (6px dots, 12/500, 21px between items) under the x axis.
  **Why** One hue with solid vs dotted encodes period without a second colour; quiet gridlines keep the line the subject.
  **Applies to** SaaS app UI. **Check** gridline spacing 44; series stroke 1.5; comparison dasharray; legend dot 6. **Source** analytics, round-1-analytics.png (series traced from pixels with trace.mjs)

- **RULE** Draw ranked bars on a 54px row pitch: a 16px header row (15px r4 thumbnail, 12/500 name 7px after it, a 12/400 -0.31 value right-aligned in a 60px column and a count right-aligned in a 52px column), then a 10px r3 bar in #0077e6 6px below, scaled so the leader fills the width.
  **Why** Putting the label above the bar lets names run full length and keeps the numbers in fixed columns.
  **Applies to** SaaS app UI. **Check** row pitch 54; bar height 10; numeric columns right-aligned with no flex gap between them. **Source** analytics, round-1 -> round-2 (p1-val dx -11.4 from a flex gap)

- **RULE** Fade the last visible row with a 2-3px blur and a gradient-masked backdrop band, so a cropped window implies more content below.
  **Why** A blurred last row turns a hard crop into "the list continues".
  **Applies to** landing page. **Check** final row filter blur 2-3px; band mask from transparent. **Source** analytics, round-1-analytics.png

- **RULE** Build usage rows on a 59.6px pitch: a 12/550 title, an 11/500 meta line 19.4px below, a right-aligned meter of 10 ticks (8x12, r2, about 3.4px gaps, 113px total, filled #559ff6, empty #f0f0f0) and a 12/550 "n / max" count right-aligned at the 20px padding, about 43px after the meter.
  **Why** The discrete meter is a countable quota; aligning meters and counts in fixed columns lets six limits compare at a glance.
  **Applies to** SaaS app UI. **Check** ticks 8x12; meter width 111-113; count right edge = card right - 20. **Source** settings-wallet-segmented-meters.jpg, round-2-wallet.png (meter dw -1.8 fixed by 111 -> 113)

- **RULE** Split a plan/billing summary into two equal columns with a 1px divider: each has an 11/550 #656565 label, a 14/550 value with a 16px glyph 4-8px after it (medal, card brand), and an 11/500 meta row (left text plus right-aligned "Next billing on ...").
  **Why** Label, value and meta stacked identically in both columns makes the pair scannable as a table.
  **Applies to** SaaS app UI. **Check** columns share label/value/meta baselines; meta right edge = column right - 14. **Source** settings-wallet-segmented-meters.jpg, round-2-wallet.png

- **RULE** Make the primary dark button in settings 116x33, r8, with a vertical gradient #363636 -> #1c1c1c, a 1px white-10% inner top highlight and a 12/500 white label, left-aligned with the content.
  **Why** A slight top-lit gradient makes a small dark button feel pressed from a material rather than a flat rectangle.
  **Applies to** SaaS app UI. **Check** bg is a gradient with top L* > bottom L*; radius 8; height 32-33. **Source** settings-wallet-segmented-meters.jpg, round-2-wallet.png (edge scan: #2f top, #181818 bottom)

- **RULE** Lay out settings nav as 11/500 group labels in #a3a3a3, 28px rows with 15px icons at 1.6 stroke in #7e7e7e (the active icon dark #494a4e) and 13/550 -0.35 labels in #494949, with a "Back to <app>" 12/550 row and a 16px chevron at the top.
  **Why** In settings the nav is the page's table of contents; a darker active icon is the only state change needed.
  **Applies to** SaaS app UI. **Check** icon size 15; active icon darker than inactive; labels sentence case. **Source** settings-wallet-segmented-meters.jpg, round-3-wallet.png

- **RULE** Draw a progress indicator as a 16px ring (2px stroke, pale #d6e6fb track and a #1f6fce arc) placed 5px before its label, with the "n of m" count right-aligned in the sub grey.
  **Why** A small ring reads as progress at icon size and is the only blue in the sidebar.
  **Applies to** SaaS app UI. **Check** ring 15-16px; gap to label 5-6; count right-aligned. **Source** analytics, round-2-analytics.png

### 2.5 Icons

- **RULE** Size icons by their ink, not their nominal box: a 14px lucide icon draws about 11.7px of ink. Match the reference's ink (nav 11.4-12.5, card label 11.4, chip 12.5, settings 13.3).
  **Why** Icon sets pad their glyphs differently; picking by nominal size made our icons 1-2px off in every row.
  **Applies to** SaaS app UI. **Check** measured icon ink box within 0.6px of the target. **Source** analytics round-1 -> round-3 (chip1-icon, url-plus, plan-icon corrections)

- **RULE** Keep 14px nav icons at a 1.2-1.5px stroke; if the only available glyph has a heavier stroke (remix line), prefer a set whose stroke you can set (lucide strokeWidth 1.4-1.6).
  **Why** Icon stroke must match the stem weight of 13px medium text (about 1.3px); heavy glyphs make rows look assembled.
  **Applies to** SaaS app UI. **Check** svg stroke-width x size/24 between 1.1 and 1.5. **Source** analytics, round-4-analytics.png (remix bar-chart heavier than his outline bars)

- **RULE** Pick each glyph by shape first (bars middle-tallest, sidebar panel with three lines, calendar with a solid header band), then by set; mixed sets are fine if strokes match.
  **Why** In overlays the most visible leftover differences were glyph shapes, not sizes; one wrong shape reads as off-brand.
  **Applies to** SaaS app UI. **Check** onion-skin of each icon at 1x shows the same silhouette. **Source** analytics, round-4 -> round-5 (phosphor ChartBar rejected: ascending bars)

- **RULE** Give product-area "glass" tiles 17px (vs 14px line icons) with a two-stop diagonal gradient and a top-left white highlight; they are the only full-colour items in the nav.
  **Why** The tiles need slightly more size to carry colour at the same optical weight as line icons.
  **Applies to** SaaS app UI. **Check** tile 16-17px, r5; at most 5 tiles; centred on the icon column. **Source** analytics, round-2-analytics.png (campaign-tile dw -3.4 at 16px)

### 2.6 Process (how to recreate and judge)

- **RULE** Before measuring anything, work out the export scale by fitting the ink widths of 10+ strings to Inter sizes at candidate scales; accept the scale where they all land on whole sizes and the frame is a round size (832x1024, 1600x1024).
  **Why** Every number depends on the scale; guessing "2x" put labels at 11-12px and made the sidebar look like a 228px rail.
  **Applies to** SaaS app UI. **Check** fit.mjs: at least 80% of strings fit an integer size within 0.5px. **Source** analytics (2x guess rejected; 1.7578 = 1800/1024), wallet (1.125)

- **RULE** Judge a recreation with numbers, not by eye: measure 50-70 named boxes (ink bbox, darkest colour, ink density) in both images and fix everything off by more than 1 reference pixel.
  **Why** Round 1 "looked right" and still had 48 boxes off by 1-5px; the eye forgives what the founder notices as "noobish".
  **Applies to** all. **Check** cmp.mjs: 0 boxes off by > 1 image px except glyph-shape items. **Source** round-1 -> round-5 analytics (48 -> 18), round-1 -> round-4 wallet

- **RULE** Calibrate text colour by comparing darkest-ink samples at the same scale, not by reading a JPEG pixel: render, compare the darkest 2% of ink, and adjust until they match.
  **Why** Anti-aliasing and JPEG make thin text read lighter than its true colour; matching rendered-to-reference cancels both.
  **Applies to** all. **Check** darkest-ink delta <= 4 levels per channel. **Source** wallet round-1 -> round-2 (nav #3a -> #494949 to match #4a)

- **RULE** Use ink density (dark pixel count) to choose weight: if your text has 10%+ less ink than the reference at the same size, raise the weight 50 units.
  **Why** Font, renderer and scale change how heavy "medium" looks; ink density is a weight check that does not depend on the renderer.
  **Applies to** all. **Check** cmp.mjs ink delta within +-8% on text boxes. **Source** wallet round-2 -> round-3 (ink -5..-11% at 500, ~0% at 550)

- **RULE** Put one onion-skin and pixel-diff strip next to every product screen you ship (reference | ours | 50% | diff) at the same zoom, and save it per round.
  **Why** Side-by-side at equal zoom exposes density and scale differences that self-review at random zooms misses.
  **Applies to** SaaS app UI. **Check** round-N-<screen>.png exists for each iteration. **Source** work/study-rico/round-*.png

### 2.7 Copy and data

- **RULE** Keep sample data internally coherent: a meter showing 8/10 filled must not read "0 / 25"; bar lengths must follow the number they show.
  **Why** Rico's own wallet meters show 80% filled next to "0 / 25" and his product bars follow neither revenue nor units; believable UI dies on details like this.
  **Applies to** SaaS app UI. **Check** each meter fill = count/max; bar width ratios = value ratios (+-3%). **Source** settings-wallet-segmented-meters.jpg and analytics bars (counter-examples, noted in round-1)

- **RULE** Truncate long sidebar and list labels with an ellipsis at the row width (for example "Launch a marketing campaig..."), never wrap them.
  **Why** A single line per row keeps the 30px pitch intact, and real user-generated titles are long.
  **Applies to** SaaS app UI. **Check** nav labels white-space nowrap + text-overflow ellipsis. **Source** analytics-light-cropped-window.jpg, round-1-analytics.png

## 3. Numbers & scales

### 3.1 Final measured spec: A. Analytics dashboard (832x1024 CSS frame, reference at 1.7578)

| Element | Value |
|---|---|
| Canvas / sidebar / page bg | #fafafa (all three); faint 4px dot fade above the window |
| Window | x 55, y 35, r16, 1px #ececec, white bezel, no shadow, runs off right and bottom (bottom 988) |
| Bezel | 50 tall + 1px #f2f2f2; lights 12px at x 76/97/117 (#ee6a5f #f5bf4f #61c554); URL pill x 497, h 27, #f2f2f2, r14, text 13/400 -0.15 #3d3d3d |
| Sidebar | x 56-315 (259 + 1px #efefef border), padding 12 |
| Header row | y 98-130; logo tile 16 r4 #d1f306 at x 76; name 13/500 #262626 at x 102; chevron 16; collapse icon 18 at x 279 |
| Quick actions | x 68, y 138, 236x28, white, 1px #ededed, r8; icon 14 at +8; text 13/500 #6e6e6e at x 100.7; "K" right at +8 |
| Nav rows | 236x28, r8, pitch 30 (sub-items 28); icon 14 at x 76; label 13/500 at x 100.7; centres 190/220/248/276/306/336 |
| Active row | #ededed fill, label and icon #262626 |
| Group labels | 12/400 -0.3 #6e6e6e at x 76; centres 380/544/648; first row centre +29 |
| Tool tiles | 17px r5 gradient, centred at x 83 |
| Getting started | x 68, y 901, 236x35, r10, ring 4.5% + 0 2px 5px 9%; ring 16 (2px, #d6e6fb/#1f6fce); text 14/500 -0.31; "1 of 5" 13/500 -0.31 #757575 |
| Footer | hairline y 948; tile 18 r5 #161616 at (75, 959); "14 days left" 14/500 -0.31; Upgrade 70x24 r7 #1a1a1a, 13/500 white |
| Main | x 316+, padding-left 24 (content x 340) |
| Title row | icon 16 at (340, 117); "Analytics" 16/500 at x 361.7, cap centre ~125 |
| Chips | y 156, h 28, r6, 1px #ededed; widths 134.5 / 112 / 83.5 / 140; gap 12; icon 14-15 sub grey; label 13/500; chevrons-up-down 14 |
| KPI cards | y 208, 268x94, r14, gap 20; label 12/500 + 13px globe gap 2.7, dashed underline 1px #dedede at y+31; value 18/600 cap top y+60; delta 11/500 gap 7; spark 7 x 8px gap 2 r2 #ededed, right edge at padding 16 |
| Chart card | y 322, h 376, r14; label at +18; value 18/600; gridlines 1px #f0f0f0 every 44 from y 419; plot x from 405; y labels 12/400 #6e6e6e at x 356; x labels 12/400 #757575, pitch 136.6; series 1.5px #519dfa; comparison 1px dotted; legend dots 6px #0077e6/#519dfa, 12/500, gap 21 |
| Top products | y 718, 364 wide; rows pitch 54 from +54; thumb 15 r4; name 12/500; value col 60 / units col 52, 12/400 -0.31, right edge 687; bar 10 tall r3 #0077e6, 23 below the row top; widths 332/245/199 |
| Session card | x 724, cropped; same label grammar |
| Fade | last row blur 2.5px + backdrop blur band from y 922 |

### 3.2 Final measured spec: B. Settings / Wallet (1600x1024 CSS frame, reference at 1.125)

| Element | Value |
|---|---|
| Canvas | #ededed |
| Window | x 132, y 94, 1336x835, #fbfbfb, r ~8, no border or shadow |
| Content panel | x 353, y 100.5, 1109x821.5, white, 1px #f0f0f0, r14 (6-7px inset from window) |
| Sidebar | x 132-353, rows x 140-344.5 (204.5 wide), icons 15 at x 148.6, labels 13/550 -0.35 #494949 at x 173.2 |
| Back row | chevron 16 #4b4b4b; "Back to migma" 12/550 -0.15; cap centre ~119.5 |
| Group labels | 11/500 #a3a3a3 at x 148.2; centres 154.7 / 259.1 / 392 / 496 / 571 |
| Row centres | Profile 183.5, Password 213.3, Wallet 287.6, Usage 317.3, Referral 347.2, Appearance 421.3, Notifications 450.7, Deliverability 525.3, Integrations 599.6, API Keys 629.3, Webhooks 659.5, Helps 905 |
| Active row | #f0f0f0, r8, 28 tall; active icon #494a4e, others #7e7e7e at 1.6 stroke |
| Column | x 610-1205.5 (596), centred in the panel |
| Title | "Wallet" 16.5/550 #333, cap top 151 |
| Usage card | y 204, 595.5x547.5, #fbfbfb, 1px #f0f0f0, r12 |
| Plan/Billing card | inset 5: x 615, y 209.5, 585.5x112.5, white, r7; divider x 906.5; labels 11/550 #656565 cap 225.5; values 14/550 cap 249.8 (Mastercard -0.2); meta 11/500 #828282 cap 299.5; text x 628.3 / 920.8 |
| Usage rows | 6 rows, title cap 348.9 + i x 59.56; title 12/550 -0.15 #424242; meta 11/500 +0.06 #828282 at +19.4; meter x 1000, 113x12, 10 ticks 8x12 r2 #559ff6/#f0f0f0; count 12/550 #474747 right at 1187.6 |
| Button | x 627.5, y 701.5, 116x32.5, r8, gradient #363636 -> #1c1c1c, inset top 10% white, 12/500 white |
| API card | y 791.5, white, r12; code-box icon 14 #4a4854; title 12/550 at x 653; rows cap 843.3 / 876.5, values right at 1187.6; outline button 30 tall r8 1px #e8e8e8 (cropped) |

### 3.3 Engine default vs Rico (where our instinct is off)

| Property | Engine (Acquisity v2, rejected) | Rico (measured) |
|---|---|---|
| Sidebar width / padding | 272 / 20 | 260 / 12 (settings 221 / 8.5) |
| Nav row / pitch | 36 / 40 | 28 / 30 |
| Nav icon | 20px remix | 14px, ~1.3 stroke (settings 15) |
| Nav label | 14/500 | 13/500 (550 at 1x) |
| Group label | 11/500 uppercase +0.04em | 11-12 sentence case, light grey |
| Active state | fill + chevron + accent bar + accent icon | fill + darker text/icon only |
| Workspace identity | 40px avatar + 2 lines | 16px tile + one 13px line |
| KPI value | 24/450, -0.02em, tnum | 18/600, tracking 0, proportional |
| Strong / sub text | #171717 / #5c5c5c | #262626 / #6e6e6e |
| Page padding | 32 | 24 |
| Card gap | 28-32 | 20 |
| Shadows | several | one (the progress card) |

## 4. Dos and Don'ts

- **Do** fit the scale from ink widths before measuring (fit.mjs). **Don't** assume a 2x export: at 2x the dashboard read as 11-12px labels and a 228px sidebar.
- **Do** keep chip labels on one line (white-space nowrap). **Don't** let a 13px label wrap inside a fixed-width chip (round-1: "Last 30 days" broke onto two lines).
- **Do** put the dashed definition underline under the icon and the label together. **Don't** underline only the text (round-1 dash was 2.3px too high and too short).
- **Do** space numeric columns with fixed widths. **Don't** use flex gap between right-aligned number columns (round-1 value column was 11px off).
- **Do** use proportional figures on standalone values. **Don't** set tnum on a hero metric (it widened "$168,920" by 2.3px and shifted the delta 5px).
- **Do** take colours from rendered-vs-reference darkest-ink matching. **Don't** pick #3a3a3a from a guess (it came out darker than the reference's #4a).
- **Do** match icon silhouettes. **Don't** swap in a glyph with the wrong shape just because it is lighter (phosphor ChartBar was lighter but ascending, and reverted).

## 5. Exceptions & judgement calls

1. **Founder AlignUI rule vs Rico.** founder-taste says uppercase section labels, 24px/450 numbers and 32px padding (Acquisity v1 -> v2). That template was then rejected as "nothing like Rico". [engine note] For product UI at the Rico bar, these lessons (sentence-case labels, 18/600 values, 24 padding) override the AlignUI template grammar. Flag the conflict to the founder and do not silently apply both.
2. **Two density levels.** The dashboard (1.76x crop) uses 12/13px with tracking 0. The settings screen (1.125x) uses 11/12/13 with 550 weights. Both are the same system at different zoom; choose by the frame size you present at.
3. **Off-grid values.** 2, 3, 7, 10.5, 59.56 and 113 are real measurements. [engine note] Copy them in recreations. In new work keep the relationships (tight inside, 20 between, about 45 between groups) rather than the exact decimals.
4. **Weight 550.** His "Medium" in the settings screen needed Inter 550 to match ink at 1x; in the 1.76x dashboard 500 matched. [engine note] This is probably SF Pro vs Inter plus JPEG blur; measure ink density per project instead of assuming.
5. **Icon set.** He uses Huge Icons (not installed). Our closest matches were lucide (stroke adjustable) for most glyphs, remix for the 3-bar chart, and phosphor for the sidebar glyph. Glyph shape is the largest remaining visual difference in round 5.
6. **Photo thumbnails, glass tiles, illustrated assets** were replaced with gradient stand-ins. Size and position match; the material does not. A shipped build needs real assets, not CSS.
7. **His data incoherence** (meters vs counts, bars vs values) is a counter-example, not a style.

## 6. Figures worth keeping

| File | Shows |
|---|---|
| work/study-rico/round-1-analytics.png | First rebuild: structure right, chip text wraps, icon gaps off; pixel diff 3.24% |
| work/study-rico/round-2-analytics.png | After the measurement pass: 29 boxes off, 2.51% |
| work/study-rico/round-3-analytics.png | Chip/label/footer fixes: 21 off, 2.34% |
| work/study-rico/round-4-analytics.png | Icon swaps tested (phosphor), logo size |
| work/study-rico/round-5-analytics.png | Final: 18 boxes off, all within 1-2 image px; 2.35% |
| work/study-rico/round-1..4-wallet.png | Settings rebuild: colours calibrated by darkest-ink, weights by ink density; 1.31% -> 1.22% |
| work/study-rico/render-analytics-final.png, render-wallet-final.png | Final renders at the reference pixel size |
| work/study-rico/tools/*.mjs | px (measure), fit (scale/type), trace (chart polyline), render, cmp (box deltas), overlay (strip) |

## 7. Open questions

- The exact font is unconfirmed. Ink widths fit Inter at whole sizes, but glyph heights in the settings screen run 1 image px taller; that could be SF Pro or JPEG blur.
- Export scales (1800/1024 and 1.125) are inferred from fits and round frame sizes, not confirmed against the Figma file.
- Colours come from JPEG darkest-ink matching; saturated colours (deltas, meter blue) carry chroma-subsampling error of a few levels.
- Only light-mode screens were rebuilt. The companies table (companies-database-table.jpg) and the CRM agent panel were not recreated; table and agent-panel craft still need the same exercise.
- The remaining 18 analytics boxes are 1-2 reference px: glyph shapes (Plan, Analytics icon, calendar), the logo glyph, and JPEG blur on text heights.
