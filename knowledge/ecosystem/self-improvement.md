---
source: web:anthropic.com/engineering + platform.claude.com/docs + code.claude.com/docs + arxiv.org (see section 1)
chapter: making the engine learn and advance (self-improvement without fine-tuning)
topic_tags: [self-improvement, evals, ledger, retrieval, governance, monoculture, fine-tuning]
status: studied 2026-10-08
---

# How the design-engine learns and advances

Scope: the engine is knowledge + rules + tools + a verdict ledger wrapped around Claude. It is not a trained model. This note answers: what is the best-evidenced way to make such a system measurably better over time, and what should be built here, in what order.

Reliability legend used throughout:
- **A** Anthropic primary doc/post, page read this session.
- **B** paper, abstract (and sometimes summary) read this session; results are the authors' own, not independently replicated.
- **C** secondary summary or search snippet only; do not rely on the number.
- **E** `[engine note]` my inference from the sources plus this repo's state; tune with ledger feedback.

State of the repo at time of writing (checked, not assumed): 1,328 rules in `system/rules/index.json` (about 65k tokens of text; 970 flagged checkable; 1,249 `kind: source`, 43 `engine`, 36 `opinion`; 181 rules have an empty `applies`); `ledger/entries/` is empty (no founder verdict recorded yet); `evals/prompts.json` has 10 briefs; `tools/score.mjs` totals check.mjs fails/warns/AI-tell warns only; `tools/ledger.mjs` stores a binary verdict plus free-text `why`; no rule has a status, strength, confidence or conflict link.

---

## 1. Source digest

### 1.1 Anthropic: harnesses, context, memory, evals

