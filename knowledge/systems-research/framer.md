---
source: web:https://www.framer.com ; https://www.framer.com/pricing ; https://www.framer.com/brand ; npm framer-plugin 3.10.3 (styles/framer.css)
chapter: Framer design profile (marketing site measured live + plugin UI stylesheet)
pages: n/a (web sources, measured 2026-10-08)
topic_tags: [design-system, dark-mode, tight-display-type, compact-ui, tokens, product-hero, plugin-ui]
status: studied
---

# Framer

Machine profile: `system/systems-research/framer.json`. Raw measurements, screenshots (1440, 390), CSS and the unpacked plugin package: `corpus/web/systems/framer/` (gitignored). Public design guidance is thin: `framer.com/brand` lists four colours (black #000000, white #FFFFFF, Framer Blue #0099FF, Framer Deep Blue #0055FF) and logo rules (no outline, rotate, skew, colour, or other typefaces; no numeric clearspace); `framer.com/developers/plugins/ui` had no design values. The plugin stylesheet is the only published UI spec. Provenance: mixed (measured marketing + published plugin CSS).

## 1. Core ideas

1. **Dark, cinematic canvas.** Body #000, text white and white at 60-80% (rgba), hairlines white at 8-12%, surfaces #111 to #242424. One accent, Framer Blue #0099ff, reserved for links and small signals.
2. **Display type is compressed to one value.** GT Walsheim Medium 500 with `ss02`: h1 54/54 (line-height 1.0) and h2 44/48.4 (1.1), both at -0.04em (-2.16px and -1.76px); mobile 36/36 and 28/30.8 at the same -0.04em. Body and UI in Inter Variable (`cv01 cv05 cv09 cv11 ss03`): h3 18/24.3/400, body 14/19.6, UI 13/20.8/500.
3. **8px radius is the grammar; radius grows with container.** 8px on 232 elements; frames step 15, 18, 20, 25px; pills 100px; checkboxes 4px. Mobile inputs 10px.
4. **The product is the hero.** A 1200x673, 18px-radius black frame holds animated product stills; the headline sits left in two lines; CTAs are a white 34px button and a #1f1f1f 'Download app' button; a 'New: Skills' link sits opposite.
5. **Compact tool-panel kit (plugin UI).** 12px/1.5 text at weight 500 (buttons 600), 30px controls, 8px radius, 10px horizontal padding, `--framer-color-bg-tertiary` fills, focus as `inset 0 0 0 1px tint`, primary button text `text-reversed` on `tint` #09f with `tint-dark` hover and `tint-extra-dark` (#0077ff fallback) active, disabled opacity .5.
6. **A tiny semantic contract.** Eleven host-supplied variables: `--framer-color-bg`, `-bg-secondary`, `-bg-tertiary`, `-text`, `-text-secondary`, `-text-tertiary`, `-text-reversed`, `-divider`, `-tint`, `-tint-dark`, `-tint-extra-dark`; theme by `data-framer-theme="light|dark"` and `color-scheme`.
7. **Marketing tokens are UUIDs.** 477 `--token-<uuid>` colours on the home page (e.g. #09f, #05f, #cbff00, #4cd963, #00bb88); no names, so they cannot be audited as a system.
8. **Motion is invisible to CSS.** Computed transitions are empty on the marketing page, so timings live in JS; the plugin sheet gives only `background-color 0.2s`.
9. **Fonts are over-declared.** EB Garamond, Geist, Inter Tight, Mona Sans, JetBrains Mono, VT323 and Luxurious Script are declared but unused on the first view (template fonts).

## 2. Rules

- **RULE** Set display headings in one negative tracking value (about -0.04em) with line-height 1.0 for the largest size and 1.1 for the next; define the mobile steps (54 to 36px, 44 to 28px) at the same tracking.
  **Why** One value keeps hierarchy readable and tight without per-size tuning; the mobile pair preserves the ratio (about 0.67 and 0.64).
  **Applies to** landing page
  **Check** for headings >= 28px: letter-spacing between -0.045em and -0.035em and line-height/size <= 1.1; mobile h1/h2 sizes within 5% of 36/28px if the system is adopted unchanged.
  **Source** measured framer.com 1440 and 390 (h1 54/54/500/-2.16px; 36/36/-1.44px; h2 44/48.4/-1.76px; 28/30.8/-1.12px)

- **RULE** On a black canvas, build depth from white-alpha hairlines (8-12%) and 4-5 surface steps (#000, #111, #1a1a1a, #242424); reserve drop shadows for floating media and chips.
  **Why** Shadows vanish on black; hairlines and lightness steps keep edges legible.
  **Applies to** landing page | SaaS app UI (dark)
  **Check** count of surface background values on a page <= 6; borders use rgba(255,255,255,0.06-0.14); shadows only on floating layers.
  **Source** measured bg histogram and shadow list, framer.com, 2026-10-08

- **RULE** Use white as the primary CTA fill with black text on a black canvas, a dark-grey (#1f1f1f) secondary, and keep the brand blue out of buttons and headlines.
  **Why** Maximum contrast without a competing saturated fill; blue then signals links and states only.
  **Applies to** landing page (dark)
  **Check** primary CTA bg luminance > 0.9 on black pages; accent colour usage limited to link/inline elements.
  **Source** measured hero CTAs (white 149x34 r8; #1f1f1f 'Download app'), framer.com

- **RULE** For embedded tool panels, standardise one control size (30px height, 12px text, 8px radius, 0 10px padding) and one focus treatment (inset 1px tint); keep a single disabled style (opacity .5).
  **Why** Tight panels need predictable rhythm; a single size removes alignment drift.
  **Applies to** SaaS app UI (compact panels)
  **Check** all `input, select, button` computed height 30px (textarea min 30px), border-radius 8px, font-size 12px.
  **Source** framer-plugin styles/framer.css

- **RULE** Define a minimal host-supplied colour contract (background x3, text x3 plus reversed, divider, tint x3) for any embeddable UI, and provide light and dark values through a theme attribute and `color-scheme`.
  **Why** Embedded UI inherits the host's look without knowing its palette; eleven variables are enough for controls.
  **Applies to** SaaS app UI | plugins/widgets
  **Check** component CSS references only the contract variables plus a font-family variable; no literal colours except theme-specific overrides.
  **Source** framer-plugin styles/framer.css (--framer-color-*)

- **RULE** Never export or store design colours under opaque ids; name every colour token by role (surface, text-secondary, accent, success) and keep the count under about 60 for a marketing site.
  **Why** UUID-named tokens (477 on one page) cannot be audited, diffed or re-themed.
  **Applies to** all
  **Check** grep custom properties: zero names matching `--token-[0-9a-f]{8}-`; every colour var has a role word.
  **Source** measured framer.com stylesheet (477 `--token-<uuid>` vars). Negative example.

- **RULE** Check accent text on both themes: blue #0099ff is 7.0:1 on black but 3.0:1 on white; use a darker tint for text and links on light surfaces.
  **Why** A single accent hex cannot serve both polarities.
  **Applies to** all (dual theme)
  **Check** compute accent-on-surface contrast per theme; text >= 4.5:1, icons/large >= 3:1.
  **Source** computed from #0099ff; plugin `a{color: var(--framer-color-tint,#09f)}` on white

- **RULE** Scale radius with container size (8px controls, 15-18px cards and frames, 25px feature frames, 100px pills) and use one radius per tier.
  **Why** A fixed radius looks pinched on large frames; concentric steps feel designed.
  **Applies to** landing page
  **Check** radius by element width: < 200px -> 6-10px; 400-1300px frames -> 15-25px; no more than 4 radii per viewport.
  **Source** measured radius histogram (8px x232, 15px x71, 20px x27, 18px x13), framer.com

## 3. Numbers & scales

| Item | Value |
|---|---|
| Display | GT Walsheim Medium 500: 54/54 (-2.16px), 44/48.4 (-1.76px); mobile 36/36, 28/30.8 |
| Text | Inter Variable: 18/24.3/400 (-0.2px), 15/20.25, 14/19.6/400 (-0.1px), 13/20.8/500, 12/14.4/500, 10/12/500; 24/31.2 prices |
| Page | #000; surfaces #111, #141414, #1a1a1a, #1e1e1e, #242424, #1f1f1f |
| Text colours | #fff; rgba(255,255,255,.8/.6/.4); #999 (7.37:1), #666 (3.66:1) |
| Hairlines | rgba(255,255,255,.10), .08, #ffffff12, #ffffff1a |
| Accent | #0099ff (7.0:1 on black), #0055ff, plus token palette #60f, #90f, #f06, #f02, #fd7702, #fb0, #0cf, #2dd, #4cd963, #cbff00, #00bb88 |
| Radius | 3, 4, 6, 8 (232 uses), 10, 15, 18, 20, 25, 100 |
| Layout (1440) | content 1200 (x=120-1320), nav 64, hero frame 1200x673 r18 |
| Controls | nav 30, hero CTA 34, mobile CTA 29, mobile input 34, plugin 30, plugin textarea 50, checkbox 12 |
| Shadows | 0 1px 2px .1; 0 2px 6px .2; 0 26px 41.6px .2 (and 35.9/57.4, 16.1/25.8) |
| Motion | plugin bg 200ms; marketing computed none |
| Plugin | 12px/1.5/500, buttons 600, radius 8, checkbox 12px r4, divider 1px, tint #09f |

## 4. Dos and Don'ts

- Do: two-line h1 at 54/54/-0.04em beside a white 34px CTA and a dark-grey secondary. Don't: gradient fill CTA on black.
- Do: product frame as 18px-radius black box with live media. Don't: abstract 3D shapes in place of product.
- Do: plugin control: `height:30px; border-radius:8px; padding:0 10px; background: var(--framer-color-bg-tertiary)`. Don't: add per-control custom padding or a second control height.

## 5. Exceptions & judgement calls

- `#666` on black (3.66:1) is used for tertiary text; acceptable only for decorative metadata, not readable copy.
- 14px body at 60% white is minimal; for long copy raise to 16px and 80% white.
- [engine note] The marketing site is built with the vendor's own tool, so its CSS reflects exported component styles; do not infer an authored token system from it.
- [engine note] The library entry should combine two profiles: `marketing-dark` (measured) and `panel-compact` (plugin CSS, public).

## 6. Figures worth keeping

- `corpus/web/systems/framer/home-1440-fold.png`: black canvas, 54px tight headline, white CTA, product frame.
- `corpus/web/systems/framer/pricing-1440-full.png`: plan cards with credits selector on black.

## 7. Open questions

- Motion values (JS-driven): unknown; no CSS transitions to read.
- Framer editor UI (the app) not measured; needs an account.
- Plugin package licence field is empty (unknown).
- Text letter-spacing for 10px labels and 24px prices not captured.
- Backdrop blur values on floating chips not extracted.
- Semantic status colours (danger, warning) not named anywhere.
