# Kaching website — implementation system

Updated 5 October 2026. This records the accepted homepage system and the rules for extending it to app pages. The running implementation is `/Users/augustas/Documents/ChatGPT/Kaching-hero-figma`, served locally at `http://127.0.0.1:4340/`. The older `/Users/augustas/Documents/ChatGPT/Kaching` project contains research and earlier proposals, not this accepted implementation.

## Authority and context

1. Current user instructions and the latest selected Figma nodes govern the result.
2. Existing accepted homepage components govern the visual language. Extend them; do not invent an unrelated app-page theme.
3. Figma MCP supplies real layer geometry, typography, spacing and assets. A screenshot is comparison evidence, not a replacement for editable HTML/CSS.
4. Commslayer informs page composition, restrained section rhythm and interaction clarity. Attio informs pacing and editorial organization. Neither overrides Kaching's accepted font, rail width or controls.
5. Archived `DESIGN-historical-before-subscriptions.md`, older `references/` recommendations and `KACHING_CONTEXT.md` are historical. Their contradictory suggestions are superseded by this document and newer instructions. In particular, earlier avatar reviews, invented visuals, regular-weight Commslayer headlines, two review rows and button-lift interactions are not current requirements.

The latest user changed the next app-page priority from Bundles to **Subscriptions**. The Bundles hero frame remains a useful composition reference, while the remaining app wireframes are structural sketches rather than finished visual specifications.

## Code map

| File | Responsibility |
| --- | --- |
| `src/pages/index.astro` | Homepage document: `<Seo />` head, React island, `<SiteBoot />` |
| `src/components/Seo.astro` | Shared head for every page: title, description, canonical, robots, favicons, Open Graph, Geist preload |
| `src/components/Hero.tsx` | Homepage hero, app selection, shared navigation integration, demo dialog |
| `src/components/SiteHeader.tsx` | Shared exact header/menu; optional homepage callbacks, app-page links, focus/scroll-lock behavior |
| `src/components/AppCatalog.tsx` | Suite proof, merchant logo band, six app cells |
| `src/components/FigmaCaseStudies.tsx` | Expanding desktop stories, readable stacked mobile stories, proof panels |
| `src/components/MerchantTestimonials.tsx` | Three continuously moving review rows, no reviewer images |
| `src/components/LandingContinuation.tsx` | Integrations, MCP, support, updates and closing CTA |
| `src/components/SiteFooter.tsx` | Footer navigation, utility row, desktop wordmark/mobile symbol, live dither |
| `src/components/DitherBackground.tsx` | Visibility-aware animated background wrapper (`fade`/`narrowFade`, `fps`, `intro`, `interactive`) |
| `src/components/SiteBoot.astro` | Page-level boot scripts: early dither paint, Lenis smooth scroll, noscript/failsafe reveal styles |
| `src/components/Reveal.tsx` | Shared Framer Motion scroll reveals |
| `src/components/ArrowLink.tsx`, `src/styles/links.css` | The one text link with an arrow (`ArrowLink`, or `.arrow-link` + `ArrowLinkLabel`) and the shared sliding underline (`.link-line`) |
| `src/components/Accordion.tsx`, `src/styles/accordion.css` | The one FAQ accordion: every FAQ on app pages, Affiliate, MCP, All apps and Integrations |
| `src/components/CountUp.tsx`, `src/styles/count-up.css` | Sliding-digit figure that rolls into place once in view (homepage proof stats) |
| `src/components/MotionProvider.tsx` | `LazyMotion` (domAnimation, strict) wrapping every island root |
| `src/components/AppVisual.tsx`, `src/components/app-visuals/` | Six app-card animations (`*-card-*`, shared `card-shell/`): one lazy chunk each, mounted near the viewport; each card pauses itself offscreen |
| `src/lib/motion.ts`, `src/lib/scroll.ts` | Motion tokens (see Motion defaults); scroll-to-target and scroll-lock helpers |
| `src/lib/dither.ts` | Shared WebGL renderer and ordered-pixel transition logic |
| `src/lib/ditherRuntime.ts`, `src/lib/ditherPerformance.ts`, `src/lib/dither-handoff.ts`, `src/scripts/dither-boot.ts` | One scheduler for all surfaces (frame loop, pointer router, adaptive quality tiers); pre-hydration paint and React handoff |
| `src/scripts/smooth-scroll.ts` | Lenis boot; installs `window.kachingScroll` |
| `src/lib/images.ts`, `scripts/optimize-images.mjs` | WebP derivative table and `srcSet` helpers; the script that writes both |
| `src/styles/page-hero.css` | CSS-only hero entrances for every page except the homepage |
| `src/lib/design.ts` | App identities/palettes, common assets, navigation data, motion preset |
| `src/styles/hero.css` | Shared tokens, header, hero and responsive overrides |
| `src/styles/landing.css` | Rails, catalog, proof and base section rules |
| `src/styles/continuation.css` | Current lower-page system |
| `src/styles/figma-case-studies.css` | Exact case-study composition |
| `src/styles/merchant-testimonials.css` | Exact review composition |
| `src/styles/site-footer.css` | Footer geometry and glass artwork |
| `public/figma/` | Exported original Figma assets |
| `public/*/opt/` | Generated WebP derivatives; commit them with the code that uses them |
| `public/brand/` | Browser-renderable footer glass symbol and opaque alpha mask |

