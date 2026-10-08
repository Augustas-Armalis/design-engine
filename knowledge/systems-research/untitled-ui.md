---
source: web:https://www.untitledui.com/react/docs ; https://www.untitledui.com/llms.txt ; https://www.untitledui.com/react/AGENT.md ; https://github.com/untitleduico/react (theme.css, globals.css, typography.css, button.tsx, input.tsx) ; https://unpkg.com/tailwindcss@4.1.11/theme.css
chapter: Untitled UI (React + Figma) design system profile
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, tokens, semantic-color, dark-mode, saas-ui, tailwind-v4, react-aria, buttons]
status: studied
---

# Untitled UI

Machine profile: `system/systems-research/untitled-ui.json`. Raw fetches: `corpus/web/systems/untitled-ui/` (gitignored). Licence: React base components MIT (untitleduico/react); PRO components, Figma PRO kit and templates are paid one-time licences. Only public/MIT material was studied; PRO content was not read or reproduced.

## 1. Core ideas

1. **Hierarchy-named semantic tokens.** `primary / secondary / tertiary / quaternary` are applied identically to text, fg (icons), bg and border (`text-secondary`, `fg-quaternary`, `bg-secondary`, `border-tertiary`); intent tokens are `brand`, `error`, `warning`, `success`. States and contexts are suffixes: `_hover`, `_alt`, `_on-brand`.
2. **Dark mode is a token remap, never component code.** One class `dark-mode` redefines semantic vars (`bg-primary` white to neutral-950, `text-primary` neutral-900 to neutral-50, `border-primary` neutral-300 to neutral-700); brand text and some brand foregrounds fall back to neutral in dark.
3. **One brand ramp (50-950) to rebrand.** Default purple (600 = rgb(127 86 217)); the CLI can bind brand to any Tailwind palette. Focus ring = brand-500; interactive = 600; hover = 700.
4. **Type on a 4px grid:** text xs 12/18, sm 14/20, md 16/24, lg 18/28, xl 20/30; display xs 24/32, sm 30/38, md 36/44, lg 48/60, xl 60/72, 2xl 72/90; display md+ tracking -0.02em. Inter for body and display.
5. **Skeuomorphic-lite buttons:** `shadow-xs-skeuomorphic` = inset 0 0 0 1px rgba(0,0,0,0.18) + inset 0 -2px 0 rgba(0,0,0,0.05) + shadow-xs, plus a masked inner 1px white/12% highlight; secondary/tertiary share it.
6. **Size ladder from padding + line-height:** Button xs 32, sm 36 (default), md 40, lg 44, xl 48px; Input sm 36, md 40, lg 44; radius 8px (`rounded-lg`) at every size.
7. **Single disabled treatment:** `disabled:cursor-not-allowed disabled:opacity-50` (v8), replacing per-token disabled colours.
8. **Micro-transition default:** `transition duration-100 ease-linear`.
9. **Structure:** `components/base` (primitives), `application` (complex), `foundations`, `marketing`, `shared-assets`; each component styled with `sortCx({common, sizes, colors})` and props `size`, `color`, `isDisabled`, `isLoading`, `iconLeading/iconTrailing`.
10. **Agent-first docs:** llms.txt, AGENT.md, `.md` of each doc page, CLI (`npx untitledui@latest add`), MCP server.

## 2. Rules

- **RULE** Name semantic tokens by hierarchy (primary, secondary, tertiary, quaternary) and reuse the same four-step ladder for text, icon (fg), background and border; add intent tokens (brand, error, warning, success) and state suffixes (`_hover`, `_alt`, `_on-brand`).
  **Why** Designers and developers pick by importance, not by value; one vocabulary spans every property.
  **Applies to** SaaS app UI | all
  **Check** components use only semantic utilities (`text-primary`, `bg-secondary`); grep for raw `gray-`/`neutral-` utilities in component files returns none.
  **Source** theme.css ; docs/dark-mode

- **RULE** Implement dark mode only by re-mapping semantic tokens under one class; components must contain no `dark:` variants for colour.
  **Why** Prevents drift between themes and allows dark islands inside light pages by adding the class to any element.
  **Applies to** all
  **Check** grep components for `dark:` colour utilities; toggling `.dark-mode` re-colours all components.
  **Source** docs/dark-mode ; globals.css (@custom-variant dark)

- **RULE** Keep one brand ramp of 11-12 steps (50-950) and point the semantic tokens at steps (bg-brand-solid 600, hover 700, focus ring 500, text-brand-secondary 700, border-brand 500); supply a complete ramp with proper contrast.
  **Why** Rebranding is a one-block edit; semantic mapping preserves contrast relationships.
  **Applies to** landing page | SaaS app UI
  **Check** brand ramp present with 50-950; white text on brand-600 >= 4.5:1.
  **Source** AGENT.md (Brand Color Customization) ; theming.md

- **RULE** Derive control height from padding plus line-height and publish the ladder (Button xs 32 / sm 36 / md 40 / lg 44 / xl 48; Input sm 36 / md 40 / lg 44); icons 16px at xs, 20px otherwise.
  **Why** Predictable heights keep rows aligned and make inputs and buttons join in InputGroup.
  **Applies to** forms | SaaS app UI
  **Check** measure computed height of each size; button in an input group matches input height.
  **Source** components/base/buttons/button.tsx ; input.tsx

