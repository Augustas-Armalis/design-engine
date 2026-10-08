---
source: web:https://alignui.com (docs v1.2) + github.com/alignui (MIT: nextjs/remix starters, cli) + measured render of alignui.com, docs and pro pages
chapter: AlignUI design system: token system, naming convention, typography, component variant x size x state matrices, measured marketing layer
pages: n/a (web; fetched and measured 2026-10-08)
topic_tags: [benchmark, design-system, tokens, naming, typography, shadows, radius, focus-ring, component-matrix, tailwind-variants, alignui, quality-bar]
status: studied
---

# AlignUI: the token system, naming and component matrices

Companion: `alignui-method.md` (why it is consistent, what it leaves out, the spec-first method). Reusable template: `system/spec-template/`.

**Provenance and licence.** Evidence tags: **[S]** read from the open-source repos `alignui/alignui-nextjs-typescript-starter`, `alignui-remix-typescript-starter`, `alignui/cli` (all MIT, (c) 2024 Dogukan Cavus; cloned to `corpus/web/alignui/repos/`, private). Token names and values are quoted from those files, as the licence allows. Component code is **paraphrased into tables, not reproduced**. **[D]** the public v1.2 docs (`corpus/web/alignui/text/`, 57 pages: 49 component pages, colour, typography, install, intro, 4 utils); the docs' code listings are identical to the starter's components. **[M]** measured by this project with Playwright (Chromium, 1440 and 390 px, 2026-10-08) on alignui.com, a docs page and the pro page. **[E]** engine note: our inference, not stated by the source. PRO (components and blocks, templates) and the Figma file are paid; only their public marketing pages were read, so Figma figures below are vendor claims.

## 1. Core ideas

1. **Three token layers, and components may only touch the top one.** Layer 1 is raw palettes (12 colour families as `--{hue}-{step}`), layer 2 is roles (`--bg-*`, `--text-*`, `--stroke-*`, state families), layer 3 is component recipes. In the starter's 51 component files there are 619 references to role tokens and 17 to raw palette steps (97% semantic) [S, counted]. Every raw leak is a deliberate one-off (error hover `red-700`, avatar tints `*-200` + `*-950`, `red-alpha-10`).
2. **Dark mode is a re-pointing of role variables, not a second stylesheet.** `.dark` overrides 65 variables; components contain zero `dark:` utilities (the one grep hit is a variant named `dark` on the tooltip) [S, counted]. Role names stay (`bg-white-0` becomes near-black in dark); that is why the number in the name is "the light-mode step", not a promise about the value.
3. **The naming convention encodes the value.** `bg-weak-50`, `bg-soft-200`, `bg-sub-300`, `text-sub-600`, `stroke-soft-200`, `text-strong-950`: intensity word (weak/soft/sub/strong) + the neutral step it points at in light mode. You can read a component and know the colour without opening the file.
4. **Type is a closed list of 22 named classes** (title/label/paragraph/subheading/doc), each carrying size + line-height + weight + tracking together. UI components use 11 of them; 3 do most of the work: `label-sm` 28 uses, `paragraph-sm` 20, `label-xs` 13 [S, counted]. There is no way to ask for "15px".
5. **Every control uses the same four-step height ladder and the same radius-by-size rule.** Heights 40/36/32/28 (button), 40/36/32 (input, select), radius 10 at the largest size and 8 below. The ladder is repeated, not re-invented, per component.
6. **Variants are orthogonal axes declared as a cross product.** Button = `variant` (role: primary/neutral/error) x `mode` (fill style: filled/stroke/lighter/ghost) x `size`; the 12 role-by-mode cells are each written out with base, hover and focus. Disabled is one shared recipe for all cells.
7. **State recipes are shared across components.** Hover on a bordered surface = fill moves to `bg-weak-50`, ring goes transparent, shadow drops. Focus = the same two-layer halo shadow (`button-*-focus`) plus a strong ring on form fields. Error = ring to `error-base`, focus halo to red. Used in input, select, textarea, accordion, digit input, button.
8. **Motion is tiny and uniform:** one easing (`ease-out`, 57 uses, 1 `ease-in` for drawer close) and two durations (200 ms 53 times, 300 ms 6 times for things that travel: tab underline, segmented control, progress) [S, counted]. Layers: three z-levels (10, 50, 100).
9. **The marketing site is a second, prefixed token set on the same grammar.** alignui.com's own pages use `ln-` tokens (own grey ramp with half-steps 25/450/925, orange `#f05023`, weight 550, 80/88 display type, brand-tinted layered shadows) while the docs component previews use the blue kit. Same structure, different values. This is the model for "distinctive but rigorous" (see method note).
10. **Docs mirror the matrix.** Each component page has Installation, Examples (one subsection per axis value: Primary, Neutral, Error, Size, Disabled, With Icon, Full Width, asChild), Composition, and an API table (Root, Icon...) with prop types and defaults [D]. The page is the completeness checklist.

## 2. Rules

- **RULE [ALN-01]** Reference colour only through role tokens (`bg-weak-50`, `text-sub-600`, `stroke-soft-200`, `error-base`); allow raw palette steps only for named one-offs, and keep them under about 5% of colour references.
  **Why** The role layer is what dark mode, theming and re-branding re-point; a raw step in a component is a place where the system cannot reach. AlignUI's starter holds 97% role references.
  **Applies to** all. **Check** In project CSS/TSX: count colour utilities and variables per layer; raw hex or palette steps outside `tokens.css` should be 0 (or each listed in the spec). **Source** [S] counted over 51 components.

