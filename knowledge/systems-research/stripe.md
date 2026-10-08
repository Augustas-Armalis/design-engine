---
source: web:https://stripe.com ; https://docs.stripe.com ; https://stripe.com/blog/accessible-color-systems ; https://docs.stripe.com/elements/appearance-api ; https://docs.stripe.com/stripe-apps/style ; https://docs.stripe.com/stripe-apps/components ; https://docs.stripe.com/stripe-apps/design
chapter: Stripe design system profile (measured marketing and docs + public design write-ups)
pages: n/a (web sources, fetched and measured 2026-10-08)
topic_tags: [design-system, color, lab, gradient, shadow, typography, tokens, fintech, docs, theming, accessibility]
status: studied
---

# Stripe

Machine profile: `system/systems-research/stripe.json`. Raw fetches, screenshots (1440, 390), computed-style JSON, stylesheets and the Appearance API page: `corpus/web/systems/stripe/` (gitignored). Sail (the internal system) is not published; this note is built from the live stylesheets, public docs and the accessible-colour post. Provenance: mixed.

## 1. Core ideas

1. **Accessible colour by construction.** Stripe rebuilt its palette in CIELAB so every hue follows one lightness curve: steps five or more apart pass 4.5:1 for small text, four or more pass 3:1 for icons and large text, including on the lightest tint of any hue; HSL was rejected because equal HSL lightness is unequal perceived lightness; an audit found no default text colour except black reached 4.5:1; the Badge fix was to move both background and text up one level (stripe.com/blog/accessible-color-systems). The scale count was not stated; the docs CSS shows ramps 50-900(950) per hue with an `-rgb` twin for alpha.
2. **Hue aliasing as theming.** In the shipped docs CSS one theme set re-points whole ramps (`--sail-color-orange-*` to yellow, `purple-*` to blue, `blue-*` to cyan) instead of redefining each step; two gray ramps (#3c4257 vs #414552 at step 700) both appear on the docs page.
3. **Marketing is a light-weight display system.** sohne-var at weight 300 for headings, stats and body; weight 400 for nav and buttons; 425 and 500 on the pricing template. Tracking -0.02em at 32-48px, -0.025em at 56px. Hero h1 48/55.2, statement h2 56/57.68, section 32/35.2, card 26/29.12 (measured 2026-10-08).
4. **Navy ink, slate body, one purple.** Ink #061b31, body #50617a, muted #64748d, hairline #e5edf5, accent #533afd (white on it 6.19:1); pricing template still uses #0a2540 ink and #635bff blurple, so the system is not uniform across templates.
5. **Tinted layered shadows.** `rgba(50,50,93,.25) 0 13px 27px -5px` plus `rgba(0,0,0,.3) 0 8px 16px -8px` (cards), `0 2px 5px -1px` plus `0 1px 3px -1px` (controls), `0 50px 100px -20px` plus `0 30px 60px -30px` (large). The shadow colour is a violet-blue, not grey.
6. **Page frame as structure.** 1px vertical lines at x=88 and x=1352 around a 1264px frame, nav 76px high, a gradient art object (radial-gradient stack #7f7dfc, #f44bcc, #ffcf5e, #533afd) bleeding through the frame behind the headline; dark-navy `#0d1738` bands invert sections.
7. **Third-party customisation is token-limited.** Stripe Apps: custom styling intentionally limited for consistency and accessibility; spacing tokens 0/2/4/8/16/24/32/48px; `keyline`, `backgroundColor`, `color`, `fill` accept token names only; Chips restyle themselves by which callbacks they have and cannot be overridden (docs.stripe.com/stripe-apps/style, /design).
8. **Elements Appearance API is a three-tier theme.** Theme (`stripe`, `night`, `flat`), variables (`colorPrimary` #0570de, `colorBackground` #fff, `colorText` #30313d, `colorDanger` #df1b41, `fontFamily` Ideal Sans, `spacingUnit` 2px, `borderRadius` 4px), rules (per component and state selectors). Variables like `accessibleColorOnColorPrimary` are computed, and the docs ask for >= 16px mobile inputs.
9. **Docs are a different voice.** System-ui stack, body 14/20 `#3c4257`, h1 32/40/700, h2 21/700, nav 14/20/600, dark navy code panel, 4px buttons, 6px inputs, `box-shadow` rings as borders (`rgb(212,222,233) 0 0 0 1px`).
10. **Motion has a hierarchy of time.** Colour/transform hover 240-300ms (`cubic-bezier(.25,1,.5,1)`), reveals 600-800ms, a 1.2s heading colour wipe, a live-updating GDP figure.

## 2. Rules

- **RULE** Build colour ramps in a perceptual space with equal lightness per step across hues, and publish the pairing rule: steps >= 5 apart for small text (4.5:1), >= 4 apart for icons and large text (3:1), valid on the lightest tint of each hue.
  **Why** Contrast becomes a property of the step numbers, so any designer can pick a compliant pair without a checker, and tinted backgrounds are safe.
  **Applies to** all
  **Check** for every hue, compute contrast for step pairs (n, n+5) >= 4.5 and (n, n+4) >= 3.0 against white and against step 50.
  **Source** stripe.com/blog/accessible-color-systems

- **RULE** Keep an RGB-triplet twin for every ramp colour (`--c-500-rgb: 84, 105, 212`) so alpha variants are `rgb(var(--c-500-rgb) / .5)`.
  **Why** Alpha overlays then stay on-palette without a second token set.
  **Applies to** all
  **Check** every ramp token has a `-rgb` sibling; no hard-coded rgba() colours outside tokens.
  **Source** docs.stripe.com stylesheet (`--sail-color-*-rgb`), measured 2026-10-08

- **RULE** Tint shadows with the brand's cool hue and stack two layers: a large soft one with negative spread and a small tight one; do not use a single grey blur.
  **Why** Coloured, spread-negative shadows read as part of the surface palette and avoid the muddy halo of black shadows.
  **Applies to** landing page | SaaS app UI (light)
  **Check** card box-shadow has >= 2 layers, first layer colour hue within 20 degrees of the brand hue, spread negative.
  **Source** measured pricing/home shadows, stripe.com 2026-10-08

- **RULE** If using a light display weight (300) in headings, pair it with negative tracking scaled to size (-0.01em at 20-34px, -0.02em at 32-48px, -0.025em at 56px) and keep UI controls at 400 or above.
  **Why** Thin strokes need tight tracking to hold a headline together; thin buttons lose affordance.
  **Applies to** landing page
  **Check** h1-h3 weight 300 requires letter-spacing <= -0.01em; `button`, `a.button` weight >= 400.
  **Source** measured stripe.com home (h1 48px/300/-0.96px; button 16px/400)

- **RULE** Do not set body copy in weight 300 below 17px with a mid-tone slate text colour unless contrast is at least 4.5:1 and the font is a display-quality grotesk; otherwise use 400.
  **Why** Stripe's own body (15-16px, 300, #50617a) is only 6.3:1 and thin; copying it with a default font fails legibility.
  **Applies to** landing page
  **Check** body p at weight < 400 and size < 17px flagged; contrast >= 4.5:1.
  **Source** measured stripe.com (p 16px/22.4/300), engine judgement

- **RULE** Pick one ink, one body grey, one accent and one button grammar per site and assert it across every template; Stripe's inconsistency (#061b31 vs #0a2540 ink, #533afd vs #635bff purple, 4px vs pill buttons) is a defect to avoid.
  **Why** Template drift is visible to the eye and costs trust, especially in finance.
  **Applies to** landing page | all
  **Check** distinct set of text colours with > 50 uses has <= 4 members; accent hex count == 1 (plus tints); button radius set size 1.
  **Source** measured stripe.com home vs /pricing, 2026-10-08

- **RULE** Compute readable foreground colours (`on-primary`, `on-background`, `on-danger`) as tokens from the fill, never let a consumer pick the text colour.
  **Why** Brand colours vary in lightness; automatic on-colours keep AA when themed.
  **Applies to** SaaS app UI | embeddable widgets
  **Check** each fill token has a paired `on-*` token and contrast >= 4.5:1.
  **Source** Elements Appearance API (`accessibleColorOnColorPrimary` etc.)

- **RULE** For third-party or white-label surfaces, expose three tiers (theme, variables, rules), accept only token values (no arbitrary CSS) for spacing, colour and type, and make state-dependent styling automatic where overriding would confuse behaviour.
  **Why** Constrained customisation preserves accessibility and consistency across thousands of integrations.
  **Applies to** SaaS app UI | platforms
  **Check** theming API surface: finite variable list, typed values, no raw CSS escape hatch for contrast-critical properties.
  **Source** docs.stripe.com/stripe-apps/style; /elements/appearance-api

- **RULE** Use 1px structural frame lines and a single bleeding art object for editorial pages rather than boxed cards everywhere; place inverse (dark navy) bands to break long light runs.
  **Why** Structure becomes the decoration, letting one gradient carry the brand.
  **Applies to** landing page
  **Check** visual; page has <= 1 full-bleed art object per fold and <= 2 inverse bands in the first 3 screens.
  **Source** measured stripe.com home (frame x=88/1352, band #0d1738), 2026-10-08

## 3. Numbers & scales

| Item | Value |
|---|---|
| Ink / body / muted / hairline | #061b31 (17.37:1) / #50617a (6.30) / #64748d (4.75) / #e5edf5; alt ink #0a2540, alt body #425466 |
| Accent | #533afd (6.19:1 white), alt #635bff (4.70), docs #5469d4 (4.83; set A) and #625afa (set B blue-500), Elements #0570de |
| Surfaces | #fff, #f8fafd, #fafbfd, #f6f9fc; dark band #0d1738 |
| Gradient | radial #7f7dfc, #f44bcc 33%, #e5edf5 66%; yellow #ffcf5e; linear 90deg #7232f1, #fb76fa 50%, #ffcf5e |
| Marketing type | 48/55.2/300/-0.96px; 56/57.68/300/-1.4px; 32/35.2/300/-0.64px; 26/29.12/300/-0.26px; body 16/22.4/300; nav 14/14/400; pricing 15/24/300 and 425; price 26/36/500 |
| Mobile type | 34/35.02/300/-0.34px; 22/26.4; 20/24 |
| Docs type | 32/40/700; 21/700; body 14/20 `#3c4257`; sidebar 13/19; nav 14/20/600 |
| Radius | 2, 3, 4 (dominant), 5, 6, 8, 12, 14, 16.5 (pill 33px), 100% |
| Spacing tokens (Apps) | 0, 2, 4, 8, 16, 24, 32, 48; Elements unit 2px |
| Heights | nav 76; CTA 40 (44 mobile); pricing pill 33; docs button 36 |
| Motion | 100-150 docs; 240, 300 (`.25,1,.5,1`), 600 (`.7,0,0,1`), 800 (`.165,.84,.44,1`), 1200 (`.65,0,.35,1`) |
| Stripe Apps components | 46 (views 5, layout 4, navigation 5, content 17, forms 11, charts 4) |

## 4. Dos and Don'ts

- Do: card with `rgba(50,50,93,.25) 0 13px 27px -5px, rgba(0,0,0,.3) 0 8px 16px -8px`. Don't: `0 4px 12px rgba(0,0,0,.15)`.
- Do: headline word picked out in gradient or purple within a navy sentence (hero: first clause ink, second clause slate-blue). Don't: gradient on the whole headline plus gradient art behind it.
- Do: Elements `inputs: 'spaced'` with labels above, radius 4px, focus ring `0 0 0 2px var(--colorPrimary)`. Don't: pass `rgba()` or `var()` to `colorPrimary` (unsupported).

## 5. Exceptions & judgement calls

- Gradient-wave status: a podcast summary (secondary source) says the 2026 homepage redesign retired the wave; the live page on 2026-10-08 still shows the colour wave behind the hero. Possibly a variant or staged rollout; record as unresolved.
- Weight 300 body is a house style that depends on Sohne; a library entry should mark it `font-dependent` and offer a 400 fallback profile.
- Docs and marketing are intentionally different; a project bound to this system should choose one profile (marketing-light or docs-dense) per surface.
- [engine note] The two gray sets in the docs CSS may be the light vs a variant theme; do not merge them into one ramp.

## 6. Figures worth keeping

- `corpus/web/systems/stripe/home-1440-fold.png`: gradient wave, 1px page frame, two CTA grammars, logo strip.
- `corpus/web/systems/stripe/docs-1440-fold.png`: docs shell, dotted gradient grid, dark code panel.

## 7. Open questions

- Number of steps per hue in the production ramp (post says none); docs CSS suggests 50-900 plus 150/950 in places.
- Which docs gray set belongs to which theme/mode; docs dark mode unverified.
- Sail component specs (button sizes, table density) not public; dashboard not accessible.
- Exact tracking of the 10px eyebrow; prefers-reduced-motion behaviour.
- Why stripe.com keeps two ink/purple values (template age vs deliberate).
