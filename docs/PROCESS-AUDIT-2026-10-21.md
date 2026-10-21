# Process audit: why the engine works "stupidly", and the fix (2026-10-21)

Scope: the working process only (entry points, required reading, retrieval, tools, gates, verdict loop). Read-only audit. Every claim cites a file, a ledger entry or a command I ran. No existing file was changed.

Founder brief for this audit: designs come out "meh" and inconsistent, and the engine forgets its own rules and studies. It has to work every time in three modes: (a) design from scratch, (b) review and fix existing work, (c) work from references (find them, design in their style, or combine them). The axes he names: layout, effects, buttons, consistency, style, colours, fonts.

---

## 0. Summary

The engine does not lack knowledge. It has too much of it, with no settled answers, and almost nothing measures the things the founder rejects. Five structural faults explain most of the rejects:

1. **No reliable entry point.** Seven documents each describe the pipeline, and they disagree. The skill a fresh session loads (`.claude/skills/design-engine/SKILL.md`) is the oldest of them. It says "plain HTML/CSS for hero concepts" and `deal.mjs`, and never mentions founder-taste, design view, compare or replicate-first.
2. **The required reading is about 150-210k tokens per hero, so it gets skipped.** Step compliance in `work/*/DIRECTION.md` bears this out (section 1.3).
3. **Founder taste is an append-only log of 143 rules with about a dozen unresolved contradictions.** These include four headline tuples, five button shapes, four nav grammars, three "default" heroes, three dark-light policies and five bento styles. The playbook's own rule ("rewrite the earlier rule in place, do not stack contradictory rules", `feedback-playbook.md` core idea 5) is not followed.
4. **The tools gate correctness, not the founder's axes.** No tool fails on shadow-recipe count, double edges, button-grammar drift, font-family count, accent-hue count, scope or regressions. Two tools work against the founder: `variety.mjs` deals rejected options as "fresh", and `ledger.mjs similar` locks out the very axes he complains about.
5. **The verdict loop is broken in practice.** `ledger.mjs add` cannot read `design_view` reports. The last two days of verdicts (Cadence bento x6, Gridline, Share, Search) have no ledger entry. The variety rows record first-round choices, not what was accepted.

---

## 1. The pipeline as it actually is

### 1.1 Entry points, and how they disagree

| Doc | Lines | What it says the pipeline is | Stale or contradictory |
|---|---|---|---|
| `CLAUDE.md` | 103 | 8 steps: select_rules, quorum README + hero-craft study, the 25-min inspiration routine, libraries, DIRECTION with bound system + variety row, replicate-first, new_build, check, design_view, ledger similar, deliver, record | The most current. Puts 56/500 as the measured headline. |
| `.claude/skills/design-engine/SKILL.md` | 33 | `deal.mjs` for 3 directions, query the index, "Plain HTML/CSS for hero concepts", check, ledger | Predates new_build, variety-first, founder-taste, design_view, compare and replicate-first. This is what the Skill tool loads. |
| `docs/HOWTO.md` | 91 | "1,328 rules", deal three directions | The index now holds **5,736** rules (`system/rules/index.json`). |
| `docs/package/START-HERE.md` | ~120 | variety, then new_build, then check | Different order again; says "18 house systems" (there are 23). |
| `docs/REPLICATE-FIRST.md` | 17 | pick a reference, rebuild at pixel size, overlay, 1-3 touches, gate, "no animation unless asked" | Conflicts with founder-taste L174 ("every hero loads in as one orchestrated Framer Motion timeline") and with the Kestrel kit default. |
| `docs/ROADMAP.md` | 36 | phases 7-12 listed as "next" | Phase 7 (seed ledger) is done; nothing has been updated since 10-08. |
| `knowledge/founder/feedback-playbook.md` | 128 | "Default for the next hero: select_rules, founder-rule checklist with target numbers, Kestrel type..." | A fifth pipeline, inside a knowledge note. |
| `README.md` | ~60 | "Pipeline (target)" | Points to `skills/`, which does not exist. |

**Verdict:** there is no single short entry point that a fresh session can follow reliably. The one a session is most likely to load (the skill) is the most wrong.

### 1.2 Mandatory reading, measured

Bytes from `wc -c`; tokens are roughly bytes / 4.

| Set | Files | Size | ~Tokens |
|---|---|---|---|
| Always: `CLAUDE.md` + `founder-taste.md` (119.5 KB, 530 lines) + `feedback-playbook.md` + last 8 ledger entries | 11 | ~160 KB | ~40k |
| Hero/landing, required by CLAUDE.md step 2: quorum README, hero-craft-study, inspiration-and-tools, libraries-catalogue, craft-articles | 5 | ~196 KB | ~49k |
| Variety, step 3: button-grammars, nav-grammars, type-voices (+ dark-mode-premium for dark), system GUIDE | 4-5 | ~99-142 KB | ~25-35k |
| Build, step 4: product-hero GUIDE, REPLICATE-FIRST, borders-and-nesting, effects-materials, motion-and-animation, light-hero-grammars | 6 | ~130 KB | ~32k |
| `work/<name>/RULES.md` from select_rules (measured, see 4.2) | 1 | 73 KB | ~18k |
| "Research for product sites": product-heroes, product-site-anatomy, product-motion-patterns, product-ui-in-marketing | 4 | 213 KB | ~53k |
| **Light hero total** | ~30 | ~650-860 KB | **~160-215k** |

