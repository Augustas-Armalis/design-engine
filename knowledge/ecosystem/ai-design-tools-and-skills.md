---
source: web:multi (GitHub REST API + repo READMEs + arXiv + vendor docs, fetched 2026-10-08)
chapter: What already exists online that the engine can install, benchmark against, mine or learn from
pages: n/a (web)
topic_tags: [ecosystem, agent-skills, mcp, design-md, design-lint, benchmarks, eval, tokens, templates, licences]
status: studied
---

# AI design tools, agent skills, design linters and benchmarks: what to adopt next

Companion data: `ecosystem.json` (same entries, machine-readable, with `rank`). Scope: everything NOT already covered by `knowledge/web/anti-ai-slop*.md` (Impeccable, design-slop-cop, taste-skill, Hallmark, Anthropic frontend-design skill, Anthropic harness evaluator are treated as known and appear here only as foils).

Research only. Nothing was installed or executed. Every command below is a proposal to run later, in a scratch directory, with versions pinned and the code skimmed first.

## 0. Evidence legend and honesty notes

- `[api]` = number read from the GitHub REST API on 2026-10-08 (stars, licence SPDX, pushed_at, created_at). Reliable for the day.
- `[readme]` = WebFetch of the repo page; a small model summarised it, so counts and names are good, nuance is not. Re-check before turning anything into canon.
- `[paper]` = arXiv abstract/page. `[search]` = search-engine summary only (weakest). `[engine note]` = my inference.
- **Star counts on the new agent-skill repos look inflated or hype-driven** (e.g. an aggregator quoted 82K to 99K for the same repo that the API reports at 100,001; ui-ux-pro-max-skill 134K; awesome-design-md 120K, created 2026-03-31). Weigh by content, tests, commits and independent benchmarks, not stars.
- Not verified here: Aceternity UI licence, `cosscom/coss` `LICENSING.md`, the UI-Bench framework repo URL, the Trystan Sarrade "Claude Design reconstruction" repo, the contents of any `SKILL.md` beyond what READMEs state, StyleSeed `BENCH-V1` raw evidence.

## 1. Ten findings that matter (read these if nothing else)

