---
source: web:https://github.com/kiwicom/orbit ; https://orbit.kiwi (unreachable 2026-10-08)
chapter: Orbit (Kiwi.com) design system - foundation-driven tokens, travel UI, elevation semantics
pages: n/a (npm @kiwicom/orbit-design-tokens@11.0.0, @kiwicom/orbit-components@27.7.1-alpha.0, docs/src/documentation/02-foundation/*.mdx on GitHub master, fetched 2026-10-08)
topic_tags: [design-system, tokens, theming, white-label, elevation, color, travel, booking, accessibility, kiwi]
status: studied
---

# Orbit (Kiwi.com)

Spec: `system/systems-research/orbit.json`. Raw: `corpus/web/systems/orbit/`. Licence MIT.
orbit.kiwi did not resolve via DNS on 2026-10-08; the Android Compose library was archived July 2025 (third-party listing). Treat Orbit as maintained-but-quiet.

## 1. Core ideas

1. **Foundation in, tokens out.** A small typed foundation (10 hues x Light/Normal/Dark + Hover/Active, radii, sizes, space, fonts) is fed to `getTokens()`; ~456 component tokens are derived. White-label partners swap the foundation (README).
2. **Colour is functional, not decoration** ("Use color intentionally. It's not decoration." - colors.mdx).
3. **Interactive vs actionable colour.** Blue for state feedback that does not move the user on (hover, focus, select, drag); product teal only for elements that advance the flow (Button, ButtonLink, TextLink).
4. **Light + Dark pairing rule.** Dark shade text on the Light shade of the same hue is always readable; Dark shades are never backgrounds; hover/active shades only for very specific cases.
5. **Elevation encodes actionability.** Suppressed (cloud bg) -> Flat (1px border, non-actionable Card) -> Level 1 (clickable Tile) -> Level 2 (hovered) -> Level 3 (popover, tooltip, drawer) -> Level 4 (modal) -> Fixed (sticky header/footer).
6. **Typography: size first, weight/colour only to emphasise**; one heading colour (ink-dark); don't put Display and Title 1 on the same page.
7. **Principles:** find the middle ground (consistency, composability, DX, maintainability), be transparent, listen and react, make things intuitive, give consumers just enough control, guide with documentation, set appropriate defaults.
8. **Travel vocabulary as components:** Itinerary, Seat, StopoverArrow, CarrierLogo, Coupon, Wizard.

## 2. Rules

- **RULE** Reserve the brand/product colour for elements that move the user forward (primary button, button-link, text link); use a separate interactive colour (blue) for hover, focus, selection and drag feedback.
  **Why** The brand colour then always means "next step", which speeds scanning in long funnels.
  **Applies to** landing page, SaaS app UI, forms. **Check** elements with product colour are all `a[href]`/`button` that submit or navigate; selection/focus styles use a different hue. **Source** orbit docs 04-color/01-colors.mdx
- **RULE** Use the Light shade of a hue as background and its Dark shade for text/icons on it; never use a Dark shade as a background.
  **Why** The shade ladder is built so Dark-on-Light of one hue clears contrast; Dark backgrounds break the ladder.
  **Applies to** all (alerts, badges, status). **Check** status component: fg/bg same hue family and contrast >= 4.5:1; no bg with Dark-step token. **Source** orbit colors.mdx
- **RULE** Map elevation to actionability: non-clickable cards are flat (1px border, no shadow); clickable tiles get a small shadow; hover raises one level; overlays (popover/tooltip/drawer) and modal take the top levels.
  **Why** Shadow becomes a clickability affordance instead of decoration.
  **Applies to** SaaS app UI, landing page cards. **Check** elements with box-shadow at rest are interactive (`a`, `button`, `[role=button]`, `[tabindex]`); non-interactive cards use border only. **Source** orbit 06-elevation.mdx
- **RULE** For panels anchored to the bottom of the viewport (mobile popovers, fixed footers) use a reversed shadow (negative y offset).
  **Why** Light comes from above; a bottom sheet should cast upward.
  **Applies to** mobile. **Check** bottom-fixed elements: box-shadow y-offset < 0. **Source** elevationLevel3ReverseBoxShadow, elevationFixedReverseBoxShadow
- **RULE** Build heading hierarchy with size steps first; add weight or colour only for emphasis, keep a single heading colour, and don't combine a 40px Display with a 28px Title 0/24px Title 1 on one page.
  **Why** Too large a jump from display to body disconnects information; one heading colour keeps scanning predictable.
  **Applies to** all. **Check** distinct heading colours = 1; page does not contain both display and title-1 class; no skipped heading levels. **Source** orbit 10-typography/01-general.mdx
- **RULE** Use only the 4px-grid spacing steps 4/8/12/16/24/32/40/52: 4 to tie an error to its field, 8 between a header and its description, 16 mobile inner padding, 24 section side padding, 52 between illustration and header.
  **Why** Closer = related; a fixed scale keeps relationships readable.
  **Applies to** all. **Check** computed margins/paddings modulo 4 == 0 and in the allowed set. **Source** orbit 09-spacing.mdx
- **RULE** Make default form controls and buttons 44px tall (small 32px, large 52px) and touch targets at least 44x44 CSS px.
  **Why** Travel booking is mobile-heavy; WCAG 2.5.5 target size.
  **Applies to** mobile, forms. **Check** `button, input, select` bounding box height >= 44 at default size. **Source** formBoxNormalHeight = size.extraLarge 44px; 02-accessibility.mdx
- **RULE** Give the icon side of a button one padding step less than the text side (e.g. 12px icon side, 16px text side).
  **Why** Icons carry built-in whitespace; equal padding makes icon buttons look lopsided.
  **Applies to** all. **Check** buttons with leading icon: padding-inline-start < padding-inline-end. **Source** orbit-components es/primitives/ButtonPrimitive/sizes.js
- **RULE** Avoid pure black text on pure white; use a near-black ink (#252A31).
  **Why** Orbit's accessibility guidance flags the extreme contrast as hard for dyslexic readers.
  **Applies to** all. **Check** body text colour != #000 on #fff backgrounds. **Source** orbit 02-accessibility.mdx (opinion-backed guidance)
- **RULE** Expose theming as a small foundation object passed to a token-generating function, and derive every component token from it.
  **Why** One object swap re-brands everything consistently; component tokens can't drift from the foundation.
  **Applies to** design systems, white-label products. **Check** component token values reference foundation keys, not literals (except documented exceptions). **Source** orbit-design-tokens README + dist createTokens

## 3. Numbers & scales

| Item | Values |
|---|---|
| Fonts | Roboto (open), Circular Pro (Kiwi.com, licensed), Lato (some eastern langs) |
| Headings | Display 40/44 700; Display Subtitle 22/28 400; Title0 28/36; T1 24/32; T2 20/28; T3 18/24; T4 16/22; T5 15/20; T6 13/18 (all 700) |
| Text | small 13/16, normal 15/20, large 16/24; paragraph line-height 1.4 |
| Weights | 400, 500, 700 |
| Spacing | 2,4,6,8,12,16,20,24,28,32,40,48,52,64 |
| Radius | 2,4,6,8,12,16, full 9999; buttons 8 (large 12), badge 12, modal 16 |
| Form box | 32 / 44 / 52 |
| Modal widths | 360, 540, 740, 900, 1280 |
| Breakpoints | 320, 414, 576, 768, 992, 1200 |
| Durations | 150, 300, 400 ms |
| z-index | default 1, sticky 100, navbar 700, overlay 800, drawer 815, modal 825, top 900 |
| Product teal | light #E1F4F3, normal #008F7B, dark #007061, darker #003D35 |
| Ink | dark #252A31, normal #4F5E71, light #657890 |
| Contrast (measured) | #008F7B/white 4.03:1 (fails AA text); #007061 6.02:1; #4F5E71 6.62:1; #B36200 4.50:1 |

## 4. Dos and Don'ts

- Do use Light backgrounds with Dark foregrounds of the same status hue; don't use Dark shades as backgrounds.
- Do keep heading levels sequential; don't skip levels.
- Do use the same colour for a heading and its supporting icon (easier to scan).
- Don't colour non-actionable elements in the actionable (product) colour.

## 5. Exceptions & judgement calls

- The legacy radius page (3px desktop / 6px mobile, smaller on desktop because tight field groups look disconnected with larger radii) contradicts current tokens (8px buttons). Keep the reasoning: radius should shrink when elements sit close together. [engine note]
- Product teal fails AA for small text; Orbit admits it. If adopting, use product-dark for text links and keep product-normal for fills with white text >= 18px bold or as non-text. [engine note]
- 15px body is unusual; it works with Circular/Roboto x-heights but may look small with low x-height faces. [engine note]

## 6. Figures worth keeping

- docs images/foundation/venn.png (consistency / DX / maintainability / composability overlap) - not fetched.

## 7. Open questions

- orbit.kiwi DNS failure: temporary or retired? Re-check.
- No easing tokens and no dark mode published; Kiwi.com production may differ (not measured live).
