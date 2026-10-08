# Vellum

Premium, unhurried AI: high-contrast Garamond display, Manrope body, muted gold accent on warm stone, hairline borders, slow calm motion, lots of air.

**Best for:** premium AI assistants; wealth and advisory; hospitality tech
**Avoid for:** dense dashboards; devtools
**Personality knobs:** hue 72, warm neutrals, tight radius, border depth, comfortable density, calm motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Garamond display only above 40px
- Muted gold accent, never saturated
- Section rhythm of 128px or more on desktop

## Type
Display: 'Cormorant Garamond' · Body: 'Manrope' · Mono: 'IBM Plex Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 44-92px fluid | 1 | -0.01em | 500 | display |
| display-lg | 48-72px fluid | 1 | -0.01em | 500 | display |
| heading-lg | 40px | 1.1 | -0.015em | 500 | display |
| heading-md | 30px | 1.25 | -0.008em | 500 | display |
| heading-sm | 23px | 1.25 | -0.008em | 600 | body |
| body-lg | 19px | 1.65 | 0em | 400 | body |
| body-md | 17px | 1.65 | 0em | 400 | body |
| body-sm | 15px | 1.65 | 0em | 400 | body |
| label-md | 16px | 1.3 | 0em | 500 | body |
| label-sm | 14px | 1.3 | 0em | 500 | body |
| mono-sm | 14px | 1.65 | 0em | 400 | mono |

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
| --accent-solid | #866539 | #7a5d38 |
| --accent-solid-hover | #6d4f27 | #93744d |
| --accent-tint | #f6ebdd | #282017 |
| --accent-tint-hover | #efdac1 | #392b19 |
| --accent-text | #6d4f27 | #c4a580 |
| --accent-border | #cfae86 | #644a2a |
| --focus-ring | #6d4f27 | #c4a580 |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.89,"controlBorder":3.57,"onAccent":5.35,"accentTextOnCanvas":7.38,"accentSolidVsCanvas":5.24,"focusRing":7.38,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.53,"textBody":16.68,"textMuted":5.93,"controlBorder":3.35,"onAccent":6.07,"accentTextOnCanvas":7.95,"accentSolidVsCanvas":3.2,"focusRing":8.35,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 2 / sm 3 / md 4 / lg 6 / xl 10); nested radius = outer - padding.
- MUST use control heights 36/44/52px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 100/180/280/420ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "border": raised = `0 0 0 1px var(--border-hairline)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER set Cormorant for UI text
- NEVER use more than one accent element per viewport
- NEVER use springy motion
