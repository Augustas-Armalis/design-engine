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
- `product-ui-deep.md`: premium product UI measured on 122 pages + 20 product shots (Linear, Attio, Geist/Vercel, Cursor, Dub, Cal.com, Kargul, Rico, Campsite vs the shadcn baseline): the five numbers that make "template look" (sidebar width, row pitch, icon size/stroke, table row, KPI size), type roles, grey ramps, overlay shadow tiers, concentric menus, command palette, tables, row anatomies, agent work rows, buttons, badges, micro-details; PU-01..40 incl. an 11-point audit (PU-39). Tokens in `system/product-ui/tokens.json`, 14 screen archetypes in `system/product-ui/screens.md`.
- `logo-drawing.md`: how marks are actually DRAWN (studio process: wide exploration then a separate refinement phase; curve tension vs circle; node discipline; tapered strokes; continuous corners; junction thinning; optical pass; the signage test that caught the Tandem marks; 15 custom-wordmark edits), LD-01..30. Method in `system/logo/drawing-method.md`; tools `tools/logo_drawkit.cjs` (paper.js drawing kit + sweep sheets) and `tools/logo_curves.mjs` (curve QA). First full use: `work/halyard/brand/` (CONCEPTS -> sweep -> draw -> present).
- `effects-materials.md`: smooth corners (Figma 60% = Apple; CSS corner-shape fit, Chromium-only), measured shadows (light median alpha .08 blur 5; dark .12 blur 20 + inset ring + top highlight), coloured-button shadows, glass ranges, grain, gradients in oklab, looping-effect restraint, EF-01..43. Code: `system/effects/squircle.ts` (+ tests), `shadows.css/.json` (5 tiers light + dark), `textures.css`.
- `bento.md`: 30+ live bento sections measured (Apple, Stripe, Ramp, Notion, Cursor, Lovable, Cal, Spline, Resend, Linear, Dub, Mercury...): pick the layout from the number of claims (BE-01), one-sentence two-tone titles, radius as brand voice with gap 0.7-2.5x radius, hover never lifts the tile, equal-height mobile stacks, hero tile = surface + overlay doing the action, dark bento = lit edges, live counters over static claims, the 8-trait template test (BE-32), BE-01..32. Layouts in `system/sections/bento-layouts.json`, 28 cell visuals C01-C28 in `system/sections/bento-cells.md`. Extends `bento-craft.md`.
- `section-anatomy.md`: every marketing-site section measured on 43 homepages + 97 inner pages + 6 Framer templates: section count (median 10) and order (logos after hero, ends on CTA), the 5 near-universal sections, variants per type with frequencies, heading 48px/500/-0.02em, section padding 96, heading-to-content 64, testimonials (11 variants), stat bands, pricing (ruled grids, toggles), comparison tables, FAQ, closing CTA, changelog/blog/careers; SA-01..48. Machine-readable in `system/sections/variants.json`.
- `footers.md`: 49 footers: 5 layouts + 17 features with frequencies (logo column + link columns 19/43, giant wordmark 12%, live status pill 19%, CTA merged 7), link type and pitch, dark/light switch; FT-01..20.
- `x-design-posts.md`: how design is posted on X, measured on 29 designers / 1,161 posts + 40 embeds: one artifact per post, video 55% (9-16 s), X crops (1: own ratio; 2: 7:8 each; 3: 7:8 + two 16:9; 4: four 16:9), solid near-white/near-black canvases, captions (median 14 words, no hashtags, link in first reply), engagement by caption type and format, X ranking weights; XP-01..28. Formats + caption templates in `system/variety/x-post-formats.json`.
- `basit-craft.md`: Basit A. Khan measured (59 pieces): rendered light field from one corner, grain only in the light, -0.05em display, 48-56px lit buttons, product cropped at 48-66% of the fold in the light; BA-01..27. Numbers in `system/variety/basit-tokens.json`.

## AI generation products and ad research (studied 2026-10-15, from Sellify client research)

Desk research only (docs, help centres, reviews; no hands-on competitor screens), plus Sellify's own code and studio kit spec. Open questions keep every "not documented" and VERIFY item.

| File | What it covers | Status |
|---|---|---|
| `ai-video-ad-creator-flows.md` | AI generation flows (Creatify, Arcads, HeyGen, Higgsfield vs Sellify): cheapest preview before spend, anchor view first, cost on the primary button, link-fill brief, hover-playing templates, one-photo characters, demo autofill, name after approval, no review gate, dedicated library + picker reuse, owning the wait, failure states, finished screen that continues the job; AV-01..19 | studied |
| `ad-intelligence-flows.md` | Ad libraries and swipe files (Foreplay, Atria, Motion vs Sellify Ad Spy): user-vocabulary filters + starter presets, explained winning signals, curated cold start, one-click follow + expectations + unseen counts, brand page summary and launch cohorts, save with note and tags, inline boards, private-by-default sharing, extension save states, recreate from the card and save toast; ADI-01..19 | studied |
| `approval-and-generation-ui.md` | The reusable approve-what-AI-made screen (Sellify studio kit, ENG-2105 round 2, founder 2026-10-14/15): tile anatomy, closed status vocabulary, blur + sweep pending, redo with note and price, n of N gate, sticky cost footer, grid breakpoints and content volume, tile-level failure, 36px r12 controls, 12/14/18 at 450/500, media ratios, motion tokens, pre-handoff audit; APR-01..18 | studied |
