---
source: web:https://web.dev/learn/design
chapter: web.dev Learn Responsive Design (17 modules, Jeremy Keith with Rachel Andrew, Una Kravets, Adam Argyle, Camden Bickel; pages updated 2021-2026)
pages: n/a
topic_tags: [responsive, media-queries, container-queries, layout, typography, images, icons, theming, dark-mode, interaction, input, patterns, internationalization]
status: studied
---

# web.dev Learn Responsive Design

Fetched 2026-10-08, raw text in `corpus/web/a11y-components/wddesign-*.txt` (private). All 17 modules read: welcome, intro, media-queries, internationalization, macro-layouts, micro-layouts, typography, responsive-images, picture-element, icons, theming, accessibility, interaction, ui-patterns, media-features, screen-configurations, conclusion. The user-visible title is "Learn Responsive Design"; the URL path is `/learn/design`. Paraphrased; self-assessment quiz items were read for intent but are not reproduced.

Companions: `../web/implementation-craft.md` sections 2.1-2.5 (many of these rules corroborate or tighten it), `webdev-learn-accessibility.md`, `inclusive-components.md`.

## 1. Core ideas

1. The fixed-width, liquid and adaptive eras each failed at extremes; responsive design is fluid grids plus fluid media plus media queries. Every design decision should survive widths nobody planned for.
2. `<meta name="viewport" content="width=device-width, initial-scale=1">` is what stops mobile browsers pretending the page is 980 px wide and scaling it down. It is the precondition for everything else.
3. Choose breakpoints from the content (where a line gets too long, a nav no longer fits), not from device sizes; add rules additively with `min-width` so each breakpoint only introduces something new.
4. Layout has two scales: macro (page regions) and micro (components). Grid and flexbox serve both. Container queries let a component respond to its own container, so media queries do page structure and container queries do components.
5. Many layouts need no media query at all: `repeat(auto-fill, minmax(15em, 1fr))` or flex-wrap with a basis lets the browser do the arithmetic.
6. Text is responsive by default; make it comfortable. Relative units, a `clamp()` fluid size with a floor at the user's base size, `ch`-based measure, unitless line-height.
7. Do not infer input from screen size. Use `pointer`, `any-pointer`, `hover`, `any-hover`; do not hide anything important behind hover; touch targets help everyone (Fitts's Law).
8. Responsive means responding to people as well as screens: `prefers-color-scheme`, `prefers-contrast`, `forced-colors`, `prefers-reduced-motion`, `scripting`, font-size changes up to 400%.
9. Internationalisation is a layout concern: logical properties, `lang`/`hreflang`, room for long words and diacritics, no text in images.
10. Design for the smaller screen first; it is easier to scale a good small layout up than to squeeze a large one down. Patterns (nav, carousels, tables) should avoid hiding content, and when they must, say so clearly.

## 2. Rules

### 2.1 Viewport, media queries, breakpoints

- **RULE [WDD-01]** Include the viewport meta `width=device-width, initial-scale=1` in every page head and do not add zoom-blocking values.
  **Why** Without it mobile browsers lay out at about 980 px and shrink the result; with `user-scalable=no` or low `maximum-scale` users cannot zoom.
  **Applies to** all. **Check** `L8`: `document.querySelector('meta[name=viewport]').content` matches `width=device-width` and `initial-scale=1`, no `user-scalable=no`/`maximum-scale<5`. **Source** https://web.dev/learn/design/intro

- **RULE [WDD-02]** Pick breakpoints at the point where the content breaks (uncomfortably long lines, a nav that no longer fits, a table that overflows), not at popular device widths. State them in `em`/`rem` when the content is text-led, pixels only when image-led.
  **Why** Device widths change every release cycle, content does not; `em` breakpoints follow user text-size.
  **Applies to** all. **Check** sweep widths 320..2560 in 20 px steps and record layout-change widths; each corresponds to an overflow/measure threshold, not a device list; CSS media queries in `em`/`rem` (soft). **Source** https://web.dev/learn/design/media-queries

- **RULE [WDD-03]** Write layout media queries additively with `min-width` (and `min-height` where height matters); mobile styles are the default and each breakpoint introduces new rules instead of undoing old ones. Range syntax (`(50em <= width <= 60em)`) is available and clearer for bounded ranges.
  **Why** Less to override; mobile-first is easier to reason about. (opinion: the author states he prefers `min-width`; `max-width` is equally valid for a desktop-first design.)
  **Applies to** hand-written CSS. **Check** CSS scan: ratio of `min-width` to `max-width` queries >= 3:1 outside print/reduced-motion; no `max-width` query that exists only to undo a base rule (soft). **Source** https://web.dev/learn/design/media-features

- **RULE [WDD-04]** Only apply multi-column or tall-chunk layouts when both dimensions allow it, e.g. require height as well as width for a two-column text flow, so wide short windows do not force scroll-down-then-up reading.
  **Why** Landscape phones and short windows are real; columns that need vertical scrolling twice are worse than one column.
  **Applies to** CSS columns, sticky headers (put `position: fixed` behind `min-height`). **Check** emulate 900x400 and 1280x500: no sticky element occupies more than 25% of viewport height (`L-sticky` soft); columns only in `(min-height)` guarded queries. **Source** https://web.dev/learn/design/media-queries and https://web.dev/learn/design/media-features

- **RULE [WDD-05]** Default to a single-column, sensible DOM order that works at the smallest width, then apply grid or flex at wider widths. The source order is what small screens, screen readers and tab order get.
  **Why** A mobile layout is the zero-CSS flow; wide layouts decorate it.
  **Applies to** page shells. **Check** at 320 px list `main > *` in DOM order vs visual order (bounding rects), they match (`A4`). **Source** https://web.dev/learn/design/macro-layouts

### 2.2 Layout (macro, micro, container)

- **RULE [WDD-06]** For card/feature grids use intrinsic sizing instead of per-breakpoint column counts: `grid-template-columns: repeat(auto-fill, minmax(15em, 1fr))` with `gap`, or flex with `flex-wrap: wrap; flex-basis: 15em; flex-grow: 1`. Use grid when rows and columns must align; flexbox lets the last row stretch.
  **Why** Fewer queries and no gap cases between breakpoints.
  **Applies to** card grids, logo walls, pricing lists. **Check** card container computed `grid-template-columns` changes continuously with width without matching a media query; count of `@media` rules that only change `grid-template-columns` is 0 (soft). **Source** https://web.dev/learn/design/macro-layouts

- **RULE [WDD-07]** Use CSS grid for page-level two-column splits in one rule on the container (e.g. `grid-template-columns: 2fr 1fr` above ~45em); it encodes column proportions in one place where flexbox needs a rule per child.
  **Why** Maintainability.
  **Applies to** content + sidebar layouts. **Check** `visual`; static: one grid declaration per split. **Source** https://web.dev/learn/design/macro-layouts

- **RULE [WDD-08]** Components that can appear in several columns must lay themselves out from their container, not the viewport: set `container-type: inline-size` on the context element and switch the component's internal layout with `@container (min-width: ...)`. Use media queries for page structure and container queries for components.
  **Why** The same card sits in main, sidebar and modal; viewport width says nothing about its room.
  **Applies to** cards, media objects, pricing tiers, testimonials. **Check** render each component in 240, 360, 560, 960 px containers inside a fixed 1280 viewport; layout changes with container width; no horizontal overflow (`L1`). **Source** https://web.dev/learn/design/micro-layouts

- **RULE [WDD-09]** Within a component, state min/max constraints and let flex fill the rest (`flex: 1` and `flex: 3` with `max-inline-size: 200px` on the image) rather than fixed widths.
  **Why** Content-out sizing handles unknown content.
  **Applies to** media objects, avatars + text. **Check** inject 3x content length and 0 content; no overlap (`S7`). **Source** https://web.dev/learn/design/micro-layouts

- **RULE [WDD-10]** Components designed from the smallest context up: design the small-screen version first and treat the large one as an expansion, because shrinking a large layout leaves the small one feeling like an afterthought.
  **Why** Quality of the constrained case.
  **Applies to** design brief ordering. **Check** process: brief/spec includes a 360 px rendering before 1440 px. **Source** https://web.dev/learn/design/ui-patterns

### 2.3 Typography

- **RULE [WDD-11]** Fluid type uses `clamp(min, preferred, max)` where the preferred value mixes a relative unit and a viewport unit (`calc(0.75rem + 1.5vw)`), the minimum is at least `1rem`, and the maximum caps growth. Never set font size in `vw` alone.
  **Why** Pure `vw` ignores the user's text-size setting and zoom; a `rem` floor respects base size; a cap avoids extreme sizes.
  **Applies to** headings, hero type. **Check** CSS scan: `font-size` values containing `vw` must also contain `rem`/`em`/`%`; `clamp()` first argument is `rem`/`em` and >= 1rem for body-size text; at 200% browser zoom text actually grows. **Source** https://web.dev/learn/design/typography

- **RULE [WDD-12]** Set measure with `max-inline-size` in `ch` or `rem` (for example 66ch), not px. The module cites Bringhurst: 45-75 characters is satisfactory for single-column serif text, 66 ideal, 40-50 for multi-column.
  **Why** Users scale text; a px width breaks the characters-per-line relationship.
  **Applies to** body copy, articles, descriptions. **Check** `L5`; computed `max-width` on text containers in `ch`/`rem`. **Source** https://web.dev/learn/design/typography

- **RULE [WDD-13]** Line height is a unitless number. Longer lines need more leading (the example uses 1.65 at 66ch), shorter lines may take more (2 at 45ch for a blockquote); very large leading on long lines hurts line-to-line tracking. Typical body 1.5.
  **Why** Unitless values scale with font size; px values do not.
  **Applies to** all text. **Check** `getComputedStyle(el).lineHeight` is `normal` or equals a ratio times font-size within 1.2-1.8 for body; authored CSS has no `line-height: <n>px`. **Source** https://web.dev/learn/design/typography

- **RULE [WDD-14]** Web fonts: serve WOFF2, declare with `@font-face`, preload critical files with `rel=preload as=font type=font/woff2 crossorigin` (the `crossorigin` is required even when self-hosted), choose a `font-display` that is a compromise (a short block period then fallback, e.g. `swap` or `fallback`), and add `size-adjust` on the fallback to reduce shift. Prefer a variable font when many weights are used; `system-ui` often gives variable-font benefits with no download.
  **Why** Fast text paint and stable layout.
  **Applies to** all webfont usage. **Check** `F1`, `F4`; `link[rel=preload][as=font]` all carry `crossorigin`. **Source** https://web.dev/learn/design/typography

- **RULE [WDD-15]** Build and use a typography scale inside the design system so hierarchy is systematic rather than ad hoc.
  **Why** Predictable relationships carry the hierarchy.
  **Applies to** design system. **Check** `H7`: <= 8 distinct computed font sizes per page. **Source** https://web.dev/learn/design/typography

### 2.4 Images and icons

- **RULE [WDD-16]** Make images flexible and stable: `max-inline-size: 100%; block-size: auto` (also video, iframe), `width` and `height` attributes to reserve space, `aspect-ratio` plus `object-fit: cover|contain` plus `object-position` when the design needs another ratio.
  **Why** Prevents overflow and layout shift; hints only, CSS still controls rendering.
  **Applies to** all media. **Check** `I2`, `L1`; `img{max-width:100%}` or equivalent. **Source** https://web.dev/learn/design/responsive-images

- **RULE [WDD-17]** `loading="lazy"` for below-the-fold or beyond-the-edge (carousel) images; hero images stay eager; add `fetchpriority="high"` only to the one image that is truly vital (LCP) because it deprioritises other resources; preload only what the HTML cannot expose (CSS backgrounds, JS-injected images), and do not preload alternative formats conditionally.
  **Why** Spend priority and bandwidth where it matters; preloading multiple formats downloads waste.
  **Applies to** hero, galleries. **Check** `I3`, `I4`. **Source** https://web.dev/learn/design/responsive-images

- **RULE [WDD-18]** Responsive resolution switching: `srcset` with width descriptors needs a `sizes` attribute describing the displayed width per condition; density descriptors (`1x`, `2x`) cannot be combined with `w`. `srcset` supplements `src` (still required). The largest file is not necessarily for the widest viewport because multi-column layouts show narrower images.
  **Why** The browser chooses before CSS loads; wrong `sizes` wastes bytes or blurs.
  **Applies to** all content images. **Check** `I5`, `I7`: every `img[srcset*=" "w"]` has `sizes`; no mix of `w` and `x`. **Source** https://web.dev/learn/design/responsive-images

- **RULE [WDD-19]** Use `<picture>` when you need commands rather than hints: format fallback (AVIF, then WebP, then JPEG) with `type`, and art-direction crops with `media` on `source` (give each `source` width/height). The `alt` text must work for every crop. The inner `img` is mandatory.
  **Why** Different crops and formats are decisions, not suggestions.
  **Applies to** hero crops, formats. **Check** `picture > img` exists; source order is most-capable first; `alt` present once. **Source** https://web.dev/learn/design/picture-element

- **RULE [WDD-20]** Always keep the `alt` attribute: `alt=""` for presentational images, and prefer CSS backgrounds for presentational imagery because HTML is for content.
  **Why** A missing `alt` tells the screen reader nothing; an empty one marks it presentational.
  **Applies to** all. **Check** `I1`. **Source** https://web.dev/learn/design/responsive-images

- **RULE [WDD-21]** Use SVG for icons. Inline SVG gives CSS control (`fill: currentColor`, hover, focus, dark mode) and one fewer request; reuse repeated icons with `<use>`. Icon plus visible text: hide the icon from AT (`aria-hidden="true"` or `alt=""`). Icon-only control: the accessible name sits on the button (`aria-label` or visible hidden text) and the icon is hidden, or the `<img alt>` states the meaning, not the shape ("Menu" not "three lines").
  **Why** Icons are UI, not content; a standalone icon needs a name, a paired icon does not.
  **Applies to** nav, buttons, social links. **Check** `button:has(svg)` and `a:has(svg)` without text: accessible name non-empty; svg inside has `aria-hidden="true"`; icon colour via `currentColor` (grep `fill="#` count 0 for monochrome icons, soft). **Source** https://web.dev/learn/design/icons

- **RULE [WDD-22]** Do not assume an icon alone is understood; add text for important actions, and if you ship icon-only, test with real users.
  **Why** Meaning of icons varies by audience and culture.
  **Applies to** nav toggles, toolbars. **Check** `visual`: primary nav and CTA controls have text; ok for universally known icons (close, search). **Source** https://web.dev/learn/design/icons and https://web.dev/learn/design/ui-patterns

### 2.5 Input, interaction and patterns

- **RULE [WDD-23]** Detect input capabilities with media features, not screen size: `pointer` (primary: none, coarse, fine), `any-pointer` (any device), `hover`, `any-hover`. Order `any-pointer: fine` before `any-pointer: coarse` because both can be true and the last wins.
  **Why** Touch laptops, tablets with keyboards and phones with mice all exist.
  **Applies to** target sizing, hover-only UI. **Check** CSS scan for hover-dependent reveals wrapped by `(hover: hover)` or `(any-hover: hover)`; touch-size rules inside `(pointer: coarse)`. **Source** https://web.dev/learn/design/interaction

- **RULE [WDD-24]** Increase target padding for coarse pointers (the module's example doubles button padding) but do not shrink controls for fine pointers. Larger targets help everyone (Fitts's Law).
  **Why** Precision varies even with a mouse.
  **Applies to** buttons, links, nav items. **Check** `L7`/`L7b`; computed button height with `hasTouch` >= height without. **Source** https://web.dev/learn/design/interaction

- **RULE [WDD-25]** Anything revealed on hover must also be revealed on keyboard focus (`:is(:hover, :focus-within)`), and important information or controls must not live only behind hover. For devices that cannot hover, default to showing it (`@media (any-hover: none)`).
  **Why** Keyboard and touch users cannot hover.
  **Applies to** card actions, tooltips, row actions. **Check** `S4`: with `hasTouch` and no hover, the content is visible or reachable by tap/focus. **Source** https://web.dev/learn/design/interaction

- **RULE [WDD-26]** Tell mobile keyboards what to show: `type=email|tel|url|number`, `inputmode=numeric|decimal` for numeric strings (age, amounts), and `autocomplete` tokens (`name`, `email`, `country` etc.) on every identity or address field.
  **Why** Fewer keystrokes, fewer errors.
  **Applies to** forms. **Check** `A10`: `input[name*=email]` has `type=email`; phone fields `type=tel`; postcode/OTP fields have `inputmode`; `autocomplete` present. **Source** https://web.dev/learn/design/interaction. [engine note] Prefer `inputmode="numeric"` on `type="text"` for codes and IDs; the module pairs it with `type=number`, which has its own spinner/stepping and formatting side effects.

- **RULE [WDD-27]** Avoid hiding primary navigation behind a button on small screens when it fits; if it does not fit, use the overflow pattern (single row that scrolls, first items most important, a visible cue such as a fade gradient), and only as a last resort a labeled disclosure toggle. The toggle needs a text label, not just an icon.
  **Why** Hiding forces two taps and removes the "where can I go" signal.
  **Applies to** header nav at <= 600 px. **Check** at 390 px: if nav has <= 5 links all visible; if toggle exists, `button[aria-expanded]` has visible text; overflow scroller shows a clipped item or gradient (`visual`). **Source** https://web.dev/learn/design/ui-patterns

- **RULE [WDD-28]** Carousels: do not use them to hide content. If space forces it, use a hybrid: horizontal scroll with `scroll-snap-type: inline mandatory` and item width less than 100% (so the next item peeks) on small screens, and a normal grid on wide screens (e.g. above 50em). Do not autoplay when other content shares the page. Lazy-load images beyond the edge.
  **Why** Hidden content is rarely discovered; autoplay competes with reading.
  **Applies to** testimonial, logo, product carousels. **Check** at 390 px the next card's left edge is visible (`rect.left < innerWidth` for item 2); `[autoplay]`/timers advancing slides count 0; at >= 800 px the items are in a grid. **Source** https://web.dev/learn/design/ui-patterns

- **RULE [WDD-29]** Wide data tables use the overflow pattern: a container with `max-inline-size: 100%; overflow-x: auto`, with a visible indicator (shadow or gradient) that more content exists.
  **Why** Keeps the page from scrolling sideways while preserving table semantics.
  **Applies to** tables, comparison matrices. **Check** `L1`; `.table-container{overflow-x:auto}`; container has a focus path (see `inclusive-components.md` IC-44). **Source** https://web.dev/learn/design/ui-patterns. [engine note] The module's example adds `scroll-snap-type: mandatory` to the table container; `adrian-roselli.md` AR-17 advises against snapping on tables.

### 2.6 Internationalisation

- **RULE [WDD-30]** Use logical properties and values, not left/right/top/bottom: `margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start|end`, `max-inline-size`, `block-size`. Flexbox and grid are already logical. (Media queries still use `width`/`height` as logical forms are not supported.)
  **Why** One stylesheet then serves RTL and vertical writing modes.
  **Applies to** all CSS. **Check** `H6`: physical `left|right|margin-left|margin-right|padding-left|padding-right|text-align:(left|right)` occurrences = 0 outside deliberate cases; test `dir="rtl"` on `html` and run `L1`/`S7`. **Source** https://web.dev/learn/design/internationalization

- **RULE [WDD-31]** Set `lang` on `html`, `lang` on inline foreign phrases, and `hreflang` on links and `link[rel=alternate]` to translations; if a link's text is in the target language use both `lang` and `hreflang`.
  **Why** Pronunciation, search and translation tools.
  **Applies to** multilingual sites. **Check** `html[lang]` valid; every `link[rel=alternate][hreflang]` has a matching self-reference; `a[hreflang]` text language matches (manual). **Source** https://web.dev/learn/design/internationalization

- **RULE [WDD-32]** Design for text expansion and glyph variety: no narrow columns that break on long words (German), hyphenation or `overflow-wrap` available, line-height that fits diacritics, web fonts with the glyph coverage you need, and no text baked into images.
  **Why** Translation will lengthen strings and add accents.
  **Applies to** all copy-bearing components. **Check** `S7`: +40% text length and a 40-character unbroken token, RTL; no overlap or clipping. **Source** https://web.dev/learn/design/internationalization

### 2.7 Theming and accessibility preferences

- **RULE [WDD-33]** Implement theme colours with custom properties that you reassign inside `@media (prefers-color-scheme: dark)`, or with `light-dark()` once `color-scheme: light dark` is set on `:root`. Set `color-scheme` (CSS or `<meta name="color-scheme">`) so form controls and scrollbars follow the theme; use `accent-color` for checkboxes and radios and re-tune it for dark.
  **Why** One definition of each token; native controls match.
  **Applies to** all themed pages. **Check** `S6`; `getComputedStyle(document.documentElement).colorScheme` contains `light dark` or `dark`; native controls render dark under `emulateMedia({colorScheme:'dark'})`. **Source** https://web.dev/learn/design/theming and https://web.dev/learn/design/media-features. [engine note] See section 5: one theming page shows a non-standard `supported-color-schemes` meta; use `color-scheme`.

- **RULE [WDD-34]** Add `<meta name="theme-color">` (with `media="(prefers-color-scheme: ...)"` variants) so browser UI matches; keep changes subtle and rare when updated by script. Use SVG favicons that react to `prefers-color-scheme` if desired.
  **Why** Extends brand into browser chrome; prevents a flash of unthemed chrome because meta is read before CSS.
  **Applies to** all. **Check** `meta[name=theme-color]` present; dark variant present when dark theme exists. **Source** https://web.dev/learn/design/theming

- **RULE [WDD-35]** In dark mode tone down bright photographs (`filter: brightness(.8) contrast(1.2)` in the module's example) or swap art with `<picture><source media="(prefers-color-scheme: dark)">` (maps, diagrams).
  **Why** Full-brightness photos glare on dark UI.
  **Applies to** dark themes. **Check** `visual` screenshot in dark mode; computed `filter` on content images when dark. **Source** https://web.dev/learn/design/theming

- **RULE [WDD-36]** Always declare `color` and `background-color` together, and never assume the default background; users and forced themes change defaults.
  **Why** An element that sets only one can end up unreadable.
  **Applies to** all CSS. **Check** for each rule that sets `color` on `body`/containers, a background is set on the same or an ancestor; run `A2` under `forcedColors:'active'` and `prefers-contrast:more`. **Source** https://web.dev/learn/design/accessibility

- **RULE [WDD-37]** Style links with more than colour (underline or weight) and give keyboard focus a stronger indicator than hover. The module's example uses a thin dotted outline for hover/focus and a 3px solid outline for `:focus-visible`.
  **Why** Colour-vision differences and keyboard clarity.
  **Applies to** inline links. **Check** `A3`; link `text-decoration` or `font-weight` differs from body; `a:focus-visible` outline width >= 2px. **Source** https://web.dev/learn/design/accessibility. [engine note] Bold alone is a weak non-colour cue; keep the underline default.

- **RULE [WDD-38]** Wrap transform/zoom-like transitions in `@media (prefers-reduced-motion: no-preference)`; reduced motion does not mean no animation: colour changes and cross-fades remain acceptable. Do not rely on `update: fast` for anything critical.
  **Why** Vestibular safety while keeping feedback.
  **Applies to** hover/focus transitions, page transitions. **Check** `A11`: under `reducedMotion:'reduce'`, transforms/translations/scale do not animate; opacity/colour may. **Source** https://web.dev/learn/design/accessibility and https://web.dev/learn/design/media-features

- **RULE [WDD-39]** Handle forced colors and high contrast: test `forced-colors: active`; use `forced-color-adjust: none` only on elements whose colours carry meaning (colour pickers, chart keys) and verify them; to target a user who wants more contrast without forced colours use `(prefers-contrast: more) and (forced-colors: none)`. Watch for box-shadows when colours are inverted.
  **Why** In forced colours, your palette is replaced; meaning conveyed by colour alone vanishes.
  **Applies to** custom controls, charts. **Check** `A18`; grep `forced-color-adjust:\s*none` only on allow-listed selectors. **Source** https://web.dev/learn/design/media-features and https://web.dev/learn/design/accessibility

- **RULE [WDD-40]** Make layouts survive font-size preferences: use `rem` for type and spacing that should scale; verify at 200% and 400% default text size that a desktop window shows the small-screen layout without loss.
  **Why** Low-vision users set large defaults; a good responsive design converts that to a narrow-screen layout.
  **Applies to** all. **Check** `A13`; set `html { font-size: 400% }` or CDP font scale, assert no horizontal scroll and no clipped controls. **Source** https://web.dev/learn/design/accessibility

- **RULE [WDD-41]** Use the `scripting` media feature for no-JS fallback styling (`@media (scripting: none)`), and `env(safe-area-inset-*)` (with fallback value and `viewport-fit=cover`) for notches. Treat `viewport-segments` foldable queries as experimental; do not depend on them.
  **Why** Progressive enhancement and device cutouts.
  **Applies to** edge-to-edge layouts, fixed bars. **Check** `L3`: when `viewport-fit=cover` is set, fixed bars use `env(safe-area-inset-bottom, ...)`. **Source** https://web.dev/learn/design/media-features and https://web.dev/learn/design/screen-configurations

## 3. Numbers & scales

| Item | Value | Notes |
|---|---|---|
| Legacy mobile viewport default | 980 px | why the meta tag matters |
| Historic fixed widths | 640, 800, 1024 | era history |
| Navigation overflow pattern | show clipped item or gradient | no number given |
| Comfortable line length | 45-75 ch; 66 ideal; 40-50 for multi-column | Bringhurst via module |
| Example measures | article 66ch with line-height 1.65; blockquote 45ch with line-height 2 | |
| Fluid type example | `clamp(1rem, 0.75rem + 1.5vw, 2rem)` | min 1rem, max 2rem |
| Stepped type example | 125%, 150%, 175%, 200% at 30em, 40em, 50em, 60em | jumpy, module prefers fluid |
| Macro layout breakpoint example | 45em, `2fr 1fr` | |
| Auto-fill card minimum | 15em | `repeat(auto-fill, minmax(15em, 1fr))` |
| Media object | image `flex: 1` with `max-inline-size: 200px`, text `flex: 3`; container query at 25em | |
| Carousel to grid switch | 50em | `max-width: 50em` scroller, `min-width: 50em` grid |
| Carousel item basis | 15em | |
| Picture breakpoints example | 75em large, 40em medium | |
| sizes example | `(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw` | |
| Hero crop example | 1200x500 (>= 75em), 800x400 (>= 50em), 400x400 default | |
| Pointer example | coarse padding `1em 2em` vs `0.5em 1em` | |
| Dark photo filter | `brightness(.8) contrast(1.2)` | |
| Prefers-contrast values | no-preference, less, more, custom (forced-colors) | |
| Supports | `prefers-reduced-motion` Chrome 74 / Safari 10.1 / Firefox 63; `prefers-color-scheme` 76/12.1/67; `prefers-contrast` 96/14.1/101; `inputmode` 66/12.1/95 | from module badges |
| Text-size stress | verify at 200% and 400% | |

## 4. Dos and Don'ts

- Don't: `.byline { text-align: right }`. Do: `text-align: end`.
- Don't: `label { margin-right: .5em }`. Do: `margin-inline-end`.
- Don't: `article { max-inline-size: 700px }`. Do: `66ch`.
- Don't: `line-height: 24px`. Do: `1.5`.
- Don't: `html { font-size: 2.5vw }`. Do: `calc(0.75rem + 1.5vw)` or `clamp()`.
- Don't: separate subdomain for mobile or UA sniffing. Do: one responsive site.
- Don't: separate stylesheet per media query. Do: `@media` blocks (separate sheets fine for print).
- Don't: shrink buttons for `pointer: fine`. Do: leave them generous.
- Don't: hide extra icon on hover only (`visibility:hidden` with `:hover` reveal). Do: reveal with `:is(:hover, :focus)` and show it when no hover exists.
- Don't: `a { color: red }` as the only link cue. Do: also underline or weight.
- Don't: set `body{color:black}` only. Do: pair with `background-color`.
- Don't: `<img>` without `alt`. Do: `alt=""` if presentational.
- Don't: icon button with no name (`<button><img src=hamburger.svg alt=""></button>`). Do: add `aria-label="Menu"` or visible text.
- Don't: hide navigation behind a bare hamburger icon. Do: labeled "Menu" button or visible links.
- Don't: shrink a large layout to fit phones. Do: design small first.

## 5. Exceptions & judgement calls

Conflicts and overlaps with existing notes (`../web/implementation-craft.md`):

1. **Corroborates** (no change needed): viewport meta (`L8`), content-driven breakpoints, 45-75/66 ch measure (`L5`), width/height + lazy/eager/fetchpriority (`I2-I4`), srcset/sizes rules (`I5`, `I7`), woff2 + `crossorigin` preload + `font-display` + `size-adjust` (`F1`, `F4`), logical properties (`H6`), `env(safe-area-inset-*)` with `viewport-fit=cover` (`L3`), hover-only content (`S4`), `forced-colors` (`A18`).
2. **Theming meta.** One page (theming) shows `<meta name="supported-color-schemes">` and its quiz reuses it; the media-features page shows `<meta name="color-scheme">`. The latter is the standard. Existing implementation-craft rule 2.8 (meta `color-scheme`) is correct; do not adopt `supported-color-schemes`.
3. **Focus in hover reveal.** Module example for revealing on hover uses `:hover` and `:focus`; for composite widgets use `:focus-within` (see `inclusive-components.md` IC-09). Not a conflict.
4. **Table overflow with scroll snap.** The ui-patterns module puts `scroll-snap-type: inline mandatory` on a table container. Roselli tested snap on tables and found cells straddling comparisons and clipped captions; treat snap on tables as discouraged (`adrian-roselli.md` AR-17).
5. **Mandatory scroll snap on carousels.** Module sample uses `mandatory`; mandatory snap can make content with tall/wide items unreachable at zoom. Prefer `proximity` unless items always fit; test at 200% zoom. [engine note]
6. **Breakpoints.** Module: choose by content. Existing note suggests named defaults (40/64/90 rem). Compatible: use named defaults as starting values, then adjust by content.
7. **Mobile-first is author preference.** The module says "personally I prefer min-width"; both work. Existing Tailwind guidance is mobile-first; keep.
8. **Media query logical properties.** The module notes `min-inline-size` is not allowed inside media queries; true as of 2021 text. [engine note] Spec status unchanged to my knowledge; verify with BCD before relying.
9. **Experimental `viewport-segments`.** Marked experimental in the module; do not ship.
10. **`inputmode` with `type=number`.** See WDD-26 note; engine prefers text + `inputmode`.
11. **Interactions the existing note lacks**: pointer/any-pointer ordering and the "coarse wins last" rule (WDD-23); picture `source` width/height; `scripting` media feature; icon pairing semantics. Candidates to merge into implementation-craft.

## 6. Figures worth keeping

Not captured. Interactive demos worth reproducing as fixtures: the adaptive vs liquid vs responsive layout comparison (intro), the media-scroller (carousel to grid), table overflow container, container-query media object, and the dark-mode picture swap (a map). They map directly to test pages for `L1`, `S4`, `S6`.

## 7. Open questions

- Pages updated recently in the series: media-queries and media-features (2025-08), picture-element (2026-07). Others date from 2021 and may lag newer CSS (anchor positioning, popover, `light-dark()` detail).
- The ui-patterns module recommends scroll-snap defaults without discussing zoom; no figures given for how many nav items "fit".
- `p.NN: no rule content`: welcome, conclusion (resources only), screen-configurations (experimental foldable APIs).
