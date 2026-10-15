---
source: web:w3.org/WAI/WCAG22 + web.dev + playwright.dev + developer.mozilla.org (BCD 2026-10-08) + dequeuniversity/axe-core tags + engine heuristics
chapter: Measurable assertions for a render-and-check tool (Playwright + axe + Lighthouse)
pages: n/a (web research, date-stamped 2026-10-08)
topic_tags: [assertions, playwright, axe, lighthouse, core-web-vitals, wcag-2.2, responsive, states, i18n]
status: studied
---

# Measurable assertions (for `tools/` render-and-check)

Companion to `implementation-craft.md` (rules, support table, gotchas, definition of done). Each assertion has an ID used there.

Legend: **HARD** = fail the build; **SOFT** = warn and feed the critique step. Threshold provenance: `[W]` = from a standard (WCAG 2.2 / web.dev), `[H]` = engine heuristic (tunable in `system/`). Playwright Chromium is required for `P*` (LayoutShift and Long Animation Frame entries exist only in Chromium, per MDN BCD 2026-10-08); everything else can also run in WebKit and Firefox.

---

## 1. Harness conventions

### 1.1 Contexts to run (matrix)

| Axis | Values |
|---|---|
| Viewport widths (CSS px) | 320, 360, 390, 430, 600, 768, 1024, 1280, 1440, 1920, 2560 (heights 640 / 800 / 1080) |
| Device flags | mobile: `isMobile:true, hasTouch:true, deviceScaleFactor:2`; desktop: DPR 1 (also 2 for image checks) |
| Colour scheme | `light`, `dark` via `page.emulateMedia({colorScheme})` |
| Motion | `reducedMotion: 'no-preference' | 'reduce'` |
| Contrast / forced | `contrast: 'more'`, `forcedColors: 'active'` (screenshot review only) |
| Browser engines | Chromium (all), WebKit (layout, overflow, fonts, a11y tree), Firefox (layout, overflow) |
| Throttling (perf only) | CDP `Emulation.setCPUThrottlingRate {rate:4}` and `Network.emulateNetworkConditions {latency:150, downloadThroughput:1.6*1024*1024/8, uploadThroughput:750*1024/8}` (matches Lighthouse mobile preset: 150 ms RTT, 1.6 Mbps, 4x CPU) |

Playwright API facts (verified in docs): `page.emulateMedia({ colorScheme, reducedMotion, forcedColors, contrast, media })`; `locator.ariaSnapshot()` / `expect(...).toMatchAriaSnapshot()`; `@axe-core/playwright` `AxeBuilder.withTags([...]).include().exclude().disableRules().analyze()` with `results.violations`.

### 1.2 Standard preparation before any measurement

```js
// call after navigation, before measuring (all engines)
async function prepare(page) {
  await page.evaluate(() => document.fonts.ready);
  // un-mask overflow hidden on root; keep original for restore
  await page.addStyleTag({ content: 'html,body{overflow-x:visible !important}' });
  // trigger lazy content: scroll in viewport-height steps, then back to top
  await page.evaluate(async () => {
    const step = innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y); await new Promise(r => setTimeout(r, 120));
    }
    scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
}
```

Run the whole suite twice: with third-party/consent UI present (as shipped) and after dismissing it, because banners/widgets are the common offenders.

---

## 2. Table of measurable assertions

### 2.1 Layout and responsive (`L*`)

| ID | What | How to measure | Threshold | Sev |
|---|---|---|---|---|
| L1 | No horizontal overflow | After `prepare`: `document.documentElement.scrollWidth - document.documentElement.clientWidth`; plus culprit scan (snippet L1) listing visible elements whose rect exceeds the viewport and are not inside a scroll/clip container | scrollWidth <= clientWidth + 1 at every width in the matrix; culprit list empty [W 1.4.10] | HARD |
| L2 | No clipped text | For each element with text and `overflow` != visible: `scrollWidth > clientWidth + 1` or `scrollHeight > clientHeight + 1` and not `text-overflow: ellipsis` with a reachable full text | 0 clipped (ellipsis allowed only on elements with `title`/expand affordance) [W 1.4.12 intent] | HARD |
| L3 | Gutter at small widths | Min over text/control rects of `rect.left` and `innerWidth - rect.right` at widths <= 480 | >= 16 px [H] | SOFT |
| L4 | Minimum text size | Walk text nodes; computed `font-size` of parent; ignore `sr-only` | Body paragraphs >= 16 px at 375 px; any visible text < 12 px = fail; 12-13.99 px allowed only in caption/legal/labels (max 10% of characters) [H] | HARD |
| L5 | Measure (characters per line) | For each `p` with > 200 chars: `Range` rects per line; chars per line = text length / line count | 45-75 (66 ideal) at widths >= 768; >= 30 at 320 [H] | SOFT |
| L6 | Line-height ratios | computed `line-height` / `font-size`, `normal` -> 1.2 | Body 1.4-1.7; headings 1.0-1.3 but >= 1.1 for text with diacritics; never < 1.0 [H] | SOFT |
| L7 | Target size (WCAG 2.5.8) | Snippet L7: size of every visible interactive element, with inline-text, equivalent, and 24 px spacing-circle exceptions | width >= 24 and height >= 24, else spacing circle test passes [W] | HARD |
| L7b | Touch target comfort | Same set under `pointer: coarse` emulation (`hasTouch`) for primary CTAs, nav links, form controls, icon buttons | >= 44x44 CSS px (links inside paragraphs exempt) [H] | SOFT |
| L8 | Viewport meta | `document.querySelector('meta[name=viewport]').content` | contains `width=device-width` and `initial-scale=1`; no `user-scalable=no/0`; `maximum-scale` absent or >= 5 [W 1.4.4] | HARD |
| L9 | Layout mode count / sweep | Sweep widths 320..2560 step 20; record computed `grid-template-columns` / `flex-direction` of section containers; count distinct signatures | <= 8 distinct layout modes; no width with overflow (L1) [H] | SOFT |
| L10 | Viewport unit hygiene | Scan stylesheets (`document.styleSheets` -> `cssRules`) for `vh` on `height`/`min-height` >= 50vh | Each `100vh` is followed by a `dvh`/`svh` declaration or inside `@supports (height: 100dvh)` [H] | SOFT |
| L11 | Max content width at 2560 | At 2560: max text-column width and container width (largest `main > section > *` content box) | Text column <= 75ch / 800 px; container <= 1600 px unless intentionally full-bleed media [H] | SOFT |
| L12 | Sibling alignment | For each row of repeated cards (same parent, same `top`): compare `top` of CTA/title/meta inside each card | max delta <= 1 px at widths where >= 3 columns [H] | SOFT |
| L13 | Sticky/fixed UI footprint | Sum height of fixed/sticky elements stuck to top and bottom at 375x640 | <= 25% of viewport height combined; <= 56 px mobile header [H] | SOFT |
| L14 | Horizontal scroll containers | Elements with `overflow-x: auto/scroll`: must have visible affordance and keyboard focusability (`tabindex=0` if no focusable children) | all pass [W 2.1.1 / axe `scrollable-region-focusable`] | HARD |

