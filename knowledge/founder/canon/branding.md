# Canon: brand system (mark, palette, type pair, voice, application sheet)

Decided defaults, 2026-10-21. Evidence: `founder-taste L<n>`, Kaching's shipped identity, the traced marks of Kestrel, Quorum and Kite. Never change Larpo's own brand from this repo (hard stop). Gate numbers: `system/canon/branding.json`.

## Floor references
- **Shipped brand system:** Kaching, `knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md` ("Visual tokens", "Identity and dither": one font, ink ladder, per-app three-step dither palettes, one material).
- **Fictional brands accepted in use:** Kestrel (flower, `work/kestrel/brand/`), Quorum (`work/quorum/brand/`), Kite (K-star, `work/kite/brand/`): mark + wordmark, one ink colour, reused in the product.
- Mark canon: `canon/logo.md`.

## Reading set (5 files)
1. this page
2. `canon/logo.md`
3. `knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md` ("Visual tokens", "Identity and dither")
4. `knowledge/web/type-voices.md` + `system/variety/dark-recipes.json` (only for the palette/type choice)
5. the last 5 ledger rounds

## Decided defaults

| Part | Default | Alternative only when | Source |
|---|---|---|---|
| Existing brand | build from the brand's own kit and tokens; promo and offer visuals become the brand's own product (Kaching BFCM = the Bundles card) | never re-imagine an existing brand | L470, L500 |
| Mark | `canon/logo.md` route: trace the supplied image, else a traced Pinterest placeholder for a fictional brand; drawing method only for a real client who asks | — | L162, L256, L349 |
| Lockup | mark 1.43 x cap height, gap 0.28 x mark, wordmark >= 20px in the nav, no container | — | L26, L346 |
| Neutrals | one published ladder used verbatim (light `#171717 / #5c5c5c / #7b7b7b / #a3a3a3 / #d1d1d1 / #ebebeb / #f7f7f7 / #fafafa`; Kaching ink `#08090c`, heading `#171717`, secondary `#666`, page `#f7f7f7`); canvas chroma < 0.01 | a tinted dark recipe from `dark-recipes.json`, its hue kept through every surface | KMD-01; Kaching; L412 |
| Accent | one confident accent; ink is a valid accent; tints at ~8%; status hues separate from the accent | per-product palettes only for a suite (Kaching's six apps, each a three-step dark/middle/light family) | L134, L199, L391; Kaching |
| Palette quality | clean hues (gold = clean amber, never olive or muddy); product-art ramps within ~25° of their section accent or neutral | — | L211 |
| Dark | graphite neutral, never blue-tinted; accent pixels <= 2% of a fold | one of the six bound dark recipes when the brand owns a hue | L412 |
| Type pair | Inter Variable display cut (opsz) for display and UI + one mono (Geist Mono) for meta, IDs and times; or the brand's own face (Kaching: Geist Variable only) | a text-weight serif display (400-500, moderate contrast) with a grotesk UI only when the brief is editorial; never a didone | L86, L452; HC-10; L355 |
| Weights | display 550 (light and dark accepted heroes), UI 500/600 | the client app's own scale (Sellify 450/500) | Kestrel, Quorum, Kite; L199, L472 |
| Material | one owned material (Kaching live pixel dither, Quorum smooth gradient stage, Kite dot-matrix map), used in a deliberate place, not everywhere | — | L17 (core idea 3), L191; Kaching dither rules |
| Voice | headlines Title Case, 3-5 specific words with an idea, no full stop; body sentence case, specific beats abstract, no cliché phrases (`tools/thresholds.json`) | — | L30, L98, L306, L433 |
| Proof | never invented customers, logos, metrics or security claims; sample data labelled sample | — | CLAUDE.md principle 4 |
| Badges | "New" badges keep white text; deepen the colour until white reads (brightness wins over AA on this decorative badge, e.g. `#ea580c`) | — | L106 |
| Application sheet | `work/<name>/brand/present.png`: mark on white, on the brand colour and on ink at 32/24/16px, the measured nav lockup, the one-sentence idea; then in place: nav, favicon, product assistant avatar, closing section | — | L346; logo-from-image step 3 |

## Contradictions resolved
- **Logo route:** trace, not construct (supersedes L22's construction route as a default; see `canon/logo.md`).
- **Type voice variety vs floor:** for SaaS brands the type voice is not randomised; Inter display (or the brand's own face) is the floor and divergence lives in material, button effect and product world (L138, L452; audit 5.4). Supersedes `variety.mjs` type picks such as `didone-luxe` (Quillwork reject) as defaults.
- **Palette from a reference image:** a logo or mood reference changes only what it was sent for (L409).

## Never (rejected, with evidence)
- Bodoni-class serif on a brown warm-black field (Quillwork, L355).
- Palette taken from a logo reference ("nouuu not green", Perch r3, L409).
- Overlapping rounded squares, sparkles, primitive-built marks (L22, L349).
- Blue-tinted dark with periwinkle everywhere (Kite v1, L412).
- Muddy gold, red product art on a green card (Kaching, L211).
- Presenting a fictional brand as client work (hard stop).

## Pre-delivery checklist
1. Mark route and source recorded (`brand/ref/SOURCE.txt` or the founder's file).
2. present.png exists: white / brand / ink, 32 / 24 / 16, nav lockup measured.
3. Palette tokens: one neutral ladder, one accent, canvas chroma < 0.01, status hues distinct from the accent.
4. Type: one display/UI family (+ mono), opsz loaded if Inter, weights from the set.
5. The mark appears in the live build: nav, favicon, product avatar.
6. Copy sample: headline rules met; no cliché list hits; no invented proof.

## Open
- No complete brand system (palette + type + voice + application sheet) has had a founder verdict; Kaching is the only shipped one and it predates the engine.
- Brand voice beyond headline rules (tone, microcopy) has no founder rule yet.
