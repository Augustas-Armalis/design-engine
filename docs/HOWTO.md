# design-engine: how to use, update and test it

## 1. What you have

A knowledge base plus tooling that sits around Claude, so output is designed from rules, measured, and checked against recent work instead of guessed.

| Layer | Where | State today |
|---|---|---|
| Studied books | `knowledge/ui-pedia/` (26 notes, 626 pages), `dos-and-donts/` (101 tips), `psychology-of-user/`, `what-to-do-next/` | every page read as text and image |
| Web research | `knowledge/web/` (anti-AI-slop, motion, typography + 134-font catalogue, colour + 10 palettes, design systems, 38-site teardown, landing anatomy, funnels, copy, creative direction + 60 moves, implementation craft + ~90 assertions, courses) | done, dated 2026-10-08 |
| Rule index | `system/rules/index.json` (1,328 rules; 970 mechanically checkable) | built by `tools/build_index.py` |
| Design data | `system/tokens/`, `system/fonts/`, `system/directions/axes.json` | synced by `tools/sync_system.py` |
| Figures | `examples/ui-pedia/<topic>/` (293 annotated book pages) | |
| Tools | `tools/check.mjs` (render+measure), `ledger.mjs` (verdicts+diversity), `deal.mjs` (direction dealer), `score.mjs` (eval compare) | tested |
| Skill | `.claude/skills/design-engine/` | works inside this repo |

## 2. Using it

Open a Claude Code session with the engine folder as the working directory (in the team package: `engine/`) and just say what you want:

> Hero for an AI invoicing tool for freelancers. One action: start free.
> Pricing page for a devtool, three tiers + enterprise.
> Review this page against the engine: https://… (or a local file)

Claude follows `CLAUDE.md`: restate the brief, read the ledger, deal three directions, write `work/<name>/DIRECTION.md`, build, run the checker, look at the screenshots, run the diversity gate, deliver with the report, ask for your verdict.

You do three things: give the brief, pick or tweak the direction if you care, and say accept or reject **with a reason**. Everything else is automatic.

To use it from other projects, add this folder as a working directory (`--add-dir <path-to-engine>`) or symlink the skill:
```bash
ln -s <path-to-engine>/.claude/skills/design-engine ~/.claude/skills/design-engine
```

### Commands
```bash
node tools/deal.mjs --name acme-hero --type ai            # 3 divergent directions (seeded, reproducible)
node tools/check.mjs work/acme-hero/index.html --name acme-hero    # also works on any URL
node tools/ledger.mjs similar reports/acme-hero           # too close to recent work? exit 1 = yes
node tools/ledger.mjs add reports/acme-hero --verdict reject --why "same nav as last one"
node tools/ledger.mjs list
.venv/bin/python tools/build_index.py query hero headline  # find rules by keyword
.venv/bin/python tools/select_rules.py --name acme-hero --type hero --brief "..."   # 50-rule slate for this brief
node tools/compile_system.mjs --all                         # seeds -> tokens.json, theme.css, GUIDE.md, showcase.html
node tools/variety.mjs pick --mode dark --seed acme          # fresh layout / nav / button / type / palette / system vs recent builds
node tools/variety.mjs status                               # what recent builds used, what was never used
node tools/new_build.mjs acme --system polar --port 4340    # scaffold a hero from the product-hero kit
node tools/shot.mjs http://localhost:4340 work/acme/acme-4k.png --scale 2.6666667 --wait 6000   # 4K still
node tools/record.mjs http://localhost:4340 --name acme     # 4K 60fps load-in video (Reel)
node tools/compare.mjs <url> <reference.png> work/acme/cmp  # side-by-side + onion skin vs a reference
tools/export_package.sh                                     # build "Larpo Engine V1.zip" for the team
```