- **RULE [ALN-02]** Build light and dark as two assignments of the same role names; write zero per-component dark overrides.
  **Why** One mapping to maintain and test; guarantees that every component has a dark state the moment it uses roles.
  **Applies to** SaaS app UI | landing page. **Check** `grep -c "dark:"` in component source is 0 (except dark-only illustrations); the `.dark` block redefines roles only. **Source** [S] `.dark` overrides 65 variables; 0 `dark:` utilities.

- **RULE [ALN-03]** Name role tokens `{group}-{intensity}-{lightStep}` with a fixed intensity vocabulary (white/weak/soft/sub/surface/strong for fills, strong/sub/soft/disabled for text, strong/sub/soft/white for strokes).
  **Why** The name carries meaning and the light value, so review and code search work without a lookup; intensities are comparable across fills, text and strokes.
  **Applies to** all. **Check** token file: every role key matches `^(bg|text|stroke)-[a-z]+-\d+$`; no `gray-3`, `color1`, or per-component colour names. **Source** [S] `bg-strong-950, bg-surface-800, bg-sub-300, bg-soft-200, bg-weak-50, bg-white-0`.

- **RULE [ALN-04]** Give every semantic state family the same four tones (dark, base, light, lighter) and the same dark-mode behaviour (dark -> 400 step; light and lighter -> 24% and 16% alpha).
  **Why** Any badge, alert, status or chart can use any family without special cases; dark mode tints become translucent so they sit on any surface.
  **Applies to** all. **Check** each family in tokens has exactly `dark|base|light|lighter`; dark block defines all four. **Source** [S] faded, information, warning, error, success, away, feature, verified, highlighted, stable.

- **RULE [ALN-05]** Keep a complete alpha ramp (10, 16, 24 percent) for every hue and use it for hover tints, focus halos and dark-mode tints; never invent a one-off opacity.
  **Why** Alpha tints stay correct on any background and in both themes; three stops is enough to cover tint, hover and halo.
  **Applies to** all. **Check** no `rgba(` or `/ 12%` inside components; only `*-alpha-{10,16,24}` tokens. **Source** [S] `--{hue}-alpha-24/16/10` for 11 hues + white + black.

- **RULE [ALN-06]** Define typography as named composites that bundle size, line-height, weight and letter-spacing; ban raw `font-size`/`line-height` in components. Tighten tracking as size grows (about -1.5% at 18-24 px, -1.1% at 16, -0.6% at 14, 0 at 12 and below) and widen it for uppercase labels (+2% to +6%).
  **Why** Optical size correction is baked in once; components cannot drift to arbitrary sizes.
  **Applies to** all. **Check** computed (font-size, line-height, weight, letter-spacing) tuples on the page map to <= the spec's named styles (AlignUI marketing home measures 23 distinct tuples on 12 font sizes at 1440, 16 tuples on 9 sizes at 390). **Source** [S] `tailwind.config.ts` texts; [D] typography page; [M].

- **RULE [ALN-07]** Pair every size with a role in the type list (label = interactive text, medium weight; paragraph = reading text, regular weight; subheading = small uppercase caps with wide tracking; title = headings; doc = long-form).
  **Why** Weight is part of the role, so a button label and a body line of equal size still look different on purpose.
  **Applies to** all. **Check** controls use `label-*`, descriptions use `paragraph-*`; button text is weight 500, paragraph weight 400. **Source** [S].

- **RULE [ALN-08]** Use one height ladder for all controls (40, 36, 32, then 28 only for buttons/chips) and change radius with it (10 at the top size, 8 below, 6 for chips).
  **Why** Controls placed side by side (input + button + select) align without per-pair fiddling.
  **Applies to** SaaS app UI | forms. **Check** heights of `button, input, select` in one row are equal at each size step; radius per size follows the table in 3.8. **Source** [S] button/input/select compound variants.

- **RULE [ALN-09]** Declare variants as orthogonal axes (role, fill-style, size) and write every cell of the cross product explicitly; one shared disabled recipe replaces per-cell disabled styling.
  **Why** An unwritten cell is where inconsistency hides; one disabled recipe keeps disabled controls identical across roles.
  **Applies to** all. **Check** the spec table has no empty cell; disabled computed style identical across all button variants. **Source** [S] `buttonVariants` 3 x 4 compound cells; disabled `bg-weak-50 + text-disabled-300 + ring transparent`.

- **RULE [ALN-10]** Make interaction states move along the same two channels in every component (fill and ring): stroke hover trades border for tint, lighter hover trades tint for border, ghost hover adds tint, filled hover steps one shade darker.
  **Why** Users learn one hover grammar; the design reads as one family.
  **Applies to** all. **Check** compare hover diff per mode across Button, Tag, Pagination, Compact button: same channel changes. **Source** [S].

