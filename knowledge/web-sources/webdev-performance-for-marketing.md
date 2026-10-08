---
source: web:https://web.dev/articles (lcp, cls, inp, vitals, defining-core-web-vitals-thresholds, optimize-lcp, optimize-cls, optimize-inp, fetch-priority, font-best-practices, browser-level-image-lazy-loading, lcp-lazy-loading, bfcache, ttfb, fcp, optimize-long-tasks, dom-size-and-interactivity, script-evaluation-and-long-tasks, preconnect-and-dns-prefetch, third-party articles, performance-budgets-101, animations-guide, aspect-ratio, http-cache, compression, vitals tools, RUM) + developer.chrome.com Lighthouse scoring and prerender
chapter: web.dev performance guidance for marketing sites: LCP, CLS, INP and the supporting mechanics
pages: n/a
topic_tags: [performance, core-web-vitals, lcp, cls, inp, ttfb, fcp, fetchpriority, preload, preconnect, fonts, font-display, lazy-loading, bfcache, long-tasks, third-party, caching, compression, speculation-rules, lighthouse, budgets, rum]
status: studied
---

# web.dev performance for marketing pages: LCP, CLS, INP

Fetched 2026-10-08 (raw HTML and text in `corpus/web/webdev-css/`, private). Page stamps seen: optimize-lcp last updated 2025-03-31, optimize-cls 2025-02-07, optimize-inp 2025-09-02; bfcache page mentions Chrome 149 behaviour (current). Text is CC BY 4.0; notes are paraphrase.

Pages read in full or mostly: optimize-lcp, optimize-cls, optimize-inp, fetch-priority, font-best-practices, lcp-lazy-loading, browser-level lazy loading, aspect-ratio, animations-guide, performance-budgets-101, Lighthouse performance scoring. Read for key rules and numbers only (extracted via keyword scan, not line by line): lcp, cls, inp, vitals, defining-core-web-vitals-thresholds, ttfb, fcp, bfcache, optimize-long-tasks, dom-size-and-interactivity, preload-responsive-images, preconnect-and-dns-prefetch, iframe lazy loading, replace-gifs-with-videos, third-party JS articles, script-evaluation-and-long-tasks, reduce-javascript-payloads, text compression, http-cache, prerender (speculation rules), RUM best practice, vitals-tools, optimize-vitals-lighthouse. Not found: `web.dev/articles/lcp-image`, `render-blocking-resources`, `non-composited-animations` (404 at guessed URLs).

Companion notes: `../web/implementation-craft.md` sections 2.4-2.6 (budgets and assertion IDs `P1-P7`, `I2-I9`, `F1-F5`), `webdev-forms-and-images.md` (image rules WIMG), `chrome-css-ui-new-apis.md` (view transitions and scroll-driven animations performance).

Evidence: **[verified-C156]** = executed in Chromium 156.0.8078.4 with Playwright on 2026-10-08 (`corpus/web/webdev-css/_tests/vitals.mjs`, "PASS"). Lab only, mobile viewport 390x844 DPR 2, no CPU throttling. **[source]** stated by the page. **[engine note]** mine.

---

## 1. Core ideas

1. **Three metrics, one rule: the 75th percentile of real visits, mobile and desktop separately, must be "good".** LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 (poor: > 4.0 s, > 500 ms, > 0.25). The same thresholds apply to every device because users' expectations do not depend on device. Lab tools (Lighthouse, a headless Playwright run) are for diagnosis and regression guards only.
2. **LCP is four sequential parts, and fixing one often only moves time into the next.** Time to first byte about 40%, resource load delay under 10%, resource load duration about 40%, element render delay under 10%. The two "delay" parts should be near zero; the rest of the time belongs to the HTML and the LCP resource.
3. **The biggest levers are discovery and priority.** The LCP image must be in the initial HTML (`<img src/srcset>`), not lazy, with `fetchpriority="high"`. Starting the LCP resource at the same time as the first resource is the practical target.
4. **Layout shift is mostly missing dimensions, late content, animations on layout properties and font swap.** Reserve space, overlay instead of push, animate `transform`, and neutralise font swap with `font-display` and metric-adjusted fallbacks.
5. **Interactivity is the main thread.** Tasks over 50 ms block input; yield, split scripts (about 100 KB per script), keep the DOM small (Lighthouse warns at about 800 nodes, errors at 1,400), and defer third-party code.
6. **Caching and compression are free wins:** fingerprinted assets with one-year `max-age`, HTML with `no-cache` revalidation, Brotli or gzip for text (65-86% savings on common libraries), and pages that stay bfcache-eligible.
7. **Most gains regress within months** (Google research cited by the tooling guide). Budgets in CI and field monitoring are what keep a launch-day score.
8. **Marketing pages have a special risk profile:** one dominant hero element, many third-party tags (analytics, A/B, chat), cookie banners, and embeds. These produce the characteristic failures: lazy-loaded hero, hidden-by-A/B hero, late banner pushing content, web-font swap in the headline.

