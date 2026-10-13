# Perch

Apple-light consumer utility: an #f5f5f7 page, one MacBook display tilted back in 3D as the only object, the product living in the notch as a black squircle shelf (Dynamic Island grammar), rounded-friendly display type, an ink keycap CTA that presses, everything else quiet.

**Best for:** Mac and desktop utilities; consumer productivity apps; creator tools
**Avoid for:** dense B2B dashboards; regulated finance; legal
**Personality knobs:** hue 28, neutral neutrals, soft radius, soft depth, comfortable density, springy motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400..700&family=Inter:wght@400;500;600&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- The product lives in the notch: a black squircle shelf that grows out of it
- One tilted MacBook display as the hero object, bleeding off the fold
- Ink keycap CTA that presses 1px

## Type
Display: 'Rubik Variable' · Body: 'Inter Variable' · Mono: 'Geist Mono Variable'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 38-80px fluid | 1 | -0.035em | 500 | display |
| display-lg | 32-49px fluid | 1.1 | -0.015em | 500 | display |
| heading-lg | 31px | 1.25 | -0.008em | 500 | display |
| heading-md | 25px | 1.25 | -0.008em | 500 | display |
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
| --accent-solid | #c02b25 | #cc463c |
| --accent-solid-hover | #a01111 | #e76255 |
| --accent-tint | #ffe6e3 | #361714 |
| --accent-tint-hover | #ffd2cb | #531511 |
| --accent-text | #a01111 | #fe8072 |
| --accent-border | #ff9083 | #901f1a |
| --focus-ring | #a01111 | #fe8072 |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.81,"accentTextOnCanvas":7.98,"accentSolidVsCanvas":5.69,"focusRing":7.98,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.54,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":4.65,"accentTextOnCanvas":7.5,"accentSolidVsCanvas":4.17,"focusRing":7.89,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs 6 / sm 8 / md 12 / lg 16 / xl 24); nested radius = outer - padding.
- MUST use control heights 36/44/52px; buttons and inputs at the same size sit flush.
- MUST space on the scale (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- MUST use durations 90/160/260/380ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "soft": raised = `0 1px 3px 0px rgb(25 24 22 / 0.08)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER a second device in the fold
- NEVER coloured glows behind the type
- NEVER a warm or beige page
- NEVER more than one accent hue outside the wallpaper