### 2.2 Images, video, fonts (`I*`, `F*`)

| ID | What | How | Threshold | Sev |
|---|---|---|---|---|
| I1 | Alt attribute present | `img:not([alt])`, also `[role=img]` without name, and filename-like alt (`/\.(png|jpe?g|webp|avif|svg)$|^img|^image|dsc_?\d+/i`) | 0 offenders [W 1.1.1] | HARD |
| I2 | Reserved space | For `img, video, iframe, canvas, svg:not([width])`: `getAttribute('width')&&getAttribute('height')` or computed `aspect-ratio != auto` or fixed CSS height | 100% have a reservation [W web.dev CLS] | HARD |
| I3 | LCP element is optimised | PerformanceObserver `largest-contentful-paint` (snippet P1) -> element; if `IMG`: `loading != lazy`, `fetchpriority == high`, `src/srcset` string present in raw response HTML (`await (await page.request.get(url)).text()`); if CSS background image: `<link rel=preload as=image>` present; if text: font preloaded | all true; at most 2 elements have `fetchpriority=high` [W web.dev] | HARD |
| I4 | Lazy-load correctness | For each `img`: `rect.top < innerHeight` (initial viewport at each of mobile/desktop) => `loading != lazy`; `rect.top > 1.5*innerHeight` => `loading == lazy` | above-fold lazy = 0; below-fold eager <= 2 [W/H] | HARD |
| I5 | Intrinsic vs rendered size | `img.currentSrc`, `naturalWidth`, `clientWidth`, `devicePixelRatio` | `naturalWidth >= clientWidth * min(DPR,2) * 0.9` (not soft) AND `naturalWidth <= clientWidth * 2 * 1.5` (not wasteful); SVG exempt [H] | SOFT |
| I6 | Format and bytes | Collect `response` events for `resourceType image`: content-type, `content-length`/body size | photos AVIF/WebP (JPEG/PNG photo > 100 KB flagged); hero <= 150 KB mobile / 250 KB desktop; any single image <= 400 KB [H] | SOFT |
| I7 | srcset/sizes sanity | `img[srcset*=" w"]` or `w` descriptors without `sizes` attr; `sizes` absent => browser assumes 100vw | every `w`-srcset image has `sizes` (or `sizes=auto` + lazy) [W] | SOFT |
| I8 | Image weight on initial load | Sum image transfer bytes before `load` event at mobile | <= 500 KB target, 1 MB hard (median mobile home page 911 KB) [H, median verified] | SOFT |
| I9 | Background/hero video | For each `video`: `muted`, `playsinline`, `loop` (if bg), `poster`, `preload` in (`none`,`metadata`), no audio track needed, byte size, is there a pause/play control reachable by keyboard, `reducedMotion=reduce` => `paused` or `display:none` | all attrs present; <= 2 MB mobile source; pause control present when autoplay > 5 s [W 2.2.2] | HARD |
| I10 | `object-fit` set where aspect box != image ratio | compare box ratio vs `naturalWidth/naturalHeight`; if differ by > 2% require `object-fit` != fill | 0 stretched images [H] | HARD |
| F1 | font-display | Parse `@font-face` rules (`document.styleSheets` / `CSSFontFaceRule`) | every rule has `font-display` in (swap, optional, fallback); body font prefers `optional` or has metric fallback (F4) [W web.dev] | HARD |
| F2 | Font budget | Distinct `font-family` values rendered (computed on visible text elements); font files by network (`font/woff2`) | <= 2 families (3 incl. mono), <= 4 woff2 files, <= 120 KB total, all WOFF2 [H; WOFF2 verified] | SOFT |
| F3 | Preload | `link[rel=preload][as=font]` count and `crossorigin` attribute | 1-2 preloads, all with `crossorigin`, matching a font actually used above the fold [W web.dev] | SOFT |
| F4 | Font-swap layout shift | Throttle font URLs by 1.5 s with `page.route`, collect layout-shift entries (P2) | CLS contribution from font swap <= 0.01; fallback `@font-face` with `size-adjust` present when `font-display: swap` [W web.dev] | HARD |
| F5 | Fonts actually loaded | `[...document.fonts].filter(f => f.status !== 'loaded')` after `fonts.ready`; failed font requests | 0 errors; every used family/weight `document.fonts.check('600 16px "Family"')` true [H] | HARD |
| F6 | Rendered family is the intended one | `getComputedStyle(body).fontFamily` first token vs token `--font-sans`; check heading font | matches system tokens [H] | HARD |

