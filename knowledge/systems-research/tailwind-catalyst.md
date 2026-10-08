---
source: web:https://catalyst.tailwindui.com/docs ; https://unpkg.com/tailwindcss@4.3.3/theme.css ; https://tailwindcss.com/plus
chapter: Tailwind CSS v4 default theme + Catalyst UI kit (Tailwind Plus) system profile
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, tailwind-v4, tokens, oklch, density, app-ui, focus, borders, catalyst]
status: studied
---

# Tailwind v4 default theme + Catalyst

Machine profile: `system/systems-research/tailwind-catalyst.json`. Raw fetches: `corpus/web/systems/tailwind-catalyst/` (theme.css from npm tailwindcss@4.3.3; rendered Catalyst docs HTML for button, input, badge, dialog, table, heading, text, dropdown, switch).

Licence: Tailwind CSS and its theme are MIT. Catalyst and Tailwind Plus are paid (Tailwind Plus $299 individual / $979 team one-time; Catalyst alone $149 per a checkout page in search results). The licence text is behind the Tailwind Plus login and was not read. Values below come from the public docs pages' rendered class strings; no Catalyst source was copied.

## 1. Core ideas

1. **The default theme is the design system.** Catalyst's docs say it "relies on the default spacing scale, color palette, shadow scale" and will not look right if those are heavily changed. There is no semantic token layer: components use `zinc-950/10`, `radius-lg`, `shadow-sm` directly.
2. **v4 theme is OKLCH and CSS-first.** `@theme default` declares every token as a CSS variable: 26 colour families x 11 steps in OKLCH, `--spacing: 0.25rem`, 13 text sizes with paired line-heights, 8 radii, 7 shadows + 3 inset shadows + drop and text shadows, 3 easings, blur and perspective scales.
3. **New neutrals in v4.x.** Besides slate/gray/zinc/neutral/stone, theme.css 4.3.3 ships taupe (hue ~43-67), mauve (~322-326), mist (~197-229) and olive (~107). They are near-greys with a fixed tint: the cheapest way to change temperature.
4. **Default font stack changed.** In 4.3.3 `--font-sans` starts `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto...` (not `ui-sans-serif, system-ui`). Catalyst replaces it with Inter + `cv11`.
5. **Two densities from one class string.** Catalyst controls are 16px text in a 44px box on small screens and 14px text in a 36px box from 640px, keeping a 24px line-height. Mobile inputs never trigger iOS zoom; desktop stays dense.
6. **Tactile controls from pseudo-elements, not gradients.** Solid button: the element's background is the border colour (a darker step at 80-90% alpha), `before:` carries the fill and `shadow-sm`, `after:` carries a 1px inner white 15% top highlight and the hover overlay. Radii of inner layers are `calc(var(--radius-lg) - 1px)`.
7. **Borders are alpha of the ink.** Inputs use `border-zinc-950/10`, hover `/20`; dark mode `white/10`, hover `white/20`. Disabled fill is `zinc-950/5`.
8. **Focus is keyboard-only and uniform.** `data-focus:outline-2 outline-offset-2 outline-blue-500`, and `focus:not-data-focus:outline-hidden` hides it for mouse users (Headless UI sets `data-focus` only for keyboard focus).
9. **Per-variant CSS variables.** `[--btn-bg:var(--color-amber-400)] [--btn-border:var(--color-amber-500)]/80 [--btn-icon:...]` let one structural class string carry 20+ colours. Contrast is solved per hue: amber-400 fill takes amber-950 text, not white.
10. **App-scale headings.** The page `Heading` is 24/32 semibold on mobile and 20/32 from 640px. Subheading 16/28 -> 14/24. Body text zinc-500 16/24 -> 14/24.

## 2. Rules

- **RULE** Size form controls at 44px tall with 16px text below 640px and 36px with 14px text from 640px, keeping line-height at 24px in both.
  **Why** 44px meets touch targets and 16px stops iOS focus zoom; dense desktop rows stay scannable; a fixed 24px line keeps vertical rhythm.
  **Applies to** SaaS app UI, forms, mobile. **Check** computed height of `button, input, select` at 375px = 44 and at 1280px = 36 (+-1). **Source** catalyst.tailwindui.com/docs/button, /docs/input (class strings)

- **RULE** Draw control and card borders as the foreground colour at 10% alpha (hover 20%), and in dark mode white at 10% (hover 20%), never as a fixed grey.
  **Why** Alpha borders keep the same perceived contrast on white, tinted and dark surfaces, so one rule covers every container.
  **Applies to** all. **Check** computed border-color of inputs/cards has alpha < 1. **Source** catalyst docs/input

- **RULE** Give every nested rounded layer a radius of outer radius minus the inset (Catalyst: `calc(var(--radius-lg) - 1px)` for 1px insets).
  **Why** Concentric corners look machined; equal radii on nested shapes look pinched at the corners.
  **Applies to** all. **Check** for element with border-radius R and child inset d, child radius = R - d. **Source** catalyst docs/button, /docs/input

- **RULE** Show the focus indicator only for keyboard focus: a 2px outline at 2px offset in one accent (Catalyst blue-500) on every interactive control.
  **Why** One consistent ring is learnable; hiding it for pointer clicks removes the main reason teams delete focus styles.
  **Applies to** all. **Check** keyboard-tab each control: outline-width 2px, outline-offset 2px, same colour across controls. **Source** catalyst docs/button, /docs/switch

- **RULE** Pair coloured fills with a dark shade of the same hue for text when the fill is light (amber-400 + amber-950, lime-300 + lime-950) instead of forcing white text.
  **Why** White on mid-light hues fails AA; same-hue dark text passes and keeps the colour feeling unified.
  **Applies to** all. **Check** contrast ratio of label vs fill >= 4.5. **Source** catalyst docs/button (solid colour reference)

