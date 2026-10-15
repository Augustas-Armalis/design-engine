---
source: web:paper.design, granola.ai, stripe.com, saasframe.io, pravinkumar.co, maximeheckel.com, learnwithjason.dev, engine benchmarks (split-heroes, x-refs)
chapter: Light hero grammars beyond the house style
pages: n/a
topic_tags: [hero, light-mode, layout, shader, texture, buttons, nav, type]
status: studied
---

# Light hero grammars beyond the house style

Written 2026-10-15, after the founder said Quorum v1 was "identical in style and everything" to Kestrel and Kite, and asked for "different layouts, textures, shaders, nicer buttons".

The house style was a centred Inter headline, a grey pill nav, ink pill buttons, rails plus a dot grid, and a framed dashboard below. This note lists the alternatives found in research and the build that applied them (Quorum v2, `work/quorum/app/src/Hero.tsx`).

## 1. Core ideas

- **Change the whole family, not one surface.** The complaint was the family. Diverging means changing all of these together: the layout family, alignment, nav grammar, button material, type voice and signature texture.
- **The signature visual should be the product's own verb, rendered as a texture.** For Quorum the verb is highlighting: a halftone audio waveform whose highlighted moments light up in their tag colours. That reads as the product working, not as decoration.
- **A split hero needs quiet substance on the copy side.** Calm canvas plus three spec rows, not empty space.
- **Shaders in light mode must be ink on paper.** One ink tone, colour only where it carries meaning, and never under body text.
- **Research sources.** UI Pedia (the 626-page PDF) is a beginner course: colour theory, button types, type basics. It has no studio-grade heroes. Go to the engine benchmarks and the live web for this.

## 2. Rules

- **RULE** Before a new light hero, pick a layout family the last three builds did not use. Options:
  - editorial split 60/40 (copy left, the product stage bleeding off the right and bottom);
  - document on a desk (one tilted sheet with the headline overlapping its edge);
  - oversized type with cutouts;
  - data-viz as hero (one timeline across the fold);
  - an index layout (a mono metadata rail plus one pulled quote).

  **Why** The founder reads structure first; a surface swap on the same skeleton reads as "the same design". **Applies to** landing page. **Check** `ledger.mjs similar`, plus a layout-family note in DIRECTION.md. **Source** saasframe 2026 trends; pravinkumar.co (60/40); granola.ai.
- **RULE** On a split, the art stage is one panel: radius 24-28, bleeding off two edges. It starts at about x 700 of 1440 and leaves the copy column on plain canvas.
  **Why** Art confined to one panel keeps the headline on the calmest pixels. **Applies to** landing page. **Check** visual; no texture behind the h1 or subtitle. **Source** engine benchmarks `split-heroes/granola`, `lightfield`, `mintlify`.
- **RULE** Light textures are paper, grain or halftone:
  - `PaperTexture` (`@paper-design/shaders-react`, pinned): colorPaper about #efede6, colorShadow about #d8d4c7, roughness .3, fiber .35, folds, crumples and drops 0, speed 0.
  - SVG `feTurbulence` grain (baseFrequency .85, 3 octaves) blended multiply at a low opacity.
  - A WebGL halftone (7-9px cells, dot radius = sqrt(value) × cell × .46, one ink tone).

  **Why** These read as material; colour blobs read as template. **Applies to** landing page. **Check** coloured pixels at or below ~3% of the fold, except where the colour is product meaning; at most two looping effects. **Source** shaders.paper.design; maximeheckel.com (dithering).
- **RULE** Button grammar must change with the family. Options:
  - **Lamp-lit ink key:** r14, 48px. `radial-gradient(120% 120% at 50% -20%, #45433d, ink 62%)`, an ink rim plus a 1px top light. A light pool fades in on hover over 60ms and out over 300ms, with a shine sweep of 700ms.
  - **Arrow block:** a 36px r10 square at white/13%. The arrow cycles out and back in on hover over 420ms.
  - **Text secondary:** a hairline that draws in from the left on hover.

  **Why** The previous builds' white bevel pill and ink pill were the "same button" complaint. **Applies to** all. **Check** the primary effect differs from the last two builds. **Source** Attio (lamp), Stripe (arrow), learnwithjason (gradient ring), engine `button-grammars.md`.
- **RULE** Nav alternatives:
  - **Text-only editorial (G14):** wordmark left, centred plain links with a 6px dot each (dots in the product's tag colours), and a right-hand "Start free ↗" text link with no filled button.
  - **Hairline masthead:** mono numbered links between two 1px rules.

  **Why** It removes the grey pill track that marked every earlier build. **Applies to** landing page. **Check** visual. **Source** paper.design, mymind; engine `nav-grammars.md`.
- **RULE** Type voice: a grotesk at 400-450 (Inter Tight 450, 86px, -0.04em, leading 0.98) with ONE word in a soft serif italic (Instrument Serif italic, about 1.14× the grotesk size) over a skewed highlighter swipe, drawn left to right on load.
  **Why** It gives the headline an art-directed moment that is the product's verb. The serif is an accent, not a Bodoni display (the founder rejected Quillwork's serif). **Applies to** landing page. **Check** at most one italic word, solid ink. **Source** web research pairing (Inter Tight + Instrument Serif).

## 3. Numbers & scales

| Element | Quorum v2 value |
|---|---|
| Canvas | #f6f5f1 warm paper, grain multiply .16 on 180px noise tile |
| Copy column | x 96, w 580; h1 top 236; specs row at y 760 (three cells, mono 11px labels) |
| Stage | x 704, y 104, 760×820, r28, bleeds right + bottom |
| Waveform | centre y 612 in stage, cell 7px, amplitude up to 118px, drift 13px/s |
| Highlight clusters | tag colours (amber #e7a21d, blue #4d7bff, green #2fb174) only inside highlighted spans |
| Sheet | 528px, r18, rotated -1.6°, 4-layer shadow |
| Load-in | nav .1, h1 .22 (+80ms per word), stage clip-reveal .3, field sweep .75, sheet .95, marks 1.55, insight 1.9, flags 2.2, highlighter 1.05 |

## 4. Dos and Don'ts

- **Do:** a halftone waveform that carries the tag colours inside the highlighted spans.
  **Don't:** a purple-blue mesh gradient behind the headline.
- **Do:** a flag chip under each highlighted span, holding its timestamp and tag.
  **Don't:** decorative floating icon tiles joined by routes. That was Kestrel's move, so reusing it is repetition.

## 5. Exceptions & judgement calls

- A founder rule says "one colour, one family" for the headline. The serif-italic word is a deliberate override. If the founder rejects it, fall back to Inter Tight for the whole headline and keep the highlighter swipe.
- The warm paper canvas departs from the neutral greys of earlier builds, on purpose.

## 6. Figures worth keeping

- `work/quorum/shots/quorum-hero-x-2x.png`: Quorum v2, the first build in this grammar.

## 7. Open questions

- Founder verdict on v2 pending.
- The Paper Shaders API is pre-1.0 (0.0.81), so pin the exact version.