### 2.3 Performance, Core Web Vitals (`P*`)

Lab only; gate on thresholds. Run Lighthouse (CLI or node API, `--preset=perf`, mobile default) 3 times and take the median; also run the Playwright observers (below).

| ID | What | How | Threshold | Sev |
|---|---|---|---|---|
| P1 | LCP | `PerformanceObserver({type:'largest-contentful-paint', buffered:true})` last entry `startTime` (Playwright, CPU 4x, Slow-4G-like) and Lighthouse median | <= 2.5 s good, 2.5-4 s warn, > 4 s fail [W web.dev]. Desktop: <= 1.8 s target [H] | HARD |
| P2 | CLS | `layout-shift` entries with `!hadRecentInput`, session-window algorithm (max 5 s window, 1 s gap), after full scroll + 3 s idle | <= 0.1 hard [W]; target <= 0.05 [H] | HARD |
| P3 | TBT (INP proxy) | Lighthouse `total-blocking-time` | <= 200 ms good, > 600 ms fail [H] | HARD |
| P4 | INP (scripted) | Perform: open menu, toggle theme, accordion, submit invalid form, click CTA; read `PerformanceObserver({type:'event', durationThreshold:16, buffered:true})`; INP ~ worst (p98) `duration` | <= 200 ms good; > 500 ms fail [W] | HARD |
| P5 | Lighthouse categories | `lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --output=json` | perf >= 90, a11y = 100, best-practices >= 95, SEO >= 95 (performance weights: TBT 30, LCP 25, CLS 25, FCP 10, SI 10; INP not scored) [W docs, H gate] | SOFT |
| P6 | JavaScript weight | Sum compressed bytes (`content-encoding` aware, use `response.request().sizes()` -> `responseBodySize`) for `script` | <= 300 KB target, 500 KB hard (home-page median 632 KB mobile) [H, median verified] | SOFT |
| P7 | Page weight and requests | Same, all resource types at `load` | <= 1.5 MB / <= 60 requests target; 2.5 MB / 80 hard (median 2.56 MB, 75 requests mobile) [H, median verified] | SOFT |
| P8 | Render-blocking and third-party | Lighthouse `render-blocking-insight`; count of third-party origins and their main-thread time; sync `<script>` in `<head>` without `defer/async/module` | 0 sync head scripts; third-party origins <= 5; no third-party render-blocking CSS/JS [H] | SOFT |
| P9 | TTFB | `performance.getEntriesByType('navigation')[0].responseStart` | <= 800 ms good; > 1800 poor [H, standard web.dev numbers] | SOFT |
| P10 | DOM size | `document.getElementsByTagName('*').length`; max depth; max children per node | <= 1500 nodes, depth <= 32, <= 60 children per parent (Lighthouse warns far lower) [H] | SOFT |
| P11 | LCP subparts | From LCP entry: TTFB, resource load delay (`entry.startTime` relative resource `requestStart`), load duration, render delay | load delay < 10%, render delay < 10% of LCP [W web.dev guidance, percentages are relative guidance not hard budgets] | SOFT |
| P12 | Animations are compositor-only | `document.getAnimations()` -> `effect.getKeyframes()` property names; running transitions on layout properties (`width`,`height`,`top`,`left`,`margin`) | 0 infinite or scroll-linked animations on layout properties [W web.dev CLS, H] | SOFT |
| P13 | bfcache eligibility | No `unload` listener (`getEventListeners` via CDP `DOMDebugger.getEventListeners` on window); Lighthouse `bf-cache` | pass [W web.dev] | SOFT |

### 2.4 Accessibility, WCAG 2.2 AA (`A*`)

