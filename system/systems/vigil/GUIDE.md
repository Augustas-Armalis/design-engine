# Vigil

Night-shift security: near-black cool field, a single lime signal for anything that needs a human, Geist with tight tracking, dithered radar texture, hairline panels.

**Best for:** security and SOC tools; observability; infra AI agents
**Avoid for:** consumer wellness; warm editorial brands
**Personality knobs:** hue 128, cool neutrals, default radius, border depth, default density, snappy motion.
**Load:** `<link rel="stylesheet" href="">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Lime is the signal: only for things that need a human and the one primary action
- Dark-first; hairline panels instead of shadows
- Radar and dither texture as the brand field

## Type
Display: 'Geist Variable' · Body: 'Geist Variable' · Mono: 'Geist Mono Variable'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 36-76px fluid | 1.02 | -0.05em | 600 | display |
| display-lg | 32-49px fluid | 1.1 | -0.015em | 600 | display |
| heading-lg | 31px | 1.25 | -0.008em | 600 | display |
| heading-md | 25px | 1.25 | -0.008em | 600 | display |
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
| --accent-solid | #547a00 | #4d7000 |
| --accent-solid-hover | #426100 | #608a00 |
| --accent-tint | #e1f5cb | #1a2607 |
| --accent-tint-hover | #c9ec9e | #223500 |
| --accent-text | #426100 | #8cbd3d |
| --accent-border | #94c83c | #3d5b00 |
| --focus-ring | #426100 | #8cbd3d |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.36,"textBody":17.36,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.06,"accentTextOnCanvas":7.03,"accentSolidVsCanvas":4.96,"focusRing":7.03,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.55,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":5.76,"accentTextOnCanvas":8.36,"accentSolidVsCanvas":3.37,"focusRing":8.79,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 4 / sm 6 / md 8 / lg 12 / xl 16); nested radius = outer - padding.
- MUST use control heights 32/40/48px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 70/120/200/300ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "border": raised = `0 0 0 1px var(--border-hairline)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER use red for anything but true severity
- NEVER glow everything (one glow: the escalations)
