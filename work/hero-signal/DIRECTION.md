# hero-signal · Pager — DIRECTION

**Brief (one line).** Pager (fictional concept): an AI on-call agent that triages a production incident, names the likely cause with evidence and drafts the fix PR before the paged engineer reaches the laptop. Audience: engineering leads and SREs at 50-1000 person software companies. One action: start a 14-day trial. Proof: a real-looking incident record, labelled sample.

**Assumption.** "Before you open the laptop" means the 6-10 minutes between the page and the engineer at a keyboard, not "while you sleep until morning": a SEV-2 at 03:12 is not left alone for hours, and an SRE audience would not believe it.

**System.** Bound to Signal (`system/systems/signal/`). Tokens only via `var(--...)`; Schibsted Grotesk + JetBrains Mono from the GUIDE href.

## Hero class
Product proof. The objection for an SRE lead is "will an agent's diagnosis be right, and can I check it?" Only the interface answers that (LDP-02: interface proves value -> product dominates).

## Concept
The page is the incident record you wake up to: one SEV-2 on checkout-api, read left to right as a clock (03:04 deploy, 03:12 page, 03:16 cause, 03:19 PR drafted, 03:21 you), with the evidence and the drafted diff laid out like the document an engineer actually reviews.

## Rule slate (kept / dropped)
Kept (38): LDP-16, LDP-02, LHS-01, 02, 04, 06, 08, 11, 12, 14, 15, 16, 18, 19, LAI-39, LAI-62, LAI-73, ui-pedia.13-buttons#45, VWI-04, WCSS-39, web.courses-and-curricula#62 and #27, a11y-checklist#54, WDA-24, web.implementation-craft#58, AH-TY-01, AH-TY-05, AH-TY-10, PT-SZ-08, web.color-and-surfaces#10, #13, #15, #25, web.anti-ai-slop#3, AH-WR-33, ui-pedia.06-whitespace#1, ui-pedia.07-proximity#2, #12, ui-pedia.12-typography#22, craft-emil-kowalski#18.
Dropped (22): caption rules LBC-40/43 (no social caption here), marquee rule (no logos exist), skip-link webkit note (no skip link in a one-section hero), toast/sheet motion rules (no toasts), passkey and gesture-verb copy rules (no sign-in form), glass (AH-CO-30, none used), increased-contrast variant (AH-CO-02: Signal owns its token set; I cannot add tokens), sticky mobile CTA (page is one screen of hero, not 3+), form label/field proximity #8, prev/next grouping #10, PT-SZ-11 ch caveat, x-height leading #25, prototype-testing #37, Carbon productive easing, duration scaling.

## Reference triad
- **Structural:** an incident-management record page (status header, horizontal timeline, three evidence panes). Rule taken: the page grid *is* the timeline; columns follow the order an engineer reasons (what happened -> why -> what to ship).
- **Type / identity:** Signal itself (Schibsted Grotesk 700, JetBrains Mono for every ID, timestamp and diff). Rule taken: code and IDs always in mono; one amber for state and the one action.
- **Proof / material:** a GitHub-style PR diff with check results. Rule taken: proof must show a decision with consequences (rollback vs merge), not a chart wall.

## Divergence row (vs last 8 ledger entries: Baton, Linecheck, Take, Mise, Nacre, Borne, Ridge 47, Phase/Vanta)
| axis | this hero | difference |
|---|---|---|
| structure | split header (h1 left, lede + command bar right, bottom-aligned) over a full-width incident record sheet whose top is a time ruler | not left-copy/right-dashboard (LHS-06), not centred big-copy/photo-below; no photo at all (Linecheck); product is the stage (Take/Mise lesson), not a floating card |
| type voice | utilitarian grotesk + mono as data | Baton was Geist lowercase, Linecheck Geologica 500; this is Schibsted 700 with mono IDs |
| palette | material monochrome cool neutrals + one amber + danger red only on the error metric | not Baton's sterile mono: state colours carry meaning (red = failing, amber = needs you, green = checks passed) |
| CTA | command bar: email field + square amber button, flush, with an offset block shadow | not a capsule (LHS-04), not "bright rectangle + arrow" (no arrow; geometry is Signal's block shadow, same as the product sheet) |
| nav | inline bar, wordmark + 4 links + Sign in text link; no nav CTA | no pill, normal capitalisation (LHS-02) |
| motion | still-with-craft: only hover/press/focus transitions at 120ms; static still is the deliverable (LHS-18) | no ambient loops, no glow |

## Tokens used
Fonts: `--font-display`, `--font-sans`, `--font-mono`. Type roles: display-xl (h1), body-lg (lede), heading-sm, label-md, label-sm, body-sm, mono-sm. Surfaces: canvas, raised, sunken, inverse. Text: strong, body, muted, inverse, on-accent. Borders: hairline, control, strong. Accent: solid, solid-hover, tint, text, border, focus-ring. State: danger-text/tint/border, success-text/tint/border. Depth: `--shadow-float` (CTA bar), `--shadow-modal` (incident sheet). Radius: `--radius-md` (2px) on the input only; 0 everywhere else. Spacing: scale tokens only. Controls: `--control-lg` (40px). Motion: `--dur-fast`, `--ease-standard`. Content width `--content-max`.

## Overrides
- override: AH-TY-01 / check minBodyPx 16 inside the product sheet because the sheet is a faithful dense desktop UI (Signal body-sm 13px, mono-sm 12px); marketing prose (lede) is body-lg 17px.
- No info (blue) role used: info hue 245 sits in the AI-tell purple-blue range and is not needed.

## Check log
- Pass 1: 4 fail, 1 warn. Fixed: inline code at 0.9em (11.7px) -> 1em; brand link aria-label mismatched visible text (removed); mobile brand target 28px -> 48px min-height.
- Pass 1 critique: lede ran 4 lines and floated above the h1 cap line; CTA note orphaned "merges."; timeline read as equal grey ticks with no sense of who was working when; head padding wasted fold so the PR actions fell below 900px.
- Pass 2: 0 fail, 0 warn, 45 pass. Changes: 2px text-strong track from the 03:12 page to 03:21 (Pager's working window) vs hairline before it; head padding 64 -> 48.
- Pass 2 critique: lede still 4 lines; "Alert fires, you're paged" wrapped; note wrapped. Shortened lede to 3 lines and note to one; label shortened.
- Pass 3: 0 fail, 0 warn, 45 pass. Pitch block now bottom-aligns with the h1 and the whole record (including Review PR / Roll back) sits in the 1440x900 fold. "ruled out" key wrapped: key column 64 -> 80px.
- Final: 0 fail, 0 warn, 45 pass. `ledger.mjs similar`: exit 0 (Baton 0/8, Linecheck 1/8 accent hue).
- Remaining weakness: the split header (h1 left, pitch right) over a full-width product sheet is a familiar SaaS skeleton; what makes it Pager's is the clock ruler and the incident content, not the structure. The h1 at display-xl (88px) is still large, though held to two lines.
- Off-scale value used: `calc(var(--space-4) - 1px)` to centre a 2px track on an 8px marker; 1px borders.
