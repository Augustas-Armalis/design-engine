# X plan: Saturday 2026-10-24

Status: **planned, awaiting founder approval**. Slots in Europe/Vilnius (US Eastern in brackets). Nothing here is posted or scheduled: the founder approves, then the X engine imports `x-handoff.json` (its Telegram confirm and Buffer stay theirs).

| # | time | account | format | asset | size | caption | checks |
|---|---|---|---|---|---|---|---|
| 1 | 09:30 (02:30 ET) | @rokasrem | dashboard-full · panelry-pipeline 1/4 | panelry-product-pipeline | 3840x2571 | the whole hiring pipeline on one screen | caption ok; preflight 0 fail, 7 warn |
| 2 | 15:30 (08:30 ET) | @rokasrem | dashboard-closeup · requa-app 1/4 | requa-review-closeup | 2403x2493 | three checks before anyone clicks approve | caption ok; preflight 0 fail, 4 warn |
| 3 | 21:30 (14:30 ET) | @rokasrem | hero-still · requa-site 1/2 | requa-hero | 3840x2400 | approval software should feel this calm | caption ok; preflight 0 fail, 5 warn |

## 1. 09:30 @rokasrem: Panelry job view: pipeline table and the candidate debrief, full and in thirds

- **Format:** `dashboard-full` (X engine: `single-still`), 1 image: `library/panelry/product-pipeline/renders/full.png` 3840x2571
- **Crop:** equal canvas margin on all four sides (56px at 1x on cprodb)
- **In the feed:** single landscape at native 3:2, 514x343
- **Caption** (caption.md): "the whole hiring pipeline on one screen"
- **First reply** (30-150 min later): "concept work for a hiring app. made at larpo.studio"
- **Quotes:** none (series start)
- **Why this, why now:** awaiting-verdict 0.75 x single-landscape 0.98 x sqrt(crm-table 3.12) + 0.15 (series panelry-pipeline step 1/4)
- **Verdict:** awaiting-verdict; approval `ready`, auto-approved (no Telegram confirm)
- **Preflight:** 0 FAIL, 7 WARN (`library/panelry/product-pipeline/preflight/1-full-and-strips.md`)

## 2. 15:30 @rokasrem: Requa request review, close: three checks, the budget, the chain

- **Format:** `dashboard-closeup` (X engine: `single-still`), 1 image: `library/requa/review-closeup/renders/closeup.png` 2403x2493
- **Crop:** tr corner of #/requa at [625, 16, 751, 779] (x, y, w, h), insets top 40px, right 40px; a region (59% of the window, ratio 0.96): the left edge just past the inbox divider, the bottom under the notes and above the buttons, so only the window bleeds
- **In the feed:** single at native ratio, 514 wide
- **Caption** (caption.md): "three checks before anyone clicks approve"
- **First reply** (30-150 min later): "concept work for a spend app. made at larpo.studio"
- **Quotes:** none (series start)
- **Why this, why now:** awaiting-verdict 0.75 x single-portrait 0.92 x sqrt(dashboard 2.05) + 0.45 (series requa-app step 1/4), project in series (XS-17 focus)
- **Verdict:** awaiting-verdict; approval `ready`, auto-approved (no Telegram confirm)
- **Preflight:** 0 FAIL, 4 WARN (`library/requa/review-closeup/preflight/1-closeup.md`)

## 3. 21:30 @rokasrem: Requa split hero: spend, approved before noon

- **Format:** `hero-still` (X engine: `single-still`), 1 image: `library/requa/hero/renders/hero.png` 3840x2400
- **Crop:** the whole 1440x900 fold; the fold already ends on a progressive blur or a deliberate cut (fold.end)
- **In the feed:** single landscape at native 16:10, full width 514x321
- **Caption** (caption.md): "approval software should feel this calm"
- **First reply** (30-150 min later): "concept work for a spend app. made at larpo.studio"
- **Quotes:** none (series start)
- **Why this, why now:** awaiting-verdict 0.75 x single-landscape 0.98 x sqrt(hero 1.21) + 0.45 (series requa-site step 1/2), project in series (XS-17 focus)
- **Verdict:** awaiting-verdict; approval `ready`, auto-approved (no Telegram confirm)
- **Preflight:** 0 FAIL, 5 WARN (`library/requa/hero/preflight/1-hero.md`)

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

## Notes

- daily volume from knowledge/x/cadence.json: 3-5 posts, <= 2 on @augustasdesign, <= 1 per co-founder, >= 6 h apart on one account (XS-01, XS-02)
- scheduled accounts: @rokasrem (<= 3/day, never-posted designs only); by hand only: @augustasdesign (system/x/accounts.json)
- captions also pass the X engine's own checkCaption (~/dev/larpo-x-engine/shared/gate.mjs), the check its Worker runs before Buffer
- candidates: panelry-product-pipeline dashboard-full 1.448 (picked); requa-review-closeup dashboard-closeup 1.438 (picked); requa-hero hero-still 1.258 (picked)
