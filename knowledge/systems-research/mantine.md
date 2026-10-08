---
source: web:https://mantine.dev/theming/theme-object/
chapter: Mantine (theme object, colour ramps, size ladder, variants)
pages: n/a (web; repo mantinedev/mantine @ f7ab1ef, @mantine/core 9.7.1, studied 2026-10-08)
topic_tags: [design-systems, color, tokens, sizes, variants, dark-mode, density]
status: studied
---

# Mantine

Machine-readable profile: `system/systems-research/mantine.json`. Primary sources: packages/@mantine/core/src/core/MantineProvider (default-theme.ts, default-colors.ts, color-functions, MantineCssVariables) and component CSS modules; docs https://mantine.dev/theming/theme-object/ , https://mantine.dev/theming/colors/ , https://mantine.dev/styles/variants-sizes/ , https://mantine.dev/theming/color-schemes/ . Licence MIT. Raw excerpts: `corpus/web/systems/mantine/`.

## 1. Core ideas

1. **A hue is 10 hex values and two indices.** Every colour is an array of 10 shades (0 lightest, 9 darkest). The whole system (filled, light, outline, subtle, transparent, white, gradient, default variants; hover; light and dark scheme) is derived by pointing roles at shade indices. Adding a brand colour = supplying 10 values. https://mantine.dev/theming/colors/
2. **primaryShade is scheme-aware.** Default `{ light: 6, dark: 8 }`. The filled fill, its hover (shade+1, or 8 when the primary is 9), and the dark-scheme outline (primaryShade - 4) all follow it. One number tunes contrast per scheme.
3. **Roles map to indices, not colours.** Light scheme: filled = shade 6, light bg = 1, light hover = 2, light text = 9, outline = 6 with hover bg at 5% alpha. Dark scheme: filled = 8, light bg = shade 9 darkened 50% (hover 30%), light text = shade 0, text = shade 4. Source: get-css-color-variables.ts.
4. **Variants are one pure function.** `variantColorResolver({color, theme, variant, gradient, autoContrast}) -> {background, hover, color, border}` is shared by Button, ActionIcon, Badge, Alert, Avatar, Chip, ThemeIcon. New variant = new branch; docs show overriding it on the theme.
5. **One size ladder xs-xl for every control.** Button, Input, ActionIcon-in-input share heights 30/36/42/50/60 so they align. Padding, font-size and icon size are derived from the same key. Sizes are exposed as component CSS variables and `data-size`, so custom sizes are additive.
6. **Dark mode is a different neutral ramp, not an inversion.** Body #242424, text #C9C9C9, surfaces 6/5/4 steps; the `dark` array is ordered text-first (index 0 lightest).
7. **Typography uses two ladders.** fontSizes xs-xl (12-20px) with lineHeights that increase with size (1.4 to 1.65); headings h1-h6 (34-14px) whose line-height decreases as size grows (1.3 to 1.5). Medium weight is 600, not 500.
8. **A single radius knob** (`defaultRadius: md` = 8px) read through `--mantine-radius-default`.
9. **Auto-contrast is an explicit rule.** `autoContrast` (default false) plus `luminanceThreshold` (0.3) decides white vs black text on filled colours. Default is always white, which fails AA on blue-6 (3.56:1, measured).
10. **Focus ring is policy-driven.** `focusRing: auto | always | never`; auto = 2px solid primary, 2px offset, `:focus-visible` only. Inputs signal focus with a border colour change instead of an outline.

## 2. Rules

- **RULE** Define every brand hue as a 10-step ramp (lightest to darkest) and bind variant roles to shade INDICES (filled 6 light / 8 dark, hover = filled + 1, soft bg 1, soft text 9 light / 0 dark, text-on-dark-scheme 4); never pick per-component hex.
  **Why** Index maps make every variant of every hue consistent and make a rebrand a 10-value change; hex-per-use drifts.
  **Applies to** SaaS app UI | landing page | all
  **Check** For each brand ramp, assert that the soft-variant text (shade 9) against the soft bg (shade 1) is at least 4.5:1 and that filled text vs filled bg meets 4.5:1 (Mantine blue.9 on blue.1 = 4.93:1).
  **Source** https://mantine.dev/theming/colors/ ; get-css-color-variables.ts

