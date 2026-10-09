---
source: live-site measurements (Playwright/Chromium 1243, 1440x1000 @2x, 2026-10-09) of 50 premium SaaS/AI hero h1s; fonts.google.com CSS2 API; npm registry (@fontsource, @fontsource-variable 5.3.x); specimen render + visual tuning
chapter: Type voices: 16 free, premium hero type systems for SaaS and AI-SaaS
pages: n/a (web research)
topic_tags: [typography, type-voice, hero, headline, font-pairing, variety, google-fonts, fontsource, variable-fonts, opsz, wdth, tracking, leading]
status: studied
companion: knowledge/web/typography.md, knowledge/web/font-catalogue.md, system/variety/type-voices.json, system/variety/type-specimen.html
---

# Type voices: 16 premium hero type systems

Problem: engine heroes converged on one voice (Inter or Geist, weight 600, tight tracking). Premium SaaS does not look like that on average. This file measures what 50 premium sites actually ship in the hero h1, and turns it into 16 distinct, free voices (display + body + mono) with exact 1440 specs. Data: `system/variety/type-voices.json`. Visual proof: `system/variety/type-specimen.html` -> `knowledge/benchmarks/variety/type-specimen.png`. Raw evidence: `knowledge/benchmarks/variety/type/measurements.json` and one h1 crop per site (`<site>.png`).

Does not duplicate: `typography.md` (scale, tracking-by-size, leading, loading, fallbacks) and `font-catalogue.md` (134 faces, metrics, pairing recipes, licences). This file is the layer above: which *voice* a hero speaks in, and how to set it.

Founder rules that bind every voice (`knowledge/founder/founder-taste.md`): hero headline in Title Case, two lines maximum at desktop, no full stop. Body, buttons and labels stay sentence case. Button labels stay on the body face at Kaching spec (18px, -0.54px), never the display face.

Evidence tags: **[M]** measured here; **[E]** judgement from the specimen.

## 1. What 50 premium heroes actually ship [M]

Method: first visible h1 (or largest top text when the h1 is tiny or missing), computed `font-family`, size, weight, `letter-spacing / font-size` (em), `line-height / font-size`, `font-feature-settings`, `font-variation-settings`; body = first text block under the h1 (often the lead; indicative). Cookie banners hidden with CSS only. Dropped: openai.com, perplexity.ai, tldraw.com (no marketing h1 rendered), diabrowser.com (h1 was a promo banner). Are.na (19px) and Cursor (26px) are deliberate small-headline sites and are excluded from the aggregates.

