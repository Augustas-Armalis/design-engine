---
source: web:https://www.joshwcomeau.com/ (custom-css-reset, stacking-contexts, rules-of-margin-collapse, interactive-guide-to-flexbox, interactive-guide-to-grid, subgrid, full-bleed, center-a-div, height-enigma, understanding-layout-algorithms, transforms, container-queries-introduction, container-queries-unleashed, anchor-positioning, has, css-variables-for-react-devs, surprising-truth-about-pixels-and-accessibility, browser-support, color-formats, react/dark-mode) - fetched 2026-10-08
chapter: Josh Comeau - CSS layout mechanics, resets, stacking, units, container/anchor queries, variables
pages: n/a (web sources; each article re-read from saved HTML)
topic_tags: [css-reset, stacking-context, z-index, margin-collapse, flexbox, grid, subgrid, full-bleed, centering, container-queries, anchor-positioning, has-selector, rem, accessibility, browser-support, css-variables, dark-mode, tap-targets]
status: studied
---

# Josh Comeau: layout algorithms and CSS mechanics

Raw text: `corpus/web/comeau-heckel/comeau/*` (private, gitignored). Own words; numbers copied exactly. Companion: `comeau-css-depth-motion.md` (shadows, glass, gradients, transitions) and `heckel-shaders-and-effects.md`. Rule ids `JC-LM-nn`. Evidence tags: **[source]** stated in the article; **[verified]** reproduced in Chromium 156.0.8078.4 through Playwright on 2026-10-08; **[engine note]** my inference; everything else [untested].

---

## 1. Core ideas

1. **CSS is a set of layout algorithms (Flow, Flexbox, Grid, Positioned, Table), not a bag of properties.** A property is an input; each algorithm decides what it means. `width: 2000px` is a hard rule in Flow but a mere "hypothetical size" in a flex row; `z-index` works in Flex/Grid items without `position`. Debug by first naming the algorithm in force.
2. **Stacking contexts make `z-index` local.** A big number inside one context can never beat a small number in a sibling context. Many things create one silently (`opacity < 1`, `transform`, `filter`, `will-change`, `position: fixed|sticky`, `mix-blend-mode`, `isolation`). `isolation: isolate` is the clean, side-effect-free way to seal a component.
3. **Margin is for siblings, padding is for the inside.** Vertical margins collapse (adjacent siblings, parent with first/last child, empty blocks); horizontal never do; Flex/Grid children never do. Use `gap` and layout primitives rather than relying on collapse.
4. **Width flows down, height flows up.** Block widths come from the parent; block heights come from the children. `height: 50%` is circular unless an ancestor has a knowable height, so switch the parent to grid/flex and let the child fill.
5. **Flexbox is about distributing a group along one axis; the cross axis is per item.** That is why `justify-content` (group) and `align-items` (items) exist but `justify-items` does not in Flexbox. Items refuse to shrink below their minimum content size unless you set `min-width: 0`.
6. **Grid defines the compartments in CSS.** `fr` shares what is left; percentages plus `gap` overflow. Subgrid lets nested elements share the parent's tracks, which fixes alignment across sibling cards. Reading order for keyboards still follows the DOM.
7. **Container queries make components size-aware; media queries remain for page-level flips.** The killer pattern is a sub-layout inside a media-query layout that reacts to its own column width, with one intentional breakpoint number.
8. **Units encode accessibility decisions.** Ask "should this value grow with the user's default font size?" rem for type, vertical spacing text-related, media/container queries; px for hairlines and borders; `min-height` not `height`; test at 32 px and 48 px default font size.
9. **Progressive enhancement beats lowest-common-denominator.** Judge a new CSS feature by (1) what the fallback looks like, (2) your actual audience's browsers, (3) the harm if it is broken. Simulate non-support by deleting the declaration.
10. **Small, owned resets.** A 12-declaration reset the team owns beats an imported one; do not retrofit one onto an existing codebase.

---

## 2. Rules

### A. Baseline reset

- **RULE [JC-LM-01]** Start new projects with a small owned reset: `*,*::before,*::after{box-sizing:border-box}`; `*:not(dialog){margin:0}`; `body{line-height:1.5;-webkit-font-smoothing:antialiased}`; `img,picture,video,canvas,svg{display:block;max-width:100%}`; `input,button,textarea,select{font:inherit}`; `p,h1-h6{overflow-wrap:break-word}`; `p{text-wrap:pretty}`; `h1-h6{text-wrap:balance}`; `#root,#__next{isolation:isolate}`; and, inside `@media (prefers-reduced-motion:no-preference)`, `html{interpolate-size:allow-keywords}`. Released into the public domain by the author.
  **Why** each line removes a recurring bug class (below). Do not retrofit onto an existing codebase without full regression testing. **Applies to** all new projects. **Check** the computed style of `*` has `box-sizing:border-box`; `p` has `text-wrap:pretty`; headings `balance`; `button` font-size equals body font-size.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/
