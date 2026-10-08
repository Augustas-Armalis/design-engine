---
source: web:https://www.lightningdesignsystem.com + npm @salesforce-ux/design-tokens@4.1.0 + @salesforce-ux/design-system-2@2.264.2 + @salesforce-ux/design-system@2.264.1 (SLDS 1) + v1.lightningdesignsystem.com/platforms/lightning/new-global-styling-hooks-guidance
chapter: Salesforce Lightning Design System 2: styling hooks, Cosmos and Lightning Blue themes, pairing contract, density
pages: n/a (npm packages + static docs page, fetched 2026-10-08)
topic_tags: [design-system, tokens, slds, salesforce, styling-hooks, css-custom-properties, light-dark, density, contrast-pairing, enterprise, themes]
status: studied
---

# Salesforce Lightning Design System 2 (SLDS 2)

Machine profile: `system/systems-research/slds.json`. Raw fetches: `corpus/web/systems/slds/` (tokens/package/dist/themes/{cosmos,lightning-blue}/*.css|json, ds2/package/dist/css/{bundled,modular}/*.css + components/, pkg/package = SLDS 1 2.264.1, v1-hooks.html). The public docs site (lightningdesignsystem.com, developer.salesforce.com/docs/platform/lwc) is JS-rendered and returned only a title or 403 to WebFetch, so values below come from the shipped token and CSS files; narrative rules come from the v1 static copy of "New Global Styling Hooks Guidance".

Licence: SLDS 1 source BSD-3-Clause, icons/images CC BY-ND 4.0. SLDS 2 packages carry a custom Salesforce Terms of Use (reproduce / derive / distribute with the terms; export restriction; AS-IS; indemnity; usage-data collection clause). Study the structure and numbers; do not vendor the package.

Evidence grading: **[verified]** read from a shipped token/CSS file; **[computed]** script output; **[secondary]** search summary of Salesforce docs; **[engine note]** my judgement.

## 1. Core ideas

1. **Styling hooks = CSS custom properties with the scope in the name.** `--slds-r-*` reference (raw theme palette), `--slds-g-*` global (public API), `--slds-s-*` shared (cross-component roles such as button, input, container, table), `--slds-c-*` component (per component). 186 distinct global, 113 shared and 275 component hooks are referenced by the shipped stylesheet [computed on slds2.base.css].
2. **Cascade of altitude.** Every property resolves `var(--slds-c-card-radius-border, var(--slds-s-container-radius-border, var(--slds-g-radius-border-2)))`: component override, then shared role, then global default [verified: slds2.base.css `.slds-card`]. A brand can intervene at the altitude it needs.
3. **Roles come in pairs; contrast is guaranteed by the pair.** surface / on-surface, surface-container / on-surface, accent-container / on-accent, error-container / on-error. "All surface, accent, and feedback colors have a pairing and should be used together" [verified: v1 guidance page]. Lowest number = lightest/smallest, highest = darkest/largest (ranges 1..x).
4. **Dark mode is built into the value.** `--slds-g-color-surface-1: light-dark(#fff, #242424)`. The palette ladder is mirrored (dark step N = light step 100-N) with step 50 as an identical pivot (`#757575`, `#066afe`), so semantic tokens that reference steps work in both modes without branching [verified: cosmos.global.tokens.css].
5. **Two themes share identical token names, but only Cosmos has dark mode.** Cosmos (default SLDS 2: electric blue `#066afe`, pill buttons, 20px containers, flat shadowless cards, 4 shadow levels in three layers) and Lightning Blue (legacy-look: `#0176d3`, 4px radius, single-layer shadows, red error, light only: its token file has zero `light-dark()` calls). Theme parity is validated by the build [verified: tokens README].
6. **Feedback colours are re-hued in Cosmos.** info = blue, success = teal-green (`#0b827c` at 50), error = pink-magenta (`#e3066a` at 50, text `#b60554`), warning = amber-brown (`#a96504`); Lightning Blue keeps conventional red `#ea001e` / green `#2e844a` and a grey info [verified: reference tokens].
7. **Density is two parallel values per token.** `--slds-g-spacing-var-N`, `-var-block-N`, `-var-inline-N` and `--slds-g-font-scale-var-N` carry "Comfy (default) = X | Compact = Y" in their docs: comfy 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80px; compact 2, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64px; font var-2 16 -> 14px, var-3 20 -> 16, var-4 24 -> 20 [verified].
8. **Typography is quiet and small.** 13px base, system-ui stack, line-height 1.5, scale 14, 16, 20, 24, 28, 32, 40, 48 (Cosmos), headings weight 400 in containers, titles in navy `#03234d` rather than black [verified].
9. **Tokens are authored in W3C DTCG JSON with OKLCH palettes**, built with Style Dictionary (name/kebab, light-dark composition, oklch-to-hex) into CSS, JSON, Kotlin and Swift [verified: tokens README].
10. **Cosmos buttons move.** Brand/bordered buttons translate up on hover (`translateY(-2px)` / `-1.5px`) with a hard 2px under-line in a darker brand step; active state is a three-layer inset shadow [verified: cosmos.shared.tokens.css].

## 2. Rules

- **RULE** Pair every background role with a named foreground role and use no other text colour on it: page surface -> on-surface-1..3; accent-container -> on-accent; error/warning/success/info-container -> on-{state}; and document the allowed foreground steps next to each background step.
  **Why** Contrast becomes a property of the pair, not of a designer's eye, and survives theme and dark-mode changes.
  **Applies to** all.
  **Check** In the token file every `*-container` has an `on-*` partner; computed contrast of each pair >= 4.5:1 light and dark (script over all pairs).
  **Source** v1 new-global-styling-hooks-guidance (Surface, Container, On Surface, Accent Containers); cosmos.global.tokens.css

- **RULE** Split the border colour by role: `border-1` (decorative dividers, may be about 1.7:1) and `border-2` (interactive controls, >= 3:1 and in practice about 6.7:1 light / 3.4:1 dark). Interactive elements use border-2; presentational ones use border-1; disabled uses a dedicated disabled-border.
  **Why** WCAG 1.4.11 applies only to UI component boundaries; separating the tokens stops decorative lines from being over-darkened.
  **Applies to** forms | SaaS app UI.
  **Check** Contrast of `input, button, select` border vs surface >= 3:1; of `hr, .divider` unconstrained but flagged if > 4:1 (too heavy).
  **Source** guidance page (Border Colors); tokens: border-1 `light-dark(#c9c9c9,#444)`, border-2 `light-dark(#5c5c5c,#757575)` [computed 1.66 / 6.69 light]

- **RULE** Mirror the lightness ladder for dark mode and keep one pivot step identical across modes; reference steps by semantic tokens so a component never contains a dark-mode branch. Emit values with CSS `light-dark()`.
  **Why** A single declaration serves both modes and the pivot guarantees a mid-tone that reads on both light and dark surfaces.
  **Applies to** dark mode.
  **Check** No `@media (prefers-color-scheme)` inside component CSS; every colour token in the theme file is `light-dark(a, b)` or a pivot (assert a == b); palette dark step = light step at 100-N within 1 hex step.
  **Source** cosmos.global.tokens.css (`--slds-g-color-palette-neutral-10: light-dark(#181818, #e5e5e5)` ... `neutral-50: #757575`)

- **RULE** Express density as comfy/compact value pairs on spacing and font-size tokens (spacing-var-N, font-scale-var-N), switched in one place, and collapse only the mid-to-large part of the type scale in compact (16 -> 14, 20 -> 16, 24 -> 20; small sizes unchanged).
  **Why** Users with data-heavy screens want a global switch; keeping small type fixed protects legibility.
  **Applies to** SaaS app UI.
  **Check** Token file has a compact value for each `*-var-*`; compact never drops body text below 13px or interactive targets below 24px.
  **Source** cosmos.global.tokens.css (token comments "Comfy (default) = ... | Compact = ...")

- **RULE** Resolve component properties through a three-step var() fallback (component hook, shared role hook, global token) and never reassign global tokens inside a component.
  **Why** Brands override at the lowest altitude that satisfies them; reassigning a global breaks every other consumer and future system updates.
  **Applies to** all.
  **Check** CSS contains no `--g-*: value` declarations outside the theme file; component rules use `var(--c-x, var(--s-y, var(--g-z)))`.
  **Source** v1 guidance page ("Do not reassign globals"); slds2.base.css `.slds-card`

- **RULE** Pick the container radius at theme level (20px Cosmos / 4px Lightning Blue) and let cards, modals, popovers read it from one shared token; buttons read a separate shared button radius (pill vs 4px); inputs 8px (4px).
  **Why** Roundness is a brand decision; per-component pixel values drift apart.
  **Applies to** SaaS app UI | landing page.
  **Check** Distinct border-radius values <= 5; container-radius token referenced by every card-like surface.
  **Source** cosmos.shared.tokens.css (`--slds-s-container-radius-border`, `--slds-s-button-radius-border`)

- **RULE** Separate containers by surface tone when shadow and border are zero: a white container-1 on a `#f3f3f3` surface-2 page is enough; add shadow-2 (or a 1px border-1) only in themes that opt in.
  **Why** Cosmos cards are borderless and shadowless; adding both a hairline and a wide shadow is the generic card tell.
  **Applies to** SaaS app UI | landing page.
  **Check** Each card has at most one of: border, shadow, tone-shift as separator (visual).
  **Source** cosmos.shared.tokens.css (`--slds-s-container-shadow: none; --slds-s-container-sizing-border: 0`)

- **RULE** Key feedback to icon + text, never hue alone, and choose the status palette per theme (error hue is pink in Cosmos, red in Lightning Blue); keep container fills at step 90 light / 30 dark with on-state text at step 40 light / 90 dark.
  **Why** Re-hued semantics break habit; fixed step recipes keep contrast across hues.
  **Applies to** forms | SaaS app UI.
  **Check** Status elements contain an svg/icon or a text label; container/text contrast >= 4.5:1.
  **Source** cosmos.global.tokens.css (`error-container-1 light-dark(error-90, error-30)`, `on-error-1 light-dark(error-40, error-90)`)

- **RULE** Name durations on a short semantic list with frame counts (immediately 50ms/3f, quickly 100ms/6f, promptly 200ms/12f, slowly 400ms/24f) and keep toasts at 4.8s (short) or 9.6s (medium); do not hard-code easings in components (SLDS does, which is its weakness).
  **Why** A short named set removes timing drift; frame annotations tie values to 60fps rendering.
  **Applies to** all.
  **Check** Every `transition-duration` is one of {0, 50, 100, 200, 400}ms or uses the token; easing values reference a token.
  **Source** cosmos.global.tokens.css duration tokens; slds2.base.css (hard-coded cubic-beziers = counter-example)

- **RULE** Use rem-based spacing/sizing/font tokens so layout follows user font size, and give measure tokens in `ch` (content 20/45/60ch; headings 20/25/35ch).
  **Why** Respects browser text-size settings; `ch` caps line length without media queries.
  **Applies to** all.
  **Check** No `px` in padding/margin/font-size tokens; paragraph `max-width` in ch between 45 and 75.
  **Source** cosmos.global.tokens.css (`--slds-g-sizing-content-1..3`, `--slds-g-spacing-1: 0.25rem`)

## 3. Numbers & scales

| Group | Cosmos | Lightning Blue |
|---|---|---|
| Spacing | 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80 px (rem 0.25-5) | same |
| Sizing (g-sizing-1..16) | 2, 4, 8, 12, 16, 20, 24, 28, 32, 48, 64, 80, 160, 240, 320, 480 | same |
| Border widths | 1, 2, 3, 4 | same |
| Radius | 4, 8, 12, 20, pill 15rem, circle 100% | 2, 4, 8, 16, pill, circle |
| Font scale | neg-2 10, neg-1 12, base 13, 1 14, 2 16, 3 20, 4 24, 5 28, 6 32, 7 40, 8 48 | 3 18, 4 20, 5 24, 6 28, 7 32, 8 42 (1-2 same) |
| Line height | unitless 1, 1.25, 1.375, 1.5 (base), 1.75, 2 | same |
| Weights | 100-700 plus bold | same |
| Shadows (light / dark alpha) | 1: `0 0 2px 2e/5c, 0 2px 2px 2e/5c, 0 -1px 2px 1a/33`; 2: `0 0 5px 29/52, 0 3px 3px, 0 -1px 2px 17/2e`; 3: `0 0 7px 24/47, 0 5px 5px, ...`; 4 (=5,6): `0 0 10px 1f/3d, 0 7px 7px, 0 -1px 3px 12/24` (hex alpha) | 1: `0 2px 2px #0000001a`; 2: `0 2px 3px #00000027`; 3: `0 2px 4px`; 4: `0 2px 5px` |
| Focus | outset: 2px surface + 4px brand-15 ring; inset 2px | same |
| Durations | 0, 0.05, 0.1, 0.2, 0.4, 3.2s; toasts 4.8 / 9.6s | same |
| Brand ramp (r-color-brand) | 5 `#000314` 10 `#001642` 15 `#001e5b` 20 `#002775` 30 `#022ac0` 35 `#003ecd` 40 `#0250d9` 45 `#045dec` 50 `#066afe` 55 `#287efe` 60 `#4992fe` 65 `#5f9ffe` 70 `#7cb1fe` 80 `#a8cbff` 85 `#c2daff` 90 `#d6e6ff` 95 `#edf4ff` | 40 `#0b5cab` 50 `#0176d3` 60 `#1b96ff` 90 `#d8e6fe` |
| Neutral palette (light / dark) | 0 `#000`/`#fff`, 10 `#181818`/`#e5e5e5`, 15 `#242424`/`#d7d7d7`, 20 `#2e2e2e`/`#c9c9c9`, 30 `#444`/`#aeaeae`, 40 `#5c5c5c`/`#939393`, 50 `#757575` (pivot), 60 `#939393`/`#5c5c5c`, 65 `#a0a0a0`/`#515151`, 70 `#aeaeae`/`#444`, 80 `#c9c9c9`/`#2e2e2e`, 90 `#e5e5e5`/`#181818`, 95 `#f3f3f3`/`#020202`, 100 `#fff`/`#000` | light values only (0 `light-dark()` calls in the Lightning Blue token file: no dark mode) |
| Semantic surfaces | surface-1 `#fff`/`#242424`; surface-2 `#f3f3f3`/`#181818`; container-3 `#e5e5e5`/`#2e2e2e`; inverse `#032d60`/`#aacbff` | surface-1 `#fff`, surface-2 `#f3f3f3`, surface-3 `#e5e5e5` (static) |
| Text | on-surface-1 `#5c5c5c`/`#aeaeae` (body, labels); -2 `#2e2e2e`/`#e5e5e5`; -3 `#03234d`/`#d8e6fe` (titles) | on-surface-1 `#757575`, -2 `#2e2e2e`, -3 `#181818` (static) |
| Controls | line-height 30px + 1px border = about 32px high (button, input); badge padding 4/8, text 12px; table header weight 600; modal margin-inline 32px, padding-top 48px | same |
| Component count | 89 folders in design-system-2/dist/components | |
| Contrast [computed] | on-surface-1 6.69:1; neutral-50 4.61:1; white on `#066afe` 4.67:1; white on `#0176d3` 4.63:1; border-1 1.66:1; border-2 6.69:1; dark on-surface-1 7.0:1; dark border-2 3.37:1 | |

## 4. Dos and Don'ts

- **Do** use `on-surface-1` for body text and placeholder, `-2` for secondary headings and filled inputs, `-3` for titles; **Don't** use a surface-container colour for text.
- **Do** apply accent colours (text, links, icons) only where no text sits on the accent; use accent-container where text sits on it.
- **Do** pair `border-2` with buttons and inputs; **Don't** use `border-1` on an interactive control.
- **Don't** override `--slds-g-*` values in your component ("subject to test failures and future breaking changes").
- **Do** put `[data-theme]`/class on the root and keep token names identical across themes; **Don't** branch component CSS by theme.

## 5. Exceptions & judgement calls

- **Scope support is contested.** The v1 guidance page describes component hooks as the older approach and global hooks as the new one. Salesforce developer docs (via search summary [secondary]) say shared and component hooks are not supported in SLDS 2, yet the shipped `slds2.base.css` still reads 275 `--slds-c-*` and 113 `--slds-s-*` hooks. For a bound project: treat `--slds-g-*` as the contract and `--s/--c` as implementation detail.
- Cosmos error pink and success teal depart from red/green conventions. For a general project keep red/green and use the Lightning Blue recipe, but copy the container/on-state step logic. [engine note]
- Cosmos button hover lift (translateY(-2px) + hard under-line) is a distinctive motion signature; it moves hit targets by 2px, so keep it off dense toolbars. [engine note]
- 13px base text and 1.5 line-height are density choices for record pages, not for reading; for marketing pages use the 16px step as body. [engine note]
- The `font-scale-ratio` token says 1.15 but published steps are hand-rounded; do not derive the scale from the ratio.
- Small-size button box is ambiguous in CSS: `.slds-button_small` sets `line-height: 1.75rem; min-height: 2rem`. Treated as unknown rather than guessed.

## 6. Figures worth keeping

n/a. Use the static v1 copy of "New Global Styling Hooks Guidance" for the surface / container / on-surface diagrams; the SLDS 2 site needs a browser.

## 7. Open questions

- Authoritative SLDS 2 position on `--slds-c-*` and `--slds-s-*` support (docs not reachable by WebFetch).
- Compact density mechanism at runtime (attribute/class) is not visible in the token or CSS packages; only the paired values are.
- SLDS 2 typography guidance (heading sizes per role) is not in the packages; only the scale tokens.
- The `wcag-summer-23` dist-tag of SLDS 1 suggests a contrast-fixed build; not examined.
- Count of global tokens: 530 lines in cosmos.global.tokens.css (about 500 tokens); exact number not computed.
