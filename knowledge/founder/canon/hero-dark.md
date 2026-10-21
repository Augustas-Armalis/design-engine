# Canon: dark SaaS hero

Decided defaults, 2026-10-21. Evidence: `founder-taste L<n>` and the accepted Kite hero (ledger `2026-10-15-kite-landing`, "what we created is kinda not bad actually... but needed a lot to perfect"). Gate numbers: `system/canon/hero-dark.json`.

## Floor reference
- **Kite final:** `work/kite/landing/hero-2x.png` (also `hero-4k.png`), spec in `work/kite/DIRECTION.md` section "Kite hero: current spec". Centred stack over the full dashboard, the dashboard's own dot map as the backdrop, no glows.
- Measured dark bar to compare against: `knowledge/benchmarks/dark/linear-fold-1440x900@2x.png`.

## Reading set (5 files)
1. this page
2. `work/kite/DIRECTION.md` (the final spec, last section)
3. `knowledge/web/dark-mode-premium.md` sections 1, 4, 6 (light construction, frame recipes, rules)
4. `knowledge/founder/canon/product-ui.md` (dark product rules)
5. the last 5 ledger rounds

## Decided numbers

| Part | Default | Source |
|---|---|---|
| Canvas | graphite `#0a0a0b`, chroma < 0.01; dark only, no light toggle unless asked | Kite; L412, L449 |
| Rails | x 120 / 1320, small + marks on the nav rule | Kite spec |
| Nav | 72 tall. Traced mark 26px + wordmark 23/600, a 20px hairline divider, plain text links 15/500 `#a1a1a6` with 28px gaps right after the logo; right: "Sign in" text + one 36px white pill | L461; Kite spec |
| h1 | Inter display cut, 68 / 550 / -0.045em / lh 1.04, **one colour** near-white (`#f4f4f5`), centred, top ~156 (84 under the nav rule), Title Case, no full stop, 2 balanced lines | L449, L452; Kite spec |
| h1 copy | <= 5 words by default; 6-7 only as two parallel short phrases (Kite "Every Region, Live / Every Fix, One Click") | L433; Kite final |
| Subtitle | 18/28/450 `#a1a1a6`, 2 hand-set balanced lines, measure <= ~620px | L449, L455 |
| CTAs | 44px full pills built from the product's own buttons: white bevelled pill (`#fff`->`#dcdcde`, 1px dark ring, inset white top) + dark tactile pill; no arrow tiles, no extra bevel stacks; secondary text-only | L458; Kite spec |
| CTA -> product | 64px (range 64-96) | L186-189, L418; Kite |
| Product | full dashboard in a double-bezel frame (9px pad, r25 outer / r16 inner, concentric), top <= 520px, dissolving at the fold (~150px fade + light blur) | Kite spec; L418, L433 |
| Product material | graphite surfaces, white carries data, red (or one state hue) only for the incident; surface step >= 4% L above canvas | L322, L412 |
| Backdrop | the product's own visual elements (Kite: the dot-matrix map), soft: dots .10 + heat .34 (max .5), enlarged, a long soft cut-out behind the copy (radial 40% x 44%), bottom fade from 78%; monochrome; labels never within 24px of a text box and inside the rails | L455, L461, L464 |
| Light | default none: no glows, beams, halos, bezel streaks, glows under buttons. **Only when the brief asks for glow** (founder 2026-10-21: "dark mode with purple glows and liquid glass"): one rendered light source behind the product (e.g. the Cadence glass eclipse), never blobs behind the type, never on resting buttons; record the brief quote as an override | L427; Kite final; 2026-10-21 brief |
| Edges | ONE light ring per dark box (white 7-10%) plus soft drops; never ring + inset top highlight on one element | L467; BN-04 |
| Fonts | Inter display for all sans text, hero and product; one mono (Geist Mono) for meta only | L86, L452; Kite fingerprint |
| Colour budget | coloured pixels (OKLCH C > .08) <= 3% of the fold; accent pixels <= 2% | dark-mode-premium; L412 |
| Hover | lightness or alpha step only, <= .2s, no hue change, no resting glow | dark-mode-premium rules 7-8 |
| Logo | the founder-supplied or traced mark, mark + wordmark, no container | L26, L449 |
| Motion | none unless asked; if asked, the Kite wave (~2.5s settle, expo-out), see `canon/motion.md` | L358, L415, L512 |