| ID | What | How | Threshold | Sev |
|---|---|---|---|---|
| A1 | axe-core scan | `new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze()`; run at 375 and 1440, light and dark, default and after each interactive component is opened (use `include()` + `waitFor`). Verify the `wcag22aa` tag exists in the installed axe-core version (Playwright docs list only 2a/2aa/21a/21aa) | `violations.length === 0`; `incomplete` items routed to A2 / manual list [W] | HARD |
| A2 | Contrast, all states | Snippet A2: for every visible text element compute fg/bg (walk ancestors, composite alpha); where `background-image`/gradient/video/`backdrop-filter` is involved, screenshot the element rect (text hidden via `color: transparent`) and use the worst-case pixel luminance; compute WCAG ratio; also for non-text: input borders, icons (`svg` fill/stroke), focus ring, button bg vs page bg | text >= 4.5; large (>= 24 px or >= 18.66 px & weight >= 700) >= 3; UI/graphics >= 3; in light, dark, and `:hover/:focus-visible/:active`; disabled exempt [W 1.4.3, 1.4.11] | HARD |
| A3 | Focus visible | Snippet A3: Tab through the page (`keyboard.press('Tab')`, up to focusable count + 5); for each focused element, record computed `outline`, `box-shadow`, `border` and a clipped screenshot vs unfocused; require `matches(':focus-visible')` | every stop: visible change; outline-width >= 2 px (or ring >= 2 px); contrast of indicator vs adjacent >= 3:1; pixel-diff area >= 2 px perimeter [W 2.4.7 AA, 2.4.13 AAA numbers, 1.4.11] | HARD |
| A4 | Tab order and traps | Same Tab walk: compare order to visual order (sort by `rect.top`, then `left` in LTR/`right` in RTL; allow row tolerance 8 px); check `tabindex > 0`; check that Tab N+1 returns to browser UI/first element (no trap); first stop is a skip link whose `href` target exists and moves focus | 0 positive tabindex; order inversion count 0 (or only intentional); skip link first; no trap [W 2.4.3, 2.1.2, 2.4.1] | HARD |
| A5 | Focus not obscured | At each Tab stop at 375 and 1440: `document.elementsFromPoint(cx, cy)[0]` must be the focused element or its descendant for at least one point of its rect (sample 5 points); fixed/sticky overlays included | focused rect not fully covered [W 2.4.11] | HARD |
| A6 | Landmarks | counts: `main`=1, `header`/`[role=banner]` top-level = 1, `footer` = 1, `nav` >= 1 with unique `aria-label` when > 1; all content inside a landmark (axe `region` rule) | pass [W 1.3.1, 2.4.1] | HARD |
| A7 | Heading outline | `h1` count == 1; sequence of levels never jumps down by > 1; no empty headings; headings not used for styling (heading text length <= 120) | pass [W 1.3.1, 2.4.6] | HARD |
| A8 | Link/button names and duplicates | Computed accessible name for each (`await locator.ariaSnapshot()` or `el.computedName` via CDP `Accessibility.getPartialAXTree`); names empty; group links by name: same name with different `href` | 0 empty; identical generic names ("Learn more", "Click here", "Read more") with different targets <= 1 unless context via `aria-label`/`aria-describedby` [W 2.4.4, WebAIM] | HARD / SOFT |
| A9 | Language | `html[lang]` valid BCP47; foreign spans have `lang` | valid [W 3.1.1] | HARD |
| A10 | Forms | per control: has `label[for]`/wrapping label/`aria-labelledby` (not only placeholder); `autocomplete` token on name/email/tel/address/cc fields; `required` programmatically + visible; computed `font-size >= 16 px`; submit with invalid data -> error element exists, text not colour-only, linked by `aria-describedby`, `aria-invalid="true"`, focus moves to first invalid or summary; no `onpaste` blocking | all pass [W 1.3.5, 3.3.1, 3.3.2, 3.3.3, 3.3.7, 3.3.8; 16 px = H] | HARD |
| A11 | Reduced motion | `emulateMedia({reducedMotion:'reduce'})`, reload; then `document.getAnimations({subtree:true})` filtered to `playState==='running'` and (`iterations===Infinity` or duration > 500 ms or not opacity-only); also check videos paused, `scroll-behavior` not smooth | 0 running decorative animations; `scroll-behavior: auto`; any scroll-driven/view-transition animation absent [W web.dev] | HARD |
| A12 | Pause/stop for auto-motion | Any animation/video/carousel that runs > 5 s without interaction: find a focusable control with accessible name matching /pause|stop|play/i | control present [W 2.2.2] | HARD |
| A13 | Zoom, text spacing, reflow | (a) set `html{font-size:200%}` (only valid if root rem-based) -> L1, L2 pass and computed `h1` font-size >= 1.9x baseline; (b) inject 1.4.12 CSS: `*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p{margin-bottom:2em!important}` -> L1, L2, overlap check (text rect intersection between siblings); (c) 320x640 viewport -> L1 | no clipping, no overlap, no horizontal scroll, no hidden controls [W 1.4.4, 1.4.10, 1.4.12] | HARD |
| A14 | Zoom locks | `meta viewport` (L8), `touch-action: none` on body, `user-select: none` on content | none [W] | HARD |
| A15 | Dialog, menu, disclosure keyboard contract | Script per component: (1) focus trigger, press Enter/Space; assert `aria-expanded="true"` (disclosure) or dialog `[open]`/`:popover-open`; (2) focus moved inside; (3) Tab x N stays inside modal; (4) Esc closes; (5) focus returns to trigger; (6) background has `inert` or is unreachable by Tab while modal open; (7) dialog has accessible name; (8) no `role=menu|menubar` in site `nav`; (9) popup rect within viewport at 320 px | all pass [W APG, Roselli] | HARD |
| A16 | Icon/graphics semantics | Icon-only buttons have name; decorative SVG `aria-hidden=true`; informative SVG has `role=img`+name; no `title` as sole name | pass [W 1.1.1, 4.1.2] | HARD |
| A17 | Links distinguishable | Inline links in body text: underline or other non-colour cue; if colour only, contrast vs surrounding text >= 3:1 AND a non-colour cue on hover/focus | pass [W 1.4.1] | HARD |
| A18 | Forced colors / high contrast | `emulateMedia({forcedColors:'active'})` + `{contrast:'more'}` screenshots; check borders on interactive elements computed `border-style != none` or `outline` | no interactive element invisible (compare element region pixels to background) [H] | SOFT |
| A19 | Media alternatives | `video` with audio: `track[kind=captions]`; `audio`/autoplay audio: none | pass [W 1.2.2, 1.4.2] | HARD |
| A20 | ARIA hygiene | axe `aria-*` rules; count of `aria-*` attributes per element > 6 flagged; `aria-hidden` on focusable; redundant roles (`nav role=navigation`); ARIA used where native exists (`div[role=button]`) | 0 invalid; native-first list empty [W / H] | HARD |
| A21 | Page title and landmarks to SEO | `document.title` non-empty, unique across pages | pass [W 2.4.2] | HARD |
| A22 | Accessibility tree snapshot | `await expect(page.locator('main')).toMatchAriaSnapshot(...)` golden file per page | no unexpected diffs between runs [H, Playwright verified] | SOFT |
| A23 | Consistent help (multi-page) | Help/contact link in same relative order across pages | pass [W 3.2.6] | SOFT |
| A24 | Dragging alternative | Any `draggable`/slider-like control has click/keyboard alternative | pass [W 2.5.7] | HARD |

