---
source: web (arXiv papers, leaderboards, vendor docs), researched 2026-10-08
chapter: eval-and-benchmarks
topic_tags: [evals, vlm-judge, pairwise, bradley-terry, sameness, embeddings, visual-regression, preference-learning]
status: studied (digest + proposal; nothing in the proposal is built yet)
---

# Measuring and improving design quality automatically: ecosystem digest and upgrade proposal

Question this note answers: how can the engine tell, without a human in the loop every time, whether a change to `knowledge/`, `system/` or the skill made the output better, and how do founder verdicts make that signal sharper over time.

Reliability key used below: **A** = I read the paper or official page text via fetch (parts may be truncated). **B** = abstract, search snippet or secondary summary only; verify before relying. **C** = vendor or blog claim. Numbers marked `[engine guess]` are mine and untested.

## 0. Findings in one screen

1. **Pairwise beats pointwise.** Every serious source that compares them (MLLM-as-a-Judge, WebDevJudge, UI-Bench, Design Arena, LMArena) ends up on pairwise judgments plus Bradley-Terry or TrueSkill ranking. WebDevJudge measured pairwise at +8 points over single-answer grading on average. Our rubric-scored 1-5 human review is the weakest part of the current eval.
2. **VLM judges are decent, not human-level, on web design.** Best reported pairwise agreement with humans on web pairs: ~70% (WebDevJudge, GPT-4.1/Claude-4-Sonnet, functionality-heavy), 80.9% (OpenDesign, GPT-5, 200 pairs, large quality gaps), ~91% with checklists and multi-screenshot input (ArtifactsBench, model-level pairs). Human-human agreement is itself only 68.7% (OpenDesign), 84.6% (WebDevJudge experts), Krippendorff alpha 0.37 among designers (UIClip). Expect a Claude judge to be reliable on clear gaps and a coin flip on near-ties. So: use it in aggregate over many pairs, never to settle one pair.
3. **Position bias is real and not fixed by instructions.** Swap-consistency of 84-90% for strong judges (WebDevJudge); Claude-v1 was 23.8% in the original MT-Bench study (old model). Mitigation that works: run both orders, count only agreeing verdicts, treat conflicts as ties.
4. **Visual manipulations inflate judge scores** (brightness, overlays, beauty filters; EMNLP 2025). Never annotate the screenshots we show the judge, and watch for "more decoration wins".
5. **All our outputs are Claude outputs, and our judge would be Claude.** Self-preference bias in MLLM judges is documented. Mitigate with a held-out human-designed anchor set, an A/A test, and an occasional cross-family judge.
6. **Learned aesthetic models do not transfer.** LAION/NIMA-type predictors are trained on photos and generated art. UIClip is the only UI-specific one; it is a 150M CLIP-B/32 model, 75% on its own pair test, checkpoints exist on Hugging Face (`biglab`), license not shown. Useful as a cheap second opinion after validating on our ledger; not a primary signal.
7. **"Same skeleton" is not a perceptual-hash problem.** pHash/dHash thresholds (5-10 bits of 64) exist for near-duplicate images (resize, compression). Two SaaS pages with the same skeleton but different colours, fonts and copy are far apart in pixel space. Use layout-abstracted signals (DOM box raster, blurred grayscale) plus CLIP/SigLIP embeddings calibrated against a reference distribution. Nobody has published this exact measurement for LLM-generated sites (the 2026 "design homogenization" paper is conceptual).
8. **Founder verdicts become useful in stages.** Under ~10: retrieval only. ~30-50: validate and tune the judge (agreement CI about +-13 points). ~100: fit rubric-axis weights. ~200-300+: a small embedding reward model. Best way to speed this up is to collect **pairwise picks** (the dealer already makes 3 candidates) and **tagged reasons**, not bare accept/reject.
9. **Our current eval cannot detect modest improvements.** 10 briefs, one sample each: a sign test needs 9/10 wins for p=0.011 (8/10 gives p=0.055). With 30 pairs, 20 wins gives p=0.049. So: more briefs (30), 2 samples each, and a judge that returns win/loss/tie per pair.

---

## 1. Digest of sources

### 1.1 Benchmarks and leaderboards for AI web/UI generation

