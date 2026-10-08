# knowledge/web INDEX

Web-sourced notes (not from the corpus books). Format follows `../SCHEMA.md`. Provenance legend: **(verified)** read in primary docs/source; **(opinion)** author taste; **[engine note]** synthesis, tune with ledger feedback.

## Motion and animation (studied 2026-10-08)

| File | What it covers | Status |
|---|---|---|
| `motion-and-animation.md` | HUB: principles, frequency rule, duration/easing/spring theory, token table by UI role, Material 3 + Apple + Emil numbers, rules with Why/Check, judgement calls, 30-item "looks cheap" checklist (section 8) | studied |
| `motion-library-react.md` | Motion (motion.dev) v14.0.0: springs, layout/shared layout, AnimatePresence, variants/stagger, useScroll, gestures/drag/Reorder, reduced motion, LazyMotion; GSAP 3.15.0 + ScrollTrigger + useGSAP; code snippets | studied |
| `motion-css-native.md` | transitions/keyframes, `@starting-style` + `allow-discrete`, `linear()` springs (generated curves), scroll-driven animations, View Transitions (same-doc + MPA), `interpolate-size`, compositor/will-change | studied |
| `motion-a11y-perf-loading.md` | prefers-reduced-motion map, WCAG 2.2.2/2.3.1/2.3.3, performance/INP/layout thrash, skeletons and optimistic UI, landing page-load orchestration, scroll storytelling pitfalls, test recipes | studied |
| `motion-tokens.json` | design-engine motion token proposal (durations, easings, springs, roles, stagger, personality, reduced motion, lint regexes) | proposal |

## Read order for the engine
1. Hub sections 1-3 + 8 (always loaded for any build). 2. `motion-tokens.json` (data). 3. Library/CSS files only when implementing. 4. a11y/perf file for review and landing pages.

## Known gaps (see section 7 of each file)
Apple HIG motion page and m3.material.io were client-rendered and unreadable (values taken from Android/material-web/androidx primary sources and WWDC18); Dan Saffer's book and animations.dev paid content not read; Paco Coursey and Benji Taylor yielded little numeric content; several engine-note claims (LCP opacity-0 behavior, FLIP, scheduler.yield, ScrollTrigger refresh) are from general knowledge and flagged.
