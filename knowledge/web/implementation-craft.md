---
source: web:developer.mozilla.org (MDN browser-compat-data 8.1.5, timestamp 2026-10-08) + web.dev + w3.org/WAI (WCAG 2.2 Understanding docs) + tailwindcss.com/docs + webaim.org/projects/million + playwright.dev + adrianroselli.com + almanac.httparchive.org/2025
chapter: Front-end implementation craft (marketing pages)
pages: n/a (web research, date-stamped 2026-10-08)
topic_tags: [implementation, css, tailwind-v4, responsive, images, fonts, core-web-vitals, accessibility, wcag-2.2, dark-mode, i18n, states, playwright, axe, lighthouse]
status: studied
---

# Front-end implementation craft: making a design land correctly in code

Companion file with the machine-checkable table and Playwright snippets: `knowledge/web/measurable-assertions.md` (assertion IDs like `L1`, `A3`, `P2` below refer to it).

Evidence grading used in this note:
- **[verified]** read from a primary source in this session (MDN BCD JSON dated 2026-10-08, W3C Understanding docs, web.dev, Tailwind docs, WebAIM, Playwright docs).
- **[secondary]** from a search snippet or blog quoting a primary; treat as a lead.
- **[engine note]** my own knowledge or a heuristic budget; not sourced here. Per SCHEMA, kept clearly labelled.

---

## 1. Core ideas

1. **Most "design did not land" bugs are overflow, wrapping, state and viewport bugs, not colour bugs.** WebAIM Million 2026 (Feb 2026 scan): 95.9% of home pages have detectable WCAG failures, 56.1 errors per page; the top six are low-contrast text 83.9%, missing alt 53.1%, missing form labels 51%, empty links 46.3%, empty buttons 30.6%, missing document language 13.5% [verified]. All six are mechanically detectable, so a render-and-check tool removes the bulk of real-world failure.
2. **Layout is content-driven, not device-driven.** Pick breakpoints where the content breaks, use fluid `clamp()`/`min()` for type and space, and use container queries for components. The only fixed device facts you must honour are the extremes (320 CSS px reflow floor from WCAG 1.4.10, and a max content width so 2560 px screens do not stretch lines) [verified for 320; engine note for the rest].
3. **Pointer type matters more than width.** A 1024 px iPad and a 1024 px laptop need different target sizes and hover behaviour. Use `(pointer: coarse)` / `(hover: hover)`, never infer touch from width. Tailwind v4 already gates `hover:` behind `@media (hover: hover)` [verified].
4. **Performance is mostly three decisions**: the LCP element is discoverable and prioritised, every replaced element reserves its space, and fonts do not reflow text. Core Web Vitals "good" = LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile, mobile and desktop separately [verified]. LCP budget split: TTFB ~40%, load delay <10%, load duration ~40%, render delay <10% [verified].
5. **Accessibility at AA is a short, finite list of mechanisms** (name/role/value, contrast, focus visibility, keyboard operability, target size, reflow, motion control, form errors). Automated axe finds only a subset; the rest needs scripted keyboard/zoom/reduced-motion probes (see assertions) plus a manual screen-reader pass.
6. **Native first.** `<dialog>`, `popover`, `<details name>`, `command`/`commandfor`, `:has()`, `@starting-style`, anchor positioning now replace most JS widgets, with less ARIA. The more ARIA, the more errors: WebAIM 2026 pages with ARIA averaged 59.1 errors vs 42 without (correlation, not proof) [verified].
7. **Every interactive thing has six-plus states** (default, hover, focus-visible, active, disabled, loading) and data surfaces have three more (empty, error, partial/long). A design is "implemented" only when each is visible and distinct.
8. **Progressive enhancement is the safety valve for 2024-2026 CSS.** Features that are Baseline "newly available" can be used with `@supports`/cascade fallbacks; features that are single-engine (scroll-driven animations in Firefox, cross-document view transitions in Firefox, `interpolate-size`, `if()`) must be pure enhancement where nothing breaks without them.
9. **Reduced motion is opt-in for decoration.** Put decorative motion inside `@media (prefers-reduced-motion: no-preference)`; keep only informational feedback under `reduce` [verified, web.dev].
10. **Test with the browser's real rendering, not by reading CSS.** `scrollWidth`, `getBoundingClientRect`, `getAnimations()`, `document.fonts`, `PerformanceObserver`, axe, and screenshots with forced media emulation catch what code review misses.

---

## 2. Rules

Format per SCHEMA. "Applies to" is `landing page` unless noted.

### 2.1 Modern CSS: use / fallback / avoid

- **RULE** Treat features with all four engines shipped >= 30 months ago as free to use; anything newer needs a fallback or `@supports`. Our floor is the Tailwind v4 floor: Safari 16.4, Chrome 111, Firefox 128 [verified, Tailwind upgrade guide]. See support table in section 3.
  **Why** Unsupported declarations are dropped silently, so layouts degrade unpredictably.
  **Applies to** all. **Check** static scan of authored CSS for properties in the "limited" tier without `@supports` or an earlier fallback declaration (assertion `H6`). **Source** MDN BCD 2026-10-08.

- **RULE** Use `@layer` to order reset < tokens < base < components < utilities; never fight specificity with `!important`.
  **Why** Layers make cascade order explicit; Tailwind v4 is built on native cascade layers, and unlayered CSS always beats layered CSS, so stray unlayered rules silently override utilities [verified Tailwind; layering semantics engine note].
  **Check** count of `!important` in authored CSS <= 3; no unlayered selectors targeting `.btn`-like components (static). **Source** Tailwind upgrade guide.

- **RULE** Use container queries (`container-type: inline-size` + `@container`) for components that live in multiple contexts (cards, pricing tiers, feature rows); use media queries for page shell, nav switch, and user-preference queries.
  **Why** A component in a 320 px sidebar on a 1440 px viewport is mis-sized by viewport breakpoints. Container queries match since Chrome 105 / Safari 16 / Firefox 110 [verified]. Container size queries only measure size; they do not replace `prefers-*` queries [secondary, Kevin Powell course].
  **Check** visual at component widths 240/320/480/720 (render the component alone in a resizable wrapper); no horizontal overflow `L1`. **Source** MDN BCD.

- **RULE** Use `:has()` for parent/state styling (form field with invalid input, card with image, nav with open details) instead of JS class toggles.
  **Why** Removes state-sync bugs; universal since Firefox 121 (Dec 2023) [verified].
  **Check** no duplicated state classes (static). Performance: avoid `:has()` with very broad subject on huge DOM (`P10`, DOM <= 1500 nodes).

- **RULE** Align internals across sibling cards with `subgrid` (`grid-template-rows: subgrid; grid-row: span N`) rather than fixed heights or JS equalising.
  **Why** Titles, body and CTAs line up across a row whatever the copy length. Support: Chrome/Edge 117, Safari 16, Firefox 71 [verified]. Remember shared tracks align grid lines, not painted edges: keep padding consistent [secondary].
  **Check** `getBoundingClientRect().top` of each card's CTA equal within 1 px per row at >= 3-column widths (`L12`).

- **RULE** Use CSS nesting only with the relaxed (2023+) syntax; avoid more than 3 levels.
  **Why** Nesting is Baseline (Chrome 120, Firefox 117, Safari 17.2) [verified]; deep nesting inflates specificity.
  **Check** static selector-depth scan.

- **RULE** Register animatable/typed tokens with `@property` (e.g. `--angle`, `--gradient-stop` for gradient transitions). `@property` is Chrome 85, Safari 16.4, Firefox 128 [verified]; Baseline "newly available" (~Jul 2024).
  **Why** Un-registered custom properties cannot be interpolated, so gradient hover transitions snap.
  **Check** transition on a gradient has `@property` registration or is skipped (static).

- **RULE** Prefer logical properties (`margin-inline`, `padding-block`, `inset-inline-start`, `text-align: start`, `border-inline-start`) over left/right everywhere.
  **Why** RTL and vertical writing modes then work with no extra CSS; universal since 2021 [verified].
  **Check** static count of `margin-left|right`, `padding-left|right`, `left:`/`right:`, `text-align:(left|right)` in authored CSS = 0 except intentional (`H6`); RTL render `S7`.

