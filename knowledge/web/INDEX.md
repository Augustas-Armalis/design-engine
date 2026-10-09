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

## Variety and premium dark (studied 2026-10-09, measured with Playwright)

| File | What it covers | Status |
|---|---|---|
| `button-grammars.md` | 16 button grammars measured on 32 sites (flat pill, glass, keycap, push, inner glow, spectrum edge, lamp-lit ink, auth stack, compact rectangle, mono caps, arrow morph, icon tile, chip row, arrow link, slide swap, spotlight), light + dark recipes, 12 rules; CSS in `system/variety/buttons.css` | studied |
| `nav-grammars.md` | 14 nav grammars measured on 61 sites (hairline glass bar, floating capsule, centred island, scroll morph, mono operator, utility strip, hanging sheet, proof chips, command search, section index, micro strip, centred wordmark, brand band, text-only editorial), 11 rules; specimen `system/variety/navs.html` | studied |
| `type-voices.md` | 16 type voices from 50 measured hero headlines (premium h1 weight is mostly 400-450), exact hero specs, fontsource packages, 11 rules; data `system/variety/type-voices.json` | studied |
| `dark-mode-premium.md` | 19 dark folds measured: light sources, colour budget, product-window edges, dark buttons, hover, grain; 16 rules; six bound dark recipes in `system/variety/dark-recipes.json` | studied |

Pick a fresh combination across these with `node tools/variety.mjs pick --mode dark|light --seed <name>`.
- `logo-craft.md`: how abstract/geometric marks are built (12 families with recipes and numbers, amateur-vs-pro checklist, lockup pairing spec, 9-step test protocol, LG-01..28). Pairs with `system/logo/families.json` and `tools/logo.mjs`.
- `logo-anatomy-measured.md`: 32 shipped marks and 30 live navs measured (parts, coverage, aspect, min stroke/gap vs 16px survival, angles, radii ratios, symmetry, lockup ratios), LA-01..20. Targets in `system/logo/anatomy.json`; checker `node tools/logo_measure.mjs <mark.svg>` (exit 1 on fail).
