---
source: web:linear.app + vercel.com + stripe.com + raycast.com + resend.com + clerk.com + attio.com + cal.com + mercury.com + ramp.com + posthog.com + supabase.com + framer.com + dub.co + neon.tech + cursor.com + granola.ai + plain.com + commslayer.com + alignui.com + untitledui.com + mintlify.com + browserbase.com (+ work/kestrel for comparison). height.app was in scope but is offline (blank page, connection closed), so 23 sites were studied.
chapter: Product-led SaaS hero sections (desktop 1440x900 fold): archetypes, measured numbers, rules
pages: n/a (live sites captured 2026-10-08 with Playwright Chromium, 1440x900, dsf 1)
topic_tags: [hero, landing-page, saas, product-ui, headline, typography, cta, nav, frame, bezel, rails, background, archetypes, benchmark, measured]
status: studied
---

# Product-led SaaS hero sections: what the best sites actually do at 1440x900

Evidence: `knowledge/benchmarks/product-heroes/*-1440.png` (one fold screenshot per site, unmodified, so consent banners are visible in several) and `knowledge/benchmarks/product-heroes/measurements.json` (raw DOM + pixel measurements for all 23 sites and for Kestrel, a hand-verified `curated` record per site, and computed `stats`). Everything numeric below is measured or read off those screenshots; where a number comes from the screenshot rather than the DOM it says so. Kestrel is measured with the same script from `work/kestrel/app/dist` and is never included in the medians.

## 1. Core ideas

