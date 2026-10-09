# Ferry hero: direction

**Brief:** Ferry, an AI SDR for B2B outbound teams (founders, agency and recruitment MDs). The one action: start free. The proof the visitor needs: a warm reply really does become a booked meeting with one approval, inside a product that looks finished. Fictional brand; all product data is sample.

**Founder ask (2026-10-09):** "design a cool hero section for that dashboard... a cool layout where the product is cut off on the right and titles and text on the left... something you could build that's cool".

## Hero class
Product proof. The product is the visual and it acts out the promise.

## Concept
Ferry carries a lead across: reply in, meeting out. The page is a sea chart (live bathymetric contours drifting slowly) and the product sails in from the right edge and makes one crossing on load.

## Reference triad
- Structure: Attio and Linear split heroes (copy left, product at real scale bleeding off the right). Rule taken: the product runs at 1:1, cropped by the frame edge, never shrunk to a thumbnail.
- Type and identity: Rico's analytics window (calm Inter product, confident display headline). Rule taken: two text greys do the hierarchy; the accent lives only in data.
- Proof and motion: Kestrel's one timeline plus the founder's "one conceptual reveal". Rule taken: the load-in is a story (a reply lands, the draft types, a cursor approves, Meetings booked ticks 27 to 28), not a parade.

## Divergence (vs Kestrel and the last 8 ledger entries)
| axis | Kestrel | Ferry hero |
|---|---|---|
| structure | centred over dashboard | split: copy left, product bleeding off the right edge and the bottom |
| type voice | Inter 550 -4.5% | Geist 600 display at 72px, -0.05em; product in Inter |
| palette | grey #f7f7f7, blue #335cff | cool chart paper #f7f9fc, sea-blue contours, product blue #266df0 |
| CTA grammar | fancy ink + white, 44px r14 | ink 44px r14 + text-only secondary, left-aligned |
| nav grammar | grey track + sliding white pill | white pill holding mark, wordmark and links on the left; actions right |
| motion signature | tiles + routes landing dots | product enters from the right, then performs one workflow; the left "how it works" steps light up in sync |
| product world | analytics dashboard + AI panel | the Ferry inbox: replies table, AI draft card, booked meeting |

Signature visual: live sea-chart contours (domain-warped fbm iso-lines, index contour every 5th, depth tint, soundings). Strata's engraving was lit terrain ridges in a centred hero; this is a flat chart that fades behind the copy.

## Bound system
Ferry's own product tokens (`app/src/ferry/tokens.css`, from the v3 dashboard): one product = one system, so the hero uses the product's greys, blue, chip and button grammar. The brand layer in `index.css` maps the kit names onto those values.

## Kit primitives used
Stage (product entrance, re-tuned to travel from the right), Frame (double bezel), Reveal (copy as one block), PillNav (links). Replaced: Word parade (not used), Rails (not used), Route and FloatTile (the story replaces them).

## Overrides
- override: centred-saas-hero-default because the founder asked for this split layout explicitly.
- override: larpo-automatic-left-copy-right-dashboard-layout (ledger diversity gate) because the founder requested exactly this layout ("product cut off on the right and titles and text on the left"); it is deliberate, not a default. Divergence lives in the live product story, the stage panel and the status pill.

## Round 2-3 (founder feedback)
- Round 1 verdict: kept title, subtitle, buttons, nav, product; rejected the sea-chart contour field and the three steps ("so stupid"). Removed both; studied Lightfield, Folk, Attio, Linear, Ramp, Pylon, Clay, Granola (knowledge/benchmarks/split-heroes).
- Round 2 verdict: "the bluish not bad"; unsure about the pop-up draft card and the dashboard size; "just empty... too simple". Now: blue grain stage is the default; no pop-up card; the dashboard renders at 0.82 zoom so more of it shows; the product is live (replies arrive, AI drafts, a cursor approves inline, rows book, KPIs tick) and a Lightfield-style status pill above the window narrates the agent.
- override: rails because rails crossing a product that bleeds off two edges would cut it; the chart field is the texture and it fades behind the copy instead.
