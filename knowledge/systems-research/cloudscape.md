---
source: web:https://cloudscape.design ; https://github.com/cloudscape-design/components
chapter: Cloudscape (AWS) design system - mode-keyed tokens, density, motion, data colour
pages: n/a (npm @cloudscape-design/design-tokens@3.0.114 index-visual-refresh.json, @cloudscape-design/components@3.0.1394; cloudscape.design foundation pages content-density, motion, colors, spacing; fetched 2026-10-08)
topic_tags: [design-system, tokens, density, compact, dark-mode, motion, reduced-motion, data-viz, contrast, enterprise, aws]
status: studied
---

# Cloudscape (AWS)

Spec: `system/systems-research/cloudscape.json`. Raw: `corpus/web/systems/cloudscape/`. Licence Apache-2.0.

## 1. Core ideas

1. **Tokens carry their own modes.** Each of ~570 public tokens has a `$value` keyed by mode: colour `{light, dark}`, spacing/sizing `{comfortable, compact}`, motion `{default, disabled}`. One file, every axis.
2. **Scaled vs static spacing.** `space-scaled-*` shrinks in compact (16 -> 12, 20 -> 16, 32 -> 24); `space-static-*` never changes. Structural gaps stay put while control padding tightens.
3. **Comfortable is the default; compact is an opt-in for data-heavy full pages** (dashboards, resource lists, details), user-switchable, consistent across the whole app, and deliberately not applied to informational components (alerts, help panel, flashbar, validation) or to limited-target items (dropdown options, date pickers, charts).
4. **Contexts restyle regions.** Token "contexts" (top-navigation, header, alert-header, flashbar, compact-table) are scoped override sets: a dark header inside a light page is ~188 token overrides, not a new component.
5. **Chart colours named by contrast ratio.** `color-charts-red-400` is 4:1 against the background, `-700` is 7:1, each with light and dark values.
6. **Three curves, three durations.** Responsive (0,0,0,1), sticky (1,0,0.83,1), expressive (0.84,0,0.16,1); 115 / 165 / 250 ms.
7. **Motion off is a token mode** (`disabled` = 0ms), used for reduced motion and to stop flaky tests (`disableMotion()`).
8. **Colour from neutrals; blue for action.** White/grey UI so status and primary actions pop; blue for primary action, links, interactive accents; red/green for resource status.
9. **Progressive negative tracking** with size (0 at 14px to -0.03em at display).

## 2. Rules

- **RULE** Store each token's mode variants inside the token ({light, dark}, {comfortable, compact}, {default, disabled}) and resolve by mode at runtime, rather than maintaining parallel theme files.
  **Why** A token can't exist in one mode and be missing in another; every axis is visible in one place.
  **Applies to** design systems. **Check** token JSON: every colour token has both light and dark; every scaled spacing token has both densities. **Source** design-tokens index-visual-refresh.json
- **RULE** Split spacing into scaled tokens (component padding, shrink in compact by about one 4px step) and static tokens (layout gutters, never change).
  **Why** Density should tighten controls without collapsing page structure.
  **Applies to** SaaS app UI. **Check** compare comfortable vs compact computed styles: gutters equal, control paddings smaller. **Source** space-scaled-* vs space-static-*
- **RULE** Ship comfortable density as the default; offer compact only as a user preference for full-page data views, applied consistently app-wide, never to one isolated page or component.
  **Why** Compact hurts readability and can overwhelm; mixed density looks broken.
  **Applies to** SaaS app UI. **Check** default render uses comfortable tokens; density toggle exists in preferences; no page-scoped compact class. **Source** cloudscape.design content-density
- **RULE** Keep informational components (alerts, help text, validation messages) and small-target controls (dropdown options, date cells, charts) at comfortable spacing even in compact mode.
  **Why** Reading and precise pointing degrade first when spacing shrinks.
  **Applies to** SaaS app UI. **Check** in compact mode, alert/validation padding equals comfortable values. **Source** content-density page
- **RULE** Name data-visualisation colours by the contrast ratio they guarantee against the surface (e.g. -300 = 3:1, -400 = 4:1) and supply a dark-mode value for each.
  **Why** Chart marks need 3:1 against the background (WCAG 1.4.11); encoding it in the name makes compliance a lookup.
  **Applies to** dashboards, data viz. **Check** for each chart colour token, measured contrast vs chart background >= the number in its name /100. **Source** color-charts-* $description