- **RULE** Use `min()`, `max()`, `clamp()` for fluid size, but build every fluid size as `clamp(minRem, calc(Xrem + Yvw), maxRem)` with rem in the preferred value, and ensure max <= ~2.5x min.
  **Why** Pure `vw` text cannot be zoomed and fails WCAG 1.4.4 (technique F94); capping max can also prevent reaching 200% [verified via W3C F94 and secondary summaries of Roselli/Kravets]. Keeping max/min ratio <= 2.5 is a rule of thumb commonly cited to keep zoom behaviour sane [engine note].
  **Check** `A13`: raise root font size to 200% (or Playwright `page.setViewportSize` at 640 w/ DPR 1 equivalent to 200% zoom of 1280) and assert computed `h1`/`p` font-size ratio >= 1.9 of baseline; no overflow.

- **RULE** Use `dvh` for full-screen overlays/menus, `svh` for heroes that must not jump when mobile browser chrome collapses, `lvh` rarely; never bare `100vh` for full-height mobile layouts.
  **Why** `100vh` equals the large viewport on mobile and is taller than what is visible with toolbars out; `dvh` changes while scrolling (can cause jank/CLS if a layout depends on it). Dynamic/small/large units: Chrome 108, Firefox 101, Safari 15.4 [verified support; semantics engine note].
  **Check** static: `100vh` appears only as a fallback line before a `dvh`/`svh` line (`L10`).

- **RULE** Give every media element an intrinsic ratio: `width`/`height` attributes plus `height:auto`, or CSS `aspect-ratio`.
  **Why** Reserves space before load; web.dev CLS guidance [verified].
  **Check** `I2`.

- **RULE** Balance headings: `text-wrap: balance` on h1-h3 and short centred text; `text-wrap: pretty` on body paragraphs only as enhancement.
  **Why** `balance` is Chrome 114 / Firefox 121 / Safari 17.5 [verified]; clamped to few lines (Chromium 6, Firefox 10) [secondary]. `pretty`: Chrome 117, Safari 26, **Firefox: not supported** as of 2026-10-08 [verified BCD]; so layout must not depend on it.
  **Check** computed `text-wrap` (or `text-wrap-style`) on h1-h3 = balance; visual: no one-word last lines (orphans) on headings > 2 lines (`S7`/visual).

- **RULE** Colour system: define tokens in OKLCH, derive hover/disabled/border tints with `color-mix(in oklab, ...)`, use relative colour syntax (`oklch(from var(--brand) calc(l - .08) c h)`) for scales, and `light-dark(a, b)` with `color-scheme: light dark` for theme-aware values.
  **Why** `oklch()`/`color-mix()` are Baseline-wide (Chrome 111/Firefox 113/Safari 16.2); relative colour is Chrome 119-125 (per function), Firefox 128, Safari 18 and `light-dark()` is Chrome 123 / Firefox 120 / Safari 17.5 [verified]. Both are Baseline "newly available" so provide a plain-hex fallback declaration first for the Safari 16.4-17.4 floor.
  **Check** every `color`/`background-color` token has a resolved computed value (no `invalid at computed-value time` => transparent/initial) (`H6`: compare computed colour of tokens against expected non-transparent); contrast `A2` in both themes.

- **RULE** Use `contrast-color()` only as enhancement. Chrome 147, Firefox 146, Safari 26 shipped it [verified BCD] but it is new; keep authored foreground tokens as the source of truth.
  **Why** It picks black/white only, not brand-aware, and does not guarantee APCA/WCAG ratios in all cases [engine note].

- **RULE** Anchor positioning (`anchor-name`, `position-anchor`, `position-area`, `position-try-fallbacks`) for tooltips/menus/popovers is acceptable: Chrome/Edge 125 (`position-area` 129), Safari 26, Firefox 147 (Jan 2026) = Baseline newly available [verified BCD and web.dev Jan 2026]. Keep a JS or absolute-position fallback only if the audience includes Safari < 26 / Firefox < 147 (iOS 18 and earlier), and set `@supports (position-area: top)` guards.
  **Why** Removes Floating-UI-style JS; but older iOS users are still present for months.
  **Check** `@supports` present; popup rect inside viewport after opening at 320 px (`A15` + `L1`).

- **RULE** Popover API (`popover`, `popovertarget`) is fine for non-modal disclosure, menus, toasts: Chrome 114, Safari 17, Firefox 125 [verified]; borderline "widely available" in Oct 2026. `popover="hint"` is Chrome 151 / Firefox 153 only, avoid. Declarative `commandfor`/`command` buttons: Chrome 135, Firefox 144, Safari 26.2 (newly available); `<dialog closedby="any">` Chrome 134 / Firefox 141 / Safari preview only: enhancement, still add an explicit close button and Escape.
  **Check** `A15`.

- **RULE** View Transitions: same-document (`document.startViewTransition`) = Chrome 111, Safari 18, Firefox 144 (Oct 2025): Baseline newly available [verified]. Cross-document (`@view-transition { navigation: auto }`) = Chrome 126, Safari 18.2, **Firefox: no** [verified BCD; Interop 2026 focus area]. Use cross-document only as enhancement and gate with `@media (prefers-reduced-motion: no-preference)`.
  **Why** Unsupported browsers simply navigate normally; reduced-motion users should not get page-wide animation.
  **Check** `A11` with `reducedMotion: 'reduce'`: no `::view-transition` animation running (`document.getAnimations({subtree:true})` with `pseudoElement` containing view-transition).

- **RULE** Scroll-driven animations (`animation-timeline: scroll()/view()`) are **enhancement only**: Chrome/Edge 115, Safari 26, Firefox behind a flag ("preview") at 2026-10-08 [verified BCD; secondary reports Firefox 152 still flagged]. Wrap in `@supports (animation-timeline: scroll())` AND `@media (prefers-reduced-motion: no-preference)`, and make the default (unsupported) state the fully visible final state, never `opacity:0` as the base style.
  **Why** If the base style hides content and the timeline is unsupported, content never appears.
  **Check** `A11`/`S9`: in Firefox (or with `@supports` forced false) all content visible; in Chromium with reduced motion, all `opacity` = 1 on `[data-reveal]` elements.

- **RULE** Use `@starting-style` + `transition-behavior: allow-discrete` for enter/exit of popovers, dialogs and `display:none` toggles: Chrome 117, Safari 17.5, Firefox 129 [verified]. Tailwind v4 exposes it as the `starting:` variant [verified].
  **Check** open/close in `A15` produces no flash of unstyled state (screenshot at 0 ms and 300 ms differ in expected property).

- **RULE** Do not use `interpolate-size`, `calc-size()`, `if()`, `@function`, `scroll-state()` queries, `::scroll-button`, `corner-shape`, `reading-flow`, `interestfor` as anything other than optional polish: Chromium-only at 2026-10-08 [verified BCD]. `field-sizing: content` is Chrome 123 / Safari 26.2 / Firefox 152 (newly available).
  **Why** Single-engine features create cross-browser visual drift.
  **Check** static scan for these tokens outside `@supports`.

- **RULE** `content-visibility: auto` + `contain-intrinsic-size` for long below-fold sections is acceptable (Safari 18 / Firefox 125 [verified]); always set `contain-intrinsic-size` to avoid scrollbar jumps (CLS).
  **Check** `P2` CLS <= 0.1 with full-page scroll.

### 2.2 Tailwind CSS v4 idioms

- **RULE** Entry point is `@import "tailwindcss";`. Configure tokens in CSS with `@theme { --color-*, --font-*, --text-*, --breakpoint-*, --spacing, --radius-*, --shadow-*, --ease-*, --animate-* }`. Only `@theme` variables generate utilities; `:root` variables do not [verified].
  **Check** every design token in `system/` appears as a `@theme` variable (static diff).

- **RULE** Use `@theme inline` whenever a theme variable references another variable (`--font-sans: var(--font-inter)`); otherwise it resolves at the definition scope and can silently fall back [verified]. Use `@theme static` for variables you read at runtime (JS `getComputedStyle`) because unused variables are not emitted [verified].
  **Check** computed `font-family` on `body` starts with the intended family (`F6`).

- **RULE** Custom utilities via `@utility`, custom variants via `@custom-variant`; `@layer utilities/components` no longer registers utilities [verified].

- **RULE** Dark mode: default `dark:` follows `prefers-color-scheme`. For a toggle override with `@custom-variant dark (&:where(.dark, .dark *));` (or `[data-theme=dark]`), and set the class in an inline `<head>` script before first paint to avoid a flash [verified, Tailwind docs].
  **Check** `S6`: first paint under `colorScheme: 'dark'` has dark background (screenshot of first frame / `getComputedStyle(body).backgroundColor` at `DOMContentLoaded`).

- **RULE** `hover:` is wrapped in `@media (hover: hover)`. Never hide essential info or controls behind hover; give touch an `active:` / tap state, and use `pointer-coarse:` to enlarge targets [verified].
  **Check** `S4` with `hasTouch: true`.

