# X plan: Sunday 2026-10-25

Status: **planned, awaiting founder approval**. Slots in Europe/Vilnius (US Eastern in brackets). Nothing here is posted or scheduled: the founder approves, then the X engine imports `x-handoff.json` (its Telegram confirm and Buffer stay theirs).

| # | time | account | format | asset | size | caption | checks |
|---|---|---|---|---|---|---|---|
| 1 | 09:30 (03:30 ET) | @rokasrem | dashboard-strips-3 · panelry-pipeline 3/4 | panelry-product-pipeline | 1280x2571 + 1280x2571 + 1280x2571 | applicant tracking can look this considered | caption ok; preflight 0 fail, 7 warn |

## 1. 09:30 @rokasrem: Panelry job view: pipeline table and the candidate debrief, full and in thirds

- **Format:** `dashboard-strips-3` (X engine: `strips-3`), 3 images: `library/panelry/product-pipeline/renders/strip-1.png` 1280x2571, `library/panelry/product-pipeline/renders/strip-2.png` 1280x2571, `library/panelry/product-pipeline/renders/strip-3.png` 1280x2571
- **Crop:** equal thirds of the full canvas; seams fall in gutters where they can (post.seams WARN)
- **In the feed:** 3-up: strip 1 shows as a 7:8 tile (its middle 56%), strips 2-3 as 16:9 tiles (their middle 28%); the lightbox shows each whole. Lead with the strongest strip
- **Caption** (caption.md): "applicant tracking can look this considered"
- **First reply** (30-150 min later): "concept work for a hiring app. made at larpo.studio"
- **Quotes:** rokasrem-2026-10-24-0930 (the previous step of the series, XS-16)
- **Why this, why now:** awaiting-verdict 0.75 x carousel-3-vertical-thirds 1.33 x sqrt(crm-table 3.12) + 0.60 (series panelry-pipeline step 3/4), project in series (XS-17 focus)
- **Verdict:** awaiting-verdict; approval `ready`, auto-approved (no Telegram confirm)
- **Preflight:** 0 FAIL, 7 WARN (`library/panelry/product-pipeline/preflight/1-full-and-strips.md`)

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

- **requa-site** motion, overdue (2 d after hero): a load-in of #/requahero once motion is asked for
- **1 more post(s) to reach 3:** nothing postable left in the hero, section, component, motion families without repeating one today; design one (a component post, a pricing or changelog section, a light/dark pair) and add it to the library

## Held back

- requa-product-approvals: no free slot or account left today

## Notes

- daily volume from knowledge/x/cadence.json: 3-5 posts, <= 2 on @augustasdesign, <= 1 per co-founder, >= 6 h apart on one account (XS-01, XS-02)
- scheduled accounts: @rokasrem (<= 3/day, never-posted designs only); by hand only: @augustasdesign (system/x/accounts.json)
- captions also pass the X engine's own checkCaption (~/dev/larpo-x-engine/shared/gate.mjs), the check its Worker runs before Buffer
- assumed going out (planned, not yet in posted.json): 2026-10-23 panelry-product-pipeline, 2026-10-23 requa-review-closeup, 2026-10-23 requa-hero, 2026-10-24 panelry-debrief-closeup, 2026-10-24 requa-product-approvals
- candidates: panelry-product-pipeline dashboard-strips-3 2.362 (picked); requa-product-approvals dashboard-strips-3 2.028 (picked)
