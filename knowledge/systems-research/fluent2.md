---
source: web:https://fluent2.microsoft.design (design-principles, color, typography, layout, shapes, elevation, motion, material, iconography, accessibility) + github.com/microsoft/fluentui (packages/tokens/src, packages/react-components/*/library/src/components/*/use*Styles.styles.ts)
chapter: Microsoft Fluent 2: tokens, type ramp, colour ladders, elevation, motion, components
pages: n/a (web + open-source repo, fetched 2026-10-08)
topic_tags: [design-system, tokens, fluent, microsoft, color, elevation, motion, density, dark-mode, high-contrast, component-states, enterprise]
status: studied
---

# Microsoft Fluent 2

Machine profile: `system/systems-research/fluent2.json`. Raw fetches: `corpus/web/systems/fluent2/` (g_*.ts global tokens, a_*.ts alias tokens, shadows.ts, create*Theme.ts, use*Styles.ts component styles, design-site-fetches.md). Licence: MIT code and tokens (github.com/microsoft/fluentui/LICENSE); Segoe UI is a Microsoft font and cannot be shipped; icons MIT; product-launch icons and logos not licensed. Study structure and values; the numbers below are facts, the component code is not to be copied wholesale.

Evidence grading: **[verified]** read from a primary file or page in this session; **[computed]** produced by a script (WCAG contrast); **[engine note]** my own judgement.

## 1. Core ideas

1. **A theme is a 16-step brand ramp plus a fixed grey ladder.** `createLightTheme(brand)` and `createDarkTheme(brand)` take one `BrandVariants` object (keys 10, 20 ... 160) and emit every token; the rest (grey, shared colours, sizes) is constant. `brandWeb` 80 = `#0f6cbd`; Teams 80 = `#5b5fc7`; Office 80 = `#d83b01` [verified: global/brandColors.ts]. Rebranding is therefore 16 hex values.
2. **Three token layers.** Global (raw palette and primitive scales) -> Alias (semantic: `colorNeutralForeground1`, `colorBrandBackgroundHover`) -> component styles that only read aliases. 184 colour aliases in `lightColor.ts` and the same 184 in `darkColor.ts` [verified, counted].
3. **Every colour role has a state vector.** Foreground, background and stroke tokens come as Rest / Hover / Pressed / Selected (+ Disabled), so components never invent a hover colour. Example: `colorNeutralBackground1` white, Hover grey96 `#f5f5f5`, Pressed grey88 `#e0e0e0`, Selected grey92 `#ebebeb` [verified].
4. **Numbered ladders are ranks of prominence, not lightness.** Foreground1..5, Background1..8, Stroke1..4: 1 is the primary/most prominent, higher numbers recede. Light: Background1 white, 2 grey98, 3 grey96, 4 grey94, 5 grey92, 6 grey90; dark: 1 grey16 `#292929`, 2 grey12, 3 grey8, 4 grey4, 5 black [verified].
5. **Decorative stroke vs accessible stroke.** `colorNeutralStroke1` `#d1d1d1` is only 1.53:1 on white [computed]; `colorNeutralStrokeAccessible` `#616161` is 6.19:1. Input outline is Stroke1 but its bottom border uses the Accessible stroke, and checkbox/radio outlines use it [verified: useInputStyles.styles.ts].
6. **Elevation = blur number + two shadows.** `shadow2` ... `shadow64`, each is an ambient (soft, 0 offset, 2px or 8px blur) plus a key (directional) layer; the number in the name is the key blur [verified: utils/shadows.ts]. A separate `Brand` ramp exists for coloured surfaces; the design site forbids the neutral ramp on colour.
7. **Radius is a short ladder with one default.** 0, 2, 4 (default), 6, 8, 12, 16, 24, 32, 40, circular; four "forms" (rectangle, circle, pill, beak) [verified].
8. **Three control sizes, one height ladder.** Button, input, tab and similar controls are 24 / 32 / 40 px high (small / medium / large). Switch track 40x20 (32x16 small); checkbox indicator 16 (20 large) [verified: use*Styles].
9. **Focus is a two-colour stroke** (`colorStrokeFocus1` white, `colorStrokeFocus2` black) so it reads on any surface; in forced-colors mode every state maps to system colours (`Canvas`, `ButtonText`, `Highlight`) [verified].
10. **Motion tokens are few and honest about reduced motion.** 8 durations (50-500ms), 9 curves, and components set `transitionDuration: 0.01ms` under `prefers-reduced-motion` [verified]. The design site gives principles but no numbers.