### 2.5 States and themes (`S*`)

| ID | What | How | Threshold | Sev |
|---|---|---|---|---|
| S1 | State matrix | For each interactive element class (group by tag+role+class signature): capture computed `color, backgroundColor, borderColor, boxShadow, outline, transform, opacity, textDecoration, cursor` in default, `hover` (`locator.hover()`), `focus-visible` (Tab), `active` (`mouse.down()` then capture), `disabled` (`[disabled]`, `[aria-disabled]`); diff vs default | hover differs from default in >= 1 visual property by perceptible amount (ΔE in OKLab >= 0.02 or shadow/transform change); active differs from hover; focus-visible differs (A3); disabled has `cursor not-allowed` or `pointer-events:none`+lower contrast and native `disabled` attr; loading variant has `aria-busy` and fixed width (no shift) [H] | HARD |
| S2 | Cursor affordance | `cursor` of every clickable non-anchor (`button, [role=button], summary, label[for], [onclick]`) | `pointer` (Tailwind v4 default for `button` is `default`: must be overridden) [H, TW verified] | SOFT |
| S3 | Transition hygiene | `transition-property` of interactive elements; durations | not `all`; durations 100-350 ms; overlay enter 200-350 ms; no `ease-in` on enter; no transition on layout properties [H] | HARD |
| S4 | Hover-only content | Emulate `hasTouch:true, isMobile:true` (no hover); compare set of visible interactive elements/text vs desktop hover-triggered set (hover each `[class*=group]`/menu trigger on desktop and diff) | everything revealed by hover is also reachable by tap/focus [W 1.4.13 / H] | HARD |
| S5 | Empty/loading/error fixtures | Re-render with fixtures (`?state=empty|loading|error|long`) or intercept API with `page.route` | each state has designed UI (not blank, not raw error), skeleton dimensions match final (CLS 0) [H] | SOFT |
| S6 | Dark mode correctness | `emulateMedia({colorScheme:'dark'})`; (a) `getComputedStyle(documentElement).colorScheme` includes `dark`; (b) first paint colour: capture screenshot at `DOMContentLoaded` (`page.on('domcontentloaded')`) and assert body bg luminance < 0.2; (c) rerun A1, A2, L1; (d) `meta[name=color-scheme]` present; (e) images/logos: any `img` with `luminance(bg) - luminance(dominant)` contrast < 3 flagged for review | pass; no pure #fff text on pure #000 (flag L>0.97 on L<0.03) [H] | HARD |
| S7 | Text stress (i18n) | (a) pseudo-localise: lengthen every text node by 40% (append an accented copy of its first 40%, see snippet S7); (b) inject 40-char unbroken token ("Donaudampfschifffahrtsgesellschaftskapitän") into h1, h2, button, card title, nav item; (c) `document.documentElement.dir='rtl'`; (d) very short text (1 char) in buttons and tags | After each: L1, L2, A13-overlap pass; RTL: first nav item rightmost and no left-only paddings; buttons keep >= 44 px height (min) [H] | HARD |
| S8 | Stacking sanity | Computed `z-index` values > 1000 or > 10 distinct levels; elements covering viewport center unintentionally (`elementFromPoint` at 5 grid points not overlay/dialog) after load | scale <= 10 levels; no unintended covering overlay [H] | SOFT |
| S9 | No content gated on scroll animation | With `@supports (animation-timeline: scroll())` forced false (Firefox run) and with reduced motion: all `[data-reveal], .reveal` and sections have `opacity > 0.99` and `visibility visible` | pass [H] | HARD |
| S10 | Sticky-hover / active feedback on touch | tap each primary button; verify `:active` style change (S1 active) and no persistent hover colour after `touchend` | pass [H] | SOFT |

### 2.6 Hygiene, SEO hand-off, design-system adherence (`H*`)