The knowledge folder outside benchmarks holds 205 markdown files (54,734 lines, 6.7 MB). Nobody can hold the "required" set and still have room to build, so steps get skipped. That is the "forgets its own rules" complaint, mechanically.

### 1.3 Step compliance, measured from `work/*/DIRECTION.md`

Out of the last 20 builds:

| Required by CLAUDE.md | Builds that did it |
|---|---|
| `RULES.md` from select_rules | 7 / 20 (none since Overlap; not Kite, Perch, Murmur, Weft, Cadence) |
| `<!-- variety: -->` row | 10 / 20 |
| compare.mjs overlay (`*overlay*`) | 3 builds (replicas, kite/landing, acquisity) |
| design_view report | 4 (dv-kestrel, dv-quorum, dv-weft-*, dv-gridline) plus post components |
| ledger entry for a delivered round | Cadence bento (6 rounds), Gridline, Search and Share have **none** |

`work/flagship-cadence/DIRECTION.md` (15 lines, 2026-10-08) is still the only Cadence direction. The 2026-10-20/21 Cadence bento rounds live inside `work/replicas/app`, with no direction, rules slate, variety row, design view or ledger entry.

---

## 2. Root causes of the rejects

Sources: every reject in `ledger/entries/` since 2026-10-08, plus every round-level reject recorded in `founder-taste.md`. That gives 47 reject events. Each is classified by its primary cause, with a secondary cause where it clearly applies.

| # | Event (source) | Founder words (trimmed) | Primary | Secondary |
|---|---|---|---|---|
| 1 | Linework (`2026-10-08-flagship-linework`) | "dogshit" | E reference gap (rules-perfect, no rated reference) | D (check passed it) |
| 2 | Tideline r1-6 (taste L22-124) | icons "ass", nav, title case | B rule missing (first build) | - |
| 3 | Vigil v1 (L126) | "too alike" | D (the similar gate locks layout/font/nav) | A |
| 4 | Vigil v2 (`2026-10-08-vigil`) | "looks ass" | T tool pushed (variety: dark mono poster) | E |
| 5 | Kestrel r3-4 (playbook table) | "where is the product roundness" | G regression (normalised radii) | D (no style diff tool) |
| 6 | Margin (L178) | "red bubble just stays there" | B | D (no filmstrip check) |
| 7 | Strata (L186) | "product too close to the buttons" | B | D |
| 8 | Tandem r2 (L189) | "too close once again bro why" | A rule present, ignored | D (not measured) |
| 9 | Nocturne (`2026-10-09-nocturne`) | "everything is just loading in, noobish" | C contradiction (L174 orders the parade) | - |
| 10 | Kaching app visuals (L199) | "3 completely different styles" | D (no shadow/radius census) | - |
| 11 | Kaching bento (L242) | "now you messed it up everywhere" | G regression | D |
| 12 | Acquisity v1/v2 (`2026-10-09-acquisity-dashboard`) | "copied it... surface level", "noobish" | E | - |
| 13 | Ferry hero r1 (`2026-10-09-ferry-hero`) | "BG WITH THOSE THREE STEPS... SO STUPID" | E | B |
| 14 | Ferry hero r2 (L316) | "empty... too simple" | B | C |
| 15 | Tracewell (`2026-10-09-tracewell`) | "straight up dogshit" | E (no dark reference) | T |
| 16 | Halyard (L352) | "nobody shows that much" | C (contradicts L316, L503) | - |
| 17 | Quillwork (`2026-10-10-quillwork`) | "dogshit" | T (variety dealt `didone-luxe` + `warm-black`) | - |
| 18 | Murmur subtitle (L361) | "max 2 lines" | A (rule since Tideline r3) | D |
| 19 | Settle (`2026-10-12-settle`) | "a bit dirty" | D (hue/ring/surface census not built) | E |
| 20 | Perch r1 (L394) | "tilted and off" | T (variety dealt `tilted-3d`) | D |
| 21 | Perch r1 drag UI (L397) | "stupidly designed" | E | - |
| 22 | Perch r2 (L400) | "subtitle badly formatted" | A | D |
| 23 | Perch r3 (`2026-10-13-perch`) | "nouuu not green" | G (restyled from a logo ref) | - |
| 24 | Kite v1 (`2026-10-14-kite`) | "don't do it so blue" | E | B |
| 25 | Kite load-in (L415) | "FASTER" / "too fast" | B | - |
| 26 | Kite landing (L424) | "just hero bro, not entire web" | F scope | - |
| 27 | Kite glows (L427) | "glows and stuff wtf" | A (dark rules existed) | C (L443 says one light field) |
| 28 | Kite bare (L430) | "now too little", chip "repetitive" | A (no chip since Kestrel r1) | C |
| 29 | Kite copy (L433) | "title too shallow and just long" | B | - |
| 30 | Kite Linear replica (L440-443) | "flat and empty" | E (copied the costume) | - |
| 31 | Kite type (L449, L452) | "title font still ass... font usage wtf" | D (no opsz/family check) | A |
| 32 | Kite subtitle 1000px (L455) | "the subtitle now wtf" | A | D |
| 33 | Kite double edge (L467) | "double top border" | D (BN-04 exists, unchecked) | A |
| 34 | Kite map r? (L464) | "even worse now, no red pills" | G (changed approved look) | - |
| 35 | Kite-landing Supabase (`2026-10-14-kite-landing`) | "still asssss" | E | C |
| 36 | Sellify field radius (L476) | "NOT DOING FINAL CHECKS" | D (ui.field-radii is WARN) | A |
| 37 | Sellify avatars (`2026-10-15-sellify-guided-avatars-r1`) | "ugliest... inconsistent" | A (container-grammar rule from 10-14) | - |
| 38 | Sellify chart green (L479) | "usually our color would be orange" | B | D |
| 39 | Quorum v1 (L253) | "identical... AND JUST THE HERO" | D (similar gate locked) | F |
| 40 | Quorum v2-v4 (L259-267) | "ass visual and execution" | C (core idea 2 buried under variety push) | E |
| 41 | Quorum v4.1 (L268) | "what even is this hero" | A (product-first since Vigil v2) | - |
| 42 | Overlap (`2026-10-20-overlap`) | "too hollow" | C (Halyard "less" vs Kestrel density) | E |
| 43 | Weft v3 (`2026-10-20-weft`) | "you forgot all the rules, all the tries, all the studies" | A | E (costume) |
| 44 | Share / Expense v1 (`2026-10-20-weft-expense`) | "I did not ask to animate" | F (screenshots-only rule since 10-11) | A |
| 45 | Expense v2 (L509) | "grays a bit dark" | B | E |
| 46 | Cadence bento v1/v2 (L515-519) | "straight up ass", "noobish" | E | - |
| 47 | Cadence v4-v6 (L521-528) | "check linear", "stupid", "generic" | C (five stacked bento rules) | E |

