---
source: web:linear.app, attio.com, commslayer.com, raycast.com, cal.com, vercel.com (home + /products/observability), untitledui.com (+ /react/components/line-bar-charts), catalyst.tailwindui.com, alignui.com (+ pro.alignui.com templates), resend.com, stripe.com (+ /billing), mercury.com (+ /spend-management), ramp.com, posthog.com; measured 2026-10-08 and compared with work/kestrel
chapter: How the best sites build product UI for marketing (dashboards, app windows, cropped fragments, AI panels, charts, tables, command menus)
pages: n/a (web; Playwright at 1440x900, DPR 2)
topic_tags: [product-ui, dashboard, app-window, frame, bezel, radius-ladder, controls, chart, ai-panel, command-menu, sample-data, density, typography, benchmark, kestrel]
status: studied
---

# Product UI in marketing: what the best sites measure like

Raw data: `knowledge/benchmarks/product-ui/measurements.json` (per frame: radius by element height, control ladder, nested radius pairs, fonts, colours, gaps, shadows, SVG chart strokes, frame recipes, raster wrappers, component probes). Screenshots of every product visual are in the same folder (`<site>-frameN.png`, `raster-*.png`, `kestrel-frame0.png` as the baseline). Evidence tags: **[M]** computed style measured in the rendered page, **[V]** read visually from a screenshot (no number claimed), **[K]** the Kestrel baseline measured the same way, **[S]** AlignUI open-source kit values already recorded in `knowledge/benchmarks/alignui-system.md`.

## 1. Core ideas