Dependencies are pinned by the existing lockfile. Stack: Astro (static output, one React island per page), React, Tailwind CSS, Framer Motion (through `LazyMotion`), Lenis, Lucide, locally loaded variable Geist, and `sharp` (via Astro) for the image script. Existing CSS has several historical overrides: inspect the last applicable rule and computed style before extending it. Avoid broad `h2`, `p`, or button selectors that leak into another component.

## Visual tokens

| Token | Current value / role |
| --- | --- |
| Font | `Geist Variable`, `Geist`, sans-serif; self-hosted via `@fontsource-variable/geist` |
| Main ink | `#08090c` |
| Heading ink | `#171717` |
| Secondary text | `#666` |
| Page surface | `#f7f7f7` |
| White section | `#fff` |
| Divider | `#e3e3e3`, 1px |
| Hover surface | `#f2f2f2` |
| Dark section | `#08090c` with dark inner borders around `#1c1c1c` |
| Section heading | 36px / 1.2, weight 600, tracking −0.06em |
| Mobile heading | Generally 32px / 1.2; compact catalog headings 24px. Use the component's measured role. |
| Standard copy | 16px / 1.4, weight 500, tracking −0.03em |
| Feature introduction copy | 18px / 1.4, weight 500, tracking −0.03em |
| Page button label | 16px / 1.3, weight 500, tracking −0.03em |
| Header button label | 15px with the existing compact header control |
| Common corners | Controls 12–14px; app icons 6–9px; product/feature previews 18–24px |

Do not reset headings to Commslayer's Stack Sans Headline/400. Its source has 48px headings and 1280px rails; Kaching deliberately has its own 36px/600 Geist hierarchy and 1200px rail.

## Layout and responsive behavior

- Desktop uses a centered 1200px content rail, generally `min(1200px, 100% - 48px)` with 1px side rules. Inner content commonly uses 32–36px gutters.
- Full-width white, gray or dark section backgrounds extend outside the rail. Put the color on the outer section, and the content/rules inside it.
- Each divider has one owner. The `.landing-rail` owns the outside vertical rules; nested edge-to-edge content must not redraw them or widen itself with negative margins. Adjacent sections share one horizontal 1px rule, not a bottom border plus the following top border. Dark section rails change their inline border colour only; the outer section owns the horizontal boundaries. The final section owns the divider above the shared footer on desktop and mobile.
- At 767px and below, the latest homepage uses full-width sections without side rails. Gutters depend on the component: 12px hero/footer, 18px catalog, and measured review/story spacing.
- Preserve horizontal rules between mobile metrics and the merchant-logo band. The current metric strip is 102px high; the logo strip is 76px including its two 1px borders.
- Main headings, body measure, action spacing and preview placement should repeat across app pages. A new page needs new product copy, not a new spacing system.
- Do not use desktop fixed heights where mobile copy can wrap. Grids collapse in meaningful reading order; keep `min-width: 0` on flexible content and explicit aspect ratios on reserved visual regions.
- Mobile hero preview is fluid, width 100% within the 12px stage gutters, aspect ratio 366/255. Do not reinstate the fixed 366px width.
- Responsive tiers: phone ≤539px, large phone 540–767px, small tablet 768–899px, tablet 900–1180px, desktop above. 767/768 is the main switch (rails, header, stacked stories); the other tiers adjust columns and type inside it. Check 320, 390, 540, 768, 900, 1024 and 1440 at minimum.
- Touch targets are at least 40px (44px where the control already has room). One-line text links and small icons get the height from an invisible hit area (a transparent pseudo-element, or padding offset by equal negative margins), never by changing their visual size or spacing. A pseudo-element hit area does nothing inside an ancestor that clips overflow: About's wall portraits clip, so the tile forwards a tap on its edge to its button instead. On phones (≤767px) every control measured 40px or more on 6 October, including footer column links, blog topic chips and search, changelog filters and sort, legal contents rows, brand-kit downloads and motion picker, About portraits and the 404 help link. Tablet widths still have smaller targets; see the handoff's open items.
- Phones balance the lines of headings and short intros that otherwise leave one word on the last line (legal h2s, editorial card titles, app-page section intros), through `text-wrap: balance` inside phone queries. A site-wide `text-wrap: pretty` was tried and made Chrome worse. Below 360px the homepage MCP prompt drops to 10.5px so it fits its card.

