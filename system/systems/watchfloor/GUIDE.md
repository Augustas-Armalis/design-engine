# Watchfloor

Dark-first operations, built to Marcel Kargul's dark grammar (near-black #08080a field, a hairline cell grid that runs the page, numbered sections, pixel-matrix art lit by one accent) with Rico-grade product windows (neutral grey surfaces, white pill primary, real-looking agent work). Signal amber is the only colour: it means 'something needs a human'.

**Best for:** incident response and on-call; observability; infra AI agents; security operations
**Avoid for:** consumer lifestyle; warm editorial brands
**Personality knobs:** hue 70, neutral neutrals, default radius, border depth, default density, calm motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&family=IBM+Plex+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- A hairline cell grid (rails + rules) that frames every section, Marcel-style; content sits in cells, never floats
- Pixel-matrix art made of square cells that light in amber where a human is needed and cool to white when resolved
- Numbered section and tab labels in mono (01, 02...)
- Product windows at Rico grade: #161616-#1c1c1c greys, 1px #ffffff0f edges, white pill primary

## Type
Display: 'Instrument Sans' · Body: 'Instrument Sans' · Mono: 'IBM Plex Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 31-64px fluid | 1.04 | -0.03em | 500 | display |
| display-lg | 30-46px fluid | 1.1 | -0.015em | 500 | display |
| heading-lg | 29px | 1.25 | -0.008em | 500 | display |
| heading-md | 23px | 1.25 | -0.008em | 500 | display |
| heading-sm | 19px | 1.55 | 0em | 600 | body |
| body-lg | 17px | 1.55 | 0em | 400 | body |
| body-md | 15px | 1.55 | 0em | 400 | body |
| body-sm | 13px | 1.55 | 0.01em | 400 | body |
| label-md | 14px | 1.3 | 0em | 500 | body |
| label-sm | 12px | 1.3 | 0.01em | 500 | body |
| mono-sm | 12px | 1.55 | 0.01em | 400 | mono |

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
| --accent-solid | #955e00 | #8a5600 |
| --accent-solid-hover | #774a00 | #a96b00 |
| --accent-tint | #ffe9d0 | #2d1e0c |
| --accent-tint-hover | #ffd6a8 | #432700 |
| --accent-text | #774a00 | #d99d54 |
| --accent-border | #e6a656 | #704500 |
| --focus-ring | #774a00 | #d99d54 |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.42,"accentTextOnCanvas":7.46,"accentSolidVsCanvas":5.31,"focusRing":7.46,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.54,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":6.15,"accentTextOnCanvas":7.85,"accentSolidVsCanvas":3.16,"focusRing":8.25,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

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
- MUST use depth "border": raised = `0 0 0 1px var(--border-hairline)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER purple or blue gradients behind type
- NEVER glow on a resting button
- NEVER more than one accent hue
