# Halftone

Creative-tool energy: an expressive variable grotesque at poster scale, magenta accent, soft generous radii, layered depth and springy motion.

**Best for:** AI creative tools; design and media apps; creator economy
**Avoid for:** regulated finance; healthcare; enterprise procurement
**Personality knobs:** hue 345, neutral neutrals, soft radius, layered depth, comfortable density, springy motion.
**Load:** `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap">` then `theme.css`.

## Owned decisions (what makes this system recognisable; keep them)
- Display at weight 800 with optical size, tight but never touching
- Magenta only on the primary action and selection
- Cards float on layered three-step shadows
- Entrances spring with a single overshoot

## Type
Display: 'Bricolage Grotesque' · Body: 'Hanken Grotesk' · Mono: 'DM Mono'

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
| display-xl | 50-104px fluid | 0.94 | -0.04em | 800 | display |
| display-lg | 48-72px fluid | 0.94 | -0.04em | 800 | display |
| heading-lg | 40px | 1.1 | -0.015em | 800 | display |
| heading-md | 30px | 1.25 | -0.008em | 800 | display |
| heading-sm | 23px | 1.25 | -0.008em | 600 | body |
| body-lg | 19px | 1.55 | 0em | 400 | body |
| body-md | 17px | 1.55 | 0em | 400 | body |
| body-sm | 15px | 1.55 | 0em | 400 | body |
| label-md | 16px | 1.3 | 0em | 500 | body |
| label-sm | 14px | 1.3 | 0em | 500 | body |
| mono-sm | 14px | 1.55 | 0em | 400 | mono |

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
| --accent-solid | #b32785 | #bf4392 |
| --accent-solid-hover | #940e6c | #da5eab |
| --accent-tint | #ffe4f2 | #331627 |
| --accent-tint-hover | #ffcde8 | #4d1439 |
| --accent-text | #940e6c | #f27cc2 |
| --accent-border | #ff82cd | #861c63 |
| --focus-ring | #940e6c | #f27cc2 |
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

Contrast (computed, WCAG 2.x): light {"textStrong":17.37,"textBody":17.37,"textMuted":5.88,"controlBorder":3.57,"onAccent":5.9,"accentTextOnCanvas":8.1,"accentSolidVsCanvas":5.79,"focusRing":8.1,"dangerOnSolid":5.84,"dangerTextOnTint":6.91}; dark {"textStrong":17.54,"textBody":16.69,"textMuted":5.94,"controlBorder":3.35,"onAccent":4.73,"accentTextOnCanvas":7.4,"accentSolidVsCanvas":4.11,"focusRing":7.78,"dangerOnSolid":4.73,"dangerTextOnTint":6.62}. All contract targets met.

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
- MUST use depth "layered": raised = `0 1px 2px 0px rgb(25 24 22 / 0.06), 0 2px 4px 0px rgb(25 24 22 / 0.04)`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
- NEVER use gradient text
- NEVER add glow or aurora backgrounds
- NEVER stack more than one magenta element per viewport