### House design systems
`system/systems/<slug>/` holds 12 compiled house systems (Ledger, Signal, Halftone, Meridian, Paperclip, Monolith, Vellum, Press, Clinic, Kiln, Polar, Bloom). Each is a small `seed.json` (the owned decisions) compiled into a full token set that meets a light+dark contrast contract by construction. Open any `showcase.html` to see one. To add a system: copy a seed, change the owned decisions, compile, check the showcase (`check.mjs` must be 0 fail), and keep it pairwise distinct from the others. `system/systems-research/` holds 37 studied real-world systems as standard JSON profiles.
Reports land in `reports/<name>/` (`report.md`, `report.json`, desktop and mobile screenshots). `reports/` is not committed.

## 3. Updating the brain

| You want to… | Do this |
|---|---|
| Teach it from a new book/PDF | `tools/ocr_pdf.py` (image-only) or `tools/extract_pdf.py` (text) into `corpus/<name>`, then ask Claude to study it into `knowledge/<name>/` using `knowledge/SCHEMA.md` (one agent per ~40 pages, text + images), then `build_index.py` |
| Teach it from the web | Ask for a research note in `knowledge/web/`; `knowledge/web/ingestion-queue.md` already ranks what to ingest next |
| Record a founder verdict | `ledger.mjs add …` with the founder's own words as `--why` |
| Add design vocabulary | Add options to `system/directions/axes.json`; add moves to `knowledge/web/art-direction-moves.md` |
| Tighten or loosen a check | Edit `tools/thresholds.json`; say why in the commit |
| Refresh derived data | `build_index.py` then `sync_system.py` |

After any of these: commit, then re-run the eval set (below).

## 4. Testing it

**Does the tooling work?** Run the checker on any known page; it should print counts and write screenshots. The ledger and dealer are deterministic: `deal.mjs --seed 7` gives the same deal twice.

**Is the brain getting better?** Use the fixed briefs in `evals/prompts.json`.
1. Ask Claude: "run eval `t1`": it builds each of the 10 briefs through the pipeline and saves each as `eval-t1-<brief-id>`.
2. `node tools/score.mjs t1` totals fails, warns and AI-tell warnings and diffs against the previous run.
3. You review the screenshots with the rubric in `evals/prompts.json` (8 axes, 1-5). Lower fail/warn totals mean cleaner craft; your scores say whether it is also better design. Do both, since the numbers can't judge taste.
4. Re-run after every meaningful change. Never edit a brief to flatter a run; add new briefs instead.

First baseline: `eval-t0-hero-ai-devtool` (0 fail, 1 warn after two fix passes; the first render had 2 fails and a broken core idea the numbers did not catch, which is why the screenshot step stays mandatory).

## 5. Known limits and what to build next

- **Rules are not yet de-duplicated.** 1,328 rules from many sources overlap and a few conflict (e.g. dialog entry scale 0.8 vs 0.9-0.95; row density 40/48/56 vs 40/45/50). Next: a conflict-resolution pass producing a "decided defaults" file per topic.
- **The checker measures craft, not taste.** It catches sizes, contrast, spacing, overflow, semantics and AI tells; it cannot judge a bad idea. Text on gradients/images is not contrast-checked.
- **Similarity is fingerprint-based** (type, nav height, width, rhythm, radii, hue). Screenshot-distance similarity is specified in `knowledge/web/anti-ai-slop-detector.md` but not built.
- **No section/component library in code yet.** `knowledge/web/landing-page-anatomy.md` has the section library as prose; next is turning proven sections into reusable, token-driven code, grown from accepted work.
- **Font tool.** The 134-font catalogue is data only; a query tool (by voice, role, pairing) is a small next step.
- **Unverified items** flagged by the research agents: coss `Slider` value shape; whether coss remaps `--radius-lg`; Fontshare self-hosting licence; some Material/Apple numbers are secondary.
- **Sources not reachable by agents** (paywalled books, Refactoring UI, etc.): paste them in and they get studied the same way.
- **Larpo's own design research** (`larpo-knowledge-base/inbox/`) is not yet merged into `knowledge/`; its feedback ledger should seed `ledger/`.

## 6. Delivery gate and style diff (2026-10-21)