- **RULE** Use three motion speeds: 115ms responsive (dropdowns, modals, popovers, side panels), 165ms expressive (link hover, error shake), 250ms complex (flashbar slide-in); easing (0,0,0,1) for responsive feedback.
  **Why** Short, decisive feedback keeps a dense console feeling fast.
  **Applies to** SaaS app UI. **Check** computed transition-duration in {115,165,250}ms or 0. **Source** cloudscape.design motion
- **RULE** Delay popover dismissal on hover-out with a "sticky" curve (cubic-bezier(1,0,0.83,1)) so it stays visible briefly before leaving.
  **Why** Prevents flicker when the pointer crosses a gap between trigger and popover.
  **Applies to** SaaS app UI. **Check** hover-out transition uses an ease-in-heavy curve or delay >= 100ms. **Source** motion page (Curve B)
- **RULE** Implement reduced motion as a token mode that sets every duration to 0ms, and use the same switch to disable motion in automated tests.
  **Why** One switch covers accessibility and test determinism; components need no per-component media queries.
  **Applies to** all. **Check** with prefers-reduced-motion, all motion tokens resolve to 0ms. **Source** motion-duration-* {disabled: 0ms}; motion page
- **RULE** Restyle a region (dark top navigation, coloured alert header) by applying a scoped token context, not by forking components.
  **Why** Components stay single-source; contrast is solved once per context.
  **Applies to** SaaS app UI. **Check** dark header region: components inside use the same classes with overridden custom properties on an ancestor. **Source** design-tokens contexts
- **RULE** Tighten letter-spacing progressively as type grows: 0 at 14px, -0.005em at 16, -0.01em at 18, -0.015em at 20, -0.02em at 24, -0.03em at 42-64px.
  **Why** Large text looks loose at default tracking; small text needs it.
  **Applies to** all. **Check** computed letter-spacing monotonically non-increasing with font-size across headings. **Source** letter-spacing-* tokens
- **RULE** Use 4px between label and control, 20px between form fields, 8px between a checkbox/radio and its label, and 20px container horizontal padding.
  **Why** Proximity groups label with control and separates fields.
  **Applies to** forms. **Check** measured gaps match within 1px. **Source** cloudscape.design spacing

## 3. Numbers & scales

| Item | Values |
|---|---|
| Font | Open Sans; mono Monaco/Menlo/Consolas |
| Display | xl 64/72 400 -0.03em; l 42/48 700 -0.03em |
| Headings | xl 24/30, l 20/24, m 18/22, s 16/20, xs 14/18 (all 700) |
| Body | m 14/20, s 12/16 |
| Spacing | 2,4,8,12,16,20,24,32,40 (scaled: 0,2,4,8,12,16,20,24,32 in compact) |
| Radius | badge 4; input/dropdown/popover/item 8; alert/flashbar 12; container/card 16; button 20 |
| Border widths | field/card 1; button/alert/dropdown/popover/token/selected 2 |
| Control heights | input 32 (compact 28); side-nav item 28 (24) |
| Durations | 115, 165, 250 ms (+3600 gen-AI gradient, 1200 loading dots) |
| Easings | (0,0,0,1); (1,0,0.83,1); (0.84,0,0.16,1) |
| Key colours | accent #006ce0 / dark #42b4ff; text #0f141a; secondary #424650; divider #c6c6cd; dark bg #161d26 |
| Contrast (measured) | #006ce0/white 4.97:1; #42b4ff/#161d26 7.44:1; input border #8c8c94/white 3.34:1 |

## 4. Dos and Don'ts

- Do pair colour with icons or text; colour is never the only signal (colors page).
- Don't use compact as the starting point; don't apply compact to individual pages.
- Do respect OS reduced motion; don't flash more than 3 times per second; don't rely on motion alone (motion page).
- Error state: fade in plus a 5px shake each side at 165ms.

## 5. Exceptions & judgement calls

- Raw palette and most shadow tokens are private; the public set is semantic only. For a library entry, treat neutrals above as role values, not a ramp. [engine note]
- 20px button radius on 32px controls reads as a pill; Visual Refresh made AWS friendlier than its density suggests. [engine note]
- Long ambient animations (3600ms gen-AI gradient) are an explicit exception to the 250ms ceiling, scoped to AI avatars.

## 6. Figures worth keeping

None captured.

## 7. Open questions

- Shadow values for dropdown/modal/popover not in public tokens (unknown).
- Colour page gave no numeric contrast target; assumed WCAG 2.x AA.
