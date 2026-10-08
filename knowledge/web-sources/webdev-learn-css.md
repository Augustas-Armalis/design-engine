---
source: web:https://web.dev/learn/css
chapter: web.dev Learn CSS (39 articles read: welcome, box-model, selectors, cascade, specificity, inheritance, color, sizing units, layout, flexbox, grid, logical properties, spacing, pseudo-elements, pseudo-classes, borders, shadows, focus, z-index, functions, gradients, filters, blend modes, animations, backgrounds, lists, overflow, typography, counters, cursors-and-pointers, custom properties, transitions, nesting, paths/shapes/clipping/masking, container queries, anchor positioning, popover and dialog, view transitions for SPAs, conclusion)
pages: n/a
topic_tags: [css, layout, grid, flexbox, subgrid, container-queries, cascade, specificity, custom-properties, color, oklch, gradients, typography, logical-properties, overflow, scroll-snap, focus, popover, anchor-positioning, view-transitions, motion, nesting]
status: studied
---

# web.dev Learn CSS: rules, numbers and copy-ready patterns

Fetched 2026-10-08 (raw HTML and extracted text in `corpus/web/webdev-css/`, private and gitignored). Course text is CC BY 4.0, code Apache 2.0; everything below is paraphrase plus original snippets. Article "last updated" stamps seen: anchor positioning 2025-08-22; most others 2022-2025 (stamp per page in the raw HTML footer). Browser-support numbers are the "Baseline" badges rendered in the pages on 2026-10-08.

Not read: `learn/css/quiz` (assessment only, no rule content) and the two `card` nav stubs, which return 404. Quiz blocks inside articles were dropped by the extractor; their answers repeat article text.

Companion notes: `../web/implementation-craft.md` (baseline support table and Tailwind v4 idioms), `chrome-css-ui-new-apis.md` (the newer APIs in depth), `webdev-forms-and-images.md`, `webdev-performance-for-marketing.md`.

Evidence labels: **[verified-C156]** = I ran the snippet in Playwright Chromium 156.0.8078.4 on 2026-10-08 (harness `corpus/web/webdev-css/_tests/verify.mjs`, 25/25 pass). Firefox and WebKit builds were not installed, so cross-engine behaviour is **[untested]**. **[source]** = stated by the page. **[engine note]** = my own addition.

---

## 1. Core ideas

1. **Layout is a choice between three systems, each with a job.** Flexbox distributes a one-dimensional group along one axis; grid places items on rows and columns together; flow layout (block, inline, float, columns, positioning) is the default. Pick by content shape, not habit. Both modern systems respect writing mode, so start/end replace left/right in their vocabulary.
2. **Intrinsic beats extrinsic for text containers.** Extrinsic sizing (fixed width and height) gives control but overflows when copy grows; intrinsic sizing (`auto`, `min-content`, `max-content`, `fit-content()`) lets content decide. Fixed boxes are for media, not copy.
3. **The cascade is four ordered stages, not just specificity.** Importance and origin first, then specificity, then order of appearance (with `@layer` and, newer, `@scope` proximity slotting in). Animations and transitions outrank normal rules; an active transition outranks even `!important`.
4. **Keep specificity low on purpose.** `:where()` contributes zero, `:is()`, `:not()`, `&` (nesting) take the weight of their heaviest argument. IDs, long compound selectors and `!important` are how stylesheets become unmaintainable.
5. **Custom properties are typed only if you register them.** A plain `--x` is any token stream and inherits; `@property` gives syntax, inheritance control and a mandatory initial value (unless syntax is `*`), which is what lets tokens animate.
6. **A custom property that resolves to an invalid value for the property it is used in does not fall back to an earlier declaration.** The declaration becomes "invalid at computed-value time" and the property reverts to inherited or initial (for `background-color` that is transparent).
7. **Modern colour is about manipulability.** Hex and rgb are fine as inputs; `oklch()` gives perceptually even lightness, `color-mix()` and relative colour syntax derive hover/border/disabled tints, and wide-gamut colours are gamut-mapped on narrow screens.
8. **Order of the DOM is the order of focus and of screen readers.** Flex `order`, `row-reverse`, grid `dense` packing and `display: contents` can all desynchronise visual and logical order; web.dev says to fix the HTML rather than reorder in CSS.
9. **Popover, anchor positioning and view transitions are the platform replacements for JS widgets.** Popover supplies top layer, light dismiss, Esc and focus return; anchor positioning supplies tethering and overflow fallbacks; view transitions supply state-change animation. All three need explicit fallbacks and reduced-motion handling.
10. **Motion is opt-in per user.** web.dev's transitions article says colour transitions usually do not need a reduced-motion guard; movement does. Its animation article shows a bare `@media (prefers-reduced-motion)` that pauses autoplaying animation. View-transition guidance: reduce, do not necessarily remove.

---

## 2. Rules

IDs are `WCSS-nn`. "Applies to" is `all` unless stated.

### 2.1 Box model, sizing, spacing

- **RULE [WCSS-01]** Apply `box-sizing: border-box` to `*, *::before, *::after` in the reset.
  **Why** Default `content-box` adds padding and border to `width`, so `width:100px; padding:20px; border:1px` renders 142 px wide and overflows its parent.
  **Applies to** all. **Check** Playwright: `[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).boxSizing!=='border-box').length` is 0 (allow replaced controls if intentional). **Source** https://web.dev/learn/css/box-model

- **RULE [WCSS-02]** Let text containers size intrinsically: no fixed `height` on any box that holds copy; use `min-height`, padding or `aspect-ratio` on media instead.
  **Why** An extrinsic size has a content limit after which text spills out of the border box; intrinsic sizing resizes with the content.
  **Applies to** all. **Check** for every element with text, `scrollHeight <= clientHeight + 1` after injecting +40% text (stress `S7`); static scan for `height:` on `.card, .btn, p, h1-h6`. **Source** https://web.dev/learn/css/box-model

