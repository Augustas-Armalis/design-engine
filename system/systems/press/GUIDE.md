# Press

Editorial media and research: Instrument Serif headlines, Onest body, ultramarine ink accent, sharp corners, crisp offset depth, print-like rhythm.

**Best for:** research tools; newsletters and media; knowledge products; AI search
**Avoid for:** fintech dashboards; children
**Personality knobs:** hue 268, neutral neutrals, sharp radius, crisp depth, default density, calm motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Onest:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Instrument Serif at weight 400 only, italic for emphasis
- Ultramarine ink used like a pen: links, rules, one action
- Rules and columns borrowed from print

## Type
Display: 'Instrument Serif' · Body: 'Onest' · Mono: 'JetBrains Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 54-112px fluid | 0.98 | -0.015em | 400 | display |
| display-lg | 48-72px fluid | 0.98 | -0.015em | 400 | display |
| heading-lg | 40px | 1.1 | -0.015em | 400 | display |
| heading-md | 30px | 1.25 | -0.008em | 400 | display |
| heading-sm | 23px | 1.25 | -0.008em | 600 | body |
| body-lg | 19px | 1.62 | 0em | 400 | body |
| body-md | 17px | 1.62 | 0em | 400 | body |
| body-sm | 15px | 1.62 | 0em | 400 | body |
| label-md | 16px | 1.3 | 0em | 500 | body |
| label-sm | 14px | 1.3 | 0em | 500 | body |
| mono-sm | 14px | 1.62 | 0em | 400 | mono |

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
| --accent-solid | #3f5fd6 | #3c59c0 |
| --accent-solid-hover | #2d48b4 | #4f71de |
| --accent-tint | #e5edff | #17203a |
| --accent-tint-hover | #d0deff | #1a295c |
| --accent-text | #2d48b4 | #87a7ff |
| --accent-border | #94b1ff | #2d46a0 |
| --focus-ring | #2d48b4 | #87a7ff |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.52,"accentTextOnCanvas":7.64,"accentSolidVsCanvas":5.42,"focusRing":7.64,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.54,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":6.23,"accentTextOnCanvas":7.88,"accentSolidVsCanvas":3.12,"focusRing":8.29,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 0 / sm 0 / md 2 / lg 2 / xl 4); nested radius = outer - padding.
- MUST use control heights 32/40/48px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 100/180/280/420ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "crisp": raised = `0 0 0 1px var(--border-strong)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER use gradients (ultramarine must stay flat ink)
- NEVER use bold serif
