---
source: web:https://ui.shadcn.com/docs/theming ; https://ui.shadcn.com/docs/components-json ; https://ui.shadcn.com/r/colors/*.json ; https://ui.shadcn.com/r/styles/base-*/ ; https://ui.shadcn.com/docs/components/typography
chapter: shadcn/ui (new-york lineage, base-nova default, 2026 presets) design system profile
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, tokens, oklch, dark-mode, radius, tailwind-v4, registry, density]
status: studied
---

# shadcn/ui

Machine profile: `system/systems-research/shadcn-ui.json` (all 7 base colours, light + dark, every token). Raw fetches: `corpus/web/systems/shadcn-ui/` (gitignored). Licence: MIT.

## 1. Core ideas

1. **Distribution model, not a package.** You own copied source; tokens are CSS variables; CLI, registry, `components.json`, skills and MCP are first class. `style` (now `radix-nova` or `base-nova` etc.) cannot change after init; `baseColor` cannot either.
2. **Semantic surface/foreground pairs.** `primary` + `primary-foreground`; the `-foreground` suffix is dropped from the surface name only. Pairs: background, card, popover, primary, secondary, muted, accent; destructive stands alone; plus border, input, ring.
3. **Seven base colours:** neutral, stone, zinc, mauve, olive, mist, taupe, all authored in OKLCH. Neutral is chroma 0; others carry tiny chroma at a fixed hue per family (stone ~49-58, zinc ~286, mauve ~322-326, olive ~107, mist ~214-229, taupe ~17-68, warm).
4. **Default is near-monochrome.** primary = oklch(0.205 0 0) light / oklch(0.922 0 0) dark; the only chromatic defaults are five `chart-*` colours and destructive.
5. **Single radius token** `--radius: 0.625rem` with a derived ladder: sm 0.6x, md 0.8x, lg 1x, xl 1.4x, 2xl 1.8x, 3xl 2.2x, 4xl 2.6x.
6. **Dark mode via translucent whites:** `--border: oklch(1 0 0 / 10%)`, `--input: oklch(1 0 0 / 15%)`, so edges work over any surface.
7. **2026 style presets** (`base-` or `radix-` + nova, vega, maia, lyra, mira, luma) change radius and density through class strings only: vega rounded-md / h-9 default; nova rounded-lg / h-8; maia and luma rounded-4xl pills / h-9; lyra rounded-none / h-8; mira rounded-md / h-7 text-xs. A short preset code (e.g. `a2r6bw`) encodes theme + font choices; `shadcn apply <code> --only theme|font`.
8. **Focus/invalid recipe is universal:** `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`; invalid `border-destructive ring-3 ring-destructive/20` (dark /40).
9. **base-nova trades borders for rings:** cards, dialogs, popovers use `ring-1 ring-foreground/10`; overlay `bg-black/10 backdrop-blur-xs`; popup `duration-100` with `zoom-in-95` / `fade-in-0`.
10. **Typeset (2026):** one CSS file for rendered markdown driven by three controls (size, leading, flow), container-fitted and streaming-safe.

## 2. Rules

- **RULE** Name every colour token as a surface plus its readable foreground (`--primary` / `--primary-foreground`) and always apply them as a pair (`bg-primary text-primary-foreground`).
  **Why** The pair guarantees legible text on that surface and lets a theme change both with one edit.
  **Applies to** all
  **Check** every `bg-X` class has a matching `text-X-foreground` in the same element; lint tokens list for pairs.
  **Source** ui.shadcn.com/docs/theming (Token Convention)

- **RULE** Derive the radius ladder from one base token with fixed multipliers (0.6, 0.8, 1, 1.4, 1.8, 2.2, 2.6) and have components consume the ladder only.
  **Why** A single edit re-shapes the entire UI; hard-coded radii drift.
  **Applies to** all
  **Check** computed `border-radius` of all components belongs to {0.6,0.8,1,1.4,1.8,2.2,2.6} x --radius (or full).
  **Source** ui.shadcn.com/docs/theming (Radius Scale)

- **RULE** In dark mode make borders and input fills translucent white (10% and 15%) instead of opaque greys, and raise card/popover one lightness step above background (oklch 0.205 on 0.145).
  **Why** Alpha edges composite correctly on any surface and keep hairlines consistent across nested layers.
  **Applies to** SaaS app UI
  **Check** dark `--border` and `--input` have alpha < 1; card L > background L.
  **Source** ui.shadcn.com/r/colors/neutral.json

- **RULE** Use one focus recipe for all focusable controls: border changes to `ring` colour plus a 3px ring at 50% opacity; invalid uses the same shape in destructive at 20% (40% dark).
  **Why** Predictable focus/invalid affordance without per-component design; a visible non-colour-only change (width + border).
  **Applies to** forms | SaaS app UI
  **Check** tab to each control: computed `box-shadow` ring width 3px; `aria-invalid` toggles ring colour.
  **Source** r/styles/base-nova/button.json, input.json

- **RULE** Give every control a size ladder with equal-square icon siblings (nova: xs 24, sm 28, default 32, lg 36, icon 32, icon-xs 24, icon-sm 28, icon-lg 36) and drive density by choosing the style preset, not by per-instance padding.
  **Why** Alignment across rows is automatic; overriding padding breaks inner spacing (icon padding variants).
  **Applies to** forms | SaaS app UI
  **Check** Button/Input/Select heights equal for the same size tier.
  **Source** r/styles/base-nova/button.json ; base-vega/maia/lyra/mira button.json