- **RULE** Use one disabled style across all components: 50% opacity and `cursor-not-allowed`; do not define per-component disabled colours.
  **Why** One rule to learn, test and maintain; disabled colours rarely meet contrast anyway.
  **Applies to** forms | SaaS app UI
  **Check** disabled elements computed opacity 0.5.
  **Source** AGENT.md (Disabled states)

- **RULE** Give primary and secondary buttons a layered edge: 1px inset ring, 2px inner bottom shade, xs drop shadow, and for solid colours a masked 1px inner highlight (white at 12%).
  **Why** Tactile affordance without gradients or heavy shadows.
  **Applies to** SaaS app UI | landing page
  **Check** computed box-shadow contains two inset entries and 0 1px 2px outer; hover changes bg only.
  **Source** theme.css (--shadow-skeuomorphic) ; button.tsx

- **RULE** Build input focus as `ring-2 ring-brand` and invalid as `ring-error_subtle` (focus + invalid: `ring-2 ring-error`), drawn as inset rings so the box does not grow.
  **Why** No layout shift and separate emphasis for focus and error combined.
  **Applies to** forms
  **Check** focus-within changes ring width 1px to 2px with no change in element size.
  **Source** components/base/input/input.tsx

- **RULE** Set the default micro-transition to 100ms linear for colour/hover changes and only add longer motion where meaning demands.
  **Why** 100ms is perceptually instant; linear avoids ease lag on colour fades.
  **Applies to** all
  **Check** computed transition-duration on buttons/inputs 100ms.
  **Source** AGENT.md (CSS Transitions)

- **RULE** Express type sizes in multiples of the spacing unit (12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72px) with line-heights from the same grid (18, 20, 24, 28, 30, 32, 38, 44, 60, 72, 90) and add -0.02em tracking from 36px up.
  **Why** Aligns type with the spacing grid and tightens big headings.
  **Applies to** landing page | SaaS app UI
  **Check** font-size and line-height values belong to the list; letter-spacing negative at >= 36px.
  **Source** theme.css

## 3. Numbers & scales

| Token | Value |
|---|---|
| brand | 50 rgb(249 245 255); 100 (244 235 255); 200 (233 215 254); 300 (214 187 251); 400 (182 146 246); 500 (158 119 237); 600 (127 86 217); 700 (105 65 198); 800 (83 56 158); 900 (66 48 125); 950 (44 28 95) |
| neutral | Tailwind v4 oklch 50 98.5%, 100 97%, 200 92.2%, 300 87%, 400 70.8%, 500 55.6%, 600 43.9%, 700 37.1%, 800 26.9%, 900 20.5%, 950 14.5% |
| shadows | xs 0 1 2 .05; sm 0 1 3 .1 +0 1 2 -1 .1; md 0 4 6 -1 .1 + 0 2 4 -2 .06; lg 0 12 16 -4 .08 + 0 4 6 -2 .03 + 0 2 2 -1 .04; xl 0 20 24 -4 .08 + 0 8 8 -4 .03 + 0 3 3 -1.5 .04; 2xl 0 24 48 -12 .18 + 0 4 4 -2 .04; 3xl 0 32 64 -12 .14 + 0 5 5 -2.5 .04 |
| container | 1280px |
| breakpoints | xxs 320, xs 600, then Tailwind sm 640 md 768 lg 1024 xl 1280 2xl 1536 |
| radius | Tailwind: sm 4, md 6, lg 8 (controls), xl 12, 2xl 16 |
| icons | 16 (xs/inputs sm), 20 default, 24; free set 1,100+ line icons; PRO 4,600+ in 4 styles |
| Components (public llms.txt) | 85 listed: base 30 (27 free), application 37 (13 free), marketing 18 (all PRO); Figma 10,000+ components and variants |
| Button colours | primary, secondary, tertiary, link-gray, link-color, primary-destructive, secondary-destructive, tertiary-destructive, link-destructive |
| Badge | 3 sizes, 13 colours, 3 types (pill-color, color, modern) |

## 4. Dos and Don'ts

- Do: `<p className="bg-primary text-primary">`. Don't: `bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50`.
- Do: `disabled:opacity-50`. Don't: v7 `disabled:bg-disabled_subtle disabled:text-disabled`.
- Do: `iconLeading={ChevronDown}` (reference) or `<ChevronDown data-icon />`. Don't: forget `data-icon` on elements.

## 5. Exceptions & judgement calls

- The most valuable patterns (marketing, dashboards, many app components) are PRO; do not reproduce them. Use the token architecture and base-component rules only.
- `dark-mode` only exists as dark; a light island inside dark needs explicit overrides.
- Brand text in dark mode falls back to neutral, which weakens brand identity in dark; override `--color-text-brand-*` if brand colour must show.
- [engine note] The soft purple + Inter + skeuomorphic button look is saturated on the web; use the token architecture, not the look, for a distinct brand.

## 6. Figures worth keeping

None.

## 7. Open questions

- Figma variable names/modes and the exact Figma text style names are not public; only marketing counts read.
- Whether v8 neutral replaced an earlier cool gray in Figma (React uses Tailwind neutral).
- Overlay/modal animation values and exact z-index in PRO components.
- Input/Select/Tabs state colour recipes beyond Button/Input read.