Two tools from `docs/PROCESS-AUDIT-2026-10-21.md` 3.2 and 5.3. Mark the hero product with `data-product` and a post subject with `data-subject`; untagged heroes fall back to a guess and warn.

**`tools/gate.mjs`**: one command per kind. FAIL blocks delivery (exit 1).

```bash
node tools/gate.mjs <url> --kind hero-light|hero-dark|section-bento|product-ui|client-app|post-component|full-website|audit \
  --name <name> [--direction work/<name>/DIRECTION.md] [--dark] [--w 1440 --h 900] [--wait 4500] [--verbose]
```

- It renders the fold at 1440x900 @2x. `full-website` and `audit` also scroll the whole page and render 390x844.
- Thresholds come from `system/canon/<kind>.json`. Any key missing there falls back to a built-in value, and lines that used the canon are tagged `[canon]`.
- It writes `reports/<name>/gate.json`, `gate-fold.png` and `report.json`. That `report.json` has the shape `ledger.mjs add/similar` reads, so pieces gated only by `gate.mjs` can now be recorded. Its fingerprint includes `button`, the primary CTA's computed height, radius, background and shadow. A `report.json` written by `check.mjs` is kept unless you pass `--force-report`.

What it checks:
- **Correctness:** overflow, one h1 (for hero and site kinds), AA contrast (FAIL outside the product, WARN inside it), and 24px targets with the WCAG 2.5.8 spacing exception.
- **Edges:** elevation shadows (the blurred outset layers of boxes; rings, insets and button materials are not counted) up to `maxShadowStrings`. Border plus ring on one box is a FAIL. Ring plus inset highlight on one box is a WARN.
- **Radius:** each box's rendered radius against `radiusLadder` (bands are `[a, b)`). Pills and circles are exempt. A child radius larger than its parent is a WARN.
- **Type:**
  - font families, with mono ignored inside the product;
  - distinct whole-pixel sizes, counted in the product view when one exists;
  - weights, where an off-canon weight is a FAIL on the page and a WARN inside the product;
  - the h1 tuple, plus no full stop.
- **Colour:**
  - OKLCH accent hue families with chroma above 0.06. Red, amber and green status hues are counted apart. The product's own categorical colours are a WARN above `maxAccentHues + 2`.
  - Canvas chroma and colourful-pixel share, for dark kinds or when the canon sets them.
- **Buttons:** every primary CTA has one computed recipe, the nav CTA differs from the hero CTA, and the hero has 1 to `maxPrimary` primaries. CTA height and radius must be at least min(12, 0.3h). A secondary button with a leading icon is a WARN.
- **Hero:** nothing between the nav and the h1 (unless DIRECTION says `chip: yes`), at most 2 subtitle lines with the last line at least 40% of the first, the CTA-to-product gap, the product's share of the fold, and the product frame straight-on.
- **Scope and motion** (with `--direction`): DIRECTION must have `scope:` and `motion:` lines. With `motion: none`, these all FAIL: running animations in the fold, more than 0.2% of fold pixels changing over 800ms, or a `<video>`. A video FAILs unless scope or motion asks for one.

**`tools/style_diff.mjs`**: run it every revision round to prove that only the intended properties changed.

```bash
node tools/style_diff.mjs <approved-url> <candidate-url> [--selector main] [--out reports/<name>/style-diff.json] \
  [--allow font-size,color] [--wait 4500] [--top 30] [--svg]
```

- Both pages are rendered at 1440x900. It waits until the layout holds still (motion/react timelines and count-ups included), finishes entrance animations, and rewinds loops.
- Elements are paired by DOM path plus own text. When that fails it tries unique text plus tag, then the same path.
- It reports changes in font size, weight and family, letter-spacing, line-height, colour, background, border, radius, shadow, padding, gap, and size changes over 1px. Identical change sets are grouped, and added or removed elements are listed.
- `--allow` takes the groups named in DIRECTION `changes:`, plus `text` and `structure`. Anything else changing exits 1.
- A self-diff of Kestrel comes back empty.