| # | Source (URL) | Claim relevant to us | Rel. |
|---|---|---|---|
| 1 | [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) (Rajasekaran) | Generator + separate evaluator (GAN-inspired) for frontend design. Four criteria given to both agents: design quality, originality, craft, functionality; design quality and originality weighted higher because Claude already does craft/function well. Evaluator uses Playwright against the live page, scores each criterion, writes critique; 5 to 15 iterations, runs up to 4 hours. Evaluator calibrated with few-shot examples with detailed score breakdowns to reduce score drift. Out of the box Claude was a poor QA agent: found real issues then talked itself into approving. Tuning took several rounds of reading evaluator logs. Wording matters: "museum quality" pushed designs toward one look; scores plateaued with headroom; author sometimes preferred a middle iteration. Even iteration 1 beat the no-prompt baseline (criteria wording alone moved the model off defaults). Cost: app build solo 20 min / $9 vs full harness 6 h / $200 (over 20x). Remove harness components one at a time to find which are load-bearing; evaluator is worth its cost only when the task is beyond what the model does reliably solo. Evidence is the author's own taste, not a measured benchmark. | A |
| 2 | [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Evaluator-optimizer fits when (1) human feedback demonstrably improves output and (2) the LLM can give that feedback; needs clear criteria. Start with the simplest thing (a single call with retrieval and in-context examples is often enough). | A |
| 3 | [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Structured, JSON feature list with `passes` flag that agents may only flip (models overwrite Markdown more readily than JSON); progress file + git as cross-session memory; one feature at a time; agents mark things done without end-to-end tests unless forced to use browser automation. | A |
| 4 | [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Context rot: recall degrades as context fills. Just-in-time retrieval (keep references, load on demand); hybrid (CLAUDE.md up front, grep/glob later); compaction; structured note-taking; subagents return 1,000-2,000 token summaries. | A |
| 5 | [Memory tool docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) | Client-side `/memories` directory, Claude views it first, writes lessons back; pair with compaction; cap file sizes and expire stale memory; validate paths. Multisession pattern: initializer + progress log + feature checklist; mark complete only after end-to-end verification. | A |
| 6 | [Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) | Orchestrator-worker beat single agent by 90.2% on an internal eval, ~15x tokens; token spend explained ~80% of variance on BrowseComp; poor fit for tasks with shared context and many dependencies (most coding). Start evals with ~20 real queries: large effects show in small sets. One LLM-judge call with a 0-1 score and pass/fail was most consistent; humans still needed for edge cases. | A |
| 7 | [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Capability evals (low pass rate, room to grow) vs regression evals (~100%); promote saturated capability evals to regression. Grader types: code (cheap, brittle), model (flexible, needs calibration to humans), human (calibrate model graders). pass@k vs pass^k (75% per trial = ~42% pass^3). Start with 20-50 tasks from real failures; read transcripts; balanced positive/negative cases; grade outcomes not step order; separate judge per dimension; allow "unknown". | A |
| 8 | [Plugin evals](https://code.claude.com/docs/en/plugin-evals) | `claude plugin eval` (needs Claude Code v2.1.269+): `evals/<case>/prompt.md` + graders (`regex`, `tool_used`, `tool_order`, `file_exists`, `llm`, `baseline`); 3 runs per case by default; every case also runs with NO plugin, giving WITH, W/OUT and delta; `--threshold` and exit code gate CI; `--json`, HTML report; pin both models for comparable scores; "if a case scores 1.0 both with and without, the plugin isn't what made it pass"; use regex for long outputs, `llm` graders only for short outputs with concrete PASS/FAIL rubric; judge can mis-grade formatting. No custom-code graders. Costs real model calls. | A |
| 9 | [Claude Code skills docs](https://code.claude.com/docs/en/skills) | `skill-creator` plugin: with/without-skill benchmark, blind A/B between two skill versions, description tuning (should/should-not-trigger hit rates). `/skill-doctor` (v2.1.252+): reports context cost and usage per skill, flags never-invoked skills; it audits skills, not rules. Description + `when_to_use` truncated at 1,536 chars. After compaction only the first 5,000 tokens of each invoked skill are re-attached, 25,000 combined. `context: fork` runs a skill in a clean subagent. (Last ~6k chars of page unread.) | A |
| 10 | [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) and [Agent Skills engineering post](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) | Concise; description says what + when, third person; SKILL.md body under 500 lines; references one level deep; TOC on files over 100 lines; scripts executed not read; evaluation-first (find gaps without the skill, 3 scenarios, baseline, minimal instructions, iterate); Claude-A writes, Claude-B tests; test on Haiku/Sonnet/Opus; avoid time-sensitive text; give a default, not a menu; feedback loops (validator, fix, repeat). Anthropic's stated long-term plan: agents create, edit and evaluate their own skills. | A |
| 11 | [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills) | Names the problem "distributional convergence": safe design choices dominate web training data (Inter, purple gradients, minimal motion). Skill guides typography, colour, motion, backgrounds; ~400 tokens; loads on demand. Advice: target axes with concrete alternatives, name defaults to avoid, add a closing reminder to vary, because the model converges on NEW defaults (the post cites Space Grotesk). Evidence is hand-picked side-by-sides, no metrics; convergence not eliminated. | A |
| 12 | [Prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Prefix order tools, system, messages; up to 4 breakpoints plus automatic mode; 5 min default TTL, 1 h at 2x write; reads 0.1x (0.05x on Sonnet 5.5/Opus 5.5); minimum cacheable 512 to 4,096 tokens by model; put the breakpoint on the last block identical across requests; any change earlier in the prefix invalidates later cache; warm cache before parallel calls. | A |
| 13 | [Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) | Under ~200k tokens: put the whole knowledge base in the prompt (with caching), no RAG. Otherwise: contextual embeddings cut failed retrievals 35% (5.7% to 3.7%), plus contextual BM25 49%, plus reranking 67% (to 1.9%). Retrieve ~150, rerank, keep 20; 20 beat 10 and 5; too many chunks distract. | A |
| 14 | [Tool search tool docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) | Tool selection accuracy degrades past 30-50 tools; regex and BM25 variants are the built-in search; custom embeddings optional; keep 3-5 most-used tools always loaded; consistent name prefixes help one search match a group. Direct analogue for 1,300 rules. | A |
| 15 | [Subagents docs](https://code.claude.com/docs/en/sub-agents) | Own context window, only summary returns; `skills:` preloads full skill content; `memory:` gives a persistent directory (first 200 lines / 25KB of MEMORY.md injected); per-agent `model:`; subagents suit self-contained work with verbose output, main thread suits iterative refinement. | A |

### 1.2 Optimisation without fine-tuning: papers

| # | Source | Claim | Evidence type | Rel. |
|---|---|---|---|---|
| 16 | [GEPA, arXiv 2507.19457](https://arxiv.org/abs/2507.19457) (ICLR 2026 oral) | Reflective prompt evolution with a Pareto frontier of candidates beats GRPO by ~6% average (up to 20%) with up to 35x fewer rollouts; beats MIPROv2 by over 10%. v1 claimed 10% average; the gap shrank between versions. | QA, instruction following, retrieval, math; no creative/visual task | B |
| 17 | [OPRO, arXiv 2309.03409](https://arxiv.org/abs/2309.03409) | LLM-as-optimizer over scored prior prompts; up to +8% GSM8K, up to +50% BBH vs human prompts (maximum, not typical). | Reasoning benchmarks | B |
| 18 | [TextGrad, arXiv 2406.07496](https://arxiv.org/abs/2406.07496) | Textual "gradients" from LLM feedback: GPQA 51% to 55%, ~20% relative on LeetCode-Hard. | Verifiable tasks | B |
| 19 | [Self-Refine, arXiv 2303.17651](https://arxiv.org/abs/2303.17651) | Same model generates, critiques, refines; ~20% absolute average gain over 7 tasks. | Mostly text tasks with GPT-3.5/4 | B |
| 20 | [Large Language Models Cannot Self-Correct Reasoning Yet, arXiv 2310.01798](https://arxiv.org/abs/2310.01798) | Without external feedback models struggle to self-correct and sometimes get worse. Counterweight to #19: the critic needs an outside signal (renderer, checker, human). | Reasoning | B |
| 21 | [Reflexion, arXiv 2303.11366](https://arxiv.org/abs/2303.11366) | Verbal reflections stored in an episodic buffer; 91% HumanEval pass@1 vs GPT-4 80% at the time. | Coding, decision tasks; no visual/aesthetic eval found | B |
| 22 | [Voyager, arXiv 2305.16291](https://arxiv.org/abs/2305.16291) | Growing library of executable skills + automatic curriculum + feedback loop compounds ability and reduces forgetting. Works because Minecraft gives an automatic success signal. | Embodied game | B |
| 23 | [ACE: Agentic Context Engineering, arXiv 2510.04618](https://arxiv.org/abs/2510.04618) (ICLR 2026) | Treat context as an evolving playbook updated by generation, reflection, curation with structured incremental (delta) updates. Names two failure modes of rewriting: brevity bias (drops domain insight) and context collapse (iterative rewriting erodes detail). +10.6% agent benchmarks, +8.6% finance. | Agent/finance; no design task | B |
| 24 | [SkillOpt, arXiv 2605.23904](https://arxiv.org/abs/2605.23904) | Treat a SKILL document as trainable state for a frozen agent; optimizer proposes bounded add/delete/replace edits from scored rollouts; an edit is kept only if it strictly improves a held-out validation score; rejected-edit buffer; no inference-time cost. Reports best/tied on 52 cells across 3 harnesses incl. Claude Code; e.g. +19.1 points inside Claude Code (GPT-5.5). Self-reported. | Six benchmarks with scorable answers | B |
| 25 | [GRASP, arXiv 2605.29668](https://arxiv.org/abs/2605.29668) | Gated, regression-aware skill proposer: keep a candidate skill only on net gain on a balanced held-out probe AND within a hard regression budget. Ablation: "skill writing alone, without validation, performed no better than using no skills". Gains need recurring tasks with verifiable structure; no gain when the action space is open-ended. | FHIR clinical-procedure benchmarks | B |
| 26 | [Demystifying Agent Skills, arXiv 2608.14036](https://arxiv.org/abs/2608.14036) | Skills mostly stabilise action through "procedural anchoring" rather than supply facts; retrieval is a separate bottleneck: actual-use precision falls from 29.6% to 3.3% as the pool grows from 5 to 100. Abstract only read. | Agent benchmarks | B |
| 27 | [IFScale, arXiv 2507.11538](https://arxiv.org/abs/2507.11538) (via search results) | Instruction-following accuracy falls with instruction density; best frontier models ~68% at 500 simultaneous instructions; three decay shapes (threshold, linear, exponential; a Claude Sonnet 4 variant was linear); bias toward earlier instructions. Task is keyword inclusion, not design. | Synthetic | B/C |

### 1.3 Evidence specific to UI / visual output

| # | Source | Claim | Rel. |
|---|---|---|---|
| 28 | [Vision-Guided Iterative Refinement for Frontend Code Generation, arXiv 2604.05839](https://arxiv.org/abs/2604.05839) | A VLM critic that sees the rendered page and returns structured feedback gave up to +17.8% over three refinement cycles on WebDev Arena prompts. A LoRA-tuned generator captured only 25% of the critic-loop gain. Closest hard evidence that render, look, critique, revise works. Abstract only; the search summary adds that multimodal critique mainly improved visual design and had trade-offs in code quality. | B |
| 29 | [WebDevJudge, arXiv 2510.18560](https://arxiv.org/abs/2510.18560) | LLM judges show "a significant gap" to human experts on web-dev quality (functional equivalence, feasibility, bias). Search summary: best judge 70.34% pairwise agreement; human rubric protocol over 80%; ties (holistic function + aesthetics) hardest. The 70.34% figure was not verified in the paper itself. | B, number C |
| 30 | [WebDev Arena / Code Arena](https://news.lmarena.ai/webdev-arena) (via search) | Pairwise human votes ranked with Bradley-Terry; 80k+ votes by 2025. Template for how to turn cheap A/B judgments into a ranking. | C |
| 31 | [Artificial Hivemind, arXiv 2510.22954](https://arxiv.org/abs/2510.22954) | Open-ended generation shows intra-model repetition and inter-model homogeneity; LLMs, reward models and LM judges are less calibrated to humans exactly where annotators disagree (taste). | B |
| 32 | [Interrogating Design Homogenization in Web Vibe Coding, arXiv 2603.13036](https://arxiv.org/abs/2603.13036) | Frictionless generation worsens design homogenisation across the lifecycle; proposes "productive friction" (steps that make creators question defaults). Abstract only; qualitative case studies. | B |
| 33 | [UICoder, Apple](https://machinelearning.apple.com/research/uicoder) | Iterated fine-tuning of open LLMs on self-generated UI code filtered by compiler and multimodal models; beats downloadable baselines, approaches larger proprietary models. Page gives no dataset size, compute or scores. | B |
| 34 | WebCode2M / WebSight (via search: [arXiv 2404.06369](https://arxiv.org/pdf/2404.06369)) | 2.56M real-page screenshot/code pairs (WebCode2M); WebSight ~0.8M synthetic (v0.2 uses Tailwind). Other strong UI-to-code open models used full pre-training + SFT + RL, not LoRA. No source found comparing a LoRA to a prompted frontier model on Tailwind/React. | C |
| 35 | Claude fine-tuning status (search results: [Anthropic 2024](https://www.anthropic.com/news/fine-tune-claude-3-haiku-ga), AWS Bedrock posts) | Historically only Claude 3 Haiku on Bedrock (US West); two 2026-dated third-party pages disagree on whether it is still offered. I found no source showing any current Claude model is fine-tunable. Verify in the Bedrock console before assuming. | C |

Not found / not verified: any controlled study of GEPA/DSPy/TextGrad/OPRO-style text optimisation on aesthetic quality; any study of LLM judges rewarding homogeneous websites; DSPy/MIPROv2 papers were not fetched this session (treat DSPy as "same family as GEPA, tooling not evidence"). `claude plugin eval` English page was read in full; the only skill-doctor documentation is the short section in the skills docs (#9); the "skill-doctor" plugin by joaquincampo found in search is third-party and unrelated to the built-in command.

### 1.4 What the evidence adds up to

1. The strongest, replicated pattern for visual output is **render, look with a separate critic, revise a few times** (#1, #28). Gains are real but moderate (low double digits), bounded by headroom, and cost multiples of a single pass.
2. The strongest pattern for improving the **instructions themselves** is **propose small edits, keep only those that win on a held-out set, with a regression budget** (#24, #25, #23). Un-gated self-written guidance is not better than none (#25).
3. All text-optimiser results (GEPA, OPRO, TextGrad, SkillOpt, ACE, Reflexion) come from tasks with an automatic score. None is shown on taste. Our automatic scores (check.mjs, diversity, rule-recall) cover craft and sameness; taste only comes from the founders.
4. More guidance is not monotonically better: instruction-following degrades with density (#27), tool/skill selection degrades with pool size (#14, #26), and Anthropic's own best-known design skill is ~400 tokens (#11).
5. Models and judges regress toward the median look (#11, #31, #32). Any loop that rewards "looks good to a model" or "looked good last time" will drift toward a single default.

---

## 2. Architecture recommendation

Design stance: **the unit of learning is a gated, reviewable edit to a rule, a check, a threshold, a dealer axis or a pipeline instruction, justified by ledger evidence and proven by an eval run. Nothing learns silently.** Three loops at three speeds:

- **Per brief (minutes):** select rules, build, render, measure, separate critic, revise 2 to 3 times, deliver.
- **Per verdict (days):** founder accept/reject becomes structured ledger data; a proposal for a rule change is drafted and waits for approval.
- **Per release (weeks, and on every Claude model change):** full eval, brain version bump, changelog.

### 2.1 Build order (priority, effort, expected payoff)

Effort: S = under a day, M = 1 to 3 days, L = a week or more. Payoff is judged against the stated goal, measurable improvement.

| P | What | Effort | Payoff | Why this order |
|---|---|---|---|---|
| 1 | **Ledger v2 schema + seed it** (2.4). Record brain version, model, rule IDs shown, structured reason codes, reviewer, pairwise field. Backfill the Larpo feedback ledger noted in HOWTO section 5. | S | Very high | Everything else needs data. The ledger is empty today. Costs almost nothing, and unstructured early verdicts are expensive to re-code later. |
| 2 | **Brain version stamp**: `system/BRAIN_VERSION`, `knowledge/CHANGELOG.md`, and every `report.json` records brain version, git hash, rule-index hash, model id, cost. | S | High | Makes any improvement claim testable and any regression attributable. |
| 3 | **Rule metadata + decided-defaults layer** (2.3, 2.6). Add `status`, `strength`, `confidence`, `tier`, `topic_key`, `supersedes`, `conflicts_with`, `page_types`, `reviewed`. Resolve the known conflicts. | M | High | Without this, selection and conflict resolution have nothing to work with; also fixes the HOWTO's first known limit. Do the top 150 most-hit rules first, not all 1,328. |
| 4 | **Rule selector** `tools/select_rules.py` (2.2). Output `work/<name>/RULES.md` with 20 to 50 rules, log the IDs. | M | High | Directly addresses attention dilution (#14, #26, #27) and creates the data for rule-level attribution. |
| 5 | **Eval v2 + gate** (2.5): regression suite from rejects, blind pairwise A/B against previous brain, diversity metric, cost logging, baseline arm (bare Claude). | M to L | Very high | This is what turns "feels better" into "measurably better". Anthropic's own guidance: evals first (#7, #10). |
| 6 | **Verdict-to-rule proposals** `tools/propose.mjs` + `proposals.mjs` (2.4). Human approval, branch, gate. | M | High, compounding | Closes the learning loop, but only worth building once 1, 2, 5 exist or the proposals cannot be validated. |
| 7 | **Separate critic pass** (generator-evaluator) for heroes and sections, 2 to 3 cycles, as a subagent with fresh context, screenshots + DIRECTION + rubric only, calibrated on ledger screenshots (2.7). | M | Medium to high on visual quality; adds cost | Best evidence for visual gains (#1, #28), but only worth it after the eval can show it helps. Test it as a change under the gate, with the removal test from #1. |
| 8 | **Monoculture monitor** (2.8): rolling per-axis value share across the last 20 builds, dealer penalty for overused values, screenshot-distance similarity (already specified in `knowledge/web/anti-ai-slop-detector.md`). | S to M | High for the founder's core complaint | The ledger gate only compares the last 8 and only 8 fingerprint axes. |
| 9 | **Attribution report**: per rule shown / cited in DIRECTION / in accepted / in rejected; per reason code repeat-reject rate. | S after 4 | Medium (triage, not proof) | Finds dead and harmful rules. Do not auto-act on it with < 30 verdicts. |
| 10 | **Optional: automated optimisation (GEPA/SkillOpt style) of non-taste components** (2.9): the dealer, the critic rubric, check thresholds, DIRECTION-writing instructions. | L | Medium, only if 1 to 8 are in place | Needs a numeric objective and a held-out set; both come from 5. |
| 11 | **Fine-tuning** | n/a | Not recommended now (section 4) | |

Do 1 to 4 first as one bundle; it is about a week of work and unlocks the rest.

### 2.2 Rule selection mechanism (20 to 50 of 1,328 per brief)

Why select at all, since 65k tokens fit in a window: the constraint is attention, not capacity. Instruction adherence decays with density (#27), skill/tool selection degrades past tens of items (#14, #26), and rules in the middle of a long list get less weight. Selection is about making the 30 rules that matter loud. Anthropic's own rule of thumb is to skip RAG below ~200k tokens (#13), which is why the whole index stays available for just-in-time lookup, but the brief gets a curated slate.

**Flat index + keyword is enough for stage one, embeddings are a measured upgrade, not a default.** The corpus is small (1,328 items), has a 377-tag controlled vocabulary, `applies`, `section`, `kind`, and a domain-specific lexicon (hero, kerning, contrast, radius). BM25 over `text + why + tags + section` with tag boosts will retrieve these well. Add embeddings only if the recall eval below says so. If you add them, prefix each rule with its source/topic context before embedding (Contextual Retrieval: -35% failed retrievals, -49% combined with BM25, #13) and fuse with reciprocal rank, rather than replacing BM25.

Pipeline (all deterministic except the last step):

```
0  CORE (always on, ~25-40 rules, ~2-3k tokens, cached prefix)
     hard craft + accessibility + "never invent proof" + the divergence contract.
     status=decided, strength=hard.
1  FILTER   by page_types (normalise `applies`; 181 are empty today) and status != retired
2  SLOTS    from the one-line brief + page type, derive 6-10 topic slots
            (hero, nav, type, colour, spacing, CTA, proof, motion, copy, mobile, forms...)
3  RETRIEVE per slot: BM25 top 8 over text/why/tags/section, tag boost x2,
            cap each slot at 5 so big tags (colour 350, accessibility 317, contrast 308)
            cannot crowd out small ones
4  LEARNED  add every ledger-derived rule (negative rules first) whose tags overlap the slots;
            always shown, because they are the cheapest proven value
5  DEDUPE + RESOLVE  collapse near-duplicates (same topic_key / token-Jaccard > 0.6) to the
            highest-authority member; apply supersedes; if two rules still conflict, emit
            ONE "decision needed" line with both options and their conditions
6  RANK     score = bm25 x authority(tier, confidence, status) x slot weight
            keep top ~120
7  TRIM     Claude reads the ~120 one-line rules plus the brief and keeps 20-50, flagging any
            core rule it believes does not apply and why (pattern: retrieve ~150, rerank,
            keep ~20, #13)
8  EMIT     work/<name>/RULES.md (id, text, why, strength) + rules_shown.json; the build
            step may still call build_index.py query mid-build (just-in-time, #4)
```

Authority weighting (keep it to three levels, not a continuous score; there is no data to calibrate more):

| Tier | Meaning | Weight |
|---|---|---|
| T1 | Spec or measured evidence: WCAG, MDN/browser-compat, measured studies (Baymard, NN/g with numbers), platform docs | high |
| L | Ledger-derived: a founder said it about this kind of work | high for Larpo-style briefs; labelled per reviewer |
| T2 | Book or practitioner with a stated reason | medium |
| T3 | Opinion or taste | low; shown as an option |
| T4 | `[engine note]` | low until a ledger verdict confirms it |

**Recall test for the selector (build with it):** for each golden brief a human or a strong model labels the ~15 rules that clearly must apply. Metric = recall@50 of the selected slate. Target 90% or better. If BM25 + tags scores under 85%, add embeddings; if the slate is right but the output still ignores rules, the problem is adherence, not retrieval, and the fix is fewer rules plus a mechanical check, not a better retriever.

**Rule conflicts** (HOWTO already notes dialog entry scale 0.8 vs 0.9-0.95 and row density 40/48/56 vs 40/45/50). Resolution order, written into `knowledge/CONFLICTS.md` and applied by the selector:
1. Standards that gate access (WCAG, platform requirements) beat everything.
2. Repeated founder verdicts (L tier, 3 or more independent) beat sources.
3. Measured evidence beats authored opinion.
4. Specific context beats general ("dialog" beats "overlay"; "SaaS app UI" beats "all").
5. Newer reviewed source beats older only when the older is time-sensitive (browser support, library versions).
6. If still tied, keep both as options with conditions; do not average numbers. Record the chosen default and the reason in the changelog.

### 2.3 Rule status model: "decided default" vs "option"

Add to each rule (generated by `build_index.py` from front-matter or inline tags, never hand-edited in the JSON):

```
status:    decided | option | draft | retired
strength:  hard (fail if broken, no override without a stated reason) | default | taste
tier:      T1 | T2 | T3 | T4 | L
confidence: low | medium | high
topic_key: e.g. hero.headline.size            (rules that answer the same question share one)
supersedes / conflicts_with: [rule ids]
page_types: [hero, landing, pricing, form, app-ui, mobile]
reviewed:  2026-10-08                         (and a review_by date for time-sensitive rules)
```

A rule is a **decided default** when all hold: (a) it is a standard, or two or more independent sources agree, or three or more founder verdicts support it; (b) no unresolved conflicting rule on the same `topic_key` (or the conflict is resolved in `CONFLICTS.md`); (c) the conditions where it applies are stated; (d) it passed the eval gate when added. Everything else is an **option**: shown to the designer as a menu with conditions ("use X when the brand is Y"). Defaults are the floor; options are where divergence lives. This matches CLAUDE.md principle 1 (rules are defaults, overrides are written down) and Anthropic's authoring advice to give a default with an escape hatch rather than a menu of equals (#10).

Start by deciding the 150 most-retrieved topic keys. Leave the long tail as `option` or `draft`.

### 2.4 Ledger v2 and the verdict-to-rule workflow

**Ledger entry (extend `ledger.mjs add`, keep the founder's words verbatim):**

```json
{
  "id": "2026-10-12-acme-hero",
  "brain_version": "0.3.0", "model": "claude-sonnet-5-5", "git": "abc1234",
  "brief": "...", "page_type": "hero", "direction": {...}, "fingerprint": {...},
  "rules_shown": ["web.typography#41", "..."], "overrides": ["rule-id because ..."],
  "reviewer": "augustas",
  "verdict": "reject | accept | accept-with-changes",
  "quote": "same nav as last one",
  "reasons": [{"axis": "nav", "polarity": "neg", "severity": 1-3, "rule_ids": []}],
  "pairwise": {"vs": "2026-10-05-foo-hero", "winner": "this | other | tie", "blind": true},
  "cost_usd": null, "screenshots": ["..."]
}
```

Reason axes: `type, colour, layout, nav, cta, copy, motion, proof, density, brand-fit, derivative (looks like X), craft-bug, idea`. A fixed list matters: it is what lets "repeat-reject rate per axis" be computed later. The reviewer field matters because two founders will disagree; a rule backed by one person's taste is a `taste` rule for that person, not a default.

Prefer **pairwise** judgments when possible. They are faster and more consistent for humans than absolute ratings, and are how WebDev Arena builds rankings (#30). Protocol: after building, show the new output and the previous best for the same brief type blind; one tap for A, B, tie; fit Bradley-Terry or plain win-rate with a bootstrap interval. With under about 30 comparisons treat results as directional only.

**Workflow (propose only, human approves):**

```
founder verdict (ledger add)
   -> tools/propose.mjs <entry>             Claude reads: entry, report, DIRECTION, rules_shown,
                                            last 20 ledger entries, existing rules on those tags
   -> classifies the verdict:
        A. a NEW negative rule ("don't X in context Y")        -> draft rule
        B. an existing rule was shown and ignored/overridden   -> strengthen wording or make it a check
        C. an existing rule was followed and caused the reject -> flag rule for review (candidate to demote/retire)
        D. a threshold in thresholds.json is wrong             -> propose number + evidence
        E. client/brand-specific taste                         -> record, do NOT generalise
        F. a craft bug the checker missed                      -> propose a check.mjs assertion
   -> writes knowledge/proposals/pending/<id>.md   (RULE/Why/Applies/Check/Strength + evidence links + the delta it would make to selector output)
   -> human: node tools/proposals.mjs approve|edit|reject <id>
   -> approved: appended to knowledge/larpo/learned.md (tier L, status draft, strength taste),
                index rebuilt, CHANGELOG entry, new regression case created from the rejected build,
                eval gate runs on a branch (2.5), merge only on pass
```

Promotion ladder for ledger-derived rules, to prevent one bad afternoon becoming doctrine:
- draft/taste on creation (shown only when tags match);
- `default` after **3 independent verdicts** (different briefs, ideally 2 reviewers) agree, or a mechanical check confirms it;
- `hard` only for standards or checks that fail builds;
- review date 90 days out; a rule that has been contradicted by an accept is demoted automatically to "needs review" (not deleted).

Two design constraints taken from the papers: make edits **incremental deltas** to named rule blocks, never whole-file rewrites (ACE: context collapse and brevity bias, #23), and keep a **rejected-edit buffer** so the same bad proposal is not re-suggested (SkillOpt, #24). Keep proposal bodies short; the proposer must cite ledger entry IDs as evidence and may not cite itself.

### 2.5 Eval gating for changes to knowledge, system, tools or skills

What exists: 10 briefs, `check.mjs` fail/warn/AI-tell totals, a manual 8-axis rubric. Gaps: no baseline, no regressions suite, no variance estimate, no diversity measure, no blind preference, no versioning.

**Suites:**
1. **Craft suite** (the 10 briefs, grow to 20 to 30): cheap, mechanical, run on every class B/C/D change. Read as in #7: capability evals.
2. **Regression suite**: every founder reject becomes a case. Each case = the original brief + a grader that encodes why it was rejected: a `check.mjs` assertion where possible (nav height, font family, headline size band, banned phrase), otherwise a short rubric for a vision judge restricted to that one question ("does the nav match the pattern X? yes/no/unclear"). These start low and should reach ~100%; once saturated they guard against backsliding (#7).
3. **Diversity suite**: build the whole craft suite, compute pairwise axis-collapse across outputs. A brain that wins on craft by converging everything on one safe look must fail here. Add per-axis value share (any value above ~30% of the set is flagged).
4. **Selector recall suite** (2.2).
5. **Pairwise A/B**: for changes that alter taste (new direction vocabulary, new rules affecting layout/type/colour, critic rubric, model change), the founder gets blind pairs, new brain vs current tagged brain, on 6 to 8 briefs, ~10 minutes.
6. **Baseline arm**: run the same briefs with a bare Claude (no repo, just the brief) at least once per release. Report brain vs bare delta. If a suite scores the same with and without the brain, the brain is not what made it pass (#8). If you package the skill as a plugin, `claude plugin eval` gives this natively (WITH / W/OUT / delta, 3 runs, `--threshold`, `--json`, exit code for CI); note its limits (no custom-code graders; `llm` graders only for short outputs; its Skill-fired graders are excluded from the score). Otherwise add an `--ablation none|bare` mode to `score.mjs`. `/skill-doctor` is useful for one thing here: confirming the design-engine skill's description is not truncated or never firing; it does not evaluate rules.

**Change classes and gate:**

| Class | Examples | Required to merge |
|---|---|---|
| A | typos, notes, new reference material that is not indexed | none |
| B | add/modify/retire a rule; reclassify default/option | selector recall suite + regression suite unchanged or better; CONFLICTS updated; changelog |
| C | thresholds, check.mjs, dealer axes, SKILL/CLAUDE.md, critic rubric, selector logic | craft + regression + diversity suites, 3 runs; no flip of a regression case from pass to fail in 2 of 3 runs; craft totals not worse than baseline noise; diversity not worse; if taste-affecting, pairwise win-rate at least 50% over 6 or more comparisons |
| D | new Claude model, major harness change | everything in C + bare baseline + full pairwise; update pinned model |

Rules for the runs themselves: pin the model id in the report; run each case 3 times; measure noise by running the unchanged brain twice and use that spread as the "no change" band (do this once, store it); never edit a brief to flatter a run (already in `evals/prompts.json`); add briefs instead; read at least the failing transcripts/screenshots because grader bugs are common (#7). Small sets detect only large effects: Anthropic's own advice is to start with ~20 real cases and accept that (#6, #7). Do not claim a 3% improvement from 10 briefs.

**Merging:** proposals and rule edits land on a branch `learn/<date>`; the eval report is committed under `evals/results/<brain-version>.json`; the founder merges; the tag `brain-vX.Y.Z` is the unit referenced from ledger entries.

### 2.6 Versioning and changelog

- `system/BRAIN_VERSION` semver: patch = rule text/typo fixes, minor = rules added or defaults changed, major = pipeline or model change that invalidates old eval baselines.
- `knowledge/CHANGELOG.md`: one entry per merged change: what the brain now knows or does differently (CLAUDE.md already asks for this in commit messages), the ledger entries that motivated it, the eval delta.
- Never delete a rule; set `status: retired` with `retired_because` and keep the ID, so old ledger entries still resolve.
- Review dates: rules mentioning versions, browser support, library APIs or benchmarks get `review_by` (90 to 180 days). The skill best-practice is to keep time-sensitive facts in a clearly marked "old patterns" place rather than inline (#10); here that means `status: retired` rather than edited in place.

### 2.7 Generator-evaluator loop for UI (how to adopt #1 and #28 without overpaying)

- A `design-critic` subagent with a clean context: it receives screenshots (fold, full, mobile), DIRECTION.md, the report.json, and the rubric; it does NOT receive the generator's reasoning. A fresh context avoids anchoring and keeps verbose output out of the main thread (#4, #15).
- Rubric = Anthropic's four criteria mapped to this repo: design quality (coherence, focal point, rhythm), **originality** (use the diversity gate output and the last 8 ledger entries, weight highest, penalise defaults named in `anti-ai-slop`), craft (`check.mjs` numbers), functionality (states, mobile). Hard thresholds per criterion; failing any one sends the build back (#1).
- Calibrate the critic with 4 to 6 ledger screenshots with the founder's own verdict and scores as few-shot examples; re-calibrate whenever the ledger gains 10 entries. Measure critic agreement with founder verdicts (accept/reject) on the ledger. If agreement is not clearly above chance, the critic is a lint, not a judge; keep its output advisory.
- Cap at 2 to 3 cycles on a hero or section; do not run it on full pages by default. Cost can multiply by 20x (#1); the Anthropic data point is for full apps, so log your own `cost_usd` and decide.
- Different model for critic and generator where possible (self-preference and familiarity bias in judges, #31, plus #20: self-correction needs an external signal; here the render and the checker are the external signal).
- Test the loop as a class C change: with vs without critic on the craft + diversity suites and pairwise. Remove components one at a time if it does not pay (#1). Do not lock the critic's "taste" in permanently: Anthropic's own warning is that phrases like "museum quality" steer outputs toward one look.

### 2.8 Monoculture and drift controls

The founder's recurring failure (one grammar for every brand) is the thing both the literature (#11, #31, #32) and the ledger gate address, but the ecosystem layer adds a new risk: **the learning loop itself can seed a house default.** Accepts become "positive references", rules from accepts become defaults, the dealer's vocabulary shrinks, and the engine converges on one look that the founders happened to like first. Anthropic's own frontend-design post observed that naming a specific alternative font caused convergence on it (#11).

Controls:
1. **Never name a single replacement for a default.** Rules and the skill describe the axis and the options (catalogue/seeded dealer), not "use X instead of Inter". The font catalogue (134) plus `deal.mjs` seeds the choice.
2. **Rolling share per axis** over the last 20 builds (font family, nav grammar, headline band, radius system, accent hue bucket, CTA grammar, section order). Any value above ~30% gets a dealer penalty and a line in the report. Extend the ledger fingerprint with CTA grammar, nav grammar and section sequence; the current 8 axes do not cover the structural sameness described in CLAUDE.md.
3. **Accepts are a quality bar, not a template.** `DIRECTION.md` may cite an accepted entry for a principle, but the diversity gate still applies against it; add a rule that two consecutive builds may not share more than 3 axes with any accepted entry either (the gate already covers the last 8 including accepts; keep it that way).
4. **Productive friction (#32):** keep the mandatory reference triad, the divergence row and the override log. They are the friction that stops defaulting. Do not automate them away to speed things up.
5. **Skills-ecosystem seeding:** third-party design skills (including the frontend-design family) ship their own default look. Treat them as sources, not authorities: ingest as T3/options through the same pipeline, never as always-on instructions, and run the diversity suite after adding any. Check the repo's own `knowledge/ecosystem/` notes before loading one into a build.
6. **Drift detection:** (i) run the full eval on every Claude model change and on a monthly schedule with the model pinned, to separate "model drifted" from "brain changed"; (ii) compare today's output on the 10 frozen briefs against the stored fingerprints; (iii) watch the founder first-pass accept rate and repeat-reject rate (below); (iv) rules not shown for 90 days are listed as dead; rules shown but never cited as candidates to merge or retire.
7. **Ingestion stays human-curated.** Auto-crawling "what's trending" would import the median of the web, which is exactly the homogenisation source. New web sources enter via `ingestion-queue.md` and a studied note with provenance, as now.

### 2.9 Where automated optimisation is worth using

GEPA, DSPy-style optimisers, SkillOpt and ACE all need (1) a numeric objective, (2) a held-out set, (3) edits gated on improvement. We have those for: selector recall; critic-vs-founder agreement on the ledger; check.mjs pass rate subject to the diversity floor; the wording of DIRECTION-writing instructions measured by downstream reject rate. We do **not** have them for taste. Therefore: use an optimiser on the **plumbing** (selector weights, critic rubric wording, how the pipeline instructions are phrased) once the ledger holds roughly 50 or more labelled verdicts, with a held-out third, a regression budget (GRASP, #25) and human merge. Do not point it at "make the design better".

### 2.10 Context, caching and skill mechanics

- In Claude Code the harness handles caching; nothing to build. If a script calls the API (the critic, the proposer, a batch eval): put the static material first (core rules, decided defaults, rubric, few-shot ledger shots), the breakpoint on the last block identical across calls, the per-brief slate and brief after it; 1-hour TTL for eval batches; send the first request, wait, then fan out parallel ones (#12). Any change to the core block invalidates everything after it, which is another reason to keep the core small and change it rarely.
- Keep the always-loaded layer small: `CLAUDE.md` and the SKILL.md body well under 500 lines, with the pipeline essentials in the first 5,000 tokens because that is what survives compaction (#9). References one level deep from SKILL.md; TOC on any file over 100 lines (#10).
- Persistent learnings that are not rules (what worked in the last build, open questions) belong in `work/<name>/NOTES.md` or the memory pattern from #5 and #15, not in the rule index.
- JSON for machine-edited state (ledger, proposals status, feature-style checklists), Markdown for human-read knowledge (#3).

### 2.11 How to know it is improving (metrics, in order of trust)

1. **Founder first-pass accept rate**, rolling 10 builds (north star; slow, noisy, real).
2. **Repeat-reject rate**: the share of rejects whose reason axis was already the subject of an approved rule. If it is not falling, learned rules are not changing behaviour (selector, wording or adherence problem).
3. **Blind pairwise win-rate** of the current brain vs the previous tagged brain and vs bare Claude.
4. **Regression suite pass rate** (should sit near 100%) and **diversity score** (should not fall).
5. **check.mjs fail + warn + AI-tell totals** per brief: a hygiene metric only. Lower is not better design (HOWTO already says this); optimising it alone drives towards safe, boring output.
6. **Selector recall@50** and **cost per accepted build** (include critic cycles).

---

## 3. What will NOT work (and why)

1. **Learning taste automatically.** No paper in section 1 shows text optimisation improving aesthetics; they all use verifiable scores. GRASP shows the gain disappears when the action space is open-ended (#25). The founders' verdicts are the only taste signal; the system's job is to capture them cleanly and apply them consistently, not to extrapolate them.
2. **An LLM judge as the taste oracle.** Judges agree with human experts on web-dev quality only around 70% (secondary figure, #29), are least calibrated exactly where humans disagree about taste (#31), are lenient to LLM output and talk themselves into approving (#1), and cannot self-correct without an external signal (#20). Use them for mechanical questions and as a calibrated, advisory critic.
3. **Auto-merging rules from verdicts.** Un-gated guidance written by the model is no better than none (#25), and one-off reasons ("same nav as last one") generalise badly. Hence propose-then-approve with a promotion ladder.
4. **More rules = better.** Adherence drops with density (#27), selection precision drops as the pool grows (#26, #14). The real asset is the curated slate plus mechanical checks, not 1,328 items in context. Consider this when ingesting the next book: each batch must pass through dedupe and `topic_key` assignment, or it is net negative.
5. **Embeddings as a fix for rules being ignored.** Retrieval quality is not the failing step once recall@50 is high; if the model sees the rule and still breaks it, convert the rule into a `check.mjs` assertion or shorten and sharpen it.
6. **Statistics from tiny ledgers.** Per-rule win/lose statistics from a few dozen verdicts are anecdotes. The attribution report is for triage; do not auto-demote on it until there are at least ~30 verdicts touching the rule.
7. **Voyager-style growth of a code section library from accepts.** Voyager works because success is automatically verifiable (#22). Here success is a founder's mood. A library grown from accepts becomes a template shelf and a monoculture engine (section 2.8). Grow the section library only from builds that passed the diversity gate and were accepted by two reviewers, and keep each entry parameterised by tokens, not copied wholesale.
8. **Reflexion/Self-Refine alone.** Same-model self-critique helps on text tasks (#19, #21) but is the weak point for visual judgment (#20). It becomes useful only when the critic sees a render and a measurement.
9. **Chasing check.mjs scores.** Metric gaming leads to flat, safe layouts that pass everything. The 10-brief totals went from 2 fails to 0 after fixes while "a broken core idea the numbers did not catch" survived (HOWTO section 4).
10. **Assuming a prompt cache or bigger window removes the need for curation.** Caching makes a large static prefix cheap and fast (#12); it does not make the model attend to all of it equally.
11. **Embedding the founders' taste into one 'house style' prompt or tuned model.** It is the fastest route to the sameness the engine exists to prevent.
12. **Trend-scraping as 'always updating'.** Fresh is not the same as good, and scraped trends are the median of the web.
13. **Running the generator-evaluator loop everywhere.** Cost scales superlinearly (#1, #6); the evaluator pays off only when the task is beyond what the generator does reliably alone, which is true for heroes and signature sections, not for forms and tables.

---

## 4. Fine-tuning: honest assessment

**Fine-tuning Claude.** I could not find evidence that any current Claude model can be fine-tuned. The historical offer was Claude 3 Haiku on Amazon Bedrock (#35); two 2026-dated third-party pages disagree about whether even that remains. Check the Bedrock console before planning anything. Even if available, Haiku 3 would not be the model doing the design work.

**LoRA/fine-tune on an open model** (Qwen coder, etc.) for UI generation:
- *Data needs.* Published recipes use hundreds of thousands to millions of screenshot/code pairs (WebCode2M 2.56M, WebSight ~0.8M, #34) or large synthetic sets filtered by compiler and a multimodal judge (UICoder, #33). The engine has 0 verdicts. A few hundred accepted pages is nowhere near enough to teach anything but surface style.
- *What it can achieve.* In the one head-to-head I found, a LoRA-tuned generator captured about 25% of the gain a critic-in-the-loop frontier model achieves (#28). The stronger open UI-to-code models used full pre-training, SFT and RL (#34), not a LoRA.
- *Cost.* Compute for a LoRA on a 7B to 14B model is small (tens to low hundreds of dollars per run; engine estimate, one anecdotal source put a different Qwen2.5-Coder-14B pipeline at under $100 end-to-end). The real cost is curating data, building a trustworthy eval and re-doing it at each base-model change. The base moves faster than your tuned copy.
- *Where fine-tuning beats prompting:* latency or unit cost at high volume, on-device/offline use, strict output format adherence, a narrow stable style with thousands of clean examples. Of these, only volume cost could ever apply to the engine, and it is not a problem yet.
- *Where it loses:* anything that needs fresh references, per-brand divergence, or rules that change weekly. Weights cannot be edited with a diff and a changelog. A tuned model of "Larpo taste" narrows the output distribution, which is the opposite of the stated goal.
- *Useful narrow ML later:* a small reject-predictor (classifier or reward model over screenshot embeddings and fingerprints trained on the ledger) as a pre-filter before the founder sees something. Needs roughly 300 or more labelled verdicts with reasons and must be validated against held-out verdicts. It is a possible P11, not a replacement for rules.
- **Recommendation:** no fine-tuning now. Revisit when (a) the ledger has 500 or more pairwise-labelled verdicts, and (b) measured cost or latency per build is a real constraint, and (c) the prompted brain has plateaued on the pairwise metric despite changes in section 2.

---

## 5. Immediate next actions (first two weeks)

1. Extend `tools/ledger.mjs add` to the v2 schema; backfill any Larpo feedback; record the first 10 real verdicts with reason axes. (S)
2. Add `BRAIN_VERSION`, `CHANGELOG.md`, and stamping in `check.mjs`'s `report.json` (brain version, model, rule-index hash, cost). (S)
3. Add the rule metadata fields to `build_index.py` and hand-decide the top 150 topic keys including the two known conflicts; write `knowledge/CONFLICTS.md`. (M)
4. Write `tools/select_rules.py` with BM25 + tag filter + caps + conflict collapse; wire it into the pipeline step 2 of CLAUDE.md; log `rules_shown.json`. Build the recall set for 10 briefs. (M)
5. Run the unchanged brain twice on the 10 briefs plus once as bare Claude to establish the noise band and the baseline delta; store as `brain-v0.1.0` results. (S to M)
6. Only then build `propose.mjs`, the critic subagent, and the monoculture monitor, each as a gated change with its own before/after run.

## 6. Open questions

- Whether `claude plugin eval` can target a skills-directory plugin that depends on repo files (the engine's skill expects to run inside the repo); if not, keep the in-repo `score.mjs` and borrow its WITH/W-OUT/delta reporting design.
- How many reviewers there will be. The promotion ladder assumes at least two; if there is one founder, `L` rules should stay `taste`-strength by default and `default` promotion should require an explicit confirmation.
- Whether a Claude critic of a different model tier measurably disagrees less with the founders than the generator's own model; testable on the ledger once it has about 20 entries.
- The exact current text of the "Skill descriptions are cut short" section of the skills docs (last ~6k characters of that page unread) and the DSPy/MIPROv2 papers were not read.
- Cost per build/eval run is unmeasured in this repo; log `cost_usd` from the first run so the critic and eval budgets are set from data.
