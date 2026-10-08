# Kiln

Craft and marketplace: Zilla Slab display, Work Sans body, brick-red accent on neutral (not cream), tight corners, crisp block depth.

**Best for:** marketplaces; maker and craft commerce; food and hospitality SaaS
**Avoid for:** AI infra; enterprise security
**Personality knobs:** hue 28, neutral neutrals, tight radius, crisp depth, default density, snappy motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Work+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Slab display
- Brick accent on cool-neutral ground (explicitly not cream + coral)
- Offset block depth on product cards

## Type
Display: 'Zilla Slab' · Body: 'Work Sans' · Mono: 'DM Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 40-84px fluid | 1 | -0.02em | 700 | display |
| display-lg | 34-52px fluid | 1.1 | -0.015em | 700 | display |
| heading-lg | 33px | 1.1 | -0.015em | 700 | display |
| heading-md | 27px | 1.25 | -0.008em | 700 | display |
| heading-sm | 21px | 1.25 | -0.008em | 600 | body |
| body-lg | 19px | 1.6 | 0em | 400 | body |
| body-md | 17px | 1.6 | 0em | 400 | body |
| body-sm | 15px | 1.6 | 0em | 400 | body |
| label-md | 16px | 1.3 | 0em | 500 | body |
| label-sm | 14px | 1.3 | 0em | 500 | body |
| mono-sm | 14px | 1.6 | 0em | 400 | mono |

## Colour roles (use roles, never ramp steps or hex)
| role | light | dark |
|---|---|---|
| --surface-canvas | #fefdfa | #0e0d0b |
| --surface-raised | #ffffff | #141412 |
| --surface-sunken | #f3f2ef | #0e0d0b |
| --surface-inverse | #191816 | #f4f3f0 |
| --surface-hover | #f3f2ef | #1c1c19 |
| --surface-active | #ecebe8 | #252422 |
| --text-strong | #191816 | #f4f3f0 |
| --text-body | #191816 | #f4f3f0 |
| --text-muted | #646361 | #93928f |
| --text-inverse | #fefdfa | #0e0d0b |
| --text-on-accent | #ffffff | #ffffff |
| --border-hairline | #e4e3e0 | #252422 |
| --border-control | #878683 | #6a6966 |
| --border-strong | #878683 | #6a6966 |
| --accent-solid | #b14238 | #bd564b |
| --accent-solid-hover | #922d26 | #d76f63 |
| --accent-tint | #ffe6e3 | #321a17 |
| --accent-tint-hover | #ffd2cb | #4c1d18 |
| --accent-text | #922d26 | #ef8b7f |
| --accent-border | #fd9285 | #853029 |
| --focus-ring | #922d26 | #ef8b7f |
| --danger-solid | #c42123 | #d73431 |
| --danger-on-solid | #ffffff | #ffffff |
| --danger-tint | #ffe6e3 | #391411 |
| --danger-text | #a3000f | #ff7f73 |
| --danger-border | #ff9085 | #99010d |
| --warning-solid | #b57200 | #8a5600 |
| --warning-on-solid | #191816 | #ffffff |
| --warning-tint | #ffe9d0 | #2f1d07 |
| --warning-text | #774a00 | #e19a3a |
| --warning-border | #e9a44d | #704500 |
| --success-solid | #2a9b50 | #007835 |
| --success-on-solid | #191816 | #ffffff |
| --success-tint | #d9f6dd | #102816 |
| --success-text | #00672c | #64c37b |
| --success-border | #72cc87 | #006129 |
| --info-solid | #2389d1 | #0068a6 |
| --info-on-solid | #191816 | #ffffff |
| --info-tint | #deefff | #0f2334 |
| --info-text | #005990 | #5eb2f6 |
| --info-border | #6cbcfd | #005487 |

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.68,"accentTextOnCanvas":7.82,"accentSolidVsCanvas":5.57,"focusRing":7.82,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.54,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":4.57,"accentTextOnCanvas":7.61,"accentSolidVsCanvas":4.25,"focusRing":8,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 2 / sm 3 / md 4 / lg 6 / xl 10); nested radius = outer - padding.
- MUST use control heights 32/40/48px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 70/120/200/300ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "crisp": raised = `0 0 0 1px var(--border-strong)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER put a cream background behind the brick accent
- NEVER use italic serif display
