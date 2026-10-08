---
source: web:https://developer.chrome.com/docs/css-ui (+ developer.chrome.com/docs/web-platform/view-transitions, /blog popover, entry-exit animations, scroll-state, carousels, customizable select, ecommerce case-study series)
chapter: Chrome for Developers CSS and UI docs: anchor positioning, popover, container/style/scroll-state queries, view transitions, scroll-driven animations, @starting-style, interpolate-size, field-sizing, text-wrap, scrollbars, inert, @scope, color-mix, nesting, linear(), CSS carousels, customizable select
pages: n/a
topic_tags: [anchor-positioning, popover, container-queries, style-queries, scroll-state, view-transitions, scroll-driven-animations, starting-style, interpolate-size, field-sizing, text-wrap, scrollbar, inert, scope, color-mix, nesting, linear-easing, carousel, customizable-select, progressive-enhancement, browser-support]
status: studied
---

# Chrome CSS and UI docs: the new APIs, with fallbacks

Fetched 2026-10-08 (raw HTML and text in `corpus/web/webdev-css/`, private). Text CC BY 4.0, code Apache 2.0; notes are paraphrase and original snippets. The support figures are the Baseline badges rendered inside the pages on 2026-10-08 (they reflect the live data at fetch time) unless a version is marked otherwise.

Pages read in full or in substance (31): css-ui index; anchor-positioning-api; popover blog (Introducing the popover API); entry/exit animations blog (@starting-style, allow-discrete, overlay); animate-to-height-auto (interpolate-size, calc-size); style-queries; scroll-state; scroll-driven-animations (Bramus, 2023); view-transitions overview, same-document, cross-document; css-ui-ecommerce series (intro, scroll-driven, view transitions, popover, container queries, :has()); carousels-with-css; css-text-wrap-balance; text-wrap-pretty; css-field-sizing; scrollbar-styling; inert; exclusive-accordion; css-nth-child-of-s; css-color-mix; high-definition-css-color-guide (partial: first third + classic spaces); at-scope; css-linear-easing-function; css-animation-composition; css-nesting; customizable-select RFC; cssom (Typed OM, skimmed); web-animations-resources (index only).

Pages I could not read: `docs/css-ui/container-queries`, `docs/css-ui/css-grid-tooling`, `docs/css-ui/css-in-js` (404 at the index URLs; container queries covered through the ecommerce case study plus web.dev). `blog/new-in-chrome-123` and `-135` fetched but only skimmed (release notes). `docs/web-platform/view-transitions` sub-pages beyond same/cross-document not listed in the CSS and UI index.

Evidence labels: **[verified-C156]** executed in Chromium 156.0.8078.4 via Playwright on 2026-10-08 (harness `corpus/web/webdev-css/_tests/verify.mjs`, 25/25 pass; Firefox and WebKit are not installed, so cross-engine behaviour is **[untested]**). **[source]** from the page. **[engine note]** mine.

Companions: `../web/implementation-craft.md` (support tier table), `webdev-learn-css.md` (WCSS rules for the same features), `webdev-performance-for-marketing.md`.

---

## 1. Core ideas

1. **Each new API replaces a JS dependency, but only as progressive enhancement until all four engines ship it.** Always make the unsupported state a complete, visible, usable page; the enhancement adds position, motion or polish.
2. **The base style must be the final visible state.** Scroll-driven reveals, entry animations and view transitions all fail by hiding content when the feature is missing. Invert the pattern: visible by default, hide/animate only inside `@supports` and `prefers-reduced-motion: no-preference`.
3. **Top layer + anchoring + `@starting-style` is the native menu/tooltip/dialog stack.** Popover gives light dismiss, Esc and focus return; anchor positioning gives placement, flip fallbacks and scroll tracking; `@starting-style` plus `transition-behavior: allow-discrete` and `overlay` gives enter/exit animation.
4. **State-driven CSS keeps growing:** `:has()` (parent state), `@container` size queries (layout), `@container style()` (custom-property state), `@container scroll-state()` (stuck, snapped, scrollable). Pick the smallest tool: size queries for layout, `:has()` for DOM state, scroll-state only for scroll-position affordances.
5. **Animation off the main thread:** scroll-driven animations and view transitions run on the compositor/CSS animation machinery; case studies report 80% fewer lines and CPU use down from 50% to 2% while scrolling versus JS scroll handlers. Animate `transform`, `opacity`, `clip-path`; never `width` for progress bars.
6. **Typography polish is one line each:** `text-wrap: balance` for headings (six lines or fewer), `pretty` for orphans in body copy, `field-sizing: content` for auto-growing inputs, with defensive min/max sizes.
7. **Cascade control is improving:** `@scope` adds a proximity step after specificity and before order; nesting removes repetition; `@layer` orders origins. Specificity of `@scope` prelude selectors is not added to inner rules.
8. **Case-study caveat:** the ecommerce series (Tokopedia, redBus, Policybazaar) are vendor-curated success stories; quoted percentages (70% / 80% fewer lines, 30-40% dev-time cut) are self-reported and come from big React apps, not marketing pages. The article also cites "up to 200% conversion lift from good UI" (Forrester) and "94% cite design" as motivation; treat those as marketing claims, not measured effects of these APIs.

---

## 2. Rules (`CHR-nn`)

