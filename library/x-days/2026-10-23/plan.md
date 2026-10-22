# X plan: Friday 2026-10-23 (sample day 1)

Status: **sample day 1, awaiting founder verdict**. Slots in Europe/Vilnius (US Eastern in brackets). Nothing here is posted or scheduled: the founder approves, then the X engine imports `x-handoff.json` (its Telegram confirm and Buffer stay theirs).

| # | time | account | format | asset | size | caption | checks |
|---|---|---|---|---|---|---|---|
| 1 | 08:00 (01:00 ET) | @augustasdesign | dashboard-closeup · tempra-week 1/4 | tempra-ask-closeup | 2154x2562 | ai scheduling panel, up close 👀 | caption ok; preflight 0 fail, 5 warn |
| 2 | 14:30 (07:30 ET) | @augustasdesign | hero-still · tempra-hero 1/2 | tempra-hero-h4a | 3840x2760 | detailed hero for a team calendar 👀 | caption ok; preflight 0 fail, 7 warn |
| 3 | 16:00 (09:00 ET) | @faulkner_Design | bento-still · tempra-bento 1/2 | tempra-bento-dark | 3840x3200 | each cell shows one thing the product does. no filler cells. | caption ok; preflight 0 fail, 1 warn |

## 1. 08:00 @augustasdesign: Tempra Ask rail, close: the answer for five calendars

- **Format:** `dashboard-closeup` (X engine: `single-still`), 1 image: `library/tempra/ask-closeup/renders/closeup.png` 2154x2562
- **Crop:** tr corner of #/cprodb at [1017, 16, 359, 427] (x, y, w, h), insets top 40px, right 40px; left and bottom edges in gutters (tools/library.mjs snap moved 0px): the left edge runs inside the rail just past its divider, the bottom on the divider between the 2nd and 3rd answer rows
- **In the feed:** single portrait at native 5:6, 514x617
- **Caption** (caption.md): "ai scheduling panel, up close 👀"
- **First reply** (30-150 min later): "made at larpo.studio, concept"
- **Quotes:** none (series start)
- **Why this, why now:** awaiting-verdict 0.75 x single-portrait 0.92 x sqrt(calendar 1.93) + 0.45 (series tempra-week step 1/4), project in series (XS-17 focus)
- **Verdict:** awaiting-verdict; approval `draft`, Telegram confirm required
- **Preflight:** 0 FAIL, 5 WARN (`library/tempra/ask-closeup/preflight/1-closeup.md`)

## 2. 14:30 @augustasdesign: Tempra hero: every meeting finds its own hour

- **Format:** `hero-still` (X engine: `single-still`), 1 image: `library/tempra/hero-h4a/renders/hero.png` 3840x2760
- **Crop:** the whole 1440x900 fold; the fold already ends on a progressive blur or a deliberate cut (fold.end)
- **In the feed:** single landscape at native 16:10, full width 514x321
- **Caption** (caption.md): "detailed hero for a team calendar 👀"
- **First reply** (30-150 min later): "made at larpo.studio, concept"
- **Quotes:** none (series start)
- **Why this, why now:** awaiting-verdict 0.75 x single-landscape 1 x sqrt(hero 1.21) + 0.45 (series tempra-hero step 1/2), project in series (XS-17 focus)
- **Verdict:** awaiting-verdict (last: partial); approval `draft`, Telegram confirm required
- **Preflight:** 0 FAIL, 7 WARN (`library/tempra/hero-h4a/preflight/1-hero.md`)

## 3. 16:00 @faulkner_Design: Tempra dark feature bento

- **Format:** `bento-still` (X engine: `single-still`), 1 image: `library/tempra/bento-dark/renders/bento.png` 3840x3200
- **Crop:** the whole section with its own margins
- **In the feed:** single landscape at native 6:5, 514x428
- **Caption** (caption.md): "each cell shows one thing the product does. no filler cells."
- **First reply** (30-150 min later): "concept for a team calendar. made at larpo.studio"
- **Quotes:** none (series start)
- **Why this, why now:** accepted 1 x single-landscape 1 x sqrt(bento-card 0.73) + 0.45 (series tempra-bento step 1/2), project in series (XS-17 focus)
- **Verdict:** accepted (last: accept); approval `draft`, Telegram confirm required
- **Preflight:** 0 FAIL, 1 WARN (`library/tempra/bento-dark/preflight/1-bento.md`)

## To make (the library could not fill these)

- **1 more post(s) to reach 4:** nothing postable left in the component, motion families without repeating one today; design one (a component post, a pricing or changelog section, a light/dark pair) and add it to the library

## Notes

- daily volume from knowledge/x/cadence.json: 3-5 posts, <= 2 on @augustasdesign, <= 1 per co-founder, >= 6 h apart on one account (XS-01, XS-02)
- captions also pass the X engine's own checkCaption (~/dev/larpo-x-engine/shared/gate.mjs), the check its Worker runs before Buffer
- candidates: tempra-ask-closeup dashboard-closeup 1.409 (picked); tempra-bento-dark bento-still 1.304 (picked); tempra-hero-h4a hero-still 1.275 (picked)
