---
source: web:https://kargul.studio (32 case studies, 2880x2070 CDN originals) + web:https://kargul.studio/swipe-file (632-image manifest, 158 web folds read) + web:https://x.com/marcelkargul (636 statuses, 12 Aug-21 Oct 2026, via api.fxtwitter.com) + @kargulstudio (73 statuses) + live client sites at 1440@2x
chapter: Marcel Kargul's hero folds: census, measured tuples, the ten layout families, what makes each work, rules and a recipe book
pages: n/a (55 distinct hero folds measured 2026-10-22; 58 files including 3 duplicate views)
topic_tags: [hero, landing, marketing-site, layout-family, signature-visual, type, cta, nav, spacing, colour, light-mode, dark-mode, benchmark, founder-bar, replication]
status: studied
evidence: knowledge/benchmarks/kargul-heroes/ (originals/, live/, x/, measured.tsv, index.tsv, sheets/, CREDITS.md, _scripts/)
replicas: work/replicas/KARGUL-HEROES-NOTES.md (#/kheroa..#/kherod; Gopher, Volcano, Supermetal, DefendLab) + KARGUL-HERO-NOTES.md (Chatsheet)
companions: kargul-micro-details.md (KMD, product UI), chatsheet-live-study.md (CSL), lunor-founder-style.md (LN), hero-craft-study-2026-10.md (HC), ../founder/canon/hero-light.md
---

> **Corrected 2026-10-22 by the full corpus.** See `kargul-corpus-2026-10.md` §8. The bigger sample corrects KH-03/04/08/09/19/29 and families; use the corrected numbers there.

# Kargul heroes: what he actually does in the first fold

**Why this note exists.** The founder rejected cadence-hero r1 and r2 (2026-10-22) as empty, repetitive and visually idea-less. His instruction was "Marcel heroes are what you should take inspiration from and actually build on ... Marcel has hundreds of designs ... you didn't do any research". This is that research. Every hero fold that Kargul Studio has published is here: case studies, the swipe file, X and live client sites. Each was measured from the best original available and sorted into a family, then four were rebuilt to registration.

**The answer in one paragraph.** A Kargul hero is a short, plain headline: 6 words, 2 lines, 64 px median at weight 500 and -0.03em. Above it there is usually nothing (40 of 55). Under it sit a grey two-line subtitle 24 px below and two CTAs 38 px below that. All of this is put in front of **one visual that literalises the product's name or verb**:
- a cave mouth framing the Golden Gate for "Never Build Alone";
- a pixel volcano for Volcano;
- a green dot-matrix market chart for "Alpha for everyone";
- database tiles wired into one glowing core for "Sync Data";
- a conveyor that eats tax forms for "E-File in Seconds";
- an org chart drawn as Google Maps for TeamOS.

The type and buttons are deliberately ordinary and consistent: Inter or Geist, a pill or a plain box, one accent colour. **All the variety lives in the visual concept and the layout family**, never in the type tuple. Ten families cover all 55 heroes. Splits (F3, 15) and centred-over-scene (F2, 10) dominate, with the product-first centred hero (F1, 9) third. He changes family from client to client, and inside a family the visual world changes completely. That is why the portfolio never looks repeated, while our heroes (always F1 or F5, product + gradient) do.

**Method.**
- **Sources.** Case originals at exact 2x (a 1px rule = 2 identical device px). Swipe-file exports at 1590 wide (1.1042 px per CSS px, checked on the Volcano pixel grid: 25 cell edges fit a 17.75 px pitch within 0.8 px). X `name=orig` files. Live DOM for the sites still up.
- **Probes.** `kargul-heroes/_scripts/kh.py` (ink bands, word boxes, flood-fill buttons with a radius fit, row/col runs). Fonts were solved from line + word ink widths with `fontsolve.mjs`, over 50 Google families, Fontshare and the system fonts.
- **Exclusions.** Gaps are ink to ink. Presentation crops and video stills (precision `crop`/`V` in `measured.tsv`) are counted for family and visual but excluded from the medians.

## 1. Core ideas

1. **The visual is the idea, and it is the product's name made literal.** In 46 of 55 heroes the largest element is a bespoke illustration, scene, diagram, pattern or composed product shot that only that client could own. The metaphor is concrete and usually comes from the brand name or the headline's verb:
   - Volcano → erupting pixel volcano;
   - Supermetal "Speed of Light" → converging fibre lines;
   - Valius "every cancer cell has a weakness" → a grid of cells fusing into chains;
   - Hunt "See what other feeds miss" → threat nodes lighting up on a hex world map;
   - 43 "Never Build Alone" → explorers in a cave looking out.

   This is the missing ingredient in our r1/r2 heroes.
2. **Ten layout families, changed per client.** None dominates: F3 15, F2 10, F1 9, F5 4, F6 4, F7 4, F4 3, F9 3, F10 2, F8 1. Light 31 / dark 23 / both 1. He never ships two neighbouring cases in the same family + world.
3. **The type tuple barely moves.** h1 median 64 px (IQR about 56-72), weight 500 (21; 400 is next with 15, 600 has 10), tracking -0.03em (range -0.06..0). 2 lines, 6 words, sentence or Title Case about equally (27/26). Faces: Inter or Inter Display (DefendLab, AM Trades, UniOps, RunInfra, Hunt, Volcano line 2), Geist (ZeroLeaks, SideShift, ecom.jobs, kargul.studio), and the brand face only when the brand owns one (Chakra Petch for Supermetal, Cy Grotesk for Gopher, TWK Lausanne for Uplinq, Manrope for Ostium and Stardust). Serif h1s, 8 of 55, appear only in VC, legal, tax, AI-assistant and oncology brands (43, Boomtax, Chatsheet, Lemon, Opsis, Valius, sf-tensor, Lemon live).
4. **Rhythm is tight on top, generous under the CTAs:**
   - h1 → sub 24 (12-37.5);
   - sub → CTA 38 (15-57);
   - CTA → next element 70 (0-390);
   - h1 cap top at about 176 in centred folds.

   The copy block is compact; the visual takes the room.
5. **CTAs are ordinary on purpose.** Primary median height 44-47 (36-57; Rork's composer is 175). 26 of 51 are pills, 10 are radius-0 boxes (Boomtax, Opero, Opsis, RunInfra, Supermetal, Volcano, Valius, hgrid ...) and 15 are rounded 4.5-16. The primary is the one accent colour (or ink); the secondary is white or neutral with a hairline. **Only the brand-shape detail is special:** Supermetal's 19 px chamfer, Agent Arcade's rainbow ring, Volcano's `npm install` chip as the second CTA, Allo's phone-number field.
6. **What sits above the h1 is optional (15/55), and it is factual when present.** A stat pill (Agent Arcade "$ 2,452,236 total traded", ecom.jobs "19,943 live roles"), an announcement (ZeroLeaks "Starter now includes a 14 Day Trial", TxtCart "RCS Messaging →"), a backer line (RunInfra "Backed by Y Combinator"), a caps eyebrow (Lemon, ecom.jobs, RebelAudio), the logo alone (Opsis). Never a decorative chip. Gap above → h1 cap: 34.5 median (16-46; 106 for Opsis's logo).
7. **Below the CTAs: proof or the product, never bullets.** Kinds seen:
   - logo strip (Gopher, Boomtax, Breez, Opero, Altrina, SideShift, Rork);
   - meta line (Supermetal "Built in Rust and Apache Arrow");
   - stat columns (Ostium);
   - integration discs (DefendLab);
   - a product action card (Volcano "Using Cursor?", RunInfra composer, UniOps dock);
   - or directly the visual.
8. **Light is emitted by the subject, not painted behind the type.** In dark heroes the colour comes from the visual itself: the Supermetal core's floor glow, Breez's orange fibre streak, Hunt's node glows, the AM Trades window rim light, the 43 painting. The canvas stays `#000`-`#121212`. In light heroes colour arrives as a field that rises from the bottom or the sides (DefendLab green, UniOps sky, TxtCart sky stage, Cashflow mint) while the copy column stays near-white.
9. **Hairline structure is a recurring frame** (9 of 55):
   - rails at the content edges (Chatsheet x40/1400, Supermetal 139.5/1300 with stripe texture outside, RunInfra dotted, Lemon);
   - cell grids (Gopher nav cells and logo strip, Boomtax);
   - full page frames (Altrina panel, Opsis cream frame, UniOps window).

   It makes a quiet light fold look engineered rather than empty.
10. **One accent per fold.** Every hero holds to neutrals + one hue, or one gradient used once. The hue appears in at most three places: primary CTA, the visual's hot spot, and optionally one word of the h1 (TxtCart "converts", ZeroLeaks "AI Systems", RebelAudio "you think").

## 2. Census

### 2.1 Families (55 distinct heroes)

| Family | n | Light/dark | h1 median | sub gap | CTA gap | CTA h | Examples |
|---|---|---|---|---|---|---|---|
| F1 centred copy over the product | 9 | 7/2 | 56 / 500 | 17 | 37 | 38 | DefendLab, AM Trades, UniOps, ZeroLeaks, TxtCart, Cashflow, ecom.jobs, Scrapeon, Flowpilot |
| F2 centred copy over a scene or illustration | 10 | 6/4 | 70 / 500 | 25 | 37 | 50 | 43, Chatsheet, Boomtax, Lemon, MFC desk, TeamOS map, Stardust orb, Metricly, InboxWarden, specs waitlist |
| F3 split: copy left, visual right | 15 | 7/8 | 64 / 500 | 23 | 41 | 42.5 | Breez, Opero, Ostium, Volcano, Minto, Valius, Adam 3D, hgrid, Uplinq, Hunt find, SideShift UGC, Signlio, campaigns, sf-tensor, 43 apply |
| F4 visual first, copy anchored at the bottom | 3 | 1/2 | 70 / 600 | right column | 35 | 33 | Hunt, Altrina, Allo |
| F5 split header (h1 left, sub + CTAs right) over the product | 4 | 2/1 (+1 both) | 68 / 500 | n/a | n/a | 40 | BugScout, LeadBurst, RebelAudio, ecom.jobs live |
| F6 prompt-first: the composer is the CTA | 4 | 2/2 | 64 / 530 | 25 | 25 | 51 | Rork, RunInfra, Lemon live, RunInfra prompt page |
| F7 typographic centred (type + one trick) | 4 | 3/1 | 64 / 575 | 28 | n/a | 54 | kargul.studio, ListKit (struck number), SideShift live (gradient text), ZeroLeaks community |
| F8 flat brand illustration panel | 1 | 1/0 | 69 / 500 | none | none | none | brand "expenses" sheet |
| F9 centred over a system diagram | 3 | 1/2 | 64 / 500 | 33 | 30.5 | 41 | Supermetal, Agent Arcade, Metricly |
| F10 centred over a generative field | 2 | 1/1 | 63 / 400 | 19 | 35 | 44 | Gopher dot market, Opsis grain ribbon |

### 2.2 Medians (pixel-precise rows only; n in brackets)

| Measure | Median | Range | n |
|---|---|---|---|
| h1 size | 64 | 40-86 | 41 |
| h1 weight | 500 | 400-700 (500: 21, 400: 15, 600: 10, 700: 5) | 54 |
| h1 tracking | -0.03em | -0.06..0 | 45 |
| h1 lines / words | 2 / 6 | 1-3 / 3-19 | 45 |
| h1 cap top (centred and split) | 175.5 | 116-643 | 30 |
| element above the h1 | none in 40/55 | stat pill, announcement, backer, eyebrow | 55 |
| gap above-element → h1 ink | 34.5 | 16-106 | 11 |
| gap h1 → subtitle ink | 24 | 12-37.5 | 27 |
| gap subtitle → CTA box | 38 | 15-57 | 27 |
| primary CTA height | 47 (44 without composers) | 28.5-57 (175) | 35 |
| CTA corner | pill 26, square 10, r 3-16: 15 | | 51 |
| gap CTA → next element | 70 | 0-390 | 25 |
| serif h1 | 8 of 55 | | |
| one accent hue | 55 of 55 | | |

### 2.3 Signature visual, by kind (some heroes count twice)

| Kind | n | Examples |
|---|---|---|
| Isometric line art or iso glass objects | 11 | Chatsheet coin, Boomtax conveyor, Opero browsers, Lemon device, Minto keyboard, campaigns cards, TeamOS map, Allo phone, specs tickets, Uplinq cylinder, hgrid terrain |
| Real product UI as the visual | 13 | DefendLab, AM Trades, UniOps, ZeroLeaks, Cashflow, ecom.jobs, Flowpilot, LeadBurst, BugScout, RebelAudio, Rork phones, TxtCart phone, Scrapeon |
| Emitted light / glow objects (dark) | 7 | Breez fibres, Hunt nodes and hex token, Stardust orb, Supermetal core, Adam 3D, AM Trades rim light |
| Generative pattern | 7 | Gopher dot chart, Opsis particle ribbon, Altrina line-wave, Valius cell lattice, ZeroLeaks halftone arcs, InboxWarden ribbons, Agent Arcade orbits |
| Cinematic painting or photo | 4 | 43 cave, Ostium monolith, MFC desk still life, Scrapeon blurred grass |
| Pixel art | 3 | Volcano, RunInfra pixel words, Volcano live |
| Type trick only | 4 | kargul.studio, ListKit, SideShift gradient, SideShift toggle word |

## 3. What makes each family work

- **F1 Centred over the product.**
  - The copy block is small (56/500), so the product starts high: CTA → frame 41-151 px.
  - The product sits in a frame that is part of the background: DefendLab's glass frame (1px white ring, 18% white, r26) on a green field; AM Trades' window with a blue rim light along its top; UniOps' real browser + macOS dock on a sky gradient.
  - What earns it: the frame material and the field are bespoke to the brand; the product is real and dense (KMD rules).
- **F2 Centred over a scene.**
  - The h1 gets bigger (70) because the scene sits below or around it, not behind it.
  - The scene starts 43-60 px under the CTAs and is cut by the fold.
  - The scene is the metaphor (cave, conveyor, coin, desk, map). Colour comes from the scene; the page stays neutral (`#f5f6f7`, `#fafafa`, `#000`).
- **F3 Split.** Copy at a 40-110 px gutter, left-aligned, the visual in the right 55-60%. The visual bleeds off the right edge or the fold (Volcano, Ostium, Minto, Opero). The split is the most common family because it lets the visual be huge without fighting the type. Dark splits put emitted light on the right (Breez, Adam, Uplinq).
- **F4 Visual first.** The visual fills the top 60-70% (Hunt map, Altrina wave, Allo phone). The h1 is anchored bottom-left at 70-80 px, with the subtitle and CTA in a right column on the same baseline band. It reads as a poster: use it when the visual is strong enough to be the first read.
- **F5 Split header over the product.** The h1 sits left; the subtitle and CTAs sit right, top-aligned with the h1. The product spans the width below. It saves 100+ px of height, so the product starts around y 300.
- **F6 Prompt-first.** The CTA is a working composer: Rork's 175-tall textarea with attach, Public toggle and round send; RunInfra's model + engine selects; Lemon's voice transcript chip. Proof (backers) sits right under it. It only works for products whose first action is typing.
- **F7 Typographic.** Used for the studio site and sub-pages. One trick carries it: a struck-through number (ListKit "5,000 1,000"), gradient-clipped text (SideShift), an availability pill (kargul.studio). Larger CTAs (54-56).
- **F8 Flat brand panel.** Highlighter-box words and flat donut / bar shapes on a cream panel. A brand-sheet hero; rare on live sites.
- **F9 Centred over a system diagram.** The product's architecture drawn as the visual: sources → core (Supermetal), LLM planets orbiting an arcade cabinet (Agent Arcade), app icons orbiting an orb (Metricly).
  - Symmetric about the copy axis, with lines converging below the CTAs.
  - Measured on Supermetal: 16 tiles in staggered columns, 1px `#2a2a2a` wires, 7 px nodes with orange dashed lead-ins, a 179 px core with the brand mark and an orange floor glow.
- **F10 Centred over a generative field.**
  - A procedural pattern that is also data. Gopher: 1060 dots on a 12.36 px lattice, radius quantised 1-3 px, grey `#e3e3d7` vs green `#018440`, drawn as two rising bar clusters that leave the copy column empty.
  - Opsis: a grain ribbon twisting through constellation points.
  - Cheap to build and impossible to mistake for a template.

## 4. Rules

- **RULE KH-01** Give every hero one signature visual that literalises the product's name or headline verb (a volcano for Volcano, a conveyor for "E-File in seconds", converging wires for "Sync data"). A product screenshot on a gradient is not a visual idea unless the frame or field is itself owned.
  **Why** 46/55 Kargul heroes lead with a bespoke metaphor. The founder's r2 reject was "no extra visual ... idea".
  **Applies to** landing/hero. **Check** visual: DIRECTION.md names the metaphor in one sentence and which word of the h1 it literalises. **Source** census §2.3; `sheets/*.jpg`

- **RULE KH-02** Pick the layout family before anything else, and never reuse the previous build's family + visual world. Choose from the ten in §2.1.
  **Why** He rotates families across clients (no family above 27%); our heroes have been F1/F5 every time.
  **Applies to** hero. **Check** DIRECTION.md `family: F#` differs from the last ledger hero, or the world differs completely. **Source** §2.1

- **RULE KH-03** Keep the h1 tuple boring and consistent: 56-72 px (64 median), weight 500 (400 for display or brand faces, 600 only when heavy is the brand), tracking -0.02 to -0.05em, 2 lines, 4-8 words.
  **Why** 41 measured h1s cluster here. Variety comes from the visual, not the type.
  **Applies to** hero. **Check** computed style on `h1`. **Source** §2.2; replicas A-D (Inter 70/500/-0.05em, General Sans 92/400, Chakra Petch 64/500/-0.03em, Inter 64.5/650/-0.05em)

- **RULE KH-04** Set h1 → subtitle at 14-28 px ink to ink (24 median) and subtitle → CTA at 30-46 (38 median). The CTA → visual gap is 40-110, unless the visual surrounds the copy.
  **Why** It is a measured rhythm: compact copy, generous release into the visual.
  **Applies to** hero. **Check** ink boxes via `kh.py bands` on the render. **Source** §2.2; DefendLab 14/54, Supermetal 19/39, AM Trades 16/30.5, Chatsheet 37.5/57

- **RULE KH-05** The subtitle is 2 lines (3 at most), 15-20 px, one grey (`#707070`, `#a0a0a0`, `#b2b2b2`, `#4d5d67`) and balanced. Never put a bullet list under the h1.
  **Why** 27 of 27 measured subtitles.
  **Applies to** hero. **Check** subtitle line count <= 3; colour is not ink. **Source** measured.tsv `subtitle`

- **RULE KH-06** Two CTAs: primary = the accent (or ink) fill; secondary = white or neutral with a 1px hairline (`#efefef`, `#e3e3d7`, `#282828` on dark). Same height, 13-15 px apart.
  **Why** Every two-button hero follows it (Gopher 14, Supermetal 15, DefendLab 17).
  **Applies to** hero. **Check** button boxes share a height ±1; the gap is 12-18. **Source** `kh.py cta` probes

- **RULE KH-07** Make CTA corners agree with the brand's geometry: pill when the mark is round or soft (26/51); radius 0 for technical or editorial brands (10/51); r 8-16 otherwise. One brand-shape detail is allowed (Supermetal's 19 px chamfer from its hexagon mark).
  **Why** Corner family is a brand decision, not a default.
  **Applies to** hero. **Check** rendered `border-radius` of the hero CTAs equals the DIRECTION.md corner rule. **Source** §2.2 CTA corner counts; replica C

- **RULE KH-08** Primary CTA height 40-52 (44-47 median), label 15-18/500. A composer (F6) may be the CTA at any height.
  **Why** 35 measured primaries.
  **Applies to** hero. **Check** `getBoundingClientRect().height`. **Source** §2.2

- **RULE KH-09** Leave the space above the h1 empty unless you have a fact to put there. If you do, it is one stat pill, announcement, backer line or caps eyebrow, set 16-46 px above the h1 cap (34.5 median).
  **Why** 40/55 have nothing. All 15 that have something show real information (a trading volume, a trial change, a YC badge).
  **Applies to** hero. **Check** the above-element's text contains a number, a date, a backer or a product name. **Source** §1.6; supersedes the blanket "required" in canon hero-light 2026-10-22 (see §5)

- **RULE KH-10** Below the CTAs put proof or a product action, or nothing (the visual begins). Allowed: a logo strip in hairline cells, a factual meta line ("Built in Rust and Apache Arrow"), integration discs, stat columns, or a small product action card.
  **Why** That list is exhaustive over 55 heroes.
  **Applies to** hero. **Check** visual + the element is one of the allowed kinds. **Source** §1.7; replicas B, C, D

- **RULE KH-11** Keep the copy column clean: the visual, field or pattern may surround the copy but must leave a clear corridor under the h1 and subtitle (Gopher's dots stop at x 320 / 1120; Supermetal's tiles start at y 470; DefendLab's traces avoid the copy box).
  **Why** Every busy visual he draws is masked away from the type.
  **Applies to** hero. **Check** the pixel std inside the copy bbox + 24 px equals the background. **Source** replicas A, C, D

- **RULE KH-12** In dark heroes, light comes from the subject: a glow under the core, a rim on the product window, emitted fibres. The canvas stays `#000`-`#121212` and flat.
  **Why** Supermetal (`#111` + orange floor glow), AM Trades (`#121212` + blue rim), Breez, Hunt, 43.
  **Applies to** hero, dark. **Check** canvas pixels outside the visual's bbox are within 3 L* of the base. **Source** §1.8; matches `dark-mode-premium.md`

- **RULE KH-13** In light heroes, colour arrives as a field that rises from the bottom or the sides toward the product (DefendLab: `#fafafa` at y 360 → `#81da9f` at the fold edge, centre stays `#f7f9f7` at y 500; UniOps sky → peach). The copy sits on near-white.
  **Why** It gives a light fold depth without a blob behind the type.
  **Applies to** hero, light. **Check** L* under the h1 >= 96; the field's chroma rises below y 450. **Source** replica D mesh `replica-data/defendlab-mesh.json`

- **RULE KH-14** Use one accent hue per fold, and in at most three places: primary CTA, the visual's hot spot, optionally one h1 word.
  **Why** 55/55.
  **Applies to** hero. **Check** saturated-pixel hue clusters = 1 (gradients count as one). **Source** §1.10

- **RULE KH-15** When one h1 word or clause carries the idea, set it apart in exactly one way: accent colour (TxtCart "converts"), a gradient (ZeroLeaks "AI Systems"), the brand's pixel or display face (Volcano "MCP-Powered", RunInfra "any" / "for"), a lighter grey (RunInfra "One winner shipped."), or a live control (SideShift toggle).
  **Why** 10 heroes use one of these. None uses two.
  **Applies to** hero. **Check** at most one styled span in `h1`. **Source** measured.tsv `h1_font`, `signature_visual`

- **RULE KH-16** Use a brand face only when the brand owns one (Chakra Petch, Cy Grotesk, TWK Lausanne, Manrope). Otherwise use Inter or Inter Display or Geist at 500, and solve the face from line widths before replicating.
  **Why** Solved fits: Inter 500-650 (DefendLab, Volcano), General Sans ≈ Cy Grotesk (Gopher), Chakra Petch (Supermetal, live-confirmed).
  **Applies to** hero, replication. **Check** `fontsolve.mjs` error < 1% on 3+ words. **Source** replicas A-D

- **RULE KH-17** Use a serif h1 only for trust or advisory categories (VC, tax, legal, oncology, assistant AI). Weight 400, tracking -0.01 to -0.04em, often with a grotesk subtitle.
  **Why** 8/55 serif, all in those categories.
  **Applies to** hero. **Check** DIRECTION.md category justification when the h1 is serif. **Source** 43, Boomtax, Chatsheet, Lemon, Opsis, Valius, sf-tensor

- **RULE KH-18** Frame quiet light heroes with hairline structure: rails at the content edges (1px, one step off the page), nav cells, or logo strips in 200-px cells. Outside the rails a texture may live (Supermetal: 9.25 px stripes).
  **Why** 9 heroes. It turns empty space into a designed grid.
  **Applies to** hero. **Check** the rails' x equals the nav content edges ±1. **Source** Gopher (220/1219, strip 474.5-566.5), Supermetal (139.5/1300), Chatsheet (40/1400)

- **RULE KH-19** Nav is quiet and on the content edges: 54-81 tall, links 14-17/400-500 grey (`#747474`, `#a0a0a0`) 20-30 apart, the right side a text link + one boxed CTA smaller than the hero CTA (36-40 tall).
  **Why** DefendLab 73 / links 16.4 `#747474` / CTA 120x40 r11; Supermetal 72 / 15 `#a0a0a0` / CTA 157x37.5; Gopher 54 cells.
  **Applies to** hero. **Check** nav CTA height < hero CTA height. **Source** replicas A, C, D

- **RULE KH-20** In F1, the product frame starts 40-150 px under the CTAs, spans >= 1340 wide (or 1024-1100 centred), and is cut by the fold. Frame it in material: a glass ring frame (1px white, 18% white, r26, 11 px inset to the app) or a rim-lit window.
  **Why** DefendLab 716/40..1384, AM Trades 526, UniOps 660, ZeroLeaks 520.
  **Applies to** hero F1. **Check** frame top <= 720; frame width >= 1000. **Source** replica D

- **RULE KH-21** In F2/F9, start the scene or diagram 25-60 px under the CTAs and build it symmetric about the copy axis. Let it converge to one focal object (the coin, the core, the cabinet) at y 600-760.
  **Why** Chatsheet, Supermetal, Agent Arcade, Boomtax.
  **Applies to** hero F2/F9. **Check** focal object centre x = 720 ±2. **Source** replica C (core 629-809, centre 719)

- **RULE KH-22** In F3, align the copy to the page gutter (40-115 px), with the h1 cap at about 145-180, and let the visual bleed off the right edge or the fold. Never box the visual in a card.
  **Why** Volcano (gutter 40), Opero (113), Breez (101), Minto, Ostium.
  **Applies to** hero F3. **Check** the visual's bbox touches x = 1440 or y = fold. **Source** replica B

- **RULE KH-23** In F4, anchor the h1 bottom-left (cap at about 620-650 of 900) with the subtitle + CTA in a right column on the same band. The visual owns the top 60%.
  **Why** Hunt, Altrina, Allo.
  **Applies to** hero F4. **Check** h1 top > 0.6 x fold height. **Source** hunt-see, altrina-01, allo

- **RULE KH-24** Draw generative fields (F10) as data, not decoration. Quantise the marks (dot radius 1 / 1.5 / 2 / 2.5 / 3 on a fixed lattice), use two tones only (inactive = hairline colour, active = accent) and shape them into a meaningful form (rising bars, a market line).
  **Why** Gopher: 1060 dots, 12.36 lattice, `#e3e3d7` + `#018440`.
  **Applies to** hero F10. **Check** marks on a lattice; 2 colours. **Source** replica A, `replica-data/gopher-dots.json`

- **RULE KH-25** Pixel art is a real grid: one cell size (16 CSS px in Volcano) and a flat palette ramp (5-7 steps per material). Dither the edge where the hero meets the next section, so that the illustration becomes the section edge.
  **Why** Volcano: 1045 cells; the black/white/blue dither rows replace a section border.
  **Applies to** hero. **Check** all cell edges on one lattice. **Source** replica B

- **RULE KH-26** System diagrams (F9) take their wiring from KMD product rules: 1px lines one step off the canvas, small square nodes (7 px), the accent only as dashed lead-ins near the nodes, logo tiles in a shared silhouette (Supermetal's chamfered 56x66).
  **Why** Measured on Supermetal. The accent is rationed to about 2% of the diagram.
  **Applies to** hero F9. **Check** wire colour = canvas + 1-2 steps; accent pixels < 3%. **Source** replica C

- **RULE KH-27** Product-proof rows go between the CTAs and the product (DefendLab: 7 white integration discs d 52, the centre one d 70 with a green halo, at y 625). They are the "what it connects to" proof, not a logo cloud.
  **Why** It reads as product capability, not social proof.
  **Applies to** hero F1. **Check** the row is centred, each element <= 72 px, and it sits above the product frame. **Source** replica D

- **RULE KH-28** Dark split heroes put the visual's light source on the far side of the copy, so the glow never sits behind the h1 (Breez's streak from the top right, Adam's magenta object right, Uplinq's cyan beams right).
  **Why** Type stays solid on near-black; the glow leads the eye to the visual.
  **Applies to** hero F3 dark. **Check** canvas L* under the h1 <= base + 3. **Source** breez-01, adam-3d, uplinq-05

- **RULE KH-29** Replicate a hero only from an original: a case CDN 2880 file (exact 2x), a swipe export (1.1042) or X `name=orig`. Check the scale on a hairline or a pixel grid before reading a number. Presentation crops (zoomed or framed) give ratios, not sizes.
  **Why** 5 case images are zoomed presentation crops (Hunt, Stardust, Uplinq, 43-09); measuring them as 2x would be 15-40% wrong.
  **Applies to** replication. **Check** `kh.py hair` returns 2-px rules; `precision` column. **Source** CREDITS.md scale checks; CSL lesson

- **RULE KH-30** Keep it to 5 units in the fold: nav, copy block (with an optional above-element), CTAs, one proof element, one visual. The visual may contain many parts, but it is one unit.
  **Why** Every measured hero stays within this, Supermetal included (16 tiles + core = one diagram).
  **Applies to** hero. **Check** count of top-level fold groups <= 6. **Source** §2.1; HC-05 agrees

- **RULE KH-31** The h1 is a promise in plain words, with no full stop or with one, Title or sentence case equally (27/26). 6 words median, about 25-35 characters per line.
  **Why** "Sync Data at The Speed of Light", "Alpha for everyone", "Clearer Calls. Faster Setup." Concrete, not clever.
  **Applies to** hero copy. **Check** words <= 9; no cliché list (`tools/thresholds.json`). **Source** measured.tsv `h1_text`

- **RULE KH-32** Light page backgrounds are tinted to the brand, never pure white unless the brand is white: cream `#fbf7eb` (Gopher), `#f9f5eb` (Lemon), cool `#f5f6f7` (Chatsheet), `#fafafa` (DefendLab), sky (TxtCart, UniOps), green-grey `#f3f5f4` (Valius).
  **Why** 22 of 31 light heroes use a non-white page.
  **Applies to** hero light. **Check** page colour != `#ffffff` or DIRECTION.md says why. **Source** measured.tsv `background`

- **RULE KH-33** Keep the ink in the brand's hue family: `#08281a` green-black (Gopher), `#0c1833` navy (Chatsheet), `#001726` (Boomtax), `#00364a` teal (Altrina), `#273f2c` (Lemon), `#150d28` violet (TeamOS). Use neutral `#1a1a1a` only for neutral brands.
  **Why** It ties the type to the visual's palette at no cost.
  **Applies to** hero. **Check** h1 colour hue is within 30° of the accent, or the brand is neutral. **Source** `kh.py` ink colours, measured.tsv

## 5. Exceptions and judgement calls

- **The canon conflict on the element above the h1.** `canon/hero-light.md` (2026-10-22) now *requires* one element above the h1. Kargul uses one in only 15/55, always with a real fact. [engine note] Keep the canon's requirement only when there is a fact to show (KH-09). Otherwise the empty top is Kargul-correct, provided the fold has a signature visual (KH-01), which was the real cause of "empty". This is flagged for the founder rather than applied silently.
- **The canon conflict on tuples.** The canon fixes 58/550 split and 68-72/550 centred with Inter display. Kargul's median is 64/500, and he uses the brand face when one exists. Both are inside the canon's tolerance except weight (550 vs 500). Not changed here.
- **Square CTAs** (10/51) contradict the canon's tactile ink r12-14. They are deliberate for technical brands (Supermetal, RunInfra, Volcano, Opero). Allowed with an `override:` line.
- **Heavy h1s** (600-700: 15/54) appear on brands with a heavy logotype (Hunt, MFC, Minto, Allo, TeamOS). The canon's "never 600-700 crushed" still applies to neutral brands.
- **Zoomed case images** are how he presents a fold in a case study. The live site may differ, and several live sites have since changed (UniOps h1 now 56 vs a framed 36-40 in the case; Lemon now serif 82). Treat the case original as his design, and the live site as a later revision.

## 6. Hero recipe book (10 concepts the engine can build from)

Each concept is a family + a visual mechanic, with the numbers to hit. Rotate: never use the same recipe on two consecutive briefs. Fill the brand world anew every time, and never reuse his scenes, copy or logos.

1. **Name-made-literal scene (F2, light or dark).** The h1 centred 70/500/-0.03em (or a serif 72/400 for trust brands). Subtitle 2 lines +25. CTAs +37, 47 tall. A scene that is the product's name or verb, starting 45 px under the CTAs and cut by the fold: an iso object, a painted key-art window, a still life. Neutral page; colour only in the scene. Refs: 43, Boomtax, Chatsheet, Lemon, MFC.
2. **System diagram converging to a core (F9, dark).** `#111` + rails at 140/1300 with a stripe texture outside. h1 64/500 in the brand face. CTA row with one brand-shape primary (chamfer, notch). A factual meta line +24. Below: 2 x 8 integration tiles in a shared silhouette, 1px wires with 7 px nodes and accent lead-ins, converging on a brand cube with an accent floor glow. Ref: Supermetal (replica C).
3. **Generative data field (F10, light).** A tinted page (cream or cool). The h1 one line 80-92/400. The tagline in ink, 34 px, as a second headline. Pill CTAs +27. A dot lattice (12 px pitch, radius quantised 1-3, two tones) shaped as the product's data (bars, a curve, a map), cleared around the copy column. A logo strip in 200 px hairline cells closes the fold. Ref: Gopher (replica A).
4. **Pixel / voxel world split (F3, dark).** Copy at a 40 gutter. One h1 line in the brand's pixel face, one in Inter 650. A square accent CTA + a code chip as the secondary. A product action card under the CTAs. A pixel illustration of the name on the right, on a 16 px grid, dithering into the next section. Ref: Volcano (replica B).
5. **Product on a rising colour field (F1, light).** `#fafafa` page with faint brand-specific line traces (circuits, routes, waveforms) around the copy. h1 70/500/-0.05em, 2 lines. CTAs: tactile ink + hairline white, r15. An integration-disc row at y 625. The product in a glass frame (r26, 1px white, 18% white) from y 716 on a brand-hue field that rises from the sides. Ref: DefendLab (replica D).
6. **Rim-lit product window (F1, dark).** `#121212`. h1 56/400/-0.05em, 2 lines, ink white. Subtitle grey +16. Small 36-40 CTAs (accent + dark). The product window from y 526 with a 1-2 px accent rim light along its top edge and a glow spilling up. Ref: AM Trades.
7. **Visual-first poster (F4, dark or light).** The visual (a map with live nodes, a wave, an iso phone) fills the top 60%. h1 70-80/600 bottom-left. Subtitle + one pill CTA in a right column on the same band. Optional mono labels on the visual's nodes. Refs: Hunt, Altrina, Allo.
8. **Prompt-first composer (F6).** h1 60-64/600 centred at about 116. Subtitle +26. The CTA is a 640x110-175 composer (placeholder, attach, toggle, round send) +22. "Backed by" logos +50. Product evidence (phones or results) below. Refs: Rork, RunInfra, Lemon live.
9. **Split header over a gradient product row (F5, light).** The h1 left 64-68/500. The subtitle + 2 CTAs right, top-aligned with the h1. Below, 3 product cards (or one wide dashboard) on a soft multi-hue gradient that saturates toward the bottom. The product starts around y 300. Refs: BugScout, LeadBurst, RebelAudio (giant brand swoosh behind).
10. **Typographic trick (F7).** Type only, h1 64-72/500-600, with one live trick in the h1: a struck-and-replaced number, a toggle between two words, gradient-clipped text, a stat pill above. Large CTAs (54). The fold closes with a logo row. For studio, sub-page or launch heroes. Refs: ListKit, SideShift, kargul.studio.

## 7. Figures worth keeping

- `knowledge/benchmarks/kargul-heroes/sheets/f1-centred-over-product.jpg` … `f10-centred-over-a-generative-field.jpg`: the ten families side by side.
- `work/replicas/cmp-kheroa..d-side.png` / `-overlay.png`: the four replicas against their originals.
- `originals/x-gradient-grid-2087115320418811976.jpg`: six F1/F2/F5 concepts on soft gradients in one post (his own "a simple gradient is sometimes all you need").

## 8. Open questions

- No Dribbble, Behance or other portfolio exists (404/400), and the X mirror ends at 12 Aug 2026. Heroes posted before that date that never became case studies or swipe entries are not covered.
- The swipe file's 313 "product" images were not opened at full size (they are product UI by manifest category). A few may be hero folds misfiled as product.
- The brand face on Gopher (Cy Grotesk) and the serif on 43 / Boomtax were not identified exactly. The fits are closest free families.
- Per-family numbers for F4, F5, F8, F9 and F10 rest on 1-4 heroes each. Treat them as directions, not canon.