| Source | Method | Finding / what we can use | Run or borrow? | Rel. |
|---|---|---|---|---|
| **Design Arena** (Arcada Labs). https://notes.designarena.ai/methodology/ , https://www.designarena.ai/about | Crowd pairwise votes. 4 models + 1 backup get the same prompt (<5k chars); first two finished are shown anonymously; each choice = 1 vote; winners/losers matched until a 1-4 order. Bradley-Terry ratings (400*log10 strength), Wilson 95% intervals, models with <15 comparisons hidden, <50 tagged "new", equal weight per vote, refresh every 2h. Arenas: Model (single-file HTML), Builder (deployed apps), Mobile, Slides, Image etc. | Constant system prompts, anonymised identity, simultaneous display. No data release, API or bring-your-own-prompt described. Its ranking is the human reference other papers validate against (OpenDesign: Spearman 0.98). | Borrow methodology (anonymised pair, min-comparison floor, Wilson CI). Cannot run our prompts or get its data. | B (self-published; methodology page read, inconsistent in places) |
| **WebDev Arena / LMArena WebDev**. https://news.lmarena.ai/webdev-arena , Arena-Rank https://arena.ai/blog/arena-rank , https://github.com/lmarena/arena-rank , style control https://arena.ai/blog/style-control/ | Users prompt, two anonymous LLMs build web apps, user interacts and votes. Bradley-Terry with closed-form CIs; votes after identity reveal are excluded. Arena-Rank (Apache-2.0, JAX, `pip install arena-rank`) also fits **BT with covariates** (used for style control: length, markdown headers/bold/lists). | Style-control idea transfers directly: regress out page length / element count / decoration from judge verdicts. Dataset `lmarena-ai/webdev-arena-preference-10k` (10,501 battles, conversations contain code not screenshots; custom licence: research+commercial use, no redistribution, delete on request; contains unsafe content). | Borrow BT + covariate method (we can reimplement in 40 lines). Dataset usable only as internal judge-validation material after rendering; raw labels are noisy (see WebDevJudge). | A for Arena-Rank/dataset card, B for blog claims |
| **UI-Bench**. https://arxiv.org/abs/2508.20410 , leaderboard uibench.ai/leaderboard | 10 AI app builders x 30 prompts (5 categories x 6: marketing/landing, editorial, portfolio, e-commerce, local service) = 300 sites. Experts (194 in demographics panel; 65% designers) answer one forced binary question: **"Which project would you be more likely to deliver to a client?"** Full-screen view required, identity hidden, side randomised, no ties. TrueSkill per prompt, headline = mean mu. 4,075 matches. Pair sampling is adaptive (exposure balance, uncertainty, opponent novelty). | Top: Orchids 30.1, Figma Make 27.5, Lovable 27.1; middle ranks overlap. Authors say lower-ranked tools showed generic blue CTAs and repetitive card grids. **No inter-rater agreement and no VLM-judge comparison reported.** Prompt set is on Hugging Face per the paper (I could not locate the repo URL); generated sites "to be released". | Borrow: the client-deliverable question, the 5-category x 6 brief structure (grow our 10 briefs to 30), the "base phase then adaptive phase" sampling idea. | A (internal inconsistencies: "8,150 comparisons" = 2 x 4,075 unexplained) |
| **WebDevJudge** (meta-evaluation). https://arxiv.org/abs/2510.18560 , https://github.com/lcy2723/WebDevJudge | 654 pairs from WebDev Arena with expert re-annotation (two SWE-background annotators; rubric trees of binary checks). Tests LLM judges: pairwise vs single-answer, with/without rubrics, code vs screenshot input. | Raw crowd labels were weak (annotator agreement 65% with ties; agreement with original votes only 53%). With rubrics: 90-92%. Best judge pairwise 70.3% (GPT-4.1), Claude-4-Sonnet 70.2%; human experts 84.6%. Pairwise > single-answer by >8 pts. Rubrics did not help pairwise; binary rubrics beat Likert in single-answer. Swap consistency 84-90%. Removing code hurt more than removing screenshots (functionality-heavy task). Judges reject functionally-equivalent variants humans accept. | **Run**: score our Claude judge on this set to learn its agreement ceiling on web pairs before trusting it on ours. Borrow findings (pairwise, binary checks, position bias). | A (HTML read to ~100k of 130k chars) |
| **ArtifactsBench** (Tencent Hunyuan). https://arxiv.org/abs/2507.04952 , https://github.com/Tencent-Hunyuan/ArtifactsBenchmark | 1,825 tasks, 30+ LLMs. Each artifact rendered, 3 screenshots (before/during/after scripted interaction, 1024x768), MLLM judge with per-task 10-dimension checklist (5 visual: layout, fidelity, motion timing, feedback, UX clarity; 5 code), 10-pt scales. Dual referee Gemini-2.5-Pro + Qwen2.5-VL-72B. | 94.4% normalised Footrule **ranking** consistency with WebDev Arena (vs 69.4% for WebBench); up to 90.95% **pairwise** agreement with human experts (280 queries, 6 models; 79.06% without images). Different metrics; don't conflate. Authors admit judge hallucination, prompt sensitivity and version drift (a Gemini preview was deprecated). | Borrow: multi-screenshot input, per-task checklist generated then human-refined, judge-version pinning. | A |
| **OpenDesign / AesCoder** ("Code Aesthetics with Agentic Reward Feedback"). https://arxiv.org/abs/2510.23272 | 840 real webpage cases; GPT-5 scores a rendered full-page screenshot pointwise: alignment with instruction 40, aesthetics and readability 30, structural integrity and cohesion 30; bands 0-29 ... 90-100; "do not inflate"; JSON out. | GPT-5 vs human pairwise agreement 80.9% (200 pairs, 10 raters) vs human-human 68.7%; ranking Spearman 0.98 / Kendall 0.91 vs Design Arena. Trains a model with reward = 0.1 executability + 0.8 static aesthetics + 0.1 interaction. | Borrow rubric banding and "do not inflate" wording. Note agreement is on cross-model pairs (large gaps), so it overstates fine-grained sensitivity. | A (last 5k chars unread) |
| **Vision2Web**. https://arxiv.org/abs/2603.26648 | 193 tasks; Gemini-3-Pro judge scores each functional block of rendered page vs prototype on a 5-level scale (1/0.75/0.5/0.25/0). | Judge-human Spearman avg 0.66 (median 0.80) vs human-human 0.78. Mobile/tablet scores 10-20% lower than desktop. | Idea: block-level scoring; reference-based so only partly applicable. | A |
| **Vision-guided iterative refinement for frontend code**. https://arxiv.org/abs/2604.05839 | VLM judge with 4 dimensions (visual task, aesthetics, code task, code quality; 1-10 banded). Critic-in-the-loop (CITL) refinement. | Multi-dimension judge 69.5% agreement with WebDev Arena human votes vs 48.5% for a single-dimension judge. CITL refinement +9.8% to +17.8% judge score; refinement **without** critique only +1.5%. No bias mitigation described. | Supports (i) multi-axis judge output and (ii) a bounded critique-and-revise loop in the build pipeline (see 3.6). Goodhart risk: gains are measured by the same judge. | A |
| **Others seen, not read** | WebGen-Bench 2505.03733 (GPT-4o 1-5 appearance rating), WebCoderBench 2601.02430, LongWebBench 2606.17727, WebVR 2603.13391 (claims 96% agreement with human preference, MLLM judge), FronTalk 2601.04203, LiveEvalBench 2608.03689, WebCompass 2604.18224, AesEval-Bench 2603.01083 (graphic design aesthetics for VLMs, ICLR 2026; reports clear gaps vs humans). | Evidence the field converged on MLLM-judge + rubric + human-vote validation. | Skim if we need more rubrics. | B |
| **Design2Code**. https://arxiv.org/abs/2403.03163 | 484 real pages; screenshot-to-code; metrics: CLIP similarity (CLIP-ViT-B/32 on square-resized images **with text boxes inpainted**), Block-Match, Text (Dice), Position, Color (CIEDE2000). | Measures reproduction fidelity, not design quality. Humans validated the ranking. | Not runnable for us (we generate from briefs, there is no reference). **Borrow**: CLIP-on-inpainted-screenshots as a style/layout embedding, and its use as the standard "visual similarity" number. | A abstract; metric defs via secondary (UIBenchKit, Sketch2Code) |
| **Sketch2Code** https://arxiv.org/abs/2410.16232 ; **Interaction2Code** https://arxiv.org/abs/2411.03292 ; **Web2Code** https://arxiv.org/abs/2406.20098 ; **WebSight** https://arxiv.org/abs/2403.09029 ; **FrontendBench** arXiv 2506.13832 | Sketch2Code reuses Design2Code's 5 metrics + an **IoU layout metric over component types** (text, image, video, nav, form/table, button). Interaction2Code: interactive prototypes, ASE 2025. Web2Code: dataset + WUB/WCGB. WebSight: synthetic 823k (v0.1) / 1.92M (v0.2 Tailwind) HTML-screenshot pairs, DeepSeek-Coder-33B generated, **CC BY 4.0**. | None measure open-ended design quality. Two ideas transfer: (a) Sketch2Code's per-type layout IoU is exactly a skeleton-similarity metric; (b) WebSight is a large sample of what a code LLM produces by default, usable as the "generic LLM" cloud to stay away from. | Borrow (a). Use (b) only as a reference cloud (needs rendering; 145 GB, take a few thousand). | B/A mix |
| **WiserUI-Bench**. https://arxiv.org/abs/2505.05026 , github.com/jeochris/wiserui-bench | 300 real UI image pairs where the winner was verified by a company A/B test; 684 expert rationales tagged with Norman's perception/memory/action and UX laws. ACL 2026. | MLLMs show limited understanding of which UI variant changes behaviour. | **Run** as an external sanity set for "does our judge know what converts" (we expect low). Borrow the rationale taxonomy for ledger tags. | B |
| **Design homogenization in web vibe coding**. https://arxiv.org/abs/2603.13036 | Conceptual risk analysis + case studies of lay users getting narrower design variety. | Confirms the problem; **does not** provide an embedding-based measure. Our sameness metric is novel territory. | Cite only. | B |