| Site | H1 face | Size | Wt | Track em | Lead | Features | Body (size/lead) |
|---|---|---|---|---|---|---|---|
| retool | Saans | 72 | 300 | -0.022 | 1.05 |  | system 16/1.5 |
| stripe | Sohne var | 48 | 300 | -0.02 | 1.15 | ss01 | Sohne 32/1.1 (lead) |
| elevenlabs | Waldenburg | 48 | 300 | -0.02 | 1.083 |  | Inter 14/1.286 |
| linear /method | Tiempos Headline | 128 | 400 | 0 | 1.0 |  | Inter Variable 17/1.6 |
| sanity | Waldenburg | 112 | 400 | -0.04 | 1.0 | calt 0 | Waldenburg 32/1.1 (lead) |
| resend | Domaine | 96 | 400 | -0.01 | 1.0 | ss01 ss04 ss05 ss11 | Inter 18/1.5 |
| cohere | CohereText | 96 | 400 | -0.02 | 1.0 |  | Unica77 18/1.4 |
| tailwindcss | Inter | 96 | 400 | -0.05 | 1.0 | cv02 cv03 cv04 cv11 | Inter 18/1.556 |
| descript | gamuthDisplay (serif) | 88 | 400 | 0 | normal | calt liga | Booton 18/1.5 |
| granola | Quadrant (slab-ish serif) | 86.4 | 400 | -0.02 | 0.93 |  | Melange 20/1.4 |
| plain | ABC Favorit | 80 | 400 | -0.02 | 1.0 |  | ABC Favorit 24/1.167 |
| harvey | Harvey Serif | 72 | 400 | -0.0125 | 1.05 | calt liga | Harvey Sans 14/1.3 |
| oxide | Suisse Intl | 65 | 400 | -0.025 | 1.0 |  | Suisse Intl 25/1.28 |
| sierra | GT America | 65 | 400 | -0.02 | 1.108 |  | GT America (lead) |
| vercel | Geist | 64 | 400 | -0.06 | 1.0 | calt 0 rlig ss11 | Geist 24/1.333 |
| ramp | Lausanne | 64 | 400 | 0 | 1.0 | ss01 | Lausanne 18/1.333 |
| every | Signifier (serif) | 64 | 400 | -0.04 | 0.9 | pnum | Switzer 16 |
| warp | Azeret Semi Mono | 54 | 400 | -0.037 | 1.05 |  | Azeret Semi Mono 16/1.65 |
| mintlify | Arizona Flare (serif) | 50 | 400 | -0.04 | 1.04 |  | Inter 18/1.333 |
| modal | ABC Diatype | 44 | 400 | 0 | 1.091 | cv11 | ABC Diatype 14/1.714 |
| runwayml | ABC Normal | 40 | 400 | -0.0125 | 1.15 |  | ABC Normal 20/1.55 |
| cognition | NB International | 36 | 400 | -0.02 | 1.1 |  | STK Bureau Serif 15/1.5 |
| krea | Suisse Intl | 60 | 450 | 0 | 1.0 |  | Suisse Intl 24/1.333 |
| superhuman | Super Sans VF | 49 | 460 | -0.0275 | 1.2 |  | Super Sans 14/1.2 |
| mercury | Arcadia Display | 49.4 | 480 | 0 | 1.1 |  | Arcadia 21/1.35 (wt 360) |
| mistral | ALT Mistral | 96 | 500 | -0.02 | 1.0 |  | ALT Mistral 16/1.5 |
| fly | Mackinac (soft serif, opsz 24) | 72 | 500 | -0.02 | 0.95 |  | Fricolage Grotesque 20.5/1.35 (wt 325) |
| family | Family | 68 | 500 | -0.02 | 1.1 |  | Inter 17/1.529 |
| factory | Geist (uppercase) | 60.5 | 500 | -0.04 | 1.0 |  | Geist 16/1.2 |
| framer | GT Walsheim Medium | 54 | 500 | -0.04 | 1.0 | ss02 | Inter Variable 18/1.35 |
| railway | IBM Plex Serif | 54 | 500 | -0.036 | 1.12 |  | Inter 18/1.6 |
| dub | Satoshi | 48 | 500 | 0 | 1.15 |  | Inter 20/1.4 |
| supabase | Manrope | 46 | 500 | 0 | 1.0 |  | Inter 14/1.429 |
| browserbase | GT Planar | 45 | 500 | -0.02 | 1.15 |  | Plain 20/1.16 |
| linear | Inter Variable | 64 | 510 | -0.022 | 1.0 | cv01 ss03 | Inter Variable 15/1.6 |
| clay | Roobert VF | 88 | 575 | -0.04 | 1.0 | ss01 ss03 ss10 ss11 ss12 | Roobert 14/1.3 |
| notion | NotionInter | 96 | 600 | -0.048 | 1.042 |  | NotionInter 20/1.4 |
| basement | Geist | 87 | 600 | -0.04 | 0.897 | ss01 | Geist 20 |
| attio | Inter Display | 69.3 | 600 | -0.024 | 0.95 | ss03 | Inter 18/1.3 |
| raycast | Inter | 64 | 600 | 0 | 1.1 | liga 0 ss02 ss08 | Inter 18 |
| cal | Cal Sans | 64 | 600 | 0 | 1.1 |  | Cal Sans UI Light 16/1.5 |
| campsite | Inter | 57.6 | 600 | -0.031 | 1.0 |  | Inter 22.4/1.5 |
| lovable | Camera Plain Variable | 48 | 600 | -0.04 | 1.1 |  | Camera Plain 18/1.333 |
| pitch | Mark Pro Bold | 180 | 700 | -0.04 | 0.8 | blwf cv03 cv04 cv09 cv11 | Eina 03 18/1.6 |
| hex | PP Formula SemiExtended | 74 | 700 | -0.025 | 1.2 |  | Cinetype 14/1.571 |
| replicate | rb-freigeist-neue | 72 | 700 | -0.025 | 1.0 |  | Basier Square 14/1.429 |
| anthropic | Anthropic Sans | 60.9 | 700 | 0 | 1.1 |  | Anthropic Serif 24/1.4 |
| arc | Marlin Soft SQ | 45.5 | 700 | -0.04 | 0.928 |  | ABC Oracle 20/1.2 |
| posthog | RoundHog | 36 | 800 | -0.025 | 1.111 |  | RoundHog 17/1.5 |
| rive | Orbitron (uppercase) | 40 | 900 | +0.01 | 1.2 |  | Inter 16/1.6 |