1. **Five hero archetypes cover all 23 sites.** A: centred copy over a bleeding product frame (attio, dub, plain, commslayer, alignui; Kestrel). B: left-aligned copy over a bleeding product frame (linear, clerk, framer, cursor, ramp, supabase). C: split, copy left and a product or object right (cal, granola, untitledui, mintlify, resend, vercel). D: art-led, no product proof in the fold (stripe, raycast, mercury, neon, browserbase). E: metaphor world (posthog's desktop OS, not transferable). Counts: A 5, B 6, C 6, D 5, E 1.
2. **The product-led sites share one geometry.** For the 12 sites that put a bleeding frame under the copy, the frame top sits at a median y=464 of 900 (51.6% of the fold), the frame is a median 1200px wide (83% of 1440), and 36% of the fold area is visible product (range 22% to 49%). The gap from the bottom of the copy block to the frame (or its tab row) has a median of 60px. Kestrel measures y=476, 1136px, 37% visible, 54px gap: it already sits on the median.
3. **The fold line cuts through content.** In 14 of the 15 heroes that show product UI the frame is cut by the bottom edge, and the cut falls through a text row (linear's issue activity, framer's CMS table, clerk's form, dub's payouts table), never on a clean card boundary. The cut implies continuation and stops the frame reading as a screenshot.
4. **Premium is restraint plus one dominant element.** Saturated pixels (S>0.45) are 0 to 1.8% of the fold in the product-led heroes (median about 0.3%) against 5.7% to 18.8% in four of the five art-led heroes (neon, stripe, raycast, browserbase; mercury's muted photo is 1.1%). Colour comes from the CTA, one headline device and one or two product highlights.
5. **Headline craft is quieter than the common assumption.** Median h1: 56px, weight 500, tracking -2%, line-height 1.1, two lines, 38 characters. Only 4 of 23 are above 72px and only 2 are at weight 700 or heavier. 17 of 23 use a non-Inter face (mostly licensed or custom; vercel Geist, supabase Manrope and dub Satoshi are free families); of the 6 Inter-class sites, 5 track at -2% or tighter and the 6th (Raycast, weight 600) is at 0.
6. **The frame is built, not dropped in.** 4 of 12 frames use an explicit shell (Kestrel 22/16 with 6px padding, dub 20/12 with 12px, linear 8px wrapper, attio 6px translucent bezel). All use a 1px ring at about 6% to 10% ink and a radius of 10 to 24 (median 16). Shadows are stacks of low-alpha layers; cursor uses a heavy lift (0 28px 70px at 14%) and Kestrel a large layer tightened by a negative spread (0 24px 56px -20px at 16%).
7. **The product is shown mid-task.** Six heroes freeze the frame in an in-progress state: linear ("Thinking..."), attio ("Thinking"), cursor ("Generating plan"), granola ("Enhancing notes" with a typing caret), posthog (assistant answering a question about falling conversions, labelled "Sample data") and dub (a pointer parked on "Confirm payouts"). An AI panel mid-answer is the 2026 proof object.
8. **Text-side conventions the founder already set are mostly shared.** No eyebrow above the h1: 11 of 23 (the other 12 use a chip, metric ticker or label). No subtitle at all: 5 of 23, all left-aligned. Two CTAs: 15 of 23. Casing and trailing full stop differ from the founder's rules (see section 5; founder rules win).

## 2. Rules

### 2.1 Structure and archetype

- **RULE** Pick the hero archetype before layout and write it in DIRECTION.md: A centred over product, B left over product, C split, D art-led. Use A or B whenever the product has a UI that can show a decision; use D only when there is no UI to show.
  **Why** 15 of 23 sites show real product UI in the fold; the 8 that do not (stripe, raycast, mercury, neon, browserbase, resend, vercel, alignui) carry their proof in brand atmosphere or an object, and four of them (neon, stripe, raycast, browserbase) hold 5.7% to 18.8% saturated pixels.
  **Applies to** landing page. **Check** DIRECTION.md names archetype A/B/C/D and, for D, states why there is no product UI. **Source** all 23 sites; measurements.json `curated[*].arch`

- **RULE** Place the top edge of the product frame at about 39% to 66% of fold height (y 350 to 595 at 900); aim for about y 460 to 480.
  **Why** Across the 12 bleeding-frame heroes the frame top is: cursor 351 (art backdrop; its window starts 401), framer 372, mintlify 415, clerk 418, supabase 451, posthog 463, ramp 465, linear 527, dub 547 (tabs at 475), attio 580, commslayer 580 (tabs at 523), plain 660; median 464. Higher shortens the copy, lower leaves less than a quarter of the fold for the product.
  **Applies to** landing page. **Check** frame top y / 900 in 0.39 to 0.66. **Source** linear, clerk, framer, cursor, ramp, attio, dub, plain, commslayer, mintlify, supabase

- **RULE** Let the product frame bleed off the bottom of the fold and keep at least 22% of the fold area as visible product (target 33% to 45%).
  **Why** 14 of 15 product heroes bleed; visible share measured: framer 49%, clerk 45%, ramp 44%, cursor 42%, linear 38%, commslayer about 34%, mintlify 32%, attio 27%, dub 25%, plain 22%; median 36%. Below about 22% the frame reads as a thumbnail.
  **Applies to** landing page. **Check** frame bottom > 900 and visible frame area / (1440*900) >= 0.22. **Source** framer, clerk, ramp, cursor, linear, attio, dub, plain

- **RULE** End the fold by cutting through a content row of the product (a table row, list item, chat line), not on a card edge or empty padding.
  **Why** Linear, framer, clerk, cursor and dub all end the fold mid-row; the cut reads as more product below the fold and keeps the eye moving down.
  **Applies to** landing page. **Check** visual: the 900px line intersects a text row inside the frame. **Source** linear, framer, clerk, cursor, dub

- **RULE** Make the product frame 1080 to 1320px wide at 1440 (75% to 92%). Equal to the rail-to-rail width (1200) is a proven default.
  **Why** Frame widths: dub 908, posthog 980, mintlify 1057, attio 1080, supabase 1088, cal 1176, clerk 1200, framer 1200, plain 1200, cursor 1300, ramp 1312, linear 1320, commslayer 1368; median 1200 (13 frames). Clerk, framer and plain are exactly 1200 wide at x=120. Only dub and posthog are under 1000.
  **Applies to** landing page. **Check** frame width in [1080, 1320] at a 1440 viewport. **Source** linear, clerk, framer, plain, ramp, attio, cursor

- **RULE** Keep the copy block (h1 top to the bottom of the sub or CTA row) to 130 to 235px when there is a one-line or two-line sub; leave 40 to 100px between that block and the product frame (or its tab row).
  **Why** Copy block heights: cursor 130, framer 168, clerk 172, ramp 183, linear 184, attio 204, dub 209, commslayer 232 (median 184; plain is 350 only because of an 80px h1 plus an email form). Gaps to the frame: framer 40, ramp 53, clerk 56, cursor 57, plain 60, linear 71, dub 96, attio 98 (median 60). Kestrel is 272 and 54.
  **Applies to** landing page. **Check** (lowest CTA or sub bottom) - h1 top <= 235 px; frame top - that bottom in [40, 100] px. **Source** cursor, framer, clerk, ramp, linear, attio, dub, commslayer

- **RULE** With no chip or announcement above the headline, put the h1 top between y=130 and y=230 at 1440x900.
  **Why** The ten sites with nothing between nav and h1 have h1 tops of browserbase 131, mercury 144, framer 164, cursor 164, commslayer 168, clerk 190, posthog 201, supabase 225, linear 272, raycast 370 (median 179); the two over 270 are linear (dark, tall nav, big air) and raycast (centred over a shader).
  **Applies to** landing page. **Check** h1 getBoundingClientRect().top in [130, 230] when no element sits between nav and h1. **Source** browserbase, mercury, framer, cursor, commslayer, clerk, supabase, linear

- **RULE** Centre the hero copy only when the visual beneath or behind it is full width and symmetric (A or D). Otherwise left-align the copy, with the h1 left edge on the nav's left edge.
  **Why** 15 of 23 heroes are left-aligned and 8 centred; seven of the eight centred heroes have a full-width frame or art field under or behind the copy (alignui has a full-width feature strip instead). Nine left-aligned heroes put the h1 within 3px of the nav's left edge: ramp 64/64, supabase 176/176, framer 120/120, neon 32/32, untitledui 36/36, mintlify 169/169, granola 120/121, vercel 24/24, cursor 70/67.
  **Applies to** landing page. **Check** align centre implies a frame or art element spanning >= 75% of width within 100px of the copy; align left implies |h1.left - nav.left| <= 3px. **Source** attio, dub, commslayer, raycast; ramp, supabase, framer, neon, mintlify, vercel

### 2.2 Headline and subtitle

- **RULE** Set the h1 at 44 to 64px at 1440 (median 56). Go above 72px only when the headline is itself the hero visual (plain 80, alignui 80, granola 86.4, resend 96 in a serif).
  **Why** 18 of 23 are at 64px or less. Within archetype A the h1 sizes are dub 48, commslayer 48, attio 64, plain 80, alignui 80 (median 64); within B they are cursor 26, framer 54, clerk 56, linear 64, ramp 64.
  **Applies to** landing page. **Check** computed h1 font-size in [44, 64] px unless the h1 is the dominant visual. **Source** linear, ramp, framer, clerk, attio, dub, commslayer

- **RULE** Use h1 weight 400 to 600 with a display or optical-size cut; reserve 700+ for a deliberately loud brand.
  **Why** Weights measured: 300 stripe; 400 vercel, resend, ramp, neon, cursor, granola, plain, commslayer, mintlify; 480 to 510 mercury, linear; 500 supabase, framer, dub, browserbase; 550 alignui; 600 raycast, attio, cal, untitledui; 700 clerk; 800 posthog. Median 500; 15 of 23 are 500 or lighter.
  **Applies to** landing page. **Check** computed h1 font-weight in [400, 600]. **Source** linear, attio, alignui, dub, framer, vercel, plain

- **RULE** Track the h1 at -1% to -4% of the font size (median -2%) and set line-height 1.0 to 1.15.
  **Why** 16 of 23 track negatively (median -0.02em; vercel -0.06, framer -0.04, mintlify -0.04, neon -0.04, clerk -0.035, alignui -0.035); the 7 at 0 are mostly geometric or display faces (cal sans, satoshi, arcadia, stack sans, lausanne) plus raycast (Inter) and supabase (Manrope). Line-height is 0.93 to 1.25 with 21 of 23 at 1.15 or less (median 1.1).
  **Applies to** landing page. **Check** h1 letter-spacing / font-size in [-0.04, -0.01] for Inter-class faces; line-height / font-size in [0.95, 1.15]. **Source** linear -0.022, attio -0.02, framer -0.04, alignui -0.035, clerk -0.035, vercel -0.06

- **RULE** When using Inter-class type for the h1, use the display optical size (or opsz axis) at weight 510 to 600 and track at -2% or tighter.
  **Why** Six benchmark sites use Inter-class faces (linear Inter Variable 510 at -2.2%, attio Inter Display 600 at -2%, alignui Inter 550 at -3.5%, untitledui 600 at -2%, neon 400 at -4%, raycast 600 at 0) and so does Kestrel (550 at -4.5%). The other 17 use non-Inter faces, mostly licensed or custom (sohne, suisse, domaine, arizona flare, cal sans, lausanne), so identity there lives in the face; on Inter sites it lives in weight and tracking.
  **Applies to** landing page. **Check** if font-family starts with Inter: font-variation-settings includes opsz or the family is a Display cut, and letter-spacing <= -0.02em. **Source** linear, attio, alignui, untitledui, neon

- **RULE** Keep the h1 to one or two lines at 1440 and 20 to 60 characters (median 38).
  **Why** 19 of 23 h1s are 1 or 2 lines (1 line: 5; 2 lines: 14); 3 or 4 lines appear only in narrow left columns (cal 3, mintlify 3, granola 4, stripe 4 where the h1 includes the grey continuation). 21 of 23 are 61 characters or fewer.
  **Applies to** landing page. **Check** h1 line count <= 2 (Range client rects) and textContent length <= 61. **Source** attio, ramp, dub, resend, mercury, plain, commslayer

- **RULE** Give the headline at most one extra device: one coloured phrase, one inline icon tile, one highlight, or one gradient fill. Never two.
  **Why** Five heroes add exactly one: posthog (blue highlight pill on "context layer"), plain (first line in green), commslayer (violet "AI agent" with a dotted underline plus an inline white icon tile), browserbase (orange highlight blocks), resend (white-to-50% diagonal gradient fill). None stacks two.
  **Applies to** landing page. **Check** count of distinct h1 treatments (span colour, inline tile, gradient clip, highlight) <= 1. **Source** posthog, plain, commslayer, browserbase, resend

- **RULE** Set h1 ink near-black on light (#131316 to #262626) and near-white on dark (#f0f0f0 to #f7f8f8), never pure #000 or #fff for the headline.
  **Why** Measured h1 colours: #171717 (vercel, dub, untitledui, kestrel), #131316 (clerk), #242424 (cal), cursor #26251e, granola #292929, alignui #2e2e2e; dark: linear #f7f8f8, resend #f0f0f0, mercury #ededf3. Only raycast, framer, neon and commslayer use pure white on dark.
  **Applies to** landing page. **Check** h1 colour between #131316 and #2e2e2e on light backgrounds, between #ededf3 and #f7f8f8 on dark. **Source** linear, vercel, dub, clerk, cursor, alignui

- **RULE** Size the subtitle at 15 to 24px (median 18), 0.19 to 0.47 of the h1 size (median 0.31), at one or two lines.
  **Why** 18 sites have a sub: 15 linear; 16 supabase; 17 posthog; 18 attio, clerk, ramp, raycast, resend, mintlify, alignui, untitledui; 20 dub, granola, commslayer, browserbase; 21 mercury; 24 plain. Lines: 1 line x6, 2 lines x8, 3 lines x4 (cal, supabase, posthog, untitledui, all in a narrow left column).
  **Applies to** landing page. **Check** sub font-size in [15, 24] px and rendered lines <= 2 for centred heroes. **Source** attio, dub, ramp, plain, commslayer, raycast

- **RULE** Hold a two-line subtitle to about 42 to 54 characters per line; a one-line sub may run to 56 to 82 characters on a wide measure.
  **Why** Median 50 characters per line (range 26 to 82). Two-line subs: attio 45, raycast 54, resend 53, mintlify 33, plain 49, browserbase 42, dub 52. One-line subs: linear 74, clerk 56, alignui 72, commslayer 82, ramp 66.
  **Applies to** landing page. **Check** sub textContent length / rendered lines in [42, 54] for two-line subs and [56, 82] for one-line subs. **Source** attio, raycast, resend, plain, dub, commslayer, linear

- **RULE** Put 16 to 36px between the h1 and the sub (median 24) and 24 to 56px between the sub and the CTA row (median 34).
  **Why** h1 to sub: resend 8 and cal 12 are the tight outliers, then clerk 16, mintlify 16, dub 20, ramp 24, plain 24, linear 32, commslayer 32, attio 36. Sub to CTA: attio 24, mintlify 32, commslayer 32, ramp 37, dub 40, plain 56. Kestrel is 18 and 32.
  **Applies to** landing page. **Check** sub.top - h1.bottom in [16, 36] px; first CTA top - sub.bottom in [24, 56] px. **Source** attio, ramp, dub, plain, commslayer, linear

- **RULE** Colour the subtitle at about 60% of the h1 ink: neutral-600 to neutral-700 (#525252 to #5e5f6e) on light, #8a8f98 to #c9cbcf on dark, or the h1 colour at 60% alpha. Keep it at 4.5:1 or better.
  **Why** dub, alignui and untitledui use exactly #525252; clerk #5e5f6e; Kestrel #5c5c5c; ramp and mintlify use the h1 colour at 0.6 alpha; on dark linear #8a8f98, resend #a1a4a5, commslayer #9aa1b4, neon #c9cbcf. Cal's #898989 at weight 300 on white is about 3.5:1 and reads weak.
  **Applies to** landing page. **Check** sub colour vs background contrast >= 4.5:1 and the sub colour is neutral 600 to 700 or the h1 colour at 55% to 65% alpha. **Source** dub, alignui, untitledui, clerk, linear, resend

- **RULE** Omit the subtitle only in left-aligned heroes whose h1 already carries the proposition or whose frame does the explaining; every centred hero keeps one.
  **Why** The five sites with no sub (vercel, stripe, framer, neon, cursor) are all left-aligned; all eight centred heroes have a sub, and the six B/A heroes with the clearest frames (linear, clerk, ramp) still keep a one-line sub.
  **Applies to** landing page. **Check** centred hero has a sub <= 2 lines. **Source** vercel, stripe, framer, neon, cursor, attio, dub

### 2.3 CTAs

- **RULE** Make hero CTAs 36 to 46px tall (median 43), 14 to 16px label, in one shape language (all pill, or all radius 4 to 16) shared by primary and secondary.
  **Why** 15 of 21 measured primaries are 36 to 46px tall (raycast, attio, cal 36; supabase, dub 38; browserbase 39; vercel, mercury 40; mintlify 42; cursor, plain 43; neon, commslayer, alignui 44; untitledui 46); 5 are 47 to 56 (posthog 47, stripe 48, resend 48, ramp 52, granola 56). Label size: 14px x7, 15px x1, 16px x10, 18px x1 (Framer-built cal and framer report scaled 12px and are excluded). 7 sites use a pill, 14 use radius 4 to 16 (median 8); none mixes the two within a hero.
  **Applies to** landing page. **Check** primary CTA height in [36, 46]; primary and secondary border-radius equal. **Source** attio, dub, cursor, plain, commslayer, alignui, vercel, supabase

- **RULE** Fill the primary CTA with neutral ink (or white on dark) unless the brand colour is the identity; the secondary is outline, white or text-only, never a competing fill.
  **Why** 13 of 21 primaries are neutral (black or near-black: vercel, attio, cal, dub, cursor, alignui, mintlify, browserbase; white or light grey: framer, neon, commslayer, raycast; dark ghost: resend); 8 use brand colour (stripe #533afd, mercury #5266eb, ramp #e4f222, supabase green, granola olive #5b6f00, plain green, untitledui #7f56d9, posthog #cd8407).
  **Applies to** landing page. **Check** primary CTA background chroma < 0.04 (OKLCH) or the DIRECTION.md names the brand colour as identity. **Source** attio, dub, cursor, framer, commslayer, ramp, stripe

- **RULE** Use two hero CTAs (primary plus secondary), the secondary one tier down. Use one when the action is a single capture (email field, download).
  **Why** 15 of 23 heroes have two CTAs, 5 have one (raycast, ramp, granola, plain, alignui), 1 has three (untitledui), 2 have none (linear, clerk).
  **Applies to** landing page. **Check** hero CTA count in {1, 2}. **Source** attio, dub, commslayer, mintlify, ramp, plain, granola

- **RULE** If the single CTA is email-led, build it as one capsule: field and button inside a 1px-bordered container, button 43 to 52px.
  **Why** Mercury (email field plus 40px pill plus "Launch demo"), ramp (52px lime button in a 1px bordered field) and plain (43px green button in a 1px bordered field) all use a capsule; they are the sales-led sites.
  **Applies to** landing page. **Check** one container with border holds input and button; button height 40 to 52. **Source** mercury, ramp, plain

### 2.4 Nav

- **RULE** Build the nav at 40 to 72px tall (median 58 across bars and pills), links 13 to 16px (median 14) at weight 400 to 500, one primary action on the right at 32 to 40px.
  **Why** Bar heights: ramp 44 (below a 40px bar), plain 40, linear 72, vercel 64, stripe 64, resend 58, attio 67, mercury 72, mintlify 64, browserbase 52, dub 56, cursor 52; pills: clerk 42, commslayer 48, granola 56, raycast 42 inner, alignui 72. Nav primaries are 32px (linear, vercel, dub), 34 (ramp, mintlify), 36 (attio, commslayer) to 40px (stripe, resend).
  **Applies to** landing page. **Check** nav track height in [40, 72]; link font-size in [13, 16]; nav primary height in [32, 40]. **Source** linear, vercel, resend, attio, dub, ramp, commslayer, clerk

- **RULE** Choose bar or floating pill deliberately: 17 of 23 are flat full-width bars; the 5 pills (raycast, clerk, granola, commslayer, alignui) float 8 to 72px below the viewport top (granola 8, raycast 16, commslayer 20, clerk 48 under its bar, alignui 72 under its bar) with radius 12 to 16 (granola fully round) and a soft surface.
  **Why** Pills show up on heroes with an atmosphere or a card (raycast shader, commslayer dark card, granola collage) where the nav needs to read as an object, and on two light systems (clerk, alignui); bars are used where the hero is a plain canvas.
  **Applies to** landing page. **Check** pill nav: radius in [12, 16] or full and a soft surface; bar nav: width = viewport. **Source** raycast, clerk, granola, commslayer, alignui

- **RULE** On a dark or full-bleed art hero, make the nav transparent with a 1px hairline at 8% white and a backdrop blur (linear: 1px rgba(255,255,255,.08) plus blur 20px); do not give it a solid fill.
  **Why** Linear, raycast (pill with 6% white border, inner 1px highlight, blur 5px), resend, framer and mercury all let the hero field run under the nav (neon is the exception with a solid black bar); the hairline plus blur keeps links legible without breaking the field.
  **Applies to** landing page. **Check** nav background alpha 0 and border-bottom or ring alpha <= 0.10 on dark heroes. **Source** linear, raycast, resend, framer, mercury

### 2.5 Background, rails and texture

- **RULE** Use at most two background layers in the hero: one flat or gradient canvas plus either one texture or one colour wash. Keep both quieter than the product.
  **Why** Product-led heroes: linear flat #08090a; clerk, supabase, framer flat; attio white fading to a lavender wash; dub faint square grid between rails; ramp dot grid; Kestrel dots inside rails; cursor a painting behind the window. None stacks a grid, a glow and a gradient.
  **Applies to** landing page. **Check** count distinct hero background layers (grid, dots, wash, noise) <= 2 and none with contrast above the product frame. **Source** linear, attio, dub, ramp, clerk, framer, cursor

- **RULE** On light heroes use a soft grey canvas (#f7f7f7 to #fafafa) with white product surfaces, or white with a single hue-matched wash rising behind the frame.
  **Why** Body or hero canvas colours: alignui #f7f7f7, clerk #f7f7f8, cursor #f7f7f4, vercel #fafafa, commslayer #fafafa, dub #fafafa; white or white-to-wash: attio (lavender), plain (pale-green frame), mintlify (green wave canvas), ramp. The grey canvas makes a white frame read as raised without a heavy shadow.
  **Applies to** landing page. **Check** hero background L* between 96 and 99 with the frame surface at L* 100, or an explicit wash of one hue at <= 10% alpha. **Source** alignui, clerk, cursor, vercel, attio, plain

- **RULE** Draw vertical rails as 1px hairlines at 6% to 10% ink, 1080 to 1320px apart, running the full hero height; add registration marks only at hairline intersections.
  **Why** Rails are in 5 of 23 sites plus Kestrel: stripe x=87/1352, cal x=120/1319 (with "+" marks at the lower hairline, y about 812), dub x=180/1259, alignui x=112/1328 (rulers with corner nodes), browserbase x=64/1376, Kestrel x=120/1320. A pixel scan found the left rail (and, for cal, dub, alignui and Kestrel, both) as a 1px line spanning at least 70% of the fold height; stripe's right rail, cal's "+" marks and all of browserbase's rails are read off the screenshots.
  **Applies to** landing page. **Check** two 1px verticals at x in [60, 190] and [1250, 1380] spanning >= 70% of hero height. **Source** cal, dub, alignui, stripe, browserbase

- **RULE** Keep any dot or line texture inside the rails, faded to nothing before the product frame, and invisible at thumbnail scale.
  **Why** Dub's square grid sits between its rails and dissolves by y=459; alignui's rulers live inside the rails; ramp's dots fade behind the frame. A texture that runs full width or stays at full strength under the headline competes with the h1.
  **Applies to** landing page. **Check** the texture element's box equals the rail-to-rail area and its mask reaches 0 by the frame top. **Source** dub, alignui, ramp

- **RULE** Show saturated colour on at most 2% of the hero's pixels in a product-led hero (S>0.45); colour belongs to the CTA, one headline device and one or two product highlights.
  **Why** Product-led saturated-pixel shares: linear 0, attio 0, clerk 0.1, dub 0.1, cursor 0.1, mintlify 0.3, cal 0.3, framer 0.5, Kestrel 0.9, ramp 1.2, commslayer 1.2, plain 1.7; art-led: neon 5.7, stripe 18.7, raycast 18.8, browserbase 12.8.
  **Applies to** landing page. **Check** share of fold pixels with HSV saturation > 0.45 and value > 0.25 <= 2% (sample every 4th pixel). **Source** linear, attio, dub, ramp, plain, commslayer

- **RULE** Use one accent hue in the chrome. A second hue is allowed only inside the product UI or in a deliberate art field.
  **Why** 20 of 23 heroes show one accent or none in the chrome; the three with several are stripe (gradient ribbon art), posthog (playful multi-colour brand) and dub (three coloured tab icon tiles inside the product switcher).
  **Applies to** landing page. **Check** distinct hue buckets (30 degrees) among saturated UI colours outside the product frame <= 1. **Source** linear, attio, vercel, supabase, ramp, plain, commslayer, dub

### 2.6 Product frame

- **RULE** Give the outer frame a radius of 10 to 24 (median 16) and a 1px ring at 6% to 10% ink; use an explicit shell for the premium read.
  **Why** Outer radii: cursor 10, linear 12, ramp 12, plain 12, cal 12, supabase 16, attio 16, clerk 16.5, framer 18, dub 20, posthog 20, mintlify 23.5, commslayer 24, Kestrel 22. Rings: clerk rgba(19,19,22,.06), attio rgba(11,13,24,.06), Kestrel rgba(23,23,23,.06), linear inner rgba(255,255,255,.08), mintlify rgba(31,167,122,.08), cursor and ramp 10%.
  **Applies to** landing page. **Check** outer radius in [10, 24]; ring (border or 0 0 0 1px shadow) alpha in [0.06, 0.10]. **Source** clerk, attio, linear, mintlify, cursor, ramp, dub

- **RULE** Build a double bezel when the frame is the hero visual: shell padding 6 to 12px, shell radius = inner radius + padding (within 4px), shell 1px ring plus translucent or tinted fill, inner surface solid.
  **Why** Kestrel: outer 22, inner 16, padding 6, shell white at 55%. Dub: outer 20 with 12px padding and a 1px #e5e5e5 border, inner 12 with a 1px #d4d4d4 border (24 would be exactly concentric). Linear: 8px padded wrapper around a 1px 8%-white ring. Attio: 6px translucent bezel at 80%. Concentric corners keep the gap an even width.
  **Applies to** landing page. **Check** shell padding in [6, 12]; |outer radius - (inner radius + padding)| <= 4. **Source** kestrel, dub, linear, attio

- **RULE** Lift the frame with a 1px ring plus a stack of low-alpha layers; any single large-blur layer needs a negative spread so it stays under the frame.
  **Why** Attio stacks a 1px 6% ring, 0 1px 2px 2.4%, 0 3px 6px 3% and 0 8px 14px 3.5%; cal uses 0 1px 5px -4px plus 0 4px 8px at 5%; posthog uses 0 4px 6px -1px and 0 2px 4px -2px at 10%. Cursor is the heavy case (0 28px 70px at 14% with no negative spread, plus 0 14px 32px at 10%); Kestrel's own `--shadow-frame` is ring 6% + 0 2px 4px 3% + 0 24px 56px -20px 16%, which is in the same family but tightened by the -20 spread (the founder approved it as built).
  **Applies to** landing page. **Check** frame box-shadow: one 0 0 0 1px ring at 6% to 10%; every other layer alpha <= 0.16, and any layer with blur > 24px has spread <= -16px. **Source** attio, cal, posthog, cursor, kestrel

- **RULE** Show the product mid-task: freeze at least one element in a thinking, streaming, typing or hovering state, and make it loop or advance on load.
  **Why** Six heroes do it: linear ("Thinking..." in an agent panel), attio ("Thinking" under a user question), cursor ("Generating plan", agent step list), granola ("Enhancing notes" spinner and a typing caret), posthog (assistant answering "Why are signups growing, but paid conversions falling?"), dub (pointer on "Confirm payouts"). A finished static answer reads as a screenshot.
  **Applies to** landing page. **Check** the frame contains an element in a loading, streaming or hover state at the 4s mark. **Source** linear, attio, cursor, granola, posthog, dub

- **RULE** Make every figure in the frame specific and coherent (IDs, 2-decimal currency, counts that add up) and label the data as sample somewhere inside the frame.
  **Why** Linear uses issue IDs and a "1 / 84" pager; dub shows $680.00 pending and $10,301.00 paid with dated rows; attio names a deal (GreenLeaf); posthog prints "Sample data" in the AI card header. Specific numbers read as a real workspace; the sample label keeps the work inside the engine's "never invent proof" rule.
  **Applies to** landing page. **Check** frame includes a visible "sample" label (or sample workspace name); numbers reconcile (parts sum to totals). **Source** linear, dub, attio, posthog

- **RULE** When the product has more than one story, put a segmented switcher of 3 to 5 tabs between the CTA row and the frame, first tab active, each tab 34 to 36px tall with a 16px icon tile.
  **Why** Four heroes do it: dub (3 tabs at y 475 to 508, coloured icon tiles), commslayer (5 tabs at y about 523 to 557), clerk (4 tabs inside the frame head, y 419 to 462), posthog (3 tabs at y 463). One frame proves several workflows without a taller fold.
  **Applies to** landing page. **Check** tab count in [3, 5]; tab height in [34, 36]; exactly one tab selected on load. **Source** dub, commslayer, clerk, posthog

- **RULE** Keep proof logos out of the fold of a product-led hero unless they are real and pinned below the frame; never replace the product with a logo wall.
  **Why** Logo strips occupy the fold in 6 of 23 heroes (vercel, stripe, neon, cal, plain, browserbase), and four of those (vercel, stripe, neon, browserbase) have no product UI. Among A and B heroes only plain pins one (over the frame bottom). The engine also forbids invented customers.
  **Applies to** landing page. **Check** no logo strip between CTA row and frame; any strip is real and sits below the frame top. **Source** vercel, stripe, neon, plain, cal, browserbase

### 2.7 Art-led and split variants (when the brief does not want a dashboard)

- **RULE** In an art-led hero keep the copy to one corner or centre column of at most 1/3 of the width and never let high-chroma art run behind body-size text.
  **Why** Stripe's ribbon crosses the h1 ("grow your revenue" runs over orange and violet) and its CTA copy; neon and vercel keep copy in a clean third (neon bottom-left over a dark field, vercel left column with the object centred); raycast puts a white 18px sub over a red beam. Legibility is best where the art is darkest or emptiest.
  **Applies to** landing page. **Check** visual: no text line sits over a region with chroma above about 0.15; sub contrast >= 4.5:1. **Source** neon, vercel, stripe, raycast

- **RULE** In a split hero make the right half a cropped product fragment or one object that bleeds off at least two edges; do not centre a small framed screenshot in the half.
  **Why** Untitledui's collage bleeds off top, right and bottom across the right 720px; granola's app window, halftone art and video tile bleed off the right edge; mintlify's frame bleeds off right and bottom; cal keeps the whole widget inside a card (the only split hero that does not bleed) and shows only a calendar.
  **Applies to** landing page. **Check** the right-half visual's bounding box exceeds the viewport on >= 2 sides. **Source** untitledui, granola, mintlify, cal

## 3. Numbers & scales

### 3.1 Per-site measurements (1440x900, dsf 1)

| site | arch | align | h1 px/wt | track em | lh | lines | sub px (lines) | CTA h / radius | nav h (kind) | product top y / w |
|---|---|---|---|---|---|---|---|---|---|---|
| linear | B | left | 64/510 | -0.022 | 1 | 2 | 15 (1) | none in hero | 72 (bar) | 527 / 1320 |
| clerk | B | left | 56/700 | -0.035 | 1.143 | 2 | 18 (1) | none in hero | 42 (pill) | 418 / 1200 |
| framer | B | left | 54/500 | -0.04 | 1 | 2 | none | 34 / 8 | 64 (bar) | 372 / 1200 |
| cursor | B | left | 26/400 | -0.0125 | 1.25 | 2 | none | 43 / pill | 52 (bar) | 351 / 1300 (window 401 / 1080) |
| ramp | B | left | 64/400 | -0.0002 | 1 | 1 | 18 (1) | 52 / 8 | 44 (bar) | 465 / 1312 |
| supabase | B | left | 46/500 | 0 | 1 | 2 | 16 (3, right column) | 38 / 9.3 | 64 (bar) | 451 / 1088 (bento row) |
| attio | A | centre | 64/600 | -0.02 | 0.95 | 1 | 18 (2) | 36 / 10 | 67 (bar) | 580 / 1080 |
| dub | A | centre | 48/500 | 0 | 1.15 | 1 | 20 (2) | 38 / 8 | 56 (bar) | 547 / 908 |
| plain | A | centre | 80/400 | -0.02 | 1 | 2 | 24 (2) | 43 / 6 | 40 (bar) | 660 / 1200 |
| commslayer | A | centre | 48/400 | 0 | 1 | 2 | 20 (1) | 44 / pill | 48 (pill) | 580 / 1368 |
| alignui | A | centre | 80/550 | -0.035 | 1.1 | 2 | 18 (1) | 44 / 13 | 72 (pill) | none in fold |
| **kestrel** | A | centre | 72/550 | -0.045 | 1.04 | 2 | 18 (1) | 44 / 14 | 44 (bar + track) | 476 / 1136 |
| cal | C | left | 64/600 | 0 | 1.1 | 3 | 16 (3) | 36 / 12 | 57 (bar) | 192 / 1176 (contained card) |
| granola | C | left | 86.4/400 | -0.02 | 0.93 | 4 | 20 (2) | 56 / pill | 56 (pill) | 119 / 460 (collage) |
| untitledui | C | left | 44/600 | -0.02 | 1.25 | 2 | 18 (3) | 46 / 8 | 56 (bar) | collage, right 720px |
| mintlify | C | left | 50/400 | -0.04 | 1.04 | 3 | 18 (2) | 42 / 4 | 64 (bar) | 415 / 1057 (bleeds right) |
| resend | C | left | 96/400 | -0.01 | 1 | 2 | 18 (2) | 48 / 16 | 58 (bar) | 3D object, no UI |
| vercel | C | left | 64/400 | -0.06 | 1 | 2 | none | 40 / pill | 64 (bar) | object, no UI |
| stripe | D | left | 48/300 | -0.02 | 1.15 | 4 | none (grey h1 tail) | 48 / 4 | 64 (bar) | art, no UI |
| raycast | D | centre | 64/600 | 0 | 1.1 | 2 | 18 (2) | 36 / 8 | 42 inner, 76 pill (pill) | art, no UI |
| mercury | D | centre | 49.3/480 | 0 | 1.1 | 1 | 21 (2) | 40 / 32 | 72 (bar) | photo, no UI |
| neon | D | left | 56/400 | -0.04 | 1.125 | 2 | none | 44 / pill | 64 (bar) | shader, no UI |
| browserbase | D | centre | 45/500 | -0.02 | 1.15 | 2 | 20 (2) | 39 / pill | 52 (bar) | dither art, no UI |
| posthog | E | left | 36/800 | -0.025 | 1.111 | 1 | 17 (3) | 47 / 8 | OS menubar | 463 / 980 (tabs) |

Notes: line counts verified against the screenshots (supabase and Kestrel are two visual lines; the script's range counter over-reports because of a line break and an inline tile). Linear's cta row is absent from the hero; its only sign-up control is the 32px white pill in the nav. Cal, framer and plain are Framer-built and report scaled 12px labels, so their label sizes are excluded from font-size stats.

### 3.2 Medians and ranges (23 benchmark sites, Kestrel excluded)

| property | median | range | n | Kestrel |
|---|---|---|---|---|
| h1 size (px) | 56 | 26 to 96 | 23 | 72 |
| h1 size, archetype A only | 64 | 48 to 80 | 5 | 72 |
| h1 weight | 500 | 300 to 800 (15 of 23 at 500 or lighter) | 23 | 550 |
| h1 tracking (em) | -0.02 | -0.06 to 0 | 23 | -0.045 |
| h1 line-height (ratio) | 1.1 | 0.93 to 1.25 | 23 | 1.04 |
| h1 lines | 2 (1 line x5, 2 x14, 3 x2, 4 x2) | 1 to 4 | 23 | 2 |
| h1 text width (px) | 518 | 303 to 921 | 23 | 645 |
| h1 characters | 38 | 20 to 173 (stripe, includes grey tail) | 23 | 35 |
| h1 top y (px) | 250 | 131 to 518 | 23 | 150 |
| h1 top y, nothing above it | 179 | 131 to 370 | 10 | 150 |
| sub size (px) | 18 | 15 to 24 | 18 | 18 |
| sub size / h1 size | 0.31 | 0.19 to 0.47 | 18 | 0.25 |
| sub lines | 2 (1 x6, 2 x8, 3 x4) | 1 to 3 | 18 | 1 |
| sub characters | 88 | 26 to 151 | 18 | 77 |
| sub text width (px) | 492 | 248 to 725 | 18 | 617 |
| sub characters per line | 50 | 26 to 82 | 18 | 77 |
| h1 to sub gap (px) | 24 | 8 to 36 | 16 | 18 |
| sub to CTA gap (px) | 34 | 24 to 56 | 6 | 32 |
| primary CTA height (px) | 43 | 34 to 56 | 21 | 44 |
| CTA radius (px, non-pill) | 8 | 4 to 16 (a further 7 are pill-shaped) | 14 | 14 |
| CTA label size (px) | 16 | 14 to 18 | 19 | 15 |
| nav track height (px) | 58 | 40 to 72 | 21 | 44 |
| nav link size (px) | 14 | 13 to 16 | 19 | 14 |
| product frame top y (px, bleeding frames) | 464 (51.6% of fold) | 351 to 660 | 12 | 476 |
| product frame width (px) | 1200 (83%) | 908 to 1368 | 13 | 1136 |
| visible product share of fold | 36% | 22% to 49% | 10 | 37% |
| copy block height (px) | 184 | 130 to 350 | 9 | 272 |
| gap copy block to frame (px) | 60 | 40 to 98 | 9 | 54 |
| frame outer radius (px) | 16 | 10 to 24 | 12 | 22 |
| saturated pixel share (product-led) | about 0.3% | 0 to 1.8% | 12 | 0.9% |

### 3.3 Counts (of 23)

| property | count |
|---|---|
| archetype A / B / C / D / E | 5 / 6 / 6 / 5 / 1 |
| left-aligned / centred copy | 15 / 8 |
| product UI in the fold | 15 |
| frame bleeds off the fold bottom | 14 of those 15 |
| eyebrow, chip or metric above the h1 | 12 (no eyebrow: 11) |
| announcement bar above the nav | 7 (clerk 40, attio 48, mercury 49, ramp 40, neon 36, plain 40, alignui 40 px) |
| vertical rails | 5 (stripe, cal, dub, alignui, browserbase) |
| logo or proof strip in the fold | 6 |
| light / dark / photo-art-card theme | 15 / 5 / 3 |
| h1 sentence case / title case | 22 / 1 (vercel, two words) |
| h1 ends with a full stop | 8 (stripe, raycast, attio, ramp, neon, cursor, commslayer, browserbase) |
| nav: flat bar / floating pill / OS metaphor | 17 / 5 / 1 |
| 0 / 1 / 2 / 3 hero CTAs | 2 / 5 / 15 / 1 |
| no subtitle | 5 (vercel, stripe, framer, neon, cursor) |
| product tabs or switcher | 4 (dub, commslayer, clerk, posthog) |
| Inter-class h1 face | 6 (linear, raycast, attio, neon, untitledui, alignui); the other 17 use a non-Inter face; Kestrel is Inter Variable |
| one or no accent hue in chrome | 20 |

### 3.4 Product frame construction (DOM-measured)

| site | levels | outer radius | padding | ring / border | shadow | fill |
|---|---|---|---|---|---|---|
| kestrel | shell + inner | 22 / 16 | 6 | rgba(23,23,23,.06) | ring + layers | shell white 55%, inner white |
| dub | shell + inner | 20 / 12 | 12 | 1px #e5e5e5 / 1px #d4d4d4 | none | shell transparent, inner white |
| linear | wrapper + inner | 12 / 12 | 8 | inner 1px rgba(255,255,255,.08) | none | #090a0b / #101112 |
| attio | single, translucent | 16 | 6 horizontal | 1px 6% ink (shadow ring) | 0 1 2 2.4%, 0 3 6 3%, 0 8 14 3.5% | oklab white-ish 80% |
| cursor | single window | 10 | 0 | 1px 10% ink (shadow ring) | 0 28 70 14%, 0 14 32 10% | #f2f1ed |
| cal | contained card | 12 | 0 | none | 0 1 5 -4 70%, 0 4 8 5% | white |
| clerk | single | 16.5 | 0 | 1px 6% ink (shadow ring) | none | transparent |
| ramp | single | 12 | 0 | 1px rgba(33,33,33,.10) | none | transparent over grey |
| mintlify | single | 23.5 | 0 | 1px rgba(31,167,122,.08) | none | transparent |
| framer | single (video) | 18 | 0 | hairline visible on black | none | black |
| posthog | OS window | 20 | 0 | none | 0 4 6 -1 10%, 0 2 4 -2 10% | rgba(229,231,224,.75) |
| plain | single | 12 | 0 | none | none | #f3fbe9 (pale green) |
| commslayer | dark hero card | 24 | inset 8 from viewport | none | none | #08090c with radial top glow |

## 4. Dos and Don'ts

- **Do** show a product frame under the copy with its top at about half the fold and let it run off the bottom, cut through a row (linear, framer, clerk, cursor, dub). **Don't** end the fold on a tidy card with empty padding below it: it reads as a finished screenshot.
- **Do** freeze an AI panel mid-answer ("Thinking...", streaming text, typing caret) inside the frame (linear, attio, cursor, granola, posthog). **Don't** show only a finished, static chart; nothing in it is alive.
- **Do** keep the headline at 44 to 64px, weight 500 to 600, tracked at -2% (linear, attio, clerk, framer). **Don't** reach for 96px or weight 800 unless the headline is the visual and the face is built for it (resend serif 96, posthog 800 in its own brand face).
- **Do** use a licensed or custom display face for identity, or Inter Display with tight tracking (attio, linear). **Don't** set stock Inter at 400 with 0 tracking for the h1; no benchmark site does (neon sets Inter 400 at -4%; raycast sets Inter at 0 but at weight 600).
- **Do** keep colour to one accent plus ink (linear, attio, dub, cursor). **Don't** colour the headline and the CTA and the frame and the background; art-led heroes that do (stripe 18.7%, raycast 18.8% saturated pixels) have no product proof.
- **Do** frame the product with a 1px ring at 6% to 10% ink and stacked low-alpha shadows (attio, clerk, linear). **Don't** drop a bare wide blur such as cursor's 0 28px 70px at 14% with no negative spread; it muddies a light canvas (Kestrel avoids this with a -20px spread).
- **Do** put 40 to 100px between the copy block and the frame (framer 40, clerk 56, ramp 53, linear 71). **Don't** push the frame so low that visible product falls under 22% (plain's 660px top leaves 22%).
- **Do** centre copy only over a symmetric full-width visual (attio, dub, commslayer). **Don't** centre copy beside an offset or cropped visual; left-align it on the nav's left edge (ramp, supabase, framer, mintlify).
- **Do** let text on art sit in the emptiest or darkest region (neon's bottom-left over black). **Don't** run a high-chroma ribbon through the headline (stripe).
- **Do** pin a real logo strip only below the frame (plain). **Don't** invent customers or fill the fold with a logo wall when the product could be shown.

## 5. Exceptions & judgement calls

**Archetype ranking by how premium it reads** [engine note]. This is judgement layered on the measurements.
1. **B, product window under left-aligned copy** (linear, clerk, framer, cursor, ramp). Highest authority and information density: copy blocks of 130 to 184px, product tops at 351 to 527, frame 1200 to 1320px wide, saturated pixels 0 to 1.2%. Dark Linear is the cleanest execution (flat #08090a, hairlines at 8% white, a pager and issue IDs in the product).
2. **A, centred copy over a bleeding frame** (attio, dub, commslayer, plain, kestrel). Warmer and more welcoming; the same geometry as B with a symmetric axis. This is the founder's default and most of its best sites combine a bezel, a wash or tab switcher, and a real-looking AI moment.
3. **C, split** (granola, untitledui, cal, mintlify). Friendly and memorable but the product is demoted to a fragment; good for consumer or prosumer, weaker proof density.
4. **D, art-led** (stripe, raycast, mercury, neon, browserbase). The most atmosphere and craft (shader, photograph, dither) but no proof in the fold. It fails the engine's product-proof requirement and the founder's "largest element is product UI" rule.
5. **E, metaphor** (posthog's desktop OS). Distinctive and unrepeatable; do not copy.

**Where the benchmarks and the founder rules differ (founder wins).**
- *Casing.* 22 of 23 benchmark h1s are sentence case; the founder asks for Title Case. Keep Title Case. Treat the benchmark as evidence that Title Case is a house choice, not a market default, so pair it with tighter tracking and a clear headline device (Kestrel's icon tile).
- *Trailing full stop.* 8 of 23 end the h1 with a period (stripe, raycast, attio, ramp, neon, cursor, commslayer, browserbase). The founder bans it. Keep no period.
- *Eyebrow above the h1.* 12 of 23 have one (chips at resend, attio, cal, dub, granola, untitledui; a live metric at stripe, ramp, mintlify; a mono label at neon; an announcement line at vercel; an avatar pill at alignui). The founder bans anything above the headline. The 11 without one include linear, clerk, framer, cursor, commslayer and browserbase, so the ban costs no premium.
- *Announcement bars above the nav.* 7 of 23 carry a 36 to 49px bar (clerk, attio, ramp, plain, alignui dark; mercury white; neon halftone). The founder's rule covers chips between nav and headline, not a bar above the nav. Use one only for real news, 40px tall, and never as a substitute for proof.
- *Secondary CTA.* Benchmarks use outline, white or translucent secondaries; the founder wants text-only. Framer's translucent "Download app" and resend's text-link "Documentation" are the closest precedents.
- *Hero CTA radius.* Median non-pill radius is 8; founder wants about 14 to match a soft product. Seven benchmarks use full pills, so a soft shape is well within the market.
- *No hero CTA.* Linear and clerk ship no hero CTA and rely on the nav button and the product. That works only because the product is the proof and the nav action is a 32px white pill. The founder's brief always wants the CTAs, so ignore this.

**Other judgement calls.**
- Live counters (stripe's GDP figure, ramp's agents ticker, mintlify's agent traffic) replace the chip with motion but must be real or labelled sample. They also sit above the h1, so the founder's no-eyebrow rule excludes them in the hero; ramp's ticker pinned to the bottom of the fold is the only placement compatible with the rule.
- Product tabs (dub, commslayer, clerk, posthog) prove several workflows but add a row between the CTA and the frame (about 35px) and a second control family. Founder prefers simple product UI; use only when the product genuinely has three or more stories.
- Cursor's art backdrop behind a window and mintlify's generative wave canvas add depth to a light hero, at the cost of a second visual layer; the founder allows at most one effect layer at low contrast.
- Consent banners were present in many captures (stripe, clerk, attio, mercury, ramp as a full modal, posthog, supabase, framer, neon, cursor, granola as a dimming modal, plain, commslayer, mintlify). The DOM measurements remove the dialogs first; the screenshots keep them, so judge frame visibility from the measurements, not from covered areas (ramp, granola).

## 6. Figures worth keeping

All in `knowledge/benchmarks/product-heroes/` at 1440x900:
- `linear-1440.png`: the cleanest B hero. Dark, left copy, one-line sub, no CTA, product window with a thinking agent panel cut mid-row.
- `attio-1440.png`: the cleanest A hero in light. Centred, 6px translucent bezel, lavender wash, "Thinking" chat state.
- `dub-1440.png`: A with a double bezel, grid between rails and a three-tab product switcher.
- `commslayer-1440.png`: A on a dark r24 card with floating channel tiles and a five-tab switcher (the Kestrel tile idea).
- `cursor-1440.png`, `framer-1440.png`, `clerk-1440.png`, `ramp-1440.png`: B variants (art backdrop, dark video frame, tabbed frame, dot grid plus ticker).
- `plain-1440.png`: A with an email capsule, a pale-green frame and a pinned logo strip.
- `granola-1440.png`, `untitledui-1440.png`, `mintlify-1440.png`, `cal-1440.png`: C variants.
- `stripe-1440.png`, `raycast-1440.png`, `mercury-1440.png`, `neon-1440.png`, `browserbase-1440.png`, `resend-1440.png`, `vercel-1440.png`: D and object-led heroes, for craft reference only.
- `alignui-1440.png`, `kestrel-1440.png`: the founder's reference and the accepted hero, for side by side comparison.
- `measurements.json`: raw and curated numbers plus stats.

## 7. Coverage and limits

- 23 of the 24 listed sites were studied: linear, vercel, stripe, raycast, resend, clerk, attio, cal, mercury, ramp, posthog, supabase, framer, dub, neon, cursor, granola, plain, commslayer, alignui, untitledui, mintlify, browserbase. **height.app** returned a closed connection and a blank page (the product is no longer served), so it has no screenshot or measurement. Neon now serves from neon.tech (title "Neon is part of the Databricks platform").
- Captured 2026-10-08, single run per site, 4 to 6s after load, nothing hovered, no scroll, no cookie choice made. Heroes rotate (posthog, attio and granola change copy often), so treat numbers as a snapshot of this date.
- DOM numbers come from computed styles with consent dialogs removed; line counts from Range client rects (verified visually for supabase and Kestrel); product frame detection is heuristic (largest bordered, rounded or shadowed block under the h1), so frame tops and widths for cursor (window vs backdrop), commslayer, posthog and mintlify were checked against the screenshots. Saturated-pixel and rail figures come from a pixel scan of the screenshots (every 4th pixel for hue; 1px columns for rails).
- Not measured: motion, hover states, scroll behaviour, mobile layout, below-the-fold sections, font licensing, and conversion performance of any hero. No claim here is about conversion.

## 8. What Kestrel already does vs what the best sites add

**Kestrel already matches the best sites on:**
- Archetype and geometry: centred A with the frame top at y=476 (median 464), a 54px gap to the frame (median 60), visible product 37% of the fold (median 36%).
- Headline: two lines, no eyebrow, h1 top at y=150 (the no-eyebrow band is 130 to 230), -4.5% tracking at weight 550 in Inter Variable (inside the Inter-class pattern: linear -2.2%, alignui -3.5%).
- Subtitle at 18px, one line, gap 18px (median 24), sub/h1 ratio 0.25 (range 0.19 to 0.47).
- CTA at 44px (median 43), one shape language across primary and secondary, neutral ink primary (13 of 21 benchmarks).
- Frame: a double bezel with concentric corners (22 = 16 + 6), 55% translucent shell and a 6% ring, the same recipe as attio, dub and linear; shadow layers 6% ring, 0 2px 4px 3% and a 24/56/-20 lift at 16%.
- Background: dot texture inside rails only (rails at x=120/1320, the same pattern as dub and alignui), one accent hue, 0.9% saturated pixels (product-led median about 0.3%, ceiling 1.8%).
- Product mid-task: Ask Kestrel answers a question on sample data (Northwind, labelled sample), as posthog, attio and linear do.
- The inline icon tile in the headline and the floating source tiles with routes are both unique among the 23 (commslayer's tile is the closest).

**Concrete upgrades the best sites suggest** (each stays inside the founder rules; try one at a time and A/B the screenshots):
1. **Trim the copy block from 272px toward 230px.** The benchmark median is 184 (maximum 232 outside plain's email-form block). Lever: h1 72 -> 64 (the archetype A median is 64) saves about 17px (two lines at line-height 1.04); the 24px median h1-to-sub gap would add 6px back, so keep the gap at 18 if the aim is height. Moving the frame top from 476 to about 465 lifts visible product from 37% to about 38% at the current 1136 width; the larger gain comes from item 2. Check that the two-line, tile-in-headline composition still holds at 64px; the founder loved the current scale, so test side by side before adopting.
2. **Widen the frame to rail-to-rail 1200** (clerk, framer and plain are exactly 1200 at x=120) from 1136 inset 32 per side. This adds 64px of UI width and lifts visible product from 37% to about 39% at the same top; alternatively keep a small inset and widen to 1168. Linear (1320), ramp (1312) and commslayer (1368) go further, past the rails. Note the dot grid and routes are bounded by the rails, so a flush frame hides the 32px of dotted margin that frames it today.
3. **Add a hue-matched wash behind the frame** (attio's lavender, dub's tinted lower panel, plain's pale-green frame): one 6% to 8% blue radial rising from the frame top across the lower 40% of the rails area, replacing nothing, kept below 10% alpha. Today the frame sits on flat #f7f7f7 plus dots; the best light heroes give the product a "stage". The founder allows one effect layer at low contrast, so the wash must replace or merge with the route glow rather than add a third layer.
4. **Let the frame cut through a row.** The fold currently ends in a faded "Saved" label under the sidebar; linear, framer, clerk, cursor and dub all end through a content row. Shift the frame about 20 to 30px so the 900px line crosses a sidebar item or table row, not a label gap.
5. **Add one live in-progress state beyond the answer.** Linear, attio and cursor freeze a "Thinking" or "Generating" state; Kestrel's streamed answer is the finished state. Hold the first 1.2s of the loop on a "Thinking..." row, then stream (the Round 6 timeline already stages this).
6. **Consider a three-tab switcher only if the founder wants a second story** (Ask / Funnels / Retention, 34 to 36px tabs with 16px icon tiles, above the frame as dub and commslayer do). It costs about 35px of vertical space and adds a second control family; the founder has favoured simpler product UI, so this is optional.
7. **Subtitle colour and contrast.** Kestrel's #5c5c5c on #f7f7f7 is about 6.2:1 (computed) and sits between clerk #5e5f6e and dub #525252, so no change is needed; keep it.
8. **Shadow audit (optional).** Kestrel's `--shadow-frame` has a 0 24px 56px -20px layer at 16%. Attio's largest layer is 0 8px 14px at 3.5%, clerk's and linear's frames have no outer lift at all, and cursor is the only benchmark with a heavier one. The founder approved the frame as built, so only test a softer version (for example 0 12px 32px -16px at 10%) if the frame ever reads heavy on a white screen.
9. **Do not copy:** chips above the headline, metric tickers above the h1, sentence-case headlines, trailing full stops, pill CTAs on a soft frame without checking radius against the frame (founder: CTAs share the product's roundness), stripe-style ribbons or raycast-style beams, logo walls.

