# The asset library

`library/` holds **final versions only**: work the founder accepted, work awaiting his verdict that passed the preflight, and the recorded rejects kept as negative evidence. Drafts and rounds stay in `work/<name>/`. One folder per asset, so the library can later become a component library and a product of its own.

```
library/
  index.json                      generated: node tools/library.mjs index
  <project>/
    project.json                  brand, fictional?, app and dev server, concept names, series
    <asset>/
      manifest.json               what it is, where its source lives, how each render is made, verdict, series, preflight
      caption.md                  captions per format, per relation (first | follow | second), per founder account
      renders/*.png|mp4           the exported media (X sizes: 3840 wide stills, 1280-wide thirds)
      preflight/<n>-<label>.md    the preflight report each render passed
  x-days/
    posted.json                   what went out on X (the planner's memory)
    <YYYY-MM-DD>/                 one planned day: plan.md, plan.json, x-handoff.json, day.png
```

## manifest.json (`design-engine.library-asset/v1`)

| Field | Meaning |
|---|---|
| `id` | `<project>-<asset>`, matches `^[a-z0-9][a-z0-9-]{2,63}$` (it is the X hand-off `assetId`) |
| `project`, `title`, `kind` | the canon kind (`hero-light`, `product-ui`, `section-bento`, `post-component`...) |
| `subject` | what it shows, for the planner's subject multiplier (`dashboard`, `calendar`, `hero`, `bento-card`...: `knowledge/x/cadence.json` `subjectMultipliers`) |
| `status` | `accepted` (founder accept), `final` (shipped, no verdict needed), `awaiting-verdict`, `rejected` (kept as evidence, never posted), `reference` |
| `postable` | false blocks the planner; `library/index.json` also sets it false while any preflight FAIL stands |
| `verdict` | the latest founder words, round, date, ledger file, and `after`: what changed since that verdict |
| `source` | app folder, route, component file, viewport, DIRECTION, `base` when the app runs on another server, `crop` for an X crop (source route, rect, anchor, insets, how the edges were snapped) |
| `renders[]` | `file`, `role` (single, full, strip, closeup), `format` (an id in `system/x/formats.json`), `recipe` (route, viewport, scale, optional clip) or `from` (migrated as is), and, written by the renderer, `w`, `h`, `bytes`, `sha256`, `commit` |
| `checks[]` | the preflight runs: route, kind, size, anchor, seams, format, the renders whose export it checks |
| `preflight` | written by the renderer: fail and warn totals and the report per check |
| `series[]` | `{ id, stage }` memberships (the series themselves are defined in `project.json`) |
| `captionVars` | words for caption templates (`domain`, `ui`, `detail`, `n`...) |
| `conceptName`, `sample`, `alt`, `tags`, `dates` | fictional names visible in the media (never in a caption), sample-data flag, alt text for X |

## Commands

```bash
nice -n 19 node tools/library.mjs render <project>/<asset>   # render every recipe, record sizes and hashes, run the preflight, rebuild the index
node tools/library.mjs snap --src cprodb --vw 1392 --vh 932 --rect 1017,16,359,427 --edges l,b   # move crop edges into gutters
node tools/library.mjs index                                   # library/index.json
node tools/library.mjs check                                   # manifests, files, sizes, formats, series references
```

## Crops

An X crop is a route, not a cut PNG: `#/xframe?src=<route>&x=<left>&y=<top>` (`work/replicas/app/src/XFrame.tsx`) renders the source through a viewport the size of the crop, so the preflight measures the crop itself: text cut by a crop edge is a viewport crossing, the anchored corner's insets are measured, the fold end is judged. Snap every edge with `library.mjs snap` first, then render at the scale that makes the long side >= 2160.

## Adding a final

1. The founder accepts it, or it is the deliverable of a passed preflight that awaits his verdict.
2. Create `library/<project>/<asset>/manifest.json` (copy a sibling), `caption.md` (all four voices, `knowledge/x/caption-voice.md`), and the project's `project.json` and series if new.
3. `nice -n 19 node tools/library.mjs render <project>/<asset>`: 0 preflight FAIL, or it is not postable.
4. `node tools/library.mjs check`, commit.

## What is in it (2026-10-22)

`reservedFor` routes an asset: the Tempra finals, Kestrel and Quorum are reserved for @augustasdesign (he posts by hand, never scheduled); Panelry is reserved for @rokasrem's daily series. A scheduled account only ever gets assets that were never posted anywhere.

| Asset | Status | Renders | Preflight |
|---|---|---|---|
| `tempra-hero-h4a` | awaiting verdict (r7: the announcement pill) | hero 3840x2760 | 0 FAIL |
| `tempra-product-week` | awaiting verdict (r3.1 + polish since r1) | full 3840x2571 + 3 strips 1280x2571 | 0 FAIL (seam WARN at x=928) |
| `tempra-bento-dark` | accepted r3 (+3 half-visible texts fixed) | bento 3840x3200 | 0 FAIL |
| `tempra-ask-closeup` | sample day 1, awaiting verdict | close-up 2154x2562 | 0 FAIL |
| `panelry-debrief-closeup` | new for @rokasrem, sample day 1, awaiting verdict | close-up 2241x2366 | 0 FAIL |
| `panelry-product-pipeline` | new for @rokasrem (series step 2-3), awaiting verdict | full 3840x2571 + 3 strips 1280x2571 | 0 FAIL (seam WARN) |
| `tempra-x-calendar-carousel` | rejected (cxslices r1), evidence only | full + 3 strips, as posted for review | not run |
| `kestrel-hero` | accepted 10-08, posted 10-08 | fold 2880x1800 | 9 FAIL under today's canon: not postable until a fix pass |
| `quorum-hero` | accepted 10-15, posted 10-15 | fold 2880x1800 | 9 FAIL under today's canon: not postable until a fix pass |

Kite (accepted dark hero and dashboard) is not in the library yet; its three posts (thirds 10-14, hero 10-15, motion quote 10-16) are in `x-days/posted.json`, so the planner knows the project has been shown.
