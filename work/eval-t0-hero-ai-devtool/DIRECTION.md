# eval-t0 · hero-ai-devtool — DIRECTION

**Brief.** Hero for an AI code-review tool that catches bugs before merge. Audience: engineering leads at 50–500 person startups. One action: start a free trial / review a repo. (Product "Margin" is a fictional concept; all data is sample.)

**Hero class.** Product proof. The visitor sees the one thing the product does: a specific bug flagged on a specific line before merge.

**Concept.** The hero is a source file. The headline is the file's top comment at poster scale, set in sans with line numbers beside it; the product proof is the diff below it, with line 84 marked in highlighter and the review comment hanging in the right rail, aligned to that line, the way review comments sit in a gutter.

**Dealt direction (seed 20261008, candidate 2 + pieces of 3).**
| axis | value | how it differs from last 8 ledger entries |
|---|---|---|
| structure | source-file sheet with comment rail (right-rail geometry) | ledger empty; avoids rejected left-copy/right-dashboard and big-copy/photo-below |
| type voice | mono + sans (JetBrains Mono for code and meta, Schibsted Grotesk for headline and prose) | not Geist/Inter; mono is real data language here |
| palette | paper-and-ink, cool paper (hue 250), ink navy, one highlighter yellow spot | avoids cream+coral and dark+neon |
| CTA | two-step split: solid square primary + underlined secondary | square, not capsule |
| nav | wordmark + disclosure menu + sign-in text link | no pill |
| motion | stagger cascade: lines type in, highlight sweeps line 84, comment settles; reduced-motion safe | |
| proof | code diff with annotated flaw | |
| moves | M22 mixed type voices, M34 colour-state background (highlight state) | |

**Reference triad.** Structure: code-review gutter (GitHub/Linear review UIs) as page layout. Type: mono + grotesk pairing at contrasting scales. Proof: one believable defect (retry drops idempotency key → double charge).

**Overrides.** None planned. `ai.default-font-only` must pass; headline size deliberately above the 48–64px template band (teardown-synthesis).

## Outcome (first pass)
- check.mjs: 0 fail, 1 warn, 44 pass.
- override: type.line-length (hero lede = 33 chars/line, limit 35) because the rail is a deliberately narrow 400px comment column; widening it would break the headline fit at 1440. Revisit if the rail grows.
- Fixed after first render: comment card was not aligned to line 84 (concept failure); left edges disagreed; "No style nits." wrapped badly; diff rows stretched by grid; mobile headline orphan; `=>` ligature in code.
- Tool bug found and fixed: axe measured contrast mid-fade; check.mjs now finishes entrance animations before measuring.
