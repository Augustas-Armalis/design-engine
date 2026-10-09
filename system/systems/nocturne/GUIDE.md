# Nocturne

Dark-first: deep blue-black night, a planet horizon where dawn breaks behind the product, warm amber as the single accent (the morning), Geist at 560, glass product surfaces with lit top edges.

**Best for:** AI agents; developer tools; background automation
**Avoid for:** daytime consumer brands
**Personality knobs:** hue 62, cool neutrals, default radius, border depth, default density, calm motion.
**Load:** `<link rel="stylesheet" href="">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Dawn horizon: light rises behind the product as the night's work completes
- Amber only for the morning: highlights, the rim light, 'ready' states
- Glass surfaces with a lit top edge

## Type
Display: 'Geist Variable' · Body: 'Geist Variable' · Mono: 'Geist Mono Variable'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 35-72px fluid | 1.04 | -0.045em | 560 | display |
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
| --accent-solid | #9d5800 | #915100 |
| --accent-solid-hover | #7d4500 | #ae6716 |
| --accent-tint | #ffe8d5 | #2e1d0e |
| --accent-tint-hover | #ffd5b1 | #452501 |
| --accent-text | #7d4500 | #df9a5a |
| --accent-border | #eca25d | #764100 |
| --focus-ring | #7d4500 | #df9a5a |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.36,"textBody":17.36,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.47,"accentTextOnCanvas":7.52,"accentSolidVsCanvas":5.36,"focusRing":7.52,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.55,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":6.21,"accentTextOnCanvas":7.8,"accentSolidVsCanvas":3.13,"focusRing":8.2,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

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
- NEVER mono poster headlines
- NEVER neon glows
- NEVER more than one accent hue