- **RULE [JC-LM-02]** Use `box-sizing: border-box` on every element and pseudo-element via the universal selector (no performance penalty, contrary to the myth).
  **Why** with the default content-box a `width:100%` box plus 20 px padding and a 2 px border becomes 244 px inside a 200 px parent. **Applies to** all. **Check** `getComputedStyle(el).boxSizing === 'border-box'` for a sample including `::before/::after`.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/
- **RULE [JC-LM-03]** Remove default margins (`*:not(dialog){margin:0}`) and re-add spacing deliberately; keep `<dialog>` default `margin:auto` (centres it).
  **Why** margin is a design decision; the dialog exemption was a later fix (Dec 2025 changelog). **Applies to** all. **Check** `p`, `h1`, `ul` computed margins are 0 before component CSS; `dialog` keeps auto.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/
- **RULE [JC-LM-04]** Body `line-height: 1.5`; headings get a smaller value chosen per design.
  **Why** dyslexia-friendly default; note WCAG requires that users *can* raise line-height to 1.5 without breakage, not that you ship 1.5 (corrected March 2026). Large type at 1.5 looks too airy. **Applies to** body text. **Check** body line-height / font-size in [1.4, 1.65]; headings < body.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/
- **RULE [JC-LM-05]** Make replaced elements layout-friendly: `img, picture, video, canvas, svg { display:block; max-width:100% }`; `max-width: revert` for deliberately oversized (e.g. 120%) images.
  **Why** images are inline by default (the mysterious ~4 px gap under them is line-height) and keep their intrinsic size inside narrow parents. **Applies to** all. **Check** `img` computed `display:block`; no horizontal overflow at 320 px.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/
- **RULE [JC-LM-06]** Form controls inherit typography: `font: inherit`. Inputs must resolve to >= 16 px (1rem) to avoid iOS focus auto-zoom.
  **Why** Chrome defaults inputs to 13.333 px, textareas to monospace. **Applies to** forms, mobile. **Check** `getComputedStyle(input).fontSize >= 16` and `fontFamily` equals the body font.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/
- **RULE [JC-LM-07]** Apply `-webkit-font-smoothing: antialiased` to body on Mac-facing sites (it is controversial; opinion).
  **Why** Mojave (2018) dropped subpixel antialiasing in macOS itself, but Chrome/Safari on macOS still default to it; the old "Stop fixing font smoothing" advice predates retina displays. No effect on Windows, Linux, mobile. **Applies to** all (opinion). **Check** body `-webkit-font-smoothing` is `antialiased`.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/
- **RULE [JC-LM-08]** `overflow-wrap: break-word` on text blocks (consider every element); `hyphens: auto` only for very narrow columns. `text-wrap: pretty` for paragraphs (avoids a one-word last line; support ~72% Nov 2024; no perf difference detected on a Celeron laptop) and `text-wrap: balance` for headings (~87%).
  **Why** long URLs and words burst containers; both text-wrap values are pure enhancements. **Applies to** all text. **Check** `overflow-wrap` on `p, h1-h6`; computed `text-wrap`. [verified] `CSS.supports('text-wrap','pretty'|'balance')` true in Chromium 156.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/ ; https://www.joshwcomeau.com/css/browser-support/
- **RULE [JC-LM-09]** Give the app root `isolation: isolate` so portals/modals/dropdowns always out-rank the page without a z-index race.
  **Why** creates a root stacking context with no side effects. **Applies to** React/SPA. **Check** `#root`/`#__next` computed `isolation:isolate`.
  **Source** https://www.joshwcomeau.com/css/custom-css-reset/

### B. Stacking contexts and z-index

- **RULE [JC-LM-10]** Treat `z-index` values as local to their stacking context. If a high z-index loses, list the ancestors that create contexts and compare their z-indexes instead.
  **Why** [verified] header `z-index:2` beat a tooltip `z-index:999999` because the tooltip sat in a `main { position:relative; z-index:1 }` context; with `main` having no z-index, the tooltip won. **Applies to** all. **Check** for every element with `z-index >= 100`, walk ancestors and report those that create a context.
  **Source** https://www.joshwcomeau.com/css/stacking-contexts/
- **RULE [JC-LM-11]** Know what silently creates a stacking context: `position` + `z-index`; `position: fixed|sticky`; `opacity` < 1; `mix-blend-mode` != normal; `transform`, `filter`, `clip-path`, `perspective`; `will-change` with such a property; a `z-index` child in a flex/grid container; `isolation: isolate`.
  **Why** [verified] each of `z-index:1`, `will-change: transform`, and `isolation: isolate` on `main` trapped the tooltip under the `z-index:2` header at `elementFromPoint`. **Applies to** all. **Check** lint `will-change:\s*transform|opacity` on layout wrappers and large containers.
  **Source** https://www.joshwcomeau.com/css/stacking-contexts/
- **RULE [JC-LM-12]** Seal reusable components with `isolation: isolate` on their root rather than `position:relative; z-index:1`; treat explicit z-index as an escape hatch like `!important`.
  **Why** isolation adds no z-value assumption and no visual side effect; components stay composable. **Applies to** component libraries. **Check** components with internal z-index (layers 1 to 5) have `isolation: isolate` on their root.
  **Source** https://www.joshwcomeau.com/css/stacking-contexts/