- **RULE** v3 to v4 renames are silent visual regressions: `shadow-sm`->`shadow-xs`, `shadow`->`shadow-sm`, `blur-sm`->`blur-xs`, `rounded-sm`->`rounded-xs`, `rounded`->`rounded-sm`, `outline-none`->`outline-hidden`, `ring`->`ring-3`, `bg-gradient-to-*`->`bg-linear-to-*`, `flex-shrink/grow`->`shrink/grow` [verified]. Copy-pasted v3 snippets (including older shadcn blocks) change shape.
  **Check** static grep for v3-only names in generated markup; screenshot diff vs reference.

- **RULE** Defaults changed: `border` is `currentColor` (was gray-200), `ring` is 1px `currentColor` (was 3px blue-500), placeholder is 50% current colour, `<button>` cursor is `default`, dialog margins are reset to 0, `hidden` attribute now beats `display` utilities [verified]. Explicitly set border colour, ring colour, `cursor-pointer` on actions, and `margin:auto` on `<dialog>`.
  **Check** `S2` cursor on clickable; `A3` focus indicator present; no unexpected black hairlines (visual).

- **RULE** `space-x/y-*` and `divide-*` now select `:not(:last-child)` and break with margin-carrying or inline children: prefer `flex`/`grid` with `gap-*` [verified].
  **Check** static: no `space-` utilities on elements with inline children.

- **RULE** CSS variable arbitrary values use parentheses: `bg-(--brand)`, not `bg-[--brand]`. Commas in `grid-cols-[...]` need underscores (`grid-cols-[max-content_auto]`). `!important` suffix is `flex!`. Stacked variants apply left-to-right [verified].

- **RULE** Class names must be complete strings; dynamically built names (`` `bg-${c}-500` ``) are never generated. Use full literals or a lookup object, or `@source inline("...")` to safelist [safelist replacement verified; dynamic-class pitfall engine note].
  **Check** computed style of the element matches intended (spot checks `S1`).

- **RULE** For CSS Modules, Vue/Svelte/Astro `<style>` blocks that use `@apply`, add `@reference "../app.css"` [verified]. Prefer plain CSS variables there.

- **RULE** v4 is OKLCH-first, uses `@property` and `color-mix`; its floor is Safari 16.4 / Chrome 111 / Firefox 128 [verified]. Wide-gamut (P3) colours fall back on sRGB screens: choose chroma that is in-gamut or accept clipping and verify the screenshot in sRGB.
  **Check** `A2` contrast uses the rendered sRGB result.

- **RULE** Use `motion-safe:` / `motion-reduce:`, `contrast-more:`, `forced-colors:`, `pointer-coarse:`, `focus-visible:`, `user-invalid:`, `has-*`, `group-has-*`, `in-*`, `not-*`, `starting:`, `inert:`, `rtl:` variants for the corresponding assertions [verified]. Replace `outline-none` with `outline-hidden` only when you add your own `focus-visible` ring; `outline-hidden` keeps a transparent outline visible in forced-colors mode [verified rename; forced-colors behaviour engine note].

### 2.3 Responsive strategy

- **RULE** Support 320 to 2560 CSS px with no horizontal scroll at any width; test the matrix 320, 360, 390, 768, 1024, 1280, 1440, 1920, 2560 plus an off-grid width (e.g. 600, 1100) to catch mid-range breakage.
  **Why** WCAG 1.4.10 Reflow: no two-dimensional scrolling at 320 CSS px width (== 1280 px at 400% zoom) [verified]; breakages cluster between breakpoints.
  **Check** `L1` at every width; `L2` clipped text.

- **RULE** Choose breakpoints where the layout breaks (content-driven), then name them; typically 3 for a marketing page: ~40rem (stack->2-col), ~64rem (full layout), ~90rem (max-width cap). Tailwind defaults are `sm 40rem, md 48rem, lg 64rem, xl 80rem, 2xl 96rem` [verified: `sm` default 40rem].
  **Check** sweep widths 320..2560 in 20 px steps and record the layout-change set; fail if > 8 distinct layout modes or if any width produces overflow (`L1`).

- **RULE** Cap reading width and content width: body paragraphs 45-75 characters per line (66 ideal), content container max ~1200-1440 px, hero backgrounds may bleed full width; at 1920/2560 add side gutters, do not scale type endlessly.
  **Why** Long lines break eye tracking; endless fluid scaling makes 2560 pages look like zoomed phones [engine note, widely accepted typographic range].
  **Check** `L5` chars per line; `L11` container width at 2560 <= 1600 px.

- **RULE** Side gutters never below 16 px at 320 px (prefer 20-24); respect `env(safe-area-inset-*)` on fixed bars with `viewport-fit=cover`.
  **Check** `L3` min distance of text/controls to viewport edge >= 16 px at <= 480 px.

- **RULE** Targets: >= 24x24 CSS px or the 24 px spacing circle test (WCAG 2.5.8 AA, hard); primary CTAs, nav items and form controls >= 44x44 on `pointer: coarse` (soft, WCAG 2.5.5 AAA / Apple HIG) [24 px verified; 44 px engine note].
  **Check** `L7`, `L7b`.

- **RULE** Viewport meta is `width=device-width, initial-scale=1`; never `user-scalable=no` or `maximum-scale < 5`.
  **Why** Blocks pinch zoom: WCAG 1.4.4 failure [engine note, well established].
  **Check** `L8`.

- **RULE** Inputs, selects and textareas use computed font-size >= 16 px on mobile.
  **Why** iOS Safari auto-zooms the viewport on focus when < 16 px [engine note; widely documented, not re-verified here].
  **Check** `A10`.

- **RULE** Nav pattern switches by content fit, not by device name: when links no longer fit on one line, collapse to a disclosure menu (button + `aria-expanded`). Mobile nav is a `<dialog>`/popover or a disclosure `<nav>`; full-height variant uses `dvh`.

### 2.4 Images, video, LCP, CLS

- **RULE** Identify the LCP element per breakpoint (hero image, hero video poster, or headline text). Give it `fetchpriority="high"`, never `loading="lazy"`, make it discoverable in the initial HTML (`<img src/srcset>` not injected by JS, CSS background images need `<link rel=preload as=image fetchpriority=high>`), and give at most 1-2 images `fetchpriority=high` [verified web.dev].
  **Check** `I3`, `P1`.

- **RULE** Lazy-load everything below the fold with `loading="lazy"` (and `decoding="async"`); never lazy-load above the fold. `fetchpriority` support: Chrome 101, Safari 17.2, Firefox 132; `loading=lazy`: since 2020-22 [verified].
  **Check** `I4`.

- **RULE** Serve AVIF with WebP and JPEG/PNG fallback via `<picture>` (or an image CDN with format negotiation). Photographs: AVIF/WebP; flat graphics/logos/icons: SVG; no PNG for photos. Budget: hero image <= 150 KB mobile / 250 KB desktop [engine note budget]; HTTP Archive 2025 median home page is 911 KB images on mobile, 1,058 KB desktop, 2.56 MB total on mobile [verified], so beating median is easy.
  **Check** `I6`, `I8`, `P7`.

- **RULE** Responsive images: `srcset` with `w` descriptors + accurate `sizes` for fluid images; `x` descriptors (1x/2x) only when rendered size is fixed; `<picture><source media=...>` only for art direction (different crop), not for resolution. `sizes="auto"` (with `loading=lazy`) is Chrome 126 / Firefox 150 / Safari 27: enhancement, still write a real `sizes` [verified BCD]. A missing `sizes` is read as `100vw`, over-downloading narrow images [engine note].
  **Check** `I5`, `I7`.

- **RULE** Intrinsic file width should be 1x-2x rendered CSS width times DPR cap 2 (do not ship 3x); rendered image should not be upscaled (>1.0 CSS px per image px at DPR 1 is blur).
  **Check** `I5`: `naturalWidth >= clientWidth * min(DPR,2) * 0.9` and `<= clientWidth * 2 * 1.5`.

- **RULE** Background / decorative video: `autoplay muted loop playsinline` (+ `preload="metadata"` or `none`), `poster` image that is the LCP candidate, <= ~2 MB (hero) mobile, WebM/MP4 H.264 baseline, no audio track needed, **pause control** (WCAG 2.2.2: auto-start, > 5 s, alongside other content needs pause/stop/hide) [2.2.2 verified; byte budget and attribute set engine note], disabled (poster only) under `prefers-reduced-motion: reduce` and optionally `Save-Data`.
  **Check** `I9`, `A12`.