Legend: A = a rule existed and was skipped; B = the rule was genuinely missing; C = the rule was present but buried or contradicted; D = a tool could have measured it and did not; E = no rated reference or taste reference was used; F = scope error; G = regression of an approved look; T = a tool pushed the bad option.

| Cause | Primary | Primary + secondary |
|---|---|---|
| A skipped an existing rule | 10 | 16 |
| E reference or taste gap | 9 | 16 |
| B rule genuinely missing | 9 | 10 |
| D tool gap (measurable, not gated) | 6 | **20** |
| C contradiction or buried | 6 | 9 |
| G regression of an approved look | 4 | 5 |
| T tool pushed the bad option | 3 | 5 |
| F scope (built what was not asked) | 2 | 4 |

**Reading:** about 80% of rejects (38 of 47) were preventable with what the engine already knew. Only about 1 in 5 events (B) needed new founder input. The two biggest levers are (1) turning founder rules into checks that fail (D: 20 events touched) and (2) a short, settled canon per mode, so the rule that exists gets read and is not contradicted (A + C: 16 primary).

---

## 3. Tools: what each gates, what is missing, what is broken

### 3.1 Inventory

| Tool | Gates (FAIL) | Notes |
|---|---|---|
| `check.mjs` (412 lines) | overflow, min text, contrast, h1 count, meta, img alt, axe serious, blocked targets, `shape.inset-tile` | **Info only:** font families, size count, radius count, radius ladder, weight count, every AI tell. **Warn only:** field heights and radii, squircle, icon centring, pointer. Shadows are only scanned for coloured glow. |
| `design_view.mjs` (145) | hero-light, hero-dark and post-component kinds only: product visible/top, h1 size/weight/tracking/lines/words/case, sub width, three gaps, CTA height, quiet fold, dark colour share; post format/crop/feed/canvas | Has no bento/section, app-ui, full-site, logo or audit kind. Writes `reports/<name>/design-view.json` but no `report.json`. |
| `compare.mjs` (41) | nothing (produces images) | Gives no registration score; "registers within 4px" is judged by eye. |
| `ledger.mjs` (68) | `similar` exits 1 at >= 4 shared axes | LOCKED axes, crash, no help (see 3.3). |
| `variety.mjs` (81) | nothing | Picks least-recently-used options with no quality filter (see 3.4). |
| `select_rules.py` (165) | nothing | Broken slate (see 4.2). |
| `deal.mjs` (47) | nothing | Superseded by variety but still the skill's step 3. |
| `score.mjs`, `evals/prompts.json` | n/a | Run once: only `eval-t0-hero-ai-devtool` exists in `reports/`. |
| `new_build.mjs`, `compile_system.mjs` | contract check on systems | Fine. |
| `logo*.mjs`, `trace_logo.mjs` | logo_measure checks | Fine as tools; the founder prefers the traced Pinterest route (L256), so `drawing-method.md` is mostly dormant. |
| `shot.mjs`, `record.mjs` | n/a | Fine. |