- **RULE** Add new semantic tokens in three steps: define under `:root` and `.dark`, expose with `@theme inline { --color-X: var(--X) }`, and pair with `-foreground`.
  **Why** Keeps the contract (Tailwind utilities + dark override) intact for custom status colours (success, warning) the base set lacks.
  **Applies to** all
  **Check** every new `--X` has `.dark` value, `@theme inline` mapping and a foreground.
  **Source** ui.shadcn.com/docs/theming (Adding New Tokens)

- **RULE** Use `ring-1 ring-foreground/10` (not a hard border) for card/popover outlines and keep floating surfaces on `--popover`.
  **Why** Foreground-derived alpha adapts to every base colour and theme; separate popover token lets overlays differ from cards.
  **Applies to** SaaS app UI
  **Check** card computed box-shadow has 1px spread; popover uses popover bg token.
  **Source** r/styles/base-nova/card.json, dialog.json

- **RULE** Dialogs: max-width `calc(100% - 2rem)` on mobile, `sm:max-w-sm` default, p-4 with gap-4, footer bleeds to edges (`-mx-4 -mb-4 bg-muted/50 border-t`), duration 100ms zoom-in 95 + fade.
  **Why** Predictable mobile gutter, footer separation, fast enter.
  **Applies to** SaaS app UI | mobile
  **Check** dialog width at 375px = 343px; footer has muted bg and top border.
  **Source** r/styles/base-nova/dialog.json

- **RULE** Express typography with Tailwind steps and a short documented role list (h1 36/40 extrabold tracking-tight; h2 30/36 semibold; h3 24/32; h4 20/28; p 16/28; small 14/20 medium; muted 14 muted-foreground) and set rendered-markdown rhythm from three controls: size, leading, flow.
  **Why** A handful of roles beats a sprawling scale; rhythm controls keep prose consistent across blog, docs and chat.
  **Applies to** landing page | SaaS app UI
  **Check** heading/body computed sizes match the role list.
  **Source** ui.shadcn.com/docs/components/typography ; ui.shadcn.com/docs/typeset

## 3. Numbers & scales

| Item | Value |
|---|---|
| --radius default | 0.625rem (10px) |
| Base colours | neutral stone zinc mauve olive mist taupe |
| neutral light | bg oklch(1 0 0), fg oklch(0.145 0 0), primary oklch(0.205 0 0), secondary/muted/accent oklch(0.97 0 0), muted-fg oklch(0.556 0 0), border/input oklch(0.922 0 0), ring oklch(0.708 0 0), destructive oklch(0.577 0.245 27.325) |
| neutral dark | bg oklch(0.145 0 0), fg oklch(0.985 0 0), card/popover oklch(0.205 0 0), primary oklch(0.922 0 0), secondary/muted/accent oklch(0.269 0 0), muted-fg oklch(0.708 0 0), border oklch(1 0 0 / 10%), input oklch(1 0 0 / 15%), ring oklch(0.556 0 0), destructive oklch(0.704 0.191 22.216) |
| charts light | oklch(0.646 0.222 41.116) / (0.6 0.118 184.704) / (0.398 0.07 227.392) / (0.828 0.189 84.429) / (0.769 0.188 70.08) |
| charts dark | oklch(0.488 0.243 264.376) / (0.696 0.17 162.48) / (0.769 0.188 70.08) / (0.627 0.265 303.9) / (0.645 0.246 16.439) |
| sidebar widths | 16rem desktop, 18rem mobile, 3rem icon; cookie sidebar_state 7 days; shortcut b |
| sidebar tokens | sidebar, -foreground, -primary(+fg), -accent(+fg), -border, -ring (dark sidebar-primary oklch(0.488 0.243 264.376)) |
| Button heights | nova 24/28/32/36; vega 24/32/36/40; maia+luma 24/32/36/40; lyra 24/28/32/36; mira 20/24/28/32 |
| Badge | h-5 (20px), rounded-4xl, text-xs |
| Tabs list | h-8, p-[3px], rounded-lg |
| Dialog | p-4, gap-4, rounded-xl, max-w-sm |
| Card | rounded-xl, spacing 16px (sm 12px), ring-1 foreground/10 |
| Components in docs index | 59 listed; 63 `registry:ui` items |

## 4. Dos and Don'ts

- Do: `className="bg-primary text-primary-foreground"`. Don't: `bg-zinc-900 text-white` (breaks theming).
- Do: Button `variant="ghost"`/`outline`/`secondary`. Don't: `className="px-4 py-2"` on Button.
- Do: add `--warning`/`--warning-foreground` + dark + `@theme inline`. Don't: hard-code amber classes in components.

## 5. Exceptions & judgement calls

- `style` and `baseColor` are locked at init; changing the look later means presets or re-install.
- No success/warning/info tokens or primitive ramps ship; hover shades are done with /80 alpha or color-mix, which shifts on tinted surfaces.
- [engine note] The monochrome default is a feature for a library but a liability for a marketing site: bind a project to a brand-specific `primary`, one chart palette, and a style preset choice that fits the brand shape language (maia/luma pills for friendly, lyra square for technical, vega comfortable).

## 6. Figures worth keeping

None.

## 7. Open questions

- Preset code format and what vega/nova/etc. change beyond radius and height (fonts, icon library) not fully decoded.
- Old themes (zinc/slate/red/rose/orange/green/blue/yellow/violet colour themes, HSL era) not re-extracted; new docs only list 7 base colours.
- Motion tokens unspecified; `tw-animate-css` defaults assumed.