- **RULE [JC-LM-13]** `z-index` also works on flex and grid items without `position`; do not add `position: relative` just to enable it.
  **Why** layout algorithms implement the property themselves. **Applies to** all. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/stacking-contexts/ ; https://www.joshwcomeau.com/css/understanding-layout-algorithms/
- **RULE [JC-LM-14]** Debug stacking with devtools aids (Edge 3D view, z-index extensions) instead of guessing.
  **Why** CSS gives no warnings. **Applies to** debugging. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/stacking-contexts/

### C. Margin, padding, gap

- **RULE [JC-LM-15]** Remember the collapse rules: only vertical margins collapse; only adjacent in-flow elements (even a `<br>` blocks it); the larger positive margin wins; a parent and its first/last child collapse when nothing separates them (padding, border, height gap, scroll container, `display: flow-root`); zero margins still collapse; mixed positive and negative margins add; with several margins: largest positive + most negative.
  **Why** explains "my child's margin pushed the parent". [verified] two siblings with 30 px margins sat 30 px apart; a child with `margin-top:50px` inside a plain parent left the parent's top where the child's box began (no gap inside), while `display:flow-root` on the parent kept the 50 px inside. Flex and Grid children, floats and absolutely positioned items never collapse. **Applies to** flow layout. **Check** flag `margin-top` on the first child of a background-coloured block without padding/border/flow-root.
  **Source** https://www.joshwcomeau.com/css/rules-of-margin-collapse/
- **RULE [JC-LM-16]** Prefer `gap` (Flex/Grid) or layout primitives over margin for spacing between siblings, and use padding to separate a child from its parent's edge.
  **Why** margin is about sibling distance and may transfer to the parent. **Applies to** all. **Check** `margin` used only for auto-centering/negative bleed; spacing in lists via `gap`.
  **Source** https://www.joshwcomeau.com/css/rules-of-margin-collapse/ ; https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/

### D. Flexbox

- **RULE [JC-LM-17]** In Flexbox treat `width`/`flex-basis` as hypothetical sizes. Make a child unshrinkable (icons, avatars, circles) with `flex-shrink: 0`, not with a `min-width`; let long content shrink by setting `min-width: 0` on the flex child (columns: `min-height: 0`).
  **Why** flex items will not shrink below their minimum content size (text inputs ~170 to 200 px; longest unbreakable word), so content overflows even with `flex-shrink: 1`. Use `min-width: 0` carefully, the guardrail exists. [verified] **Applies to** all. **Check** icon/avatar flex children have `flex-shrink:0`; truncating text columns have `min-width:0`.
  **Source** https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- **RULE [JC-LM-18]** Fluid form row without breakpoints: `display:flex; flex-wrap:wrap; align-items:flex-end; gap:16px`; name `flex-grow:1; flex-basis:160px`; email `flex-grow:3; flex-basis:200px`; button `flex-basis:80px`.
  **Why** wrapping uses hypothetical size; grow ratios share leftover space (1:3). The "deconstructed pancake" uses `flex-wrap` with basis values. **Applies to** forms, card rows. **Check** n/a (visual at 4 container widths).
  **Source** https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- **RULE [JC-LM-19]** Use auto margins in Flexbox to push groups apart (`margin-right: auto` on the logo item, nav links stay right). Use `align-content` to position wrapped rows as a group.
  **Why** auto margins consume extra space exactly where you place them. **Applies to** headers, toolbars. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- **RULE [JC-LM-20]** Reach for Flexbox when arranging items in a row/column and letting them reflow; reach for Grid when you define rows and columns. Neither is obsolete.
  **Why** they solve different problems (e.g. the pancake stack is hard in Grid). **Applies to** all. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/

### E. Grid and subgrid

- **RULE [JC-LM-21]** Prefer `fr` columns to percentages when a `gap` exists; percentages are rigid and overflow by the gap size, `fr` shares what remains. Use `repeat(n, 1fr)`; `minmax(100px, 1fr)` with `auto-fill`/`auto-fit` for fluid card grids.
  **Why** `fr` also respects minimum content size. **Applies to** all. **Check** `grid-template-columns` with `%` units plus `gap` is flagged.
  **Source** https://www.joshwcomeau.com/css/interactive-guide-to-grid/
- **RULE [JC-LM-22]** Grid line numbers index lines, not cells: a 4-column grid has 5 lines; `grid-column: 1 / -1` spans everything; `span 2` for featured items; `grid-auto-flow: dense` fills holes when order is unimportant; `grid-template-areas` for named layouts with a fixed number of rows/columns.
  **Why** avoids off-by-one errors. **Applies to** layouts. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/interactive-guide-to-grid/
- **RULE [JC-LM-23]** Match DOM order to visual order when placing items by grid cell; tab order follows the DOM. `reading-flow`/`reading-order` fix this but were only in Chromium (~67%, May 2026).
  **Why** focus would jump unpredictably. **Applies to** all. **Check** tab through; focus order equals visual reading order.
  **Source** https://www.joshwcomeau.com/css/interactive-guide-to-grid/
