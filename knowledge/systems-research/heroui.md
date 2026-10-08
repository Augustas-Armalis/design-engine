---
source: web:https://www.heroui.com/docs/react/getting-started/theming
chapter: HeroUI (formerly NextUI): v3 CSS-variable theme and v2 legacy plugin
pages: n/a (web; repo heroui-inc/heroui main @ 83b92df = v3 @heroui/styles 3.2.6, plus branch v2 for the legacy Tailwind plugin; studied 2026-10-08)
topic_tags: [design-systems, tokens, color, oklch, dark-mode, variants, sizes, radius, motion]
status: studied
---

# HeroUI (formerly NextUI)

Machine-readable profile: `system/systems-research/heroui.json`. Important context: the current product is **v3** (Tailwind CSS v4 + React Aria, pure CSS theme, no Tailwind plugin, no provider). The "NextUI-style" plugin with layout tokens and 50-900 colour ramps is **v2**, kept on the `v2` branch. Both are covered. Sources: packages/styles (themes/default/variables.css, themes/shared/theme.css, utilities/index.css, components/*.css), docs https://www.heroui.com/docs/react/getting-started/theming , https://www.heroui.com/docs/react/getting-started/colors , https://www.heroui.com/docs/react/getting-started/design-principles ; v2: packages/core/theme/src (plugin.ts, default-layout.ts, colors/semantic.ts, colors/*.ts). Licence Apache-2.0. Raw excerpts: `corpus/web/systems/heroui/` (v2 files under `v2/`).

## 1. Core ideas

1. **Semantic intent over visual style.** Button variants are primary (one per context), secondary (several), tertiary (dismissive, sparingly), danger (destructive), plus ghost, outline, danger-soft. Replaces v2's solid / bordered / flat. The docs credit Uber's Base design system for the idea.
2. **One value per colour role.** v3 defines `--accent`, `--success`, `--warning`, `--danger`, `--default`, `--muted`, `--border`, ... once; hover, soft backgrounds, soft foregrounds and border levels are computed with `color-mix(in oklab, ...)`. The colours page states that most colours are derived from a limited number of base values.
3. **Suffix grammar.** No suffix = background, `-foreground` = text on it, plus `-hover`, `-soft`, `-soft-foreground`, `-soft-hover`.
4. **Surface vs overlay.** Non-floating containers (cards, accordions) use `--surface` (+ secondary, tertiary); floating layers (tooltips, popovers, modals, menus) use `--overlay`. Each has its own shadow token (`--surface-shadow`, `--overlay-shadow`, `--field-shadow`).
5. **Radius from a single base.** `--radius: 0.5rem`; xs..4xl are multipliers (0.25x to 4x); `--field-radius` is 1.5x. Component defaults are large (Button 24px pill, Chip 16px, Card 24px, Input 12px).
6. **Borderless fields.** `--field-border-width: 0px` and `--field-border: transparent`; fields are a white (light) or surface (dark) fill with a soft shadow; border colour appears by mixing toward the field foreground on hover (88/10) and focus (74/22).
7. **Dark mode removes shadows, adds an inset edge.** Surfaces drop to no shadow; overlays get a 1px inset rgba(255,255,255,.3) edge; soft tint opacity falls from 15% to 12%.
8. **Behaviour from data attributes.** Styles key off React Aria attributes (data-hovered, data-pressed, data-focus-visible, data-disabled, data-invalid, data-pending), so the same CSS works for any framework.
9. **Reduced motion is built in.** `motion-reduce` variant honours `data-reduce-motion="true"` before `prefers-reduced-motion`, and every transition is followed by `motion-reduce:transition-none`.
10. **Touch-first sizing.** Controls are 4px taller on small viewports (button md 40px, 36px from md breakpoint up); inputs are 16px text on mobile and 14px from sm (avoids iOS zoom). Hover styles are only applied under `@media (hover: hover)`.

## 2. Rules

- **RULE** Name button variants by intent and cap their use: primary = the single main action per context, secondary = alternatives (several allowed), tertiary = dismissive actions (cancel, skip), danger = destructive; never name or choose a variant by visual treatment (solid, flat, bordered).
  **Why** Hierarchy is decided by the action's role, so the same intent re-skins correctly in any theme.
  **Applies to** SaaS app UI | landing page | forms
  **Check** Per view, count primary buttons <= 1 per context; visual rule: only one filled accent button in the viewport.
  **Source** https://www.heroui.com/docs/react/getting-started/design-principles (principle 1)

- **RULE** Define each colour role once (base + foreground) and derive hover (accent 90% + foreground 10% in oklab), soft background (15% light, 12% dark over transparent), soft hover (20% / 16%) and soft foreground (accent 70% + foreground 30%) by formula instead of authoring each.
  **Why** Derivation guarantees every state stays on-hue and lets a theme change one variable.
  **Applies to** all
  **Check** In the system spec every colour role has exactly one authored value; hover and soft values are expressions. Verify soft-foreground on soft-background >= 4.5:1.
  **Source** packages/styles/themes/default/variables.css ("Calculated Colors")

- **RULE** Separate surface tokens (in-flow containers: surface, surface-secondary, surface-tertiary) from overlay tokens (floating layers) and give each its own foreground and shadow; in dark mode drop the surface shadow and give overlays a 1px inset light edge.
  **Why** Elevation is communicated by lightness steps and edges on dark backgrounds, since drop shadows disappear.
  **Applies to** SaaS app UI | all
  **Check** In dark mode, elevated components have inset edge or lightness step vs background (engine heuristic: surface vs background contrast >= 1.1:1); light mode cards sit on a grey page (#f5f5f5) as white.
  **Source** variables.css (--surface-shadow, --overlay-shadow)

- **RULE** Drive the radius scale from one base value with fixed multipliers (xs 0.25x, sm 0.5x, md 0.75x, lg 1x, xl 1.5x, 2xl 2x, 3xl 3x, 4xl 4x) and a separate field multiplier (1.5x) so inputs and containers can diverge from controls.
  **Why** Changing character (sharp to soft) is a one-variable edit while proportions stay coherent.
  **Applies to** all
  **Check** All border-radius values in the built CSS must be scale multiples or full.
  **Source** themes/shared/theme.css (--radius-*), variables.css (--radius, --field-radius)

- **RULE** Make form fields borderless by default (border width 0, tinted or white fill, soft field shadow) and reveal state by mixing the border toward the field foreground: hover 88/10, focus 74/22, plus a 2px focus ring with 0 offset; invalid = 1px danger outline that becomes a 2px ring on focus.
  **Why** Quiet idle fields reduce visual noise; state is clear without layout shift because width is token-controlled.
  **Applies to** forms
  **Check** Compare field box size at rest, hover, focus, invalid: unchanged. Focus ring contrast against surface >= 3:1.
  **Source** components/input.css; utilities/index.css (focus-field-ring, invalid-field-ring)

- **RULE** Put an offset ring (2px ring + 2px background-coloured offset) on :focus-visible for buttons, and a flush ring (2px, 0 offset) for fields; style disabled with a single shared utility (opacity 0.5, cursor not-allowed, pointer-events none).
  **Why** An offset ring stays visible over filled controls; one disabled utility prevents drift.
  **Applies to** all
  **Check** Tab through; ring width >= 2px with the focus colour; disabled controls report cursor not-allowed and opacity 0.5.
  **Source** utilities/index.css (focus-ring, status-disabled)

- **RULE** Scale press feedback with control size (sm scale 0.98, md 0.97, lg 0.96) and animate transform at 250ms with colour at 100ms; apply hover only under a hover-capable media query.
  **Why** Consistent physical feedback; avoids sticky hover on touch devices.
  **Applies to** SaaS app UI | landing page | mobile
  **Check** Computed :active transform scale matches the size; hover rules are inside @media (hover:hover).
  **Source** components/button.css

- **RULE** Size touch controls larger than pointer controls: 36 / 40 / 44px (sm / md / lg) by default and 32 / 36 / 40px at the md breakpoint and above; widen sub-24px hit areas with a transparent 24px overlay (touch-target utility).
  **Why** Finger targets need more size; WCAG 2.5.8 sets a 24px minimum target.
  **Applies to** mobile | SaaS app UI
  **Check** At 375px viewport button/input height >= 40px for md; any interactive element < 24px has an enlarged hit area.
  **Source** components/button.css; utilities/index.css (touch-target)

- **RULE** Treat reduced motion as part of the system: a motion-reduce variant keyed to an explicit attribute first and prefers-reduced-motion second, and put it after every transition declaration.
  **Why** Specificity and order decide whether reduced motion actually wins; an explicit attribute allows user override.
  **Applies to** all
  **Check** With prefers-reduced-motion emulated, computed transition-duration of buttons, inputs and tabs is 0s.
  **Source** variants/index.css; components/button.css

- **RULE** Do not copy v3's accent/danger pairings blindly: white-ish foreground on accent oklch(0.6204 0.195 253.83) measures about 3.59:1 and on danger about 3.48:1, below 4.5:1 for 14px labels.
  **Why** [engine note] Measured from this study's oklch conversion; teams should darken the fill or enlarge/bold the text.
  **Applies to** all
  **Check** Contrast of -foreground on base for every role >= 4.5:1 (or >= 3:1 only for 18.66px bold or larger text).
  **Source** variables.css; this study (WCAG formula, conversion error under +/-0.05)

## 3. Numbers & scales

| Item | Value |
|---|---|
| spacing | --spacing 0.25rem (Tailwind v4) |
| --radius | 0.5rem (8px); xs 2, sm 4, md 6, lg 8, xl 12, 2xl 16, 3xl 24, 4xl 32; field 12 |
| border width | 1px; field border width 0px; disabled opacity 0.5; ring offset 2px |
| button height | sm 36/32, md 40/36, lg 44/40 px (below / above md breakpoint) |
| button radius | 24px (rounded-3xl) |
| button text | text-sm (14px) font-medium; lg text-base |
| press scale | sm 0.98, md 0.97, lg 0.96 |
| tab | 32px tall, rounded-3xl; indicator slides 250ms |
| chip | rounded-2xl 16px, px 8, py 2, text 12px/500; lg px 12 py 4 text 14px |
| badge min size | sm 16, md 28, lg 32 px; radius 12 / 24 / 16 |
| tooltip delay | 1500ms open, 500ms close |
| durations used | 50, 100, 150, 200, 250, 300, 350ms |
| easings | ease; ease-out; ease-out-quart (0.165,0.84,0.44,1); ease-out-fluid (0.32,0.72,0,1) |
| z-index overlay | 100000 (matches React Aria popovers), toast +1 |
| light page / surface | #f5f5f5-ish (oklch .9702 0 0) / white |
| dark page / surface | oklch(12% .005 285.8) / oklch(.2103 .0059 285.89) |

Colours (v3): accent oklch(0.6204 0.195 253.83); success oklch(0.7329 0.1935 150.81); warning oklch(0.7819 0.1585 72.33) light / oklch(0.8203 0.1388 76.34) dark; danger oklch(0.6532 0.2328 25.74) light / oklch(0.594 0.1967 24.63) dark; foreground eclipse oklch(0.2103 0.0059 285.89); snow oklch(0.9911 0 0). v2 layout: radius 8 / 12 / 14, border 1 / 2 / 3px, divider 1px, disabled opacity .5, hover opacity .8 light / .9 dark, boxShadow small / medium / large (values in the JSON profile), primary #006FEE. v2 ramps are 9 steps (50-900), dark swaps the ramp.

## 4. Dos and Don'ts

- Do: `Button variant="primary"` once for the main action, `secondary` for alternates, `tertiary` for cancel. Don't: three primaries in one card.
- Do: change `--accent` and `--radius` to rebrand. Don't: hard-code colours inside components (docs: foreground colours should never be hard-coded at the component level).
- Do: put focus on the keyboard-only path with the ring utilities. Don't: strip outlines without a replacement.

## 5. Exceptions & judgement calls

- v3 ships no typeface and no type scale; typography must come from the host project. [engine note] A house system built on HeroUI must add its own type spec.
- Disabled is opacity 0.5 across the board, which is simple but not contrast-checked. [engine note]
- Tooltip open delay of 1500ms is far longer than common 300-700ms defaults.
- Pill radii are a character decision, not a universal best practice; for dense UIs lower `--radius`.
- v2 and v3 are different systems; do not mix their tokens (v2 `--heroui-*` HSL channels vs v3 bare oklch variables).

## 6. Figures worth keeping

- Docs "Semantic Intent Hierarchy" diagram (design-principles page): emphasis ladder primary > secondary > tertiary.
- Theme Builder (https://www.heroui.com/themes) exports a theme as CSS.

## 7. Open questions

- Complete v2 variant list and v2 motion details not re-verified.
- v3 Table, Calendar and Toast sizes not extracted; only Button, Input, Card, Chip, Badge, Tabs, Switch, Kbd were read.
- Hex values in the JSON for oklch tokens are this study's conversions (approximate).
