# Canon: motion (only when motion is in scope)

Decided defaults, 2026-10-21. **Default for every deliverable: no animation, screenshots only** (L358, L512). This page applies when the founder names motion ("animate it", "load-in", "video") and DIRECTION says `motion: asked`. Gate number: `system/canon/motion.json` (`motionDefault`); the timing numbers below have no schema key yet and are checked by filmstrip.

## Floor references
- **Showcase wave:** Kite showcase, `work/kite/showcase/kite-showcase-4k60.mp4` (+ `showcase-2x.png`), the slow wave + pixel map was "amazing" (L497).
- **Dashboard load-in:** Kite dashboard, `work/kite/kite-loadin-4k60.mp4`, settle ~2.5s (L415); timeline in `work/kite/DIRECTION.md` "Load-in".
- **Hero load-in:** Kestrel (ledger `2026-10-08-kestrel`, "top tier quality with animations"), kit `system/kits/product-hero/` (`motion.ts`, `T` timeline).
- **Product build-in and numbers:** Ferry hero round 4-5 (L319; kit `RollingNumber`).

## Reading set (5 files)
1. this page
2. `system/kits/product-hero/GUIDE.md` ("timeline discipline", "product build-in")
3. `work/kite/DIRECTION.md` section "Load-in"
4. `knowledge/larpo-shipped/kaching-DESIGN-SYSTEM.md` "Motion defaults" (tokens, reveal rules, LCP rule)
5. the last 5 ledger rounds

## Decided numbers

| Part | Default | Source |
|---|---|---|
| When | only when asked; never add video, loops or load-ins to a still request | L358, L424, L512 |
| Curve | one expo-out `cubic-bezier(.16, 1, .3, 1)` everywhere (Kaching `ease.outExpo`); controls `[.22, 1, .36, 1]` 220ms | L415; Kaching tokens |
| Durations | 0.6-1.2s, overlapping; staggers 35-60ms; glides, no bouncy springs | L415 |
| Settle | the last element of a hero or dashboard load-in settles at 2.2-2.8s (target 2.5) | L415 |
| Grouping | one conceptual reveal tied to the brand idea + at most 3 entrance groups; the composed headline + CTA readable by ~300ms unless the concept needs a reveal; word-by-word headlines only as one brand's deliberate choice | L195 |
| Order | frame -> nav -> copy -> stage -> product contents top to bottom (sidebar items 25ms apart, header, KPIs, rows 35ms apart) -> live story; nothing visible before its moment | L174, L319; GUIDE |
| Showcase / video wave | every component rises together: start offsets ~80ms, each settling over ~1.6s on expo-out, ~28px travel; the signature visual resolves inside its card while it rises; the payoff state lands as the wave settles (~1.6-2s); every card present by 0.8s | L497 |
| Numbers | roll digit by digit in masked slots (`RollingNumber`, 45ms stagger), never a fade or a whole-number count | L319 |
| Loops | start at opacity 0 (`opacity: [0, .4, 0]`, `times: [0, .05, 1]`) or inside a group that enters at its moment; cause then effect; at most 2 looping effects in the first screen; at most 1 moving element at a time in a looping section visual | L178, L388; CLAUDE.md effects |
| Blur | 6px blur on text-sized blocks only; never on large surfaces | L174, L415 |
| Per-visual signature | each product visual has its own build-in (rows assemble, a cursor acts, a photo develops, a connector draws) on the shared tokens | L207 |
| Hover / press | lightness or alpha one step, 120-200ms; press scale 0.98 (0.97 dense app); no lift; hovers only under `@media (hover: hover)` and mouse pointers; shared `layoutId` pills slide | L174; Kaching; HC-14; GUIDE rule 4 |
| Performance | first frame after load paints within ~50ms; heavy setup (dot maps, geo tests) never blocks the main thread (canvas masks, not per-dot polygon tests) | L415 |
| Reduced motion | `MotionConfig reducedMotion="user"` + `useReducedMotion()` drops loops, travel and blur; final state shown | GUIDE rule 5 |
| Recording | `tools/record.mjs` (Reel virtual clock) at 4K60; `--preset x` for X; contact sheet at 0.3 / 0.8 / 1.2 / 1.6 / 2.0 / 3.0s | CLAUDE.md; L497 |

## Contradictions resolved (audit 4.1 "Motion")

| Topic | Default | Alternative only when | Superseded lines |
|---|---|---|---|
| Animate or not | no | `motion: asked` | L174's "every hero loads in as one orchestrated timeline" as a default; REPLICATE-FIRST "no animation unless asked" stands |
| Parade vs reveal | one conceptual reveal + <= 3 groups | the full Kestrel word-by-word stagger once, for one brand, named in DIRECTION | L174's word-by-word order as the default |
| Curve and timing | expo-out, 0.6-1.2s, settle 2.5s | Kaching `ease.reveal` 1.2s + 0.9s fade only on Kaching work and scroll reveals | L174 token list as the hero default |

## Never (rejected, with evidence)
- "Everything is just loading in" parades on every brand (Nocturne, ledger `2026-10-09-nocturne`, L195).
- Looping dots visible from page load (Margin, L178; Kestrel r5 "always visible").
- ~3.8s ("FASTER") or ~1.8s with springs and blur on cards ("too fast and not smooth") (Kite, L415).
- Map-first sequences, scan beams, light bars, flashes, waits before the payoff (Kite showcase, L497).
- Every visual entering "like a card" (Kaching visuals, L207).
- Replaying an icon animation on a repeat click (Kaching BFCM, L500 "rejump").
- Animating a post or hero nobody asked to animate (Expense, ledger `2026-10-20-weft-expense`).

## Pre-delivery checklist
1. DIRECTION says `motion: asked` with the founder's words.
2. Filmstrip at 0 / 300 / 800 / 1500 / 2500ms: no looping element visible before its entrance; copy readable by 300ms (unless the concept says otherwise); <= 3 groups.
3. Last element settles at 2.2-2.8s (load-in) or the payoff lands by ~2s (showcase).
4. All delays derive from one `T` object; tokens in one `motion.ts`.
5. First paint < 50ms (rAF probe); no main-thread stall during the load-in.
6. Reduced motion shows the final state; nothing transparent covers interactive elements.
7. Still frame delivered alongside the video; video only in the formats asked.

## Open
- Motion for full multi-section sites (scroll reveals beyond Kaching's tokens) has no verdict on our own builds.