- **RULE [JC-LM-24]** Subgrid for cross-card alignment: parent grid defines columns; child spans them with `display:grid; grid-template-columns: subgrid`. For rows, reserve rows on the child (`grid-row: span N`, or `span 99` when unknown) with `grid-template-rows: subgrid`; line numbers restart inside the subgrid; gap can differ in the subgrid.
  **Why** pricing tiers and portfolio cards align features/images across siblings. [verified] row alignment across cards. Gotchas: only one cell is occupied unless you reserve rows; `auto-fill` fluid grids do not combine with subgrid column counts; empty reserved rows still carry `gap`. **Applies to** pricing tables, card grids. **Check** features in adjacent cards share the same top coordinate.
  **Source** https://www.joshwcomeau.com/css/subgrid/
- **RULE [JC-LM-25]** A grid can stack items in one cell (`grid-row:1; grid-column:1` for each) and `place-items: center` aligns them; two-line centring is `display:grid; place-content:center`.
  **Why** back-to-front layering without absolute positioning. **Applies to** hero overlays, avatars. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/center-a-div/ ; https://www.joshwcomeau.com/css/interactive-guide-to-grid/

### F. Sizing, centring, full-bleed

- **RULE [JC-LM-26]** A percentage height needs a knowable parent height. Fix by making the parent `display:grid` (child fills automatically) or `display:flex` with `flex:1`, not by stacking percentages. `min-height` does not make a height "knowable".
  **Why** `height:50%` against `height:auto` is circular so browsers ignore it; percentage heights resolve against the parent's *content box*; `width:100%` + margin overflows whereas `width:auto` adapts. **Applies to** all. **Check** `height: <n>%` on a child whose parent is `height:auto` is flagged.
  **Source** https://www.joshwcomeau.com/css/height-enigma/
- **RULE [JC-LM-27]** Centring decision tree: single block in flow -> `max-width: fit-content; margin-inline: auto`; floating UI (modal/banner) -> `position:fixed; inset:0; width/height; max-width:100vw; max-height:100dvh; margin:auto`; stack of layers -> grid single cell; text -> `text-align:center` (combine with any); everything else -> Flexbox (`justify-content:center; align-items:center`), which survives overflow symmetrically.
  **Why** each method has a niche; `place-content:center` shrinks percentage-sized children because grid cell sizing differs. Offsetting a fixed-and-auto-margin element: setting `bottom: 48px` moves it only 24 px (it floats between the boundaries), so use a transform or accept half. **Applies to** all. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/center-a-div/
- **RULE [JC-LM-28]** Full-bleed article layout: `.wrapper{display:grid; grid-template-columns: 1fr min(42rem,100%) 1fr}`; `.wrapper > *{grid-column:2}`; `.full-bleed{grid-column:1 / -1; width:100%}`. Add side padding either with `gap: 0 16px` and `calc(100% - 32px)` or with `padding-inline` on the wrapper and `margin-inline: calc(var(--pad) * -1)` on bleed children.
  **Why** one declaration set gives a centred reading column with breakouts. Line length 65 characters ideal, 45 to 85 acceptable; the `ch` unit is relative to the element's font-size so rem is more stable for the column. **Applies to** articles, docs. **Check** reading column width in [45ch, 85ch] equivalent; breakout images span the viewport.
  **Source** https://www.joshwcomeau.com/css/full-bleed/
- **RULE [JC-LM-29]** `transform: translate()` percentages refer to the element's own size, so `translateY(-100%)` places an element exactly above its container with no knowledge of its height; combine with `calc(0% + 8px)` for a buffer. Transforms apply right-to-left, rotate around `transform-origin`, never alter layout, and do not apply to inline elements (use `inline-block`).
  **Why** handy for close buttons, tooltips, popovers. **Applies to** all. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/transforms/

### G. Units and accessibility

- **RULE [JC-LM-30]** Decide per value whether it should scale with the user's default font size. Rem for font sizes, vertical text spacing (em is acceptable for heading/paragraph margins), widths of text-bearing controls (buttons) and breakpoint thresholds; px for borders and hairlines; horizontal padding is a judgment call (rem amplifies the narrow-column problem when text is enlarged).
  **Why** zoom scales pixels, but only rem/em respond to the browser's default font-size setting; WCAG needs 200% zoom. **Applies to** all. **Check** font-size declarations use rem/em, not px; render at default font 32 px and 48 px and verify no clipped or overlapping text.
  **Source** https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/
- **RULE [JC-LM-31]** Write media and container query thresholds in rem (e.g. `min-width: 50rem`), because a user who enlarges the default font should get the compact layout.
  **Why** with 32 px default font, 50 rem becomes 1600 px; showing the mobile layout there is the better experience than a crowded desktop one. **Applies to** all. **Check** no `px` in `@media (min-width` or `@container` conditions.
  **Source** https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/ ; https://www.joshwcomeau.com/css/container-queries-introduction/
- **RULE [JC-LM-32]** Use `min-height` (not `height`) and `max-width: 100%` on text-bearing fixed-size controls so larger text can wrap and grow.
  **Why** fixed heights clip enlarged text. **Applies to** buttons, inputs, cards. **Check** `height: <px>` on elements containing text is flagged.
  **Source** https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/
