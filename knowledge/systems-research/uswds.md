---
source: web:https://designsystem.digital.gov ; https://github.com/uswds/uswds
chapter: USWDS - system vs theme tokens, contrast-by-grade, cap-height type normalization
pages: n/a (npm @uswds/uswds@3.14.0 packages/uswds-core/src/styles/{tokens,settings,variables,functions}; dist CSS; designsystem.digital.gov color overview + design-tokens pages; fetched 2026-10-08)
topic_tags: [design-system, tokens, token-architecture, color, contrast, wcag, typography, normalization, measure, accessibility, government]
status: studied
---

# U.S. Web Design System (USWDS)

Spec: `system/systems-research/uswds.json`. Raw: `corpus/web/systems/uswds/`. Licence: public domain (US) + CC0 worldwide for GSA work; bundled icons/fonts keep their own licences.

The reference example of token architecture in this library.

## 1. Core ideas

1. **Tokens are a closed vocabulary.** Browsers accept infinite values; USWDS offers "a limited set of discrete options" so designers and developers talk in keys, not numbers (design-tokens page).
2. **System tokens vs theme tokens.** System = the complete set (24 colour families, type scale 1-20, line-height 1-6, measure 1-6, spacing units, breakpoints). Theme = a small role-named subset set in Sass settings that may only point at system tokens (`$theme-color-primary: "blue-60v"`). Raw values fail compilation.
3. **Colour grade = luminance band.** Grades 5-90 each map to a relative-luminance range (50 = 0.175-0.183). So the difference between grades predicts contrast: 40+ = AA large (3:1), 50+ = AA (4.5:1), 70+ = AAA (7:1); grade 50 passes AA against both white and black. Stored as `$system-wcag-magic-numbers`.
4. **Vivid variants** (`blue-60v`) give saturated options at the same grade (same luminance band), so contrast math still holds.
5. **Positional theme names.** lightest/lighter/light/base/vivid/dark/darker/darkest for primary, secondary, accent-warm, accent-cool, base, plus state families error/warning/success/info/disabled/emergency. Re-hue the product by changing a family.
6. **Type normalized by cap height.** Rendered size = 362px (Public Sans cap height, the system base) / typeface cap height x token size; line-heights normalized the same way. Swapping Source Sans (cap 340) for Public Sans keeps optical size.
7. **Roles, not faces.** ui, heading, body, code, alt map to type tokens (default heading = Merriweather serif, body/ui = Source Sans Pro).
8. **Measure is a token** in ex units: 44, 60, 64, 68, 72, 88ex; default body measure 68ex.
9. **8px unit with half steps.** units(1) = 8px, '05' = 4px, '105' = 12px; named widths (card 160 ... widescreen 1400) double as breakpoints.
10. **Reduced motion by mixin:** `u-transition(prop, easing, $essential)` removes the transition under prefers-reduced-motion unless marked essential. One easing token: 0.15s ease-in-out.

## 2. Rules

- **RULE** Build tokens in two tiers: a complete system tier of allowed values and a small theme tier of role names that can only reference system tokens; reject raw values at build time.
  **Why** Guarantees every project stays inside the tested, accessible vocabulary while still being themeable.
  **Applies to** design systems, all projects bound to a system. **Check** theme/settings files contain only token keys (no hex/px literals); build fails on unknown keys. **Source** uswds-core settings/_settings-color.scss; design-tokens page
- **RULE** Organise each colour family into luminance-banded grades (5-90) so that grade difference >= 50 guarantees 4.5:1 and >= 70 guarantees 7:1; >= 40 for large text and non-text UI.
  **Why** Designers can pick accessible pairs by subtraction without a contrast checker, and theme swaps keep compliance.
  **Applies to** all. **Check** for each fg/bg pair in the theme, |grade(fg) - grade(bg)| >= 50 for body text; spot-check with measured ratio. **Source** designsystem.digital.gov/design-tokens/color/overview; variables/wcag-magic-numbers.scss
- **RULE** Make the mid grade (50) pass AA against both pure white and pure black.
  **Why** One "base" colour works for text or icon on either extreme, simplifying dark sections.
  **Applies to** all. **Check** measured contrast of grade-50 colours vs #fff and #000 both >= 4.5:1 (e.g. gray-cool-50 #71767a vs white 4.59:1). **Source** color overview
- **RULE** Name theme colours positionally (lightest, lighter, light, base, vivid, dark, darker, darkest) per role, and leave unused positions explicitly empty (false) rather than inventing values.
  **Why** Components reference positions, so the whole product re-hues by changing the family; empty positions prevent accidental off-palette use.
  **Applies to** design systems. **Check** theme map keys follow the positional set; unused = null/false. **Source** _settings-color.scss
- **RULE** Normalize font sizes and line-heights to a reference cap height (rendered size = baseCap / faceCap x tokenSize) so swapping typefaces preserves optical size and rhythm.
  **Why** Faces with small cap heights look smaller at the same px; normalization makes type tokens face-independent.
  **Applies to** all (esp. systems that let projects change fonts). **Check** for two faces at the same token, rendered cap height differs by < 3%. **Source** functions/font/normalize-type-scale.scss; tokens/font/typefaces.scss cap-height values
