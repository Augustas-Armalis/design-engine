---
source: web:https://daisyui.com ; https://unpkg.com/daisyui@5.7.47/theme/object.js ; https://unpkg.com/daisyui@5.7.47/components/*.css
chapter: daisyUI 5 system profile and 35 named themes
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, theming, oklch, radius, density, depth, noise, personality, tailwind-v4]
status: studied
---

# daisyUI 5

Machine profile: `system/systems-research/daisyui-v5.json` (every theme's full palette and knobs under `color.themes`). Raw fetches: `corpus/web/systems/daisyui-v5/` (themes.json, button.css, properties.css). Licence: MIT.

## 1. Core ideas

1. **A theme is ~35 variables.** Base (base-100/200/300 + base-content), brand (primary, secondary, accent, neutral, each + `-content`), status (info, success, warning, error + `-content`), and 8 knobs: `--radius-selector`, `--radius-field`, `--radius-box`, `--size-selector`, `--size-field`, `--border`, `--depth`, `--noise`.
2. **Radius by object class.** selector = checkbox/toggle/badge, field = button/input/select/tab, box = card/modal/alert. Three numbers set the shape personality.
3. **Depth and noise are 0/1 multipliers.** Button shadow = `0 3px 2px -2px color-mix(btn-bg depth*30%)...`, inset highlight `white depth*6%`, text-shadow `white depth*15%`; noise scales an SVG fractal texture `background-size: noise*100%`. One switch changes material from flat to tactile.
4. **Density is one unit.** Control height = `--size-field` x 6/8/10/12/14 (xs..xl) = 24/32/40/48/56px at the shipped 0.25rem. Font sizes 11/12/14/18/22px per size.
5. **Variants are recipes over one colour.** `--btn-color` feeds solid, soft (8% tint into base-100, border 10%), outline, dash (dashed border), ghost, link. Press = darker mix (5% black) + translate 0 .5px.
6. **Dark is just a theme** (`color-scheme: dark`); one theme can be flagged prefersdark.
7. **35 themes = 35 personalities**, built mostly from palette + 3 radii + border width + depth. See table.
8. **61 CSS components, no JS** (modal uses `<dialog>`; dropdown uses popover/details).

## 2. Rules

- **RULE** Define corner radius by object class with three tokens (selector, field, box) rather than one radius or a size ladder.
  **Why** Personality lives in the relationship: pill fields + 1rem boxes read playful; 0 selectors + 4px fields read corporate; all-zero reads brutal.
  **Applies to** all. **Check** components read only `--radius-selector|field|box`. **Source** theme/object.js

- **RULE** Express material (flat vs tactile) as a 0/1 `--depth` multiplier inside shadow, highlight and border-darkening formulas.
  **Why** A single switch moves the whole UI between flat and dimensional consistently; no per-component shadow edits.
  **Applies to** all. **Check** shadows reference `calc(var(--depth) * N%)`. **Source** components/button.css

- **RULE** Set global density with one size unit and integer multipliers (6/8/10/12/14) for control heights.
  **Why** Every control scales together and stays on the 4px grid.
  **Applies to** SaaS app UI, forms. **Check** control heights are multiples of the unit. **Source** components/button.css, input.css

- **RULE** Derive soft, hover, pressed and border variants from one colour with `color-mix(in oklab, ...)` (soft = 8% into base, border = 10%, pressed = 5% black).
  **Why** Variants stay in hue and update automatically with the theme.
  **Applies to** all. **Check** variant colours are color-mix expressions of the role colour. **Source** components/button.css

- **RULE** Every role colour ships with an explicit `-content` colour, and you verify its contrast per theme rather than trusting it.
  **Why** daisyUI pairs are hand-authored; pastel themes put light primaries on light bases.
  **Applies to** all. **Check** contrast(primary, primary-content) >= 4.5 and contrast(base-100, base-content) >= 7 for body. **Source** theme/object.js

- **RULE** Do not ship a daisyUI named theme unmodified on a client marketing site; change at least the primary hue and one radius.
  **Why** The named themes (cupcake, synthwave, dracula, corporate) are widely recognised and signal "template".
  **Applies to** landing page. **Check** theme variables differ from any object.js theme in >= 2 knobs. **Source** [engine note]

## 3. Numbers & scales

Defaults (theme `light`): base-100 oklch(100% 0 0), base-200 oklch(98% 0 0), base-300 oklch(95% 0 0), primary oklch(45% .24 277.0), secondary oklch(65% .241 354.3), accent oklch(77% .152 181.9), neutral oklch(14% .005 285.8); radii selector 0.5rem, field 0.25rem, box 0.5rem; border 1px; depth 1; noise 0.

| Size | height | font | btn padding-x |
|---|---|---|---|
| xs | 24 | 11px | 8px |
| sm | 32 | 12px | 12px |
| md | 40 | 14px | 16px |
| lg | 48 | 18px | 20px |
| xl | 56 | 22px | 24px |

Motion: .btn transitions colour/bg/border/shadow/transform 200ms cubic-bezier(0,0,.2,1); modal backdrop 300ms ease-out; modal box from translate 0 2% scale .98; card outline 200ms ease-in-out. Card padding xs 8, sm 16, md 24px.

### The 35 themes (palette in OKLCH; r = selector/field/box; b = border; d = depth; n = noise)

| theme | scheme | base-100 | base-content | primary | secondary | accent | neutral | r | b | d | n | reading |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| synthwave | dark | 15% 0.09 281.288 | 78% 0.115 274.713 | 71% 0.202 349.761 | 82% 0.111 230.318 | 75% 0.183 55.934 | 45% 0.24 277.023 | 1rem/0.5rem/1rem | 1px | 0 | 0 | deep violet base, hot pink + cyan, 80s neon |
| sunset | dark | 22% 0.019 237.69 | 77.383% 0.043 245.096 | 74.703% 0.158 39.947 | 72.537% 0.177 2.72 | 71.294% 0.166 299.844 | 26% 0.019 237.69 | 1rem/0.5rem/1rem | 1px | 0 | 0 | dark blue-grey, orange/pink/violet, warm dusk |
| dracula | dark | 28.822% 0.022 277.508 | 97.747% 0.007 106.545 | 75.461% 0.183 346.812 | 74.202% 0.148 301.883 | 83.392% 0.124 66.558 | 39.445% 0.032 275.524 | 1rem/0.5rem/1rem | 1px | 0 | 0 | Dracula editor palette: grey-violet base, pink/purple |
| caramellatte | light | 98% 0.016 73.684 | 40% 0.123 38.172 | 0% 0 0 | 22.45% 0.075 37.85 | 46.44% 0.111 37.85 | 55% 0.195 38.402 | 2rem/0.5rem/1rem | 2px | 1 | 1 | cream base, black primary, brown accent, 2px borders + noise, tactile cafe |
| fantasy | light | 100% 0 0 | 27.807% 0.029 256.847 | 37.45% 0.189 325.02 | 53.92% 0.162 241.36 | 75.98% 0.204 56.72 | 27.807% 0.029 256.847 | 1rem/0.5rem/1rem | 1px | 1 | 0 | white, deep magenta primary, storybook |
| lemonade | light | 98.71% 0.02 123.72 | 19.742% 0.004 123.72 | 58.92% 0.199 134.6 | 77.75% 0.196 111.09 | 85.39% 0.201 100.73 | 30.98% 0.075 108.6 | 1rem/0.5rem/1rem | 1px | 0 | 0 | lime/yellow greens, fresh |
| business | dark | 24.353% 0 0 | 84.87% 0 0 | 41.703% 0.099 251.473 | 64.092% 0.027 229.389 | 67.271% 0.167 35.791 | 27.441% 0.013 253.041 | 0rem/0.25rem/0.25rem | 1px | 0 | 0 | dark grey base, navy primary, orange accent, small radii, serious |
| black | dark | 0% 0 0 | 87.609% 0 0 | 35% 0 0 | 35% 0 0 | 35% 0 0 | 35% 0 0 | 0rem/0rem/0rem | 1px | 0 | 0 | pure black, greys only, 0 radius, brutal |
| night | dark | 20.768% 0.039 265.754 | 84.153% 0.007 265.754 | 75.351% 0.138 232.661 | 68.011% 0.158 276.934 | 72.36% 0.176 350.048 | 27.949% 0.036 260.03 | 1rem/0.5rem/1rem | 1px | 0 | 0 | dark navy, sky-blue primary, developer-dark |
| wireframe | light | 100% 0 0 | 20% 0 0 | 87% 0 0 | 87% 0 0 | 87% 0 0 | 87% 0 0 | 0rem/0.25rem/0.25rem | 1px | 0 | 0 | greyscale placeholders, 0 selectors, prototype look |
| bumblebee | light | 100% 0 0 | 20% 0 0 | 85% 0.199 91.936 | 75% 0.183 55.934 | 0% 0 0 | 37% 0.01 67.558 | 1rem/0.5rem/1rem | 1px | 1 | 0 | yellow primary, black accent, cheerful and loud |
| cmyk | light | 100% 0 0 | 20% 0 0 | 71.772% 0.133 239.443 | 64.476% 0.202 359.339 | 94.228% 0.189 105.306 | 21.778% 0 0 | 1rem/0.5rem/1rem | 1px | 0 | 0 | print primaries: cyan, magenta, yellow, black neutral |
| pastel | light | 100% 0 0 | 20% 0 0 | 90% 0.063 306.703 | 89% 0.058 10.001 | 90% 0.093 164.15 | 55% 0.046 257.417 | 1rem/2rem/1rem | 2px | 0 | 0 | white base, lilac/pink/mint pastels, pill fields, 2px borders |
| abyss | dark | 20% 0.08 209 | 90% 0.076 70.697 | 92% 0.2653 125 | 83.27% 0.0764 298.3 | 43% 0 0 | 30% 0.08 209 | 2rem/0.25rem/0.5rem | 1px | 1 | 0 | deep teal-navy, neon lime primary, 2rem selectors, deep-sea |
| forest | dark | 20.84% 0.008 17.911 | 83.768% 0.001 17.911 | 68.628% 0.185 148.958 | 69.776% 0.135 168.327 | 70.628% 0.119 185.713 | 30.698% 0.039 171.364 | 1rem/2rem/1rem | 1px | 0 | 0 | near-black base, green primaries, pill fields, outdoorsy |
| nord | light | 95.127% 0.007 260.731 | 32.437% 0.022 264.182 | 59.435% 0.077 254.027 | 69.651% 0.059 248.687 | 77.464% 0.062 217.469 | 45.229% 0.035 264.131 | 1rem/0.25rem/0.5rem | 1px | 0 | 0 | Nord palette: icy greys and muted blues, calm |
| cupcake | light | 97.788% 0.004 56.375 | 23.574% 0.066 313.189 | 85% 0.138 181.071 | 89% 0.061 343.231 | 90% 0.076 70.697 | 27% 0.006 286.033 | 1rem/2rem/1rem | 2px | 1 | 0 | pastel teal + pink, pill fields, 2px borders, soft and friendly |
| emerald | light | 100% 0 0 | 35.519% 0.032 262.988 | 76.662% 0.135 153.45 | 61.302% 0.202 261.294 | 72.772% 0.149 33.2 | 35.519% 0.032 262.988 | 1rem/0.5rem/1rem | 1px | 0 | 0 | green primary, blue secondary, clean product-marketing |
| valentine | light | 97% 0.014 343.198 | 52% 0.223 3.958 | 65% 0.241 354.308 | 62% 0.265 303.9 | 82% 0.111 230.318 | 40% 0.153 2.432 | 1rem/2rem/1rem | 1px | 0 | 0 | pink-tinted base, pink/purple, pill fields, romantic |
| corporate | light | 100% 0 0 | 22.389% 0.031 278.072 | 58% 0.158 241.966 | 55% 0.046 257.417 | 60% 0.118 184.704 | 0% 0 0 | 0.25rem/0.25rem/0.25rem | 1px | 0 | 0 | sky-blue primary, black neutral, 4px radii everywhere, sober |
| cyberpunk | light | 94.51% 0.179 104.32 | 0% 0 0 | 74.22% 0.209 6.35 | 83.33% 0.184 204.72 | 71.86% 0.217 310.43 | 23.04% 0.065 269.31 | 0rem/0rem/0rem | 1px | 0 | 0 | acid-yellow base, hot pink, 0 radius, aggressive |
| lofi | light | 100% 0 0 | 0% 0 0 | 15.906% 0 0 | 21.455% 0.001 17.278 | 26.861% 0 0 | 0% 0 0 | 2rem/0.25rem/0.5rem | 1px | 0 | 0 | pure monochrome, black on white, 2rem selectors, minimal |
| garden | light | 92.951% 0.002 17.197 | 16.961% 0.001 17.32 | 62.45% 0.278 3.836 | 48.495% 0.11 355.095 | 56.273% 0.054 154.39 | 24.155% 0.049 89.07 | 1rem/0.5rem/1rem | 1px | 0 | 0 | light grey base, hot pink primary, botanical |
| acid | light | 98% 0 0 | 0% 0 0 | 71.9% 0.357 330.759 | 73.37% 0.224 48.25 | 92.78% 0.264 122.962 | 21.31% 0.128 278.68 | 1rem/1rem/1rem | 1px | 1 | 0 | near-white base, magenta/orange/lime at max chroma, 1rem everything, rave |
| aqua | dark | 37% 0.146 265.522 | 90% 0.058 230.902 | 85.661% 0.144 198.645 | 60.682% 0.108 309.782 | 93.426% 0.102 94.555 | 27% 0.146 265.522 | 1rem/0.5rem/1rem | 1px | 1 | 0 | navy base, aqua primary, playful dark |
| dim | dark | 30.857% 0.023 264.149 | 82.901% 0.031 222.959 | 86.133% 0.141 139.549 | 73.375% 0.165 35.353 | 74.229% 0.133 311.379 | 24.731% 0.02 264.094 | 1rem/0.5rem/1rem | 1px | 0 | 0 | mid-grey dark, mint primary, low-glare dark |
| luxury | dark | 14.076% 0.004 285.822 | 75.687% 0.123 76.89 | 100% 0 0 | 27.581% 0.064 261.069 | 36.674% 0.051 338.825 | 24.27% 0.057 59.825 | 1rem/0.5rem/1rem | 1px | 1 | 0 | near-black, white primary, gold-brown neutral, premium |
| winter | light | 100% 0 0 | 41.886% 0.053 255.824 | 56.86% 0.255 257.57 | 42.551% 0.161 282.339 | 59.939% 0.191 335.171 | 19.616% 0.063 257.651 | 1rem/0.5rem/1rem | 1px | 0 | 0 | white, saturated blue primary, crisp |
| halloween | dark | 21% 0.006 56.043 | 84.955% 0 0 | 77.48% 0.204 60.62 | 45.98% 0.248 305.03 | 64.8% 0.223 136.073 | 24.371% 0.046 65.681 | 1rem/0.5rem/1rem | 1px | 1 | 0 | near-black base, orange primary, purple secondary, seasonal |
| coffee | dark | 24% 0.023 329.708 | 72.354% 0.092 79.129 | 71.996% 0.123 62.756 | 34.465% 0.029 199.194 | 42.621% 0.074 224.389 | 16.51% 0.015 326.261 | 1rem/0.5rem/1rem | 1px | 0 | 0 | dark plum-brown base, caramel primary, cosy |
| autumn | light | 95.814% 0 0 | 19.162% 0 0 | 40.723% 0.161 17.53 | 61.676% 0.169 23.865 | 73.425% 0.094 60.729 | 54.367% 0.037 51.902 | 1rem/0.5rem/1rem | 1px | 1 | 0 | warm grey base, brick red primary, earthy |
| dark | dark | 25.33% 0.016 252.42 | 97.807% 0.029 256.847 | 58% 0.233 277.117 | 65% 0.241 354.308 | 77% 0.152 181.912 | 14% 0.005 285.823 | 0.5rem/0.25rem/0.5rem | 1px | 1 | 0 | default dark; slate-blue base, indigo/pink/teal |
| silk | light | 97% 0.0035 67.78 | 40% 0.0081 61.42 | 23.27% 0.0249 284.3 | 23.27% 0.0249 284.3 | 23.27% 0.0249 284.3 | 20% 0 0 | 2rem/0.5rem/1rem | 2px | 1 | 0 | warm off-white, near-black primary/secondary/accent, 2px borders, quiet luxury |
| light | light | 100% 0 0 | 21% 0.006 285.885 | 45% 0.24 277.023 | 65% 0.241 354.308 | 77% 0.152 181.912 | 14% 0.005 285.823 | 0.5rem/0.25rem/0.5rem | 1px | 1 | 0 | default light; indigo primary, pink secondary, teal accent |
| retro | light | 91.637% 0.034 90.515 | 41% 0.112 45.904 | 80% 0.114 19.571 | 92% 0.084 155.995 | 68% 0.162 75.834 | 44% 0.011 73.639 | 0.25rem/0.25rem/0.5rem | 1px | 0 | 0 | cream base, coral primary, small radii, vintage print |

### Theme personalities as knob patterns [engine note]

- **Pill + 2px border + depth 1** (cupcake, pastel): toy-like, friendly, consumer.
- **Zero radius** (black, cyberpunk; wireframe/business selectors): brutal or schematic.
- **4px everywhere** (corporate) or 0/4/4 (business): sober, enterprise.
- **2rem selector + small field** (lofi, abyss, silk, caramellatte): soft chips, crisp inputs; quietly premium when paired with monochrome (lofi, silk).
- **Noise on** (caramellatte only): tactile, paper/cafe.
- **Same-hue monochrome brand** (silk: primary = secondary = accent; black: all oklch 35% grey; wireframe: all 87% grey): identity from neutrals and shape only.
- **Max-chroma brand** (acid primary C .357, cyberpunk, synthwave): rave/neon; contrast risk.

## 4. Dos and Don'ts

- Do: switch whole looks with `data-theme`. Don't: hand-edit component CSS to change look; change knobs.
- Don't: rely on `-content` pairs in pastel themes for body text without checking AA.

## 5. Exceptions & judgement calls

- [engine note] daisyUI's per-theme personality descriptions in the JSON are the engine's reading of palette + knobs, not vendor copy.
- [engine note] The OKLCH values carry 3-decimal lightness (71.772%) in older themes and round values (e.g. 45%, 65%) in newer ones; older themes were converted from earlier hex/HSL palettes.

## 6. Figures worth keeping

- daisyui.com/theme-generator (not fetched): live knob editor; useful reference UI for an engine theme tool.

## 7. Open questions

- daisyUI docs claim counts of themes/components on the marketing site were not read; counts here come from the npm package (35 theme files, 61 component CSS files).
- Line-heights per size class not extracted.