---

## 2. Rules (`WPERF-nn`)

### 2.1 Targets and measurement

- **RULE [WPERF-01]** Gate on these numbers at the 75th percentile: LCP <= 2.5 s (poor > 4.0 s), INP <= 200 ms (poor > 500 ms), CLS <= 0.1 (poor > 0.25), FCP <= 1.8 s (poor > 3.0 s), TTFB <= 0.8 s (poor > 1.8 s); report mobile and desktop separately; a page passes only if all three Core Web Vitals pass.
  **Why** 75th percentile means three of four visits are at least that good while limiting outlier noise; the LCP threshold was chosen so at least 10% of origins can reach "good". The TTFB and FCP figures were unverified in the craft note and are now confirmed by the TTFB and FCP articles.
  **Applies to** all. **Check** thresholds table in tooling: `P1` LCP, `P2` CLS, `P4` INP; add FCP/TTFB as soft checks (TTFB measured from `performance.getEntriesByType('navigation')[0].responseStart`). **Source** https://web.dev/articles/vitals, https://web.dev/articles/ttfb, https://web.dev/articles/fcp, https://web.dev/articles/defining-core-web-vitals-thresholds

- **RULE [WPERF-02]** Measure LCP in the lab with a `largest-contentful-paint` PerformanceObserver and report the **last** entry; break it into the four subparts from navigation and resource timing; treat the percentages as relative guides, not absolute budgets.
  **Why** Many LCP entries are dispatched as larger elements render; the subparts do not overlap and sum to LCP. [verified-C156: for a 390x200 hero the harness found IMG as LCP at 412-424 ms with subparts ttfb 1-3, loadDelay 2-5, loadDuration ~405, renderDelay 3-8, summing to the LCP within 15 ms.] Images with very low bits-per-pixel (a 1x1 or flat PNG) are not LCP candidates; test fixtures need real image data (the first harness run with a flat 1x1 PNG reported the paragraph as LCP). `<video>` without `poster` is not an LCP candidate. [engine note + source]
  **Applies to** all. **Check** assertion `P1` helper below; flag when `loadDelay + renderDelay > 20%` of LCP. **Source** https://web.dev/articles/optimize-lcp

- **RULE [WPERF-03]** Measure CLS as session windows (gap < 1 s between shifts, window <= 5 s, largest window wins), ignore shifts within 500 ms of user input, and score each shift as impact fraction x distance fraction (for example 0.75 x 0.25 = 0.1875).
  **Why** This is the definition CrUX uses; lab load-only CLS undercounts post-load shifts (lazy content, banners, SPA transitions longer than 500 ms).
  **Applies to** all. **Check** `P2`: observe `layout-shift` entries with `hadRecentInput === false` over load plus a scripted full-page scroll; assert <= 0.1 (target 0.05). [verified-C156: reserved image 0; image without dimensions 0.027; banner prepended after 600 ms 0.053; fixed overlay banner 0.] **Source** https://web.dev/articles/cls, https://web.dev/articles/optimize-cls

- **RULE [WPERF-04]** INP is the worst qualifying interaction of the visit (one outlier ignored per 50 interactions, p98 style); lab proxy is Total Blocking Time (TBT <= 200 ms) plus scripted interactions measured with Event Timing; Event Timing ignores entries under 104 ms by default (use `durationThreshold`, minimum 16 ms).
  **Why** Lighthouse cannot produce INP (no real input); TBT correlates. Interactions inside iframes count towards INP but not in the page's own entries.
  **Applies to** all. **Check** `P3` TBT, `P4` scripted click timing on nav toggle, FAQ accordion, form field focus; observer with `durationThreshold:16`. **Source** https://web.dev/articles/inp, https://web.dev/articles/optimize-inp