## 2. Rules

- **RULE** Define colour as roles x states: every foreground, background and stroke role ships Rest, Hover, Pressed, Selected and Disabled values, and components must read the state token instead of computing a tint.
  **Why** A fixed state vector keeps hover/pressed deltas consistent across hundreds of components and makes dark mode a table swap.
  **Applies to** SaaS app UI | forms | all.
  **Check** In the project's token file, every interactive role has the five state keys; grep component CSS for `color-mix(`, `lighten(`, `darken(`, `opacity:` used to fake a hover (should be zero).
  **Source** fluent2 alias/lightColor.ts (colorNeutralBackground1 / Hover / Pressed / Selected)

- **RULE** Keep two stroke tokens: a decorative one (may be about 1.5:1) for cards and dividers and an accessible one (>= 3:1 against its surface) for control boundaries, checkbox/radio outlines and input bottom edges.
  **Why** WCAG 1.4.11 needs 3:1 for UI component boundaries; a single hairline colour either fails it or makes every divider heavy.
  **Applies to** forms | SaaS app UI.
  **Check** Contrast of each control's border against its background >= 3:1 (compute from computed styles of `input, select, textarea, [role=checkbox]`); dividers are exempt.
  **Source** fluent2 colorNeutralStroke1 #d1d1d1 vs colorNeutralStrokeAccessible #616161 [computed 1.53 / 6.19]

- **RULE** Build elevation from paired ambient + key shadows and name the levels by blur (2, 4, 8, 16, 28, 64); use at most one level change per interaction (rest 2 -> hover 4/8) and reserve 28 and 64 for side navigation, sheets, dialogs.
  **Why** One light source: sharp key shadow defines the edge, soft ambient implies distance; consistent naming lets a reviewer read depth from a token name.
  **Applies to** SaaS app UI | landing page cards.
  **Check** Every `box-shadow` value in the project is one of the declared elevation tokens; count distinct shadow strings <= 7.
  **Source** fluent2 utils/shadows.ts; fluent2.microsoft.design/elevation

- **RULE** Double the shadow opacity in dark mode (ambient 0.12 -> 0.24, key 0.14 -> 0.28) and let surfaces, not shadows, carry most separation there.
  **Why** Black shadows vanish on dark grey; Fluent compensates with opacity and with a lightness ladder (Background1 `#292929`, 2 `#1f1f1f`, 3 `#141414`).
  **Applies to** dark mode.
  **Check** Dark-theme shadow alpha >= 1.8x light-theme alpha for the same level; adjacent dark surfaces differ by >= 0.04 in OKLCH L or have a 1px stroke.
  **Source** fluent2 alias/darkColor.ts colorNeutralShadowAmbient 0.24 / Key 0.28

- **RULE** On a coloured surface use the brand shadow pair (ambient 0.30, key 0.25) and compute shadow alpha from the surface luminosity (design site: shadow1 = round(42 - 0.116 x lum), shadow2 = round(34 - 0.09 x lum), luminosity = 0.2126R + 0.7152G + 0.0722B) rather than reusing the neutral shadow.
  **Why** A neutral grey shadow on saturated colour looks dirty; shadows must be tinted/weighted by what they sit on.
  **Applies to** landing page | SaaS app UI.
  **Check** Shadows on elements whose background chroma is high are not rgba(0,0,0,.12-.14) neutral pairs.
  **Source** fluent2.microsoft.design/elevation ("Shadows on color surfaces")

- **RULE** Use one default radius (4px) for controls and surfaces under about 32px; step up one rung per size class (cards 2/4/6 by size; dialogs 8; larger sheets 12); do not round edge-to-edge surfaces (nav bars, tab bars) or the joined seams of split controls.
  **Why** Consistent radii make mixed components read as one family; rounding at screen edges and seams creates awkward gaps.
  **Applies to** SaaS app UI.
  **Check** Distinct `border-radius` values <= 5 across the page; edge-flush bars have radius 0.
  **Source** fluent2.microsoft.design/shapes; borderRadius tokens

