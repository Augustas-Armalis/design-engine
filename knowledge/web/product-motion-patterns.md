---
source: web:https://linear.app ; https://vercel.com ; https://stripe.com ; https://www.raycast.com ; https://resend.com ; https://clerk.com ; https://attio.com ; https://www.framer.com ; https://cursor.com ; https://posthog.com ; https://dub.co ; https://www.granola.ai ; https://www.plain.com ; https://commslayer.com ; https://alignui.com (all measured 2026-10-08)
chapter: Product-SaaS motion patterns, measured (hero load-in, scroll reveals, demos, hover, tickers, loops)
pages: n/a (live sites, Playwright 1.64.0 / Chromium 156.0.8078.4, 1440x900, dpr 1, headless, cold cache, no throttling)
topic_tags: [motion, hero, load-in, choreography, scroll-reveal, stagger, blur, count-up, marquee, loops, hover, tabs, reduced-motion, lcp, framer-motion, measured]
status: studied
---

# Product-SaaS motion patterns, measured

Companion to `motion-and-animation.md` (principles, tokens), `motion-library-react.md` (Motion API), `motion-a11y-perf-loading.md` (reduced motion, perf, load orchestration) and `knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md` ("Motion defaults"). Those notes say what to do; this one records **what 15 shipped sites actually do**, so every number can be traced to `knowledge/benchmarks/motion/timings.json` (derived) or `knowledge/benchmarks/motion/raw/<site>.json` (raw samples). Filmstrips: `knowledge/benchmarks/motion/<site>-<0|150|300|500|800|1200|2000>.png` (0.5 scale; one contact sheet per site: `<site>-sheet.png`).

Provenance legend: **(measured)** = read from `document.getAnimations()`, an `Element.prototype.animate` patch, or a per-frame sampler of computed opacity/transform/filter/clip-path; **(experiment)** = my own controlled test, numbers in `timings.json > experiments`, scripts in `knowledge/benchmarks/motion/harness/` (see `RUN.txt`); **[engine note]** = my synthesis, not measured.

## Method (read before trusting a number)

- Sites: linear, vercel, stripe, raycast, resend, clerk, attio, framer, cursor, posthog, dub, granola, plain, commslayer, alignui (15). One run per site per condition (hero, scroll, tabs, hover, reduced motion); run-to-run variance not measured.
- **t = 0 is first-contentful-paint (FCP)**, so CSS animations that started before FCP have negative start times. Filmstrip frames come from CDP `Page.startScreencast`, picked as the last frame at or before FCP + target ms (actual frame offsets are in `timings.json > sites.<site>.film`).
- "Start relative to FCP" for declared animations is the moment the animation was first seen by a per-frame `getAnimations()` poll (or created via the patched `animate()`), so it is accurate to one frame. "Declared" values (duration, delay, easing, keyframes) come from `getAnimations()` / the `animate()` patch and are exact. Values from the sampler (start/end of JS-driven motion) are +/- one frame (~16ms).
- Limits: headless on a fast laptop (absolute FCP/LCP flatter than field data); cookie banners were not dismissed and overlay some frames; posthog.com scrolls inside a container so its scroll data is empty; A/B variants uncontrolled.

## 1. Core ideas

1. **There is no consensus hero recipe; there is a consensus shape.** Seven sites run a declared staged entrance (dub, linear, attio, raycast, resend, commslayer, alignui) and eight paint the headline in the first available frame (vercel, stripe, posthog, cursor, clerk, framer, granola, alignui; clerk, framer and alignui still animate the product beneath it), so on half the field the motion budget goes to the product. Plain animates with Motion springs and is not counted in either group. The staged ones agree on order (nav/frame, headline, sub, CTAs, product stage), not on the curve: six different easings across seven sites.
2. **Median staged hero: first headline block moves ~100ms after mount, text blocks take 1000ms, siblings step 75ms, the whole thing settles in ~1.5s** (range 0.75-2.8s). Kaching/Kestrel (1.2s travel, 70ms step, ~2.7-3.0s total) sits at the slow end of this range and just past its top.
3. **Hero entrances are shorter and calmer than people remember: travel is 20px, not 40+, and nothing scales from below 0.975** (UI) in the measured text blocks. The product stage is what gets the longer, bigger move (900-1500ms, scale 0.975-0.98 or 40px rise).
4. **Blur is rare and small on headlines.** Only linear (10px, per-word spans) and attio (1.5px, opacity+blur, zero travel) blur the H1. Framer, plain and clerk use 8-10px blur on text inside demos or reveals.
5. **CSS keyframes win the first paint.** All six CSS-keyframe pages were first seen running 20-86ms *before* FCP; all six JS-library heroes appeared 124-2052ms *after* FCP (median 713ms). Motion/WAAPI is used for the stateful parts.
6. **Opacity-0 starts delay LCP by exactly delay + duration.** In a controlled test the LCP of an H1 animating from opacity 0 landed at 1424ms (400ms delay + 1000ms) and 1024ms (no delay); from opacity 0.01 it landed at the first paint (16-20ms). Real sites show the same signature: 4 of 15 have an LCP 1032-1680ms after FCP.
7. **Scroll reveals are shorter than hero entrances and used on about half the sites.** Declared reveal durations are 290-700ms (median 465), triggered with the block top at ~76% of the viewport height, travel <= 20px or none (blur instead). Vercel ran zero animations over 14 scroll steps; Stripe's scroll motion is autoplaying bento demos.
8. **Large showcase panels almost never react to hover** (36 of 37 probed panels changed nothing). Interaction feedback lives on inner items and controls at 100-150ms (median 150).
9. **Primary CTAs do not press-scale.** After a 250ms mouse-down none of 8 valid primary CTAs had a transform; hover is a colour shift (2 of 8 swap colour instantly with a 0s transition).
10. **Loops are rare in the first viewport and almost never pause offscreen.** Median 1 infinite animation in the first viewport (0-101); 8 of the 9 sites that have offscreen infinite animations leave them running.
11. **Reduced-motion support is the weakest part of the field.** One of 15 removed all hero motion; five cut finite animations by 46-76%; the rest changed <= 23% or increased.

## 2. Rules

Format: RULE / Why / Applies to / Check / Source. Numbers are medians (range) of the measured sites unless stated.

### 2.1 Hero choreography

- **RULE** Order the hero as five beats: (0) nav/frame, (1) headline, (2) sub, (3) CTAs, (4) product stage, then stage contents and loops. Start beat 1 within 0-400ms of mount (median 100ms) and have the headline resolved 1.0-2.1s after FCP (median 1096ms).
  **Why** Every staged hero measured follows this order, so reading order equals entrance order and the product arrives last, as the payoff. Headline-first keeps the message readable inside ~1s.
  **Applies to** landing page. **Check** sort animated elements by start time (`getAnimations()` + `delay`): nav < h1 <= sub < CTA <= stage; h1 final opacity reached <= 2100ms after FCP. **Source** dub (h1 100), attio (h1 100), linear (words 400), raycast (h1 0), resend (0), commslayer; timings.json `stats.firstHeadlineDelayMs`, `stats.headlineResolvedRelFcpMs`

