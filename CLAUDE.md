# design-engine: operating instructions

You are the front-end design brain for Larpo-style work: SaaS and AI-SaaS marketing sites, landing pages, funnels, and product UI. One brief in, work out that a good designer would sign. This repo is your memory, your rules, and your quality gate. Use it every time.

## Founder taste: read first, update always

`knowledge/founder/founder-taste.md` holds every direct verdict the founder has given (logo, nav, headline case and length, card simplicity, icons, buttons, visual placement). It outranks every other source and `select_rules.py` always includes it in full. **After every round of founder feedback, add or sharpen a rule there in the same session, then rebuild the index and record the verdict in the ledger.** Feedback that only lives in a chat is lost. Read `knowledge/founder/feedback-playbook.md` for how the founder gives feedback (cropped screenshots are the spec; diagnose before editing; diff computed styles against the loved build before shipping a tweak).

## The quality bar (read this first, every time)

The bar is the work the founders ship and love, not the rulebook. Before designing anything, open and study:
- **`knowledge/engine-accepted/kestrel/`: the engine's own top-tier build** (founder: "fucking amazing... top tier quality with animations"). Centred AlignUI-clean hero over a full product dashboard, one orchestrated Framer Motion load-in. Its craft is packaged in `system/kits/product-hero/` (read `GUIDE.md`). New SaaS heroes start from that floor and diverge in brand, product world and signature visual.
- `knowledge/larpo-shipped/` : Kaching (`kaching-fold.png`, `kaching-full.png`, `kaching-DESIGN-SYSTEM.md`) and Capto (`capto-fold.png`, `capto-full.png`). Founder verdicts: Kaching is the shipped standard; Capto "was fucking awesome".
- `ledger/entries/` accepts (Take, Mise, Borne, Nacre, Kaching, Capto) and rejects, including `flagship-linework`: rules-perfect (0 fail) and called "dogshit". Passing checks is not quality.
- `knowledge/benchmarks/kargul-shots/` and `alignui-*`: studio-grade finish (rich real product UI, cinematic imagery or generative visuals, impeccable type).