- **RULE** Reserve space for late content (embeds, cookie banners, injected widgets): overlay or fixed-position, never push content; animate with `transform`/`opacity` only [verified web.dev CLS].
  **Check** `P2`.

- **RULE** Keep pages bfcache-eligible (no `unload` handlers, no `Cache-Control: no-store` on HTML where avoidable) [verified web.dev: bfcache improves CLS on back/forward].

### 2.5 Fonts

- **RULE** Self-host WOFF2 only, subset to needed scripts (`unicode-range`), preload only the 1-2 critical files (`<link rel=preload as=font type=font/woff2 crossorigin>`), inline `@font-face` in `<head>`, <= 2 families and <= 4 files; use a variable font if you need >= 3 weights [all verified web.dev font best practices except numeric limits = engine note].
  **Check** `F1-F3`.

- **RULE** `font-display`: `swap` for brand/display fonts (block 0 ms), `optional` for body text where CLS must be zero; Chromium/Firefox block text up to 3 s by default and Safari indefinitely if unset [verified].
  **Check** `F1`.

- **RULE** Pair each webfont with a metric-matched fallback `@font-face` using `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` (Next.js `next/font` and Fontaine generate these). `size-adjust` Safari 17, `ascent-override` not in Safari stable [verified BCD: Safari "preview"], so the CLS gain is Chromium/Firefox only.
  **Check** `F4`: layout-shift entries attributable to font swap = 0 (throttle font request to 1 s).

- **RULE** Use `system-ui` stack for UI chrome where the brand allows, and `font-optical-sizing: auto` for variable fonts with an `opsz` axis [engine note].

### 2.6 Core Web Vitals budgets for a marketing page

| Metric | Good | Poor | Lab proxy and gate |
|---|---|---|---|
| LCP | <= 2.5 s | > 4.0 s | Lighthouse mobile (simulated 4x CPU, 150 ms RTT, 1.6 Mbps) LCP <= 2.5 s; pass desktop <= 1.8 s [thresholds verified; mobile throttle verified Lighthouse docs; desktop target engine note] |
| INP | <= 200 ms | > 500 ms | Lab: scripted interaction Event Timing <= 200 ms; TBT <= 200 ms as proxy [verified INP numbers; TBT proxy engine note] |
| CLS | <= 0.1 | > 0.25 | Lab: session-window CLS over full scroll <= 0.05 target, 0.1 hard [verified 0.1/0.25] |
| TTFB | <= 0.8 s | > 1.8 s | [engine note, standard web.dev thresholds] |

Lighthouse weights shown in current docs page (labelled v10): TBT 30%, LCP 25%, CLS 25%, FCP 10%, Speed Index 10%; Lighthouse 13 (Oct 2025) moved non-scored audits to "insights" and did not change scoring [verified docs page; Lighthouse 13 scoring-unchanged claim = secondary]. INP is not in the performance score.

Transfer budgets for a marketing page (initial load, compressed): JS <= 300 KB target, 500 KB hard (HTTP Archive 2025 median: 632 KB mobile / 697 KB desktop home page [verified]); CSS <= 80 KB; fonts <= 120 KB; images above the fold <= 500 KB; total <= 1.5 MB target, 2.5 MB hard (median 2.56 MB mobile) [budgets engine note]; requests <= 60 (median 75 mobile) [median verified].

### 2.7 Accessibility to WCAG 2.2 AA

New in 2.2: 2.4.11 Focus Not Obscured (Minimum) AA; 2.4.12 Enhanced AAA; 2.4.13 Focus Appearance AAA; 2.5.7 Dragging Movements AA; 2.5.8 Target Size (Minimum) AA; 3.2.6 Consistent Help A; 3.3.7 Redundant Entry A; 3.3.8 Accessible Authentication (Minimum) AA; 3.3.9 Enhanced AAA. 4.1.1 Parsing removed [all verified].

- **RULE** Every focusable element has a visible focus indicator: use `:focus-visible` with a >= 2 px outline (or equivalent box-shadow), offset >= 2 px, colour with >= 3:1 contrast against both the element and the adjacent background. Never `outline: none` without replacement.
  **Why** 2.4.7 (AA) requires visible focus; 2.4.13 (AAA) gives the target: area >= a 2 px perimeter, 3:1 change of contrast between focused and unfocused pixels [2.4.13 numbers verified]; 1.4.11 requires 3:1 for focus indicators [verified].
  **Check** `A3`.

- **RULE** Focused elements are never fully hidden by sticky/fixed headers, cookie bars or chat widgets: add `scroll-padding-top` (>= header height) on `html` and `scroll-margin-top` on anchor targets.
  **Why** 2.4.11 Focus Not Obscured (Minimum), AA [verified].
  **Check** `A5`.

- **RULE** Contrast: text >= 4.5:1; large text (>= 24 CSS px, or >= 18.66 px bold) >= 3:1; UI component boundaries, icons that carry meaning, focus rings, input borders >= 3:1 against adjacent colour; disabled controls are exempt; hover effects need not meet 3:1 but must not lose contrast [4.5/3/3 numbers verified for 1.4.11; 1.4.3 thresholds standard]. Check light and dark themes and every state, plus text over images/gradients/video.
  **Why** Low-contrast text is the #1 WebAIM failure at 83.9% [verified].
  **Check** `A1` (axe), `A2` (custom, including image/gradient sampling).

- **RULE** Targets >= 24x24 CSS px, or smaller targets with a 24 px diameter circle (centred on target) that intersects no other target/circle; exceptions: inline in text, equivalent control exists, user-agent control, essential [verified].
  **Check** `L7`.

- **RULE** Use native elements: `<button>` for actions, `<a href>` for navigation, `<input>`+`<label>`, `<dialog>`, `<details>`, `<nav>`, `<main>`, headings in order; ARIA only to fill gaps. "No ARIA is better than bad ARIA" (first rule of ARIA) [engine note; WebAIM correlation verified].
  **Check** `A1`, `A6`, `A7`; static: no `div`/`span` with `onclick` and no `role=button` on `<div>` when `<button>` possible.

- **RULE** Landmarks: one `<header>` (banner), `<nav aria-label>`, one `<main id>`, `<footer>` (contentinfo); first focusable element is a "Skip to content" link targeting `main`, visible on focus; exactly one `<h1>`; no skipped heading levels; `<html lang>` set (13.5% of pages lack it [verified]).
  **Check** `A6`, `A7`, `A9`.

- **RULE** Names: links and buttons have discernible text (empty links 46.3%, empty buttons 30.6% [verified]); icon-only buttons get `aria-label` or visually-hidden text; decorative SVGs `aria-hidden="true" focusable="false"`; images have `alt` (decorative `alt=""`); avoid several links with identical text but different destinations ("Learn more" x6) without added context.
  **Check** `A1` (link-name, button-name, image-alt), `A8`.

- **RULE** Forms: visible `<label for>` for every control (not placeholder-only; 51% lack labels [verified]); `autocomplete` tokens on identity/address/payment fields (1.3.5); errors shown as text + icon (not colour alone), linked with `aria-describedby`, `aria-invalid="true"` after validation, focus moved to first error or an error summary; required fields indicated in text; do not block paste (3.3.8); do not re-ask previously entered info (3.3.7); use `:user-invalid` not `:invalid` for styling so fields are not red on load (Chrome 119, Firefox 88, Safari 16.5 [verified]).
  **Check** `A10`.

- **RULE** Motion: `@media (prefers-reduced-motion: reduce)` removes parallax, zoom, background video, auto-advancing carousels, scroll-linked movement; keep functional feedback. Anything that auto-moves > 5 s needs a pause control (2.2.2) [verified web.dev + W3C]. Never flash > 3 times per second (2.3.1).
  **Check** `A11`, `A12`.

- **RULE** Reflow and text resizing: no 2D scroll at 320 px wide; content survives 200% text size and the 1.4.12 spacing overrides (line-height 1.5, paragraph spacing 2x, letter-spacing 0.12em, word-spacing 0.16em) with no clipped or overlapped text [all verified].
  **Check** `L1`, `A13`.

- **RULE** Dialog (modal): use `<dialog>` + `showModal()`; accessible name via `aria-labelledby`; initial focus on first control or heading (`tabindex=-1`) for long content; Tab/Shift+Tab stay inside; Esc closes; on close, focus returns to the invoker; visible close button [APG verified]. Do not add a JS focus trap on top of native modal dialog and do not rely on `aria-modal` alone to make background inert (use `inert` or `showModal()`) [secondary]. `showModal()` does not restore focus in every browser in older reports, so assert it [secondary].
  **Check** `A15`.

