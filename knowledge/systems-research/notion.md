---
source: web:https://www.notion.com ; https://www.notion.com/pricing ; https://www.notion.com/help ; live stylesheets (19 CSS files, token prefix --tatami-) measured 2026-10-08
chapter: Notion marketing system profile (token layer Tatami, measured live)
pages: n/a (web sources, measured 2026-10-08)
topic_tags: [design-system, tokens, typography, tracking, button-states, warm-neutral, illustration, shadows, marketing]
status: studied
---

# Notion

Machine profile: `system/systems-research/notion.json`. Raw measurements, screenshots (1440, 390), stylesheets and root-variable dump (`rootvars-light.json`, 1758 custom properties): `corpus/web/systems/notion/` (gitignored). No public design guidance or token files exist; `notion.com/brand` redirected to an authenticated page (HTTP 401), and a web search found no official 2025-26 design-system write-up. The product app needs a login and was not measured. Provenance: measured-live (token values read from the public stylesheet).

## 1. Core ideas

1. **A complete, public-in-CSS token layer called Tatami.** Primitives (`--tatami-color-blue-600`, `--tatami-dimension-spacing-16`, `--tatami-font-size-200`), component tokens that encode state (`--tatami-color-button-primary-background-hover`), full font shorthands (`--tatami-typography-interaction-button-medium-font`), and campaign namespaces (`--tatami-color-campaigns-agents-launch-*`).
2. **Type is a table of size x weight x tracking.** Sizes 12, 14, 15, 16, 18, 20, 22, 26, 32, 42, 54, 64, 76, 96px (tokens 50-1100) with line heights 16, 20, 20, 24, 28, 28, 28, 32, 40, 48, 56, 64, 80, 100px. Letter-spacing is a token per size and per weight: 54px regular -3.5px, bold -1.875px; 96px semibold -4.6px (-0.048em). Regular tracks tighter than bold at display sizes.
3. **Heavy grotesk, warm neutrals.** NotionInter at 600-700 for headings (hero 96/100/600), alpha-black ink (`rgba(0,0,0,.95)` / `.898` / `.54`), a yellow-brown grey ramp (#f9f9f8 to #191918), one blue (#0075de, hover #005bab).
4. **Button states are explicit at token level.** Primary/secondary/tertiary/ghost each have `background`, `-hover`, `-focus`, `-active`, `text`, `border`; icon-button and menu-button add `selected` and `disabled`. Hover, focus and active are separate tokens even when equal.
5. **Radius ladder in rem.** 0, 4, 5, 6, 8, 10, 12, 14, 16px and a pill; buttons 8px (large 10px), icon-buttons 4px, menu buttons pill.
6. **Shadows are invisible-by-design.** `shadow-300` is six layers topping out at `0 36px 89px #0000000a`; opacities 2-10%.
7. **Motion tokens exist, hover uses ease-in.** Durations 100-300ms; links and buttons transition at 200ms with `cubic-bezier(.42,0,1,1)`, an ease-in curve.
8. **Playful devices on a disciplined grid.** Hand-drawn black-outline illustration beside real product screenshots; an inline green pill chip ("Ship") inside the 96px headline; Lyon serif kept for rare use.
9. **Responsive type drops hard.** 96px hero becomes 42px/48px at 390; 54px h2 becomes 32px/40px; 22px card headings do not change.

## 2. Rules

- **RULE** Define every text style as a single token holding the full font shorthand (weight, size, line-height, family) plus a sibling letter-spacing token, one pair per size and weight combination.
  **Why** It stops per-component recombination of size, weight and tracking; the table is checkable.
  **Applies to** all
  **Check** computed (font-size, line-height, font-weight, letter-spacing) of every text node is a row of the type table (tolerance 0.5px / 0.002em).
  **Source** --tatami-typography-* tokens, notion.com stylesheet, 2026-10-08

- **RULE** At display sizes (>= 42px) set tracking per weight: regular at about -0.043em to -0.065em, semibold and bold at about -0.033em to -0.048em; below 24px use at most -0.012em.
  **Why** Lighter strokes need more compression to hold a heading together; bold needs less to avoid collisions.
  **Applies to** landing page
  **Check** for headings >= 42px letter-spacing/size between -0.065em and -0.03em; for text <= 24px >= -0.012em.
  **Source** --tatami-font-letter-spacing-sans-* (e.g. 800-regular -.21875rem on 54px = -0.065em; 1100-semibold -.2875rem on 96px = -0.048em)

- **RULE** Name state inside the token (background, -hover, -focus, -active, -selected, -disabled) for every interactive component and fill all of them, even when values are identical.
  **Why** Missing states are visible as gaps in the token list; an audit becomes a diff.
  **Applies to** SaaS app UI | landing page
  **Check** for each `--*-button-*-background` token there are `-hover`, `-focus`, `-active` siblings.
  **Source** --tatami-color-button-primary-background-{hover,focus,active} = #005bab

- **RULE** Keep time-boxed campaign palettes in their own namespace (`campaigns-<name>-*`) and never alias them into core colour tokens.
  **Why** Core brand stays stable while launches rotate; campaigns can be deleted wholesale.
  **Applies to** landing page
  **Check** no core token references a `campaigns-*` token; campaign tokens deleted in one commit.
  **Source** --tatami-color-campaigns-agents-launch-*, --tatami-color-campaigns-dev-platform-dos-*

- **RULE** Use alpha-black (or alpha-white) for text and hairlines on warm light surfaces only after verifying contrast on every background the text meets; use solid grey-600 (#615d59, 6.53:1) for captions on tinted chips.
  **Why** Alpha greys inherit the background; a pastel chip can drop a 54% black label under 4.5:1.
  **Applies to** landing page | all
  **Check** compute rendered colour of text over each used surface; every text/surface pair >= 4.5:1 (3:1 only for 24px+ or bold 18.66px+).
  **Source** measured text colours (rgba(0,0,0,.54) renders about #757575 = 4.6:1 on white)

- **RULE** Use `ease-out`-family curves for hover and press feedback and keep 100-200ms; do not use ease-in on hover.
  **Why** An ease-in curve delays the first frames of feedback and feels laggy.
  **Applies to** all
  **Check** transition-timing-function on `a`, `button` hover is not `ease-in` / `cubic-bezier(.42,0,1,1)`; duration <= 200ms. Notion fails this check; treat as a negative example.
  **Source** measured notion.com transitions (x27 `background-color, color 0.2s cubic-bezier(0.42,0,1,1)`)

- **RULE** Layer 4 to 6 shadows with opacities between 2% and 10% and growing offsets/blur (0.2px to 36px offset, up to 89px blur) for floating cards instead of one visible shadow.
  **Why** Approximates real light falloff; edges stay soft and nothing reads as a border.
  **Applies to** landing page | SaaS app UI (light)
  **Check** card box-shadow has >= 4 layers, each alpha <= 0.1, largest blur >= 60px for modal-level surfaces.
  **Source** --tatami-shadow-200, --tatami-shadow-300

- **RULE** Allow at most one playful device per page (inline pill chip in a headline, or an illustrated character) and keep it on the same grid and type system as the rest.
  **Why** The playful device is the recognisable move; two or three dilute it.
  **Applies to** landing page
  **Check** visual; count of decorative inline chips/illustrations in the first screen <= 2.
  **Source** measured home hero (green 'Ship' chip, illustrated figure), 2026-10-08

## 3. Numbers & scales

| Item | Value |
|---|---|
| Type steps (px size/line) | 12/16, 14/20, 15/20, 16/24, 18/28, 20/28, 22/28, 26/32, 32/40, 42/48, 54/56, 64/64, 76/80, 96/100 |
| Weights | 400, 500, 600, 700 (variable tokens 420, 520, 620, 680) |
| Tracking (px) | 800 reg -3.5 / bold -1.875; 700 reg -2 / bold -1.5; 600 reg -1 / bold -0.75; 500 -0.625; 400 -0.25; 300/350 -0.125; 50 +0.125; 1100 semibold -4.6; 1000 bold -2.5; 900 bold -2.125 |
| Warm grey ramp | #f9f9f8, #f6f5f4, #dfdcd9, #a39e98, #78736f, #615d59, #494744, #31302e, #191918 |
| Blue | #f2f9ff, #e6f3fe, #93cdfe, #62aef0, #097fe8, #0075de, #005bab, #00396b, #002a4f |
| Alpha black | 5%, 10%, 20%, 30%, 54%, 59%, 75%, 90%, 95% (hex 0d,1a,33,4d,8a,96,bf,e5,f2) |
| Spacing (px) | 0, 4, 8, 12, 16, 20, 24, 28, 30, 32, 40, 48, 56, 64, 72, 80, 96, 100, 128, 160 |
| Content widths | 960px (60rem), 1252px (78.25rem); breakpoints 375, 600, 840, 1080, 1280, 1440 |
| Radius | 0, 4, 5, 6, 8, 10, 12, 14, 16, pill |
| Motion | 100, 150, 200, 250, 300ms; ease-in (.42,0,1,1), ease-out (0,0,.58,1), in-out-cubic (.645,.045,.355,1), quint (.86,0,.07,1) |
| z-index | header 100, banner 90, mobile-nav 200, popup/lightbox/tooltip 500 |
| Buttons | small 500 14/20, medium 500 16/24, large 600 16/24; primary #0075de/#fff; secondary #e6f3fe/#005bab; heights 36 (nav), 38 (hero) |
| Measured home hero | h1 96/100/600/-4.6px; sub 20/28/400/-0.125px; mobile h1 42/48/600/-1.5px |

## 4. Dos and Don'ts

- Do: hero CTA pair = primary `#0075de` fill + secondary `#e6f3fe` fill with `#005bab` text, both 8px radius, 38px high. Don't: pair a primary with an outlined button of a different radius.
- Do: card shadow as 6 faint layers. Don't: single `0 4px 12px rgba(0,0,0,.15)`.
- Do: caption on pastel chip in solid grey-600 `#615d59`. Don't: 54% black over a green-100 chip without checking.

## 5. Exceptions & judgement calls

- The 96px hero with a chip and illustration pushes proof below the fold; fine for a brand-led launch hero, wrong for a conversion-led hero unless the CTA sits above 560px.
- Weight 600 for the hero but 700 for h2 is intentional (tracking tokens exist for both); do not collapse them.
- [engine note] Library entry should record the type-tracking table as data, and flag the ease-in hover as a "do not copy" item.
- [engine note] Alpha-based text is a defensible choice for a single white canvas; for a multi-surface system prefer solid ramps with a computed on-colour.

## 6. Figures worth keeping

- `corpus/web/systems/notion/home-1440-fold.png`: hero with chip in headline, CTA pair, product screenshot frame, illustrated character, logo strip.
- `corpus/web/systems/notion/pricing-1440-full.png`: dense comparison table with 5px radii and 15px/20px rows.

## 7. Open questions

- Product UI (sidebar, page, database views, dark mode): not measured, needs a logged-in session.
- Whether Tatami has a dark theme: alpha-white and action-button alpha tokens suggest inverse surfaces, no dark scheme was observed on marketing.
- Why component radius tokens appear with two values (0 and .5rem) in different scopes.
- Brand page (`/brand`) is behind auth; official clearspace and logo rules not obtained.
- No official design-system article found (search results were secondary: interviews and job posts).