- **RULE [WPERF-05]** Use field data to decide what to fix (CrUX via PageSpeed Insights, or RUM with the `web-vitals` library), then reproduce in the lab; prefer URL-level data to origin-level; CrUX is a rolling 28-day window, so it will not show a fix quickly. Report metrics on `visibilitychange` and reset them after a bfcache restore.
  **Why** Lab and field disagree (post-load CLS, real devices, third-party variance).
  **Applies to** all. **Check** project hand-off checklist: RUM snippet installed; budget alerts. **Source** https://web.dev/articles/vitals-tools, https://web.dev/articles/vitals-field-measurement-best-practices

- **RULE [WPERF-06]** Treat the Lighthouse score as a diagnostic: Performance = weighted metrics (Lighthouse 10 table: FCP 10%, Speed Index 10%, LCP 25%, TBT 30%, CLS 25%; Lighthouse 8 also had TTI 10% with CLS 15%); target 90+ (green 90-100, orange 50-89, red 0-49); 99 to 100 costs as much as 90 to 94; default run simulates a mid-tier phone on slow 4G; scores fluctuate with ads, A/B tests, extensions and hardware.
  **Why** Curve control points come from HTTP Archive percentiles (25th percentile = 50, 8th = 90); metric scores are what count, not opportunities.
  **Applies to** all. **Check** `P5`: mobile Performance >= 90; run 3 times and take the median [engine note]. **Source** https://developer.chrome.com/docs/lighthouse/performance/performance-scoring

### 2.2 LCP

- **RULE [WPERF-07]** Make the LCP resource discoverable in the initial HTML: an `<img>` with real `src`/`srcset` (not `data-src`, not inserted by JS), or for a CSS background / font a `<link rel="preload">` with `fetchpriority="high"`. The LCP resource should start loading no later than the first resource on the page.
  **Why** The preload scanner can only find what is in the markup; late discovery is the largest avoidable delay.
  **Applies to** landing page. **Check** `I3`: raw HTML (curl) contains the LCP `<img src>`; Resource Timing `startTime` of the LCP resource <= `startTime` of the first stylesheet + 100 ms. **Source** https://web.dev/articles/optimize-lcp

- **RULE [WPERF-08]** Set `fetchpriority="high"` on the LCP image only (at most one or two images), `fetchpriority="low"` on hidden or off-screen early images (carousel slides after the first), and preload responsive hero images with `imagesrcset`/`imagesizes` plus `fetchpriority`.
  **Why** Images start at Low priority and get boosted after layout; Chrome promotes the first five large images to Medium. A test on Google Flights improved LCP from 2.6 s to 1.9 s (0.7 s). Too many "high" images erase the benefit. Support: Chrome 102, Firefox 132, Safari 17.2.
  **Applies to** landing page. **Check** `document.querySelectorAll('[fetchpriority=high]').length <= 2`; LCP element has it. **Source** https://web.dev/articles/fetch-priority and https://web.dev/articles/preload-responsive-images

- **RULE [WPERF-09]** Never lazy-load the LCP image or any above-the-fold image; lazy-load the rest.
  **Why** Lazy loading waits for layout. Field data: median p75 LCP was 2.92 s for pages without browser lazy loading and 3.55 s with it; a WordPress A/B test found disabling it improved archive-page LCP by 13% (desktop) and 15% (mobile) while single pages were neutral. Overuse hurts; correct use helps bytes.
  **Applies to** all. **Check** `I3`/`I4`. **Source** https://web.dev/articles/lcp-lazy-loading and https://web.dev/articles/optimize-lcp

- **RULE [WPERF-10]** Remove element render delay: keep the render-blocking CSS smaller than the LCP image or inline critical CSS (inline only small CSS, since inlined bytes cannot be cached); no synchronous `<script>` in `<head>` (use `defer`/`async` or a tiny inline script); do not hide the hero with an anti-flicker/A-B snippet; server-render or pre-render the HTML.
  **Why** All browsers render images on the main thread; blocking CSS, JS, long tasks and client-side-only markup delay paint after the bytes arrived.
  **Applies to** landing page. **Check** Playwright: scripts in `<head>` without `async|defer|type=module` = 0 (soft); `renderDelay <= 10%` of LCP; hero text/image present in the raw HTML. **Source** https://web.dev/articles/optimize-lcp