Aggregates (n = 50):

- **Weight**: 300: 3 · 400-450: 20 · 460-550: 12 · 560-650: 8 · 700+: 7. The modal premium h1 is **regular 400**, not 600. The engine default (600, tight) is 16% of the sample.
- **Face**: Inter/Geist (incl. NotionInter, Inter Display) on 9 of 50 h1s (18%). 41 of 50 use something else, most of it commercial (Suisse, Sohne, Favorit, Diatype, Roobert, GT America, Domaine, Signifier, Tiempos).
- **Serif display**: 9 of 50 (18%: Resend, Granola, Mintlify, Railway, Every, Fly, Harvey, Linear Method, Descript). Weights 7x400, 2x500, none bold. Size median 72 vs 64 for sans; tracking median -0.02; leading median 1.0 (Every 0.9, Granola 0.93, Fly 0.95).
- **Tracking**: sans median -0.022, serif median -0.02; range +0.01 (Rive caps) to -0.06 (Vercel). 11 of 50 ship 0, almost all on custom display cuts drawn tight (Cal Sans, Arcadia Display, Lausanne, Suisse, Diatype).
- **Leading**: sans median 1.04, serif 1.0; < 0.95 only at >= 45px with heavy or serif faces (Pitch 0.8, Basement 0.897, Every 0.9, Arc 0.928, Granola 0.93).
- **Display != body family**: 22 of 50. Every serif, rounded and mono-voiced display (except Warp) hands body text to a separate sans.
- **Stylistic sets on the h1**: 17 of 50 set `font-feature-settings` (ss01 most common: Stripe, Ramp, Resend, Basement, Clay).

## 2. The 16 voices

All OFL, all on Google Fonts and Fontsource (packages verified on npm, 5.3.x, 2026-10-09). Size, weight, tracking (em) and leading are the hero spec at 1440; mobile size is for 390. Full fields, Google CSS URLs and specimen copy are in `type-voices.json`.

