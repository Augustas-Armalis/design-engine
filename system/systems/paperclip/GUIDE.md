# Paperclip

Friendly small-business software: rounded geometric sans, olive-lime accent on a neutral paper, layered depth, comfortable touch-sized controls.

**Best for:** SMB tools; no-code builders; marketplaces; bookings
**Avoid for:** high-end luxury; dense pro tools
**Personality knobs:** hue 118, warm neutrals, default radius, layered depth, comfortable density, springy motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=Figtree:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Olive-lime accent with dark ink on solid fills
- Comfortable 44px controls by default
- Rounded 12-16px containers with layered depth

## Type
Display: 'Familjen Grotesk' · Body: 'Figtree' · Mono: 'DM Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 35-72px fluid | 1 | -0.025em | 700 | display |
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
| --surface-canvas | #fffcf9 | #110c06 |
| --surface-raised | #ffffff | #18130c |
| --surface-sunken | #f8f1e8 | #110c06 |
| --surface-inverse | #1c1711 | #faf2e8 |
| --surface-hover | #f8f1e8 | #201b14 |
| --surface-active | #f1eae1 | #28231c |
| --text-strong | #1c1711 | #faf2e8 |
| --text-body | #1c1711 | #faf2e8 |
| --text-muted | #68625b | #989188 |
| --text-inverse | #fffcf9 | #110c06 |
| --text-on-accent | #1c1711 | #faf2e8 |
| --border-hairline | #e9e2d9 | #28231c |
| --border-control | #8b857d | #6e685f |
| --border-strong | #8b857d | #6e685f |
| --accent-solid | #7c8d08 | #5e6b00 |
| --accent-solid-hover | #94a639 | #4b5700 |
| --accent-tint | #eaf1d2 | #20240e |
| --accent-tint-hover | #d9e6ad | #2b3202 |
| --accent-text | #515c00 | #a4b55c |
| --accent-border | #adbf60 | #4b5700 |
| --focus-ring | #515c00 | #a4b55c |
| --danger-solid | #c42123 | #d73431 |
| --danger-on-solid | #ffffff | #ffffff |
| --danger-tint | #ffe6e3 | #391411 |
| --danger-text | #a3000f | #ff7f73 |
| --danger-border | #ff9085 | #99010d |
| --warning-solid | #b57200 | #8a5600 |
| --warning-on-solid | #1c1711 | #ffffff |
| --warning-tint | #ffe9d0 | #2f1d07 |
| --warning-text | #774a00 | #e19a3a |
| --warning-border | #e9a44d | #704500 |
| --success-solid | #2a9b50 | #007835 |
| --success-on-solid | #1c1711 | #ffffff |
| --success-tint | #d9f6dd | #102816 |
| --success-text | #00672c | #64c37b |
| --success-border | #72cc87 | #006129 |
| --info-solid | #2389d1 | #0068a6 |
| --info-on-solid | #1c1711 | #ffffff |
| --info-tint | #deefff | #0f2334 |
| --info-text | #005990 | #5eb2f6 |
| --info-border | #6cbcfd | #005487 |

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.89,"controlBorder":3.57,"onAccent":4.82,"accentTextOnCanvas":7.12,"accentSolidVsCanvas":3.61,"focusRing":7.12,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.53,"textBody":16.68,"textMuted":5.93,"controlBorder":3.35,"onAccent":5.28,"accentTextOnCanvas":8.21,"accentSolidVsCanvas":3.32,"focusRing":8.63,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 4 / sm 6 / md 8 / lg 12 / xl 16); nested radius = outer - padding.
- MUST use control heights 36/44/52px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 90/160/260/380ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "layered": raised = `0 1px 2px 0px rgb(28 23 17 / 0.06), 0 2px 4px 0px rgb(28 23 17 / 0.04)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER use dark mode as the default
- NEVER use thin 300 weights
