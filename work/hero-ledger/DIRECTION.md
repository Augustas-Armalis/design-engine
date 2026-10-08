# hero-ledger: Tally (fictional), bound to the Ledger house system

**Brief, one line:** Tally is spend management for finance teams at mid-size companies (cards, approvals, a month-end close that reconciles itself); the visitor is a controller or finance lead; the one action is *Book a demo*; the proof they need is seeing open items actually resolve into a reconciled close, not a pretty dashboard.

Assumption: the audience is US-based (USD, MM/DD-free dates written as "28 Sep"), and the demo is a 30-minute call. All figures are sample data for a fictional company ("Northwind Freight, sample").

## Hero class
**Product proof.** The objection is "month-end can't really reconcile itself"; only interface evidence of open items closing answers that (LDP-02: interface proves value, so product dominates).

## Concept
The hero *is* September's close statement for a sample company: a single ruled document whose title is the headline, whose rows are reconciling while you watch, and whose sign-off line is where you book the demo. Month-end, reduced to a signature.

## Reference triad
- **Structural:** the printed accountant's working paper / bank reconciliation statement (title block, ruled rows, totals rule, "prepared by / reviewed by" sign-off). Rule taken: *one document is the whole frame; headline, proof and action are parts of the same object, not three stacked blocks.*
- **Type / identity:** the Ledger system itself (Newsreader 500 serif display over Public Sans, Plex Mono figures; editorial finance publishers). Rule taken: *serif speaks, sans explains, mono counts; never bold the serif.*
- **Proof / material / motion:** the accountant's amendment convention (a corrected entry is struck through and the correction written beside it, never erased). Rule taken: *the resolved state keeps its audit trail*: each fixed row shows the struck original problem next to what Tally did, so even a still screenshot shows before -> after.