- **RULE [WPERF-11]** Reduce load duration: right-size images (see WIMG), use an image CDN or a proxy on the HTML origin, avoid bandwidth contention (few high-priority fetches), cache with a long `max-age` on fingerprinted URLs, and use a `font-display` other than `block`/`auto` when text is the LCP.
  **Why** "Load duration" is rarely the bottleneck for most sites (consult your data first); a font with `font-display: swap|optional` means LCP is not blocked on the font request.
  **Applies to** landing page. **Check** `P7` weights; LCP image bytes <= budget; `@font-face` has `font-display`. **Source** https://web.dev/articles/optimize-lcp

- **RULE [WPERF-12]** Reduce TTFB: minimise redirects (ads and short links), keep analytics query strings from busting CDN cache keys, serve HTML from a CDN or edge cache, and remember `103 Early Hints` count as "first bytes".
  **Why** No frontend work starts before the first byte; target <= 0.8 s p75.
  **Applies to** all. **Check** navigation timing `redirectCount === 0` for canonical URLs; `responseStart` in lab < 0.5 s on localhost-like conditions [engine note]. **Source** https://web.dev/articles/optimize-lcp, https://web.dev/articles/ttfb

### 2.3 CLS

- **RULE [WPERF-13]** Put `width`/`height` (or CSS `aspect-ratio`) on every `img`, `video`, `iframe`, embed and ad slot; give responsive `<picture>` `<source>` elements their own dimensions when ratios differ; use `min-height` or `aspect-ratio` on containers for late content and do **not** collapse the reserved space when nothing arrives.
  **Why** Browsers compute `aspect-ratio: auto w / h` from the attributes before load; removing reserved space shifts content just like inserting it. [verified-C156: image without dimensions produced a 0.027 shift attributed to the following paragraph; with attributes 0.]
  **Applies to** all. **Check** `I2` plus `P2`. **Source** https://web.dev/articles/optimize-cls and https://web.dev/articles/aspect-ratio

- **RULE [WPERF-14]** Cookie notices, promo bars and chat widgets must not push content: use `position: fixed`/sticky overlays, reserve the space in the first layout, or insert only on user action; if new content must load, replace within a fixed-size container or use a "Load more" the user triggers (shifts within 500 ms of input do not count; pre-fetch before the click).
  **Why** Dynamically injected content near the top is the largest post-load CLS source. [verified-C156: a 80 px bar prepended after 600 ms gave CLS 0.053; the same bar as a fixed overlay gave 0.]
  **Applies to** landing page. **Check** `P2` with a delayed-banner scenario in the render-and-check tool. **Source** https://web.dev/articles/optimize-cls