1. **Google Labs published DESIGN.md as an open spec** (`google-labs-code/design.md`, Apache-2.0, 28.3K stars, created 2026-04-10, pushed 2026-10-08, version `alpha`). YAML front matter holds normative tokens (`colors`, `typography`, `rounded`, `spacing`, `components`) and the markdown body holds rationale in a fixed section order (Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts). It ships a CLI: `lint` (11 rules incl. `broken-ref`, `contrast-ratio`, `orphaned-tokens`, `missing-typography`, `section-order`), `diff`, `export` (Tailwind v3 json, Tailwind v4 `@theme` css, W3C DTCG), `spec --rules` (prints the spec for prompt context). This is the first de-facto interchange format for "visual identity to agents" and our `work/<name>/DIRECTION.md` is a near-subset waiting for a machine-readable front matter. `[api][readme]`
2. **A whole class of "extract the design system from a live site" CLIs now exists, and they already output DESIGN.md/DTCG/Tailwind v4.** `dembrandt/dembrandt` (MIT, 3.6K stars, pushed 2026-10-07; Playwright; `--design-md`, `--dtcg`, `--tailwind`, `--shadcn`, `--wcag`, `--compare` drift gate that exits 1, MCP server). `yuvrajangadsingh/brandmd` (MIT, no LLM, output validated against the Google linter, `brandmd check` for CI drift). Both can scale our 38-site teardown to hundreds of sites and can be pointed at our own output. `[api][readme]`
3. **There is now an expert-judged, public benchmark of AI site generators, and the famous tools do not win it.** UI-Bench (arXiv 2508.20410, AfterQuery + UPenn): 10 tools, 30 prompts, 300 sites, 4,047 blinded expert pairwise matches, TrueSkill. Leaderboard: Orchids 1st (mu 30.1), Figma Make 2nd, Lovable 3rd, Anything, Bolt, Magic Patterns, Same.new, Base44, **v0 9th**, Replit 10th. Prompt set and eval framework are stated as released; generated sites "not yet public" at paper time. Design Arena (YC S25) reports the same pattern with crowd votes (non-vibe-coding agents beating v0/Lovable/Bolt, founders' claim on HN). Implication: copying the *rules* of the top generators is not a route to distinctive output; use their prompts as an external eval set instead. `[paper][fetched leaderboard][HN]`
4. **The strongest evidence for our whole architecture is a competitor's own benchmark: rules alone do not help; an enforced render-and-score gate does.** StyleSeed (MIT, 973 stars): across 120 rendered cells the enforced gate (target score >= 80, re-score after fix) gave +5.3 points for both Codex and Claude Code, while raw rules alone gave Codex +1.6 and **Claude Code -3.7**. Judge type and briefs are not in the README (`BENCH-V1` not read), so treat the magnitudes as unverified; the direction matches `CLAUDE.md` principle 3. A second independent record (plugin87 `evals/RESULTS.md`) shows blind agents passing all 14 objective gates yet the critic returning "rework" on the same screens (empty states, weak hierarchy): gates catch craft, not taste. `[readme]`
5. **Two repos already implement big chunks of what `check.mjs` lacks.** `educlopez/ui-craft` (MIT) `ui-craft-detect`: 43 rules (AI slop, dark patterns, a11y, forms, marketing copy, perf, state design), deterministic `UICraftScore` 0-100, MCP tools, GitHub Action, edit-time hooks. `plugin87/ux-ui-agent-skills` (MIT, 1.5K stars): 52 gates, 34 in a real browser (per-state contrast, axe roles, keyboard, 2.5.8 target size, reduced motion, overflow at 280 px), 18 file gates (token resolution, hardcoded values, emoji, destructive-intent), bad-fixture tests, 138 design systems, 14 DTCG token files. Mine the rule lists; do not install wholesale. `[readme]`
6. **Direction divergence has a cheap, explicit test we have not encoded:** oil-ui (MIT, 1.1K stars) requires that any two candidate directions share at most one of four traits (layout, typography, colour, hero visual) and applies a "squint test" (compare above-the-fold light/dark distribution). This slots straight into `deal.mjs` and `ledger.mjs similar`. `[readme]`
7. **The "reference triad" step has paid and free retrieval backends:** Refero MCP (125K+ product screens, paid Pro), Niblet (Apache-2.0 skill; catalogue needs a token), Mobbin, UIZZE, plus 73-550 brand DESIGN.md files (awesome-design-md MIT; getdesign.md 550+, paid tiers). They supply grounding but are also a monoculture risk: everyone retrieving the same "best" screens converges. `[search][readme]`
8. **Closed generators publish almost no reusable design rules.** The only extractable ones are leaked prompts (v0, Lovable, Orchids, Same.dev in the GPL-3.0 `x1xhlol` repo) and one captured Claude Design session (third-party, single capture). v0's prompt is a precise recipe for the *v0 look*: 3 to 5 colours total, no purple/violet, at most 2 font families, body line-height 1.4 to 1.6, no text under 14 px, `text-balance`, flexbox first, no blob/gradient-circle filler, no emoji icons, semantic tokens only, "run design inspiration first". Those rules are exactly the median that produces v0's 9th-of-10 result: useful as a *convergence fingerprint to measure against*, not as guidance. `[readme][raw prompt dated 2026-10-05]`
9. **Licence trap in our own stack:** `cosscom/coss` (the repo behind coss ui) is **AGPL-3.0 by default**; its README says only `apps/ui` and `apps/origin` keep "their original MIT licence" and all other directories, which would include `packages/ui`, are AGPL. Per-component copy-paste from the registry may be MIT, but confirm in `LICENSING.md` before shipping client code that vendors `packages/ui`. `[api][readme]`
10. **Human-judge reliability is a known weak spot, so our critique step needs calibration.** WebDevJudge (ICLR 2026) reports that LLM judges fall short of human reliability at preferring one web implementation over another; UXBench (arXiv 2606.16262, MIT) evaluates critiques by "repair lift" (does a fixed repair agent improve the page after reading the critique?) and finds model spread of only about 0.08 points; ArtifactsBench reports 94.4% ranking consistency with WebDev Arena for a checklist-guided MLLM judge. Design our `score.mjs` human step as pairwise, rubric-anchored, blind. `[paper][search]`

## 2. Landscape by category

### 2.1 AI UI generators: what is actually open

| Tool | What is open | What it encodes (design) | Take | Source quality |
|---|---|---|---|---|
| v0 (Vercel) | Leaked prompt (`x1xhlol/system-prompts-and-models-of-ai-tools/v0 Prompts and Tools/Prompt.txt`, repo GPL-3.0, 144K stars, last push 2026-08-11); `vercel/v0-sdk` (API only) | See finding 8. Also: mobile-first, Tailwind spacing scale (no arbitrary px), `gap` not `space-*`, `leading-relaxed`, real or generated images over placeholders, icon sizes 16/20/24, semantic HTML + `sr-only`. No motion or dark-mode rules beyond "polished". | Fingerprint of the median; ~6 of these are checkable (`text-wrap: balance`, colour count, font count, min text 14 px, no emoji, icon size set). Do not copy prompt text (GPL repo, Vercel's text). | leaked, unverified by Vercel |
| Lovable | Leaked agent prompt (same repo); official docs `docs.lovable.dev/features/design-systems` | Everything in `index.css` + `tailwind.config.ts` as HSL semantic tokens; no raw colour classes; variants over inline style; "update the design system first, then components". Docs: `.lovable/design-system.json` (tokens, components, variants), `rules/*.md` generated from the schema, `system.md` hand-written, **adherence checks flag raw colours, one-off values, inline overrides, re-implemented components, then auto-retry**. | The *adherence-check pattern* (generate rules from a machine schema, lint against them, retry) is the transferable idea. Matches Google DESIGN.md `lint`. | docs [fetched]; prompt leaked |
| Bolt / bolt.diy | `stackblitz/bolt.new` prompts.ts: **no design instructions at all**. `bolt.diy` prompt has a design paragraph: distinctive art direction, 8pt grid or tokens, Pexels stock URLs only (never downloaded), breakpoints <768 / 768-1024 / >1024, skeleton loaders, mobile lists with 5-10 items and loading/empty/error/success states | Generic "visually stunning, not cookie-cutter" with no mechanism | Only the "populate with 5-10 items and all four states" rule is a useful check. Otherwise: shows that adjectives without a gate do not work. | raw source [fetched] |
| Claude Design (Anthropic Labs, launched 2026-04-17) | Not published. Third-party capture of one session (lobsterpack write-up, mirrored on gwern.net): ~30,240-char system prompt, 55 tools, a **verifier subagent** that screenshots, probes the DOM and re-checks after fixes; model `claude-opus-4-7`. Community reconstructions: `JimLiu/baoyu-design` (MIT, 4.3K stars), `rohitg00/awesome-claude-design` (MIT, 1.1K, lists community-reported default fingerprints and counter-rules) | Interview first (many questions) before building; declare type pairing, palette, layout and one signature element before HTML; banned tropes and fonts list; near-neutral whites/blacks with few same-chroma accents; 3+ variations escalating from conservative to ambitious; simple shapes instead of hand-drawn SVG; verifier loop (broken images, console errors) | We already have most of this in `CLAUDE.md`. Missing: **verifier checks for broken images, console errors, failed requests**, and "escalating variations" as an explicit dealer axis (conservative -> ambitious). | one capture, unverified; reconstructions are not Anthropic text |
| Google Stitch | `google-labs-code/design.md` (Apache-2.0), `google-labs-code/stitch-skills` (Apache-2.0, 8.4K stars, 15 skills across 3 plugins; includes `design-md`, `extract-design-md`, `enhance-prompt`, `stitch-loop`, `taste-design`, `react-components` with token-consistency validation). All need the Stitch MCP server. | DESIGN.md = tokens + rationale; `enhance-prompt` rewrites vague ideas with UI/UX vocabulary; `taste-design` writes DESIGN.md files enforcing "premium, anti-generic standards" (rules inside not read) | DESIGN.md format (adopt). `enhance-prompt` vocabulary list is worth reading once for brief-expansion terms. Do not depend on Stitch MCP. | repo page [readme]; skill contents not read |
| Figma Make | Official help-centre docs: `guidelines/Guidelines.md` folder per file, nested folders per component or token set; tips: concise imperative rules, specific over vague ("sparingly"), full code snippet for any value built from several tokens (shadows). Figma developer docs "write design system guidelines". Per-file only (no global guidelines as of a mid-2025 forum thread). UI-Bench rank 2 | Guidelines are the control surface; there is no public prompt | Writing style for our `system/` rule files: one rule, one snippet. Our local Figma MCP + `figma-generate-library` skill can push `system/tokens` into Figma variables if a founder wants Figma-side review. | docs [search summary of help centre] |
| Magic Patterns | Docs only. Design-system import from GitHub, zip, Figma, **live website**; "Rules" (default prompts applied to every design) and "Skills" (reusable instructions activated by description); colour tokens CSV with up to 7 files. UI-Bench rank 6 | Same architecture as ours (system + rules), closed | None to install. Confirms the pattern. | docs [search] |
| Subframe | `SubframeApp/subframe` skills (`setup`, `design`, `develop`) + MCP (read/design pages, edit theme, fetch component code). Generates inside a defined design system; reviewers say limited exploration | Design-first, then develop; CLI `@subframe/cli sync` | Pattern only: "design in the system, then code". Not applicable without a Subframe account. | docs [search] |
| Onlook | `onlook-dev/onlook` Apache-2.0, 26.9K stars, pushed 2026-08-25: visual editor that instruments Next.js + Tailwind so DOM edits write back to code | No prompt library or design guidance | Possible later: click-to-edit review of our built pages. Not now. | repo [readme] |
| Builder.io, Tempo, Polymet | Builder: SDK monorepo (MIT), no open design prompt found. Tempo, Polymet: product directories only, no open prompts or rules found | n/a | Nothing. Say so and move on. | [search] |
| Orchids / Same.dev / Leap.new | Leaked prompts in the same GPL-3.0 repo; Orchids tops UI-Bench | not read | Worth one read of Orchids' prompt (UI-Bench #1) to see what a leader encodes; reading only. | not fetched |

[engine note] Pattern across all of them: the *control surface* is converging on (a) a machine-readable token file, (b) a prose guideline file, (c) a lint/adherence pass, (d) a verifier that renders. That is our architecture. What none of them publish is a cross-project **diversity gate**. That remains our differentiator.

### 2.2 Agent skills, MCP servers, plugins (new relative to the slop notes)

| Repo | What it is | Maturity [api] | Licence | Worth |
|---|---|---|---|---|
| `nextlevelbuilder/ui-ux-pro-max-skill` | Design intelligence DB: 79 styles (50 active), 192 product types each with its own palette and reasoning rule, 74 font pairings, 119 UX rules, 34 landing patterns; stdlib BM25 `search.py`; `--persist` writes `design-system/<slug>/MASTER.md` | 134K stars, pushed 2026-10-08 | MIT | **Foil and data mine, not an install.** Deterministic product-type -> palette/style mapping is the monoculture mechanism in code. Data (font pairs, 119 UX rules) can feed `system/rules` after dedupe and Larpo-divergence filtering. No independent benchmark; repo itself says so. |
| `nexu-io/open-design` | Local-first "Claude Design alternative": daemon + skills (100+), 151 `design-systems/*/DESIGN.md` packages, 277 plugins, `critique` template (5-dim scoresheet: Philosophy, Visual hierarchy, Detail, Functionality, Innovation, 0-10, cite evidence, mean above 8 is suspicious), artifact-lint API | 100K stars, pushed 2026-10-08 | Apache-2.0 (some bundled MIT, provenance per system) | Mine the 151 DESIGN.md as a *corpus to measure our output's distance from*, and the critique rubric wording. Do not adopt the app. |
| `bitjaru/styleseed` | Design-method engine: 23 skills (router + 22), 74 craft rules, 8 grammars, 5 adapters, 9 brand recipes, 7 skins, 48 React components, `lint`/`score`/`verify`, `STYLESEED.md` decision lock, `resolve` compiles only relevant rules with source-hash manifest | 973 stars, pushed 2026-10-01 | MIT | Benchmark design (finding 4), its 7 named checks (default accent unselected, emoji icons, icon-in-chip cards, all-even grids of centred cards, accidental flat black, type sizes off scale, hardcoded hex), and the "compile only relevant rules" idea for our 1,328-rule index. Honest README: score 80 is not expert approval; early page scored 58/100. |
| `educlopez/ui-craft` | See finding 5. Dials CRAFT_LEVEL / MOTION_INTENSITY / VISUAL_DENSITY; variant locks; `design-reviewer` + `a11y-auditor` read-only subagents; `UsabilityScore` kept separate from the deterministic score | 373 stars, pushed 2026-09-03 | MIT | Rule list for new `check.mjs` assertions; separation of deterministic vs judged score. |
| `plugin87/ux-ui-agent-skills` | See finding 5 | 1.5K stars, pushed 2026-10-08, v2.9.6 | MIT | Gate list; `tests/fixtures/bad` pattern (known-bad pages the checker MUST fail); `DS_REQUIRE_BROWSER=1` idea (a skipped browser gate must not exit 0). |
| `oil-oil/oil-ui` | Direction explorer/comparer with screenshot review; open edition MIT, Pro is paid (69 RMB) | 1.1K stars, pushed 2026-10-08 | MIT | Distinctness rule + squint test + side-by-side compare page that returns the chosen option as a structured line (finding 6). |
| `zanwei/design-dna` | Extracts a three-part profile (measurable tokens, qualitative style, visual effects) from reference images/URLs; `measure-colors.mjs` (k-means + perceptual merge, outputs hex, coverage, role) and `verify.mjs` (re-measures a generated screenshot: per-colour dE + coverage drift, PASS/FAIL) | 1.9K stars, pushed 2026-08-28 | MIT | Colour-fidelity check: DIRECTION palette vs rendered screenshot. Their own example: perceived rebuild mean dE 9.54 FAIL vs measured 0.87 PASS; LLM colour perception drifted a brand pink by dE ~29. Also solves our known gap "text on gradients/images not contrast-checked" if we sample pixels behind text boxes. |
| `PyModel/niblet-skill-mcp`, Refero MCP (`api.refero.design/mcp`, Pro), UIZZE (`uizze/uizze`, MIT, 42 stars), Mobbin | Real-screen reference retrieval for agents | Niblet 86 stars Apache-2.0; Refero proprietary | mixed | Candidate backends for the "reference triad". Catalogue licences unstated; screenshots of real products are third-party copyright: use as reference, never as assets. |
| `Dammyjay93/interface-design` (MIT, 5.8K), `ibelick/ui-skills` (MIT, 9.5K; CLI `npx ui-skills`, MCP `ui-skills.com/mcp`), `Owl-Listener/designer-skills` (MIT, 2.9K), `LottieFiles/motion-design-skill` (MIT, 2K), `OneRedOak/claude-code-workflows` (MIT, 3.9K; `/design-review` with Playwright subagent), `MonkeyUI-dev/vibe-to-ui` (MIT, 36 stars; 3 directions then confirm; inspiration library) | Mostly thin skill packs; `interface-design` persists decisions in `.interface-design/system.md` and has `design-deslop` (diff-scoped cleanup) | see table | MIT | Low marginal value over what is installed (baseline-ui, userinterface-wiki, impeccable already present locally). Idea worth lifting: diff-scoped deslop pass. |
| `vercel-labs/web-interface-guidelines` (MIT, 947 stars) / `vercel-labs/agent-skills` (32K stars; API says no licence while page says MIT, treat as unclear) | 108 rules in 9 sections (Interactions 40, Animation 11, Layout 7, Content & A11y 19, Perf 14, Design 9 ...); mechanical examples: hit target 24 px (44 mobile), mobile input font >= 16 px, mutation < 500 ms, virtualise lists > 50, no `user-scalable=no`, real ellipsis char | active | MIT | Already ranked #1 in `knowledge/web/ingestion-queue.md`; if not yet ingested it remains the cheapest high-density win. |
| `21st-dev/magic-mcp` (ISC; now the "21st MCP", key required, 10K+ community components, licence of community components unstated), `magicuidesign/magicui` (MIT, 22.5K), `ibelick/motion-primitives` (MIT, 6.5K), `jnsahaj/tweakcn` (Apache-2.0, 10.4K, visual shadcn theme editor), `shadcn-ui/ui` (MIT, 125K) + registry + MCP (namespaced registries via `@name` in `components.json`) | Component and effect libraries and theme tooling | active | mixed | **These are the sources of the template look** (spotlight cards, beams, aurora, marquee). Study for effect techniques and motion code; never a default. `tweakcn` presets are a useful dataset of radius/shadow/colour recipes to compare with ours. `serafimcloud/21st` repo is stale (last push 2025-05-28); the product moved to the MCP. |
| `cosscom/coss` | coss ui + Origin UI + "Particles"; official design system of Cal.com, built on Base UI | 10.7K stars, pushed 2026-10-07 | **AGPL-3.0 default; `apps/ui`, `apps/origin` MIT per README** | See finding 9. Our default stack depends on it; add a licence note to `CLAUDE.md` build step. |

### 2.3 Design lint, token and audit tools: what each adds that `check.mjs` lacks

`check.mjs` today (read from source): horizontal overflow; min text size and body size; line-height; font-family count; font-size count; line length; contrast on flat backgrounds (gradients/images skipped); target size; 4 px spacing grid ratio; distinct radii count; one h1, heading order, page meta, img alt; axe serious/minor; AI tells (banned phrases, default-font-only, pill nav, all-caps eyebrow, purple/blue gradient, glow shadows); fingerprint for the ledger.

| Tool | Measures | Not in `check.mjs` | Verdict |
|---|---|---|---|
| Google `design.md lint/diff/export` (Apache-2.0) | Token graph health: broken refs, orphaned tokens, missing primary/typography, component bg/text contrast >= 4.5, section order; diffs between two DESIGN.md | **Whether the design intent file is internally consistent** before any code exists; export to Tailwind v4 `@theme` | Adopt (rank 1) |
| Dembrandt (`--compare`, `--wcag`, `--dtcg`) | Rendered tokens (colours with roles, type, spacing, borders, shadows, motion scale, components, breakpoints) and drift vs a baseline | **Intent-vs-rendered drift**: do the built pixels use the DIRECTION tokens? Real-DOM colour-pair contrast incl. hover/focus states from CSS | Adopt (rank 2) |
| Project Wallace `css-analyzer` (MIT, 366 stars, v9.8.2 per jsDelivr) + `css-code-quality` (MIT, 155) | Shipped-CSS metrics: totals and uniqueness ratios for colours, font sizes, line heights, z-indexes, radii, shadows, durations, easings, units; `!important` share; specificity; custom properties defined/used/unused; selector complexity; 0-100 maintainability/complexity/performance scores | Counts of **unique values in the stylesheet** (not just computed elements), token **usage ratio**, specificity/!important debt, unused custom properties | Adopt (rank 9). Note `css-design-tokens` is EUPL-1.2 (copyleft): do not vendor. |
| Mozilla `stylelint-plugin-mozilla` `use-design-tokens` (colour, background-color, border-color; allows `var()` fallbacks and token-to-token indirection), `oxlint-tailwindcss` (`no-hardcoded-colors`, `prefer-theme-tokens`, `no-arbitrary-value`), `eslint-plugin-tailwindcss` / `eslint-plugin-better-tailwindcss` | Source-level token adherence | **Raw colour/arbitrary-value use in source** (check.mjs only sees computed output) | Adopt for Next.js/Tailwind builds (rank 14). Plugin licences/versions not verified; Tailwind v4 support differs by plugin. Stylelint itself is MIT, 11.5K stars. |
| Lighthouse (Apache-2.0, 30.9K) / `ChromeDevTools/chrome-devtools-mcp` (Apache-2.0, 53K; `lighthouse_audit`, performance traces) / `microsoft/playwright-mcp` (Apache-2.0, 38K) | LCP, CLS, TBT/INP proxies, SEO, best-practices, console errors, network failures, image sizing | **Performance, layout shift, console errors, broken requests** | Adopt the numbers via MCP or `lighthouse` CLI (rank 13) |
| axe-core (MPL-2.0, already used) vs Pa11y (LGPL-3.0, 4.6K) | Pa11y wraps HTML_CodeSniffer/axe | Nothing new | Skip Pa11y |
| APCA (`Myndex/apca-w3`, 213 stars, licence NOASSERTION, algorithm 0.0.98G from 2021, still beta) | Perceptual contrast Lc | Alternative contrast model. Adrian Roselli (2026-04) notes APCA was pulled from the WCAG 3 draft in 2023 and the WCAG 3 algorithm is undecided | Advisory only; keep WCAG 2.x 4.5/3.0 as the gate. Pin the version if used. |
| hotgaze (MIT, v0.1.1 2026-07-18, alpha) | Predicted attention share per region, peak, rank, focal points, variant compare; fast heuristic backend (spectral residual, contrast, centre bias, reading prior) or UNISAL deep backend (~30 MB) | **"One dominant element per viewport"** measured rather than eyeballed; before/after attention shift | Try (rank 12). Not eye tracking; priors only. |
| Style Dictionary (Apache-2.0, 4.9K), DTCG spec (2.1K stars; format 2025.10 stable) | Token build pipeline | Multi-platform token export | Low priority: `design.md export` already emits DTCG and Tailwind v4. |
| `pixelmatch` (ISC), `odiff` (MIT), `sharp` (Apache-2.0), `transformers.js` (Apache-2.0) | Pixel diff / image processing / in-process CLIP-style embeddings | **Screenshot-distance similarity** (our listed "not built" gap, `anti-ai-slop-detector.md`). Pixel diff is the wrong tool for layout similarity; use downscaled luminance thumbnails (the squint test) plus perceptual hash via `sharp`, or CLIP embeddings via `transformers.js` for semantic similarity | Build small (see section 4, item 7). Verify the embedding model's licence before use. |
| Polypane (commercial, ~USD 9-11/user/month, sources conflict) | Multi-viewport browser, contrast overlay, outline/focus panels | No agent interface found | Human QA aid only; skip. |
| Wappalyzer | Tech-stack fingerprints. Original went closed-source Aug 2023; forks (`enthec/webappanalyzer`, others) continue, licence not confirmed | Not a design measurement | Skip. |
| `cssstats/cssstats` | CSS stats | Superseded by Wallace; last push 2023-10 | Skip. |

### 2.4 Benchmarks and eval datasets (external yardsticks for `evals/`)

| Item | What | Use | Caveat |
|---|---|---|---|
| UI-Bench (arXiv 2508.20410; uibench.ai) | 30 prompts, expert pairwise, TrueSkill, public leaderboard of 10 tools | Run our pipeline on the 30 prompts; judge pairwise against stored screenshots or leaderboard tools' outputs via founder votes; report an Elo/TrueSkill-style rating in `score.mjs` | Generated sites "not yet public" at paper time; prompt repo URL not found in this research; leaderboard undated |
| Design Arena (YC S25) | Crowd head-to-head, categories incl. websites and vibe-coding tools | Sanity baseline; nothing to download confirmed | HN commenters warn about taste drift ("turbo-slop"), voters favour visual appeal over adherence; dataset openness unstated |
| LMArena WebDev Arena (dataset `lmarena-ai/leaderboard-dataset` webdev subset on Hugging Face; `webdev-arena-preference-10k`) | 10,501 prompts with paired code outputs and user preferences | Mine winning vs losing HTML for measurable differences (`check.mjs` fingerprints) | Licensing restrictions noted by WebDevJudge; "Website Design" is the largest prompt category (15.3%) |
| WebDevJudge (`lcy2723/WebDevJudge`, ICLR 2026) | Meta-eval of LLM judges with human preference labels and structured rubrics (static, dynamic, intention, combined) | Calibrate our LLM critique rubric before trusting it | No licence stated; built on the Arena preference set |
| UXBench (`Jackwwj619/UXBench`, MIT, arXiv 2606.16262) | 41 fixtures (11 real-product anchors incl. Notion, Stripe Docs; 30 synthetic) in 10 families (Landing, Pricing, Onboarding, Dashboard...), 7 UX dimensions, repair-lift metric, CLI `uxagent audit-url` / `eval-url` | Test whether our critique step produces *actionable* findings (see integration item 15) | 4 stars, very new, Python + uv + Playwright |
| ArtifactsBench (`Tencent-Hunyuan/ArtifactsBenchmark`) | 1,825 tasks, temporal screenshots + per-task checklist + MLLM judge; 94.4% ranking consistency with WebDev Arena (paper) | Steal the "checklist per brief + screenshots at 3 time points" judging protocol | Licence not verified; judge model details from secondary site |
| WebGen-Bench, WebVR (175 pages, 96% agreement with humans on recreation fidelity), EvoGenUI-Bench (MIT) | Functional/recreation/multi-turn benchmarks | Not aesthetic; skip except as method references | |
| UIClip (CMU/Apple, arXiv 2404.12500) | CLIP-based model scoring UI quality vs description; ~75% pairwise agreement per a secondary review | Possible automatic "design quality" signal | No code or weights found; secondary numbers; skip |
| UICrit (`google-research-datasets/uicrit`) | 3,059 critiques of ~1,000 mobile UIs; archived, licence unlisted | Mobile app UIs, not SaaS web | Skip |

### 2.5 Templates and design systems for STUDY (not copying)

I could not render these here; "distinctive vs template-y" below is a judgement from what the repo is for, to be confirmed by running `dembrandt` + `check.mjs` on the live sites.

| Repo | Kind | Maturity [api] | Licence | Study value |
|---|---|---|---|---|
| `PostHog/posthog.com` | Company's own marketing site + docs + handbook (Gatsby, Tailwind, Kea, Storybook, `STYLEGUIDE.md`) | 1.2K stars, pushed 2026-10-08 | NOASSERTION (check file; brand assets and handbook content may differ) | **Distinctive** by design (brand-led, opinionated). Read `STYLEGUIDE.md` and the component structure for how a deliberately non-template SaaS site is organised. |
| `supabase/supabase` (monorepo incl. website) | Product + marketing | 111K stars | Apache-2.0 | Large real-world system; website app location not verified in this session. |
| `dubinc/dub` | Product + marketing | 24.9K stars | NOASSERTION | Dub's look is also a getdesign.md entry; compare their repo against the extracted DESIGN.md to see how lossy extraction is. |
| `wasp-lang/open-saas`, `nextjs/saas-starter`, `ixartz/SaaS-Boilerplate`, `vercel/commerce`, `shadcn-ui/taxonomy` | Starters (MIT) | 16K / 16K / 7.4K / 14K / 19K stars | MIT | **Template-y by purpose**: useful only to see the median structure (and Open SaaS now ships its own AGENTS.md, skills and a Claude plugin, i.e. it seeds the monoculture). Use as a negative fingerprint. |
| `tailwindlabs`, Linear, Resend, Cursor marketing sites | No public source found for these in this research | | | Study live via teardown only. |
| Design systems with open source: Primer, Polaris, Carbon, Atlassian, Radix Themes (8.8K stars, MIT, last push 2026-04-11), Park UI (2.4K, MIT), GOV.UK | Reference systems | | | Already covered by `knowledge/web/design-systems.md`. Radix Themes and Park UI have gone quiet (last pushes April 2026): treat as stable, not evolving. |
| Galleries: Saaspo, Land-book, Lapa Ninja, Godly, SaaSFrame, Landingfolio, One Page Love, SaaSUI (in-app screens) | Curated screenshots | n/a | Site terms (unchecked); screenshots are third-party copyright | Reference triad source; no API confirmed. Prefer picking the *odd* ones (Godly-style) over top-ranked to avoid centroid reference. |

## 3. Ranked "adopt / try next" list

Effort: S < 0.5 day, M ~ 1-2 days, L > 3 days. Value: H/M/L for "closer to one prompt in, consistent non-AI-looking output out".

| # | Item | Effort | Value | One-line action |
|---|---|---|---|---|
| 1 | Google `design.md` (spec + CLI) | S | H | Make `work/<n>/DIRECTION.md` start with Google-format front matter; lint, diff and export in the pipeline |
| 2 | Dembrandt | S-M | H | Scale teardown to 100+ sites for threshold calibration; use `--compare` as an intent-vs-render gate on our own pages |
| 3 | UI-Bench prompts + TrueSkill method + leaderboard | M | H | Add `evals/ext-uibench/` and a pairwise rating step to `score.mjs` |
| 4 | StyleSeed gate experiment design + its 7 checks | M | H | Replicate "raw rules vs enforced gate" on our own `evals/` to prove the check loop earns its keep; add the 7 checks |
| 5 | `ui-craft-detect` rule list (43) | M | H | Port the rules we lack into `check.mjs` / `thresholds.json` |
| 6 | `plugin87` browser gates + bad-fixture tests | M | H | Port per-state contrast, reduced-motion, 280 px overflow; create `tests/fixtures/bad` the checker must fail |
| 7 | oil-ui distinctness rule + squint test | S | H | Add `traitOverlap` and thumbnail-luminance distance to `deal.mjs` and `ledger.mjs similar` |
| 8 | shadcn registry (+ `registry-template`) for proven sections | M | H | Publish accepted sections as private `registry:block` items; closes the README "no section library in code" gap |
| 9 | Project Wallace `css-analyzer` | S | M-H | Add shipped-CSS uniqueness and token-usage metrics to `check.mjs` |
| 10 | design-dna `measure-colors` / `verify` approach | S-M | M-H | Palette-fidelity check and a pixel-sampling contrast check behind text on images/gradients |
| 11 | Brand DESIGN.md corpora (awesome-design-md, open-design `design-systems/`, getdesign.md) | M | M | Build a "centroid of the market" fingerprint; flag deals that sit near it |
| 12 | hotgaze | M | M | Optional `attention.py` pass on the fold screenshot; warn if top region share is low or flat |
| 13 | Lighthouse / chrome-devtools-mcp | S | M | Add LCP/CLS/console-error/failed-request numbers (the Claude Design verifier items) |
| 14 | Token-adherence lint (Mozilla stylelint rule, `oxlint-tailwindcss`, `eslint-plugin-better-tailwindcss`) | S | M | Run on Next.js builds; report share of colour declarations resolving to tokens |
| 15 | UXBench repair-lift protocol | L | M | Evaluate the critique step; start with 5 local fixtures |
| 16 | WebDevJudge lessons | S | M | Make the LLM critique pairwise and rubric-anchored; never a single-model Likert |
| 17 | Claude Design capture: interview + verifier + escalating variations | S | M | Process edits to `CLAUDE.md`, no install |
| 18 | `ui-ux-pro-max-skill` data (font pairs, 119 UX rules) | M | M-L | Mine, dedupe against `system/rules/index.json`, never use its product-type -> palette map |
| 19 | Refero / Niblet / Mobbin MCP | S trial | M | Trial one for the reference-triad step; budget and licence first |
| 20 | `stitch-skills` (`enhance-prompt`, `taste-design`, `extract-design-md`) | S read | L-M | Read three SKILL.md files; borrow vocabulary only |

## 4. Integration steps (concrete)

Conventions: run installs in a scratch dir or as dev-dependency with an exact version; `npm view <pkg> version time` first; read the package's `postinstall` and entry code before running. Record each decision in the commit message.

### 1. Google DESIGN.md
1. In a scratch dir: `npx @google/design.md spec --rules --format markdown > designmd-spec.md`; read it once; store a trimmed copy as `knowledge/ecosystem/designmd-spec-notes.md` (our own notes, not the whole spec).
2. Add `system/tokens/DESIGN.template.md` with front matter keys `name`, `colors`, `typography`, `rounded`, `spacing`, `components` plus our extra sections (Direction, Divergence row, Overrides). Unknown sections are preserved by the format, so our `override: <rule-id> because <reason>` lines survive.
3. `deal.mjs`: emit the dealt direction as a draft front matter block so every `work/<name>/DIRECTION.md` starts machine-readable.
4. Pipeline step 3.5: `npx @google/design.md lint work/<name>/DIRECTION.md` (exit 1 on error). Treat `contrast-ratio`, `missing-typography`, `broken-ref` as FAIL, `orphaned-tokens` as WARN with justification.
5. Pipeline step 5.5: `npx @google/design.md export --format css-tailwind` to generate the Tailwind v4 `@theme` block from the direction, so code cannot drift from tokens by hand-typing.
6. Pin the version in `package.json` (format is `alpha`; expect breaking changes) and add one test fixture so a breaking change is caught.
Risk: alpha format; a Google-shaped schema bakes in `primary` as a mandatory-ish concept (`missing-primary` warns), which nudges every brand toward one primary colour. Override via `omitted` and note it.

### 2. Dembrandt
1. `npm i -D dembrandt@<pin>` then `npx dembrandt install-browser` (separate Chromium; Node 18+; default viewport 1920x1080, `--mobile` 390x844).
2. Calibration run: take the 38 URLs in `knowledge/web/teardowns.md` plus ~60 more from galleries; `dembrandt <url> --json-only --save-output` into `corpus/dembrandt/` (gitignored). Write `tools/calibrate.mjs` to report medians and percentiles for radius count, font count, spacing base, shadow count, motion durations, then compare to `tools/thresholds.json`. Tune thresholds with those percentiles, citing the run date.
3. Gate on our own work: after a build, `dembrandt file://… --design-md` (or `--json-only`) and diff against the DIRECTION front matter with `design.md diff`; or save a baseline with `--approve` then `--compare` on later edits. Exit 1 = rendered tokens drifted from intent.
4. Optionally expose its MCP server (`get_design_tokens`, `compute_drift`) to the Claude session.
Risks: scraping third-party sites (respect robots/ToS, low volume); extraction reflects computed values not intent; dark mode needs `--dark-mode`; canvas/WebGL sites fail; a "learn from these sites" corpus feeds the centroid problem if used as targets instead of measurements.

### 3. UI-Bench
1. Find the prompt set from the paper's page (arXiv 2508.20410 lists it as released; the repo URL was not located in this research, so check the paper's links/uibench.ai "About").
2. Store prompts as `evals/ext-uibench/prompts.json` with provenance; do not edit them (same rule as `evals/prompts.json`).
3. Run the pipeline per prompt (`eval-t<k>-uib-<id>`), then judge pairwise: our build vs a stored screenshot from a baseline (Claude Artifacts, v0 or Lovable output generated once by a founder) in random order. Record votes in `ledger/` (extend `ledger.mjs add` with `--vs <ref>`).
4. `score.mjs`: add a 20-line Elo (K=24) over the votes so progress is a rating with a confidence band, not a sum of warnings.
5. Founders judge blind (strip tool names); at least 3 raters on 10 prompts before drawing conclusions.
Risk: 30 prompts is small; SaaS marketing is not all of UI-Bench; leaderboard rank 2 Figma Make and rank 3 Lovable are not necessarily "non-AI-looking", only expert-preferred.

### 4. StyleSeed experiment + checks
1. Read `BENCH-V1` in the repo (judge, briefs) before trusting the +5.3 / -3.7 numbers.
2. Replicate the structure on our eval set: condition A = knowledge + rules only (no `check.mjs`), condition B = full pipeline with gate. Score both with the same founder rubric. Our `evals/prompts.json` has 10 briefs, so 20 cells.
3. Add checks (all computed-style or DOM based): `ai.icon-chip-card` (card whose first child is a small rounded square with an icon and a pale tint), `ai.uniform-card-grid` (grid of >= 3 cards with identical size/radius/content shape), `colour.flat-black-bg` (background exactly #000 or text exactly #000), `type.off-scale` (sizes not in the DIRECTION scale), `tokens.hardcoded-hex` (see item 14).
4. Copy the idea of `resolve`: build a per-brief rule bundle from `system/rules/index.json` (type, page type, hero class) with a source hash, rather than loading 1,328 rules.

### 5. ui-craft-detect rule list
1. Read `scripts/detect.mjs` and its rule registry (MIT; do not paste code, reimplement). 
2. Candidate additions to `check.mjs`: `css.transition-all`, `a11y.outline-none-without-focus-style`, `copy.placeholder` (Lorem ipsum, TODO, "Your Company"), `motion.bounce-easing` (cubic-bezier overshoot or spring on non-playful briefs), `a11y.icon-only-button-no-label`, `ux.confirmshaming`, `layout.bento-overuse` (>= 6 cells of unequal size), `ai.star-ratings-on-testimonials`, `ai.accent-border-card`.
3. Mirror its split between a deterministic score and a judged score in `report.json` (`craftScore` vs `critiqueScore`), never blend them.
4. Add its "10-item acceptance bar" idea as the DIRECTION.md checklist the model must tick before running `check.mjs`.

### 6. plugin87 gates
1. Port, in this order: (a) contrast in each state: hover, focus, active, disabled via Playwright `hover()`/`focus()` on every interactive element then recompute contrast; (b) emulate `reducedMotion: 'reduce'` and assert zero running non-essential animations (`document.getAnimations()`); (c) overflow at 280 px and 320 px; (d) keyboard walk: Tab through the page, assert visible focus indicator size/contrast and no traps; (e) WCAG 2.2 target size 24 px with spacing exception.
2. Create `tests/fixtures/bad/*.html` (known-bad: tiny text, low contrast, overflow, purple-gradient hero, icon-chip grid) and a `npm test` that asserts `check.mjs` FAILS or WARNS on each. A checker with no failing fixtures is unverified.
3. Adopt `REQUIRE_BROWSER=1`: if Playwright cannot launch, exit 2, never 0.

### 7. oil-ui distinctness + squint test
1. In `deal.mjs`, define four trait axes: layout archetype, type voice, palette temperature/hue, hero class/visual. Reject any candidate set where two directions share more than one trait; also compare against the last 8 ledger entries.
2. In `ledger.mjs similar`, add a thumbnail-luminance distance: screenshot -> `sharp` resize to 32x20 greyscale -> blur -> L2 distance between pages; flag < threshold (tune on accepted vs rejected pairs).
3. Add `tools/compare.mjs` that writes a single HTML page with three candidates side by side, desktop/mobile toggle, and a "copy choice" button producing `choice: <name> because ...`.

### 8. shadcn registry for proven sections
1. Only after a founder-accepted ledger entry: extract the section into `registry/<section>/` and describe it in `registry.json` / `registry-item.json` (schema at ui.shadcn.com/docs/registry/schema). Start from `shadcn-ui/registry-template` (no licence listed; copy structure only).
2. Use a namespaced private registry in client `components.json` (`"@larpo": "https://…/{name}.json"`), keeping sections token-driven (`bg-background`, not hex) so each project's DIRECTION re-skins them.
3. Diversity guard: a section is only addable if its structural fingerprint differs from the last 8 uses (reuse the `ledger similar` code). A registry that is used blindly recreates the template problem; the dealer must still choose.
Risk: building a library of "accepted" sections can itself become the new template. Cap reuse per section per N projects.

### 9. Project Wallace `css-analyzer`
1. `npm i -D @projectwallace/css-analyzer@<pin>` (MIT). In `check.mjs`, collect all stylesheet text via `page.evaluate` (`document.styleSheets` rules and `<style>`), run `analyze(css)`.
2. Report: unique colours (and `uniquenessRatio`), unique font sizes, unique radii, unique shadows, z-index count and max, `!important` share, custom properties defined vs used, selector complexity. Add thresholds to `thresholds.json` (e.g. unique colours <= 24, z-index max <= 1000, `!important` <= 1%).
3. Optionally `@projectwallace/css-code-quality` (MIT) for a 0-100 maintainability number in the report.
Note: it analyses shipped CSS; Tailwind output is atomic so "selector" metrics mean less; the value-uniqueness metrics still apply.

### 10. design-dna colour measurement
1. Read `scripts/measure-colors.mjs` and `verify.mjs` (MIT). Reimplement in `tools/palette.mjs` using `sharp` raw pixels + k-means + CIEDE2000 merge (color.js is MIT and has deltaE).
2. Check A: dominant colours in the fold screenshot (coverage-weighted) vs the DIRECTION palette; FAIL if dE > ~6 for primary/ground (tune), WARN on extra dominant hues outside the palette.
3. Check B: for text over images/gradients, sample the screenshot pixels behind each text box (bbox expanded 2 px), compute worst-case contrast within the box. This closes the documented gap in `check.mjs` ("text on gradients/images not measured").

### 11. Brand DESIGN.md corpora
1. Clone `VoltAgent/awesome-design-md` (MIT) into `corpus/design-md/` (gitignored). Write `tools/centroid.mjs`: parse front matter/colour lists, compute font-family frequencies, hue histogram, radius and spacing medians.
2. Output `system/market-centroid.json`. In `deal.mjs`, penalise directions whose features are all within the modal bins (e.g. grotesk + 8 px radius + blue-ish primary). This operationalises the "do not be the median" principle with data.
3. Do the same with `nexu-io/open-design/design-systems/` (151) and optionally the 138 in plugin87 to compare overlap.
Risks: files are extracted from public CSS and carry a no-ownership disclaimer; trademark and brand-likeness issues if anyone builds "in the style of Stripe"; quality of extraction unknown; star counts are not a quality signal.

### 12. hotgaze (optional)
1. In a venv: `pip install hotgaze==0.1.1` (MIT; fast backend needs no downloads, deep backend downloads ~30 MB UNISAL weights on first use; read the third-party licence file first).
2. After `check.mjs`, run it on `desktop-fold.png`; log region share JSON into `report.json`. Rule: the largest region's share should be at least ~1.5x the second (tune), else WARN "no dominant element".
3. Use compare mode for hero A/B and for "did the nav or a floating card steal attention".
Risk: alpha; heuristic priors; correlates with visibility not conversion (its own docs); do not gate on it.

### 13. Lighthouse / DevTools MCP
1. `npx lighthouse <url> --output=json --only-categories=performance,seo,best-practices --chrome-flags="--headless"` or the `lighthouse_audit` tool of chrome-devtools-mcp already available in this environment.
2. Record LCP, CLS, TBT, total byte weight, image sizing warnings, console errors and failed requests into `report.json`. Thresholds: CLS <= 0.1, LCP <= 2.5 s on throttled mobile (web.dev values), 0 console errors, 0 failed image requests.
3. The "verifier" step from Claude Design: assert every `<img>` decodes (`naturalWidth > 0`).

### 14. Token-adherence lint
1. For Next.js builds: `eslint-plugin-better-tailwindcss` (unknown classes, conflicts) and `oxlint-tailwindcss` rules `no-hardcoded-colors` / `prefer-theme-tokens` if the toolchain allows; else a 30-line script that greps class strings for `#`, `rgb(`, `[#` and `text-[` with a colour.
2. For plain HTML/CSS: Mozilla's `use-design-tokens` rule family shows the pattern (allow `var(--x, fallback)`, allow `inherit/currentColor`); implement the same via Stylelint `declaration-property-value-allowed-list` or a custom rule.
3. Metric reported: `tokens.adherence = colour declarations using var(--*) / all colour declarations`; WARN below 0.9 in product UI, informational on hero experiments.
Verify each plugin's current Tailwind v4 support before adopting; sources disagree.

### 15. UXBench repair lift
1. In a scratch uv env: `uv sync && uv run playwright install`; read `uxagent/` first; run `uv run uxagent audit-url --url file://…/index.html --source-dir …` on one bundled fixture to see the output.
2. Protocol for our critique step: (a) judge writes a critique of `work/<n>` using the 7 dimensions; (b) a fixed repair agent applies it under invariants (content and brand preserved); (c) rerun `check.mjs` plus a blind founder pairwise; the metric is lift versus unrepaired. Do this once per quarter, not per build.
3. Keep fixtures local; do not send our client work to hosted models without a decision.

### 16-17. Process edits (no install)
- Critique step: three independent critics with different rubrics, pairwise ranking of two candidates rather than absolute 1-5, evidence per finding (selector + screenshot crop), reject inflated averages (open-design's own rule: mean above 8 is suspicious).
- Add to `CLAUDE.md` pipeline: interview-style question list for ambiguous briefs (max 5), escalating-variation axis in the dealer (conservative / expected / ambitious), verifier checks (broken images, console errors, failed requests).

### 18-20 Mining tasks
- ui-ux-pro-max: clone to scratch, export `styles.csv`, `ux-guidelines`, font pairings; diff against `system/fonts/` and `system/rules/index.json`; keep only items with a measurable check and a Why; discard the product-type palette mapping.
- Refero/Niblet/Mobbin: trial one for a week on a real brief; log for each retrieved reference whether it changed the direction; keep only if it adds non-median references.
- stitch-skills: `git clone --depth 1` to scratch and read `enhance-prompt`, `taste-design`, `design-md` SKILL.md; extract vocabulary only.

## 5. Candidate checks and rules surfaced (to feed `system/rules`)

Format per `SCHEMA.md`. All `[engine note]` until verified against the sources; each cites where the idea came from.

- **RULE** Colour declarations in product UI should resolve to tokens at >= 90%; raw hex/rgb in components is a defect. **Why** Raw values are how a design system silently forks (Lovable's adherence pass, Primer's agent guide, StyleSeed, Mozilla stylelint). **Applies to** product UI. **Check** `tokens.adherence` (section 4, item 14). **Source** Lovable docs; Mozilla stylelint docs; StyleSeed README.
- **RULE** Any two candidate directions share at most one of: layout archetype, type voice, palette temperature, hero visual. **Why** Prevents the "same grammar, different logo" failure at the proposal stage. **Applies to** all briefs. **Check** `deal.mjs` trait overlap. **Source** oil-ui README.
- **RULE** Verify measured palette against declared palette; do not trust model colour perception. **Why** A brand pink was perceived about dE 29 off; a measured rebuild scored dE 0.87. **Applies to** all. **Check** `tools/palette.mjs`. **Source** design-dna README.
- **RULE** A checker must have known-bad fixtures it fails. **Why** Gates that never fail on bad input are unverified; browser-less runs must not exit 0. **Applies to** tooling. **Check** `npm test` over `tests/fixtures/bad`. **Source** plugin87 README.
- **RULE** Keep the deterministic craft score and the judged critique score separate. **Why** Blind runs passed 14/14 gates and still got "rework" from the critic. **Applies to** reporting. **Check** two fields in `report.json`. **Source** ui-craft README; plugin87 `RESULTS.md`.
- **RULE** Limit container nesting to two levels in hero/marketing sections; reserve left-edge accent rules for one semantic role; no animated status dots; no default three-column feature grid directly under the hero. **Why** Community-reported Claude Design default fingerprints. **Applies to** landing page. **Check** DOM depth of nested bordered/filled containers; count of `border-left` accents; count of infinite animations on <= 12 px elements; grid with 3 equal columns as first block after the hero. **Source** awesome-claude-design (community report, weak evidence).
- **RULE** Headings use `text-wrap: balance` (or `pretty` for paragraphs). **Why** v0's prompt mandates it; cheap, mostly harmless. **Check** computed `text-wrap` on h1-h3. **Source** v0 leaked prompt (rule only).
- **RULE** Every list/table/chart shown in product UI demonstrates loading, empty, error and success states, with 5 to 10 sample rows. **Why** Prevents hero UI that proves nothing. **Check** visual + presence of state variants in source. **Source** bolt.diy prompt (mobile section).

## 6. Risks across the whole list

1. **Monoculture seeding.** Every shared "good alternatives" list becomes the next default (already shown in `anti-ai-slop.md`). The market-centroid and brand-DESIGN.md corpora are valuable only as *things to be far from*; never feed a corpus entry to the model as a target. Keep references in the triad specific and from outside SaaS where possible.
2. **Licence.** GPL-3.0 (`x1xhlol` prompts), AGPL-3.0 (`CL4R1T4S`, `cosscom/coss` default, Midday, Documenso, OpenStatus), EUPL-1.2 (`css-design-tokens`), LGPL-3.0 (Pa11y), NOASSERTION (PostHog site, Dub, `typeui`, WebDevJudge) mean: read, learn, reimplement; do not vendor. MIT/Apache-2.0 items are fine with attribution; keep `NOTICE` where Apache requires it. Brand DESIGN.md files describe other companies' identities and carry no ownership claim from the maintainers.
3. **Stale or alpha.** design.md is `alpha`; hotgaze v0.1; UXBench 4 stars; `serafimcloud/21st` last push 2025-05; `open-lovable` last push 2025-11; `cssstats` 2023; Radix Themes/Park UI quiet since April 2026. Pin versions and add smoke tests.
4. **Hype metrics.** Star counts above 100K for skill packs created within the last year are not a quality signal; two of them state no independent benchmark.
5. **Security.** Skills run with the agent's permissions; MCP servers can read your files; read-only by default is not guaranteed. Review `SKILL.md` and scripts; never install `npx` skill bundles blind; Dembrandt/brandmd drive a headless browser on arbitrary URLs.
6. **Overfitting to a judge.** A score of 80 (StyleSeed) or UICraftScore 0-100 is an indicator, not taste; the repo authors say so. Founder verdicts in the ledger remain the ground truth.

## 7. What not to do

- Do not adopt `ui-ux-pro-max-skill`'s product-type -> palette/style lookup, StyleSeed's brand skins or any "design intelligence" that picks a look for the model; that is the monoculture mechanism with a database.
- Do not install Pa11y (axe already covers it), Polypane (human-only), Wappalyzer forks (not a design measurement).
- Do not build a full Stitch/Figma Make integration; take formats and ideas.
- Do not use Magic UI / Aceternity-style effect libraries as defaults.

## 8. Open questions

- UI-Bench prompt repo URL and exact criteria; whether generated sites were later released.
- StyleSeed `BENCH-V1`: judge, briefs, models. Until read, treat the +5.3 / -3.7 numbers as unverified.
- `cosscom/coss` `LICENSING.md`: is `packages/ui` AGPL? Is the registry output MIT? Affects every client build.
- Whether Aceternity UI ships under MIT or a custom licence (not checked).
- Whether the `design.md` `components` property list (backgroundColor, textColor, typography, rounded, padding, size, height, width) is enough for our CTA and nav grammar, or needs extension via unknown-section preservation.
- Is the Trystan Sarrade "Claude Design system prompt" reconstruction (20 chapters, 14 skills, MIT) worth reading? Repo URL not located; skills.sh listing 404 on fetch.
- Supabase website app path inside the monorepo, and PostHog `LICENSE` text: confirm before citing as study sources.
- Orchids' leaked prompt (UI-Bench #1): not read.
