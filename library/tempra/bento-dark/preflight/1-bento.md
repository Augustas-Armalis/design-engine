# Preflight: lib-tempra-bento-dark-1

http://localhost:4396/#/cbentol  
kind `section-bento`, 1440x1200 artboard, 2026-10-22 18:00 UTC

**PASS: 0 fail, 1 warn, 16 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 1 | 7.2 |
| check | PASS | 0 | 0 | 9.8 |
| clipscan | PASS | 0 | 0 | 2.3 |
| probes | done | 0 | 0 | 6.4 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/radius/radius.ladder.product | 2 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | div "" h81 r4 (band 80-9999: 10-32) [product]; div "Personal calendarB" h87.3 r9.5 (band 80-9999: 10-32) [product] |
| PASS | gate/gate.summary | 0 fail, 1 warn, 30 pass | 0 FAIL | reports/lib-tempra-bento-dark-1/gate.json |
| PASS | check/check.summary | 0 fail, 0 warn | 0 FAIL | one 1440x1200 viewport (artboard); reports/lib-tempra-bento-dark-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 2/2 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/20 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/6 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | grey/grey.edge-twins | 0 | no two neutral 1px edges within dL 0.006 (composited on their surface) |  |
| PASS | primary/primary.per-view | product1:1 product3:1 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | margin | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.bento.png | 3840x3200 0.82MB | long side >= 2000px (XP-11), ratio 1.1-1.78, <= 5 MB (X API image limit) | library/tempra/bento-dark/renders/bento.png |
| INFO | grey/grey.census | 12 fills, 5 edges | neutral greys in use | #0c0c0d L0.1548 200%; #131315 L0.1876 54.8%; #18181b L0.2103 48.2%; #202024 L0.2452 7.7%; #1d1d21 L0.2324 3.7%; #232327 L0.2578 0.7%; #f4f4f5 L0.9674 0.4%; #2a2a2f L0.287 0.2% |