- **RULE [ALN-11]** Build focus as a two-layer halo (2 px gap in the page-background token, then a 2 px halo ring in a role-matched alpha) and add a strong 1 px ring on form fields. Our engine must raise the halo to >= 3:1 against the surface (AlignUI's 10% alpha halo measures about 1.14:1).
  **Why** The gap keeps the ring separable from any fill; but a 10% alpha halo alone fails non-text contrast. Copy the structure, not the opacity.
  **Applies to** all interactive controls. **Check** computed `:focus-visible` box-shadow has two spread layers (2px/4px) and its outer colour contrast vs surface >= 3:1; or an outline of >= 2px at >= 3:1. **Source** [S] `button-primary-focus`, `button-important-focus`, `button-error-focus`; [E] contrast computed 2026-10-08.

- **RULE [ALN-12]** Limit motion to the two-duration/one-easing set (200 ms ease-out default; 300 ms for travelling indicators) and add a reduced-motion branch, which AlignUI omits.
  **Why** Uniform timing is felt as polish; the missing reduced-motion path is a defect to fix, not copy.
  **Applies to** all. **Check** transitions use <= 3 durations; `@media (prefers-reduced-motion)` exists. **Source** [S] 53 x duration-200, 6 x duration-300; 0 reduced-motion rules.

- **RULE [ALN-13]** Give every elevation a name and a purpose (regular-xs for resting controls, regular-md for floating panels, tooltip, switch-thumb, per-button depth recipes) and store shadows as layered lists in tokens, never inline.
  **Why** Depth reads as a system when there are few recipes reused by role.
  **Applies to** all. **Check** all `box-shadow` values on a page belong to the spec's shadow list (home at 1440 computes 35 distinct box-shadow strings, ring and focus variants included, built from about a dozen named recipes). **Source** [S] 17 shadow tokens; [M].

- **RULE [ALN-14]** Register custom token classes with the class-merging utility (tailwind-merge `classGroups` for font-size, shadow, rounded) so overrides resolve and the token set is a checked vocabulary.
  **Why** Otherwise `text-label-sm` and `text-sm` silently both apply; consistency is lost at the merge step.
  **Applies to** Tailwind projects. **Check** `twMergeConfig` lists every type/shadow/radius token. **Source** [S] `utils/cn.ts`.

- **RULE [ALN-15]** Pass variant props from the Root to its sub-parts through context or cloning so Root and Icon/Affix/Dismiss parts never disagree on size or role.
  **Why** A size set on the parent must size the icon and padding; sub-part drift is the commonest component inconsistency.
  **Applies to** component libraries. **Check** change `size` on Root and confirm child icon/padding changes without child props. **Source** [S] `recursiveCloneChildren` used by Button, Input, Tag, Badge, Hint.

- **RULE [ALN-16]** Offset icon boxes with a negative margin (-4 px) so the glyph, not the 20 px box, aligns to the padding edge; size icons 20 px (16 px in xs contexts, 12 px in the smallest badge).
  **Why** Optical alignment: padding looks equal on the icon side and the text side.
  **Applies to** buttons, badges, tags, inputs. **Check** left padding to glyph edge equals right padding to text edge within 1 px. **Source** [S] `-mx-1` on icon slots; Remix icon glyphs scaled to ~0.9.
  
- **RULE [ALN-17]** Express shadows as a ring plus layered offsets: 1 px alpha ring, then 4-6 stacked shadows whose blur doubles as opacity stays ~4%, plus an inset highlight; tint the stack with the element's own dark hue on coloured buttons.
  **Why** Layering approximates real light falloff and keeps edges crisp on both grey and white; hue-tinted shadows keep coloured buttons from looking dirty.
  **Applies to** landing page | SaaS app UI. **Check** `box-shadow` has >= 3 non-inset layers and one `0 0 0 1px` ring on marketing buttons/cards. **Source** [S] `custom-xs..lg`; [M] marketing `button-gray`, `button-orange`, `ln-xs` recipes.

- **RULE [ALN-18]** Use concentric radii: inner radius = outer radius minus the gap between them (marketing page pairs 13/9/5 and 15/11/7 differ by the 4 px padding).
  **Why** Nested rounded shapes with the same radius look pinched at corners.
  **Applies to** landing page | cards in cards. **Check** for each child with a rounded parent and padding p, parent radius - child radius is within 1 px of p. **Source** [M] radii observed; [E] pattern inferred.

## 3. Numbers & scales

### 3.1 Colour: raw palettes (`--{hue}-{step}`, hex, light theme) [S]

Neutrals have 12 steps (0, 50, 100 ... 900, 950); hues have 11 (50 ... 950); all have `alpha-24/16/10`. Counted: 177 raw colour variables (3 neutral families x 15, 9 hues x 14, white 3, black 3).

| step | gray | slate | blue | orange | red | green | yellow | purple | sky | pink | teal |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | ffffff | ffffff | | | | | | | | | |
| 50 | f7f7f7 | f5f7fa | ebf1ff | fff3eb | ffebec | e0faec | fff4d6 | efebff | ebf8ff | ffebf4 | e4fbf8 |
| 100 | f5f5f5 | f2f5f8 | d5e2ff | ffe6d5 | ffd5d8 | d0fbe9 | ffefcc | dcd5ff | d5f1ff | ffd5ea | d0fbf5 |
| 200 | ebebeb | e1e4ea | c0d5ff | ffd9c0 | ffc0c5 | c2f5da | ffecc0 | cac0ff | c0eaff | ffc0df | c2f5ee |
| 300 | d1d1d1 | cacfd8 | 97baff | ffc197 | ff97a0 | 84ebb4 | ffe097 | a897ff | 97dcff | ff97cb | 84ebdd |
| 400 | a3a3a3 | 99a0ae | 6895ff | ffa468 | ff6875 | 3ee089 | ffd268 | 8c71f6 | 68cdff | ff68b3 | 3fdec9 |
| 500 | 7b7b7b | 717784 | 335cff | fa7319 | fb3748 | 1fc16b | f6b51e | 7d52f4 | 47c2ff | fb4ba3 | 22d3bb |
| 600 | 5c5c5c | 525866 | 3559e9 | e16614 | e93544 | 1daf61 | e6a819 | 693ee0 | 35ade9 | e9358f | 1daf9c |
| 700 | 333333 | 2b303b | 2547d0 | ce5e12 | d02533 | 178c4e | c99a2c | 5b2cc9 | 2597d0 | d0257a | 178c7d |
| 800 | 292929 | 222530 | 1f3bad | b75310 | ad1f2b | 1a7544 | a78025 | 4c25a7 | 1f7ead | ad1f66 | 1a7569 |
| 900 | 1c1c1c | 181b25 | 182f8b | 96440d | 8b1822 | 16643b | 86661d | 3d1d86 | 18658b | 8b1852 | 16645a |
| 950 | 171717 | 0e121b | 122368 | 71330a | 681219 | 0b4627 | 624c18 | 351a75 | 124b68 | 68123d | 0b463e |

Alpha ramps (all `#rrggbb` + 1a/29/3d = 10/16/24%): gray `a3a3a3`, slate `99a0ae`, blue `476cff`, orange `ff9147`, red `fb3748`, green `1fc16b`, yellow `fbc64b`, purple `784def`, sky `47c2ff`, pink `fb4ba3`, teal `22d3bb`, white `ffffff`, black `000000`. `neutral-*` is an alias of `gray-*`; swapping the alias to slate re-tints every role.

### 3.2 Colour: role tokens (light -> dark mapping) [S]

| token | light | dark | job |
|---|---|---|---|
| `bg-strong-950` | neutral-950 | neutral-0 | inverse fill (primary neutral button, tooltip dark) |
| `bg-surface-800` | neutral-800 | neutral-200 | hover of inverse fill |
| `bg-sub-300` | neutral-300 | neutral-600 | hover of soft fills (checkbox, switch) |
| `bg-soft-200` | neutral-200 | neutral-700 | tracks, unchecked controls |
| `bg-weak-50` | neutral-50 | neutral-900 | hover and disabled fills, table head |
| `bg-white-0` | neutral-0 | neutral-950 | page and surface base |
| `text-strong-950` | neutral-950 | neutral-0 | primary text |
| `text-sub-600` | neutral-600 | neutral-400 | secondary text, icons |
| `text-soft-400` | neutral-400 | neutral-500 | placeholder, tertiary |
| `text-disabled-300` | neutral-300 | neutral-600 | disabled |
| `text-white-0` | neutral-0 | neutral-950 | text on inverse fill |
| `stroke-strong-950` | neutral-950 | neutral-0 | focus ring on fields |
| `stroke-sub-300` | neutral-300 | neutral-600 | emphasised border |
| `stroke-soft-200` | neutral-200 | neutral-700 | default hairline |
| `stroke-white-0` | neutral-0 | neutral-950 | separator on tinted surface |
| `static-black / static-white` | neutral-950 / neutral-0 | same (never flip) | text on coloured fills |
| `overlay` | `#3333333d` | `#3333338f` | modal/drawer scrim (+ `backdrop-blur-[10px]`) |

Primary: `primary-dark` = blue-800, `primary-darker` = blue-700, `primary-base` = blue-500, `primary-alpha-24/16/10`. The CLI lets a project pick primary from blue, purple, orange, sky (green with base shade 600 is in the config map); in dark, blue/purple base moves to 400. The v4 CLI adds `primary-light` (100) and `primary-lighter` (50). Switching brand = re-pointing 6-8 aliases.

State families (each `dark / base / light / lighter`; light theme -> blue example): faded = neutral 800/500/200/100; information = blue 950/500/200/50; warning = orange; error = red; success = green; away = yellow; feature = purple; verified = sky; highlighted = pink; stable = teal (all 950/500/200/50). Dark: dark -> 400 step, base -> 600 (information and feature stay 500), light -> `alpha-24`, lighter -> `alpha-16`. Social brand colours: apple, twitter, github, notion, tidal, amazon, zendesk (flip to white in dark). Total role variables: 73 (bg 6, text 5, stroke 4, nine state families x 4 + faded, primary 6, static 2, overlay 3, social 7).

### 3.3 Typography: 22 named styles [S, D confirmed identical]

Font: Inter (variable, `--font-sans`), Geist Mono for code (`--font-geist-mono`). Weight 500 for title/label/subheading/doc-label, 400 for paragraph/doc-paragraph.

| class | size / line-height | tracking | weight |
|---|---|---|---|
| title-h1 | 56 / 64 | -1% | 500 |
| title-h2 | 48 / 56 | -1% | 500 |
| title-h3 | 40 / 48 | -1% | 500 |
| title-h4 | 32 / 40 | -0.5% | 500 |
| title-h5 | 24 / 32 | 0 | 500 |
| title-h6 | 20 / 28 | 0 | 500 |
| label-xl | 24 / 32 | -1.5% | 500 |
| label-lg | 18 / 24 | -1.5% | 500 |
| label-md | 16 / 24 | -1.1% | 500 |
| label-sm | 14 / 20 | -0.6% | 500 |
| label-xs | 12 / 16 | 0 | 500 |
| paragraph-xl | 24 / 32 | -1.5% | 400 |
| paragraph-lg | 18 / 24 | -1.5% | 400 |
| paragraph-md | 16 / 24 | -1.1% | 400 |
| paragraph-sm | 14 / 20 | -0.6% | 400 |
| paragraph-xs | 12 / 16 | 0 | 400 |
| subheading-md | 16 / 24 | +6% | 500 (uppercase in use) |
| subheading-sm | 14 / 20 | +6% | 500 |
| subheading-xs | 12 / 16 | +4% | 500 |
| subheading-2xs | 11 / 12 | +2% | 500 |
| doc-label | 18 / 32 | -1.5% | 500 |
| doc-paragraph | 18 / 32 | -1.5% | 400 |

Structure: every line-height is a multiple of 4 px (12, 16, 20, 24, 28, 32, 40, 48, 56, 64), so text boxes stack on the 4 px grid. Ratios: titles 1.14-1.4x, UI text 1.33-1.5x, subheading-2xs 1.09x, doc 1.78x. Label and paragraph share the same size/line-height/tracking per step; only weight differs.

### 3.4 Radii [S]

Added tokens: `rounded-10` = 10 px, `rounded-20` = 20 px. Rest is Tailwind: `rounded` 4, `md` 6, `lg` 8, `xl` 12, `2xl` 16, `full`. Effective ramp used by components: 4, 6, 8, 10, 12, 16, 20, full. Usage counts in starter: full 29, lg 24, 10 12, md 6, xl 5, 2xl 5, 20 1.

### 3.5 Spacing, sizes [S]

No spacing tokens: Tailwind's 4 px scale with half steps (0.5, 1.5, 2.5, 3.5 = 2, 6, 10, 14 px). Control internals use a 2 px sub-grid (6/10/14) by design. Heights: 28, 32, 36, 40, 48 (tab bar), 64 (table row). Icon box 20 px (16, 12 in small contexts). Modal 400 max width, drawer 400, dropdown 300, toast viewport 438, select list max-height 196.

### 3.6 Shadows (17 named) [S]

| token | value (abridged) | use |
|---|---|---|
| regular-xs | `0 1px 2px #0a0d1408` | resting stroke controls |
| regular-sm | `0 2px 4px #1b1c1d0a` | small raised |
| regular-md | `0 16px 32px -12px #0e121b1a` | popovers, menus, modals, alerts stroke |
| button-primary-focus | `0 0 0 2px bg-white-0, 0 0 0 4px primary-alpha-10` | focus halo (blue) |
| button-important-focus | `0 0 0 2px bg-white-0, 0 0 0 4px neutral-alpha-16` | focus halo (neutral; fields) |
| button-error-focus | `0 0 0 2px bg-white-0, 0 0 0 4px red-alpha-10` | focus halo (error) |
| fancy-buttons-neutral/primary/error/stroke | `0 1px 2px` + `0 0 0 1px {fill colour}` | depth + ring for fancy buttons |
| toggle-switch | `0 6px 10px #0e121b0f, 0 2px 4px #0e121b08` | segmented-control indicator, slider thumb |
| switch-thumb | `0 4px 8px #1b1c1d0f, 0 2px 4px #0e121b14` | switch thumb |
| tooltip | `0 12px 24px #0e121b0f, 0 1px 2px #0e121b08` | tooltip |
| custom-xs..lg | ring `0 0 0 1px rgba(51,51,51,.04)` + 3 to 8 stacked layers (offset and blur doubling, ~4% alpha, last layer up to `0 96px 96px -32px`) + inset `0 -1px 1px -0.5px` | "block" and card elevations (PRO blocks) |

### 3.7 Motion and layers [S]

| item | value |
|---|---|
| default transition | `transition duration-200 ease-out` on every interactive element |
| travelling indicators | 300 ms; tab underline uses `cubic-bezier(0.65, 0, 0.35, 1)`; segmented control 300 ms; progress fill 300 ms |
| enter/exit of overlays | tailwindcss-animate: fade 0 to 1, zoom 95 to 100, slide 8 px (`-2`) from the side opposite the anchor; 200 ms, `ease-in` on drawer close |
| accordion | 0.2 s ease-out height + opacity |
| switch press | thumb scales to 0.833 while pressed |
| z-index | 10 (internal), 50 (overlay, menu, tooltip, popover), 100 (toast viewport) |
| reduced motion | none implemented |

### 3.8 Component matrices (heights, padding, gap, icon, radius, text) [S]

Naming: size words in code are `medium | small | xsmall | xxsmall` (Figma says Large/Medium/Small/2X-Small; docs state the mapping, e.g. Figma "2X-Small" = code `xsmall` on tooltip).

**Button** (`variant` x `mode` x `size`; defaults primary, filled, medium). Text always `label-sm` (14/20/500); icon 20 px, margin -4 px.

| size | height | padding-x | gap | radius |
|---|---|---|---|---|
| medium | 40 | 14 | 12 | 10 |
| small | 36 | 12 | 12 | 8 |
| xsmall | 32 | 10 | 10 | 8 |
| xxsmall | 28 | 8 | 10 | 8 |

State cells (default / hover / focus-visible); focus always adds the role-matched halo; `lighter`, `ghost` focus also set fill to `bg-white-0` and ring to the role colour. Disabled (all 12 cells): no pointer events, fill `bg-weak-50`, text `text-disabled-300`, ring transparent.

| role | mode | default | hover |
|---|---|---|---|
| primary | filled | fill primary-base, text static-white | fill primary-darker |
| primary | stroke | fill bg-white-0, text + ring primary-base | fill primary-alpha-10, ring transparent |
| primary | lighter | fill primary-alpha-10, text primary-base | fill bg-white-0, ring primary-base |
| primary | ghost | transparent, text primary-base | fill primary-alpha-10 |
| neutral | filled | fill bg-strong-950, text text-white-0 | fill bg-surface-800 |
| neutral | stroke | fill bg-white-0, text sub-600, ring stroke-soft-200, shadow regular-xs | fill bg-weak-50, text strong-950, no shadow, ring transparent |
| neutral | lighter | fill bg-weak-50, text sub-600 | fill bg-white-0, text strong-950, shadow regular-xs, ring stroke-soft-200 |
| neutral | ghost | transparent, text sub-600 | fill bg-weak-50, text strong-950 |
| error | filled | fill error-base, text static-white | fill red-700 |
| error | stroke / lighter / ghost | as primary with `error-base` and `red-alpha-10` | as primary |

Other action components: **Fancy button** variants neutral | primary | destructive | basic x sizes medium 40/px14/r10, small 36/px12/r8, xsmall 32/px10/r8 (gap 12; depth shadows `fancy-buttons-*`; disabled = flat `bg-weak-50`). **Link button** gray | black | primary | error (+ modifiable) x medium (h20, label-sm, icon 20) | small (h16, label-xs, icon 16); underline offset 3 px, hidden until hover unless `underline`. **Compact button** stroke | ghost | white (+ modifiable) x large (24 px box, icon 20) | medium (20 px box, icon 18) x radius md | full; focus inverts to `bg-strong-950` fill. **Button group** items small 36/px16, xsmall 32/px14, xxsmall 24/px12 (`label-xs`), overlap -1.5 px, end radii lg or md. **Social button** 7 brands x filled | stroke, h40, px16, gap14, r10.

**Input** (sizes medium | small | xsmall; text `paragraph-sm`; icon 20; `hasError`).

| size | height | radius | wrapper padding-x | gap | affix padding-x |
|---|---|---|---|---|---|
| medium | 40 | 10 | 12 | 8 | 12 |
| small | 36 | 8 | 10 | 8 | 10 |
| xsmall | 32 | 8 | 8 | 6 | 10 |

States: default = fill bg-white-0, shadow regular-xs, 1 px inset ring stroke-soft-200 (drawn by a pseudo-element so the ring sits above children); hover = wrapper fill bg-weak-50 (only when not focused), shadow none, ring transparent when the input is the only child; focus = shadow button-important-focus + ring stroke-strong-950; error = ring error-base, focus shadow button-error-focus; disabled = fill bg-weak-50, text-disabled-300, ring transparent, no shadow. Placeholder `text-soft-400` rises to `text-sub-600` on hover/focus; the icon follows the placeholder state. **Textarea**: min-height 112, radius 12, padding 12 x 10, same state set, counter `subheading-2xs`. **Select**: same 3 sizes, heights and radii as input (padding-left 12/10/8, right 10/8/6); variants default | compact | compactForInput | inline; list container radius 16, padding 8, shadow regular-md, ring stroke-soft-200, max-height 196; item radius 8, padding 8, right padding 36, `paragraph-sm`, gap 8 (6 at xsmall); chevron rotates 180 when open.

**Selection controls.** Checkbox 20 px box (16 px rounded square, rx 4; check stroke 1.5), radio 20 px (circle r8, inner dot r6.5 with drop), switch 32 x 20 (track 28 x 16, thumb 12, travels 12; pressed thumb scale .833; disabled shows hollow track + 10 px thumb). States for checkbox/radio: unchecked default `bg-soft-200`, hover `bg-sub-300`, focus `primary-base`; checked/indeterminate `primary-base`, hover `primary-darker`, focus `primary-dark`; disabled = `bg-soft-200` in all.

**Badge** (pill; `variant` x `color` x `size`; extras `square`, `disabled`). Sizes: small h16, px8, gap6, `subheading-2xs` uppercase, icon 12; medium h20, px8, gap6, `label-xs`, icon 16. Variants: filled = fill `{family}-base` + static-white text; light = fill `{family}-light`, text `{family}-dark`; lighter = fill `{family}-lighter`, text `{family}-base`; stroke = 1 px ring in current colour, text `{family}-base`. Colours (10): gray->faded, blue->information, orange->warning, red->error, green->success, yellow->away, purple->feature, sky->verified, pink->highlighted, teal->stable. Base grid = 4 x 10 x 2 = 80 cells.
**Tag**: h24, px8, gap8, radius 6, `label-xs`, variants stroke | gray (+ disabled), dismiss button 16 px with -6/-4 margins. **Status badge**: h24, px8, radius 6, `label-xs`; variant stroke | light x status completed->success, pending->warning, failed->error, disabled->faded; icon 16 or dot (6 px in 16 box). **Kbd**: h20, px6, radius 4, `subheading-xs`, ring stroke-soft-200.

**Tooltip**: size x variant.

| size | radius | padding | text |
|---|---|---|---|
| xsmall | 4 | 6 x 2 | paragraph-xs |
| small | 6 | 10 x 4 | paragraph-sm |
| medium | 12 | 12 | label-sm |

variant dark = fill bg-strong-950, text text-white-0; light = fill bg-white-0, text strong-950, ring stroke-soft-200; shadow `tooltip`; arrow always rendered.

**Overlays**: Modal max-w 400, radius 20, shadow regular-md; header padding 16 x 20 (right 56 for close), gap 14, 40 px circular icon with ring, bottom hairline; body padding 20; footer padding 20 x 16, top hairline; scrim `overlay` + blur 10 px; z 50; zoom-fade 95 -> 100. Drawer max-w 400, header/footer padding 20. Dropdown menu: width 300, radius 16, padding 8, gap 4, shadow regular-md, ring stroke-soft-200; item radius 8, padding 8, `paragraph-sm`, gap 8, icon 20; group label `subheading-xs` uppercase `text-soft-400`; highlighted fill `bg-weak-50`. Popover: radius 16, padding 20, shadow regular-md, arrow 11 px. Command menu: composes modal.

**Navigation and layout**: Tab menu (horizontal) bar 48 high, gap 24, hairline top and bottom, label `label-sm`, active text strong + 2 px `primary-base` underline that slides (300 ms, cubic-bezier .65,0,.35,1) and scrolls the active tab into view. Segmented control: container radius 10, padding 4, fill `bg-weak-50`; item height 28, radius 6, `label-sm`; thumb fill `bg-white-0` + shadow toggle-switch. Pagination: items 32 x min 32, radius 8 (rounded: full; group: 40 wide, divided by hairlines); gap 8. Accordion item radius 10, padding 14, ring stroke-soft-200; hover/open fill `bg-weak-50`, ring transparent; chevron 20. Breadcrumb, steppers (dot, horizontal, vertical) share `label-sm` and 20 px icons. Divider: 6 variants line | line-spacing | line-text | content | text | solid-text, hairline `stroke-soft-200`.

**Data display**: Table head fill `bg-weak-50`, padding 12 x 8, `paragraph-sm`, text sub-600, end radius 8; body cell height 64, padding-x 12, end radius 12; row hover fill `bg-weak-50`; 8 px gap between head and body; rows separated by divider rows. Avatar sizes 80, 72, 64, 56, 48, 40, 32, 24, 20 with text title-h5 (80-64), label-lg (56-48), label-md (40), label-sm (32), label-xs (24-20); colours gray, yellow, blue, sky, purple, red (fill `*-200`, text `*-950`); status dot 12 px with 4 px border in the page colour (online=success, offline=faded, busy=error, away=away). Progress bar track 6 px, full radius, fill 300 ms, colours blue | red | orange | green. Progress circle sizes 48-80 with label-xs or label-sm. Slider track 6 px, thumb 16 px (6 px core + 5 px white border), range `primary-base`.

**Feedback**: Alert = `variant` (filled | light | lighter | stroke) x `status` (error, warning, success, information, feature) x `size`.

| size | radius | padding | text | icon |
|---|---|---|---|---|
| xsmall | 8 | 8 | paragraph-xs | 16 |
| small | 8 | 10 x 8 | paragraph-sm | 20 |
| large | 12 | 14, bottom 16 | paragraph-sm | 20 |

filled = fill `{status}-base` + white text; light = `{status}-light`; lighter = `{status}-lighter`; stroke = white fill, ring stroke-soft-200, shadow regular-md. Toast/notification reuse Alert; viewport max-width 438, padding 16 (24 from sm), z 100, swipe to dismiss.

**Form helpers**: Label `label-sm`, asterisk in `primary-base`, sub-label `paragraph-sm` sub-600; Hint `paragraph-xs` text sub-600 with 16 px icon, error state turns text and icon `error-base`; Digit input has error and disabled; File upload, Color picker, Datepicker are compositions.

Counts [S]: 51 component files in the starter (49 documented component pages), 22 type styles, 17 shadows, 2 added radii, 177 raw colour variables, 73 role variables, 65 dark overrides.

### 3.9 The marketing layer (`ln-` prefix) measured on alignui.com [S from compiled CSS, M from render]

Tokens: grey ramp `0 #ffffff, 25 #f7f7f7, 50 #f2f2f2, 100 #ebebeb, 200 #e0e0e0, 300 #cccccc, 400 #b8b8b8, 450 #a3a3a3, 500 #8f8f8f, 600 #707070, 700 #525252, 800 #3d3d3d, 900 #2e2e2e, 925 #262626, 950 #1c1c1c`; accent orange `#f05023`; type `ln-title-h4/h5/h6, ln-label-lg..xs, ln-paragraph-lg..xs, ln-subheading-xs (11/10, 550), ln-special-13-desc, ln-docs-sm` (weight 550 for titles, tracking -2%); shadows `ln-xs, ln-button-white, ln-button-gray, ln-button-orange, ln-badge-gray, ln-badge-orange, ln-branding-neutral, ln-subheading, ln-toggle-active, ln-customization-button` and 10 `ln-special-{light,dark}-{ai,crypto,finance,hr,marketing,default}` (sector colours: green `#10934e`, red `#e33145`, blue `#1444ff`, violet `#6836f2`, orange `#e6560f`).

Measured, home page [M]:

| thing | 1440 | 390 |
|---|---|---|
| h1 | 80/88, weight 550, tracking -2.8px (-3.5%), Inter var, `#2e2e2e` | 34/40, -0.748px |
| h2 | 48/56, 550, -1.344px (-2.8%) | 28/36, -0.56px |
| hero sub | 18/28, 400, `#525252` | 16/24 |
| small copy | 14/20 (500 for labels, 400/22 in docs) | 12/18 |
| page background | `#f7f7f7` (ln-gray-25), cards white | same |
| top nav | floating white pill 950 x 72, radius 24, padding 18, layered ring+shadow stack | bar 64 high, full width |
| primary CTA | dark `#2e2e2e` pill-rect, 14/20/500, ring 1 px `#0f0f0f`, 4-layer shadow + inset highlight, radius 9-13 | 196 x 44, radius 13, padding 18, gap 14 |
| radii in use | 14 values: 5, 7, 9, 10, 11, 12, 13, 15, 16, 20, 24, 26, 28, full (concentric pairs differ by 4) | 8 values |
| spacing values (most common) | 8, 4, 12, 6, 16, 24, 5, 10, 14, 20 | 8, 12, 6, 16, 4, 24 |
| fonts | Inter (variable) + Geist Mono (code, ruler numerals) | same |
| type tuples | 23 distinct size/line-height/weight/tracking tuples on 12 sizes (11, 12, 13, 14, 16, 18, 20, 28, 32, 40, 48, 80); page height 10,522 px | 16 tuples on 9 sizes; page height 9,200 px |

Docs page (button) [M]: h1 32/40/550/-2.8%; h2 24/32/-2%; h3 16/24/500; body 14/22/400 (806 text nodes); eyebrow/breadcrumb orange `#f05023` 14/20/500. The rendered default Button preview measures 71 x 40, radius 10, padding-x 14, gap 12, fill `#335cff`, 14/20/500: exactly the [S] spec, i.e. code and render match to the pixel.

Our checker on `https://alignui.com` (`node tools/check.mjs https://alignui.com --name alignui-benchmark`, 2026-10-08): **6 fail, 16 warn, 23 pass**.
- FAIL: min text size (11 px labels and decorative ruler numerals: 10 nodes on desktop and mobile); colour contrast (514 desktop nodes flagged, mostly the decorative ruler at 1.5:1; real ones include `v1.2` 4.42:1 and grey sub-copy 4.15-4.2:1); axe serious x4 (button-name, color-contrast, link-name, scrollable-region-focusable) on both viewports.
- WARN: line-height of 14/20 h3 (1.43) vs heading <= 1.3; target size (20 px tall small controls, 24 px icon buttons); spacing on 4 px grid 0.65 desktop / 0.73 mobile (off-grid 6/3/5/2/10/14/18: the 2 px sub-grid); radius count 14 desktop / 8 mobile vs limit 5; heading order; banned phrases `seamless`, `elevate your`; fonts Inter + Geist Mono flagged as default-only; mobile body 14 px.
- PASS: no overflow, one h1, page meta, no image without alt, no pill-nav (it is a rounded bar), no purple-blue gradient, no glow shadows; 12 type sizes on desktop (limit 12), fonts <= 3.
- Reading: the checker measures AlignUI as a craft benchmark and finds it strict on a11y numbers it does not guarantee, and strict on a 4 px grid it deliberately sub-divides. See ALM-09 in the method note for the threshold change this implies.

## 4. Dos and Don'ts

- **Do** (AlignUI Button, docs page): a filled primary button 40 px high, 14 px side padding, 12 px gap, radius 10, label 14/20/500; hover is one shade darker; focus adds a 2 px white gap and a 2 px halo. **Why good**: every number is a token; each state changes exactly one channel.
- **Don't** (what AlignUI itself shows): filled badges with white text on green/orange/yellow/teal/sky fills measure 2.36 / 2.79 / 1.82 / 1.89 / 2.01 : 1 (white on blue 5.1, purple 4.79, red 3.66, pink 3.16). **Why bad**: consistency does not imply legibility; the engine must apply a contrast gate the kit lacks.
- **Do** put the field border at `stroke-soft-200` and the focus ring at `stroke-strong-950` on the same element: the focus change is a jump from a hairline to near-black, unmistakable.
- **Don't** copy `stroke-soft-200` as the only boundary of an input: 1.19:1 against white, below the 3:1 non-text guidance for form-control boundaries; pair with the `regular-xs` shadow and fill change or darken to `stroke-sub-300` (1.53:1 still low).
- **Do** keep the brand layer thin (alignui.com marketing: about 15 grey steps, 1 accent, 8 type styles, 20 shadows) on the same variant/size/state grammar.
- **Don't** let a "marketing page" improvise a fresh scale per section; AlignUI's marketing page uses 23 type tuples and 12 sizes across a 10,500 px page, so even the bar is looser than its component layer.

## 5. Exceptions & judgement calls

- `[engine note]` The kit is **neutral by construction** (Inter, blue #335cff, grey neutral, 10 px radius, soft ring+shadow). That is right for a UI kit sold to everyone and wrong as a visual direction for our clients. Copy the grammar, not the values.
- `[engine note]` Half-step spacing (6, 10, 14) is a real part of the system. Our checker's 4 px grid threshold (0.8) marks it as a warning; treat 2 px multiples inside component internals as legitimate and keep 4 px for layout gaps and section padding.
- `[engine note]` 11 px uppercase `subheading-2xs` and 12 px labels violate our "no text < 12 px" gate; the kit uses them for small badges and eyebrows. Allow only for uppercase caps labels with tracking >= +2% and contrast >= 4.5:1, otherwise raise to 12.
- `[engine note]` Weight 550 on the marketing site and 500 in the kit: the brand layer shifts weight half a step, consistent with Inter's variable axis.
- Alert `status="feature"` maps to the faded (grey) tone in its compound table, while Badge `purple` maps to `feature`: a small inconsistency inside the source; verify before relying on it.
- No `active/pressed` style on buttons (only on switch and steppers), no loading state, no skeleton, no empty state in the base components (Figma sells illustrated empty states in the sector kits). Add them in our spec.
- Components are intrinsic-width: only 9 `sm:` breakpoint utilities in all components. Responsive behaviour lives in page layouts (not specified).

## 6. Figures worth keeping

Screens in `knowledge/benchmarks/alignui-shots/` (1440 unless noted):
- `home-1440.png`, `home-390.png`: marketing home; floating bar, grey `#f7f7f7` canvas, ruler decorations, single dark CTA, 80/88 display type.
- `docs-button-1440.png`: docs anatomy (sidebar groups, preview/code tabs, install steps, "On this page" listing each axis as an example).
- `docs-typography-1440.png`, `docs-color-1440.png`: the type table and colour swatch pages (token name + var + hex per row).
- `docs-input-390.png`: docs at 390.
- `pro-1440.png`, `figma-1440.png`: PRO and Figma marketing (component mosaics).
Checker output: `reports/alignui-benchmark/` (gitignored).

## 7. Open questions

- PRO blocks and the Figma file are paywalled: their variable collections (the vendor claims 400+ styles/variables/tokens, 8000+ components and variants, 20+ text styles, 10+ shadow styles, 4 layout grid styles, 10 neutral + 8 vibrant colours) were not inspected; the 22 text styles and 17 shadows seen in code match the order of those claims.
- Whether docs v1.2 component code differs from the Feb-2025 starter beyond the utils (Tailwind v4 `@theme` via the CLI): the button/typography/colour values compared equal.
- `changelog` URL returned 404 on alignui.com (the changelog link in the footer targets the Figma product); no version history was read.
- Radix primitives are the behaviour layer (accessibility of menus/dialogs comes from there); AlignUI's own keyboard/ARIA test status is not published.
- The `--font-sans` variable reads empty on the live page (fonts are injected as `--font-inter`/`--font-inter-var`); the documented starter uses `--font-sans`. Cosmetic.