- **RULE [JC-LM-33]** Do not use the 62.5% root font-size trick. Convert pixel designs to rem with `calc(18rem / 16)` or with variables such as `--18px: 1.125rem`.
  **Why** it breaks third-party widgets (text 37.5% smaller), browser extensions, and cannot be adopted incrementally. Example conversions: 14px = 0.875rem, 15 = 0.9375, 16 = 1, 17 = 1.0625, 18 = 1.125, 19 = 1.1875, 20 = 1.25, 21 = 1.3125. **Applies to** all. **Check** `html{font-size}` is not a percent below 100%.
  **Source** https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/
- **RULE [JC-LM-34]** Define a touch-aware tap-target variable: `--min-tap-target-height: 32px` by default and `48px` under `@media (pointer: coarse)`; apply as `min-height` to buttons, inputs and other tappables.
  **Why** pointer type, not viewport width, decides precision; industry guideline 44 to 48 px. **Applies to** mobile, forms. **Check** under emulated coarse pointer, interactive controls have height >= 44 px.
  **Source** https://www.joshwcomeau.com/css/css-variables-for-react-devs/

### H. Container queries, anchor positioning, :has

- **RULE [JC-LM-35]** Use container queries for components whose layout depends on their slot: `.slot{container-type:inline-size}` and an `@container (min-width: 19rem)` rule on a child (not on the container itself). Prefer `min-width` queries (older browsers just keep the base layout), a single intentional breakpoint number, and `container: name / inline-size` when choosing among nested containers.
  **Why** a container cannot respond to its own size (that was the "impossible problem"; `contain` breaks the loop); media-query hacks (e.g. 35rem-42rem OR 60rem) are fragile magic numbers. Typical use: a media query flips 2 columns to 1, and inner metadata switches sparse/condensed by column width. [verified] the query on the child fires from the wrapper's width. **Applies to** all. **Check** container-type set on a wrapper, query rules apply to descendants.
  **Source** https://www.joshwcomeau.com/css/container-queries-introduction/ ; https://www.joshwcomeau.com/css/container-queries-unleashed/
- **RULE [JC-LM-36]** Anchor-position tooltips and dropdowns natively: `.anchor{anchor-name:--a}`; `.target{position:fixed; position-anchor:--a; position-area:top; position-try-fallbacks:flip-block; margin-bottom:8px}`.
  **Why** the browser re-flows on overflow; use `fixed` so the viewport is the containing block (fallbacks never trigger for `absolute` inside a scrolling parent); `margin` flips with `flip-block`; once a fallback is chosen it sticks until it overflows again. Support: all engines since Jan 2026 but only ~81% (Jul 2026); level 2 anchored container queries ~64%, Chromium-only. [verified] `CSS.supports('position-area','top')` true in Chromium 156. Fallback pattern: base `top:0`, then `@supports (position-area: top){ top: revert; ... }`. **Applies to** tooltips, menus, popovers. **Check** targets using `position-area` are `position:fixed` and have a plain fallback.
  **Source** https://www.joshwcomeau.com/css/anchor-positioning/
- **RULE [JC-LM-37]** Put the focus ring on the parent card when an inner control changes size: `.card:has(button:focus-visible){outline:2px solid var(--primary)}` and `.card button{outline:none}` both inside `@supports selector(:has(*))`.
  **Why** inner outlines shift with morphing children; `:focus-within` would also fire for mouse clicks, `:has(:focus-visible)` does not. Keep the default outline in unsupported browsers. **Applies to** bento cards, composite controls. **Check** no `outline:none` outside the `@supports` block.
  **Source** https://www.joshwcomeau.com/css/has/
- **RULE [JC-LM-38]** `:has()` is cheap enough for global state: `html:has([data-disable-document-scroll="true"]){overflow:hidden}` lets a modal lock page scroll by rendering one attribute; on 2500+ DOM nodes the selector took ~0.1 ms on a $100 Celeron laptop (Chrome selector stats).
  **Why** removes imperative effect/cleanup code. Support ~92% (Sep 2024); use as enhancement. [verified] `CSS.supports('selector(:has(*))')` true. **Applies to** modals, themes. **Check** modals use the attribute approach, not inline `overflow:hidden` on body.
  **Source** https://www.joshwcomeau.com/css/has/

### I. Variables, theming and browser support

- **RULE [JC-LM-39]** Custom properties are inherited properties, not globals: define theme tokens on `html`/`:root`; `var(--x, fallback)` for defaults; they cannot be used inside media-query conditions; types are lost (no static check); animate by registering with `@property`.
  **Why** scoping is a feature (`--shadow-color` re-set per card). **Applies to** all. **Check** tokens defined on `:root`; `@property` declared for any variable that is transitioned.
  **Source** https://www.joshwcomeau.com/css/css-variables-for-react-devs/
