# Preflight: lib-requa-review-closeup-1

http://localhost:4396/#/xframe?src=requa&x=625&y=16  
kind `product-ui`, 751x779 artboard, anchor tr, 2026-10-22 19:17 UTC

**PASS: 0 fail, 4 warn, 20 pass**

| step | status | fail | warn | seconds |
|---|---|---|---|---|
| gate | PASS | 0 | 2 | 6.9 |
| check | PASS | 0 | 2 | 9.6 |
| clipscan | PASS | 0 | 0 | 2.4 |
| probes | done | 0 | 0 | 5.8 |

| status | check | value | want | detail |
|---|---|---|---|---|
| WARN | gate/correctness/contrast.product | 5 | product text >= 4.5:1 (WARN: the product is a picture, but it must still read) | span "/" 2.36:1 12px; span "12s" 4.48:1 12px; span "1" 2.26:1 12px; span "Approved 1h ago" 4.11:1 12px; span "3" 2.26:1 12px |
| WARN | gate/radius/radius.ladder.product | 5 | boxes inside [data-product] off the hero ladder (judge them with --kind product-ui) | span "" h10 r3 (band 0-24: 4-8) [product]; span "" h10 r3 (band 0-24: 4-8) [product]; span "" h8 r3 (band 0-24: 4-8) [product]; span "" h8 r3 (band 0-24: 4-8) [product]; span "" h8 r3 (band 0-24: 4-8) [product] |
| WARN | check/desktop/color.contrast | 11 | body >= 4.5:1, large >= 3:1 (text on gradients/images not measured) | judged by gate contrast census (product text is WARN there) \| span 4.48:1 (12.5px) "All"; span 4.37:1 (12px) "Seatwell · 2h"; span 3.88:1 (11.5px) "Auto-approved"; span 3.88:1 (11.5px) "Auto-approved"; span 3.88:1 (11.5px) "Approved"; span 3.88:1 (11.5px) "Approved"; span 2.36:1 (13px) "/"; span 4.48:1 (12px) "12s"; span 2.26:1 (11.5px) "1"; span 4.11:1 (11.5px) "Approved 1h ago"; span 2.26:1 (11 |
| WARN | check/desktop/a11y.axe-serious | 1 | 0 serious/critical | judged by gate contrast census (product text is WARN there) \| color-contrast×2 |
| PASS | gate/gate.summary | 0 fail, 2 warn, 27 pass | 0 FAIL | reports/lib-requa-review-closeup-1/gate.json |
| PASS | check/check.summary | 0 fail, 2 warn | 0 FAIL | one 751x779 viewport (artboard); reports/lib-requa-review-closeup-1/check/report.md |
| PASS | clipscan/clip.cut-off | 0 | 0 things cut off (text past its clip box, svg outside its viewBox, children past overflow:hidden) |  |
| PASS | load/load.fonts | 1/1 | every named font family is available (no silent fallback face) |  |
| PASS | load/load.images | 0 | 0 broken or unloaded <img> |  |
| PASS | load/load.page-errors | 0 | 0 uncaught page errors |  |
| PASS | optical/optical.label-centre | 0/7 | one-line control labels: cap box centred or a touch high, top gap - bottom gap in [-2.5, +0.6]px; positive = sits low, lift it 1px (founder h4a r5) |  |
| PASS | optical/optical.icon-centre | 0/3 | icon-only controls: painted glyph centre within 1.25px of the box centre |  |
| PASS | grey/grey.fill-twins | 0 | no two neutral fills (each >= 0.2% of the frame) within OKLCH dL 0.008 of each other: one weak grey per role (DE-05) |  |
| PASS | grey/grey.edge-twins | 0 | no two neutral 1px edges within dL 0.006 (composited on their surface) |  |
| PASS | primary/primary.per-view | 0 | <= 1 heavy filled control (fill >= 3:1 off its surface) per view: the page, and each [data-product] (DE-06, "one ink primary") |  |
| PASS | layout/icons.density | 0/4 | <= 25% of text controls (chips, tags, text buttons) carry an icon; icons belong on navigation, icon-only controls, one AI marker and the primary arrow (x-closeups r1) |  |
| PASS | layout/layout.squeezed | 0 | no box rendered shorter than its declared fixed height (a flex column that overflows squashes its fixed rows; Panelry r1 drawer header 56 -> 41) |  |
| PASS | layout/clip.control-cut | 0 | no icon button or avatar partly cut by its own clipping container (DE-02 inside the frame) |  |
| PASS | edge/edge.small-cut | 0 | no chip, avatar, button or icon (< 120px) cut by the left, right or top frame edge (the bottom is fold.end): bring it in, or bleed one big visual by >= 25% (DE-02) |  |
| PASS | edge/fold.end | margin | the frame ends on purpose: a clear margin, a mask/blur fade, or one big bleed (>= 120px, cut >= 25%); no unfaded text line or small box cut by the bottom edge |  |
| PASS | post/post.insets | l -569 t 40 r 40 b -81 | equal insets on tr (+-2px), window bleeds off b and l by >= 5% (cadence-xpost r1) | div 1280x820 |
| PASS | copy/copy.reference-names | 0 | no name from a studied reference in visible text (hard no-copy rule, system/canon/no-copy-names.json) |  |
| PASS | copy/copy.placeholder | 0 | no stock brand or placeholder text (Acme, Lorem ipsum, TODO...) |  |
| PASS | export/export.closeup.png | 2403x2493 0.39MB | long side >= 2000px (XP-11), ratio 0.85-1.3, <= 5 MB (X API image limit) | library/requa/review-closeup/renders/closeup.png |
| INFO | grey/grey.census | 4 fills, 3 edges | neutral greys in use | #ffffff L1 108.9%; #f4f5f7 L0.97 21.6%; #fafafb L0.9854 3.6%; #f1f2f5 L0.9612 0.5% |
