# Preflight: lib-tempra-hero-h4a-1

http://localhost:4396/#/h4a  
kind `hero-light`, 1440x1035 artboard, 2026-10-22 17:58 UTC

**PASS: 0 fail, 7 warn, 16 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 4 | 7.1 |
| design-view | PASS | 0 | 0 | 6.7 |
| check | PASS | 0 | 3 | 9.4 |
| clipscan | PASS | 0 | 0 | 1.9 |
| probes | done | 0 | 0 | 6.3 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/correctness/contrast.product | 6 | product text >= 4.5:1 (WARN: the product is a picture, but it must still read) | span "⌘K" 4.48:1 12px; span "Day" 4.48:1 13px; span "−3" 3.88:1 11px; span "+2h" 3.88:1 11px; span "All five freeBest" 4.29:1 12px; span "Best" 3.88:1 12px |
| WARN | gate/edge/shadow.levels.product | 6 | <= 4 elevation shadows inside the product (one grey scale, L199) | 0 1 2 0 #0f1419/0.20 x3 (span); 0 1 2 0 #1a1a1a/0.04 x2 (div); 0 1 2 0 #141414/0.05 x2 (span); 0 1 2 0 #1a1a1a/0.04, 0 24 60 -24 #0e121b/0.22 x1 (div); 0 1 2 0 #111122/0.06 x1 (span); 0 4 12 -4 #7e53f4/0.28 x1 (div) |
| WARN | gate/edge/edge.ring+inset | 3 | no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt | span "" (product); span "" (product); span "Book Fri 11:00" (product) |
| WARN | gate/radius/radius.ladder.product | 14 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | span "" h28 r10 (band 24-32: 6-8) [product]; span "⌘K" h20 r8.1 (band 0-24: 4-8) [product]; span "Week" h28 r11 (band 24-32: 6-8) [product]; div "Standup09:30" h29.3 r12 (band 24-32: 6-8) [product]; div "Focus11:00 – 12:30" h96 r12 (band 80-9999: 14-24) [product]; div "Standup09:30" h29.3 r12 (band 24-32: 6-8) [product] |
| WARN | check/desktop/color.contrast | 8 | body >= 4.5:1, large >= 3:1 (text on gradients/images not measured) | judged by gate contrast census (product text is WARN there) \| span 4.48:1 (11.5px) "⌘K"; div 4.48:1 (11.5px) "Next up · in 8 min"; span 4.48:1 (13px) "Day"; span 3.88:1 (11.5px) "−3"; span 3.88:1 (11.5px) "+2h"; span 4.29:1 (12px) "All five freeBest"; span 3.88:1 (11.5px) "Best"; div 4.48:1 (11.5px) "5 calendars synced · 2 t" |
| WARN | check/desktop/a11y.axe-serious | 1 | 0 serious/critical | judged by gate contrast census (product text is WARN there) \| color-contrast×5 |
| WARN | grey/grey.edge-twins | 4 | no two neutral 1px edges within dL 0.006 (composited on their surface) | #e9e9ee (NewBooking across time zones) vs #e7e9ee (Focus11:00 – 12:30) dL 0.0016; #e9e9ee (NewBooking across time zones) vs #e7e7e9 (FernhillTeam planSearch⌘KSch) dL 0.0057; #e7e9ee (Focus11:00 – 12:30) vs #e7e7e9 (FernhillTeam planSearch⌘KSch) dL 0.0041; #e7e9ee (Focus11:00 – 12:30) vs #e6e7eb (Sign up) dL 0.0056 |
| PASS | gate/gate.summary | 0 fail, 4 warn, 43 pass | 0 FAIL | reports/lib-tempra-hero-h4a-1/gate.json |
| PASS | design-view/design-view.summary | 0 fail | 0 FAIL | reports/lib-tempra-hero-h4a-1/design-view.png (read it beside the references) |
| PASS | check/check.summary | 0 fail, 3 warn | 0 FAIL | one 1440x1035 viewport (artboard); reports/lib-tempra-hero-h4a-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/49 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/3 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | primary/primary.per-view | page:1 product1:1 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | fade | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.hero.png | 3840x2760 0.73MB | long side >= 2000px (XP-11), ratio 1.33-1.78, <= 5 MB (X API image limit) | library/tempra/hero-h4a/renders/hero.png |
| INFO | grey/grey.census | 5 fills, 7 edges | neutral greys in use | #fafafb L0.9854 107.6%; #ffffff L1 61.6%; #f4f5f7 L0.97 1.5%; #f1f2f5 L0.9612 0.2%; #ecedf1 L0.9465 0% |