- **RULE [JC-LM-40]** Let a variable carry responsive meaning: define `--space-sm: 8px` / `--space-md: 16px` and redefine them inside a media query (e.g. 16px / 32px from 1024px up) so components never mention breakpoints.
  **Why** single source of truth; components stay declarative. **Applies to** design systems. **Check** components contain no spacing media queries.
  **Source** https://www.joshwcomeau.com/css/css-variables-for-react-devs/
- **RULE [JC-LM-41]** Keep colour tokens as recombinable fragments (hue, saturation, lightness as separate variables) when you need runtime tweaks; derive dark/transparent/soft versions with `calc()` rather than a preprocessor.
  **Why** unlike Sass, CSS variables stay live and can be changed from JS (`style.setProperty`) so everything updates. **Applies to** theming. **Check** n/a. Tension with OKLCH-first tokens in section 5.
  **Source** https://www.joshwcomeau.com/css/color-formats/
- **RULE [JC-LM-42]** Dark mode checklist (2020 article, framework-specific code outdated): toggle persists, default follows `prefers-color-scheme`, light when unsupported, no first-paint flash, toggle never shows the wrong state. Implement with CSS variables and a tiny blocking `<script>` placed before the body content that reads localStorage/media query and sets the variables; a synchronous `localStorage` read of a short string took ~12 microseconds even throttled.
  **Why** SSR/static HTML cannot know the preference, so without a blocking script the wrong theme flashes. **Applies to** SSR/SSG sites. **Check** first-paint screenshot at `prefers-color-scheme: dark` has no light frame; the script is in `<head>`/top of `<body>`.
  **Source** https://www.joshwcomeau.com/react/dark-mode/
- **RULE [JC-LM-43]** Decide whether a new CSS feature is safe with three questions: What is the fallback experience (simulate by deleting the declaration)? What share of *your* audience supports it (caniuse global data is a sample; his own audience was 2.5x more Firefox than global)? What harm results if the fallback is broken (yacht rental vs vaccine booking)? Accessibility is exempt from this trade-off.
  **Why** progressive enhancements such as `text-wrap: pretty` can ship at 20% support; features like subgrid with no graceful fallback need >95%. **Applies to** all. **Check** each new feature has a documented fallback; `@supports` used for layout-critical features. Provide dual declarations for simple cases (`overflow:hidden; overflow:clip`).
  **Source** https://www.joshwcomeau.com/css/browser-support/
- **RULE [JC-LM-44]** Name the layout algorithm before debugging a CSS surprise: check parent `display` (flex/grid create formatting contexts for *children*), `position`, `float`, `table`. Properties like `width`, `z-index`, `align-content` behave differently per algorithm (and `align-content` is arriving in Flow layout).
  **Why** same CSS, different outputs. **Applies to** debugging. **Check** n/a.
  **Source** https://www.joshwcomeau.com/css/understanding-layout-algorithms/

---

## 3. Numbers and scales

| Item | Value | Source |
|---|---|---|
| Reset line-height | 1.5 | custom-css-reset |
| Input font-size minimum (iOS zoom) | 16px / 1rem; Chrome default 13.333px | custom-css-reset |
| Text-wrap support | pretty 72%, balance 87% (Nov 2024) | custom-css-reset |
| Content box example | 200px parent, 100% width, 20px padding, 2px border => 244px visible | custom-css-reset |
| Min tap target | 32px fine pointer, 48px coarse; guideline 44 to 48px | css-variables-for-react-devs |
| Full-bleed column | `1fr min(42rem, 100%) 1fr`; 65ch ideal line length, 45 to 85 acceptable | full-bleed |
| Container query breakpoint | one value, e.g. 19rem, vs three magic viewport numbers (35rem, 42rem, 60rem) | container-queries-unleashed |
| Container query support | ~93% global, ~97% his audience (Nov 2024) | browser-support |
| Subgrid reserve | `grid-row: span 99` hack for unknown row counts | subgrid |
| Flex form | gap 16px; name basis 160 grow 1; email basis 200 grow 3; button basis 80 | flexbox |
| Flex min size | text input min width ~170 to 200px | flexbox |
| Grid support | ~96% | grid |
| Rem conversion | 14px=0.875rem, 15=0.9375, 16=1, 17=1.0625, 18=1.125, 19=1.1875, 20=1.25, 21=1.3125; 24=1.5, 32=2 | pixels-accessibility |
| Example type scale tokens | xs 0.75rem, sm 0.875rem, md 1rem, lg 1.125rem, xl 1.3125rem, 2xl 1.5rem, 3xl 2.625rem, 4xl 4rem | pixels-accessibility |
| WCAG zoom | usable at 200% | pixels-accessibility |
| Compound em example | 16 x 1.125 x 0.9 x 1.25 = 20.25px | pixels-accessibility |
| :has timing | ~0.1 ms on 2500 nodes (Celeron laptop) | has |
| :has support | Safari 15.4, Chrome/Edge 105, Firefox 121; ~92% (Sep 2024) | has |
| Anchor positioning | all majors Jan 2026; ~81% Jul 2026; level 2 ~64% | anchor-positioning |
| localStorage read | ~12 microseconds throttled | dark-mode |
| Default font test sizes | 32px and 48px | pixels-accessibility |
| Hover menu / header | header 5rem (80px) | header-blockers |
| WCAG text spacing | users must be able to set line-height to 1.5 | custom-css-reset |

