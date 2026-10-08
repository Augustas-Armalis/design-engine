# DIRECTION: hero-bloom ("Evening")

**Brief, one line:** Evening is a consumer iPhone journaling app for busy adults who have bought the notebook and dropped it; you talk for two minutes before bed, it writes a short entry in your words and, once a week, names one gentle pattern. One action: download for iPhone. Proof the visitor needs: that a messy two-minute ramble really becomes a short, human entry, and that the "pattern" is gentle, not clinical.

**System:** bound to Bloom (`system/systems/bloom/`). Young Serif display, Nunito Sans body, DM Mono for authentic data only, rose accent on warm neutral, pill controls, soft depth, small springy motion. Light theme only on the page; dark theme follows `prefers-color-scheme` through theme.css.

## Hero class
**Product proof.** The objection is "I have tried journaling, it never sticks / AI will make it sound fake". Only the input/output pair answers that: what you said (raw, with ums) next to what Evening wrote (short, still your words) plus the weekly pattern. No photography, no generated image.

## Concept
**The day closes at a seam.** The frame is literally split into before and after: on the paper side, the two minutes you said out loud (a timestamped sample transcript, with the kept phrases marked); across the seam, on a darker evening paper, the phone holding the entry Evening wrote from those exact phrases and the one thing it noticed this week. The phone is dark because it is 10 pm.

## Reference triad
| role | reference | rule taken |
|---|---|---|
| structural | ledger accept *Nacre* | one sculptural central object, information placed around it rather than inside a generic content block |
| type / identity | ledger accept *Borne* + Bloom GUIDE | refined serif display at a medium role, quiet control, no giant headline (LHS-01, LAI-80) |
| proof / material | ledger accepts *Take* / *Mise* + LDP-16 | whole frame belongs to the product world; show an input/output pair with internally coherent sample data |

## Deal (seed 606): chosen = candidate #2, adapted
`product-proof · state-boundary · paper-and-ink · inline-with-hero nav · artifact-document proof`. Taken as dealt: hero class, structure (literal before/after seam), palette logic (paper ground, ink text, one spot colour = Bloom rose), nav inline with the hero (wordmark on the paper side, links on the evening side, no bar), proof as the product's output document (the entry). Adapted: type voice is Bloom's serif + humanist sans (Nunito Sans is humanist, Young Serif is owned by the system); CTA grammar is Bloom's owned pill rather than inline-in-copy; motion is "still with craft" (one small entrance) instead of an ambient loop, per LHS-18. Moves M09/M15 not used: film pacing needs scroll sections (out of scope), and "Fig 0.1" framing would be a decorative label (LHS-03/09).

## Divergence row (vs last 8 ledger entries + Linecheck/Baton)
| axis | this | how it differs |
|---|---|---|
| structure | two-field before/after seam, phone straddling nothing but owning the evening field; transcript anchors the paper side | not left-copy/right-dashboard (the right side is a phone holding a document, and the left side carries product evidence, not only copy); not copy-above/photo-below |
| type voice | Young Serif 52px h1 (display-lg), humanist sans body, mono only for real timestamps | not an oversized grotesk; headline is medium so the phone leads |
| palette temperature | warm paper + darker warm paper + one dark object; rose used for one card and one control | not dark neon, not sterile monochrome (Baton); colour has meaning (rose = what Evening adds) |
| CTA grammar | one filled rose pill with phone glyph + plain availability note | not a bright rectangle + arrow; tied to Bloom identity |
| nav grammar | wordmark on paper, three text links on the evening field, no bar, no capsule | not a floating pill nav |
| motion | phone settles 16px with Bloom ease-enter once; opacity-only under reduced motion | not ambient glow/shader |

