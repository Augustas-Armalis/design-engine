---
source: web:https://linear.app ; https://linear.app/now/how-we-redesigned-the-linear-ui ; https://linear.app/now/behind-the-latest-design-refresh ; https://linear.app/brand ; site CSS (76 stylesheets, measured 2026-10-08)
chapter: Linear design system profile (measured marketing site + public redesign write-ups)
pages: n/a (web sources, fetched and measured 2026-10-08)
topic_tags: [design-system, dark-mode, lch, tokens, typography, hairlines, density, saas, developer-tools]
status: studied
---

# Linear

Machine profile: `system/systems-research/linear.json`. Raw fetches, screenshots (1440 and 390), computed-style JSON and stylesheets: `corpus/web/systems/linear/` (gitignored). The product app needs a login and was not touched; app values come from the live product frame on the marketing page and from the public write-ups. Provenance: mixed (public posts + measured).

## 1. Core ideas

1. **Themes are generated, not authored.** Linear's own post says each theme dropped from 98 hand-set variables to 3 inputs: base colour, accent colour, contrast; LCH replaced HSL so equal lightness looks equal; light, dark and custom themes share one generator. A contrast input enables high-contrast accessibility themes (page compares 30 vs 100). Source: linear.app/now/how-we-redesigned-the-linear-ui. The March 2026 refresh adds an internal colour tool (hue, chroma, lightness per token, export as token JSON into Figma) and shifts default greys from cool blue-leaning to warmer, less saturated, noting "too warm looked muddy" (linear.app/now/behind-the-latest-design-refresh).
2. **Dark canvas, light-on-dark hierarchy by rank.** Measured: canvas #08090a; panel #0f1011; text steps #f7f8f8 / #d0d6e0 / #8a8f98 / #62666d; border steps #23252a / #34343a / #3e3e44 (stylesheet tokens). Roles are named by rank (primary..quinary) rather than purpose.
3. **Hairlines replace shadows in dark.** Measured shadows on the page are mostly 1px rings (`rgba(0,0,0,.2) 0 0 0 1px` x8; `inset rgba(255,255,255,.05) 0 0 0 1px` x4; `inset rgba(255,255,255,.08) 0 0 0 .5px` x5); real drop shadows exist only as tokens for popovers (0 4px 24px #0003, 0 7px 32px #00000059) and one measured dialog (0 2px 32px rgba(0,0,0,.25)).
4. **One odd weight is the brand.** Inter Variable at weight 510 for headings and UI (named weights 300/400/510/590/680), `cv01` + `ss03` alternates on, `opsz auto`. Tracking tightens with size: -0.011em at 15px, -0.012em at 20-24px, -0.022em from 32px up.
5. **The accent is nearly invisible.** `#7170ff` (hover `#828fff`) and brand `#5e6ad2` appear on a handful of elements; the page is greyscale plus a few semantic hues in the product frame (pink `rgb(247,156,224)`, peach, mint) used as code and label colours.
6. **Two radius grammars.** Marketing nav buttons and CTAs are 9999px pills (72 elements); app rows, buttons and controls are 8px; product frame 12px; chips 4-6px.
7. **The hero is a real product surface.** A 1320x720, 12px-radius frame with a live sidebar (28px rows, 13px/510 labels, 12px/510 section labels in `#62666d`), issue header, activity feed and an agent panel; not an illustration.
8. **Motion is quick and explicit.** 100ms colour on nav, 160ms border/filter/transform on buttons, `--duration .18s`, 400ms background on cards, 700ms `cubic-bezier(.32,.72,0,1)` for large illustrative transforms; property lists are explicit (not `all`).
9. **Chrome was thinned in 2026.** Sidebar dimmer so content stands out, inactive text muted, icons smaller and fewer, coloured team-icon backgrounds removed, dividers fewer with rounded ends and softer contrast, tabs compact and rounded (same post).

## 2. Rules

- **RULE** Generate every theme (light, dark, high-contrast, custom) from three inputs: a base colour, an accent colour and a contrast scalar, computed in a perceptual space (LCH/OKLCH); do not store per-theme lists of hand-picked variables.
  **Why** Hand-authored themes drift (98 variables per theme at Linear before the change); a generator keeps surface, text and border ratios identical across themes and makes accessibility themes a parameter.
  **Applies to** SaaS app UI | all
  **Check** theme file contains at most 3 authored inputs per theme; every semantic token is an expression of them.
  **Source** linear.app/now/how-we-redesigned-the-linear-ui

- **RULE** Name text and surface tokens in four ranked steps (primary, secondary, tertiary, quaternary) and set a contrast floor per rank; the lowest rank may be used only for non-essential labels and must still be at least 3:1 on its surface.
  **Why** A fixed ladder makes hierarchy a token choice. Linear's quaternary (#62666d on #08090a) is 3.45:1: acceptable for decorative labels, not for readable copy.
  **Applies to** SaaS app UI | landing page
  **Check** compute contrast of each rank against its canvas; flag any `<p>` or `button` using the lowest rank; floor 3:1 (decorative), 4.5:1 for primary/secondary/tertiary.
  **Source** measured linear.app CSS (--color-text-*), 2026-10-08

- **RULE** In dark themes separate surfaces with a lightness step plus a 1px translucent hairline (white at 5-8% alpha), not with drop shadows; keep real shadows for floating layers only (menu, dialog, popover).
  **Why** Shadows are invisible on near-black; hairlines and lightness steps keep edges crisp and cost nothing in paint.
  **Applies to** SaaS app UI | landing page (dark)
  **Check** on dark pages, count elements with blur-radius > 8px shadows; they should be floating layers only; cards use `box-shadow: inset/0 0 0 1px rgba(255,255,255,.05-.1)` or a 1px border.
  **Source** measured shadow histogram, linear.app home, 2026-10-08

- **RULE** Make tracking a function of size and store it with the type token: about -0.011em to -0.013em at 14-15px, -0.012em at 17-24px, -0.022em at 32px and larger; line-height steps down 1.6, 1.4, 1.33, 1.125, 1.1, 1.0 as size rises.
  **Why** Inter at display size looks loose with default tracking; fixed -0.02em at every size would crush small text.
  **Applies to** landing page | SaaS app UI
  **Check** computed letter-spacing / font-size per heading and body style; compare to the table above (tolerance 0.004em).
  **Source** measured h1 64px/-1.408px, h2 48px/-1.056px, p 15px/-0.165px; --title-N, --text-N tokens

- **RULE** Pick one non-default variable weight as the brand weight (Linear: 510) and define the whole weight ladder as tokens (400, 510, 590, 680); do not use 500/600/700 literals in components.
  **Why** An odd, tokenised weight is hard to copy by accident and keeps UI text from jumping between near-identical weights.
  **Applies to** all
  **Check** computed font-weight values on a page come from a set of at most 4 tokens.
  **Source** --font-weight-medium 510 etc., measured

- **RULE** Use explicit `transition-property` lists with 100-160ms durations and an ease-out curve for hover and focus; keep 400-700ms only for decorative transforms; never `transition: all` on interactive controls.
  **Why** Interaction feedback should be perceived as instant; `all` animates layout properties and causes jank.
  **Applies to** all
  **Check** no `transition-property: all` on `a`, `button`, `input`; durations on those <= 200ms.
  **Source** measured transitions (color .1s, border .16s), 2026-10-08

- **RULE** Use two radius grammars with a stated boundary: pill (9999px) for marketing navigation and CTAs, 8px for dense app rows and controls, 12px for large framed surfaces; do not mix pill and 8px buttons in the same bar.
  **Why** One shape language per context reads as intent; mixed radii read as assembly.
  **Applies to** landing page | SaaS app UI
  **Check** within one component row, the set of border-radius values has size 1; histogram shows no more than 4 radius values per page region.
  **Source** measured radius histogram (9999px x72, 8px x29, 12px x19), 2026-10-08

- **RULE** Show the product as the hero with real, readable UI text (13px rows, real issue ids, live-looking states) and no more than one accent hue; do not substitute abstract illustration.
  **Why** For a tool, proof is the workflow; legible type inside the frame is what persuades.
  **Applies to** landing page
  **Check** hero frame text is at least 12px at 1440 and contains at least 5 distinct real-looking rows; visual.
  **Source** measured hero frame 1320x720, rows 28px high, 2026-10-08

- **RULE** When refreshing chrome, subtract before adding: mute inactive navigation, shrink icons, drop coloured icon backgrounds, reduce divider count and soften divider contrast.
  **Why** Chrome that recedes lets content set the hierarchy; Linear's 2026 refresh did exactly this.
  **Applies to** SaaS app UI
  **Check** before/after count of divider elements and distinct icon colours in the shell; visual.
  **Source** linear.app/now/behind-the-latest-design-refresh

## 3. Numbers & scales

| Item | Value (measured 2026-10-08 unless noted) |
|---|---|
| Canvas | #08090a; marketing alt #010102; panel #0f1011; level2 #141516; level3 #191a1b |
| Text | #f7f8f8 (18.73:1), #d0d6e0 (13.64), #8a8f98 (6.13), #62666d (3.45) |
| Border | #23252a, #34343a, #3e3e44; translucent #ffffff0d/14/1f/26 |
| Accent | #7170ff, hover #828fff, brand #5e6ad2, focus ring rgba(94,106,210,.4) 0 0 0 3px |
| Semantic | green #27a644, red #eb5757, orange #fc7840, yellow #f0bf00, blue #4ea7fc, teal #00b8cc |
| Light theme | bg #fff/#f8f8f8/#f4f4f4; text #282a30/#3c4149/#6f6e77/#86848d; border #e9e8ea/#e4e2e4/#dcdbdd |
| Type 1440 | h1 64/64/510/-1.408px; h1 alt 72/72; h2 48/48/510/-1.056px; docs h1 40/44/590; h3 20/26.6/590/-0.24px; body 15/24/400/-0.165px; small 14/21; UI 13/19.5; micro 12/14/510 |
| Type 390 | h1 38/41.8/510/-0.836px; h2 24/31.92/510/-0.288px |
| Radius | 2, 4, 6, 8, 9, 12, 16, 24, 32, 50%, 9999 |
| Control heights | app row 28, section label 24, nav pill 32, CTA 40, docs sidebar button 36 |
| Layout | nav 72; hero left edge x=80 at 1440; page max-width 1024 (prose); gap 32; inline pad 24; block pad 64 |
| Blur | header 20px over #0b0b0bcc |
| Motion | 100/160/180/200/400/700ms; ease-out-quad (.25,.46,.45,.94); (.165,.84,.44,1); (.32,.72,0,1) |

## 4. Dos and Don'ts

- Do: product frame with a 28px sidebar row set in 13px/510 on `#d0d6e0`, selected row `rgba(255,255,255,.04)`, section label 12px/510 `#62666d`. Don't: same frame with 16px labels and coloured icon tiles (the pre-2026 look).
- Do: nav as 32px-high pills, 13px, `#8a8f98` resting, white on hover (100ms). Don't: underline-on-hover text links beside pill buttons.
- Do: card edge as 1px translucent ring + 8-12px radius. Don't: hairline plus a wide soft drop shadow on the same dark card (shadow is invisible; only the ring registers).

## 5. Exceptions & judgement calls

- Quaternary text under AA is a deliberate trade for hierarchy; a library entry should expose it as `decorative-only` rather than copy it as body-capable.
- Marketing is dark-only: if our project needs a light page, derive it from the shipped light tokens (#fff/#f8f8f8, text #282a30/#3c4149/#6f6e77/#86848d), not by inverting.
- [engine note] The 510 weight only works on a variable Inter build; with static Inter use 500 and accept slightly less distinctive text.
- [engine note] 2026 refresh moves greys warmer; our library entry should keep both a "cool 2024-26" and a "warm 2026" neutral set, flagged as such, since the live CSS still serves cool values.

## 6. Figures worth keeping

- `corpus/web/systems/linear/home-1440-fold.png`: hero frame with sidebar, issue and agent panel; shows hairline-only depth.
- `corpus/web/systems/linear/ai-1440-full.png` and `pricing-1440-full.png`: section rhythm at 48/72px headings.

## 7. Open questions

- Which of the paired values per token (e.g. #7170ff vs #8989f0; #5e6ad2 vs #7070ff) belong to dark, light or legacy themes: not verified.
- App-only values (list row height, density modes, command menu, issue row states) unknown; needs an authenticated session, which was out of scope.
- Where Tiempos Headline is used (declared as `--font-serif-display`) not observed.
- The March 2026 warm-grey values are not in the measured stylesheet; exact hex unknown.
- `prefers-reduced-motion` behaviour not tested.