---

## 4. Dos and Don'ts

- **Do**: `grid-template-columns: repeat(2, 1fr); gap: 16px`. **Don't**: `25% 75%` with `gap: 16px` (overflows by 16px).
- **Do**: `.child{flex-shrink:0}` for icons. **Don't**: `min-width: 32px` hacks that fight the algorithm (acceptable but less direct).
- **Do**: `isolation:isolate` on a component root. **Don't**: `z-index: 999999`.
- **Do**: `@media (min-width: 50rem)`. **Don't**: `@media (min-width: 800px)`.
- **Do**: `min-height: 3rem` buttons. **Don't**: `height: 40px` on text controls.
- **Do**: parent `display:grid`, child fills. **Don't**: `html,body{height:100%}` tricks (removed from his reset, June 2023, now that dynamic viewport units exist).
- **Do**: focus ring on the card with `:has(:focus-visible)` inside `@supports`. **Don't**: remove outlines globally.
- **Do**: `html{font-size:100%}` and variables like `--18px: 1.125rem`. **Don't**: `html{font-size:62.5%}`.

---

## 5. Exceptions and judgement calls

- **Reset vs existing project.** The reset is for greenfield; on an existing codebase it can change spacing subtly. [source]
- **HSL vs OKLCH.** Comeau prefers HSL for authoring (intuitive, `calc()`-friendly fragments) and plans to migrate to OKLCH. The engine's `color-and-surfaces.md` says OKLCH first. The partial-fragment technique (`--hue`, `--sat`, `--lit` recombined with `calc`) also works in OKLCH (`oklch(var(--l) var(--c) var(--h))`) [engine note, untested]. The two-tier variable structure (palette steps -> semantic aliases like `--brand`, `--emphasis`) agrees with the semantic-token rule in that note.
- **Font smoothing.** `-webkit-font-smoothing: antialiased` is opinion; the engine's `typography.md` has no rule either way. Only Mac Chrome/Safari are affected; thin-weight type becomes lighter. Test with light-on-dark body text [engine note].
- **Line-height 1.5 for all body text** fits `typography.md` T-LH-01 (1.5 to 1.65 landing, 1.4 to 1.5 dense UI) at the low end; the 1.5 default is a baseline, not a target for dense UI.
- **rem media queries vs the engine's breakpoint rule.** `implementation-craft.md` says choose content-driven breakpoints ~40rem / 64rem / 90rem (rem), consistent. If any engine template uses px breakpoints, convert them.
- **Pixels for padding?** The source leaves horizontal padding in px/rem to testing. Engine default: use the spacing tokens in rem for vertical rhythm, px for hairlines; test at 32 px default font.
- **Subgrid vs nested flex/grid.** Comeau often prefers a simple nested flexbox over subgrid when alignment across cards is not required.
- **Anchor positioning vs JS popovers (Base UI / coss).** For the coss/Base UI stack, the library handles collision; native anchoring is an enhancement. Use only when not using a popover primitive.
- **`will-change`** is mentioned in the motion file (JC-DM-32); here [verified] that it creates a stacking context. Watch for it on layout wrappers.
- **Dark-mode article is from 2020** (Gatsby era). Concepts hold; the implementation (blocking script, CSS variables) still works but newer options (`color-scheme`, `light-dark()`) are in `color-and-surfaces.md`.

### Conflicts with existing notes
1. `color-and-surfaces.md` demands OKLCH tokens; Comeau authors with HSL. Resolution above; no change to rules.
2. `motion-a11y-perf-loading.md` and this source agree on reduced motion; the reset places `interpolate-size` inside `no-preference`, which the existing note does not mention, add it to the motion-css-native rule for `interpolate-size`.
3. `implementation-craft.md` #531 warns that `position: fixed` inside transformed/filtered/`will-change` ancestors misbehaves; JC-LM-11 gives the stacking-context companion.
4. None found with `tokens-spacing-radius-sizing.md`. Heckel's 4px spacing steps and Comeau's rem variables are compatible.

---

## 6. Figures worth keeping

Interactive widgets to screenshot for `examples/`: flexbox guide (primary/cross axis skewer-vs-cocktail-sausage metaphor, flex-shrink ratio demo, "4 layouts for the price of 1" form); grid guide (line numbering, dragging a child across cells, areas); stacking-contexts (Photoshop group analogy, tooltip vs header); margin-collapse (3D margin visualiser); subgrid (portfolio cards, pricing tiers); full-bleed (1fr / 42rem / 1fr column diagram); container-queries (impossible-problem flicker demo); anchor-positioning (3x3 position-area cell diagram). URLs under https://www.joshwcomeau.com/css/.

---

## 7. Open questions

