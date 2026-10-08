---
source: web:https://github.com/pinterest/gestalt ; https://gestalt.pinterest.systems
chapter: Gestalt (Pinterest) design system - tokens, type, colour states, motion
pages: n/a (npm gestalt-design-tokens@177.0.12 + gestalt@177.0.12 + docs/pages/foundations/*.tsx on GitHub master, fetched 2026-10-08)
topic_tags: [design-system, tokens, color-states, typography, i18n, line-height, motion, elevation, consumer, pinterest]
status: studied
---

# Gestalt (Pinterest)

Spec: `system/systems-research/gestalt.json`. Raw: `corpus/web/systems/gestalt/` (gitignored).
Licence Apache-2.0. Note: foundations pages on gestalt.pinterest.systems now redirect to an Okta sign-in ("Gestalt Internal"); everything here was read from the public GitHub source and npm tarballs.

## 1. Core ideas

1. **Content is the colour.** Pinterest content is multicoloured, so UI colour is restricted to a small token set; extended palette colours are "reserved for larger brand moments" and must not be applied to components (docs/pages/foundations/color/usage.tsx).
2. **Three token tiers plus two live themes.** `base-*` (raw) -> `sema-*` (role) -> `comp-*` (component). Both `classic` and `vr-theme` (Visual Refresh) ship, plus `vr-theme-web-mapping` to migrate old names onto VR values.
3. **State is a token dimension, not an overlay.** Every base hue has `base-color-hover-*` and `base-color-pressed-*` ramps (e.g. grayscale-100 #e8e7e1 -> hover #d6d4cd -> pressed #c2c1bc), and semantic tokens are generated per state (`sema-color-hover-background-*`).
4. **Selection is black, brand is red.** `background-selected` = grayscale-500 (#000); red #e60023 is kept for the primary action.
5. **Three text roles at the same sizes.** body (reading, ~1.4 leading), ui (labels/controls, ~1.2), heading. Sizes are only 12/14/16/20/28/36.
6. **Line-height is localised.** Separate CSS files swap only leading for CJK, Japanese, Thai, Vietnamese and "tall" scripts (`font-lineheight-ck.css` etc.).
7. **Radius grows with size.** VR Button: sm 24px tall / 8px radius, md 32/12, lg 44/16.
8. **Warm neutrals.** Greys lean yellow (grayscale-25 #fffef7, 50 #f5f4ed), giving a paper-like warmth unusual in UI kits.
9. **Motion named by property and direction.** position-on (300ms bounce), position-off (200ms lateral), scale-on 150ms, opacity 300ms, swipe 400ms.
10. **Accessibility guardrails in motion docs:** pause control for anything moving >5s, no flashing >3/s, non-essential motion off under reduced motion.

## 2. Rules

- **RULE** Restrict UI colour to the semantic token set; keep extended/brand palette colours out of components and use them only for designated brand moments.
  **Why** Image-rich content already supplies colour; a limited UI palette keeps attention on content and on the few coloured actions.
  **Applies to** all (esp. content/feed products). **Check** grep component CSS for hex/rgb literals not in the token file; count distinct non-neutral hues in UI chrome <= 2 + status. **Source** gestalt docs color/usage.tsx
- **RULE** Define hover and pressed colours as explicit token ramps per hue (base -> hover -> pressed, each a darker computed step), not as runtime opacity overlays.
  **Why** Overlays shift hue on tinted backgrounds and are hard to contrast-test; explicit ramps are testable and identical across platforms.
  **Applies to** all. **Check** token file contains `hover` and `pressed` variants for every interactive background; no `filter: brightness()` or `opacity` on hover for filled buttons. **Source** gestalt-design-tokens vr-theme variables.css (base-color-hover-*, base-color-pressed-*)
- **RULE** Show selected state with the ink/inverse colour (black on light, light on dark), reserving the brand colour for the primary call to action.
  **Why** If brand colour marks both "selected" and "do this", users cannot tell state from action.
  **Applies to** SaaS app UI, consumer app UI. **Check** computed background of `[aria-selected=true]`, `[aria-pressed=true]` != primary button background. **Source** sema-color-background-selected = grayscale-500
- **RULE** Give UI text (labels, buttons, menu items) tighter leading (~1.2) than body text at the same size (~1.4): e.g. 16px ui = 19px line, 16px body = 22px line.
  **Why** Single-line controls need compact, centred text; multi-line reading needs air.
  **Applies to** all. **Check** computed line-height/font-size on `button, label, [role=menuitem]` 1.15-1.25; on `p` 1.35-1.6. **Source** vr-theme font-lineheight-default.css
- **RULE** Swap only the line-height tokens (not sizes) per writing system: taller leading for CJK, Thai, Vietnamese and other tall scripts.
  **Why** Stacked diacritics and dense glyphs clip or collide at Latin leading.
  **Applies to** all multilingual products. **Check** `:lang(ja|zh|ko|th|vi)` resolves a different line-height token than `:lang(en)`. **Source** dist/css/vr-theme/font-lineheight-{ck,ja,th,vi,tall}.css
- **RULE** Scale corner radius with control height (about 1/3 of height): 24px -> 8px, 32px -> 12px, 44px -> 16px.
  **Why** A fixed radius looks sharp on large controls and blobby on small ones; proportional radius keeps the same shape family.
  **Applies to** all. **Check** for each button size, radius/height in 0.3-0.4 (or pill). **Source** gestalt src/Button.css (.smVr, .mdVr, .lgVr)
- **RULE** Use a double focus ring: inner ring in the surface colour, outer ring in focus blue.
  **Why** The inner ring separates the outer ring from any fill colour, so focus stays visible on red, black or image backgrounds.
  **Applies to** all. **Check** `:focus-visible` has two-layer box-shadow/outline; contrast of outer ring vs adjacent colours >= 3:1. **Source** sema-color-border-focus-inner-* / -outer-*
- **RULE** Disable all non-essential animation under `prefers-reduced-motion`, give any animation lasting more than 5 seconds a pause control, and never flash more than 3 times per second.
  **Why** WCAG 2.2.2 and 2.3.1; motion can cause seizures, vestibular symptoms, anxiety.
  **Applies to** all. **Check** emulate reduced motion: computed animation/transition durations 0 on non-essential elements; autoplay > 5s has a pause button. **Source** gestalt docs motion/guidelines.tsx
- **RULE** Animate entrances with a strong decelerate curve (cubic-bezier(0.05,0.7,0.1,1)) and exits with an accelerate curve (cubic-bezier(0.3,0,0.8,0.15)); exits shorter than entrances (position-off 200ms vs position-on 300ms).
  **Why** Things arriving should settle softly; things leaving should get out of the way.
  **Applies to** all. **Check** paired enter/exit transitions: exit duration <= enter; easing matches family. **Source** vr-theme base-motion-easing-*, sema-motion-position-*
- **RULE** In dark mode, pair raised/sticky borders with an elevated background colour rather than relying on the light-mode shadow.
  **Why** Shadows barely read on black; surface lightness carries elevation.
  **Applies to** all with dark mode. **Check** dark theme: elevated surfaces have background lighter than page (e.g. #2e2e2d on #000). **Source** docs elevation.tsx; sema-color-background-elevation dark = grayscale-400

## 3. Numbers & scales

| Item | Values |
|---|---|
| Font sizes | 12, 14, 16, 20, 28, 36 px |
| Weights (VR) | 400 body, 500 ui/headings sm-xxs, 700 heading md/lg + emphasis |
| Heading lg / md | 36/40 700 -0.5px; 28/31 700 -0.5px |
| Body lg/md/sm/xs | 20/28, 16/22, 14/20, 12/17 |
| UI lg/md/sm/xs | 20/24, 16/19, 14/17, 12/16 (500) |
| Spacing | 4px unit: 0,1,2,4,6,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64 |
| Radius | 0,4,8,12,16,20,24,28,32, pill 999, circle 50% |
| Button heights | VR 24/32/44 (link-button lg 48); classic 32/40/48 |
| Opacity | 0, .04, .2, .4, .6, .8, .9, 1 |
| Durations | 0,50,100,150,200,300,400,500,600,700,900 ms |
| Easings | enter (.05,.7,.1,1); exit (.3,0,.8,.15); bounce (0,.35,0,1.25); lateral (.8,0,.2,1); expressive (.55,0,0,1) |
| Shadows | surface 0 1px 2px .1 + 0 0 1px .08; floating 0 4px 16px .1 + 0 1px 4px .08 |
| Contrast (measured) | #e60023/white 4.78:1; #636361/white 6.02:1; #007db8/white 4.54:1 |

## 4. Dos and Don'ts

- Do limit UI colour so content stands out; don't apply brand-moment colours to components (color/usage).
- Don't use colour as the only cue for meaning (color/usage).
- Docs typography examples (titles from source; images not fetched): don't use fixed-size line-height with caps; don't truncate paragraph text or text in controls; don't centre text with tight leading; don't use small sizes; wrap text when needed; use standards for language translation.
- Accessibility labels: don't include "button" or "link" in `accessibilityLabel` (repetitive with role).

## 5. Exceptions & judgement calls

- Two themes coexist; when adopting, pick VR values (Pin Sans fallback to system) and ignore classic. [engine note]
- 500 weight for UI and small headings is a deliberate "friendly" choice; on system fonts without a 500 cut, it falls back to 400 or 600 unpredictably. [engine note]
- Several AA passes are within 0.3 of the threshold (blue-400 4.54:1). Don't put these colours on tinted surfaces. [engine note]

## 6. Figures worth keeping

None captured (docs graphics are SVG imports in the repo: typography/hierarchyDo.svg, lineHeightCJK.svg, lineLength.svg - worth pulling into `examples/` later).

## 7. Open questions

- Public numeric contrast policy not found (docs gated). 
- Pin Sans licensing/availability outside Pinterest unknown.
- Component state matrix for disabled/focus per component not audited one by one.