| ID | What | How | Threshold | Sev |
|---|---|---|---|---|
| H1 | Console and network clean | `page.on('console')` error/warning (hydration warnings included), `page.on('pageerror')`, `page.on('requestfailed')`, responses >= 400, `http:` subresources on https | 0 errors, 0 failed/4xx/5xx, 0 mixed content [H] | HARD |
| H2 | Cumulative console noise | warnings count | <= 3 (deprecation, third-party excluded with allowlist) [H] | SOFT |
| H3 | Meta and OG (hand-off) | `title` (one), `meta[name=description]`, `link[rel=canonical]` absolute, `meta[property^=og:]` (title, description, image absolute HTTPS, url, type), `twitter:card`, `og:image` natural size 1200x630 (ratio 1.91), `link[rel~=icon]` + apple-touch-icon, `script[type="application/ld+json"]` parses, `hreflang` set, `meta[name=robots]` not `noindex` unless intended | all present and valid; title 50-60 chars and description 120-160 chars as display heuristics [H] | SOFT (HAND-OFF) |
| H4 | Links | all `a[href]`: no `#` or `javascript:`; internal links 200 (HEAD); external `target=_blank` have `rel=noopener` (implicit in modern browsers but explicit is safe); `tel:`/`mailto:` valid | 0 broken, 0 placeholder [H] | HARD |
| H5 | Placeholder content | regex over `body.innerText`: `/lorem ipsum|dolor sit|TODO|TBD|FIXME|placeholder|your (company|text) here|xxx/i`; images named `placeholder`; `src` containing `unsplash.com/random` | 0 matches [H] | HARD |
| H6 | CSS hygiene scan | static over authored CSS + computed: `!important` count; physical properties (`margin-left|right`, `padding-left|right`, `left|right:`, `text-align:left|right`) count; `outline:\s*(none|0)` without `:focus-visible` replacement; `transition:\s*all`; `100vh`; v3-only Tailwind class names (`shadow-sm` flagged for review, `bg-gradient-to-`, `flex-shrink-`, `bg-opacity-`, `outline-none`, `overflow-ellipsis`); limited-tier features outside `@supports` (`animation-timeline`, `interpolate-size`, `calc-size(`, `if(`, `@function`, `corner-shape`, `reading-flow`, `interestfor`, `popover=hint`, cross-doc `@view-transition`) | `!important` <= 3; physical props 0 (intentional list excepted); no focus removal; no `transition: all`; no limited-tier outside guard [H, BCD verified] | SOFT |
| H7 | Token adherence | Collect computed `margin/padding/gap/row-gap/column-gap` px values, `font-size`, `border-radius`, `color/background-color` over all visible elements | >= 90% of spacing values multiples of 4 px (or in token list); <= 8 distinct font sizes (excluding fluid intermediate values: compare at fixed widths); <= 4 distinct radii; <= 12 distinct text/bg colours [H] | SOFT |
| H8 | Z-index/fixed overlap with CTA | rect intersection of fixed elements with primary CTA at 375 | none | SOFT |
| H9 | Print / no-JS (optional) | Disable JS (`javaScriptEnabled:false`): main content and nav links visible; `<noscript>` fallback for critical media | content visible [H] | SOFT |
| H11 | Product-UI consistency (implemented in `tools/check.mjs`, 2026-10-15) | Visible single-line fields (`input` minus checkbox/radio/range/file/hidden/color, `select`, `[role=combobox]`, `button[aria-haspopup=listbox]`; capsules exempt): distinct rendered heights (0.5px) and distinct `border-top-left-radius` (textareas count for radius only). Enabled clickables (`button, a[href], [role=button|tab|option|menuitem], summary, select`): `scrollWidth > clientWidth + 1` with text = clipped label, ellipsis without `title`; computed `cursor !== 'pointer'`. Text-bearing elements: distinct computed `font-weight` | `ui.field-heights` 1, `ui.field-radii` 1, `ui.clipped-labels` 0, `ui.pointer-cursor` 0 (all WARN); `type.weight-count` info (product UI target 2, e.g. 450/500; sizes via `type.size-count`, product target 12/14/18) [H, founder 2026-10-14/15] | SOFT |
| H10 | Security-adjacent | `target=_blank` + no noopener, inline event handlers, `document.write`, passwords in URL | 0 [H] | SOFT |

---

## 3. Snippets (Playwright, TypeScript/JS)

### L1 overflow + culprits
```js
const overflow = await page.evaluate(() => {
  const de = document.documentElement, vw = de.clientWidth;
  const clipped = el => { // inside a scroller/clip? then horizontal overflow is legitimate
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const o = getComputedStyle(p);
      if (/(auto|scroll|hidden|clip)/.test(o.overflowX) && p.getBoundingClientRect().right <= vw + 1) return true;
    }
    return false;
  };
  const culprits = [...document.body.querySelectorAll('*')].filter(el => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (!r.width || cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return false;
    return (r.right > vw + 1 || r.left < -1) && !clipped(el);
  }).slice(0, 15).map(el => ({ el: el.tagName + (el.className ? '.' + String(el.className).split(' ')[0] : ''), left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right) }));
  return { scrollWidth: de.scrollWidth, clientWidth: vw, culprits };
});
expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
expect(overflow.culprits).toEqual([]);
```

### L7 target size (24 px AA with spacing circle)
```js
const targets = await page.evaluate(() => {
  const sel = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=menuitem],[role=switch],[role=checkbox],[role=radio],[tabindex]:not([tabindex="-1"])';
  const vis = el => { const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[inert],[hidden]'); };
  const isInline = el => el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p,li,span,td,dd,label');
  const items = [...document.querySelectorAll(sel)].filter(vis).map(el => ({ el, r: el.getBoundingClientRect(), inline: !!isInline(el) }));
  const circle = r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2, rad: 12 });
  const distToRect = (c, r) => { const dx = Math.max(r.left - c.x, 0, c.x - r.right), dy = Math.max(r.top - c.y, 0, c.y - r.bottom); return Math.hypot(dx, dy); };
  const small = items.filter(i => (i.r.width < 24 || i.r.height < 24) && !i.inline);
  return small.map(i => {
    const c = circle(i.r);
    const clash = items.some(o => o !== i && (
      (o.r.width >= 24 && o.r.height >= 24 || o.inline) ? distToRect(c, o.r) < 12
                                                       : Math.hypot(c.x - circle(o.r).x, c.y - circle(o.r).y) < 24));
    return clash ? { tag: i.el.tagName, text: (i.el.textContent || i.el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(i.r.width), h: Math.round(i.r.height) } : null;
  }).filter(Boolean);
});
expect(targets).toEqual([]);
```
Notes: the equivalent-control, user-agent-control, and essential exceptions need manual allowlist (`data-allow-small-target`). Inline-in-paragraph exemption follows WCAG (links in a sentence).

