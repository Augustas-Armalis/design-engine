# Preflight: lib-quorum-hero-1

http://localhost:4391/  
kind `hero-light`, 1440x900 artboard, 2026-10-22 18:01 UTC

**FAIL: 9 fail, 5 warn, 12 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | FAIL | 5 | 4 | 10.8 |
| design-view | PASS | 0 | 0 | 9.2 |
| check | PASS | 0 | 1 | 14.9 |
| clipscan | FAIL | 1 | 0 | 2.2 |
| probes | done | 0 | 0 | 6.9 |

| status | check | value | want | detail |
|---|---|---|---|---|
| FAIL | gate/type/type.weights | 400x43 500x41 550x10 600x9 650x28 | weights in {400,450,500,550,600} outside the product [canon] | 650 x3 (span.grid) |
| FAIL | gate/type/h1.weight | 550 | 400-500 [canon] |  |
| FAIL | gate/type/h1.tracking | -0.045em | -0.04 to -0.02em [canon] |  |
| FAIL | gate/align/crop.text-crossing | 1 | no text line crosses a crop edge (viewport left/right/top, or a clipping box); the fold bottom is exempt (designers-eye DE-07) | "DP" 65% visible at div.absolute right (1419.3,374) |
| FAIL | gate/align/crop.text-half-faded | 2/119 | no text line half-faded by a mask: alpha varies < 0.35 across the line and its mean is not 0.12-0.6 (designers-eye DE-01) | "Calendar sync misses recurri" alpha 0.44-0.54 mean 0.5 at (870,851.8); "Alerts" alpha 0.46-0.5 mean 0.48 at (1264,852.5) |
| FAIL | gate/gate.summary | 5 fail, 4 warn, 33 pass | 0 FAIL | reports/lib-quorum-hero-1/gate.json |
| FAIL | clipscan/clip.cut-off | 4 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) | svg cut  Quorum  path  bbox 0.0,-0.0 100.0x58.9 sw 0 vb 0,0 100x58.91999816894531; svg cut  SPAN  path  bbox 0.0,-0.0 100.0x58.9 sw 0 vb 0,0 100x58.91999816894531; box cut  NorthwindSearch⌘KInbox3Interviews12Highl  44; box cut  NorthwindSearch⌘KInbox3Interviews12Highl  88 |
| FAIL | optical/optical.label-centre | 1/45 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) | "stall at the CSV import" h17 top 3.81 bottom 3 (low 0.81px) at 166,698 |
| FAIL | copy/copy.placeholder | 1 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) | Northwind |
| WARN | gate/edge/edge.ring+inset | 1 | no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt | span.b6-ink "" |
| WARN | gate/radius/radius.ladder.boxes | 2/10 | boxes sit in their height band {"0-24":[4,8],"24-32":[6,8],"32-40":[10,14],"40-48":[9,16],"48-80":[12,16],"80-9999":[14,24]} | div.rounded-[12px] "Ask QuorumAcross 1" h98 r12 (band 80-9999: 14-24); mark.rounded-[3px] "stall at the CSV i" h17 r3 (band 0-24: 4-8) |
| WARN | gate/type/type.weights.product | 1 | product weights in {400,450,500,550,600} (WARN: product UI type has its own canon) | 650 x25 (span.grid) |
| WARN | gate/hero/hero.product-tagged | untagged | mark the hero product with data-product so the census is exact |  |
| WARN | grey/grey.edge-twins | 5 | no two neutral 1px edges within dL 0.006 (composited on their surface) | #eeeeee (Interviews12+3 todayHighligh) vs #ececed (NorthwindSearch⌘KInbox3Inter) dL 0.0057; #e9e9ea (Insights) vs #e7e7e9 (Search⌘K) dL 0.0055; #e7e7e9 (Search⌘K) vs #e7e7e7 (Book a demo) dL 0.0017; #e7e7e9 (Search⌘K) vs #e6e6e8 (Table) dL 0.0052; #e7e7e7 (Book a demo) vs #e6e6e8 (Table) dL 0.0035 |
| PASS | design-view/design-view.summary | 0 fail | 0 FAIL | reports/lib-quorum-hero-1/design-view.png (read it beside the references) |
| PASS | check/check.summary | 0 fail, 1 warn | 0 FAIL | one 1440x900 viewport (artboard); reports/lib-quorum-hero-1/check/report.md |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.icon-centre | 0/3 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | primary/primary.per-view | page:1 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | fade | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | export/export.hero.png | 2880x1800 0.56MB | long side >= 2000px (XP-11), ratio 1.33-1.78, <= 5 MB (X API image limit) | library/quorum/hero/renders/hero.png |
| INFO | grey/grey.census | 6 fills, 10 edges | neutral greys in use | #ffffff L1 159.6%; #fafafb L0.9854 15.4%; #f3f3f5 L0.9647 2.4%; #eeeff2 L0.9522 0.4%; #eeeef0 L0.9497 0.1%; #111214 L0.182 0% |
