---
source: web:https://github.com/AdrianKrebs/design-slop-cop, web:https://www.adriankrebs.ch/blog/design-slop/, web:https://github.com/pbakaus/impeccable, web:https://github.com/Nutlope/hallmark, web:https://github.com/Leonxlnx/taste-skill, web:https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md
chapter: Proposed measurable AI-tell detector (page-level, batch-level, screenshot-level, copy-level)
pages: n/a (web)
topic_tags: [detector, playwright, dom, css, screenshots, similarity, thresholds, tests]
status: studied
---

# Proposed AI-tell detector for the design-engine `tools/` layer

Thresholds below come from `[verified-local]` Impeccable v4.1.1 (`~/.agents/skills/impeccable/scripts/detector/`) and `[fetched]` design-slop-cop pattern files unless marked `[engine note]` (my proposal). Companion notes: `anti-ai-slop.md` (why, sets, thresholds table), `anti-ai-slop-process.md` (ledger, dice, evaluator). Existing sibling files in this folder (`measurable-assertions.md`, `teardown-measure.js`) were written by other agents in this session; reconcile ids with them before implementation, I did not read them.

## 1. Core ideas

1. **Three layers, because the failure has three scopes.** (A) page tells: deterministic DOM/CSS checks that public tools already do; (B) batch/cross-run sameness: Larpo's actual failure, which no public tool measures; (C) rendered-pixel sameness: catches what tokens miss. Copy (D) is a fourth, regex-able layer.
2. **Prefer the rendered DOM.** Impeccable's CLI does static analysis on files but drives a real Chrome for URLs; reportedly ten rules only fire after a real render (text occlusion, computed layout) [secondary: botmonster.com summary]. Krebs's tool is Playwright-only. We already render with Playwright, so run in-page.
3. **Report counts and evidence, never a verdict from one hit.** FP rate 5-10% (Krebs). Triage tiers 0-1 / 2-3 / 4+ matches Krebs's blog; adopt `warn` at 3, `fail` at 5 for tell-count in the first viewport (aligned to Larpo's own Gate 5: three matches review, five reset) `[engine note]`.
4. **Batch checks are the novelty.** A 7-concept batch is judged on pairwise fingerprint distance and axis collisions; a run is judged against the ledger's last 3 fingerprints (Hallmark-style).
5. **Calibrate on Larpo's own evidence.** The r5 batch (all Geist body; 5/7 Geist headline; headline 62/64/70/72/76/78/83px; lh 0.91-0.96; tracking -0.052 to -0.064em; nav 46-52px from edge in 6/7; rounded CTA in 7/7; floating proof card in several; coral accent in 4/7) must FAIL the batch checks; a hand-picked set of diverse human-designed sites must pass. Without that positive and negative control the thresholds are guesses.

## 2. Rules (checks)

Each check: **id**, what, threshold, measurement, severity (`fail` blocks delivery; `warn` goes to critique; `info` logged). "In-page" = `page.evaluate` in Playwright on a 1440x890 viewport, animations settled (`prefers-reduced-motion: reduce` + wait for fonts), plus a 390x844 pass for responsive checks.

### Part A - page-level tells (deterministic)

