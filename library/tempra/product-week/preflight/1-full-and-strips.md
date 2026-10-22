# Preflight: lib-tempra-product-week-1

http://localhost:4396/#/cprodb  
kind `product-ui`, 1392x932 artboard, anchor all, 2026-10-22 17:59 UTC

**PASS: 0 fail, 7 warn, 20 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 4 | 6.9 |
| check | PASS | 0 | 3 | 9.4 |
| clipscan | PASS | 0 | 0 | 1.9 |
| probes | done | 0 | 0 | 6.0 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/correctness/contrast.product | 8 | product text >= 4.5:1 (WARN: the product is a picture, but it must still read) | span "⌘K" 4.48:1 12px; div "Next up · in 8 min" 4.48:1 12px; span "Day" 4.48:1 13px; span "−3" 3.88:1 11px; span "+2h" 3.88:1 11px; span "All five freeBest" 4.29:1 12px |
| WARN | gate/edge/shadow.levels.product | 7 | <= 4 elevation shadows inside the product (one grey scale, L199) | 0 1 2 0 #0f1419/0.20 x4 (span); 0 1 2 0 #1a1a1a/0.04 x4 (div); 0 1 1 0 #002020/0.03 x4 (span); 0 1 2 0 #141414/0.05 x3 (span); 0 1 2 0 #1a1a1a/0.04, 0 24 60 -24 #0e121b/0.22 x1 (div); 0 1 2 0 #111122/0.06 x1 (span) |
| WARN | gate/edge/edge.ring+inset | 4 | no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt | span "" (product); span "" (product); span "Book Fri 11:00" (product); span.round "" (product) |
| WARN | gate/radius/radius.ladder.product | 38 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | span "" h28 r10 (band 24-32: 6-8) [product]; span "⌘K" h20 r8.1 (band 0-24: 4-8) [product]; span "Join" h28 r11.1 (band 24-32: 6-8) [product]; span "LAMJTDesign" h32 r13 (band 32-40: 10-12) [product]; span "Today" h32 r13 (band 32-40: 10-12) [product]; div "DayWeek" h32 r13 (band 32-40: 10-12) [product] |
| WARN | check/desktop/color.contrast | 8 | body >= 4.5:1, large >= 3:1 (text on gradients/images not measured) | judged by gate contrast census (product text is WARN there) \| span 4.48:1 (11.5px) "⌘K"; div 4.48:1 (11.5px) "Next up · in 8 min"; span 4.48:1 (13px) "Day"; span 3.88:1 (11.5px) "−3"; span 3.88:1 (11.5px) "+2h"; span 4.29:1 (12px) "All five freeBest"; span 3.88:1 (11.5px) "Best"; div 4.48:1 (11.5px) "5 calendars synced · 2 t" |
| WARN | check/desktop/a11y.axe-serious | 1 | 0 serious/critical | judged by gate contrast census (product text is WARN there) \| color-contrast×5 |
| WARN | post/post.seams | 5 | strip seams fall in gutters (text across a seam is split between two carousel images) | x928 "– 14:00" y545; x928 "Plan next week" y661; x928 "– 16:00" y678; x928 "Design sync" y394; x928 "11:00 · all 5 free" y411 |
| PASS | gate/gate.summary | 0 fail, 4 warn, 29 pass | 0 FAIL | reports/lib-tempra-product-week-1/gate.json |
| PASS | check/check.summary | 0 fail, 3 warn | 0 FAIL | one 1392x932 viewport (artboard); reports/lib-tempra-product-week-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/62 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/6 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | grey/grey.edge-twins | 0 | no two neutral 1px edges within dL 0.006 (composited on their surface) |  |
| PASS | primary/primary.per-view | product1:1 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | margin | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | post/post.insets | l 56 t 56 r 56 b 56 | equal canvas inset on all four sides (+-2px) | div 1280x820 |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.full.png | 3840x2571 0.83MB | long side >= 2000px (XP-11), ratio 3840:2571 (+-2%), <= 5 MB (X API image limit) | library/tempra/product-week/renders/full.png |
| PASS | export/export.strip-1.png | 1280x2571 0.26MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/tempra/product-week/renders/strip-1.png |
| PASS | export/export.strip-2.png | 1280x2571 0.20MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/tempra/product-week/renders/strip-2.png |
| PASS | export/export.strip-3.png | 1280x2571 0.34MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/tempra/product-week/renders/strip-3.png |
| INFO | grey/grey.census | 5 fills, 5 edges | neutral greys in use | #ffffff L1 123.8%; #fafafb L0.9854 14.7%; #f4f5f7 L0.97 6.4%; #f1f2f5 L0.9612 0.6%; #ecedf1 L0.9465 0.1% |
