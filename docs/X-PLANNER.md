# Designs for the day: the X planner

"Give me designs for the day" → `node tools/x_plan.mjs plan --date <YYYY-MM-DD>` → 3-5 posts across @augustasdesign, @faulkner_Design, @rokasrem and @marius_vanagas, each with its format, media and sizes, crop, Vilnius slot (and ET), account, caption in that account's voice, first reply, the post it quotes, the reason it was picked, its verdict and its preflight. The engine plans and hands off a file; people approve and post.

## Inputs

| File | What the planner takes from it |
|---|---|
| `library/index.json` + manifests + `caption.md` | what can be posted (postable, preflight 0 FAIL), its renders by format, subject, verdict, captions per account |
| `library/<project>/project.json` | series and their stages, e.g. `tempra-week`: closeup → full → strips → motion |
| `library/x-days/posted.json` | what already went out (seeded with the founders' real posts of engine work: Kestrel 10-08, Kite 10-14..16, Quorum 10-15) |
| `knowledge/x/cadence.json` | the study's numbers: slots, daily caps, series gaps, re-show windows, format and subject multipliers |
| `system/x/rotation.json` | families, weekly mix, fallbacks for anything cadence.json does not set |
| `system/x/formats.json` | canvas sizes, crops, feed tiles, the X-engine format each maps to |
| `system/x/accounts.json`, `system/x/captions.json` | the four accounts (caps, voices, profile ids) and the T01-T14 caption templates |

## How it decides (rules in `knowledge/x/x-strategy.md`)

1. **Open series first** (XS-15..17): for each series, the next unposted stage is due when the previous stage is old enough (close-up → full 1-2 days, full → thirds 0-3, still → motion as a quote 1-2); overdue stages jump the queue; a missing asset becomes a "To make" line with how to make it. At most 2 projects in series at once.
2. **Then the rotation**: assets outside a series that were never shown, or are inside a re-show window (7-14 or 30-60 days, at most 3 showings: XS-18).
3. **Score** (printed per post): status (accepted 1.0, awaiting verdict 0.75) x the format's multiplier (vertical thirds 1.33, motion quote 1.5, single still 1.0) x sqrt(subject multiplier: dashboard 2.05, calendar 1.93, hero 1.21, bento 0.73) + series and project-focus bonuses.
4. **Pick**: the lead is product UI or a hero (XS-08); one per family (hero, product, section, component, motion), series and asset; to reach the day's target a family may repeat and a format may appear twice, never twice on one account.
5. **Place**: the lead at 08:00 on @augustasdesign; the rest by reach on his audience, so his 14:30 gets the subject his followers reward; co-founders swap 16:00 and 19:30 by day; 22:00 is Marius's optional slot; at most 2 posts on Augustas and 1 per co-founder, 6 h apart (XS-01..03); a series step moves to another account than the step before (XS-19), a motion step stays with the still it quotes (XS-13).
6. **Caption**: the asset's `caption.md` line for that format, relation and account, else the voice's template; checked for lowercase, no question, link, @, hashtag, "!", em dash, banned word, brand name, emoji only on Augustas (one, at the end), the voice's word band, "concept" on fictional work, no three-word run shared with another caption that day, no repeat within 30 days; and by the X engine's own `checkCaption` (`~/dev/larpo-x-engine/shared/gate.mjs`) when that checkout exists.

## Outputs (`library/x-days/<date>/`)

- `plan.md`: the table and one block per post (format, media and sizes, crop, feed tile, caption and its source, first reply, quote, why, verdict, preflight), then "To make", "Held back" and notes.
- `plan.json`: the same as data, plus every candidate and its score.
- `x-handoff.json`: `system/x/x-handoff.schema.json` (the X engine's importer is described in `knowledge/x/x-engine-audit.md` section 4; it is not built yet). Media are referenced by relative path with size and sha256; `approval.state` is `draft` for a sample day, `hold` until the founder accepts the asset, `ready` only for accepted assets, and `requireConfirm` is always true.
- `day.png` (`node tools/x_plan.mjs sheet --date <date>`): every post at X's 514px feed tile with its account, time, caption and checks.

## After posting

`node tools/x_plan.mjs posted --date <date> [--ids ...]` appends what actually went out to `posted.json` (fill `url` and `metrics` from the X engine's receipts when they exist). The next day's plan continues from there. Posts made outside the engine go in by hand with the same fields.

## The first planned days (@rokasrem, auto-approved)

| Day | 09:30 | 15:30 | 21:30 |
|---|---|---|---|
| Fri 23 Oct | Panelry full view: "the whole hiring pipeline on one screen" | Requa review close-up: "three checks before anyone clicks approve" | Requa hero: "approval software should feel this calm" |
| Sat 24 Oct | Panelry debrief close-up | Requa full view | designed by the daily run |
| Sun 25 Oct | Panelry thirds | designed by the daily run | designed by the daily run |

Plan several days ahead with `--assume-planned` (planned days count as going out). The daily run (scheduled task "Rokas X posts", 07:11) keeps the next two days at three posts by designing new projects.