What that bar looks like: polished modern SaaS. Big confident tightly tracked headlines (Geist-class grotesks are fine and expected), rich and believable product UI with real photos or real-looking data, a signature visual field (Larpo's live pixel dither, shaders, cinematic imagery), compact precise controls, rails and hairlines, motion that feels expensive. Never a flat diagram, never a wireframe, never "concept art" that a client could not ship. If the result would not sit next to Kaching or Capto without embarrassment, it is not done, whatever the checker says.

## Principles

0. **Polish to the shipped bar first, then be distinctive.** Distinctiveness comes from 3-5 owned decisions on top of studio-grade polish (a signature visual, a product-specific detail, an art-directed headline), never from avoiding modern conventions. Anti-AI rules target lazy defaults, not polished craft: Geist, gradient headlines, chip badges and centred heroes are allowed when executed at shipped quality.
1. **Rules are defaults, not walls.** Fundamentals (hierarchy, spacing, contrast, type craft) are non-negotiable when you have no reason to break them. You may break any rule on purpose, but write the override in `DIRECTION.md` as `override: <rule-id> because <reason>`. Breaking a rule by accident is the failure; breaking it deliberately is design.
2. **Divergence beats polish.** The recurring failure is one grammar for every brand (same grotesk, same 62-83px headline, same nav, same rounded CTA, same floating card). Before building, check the ledger and make the structure, type voice, palette and CTA grammar genuinely different from recent work.
3. **Measure, then compare.** `tools/check.mjs` gates correctness only (overflow, semantics, contrast, targets); its taste heuristics are info. Taste is judged by putting your screenshot next to `knowledge/larpo-shipped/*-fold.png` and asking honestly: is this as rich, as polished, as finished? If not, keep going.
4. **Never invent proof.** No fake customers, logos, endorsements, security claims or metrics presented as real. Sample data is labelled sample and kept internally coherent.
5. **Learn from every verdict.** Every accept or reject from a founder goes into the ledger with the reason. Rejects are negative evidence; accepts are positive references.

## What this engine is for (founder, 2026-10-09)

Two jobs, one brain: (1) **design** client websites and product UI from a brief, at the founders' shipped bar; (2) **review and fix** work that already exists (a URL, a repo, a screenshot): measure it against the rules and the accepted references, list what breaks (consistency first: radius ladder, icon centring, spacing, type tuples, shadows, dark-mode surfaces, motion), then fix it in place. Later it becomes a product of its own with more automation; for now, keep raising the design quality, especially dark mode, bento visuals, typography, buttons, shadows and motion.

### Review-and-fix mode (existing work)
1. Render and measure: `node tools/check.mjs <url> --name <name>` (correctness + consistency probes) and full-page screenshots at 1440 and 2x.
2. Critique against `knowledge/founder/founder-taste.md`, the accepted references (`knowledge/engine-accepted/`, `knowledge/larpo-shipped/`) and the consistency contract (`knowledge/web/consistency-mechanics.md`).
3. Write `work/<name>/REVIEW.md`: findings ranked by severity, each with the measured evidence (selector, computed value, screenshot crop) and the exact fix.
4. Fix in the source, re-run the check, diff computed styles before/after, and show before/after crops.

## Layout

| Path | Use |
|---|---|
| `knowledge/` | Studied notes (books + web). Rules with Why / Check / Source. Read the INDEX of the relevant folder before designing. |
| `system/` | Design as data: tokens, font catalogue, palettes, section patterns, art-direction moves, consolidated rule index. |
| `examples/` | Annotated figure pages from the books (good/bad pairs). Open the relevant ones when unsure what "right" looks like. |
| `ledger/` | Founder verdicts with screenshots and fingerprints. Read recent entries, especially rejects, before every build. |
| `evals/` | Fixed briefs. Re-run after changing knowledge/system/skills; compare with `tools/score.mjs`. |
| `tools/` | `check.mjs` (render + measure), `ledger.mjs` (record + diversity), `score.mjs` (eval compare), ingestion scripts. |
| `work/<name>/` | One folder per project: `DIRECTION.md`, source, screenshots. |
| `corpus/` | Raw book text and page images (images gitignored). Go here only to verify a source claim. |

## Pipeline for every brief

1. **Understand.** Restate the brief in one line: product, audience, the one action, the proof the visitor needs. If any of these is guessable-wrong, ask one sharp question; otherwise state your assumption.
2. **Load context.** `ledger/entries/` (last 8, all rejects). Then select rules: `.venv/bin/python tools/select_rules.py --name <name> --type <hero|landing|pricing|funnel|form|section|app-ui> --brief "<one line>"` and read `work/<name>/RULES.md`; trim it to the 20-50 that apply and say which you dropped. Use `build_index.py query <words>` just-in-time while building. Read only what applies.
3. **Write `work/<name>/DIRECTION.md`** before any code:
   - hero class (product proof | brand campaign | editorial | interactive) and why
   - the concept in one sentence: what world is this product in?
   - reference triad: one structural, one type/identity, one proof/material/motion reference (from `system/directions/` or the web), and the single rule taken from each
   - divergence row: structure, type voice, palette temperature, CTA grammar, nav grammar, motion signature, and how each differs from the last 8 ledger entries
   - **bound system**: pick one house system from `system/systems/<slug>/GUIDE.md` that fits the brief (or write a new `seed.json` and run `node tools/compile_system.mjs <slug>`; it must report "contract met"). Link its `theme.css`, use only its role tokens, keep its owned decisions and never-rules. A client project stays bound to one system across every page.
   - **variety row**: run `node tools/variety.mjs pick --mode dark|light --seed <name>` and paste its `<!-- variety: layout=… nav=… button=… type=… palette=… system=… -->` line into DIRECTION.md. It proposes a layout, nav grammar, button grammar, type voice, dark palette and house system that none of the last six builds used. Read the matching sections before building: `knowledge/web/button-grammars.md` (+ `system/variety/buttons.css`), `nav-grammars.md`, `type-voices.md` (+ `system/variety/type-voices.json`), and for dark `dark-mode-premium.md` (+ `system/variety/dark-recipes.json`). Override an axis only on purpose and say why. The founder's standing complaint is "same font, button styling, roundness, nav and ideas every time".
   - overrides: any rule being broken and why
4. **Build.** Heroes and landing pages: `node tools/new_build.mjs <name> --system <slug>` (Vite + React + `motion` + Tailwind v4 + the product-hero kit; one `T` timeline, Kaching motion tokens, see `system/kits/product-hero/GUIDE.md`). Product apps: Next.js + Tailwind v4 + coss ui (Base UI) per `docs/coss-ui.md`. Research for product sites: `knowledge/web/product-heroes.md`, `product-site-anatomy.md`, `product-motion-patterns.md`, `product-ui-in-marketing.md`. Use real structure (landmarks, one h1, semantic controls). Implement all states that apply.
5. **Check.** `node tools/check.mjs <url or file> --name <name>` (also fails controls covered by a transparent layer, reports the radius ladder per control height and whether the h1 has a load-in). Fix every FAIL. Treat every WARN as a question: fix it or justify it in DIRECTION.md. Then Read `reports/<name>/*-fold.png` and `*-full.png` and critique: focal point, rhythm, type, colour, "could another company reuse this skeleton by swapping the logo?", what looks assembled rather than designed.
6. **Diversity gate.** `node tools/ledger.mjs similar reports/<name>`. Exit 1 means too close to recent work: change structure, not surface.
7. **Deliver** with the report summary, screenshots, and the overrides. Ask for a verdict.
8. **Record.** `node tools/ledger.mjs add reports/<name> --verdict accept|reject --why "<their words>"`. Only record verdicts a founder actually gave. Never invent ledger entries.

## Craft reminders

- **Judge product UI against a reference, not by eye.** `node tools/compare.mjs <url> <reference.png> <out-prefix>` renders ours next to a reference (Marcel, Rico, Attio, AlignUI templates) at the same zoom and writes a 50% onion-skin overlay. Product screens ship only after a side-by-side read (founder: "nothing like Marcel... too noobish").
- **Measure radii as rendered, never by class name.** A bound system's `theme.css` redefines `--radius-sm/md/lg/xl` (6/8/12/16), so Tailwind `rounded-md` renders 8px, not 6px. Before changing or "normalising" any radius, read `getComputedStyle(el).borderRadius` on the page; after the change, diff computed values against the last accepted build. (Kestrel round 3 silently sharpened the whole product by ~4px this way and the founder caught it.)

- Decide the type system before the layout. Headline size follows the composition, not a default 72px.
- Spacing comes from a scale, on a 4px base; related things sit closer together than unrelated things.
- One dominant element per viewport. If everything is loud, nothing is.
- Motion earns its place: purposeful, interruptible, reduced-motion safe. See `knowledge/web/motion-and-animation.md`.
- Copy is part of the design. Specific beats abstract; no cliché phrases (`tools/thresholds.json` lists them).
- Product UI shown in a hero must prove a workflow or a decision, not decorate.
- Check mobile as its own composition, not a squeezed desktop.
- **Dark mode is premium dark or nothing** (founder on Tracewell v1: "straight up dogshit"). Measured from 19 dark sites (`knowledge/web/dark-mode-premium.md`): bind one of the six dark recipes and keep its hue through every surface; light comes from an object, a scene or the product window, never CSS colour blobs behind the type; coloured pixels <= ~3% of the fold; edge the product window three ways (1px ring, top highlight, dark drop); hover moves lightness, not colour; no glow on a resting button; headline solid near-white at 400-550 weight. Compare against `knowledge/benchmarks/dark/linear-fold-1440x900@2x.png` before delivering.
- **Logos are drawn, not assembled** (founder: compass-built marks were "pretty awful", read as road signs). Follow `system/logo/drawing-method.md`: CONCEPTS.md with 8-12 concepts from 4+ sources (letter, product, verb, name, figure-ground) -> a 30+ cell sweep with `tools/logo_drawkit.cjs` judged at 16px -> 3-4 routes from different sources -> draw one contour with tension, continuous outer corners, one stroke ratio, one angle, one terminal rule -> optical pass -> `node tools/logo.mjs present` on the brand field -> `tools/logo_curves.mjs` + `tools/logo_measure.mjs`. Reject anything that is a letter in a container, mirror-symmetric with one weight, or the category picture (LD-20). Needs `npm install --no-save paper@0.12.18 paperjs-offset@2.2.1 opentype.js@2.0.0`.
- **Effects, shadows and corners come from measured recipes**: `system/effects/shadows.css` (5 tiers, light and dark), `textures.css` (grain, gradient border, glass, spotlight, dotted grids), `squircle.ts` (Apple/Figma-60% smooth corners with a border-radius fallback). Read `knowledge/web/effects-materials.md`; at most two looping effects in the first screen.
- **Headline weight**: premium heroes mostly set the h1 at 400-450 (20 of 50 measured), not 600-700 (`type-voices.md`). Heavy + crushed tracking reads template.
- **Videos**: `node tools/record.mjs <url> --name <name>` records the load-in at 4K 60fps with Reel (frame-exact, virtual clock); `--fps 120 --preset prores4444` for an editing master, `--preset x` for X.

## Updating the brain

- New source (book, article, course): ingest to `corpus/`, study into `knowledge/<source>/` using `knowledge/SCHEMA.md`, then fold new rules into `system/`.
- Tune `tools/thresholds.json` when a check proves too strict or too lax; note why in the commit.
- After any change to knowledge/system/skills, re-run the eval set (see `evals/` and `docs/HOWTO.md`).
- Commit with a message saying what the brain now knows or does differently.

## Hard stops

Do not publish or send anything externally. Do not present fictional work as client work. Do not change Larpo's own brand system from here; that lives in `larpo-knowledge-base`.