- **RULE** Site navigation menus are disclosure widgets, not ARIA menus: `<nav>` > list of links; sub-lists toggled by a `<button aria-expanded>` (optionally `aria-controls`); Esc closes the open sub-list; Tab walks links; do not use `role=menu|menubar|menuitem` or `aria-haspopup` for navigation; never put `aria-expanded` on a link [verified, Roselli + APG notes].
  **Check** `A15`: no `[role=menu],[role=menubar]` inside `nav`.

- **RULE** Screen-reader pass (manual, release gate): VoiceOver+Safari (macOS/iOS), NVDA+Firefox/Chrome (Windows), TalkBack+Chrome (Android). Script: heading list, landmarks list, form fields, dialog open/close, menu, and one primary conversion path. Playwright `locator.ariaSnapshot()` / `toMatchAriaSnapshot()` can pin the accessibility tree in CI [verified]; it does not replace real AT.

- **RULE** Honour `forced-colors: active` and `prefers-contrast: more`: borders on buttons/inputs/cards must not depend on `box-shadow` or background colour only (they vanish in forced-colors); keep `outline` (transparent outline shows) for focus [engine note + Tailwind variants verified].
  **Check** `A18` screenshot under `forcedColors: 'active'`.

### 2.8 Dark mode

- **RULE** Implement with tokens: define semantic variables (`--bg`, `--surface`, `--fg`, `--muted`, `--border`, `--accent`) twice (or with `light-dark()`), set `color-scheme: light dark` on `:root` (so form controls, scrollbars, canvas, default text follow), add `<meta name="color-scheme" content="light dark">`, and set the class/attribute pre-paint from `localStorage` and `matchMedia` [Tailwind inline script verified; meta color-scheme supported Chrome 81 / Firefox 96 / Safari 12.1 verified].
  **Check** `S6`.

- **RULE** Dark palette is not an inversion: lower-chroma accent, surfaces separated by lightness steps (not shadows), body text not pure #fff on pure #000 (use ~90-95% L on ~10-15% L surfaces to limit halation), re-check every contrast pair, swap or invert-aware imagery/logos, reduce image brightness slightly if needed (`filter: brightness(.9)` on photos is optional) [engine note, design opinion].
  **Check** `A2` run again under `colorScheme: 'dark'`; visual.

- **RULE** Provide a theme-colour meta per scheme (`<meta name="theme-color" media="(prefers-color-scheme: dark)" content="...">`) (Chrome 73, Safari 15, not Firefox [verified BCD]).

### 2.9 i18n, RTL, long-text resilience

- **RULE** Design every text container for +40% text expansion and unbroken long tokens: `overflow-wrap: anywhere` (or `break-word`) on headings/cards/buttons, `min-width: 0` on flex/grid children, `hyphens: auto` with correct `lang` for body copy, no fixed heights or `white-space: nowrap` on text containers, buttons grow (`min-width` + padding, not fixed `width`).
  **Why** German/Finnish/Lithuanian compounds, long names and CMS content break fixed layouts [engine note; Josh Comeau reset applies `overflow-wrap` on text elements, secondary].
  **Check** `S7` stress: replace all text nodes with pseudo-localised +40% strings and inject a 40-char unbroken token into h1/h2/button/card title; assert `L1`/`L2` still pass, no text overlap (`A13`).

- **RULE** Support RTL by flipping `dir="rtl"` on `<html>`: logical properties, `:dir()`/`[dir=rtl]` for the few directional icons (arrows, chevrons, progress), `text-align: start`, flex/grid auto-flip. Do not mirror logos, numerals, media controls, or phone numbers.
  **Check** `S7`: with `dir=rtl`, `L1` passes; first-in-DOM nav item is rightmost; static physical-property count = 0. `:dir()` Chrome 120 / Firefox 49 / Safari 16.4 [verified].

- **RULE** Use `lang` on `<html>` and on foreign-language spans; use `Intl.*` (Segmenter, NumberFormat, DateTimeFormat) rather than string hacks; `text-autospace` (Chrome 140 / Firefox 145 / Safari 18.4) improves mixed CJK/Latin [verified].

- **RULE** Font stacks cover the target scripts (Latin Extended for LT/PL/CZ; Cyrillic; Arabic; CJK via system fallback); test diacritics (Ą Č Ė Š Ž Ū) at heading line-height: line-height < 1.1 clips ascenders/diacritics [engine note].
  **Check** render sample string "ĄČĘĖĮŠŲŪŽ ÅÄÖ" at each heading size; no clip (`overflow:hidden` + scrollHeight > clientHeight).

### 2.10 State coverage

- **RULE** Every interactive component implements and visibly differentiates: default, hover (pointer only), `:focus-visible`, `:active`/pressed, disabled (`disabled` attr, not just class; lower contrast but readable; `cursor: not-allowed` optional), loading (spinner + `aria-busy`, width stays constant: no layout shift), selected/current (`aria-current`, `aria-selected`, `aria-pressed`), invalid/error, success. Data views: empty, loading (skeleton with matching dimensions), error with retry, partial, long/overflow content.
  **Check** `S1` computed-style diff matrix; `S5` fixtures.

- **RULE** Transition properties explicitly (`transition: background-color .15s, color .15s, box-shadow .15s, transform .15s`), never `transition: all`; UI feedback 100-250 ms, enter/exit overlays 200-350 ms, easing ease-out for enter; Tailwind v4 `transition` includes `outline-color`: set the outline colour unconditionally to avoid a colour flash on focus [verified Tailwind change; durations engine note].
  **Check** `S3`.

- **RULE** Pointer cursor on every non-link click target, `touch-action: manipulation` on tap controls to remove double-tap-zoom delay [engine note], `-webkit-tap-highlight-color` deliberately set.
  **Check** `S2`.

### 2.11 SEO/meta/OG (hand-off only; not design-engine's job to optimise)

- **RULE** Ship per page: one `<title>` (unique), `<meta name=description>`, `<link rel=canonical>`, `og:title/description/image/url/type`, `twitter:card=summary_large_image`, `og:image` absolute HTTPS URL at 1200x630 (1.91:1) under ~1 MB, favicon set (`.ico`/SVG + 180 px apple-touch-icon), `theme-color`, JSON-LD (Organization/WebSite/Product as relevant) that parses, `hreflang` if multilingual, robots meta explicit, real `<h1>`.
  **Why** Link previews and indexing depend on them; Google does not publish hard title/description length limits, so lengths are display heuristics [engine note: title ~50-60 chars, description ~120-160].
  **Check** `H3`.

---

## 3. Numbers & scales

### 3.1 Browser support snapshot (MDN browser-compat-data 8.1.5, generated 2026-10-08)

First stable version with unflagged support. "preview" = only in Technology Preview/Nightly; "flag" = behind flag; "no" = not shipped. Tier is **my derivation**: Baseline widely available = all of Chrome/Edge/Firefox/Safari shipped >= 30 months before today (before ~Apr 2024); newly = all four shipped but < 30 months; limited = at least one engine missing. [verified data, derived tier]