### 2.1 Anchor positioning and popover

- **RULE [CHR-01]** Guard anchored layouts with `@supports (anchor-name: --a)` and keep a no-anchor layout (static position, the popover's default centring, or a small positioner script) for engines without it. Support at fetch: Chrome and Edge 125, Firefox 147, Safari 26. An OddBird polyfill exists but is incomplete.
  **Why** Unsupported declarations are dropped, leaving the popup at the UA default; the page must remain operable.
  **Applies to** all. **Check** Playwright: with `anchor-name` blocked via a style override, the popup is still fully inside the viewport and operable; static `@supports (anchor-name` present. **Source** https://developer.chrome.com/docs/css-ui/anchor-positioning-api

- **RULE [CHR-02]** For anchored popovers and dialogs reset the UA centring: `inset: auto` and `margin: 0` (or `unset`), then set `position-area`. Give each anchor a unique dashed name (inline `style="anchor-name:--x"` in loops) or scope with `anchor-scope`.
  **Why** The `popover`/`dialog` UA styles centre the box with `margin: auto` and `inset: 0`, which fight placement; duplicate names resolve to the last anchor in the document.
  **Applies to** all. **Check** Playwright: open the popover, `popover.top ≈ trigger.bottom` for `position-area: block-end`; each trigger positions its own panel (`A15`). [verified-C156: popover top 121 = button bottom 121, left 100 = button left 100.] **Source** https://developer.chrome.com/docs/css-ui/anchor-positioning-api and https://web.dev/learn/css/anchor-positioning

- **RULE [CHR-03]** Add overflow fallbacks with `position-try-fallbacks: flip-block` (or `flip-block, flip-inline`) or `@position-try` blocks; hide the panel when its anchor scrolls away with `position-visibility: anchors-visible`.
  **Why** Menus near viewport edges otherwise render off-screen; panels left floating after the trigger scrolls away confuse users.
  **Applies to** all. **Check** Playwright: place the trigger 50 px from the bottom edge, assert the panel bottom <= trigger top (flipped) and `panel.top >= 0`. [verified-C156: trigger at y=750 in an 800 px viewport flipped the panel above (bottom 750, top 612).] **Source** https://developer.chrome.com/docs/css-ui/anchor-positioning-api

- **RULE [CHR-04]** Do not expect anchoring to create semantics: if the positioned element is a comment, footnote or detail about the anchor, add `aria-details` on the anchor; for popovers use `popovertarget` so focus order is handled.
  **Why** Anchor positioning is visual only; popover/dialog get focus-navigation corrections from the browser, other elements do not.
  **Applies to** all. **Check** axe + manual SR pass; static: positioned non-popover elements with a semantic relation carry `aria-details`. **Source** https://developer.chrome.com/docs/css-ui/anchor-positioning-api

- **RULE [CHR-05]** Prefer `anchor-name` / `position-anchor` / `position-area` over the early `anchor="id"` HTML attribute shown in the 2023 popover article; verify any older anchor snippet against current MDN before use. Typos in the docs (`posotion-area`, a comment starting `*/ connect`) mean copy-pasted CSS may silently fail.
  **Why** The `anchor` attribute example predates the final design; the docs contain syntax errors. [source] [verify against BCD]
  **Applies to** all. **Check** `CSS.supports('position-area','bottom')` and visual regression after pasting. **Source** https://developer.chrome.com/blog/introducing-popover-api

- **RULE [CHR-06]** Build non-modal layers with the popover attribute: `popover` (auto), `popover=manual` for toasts, `popovertarget` on a `<button>`, `popovertargetaction=hide` close buttons with real labels, and `<dialog popover>` when you want dialog semantics without inertness. Style `::backdrop` lightly.
  **Why** Popover provides top layer, light dismiss, Esc, default focus management and trigger binding; unlike `dialog.showModal()` it does not make the page inert or block outside clicks, so a heavy backdrop misleads.
  **Applies to** all. **Check** Playwright: Esc closes, outside click closes (auto), focus returns to trigger (`A15`); close button has accessible name. **Source** https://developer.chrome.com/blog/introducing-popover-api and https://web.dev/learn/css/popover-and-dialog

- **RULE [CHR-07]** For browsers without popover, ship the OddBird popover polyfill (about 3.2 KB gzip) only if the audience needs it; reported real-world result: one retailer cut React modal code by up to 70% and used `@starting-style` for animation.
  **Why** Deleting `createPortal`, state and focus code reduces bugs; polyfill cost was small.
  **Applies to** all. **Check** bundle diff after adoption (`P6`). **Source** https://developer.chrome.com/blog/css-ui-ecommerce-popover

### 2.2 Entry and exit animations

- **RULE [CHR-08]** Animate popover/dialog/`display:none` toggles with: open state in `[open]` or `:popover-open`, entry state in `@starting-style` (written **after** the open-state declarations), exit state on the base selector, and a transition list that includes `display allow-discrete` and, for top-layer elements, `overlay allow-discrete`. Declare `transition-behavior: allow-discrete` **after** the `transition` shorthand if you use the separate property.
  **Why** The shorthand resets `transition-behavior` to `normal`; `@starting-style` does not win by being later unless ordered after; without `overlay` the element leaves the top layer immediately and the exit animation is clipped. [verified-C156: opacity 0 right after `showPopover()`, 1 after 600 ms; display stayed non-none 120 ms after `hidePopover()` and became none after 600 ms.]
  **Applies to** all. **Check** Playwright: sample opacity at 0 ms and end; assert `display` remains until the duration ends; a screenshot at 0 ms shows no flash (`starting-style-popover`). **Source** https://developer.chrome.com/blog/entry-exit-animations

- **RULE [CHR-09]** For dynamic DOM insert/remove with reordering (lists, cards), prefer view transitions over per-item `@starting-style`; use keyframes with `display: none` in the last frame for pure exit animations.
  **Why** Discrete display in keyframes (Chrome 116) and view transitions handle morphing positions that transitions cannot.
  **Applies to** SaaS app UI. **Check** visual. **Source** https://developer.chrome.com/blog/entry-exit-animations

- **RULE [CHR-10]** Enable `interpolate-size: allow-keywords` on `:root` inside an `@supports` block to transition to `height: auto`; use `calc-size()` only for calculations and always precede it with a plain fallback declaration. Keyframes cannot interpolate between two intrinsic keywords; one end must be a length or percentage.
  **Why** Default `numeric-only` blocks keyword interpolation for back-compat. Support at fetch: Chrome and Edge 129, no Firefox, no Safari. Percentages inside `calc-size()` surprise (a `+ 50%` adds half the containing block); use `size * 1.5`. [verified-C156: height transition from 0 to auto passed through 99.95 px at the 250 ms mark and ended at 200 px.]
  **Applies to** landing page (accordion, expand/collapse). **Check** Playwright: mid-transition height strictly between 0 and final (`interpolate-size`); in non-supporting engines the content must still toggle. **Source** https://developer.chrome.com/docs/css-ui/animate-to-height-auto

- **RULE [CHR-11]** Animate `<details>`: opening animates with `height` plus `interpolate-size`; closing needs `::details-content` (Chrome 131 per craft note); use `name` on several `<details>` for an exclusive accordion.
  **Why** The `open` attribute flips instantly, so an animated close needs the content pseudo-element. Exclusive accordion support: Chrome 120, Edge 120, Firefox 130.
  **Applies to** landing page (FAQ). **Check** Playwright: opening one `details[name]` closes the others (`details-name-exclusive`). [verified-C156] **Source** https://developer.chrome.com/docs/css-ui/exclusive-accordion and animate-to-height-auto

### 2.3 Queries: container, style, scroll-state, `:has()`

- **RULE [CHR-12]** Use container queries to unify mobile and desktop component code and find candidates by looking for text ellipsis and cut-off content inside reused components (for example the Add-to-cart button that is icon-only in a card and icon plus text as a CTA).
  **Why** One component in one code base reacts to its slot; a retailer reported 30-40% less development time after merging separate mobile and desktop code. [source, self-reported]
  **Applies to** landing page. **Check** `cq-card` harness; find `text-overflow: ellipsis` hits in the audit as candidates. **Source** https://developer.chrome.com/blog/css-ui-ecommerce-cq

- **RULE [CHR-13]** Treat style container queries (`@container style(--theme: warm)`) as enhancement: they work on custom properties only, need a named container for non-parents, cannot test mere presence, and are Chrome 111, Safari 18, Firefox 151.
  **Why** The logic/data layer can move into custom properties, but support and features (no ranges, no presence test) are limited.
  **Applies to** SaaS app UI. **Check** `@supports` or fallback class; Playwright: unsupported path keeps default styling. **Source** https://developer.chrome.com/docs/css-ui/style-queries

- **RULE [CHR-14]** Use `container-type: scroll-state` on the sticky/snap/scrollable element and style a **descendant** inside `@container scroll-state(stuck: top | snapped: x | scrollable: bottom)`; wrap in `@supports (container-type: scroll-state)` and, if moving things, in `prefers-reduced-motion: no-preference`.
  **Why** The container cannot style itself; stuck shadows, "back to top" visibility and scroll-affordance gradients no longer need JS. Chrome 133 and newer only at fetch; keep a default look that is complete without it. [verified-C156: a sticky nav inner switched from white to red once stuck.]
  **Applies to** landing page. **Check** Playwright: scroll until the element sticks, compare computed background (`scroll-state-stuck`). **Source** https://developer.chrome.com/blog/css-scroll-state-queries

- **RULE [CHR-15]** Replace JS parent-state toggles with `:has()` and give older engines a class-based fallback: `@supports selector(:has(*))`.
  **Why** Case studies replaced JS plan-selection validation and thumbnail overlays with `:has(input:checked)` and `:has(.playIcon)`. Universal support since Firefox 121 per the craft note.
  **Applies to** all. **Check** static: each `:has(` rule sits in or beside a fallback; Playwright toggles the input and checks computed styles. **Source** https://developer.chrome.com/blog/css-ui-ecommerce-has

### 2.4 Scroll-driven animations

- **RULE [CHR-16]** Make the unsupported/static state the finished, visible state. Put `animation` and `animation-timeline` only inside `@supports (animation-timeline: scroll())` (or `view()`) and `@media (prefers-reduced-motion: no-preference)`; declare `animation-timeline` after the `animation` shorthand and omit duration (it is `auto`).
  **Why** The shorthand resets `animation-timeline`; a `opacity: 0` base waiting for a timeline leaves content invisible in Firefox (Technology Preview only at fetch) and when motion is reduced. Chrome and Edge 115, Safari 26. [verified-C156: with the supports+no-preference block the off-screen element was opacity 0 and centred was 1; under `reduce` both were 1; without the block it stayed 1.]
  **Applies to** landing page. **Check** Playwright (`sda-reveal-*`); Firefox/WebKit run once installed; `[data-reveal]` elements all `opacity:1` with `reducedMotion:'reduce'` (`A11`). **Source** https://developer.chrome.com/docs/css-ui/scroll-driven-animations

- **RULE [CHR-17]** Animate `transform`/`opacity`/`clip-path` only. A progress bar uses `transform: scaleX()` with `transform-origin: 0 50%`, not `width`.
  **Why** Compositor-friendly; changing width runs layout every scroll frame.
  **Applies to** landing page. **Check** static: `@keyframes` used with `animation-timeline` contain only compositor properties plus clip-path/filter; DevTools shows no layout. **Source** https://developer.chrome.com/docs/css-ui/scroll-driven-animations

- **RULE [CHR-18]** Use `view()` with `animation-range: entry 25% cover 50%` for reveals; use a named timeline (`view-timeline-name`/`scroll-timeline`) with `timeline-scope` when the animated element is not a descendant of the scroller, and when an absolutely positioned element would skip its direct scroll parent.
  **Why** `nearest` lookups walk the containing-block chain, so an absolutely positioned child can miss its intended scroller. Ranges derive from the untransformed box, so scaling while animating does not shift ranges.
  **Applies to** landing page. **Check** visual and Playwright scroll sweep. **Source** https://developer.chrome.com/docs/css-ui/scroll-driven-animations

- **RULE [CHR-19]** Remove JS scroll listeners when you adopt scroll-driven animations and measure.
  **Why** Reported by Tokopedia: about 80% less code and average CPU on scroll down from 50% to 2% (self-reported).
  **Applies to** landing page. **Check** `P3` TBT and INP before/after; grep for `addEventListener('scroll'` count falls. **Source** https://developer.chrome.com/blog/css-ui-ecommerce-sda

### 2.5 View transitions

- **RULE [CHR-20]** Wrap same-document updates in `document.startViewTransition(update)` only when the function exists; otherwise run `update()` directly. Treat the transition as decoration: do not `await transition.ready` in app logic; await `updateCallbackDone` (or `finished` if you want the end) and catch animation errors.
  **Why** If two elements share a `view-transition-name`, the transition is skipped and `ready` rejects, which would break the app if awaited. Only one transition runs at a time; the old one jumps to its end. [verified-C156: with `no-preference`, 5 view-transition animations existed; with the reduced-motion override, 0.]
  **Applies to** landing page, SaaS app UI. **Check** Playwright: stub duplicate names and assert the DOM still updated; `A11` for reduced motion. **Source** https://developer.chrome.com/docs/web-platform/view-transitions/same-document

- **RULE [CHR-21]** Give shared elements unique `view-transition-name`s (generate from IDs, or set temporarily just before the transition and clear in `finished`); use `view-transition-class` to share animation CSS; use `:only-child` on `::view-transition-old/new(name)` for enter/exit; use `width: fit-content` on transitioning text and `object-fit` with `height: 100%; overflow: clip` for aspect-ratio changes.
  **Why** Names must be unique at capture time; class (Chrome 125, Firefox 144) deduplicates style rules only.
  **Applies to** landing page. **Check** Playwright: `new Set(names).size === names.length` among elements with a computed `view-transition-name` before the call. **Source** https://developer.chrome.com/docs/web-platform/view-transitions/same-document

- **RULE [CHR-22]** Keep the update callback fast: fetch before calling `startViewTransition`, never wait on network inside it, and cap font/image waits (`Promise.race([document.fonts.ready, wait(100)])`). While transitioning, the page is frozen and a layer covers the UI; do not trigger on `mouseenter` (mouseleave fires unexpectedly).
  **Why** The page does not render or accept input until the callback resolves.
  **Applies to** all. **Check** instrument: callback duration < 100 ms in tests; no `startViewTransition` in hover handlers (static). **Source** same-document page and https://developer.chrome.com/blog/css-ui-ecommerce-vt

- **RULE [CHR-23]** On `navigate` events check `e.hasUAVisualTransition` and skip your own transition when the browser already animated a swipe-back.
  **Why** Two transitions in succession look broken.
  **Applies to** SaaS app UI. **Check** static. **Source** same-document page

- **RULE [CHR-24]** Respect reduced motion in transitions: either disable `::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)` with `animation: none !important`, or substitute a subtle cross-fade that still shows relationships. Use durations in the 90-300 ms band (the docs' shared-axis example: 90 ms fade-out, 210 ms fade-in after 90 ms, 300 ms slide with Material easings).
  **Why** Reduced motion means less, not nothing.
  **Applies to** all. **Check** `A11` with `reducedMotion:'reduce'`. **Source** same-document page

- **RULE [CHR-25]** Cross-document (multi-page) transitions are opt-in on both pages with `@view-transition { navigation: auto }`, same origin only, skipped after 4 s; customise with `pageswap`/`pagereveal` (Chrome 124) and `navigation.activation`; register `pagereveal` listeners in a parser-blocking `<head>` script (or add `blocking=render`); use `<link rel=expect blocking=render href="#id">` sparingly.
  **Why** Chrome 126+ only (Safari 18.2 per craft note, Firefox no). Render-blocking hurts Core Web Vitals; fast pages (prerender via Speculation Rules) make the effect work.
  **Applies to** landing page (multi-page). **Check** Playwright (Chromium): navigate between two same-origin pages and assert `navigation.activation` exists; measure LCP before/after enabling. **Source** https://developer.chrome.com/docs/web-platform/view-transitions/cross-document

### 2.6 Typography, form sizing, scroll UI

- **RULE [CHR-26]** `text-wrap: balance` on headings and short blocks only (never `*`), pair with a `max-inline-size`; reset `white-space: unset` if it competes; accept that balanced text does not shrink its box, so headings inside bordered cards leave visible slack. Browsers balance only up to six lines.
  **Why** Balancing is O(n) search per block; the doc recommends `h1-h6, blockquote`. Chrome 114, Firefox 121, Safari 17.5 (BCD). [verified-C156: at widths 300 and 420 px a heading's lines became more even ([244,260,245,176] -> [244,260,206,215]; [400,414,119] -> [311,285,338]) and never worse across seven widths.]
  **Applies to** landing page. **Check** `getComputedStyle(h).textWrapStyle === 'balance'` on h1-h3; no element with `* { text-wrap }` (static); visual: no orphan on headings > 2 lines. **Source** https://developer.chrome.com/docs/css-ui/css-text-wrap-balance

- **RULE [CHR-27]** `text-wrap: pretty` for body paragraphs where available (Chrome 117, Safari 26; not Firefox); it fixes orphans (and hyphenation near the end) but not widows; do not depend on it.
  **Why** Cosmetic enhancement; speed trade-off.
  **Applies to** landing page. **Check** visual; layout must not break when ignored. **Source** https://developer.chrome.com/blog/css-text-wrap-pretty

- **RULE [CHR-28]** For auto-growing inputs use `field-sizing: content` with defensive limits: `textarea{min-block-size:3.5rlh;min-inline-size:20ch;max-inline-size:50ch}`, `select{min-inline-size:5ch;min-block-size:1.5lh}`, `input{min-inline-size:7ch}`; remember the placeholder counts as content.
  **Why** Without minimums the control can collapse; without maximums it can overflow. Chrome 123, Edge 123, Firefox 152, Safari 26.2. [verified-C156: textarea height 69 px empty, 126 px after eight lines.]
  **Applies to** forms. **Check** Playwright: fill 8 lines, height increases (`field-sizing`); empty control >= min size. **Source** https://developer.chrome.com/docs/css-ui/css-field-sizing

- **RULE [CHR-29]** Style scrollbars with `scrollbar-width: thin|none|auto` and `scrollbar-color: <thumb> <track>`; fall back to `::-webkit-scrollbar-*` inside `@supports selector(::-webkit-scrollbar)`; do not set a width on `::-webkit-scrollbar` unless you accept an always-classic scrollbar.
  **Why** Standard properties are Chrome 121, Firefox 64; `scrollbar-width: none` hides the affordance but keeps scrolling, so provide a visible cue.
  **Applies to** all. **Check** computed `scrollbarWidth`; `A5` no hidden-scroll trap; scrollable regions remain keyboard reachable. **Source** https://developer.chrome.com/docs/css-ui/scrollbar-styling

- **RULE [CHR-30]** Use `inert` on off-screen drawers, background content behind a custom modal, carousel slides not in view, and non-applicable form groups; mark them visually (for example opacity) because inert has no default look; use `disabled` for single controls.
  **Why** `inert` removes focus, clicks and the accessibility-tree presence together; `aria-hidden` alone leaves focusable descendants. Chrome 102, Firefox 112, Safari 15.5.
  **Applies to** all. **Check** Playwright: Tab does not enter the inert subtree (`A15`). **Source** https://developer.chrome.com/docs/css-ui/inert

- **RULE [CHR-31]** Enhance scroll-snap rows into carousels with `::scroll-button()` and `::scroll-marker`/`scroll-marker-group` only behind `@supports selector(::scroll-marker)`; the native scroll row must remain usable; give generated content alt text (`content: "⬅" / "Scroll left"`); for exact one-item steps use `scroll-snap-type: x mandatory` plus `scroll-snap-stop: always`.
  **Why** Buttons page by 85% of the scrollport; browser creates real buttons and tab-like markers with proper roles. Chrome 135 only at fetch. [verified-C156: Chromium 156 reports support for `::scroll-marker`, `scroll-state`, `base-select` and `linear()`; behaviour not exercised.]
  **Applies to** landing page (logo/testimonial rows). **Check** `CSS.supports('selector(::scroll-marker)')`; fallback has visible scrollbar or swipe affordance. **Source** https://developer.chrome.com/blog/carousels-with-css

- **RULE [CHR-32]** Customise `<select>` with `select, ::picker(select) { appearance: base-select }` behind `@supports (appearance: base-select)`; keep the native select as the fallback; do not use it on `multiple`/`size` selects; put images inside `<option>` with empty `alt` when decorative.
  **Why** The option list is a popover anchored to the button; unsupported engines show a normal select with the option text. Chrome 135, Safari 27 (craft note). The element name for the selected-option mirror changed between the RFC and the shipped version (the RFC calls it `selectedoption`) [verify].
  **Applies to** forms. **Check** Playwright: keyboard open/select works with and without the enhancement. **Source** https://developer.chrome.com/blog/rfc-customizable-select

### 2.7 Selectors, cascade, colour, easing

- **RULE [CHR-33]** Use `@scope (.card) to (.card__content)` for component-bounded selectors; prelude selectors add no specificity, `:scope` is `(0,1,0)`, `&` inside `@scope` weighs like `:is(...)`, and proximity breaks ties after specificity.
  **Why** Solves nested light/dark theme bleed (`.light a` vs `.dark a`) without BEM or high specificity. Chrome 118, Edge 118, Firefox 146, Safari 26.4 (BCD). [verified-C156: image in scope got the outline, image inside the lower limit did not.]
  **Applies to** all. **Check** Playwright (`scope-donut`); keep a class-based fallback until Safari 26.4 share is high. **Source** https://developer.chrome.com/docs/css-ui/at-scope

- **RULE [CHR-34]** Pre-filter dynamic lists with `:nth-child(even of :not([hidden]))`.
  **Why** Counts only visible rows. Chrome 111, Firefox 113, Safari 9. [verified-C156]
  **Applies to** tables. **Check** `nth-child-of-S-zebra`. **Source** https://developer.chrome.com/docs/css-ui/css-nth-child-of-s

- **RULE [CHR-35]** `color-mix(in oklab, A, B x%)` (default for mixing and gradients) for tints and shades; use `hsl`/`hwb` only when you want a vivid mix; add `shorter|longer|increasing|decreasing hue` only for cylindrical spaces (a hue method on a rectangular space is a syntax error); percentages summing over 100% are scaled.
  **Why** Different spaces give different results (blue+white goes purple in many spaces, stays blue in oklab). [verified-C156: `color-mix(in oklab, red, white)` computed to `oklab(0.81398 0.112463 0.0629398)`, `in srgb` to `color(srgb 1 0.5 0.5)`.] Chrome 111, Firefox 113.
  **Applies to** all. **Check** `A2` on derived colours. **Source** https://developer.chrome.com/docs/css-ui/css-color-mix

- **RULE [CHR-36]** Wide gamut (`display-p3`) gives about 50% more colours than sRGB; sRGB covers about 30% of visible colours; provide an sRGB colour first, then override inside `@media (color-gamut: p3)`.
  **Why** Screens are wide gamut; CSS Color 4 spaces are available; gradients also band less.
  **Applies to** landing page. **Check** screenshot compare; contrast from sRGB render. **Source** https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide

- **RULE [CHR-37]** Generate `linear()` easing curves (spring, bounce) with Jake Archibald and Adam Argyle's generator rather than by hand; use a stop count the file can bear; `linear()` is Chrome 113, Firefox 112 (and Safari 17.2 per BCD).
  **Why** `cubic-bezier` cannot overshoot more than once; `linear()` approximates any curve piecewise.
  **Applies to** landing page. **Check** `CSS.supports('animation-timing-function','linear(0,0.25 75%,1)')` true in Chromium 156; fallback is `ease-out`. **Source** https://developer.chrome.com/docs/css-ui/css-linear-easing-function

- **RULE [CHR-38]** When stacking animations on one property use `animation-composition: add|accumulate` instead of rewriting base values in keyframes.
  **Why** Default `replace` discards the underlying transform. Chrome 112, Firefox 115, Safari 16.
  **Applies to** motion. **Check** computed transform at the end of the animation equals expected composite. **Source** https://developer.chrome.com/docs/css-ui/css-animation-composition

- **RULE [CHR-39]** In nested CSS always use `&` when you mean a compound with the parent (`&:hover`, `&.large`); un-prefixed nested selectors are descendants (`.demo { .lg { .triangle {} } }` becomes `.demo .lg .triangle`, not `.lg.triangle`); nested `@media` inside a rule needs no repeated selector.
  **Why** A common silent bug in refactors.
  **Applies to** all. **Check** static diff of expanded selectors. **Source** https://developer.chrome.com/docs/css-ui/css-nesting

- **RULE [CHR-40]** When mutating styles from JS use the Typed OM (`el.attributeStyleMap.set('opacity', 0.3)`) or parse numbers; string concatenation on `el.style.opacity += 0.1` yields `"0.30.1"`.
  **Why** CSSOM returns strings; Typed OM returns typed numbers (Chrome 66+ for a subset of properties).
  **Applies to** JS code. **Check** static grep for `.style.<numeric prop> +=`. **Source** https://developer.chrome.com/docs/css-ui/cssom

---

## 3. Numbers & scales

| Feature | Support badge at fetch (2026-10-08) | Source |
|---|---|---|
| Anchor positioning | Chrome/Edge 125, Firefox 147, Safari 26 | anchor-positioning-api |
| Popover attribute | Chrome/Edge 114, Firefox 125, Safari 17 | popover blog |
| View transitions same-document | Chrome/Edge 111, Firefox 144, Safari 18 | overview |
| View transition types | Chrome/Edge 125, Firefox 144, Safari 18 | same-document |
| `view-transition-class` | Chrome/Edge 125, Firefox 144 | same-document |
| View transitions cross-document | Chrome/Edge 126, no Firefox | cross-document |
| `pageswap`/`pagereveal` | Chrome/Edge 124, no Firefox | cross-document |
| NavigationActivation | Chrome/Edge 123, Firefox 147 | cross-document |
| `blocking=render` (`rel=expect`) | Chrome/Edge 124, no Firefox, no Safari | cross-document |
| Scroll-driven animations | Chrome/Edge 115, Firefox "Technology Preview", Safari 26 | scroll-driven-animations |
| Style container queries | Chrome/Edge 111, Firefox 151, Safari 18 | style-queries |
| Size container queries | Chrome/Edge 105, Firefox 110, Safari 16 | style-queries |
| Scroll-state queries | Chrome 133 | scroll-state post |
| `::scroll-button()`, `::scroll-marker` | Chrome/Edge 135, no Firefox/Safari | carousels |
| `interpolate-size`, `calc-size()` | Chrome/Edge 129 only | animate-to-height-auto |
| `field-sizing` | Chrome/Edge 123, Firefox 152 (Safari 26.2 per craft note) | field-sizing |
| `text-wrap: balance` | Chrome/Edge 114, Firefox 121 | balance |
| `scrollbar-width/color` | Chrome/Edge 121, Firefox 64 | scrollbar-styling |
| `inert` | Chrome/Edge 102, Firefox 112 | inert |
| `details[name]` | Chrome/Edge 120, Firefox 130 | exclusive-accordion |
| `:nth-child(of S)` | Chrome/Edge 111, Firefox 113, Safari 9 | nth-child |
| `@scope` | Chrome/Edge 118, Firefox 146 | at-scope |
| `linear()` | Chrome/Edge 113, Firefox 112 | linear |
| `animation-composition` | Chrome/Edge 112, Firefox 115, Safari 16 | composition |
| `color-mix()` | Chrome/Edge 111, Firefox 113 | color-mix |

| Number | Value | Source |
|---|---|---|
| Scroll-button page distance | 85% of the scrollport | carousels |
| Cross-doc VT timeout | 4 s | cross-document |
| Text balance line limit | 6 lines | balance |
| Font/image wait inside VT callback | 100 ms cap | same-document |
| Shared-axis durations | 90 ms fade-out, 210 ms fade-in (after 90 ms), 300 ms slide | same-document |
| Popover polyfill | about 3.2 KB gzip | ecommerce popover |
| Case studies (self-reported) | -70% React lines (popover), -80% lines and CPU 50% to 2% (scroll-driven), -30-40% dev time (container queries) | ecommerce series |
| Chromium 156 feature probe (this run) | `popover=hint` accepted; `base-select`, `scroll-state`, `::scroll-marker`, `calc-size()`, `view-transition-class`, `linear()` all `CSS.supports` true | harness |

---

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| Base `.reveal{opacity:1}`, animate inside `@supports (animation-timeline: view())` and `no-preference` | `.reveal{opacity:0}` waiting for the timeline | invisible in Firefox and under reduced motion (verified) |
| `transition: opacity .3s, display .3s allow-discrete, overlay .3s allow-discrete` | `transition: opacity .3s` on a popover | exit clipped, no discrete flip |
| `@starting-style` after the open-state rule | `@starting-style` before it | later rule wins; state mis-ordered |
| `interpolate-size: allow-keywords` on `:root` in `@supports` | animating `max-height: 999px` | fake duration, janky |
| `startViewTransition` guarded, `updateCallbackDone` awaited | `await transition.ready` in app logic | duplicate names skip it and throw |
| `h1, h2, h3 { text-wrap: balance }` | `* { text-wrap: balance }` | performance and card slack |
| `inert` on off-screen drawer | `aria-hidden` only | descendants still focusable |

### Copy-ready snippets

**Scroll-driven reveal with fallback and reduced-motion guard [verified-C156]**: see `webdev-learn-css.md` section 4.

**Reading-progress bar [untested]**
```css
.progress { position: fixed; inset: 0 0 auto 0; height: .25rem; background: var(--accent);
            transform-origin: 0 50%; transform: scaleX(0); }
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .progress { animation: grow linear both; animation-timeline: scroll(root block); }
    @keyframes grow { to { transform: scaleX(1); } }
  }
}
```

**Sticky nav shadow when stuck [verified-C156 trigger]**
```css
.stick { container-type: scroll-state; position: sticky; top: 0; }
.stick > nav { transition: box-shadow .2s; }
@supports (container-type: scroll-state) {
  @container scroll-state(stuck: top) { .stick > nav { box-shadow: 0 2px 12px rgb(0 0 0 / .15); } }
}
```

**Popover menu: anchored, animated, with flip [verified-C156 behaviours]**
```html
<button popovertarget="menu" style="anchor-name:--menu">Menu</button>
<div id="menu" popover style="position-anchor:--menu"><a href="#">One</a><a href="#">Two</a></div>
```
```css
#menu { margin: 0; inset: auto; position-area: block-end span-inline-end; position-try-fallbacks: flip-block;
        opacity: 0; transform: translateY(-4px);
        transition: opacity .15s, transform .15s, display .15s allow-discrete, overlay .15s allow-discrete; }
#menu:popover-open { opacity: 1; transform: none; }
@starting-style { #menu:popover-open { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { #menu { transition: none; } }
```

**View transition on a state change with reduced-motion handling [verified-C156]**: see `webdev-learn-css.md` section 4.

**Expand/collapse to auto height [verified-C156 transition]**
```css
@supports (interpolate-size: allow-keywords) { :root { interpolate-size: allow-keywords; } }
.panel { height: 0; overflow: clip; transition: height .3s ease; }
.panel.open { height: auto; }
```
(unsupported engines toggle instantly.)

**Auto-growing textarea [verified-C156]**
```css
textarea { field-sizing: content; min-block-size: 3.5rlh; min-inline-size: 20ch; max-inline-size: 50ch; }
```

**Component-bounded styles with `@scope` [verified-C156]**
```css
@scope (.card) to (.card__content) { img { border-radius: .5rem; } }
```

**Tint ramp with `color-mix` and relative colour [verified-C156 for mix; relative colour untested here]**
```css
:root { --brand: oklch(62% .19 260); --brand-hover: color-mix(in oklab, var(--brand), black 12%);
        --brand-soft: color-mix(in oklab, var(--brand), white 85%); }
```

**CSS carousel enhancement [untested]**
```css
.row { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scroll-marker-group: after; }
.row > li { flex: 0 0 min(80%, 22rem); scroll-snap-align: center; }
@supports selector(::scroll-marker) {
  .row::scroll-button(left)  { content: "←" / "Previous"; }
  .row::scroll-button(right) { content: "→" / "Next"; }
  .row > li::scroll-marker { content: ""; inline-size: .6rem; block-size: .6rem; border-radius: 50%; background: var(--line); }
  .row > li::scroll-marker:target-current { background: var(--accent); }
}
```

**Customizable select [untested]**
```css
@supports (appearance: base-select) { select, ::picker(select) { appearance: base-select; } }
```

---

## 5. Exceptions & judgement calls

Conflicts and updates versus `../web/implementation-craft.md`:

1. **`popover="hint"`.** Craft note: avoid (Chrome 151, Firefox 153, Safari preview). Chromium 156 in this run returned `popover` property `"hint"` (accepted). Still avoid for cross-engine reasons; revalidate when Safari ships it.
2. **Scroll-state queries.** Craft table: "Chrome 133, Firefox no, Safari no, limited, avoid". The Chrome post positions them as ready; keep "enhance only". Verified working in Chromium 156 only.
3. **Customizable select.** Craft table lists Safari 27; the RFC article is from Chrome 130 days and element naming (`selectedoption`) changed. Use only behind `@supports (appearance: base-select)`.
4. **`text-wrap: pretty`.** Craft note confirms Firefox lacks it; the Chrome article says it only fixes orphans, not widows. Our rule remains enhancement-only.
5. **Anchor `popover` margin reset.** The learn-css lesson says `margin: unset`; the Chrome docs say `inset: auto`. Use both: `margin: 0; inset: auto`.
6. **Pure-CSS carousel vs JS libraries.** Chrome claims the CSS carousel is "more accessible than any JS". The feature is Chrome 135+ only; for marketing sites keep the baseline scroll-snap row and use the CSS buttons as enhancement.
7. **Cross-document view transitions.** Craft table: Chrome 126, Safari 18.2, Firefox no (limited). The Chrome pages' badge shows only Chrome/Edge 126; Safari's presence is from BCD. Keep enhancement-only; do not block rendering with `rel=expect` on a marketing site without measuring LCP.
8. **Reduced motion for view transitions.** The docs' sample disables all transition animations with `animation: none !important`; the docs also say to prefer subtler alternatives. Our default: disable page-wide movement; allow a short cross-fade.
9. **Case-study numbers** are vendor-selected; do not quote them to clients as outcomes.
10. **Docs' own code issues:** `posotion-area` typo, `*/` stray comment terminator, `lastClick` variable misnamed (`lastClickX`) in the pagereveal sample. Do not paste without running.

Judgement calls: with so many Chromium-only features, keep a "tier" tag on every snippet (verified-C156 means Chromium only). Prefer the feature only when the fallback is acceptable to the brand; for hero art, an unsupported scroll animation should look like a finished design, not a degraded one.

## 6. Figures worth keeping

No images saved. Candidates: the `::view-transition` pseudo-element tree; the nine-cell `position-area` grid; the LCP/scroll timeline visualisations in the scroll-driven article; the carousel accessibility-tree screenshot.

## 7. Open questions

- Firefox and WebKit not available locally, so all behavioural results are Chromium 156 only.
- Which version of Safari first supports `scroll-state`, `interpolate-size`, `::scroll-marker`: pages say none; BCD in the craft note governs.
- `@scope` Safari version 26.4 is from the craft note's BCD pass, not the Chrome page (badge shows only Chrome/Edge/Firefox).
- `anchor="id"` attribute on popovers and `selectedoption` element name: older syntax; confirm against the final specs.
- The high-definition colour guide was read for its first third (gamuts, spaces, classic syntaxes); the later sections (wide-gamut migration steps) were not read.
- Pages with no extractable rule content: `docs/css-ui` index (link list), `web-animations-resources` (resource list).
