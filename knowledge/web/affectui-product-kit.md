---
source: web:affectui.com (measured, knowledge/benchmarks/flohoeller/*measure.json + system/variety/flohoeller-tokens.json) + Sellify Video Ad Creator studio kit (read-only: apps/web/components/video-ads/video-ad-studio.module.css, video-ad-studio-panel.tsx; tokens in apps/web/app/globals.css; owner components in apps/web/components/ui) + work/sellify-video-ad-creator/DIRECTION.md + alignui-system.md + founder-taste.md (2026-10-14/15)
chapter: affectUI / AlignUI product kit for in-app UI: tray + strip + card + footer strip, status, steps, segmented control, media tiles, library card, rows, sticky bar, fields, buttons, overlays, radius ladder, type, state language, motion, light and dark
pages: n/a (web measurements + shipped code, read 2026-10-15)
topic_tags: [product-ui, saas-app-ui, component-kit, tray, card-in-card, status-chip, stepper, segmented-control, media, library, list-rows, sticky-footer, forms, buttons, overlays, radius-ladder, type-scale, hover, focus, motion, dark-mode, content-volume, affectui, alignui, sellify]
status: studied
---

# affectUI product kit: in-app UI in the affectUI / AlignUI style

Executable companion: `system/kits/product-studio/` (`GUIDE.md`, `studio.css`, `StudioPanel.tsx`, `preview.html`). This note is the evidence; the kit is the code. Flow-level rules for generation and approval screens are in `approval-and-generation-ui.md` (APR-01..18) and are not repeated here; edges and nesting in `borders-and-nesting.md` (BN-01..12).

**Evidence tags.** **[AFF-C]** `knowledge/benchmarks/flohoeller/affectui-components-measure.json` (key `affectui-c-<name>`, then `measure.<list>`, `controls[]`, `animations[]`, `hoverStyle`, `doc`). **[AFF-S]** `affectui-screens-blocks-illus-motion-measure.json` (same shape). **[AFF-H]** `home-deep-measure.json` (`affectui.rootVars`, `.cards`, `.focus`, `.ctaHover`). **[AFF-I]** `index-pages-measure.json` (`affectui-components.measure`). **[AFF-T]** `system/variety/flohoeller-tokens.json` (tokens compiled from the same measurements). **[FHC]** `knowledge/web/flohoeller-craft.md`. **[KIT]** Sellify `video-ad-studio.module.css`, cited by selector. **[PANEL]** `video-ad-studio-panel.tsx`. **[TOK]** Sellify `apps/web/app/globals.css` (`:root` = light, `.dark` = dark). **[OWN]** Sellify shared owners `components/ui/{button,dialog,select,dropdown-menu,popover}.tsx`, `system` variant/appearance. **[DIR]** `work/sellify-video-ad-creator/DIRECTION.md`. **[ALN]** `knowledge/benchmarks/alignui-system.md`. **[FT]** `knowledge/founder/founder-taste.md`. **[engine note]** our synthesis, not stated by any source.

**Precedence.** Founder verdicts > DIRECTION.md (the spec) > shipped kit CSS > affectUI measurements > AlignUI. Where they differ, the rule gives each value and says which one the generic kit (`studio.css`) uses and why.

## 1. Core ideas

1. **One container grammar for every section.** A grey tray (radius 20, 4px inset, 1px ring) carries a title strip on the grey and one white card (radius 16, 1px ring, no shadow); secondary info and actions go on a footer strip of the tray, never inside the card. affectUI measured it (AI Answer tray 20 / card 16, tray `#f0f0f0`) [AFF-C ai-answer `measure.radius`, `measure.bg`; FHC §4.1]; the kit made it the only section shape (`.tray`, `.trayHead`, `.card`, `.trayFoot`) [KIT]; the founder made it law (2026-10-14) [FT].
2. **Small, quiet type at two weights.** affectUI runs a 13px UI base at 400/500 (600 only for product headings) [FHC §2.3, §3.1]; the kit closes the scale to 12 / 14 / 18 at 450 / 500 with the app's tracking tokens (0, -0.01em, -0.02em) [TOK `--font-size-ds-*`, `--letter-spacing-ds-*`]. Hierarchy comes from size, grey and weight 500, never from 600/700.
3. **Edges are rings at low alpha, one per box.** affectUI rest card `0 0 0 1px #ececec, 0 1px 2px rgba(0,0,0,.04)` [AFF-H `cards` `ui-ans__card`]; the kit uses an inset 1px ring at 8.5% ink and drops the shadow on cards [KIT `.studio --ring`, `.card`; TOK `--ds-border-subtle`]. Overlays get exactly one edge: the shadow ring, with the owner's border made transparent [KIT `.dialog[data-slot="dialog-content"]`, `.menu`, `.selectList`].
4. **Every control is 36 tall with radius 12.** Fields, select triggers, picker triggers, buttons and the segmented track share one height and radius [DIR form controls; OWN button `size.system` = `--ds-control-height-md` 36 + `rounded-ds-control` 12; KIT `.fieldTrigger`, `.segmented`]. The founder caught a mismatched field radius and called it out in capitals [FT 2026-10-14].
5. **One state language.** Hover = 4% ink tint (rows, options, steps) or a 1px strong ring (media); selected = white pill (segmented, steps), a check (lists), or a 2px gap + ring (media); focus = a 2px neutral ring [KIT comment above `.segmentedOption:not([aria-checked="true"])…:hover`, lines 1651-1655].
6. **Media has fixed ratios by role.** Gallery tiles and library covers 3:4 at radius 12, character views and the player 9:16, row thumbnails square 36/44 at radius 10 [KIT `.media`, `.media[data-ratio="tall"]`, `.square`; DIR media; FT 2026-10-14].
7. **Generating is shown, not described.** A pending image blurs (10px, desaturated, scaled 1.15, 60% opacity) under one diagonal sweep (2.4s); the live chip dot pulses (1.4s); reduced motion stops every loop [KIT `.media[data-pending] img`, `.sweep`, `@keyframes studio-sweep`, `.chip[data-tone="live"] .chipDot`].
8. **Motion is calm and short.** One ease `cubic-bezier(0.22, 1, 0.36, 1)` for movement [KIT `.studio --ease`; AFF-T `motion.easing`], hover colour 150ms, step change 220ms, content in 240ms, disclosure 300ms, pills 400ms [DIR motion]. affectUI adds blur to entrances; the product kit drops it [DIR overrides].
9. **Design for volume.** Grids count their items (min(items, 4) columns, then 3 / 2 / 1 at 1100 / 860 / 520), names ellipsize with a tooltip, lists scroll inside a max-height, the sticky bar never covers the last row [DIR content volume; FT 2026-10-15].
10. **Dark is the same role names re-pointed.** The kit has zero dark selectors; dark comes from the app's `.dark` token block [KIT (no `dark` match); TOK `.dark`], which is AlignUI's model (65 role overrides, zero per-component `dark:`) [ALN §1.2].

## 2. Rules

### Page and sections

- **RULE AK-01** Lay a product screen on a white canvas, max-width 1200, padding 24 (16 at <= 860px); a work screen with a live preview is a two-column canvas `minmax(0,1fr) 316px`, gap 16, aside sticky at top 16; the aside narrows to 280 at <= 1100px and drops under (or above, for preview-first screens) at <= 860px; stacks inside a column use gap 16.
  **Why** One page frame keeps every step of a flow aligned; the fixed aside keeps the preview the same size while the work column flexes.
  **Applies to** SaaS app UI. **Check** computed `max-width`, `padding` on the page root; `grid-template-columns` of the canvas at 1440 / 1100 / 860. **Source** [KIT] `.studio`, `.canvas`, `.stack`, `.stage`, `@media (max-width: 1100px)`, `@media (max-width: 860px)`; [TOK] `--ds-surface-canvas: #ffffff`

- **RULE AK-02** Build every section as a grey tray: padding 4, radius 20, 1px inset ring; inside it exactly one white card (radius 16 = 20 - 4, same ring, no shadow, padding 16) or, for full-bleed lists, a flush card (padding 0, overflow hidden); grids of cards that are cards themselves sit bare on the tray.
  **Why** One shape for every section is what makes a multi-step flow read as one product; concentric 20/16 reads as one object.
  **Applies to** SaaS app UI. **Check** tray `padding: 4px`, `border-radius: 20px`; card radius 16, box-shadow has no blur layer; ringed nesting depth <= 2. **Source** [KIT] `.tray`, `.card`, `.cardFlush`, `.trayBody`; [PANEL] `StudioPanel` (`flush`, `bare`); [AFF-C] ai-answer `measure.radius` 20 + 16, `measure.bg` rgb(240,240,240); [DIR] Surfaces. affectUI's card also carries `0 1px 2px rgba(0,0,0,.04)` [AFF-H `cards` `ui-ans__card`]; the kit drops it ("no shadow") per DIRECTION.

- **RULE AK-03** Put the section's title strip on the grey, above the card: min-height 44, padding 4 4 6 16, gap 8; a plain 16px icon in secondary ink (never an icon tile), title 14/500 line 20 nowrap, meta 14 tertiary with ellipsis, the action pushed right (`margin-left: auto`, gap 6).
  **Why** The strip names the section without adding a box; the 16px left inset lines the title up with the card's 16px content inset below it.
  **Applies to** SaaS app UI. **Check** strip height >= 44; icon element 16x16 with no background; title computed 14px/500. **Source** [KIT] `.trayHead`, `.trayIcon`, `.trayTitle`, `.trayMeta`, `.trayAction`; [PANEL] icon `size-4`; [FT] 2026-10-14 ("never a black icon tile")

- **RULE AK-04** Put secondary info and secondary actions on a footer strip under the card: min-height 44, padding 4 4 0 16, space-between, gap 12, 12px secondary text; when the strip leads with a ghost button, pull it left by the button's padding (-12) so its icon sits on the 16px inset.
  **Why** Keeps the card one job (affectUI's "Connect apps" / "Demo code" live on the tray strip [FHC §4.1]); the negative margin aligns the icon optically, not the button box.
  **Applies to** SaaS app UI. **Check** no secondary button inside the card when a footer strip exists; footer-lead icon x == card content x (+-1px). **Source** [KIT] `.trayFoot`, `.footLead`, `.footLeadButton`; [FHC] §4.1; [AFF-C] chat-composer controls `Connect apps` on the tray row

- **RULE AK-05** The page header (topbar) is one row: a 36px back tile (radius 12, white, 14% control ring, secondary icon; hover fill + primary ink), then a 12px tertiary eyebrow (line 16) over an 18/500 title (line 24, -0.02em, ellipsis), then actions right with gap 8; an editable title is an 18/500 input 24 tall, radius 6, transparent until hover, pulled -6px so the text stays aligned.
  **Why** The back tile shares the control height, so the header aligns with every button beside it; the title never wraps the header to two rows.
  **Applies to** SaaS app UI. **Check** back tile 36x36 r12; title computed 18px/500 with `text-overflow: ellipsis`. **Source** [KIT] `.topbar`, `.titleBlock`, `.iconLink`, `.eyebrow`, `.screenTitle`, `.nameInput`, `.actions`; [PANEL] `StudioTopbar`; [DIR] round 2 (`StudioTopbar`)

### Status and steps

- **RULE AK-06** Render every status with one chip: height 24, padding 0 8, radius 8, white fill with the 14% control ring, 12/500 secondary text, a 6px dot whose colour is the tone (neutral tertiary, success green, error red, live accent with a 1.4s pulse); the label comes from a closed vocabulary.
  **Why** Status is read peripherally; one shape and one word per state is what makes it scannable.
  **Applies to** SaaS app UI. **Check** all status elements share one class; height 24, radius 8; label in the vocabulary list (APR-03). **Source** [KIT] `.chip`, `.chipDot`, `.chip[data-tone]`, `@keyframes studio-pulse`; [FT] 2026-10-14 ("outlined chip with a coloured dot"). Conflict: [DIR] Status and [PANEL] `StudioStatus` render the product Badge with an icon (check / alert / spinner) and say "No dot-chips". The generic kit ships the dot chip (founder rule outranks DIRECTION) with an optional icon slot; see section 7.

- **RULE AK-07** Show a flow's position in a step tray: tray padding 4, radius 16, ring; steps in equal columns, gap 4; each step 52 tall, padding 0 14 0 12, radius 12 (= 16 - 4), gap 10; the current step sits on a white pill (ring + `0 1px 2px rgb(0 0 0 / 5%)`); a 24px index tile (radius 8, 12/500 tabular) is white + ring (todo), 7% ink fill (done) or accent-soft fill + accent border + accent text (current); label 14/500 line 18, caption 12 tertiary line 16 with ellipsis.
  **Why** The tray reads as the same family as section trays; the pill says "you are here" without colour noise.
  **Applies to** SaaS app UI, multi-step flows. **Check** step height 52, pill radius = tray radius - 4; exactly one `aria-current="step"`. **Source** [KIT] `.stepTray`, `.stepper`, `.stepButton`, `.stepPill`, `.stepIndex` (+ `[data-state]`), `.stepLabel`, `.stepCaption`; [PANEL] `StudioSteps`; affectUI keeps step tabs as plain text on the tray ("1. Workspace 2. Team…", current in ink, rest faint) [FHC §4.1; AFF-C stepper-form `measure.type` 12.5px ×7].

- **RULE AK-08** At <= 860px collapse the step tray: hide captions and connectors, show text only for the current step (it takes the remaining width and ellipsizes), keep every index tile.
  **Why** Five captions do not fit a phone; the indexes still show progress.
  **Applies to** mobile. **Check** at 390px only one `.stepLabel` is visible and nothing overflows horizontally. **Source** [KIT] `@media (max-width: 860px)` `.stepCaption`, `.stepConnector`, `.stepButton:not([data-state="current"]) .stepText`, `.stepper > li:has([data-state="current"])`

### Choice controls

- **RULE AK-09** Build a segmented choice as a 36px track (padding 3, radius 12, 5% ink over white, no ring, gap 2) holding 30px options (radius 9 = 12 - 3, padding 0 10, 14/500 secondary); the selected option is a white pill with `0 0 0 .5px` 8% ink and `0 1px 3px rgb(0 0 0 / 8%)`; unselected hover = 4% ink tint + primary ink; `data-fill` makes equal columns; disabled 45% opacity.
  **Why** Same height as the fields beside it; the pill lifts by light, not by a border.
  **Applies to** SaaS app UI, forms. **Check** track 36 / option 30 / radii 12 and 9; selected option box-shadow has a 0.5px layer. **Source** [KIT] `.segmented`, `.segmented[data-fill]`, `.segmentedOption`, `[aria-checked="true"]`, `:has(input:checked)`; [DIR] segmented choice. affectUI measures md options 30 tall, radius 8, padding 0 12, 13.5/400 `#737373`, sm 26 / r7 / 12.5px [AFF-C segmented-control `controls`], track radius 11 with 3 padding [FHC §2.4], pill shadow `0 0 0 .5px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.08), 0 2px 8px -2px rgba(0,0,0,.06)` [AFF-C segmented-control `measure.shadow`]. The kit uses 36/30, r12/r9 and 14/500 to match its control height and type scale.

- **RULE AK-10** When the segmented pill moves, slide it 400ms on the shared ease and let label weight cross-fade without changing width; colour changes 150-200ms.
  **Why** affectUI: "the edge facing the target leads, so it stretches a little and settles – calm, no bounce" [AFF-C segmented-control `doc.Motion`].
  **Applies to** SaaS app UI. **Check** pill `transition` on left/right or transform at 400ms `cubic-bezier(0.22, 1, 0.36, 1)`. **Source** [AFF-C] segmented-control `animations` (left 400ms, width 320ms, color 200ms ease), `hoverAnims` (left 270ms, right 400ms); [DIR] "The pill slides 400ms". The shipped kit CSS swaps the white fill in place at 150ms (`.segmentedOption` transition) with no sliding element; `studio.css` offers both (static default, optional `.studio-segmented-pill`).

- **RULE AK-11** A segmented option that needs a hint (a price, a description) becomes tall: min-height 52, padding 7 12, left aligned, label 14/500 line 20 over a 12/450 tertiary hint line 16 (secondary when selected); for many presets the track wraps (`flex: 1 1 140px`).
  **Why** Choices with consequences show them inside the option, so no extra tile grammar is invented.
  **Applies to** forms. **Check** tall options 52+; no bordered choice tiles on the screen. **Source** [KIT] `.segmented[data-tall]`, `.optionLabel`, `.optionHint`, `.segmented[data-wrap]`; [FT] 2026-10-15 ("bordered choice tiles" listed in the reject)

### Media, library, rows

- **RULE AK-12** Media tiles are 3:4 at radius 12 on the tray fill (9:16 with `data-ratio="tall"`; 36px wide at r8, 48px at r10 for small sizes); the image covers; an inset 1px 6% black ring sits on top (`::after`); an optional bottom shade (from 55% down, 38% black) carries a tag (left 8 / bottom 8, height 22, radius 7, 42% black + 8px backdrop blur, 12/500 white tabular); the status chip sits top-left at 8.
  **Why** One ratio per role makes sets comparable; the inner ring keeps light images from bleeding into white cards.
  **Applies to** SaaS app UI. **Check** computed `aspect-ratio` 3/4 or 9/16; radius 12; chip offset 8/8. **Source** [KIT] `.media`, `[data-ratio="tall"]`, `[data-size="xs"|"sm"]`, `.media::after`, `.mediaShade`, `.mediaTag`, `.mediaChip`; [DIR] Media. The kit's header comment ("every video thumbnail is 9:16") predates the 3:4 default in the same file; DIRECTION confirms 3:4.

- **RULE AK-13** A pending or generating tile shows its (previous) image blurred 10px, saturate .5, scale 1.15, opacity .6, under one sweep: a 105deg band `transparent 30%, rgb(255 255 255 / 40%) 50%, transparent 70%`, background-size 250%, 2.4s ease-in-out infinite; filter changes glide 800ms, transform 500ms, opacity 600ms so the reveal "develops".
  **Why** A blurred image says "coming" without a blank box; one loop keeps a set of 8 generating tiles calm.
  **Applies to** SaaS app UI (AI generation). **Check** pending `img` filter contains `blur(10px)`; `.sweep` animation 2.4s; zero running animations under `prefers-reduced-motion`. **Source** [KIT] `.media[data-pending] img`, `.sweep`, `@keyframes studio-sweep`, `.media img` transition; [DIR] Media/round 2; APR-04.

- **RULE AK-14** Selected media gets a 2px gap in the surface colour plus a 1.5px ring (`0 0 0 2px surface, 0 0 0 3.5px ring`); hover on an interactive tile is a 1px strong ring outside the same 2px gap and `brightness(.96)` on the image, never a zoom.
  **Why** Selection must read without tinting the image; zoom moves the thing being judged.
  **Applies to** SaaS app UI. **Check** selected `box-shadow` = 2px + 3.5px layers; no `transform: scale` on hover. **Source** [KIT] `.tile9[aria-pressed="true"] .media`, `.tile9:…:hover .media`, `.libraryCard:hover .media`, `img { filter: brightness(0.96) }`; [DIR] Media. Colour conflict: DIRECTION says an ink ring; the kit CSS uses the brand signal (`--ds-brand-signal`). `studio.css` exposes `--studio-select` (default ink, per DIRECTION).

- **RULE AK-15** A library card is a column (gap 8): the 3:4 cover, then a foot row (name 14/500 line 20 ellipsis + one 12px secondary meta line, a 36px icon menu pulled -4 -4 into the corner); the whole card is one link through an absolute overlay (inset 0, radius 12, z 4) and the menu sits above it (z 5); the grid opens with a dashed create tile; the grid auto-fills at a 176px minimum.
  **Why** One click target for the card plus one escape hatch (the menu) keeps a library of 40 items scannable and keyboard-friendly.
  **Applies to** SaaS app UI. **Check** card has exactly one focusable overlay + one menu button; first grid child is the create tile; `grid-template-columns` contains `minmax(176px, 1fr)`. **Source** [KIT] `.libraryCard`, `.libraryOpen` (+ `:focus-visible` offset 3), `.libraryFoot`, `.libraryMenu`, `.gallery[data-cols="auto"]`, `.dropzone`; [DIR] round 2 Library; APR-17. affectUI's marketing library card is a different object (14px white card, 6px inset, 16:10 stage r8, `1px rgba(10,10,10,.055)`) [AFF-H `cards` `card`, `card__stage`]; use it for showcase grids, not in-app libraries.

- **RULE AK-16** Lists are one flush card with full-bleed rows, not stacked cards: row min-height 60, padding 10 16, gap 12; dividers are an inset `0 1px 0` subtle ring between items (never a border on the last row); title 14/500 line 20, meta 12 secondary line 17, sub 12/450 tertiary tabular; row actions gap 4; row hover = 2% ink over white; a row may carry a second line block indented 72px (16 at <= 860).
  **Why** UI Pedia: a list of homogeneous items is one container with dividers (BN-05); the tint is barely there so dense lists stay calm.
  **Applies to** SaaS app UI. **Check** dividers are box-shadow insets of the subtle ring; rows >= 60 tall. **Source** [KIT] `.list`, `.row`, `.list > li:not(:first-child)`, `.rowMain`, `.rowTitle`, `.rowMeta`, `.rowSub`, `.rowActions`, `.listItem:not([data-selected]):hover`, `.rowExtra`. affectUI's in-component rows run denser (command menu items 40 / r10, integration items 42 / r10, combobox options 36 / r9, setup tasks 34 / r10) [AFF-C command-menu, integration-picker, combobox, setup-guide `controls`]; those are popover rows (AK-24), not page lists.

- **RULE AK-17** Row thumbnails are square: 36px (radius 10) by default, 44px (radius 10) for media rows, 56px (radius 12) for featured assets; tray fill + ring, image cover; pending thumbs blur 6px + saturate .5; a selected row marks its thumb with the select ring, not a tinted row.
  **Why** A 9:16 sliver under 64px wide reads as a capsule (founder); square crops keep row heights equal.
  **Applies to** SaaS app UI. **Check** no row thumb narrower than its height under 64px wide. **Source** [KIT] `.square`, `[data-size="lg"]`, `[data-size="xl"]`, `[data-pending] img`, `.listItem[data-selected] .square`; [DIR] Media (44 r10); [FT] 2026-10-14.

### Grids and content volume

- **RULE AK-18** Gallery grids count their items: `columns = min(items, 4)`, then 3 at <= 1100px, 2 at <= 860px, 1 at <= 520px, gap 16 row / 12 column; libraries and view sets auto-fill instead (176px library, 150px 9:16 views, 200px tiles with two buttons); tiles stack their buttons below 280px of tile width.
  **Why** Two items should not float in four columns; crowded sets wrap into rows instead of squeezing labels.
  **Applies to** SaaS app UI, mobile. **Check** computed `grid-template-columns` at 1440 / 1100 / 860 / 520 for 1, 2, 4 and 12 items; no button with `scrollWidth > clientWidth`. **Source** [KIT] `.gallery` (+ `[data-cols]`, media queries 1100 / 860); [DIR] Content volume; APR-08; [FT] 2026-10-15

- **RULE AK-19** Before handoff render every grid with 1, 4, 12 and 40 items and every name with a 60-70 character string; names ellipsize (or clamp to 2 lines) and keep a `title`; popovers and option lists cap at `min(420px, 60dvh)` (select lists `min(320px, 50dvh)`) and scroll inside.
  **Why** The happy-path sample hides the overflow bugs a real account will have.
  **Applies to** SaaS app UI. **Check** stress fixtures render with zero horizontal overflow; every truncated element has `title`. **Source** [FT] 2026-10-15 (content volume); [KIT] `.optionList`, `.selectList [data-slot="select-viewport"]`, `.commandList [cmdk-list]`, `.pickGrid`; [DIR] round 2 (40 avatars, 70-character name); APR-09

### Sticky footer bar

- **RULE AK-20** The pay/save bar is sticky to the bottom of the scroll area: min-height 60, padding 12 24, border-top 1px subtle, canvas fill, space-between with gap 16; context on the left (14 secondary, gap 12), cost as 12 secondary tabular with the figure in 500 primary and 1x12 dividers, actions right (gap 8); the screen above is a flex column at least the viewport tall, so a short page rests the bar on the bottom edge and the content above gets 16px clearance.
  **Why** The price and the next step must be visible from any scroll position, and the bar must never cover the last row.
  **Applies to** SaaS app UI. **Check** at the end of scroll the last row's bottom <= the bar's top; bar `position: sticky; bottom: 0`. **Source** [KIT] `.stickyFooter`, `.studio:has(> .stickyFooter)`, `.studio > :has(+ .stickyFooter)`, `.footerSide`, `.cost`, `.costDivider`; [PANEL] `StudioFooter`; APR-07. The kit's 84px right padding and its `100dvh - 28px / 84px` heights reserve room for Sellify's own chrome (an assistant launcher, the app header); the generic kit makes both tokens.

- **RULE AK-21** At <= 860px the bar wraps: context takes a full row (cost stays visible and wraps itself), actions take the next row right-aligned and non-button children flex to fill; padding 10 16.
  **Why** On a phone the price is the decision; it must not be the thing that gets hidden.
  **Applies to** mobile. **Check** at 390px the cost element is visible and inside the viewport. **Source** [KIT] `@media (max-width: 860px)` `.stickyFooter`, `> .footerSide`, `> .actions`; APR-07

### Fields and buttons

- **RULE AK-22** Every text field, textarea, select trigger and custom picker trigger is 36 tall (textarea min 64 in cards, 72 in dialogs) with radius 12 and padding-inline 12; on white cards and in dialogs it is filled with the work grey mixed 55% toward white and edged by a 10% ink ring that goes to 18% on hover; on the page canvas it uses the full work grey; never a white field on a white card, never a custom shadow on a field.
  **Why** One field look everywhere is the consistency contract the founder audits first.
  **Applies to** SaaS app UI, forms. **Check** every field computes 36px / 12px radius; no field background equals its parent card's. **Source** [KIT] `.studio, .dialog { --field-fill; --field-edge; --field-edge-hover }`, `.card, .cardFlush, .dialog > * {…}`, `.fieldTrigger`, `.card [data-slot="textarea"]`, `.dialog [data-slot="textarea"]`; [OWN] button `size.system`, select `appearance === 'system'`; [DIR] Form controls; [FT] 2026-10-14. affectUI uses white inputs, 36 tall, inset ring `rgb(220,220,223)` + `0 1px 2px rgba(0,0,0,.03)`, radius 8-10 [AFF-C stepper-form `controls`, `measure.shadow`; FHC §4.6]; overridden by DIRECTION ("override: affectUI white inputs").

- **RULE AK-23** Label above the field at 14/500 line 20 with an 8px gap; a required/optional hint sits on the label row (12 tertiary, baseline aligned); the hint under the field is 12 tertiary line 17, 6px below (8px gap with -2 margin); fields in a two-column grid use a 12px column gap.
  **Why** Label-gap-field-gap-hint is the one form rhythm; the hint is visibly closer to its own field than to the next label.
  **Applies to** forms. **Check** label-to-field gap 8, field-to-hint 6. **Source** [KIT] `.field`, `.fieldLabelRow`, `.fieldLabel`, `.requiredHint`, `.field > .hint`, `.hint`, `.fields`; [DIR] Form controls. Row gap conflict: DIRECTION says 16px between fields; the shipped kit uses 14 (`.fields` `gap: 14px 12px`, `.fieldStack` `gap: 14px`) and 6 in dialogs (`.dialog .fieldStack`). `studio.css` uses 16 (the spec). affectUI: label 13.5/500, hint 12.5 `#8f8f8f` [FHC §4.6; AFF-C stepper-form `measure.type`].

- **RULE AK-24** Buttons come in three looks at one size per region: primary = ink fill (light `#211e1c`, hover `#342f2c`, text `#faf9f8`, `inset 0 1px 0 rgb(255 255 255 / 10%), 0 1px 2px` 10% ink); secondary = white with a 1px control edge, hover the interactive grey; ghost = transparent, secondary text, hover grey + primary text. Size `system` is 36 tall, radius 12, padding-inline 16 (12 with an icon), gap 6, 14/500, icons 16; compact is 32 (padding 12 / 10); icon-only 36 square r12 (compact 32 r10); press scales to 0.97; disabled 50% opacity, no pointer events.
  **Why** Three looks and one size per region make the hierarchy of actions obvious without colour.
  **Applies to** SaaS app UI. **Check** buttons in one toolbar/footer share height; `:active` transform scale(0.97). **Source** [OWN] button.tsx `variant.systemPrimary|systemOutline|systemGhost`, `size.system|systemCompact|systemIcon|systemIconCompact`, base `gap-2 font-medium text-sm`, `[&_svg]:size-4`, `disabled:opacity-50`; [TOK] `--ds-action-bg`, `--ds-action-bg-hover`, `--ds-action-fg`, `--ds-action-shadow`, `--ds-control-height-sm|md|lg` 32 / 36 / 40; [DIR] Buttons, Interaction. affectUI's in-product Button: 40 tall, r12, padding 0 16, 14/500 -0.14px; secondary white + `1px #e5e5e5` + `0 1px 2px rgba(0,0,0,.06)`; ghost `#737373`; small 32 / r10 / 13px; large 48 / r14 / 15px; primary is the lit gradient (`#323137 -> #201e25`, edge `#4b4951 -> #31303a -> #18171b`, ring `#0d0d0d`) [AFF-C button `controls`, `measure.type`]; dense components use 36 / r10 (stepper form, email draft) and 30 / r9 (decision inbox) [AFF-C stepper-form, email-draft, decision-inbox `controls`]. The kit uses 36 / r12 so buttons match fields (AK-22).

### Overlays

- **RULE AK-25** Overlays have exactly one edge, the shadow ring: dialog radius 20, white, padding 24, gap 18, width min(480px, 100vw - 32) (wide 560), max-height 100dvh - 32 with its own scroll, scrim 45% black + 2px blur (60% in dark); menus, popovers and select lists radius 12, padding 5, side offset 6; set the owner's border to transparent so the ring is the only edge.
  **Why** A border plus a shadow ring is the "double border" the founder rejected on dropdowns.
  **Applies to** SaaS app UI. **Check** overlay `border-color` transparent or width 0 and box-shadow has one `0 0 0 1px` layer. **Source** [OWN] dialog.tsx `variant === 'system'` (`rounded-[20px]`, `gap-[18px]`, `p-6`, overlay `bg-black/45 backdrop-blur-[2px] dark:bg-black/60`), dropdown-menu/popover/select `appearance === 'system'` (`rounded-ds-control`, select `p-[5px]`, sideOffset 6); [KIT] `.dialog`, `.dialog[data-size="wide"]`, `.dialog[data-slot="dialog-content"]`, `.menu, .selectList { border-color: transparent }`, `.popoverList`; [TOK] `--ds-shadow-overlay`; [FT] 2026-10-14 (double borders); [DIR] Overlays. affectUI floating layers: `0 0 0 1px rgba(0,0,0,.06), 0 18px 40px -12px rgba(0,0,0,.18), 0 4px 12px -4px rgba(0,0,0,.06)` [AFF-C combobox, date-range-picker `measure.shadow`].

- **RULE AK-26** Overlay type follows the flow's scale, not the owner's: dialog title 18/500 line 24 -0.02em, description 14/450 line 20 secondary, menu and select items 14/450; items min-height 36 (popover pickers with a meta line 44), radius 9, padding 8 10; hover/highlight = interactive grey + primary ink; the checked item shows a check in the accent; a popover footer row sits under a subtle inset divider.
  **Why** The owners default to 17/600 titles and 13px items, which break the 12/14/18 at 450/500 contract inside the flow.
  **Applies to** SaaS app UI. **Check** inside overlays, font sizes ⊆ {12, 14, 18} and weights ⊆ {450, 500}. **Source** [KIT] `.dialog [data-slot="dialog-title"]`, `[data-slot="dialog-description"]`, `.menu [role="menuitem"]`, `.selectList [data-slot="select-item"]`, `.option`, `.optionPick`, `.popoverFoot`; [OWN] dialog `text-[17px] font-semibold`, description `text-[13px]`, items `min-h-9 rounded-[9px] px-2.5 py-2 text-[13px]`, select checked `svg text-ds-brand-signal`. DIRECTION's overlay line says "title 16/500, description 13"; the kit CSS ships 18/500 and 14/450 to honour DIRECTION's own type line ("No 13px"). `studio.css` follows the kit CSS.

### Type, radius, tokens

- **RULE AK-27** Use three sizes and two weights: 12 (meta, hints, chips, captions; tracking 0; line 16 for labels, 17 for wrapping copy), 14 (body, labels, buttons, titles of rows and sections; -0.01em; line 20), 18 (screen and dialog titles; -0.02em; line 24); weight 450 for body and meta, 500 for every title, label, button and chip; tabular numerals on every count, price, duration and index.
  **Why** Off-scale one-offs (13px, 600) were the fastest tell of the rejected round.
  **Applies to** SaaS app UI. **Check** computed font sizes ⊆ {12, 14, 18}, weights ⊆ {450, 500}. **Source** [TOK] `--font-size-ds-12|14|18`, `--font-weight-ds-12|14` 450, `--font-weight-ds-18` 500, `--letter-spacing-ds-12|14|18` 0 / -0.01em / -0.02em; [KIT] line heights in `.eyebrow` 16, `.hint` 17, `.trayTitle` 20, `.screenTitle` 24; [DIR] Type; [FT] 2026-10-14/15. affectUI's own product type: 13px base (13/18.571), meta 12-12.5, card headings 18/600, weight 450 in data tables (13/20 and 14/20 w450) [AFF-T `type_scale.affectui`; AFF-C data-table `measure.type`; AFF-S screens-crm `measure.type`].

- **RULE AK-28** Keep one radius ladder, assigned by role and concentric where nested: tray and dialog 20; card, step tray, dropzone 16; control (field, button, segmented track, step pill, menu, list, summary tile) 12; media 12 (8 at 36px, 10 at 48px wide); row thumb and compact icon button 10; segmented option and list item 9; status chip and step index 8; media tag 7; badge-sized details 6; pills and dots round. Render every rounded box with continuous corners (`corner-shape: superellipse(1.32)` inside `@supports`, radius x1.2), capsules and dots stay round.
  **Why** A short ladder by role keeps neighbours consistent; the squircle is the founder's standing corner (BN-12).
  **Applies to** SaaS app UI. **Check** `shape.radius-ladder` <= 2 radii per height band; `shape.squircle` active where supported. **Source** [KIT] radii in `.tray` 20, `.card`/`.stepTray`/`.dropzone` 16, `.stepButton`/`.segmented`/`.media`/`.summaryGrid > div` 12, `.square` 10, `.segmentedOption`/`.option` 9, `.chip`/`.stepIndex` 8, `.mediaTag` 7, `.nameInput`/`.mediaNum` 6; [TOK] `--ds-radius-control: 12px`; [DIR] radius ladder; [FT] 2026-10-12 squircles; `system/effects/squircle.css`. affectUI ladder for comparison: 6 chip / 8 stage, inputs / 9-11-13 segmented / 12 source card, buttons / 14 library card / 16 product card / 20 tray / 32 assistant card [FHC §3.4; AFF-I `measure.radius` (999 ×298, 8 ×229, 6 ×95, 9 ×86, 14 ×85)]. The kit's own CSS does not set `corner-shape`; `studio.css` adds it.

- **RULE AK-29** Map colour through about fifteen role tokens and re-point them for dark; components never hard-code a hex except fixed overlays on imagery (white/black tags on photos). Light (affectUI component palette, the generic kit's default): canvas `#fff`, tray `#f0f0f0`, card `#fff`, ink `#171717`, secondary `#737373`, tertiary `#8f8f8f`, ring 8.5% ink, control edge 14% ink, accent `#2f6bff`, success `#2f9e5b`, danger `#e5484d`, focus `#1d93d2`. Dark (affectUI dark tokens): canvas `#0c0c0d`, tray `#121213`, card `#19191b`, field `#1f1f21`, ink `#ededed`, secondary `#8f8f8f`, tertiary `#ffffff66`, ring white 7%, hover white 7%.
  **Why** One mapping to maintain; dark mode exists the moment a component uses roles (ALN-02).
  **Applies to** SaaS app UI. **Check** `grep -c '#'` in component rules outside the token blocks counts only image overlays; dark block redefines roles only. **Source** [AFF-T] `colors.affectui_component_palette`, `colors.affectui_dark`, `motion.focus`; [AFF-H] `affectui.rootVars`; [TOK] `:root` and `.dark` (`--ds-surface-*`, `--ds-text-*`, `--ds-border-*`, `--ds-green-text`, `--ds-red-text`); [KIT] `.studio { --ring; --ring-strong; --tray; --track }`; [ALN] §1.2. Sellify's mapping (warm neutrals): light canvas `#ffffff`, work `#f7f7f6`, raised `#ffffff`, text `#211e1c / #79716d / #978f8b`, subtle `rgb(25 21 17 / 8.5%)`, control 14%, accent `#ff5900`; dark canvas `#131211`, work `#1a1817`, raised `#211f1d`, text `#efedec / #ada5a1 / #968f8a`, subtle `#302d2a`, control `#3b3734`, green `#5ee5b5`, red `#ff8a99` [TOK].

- **RULE AK-30** In dark, lift by fill steps (canvas < tray < card < field), keep one light ring per box (white 7-10%), never stack an outer ring with an inset top highlight, and invert the primary to a pale fill (`#ededed`-class, dark text) with an inset 7% white ring and a 26% black drop.
  **Why** Black shadows vanish on dark canvases; a double edge reads as a gap line (founder, Kite).
  **Applies to** dark UI. **Check** surface luminance strictly increases canvas -> tray -> card; no box-shadow list holds both `0 0 0 1px` and `inset 0 1px 0`. **Source** [AFF-T] `colors.affectui_dark` (`#0c0c0d / #121213 / #19191b / #1f1f21`, `hover_bg #ffffff12`, `border_soft #ffffff12`, `primary #ededed`, `primary_fg #121213`); [TOK] `.dark --ds-action-bg #efedec`, `--ds-action-shadow: inset 0 0 0 1px rgb(255 255 255 / 7%), 0 1px 3px rgb(0 0 0 / 26%)`; [FT] 2026-10-14 (one light ring, no double top border); BN-10.

### State language and motion

- **RULE AK-31** Hover, selected, focus and pressed follow one language: hover = 4% ink tint (rows 2%, options the interactive grey) or a 1px strong ring on media; selected = white pill + primary ink (segmented, steps), 500 weight + check (option lists), 2px gap + ring (media, picked rows); focus-visible = a 2px ring (outline offset 1 on pills, 2-3 on tiles and links, -2 inside lists), never the thick brand ring on fields; pressed = scale 0.97 on buttons and play (0.94 on the dialog close); every clickable element gets `cursor: pointer` and a hover state.
  **Why** The founder's complaint was hover and selected visuals that each screen invented ("just ass"); one grammar fixes it everywhere at once.
  **Applies to** SaaS app UI. **Check** audit: pointer on every clickable, hover diff exists, focus outline 2px. **Source** [KIT] block "hover / selected / focus: one language" (`.segmentedOption…:hover`, `.stepButton…:hover`, `.option:hover`, `.option[data-checked] .rowTitle`, `--ds-focus-indicator` ink 16%), block "interaction: pointer, hover, pressed", `.play:active`; [OWN] button `active:scale-[0.97]`, dialog close `active:scale-[0.94]`; [DIR] Interaction; [FT] 2026-10-14. affectUI hover examples: rows `rgba(0,0,0,.05)` over 140ms [AFF-C comments-panel, integration-picker `hoverStyle`]; source card `#ebebec` + inset 1.5px `#cfcfd3` [AFF-C ai-answer `hoverStyle`]; focus `outline: 2px solid #1d93d2; outline-offset: 2px` [AFF-H `affectui.focus`].

- **RULE AK-32** Motion tokens: ease `cubic-bezier(0.22, 1, 0.36, 1)`; hover colour 150ms; step index and step change 220ms (fade + 6px rise, no exit); content in 240ms (fade + 4px rise, no blur in product); disclosure height 300ms; pills 400ms; progress width 600ms; media filter 800ms. Loops only for live work: chip pulse 1.4s, sweep 2.4s, segment bar 1.6s, spinners. Under `prefers-reduced-motion` stop every loop and entrance and make state changes instant, without losing the state.
  **Why** One timing language makes a multi-step flow feel continuous; affectUI's rule is that reduced motion keeps every state change and drops the movement.
  **Applies to** SaaS app UI. **Check** transition durations ⊆ {150, 220, 240, 300, 400, 600, 800}ms with the shared ease; zero running animations with reduced motion. **Source** [KIT] `--ease`, `.stepIn` + `@keyframes studio-step-in`, `.stepIndex` 220ms, `.progressTrack > div` 600ms, `.media img` 500/800/600ms, `studio-pulse`, `studio-seg`, `studio-sweep`, `@media (prefers-reduced-motion: reduce)`; [DIR] Motion; [AFF-T] `motion.durations_ms` (hover 140-160, small enter 200-260, height glide 320-380), `motion.reduced_motion`; [AFF-C] every component `doc.Motion` ("With prefers-reduced-motion everything switches instantly"). DIRECTION's step change is "220ms fade and rise" and content in "240ms, rising 4px"; the kit's `.stepIn` rises 6px.

- **RULE AK-33** Text in secondary, tertiary, accent or danger roles passes 4.5:1 on every surface it sits on (tray, card, soft fills, both themes); keep affectUI's measured greys for icons and decoration only, and give text its own darker token (`--studio-ink-2/3`, `--studio-accent-text`, `--studio-danger-text`); white tags on imagery sit on at least 56% black.
  **Why** affectUI's measured tertiary (#8f8f8f, 3.2:1) and the soft accent pill (4.1:1) fail the engine's correctness gate at 12-14px; the kit preview failed `color.contrast` 66 times until the text tokens were darkened (2026-10-15).
  **Applies to** SaaS app UI. **Check** `tools/check.mjs` `color.contrast` 0 fails on `system/kits/product-studio/preview.html`. **Source** section 3.5 measurements; `tools/check.mjs` run on the kit preview, 2026-10-15 [engine note]

## 3. Numbers & scales

### 3.1 Anatomy (generic kit value, then sources)

| part | studio.css | Sellify kit [KIT] | affectUI measured | AlignUI [ALN] |
|---|---|---|---|---|
| page | max 1200, pad 24 (16 <= 860) | `.studio` same | content 1008 (marketing) [AFF-T spacing] | n/a |
| canvas aside | 316 (280 <= 1100), gap 16, sticky 16 | `.canvas`, `.stage` | n/a | n/a |
| tray | pad 4, r20, ring | `.tray` | AI Answer 20 / pad 4 [AFF-C ai-answer] | n/a |
| title strip | min-h 44, pad 4 4 6 16, gap 8, icon 16 | `.trayHead` | tray rows carry secondary items [FHC §4.1] | n/a |
| card | r16, ring, pad 16 | `.card` | r16, ring + 1-2px drop, pad 28 24 22 [AFF-H `otp-demo__card`] | n/a |
| footer strip | min-h 44, pad 4 4 0 16, 12px | `.trayFoot` | n/a | n/a |
| status chip | h24, pad 0 8, r8, dot 6, 12/500 | `.chip` | citation 20 / r6 / 11.5 w500 [AFF-C ai-answer `ui-ans__cite`]; category 22 pill 11/500 [AFF-T chips] | status badge h24 / px8 / r6 / label-xs [ALN §3.8] |
| step tray | pad 4, r16; step 52 / r12; index 24 / r8 | `.stepTray`, `.stepButton`, `.stepIndex` | step tabs 12.5px text on tray [AFF-C stepper-form] | stepper label-sm [ALN §3.8] |
| segmented | track 36 / pad 3 / r12; option 30 / r9 | `.segmented`, `.segmentedOption` | option 30 / r8 / 13.5px; sm 26 / r7; track r11 pad 3 [AFF-C segmented-control; FHC §2.4] | track r10 pad 4, item 28 / r6 [ALN §3.8] |
| media | 3:4 / 9:16, r12 (xs 36 r8, sm 48 r10) | `.media` | n/a (marketing stage 16:10 r8 [AFF-H `card__stage`]) | n/a |
| row | min-h 60, pad 10 16, gap 12 | `.row` | command item 40 / r10; combobox option 36 / r9 [AFF-C] | table cell 64, pad-x 12 [ALN §3.8] |
| row thumb | 36 / 44 r10, 56 r12 | `.square` | n/a | avatar 20-80 [ALN] |
| sticky bar | min-h 60, pad 12 24, top 1px ring | `.stickyFooter` | stepper footer "sticks to the bottom in long pages" [AFF-C stepper-form `doc.Responsive behavior`] | n/a |
| field | h36, r12, pad-inline 12 | owner `system` + `.fieldTrigger` | h36, r8-10, inset ring `#dcdcdf` [AFF-C stepper-form; FHC §4.6] | 40/36/32, r10/8/8 [ALN §3.8] |
| button | 36 / r12 / px16 (12 with icon) / gap 6 / icon 16 | owner `system` | 40 / r12 / px16; sm 32 / r10; lg 48 / r14 [AFF-C button] | 40/36/32/28, r10/8/8/8 [ALN §3.8] |
| dialog | r20, pad 24, gap 18, w 480 / 560 | owner `system` + `.dialog` | n/a | modal 400, r20 [ALN §3.8] |
| menu / list | r12, pad 5, item 36 / r9, offset 6 | owner `system` + `.popoverList` | popover shadow 18/40/-12 [AFF-C combobox] | dropdown r16 pad 8, item r8 [ALN §3.8] |

### 3.2 Type [TOK] [KIT]

| size | weight | tracking | line height | used for |
|---|---|---|---|---|
| 12 | 450 (500 for chips, labels in pills) | 0 | 16 (labels) / 17 (wrapping copy) | eyebrow, hint, meta, caption, chip, tag, cost |
| 14 | 450 body / 500 titles, labels, buttons | -0.01em | 20 (18 in step labels) | body, row title, section title, field label, button, menu item |
| 18 | 500 | -0.02em | 24 | screen title, dialog title, big status title |

### 3.3 Colour tokens (studio.css defaults)

| token | light | dark | source |
|---|---|---|---|
| `--studio-canvas` | `#ffffff` | `#0c0c0d` | AFF-T `affectui_light.page` / `affectui_dark.bg` |
| `--studio-tray` | `#f0f0f0` | `#121213` | AFF-T `component_palette.tray` / `affectui_dark.panel` |
| `--studio-card` | `#ffffff` | `#19191b` | AFF-T `.card` / `affectui_dark.card` |
| `--studio-field` (in cards) | tray 55% toward card (`#f6f6f6`) | `#1f1f21` | KIT `--field-fill` / AFF-T `affectui_dark.preview` |
| `--studio-ink` | `#171717` | `#ededed` | AFF-T `component_palette.ink` / `affectui_dark.text` |
| `--studio-ink-2` | `#737373` measured, kit ships `#5f5f5f` | `#8f8f8f` measured, kit ships `#a1a1a1` | AFF-T `text_muted` (both themes); darkened for AA, see AK-33 |
| `--studio-ink-3` | `#8f8f8f` measured, kit ships `#6b6b6b` | `#ffffff66` measured, kit ships `#8f8f8f` | AFF-T `component_palette.muted` / `affectui_dark.text_subtle`; darkened for AA, see AK-33 |
| `--studio-ring` | ink 8.5% | white 7% | KIT `--ring` (TOK subtle 8.5%) / AFF-T `border_soft #ffffff12` |
| `--studio-edge` | ink 14% | white 10% | TOK `--ds-border-control` 14% / FT 2026-10-14 (white 7-10%) |
| `--studio-edge-strong` | ink 18% | white 12% | KIT `--field-edge-hover` / BN §2 (Linear 12%) |
| `--studio-hover` | ink 4% | white 7% | KIT hover language / AFF-T `affectui_dark.hover_bg` |
| `--studio-accent` | `#2f6bff` (text in the hue: `--studio-accent-text` `#2458e0`) | `#2f6bff` (text `#6b9bff`) | AFF-T `component_palette.accent`; text values computed for AA |
| `--studio-success` / `--studio-danger` (danger text `#c9353a` light) | `#2f9e5b` / `#e5484d` | `#5ee5b5` / `#ff8a99` | AFF-T palette / TOK `.dark` green, red text |
| `--studio-focus` | `#1d93d2` | `#1d93d2` | AFF-T `motion.focus.affectui`; AFF-H `focus` |
| `--studio-primary` / hover / fg | `#171717` / `#2c2d2f` / `#ffffff` | `#ededed` / `#e4e4e7` / `#121213` | AFF-T `primary`, `adfects.btn_ink_hover`, dark pill gradient stop |
| scrim | black 45% + blur 2 | black 60% | OWN dialog `system` |

### 3.4 Motion [KIT] [DIR] [AFF-T]

| token | value |
|---|---|
| ease | `cubic-bezier(0.22, 1, 0.36, 1)` |
| hover colour | 150ms (affectUI 140-160ms on plain `ease`) |
| state (index, step change) | 220ms; step change fades in rising 6px |
| content in | 240ms, rising 4px, no blur |
| disclosure | 300ms |
| pill slide | 400ms (affectUI left 400ms, width 320ms) |
| progress width | 600ms |
| media develop | filter 800ms, transform 500ms, opacity 600ms |
| loops | pulse 1.4s ease-in-out; sweep 2.4s ease-in-out; segment 1.6s; affectUI shimmer 1.6s linear |
| press | scale 0.97 (affectUI primary 0.99, icon 0.94) |

### 3.5 Measured contrast (computed 2026-10-15 from the token values above)

| pair | ratio |
|---|---|
| `#8f8f8f` on `#fff` (affectUI tertiary) | 3.23:1 |
| `#978f8b` on `#fff` (Sellify tertiary) | 3.17:1 |
| `#737373` on `#fff` (affectUI secondary) | 4.74:1 |
| `#1d93d2` on `#fff` / on `#19191b` (focus) | 3.41:1 / 5.15:1 |
| Sellify focus ring (`#ff5900` at 10% over white) | 1.13:1 |
| ink at 8.5% ring over white | 1.19:1 |
| `#ffffff66` on `#19191b` (dark tertiary) | 3.81:1 |
| kit `#6b6b6b` / `#5f5f5f` on `#f0f0f0` tray | 4.68:1 / 5.60:1 |
| kit `#2458e0` on `#f1f5ff` (current step), `#c9353a` on `#fff` (danger text) | 5.43:1 / 5.18:1 |
| kit dark `#8f8f8f` / `#a1a1a1` on `#121213` | 5.79:1 / 7.25:1 |

## 4. Dos and Don'ts

| Do | Don't | Source |
|---|---|---|
| Grey tray, title strip on the grey, one white card, footer strip | A padded grey section box holding several bordered cards | DIR round 1 reject; FT 2026-10-15 |
| Plain 16px secondary icon beside the section title | A black or coloured icon tile | FT 2026-10-14 |
| Field on a white card in the lighter work grey with a 10% edge | White field on a white card; `!important` overrides | DIR overrides; FT 2026-10-14 |
| One status chip, fixed words, a dot (or one icon) | Filled badges, coloured icon tiles, a new word per screen | KIT `.chip`; APR-03 |
| Segmented control or tall segmented options for a choice | Bordered choice tiles invented for one screen | FT 2026-10-15 |
| 12 / 14 / 18 at 450 / 500 | 13px and 600 one-offs (also the owners' 13px items and 17/600 titles) | KIT overlay overrides; DIR Type |
| Overlay with one shadow ring, border transparent | Border + shadow ring (double edge) | KIT `.menu`, `.selectList`; FT 2026-10-14 |
| Selected media: 2px gap + 1.5px ring | Tinted selected rows, accent outlines, image zoom on hover | DIR Media |
| Square row thumbnail 36/44 r10 | A 9:16 sliver in a list row | FT 2026-10-14 |
| Grid columns from the item count, wrap into rows | Fixed 4 columns that leave two items floating, or squeeze labels | DIR content volume |

## 5. Exceptions & judgement calls

- **Kit over measurement, on purpose.** Three affectUI values are overridden by DIRECTION and recorded there: white inputs become grey work fields; entrance blur is dropped in product; 13px / 400 / 600 type becomes 12/14/18 at 450/500. Copy affectUI's grammar (tray, ring, pill, sweep, motion curve), not those three values.
- **Card shadow.** affectUI cards carry a 1-2px 4% drop under the ring; the kit uses the ring only. With a 4px tray inset and a grey tray, the drop adds a second edge at the bottom; ring-only keeps BN-04 (one edge per box). [engine note]
- **Two line heights at 12px** (16 for one-line labels, 17 for hints and meta that can wrap) are in the shipped kit; keep both rather than inventing a third. [engine note]
- **Dot chip vs icon badge.** If the host app already has a status Badge with icons and the founder accepted it on that app, use the host's (the kit rule is "build from the app's own kit", FT 2026-10-15); the dot chip is the generic default. [engine note]
- **Column minimums.** 150px for 9:16 views and 176px for libraries go under the founder's ~200px rule; tiles with two buttons hold 200px (APR, section 5).
- **Focus colour.** The generic kit uses affectUI's `#1d93d2` 2px outline (3.41:1 on white) instead of Sellify's 10% brand ring (1.13:1), because ALN-11 requires >= 3:1. Map `--studio-focus` to the host's focus token only if that token passes 3:1. [engine note]
- **Tertiary text contrast.** Both sources set tertiary text at about 3.2:1 on white, below 4.5:1 for 12px text. Use tertiary only for non-essential meta (captions, counts beside a label that already says it); essential hints use secondary. [engine note]
- **Menu concentricity.** Owner menus are r12 with 5px padding and r9 items; BN-06 would give r7. The kit keeps 9 (DIRECTION's spec; items read as pills, not inset panels). Revisit if the founder flags it.

## 6. Figures worth keeping

- `knowledge/benchmarks/flohoeller/affectui-c-segmented-control*.png`, `affectui-c-stepper-form*.png`, `affectui-c-ai-answer*.png`, `affectui-c-button*.png`, `affectui-c-command-menu*.png`, `affectui-c-dropzone*.png`: the measured anatomy (light and `-dark`).
- `knowledge/benchmarks/flohoeller/affectui-screens-crm*.png`, `affectui-screens-app-shell*.png`: affectUI in-app density (450-weight tables, 8px radii).
- `~/Documents/sellify sth/eng-2105-guided-set/frame-approval/`: the kit in a real flow (generating, review, mixed, approved, stress, error).
- `system/kits/product-studio/preview.html`: every kit component in light and dark (screenshot it after changes).

## 7. Open questions

- **Status chip shape.** Founder rule 2026-10-14: outlined chip with a coloured dot. DIRECTION Status + `StudioStatus` in the panel: product Badge `rounded="lg"` with check / alert / spinner, "No dot-chips". The kit CSS still contains the dot `.chip`. Unresolved; ask the founder which is current.
- **Selected ring colour.** DIRECTION: ink. Kit CSS: brand signal (`--ds-brand-signal`) on `.tile9[aria-pressed]`, `.pickRow[aria-checked]`, `.stripButton[aria-pressed] .stripThumb`, `.listItem[data-selected] .square`.
- **Field row gap.** DIRECTION 16; kit CSS 14 (6 in dialogs).
- **Dialog type.** DIRECTION overlay line: title 16/500, description 13. Owner: 17/600 and 13. Kit CSS: 18/500 and 14/450.
- **Option rows.** DIRECTION: select items 36 tall. Kit `.optionPick` (popover pickers with a meta line): min-height 44.
- **Content-in rise.** DIRECTION 4px at 240ms; kit `.stepIn` 6px at 220ms; no 240ms entrance exists in the kit CSS.
- **Segmented slide.** DIRECTION 400ms slide; kit CSS has no sliding element (fill swaps at 150ms).
- **Dark `--ds-border-strong`** is `#312d2b`, darker than `--ds-border-control` `#3b3734` [TOK `.dark`], so "strong" hover edges get weaker in dark. Looks like a token bug; not verified in render.
- **Step caption overflow.** APR open questions report the caption running under the current pill at 1100px; `.stepText { flex-shrink: 0 }` [KIT] is the likely cause. `studio.css` sets `min-width: 0; flex-shrink: 1` (untested against the founder's eye).
- **Kit chrome numbers.** The 84px right padding on the bar and the `100dvh - 28px / 84px` screen heights are Sellify chrome; their origin (assistant launcher? header?) is not documented in the kit.
- **affectUI dark component measurements.** Only the dark token set (AFF-T `affectui_dark`) and `-dark.png` screenshots exist; no per-component dark computed styles were captured, so dark shadows for floating layers come from AFF-T `shadows.pop_dark` only.
- **Danger button, empty state, skeleton row, toast in the kit.** Not in the kit CSS (owners handle them); affectUI shows a destructive button `#ffe6e9` with `rgb(255,0,0)` text [AFF-C button], which fails taste and contrast; no sourced recipe for the generic kit yet.
- **Textarea padding** is the owner's (not read); `studio.css` uses AlignUI's 12 x 10 [ALN §3.8 Textarea].
- `index-pages-measure.json` was used only for the library-wide radius and type histograms; its screens/blocks pages add nothing for in-app anatomy.
