---
source: founder
chapter: How the founder gives feedback, and how to act on it (Kestrel, the first "top tier" result)
pages: n/a
topic_tags: [founder, feedback, process, quality-bar, kestrel, iteration]
status: studied
---

# Feedback playbook

The founder judges by eye, fast, in short messages, often with a cropped screenshot. The words are loose; the eye is exact. This note records how to read that feedback and the full Kestrel journey (from "this looks ass" to "fucking amazing, top tier"), so the next build starts where Kestrel ended.

## 1. Core ideas

1. **A cropped screenshot is the spec.** When a message comes with a crop (the 7d/30d/90d control, the logo), the problem is inside that crop, even if the words point elsewhere. Zoom into the same region of your render at 2-3x before changing anything.
2. **Words are approximate; diagnose before editing.** "Too rounded, not consistent, not spaced centre" was about centring and equal heights, not about softness. Tightening radii made it worse ("too little rounding... I liked it previously"). Measure the thing (computed styles, element boxes) and change the smallest cause.
3. **Praise marks the floor.** Once a version is called "fucking amazing", every later change must keep everything that was not mentioned. Diff computed styles against the loved version (`git show <commit>` rebuild + compare `getComputedStyle`) before shipping a tweak.
4. **Feedback lands in the engine the same turn.** Every point becomes a `[founder]` rule in `founder-taste.md` with the verbatim quote, then `build_index.py`, then the ledger. Feedback that only lives in chat is lost.
5. **A reversal is a correction, not noise.** When the founder reverses an earlier call, rewrite the earlier rule in place (do not stack contradictory rules) and record why the first reading was wrong.
6. **"Use the engine" means the library, not a stunt.** Novelty lives in components and details inside the clean SaaS look; a jump to an experimental art direction (Vigil v2) is a reject.
7. **Motion is part of the design.** The founder checks the live page, not only the PNG: static dots, a nav that does not animate, or a layer that blocks hovers are defects.

## 2. Rules

- **RULE** [founder-process] Before acting on feedback that includes a screenshot, crop the same region from your own render at 2x or more, state in one line what is actually wrong there (measured), then change only that.
  **Why** Kestrel round 3: the words said "too rounded", the crop showed misaligned heights; acting on the words broke the loved radii.
  **Applies to** all. **Check** the reply names the measured cause (heights, radius, offset) before the fix. **Source** founder, Kestrel rounds 2-4

- **RULE** [founder-process] After any tweak to an accepted design, rebuild the accepted commit and diff computed styles (radius, size, colour, spacing) element by element against the new build; anything not asked for must be identical.
  **Why** Kestrel round 3 silently sharpened every radius by about 4px when classes were "normalised"; the founder caught it immediately.
  **Applies to** all. **Check** a diff script output with only the requested properties changed. **Source** founder, Kestrel round 5