### 1.2 VLM-as-judge: bias, calibration, agreement

| Source | Finding | Use | Rel. |
|---|---|---|---|
| Zheng et al., MT-Bench / Chatbot Arena. https://arxiv.org/abs/2306.05685 | Strong LLM judges reach >80% agreement with humans (= human-human) on text. Position bias (GPT-4 65.0% consistent under swap with default prompt; Claude-v1 23.8%), verbosity, self-enhancement. Recommended swap-and-tie protocol. | Swap-and-tie is our core bias control. (Numbers are for 2023 models.) | A for position table, B for verbosity (secondary) |
| Chen et al., MLLM-as-a-Judge (ICML 2024). https://arxiv.org/abs/2402.04788 , https://github.com/Dongping-Chen/MLLM-as-a-Judge | Multimodal judges agree best with humans in **pair comparison**, diverge in **scoring** and **batch ranking**; hallucination, position bias, self-preference observed (GPT-4V mildly egocentric). | Justifies pairwise-only decisions. | B |
| Fooling the LVLM Judges (EMNLP 2025). https://arxiv.org/abs/2505.15249 | Brightness/gamma shifts, text overlays, black padding, beauty filters and bounding boxes **inflate** scores for all tested LVLM judges; pairwise judging also vulnerable; prompt mitigations insufficient. | Keep screenshots raw and identically captured; do not draw annotation on them; audit decoration-vs-win correlation. | B |
| Self-preference in MLLM judges (Philautia-Eval; preprint). Seen via search only. | Judges favour their own family's outputs. | Our generator and judge share a family: add anchors and a cross-family spot check. | B |
| Calibrating judges with few human labels: "How to Correctly Report LLM-as-a-Judge Evaluations" https://arxiv.org/abs/2511.21140 ; "Noisy but Valid" (ICLR 2026) https://arxiv.org/abs/2601.20913 | Judge errors bias naive win rates. A small human-labelled set can correct estimates (Rogan-Gladen style or prediction-powered inference) and CIs should include calibration uncertainty. | Report CIs that include the uncertainty of judge-vs-founder agreement. | B |

### 1.3 Learned aesthetic and UI-quality models

| Source | What it is | Verdict for us | Rel. |
|---|---|---|---|
| **UIClip**. https://arxiv.org/abs/2404.12500 , checkpoints https://huggingface.co/collections/biglab/uiclip-uist-2024 | CLIP-B/32 (~150M) fine-tuned: 4-stage, contrastive on ~2.3M synthetic "jittered" web screenshots (JitterWeb, >99.9% synthetic), then pairwise cross-entropy on web pairs and on BetterApp (618/73/201 train/val/test human-rated pairs from 12 designers). Takes screenshot + text description, outputs quality and relevance. | Pairwise accuracy 75.1% (best variant) vs GPT-4V 51.6% in the paper (old model; refused ~10%). Designer agreement alpha=0.37. Limits: single screen, one scalar, synthetic flaws. Three checkpoints and datasets are on Hugging Face (`biglab/uiclip_*`, `biglab/jitteredwebsites-*`); licences not shown on the collection page; training code not found; demo Space was in "Runtime error". **Use as a cheap local second opinion only after measuring its agreement on our own ledger pairs.** The "jitter" recipe is useful to us regardless: it is how to build known-worse pairs for judge sanity tests. | A (HTML paper, first 100k chars) |
| **UICrit**. https://arxiv.org/abs/2407.08850 | 983 mobile UIs, 3,059 expert critiques + ratings from 7 designers; few-shot sampling from it improved LLM critique quality by 55% (their metric). | Mobile only. Borrow critique style for few-shot examples in the critique-and-revise loop. | B |
| **LAION aesthetic predictor v2** https://laion.ai/blog/laion-aesthetics/ ; NIMA | CLIP ViT-L/14 embedding + small head, trained on SAC (synthetic art), LAION-Logos, AVA (photos). NIMA: CNN on AVA photos (from memory; not fetched). | Domain mismatch (photos and art). **Do not use** for UI. | A for LAION, none for NIMA |
| **PickScore / HPSv2 / ImageReward**. https://arxiv.org/abs/2305.01569 , https://arxiv.org/abs/2306.09341 , https://arxiv.org/abs/2304.05977 | The recipe: CLIP (or BLIP) features + head trained on human **pairwise** choices (Pick-a-Pic; HPD v2 ~798k choices). Each is best on its own distribution. | The template for our own small reward model: frozen embeddings + Bradley-Terry linear head on founder pairs. Data scale in those works is 10^5-10^6; ours is 10^2, so frozen features and strong regularisation only. | B |
| Screen Recognition / RICO-based element detectors | Not researched in depth. Detect UI elements; not quality scorers. | Skip. | none |

### 1.4 Datasets of real screens (reference sets for similarity and diversity)

| Dataset | Content | Licence (as found) | Use for us |
|---|---|---|---|
| **Common Screens**. https://registry.opendata.aws/comonscreens | Screenshots (JPEG) + CSV metadata for >70M websites, monthly updates; `s3://common-screens` (us-west-2, listable without an account). | **CC BY 4.0** on the dataset (the pages in the screenshots are still third-party works; keep use internal, no redistribution of crops). | Best bulk source of "real web" negatives for sameness calibration. Needs filtering to SaaS-looking pages (metadata or a CLIP text-probe "SaaS landing page"). Resolution not stated; check before relying on it. |
| **WebSight v0.2**. https://huggingface.co/datasets/HuggingFaceM4/WebSight | 1.92M synthetic Tailwind pages with screenshots. | CC BY 4.0 | "Generic code-LLM look" cloud; stay far from it. |
| **RICO / ScreenQA / Enrico** | ~66-72k Android app screens (2017). | Original RICO: I found **no licence statement** (a 2019 UFSC page says the same); derivatives are CC-BY-4.0 / Apache-2.0. | Mobile reference only; dated. Low priority. |
| **WebUI** (CMU, CHI 2023). https://arxiv.org/abs/2301.13280 | 400k rendered pages with extracted metadata. | Release/licence unclear in what I saw ("coming soon" on v1). Similar-named HF repos are different datasets. | Skip until verified. |
| **Mind2Web**. https://arxiv.org/abs/2306.06070 | Real-site task traces with screenshots/DOM. | Dataset CC BY 4.0, code MIT per paper's artifact table; HF card currently shows no licence field. | Small pool of real-site screenshots; not designed for aesthetics. |
| **Mobbin-like** (Mobbin, Page Flows, Land-book, etc.) | Commercial curated galleries. | Not researched; assume bulk scraping violates ToS. | Do not ingest; use only for human inspiration. |
| **Our own `knowledge/web/teardowns.md` (38 sites)** | Already measured by `teardown-measure.js`. | We captured them; internal. | The cleanest, highest-quality negative set (known-different, human-made, in-genre). Re-render screenshots if not stored. |