- **RULE** Give light and dark schemes separate primary shade indices (default light 6, dark 8) and re-derive dark soft backgrounds by darkening the darkest shade (50% base, 30% hover) rather than reusing the light fill.
  **Why** The same fill needs a different lightness against a dark canvas to hold contrast and avoid glow.
  **Applies to** all
  **Check** Compute contrast of text on the filled colour in both schemes; both must reach 4.5:1 for body-size labels (Mantine blue: 3.56:1 light-6 fails, 5.02:1 dark-8 passes).
  **Source** default-theme.ts primaryShade; get-css-color-variables.ts

- **RULE** Use one control-height ladder for all form controls and buttons: 30 / 36 / 42 / 50 / 60 px for xs / sm / md / lg / xl, default sm (36px), with matching icon-button sizes in input context, so same-size controls share one height in a row.
  **Why** Mixed heights break the baseline of toolbars and form rows.
  **Applies to** SaaS app UI | forms
  **Check** Computed height of Button and Input at the same size attribute must be equal; all control heights must belong to the ladder.
  **Source** Button.module.css, Input.module.css, ActionIcon.module.css (--ai-size-input-*)

- **RULE** Pair body font-size steps with growing line-heights (12px/1.4, 14px/1.45, 16px/1.55, 18px/1.6, 20px/1.65) and heading steps with shrinking ones (34px/1.3, 26px/1.35, 22px/1.4, 18px/1.45, 16px/1.5, 14px/1.5).
  **Why** Small text needs relatively more leading for legibility; large display text looks loose at body leading.
  **Applies to** all
  **Check** Computed line-height / font-size: body 1.4-1.65, h1-h2 1.3-1.35; flag headings above 1.4 when size is 26px or larger.
  **Source** default-theme.ts (fontSizes, lineHeights, headings.sizes)

- **RULE** Express text-on-colour as a rule, not a hope: default to white text on filled colours but switch to black when the fill's relative luminance exceeds a threshold (Mantine 0.3), and allow it per component.
  **Why** Light brand colours (yellow, lime, cyan) fail with white text.
  **Applies to** all
  **Check** For every filled colour in the palette compute luminance; if > 0.3 text must be black; verify contrast >= 4.5:1.
  **Source** https://mantine.dev/theming/theme-object/ (autoContrast, luminanceThreshold); luminance.ts

- **RULE** Model Disabled as three tokens (background gray-2, text gray-5, border gray-3 in light; dark-6 / dark-3 / dark-4 in dark) shared by every control, and Error/Success as a border plus text plus placeholder plus section-icon colour change together.
  **Why** Partial state styling (only a red border) reads as a bug and differs across components.
  **Applies to** forms | SaaS app UI
  **Check** For each form control, enumerate the CSS properties that change in disabled and error states; they must match across Input, Select, Textarea.
  **Source** default-css-variables-resolver.ts; Input.module.css

- **RULE** Expose a single global radius token (default md = 8px) that every component reads, with a 5-step scale 2 / 4 / 8 / 16 / 32 px; allow per-component override by scale key.
  **Why** Radius is the cheapest lever for brand character; one token keeps every component coherent.
  **Applies to** all
  **Check** Collect border-radius on button, input, card, popover; each must equal one scale value or the global default.
  **Source** default-theme.ts (radius, defaultRadius)

- **RULE** Show keyboard focus with a 2px solid ring in the primary filled colour at 2px offset, only on :focus-visible, and make the policy a theme switch (auto, always, never) with auto recommended.
  **Why** Visible, consistent keyboard focus without a ring on every mouse click.
  **Applies to** all
  **Check** Tab through interactive elements; each shows a >= 2px ring with contrast >= 3:1 against adjacent colours; mouse click shows none.
  **Source** global.css (.mantine-focus-auto); theme-object docs (focusRing)

- **RULE** Give every interactive element a physical pressed response: translateY(1px) on :active, disabled inside disabled fieldsets; loading buttons slide the label (150ms transform, 100ms opacity) and show a loader rather than swapping the size.
  **Why** Feedback without layout shift confirms input.
  **Applies to** SaaS app UI | landing page
  **Check** Compute :active transform on buttons; loading state keeps width and height unchanged.
  **Source** global.css (.mantine-active); Button.module.css

