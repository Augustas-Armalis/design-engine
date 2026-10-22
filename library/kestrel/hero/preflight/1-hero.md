# Preflight: lib-kestrel-hero-1

http://localhost:4392/  
kind `hero-light`, 1440x900 artboard, 2026-10-22 18:02 UTC

**FAIL: 9 fail, 5 warn, 11 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | FAIL | 4 | 4 | 8.6 |
| design-view | PASS | 0 | 0 | 8.1 |
| check | PASS | 0 | 2 | 9.4 |
| clipscan | FAIL | 1 | 0 | 1.9 |
| probes | done | 0 | 0 | 6.8 |

| status | check | value | want | detail |
|---|---|---|---|---|
| FAIL | gate/type/h1.size | 72.0px | 50-60px [canon] | Inter Variable "Product Analytics That Answers Back" |
| FAIL | gate/type/h1.weight | 550 | 400-500 [canon] |  |
| FAIL | gate/type/h1.tracking | -0.045em | -0.04 to -0.02em [canon] |  |
| FAIL | gate/hero/hero.cta-product-gap | 54px | 70-110px from CTA bottom to product top, or a side stage [canon] | product (guessed: tag it) div.absolute top 476 |
| FAIL | gate/gate.summary | 4 fail, 4 warn, 35 pass | 0 FAIL | reports/lib-kestrel-hero-1/gate.json |
| FAIL | clipscan/clip.cut-off | 2 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) | box cut  NNorthwindSample workspace Search⌘KAnaly  195; box cut  NNorthwindSample workspace Search⌘KAnaly  189 |
| FAIL | optical/optical.label-centre | 3/16 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) | "Product Ask AI Pricing Docs " h44 top 17.31 bottom 16.5 (low 0.81px) at 510,22; "Start free" h40 top 15.31 bottom 14.5 (low 0.81px) at 1201,24; "⌘K" h18 top 4.72 bottom 4 (low 0.72px) at 319,555 |
| FAIL | primary/primary.per-view | page:3 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") | page "Start free" #171717 16.7:1; page "Start for free · No card nee" #171717 16.7:1; page "Create cohort · 412" #335cff 5.1:1 |
| FAIL | copy/copy.placeholder | 1 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) | Northwind |
| WARN | gate/edge/edge.ring+inset | 2 | no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt | span.mx-3.5 ""; span.btn-blue "Create cohort · 41" (product) |
| WARN | gate/radius/radius.ladder.product | 3 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | div.mt-2.5 "Search⌘K" h32 r8 (band 32-40: 10-14) [product]; span.absolute "" h32 r8 (band 32-40: 10-14) [product]; div.mt-4 "Why did activation" h35.5 r16 (band 32-40: 10-14) [product] |
| WARN | gate/radius/radius.ladder.boxes | 1/12 | boxes sit in their height band {"0-24":[4,8],"24-32":[6,8],"32-40":[10,14],"40-48":[9,16],"48-80":[12,16],"80-9999":[14,24]} | span.mx-3.5 "" h65.9 r19.8 (band 48-80: 12-16); div.mt-2.5 "Search⌘K" h32 r8 (band 32-40: 10-14) [product]; span.absolute "" h32 r8 (band 32-40: 10-14) [product]; div.mt-4 "Why did activation" h35.5 r16 (band 32-40: 10-14) [product] |
| WARN | gate/hero/hero.product-tagged | untagged | mark the hero product with data-product so the census is exact |  |
| WARN | grey/grey.edge-twins | 3 | no two neutral 1px edges within dL 0.006 (composited on their surface) | #ebebeb (Search⌘K) vs #e9e9e9 (div) dL 0.0055; #e9e9e9 (div) vs #e8e8e8 (See it answer) dL 0.0058; #e8e8e8 (See it answer) vs #e6e6e6 (span) dL 0.0056 |
| PASS | design-view/design-view.summary | 0 fail | 0 FAIL | reports/lib-kestrel-hero-1/design-view.png (read it beside the references) |
| PASS | check/check.summary | 0 fail, 2 warn | 0 FAIL | one 1440x900 viewport (artboard); reports/lib-kestrel-hero-1/check/report.md |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.icon-centre | 0/8 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | fade | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | export/export.hero.png | 2880x1800 0.42MB | long side >= 2000px (XP-11), ratio 1.33-1.78, <= 5 MB (X API image limit) | library/kestrel/hero/renders/hero.png |
| INFO | grey/grey.census | 6 fills, 10 edges | neutral greys in use | #ffffff L1 56.2%; #fbfbfb L0.9881 6.7%; #ededed L0.9461 1.4%; #f5f5f5 L0.9702 1.3%; #e4e4e4 L0.9189 0.3%; #171717 L0.2046 0% |