- **RULE** Fix a 3-step control height ladder (24 / 32 / 40) and make every sibling control (button, input, select, tab, pill) share it; icon-only buttons are square at the same height.
  **Why** Mixed heights in a toolbar or form row break the baseline grid and force ad hoc padding.
  **Applies to** forms | SaaS app UI.
  **Check** In any row, controls' `getBoundingClientRect().height` is one of {24, 32, 40}; icon buttons width == height.
  **Source** fluent2 useButtonStyles / useInputStyles (min-height 24 / 32 / 40; button small 3px padding + 16px line + 2px border)

- **RULE** Keep body copy 14/20 only for dense app chrome; on web pages meant to be read, step to Body2 16/22 (or larger) and use semibold (600), not bold, for headings.
  **Why** Fluent's body1 is 14px for productivity density; the ramp is a tool-UI ramp. Heading weight 600 keeps the quiet tone.
  **Applies to** SaaS app UI | landing page.
  **Check** Computed body font-size >= 16px on reading surfaces; h1-h3 weight 600.
  **Source** fluent2 global/typographyStyles.ts (body1 14/20, body2 16/22, title weights 600)

- **RULE** Express motion as duration x curve tokens (Faster 100ms for colour/border changes, Normal 200ms for toggles, Gentle-Slow 250-300ms for surfaces), decelerate on enter, accelerate on exit, and zero out durations under reduced motion.
  **Why** Small changes need to feel instant, large surfaces need distance-proportional time; a single reduced-motion switch is auditable.
  **Applies to** all.
  **Check** All `transition-duration` values in {50,100,150,200,250,300,400,500}ms; a `prefers-reduced-motion` block sets durations to ~0; enter easing is a decelerate curve.
  **Source** fluent2 global/durations.ts, curves.ts; useButtonStyles (durationFaster + curveEasyEase; 0.01ms in reduced motion)

- **RULE** Draw focus as two concentric contrasting strokes (white and black, 2px total) so it is visible on every background, and provide a forced-colors mapping for each state.
  **Why** A single brand-colour ring fails on brand-coloured surfaces; Windows High Contrast removes author colours.
  **Applies to** all.
  **Check** `:focus-visible` outline contrast >= 3:1 against both light and dark backgrounds in a screenshot; `@media (forced-colors: active)` rules exist for buttons, inputs, checkboxes.
  **Source** fluent2 colorStrokeFocus1/2; useButtonStyles forced-colors block

- **RULE** Use semantic status colours only for feedback (danger cranberry `#c50f1f`, success green `#107c10`, warning orange `#f7630c`), always with an icon or text, and give each status a 6-token set (Background1-3, Foreground1-3, Border1-2).
  **Why** Colour alone fails colour-blind users; a fixed set per status prevents ad hoc tints.
  **Applies to** forms | SaaS app UI.
  **Check** Status UI contains text or an icon in addition to colour; status backgrounds come from tint60/tint40, text from shade10/30.
  **Source** fluent2 global/colors.ts cranberry/green/orange; statusColorMapping.ts; fluent2.microsoft.design/color

## 3. Numbers & scales