### 3.2 Founder rules a tool could measure but none does

Each row should become a FAIL in the new gate (section 5.3).

| Measurable rule | Source line(s) | Rejects it would have caught |
|---|---|---|
| Distinct `box-shadow` strings <= 3; no `0 0 0 1px` together with `inset 0 1px 0` on one element | L199, L467 | Kaching visuals, Kite double edge |
| Radius per control-height band maps to the ladder (now info) | L166, L199 | Kestrel r3-4, Kaching |
| One font family in the fold; Inter display must load `opsz` | L452 | Kite type |
| Font sizes <= 4 and weights in {500,600} (or {450,500}) inside a product view | L231, L199 | Acquisity, Sellify |
| Accent hue families <= 2, ringed boxes <= 25, surface fills <= 2, canvas chroma < 0.01 | L393, L413 | Settle, Kite v1 |
| Button-grammar census: all primary CTAs share one computed recipe; nav CTA differs from hero CTA; secondary has no leading icon; radius >= 0.3h | L156, L170, L300, L367 | Kestrel r1, Quorum |
| Nothing between nav and h1 unless the direction declares a chip; h1 has no full stop | L98, L142, L430 | Kite chip |
| Subtitle <= 2 lines, last line >= 40% of the first | L361, L400 | Murmur, Perch r2 |
| CTA bottom to product top 64-96px (design_view accepts 48-120, which contradicts the rule) | L186-189 | Strata, Tandem |
| Product frame transform at rest is identity | L394 | Perch |
| Filmstrip: no looping element visible before its entrance; settle 2.2-2.8s | L178, L415 | Margin, Kite |
| Dark: zero radial gradients or white blur shadows outside the product | L427 | Kite glows |
| Scope: section count and media type match the request; no `.mp4` unless asked; no animation unless asked | L358, L424, L512 | Kite landing, Quorum v1, Expense |
| Regression: computed-style diff vs the last approved build; only named properties change | playbook rule 2, L409 | Kestrel r3, Kaching bento, Perch r3, Kite map |

### 3.3 Broken or stale

- **`ledger.mjs`.** `node tools/ledger.mjs --help` prints "unknown command" and exits 2. It has no `--dry-run`. `node tools/ledger.mjs similar reports/dv-event` (and `add`) crashes with `ENOENT reports/dv-event/report.json`, because design_view writes only `design-view.json`. So any piece gated only by design view (posts, Gridline, Cadence) cannot be recorded. Reproduced 2026-10-21.
- **`ledger.mjs` `LOCKED = {'nav height','headline font','body font','hero layout'}`.** The diversity gate ignores the axes that drew the founder's "same font, button styling, roundness, nav... every time" and "identical" (Quorum v1, L253). A founder rule cited when it was made (Vigil v2: centred hero is the default) has since been superseded by L182 and L253 ("range is mandatory"). Buttons are not an axis at all.
- **`ledger.mjs add`** writes `<date>-<name>.json`, so a second round on the same day overwrites the first. That is why Kite's ~20 rounds and Quorum's 12 survive only as single entries. The ledger cannot hold round-level verdicts.
- **`check.mjs` AI tells that contradict founder rules:** `ai.pill-nav` ("no floating pill nav"; the founder's default nav is Kaching's pill, L94) and `ai.default-font-only` ("not only Inter/Geist"; the founder wants Inter display, L452). In `tools/thresholds.json`, `minBodyPx: 16`, `maxDistinctFontSizes: 12` and `maxFontFamilies: 3` contradict the product-UI rules (13-14px labels, <= 4 sizes, 1 family).
- **`design_view.mjs`:** `gap.cta-product` accepts 48-120 against the founder's >= 64; `product.top <= 600` against L418's <= 520.
- **Docs:** HOWTO says 1,328 rules (actual 5,736); START-HERE says 18 systems (actual 23); README names a `skills/` folder that does not exist; ROADMAP is frozen at 10-08.

### 3.4 `variety.mjs` deals rejected options

