# Knowledge note schema

Every study note in `knowledge/` follows this shape. The goal is **rules an agent can apply and a script can check**, not summaries.

## File layout

```
knowledge/<source>/<chapter-slug>.md      one note per chapter/topic chunk
knowledge/<source>/INDEX.md               chapter list, page ranges, status
```

## Note format

```markdown
---
source: ui-pedia | dos-and-donts | psychology-of-user | what-to-do-next | web:<url>
chapter: <name>
pages: <pdf page range, e.g. 35-70>      # PDF index (printed page = PDF page - 1 for UI Pedia)
topic_tags: [color, contrast, ...]
status: studied
---

# <Chapter>

## 1. Core ideas
The 5-12 ideas that matter, each in one or two sentences with the *reason* behind it.
Cite pages as (p.NN).

## 2. Rules
One bullet per rule, strongest form first. Each rule has:
- **RULE** — imperative, concrete, numeric when the source gives numbers.
- **Why** — the mechanism (perception, usability, hierarchy). One line.
- **Applies to** — landing page | SaaS app UI | forms | mobile | all
- **Check** — how to verify it mechanically (a measurement or selector) or `visual` if only an eye can.
- **Source** — (p.NN)

Example:
- **RULE** Body text line-height 1.5-1.65 of font size; headings 1.1-1.25.
  **Why** Longer lines need more leading to keep the eye on track.
  **Applies to** all. **Check** computed line-height / font-size on `p`, `h1-h6`. **Source** (p.262)

## 3. Numbers & scales
Every concrete value the source gives: sizes, ratios, spacing steps, contrast ratios, durations, easings.
Table form where possible.

## 4. Dos and Don'ts
Paired good/bad examples the source shows, described precisely enough to reproduce (what is shown, what is wrong, why).

## 5. Exceptions & judgement calls
Where the source hedges, where two rules conflict, where breaking the rule is the better design. This is where creativity lives, so be honest about it.

## 6. Figures worth keeping
List pages whose *image* teaches something text cannot (p.NN: what it shows). These get copied into `examples/`.

## 7. Open questions
Anything unclear, OCR-damaged, or contradicted elsewhere. Never guess; flag.
```

## Quality bar

- **Coverage:** every page in the assigned range must be accounted for. List pages with nothing extractable (title pages, ads) under section 7 as `p.NN: no rule content`.
- **No paraphrase-blur.** If the book says "use 8px multiples", write 8px multiples, not "use consistent spacing".
- **Preserve numbers exactly.** If OCR looks damaged on a number, check the page image.
- **Mark source opinion vs. hard rule.** Authors express taste; label it `(opinion)` when the book hedges or says "I prefer".
- **Do not invent.** Anything not in the pages goes nowhere. Your own design knowledge may go in section 5, clearly labelled `[engine note]`.
