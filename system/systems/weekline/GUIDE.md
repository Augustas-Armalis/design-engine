# Weekline

Graphite dark (Linear-measured ladder: #0a0a0b field, #111113 panel, #18181b raised, white hairlines 6/9/12%), Host Grotesk at regular weight, one cool blue for the thing the AI proposes. Light comes from the product window, never from blobs behind the type.

**Best for:** calendars and scheduling; productivity; team tools
**Avoid for:** poster-style campaigns
**Personality knobs:** hue 245, cool neutrals, default radius, border depth, comfortable density, calm motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..700&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Regular-weight display at large size
- Blue only for what the AI proposes
- The product window is the light source

## Type
Display: 'Host Grotesk' · Body: 'Host Grotesk' · Mono: 'Geist Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 33-68px fluid | 1.02 | -0.035em | 400 | display |
| display-lg | 30-46px fluid | 1.1 | -0.015em | 400 | display |
| heading-lg | 29px | 1.25 | -0.008em | 400 | display |
| heading-md | 23px | 1.25 | -0.008em | 400 | display |
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
| --surface-canvas | #fbfdff | #090e13 |
| --surface-raised | #ffffff | #10141a |
| --surface-sunken | #edf3fb | #090e13 |
| --surface-inverse | #15191e | #eef4fc |
| --surface-hover | #edf3fb | #181c22 |
| --surface-active | #e6ecf3 | #20242a |
| --text-strong | #15191e | #eef4fc |
| --text-body | #15191e | #eef4fc |
| --text-muted | #5f646a | #8d939a |
| --text-inverse | #fbfdff | #090e13 |
| --text-on-accent | #ffffff | #ffffff |
| --border-hairline | #dee3eb | #20242a |
| --border-control | #81878d | #646971 |
| --border-strong | #81878d | #646971 |
| --accent-solid | #1071b0 | #1b689f |
| --accent-solid-hover | #005990 | #3480bb |
| --accent-tint | #deefff | #132331 |
| --accent-tint-hover | #c2e2ff | #0c304b |
| --accent-text | #005990 | #6eb2ea |
| --accent-border | #73bcf8 | #0c5484 |
| --focus-ring | #005990 | #6eb2ea |
| --danger-solid | #c42123 | #d73431 |
| --danger-on-solid | #ffffff | #ffffff |
| --danger-tint | #ffe6e3 | #391411 |
| --danger-text | #a3000f | #ff7f73 |
| --danger-border | #ff9085 | #99010d |
| --warning-solid | #b57200 | #8a5600 |
| --warning-on-solid | #15191e | #ffffff |
| --warning-tint | #ffe9d0 | #2f1d07 |
| --warning-text | #774a00 | #e19a3a |
| --warning-border | #e9a44d | #704500 |
| --success-solid | #2a9b50 | #007835 |
| --success-on-solid | #15191e | #ffffff |
| --success-tint | #d9f6dd | #102816 |
| --success-text | #00672c | #64c37b |
| --success-border | #72cc87 | #006129 |
| --info-solid | #2389d1 | #0068a6 |
| --info-on-solid | #15191e | #ffffff |
| --info-tint | #deefff | #0f2334 |
| --info-text | #005990 | #5eb2f6 |
| --info-border | #6cbcfd | #005487 |

Contrast (computed, WCAG 2.x): light {"textStrong":17.36,"textBody":17.36,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.23,"accentTextOnCanvas":7.24,"accentSolidVsCanvas":5.13,"focusRing":7.24,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.55,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":5.95,"accentTextOnCanvas":8.09,"accentSolidVsCanvas":3.26,"focusRing":8.5,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 4 / sm 6 / md 8 / lg 12 / xl 16); nested radius = outer - padding.
- MUST use control heights 36/44/52px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 100/180/280/420ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "border": raised = `0 0 0 1px var(--border-hairline)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER colour blobs behind the headline
- NEVER glow on a resting button
- NEVER more than one accent hue