- **RULE [WCSS-03]** Use unitless `line-height` (for example `1.5`), never a length or percentage, on anything that inherits.
  **Why** A unitless value is recomputed per element from its own font size; a length is inherited as a fixed computed value and looks wrong on larger children.
  **Applies to** all. **Check** static: authored `line-height` values match `^[0-9.]+$|normal|inherit`; computed `line-height / font-size` on `p`, `li`, `h1-h6` is in the ranges of the typography notes. **Source** https://web.dev/learn/css/sizing

- **RULE [WCSS-04]** Size type and spacing with `rem`/`em` (and `ch` for measure); do not declare the root font size in `px`.
  **Why** `px` text ignores the user's default font-size preference; relative units honour it.
  **Applies to** all. **Check** static: `html{font-size:` is `%`, `rem`-free or absent, never `px`; `p, li { font-size }` not `px` in authored CSS. **Source** https://web.dev/learn/css/sizing

- **RULE [WCSS-05]** Cap reading measure with `ch`: body copy `max-inline-size: 60ch` to `75ch` (the course example uses 60ch).
  **Why** `ch` is the width of "0" in the rendered font, so the cap tracks the actual font and size.
  **Applies to** landing page, all. **Check** Playwright: `p.getBoundingClientRect().width / (fontSize * 0.5)` approximates chars per line; assert 45-75 (`L5`). **Source** https://web.dev/learn/css/sizing

- **RULE [WCSS-06]** Use `svh`/`lvh`/`dvh` (and `svw` family) instead of `vh` for anything tied to the visible mobile viewport; use `cqi`/`cqw` inside container-query components.
  **Why** Mobile browser chrome appears and disappears without changing the classic viewport: `svh` is with chrome shown, `lvh` with it hidden, `dvh` tracks live.
  **Applies to** mobile, landing page. **Check** static: bare `100vh` only as a fallback preceding a `dvh|svh` line (`L10`). **Source** https://web.dev/learn/css/sizing

- **RULE [WCSS-07]** Space siblings with `gap` on flex or grid parents (or one-direction margins like `margin-block-start` via `> * + *` with a child combinator) rather than margins on both ends.
  **Why** Vertical margins between block siblings collapse to the larger value, margins do not collapse in flex/grid, and `* + *` without `>` leaks into nested children. Percent padding and margin are always a percentage of the containing block's width, not height.
  **Applies to** all. **Check** static: no `margin-top` and `margin-bottom` pair used for rhythm between siblings; visual regression at 320/1280. **Source** https://web.dev/learn/css/spacing