- Pages read in full: custom-css-reset, stacking-contexts, rules-of-margin-collapse, interactive-guide-to-flexbox, interactive-guide-to-grid, subgrid (to "supporting older browsers"), full-bleed, center-a-div, height-enigma, understanding-layout-algorithms (first half), transforms (first 2/3), container-queries-introduction (to the first query), container-queries-unleashed, anchor-positioning, has (about 70%), css-variables-for-react-devs, surprising-truth-about-pixels-and-accessibility, browser-support (to the formula), color-formats, react/dark-mode (to the workable-solution section). Not read: tail of understanding-layout-algorithms (layout variants), `styling-ordered-lists-with-css-counters` (fetched, not studied), `container-queries-introduction` last section (browser support recap), subgrid "supporting older browsers" section.
- Pages with no extractable rules for this note: career/*, javascript/*, blog/* personal posts (not fetched), svg/*.
- Chromium 156 verified: stacking behaviour, interpolate-size transition, support flags for text-wrap, anchor, :has, scroll timeline, backdrop-filter, `in oklch` gradients, linear(). Not verified: subgrid, container-query examples, flex min-size gotcha, margin collapse (assumed per spec), anchored container queries.
- Support percentages are quoted from the articles' dates, not re-checked.

---

## 8. Recipes

[verified] means the behaviour was observed in Chromium 156.0.8078.4 via Playwright on 2026-10-08; otherwise [untested].

### 8.1 Reset (author's, public domain; see JC-LM-01) [verified: the supports-checks for text-wrap, interpolate-size, isolation, font-smoothing pass]
```css
*,*::before,*::after{box-sizing:border-box}
*:not(dialog){margin:0}
@media (prefers-reduced-motion:no-preference){html{interpolate-size:allow-keywords}}
body{line-height:1.5;-webkit-font-smoothing:antialiased}
img,picture,video,canvas,svg{display:block;max-width:100%}
input,button,textarea,select{font:inherit}
p,h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}
p{text-wrap:pretty} h1,h2,h3,h4,h5,h6{text-wrap:balance}
#root,#__next{isolation:isolate}
```

### 8.2 Seal a component [verified: stacking behaviour]
```css
.component{isolation:isolate}      /* internal z-indexes can no longer fight the page */
```

### 8.3 Full-bleed reading column [untested visually]
```css
.page{--pad:16px;display:grid;grid-template-columns:1fr min(42rem,100%) 1fr;padding-inline:var(--pad)}
.page>*{grid-column:2}
.page>.bleed{grid-column:1 / -1;width:100%;margin-inline:calc(var(--pad) * -1)}
```

### 8.4 Fluid form row [verified: `min-width:0` lets a flex input shrink to 100 px; without it the input stays 153 px in a 100 px container]
```css
.row{display:flex;flex-wrap:wrap;align-items:flex-end;gap:16px}
.row .name{flex:1 1 160px} .row .email{flex:3 1 200px} .row button{flex:0 1 80px}
.row > *{min-width:0}
```

### 8.5 Pricing cards aligned with subgrid [verified: with `grid-row: span 3` + `grid-template-rows: subgrid`, the second row of three cards of different content height started at the same y (133 px)]
```css
.plans{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.plan{display:grid;grid-row:span 7;grid-template-rows:subgrid}   /* title + 6 feature rows */
.plan ul{display:grid;grid-row:span 6;grid-template-rows:subgrid;padding:0;list-style:none}
```

### 8.6 Container-query component [verified: `container: card / inline-size` + `@container card (min-width:19rem)` switched the child to display:grid in a 400 px slot]
```css
.slot{container:card / inline-size}
.card{display:grid;gap:1rem}
@container card (min-width: 19rem){ .card{grid-template-columns:auto 1fr} }
```

### 8.7 Tap target [untested]
```css
:root{--tap:32px} @media (pointer:coarse){:root{--tap:48px}}
button,input,select{min-height:var(--tap)}
```

### 8.8 rem helpers [verified: `--18px: 1.125rem` resolves; font-size computed 18 px]
```css
html{--14px:.875rem;--15px:.9375rem;--16px:1rem;--18px:1.125rem;--21px:1.3125rem}
h3{font-size:var(--21px)}
```

### 8.9 Anchored tooltip with progressive fallback [verified: position-area accepted]
```css
.anchor{anchor-name:--tip-anchor}
.tip{position:fixed;top:0;max-width:20rem}
@supports (position-area:top){
  .tip{top:revert;position-anchor:--tip-anchor;position-area:top;position-try-fallbacks:flip-block;margin-bottom:8px}
}
```

### 8.10 Card focus ring with :has [untested visually]
```css
@supports selector(:has(*)){
  .card:has(button:focus-visible){outline:2px solid var(--primary);outline-offset:2px}
  .card button:focus-visible{outline:none}
}
```

### 8.11 No-flash theme boot (own version of the 2020 idea) [untested]
```html
<script>
(()=>{try{const s=localStorage.getItem('color-mode');
 const m=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
 document.documentElement.dataset.theme=m;}catch(e){document.documentElement.dataset.theme='light'}})();
</script>
```
Place before any rendered body content; theme tokens switch on `[data-theme=dark]`.

### 8.12 Document scroll lock via attribute [untested]
```css
html:has([data-disable-document-scroll="true"]){overflow:hidden}
```
