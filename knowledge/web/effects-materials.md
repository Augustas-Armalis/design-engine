---
source: web:apple.com (home, iphone, macbook-pro, store, apple-vision-pro), stripe.com, linear.app, vercel.com, raycast.com, attio.com, affectui.com, clerk.com, framer.com, joshwcomeau.com/css/designing-shadows, tobiasahlin.com/blog/layered-smooth-box-shadows, resend.com, liveblocks.io, cursor.com, neon.com, mintlify.com, mercury.com, evervault.com, github.com/features/copilot, supabase.com, cal.com, arc.net, family.co, rauno.me, folk.app, figma.com, granola.ai, lightfield.app (32 pages measured 2026-10-10, Playwright Chromium 156, 1440x900) + figma.com/blog/desperately-seeking-squircles + github.com/phamfoo/figma-squircle (src/draw.ts, distribute.ts) + paintcodeapp.com/news/code-for-ios-7-rounded-rectangles + drafts.csswg.org/css-borders-4 + developer.mozilla.org/docs/Web/CSS/corner-shape + developer.chrome.com/blog/implementing-corner-shape + smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui + joshwcomeau.com (designing-shadows, shadow-palette, backdrop-filter) + tobiasahlin.com (layered shadows, animate box-shadow) + github.com/vercel-labs/web-interface-guidelines + linear.app/now/how-we-redesigned-the-linear-ui + apple.com/newsroom (Liquid Glass) + developer.apple.com/videos/play/wwdc2025/219 + kube.io/blog/liquid-glass-css-svg + css-tricks.com (grainy-gradients, easing-linear-gradients) + css-tip.com/border-gradient + ryanmulligan.dev/blog/css-property-new-style + Magic UI sources + github.com/ibelick/background-snippets + vanilla-tilt.js source
chapter: Effects and materials: smooth corners (squircles), professional shadows, textures, glass, light and motion effects, measured and fitted
pages: n/a (live measurement; raw JSON + folds in knowledge/benchmarks/effects/raw/, crops in knowledge/benchmarks/effects/, fit in system/effects/demo/fit.json)
topic_tags: [squircle, corner-smoothing, corner-shape, superellipse, continuous-corners, apple, figma, shadows, elevation, dark-mode, coloured-shadows, grain, noise, dither, gradients, oklab, banding, gradient-border, mask-composite, glass, backdrop-filter, progressive-blur, liquid-glass, glow, spotlight, shimmer, beam, dot-grid, vignette, tilt, duotone, performance]
status: studied
extends: knowledge/web/type-hierarchy-buttons-shadows.md (2.10 shadow construction, 3.13-3.16 stacks and Geist materials), knowledge/web/color-and-surfaces.md (E gradients, F shadows, H glass, I grain), knowledge/web/dark-mode-premium.md (light construction, grain on dark, frame edges), knowledge/web/button-grammars.md (glass, spotlight, keycap buttons). This note does not repeat their rules; it adds smooth corners (new), a validated 5-tier shadow scale, and per-effect recipes measured on 32 more pages.
---

# Effects and materials

**What this adds.** The engine already knew shadow *construction* (ring + soft layers, doubling ladder, tinted ink, dark replaces rather than deletes) and the dark-mode light inventory. It did not know: how Apple's continuous corners work and how to ship them on the web; whether the shadow tokens in `type-hierarchy-buttons-shadows.md` 3.14 actually render well (their open question 1, never rendered); or exact values for grain, glass, gradient borders, beams, spotlights, shimmers, dot fields and tilt on sites the founders rate. Everything below was measured with `knowledge/benchmarks/effects/scripts/effects-measure.mjs` (every element and its `::before`/`::after`, plus a grep of all loaded CSS), or fitted by raster comparison in `system/effects/demo/fit.mjs`.

**Files.** Tokens and classes: `system/effects/shadows.css` + `shadows.json`, `system/effects/textures.css`, `system/effects/squircle.ts` (+ `squircle.test.ts`). Rendered specimens: `system/effects/demo/squircle-compare.png`, `shadows.png`, `textures.png` (built by `demo/build.mjs`). References: `knowledge/benchmarks/effects/*.png` with `CREDITS.md`.

Evidence grading: **[M]** measured computed style or pixels; **[F]** fitted by raster comparison (fit.json); **[P]** primary written source; **[engine note]** synthesis.

---

## 1. Core ideas

1. **A smooth corner keeps the corner's apex and lengthens its run-in.** Figma smoothing and Apple's continuous corner put the 45-degree apex exactly where `border-radius: R` puts it (0.42R from the vertex, all three measured identical) [F]. What changes is where the edge starts to bend: 0.95R for a circular corner, 1.12R for Apple, 1.17R for Figma 60%, 1.44R for Figma 100% [F]. That is why a squircle reads "softer but not rounder", and why the right plain-CSS fallback is the *same* radius.
2. **Figma 60% is Apple.** Sweeping Figma smoothing from 0.5 to 0.8 against Apple's `UIBezierPath` continuous corner (PaintCode's reverse-engineered constants), the closest is exactly 0.6 (27 px² coverage difference at R 96, against 97 px² for a plain circular corner) [F]. Figma's own claim ("ξ = 0.6 just about nails the iOS shape") holds.
3. **CSS `corner-shape: squircle` is not the iOS squircle.** `squircle` = `superellipse(2)` = exponent 4. At the same radius its apex sits at 0.23R, so it reads like a plain radius of 0.6R: much squarer than iOS [F]. The native match for Figma 60% / Apple is `superellipse(1.32)` with the radius scaled by 1.2 [F]. Framer ships `superellipse(1.5)` and falls back to `radius x 0.752`; the fit puts the best plain stand-in at 0.76 [F], which confirms Framer's constant.
4. **`corner-shape` is Chromium-only (Chrome 139, Aug 2025); Safari and Firefox have it only in preview builds (MDN BCD, Oct 2026)** [P]. 6 of 32 measured sites already ship it in CSS (Framer, Clerk, Resend, Cal, Evervault, Josh Comeau). 2 render it on elements: Clerk's 32px tiles at r12 `squircle`, and Framer cards r10-30 at `superellipse(1.5)` [M]. Apple.com uses none: circular 980px pills, 28px glass pills, 18-20px cards [M]. Apple's continuous corner is a native-platform trait (UIKit `cornerCurve = .continuous`, SwiftUI `.continuous`), not a web one.
5. **Premium shadows are faint and layered.** Across 277 blurred layers on light pages, the median alpha is .08 (p25 .05, p75 .15) and the median blur is 5px (p90 36px) [M]. On dark pages the median is .12 (p75 .28) at a median blur of 20px [M]. The median stack has 2 layers, and the most measured is 9 [M].
6. **Light comes from straight above.** 27 of 32 sites keep x = 0 on every shadow. The exceptions are small: Apple Store cards `2px 4px 12px .08`, Apple home media `3px 5px 30px .22`, Evervault `-7px 10px`, Comeau's demos, and one Raycast layer [M].
7. **Edges carry the depth, not the blur.** Rings (`0 0 0 1px`) are the most common shadow string on almost every site, and at least five ways of building an edge are measured:
   - ring only (Vercel, Affect UI);
   - a crisp contact line (Cal);
   - a tray halo (Granola);
   - an ambient-only lift (Lightfield);
   - on dark, an inset white ring plus an outer black hairline (Linear, Raycast) [M].
8. **Glass is everywhere, but the premium version always sits over something that varies.** 19 of 32 sites use `backdrop-filter`. The values that read premium cluster at fill alpha .6-.8, blur 7-36px and saturate 1.4-1.8, with a hairline rim (Apple, Raycast, Mercury, Linear, Lightfield) [M]. Progressive blur (stacked masked layers) replaces the single hard-edged blur box on Clerk, Affect UI and Mercury [M].
9. **Grain is a tooth, not a texture.** 8 of 32 sites add grain, always over light, gradients or imagery:
   - Liveblocks `soft-light` .045, fractalNoise .86 at 180px;
   - Linear `overlay` grain PNG at .25-.9 over feature panels;
   - Framer an animated 12-frame sprite at .05;
   - Arc and Neon baked noise files;
   - Mercury and Folk fractalNoise .65 and 1.2 [M].

   Dither is the opposite: a visible signature pattern, Larpo's own (founder-taste).
10. **Effects are state or light, never decoration.**
    - Shimmer appears only on "thinking/working" labels (Cursor, Attio, Affect UI).
    - Beams appear on one badge or announcement (Raycast 3s, Linear 2s).
    - Spotlights follow the pointer on hover only (Liveblocks .15s).
    - Glows sit behind an object at white .03-.04 (Linear).

    No measured site runs more than two looping effects in one viewport [M].

---

## 2. Rules

### 2.1 Smooth corners (EF-01 to EF-09)