- **RULE [WCSS-08]** Define spacing and gutter tokens once as custom properties (the course's example: `--gutter: 20px; --spacing: 1em`) and reuse them.
  **Why** One definition cascades everywhere and can be overridden locally.
  **Applies to** all. **Check** static: count distinct `padding/margin/gap` literal values in authored CSS is at most the scale length. **Source** https://web.dev/learn/css/spacing

### 2.2 Flexbox and grid

- **RULE [WCSS-09]** Do not use `flex-direction: row-reverse|column-reverse`, `order`, or `grid-auto-flow: dense` to repair DOM order. Change the HTML.
  **Why** Visual order changes but focus order and screen-reader order follow the DOM, so Tab jumps around the layout.
  **Applies to** all. **Check** Playwright: tab through all focusables, record `getBoundingClientRect()` order; assert the sequence is monotonic in reading order per row (`A4`). Static: flag `order:` non-zero and `*-reverse` on containers with focusable children. **Source** https://web.dev/learn/css/flexbox

- **RULE [WCSS-10]** In flex rows that must wrap, set `flex-wrap: wrap` and size items with `flex: 1 1 <basis>`; remember the initial values are `row`, `nowrap`, `flex: 0 1 auto`.
  **Why** With `nowrap`, items shrink to `min-content` then overflow; each wrapped line is its own flex container, so cross-line alignment is impossible (use grid for that).
  **Applies to** all. **Check** `L1` no horizontal overflow at 320; items of equal rank align by grid only (`L12`). **Source** https://web.dev/learn/css/flexbox

- **RULE [WCSS-11]** Use `margin-inline-start: auto` (an auto margin) to split a flex group, not a spacer element; there is no `justify-self` in flexbox.
  **Why** Flex items act as one group on the main axis; an auto margin absorbs the free space on one side.
  **Applies to** nav bars, toolbars. **Check** visual; static: no empty `<div class=spacer>` inside flex containers. **Source** https://web.dev/learn/css/flexbox

- **RULE [WCSS-12]** For equal-width grid columns use `minmax(0, 1fr)` (or `repeat(n, minmax(0, 1fr))`), not bare `1fr`.
  **Why** `1fr` is `minmax(auto, 1fr)`, so a long unbreakable token forces its column wider and the columns stop being equal; `minmax(0,1fr)` lets every track shrink to the share.
  **Applies to** all. **Check** Playwright: inject a 40-character unbroken string into one cell, assert all column widths within 1 px (`S7`). **Source** https://web.dev/learn/css/grid

- **RULE [WCSS-13]** For responsive card grids use `repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` [engine note: the `min(100%, ...)` guard is mine; the course shows `minmax(200px, 1fr)`]. Use `auto-fit` when you want the tracks of a short last row to collapse and stretch, `auto-fill` when you want empty tracks kept.
  **Why** Without the `min()`, a 16 rem minimum overflows a 320 px viewport with gutters.
  **Applies to** landing page. **Check** `L1` at 320; column count at 1280 equals expected. **Source** https://web.dev/learn/css/grid

- **RULE [WCSS-14]** Align inner rows of sibling cards with `subgrid` (`grid-row: span N; grid-template-rows: subgrid`) instead of fixed heights or JS equalisation.
  **Why** The nested grid inherits parent track sizing and gap, so headings, bodies and CTAs line up across cards whatever the copy length. [verified-C156: three cards with 1-line, 6-line and 3-line copy gave identical CTA `top` of 222.4 px; the same markup without subgrid gave 142.4/222.4/160.4.]
  **Applies to** landing page (pricing, features). **Check** Playwright: `getBoundingClientRect().top` of each card's CTA equal within 1 px per row (`L12`). **Source** https://web.dev/learn/css/grid

- **RULE [WCSS-15]** Write `grid-template-areas` as complete rectangles (no empty cells; use `.` for blanks) and redefine the whole property at breakpoints.
  **Why** An incomplete or non-rectangular area string makes the entire declaration invalid and it is silently dropped.
  **Applies to** all. **Check** after load, `getComputedStyle(el).gridTemplateAreas !== 'none'` on each declared area container. **Source** https://web.dev/learn/css/grid

- **RULE [WCSS-16]** Do not use `display: contents` to delete a wrapper that carries semantics (list, button, nav, table parts).
  **Why** The course notes it "has accessibility issues when used on items with semantic meaning"; prefer subgrid when you cannot control the wrapper.
  **Applies to** all. **Check** static: `display:\s*contents` only on elements with no role (`div`, `span`). **Source** https://web.dev/learn/css/grid

### 2.3 Cascade, specificity, selectors, nesting

- **RULE [WCSS-17]** Never style with ID selectors; keep authored selectors at specificity `(0,2,0)` or lower; reach for `:where()` to zero out base and reset rules.
  **Why** One ID outranks any number of classes; a `:where(#a)` rule still has `(0,0,0)` and loses to `p`, which is the desired property of a reset.
  **Applies to** all. **Check** static: count of `#id` selectors in authored CSS is 0; max specificity from a CSS parse is `(0,2,0)`; `!important` count at most 3. **Source** https://web.dev/learn/css/specificity

- **RULE [WCSS-18]** To override instead of escalate, move the rule later, put the third-party CSS in an earlier `@layer`, or use `revert-layer`; as a last resort repeat the class (`.btn.btn`).
  **Why** `revert-layer` hides only the current layer's value so library defaults show again; repeating a class adds `(0,1,0)` without an ID but signals a design smell if frequent.
  **Applies to** all. **Check** static: third-party stylesheets imported with `@import url() layer(vendor)`. **Source** https://web.dev/learn/css/inheritance

- **RULE [WCSS-19]** Do not assume a CSS-only comparison beats an inline style or `!important`: inline `style=""` does not add specificity (it is a separate step) and `!important` is a different origin.
  **Why** Knowing the order (importance, origin, specificity, position) prevents specificity wars; in the source `:visited`/`transition` examples show order effects.
  **Applies to** all. **Check** static count of `style="` with colour/size on components in the markup is 0 except per-instance custom properties. **Source** https://web.dev/learn/css/the-cascade

- **RULE [WCSS-20]** Style link states in LVHA order (`:link`, `:visited`, `:hover`, `:active`) and only with colour properties on `:visited`.
  **Why** Later equal-specificity rules win; `:visited` is limited to colour, background-color, border-color, outline-color and SVG fill/stroke for privacy.
  **Applies to** all. **Check** static order scan; Playwright hover state computed colour differs from default. **Source** https://web.dev/learn/css/pseudo-classes

- **RULE [WCSS-21]** Use `:is()` to group, `:not()` to exclude, and `:has()` for parent state, remembering that `:is()` forgives bad arguments but `:has()` does not (one invalid selector, such as a pseudo-element, discards the whole rule) and `:has()` cannot nest.
  **Why** Silent rule loss is a layout bug that no linter on the property line will catch.
  **Applies to** all. **Check** Playwright: after load, each `:has()` rule's target matches in at least one state (`document.querySelector(sel)` non-null in a fixture); static: no `:has(` containing `::`. **Source** https://web.dev/learn/css/pseudo-classes

- **RULE [WCSS-22]** For zebra striping or counts on filterable lists use `:nth-child(even of :not([hidden]))`.
  **Why** Plain `:nth-child(even)` counts hidden rows, so two visible rows can share a colour.
  **Applies to** tables, lists. **Check** fixture: hide row 2, assert visible rows alternate in computed background. **Source** https://web.dev/learn/css/pseudo-classes

- **RULE [WCSS-23]** Nest at most 2-3 levels, write `&` whenever you mean a compound (`&:hover`, `&.is-open`) and put a type selector before `&` (`p&`, not `&p`). Nested rules and `@media`/`@container`/`@supports`/`@layer` can sit inside a rule.
  **Why** Without `&` a nested selector is a descendant selector; the nested selector takes the specificity of the most specific parent selector in a list, so `#a, .b { & a {} }` weighs like `#a a`.
  **Applies to** all. **Check** static: nesting depth at most 3; no `&p` token; no `#` selector in a nesting parent list. **Source** https://web.dev/learn/css/nesting

- **RULE [WCSS-24]** Do not put pseudo-elements in a nested parent selector list and expect `&` to match them; nest the pseudo-element rule explicitly (`&::before`).
  **Why** `&` cannot represent pseudo-elements.
  **Applies to** all. **Check** static review of `blockquote, blockquote::before { & {} }` shapes. **Source** https://web.dev/learn/css/nesting

- **RULE [WCSS-25]** Generated content must not carry meaning: any non-empty `content` string on `::before/::after` is exposed to screen readers, so use `content: ""` for decoration or the alt form `content: "\2192" / ""`.
  **Why** Screen readers read the generated text; empty strings are skipped.
  **Applies to** all. **Check** axe plus static scan of `content:\s*"[^"]+"` without a `/ ""` suffix on decorative pseudo-elements. **Source** https://web.dev/learn/css/pseudo-elements (alt syntax from https://developer.chrome.com/blog/carousels-with-css)

### 2.4 Custom properties and functions

- **RULE [WCSS-26]** Register tokens that must animate or be type-checked with `@property` (`syntax`, `inherits`, `initial-value`); leave design tokens that are plain strings unregistered.
  **Why** An unregistered property is an opaque token stream and cannot interpolate; a registered one with a typed syntax falls back to `initial-value` when given a wrong type.
  **Applies to** all. **Check** static: each custom property referenced in a `transition`/`@keyframes` has an `@property` block. **Source** https://web.dev/learn/css/custom-properties

- **RULE [WCSS-27]** Give `var()` a fallback for any token that may be unset in a component (`var(--x, <fallback>)`), and never feed a token of the wrong type into a property.
  **Why** An invalid substitution yields `initial`/`inherit`, not the previous declaration (transparent background in the course example).
  **Applies to** all. **Check** Playwright: for each design token used as `background-color`/`color`, computed colour is not `rgba(0, 0, 0, 0)` unless intended (`H6`). **Source** https://web.dev/learn/css/custom-properties

- **RULE [WCSS-28]** Set custom properties from JavaScript with `el.style.setProperty('--x', v)` and read them with `getComputedStyle(el).getPropertyValue('--x')`.
  **Why** The course snippet writes `getComputedStyle(element).setPropertyValue(...)`, which does not exist and throws; computed style objects are read-only. [source bug, verify before copying any web.dev JS]
  **Applies to** all. **Check** static grep: `getComputedStyle\([^)]*\)\.setProperty` count 0. **Source** https://web.dev/learn/css/custom-properties

- **RULE [WCSS-29]** Remember `var()` cannot be used in media or container query conditions; use literal lengths or `em`/`rem` there.
  **Why** Queries are evaluated before custom properties resolve.
  **Applies to** all. **Check** static: `@media[^{]*var\(` count 0. **Source** https://web.dev/learn/css/custom-properties

- **RULE [WCSS-30]** Build fluid sizes with `clamp(min, rem + vw, max)`; the rem part is what makes the size respond to the user's font setting. Provide a static `font-size` line before it for pre-`clamp()` browsers (the cascade drops unknown values).
  **Why** A pure `vw` size ignores user preference. [verified-C156: `clamp(1.125rem, 1rem + 1.2vw, 2.5rem)` computed 19.84 px at 320, 31.36 at 1280, 40 at 2560; doubling the root font size gave 47.36 px, a ratio of only 1.51, and an emulated 200% zoom (640 px viewport, DPR 2) also gave 1.51 in device pixels.] Any non-zero `vw` coefficient makes the 200%-zoom growth less than 2x, so the existing `A13` assertion "ratio >= 1.9" cannot be met by a fluid size; see section 5.
  **Applies to** all. **Check** Playwright at 320/1280/2560 matches expected values; text still grows monotonically with root font size (ratio >= 1.4 for `vw` coefficient <= 1.5) [engine note threshold]. **Source** https://web.dev/learn/css/functions

- **RULE [WCSS-31]** Check every `calc()`/`min()`/`max()`/`clamp()` for operator spacing and closing parentheses: `calc(100vw-2em)` is invalid, `-` and `+` need spaces.
  **Why** The course itself contains `sizes="calc(100vw-2em)"`, `calc(10px * pow(4, 2)` and `calc(50vh + 25vh * sign(var(--value))` with a missing parenthesis; invalid math silently drops the declaration. [source typos]
  **Applies to** all. **Check** `CSS.supports('width','calc(100vw - 2em)')` true and static regex `calc\([^)]*[0-9a-z%]-[0-9]` flags missing spaces. **Source** https://web.dev/learn/css/functions and https://web.dev/learn/images/descriptive

### 2.5 Colour, gradients, filters, shadows

- **RULE [WCSS-32]** Store brand colours as `oklch()`; derive hover, pressed and border variants with relative colour syntax (`oklch(from var(--brand) calc(l * 0.9) c h)`) or `color-mix(in oklab, ...)`; re-check contrast on every derived pair.
  **Why** OKLCH lightness is perceptual, so a 10% change reads the same on every hue; the course warns that dynamic colours can break contrast.
  **Applies to** all. **Check** Playwright contrast (`A2`) for default, hover, disabled-exempt, focus states; computed colours not transparent. **Source** https://web.dev/learn/css/color

- **RULE [WCSS-33]** Remember hex alpha values: 50% = `80`, 75% = `BF`, 0% = `00`; prefer `rgb(0 0 0 / 50%)` or `oklch(... / 50%)` when you want readable code.
  **Why** Hex alpha is base-16 of 255, so "50%" is not `50`.
  **Applies to** all. **Check** static: 8-digit hex only inside tokens, with a comment of the percentage. **Source** https://web.dev/learn/css/color

- **RULE [WCSS-34]** Interpolate gradients in a perceptual space: `linear-gradient(in oklch, A, B)`; add `longer hue`/`increasing hue` only deliberately.
  **Why** sRGB interpolation of saturated pairs passes through muddy greys; the default colour space for gradients and `color-mix()` is `oklab`.
  **Applies to** landing page. **Check** static: gradients between two saturated stops include `in oklab|in oklch`; visual. **Source** https://web.dev/learn/css/gradients

- **RULE [WCSS-35]** When wide-gamut colours (`display-p3`, high-chroma `oklch`) matter, branch with `@media (color-gamut: p3)` and keep an sRGB-safe value as the default.
  **Why** Out-of-gamut colours are gamut-mapped to something close, not clipped predictably.
  **Applies to** landing page. **Check** screenshot under default gamut vs `p3` emulation; contrast from the sRGB render. **Source** https://web.dev/learn/css/color

- **RULE [WCSS-36]** Frosted glass: use `backdrop-filter: blur()` with a semi-opaque background colour so text stays legible when the filter is unsupported or disabled. Any invalid function inside `filter` invalidates the whole list.
  **Why** `backdrop-filter` is Chrome 76 / Firefox 103 / Safari 18 (badge) and text over an image needs its own contrast floor.
  **Applies to** landing page. **Check** Playwright: set `backdrop-filter: none !important` on the element and re-run contrast `A2`; must pass. **Source** https://web.dev/learn/css/filters

- **RULE [WCSS-37]** Shadow selection: `box-shadow` for rectangles (clipped by `overflow: hidden` ancestors, takes `border-radius`), `text-shadow` for glyphs, `filter: drop-shadow()` for cut-out images and transparent PNG/SVG. Use several comma-separated layers rather than one heavy blur.
  **Why** A box shadow follows the box not the pixels; `drop-shadow` follows the alpha mask but has no spread or inset.
  **Applies to** all. **Check** visual; Playwright: shadow parent has no `overflow:hidden` unless the shadow is meant to be clipped. **Source** https://web.dev/learn/css/shadows

- **RULE [WCSS-38]** Do not rely on shadows alone for borders or focus rings.
  **Why** Windows High Contrast / forced-colors mode removes shadows and most backgrounds, leaving an invisible control.
  **Applies to** all. **Check** emulate `forcedColors: 'active'`, assert controls keep a non-zero border or outline (`A18`). **Source** https://web.dev/learn/css/focus

### 2.6 Focus, overflow, scroll

- **RULE [WCSS-39]** Show focus with an `outline` (colour with contrast, `outline-offset` for breathing room); never `outline: none` without a replacement; use `:focus-visible` to avoid mouse-click rings. The course teaches `:focus` first and `:focus-visible` in the pseudo-classes lesson.
  **Why** `box-shadow` replacements vanish in forced-colors; positive `tabindex` breaks the source-order tab sequence.
  **Applies to** all. **Check** `A3`; static: `tabindex="[1-9]"` count 0. **Source** https://web.dev/learn/css/focus

- **RULE [WCSS-40]** Make programmatic skip-link targets focusable with `tabindex="-1"` (for `<main id>`) and style the target (`:target` or `:focus`) so the jump is visible; add `scroll-margin-top` so it clears sticky headers.
  **Why** Without a focus style the landing spot is invisible to keyboard users; `:target` matches the fragment.
  **Applies to** landing page. **Check** Playwright: activate skip link, `document.activeElement === main`, `getBoundingClientRect().top >= header height` (`A5`). **Source** https://web.dev/learn/css/focus

- **RULE [WCSS-41]** Any `overflow: auto|scroll` region must be keyboard reachable: `tabindex="0"`, `role="region"` and `aria-labelledby`, plus a focus outline; an attribute-gated pattern (`[role][aria-labelledby][tabindex]{overflow:auto}`) enforces it.
  **Why** Keyboard users cannot otherwise scroll the region.
  **Applies to** all. **Check** axe `scrollable-region-focusable`; Playwright: every element with `scrollHeight>clientHeight` and overflow auto/scroll matches `[tabindex]`. **Source** https://web.dev/learn/css/overflow

- **RULE [WCSS-42]** Prefer `overflow: clip` over `hidden` when you only need clipping; remember `hidden`/`auto` create a block formatting context and a scroll container, and `visible` is the default because "never hide content".
  **Why** `clip` also blocks programmatic scrolling and does not create a scroll container (so `position: sticky` descendants keep working).
  **Applies to** all. **Check** static: `overflow:\s*hidden` on wrappers that contain `position: sticky` descendants is flagged. **Source** https://web.dev/learn/css/overflow

- **RULE [WCSS-43]** Apply `scroll-behavior: smooth` only inside `@media (prefers-reduced-motion: no-preference)`; add `scroll-padding-top` for fixed headers and `scroll-margin` on targets.
  **Why** Smooth scroll is motion. Note the course's snippet sets `scroll-behavior: auto` inside the `no-preference` block, which is the default and has no effect; write `smooth`. [source bug]
  **Applies to** all. **Check** Playwright with `reducedMotion:'reduce'`: `getComputedStyle(documentElement).scrollBehavior === 'auto'`. **Source** https://web.dev/learn/css/overflow

- **RULE [WCSS-44]** Use `overscroll-behavior: contain` on modal panels and nested scrollers to stop scroll chaining; treat `scroll-snap-type: ... mandatory` as risky and test that every item is reachable on small screens.
  **Why** `mandatory` can leave content between snap positions unreachable.
  **Applies to** mobile, landing page. **Check** Playwright: scroll a snap container to its end, assert the last snap child's right edge is inside the scrollport. **Source** https://web.dev/learn/css/overflow

- **RULE [WCSS-45]** Truncate single lines with `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`; do not use it on text a user must read in full.
  **Why** It needs all three declarations and works on one line only.
  **Applies to** all. **Check** for each `text-overflow: ellipsis` element, either `scrollWidth<=clientWidth` or a full-text affordance (title or expandable) exists [engine note]. **Source** https://web.dev/learn/css/overflow

- **RULE [WCSS-46]** Use `z-index` from a named scale, and contain a component's stacking with `isolation: isolate`; remember `opacity < 1`, `transform`, `filter`, `will-change` create stacking contexts, and `z-index` needs a positioned element unless it is a flex/grid item.
  **Why** A child can never escape its stacking context, so `z-index: 9999` fights are unwinnable.
  **Applies to** all. **Check** static: z-index values in authored CSS belong to the token scale; Playwright: topmost element at modal centre is the modal (`document.elementFromPoint`). **Source** https://web.dev/learn/css/z-index

### 2.7 Motion

- **RULE [WCSS-47]** Transition named properties; prefer `transform`, `opacity` (and individual `translate`, `scale`, `rotate`) over width/height/top/left. Use a different duration for enter and exit by setting `transition` on the hover/focus state as well as the base.
  **Why** Layout-affecting properties recompute positions for affected elements every frame; the course states transform is GPU-accelerated and cheaper in battery.
  **Applies to** all. **Check** `S3`: no `transition: all`; computed `transition-property` lists. **Source** https://web.dev/learn/css/transitions

- **RULE [WCSS-48]** Wrap movement, scaling and large opacity changes in `@media (prefers-reduced-motion: no-preference)`; colour changes may stay (the course: "usually don't need" the guard); pause autoplaying keyframe loops under `reduce`.
  **Why** Preference means less, especially unexpected, motion.
  **Applies to** all. **Check** `A11` with `reducedMotion:'reduce'`: `document.getAnimations()` containing no running infinite animation. **Source** https://web.dev/learn/css/transitions and https://web.dev/learn/css/animations

- **RULE [WCSS-49]** Name keyframes in lowercase, remember `animation-duration` defaults to 0s, use `animation-fill-mode: both` for reveal-in animations, and set `animation-timeline` after the `animation` shorthand when you use scroll timelines.
  **Why** Keyframe identifiers are case-sensitive; with `none` fill mode the element snaps back at the end.
  **Applies to** all. **Check** static review. **Source** https://web.dev/learn/css/animations

- **RULE [WCSS-50]** Clip and mask carefully: `clip-path` and `mask` change only what is painted (the box, float wrapping and hit-testing stay rectangular unless you add `shape-outside`); animate `clip-path` only between the same function with the same number of points; `path()` is px-only and non-responsive, `shape()` is responsive but not in Firefox (per the page).
  **Why** Mismatched functions snap instead of interpolating.
  **Applies to** landing page. **Check** static: `@keyframes` using `clip-path` use one function type and equal point counts. **Source** https://web.dev/learn/css/paths-shapes-clipping-masking

### 2.8 Logical properties, typography, pointers

- **RULE [WCSS-51]** Author in logical properties: `margin-inline-start|end`, `padding-block`, `inset-inline`, `border-inline-start`, `text-align: start|end`, `border-start-start-radius`, `max-inline-size`; use `vi`/`vb` instead of `vw`/`vh` when writing-mode may change.
  **Why** An icon spaced with `margin-right` collides with the label in RTL; logical values follow writing mode and direction.
  **Applies to** all. **Check** static count of physical `left|right` properties is 0 except allow-listed; render with `dir="rtl"` and assert `L1` (`S7`). **Source** https://web.dev/learn/css/logical-properties

- **RULE [WCSS-52]** Always end `font-family` with a generic family that matches the design (`sans-serif`, `serif`, `monospace`, `system-ui`); remember the browser falls back per character, not per string.
  **Why** A missing generic falls back to the browser default (often a serif).
  **Applies to** all. **Check** Playwright: computed `font-family` last token is a generic keyword; `document.fonts.check()` for brand font after load (`F6`). **Source** https://web.dev/learn/css/typography

- **RULE [WCSS-53]** Declare `@font-face` once with `font-display`, `src: local() ... url(...woff2)` (local first), and `unicode-range` for subsets; numeric `font-weight` values other than 100-step multiples need a variable font.
  **Why** `@font-face` only declares the file; the browser downloads it when styling uses the family. Browsers prioritise `src` entries in order.
  **Applies to** all. **Check** `F1`: every `@font-face` has `font-display`; woff2 only. **Source** https://web.dev/learn/css/typography

- **RULE [WCSS-54]** Prefer `overflow-wrap: anywhere` over `break-word` when the container is a flex/grid item or shrink-to-fit; avoid `word-break: break-all` on prose.
  **Why** `anywhere` also lowers the min-content size, so long tokens do not force the track wider; `break-word` does not.
  **Applies to** cards, buttons, table cells. **Check** `S7` long-token stress: `L1` passes. **Source** https://web.dev/learn/css/typography

- **RULE [WCSS-55]** Make form controls inherit typography (`font: inherit`) and give them a readable size; the course's own button reset uses `font: inherit`.
  **Why** User-agent form controls ignore the page font and are small by default.
  **Applies to** forms. **Check** Playwright: computed `font-family` of `input, select, textarea, button` equals body's; `font-size >= 16` (`A10`). **Source** https://web.dev/learn/css/inheritance (and `webdev-forms-and-images.md` WFRM rules)

- **RULE [WCSS-56]** Branch pointer-dependent UI on `@media (pointer: coarse)` / `(any-pointer: fine)`, not width; use `touch-action: manipulation` to drop double-tap-zoom delay and never set `touch-action: none` on the document.
  **Why** Blocking pinch zoom is an accessibility failure; `pointer-events: none` also kills hover and click, it is not a disabled state.
  **Applies to** mobile, all. **Check** static: `touch-action:\s*none` not on `html, body, main`; Playwright `hasTouch` run (`S4`). **Source** https://web.dev/learn/css/cursors-and-pointers

- **RULE [WCSS-57]** Do not make non-lists look like lists with `display: list-item` for semantic structure; keep real `<ul>/<ol>/<li>` markup and style `::marker` (colour, font, content) instead of `list-style-image` when you need control.
  **Why** Changing `display` does not change what assistive tech announces.
  **Applies to** all. **Check** axe `list`, `listitem`; static `display:\s*list-item` only on elements that are already `li`. **Source** https://web.dev/learn/css/lists

### 2.9 Container queries, popover, anchoring, view transitions (Learn CSS versions)

- **RULE [WCSS-58]** Components that appear in several widths get `container-type: inline-size` (named, via `container: name / inline-size`) and `@container name (inline-size > 30em)` rules; use `cqi` units inside; do not put the query on the container itself, only on descendants.
  **Why** Inline-size containment makes the container's width independent of its children; `size` containment collapses the box unless sized explicitly. [verified-C156: the same card markup gave one column in a 320 px slot and two in a 640 px slot at a 1280 px viewport.]
  **Applies to** landing page. **Check** Playwright: render the component in 240/320/480/720 px wrappers and assert expected grid track counts (`cq-card`); no element with `container-type:size` has a zero block size. **Source** https://web.dev/learn/css/container-queries

- **RULE [WCSS-59]** Use a popover (`popover` attribute, `popovertarget`) for non-modal layers; use `popover="auto"` (default) for menus (light dismiss, one open at a time, Esc), `manual` for toasts, and avoid `hint` until it ships in all engines. Do not blur or opaque-fill the `::backdrop` of a popover: the rest of the page is not inert.
  **Why** Popovers sit in the top layer; they are not modal. Applying `display: grid` on `[popover]` breaks hiding, so scope it to `:popover-open`.
  **Applies to** all. **Check** Playwright: open, assert `:popover-open` matches, Esc closes, focus returns to the invoker (`A15`); static: `[popover]{display:` without `:popover-open`. **Source** https://web.dev/learn/css/popover-and-dialog

- **RULE [WCSS-60]** Animate popovers with three states: the open state in `:popover-open`, the entry state in `@starting-style` (placed after the open rules), and the closed state on the bare element; add `transition-behavior: allow-discrete`, `display` and, when using implicit anchoring, `overlay` to the transition list.
  **Why** `display: none` flips immediately unless discrete transitions are enabled; `overlay` delays removal from the top layer (and the implicit anchor) until the exit finishes. [verified-C156: opacity read 0 right after `showPopover()` and 1 after 600 ms; the element stayed `display:block` 120 ms after `hidePopover()` and was `none` after 600 ms.]
  **Applies to** all. **Check** Playwright sample opacity at 0 ms and 600 ms; assert exit keeps display until duration end (`starting-style-popover`). **Source** https://web.dev/learn/css/popover-and-dialog

- **RULE [WCSS-61]** Tether tooltips and menus with anchor positioning: `anchor-name` on the trigger, `position-anchor` plus `position-area` on the positioned element, `margin: unset` on popovers (their default `margin: auto` centres them), `position-try-fallbacks: flip-block` (or a `@position-try` block) for viewport overflow, and `position-visibility: anchors-visible` when the anchor sits in a scroller.
  **Why** The anchor must be laid out before the positioned element; with several same-named anchors the last one wins unless `anchor-scope` limits matches; `anchor()` works only on inset properties and an `anchor()` with no anchor invalidates the declaration unless you give a fallback length. [verified-C156: popover sat exactly under the button (top 121 = button bottom 121); with the button at y=750 in an 800 px viewport it flipped above (popover bottom 750).]
  **Applies to** all. **Check** Playwright: popup rect inside viewport at 320 px and when the trigger is at the bottom edge (`A15` + `L1`); wrap in `@supports (anchor-name: --a)`. **Source** https://web.dev/learn/css/anchor-positioning

- **RULE [WCSS-62]** Wrap DOM-swapping navigations in `document.startViewTransition(cb)` only after feature-detecting it; give each shared element a unique `view-transition-name`; name only the elements that should move; leave the rest to cross-fade; use `:active-view-transition-type(...)` and `types: [...]` for direction-aware animation.
  **Why** Unsupported browsers must still swap the DOM; duplicate names skip the transition; `width: fit-content` on transitioning text stops width morphing. [verified-C156: with `no-preference` five view-transition animations were running during the transition; with the reduced-motion override none ran.]
  **Applies to** landing page, SaaS app UI. **Check** `A11`: under `reducedMotion:'reduce'` no `::view-transition*` animation in `document.getAnimations()`; no two rendered elements share a `view-transition-name`. **Source** https://web.dev/learn/css/view-transitions-spas

---

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Hex alpha | 0% = 00, 50% = 80, 75% = BF | color |
| Named CSS colours | 148 | color |
| Default font size | 16 px (root) | sizing |
| `ch` | width of "0" in the element's font | sizing |
| Measure example | `max-width: 60ch` | sizing |
| Spacing token example | `--gutter: 20px`, `--spacing: 1em` | spacing |
| Backdrop filter support badge | Chrome 76, Edge 79, Firefox 103, Safari 18 | filters |
| `mix-blend-mode` | Chrome 41, Edge 79, Firefox 32, Safari 8 | blend modes |
| `text-wrap` (balance) | Chrome 114, Edge 114, Firefox 121 (badge omitted Safari; BCD says 17.5); balance only on blocks of six lines or fewer | typography |
| `overflow-wrap` | Chrome 23, Edge 18, Firefox 49, Safari 7 | typography |
| `minmax()`/`repeat()` | Chrome 57, Edge 16, Firefox 52 / 76 for repeat badge | grid |
| `anchor positioning` | Chrome 125, Edge 125, Firefox 147, Safari 26 | chrome doc badge, 2026-10-08 |
| View transitions (same doc) | Chrome 111, Edge 111, Firefox 144, Safari 18 | chrome overview |
| `scroll-behavior` | Chrome 61, Edge 79, Firefox 36 | overflow |
| `overscroll-behavior` badge | shows "Chrome 144, Edge 18, Firefox 150, Safari 16" on the page, which conflicts with MDN's long-standing Chrome 63 [verify] | overflow |
| `overflow-inline/-block` | Chrome 135, Edge 135, Firefox 69, Safari 26 | overflow |
| Container queries | size: Chrome 105, Firefox 110, Safari 16 | chrome style-queries page |
| Individual `rotate`/`scale`/`translate` | animate separately from `transform` | functions, transitions |
| Specificity weights | id (1,0,0), class/attr/pseudo-class (0,1,0), type/pseudo-element (0,0,1), `:where` 0 | specificity |
| Cascade order | position < specificity < origin/importance; transitions > `!important` | the-cascade |
| Verified measurements (Chromium 156, 2026-10-08) | clamp(1.125rem,1rem+1.2vw,2.5rem): 19.84 / 31.36 / 40 px at 320 / 1280 / 2560; growth at 200% zoom 1.51x | WCSS-30 |

---

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| `grid-template-columns: repeat(3, minmax(0, 1fr))` | `repeat(3, 1fr)` with arbitrary content | 1fr has an auto minimum and lets long tokens widen a column |
| `.card{display:grid;grid-row:span 3;grid-template-rows:subgrid}` | fixed `min-height` per card | CTAs align for any copy length (verified) |
| `margin-inline-end: .5rem` on icons | `margin-right: .5rem` | breaks in RTL |
| `font-size: clamp(2rem, 1rem + 3vw, 3rem)` | `font-size: 4vw` | vw-only ignores user font preference |
| `@media (prefers-reduced-motion: no-preference){ html{scroll-behavior:smooth} }` | `scroll-behavior: auto` in that block (source bug) | `auto` is the default |
| `el.style.setProperty('--x','1')` | `getComputedStyle(el).setPropertyValue(...)` (source bug) | computed style is read-only |
| `sizes="calc(100vw - 2em)"` | `sizes="calc(100vw-2em)"` (source typo) | invalid math drops the attribute |
| `.f:has(input:user-invalid) .err{display:block}` | `:invalid` hooks that show errors on load | `:user-invalid` waits for interaction (verified: shown after typing and Tab) |

### Copy-ready snippets

Status tags: **[verified-C156]** executed in Chromium 156 by the harness; **[untested]** not run.

**Container-query card [verified-C156]**
```css
.slot { container: card / inline-size; }
.card { display: grid; gap: 1rem; grid-template-columns: 1fr; padding: 1rem; }
@container card (inline-size >= 30rem) {
  .card { grid-template-columns: 8rem minmax(0, 1fr); align-items: start; }
}
```

**Subgrid card row [verified-C156]**
```css
.row  { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); gap: 1rem; }
.card { display: grid; grid-row: span 3; grid-template-rows: subgrid; gap: .5rem; }
/* each card must have exactly 3 children: heading, body, CTA */
```
Note: the verified fixture used `repeat(3, 1fr)`; the `auto-fit` variant is **[untested]**, and with `auto-fit` the card count per row changes, which is fine for subgrid because rows are placed per grid line set.

**Fluid type with a rem floor and ceiling [verified-C156 values]**
```css
:root { --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); }
h1 { font-size: 2.5rem;                                 /* fallback */
     font-size: clamp(2rem, 1.2rem + 3vw, 3.5rem); line-height: 1.1; text-wrap: balance; }
```
Values at 320/1280/2560 for the verified formula `clamp(1.125rem, 1rem + 1.2vw, 2.5rem)` were 19.84/31.36/40 px.

**Anchored popover with flip fallback [verified-C156]**
```html
<button popovertarget="m" style="anchor-name:--menu">Menu</button>
<div id="m" popover style="position-anchor:--menu">...</div>
```
```css
@supports (anchor-name: --a) {
  [popover].anchored { position: fixed; margin: 0; inset: auto;
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-block; }
}
```
(Unsupported browsers fall back to the UA's centred popover; add a JS positioner only if analytics demand it.)

**View transition with guard [verified-C156]**
```js
function go(update) {
  if (!document.startViewTransition) return update();
  document.startViewTransition(update);
}
```
```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```

**Scroll-driven reveal with safe default [verified-C156]**
```css
.reveal { opacity: 1; }                                  /* visible by default */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 80%; }
    @keyframes reveal { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
  }
}
```
Harness: off-screen opacity 0 and centred opacity 1 with `no-preference`; both 1 under `reduce`; 1 when the block is absent.

---

## 5. Exceptions & judgement calls

Conflicts with `../web/implementation-craft.md` and between sources (flagged for the engine owner):

1. **Zoom assertion `A13` ("computed h1/p font-size ratio >= 1.9 at 200% zoom") cannot pass for fluid type.** Measured: 1.51 for a typical `rem + 1.2vw` clamp, by both text-only zoom and 640 px/DPR 2 emulation. A vw term never doubles, so the check should compare against the *WCAG intent*: text still resizes (ratio > 1) and nothing clips, with a stricter 2x test only for non-fluid body text. [engine note; suggested replacement threshold 1.4]
2. **Focus selector.** web.dev teaches `a:focus { outline: ... }` in the focus lesson and `button:focus{outline:none}` plus `:focus-visible` in the pseudo-class lesson; implementation-craft requires `:focus-visible` only. No real conflict, but the course's `:focus` examples should not be copied.
3. **Reduced motion scope.** implementation-craft: decorative motion lives inside `no-preference`. web.dev transitions: colour transitions "usually" need no guard; web.dev animation example uses a bare `@media (prefers-reduced-motion)` (matches `reduce`) with `animation-play-state: paused`. Both acceptable; keep our rule for movement and opacity.
4. **`transition: all`.** web.dev lists `transition-property: all` as valid; implementation-craft bans it. Keep the ban (engine rule).
5. **Spacing with margins.** web.dev spacing shows `margin`, `<br>`, `&nbsp;` options with caveats; engine prefers `gap`. Compatible.
6. **Source code errors to avoid copying:** `setPropertyValue` on a computed style object (WCSS-28), `calc(100vw-2em)` in the images course (WCSS-31), `calc()` calls with a missing closing parenthesis in the functions article (`pow`, `sign`), `scroll-behavior: auto` inside `no-preference` (WCSS-43), and `//` line comments inside a CSS block in the forms design-basics article (CSS has no `//` comments; they swallow the next selector).
7. **Popover `hint`.** The course documents `popover="hint"`; implementation-craft marks it avoid (Chrome 151, Firefox 153 only). Keep avoid.
8. **Fluid `vh` vs `dvh`.** The sizing article presents `lv/sv/dv` units without recommending one; the engine rule (hero `svh`, overlay `dvh`) stays.

Judgement calls: nesting depth is advice ("two to three"), not syntax; `:is()` forgiveness means silent no-ops, so test selectors; subgrid cards need a fixed child count (`span N`).

## 6. Figures worth keeping

No page images were saved. Candidates to screenshot into `examples/`: the grid-lines/tracks/areas diagram (grid), the box-model "picture frame" analogy (box-model), the view-transition pseudo-element tree (view-transitions), DevTools grid overlay with line numbers (grid).

## 7. Open questions

- Firefox and WebKit were not runnable here (only Chromium 156 installed); every [verified-C156] result is Chromium only. Re-run `verify.mjs` after `npx playwright install firefox webkit` to check subgrid, container queries, popover/anchor and `field-sizing` parity.
- The `overscroll-behavior` badge text looks wrong; confirm against MDN BCD.
- The course's `popover` article says hint popovers exist but does not say which engines ship them; use BCD (Chrome 151, Firefox 153) from implementation-craft.
- `text-wrap: balance` badge omits Safari although BCD gives 17.5; the page's badge may be stale.
- Pages with no extractable rule content: `learn/css/welcome`, `learn/css/conclusion` (intro and links only); `learn/css/quiz`.
