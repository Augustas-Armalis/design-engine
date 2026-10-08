---
source: web:https://vercel.com/geist/introduction ; https://vercel.com/geist/colors ; https://vercel.com/geist/typography ; https://vercel.com/geist/materials ; https://vercel.com/geist/button ; https://github.com/vercel/geist-font ; site CSS chunks (vercel.com/vc-ap-b3331f/_next/static)
chapter: Vercel Geist (design system + Geist font family) profile
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [design-system, typography, tokens, dark-mode, elevation, materials, developer-tools]
status: studied
---

# Vercel Geist

Machine profile: `system/systems-research/vercel-geist.json` (30 typography classes, 8 colour ramps light + dark, shadows, materials, spacing). Raw fetches: `corpus/web/systems/vercel-geist/` (gitignored). Licence: Geist fonts SIL OFL 1.1 (vercel/geist-font, npm `geist` 1.7.2); design-system docs and tokens are public documentation only, not an open-source package.

## 1. Core ideas

1. **Ten-step colour ramps with fixed jobs:** 1-3 component backgrounds (default, hover, active), 4-6 borders (default, hover, active), 7-8 high-contrast backgrounds (default, hover), 9 secondary text and icons, 10 primary text and icons (CSS names 100-1000). Two page backgrounds: Background 1 (#fff / #0a0a0a, default) and Background 2 (#fafafa / #000, sparingly).
2. **Typography is a class API** (`text-heading-32`, `text-copy-14`, `text-label-13-mono`, `text-button-14`) that sets size, line-height, tracking and weight together, in four roles: Heading (page and section titles), Copy (multi-line, higher line-height), Label (single line, tall line-height to pair with icons), Button (only inside buttons).
3. **Tracking tightens with size:** headings use -0.06em from 40-72px, -0.04em at 24-32, -0.02em at 14-20; weight 600 throughout.
4. **A `<strong>` modifier rule:** inside headings it lowers weight to 500 and colour to gray-900 (Subtle); inside copy it raises to 550 and gray-1000 (Strong).
5. **Mono is a peer voice.** Each text role has mono siblings one step smaller (Label 13 Mono pairs with Label 14, Label 14 Mono pairs with text larger than 14, Copy 13 Mono for inline code).
6. **Materials bundle chrome:** fill + stroke + shadow + radius under role names (base, small, medium, large, tooltip, menu, modal, fullscreen). Don't stack two materials on one element; pick the lowest elevation that reads; confirm shadow separation in dark.
7. **Border = 1px alpha ring shadow + 1px background-200 halo** (`--ds-shadow-border`), e.g. `0 0 0 1px #00000014` light / `#ffffff25` dark.
8. **Grid as brand:** visible guide lines, cross markers, dashed grids and solid cells are called "a huge part of the new Vercel aesthetic".
9. **Docs include behavioural copy rules:** Title Case, Verb + Noun labels ("Deploy Project", not "Submit"), destructive actions pair 1:1 with their toast ("Delete Project" then "Project deleted"), aria-label names action + target ("Copy deployment URL").
10. **Geist family:** Geist Sans (Swiss-influenced, geometric, legibility), Geist Mono, Geist Pixel (display, five variants). Variable with weights Thin to UltraBlack and italics. Influences listed: Inter, Univers, SF Mono, SF Pro, Suisse International, ABC Diatype.

## 2. Rules

- **RULE** Build colour ramps as ten steps with fixed roles (1-3 component bg default/hover/active, 4-6 border default/hover/active, 7-8 solid bg and hover, 9 secondary text/icon, 10 primary text/icon) and use the same roles for every hue.
  **Why** Hover/active/border logic becomes arithmetic (n, n+1, n+2) so every component gets the full state ladder without custom picks.
  **Applies to** SaaS app UI | all
  **Check** each interactive component's hover uses step+1 and active step+2 of the same ramp; no off-ramp greys.
  **Source** vercel.com/geist/colors

- **RULE** Use Background 1 for pages and for the surface of anything with colour on top; reserve Background 2 for rare subtle differentiation.
  **Why** Coloured elements are tuned against Background 1; frequent use of Background 2 flattens the hierarchy.
  **Applies to** SaaS app UI | landing page
  **Check** surfaces using bg-2 are a small minority; coloured badges sit on bg-1.
  **Source** vercel.com/geist/colors

- **RULE** Define typography as atomic role classes (size + line-height + tracking + weight) with four roles Heading, Copy, Label, Button, and forbid ad hoc font-size or weight on text.
  **Why** One class per text style prevents the drift of mixing sizes, weights and leading by hand.
  **Applies to** all
  **Check** computed (size, line-height, letter-spacing, weight) tuple of every text node matches a role in the table.
  **Source** vercel.com/geist/typography ; site CSS

- **RULE** Set heading tracking proportional to size: about -0.06em at 40-72px, -0.04em at 24-32px, -0.02em at 14-20px, weight 600, with line-height equal to or about 1.2 x size for displays (72/72, 64/64, 56/56, 48/56, 40/48).
  **Why** Large letters need optical tightening; the progression is monotonic and easily checked.
  **Applies to** landing page | SaaS app UI
  **Check** letter-spacing / font-size on headings <= -0.04em at >= 40px.
  **Source** site CSS (.text-heading-*)

- **RULE** Use Label styles for single-line UI text (menus, tabs, table headers) and Copy styles for multi-line text; Label has small line-height (16-20px at 12-16px) and Copy a larger one (18-36px).
  **Why** Single lines align to icons and controls; multi-line text needs leading for readability.
  **Applies to** SaaS app UI
  **Check** multi-line paragraphs use line-height ratio >= 1.35; single-line labels line-height <= 1.45 x size.
  **Source** vercel.com/geist/typography

- **RULE** Pair mono and sans one step apart (Label 14 sans with Label 13 Mono; Label 14 Mono with larger text) so optical size matches.
  **Why** Mono glyphs render visually larger than sans at the same size.
  **Applies to** SaaS app UI | landing page
  **Check** inline mono font-size is 1px smaller than adjacent sans.
  **Source** vercel.com/geist/typography

- **RULE** Name elevation by role and bundle fill + stroke + shadow + radius into a single material (radius 6px for base/small/tooltip, 12px for medium/large/menu/modal, 16px for fullscreen); never stack two materials on one element and match each to its z-index band.
  **Why** Removes per-component shadow tuning and keeps floating layers visually above resting ones.
  **Applies to** SaaS app UI
  **Check** every card/popover/dialog resolves to one material; computed radius in {6,12,16}.
  **Source** vercel.com/geist/materials

- **RULE** Draw borders with a 1px alpha ring plus 1px background halo, and test shadows in both themes since dark shadows are weaker.
  **Why** Crisp edges on any surface with no layout shift.
  **Applies to** SaaS app UI
  **Check** box-shadow includes a `0 0 0 1px` alpha entry; dark theme uses a white alpha ring.
  **Source** vercel.com/geist/materials ; site CSS (--ds-shadow-border-base)

- **RULE** Keep the signal steps (700/800) identical in light and dark and flip only backgrounds, text steps and tint steps (gray-100 #f2f2f2 to #1a1a1a, gray-1000 #171717 to #ededed).
  **Why** Brand colours stay recognisable across themes while neutrals invert deterministically.
  **Applies to** all
  **Check** blue-700 equal in both themes; gray-1000 contrast vs background-100 >= 12:1 in both.
  **Source** vercel.com/geist/colors ; site CSS

- **RULE** Focus ring = `0 0 0 2px <background-100>, 0 0 0 4px <blue-700 light / blue-900 dark>` (or 2px solid outline of the same colour).
  **Why** The inner background-coloured gap separates the ring from coloured controls.
  **Applies to** all
  **Check** focus-visible shows 2px gap + 2px ring; ring contrast >= 3:1 against the background.
  **Source** site CSS (--ds-focus-ring)

- **RULE** Icon-only buttons need an accessible name that names action plus target; labels are Title Case Verb + Noun; destructive confirmations mirror their success toast.
  **Why** Predictable, scannable microcopy and screen-reader parity.
  **Applies to** forms | SaaS app UI
  **Check** every button with only an svg has aria-label; no labels "Submit" or "OK".
  **Source** vercel.com/geist/button (Best Practices)

## 3. Numbers & scales

Type (px size/line-height, tracking): Heading 72/72 -4.32px, 64/64 -3.84, 56/56 -3.36, 48/56 -2.88, 40/48 -2.4, 32/40 -1.28, 24/32 -0.96, 20/26 -0.4, 16/24 -0.32, 14/20 -0.28 (weight 600). Copy 24/36, 20/36, 18/28, 16/24, 14/20, 13/18 (+ 14 and 13 mono), weight 400. Label 20/32, 18/20, 16/20, 14/20, 13/16, 12/16 (+ mono 14/20, 13/20, 12/16). Button 16/20, 14/20, 12/16, weight 500.

| Token | Value |
|---|---|
| space | 4, 8, 12, 16, 24, 32, 40, 64, 96, 128, 192, 256 px; small 32, medium 36, large 40 |
| gap / page margin | 24 / 12 half / 8 quarter |
| page width | 1200px legacy, 1400px current token |
| radius | 6 (base, small, tooltip, popover row), 8 (marketing), 12, 16 |
| gray light | #f2f2f2 #ebebeb #e6e6e6 #eaeaea* #c9c9c9 #a8a8a8 #8f8f8f #7d7d7d #4d4d4d #171717 (*as extracted) |
| gray dark | #1a1a1a #1f1f1f #292929 #2e2e2e #454545 #878787 #8f8f8f #7d7d7d #a1a1a1 #ededed |
| blue light | #f0f7ff #eaf4ff #e0efff #cce7ff #97ccff #51aeff #0070f7 #005edc #0064e2 #002453 |
| red light | #ffeef0 #ffe9ea #ffe4e5 #ffd8d7 #ffb5b6 #ff6a6e #fc0035 #e70022 #d60020 #46000c |
| backgrounds | 100: #fff / #0a0a0a; 200: #fafafa / #000 |
| motion | popover 0.2s, overlay 0.3s, timing cubic-bezier(.175,.885,.32,1.1), overlay start scale .96 |
| z-index | drawer 200, modal 300, menu 2001, toast 5000, tooltip 99999 |
| form | height 32/36/40, font 14/20 (large 16/24) |
| components | 72 listed |

Full set of hue ramps and dark values: JSON profile.

## 4. Dos and Don'ts

- Do: `<Button>Deploy Project</Button>`; Don't: `<Button>Submit</Button>`.
- Do: `<Button type="secondary">` for the supporting action; Don't: invalid types primary/success/ghost/violet.
- Do: `loading` prop to keep focus and announce busy; Don't: swap in a spinner.
- Do: use Grid for guide-line layouts; Don't: nest Grids more than one level.

## 5. Exceptions & judgement calls

- Gray 400 light (#eaeaea) appears lighter than gray 300 in extracted CSS; verify before reuse.
- Legacy `--geist-*` tokens conflict with `--ds-*` (e.g. success blue); use `--ds-*`.
- Heading weight 600 plus strong negative tracking suits Geist Sans; do not copy the em values onto another face without re-tuning.
- [engine note] Heading 56/56 and 64/64 (line-height 1.0) suit one-line heroes only; multi-line display needs >= 1.05-1.1.

## 6. Figures worth keeping

None captured; pages are client-rendered.

## 7. Open questions

- Button size heights, Badge and Input exact paddings not read (component CSS not extracted).
- Dark hex values converted from published HSL strings (rounding up to 1 unit).
- Strong weights per Label/Copy class beyond 550.
- Geist Mono/Pixel metrics (x-height, widths) not studied.