- **RULE EF-01** Use smooth corners where the corner is large enough to be seen: app/record tiles and avatars (any size, they read as objects), cards and frames at R >= 20px, hero product windows. Below R ~12px, or below 0.4 smoothing, a squircle is indistinguishable from `border-radius` and costs a clip path for nothing.
  **Why** Fit at R 96: smoothing 0.2 differs from a plain radius by 10 px² over the whole corner and 0.4 by 27 px², both about 0.1px of mean offset. The best native match for both is plain `round` at the same radius. At R 12 the run-in difference (1.17R vs 0.95R) is about 2.6px, which survives only on large-radius objects.
  **Applies to** all. **Check** squircle used only where R >= 20 or the element is an icon/avatar tile; smoothing >= 0.5 wherever used. **Source** fit.json native/plainRadius [F]

- **RULE EF-02** Default smoothing is 0.6 (Figma 60%) when the brief says "Apple-like", "iOS" or "smooth"; use 0.8-1.0 only for a deliberately pillowy brand voice; never mix smoothings on one site.
  **Why** Apple's continuous corner is closest to Figma 0.6 (27 px² at R 96; 0.55 → 36, 0.65 → 37, 0.8 → 100). One corner family is part of the one-shape-language rule (founder: one radius ladder, one edge treatment).
  **Applies to** all. **Check** every `<Squircle>` / squircle path on the site shares one `smoothing`. **Source** fit.json apple [F]; Figma blog [P]; founder-taste (one visual language)

- **RULE EF-03** When a Figma file uses corner smoothing, ship `border-radius` at the *same* radius as the fallback, and keep the radius ladder the founder approved; smoothing does not change the ladder.
  **Why** Figma smoothing preserves the apex (diagonal depth 0.42R at smoothing 0, 0.6 and 1.0). The best plain-radius stand-in is scale 1.00 up to 0.8 smoothing and 1.04 at 1.0. "Normalising" a smoothed radius up or down silently changes how round the product looks (the Kestrel round-3 failure in CLAUDE.md).
  **Applies to** all. **Check** fallback `border-radius` = design radius (±4%); computed radius diff vs the accepted build = 0. **Source** fit.json profiles/plainRadius [F]; CLAUDE.md radius note

- **RULE EF-04** Never write `corner-shape: squircle` to mean "iOS corner". The native equivalent of Figma 60% / Apple is `border-radius: calc(R * 1.2); corner-shape: superellipse(1.32)` (use `nativeCornerFor(R, s)` from `squircle.ts` for other smoothings: 0.8 → `superellipse(1.76)` at 1.56R, 1.0 → `superellipse(2.2)` at 2.14R).
  **Why** `squircle` (K 2, exponent 4) at radius R puts the apex at 0.23R; it matches a plain radius of 0.6R and reads boxy. Superellipse corners are drawn inside the radius box, so any K > 1 needs a larger radius to look equally soft. Resend raises the radius under `@supports (corner-shape: squircle)` (rounded-2xl/3xl), and Framer scales its fallback to 0.752x.
  **Applies to** all. **Check** grep `corner-shape:\s*squircle`: each hit is a deliberate square-ish shape recorded in DIRECTION.md; iOS-intent shapes use `superellipse(1.3x)` with radius 1.2x. **Source** fit.json native/squircleKeyword [F]; resend, framer CSS [M]; CSS Borders 4 / MDN (K = log2 exponent) [P]

