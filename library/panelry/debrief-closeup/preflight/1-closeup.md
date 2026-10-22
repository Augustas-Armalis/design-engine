# Preflight: lib-panelry-debrief-closeup-1

http://localhost:4396/#/xframe?src=panelry&x=945&y=16  
kind `product-ui`, 431x455 artboard, anchor tr, 2026-10-22 18:31 UTC

**PASS: 0 fail, 4 warn, 17 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 2 | 7.3 |
| check | PASS | 0 | 2 | 10.0 |
| clipscan | PASS | 0 | 0 | 2.5 |
| probes | done | 0 | 0 | 5.7 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/correctness/contrast.product | 4 | product text >= 4.5:1 (WARN: the product is a picture, but it must still read) | span "· 4 of 4 scorecards" 4.48:1 12px; span "2h ago" 4.48:1 12px; span "3 of 4 yes" 3.88:1 11px; span "Systems thinking" 4.2:1 13px |
| WARN | gate/radius/radius.ladder.product | 6 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | span "Close" h28 r10 (band 24-32: 6-8) [product]; span "Expand" h28 r10 (band 24-32: 6-8) [product]; span "" h28 r10 (band 24-32: 6-8) [product]; span "Referral · Ade" h24 r9 (band 24-32: 6-8) [product]; span "Portfolio" h24 r9 (band 24-32: 6-8) [product]; span "Notice 1 month" h24 r9 (band 24-32: 6-8) [product] |
| WARN | check/desktop/color.contrast | 21 | body >= 4.5:1, large >= 3:1 (text on gradients/images not measured) | judged by gate contrast census (product text is WARN there) \| span 2.36:1 (13px) "/"; span 3.88:1 (12px) "Open · day 18"; span 4.48:1 (13px) "Interview14"; span 4.48:1 (12px) "14"; span 4.48:1 (13px) "Needs feedback3"; span 4.48:1 (12px) "3"; span 3.88:1 (12px) "Offer"; span 4.45:1 (12px) "Gdańsk · 6 yrs"; span 4.45:1 (12px) "4 of 4 in"; span 2.36:1 (12.5px) "Not scored"; span 2.36:1 (12.5px) "No |
| WARN | check/desktop/a11y.axe-serious | 1 | 0 serious/critical | judged by gate contrast census (product text is WARN there) \| color-contrast×4 |
| PASS | gate/gate.summary | 0 fail, 2 warn, 27 pass | 0 FAIL | reports/lib-panelry-debrief-closeup-1/gate.json |
| PASS | check/check.summary | 0 fail, 2 warn | 0 FAIL | one 431x455 viewport (artboard); reports/lib-panelry-debrief-closeup-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/5 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/2 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | grey/grey.edge-twins | 0 | no two neutral 1px edges within dL 0.006 (composited on their surface) |  |
| PASS | primary/primary.per-view | 0 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | deliberate cut | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | post/post.insets | l -889 t 40 r 40 b -405 | equal insets on tr (+-2px), window bleeds off b and l by >= 5% (cadence-xpost r1) | div 1280x820 |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.closeup.png | 2241x2366 0.38MB | long side >= 2000px (XP-11), ratio 0.8-1, <= 5 MB (X API image limit) | library/panelry/debrief-closeup/renders/closeup.png |
| INFO | grey/grey.census | 3 fills, 2 edges | neutral greys in use | #ffffff L1 116.7%; #f4f5f7 L0.97 44.5%; #f1f2f5 L0.9612 2% |
