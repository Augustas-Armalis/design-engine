# X plan: Friday 2026-10-23 (sample day 1)

Status: **sample day 1, awaiting founder verdict**. Slots in Europe/Vilnius (US Eastern in brackets). Nothing here is posted or scheduled: the founder approves, then the X engine imports `x-handoff.json` (its Telegram confirm and Buffer stay theirs).

| # | time | account | format | asset | size | caption | checks |
|---|---|---|---|---|---|---|---|
| 1 | 16:00 (09:00 ET) | @rokasrem | dashboard-closeup · panelry-pipeline 1/4 | panelry-debrief-closeup | 2241x2402 | hiring tools should sum up the interview panel like this | caption ok; preflight 0 fail, 4 warn |

## 1. 16:00 @rokasrem: Panelry panel debrief, close: four scorecards, one call

- **Format:** `dashboard-closeup` (X engine: `single-still`), 1 image: `library/panelry/debrief-closeup/renders/closeup.png` 2241x2402
- **Crop:** tr corner of #/panelry at [945, 16, 431, 462] (x, y, w, h), insets top 40px, right 40px; left and bottom edges in gutters (tools/library.mjs snap moved 0px): the left edge runs just inside the drawer, the bottom in the gap under the four signal bars (471-485 after the r1b drawer fix), so the debrief card bleeds off the bottom
- **In the feed:** single portrait at native 5:6, 514x617
- **Caption** (caption.md): "hiring tools should sum up the interview panel like this"
- **First reply** (30-150 min later): "concept work for a hiring app. made at larpo.studio"
- **Quotes:** none (series start)
- **Why this, why now:** awaiting-verdict 0.75 x single-portrait 0.92 x sqrt(crm-table 3.12) + 0.15 (series panelry-pipeline step 1/4)
- **Verdict:** awaiting-verdict; approval `draft`, Telegram confirm required
- **Preflight:** 0 FAIL, 4 WARN (`library/panelry/debrief-closeup/preflight/1-closeup.md`)

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
- scheduled accounts: @rokasrem (<= 1/day, never-posted designs only); by hand only: @augustasdesign (system/x/accounts.json)
- captions also pass the X engine's own checkCaption (~/dev/larpo-x-engine/shared/gate.mjs), the check its Worker runs before Buffer
- candidates: panelry-debrief-closeup dashboard-closeup 1.369 (picked)
