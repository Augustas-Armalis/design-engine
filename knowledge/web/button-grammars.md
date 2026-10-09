---
source: web:live measurement (Playwright/Chromium, 1440x900 @2x, light scheme, real hover / mouse-down / keyboard focus, stylesheet :hover/:active rules) of vercel.com, cursor.com, family.co, linear.app, mercury.com, convex.dev, evervault.com, raycast.com, posthog.com, reflect.app, ui.aceternity.com, magicui.design, attio.com, sonner.emilkowal.ski, vaul.emilkowal.ski, cal.com, lightfield.app, warp.dev, stripe.com, trigger.dev, ramp.com, arc.net, dub.co, v0.app, lusion.co, liveblocks.io, resend.com, supabase.com, framer.com, tella.tv, pitch.com, clerk.com
chapter: Button grammars: 16 distinct CTA constructions (shape + material + depth + motion), measured
pages: n/a (web research; crops in knowledge/benchmarks/variety/buttons/<site>.png and <site>-hover.png)
topic_tags: [buttons, cta, variety, hover, press, glass, keycap, glow, gradient-border, mono, chips, motion, dark-mode, divergence]
status: studied
companion: knowledge/web/type-hierarchy-buttons-shadows.md (anatomy, states, shadow craft), knowledge/founder/founder-taste.md (button rules), system/variety/buttons.css, system/variety/buttons.html
---

# Button grammars

The engine kept shipping one button: an ink 44px r14 fill with a white top highlight and a text-only secondary. That is the Kaching spec, founder-approved, and it stays the floor. This note adds sixteen other constructions measured on shipped sites, so each new brand can choose a button the way it chooses a type voice. A grammar is the combination of **shape** (height, radius, width, case), **material** (flat, glass, metal, tint, gradient, texture), **depth** (none, ring, ladder, bevel, slab, glow) and **motion** (what moves on hover and press). Two grammars count as different only if they differ in at least one of shape, material or depth, not just colour.