| # | Slug | Display (spec at 1440) | Body | Mono | Personality | Measured analog |
|---|---|---|---|---|---|---|
| 1 | geometric-studio | Outfit 500 · 76 · -0.035 · 1.0 | Onest 18/1.55 | DM Mono | round-shouldered, crafted, design-tool optimism | Framer GT Walsheim 54/500/-0.04/1.0 |
| 2 | light-grotesk | Hanken Grotesk 300 · 76 · -0.03 · 1.04 | Hanken Grotesk 19/1.55 | Source Code Pro | quiet authority; large and light | Stripe Sohne 48/300/-0.02/1.15; Retool Saans 72/300; ElevenLabs 48/300 |
| 3 | swiss-regular | Host Grotesk 400 · 80 · -0.025 · 1.0 · word-spacing -0.1em | Host Grotesk 18/1.5 | JetBrains Mono | Swiss, engineered, unbothered | Oxide Suisse 65/400/-0.025/1.0; Krea, Ramp, Modal, Sanity |
| 4 | character-grotesk | Funnel Display 500 · 84 · -0.03 · 0.98 | Funnel Sans 18/1.5 | Fragment Mono | opinionated grotesk with drawn quirks | Clay Roobert 88/575/-0.04/1.0 + 5 stylistic sets; Plain Favorit 80/400 |
| 5 | gothic-heavy | Special Gothic 700 (wdth 100) · 80 · -0.025 · 0.98 | Public Sans 18/1.55 | IBM Plex Mono | newsroom punch, blunt | Replicate Freigeist 72/700/-0.025/1.0; Lovable Camera 48/600/-0.04 |
| 6 | humanist-warm | Commissioner 480 · 72 · -0.02 · 1.06 | Commissioner 360 19/1.5 | Red Hat Mono | human, calm, founder-facing | Mercury Arcadia Display 49/480/0/1.1, body 21/360 |
| 7 | editorial-serif | Newsreader 400 (opsz 72) · 92 · -0.02 · 1.0 | Inter 18/1.5 | JetBrains Mono | literate, writerly | Resend Domaine 96/400/-0.01/1.0; Every Signifier 64/400/-0.04/0.9 |
| 8 | transitional-serif | Source Serif 4 450 (opsz 60) · 76 · -0.02 · 1.05 | IBM Plex Sans 17/1.6 | IBM Plex Mono | institutional, accountable | Harvey Serif 72/400/-0.0125/1.05; Railway Plex Serif 54/500 |
| 9 | soft-serif | Fraunces 500 (opsz 144, SOFT 100, WONK 0) · 84 · -0.025 · 0.98 | Figtree 18/1.55 | DM Mono | warm, cooper-soft, modern | Fly Mackinac 72/500/-0.02/0.95 (opsz 24) |
| 10 | slab-notepad | Zilla Slab 500 · 84 · -0.02 · 0.96 | Source Sans 3 19/1.5 | Red Hat Mono | notebook, typewriter, analogue | Granola Quadrant 86.4/400/-0.02/0.93 |
| 11 | didone-luxe | Bodoni Moda 500 (opsz 72) · 88 · -0.025 · 1.0 | Hanken Grotesk 18/1.55 | IBM Plex Mono | private-client, expensive | none in sample (open lane); nearest Resend Domaine 96/400 |
| 12 | mono-terminal | Azeret Mono 400 · 64 · -0.045 · 1.05 · word-spacing -0.25em | Geist 17/1.6 | Azeret Mono | terminal-native, agentic | Warp Azeret Semi Mono 54/400/-0.037/1.05 |
| 13 | wide-extended | Mona Sans 650 (wdth 112.5) · 72 · -0.03 · 1.02 | Mona Sans 400 (wdth 100) 18/1.5 | Martian Mono | broad-shouldered, architectural | Hex PP Formula SemiExtended 74/700/-0.025/1.2 |
| 14 | condensed-statement | Archivo 700 (wdth 68) · 104 · -0.01 · 0.94 | Archivo 400 (wdth 100) 18/1.5 | JetBrains Mono | scoreboard, poster, urgent | none in sample (open lane); scale ref Pitch 180/700/0.8 |
| 15 | rounded-friendly | Rubik 600 · 72 · -0.03 · 0.98 | Rubik 18/1.55 | DM Mono | soft corners, tactile, approachable | Arc Marlin Soft SQ 45.5/700/-0.04/0.93; PostHog RoundHog 36/800 |
| 16 | variable-expressive | Bricolage Grotesque 700 (opsz 96, wdth 92) · 88 · -0.02 · 0.95 | Instrument Sans 18/1.5 | Geist Mono | inky, bold, editorial-poster | Fly body Fricolage (Bricolage derivative) 20.5/325 |

Fontsource packages: `@fontsource-variable/` + outfit, onest, hanken-grotesk, source-code-pro, host-grotesk, jetbrains-mono, funnel-display, funnel-sans, special-gothic, public-sans, commissioner, red-hat-mono, newsreader, inter, source-serif-4, ibm-plex-sans, fraunces, figtree, source-sans-3, bodoni-moda, azeret-mono, geist, mona-sans, martian-mono, archivo, rubik, bricolage-grotesque, instrument-sans, geist-mono. Static only (`@fontsource/`): zilla-slab, dm-mono, fragment-mono, ibm-plex-mono.

### Best for / never for (short)

