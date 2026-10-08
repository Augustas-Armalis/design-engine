# Margin

Warm paper-white canvas with faint ruled lines inside the rails, Instrument Sans at 560 with tight tracking, one signal green for approvals and the primary series, AI notes pinned to diff lines by drawn connectors.

**Best for:** developer tools; AI code review; engineering workflow
**Avoid for:** consumer lifestyle
**Personality knobs:** hue 152, warm neutrals, default radius, soft depth, default density, calm motion.
**Load:** `<link rel="stylesheet" href="">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Notes in the margin: AI comments pinned to code lines by drawn connectors
- Ruled-paper texture inside the rails only
- Green only for approve, the primary action and success

## Type
Display: 'Instrument Sans Variable' · Body: 'Instrument Sans Variable' · Mono: 'Geist Mono Variable'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 35-72px fluid | 1.04 | -0.04em | 560 | display |
| display-lg | 32-49px fluid | 1.1 | -0.015em | 560 | display |
| heading-lg | 31px | 1.25 | -0.008em | 560 | display |
| heading-md | 25px | 1.25 | -0.008em | 560 | display |
| heading-sm | 20px | 1.25 | -0.008em | 600 | body |
| body-lg | 18px | 1.5 | 0em | 400 | body |
| body-md | 16px | 1.5 | 0em | 400 | body |
| body-sm | 14px | 1.5 | 0em | 400 | body |
| label-md | 15px | 1.3 | 0em | 500 | body |
| label-sm | 13px | 1.3 | 0.01em | 500 | body |
| mono-sm | 13px | 1.5 | 0.01em | 400 | mono |

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
| --text-on-accent | #ffffff | #ffffff |
| --border-hairline | #e9e2d9 | #28231c |
| --border-control | #8b857d | #6e685f |
| --border-strong | #8b857d | #6e685f |
| --accent-solid | #008240 | #00783b |
| --accent-solid-hover | #006732 | #1a924d |
| --accent-tint | #d6f7de | #102717 |
| --accent-tint-hover | #b3efc2 | #013819 |
| --accent-text | #006732 | #63c281 |
| --accent-border | #67cd87 | #00612e |
| --focus-ring | #006732 | #63c281 |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.89,"controlBorder":3.57,"onAccent":4.94,"accentTextOnCanvas":6.88,"accentSolidVsCanvas":4.84,"focusRing":6.88,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.53,"textBody":16.68,"textMuted":5.93,"controlBorder":3.35,"onAccent":5.63,"accentTextOnCanvas":8.45,"accentSolidVsCanvas":3.45,"focusRing":8.88,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 4 / sm 6 / md 8 / lg 12 / xl 16); nested radius = outer - padding.
- MUST use control heights 32/40/48px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 100/180/280/420ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "soft": raised = `0 1px 3px 0px rgb(28 23 17 / 0.08)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER dark hacker aesthetic for the marketing hero
- NEVER red except for real blocking issues