## Tokens used
- Fonts: GUIDE href (Young Serif, Nunito Sans 400-700, DM Mono). `--font-display`, `--font-sans`, `--font-mono`.
- Type roles: `--text-display-lg` (h1), `--text-heading-md` (entry title), `--text-body-lg` (lede), `--text-body-md` (transcript, entry, pattern), `--text-label-md`, `--text-label-sm`, `--text-mono-sm`.
- Colour roles: `--surface-canvas` (paper/before), `--surface-sunken` (evening paper/after), `--surface-inverse` + `--text-inverse` (phone), `--accent-solid` + `--text-on-accent` (CTA, pattern card), `--accent-tint` + `--accent-text` (kept-phrase marks, Sample tags), `--text-strong/body/muted`, `--border-hairline`, `--focus-ring`.
- Space: scale only (`--space-*`), 4px base. Radius: `--radius-md` (pill), `--radius-lg` (pattern card), `--radius-sm` (marks/tags), plus the device radius below. Depth: `--shadow-float` on the phone only. Motion: `--dur-slow`, `--ease-enter`.

## Rules kept (trimmed slate, 38 of 60)
Kept: LDP-16, LDP-02, LHS-01/02/03/04/08/09/11/18/19/20/45, web.courses#62, #9, #5, WCSS-39, tailwind-catalyst#4, gestalt#8, a11y#54, AH-TY-01, PT-SZ-08, LAI-65, LAI-73, LAI-74, LAI-80, ui-pedia buttons#45, dos-donts#49, color-and-surfaces#10, teardown#15, WDD-05, motion gestalt#9, emil#18, whitespace#1, proximity#2/#5, spectrum#2, typography#22.
Dropped (do not apply to a static hero): AH-MO-23 (progress), magic-ui#5 (no marquee), a11y#27 (no skip target needed beyond main), ui-pedia buttons#6 (no disabled states), color-and-surfaces#3/#9 (system already compiled), AH-CO-19/02 (theme handled by system file; no increased-contrast variant exists in Bloom, flagged), AH-WR-07 (no multi-step flow), ui-pedia balance#17, motion status/feedback rules, Carbon motion modes, GOV-01/70, ui-pedia screens#4, gestalt#4/#5/#6 (radius follows Bloom ramp instead), AH-TY-20, ui-pedia typography#13.

## Overrides
- override: LHS-04 (no rounded CTA capsules by default) because pill controls are Bloom's owned identity decision ("deliberate, not reflex"); the nav is NOT a capsule, and only one pill CTA exists.
- override: LHS-13 (no mobile work for a single desktop still) because this brief explicitly asks for a designed 390px composition.
- override: Bloom radius ramp for the device body only: the phone uses `calc(var(--radius-xl) * 2)` outer and `calc(var(--radius-xl) * 2 - var(--space-8))` screen (nested = outer - padding), because an iPhone drawn at 28px corners reads as a generic card, which would hurt proof believability. All UI inside the phone stays on the ramp.
- override (flag): there is no "muted text on inverse" role in Bloom; inside the phone, hierarchy comes from size/weight with `--text-inverse` only, rather than inventing a token.

## Check WARN answers
Final run: 0 fail, 1 warn, 44 pass.
- WARN desktop `type.line-length` (p, 34 chars/line): this is the entry paragraph inside the phone. It is set at iOS body size (17px, AH-TY-01) on a 352px-wide device screen, so ~34 characters per line is what the real app would show; widening the phone to hit 35 would break device proportions. Kept on purpose.
- Mobile line-length rows are info-only (lede and transcript at 390px).

## Critique log
1. v1 (sunken right field, dark phone screen): seam too faint to read as before/after at feed scale; h1 broke into four ragged lines; hollow dynamic-island outline looked like a stray capsule; "iPhone only, for now" repeated the CTA.
2. v2 (rose-tint right field): strong at feed scale but turned the page pink and broke the owned decision "rose accent on warm neutral"; tint marks on a dark screen read as stickers. Reverted.
3. v3 (final concept): day paper | evening dark field, the phone is the lit screen in the dark. h1 set as two sentence lines; marks rhyme between transcript and entry (the visible input/output proof); transcript lengthened with an un-kept line (Mum called) so selectivity is visible.
4. v4: phone was squat (not iPhone proportions); fixed to 9:19, filled the screen with real app content (earlier entries) instead of air; trimmed until nothing clipped.