| Slug | Best for | Never for |
|---|---|---|
| geometric-studio | design/no-code tools, builders, creative AI | legal, compliance, dense data |
| light-grotesk | payments, enterprise AI, voice AI, premium infra | consumer/playful; below 56px |
| swiss-regular | compute, cloud, AI infra, spend management | consumer social, warm brands |
| character-grotesk | GTM/enrichment, revenue, support ops | regulated finance; > ~36 chars |
| gothic-heavy | PM/shipping tools, dev APIs, manifesto launches | luxury, wellness; light weights |
| humanist-warm | startup banking, email, HR, health admin | edgy dev tools, poster statements |
| editorial-serif | AI writing/research, docs, comms APIs | gaming; > ~40 chars at 92px |
| transitional-serif | legal AI, audit/tax, insurance, enterprise knowledge | consumer, playful, neon |
| soft-serif | friendly hosting, creator tools, SMB software | security, high-frequency finance |
| slab-notepad | AI notes/meetings, journaling, research assistants | enterprise infra, luxury |
| didone-luxe | wealth, luxury commerce, art, concierge AI | dev tools; below 48px |
| mono-terminal | coding agents, CLIs, observability, security | non-technical buyers; mono body |
| wide-extended | data notebooks, BI, fintech dashboards | > 32 chars; pairing with another wide |
| condensed-statement | sports/live data, media, logistics, campaigns | quiet premium B2B; running text |
| rounded-friendly | browsers, consumer utilities, education | legal, security; light weights |
| variable-expressive | creator/media, AI audio/video, community | regulated finance; next to Clash/Syne |

### Tuning found while rendering the specimen [E]

- **character-grotesk**: Familjen Grotesk 600 was the first pick; next to gothic-heavy it read as the same heavy grotesk. Funnel Display 500 keeps the Roobert-style quirks (single-storey a, flat terminals) visible and is clearly a different voice.
- **swiss-regular**: Host Grotesk's word space is wide. At -0.03em the letters tightened and the word gaps opened ("Compute  That"). Fix is `word-spacing: -0.1em` with tracking at -0.025, not more tracking.
- **mono-terminal**: a mono space is a full cell; without `word-spacing: -0.25em` each line reads as separate words.
- **didone-luxe**: opsz 96 at 88px over-thinned the hairlines and opened a gap in "W-e"; opsz 72 at -0.025em holds. Bodoni Moda kerns W/V against lowercase loosely: avoid a leading W/V word or kern by hand.
- **variable-expressive**: wdth 85 at -0.035em made letters collide (Launch, Podcast). The opsz 96 cut is already tight, so wdth 92 and only -0.02em.
- Light (300) and didone hairlines held on the #0c0c0d dark panel at these sizes; no weight bump was needed at >= 76px.

## 3. Rules

- **RULE V-01** Default the hero h1 to weight 400-500; use 600+ only as a voice decision written in DIRECTION.md.
  **Why** In 50 premium heroes, 20 set the h1 at 400-450 and 12 at 460-550; only 8 use 560-650 and 7 use 700+. The engine's default (Inter/Geist 600, tight) matches 16% of the sample and is why builds look alike. **Applies to** hero and page h1. **Check** computed h1 `font-weight`; if >= 560, DIRECTION.md names a voice whose spec is >= 560 (gothic-heavy, rounded-friendly, wide-extended, condensed-statement, variable-expressive, character-grotesk at 500+). **Source** measurements.json (50 sites).
- **RULE V-02** Every build picks exactly one voice from `system/variety/type-voices.json`, records its slug in DIRECTION.md, and does not reuse the voice of any of the last 4 ledger entries. Inter or Geist as the h1 face needs an `override:` line.
  **Why** Only 9 of 50 premium h1s are Inter/Geist; 41 use other faces. Variety comes from the voice, not from tweaks to the same face. **Applies to** every new brand. **Check** DIRECTION.md contains `voice: <slug>`; h1 `font-family` first entry matches that voice's display family; slug not in the last 4 ledger fingerprints; h1 family not in {Inter, Geist} without an override. **Source** measurements.json; founder-taste.md (founder rules set the polish floor, not the style).