### 1.5 Visual regression and layout checking

| Tool | How it works | Relevance | Rel. |
|---|---|---|---|
| **Playwright `toHaveScreenshot`**. https://playwright.dev/docs/test-snapshots | pixelmatch under the hood; `threshold` (0-1, docs state default 0.2), `maxDiffPixels`, `stylePath` to hide volatile elements; baselines must be generated in the same environment; move mouse away to avoid hover state. | Good for "did my token refactor change pixels unintentionally" on frozen fixtures. Not a quality signal. | A |
| **pixelmatch**. https://github.com/mapbox/pixelmatch (ISC) | Per-pixel perceptual difference in **OKLab with HyAB distance** (per README fetched), anti-alias detection, threshold default 0.1, `windowSize` for local-max diff, `ignoreMask`; zero deps; Node and browser. | Fine for regression; useless for "same design, different skin" because colours differ everywhere. | A |
| **Percy / Applitools** | Percy: pixel-based with smart cropping (vendor). Applitools: "Visual AI" with match levels (Content, Layout, Dynamic, Strict) that ignore insignificant differences. | Conceptually, Applitools' *Layout* match is the skeleton idea; implementation is proprietary and paid. We reimplement the idea with DOM boxes. | C (vendor; Layout-level rules not verified) |
| **sharp-phash / imghash** | 64-bit pHash, Hamming distance; rules of thumb 5 (dHash) to 10 (pHash) bits for near-duplicates; imghash docs use Levenshtein on hex (not the same as bitwise Hamming). | Near-duplicate detection only; see section 2.2 for why it is not sufficient. | B/C |

### 1.6 Claude-specific facts for the judge (from official vision docs, A)

https://platform.claude.com/docs/en/build-with-claude/vision
- Claude resizes by patch: tokens = ceil(w/28) x ceil(h/28), capped per model (standard tier: 1568 px long edge / 1568 tokens; high-resolution tier on Claude 4.7 and later: 2576 px / 4784 tokens). A 1440x900 fold is ~1.7k tokens before capping.
- Up to 100 images per request on 200k-context models (600 on others), but **above 20 images every image must be <= 2000 px** or the request is rejected. Keep each judge call at <= 20 images.
- "Images before text" performs best; label each image with a short text line ("Design A, desktop fold:").
- Prefer lossless PNG for text legibility; heavy JPEG compression hurts reading small text.
- Claude cannot reliably tell AI-generated from human images, so do not ask the judge to guess provenance; ask for design properties.
- Use the Files API (`file_id`) to avoid re-sending the same PNGs across the two swap orders and across runs.

---

## 2. Concrete proposal

Three numbers per eval run, reported together (a change is "better" only if the table in 2.5 says so):
1. **Craft** (exists): `check.mjs` fail/warn counts. Gate, not a score.
2. **Taste** (new): pairwise win rate of the candidate run against a frozen baseline run, by a swap-controlled Claude judge, with a Wilson CI; validated against founder verdicts.
3. **Sameness / diversity** (new): pairwise sameness matrix across the run's outputs, and versus the last N ledger entries; summary = Vendi-style effective number of distinct designs.

### 2.1 (a) Screenshot-pairwise VLM judge

**Inputs per design (fixed count, to avoid rewarding long pages with more images):**
- `D0` desktop fold, 1440x900 PNG (what `check.mjs` already writes as `desktop-fold.png`).
- `D1..D3` the full page cut into 3 equal-height desktop tiles, each resized to <= 1568 px on the long edge.
- `Dm` desktop full-page overview, downscaled so the whole page fits one image (layout rhythm and silhouette only; text will be illegible and the prompt says so).
- `M0` mobile fold (390x844), `M1` mobile mid-page tile.
That is 7 images per design, 14 per call, under the 20-image ceiling. Roughly 20-25k input tokens per call at current vision costs, 2 calls per pair (swap), so a 30-brief x 2-sample comparison is ~120 calls. Cost is on the order of a few dollars at Sonnet-class prices and low tens at Opus-class prices; check current pricing. Use the strongest vision model for the gate run and a cheaper one for dev loops; pin the model id and store it in every result (judge drift is a documented problem).

**Call settings:** temperature 0; forced tool call (`submit_verdict`) so the output is schema-valid JSON; images first, text last; the same files in both orders; no filenames, titles or URLs visible anywhere (render local files; screenshots contain no browser chrome).

**Verdict aggregation per pair (brief, sample):** run order 1 (A=new, B=base) and order 2 (swapped). New wins only if it wins in both orders; loses only if it loses in both; any conflict or any `tie` = tie (0.5). Report swap-consistency (share of pairs where both orders agree on a non-tie winner); if it falls under 80% the run is flagged `judge-unreliable` and no conclusion is drawn.

**System prompt (verbatim to use):**

```text
You are a senior brand and product designer on the hiring panel of a top design studio. You will compare two candidate front-end designs, Design A and Design B, made for the same brief. You do not know who or what produced them and must not guess.

Decide which one a demanding creative director would be more willing to put in front of a client under the studio's own name.

HOW TO LOOK
- Images are screenshots of rendered pages. For each design you get: the desktop fold (close to 1:1), three desktop tiles covering the whole page, one tiny overview of the whole page (layout rhythm only; text in the overview and tiles is downscaled, so do NOT penalise small text there, judge type from the fold images), and two mobile images.
- Judge only what you can see. Do not assume content you cannot see works.
- Compare like with like: desktop fold vs desktop fold, mobile vs mobile.

THE EIGHT AXES (compare A and B on each)
1. hierarchy_focal: one dominant element per viewport; clear reading order; the primary action is obvious without being loud everywhere.
2. type_craft: a deliberate type voice; sizes drawn from a scale; sensible line length and leading; headline size follows the composition rather than a default; no accidental mixed styles.
3. spacing_rhythm: spacing from a consistent scale; related things closer than unrelated; section rhythm varies on purpose; nothing cramped or floating.
4. colour_surface: a restrained, intentional palette; clear contrast; surfaces, borders and shadows used with purpose; no decoration for its own sake.
5. distinctiveness: could another company reuse this skeleton by swapping the logo? Reward a point of view in structure, type, palette and CTA grammar. Common template tells count against a design: default-looking grotesk everywhere, large centred headline over two buttons, floating pill nav, floating product card with glow, purple-blue gradient, all-caps eyebrow above the headline, three equal icon cards, a "trusted by" logo strip with nothing behind it.
6. proof_believability: any product UI shown proves a real workflow or decision rather than decorating; sample data is coherent; nothing implies invented customers, logos or metrics presented as real.
7. copy_specificity: specific beats abstract; real nouns, numbers and verbs; no cliché marketing phrases; CTA labels say what happens.
8. states_responsiveness: mobile is its own composition, not a squeezed desktop; no overflow, clipped or overlapping elements; tap targets plausible; empty/loading/error/hover states if the brief implies them and they are visible.

RULES OF EVIDENCE (important)
- Do NOT reward: more content, longer pages, more sections, more effects, more gradients, glows, blur, illustrations or density. More is not better. A restrained design that does fewer things well beats a busy one.
- Do NOT reward a design for sitting in position A or B, for being shown first, or for looking like a polished generic SaaS template. Polish without a point of view is a weakness on axis 5, not a strength.
- Do NOT let a single flashy element decide the result if the rest is weaker.
- Objective defects matter: overlapping or clipped text, unreadable contrast, broken mobile layout, missing images or placeholder boxes, horizontal overflow. List each one and say where it is.
- "tie" is a valid answer for an axis and for the overall verdict. If you cannot articulate a concrete visible reason one is better, answer tie. Forcing a choice on noise is worse than a tie.
- Confidence must be calibrated: 0.5 means a coin flip, 0.9 means you would be surprised to be wrong.
- Work in the order of the output fields: observe first, compare axes, list defects, and only then decide the overall verdict.

Call the tool submit_verdict exactly once. Keep every text field short and concrete (name what you see, e.g. "left-aligned 96px serif headline over a dark table with 5 rows"), never generic ("clean and modern").
```

