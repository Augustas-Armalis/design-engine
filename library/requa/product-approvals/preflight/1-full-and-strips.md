# Preflight: lib-requa-product-approvals-1

http://localhost:4396/#/requa  
kind `product-ui`, 1392x932 artboard, anchor all, 2026-10-22 19:18 UTC

**PASS: 0 fail, 7 warn, 23 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 4 | 7.7 |
| check | PASS | 0 | 2 | 9.8 |
| clipscan | PASS | 0 | 0 | 2.4 |
| probes | done | 0 | 0 | 6.0 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/correctness/contrast.product | 11 | product text >= 4.5:1 (WARN: the product is a picture, but it must still read) | span "All" 4.48:1 13px; span "Seatwell · 2h" 4.37:1 12px; span "Auto-approved" 3.88:1 12px; span "Auto-approved" 3.88:1 12px; span "Approved" 3.88:1 11px; span "Approved" 3.88:1 11px |
| WARN | gate/edge/shadow.levels.product | 6 | <= 4 elevation shadows inside the product (one grey scale, L199) | 0 1 2 0 #0f1419/0.20 x2 (span); 0 1 2 0 #1a1a1a/0.04 x2 (div); 0 1 2 0 #1a1a1a/0.04, 0 24 60 -24 #0e121b/0.22 x1 (div); 0 1 2 0 #111122/0.06 x1 (span); 0 2 6 -2 #305ceb/0.25 x1 (div); 0 1 2 0 #141414/0.05 x1 (span) |
| WARN | gate/edge/edge.ring+inset | 2 | no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt | span "" (product); span "Approve €4,680" (product) |
| WARN | gate/radius/radius.ladder.product | 8 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | span "" h28 r10 (band 24-32: 6-8) [product]; span "Waiting 4All" h28 r11 (band 24-32: 6-8) [product]; span "Waiting 4" h24 r9 (band 24-32: 6-8) [product]; span "" h10 r3 (band 0-24: 4-8) [product]; span "" h10 r3 (band 0-24: 4-8) [product]; span "" h8 r3 (band 0-24: 4-8) [product] |
| WARN | check/desktop/color.contrast | 11 | body >= 4.5:1, large >= 3:1 (text on gradients/images not measured) | judged by gate contrast census (product text is WARN there) \| span 4.48:1 (12.5px) "All"; span 4.37:1 (12px) "Seatwell · 2h"; span 3.88:1 (11.5px) "Auto-approved"; span 3.88:1 (11.5px) "Auto-approved"; span 3.88:1 (11.5px) "Approved"; span 3.88:1 (11.5px) "Approved"; span 2.36:1 (13px) "/"; span 4.48:1 (12px) "12s"; span 2.26:1 (11.5px) "1"; span 4.11:1 (11.5px) "Approved 1h ago"; span 2.26:1 (11 |
| WARN | check/desktop/a11y.axe-serious | 1 | 0 serious/critical | judged by gate contrast census (product text is WARN there) \| color-contrast×5 |
| WARN | post/post.seams | 10 | strip seams fall in gutters (text across a seam is split between two carousel images) | x464 "Prototype tool, 5 seats" y337; x464 "Office coffee, monthly" y406; x928 "12 ergonomic chairs, Vil" y119; x928 "Operations Q4 office kee" y240; x928 "6 chairs from Seatwell, " y344; x928 "Left €12,320" y438 |
| PASS | gate/gate.summary | 0 fail, 4 warn, 25 pass | 0 FAIL | reports/lib-requa-product-approvals-1/gate.json |
| PASS | check/check.summary | 0 fail, 2 warn | 0 FAIL | one 1392x932 viewport (artboard); reports/lib-requa-product-approvals-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/32 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/4 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | grey/grey.edge-twins | 0 | no two neutral 1px edges within dL 0.006 (composited on their surface) |  |
| PASS | primary/primary.per-view | product1:1 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | layout/icons.density | 2/15 | <= 25% of text controls (chips, tags, text buttons) carry an icon; icons belong on navigation, icon-only controls, one AI marker and the primary arrow (x-closeups r1) | Search; Approvals7 |
| PASS | layout/layout.squeezed | 0 | no box rendered shorter than its declared fixed height (a flex column that overflows squashes its fixed rows; Panelry r1 drawer header 56 -> 41) |  |
| PASS | layout/clip.control-cut | 0 | no icon button or avatar partly cut by its own clipping container (DE-02 inside the frame) |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | margin | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | post/post.insets | l 56 t 56 r 56 b 56 | equal canvas inset on all four sides (+-2px) | div 1280x820 |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.full.png | 3840x2571 0.77MB | long side >= 2000px (XP-11), ratio 3840:2571 (+-2%), <= 5 MB (X API image limit) | library/requa/product-approvals/renders/full.png |
| PASS | export/export.strip-1.png | 1280x2571 0.27MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/requa/product-approvals/renders/strip-1.png |
| PASS | export/export.strip-2.png | 1280x2571 0.31MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/requa/product-approvals/renders/strip-2.png |
| PASS | export/export.strip-3.png | 1280x2571 0.15MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/requa/product-approvals/renders/strip-3.png |
| INFO | grey/grey.census | 5 fills, 4 edges | neutral greys in use | #ffffff L1 90.6%; #fafafb L0.9854 15.3%; #f4f5f7 L0.97 10%; #f1f2f5 L0.9612 0.4%; #eef0f4 L0.9548 0.1% |
