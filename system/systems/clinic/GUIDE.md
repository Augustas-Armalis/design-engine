# Clinic

Health and regulated calm: Lexend headings and Atkinson Hyperlegible body for maximum readability, teal accent, soft depth, comfortable targets.

**Best for:** healthtech; insurance; public services; accessibility-first products
**Avoid for:** edgy creative brands
**Personality knobs:** hue 182, cool neutrals, soft radius, flat depth, comfortable density, calm motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- 18px body minimum
- Teal accent with AAA body contrast
- Every state has text, never colour alone

## Type
Display: 'Lexend' · Body: 'Atkinson Hyperlegible' · Mono: 'IBM Plex Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 31-64px fluid | 1.08 | -0.015em | 600 | display |
| display-lg | 30-45px fluid | 1.1 | -0.015em | 600 | display |
| heading-lg | 31px | 1.25 | -0.008em | 600 | display |
| heading-md | 26px | 1.25 | -0.008em | 600 | display |
| heading-sm | 22px | 1.25 | -0.008em | 600 | body |
| body-lg | 20px | 1.65 | -0.008em | 400 | body |
| body-md | 18px | 1.65 | 0em | 400 | body |
| body-sm | 16px | 1.65 | 0em | 400 | body |
| label-md | 17px | 1.3 | 0em | 500 | body |
| label-sm | 15px | 1.3 | 0em | 500 | body |
| mono-sm | 15px | 1.65 | 0em | 400 | mono |

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
| --accent-solid | #007d70 | #0d7367 |
| --accent-solid-hover | #006459 | #2c8c7e |
| --accent-tint | #d8f4ee | #122623 |
| --accent-tint-hover | #b7eae1 | #083630 |
| --accent-text | #006459 | #6bbcaf |
| --accent-border | #70c7b8 | #005d53 |
| --focus-ring | #006459 | #6bbcaf |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.36,"textBody":17.36,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.02,"accentTextOnCanvas":6.98,"accentSolidVsCanvas":4.92,"focusRing":6.98,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.55,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":5.73,"accentTextOnCanvas":8.31,"accentSolidVsCanvas":3.39,"focusRing":8.73,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 6 / sm 8 / md 12 / lg 16 / xl 24); nested radius = outer - padding.
- MUST use control heights 36/44/52px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 100/180/280/420ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "flat": raised = `0 0 0 1px var(--border-hairline)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER use text below 14px
- NEVER use motion longer than 300ms on functional UI