| Feature | Chrome/Edge | Firefox | Safari (iOS) | Tier (Oct 2026) | Policy |
|---|---|---|---|---|---|
| Container size queries `@container`, cq units | 105 | 110 | 16 | widely | use |
| Container style queries (custom props) | 111 | 151 | 18 | newly | enhance |
| Container `scroll-state()` | 133 | no | no | limited | avoid |
| `:has()` | 105 | 121 | 15.4 | widely | use |
| `subgrid` | 117 | 71 | 16 | widely | use |
| CSS nesting | 120 | 117 | 17.2 | widely | use |
| `@layer` | 99 | 97 | 15.4 | widely | use |
| `@property` | 85 | 128 | 16.4 | newly | use (token animation) |
| `@scope` | 118 | 146 | 26.4 | newly | enhance |
| `@starting-style`, `transition-behavior` | 117 | 129 | 17.5 / 17.4 | newly | use |
| `dvh/svh/lvh` | 108 | 101 | 15.4 | widely | use |
| `aspect-ratio` | 88 | 89 | 15 | widely | use |
| `clamp()/min()/max()` | 79 | 75 | 13.1 | widely | use |
| `text-wrap: balance` | 114 | 121 | 17.5 | newly (approaching widely ~Nov 2026) | use |
| `text-wrap: pretty` | 117 | no | 26 | limited | enhance only |
| `color-mix()` | 111 | 113 | 16.2 | widely | use |
| Relative colour syntax | 119-125 | 128 | 18 | newly | use w/ fallback |
| `light-dark()` | 123 | 120 | 17.5 | newly | use w/ fallback |
| `oklch()` | 111 | 113 | 15.4 | widely | use |
| `contrast-color()` | 147 | 146 | 26 | newly | enhance |
| Anchor positioning (`anchor-name`) | 125 (`position-area` 129) | 147 | 26 | newly (Jan 2026) | use w/ `@supports` |
| Popover API | 114 | 125 | 17 (iOS 18.3 for attr) | newly -> widely ~now | use |
| `popover="hint"` | 151 | 153 | preview | limited | avoid |
| `commandfor`/`command` | 135 | 144 | 26.2 | newly | enhance |
| `<dialog closedby>` | 134 | 141 | preview | limited | enhance |
| `dialog.requestClose()` | 134 | 139 | 18.4 | newly | enhance |
| View Transitions same-document | 111 | 144 | 18 | newly (Oct 2025) | use w/ guard |
| View Transitions cross-document `@view-transition` | 126 | no | 18.2 | limited (Interop 2026 target) | enhance only |
| Scroll-driven animations (`animation-timeline`) | 115 | preview (flag) | 26 | limited | enhance only |
| `field-sizing` | 123 | 152 | 26.2 | newly | enhance |
| `interpolate-size`, `calc-size()` | 129 | no | no | limited | enhance |
| CSS `if()` | 137 | no | no | limited | avoid |
| `sibling-index()` | 138 | 154 | 26.2 | newly | enhance |
| `text-box-trim` | 133 | 154 | 18.2 | newly | enhance |
| `::details-content`, `details[name]` | 131 / 120 | 143 / 130 | 18.4 / 17.2 | newly | use |
| `appearance: base-select` (customisable select) | 135 | flag | 27 | limited | enhance only |
| `scrollbar-color` / `scrollbar-width` | 121 | 64 | 26.2 / 18.2 | newly | use |
| `scrollbar-gutter` | 94 | 97 | 18.2 | newly | use |
| `content-visibility` | 85 | 125 | 18 | newly | use |
| `inert` | 102 | 112 | 15.5 | widely | use |
| `:focus-visible` | 86 | 85 | 15.4 | widely | use |
| `:user-invalid` | 119 | 88 | 16.5 | widely | use |
| `prefers-reduced-motion`/`prefers-contrast`/`forced-colors` | 74/96/89 | 63/101/89 | 10.1/14.1/16 | widely | use |
| `hover` / `pointer` media | 38/41 | 64 | 9 | widely | use |
| `fetchpriority` | 101 | 132 | 17.2 | newly | use |
| `img sizes="auto"` | 126 | 150 | 27 | limited | enhance |
| `size-adjust` / `ascent-override` | 92 / 87 | 92 / 89 | 17 / preview | partial | use (CLS win Chromium+FF) |
| `LayoutShift` / LoAF perf APIs | 77 / 123 | no / no | no / no | n/a | **measure in Chromium only** |
| Speculation Rules | 109 | no | flag | limited | optional |

Support of ancillary APIs relevant to measurement: `PerformanceObserver` LCP entry Chrome 77 / Firefox 122 / Safari 26.2; Event Timing Chrome 76 / Firefox 89 / Safari 26.2 [verified].

### 3.2 Thresholds

| Item | Number | Source |
|---|---|---|
| LCP good / poor | <= 2.5 s / > 4.0 s | web.dev [verified] |
| INP good / poor | <= 200 ms / > 500 ms | web.dev [verified] |
| CLS good / poor | <= 0.1 / > 0.25 | web.dev [verified] |
| CLS grace after input | 500 ms | web.dev [verified] |
| Lighthouse mobile throttling | 150 ms RTT, 1.6 Mbps down / 750 Kbps up, 4x CPU | Lighthouse docs [verified] |
| Lighthouse weights | TBT 30, LCP 25, CLS 25, FCP 10, SI 10 | docs page [verified] |
| Contrast text / large text / non-text | 4.5 / 3 / 3 | WCAG 1.4.3, 1.4.11 |
| Target size | 24x24 CSS px (AA); 44 (AAA 2.5.5) | WCAG 2.5.8 [verified] |
| Reflow | 320 CSS px wide, 256 high | WCAG 1.4.10 [verified] |
| Text spacing | LH 1.5, para 2x, letter 0.12em, word 0.16em | WCAG 1.4.12 [verified] |
| Focus appearance (AAA) | >= 2 px perimeter area, 3:1 change | WCAG 2.4.13 [verified] |
| Pause/stop/hide | auto-start, > 5 s, parallel with other content | WCAG 2.2.2 [verified] |
| HTTP Archive 2025 median home page | 2.56 MB mobile / 2.86 MB desktop; images 911 / 1,058 KB; JS 632 / 697 KB; requests 75 / 80; video 315 KB (all pages) | Web Almanac 2025 [verified] |
| WebAIM Million 2026 | 95.9% pages fail; 56.1 errors/page; contrast 83.9%, alt 53.1%, labels 51%, empty links 46.3%, empty buttons 30.6%, lang 13.5% | webaim.org [verified] |

### 3.3 Viewport / emulation matrix (design-engine default)

Widths (CSS px): 320, 360, 390, 430, 600, 768, 1024, 1280, 1440, 1920, 2560. Mobile profiles: `isMobile:true, hasTouch:true, deviceScaleFactor:2-3`. Desktop: DPR 1 and 2. Heights: 640 for <= 430, 800 for 768-1280, 1080+ above. Media emulation: `colorScheme` light/dark, `reducedMotion` reduce/no-preference, `forcedColors` active, `contrast` more [Playwright API verified].

---

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| `clamp(1.125rem, 1rem + 1.2vw, 1.5rem)` | `font-size: 4vw` | vw-only text ignores zoom, fails 1.4.4 (F94) |
| `min-height: 100svh` hero + `100dvh` for overlay | `height: 100vh` hero | mobile toolbar overlap |
| `<img width=1200 height=800 style="height:auto">` | `<img>` with no dimensions | CLS |
| LCP `<img fetchpriority=high>` no lazy | `loading=lazy` on hero | delays LCP |
| `<button aria-expanded>` disclosure nav | `role=menu` on a `<ul>` of links | wrong AT mode (Roselli) |
| `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px }` | `*:focus{outline:none}` | fails 2.4.7/1.4.11 |
| `gap-4` flex/grid | `space-y-4` with margin-carrying children (v4 selector change) | broken rhythm |
| `bg-(--brand)` | `bg-[--brand]` (v3 syntax) | v4 syntax |
| Opt-in motion in `no-preference` | `animation: none` hacks in `reduce` for everything | simpler, safer |
| Base style = visible, enhancement hides/animates inside `@supports` | Base style `opacity:0` waiting for scroll timeline | invisible content in Firefox |
| `overflow-wrap:anywhere; min-width:0` | fixed `width` on buttons/cards | long-word overflow |
| `margin-inline-start` | `margin-left` | RTL |
| Error text + icon + `aria-describedby` | red border only | 1.4.1 colour only |
| Real `<label>` | placeholder as label | 51% of pages lack labels |

## 5. Exceptions & judgement calls

- **Fixed-size hero at 2560.** Capping content width (rule 2.3) conflicts with immersive full-bleed art direction. Resolve: cap the *text/controls* column, let the media bleed; verify `L11` on the text column only.
- **44 px targets vs dense UI.** On a marketing page there is rarely a reason to go under 44 on touch; footers with link columns can use 24 px + spacing circle to pass AA, but add vertical padding on coarse pointers.
- **`prefers-reduced-motion` and brand motion.** Reduced motion means "reduce", not "zero": cross-fades and opacity changes are usually fine; translate/scale/parallax/zoom and video autoplay are what to remove [web.dev lists vestibular triggers; "opacity is fine" is engine note].
- **`text-wrap: balance` vs left-aligned long copy.** Balance only on headings and short blocks (browsers cap lines). Do not balance paragraphs.
- **Dark mode scope.** A marketing page with a heavily art-directed light hero may justify "light only" (`color-scheme: light`): decide explicitly rather than half-supporting dark; if light-only, still set `color-scheme: only light`-equivalent so form controls do not turn dark.
- **View transitions on MPAs.** Cross-document transitions are visually nice but Firefox lacks them and they add paint cost; Interop 2026 is targeting parity, so revisit in 2027.
- **Anchor positioning vs library.** If analytics show > 5% Safari < 26 or Firefox < 147, ship the library fallback until traffic shifts [engine note].
- **AVIF vs WebP.** AVIF is smaller but slower to encode and decode; for hero LCP on low-end phones check decode time; WebP is the safe floor [engine note].
- **Lab vs field.** Lab LCP/CLS in a render-and-check tool is a regression guard, not truth; CrUX/RUM at p75 is truth [verified: web.dev says 75th percentile].
- **axe passes != accessible.** Automation catches a subset only; Playwright docs explicitly say combine with manual and user testing [verified]. No percentage was stated in the Playwright docs; the popular "30-40% of issues" figure was not verified here.
- **Tailwind class soup vs component CSS.** Utilities are fine; but states (`hover/focus/active/disabled/loading`) must still be present on the component. Missing states are not a Tailwind problem, they are a spec problem.