**User message template:**

```text
BRIEF ({{KIND}}): {{BRIEF}}

[Design A images, each preceded by a text label]
Design A - desktop fold:        <image>
Design A - desktop tile 1/3:    <image>
Design A - desktop tile 2/3:    <image>
Design A - desktop tile 3/3:    <image>
Design A - desktop overview:    <image>
Design A - mobile fold:         <image>
Design A - mobile mid-page:     <image>

[Design B images, same seven labels]

Question: Which design would you be more willing to ship to a client for this brief? Compare them on the eight axes, list objective defects, then give your overall verdict.
```

**Optional few-shot block** (flag `--shots 2`, off by default): prepend two founder-decided pairs from the ledger (fold images only, accepted side randomised between A and B across the two examples, founder's own words as the reason). Never use briefs that are in the eval set. Measure with and without: keep only if founder-agreement rises and swap-consistency does not fall.

**Tool schema (`input_schema` of `submit_verdict`):**

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["observations", "axes", "defects", "ai_tells", "would_ship", "overall"],
  "properties": {
    "observations": {
      "type": "object",
      "additionalProperties": false,
      "required": ["A", "B"],
      "properties": {
        "A": { "type": "array", "minItems": 2, "maxItems": 4, "items": { "type": "string", "maxLength": 160 } },
        "B": { "type": "array", "minItems": 2, "maxItems": 4, "items": { "type": "string", "maxLength": 160 } }
      }
    },
    "axes": {
      "type": "array",
      "minItems": 8,
      "maxItems": 8,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["axis", "winner", "strength", "evidence"],
        "properties": {
          "axis": { "enum": ["hierarchy_focal", "type_craft", "spacing_rhythm", "colour_surface", "distinctiveness", "proof_believability", "copy_specificity", "states_responsiveness"] },
          "winner": { "enum": ["A", "B", "tie"] },
          "strength": { "enum": ["none", "slight", "clear", "decisive"] },
          "evidence": { "type": "string", "maxLength": 200 }
        }
      }
    },
    "defects": {
      "type": "array",
      "maxItems": 12,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["design", "severity", "where", "description"],
        "properties": {
          "design": { "enum": ["A", "B"] },
          "severity": { "enum": ["blocker", "major", "minor"] },
          "where": { "type": "string", "maxLength": 80 },
          "description": { "type": "string", "maxLength": 160 }
        }
      }
    },
    "ai_tells": {
      "type": "object",
      "additionalProperties": false,
      "required": ["A", "B"],
      "properties": {
        "A": { "type": "array", "items": { "enum": ["default_grotesk", "centered_giant_headline", "pill_nav", "floating_glow_card", "purple_blue_gradient", "caps_eyebrow", "three_icon_cards", "empty_logo_strip", "cliche_copy", "stock_symmetry"] } },
        "B": { "type": "array", "items": { "enum": ["default_grotesk", "centered_giant_headline", "pill_nav", "floating_glow_card", "purple_blue_gradient", "caps_eyebrow", "three_icon_cards", "empty_logo_strip", "cliche_copy", "stock_symmetry"] } }
      }
    },
    "would_ship": {
      "type": "object",
      "additionalProperties": false,
      "required": ["A", "B"],
      "properties": { "A": { "type": "boolean" }, "B": { "type": "boolean" } }
    },
    "overall": {
      "type": "object",
      "additionalProperties": false,
      "required": ["winner", "margin", "confidence", "decisive_axes", "rationale"],
      "properties": {
        "winner": { "enum": ["A", "B", "tie"] },
        "margin": { "enum": ["coin_flip", "slight", "clear", "decisive"] },
        "confidence": { "type": "number", "minimum": 0.5, "maximum": 1 },
        "decisive_axes": { "type": "array", "maxItems": 3, "items": { "enum": ["hierarchy_focal", "type_craft", "spacing_rhythm", "colour_surface", "distinctiveness", "proof_believability", "copy_specificity", "states_responsiveness"] } },
        "rationale": { "type": "string", "maxLength": 400 }
      }
    }
  }
}
```

`ai_tells` ids intentionally mirror `tools/check.mjs` `ai.*` checks so the judge's view and the DOM checks can be cross-tabulated (when the judge sees a tell the DOM check missed, tighten the DOM check). `would_ship` gives a cheap absolute pass-rate per run without ever asking for a 1-5 score.

**Bias controls (all of them, in order of importance):**
1. **Swap and tie** (both orders, agree-or-tie). Track swap-consistency per run.
2. **Pairwise only for decisions.** Per-axis winners are diagnostics, not scores.
3. **Fixed image budget per design** (7 images), same capture settings, raw pixels, no overlays or highlights (visual-manipulation inflation).
4. **Density/verbosity audit.** For every judged pair store covariates: log ratio of page height, DOM element count, count of images, count of gradients/shadows. After each run, fit `logit(win) ~ covariates` on all pairs. If any standardised coefficient has |z|>2 and a sign that rewards "more", add the "do not reward" wording to the prompt or subtract the covariate effect (the LMArena style-control approach). Arena-Rank (Apache-2.0) implements BT with covariates, or write the 30-line logistic version ourselves.
5. **Self-preference check.** Anchor set = 12-15 human-designed pages from the teardown set, re-rendered with the same capture pipeline, with 2-3 deliberately degraded copies each (the UIClip "jitter" recipe: remove web font, perturb spacing by +-30%, flatten hierarchy by equalising font sizes, lower contrast). Required sanity gates for any judge version/prompt change: original beats its degraded copy >=90% of the time `[engine guess]`; A/A (same screenshots, A vs A copy with different file names) gives ties or ~50/50, never a systematic side. Every quarter, run 20% of pairs through a second, non-Claude judge and compare agreement.
6. **Pin the judge.** Store `model`, `prompt_sha`, `schema_sha` in each result; refuse to compare runs judged by different pins.
7. **Calibrate to humans** (2.3) and report CIs that include the calibration uncertainty (PPI-style), not just binomial noise.
8. **Don't give the judge the check.mjs numbers.** Keep taste independent of craft; combine afterwards.

**Statistical protocol (what the pair counts buy you):**

| Pairs (non-tie) | Wins needed for one-sided p<0.05 (sign test) |
|---|---|
| 10 | 9 (p=0.011; 8 gives 0.055) |
| 20 | 14 (p=0.058) / 15 (p=0.021) |
| 30 | 20 (p=0.049) |
| 40 | 26 (p=0.040) |
| 60 | 37 (p=0.046) |

So: **grow `evals/prompts.json` from 10 to 30 briefs** (never edit the 10 existing ones; add 20 more across the five UI-Bench categories plus the existing app-UI/funnel kinds), and take **2 samples per brief** (different seeds) when judging a change that matters. Always compare against a **frozen baseline** (store its screenshots under `evals/baselines/<label>/`), not "the previous run", to avoid chained drift. Maintain a small BT league over all stored runs so versions can be ranked on one scale (BT with half-win ties, weak ridge prior).

**Expected judge quality (be honest):** published agreement for strong judges on web pairs is ~70-81%, human-human 69-85%. Treat the judge as a fast proxy whose agreement with *our* founder we must measure (2.3). If measured agreement on decisive pairs is under ~65% after prompt iteration, drop to using the judge only for `defects`, `ai_tells` and `would_ship` (observations), and rely on founder picks for taste.

### 2.2 (b) Sameness metric: screenshot embeddings and cheap perceptual signals

**Why not just pHash:** pHash/dHash with Hamming thresholds of 5-10/64 detect resized or recompressed copies. A skeleton clone with a new palette, font and copy has a very different pixel field. The existing `anti-ai-slop-detector.md` C-1 (grayscale + 24px blur, SSIM>0.75 or pHash<10) is a good start but untested; its C-4 (CLIP cosine > 0.9) is likely mis-scaled (see S3).

**Four signals, cheapest first. Compute for the desktop fold, and for the full page where noted.**

| ID | Signal | How | Catches | Cost |
|---|---|---|---|---|
| **S1** | **Layout-skeleton raster** (new, DOM-based) | In `check.mjs` `measure()`, for visible elements draw rectangles onto per-class grids: `text` (headings and paragraphs, weighted by font-size), `media` (img, video, svg, canvas, large background images), `control` (buttons, inputs, links styled as buttons), `container` (elements with own background/border/shadow that contain >=2 children, i.e. cards/panels), `nav`. Fold: 32x20 grid. Full page: 32 columns x 64 rows (rows = fraction of page height). Similarity = mean over classes of weighted IoU (Sketch2Code-style per-type IoU), optionally with 1-cell dilation tolerance. Deterministic, colour/font/copy independent. | Same skeleton with different skin; "assembled from the same sections in the same order" (use the full-page grid, optionally the sequence of section signatures with edit distance). | ~50 lines in page + 40 in Node |
| **S2** | **Blurred grayscale thumbnail** | 128 px wide, grayscale, Gaussian blur ~ 24 px at 1440 width; compute (a) SSIM, (b) 64-bit dHash and pHash Hamming. Use the in-page canvas (`getImageData`) so no new dependency is needed. | Same value structure and composition (light/dark masses). Matches Larpo's "indistinguishable after grayscale + blur" rule. | Cheap |
| **S3** | **Image embedding cosine** | CLIP ViT-B/32 (as in Design2Code; OpenAI weights, MIT) or SigLIP-2 base (Apache-2.0), on the fold with text regions masked to the local median colour (Design2Code does text inpainting) and square-resized. L2-normalise; cosine. Run in Node with `@huggingface/transformers` (ONNX, quantised) so there is no Python/torch install; the repo's venv has no torch. A ready ONNX export of SigLIP-2 base was not found (only a so400m community conversion); the older Xenova CLIP/SigLIP ONNX repos exist (verify names before building). | Style/genre-level similarity (type voice, imagery, density) that boxes miss. | ~150 MB model download, ~0.3 s per image on CPU `[engine guess]` |
| **S4** | **Existing fingerprint axes** in `ledger.mjs` | As is (headline size/font, body font, nav height, content width, section rhythm, radius system, accent hue). | Reflexive defaults. | Free |

**Do not use raw cosine thresholds.** CLIP/SigLIP embeddings of any two SaaS marketing pages are already close (all are "website screenshot, white background, headline, button"). The existing note's "flag > 0.9" will either fire on everything or on nothing. Convert every signal to a **percentile rank within a reference distribution**: sameness_k(a,b) = fraction of reference *cross-site* pairs whose S_k similarity is lower than (a,b)'s. Then:
- `SAME` if S1 percentile >= 0.97 **or** (S3 percentile >= 0.97 **and** S2 percentile >= 0.90). `SIMILAR` (warn) if S1 >= 0.90 or two of (S1,S2,S3) >= 0.90. Plus the existing >=4-of-8 fingerprint rule. `[engine guess]` thresholds, finalised by the calibration below.
- Batch summary: Vendi-style effective number = exp(entropy of the eigenvalues of K/n) where K is the n x n similarity matrix (from memory of Friedman and Dieng's Vendi Score; not re-verified here). For the 10-brief eval we want effective-N close to 10 and a falling "max pairwise sameness" over time; report both.

**Calibration (do once, re-run when signals change):**
1. **Negatives (should be different):** all pairs among the 38 teardown sites rendered at 1440x900 (703 pairs); optionally 300-500 Common Screens pages filtered to in-genre; optionally 1-2k WebSight pages as the "generic LLM" cloud (for the *distance-from-generic* metric: median similarity of an output to its 20 nearest WebSight neighbours).
2. **Positives (should be flagged):** (i) the Larpo r5 seven concepts the founder said were hard to tell apart; (ii) every pair of ledger entries the founder rejected with a reason like "same nav/same skeleton" (tag it); (iii) **synthetic skin swaps**: take each of our own pages and its counterpart rendered with injected CSS (hue-rotate palette, font-family swap, text nodes replaced with neutral placeholder text) so the layout is bit-identical but the skin is different; need >=30 pairs.
3. Compute AUC per signal and ROC for the rules. Keep a signal as a **gate** only if TPR >= 0.8 at FPR <= 0.05; otherwise demote to advisory. Fix percentile thresholds at FPR 0.05 (warn) and 0.02 (fail).
4. **Hard negatives:** pairs that share a genre but are genuinely different (two fintech dashboards by different studios). If these trigger `SAME`, tighten.
5. Record the reference set hash and model version in the output; refuse comparisons across versions.
6. Sanity check on the 10 eval outputs: the effective-N should be near 10 and none of the 45 pairs should be `SAME`; if some are, look at them by eye and decide whether the metric or the engine is at fault.

Where it plugs in: `ledger.mjs similar` keeps its exit-1 contract but computes S1-S3 against the last 8 entries in addition to the 8 fingerprint axes; a new `tools/sameness.mjs <reportsA> <reportsB...>` outputs the matrix for a batch.

### 2.3 (c) Folding in founder verdicts

**Capture changes (small, high value):**
- `ledger.mjs add` gains `--tags a,b,c` from a closed list matching the judge axes plus `sameness`, `copy`, `brand-fit`, `other` (borrow WiserUI-Bench's idea of tagging rationales); keep `--why` as free text in the founder's own words.
- Store `rater`, `shown_with` (the sibling candidates from `deal.mjs`/ the same delivery) and `revision_of` (when v2 follows a rejected v1 of the same brief). These are the structure needed to derive pairs.
- Prefer **pairwise delivery**: show the founder 2-3 candidates and ask "which, and why". The founder's pick gives 1 win and 1-2 losses with identical brief content, the cleanest preference signal. Arena-style data and UI-Bench both use forced pairwise choice for this reason.

**Derived data: `ledger/pairs.jsonl`** (rebuilt by `tools/prefs.mjs`; rows `{winner, loser, source, weight, brief_kind, tags, rater, date}`):
- `pick-from-N` (founder chose one among siblings): weight 1.0.
- `revision` (rejected v1 -> accepted v2, same brief): weight 1.0.
- `accept-vs-reject` across different briefs of the same `kind`: weight 0.3 (content-confounded; use only for kNN and coarse checks).

**What to do with it, by how much data you have (counts are non-tied, same-rater pairs; heuristics, not guarantees):**

| Pairs | What becomes possible | Why that number |
|---|---|---|
| 0-10 | Retrieval only: read recent rejects; nearest-accepted reference lookup. No learning. | Any estimate is noise. |
| 10-30 | **Judge sanity check**: agreement of judge with founder on decisive pairs; first kNN score. Treat as a smoke test only. | n=30, 75% agreement => Wilson 95% CI 57-87%. Too wide to tune on. |
| 30-60 | **Judge acceptance test and prompt/few-shot selection**: adopt a judge version only if agreement >= 70% and lower CI bound > 55%, and swap-consistency >= 85% `[engine guess]`. | n=40, 75% => CI 60-86%; n=100, 75% => CI 66-83%. |
| 60-120 | **Re-weight the eight judge axes**: logistic regression (ridge) of founder pick on the per-axis winner features (A-B coded +1/0/-1, 8 parameters) => "what this founder actually weights". Also fit BT with dealer-axis covariates (type voice, palette temperature, CTA grammar...) to learn which direction options get picked. | ~8-20 parameters; the classical 10 events-per-parameter rule gives 80-200, but Riley et al. warn fixed rules are unreliable (needed events per parameter varied from ~5 to >20 across cases) and ridge helps, so plan for ~100 and check cross-validated log-loss. |
| 200-300+ | **Small reward model**: frozen CLIP/SigLIP fold embeddings (and S1 skeleton vector) -> linear head, Bradley-Terry loss on pairs, strong L2, leave-one-brief-out CV. | 768+ dimensions with a few hundred labels is only viable with frozen features and heavy regularisation; the CLIP-head recipe of PickScore/HPS/LAION-aesthetic worked with 10^5+ labels. Expect it to capture only coarse taste. |

Cheapest "reward model" available from day one: **kNN preference score** = mean cosine to the k nearest accepted references minus mean cosine to the k nearest rejects (k=3), evaluated with leave-one-out. Promote it from advisory to a delivery-time sanity flag only when LOO pairwise accuracy >= 0.70 on >= 40 pairs.

**Rules for using learned signals:**
- Never optimise the engine directly against the judge or reward model on the same briefs (Goodhart). Keep a **holdout set** of 10 briefs that are never used to tune prompts and are only scored at release points, and refresh the founder-labelled gold set so that it is not the data the judge was tuned on.
- Re-check judge-vs-founder agreement every 30 new verdicts or when the judge pin changes.
- Different founders have different taste: keep `rater`, fit per-rater or add a rater covariate; don't pool silently.
- Accepts are selection-biased (only what the engine showed), and brand-specific rejects ("not our colour") don't transfer; the tag `brand-fit` excludes a row from preference fitting.
- UIClip's authors measured designer agreement at alpha 0.37. A founder will contradict themselves on near-pairs; measure test-retest by re-showing 5 old pairs in swapped order, and cap the achievable agreement accordingly.

### 2.4 Using the signals to *improve*, not just measure

1. **Ablation harness.** Every knowledge/system change is a candidate: run the 30-brief set before and after (same seeds as far as the generator allows), judge pairwise, and keep the change only if the decision table passes. This also lets us prune the 1,328-rule index by removing rule groups and checking nothing drops.
2. **Judge-guided best-of-N at delivery.** The dealer already creates 3 directions. Build all 3 (or 2), run a round-robin of pairwise judge calls (swap-controlled), and show the founder the top 2 with the judge's rationale. This reduces founder load and creates pick-from-N data.
3. **Bounded critique-and-revise.** Feed `defects`, `axes[].evidence` where the design lost, and `ai_tells` back to the builder for at most 2 revision rounds; accept the revision only if it beats the previous version in a swap-controlled pairwise judgment. Vision-guided refinement reported +10-18% with critique vs +1.5% without, but measured on its own judge, so gate with founder picks.
4. **Failure mining.** Aggregate `decisive_axes` for the pairs the engine loses to its own baseline or to the anchor human pages; the most frequent losing axis becomes the next knowledge-ingestion target.
5. **Regression guard on the system layer.** For token/refactor changes that should not alter output, freeze a fixture page set and use Playwright `toHaveScreenshot` (pixelmatch) with `maxDiffPixelRatio` ~0.001 in one fixed environment. This is where pixel diff belongs.

### 2.5 Decision table: did the change make it better?

| Question | Measure | "Better" | "Worse" |
|---|---|---|---|
| Craft not broken | `check.mjs` fails; warns; ai-tell warns | no new fails; warns and ai-tells not up by >2 across the set | any new fail, or ai-tells +3 or more |
| Taste improved | new vs frozen baseline, swap-and-tie, >=30 non-tie pairs | >= 20/30 wins (p<0.05), lower Wilson bound > 50%; swap-consistency >= 80% | <= 10/30 wins |
| Not more samey | max pairwise `S1` percentile and Vendi effective-N across the run; sameness vs last 8 ledger entries | effective-N not lower by >0.5; no new `SAME` pairs | effective-N lower by >1 or any `SAME` against ledger |
| Judge is trustworthy | sanity gates (degraded < original >= 90%, A/A fair); last founder agreement | all pass | any fails => result void |
| Founder agrees (periodic) | judge-vs-founder agreement on the last 30+ pairs | >= 70% | < 60% => stop trusting judge verdicts |

Verdict wording for the run report: `IMPROVED | NEUTRAL | REGRESSED | INVALID(judge)`.

---

## 3. Minimal implementation plan (Node first, Python only if needed)

Existing: `tools/check.mjs` (Playwright, render + measure), `ledger.mjs`, `score.mjs`, `deal.mjs`, `thresholds.json`. New code stays in `tools/` and `evals/`. Estimates are for one focused engineer-day = 6 productive hours.

| # | Work | Files | Effort | Dependencies |
|---|---|---|---|---|
| 1 | **Capture upgrade**: write the fixed 7-image judge set (fold, 3 tiles via `page.screenshot({clip})` on the full-page height, overview downscale, mobile fold + mid tile) to `reports/<name>/judge/`; add the S1 raster to `measure()` and to `report.json` (`skeleton`); add blurred 128px thumbnail + dHash/pHash via in-page canvas | `tools/check.mjs` | 0.5-1 d | none (Playwright canvas) |
| 2 | **Judge**: `tools/judge.mjs <reportsDirA> <reportsDirB> [--shots n]` using `@anthropic-ai/sdk`, forced tool call with the schema above, both orders, temperature 0, content-hash cache in `evals/judgments/`, writes pair result `{winner, swap_consistent, covariates, pins}`; env `JUDGE_MODEL`, `ANTHROPIC_API_KEY` | `tools/judge.mjs`, `tools/judge.prompt.md`, `tools/judge.schema.json` | 1 d | `@anthropic-ai/sdk` |
| 3 | **Compare harness**: extend `score.mjs` with `--vs <baseline-label>` to judge all brief pairs, aggregate win rate, Wilson CI, sign-test p, swap-consistency, covariate audit, BT league, and print `IMPROVED/NEUTRAL/REGRESSED/INVALID`; store frozen baseline screenshots under `evals/baselines/` | `tools/score.mjs` (+ `tools/lib/stats.mjs` ~80 lines: Wilson, binomial tail, BT-MM with ties) | 0.5-1 d | none |
| 4 | **Judge sanity suite**: `tools/degrade.mjs` (CSS injection for the jitter set: font swap, spacing jitter, equalised type, low contrast) + `tools/judge-selftest.mjs` (degraded vs original, A/A, swap-consistency) over the anchor set | two scripts | 1 d | needs anchor pages rendered (teardown sites) |
| 5 | **Grow briefs 10 -> 30** (append only), 2 samples per brief | `evals/prompts.json` | 0.5 d (writing) + generation time | none |
| 6 | **Sameness**: `tools/sameness.mjs` computing S1/S2 (+S4 reuse) matrices, percentile conversion against `evals/reference/ref-dist.json`, Vendi; wire into `ledger.mjs similar` | `tools/sameness.mjs`, `tools/ledger.mjs` | 1 d | none |
| 7 | **Embeddings (S3)**, optional: `tools/embed.mjs` using `@huggingface/transformers` with CLIP/SigLIP ONNX, text-masking pass in the page before the screenshot | `tools/embed.mjs` | 0.5-1 d | model download ~150 MB |
| 8 | **Calibration**: `tools/perturb.mjs` (skin swap: hue-rotate, font swap, text replacement), `tools/calibrate.mjs` (ROC/AUC per signal, thresholds at FPR 0.05/0.02, writes `evals/reference/ref-dist.json` and thresholds into `tools/thresholds.json` under `sameness`); reference set = 38 teardown sites (+ optional Common Screens subset) | two scripts | 1.5 d | step 6, optionally 7 |
| 9 | **Founder gold set**: `tools/label.mjs` builds a static HTML page showing two candidates side by side (random side), keys `a/b/=` (tie), optional tag buttons, exports JSON into `ledger/pairs-manual.json`. Founder time ~15 min for 40 pairs | `tools/label.mjs` | 0.5 d | none (note `package.json` already references a missing `tools/gallery.mjs`) |
| 10 | **Ledger extension + prefs**: `--tags`, `--rater`, `--revision-of`, `shown_with`; `tools/prefs.mjs` builds `pairs.jsonl`, reports judge-vs-founder agreement (Wilson CI), kNN LOO accuracy, ridge-logistic over axes when n>=60, BT with dealer-axis covariates when n>=100 | `tools/ledger.mjs`, `tools/prefs.mjs` | 1-1.5 d | step 2 |
| 11 | **Reward model** (only at >=200 pairs): `tools/reward.mjs` frozen-embedding BT head (Python `scikit-learn` or 60 lines of Node gradient descent) with leave-one-brief-out CV | `tools/reward.mjs` | 1 d | step 7 |

**Suggested order and total:** 1, 2, 3, 5 (about 3 days) give a usable pairwise taste eval. Add 4 (1 day) before trusting it. Then 6, 8 (2.5 days) for sameness, 9, 10 (2 days) for founder loop. Items 7 and 11 are optional until data exists. Total about 9-10 engineer-days; the first useful milestone (judge + comparison + sanity suite) is about 4 days.

**Run cost per full comparison** (30 briefs x 2 samples x 2 swap orders = 120 calls at ~22k image tokens each, ~2.6M input tokens, small output): a few dollars with a Sonnet-class model, roughly 5x that with an Opus-class model; the cache means unchanged pairs are free on rerun. Verify with the current price sheet before budgeting.

**Determinism checklist for captures** (otherwise the judge measures noise): same machine and viewport, `deviceScaleFactor` fixed, fonts awaited (`document.fonts.ready`, already done), finite CSS animations fast-forwarded (already done), looped animations paused, mouse moved off hover targets (`page.mouse.move(-1,-1)` per Playwright docs), no cookie/overlay differences, same Chromium build recorded in `report.json`.

---

## 4. Open questions and risks

- **Judge ceiling on our domain is unknown.** All reported numbers are on cross-model pairs with large gaps, or on functionality-weighted tasks. Our pairs are same-model, different-brief-pack, often small gaps. First experiment: judge-vs-founder agreement on the first 30-40 founder picks; second: run WebDevJudge's 654 pairs through the same prompt to compare our Claude judge to the published 70% baseline.
- **Founder labels are the bottleneck.** Nothing here removes the need for them; it only makes each one count more. If the founder cannot supply ~40 pairs, the judge stays a diagnostic.
- **Embedding thresholds are untested hypotheses**, especially the claim that CLIP cosine between SaaS pages is globally high. Verify on the teardown set first (one hour of work) before building the percentile machinery.
- **Common Screens suitability** (resolution, genre mix, legal comfort for screenshots of third-party sites) not checked in detail; keep it optional.
- **Licences to re-check before any redistribution:** UIClip checkpoints (none shown), WebDev Arena dataset (no redistribution, delete on request), RICO (none found), Common Screens (CC BY on the compilation only).
- **Not researched in depth:** Screen Recognition (Apple), NIMA specifics, Percy/Applitools internals beyond vendor pages, Sketch2Code/Interaction2Code metric details from primary text, Krebs's labelled dataset referenced in `anti-ai-slop-detector.md` (`dataset/labels.jsonl`; it may be the best existing source of "same skeleton" labels and should be checked first).
- **Judge drift.** Providers deprecate models (ArtifactsBench lost a Gemini preview). Keep the frozen baseline screenshots and a stored set of judge outputs so an old result can be re-scored under a new judge before trusting a trend line.