1. **The fake UI is built from real components, at real sizes, with a very small vocabulary.** Linear, Attio, Commslayer and Raycast are live DOM, not pictures. Their windows use 6-7 font sizes (Linear 7: 10-20 px; Attio 6: 11-20; Raycast 6: 11-32; Kestrel 6), 2-3 weights (Attio only 500 and 600; Linear 400/510/590; Raycast 400/500/600) and a 3-step grey text ramp. Richness comes from content and rows, not from extra styles. [M]
2. **One control height does almost all the work inside an app window: 28 px, radius 8.** Linear sidebar items, buttons and header controls are 28/8; Attio nav, quick actions, chips and buttons are 28/8-9; Commslayer sidebar, tabs and buttons are 28/8 (59 of its 25-32 px elements are r8); Cal duration items are 28/6. Taller controls are inputs (32-40) and command rows (Raycast 40/6). [M]
3. **Radius follows height by a ratio of about 0.22-0.31, and radius shrinks as you go inward.** 28 -> 8 (0.29), 32 -> 8-10 (0.25-0.31), 36 -> 8 (0.22), 40 -> 6-10, cards (97-240 px tall) -> 12, windows 12-19, hero frames 16-28. Peers' cards are the window radius minus 4 (Attio 16 -> 12, Commslayer 16 -> 12, Vercel 16 -> 12, Linear 12 -> 8). [M]
4. **Frames are a recipe, not a drop shadow.** An edge (1 px ring at 6-8% black on light, 8-12% white on dark), 6-10 px of frame padding, an inner radius about outer minus padding (Attio 16/6, Raycast 19/8, AlignUI 28/10, Kestrel 22/6), and a run-off-the-fold crop that shows about half of the window (Linear 51%, Attio 51%, Commslayer 48%, Kestrel 69%, Ramp 74%). [M]
5. **Crops are faded to the page colour, never cut.** Vercel: 89 px gradient from transparent to the page colour. AlignUI: gradient reaching solid at 65% of its height. Resend: 24 px top and 52 px bottom black fades. Linear AI tiles: SVG gradients solid 0-12%, transparent by 30-63%. Mercury blurs the trailing table rows instead. [M]
6. **Charts are quiet: 2 px lines, 1 px grid at about 5-8% black, 11-12 px axis text, one annotation.** Untitled UI strokes 2 px with 5 grid lines in lab(96.5); Vercel strokes 2 px and 1 px with 11 px ticks; Kestrel strokes 2 px with 4 grid lines #f0f0f0. The only "loud" chart in the set (PostHog's 50-colour stacked area) is the counter-example. [M]
7. **AI panels show the work.** Linear's chat shows "Worked for 10 sec", a result card ("Changed 2 files +22 -10 / Draft Reset dimmed ride rows / master <- ride/drv-364...") and a mono branch name; Raycast shows tool rows with count badges ("Fetching issue details 5"). The product proves a workflow, not a chat bubble. [M][V]
8. **Believability is data discipline.** Named people with role lines, IDs in a real format (DRV-8852, #1042, #5252), correct arithmetic, ordered timestamps, truncated strings. The same discipline fails visibly when slipped: AlignUI Pro's finance template shows $900 + $600 + $200 against a $1,800 spend; Vercel's table prints "21,0124"; Raycast's menu bar says 9:41 AM while the clip says "Copied Today, 13:35:07". [V]
9. **Many premium product visuals are raster or video, so the craft is in the wrapper and the export density.** Ramp (video + imgix), Untitled UI home (3024x2016 PNG shown at 1080 wide = 2.8x), Mercury (webp at 1.4-2.8x), AlignUI Pro templates (1600x1200 shown at 664 wide = 2.4x), Vercel home (webp). Wrappers are r8-16 with `overflow:hidden` and often a 1 px edge. [M]
10. **Several sites build the UI at one size and scale the container** (Attio frame scales 0.95 -> 1 on scroll; Stripe and Mercury visuals render 8-10 px type). It looks like texture, which is fine for decoration and wrong for data. [M]
11. **Kestrel already matches the structure** (frame 22/6/16, 8/12/16 ladder, ring-plus-hairline cards, 2 px chart line, one annotation) and differs on three measurable points: its 32 px controls are r12 (peers top out at 0.31 x height), its window is sparser than every peer (21 DOM elements per 100k px^2 vs 32-81), and its chart ticks are 10 px (peers 11-12). Section 5 treats these as owned decisions, not defects. [K][M]

## 2. Rules

### 2.1 Frames, bezels, crops

- **RULE [PUI-01]** Build the hero product frame as outer shell + inner window with inner radius = outer radius - frame padding (+/- 2 px). Reference pairs: Attio 16 outer / 6 pad / 10-12 inner; Raycast 19 / 8 / 12; AlignUI 28 / 10 / 20; Kestrel 22 / 6 / 16.
  **Why** Corners that share a centre keep an even gap around the curve; mismatched pairs pinch at the corners.
  **Applies to** landing page. **Check** for each nested rounded child: (parent radius - child radius) within 2 px of the offset between their edges. **Source** Attio, Raycast, alignui.com, Kestrel [M]. (Linear 12 / 8 / 8 is the non-concentric counter-example.)

- **RULE [PUI-02]** Keep frame padding at 6-10 px. Measured: Attio 6, Kestrel 6, Linear 8, Raycast 8, Commslayer 8 (page gutter around a r16 window), AlignUI 10.
  **Why** Under 6 px the bezel disappears; over 10 px the window reads as a card on a tray and the UI shrinks.
  **Applies to** landing page. **Check** computed padding of the frame element, 6-10 px. **Source** Attio, Linear, Raycast, Commslayer, alignui.com [M]

- **RULE [PUI-03]** Edge the frame and every card with a 1 px ring, not an accent border: 6-8% black on light surfaces (Attio 6%, Vercel 8%, Kestrel 6-7%, Ramp 1 px rgba(33,33,33,0.10)), 8-12% white on dark (Raycast 8%, Linear chat panel 12%, Linear tiles 6%).
  **Why** A low-contrast neutral edge separates surfaces without competing with content; it matches the founder rule of no accent rings on cards.
  **Applies to** landing page | SaaS app UI. **Check** box-shadow contains `0 0 0 1px` (or border 1 px) with alpha 0.05-0.12 and a neutral hue. **Source** Attio, Vercel, Raycast, Linear, Ramp, Kestrel [M]

- **RULE [PUI-04]** Put the big soft shadow on the frame only; give resting cards ring + at most one 1-2 px hairline shadow. Attio frame: ring 6% + offsets 1/3/8/16 px at blur 2/6/14/28 and alpha 0.024/0.03/0.035/0.04. Kestrel card: ring 7% + `0 1px 2px` 5%; Catalyst card: ring 7% + `0 2px 2px` 5%. Linear's floating chat panel: `0 2px 32px` 25% black on dark.
  **Why** Stacked low-alpha layers approximate real light falloff; heavy shadows on every card make a dashboard look pasted.
  **Applies to** landing page | SaaS app UI. **Check** frame shadow has >= 3 layers with alpha <= 0.06 each (light theme); card shadow has <= 2 layers. **Source** Attio, Commslayer (5+ layers, each <= 0.03), Linear, Kestrel [M]

- **RULE [PUI-05]** Run the frame off the fold so the first viewport shows 45-75% of its height: Linear 51%, Attio 51%, Commslayer 48%, Kestrel 69%, Ramp video 74%.
  **Why** A visibly continuing window says "there is more product"; showing under 45% hides the proof, over 75% removes the pull to scroll.
  **Applies to** landing page. **Check** (viewport height - frame top) / frame height at 1440x900, 0.45-0.75. **Source** Linear, Attio, Commslayer, Ramp, Kestrel [M]

- **RULE [PUI-06]** Fade a cropped edge with an overlay gradient whose last stop is the exact parent background, 52-90 px high (Vercel 89 px, Resend 52 px bottom and 24 px top), or a gradient that reaches solid by 65% of its height (AlignUI `transparent 0% -> #f7f7f7 65%`). Set `pointer-events:none`.
  **Why** A hard crop reads as a screenshot error; a fade to the page colour reads as depth. A mismatched end colour leaves a visible band.
  **Applies to** landing page. **Check** overlay element with `linear-gradient`, end colour == parent background-color, height 52-90 px or a 65% stop. **Source** Vercel observability, alignui.com, Resend [M]

- **RULE [PUI-07]** For cropped fragments (single tiles, chat cards) use SVG or CSS mask gradients with a long solid zone then a long fade: Linear AI tiles are solid to 5-12% and transparent by 30-63% on top, bottom and right edges, colour #08090A equal to the page.
  **Why** A long solid zone keeps the readable part crisp; a fade that starts too early blurs the point of the fragment.
  **Applies to** landing page. **Check** gradient stops: solid up to 5-12%, transparent by 30-63%. **Source** linear.app/ai [M]

- **RULE [PUI-08]** In tables and lists show 5-6 complete rows, then fade or blur the rest: Mercury shows 5 sharp rows then 5 blurred; Vercel shows 3 sharp, 1 faded; Kestrel's sidebar already ends on a clipped label.
  **Why** Enough full rows to read the pattern; the faded rows imply length without adding noise.
  **Applies to** landing page. **Check** count of rows with opacity 1 before the first faded row: 3-6. **Source** Mercury spend-management, Vercel observability, Kestrel [V]

- **RULE [PUI-09]** Add one overlapping foreign object to a flat window when it needs depth (a phone with a "Bills / Approve" screen and a black card over Ramp's Reporting window; code-snippet cards overlapping Stripe's Connect dashboard; a terminal tile over Attio's sidebar). Keep it to one or two overlays and let them cover less than 20% of the window.
  **Why** Overlap builds a z-axis and proves a second surface (mobile, API) without another section.
  **Applies to** landing page. **Check** visual: <= 2 overlays, each hiding no key datum. **Source** Ramp, Stripe, Attio [V]

- **RULE [PUI-10]** Use window chrome (three dots, URL bar) only when the point is "this runs on a computer" (Attio, AlignUI, Resend, Untitled UI); use chromeless frames for web-app heroes (Linear, Commslayer, Kestrel).
  **Why** Chrome costs 40-60 px of height that could be product; it earns it only when the platform is part of the story.
  **Applies to** landing page. **Check** visual; if chrome exists its height < 56 px. **Source** Attio, alignui.com, Resend, Linear [V]

- **RULE [PUI-11]** If you scale a built UI inside a frame, build at native size and scale the whole container, then keep every readable string at >= 11 px rendered (type x scale); allow 8-10 px only for decorative or tertiary text.
  **Why** Attio scales its frame 0.95 -> 1 and stays legible; Stripe (8-10 px) and Mercury (8.7-10.4 px) turn data into texture, which is fine for background fragments and wrong for the focal one.
  **Applies to** landing page. **Check** min over visible text of fontSize x ancestor scale >= 11 px for focal content. **Source** Attio, Stripe billing, Mercury spend [M]

- **RULE [PUI-12]** When the visual must be a raster or video, export at >= 2x the rendered width (Untitled UI 2.8x, Mercury 2.77x on tiles, AlignUI Pro 2.41x) inside an `overflow:hidden` wrapper with radius 8-16 and a 1 px edge (Untitled UI 8 px + #d4d4d4, Ramp 12 px + rgba(33,33,33,0.1), AlignUI Pro 16 px on #e6e6e6).
  **Why** Product text is 11-14 px; at 1x it blurs on retina and the whole page looks cheaper than the UI claims to be.
  **Applies to** landing page. **Check** naturalWidth / renderedWidth >= 2. **Source** untitledui.com, mercury.com, pro.alignui.com, ramp.com [M]

### 2.2 Controls and radius ladder

- **RULE [PUI-13]** Use one control-height ladder of 28, 32, 36, 40 inside a window; make every control in a row the same height. In-app default is 28 (Linear, Attio, Commslayer, Cal) or 32 (Raycast, AlignUI small, Kestrel).
  **Why** Mixed heights in a row are the first thing the eye catches in a fake dashboard; a ladder makes any pair line up.
  **Applies to** SaaS app UI | landing page. **Check** offsetHeight of siblings in one flex row is identical; set of control heights is a subset of {24, 28, 32, 36, 40}. **Source** Linear, Attio, Commslayer, Cal, Raycast, alignui.com [M]

- **RULE [PUI-14]** Set control radius to 0.22-0.31 x height: 28 -> 8, 32 -> 8-10, 36 -> 8, 40 -> 6-10. Full pills only for chips, avatars, icon-only circles and status dots.
  **Why** Below 0.2 a control looks sharp next to soft cards; above 0.31 it starts to read as a pill and loses the rectangular hit area.
  **Applies to** SaaS app UI | landing page. **Check** radius / height for buttons, inputs, sidebar items within 0.22-0.31 (flag > 0.31 as an owned decision). **Source** Linear 28/8, Attio 28/8, Commslayer 28/8 (59 elements), Catalyst 36/8, AlignUI 32/9-10 and 40/10, Raycast 32/10 [M]

- **RULE [PUI-15]** Make a segmented control as container radius = item radius + padding: container r10, padding 4, items 28 high r6 (container 36 high). Item text 14/500, item padding 6x12.
  **Why** It is the concentric rule applied to a control; the thumb stays visually centred and the corners stay even.
  **Applies to** SaaS app UI | landing page. **Check** container height = item height + 2 x padding; container radius - item radius within 1 px of padding. **Source** Cal.com duration selector [M]; AlignUI kit (container r10, padding 4, item 28 r6) [S]. Kestrel uses container 32/r12/pad 2 with 28/r8 items [K].

- **RULE [PUI-16]** Size a sidebar item 28-32 high with radius 8, horizontal padding 8, icon-label gap 6-8, 13-14 px at weight 500 (510 on Linear), and 1-2 px between items. Section labels are 11-12 px at 500-510 in tertiary grey on a 24 px row.
  **Why** Dense lists keep rounded hit areas apart with 1-2 px instead of hairlines, so hover and active pills never touch.
  **Applies to** SaaS app UI | landing page. **Check** nav item height 28-32, radius 8, gap 6-8, parent gap 1-2. **Source** Linear (28/8, padding 0 7px, gap 8, 13/510, items 2 px apart, labels 12/510 on 24 px), Attio (28/8-9, px8, gap 6, 14/500, list gap 1), Commslayer (28/8, px8, gap 8, 14 px) [M]

- **RULE [PUI-17]** Mark the selected sidebar row with a neutral fill and stronger text, not an accent outline: Linear uses `rgba(255,255,255,0.04)` on dark; Attio uses a light grey fill; Commslayer a white fill; Kestrel a white fill with ring and a blue icon tint.
  **Why** Selection is a state, not a brand moment; an accent border on every selected thing is the "accent ring" pattern the founder rejects.
  **Applies to** SaaS app UI | landing page. **Check** selected nav row has no border/outline colour equal to the accent. **Source** Linear, Attio, Commslayer, Kestrel [M]

- **RULE [PUI-18]** Give icon-only buttons the same height as their row neighbours and one shape per set: Linear has 28 px circle icon buttons (11) and 28/r8 text buttons (12), used in different clusters; Raycast dock tiles are 54 px r12 (active tile r16).
  **Why** A square r8 icon button next to a 28 circle looks unfinished; shape is part of the ladder.
  **Applies to** SaaS app UI | landing page. **Check** icon button height = adjacent control height; one radius value per cluster. **Source** Linear, Raycast, Kestrel [M]

- **RULE [PUI-19]** Make badges and delta pills 16-24 high with 11-12 px text at 500-600: Catalyst 24/r6 12/500; Commslayer count 20/r8 12/500; Attio score 22/r7; Vercel error pill 16/r4; Kestrel 18/r8 11/550. Tint the fill and darken the text (Kestrel green #e9f9ef / #18794e).
  **Why** A badge is a quiet annotation of the number beside it; larger than 24 high and it competes with the value.
  **Applies to** SaaS app UI | landing page. **Check** height 16-24, fontSize 11-12, text contrast >= 4.5:1 on its fill. **Source** Catalyst, Commslayer, Attio, Vercel, Kestrel [M]

- **RULE [PUI-20]** Render keycaps 16-21 high, radius 4-6, 10-11 px at 600 with a 1 px border or ring: Raycast 21/r4 11/600, Attio 20/r6 with border, Commslayer 16/r4, Kestrel 18/r4 10 px.
  **Why** Keycaps are the cheapest proof of a keyboard-first product and they set the scale of the whole UI.
  **Applies to** SaaS app UI | landing page. **Check** kbd height 16-21, radius 4-6. **Source** Raycast, Attio, Commslayer, Kestrel [M]

- **RULE [PUI-21]** Build tooltips 24-26 high, radius 6-8, padding 0-1 x 8, 12-14 px at 500, with a 1 px edge and at most one soft shadow: Raycast `h26 r6 pad 1x8 14/500, border 1px white 6%, shadow 0 4px 4px 25%`; AlignUI kit small tooltip r6, padding 10x4.
  **Why** A tooltip is a small, transient layer; if it has more depth than the card it annotates, the chart loses the hierarchy.
  **Applies to** SaaS app UI | landing page. **Check** tooltip height 24-26 (single line), radius 6-8, <= 2 shadow layers. **Source** Raycast [M]; AlignUI kit [S]; Kestrel 26/r8 [K]

- **RULE [PUI-22]** Size text inputs 32-40 high (36 default) with the ladder radius (36 -> 8; 40 -> 10) and a 1 px ring, not a heavy border; chat composers are taller (Linear 94 px, r8, padding 10, ring 20% black).
  **Why** Inputs share the control ladder; a composer gets height because it holds multi-line text plus an action row.
  **Applies to** SaaS app UI | landing page. **Check** input height in {32, 36, 40}; composer radius 8-12. **Source** Linear, AlignUI kit [S], Raycast search row 56 (command palette exception) [M]

- **RULE [PUI-23]** Size a chat bubble at radius 12 with padding 12x16 and 14 px text at line-height 1.4 (Commslayer: r12, 12/16, 14/19.6, white with a ring-plus-soft shadow); the user bubble is a neutral fill, right-aligned.
  **Why** Bubbles are cards at message scale; their radius sits on the card rung (12), not the control rung.
  **Applies to** SaaS app UI | landing page. **Check** bubble radius 12-16, padding >= 12, line-height 1.4-1.55. **Source** Commslayer, Linear (13/20 = 1.54) [M]

- **RULE [PUI-24]** Show an AI answer as a sequence: user prompt -> one process line ("Worked for 10 sec", or tool rows with a count badge) -> answer text -> one result card -> action chips -> composer. Linear: 13/20 text, result card r6 padding 11 border 6% white, chips 24 pill.
  **Why** The process line and result card make the answer feel computed, and the actions show what you do next; plain text with a button looks like a mock.
  **Applies to** landing page. **Check** visual: panel contains a status/process row and a result card with a verb and counts. **Source** Linear (chat panel 400x520 r12, border 12% white, header 48 px), Raycast tool rows [M][V]

- **RULE [PUI-25]** Make cards r12 inside a r16 window (card = window radius - 4) with padding 10-16, a 1 px 5-6% edge (Attio #eeeff1), and a header row of a 12/500 secondary-grey label plus a small icon or secondary button: Attio highlight cards r12 / padding 10x12 / 97 px high; Commslayer panels r12, side blocks r8 padding 8; Vercel panels r12 inside a r16 frame.
  **Why** Nested radius shrinks inward; a card as round as its window looks like a second window.
  **Applies to** SaaS app UI | landing page. **Check** card radius = window radius - 4 (+/- 2) or the owned exception is written in DIRECTION.md. **Source** Attio, Commslayer, Vercel (peers) [M]; Kestrel is 16/16 (owned) [K]

- **RULE [PUI-26]** Build table rows 40-56 high with a 36 px header row at 11-12 px in secondary grey, 1 px hairlines at 5-8%, and chips in cells at 24-27 high (r5 or pill): Attio header 36; Mercury category chips 27/r5.3 and avatars pill; Catalyst badge 24/r6.
  **Why** Row height sets density; chips in cells carry the "believable data" cue (status, category, owner).
  **Applies to** SaaS app UI | landing page. **Check** row height 40-56, header height 36, cell chip height 24-27. **Source** Attio, Mercury spend (scaled), Catalyst [M]

- **RULE [PUI-27]** Buttons are 28 high r8 at 13-14 px/500-510 in-app (Linear, Attio, Commslayer) and 36 high r8 at 14/600 in a kit page (Catalyst); marketing CTAs are a separate ladder and never reuse in-app buttons.
  **Why** Product buttons are quiet; the CTA outside the frame needs its own, larger grammar so the eye knows which is real.
  **Applies to** landing page | SaaS app UI. **Check** in-frame button height 28-36, text 12-14 px. **Source** Linear, Attio, Commslayer, Catalyst [M]

### 2.3 Type, colour, spacing, density

- **RULE [PUI-28]** Use at most 7 distinct font sizes in a window, with 12/13/14 carrying about 85-90% of the text: Linear 7 sizes (12 px on 64 and 13 px on 20 of 92 text elements), Attio 6, Raycast 6, Kestrel 6.
  **Why** A narrow size set is what makes crammed UI look designed; extra sizes are where sloppy fake dashboards show.
  **Applies to** SaaS app UI | landing page. **Check** count distinct computed font-sizes inside the frame <= 7; share of 12-14 px >= 70%. **Source** Linear, Attio, Raycast, Kestrel [M]

- **RULE [PUI-29]** Limit weights to 2-3 per window (Attio 500/600; Linear 400/510/590; Raycast and Catalyst 400/500/600) and use 500 for labels and controls.
  **Why** Weight steps replace size steps at 12-14 px; four weights (Kestrel uses 400/500/550/600) start to blur the hierarchy.
  **Applies to** SaaS app UI | landing page. **Check** distinct computed font-weights in the frame <= 3. **Source** Attio, Linear, Raycast, Catalyst, Kestrel [M]

- **RULE [PUI-30]** Set labels at 12/500 in secondary grey (Attio #75777c, line-height 16; Linear 12/510 #62666d) and values at 14-20 at 500-600 in primary; small UI line-heights are 1.33 (12), 1.43 (14), 1.5-1.55 (13 in chat); letter-spacing 0 to -2% (Attio -0.14 to -0.28 px, i.e. -1% to -2%, on 14 px labels; Linear 0 on 12-13 px).
  **Why** Label/value contrast and tight tracking are what make a number card read as a product, not as a text block.
  **Applies to** SaaS app UI | landing page. **Check** label fontSize 11-12, value fontSize >= 1.2 x label, tracking between 0 and -0.02em. **Source** Attio, Linear [M]

- **RULE [PUI-31]** Colour text with a 3-step neutral ramp plus one accent and keep text colours <= 8 per window: Linear #d0d6e0 / #8a8f98 / #62666d (+ #f7f8f8); Attio rgb(36,38,41) / rgb(80,81,85) / 55% / 40% black; Raycast white at 100/60/40%; Kestrel #171717 / #5c5c5c / #737373. Commslayer's 16 colours is the outlier (colour-coded channels).
  **Why** A fixed ramp holds the hierarchy; colour is then reserved for status and the one signal.
  **Applies to** SaaS app UI | landing page. **Check** distinct text colours in frame <= 8 (<= 5 neutrals). **Source** Linear, Attio, Raycast, Kestrel [M]

- **RULE [PUI-32]** Set product UI in a neutral grotesk and use a monospace for IDs, code and branches: Linear (Inter Variable + Berkeley Mono at 12 px for `vehicle_state` and branch names), Attio, Commslayer, Raycast, Catalyst and Kestrel all use Inter; Vercel uses Geist Sans + Geist Mono; Cal keeps Inter for UI under Cal Sans headings.
  **Why** A neutral face keeps the screenshot "product-like" next to a more expressive marketing headline; mono gives instant technical credibility.
  **Applies to** SaaS app UI | landing page. **Check** computed font-family of frame text; mono used on id/code tokens. **Source** Linear, Attio, Commslayer, Raycast, Catalyst, Vercel, Cal [M]

- **RULE [PUI-33]** Keep ticks, kbd and tertiary captions at >= 11 px (Linear 10-11 only on 4 elements; Vercel 11; Untitled UI 12; Raycast 11) and raise Kestrel's 10 px chart ticks to 11.
  **Why** At 10 px or below the strings turn to texture at hero scale; 11 is the smallest size the peers keep for data.
  **Applies to** SaaS app UI | landing page. **Check** min fontSize x scale of data strings >= 11. **Source** Vercel, Untitled UI, Raycast, Linear [M]; Kestrel [K]

- **RULE [PUI-34]** Space everything on 2/4/6/8/12/16: share of flex/grid gaps in that set >= 90% (Linear 8 x 28, 6 x 24, 4 x 9, 2 x 6, 12 x 2; Attio 6 x 22, 4 x 12, 8 x 11; Commslayer 4/8/2/12/16/6; Raycast 10/8/2/12/6; Kestrel 8 x 17, 6 x 5, 2 x 4).
  **Why** Every peer has a 6 px half-step and a 2 px micro-gap; they are what keeps rows tight without feeling cramped.
  **Applies to** SaaS app UI | landing page. **Check** histogram of computed `gap` values inside the frame; values outside {1, 2, 4, 6, 8, 10, 12, 16} < 10%. **Source** Linear, Attio, Commslayer, Raycast, Kestrel [M]

- **RULE [PUI-35]** Target 30-55 DOM elements per 100k px^2 of window for app-style heroes (Linear 32, Attio 34, Resend 35, Cal 40, AlignUI 42, Raycast 53; Commslayer 81 is a deliberately dense helpdesk). Add rows, chips and metadata before adding decoration or enlarging type.
  **Why** Density is the main perceived-richness lever once styles are right; Kestrel at 21 is sparser than every full-window peer.
  **Applies to** landing page. **Check** element count / (frame area / 100000), 30-55 (proxy only). **Source** peers [M]; Kestrel [K]

### 2.4 Charts

- **RULE [PUI-36]** Stroke series at 2 px with round caps and show at most 3 series, one focal and the rest grey, dashed or lighter: Untitled UI 2 px x 3 series, Vercel 2 px (+ 1 px), Kestrel 2 px focal + 1.25 px grey dashed `3 4`.
  **Why** 2 px reads at hero scale without turning heavy; one focal line gives the chart a point of view.
  **Applies to** landing page | SaaS app UI. **Check** stroke-width of series paths 1.25-2; series count <= 3. **Source** Untitled UI charts, Vercel observability, Kestrel [M]

- **RULE [PUI-37]** Draw 3-5 horizontal gridlines at 1 px, 5-8% black (about #f0f0f0-#f5f5f5; Vercel rgba(0,0,0,0.08); Untitled UI lab(96.5); Kestrel #f0f0f0), no vertical grid; Attio's bar chart uses dashed `4 4`.
  **Why** The grid is a reading aid, not content; darker or denser grids pull attention from the data.
  **Applies to** landing page | SaaS app UI. **Check** gridline stroke contrast vs card background < 1.15:1, count 3-5, no vertical lines. **Source** Untitled UI, Vercel, Attio, Kestrel [M]

- **RULE [PUI-38]** Set axis text at 11-12 px, weight 400, tertiary grey, with abbreviated y values (300k, 30k, 1,000) and 4-6 x labels: Vercel 11 px #4d4d4d, Untitled UI 12 px #666, Kestrel 10 px #737373.
  **Why** Axis text is third-level information; abbreviations stop labels from competing with values.
  **Applies to** landing page | SaaS app UI. **Check** svg text fontSize 11-12 and weight 400; label count <= 6 per axis. **Source** Vercel, Untitled UI, Kestrel [M]

- **RULE [PUI-39]** Fill an area with a vertical gradient from series colour at 16-70% alpha at the top to 0 at the baseline, or a flat 8-15% tint; never an opaque fill: Kestrel `#335cff 0.16 -> 0`; Untitled UI stops `5%: 0.7 -> 95%: 0` on `currentColor`; Vercel flat tints under 2 px lines.
  **Why** The fill gives mass while the line carries the value; opaque areas bury the grid and neighbours.
  **Applies to** landing page | SaaS app UI. **Check** `linearGradient` stop-opacity from <= 0.7 to 0; or fill-opacity <= 0.2. **Source** Untitled UI, Vercel, Kestrel [M]

- **RULE [PUI-40]** Annotate one thing per chart: a marker + guide + tooltip on the story point. Kestrel: dip band red at 6% opacity, dashed guide `2 3`, marker r4.5 white fill with a 2 px red stroke, tooltip 26 px r8. Ramp: vertical crosshair, ring dot on the line, dark date pill plus a white breakdown card (series dots + values). AlignUI Pro finance: black price pill with a dot.
  **Why** One annotation turns a picture of data into an explained event; two or more compete.
  **Applies to** landing page. **Check** count of markers/tooltips per chart <= 1 (plus a band is allowed). **Source** Kestrel [K]; Ramp reporting, AlignUI Pro [V]

- **RULE [PUI-41]** Show previous period as a dashed grey line and forecast as a dotted line: Kestrel dashed `3 4` at 1.25 px #bdbdbd; Untitled UI uses `0.1px 8px` round-cap dots (a dotted line).
  **Why** Comparison and forecast are the two commonest stories; a lighter dashed style says "not the main series" without a legend lookup.
  **Applies to** landing page | SaaS app UI. **Check** comparison series has dasharray and a lighter colour than the focal series. **Source** Untitled UI, Kestrel [M]

- **RULE [PUI-42]** Stack bars with 1 px page-colour gaps and top-rounded segments, and use at most 3 semantic colours (Attio: #266df0 / #f5a300 / #ff5454 with white gaps, top corners rounded, legend swatches rounded squares at the top centre).
  **Why** Gaps keep segments separable without outlines; three colours map to healthy / watch / risk.
  **Applies to** SaaS app UI | landing page. **Check** stacked series <= 3 colours; gap 1 px. **Source** Attio chart (SVG 453x199) [M]

- **RULE [PUI-43]** Never ship a rainbow chart (PostHog's 50-series stacked area on Product Analytics is the counter-example) and never plot more than the story needs.
  **Why** More than 3-4 hues loses the legend and the point; it signals a screenshot, not a designed visual.
  **Applies to** landing page. **Check** distinct series colours <= 4. **Source** posthog.com/product-analytics [V]

- **RULE [PUI-44]** Make the chart 130-240 px high inside a card with the title on the left and legend or range control on the right (Kestrel 132, Attio 199, Vercel 222, Untitled UI 240), legend text 11-12 px with 8-12 px swatches.
  **Why** Those heights fit two or three charts per window; the right-aligned control row uses the same ladder as the rest.
  **Applies to** landing page | SaaS app UI. **Check** chart svg height 130-240; legend fontSize 11-12. **Source** Kestrel, Attio, Vercel, Untitled UI [M]

### 2.5 Believable sample data

- **RULE [PUI-45]** Label sample data in the UI itself, once, quietly: PostHog's AI panel carries a "Sample data" tag; Kestrel's sidebar says "Sample workspace"; use a fictional workspace (Attio: Basepoint; Kestrel: Northwind).
  **Why** It keeps the page honest with the engine's no-invented-proof rule and costs one 11 px string.
  **Applies to** landing page. **Check** frame contains a visible "sample" label; no real customer name presented as a customer. **Source** PostHog, Kestrel [V][K]

- **RULE [PUI-46]** Make every displayed total, percentage and count reconcile. Good: AlignUI Pro sales dashboard channels $52.12 + $38.45 + $37.75 = $128.32 = headline; funnel 649 / 3,842 = 16.9% = headline; device split 27 + 12 + 61 = 100%. Bad: AlignUI Pro finance spend 900 + 600 + 200 = 1,700 vs headline $1,800; Vercel "21,0124"; Commslayer tabs "Mine 10 / All 8".
  **Why** Viewers check the first sum they see; one mismatch undoes the believability the rest of the frame earned.
  **Applies to** landing page | SaaS app UI. **Check** script: parse each card's parts and total; difference 0. **Source** pro.alignui.com templates, Vercel, Commslayer [V]

- **RULE [PUI-47]** Order times and clocks coherently and use real formats: Commslayer thread 9:14 AM -> 9:21 AM -> 9:24 AM -> "2 minutes ago" and "Jul 28, 2026"; Linear "2min ago / 4 min ago / just now" with pager "1 / 84"; Ramp "Mar 12, 2026"; the Raycast OS clock (9:41 AM) contradicting "Copied Today, 13:35:07" is the slip to avoid.
  **Why** Timestamps are the cheapest realism cue and the easiest to get out of order.
  **Applies to** landing page. **Check** extract timestamps; ascending order within a thread; none later than the displayed "now". **Source** Commslayer, Linear, Ramp, Raycast [V]

- **RULE [PUI-48]** Name people and records the way the product would: person + role line (Attio "Dylan Parker, CEO of Basepoint", "Annie Zhang, Product Manager at GreenLeaf"), ticket "Where is my order? #1042", issue ID DRV-8852, branch `ride/drv-364-reset-dimmed-rows`, "Opus 5" model badge at 11 px.
  **Why** Specific noun-level detail is what separates a believable screen from lorem ipsum.
  **Applies to** landing page. **Check** frame contains >= 3 specific identifiers (names with roles, IDs, branches, amounts with units). **Source** Attio, Commslayer, Linear [M]

- **RULE [PUI-49]** Truncate at least one long string with an ellipsis and let one row run into a fade: Attio "Last intera...", Commslayer "Hannah Bro... <hannah.brooks@gmail.c...", "hannah.brooks@gm...".
  **Why** Real UIs truncate; perfect strings look hand-set.
  **Applies to** landing page. **Check** frame has >= 1 element with `text-overflow: ellipsis` or clipped text. **Source** Attio, Commslayer [V]

- **RULE [PUI-50]** Format numbers like finance UI: tabular figures, thousands separators, currency with two decimals, deltas with a sign, arrow and unit (Kestrel "-3.1 pts", Vercel 421,124 / 185ms, AlignUI "+4.5%", Ramp "$166,585.88").
  **Why** Stable digit widths and signs make columns scan; unitless deltas read as decoration.
  **Applies to** landing page | SaaS app UI. **Check** computed `font-variant-numeric: tabular-nums` on KPI and table numbers; deltas carry a unit. **Source** Vercel, AlignUI Pro, Ramp, Kestrel [M][V]

## 3. Numbers & scales

### 3.1 Method and caveats

Chromium 1440x900, DPR 2, scrolled to trigger lazy content, cookie banners rejected where offered. A detector finds app-window frames (radius >= 6, >= 20 descendants, >= 6 text nodes) then reads computed styles on every descendant. `offsetHeight` is used so CSS scale transforms do not shrink sizes (Attio 0.995, Mercury and Stripe visuals are scaled internally and report rendered type of 8-10 px). Not measurable: Ramp, Untitled UI home, Mercury home, Vercel home, AlignUI Pro template pictures (raster/video) and Stripe/PostHog hover states; tooltips on Vercel and Untitled UI charts could not be triggered. `tailwindcss.com/plus` redirects to a login; `catalyst.tailwindui.com` (public Catalyst kit page) was measured instead. `untitledui.com/react/components/dashboards` returned no DOM frame.

Product visual type by site: **DOM** Linear, Attio, Commslayer, Cal, Raycast, Resend (code editors), Catalyst, AlignUI home (code + form), Vercel observability (SVG charts), Untitled UI charts (SVG), Stripe (DOM, scaled), Mercury spend (DOM, scaled), PostHog hero (DOM window). **Raster/video** Ramp, Untitled UI home, Mercury home, Vercel home, AlignUI Pro templates, PostHog product-analytics chart.

### 3.2 Radius ladder by control height (px; "pill" = fully rounded)

| element height | Linear | Attio | Commslayer | Raycast | Cal | Vercel obs | Catalyst | AlignUI (page / kit [S]) | Kestrel [K] |
|---|---|---|---|---|---|---|---|---|---|
| 16-18 | 18 r4 badge | 18 r5 / 16 r4.8 mini | 16 r4 kbd | | | 16 r4 error pill; 18 r4 code chip | | pill badges 16 / 16 | 18 r4 kbd; 18 r8 delta; 18 pill AI tag |
| 20-24 | 24 pill chips; 24 r4 code | 20 r6 kbd; 22 r7 score; 24 r8 date tile | 20 r8 count; 24 r8 filter chips | 21 r4 kbd | 17-24 pill | 24 r2 | 24 r6 badge | 20 r4 kbd / tag 24 r6 | 24 r8 icon |
| 26-28 | 28 r8 sidebar + buttons (x12); 28 pill icon buttons (x11) | 28 r8 (x5-9); 28 r9 nav active | 28 r8 (x59); 28 pill | 26 r6 tooltip | 28 r6 duration items | 26 r4 legend group | | 28 r6 segmented item / 28 r8 xxsmall button | 26 r8 tooltip; 28 r8 range items |
| 32 | | | | 32 r6 dropdown; 32 r10 sidebar item | | 32 r4-6 | | 32 r9 (x10) / 32 r8 | 32 r8 search + sidebar; 32 r12 (range track, share, buttons) |
| 36-40 | | 36 r12 company chips | 36-40 r8 (x10) | 40 r6 list row | 36 container r10; 40 r12 list buttons | | 36 r8 button | 40 r10 / 40 r10 input + button | 36 r12 input; 36 r16 bubble |
| 54-64 | | | 54 r8 stat tile; 62 r12 bubble; 64 r8 side card | 54 r12 dock tile (active r16) | | | | | |
| cards 97+ | 6-9 | 97 r12 | r12 | | r12 | r12 | | | r16 |
| window / frame | frame 12 (pad 8) | 16 (pad 0/6/6) | 16 | 12 in 19 (pad 8); AI window 26 | 12-16 | 16 | 12 | 20 in 28 (pad 10) | 16 in 22 (pad 6) |

Radius steps in use per site: Linear 4/8/12 (+ 2, 5, 6, 9); Attio 4.8-5/6/8/9/10/12/14/16 (12 distinct values in the app window); Commslayer 4/8/12/16; Raycast 4/6/10/12/16/19/20/26; Vercel 4/6/12/16; Cal 6/10/12/16; Catalyst 6/8/12; AlignUI page 9/10/16/20/28; Kestrel 4/8/12/16/22. Most-common peer rung by element height: <= 24 -> 4-8, 28 -> 8, 32 -> 6-10, 36-40 -> 6-12, 54-64 -> 8-12, cards -> 12, windows -> 12-19, hero frames 16-28.

### 3.3 Frame recipes

| site | outer r | padding | edge | shadow / depth | inner r | crop / fade |
|---|---|---|---|---|---|---|
| Kestrel [K] | 22 | 6 | white 55% + blur | ring 6% + `0 2 4` 3% + `0 24 56 -20` 16% | 16 + ring 6% | runs off fold, 69% visible |
| Linear | 12 on #090a0b | 8 | none (inner panels 1 px white 5-8%) | none on frame; chat panel `0 2 32` 25% | 8 | 51% visible; section clips |
| Attio | 16, bg 80% + blur(12) | 0/6/6 (chrome row on top) | ring 6% | 5 layers: ring + 1/3/8/16 px offsets (blur 2/6/14/28, alpha .024-.04) | 10-12 | scale 0.95 -> 1; 51% visible |
| Raycast | 19, black 44% + blur(2) | 8 | 1 px white 8% + inset 0.5 px white 30% | glow `0 0 40 20` white 3% + radial tint | 12 | window floats on wallpaper |
| Commslayer | 16, bg #f1f1f1 | 8 page gutter | none | 5+ layers, each <= 0.03 | 8-12 | 48% visible |
| Vercel | 16, bg #fafafa | 0 | ring 8% + 1 px inset highlight #fafafa | none | 12 | bottom fade 89 px to #fafafa |
| Resend | 24 | 0 | 1 px rgba(214,235,253,0.19) | none | 4-8 | top 24 px + bottom 52 px black fade; 1 px gradient hairlines |
| AlignUI home | 28, bg #f7f7f7 | 10 | ring 1 px #e0e0e0 | none | 20 | gradient to bg at 65% |
| AlignUI Pro tray | 16 wrapper #e6e6e6 around raster | 0 | none | picture holds dashboard (window ~28) | n/a | 1600x1200 PNG at 664 wide (2.41x) |
| Ramp | 12 | 0 | 1 px rgba(33,33,33,0.1) | none | 12 (video) | window + phone + card overlay; 74% visible |
| Untitled UI home | 8 | 0 | 1 px #d4d4d4 on #f5f5f5 | none | 8 (png) | 3024x2016 at 1080 wide (2.8x) |
| PostHog | 20, bg 75% + blur(64) | 0 | none | `0 4 6 -1` 10% | 4 | cartoon OS window |

### 3.4 Dashboard component spec (recommended numbers, with measured support)

Recommended values are inside the measured peer range; where Kestrel differs it is shown in the last column for comparison, not as a correction.

| component | recommended | measured support | Kestrel [K] |
|---|---|---|---|
| sidebar item | h28-32, r8, px8, gap 6-8, 13-14/500, 1-2 px between items | Linear 28/8/px7/gap 8/13 510/2 px; Attio 28/8-9/px8/gap 6/14 500/1 px; Commslayer 28/8/px8/gap 8/14; Raycast 32/10/px12/13 | 32/8/px8/gap 8/13 500 (matches) |
| section label | 11-12/500, tertiary grey, 24 px row | Linear 12/510 #62666d on 24 px | 11/500 (matches) |
| segmented control | container r10 / pad 4; items 28 r6; 14/500 | Cal; AlignUI kit [S] | 32 / r12 / pad 2; items 28 r8 / 12 500 |
| icon button | = neighbour height; circle or r8, one per cluster | Linear 28 circles; Raycast dock 54 r12 | 32 r12 (same as buttons) |
| KPI / summary card | r12 in r16 window, pad 10-16, 1 px 5% edge, label 12/500 secondary, value 14-22/500-600 | Attio 97 high, pad 10x12, border 5%; Commslayer stat tile 54 r8 with 1 px state-colour border, label 11, value 14 | r16, pad 14, ring 7%, label 12/500, value 22/550 |
| delta badge | h16-24, r4-8 or pill, 11-12/500-600, tinted fill + dark text, arrow 11 px | Catalyst 24/6 12/500; Commslayer 20/8 12/500; Attio 22/7; Vercel 16/4 | 18/8, 11/550 (matches) |
| chart card | r12-16, pad 16-24, title 13-14/500-600 left, legend or range right, chart 130-240 high | Vercel frame r16; Kestrel; Untitled UI 240; Attio 199 | r16, pad 16, title 13/550, chart 132 |
| tooltip | h24-26, r6-8, px8, 12-14/500, 1 px edge, <= 1 soft shadow | Raycast 26/6/px8 14/500 | 26/8, 11-12 px (matches) |
| AI panel / bubble | panel r12 with 1 px edge; header 48; bubble r12-16, pad 12x16, 13-14 / 1.4-1.55; result card r6, pad 11; chips 24 pill | Linear panel 400x520 r12; Commslayer bubble r12 | bubble r16 (br6), 13 px; no process line |
| buttons (in-app) | h28-32, r8-10, 13-14/500-600 | Linear/Attio/Commslayer 28/8; Catalyst 36/8; Raycast 32/10 | 32/12, 12/550 |
| inputs | h32-40, r8-10, 1 px ring | Linear composer 94/r8/pad 10; AlignUI kit 40/10, 36/8, 32/8 [S] | 36/12, 12 px |
| keycap | h16-21, r4-6, 10-11/600 | Raycast 21/4; Attio 20/6; Commslayer 16/4 | 18/4, 10 px |

### 3.5 Type, colour, spacing and density per window

| window | size (px) | DOM els | els per 100k px^2 | font sizes | weights | text colours | bg colours | radii (distinct) |
|---|---|---|---|---|---|---|---|---|
| Linear app | 1320x720 | 301 | 31.7 | 7 (10-20) | 400/500/510/590 | 8 | 12 | 7 |
| Attio app | 1080x619 | 228 | 34.1 | 6 (11-20) | 500/600 | 4 | 13 | 12 |
| Attio record | 1149x460 | 201 | 38.0 | 5 | 500/600 | 7 | 8 | 5 |
| Commslayer helpdesk | 1368x660 | 734 | 81.3 | 10 (6-20) | 400-700 | 16 | 28 | 7 |
| Raycast clipboard | 1204x740 | 476 | 53.4 | 6 (11-32) | 400/500/600 | 3 | 13 | 11 |
| AlignUI form preview | 1004x620 | 263 | 42.3 | 3 | 400/500 | 13 | 12 | 5 |
| Resend | 1024x598 | 212 | 34.6 | 2 | 400 | 7 | 1 | 3 |
| Cal booking | 1176x700 | 332 | 40.3 | 5 | 300-600 | n/a | n/a | n/a |
| Vercel obs chart | 1392x444 | 61 | 9.9 | 4 | 400/500 | 4 | 6 | 2 |
| Kestrel [K] | 1136x612 | 146 | 21.0 | 6 (10-22) | 400/500/550/600 | 7 | 12 | 5 |

Gap scale (count of flex/grid gaps): Linear 8 x 28, 6 x 24, 4 x 9, 2 x 6; Attio 6 x 22, 4 x 12, 8 x 11, 1 x 10; Commslayer 4/8/2/12/16/6; Raycast 10/8/2/12/6; Kestrel 8 x 17, 6 x 5, 2 x 4, 10 x 2, 12 x 1.

### 3.6 Chart craft (measured SVG)

| chart | line / bar stroke | grid | axis text | fill | notes |
|---|---|---|---|---|---|
| Kestrel [K] | 2 px #335cff, comparison 1.25 px #bdbdbd dash `3 4` | 4 x 1 px #f0f0f0 | 10/400 #737373 | `#335cff 0.16 -> 0`; dip band #e5484d 6% | marker r4.5 white / 2 px red; pulse r9; tooltip 26/r8 |
| Untitled UI line | 2 px x 3 series (#7f56d9, #b692f6, #6941c6) | 5 x 1 px lab(96.5) | 12/400 #666; axis title 12/500 | gradient `5%: 0.7 -> 95%: 0` | dotted `0.1px 8px` for reference line; bar variant fills #7f56d9 / #9e77ed / light |
| Vercel observability | 2 px blue #0070f3, amber #ffb224, red #e5484d; 1 px edges | 1 px rgba(0,0,0,0.08) | 11/400 #4d4d4d | flat tint under lines (step area) | 3 series max; segmented chart-type control 26 high |
| Attio bars | 5 stacked bars, fills #266df0 / #f5a300 / #ff5454 | dashed 1 px `4 4` | 14 px black 40-55% | n/a | white 1 px gaps, top radius, legend top centre |
| Ramp (raster) | blue + green stacked areas with line | n/a | ~11 px | translucent | crosshair + dot + 2-part tooltip [V] |
| AlignUI Pro (raster) | orange 2 px line, stacked areas, heatmap, radar | light grid | ~10 px | flat light | black pill tooltip [V] |
| PostHog | 2 px / 4 px | grey | 10-12 | 50 colours | counter-example [V] |

### 3.7 Raster density

| site | rendered | natural | density |
|---|---|---|---|
| Untitled UI home | 1080x721 | 3024x2016 | 2.80x |
| Mercury tile | 496x620 | 1376x1720 | 2.77x |
| Mercury tile | 496x331 | 1320x880 | 2.66x |
| Mercury wide | 1024x512 | 1440x720 | 1.41x |
| AlignUI Pro template | 664x498 | 1600x1200 | 2.41x |
| Vercel home | 921x486 | 950x500 | 1.03x |
| Attio tile | 695x429 | 522x326 | 0.75x (soft, background use) |

## 4. Dos and Don'ts

- **Do** build the window from real nested radii: 22 / 6 / 16 (Kestrel), 19 / 8 / 12 (Raycast), 16 / 6 / 10-12 (Attio). **Don't** put r16 cards inside r16 windows without writing it as an owned decision (peers use window - 4).
- **Do** keep a row of controls at one height with centred text (Linear header 28 x 28 icon + 28 buttons; Cal duration items all 28). **Don't** mix 28 / 32 / 36 in one row.
- **Do** end a crop with a gradient to the page colour (Vercel 89 px, AlignUI 65%). **Don't** cut a window flat at the section edge or leave a band because the gradient end differs from the background.
- **Do** make the chart tell one story with one marker and tooltip (Ramp crosshair + 2-part tooltip; Kestrel dip). **Don't** annotate three things or plot 50 series (PostHog).
- **Do** use neutral edges (1 px 6-8% black or 8-12% white). **Don't** outline selected cards in the accent colour.
- **Do** reconcile every sum (AlignUI Pro sales: $52.12 + $38.45 + $37.75 = $128.32). **Don't** ship $900 + $600 + $200 = $1,800 (AlignUI Pro finance) or "21,0124" (Vercel).
- **Do** export raster product shots at >= 2x. **Don't** reuse a 1x webp inside a r16 wrapper (Vercel home at 1.03x looks soft next to its live SVG charts).
- **Do** show the AI working (Linear "Worked for 10 sec", result card, branch in mono). **Don't** stop at a bubble and a button.

## 5. Exceptions & judgement calls

- `[engine note]` **Kestrel's ladder is owned, not measured wrong.** Founder-accepted values (items/badges/segments 8, 32 px controls 12, cards 16, app 16, frame 22) include two points that sit outside the peer ranges: 32 px controls at r12 (0.375 x height; peers 0.22-0.31) and cards at the window radius (16/16; peers window - 4). Do not change either without a founder verdict. If a verdict ever asks for "tighter", the measured peer values are 32 -> 8-10 and card 12 (window 16).
- `[engine note]` **Density is the one lever Kestrel can pull without touching radius or type**: 21 elements per 100k px^2 against 32-81 for peers. Add rows (a longer sidebar, a table tail, more KPI metadata) rather than larger type. The founder's "nothing cramped" rule caps this at about 35-40.
- `[engine note]` **Weights**: Kestrel's 400/500/550/600 is one weight above the peers' ceiling of three. 550 is the engine's brand weight in headings; for product text consider 500 + 600 (Attio) but this is taste, not a rule that overrides the shipped look.
- `[engine note]` **Real brand logos inside fake UI** (Mercury rows show Uber, Doordash, Walmart; Commslayer shows Shopify, Instagram; Raycast shows Linear and GitHub marks) raise believability but collide with the engine's no-invented-proof rule only if presented as customers. Prefer fictional merchants or generic glyphs unless the logos are integrations the product genuinely lists.
- Dark vs light: peers split. Dark windows (Linear, Raycast) use white-alpha edges and fills (4-12%), light windows use black-alpha rings (5-8%). The recipe is the same; only the alpha base flips.
- Scaling a built UI inside a frame is acceptable for fragments (Stripe, Mercury) and risky for the focal window; Attio's 0.95 -> 1 scale is the safe version.
- A raster hero is legitimate (Ramp, Untitled UI, AlignUI Pro) but it forfeits measurement, hover states and theming; the engine's default stays real DOM for hero concepts.
- AlignUI Pro's dashboards are raster pictures, so their radii cannot be measured here; they were read visually and cross-checked against the open-source kit values in `alignui-system.md` (button/input 40-32 high at r10-8, segmented r10/28/r6, tag 24/r6, kbd 20/r4).

## 6. Figures worth keeping

All paths are under `knowledge/benchmarks/product-ui/`.
- `linear-frame0.png`: dark app window with a floating AI chat panel (process line, result card, mono branch). `linear-ai-frame2.png`: cropped fragments faded by SVG masks.
- `attio-frame0.png`, `attio-frame5.png`, `attio-frame4.png`: app window with quick actions, record page with highlight cards, stacked-bar chart.
- `commslayer-frame2.png`: densest believable helpdesk (81 elements per 100k px^2).
- `raycast-frame0.png`, `raycast-frame1.png`: command palette with keycaps and a dock; AI chat with tool rows.
- `vercel-obs-frame0.png`, `vercel-obs-frame1.png`: step-area and line charts with legends and tables. `untitledui-charts-frame0.png`: Untitled UI line chart.
- `cal-frame2.png`, `cal-frame4.png`: booking widget with segmented duration control.
- `tailwind-catalyst-frame0.png`: Catalyst table with badges and buttons.
- `alignui-frame1.png`, `alignui-frame4.png`: code + live preview windows with the 28 / 10 / 20 frame. `apro-sales-frame2.png`, `apro-finance-frame2.png`, `apro-hr-frame3.png`, `apro-ai-frame2.png`: AlignUI Pro raster dashboards in a r16 grey tray (note the finance sum slip).
- `raster-ramp-1.png`, `raster-ramp-8.png`, `raster-untitledui-0.png`, `raster-mercury-22.png`, `mercury-spend-frame6.png`: raster/video wrappers, overlays, blurred trailing rows.
- `resend-frame6.png`, `stripe-frame2.png`, `stripe-billing-frame0.png`, `posthog-frame0.png`, `posthog-pa-frame0.png`: code window with fades, scaled Connect dashboard, scaled checkout, PostHog AI panel with "Sample data" and its rainbow chart.
- `kestrel-frame0.png`: the baseline measured with the same probe.
- Site first-fold shots: `<site>.png` for alignui, untitledui, linear, attio, vercel, stripe, ramp, mercury, posthog, cal, resend, raycast, commslayer.

## 7. Open questions

- AlignUI Pro and Untitled UI dashboards (the actual templates) are gated or raster; their radius ladders are read visually, not measured. A paid-template DOM inspection would settle whether their cards are r12 or r16 inside a r28 window.
- Hover and animation states (chart tooltips on Vercel, Untitled UI Recharts, Ramp) were not triggered; tooltip numbers rest on Raycast DOM and AlignUI kit values.
- Attio's hero frame was scaled 0.995 at measurement and animating (typed text); its control sizes are layout px and should be treated as +/- 1.
- Element count per area is a proxy for density; a pixel-level ink-coverage metric would be better and would need a screenshot analysis step (no image library was available in this environment).
- Whether Kestrel's r12 on 32 px controls reads as "softer" or "off-system" next to peers is a taste call for the founder; the data only says it is outside the 0.22-0.31 band.
- `ledger`-style verdicts on these rules do not exist yet; none of the rules here has been tested against a founder reject beyond the Kestrel accept.
