---
source: web:https://www.patternfly.org ; https://github.com/patternfly/patternfly
chapter: PatternFly 6 (Red Hat) - three-layer tokens, composable themes, relationship spacing
pages: n/a (npm @patternfly/patternfly@6.6.1 base/patternfly-variables.css + tokens/*.scss resolved by script; component CSS; patternfly.org design-tokens overview; fetched 2026-10-08)
topic_tags: [design-system, tokens, token-layers, naming, dark-mode, high-contrast, glass, spacing, motion, enterprise, red-hat]
status: studied
---

# PatternFly 6 (Red Hat)

Spec: `system/systems-research/patternfly.json`. Raw: `corpus/web/systems/patternfly/`. Licence MIT.

## 1. Core ideas

1. **Three layers with usage rules.** Palette (never use directly) -> base (concept-grouped, numeric names, no duplicate values within a concept; fallback only) -> semantic (use these). (patternfly.org design-tokens overview)
2. **Name schema:** `--pf-t--[scope]--[component]--[property]--[concept]--[variant]--[state]`, general to specific, segments omitted when not applicable (e.g. `--pf-t--global--border--width--regular`).
3. **Composable theme classes:** `.pf-v6-theme-dark`, `-high-contrast`, `-felt` (Red Hat brand: pill controls, brand accent), `-glass` (60% white surfaces, 16px backdrop blur, background image) and their combinations, all remapping the same semantic names.
4. **Relationship-named spacing:** gap text-to-element, control-to-control, action-to-action, group-to-group, page-chrome inset; each with compact/default/spacious.
5. **Pill primary buttons, 6px form controls, 16px cards.**
6. **Dark surfaces get lighter as they rise:** page #151515, primary #292929, floating #383838.
7. **Info is purple (#5e40be)**, so it never collides with blue brand/link colour.
8. **Purpose-named motion durations:** icon, fade, slide-in, slide-out x short/default/long.
9. **Red Hat Display for headings, Red Hat Text for body, Red Hat Mono for code**, with Noto fallbacks for Arabic, Hebrew, CJK, Malayalam, Thai in the stack itself.

## 2. Rules

- **RULE** Organise tokens in three layers (palette -> base -> semantic) and forbid components from referencing palette tokens; base tokens only when no semantic token fits.
  **Why** Themes remap the semantic layer; any palette reference becomes a theme bug.
  **Applies to** design systems. **Check** grep component CSS for palette-layer names (e.g. `--pf-t--color--`): count must be 0. **Source** patternfly.org design-tokens overview/develop
- **RULE** Name tokens general-to-specific with fixed segment order (scope, component, property, concept, variant, state) and omit segments that don't apply rather than filling them with "default".
  **Why** Predictable names are guessable and sortable; omitted segments keep names short.
  **Applies to** design systems. **Check** token names parse against the schema regex. **Source** design-tokens overview
- **RULE** Name spacing tokens by the relationship they separate (text-to-element 8, control-to-control 4, action-to-action 16, group-to-group vertical 24 / horizontal 48) with compact and spacious variants.
  **Why** Designers pick intent, not pixels; density changes stay coherent.
  **Applies to** all. **Check** spacing values used between label/control, buttons, and groups match the relationship table. **Source** --pf-t--global--spacer--gap--* tokens
- **RULE** Deliver high-contrast and high-contrast-dark as first-class themes that compose with brand themes, turning on borders that are transparent in the default theme.
  **Why** Users who need more contrast get it without losing the product's brand theme.
  **Applies to** SaaS app UI. **Check** a high-contrast class exists and toggles visible borders on controls/cards. **Source** patternfly-variables.css :root:where(.pf-v6-theme-high-contrast)
- **RULE** In dark mode, express elevation through surface lightness: the page is darkest, cards lighter, floating menus lighter still (#151515 < #292929 < #383838).
  **Why** Shadows disappear on dark backgrounds; lighter = closer matches perception.
  **Applies to** all with dark mode. **Check** dark theme: luminance(floating) > luminance(card) > luminance(page). **Source** tokens-dark.scss resolved values
- **RULE** Use a non-brand hue for the info status when the brand/link colour is blue (PatternFly uses purple #5e40be).
  **Why** Info banners in link-blue read as clickable and dilute the brand colour.
  **Applies to** all. **Check** info status colour hue differs from link colour hue by >= 30 degrees. **Source** --pf-t--global--color--status--info--default
- **RULE** Name motion durations by purpose and size (icon 50/100/200, fade 100/200/300, slide-in/out 300/400/500 ms) with three curves: decelerate (0,0,.2,1) entering, accelerate (.4,0,.7,.2) leaving, default (.4,0,.2,1) moving.
  **Why** Components choose intent; the scale stays tunable globally.
  **Applies to** all. **Check** transition durations used in components are members of the purpose table. **Source** --pf-t--global--motion--* tokens
- **RULE** Give actions (buttons) pill radius and form controls a small radius (6px) so actions and inputs are distinguishable by shape.
  **Why** Shape difference separates "do" from "enter" without relying on colour.
  **Applies to** SaaS app UI, forms. **Check** button border-radius >= height/2; input radius <= 8px. **Source** border--radius--action--default = pill; control--form-element = small
- **RULE** Use two line-heights only: 1.3 for headings and 1.5 for body/UI text.
  **Why** Fewer values, consistent rhythm, adequate leading for 14px body.
  **Applies to** all. **Check** computed line-height ratio on headings 1.25-1.35, body 1.45-1.55. **Source** --pf-t--global--font--line-height--heading/body
- **RULE** Put multi-script fallbacks (Noto Sans Arabic, Hebrew, JP, KR, SC, TC, Thai, Malayalam) directly in the global font stacks.
  **Why** Every component handles localised content without per-locale overrides.
  **Applies to** multilingual products. **Check** font-family stack includes script-specific fallbacks. **Source** --pf-t--global--font--family--100/200

## 3. Numbers & scales

| Item | Values |
|---|---|
| Fonts | Red Hat Text (body), Red Hat Display (heading), Red Hat Mono |
| Sizes | xs 12, sm 14 (body default), md 16, lg 18, xl 20, 2xl 24, 3xl 28, 4xl 36 px |
| Headings | h1 24, h2 20, h3 18, h4-h6 16 |
| Weights | body 400 / bold 600; heading default 600 / bold 800 |
| Line-height | heading 1.3, body 1.5 |
| Spacers | xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 3xl 64, 4xl 80 |
| Radius | sharp 0, tiny 4, small 6, medium 16, large 24, pill 999 |
| Border widths | 1, 2, 3 px |
| Shadows | sm 0 1px 6px, md 0 4px 10px, lg 0 10px 20px; rgba(41,41,41,.15) light / rgba(0,0,0,.5) dark |
| Durations | 50,100,200,300,400,500,600 ms; delays 0/50/100/7000 |
| Breakpoints | 36, 40, 48, 60, 62, 75, 80, 90.625 rem |
| Focus ring | offset 2px width 2px; inset width 3px |
| Button (derived) | 37px default (21px line + 2x8), 29px compact, 53px display-lg |
| Contrast (measured) | brand #0066cc/white 5.57:1; subtle #4d4d4d 8.45:1; danger #b1380b 6.10:1; dark brand #92c5f9/#292929 8.02:1 |

## 4. Dos and Don'ts

- Do use the semantic token that best matches; don't use palette tokens directly (develop-with-tokens).
- Don't expect one-to-one migration from PF5 variables; manually remap custom CSS to semantic tokens.

## 5. Exceptions & judgement calls

- Glass theme (translucent surfaces + blur) is an officially supported option in an enterprise system; use only where background imagery exists and text contrast is re-verified. [engine note]
- Warning yellow #ffcc17 is a fill/icon colour; text on it must be dark. [engine note]
- Deep var() chains (component -> semantic -> base -> palette) cost debugging time; mitigate with a resolver script like the one used here. [engine note]

## 6. Figures worth keeping

None captured.

## 7. Open questions

- Several patternfly.org URLs (/tokens/about-tokens, /design-foundations/colors) returned 404; docs moved to /foundations-and-styles/*.
- Form control rendered height not resolved (padding chain via __input tokens).