**Typography**
- **D-FONT-1 overused family.** Resolve the *rendered* family (first family in `font-family` that `document.fonts.check` confirms loaded) for H1, H2, body (modal font by character count). Compare to OVERUSED set (anti-ai-slop.md 3.1). `warn` if H1 or body in set; `fail` if H1 AND body AND nav all share one overused family (the Larpo "Geist everywhere" case). Exempt when `location.hostname` is the brand's own domain. Source: Impeccable OVERUSED_FONTS; slop-cop `slop_fonts` (>= 25% of text).
- **D-FONT-2 family count and role.** Count distinct families by text share. `info`: 1 family = fine if scale/weight contrast exists (see D-TYPE-4); `warn`: > 3 families.
- **D-FONT-3 italic/serif display H1.** H1 computed `font-style: italic` AND family classified serif (or in Fraunces/Playfair/Recoleta/Newsreader/Instrument Serif list) AND size > 48px. `warn`. Source: Impeccable `italic-serif-display`.
- **D-TYPE-1 crushed tracking.** For any text node > 20 chars: `letter-spacing / font-size <= -0.05em` -> `fail`; `< -0.04em` -> `warn` (craft floor). Larpo r5 (-0.052..-0.064em) fails.
- **D-TYPE-2 oversized H1.** `font-size >= 72px` AND `textContent.length >= 40` AND (`rect.height >= 0.28 * vh` OR `rect.height*rect.width >= 0.25 * vw*vh`) -> `warn`. Also `warn` if any display text > 96px.
- **D-TYPE-3 headline word accent.** Largest heading (>= 32px, <= 140 chars) in the first viewport contains child runs differing in family, italic/roman or colour (quantise colour to 24 steps per channel; gradient-clip counts) -> `warn`. Source: slop-cop `hero_font_mix`.
- **D-TYPE-4 flat hierarchy.** Distinct computed sizes over h1-h6,p,span,a,li,td,th,label,button,div; if >= 3 sizes and max/min < 2.0 -> `warn`; also report min step ratio between adjacent sizes < 1.25. Source: Impeccable `flat-type-hierarchy`.
- **D-TYPE-5 measure and leading.** Body paragraph line length > 80 chars (Anthropic) or > 75ch (Impeccable) -> `warn`; body `line-height/font-size < 1.4` -> `warn`; headings in 1.1-1.25 expected (SCHEMA example). Source: craft-floor; SKILL.md.
- **D-TYPE-6 sentence-case consistency** `[engine note]`: classify nav/button/label text as lower / sentence / Title / UPPER; `warn` if > 1 class among functional labels, or if lowercase-everything (>= 90% lowercase initial across nav+buttons+headings) unless the wordmark is the only one.

