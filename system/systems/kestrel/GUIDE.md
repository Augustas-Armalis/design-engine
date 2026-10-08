# Kestrel

AlignUI-clean product analytics: soft grey canvas, white surfaces on hairlines and layered soft shadows, Inter Display at 550 with tight tracking, one confident blue, the dashboard is the hero.

**Best for:** product analytics; B2B SaaS dashboards; AI copilots for data
**Avoid for:** moody brand campaigns; editorial magazines
**Personality knobs:** hue 264, pure neutrals, default radius, soft depth, default density, calm motion.
**Load:** `<link rel="stylesheet" href="">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- The product dashboard is the hero visual, framed in a double-bezel window
- Rulers and registration ticks frame the canvas, quiet grey
- Blue only for the one action, active states and the primary series

## Type
Display: 'Inter Variable' · Body: 'Inter Variable' · Mono: 'Geist Mono Variable'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 35-72px fluid | 1.05 | -0.045em | 550 | display |
| display-lg | 32-49px fluid | 1.1 | -0.015em | 550 | display |
| heading-lg | 31px | 1.25 | -0.008em | 550 | display |
| heading-md | 25px | 1.25 | -0.008em | 550 | display |
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
| --surface-canvas | #fffcfd | #0f0d0d |
| --surface-raised | #ffffff | #151314 |
| --surface-sunken | #f5f1f2 | #0f0d0d |
| --surface-inverse | #1a1818 | #f6f2f3 |
| --surface-hover | #f5f1f2 | #1d1b1c |
| --surface-active | #eeeaeb | #262324 |
| --text-strong | #1a1818 | #f6f2f3 |
| --text-body | #1a1818 | #f6f2f3 |
| --text-muted | #656263 | #949192 |
| --text-inverse | #fffcfd | #0f0d0d |
| --text-on-accent | #ffffff | #ffffff |
| --border-hairline | #e5e2e3 | #262324 |
| --border-control | #888586 | #6b6869 |
| --border-strong | #888586 | #6b6869 |
| --accent-solid | #2a5ee1 | #2b59c9 |
| --accent-solid-hover | #1a47be | #3e71e8 |
| --accent-tint | #e4edff | #14203c |
| --accent-tint-hover | #cedeff | #122960 |
| --accent-text | #1a47be | #7fa9ff |
| --accent-border | #8eb3ff | #1e46a9 |
| --focus-ring | #1a47be | #7fa9ff |
| --danger-solid | #c42123 | #d73431 |
| --danger-on-solid | #ffffff | #ffffff |
| --danger-tint | #ffe6e3 | #391411 |
| --danger-text | #a3000f | #ff7f73 |
| --danger-border | #ff9085 | #99010d |
| --warning-solid | #b57200 | #8a5600 |
| --warning-on-solid | #1a1818 | #ffffff |
| --warning-tint | #ffe9d0 | #2f1d07 |
| --warning-text | #774a00 | #e19a3a |
| --warning-border | #e9a44d | #704500 |
| --success-solid | #2a9b50 | #007835 |
| --success-on-solid | #1a1818 | #ffffff |
| --success-tint | #d9f6dd | #102816 |
| --success-text | #00672c | #64c37b |
| --success-border | #72cc87 | #006129 |
| --info-solid | #2389d1 | #0068a6 |
| --info-on-solid | #1a1818 | #ffffff |
| --info-tint | #deefff | #0f2334 |
| --info-text | #005990 | #5eb2f6 |
| --info-border | #6cbcfd | #005487 |

Contrast (computed, WCAG 2.x): light {"textStrong":17.36,"textBody":17.36,"textMuted":5.89,"controlBorder":3.57,"onAccent":5.53,"accentTextOnCanvas":7.65,"accentSolidVsCanvas":5.42,"focusRing":7.65,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.52,"textBody":16.68,"textMuted":5.93,"controlBorder":3.35,"onAccent":6.24,"accentTextOnCanvas":7.93,"accentSolidVsCanvas":3.11,"focusRing":8.33,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

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
- MUST use depth "soft": raised = `0 1px 3px 0px rgb(26 24 24 / 0.08)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER dark moody canvases for the marketing hero
- NEVER more than one effect layer
- NEVER decorative charts that do not answer a question
