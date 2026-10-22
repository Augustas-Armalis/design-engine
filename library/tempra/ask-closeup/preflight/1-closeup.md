# Preflight: lib-tempra-ask-closeup-1

http://localhost:4396/#/xframe?src=cprodb&x=1017&y=16  
kind `product-ui`, 359x427 artboard, anchor tr, 2026-10-22 17:48 UTC

**PASS: 0 fail, 5 warn, 17 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 3 | 6.2 |
| check | PASS | 0 | 3 | 9.3 |
| clipscan | PASS | 0 | 0 | 1.9 |
| probes | done | 0 | 0 | 5.6 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/correctness/contrast.product | 2 | product text >= 4.5:1 (WARN: the product is a picture, but it must still read) | span "All five freeBest" 4.29:1 12px; span "Best" 3.88:1 12px |
| WARN | gate/edge/edge.ring+inset | 1 | no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt | span "" (product) |
| WARN | gate/radius/radius.ladder.product | 7 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | span "" h24 r9 (band 24-32: 6-8) [product]; span "This week" h24 r10 (band 24-32: 6-8) [product]; span "AAna" h24 r10 (band 24-32: 6-8) [product]; span "MMaya" h24 r10 (band 24-32: 6-8) [product]; span "JJon" h24 r10 (band 24-32: 6-8) [product]; span "TTheo" h24 r10 (band 24-32: 6-8) [product] |
| WARN | check/desktop/color.contrast | 8 | body >= 4.5:1, large >= 3:1 (text on gradients/images not measured) | judged by gate contrast census (product text is WARN there) \| span 4.48:1 (11.5px) "⌘K"; div 4.48:1 (11.5px) "Next up · in 8 min"; span 4.48:1 (13px) "Day"; span 3.88:1 (11.5px) "−3"; span 3.88:1 (11.5px) "+2h"; span 4.29:1 (12px) "All five freeBest"; span 3.88:1 (11.5px) "Best"; div 4.48:1 (11.5px) "5 calendars synced · 2 t" |
| WARN | check/desktop/a11y.axe-serious | 1 | 0 serious/critical | judged by gate contrast census (product text is WARN there) \| color-contrast×2 |
| PASS | gate/gate.summary | 0 fail, 3 warn, 26 pass | 0 FAIL | reports/lib-tempra-ask-closeup-1/gate.json |
| PASS | check/check.summary | 0 fail, 3 warn | 0 FAIL | one 359x427 viewport (artboard); reports/lib-tempra-ask-closeup-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/22 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/1 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | grey/grey.edge-twins | 0 | no two neutral 1px edges within dL 0.006 (composited on their surface) |  |
| PASS | primary/primary.per-view | 0 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | deliberate cut | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | post/post.insets | l -961 t 40 r 40 b -433 | equal insets on tr (+-2px), window bleeds off b and l by >= 5% (cadence-xpost r1) | div 1280x820 |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.closeup.png | 2154x2562 0.44MB | long side >= 2000px (XP-11), ratio 0.8-1, <= 5 MB (X API image limit) | library/tempra/ask-closeup/renders/closeup.png |
| INFO | grey/grey.census | 2 fills, 4 edges | neutral greys in use | #ffffff L1 107%; #f4f5f7 L0.97 11.4% |