`node tools/variety.mjs pick --mode light --seed audit` returned `type=variable-expressive system=kiln nav=G13 button=compact`. The pick logic prefers whatever was used least recently. It does not know which options were rejected, so it steadily steers toward the never-used pool: `gothic-heavy`, `mono-terminal`, `wide-extended`, `slab-notepad`, `true-black` and 11 unused systems. Three rejects trace directly to it: Quillwork (`didone-luxe` + `warm-black`), Perch (`tilted-3d`) and Vigil v2 (dark poster).

Its history is also wrong. `variety.mjs status` records Quorum as `annotated-document / soft-serif / arrow` and Kite as `bento / humanist-warm / glow / plum-black`. Those are their rejected first rounds; the accepted finals are an Inter product split (58/550) and a graphite, glow-free Inter hero. So "fresh vs recent" is computed against fiction.

---

## 4. Knowledge and retrieval

### 4.1 Founder taste: a log, not a canon

`founder-taste.md` holds 143 RULE bullets in 530 lines (~30k tokens). Its section numbering is broken: sections 1, 2, then 5 "Exceptions", with about 15 rules appended after section 5. Unresolved contradictions, by line:

| Topic | Conflicting lines | What a fresh session cannot tell |
|---|---|---|
| Headline tuple | L452 (68-72/550/-0.045 "Kestrel tuple"), L430 (~52/500, check h1 <= 56), L449 (60/600 dark, one colour), L443 (60/450, second line 50% value), L446 (56/500, second line soft grey), L270 (52/500), L262 (84/500); CLAUDE.md 56/500; design_view 52-72; Quorum accepted 58/550 | which size and weight to use |
| Chip above h1 | L142 none; L364 allowed with variants; L430 none | default on or off |
| Hero button shape | L58 Kaching r14 / 18px label; L367 pill or 12-18 smooth; L458 full pill; L270 r10; L262 r12 48px; L280 tactile gradient | the CTA spec |
| Nav | L38 divided pill; L94 Kaching single pill 43px; L146 44 track; L461 plain text links; L300 text nav CTAs; check.mjs flags pill nav as an AI tell | the nav spec |
| Default light hero | L130 centred product-led; L268 Lightfield split; L262 Altrina panel | the starting layout |
| Default dark hero | L440 Linear replica; L443 Basit cinematic; L446 Supabase + Cursor; L427 bare | the starting layout |
| Dark light | L427 "no glows at all"; L443 "one soft rendered light field"; L446 "no glow / light field" | whether any light is allowed |
| Product density | L18 simpler wins; L352 <= 3 regions, <= 12 components; L316 sidebar + KPIs + >= 8 rows; L503 >= 10 data points, full chrome | how much product |
| Background | L62 signature field >= 30% of the fold; L150 dot grid inside rails; L418/L427 minimal or none; L430 one structural layer; L455 product-element map | what goes behind |
| Motion | L174 orchestrated word by word on every hero (and the kit encodes it); L195 no parade, at most 3 groups; L415 2.5s settle; L358 screenshots by default; L512 no animation unless asked | animate or not |
| Bento | L242 Commslayer bento; L515 lit object scenes; L518 Kargul iso with hatch, nodes, accent; L521 Linear, no hatch/nodes/callouts/colour; L524 Kargul cells with callouts; L527 replicate pixel first | which bento |
| Reference use | L219 never reproduce identically; L506 "a floor, not a costume"; L512 + REPLICATE-FIRST rebuild at pixel size until it registers | copy or not |
| Diversity vs floor | L182, L253 new family every brief; L506 start from founder-taste + accepted builds; L138 novelty lives in details | how far to diverge |

Most of these are not truly contradictory. They are context-dependent, but the context (light vs dark, after-two-rejects, clean ask vs default, round N) is buried in prose. The fix is a decided default per mode with explicit conditions, while the log stays as evidence.

### 4.2 `select_rules.py` returns noise

I ran `select_rules.py --type hero --brief "AI meeting notes SaaS light hero, start free"`, then deleted the probe output. Result: **196 rules, 73 KB, slots core:16 founder:180, and zero topical slots.** The script adds the whole `knowledge/founder/` folder at score 100, including `sellify-design-pass.md`, a Sellify app process. That alone exceeds `--keep 60`, so every hero, type, CTA, nav and spacing slot is cut. The "core" slot pulled in AV-07 (avatar photo upload), AV-19 (saved asset rename) and CW-20 (first-person CTA test). The promised "20-50 rules that apply" never appears; the session gets founder-taste a second time plus random core rules.

`build_index.py query` is fine as a just-in-time lookup. Across 5,736 rules, the top sources are Apple HIG (343), Vercel WIG (93) and Comeau (67+26): mostly generic craft the model already knows. The engine's real edge is the 163 founder rules and the measured studies (Kargul, Flo, Rico, affectUI, hero-craft).

### 4.3 Duplication in `knowledge/web/`