`type-hierarchy-buttons-shadows.md` already covers anatomy (height ladder, padding ratio, label size), state rules and the Untitled UI / AlignUI / Resend recipes (B1-B4, Resend's textured dark glass). Those are not repeated. Every grammar here is implemented in `system/variety/buttons.css` as `.btn-g-<slug>` and `.btn-g-<slug>-2nd`, driven only by `--accent --accent-ink --ink --canvas --surface --line --sub`, and shown light and dark in `system/variety/buttons.html` (screenshot: `knowledge/benchmarks/variety/buttons-specimen.png`).

Evidence tags: **[M]** measured by computed style on the live page (Oct 2026), **[R]** read from a shipped stylesheet rule, **[S]** read from the crop only, **[E]** engine adaptation. Marketing pages change weekly; re-measure before quoting.

House constraints that apply to every grammar (founder-taste): no lift on a primary's hover; press scale 0.97-0.98; hero CTAs 44px unless DIRECTION.md logs an override; secondary hero buttons carry no leading decorative icon; one primary per hero row; the button's roundness matches the product's.

## The 16 grammars at a glance

| # | Slug | Grammar | Shape | Material | Depth | Signature motion | Measured on |
|---|---|---|---|---|---|---|---|
| 01 | `flat` | Flat pill + ring twin | 44 pill | flat ink | none / 1px ring | fill step 14% | Vercel, Cursor, Family, Linear (dark) |
| 02 | `glass` | Frosted glass pill | 44 pill | accent solid + smoke/tint glass | rim + top light | glass alpha +8 | Mercury, Convex, Evervault |
| 03 | `key` | Metal keycap | 44 r10 | light metal | 2px dark rim + halo + bevel | fill to white, press 1px down | Raycast |
| 04 | `push` | Offset push | 44 face + 4 slab, r10 | saturated accent | physical slab | face sinks 3px in 34ms | PostHog |
| 05 | `glow` | Inner-glow tint | 44 r10 | accent tint | inset glow + rim | glow layer cross-fade | Reflect, Aceternity |
| 06 | `edge` | Spectrum edge + under-glow | 44 r10 | ink + gradient border | blurred spectrum strip | glow .55 -> .95 | Magic UI |
| 07 | `lamp` | Lamp-lit ink + embossed rise | 44 r12 | ink with lighter rim / embossed neutral | rim + 5-layer emboss ladder | light pools from top; fill rises from bottom | Attio, Sonner |
| 08 | `stack` | Full-width auth stack | column width, 44 r12 | vertical skeuo gradient | 1.5-2px top highlight | chevron nudge | Cal.com |
| 09 | `compact` | Compact editorial rectangle | 32-36 r6-7 | flat ink / ink 4% tint | none | 50ms fill step | Lightfield |
| 10 | `mono` | Mono caps square | 36 r4, mono caps | flat ink / outline | 1px ring | fill swaps to accent | Warp |
| 11 | `arrow` | Accent block + arrow morph | 44 r6 | saturated accent | none | chevron grows a shaft | Stripe, Trigger.dev, Ramp |
| 12 | `tile` | Icon-tile statement | 64 r20, inset tile | translucent ink | soft drop | arrow +3px | Arc, Kaching |
| 13 | `chip` | Chip row | 32-36, pill or r9 | surface + colour tile | ring + 1px drop | tile scale 1.1, label sub -> ink | Dub, v0 |
| 14 | `link` | Arrow link-led | no box | text | none | arrow +3px, hairline draws in | Linear, Vaul, Cursor |
| 15 | `slide` | Slide-swap pill | 44 pill, caps | flat ink | none | fill -> accent, label slides, arrow enters | Lusion |
| 16 | `spot` | Pointer spotlight | 44 r8 | flat ink | none | 100px light follows the pointer | Liveblocks |

---

## 01 Flat pill + ring twin (`btn-g-flat`)

**Measured** [M]
- Vercel hero: 40px, pill (33554432px), pad 12, Geist 16/500/0, `#171717` -> hover `#383838`, no shadow; twin `#fff` + `0 0 0 1px #ebebeb` -> hover `#f2f2f2`; `transition: all 150ms cubic-bezier(.4,0,.2,1)`; no press transform.
- Cursor: 43.3px pill, pad 12.5/21.6, CursorGothic 16/400, warm ink `#26251e` -> `#3b3a33`, 1px border same colour; twin is a tinted fill `#e6e5e0` (not a ring) -> `#e1e0db`; focus `2px solid fg` offset `0.3ch`.
- Family: 48px pill (r32), Inter 17/500/-0.22px, `#171717` -> `#121212`, leading 16x20 glyph 12px gap; twin `#f6f4ef` warm tint -> `#eae6dd`; 100ms.
- Linear (dark): nav pill 32, 13/510, `#e5e5e6` -> `#fff`, five-layer contact ladder `0 8px 2px 0/.00, 0 5px 2px/.01, 0 3px 2px/.04, 0 1px 1px/.07, 0 0 1px/.08`, press `scale(.97)` [M], 160ms `cubic-bezier(.25,.46,.45,.94)`.

**Personality** Confident, neutral, zero ornament. Reads "infrastructure".
**Use** clean product-led heroes where the dashboard is the visual; brands whose voice is restraint.
**Avoid** when the previous build was also flat ink (it is the closest grammar to the house default); next to a busy photo.
**Pair** ink pill + surface pill with a 1px ring (Vercel) or + warm tinted pill without ring (Cursor, Family).
**Motion** hover: overlay to `ink 86% / canvas 14%` in 90ms, out 200ms; press `scale(.97)` 60ms; focus 2px accent ring offset 2.
**Light** `bg ink; label canvas; no shadow` / `bg surface; 0 0 0 1px line`.
**Dark** ink becomes the light pill; hover goes to pure white (Linear); add Linear's 2-layer contact ladder; twin gets `inset 0 1px 0 rgb(255 255 255/.04)`.

## 02 Frosted glass pill (`btn-g-glass`)

**Measured** [M]
- Mercury hero (over a landscape photo): primary `<button>` 40px r32, arcadia 16/420, `#5266eb` -> `#4d60df` (6% darker), active `#3544a9`, 300ms `cubic-bezier(0,0,.2,1)`. Twin "Launch demo": `rgba(175,178,206,.2)` + 1px `rgba(175,178,206,.36)` border + `backdrop-filter: blur(20px)`, hover `.28`, active `.357`; focus `2px solid #9cb4e8`. The primary sits inside a glass email field (input-pill with nested button).
- Convex (over a dark photo): 46px pill, gtAmerica 16/500; primary `#f1f1f1` -> `#e5e5e5`; twin `oklab(0 0 0/.2)` + 1px white border + `blur(6px)`, hover to solid black; focus `0 0 0 4px #fff, 0 0 0 6px #000`.
- Evervault (dark): 40px r24; primary `rgba(255,255,255,.9)` + `blur(8px)` + `::after` 1px `rgba(255,255,255,.8)` inner hairline; twin `rgba(255,255,255,.06)` + `::after` 1px `.06`.

**Personality** Atmospheric, consumer-premium; the image carries the brand and the buttons float on it.
**Use** cinematic photo, video or gradient-field heroes (Mercury, Convex).
**Avoid** on flat canvas (glass over nothing is a grey ghost); over busy detail where the label falls under 4.5:1.
**Pair** solid accent pill + glass pill at the same height.
**Motion** overlay steps glass alpha +8-10 points; 300ms ease-out (Mercury); press .97.
**Light (bright imagery)** smoke glass: `rgb(0 0 0/.2)` + inset 1px `rgb(255 255 255/.36)` + top light `.22`, `blur(20px) saturate(1.4)`, white label (Convex). Mercury's lilac `.2` tint works only because its photo is dark at button height.
**Dark** `rgb(255 255 255/.08)`, rim `.16`, top light `.14`.

## 03 Metal keycap (`btn-g-key`)

**Measured** [M][R] Raycast nav and hero "Download for Mac": 36px r8, Inter 14/500/+0.2px, fill `#e6e6e6`, label `#2f3031`, 16px glyph 8px gap; `box-shadow: 0 0 0 2px rgba(0,0,0,.5), 0 0 14px rgba(255,255,255,.19), inset 0 -1px .4px rgba(0,0,0,.2), inset 0 1px .4px #fff`; `:hover { background: #fff }`; `:active { background: var(--grey-100) }`; transitions `background 200ms, box-shadow 200ms ease-in-out, transform 100ms ease-in-out`; focus adds `0 0 0 2px #f4f4f4`.

**Personality** Tactile, "a key you press", keyboard-first.
**Use** launchers, dev tools, keyboard-driven apps, download CTAs on dark pages.
**Avoid** in soft AlignUI-type heroes; never more than one keycap row per viewport.
**Pair** light key + dark ghost key (Linear's secondary stack: `inset 0 0 0 1px rgb(255 255 255/.03), inset 0 1px 0 rgb(255 255 255/.04), 0 0 0 1px rgb(0 0 0/.6), 0 4px 4px rgb(0 0 0/.1)`).
**Motion** hover fill to white (overlay); press `translateY(1px) scale(.98)` 60ms; bevel lives on `::after` so the hover overlay never hides it.
**Light** surface key with `0 0 0 1px ink 22%`, `0 1px 1px ink 10%`, `0 3px 6px -2px ink 16%`, bevel `inset 0 -1.5px .4px ink 10%, inset 0 1px .4px #fff` [E].
**Dark** Raycast stack exactly.

## 04 Offset push (`btn-g-push`)

**Measured** [M][R] PostHog "Get started": outer `<a>` 203x46.7 r8 fill `#cd8407` with 1px `#b17816`, inner face `<span>` `#eb9d2a` same size with 1px `#b17816`, translated `-3px` at rest and `-6px` on hover (`hover:-translate-y-1.5`); RoundHog 18/500. Twin: same slab, white face. `transition: all`.

**Personality** Playful, toy-like, physical.
**Use** playful dev brands, games, community products; one per viewport.
**Avoid** in the default clean SaaS hero; the founder rejected a 3D push button in Vigil v2. Never lift on hover (PostHog does; the engine does not).
**Pair** accent face on a darker accent slab + surface face on a neutral slab.
**Motion** [E] the 4px slab is inside the box (48 = 44 face + 4 edge) so layout and focus stay true; hover only brightens the face (`::before` white .16); press sinks the face 3px in 34ms and releases over 250ms `cubic-bezier(.3,.7,.4,1)` (Comeau timing).
**Light** slab `accent 70% + black`, face accent with `inset 0 0 0 1px accent 66% + black, inset 0 1px 0 rgb(255 255 255/.28)`.
**Dark** slab `accent 52% + black` plus `0 8px 20px -10px rgb(0 0 0/.7)`; twin slab `ink 5%` with a `.06` white ring so it reads on near-black.

## 05 Inner-glow tint (`btn-g-glow`)

**Measured** [M][R]
- Reflect (dark `#030014`): 36px r8, Inter 14/500, transparent element with two pseudo layers: `::before` `rgba(113,47,255,.12)` + `linear-gradient(rgba(60,8,126,0), rgba(60,8,126,.32))` + `inset 0 0 12px rgba(191,151,255,.24)`; `::after` (hover layer, opacity 0) `.24` / `.42` / `inset 0 0 12px .44`; `.button:hover::before { opacity:0 } .button:hover::after { opacity:1 }`, 200ms `cubic-bezier(.6,.6,0,1)`; `backdrop-filter: blur(8px)`. Twin: `rgba(147,130,255,.01)` + 1px `rgba(243,238,255,.08)` + `inset 0 0 12px rgba(255,255,255,.08)`.
- Aceternity: 56px r9.6, dark fill `oklch(.205 0 0)` with `inset 0 0 0 2px fill, inset 0 0 0 3px rgb(255 255 255/.2), inset 0 0 10px rgb(255 255 255/.2)`; hover `.4 / 20px`; `active:scale-98`.

**Personality** Soft, luminous, "AI"; light comes from inside the control.
**Use** AI, notes and creative tools; dark-first brands; as a soft-tint accent on light pages.
**Avoid** stacking with a glowing background (two glows fight); on grey mid-tones.
**Pair** tinted glow primary + neutral glow twin (ink 2% fill, ink 10% rim, ink 5% inner glow).
**Motion** cross-fade a brighter glow layer (opacity only), 200ms; press .97.
**Light** [E] `accent 9%` over surface + gradient to `accent 16%`, rim `accent 26%`, inner glow 12px `accent 16%`, label `accent 78% + ink`.
**Dark** Reflect values: `.12` + gradient `.32`, rim accent+white 35%, inner glow 12px at 30%.

## 06 Spectrum edge + under-glow (`btn-g-edge`)

**Measured** [M] Magic UI "Browse Components": 40px r10 (320 wide), Geist 14/500, `border: 1px solid transparent`, three background layers: `linear-gradient(#121213,#121213)` (fill), `linear-gradient(#121213 50%, rgba(18,18,19,.6) 80%, transparent)` (fades the border toward the bottom), `linear-gradient(90deg, oklch(.662 .225 25.9), oklch(.907 .231 133), oklch(.696 .165 251), oklch(.802 .134 225), oklch(.604 .26 302))`; `::before` the same spectrum as a strip at the bottom edge with `filter: blur(12.8px)`; chevron moves 4px on hover (`group-hover:translate-x-1`). Twin: same with a white fill.

**Personality** Launch energy, "new", component-library flair.
**Use** launch pages, AI feature CTAs, developer component products.
**Avoid** more than one per page; finance and enterprise heroes; on a gradient background.
**Pair** ink edge button + surface edge button (the twin keeps a weaker glow).
**Motion** [E] glow strip opacity .55 -> .95 and `scaleX(.86 -> 1.04)` 300-400ms; the strip is `clip-path`ed so it only shows below the bottom edge.
**Light/Dark** identical construction; spectrum hues are the accent rotated -120, -60, 0, +40, +80 degrees with relative OKLCH (`oklch(from var(--accent) ...)`), falling back to the accent alone.

## 07 Lamp-lit ink + embossed rise (`btn-g-lamp`)

**Measured** [M][R]
- Attio "Start for free": 36px r10, Inter 14/500/-0.07px; fill `radial-gradient(at 50% -10%, from, to)` with both stops `lab(12.7)` at rest and a 1px `lab(37.4)` border (a rim lighter than the fill); hover `--button-primary-bg-from: lab(37.4)` (light pools at the top), active both stops `lab(25.9)`; `transition: --button-primary-bg-from/to 300ms cubic-bezier(.2,0,0,1)` and `hover:duration-50` (in 50ms, out 300ms). Twin: page fill, 1px `lab(83.2)` -> hover `lab(50.4)`; focus `0 0 0 3px` blue at .3.
- Sonner "GitHub": 40px r6, 13/600, pad 30; `linear-gradient(156deg, #fff, #f0f0f0)` + `0 0 0 1px rgb(0 0 0/.06), 0 1px 0 .08, 0 2px 2px .04, 0 3px 3px .02, 0 4px 4px .01`; `::after` an eased `#e8e8e8` ramp parked under the button that rises (`:hover::after { transform: translateY(-100%) }`), 200ms. Primary: `#171717` + `0 0 0 1px #171717`, hover `#282828`.

**Personality** Quiet premium; light behaves like a desk lamp.
**Use** CRM, data and B2B tools that want the Attio register without copying the house ink button.
**Avoid** right after a build that used the house inset-highlight ink (same family, swap to 01 or 09).
**Pair** lamp-lit ink + embossed neutral with rising fill.
**Motion** primary: radial lamp layer fades in 50ms, out 300ms; twin: fill `translateY(101% -> 0)` 360ms quint out; press .97.
**Light** rim `inset 0 0 0 1px ink 76% + canvas`; lamp `radial-gradient(130% 110% at 50% -10%, ink 70% + canvas, ink 72%)`.
**Dark** rim white .5, lamp white at top; twin `surface 90% + ink -> surface`, `0 0 0 1px rgb(255 255 255/.09)`.

## 08 Full-width auth stack (`btn-g-stack`)

**Measured** [M] Cal.com hero left column: two buttons 480x36 r12 stacked 12px apart; primary `linear-gradient(#292929, #242424)` + `inset 0 2px 0 rgba(255,255,255,.15)` + `::after` 1px `#242424`, Google glyph 20px centred with the label; twin `linear-gradient(#f7f7f8, #eaeaeb)` + `inset 0 2px 0 #fff` + 1px `#e1e2e3`, trailing 7x10 chevron; "No credit card required" 12px below.

**Personality** Low-friction, sign-up-now, product-tool honest.
**Use** sign-up-first heroes in a left column, waitlists, auth pages.
**Avoid** centred heroes (column-wide buttons need a column); more than two stacked.
**Pair** dark gradient key (provider) + light gradient key (email) at equal width.
**Motion** overlay step; twin chevron moves 3px; press `scale(.985)` (wide buttons need less scale for the same perceived travel) [E].
**Light** as measured, highlight 1.5px (2px reads heavy at 44) [E].
**Dark** primary turns light with a white 1px highlight; twin `surface 88% + ink -> surface`, ring white .09, highlight .07.

## 09 Compact editorial rectangle (`btn-g-compact`)

**Measured** [M] Lightfield hero: 32px r6, untitledSans 12/400, pad 10, gap 6; primary `lab(3.6)` (near black) -> hover `lab(27.1)`; twin `lab(0 0 0/.04)` -> `.06`, label black .85, no border; `transition: 50ms cubic-bezier(0,0,.2,1)`; focus `2px solid` blue at .5, offset 1.

**Personality** Editorial, precise, unhurried; the type and the product carry the hero.
**Use** split heroes with a large serif or light headline; quiet B2B; nav CTAs.
**Avoid** as the only CTA of a centred product hero (too small); with a 64px+ headline unless the composition is editorial.
**Pair** ink rectangle + tinted rectangle (never outlined).
**Motion** 50ms in, 120ms out; press .98.
**Override** hero at 36px (14/450) instead of 44; log `override: hero-cta-44 because editorial compact grammar` in DIRECTION.md.
**Light/Dark** dark flips to the light rectangle with hover toward white.

## 10 Mono caps square (`btn-g-mono`)

**Measured** [M][R] Warp hero: 33.8px r4, Azeret Semi Mono 12/500, letter-spacing 0.6px (0.05em), uppercase, pad 6/16; primary `#1a1522` + 1px same; `.btn-primary:hover { background: var(--accent); border-color: var(--accent) }` -> `#2a1eff`; twin white + 1px `rgba(26,21,34,.16)`, hover border and label go `#2a1eff`; 150ms. Labels elsewhere on the page use `[ fig. 1 — the factory ]` brackets.

**Personality** Technical, terminal, engineered.
**Use** infrastructure, CLIs, AI-agent and developer platforms.
**Avoid** consumer brands; with a mono headline (too much mono).
**Pair** ink square + outline square; optional `-3rd` bracketed text `[ DOCS ]` whose brackets part 3px on hover [E].
**Motion** hover swaps fill to accent (overlay) and the ring to accent; 150ms; press .98.
**Override** 36px height; log it.
**Light/Dark** dark: light square, transparent twin with `rgb(255 255 255/.18)` ring.

## 11 Accent block + arrow morph (`btn-g-arrow`)

**Measured** [M][R]
- Stripe: 48px r4, sohne-var 16/400, pad 15.5/24/16.5, `#533afd` -> `#4032c8`, chevron 5x8 trailing 8px; twin `rgba(255,255,255,.65)` + 1px `#b9b9f9`, label `#533afd`, hover border `#4032c8` and label `#2e2b8c`; 300ms `cubic-bezier(.25,1,.5,1)`; focus 3px `rgba(84,82,251,.75)` offset 1.
- Trigger.dev (dark `#121317`): 40px r4, Geist 16/400, lime `#a8ff53` -> hover **lighter** `#cfffa0`; trailing chevron plus a 12x2 shaft span; `group-hover:translate-x-1` moves the head (24px svg x 176 -> 182) and the shaft appears; twin `#121317` + 1px `#3b3e45` -> `#1c1e21`.
- Ramp: 52px r8, Lausanne 16/400, lime `lab(92 -20 85)` -> hover **lighter** `lab(97 -16 62)`, 300ms; focus `0 0 0 4px rgb(255 255 255/.2)`.

**Personality** Decisive, "go", fintech and developer energy.
**Use** brands with a strong saturated accent; pricing and sign-up CTAs.
**Avoid** soft or warm brands; pairing two accent blocks.
**Pair** accent block + outline block with an accent-tinted ring.
**Motion** chevron head `translateX(-3.5px -> 0)` while the shaft `scaleX(0 -> 1)` (Stripe's hover arrow), 220ms quint out; fill steps 18% darker for dark accents, 45% toward white for bright accents (`.is-bright`).
**Light/Dark** dark twin as Trigger (canvas fill, ink 20% ring).

## 12 Icon-tile statement (`btn-g-tile`)

**Measured** [M][R] Arc "Try Dia": 214x76, r22, pad 8/22/8/8, gap 16, `rgba(0,0,0,.85)` + `backdrop-filter: blur(3px)` + `0 2px 8px rgba(0,0,0,.25)`; 60x60 app-icon image inset 8px (concentric radius 22 - 8 = 14); ABC Oracle 24/400; trailing 22x29 arrow; `.c:hover { background: rgba(0,0,0,.65) } .c:hover svg { transform: translateX(2px) }`, 200ms ease-in-out. Kaching's founder-approved secondary uses the same idea at 44px with a 5px-inset tile.

**Personality** Statement, app-store, "this is the product".
**Use** a single download/try CTA for an app with a strong icon; hero rows with one button.
**Avoid** two tiles in one row as equal primaries; without a real icon (an empty tile looks like a bug).
**Pair** translucent ink tile button + surface tile button (Kaching secondary) or a text link.
**Motion** overlay step; arrow +3px; press .98.
**Override** 64px statement height (Arc 76); log it. Tile = h - 2 x inset, radius = r - inset.
**Light** ink at 90% alpha, blur 4, `0 2px 8px ink 25%`. **Dark** solid light ink; hover brightens toward white (alpha-lightening turns grey on dark, measured in the specimen).

## 13 Chip row (`btn-g-chip`)

**Measured** [M][R]
- Dub: 34px r8, Inter 16/400, pad 8/12, white + 1px `#e5e5e5` + `filter: drop-shadow(0 1px 1px rgba(0,0,0,.05))`; 16px colour tile r4 with 1px `rgba(0,0,0,.05)` and a 10px glyph; `group-hover:scale-110` on the tile; secondary chips `#f5f5f5` no border; 150ms.
- v0 (under the prompt box): 32px pill, Inter 14/500, white + 1px `oklch(0 0 0/.078)`, label `oklch(.51 0 0)` grey, 16px outline icon gap 6; hover fill `oklch(.961 0 0)` and label `oklch(.205 0 0)`; focus `0 0 0 1px #fff, 0 0 0 3px` blue.

**Personality** Inviting, choose-your-path, product-led growth.
**Use** under a prompt input, "pick a use case" rows, template galleries; the chip is the CTA.
**Avoid** as the hero's only conversion CTA when a sign-up is the goal; more than 6 chips; horizontal scrolling rows.
**Pair** tiled chips (Dub) as the featured row + pill chips (v0) as the long tail.
**Motion** tile `scale(1.1)` 150ms; pill chip label `--sub -> --ink` and ring 9% -> 16%; press .97.
**Light/Dark** dark: ring from `--line`, pill chips transparent with white .10 ring.

## 14 Arrow link-led (`btn-g-link`)

**Measured** [M][R]
- Linear hero has no button at all: "New  Loops →" right-aligned under the lede, Inter 16/400 `#f7f8f8`, "New" in full ink and the label muted, `transition: filter 160ms`, hover `filter: brightness(1.3)`. The only filled button is the 32px nav pill.
- Vaul: "GitHub →" 40px pill transparent, hover `#f4f4f5`, 12px arrow gap 4.
- Cursor: "Request a demo →" arrow as a text glyph inside a tinted pill.

**Personality** Confident restraint: the product image is the CTA.
**Use** heroes whose product visual is interactive or self-explanatory; changelog/announcement lines; secondary CTAs.
**Avoid** as the only action of a conversion page.
**Pair** ink link with arrow + muted "New · label" link with a ghost hover pill.
**Motion** arrow `translateX(3px)` 220ms; a hairline underline `scaleX(0 -> 1)` from the left over 300ms; twin label `--sub -> --ink`, hover pill `ink 5%`.
**Light/Dark** token-only; nothing changes in material.

## 15 Slide-swap pill (`btn-g-slide`)

**Measured** [M][R] Lusion header "LET'S TALK": 44.8px pill (r87.5), pad 15.75/22.75 (asymmetric), Aeonik 14/500 uppercase, `#2b2e3a`; hover rules: `background: var(--header-color)` (`#0016ec`), `#…-dots { transform: scale(0) }`, `#…-text { transform: translate3d(1.5em,0,0) }`, `#…-arrow { transform: translateZ(0) }` (slides in from the left); `transition: color .4s, background-color .4s`. Twin "MENU" `#e4e6ef` with two dots: hover white fill and `rotate(270deg)` on the dots.

**Personality** Studio, crafted, kinetic.
**Use** agencies, campaign and launch pages, portfolio-grade marketing.
**Avoid** dense SaaS heroes with a product dashboard (motion competes with the product); more than one per row.
**Pair** ink pill with status dot + tinted pill with a two-dot glyph.
**Motion** [E] fill to accent via overlay (300ms in, 400ms out), label `translateX(12px)`, dot `scale(0)`, arrow `translateX(-30px -> 0)` + opacity, all `cubic-bezier(.23,1,.32,1)`; reduced motion hides the arrow and keeps only the fill swap.
**Light/Dark** dark twin `ink 10%` over canvas.

## 16 Pointer spotlight (`btn-g-spot`)

**Measured** [M] Liveblocks hero (black page): primary 44px r8, suisse 16/500, white fill, child `div` 200x200 at -100,-100 with `radial-gradient(100px, #f7f7f8, rgba(247,247,248,0))` following the pointer, `group-hover:opacity-100`; twin transparent, `radial-gradient(100px, rgba(247,247,248,.12), transparent)`, trailing 14px chevron, active fill neutral alpha 500.

**Personality** Live, multiplayer, responsive to you.
**Use** collaboration and realtime products; dark heroes.
**Avoid** touch-first pages (no pointer, no effect) and anywhere the JS cost is unwelcome.
**Pair** ink spot button + ghost spot button.
**Motion** a 100px radial layer at `var(--mx) var(--my)` fades in 200ms; position updates live. Needs:
```js
document.addEventListener('pointermove', e => { const b = e.target.closest?.('.btn-g-spot, .btn-g-spot-2nd'); if (!b) return;
  const r = b.getBoundingClientRect(); b.style.setProperty('--mx', e.clientX - r.left + 'px'); b.style.setProperty('--my', e.clientY - r.top + 'px'); }, { passive: true });
```
**Light** spot = `canvas 26%` on ink. **Dark** spot = `canvas 12%` on the light ink (Liveblocks' `#f7f7f8` on white), twin white .14.

---

## Rules

- **RULE** Choose the button grammar from the hero's material and the brand's register, write it in DIRECTION.md (`button grammar: <slug> because ...`), and make it differ from the last accepted build in at least one of shape, material or depth (colour alone does not count).
  **Why** Founder: Vigil v1 was "too alike the project we just did, explore better ... buttons". Measured sites cluster by register: photo heroes use glass (Mercury, Convex), dark dev tools use keycaps or glows (Raycast, Reflect, Aceternity), infra uses mono squares or accent blocks (Warp, Stripe, Trigger), editorial heroes use compact rectangles (Lightfield).
  **Applies to** landing page. **Check** DIRECTION.md names a `btn-g-*` grammar; its (radius/height ratio, fill type, shadow layer count) tuple differs from the previous ledger entry's primary CTA in >= 1 of 3. **Source** founder-taste (Vigil round 1); this study [M]

- **RULE** Move the icon, not the button: hover motion lives inside the control (arrow travel 2-6px, shaft growing, tile scale 1.1, label slide) while the button box only changes fill.
  **Why** Measured inner motion: Arc arrow +2px, Trigger head +6px with a growing shaft, Stripe chevron + shaft, Dub tile scale 1.1, Magic UI chevron +4px, Lusion label +1.5em; the only box lift found was PostHog's push face (-3 -> -6px), which the founder rule forbids for primaries.
  **Applies to** all. **Check** hover computed `transform` on the button element = none (or the press scale only); inner icon transform <= 6px or scale <= 1.1. **Source** Arc, Trigger, Stripe, Dub, Magic UI, Lusion, PostHog [M][R]; founder-taste

- **RULE** Hover in fast, out slow: enter 50-100ms, leave 150-300ms.
  **Why** Attio sets 300ms rest and `hover:duration-50`; Clerk 150ms rest and 100ms on hover; Lightfield 50ms both ways; Linear 160ms. A fast entry feels responsive; a slow exit keeps the eye from flicker when crossing a button row.
  **Applies to** all. **Check** transition-duration on `:hover` <= 100ms and on the rest state 150-300ms. **Source** Attio, Clerk, Lightfield, Linear [M][R]

- **RULE** A bright, high-chroma accent lightens on hover; a dark accent darkens. Either way the fill moves away from the label colour.
  **Why** Trigger `#a8ff53` -> `#cfffa0` and Ramp `lab(92)` -> `lab(97)` (dark labels) lighten; Stripe `#533afd` -> `#4032c8` (-18%), Mercury `#5266eb` -> `#4d60df` (-6%), Supabase `oklch(.525)` -> `.485` (white labels) darken. Contrast rises in both cases.
  **Applies to** all. **Check** contrast(label, hover fill) >= contrast(label, rest fill). **Source** Trigger, Ramp, Stripe, Mercury, Supabase [M]

- **RULE** Glass buttons only over imagery, with blur 6-25px, a 1px rim at 0.06-0.8 white, and smoke (black .2) over bright images or tint (white .06-.2) over dark ones; the label must keep 4.5:1 against the darkest and lightest pixels behind it.
  **Why** Measured: Mercury rgba(175,178,206,.2) + .36 rim + blur 20 over a dark landscape band; Convex black .2 + 1px white + blur 6; Evervault white .06 + .06 hairline + blur 8 on black; Resend blur 25. The specimen showed white-tint glass over a bright sky dropping the label near 2:1, so the smoke variant is the light default.
  **Applies to** landing page. **Check** backdrop-filter blur in [6, 25]px; button sits over an image/video/gradient (not a flat colour); sampled background contrast >= 4.5. **Source** Mercury, Convex, Evervault, Resend [M]

- **RULE** On dark pages give the CTA an edge made of light (rim, inner glow or halo), never a black drop shadow alone.
  **Why** Raycast `0 0 0 2px rgba(0,0,0,.5), 0 0 14px rgba(255,255,255,.19)` + white inset top; Reflect `inset 0 0 12px rgba(191,151,255,.24)`; Aceternity `inset 0 0 0 3px rgb(255 255 255/.2), inset 0 0 10px .2`; Evervault 1px white .8 hairline. Black-only shadows measured on dark pages are invisible.
  **Applies to** landing page (dark). **Check** a dark-page CTA's shadow stack contains a white or accent layer with alpha >= .06 (outer halo, inset rim or inner glow). **Source** Raycast, Reflect, Aceternity, Evervault [M]

- **RULE** Animate fills with a layer's opacity (or a translated pseudo-element), not by transitioning background-image or multi-layer box-shadows; keep bevels on a layer above the hover overlay.
  **Why** Reflect cross-fades two pseudo layers (`.button:hover::before {opacity:0}`, `::after {opacity:1}`); Sonner translates `::after` up 100%; Liveblocks fades a radial child; Attio needs registered `@property` colours for its gradient. Opacity and transform composite; background-image does not interpolate.
  **Applies to** all. **Check** `transition-property` on CTA and pseudo-elements contains only transform, opacity, box-shadow (<= 2 layers) or registered custom properties. **Source** Reflect, Sonner, Liveblocks, Attio [R]; Comeau, Emil Kowalski [P]

- **RULE** An inset tile or image inside a button is concentric: tile size = height - 2 x inset, tile radius = button radius - inset.
  **Why** Arc: 76px r22 with a 60px icon inset 8 (22 - 8 = 14 radius); Kaching's secondary uses a 5px inset tile; Dub's 16px tile r4 sits in a 34px r8 chip with a 9px inset. Non-concentric radii read as a sticker on a button.
  **Applies to** all. **Check** inner radius = outer radius - inset +-1px; tile is vertically centred +-0.5px. **Source** Arc, Kaching, Dub [M]

- **RULE** Mono caps labels run 11-12px at +0.04 to +0.06em on a 32-36px control with radius <= 4, and only when the brand already uses mono elsewhere (labels, figures, code).
  **Why** Warp: Azeret Semi Mono 12/500 +0.6px (0.05em) caps on 33.8px r4, with bracketed mono figure labels on the same page; mono at sans sizes looks one step too big (see type note: mono 0.75-0.93x of sans).
  **Applies to** landing page. **Check** text-transform uppercase + monospace family => font-size <= 12px, letter-spacing / font-size in [0.04, 0.06], radius <= 4px; page has other mono text. **Source** Warp [M]; type-hierarchy-buttons-shadows 2.6

- **RULE** Chip rows that act as CTAs: 32-36px, label in the secondary tone at rest and ink on hover, 1px ring at ink 8-10%, 4-8px gaps, at most 6 chips, wrapping not scrolling.
  **Why** v0 32px pills with `oklch(.51)` labels, ring alpha .078, hover label `oklch(.205)`; Dub 34px r8, 1px `#e5e5e5`, tile scale 1.1; both rows sit directly under the main input or heading.
  **Applies to** landing page | SaaS app UI. **Check** chip height in [32, 36]; rest label contrast in the secondary band (6-9:1), hover label primary; count <= 6. **Source** v0, Dub [M][R]

- **RULE** Use tactile grammars (keycap, offset push, spectrum edge, slide-swap, spotlight) at most once per viewport and only on the single primary; the rest of the page uses the flat or ring version of the same shape.
  **Why** Each of these spends attention: Raycast and PostHog use the material on one CTA per section; Magic UI repeats its edge only on the hero pair. The founder rejected a whole-page tactile treatment (Vigil v2 3D push in a poster hero).
  **Applies to** landing page. **Check** count of elements with class `btn-g-key|push|edge|slide|spot` in any 1440x900 viewport <= 2 (primary + its twin). **Source** Raycast, PostHog, Magic UI [S]; founder-taste (Vigil round 2)

- **RULE** The secondary inherits the primary's shape and height and drops exactly one tier of material (fill -> ring/tint/glass -> text), never adding a second fill of equal weight.
  **Why** Every measured pair: Vercel ink pill + ring pill (40/40), Mercury accent pill + glass pill (40/40), Warp ink square + outline square (33.8/33.8), Lightfield ink + 4% tint (32/32), Raycast/Linear light key + dark key, Arc tile + text, Resend glass + text (48/48).
  **Applies to** landing page. **Check** primary.height = secondary.height; radius equal (or both pills); secondary fill alpha <= 0.2 or a ring/text only. **Source** Vercel, Mercury, Warp, Lightfield, Raycast, Linear, Resend [M]

## Not measured / caveats

- **Lovable**: Cloudflare bot check on every load (not bypassed). **Granola**: renders blank in headless Chromium. **Neon**: page navigated during evaluation (two retries). **Superhuman**: A/B variants rotated between runs ("Get Mail" lavender soft-tint pill seen in one fold screenshot, "Get Superhuman" in another); no computed values kept. **Basement**: the HUMAN/MACHINE segmented toggle is not an `a`/`button` and was not captured. **rauno.me**, **emilkowal.ski** and **linear.app/changelog** have no CTA buttons (Emil's Sonner and Vaul demo sites were measured instead). **Clerk** hero has no CTA (nav only; cookie banner overlapped). **Framer** and **Cal.com** put styles on child layers; their computed font family reads `sans-serif` on the anchor.
- Hover values were read after a real mouse hover (600ms); "press" readings were taken with the mouse held down, so they include the hover state. PostHog's press state and Lusion's mid-hover transforms are partial.
- All measurements are light-scheme page loads; "dark" recipes come from sites whose pages are dark (Linear, Raycast, Reflect, Resend, Trigger, Liveblocks, Evervault) and from engine adaptation [E] for the others.