- **RULE** Assign typefaces by role (ui, heading, body, code, alt) and reference roles in components, never face names.
  **Why** Changing the heading face (e.g. serif to sans) is one setting.
  **Applies to** all. **Check** component styles reference role tokens/vars, not font-family literals. **Source** $theme-font-role-* settings
- **RULE** Treat line length (measure) as a token in ex units: narrow 44ex, default body 68ex, maximum 88ex.
  **Why** Readable line length is as fundamental as size; ex units track the face's x-height.
  **Applies to** landing page, content, forms. **Check** `max-width` on prose containers between 44ex and 88ex (about 45-90 characters). **Source** tokens/font/measure.scss
- **RULE** Use a strict spacing unit (8px) with half steps (4, 12, 20) and name large widths so they double as breakpoints (mobile 320, mobile-lg 480, tablet 640, desktop 1024, widescreen 1400).
  **Why** One vocabulary for spacing, widths and breakpoints prevents near-duplicate values.
  **Applies to** all. **Check** computed spacing values in {1,2,4,8,12,16,20,24,32,40,48,56,64,72,80,120} px or named widths. **Source** tokens/units/spacing.scss, grid-base.scss
- **RULE** Respect the user's browser font size (rem-based root, no fixed px root) and keep touch targets at least 48px (WCAG minimum 44px).
  **Why** Low-vision users set larger defaults; government services must meet Section 508.
  **Applies to** all, mobile. **Check** html font-size not set in px; interactive targets >= 44px. **Source** $theme-respect-user-font-size: true; variables/size-touch-target.scss
- **RULE** Route every transition through a helper that drops it under prefers-reduced-motion unless explicitly flagged essential.
  **Why** Reduced motion becomes the default behaviour, and exceptions are visible in code review.
  **Applies to** all. **Check** with reduced motion emulated, non-essential transitions compute to none. **Source** mixins/utilities/_transition.scss

## 3. Numbers & scales

| Item | Values |
|---|---|
| System type scale (px) | micro 10, 1:12, 2:13, 3:14, 4:15, 5:16, 6:17, 7:18, 8:20, 9:22, 10:24, 11:28, 12:32, 13:36, 14:40, 15:48, 16:56, 17:64, 18:80, 19:120, 20:140 |
| Theme type scale | 3xs=2, 2xs=3, xs=4, sm=5, md=6, lg=9, xl=12, 2xl=14, 3xl=15 |
| Headings default | h1 2xl, h2 xl, h3 lg, h4 sm, h5 xs, h6 3xs; heading line-height token 2 (1.2) |
| Body default | sm (16px token -> 17.04px rendered in Source Sans), line-height token 5 (1.62 -> 1.5 normalized) |
| Line-height tokens | 1:1, 2:1.2, 3:1.35, 4:1.5, 5:1.62, 6:1.75 |
| Measure | 44, 60, 64, 68, 72, 88 ex |
| Cap heights | base 362 (Public Sans), Source Sans Pro 340, Merriweather 371, Roboto Mono 380 |
| Weights | 300, 400, 700 (others off by default) |
| Spacing | 8px unit: 1,2,4,8,12,16,20,24,32,40,48,56,64,72,80,120 |
| Widths/breakpoints | card 160, card-lg 240, mobile 320, mobile-lg 480, tablet 640, tablet-lg 880, desktop 1024, desktop-lg 1200, widescreen 1400 |
| Radius | sm 2, md 4, lg 8, pill 99rem |
| Shadows | 1: 0 1px 4px; 2: 0 4px 8px; 3: 0 8px 16px; 4: 0 12px 24px; 5: 0 16px 32px (all rgba(0,0,0,.1)) |
| Motion | 0.15s ease-in-out |
| Focus | blue-40v #2491ff, 4px solid, offset 0 |
| Input height | 40px; touch target token 48px |
| Grade luminance bands | 5 .85-.93; 10 .75-.82; 20 .50-.65; 30 .35-.45; 40 .225-.30; 50 .175-.183; 60 .10-.125; 70 .05-.07; 80 .02-.04; 90 .005-.015 |
| Magic numbers | AA-large 40, AA 50, AAA 70 |
| Contrast (measured) | primary #005ea2/white 6.72:1; ink #1b1b1b 17.22:1; gray-cool-50 #71767a 4.59:1; red-50 #d83933 4.61:1 |

## 4. Dos and Don'ts

- Do set tokens in theme settings files and pass theme variables to functions/mixins; don't hard-code values in component Sass (design-tokens page).
- Do use role-named theme colours in components; don't reference system families directly in components.

## 5. Exceptions & judgement calls

- Normalized sizes are fractional (17.04px); in Figma, designers must use the rendered values or accept tiny mismatches. [engine note]
- No dark mode or density: the system optimises for reach and trust over expression. For a SaaS project bound to USWDS-like architecture, keep the architecture and swap the values. [engine note]
- Serif headings over sans body is distinctive for UI; a project can switch heading role to sans in one setting.

## 6. Figures worth keeping

- designsystem.digital.gov colour wheels (standard and vivid) arranged by HSL hue - not captured.

## 7. Open questions

- "State tokens" listed as a colour layer on the overview page but not described there.
- Exact rendered button height depends on line-height (not tokenised); not measured live.
