# DIRECTION: hero-vellum (Marlowe)

**Brief in one line.** Marlowe, an AI research analyst for independent wealth advisors and small RIAs, reads filings, earnings calls and the client's portfolio and writes a sourced brief before every client meeting; one action: request access; proof the visitor needs: a brief whose every claim can be checked.

Assumption (not asked): the visitor is an advisor-owner who fears an AI that sounds confident and is wrong in front of a client. So the proof is not speed, it is *traceability*.

## Hero class
**Product proof.** Trust is the barrier (LDP-02), and the product's output is a document, so the document is the hero. No photography, no generated imagery.

## Concept
*The page is a marked-up briefing paper on the advisor's desk the night before a meeting:* a cover note in the left margin, the brief itself in the centre, and its sources hanging in the right margin like a scholar's sidenotes.

## Reference triad
| role | reference | rule taken |
|---|---|---|
| structural | Tufte-style sidenote page (tufte-css; Tufte's own books) | Evidence lives in the margin beside the claim it supports, never behind a click; the margin is part of the grid, not an afterthought. |
| type / identity | Private-bank and Stripe Press book typography (high-contrast Garamond titling over a quiet sans) | Serif only for the few large, declarative lines (h1, the client name); all working text in the sans. |
| proof / material | Legal memo + footnoted research note (and the citation-chip convention of AI answer engines) | Every factual sentence ends in a numbered chip that resolves to a dated, located source (page, section, timestamp). |

## Dealt direction (seed 404) and choice
Chose **#3** and adapted it to Vellum (`direction.json` "chosen": 3, with a "combination" note).
- kept: structure *product-window-as-canvas*, palette *sun-faded-warm*, CTA *inline-in-copy*, nav *index-list-nav*, motion *state-transition-demo*.
- changed: hero class brand-campaign -> product-proof (trust is the barrier); type voice condensed-poster -> Vellum's locked Garamond/Manrope (system binding wins); proof artifact annotated-photograph -> sourced document (the product makes documents, a photo would be decoration, LHS-08).
- #1 rejected: botanical palette and command-bar CTA fight Vellum's gold-on-stone. #2 rejected: optical black/white + terminal proof is devtools, which Vellum explicitly avoids.

## Divergence row (vs last 8 ledger entries: all seed rejects / caption patterns)
| axis | this hero | differs how |
|---|---|---|
| structure | three-column marginalia: cover note / brief / sources rail | not left-copy-right-dashboard (LHS-06): product is centred and the third column is evidence, not UI chrome; not big-copy-above/image-below (LHS-07) |
| type voice | Cormorant Garamond 72px h1 in a narrow 360px measure, Manrope working text | not an oversized grotesk dominating the frame (LHS-01) |
| palette temperature | warm stone ground, white paper, one ink band, one muted gold button, one warning tint for the policy breach | not dark neon/glow (LHS-12); not thin neutral monochrome (LHS-11): the ink band, 40px client name and warning flag hold up at feed scale |
| CTA grammar | single gold button closing the cover note, no CTA in nav | one primary only |
| nav grammar | numbered index (01 Method, 02 Sources, 03 Practices) + Sign in, flat on the page | no floating pill nav |
| motion signature | brief claims settle in reading order (opacity + 8px, 420ms ease-enter, 90ms tiers), chips after their claim | calm, not springy; static still carries the idea (LDP-14, LHS-18) |

## Tokens used (all from system/systems/vellum/theme.css)
- fonts: `--font-display` (h1, client name only, both >= 40px), `--font-sans`, `--font-mono` (citation numbers, timestamps)
- type roles: display-lg (h1), heading-lg (client name), body-lg (cover support), body-md (claims), body-sm, label-md, label-sm, mono-sm
- colour roles: surface-sunken (page ground), surface-raised (paper), surface-inverse / text-inverse (brief header band), text-strong, text-body, text-muted, border-hairline, border-control (chips), accent-solid / accent-solid-hover / text-on-accent (the one CTA), warning-tint / warning-text / warning-border (policy flag), focus-ring
- radius: md 4 (button), lg 6 (paper), xs 2 (chips); depth: `--shadow-raised` only
- space: 4 through 128 from the scale; hero bottom padding 128 (owned decision: section rhythm >= 128)
- motion: `--dur-slow`, `--ease-enter`; reduced motion = opacity only

## Rules kept (trimmed slate, 38)
LDP-16, LDP-02, LDP-14, LDP-01, LDP-13, LHS-01, LHS-06, LHS-07, LHS-08, LHS-10, LHS-11, LHS-12, LHS-16, LHS-18, LHS-19, LHS-20, LHS-02, LHS-52, LBC-23, LBC-15, WCSS-39, VWI-04, web.courses-and-curricula#62, web-sources.a11y-project-checklist#54, web.anti-ai-slop#3, web.anti-ai-slop#9, web.color-and-surfaces#10, #24, LAI-36, LAI-39, LAI-73, LAI-65, LW-13, PT-SZ-08, AH-TY-05, AH-TY-10, web-sources.craft-emil-kowalski#17, systems-research.magic-ui#4, ui-pedia.07-proximity#2/#8.
Dropped (do not apply to a static hero concept): magic-ui#5 (no marquee), LBC-42 (caption rule, no caption here), color-and-surfaces#53 (no data viz), ui-pedia color 60/30/10 (Vellum owns proportions), AH-WR-17 (onboarding), what-to-do-next#17 (process), GOV-26 (no form), AH-MO-03 (no gesture), SYS-CARBON-15 (Vellum easing wins), ui-pedia typography #13/#17/#18/#34 (Vellum scale owns this), PT-SZ-11, AH-TY-01, blueprint#7, LAI-62/66, LHS-13 (brief asks for mobile explicitly).

## Overrides
- override: web.anti-ai-slop#3 because the brief binds this hero to Vellum, which pins warm ground + high-contrast serif display. Mitigation: no italic display, no terracotta, gold used once; the distinctiveness is spent on structure (marginalia) and proof, per LAI-65.
- override: LW-13 partially because "Request access" is the one action the brief fixes; the cover note's last sentence sets it up ("see one built from your own book") so it reads as the next step, not a context-free ask.
- note (Vellum "one accent element per viewport"): the warning flag uses the warning role, not the accent role; the gold CTA remains the only accent element.

## Truth handling
Client (Hallworth Family Trust), people, issuer (Corvane Health), quote, figures and timestamps are fictional and labelled "Sample brief, fictional client and issuer" on the document itself. No customers, logos, metrics or security claims.

## Check answers
- Round 1: 2 FAIL (axe label-content-name-mismatch on wordmark/citation aria-labels), 2 WARN (cover support 33 cpl; source 3 at 21 cpl), mobile WARN citation targets 24px. Fixed: removed aria-label on wordmark, citations use visually-hidden "source" prefix, widened hero wrap to content-max + 160 and cover column, shortened the quoted excerpt, kept citations display:inline (WCAG 2.5.8 inline-in-text exemption; every source is also listed as a full-width footnote below on mobile).
- Critique 1: CTA fell below the 900px fold and h1 stacked 5 lines in a 350px measure. Fixed via wider columns, tighter cover spacing.
- Critique 2: sources rail floated unrelated to the claims. Fixed: rail starts level with "Since you last met" so sidenotes sit beside the claims they support; headline shortened to 3-4 lines.
- Final: 0 FAIL, 0 WARN, 45 PASS. ledger similar: ok (max 3/8 shared, vs Linecheck).
- Known weakness: the brief's footer sits just below the desktop fold; the empty top of the sources rail is intentional (sidenote alignment) but reads as slack at feed scale.