## 6. Figures worth keeping

None (web research; no page images). Candidates to screenshot into `examples/` later: Roselli's disclosure-nav demo, Chrome's view-transitions demos, web.dev LCP subpart diagram, WebAIM Million results chart.

## 7. Open questions

- Baseline tier column is **derived** from MDN BCD versions and today's date, not read from the `web-features` dataset; the web.dev January 2026 page showed inconsistent badge versions for anchor positioning (text said Firefox 147; badges showed 151) while BCD says Firefox 147. Re-verify against webstatus.dev before relying on a borderline tier (popover, `text-wrap: balance`, `light-dark()` are within weeks of "widely").
- Scroll-driven animations: BCD says Firefox "preview"; one secondary blog reported Firefox 152 (June 2026) still flagged. Treat as unsupported in Firefox stable until confirmed.
- Lighthouse scoring weights come from a docs page labelled Lighthouse 10; Lighthouse 13 is reported (secondary) as not changing scoring. A Lighthouse 13.x weight table was not found.
- Safari 27 entries in BCD (`sizes=auto`, `appearance: base-select`) imply Safari 27 has shipped by Oct 2026; I did not verify its release date or iOS adoption.
- iOS Safari "inputs < 16px zoom on focus" and the `text-wrap`/`pretty` Firefox timeline are well-known but not re-verified from a primary source in this session.
- Josh Comeau / Kevin Powell / Una Kravets / Bramus material was reached only through search snippets (reset content, container-query advice, fluid-type accessibility); primary articles were not read in full.
- TTFB thresholds (0.8 s / 1.8 s), DOM-size thresholds and TBT <= 200 ms good are standard Lighthouse/web.dev numbers recalled from memory; not fetched here.

---

## 8. Appendix A: Definition of done for a marketing page (mechanically checkable)

A page is **done** only when every item passes in the render-and-check tool. IDs map to `measurable-assertions.md`. "HARD" = blocks delivery; "SOFT" = warn and surface in critique.

**Layout and responsive**
- [ ] HARD `L1` No horizontal overflow at 320, 360, 390, 430, 600, 768, 1024, 1280, 1440, 1920, 2560 (checked with `overflow-x:hidden` neutralised on html/body).
- [ ] HARD `L8` Viewport meta allows zoom (no `user-scalable=no`, no `maximum-scale<5`).
- [ ] HARD `L7` Every pointer target >= 24x24 CSS px or passes the 24 px spacing-circle test; SOFT `L7b` primary controls >= 44x44 on coarse pointer.
- [ ] HARD `L4` Body text >= 16 px at 375 px wide (>= 14 px allowed only for captions/legal); no visible text < 12 px.
- [ ] SOFT `L5` Body measure 45-75 characters per line at every width.
- [ ] SOFT `L11` Text column <= 1600 px (and content container <= 1600) at 2560; `L3` text >= 16 px from viewport edge at <= 480.
- [ ] SOFT `L12` Sibling cards align internal baselines (CTA tops equal within 1 px per row).
- [ ] SOFT `L10` No bare `100vh` for full-height mobile layouts.

**Images, video, fonts, performance**
- [ ] HARD `I1` Every `<img>` has an `alt` attribute (empty only if decorative); no filename alt text.
- [ ] HARD `I2` Every `<img>`, `<video>`, `<iframe>` reserves space (width+height attrs or aspect-ratio).
- [ ] HARD `I3` LCP element: not lazy, `fetchpriority=high` (if image), discoverable in raw HTML.
- [ ] HARD `I4` Below-fold images `loading=lazy`; above-fold none.
- [ ] SOFT `I5/I7` Image intrinsic width 0.9-3x rendered at DPR cap 2; `srcset` with `w` has `sizes`.
- [ ] SOFT `I6` Photos served as AVIF/WebP; no JPEG/PNG photo > 100 KB without modern alternative; hero <= 250 KB.
- [ ] HARD `I9` Background video muted+playsinline+loop+poster, has pause control, is paused/hidden under reduced motion.
- [ ] HARD `F1` Every `@font-face` has `font-display`; `F5` all fonts load (no 404); `F4` font swap causes zero layout shift; SOFT `F2` <= 2 families, <= 4 woff2 files, <= 120 KB.
- [ ] HARD `P1` LCP <= 2.5 s (Lighthouse mobile sim); `P2` CLS <= 0.1; `P3` TBT <= 200 ms; `P4` INP <= 200 ms on scripted interactions.
- [ ] SOFT `P5` Lighthouse mobile performance >= 90, accessibility = 100, best-practices >= 95.
- [ ] SOFT `P6/P7` JS <= 300 KB compressed (hard 500), total <= 1.5 MB (hard 2.5), requests <= 60.

**Accessibility (WCAG 2.2 AA)**
- [ ] HARD `A1` axe: 0 violations with tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, in light and dark, at 375 and 1440, and again after opening each menu/dialog.
- [ ] HARD `A2` Contrast: text >= 4.5 (large >= 3), UI/graphics >= 3, in light, dark, hover, focus, disabled-exempt states, including text over images/gradients/video.
- [ ] HARD `A3` Every focusable element shows a visible, changed focus indicator (>= 2 px, >= 3:1).
- [ ] HARD `A4` Tab order follows visual order; no positive tabindex; skip link is first and works; no keyboard trap.
- [ ] HARD `A5` No focused element is fully hidden by sticky/fixed UI.
- [ ] HARD `A6/A7/A9` One `main`, `header`, `footer`, labelled `nav`s; exactly one `h1`; no skipped heading levels; `html[lang]` valid.
- [ ] HARD `A10` Forms: label, autocomplete, error text + `aria-invalid` + `aria-describedby`, input font-size >= 16 px.
- [ ] HARD `A11/A12` Reduced-motion emulation leaves no running decorative animation; any auto-motion > 5 s has a control.
- [ ] HARD `A13` 200% text size, 1.4.12 spacing override, and 320 px reflow: no clipped or overlapping text, no loss of function.
- [ ] HARD `A15` Dialog/menu keyboard contract passes (focus in, Esc closes, focus returns, background inert, `aria-expanded` toggles).
- [ ] SOFT `A18` Forced-colors screenshot keeps borders, focus and icons visible.
- [ ] MANUAL release gate: VoiceOver+Safari and NVDA+Firefox pass on the primary conversion path.

**States and themes**
- [ ] HARD `S1` Every button/link/input/card-link has distinct hover, focus-visible, active, disabled computed styles; loading and error variants exist where applicable.
- [ ] HARD `S3` No `transition: all`; UI feedback durations 100-350 ms.
- [ ] HARD `S4` With touch emulation (no hover) no content/control is reachable only via hover.
- [ ] HARD `S6` Dark mode: no flash of wrong theme on first paint, `color-scheme` set, all contrast checks re-pass.
- [ ] SOFT `S2` `cursor:pointer` on all non-link click targets.
- [ ] HARD `S7` Stress: +40% text, 40-char unbroken token, RTL: all of `L1`, `L2`, `A13` pass.
- [ ] SOFT `S5` Empty/error/loading fixtures render designed states.

**Hygiene and hand-off**
- [ ] HARD `H1` 0 console errors, 0 failed requests (4xx/5xx), 0 mixed content.
- [ ] HARD `H5` No lorem ipsum, TODO, `href="#"` placeholders.
- [ ] SOFT `H6` `!important` <= 3; physical left/right properties = 0; limited-tier CSS only inside `@supports`; no v3-only Tailwind class names.
- [ ] SOFT `H7` Spacing values on the 4/8 px scale >= 90%; <= 12 distinct colours, <= 8 font sizes, <= 4 radii.
- [ ] HAND-OFF `H3` Title, description, canonical, OG/Twitter, favicon, JSON-LD parse, hreflang.

---

## 9. Appendix B: Known gotchas