- anti-ai-slop x3 (`anti-ai-slop.md`, `-detector.md`, `-process.md`)
- dark mode x2 (`dark-mode-craft.md`, `dark-mode-premium.md`)
- bento x2 (`bento.md`, `bento-craft.md`)
- Kargul x5 (`kargul-crm-teardown`, `-deep-study`, `-micro-details`, `-saas-playbook`, `-source-study`)
- logo x3 (`logo-craft`, `logo-drawing`, `logo-anatomy-measured`)
- motion x5 (`motion-and-animation`, `-a11y-perf-loading`, `-css-native`, `-library-react`, `product-motion-patterns`)
- `docs/coss-ui.md` (265 lines) repeats the user's global coss rules

### 4.4 The accepted references are thin

`knowledge/engine-accepted/` holds only `kestrel/` (two PNGs, no spec) and `quorum/` (README + PNG). Founder accepts that were never canonised with a fold and measured spec: Kite hero (`2026-10-15-kite-landing`), Murmur ("yeah nice"), Ferry ("getting better"), Tandem component ("kinda cool"), Halyard, Strata, Kaching BFCM ("it's amazing", L501), Cadence bento v3 ("nowww we talking", L519), and the Kite showcase load-in ("amazing", L497). Mode (c) has nothing to build on beyond two heroes.

---

## 5. The optimised process

### 5.1 One entry point, four mode cards

Replace the seven overlapping pipelines with one router: `.claude/skills/design-engine/SKILL.md`, at most 120 lines. CLAUDE.md shrinks to principles, hard stops and a pointer to the skill. HOWTO keeps only maintenance; START-HERE keeps only setup; ROADMAP is archived; feedback-playbook keeps the phrase book and loses its embedded pipeline.

Every mode card has the same shape: **Read (at most 5 files) -> Decide (DIRECTION front-matter) -> Build -> Gate (must pass) -> Deliver -> Record.**

**Mode A: design from scratch** (hero, landing, section/bento, product UI, post, logo)
1. Restate in one line: product, audience, one action, proof. Then write `scope:` with the founder's exact words ("hero" means one 1440x900 fold) and `motion: none | asked`. Default `none`, screenshots only (L358, L512).
2. Read: `canon/<kind>.md` (one page), its accepted reference fold and `spec.json`, the last 5 ledger rounds. Nothing else is mandatory.
3. Pick the floor: the accepted reference for the kind (light hero: Quorum or Kestrel; dark hero: Kite final; bento: Cadence v3 or the Kaching bento; product UI: Ferry + Kargul replicas; post: Expense v3 / Flo).
4. Pick the divergence: at most 3 owned decisions, chosen with `variety.mjs pick --kind <kind>` from the **approved** pool only (5.4).
5. Build from the reference's measured spec (new_build plus the system bound to the floor, not a random one).
6. Gate: `tools/gate.mjs <url> --kind <kind> --name <name>` returns 0 FAIL, and `compare.mjs` against the floor reference has been read.
7. Deliver: fold PNG beside the reference, gate summary, owned decisions, one verdict question. For hero rounds, also the switchable variants (L406).
8. Record: `tools/verdict.mjs` (5.5).

**Mode B: review and fix existing work**
1. Render: `gate.mjs <url> --kind audit` runs check + design census + consistency census at 1440, 1100 and 390, light and dark.
2. Read: `canon/audit.md` (the consistency contract: ladder, edges, shadows, type tuples, state language, volume tests) and the app's own kit, if it is a client app (L470).
3. Write `REVIEW.md`: findings ranked, each with selector, computed value, crop and exact fix (from the CLAUDE.md template).
4. Fix in source, then **sweep the diff** for the same class of drift (L482).
5. Gate: `style_diff.mjs before after` shows only intended properties changed, and the audit census is 0 FAIL.
6. Deliver before/after crops and the sweep list. Record.

**Mode C: work from references** (find, design in a style, or combine)
1. Find: at most 6 candidates from `system/inspiration-sources.json` and the benchmarks, shown as a contact sheet. The founder picks, or the engine picks with a written reason.
2. Measure: `tools/measure_ref.mjs <png|url>` writes `ref.spec.json`: type tuple, grid, gaps, radii by height, shadow tiers, palette, density counts.
3. Combine: a written matrix, one reference per axis (structure from A, type and colour from B, material and effects from C). Axes are never mixed inside one component.
4. Calibrate (optional, L440/L527): replicate one cell until `compare.mjs --score` registers. This is a **calibration artefact, not the deliverable** (resolves L219/L506 vs L512).
5. Build our content on the founder canon floor. The reference supplies style, never structure box for box (L234) and never copy, logos or assets.
6. Gate: `gate.mjs` (kind) plus `compare.mjs` against each reference used. Deliver with the matrix and the side-by-side.

### 5.2 The core canon (replaces mandatory reading)

