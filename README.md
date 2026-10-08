# design-engine

A standalone front-end design brain. One prompt in, a well-designed, consistent, non-generic site out.

It is not a model. It is the layers around one that stop it from guessing:

| Layer | Folder | What it is |
|---|---|---|
| Corpus | `corpus/` | Raw sources: page images + extracted text (books, courses). Heavy, gitignored images. |
| Knowledge | `knowledge/` | Studied notes: rules with reasons, numbers and mechanical checks. See `knowledge/SCHEMA.md`. |
| System | `system/` | Design as data: type scales, spacing, palettes, pairings, section patterns. |
| Examples | `examples/` | Annotated good and bad references, with why. |
| Ledger | `ledger/` | Every accept/reject from the founders, with screenshot. The training signal. |
| Evals | `evals/` | Fixed prompts re-run after each change to measure improvement. |
| Tools | `tools/` | Ingestion, render-and-check (Playwright), similarity/diversity checks. |
| Skills | `skills/` | Claude skills wrapping the pipeline so one prompt triggers all of it. |

## Pipeline (target)

brief -> direction (must diverge from recent work) -> assemble from system + knowledge -> render -> measure (type, spacing, contrast, overflow, similarity) -> critique against references -> deliver -> ledger.

## Start here

- `docs/HOWTO.md`: how to use, update and test the engine.
- `CLAUDE.md`: the pipeline every session follows.
- `.claude/skills/design-engine/SKILL.md`: the one-prompt entry point.

## Setup

```bash
python3 -m venv .venv && .venv/bin/pip install pymupdf pyobjc-framework-Vision pyobjc-framework-Quartz
.venv/bin/python tools/ocr_pdf.py "<image-only.pdf>" corpus/<name> 100     # macOS Vision OCR
.venv/bin/python tools/extract_pdf.py "<text.pdf>" corpus/<name> 80        # text-layer PDFs
```