- **RULE** Give each text block a 1000ms entrance on a decelerating curve (500-1000ms across sites; 1000 at dub, linear, raycast, resend; 600 at attio and alignui; 500 at commslayer). Keep whole-hero settle time at 750-2800ms (median 1500ms): last delay + last duration.
  **Why** Out-curves put most of the movement in the first third, so a 1s block already reads as finished at ~400ms while the tail stays smooth; longer than ~1s per block was not observed on any text.
  **Applies to** landing page. **Check** max(delay + duration) over hero elements in [750, 2800]ms; every text block's duration <= 1000ms. **Source** dub, linear, attio, raycast, resend, commslayer, alignui; timings.json `stats.entranceDurMs`, `stats.totalSpanMs`

- **RULE** Step siblings 75-100ms apart for blocks (headline -> sub -> CTAs; dub 100, attio 100, alignui 75, commslayer nav 45 / messages 90) and 33-70ms for words or characters (linear 33 per word, stripe/framer 50 per digit/char). Never exceed 100ms for blocks.
  **Why** Block cascades need a perceivable gap (~75ms+) to read as sequence; per-word cascades need far less or the headline takes 400ms+ just to start its last word.
  **Applies to** landing page. **Check** sorted delays: block step in [45, 100]ms, word/char step in [33, 70]ms; headline last-word start <= 300ms after first word. **Source** dub, attio, alignui, commslayer, linear, stripe, framer; timings.json `stats.siblingStepMs` (median 75, range 33-100, n=10)

- **RULE** Start the sub 100-200ms after the headline (dub +100, attio +100, linear +200), CTAs 300-450ms after the headline start with 50ms between buttons (dub 400/450/500, attio 300/400, linear +450). A 1000ms hold on the headline (Raycast) is valid only for a one-sentence hero.
  **Why** Sub and CTAs are read after the headline; entering them while the headline is still resolving keeps the hero one gesture instead of three.
  **Applies to** landing page. **Check** delay(sub) - delay(h1) in [100, 200]; delay(first CTA) - delay(h1) in [300, 450]. **Source** dub, attio, linear, raycast