**Overflow and sizing**
1. `overflow-x: hidden` on `html`/`body` masks horizontal overflow (page "does not scroll" but content is clipped and `scrollWidth` lies). It also breaks `position: sticky` on descendants when set on an ancestor scroll container. Test with it neutralised; use `overflow-x: clip` on specific wrappers, not body. [engine note]
2. Flex/grid children default to `min-width: auto`, so long words/URLs/pre blocks push the parent wider than the viewport. Fix with `min-width: 0` (or `overflow: hidden/auto`), `overflow-wrap: anywhere`, and `grid-template-columns: minmax(0, 1fr)` instead of `1fr`. [engine note]
3. `100vw` includes the scrollbar width on desktop and causes 15-17 px overflow; use `100%`, and `scrollbar-gutter: stable` to avoid layout jump when a modal removes the scrollbar (Safari 18.2+ verified). [engine note]
4. `100vh` on mobile = large viewport; the bottom of a "full-screen" hero sits under the toolbar. Use `svh` (stable) or `dvh` (live).
5. `dvh` live-resizing during scroll can make layouts jump; use it for overlays, not for page sections.
6. Images wider than container: `img { max-width: 100%; height: auto; display: block }` is the baseline; `object-fit` needs an explicit box (aspect-ratio or height).
7. `position: fixed` inside a transformed/filtered/`backdrop-filter`/`will-change: transform` ancestor is positioned relative to that ancestor, not the viewport; modals in animated wrappers break. Render dialogs in the top layer (`<dialog>`/popover) to escape this. [engine note]
8. `z-index` wars: use a root stacking context (`isolation: isolate` on app root) and top-layer for overlays; keep a documented scale. (Comeau's reset applies root isolation: secondary.)
9. Sticky header + in-page anchors: add `scroll-margin-top` / `scroll-padding-top` or targets hide under the header (also WCAG 2.4.11).
10. `gap` inside flex needs `flex-wrap` to wrap; negative-margin grid hacks are obsolete.

**Typography**
11. Fluid type without rem fails zoom; fluid type with a tight max can prevent reaching 200% (W3C F94; Kravets/Roselli notes, secondary).
12. `line-height` under 1.1 clips diacritics (Lithuanian Ą Č Ė Š Ž) and descenders when the box has `overflow: hidden` (e.g. text-gradient or truncate).
13. `background-clip: text` with transparent fill shows nothing in forced-colors and print; set a fallback colour. [engine note]
14. `text-wrap: pretty` is absent in Firefox (BCD 2026-10-08): the design must not rely on its line breaks.
15. `font-display: swap` without a metric-matched fallback = visible reflow (CLS) even if "fast"; `optional` avoids it but can skip the font on slow first loads.
16. Preloading a font without `crossorigin` downloads it twice; preload ignores `unicode-range` (web.dev verified for the latter).
17. Faux bold/italic appears when the requested weight is not loaded: check `document.fonts` for the exact weights used.

**Tailwind v4**
18. Copy-pasted v3 markup silently changes: `shadow-sm`, `rounded`, `blur`, `ring` (1px now), `border` colour (currentColor), placeholder colour, button cursor, `outline-none` (now removes outline entirely: use `outline-hidden`). [verified]
19. `hover:` no longer fires on touch devices (media-gated): sticky-hover bug is gone, but tap feedback needs `active:`. [verified]
20. `@apply` in CSS modules/Vue/Svelte/Astro needs `@reference`; `bg-[--x]` -> `bg-(--x)`; `!important` is a suffix; dynamic class concatenation never works; `tailwind.config.js` is not auto-loaded (`@config`); `safelist` removed (`@source inline`); Sass/Less/Stylus unsupported. [verified except dynamic classes]
21. `@theme` variables unused by any utility are not emitted: `getComputedStyle(root).getPropertyValue('--x')` returns empty unless `@theme static` or the var is referenced. [verified]
22. Variable chains in `@theme` need `inline`, else `font-sans` resolves in the wrong scope and falls back to generic sans. [verified]
23. `transition` utilities now animate `outline-color`: a focus ring can flash from the previous colour; set the outline colour unconditionally. [verified]
24. `transition-[opacity,transform]` no longer animates `scale-*`/`rotate-*`/`translate-*` (individual transform properties): list `scale`, `rotate`, `translate`. [verified]
25. `hidden` attribute now beats `block/flex`: toggling visibility by class while `hidden` remains in the DOM does nothing. [verified]
26. `<dialog>` margins reset to 0: modals pin top-left unless `margin: auto`. [verified]
27. Container utility config (center/padding) removed: re-add via `@utility container`. [verified]

**Platform and browsers**
28. Safari: `backdrop-filter` is expensive and can flicker on scroll with large blurred areas; test on WebKit/real device and cap blur radius and area. [engine note]
29. iOS Safari zooms into inputs with font-size < 16 px; `position: fixed` bottom bars jump with the keyboard; autoplay needs `muted` + `playsinline`; Low Power Mode may block autoplay video, so the poster must stand alone. [engine note]
30. Autofill paints a UA background/colour (`:autofill`) that can wreck dark-mode contrast; style it deliberately. [engine note]
31. WebKit and Firefox have no `LayoutShift` or Long-Animation-Frame performance entries (BCD): CLS must be measured in Chromium in the render tool; do not conclude CLS=0 from WebKit/Firefox runs. [verified]
32. `scroll-behavior: smooth` must be disabled under `prefers-reduced-motion: reduce`.
33. Plain `:hover` on touch leaves the hover state "stuck" after tap: wrap in `@media (hover: hover)` (Tailwind v4 does it for you). [engine note]
34. Headless Chrome: fonts, emoji and scrollbars differ from desktop; overlay scrollbars hide 15 px overflow differences. Always `await document.fonts.ready` before measuring. [engine note]
35. Lazy images below the fold are not loaded in a static screenshot; scroll the page in steps before full-page screenshots and before measuring image sizes. [engine note]
36. `loading="lazy"` inside collapsed/hidden containers never loads until visible; do not lazy-load LCP candidates inside carousels/tabs.
37. Cookie banners, chat widgets and A/B scripts are the main CLS/target-size/overlap offenders; the render tool must test with consent UI present and with it dismissed. [engine note]

**Accessibility**
38. `aria-label` on a `<div>`/`<span>` without a role is ignored by many AT; `title` is not a reliable name; placeholder is not a label.
39. `aria-hidden="true"` on or around focusable elements leaves keyboard users on a control AT cannot see (axe: `aria-hidden-focus`).
40. `display:none`/`visibility:hidden` removes from the accessibility tree; `opacity:0` and off-screen positioning do not (use `inert` for closed off-canvas menus).
41. `role="button"` on a `<div>` needs Enter and Space handling, tabindex=0 and a name; just use `<button>`.
42. Custom `<select>`/combobox replacements are the biggest AT regression source; use native `<select>` unless you can pass full APG keyboard behaviour (customisable select `appearance: base-select` is Chromium-only now, verified).
43. Contrast against gradient/image/video backgrounds is reported "incomplete" by axe; it cannot compute them, so the tool must sample screenshot pixels (`A2`). [engine note]
44. A focus ring clipped by an `overflow: hidden` ancestor or covered by a neighbour (z-index) is effectively missing: use inset rings where clipping is unavoidable.
45. Disabled buttons leave the tab order and give no feedback to keyboard users; for submit buttons whose reason matters prefer `aria-disabled="true"` plus a message (judgement call).
46. Carousels: auto-advance with no pause = 2.2.2 failure (verified); off-screen slides must be `inert`/hidden so tabbing does not enter invisible slides.
47. A skip link hidden with `display:none` cannot be focused; hide with a transform/clip that becomes visible on `:focus`.
48. Page-level `outline: 0` resets copied from older CSS resets remove focus for all elements: grep authored CSS.
49. Text baked into images (hero art with a headline) fails reflow/zoom/translation and cannot be contrast-checked: forbid, or duplicate as live text.
50. Cookie-consent and modal overlays must manage focus properly or not block the page (2.4.11 and keyboard operability).

**Measurement traps**
51. Lighthouse numbers vary run to run; take the median of 3-5 runs and gate on thresholds, not exact scores. [engine note]
52. Lab CLS must include scrolling the full page and waiting >= 2 s after load; lab INP needs scripted interactions (INP is not in the Lighthouse score, verified).
53. Playwright `locator.focus()` does not guarantee `:focus-visible` matches; drive with `keyboard.press('Tab')` so the focus-visible heuristic applies. [engine note]
54. `getBoundingClientRect` of rotated/transformed elements is the transformed bounding box; WCAG measures a 24x24 axis-aligned square fitting inside a skewed target (verified), so use a conservative check and flag, not fail, transformed targets.
55. axe `target-size` and `color-contrast` do not cover every state (hover/focus): run axe after programmatically hovering/focusing, and run `A2` per state. [engine note]