**Colour**
- **D-COLOR-1 vibe purple.** Any filled CTA, link, or gradient stop with hue 245-300 deg (indigo to purple) and saturation >= 0.3. `warn` (slop-cop `purple_accent` requires >= 1 filled accent). Impeccable `ai-color-palette` also flags cyan-on-dark.
- **D-COLOR-2 gradient load.** Hero H1 `background-clip:text` with gradient -> `warn` (Impeccable bans gradient text); >= 4 elements with `background-image` gradient -> `warn`. Radial gradient fading to transparent, chroma > threshold, on a dark page (`radial-halo`) -> `warn`.
- **D-COLOR-3 cream ground.** Body (or the dominant above-fold surface by area) background passes Impeccable `isCreamColor`: min(r,g,b) >= 209, r >= g >= b, 6 <= r-b <= 48 -> `warn`; escalate to `fail` in combination with D-FONT-3 or an accent in the terracotta/coral band (see below). Also check banned hexes from taste-skill list (exact match).
- **D-COLOR-3b terracotta/coral accent.** Accent candidate = most-used saturated colour on interactive elements; in HSL hue 8-25 deg, S 45-80%, L 45-62% (covers #D97757, #C96442, #B6553A, coral) -> `info` alone, `warn` with D-COLOR-3. `[engine note]` thresholds.
- **D-COLOR-4 perma-dark with grey body.** Body bg luminance < 0.2 AND >= 12% of body text (12-20px, weight <= 600) below 7:1 -> `warn`. Source: slop-cop `perma_dark_mode`.
- **D-COLOR-5 pure black/white and untinted greys** `[engine note]`: `#000`/`#fff` text-on-ground, greys with chroma < 0.005 in OKLCH -> `info` (Impeccable and taste-skill both prefer tinted neutrals; Resend is a counterexample using #000000/#FDFDFD, so `info` only).
- **D-COLOR-6 accent role count** `[engine note]`: the accent hue is used for > 4 distinct roles (link, button, badge, icon, highlight, chart) -> `warn` (Larpo critique language: "accent used for five roles").
- **D-COLOR-7 grey on colour.** Text with chroma ~0 on a coloured ground -> `warn`. Source: Impeccable `gray-on-color`.

**Surfaces and effects**
- **D-SURF-1 glassmorphism.** `backdrop-filter: blur(>=2px)` on an element 150-820 wide, 40-900 tall, bg alpha 0.02-0.9, not a sticky edge bar (within 20px of viewport edge, width >= 0.85 vw) -> `warn`. Floating pill nav (rounded >= 999px, not at edge) with blur -> `warn`.
- **D-SURF-2 coloured glow.** >= 2 elements with non-grey `box-shadow` blur >= 15px -> `warn`; zero-offset coloured halo ("dark-glow") -> `warn`.
- **D-SURF-3 side stripe.** `border-left/right > 1px` coloured on card/callout, or narrow (2-10px) full-edge pseudo-element, saturation >= 0.2 -> `warn`. Top-stripe variant too. Source: Impeccable `side-tab`, slop-cop `accent_stripe`.
- **D-SURF-4 nested cards / ghost card.** Card (radius >= 8px with border or shadow) containing another such element -> `warn`; 1px border + shadow blur >= 20px on same element -> `warn`.
- **D-SURF-5 grid/stripe/grain backgrounds.** `repeating-linear-gradient` stripes, two-axis hairline grid overlays, `feTurbulence` filters -> `warn` unless the page contains a canvas/map/blueprint element (Impeccable). Fixed full-viewport noise overlay -> `warn`.
- **D-SURF-6 hard offset shadow** (`box-shadow: Npx Npx 0`) -> `info` unless brutalist world declared.
- **D-SURF-7 radius monoculture** `[engine note]`: one border-radius value covers > 70% of rounded boxes *and* equals 12-16px -> `info` (Canatselis tell: "same 16px radius and 24px padding everywhere"). Pills (>= 999px) on non-small controls -> `warn` (Impeccable: pills only for small controls).

**Layout and components (slop-cop + Impeccable)**
- **D-LAYOUT-1 centred hero in generic sans.** Hero region (above-fold blocks) with >= 60% of area centre-aligned (or H1 centred and hero >= 40% centred) AND family in the generic-sans list -> `warn`.
- **D-LAYOUT-2 hero eyebrow/pill.** Element within 220px above H1, 40-600 x 16-56px, text 3-80 chars, with pill radius or bg alpha >= 0.05 or border >= 1px alpha >= 0.15; OR uppercase letter-spaced text <= 320px wide -> `fail` (Larpo has already rejected eyebrow-by-reflex; Impeccable calls it an outright ban).
- **D-LAYOUT-3 kicker above any heading.** Same test for all h2/h3; count; `warn` if count > ceil(sectionCount/3) (taste-skill) -> `fail` if > half of sections.
- **D-LAYOUT-4 icon tile above heading.** Small rounded-square container (24-64px) with an svg/img child directly above a heading in a card -> `warn` (Impeccable `icon-tile-stack`); >= 3 identical siblings (feature-card trio) -> `warn`.
- **D-LAYOUT-5 template chrome strings** `[engine note from Anthropic SKILL.md]`: text matching `\s[·•]\s` (middle-dot meta strings) >= 2 occurrences; `^[A-Z][A-Za-z ]+ — .+$` "WORD - fragment" labels; link/button text ending in `→ ↗ ›` on > 50% of CTAs -> `warn`; monospace small label (< 13px, `font-family` mono, uppercase) above headings -> `warn`.
- **D-LAYOUT-6 stat banner.** 3-6 sibling boxes, row >= 300px wide, each with a prominent number (font >= 22px, text <= 10 chars) -> `warn`. Source: slop-cop `stat_banner_row`.
- **D-LAYOUT-7 numbered steps.** >= 3 ascending numeric markers in reading order (font >= 14px or boxed >= 24px) -> `info`/`warn` if not a genuine sequence (cannot be known; flag for critique). Source: slop-cop `numbered_steps`; Impeccable `numbered-section-labels` (advisory).
- **D-LAYOUT-8 FAQ accordion.** >= 3 `<details>` grouped, or a heading matching `^(faq|frequently asked questions?|common questions?|q\s*&\s*a)\b` with >= 3 uniform children starting with a question word, in the lower half -> `info` (it may be genuinely needed).
- **D-LAYOUT-9 stock section order** `[engine note]`: classify section roles in order (hero, logos, features, testimonial, pricing, cta); if sequence is a subsequence-match of hero-logos-features-testimonial-pricing-CTA with >= 5 of 6 in order -> `warn`.
- **D-LAYOUT-10 equal-card monoculture.** >= 3 siblings with the same width/height (+/-2px) and same child structure, appearing in >= 2 sections -> `warn` (taste-skill: layout families should not repeat).
- **D-LAYOUT-11 hero density.** Count text-bearing elements in hero > 4, or headline lines > 2 on desktop, or subtext > 20 words -> `info` (taste-skill opinion).
- **D-LAYOUT-12 monotonous spacing.** Collect padding/margin/gap values (round to 4px); >= 10 samples with one value > 60% and <= 3 distinct -> `warn`. Source: Impeccable `monotonous-spacing`. (Run on computed styles, not just inline CSS.)
- **D-LAYOUT-13 edge padding and nav archetype fingerprint** `[engine note]`: record `left padding of nav and hero text` px and nav archetype (`logo-left | center-links | cta-right` boolean triple). Not a tell alone; used by batch checks.
- **D-LAYOUT-14 floating proof card** `[engine note]`: absolutely/fixed-positioned element with border-radius >= 12px and box-shadow, overlapping a hero image (intersection area > 10% of the image), width < 40% of viewport -> record as `proof_card=true`; `warn` if batch share > 2/7.
- **D-LAYOUT-15 emoji/glyph icons.** Nav/sidebar links with emoji (>= 40% of >= 3 links) -> `fail`; emoji or unicode glyph used as icon in feature items -> `warn`.

**Motion and craft**
- **D-MOTION-1** `transition`/`animation` with `cubic-bezier` overshoot (any control point y > 1 or < 0) or "bounce"/"elastic" -> `warn`. Infinite `animation` on a dot <= 12px (`pulsing-dot`) -> `warn`. Marquee (continuous auto-scroll, > 1 per page) -> `warn`. Image `:hover` transform scale/rotate -> `info`.
- **D-MOTION-2** Same entrance on every section: count elements with identical `animation-name`+duration+distance; > 5 sections -> `warn` (Anthropic: avoid fade-and-slide-up entrances on every section).
- **D-CRAFT-1 browser-surface theming** (Impeccable, unique): presence of `::selection` colour, `caret-color`, `scrollbar-color` or `::-webkit-scrollbar`, `:focus-visible` outline with non-default colour, `text-underline-offset`, `font-variant-numeric: tabular-nums` on numeric UI. Report as a score 0-6; `info` below 3.
- **D-CRAFT-2** contrast (4.5:1 body, 3:1 large), tiny text (< 12px body), skipped heading level, text overflow, text occlusion (rect intersection of text nodes with later positioned elements), content invisible at rest (opacity 0 / off-screen at load), broken/placeholder images, console errors. Use Impeccable `quality` rules or reimplement.
- **D-CRAFT-3 fake product UI** `[engine note from taste-skill]`: hero "screenshot" built from divs (many absolutely-positioned small boxes, no `<img>/<canvas>/<video>`) -> `warn`; sketch-style inline SVG scenes / shape-assembled illustration (large inline SVG, many primitives, no `<text>`) -> `warn`.

### Part B - batch and cross-run fingerprint (the gap)

Extract a **fingerprint** per page (all computed in-page):

| field | how |
|---|---|
| `h1.family`, `body.family`, `nav.family` | rendered family (normalised lower-case) |
| `h1.px`, `h1.lh`, `h1.tracking_em`, `h1.weight`, `h1.align` | computed on H1 at 1440 |
| `type.voice` | classifier: grotesk / humanist / neo-grotesk / serif / slab / condensed / mono+sans / variable-display (lookup table by family name) |
| `edge.px` | min left x of nav items and hero text |
| `nav.archetype` | booleans: logo left, links centre (links' centroid within +/-10% of viewport centre), CTA right; plus `pill`, `floating`, `blur`, `height` |
| `cta.radius`, `cta.fill`, `cta.arrow` | primary CTA computed radius (bucket 0/<8/<=14/<=24/pill), filled?, trailing arrow glyph/svg? |
| `ground.band`, `ground.hue`, `accent.hue` | ground luminance band (dark < 0.2 / mid / light > 0.8) and OKLCH hue bucket (30 deg bins); accent = most-used saturated interactive colour |
| `palette.family` | map to named families (cream-coral-cobalt, black-neon, mono, botanical...) by hue/chroma/lightness clusters |
| `hero.structure` | from layout box analysis: `full-bleed-image`, `split-left-copy-right-visual`, `centered-stack`, `rail`, `editorial-spread`, `product-window`; derived from bounding boxes of H1, largest media, largest card |
| `proof.mode` | `floating-card`, `inline-stat`, `logo-row`, `testimonial`, `product-ui`, `none` |
| `media.kind` | photo / illustration / video / canvas-webgl / div-ui / none |
| `radius.mode` | most common radius bucket |
| `copy.shape` | H1 words, sentence vs fragment, ends with period?, casing class |

**Batch checks (ids B-*)**, all `fail` at batch level (match Larpo's own rejection rules):
- **B-AXIS-1** more than 2 pages share `type.voice` for H1 -> fail.
- **B-AXIS-2** more than 2 share `nav.archetype` (triple) -> fail.
- **B-AXIS-3** more than 2 share CTA silhouette (`radius` bucket x `fill` x `arrow`) -> fail.
- **B-AXIS-4** accent hue bin leads in > 2 -> fail; same `palette.family` in > 2 -> fail.
- **B-AXIS-5** `h1.px` std-dev across batch < 6px or all within an 24px band (r5: 62-83 = 21px) -> fail; tracking range < 0.015em -> fail. `[engine note]` bands.
- **B-AXIS-6** `edge.px` identical (+/-6px) in > 3 pages -> warn (r5: 46-52).
- **B-AXIS-7** `proof.mode=floating-card` in > 2 -> fail.
- **B-AXIS-8** same body family on > 4 pages -> warn (r5: 7/7 Geist).
- **B-ROW** no two pages may match on more than 2 of the first six axes of the 2026-09-01 divergence matrix (hero class, structure, type voice, palette temperature, CTA grammar, proof mode); compute pairwise `matches(a,b)` over those six fingerprint-derived fields; fail if any pair > 2.
- **B-DIST** pairwise fingerprint distance matrix `d(a,b)` = weighted Hamming/normalised distance over categorical fields + normalised numeric differences; fail if any pair `d < 0.35` or the batch mean `< 0.5` `[engine note, calibrate on r5 and a human-diverse control set]`.
- **B-LEDGER** vs last 3 ledger entries: must differ on >= 1 of {structure, ground band, accent hue bin, type voice, nav archetype} (Hallmark rule) and `d >= 0.35` to each.
- **B-TRANSPLANT** semi-automatic: replace company name and H1/sub copy with a fixed neutral string via DOM mutation, re-screenshot, compare to the original in grayscale at 24px blur; pages whose structure/tokens fail to change visually are "infrastructure only". Output list of surviving elements for human circling (Larpo Gate 12). Lower value; do last.

### Part C - screenshot-level similarity (rendered pixels)

At 1440x890 first viewport (and 390x844):
- **C-1 grayscale + 24px Gaussian blur thumbnails**: compute (a) SSIM and (b) mean-absolute difference between all pairs; (c) a perceptual hash (pHash 64-bit) Hamming distance; flag pairs with SSIM > 0.75 or pHash distance < 10 `[engine note thresholds; calibrate]`. Matches Larpo's 2026-09-01 "hard to distinguish after grayscale + blur" rule.
- **C-2 focal map**: spectral-residual or edge-density saliency; centroid and area of top-15% salient region; flag pairs with centroid distance < 0.1 of diagonal AND similar area.
- **C-3 value histogram and dominant-colour palette**: 5-colour k-means in OKLab; flag pairs with mean palette distance below a floor and same luminance band.
- **C-4 embedding distance** (optional): CLIP/SigLIP image embedding cosine distance; flag > 0.9. Slower, better semantic coverage.
- **C-5 25%-scale legibility**: downscale to 25%, require measurable contrast between H1 block and ground (area-weighted) and a single dominant focal region (top saliency region area share > 0.3).
- **C-6 batch contact sheet** as artifact; saved to `evals/`.

### Part D - copy (regex and counts; run on visible text)

- **D-COPY-1 buzzwords:** streamline, empower, supercharge, world-class, enterprise-grade, next-generation, cutting-edge, revolutionize/revolutionary, game-changing, seamless(ly), unleash, elevate, "in today's fast-paced", "in the ever-evolving", "gone are the days" -> `warn` per hit, `fail` at >= 4 (list = Impeccable `marketing-buzzword` + taste-skill filler verbs + secondary ban lists).
- **D-COPY-2 aphoristic cadence:** >= 3 sections whose last sentence is <= 5 words after a longer sentence and matches `^(no|not|just|only|never|stop|start)\b` or the `X. Y.` contrast form (e.g. "Not a feature. A platform.") -> `warn`; also `no \w+\. no \w+\. just \w+` triple -> `warn`.
- **D-COPY-3 em-dash saturation:** >= 8 em-dashes (or ` -- `) and density >= ~1 per 500 body chars -> `info` (advisory only; humans use them). taste-skill bans all em-dashes visible; make configurable.
- **D-COPY-4 "theater" framing and mad-lib headlines:** `\btheater\b` dismissive usage; H1 matches `^The (AI-powered |all-in-one )?.+ for (modern|teams|everyone)` -> `warn`.
- **D-COPY-5 fake-precise numbers:** `99\.9+%`, `\d+(\.\d)?x`, `\d+K\+`, `4\.9★`, "10,000+" without a nearby source link or "sample/mock" label -> `warn`; "Jane Doe", "Acme", "Nexus", "Lorem" -> `fail`.
- **D-COPY-6 duplicate CTA intents:** cluster CTA labels by synonym groups ("Get started / Try free / Sign up free"; "Contact us / Let's talk / Get in touch"); > 1 cluster-duplicate per page -> `info`; primary labels > 3 words -> `info` (taste-skill).
- **D-COPY-7 specificity ratio** `[engine note]`: share of H1+sub sentences containing a digit, a proper noun or a unit (hours, %, $, named integration); < 25% -> `warn`. Weak proxy; keep for trend, not gating.
- Semantic copy checks that scripts cannot do (does the founder say this aloud; objection/proof mapping) stay with the evaluator agent.

## 3. Numbers & scales

Thresholds are in the rule text above and in `anti-ai-slop.md` section 3.2. Summary of the tiering:

| Level | Page rule | Batch rule |
|---|---|---|
| pass | <= 2 `warn` tell-families in first viewport, 0 `fail` | all B-* pass |
| review | 3-4 distinct tell families (Krebs Medium/High boundary, Larpo Gate 5) | any B-* warn |
| reset | >= 5 families or any `fail` (eyebrow/pill, crushed tracking, emoji nav, glyph-icons) | any B-* fail |

Tell **families** group correlated checks so one root cause is not counted 5 times: `font` (FONT-1,2,3, TYPE-3), `color` (COLOR-1,2,3,4), `surface` (SURF-*), `chrome` (LAYOUT-2,3,5,15), `scaffold` (LAYOUT-4,6,7,8,9,10), `type-scale` (TYPE-1,2,4), `motion` (MOTION-*), `copy` (COPY-*).

## 4. Dos and Don'ts

- Do run the detector on **rendered pages from Playwright**, with entrance animations settled; a hidden-by-animation element reads as missing (Impeccable capture-validity rule).
- Do keep per-rule `ignore` with a written reason (Impeccable supports `impeccable-disable` markers and `.impeccable/config.json` `detector.ignoreRules`); a pinned brief overrides a tell.
- Do not turn the tell list into the target. A page can pass every check and still be generic; the tests are necessary, not sufficient (Impeccable README: "evidence, not proof"). Always follow with the transplant test and the guess-the-aesthetic blind test.
- Do not hard-code today's overused lists as permanent: version them with a date and refresh from Impeccable's `constants.mjs`, slop-cop `slop-fonts.js` and the Anthropic SKILL.md "defaults to avoid" block every few weeks, because the monoculture moves (Inter -> Geist/Fraunces -> cream/terracotta in about a year).
- Do not use the detector's tell-count as a training reward without a diversity term; optimisers will remove the listed tells and land on the next unlisted default (the replacement trap). Pair it with B-DIST and B-LEDGER.

## 5. Exceptions & judgement calls

- Sticky frosted nav/footer is legitimate (Linear, Vercel, GitHub); exclude edge bars from D-SURF-1.
- Brand-owned font on own domain is exempt (Geist on vercel.com).
- A centred hero is right for manifesto/launch pages (taste-skill); cream/serif is right for editorial/hospitality briefs. Make the rule `info` when the brief declares the register.
- Numbered steps and FAQs are right when they encode real sequence/objections; flag for human judgement, do not gate.
- Operate-mode product UI (dashboards) should skip Persuade-only checks (hero, eyebrow, FAQ, stat banner) and keep craft/contrast/overflow checks.
- Weighted-distance and SSIM/pHash thresholds are `[engine note]` guesses; calibrate against (i) Larpo r5 seven concepts (expected: fail), (ii) a control set of 7-10 visibly different human-designed sites (expected: pass), (iii) Krebs's labelled dataset if obtainable (`dataset/labels.jsonl` exists in the repo).

## 6. Figures worth keeping

n/a. Save for `examples/`: the contact sheet of r5 seven concepts (grayscale, 24px blur) as the failing baseline; the same for a control set once chosen.

## 7. Open questions

- Implementation reuse: fork design-slop-cop's per-pattern `extract(ctx)` architecture (MIT) for Part A, shell out to `npx impeccable detect <url> --json` for the 59 rules (Apache-2.0; exit code 2 on primary findings; needs Chrome), and write Part B/C ourselves. Decide before building; avoid two sources of truth for ids.
- `hero.structure` classification from bounding boxes is heuristic; start with a rule table over {H1 rect, largest media rect, largest card rect} and validate manually on r5.
- Typeface classification (`type.voice`) needs a maintained lookup table; consider Fonts In Use / Google Fonts category metadata; unknown families -> `unknown` and are excluded from collision counts.
- Whether `palette.family` clustering should use OKLCH k-means or a hand-named table; start with the table (cream-coral-cobalt, black-neon, mono-warm, botanical, mineral-cool).
- Impeccable's `cream-palette` is unbounded on the "warm" side and will flag many legitimate off-whites; gate its `fail` on co-occurrence (D-COLOR-3 only escalates with serif display or terracotta accent).
- Unread: slop-cop's remaining pattern bodies beyond header comments; Impeccable's full `checks.mjs` (5,500+ lines) beyond the rules cited; Hallmark's slop-test.md.
