---
source: web:x.com/_heyrico (via api.fxtwitter.com mirror, 298 media posts Jun-Oct 2026, top 100 by likes studied) + acedesign.io (his studio site, Framer)
chapter: Product UI craft of @_heyrico (rico, Ace Studio): light and dark app systems, components, bento/zoom compositions, motion
pages: n/a (web; images read from pbs.twimg.com originals, 2 videos, Playwright shots of acedesign.io at 1440x900 DPR 2)
topic_tags: [product-ui, saas-app, dashboard, dark-mode, light-mode, typography, radius, spacing, icons, tables, charts, composer, modal, onboarding, settings, ai-agent-ui, bento, zoom-crop, glass-icons, motion, benchmark, heyrico]
status: studied
---

# @_heyrico product design: a calm, tokenised, AI-agent product UI system

Credit: all work studied here is by **rico (@_heyrico)**, founder of the product design studio **Ace Studio / acedesign.io** ("agentic product design agency"; bio lists clients ClickUp, Langdock, Blackbox AI, Twin). Name shown inside his own mock-ups: "Rico Oktananda" (not independently confirmed). We study it; we do not claim it. Much of what he posts is concept or case-study UI for AI/agent products (Alpaca, Marketer, Twin, Langdock, "Acme" CRMs and analytics); treat it as portfolio work, not shipped products.

Evidence tags: **[T]** = numbers he states himself in a post's text (his "cheatsheets"); **[V]** = read visually from the original image; `~` = approximate value read from an image, never measured in a DOM. Post keys are X status IDs (`x.com/_heyrico/status/<id>`); local copies are in `knowledge/benchmarks/heyrico/` (section 6).

## 1. Core ideas