New folder `knowledge/founder/canon/`, one page per kind, each at most about 150 lines. Each page is written as decided defaults with explicit conditions, built only from founder-taste plus accepted builds. Its numbers live in `system/canon/<kind>.json`, which the gate reads, so docs and checks cannot drift.

| Page | Floor reference | Resolves |
|---|---|---|
| `hero-light.md` | Quorum v6.6 (split) and Kestrel (centred) | headline tuple (one decided range, e.g. 52-60 / 500-550 / -0.04 to -0.045, Inter opsz, Title Case, <= 5 words, no full stop), chip off unless asked, CTA spec, nav spec, CTA-product gap 64-96, background = one quiet layer, motion off unless asked |
| `hero-dark.md` | Kite final | graphite, no glows unless the direction names one soft field, one colour h1, product-button reuse, edges (one ring) |
| `section-bento.md` | Cadence v3 Kargul grammar and the Kaching bento | settles the five bento rules: product's own objects, Kargul construction, Linear precision, callouts that name the answer, subtle tint shading |
| `product-ui.md` | Ferry + Kargul/Rico/affectUI replicas | compact grammar (L230), Attio sidebar, last-5% pass (L310), one accent, <= 2 surfaces, volume tests |
| `client-app.md` | Sellify studio kit | build from the app kit, overlays, dialogs, accent (absorbs `sellify-design-pass.md`) |
| `post-component.md` | Expense v3 / Flo tray | greys, crop, loop-only-if-asked |
| `logo.md` | traced Pinterest route | trace first; draw only on request; present sheet |
| `audit.md` | consistency contract | review template, census list, sweep rule, style diff |
| `motion.md` | Kite showcase wave, Kestrel | only when motion is in scope: settle 2.5s, one wave, loops start at opacity 0 |

Rule for keeping it settled: when a new verdict reverses a canon value, **edit the canon value in place** and append the round to founder-taste with `supersedes: L<n>`. Never stack.

### 5.3 Gates that must pass before delivery

`tools/gate.mjs` extends design_view and reuses check.mjs measurement. One command per kind, and FAIL blocks delivery.

| Gate | Kinds | Measures |
|---|---|---|
| correctness | all | the current check.mjs FAILs |
| format | hero, post | the current design_view checks, with thresholds from `system/canon/*.json` (fixes the 48-120 and 600 drift) |
| **edge and shadow census** | all | distinct box-shadow strings <= 3 per page; zero elements with ring + inset highlight; zero elements with border + ring; overlay edge in one place |
| **radius ladder** | all | each control-height band maps to the canon ladder; nested radius = outer - inset within 1px; squircle share >= 90% |
| **type census** | all | one family in the fold; Inter display loads opsz; sizes in the product view <= 4; weights in the canon set; h1 tuple in range |
| **colour census** | all | accent hue families <= 2; canvas chroma < 0.01 (dark); colourful pixels <= 3% (dark); ringed boxes <= 25 and surface fills <= 2 in a product fold |
| **button grammar** | hero, site, app | all primaries share one computed recipe (radius, height, background, shadow); secondary is text-only; nav CTA differs from hero CTA; radius >= 0.3h |
| **hero composition** | hero | nothing between nav and h1 unless `chip: yes`; subtitle <= 2 lines with last line >= 40%; CTA-product gap 64-96; product transform identity; product >= 20% of fold |
| **motion** | when `motion: asked` | filmstrip at 0/300/800/1500/2500ms: no loop visible before its entrance; settle 2.2-2.8s; first paint < 50ms |
| **scope** | all | section count and media match DIRECTION `scope:`; no video or animation unless declared |
| **regression** | revision rounds | `style_diff.mjs` against the last approved commit or URL: only properties listed in `changes:` differ |
| **direction lint** | all | DIRECTION has mode, scope, floor reference, owned decisions (<= 3) and a canon checklist with measured values |

### 5.4 Variety rebuilt as "divergence on top of the floor"

