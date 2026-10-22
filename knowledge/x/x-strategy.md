---
source: web:x.com via api.fxtwitter.com/2/profile/<handle>/statuses (public FixTweet mirror, no login): @marcelkargul, @kargulstudio, @_heyrico, and the four Larpo founders @augustasdesign, @faulkner_Design, @marius_vanagas, @rokasrem (1,669 statuses, 2026-10-22) + knowledge/web/x-design-posts.md (29-account study, XP-01..28) + knowledge/web/heyrico-deep-2026-10.md (RD-36..38) + knowledge/larpo/larpo-brand-and-constraints.md (LBC-27, 40-48) + knowledge/founder/canon/post-component.md
chapter: X posting strategy for the founders' accounts: daily volume, slots, format rotation, series grammar with day gaps, repeat windows, captions, what never to post
pages: n/a (web; timelines captured 2026-10-22; evidence in knowledge/benchmarks/x-strategy-2026-10/)
topic_tags: [x, twitter, posting-plan, cadence, schedule, time-of-day, timezone, format-mix, carousel, vertical-thirds, video, series, sequencing, quote-tweet, repost, cooldown, captions, lowercase, links, founders, larpo, marcelkargul, heyrico]
status: studied
---

# X strategy: how the best design accounts sequence posts, and what the Larpo founders should post each day

Credits: every post studied belongs to its author (Marcel Kargul and Kargul Studio, rico and Ace Studio, and their clients; the four Larpo founders). Study evidence only; never repost, copy or trace. Capture method and limits: `knowledge/benchmarks/x-strategy-2026-10/CREDITS.md`. Derived tables: `data/_analysis.json`, `_series.json`, `_extra.json` in the same folder. Machine-readable plan defaults: `knowledge/x/cadence.json`. Caption voices: `knowledge/x/caption-voice.md`.

Evidence tags: **[D]** counted from the timelines in this study; **[XP]** a rule or number from `knowledge/web/x-design-posts.md`; **[RD]** from `heyrico-deep-2026-10.md`; **[LBC]** a Larpo decision in `larpo-brand-and-constraints.md`; **[F]** founder canon. "rel" = a post's likes divided by its author's median likes on media posts in the same window (relV = views, relB = bookmarks), so a 60k account and a 10k account compare fairly. Times are Europe/Vilnius (UTC+3 until 25 Oct 2026, UTC+2 after) with US Eastern in brackets.

## 0. The one-paragraph answer