- **RULE EF-05** Ship native corner shapes as progressive enhancement only:
  - **Baseline:** a full `border-radius` that looks right everywhere.
  - **Override:** the corner shape inside `@supports (corner-shape: superellipse(2))`.
  - **Single-variable form (Framer's pattern):** `@supports (corner-shape: superellipse(2)) { :root { --cs-on: 1 } }` and `border-radius: calc(R * var(--cs-on, .752)); corner-shape: superellipse(1.5)`.

  **Why** Chrome/Edge 139+ only; Safari and Firefox are at preview as of Oct 2026. Framer and Resend both gate it, and Clerk applies it on 32px tiles where a fallback circle-corner is harmless.
  **Applies to** all. **Check** every `corner-shape` declaration sits inside `@supports` or next to a matching baseline radius; screenshot Firefox/WebKit (Playwright) and diff against Chromium. **Source** framer.com and resend.com CSS [M]; MDN BCD, Chrome intent-to-ship [P]

- **RULE EF-06** Give a smoothed corner its room: each corner consumes `(1 + smoothing) * R` of every edge it touches, so a uniform squircle needs the short side >= `2 * (1 + s) * R` (3.2R at 0.6). Below that, Figma (and `squircle.ts`, `preserveSmoothing: false`) reduces the smoothing automatically. Pills (R = h/2) stay plain `border-radius: 999px`; never squircle a pill or a 32px button at R 12+.
  **Why** figma-squircle budget = min(w,h)/2 per corner, distributed largest corner first. Apple's own clamp is `MIN(w,h)/2/1.52866`. A 40px button at R 14 has p = 22.4 > 20, so the smoothing collapses and the shape is a plain corner anyway.
  **Applies to** buttons, chips, inputs. **Check** for squircle elements: min(w,h) >= 3.2R; pills use circular radius. **Source** figma-squircle draw.ts [P]; PaintCode [P]; squircle.test.ts clamp test

- **RULE EF-07** In the SVG fallback:
  - **Clip:** `clip-path: path()`, regenerated by a ResizeObserver.
  - **Border and ring:** clip-path clips them, so draw them as an even-odd SVG band between two offsets of the shape (exact width at every point).
  - **Blurred shadows:** put them on an unclipped sibling with `border-radius = R`, because blur >= 4px hides the corner difference.
  - **drop-shadow:** use `filter: drop-shadow()` only for contact shadows tighter than 4px, since it has no spread and costs a filter pass per layer.

  **Why** clip-path removes `box-shadow` and `border` outside the path (CSS-Tricks, MDN). The band approach is what `<Squircle mode="svg">` renders; the client test confirms the path regenerates on resize (300 → 420px wide).
  **Applies to** React builds. **Check** a squircle element with a visible edge has either native `corner-shape` or an SVG band; no `box-shadow` declared on a clip-path element. **Source** squircle.ts + squircle.test.ts [M]; CSS-Tricks clip-path + box-shadow [P]

- **RULE EF-08** Nest squircles concentrically: the inner shape is the outer shape inset by the padding, with radius = outer R − inset and the same smoothing (`getSquirclePath({ ...outer, inset })`). Never put a circular inner radius in a squircle frame, or a squircle inside a circular one.
  **Why** Vercel's interface guidelines: "Child radius <= parent radius & concentric so curves align". Mixed corner families show as a changing gap along the corner, because the run-ins differ by 0.2R.
  **Applies to** cards in frames, buttons in toolbars, icons in tiles. **Check** nested pair: inner R = outer R − padding (±1px), same corner family. **Source** Vercel guidelines [P]; fit.json profiles [F]

- **RULE EF-09** "Apple-like" on the web means Apple.com's measured system, not a squircle everywhere: circular pill buttons (980px radius, 44px), 28px-radius glass pills on 56px controls, 18-20px cards, one soft x-offset card shadow (`2px 4px 12px rgba(0,0,0,.08)`), glass nav `saturate(1.8) blur(20px)` at .8. Reserve squircles for icon-like objects.
  **Why** apple-home, iphone, macbook-pro, store and vision-pro measure 0 `corner-shape` elements; radii by frequency are 980px x35, 28px x96, 18px x73, 20px x48.
  **Applies to** landing page. **Check** an "Apple-like" DIRECTION.md cites these numbers; squircles only on tiles/avatars/frames. **Source** apple.com x5 [M]

### 2.2 Shadows (EF-10 to EF-19)

- **RULE EF-10** Use the five tiers in `system/effects/shadows.css`:
  - **1 resting:** cards, inputs. Ring .07 + `0 1px 2px .05`.
  - **2 raised:** hover, chips, hero side cards. Adds `0 4px 8px -2px .06`.
  - **3 floating:** popovers, menus, floating product cards. Ring .08 + three layers up to `0 16px 24px -8px .08`.
  - **4 overlay:** dialogs, palettes. Up to `0 32px 48px -12px .12`.
  - **5 hero frame:** one per page. Clerk/AlignUI doubling ladder to a 48px tail at .04-.05.

  Tiers 1-3 obey the founder card cap (blur <= 24px, alpha <= .16 per layer). A site uses at most three tiers in its product visuals.
  **Why** The tiers sit on the measured medians: light per-layer alpha .08, blur 5px, 2 layers. The specimen `system/effects/demo/shadows.png` renders all five on #f6f6f7, #fff and #0b0c0e, and each tier separates from the next while 1-2 stay whisper-level. That answers color-and-surfaces' open question 1 ("shadow scale unrendered").
  **Applies to** all. **Check** every `box-shadow` resolves to `var(--sh-1..5)` or a documented special; distinct shadow strings across product visuals <= 3 (founder). **Source** 32-site measurement [M]; founder-taste; Geist, Clerk, AlignUI (type-hierarchy 3.13) [M]

- **RULE EF-11** Spend alpha thinly across layers rather than on one layer:
  - **Per layer on light pages:** .02-.08.
  - **Tightest contact layer:** up to .15.
  - **Higher alpha:** only with a negative spread at least as large as the offset, as in Stripe's `.25 0 30px 45px -30px` or Cal's `.7 0 1px 5px -4px`.

  **Why** On light pages, p25/p50/p75 alpha is .05/.08/.15. The high outliers are exactly the negative-spread layers that never show a halo. Ahlin's demo shows one `.4 0 6px 6px` reads as a sticker, while five layers at .12 read as depth.
  **Applies to** all. **Check** any light-mode layer with alpha > .16 has spread <= −y (or is a 0-blur ring/inset). **Source** 32-site measurement [M]; Ahlin [P]; founder-taste (alpha <= .16)

- **RULE EF-12** For a crisp edge without a visible drop, use Cal's contact line: `0 1px 5px -4px rgb(ink / .7)` (only a 1px dark line shows under the bottom edge) plus one soft `0 4px 8px rgb(ink / .05)` and a ring .06-.1. Use it on cards that sit on a grey canvas when tier 1 looks too flat.
  **Why** Measured on 19 cal.com cards and tiles (`rgba(36,36,36,.7) 0 1px 5px -4px, rgba(36,36,36,.05) 0 4px 8px`). A −4px spread confines a strong colour to the bottom pixel, which is how a real object meets its surface.
  **Applies to** landing page, SaaS app UI. **Check** contact layer spread <= −(blur − 1); only one contact layer per stack. **Source** cal.com [M] (crop `cal-card-contact-shadow.png`)

- **RULE EF-13** Frame grouped content with a ring, not a darker shadow:
  - **Tray halo:** `0 0 0 6-8px rgb(ink / .04-.05)` (Granola, hue-tinted to the canvas).
  - **Inset stage ring:** `inset 0 0 0 1px rgb(10 10 10 / .055)` on a #fafafa stage (Affect UI card-in-card).
  - **Pill and icon rings:** a 1px ring at .1 (Affect UI tags, icon buttons `rgb(229 229 229) 0 0 0 1px`).

  **Why** Flo Hoeller's card-in-card showcase (founder bar) is built entirely from rings: Affect UI has 43 distinct shadows, almost all 0-blur rings. Granola's 6/8px halos tint with its warm ink `71 67 42`.
  **Applies to** product showcases, bento cells. **Check** stage/tray surfaces use a 0-blur ring (spread 1-8px) and no blurred layer. **Source** affectui.com, granola.ai [M]; flohoeller-craft.md

- **RULE EF-14** A calm, high-end light voice may run on ambient air alone:
  - **Edge:** a 1px border at ink .06-.12.
  - **Air:** one wide, faint layer, `0 4px 48px rgb(ink / .04-.06)`.
  - **No mixing:** do not combine it with ladders in the same view.

  **Why** Lightfield (founder-cited split-hero reference) uses exactly this on its product stage (`0 4px 48px .04`, `0 2px 8px .04`, 1px `lab(0 0 0 / .06-.12)`). Ambient shadows wider than 40px stay invisible as drops at <= .06.
  **Applies to** landing page (light). **Check** ambient-voice pages: blur >= 40px layers have alpha <= .06; one shadow recipe across stage cards. **Source** lightfield.app [M]

- **RULE EF-15** Shadow a coloured button with its own hue, and build its bevel from inset light:
  - **Inset top:** `inset 0 1px 0 rgb(255 255 255 / .16-.2)`.
  - **Inset bottom:** `inset 0 -1px 0 rgb(0 0 0 / .1-.12)`.
  - **Drop:** the fill colour at .12-.35 alpha, blur <= 6px (`--sh-accent`).
  - **Coloured blur:** never a black blur under a coloured fill, and never a coloured blur > 16px at rest.

  **Why** Measured hue shadows:
  - Framer `#09f` `0 1px 2px .15, 0 2px 4px .2`
  - Attio `#266df0` tile `0 2px 4px -2px rgba(15,107,233,.12), 0 3px 6px -2px .08`
  - Evervault violet `0 2px 15px .2` over black contact layers, the widest at rest

  Black under colour greys it (Comeau).
  **Applies to** all. **Check** accent-filled controls: blurred layers share the fill hue (±20°), blur <= 16px; inset top layer present. **Source** framer, attio, evervault [M]; Comeau [P]; dark-mode-premium (glow only on hover)

- **RULE EF-16** In dark mode, build every tier from four parts, raising alpha with the tier:
  - **Light edge:** inset white ring .07-.10.
  - **Top highlight:** `inset 0 1px 0` white .04-.08, or Raycast's .5px at .3 on glass.
  - **Outer black hairline:** `0 0 0 1px rgb(0 0 0 / .4-.6)`, or .5px at .8.
  - **Black drop:** .3-.6.

  **Why** On dark pages the median blurred alpha is .12, p75 .28 and median blur 20px. The specimen shows the outer black hairline is what separates a #16171a card from neighbours over lighter content (Linear `0 0 0 1px rgba(0,0,0,.2)` + inset white; Raycast `0 0 0 .5px rgba(0,0,0,.8)` + inset .5px .3; Linear changelog input). This extends dark-mode-premium's "ring + highlight + depth" with the outer black hairline the 3.14 tokens lacked.
  **Applies to** dark mode. **Check** dark tier tokens contain an inset white ring, an inset top highlight and an outer black ring; drops alpha >= .3. **Source** linear, raycast, clerk, supabase [M]; shadows.png [M]

- **RULE EF-17** Add a top catch-light (`inset 0 1px 0 rgb(255 255 255 / .6-.8)`) only to white or near-white surfaces sitting on a grey canvas, and never on white-on-white.
  **Why** Clerk cards `inset rgba(255,255,255,.8) 0 0 0 .5px, inset #fff 0 0 24px 6px`; Cal light buttons `inset 0 2px 0 #fff` (and `.15` on dark). On a white page the highlight is invisible and only adds layers.
  **Applies to** light mode. **Check** elements with a white inset highlight have a parent background L <= .97. **Source** clerk, cal [M]

- **RULE EF-18** Give non-rectangular shapes `filter: drop-shadow()`, and put shadowed artwork on a tinted, layered drop-shadow stack, keeping <= 3 drop-shadows per element.
  - **Non-rectangular shapes:** icons, squircle tiles, SVG illustrations, cut-out product photos.
  - **Artwork stacks:** Comeau's purple `drop-shadow(rgba(122,61,143,.15) .5px 1px 1px)` doubling to 3 layers; Attio `drop-shadow(rgba(28,40,64,.12) 0 8px 20px)` on circular avatars; Affect UI tinted `rgba(60,130,180,.1-.28)` stacks on glass icons.

  **Why** drop-shadow follows alpha, while box-shadow paints the box. Each drop-shadow is a filter pass (Comeau: GPU-friendly, but Safari struggles over text inputs).
  **Applies to** illustration, icons. **Check** drop-shadow count per element <= 3; none on elements containing inputs. **Source** comeau, attio, affectui [M]; Comeau [P]

- **RULE EF-19** The hero frame (tier 5) is the only shadow allowed past the 24px card cap:
  - **Count:** one per page.
  - **Light:** a constant-alpha doubling ladder (.04-.05, spread −y/2) or Stripe's brand-tinted pair (`rgb(50 50 93/.25) 0 30px 45px -30px, rgb(0 0 0/.1) 0 18px 36px -18px`).
  - **Dark:** a frame over art may take Cursor's `0 28px 70px .14, 0 14px 32px .10`.

  **Why** Every founder-loved hero (Kestrel, AlignUI, Clerk) has one heavily-built frame and quiet everything else; the founder's "massive shadow" complaint was about cards. Stripe's tinted pair and Cursor's frame are the measured long-blur cases that read premium.
  **Applies to** landing page hero. **Check** shadows with blur > 24px appear on <= 1 element per page (plus dialogs). **Source** stripe, cursor, clerk [M]; founder-taste

### 2.3 Textures, light and effects (EF-20 to EF-43)

**Grain, dither, noise**

- **RULE EF-20** Grain recipe:
  - **Tile:** an SVG `feTurbulence type='fractalNoise'` at baseFrequency .65-.9 with 2-3 octaves, `stitchTiles='stitch'`, desaturated, on a 128-200px tile, or a baked PNG/WebP noise.
  - **Dark:** `soft-light` at .04-.08.
  - **Light:** `multiply`/`overlay` at .04-.08.
  - **Grain images with their own alpha:** overlay up to .6 (Linear).
  - **Layers:** one grain layer per area.

  **Why** Measured grain:
  - Liveblocks .86/3 oct/180px `soft-light` .045
  - Mercury .65/3 oct/200px desaturated
  - Folk 1.2/2 oct/64px through a colour matrix to white .35
  - Linear grain image `overlay` .25/.6/.9
  - Framer sprite `overlay` .05
  - Arc `noise-light.png`
  - Neon `noise.svg` as a mask

  (CSS-Tricks' grainy gradient also uses .65/3.) Frequencies above ~1.2 read as static, and below .5 as blotches.
  **Applies to** heroes, gradients, dark surfaces, photos. **Check** grain layer: baseFrequency in [.6, 1.2], opacity in [.03, .08] (or <= .6 for a pre-faded image), blend soft-light/overlay/multiply, pointer-events none. **Source** liveblocks, mercury, folk, linear, framer, arc, neon [M]; CSS-Tricks [P]

- **RULE EF-21** Animate grain only by stepping a pre-rendered tile: Framer's 12-frame sprite `steps(12) .75s`, or `.fx-grain.is-film`'s 10-step translate. Never animate `feTurbulence` attributes, and turn it off under `prefers-reduced-motion`.
  **Why** Framer runs its film grain as a 48x576 sprite with `steps(12)` at overlay .05, a cheap compositor-friendly move. Re-rasterising turbulence every frame repaints the whole layer.
  **Applies to** cinematic heroes. **Check** no `<animate>` on feTurbulence; grain animation uses `steps()` and stops under reduced motion. **Source** framer.com [M]

- **RULE EF-22** Dither and grain are different tools. Dither (Larpo's pixel dither) is a visible pattern used as the signature field, governed by founder-taste. Grain is invisible tooth that removes banding and plastic smoothness. Never stack dither and grain on the same area, and never let grain alone be "the signature".
  **Why**
  - The founder asks for a crafted signature field in every hero (live dither, halftone, shader, real-data map).
  - Grain at .03-.08 cannot carry that.
  - Doubling the noise turns the dither's deliberate pixels to mud.
  - Kaching and Capto (shipped) use dither bands with clean surfaces around them.

  **Applies to** landing page. **Check** grain layers do not overlap dither canvases; DIRECTION.md names one signature field. **Source** founder-taste; knowledge/larpo-shipped [visual]

- **RULE EF-23** Use `feTurbulence` + `feDisplacementMap` only for one deliberate hand-made gesture (Granola's "hand-drawn" strokes: turbulence .02, 2 octaves, scale 4), never as a page-wide filter.
  **Why** Granola applies it to annotation strokes only; displacement on text or large areas costs a filter pass and wrecks legibility.
  **Applies to** illustration accents. **Check** displacement filters apply to SVG strokes/shapes < 400x400px, not text or sections. **Source** granola.ai [M]

**Gradients**

- **RULE EF-24** Interpolate every multi-colour gradient `in oklab` (or `in oklch` for a deliberate hue walk). Keep a product-site gradient within one hue family (≈60° span) unless the multi-hue gradient *is* the launch moment, which is Apple's product-page tactic (MacBook "AI" text 4 stops 108°, battery text green, used on one phrase).
  **Why**
  - `in oklab`/`in oklch` appears 106-2820 times in the CSS of Attio, Resend, Supabase, Clerk, Figma, Cursor, Mintlify and Lightfield.
  - sRGB mixes pass through a grey dead zone.
  - Apple keeps multi-hue gradients to a single marketing phrase per section.
  - The dark note's ban on hue-to-hue gradient headlines still holds for SaaS heroes.

  **Applies to** all. **Check** gradients with >= 2 chromatic stops declare `in oklab|oklch`; hue span > 60° only on <= 1 phrase per page with an override in DIRECTION.md. **Source** CSS greps (8 sites) [M]; apple macbook-pro [M]; Chrome docs [P]

- **RULE EF-25** Fade with eased stops, never two-stop linear, for scrims, glows, masks and vignettes:
  - **Larsen scrim:** `1, .738 19%, .541 34%, .382 47%, .278 56.5%, .194 65%, .126 73%, .075 80.2%, .042 86.1%, .021 91%, .008 95.2%, .002 98.2%, 0`.
  - **Linear's glow radials:** .03 → .0295 → .0245 → .018 → .011 → .005.
  - **Framer's spotlight mask:** `1, .96 18%, .72 34%, .28 48%, .08 58%, 0 66%`.

  **Why** A linear alpha ramp shows a visible edge where it ends ("hard stop" banding). Both Linear's and Framer's masks are hand-eased. Vercel's guideline warns that fading to dark with masks can band.
  **Applies to** all. **Check** scrim/glow/mask gradients have >= 4 stops or an easing source; dark fades > 300px add grain. **Source** linear, framer [M]; Larsen/CSS-Tricks [P]; Vercel guidelines [P]

- **RULE EF-26** Build mesh gradients and colour fields as an object inside a frame:
  - **Construction:** 3-6 radial gradients from one palette (white → brand → canvas), blurred 40px (Evervault: six radials, `#fff 0 → #6633ee 38% → #010314 78%`, `blur(40px)`, 18s pulse) or kept as large soft radials at .8 alpha (Stripe billing graphic).
  - **Placement:** contained in a tile, panel or product stage.
  - **Limit:** never a page-wide colour wash behind the headline.

  **Why** Every measured mesh lives inside a card or section panel (Evervault product tiles, Stripe graphics, Attio's CTA band `radial-gradient(90% 80% at 50% 100%, #e6ecff, #bccbff 45%, #86a0ee)` at .4 under 1px/8px stripes). The dark note's rule against CSS colour blobs lighting the hero still applies.
  **Applies to** landing page sections, bento. **Check** blurred multi-radial layers have a rounded, clipped parent; none span > 70% of the fold behind the h1. **Source** evervault, stripe, attio [M]; dark-mode-premium

**Gradient borders and beams**

- **RULE EF-27** Draw gradient borders with a masked pseudo-element or the padding-box/border-box double background, never `border-image` (it ignores radius):
  - **Masked pseudo-element:** `padding: 1px; mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)` (Raycast r36 pill, r30 card).
  - **Double background:** `background: linear-gradient(<surface>) padding-box, <gradient> border-box; border: 1px solid transparent` (Resend, Supabase's top-lit cards).
  - **Direction:** bright at the top, matching the shadow light: white .5 → .02 on dark, ink .14 → .05 on light.

  **Why** Raycast and Supabase both light the top edge. Unprefixed `mask-composite` is in Chrome 120, Safari 15.4 and Firefox 53. Newer `background-clip: border-area` is Chrome 150 / Safari 18.2 only.
  **Applies to** all. **Check** no `border-image` on elements with radius; gradient border alpha higher at the top than the bottom. **Source** raycast, resend, supabase [M]; css-tip, MDN BCD [P]

- **RULE EF-28** A border beam is one short bright arc (<= 25% of the turn) on a quiet ring:
  - **Speed:** 2-6s linear (Raycast announcement 3s via `@property --r2 <angle>`; Linear agent badge sweep 2s; Magic UI default 6s).
  - **Where:** on exactly one element per viewport, such as a badge, announcement pill or the primary CTA.
  - **Reduced motion:** stops.

  **Why** Every measured beam sits on a small single element; Resend's full rainbow border rotates at 30s, slow enough to be ambient. A beam on every card is the template tell.
  **Applies to** landing page. **Check** count of infinite angle/offset animations in the viewport <= 1; arc length <= 90°; `prefers-reduced-motion` disables it. **Source** raycast, linear, resend [M]; Magic UI border-beam [P]

**Glass**

- **RULE EF-29** Premium glass numbers:
  - **Fill alpha:** .6-.8. Apple `rgba(250,250,252,.8)` / `rgba(29,29,31,.8)`; pills `rgba(232,232,237,.72)`.
  - **Blur:** 7-36px with `saturate(1.4-1.8)`. Apple `saturate(1.8) blur(20px)`; Raycast window `blur(36px)` on black .6; Mercury `blur(20px)` on a .2 tint.
  - **Rim:** inset white .3-.5 on light, white .06 + a .5px top line at .3 on dark.
  - **Outer edge:** a hairline (`0 0 0 .5px rgba(0,0,0,.8)` on dark).
  - **Fallback:** a solid near-opaque background under `@supports not`.

  **Why** These cluster across the 19 glass sites that read premium. The amateur recipe (white/.1 + `blur(40px)` over a flat colour, no rim) is grey fog because there is nothing behind it to refract.
  **Applies to** nav, floating toolbars, product windows over imagery. **Check** each `backdrop-filter` element: fill alpha in [.15, .85] (tints) or [.6, .85] (panels), blur in [6, 36], saturate present or explicitly omitted, a 1px/0.5px rim; backdrop behind is non-flat (image/video/product). **Source** apple, raycast, mercury, linear, lightfield, github-copilot [M]; color-and-surfaces H

- **RULE EF-30** Fade blur in; never cut it with a box edge:
  - **Progressive blur:** 4-7 stacked layers at blur 1/2/4/8px under stepped `linear-gradient` masks (Clerk header: 7 layers 1-4px).
  - **Feathered blur:** one blur masked on both axes (Mercury 8px, 15%/10% feather).
  - **Depth of field:** radial-masked blur layers (Affect UI hero: 2px soft, 8px strong, 6px bottom).

  **Why** All three measured blur zones are masked; a hard-edged blurred rectangle reads as a bug.
  **Applies to** headers, hero collages, scroll edges. **Check** `backdrop-filter`/`filter: blur` layers wider than 300px carry a `mask-image`. **Source** clerk, mercury, affectui [M]; Comeau backdrop-filter [P]

- **RULE EF-31** Never put glass on glass. Keep one glass material per stack, and at most 3 glass surfaces per viewport. Treat Apple's Liquid Glass (refraction via SVG `feDisplacementMap` in `backdrop-filter: url()`) as Chromium-only progressive enhancement for the navigation layer, never for content cards.
  **Why**
  - WWDC25 session 219: Liquid Glass is "best reserved for the navigation layer; avoid glass on glass".
  - Two variants (Regular and Clear) that should never be mixed.
  - `backdrop-filter: url()` works only in Chrome (kube.io).
  - Displacement maps rebuild on resize.

  **Applies to** all. **Check** no `backdrop-filter` element inside another; <= 3 per viewport; `url(#…)` backdrop filters have an `@supports` fallback. **Source** Apple WWDC25 219 [P]; kube.io [P]; color-and-surfaces H

**Glow, spotlight, edge light, vignette**

- **RULE EF-32** A glow that works is light from an object:
  - **Colour:** white or the object's own hue.
  - **Strength:** <= .1 alpha at rest with eased stops (Linear 400px radials at white .03-.04, `lighten`). Larger blurs (Vercel `blur(120px)`, Attio blue `.5` at `blur(8px)`) sit at opacity 0 and appear on hover.
  - **Placement:** behind or under the thing it belongs to.
  - **On light pages:** glow = accent tint <= .14 (Resend radial .06-.13).

  **Why** Measured glows are either faint and static or strong and hover-only. Saturated glows behind type are the AI-template tell (dark-mode-premium), and Kaching's client said so about the red tee "glowing" on a green card.
  **Applies to** all. **Check** glow layers: alpha <= .1 at rest, or opacity 0 at rest with a hover state; glow hue = object or section hue. **Source** linear, vercel, attio, resend [M]; dark-mode-premium; founder-taste

- **RULE EF-33** Pointer spotlight:
  - **Light:** a 200-240px radial at white .06-.08 on dark, or accent 8% on light.
  - **Motion:** moved with CSS variables (`--mx/--my`) or a transform, never layout properties. Opacity 0 → 1 in .15-.2s ease-out.
  - **Border:** an optional ring revealed by the same radial through `mask-composite`.
  - **Gating:** only under `@media (hover: hover)`; one spotlight family per page.

  **Why**
  - Liveblocks measured: 200x200 radial `rgba(247,247,248,.08)` translated to the pointer, `opacity .15s cubic-bezier(0,0,.2,1)`.
  - Magic UI magic-card: gradientSize 200, opacity .8, 300ms.
  - Touch devices have no pointer, so the effect must not hide content.

  **Applies to** cards, buttons. **Check** spotlight layers update only custom properties/transform; hidden by default; wrapped in `(hover: hover)`. **Source** liveblocks [M] (`raw/liveblocks-spotlight-hover.png`); Magic UI [P]

- **RULE EF-34** Light a dark frame from one corner with a static edge spotlight. Duplicate the 1px border at white .2-.35 and mask it with `radial-gradient(200px 200px at 8% 0%, #000, rgb(0 0 0/.6) 30%, rgb(0 0 0/.2) 50%, transparent 70%)`, on the same side as the shadow light (top). One lit corner per frame.
  **Why** Linear lights both its hero frame and its comment cards this way (`at 8% 0%` and `100px at 0 0`). The specimen samples the lit edge at RGB 78 against 30 on the unlit edge: visible but quiet.
  **Applies to** dark product frames. **Check** edge-light masks originate at the top; one per frame. **Source** linear [M] (crops `linear-frame-edge-light.png`, `linear-comment-card-edge.png`)

- **RULE EF-35** Vignettes darken in the canvas colour, and light leaks add:
  - **Vignette:** `radial-gradient(65% 65%, transparent 52%, <canvas>/.35 68%, <canvas> 88%)` plus side fades to the exact canvas hex.
  - **Light leak:** one off-axis warm radial <= .12 with `plus-lighter` (Modal's floor light uses the same blend).
  - **Count:** never a vignette and a leak on the same corner.

  **Why** Liveblocks, Raycast and Unkey all vignette in canvas colour (dark-mode-premium). `plus-lighter` appears in the CSS of 10 of 32 sites (Linear, Clerk, Framer, Evervault, Raycast, Attio, Vercel, Cursor, Neon, Josh Comeau) for light that adds instead of painting.
  **Applies to** heroes. **Check** vignette stop colour == canvas; leak alpha <= .12 with an additive blend. **Source** liveblocks, raycast, modal (dark note), CSS greps [M]

**Motion effects**

- **RULE EF-36** Shimmer is a state, not a decoration. Use it only on live "thinking / working / streaming" labels:
  - **Base:** text at .4-.6 alpha.
  - **Peak:** .9-.95.
  - **Band:** 25-30% of the width.
  - **Background size:** 200-300%.
  - **Speed:** 1.6-2.5s linear infinite.
  - **End:** stop the moment the state resolves.

  A one-shot sheen (<= 1s) is allowed on hover for a single hero CTA.
  **Why** Cursor `.shimmer`: 200%, .6 → .92 at 55%, 1.6s and 2.5s; Attio: 250%, peak white .65; Affect UI: 300%, band 38-50-62%, on labels mid-action. None shimmer static headings.
  **Applies to** product UI in heroes, AI states. **Check** shimmer elements are status labels (aria-live or role=status nearby) and stop after the state; duration 1.5-3s. **Source** cursor, attio, affectui [M]; attio-product-ui ("shimmering Thinking")

- **RULE EF-37** 3D tilt is for one hero object:
  - **Angle:** 4-8° maximum (vanilla-tilt's default 15° is too much for UI).
  - **Perspective:** 1000px.
  - **Easing:** `cubic-bezier(.03,.98,.52,.99)`, 300ms.
  - **Glare:** a pointer-following `soft-light` glare <= .5.
  - **Properties:** transform-only.
  - **Gating:** off on touch and under reduced motion.

  **Why** vanilla-tilt defaults (max 15, perspective 1000, speed 300). Tilted product cards at 15° expose their flat edges and blur text on non-retina screens.
  **Applies to** landing page. **Check** rotateX/Y <= 8°; glare opacity <= .5; disabled for `(hover: none)` and reduced motion. **Source** vanilla-tilt source [P]; textures.png [M]

- **RULE EF-38** Budget motion effects per viewport:
  - **Looping:** <= 2 looping effects (one beam or shimmer, one marquee or ambient field).
  - **Pointer:** <= 1 pointer effect family.
  - **Never animate:** `backdrop-filter`, `filter: blur()` radius or a layered `box-shadow`. Animate the opacity of a pre-blurred or pre-shadowed layer instead (Vercel's `blur(120px)` layer at opacity 0; Attio's `blur(8px)` glow at opacity 0; Ahlin's `::after` shadow).

  **Why** Measured looping animations per site are logo marquees (40-180s), one beam, and status shimmers; no site animates blur radius. Blur and shadow repaints are the paint cost (web.dev; Ahlin).
  **Applies to** all. **Check** `transition-property` / keyframes never touch `backdrop-filter`, `filter` blur values or multi-layer `box-shadow`; infinite animations in the fold <= 2. **Source** 32-site animation inventory [M]; web.dev, Ahlin [P]

**Fields and surfaces**

- **RULE EF-39** Dot and grid fields:
  - **Dots:** 1px at ink .12-.2 on a 12-16px pitch (Affect UI `#e5e5e5 1px` at 12px; ibelick 16px), or tiny dense dots at 5px/.4 inside data marks only (Folk chart).
  - **Grid lines:** ink .06 at 48-80px (Granola 1px `#dedede` every 80px).
  - **Fade:** always faded by an ellipse/radial or edge mask.
  - **Clearing:** cleared behind the headline.
  - **Placement:** confined to the rails.

  **Why** The founder wants texture "inside the rails, behind the product, faded behind the headline" (Kestrel round 1). Stripe uses 2px squares on a 10px tile at opacity .46 under a vertical fade; unmasked full-bleed grids are the generic tell (anti-ai-slop D-SURF-5).
  **Applies to** heroes with rails, sections. **Check** dot/grid layers have a mask-image; their box = rail area; dot alpha <= .2, line alpha <= .08. **Source** affectui, granola, stripe, folk [M]; founder-taste; ibelick [P]

- **RULE EF-40** A noise-textured dark surface is four layers:
  - **Fill:** a surface +.04-.06 L over canvas.
  - **Light:** a top radial white .04-.05.
  - **Grain:** `soft-light` .06-.08.
  - **Edge:** the tier-1 dark edge (inset ring .07 + top light .04-.06).

  Never a flat #1a1a1a box with a grey border.
  **Why** It combines the measured dark ladders (Supabase top-lit cards, Linear inset rings, Liveblocks grain) into the founder's "premium dark" surface; flat dark slabs were rejected (Tracewell v1, Vigil).
  **Applies to** dark mode cards, bento cells. **Check** dark cards: ΔL to canvas >= .04, an inset highlight, and either grain or a top radial. **Source** supabase, linear, liveblocks [M]; founder-taste; `fx-dark-surface` in textures.png

**Images**

- **RULE EF-41** Treat product art and photos to sit in the section's palette:
  - **Duotone:** grayscale + contrast 1.1-1.2 on the image, `multiply` the light tone and `screen` the dark tone inside `isolation: isolate`.
  - **Grain over photos:** .06-.1.
  - **Photos on dark:** `brightness(.9)` (Cursor's hero image).
  - **Ramp hue:** within ~25° of the section accent.

  **Why** The founder and client rejected product art that glowed in the wrong hue (Kaching round 2). Cursor dims its painting to 0.9 so the frame stays the brightest crisp thing; duotone makes heterogeneous images one family.
  **Applies to** product visuals, testimonials, case art. **Check** image filters/blends on art inside tinted sections; ramp hue distance <= 25°. **Source** cursor [M]; founder-taste; Webdesignerwall/Brad Woods duotone [P]

**Governance**

- **RULE EF-42** Name the effects. DIRECTION.md lists the site's <= 3 signature effects (e.g. "dither field, glass nav, one beam on the launch pill") and the shadow tiers in use. Any further effect must replace one, not join it. Stacking 4+ effects on one element is the amateur version, e.g. glass + gradient border + glow + beam + grain on one card.
  **Why** The founder's standing complaint is sameness and over-assembly ("3 completely different styles of colours, effects, roundness"). Every reference site measured uses a few effects with total consistency (Linear: edge light + grain + faint glows; Raycast: glass + keycaps + one beam; Apple: glass + pills).
  **Applies to** all. **Check** per element: count of {backdrop-filter, gradient border, blur glow, animated border, grain} <= 2; site-wide signature effects listed in DIRECTION.md <= 3. **Source** founder-taste (Kaching round 2); 32-site inventory [M]

- **RULE EF-43** Every effect must be removable without breaking legibility:
  - **Contrast:** check text contrast at the worst pixel with the effect on.
  - **Fallbacks:** confirm the page reads with `backdrop-filter`, `corner-shape`, masks and animation all disabled (`@supports` fallbacks, `prefers-reduced-motion`, `forced-colors` outlines on shadow-only edges).

  **Why** Glass contrast must be computed against the worst backdrop (color-and-surfaces C). Safari/Firefox lack `corner-shape` and SVG backdrop filters, and shadow-only edges vanish in forced-colors mode (`shadows.css` adds an outline).
  **Applies to** all. **Check** Playwright pass with `reducedMotion: 'reduce'` and `forcedColors: 'active'`, and a WebKit screenshot; no FAIL in check.mjs contrast. **Source** color-and-surfaces C/H [P]; MDN BCD [P]

---

## 3. Numbers & scales

### 3.1 Smooth-corner fit (system/effects/demo/fit.json; R 96, Chromium 156, DPR 1)

Coverage difference (xor, css px²) over one corner window; a uniform 1px offset along this corner is about 250 px².

| Shape | Run-in starts (bend > .25px) | Apex depth on 45° | vs Apple |
|---|---|---|---|
| `border-radius: R` | 0.95R | 0.42R | 97 px² |
| Figma smoothing 0.6 at R | 1.17R | 0.42R | **27 px²** (best of 0.5-0.8) |
| Figma smoothing 1.0 at R | 1.44R | 0.42R | |
| Apple `UIBezierPath` continuous at R | 1.12R | 0.42R | 0 |
| `corner-shape: superellipse(1.32)` at 1.2R | 1.08R | 0.42R | 27 px² (fitted) |
| `corner-shape: superellipse(1.5)` at R (Framer) | 0.83R | 0.32R | |
| `corner-shape: squircle` (= superellipse(2)) at R | 0.69R | **0.23R** | |

Native equivalents of Figma smoothing (`NATIVE_FIT` in squircle.ts):

| Smoothing | `corner-shape` | border-radius | xor |
|---|---|---|---|
| 0 - 0.4 | round (superellipse(1)) | 1.00R | 0-27 |
| 0.6 | superellipse(1.32) | 1.20R | 48 |
| 0.8 | superellipse(1.76) | 1.56R | 32 |
| 1.0 | superellipse(2.2) | 2.14R | 24 |

Plain-radius stand-ins: Figma 0-0.8 → 1.00R, 1.0 → 1.04R; `superellipse(1.5)` → 0.76R (Framer ships 0.752); `squircle` → 0.60R.

Figma corner construction (figma-squircle, worked R 16, s 0.6): p = (1+s)R = 25.6; arc = 90(1−s) = 36°; arcSectionLength = sin(18°)·R·√2 = 6.992; c = 3.423; d = 1.744; b = 4.480; a = 2b = 8.961 (reproduced exactly by `getCornerParams`). Curvature: 0 where the edge ends (G2 with the straight side), tangent continuous at the arc (G1), but **not** curvature-continuous at the arc join: the cubic ends at ≈1.47/R against the arc's 1/R (squircle.test.ts). Apple's corner: starts 1.52866R from the vertex, 3 cubics + 2 short lines, clamp `MIN(w,h)/2/1.52866` (PaintCode).

`corner-shape` facts: values `round | scoop | bevel | notch | square | squircle | superellipse(K)`; curve x^(2^K) + y^(2^K) = 1, K = log2(exponent); `square` ∞, `squircle` 2, `round` 1, `bevel` 0, `scoop` −1, `notch` −∞; needs a non-zero border-radius; border, outline, box-shadow, overflow clip and backdrop-filter follow it (shadows are an axis-aligned scaled path per the spec); animatable via superellipse interpolation; Blink draws each half-corner as one fitted cubic (Rosenthal, Chrome blog 2026). Support: Chrome/Edge 139+ (Aug 2025); Safari, Firefox preview only.

Where it ships today [M]: Clerk 32x32 tiles r12 `squircle` (15 elements) + avatar wrappers; Framer `superellipse(1.5)` on cards r10/18/19/20/25/30 with `--corner-shape-fallback: .752`; Resend `supports-[corner-shape:squircle]:rounded-2xl/3xl`; Cal and Evervault (Framer-built) ship the Framer variables; Josh Comeau's site declares `corner-shape: squircle`.

### 3.2 Shadow catalogue (new measurements; Geist, Clerk, AlignUI and the older Stripe/Attio stacks are in type-hierarchy 3.13)

Light pages:

| Site, element | Stack |
|---|---|
| Apple Store card r18 | `rgba(0,0,0,.08) 2px 4px 12px` (only shadow on the page, x offset) |
| Apple home media tile r8 | `rgba(0,0,0,.22) 3px 5px 30px` |
| Apple MacBook glass pill | `inset 0 0 .5px rgba(0,0,0,.11)` |
| Cal card r12/16 | `rgba(36,36,36,.7) 0 1px 5px -4px, rgba(36,36,36,.05) 0 4px 8px` (+ ring `rgba(34,42,53,.08)`) |
| Cal light button | `inset 0 2px 0 #fff` (dark: `inset 0 2px 0 rgba(255,255,255,.15)`) |
| Granola tray r28 | `rgba(71,67,42,.05) 0 0 0 8px` / `6px`; panel `rgba(54,54,53,.25) 0 4px 50px` |
| Granola card | `0 20px 25px -5px .1, 0 8px 10px -6px .1` (Tailwind xl) + 1px `rgba(71,67,42,.2)` |
| Lightfield stage r12 | `rgba(0,0,0,.04) 0 4px 48px` + 1px `lab(0 0 0/.06)`; cards `0 2px 8px .04`, `0 1px 2px .04, 0 1px 3px .02` |
| Mintlify card r12 | ring `.06`, `0 169px 47px 0, .01 0 108px 43px, .02 0 61px 37px, .03 0 27px 27px, .04 0 7px 15px` (generator-style long stack) |
| Mercury card | `rgba(28,28,35,.02) 0 10px 16px, .04 0 6px 10px, .09 0 0 3px` |
| Affect UI | stage `inset 0 0 0 1px rgba(10,10,10,.055)`; icon btn `rgb(229,229,229) 0 0 0 1px`; tag `rgba(10,10,10,.1) 0 0 0 1px`; glass tile `inset .24px rgba(0,0,0,.14), 0 2.9px 3.4px -2.4px .055`; pro badge `inset 0 0 0 1px <pink>/.16, 0 1px 0 <pink>/.14` |
| Family monitor panel r12 | `rgba(0,0,0,.04) 0 1px 6px, rgba(0,0,0,.05) 0 0 24px` |
| Folk panel | `rgba(24,26,27,.08) 0 3px 6px, .06 0 9px 40px`; tooltip `rgba(100,100,111,.2) 0 7px 14.5px` |
| Stripe nav dropdown | `rgba(0,0,0,.1) 0 30px 60px -50px, rgba(50,50,93,.25) 0 30px 60px -10px` |
| Stripe glass window | `rgba(23,23,23,.08) 0 15px 35px` on `rgba(248,250,253,.45)` + `blur(12px)` |
| Framer blue button | `rgba(0,153,255,.15) 0 1px 2px, rgba(0,153,255,.2) 0 2px 4px` |
| Attio blue tile | `rgba(15,107,233,.12) 0 2px 4px -2px, rgba(15,107,233,.08) 0 3px 6px -2px` |
| Attio product card r13 | `oklch(0 0 0/.01) 0 1px 3px, .02 0 2px 4px -1px, .03 0 4px 8px -2px, .04 0 8px 16px -4px, .05 0 16px 32px -8px` |
| Comeau button | `.02 0 -5.9px 2.7px, .024 0 -1.2px 6.9px, .03 0 8px 14.2px, .04 0 21.9px 29.2px, .07 0 49px 80px` (shadow-palette output) |
| Ahlin smooth / sharp | `0 1/2/4/8/16px` at .12 each / at .25 .2 .15 .1 .05 |

Dark pages:

| Site, element | Stack |
|---|---|
| Raycast keycap | `0 1.5px .5px 2.5px rgba(0,0,0,.4), 0 0 .5px 1px #000, inset 0 2px 1px 1px rgba(0,0,0,.25), inset 0 1px 1px 1px rgba(255,255,255,.2)` |
| Raycast action chip r8 | `inset 0 1px 0 rgba(255,255,255,.05), 0 0 0 1px rgba(255,255,255,.25), inset 0 -1px 0 rgba(0,0,0,.2)` |
| Raycast app icon r12 | `rgba(0,0,0,.28) 0 1.19px 2.38px` |
| Raycast frame outer r19 | `0 0 40px 20px rgba(255,255,255,.03), inset 0 .5px 0 rgba(255,255,255,.3)`, `blur(2px)` over a tinted radial |
| Linear panel r12 | `rgba(0,0,0,.25) 0 2px 32px` + 1px white .12; Slack box `rgba(8,9,10,.6) 0 4px 32px` |
| Linear tag | `inset rgba(0,0,0,.2) 0 0 12px` + 1px white .12 |
| Linear invert button (pill) | `0 8px 2px 0, .01 0 5px 2px, .04 0 3px 2px, .07 0 1px 1px, .08 0 0 1px` |
| Clerk dark button r6 | `rgba(0,0,0,.24) 0 1px 1px, .2 0 2px 3px, inset rgba(255,255,255,.07) 0 1px 1px, rgb(47,48,55) 0 0 0 1px` |
| Cursor frame r10 | `.14 0 28px 70px, .10 0 14px 32px, oklab(.944/.1) 0 0 0 1px`; inner `.25 0 25px 50px -12px, .15 0 12px 24px -8px, .5px ring .1`; card `ring .1 + .28 0 18px 36px -18px` |
| Evervault card r16 | `rgba(0,0,0,.05) 0 0 0 2px, rgba(255,255,255,.1) 0 0 0 1px, inset rgba(255,255,255,.5) 0 .5px 0` |
| Evervault violet tile | `.34 0 .36px 1.5px -1.5px, .29 0 1.37px 5.8px -3px, .04 0 6px 25px -4.5px, rgba(141,99,255,.2) 0 2px 15px` |
| Neon dropdown | `rgba(0,0,0,.4) 0 8px 20px` + 1px `#303236` |
| Supabase primary | `rgba(0,0,0,.2) 0 1px 3px, inset white .04 0 1px 0, inset white .06/.1 0 0 0 1px` |

Distribution (all 32 pages, blurred non-inset layers): light n = 277, alpha p25 .05 / p50 .08 / p75 .15 / p90 .25, blur p50 5px / p90 36px; dark n = 91, alpha p25 .09 / p50 .12 / p75 .28 / p90 .40, blur p50 20px / p90 50px. Median stack length 2 layers, maximum 9. x-offset present on 5 of 32 sites.

### 3.3 The recommended scale (system/effects/shadows.css)

| Tier | Light | Dark |
|---|---|---|
| 1 resting | `0 0 0 1px ink/.07, 0 1px 2px ink/.05` | `inset 0 0 0 1px w/.07, inset 0 1px 0 w/.04, 0 1px 2px k/.3` |
| 2 raised | + `0 4px 8px -2px ink/.06` | `inset ring w/.08, inset top w/.05, 0 0 0 1px k/.4, 0 4px 8px -2px k/.35` |
| 3 floating | `ring .08, 0 2px 4px -1px .05, 0 8px 16px -4px .08, 0 16px 24px -8px .08` | `inset ring .09, top .06, ring k/.5, 0 8px 24px -8px k/.5` |
| 4 overlay | `ring .08, 0 2px 4px .04, 0 12px 24px -6px .10, 0 32px 48px -12px .12` | `inset ring .10, top .07, ring k/.6, 0 2px 4px k/.3, 0 24px 48px -12px k/.6` |
| 5 hero frame | `ring .06` + `1/3/6/12/24px` ladder at .05, spread −y/2, `0 48px 48px -24px .04` | `inset ring .08, top .08, ring k/.6, 0 2px 32px k/.25, 0 24px 64px -16px k/.5` |

ink = `--sh-ink` (default `17 20 28`), w = white, k = black. Specials: `--sh-contact`, `--sh-tray`, `--sh-ambient`, `--sh-hl`, `--sh-accent`, `--sh-ink-btn`, `.sh-lift` (hover via `::after` opacity), `.sh-drop-2`. Rendered: `system/effects/demo/shadows.png`.

### 3.4 Texture and effect catalogue

| Effect | Used well | Measured values | Recipe | Perf | Amateur version |
|---|---|---|---|---|---|
| Grain (static) | Liveblocks hero, Linear panels, Arc sections, Neon spans | fractalNoise .86/3 oct/180px soft-light .045; Linear overlay .25-.9 image; Neon noise.svg mask 330x112 | `.fx-grain`, `--fx-noise` | one tiled layer; cheap | visible static at .2+, on flat canvas, on every section |
| Film grain | Framer hero video | 12-frame webp sprite 48x576, `steps(12) .75s`, overlay .05 | `.fx-grain.is-film` | compositor transform | animating feTurbulence |
| Hand-drawn wobble | Granola strokes | turbulence .02, 2 oct, displacement scale 4 | inline SVG filter | filter pass, small areas only | displacement on text |
| Gradient (oklab) | Attio, Resend, Supabase | `in oklab` 106-2820 uses per site | `.fx-gradient-soft` | free | sRGB purple→pink across the fold |
| Eased fade | Linear glows, Framer masks | 6-7 eased stops (see EF-25) | `.fx-scrim-bottom` | free | 2-stop linear with a visible end |
| Mesh field | Evervault tiles, Stripe graphics | 6 radials, `blur(40px)`, 18s pulse; radials at .8-.85 | radials in a clipped panel | blur is a big paint: keep static or animate opacity | full-page blob wash behind the h1 |
| Gradient border | Raycast pills/cards, Resend, Supabase | 1px, mask-composite exclude; top-lit `oklch(.95/.075) → surface` | `.fx-gradient-border`, `.fx-toplit` | free | `border-image` (square corners), rainbow on every card |
| Border beam | Raycast announcement, Linear badge | conic arc, 3s / 2s linear, `@property` angle | `.fx-beam` | one paint per frame on a small box | beams on every card, 1s spin |
| Glass (light) | Apple nav/pills, Stripe window, Lightfield nav | .72-.8 fill, `saturate(1.8) blur(20px)`, pills `blur(7px)` | `.fx-glass` | re-blurs on scroll: <= 3 per view | white/.1 + blur(40px) on flat colour |
| Glass (dark) | Raycast window, Linear header, GitHub buttons | black .6 + blur 36; header gradient .8→.76 + blur 20; white .12 + blur 20 + 1px white .06 | `.fx-glass.is-dark` | same | grey fog, no rim |
| Progressive blur | Clerk header, Mercury, Affect UI DOF | 7 layers 1-4px stepped masks; 8px double-axis feather; 2/8/6px radial masks | `.fx-progressive-blur` | 4-7 small blurs | one hard-edged blurred box |
| Pointer spotlight | Liveblocks buttons, Magic UI cards | 200px radial white .08, opacity .15s | `.fx-spotlight` + 4 lines JS | custom-property update only | always-on glow, follows on touch |
| Edge spotlight | Linear frame + cards | masked duplicate border `200px at 8% 0%` | `.fx-edge-spot` | free | glowing border all round |
| Glow behind object | Linear (400px .03-.04 lighten), Vercel (blur 120 at op 0) | white ≤ .1 eased | `.fx-glow-behind` | static | purple blob behind type |
| Shimmer | Cursor, Attio, Affect UI status labels | 200-300%, .6 → .92-.95, 1.6-2.5s | `.fx-shimmer-text` | background-position on a small box | shimmering headings |
| Sheen sweep | (hover CTA) | 105° band white .35, .9s once | `.fx-sheen` | transform | looping sheen on every button |
| Dot grid | Affect UI, Stripe, Folk | 1px @12px #e5e5e5; 2px squares @10px op .46; 0.75px @5px .4 | `.fx-dots` | free | full-bleed, unmasked, dark dots .4 |
| Line grid | Granola, Vercel | 1px #dedede @80px side-masked | `.fx-grid` | free | 24px grid at .15 everywhere |
| Vignette / leak | Liveblocks, Modal | canvas-colour radial 52/68/88%; plus-lighter floor | `.fx-vignette`, `.fx-light-leak` | free | black vignette on a tinted canvas |
| Dark surface | Supabase, Linear, Liveblocks | +.05 L, top radial .05, grain .06-.08, inset ring | `.fx-dark-surface` | free | flat #1a1a1a + grey border |
| 3D tilt | (vanilla-tilt) | max 15 default; use 4-8°, perspective 1000 | `.fx-tilt` + JS | transform | 15-25° tilt, no glare |
| Duotone | product art in tinted sections | grayscale + contrast 1.15, multiply/screen | `.fx-duotone` | blend on one image | hue-clashing art |
| Corner smoothing | Clerk tiles, Framer cards | see 3.1 | `squircle.ts` | native free; svg path per resize | `corner-shape: squircle` as "iOS" |

Animation inventory [M]: logo marquees 40-180s linear (Neon 60s, Mintlify 40s, Resend 180s, GitHub 60s, Arc 78s); beams 2-3s (Linear, Raycast) and 30s ambient (Resend); shimmer 1.6-2.5s (Cursor); live gradient 18s (Evervault); orbit 180s (Folk); film grain .75s steps (Framer); entrance easings `cubic-bezier(.22,1,.36,1)` (Affect UI, 0.36-0.7s), `(.25,.46,.45,.94)` (Linear), `(.16,1,.3,1)` (Folk h1 1.2s).

---

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| `border-radius: 28.8px; corner-shape: superellipse(1.32)` for an iOS-feel 24px card, inside `@supports` | `corner-shape: squircle` at 24px | squircle at R reads like 0.6R (apex 0.23R) |
| Same-radius `border-radius` fallback for a Figma-smoothed design | Bumping the fallback radius "because squircles look rounder" | Figma smoothing keeps the apex; scale 1.00 is the best plain match |
| Pills at 999px, plain | Squircled pills | no room: (1+s)R > h/2 collapses the smoothing |
| Ring .07 + `0 1px 2px .05` resting cards | `0 10px 30px rgba(0,0,0,.2)` on every card | median light alpha .08 at 5px blur; founder cap |
| Cal contact line for crispness | Darker ring for crispness | a darker ring reads as a drawn border |
| Hue shadow under a blue button | Black blur under a blue button | black greys the colour |
| Inset white ring + black hairline on dark | Removing shadows in dark mode | dark edges are light edges |
| Glass over a photo, product or scrolling content | Glass over a flat colour | nothing to refract: grey fog |
| Progressive or masked blur | A blurred rectangle with a hard edge | reads as a rendering bug |
| One beam on the launch pill | Beams around every bento card | the template tell |
| Shimmer on "Thinking..." | Shimmer on the h1 | shimmer means "working" |
| Grain at .045 soft-light over the light pool | Grain at .2 over a flat canvas | visible static, dirty |
| Dot field masked inside the rails, cleared behind type | Full-bleed unmasked dot grid | founder rule; generic tell |
| 6° tilt with glare on the one hero object | 15° tilt on a card grid | blurs text, shows flat edges |

## 5. Exceptions & judgement calls

- **Squircles in a flat Apple-like voice.** Apple.com itself does not use them, so a site imitating Apple's web register can stay circular. Squircles are the right call when the product's native UI (an iOS app) uses continuous corners and the marketing site shows that UI: match the app [engine note].
- **SVG vs native.** Both are correct; choose by audience. Chromium-heavy B2B audiences see native; Safari-heavy consumer audiences see the fallback radius. The SVG path is the only way to get the exact shape everywhere, at the cost of a ResizeObserver and clipped shadows [engine note].
- **Figma's construction is G2 at the edge but not at the arc join** (curvature ≈1.47/R against 1/R). It is still the industry reference (and matches Apple within 27 px²), so do not "fix" it by hand. A true superellipse or Apple's 3-cubic path is available if a brand needs mathematical purity [F].
- **x-offset shadows.** Apple Store's `2px 4px 12px` and Untitled UI's `18px 26px` are deliberate "lamp to the left" voices. Use them only if every shadow on the site shares the ratio (Comeau's one-light rule) [M][P].
- **Stripe's .25 layer and Cal's .7 contact line** break EF-11's alpha band, but each is safe because its negative spread hides it. Record the override when copying them.
- **Mintlify's 169px-offset stack and Comeau's 80px-blur button** come from generator tools. They look fine at the site's scale, but at Larpo's compact density they exceed the founder cap: use tier 5 only for frames [engine note].
- **Grain in light mode** is rarer than in dark (Folk, Mercury, Arc, Granola are the light users). On white AlignUI-style pages the founder's "clean and smooth" taste wins: no grain unless there is a gradient or photo to dither [engine note; founder-taste].
- **Multi-hue gradient text** is fine for Apple-style product launches and wrong for SaaS heroes (dark-mode-premium). Record the override if a launch section uses one.

## 6. Figures worth keeping

- `system/effects/demo/squircle-compare.png`: 3 sizes x 4 corner treatments; the 4x overlay shows circular vs Figma 60% vs Apple share one apex, and that `corner-shape: squircle` is much squarer.
- `system/effects/demo/shadows.png`: the 5-tier scale on grey, white and dark, plus specials (contact line, tray, ambient, accent and ink buttons).
- `system/effects/demo/textures.png`: 16 recipes from textures.css rendered (grain light/dark, banding fix, gradient border, beam, glass light/dark over imagery, progressive blur, spotlight, dots, grid, shimmer, dark surface, edge spot, tilt, duotone).
- `knowledge/benchmarks/effects/*.png`: 22 live crops (see CREDITS.md). Most instructive: `raycast-window-glass.png`, `raycast-keycaps.png`, `linear-frame-edge-light.png`, `cal-card-contact-shadow.png`, `granola-tray-ring.png`, `affectui-dof-blur.png`, `clerk-squircle-tiles.png`, `stripe-floating-card.png`.

## 7. Open questions

1. Safari and Firefox `corner-shape` rendering is untested (preview builds only). Re-run `demo/fit.mjs` in WebKit when it ships; Blink's one-cubic-per-half-corner approximation may differ from WebKit's.
2. The native fit metric is coverage difference over the corner window. Two shapes with equal xor can differ in where the error sits (run-in vs apex). Profiles (bend start, apex depth) were recorded for the key shapes only.
3. The squircle box-shadow approximation (sibling with `border-radius: R`) was judged by eye in squircle-compare.png, not diffed against `drop-shadow` per pixel.
4. Liquid Glass recipes (kube.io refraction) were read, not built or measured. They are Chromium-only, and no measured site ships them.
5. The pointer spotlight was measured on Liveblocks buttons only. Card-level spotlights (Magic UI, Linear's older features page) were not observed live on the 32 pages.
6. Grain values were read from CSS. The perceived strength of image-based grain (Linear, Arc) depends on the image's own alpha, which was not sampled (cross-origin canvas).
7. The `rauno.me`, `family.co` and `figma.com` folds yielded little effect data (rauno uses no shadows; figma uses an oklch .16 ring only). They are kept in raw/ for completeness.
8. The dark tier alphas (.3-.6) are anchored on Linear, Raycast and Clerk and look right in shadows.png on #0b0c0e. They were not checked against tinted dark recipes (plum, ember) from dark-recipes.json, where black drops may need hue tint.