- **RULE** In app UI keep page headings small (20-24px, weight 600) and let layout, not size, carry hierarchy.
  **Why** Large display headings waste vertical space in tools and compete with data.
  **Applies to** SaaS app UI. **Check** `h1` font-size <= 24px inside app shells. **Source** catalyst docs/heading
  (opinion: this is Catalyst's taste for app screens; marketing pages differ.)

- **RULE** When building on the Tailwind default theme, change at least the font family and the neutral family (e.g. zinc -> taupe/mauve/olive/mist) before shipping.
  **Why** System font stack + zinc/gray is the most common SaaS surface on the web; neutral tint and type are the two cheapest identity levers.
  **Applies to** landing page, SaaS app UI. **Check** `--font-sans` is not the default stack and neutrals are not zinc/gray/slate unless overridden in DIRECTION.md. **Source** [engine note] from theme.css 4.3.3 + knowledge/web/anti-ai-slop.md

- **RULE** Animate a toggle only when its state changes (`duration-0` at rest, 200ms on change), never on mount.
  **Why** Mount animations make settings pages flicker on load and misreport state.
  **Applies to** SaaS app UI, forms. **Check** switch has transition-duration 0 until a state change. **Source** catalyst docs/switch

## 3. Numbers & scales

Tailwind 4.3.3 theme.css (all exact):

| Token | Values |
|---|---|
| text size/line (px) | xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36, 4xl 36/40, 5xl 48/1, 6xl 60/1, 7xl 72/1, 8xl 96/1, 9xl 128/1 |
| tracking | tighter -0.05em, tight -0.025em, normal 0, wide 0.025em, wider 0.05em, widest 0.1em |
| leading | tight 1.25, snug 1.375, normal 1.5, relaxed 1.625, loose 2 |
| spacing | 0.25rem unit (4px) |
| radius | xs 2, sm 4, md 6, lg 8, xl 12, 2xl 16, 3xl 24, 4xl 32 px |
| shadow | 2xs `0 1px rgb(0 0 0/.05)`; xs `0 1px 2px 0 /.05`; sm `0 1px 3px 0 /.1, 0 1px 2px -1px /.1`; md `0 4px 6px -1px /.1, 0 2px 4px -2px /.1`; lg `0 10px 15px -3px /.1, 0 4px 6px -4px /.1`; xl `0 20px 25px -5px /.1, 0 8px 10px -6px /.1`; 2xl `0 25px 50px -12px /.25` |
| easing | in (0.4,0,1,1), out (0,0,0.2,1), in-out (0.4,0,0.2,1); default transition 150ms in-out |
| blur | xs 4, sm 8, md 12, lg 16, xl 24, 2xl 40, 3xl 64 px |
| breakpoints | sm 40rem, md 48rem, lg 64rem, xl 80rem, 2xl 96rem |
| containers | 3xs 16rem ... 7xl 80rem |
| zinc | 50 98.5% 0 / 100 96.7% .001 286 / 200 92% .004 / 300 87.1% .006 / 400 70.5% .015 / 500 55.2% .016 / 600 44.2% .017 / 700 37% .013 / 800 27.4% .006 / 900 21% .006 / 950 14.1% .005 (oklch L C H~286) |

Catalyst (from rendered classes):

| Element | Value |
|---|---|
| Button | text-base/6 -> sm:text-sm/6, semibold, padding (14-1)px x (10-1)px -> (12-1) x (6-1), rounded-lg; height 44 -> 36 |
| Button icon | 20px -> 16px (16x16 Heroicons solid); Navbar/Sidebar items 20x20 |
| Input | same paddings and heights as Button; placeholder zinc-500; invalid red-500 (dark red-600); disabled border zinc-950/20 |
| Switch | 24x40 -> 20x32, padding 3px, rounded-full |
| Dropdown/menu | rounded-xl, items in w-48 with p-1 |
| Dialog sizes | xs, sm, md, lg (default), xl, 2xl, 3xl, 4xl, 5xl (max-width) |
| Table props | bleed, dense, grid, striped |
| Badge colours | 18 (red..rose + zinc) |
| Disabled | opacity 50% |

## 4. Dos and Don'ts

- Do: one class string for 20+ button colours via `--btn-*` variables. Don't: write a separate class list per colour.
- Do: `items-baseline` on buttons so icon + label align to text baseline (Catalyst buttons use `items-baseline`, icon `self-center`). Don't: centre icons by eye with margins.
- Don't: use the dark/zinc default button colour as a brand primary on a marketing page; it reads as generic app chrome.

## 5. Exceptions & judgement calls

- [engine note] The 44->36px switch is right for app UI; for marketing CTAs 36px is too small on desktop. Use Catalyst density for product screens only.
- [engine note] No success/warning/info tokens means each team invents them; when using Catalyst-style UI in the engine, add a status set (see `coss-ui.md` for a good one).
- Catalyst's dialog radius is not visible in the fetched markup (dialogs render client-side); listed as rounded-2xl by convention only, unverified.

## 6. Figures worth keeping

- catalyst.tailwindui.com/docs/button "Solid color reference": shows adaptive dark/zinc, light, dark/white variants flipping per mode.

## 7. Open questions

- Tailwind Plus licence text (end-product and SaaS terms) not read: behind login. Do not copy Catalyst code into engine output until the founder confirms a licence.
- Catalyst motion values (it depends on the `motion` package) are not in public markup.
- theme.css 4.3.3's apple-first font stack vs 4.0's `ui-sans-serif, system-ui`: confirm in the Tailwind changelog before citing it as a deliberate change.