### P1/P2 LCP and CLS (Chromium)
```js
await page.addInitScript(() => {
  window.__v = { lcp: null, cls: 0, windows: [], inp: 0 };
  new PerformanceObserver(l => { const e = l.getEntries().at(-1);
    window.__v.lcp = { t: e.startTime, url: e.url, tag: e.element && e.element.tagName, size: e.size, id: e.id }; })
    .observe({ type: 'largest-contentful-paint', buffered: true });
  let cur = 0, first = 0, last = 0, max = 0;
  new PerformanceObserver(l => { for (const e of l.getEntries()) {
    if (e.hadRecentInput) continue;
    if (cur && e.startTime - last < 1000 && e.startTime - first < 5000) { cur += e.value; }
    else { cur = e.value; first = e.startTime; }
    last = e.startTime; max = Math.max(max, cur); window.__v.cls = max; } })
    .observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (e.interactionId) window.__v.inp = Math.max(window.__v.inp, e.duration); })
    .observe({ type: 'event', durationThreshold: 16, buffered: true });
});
// throttle (Chromium CDP)
const cdp = await page.context().newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
await page.goto(url, { waitUntil: 'load' });
await prepare(page);          // scroll full page
await page.waitForTimeout(3000);
const v = await page.evaluate(() => window.__v);
expect(v.lcp.t).toBeLessThanOrEqual(2500);
expect(v.cls).toBeLessThanOrEqual(0.1);
```
Caveat: simple event-duration max is an INP approximation (INP is ~p98 over all interactions; with few scripted interactions the worst one is used).

### A1 axe
```js
import AxeBuilder from '@axe-core/playwright';
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'])
  .analyze();
expect(results.violations.map(v => ({ id: v.id, n: v.nodes.length, t: v.nodes[0].target }))).toEqual([]);
// keep results.incomplete: feed color-contrast incompletes to A2 (image/gradient backgrounds)
```

### A3 + A4 + A5 keyboard walk
```js
const stops = [];
await page.evaluate(() => document.activeElement && document.activeElement.blur());
const n = await page.locator('a[href],button,input,select,textarea,summary,[tabindex]').count();
for (let i = 0; i < n + 5; i++) {
  await page.keyboard.press('Tab');
  const s = await page.evaluate(() => {
    const el = document.activeElement; if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    const cx = Math.min(Math.max(r.left + r.width / 2, 0), innerWidth - 1), cy = Math.min(Math.max(r.top + r.height / 2, 0), innerHeight - 1);
    const top = document.elementFromPoint(cx, cy);
    return { tag: el.tagName, id: el.id, tabindex: el.getAttribute('tabindex'), focusVisible: el.matches(':focus-visible'),
      outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, shadow: cs.boxShadow,
      top: r.top, left: r.left, obscured: !(top === el || el.contains(top)), inViewport: r.bottom > 0 && r.top < innerHeight };
  });
  if (!s) break; stops.push(s);
}
// A3: each stop has focusVisible true and (outline-style != none && width >= 2px) or box-shadow != 'none' (then verify via screenshot diff)
// A4: no tabindex > 0; reading order: check monotonic top (tolerance 8 px) within same column
// A5: obscured === false for every stop that is inViewport
```
For stronger A3: screenshot `locator.screenshot()` before focus and after `keyboard Tab`, assert pixel-diff area >= perimeter * 2 px, and measure contrast of the changed pixels vs unfocused pixels >= 3:1.

### A2 contrast helper (text, solid backgrounds; fall back to pixel sampling when `background-image` exists)
```js
const lum = ([r,g,b]) => { const f = c => { c/=255; return c <= .03928 ? c/12.92 : ((c+.055)/1.055)**2.4; }; return .2126*f(r)+.7152*f(g)+.0722*f(b); };
const ratio = (a,b) => { const [x,y] = [lum(a),lum(b)].sort((p,q)=>q-p); return (x+.05)/(y+.05); };
// in page: parse computed rgba, composite over ancestors' backgrounds until alpha=1, else (image/gradient/video) => return {needsSampling:true, rect}
// large text rule: fontSize >= 24px, or fontSize >= 18.66px && fontWeight >= 700 -> need 3, else 4.5
```
Pixel sampling: set `color: transparent !important; text-shadow: none` on the element (and descendants), screenshot its rect, take the darkest and lightest 5th/95th percentile luminance as worst-case background; compute ratio against the text colour.

### A11 reduced motion
```js
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.reload(); await prepare(page);
const running = await page.evaluate(() => document.getAnimations({ subtree: true })
  .filter(a => a.playState === 'running')
  .map(a => ({ target: a.effect?.target?.tagName, prop: a.effect?.getKeyframes?.().flatMap(k => Object.keys(k)).filter(k => !['offset','easing','composite','computedOffset'].includes(k)),
               dur: a.effect?.getComputedTiming?.().duration, iter: a.effect?.getComputedTiming?.().iterations })));
// fail if any: iter === Infinity (unless it is a spinner marked [role=progressbar]/[aria-busy]), or prop includes transform/translate/scale and dur > 300 ms and not user-initiated
const videos = await page.$$eval('video', vs => vs.map(v => ({ paused: v.paused, autoplay: v.autoplay })));
```

