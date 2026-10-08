# Signal

Developer-tool precision: compact grotesque, hard edges, offset block shadows, one amber signal colour for state, monospace as real data language.

**Best for:** devtools; CLIs and APIs; infra and observability; AI coding products
**Avoid for:** wellness; luxury; children
**Personality knobs:** hue 62, cool neutrals, sharp radius, crisp depth, compact density, snappy motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Zero radius on containers; 2px only on inputs
- Elevation is an offset solid block shadow, never blur
- Amber is reserved for state and the one primary action
- Code and IDs always in mono

## Type
Display: 'Schibsted Grotesk' · Body: 'Schibsted Grotesk' · Mono: 'JetBrains Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 42-88px fluid | 0.98 | -0.035em | 700 | display |
| display-lg | 24-37px fluid | 1.1 | -0.015em | 700 | display |
| heading-lg | 26px | 1.25 | -0.008em | 700 | display |
| heading-md | 22px | 1.25 | -0.008em | 700 | display |
| heading-sm | 18px | 1.55 | 0em | 600 | body |
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
| --text-on-accent | #ffffff | #eef4fc |
| --border-hairline | #dee3eb | #20242a |
| --border-control | #81878d | #646971 |
| --border-strong | #81878d | #646971 |
| --accent-solid | #9d5800 | #915100 |
| --accent-solid-hover | #7d4500 | #764100 |
| --accent-tint | #ffe8d5 | #311c08 |
| --accent-tint-hover | #ffd5b1 | #462400 |
| --accent-text | #7d4500 | #e99541 |
| --accent-border | #f79c42 | #764100 |
| --focus-ring | #7d4500 | #e99541 |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.36,"textBody":17.36,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.47,"accentTextOnCanvas":7.52,"accentSolidVsCanvas":5.36,"focusRing":7.52,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.55,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":5.61,"accentTextOnCanvas":7.74,"accentSolidVsCanvas":3.13,"focusRing":8.14,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 0 / sm 0 / md 2 / lg 2 / xl 4); nested radius = outer - padding.
- MUST use control heights 28/32/40px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 70/120/200/300ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "crisp": raised = `0 0 0 1px var(--border-strong)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER use rounded pill buttons
- NEVER use soft blurred shadows
- NEVER animate longer than 300ms