## Contradictions resolved (audit 4.1)

| Topic | Default | Alternative only when | Superseded lines |
|---|---|---|---|
| Default dark hero | Kite final: centred stack, product-element backdrop, full dashboard 64px under the CTAs | after two rejected rounds, calibrate against a measured reference (L440 method) as an internal artefact, not as the deliverable | L440 (Linear replica as the deliverable), L443 (Basit cinematic stage), L446 (Supabase + Cursor), L427's "bare flat page" reading |
| Light on dark | no light sources at all; presence comes from the monochrome product-element backdrop | a single rendered field only when DIRECTION names it as the signature and the founder has approved a still of it | L443 ("one soft rendered light field"), L421 (overhead beam, lit bezel) |
| Headline tuple | 68/550/-0.045 one colour | — | L430 (~52/500), L443 (60/450, 50% second line), L446 (56/500 soft second line), L449 (60/600: the "one colour" part stays, the size/weight does not) |
| Hero button | 44 full pill from the product's buttons | — | L58 Kaching r14 spec for dark heroes; L443 (48px glass CTAs); L446 (40px compact) |
| Nav | plain text links after the logo + one 36px pill | — | L94 pill nav, L146 44 track, L421 (product's recessed segmented track), L446 (outline Sign in) |
| Chip above h1 | off | as hero-light | L364 |
| Background | product-element backdrop, soft, monochrome | a hairline structural layer (rails, wide 120px grid cells kept away from the product) when the product has no visual element to borrow | L418, L430 (hatch / grid as defaults), L433 bg cells (kept as the alternative) |

## Never (rejected, with evidence)
- Neo-brutalist offset-block buttons, muddy coloured glow, flat product slab that sinks into the canvas, pastel data colours, 700 headline with crushed tracking (Tracewell, L322).
- Blue-tinted canvas or periwinkle everywhere (Kite v1, L412).
- Glows, beams, halos, scattered light (Kite, L427 "the glows and stuff wtf").
- Red pills, pulses, comets or chips in the backdrop (L464 "even worse now, no red pills").
- A 1000px one-line subtitle (L455); a grey second h1 line (L449).
- Bright white UI windows on a dark band (L246); double top borders (L467).
- Rising dot globes and 3D objects behind the copy (L418 "even worse").
- Didone or brown warm-black "editorial luxury" (Quillwork, L355); dark mono poster with a lens shader (Vigil v2, L130).
- Thin bright streaks or laser lines (L443 "looks cheap and ugly").

## Pre-delivery checklist
1. Scope = one fold, screenshots only.
2. `design_view.mjs --kind hero-dark`: 0 FAIL; read it next to Linear and the Kite final.
3. h1 one computed colour, 68/550/-0.045, opsz loaded; one sans family plus at most a mono.
4. Zero radial gradients and zero white blur shadows outside the product UI; backdrop chroma 0.
5. Box-shadow census: no element contains both `0 0 0 1px` and `inset 0 1px 0`; <= 3 recipes.
6. CTA -> frame 64-96; frame top <= 520; frame transform identity.
7. Hero CTAs share the product's button tokens (computed background/shadow identical to the product's Deploy pill).
8. Coloured pixels <= 3% (pixel pass).
9. Glass chips: parent has no mask-image/filter (L467).
10. Round 2+: when the founder says a past version "had it right", restore that exact styling and change only what he named (L461).

## Open
- Light hero CTA effect library for dark (gloss, inner glow) beyond the Kite bevel pill: no dark accept yet.
- Whether a split layout (copy left, product right) works in dark: Tracewell's band layout was called "good" (L322) but no dark split has been accepted.
