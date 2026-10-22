# X plan: Saturday 2026-10-24

Status: **planned, awaiting founder approval**. Slots in Europe/Vilnius (US Eastern in brackets). Nothing here is posted or scheduled: the founder approves, then the X engine imports `x-handoff.json` (its Telegram confirm and Buffer stay theirs).

| # | time | account | format | asset | size | caption | checks |
|---|---|---|---|---|---|---|---|
| 1 | 09:30 (02:30 ET) | @rokasrem | dashboard-closeup · panelry-pipeline 2/4 | panelry-debrief-closeup | 2413x2501 | hiring tools should sum up the interview panel like this | caption ok; preflight 0 fail, 4 warn |
| 2 | 15:30 (08:30 ET) | @rokasrem | dashboard-full · requa-app 2/4 | requa-product-approvals | 3840x2571 | zoomed out: the whole approvals inbox behind the review | caption ok; preflight 0 fail, 7 warn |

## 1. 09:30 @rokasrem: Panelry pipeline and panel debrief, close: the call next to the candidates

- **Format:** `dashboard-closeup` (X engine: `single-still`), 1 image: `library/panelry/debrief-closeup/renders/closeup.png` 2413x2501
- **Crop:** tr corner of #/panelry at [610, 16, 766, 794] (x, y, w, h), insets top 40px, right 40px; a region, not a detail (60% of the window, ratio 1.09; founder x-closeups r1 'some are too close and cuts not nicely'): the left edge sits on the funnel's Onsite divider and in the gap after the score pips and before the search field; the bottom under the whole table and its footer and above the drawer's buttons, so only the window bleeds (a cut at the table's last row read as accidental: fold.end)
- **In the feed:** single at native ratio, 514 wide
- **Caption** (caption.md): "hiring tools should sum up the interview panel like this"
- **First reply** (30-150 min later): "concept work for a hiring app. made at larpo.studio"
- **Quotes:** rokasrem-2026-10-23-0930 (the previous step of the series, XS-16)
- **Why this, why now:** awaiting-verdict 0.75 x single-portrait 0.92 x sqrt(crm-table 3.12) + 0.60 (series panelry-pipeline step 2/4), project in series (XS-17 focus)
- **Verdict:** awaiting-verdict; approval `ready`, auto-approved (no Telegram confirm)
- **Preflight:** 0 FAIL, 4 WARN (`library/panelry/debrief-closeup/preflight/1-closeup.md`)

## 2. 15:30 @rokasrem: Requa approvals inbox and request review, full and in thirds

- **Format:** `dashboard-full` (X engine: `single-still`), 1 image: `library/requa/product-approvals/renders/full.png` 3840x2571
- **Crop:** equal canvas margin on all four sides (56px at 1x on cprodb)
- **In the feed:** single landscape at native 3:2, 514x343
- **Caption** (caption.md): "zoomed out: the whole approvals inbox behind the review"
- **First reply** (30-150 min later): "concept work for a spend app. made at larpo.studio"
- **Quotes:** rokasrem-2026-10-23-1530 (the previous step of the series, XS-16)
- **Why this, why now:** awaiting-verdict 0.75 x single-landscape 0.98 x sqrt(dashboard 2.05) + 0.60 (series requa-app step 2/4), project in series (XS-17 focus)
- **Verdict:** awaiting-verdict; approval `ready`, auto-approved (no Telegram confirm)
- **Preflight:** 0 FAIL, 7 WARN (`library/requa/product-approvals/preflight/1-full-and-strips.md`)

## Yours to post by hand: @augustasdesign (never scheduled)

In series order: post one a day, the close-up first, then the hero or full view, then the thirds (XS-15). Caption options are written for your account; the first reply carries "concept".

1. **Tempra Ask rail, close: the answer for five calendars** (`tempra-ask-closeup`, awaiting-verdict; preflight 0 FAIL)
   - `dashboard-closeup`: `library/tempra/ask-closeup/renders/closeup.png` 2154x2562; captions: "closer look at the ask panel 👀" / "the detail in this little answer card is unreal" / "my favorite panel in the whole calendar 🫠"
   - first reply: "concept, made at larpo.studio"
2. **Tempra hero: every meeting finds its own hour** (`tempra-hero-h4a`, awaiting-verdict, last verdict partial; preflight 0 FAIL)
   - `hero-still`: `library/tempra/hero-h4a/renders/hero.png` 3840x2760; captions: "probably the cleanest calendar hero i've made 👀" / "the product shot under this hero is unreal" / "scheduling sites can look this calm"
   - first reply: "concept, made at larpo.studio"
3. **Tempra week view with the Ask rail, full and in thirds** (`tempra-product-week`, awaiting-verdict, last verdict partial; preflight 0 FAIL)
   - `dashboard-full`: `library/tempra/product-week/renders/full.png` 3840x2571; captions: "the most detailed calendar i've designed so far 👀" / "this week view turned out way too clean" / "scheduling software can look like this"
   - `dashboard-strips-3`: `library/tempra/product-week/renders/strip-1.png` 1280x2571, `library/tempra/product-week/renders/strip-2.png` 1280x2571, `library/tempra/product-week/renders/strip-3.png` 1280x2571; captions: "could look at this week view all day 😍" / "my favorite product screen i've built this year" / "every calendar app should get this much care"
   - first reply: "concept, made at larpo.studio"
4. **Tempra dark feature bento** (`tempra-bento-dark`, accepted, last verdict accept; preflight 0 FAIL)
   - `bento-still`: `library/tempra/bento-dark/renders/bento.png` 3840x3200; captions: "this dark bento turned out way too clean 🔥" / "probably my favorite bento i've made so far 🫠" / "feature sections deserve this much detail"
   - first reply: "concept, made at larpo.studio"

## To make (the library could not fill these)

- **requa-site** motion, due (1 d after hero): a load-in of #/requahero once motion is asked for
- **1 more post(s) to reach 3:** nothing postable left in the hero, section, component, motion families without repeating one today; design one (a component post, a pricing or changelog section, a light/dark pair) and add it to the library

## Notes

- daily volume from knowledge/x/cadence.json: 3-5 posts, <= 2 on @augustasdesign, <= 1 per co-founder, >= 6 h apart on one account (XS-01, XS-02)
- scheduled accounts: @rokasrem (<= 3/day, never-posted designs only); by hand only: @augustasdesign (system/x/accounts.json)
- captions also pass the X engine's own checkCaption (~/dev/larpo-x-engine/shared/gate.mjs), the check its Worker runs before Buffer
- assumed going out (planned, not yet in posted.json): 2026-10-23 panelry-product-pipeline, 2026-10-23 requa-review-closeup, 2026-10-23 requa-hero
- candidates: panelry-debrief-closeup dashboard-closeup 1.819 (picked); requa-product-approvals dashboard-full 1.652 (picked)