1. **Very small vocabulary, applied with total consistency.** Six type sizes (12/13/14/16/18/24), two weights (regular + medium, semibold only for metric figures), a three-step grey text ramp, four radii, a handful of control heights. The richness comes from content and layout, not extra styles. He publishes the system himself in repeated "cheatsheet" posts (e.g. status/2079628240944263565, 2082504442067538074, 2063998746757886299). [T]
2. **Tight tracking on small text, not just on headlines.** -0.15px letter spacing on 13-16px UI type is in nearly every spec ("-0.15px", once "-0.31px across the board", "-0.1px" on 18px metrics). The whole UI reads as one compact, slightly condensed voice. [T]
3. **Neutral canvas, one accent hue, colour only where it carries meaning.** Apps are white/#FCFCFC (light) or #1C1C1C (dark) with grey text; blue (#0077E6-class) is the only interactive accent; semantic green/red/orange appear only in deltas, status chips and meter ticks. The "Wireframe -> Design" pair shows the recipe: same layout, only data viz and depth are coloured (status/2066197488437219378). [V][T]
4. **Hairlines and rings, not shadows and fills.** Surfaces are separated by 1px near-invisible borders (#F2F2F2 light, white at 4% dark) and 1px rings on controls; selected states are a faint filled pill (#F5F5F5/#EDEDED light, #212121 dark). Depth is quiet. [T][V]
5. **Product UI is presented as a zoomed, cropped window.** The window runs off the right and bottom edge of a soft canvas, the last row is blurred/faded, so type is 2-3x bigger than real and legible in a feed. One component or one idea per frame, 2-4 frames per post. [V]
6. **AI/agent products are drawn as legible workflows**: "Worked for 3m38s", "Thought for 4 seconds", source chips, step checklists with Dismiss / Edit / Approve & Run, model + tier chips ("Opus 4.7 Max"), segmented usage meters. The agent shows its work and keeps a human decision at the end ("the agent handles the heavy work, the interface makes every decision clear, the user stays in control", status/2085402030408126506). [V][T]
7. **Delight is concentrated in a few owned assets**: painterly photo backdrops behind dark windows, glossy glass tool icons, illustrated flat avatars, pixel-mosaic agent orbs, blurred macro-flower tiles with floating UI chips, tinted gradient modal headers. Everything else stays grey and quiet. [V]
8. **Every screen exists in light and dark with identical structure** (Alpaca mobile pair, Marketer analytics/campaign light+dark, Twin beige). Dark is #1C1C1C with a lighter charcoal canvas; light is white with a grey or beige canvas. [V]
9. **Two registers.** His product UI is calm, light, Inter/SF Pro. His own studio site (acedesign.io) is a different language: black, lime accent, condensed all-caps display, mono index labels, crop-mark ticks, stair-step stat blocks, a dithered globe. He does not mix them. [V]
10. **Motion in his videos is functional**: an accordion expands a permissions panel (height + fade, meta text flips "Synced 11 minutes ago" -> "just now"), a dashboard enters edit mode (drag handles, lifted card with blue outline, dashed drop slot). No decorative loops. [V]

## 2. Rules

Format note: each rule is imperative; numbers marked [T] come from his own spec posts, `~` from image reading.

### 2.1 Typography

- **RULE [HR-01]** Use two weights only in the app: 400 for body and 500 for titles, labels and emphasis; allow 600 only on large metric figures (18/24 "Semi Bold").
  **Why** A two-weight system gets hierarchy from size, colour and position, which keeps dense UI calm and consistent.
  **Applies to** SaaS app UI. **Check** computed font-weight across the app view is in {400, 500} plus 600 only on KPI values. **Source** status/2076714283396964475, status/2085041405643395353 [T]

- **RULE [HR-02]** Limit the in-app type scale to six sizes: 12, 13, 14, 16, 18 and 24px (24 is the biggest, used for page or empty-state titles; 12 for labels and section headings).
  **Why** A closed scale makes every screen share rhythm and stops one-off sizes creeping in.
  **Applies to** SaaS app UI. **Check** distinct computed font-size values in the app window <= 7 and all within 12-24px. **Source** status/2063998746757886299, status/2079628240944263565 (12/13/14/24) [T]

- **RULE [HR-03]** Pick one base size per product: 13px with SF Pro, or 14px with Inter (12px base for very dense dashboards). Body copy sits at the base size, labels one step down, titles one or two steps up.
  **Why** A small base makes the UI feel professional and dense; two competing bases look unplanned.
  **Applies to** SaaS app UI. **Check** the modal computed font-size of text nodes in the window equals 13 or 14 (12 for dense). **Source** status/2063998746757886299 (13 base), status/2082504442067538074 (14 body), status/2075535595502481905 (12/14) [T]

- **RULE [HR-04]** Set line-heights as pairs: titles 16/20, labels 13/16 or 12/16, body 14/20 (reading paragraphs 14/21 or 16/26 in AI workspaces), KPI values 18/24, large page titles 24/32~.
  **Why** Fixed size/leading pairs keep row heights on the 4px grid and make list rows predictable.
  **Applies to** SaaS app UI. **Check** computed line-height in px equals the pair for each style; all line-heights are multiples of 2 or 4. **Source** status/2082504442067538074, status/2086890096599716108, status/2083629103228608517 [T]

- **RULE [HR-05]** Apply letter-spacing of -0.15px to 13-16px UI text (about -1%), -0.1px to 18px metric values, and 0 only in the densest 12-14px onboarding rows.
  **Why** Slight negative tracking on small grotesk text tightens word shapes and gives the "compact, crafted" look his UI is recognised for.
  **Applies to** all. **Check** computed letter-spacing on body/label text between -0.3px and 0 (not normal/0 everywhere). **Source** status/2079628240944263565, status/2063305931572871363, status/2085041405643395353 [T]

- **RULE [HR-06]** In warm or "human" themes pair one serif display face for object names and modal titles (Season Mix, ~18/24 Medium) with Inter for everything else; never use the serif for controls or table text.
  **Why** One editorial voice on names ("twin", "Share your Agent", "Slack Email Scanner") adds warmth without costing UI legibility.
  **Applies to** SaaS app UI. **Check** serif only on h1-h3-level elements and wordmark; body, labels, buttons are the sans. **Source** status/2083629103228608517 [T]; status/2083591876322759078 [V]

- **RULE [HR-07]** Use a mono face (DM Mono or similar) only for commands and code (14px), and for tiny uppercase status/meta labels ("IN PROGRESS", "OPEN", "OPTION 1", "43 files", "1023 rows"); never for headline numbers or body.
  **Why** Mono signals "system data" in small doses; used for numbers or paragraphs it makes the UI read as a terminal.
  **Applies to** SaaS app UI. **Check** font-family mono appears only on code blocks and meta tokens <= 13px. **Source** status/2086890096599716108 [T]; status/2098426606301917343, status/2104285452350185480 [V]

- **RULE [HR-08]** Write sidebar group labels ("Tools", "Pinned", "Recents", "Workspace") as 12-13px regular sentence case in the subtle grey, with ~24-32px above the label and ~8px below; no uppercase, no bold, no divider line.
  **Why** Quiet labels group items by whitespace and tone alone, so the nav stays light.
  **Applies to** SaaS app UI. **Check** label font-weight 400, text-transform none, colour = subtle token; gap above >= 2x the gap below. **Source** status/2079628240944263565 (alpaca-mobile-pair-light.jpg), status/2082504442067538074 [V]

- **RULE [HR-09]** Put the delta next to the KPI value on the same baseline (value 18/24 semibold, delta 12px green or red, e.g. "$168,920 +47%"); right-align money and counts in tables; keep currency regular weight.
  **Why** Value and change are read as one fact; right alignment lets columns compare at a glance.
  **Applies to** SaaS app UI. **Check** delta element shares a flex row with the value; numeric cells have text-align right and tabular-nums. **Source** status/2092649787183317491 (analytics-dark-full.jpg), status/2099121946437071193 (companies-database-table.jpg) [V]

### 2.2 Colour and surfaces

- **RULE [HR-10]** Use exactly three greys for text: strong #292929 (or #333333), default #5D5D5D (or #525252), subtle #7F7F7F (or #777777/#737373); placeholders go lighter (#9E9E9E to #C2C2C2). Never pure #000 for text.
  **Why** Three steps are enough to rank title / body / meta; more steps blur the ranking.
  **Applies to** SaaS app UI. **Check** distinct computed text colours in the window <= 5 (3 greys + placeholder + accent). **Source** status/2079628240944263565, status/2082504442067538074, status/2083629103228608517, status/2081394621775859863 [T]

- **RULE [HR-11]** Build the dark theme on #1C1C1C with selected rows at #212121, borders at white 4%, strong text #E5E5E5-#FFFFFF, default #EEEEEE-#E5E5E5, subtle #A1A1A1-#B5B5B5. Do not use pure black or pure white fills.
  **Why** A soft near-black with 4% hairlines keeps contrast low and surfaces separable without glow.
  **Applies to** SaaS app UI. **Check** window background luminance L* ~11-12; border rgba(255,255,255,0.04); no #000 surface. **Source** status/2063305931572871363, status/2063998746757886299 [T]

- **RULE [HR-12]** In light mode use only two surfaces, #FFFFFF and #FCFCFC (sidebar and page tray ~#FAFAFA), a selected/hover fill of #F5F5F5 (nav pill ~#EDEDED), and borders at #F2F2F2. A cool variant is #F6F8FA page, #EFF2F6 menu, #EBECF0 border, #434356 text, #838693 subtle.
  **Why** Surfaces within ~3% lightness read as one calm plane; hierarchy comes from hairlines rather than tinted boxes.
  **Applies to** SaaS app UI. **Check** distinct computed backgrounds in the app window <= 5, all L* >= 94. **Source** status/2065146307065643156, status/2074530933001310390, status/2066920244170674326 [T]

- **RULE [HR-13]** Make the sidebar one notch darker than the content surface (~#FAFAFA vs #FFFFFF) and separate them with a 1px hairline, with no shadow; in the dark theme use the same colour and rely on the hairline.
  **Why** A tonal step plus a hairline gives structure with zero visual weight.
  **Applies to** SaaS app UI. **Check** sidebar bg lighter/darker than main by 1-4% L*; border-right 1px; box-shadow none. **Source** status/2084686700647977333 (settings-profile.jpg), status/2082504442067538074 (shopify-app-detail-light.jpg) [V]

- **RULE [HR-14]** Allow one interactive accent hue (system blue: #0077E6 switches and bars, #0091FF links, #519DFA chart line, ~#0A84FF send button). Everything else interactive stays neutral (dark pill primary, grey ghost).
  **Why** A single accent makes "what is clickable or selected" unambiguous and keeps colour for meaning.
  **Applies to** SaaS app UI. **Check** only one chroma hue family among interactive states; semantic colours limited to status/delta/meters. **Source** status/2082504442067538074, status/2085041405643395353, status/2083629103228608517 [T]

- **RULE [HR-15]** Render status and category chips as tinted fill + saturated text of the same hue: 20px high, radius 6, e.g. badge #CAFACE fill / #15B042 text; tags 22px, 13/18 medium, #EFF6FF / #DBEAFE fill with #51A2FF text. On dark use a dark tinted fill with bright text.
  **Why** Tinted chips are legible at 13px and never shout like solid saturated pills in a table.
  **Applies to** SaaS app UI. **Check** chip height 20-22px, radius 6, fill L* >= 90 on light; text contrast >= 3:1. **Source** status/2082504442067538074, status/2081394621775859863 [T]; status/2094463741341659570 (campaign-table-dark.jpg) [V]

- **RULE [HR-16]** Keep charts monochrome (one blue) with a comparison line at lower opacity and, when a bar chart needs emphasis, colour one bar and add a black tooltip; leave the others in a pale neutral gradient.
  **Why** A single highlighted mark tells the story; multi-hue charts without meaning add noise.
  **Applies to** SaaS app UI. **Check** chart uses one series hue; at most one highlighted bar with tooltip. **Source** status/2085041405643395353 (#519DFA lines, #0077E6 bars) [T]; status/2066197488437219378 (wireframe-to-design-state.jpg) [V]

- **RULE [HR-17]** When a metric needs colour, use one hue per category on segmented tick meters or stacked proportion bars (one hue per metric, at most 6 hues in a view), with a matching coloured dot in the legend row and the count right-aligned.
  **Why** Colour-coded proportions need a legend adjacent to the number; dots + counts let the bar be decorative but still decodable.
  **Applies to** SaaS app UI. **Check** each bar segment has a legend dot of the same hue; <= 6 hues. **Source** status/2063305931572871363 (escalation-insight-dark-on-photo.jpg: Missing info 123 / Content gap 78 / Urgent 65 / AI needs help 54) [V]

### 2.3 Geometry: radius, heights, spacing, icons

- **RULE [HR-18]** Use a four-step radius ladder: 6px (badges, tags, filters, 24-28px controls), 8-10px (32px buttons, nav rows, inputs), 12-16px (cards, popovers), pill (primary CTA, composer chips, send button). Specific specs he posts: 6/8/12 dark, 8 nav + 16 cards + pill CTA, 10 buttons + 6 badges, 14 cards, stay inside 8-12 or 6-16.
  **Why** Radius that scales with element height gives consistent rounded-ness; stray radii read as default components.
  **Applies to** SaaS app UI. **Check** distinct border-radius values in the window <= 5; r <= 0.31 x height for rectangles. **Source** status/2079628240944263565, status/2063305931572871363, status/2082504442067538074, status/2076714283396964475, status/2077431252932858091 [T]

- **RULE [HR-19]** Fix control heights to a ladder: 24px (mini CTA), 28px (filters, dense sidebar rows), 32px (buttons, nav rows), 36px (form controls), 38px (composer/command bar), with rows at 36px (table cell), 40px (data row), 44px (list/store row).
  **Why** A short list of heights gives alignment across toolbars and makes dense tables comfortable.
  **Applies to** SaaS app UI. **Check** control heights in {24,28,32,36,38,40,44}; toolbar siblings share one height. **Source** status/2082504442067538074, status/2085041405643395353, status/2080367856370536879, status/2081394621775859863, status/2083629103228608517, status/2086890096599716108 [T]

- **RULE [HR-20]** Space cards with 16px side padding, fields 16px apart, sections 32px apart; inputs get 12px horizontal padding; nav rows use 8px padding and gap.
  **Why** 4px-grid multiples (8/12/16/32) make every module rhythmically related.
  **Applies to** SaaS app UI. **Check** computed padding/gap values are multiples of 4; card padding-inline 16. **Source** status/2085041405643395353, status/2083629103228608517, status/2080367856370536879 [T]

- **RULE [HR-21]** Choose one outline icon set (Nucleo at 1px, Huge Icons at 1.2-1.3px stroke) and keep stroke at 1-1.3px: 14px icons in navigation (against 13px labels), 16px in toolbars, 20px in cards; never mix filled and outlined in the same list.
  **Why** Thin strokes match small tight type; mixed weights make a nav look assembled from several kits.
  **Applies to** SaaS app UI. **Check** icon stroke-width 1-1.5 at 1x; one library; icon size 14/16/20. **Source** status/2079628240944263565, status/2063998746757886299, status/2066920244170674326, status/2075535595502481905 [T]

- **RULE [HR-22]** Draw navigation icons in the subtle grey, same colour as their label until the row is active; only third-party brand logos (16px favicon in rows, 28-40px white tile with ring in grids) and the glass tool icons carry full colour.
  **Why** Monochrome nav icons keep the sidebar quiet so colour marks content, not chrome.
  **Applies to** SaaS app UI. **Check** nav icon colour = text colour; coloured glyphs limited to logos/tool tiles. **Source** status/2082504442067538074, status/2083591876322759078 [V]

- **RULE [HR-23]** Centre icons optically on the label's x-height with a ~10px icon-to-label gap; in a 32px row both icon and label share one vertical centre line, and chevrons/selectors sit 8px from the label.
  **Why** Optical, not bounding-box, centring is what makes icon+text rows look machined.
  **Applies to** SaaS app UI. **Check** icon vertical centre within 1px of label x-height centre; consistent gap across all rows. **Source** status/2085041405643395353 (analytics-light-cropped-window.jpg) [V], gap `~`

### 2.4 Components

- **RULE [HR-24]** Make the primary button near-black (#292929-#1E1E1E, often with a faint top sheen), white 13-14px medium label, 32px high, radius 10 in app (full pill in modals and heroes); no hover lift, hover only deepens the fill.
  **Why** A dark neutral primary stays calm next to a blue-accent UI and survives light and dark themes by inversion.
  **Applies to** SaaS app UI. **Check** primary bg L* <= 20; height 32; radius 10 (app) or 999 (modal CTA). **Source** status/2082504442067538074 [T]; status/2097732283650523560 ("Continue" pill), status/2067985029079371862 (credits modal CTA) [V]

- **RULE [HR-25]** In dark UI invert the primary: white fill with dark 13px medium label (Launch ads, Save as report, Approve & Run), and keep secondary as a hairline ghost on #212121.
  **Why** Inverted contrast makes the one primary action the brightest thing in a dark window.
  **Applies to** SaaS app UI. **Check** exactly one white-filled button per toolbar; others transparent or #212121. **Source** status/2094463741341659570, status/2092649787183317491, status/2106398952572735689 [V]

- **RULE [HR-26]** Build secondary buttons as white, 1px hairline + 1px soft ring, 13px medium, icon (14px) + label, same height as neighbours; tertiary actions ("Dismiss", "Edit", "Copy", "Update") are borderless or ring-only and sit left of the primary.
  **Why** The ring-only secondary reads as a control without competing; the action order puts the primary last where the eye ends.
  **Applies to** SaaS app UI. **Check** secondary border colour <= 10% alpha; primary is the last/right-most action. **Source** status/2063305931572871363 (install-chrome-modal-glass-header.jpg, settings-profile.jpg) [V]

- **RULE [HR-27]** Make filter and selector chips 28px high, radius 6, 13/16 medium: leading icon (calendar, currency, channel) + label + up/down chevron glyph, all in one row with 8px gaps ("Last 30 days", "Compare", "USD", "All channels").
  **Why** Identical chips with the up/down selector glyph signal "opens a list", and one row keeps filters scannable.
  **Applies to** SaaS app UI. **Check** chips share height 28 and radius 6; chevron icon is the double-arrow selector. **Source** status/2085041405643395353 [T and V]

- **RULE [HR-28]** Structure the sidebar as: workspace switcher (20px logo tile r6 + name 14 medium + chevron + collapse icon), a bordered quick-actions field with the shortcut at the right ("Quick actions  ⌘K"), nav rows (32px, r8), muted group labels, and a footer with a "Getting started 1 of 5" progress card and "14 days left / Upgrade".
  **Why** This order puts identity, search, destinations and account status where users expect, and the footer converts without a banner.
  **Applies to** SaaS app UI. **Check** sidebar order matches; selected row full-width fill pill. **Source** status/2082504442067538074, status/2091147395539288221, status/2085041405643395353 [V]

- **RULE [HR-29]** Mark the active nav item with a full-width filled pill (#EDEDED light, #212121 dark, radius 8-10), same label weight and colour as other rows; no left bar, no bold, no accent colour.
  **Why** A tone-only state keeps the nav monochrome and avoids reflow from weight changes.
  **Applies to** SaaS app UI. **Check** active row differs from inactive only by background (and optionally icon colour). **Source** status/2080367856370536879 (#EDEDED, 10px) [T]; status/2063998746757886299 [V]

- **RULE [HR-30]** Offer an icon-rail variant for apps with many destinations: ~56px rail, 20px icons, active state a white tile with ring, workspace avatar on top, divider ticks between groups (hairline or dotted) and settings at the bottom.
  **Why** A rail frees width for the content and agent panel while keeping the same nav tokens.
  **Applies to** SaaS app UI. **Check** rail width ~56px, icons 20px, grouped by dividers. **Source** status/2099121946437071193 (coworker-empty-state.jpg, inbox-zero-painting-card.jpg) [V]

- **RULE [HR-31]** Use segmented tabs in a pale track with a white selected pill + ring, counts inline in muted text ("Critical 3  Medium 2  Low 1", "Tasks / Artifacts / Files"); table tabs use an underline with count chips (r6) for "Campaigns 12 / Ad sets 123 / Ads 123 / Rules 12".
  **Why** The track makes the set read as one control, and inline counts avoid separate badges.
  **Applies to** SaaS app UI. **Check** selected tab has white bg + ring in segmented form; counts in 12px subtle. **Source** status/2063305931572871363, status/2103469850463195623, status/2094463741341659570 [V]

- **RULE [HR-32]** Build data tables with: header row on #FAFAFA with 12-13px muted labels and sortable/add-column affordances; 40px rows with 1px hairlines; 12-16px checkboxes (r4) in the first column; entity cell = 16px logo + name; status as small glyph in its own column; links underlined in blue; tags tinted r6; money right-aligned; a footer row with the record count and column aggregates.
  **Why** Predictable columns with one glyph per concept make 15 rows scannable, and the aggregate footer shows the table is real.
  **Applies to** SaaS app UI. **Check** row height 36-40; checkbox 12-16px r4; footer row present. **Source** status/2081394621775859863 [T]; status/2099121946437071193 (companies-database-table.jpg) [V]

- **RULE [HR-33]** Design status as ring-and-fill glyphs (dashed ring = open, half-filled orange = in progress, solid green check = resolved, blue clock-ring = first call) paired with a label in lists and with a mono uppercase label in detail headers ("◐ IN PROGRESS").
  **Why** A glyph set carries state at 14px without colour-only reliance, and labels keep it accessible.
  **Applies to** SaaS app UI. **Check** each status has distinct shape and colour; label present in text. **Source** status/2098426606301917343 (crm-inbox-with-agent-panel.jpg), status/2099121946437071193 (inbox-zero-painting-card.jpg) [V]

- **RULE [HR-34]** Build KPI cards as: 12-13px muted label with a small leading icon (dashed underline when it has a definition), 18/24 semibold value, coloured delta beside it, and a small ghost spark-bar cluster at the bottom-right; radius 14, padding 16, hairline border.
  **Why** The label-value-delta-trend order is the shortest path to a number's meaning.
  **Applies to** SaaS app UI. **Check** KPI card padding 16; value font 18/24; delta in same row. **Source** status/2085041405643395353 [T and V]

- **RULE [HR-35]** Show limits and usage as segmented tick meters (24-30 ticks, ~4-6px wide, ~2px gaps, 16-24px tall) in the plan/model colour (orange for Claude, black for GPT, blue for plan limits) with "n / max" right-aligned; label + helper line to the left.
  **Why** Discrete ticks read as a countable quota and give the UI a signature texture a plain progress bar lacks.
  **Applies to** SaaS app UI. **Check** meter built from discrete ticks; right-aligned figure in tabular numerals. **Source** status/2097732283650523560 (inbox-opus-usage-bar.jpg), status/2084686700647977333 (settings-wallet-segmented-meters.jpg) [V]

- **RULE [HR-36]** Make switches 24x14px with a 10px thumb, blue (#0077E6) when on; place them in a row with a 13/14px medium label and a 12-13px subtle helper line beneath, the switch aligned right.
  **Why** A small switch with strong labelling keeps settings lists compact and scannable.
  **Applies to** SaaS app UI. **Check** switch 24x14; on-colour is the accent; helper text below label. **Source** status/2082504442067538074 [T]; status/2061402150056628542 (triggers-skills-toggles-dark.jpg) [V]

- **RULE [HR-37]** Build the AI composer as one large rounded container (radius ~20, white or #212121 with hairline), placeholder 14-16px in muted grey, and a bottom toolbar: 28-32px square icon buttons with a ring ("+", tools), a model chip (brand glyph + "Opus 4.7" + muted tier "Max") with a chevron, a mic icon and a circular send button (blue; pale blue when disabled).
  **Why** A single container with tool, model and send controls in one row makes the composer the unmistakable focal element of an agent product.
  **Applies to** SaaS app UI. **Check** composer radius >= 16; toolbar items share one centre line; send is a circle. **Source** status/2061402150056628542 (supercomputer-composer-dark.jpg), status/2065117631796154769 (composer-on-blue-wash.jpg) [V]

- **RULE [HR-38]** Below the composer add secondary rails: recommended prompts as arrow-prefixed 14px rows ("-> Help me choose a theme"), a "Connect your tools to Coworker" strip with a row of 16px logos, and three suggestion cards (icon + title + 12px subtitle, ~r16) for Create / Find / Research.
  **Why** Suggested next actions lower the blank-page problem without adding chrome around the input.
  **Applies to** SaaS app UI. **Check** suggestions sit below the composer and use the same card radius and padding. **Source** status/2099121946437071193 (coworker-empty-state.jpg), status/2061402150056628542 [V]

- **RULE [HR-39]** Style menus and pickers as floating cards (white, radius 16, ring + soft shadow) with a 12-13px muted heading ("Choose Agent"), 32-40px rows, hover/selected fill #F2F0EC-#F5F5F5, and trigger tokens as tinted pills in the item's own colour (/agent in pink).
  **Why** A heading + roomy rows make a picker legible at a glance; the tinted token links the typed command to its menu item.
  **Applies to** SaaS app UI. **Check** menu radius 12-16; row height >= 32; selected row filled. **Source** status/2067985029079371862 (slash-agent-menu-beige.jpg) [V]

- **RULE [HR-40]** Build integration/permission modals with a 90-130px gradient banner (blurred, grainy or photographic) holding two app icons joined by three dots, a centred 20px medium title, a subtle "by / Developed by" line, one inner bordered card for About + capability tags, and a full-width dark pill CTA; the × sits top-right on the banner.
  **Why** The two-icons-and-dots header tells the connection story in one glance and gives the modal its only colour.
  **Applies to** SaaS app UI. **Check** banner is the only coloured region; one primary CTA, full width. **Source** status/2099121946437071193 (install-chrome-modal-glass-header.jpg), acedesign.io/work/twin (Automate Slack modal) [V]

- **RULE [HR-41]** Build plan pickers as two side-by-side cards (selected = pale blue fill + 1px blue border; price as a small grey chip r6 at top-right; big figure "10,000" with a muted unit under), followed by a summary card of rows with 16px leading icons, right-aligned amounts and a total, and a full-width pill CTA that names the amount ("Confirm Upgrade - $90 Today").
  **Why** Showing the exact charge on the CTA and a line-item summary removes billing anxiety at the decision point.
  **Applies to** SaaS app UI. **Check** CTA label contains the amount; summary rows right-aligned. **Source** status/2067985029079371862 (credits-upgrade-modal.jpg) [V]

- **RULE [HR-42]** Draw chat as: user bubble dark (#333) radius ~16-18 with white 14px text, counterpart bubbles light grey (#F4F4F4), timestamps 12px muted outside the bubble, 24px illustrated avatars, and an activity line above the thread ("David is OPEN / Naruto assigned this to Rico").
  **Why** Dark vs light bubbles separate sides without alignment tricks; activity lines keep the CRM audit trail inline.
  **Applies to** SaaS app UI. **Check** only two bubble styles; timestamps outside bubbles. **Source** status/2098426606301917343 (crm-inbox-with-agent-panel.jpg) [V]

- **RULE [HR-43]** In an agent side panel show process as collapsible disclosure rows ("Worked for 3m38s", "Thought for 4 seconds"), source chips with 16px favicons ("Searched acedesign.io, LinkedIn, X ... 5+ more"), a step checklist with hollow circles, a result card with step count ("Run Creative Pipeline  7 steps"), and a footer of Dismiss (ghost) / Edit (ghost) / Approve & Run (primary).
  **Why** Visible work builds trust, and ending on a three-way decision keeps the user in control.
  **Applies to** SaaS app UI. **Check** panel has a disclosure, a checklist and a final action row with primary last. **Source** status/2106398952572735689 (orchestrator-split-panel-dark.jpg), status/2098426606301917343 [V]

- **RULE [HR-44]** Build onboarding as a two-pane card: left form column (~460px: 14px medium title, helper 13px muted, labelled fields 36px, chips with brand glyphs, "Skip for now" text, full-width Continue that is grey #EEE while disabled and near-black when valid) and right a live preview of the product skeleton that fills with the user's entries (name, logo, country).
  **Why** A live preview makes each answer visibly change the product, which raises completion and sets expectation.
  **Applies to** SaaS app UI. **Check** preview pane updates from form state; Continue changes from grey to dark on valid. **Source** status/2103521703762776474 (onboarding-create-workspace.jpg, onboarding-chip-survey.jpg) [V]

- **RULE [HR-45]** Lay out settings as: left nav with grouped muted labels and 32px rows, a content column ~740px wide centred in the pane, 1px-hairline cards (radius 12-16) with label-left / value-right rows, and a small ghost "Update" button top-right of the card.
  **Why** A narrow central column and uniform cards keep long settings pages readable and consistent.
  **Applies to** SaaS app UI. **Check** content max-width 700-780px; cards share border and radius. **Source** status/2084686700647977333 (settings-profile.jpg, settings-wallet-segmented-meters.jpg) [V]

- **RULE [HR-46]** Make empty states a small painted or photographic card with a UI skeleton overlaid (grey pills for rows, a "0" column) under a 16-18px medium title and a one-line quote in subtle grey; no clip-art illustrations.
  **Why** A real image with a faux-UI card makes "nothing here" feel designed and on-brand instead of apologetic.
  **Applies to** SaaS app UI. **Check** empty state uses art + skeleton; title 16-18px; one line of copy. **Source** status/2099121946437071193 (inbox-zero-painting-card.jpg) [V]

- **RULE [HR-47]** Identify people and agents with flat line-art illustrated portraits on saturated pastel circles (24-40px), and agent identities with pixel-mosaic orbs in four hues (pink, cyan, indigo, orange) that also tint the agent's name in menus.
  **Why** Illustrated avatars give a CRM or agent roster personality without photo noise and keep faces consistent in size and tone.
  **Applies to** SaaS app UI. **Check** avatars are one illustration style; orb hue matches the label colour. **Source** status/2098426606301917343, status/2099846465518805440 (chat-sidebar-agent-avatars.jpg), status/2073360693919883379 [V]

- **RULE [HR-48]** Give product areas glass app icons: glossy iridescent rounded squares (~20px in nav, ~100px in dock/tooltip zooms) with one hero hue per area (orange Campaign, blue-violet Creatives, teal Briefs, purple Workflows); on dark docks add a soft coloured glow halo.
  **Why** A small set of distinctive tiles gives navigation memorable landmarks while all other icons stay mono.
  **Applies to** SaaS app UI. **Check** glass tiles appear only for top-level product areas; <= 5 hues. **Source** status/2091147395539288221 (ace-sidebar-v-old.jpg, ace-sidebar-v-new-glass-dock.jpg) [V]

- **RULE [HR-49]** Teach interaction in static frames: a black arrow cursor with white outline, a hand cursor on rows, a black pill tooltip (r16 with a small arrow) beside docked icons, a grey row hover, and a lifted card with 1.5px accent outline over a dashed accent-tint drop slot.
  **Why** Cursor and tooltip cues make a still image read as a live product and show the affordance being demonstrated.
  **Applies to** landing page. **Check** at most one interaction cue per frame; cursor is black with white stroke. **Source** status/2091147395539288221, status/2083591876322759078, status/2091555578699186392 [V]

### 2.5 Presentation: windows, crops, canvas, bento

- **RULE [HR-50]** Present the product as a cropped window: let the window run off the right and bottom edge of the canvas, cut at a row boundary, and blur or fade the last row (e.g. the blurred "SPF 50 sunscreen" row) so the clip looks like a window, not a cut.
  **Why** Cropping enlarges the real UI so 12-14px type is legible in a feed, and the faded last row implies more content below.
  **Applies to** landing page. **Check** window extends past the canvas edge on >= 1 side; final visible row is faded. **Source** status/2085041405643395353 (analytics-light-cropped-window.jpg), status/2079628240944263565 (alpaca-mobile-pair-light.jpg) [V]

- **RULE [HR-51]** Crop to one component at 2-3x for zoom frames (sidebar, composer, toggle list, tooltip row, JSON card) on a tinted wash; show one idea per frame and 2-4 frames per carousel with the same canvas.
  **Why** One component per frame makes the craft detail the subject and keeps a carousel's rhythm.
  **Applies to** landing page. **Check** each frame contains one primary component; shared canvas colour across frames. **Source** status/2061402150056628542, status/2065117631796154769, status/2091147395539288221 [V]

- **RULE [HR-52]** Put light windows on a flat soft canvas (grey #D5D5D5-#F2F2F2, or warm beige #F2F0EC for editorial products) and dark windows on a lighter charcoal (#2B2B2B around a #1C1C1C window) or on a painterly twilight landscape photo; add a faint dot-matrix pixel fade along the top edge.
  **Why** A tonal backdrop frames the window without a shadow, and the pixel fade adds a texture signature.
  **Applies to** landing page. **Check** canvas differs from window by 6-15% L*; no drop shadow on the window. **Source** status/2092649787183317491 (analytics-dark-full.jpg), status/2063297379521229070 (ai-growth-report-dark-on-photo.jpg), status/2063305931572871363 [V]

- **RULE [HR-53]** Round the window to ~24-28px at the outer edge and nest cards inside at outer minus padding (~16-20px), with a 1px ring on the window and no shadow; place a macOS traffic-light + URL bar bezel only on browser-style shots.
  **Why** Concentric rounding and a ring give a clean, shadow-free window that sits flat on the canvas.
  **Applies to** landing page. **Check** window radius 20-28px; ring 1px at <= 8% alpha; box-shadow none. **Source** status/2085041405643395353, status/2097732283650523560 [V], radii `~`

- **RULE [HR-54]** Show before/after as two frames with identical layout captioned in mono ("Wireframe" / "Design"): the second adds only real data, one coloured data-viz layer, a lifted bar with tooltip, a dark primary and a branded upgrade card.
  **Why** Holding layout constant isolates the effect of craft decisions and makes the improvement obvious.
  **Applies to** landing page. **Check** layout grid identical; differences limited to colour, depth, content. **Source** status/2066197488437219378 (wireframe-state.jpg, wireframe-to-design-state.jpg) [V]

- **RULE [HR-55]** Compose a bento of five soft tiles (3-over-2, 3:2 ratio, radius ~28) each holding a blurred macro-photo with grain/dither and one to three floating white UI chips that overlap the tile edges and are cut by it ("Returns policy / Support playbook / https://conduit.ai-", message previews, "Refund request / Angry tone / VIP tickets").
  **Why** Soft imagery behind crisp UI chips makes abstract features tangible while keeping the grid calm.
  **Applies to** landing page. **Check** tiles equal size per row; chips overflow clipped by tile edge; one idea per tile. **Source** status/2090113322255622509 (micro-illustration-tiles.jpg) [V]

- **RULE [HR-56]** Fill sample UI with real brands and coherent data (Shopify, Slack, Notion, OpenAI, ClickUp; "$168,920" with +47% and -23% deltas; real-format domains and dates) and label it as sample when shipped.
  **Why** Real logos and consistent numbers sell believability; incoherent figures or lorem text break it.
  **Applies to** landing page. **Check** numbers add up; no lorem ipsum; brand logos match the story. **Source** status/2099121946437071193 (companies-database-table.jpg), status/2082504442067538074 [V]. Note: he uses lorem ipsum in a few agent-panel text blocks (orchestrator-split-panel-dark.jpg), which is the counter-example.

- **RULE [HR-57]** Ship every key screen in both light and dark with identical structure and a diff only in tokens; dark uses #1C1C1C window, 4% hairlines, a white primary; light uses white surfaces and a dark primary.
  **Why** Parity proves a token-driven system and lets the same asset serve both audiences.
  **Applies to** landing page. **Check** DOM/structure identical across themes; only colour tokens differ. **Source** status/2061402150056628542 vs status/2085041405643395353, status/2063998746757886299 vs status/2079628240944263565 [V]

### 2.6 Motion

- **RULE [HR-58]** Animate accordions inside one bordered container: the opened row reveals an inset panel (#F7F7F7, radius 12) with a height animation plus content fade, the chevron flips, the row hovers grey, and meta text updates ("Synced 11 minutes ago" -> "Synced just now").
  **Why** Height + fade inside a shared container feels like a single object revealing detail, and the state-text change proves the action happened.
  **Applies to** SaaS app UI. **Check** panel animates height not layout jumps; container border persists; ~250-400ms. **Source** status/2082904835385623012 (video-stores-f2-3/9/15.jpg) [V], timings `~` (video is 19s with several state changes)

- **RULE [HR-59]** Show edit mode on dashboards by revealing ⋮⋮ drag handles and × on every card, lifting the grabbed card with a 1.5px accent outline and larger shadow, and drawing a dashed accent-tinted slot where it will land; swap the cursor to a grab hand.
  **Why** Handles, a lifted card and a visible drop slot are the three cues that make drag-reorder predictable.
  **Applies to** SaaS app UI. **Check** edit mode adds handles; dragged card has outline; placeholder dashed. **Source** status/2091555578699186392 (video-analytics-f1-2.4.jpg) [V]

- **RULE [HR-60]** Cut product videos to a single interaction in 6-20s at 1:1 or ~1.4:1: state -> change -> result, with the UI at 2x so labels are readable; no decorative transitions between scenes beyond a cross-fade.
  **Why** One clear before/after interaction explains a feature faster than a tour and loops cleanly in a feed.
  **Applies to** landing page. **Check** clip <= 20s; one interaction per clip; UI text >= 14px at display size. **Source** status/2091555578699186392 (6.4s), status/2082904835385623012 (19.3s) [V]

### 2.7 His marketing register (acedesign.io)

- **RULE [HR-61]** If an agency or studio site needs a distinct brand voice, build it as a separate register from the product UI: black canvas, one lime accent (~#E0F235), condensed all-caps display type, mono small-caps labels with section indexes ("COMPANIES /01"), crop-mark corner ticks around key fragments and rectangular (radius 0) buttons.
  **Why** A deliberately different marketing voice avoids a product-demo sameness, and the corner ticks + index labels make an editorial, engineered feel.
  **Applies to** landing page. **Check** marketing site uses a distinct display face + mono labels; buttons radius 0; one accent. **Source** acedesign.io (acedesign-home-fold.png) [V]; this conflicts with founder-taste for SaaS (see section 5)

- **RULE [HR-62]** Present proof stats as a stair-stepped bar row (each box taller than the last, value top-left in mono, label with a crop tick at bottom) instead of a flat row of numbers; put a boxed logo marquee with crosshair corner ticks above it.
  **Why** Rising boxes encode "growing" with no chart, and ticked frames make the proof feel measured.
  **Applies to** landing page. **Check** stat boxes ascend in height; logo strip bounded by corner ticks. **Source** acedesign.io (acedesign-home-fold.png: 3 members, 56 companies, $20B+ total valuation, 150+ projects, his own claims, unverified) [V]

- **RULE [HR-63]** On case-study pages stack client UI frames full-width on a black canvas with ~24px gaps, each frame on its own tinted tile (warm off-white, white), one component or one flow step per tile (credits popover, "What would you like to do?" numbered list, "Automate Slack" modal).
  **Why** A vertical gallery of single-idea tiles lets the work speak and reads as a sequence of design decisions.
  **Applies to** landing page. **Check** frames equal width; one idea per frame; consistent gap. **Source** acedesign.io/work/twin (acedesign-work-twin-full.png) [V]

### 2.8 System-level discipline

- **RULE [HR-64]** Publish and reuse a one-paragraph token cheatsheet per product before drawing screens (type pairs, three text greys, selected/border, radius ladder, control heights, icon set and stroke, accent hex) and check every frame against it.
  **Why** His consistency comes from a tiny written system reused across dozens of screens; the spec is the design.
  **Applies to** all. **Check** DIRECTION.md lists the cheatsheet; computed styles in the build match it. **Source** status/2079628240944263565, status/2082504442067538074, status/2063998746757886299, status/2085041405643395353, status/2083629103228608517 [T]

- **RULE [HR-65]** Pair every enlarged zoom frame with its real-size sibling: the full window shows the system, the crop shows the craft; zoom frames keep the same tokens at 2-3x, not redrawn bigger.
  **Why** One system rendered at two scales proves the details are real and not hero-only decoration.
  **Applies to** landing page. **Check** crop and full window share token values; zoom is a scale, not a rebuild. **Source** status/2085041405643395353 vs status/2092649787183317491, status/2091147395539288221 [V]

## 3. Numbers & scales

His own spec posts [T], grouped by product system. Several systems coexist; pick one per project.

| System | Type | Colours | Radius / sizes | Icons |
|---|---|---|---|---|
| "Clean UI blueprint" (status/2079628240944263565) | SF Pro 400/500, -0.15px; 12/13/14/24 | #292929 / #5D5D5D / #9E9E9E | nav 8, cards 16, pill CTA | 14 nav, 20 card |
| "Apps UI" (status/2082504442067538074) | Inter; titles 16/20 Medium, labels 13/16 Medium, body 14 Regular | #333 / #777; badge #CAFACE on #15B042; switch #0077E6 | buttons 32h r10; rows 40 data, 44 stores; badge 20h r6; switch 24x14 / thumb 10 | n/a |
| "Dark blueprint" (status/2063305931572871363) | Inter, -0.15px | bg #1C1C1C; text #E5E5E5, subtle #A1A1A1 | r 6 / 8 / 12 | Huge Icons |
| "Dark SF Pro" (status/2063998746757886299) | SF Pro 400/500; 12/13 (base)/14/16/18/24 | subtle #B5B5B5, default #EEEEEE, strong #FFFFFF, selected #212121, border white 4% | n/a | Nucleo, 1px stroke |
| "Light SF Pro" (status/2074530933001310390) | same scale | subtle #7F7F7F, default #5D5D5D, strong #292929, selected #F5F5F5, border #F2F2F2 | n/a | Nucleo, 1px |
| "Cool Inter" (status/2066920244170674326) | Inter 12/13/14 (base 14), -0.15px | page #F6F8FA, menu #EFF2F6, border #EBECF0, text #434356, subtle #838693 | n/a | 16px, 1.3 stroke |
| "Two surfaces" (status/2065146307065643156) | Inter, -0.31px everywhere | #FFFFFF and #FCFCFC; Tailwind neutral 500 muted, 800 emphasis | n/a | Huge Icons; illustrated avatars (@dariusdan) |
| "Analytics" (status/2085041405643395353) | Metrics Inter 18/24 Semi Bold -0.1px; labels 12/16 Medium; filters 13/16 Medium | charts line #519DFA, bars #0077E6; text #333 / #777 | filters 28h r6; cards r14, 16px side padding | n/a |
| "Onboarding" (status/2080367856370536879) | Inter 0 tracking; 14/20 Semi Bold, 13/16 Medium, 12/16 Regular | active #EDEDED | rows 32h, 8px padding+gap; active r10; CTA 24h 13px r6 | Huge Icons |
| "CRM table" (status/2081394621775859863) | Booton 13/16 Medium labels, 14 content | text #525252 / #737373 / #A1A1A1; tags #EFF6FF, #DBEAFE, #51A2FF | cells 36h; checkbox 12px r4; tags 22h r6; radius 7 mostly | n/a |
| "Sign-in" (status/2083629103228608517) | Season Mix 18/24 Medium title; Inter 14/21 body; labels 14/16 Medium | #222 strong, #646465 subtle, #C2C2C2 placeholder, #333 CTA, #0091FF link | controls 36h r10; input padding 12; fields 16 apart; sections 32 | n/a |
| "AI workspace" (status/2086890096599716108) | SF Pro 24 Medium titles; 16/26 body; -0.15px; DM Mono 14 for commands | #292929 / #5D5D5D / #7F7F7F | bars 38h, 12 left padding, r10; nav 28 rows, 13px labels, r9 | n/a |
| "Dashboard" (status/2075535595502481905) | Inter body + Season Mix titles; base 12/14; regular+medium | Tailwind colours | n/a | 1.2 stroke |
| "Neutral palette" (status/2076714283396964475) | 2 weights | Tailwind neutral | radius 8-12 only | Huge Icons solid |

Observed [V], approximate:

| Item | Value |
|---|---|
| Light canvas | grey ~#D5D5D5-#F2F2F2; warm beige ~#F2F0EC |
| Dark canvas around window | ~#2B2B2B (window #1C1C1C) |
| Window outer radius | ~24-28px (browser shots ~28) |
| Modal radius / width | ~24px / ~650px at 2000px frame (~33%) |
| Composer radius | ~20px |
| Plan card selected | pale blue ~#E0EEFD fill + 1px #1B8CE8~ border |
| Usage meter | 24 ticks (Claude/GPT), 7+1 blocks (wallet) |
| Settings column | ~740px at 1672px window |
| Video | analytics 6.4s 1120x800; stores 19.3s 720x720 (shown 2160x2160) |
| Image export | 2x-3x crops, 3600-5160px wide originals |

## 4. Dos and Don'ts

- **Do** show a real window cropped off the canvas edge at 2-3x scale (status/2085041405643395353); **Don't** show a whole UI at 40% scale with unreadable 6px type.
- **Do** colour data only when it carries meaning (the wireframe -> design pair adds colour in meters/one bar, status/2066197488437219378); **Don't** colour every card, icon and chip.
- **Do** use hairlines, rings and 4% borders for depth; **Don't** use heavy drop shadows on windows or cards.
- **Do** keep nav icons monochrome and let glass tiles carry colour for 4-5 product areas; **Don't** use coloured icons for every nav row.
- **Do** make the one primary action the single dark (or white-on-dark) pill; **Don't** show two filled primaries in a toolbar.
- **Do** show agent process (Worked for, sources, steps) and finish on Dismiss / Edit / Approve; **Don't** show a lone chat bubble as the AI feature.
- **Do** use tinted chips (fill + same-hue text); **Don't** use solid saturated badges in tables.
- **Do** write the cheatsheet first; **Don't** ad-lib sizes and radii per screen.
- **Don't** (his counter-example) leave lorem ipsum inside the AI panel of an otherwise believable screen (orchestrator-split-panel-dark.jpg).
- **Don't** copy his black/lime agency look into a SaaS client site without a reason; it is a studio-brand register (acedesign.io), not the product voice.

## 5. Exceptions & judgement calls

1. **Base size conflicts**: his specs use 13px base (SF Pro) in some posts and 14px (Inter) in others; the dashboard cheatsheet says 12/14. Pick by density, not by quoting all of them.
2. **Weights**: "only 2 weights" (status/2076714283396964475) vs "regular, medium, semibold" (status/2077431252932858091) and 600 on metrics. [engine note] Treat semibold as a metric-only exception.
3. **Radius**: he states "stick to 8-12px" in one post and "6-16px" in another; his own posted screens use 6 (chips), 8-10 (controls), 14-16 (cards), pill (CTA). [engine note] Use the four-step ladder in HR-18.
4. **Tracking**: -0.15px, -0.31px, -0.1px and 0 all appear. [engine note] -0.15px on 13-16px is the dominant value; keep one per project.
5. **Founder taste fit** [engine note]: his light system (soft grey canvas, white surfaces, hairlines, Inter 500, tight tracking, one blue accent, quiet effects) is the closest match in the library to the founder's stated favourite, AlignUI-style. Use HR-10 to HR-14 to tighten our product frames. Where the founder rules specify marketing buttons (Kaching: 14px radius, 18px label), those still win on the marketing page; HR-24 applies to buttons inside the product window.
6. **Dark mode vs founder verdict**: the founder rejected a dark, moody hero as the main visual. His dark UI is product proof (dashboard in a window), which is allowed; keep light as the default hero and use dark only as a secondary frame or toggle.
7. **Pill CTAs**: he uses full pills in modals and hero composers, r10 in dense toolbars. [engine note] Match radius to context; do not mix both in one toolbar.
8. **Crops vs founder hero rule**: the founder wants a full dashboard running off the bottom of the fold; his cropped windows run off right and bottom, which is compatible. Do not crop so tightly that the nav disappears from a hero image.
9. **Glass icons and painted backdrops** are image assets, not CSS. [engine note] Generate or source them (he cites GPT Image for backgrounds in status/2077431252932858091); never hand-draw them in SVG (founder rule on hand-made icons).
10. **Sample claims**: studio stats on acedesign.io ("$20B+ total valuation", "150+ projects") are his claims; do not reuse as proof.

## 6. Figures worth keeping

All files in `knowledge/benchmarks/heyrico/` (JPEG, max 1800px). Post key = X status ID; filename -> what it teaches.

| File | Status ID | Teaches |
|---|---|---|
| alpaca-mobile-pair-light.jpg | 2079628240944263565 | Light app: tabs + sidebar groups, 14px nav icons, pill CTA, 3-row card list with icon tiles, cropped window bezel |
| alpaca-mobile-pair-dark.jpg | 2063998746757886299 | Same screen in #1C1C1C dark: parity of structure, #212121 selected row |
| inbox-opus-usage-bar.jpg | 2097732283650523560 | Segmented tick meter, model chip, banner card with painted art, email list rows |
| inbox-gpt-usage-bar.jpg | 2097732283650523560 | Same layout with GPT colour variant (black ticks): brand-coloured meters |
| shopify-app-detail-light.jpg | 2082504442067538074 | Integration detail: Connected chip, data-sync table, stores list, tool permissions; sidebar with Getting started + Upgrade footer |
| escalation-insight-dark-on-photo.jpg | 2063305931572871363 | Dark window on twilight photo; multi-hue stacked bar + legend dots + counts; segmented tabs with counts |
| ai-growth-report-dark-on-photo.jpg | 2063297379521229070 | Full dark analytics: KPI strip, bar chart, ranked table with logos, sidebar sections |
| analytics-dark-full.jpg | 2092649787183317491 | Dark dashboard on charcoal canvas; KPI cards with spark bars; blurred last row |
| analytics-light-cropped-window.jpg | 2085041405643395353 | Light analytics crop: filter chips, KPI, line chart, top-products bars; browser bezel |
| companies-database-table.jpg | 2099121946437071193 | Table anatomy: header, logo cells, tinted category tags, status glyphs, right-aligned money, footer aggregates |
| install-chrome-modal-glass-header.jpg | 2099121946437071193 | Modal with gradient header + two icons joined by dots, bordered detail card, full-width dark pill |
| coworker-empty-state.jpg | 2099121946437071193 | Icon rail + AI composer empty state, "Connect your tools" strip |
| inbox-zero-painting-card.jpg | 2099121946437071193 | Status list with glyphs, painted empty-state card with skeleton overlay |
| artifacts-grid-dark.jpg | 2061402150056628542 | Dark card grid with pixel-fade top edge, skeleton thumbnails |
| supercomputer-composer-dark.jpg | 2061402150056628542 | Dark composer: model chip, send circle, suggestion cards |
| triggers-skills-toggles-dark.jpg | 2061402150056628542 | Toggle list with brand logos on dark, blue switches |
| twin-share-agent-beige.jpg | 2083591876322759078 | Warm beige theme, serif title, share rows with avatars and switches |
| twin-sidebar-slack-card.jpg | 2083591876322759078 | Twin sidebar (serif wordmark), hover row with arrow, dark promo card with white pill |
| micro-illustration-tiles.jpg | 2090113322255622509 | Bento of 5 blurred-flower tiles with floating UI chips |
| composer-on-blue-wash.jpg | 2065117631796154769 | Zoom crop of composer on a pale-blue wash with pill "Search" and "New" chips |
| tool-json-output-card.jpg | 2065117631796154769 | Tool-call result card: JSON block in mono + green strings, "Done" row |
| dock-icons-codex-tooltip.jpg | 2065117631796154769 | Large white squircle logos, black pill tooltip, cursor |
| ace-sidebar-v-old.jpg | 2091147395539288221 | "Old": clean list sidebar with glass tool icons, active pill |
| ace-sidebar-v-new-glass-dock.jpg | 2091147395539288221 | "New": black dock with glowing glass icons + sidebar sessions |
| onboarding-create-workspace.jpg | 2103521703762776474 | Two-pane onboarding, live preview skeleton, disabled Continue |
| onboarding-chip-survey.jpg | 2103521703762776474 | Brand-glyph chip survey, preview card fills with entries, black Continue |
| settings-profile.jpg | 2084686700647977333 | Settings shell: grouped nav, centred column, ringed card |
| settings-wallet-segmented-meters.jpg | 2084686700647977333 | Plan/billing card split, block meters with n/max |
| campaign-table-dark.jpg | 2094463741341659570 | Dark metric tabs, line chart, count tabs, table with toggles and tinted status chips |
| slash-agent-menu-beige.jpg | 2067985029079371862 | Slash command token pill + picker menu with pixel orbs |
| credits-upgrade-modal.jpg | 2067985029079371862 | Plan picker modal, line-item summary, amount on CTA |
| wireframe-state.jpg | 2066197488437219378 | "Wireframe" frame (grey placeholders) |
| wireframe-to-design-state.jpg | 2066197488437219378 | "Design" frame: same layout with colour, tooltip bar, card art, dark primary |
| getting-started-card-dark-tooltip.jpg | 2101785483349258710 | Getting-started checklist card + dark promo tooltip with blue button |
| marketer-home-dark-suggestions.jpg | 2099906609053151650 | Dark home: suggestion cards with lightning icon, glass record icons |
| composer-attachments-option-1-2.jpg | 2104285452350185480 | Two attachment treatments: chip row vs mini-card row, mono meta ("93 lines") |
| orchestrator-split-panel-dark.jpg | 2106398952572735689 | Three-column dark agent workspace: chat, process panel, step list |
| chat-sidebar-agent-avatars.jpg | 2099846465518805440 | Top tab bar + sidebar with illustrated agent avatars, "New" chip |
| crm-inbox-with-agent-panel.jpg | 2098426606301917343 | CRM inbox: avatars, status glyphs, activity line, dark/light bubbles, Coworker panel with Send/Dismiss |
| agent-tasks-panel-beige.jpg | 2103469850463195623 | Beige right panel: agent card with logo row, Tasks/Artifacts/Files segmented tabs |
| video-analytics-f1-0.2.jpg | 2091555578699186392 | Video frame 1: analytics light dashboard |
| video-analytics-f1-2.4.jpg | 2091555578699186392 | Edit mode: handles, ×, lifted card with blue outline, dashed drop slot |
| video-analytics-f1-4.8.jpg | 2091555578699186392 | Scene 2: orchestrator composer + recommendations |
| video-stores-f2-3/9/15.jpg | 2082904835385623012 | Accordion expand: Tool permissions panel opens, meta text flips, next row opens |
| acedesign-home-fold.png | acedesign.io | His studio register: black, lime, condensed caps, crop ticks, stair stats |
| acedesign-work-twin-full.png | acedesign.io/work/twin | Case-study page: stacked client frames on black |

## 7. Open questions

- **Coverage**: the mirror returned 888 timeline rows (580 unique posts, 298 of them his own posts with media, 2026-06-01 to 2026-10-09) out of ~1,783 media posts on his profile. We read the top ~100 posts by likes (248 images) and read ~45 images + 6 video frames directly; the rest of the set repeats the same frames (many carousels are the same screen in 4 crops). Posts older than June 2026 were not reachable.
- **Not accessed**: Dribbble, Read.cv, Behance, Layers or any portfolio other than acedesign.io were not found by search (web search for the handle returned nothing relevant); acedesign.io pages /works returned an empty render and only /work/twin was viewed in detail; /work/alpaca, aster, langdock, marketer, scout were screenshotted but not studied.
- **Name and role**: "Rico Oktananda" appears in his own mock-ups; not independently confirmed. Bio: "agentic product design agency acedesign.io (still in progress)", clients @clickup @langdock @blackboxai @twin_labs.
- **Fonts**: SF Pro is an Apple system font (web fallback: Inter with the same tracking); Season Mix and Booton appear in his specs as trial/commercial faces (the posts say "TRIAL"); DM Mono is on Google Fonts. [engine note] Check licences against the font catalogue before using any.
- **Colour values** are his posted hex where marked [T]; values read from images (`~`) were not measured with a picker.
- **Actual products**: Alpaca, Marketer and Twin UI are his concept/case-study designs; shipped versions may differ. His "Acme" CRM and analytics screens are portfolio concepts.
- **Motion timings** in the two videos are visual only (no CSS); durations `~250-400ms` for the accordion are an estimate from frame spacing, not measured.
- **Not measured**: shadow values (rings and soft shadows are described, not quantified), exact window radii, and exact pixel gaps in bento tiles.