| Group | Values |
|---|---|
| Type (web, size/line, weight) | caption2 10/14; caption1 12/16; body1 14/20; body2 16/22; subtitle2 16/22 (600); subtitle1 20/28 (600); title3 24/32; title2 28/36; title1 32/40; largeTitle 40/52; display 68/92 (all 600). Weights 400/500/600/700. |
| Families | Segoe UI stack; Consolas mono; Bahnschrift numeric |
| Spacing tokens | none 0, xxs 2, xs 4, sNudge 6, s 8, mNudge 10, m 12, l 16, xl 20, xxl 24, xxxl 32 (design page continues 36, 40, 48, 52, 56); base 4px; touch target 44 (web/iOS), 48 (Android) |
| Radius | 0, 2, 4, 6, 8, 12, 16, 24, 32, 40, circular 10000 |
| Stroke | 1, 2, 3, 4 px |
| Shadows (light) | shadow2 `0 0 2px a, 0 1px 2px k`; 4 `0 0 2px, 0 2px 4px`; 8 `0 0 2px, 0 4px 8px`; 16 `0 0 2px, 0 8px 16px`; 28 `0 0 8px, 0 14px 28px`; 64 `0 0 8px, 0 32px 64px`; a = .12, k = .14 (lighter .06/.07, darker .20/.24); dark .24/.28 |
| Durations | 50, 100, 150, 200, 250, 300, 400, 500 ms |
| Curves | accelerate max (0.9,0.1,1,0.2), mid (1,0,1,1), min (0.8,0,0.78,1); decelerate max (0.1,0.9,0.2,1), mid (0,0,0,1), min (0.33,0,0.1,1); easyEase max (0.8,0,0.2,1), easyEase (0.33,0,0.67,1); linear |
| Breakpoints | 320-479 small, 480-639, 640-1023, 1024-1365, 1366-1919, 1920+; 12-column grid |
| Controls | 24 / 32 / 40; switch track 32x16 / 40x20; checkbox 16 / 20; badge 6, 10, 16, 20, 24, 32; card padding 8 / 12 / 16 |
| Surfaces | dialog radius 8, padding 24, gap 8, max-width 600, shadow64; menu radius 4, padding 4, shadow16, 138-300 wide; tooltip max 240, padding 4/11/6/11 |
| Light neutrals | fg1 `#242424`, fg2 `#424242`, fg3 `#616161`, fg4 `#707070`, disabled `#bdbdbd`; bg1 `#ffffff`, bg2 `#fafafa`, bg3 `#f5f5f5`, bg4 `#f0f0f0`, bg5 `#ebebeb`, bg6 `#e6e6e6`; stroke1 `#d1d1d1`, stroke2 `#e0e0e0`, stroke3 `#f0f0f0`, accessible `#616161` |
| Brand (web ramp 10..160) | `#061724 #082338 #0a2e4a #0c3b5e #0e4775 #0f548c #115ea3 #0f6cbd #2886de #479ef5 #62abf5 #77b7f7 #96c6fa #b4d6fa #cfe4fa #ebf3fc` |
| Contrast [computed] | brand80 on white 5.38:1; fg4 4.95:1; fg3 6.19:1; focus ring black/white |

## 4. Dos and Don'ts

- **Do** pair a 1px `Stroke1` card border with `shadow2` at rest and lift to `shadow4`/`shadow8` on hover; **Don't** stack a large soft shadow on top of a hairline on every card (see anti-slop note on border + wide shadow).
- **Do** use filled icons for selected state and regular icons for wayfinding (design site); **Don't** colour icons with more than one colour except product-launch icons.
- **Do** sentence-case all UI text; **Don't** use all caps to draw attention (docs).
- **Do** use Acrylic only on transient, light-dismiss surfaces (menus, popovers) and Smoke (translucent black) behind modals; **Don't** use blur on persistent surfaces.
- **Do** use brand colour on buttons, CTAs and selected states only; **Don't** apply it to large surfaces (docs: dilutes hierarchy).

## 5. Exceptions & judgement calls

- The design site and the code disagree in three places; implement from code and note it: Subtitle 1 is 20/26 in docs but `lineHeightBase500` is 28px; radius "Large" is 8 in docs but `borderRadiusLarge` is 6px (XLarge is 8); the generated alias files still carry comments with the legacy `#0078d4` brand 80 while the current ramp is `#0f6cbd`.
- Segoe UI cannot be redistributed. A bound project must pick a licensed or system substitute and re-check line-height 20/22 against it. [engine note]
- Fluent is neutral by design: "Unmistakably Microsoft" is the fourth design principle. For a brand-led site this system is a structure donor (token model, states, sizes), not a look donor. [engine note]
- Dark-mode brand fill is a different ramp step (70 rest, 80 hover) than light (80 rest, 70 hover): hover direction flips. Do not assume "hover = darker" in dark.
- The 14px body default conflicts with generic 16px web-readability rules; apply it only to application chrome. [engine note]

## 6. Figures worth keeping

n/a (no page images captured). Useful live pages: fluent2.microsoft.design/elevation (shadow table), /shapes (radius table), /color (palette model), /layout (spacing ramp and breakpoints).

## 7. Open questions

- Numeric Acrylic/Mica blur and tint values: not published on fluent2.microsoft.design (it defers to Windows material docs). unknown.
- Density: the design site gives no numeric density modes; sizes (24/32/40) are the only density lever in tokens. A "compact" ladder would be our own addition.
- Total token count not enumerated (global + alias + typography + shadows); only the 184 colour aliases were counted.
- `Subtitle1` line-height conflict (26 vs 28) and `Large` radius conflict (8 vs 6) unresolved without asking the maintainers.
- Component count (47) is a count of stable package directories, not an official figure.