## Identity and dither

Use the existing app records rather than inferring new colors from screenshots.

| App | Icon | Dither palette (dark / middle / light) |
| --- | --- | --- |
| Bundles | `/brand-kit/apps/kaching-bundles.png` | `#2054b4`, `#728add`, `#b2e8f4` |
| Post-purchase | `/brand-kit/apps/kaching-post-purchase.png` | `#c13d69`, `#ef8787`, `#ffe1ce` |
| Popup | `/brand-kit/apps/kaching-popup.png` | `#8e482b`, `#c5824b`, `#f5d9b2` |
| Cart | `/brand-kit/apps/kaching-cart.png` | `#087d54`, `#41b886`, `#c1edcb` |
| Subscriptions | `/brand-kit/apps/kaching-subscriptions.png` | `#a88011`, `#d9b332`, `#f8e6a0` |
| Email | `/brand-kit/apps/kaching-email.png` | `#175ec7`, `#46adea`, `#b9e9ff` |

Pages show each icon through `apps[].icon` as its 160px WebP derivative (`/brand-kit/apps/opt/kaching-<app>-160.webp`) inside `AppIcon`; the Brand kit's 64px tiles pass the PNG path to `responsiveImage()` instead, so 3x screens get the 256px step. The brand-kit downloads link the PNGs. See `references/app-icon-sources.md` for the artwork.

- Keep the custom live dither. Figma's flat dither images are composition references; do not replace the renderer with them.
- A fade to white must dissolve through the pixel distribution itself. The shader jointly quantizes palette and edge coverage; a plain white opacity gradient over the live surface is not the intended effect.
- App-page hero, selected app surfaces and bottom artwork use that app's palette. Subscriptions is warm yellow/gold, with dark readable text and the existing neutral button styles.
- Closing CTA dither belongs predominantly on the right half, dissolving toward the text column. Do not put dense texture behind the headline.
- Default cell size is 2 CSS pixels. The shared adaptive scheduler targets up to 30fps ambient / 60fps pointer motion, lowers quality under sustained load, pauses offscreen/document-hidden effects, and renders a stable frame for reduced motion or Save-Data. Interaction is enabled sitewide by default; see `docs/DITHER-PERFORMANCE.md`.
- Reuse `DitherBackground`; do not create one unrelated shader per section. All important text and controls remain real HTML outside decorative canvases.
- Every page that renders `DitherBackground` must include `<SiteBoot />` (`src/components/SiteBoot.astro`). Its `src/scripts/dither-boot.ts` creates the single shared WebGL context, compiles the shader asynchronously and paints visible surfaces before React hydrates; `DitherBackground` then adopts those surfaces through the `globalThis` registry in `src/lib/dither-handoff.ts`. The one scheduler in `src/lib/ditherRuntime.ts` ticks every running surface at its adaptive tier's rates (up to 30fps ambient, 60fps during the entrance or pointer interaction). Never insert DOM nodes before hydration.
- Each surface plays a one-time "pixel develop" entrance the first time it becomes visible: cells switch on in Bayer order along a noise-bent wavefront, coarse blocks resolve into the 2px lattice and the tone settles from the flat ground into the live field (180ms delay, 1200ms). It doubles as the scroll reveal for dither surfaces. Tune or disable it with `intro={{ delay, duration, origin }}` or `intro={false}`; reduced motion shows the settled frame. Until the first frame the surface shows its flat ground colour; the static CSS fallback appears only without WebGL. The wrapper (never the canvas) exposes `data-renderer` (`pending`, `webgl`, `parked`, `fallback`), `data-intro` and `data-motion` for styling and tests; `docs/DITHER-PERFORMANCE.md` lists the other QA fields.
- A surface that needs a different edge on phones takes `narrowFade`, applied at `max-width: 767px` from the first frame and without a React render (homepage stage, directory closing sections). Add a second, CSS-swapped surface only when the phone composition is genuinely different (the affiliate and app-page heroes); the hidden one never renders. `fps` lowers the ambient cap below the tier's rate for slow or glass-covered art (the footer runs at 20).
- Never call `getImageData` (or read pixels another way) on a dither canvas: it forces a GPU readback every frame. Code that needs the colours on screen, like the pixel splash, uses `surface.sample(x, y, out)` from the runtime, which shades a cell on the CPU from the last drawn state.

