# Margin: direction

**Brief (random SaaS, full homepage, "show me the best you can do"):** Margin, AI code review for engineering teams. It reads each pull request, pins notes to the exact lines (blocking / should fix / nit) and suggests fixes you can commit. Audience: engineering leads and senior devs. One action: install the GitHub app. Proof needed: a real-looking review on a real-looking diff (labelled sample).

## Hero class
Product proof. Centred copy over a full PR-review window (founder default), then a full homepage on the product-site blueprint (knowledge/web/product-site-anatomy.md).

## Concept
A senior reviewer's notebook: notes written in the margin of your code, pinned to the line they are about.

## Reference triad
- Structure: Kestrel (engine-accepted) + Linear/Cursor product heroes -> centred stack over a bleeding product window, frozen mid-task ("Reviewing 12 of 14 files").
- Type and identity: AlignUI marketing layer -> one confident accent, warm greys, 550-560 weight, tight tracking; Instrument Sans for a warmer, more editorial voice than Kestrel's Inter.
- Proof, material, motion: founder flowing-routes rule -> connectors drawn from each AI note to its code line; Kaching motion tokens.

## Divergence (vs last accepted: Kestrel, and the last 8 ledger entries)
| axis | Kestrel | Margin |
|---|---|---|
| structure | centred over dashboard | centred over PR review, then 7 sections |
| type voice | Inter 550 -4.5% | Instrument Sans 560 -4% |
| palette | grey #f7f7f7, blue #335cff | warm paper #f6f5f1, signal green #0c7f44 |
| CTA grammar | fancy ink + white, 44px r14 | green primary with GitHub mark + white secondary |
| nav grammar | grey track + sliding white pill | one white floating capsule bar, grey hover pill slides |
| motion signature | tiles + routes landing dots | diff lines type in, notes land, connectors draw to their lines |
| product world | analytics dashboard + AI panel | PR diff + file tree + margin notes |

## Bound system
system/systems/margin (contract met)

## Kit primitives used (system/kits/product-hero/GUIDE.md)
Word, Reveal, Stage, Frame, Rails, InView (new: scroll reveals). Replaced: PillNav (capsule bar), Route (note connectors), FloatTile (none).

## Overrides
- none yet. Proof strip shows languages reviewed, not customer logos (never invent proof).

## Build 1 (first try with the kit + research)
Scaffolded with `node tools/new_build.mjs margin --system margin`; full homepage on the product-site blueprint: hero (PR review frozen mid-task, notes land, connectors draw to their lines), language proof strip (no invented logos), chapter with inline note crop bleeding right, 5-tile bento (lead tile 2x), auto-advancing story tabs with progress, breather, closing CTA, footer landmark. Check desktop 0 fail (line numbers and language names darkened for contrast; footer made a real landmark). Gate: Kestrel 3/10 after locking the founder-mandated hero layout axis (ledger.mjs LOCKED). Warnings justified: 14px median body is product UI; one balanced 33-char line is the breather. Mobile not designed (desktop-only phase).