- **RULE V-03** Serif display voices stay at 400-500 and grow in size instead of weight: 72-96px at 1440, tracking -0.01 to -0.04em, leading 0.9-1.05.
  **Why** All 9 measured serif heroes use 400 (7) or 500 (2), never bold; serif size median 72px vs 64px for sans; tracking median -0.02; leading median 1.0 (Every 0.9, Granola 0.93, Fly 0.95, Harvey 1.05). **Applies to** editorial-serif, transitional-serif, soft-serif, slab-notepad, didone-luxe. **Check** serif h1: weight 400-500, size >= 72px at 1440, -0.04 <= tracking <= -0.01, 0.9 <= leading <= 1.05. **Source** Resend, Granola, Mintlify, Railway, Every, Fly, Harvey, Linear Method, Descript.
- **RULE V-04** A light (300) hero only at >= 56px (free faces) on near-black or near-white ink, with the body one weight step heavier.
  **Why** The three 300-weight heroes are 48px (Stripe, ElevenLabs) and 72px (Retool) in commercial faces with sturdier hairlines than free equivalents; Hanken Grotesk 300 needed 76px in the specimen to hold on both light and dark. **Applies to** light-grotesk and any weight <= 350. **Check** h1 weight <= 350 implies font-size >= 56px and text contrast >= 7:1; body weight >= h1 weight + 100. **Source** stripe.com, elevenlabs.io, retool.com; type-specimen.png.
- **RULE V-05** Set tracking by voice class, not one global value: neo-grotesk 400 -0.02 to -0.03; light 300 -0.02 to -0.03; heavy 600-800 -0.025 to -0.045; geometric 500 -0.035 to -0.04; mono display -0.035 to -0.045; condensed -0.01 to 0; serif per V-03. Use 0 only on faces with a drawn display cut.
  **Why** Measured: Oxide 400/-0.025, Stripe 300/-0.02, Replicate 700/-0.025, Clay 575/-0.04, Basement 600/-0.04, Framer GT Walsheim 500/-0.04, Warp mono 400/-0.037. The 11 sites that ship 0 use custom display cuts (Cal Sans, Arcadia Display, Lausanne, Suisse, Diatype); free text faces at 0 look loose at 64px+ (typography.md T-LS-01). Display mono overrides T-LS-02's "mono: 0", which is for text sizes. **Applies to** h1/h2 >= 40px. **Check** `letterSpacing/fontSize` within the voice's class band; mono display < 0 only at >= 40px. **Source** measurements.json.
- **RULE V-06** When tracking tightens a face with a wide word space (Host Grotesk, any mono), tighten `word-spacing` too: -0.06 to -0.1em for grotesks, -0.2 to -0.3em for mono display.
  **Why** In the specimen, Host Grotesk at -0.03em and Azeret Mono at -0.045em opened visible gaps between words that read as broken lines; word-spacing fixed it without over-tightening letters. **Applies to** any display line with tracking <= -0.025em. **Check** visual crop at 2x: inter-word gap <= ~0.3em of the size (sans) and <= ~0.45em (mono); `word-spacing` set where the voice JSON has `wordSpacing`. **Source** type-specimen.png tuning, 2026-10-09.
- **RULE V-07** Character display faces hand body text to a separate, quieter sans; neutral grotesk voices may run one family.
  **Why** 22 of 50 sites split display and body; every serif hero (Resend+Inter, Every+Switzer, Fly+Fricolage, Harvey+Harvey Sans, Railway+Inter, Mintlify+Inter) and the rounded/extended ones (Arc+Oracle, Hex+Cinetype) do. Single-family sites are neutral grotesks (Stripe, Ramp, Oxide, Sanity, Vercel, Krea, Modal). **Applies to** body, buttons, nav, forms. **Check** if the voice class is serif/slab/didone/condensed/wide/mono/quirky, body `font-family` differs from h1 except for the wdth-axis voices (same family at wdth 100); display face never used below 32px (catalogue C-06). **Source** measurements.json.
- **RULE V-08** Use the font's axes before adding a family: opsz on serif and expressive display (Newsreader 72, Source Serif 60, Bodoni 72, Fraunces 144, Bricolage 96), wdth for wide/condensed voices with the same family at wdth 100 for body.
  **Why** Fly ships Mackinac with `opsz 24`; the free faces' display cuts are only reached via the axis (Bodoni at the default opsz is a text cut; Archivo and Mona Sans give poster width and body from one file). **Applies to** voices with axes in the JSON. **Check** h1 `font-variation-settings` contains every axis listed in the voice's `display.axes`; the Google CSS URL requests that axis range. **Source** fly.io measurement; fonts.google.com CSS2; specimen.