- **RULE** [founder-process] Record every founder message as rules in the same turn: one rule per point, verbatim quote in **Why**, then rebuild the index and update the ledger entry (append the round's quote to `why`).
  **Why** The engine only gets better from verdicts it keeps.
  **Applies to** all. **Check** `git log` shows a founder-taste.md change in the commit that applies the feedback. **Source** CLAUDE.md, founder

- **RULE** [founder-process] Deliver each round as: the image (2x, plus 4K when asked), a live localhost URL, and a short list of what changed mapped to what the founder said; end with one question asking for the verdict.
  **Why** The founder reviews visually and on the live page; mapping changes to their words lets them verify fast.
  **Applies to** all. **Check** reply contains image, URL, change list. **Source** founder, Kestrel rounds 1-6

- **RULE** [founder-process] Run the final audit before every handoff, never after the founder looks: computed styles across every state and overlay (one field height and radius, type only from the scale, one edge per box, one hover / selected / focus language, pointer on every clickable, no clipped labels, no horizontal scroll) at 1440, 1100 and 390, light and dark. Fix every mismatch first.
  **Why** Sellify Video Ad Creator, 2026-10-14: "WHY THE INPUT FIELD ROUNDNESS NOT THE SAME AS OTHERS... NOT DOING FINAL CHECKS"; same rounds: "especially on hover and selected like visuals... just ass".
  **Applies to** all. **Check** the delivery message includes the audit result (zero findings or the listed exceptions). **Source** founder-taste.md (final checks rule, 2026-10-15); `approval-and-generation-ui.md` APR-18

- **RULE** [founder-process] When the founder asks for more output ("run agents run tasks do more design"), split independent pieces into parallel sessions or agents (one writer per set of files) instead of doing them one by one in a single thread.
  **Why** Founder, 2026-10-15: "run agents run tasks do more design".
  **Applies to** all. **Check** independent pieces were started in parallel; no two writers touched the same files. **Source** founder, 2026-10-15

- **RULE** [founder-process] Every lesson lands in the engine in the same session: founder verdicts in `founder-taste.md`, client research, UX studies and reviews in `knowledge/` in SCHEMA form, then `build_index.py`. A study that only lives in a client folder or a chat is lost.
  **Why** Founder, 2026-10-15: "is your research and studies ... updated to our design engine folder too?"; and on improving the engine itself: "that's the entire point of it".
  **Applies to** all. **Check** the session's commit touches `knowledge/` and `system/rules/index.json`. **Source** founder, 2026-10-15; CLAUDE.md "Updating the brain"

## 3. The Kestrel journey (what each round taught)

| round | founder said (verbatim, trimmed) | what it meant | rule |
|---|---|---|---|
| Vigil v2 (reject) | "this looks ass... clean centre layout... full dashboard visual... AlignUI aesthetic I love most" | default SaaS hero = centred copy over a full product dashboard, light and clean | founder-taste "default SaaS hero is centred and product-led", "AlignUI aesthetic" |
| Kestrel 1 | "nav bar taller... cramped", "no little text above the title", "dotted bg texture inside the borders (like Commslayer)", logo = supplied flower, "sidebar a bit too rounded", "buttons so stiff", "blue outline I don't like", "fucking awesome" | polish details, not direction | 6 rules (nav >= 36/40px, no chip, rail-bound texture, soft CTAs, no accent ring, trace supplied logo) |
| Kestrel 2 | "fucking amazing... love it so much", "remove the see it answer icon", "dashboard components too rounded, not consistent, not spaced centre" (crop: 7d/30d/90d + share) | equal heights + centred labels; NOT tighter radii | secondary CTA text-only; controls in a row share height |
| Kestrel 3 | "too little rounding compared to the rest of the dashboard, I liked it previously" | the tightening was wrong | radius ladder rewritten |
| Kestrel 4 | "where is the product roundness smooth as it was?? wtf" | radii must equal the loved build as rendered (theme aliases `rounded-md` = 8px) | measure rendered radii; ladder 8 / 12 / 16 / 22 |
| Kestrel 5 | "blue dots always visible, no animation, plus nav bar too... make everything smooth using framer motion", "smoother with stagger... check how we have Kaching" | one orchestrated load-in on Kaching tokens; nothing visible before its moment | founder-taste motion rule; `system/kits/product-hero` |
| Kestrel 6 | "top tier quality with animations... save the way I feedbacked" | Kestrel is the reference build | this note; `knowledge/engine-accepted/kestrel/` |

## 4. Dos and Don'ts

- **Do** zoom into the crop the founder sent, at the same place in your render. **Don't** reinterpret the words without looking.
- **Do** keep a loved version reproducible (commit hash in DIRECTION.md). **Don't** "clean up" classes or tokens in an accepted build without a computed-style diff.
- **Do** answer "did this come from the engine?" honestly: name what came from rules, systems, benchmarks and tools, what came from the founder's rounds, and what was in-the-moment judgement, then fold that judgement into the engine.

## 5. Exceptions & judgement calls

- Profanity is emphasis, not anger at the work: "fucking amazing" and "wtf did you do" are both precise signals about one thing; respond with the fix, not an apology essay.
- When a founder rule and a measured benchmark disagree, the founder wins for this brand; record the benchmark difference in the brand's DIRECTION.md.

## 6. Figures worth keeping

- `knowledge/engine-accepted/kestrel/kestrel-fold.png`: the accepted state.
- `work/kestrel/DIRECTION.md`: every round, with commits.

## 7. Open questions

- Whether "dots inside the borders" should become the default background for every light hero, or stay a Kestrel/Commslayer move. Ask on the next brand.

## Kite hero (2026-10-14/15): ~20 rounds to "kinda not bad", and why
The result was accepted, but most rounds were avoidable. What went wrong, in order:
1. **I improvised effects instead of applying the rules.** Glows, globe, light ribbons, hatching, chips: each was invented in the moment and rejected. The rules already said no chip, Title Case, no full stop, 64px CTA gap, Kestrel type and the product's own buttons. The turning point was the founder's "use our knowledge" and a written checklist in DIRECTION.md, measured before showing.
2. **I swung to extremes on feedback.** "Too much" became bare black; "less distracting" became nearly invisible; "too visible" was fixed by changing position, which was what he actually meant. Change one variable, a little, in the direction asked; when he points at a past version, restore it exactly.
3. **I copied references wholesale** (Linear, Basit, Supabase+Cursor) instead of carrying over what he loves in our own builds: Kestrel's type (Inter display cut, 550, -0.045em), spacing and restraint.
4. **I missed technical details he caught by eye:** plain Inter (no optical size) at 68px, two fonts in one fold, a 1000px one-line subtitle, ring + inset double edges, a backdrop blur inside a masked layer.

**Default for the next hero, from round 1:** run select_rules, write the founder-rule checklist with target numbers into DIRECTION.md, build Kestrel's type system and the product's own buttons, use one background built from the product's own visual language (soft, monochrome, wrapping the copy), measure everything, check edges at 2x, then show.

## 8. Phrase book: what the founder says, what it means, what to check

Built only from real messages (quotes in `founder-taste.md` **Why** lines and this note, plus the 2026-10-14/15 Sellify rounds). The words are loose; the fix lives in the measurement. Read the phrase, then run the check before touching anything.

| He says (verbatim, trimmed) | What it usually means | What to check / do |
|---|---|---|
| "this looks ass", "straight up dogshit" (Vigil v2, Tracewell, Quillwork) | Direction-level reject, not a polish note | Stop tweaking. Put the fold next to the accepted refs (Kestrel, Kaching, Capto) and rebuild the direction from them |
| "not bad", "not bad actually, you're getting better" (Strata, Ferry, Kite v1) | Direction accepted; only the named items are wrong | Change only what he named; computed-style diff everything else against the previous build |
| "fucking amazing", "top tier quality" (Kestrel) | The floor is locked | Record the commit; every later change gets a computed-style diff against it |
| "components too rounded, not consistent and not spaced centre" + a crop (Kestrel 2) | Something inside the crop is misaligned (heights, centring), whatever the words say | Zoom the same crop at 2x; measure heights, centre offsets and radii before editing |
| "I liked it previously", "you had it right in this [screenshot]", "the first original one was best" | Restore that exact version | Rebuild the named version, copy its values, change only the property he names (often position) |
| "wtf" on a crop ("sidebar top wtf???", "double top border and gap between it") | One precise visible defect in the crop | 2x crop; look for double edges, clipped marks, stray pills, off-scale controls |
| "out of place not nice nor consistent" (Sellify 2026-10-14) | Screens or parts do not share one container, type and radius grammar | Audit container grammar (tray, strip, card), type tuples and the radius ladder across every screen |
| "wtf is with aspect ratios" (Sellify) | Media ratios vary by accident, or a 9:16 sliver sits in a list row | Computed `aspect-ratio` per media role: one ratio per role, square row thumbs |
| "those little black icon boxes don't look good enough" (Sellify) | Filled icon tiles used as decoration | Plain 16px secondary icons in title strips; no black icon tiles |
| "WHY THE INPUT FIELD ROUNDNESS NOT THE SAME AS OTHERS... NOT DOING FINAL CHECKS" | A control off the shared height or radius, and no audit was run | Every input, textarea, select and custom trigger: same height and radius; run the full audit before showing |
| "especially on hover and selected like visuals... just ass" | Hover and selected states were improvised per component | One state language: quiet edge on hover, selected = ring with a canvas gap, one focus ring; no tints or zoom |
| "super super bad and inconsistent and the ugliest" (ENG-2105 round 1) | A new screen was built from its own stylesheet | Rebuild from the app's kit (`system/kits/product-studio/` or the client's kit); no new tray, card, badge or step strip |
| "do it in our affectUI / AlignUI style... nice and sleek" | Use the light product-UI grammar the engine already has | `knowledge/web/affectui-product-kit.md` + `system/kits/product-studio/` |
| "better and cleaner", "a bit dirty" (Settle) | Too many accents, rings or surface steps | Count hue families, ringed boxes in the fold and surface steps; cut rings a gap can replace; one accent |
| "there may be a lot of content pieces so make sure they would not squish" | Design for real volume, not the sample | Test grids with 1, 4, 12, 40 items and 60-character names; wrap, ellipsis + title, scroll inside popovers |
| "less is more" then "now too little", "flat and empty" (Kite) | You swung too far; he wants the middle | Change one variable a little in the asked direction; never jump to the opposite extreme |
| "too alike", "you're a bit repetitive" (Vigil v1, after Kestrel/Margin) | Structure, type or buttons repeat recent builds | `ledger.mjs similar`, `variety.mjs pick`; change structure, not surface |
| "too noobish", "nothing like Marcel Kargul's style nor Rico... nothing like Attio" (Acquisity) | Product UI lacks craft density and real detail | `tools/compare.mjs` side by side with the named reference at the same zoom |
| "not busy, just simple and quality... not AI shit" (Kaching MCP) | Too many moving or decorative parts, invented marks | One moving element, real brand marks, no box-in-box |
| "a bit tilted and off" (Perch) | Perspective at rest | rotateX/rotateY = 0 at rest |
| "FASTER" then "too fast and not smooth" (Kite) | Load-in timing is off both ways | ~2.5 s settle, one expo-out curve, no main-thread blocking |
| "just hero bro, not entire web" (Kite) | Scope creep | Build exactly the named scope |
| "find some example online and replicate" (Kite) | Stop iterating blind | Pick a measured reference, replicate its grammar, swap content, compare side by side |
| "use our knowledge" (Kite) | Rules already cover it | Run `select_rules.py`, write the founder-rule checklist with target numbers into DIRECTION.md, measure before showing |
| "run agents run tasks do more design" (2026-10-15) | Wants parallel throughput | Split independent pieces into parallel sessions or agents |
| "is your research and studies ... updated to our design engine folder too?" (2026-10-15) | The engine must learn from every study | SCHEMA note in `knowledge/`, INDEX row, rebuild the index, same session |

Process expectations behind all of this: final audits before handoff (he should never find a mismatched field), parallel work when he asks for more, and every lesson saved to the engine in the same session.

