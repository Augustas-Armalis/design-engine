---
name: design-engine
description: The single entry point for the design engine. Use for any design brief or design work: SaaS/AI-SaaS heroes, landing pages, full websites, bento/sections, product UI, client apps, branding and logos, X/social design posts; for reviewing and fixing existing work (a URL, repo or screenshot); and for designing from references (find, replicate, design in a style, combine). Routes to one mode card, reads at most 5 files, builds, gates, delivers, records the verdict.
---

# design-engine (router)

You are the front-end design brain. One brief in, work a top studio (Kargul, Linear, Attio, AlignUI, Basit, Flo, Kuleszo) would sign.

**Before anything else, do these three things:**
1. Pick the mode below.
2. Pick the kind.
3. Open `knowledge/founder/canon/<kind>.md`.

The canon is the decided default for that kind and outranks every other doc. `founder-taste.md` is the evidence log behind it.

## 0. Always
- **Scope:** build only what was asked. A "hero" is one 1440x900 fold. Write `scope:` with the founder's exact words, and `motion: none` unless motion was asked for. Stills are the default.
- **Measure, don't eyeball.**
  - Use `node tools/probe.mjs <png> px|row|col|box ...` for colours, edges and text boxes.
  - Use `node tools/compare.mjs <url> <ref.png> <out> --w --h --scale` for the overlay.
  - Use `getComputedStyle` for rendered radii and fonts. Class names lie: `theme.css` remaps radii.
- **Never invent proof.** Sample data is labelled. Logos and copy from references stay in studies, never in a deliverable.
- **Every founder message is a verdict.** Run `node tools/verdict.mjs <name> --round N --verdict ... --why "<his words>"` and edit the canon value it changes in the same turn. Never record words he didn't say.

## Kinds (canon pages)
- **Heroes:** `hero-light`, `hero-dark`.
- **Pages and sites:** `full-website` (multi-section site or landing), `section-bento`.
- **Product:** `product-ui`, `client-app` (an existing client codebase, e.g. Sellify).
- **Brand and social:** `branding`, `logo`, `post-component` (X posts).
- **Process:** `audit`, `motion` (only when motion is in scope).

## Mode A: design from scratch
1. **Restate** in one line: product, audience, the one action, the proof the visitor needs. Ask one sharp question only if a wrong guess would be costly; otherwise state the assumption.
2. **Read at most 5 files:**
   - the canon page;
   - its floor reference fold and spec (`knowledge/engine-accepted/<name>/`);
   - the last 5 rounds: `node tools/ledger.mjs list --recent 5` (rejects first);
   - one live reference for the owned decisions, if needed.
3. **Write `work/<name>/DIRECTION.md` with these fields:**
   - `scope:`, `motion:`, `mode: A`, `kind:`, `floor:` (accepted reference);
   - owned decisions, at most 3 (the brand, the signature visual, one product-specific detail);
   - the canon checklist with the measured values you will hit;
   - `override: <rule> because <reason>` for anything you break on purpose.
4. **Pick variety from the approved pools only:** `node tools/variety.mjs pick --kind <kind> --seed <name>`. Variety lives in the button effect, nav construction, background layer and signature visual. It never lives in the type floor or in polish.
5. **Build.**
   - Heroes and sites: `node tools/new_build.mjs <name> --system <slug>` (Vite + React + Tailwind v4 + `motion`).
   - Apps: Next.js + Tailwind v4 + coss ui (`docs/coss-ui.md`).
   - Use real landmarks (`main`, a single `h1`) and real buttons and links.
   - Mark the hero product `data-product` and a post subject `data-subject`.
6. **Gate (all must pass, 0 FAIL):**
   - `node tools/gate.mjs <url> --kind <kind> --name <name> --direction work/<name>/DIRECTION.md`. This covers the consistency censuses: edges and shadows, radius ladder, type, colour, button grammar, hero composition, scope and motion.
   - `node tools/design_view.mjs <url> --kind <hero-light|hero-dark|post-component> --name <name>`, which shows it beside the references.
   - `node tools/check.mjs <url> --name <name>` for correctness and contrast.
   - Read the screenshots and compare them honestly with the floor reference: is this as rich, as polished and as finished? If not, keep going.
7. **Deliver:**
   - the fold PNG next to its floor reference;
   - the gate summary;
   - the owned decisions and overrides;
   - one verdict question.
8. **Record:** `verdict.mjs`.

## Mode B: review and fix existing work
1. **Render and measure:** `node tools/gate.mjs <url> --kind audit --name <name>` (1440 and 390), plus `check.mjs`.
2. **Read:**
   - `canon/audit.md`, which holds the consistency contract (radius ladder, one edge per box, shadow tiers, type tuples, state language, dark surfaces, motion);
   - the app's own kit or tokens, if it is a client codebase.
3. **Write `work/<name>/REVIEW.md`:** findings ranked by severity, each with the selector, the computed value, a screenshot crop and the exact fix.
4. **Fix in source.** Then sweep for the same class of drift everywhere, not only where it was spotted.
5. **Prove:** `node tools/style_diff.mjs <before-url> <after-url> --out reports/<name>/style-diff.json` shows only the intended properties changed, and the gate passes.
6. **Deliver** before/after crops plus the sweep list. Record.

## Mode C: from references (find, replicate, in-the-style-of, combine)
1. **Find** at most 6 candidates (`system/inspiration-sources.json`, `knowledge/benchmarks/`, the live web) and show them as a contact sheet. If the founder named a person or studio, pull their latest posts (`knowledge/benchmarks/kargul-x/CREDITS.md` has the public no-login method).
2. **Replicate first** (`docs/REPLICATE-FIRST.md`):
   - Rebuild one reference at its pixel size.
   - Probe it, overlay it with `compare.mjs`, and repeat until type boxes and edges are within about 2px. This is a calibration study, not the deliverable.
   - Write `work/replicas/<NAME>-NOTES.md` with the measured tokens and the rules learnt, and fold any new general rule into `knowledge/`.
3. **Combine:** one reference per axis (structure from A, type and colour from B, material and effects from C), never mixed inside one component.
4. **Build our content** on the canon floor with 1-3 owned touches. Never ship their structure box for box, nor their copy, logos or assets.
5. **Gate** as in Mode A, plus `compare.mjs` against each reference used. Deliver with the matrix and the side-by-side.

## Replica library (studied, measured)
- **Kargul:** `work/replicas/KARGUL-HERO-NOTES.md` (Chatsheet), plus ISO-31..38 in `knowledge/web/isometric-line-art.md`.
- **Attio:** `work/replicas/ATTIO-NOTES.md`.
- **Linear:** `work/replicas/LINEAR-NOTES.md`.
- **Accepted engine builds:** `knowledge/engine-accepted/` (Kestrel, Quorum and others as they are accepted).

## Never
- Build what wasn't asked: animation, extra sections, video.
- Ship with a gate FAIL.
- Stack a new rule on a contradicting old one: edit the canon in place.
- Deliver without a side-by-side against a rated reference.
- Publish or post anything externally.
- Change Larpo's own brand system from here.