- **RULE V-09** Turn on the display face's stylistic sets when it has them; check before shipping.
  **Why** 17 of 50 premium h1s set `font-feature-settings` (Stripe ss01, Ramp ss01, Resend ss01 ss04 ss05 ss11, Clay five sets, Linear cv01 ss03, Tailwind cv02-cv11). Alternates are a free way to make a shared face look owned. **Applies to** display face, and the body face when it is Inter (cv11, ss01). **Check** list the face's GSUB features (wakamaifondue.com or fontTools); if ss01-ss20 or cv01+ exist, DIRECTION.md says which are on or why none. **Source** measurements.json `features`.
- **RULE V-10** Write the headline for the voice's width: at 1440 two lines, per-line length at most ~16 chars (wide, mono), ~20 (condensed at 104px, serif at 88-92px, rounded at 72px), ~24 (neo-grotesk/geometric at 72-80px).
  **Why** Founder rule: two lines max, Title Case, no full stop. Specimen lines that held two lines: mono 64px "Code While You Sleep" = 726px; wide 72px "Ask Your Warehouse" = 727px; serif 92px "Your Board Will Read" = 842px; Outfit 76px "Your Team Can Imagine" = 741px. **Applies to** hero h1. **Check** rendered h1 line count = 2 at 1440 (Range client rects) and max line width <= 60% of the content column for left-aligned heroes. **Source** type-specimen measurements; founder-taste.md.
- **RULE V-11** Leading follows class: serif, slab, condensed and heavy display 0.9-0.98; neo-grotesk and geometric 1.0-1.04; light and humanist 1.04-1.1.
  **Why** Measured tight leading clusters on serif/heavy faces (Every 0.9, Basement 0.897, Arc 0.928, Granola 0.93, Attio 0.95, Fly 0.95); light/humanist faces sit looser (Stripe 1.15, Mercury 1.1, Superhuman 1.2) because thin strokes need air. **Applies to** h1 at >= 56px. **Check** `lineHeight/fontSize` in the class band; descenders of line 1 must not touch ascenders of line 2 in a 2x crop. **Source** measurements.json.

## 4. How to pick a voice (procedure)

1. Product world first: what does the buyer already read? (lawyers read serifs; developers read terminals; designers read geometric sans; finance reads quiet grotesks).
2. Filter `bestFor`/`neverFor` in the JSON; drop voices used by the last 4 ledger entries (V-02).
3. Render the two best candidates with the real headline at 1440 and 390 using the JSON spec (copy `type-specimen.html` panel markup), dark and light.
4. Lock it: link the voice's `googleFontsCss` for prototypes, install the Fontsource packages for builds (self-hosted, GDPR, catalogue C-09), write `voice: <slug>` and any stylistic sets in DIRECTION.md.
5. Keep the bound system's buttons and UI on the body face; the voice changes the headline and the brand feel, not the control spec.

## 5. Judgement calls

- The voices are a floor of variety, not the ceiling. A client brand can still license a commercial face; use the voice whose class it belongs to for spec and pairing.
- Uppercase heroes exist (Factory, Rive) but conflict with the founder's Title Case rule; not included as a voice.
- Italic serif accent words inside a sans headline (Hex: "*Make everyone* a data person") are an accent move, not a voice; if used, pair wide-extended or gothic-heavy with Newsreader Italic and limit to one phrase per page.
- Inter stays fine as a **body** face (editorial-serif uses it, like Resend). The problem is Inter/Geist as every hero voice.

## 6. Open questions

- Body measurements pick the first text under the h1, which on some sites is the lead (Stripe 32px, Sierra 38px, Sanity 32px); treat body numbers as indicative.
- Stylistic-set availability for the 16 free display faces was not enumerated; run V-09's check per build.
- Mobile specs (`mobileSize`) are judgement from the size bands in typography.md 3.5; not yet rendered at 390 per voice.
- Fontsource 5.3.x has no variable build for Zilla Slab, DM Mono, Fragment Mono, IBM Plex Mono; static weights are listed in the JSON.
