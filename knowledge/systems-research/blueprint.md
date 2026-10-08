---
source: web:https://blueprintjs.com/docs ; https://github.com/palantir/blueprint
chapter: Blueprint (Palantir) - intent API, dense desktop UI, dual-theme elevation
pages: n/a (npm @blueprintjs/core@6.21.0 src/common/*.scss, _typography.scss, design-tokens/tokens/*.tokens.json; @blueprintjs/colors@5.1.16; GitHub 6.x changelog; fetched 2026-10-08)
topic_tags: [design-system, tokens, intent, density, desktop, dark-mode, elevation, palette, data-dense, palantir]
status: studied
---

# Blueprint (Palantir)

Spec: `system/systems-research/blueprint.json`. Raw: `corpus/web/systems/blueprint/`. Licence Apache-2.0.

## 1. Core ideas

1. **Intent is the colour API.** default / primary / success / warning / danger, each with rest, hover, active, disabled, foreground; every component (Button, Tag, Callout, InputGroup, Text) takes `intent`.
2. **Desktop density.** 30px default controls (24 small, 20 smaller, 40 large), 14px text at 18px line, 4px radius, 50px navbar.
3. **Integer line boxes.** Line-height 1.28581 makes 14px text exactly 18px, and `centered-text()` derives padding so text sits centred in any control height.
4. **Dual theme per container.** `.bp6-dark` can wrap any subtree; every Sass variable has a `$pt-dark-*` twin.
5. **Elevation includes the edge.** Each of 5 elevation shadows starts with `0 0 0 1px rgba(black,.1-.15)`; dark versions use inset white hairlines (20% + 0.5px 30% highlights) and heavier black.
6. **Big categorical palette.** 15 hues x 5 steps (blue, green, orange, red + vermilion, rose, violet, indigo, cerulean, turquoise, forest, lime, gold, sepia) plus 16-step grey ramp. BP7 preview moves to OKLCH 100-1000.
7. **Snappy motion.** 100ms base, x2 for larger travel; ease cubic-bezier(0.4,1,0.75,0.9), bounce (0.54,1.12,0.38,1.11).
8. **Tokens in transition.** Sass variables are the API; a DTCG/Style Dictionary layer (`--bp-palette/intent/surface/typography/iconography/emphasis-*`) is marked EXPERIMENTAL.

## 2. Rules

- **RULE** Expose colour to components through a small fixed set of intents (primary, success, warning, danger, default), each defining rest, hover, active, disabled and foreground values.
  **Why** One prop gives consistent meaning across every component and both themes.
  **Applies to** SaaS app UI, design systems. **Check** component colour props accept only intent names; each intent has all five state tokens. **Source** design-tokens/tokens/base/intent.tokens.json
- **RULE** Use a dark foreground on warning (orange/yellow) fills and white on primary/success/danger fills.
  **Why** Orange/yellow mid-tones cannot reach 4.5:1 with white text.
  **Applies to** all. **Check** contrast(fg, warning bg) >= 4.5:1. **Source** intent.warning.foreground = palette.black
- **RULE** Choose a body line-height that yields an integer line box (14px x 1.28581 = 18px) and compute control padding as (controlHeight - lineBox) / 2.
  **Why** Sub-pixel line boxes blur baselines and make text sit off-centre in buttons and inputs.
  **Applies to** SaaS app UI. **Check** computed line-height in px is an integer for body/UI text; text vertically centred within 0.5px in controls. **Source** common/_variables.scss, _mixins.scss centered-text()
- **RULE** For dense desktop tools set default control height to 30px (small 24, large 40) with 14px text; reserve 40px+ for touch contexts.
  **Why** Power users scan and click many controls; smaller controls fit more data per screen.
  **Applies to** SaaS app UI (desktop, data-dense). **Check** default `button, input` height 28-32px in desktop builds. **Source** $pt-button-height = 30px, $pt-input-height = 30px
- **RULE** Include the 1px edge inside each elevation shadow (first layer `0 0 0 1px rgba(0,0,0,.1-.15)`) instead of a separate border.
  **Why** Edge and depth then scale together and never double up or disagree.
  **Applies to** all. **Check** elevated surfaces have no CSS border and a box-shadow whose first layer is a 0-blur 1px spread. **Source** $pt-elevation-shadow-0..4
- **RULE** In dark themes, draw surface edges with inset white hairlines (inset 0 0 0 1px rgba(255,255,255,.2)) and double drop-shadow opacity.
  **Why** Dark shadows on dark backgrounds vanish; a light inner edge restores the surface boundary.
  **Applies to** all with dark mode. **Check** dark elevated surfaces have an inset light box-shadow layer. **Source** $pt-dark-elevation-shadow-*; $pt-dark-drop-shadow-opacity = 0.4
- **RULE** Scope the dark theme to a container class so dark and light regions can coexist (e.g. dark navbar or dark side panel inside a light app).
  **Why** Analyst tools mix map/graph canvases (dark) with forms (light).
  **Applies to** SaaS app UI. **Check** theme class works on a non-root element; nested components inherit dark tokens. **Source** Classes.DARK `.bp6-dark`
- **RULE** Keep UI motion at 100ms for state changes and 200ms for larger movement (drawers, tree carets, tab indicators).
  **Why** Desktop power users perceive anything slower as lag.
  **Applies to** SaaS app UI. **Check** transition durations <= 200ms except loaders. **Source** $pt-transition-duration 100ms and x2 usages
- **RULE** Use a single 4px radius across controls and surfaces in a tool-like product.
  **Why** One radius reads as precise and keeps dense grids of controls visually quiet.
  **Applies to** SaaS app UI (data-dense). **Check** distinct border-radius values in UI <= 2 (excluding pills/circles). **Source** $pt-border-radius 4px
- **RULE** Provide a categorical palette of at least 10 hues x 5 lightness steps for data, tags and entity colour-coding, separate from intent colours.
  **Why** Analytical products need many distinguishable categories without overloading status meanings.
  **Applies to** dashboards, data viz. **Check** categorical colours do not reuse intent tokens. **Source** @blueprintjs/colors _colors.scss

## 3. Numbers & scales

| Item | Values |
|---|---|
| Font | system stack (-apple-system ... Open Sans, Helvetica Neue) + icon font |
| Headings | h1 36/40, h2 28/32, h3 22/25, h4 18/21, h5 16/19, h6 14/16 (600) |
| Body | 14/18 (1.28581); large 16; small 12; running text line-height 1.5 |
| Weights | 400, 600 |
| Controls | button 20/24/30/40; input 24/30/40; navbar 50 |
| Button padding | 4px 8px; small 0 8px; large 4px 16px; icon gap 8 |
| Spacing | 4px base ($pt-spacing); legacy 10px grid |
| Radius | 4px |
| z-index | 0, 10, 20, 30, 40 |
| Durations | 100ms base, 200ms large |
| Easings | (0.4,1,0.75,0.9); bounce (0.54,1.12,0.38,1.11) |
| Focus | blue2 @75%, 2px, offset 2px |
| Greys | #111418 #1c2127 #252a31 #2f343c #383e47 #404854 #5f6b7c #738091 #8f99a8 #abb3bf #c5cbd3 #d3d8de #dce0e5 #e5e8eb #edeff2 #f6f7f9 |
| Contrast (measured) | blue3 #2d72d2/white 4.72:1; blue2 #215db0 6.45:1; gray1 #5f6b7c 5.41:1 |

## 4. Dos and Don'ts

- Do use intents consistently across components; don't invent per-component status colours.
- Stylelint plugin rule pushes spacing variables over literals (6.x changelog: stylelint-plugin 5.1.0).

## 5. Exceptions & judgement calls

- Blueprint is the right reference for "dense desktop pro tool", the wrong one for marketing or mobile. [engine note]
- Mixed legacy 10px grid and 4px spacing: new work should use 4px only. [engine note]
- BP7 OKLCH palette is preview; don't cite as current.

## 6. Figures worth keeping

None captured.

## 7. Open questions

- No public motion/UX writing guidelines located beyond tokens.
- Display (46px) line-height not tokenised.