## Divergence row (vs the last 8 ledger entries, all rejects/caption seeds, plus the rejected default skeletons)
| axis | this hero | how it differs |
|---|---|---|
| structure | poster as one document: headline, table and CTA live inside a single ruled statement | not left-copy/right-dashboard (LHS-06), not big-copy-above/photo-below (LHS-07): there is no separate "image"; the headline is the document's title block and the CTA is its sign-off |
| type voice | serif display 500 + sans + mono figures (Ledger) | no oversized grotesk (LHS-01); headline is 76px max and shares the frame with the data |
| palette temperature | material-monochrome: warm paper canvas, ink, one evergreen used only for forward action and resolved states | not dark-neon/glow (reject seed), not thin grey monochrome (LHS-11): warning/success tints carry the state change so the proof survives feed scale |
| CTA grammar | inline in the document: the "Signed off by" line ends in the Book-a-demo control, with a reviewer's tick box that ticks on hover | not a pill, not a bright rectangle + arrow (LHS-04/05) |
| nav grammar | index-list nav (01 Cards, 02 Approvals, 03 Close, 04 Pricing) beside a serif wordmark; collapses to a Menu disclosure on mobile | no floating pill nav (LHS-04) |
| motion signature | state transition: three open items resolve in sequence (struck, then corrected), the open-items counter rolls 3 -> 0, status flips from "Closing" to "Ready to sign"; one Replay control | no ambient effects (magic-ui#1); calm, zero bounce |

Dealt candidate: **#2** (product-proof / poster / mono-plus-sans / material-monochrome / inline-in-copy / index-list-nav). Combined with #3's motion axis (**state-transition-demo**) instead of #2's "still-with-craft", because the brief asks for a state that resolves. #2's "numeric-evidence-wall" is reduced to one numeric focal (open items) plus a totals rule, not a wall, to avoid LHS-09 busyness. Moves M21/M12 not used (Ledger forbids a custom face; overlap stack would fight the hairline-only depth rule).

## Tokens used (Ledger only, via var(--...))
- Fonts: Newsreader / Public Sans / IBM Plex Mono via the GUIDE href; `--font-display`, `--font-sans`, `--font-mono`.
- Type roles: `--text-display-xl` (h1), `--text-display-lg` (open-items numeral, mono), `--text-heading-md` (wordmark), `--text-body-lg`, `--text-body-md`, `--text-body-sm`, `--text-label-md`, `--text-label-sm`, `--text-mono-sm`.
- Colour roles: surface-canvas/raised/sunken/hover, text-strong/body/muted, border-hairline/control, accent-solid/-hover/-tint/-text/-border, warning-tint/-text/-border, success-tint/-text, focus-ring, text-on-accent.
- Radius: md 4 (CTA, chips), lg 6 (statement sheet), xs 2 (tick box). Depth: border only (`--shadow-raised`).
- Spacing: the scale, 4px base. Controls: 40 (nav), 48 (CTA). Motion: `--dur-base`/`--dur-slow`, `--ease-enter`/`--ease-standard`.

## Rule slate (kept ~40 of 60)
Kept: all founder LHS rules, LDP-16, LDP-02, focus rules (catalyst#4, WCSS-39), skip link (a11y#27), target size (a11y#54), one h1/landmarks (courses#62), PT-SZ-08 line length, AH-TY-10 leading, AH-TY-05 roles, contrast gate (color#15), AH-CO-19 follow system scheme, stripe#6 one button grammar, landing#7 one primary action, LAI-73 link-vs-button semantics, dos#49 filled CTA, NNG-14 false floor, motion rules (Carbon-15 easing, emil#5/#6 duration and zero bounce), spacing MCB-14 / whitespace#11 / proximity#2, AR-07 live region (status announces "Ready to sign").
Dropped (do not apply to a static single hero): AH-MO-25 spinner/bar swap, magic-ui#5 marquee, cards#3/#18/#21/#25 (no cards, no images), AH-CO-28 glass, AH-CO-02 increased-contrast variant (system-owned; Ledger has no such variant and I must not invent tokens), LW-15 dev-product skeleton, buttons#45, dos#84, web.motion#23 / AH-MO-03 (no gestures), NNG-23 pricing (Pricing is linked in nav; no price exists for a fictional product), PT-SZ-11, AH-TY-01 (13px desktop body N/A), typography#18 heavy weights (Ledger forbids bold serif), color#12 (system-owned dark accent), uswds#3.

## Overrides
- override: Ledger type roles (no mono display role) because the single open-items numeral is the focal metric and the owned decision "all metrics in tabular mono figures" outranks the missing role; it uses `--text-display-lg` size with `--font-mono`, flagged here rather than inventing a token.
- override: LHS-07 (big-copy-above / product-below) is *not* broken, but flagged: the headline does sit above rows. Defence: they are one object (title block of the statement), the right side of the title row carries the live counter, and the CTA closes the document at the foot, so the frame reads as a single statement rather than headline + picture.

## Check WARN answers
(filled in after each check run, below)
- Run 1: 2 FAIL (axe aria-prohibited-attr: aria-label on a plain span for the counter; fixed with visually-hidden text), 1 WARN (skip link 38px tall on mobile; fixed, now 44px). Runs 2-4: 0 fail, 0 warn, 45 pass.

## Critique log
1. Run 1 eyes: the headline wrapped to three lines (13ch cap), pushing the only CTA below the 900px fold; title block had a dead right half. Fixed: 17ch measure with a deliberate break ("Month-end, reduced / to a signature."), CTA now at ~790px.
2. Run 2 eyes: signature line was 67px while the CTA stretched 318px (the helper text was widening the CTA column), which inverted the sign-off metaphor. Fixed: helper spans the line + button columns, button is compact, line is long. Bare totals row read as an empty row: removed default `dl` margin and gave totals the bookkeeper's double rule (3px double, border-strong), which also marks "end of figures, start of sign-off".
3. Run 3 eyes: mobile sub-copy orphaned "signs."; added text-wrap: pretty. Mobile is its own composition: a slip with 3 resolving items only (the 2 pre-matched rows are dropped), stacked merchant/amount, full-width CTA under the signature line, Book a demo also in the Menu since the in-document CTA sits at ~1200px.
- Known weakness: at both sizes the screenshot shows the resolved end state (check.mjs finishes animations); the before state survives only as struck-through amendments. The open-items numeral (52px mono) is a modest focal next to the 76px headline; acceptable because the headline should lead.

Diversity gate: `ledger.mjs similar` exit 0 (shares only headline size with Baton/Linecheck).