### A15 dialog contract (per dialog trigger)
```js
const trigger = page.getByRole('button', { name: /menu|open|contact/i }).first();
await trigger.focus(); await page.keyboard.press('Enter');
const dlg = page.locator('dialog[open], [role=dialog]:visible, [popover]:popover-open').first();
await expect(dlg).toBeVisible();
await expect(dlg).toHaveAccessibleName(/.+/);
expect(await page.evaluate(() => document.activeElement.closest('dialog,[role=dialog],[popover]') !== null)).toBe(true);
for (let i = 0; i < 12; i++) { await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement.closest('dialog,[role=dialog],[popover]'))).toBe(true); } // modal only
await page.keyboard.press('Escape');
await expect(dlg).toBeHidden();
await expect(trigger).toBeFocused();
```

### S1 state matrix capture
```js
const props = ['color','backgroundColor','borderTopColor','boxShadow','outlineColor','outlineWidth','transform','opacity','textDecorationLine','cursor'];
const snap = el => el.evaluate((n, props) => { const cs = getComputedStyle(n); return Object.fromEntries(props.map(p => [p, cs[p]])); }, props);
const base = await snap(btn);
await btn.hover(); const hover = await snap(btn);
await page.mouse.down(); const active = await snap(btn); await page.mouse.up();
await page.keyboard.press('Tab'); /* ensure focus-visible */ const focus = await snap(btn);
// assert diff(base,hover) non-empty; diff(hover,active) non-empty; diff(base,focus) has outline or shadow
```
(`transition` may delay computed values: `await page.waitForTimeout(350)` before each snapshot, or set `* { transition-duration: 0s !important }` for the capture run only.)

### S7 stress injection
```js
await page.evaluate(() => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; while (w.nextNode()) if (w.currentNode.nodeValue.trim().length > 2 && !w.currentNode.parentElement.closest('script,style,noscript')) nodes.push(w.currentNode);
  for (const n of nodes) { const t = n.nodeValue; n.nodeValue = t + ' ' + t.slice(0, Math.ceil(t.length * 0.4)).replace(/[aeiou]/gi, c => ({a:'á',e:'é',i:'í',o:'ó',u:'ú'}[c.toLowerCase()])); }
  const long = 'Donaudampfschifffahrtsgesellschaftskapitän';
  for (const el of document.querySelectorAll('h1,h2,h3,button,[class*=card] h3,nav a')) el.textContent = long + ' ' + el.textContent;
});
// then run L1, L2, A13-overlap; then set <html dir="rtl"> and run L1 again
```

### Overlap check (A13b/S7)
```js
// sibling text blocks: for each pair of elements with direct text in the same stacking context whose rects intersect by > 2px in both axes and neither contains the other => overlap
```

---

## 4. Suggested execution order in the tool

1. Static: parse HTML + authored CSS (`H5`, `H6`, `L8`, `L10`, `F1`, `H3`, `I1`, `I7`).
2. Chromium load at mobile 390 and desktop 1440: collect network (`I6`, `I8`, `P6`, `P7`, `H1`, `F2`, `F3`), `prepare`, LCP/CLS (`P1`, `P2`, `I3`, `I4`).
3. Viewport sweep (all widths): `L1`, `L2`, `L3`, `L5`, `L11`, `L12`, `L9`.
4. Keyboard and interaction pass: `A3`, `A4`, `A5`, `A15`, `P4`, `S1`, `S3`, `S4`, `S10`.
5. Preference passes: dark (`S6`, `A1`, `A2`), reduced motion (`A11`, `A12`, `S9`), forced colours/contrast (`A18`).
6. Stress passes: `S7`, `A13`.
7. axe + custom contrast: `A1`, `A2`, `A20` (light and dark, 375 and 1440, after opening components).
8. Lighthouse x3 median (`P3`, `P5`, `P8`, `P9`, `P11`, `P13`).
9. Cross-engine (WebKit + Firefox): `L1`, `L2`, `F5`, `A1`, `S9` (scroll-timeline off), screenshots for diff.
10. Manual gate (not automatable): VoiceOver+Safari and NVDA+Firefox on the primary conversion path; real-device iOS Safari check of `100svh`, input zoom, autoplay video, `backdrop-filter`.

## 5. Output contract (suggestion)

Per assertion: `{id, severity, status: pass|warn|fail, viewport, theme, measured, threshold, selector, screenshotPath, ruleRef}`; aggregate score = HARD fails (blocking) then SOFT warnings; pass `incomplete` items from axe forward as manual-review tasks. Write results into the ledger entry for the design iteration.

## 6. Known limits of the assertions

- Lab metrics (LCP/CLS/TBT/INP) are regression guards; field data at p75 is the truth (web.dev). Do not tune a design to a single lab number.
- Automated a11y checks cover a subset of WCAG; Playwright's own docs say to combine with manual assessment and user testing. No percentage-coverage figure was verified.
- `L7` implements the circle test approximately and cannot detect "equivalent control elsewhere" or "essential" exceptions.
- `A2` pixel sampling is worst-case; it can over-flag text on busy photographic backgrounds (that is usually the right call, but surface it as "needs design review", not an auto-fail, when the text has a scrim).
- WebKit and Firefox cannot report CLS or long animation frames (MDN BCD 2026-10-08); run `P*` in Chromium only.
- Thresholds marked `[H]` are engine heuristics (budgets for JS/total bytes, image bytes, chars per line, state-diff sensitivity); tune them in `system/` after the first ledger cycles.