- **RULE** Build depth shadows as a tight 1px contact shadow plus one or two large, negatively spread ambient layers (e.g. 0 1px 3px .05 + 0 20px 25px -5px .05 + 0 10px 10px -5px .04), never a single blur.
  **Why** Layered shadows read as soft elevation without a muddy halo.
  **Applies to** all
  **Check** Parse box-shadow on elevated surfaces: >= 2 layers, opacity <= 0.1 each in light mode.
  **Source** default-theme.ts (shadows xs-xl)

- **RULE** Keep a tokenised motion scale; do not copy Mantine's per-component literals (100/150/200/250ms) as a system.
  **Why** [engine note] Mantine hard-codes durations per component and makes reduced motion opt-in, which is the weakest part of its spec.
  **Applies to** all
  **Check** Collect all transition-duration values in a built page; they should come from a small set.
  **Source** Button.module.css, Tooltip.tsx, Popover.tsx, Modal.tsx; theme.respectReducedMotion default false

## 3. Numbers & scales

| Token | xs | sm | md | lg | xl |
|---|---|---|---|---|---|
| font-size px | 12 | 14 | 16 | 18 | 20 |
| line-height | 1.4 | 1.45 | 1.55 | 1.6 | 1.65 |
| spacing px | 10 | 12 | 16 | 20 | 32 |
| radius px | 2 | 4 | 8 | 16 | 32 |
| button / input height px | 30 | 36 | 42 | 50 | 60 |
| button padding-x px | 14 | 18 | 22 | 26 | 32 |
| compact button height px | 22 | 26 | 30 | 34 | 40 |
| ActionIcon px | 18 | 22 | 28 | 34 | 44 |
| input padding-y px | 5 | 6 | 8 | 10 | 13 |
| badge height px | 16 | 18 | 20 | 26 | 32 |
| checkbox / switch px | 16 | 20 | 24 | 30 | 36 |

Headings: h1 34/1.3, h2 26/1.35, h3 22/1.4, h4 18/1.45, h5 16/1.5, h6 14/1.5, weight 700. Font weights 400 / 600 / 700. Breakpoints 36, 48, 62, 75, 88 em. Z-index: app 100, modal 200, popover 300, overlay 400, max 9999. Default colours: primaryColor blue; neutrals `gray` (#f8f9fa to #212529) and `dark` (#C9C9C9 to #141414). Surfaces: light body #fff text #000 border gray-4 #ced4da; dark body #242424 text #C9C9C9 border #424242. Measured contrast (this study): white on blue-6 3.56, white on blue-8 5.02, blue-9 on blue-1 4.93, gray-6 on white 3.32, gray-5 on white 2.07, dark-0 on dark-7 9.37, dark-2 on dark-7 4.04. Motion literals: 100, 150, 200, 250ms; easing `ease`.

## 4. Dos and Don'ts

- Do: `color="blue"` with `variant="light"` for secondary actions: soft bg shade 1, text shade 9 (4.93:1). Don't: put a pale brand yellow in `filled` with default white text; set autoContrast or `c="black"`.
- Do: add a brand hue by supplying 10 values (or `colorsTuple`), then set `primaryColor`; Don't: set `primaryColor` to a CSS value (throws).
- Do: tune `primaryShade` separately for dark; Don't: reuse the light fill on dark surfaces.

## 5. Exceptions & judgement calls

- Mantine ships a system font stack; its 'look' is generic until a font is chosen. [engine note] A house system should bind a specific type voice, which Mantine does not.
- Spacing is not a 4px grid (10/12/16/20/32). [engine note] Our rule is a 4px base; Mantine's xs 10 and sm 12 are off-grid compromises for compact UI.
- White text on the default blue-6 is 3.56:1. Mantine accepts this for 14px/600 buttons; our engine should require >= 4.5:1 for text under 18.66px bold.
- Reduced motion is opt-in. [engine note] We treat reduced-motion safe as default.
- Badge is a hard 1000px pill, ignoring defaultRadius.

## 6. Figures worth keeping

n/a (web source). Useful docs demos: colors page "primaryShade configurator" (https://mantine.dev/theming/colors/), variants and sizes page.

## 7. Open questions

- Exact easing token on Transition (`theme.transitionTimingFunction`) default value not confirmed in this pass (component CSS uses `ease`).
- Satellite packages (dates, charts, spotlight, schedule) not studied beyond names.
- Component count is the number of directories in `@mantine/core/src/components` (119), including layout helpers and utilities, not a curated "UI component" count.