- The pools come from the accepted-and-approved lists in each canon page (button effects from L367 and buttons-2, nav variants, layout families that were accepted: centred-over-product, split product, band, Altrina panel, cinematic dark). Options with a reject verdict (didone-luxe, warm-black, tilted-3d at rest, offset or brutal buttons, mono poster, heavy 700) are blacklisted with the ledger id.
- The variety row is written at **accept time**, from the shipped build's measured values, not at round 1.
- Type voice is not randomised for SaaS heroes: Inter display (or the brand's own face) is the floor. Variety lives in the button effect, nav construction, background layer and signature visual (L138, L367).

### 5.5 Verdicts flow back in one command

`tools/verdict.mjs <name> --round N --verdict accept|reject|partial --why "<words>" --crop <png>` will:
1. append a round to `ledger/entries/<name>.json` (one file per project, rounds array, works from a gate report or a bare screenshot);
2. open the matching canon page section and print the exact line to edit, so the edit happens in the same turn;
3. append the verbatim quote to founder-taste with `supersedes:` where relevant;
4. rebuild the index;
5. on accept, copy the fold plus `measure_ref.mjs` output into `knowledge/engine-accepted/<name>/`, which makes it a floor reference.

Backlog to record now (only with the founder's confirmed words, which are already quoted in founder-taste): Cadence bento v1-v6, Gridline, Share, Expense v3, Search replica, Kaching BFCM accept.

---

## 6. Prioritised change list

Effort: S < half a day, M 1-2 days, L 3+ days.

| P | Change | Files | Effort | Fixes |
|---|---|---|---|---|
| 1 | Rewrite the skill as the single mode router (5.1); shrink CLAUDE.md to principles + pointer; strip pipelines from HOWTO, START-HERE, README and the playbook; archive ROADMAP | `.claude/skills/design-engine/SKILL.md`, `CLAUDE.md`, `docs/HOWTO.md`, `docs/package/START-HERE.md`, `README.md`, `docs/ROADMAP.md`, `knowledge/founder/feedback-playbook.md` | S | A (16), entry-point drift |
| 2 | Build the founder canon: 9 one-page decided defaults + `system/canon/*.json`, resolving the 13 conflicts in 4.1; founder-taste becomes the evidence log with `supersedes:` | `knowledge/founder/canon/*.md` (new), `system/canon/*.json` (new), `knowledge/founder/founder-taste.md` | M | C (9), A |
| 3 | `tools/gate.mjs`: the consistency censuses (edges/shadows, radius ladder, type, colour, button grammar, hero composition, scope, direction lint) as FAILs, all kinds incl. bento, app-ui and audit, thresholds from canon JSON | `tools/gate.mjs` (new; reuses `check.mjs` and `design_view.mjs`), `system/design-view/refs.json` | M-L | D (20) |
| 4 | Fix variety: approved pools from canon, blacklist rejected options with ledger ids, write the row at accept from measured values, stop randomising type for SaaS heroes | `tools/variety.mjs`, `system/variety/*.json` | S | T (5), "meh" from random axes |
| 5 | Fix the ledger and add `verdict.mjs`: `--help`, `--dry-run`, read design-view reports or a bare PNG, one file per project with rounds, drop the LOCKED axes, add a button axis; then record the 2026-10-20/21 backlog with the founder | `tools/ledger.mjs`, `tools/verdict.mjs` (new), `ledger/entries/` | S | the verdict loop |
| 6 | Accepted reference library: `measure_ref.mjs`, then canonise Kite, Murmur, Ferry, Tandem component, Kaching BFCM, Cadence v3, Kite showcase with fold + spec.json | `tools/measure_ref.mjs` (new), `knowledge/engine-accepted/<name>/` | M | E (16), mode C |
| 7 | `style_diff.mjs`: computed-style diff before/after per element, mandatory on every revision round | `tools/style_diff.mjs` (new) | M | G (5) |
| 8 | Scope and motion as declared fields: DIRECTION front-matter `scope:`, `motion:`, `changes:`, checked by the gate; motion kit off by default; resolve L174 vs L195/L512 | `system/kits/product-hero/GUIDE.md`, `tools/new_build.mjs` (DIRECTION stub), the gate | S | F (4), Nocturne-type parades |
| 9 | Retrieval: `select_rules.py` stops dumping `knowledge/founder/` (the canon replaces it), filters by mode (no AV/Sellify rules in a hero), keep 30; or retire it for heroes and keep `build_index.py query` just in time | `tools/select_rules.py`, `tools/build_index.py` | S | noise, the 18k-token slate |
| 10 | Remove contradicting checks and stale numbers: `ai.pill-nav`, `ai.default-font-only`, product-UI thresholds (`minBodyPx`, `maxDistinctFontSizes`, `maxFontFamilies`), design_view gap/top ranges; merge the duplicate knowledge notes (anti-slop x3, dark x2, bento x2, Kargul x5, motion x5, logo x3) into one note each with an INDEX row | `tools/check.mjs`, `tools/thresholds.json`, `tools/design_view.mjs`, `knowledge/web/*`, `knowledge/web/INDEX.md` | M | D, reading load |

Further items, lower impact:
- `compare.mjs --score`: edge-map registration in px, so "registers within 4px" is a number (S).
- Re-run evals after items 1-6 with one brief per mode, scoring gate fails plus the founder rubric (M).
- Move `sellify-design-pass.md` into `canon/client-app.md` (S).
- Delete or fold `deal.mjs` into variety (S).

### Definition of "works every time"

A fresh session:
- reads at most 5 files (under 15k tokens) before building;
- every DIRECTION passes lint;
- every delivery has 0 gate FAIL, a side-by-side with its floor reference, and a revision diff on rounds 2+;
- every founder message lands as a ledger round plus a canon edit in the same turn.

Target: no reject of class A, C, D, F, G or T for 10 consecutive deliveries. Only B (genuinely new taste) should remain.