- **RULE [WPERF-15]** Animate with `transform` and `opacity` only; never animate `top`, `left`, `width`, `height`, `margin` or `box-shadow` for motion; use `will-change` sparingly and remove it after the change; do not create layers by default.
  **Why** Layout properties recompute positions each frame (a `top/left` animation dropped 50% of frames versus 1% for transform in the guide's test); composited animations do not count towards CLS.
  **Applies to** all. **Check** `S3`; DevTools "Rendering" summary or static scan of `@keyframes`/transitions for layout properties; `transition-property` list. **Source** https://web.dev/articles/animations-guide, https://web.dev/articles/optimize-cls

### 2.4 Fonts

- **RULE [WPERF-16]** Fonts: WOFF2 only; subset with `unicode-range`; as few families and files as possible (system fonts, one variable font if you need several weights/styles); inline the `@font-face` declarations in `<head>` (not the font files); preload only the one or two critical files (preload ignores `unicode-range` and should name a single format); preconnect with `crossorigin` for third-party font hosts; replace icon fonts with SVG.
  **Why** A font is requested only when styling uses it, so discovery depends on the stylesheet; Chromium and Firefox block text up to 3 s, Safari indefinitely, unless `font-display` says otherwise. Self-hosting is not automatically faster; the Web Almanac found third-party-hosted fonts rendering sooner on average, so self-host only with a CDN and HTTP/2 and measure.
  **Applies to** all. **Check** `F1-F3`: every `@font-face` has `font-display`; woff2 only; <= 2 families; number of preloaded fonts <= 2; font files transferred <= 120 KB (craft budget). **Source** https://web.dev/articles/font-best-practices

- **RULE [WPERF-17]** Choose `font-display` by priority: `optional` for performance and zero layout shift (font may not be used on first visit), `swap` for brand text only if the font arrives early, `block` rarely; mix them (swap for headings/brand, optional for body); add metric-adjusted fallbacks with `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`; always end the stack with a generic family.
  **Why** `swap` has no block period but swaps late and shifts; `optional` has a 100 ms block and no swap; omitting the generic fallback falls back to the default serif.
  **Applies to** all. **Check** `F4`: layout-shift entries attributed to the headline = 0 with the font request throttled to 1 s; Chromium only (`LayoutShift` API). **Source** https://web.dev/articles/font-best-practices and https://web.dev/articles/optimize-cls

### 2.5 INP and main-thread work

- **RULE [WPERF-18]** Keep tasks under 50 ms: yield with `await scheduler.yield()` (fall back to `setTimeout`) after the UI update, defer non-critical work with `requestAnimationFrame(() => setTimeout(...))`, batch loops with a 50 ms deadline, and do not use `isInputPending()` (no longer recommended).
  **Why** Anything longer blocks input and the next paint; yielding after visible work lets the frame present sooner. Await the yield: `forEach` does not wait.
  **Applies to** all. **Check** Playwright: `longtask` observer during scripted interactions; count tasks > 50 ms = 0 after load settles; TBT <= 200 ms. **Source** https://web.dev/articles/optimize-long-tasks and https://web.dev/articles/optimize-inp

- **RULE [WPERF-19]** Keep scripts small and split: about 100 KB per individual script as a balance target; use dynamic `import()` for non-critical code; content-hash filenames; `modulepreload` for ES module chains; avoid very large single bundles whose evaluation becomes one long task.
  **Why** Parse, compile and run block the main thread during load, exactly when users first interact. [source for the ~100 KB guidance]
  **Applies to** all. **Check** `P6`: no first-party JS file > 100 KB gzipped on the critical path (soft), total JS <= 300 KB (craft). **Source** https://web.dev/articles/script-evaluation-and-long-tasks

- **RULE [WPERF-20]** Keep the DOM small (Lighthouse thresholds: warning at about 800 nodes, error at 1,400 nodes in its audit; craft budget 1,500 for a marketing page), avoid layout thrashing (write styles then read layout in one task), and use `content-visibility: auto` with `contain-intrinsic-size` for long off-screen sections.
  **Why** Rendering work after each interaction scales with DOM size; thrashing forces synchronous layout.
  **Applies to** all. **Check** `document.querySelectorAll('*').length <= 1500` (`P10`); Playwright trace has no forced reflow warnings on interaction. **Source** https://web.dev/articles/dom-size-and-interactivity and https://web.dev/articles/optimize-inp

- **RULE [WPERF-21]** Load third-party code last and cheaply: `async`/`defer`, a tag manager, no `document.write`, lazy-load embeds and widgets (facade or `loading=lazy`), preconnect only to the few critical third parties, run experiments on the server, and audit third parties regularly; Lighthouse flags third-party code blocking the main thread for more than 250 ms.
  **Why** Tags dominate marketing-page TBT and CLS; client-side A/B tools block rendering until the variant is chosen.
  **Applies to** landing page. **Check** Playwright: third-party request count and total blocking time with third-party domains blocked vs allowed (`route.abort` diff); `P3` delta <= 100 ms [engine note]. **Source** https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript, https://web.dev/articles/efficiently-load-third-party-javascript, https://web.dev/articles/vitals-field-measurement-best-practices

### 2.6 Network, caching, bfcache, speculation

- **RULE [WPERF-22]** Preconnect only to the few origins needed early (with `crossorigin` for fonts), `dns-prefetch` for the rest, and none for the page's own origin; unused connections are closed after about 10 s.
  **Why** Early connections save about 100-500 ms per origin (DNS lookups 20-120 ms); too many compete and waste.
  **Applies to** all. **Check** `<link rel=preconnect>` count <= 3; each corresponds to an actual early request. **Source** https://web.dev/articles/preconnect-and-dns-prefetch

- **RULE [WPERF-23]** Cache with: fingerprinted static assets `Cache-Control: max-age=31536000` (immutable by name); HTML `no-cache` (revalidate) with an `ETag`/`Last-Modified`; compress text with Brotli or gzip (typical savings 65-86% on common JS libraries) and minify.
  **Why** URLs that never change content can be cached for a year without a network request; HTML must be revalidated to ship updates.
  **Applies to** all. **Check** response headers of the build assets: `cache-control` contains `max-age=31536000` for hashed files; `content-encoding: br|gzip` for text responses. **Source** https://web.dev/articles/http-cache, https://web.dev/articles/reduce-network-payloads-using-text-compression

- **RULE [WPERF-24]** Keep pages bfcache-eligible: no `unload` listener; `beforeunload` only while a form is dirty; do not send `Cache-Control: no-store` on HTML unless sensitive (use `no-cache` or `max-age=0`); close WebSockets/IndexedDB transactions on `pagehide`; avoid `window.opener` references; refresh data on `pageshow` with `event.persisted`; reset CLS/INP on restore.
  **Why** Back/forward navigations (about 1 in 10 on desktop, 1 in 5 on mobile) become instant and layout-shift free.
  **Applies to** all. **Check** Playwright (Chromium): navigate away and back, assert `performance.getEntriesByType('navigation')[0].type === 'back_forward'` and `pageshow.persisted === true`; DevTools "Back/forward cache" test. **Source** https://web.dev/articles/bfcache

- **RULE [WPERF-25]** Use Speculation Rules sparingly for same-site next pages: `{"prerender":[{"where":{"href_matches":"/*"},"eagerness":"moderate"}]}`; default eagerness for document rules is `conservative`; `moderate` acts on hover (200 ms) or pointerdown; treat as progressive enhancement (Chrome and Edge only), mind bandwidth and analytics side effects.
  **Why** Prerendering can make LCP near zero and reduce CLS and INP for the next navigation, at the cost of wasted fetches when mispredicted.
  **Applies to** landing page (multi-page funnel). **Check** `<script type="speculationrules">` parses as JSON and URLs are same-site; no prerender of URLs with side effects (checkout, logout). **Source** https://developer.chrome.com/docs/web-platform/prerender-pages

- **RULE [WPERF-26]** Replace animated GIFs with muted looping video (WebM then MP4; GIF 3.7 MB vs MP4 551 KB vs WebM 341 KB); lazy-load iframes; remember a video without `poster` is not an LCP candidate.
  **Why** Large animated assets compete with the LCP resource.
  **Applies to** landing page. **Check** `I9`; no GIF > 100 KB. **Source** https://web.dev/articles/replace-gifs-with-videos, https://web.dev/articles/iframe-lazy-loading

### 2.7 Budgets and governance

- **RULE [WPERF-27]** Set a performance budget per page type that mixes quantity limits (JS, images, fonts, request count) and user-centric milestones (FCP, LCP, TBT), check it in CI, and decide in advance what happens on breach (optimise, remove, or do not add the feature).
  **Why** Good performance is rarely a by-product; the cited research found most improvements regress within six months. The article's starter budget (under 170 KB critical-path resources, TTI under 5 s on slow 3G on a Moto G4) is dated (2018 devices, TTI retired); keep the craft note's current budgets (JS <= 300 KB target, total <= 1.5 MB) and treat the 170 KB figure as a historical lower bound.
  **Applies to** all. **Check** `P5-P7` in CI (Lighthouse CI or the render-and-check tool). **Source** https://web.dev/articles/performance-budgets-101, https://web.dev/articles/vitals-tools

---

## 3. Numbers & scales

| Metric | Good | Poor | Notes | Source |
|---|---|---|---|---|
| LCP | <= 2.5 s | > 4.0 s | p75, mobile and desktop segmented | lcp |
| INP | <= 200 ms | > 500 ms | one outlier dropped per 50 interactions; p98 | inp |
| CLS | <= 0.1 | > 0.25 | session windows 1 s gap / 5 s max; 500 ms input grace | cls |
| FCP | <= 1.8 s | > 3.0 s | | fcp |
| TTFB | <= 0.8 s | > 1.8 s | 103 Early Hints counts as first byte | ttfb |
| Long task | > 50 ms | | blocking time = duration - 50 ms | long tasks |
| Event Timing default threshold | 104 ms (min 16 ms) | | observer `durationThreshold` | inp |

| LCP subpart | Share of LCP | Source |
|---|---|---|
| TTFB | ~40% | optimize-lcp |
| Resource load delay | < 10% | |
| Resource load duration | ~40% | |
| Element render delay | < 10% | |

| Lighthouse 10 weight | % |
|---|---|
| FCP | 10 |
| Speed Index | 10 |
| LCP | 25 |
| TBT | 30 |
| CLS | 25 |

| Other figures | Value | Source |
|---|---|---|
| Lighthouse score colours | 0-49 red, 50-89 orange, 90-100 green | scoring |
| Scoring curve | 25th percentile -> 50, 8th percentile -> 90; LCP of about 1.22 s -> 99 | scoring |
| Lazy-load distance (Chrome) | 1250 px (4G) / 2500 px (3G) | lazy loading |
| fetchpriority test | Google Flights LCP 2.6 s -> 1.9 s | fetch-priority |
| p75 LCP with / without browser lazy loading (field) | 3,546 ms / 2,922 ms (WordPress 3,768 / 3,495) | lcp-lazy-loading |
| bfcache | Chrome 96+, Firefox, Safari; 1 in 10 desktop, 1 in 5 mobile navigations are back/forward | bfcache |
| Script size target | about 100 KB per script | script evaluation |
| DOM size audit | warn about 800, error about 1,400 nodes | dom-size |
| Preconnect | saves 100-500 ms; idle connection closed after ~10 s; DNS 20-120 ms | resource hints |
| Compression | 65-86% on well-known libs (gzip/Brotli) | compression |
| Prerender | `moderate`: hover 200 ms; `conservative` default for document rules | prerender |
| Third-party warning | Lighthouse flags main-thread blocking > 250 ms | optimize vitals |
| CrUX window | rolling 28 days | vitals tools |
| Verified harness (Chromium 156, lab) | hero IMG LCP 412-424 ms; CLS 0 (reserved), 0.027 (no dimensions), 0.053 (late banner), 0 (overlay) | vitals.mjs |

---

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| `<img src="hero.avif" width=1280 height=720 fetchpriority=high alt="">` | `loading="lazy"` on hero; `data-src` | discovery and priority |
| `@font-face{font-display:swap}` + fallback with `size-adjust` | default `font-display` with no fallback | block period and shift |
| Cookie bar `position:fixed` | prepend a bar into the document flow | CLS 0.053 vs 0 (verified) |
| `await scheduler.yield()` after UI update | one 400 ms click handler | INP |
| Server-side A/B | client anti-flicker snippet hiding the page | LCP render delay |
| `Cache-Control: no-cache` on HTML | `no-store` on HTML | bfcache |
| `preconnect` to 2 critical origins | `preconnect` to 12 origins | wasted sockets |

### Copy-ready snippets

**Lab measurement helper: LCP subparts, session-window CLS, long tasks [verified-C156]**
```js
await page.addInitScript(`(() => {
  window.__v = { cls: 0, lcp: null, longtasks: [] };
  new PerformanceObserver(l => { for (const e of l.getEntries()) window.__v.lcp = { t: e.startTime, url: e.url, tag: e.element && e.element.tagName, rl: e.renderTime || e.loadTime }; })
    .observe({ type: 'largest-contentful-paint', buffered: true });
  let cur = 0, first = 0, last = 0, max = 0;
  new PerformanceObserver(l => { for (const e of l.getEntries()) { if (e.hadRecentInput) continue;
    if (cur && e.startTime - last < 1000 && e.startTime - first < 5000) cur += e.value; else { cur = e.value; first = e.startTime; }
    last = e.startTime; max = Math.max(max, cur); window.__v.cls = max; } }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver(l => { for (const e of l.getEntries()) window.__v.longtasks.push(Math.round(e.duration)); })
    .observe({ type: 'longtask', buffered: true });
})()`);
// after load + scroll:
const sub = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0];
  const r = performance.getEntriesByType('resource').find(x => x.name === window.__v.lcp.url) || null; return { ttfb: n.responseStart, r }; });
```

**Hero and below-fold markup**: see `webdev-forms-and-images.md` section 4.

**Metric-adjusted fallback [untested; metrics must be computed per font]**
```css
@font-face { font-family: "Brand Fallback"; src: local("Arial"); size-adjust: 104%; ascent-override: 92%; descent-override: 24%; line-gap-override: 0%; }
body { font-family: "Brand", "Brand Fallback", system-ui, sans-serif; }
```

**Speculation rules [untested]**
```html
<script type="speculationrules">{"prerender":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/checkout/*"}}]},"eagerness":"moderate"}]}</script>
```

**Yielding in a handler [untested]**
```js
button.addEventListener('click', async () => {
  updateUi();                                   // render-critical
  await (globalThis.scheduler?.yield?.() ?? new Promise(r => setTimeout(r)));
  doRestOfWork();                               // analytics, persistence
});
```

---

## 5. Exceptions & judgement calls

Conflicts and updates versus `../web/implementation-craft.md`:

1. **TTFB, FCP, DOM size, TBT thresholds** that the craft note marked "recalled from memory" are now confirmed: TTFB 0.8/1.8 s, FCP 1.8/3.0 s, long task 50 ms, DOM warn 800/error 1,400. The craft note's DOM budget of 1,500 sits above the Lighthouse error line (1,400); decide whether to tighten `P10` to 1,400.
2. **Lighthouse weights.** Same table as the craft note (Lighthouse 10). The scoring page still has no newer table; Lighthouse 13 scoring remains unverified.
3. **"Preload only 1-2 fonts."** Consistent, and the font article adds that preload ignores `unicode-range` and bypasses format negotiation, and that inlining `@font-face` is often the better fix. Add: "self-hosting is not automatically faster" (Web Almanac); craft note says "self-host WOFF2". Keep self-hosting for privacy and control but measure.
4. **LCP lazy loading.** Craft rule already forbids lazy hero. New nuance: correlation data shows lazy sites have slower LCP, but disabling it on single article pages was neutral; the damage is mostly on archive pages where early images get lazy-loaded.
5. **Starter budget (170 KB, TTI < 5 s on 3G).** Dated; do not adopt as a gate.
6. **`will-change`.** The animation guide says to use it sparingly and only after measuring; some design-system habits add `will-change: transform` everywhere. Do not.
7. **bfcache**: the article lists Chrome 149 not blocking on open WebSockets; other browsers do. Keep the rule simple: close connections on `pagehide`.
8. **Lab vs field.** Reaffirmed: lab LCP/CLS in the render-and-check tool is a regression guard. Differences expected from third-party tags and from CrUX's inclusion of iframes.
9. **Lighthouse "mobile preset"** throttling; the craft note lists 150 ms RTT, 1.6 Mbps, 4x CPU. This article only says "slow 4G, mid-tier phone". Fine.

Judgement calls: for single-screen marketing pages, LCP is usually a hero image or the H1; if the headline is the LCP (text), fonts and CSS are the bottleneck, not the image. Test both by hiding the image in the lab.

## 6. Figures worth keeping

No images saved. Candidates: the LCP subparts waterfall (optimize-lcp), the CLS impact/distance fraction diagrams (cls), the resource priority table (fetch-priority), the Lighthouse scoring curve.

## 7. Open questions

- Lab harness is Chromium 156 only; Firefox and WebKit lack `LayoutShift`/`LargestContentfulPaint` APIs (craft table), so only Chromium can gate CLS/LCP numerically.
- LCP candidate rules for low-entropy images were observed in the harness (flat 1x1 PNG ignored); the exact bits-per-pixel threshold was not checked in the docs.
- `web.dev/articles/lcp-image`, `render-blocking-resources` and `non-composited-animations` URLs returned 404; their content may live under new paths.
- Pages read only by keyword scan are listed at the top; their detailed procedures (RUM setup, web-vitals attribution build, bfcache notRestoredReasons API) were not fully studied.
- HTTP Archive 2025 figures in the craft note supersede the older page-weight stats on web.dev's images pages (2022).
