# Delta hero (bound to Polar)

**Brief, one line:** Delta, product analytics that explains why a metric moved and names the responsible segment, for PMs and growth teams at SaaS companies; one action: start free; the proof the visitor needs is a believable chart where the explanation is pinned to the exact point that moved.

Assumption: fictional concept, desktop still plus a designed 390 mobile composition (the brief asks for both, so LHS-13 does not apply).

## Hero class
**Product proof.** The value is an output (a sentence plus a segment) attached to a data point. Only the interface can prove that, so the panel carries the frame (LDP-02).

## Concept
Delta lives at the moment a line bends: the frame is split into "before" and "since the change", and the product's note is pinned to the exact day it happened.

## Reference triad
| role | reference | rule taken |
|---|---|---|
| structural | dealt axis `state-boundary` (#1) | a literal before/after boundary divides the proof: shaded "Since Sep 24" region, dashed boundary, expected band continuing past it |
| type / identity | Polar house system (GUIDE.md) | numbers in DM Mono tabular, Sora display, Albert Sans body; compact 28/32/40 controls |
| proof / material | dealt `workflow-ui` (#2) + `artifact-document` (#1); move M26 technical monospace voice | the explanation is a document (sentence + contribution bars) layered over the chart's empty space and tied to the point by a leader |

## Divergence row (vs last 8 ledger entries)
| axis | this build | difference |
|---|---|---|
| structure | copy left, product on a cold field that bleeds to the right edge; proof split by a state boundary | not big-copy-above/image-below (LHS-07), no photo + side panel (Linecheck), no side rail / ticket gestures (Ridge 47) |
| type voice | Sora 600 at token display-xl, 3 lines in a 440px column, not full-frame | headline shares the frame with the panel instead of dominating it (LHS-01) |
| palette temperature | cold blue tint field, white raised panel, one red only for "the cause" | not sterile monochrome (Baton), not dark neon (LHS-12), not near-black + lime (Take) |
| CTA grammar | 40px radius-md button carrying the Delta mark, the same mark that labels every explanation in the product | no arrow, no capsule, no inner chip; the glyph links CTA to product identity (LHS-05) |
| nav grammar | wordmark + Sign in + one native `details` Menu | no floating pill nav (LHS-04), normal capitalisation (LHS-02) |
| motion signature | static still; explanation card rises 4px / 300ms ease-enter once, opacity-only safe | no ambient loop (see overrides) |

Diversity gate: `ledger.mjs similar` exit 0. Shares "accent hue" with Linecheck: the blue is Polar's mandated single accent, not a free choice; the Linecheck reject named a blue rectangle *with arrow and no relation to the product*, which this CTA avoids.

## Tokens used (Polar, via var(--...) only)
- Fonts: `--font-display` Sora, `--font-sans` Albert Sans, `--font-mono` DM Mono (GUIDE fonts href).
- Type roles: display-xl (h1), body-lg (lede), heading-sm (panel title), heading-lg size with mono for the KPI, body-sm, label-md, label-sm, mono-sm.
- Colour roles: surface-canvas/raised/sunken/hover, accent-tint (field), accent-tint-hover (expected band), accent-solid (line, CTA), accent-text, text-strong/body/muted, border-hairline/control/strong, danger-solid/text (the anomaly point and the responsible segment only), focus-ring.
- Radius: xs 4 (tags), md 8 (buttons, card), lg 12 (panel, menu), plus 2px on data bars (data marks, not containers).
- Depth: shadow-raised (CTA), shadow-float (panel, card, menu). Spacing: scale only, 4px base. Controls: 28 (panel buttons), 32 (nav), 40 (CTA); 44/48 on mobile for touch.
- Motion: dur-slow + ease-enter for the one entrance, dur-fast for hovers; theme zeroes durations under reduced motion.

## Data honesty
Sample data, labelled twice ("Sample data" tag, "Explained from 42 days of sample events"). Line chart on a zero baseline (0-20%). Mean before Sep 24 = 18.4%, after = 13.1%, drop 5.3 pts; contributions 4.3 + 0.6 + 0.4 = 5.3; bar lengths proportional (100 / 14 / 9.3%). Expected range 17.6-19.2% drawn as a band. Desktop and mobile charts are generated from the same series; mobile shows fewer x ticks so 12px labels stay 12px. No customers, logos, metrics or security claims.

## Rules kept (trimmed slate, 34)
WCSS-39, WDA-14, GOV-68, WDA-01, web.courses-and-curricula#62, a11y-checklist#54, LDP-16, LDP-02, ui-pedia.12-typography#29, PT-SZ-08, AH-TY-01, AH-TY-05, AH-TY-10, LHS-01, LHS-02, LHS-04, LHS-05, LHS-07, LHS-08, LHS-10, LHS-11, LHS-12, LHS-14, LHS-17, LHS-18, LHS-19, LHS-20, LAI-08, LAI-73, LAI-78, AH-CO-01, MCB-14, ui-pedia.07-proximity#2, LHS-58.

Dropped as not applicable to a static hero: AH-MO-28/29, AH-MO-03, magic-ui#5 (no marquee), ui-pedia.20-cards#3, PT-SZ-11, SYS-PRIMER-14, a11y-checklist#30 (no inputs), antd#3 / AH-CO-02 / AH-CO-39 / AH-CO-40 (palette owned by Polar; no badges/toggles), button-taxonomy ui-pedia.13#45/46, GOV-67, proximity#3/#8/#10, Carbon-15, the Emil process rules (#38/#40/#42), typography#13/#17/#25 (scale owned by Polar), LHS-13 (brief asks for mobile).

## Overrides
- override: dealt type_voice `condensed-poster` because the hero is bound to Polar; Sora display-xl is the house voice and a condensed poster face would be a second display family.
- override: dealt palette `botanical-muted` because Polar allows one cold accent hue (236) and forbids a second.
- override: dealt motion `ambient-loop` because Polar caps durations at 300ms and the founder prefers a strong still (LHS-18); a looping pulse on the anomaly would be ambient decoration.
- override: LAI-78 (full state set) partially: CTA has hover, active, focus; no loading state because it is a link to a sign-up page, not an in-page action.

## Check answers
Final: 0 FAIL, 0 WARN, 45 PASS. Earlier WARNs fixed: hard-stop `linear-gradient` field flagged as blue gradient (replaced with a solid `::before` field); skip link under 44px on mobile (now min-height 44px).