The studios that grow on X post **every day at fixed slots** (rico 2.1 posts a day on 93% of days at 16:00 / 18:00 / 19:30 / 20:00; Marcel 6.2 a day; @kargulstudio one uncaptioned still a day), and they **sequence one project across many posts**: a full screen, then the same screen cut into **three vertical thirds** a few hours later, then a close-up or "closer view", then a motion version, each new post **quoting the previous one** (49% of Marcel's and 51% of rico's originals quote their own earlier post; median gap 0.8 and 2.6 days), and the same image **comes back after 1-6 weeks** under a new caption (rico: second showing 0.92x the first; 4-14 days later 1.15x; within 3 days 0.49x). For the founders, the evidence says: **3-5 posts a day across the four accounts, never more than 2 media posts per account per day** (Augustas's third post of a day earned 0.45x and his fourth 0.12x of his median, n=321), **lead each day with product UI** (dashboards 2.05x, sidebars 2.49x vs bento/cards 0.73x and pricing 0.36x on his account), and make the **vertical-thirds carousel the anchor format** (his best design post of the current era: 819 likes, 37.6k views, 706 bookmarks, 17.6x his median). Motion works as the **follow-up to a still that already landed** (his animated quote 1.5 days later: 359 likes, 7.7x), not as a cold lead (0.68-0.78x). Captions: **lowercase, 4-10 words, name the UI part plus at most one judgement** (7-10 words 1.16x, 1-3 words 0.72x), no questions, no links or @mentions in the post (link in post 0.33x; link in a self-reply 1.02x). The three co-founder accounts have 4 followers and 10-26 median views: posting more on them does not create reach; Augustas's account has to carry and quote them.

## 1. Method and limits

| Surface | What | Evidence |
|---|---|---|
| 7 timelines through api.fxtwitter.com | 1,669 statuses; text, timestamps, likes, reposts, replies, quotes, bookmarks, views, media type and pixel size, video duration, reply and quote targets, self-reposts | `benchmarks/x-strategy-2026-10/data/<handle>.json` [D] |
| Windows | Marcel last 30 days (183 originals), rico last 60 days (127), @kargulstudio 8 Sep - 21 Oct (39), Augustas era 1 (19 Jul 2025 - 3 Mar 2026, 333) and current era (23 Aug - 20 Oct 2026, 25), Faulkner 24, Rokas 30, Marius 1 | `_analysis.json` [D] |
| rico image reuse | 700 images, 16x16 dHash near-duplicate clusters from the earlier study, joined to post dates and counts | `heyrico-x/img-classification.tsv` -> `_analysis.json.rico` [D] |
| Founder thumbnails | 8 of the founders' own posts at `name=small` to see the format | `benchmarks/x-strategy-2026-10/founders/` |
| Prior rules | display sizes, tile crops, algorithm weights (XP), rico's cheatsheet and reuse rules (RD), Larpo caption doctrine (LBC) | cited per rule |

Limits:
- The three co-founder accounts (4 followers each; medians 1-3 likes, 10-80 views) cannot rank anything; their rules come from Augustas's account and the benchmarks.
- Hour-of-day effects are confounded with "first post of the day": on Augustas's account every later post of a day underperforms whatever the hour (section 3, XS-03).
- Counts are one snapshot; posts from the last day are still growing.
- Small cells are flagged with n. Treat n < 10 as direction, not law (same caution as LBC-46: the founders' own team noted seven timed posts cannot answer timing).
- Off-topic viral posts (Augustas "iPhone Duo 3 months of use", 1,230 likes, 361k views, 26x) are kept in the data but never used as a format signal; medians are robust to them.

## 2. Core ideas

1. **Daily presence at fixed slots beats bursts.** rico posts on 93% of days, 2-5 posts, at the same four clock times; @kargulstudio posts once a day with a median gap of 24.6 h; Marcel posts every day. The founders post in bursts: Augustas on 26% of days in the current era, Faulkner on 24% (three posts at 08:00, 13:00, 18:00 then nothing for up to 14 days). [D]
2. **Per account, the first post of the day earns the most and every extra post earns less.** Augustas era 1 (n=321 media posts): first of the day 1.12x, second 0.71x, third 0.45x, fourth 0.12x; days with 2 posts 1.27x median, days with 3 posts 0.55x. This matches X's author-diversity decay (XP-26). Big accounts flatten the curve (Marcel shows none at 60k followers; rico 1.20 / 0.88 / 1.09 / 0.75). [D][XP]
3. **Product UI is what this audience saves.** On Augustas's account: dashboards 2.05x likes and 3.58x bookmarks (n=20), sidebars 2.49x (n=11), heroes 1.21x (n=39), bento and cards 0.73x (n=29), pricing 0.36x (n=5). Marcel: dashboards 1.45x, CRM/tables 3.12x, branding/illustration 0.60x; rico: dashboards 2.17x, settings/modal/onboarding 1.33x, branding 0.80x. Specs and resources (cheatsheets, free files, open source) are the outliers on top: Marcel 6.93x, rico 2.72x likes and 5.46x bookmarks. [D]
4. **The vertical-thirds carousel is the strongest still format here.** Three tall slices cut from one wide screen (Marcel 960x2048 x3 from a 2880x2048 screen; Augustas 1031x2048 x3): Augustas 17.6x (n=1, his best design post since August), Marcel 2.0x likes and 2.37x views (n=4); pooled 1.33x (n=9). Portrait pairs (4:5 to 7:8) are second: pooled 1.21x likes, 1.28x views (n=36). Same-size 4-ups are weak (0.85x, n=23). [D]
5. **One project becomes a series of posts.** Marcel's workflow editor ran five times in 17 days (UI still, open-sourced, Figma file, dashboard still, tutorial video); rico's Alpaca product ran 14 times over 132 days (median gap 6 days); Augustas's dashboard ran as thirds, then the hero that contains it (next day), then the animated version (1.5 days). [D]
6. **Follow-ups quote the previous post.** Marcel 49% and rico 51% of originals quote one of their own earlier posts (median gap 0.8 and 2.56 days). Quoting posts draw more views than non-quoting ones (Marcel 1.26x vs 0.88x, rico 0.91x vs 0.78x) at slightly fewer likes (0.96 vs 1.11; 0.87 vs 1.03): the quote resurfaces the earlier post and gives context. Augustas quotes himself on 5% of posts. [D]
7. **Reuse has a window.** rico's 129 re-shown images: first reuse after a median 19 days (p25 15, p75 42); the second showing earns 0.92x the first, the third 0.61x. By gap: within 3 days 0.49x (n=5), 4-14 days 1.15x (n=23), 15-30 days 0.88x (n=54), 31-60 days 1.06x (n=31), over 60 days 0.53x (n=16). His 4-up re-posted one day later fell from 653 to 138 likes. [D]
8. **Motion is a second act.** As a cold lead, video ran below stills on Augustas's account (0.78x era 1, n=21; 0.68x now, n=4; loops of 4-18 s) and pooled (0.88x likes, 0.80x views, 1.26x bookmarks). As a quote of a still that already worked it lands: Marcel still -> video quotes 1.51x the quoted still's likes (n=10, median gap 0.61 days); Augustas's "animated" quote of his thirds 1.52 days later earned 359 likes (7.7x). Long walkthroughs that carry a resource are a different format (Marcel videos over 45 s, 3.08x, n=6). [D]
9. **Links and names live in the reply.** Augustas era 1: external link in the post 0.33x likes and 0.53x views (n=14); posts with a link in a self-reply 1.02x / 1.07x (n=223); @mentions in the caption 0.53x (n=17). rico attaches "check our work + url" to every post as a self-reply a median 155 min later (117 of 117). [D]
10. **Short, specific captions win; questions and empty labels do not.** Augustas both eras: 7-10 words 1.16x (n=79) and 1.18x (n=5), 1-3 words 0.72x (n=65) and 0.74x (n=8). Current-era questions 0.69x (n=6); X-wide questions 0.5x [XP]; Larpo's own reach data puts binary questions and recaps at the bottom (0.2-0.26x) [LBC-44]. [D]
11. **Zero-follower accounts do not grow from volume.** Rokas posted 1.94 times a day for 15 days (median 10 views, 1 like); Faulkner 24 posts (median 26.5 views, 3 likes, 0 bookmarks). Their best single posts reached 124 and 133 views, and @augustasdesign has not reposted or quoted any co-founder post since August (the co-founders reposted him 5 times). The benchmark pattern for a small studio account is the founder quoting it: Marcel quoted two @kargulstudio posts within 0-2 h (123 vs 33 likes). [D]

## 3. Rules

### 3.1 Volume and slots

- **RULE XS-01** Plan 3-5 posts a day across the four founder accounts, with at most 2 media posts per account per day; @augustasdesign carries 1-2 of them and each co-founder account at most 1.
  **Why** Augustas era 1: third post of a day 0.45x, fourth 0.12x; days with 3 posts 0.55x vs 1.27x with 2 (n=205 days). Co-founder accounts get 10-26 median views, so their extra posts add almost nothing. X decays each further post by one author in a viewer's feed [XP-26].
  **Applies to** posting plans. **Check** per account per Vilnius date: media posts <= 2; network total 3-5. **Source** `augustasdesign.json` era 1 via `_extra.json.augustasdesign.era1.nthPostOfDay/dayLoad`; `rokasrem.json`, `faulkner_Design.json`.

- **RULE XS-02** Space two posts from the same account at least 6 hours apart, and put the account's strongest post of the day first.
  **Why** Augustas's later posts within 2-6 h of the previous one earned 0.36x (n=12), 6-12 h later 0.69x (n=97); first posts 1.12x. rico (27k) tolerates closer spacing (<2 h 0.91x, n=38), the founders do not.
  **Applies to** posting plans. **Check** gap between same-account posts >= 6 h; the day's lead asset is the first post. **Source** `_extra.json`; series.mjs gap cut.

- **RULE XS-03** Use the five Vilnius slots 08:00, 14:30, 16:00, 19:30 and 22:00; give the 08:00 slot to @augustasdesign's lead, the 14:30-16:00 window to his second post or a co-founder, 19:30 and 22:00 to co-founders and same-day follow-ups.
  **Why** Augustas's first posts at 06-09 ran 1.15x (n=191) and at 09-12 1.39x (n=8); current era 06-09 1.74x (n=5). rico's best window is 13:00-17:00 (first posts 12-15: 1.22x likes, 1.82x views, n=11; 15-18: 1.22x, n=26). Marcel's is 18:00-21:00 (later posts 1.40x likes, 1.69x views, n=39) = 11:00-14:00 ET; his 00-03 posts drew 2.0x views (n=11). The two benchmark windows sit on the US East morning and lunch (rico 06:00-10:00 ET, Marcel 11:00-14:00 ET).
  **Applies to** posting plans. **Check** each planned post time is one of the five slots (+/- 15 min). **Source** `_extra.json` (nthPostOfDay x hour), `_analysis.json.*.blockEng`; `cadence.json.slotsLocal`.

- **RULE XS-04** Keep the slots in Vilnius local time across the clock changes, and note the ET drift: Vilnius moves to UTC+2 on 25 Oct 2026 and US Eastern to UTC-5 on 1 Nov 2026, so for one week the gap is 6 h instead of 7 h.
  **Why** The benchmark peaks are tied to the US East workday; a fixed UTC schedule would shift every slot by an hour twice a year.
  **Applies to** scheduling. **Check** the planner converts slots with `Europe/Vilnius` and prints the ET equivalent. **Source** tz rules; `cadence.json.timezone`.

- **RULE XS-05** Post every day rather than in bursts: each founder account that is active posts on at least 5 days a week, never 3 posts in one morning followed by silence.
  **Why** rico posts on 93% of days, Marcel 100%, @kargulstudio 82%; Faulkner's three posts at 08:00/13:00/18:00 then up to 14 days of nothing (24% of days) and Augustas's 26% of days in the current era sit at the bottom of their own ranges. Augustas's best months (Sep-Dec 2025, median 157-188 likes) came with posts on 207 of 227 days.
  **Applies to** posting plans. **Check** per account per week: posting days >= 5; no day with 3 posts after a gap > 3 days. **Source** `_analysis.json.*.perDay.daysWithPostShare`; era-1 monthly medians.

- **RULE XS-06** Let @augustasdesign amplify the co-founders, not the reverse: on the day a co-founder posts a strong cut of a series, Augustas reposts it within 0-3 hours (a repost is not one of his two posts), at most once a day; if he quotes it instead, the quote is one of his two posts and must carry its own media (his cut or the motion version), never a text-only quote.
  **Why** The co-founder accounts have 4 followers (median 10-26 views) and Augustas has not reposted or quoted any of them since August, while they reposted him 5 times. Marcel quotes @kargulstudio's posts within 0-2 h (123 and 50 likes vs the studio's 33). Text-only quotes are weak (XS-14).
  **Applies to** cross-account plans. **Check** at most one Augustas repost or quote of a co-founder post per day; time after the original <= 3 h; a quote has media. **Source** `marcelkargul.json` quotes of kargulstudio; `reposts_of_others` in each founder file.

### 3.2 Formats

- **RULE XS-07** Rotate formats to these weekly shares across the network: single stills 35-40%, vertical-thirds carousels 15-20%, portrait pairs 15-20%, motion follow-ups 10-15%, 4-ups of mixed crops 5-10%, text-only 0-5%.
  **Why** Format multipliers (likes / views): vertical thirds 1.33 / 1.12 pooled (Augustas 17.6, Marcel 2.0); portrait pairs 1.21 / 1.28; mixed 4-ups 1.12 / 1.26; single landscape 1.00 / 0.95; video 0.88 / 0.80 (bookmarks 1.26); same-size 4-ups 0.85 / 0.85; quote-only text 0.67 / 1.00. Singles stay the base because a series needs a full view and a hero is one image. The benchmarks' own mixes: rico single 47%, 2-up 34%, 4-up 9%, 3-up 4%; Marcel single 45%, video 16%, text 13%, 4-up 6%, 2-up 4%, 3-up 3%.
  **Applies to** posting plans. **Check** rolling 7-day shares within the bands; no format above 50%. **Source** `_extra.json._pooledSubtypes`, `_analysis.json.*.formats`; XP section 6.1.

- **RULE XS-08** Lead the day with product UI: a dashboard, CRM or table, calendar, inbox, sidebar, settings or onboarding screen; heroes are the default single; bento, cards, pricing and branding go mid-week and never lead.
  **Why** Augustas era 1: dashboards 2.05x likes / 3.58x bookmarks (n=20), sidebars 2.49x (n=11), heroes 1.21x (n=39), bento/cards 0.73x (n=29), pricing 0.36x (n=5). Marcel: dashboards 1.45x, CRM/tables 3.12x, calendar 1.93x, branding/illustration 0.60x. rico: dashboards 2.17x, settings/onboarding 1.33x, branding 0.80x (and his kinds in RD section 8).
  **Applies to** posting plans. **Check** the 08:00 lead's subject is product UI or a hero; bento/pricing/branding never in the 08:00 slot. **Source** subject cuts in this study (`analyze.mjs` regexes reproduced in `_analysis.json`); RD section 8.

- **RULE XS-09** Make the vertical-thirds carousel the anchor still: cut one wide product screen into three equal vertical slices (2880x2048 -> 3 x 960x2048, or 3072x2048 -> 3 x 1024x2048), keep the key UI of each slice in its middle band (45-55% of the slice height), and post the three as one 3-image post.
  **Why** It is the best format for both Augustas (819 likes / 37.6k views / 706 bookmarks, 17.6x) and Marcel (2.0x likes, 2.37x views, n=4; 715 likes on 17 Oct). X shows a 3-image post as one 7:8 tile plus two 16:9 tiles [XP-05], so each tall slice shows only its middle in the feed; the post works as a teaser that people open, which is why the middle band must carry the UI. This deliberately overrides XP-05 for this one format.
  **Applies to** dashboards, CRMs, product screens. **Check** 3 images, same size, each w/h 0.45-0.55, adjacent slices continuous at the cut; key content inside the middle 45-55% band. **Source** `augustasdesign.json` 2110393766754341153; `marcelkargul.json` 2111515571179122856 (17 Oct thirds after the 2111472960452038719 calendar), 2109779159274721437 (13 Oct CRM thirds), 10 Oct posts; XP-05.

- **RULE XS-10** Show two states or two modes as a portrait pair: two images at 4:5 to 7:8 (1760x2000 per XP-04), same crop, one post.
  **Why** Pooled portrait pairs 1.21x likes / 1.28x views (n=36; rico 1.21x, n=32); Augustas's "light dashboard design" pair 2.28x. Rokas's A/B posts put both variants side by side inside one 16:9 image, which reads small at 514 px.
  **Applies to** light/dark, before/after, two states, two screens of one product. **Check** 2 images, w/h 0.78-0.90 each, identical crop box. **Source** `_extra.json`; XP-04, XP-24.

- **RULE XS-11** Use a 4-image post only for a set of different crops of one project (section crops, four screens), each cropped to 16:9; never four same-size full pages.
  **Why** Same-size 4-ups 0.85x (n=23); mixed-crop 4-ups 1.12x likes and 1.26x views (n=32). X shows four 16:9 tiles centre-cropped [XP-06]. rico's same 4-up re-posted next day fell to 0.21x.
  **Applies to** collections, section sets, recap of a series. **Check** 4 images at w/h 1.76-1.79; at most one 4-up per account per week. **Source** `_extra.json`; XP-06.

- **RULE XS-12** A single still is a hero or a full screen at 16:10 to 3:2, exported at 3840 px wide or more.
  **Why** Augustas's heroes are 3840x2400 and 4096x2560 (16:10) and score his baseline (single landscape 0.99x, n=15); Marcel's best singles are 1.4:1 to 3:2 screens (3:2 1.61x, n=12); portrait singles run lower (Marcel 0.65x, rico 0.88x). Display limits: XP-07, XP-11.
  **Applies to** hero and full-screen posts. **Check** w/h 1.5-1.6; width >= 3840. **Source** `_analysis.json.*.aspects`; XP-07, XP-11.

- **RULE XS-13** Post motion as the follow-up to a still that is already performing (quote it 1-2 days later), as a 5-16 s silent loop; a cold video lead is the exception, and a long walkthrough only when it carries a resource.
  **Why** Cold leads: Augustas video 0.78x (era 1, n=21) and 0.68x (now, n=4); his loops are 3-18 s (median 6.5 s; <= 10 s 0.83x, 10-20 s 0.60x). Follow-ups: Augustas's quote of his thirds 1.52 days later 359 likes (7.7x his median, 0.44x the still); Marcel still -> video quotes 1.51x the quoted still (n=10, gap 0.61 d). Quotes of a still 7-15 days later fell to 0.14-0.30x of it (Augustas era 1, n=2). Marcel's >45 s videos ran 3.08x (n=6) because they shipped open-source code or a tutorial. Founder canon: still by default, loop when motion is the point [F post-component]; loop craft XP-02, XP-03.
  **Applies to** animation posts. **Check** video quotes a still of the same series posted 1-2 days earlier; duration 5-16 s; first frame is the finished state. **Source** `_series.json` transitions and motionFollowUps; `augustasdesign.json` 2110944321184620815.

- **RULE XS-14** Keep text-only and quote-only posts out of the founders' plan unless the text is a reusable spec.
  **Why** Quote-only posts: rico 0.19x, Augustas 0.30x, pooled 0.67x likes. Marcel's text works (1.07x) on 60k followers and business stories, not a model for 10k and 4-follower accounts. Spec text over one screen is the exception (rico cheatsheets 438 median likes vs 166 [RD-36]; Marcel resource posts 6.93x).
  **Applies to** posting plans. **Check** text-only <= 1 per account per week, and only as a spec list (>= 3 bullets with numbers) over an image. **Source** `_analysis.json.*.formats.engagement`; RD-36.

### 3.3 Series grammar

- **RULE XS-15** Sequence every strong build as a series, in this order and these gaps: day 0 close-up (one component or region, 7:8 or 1:1) -> day 1 full view (single 16:10) -> day 1-3 vertical thirds (same screen) -> day 2-9 motion (quote of the still that did best) -> day 14-45 a second showing of the best still under a new caption.
  **Why** Gaps measured on the benchmarks: close-up and full view within 0.1-1 day (rico "fullview" then "closer view" 8 h later, 1.12x; Augustas thirds then the hero containing them 0.95 d later); full -> thirds 2.8-4.2 h (Marcel calendar and CRM); still -> motion 0.61 d median (Marcel, n=10) and 1.52 d (Augustas's best); reuse 4-14 d 1.15x and 31-60 d 1.06x but 15-30 d 0.88x and > 60 d 0.53x (rico, n=129). The founder's request (close-up, next day full or thirds, a week later motion) fits inside these windows; motion later than 2 days goes out as its own post, not a quote (XS-13).
  **Applies to** posting plans for any build worth more than one post. **Check** each series step's day offset is inside `cadence.json.series` ranges. **Source** `_series.json`; `_analysis.json.rico`; series logs (`series.mjs --log`).

- **RULE XS-16** Every follow-up in a series quotes the series' previous post (or its best one); a standalone post is used only for the first post and for a reuse more than 7 days later.
  **Why** Quoting is the benchmarks' default (49% and 51% of originals) and lifts views on the quoting post (Marcel 1.26x vs 0.88x; rico 0.91x vs 0.78x); the quoted card gives the viewer the context in one glance.
  **Applies to** series steps 2+. **Check** step >= 2 has `quote_of` = an earlier post id of the same series. **Source** `_series.json.*.relViewsQuotingMedia`.

- **RULE XS-17** Run a project series for 3-6 appearances over 7-21 days, at most one appearance per project per account per day (two only for a close-up/full pair at least 6 h apart), and keep at most 2 projects in series at once.
  **Why** Marcel's workflow editor: 5 appearances in 17 days; rico's Alpaca: 14 over 132 days, median gap 6 d; Marcel's CRM and calendar used full-then-thirds pairs 4.2 h and 2.8 h apart (1.11x, 1.64x). Too many parallel series dilutes the series cue.
  **Applies to** posting plans. **Check** per project: appearances 3-6, span 7-21 days; per account per day <= 1 appearance (2 if close-up + full >= 6 h apart). **Source** series logs; `_analysis.json.rico.products`.

- **RULE XS-18** Do not re-show the same image within 7 days on any founder account, show it at most 3 times in total, and prefer the 7-14 or 30-60 day windows for the second showing.
  **Why** rico reuse by gap: <= 3 d 0.49x, 4-14 d 1.15x, 15-30 d 0.88x, 31-60 d 1.06x, > 60 d 0.53x; third showing 0.61x of the first (n=40).
  **Applies to** reuse of assets. **Check** asset id last shown >= 7 days ago; showings <= 3. **Source** `_analysis.json.rico.byGap`, `thirdVsFirstLikes`.

- **RULE XS-19** Across the four accounts, split one project into different cuts (one account the full view, another the thirds, another the light/dark pair, another the close-up), never the same image on two accounts within 7 days and never the same caption.
  **Why** Identical media from several accounts in one feed reads as coordinated and gets the author-diversity and "not interested" penalties [XP section 6.2]; different cuts let each account post the series in its own voice (caption-voice.md).
  **Applies to** cross-account plans. **Check** asset id unique per 7 days across accounts; caption strings unique. **Source** XP-26, x-algorithm weights in XP section 6.2.

### 3.4 Captions

- **RULE XS-20** Write captions lowercase, 4-10 words, naming the UI part (dashboard, sidebar, hero, calendar, onboarding) plus at most one plain judgement; per-account voice in `caption-voice.md`.
  **Why** Naming a UI part 1.22x vs 0.85x without (Augustas era 1, n=118); 7-10 words 1.16x, 1-3 words 0.72x; superlatives 1.22x (n=43) and Larpo's plain-label doctrine (LBC-40, LBC-44: plain labels 3-15x reach). Augustas's current era is 96% lowercase at a median 4 words; Marcel median 9 words (82% lowercase), rico 4 words.
  **Applies to** every caption. **Check** lowercase except proper names; 4-10 words; contains a UI noun. **Source** era-1 caption cuts; `_analysis.json.*.captions`; LBC-40, LBC-44.

- **RULE XS-21** Never caption with a question, a poll or a "which one": state the thing.
  **Why** Current-era questions 0.69x (Augustas, n=6), X-wide 0.5x [XP-14], Larpo's binary questions and recaps 0.2-0.26x [LBC-44]. Era-1 "clean?" endings scored 1.02x (n=11) on a sentence-case growth voice; they add nothing and conflict with the plain-label doctrine.
  **Applies to** every caption. **Check** no "?" in the caption. **Source** `_analysis.json.augustasdesign.captions.hooks`; XP-14; LBC-44.

- **RULE XS-22** Never put an external link or an @mention in the post; put the link, credits and "made with" in a self-reply 30-150 minutes after the post.
  **Why** Augustas era 1: link in post 0.33x likes / 0.53x views (n=14), link in self-reply 1.02x / 1.07x (n=223), @mentions 0.53x (n=17); rico replies "check our work + url" a median 155 min later on every post; Marcel's link-in-reply posts 1.31x vs link-in-post 0.97x. Same as XP-18.
  **Applies to** every post. **Check** no url or @ in the main caption; the reply exists and is posted 30-150 min later. **Source** `_extra.json.*.linkInPost`, `firstReplyMinutesMedian`; XP-18.

- **RULE XS-23** Use at most one emoji, at the end, and only in Augustas's voice.
  **Why** Emoji effect is neutral to mixed: Augustas 0.86x (now) and 1.01x (era 1), Marcel 1.15x, rico 0.91x; hashtags appear on 0% of the founders' posts and 1% across design X [XP-13]. The co-founders use none (0 of 55 posts), which keeps their voices distinct.
  **Applies to** every caption. **Check** emoji count <= 1 and last; co-founder captions 0 emoji; hashtags 0. **Source** `_analysis.json.*.captions.emoji`; XP-13.

- **RULE XS-24** Label fictional work as concept, never name the fictional brand, and never claim money, clients or outcomes the post cannot show.
  **Why** Larpo decisions LBC-27, LBC-41, LBC-45. Money and client-story captions scored 1.35x and 1.19x on Augustas's era 1 (n=22, 20), which is exactly why the rule has to be explicit: those hooks are off the table for concepts.
  **Applies to** every caption of concept work. **Check** caption contains "concept" when the brand is fictional; no fictional brand name; no "$", "client", "k" figures unless the work is real and the figure is true. **Source** LBC-27, LBC-41, LBC-45; era-1 caption cuts.

### 3.5 What never to post, and how to learn

- **RULE XS-25** Never post: a third media post on one account in a day; the same image twice within 7 days; the same caption on two accounts; a question or poll caption; a link or @mention in the main post; a quote-only post; a promo for another product (Augustas's Lunor promos 0.33x, n=14); a bento, pricing or branding piece as the day's lead; life posts as part of the plan.
  **Why** Each item is measured above (XS-01, XS-18, XS-19, XS-21, XS-22, XS-14, XS-08) or in LBC-44/47; life virality (one 26x outlier) is luck, not a format, and Marcel's life posts run 0.05-0.24x.
  **Applies to** posting plans. **Check** the planner rejects any day that breaks one item. **Source** this file; LBC-44, LBC-47.

- **RULE XS-26** Log every planned and posted item with account, slot, series id and step, asset id, format subtype, caption template id and the 48-hour counts, and re-run the study scripts weekly; only change a default when a cell has n >= 20.
  **Why** The co-founder accounts have no signal yet; Larpo's own note (LBC-46) is that seven timed posts cannot answer timing. The scripts reproduce every number here in under a minute.
  **Applies to** the planner and its weekly review. **Check** `node knowledge/benchmarks/x-strategy-2026-10/_scripts/analyze.mjs <dataDir>` runs on the new capture; plan log has all fields. **Source** CREDITS.md; LBC-46.

- **RULE XS-27** Size and crop every export with the existing display rules before scheduling: pairs 7:8, 3-up lead 7:8 + 16:9 except vertical thirds (XS-09), 4-up 16:9 tiles, single portrait no taller than 0.84, video first frame = money frame.
  **Why** The display rules are measured in X's embed [XP-04..07, XP-03, XP-28]; this study adds only the vertical-thirds exception.
  **Applies to** every export. **Check** XP-28's render check at 514 px. **Source** XP-03..07, XP-28.

## 4. Numbers & scales

### 4.1 Cadence

| Account | Followers | Window | Originals / day | Media / day | Days with a post | Max in a day | Median gap (h) | Main slots (Vilnius) |
|---|---|---|---|---|---|---|---|---|
| @marcelkargul | 60,768 | 23 Sep - 22 Oct | 6.2 | 4.6 | 100% | 15 (11 media) | 1.3 (media 2.1) | 14:00-01:30; most at 15:00 (22), 19:00 (19), 14:00 (18) |
| @kargulstudio | 6,361 | 8 Sep - 21 Oct | 0.88 | 0.88 | 82% | 2 | 24.6 | 14:00-17:00 (24 of 39) |
| @_heyrico | 27,164 | 24 Aug - 22 Oct | 2.14 | 2.04 | 93% | 5 | 3.7 (media 4.0) | 19:30 (31), 18:00 (15), 16:00 (14), 20:00 (12) |
| @augustasdesign era 1 | about 9.8k at the end | 19 Jul 2025 - 3 Mar 2026 | 1.46 | 1.41 | 91% (207 of 227) | 4 | n/a | 06:59 (190), 13:30 (75), 19:30 (13) |
| @augustasdesign now | 10,007 | 23 Aug - 22 Oct | 0.42 | 0.40 | 26% | 3 | 14.2 | 21:00 (8), 06:00-07:00 (6) |
| @faulkner_Design | 4 | 30 Aug - 22 Oct | 0.45 | 0.45 | 24% | 3 | 10.1 | 08:00, 13:00, 18:00 (scheduled bursts) |
| @rokasrem | 4 | 7 - 22 Oct | 1.94 | 1.88 | 100% | 3 | 13.8 | 15:00 (13), 21:00 (15) (scheduled) |
| @marius_vanagas | 4 | 31 Aug | 1 post | | | | | 09:21 |

Self-replies per day: Marcel 4.9 (mostly one 315-shot thread on 3 Oct), rico 1.97 (all link replies), Augustas era 1 1.1 (239 of 251 with a link), now 0.05. Augustas reposts his own posts: 18 of 25 current-era posts (where bounded, 10-40 h later).

### 4.2 Engagement baselines (median per media post)

| Account | Likes | Views | Bookmarks | Likes / view | Bookmarks / like |
|---|---|---|---|---|---|
| @marcelkargul | 134 | 10,813 | 57 | 1.10% | 0.53 |
| @_heyrico | 162 | 9,535 | 131 | 1.60% | 0.78 |
| @kargulstudio | 25 | 1,747 | 7 | 1.72% | 0.26 |
| @augustasdesign era 1 | 121 | 5,868 | 37 | 1.87% | 0.33 |
| @augustasdesign now | 46.5 | 2,069 | 16.5 | 2.38% | 0.35 |
| @faulkner_Design | 3 | 26.5 | 0 | | |
| @rokasrem | 1 | 10 | 0 | | |
| @marius_vanagas | 3 | 80 | 0 | | |

Augustas era-1 monthly medians (likes / views): Jul 84 / 4.4k, Aug 72 / 4.6k, Sep 172 / 10.3k, Oct 188 / 9.0k, Nov 157 / 7.9k, Dec 175 / 6.2k, Jan 113 / 3.5k, Feb 69 / 2.3k. Posting volume did not track the curve (2.6 posts a day in Aug, 0.6 in Dec), so the subject and quality of posts, not volume, moved it.

### 4.3 Format multipliers (rel likes / rel views; n)

| Format | Pooled (6 accounts) | Augustas | Marcel | rico |
|---|---|---|---|---|
| single landscape | 1.00 / 0.95 (392) | 0.94 era 1 (200), 0.99 now (15) | 1.09 / 1.22 (61) | 0.85 / 0.84 (33) |
| single portrait | 0.92 / 0.94 (70) | 1.14 era 1 (34) | 0.65 (17) | 0.88 (18) |
| 2-up portrait pair (4:5-7:8) | 1.21 / 1.28 (36) | 2.28 now (1) | 0.75 (1) | 1.21 / 1.31 (32) |
| 2-up landscape | 0.79 / 1.01 (32) | 0.74 era 1 (14) | 1.52 (6) | 1.28 (4) |
| 3-up vertical thirds | 1.33 / 1.12 (9) | 17.61 now (1) | 2.00 / 2.37 (4) | 0.95 (4) |
| 4-up mixed crops | 1.12 / 1.26 (32) | 1.48 era 1 (17) | 0.97 / 1.30 (9) | 1.19 / 2.09 (5) |
| 4-up same size | 0.85 / 0.85 (23) | 1.12 era 1 (14) | 0.59 (2) | 0.66 (7) |
| video | 0.88 / 0.80 (56) | 0.78 era 1 (21), 0.68 now (4) | 0.94 / 0.77 (29) | 1.79 (1) |
| quote-only text | 0.67 / 1.00 (30) | 0.19-0.30 | 0.78 (24) | 0.19 (4) |

The 29-account study [XP section 6.1] agrees on direction: 2-up 1.20, 4-up 1.19, video 1.03, 3-up 1.00, single 0.76.

### 4.4 Series gaps

| Step | Measured gap | Effect | Source |
|---|---|---|---|
| close-up <-> full view | 0.1 - 1 day | rico "closer view" 1.12x of "fullview"; Augustas hero 0.19x of the thirds the day before | rico 11 Oct; Augustas 14-15 Oct |
| full -> vertical thirds | 2.8 - 4.2 h | Marcel 1.64x and 1.11x of the full view | Marcel 2111472960452038719 -> 2111515571179122856; 2109715596225257488 -> 2109779159274721437 |
| still -> motion (quote) | median 0.61 d (Marcel, n=10); 1.52 d (Augustas) | 1.51x the still (Marcel); 0.44x the still but 7.7x median (Augustas) | `_series.json` |
| still -> motion after 7-15 d (quote) | 7 and 15 d | 0.14x and 0.30x of the still | Augustas era 1 |
| own-quote gap | Marcel median 0.8 d (p25 0.21, p75 1.95); rico 2.56 d (p25 1.26, p75 7.05) | views 1.26x / 0.91x on the quoting post | `_series.json` |
| image reuse (rico, n=129) | first reuse median 19 d (p25 15, p75 42) | 2nd showing 0.92x, 3rd 0.61x; <=3 d 0.49x, 4-14 d 1.15x, 15-30 d 0.88x, 31-60 d 1.06x, >60 d 0.53x | `_analysis.json.rico` |
| project series | Marcel 5 posts / 17 d; rico Alpaca 14 posts / 132 d (median gap 6 d) | | logs |

### 4.5 Captions

| Account | Median words | Median chars | Lowercase | Emoji | Questions | Hashtags | Link in post |
|---|---|---|---|---|---|---|---|
| @marcelkargul | 9 | 52 | 82% | 50% | 11% | 0% | 20% |
| @_heyrico | 4 | 26 | 65% | 50% | 8% | 3% | 0% |
| @kargulstudio | 0 (no captions on 38 of 39) | 0 | | | | | |
| @augustasdesign era 1 | 6 | | 2% (sentence case) | 36% | 22% | 0% | 4% |
| @augustasdesign now | 4 | 28 | 96% | 24% | 28% | 0% | 4% |
| @faulkner_Design | 6.5 | 38.5 | 75% | 0% | 8% | 0% | 0% |
| @rokasrem | 8 | 40 | 100% | 0% | 20% | 0% | 0% |
| @marius_vanagas | 28 (1 post) | 154 | 100% | 0% | 0% | 0% | 0% |

## 5. Dos and Don'ts

- **Do** cut the best dashboard into three vertical thirds and post them as one 3-image post (Augustas 14 Oct: 17.6x). **Don't** post four same-size full pages (0.85x) or re-post the same 4-up the next day (rico 653 -> 138 likes).
- **Do** quote yesterday's still with its motion version (Augustas 16 Oct: 359 likes). **Don't** post the motion as a quote a week or two later (0.14-0.30x of the still); post it standalone instead.
- **Do** lead the morning with a dashboard or product screen. **Don't** lead with pricing (0.36x) or bento cards (0.73x).
- **Do** put the link in a reply 30-150 min later (1.02x). **Don't** put it in the caption (0.33x).
- **Do** write 4-10 lowercase words that name the UI part. **Don't** write 1-3 word labels (0.72x), questions (0.69x) or a recap poll (LBC-44 0.2x).
- **Do** give each co-founder one post a day in a different cut and voice. **Don't** post three times in a morning from a 4-follower account and go quiet for two weeks.

## 6. Exceptions & judgement calls

- **Big-account behaviour does not transfer down.** Marcel posts 6.2 times a day with no per-post decay because 60k followers spread the reach; at 10k followers Augustas's third post of a day halves. The planner follows the founders' own curve, not Marcel's volume. [D]
- **Vertical thirds vs XP-05.** XP-05 says a 3-up should be one 7:8 lead plus two 16:9 images. The thirds format breaks it on purpose and wins; keep XP-05 for every other 3-up. [D][XP]
- **Questions on era 1.** Era-1 question endings scored 1.12x (n=58) in a sentence-case, growth-hook voice that Larpo has since rejected (LBC-40..44). The rule follows the current doctrine and the current data (0.69x). [D][LBC]
- **Money and client claims** scored well in era 1 (1.35x, 1.19x) and are still off the table for concept work (LBC-45). For real client work with permission and true numbers, a client-story caption is allowed on Augustas's account at most once a week. [D][LBC]
- **Motion as a lead** is allowed when the motion is the point (a component loop, a load-in that cannot be shown still); then it follows the component canon [F post-component] and XP-02/03.
- **Co-founder timing** has no data; the slots for them come from the benchmarks and are a guess to test (XS-26).
- **Self-reposts ("bumps")**: Augustas reposted 18 of 25 current-era posts; bumped posts score higher (1.35x vs 0.47x) but he bumps the ones already doing well, so it is not evidence that bumping helps. Allowed once per post, 10-40 h later, never more than one bump a day.

## 7. Evidence files

- `knowledge/benchmarks/x-strategy-2026-10/data/augustasdesign.json`: era-1 and current-era posts; key ids 2110393766754341153 (thirds), 2110739524724609353 (hero with the same dashboard), 2110944321184620815 (animated quote), 2109844574613200974 (light pair).
- `.../data/marcelkargul.json`: calendar full view -> thirds (17 Oct), CRM 4-up -> thirds (12-13 Oct), workflow editor series (22 Sep - 9 Oct), quotes of @kargulstudio.
- `.../data/_heyrico.json` + `heyrico-x/img-classification.tsv`: reuse clusters, "fullview" -> "closer view" (11 Oct), Alpaca series.
- `.../data/faulkner_Design.json`, `rokasrem.json`, `marius_vanagas.json`: the co-founders' first months.
- `.../founders/*.jpg`: 8 thumbnails of the founders' own posts.

## 8. Open questions

- Whether a quote by @augustasdesign raises the quoted co-founder post's reach (the mirror gives only the final counts, not their timing).
- Whether the 08:00 slot is good for Augustas because of the hour or because it was always his first post; test by moving the lead to 14:30 on two days a week for three weeks (XS-26).
- The logged-in X app may lay out 3-image posts differently from the embed; the vertical-thirds teaser effect was not observed directly.
- Reply behaviour (who replies, reply sentiment) and link clicks are not visible through the mirror.
- @marius_vanagas's bio names `@larpo_studio`, the other bios `@larpostudio`; worth checking before cross-tagging.