## Component contracts

### Navigation and controls

Reuse the exact floating white header and its responsive menu. The desktop Apps and Resources menus share one panel (`useMenuMorph`) that follows Commslayer's navigation timing: after 90ms hover intent it fades in over 200ms; while open, it glides and resizes to the other section over 420ms as content slides in from the direction of travel; it closes in 130ms after a 140ms grace, or at once when the pointer leaves the header. Hovering the plain links keeps an open menu, so it can travel between sections. Opening mobile navigation starts with Apps and Resources collapsed. Preserve Escape/outside-click dismissal, focus return, keyboard movement, scroll lock and inert background content. App navigation must link to actual local app routes when implemented, otherwise the appropriate homepage app section or verified external destination.

Buttons do not move upward on hover. Use background/border change and a small press scale (`0.97–0.98`). Do not add random icons; use existing assets or a consistent Lucide weight.

- **Text links:** every text link with an arrow is `ArrowLink` (or `.arrow-link` with `ArrowLinkLabel` where the component can't be the element, such as a card or row that is itself the link). The arrow stays still (`ArrowRight`, or `ArrowUpRight` with `external` for links that leave the site); the underline is the one hover signal. It slides in from the left and leaves to the right over 300ms on `--ease-link` (`cubic-bezier(.33,1,.68,1)`), and an interrupted hover reverses smoothly instead of jumping. Plain text links (footer columns, the 404 help link) use `.link-line` on their own. Prose links in articles and legal pages keep their persistent underline. No one-off hover styles.
- **Rating badges** (hero, testimonials, footer) are one link with one underline across the whole badge. Stars on phones are 65×11 (hero, testimonials header, footer, testimonial cards); the affiliate partner stars are 77×13.
- **FAQs** use `Accordion`: a question is a real button in an h3, an answer stays in the HTML as a labelled region. Opening animates the answer's grid row from 0fr to 1fr over 450ms on `--ease-accordion` (`cubic-bezier(.32,.72,0,1)`); the answer fades in 320ms, 80ms behind, rises 6px and leaves in 160ms; the plus folds into a minus on the same timing; hover darkens the icon (`#8f8f8f` to `#171717`) and runs the question's underline. One item open at a time by default (`multiple` allows several). Without JS, or if the island never hydrates, every answer shows open.
- **Hover only where a pointer hovers:** every `:hover` rule sits inside `@media (hover: hover)`, so a tap on a phone never leaves a control stuck in its hover state. Split a combined `:is(:hover, :focus-visible)` selector so the focus half stays outside the query. Pointer handlers that imitate hover (`DitherPortrait`) check `event.pointerType === "mouse"`.

### Product visuals

The latest accepted scope reserves blank white or neutral visual containers. Do not rebuild fake dashboards from arbitrary divs, add invented storefront branding, or populate wireframes with unrelated stock/generated imagery. Copy and layout should communicate the benefit while the reserved visual area remains ready for a later real product demonstration.

The six app-card animations (`app-visuals/*-card-*` on the shared `card-shell/`) render only through `AppVisual`. Each is its own lazy chunk: it is prefetched about 1.5 viewports ahead (or when the browser is idle) and mounted while it is within 600px of the viewport. The card's own timeline (`card-shell/useTimeline.js`) plays only while the card is in view, the tab is visible and motion is allowed; otherwise it holds its frame. Server and hydration renders show only the dither, so the chunks stay off the hydration path, and a chunk that fails to load leaves the dither in place. Add a new card as another entry in its `loaders` table, accepting `contentOnly`, `scale` and `box`.

The homepage MCP preview's neutral visual region is a single area; the unwanted inner white rectangle has been removed. Keep visual styling separated from its surrounding copy layout.

On standalone MCP and Affiliate pages, omit the label or pill above the hero title. App pages retain their product icon and app name. The standalone MCP page uses charcoal/stone dither and one reserved hero visual; see `MCP-HANDOFF.md` for its composition.

### Cases and reviews

- Desktop case photos expand with selection while preserving the last active state. Mobile cards are stacked, all metrics readable, links usable with one tap. Mobile dividers separate stories.
- Desktop/tablet story cards follow Slash's sticky pattern: hover, focus, keyboard and touch select; mouse-leave keeps the selection. Pure CSS flex-grow (560/275, tablet 560/240) over 700ms on `--case-ease` (`cubic-bezier(.22,1,.36,1)`). Inactive photos look `grayscale(60%) brightness(.8)` rather than faded, which washes out on white, and rest at scale 1.04. The look comes from a `.figma-case-dim` overlay (20% black plus a static `backdrop-filter: grayscale(60%)`) whose opacity animates, so no filter is re-run on large images during the transition. Metrics keep their 91px reserved and rise 7px into view one after another: the first after 180ms, each next 90ms later (`--stagger-metric`), on a hover switch and when a card first scrolls in (phones too); they leave together in 160ms. The progressive blur is painted once into a 1x canvas inside the fixed-size photo stack. Painting decodes the photo on the main thread, so paints are queued until scrolling has paused for 200ms, one card at a time. Until then the identical backdrop-filter fallback shows. On phones the card nearest 55% of the viewport is in full colour, the others get `grayscale(45%) brightness(.9)` (10% black overlay), and every metric stays visible.
- Blog, case and related cards use the team's CardDitherReveal hover dither (see `EDITORIAL-SYSTEM.md`). Merchant stories below the featured card rise in with `Reveal`, staggered 0.09s across the two-column row.
- Case photos have a 1px white 20% border and no drop shadows. Preserve original supplied images and their progressive blur treatment.
- Reviews use **three moving rows**, 407×184px desktop cards, 12px horizontal gaps and 16px row gaps. Current desktop row region is 768px tall with 92px top/bottom padding.
- Review cards are white, radius 22px, padding 18px; quote 16px, merchant name 14px, usage 12px. **No avatars or logos.**
- Pause motion when offscreen, on keyboard focus or stage hover, and under reduced motion. No visible pause button was requested.
- Do not reuse Bundles review content as Subscriptions reviews. Merchant statements and rating counts need a source and correct app identity.

- The homepage logo band (`MerchantProof` in `AppCatalog.tsx`) shows all eight merchant logos from kachingappz.com's brand strip, in its order; sources and quality are in `references/merchant-logo-sources.md`. It moves at a constant 40px/s (32px/s on phones, `--marquee-speed`/`--marquee-speed-phone`) whatever the number of logos: the loop length comes from the logos' widths (`--logo-width`, `--logo-count`). Never trace, redraw, upscale or generate a logo.

### Footer and closing CTA

The closing CTA is a separate section from the footer, with a single full-width divider between them. Its right-side dither fills the whole card height, with a short pixel-quantized horizontal transition (38% of the dither field), including on mobile. Reuse its dark rounded card, two actions and reserved preview area, with app-specific copy and dither.

Desktop footer has a brand column plus Apps / Explore / Company / Resources / Legal, then a slim utility row, then full-width artwork. Side rails dissolve before the artwork. Desktop artwork uses a large transparent Geist wordmark: weight 600, maximum 362px, a separate 1px white 20% stroke, and masked 8px live backdrop blur with a 40% white glass fill. The wordmark anchors to the bottom at -0.42em, preserving the crop while resizing. Up to 1024px, use the original 316×191.256 symbol geometry at a maximum rendered width of 332px (only 16px wider than the original), constrained to the viewport minus 24px. Never expand the symbol to fill tablet width. Its 40% white fill, 1px white 20% vector outline, opaque blur mask and 8px blur stay intact; anchor it at the bottom with a 24% downward translation. Do not add a rectangular glass panel behind the artwork.

The footer artwork's pixel entrance waits until the artwork's top edge rises past 75% of the viewport height (`footerDither.startLine`, the `SiteFooter` prop `ditherStartLine`), so it plays as the visitor arrives at the footer rather than as it first peeks in; reaching the end of the page starts it regardless (tall screens, the End key, anchor jumps). The surface is prepared well before that and shows its flat ground until the entrance's first frame.

Footer copy, rating link and palette must be parameterized for an app page. Homepage hash links must retain a `/` prefix when used elsewhere. Do not duplicate Company as a second Explore column. All apps belongs in Explore as the suite entry; Apps lists the six actual products. Email is marked Soon until its status changes. No Back to top control.

## Motion defaults

The shared preset is 220ms with `cubic-bezier(.22,1,.36,1)`. `src/lib/motion.ts` is the one place to tune motion; `global.css` mirrors what CSS needs as custom properties in `:root`, so change both together. The homepage hero load-in (`hero.css`) and the menu morph (`SiteHeader`, `useMenuMorph`) keep their own tuned values. Honor reduced motion before introducing initial offscreen states.

| Token (`motion.ts`) | Value | CSS mirror | Used by |
| --- | --- | --- | --- |
| `ease.outExpo` | `[.16, 1, .3, 1]` | `--ease-out-expo` | Hero load-ins, hero app switch |
| `ease.outQuint` | `[.22, 1, .36, 1]` | `--ease-out-quint` | Controls, micro-interactions (`motionPreset`) |
| `ease.outSoft` | `[0, 0, .2, 1]` | `--ease-out-soft` | Story cards, accordion answer fade |
| `ease.reveal` | `[.26, .32, .14, 1]` (a critically damped spring fit) | `--ease-reveal` | Scroll reveals |
| `ease.link` | `[.33, 1, .68, 1]` | `--ease-link` | Link underlines, count-up |
| `ease.accordion` | `[.32, .72, 0, 1]` | `--ease-accordion` | Accordion |
| `duration.micro` / `.reveal` / `.revealFade` / `.link` / `.accordion` | 0.22 / 1.2 / 0.9 / 0.3 / 0.45s | `--dur-micro`, `--dur-reveal`, `--dur-reveal-fade`, `--dur-link`, `--dur-accordion` | As named |
| `reveal` | rise `min(28px, 5.2vw)`, side `min(40px, 4.1vw)`, blur 6px, stagger 0.08s, margin −12% | — | `Reveal` |
| `heroSwitch` | enter 0.7s outExpo after 0.06s, leave 0.24s outQuint, slot width 0.6s | `--dur-hero-switch` | Homepage hero app switch |
| `countUp` | first roll 0.9s, each next character starts 0.035s and lands 0.07s later, symbols slide 0.7s, one full turn, `ease.link` | — | `CountUp` |
| `marquee` | 40px/s, 32px/s on phones | `--marquee-speed`, `--marquee-speed-phone` | Logo band |
| `caseMetrics.stagger` | 0.09s | `--stagger-metric` | Case-study figures |
| `footerDither.startLine` | 0.75 of the viewport | — | Footer artwork entrance | Avoid a new entrance on every nested label, layout jumps, shadow glows or fast ambient distortion.

- **Homepage hero load-in** is CSS-only (`hero-*` keyframes in `hero.css`) so it runs from first paint, before hydration. It animates only transform/opacity on stable wrappers with fill-mode backwards, never on the keyed Framer elements or the shared header. The headline and description start at opacity 0.01 rather than 0 so FCP/LCP are not deferred. Reduced motion removes it.
- **Every other page hero** loads in the same way through `src/styles/page-hero.css`, which reuses the homepage keyframes: `.page-hero-in` staggers its children (70ms apart from `--hero-at`), `.page-hero-rise` lifts one element and `.page-hero-stage` lifts a hero window or cover from 97% while it fades in quickly; a window over a dither surface (and the homepage preview) stays opaque and only rises, so no veil crosses the developing cells. Put the classes on plain server-rendered wrappers, never `Reveal`/`AppReveal` or a dither surface, so the hero paints at first paint (LCP = FCP) and hydration leaves it alone. Headings, paragraphs and LCP-sized covers or display type start at 0.01. LCP rule: never server-render the LCP text or image at opacity 0 (Chrome does not count an invisible paint, so LCP would wait for the animation or for hydration). Per-page offsets live at the end of that file. Reduced motion removes these entrances too.
- **Scroll reveals** use `src/components/Reveal.tsx` (`Reveal`, `RevealGroup`, `RevealItem`; `AppReveal` wraps it): opacity from 0.01 (the LCP rule above, for reveals that land in a phone's first viewport) plus up to 28px travel (`min(28px, 5.2vw)`, 20px on a 390px phone), optional 6px blur on text-sized blocks only, 1.2s travel and 0.9s fade on `--ease-reveal` (a soft start and a long settle, half the travel at about 250ms), 80ms stagger, starting once a block's top is 12% above the viewport's bottom edge. Reveal meaningful blocks, not every label. Above-the-fold copy must not depend on hydration to become visible. Reduced motion shows reveals in place. The server renders reveals hidden (Framer's inline initial styles), so `SiteBoot` carries the fallbacks: a `<noscript>` style shows every `[data-reveal]` and opens FAQ answers, and if the island is still unhydrated 3s after load (for example a failed chunk) `html.reveal-failsafe` does the same (`global.css`). Keep `data-reveal` on anything that starts hidden.
- **Framer Motion elements** are `m.<tag>` (`import { m } from "framer-motion"`), never `motion.<tag>`: every island root sits inside `MotionProvider` (`LazyMotion` with `domAnimation`, strict), so only animate/exit/variants/hover/tap/in-view ship. Under `strict` a stray `motion.<tag>` is an error, but framer-motion only arms that check where `process` is defined, which `astro dev` in the browser is not; grep for `motion.` rather than relying on dev to catch one. Use the `domAnimation` feature set only: layout, `layoutId` and drag would need `domMax`, so avoid them. A new island root wraps its tree in `MotionProvider` once; `/explorations/mcp-visuals/` is deliberately unwrapped because it has no Framer imports. The app cards in `app-visuals/*-card-*` are the one exception: they keep `motion.<tag>` because CI rebuilds each card's standalone preview from its source, so `AppVisual` renders them inside `NonStrictMotion` and only their lazy chunks carry the full bundle.
- **Hero app switch** (homepage): the entering name rises into a clipped slot while the old one leaves upward faster, and the slot's width glides to the new name, so nothing below the title moves. Phones under 540px keep the title at a fixed three rows for every app.
- **Count-up figures** (`CountUp`): the figure is always real server-rendered text; an aria-hidden overlay of digit reels rolls over it once in view, then goes. No-JS and reduced motion show the final value.
- **Smooth scrolling** uses Lenis (`src/scripts/smooth-scroll.ts`, loaded by `SiteBoot`) for fine pointers only; touch keeps native scrolling and reduced motion turns it off. Its frame loop stops when idle. It installs `window.kachingScroll`; components never touch Lenis directly. Scroll to anchors only through `scrollToTarget()` from `src/lib/scroll.ts`, and lock the page under overlays with `lockScroll()`/`unlockScroll()` so Lenis stops with it. Scrollable overlays other than `dialog` and `.mobile-navigation` need `data-lenis-prevent`.

## Images

- Raster images ship as display-sized WebP derivatives in an `opt/` folder beside each untouched original (`public/editorial/hello.png` → `public/editorial/opt/hello-960.webp`). `src/lib/images.ts` holds the generated size/width table and the helpers: `responsiveImage(src, sizes)` for `<img>` props (`srcSet` plus a ≤1280px fallback), `variantPath`, `imageSize`, and `smallestImage` for code that only samples colours. An image without derivatives keeps its original `src`, so new content works before the script runs.
- To add or change an image, run `node scripts/optimize-images.mjs` from the repo root (`--dry` reports, `--force` re-encodes, `--prune` removes stale files inside `opt/`). Images in `public/editorial` are picked up automatically; others need a job in the script. It needs `sharp`, which comes with Astro. Commit the new `opt/` files and `src/lib/images.ts` together with the code that uses them.
- Article covers and the featured archive card are eager with `fetchPriority="high"`; other cards and in-article figures are `loading="lazy"`. Lazy images list `auto` first in `sizes`; Safari and Firefox ignore it and use the next entry, so keep a real fallback after it.

## Content and evidence

- Homepage sells the suite/company; app pages explain one product's benefits and setup in detail.
- Shared client positioning: bootstrapped, accessible pricing, 24/7 human support, frequent shipping. Quantified shipping claims require real release data.
- Never turn `X,000`, `$XXXM`, example case numbers or forecast accuracy examples into asserted facts.
- Product pricing and reviews must be checked on the current official Shopify listing/support docs. Preserve source links and retrieval dates in research notes.
- Help center and API docs are external services. A visual placeholder, static preview or frontend interaction is not evidence of live product/API integration.
- Local preview is not a deployed production site. The existing document intentionally has `noindex,nofollow`.

## Reference evidence

- Live Commslayer homepage, Helpdesk and AI-agent pages checked on 29 September 2026: [homepage](https://www.commslayer.com/), [Helpdesk](https://www.commslayer.com/helpdesk-for-shopify), [AI agent](https://www.commslayer.com/ai-support-agent-for-shopify). The product pages share navigation, product introduction, capability groups, proof and conversion patterns. This is a public-page study, not access to their private repository.
- Existing measured public-source studies: `references/commslayer-exact-tokens.md`, `references/commslayer-replication-spec.md`, `references/slash-attio-audit.md`. Keep source values distinct from Kaching's accepted adaptations.
- Current design file: [Acquisity / Kaching frames](https://www.figma.com/design/YgeSmLq0NmJozYFJ3fv5QB/Acquisity). Main app-hero reference: `2061:15020`. Earlier desktop/mobile component nodes remain recorded in code comments.
- Wireframe/research file: [Kaching Web](https://www.figma.com/design/1y0LtycVRxOxBJJTL0knEs/Kaching-Web). Wireframe placement is not blanket approval for its visual styling.

## Validation before calling a page ready

Run `npm run check` and `npm run build`. Inspect narrow phones, wider phones, tablet and desktop. Verify no horizontal overflow, unloaded assets, hidden required content or cramped action labels. Exercise menu open/close, app links, keyboard navigation, FAQ, pricing controls and reduced motion. In a headless production build, scroll each route to the bottom with the wheel at 1440 and 390 (with and without reduced motion) and confirm no console errors or failed requests, every `[data-reveal]` visible and visible dither surfaces on `data-renderer="webgl"`. The in-app browser pane is hidden, so its IntersectionObservers never fire. Check the homepage after extracting shared components. Record what was actually inspected; passing type/build checks does not prove a pixel-perfect match.

## Subscriptions implementation extension

`src/pages/apps/subscriptions.astro` mounts the shared `ProductAppPage` with `getProductPage('subscriptions')` (`SubscriptionsPage.tsx` is a compatibility export; see `APP-PAGES.md`); its scoped CSS is `src/styles/app-page.css`, with tier data in `src/lib/subscriptions.ts`. `app-page/AppPagePrimitives.tsx` composes existing control styles with shared reveal/heading/empty-visual components. The page uses the existing yellow app palette and real8tier price data. See`SUBSCRIPTIONS-HANDOFF.md` for full structure and evidence. `SiteFooter` now accepts palette/appName/reviewsUrl/isAppPage. `MerchantTestimonials` accepts app-specific review data/count/name. The same homepage defaults remain in use.


### App-page refinement rules

Use the short app identity in the hero (e.g. “Subscriptions”), title-case the app headline, and prioritize the trial note over an extra star rating. Keep reviews in their dedicated proof section. Step explainers keep the original two-column layout (steps left, 1.47 dither-framed visual right); the active step sits on a white card with an app-colour progress line, a seven-second automatic cycle and click/arrow-key control. Pause on keyboard focus inside, hovering the stage, touch on the mobile tab row, offscreen, document hidden and reduced motion. Secondary features put a semantic Lucide icon in a 40px rounded neutral box above the title. Migration reuses the homepage team composition before updates. Pricing keeps its white plan panel readable inside app-coloured dither; tier data remains in `lib/subscriptions.ts`. Adjacent sections must have one horizontal divider, with dark rails inside dark sections.

Homepage app order: Bundles → Cart → Subscriptions → Post Purchase → Popup → Email. `appsInDisplayOrder` in `src/lib/design.ts` supplies the hero pills, app catalog, navigation and footer. Keep the source `apps` array stable for existing app-specific index references. Catalog descriptions use app IDs so reordering cannot detach copy from its app. Hero keyboard selection and navigation selection use the shared display order.
