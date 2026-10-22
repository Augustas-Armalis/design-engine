# Preflight: lib-panelry-product-pipeline-1

http://localhost:4396/#/panelry  
kind `product-ui`, 1392x932 artboard, anchor all, 2026-10-22 18:31 UTC

**PASS: 0 fail, 7 warn, 20 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 4 | 7.7 |
| check | PASS | 0 | 2 | 9.8 |
| clipscan | PASS | 0 | 0 | 2.4 |
| probes | done | 0 | 0 | 6.1 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/correctness/contrast.product | 21 | product text >= 4.5:1 (WARN: the product is a picture, but it must still read) | span "/" 2.36:1 12px; span "Open · day 18" 3.88:1 12px; span "Interview14" 4.48:1 13px; span "14" 4.48:1 12px; span "Needs feedback3" 4.48:1 13px; span "3" 4.48:1 12px |
| WARN | gate/edge/shadow.levels.product | 5 | <= 4 elevation shadows inside the product (one grey scale, L199) | 0 1 2 0 #141414/0.05 x6 (span); 0 1 2 0 #0f1419/0.20 x2 (span); 0 1 2 0 #111122/0.06 x2 (span); 0 1 2 0 #1a1a1a/0.04, 0 24 60 -24 #0e121b/0.22 x1 (div); 0 1 2 0 #1a1a1a/0.04 x1 (div) |
| WARN | gate/edge/edge.ring+inset | 2 | no ring + inset highlight/inner ring on one box (reads as a double top edge, L467); button materials exempt | span "" (product); span "Move to onsite" (product) |
| WARN | gate/radius/radius.ladder.product | 25 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | span "" h36 r13 (band 32-40: 10-12) [product]; span "Open · day 18" h24 r9 (band 24-32: 6-8) [product]; div "All205Interview14N" h32 r13 (band 32-40: 10-12) [product]; span "All205" h28 r11 (band 24-32: 6-8) [product]; span "Filter" h32 r12.1 (band 32-40: 10-12) [product]; span "Table view" h28 r10 (band 24-32: 6-8) [product] |
| WARN | check/desktop/color.contrast | 21 | body >= 4.5:1, large >= 3:1 (text on gradients/images not measured) | judged by gate contrast census (product text is WARN there) \| span 2.36:1 (13px) "/"; span 3.88:1 (12px) "Open · day 18"; span 4.48:1 (13px) "Interview14"; span 4.48:1 (12px) "14"; span 4.48:1 (13px) "Needs feedback3"; span 4.48:1 (12px) "3"; span 3.88:1 (12px) "Offer"; span 4.45:1 (12px) "Gdańsk · 6 yrs"; span 4.45:1 (12px) "4 of 4 in"; span 2.36:1 (12.5px) "Not scored"; span 2.36:1 (12.5px) "No |
| WARN | check/desktop/a11y.axe-serious | 1 | 0 serious/critical | judged by gate contrast census (product text is WARN there) \| color-contrast×5 |
| WARN | post/post.seams | 7 | strip seams fall in gutters (text across a seam is split between two carousel images) | x464 "Open · day 18" y121; x464 "Design · Remote, EU · Hi" y147; x464 "Interview" y413; x464 "Interview" y459; x464 "Interview" y505; x464 "Applied" y689 |
| PASS | gate/gate.summary | 0 fail, 4 warn, 25 pass | 0 FAIL | reports/lib-panelry-product-pipeline-1/gate.json |
| PASS | check/check.summary | 0 fail, 2 warn | 0 FAIL | one 1392x932 viewport (artboard); reports/lib-panelry-product-pipeline-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/54 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/8 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | grey/grey.edge-twins | 0 | no two neutral 1px edges within dL 0.006 (composited on their surface) |  |
| PASS | primary/primary.per-view | product1:1 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | margin | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | post/post.insets | l 56 t 56 r 56 b 56 | equal canvas inset on all four sides (+-2px) | div 1280x820 |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.full.png | 3840x2571 0.91MB | long side >= 2000px (XP-11), ratio 3840:2571 (+-2%), <= 5 MB (X API image limit) | library/panelry/product-pipeline/renders/full.png |
| PASS | export/export.strip-1.png | 1280x2571 0.32MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/panelry/product-pipeline/renders/strip-1.png |
| PASS | export/export.strip-2.png | 1280x2571 0.24MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/panelry/product-pipeline/renders/strip-2.png |
| PASS | export/export.strip-3.png | 1280x2571 0.32MB | long side >= 2000px (XP-11), ratio 1280:2571 (+-2%), <= 5 MB (X API image limit) | library/panelry/product-pipeline/renders/strip-3.png |
| INFO | grey/grey.census | 7 fills, 4 edges | neutral greys in use | #ffffff L1 142.6%; #f4f5f7 L0.97 13.8%; #fafafb L0.9854 6.2%; #f1f2f5 L0.9612 0.5%; #f2fbf6 L0.98 0.1%; #e2e4e9 L0.9188 0.1%; #d3d7de L0.8781 0% |