- **RULE** Enter the product stage 200-900ms after the headline starts and let it run longer than the text (900-1500ms): dub window 400ms at +400, attio stage blocks 900ms at +350..+1400, linear frame 1500ms at +900, resend 1500ms, alignui frames 600ms with 75ms steps. Use opacity plus scale 0.975-0.98 or a 20-40px rise.
  **Why** A slower, bigger move reads as weight; starting it while the headline settles overlaps beats instead of queueing them.
  **Applies to** landing page. **Check** stage start - h1 start in [200, 900]ms; stage duration >= text duration; stage scale-from >= 0.975 (alignui's third stacked frame 0.925 is the lowest). **Source** dub, attio, linear, resend, alignui

- **RULE** Keep headline travel at 20px (0-25px: dub 20, raycast 20, resend 16, linear 24.8, attio 0) and move the block or the word, never the letters.
  **Why** Past ~25px the headline reads as sliding in rather than resolving, and the travel competes with the stage that follows.
  **Applies to** landing page. **Check** first keyframe `translateY` of the h1 or its word spans in [0, 25]px. **Source** dub, linear, attio, raycast, resend; timings.json `stats.headlineRisePx`

- **RULE** Blur the headline only when the effect is the point: 1.5px on the whole block with opacity-only motion (attio, 600ms), or 10px on per-word spans with a 33ms step (linear, 1000ms). Use <= 2px for UI chips and tabs (dub 2px, attio 1.5-2.5px).
  **Why** A small blur softens the pop-in without a visible travel; a large blur needs fragmentation (one span per word) or it looks like an out-of-focus image.
  **Applies to** landing page. **Check** `filter: blur()` keyframes on the h1: <= 2px when the block is one element, <= 10px only with per-word spans. **Source** attio, linear, dub, framer (10px on demo characters, 50ms step), plain (8px on demo text)

- **RULE** Pick one decelerating curve family per hero and reuse it; use ease-in-out only for opacity-only moves. Measured presence by site count: `ease-out` 10, springs written as `linear()` 5, `ease-in-out` 5, `linear` 5, `(.22,1,.36,1)` 4, `ease` 4, `(.16,1,.3,1)` 3, `(.33,1,.68,1)` 2, `(.215,.61,.355,1)` 2.
  **Why** One family gives the hero a single character; the measured spread shows no standard, so a bound token set (Kaching: outExpo `(.16,1,.3,1)`, outQuint, link `(.33,1,.68,1)`) is a differentiator, not a deviation.
  **Applies to** landing page. **Check** distinct easings among hero `getAnimations()` <= 3. **Source** timings.json `easingCensusPresenceBySite` (dub and linear's secondary 350ms layer use `(.16,1,.3,1)`; attio `(0,0,.58,1)`; commslayer `(.32,.72,0,1)`; alignui `(.6,.6,0,1)`; resend `ease-in-out`)

- **RULE** Treat a static hero as a legitimate option: 8 of 15 sites show the full headline in the first available frame (vercel, stripe, posthog, cursor, clerk, framer, granola, alignui). Vercel runs no hero entrance at all (one 200ms ease-out fade on a CTA; LCP 20ms after FCP).
  **Why** When the product is the proof, animating the headline adds LCP delay and nothing else; spend the budget on the stage.
  **Applies to** landing page. **Check** compare headline paint at 0ms and 150ms filmstrip frames. **Source** vercel, stripe, posthog, cursor, clerk, framer, granola, alignui (filmstrips)

- **RULE** Keep the nav quiet: static (vercel, stripe) or a 280-400ms fade at the start of the sequence (framer 400ms, commslayer 280ms with 45ms between items, 6px rise), never later than the headline.
  **Why** Nav is chrome; delaying it past the headline reads as a slow page and blocks the one action users already know to look for.
  **Applies to** landing page. **Check** nav animation delay + duration <= 600ms; nav starts at or before h1. **Source** framer, commslayer, vercel, stripe

### 2.2 Hero mechanics, LCP and load

- **RULE** Run the first-paint hero from CSS keyframes (`animation-fill-mode: backwards`, rendered server-side), and keep JS motion for stateful parts. Measured start relative to FCP: CSS heroes -38ms (-86 to -20, n=6), JS heroes +713ms (+124 to +2052, n=6).
  **Why** CSS animations run before hydration and off the main thread; JS-library entrances wait for the bundle and mount, so the first 0.1-2s of the page is a blank stage.
  **Applies to** landing page. **Check** `getAnimations()[i].startTime` relative to FCP: hero animations <= 0ms. **Source** dub, raycast, resend, alignui, commslayer, stripe (CSS) vs linear, attio, clerk, plain, framer, cursor (JS); timings.json `stats.cssStartRelFcpMs`, `stats.jsStartRelFcpMs`

- **RULE** Never start the LCP element (H1, hero image, stage frame) at `opacity: 0`; start at 0.01. LCP lands at the end of an opacity-0 animation.
  **Why** Chrome ignores opacity-0 paints for LCP, so LCP = delay + duration. Experiment: from 0 with 400ms delay LCP 1424ms; from 0 with no delay 1024ms; from 0 with a 10px blur 1028ms; from 0.01 with 400ms delay 20ms; from 0.01 with no delay 16ms; no animation 16ms (median of 7 runs each).
  **Applies to** landing page. **Check** PerformanceObserver `largest-contentful-paint` minus FCP <= 100ms on a staged hero. **Source** (experiment) timings.json `experiments.lcpOpacityStart`; field signature on linear (+1044), dub (+1032), resend (+1088), attio (+1680, H1 fade ends at +1624) vs vercel +20, raycast +108, framer +232, granola +344, clerk +484, plain +556

- **RULE** Run the entrance once per page load and start the stage only after fonts and the stage image/video are decoded; never let the entrance wait on the cookie banner.
  **Why** In the filmstrips, banners appeared 0.8-2.0s after FCP on stripe, clerk, attio, framer, plain, commslayer and granola and sat on top of the product stage; an entrance that is still moving under a banner reads as clutter.
  **Applies to** landing page. **Check** hero settle time (rule 2.1) <= banner appearance time, or the stage's bottom-left/right 420px is empty during the entrance. **Source** filmstrips of stripe, clerk, attio, framer, plain, commslayer, granola [engine note for the font/decode part]

### 2.3 Product demos and stage contents

- **RULE** Script the stage contents in reading order after the stage lands: 150-600ms per item, 75-170ms between items (attio rows 500ms ease, 8px, 120ms step; cursor staged fades 100-340ms ease-out at 40/150/280/430/570/740ms; commslayer chat messages 500ms, 10px, scale 0.985, 90ms step; alignui frames 600ms with 75ms step and translate 40/80/120px).
  **Why** A product demo that animates in reading order proves the workflow (what happens first, second, third); everything appearing at once is a screenshot.
  **Applies to** landing page. **Check** stage children start times are monotonic in DOM/reading order; step in [75, 170]ms. **Source** attio, cursor, commslayer, alignui

- **RULE** Let demos loop only with linear/steps timing and visible purpose: spinners 900-1200ms linear (dub, posthog, granola), carets 800-1100ms (`steps(1)`, or `ease` at alignui), shimmer 1500-2500ms linear (cursor, raycast), ambient float/breathe 2.4-6s (linear grid dots 2800ms, attio radar 3600-4850ms), typed text 50ms per character with 400ms blur-in (framer).
  **Why** Short loops that mean "working/typing" read as state; ambient loops must be slow to stay below attention.
  **Applies to** landing page. **Check** every infinite animation is classified spinner/caret/shimmer/ambient; ambient duration >= 2400ms. **Source** dub, posthog, granola, alignui, raycast, cursor, linear, attio, framer; timings.json `loopsAndMarquees`

### 2.4 Scroll reveals

- **RULE** Reveal meaningful blocks only; most of a page should simply be there. Measured: attio, clerk, resend, framer, raycast, commslayer reveal blocks on scroll; vercel ran 0 animations over 14 scroll steps (5930px); stripe's scroll motion is autoplaying bento demos (1420ms with 4000ms delays); posthog n/a.
  **Why** Revealing everything makes scrolling feel like waiting; the sites that reveal do so per section or per card group.
  **Applies to** landing page. **Check** count of reveal containers <= number of sections; no reveal on body paragraphs inside a revealed section. **Source** vercel, stripe, attio, clerk, resend, framer, raycast, commslayer

- **RULE** Make scroll reveals 290-700ms (median 465ms), shorter than the hero: attio 340-680ms, clerk 600ms, resend 282-298ms, raycast 700ms, commslayer 280-340ms, linear 420ms, framer 200-1000ms (springs).
  **Why** Reveals repeat down the page; at hero length (1s) they delay readability on every section.
  **Applies to** landing page. **Check** declared duration of block reveals in [250, 700]ms. **Source** attio, clerk, resend, raycast, commslayer, linear, framer; timings.json `stats.scrollRevealDurMs`. [engine note: Kaching's 1200ms travel / 900ms fade is above every measured reveal; it is the shipped standard, see section 5]

- **RULE** Trigger when the block's top reaches ~76% of the viewport height (p10 43%, p90 102%; n=170 declared animations over 11 sites): attio median 70%, clerk 75%, resend 65%, stripe 64%, framer 88%, linear ~100% (dot grid).
  **Why** Triggering with the top above the bottom edge guarantees the reveal is on screen while it plays; 24% in is roughly where the eye lands after a scroll tick.
  **Applies to** landing page. **Check** `IntersectionObserver` rootMargin bottom about -24% (Motion: `viewport.margin: "0px 0px -24% 0px"`). **Source** timings.json `stats.scrollRevealTriggerVh`

- **RULE** Keep reveal travel <= 20px or replace it with blur: attio 0px travel with 1.5-2.5px blur (340-680ms), clerk 8px blur with 50ms steps (600ms), resend 20px (282-298ms), commslayer 9.6-11.2px with 0.85-0.975 scale, raycast 50px with scale 0.98 (the outlier, 700ms, cards).
  **Why** A long rise on every block makes the page bob while you scroll; blur and opacity change state without moving layout-sized things.
  **Applies to** landing page. **Check** reveal keyframe translate <= 20px on text blocks. **Source** attio, clerk, resend, commslayer, raycast

- **RULE** Stagger items inside one reveal group 50-100ms (median 78ms): clerk 50, commslayer 72, alignui 75, raycast 80, framer 100, attio 102. Reveal several siblings at once (resend, 0ms step) when they are one unit.
  **Why** Same cascade logic as the hero, but shorter because the group is smaller and repeats.
  **Applies to** landing page. **Check** `delay` between siblings in [50, 102]ms; group cascade <= 600ms. **Source** clerk, commslayer, alignui, raycast, framer, attio, resend; timings.json `stats.revealGroupStepMs`

- **RULE** Use native scroll. None of 15 sites exposed Lenis or GSAP globals (checked `window.Lenis`, `window.gsap`, `html.lenis`); six stylesheets contain `animation-timeline` rules and granola runs 24 real scroll-timeline animations (hero media shrink-to-sticky, parallax, progress fills; duration `auto`).
  **Why** Product SaaS leaves scroll alone and uses CSS scroll timelines for the one or two pinned/parallax moments.
  **Applies to** landing page. **Check** `document.getAnimations().filter(a => a.timeline instanceof ScrollTimeline || a.timeline instanceof ViewTimeline)`; no scroll-jacking. **Source** granola, clerk, stripe (scroll timelines); libs check on all 15 (detection by globals/classes only; bundled imports could hide a library)

### 2.5 Hover, press, controls

- **RULE** Transition colour/background/border on hover in 100-150ms (median 150ms over 14 sites; range 100-400) on the default ease or an out-curve: `(.4,0,.2,1)` at 7 of 14 (clerk, cursor, dub, granola, posthog, resend, vercel), `(.25,.46,.45,.94)` linear/commslayer, `(.25,1,.5,1)` stripe, `(0,0,.2,1)` alignui, `(.2,0,0,1)` attio, `ease` raycast.
  **Why** Hover is the highest-frequency motion on the page; at 150ms it is felt as responsiveness, not as animation.
  **Applies to** landing page. **Check** computed `transition-duration` of `a, button` in [100, 200]ms (stripe, raycast and plain use 300-400 on colour only). **Source** timings.json `stats.hoverTransitionMs`

- **RULE** Primary CTAs change colour only; do not scale on press. After a 250ms mouse-down none of the 8 valid primary CTAs (stripe, cursor, alignui, plain, posthog, vercel, raycast, attio) had a transform; two (cursor, plain) swap colour with `transition: 0s`. Where a CTA transitions: stripe 300ms `(.25,1,.5,1)`, alignui 200ms, vercel 150ms, attio 50ms (border colour); dub's announcement badge 75ms.
  **Why** Marketing CTAs are pressed once; press feedback is already the page change. A subtle scale (Kestrel/Kaching 0.98) is a brand choice, not a norm.
  **Applies to** landing page. **Check** computed `transform`/`scale` of the CTA while `:active` (mouse down 250ms) is `none` unless a scale is a documented brand override. **Source** (measured) timings.json `hoverPressAndCards`. [engine note: Kaching/Kestrel use `whileTap` 0.98, 220ms; keep as a deliberate override]

- **RULE** Do not lift or scale large showcase panels on hover. Probed 37 rounded containers (260-760px wide, 140-620px tall) on 10 sites: 36 changed nothing (no transform, shadow, background or border change); the one change was border-colour 200ms `(.4,0,.2,1)` (cursor). Put feedback on inner interactive items at 150ms: cursor agent row (background/colour/opacity 150ms), dub inner card (box-shadow + transform 150ms `(0,0,.2,1)`), attio buttons (box-shadow 150ms `(.2,0,0,1)`).
  **Why** Panels are showcases, not buttons; a lifting panel promises a click that does not exist.
  **Applies to** landing page. **Check** hover on non-link panels: no transform; hover rules sit on `a, button, [role=button]` descendants. **Source** linear, resend, clerk, attio, framer, cursor, dub, granola, plain, commslayer; timings.json `hoverPressAndCards`. [engine note: the probe captured any bordered container, so some were not meant to be interactive]

- **RULE** Slide the nav hover indicator as one shared element in 200-550ms: attio `translate` 550ms `(.2,0,0,1)`, alignui `left`+`width` 500ms `(.33,1,.68,1)`, clerk opacity+translate 300ms `(.4,.36,0,1)`, resend translate 200ms `(.4,0,1,1)` with 150-350ms opacity/scale `(.22,1,.36,1)`, commslayer transform 200ms `(.32,.72,0,1)` plus 150ms background.
  **Why** One moving indicator tells the eye where it is going; per-item fades leave the pointer's path unmarked.
  **Applies to** landing page. **Check** a single indicator node whose transform/left changes on hover; duration in [200, 550]ms. **Source** attio, alignui, clerk, resend, commslayer

### 2.6 Tabs and segmented content

- **RULE** Swap tab content with a faster exit than enter: commslayer panel exit 220ms `(.32,.72,0,1)` / enter 450ms spring; text swap out 420ms / in 500ms `(.22,1,.36,1)` with opacity, 4px blur and 9px drift; posthog (Radix) content fade 268-271ms ease-out. Do not stagger on swap.
  **Why** The user just acted; the old panel must get out of the way in about half the time the new one takes to settle, and repeat actions cannot afford a cascade.
  **Applies to** landing page. **Check** exit duration <= 0.6 x enter duration; no per-item delay on swap. **Source** commslayer, posthog (tab trials on commslayer, posthog, dub, cursor, resend; dub and cursor tab clicks showed no panel motion)

### 2.7 Numbers, counters, drawn lines

- **RULE** Count hero KPIs up in <= 1s on a front-loaded curve, once, when in view: attio 0k -> 76k in 933ms (25% of the value at 25% of the time is 0.37, 0.64 at 50%, 0.88 at 75%). Long counts are for dramatic figures only: dub rolls to 242,327,635 in 2.8s over 67 distinct values (progress 0.20 at 25%, 0.33 at 50%, 0.73 at 90%, back-loaded) in a mono font.
  **Why** A figure the reader is waiting on to read is a delay; front-loaded curves show the right magnitude early. Back-loaded 2.8s counts read as an odometer and need a reason.
  **Applies to** landing page. **Check** duration <= 1000ms for hero stats; value formatting stable (separators, tabular figures). **Source** attio, dub; Kaching `countUp` 0.9s first roll

- **RULE** Roll digits as per-digit vertical slides when the figure is a headline stat: stripe `translateY(-100%)` 325ms `(.33,1,.68,1)`, 50ms between digits, wrapped in `overflow: hidden`.
  **Why** A reel shows change without an interpolated number that was never true.
  **Applies to** landing page. **Check** each digit is its own span with delay = index x 50ms; the real text stays in the DOM. **Source** stripe (also Kaching `CountUp`, 35ms character step)

- **RULE** Draw strokes with eased, finite timings and let the endpoint land with the stroke: commslayer signature 1091ms `(.28,.12,.5,.92)` then a 500ms second stroke starting at 2021ms; posthog hand-drawn underline segments 158-242ms ease-out chained so delay_n = sum of previous durations (0, 242, 464, 642ms); rails: commslayer `scaleX 0 -> 1` 350ms `(.32,.72,0,1)` at t=0.
  **Why** A chained draw reads as one pen movement; an endpoint that appears at arrival shows the line has a destination.
  **Applies to** landing page. **Check** stroke segment delays equal cumulative durations; endpoint start = stroke start + duration - ~80ms. **Source** commslayer, posthog. [engine note: the landing-dot overlap (-80ms) is Kestrel's value; rails/drawn lines have n=1-2 measured sites]

- **RULE** Flowing-dash loops run slow and linear with negative delays to desynchronise instead of start offsets: posthog `context-flow` strokeDashoffset 108px -> 0 over 3600ms linear, delays 0, -600, -1200, -1800, -2400, -3000ms.
  **Why** Negative delays start every strand mid-cycle, so there is no visible start order or gap.
  **Applies to** landing page. **Check** infinite stroke animations use `linear` and negative `animation-delay`. **Source** posthog

### 2.8 Marquees and loops

- **RULE** Run marquees at 24-51 px/s (median 35): resend 26.8 px/s (4788px list + 32px gap over 180s, class `group-hover:animation-paused`), commslayer 42.8 px/s (clients, 74s) and 23.9 px/s (integrations, 36s), posthog 51 px/s (45s, translateX 0 -> -50%). Duplicate the track and translate -50% (or -100% - gap).
  **Why** Below ~20 px/s the strip looks broken; above ~50 px/s names cannot be read. Kaching's preset (40 px/s) is inside the band.
  **Applies to** landing page. **Check** (animated translate px) / (duration s) in [24, 51]; `animation-play-state: paused` on hover. **Source** resend, commslayer, posthog; timings.json `stats.marqueePxPerSec`

- **RULE** Limit the first viewport to <= 3 decorative infinite animations (median 1; 10 of 15 sites have <= 2). The outliers are product demos (granola 101, posthog 12, dub 12 spinner bars).
  **Why** Simultaneous loops compete for attention and cost compositing; the first viewport is where the one entrance should be the loudest thing.
  **Applies to** landing page. **Check** count infinite animations whose target is in the first viewport, excluding spinners and carets: <= 3. **Source** timings.json `stats.heroInfiniteAnimsInViewport`, `loopsAndMarquees`

- **RULE** Pause infinite animations and videos when offscreen. Measured after scrolling to 55% of each page: alignui 7/7, linear 82/82, cursor 36/36, granola 29/29, attio 9/9, raycast 6/6, resend 7/7, dub 2/2 offscreen loops still `running`; commslayer paused 16 of 27; framer and plain paused 4/4 and 5/5 offscreen videos, resend left 1 of 4 playing.
  **Why** The field does not do it, so it is a free win: offscreen compositor work and battery drain with nothing to see.
  **Applies to** landing page. **Check** `document.getAnimations().filter(a => a.playState === 'running' && offscreen(a.effect.target)).length === 0` after scrolling. **Source** (experiment) timings.json `experiments.offscreenPlayback`

### 2.9 Reduced motion

- **RULE** Honour `prefers-reduced-motion` at the root and verify by counting animations under emulation. Measured finite-animation counts, normal -> reduced: commslayer 216 -> 0 (infinite 33 -> 0); linear 46 -> 11; framer 64 -> 16; cursor 32 -> 8 (infinite 115 -> 110); dub 42 -> 18; attio 83 -> 45 (infinite 10 -> 2); plain 35 -> 27; alignui 13 -> 13; raycast 21 -> 21; resend 16 -> 16; stripe 78 -> 76; granola 32 -> 30 (infinite 123 -> 123); clerk 15 -> 27; posthog 10 -> 12; linear's infinite animations went 83 -> 152.
  **Why** Only 1 of 15 sites removes its hero motion and 7 are within +/-6% of normal or higher; getting this right is a differentiator and a WCAG 2.3.3 expectation.
  **Applies to** landing page. **Check** with `emulateMedia({ reducedMotion: 'reduce' })`, `getAnimations()` finite count drops to opacity-only and infinite count <= 1 (carets). **Source** timings.json `reducedMotion` (single run per site; counts include demo internals)

## 3. Numbers & scales

### 3.1 Choreography template (derived from the measurements above)

t = ms after hero mount (CSS: at first paint). Typical = median of the sites that have the beat; range in parentheses.

| t (ms) | What enters | Typical values | Evidence |
|---|---|---|---|
| 0-135 | Nav and frame (nav fade or 45ms-stepped items, rail draw) | nav 280-400ms, 6px rise, step 45; rail `scaleX` 350ms | commslayer, framer; vercel/stripe static |
| 0-400 (median 100) | Headline block, or words at 33-70ms steps | 1000ms, 20px (0-25), blur 0 (1.5-10 if used) | dub 100, attio 100, linear 400 (+33/word), raycast 0, resend 0 |
| +100-200 after h1 | Sub | 1000ms (dub, linear), 600ms (attio), 10px | dub +100, attio +100, linear +200 |
| +300-450 after h1 | CTAs, 50ms apart | same duration and curve as sub | dub 400/450/500, attio 300/400, linear 850 |
| +200-900 after h1 | Product stage | 900-1500ms, scale 0.975-0.98 or 20-40px rise | dub 500, attio 450+, linear 1300, alignui 0-150, resend |
| stage +0-1200 | Stage contents in reading order | 150-600ms each, 75-170ms steps | attio rows 120, cursor 110-170, commslayer 90, alignui 75 |
| after landing | Loops (carets, spinners, slow ambient) | carets 800-1100ms, spinners 900-1200ms, ambient 2.4-6s | dub chart at ~2000, granola, posthog |
| settle | End of last block | median 1500ms (750-2800) | `stats.totalSpanMs` |

### 3.2 Measured values: median and range

| Metric | n | Median | Range | Sites (values) |
|---|---|---|---|---|
| First headline start, ms after mount | 5 | 100 | 0-400 | dub 100, attio 100, linear 400, raycast 0, resend 0 |
| Headline resolved, ms after FCP | 5 | 1096 | 997-2051 | dub 1096, attio 1624, linear 2051, raycast 1005, resend 997 |
| Primary block entrance duration, ms | 7 | 1000 | 500-1000 | dub/linear/raycast/resend 1000, attio/alignui 600, commslayer 500 |
| Headline travel, px | 5 | 20 | 0-24.8 | dub 20, raycast 20, resend 16, linear 24.8, attio 0 |
| Headline blur, px | 5 | 0 | 0-10 | linear 10, attio 1.5, others 0 |
| Sub after headline, ms | 4 | 150 | 100-1000 | dub 100, attio 100, linear 200, raycast 1000 |
| Sibling step (blocks and words), ms | 10 | 75 | 33-100 | dub 100, attio 100, alignui 75, commslayer 45/90, linear 33, stripe 50, framer 50, dub logos 75, raycast cards 80 |
| Whole-hero span, ms | 7 | 1500 | 750-2800 | dub 1500, linear 2800, attio 2400, raycast 2000, resend 1500, commslayer 1420, alignui 750 |
| CSS hero start vs FCP, ms | 6 | -38 | -86 to -20 | dub -86, resend -46, commslayer -45, stripe -31, alignui -26, raycast -20 |
| JS hero start vs FCP, ms | 6 | 713 | 124-2052 | linear 547, attio 892, clerk 878, plain 202, framer 124, cursor 2052 |
| Scroll reveal duration, ms | 8 | 465 | 290-700 | resend 290, commslayer 310, framer 400, linear 420, attio 510, stripe 572, clerk 600, raycast 700 |
| Scroll trigger, fraction of viewport height (block top) | 170 records | 0.76 | p10 0.43 - p90 1.02 | 11 sites |
| Reveal group step, ms | 6 | 78 | 50-102 | clerk 50, commslayer 72, alignui 75, raycast 80, framer 100, attio 102 |
| Hover transition, ms | 14 | 150 | 100-400 | linear 100; clerk, commslayer, cursor, dub, granola, posthog, resend, vercel 150; attio 175; alignui 200; raycast, stripe 300; plain 400 |
| Marquee speed, px/s | 4 | 35 | 24-51 | commslayer 23.9 and 42.8, resend 26.8, posthog 51.1 |
| First-viewport infinite animations | 15 | 1 | 0-101 | 0: attio, clerk, plain, raycast, stripe, vercel; 1: alignui, framer, linear; 2: resend; 3: commslayer; 6: cursor; 12: dub, posthog; 101: granola |
| LCP minus FCP, ms | 15 | 344 | 0-6776 | >1000: linear 1044, dub 1032, resend 1088, attio 1680, posthog 6776 |

### 3.3 Per-site hero grammar (declared values, `timings.json > curated`)

| Site | Mechanism | Beats (delay ms) | Duration, ease, travel, blur |
|---|---|---|---|
| dub | CSS keyframes `slide-up-fade`, fill both | badge 0, h1 100, sub 200, chips row 300, buttons 400/450/500, window 500 | 1000ms `(.16,1,.3,1)`; h1 20px, others 10px/5px; window 400ms 20px; no blur |
| linear | JS WAAPI, one span per word | words 400/433/466/499, line 2 at 500, sub 600, CTA 850, frame 1300 | 1000ms `(.25,.1,.25,1)`; `translateY(20%)` + `blur(10px)`; frame 1500ms `(.455,.03,.515,.955)` opacity only |
| attio | JS WAAPI | eyebrow 0, h1 100, sub 200, buttons 300/400, stage blocks 450-1500 | 600ms `(0,0,.58,1)`; opacity + `blur(1.5px)`, no travel; stage 900ms; stage scale 0.98 873ms; rows 500ms ease 8px, 120ms step |
| raycast | CSS `fade-in-up` | h1 0, sub 1000 | 1000ms `ease`, 20px |
| resend | CSS keyframes + springs | text 0 | 1000ms `ease-in-out`, 16px; stage `open-scale-up-fade` 1500ms scale 0.98 + 5px; glow `webgl-scale-in-fade` 1000ms scale 0.7; Motion-style springs 650 and 1050ms |
| commslayer | CSS keyframes | nav 0/45/90/135, chat 650/740/830/920, rail 0 | nav 280ms and messages 500ms `(.32,.72,0,1)`; 6px and 10px with scale 0.985; rail 350ms |
| alignui | CSS keyframes | frames 0/75/150 | 600ms `(.6,.6,0,1)`; translate 40/80/120px, scale 0.975/0.95/0.925; templates 500ms blur 4px; icon pop 400ms scale 0 -> 1 blur 4px |
| stripe, vercel, posthog, cursor, granola | static headline | n/a | stripe 500ms `(.33,1,.68,1)` fades on small elements, digit roll 325ms; vercel 200ms CTA fade; posthog underline draws 158-242ms ease-out; cursor demo 100-340ms ease-out; granola scroll-timeline media |
| clerk, framer, plain | Motion springs (`linear()` easing) | demo 300 (clerk), nav 0 (framer), stage/text 0-914 (plain) | clerk demo 500ms linear + 8px blur reveals 600ms; framer nav 400ms, demo characters 50ms step 400ms blur 10px; plain stage `translateY(150px)` 400ms, text `blur(8px)` 650ms |

### 3.4 Easing, press and hover census

| Item | Measured |
|---|---|
| Easing presence (sites using it in declared hero/scroll animations of 150-2000ms on opacity/transform/filter) | ease-out 10, spring `linear()` 5, ease-in-out 5, linear 5, `(.22,1,.36,1)` 4, ease 4, `(.16,1,.3,1)` 3, `(.33,1,.68,1)` 2, `(.215,.61,.355,1)` 2, `(.25,.1,.35,1)` 2 |
| Hover easing, sites (top curve) | `(.4,0,.2,1)` 7 of 14 |
| Primary CTA hover | stripe 300ms, alignui 200ms, vercel 150ms, dub 75ms, attio 50ms; cursor and plain 0s |
| Primary CTA `:active` transform after 250ms | none on all 8 valid CTAs |
| Showcase panel hover | 36 of 37 no change; 1 border-colour 200ms |
| Headline visible in first available frame (static) | 8 of 15 |
| Lenis/GSAP globals | 0 of 15 |
| Stylesheets with `animation-timeline` | 6 of 15 (commslayer, dub, granola, clerk, raycast, resend) |
| WebGL canvases on the page | granola 6, attio 2, stripe 2, dub 1, vercel 1, clerk 1, raycast 1, resend 1 |

### 3.5 Kestrel and Kaching against the measurements

| Token (Kestrel / Kaching) | Value | Measured band | Verdict |
|---|---|---|---|
| Nav start | 120ms | 0-135ms | inside |
| Headline start | 300ms | 0-400 (median 100) | inside, later than median |
| Word step | 70ms | 33-70 for words | at the top of the band |
| Sub start | 0.3 + 5 x 0.07 + 0.05 = 700ms (400ms after h1) | +100-200ms after h1 | later than all measured (waits for all words) |
| CTA start | ~805ms (+505 after h1) | +300-450 | slightly later |
| Stage start | 750ms (+450 after h1) | +200-900 | inside |
| Block duration | 1200ms travel, 900ms fade | 500-1000ms | above (travel), at the top (fade) |
| Headline travel / blur | 28px / 6px | 0-25px / 0-10px (1.5 and 10 used) | travel +3px over band; blur inside |
| Stage scale | 0.97 | >= 0.975 | 0.005 below; fine |
| Hero span | ~2.7s (tiles) to ~2.95s (last route) | 750-2800 | at the top, just past it |
| Scroll reveal (Kaching `Reveal`) | 1200ms / 900ms fade, 28px, 6px blur, margin -12% (top at ~88%), stagger 80ms | 290-700ms, <= 20px, top at ~76%, 78ms | duration and travel above; stagger matches; trigger a bit later |
| Hover | 220ms `(.22,1,.36,1)` | 100-150 | above; fine for brand feel |
| Press scale | 0.98 | none measured | deliberate override |
| Marquee | 40 px/s | 24-51 | inside |
| Count-up | Kaching 0.9s first roll; Kestrel dashboard 1.3s `ease.link` | attio 933ms; dub 2.8s | Kaching matches; Kestrel above attio, well below dub |

[engine note] None of these are errors; Kestrel's feel comes from the slow, soft settle (1.2s on `ease.reveal`). The table shows where the loved hero is at the slow end of the field, so trim it for dense pages and keep it for single-message heroes.

## 4. Dos and Don'ts

- **Do** keep a single decelerating curve and a 1000ms block entrance with a 20px rise (dub: `slide-up-fade` 1000ms `(.16,1,.3,1)`, h1 20px, delays 0/100/200/300/400-500). **Don't** mix four easings in one hero (the measured spread is a warning about uncoordinated work, not a library of options).
- **Do** blur per word with a short step (linear: 10px, 33ms, 1000ms) or blur the whole block lightly (attio: 1.5px, 600ms, no travel). **Don't** blur a whole headline block at 10px (looks out of focus for 600ms+).
- **Do** let the product stage arrive 200-900ms after the headline and run longer than the text (linear frame +900ms/1500ms, dub window +400ms/400ms). **Don't** queue the stage after every other element has finished (Raycast holds the sub for 1000ms; that only suits a one-line hero).
- **Do** start the LCP element at opacity 0.01 (experiment: LCP at first paint, 16-20ms). **Don't** start the H1 or hero frame at 0: LCP = delay + duration (1024-1424ms in the test; +1032-1680ms on linear, dub, resend, attio).
- **Do** run the hero from CSS keyframes (6 of 6 CSS pages were running at or before FCP). **Don't** wait for hydration to begin the entrance (6 of 6 JS heroes started 124-2052ms after FCP).
- **Do** put hover feedback on inner items at 150ms (cursor agent row, dub inner card). **Don't** lift a whole bento panel (36 of 37 panels do nothing).
- **Do** swap tab content exit-fast, enter-slow (220/450ms; text 420/500ms with 4px blur and 9px drift). **Don't** stagger a tab swap.
- **Do** run marquees at 24-51 px/s with pause on hover and pause when offscreen. **Don't** leave 82 loops running offscreen (linear) or 36 (cursor).
- **Do** reduce motion to opacity (commslayer: finite 216 -> 0, infinite 33 -> 0). **Don't** assume the library default does it (resend, raycast, alignui, granola, stripe measured unchanged).

## 5. Exceptions & judgement calls

- **Kaching/Kestrel are at the slow end of the field.** Scroll reveals at 1200ms/900ms are 1.7x the longest measured reveal (700ms). Kaching is the founder-shipped standard and Kestrel is the loved load-in, so keep them for hero and big-stage moments; for dense pages use 465ms-class reveals. [engine note]
- **Overshoot easing exists.** commslayer uses `cubic-bezier(.34,1.42,.5,1)` (y > 1) on chips, face and line-ins (280-340ms) and cursor uses `(.2,.9,.3,1.15)` for bot-message pop (280ms). `anti-ai-slop-detector.md` D-MOTION-1 flags overshoot curves; the measured sites use them only on small elements at <= 340ms. Keep the flag as a default, allow it with a DIRECTION.md override on tiny pop-ins.
- **Auto-marquees exist** (resend, commslayer, posthog) despite `anti-ai-slop.md` listing them as a tell. They are logo/integration strips at 24-51 px/s with pause; the slop risk is unpaused or fast marquees, not the pattern.
- **No press scale is the norm.** Kestrel/Kaching use `whileTap` 0.98; with 0 of 8 measured CTAs scaling, press scale is a brand voice choice. Keep it if it is part of the signature.
- **Headline blur is a signature, not a default** (2 of 7 staged heroes, 10px vs 1.5px). Kestrel's 6px sits between them.
- **A static hero is not a failure.** Vercel (no entrance, LCP +20ms), stripe, posthog and cursor spend zero motion on copy. If the product proof is strong, prefer a quiet hero and one rich stage animation.
- **Springs vs keyframes.** Five sites express springs as WAAPI `linear()` easings (resend 650/1050ms, clerk 500/750ms, plain 400/650ms, framer 400-1000ms, linear 300ms). Springs retarget on interruption, so use them for hover/pill/drag; keyframes with a named out-curve are enough for one-shot entrances (dub, raycast, commslayer, alignui).
- **LCP rule has a cost.** Starting at opacity 0.01 shows a barely visible ghost for the delay window; with `fill-mode: backwards` and a delay <= 400ms the ghost is imperceptible. If a brand needs a clean blank, delay with `visibility` on non-LCP elements, not on the LCP candidate. [engine note]
- **Count-up speed is brand-dependent.** attio 933ms vs dub 2.8s; both ship. Use <= 1s unless the number is the page's one idea.
- **Reduced-motion measurements are counts, not UX audits.** A site can drop 76% of animations (linear) and still run 152 infinite ones; read the per-site rows, not a single score.

## 6. Figures worth keeping

All in `knowledge/benchmarks/motion/` (frames are 720x450, FCP-relative; `-sheet.png` is the 7-frame contact sheet):
- `linear-sheet.png`: nothing but nav for ~1s, headline resolves from 10px blur at ~1.2s, product frame fades in last (~1.85s).
- `dub-sheet.png`: textbook staged hero: h1 150ms, sub 300ms, CTAs 500ms, chips 500-800ms, product window loading at 800ms and charts at 2000ms.
- `attio-sheet.png`: 1s blank beat, headline blur-resolve at 1.2s, stage rising by 2s.
- `resend-sheet.png`: whole hero (nav, h1, sub, CTAs) resolving together 150-800ms with a soft focus, light streak background fading in 800-1200ms.
- `raycast-sheet.png`: headline fade 150-500ms, sub arriving 1200-2000ms.
- `vercel-sheet.png`, `stripe-sheet.png`, `posthog-sheet.png`, `cursor-sheet.png`, `alignui-sheet.png`: static heroes; compare against the staged ones.
- `framer-sheet.png`, `granola-sheet.png`, `plain-sheet.png`, `commslayer-sheet.png`, `clerk-sheet.png`: product demo playing inside the hero (glow chat box and typing; window, video tiles and "Transcribing" pill; stage rising on spring; message cascade; demo cards fading at +300ms).
- Data: `timings.json` (derived; `curated`, `stats`, `experiments`, `reducedMotion`, `hoverPressAndCards`, `loopsAndMarquees`, per-site `sites`), `raw/<site>.json` (per-element samples and animation records), `raw/_hover2-*.json` (CTA press and card hover probes).

## 7. Open questions

- Press scale on secondary buttons, icon buttons and in-product controls was not measured; only the first prominent CTA per site.
- Mobile (390px) choreography not measured; Kaching/Kestrel rules for phones are in their own notes.
- `layoutId`-style shared-element pills are inferred from translate/left/width transitions; the animation library behind each site was not verified (spring `linear()` easings suggest Motion/WAAPI on resend, clerk, plain, framer, linear).
- Scroll-linked parallax beyond granola/clerk/stripe's timelines was not characterised; Lenis/GSAP detection used globals and classes only.
- Field LCP (CrUX) not measured; headless, unthrottled, cold-cache FCP/LCP only. The opacity-0 LCP effect was replicated locally, not on each site.
- Tab trials found panel motion on commslayer and posthog only; dub and cursor tab clicks (including in-demo tabs) showed none, resend had 29 `role=tab` nodes but no animated panel.
- Single run per site and condition: variance, A/B variants and geo variants unknown.
- Cookie banners overlaid stripe, clerk, attio, framer, plain, commslayer, granola frames; their own animation (e.g. granola iubenda 400ms ease) was recorded but not separated from the hero in `timings.json`.
- posthog.com scrolls inside a container, so its scroll-reveal behaviour is unmeasured.

## 8. Recipes (`motion/react`, Motion 14.0.0)

All 13 recipes below type-check with `tsc --strict` against `motion@14.0.0` and `react` types. Tokens in comments are measured medians (or flagged choices). The first-paint hero should still be CSS (recipe 13); use these for stateful pieces and for sites already on React.

```tsx
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, animate, motion, stagger, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

const outExpo = [0.16, 1, 0.3, 1] as const // dub.co hero ease; Kaching ease.outExpo
const outCubic = [0.33, 1, 0.68, 1] as const // attio and stripe ease; Kaching ease.link
```

**1. Word reveal** (words 33-70ms apart; blur only because each word is its own span; 50ms is an engine choice between linear 33 and Kestrel 70)

```tsx
const words = { hidden: {}, show: { transition: { delayChildren: stagger(0.05, { startDelay: 0.1 }) } } }
const word = {
  hidden: { opacity: 0.01, y: 20, filter: 'blur(6px)' }, // 0.01, not 0: LCP lands at the animation end when opacity starts at 0
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: outExpo } },
}
export function Headline({ text }: { text: string }) {
  return (
    <motion.h1 variants={words} initial="hidden" animate="show" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block" aria-hidden>{w}&nbsp;</motion.span>
      ))}
    </motion.h1>
  )
}
```

**2. Stage lift** (starts 200-900ms after the headline, longer than text, scale >= 0.975)

```tsx
export const StageLift = ({ children, at = 0.5 }: { children: ReactNode; at?: number }) => (
  <motion.div style={{ transformOrigin: '50% 0%' }} initial={{ opacity: 0.01, y: 40, scale: 0.975 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: at, duration: 1.2, ease: outExpo, opacity: { delay: at, duration: 0.6 } }}>{children}</motion.div>
)
```

**3. `layoutId` pill** (nav indicator; measured 200-550ms; spring 420/36 is Kestrel's value)

```tsx
export function Nav({ items }: { items: string[] }) {
  const [on, setOn] = useState(items[0])
  return (
    <ul onMouseLeave={() => setOn(items[0])} className="relative flex">
      {items.map((l) => (
        <li key={l} className="relative">
          {on === l && <motion.span layoutId="pill" className="absolute inset-0 rounded-lg bg-white" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
          <a href="#" onMouseEnter={() => setOn(l)} onFocus={() => setOn(l)} className="relative px-3.5 py-2">{l}</a>
        </li>
      ))}
    </ul>
  )
}
```

**4. Count-up** (<= 1s, once, when in view, tabular figures; attio 933ms; reduced motion shows the final value)

```tsx
export function CountUp({ to, ms = 900, format = (n: number) => Math.round(n).toLocaleString('en-US') }: { to: number; ms?: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -24% 0px' })
  const reduce = useReducedMotion()
  const v = useMotionValue(reduce ? to : 0)
  const text = useTransform(v, format)
  useEffect(() => { if (inView && !reduce) { const c = animate(v, to, { duration: ms / 1000, ease: [0.33, 1, 0.68, 1] }); return () => c.stop() } }, [inView, reduce, to, ms, v])
  return <motion.span ref={ref} className="tabular-nums">{text}</motion.span>
}
```

**5. Route draw with landing dot** (Kestrel: dot appears 80ms before the stroke arrives, then starts breathing)

```tsx
export function Route({ d, x, y, delay = 1.5, draw = 1.1 }: { d: string; x: number; y: number; delay?: number; draw?: number }) {
  return (
    <g>
      <motion.path d={d} fill="none" stroke="currentColor" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { delay, duration: draw, ease: [0.65, 0, 0.35, 1] }, opacity: { delay, duration: 0.3 } }} />
      <motion.circle cx={x} cy={y} r={3} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: delay + draw - 0.08, duration: 0.6, ease: outExpo }} />
    </g>
  )
}
```

**6. Scroll reveal group** (top at ~76% of the viewport = margin -24%; 80ms step; 470ms; <= 20px; 2px blur)

```tsx
const group = { hidden: {}, show: { transition: { delayChildren: stagger(0.08) } } }
const item = {
  hidden: { opacity: 0.01, y: 12, filter: 'blur(2px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.47, ease: outCubic } },
}
export const RevealGroup = ({ children }: { children: ReactNode }) => (
  <motion.div variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -24% 0px' }}>{children}</motion.div>
)
export const RevealItem = ({ children }: { children: ReactNode }) => <motion.div variants={item}>{children}</motion.div>
```

**7. Tab content crossfade** (exit about half of enter; commslayer 220 out / 450 in)

```tsx
export function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={id} initial={{ opacity: 0, filter: 'blur(4px)', y: 9 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, filter: 'blur(4px)', y: -9, transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } }}>{children}</motion.div>
    </AnimatePresence>
  )
}
```

**8. Bento hover** (peers rarely lift panels: 150ms border/background on the card, a small nudge on inner media only; drop the nudge to match the measured norm)

```tsx
export const BentoCard = ({ children }: { children: ReactNode }) => (
  <motion.article whileHover="hover" className="group rounded-2xl border border-black/10 bg-white transition-[border-color,background-color] duration-150 ease-[cubic-bezier(.4,0,.2,1)] hover:border-black/20">
    <motion.div variants={{ hover: { scale: 1.015 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}>{children}</motion.div>
  </motion.article>
)
```

**9. Marquee with pause** (24-51 px/s; pauses on hover and offscreen; static under reduced motion; `width` is the width of one copy of the track)

```tsx
export function Marquee({ children, width, pxPerSec = 40 }: { children: ReactNode; width: number; pxPerSec?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '100px' })
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const ctl = useRef<ReturnType<typeof animate> | null>(null)
  useEffect(() => {
    if (reduce) return
    ctl.current = animate(x, -width, { duration: width / pxPerSec, ease: 'linear', repeat: Infinity, repeatType: 'loop' })
    return () => ctl.current?.stop()
  }, [reduce, width, pxPerSec, x])
  useEffect(() => { if (inView) ctl.current?.play(); else ctl.current?.pause() }, [inView])
  return (
    <div ref={ref} className="overflow-hidden" onMouseEnter={() => ctl.current?.pause()} onMouseLeave={() => inView && ctl.current?.play()}>
      <motion.div style={{ x }} className="flex w-max">{children}{children}</motion.div>
    </div>
  )
}
```

**10. Reduced motion** (opacity stays; travel, blur, scale and loops go)

```tsx
export const Root = ({ children }: { children: ReactNode }) => <MotionConfig reducedMotion="user">{children}</MotionConfig>
export function useTravel(px: number) { return useReducedMotion() ? 0 : px }
```

**11. Digit roll** (stripe: per-digit slide 325ms, 50ms apart; real text stays in `aria-label`)

```tsx
export function DigitRoll({ value }: { value: string }) {
  return (
    <span className="inline-flex overflow-hidden tabular-nums" aria-label={value}>
      {value.split('').map((c, i) => (
        <motion.span key={`${i}-${c}`} aria-hidden initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ delay: i * 0.05, duration: 0.325, ease: outCubic }}>{c}</motion.span>
      ))}
    </span>
  )
}
```

**12. Stroke draw** (signature or underline; commslayer 1091ms then a 500ms second stroke)

```tsx
export const Stroke = ({ d, delay = 0.98 }: { d: string; delay?: number }) => (
  <motion.path d={d} fill="none" stroke="currentColor" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
    transition={{ delay, duration: 1.09, ease: [0.28, 0.12, 0.5, 0.92] }} />
)
```

**13. Offscreen pause for CSS loops** (8 of 9 measured sites do not; apply to any `animation: ... infinite`)

```tsx
export function useOffscreenPause<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { margin: '120px' })
  return { ref, style: { animationPlayState: inView ? 'running' : 'paused' } as const }
}
```

**CSS-first hero entrance** (the grammar of the six CSS-keyframe pages; starts before FCP, LCP-safe, reduced-motion safe; `--i` is the block index)

```css
.hero-in {
  animation: hero-in 1000ms cubic-bezier(.16, 1, .3, 1) backwards;
  animation-delay: calc(var(--i, 0) * 100ms + 100ms);
}
@keyframes hero-in {
  from { opacity: .01; transform: translateY(20px); }
  to   { opacity: 1;   transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-in { animation: hero-in-reduced 200ms ease-out backwards; animation-delay: 0ms; }
  @keyframes hero-in-reduced { from { opacity: .01; } to { opacity: 1; } }
}
```

[engine note] The CSS block mirrors dub's measured grammar (1000ms, `(.16,1,.3,1)`, 100ms step, 20px) with the 0.01 start from the LCP experiment and a 200ms opacity-only reduced variant; it has not been run against `tools/check.mjs`.
