# Linework

Architectural drawing-sheet system: graphite ink on drafting paper, hairline frames and ruled title-block cells, a single vermilion red-pencil accent, Caslon display for claims and mono for every measurement.

**Best for:** architecture and AEC software; spatial and CAD tools; precision AI products with physical output
**Avoid for:** playful consumer apps; dark-first devtools
**Personality knobs:** hue 32, neutral neutrals, sharp radius, border depth, comfortable density, calm motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Mona+Sans:wght@400;500;600;700&family=Red+Hat+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Every surface is a drawing sheet: double hairline frame, grid reference marks, ruled title-block cells
- Vermilion is the red pencil: only for the boundary, corrections and the one action
- All measurements, scales and IDs in Red Hat Mono
- No rounded corners anywhere

## Type
Display: 'Libre Caslon Display' · Body: 'Mona Sans' · Mono: 'Red Hat Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 44-92px fluid | 0.98 | -0.012em | 400 | display |
| display-lg | 32-49px fluid | 1.1 | -0.015em | 400 | display |
| heading-lg | 31px | 1.25 | -0.008em | 400 | display |
| heading-md | 25px | 1.25 | -0.008em | 400 | display |
| heading-sm | 20px | 1.25 | -0.008em | 600 | body |
| body-lg | 18px | 1.6 | 0em | 400 | body |
| body-md | 16px | 1.6 | 0em | 400 | body |
| body-sm | 14px | 1.6 | 0em | 400 | body |
| label-md | 15px | 1.3 | 0em | 500 | body |
| label-sm | 13px | 1.3 | 0.01em | 500 | body |
| mono-sm | 13px | 1.6 | 0.01em | 400 | mono |

## Colour roles (use roles, never ramp steps or hex)
| role | light | dark |
|---|---|---|
| --surface-canvas | #fefdf8 | #0e0d0a |
| --surface-raised | #ffffff | #151411 |
| --surface-sunken | #f4f2ee | #0e0d0a |
| --surface-inverse | #191815 | #f5f3ef |
| --surface-hover | #f4f2ee | #1d1c18 |
| --surface-active | #ecebe7 | #252420 |
| --text-strong | #191815 | #f5f3ef |
| --text-body | #191815 | #f5f3ef |
| --text-muted | #64635f | #93928e |
| --text-inverse | #fefdf8 | #0e0d0a |
| --text-on-accent | #ffffff | #ffffff |
| --border-hairline | #e4e3de | #252420 |
| --border-control | #878682 | #6a6965 |
| --border-strong | #878682 | #6a6965 |
| --accent-solid | #c02d14 | #cb4832 |
| --accent-solid-hover | #9f1700 | #e6634c |
| --accent-tint | #ffe7e1 | #361712 |
| --accent-tint-hover | #ffd2c9 | #53160c |
| --accent-text | #9f1700 | #fe816a |
| --accent-border | #ff917c | #90210e |
| --focus-ring | #9f1700 | #fe816a |
| --danger-solid | #c42123 | #d73431 |
| --danger-on-solid | #ffffff | #ffffff |
| --danger-tint | #ffe6e3 | #391411 |
| --danger-text | #a3000f | #ff7f73 |
| --danger-border | #ff9085 | #99010d |
| --warning-solid | #b57200 | #8a5600 |
| --warning-on-solid | #191815 | #ffffff |
| --warning-tint | #ffe9d0 | #2f1d07 |
| --warning-text | #774a00 | #e19a3a |
| --warning-border | #e9a44d | #704500 |
| --success-solid | #2a9b50 | #007835 |
| --success-on-solid | #191815 | #ffffff |
| --success-tint | #d9f6dd | #102816 |
| --success-text | #00672c | #64c37b |
| --success-border | #72cc87 | #006129 |
| --info-solid | #2389d1 | #0068a6 |
| --info-on-solid | #191815 | #ffffff |
| --info-tint | #deefff | #0f2334 |
| --info-text | #005990 | #5eb2f6 |
| --info-border | #6cbcfd | #005487 |

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.79,"accentTextOnCanvas":7.95,"accentSolidVsCanvas":5.68,"focusRing":7.95,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.54,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":4.64,"accentTextOnCanvas":7.52,"accentSolidVsCanvas":4.18,"focusRing":7.9,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 0 / sm 0 / md 2 / lg 2 / xl 4); nested radius = outer - padding.
- MUST use control heights 36/44/52px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 100/180/280/420ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "border": raised = `0 0 0 1px var(--border-hairline)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER round a corner
- NEVER use drop shadows (hairlines only)
- NEVER use more than one vermilion element per region
- NEVER set Caslon below 32px
