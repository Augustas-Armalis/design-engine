---
source: web:live measurement (Playwright/Chromium 156, 1440x900 @2x, light and dark) of linear.app, vercel.com, stripe.com, raycast.com, resend.com, attio.com, clerk.com, kargul.studio, alignui.com, untitledui.com, apple.com (iphone-17-pro, macbook-pro), vercel.com/geist/{typography,materials,button,input}, coss.com/ui (button, input) + coss registry source (coss.com/ui/r/*.json) + Tailwind v4 theme.css + inter-metrics npm source + Apple HIG typography JSON + practicaltypography.com (line-spacing, letterspacing, point-size, line-length, headings) + joshwcomeau.com (designing-shadows, 3d-button) + emilkowal.ski (7-practical-animation-tips, great-animations) + rauno.me (designing-depth, invisible details) + refactoringui.com preview (colour)
chapter: Typographic hierarchy and spacing, button anatomy, shadow craft (measured; Oct 2026)
pages: n/a (web research; raw data in knowledge/benchmarks/type-buttons/)
topic_tags: [typography, hierarchy, tracking, leading, spacing, proximity, measure, numerals, type-voice, buttons, states, focus, shadows, rings, elevation, dark-mode, inputs, geist, coss, comeau, apple-hig]
status: studied
companion: knowledge/web/typography.md, knowledge/web/color-and-surfaces.md (F, G), knowledge/web/product-ui-in-marketing.md, knowledge/web/skills-better-ui-and-emil.md
---

# Type hierarchy and spacing, button craft, shadow craft

Extends `typography.md` (scales, fluid clamp, T-SC/T-LS rules), `color-and-surfaces.md` sections F/G (shadow principles, Tailwind/Radix/M3/Comeau token tables), `product-ui-in-marketing.md` (in-app control ladder) and `skills-better-ui-and-emil.md` (press scale, icon optics). Those notes say what is good; this one adds what shipped products actually set, as numbers, plus formulas, a button matrix, a shadow token set and recipes. Where a rule already exists there it is referenced, not repeated.

Evidence tags: **[M]** measured by me with Playwright on the live page (computed styles, Oct 2026; raw JSON and 2x screenshots in `knowledge/benchmarks/type-buttons/`), **[P]** read in a primary source (docs, source code, spec), **[S]** secondary, **[E]** `[engine note]` own synthesis, tune with ledger feedback. Marketing pages change: re-measure before quoting "what X does today".

## 1. Core ideas

1. **Hierarchy is carried by three levers that move together: size, weight, tone.** Every measured hero separates H1 from lede with all three: Linear 64px/510/18.7:1 over 15px/400/6.1:1 (4.3x size, 3x tone), Apple 80px/600/15.5:1 over 17px/400. No measured site separates levels with size alone. [M]
2. **The ladder is short and steep.** H1:lede median 3.6x (range 2.4-5.3), H1:H2 median 1.5x (1.14-2.0), H2:card-title 1.7-2.8x, card-title:body 1.1-1.45x. Real pages use 5-7 sizes in marketing copy and 3 sizes (11-14px) for the whole product UI. [M]
3. **Tracking is a smooth function of size, not a per-role constant.** Fit over 42 headings (18-96px, 11 sites): `tracking_em = -0.0173 * ln(size_px / 15.3)`, zero at ~15px, -0.02em at 48px, -0.03em at 96px. Brands then pick a dial: neutral (the fit), tight (about 1.6x: Kargul -0.03, AlignUI -0.035), ultra (Geist/Vercel -0.06em from 40px up). Inter's own dynamic-metrics curve and Apple's SF Pro table are different curves for faces drawn for them. [M][P]
4. **Leading falls with size in three bands**: 1.2-1.35 for 18-24px titles, 1.1-1.2 for 28-44px, 0.95-1.1 for 48px and up (modal 1.0 at 56-72px). Text and lede stay 1.5-1.6. [M]
5. **Spacing is proximity ratio first, pixel value second.** Gap above a heading is 4x or more the gap below it at section level (Resend 96 above vs 8-12 below). h1->lede gap is 0.3-0.55x the H1 size; card title->description is 4-8px. Section padding median is 121px (IQR 96-153). [M]
6. **Three text tones are a system.** Primary 15-20:1, secondary 6-9:1, tertiary 3.4-5:1. Apple does it with one ink at three alphas (0.88 / 0.72 / 0.56 = 15.4 / 8.9 / 4.8:1); Raycast does it with white at 1 / 0.6 / 0.4. [M]
7. **Button anatomy is more regular than button style.** Padding-x is 0.35-0.5x the height, the label is 0.33-0.40x the height at weight 500-600, radius is 0.17-0.33x the height or a full pill. Style (fill, ring, gradient, depth) is where brands differ. [M]
8. **State design is small and consistent.** 0 of 68 measured hover states (12 pages, light and dark) translate or scale a button. Hover is a fill step (7-14% toward the surface for ink, 15-22% darker for a brand fill, or alpha +3-5 points for ghost/secondary); press is scale 0.97-0.98 or the hover colour; focus is a 2-3px ring offset 1-3px. Durations are 150-300ms, ease-out family. Apple.com sets 0s on its pill buttons. [M]
9. **Depth is built from a ring, an inner highlight and 1-3 soft layers, not one blurry shadow.** Measured card stacks run 1-8 layers; per-layer alpha is 0.01-0.08 on light surfaces. Dark mode swaps the shadow for a white ring (0.03-0.145) plus a 1px top highlight (0.04-0.10) and raises black alphas to 0.25-0.6. [M][P]
10. **Two shipped voices use no shadow at all**: Apple.com and kargul.studio have 0 `box-shadow` on controls and cards. Flat is valid; it then needs fill steps and radius to do the work. [M]
11. **Fonts are 30% of a type voice.** A voice is family + weight + tracking dial + leading band + case/mono labels + button label style. Switching only the family on the same settings is the "same grotesk everywhere" failure the founder called out. [E]

## 2. Rules

Format per `SCHEMA.md`. Numbers come from section 3 tables.

### 2.1 Hierarchy levers and ratios

- **RULE** Separate every adjacent type level (H1/lede, H2/card title, title/body) with at least two of three levers: size step >= 1.25x, weight step >= 100 (or 510 vs 400), tone step (contrast ratio drops by >= 35%, e.g. 18:1 -> 6:1).
  **Why** One lever alone (size) reads as scale-bloat; two levers read as hierarchy with fewer sizes. Every measured hero used all three between H1 and lede.
  **Applies to** all. **Check** for each adjacent pair compute font-size ratio, weight delta, contrast ratio of the two colours against their backgrounds; >= 2 levers pass. **Source** Linear, Apple, Resend, Attio [M]

- **RULE** Desktop H1:lede size ratio 3.0-5.3 (modal 3.6-4.4); never below 2.4.
  **Why** Measured: Linear 4.3, Raycast 3.6, Resend 5.3, Attio 3.6, AlignUI 4.4, Kargul 3.25, Stripe 3.0 (against its 16px sub text), Untitled UI 2.4 (the floor, rescued by weight 600 vs 400).
  **Applies to** landing page. **Check** h1 font-size / hero lede font-size at 1440. **Source** Linear, Raycast, Resend, Attio, AlignUI, Kargul, Stripe, Untitled UI [M]

- **RULE** Desktop H1:H2 ratio 1.3-1.7 (median 1.5); a section H2 is 40-56px when the H1 is 64-80px.
  **Why** Section headings must still read as display type. Measured: Linear 64:48, Vercel 64:56 (1.14, only outlier, tracking -0.06em does the work), Stripe 56:32/48:32, Resend 96:56, Attio 64:40, Kargul 52:36, AlignUI 80:48, Apple 80:56, Untitled UI 44:32.
  **Applies to** landing page. **Check** h1 size / first section h2 size in [1.3, 1.7] (flag > 2.0 and < 1.2). **Source** ten sites [M]

- **RULE** Card/feature title : card body = 1.1-1.45x (18-24px over 14-16px); when the ratio is below 1.25 the title must be at least 100 weight heavier.
  **Why** Titles inside grids compete with the section H2; a small size step plus a weight step keeps the card scannable without a third size. Measured: Linear 20/590 over 14/400, Resend 20 over 14, Kargul 18/700 over 14, Untitled UI 18/600 over 16/400, Apple 19.9/600 over 17/400.
  **Applies to** landing page | SaaS app UI. **Check** title size / body size; if < 1.25 then weight(title) - weight(body) >= 100. **Source** Linear, Resend, Kargul, Untitled UI, Apple [M]

- **RULE** Run product UI on three text sizes, 12 / 13 / 14px (11px only for kbd and counts), weight 510-590 for labels and 400 for values; marketing type scales do not enter the app frame.
  **Why** Linear's mock UI is 13/510 labels, 12/400 meta, 14/590 titles; Geist's label scale is 14/13/12; coss runs 14/12. A fourth size inside a card reads as noise.
  **Applies to** SaaS app UI. **Check** distinct font sizes inside the product frame <= 4; >= 90% of text in {12, 13, 14}. **Source** Linear [M]; Geist typography [P]; coss button/input [P]

- **RULE** Define three text tones and use them everywhere: primary 15-20:1, secondary 6-9:1, tertiary >= 4.5:1; express them as one ink at three alphas where the background is uniform (light: ink at 0.88 / 0.72 / 0.56 = 15.4 / 8.9 / 4.8:1 on white as Apple.com; dark: white at 0.92 / 0.60 = 17.5 / 7.3:1 as Apple dark and Raycast).
  **Why** Alpha tones stay on-hue over tinted surfaces and cannot drift. Three shipped dark pages let tertiary fall to 2.9-3.75:1 (Linear 3.44, Raycast 3.75, Attio 2.88 at 10-15px), which fails AA; do not copy that.
  **Applies to** all. **Check** contrast of every text colour on its background: tier 1 >= 15, tier 2 6-9.5, tier 3 >= 4.5; <= 3 distinct tones for body copy. **Source** Apple.com, Raycast, Linear, Attio [M]; WCAG 1.4.3

- **RULE** Eyebrow/label type is either mono 12-14px at tracking 0 (Linear Berkeley Mono 12, Vercel Geist Mono 14, Stripe Source Code Pro 12) or sans caps 11-12px at +0.06 to +0.12em (Raycast 12px/500/+0.12em), in the secondary tone, 6-16px above the heading.
  **Why** Measured eyebrow gaps are 5-24px (Raycast 5, Untitled UI 6, AlignUI 6-16, Attio 5-24); mono needs no tracking, caps do (Butterick: 5-12%).
  **Applies to** landing page. **Check** eyebrow font-size 11-14, caps letter-spacing 0.05-0.12em, gap to heading 6-24px. **Source** Linear, Vercel, Stripe, Raycast [M]; practicaltypography.com/letterspacing [P]

- **RULE** Mix weights by role: display 400-600 (modal 500-600), card titles 500-600, lede 400-500, UI labels 500-510, body 400; use variable-font in-betweens (450, 510, 550, 590) to fine-tune rather than jumping a full step.
  **Why** Shipped fractional weights: Linear 510/590, Vercel 450 on H2, AlignUI 550, Geist `<strong>` 500 in labels and 550 in copy. In-between weights let a single family read as two levels.
  **Applies to** all. **Check** distinct weights on page <= 5; fractional weights only with a variable face. **Source** Linear, Vercel, AlignUI [M]; Geist typography [P]

### 2.2 Tracking and leading as functions of size

- **RULE** Set heading tracking from the fitted curve `tracking_em = -0.0173 * ln(size_px / 15.3)`, clamped to [-0.06, 0]: 20px -0.005, 24px -0.008, 32px -0.013, 40px -0.017, 48px -0.020, 56px -0.023, 64px -0.025, 72px -0.027, 80px -0.029, 96px -0.032. In CSS: `letter-spacing: calc(-0.0173 * log(var(--fs) / 15.3) * 1em)` with `--fs` a unitless px number (CSS `log()` is an exponential function; verify support on caniuse, or paste the table values).
  **Why** The fit (n=42 headings 18-96px, 11 sites) reproduces Linear (-0.022 at 64), Stripe (-0.02 at 48), Attio (-0.02 at 64) and Apple (-0.015 at 80) within 0.01em; tracking that jumps by role (0, -0.02, -0.04) visibly steps between adjacent sizes.
  **Applies to** all. **Check** per heading `letterSpacing / fontSize` within +-0.008em of the curve (or of the chosen dial below). **Source** fit on 11 sites [M]

- **RULE** Pick one tracking dial per brand and apply it to every display size: neutral = the fitted curve (Linear -0.022, Stripe -0.02, Attio -0.02, Apple -0.015 at 64-80px); tight = about 1.6x the curve (Kargul -0.03 at 36-72px, Clerk -0.035 at 56, AlignUI -0.035 at 80/-0.028 at 48); ultra = -0.06em from 40px and -0.04em at 32 (Vercel 64/56 at -0.06; Geist heading-40..72 all -0.06em, heading-32 -0.04em, heading-20/16/14 -0.02em).
  **Why** The dial is the cheapest, most visible owned decision after the family. Kaching's -0.06em at 36px/600 is the ultra dial (founder-approved).
  **Applies to** all. **Check** measure -em at 3 sizes; they must sit on one dial within 0.008em; flag anything tighter than -0.06em. **Source** Vercel, Kargul, Clerk, AlignUI, Linear [M]; Geist typography tokens [M on vercel.com/geist/typography]

- **RULE** Leave Inter text sizes to its published dynamic metrics: `tracking = -0.0223 + 0.185 * e^(-0.1745 * size_px)` em (12px +0.0005, 14px -0.0062, 16px -0.0110, 18px -0.0143, 20px -0.0167, 24px -0.0195, 32px -0.0216, 48px and up -0.0223); the inter-metrics package pairs it with 1.4 line-height.
  **Why** Constants verified in the inter-metrics source (a=-0.0223, b=0.185, c=-0.1745, leading 1.4x); measured Linear sub 15px -0.011 and 20px card title -0.012 sit on it, as does Apple body at -0.022 for SF.
  **Applies to** all (Inter text sizes). **Check** Inter-family text 12-32px letterSpacing within 0.004em of the formula. **Source** inter-metrics 0.3.0 source [P]; Linear [M]

- **RULE** For SF Pro (system-ui on Apple devices) do not impose a web-style negative curve: Apple's own table is +0.012em at 10pt, 0 at 12pt, -0.026em at 17pt (minimum), -0.023 at 20pt, +0.003 at 24pt, +0.014 at 28pt, +0.010 at 40pt, +0.004 at 64pt and 0 from 80pt; Apple.com sets SF Pro Display 600 at 80px/-0.015em and 56px/-0.005em, 17px text at -0.022em.
  **Why** SF's text and display optical designs already tighten the glyphs; stacking a Linear-style curve on top double-tightens. HIG states the system font adjusts tracking dynamically at every point size.
  **Applies to** all. **Check** if the h1 family is SF Pro/system-ui, letter-spacing >= -0.02em at >= 40px. **Source** Apple HIG typography tracking tables [P]; Apple.com [M]

- **RULE** Heading line-height by band: 18-24px titles 1.2-1.35, 28-44px 1.1-1.2, 48px and up 0.95-1.1 (modal 1.0 at 56-72px); body and lede 1.5-1.6 at 14-18px, product UI 13-14px at 1.4-1.54, 12px at 1.33-1.4.
  **Why** Measured display leading: Linear/Vercel/Resend 1.0, Attio 0.95, Kargul 1.07, Stripe 1.15, AlignUI 1.1, Untitled UI 1.25 (the loosest, at 44px); lede leading: Linear 1.6, Resend 1.5, Kargul 1.5, Untitled UI 1.5, AlignUI 1.556. Butterick's 120-145% is the print-body band and applies to long copy only.
  **Applies to** all. **Check** lineHeight/fontSize per band; flag display > 1.2 and body < 1.4. **Source** ten sites [M]; practicaltypography.com/line-spacing [P]

- **RULE** Run leading below 1.05 only on headlines of <= 2 lines whose container does not clip (`overflow: hidden` reveals, masks); with a clipped reveal use >= 1.1 or pad the mask by 0.1em.
  **Why** Attio (64px/0.95) and Linear/Vercel/Resend (1.0) get away with it because the box is unclipped; a word-by-word mask crops descenders at 1.0.
  **Applies to** landing page. **Check** h1/h2 with lineHeight/fontSize < 1.05 and an `overflow: hidden|clip` ancestor within 2 levels = fail. **Source** Attio, Linear [M]; [E]

- **RULE** Give the face an identity with 1-3 OpenType alternates set on headings, not just the family: Linear `cv01, ss03`; Vercel `ss11` with `calt 0`; Stripe `ss01`; Raycast `ss02, ss08`; Resend `ss01, ss04, ss05, ss11`; Attio `ss03`; Kargul `salt`.
  **Why** 7 of 11 measured H1s set a stylistic set or alternate (AlignUI sets only `calt`; Clerk, Untitled UI and Apple set none); it makes the same font read as authored. Check the face actually has the feature before shipping.
  **Applies to** landing page. **Check** h1 computed `font-feature-settings` != normal and each tag exists in the loaded font (no-op otherwise). **Source** seven sites [M]

### 2.3 Measure and line length

- **RULE** Size the H1 box for 9-26 characters per line (median 16) and 2 lines: `max-width` 5-20em of the H1 size (Vercel 444px = 6.9em for 11 chars/line; Raycast 8.4em; Clerk 10.7em; Kargul 12em; Untitled UI 14.4em; Linear 20em for a 51-character headline).
  **Why** Display type is read as shapes; very long lines at 64px+ lose the break rhythm, and < 9 characters leaves stranded words. Founder: two lines max.
  **Applies to** landing page. **Check** h1 width / font-size in [5, 20]; chars per line = len / lineCount in [9, 26]. **Source** Linear, Vercel, Raycast, Clerk, Kargul, Untitled UI [M]

- **RULE** Cap the lede at 25-35em (45-60 characters per line) and 2 lines: Linear 505px at 15px (33em), Resend 480px at 18px (27em), Attio 486px at 18px (27em), Kargul 396px at 16px (25em), Untitled UI 634px at 18px (35em).
  **Why** The lede is the second read; a measure under 60 characters keeps it a single glance. Founder: subtitle two lines max.
  **Applies to** landing page. **Check** lede width / font-size in [25, 35]; lines <= 2. **Source** five sites [M]

- **RULE** Card and feature body copy runs 37-55 characters per line (median 43, n=89), long-form 60-76 (Resend and Untitled UI full-width paragraphs 75.5-76), nothing above 76 outside docs.
  **Why** Card columns are narrow by design; the measured median is close to Butterick's 45-90 floor and Baymard's 50-75.
  **Applies to** all. **Check** canvas-measured characters per line of paragraphs of > 70 characters: cards 35-60, prose 55-76. **Source** twelve sites [M]; practicaltypography.com/line-length (45-90) [P]

### 2.4 Spacing between text levels

- **RULE** Place the lede 0.3-0.55x the H1 size below the H1 box (16-36px; modal 24-32px): Linear 32 (0.50x), Raycast 32 (0.50x), Attio 36 (0.56x), Untitled UI 16 (0.36x), Kargul 18 (0.35x), AlignUI 24 (0.30x).
  **Why** Closer than 0.3x merges the levels, wider than 0.55x detaches the lede; the ratio scales with the H1 so 48px and 96px headlines both sit right. Gaps are line-box to line-box, so a 1.0-leading H1 looks about 0.1x tighter than the number.
  **Applies to** landing page. **Check** (lede.top - h1.bottom) / h1 size in [0.3, 0.55]. **Source** six sites [M]

- **RULE** Put the CTA row 24-40px under the lede (modal 32: Resend 32, Attio 24, Stripe 40, Vercel 32-40 from the H1 when there is no lede), space two CTAs 8-12px apart at equal height (Vercel 12, Stripe 8, Attio 10, Untitled UI 12, Kargul 6), and leave at least 64px from the CTAs to the product frame (founder).
  **Why** The CTA belongs to the lede (same group); the product frame is a new group, so the gap there must be at least 2x the gap above.
  **Applies to** landing page. **Check** cta.top - lede.bottom in [24, 40]; sibling CTA gap 8-12; frame.top - cta.bottom >= 64. **Source** Resend, Attio, Stripe, Vercel, Untitled UI, Kargul [M]; founder-taste

- **RULE** If an eyebrow or announcement chip sits above the H1, make the gap 16-40px (Kargul 16, Untitled UI 19, Resend 33, Attio 42) and the chip 24-32px tall; by default there is none (founder), as on Linear, Vercel, Raycast.
  **Why** A chip closer than 16px fuses with the H1; farther than 40px reads as a separate banner.
  **Applies to** landing page. **Check** h1.top - chip.bottom in [16, 40]. **Source** Kargul, Untitled UI, Resend, Attio [M]

- **RULE** Section heading block: eyebrow -> H2 6-16px, H2 -> sub 0.2-0.5x the H2 size (Resend 8-12 at 56px, Kargul 12 at 36px, Raycast 15 at 32px, Untitled UI 16 at 32px, AlignUI 16-20 at 48px; modal 12-16px), sub -> content grid 64-120px.
  **Why** Three nested distances (6-16 / 12-16 / 64-120) make heading, sub and content three groups; measured sub->content: Resend 103-120, Raycast 67-112, Apple 92-118, Stripe 65-153.
  **Applies to** landing page. **Check** the three gaps fall in these bands; (sub->content) >= 4x (h2->sub). **Source** Resend, Kargul, Raycast, Untitled UI, AlignUI, Apple, Stripe [M]

- **RULE** Put 4-8px between a card title and its description (never more than half the description's line-height again): Linear 8, Resend 8, Clerk 8, Untitled UI 6, Raycast 4; at 20px Apple titles 16 is the upper end.
  **Why** Title and description are one object; 4-8px keeps them one object while the card-to-card gap (16-32px) separates objects.
  **Applies to** all. **Check** (desc.top - title.bottom) in [4, 8] for 14-16px body; card gap >= 2x that. **Source** Linear, Resend, Clerk, Untitled UI, Raycast [M]

- **RULE** Use one vertical section padding for the whole page from {96, 128, 160}px, top and bottom equal (+-8): measured median 121px (IQR 96-153, ~100 bands), Linear 128/133, Resend 96/96, Kargul 80/80, Stripe 80-96, Apple 112, Untitled UI 112/123, Clerk 128, Attio 152, Vercel 208+, Raycast 224.
  **Why** Mixed paddings read as accidents; the three values map to compact, standard and spacious pages. 80px is the floor, 160-224px is the editorial/spacious end.
  **Applies to** landing page. **Check** effective padding (content top - band top, band bottom - content bottom) of > 400px bands: one modal value, 90% within +-16px. **Source** twelve sites [M]

- **RULE** Keep the gap above a heading at least 2x the gap below it inside a section, and at least 4x at the section level (Resend: 96px section padding over 8-12px heading->sub).
  **Why** A heading belongs to what follows (Butterick: space above and below is the best heading emphasis; above more than below).
  **Applies to** all. **Check** (previous content bottom -> heading top) / (heading bottom -> next top) >= 2 (>= 4 at section start). **Source** Resend [M]; practicaltypography.com/headings [P]

### 2.5 Numbers and stats

- **RULE** Set stat figures in the heading face and weight at 32-72px, leading 1.0, heading tracking, `tabular-nums` when values animate or align, units and suffixes (M, k, %, +) at the same size, and the label below at 14-16px in the secondary tone.
  **Why** Measured: Kargul 72/1.0/700/-0.03 (tabular), Stripe 48/1.0/300/-0.02, Attio 32/1.0/500/-0.01 (tabular), Untitled UI 44/1.25/600. Figures are display type, not UI type; suffix shrinking looks like a different number.
  **Applies to** landing page. **Check** figure font-family = h2 family; fontSize / label fontSize in [2.2, 5]; computed `font-variant-numeric` includes tabular-nums on animated counters. **Source** Kargul, Stripe, Attio, Untitled UI [M]

- **RULE** Prices and currency in running UI use tabular figures (Stripe checkout figure `EUR 26.89` renders `font-variant-numeric: tabular-nums`) and keep the decimals one tone lighter (founder).
  **Why** Equal-width digits stop columns shifting; the muted decimals put the weight on the whole amount.
  **Applies to** SaaS app UI | landing page. **Check** currency elements: tabular-nums set; decimal span colour differs from the integer. **Source** Stripe [M]; founder-taste

### 2.6 Type voices

- **RULE** Name a type voice in DIRECTION.md (section 3.8) and change at least four of six properties versus the previous build: family, display weight, tracking dial, leading band, label mode (mono / caps / none), button label style.
  **Why** Founder: the same grotesk with the same settings on every brand is the engine's recurring failure; a new font on identical settings is not a new voice.
  **Applies to** all. **Check** voice table in DIRECTION.md vs last two ledger entries differs in >= 4 properties. **Source** founder-taste (Range is mandatory) [E]

- **RULE** Serif voice: display serif 400, lh 1.0, tracking -0.01 at 96px (Resend, Domaine), a second face for H2 at 56px/1.2/-0.05 (ABC Favorit), and a neutral sans for lede and UI (Inter 18/1.5, 14/1.6); keep the serif to H1/H2 only.
  **Why** The serif carries identity at display size where its hairlines survive; H2 in a grotesk at a looser 1.2 leading keeps the section rhythm while the sans runs the product.
  **Applies to** landing page. **Check** serif only on h1/h2; no serif below 32px. **Source** Resend [M]

- **RULE** Light/precise voice (finance, infrastructure): weight 300 at 26-56px (Stripe sohne-var 48/1.15/-0.02 H1, 56/1.03/-0.025 and 32/1.1/-0.02 H2, 26/1.12/-0.01 H3), body 16-18px at 300-400, mono caps 12px labels; allowed only with a face drawn for weight 300.
  **Why** Stripe's custom face keeps hairlines readable; Apple HIG says avoid ultralight, thin and light weights at small sizes. 300 never goes below 16px.
  **Applies to** landing page. **Check** weight <= 300 only where fontSize >= 16 and face is variable with wght axis down to 300. **Source** Stripe [M]; Apple HIG typography [P]

- **RULE** Heavy/confident voice: weight 700 display at <= 56px (Kargul Geist 52/1.07/-0.03, Clerk 56/1.14/-0.035), the same -0.03em on H1, H2 (36px), H3 (18px) and stats (72px), body 14-16px at 500.
  **Why** One tracking value across all heavy sizes makes the page feel poster-set; it only works with a heavy weight whose counters stay open at -0.03em.
  **Applies to** landing page. **Check** all headings share one letter-spacing within 0.005em. **Source** Kargul, Clerk [M]

- **RULE** Optical voice (Apple): SF Pro Display 600, H1 80/1.05/-0.015, H2 56/1.07/-0.005, sub-hero 28/1.14/+0.007, card titles 20/1.47/-0.019, body 17/1.235/-0.022 (SF Text), pills at 980px radius, 0 shadows, section padding 112px.
  **Why** Hierarchy comes from optical sizes and whitespace instead of colour or depth.
  **Applies to** landing page. **Check** n/a beyond the tuple match; verify the face is SF Pro with optical sizing, not a lookalike. **Source** Apple.com [M]

- **RULE** Soft product-UI voice (AlignUI, Untitled UI): Inter at 550-600, H1 80/1.1/-0.035 (AlignUI) or 44/1.25/-0.02 (Untitled UI), H2 48/1.167/-0.028 or 32/1.4/-0.02, lede 18/1.556/-0.015 or 18/1.5/0, UI 14/1.43/-0.006, pair with layered shadows and 0.3x-height button radii.
  **Why** The founder's favourite look is this register; the variation between the two sites is tracking dial and leading, not family.
  **Applies to** landing page | SaaS app UI. **Check** tuple within one dial of either exemplar. **Source** AlignUI, Untitled UI [M]; founder-taste

- **RULE** Use mono as a label texture at 0.75-0.93x the sans size (12px beside 14-16px, 14px beside 16px, Geist 13 beside 14), tracking 0, regular weight, optional caps; never in the headline.
  **Why** Berkeley Mono 12 (Linear), Geist Mono 14 (Vercel), Source Code Pro 12 (Stripe) sit in that range (0.75-0.88); mono at the same size looks one step too big.
  **Applies to** landing page. **Check** mono font-size / adjacent sans font-size in [0.75, 0.93]. **Source** Linear, Vercel, Stripe [M]

### 2.7 Button anatomy

- **RULE** Use this height ladder only: 24, 28, 32, 36, 40, 44, 48, 54px (coss: 24/28/32/36/40; Geist 24/32/36/40; hero CTAs 44-54); fix `height` and centre content, do not derive height from padding.
  **Why** Measured heights: nav 32-40 (Linear 32, Vercel 32, Raycast 36, Attio 36, Stripe 40), hero 40-54 (Vercel 40, Linear 44, AlignUI 44, Apple 44, Untitled UI 46, Stripe 48, Resend 48, Kargul 54), in-app 24-32.
  **Applies to** all. **Check** button heights in the ladder +-0.5px; adjacent controls in a row equal height. **Source** twelve sites [M]; coss, Geist [P]

- **RULE** Hero CTA height 44-54px (median ~45), nav button 32-40px, in-product button 24-32px; nav and hero buttons on one page differ by at least one ladder step.
  **Why** The hero action needs its own larger grammar so the eye knows it is the real one (product-ui-in-marketing 28/8 stays inside the frame).
  **Applies to** landing page. **Check** hero CTA height >= nav button height + 4. **Source** Linear, Vercel, Stripe, Kargul [M]

- **RULE** Horizontal padding = 0.35-0.5x the height (12px at 32, 14 at 36, 16 at 40, 20 at 44, 24 at 48-54); label font-size = 0.33-0.40x the height (14px at 32-36, 16px at 40-48, 15-18px at 54); text-only buttons get the same padding, icon buttons are square.
  **Why** Measured pad/height: Linear 20/44, Resend 20/48, Stripe 24/48, AlignUI 18/44, Kargul 24/54, Apple 21/44, coss 12/32, Geist 14/40; label/height: Stripe 16/48, Linear 16/44, Vercel 16/40, coss 14/32, Geist 14/32 and 16/40, Kargul 15/54 (low outlier). Kaching's 18px label sits above the band at its larger height.
  **Applies to** all. **Check** paddingInline / height in [0.3, 0.5] and fontSize / height in [0.3, 0.42]. **Source** twelve sites [M]

- **RULE** Button label weight 500-600 (Linear 510, Vercel 500, AlignUI 500, Geist 500, coss 500, Resend 600, Untitled UI 600, Kargul 600-700; Apple 400 in SF), tracking 0 to -0.03em (Kaching -0.03em, AlignUI -0.006, Kargul -0.008, rest 0), sentence case, 1-3 words, verb first.
  **Why** Buttons are read as shapes first; 500 is the floor for 14px on a filled ground. Geist's Title Case is Vercel's house style and the founder's is sentence case.
  **Applies to** all. **Check** label fontWeight >= 500 (except SF), word count <= 3. **Source** twelve sites [M]; Geist button best practices [P]

- **RULE** Radius is 0.17-0.33x the height or a full pill: Geist 6/32 and 8/40 (0.19-0.20), Untitled UI 8/46 (0.17), Raycast 8/36 (0.22), coss 10/32 (0.31), Attio 10/36 (0.28), AlignUI 13/44 (0.30), Resend 16/48 (0.33), pill at Linear, Vercel hero, Kargul, Apple (980px); 4px only for the Stripe utility register. Match the product card radius (founder).
  **Why** Mixed radii across nav, hero and cards read as unplanned; Stripe's 4px belongs to a flat finance voice. Inner highlights use `radius - 1px` (coss `before:rounded-[calc(var(--radius-lg)-1px)]`).
  **Applies to** all. **Check** radius / height in [0.17, 0.5] or >= 999px; same radius family across nav, hero, form controls. **Source** twelve sites [M]; coss [P]

- **RULE** Icons: 16px in 32-40px buttons (14 in 24-28), 18-20px in 44-54px, gap 6-8px, trailing chevron/arrow for navigation actions and no decorative leading icon on hero secondary buttons (founder) (Stripe 5x8 chevron, 8px gap), icon side 1-2px less padding than the text side, icon opacity 0.8 (coss).
  **Why** Icon:label is 1.0-1.25 (16/14); coss uses `[&_svg]:-mx-0.5` and opacity 80% so icons sit quieter than the label.
  **Applies to** all. **Check** svg size in {14, 16, 18, 20}; icon width / label font-size in [1.0, 1.4]. **Source** coss [P]; Stripe, Raycast, AlignUI [M]

- **RULE** Never pair two equal-weight fills in a CTA pair: use fill + (ring | ghost | text) such as Vercel ink + white ring pill, Resend glass + text link, Kargul ink + white pill, Stripe brand + translucent white with 1px tinted border.
  **Why** One primary per viewport; the secondary is defined by absence of fill or a hairline.
  **Applies to** landing page. **Check** at most one button with a filled non-surface background per hero row. **Source** Vercel, Resend, Kargul, Stripe [M]

### 2.8 Button variants and states

- **RULE** Primary fill = ink (#171717 light / #ededed dark, Vercel; #2e2e2e AlignUI; #232323 Kargul) or the brand colour; white label on a brand fill must pass 4.5:1 (Stripe #533afd 6.2, Untitled UI #7f56d9 4.96, Apple #0071e3 4.7, Geist error #da2f35 4.7; Geist's #f5f5f5 on it is 4.34).
  **Why** Brand fills clustered near the 4.5 floor; one shade lighter fails. Deepen the fill, do not switch the label to dark (founder badge rule).
  **Applies to** all. **Check** contrast(label, fill) >= 4.5. **Source** Stripe, Untitled UI, Apple, Geist [M]

- **RULE** Secondary = surface fill with a 1px ring from the shadow stack (`0 0 0 1px rgb(ink / .08)` light, `rgb(255 255 255 / .14)` dark), not a border: Vercel buttons `box-shadow: 0 0 0 1px #ebebeb` on white (dark: `#0a0a0a` fill + `0 0 0 1px #2e2e2e`), Geist material rings `rgb(0 0 0/.08)` light and `rgb(255 255 255/.145)` dark; or a tinted fill of ink at 0.05 (Linear dark).
  **Why** A ring adds no layout size, follows radius, and animates; Geist, Linear, AlignUI, Untitled UI and Clerk all use ring-in-shadow on controls. Add `outline: 1px solid transparent` so it survives forced-colors (color-and-surfaces G).
  **Applies to** all. **Check** secondary button `border-width: 0` with a 1px spread-0 layer in box-shadow, or border colour alpha <= 0.12. **Source** Vercel, Geist, Linear, AlignUI [M]

- **RULE** Ghost/tertiary = transparent, label in ink, hover fill ink at 0.04 (coss accent) and no ring; Resend's hero "Documentation" is a text-only ghost at the same height.
  **Why** The third action must cost almost no attention.
  **Applies to** all. **Check** ghost computed background alpha = 0 at rest; hover alpha 0.03-0.06. **Source** coss, Resend [M]

- **RULE** Destructive = red fill (Geist #da2f35 light / #d93036 dark) with a white label, hover one step darker, and a confirmation step; destructive-outline (coss) keeps the surface fill, red-700/red-400 label and tints border (red at 32%) and fill (red at 4%) on hover.
  **Why** Red fill is for the confirm button in a dialog, not for a hero or toolbar action; the outline variant is the in-row trigger.
  **Applies to** SaaS app UI. **Check** destructive fill appears only inside dialogs/confirmations; label contrast >= 4.5. **Source** Geist, coss [P][M]

- **RULE** Hover is a fill step, never a lift: ink on light darkens toward the surface by 7-14% (Vercel #171717 -> #383838 = 14% toward white; AlignUI #2e2e2e -> #3d3d3d = 7%), light button on dark goes to full white (Linear #e5e5e6 -> #fff), brand fills go 15-22% darker (Stripe #533afd -> #4032c8, Untitled UI #7f56d9 -> #6941c6), Tailwind-style fills use `bg-primary/90` (coss).
  **Why** 0 of 68 measured hover states translate or scale a button; Kaching and the founder forbid lift. Fill steps are readable on touch emulation, lifts are not.
  **Applies to** all. **Check** hover computed `transform` = none; hover background lightness delta 0.04-0.12 (OKLCH L). **Source** Vercel, AlignUI, Linear, Stripe, Untitled UI, coss [M]

- **RULE** Active = hover colour plus `scale(0.97)` (Linear measured 0.97; Kargul 0.98; Apple icon buttons 0.95) and drop the outer shadow; coss flips the inner highlight to `black/8%` and sets `shadow-none` on `:active`.
  **Why** Shadow removal reads as the button sinking; scale gives immediate feedback (see skills-better-ui-and-emil for the 0.95-0.98 band).
  **Applies to** all. **Check** `:active` transform scale in [0.95, 0.98]; box-shadow reduced or none. **Source** Linear, Kargul, Apple [M]; coss [P]; Emil Kowalski (0.97) [P]

- **RULE** Focus-visible = `outline: 2px solid <accent>; outline-offset: 2px` (>= 3:1 against the adjacent colour) or a two-ring shadow `0 0 0 1px var(--bg), 0 0 0 3px var(--ring)` (coss ring-2 + offset-1); measured: Stripe 3px at 75% alpha offset 1, Untitled UI 2px #9e77ed offset 2, Apple 2px #0071e3 offset 3, Linear 1px #5e69d1 offset 2, Vercel 1px #005fcc offset 1.
  **Why** Two of the five measured use 1px, which implementation-craft already rules too thin; Linear's #5e69d1 on #08090a is only 4.2:1. Programmatic focus after a key event matches `:focus-visible`.
  **Applies to** all. **Check** focus outline width >= 2px (or ring >= 3px), offset >= 1px, contrast >= 3:1 on both sides. **Source** five sites [M]; coss [P]

- **RULE** Disabled: either `opacity: .64; pointer-events: none; box-shadow: none` (coss) or a fill swap (Geist light `#f2f2f2` fill, `#8f8f8f` label, ring kept, `cursor: not-allowed`; dark `#1a1a1a` fill and `#8f8f8f` label); keep disabled buttons out of the tab order only when the action is impossible, otherwise use `aria-disabled` plus a tooltip.
  **Why** Geist's disabled label is 2.9:1 on light and 5.4:1 on dark, so the light pair is below 3:1; WCAG exempts disabled controls but users still need to read the label.
  **Applies to** all. **Check** disabled computed shadow none; cursor not-allowed or pointer-events none; light-theme label contrast >= 3:1 as a house target. **Source** Geist button, coss [P][M]

- **RULE** Loading keeps the button's width and focus: label `color: transparent` and a centred spinner (coss `data-loading:text-transparent`), `aria-busy="true"`, no layout shift; never swap the label for a spinner of different width.
  **Why** Geist best practice: pass `loading`, do not swap in a spinner, so the button stays focusable and announces the busy state.
  **Applies to** SaaS app UI | landing page. **Check** button width before and during loading identical +-1px. **Source** Geist button [P]; coss [P]

- **RULE** Transition only the properties that change, 150-200ms ease-out for colour/shadow (Linear 160ms `cubic-bezier(.25,.46,.45,.94)`, Vercel 150ms `(.4,0,.2,1)`, AlignUI 200ms `(0,0,.2,1)`, Resend 200ms) and up to 300ms for brand-style fills (Stripe 300ms `(.25,1,.5,1)`, Attio 300ms `(.2,0,0,1)`, Kargul 300ms `(.76,0,.24,1)`); ban `transition: all` on controls.
  **Why** Vercel and Resend ship `all` on primary CTAs (and a Raycast pill does too), which animates properties by accident; Apple ships 0s on its pills, which is also valid. Emil Kowalski: UI animation under 300ms, ease-out.
  **Applies to** all. **Check** computed `transition-property` not `all`; duration <= 300ms. **Source** Linear, Vercel, AlignUI, Resend, Stripe, Attio, Kargul [M]; Emil Kowalski [P]

- **RULE** Make press snappy and release slow when the brand is playful: Comeau's 3D button uses 34ms on press, 250ms spring-ish `cubic-bezier(.3,.7,.4,1.5)` on hover, 600ms `cubic-bezier(.3,.7,.4,1)` on release; for default SaaS keep both directions 100-160ms.
  **Why** Asymmetric timing gives personality; it is a playful-brand choice, and the founder rejected a 3D push button inside a dark poster hero (Vigil v2).
  **Applies to** landing page. **Check** transition durations differ per state only when DIRECTION.md calls the brand playful. **Source** joshwcomeau.com/animation/3d-button [P]; founder-taste

- **RULE** Give small buttons a 44px hit area on coarse pointers with a pseudo-element, not by growing the visual button: coss `pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11`.
  **Why** 32-36px visible controls are the desktop norm; the hit area is what matters for touch (WCAG 2.5.5 target 44).
  **Applies to** all. **Check** with touch emulation every button hit rect >= 44x44. **Source** coss button source [P]

### 2.9 Button depth and fills

- **RULE** Give a primary fill on a light page an inner top highlight plus a hairline lift: `inset 0 1px 0 rgb(255 255 255 / .12-.16), 0 1px 2px rgb(ink / .05-.24)` (Untitled UI .12/.05, coss .16/.24 with shadow-primary/24, AlignUI inset .12 with a ring).
  **Why** The highlight makes a flat fill read as a surface under a top light; the second layer separates it from the page.
  **Applies to** landing page | SaaS app UI. **Check** primary button box-shadow includes an inset 0 1px light layer. **Source** Untitled UI, coss, AlignUI, Clerk [M][P]

- **RULE** Give a dark-page button an inset ring plus top highlight instead of a drop shadow: Linear secondary `inset 0 0 0 1px rgb(255 255 255/.03), inset 0 1px 0 rgb(255 255 255/.04), 0 0 0 1px rgb(0 0 0/.6), 0 4px 4px rgb(0 0 0/.1)`; Linear's ink-on-dark primary adds a five-layer contact ladder (`0 8px 2px / .00`, `0 5px 2px / .01`, `0 3px 2px / .04`, `0 1px 1px / .07`, `0 0 1px / .08`).
  **Why** Black shadows are nearly invisible on near-black; the light ring and highlight carry the edge.
  **Applies to** landing page. **Check** dark button has a light inset layer with alpha 0.03-0.10. **Source** Linear, Raycast [M]

- **RULE** If a fill uses a gradient, keep the luminance delta to 8-10% (Untitled UI overlay `linear-gradient(rgb(255 255 255/.08), rgb(255 255 255/0))`; Resend `linear-gradient(104deg, rgb(253 253 253/.05) 5%, rgb(240 240 228/.1))`) and animate it through registered custom properties or a pseudo-element's opacity, not `transition: background-image`.
  **Why** `background-image` does not interpolate; Attio animates `--button-primary-bg-from` / `--button-primary-bg-to` (with `color` and `border-color`, 300ms) over `radial-gradient(at 50% -10%, from, to)`.
  **Applies to** landing page. **Check** a gradient button defines `@property` colours or hover swaps pseudo-element opacity; no `transition: background-image` alone. **Source** Untitled UI, Resend, Attio [M]

- **RULE** For a tactile or textured dark button, layer a 2px translucent border (`rgb(255 255 255/.05)`), a gradient fill and a noise texture on `::after { inset: -2px }` with `pointer-events: none` (Resend), or a metal keycap stack (Raycast: `0 0 0 2px rgb(0 0 0/.5), 0 0 14px rgb(255 255 255/.19), inset 0 -1px .4px rgb(0 0 0/.2), inset 0 1px .4px #fff`); use on one CTA per page.
  **Why** These are the two measured "crafted" dark buttons; the cost is paint and image weight, so they are for the single primary.
  **Applies to** landing page. **Check** at most one textured/keycap button per viewport; texture asset <= 10 KB. **Source** Resend, Raycast [M]

- **RULE** Ink CTA with a long soft contact shadow (AlignUI hero): `0 16px 8px rgb(31 31 31/.01), 0 12px 6px .04, 0 4px 4px .07, 0 1.5px 3px .08, 0 0 0 1px #0f0f0f, inset 0 1px 2px rgb(255 255 255/.12)` on `#2e2e2e` (hover `#3d3d3d`), 44px, radius 13, 14px/500/-0.006em, with a muted suffix and a 20px trailing chevron 14px away.
  **Why** The inverted ladder (larger offset, lower alpha) fakes ambient occlusion under a dark object; it is the founder's favoured AlignUI aesthetic and matches Kaching's solid-ink-with-#303030-hover spec in spirit.
  **Applies to** landing page. **Check** layered offsets descend in alpha as y grows; total outer alpha <= 0.20. **Source** AlignUI [M]; founder-taste

### 2.10 Shadow construction

- **RULE** Build every elevated surface as ring + 0-3 soft layers + (dark only) top highlight, by tier: resting card = ring only; raised card = ring + 1-2 layers; floating = ring + 3-4; hero product frame = ring + 5-6 (Clerk/AlignUI ladder); modal = ring + 4.
  **Why** Measured layer counts: Linear 1, Vercel 2, Stripe 2, Geist 1-4, Attio 3-5, Clerk 6, AlignUI 6-8; resting cards that carry a heavy stack look like a drop shadow, not a surface.
  **Applies to** all. **Check** count of layers per token; resting card <= 2. **Source** nine sites [M]; Geist materials [M]

- **RULE** Keep per-layer alpha in 0.02-0.08 on light surfaces and the whole stack at or under 0.20 for floating cards (Geist modal: 0.08 ring + 0.02 + 0.04 + 0.06) and 0.30 including the ring for hero frames (Clerk: ring 0.05 + five layers at 0.05); no single layer above 0.16 on a card (founder).
  **Why** Alpha is the "heaviness" dial; the founder rejected one large, high-opacity blur. Stripe's 0.25 first layer works only because it is offset 30px with -30px spread (no halo).
  **Applies to** all. **Check** each layer alpha <= 0.16 on cards (Stripe's tinted hero layer is the exception, recorded in DIRECTION.md); sum <= 0.30. **Source** Geist, Clerk, Stripe [M]; founder-taste

- **RULE** Generate long penumbras with the doubling ladder: layer i has `y = blur = k * 2^i` and `spread = -y/2` at constant alpha: Clerk `0 0 0 1px; 0 1px 1px -.5px; 0 3px 3px -1.5px; 0 6px 6px -3px; 0 12px 12px -6px; 0 24px 24px -12px` all at ink 19 19 22 / .05; AlignUI the same with ink 41 41 41 / .04 and a `0 48px 48px -24px` tail.
  **Why** Negative spread of half the offset keeps the shadow under the card (no side leakage), so the stack can be long without looking like a halo; constant alpha is simpler than per-layer tuning (Comeau's ladders also double y and blur).
  **Applies to** landing page | SaaS app UI. **Check** each layer spread = -y/2 and y = blur; drop layers beyond 24px blur if the founder blur cap binds. **Source** Clerk, AlignUI [M]; Comeau designing-shadows [P]

- **RULE** Choose the shadow ink from the brand's neutral, not black: Stripe `rgb(50 50 93)` (blue-violet) + `rgb(0 0 0/.1)`, Attio navy `rgb(0 22 62)`, `rgb(11 13 24)`, `rgb(24 39 75)`, Clerk `rgb(19 19 22)`, AlignUI `rgb(41 41 41)`/`rgb(31 31 31)`, Raycast warm glow `rgb(215 201 175/.05)` on black; pure black (Geist, Tailwind) is the generic default.
  **Why** Comeau: black over a tinted background desaturates it; match the hue at low lightness. Measured sites with strong brand identity all tint.
  **Applies to** all. **Check** shadow colour hue within 25 degrees of the surface/brand neutral on tinted pages. **Source** Stripe, Attio, Clerk, AlignUI, Raycast [M]; Comeau [P]

- **RULE** Use Stripe's floating-card recipe for a single hero product card on a light page: `0 30px 45px -30px rgb(50 50 93 / .25), 0 18px 36px -18px rgb(0 0 0 / .10)` (a tinted layer with spread = -y, plus a neutral one), and `0 15px 35px rgb(23 23 23 / .08)` for large panels.
  **Why** Vertical-only, large negative spread, brand-hued: it lifts the card without a halo; blur 45px exceeds the founder's 24px cap, so use it only for the frame, not for chips and cards.
  **Applies to** landing page. **Check** frame-only usage; chips and cards use section 3.14 tokens. **Source** Stripe [M]; founder-taste

- **RULE** Ring alpha: 0.05-0.10 of ink on light (Vercel/Geist .08, Untitled UI .08-.10, Attio .06, Clerk .05, AlignUI .10 on buttons and .04 on cards, coss border .10), 0.03-0.145 of white on dark (Geist .145, Linear .03-.08, Clerk .025-.075).
  **Why** The ring must differ from the surface by about 4% lightness to read (color-and-surfaces G); above 0.12 on light it becomes a drawn border.
  **Applies to** all. **Check** ring alpha within band; ring layer is the first layer of the stack. **Source** seven sites [M]

- **RULE** In dark mode replace, do not delete: ring white at .08-.145 + `inset 0 1px 0 rgb(255 255 255 / .04-.10)` + black drop at 0.25-0.6 alpha (Linear card `0 2px 32px rgb(0 0 0/.25)`, Geist medium `0 2px 2px rgb(0 0 0/.32), 0 8px 8px -8px rgb(0 0 0/.16)`, Raycast `0 30px 50px rgb(0 0 0/.4)`, Clerk `0 6px 12px rgb(19 19 22/.6)`) and lift the surface 1-3% in lightness.
  **Why** Dark drop shadows alone vanish; light rings and highlights define the edge. Raycast and Clerk raise black alpha to 0.4-0.6.
  **Applies to** all. **Check** dark tokens have ring alpha >= .08 and black alpha >= 0.16 on the large layer. **Source** Linear, Geist, Raycast, Clerk [M]

- **RULE** Elevate on hover by changing one tier, using the pseudo-element opacity or `transform`, and never transition a multi-layer `box-shadow` (Comeau: animating a layered shadow is a bad idea; Emil Kowalski: animate transform and opacity).
  **Why** Each layer is a separate blur pass; a 5-layer transition repaints 5 blurs per frame.
  **Applies to** all. **Check** `transition-property` on cards lists `transform`/`opacity`, not `box-shadow`; focus rings (<= 2 layers) may transition box-shadow as coss does at 150ms. **Source** Comeau, Emil Kowalski [P]

- **RULE** Spend layered shadows sparingly: <= 6 layers on any element, layered stacks only on <= 8 elements per viewport and never on rows of a scrolling list; use `filter: drop-shadow` for non-rectangular shapes (icons, cut-outs).
  **Why** Each layer costs paint time, worst on cheap mobile GPUs (Comeau); drop-shadow follows the alpha shape that box-shadow cannot.
  **Applies to** all. **Check** count layered-shadow elements in viewport <= 8. **Source** Comeau designing-shadows [P]

- **RULE** A no-shadow voice is valid: Apple.com and kargul.studio set 0 shadows on controls and cards; separate by surface-fill steps >= 4% lightness, radius and whitespace, and give buttons a fill or ring instead.
  **Why** Measured 0 box-shadow elements on kargul and apple.com iPhone page; adding stock shadows would break the voice.
  **Applies to** landing page. **Check** DIRECTION.md states "flat voice"; no box-shadow tokens used. **Source** Apple, Kargul [M]

### 2.11 Inputs, popovers and overlays

- **RULE** Inputs: height = the button of the same tier (Geist 32/36/40, coss 32, Untitled UI and AlignUI 40), radius = the button radius, `1px` border or ring at ink .10 plus `0 1px 2px rgb(0 0 0/.05)` on a surface fill; on focus drop the small shadow, raise border to ink .34 or accent, and add a 3-4px outer ring at .16-.24 alpha (coss `ring-[3px]` accent at 24%, Geist `0 0 0 1px .34, 0 0 0 4px .16` light and .51/.24 white in dark, Untitled UI inset 2px #9e77ed).
  **Why** One edge treatment from rest to focus keeps the field from jumping; the shadow removal on focus is what makes the ring read.
  **Applies to** SaaS app UI | landing page. **Check** input height = adjacent button height; focus ring width 3-4px at alpha .16-.24 (or inset 2px accent). **Source** Geist input, coss input, Untitled UI [M][P]

- **RULE** Popover/menu/tooltip/modal radius and shadow follow one elevation ladder; Geist: tooltip 6px, menu 12px, modal 12px, fullscreen 16px, base/small 6px, medium/large 12px, using the stacks in section 3.14; dialog scrim black at 32% with `backdrop-blur-sm` (8px in Tailwind v4).
  **Why** One ladder (radius and shadow rise together) makes layers legible; Geist says choose the lowest elevation that still reads and never stack two materials on one element.
  **Applies to** SaaS app UI. **Check** floating surfaces use tokens from the ladder; no two shadow tokens on one element. **Source** Geist materials [M][P]; coss dialog source [P]

- **RULE** Add the coss inner highlight to light surfaces: a `before` pseudo-element at `inset: 0` with `border-radius: calc(var(--radius) - 1px)` and `box-shadow: 0 1px rgb(0 0 0 / .04)` (dark: `0 -1px rgb(255 255 255 / .06)`), on top of `shadow-xs/5` and a 1px border.
  **Why** It places a 1px light/dark edge inside the border so inputs, cards and menus read as slightly raised without a visible shadow; coss uses it on buttons (outline), inputs, cards, selects, menus and popovers.
  **Applies to** SaaS app UI. **Check** surface has `::before` with 1px inset shadow of alpha .04-.06. **Source** coss button/input/card/menu sources [P]

### 2.12 Tooling and verification

- **RULE** Verify type and button numbers with the measurement scripts rather than by eye: record (family, size, weight, lh, tracking) tuples per text node, hero stack gaps by chained line boxes, button signatures by (bg, border, radius, height, shadow, font) and states by real `hover`, mouse-down and keyboard focus with 450-600ms waits.
  **Why** Hover and focus values read from CSS miss gradients, vars and pseudo-elements (Resend's noise `::after`, Attio's `--button-primary-bg-*`); only computed values after a real interaction are trustworthy.
  **Applies to** all. **Check** reports include the tuple table and the four states for each button signature. **Source** this study's `knowledge/benchmarks/type-buttons/*.json` [M]

## 3. Numbers and scales

### 3.1 Dataset and method

12 pages on 11 sites (plus Geist docs and coss docs) measured at 1440x900, DPR 2, headless Chromium 156, light and dark colour schemes (a scheme is skipped when body and html backgrounds are unchanged: Linear, Raycast, Resend, Kargul, Apple and most others are single-theme; Vercel and coss differ). Computed styles for every visible text node (tuple = family, size, weight, line-height ratio, tracking em), heading blocks (chain of line boxes above and below), page bands (effective padding), button candidates (all `a`, `button`, `[role=button]` between 22 and 80px tall with fill, ring or shadow), shadows (every non-`none` box-shadow, classified card / popover / input / chip / button), and four interaction states for the 7 most common button signatures per site. Plus Geist docs (typography, materials, button, input) and coss button/input pages measured live, coss/Tailwind source read, Apple HIG tables parsed.

Caveats [M]: contrast values composite colours but ignore gradient and image backgrounds (Stripe hero reads 2.4:1 wrongly); AlignUI's H1 is a rotating word; `h1.lines` on Stripe counts spans; Clerk's hero column chain picks up its product card; Apple's MacBook page H1 detection is poor. Raw data: `knowledge/benchmarks/type-buttons/<site>.json` (type, buttons, shadows, states, signatures per scheme), `summary.json` (curated), `geist-docs.json`, `inputs.json`, `shots/*.png` (@2x).

### 3.2 Hero stack, measured (desktop 1440)

Gaps are line box to line box (CSS spacing). `-` = not present/not measured.

| Site | H1 tuple (size/lh/weight/tracking em) | H1 box | Lede (size/lh/weight/tracking) | H1 -> lede | lede -> CTA | CTA (h / padX / radius) | Eyebrow -> H1 |
|---|---|---|---|---|---|---|---|
| Linear | 64/1.0/510/-0.022 Inter | 1282px, 2 lines | 15/1.6/400/-0.011, 33em | 32 | - | 44/20/pill | none |
| Vercel | 64/1.0/400/-0.06 Geist | 444px, 2 lines, balance | - | - | 32-40 (H1 -> CTA) | 40/12/pill; pair gap 12 | none |
| Stripe | 48/1.15/300/-0.02 sohne-var | 959px | - | - | 40 (H1 -> CTA) | 48/24/4; pair gap 8 | - |
| Raycast | 64/1.1/600/0 Inter, centred | 540px, 2 lines | 18/normal/400/+0.011 | 32 | - | 36/12/8 (nav) | none |
| Resend | 96/1.0/400/-0.01 Domaine | 480px, 2 lines | 18/1.5/400/0 Inter | 8 (looks ~24 optically) | 32 | 48/20/16 | 33 (chip) |
| Attio | 64/0.95/600/-0.02 Inter Display, centred, balance | 805px | 18/1.3/500/-0.01 | 36 | 24 | 36/12/10 | 42 |
| Kargul | 52/1.07/700/-0.03 Geist, centred | 626px, 3 lines | 16/1.5/500/0 | 18 | 54 | 54/24/pill | 16 |
| AlignUI | 80/1.1/550/-0.035 Inter, centred | 639px, 2 lines | 18/1.556/400/-0.015 | 24 | 28 (then logos, CTA at 44) | 44/18/13 | ~30 (pill chip, from the 2x shot) |
| Untitled UI | 44/1.25/600/-0.02 Inter, balance | 634px, 2 lines | 18/1.5/400/0 | 16 | - | 46/16/8; pair gap 12 | 19 |
| Apple (iPhone) | 80/1.05/600/-0.015 SF Pro Display | 1260px, 1 line | 17/1.235/400/-0.022 (SF Text) | - | - | 44/21/980px | 73 (promo line) |
| Clerk | 56/1.143/700/-0.035 Geist-derived | 598px, 2 lines, balance | - | - | - | - | - |

### 3.3 Level ratios, measured

| Site | H1 | H2 | H3 / card title | Lede | Body / UI | H1:lede | H1:H2 | H2:H3 |
|---|---|---|---|---|---|---|---|---|
| Linear | 64 | 48 (72 closing CTA) | 20/590 | 15 | 14, UI 13/12 | 4.3 | 1.33 | 2.4 |
| Vercel | 64 | 56/450 | - | 16 | 14 | - | 1.14 | - |
| Stripe | 48 | 32 and 56 | 26, 22 | 16-18 | 16, 14 | 3.0 | 1.5 | 1.2-2.2 |
| Raycast | 64 | 32 (and 56) | 16-24 | 18 | 14-16 | 3.6 | 2.0 | 2.0 |
| Resend | 96 | 56 | 20/400 | 18 | 14 | 5.3 | 1.71 | 2.8 |
| Attio | 64 | 40 | 24 | 18 | 14 | 3.6 | 1.6 | 1.67 |
| Kargul | 52 | 36 | 18/700 | 16 | 14 | 3.25 | 1.44 | 2.0 |
| AlignUI | 80 | 48 | 14/500 | 18 | 14 | 4.4 | 1.67 | - |
| Untitled UI | 44 | 32 (and 44) | 18/600 | 18 | 16, 14 | 2.4 | 1.38 | 1.78 |
| Apple | 80 | 56 | 19.9/600 | 17-28 | 14-17 | 4.7 | 1.43 | 2.8 |

Medians: H1:lede 3.6, H1:H2 1.5, H2:H3 about 2.0.

### 3.4 Tracking and leading by size

Measured medians across headings and text tuples (n = 11 sites; bins by font-size):

| Size band | Tracking median (range) em | Line-height median (range) | Weight median |
|---|---|---|---|
| 12-14 | 0 (-0.03 to +0.033) | 1.39 / 1.43 | 500 |
| 15-17 | 0 (-0.05 to +0.019) | 1.40 | 500 |
| 18-19 | -0.010 (-0.03 to +0.012) | 1.41 | 500 |
| 20-27 | 0 (-0.05 to +0.011) | 1.31 (1.0-1.6) | 500 |
| 28-39 | -0.010 (-0.03 to +0.008) | 1.15 (1.0-1.4) | 550 |
| 40-55 | -0.020 (-0.03 to 0) | 1.10 (1.0-1.25) | 550 |
| 56-71 | -0.020 (-0.06 to +0.004) | 1.06 (0.95-1.2) | 510 |
| 72+ | -0.015 (-0.035 to -0.01) | 1.0 | 550 |

Fitted heading curve (42 H1/H2/H3 points, 18-96px, excluding serifs): `tracking_em = 0.0472 - 0.0173 * ln(size)` = `-0.0173 * ln(size / 15.3)`. Excluding Vercel's -0.06 and zero-tracking sites: `0.0364 - 0.0141 * ln(size)`. Values:

| px | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 96 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Neutral dial (fit 1) em | -0.001 | -0.005 | -0.008 | -0.013 | -0.017 | -0.020 | -0.023 | -0.025 | -0.027 | -0.029 | -0.032 |
| Tight dial (about 1.6x) | -0.002 | -0.008 | -0.013 | -0.021 | -0.027 | -0.032 | -0.036 | -0.040 | -0.043 | -0.046 | -0.051 |
| Ultra (Geist/Vercel) | 0 | -0.02 | -0.02 | -0.04 (32) | -0.06 | -0.06 | -0.06 | -0.06 | -0.06 | -0.06 | -0.06 |
| Inter dynamic metrics | -0.011 | -0.017 | -0.020 | -0.022 | -0.022 | -0.022 | -0.022 | -0.022 | -0.022 | -0.022 | -0.022 |

Apple SF Pro tracking (HIG, 1/1000 em, converted): 10pt +12, 12pt 0, 14pt -11, 16pt -20, 17pt -26, 20pt -23, 24pt +3, 28pt +14, 32pt +13, 40pt +10, 48pt +8, 56pt +6, 64pt +4, 72pt +2, 80pt 0, 96pt 0. The third HIG tab (New York) goes from +0.016em at 10pt to -0.016em from 72pt up. [P]

Heading line-height rule of thumb from the same data: `lh_ratio = 1 + 4/size` for 18-40px (20 -> 1.20, 24 -> 1.17, 32 -> 1.125, 40 -> 1.10), 1.0-1.1 above 48px.

### 3.5 Spacing tables

Heading block gaps (px, measured), by site:

| Pair | Values |
|---|---|
| Eyebrow -> H2 | Raycast 5, Untitled UI 6, AlignUI 6-16, Attio 5-24 |
| H2 -> sub | Resend 8-12, Kargul 12, Raycast 15, Untitled UI 16, AlignUI 16-20 |
| Sub -> grid | Resend 103-120, Raycast 67-112, Apple 92-118, Stripe 65-153 |
| Card title -> description | Linear 8, Resend 8, Clerk 8, Untitled UI 6, Raycast 4, Apple 16 (20px title) |
| Section padding (top / bottom) | Kargul 80/80-98, Stripe 80-93/96, Resend 96/96-105, Apple 112/122-127, Untitled UI 112/123, AlignUI 120, Clerk 128, Linear 128/133, Attio 152, Vercel 208, Raycast 224 |

Spacing token set derived from the above (px): text stack `4, 6, 8, 12, 16, 24, 32, 40`; section `96, 128, 160`; heading-block `h2->sub = round(0.33 * h2)` to the 4px grid.

Measure: card copy 37-55 characters per line (median 43, n = 89), prose 60-76, lede 25-35em, H1 5-20em.

### 3.6 Text tone tiers (contrast on own background)

| Site | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Linear (dark) | #f7f8f8 18.7:1 | #8a8f98 6.1:1 (and #d0d6e0 13.6) | #62666d 3.4:1 (fails AA) |
| Raycast (dark) | #fff 20:1 | #9c9c9d 7.3:1 / white at .6 = 7.3 | #6a6b6c 3.75:1 / white at .4 = 3.75 |
| Resend (dark) | #f0f0f0 17:1 | #a1a4a5 8.4:1 | - |
| Apple (light) | #1d1d1f 15.5:1 | black at .72 = 8.9:1 | black at .56 = 4.8:1 |
| Untitled UI | #171717 17.9:1 | #525252 7.8:1 | #737373 4.7:1 |
| AlignUI | #2e2e2e 13.6:1 | #474747 9.3:1 | #707070 4.4:1 |
| Kargul | #232323 15.7:1 | #707070 4.95:1 | #9d9d9d 5.8:1 on dark chip |
| Vercel (light) | #171717 17.9:1 | #4d4d4d 8.1:1 | #666 5.5:1 |

### 3.7 Stat and figure settings

| Site | Figure tuple | Notes |
|---|---|---|
| Kargul | 72/1.0/700/-0.03 Geist, tabular-nums | `$1B+`, `210M+`, `75+`, `100%`; suffix same size |
| Stripe | 48/1.0/300/-0.02 sohne-var | `135+`, `99.999%`, `200m+`; no tabular (not animated) |
| Attio | 32/1.0/500/-0.01 Inter Display, tabular-nums | `10.9M`, `400M` |
| Untitled UI | 44/1.25/600/0 Inter | `900+`, `10,000+` |
| Stripe price | 26/1.15/400/-0.03, tabular-nums | `EUR 26.89` |

### 3.8 Six type voices (exemplars and recipes)

| # | Voice | Exemplars | Display | Lede / body | Labels | Button label | When |
|---|---|---|---|---|---|---|---|
| V1 | Tight grotesk, tech | Vercel (Geist), Linear (Inter) | 64/1.0/400/-0.06 Geist; H2 56/1.0/450/-0.06 (Linear: 64/1.0/510/-0.022; H2 48) | 16/1.5/500 (Linear 15/1.6/400/-0.011, secondary tone) | Geist Mono 14 / Berkeley Mono 12, tracking 0 | 14-16/500, ring secondary | developer tools, infra, AI |
| V2 | Editorial serif over sans | Resend (Domaine + Inter + ABC Favorit) | serif 96/1.0/400/-0.01; H2 56/1.2/400/-0.05 (second face) | Inter 18/1.5/400; 14/1.6 | Commit Mono, 12-14 | Inter 16/600, r16 glass | communication, brand-led products |
| V3 | Light and precise | Stripe (sohne-var, ss01) | 48/1.15/300/-0.02; H2 56/1.03/300/-0.025 and 32/1.1/-0.02; H3 26/1.12/-0.01 | 16-18/1.4/300-400 | Source Code Pro 12, caps | 16/400, r4, 48h | payments, trust, finance |
| V4 | Heavy and confident | Kargul (Geist 700), Clerk (700) | 52/1.07/700/-0.03; H2 36/1.16/-0.03; H3 18/1.33/-0.03; stat 72/1.0/-0.03 | 14-16/1.5-1.57/500 | 10.5/700 | 15/700 pill, 54h | studios, agencies, bold consumer |
| V5 | Optical display | Apple (SF Pro Display) | 80/1.05/600/-0.015; H2 56/1.07/-0.005; sub-hero 28/1.14/+0.007 | SF Text 17/1.235/400/-0.022 | 12-14 | 17/400 pill 980 | hardware, premium consumer |
| V6 | Soft product-UI sans | AlignUI (Inter 550), Untitled UI (Inter 600) | 80/1.1/550/-0.035; H2 48/1.167/550/-0.028 (UU: 44/1.25/600/-0.02; 32/1.4/-0.02) | 18/1.556/400/-0.015; UI 14/1.43/-0.006 | 12-14/500 | 14/500, r13, layered ink | B2B SaaS, design-systems, dashboards |

Two supporting voices seen: Attio (Inter Display 600 64/0.95/-0.02, lede 18/1.3/500/-0.01, UI weight 500 everywhere, buttons 14/500 r10) and Raycast (Inter 600 64/1.1/0, centred, zero display tracking; the one site that leaves it at 0).

Custom-property recipe (V1 and V3 shown):

```css
/* V1 tight grotesk */
:root{ --font-display: "Geist", system-ui, sans-serif; --font-mono: "Geist Mono", ui-monospace, monospace;
  --h1: 64px/1 var(--font-display); --h1-w: 400; --h1-ls: -0.06em;
  --h2: 56px/1 var(--font-display); --h2-w: 450; --h2-ls: -0.06em;
  --lede: 16px/1.5 var(--font-display); --lede-w: 500; --lede-color: color-mix(in oklab, var(--ink) 72%, transparent);
  --label: 14px/1.43 var(--font-mono); --label-ls: 0; }
h1{ font: var(--h1); font-weight: var(--h1-w); letter-spacing: var(--h1-ls); text-wrap: balance; max-width: 12em; }

/* V3 light and precise */
:root{ --font-display: "sohne-var", "Helvetica Neue", Arial, sans-serif;
  --h1: 48px/1.15 var(--font-display); --h1-w: 300; --h1-ls: -0.02em; font-feature-settings: "ss01"; }
```

### 3.9 Geist typography tokens (measured live on vercel.com/geist/typography, light, 1440)

| Class | Size/line-height | Tracking | Weight (strong) |
|---|---|---|---|
| heading-72 | 72/72 | -4.32px (-0.06em) | 600 |
| heading-64 | 64/64 | -3.84px (-0.06em) | 600 |
| heading-56 | 56/56 | -3.36px (-0.06em) | 600 |
| heading-48 | 48/56 | -2.88px (-0.06em) | 600 |
| heading-40 | 40/48 | -2.4px (-0.06em) | 600 |
| heading-32 | 32/40 | -1.28px (-0.04em) | 600 (strong 500) |
| heading-20 | 20/26 | -0.4px (-0.02em) | 600 (strong 500) |
| heading-14 | 14/20 | -0.28px (-0.02em) | 600 |
| copy-24 / 18 / 14 / 13 | 24/36, 18/28, 14/20, 13/18 | 0 | 400 (strong 550) |
| label-20 / 18 / 16 / 14 / 13 / 12 | 20/32, 18/20, 16/20, 14/20, 13/16, 12/16 | 0 | 400 (strong 500) |
| button-16 / 14 / 12 | 16/20, 14/20, 12/16 | 0 | 500 |
| mono labels | 14/20, 13/20, 12/16 (Geist Mono) | 0 | 400 |

Not read reliably (responsive class collisions): heading-24, heading-16, copy-16, copy-20. Geist's own usage notes: button-16 largest, button-14 default, button-12 only inside inputs; copy-24/20 for marketing hero areas; label-14 most common; copy-14 most common.

### 3.10 Button anatomy per site (light-scheme measurement; "dark page" = measured on dark site)

| Site / button | Height | PadX | Radius | Label (size/weight/tracking) | Icon / gap | Fill | Ring / shadow | Transition |
|---|---|---|---|---|---|---|---|---|
| Linear hero primary (dark page) | 44 | 20 | pill | 16/510/0 | - / 6 | #e5e5e6 -> hover #fff | 5-layer `0 8px 2px 0 ... 0 0 1px .08` | 160ms `.25,.46,.45,.94`, scale .97 active |
| Linear nav primary | 32 | 12 | pill | 13/510/0 | - / 8 | #e5e5e6 | same | same |
| Linear secondary | 44 | 20 | pill | 16/510/0 | - / 6 | rgb(255 255 255/.05) -> #191a1b | inset ring .03, inset top .04, `0 0 0 1px rgb(0 0 0/.6), 0 4px 4px .1` | 160ms |
| Vercel hero primary | 40 | 12 | pill | 16/500/0 | - | #171717 -> #383838 (dark #ededed -> #ccc) | none | 150ms `.4,0,.2,1` `all` |
| Vercel secondary | 40 | 12 | pill | 16/500/0 | - | #fff -> #f2f2f2 (dark #0a0a0a -> #1f1f1f) | `0 0 0 1px #ebebeb` (dark #2e2e2e) | same |
| Stripe hero primary | 48 | 24 | 4 | 16/400/0, lh 16 | chevron 5x8 trailing / 8 | #533afd -> #4032c8 | none | 300ms `.25,1,.5,1`; focus 3px rgb(84 82 251/.75) offset 1 |
| Stripe secondary | 48 | 24 | 4 | 16/400 | chevron / 8 | transparent, border 1px #b9b9f9 | none; hover border #4032c8, label #2e2b8c | same |
| Raycast nav primary (dark page) | 36 | 12 | 8 | 14/500/+0.014 | 16 / 8 | #e6e6e6 | `0 0 0 2px .5, 0 0 14px rgb(255 255 255/.19), inset 0 -1px .4px .2, inset 0 1px .4px #fff` | bg 200ms ease, shadow 200ms ease-in-out, transform 100ms |
| Resend hero primary (dark) | 48 | 20 | 16 | 16/600/0 | - / 4 | linear-gradient(104deg, .05 -> .1) | 2px border rgb(255 255 255/.05); `0 1px 3px .1, 0 1px 2px -1px .1`; noise `::after` inset -2 | `all` 200ms `.4,0,.2,1` |
| Attio nav primary | 36 | 12 | 10 | 14/500/-0.005 | - / 6 | radial-gradient(at 50% -10%, lab(12.7...), lab(12.7...)); hover from-colour lab(37.4...) | 1px border lab(37.4...) | 300ms `.2,0,0,1` incl. `--button-primary-bg-from/to` |
| Attio secondary | 36 | 12 | 10 | 14/500/-0.005 | - / 6 | page fill | 1px border lab(83.2) -> hover lab(50.4); focus ring 3px blue at .3 | 300ms |
| Kargul hero primary | 54 | 24 | pill | 15/700/-0.008 | 16 leading | #232323 on #efefef | none | 300ms `.76,0,.24,1`; active scale .98; no hover change |
| Kargul secondary | 54 | 24 | pill | 15/600/-0.008 | 23 | #fff | none | same |
| AlignUI hero | 44 | 18 | 13 | 14/500/-0.006 | 20 trailing / 14 | #2e2e2e -> #3d3d3d | 4-layer contact ladder + ring #0f0f0f + inset .12 | 200ms `0,0,.2,1` |
| Untitled UI primary | 46 hero / 39 nav | 16 / 14 | 8 | 16/600 hero, 14/600 nav | - / 8 | #7f56d9 -> #6941c6; gradient .08 -> 0 | inset 0 1px .12 + `0 1px 2px .05`; 1px border same as fill | 200ms ease |
| Untitled UI secondary | 46 / 39 | 16 / 14 | 8 | 16/600 | - / 8 | #fff -> #fafafa | border 1px #d4d4d4; inset 0 -2px .05 + `0 1px 2px .05` | 200ms linear; focus 2px #9e77ed offset 2 |
| Apple pill | 44 | 21 | 980px | 17/400/-0.022 | - | #0071e3 -> #0076df | none | 0s; focus 2px #0071e3 offset 3 |
| Apple dark pill (nav) | 36 | 15 | 8 | 14/400/-0.016 | - | #1d1d1f -> #272729 | none | 0s |
| Geist (docs) default | 32 / 36 / 40 | 6 / 10 / 14 (text) | 6 / 6 / 8 | 14/500, 14/500, 16/500 | 16 | ink #171717 -> #383838; error #da2f35; warning #ff990a | secondary ring | 150ms `.4,0,.2,1` all |
| coss default | 32 (36 mobile) | 12 | 10 | 14/500/0, lh 20 | 16 (18 mobile) / 8 | primary -> primary/90 | `inset 0 1px rgb(255 255 255/.16), 0 1px 2px primary/24`; outline: `0 1px 2px black/5` + `::before 0 1px black/4%` | box-shadow 150ms |
| Clerk skip-link button (light UI) | 30 | 12 | 6 | 13/500 | - | #42434d | ring 0.5px + inset .07 + `0 1px 3px .2` + gradient pseudo overlays (white .2 -> 0 at 50% opacity; hard-stop gloss 46-54%) | 300ms `.4,.36,0,1` |

### 3.11 Button spec matrix (engine-adoptable)

Sizes (all heights fixed, content centred; px = padding-inline incl. border; radius for the soft family; icon = svg size):

| Tier | Height | Pad-x | Label | Radius (soft / pill) | Icon | Gap | Use |
|---|---|---|---|---|---|---|---|
| xs | 24 | 8 | 12/500 | 6 / pill | 14 | 4 | tags in inputs, dense toolbars (Geist button-12, coss xs) |
| sm | 28 | 10 | 13/500 | 8 / pill | 14 | 6 | in-product actions (Linear 28/8) |
| md | 32 | 12 | 14/500 | 8-10 / pill | 16 | 8 | default app button, nav action (coss, Geist, Linear nav) |
| lg | 36 | 14 | 14/500 | 10 / pill | 16 | 8 | prominent app action, nav CTA (Raycast, Attio, Geist) |
| xl | 40 | 16 | 16/500 | 10-12 / pill | 16-18 | 8 | forms, small hero (Vercel hero 40, Geist 40) |
| 2xl | 44 | 20 | 16/500-600 | 12-14 / pill | 18 | 8 | hero CTA default (Linear, AlignUI, Apple); Kaching 14 radius |
| 3xl | 48 | 24 | 16/500-600 | 12-16 / 4 for utility voice | 18-20 | 8-10 | hero CTA large (Stripe, Resend) |
| 4xl | 54 | 24 | 15-18/600-700 | pill | 20 | 10 | statement CTA (Kargul; Kaching 18px label) |

Variants x states (token expressions; `ink` = #171717 light / #ededed dark, `surface` = #fff / #0a0a0a, `ring` = rgb(0 0 0 / .08) light / rgb(255 255 255 / .14) dark):

| Variant | Rest | Hover (150-200ms) | Active | Focus-visible | Disabled |
|---|---|---|---|---|---|
| Primary | bg ink, label surface, `inset 0 1px 0 rgb(255 255 255/.12)` + `0 1px 2px rgb(0 0 0/.05)` | bg `color-mix(in srgb, ink 88%, surface)` (Vercel 86/14, AlignUI 93/7); brand fill 15-22% darker | hover colour + scale .97, shadow none | outline 2px accent offset 2 | opacity .64 or fill `#f2f2f2`/label `#8f8f8f`, shadow none |
| Secondary | bg surface, label ink, shadow `0 0 0 1px ring` (+ `0 1px 2px black/.05`) | bg `color-mix(in srgb, ink 4%, surface)` (Vercel #f2f2f2; coss accent/50) | hover colour + scale .97 | same | same, ring kept |
| Ghost | transparent, label ink | bg ink at .04 | ink at .06 + scale .97 | same | label at 64% |
| Destructive | bg #da2f35 (dark #d93036), label #fff | one step darker (/90) | scale .97 | outline 2px red offset 2 | opacity .64 |
| Destructive outline | surface fill, label red-700 (dark red-400), ring | border red at 32%, bg red at 4% | scale .97 | same | opacity .64 |
| Brand fill | bg brand (label >= 4.5:1) | 15-22% darker | scale .97 | outline 2px brand-lighter offset 2 | opacity .64 |
| Link | transparent, label ink, no padding | underline offset 4px | - | same | label at 64% |

Timing defaults: hover 150-200ms `cubic-bezier(.25,.46,.45,.94)` (Linear) or `.4,0,.2,1` (Vercel/Tailwind); press in <= 100ms; release 160-250ms; brand-style fills up to 300ms `.25,1,.5,1`. Never `all`.

### 3.12 Button transition inventory (measured)

| Site | Properties | Duration | Easing |
|---|---|---|---|
| Linear | background, color (chips); border, background-color, color, box-shadow, opacity, filter, transform (CTAs) | 160ms | `cubic-bezier(.25,.46,.45,.94)` |
| Vercel | all | 150ms | `cubic-bezier(.4,0,.2,1)` |
| Stripe | background-color, color, outline-color, border | 300ms (240ms nav) | `cubic-bezier(.25,1,.5,1)` (nav `.45,.05,.55,.95`) |
| Raycast | background-image, background-color, box-shadow, transform | 200ms / 200ms / 200ms / 100ms | ease, ease, ease-in-out, ease-in-out |
| Resend | all | 200ms | `cubic-bezier(.4,0,.2,1)` |
| Attio | color, background-color, border-color, outline-color, ..., `--button-primary-bg-from/to` | 300ms | `cubic-bezier(.2,0,0,1)` |
| Kargul | color, background-color, opacity, scale | 300ms (nav 500ms) | `cubic-bezier(.76,0,.24,1)` |
| AlignUI | color, background-color, border-color, opacity, box-shadow, transform, filter | 200ms (150ms for icons) | `cubic-bezier(0,0,.2,1)` / linear |
| Untitled UI | background-color | 200ms | ease / linear |
| Apple | all | 0s (icon buttons 100ms linear) | ease |
| coss | box-shadow | 150ms | `cubic-bezier(.4,0,.2,1)` |

### 3.13 Shadow stacks measured on shipped sites (box-shadow computed values)

Cards and frames (light pages):

| Site, element | Stack |
|---|---|
| Stripe floating card | `rgb(50 50 93/.25) 0 30px 45px -30px, rgb(0 0 0/.10) 0 18px 36px -18px` |
| Stripe panel r6 | `rgb(23 23 23/.08) 0 15px 35px 0`; small `rgb(23 23 23/.06) 0 3px 6px 0`; card `rgb(50 50 93/.12) 0 16px 32px 0` |
| Attio card r12 | `rgb(0 22 62/.01) 0 0 1px 1px, rgb(0 22 62/.04) 0 4px 12px -1px, rgb(0 22 62/.18) 0 1px 3px -1px` |
| Attio frame r16 | `rgb(11 13 24/.06) 0 0 0 1px, .024 0 1px 2px, .03 0 3px 6px, .035 0 8px 14px, .04 0 16px 28px` |
| Attio chip r8 | `rgb(0 0 0/.04) 0 1px 3px, rgb(28 40 64/.18) 0 0 2px` |
| Clerk card r8 | ring `0 0 0 1px` then `0 1px 1px -.5px, 0 3px 3px -1.5px, 0 6px 6px -3px, 0 12px 12px -6px, 0 24px 24px -12px`, all `rgb(19 19 22/.05)` (subtle variant .024) |
| Clerk card r12 | `rgb(0 0 0/.1) 0 0 0 .5px, rgb(0 0 0/.06) 0 2px 10px -4px, rgb(0 0 0/.06) 0 8px 12px -4px, inset rgb(255 255 255/.8) 0 0 0 .5px, inset #fff 0 0 24px 6px` |
| AlignUI card r20 | `rgb(41 41 41/.04) 0 1px 1px .5px, .02 0 3px 3px -1.5px, .04 0 6px 6px -3px, .04 0 12px 12px -6px, .04 0 24px 24px -12px, .04 0 48px 48px -24px, .04 0 0 0 1px, inset rgb(51 51 51/.06) 0 -1px 1px -.5px` |
| AlignUI chip r9 | `rgb(41 41 41/.06) 0 4px 8px, .04 0 2px 4px, .04 0 1px 2px, .08 0 0 0 1px, inset .08 0 -.5px .5px` |
| Untitled UI image card | `rgb(0 0 0/.1) 0 0 0 .5px, rgb(0 0 0/.16) 18px 26px 64px -12px` (the only measured x offset; ratio 1:1.44) |
| Untitled UI side panel | `rgb(16 24 40/.07) 8px 0 144px 0` |
| Vercel resting card | `rgb(0 0 0/.08) 0 0 0 1px, #fafafa 0 0 0 1px` |
| coss card / popover / tooltip | `shadow-xs/5` + 1px border + `::before 0 1px black/4%`; popover `shadow-lg/5` = `0 10px 15px -3px rgb(0 0 0/.05), 0 4px 6px -4px rgb(0 0 0/.05)`; tooltip `shadow-md/5` |

Dark pages:

| Site, element | Stack |
|---|---|
| Linear card r12 | `rgb(0 0 0/.25) 0 2px 32px 0` + 1px border white ~8%; chip `inset rgb(255 255 255/.05) 0 0 0 1px`; floating chip `rgb(0 0 0/.06) 0 4px 4px -1px, rgb(0 0 0/.12) 0 1px 1px` |
| Raycast floating r20 | `rgb(255 255 255/.1) 0 1px 0 inset, rgb(0 0 0/.4) 0 30px 50px, rgb(3 15 129/.09) 0 4px 24px, rgb(255 255 255/.06) 0 0 0 1px inset` |
| Raycast tile r12 | `rgb(0 0 0/.03) 0 7px 3px, rgb(0 0 0/.25) 0 4px 4px`; glow card `rgb(215 201 175/.05) 0 0 20px 5px, same 0 0 16px -7px`; rule `rgb(27 28 30) 0 0 0 1px, rgb(7 8 10) 0 0 0 1px inset` |
| Clerk dark card | `inset rgb(255 255 255/.025) 0 1px 0, inset .025 0 0 0 1px`; popover `rgb(19 19 22/.6) 0 6px 12px, inset rgb(255 255 255/.03) 0 1px 0` |
| Geist materials (dark) | ring `rgb(255 255 255/.145) 0 0 0 1px` + black layers (see 3.14) |

Geist materials, exact (light | dark), `vercel.com/geist/materials`:

| Material | Radius | Light stack | Dark stack |
|---|---|---|---|
| base | 6 | `0 0 0 1px rgb(0 0 0/.08), 0 0 0 1px #fafafa` | `0 0 0 1px rgb(255 255 255/.145), 0 0 0 1px #000` |
| small | 6 | ring, `0 2px 2px rgb(0 0 0/.04)` | ring, `0 1px 2px rgb(0 0 0/.16)` |
| medium | 12 | ring, `0 2px 2px .04, 0 8px 8px -8px .04` | ring, `0 2px 2px rgb(0 0 0/.32), 0 8px 8px -8px .16` |
| large | 12 | ring, `0 2px 2px .04, 0 8px 16px -4px .04` | same alphas as light (.04, .04) |
| tooltip | 6 | ring, `0 1px 1px .02, 0 4px 8px 0 .04` | same |
| menu | 12 | ring, `0 1px 1px .02, 0 4px 8px -4px .04, 0 16px 24px -8px .06` | same |
| modal | 12 | ring, `0 1px 1px .02, 0 8px 16px -4px .04, 0 24px 32px -8px .06` | same |
| fullscreen | 16 | ring, `0 1px 1px .02, 0 8px 16px -4px .04, 0 24px 32px -8px .06` | same |

(Geist's dark elevated stacks keep light-mode alphas for tooltip/menu/modal, which look under-powered on black; section 3.14 raises them.)

Buttons: see 3.10. Inputs (computed): Geist input 32px r6, ring `0 0 0 1px rgb(0 0 0/.08)`, focus `0 0 0 1px rgb(0 0 0/.34), 0 0 0 4px rgb(0 0 0/.16)`, dark ring .14 and focus `.51 / .24` white, placeholder #8f8f8f; coss input 32px r10 (wrapper), border 1px black/10, `0 1px 2px black/5`, focus border neutral-ish ring colour + `0 0 0 3px ring/24`, placeholder at 72% alpha; Untitled UI 40px r8, `inset 0 0 0 1px #d4d4d4, 0 1px 2px .05`, focus `inset 0 0 0 2px #9e77ed`; AlignUI search `0 0 0 1px rgb(51 51 51/.1)` on #f7f7f7 and controls `0 0 0 1px #ebebeb`.

### 3.14 Shadow token set (light + dark; adopt as CSS custom properties)

Light (`--sh` is the ink rgb triplet; default `0 0 0`, brand-tinted examples `19 19 22`, `0 22 62`, `50 50 93`). Founder constraint: cards and chips <= 24px blur and <= 0.16 alpha per layer; the hero-frame ladder drops its 48px layer when that cap binds.

```css
:root{
  --sh: 0 0 0;
  --ring:        0 0 0 1px rgb(var(--sh) / .08);              /* Geist/Vercel .08; band .05-.10 */
  --e-input:     0 1px 2px 0 rgb(var(--sh) / .05);            /* Tailwind xs; coss input; Untitled UI */
  --e-btn:       inset 0 1px 0 rgb(255 255 255 / .12), 0 1px 2px 0 rgb(var(--sh) / .05);  /* primary on light */
  --e0-card:     var(--ring);                                  /* Geist base */
  --e1-card:     var(--ring), 0 2px 2px 0 rgb(var(--sh) / .04);                         /* Geist small */
  --e2-raised:   var(--ring), 0 2px 2px 0 rgb(var(--sh) / .04), 0 8px 8px -8px rgb(var(--sh) / .04);   /* Geist medium */
  --e3-float:    var(--ring), 0 2px 2px 0 rgb(var(--sh) / .04), 0 8px 16px -4px rgb(var(--sh) / .04); /* Geist large; founder whisper alt: 0 8px 20px -12px rgb(ink/.12) */
  --e-tooltip:   var(--ring), 0 1px 1px 0 rgb(var(--sh) / .02), 0 4px 8px 0 rgb(var(--sh) / .04);
  --e4-menu:     var(--ring), 0 1px 1px 0 rgb(var(--sh) / .02), 0 4px 8px -4px rgb(var(--sh) / .04), 0 16px 24px -8px rgb(var(--sh) / .06);
  --e5-modal:    var(--ring), 0 1px 1px 0 rgb(var(--sh) / .02), 0 8px 16px -4px rgb(var(--sh) / .04), 0 24px 32px -8px rgb(var(--sh) / .06);
  --e-frame:     0 0 0 1px rgb(var(--sh) / .05), 0 1px 1px -.5px rgb(var(--sh) / .05), 0 3px 3px -1.5px rgb(var(--sh) / .05),
                 0 6px 6px -3px rgb(var(--sh) / .05), 0 12px 12px -6px rgb(var(--sh) / .05), 0 24px 24px -12px rgb(var(--sh) / .05); /* Clerk ladder, hero product frame */
}
```

Dark (`--sh: 0 0 0`; anchors in brackets are measured; numbers marked [E] are engine-chosen between the anchors):

```css
.dark{
  --ring:        0 0 0 1px rgb(255 255 255 / .10);            /* Geist .145, Linear .03-.08, Clerk .025-.075 */
  --hl:          inset 0 1px 0 rgb(255 255 255 / .06);        /* Linear .04, Raycast .10, Clerk .025-.075 */
  --e-input:     0 1px 2px 0 rgb(0 0 0 / .20);                /* [E] */
  --e0-card:     var(--ring);
  --e1-card:     var(--ring), var(--hl), 0 1px 2px 0 rgb(0 0 0 / .16);                  /* Geist small dark */
  --e2-raised:   var(--ring), var(--hl), 0 2px 2px 0 rgb(0 0 0 / .32), 0 8px 8px -8px rgb(0 0 0 / .16);   /* Geist medium dark */
  --e3-float:    var(--ring), var(--hl), 0 8px 24px -8px rgb(0 0 0 / .45);              /* [E] between Linear .25@32px and Raycast .4@50px */
  --e4-menu:     var(--ring), var(--hl), 0 2px 4px 0 rgb(0 0 0 / .30), 0 16px 32px -8px rgb(0 0 0 / .50);   /* [E] */
  --e5-modal:    var(--ring), var(--hl), 0 2px 4px 0 rgb(0 0 0 / .30), 0 24px 48px -12px rgb(0 0 0 / .60); /* [E], Clerk popover .6 */
}
```

Surface lightness steps pair with these: raise the card surface 1-3% L over the page (color-and-surfaces).

### 3.15 Layered recipes and generators

Comeau (primary source, hsl ink matched to the background hue):

```css
/* three elevations, shared ratio y = 2x, ink = hue of the surface at S 60% L 50% */
--small:  0.5px 1px 1px hsl(var(--shadow-color) / 0.7);
--medium: 1px 2px 2px hsl(var(--shadow-color) / .333), 2px 4px 4px hsl(var(--shadow-color) / .333), 3px 6px 6px hsl(var(--shadow-color) / .333);
--large:  1px 2px 2px hsl(var(--shadow-color) / .2), 2px 4px 4px hsl(var(--shadow-color) / .2), 4px 8px 8px hsl(var(--shadow-color) / .2),
          8px 16px 16px hsl(var(--shadow-color) / .2), 16px 32px 32px hsl(var(--shadow-color) / .2);
/* --shadow-color: 0deg 0% 50% on neutral grey, 220deg 60% 50% on hsl(220 100% 80%) */
```
Principles (paraphrased): elevation raises offset, raises blur and lowers opacity together; vertical offset is twice the horizontal; five stacked layers approximate a penumbra; black desaturates, so match the hue; do not animate layered shadows. Note: web UI usually runs x = 0; only Untitled UI's image cards (18px 26px) use x on shipped sites.

Doubling ladder generator (Clerk/AlignUI pattern):

```css
.frame{ --a: .05; --ink: 19 19 22;
  box-shadow:
    0 0 0 1px rgb(var(--ink) / var(--a)),
    0 1px 1px -.5px rgb(var(--ink) / var(--a)),
    0 3px 3px -1.5px rgb(var(--ink) / var(--a)),
    0 6px 6px -3px  rgb(var(--ink) / var(--a)),
    0 12px 12px -6px rgb(var(--ink) / var(--a)),
    0 24px 24px -12px rgb(var(--ink) / var(--a)); }
```
Rule: y = blur = k*2^i (k = 1 then 3, 6, 12, 24 for a 1-3-6 start), spread = -y/2, alpha constant (.04-.05).

### 3.16 Ring vs border vs shadow, by site

| Site | Controls | Cards / frames | Notes |
|---|---|---|---|
| Linear | inset white ring .03-.05 + top highlight .04 (dark) | 1px border white ~8% + `0 2px 32px black/.25` | borders on cards, rings on controls |
| Vercel / Geist | ring-in-shadow `0 0 0 1px .08` | ring only (base) up to 4 layers | no borders on controls |
| Stripe | none, fill only (secondary has 1px tinted border) | shadow only, tinted | no rings anywhere |
| Raycast | `0 0 0 2px black/.5` + glow (primary), hairline border white .06-.1 | inset rings white .06 + big black shadow | metal stacks |
| Resend | 2px translucent border + 2-layer shadow | n/a | texture |
| Attio | 1px border (primary lab(37.4), secondary lab(83.2)); focus ring 3px blue .3 | ring `0 0 0 1px .06` + 4 soft layers | navy-tinted |
| Clerk | ring .5-1px + inset highlights + 1px 3px shadow | ladder with ring | gloss pseudo overlays |
| AlignUI | ring `0 0 0 1px` .08-.10 + inset bottom bevel | 6-layer ladder + ring .04 | inverted contact ladder on ink CTA |
| Untitled UI | 1px border + inset bottom bevel `0 -2px .05` + `0 1px 2px .05` | `0 0 0 .5px .1` + large offset blur | skeuo-lite |
| coss | 1px border `input` + `shadow-xs/5` + inner `::before` | border + `shadow-xs/5`, popups `shadow-lg/5` | pseudo inner highlight |
| Apple, Kargul | none (flat) | none | flat voice |

### 3.17 Button recipes (CSS / Tailwind)

All values are measured unless marked; replace `all` with the explicit property list.

**B1. Ink pill with ring secondary (Linear / Vercel family), 44px**

```css
.btn{ --h:44px; display:inline-flex; align-items:center; justify-content:center; gap:6px; height:var(--h); padding-inline:20px;
  border-radius:999px; border:1px solid transparent; font:510 16px/1 var(--font-sans); letter-spacing:0; cursor:pointer;
  transition: background-color 160ms cubic-bezier(.25,.46,.45,.94), color 160ms cubic-bezier(.25,.46,.45,.94),
              box-shadow 160ms cubic-bezier(.25,.46,.45,.94), transform 160ms cubic-bezier(.25,.46,.45,.94); }
.btn:active{ transform: scale(.97); }
.btn:focus-visible{ outline:2px solid var(--accent); outline-offset:2px; }
/* dark page (Linear): light primary + contact ladder */
.btn-primary{ background:#e5e5e6; color:#08090a; border-color:#e5e5e6;
  box-shadow:0 8px 2px 0 rgb(0 0 0/0), 0 5px 2px 0 rgb(0 0 0/.01), 0 3px 2px 0 rgb(0 0 0/.04), 0 1px 1px 0 rgb(0 0 0/.07), 0 0 1px 0 rgb(0 0 0/.08); }
.btn-primary:hover{ background:#fff; }
.btn-secondary{ background:rgb(255 255 255/.05); color:#f7f8f8;
  box-shadow: inset 0 0 0 1px rgb(255 255 255/.03), inset 0 1px 0 rgb(255 255 255/.04), 0 0 0 1px rgb(0 0 0/.6), 0 4px 4px 0 rgb(0 0 0/.1); }
.btn-secondary:hover{ background:#191a1b; }
/* light page (Vercel): ink primary + ring secondary, 40px, 16/500, hover #171717 -> #383838 */
.light .btn-primary{ background:#171717; color:#fff; box-shadow:none; } .light .btn-primary:hover{ background:#383838; }
.light .btn-secondary{ background:#fff; color:#171717; box-shadow:0 0 0 1px #ebebeb; } .light .btn-secondary:hover{ background:#f2f2f2; }
```

**B2. Brand rectangle (Stripe), 48px r4**

```css
.btn-brand{ height:48px; padding:15.5px 24px 16.5px; border-radius:4px; background:#533afd; color:#fff; font:400 16px/16px "sohne-var",sans-serif;
  display:inline-flex; align-items:center; gap:8px;
  transition: background-color .3s cubic-bezier(.25,1,.5,1), color .3s cubic-bezier(.25,1,.5,1), border-color .3s cubic-bezier(.25,1,.5,1); }
.btn-brand:hover{ background:#4032c8; }
.btn-brand:focus-visible{ outline:3px solid rgb(84 82 251/.75); outline-offset:1px; }
.btn-brand-outline{ background:transparent; color:#533afd; border:1px solid #b9b9f9; } .btn-brand-outline:hover{ color:#2e2b8c; border-color:#4032c8; }
```

**B3. Depth button (Untitled UI), 40-46px r8**

```css
.btn-depth{ height:46px; padding-inline:16px; border-radius:8px; border:1px solid #7f56d9; color:#fff; font:600 16px/24px Inter;
  background:#7f56d9 linear-gradient(rgb(255 255 255/.08), rgb(255 255 255/0));
  box-shadow: inset 0 1px 0 rgb(255 255 255/.12), 0 1px 2px 0 rgb(0 0 0/.05); transition: background-color .2s ease, border-color .2s ease; }
.btn-depth:hover{ background-color:#6941c6; border-color:#6941c6; }
.btn-depth:focus-visible{ outline:2px solid #9e77ed; outline-offset:2px; }
.btn-depth-secondary{ background:#fff; color:#404040; border:1px solid #d4d4d4; box-shadow: inset 0 -2px 0 0 rgb(0 0 0/.05), 0 1px 2px 0 rgb(0 0 0/.05); }
.btn-depth-secondary:hover{ background:#fafafa; color:#262626; }
```

**B4. Ink CTA with contact ladder (AlignUI / Kaching-adjacent), 44px r13**

```css
.btn-ink{ height:44px; padding-inline:18px; border-radius:13px; border:0; background:#2e2e2e; color:#fff; font:500 14px/20px Inter; letter-spacing:-.006em; gap:14px;
  box-shadow: 0 16px 8px rgb(31 31 31/.01), 0 12px 6px rgb(31 31 31/.04), 0 4px 4px rgb(31 31 31/.07), 0 1.5px 3px rgb(31 31 31/.08),
              0 0 0 1px #0f0f0f, inset 0 1px 2px rgb(255 255 255/.12);
  transition: background-color .2s cubic-bezier(0,0,.2,1), box-shadow .2s cubic-bezier(0,0,.2,1); }
.btn-ink:hover{ background:#3d3d3d; }
.btn-ink .muted{ opacity:.55 } /* "It's free" suffix, trailing 20px chevron */
```

**B5. Glass-on-black with noise (Resend), 48px r16**

```css
.btn-glass{ position:relative; height:48px; padding-inline:20px; border-radius:16px; border:2px solid rgb(255 255 255/.05);
  background:linear-gradient(104deg, rgb(253 253 253/.05) 5%, rgb(240 240 228/.1) 100%); color:#fff; font:600 16px/24px Inter;
  box-shadow:0 1px 3px 0 rgb(0 0 0/.1), 0 1px 2px -1px rgb(0 0 0/.1);
  transition: border-color .2s cubic-bezier(.4,0,.2,1), box-shadow .2s cubic-bezier(.4,0,.2,1), transform .2s cubic-bezier(.4,0,.2,1); }
.btn-glass::after{ content:""; position:absolute; inset:-2px; border-radius:16px; background:url(/noise-btn.png); pointer-events:none; }
```

**B6. Keycap metal on dark (Raycast), 36px r8**

```css
.btn-key{ height:36px; padding:8px 12px; border-radius:8px; background:#e6e6e6; color:#2f3031; font:500 14px/16px Inter; letter-spacing:.014em; gap:8px;
  box-shadow: 0 0 0 2px rgb(0 0 0/.5), 0 0 14px 0 rgb(255 255 255/.19), inset 0 -1px .4px 0 rgb(0 0 0/.2), inset 0 1px .4px 0 #fff;
  transition: background-color .2s ease, box-shadow .2s ease-in-out, transform .1s ease-in-out; }
```

**B7. coss primary and outline (Tailwind v4 + Base UI), class strings from the registry source, shown wrapped**

```tsx
// default
"relative inline-flex items-center justify-center gap-2 h-9 sm:h-8 px-[calc(--spacing(3)-1px)] rounded-lg border font-medium text-base sm:text-sm 
 border-primary bg-primary text-primary-foreground shadow-xs shadow-primary/24 not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] 
 hover:bg-primary/90 [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none 
 transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:opacity-64 disabled:pointer-events-none"
// outline
"border-input bg-popover not-dark:bg-clip-padding text-foreground shadow-xs/5 hover:bg-accent/50 dark:bg-input/32 dark:hover:bg-input/64 
 before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-disabled:not-active:before:shadow-[0_1px_--theme(--color-black/4%)] 
 dark:not-disabled:not-active:before:shadow-[0_-1px_--theme(--color-white/6%)]"
```
Sizes in coss: xs `h-7 sm:h-6`, sm `h-8 sm:h-7`, default `h-9 sm:h-8`, lg `h-10 sm:h-9`, xl `h-11 sm:h-10`; icon variants `size-*`; mobile heights are 4px taller than desktop.

**B8. Animated gradient fill (Attio) via registered colours**

```css
@property --btn-from{ syntax:"<color>"; inherits:false; initial-value: lab(12.72 0.10 -2.22); }
@property --btn-to{   syntax:"<color>"; inherits:false; initial-value: lab(12.72 0.10 -2.22); }
.btn-grad{ height:36px; padding-inline:12px; border-radius:10px; border:1px solid lab(37.43 -1.09 -9.33); color:lab(96.16 -.08 -1.14); font:500 14px/20px Inter; letter-spacing:-.005em;
  background:radial-gradient(at 50% -10%, var(--btn-from) 0%, var(--btn-to) 100%);
  transition: --btn-from .3s cubic-bezier(.2,0,0,1), --btn-to .3s cubic-bezier(.2,0,0,1), color .3s cubic-bezier(.2,0,0,1), border-color .3s cubic-bezier(.2,0,0,1); }
.btn-grad:hover{ --btn-from: lab(37.43 -1.09 -9.33); color: lab(99.9987 .03 0); }
```

**B9. Pill with slow ease-in-out and press scale (Kargul), 54px**

```css
.btn-pill{ height:54px; padding-inline:24px; border-radius:999px; background:#232323; color:#efefef; font:700 15px/18px Geist; letter-spacing:-.008em; gap:8px;
  transition: color .3s cubic-bezier(.76,0,.24,1), background-color .3s cubic-bezier(.76,0,.24,1), opacity .3s cubic-bezier(.76,0,.24,1), scale .3s cubic-bezier(.76,0,.24,1); }
.btn-pill:active{ scale:.98; } /* no hover colour change measured */
.btn-pill-alt{ background:#fff; color:#000; font-weight:600; }
```

**B10. Comeau 3D push button (playful only; layers + springy transitions)**

```css
.pushable{ position:relative; border:none; background:transparent; padding:0; cursor:pointer; outline-offset:4px; transition:filter 250ms; }
.shadow{ position:absolute; inset:0; border-radius:12px; background:hsl(0deg 0% 0% / .25); transform:translateY(2px); transition:transform 600ms cubic-bezier(.3,.7,.4,1); }
.edge{ position:absolute; inset:0; border-radius:12px; background:linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%); }
.front{ display:block; position:relative; padding:12px 42px; border-radius:12px; font-size:1.25rem; color:#fff; background:hsl(345deg 100% 47%);
  transform:translateY(-4px); transition:transform 600ms cubic-bezier(.3,.7,.4,1); }
.pushable:hover{ filter:brightness(110%); }
.pushable:hover .front{ transform:translateY(-6px); transition:transform 250ms cubic-bezier(.3,.7,.4,1.5); }
.pushable:active .front{ transform:translateY(-2px); transition:transform 34ms; }
.pushable:hover .shadow{ transform:translateY(4px); transition:transform 250ms cubic-bezier(.3,.7,.4,1.5); }
.pushable:active .shadow{ transform:translateY(1px); transition:transform 34ms; }
.pushable:focus:not(:focus-visible){ outline:none; }
```

### 3.18 Other numbers

| Item | Value | Source |
|---|---|---|
| Butterick line spacing | 120-145% of point size (print body) | practicaltypography.com [P] |
| Butterick letterspacing for caps | +5 to +12% (0.05-0.12em), none for lowercase | practicaltypography.com [P] |
| Butterick web body size / line length / heading levels | 15-25px / 45-90 characters / max 3 levels, bigger by small increments | practicaltypography.com [P] |
| Apple HIG default / minimum text | iOS 17/11pt, macOS 13/10pt, visionOS 17/12pt, watchOS 16/12pt, tvOS 29/23pt | Apple HIG [P] |
| Apple HIG weights | avoid ultralight, thin, light; prefer regular, medium, semibold, bold | Apple HIG [P] |
| Apple iOS text style leading (default size) | Large Title 34/41, Title 1 28/34, Title 2 22/28, Title 3 20/25, Headline 17/22 semibold, Body 17/22, Callout 16/21, Subhead 15/20, Footnote 13/18, Caption 12/16 and 11/13 | existing typography.md 3.8 [S]; HIG tables (iOS size set 4 differs by Dynamic Type setting) [P] |
| Tailwind v4 tracking tokens | tighter -0.05em, tight -0.025em, normal 0, wide 0.025em, wider 0.05em, widest 0.1em | theme.css [P] |
| Tailwind v4 leading tokens | tight 1.25, snug 1.375, normal 1.5, relaxed 1.625, loose 2 | theme.css [P] |
| Tailwind v4 shadows | xs `0 1px 2px 0 .05`; sm `0 1px 3px .1, 0 1px 2px -1px .1`; md `0 4px 6px -1px .1, 0 2px 4px -2px .1`; lg `0 10px 15px -3px .1, 0 4px 6px -4px .1`; xl `0 20px 25px -5px .1, 0 8px 10px -6px .1`; 2xl `0 25px 50px -12px .25` | theme.css [P] |
| Tailwind v4 blur | xs 4, sm 8, md 12, lg 16, xl 24, 2xl 40, 3xl 64 px | theme.css [P] |
| Emil Kowalski | button press 0.97, UI animation under 300ms, ease-out for enter, animate transform and opacity, never animate keyboard-initiated actions, scale from 0.9+ not 0 | emilkowal.ski [P] |
| Rauno Freiberg | depth from layered composition: blur the inner background to lower it on z, fade container edges, blurred backdrops behind overlays; stagger siblings; skip animation on high-frequency actions | rauno.me designing-depth, invisible details [P] |
| Refactoring UI (paraphrase) | greys need 8-10 shades, primaries 5-10; define shades up front; pick the base as a button-background colour; use 2-3 text tones before more sizes | refactoringui.com preview [S] |

## 4. Dos and Don'ts

- **Do** set H1 64/1.0/500/-0.025em over a 18/1.5/400 lede at 0.4x the H1 below, in the secondary tone, then the CTA 32px under. **Don't** 64/1.1/700/0 over 16/1.8 at 8px (heavy, untracked, loose, glued).
- **Do** interpolate tracking from size (`-0.0173 * ln(size/15.3)`) so 20, 32, 48, 64px all sit on one curve. **Don't** -0.02 on every heading including 14px labels.
- **Do** put 96-128px above a section H2 and 12-16px below it, then 64-120px before the grid. **Don't** equal 48px everywhere (heading floats).
- **Do** one ring + 1-2 quiet layers on a card (`0 0 0 1px .08, 0 2px 2px .04, 0 8px 8px -8px .04`). **Don't** `0 10px 40px rgba(0,0,0,.25)` on every card (founder: "massive shadow").
- **Do** darken a brand fill 15-22% on hover and shrink to 0.97 on press. **Don't** translate Y or add a glow on hover.
- **Do** build the secondary as a ring (`0 0 0 1px`) so it keeps its size and radius. **Don't** add a 1px border plus a 1px ring plus a shadow.
- **Do** put a 1px light inner highlight on a dark button and a white ring on a dark card. **Don't** rely on black drop shadows on near-black.
- **Do** transition `background-color, box-shadow, transform` at 150-200ms. **Don't** `transition: all 0.5s`.
- **Do** keep a 2px, 2px-offset focus ring in the accent. **Don't** ship `outline: none` or a 1px outline on a dark page at 4.2:1.
- **Do** one tracking value for the whole heavy voice (Kargul -0.03 at 18, 36, 52, 72px). **Don't** change dials mid-page.

## 5. Exceptions and judgement calls

- Raycast sets display tracking to 0 at 64px/600 and still looks finished: it leans on weight, centring and a very short headline. [engine note] Zero is safe only with a short headline (<= 28 characters) and a face already tuned for display.
- Leading below 1.0-1.05 clips descenders in `overflow: hidden` word reveals; Linear/Vercel/Resend get away with 1.0 because their reveal is not masked. Check for mask ancestors.
- Vercel's 1.14 H1:H2 ratio is the outlier; it works because both sizes share -0.06em tracking, weight 400/450 and 1.0 leading. The heading ladder collapses into one voice; do not copy it with a looser dial.
- Stripe's weight 300 depends on its custom face (sohne-var); Apple HIG says avoid light weights. Treat V3 as licensed-face only.
- Geist's dark elevated stacks for tooltip/menu/modal keep the light alphas (.02-.06) and read weak on black; the dark tokens in 3.14 raise them [engine note]. The Geist dark `base` ring is .145 white; Linear uses .03-.08. Pick by background depth (darker page = lower ring alpha).
- Founder cap vs shipped practice: Stripe's hero card (blur 45px), Attio frame (28px), Untitled UI image card (64px) and AlignUI ladder (48px) exceed the 24px blur cap; they are frames, not chips and cards. Use them only for the hero product frame and record it in DIRECTION.md; cards, chips and popovers obey the founder cap.
- A 3D push button (Comeau) is a playful, consumer-brand tool; the founder rejected it inside a dark poster hero. Default off; if used, 34ms press, 250ms springy hover, 600ms release, and a `prefers-reduced-motion` fallback to colour only.
- Apple.com's 0s transitions and flat pills are a voice, not an omission. For other brands a 0s hover reads as broken.
- Pill vs 0.2-0.33x radius: pills (Linear, Vercel hero, Kargul, Apple) are fine when the nav, chips and CTAs are all pill; the product card then keeps 12-16 and the pill is the only fully round control. Match founder: if the product is soft, CTAs are >= 0.3x height (44px at ~14).
- The `ln()` fit is for heading sizes 18-96px of non-serif faces; below 18px use the face's own metrics (Inter dynamic, SF table) and above 96px do not extrapolate below -0.06em.

## 6. Figures worth keeping

All under `knowledge/benchmarks/type-buttons/shots/` @2x (PNG). `<site>` in {linear, vercel, stripe, raycast, resend, attio, clerk, kargul, alignui, untitledui, apple, applemac, coss-button}; scheme in {light, dark}.

- `<site>-light-type-hero.png`: the hero text block (eyebrow, H1, lede, CTAs) cropped tight; use to compare spacing proportions by eye (Linear, Vercel, Resend, AlignUI are the cleanest).
- `<site>-light-type-h2.png`: a section heading block (eyebrow, H2, sub) for heading-to-sub proportion.
- `<site>-<scheme>-btn<N>-rest.png`, `-hover.png`, `-focus.png`: each distinct button signature at rest, hover and keyboard focus (N indexes `signatures` in the JSON). Highlights: `alignui-light-btn1-*` (ink contact-ladder CTA), `resend-light-btn0-*` (glass + noise), `stripe-light-btn0-*` (brand rectangle), `untitledui-light-btn1-*` (depth button), `linear-light-btn4/5-*` (ink and ghost pills), `vercel-light-btn1/2-*` (ink pill and ring pill, light) and `vercel-dark-btn1/2-*` (dark), `coss-button-light-btn0..6-*`.
- `geist-light-buttons.png`, `geist-dark-buttons.png`: Geist button sizes x types, both themes (read with `geist-docs.json`).
- Data files: `summary.json` (curated per site), `<site>.json` (full), `geist-docs.json` (typography, materials, button, states, disabled), `inputs.json` (Geist, coss, Untitled UI, AlignUI input rest and focus).

## 7. Open questions

- Inter dynamic-metrics page (rsms.me/inter/dynmetrics) returns 404; constants are verified from the `inter-metrics` npm source (a -0.0223, b 0.185, c -0.1745, leading 1.4x). Whether Inter's current opsz axis (v4) obsoletes it is untested.
- Material 3 type scale and Apple HIG default-size tables were read from JSON/secondary notes only where the page is client-rendered; the HIG tracking tables and default/minimum sizes were parsed from the HIG JSON, the M3 table stays as in `typography.md` 3.7.
- Refactoring UI was read only from a free preview (colour palette), so its type-hierarchy rules appear as paraphrased general principles, not as numbers.
- The fitted tracking curve mixes faces with and without optical sizes (Inter Display, Geist, SF) and 42 points; its scatter is about +-0.008em. A per-face fit (n >= 10 each) would be better.
- Disabled and loading states are measured only on Geist docs and read from coss source; shipped marketing pages rarely expose them. No measured data for toasts, dialogs on marketing sites beyond Geist/coss.
- Contrast numbers ignore gradient/image backgrounds (Stripe hero 2.4:1 reading is an artefact).
- Geist responsive class collisions: heading-24, heading-16, copy-16, copy-20 values were ambiguous (first-match picked a larger responsive variant) and are excluded from 3.9.
- Popover shadows on marketing pages are sparse; menu/modal stacks come from Geist materials and coss/Tailwind tokens, not from product screenshots of Linear/Raycast dropdowns.
- Hover on touch devices is not modelled; emulate `hover: none` when checking hover-only affordances.
- Apple's new HIG tab labelled "New York" was matched by tab order; if the order differs, the serif tracking sentence in 3.4 swaps with SF Pro Rounded.
- p.NN pages: no page ranges apply (web research).
