# Halyard: direction

**Brief (assumed, fictional sample brand).** Halyard is an AI on-call engineer for SaaS platform teams: it watches services, finds the cause of an incident, drafts the fix, and asks before it touches production. Audience: platform/SRE leads at 50-500 person software companies. One action: start on-call (free). Proof the visitor needs: a believable incident being worked end to end, with the human approval step visible. All data is sample data.

**Founder ask.** "Look at Marcel's quality of dark designs and Rico's, and create something good." Studied: `knowledge/benchmarks/kargul-deep/gallery/` (116 dark pieces: Uplinq, Zeroleaks, Supermetal, Breez, Ostium) and `knowledge/benchmarks/heyrico/` dark product shots (orchestrator, analytics, composer, triggers). X itself was not reachable (login wall; Claude in Chrome not connected).

## Hero class
Product proof, with a brand-campaign signature visual (the pixel-matrix incident field) beside the headline and the full product window below.

## Concept
Halyard lives on a night watch floor: a dark drafting grid where every service is a cell, an incident is a cluster of cells turning amber, and the agent is a scan line that cools them back to white.

## Reference triad
- Structure: Marcel Kargul / Uplinq (`gallery/uplinq-01.jpg`, `uplinq-09.jpg`, `sheet-uplinq-1.jpg`) -> a hairline cell grid frames the whole page (rails at the content edges, rules between rows); content sits in cells with numbered mono labels; canvas measured #080808, panels #0d0d0d, boxes #111111.
- Type and identity: Rico (`heyrico/orchestrator-split-panel-dark.jpg`, `analytics-dark-full.jpg`) -> neutral grey product surfaces, not black (window #1a1a1a/#171717, side panel #1e1e1e, selected row #292929 measured), hairline edges, a small white pill as the one primary, agent work shown as "Worked for 2m 14s" + source chips + steps + an approval card.
- Proof, material, motion: Marcel / Uplinq + Supermetal pixel-square art lit by a single accent -> one accent, used only to light the art and the thing that needs a human.

## Divergence (vs Kestrel and the last 8 ledger entries: Ferry, Ferry hero, Nocturne, Strata, Tandem x3, Tracewell)
| axis | Kestrel / recent | Halyard |
|---|---|---|
| structure | centred over dashboard (Kestrel, Tandem), split (Ferry) | full-page hairline cell grid; headline in a left cell, pixel field in the right cell, product window in a full-width cell below |
| type voice | Inter 550 (Kestrel, Tandem), Geist (Tracewell, Nocturne) | Instrument Sans 500, h1 56px -0.03em; IBM Plex Mono labels |
| palette | grey + blue, warm white, indigo, green, blue-black | neutral near-black #08080a, signal amber only |
| CTA grammar | fancy ink + white 44 r14, Flo dark pill | `mono`: 36px r4 mono caps square, white fill; twin = text link with arrow |
| nav grammar | grey track + sliding white pill | ruled cell row: logo cell / numbered mono links / actions cell |
| motion signature | tiles + routes, depth-of-field collage, trace bars | pixel cells light amber in a cluster, a scan line passes, cells cool to white; product staggers in, agent timer rolls |
| product world | analytics dashboard + AI panel | incident workspace: thread, latency chart with deploy marker, rollback approval, incident inspector |

<!-- variety: layout=left-over-product nav=G05 button=mono type=grotesk-instrument palette=near-black-amber system=watchfloor -->

## Bound system
system/systems/watchfloor (new seed, compiled: contract met). Role tokens from its `theme.css`; the brand layer in `app/src/index.css` sets the dark canvas steps to the Marcel/Rico measured values.

## Kit primitives used (system/kits/product-hero/GUIDE.md)
Word, Reveal, Stage, RollingNumber. Replaced: PillNav (ruled cell nav), Frame (Rico window), Rails (full cell grid).

## Overrides
- override: variety palette=plum-black because the founder asked for Marcel/Rico dark, measured as neutral near-black (#080808 canvas) with one accent.
- override: variety type=humanist-warm because its own spec says "never for developer tools that need edge"; Instrument Sans keeps a slightly humanist grotesk at weight 500.
- override: variety nav=G14 because G14 forbids a persistent primary and is for literary brands; the ruled cell row (Marcel's Uplinq nav, closest catalogue entry G05) is used instead.
- override: variety system=linework because it is a light vermilion drawing-sheet system; Watchfloor was compiled for this brief.
- override: watchfloor dark canvas #0e0d0b -> #08080a because Marcel's measured field is deeper and a hair cooler; the product window keeps Rico's lighter greys (#161616-#1c1c1c) so it reads as a lit object on the field.
- override: founder "centred copy over a full product dashboard" default because the founder asked for Marcel's dark grammar, which is cell-based and left-set; the full product window still sits in the first scroll.
