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
