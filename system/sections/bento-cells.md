# Bento cell visuals (C01-C28)

How to build each visual type that goes inside a bento tile. Use this file with `knowledge/web/bento.md` (rules BE-01..32, which pick the type) and `knowledge/web/bento-craft.md` (tile anatomy and recipes R1-R13: shell, fragment plus mask, ghost stack, chart, hub, palette, globe, code, before/after, sequenced reveal, keycap, marquee, glow). This file points to those recipes rather than repeating them. The stack is React + Tailwind v4 + `motion/react`. Swap the colours for the bound system's role tokens.

Every entry gives: **Spec** (measured), **Build** (how), **Amateur** (the version to avoid), **Refs** (files in `knowledge/benchmarks/bento/`). One type per tile. Adjacent tiles never share a type, and a grid of 5+ tiles uses at least 4 types (BE-18).

## Shared pieces

These pieces are used by several types below.

```tsx
// Two-tone sentence title (BE-13): claim in ink, continuation in ~58% ink. Ramp 24/400, Notion 22/700.
export const TileTitle = ({ lead, rest }: { lead: string; rest?: string }) => (
  <h3 className="max-w-[26ch] text-[24px] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
    {lead}{rest && <span className="text-ink/55"> {rest}</span>}
  </h3>
)

// Corner affordance (BE-12): one 16px arrow in a 32px button, nudges on tile hover.
export const TileArrow = () => (
  <span className="absolute right-6 top-6 z-20 grid size-8 place-items-center rounded-[8px] bg-white shadow-[0_0_0_1px_oklch(0.2_0_0/.08)]">
    <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]
      group-hover/tile:translate-x-[2px] group-hover/tile:-translate-y-[2px]"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
  </span>
)

// Stripe-style growing tile (BE-25): at rest the visible tile is inset 4px; on hover it grows into its gutter.
// No transform, no reflow. Put the grid gap at ~5px so the visible gutter at rest is ~13-14px.
export const GrowTile = ({ r = 6, children }: { r?: number; children: React.ReactNode }) => (
  <div className="group/tile relative">
    <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-[250ms] group-hover/tile:opacity-100
      [background:conic-gradient(from_180deg,var(--accent),transparent_40%,var(--accent))]" style={{ borderRadius: r }} />
    <div className="relative h-full overflow-hidden bg-surface transition-[clip-path] duration-[800ms] ease-[cubic-bezier(.165,.84,.44,1)]
      [clip-path:inset(4px_round_var(--r))] group-hover/tile:[clip-path:inset(0px_round_var(--r))]"
      style={{ ['--r' as any]: `${r}px` }}>{children}</div>
  </div>
)
```

---

## C01 Live UI fragment (cropped)

- **Spec** A real screen region at true app scale: 9-15px text, 28-40px controls (Stripe 9-15, Ramp 13-15, Notion 14, Framer 12). It is larger than the tile and cropped by at least one edge: Ramp's invoice runs off the bottom and right, Notion's window starts 109px down a 560px tile and loses 128px.
- **Build** bento-craft R2 (oversized fragment plus mask). Anchor to the left or bottom edge. Give it one selected row, one status chip and one live value. Use one window chrome style across the grid (3 traffic dots at 30% ink plus a centred URL pill, as Stripe and Ramp do).
- **Amateur** A complete mini dashboard shrunk to fit, with 6px text and a margin on all four sides.
- **Refs** ramp-platform-2plus3.png, stripe-flexible-6col.png, notion-ai-2plus1plus5.png

## C02 UI plus floating overlay (the hero composite)

- **Spec** A main surface plus one overlay that shows the action: Notion's recording pill (`Technical Design Revi…` with a waveform and pause/stop) over a Meetings table; an "ask" bar over a dashboard; Ramp's two chat bubbles ("We're grabbing your receipt… no action from you!" then "Receipt added… Matched to 'Tooling'") over the black card. The overlay is 1.2-1.5x the UI scale, white, with a 1px 8% ring and a 0 8px 24px -12px shadow.
- **Build** Absolutely position the overlay so it crosses the surface's edge by 20-40px. Reveal it in view (opacity plus `y: 8`, 0.5s) after the surface. A second overlay arrives 0.6s later (bento-craft R10 timing).
- **Amateur** A toast pasted in the tile corner with no relation to the screen behind it.
- **Refs** notion-ai-2plus1plus5.png, ramp-platform-2plus3.png

## C03 Chat or agent thread

- **Spec** 2-4 messages at 13-15px with avatars of 24-28px, real timestamps, one agent message in a tinted bubble, and a composer with a blinking caret (Linear: caret blink 1.25s; `@Linear` chip in the composer). Notion's Coding Agent and Plain's Ari use a bot name plus an "AI agent" chip.
- **Build** A list of messages and a composer. Animate the last message by typing (bento-craft R6) or a sequenced reveal (R10). Use real-looking names and specific content ("Fix the dimmed ride rows that never reset").
- **Amateur** Grey skeleton bars as messages, or the words "AI is thinking…" with a sparkle icon.
- **Refs** linear-intake-unboxed.png, plain-agents-1plus3.png, notion-ai-2plus1plus5.png

## C04 Single figure

- **Spec** 48/600 at -0.144px (Apple), 54/500 at -2.16px (Framer). A small unit line above ("Up to", 19/600 grey) and a qualifier below (19/600 `#86868b`). Centred in a spec grid, left elsewhere. At most one per grid outside L01 (BE-17).
- **Build** Use `font-variant-numeric: tabular-nums`. Count up once on in-view (0.8-1.2s ease-out), and show the final value under reduced motion.
- **Amateur** Four figure tiles in a row ("2TB", "1,600", "12K", "25M") over purple glows.
- **Refs** apple-iphone-upgrade-3x2.png, framer-bento.png

## C05 Figure with an inline glyph

- **Spec** The figure carries an inline object as part of the line: Apple "22 more hours" plus a green battery glyph about 0.7em tall, and a green lightning bolt above "50% charge". The glyph takes the single accent colour.
- **Build** `<span class="inline-flex items-center gap-[0.15em]">22 more hours <BatteryGlyph class="h-[0.7em]"/></span>`. Use a Lucide/Phosphor glyph or a supplied asset, never a hand-drawn path (founder rule). The fill animates from 0 to full on in-view.
- **Amateur** An emoji next to the number.
- **Refs** apple-iphone-upgrade-3x2.png, apple-watch-upgrade-3x2.png

## C06 Product photo bleed

- **Spec** A studio product photo flush to the tile edge: Apple's iPhone back is a 337x195 picture flush with the bottom of a 337x300 tile; Watch photos run 336x185 at the bottom or 337x180 at the top. The caption sits on the other side.
- **Build** `<picture>` with AVIF/WebP at 2x, `object-fit: cover`, anchored with `absolute inset-x-0 bottom-0`. The tile fill matches the photo's backdrop exactly (Apple uses #000 on #000), so the edge disappears.
- **Amateur** A cut-out product floating in the middle with a drop shadow on a mismatched background.
- **Refs** apple-iphone-upgrade-3x2.png, apple-watch-upgrade-3x2.png

## C07 Hero render on a glow

- **Spec** One rendered object at 140-220px with a soft rim light: Apple's A20 chip is 148px with a light edge; Spline's black cube sits on an isometric floor with RGB axis handles; Lovable's centre app icon glows in brand colour.
- **Build** A pre-rendered PNG/WebP (or a Spline/Rive export with a poster). The glow is a `radial-gradient` at most 40% opacity under the object, not behind the copy. Allow one slow idle motion (rotate 6deg over 8s) in view only.
- **Amateur** A generic glass orb or abstract blob that is not the product.
- **Refs** apple-iphone-upgrade-3x2.png, spline-agentic-brick.png, lovable-tabbed-stack-dark.png

## C08 Full-bleed photo plus headline

- **Spec** Apple MBP: a photo fills a 480x401 tile at radius 28; a 40/600 white headline sits at the bottom-left with 40px padding; a 74-106px multicolour line glyph sits above it. A scrim keeps the text at 4.5:1.
- **Build** `img` at `inset-0 object-cover`, plus `linear-gradient(to top, rgb(0 0 0/.55), transparent 60%)` under the copy. Brand glyph from an icon set, tinted with a 2-stop gradient via `background-clip: text` or an SVG `linearGradient`.
- **Amateur** A stock photo with centred white text and a 50% black overlay over the whole image.
- **Refs** apple-mbp-masonry-2col.png

## C09 Photo plate behind an app window

- **Spec** A real landscape, interior or painting behind a floating window: Granola's mountain and sea plates (1280x527 split 900+443, square corners); Cursor's painterly plates (radius 4) with the window on `0 22px 70px 4px rgba(0,0,0,.3), 0 0 0 .5px rgba(0,0,0,.15)` and a right-edge mask `linear-gradient(to right, #000 80%, transparent)`.
- **Build** The plate is an `img` (licensed or generated, tinted toward the brand palette). The window is real HTML at true scale, offset to cross one plate edge. Keep the plate's saturation low enough that the UI stays the brightest object.
- **Amateur** A CSS mesh gradient pretending to be a photo, or a window centred with even margins.
- **Refs** granola-photo-plate.png, cursor-alternating-plates.png, cursor-frontier-3up.png

## C10 Brand gradient field

- **Spec** The brand's own gradient enters from one corner and stays out of the copy area: Stripe's ribbon (orange to pink to violet) bleeds from the bottom-left or top-right of 4 of its 6 tiles; Lovable's radial halo (`radial-gradient(110% 130% at -10% -20%, …)`) used as a mask behind the UI.
- **Build** An absolutely positioned SVG or `img` of the brand gradient ribbon, rotated, with a `mask-image` fade toward the copy corner. Use it in 30-60% of the tiles only (BE-20).
- **Amateur** The same purple-to-blue blob behind every tile and behind the text.
- **Refs** stripe-flexible-6col.png, lovable-platform-3up.png

## C11 Particle or dot field

- **Spec** Thousands of small dots tracing arcs or a sphere at 10-20% ink: Ramp's dotted arcs behind the card and table tiles; Stripe's dot globe (pink-orange-violet dots with one route arc and two endpoint markers); Dub's dotted continent.
- **Build** Pre-render to `<canvas>` once (Ramp ships canvases of 642x482 and 419x524), or to a static SVG of `<circle r="0.8">` points from a sampled path or a d3-geo projection. Allow a drift of 1-2px per second only while in view. Under reduced motion, show a still frame.
- **Amateur** A tiled `radial-gradient` dot pattern with a visible edge (bento-craft 2.6: "dotted panel").
- **Refs** ramp-platform-2plus3.png, stripe-flexible-6col.png, dub-globe-feed.png

## C12 Globe or map with arcs

- **Spec** An orthographic globe as dots or a wireframe, with 1-3 great-circle arcs and endpoint markers: Lovable's wireframe sphere with a pink-to-blue arc; Stripe's dot globe with one arc; Dub's dotted globe with orange event pins.
- **Build** bento-craft R7 (d3-geo, static paths, `pathLength` 0 to 1 over 1.2s on in-view). The sphere rim takes a 1px highlight at the top. Crop the globe by the tile's right or bottom edge.
- **Amateur** A spinning 3D Earth texture with glowing country borders.
- **Refs** lovable-tabbed-stack-dark.png, stripe-flexible-6col.png, dub-globe-feed.png

## C13 Chart with tooltip

- **Spec** Axis ticks, 1-2 series, an area fill fading to transparent, and a tooltip card (Framer: date plus two series values; Ramp Treasury: balance figures above a thin area chart; Stripe: a 30-day usage bar histogram with one tall spike).
- **Build** bento-craft R4. Stripe's usage bars are 3px wide at a 6px pitch in one accent, with the headline number (`1,878,108,957`) above in 12px. Never use `preserveAspectRatio="none"`.
- **Amateur** One smooth curve with a dot and a "+24%" pill.
- **Refs** framer-bento.png, ramp-platform-2plus3.png, stripe-flexible-6col.png

## C14 Funnel or flow chart

- **Spec** Dub: three stages (Clicks 7.2K, Leads 165, Sales $506) as columns. A flowing band narrows from blue to violet to teal, with white percentage pills (100%, 36%, 1.3%) and a 2-tone halo around the band.
- **Build** One SVG path per stage, built from cubic curves between stage heights, filled with a vertical gradient plus a 30%-opacity outer band. The headers are HTML. The selected stage gets a 2px underline.
- **Amateur** A Sankey with 8 colours and no numbers.
- **Refs** dub-tabbed-funnel.png, dub-bento-a.png

## C15 Code or terminal card

- **Spec** 12px mono, line numbers at 30% ink, one highlighted line (bento-craft R8). Retool's terminal is a dark card on a pastel gradient tile, with an orange "Generating…" line and a row of agent icons in a pill above it.
- **Build** Tokenise at build time (shiki). Real commands that parse. Crop at the tile's bottom edge. Stream new lines in on in-view at 40-60ms per line.
- **Amateur** Lorem-style pseudo code, or rainbow-highlighted code with no line numbers.
- **Refs** vercel-bento.png, retool-scroll-stack.png

## C16 Node workflow

- **Spec** 2-5 nodes of 140-220px with 11-13px labels, curved connectors of 1px in accent, ports as 6px circles: Plain's `If/else` node (Priority IS Urgent) branching to "Assign to user" and "Assign to agent" (the active branch has an accent border); Retool's diamond MCP connector between a dashboard and a terminal.
- **Build** HTML nodes plus one SVG overlay for the connectors. Connectors end at port centres and never cross labels (bento-craft 2.6). Highlight the taken branch. A comet dot travels the active path over 1.2s, once per view.
- **Amateur** Icon-in-circle nodes with dashed lines going nowhere.
- **Refs** plain-agents-1plus3.png, retool-scroll-stack.png

## C17 Integration hub with empty slots

- **Spec** Marks of 32-48px in uniform 56-80px cells around a hub: the Lovable app icon glowing in the centre of a 7x5 grid that dims toward the edges; Lindy's mascot medallion over a grid with hatched empty corner cells; Plain's dashed empty slot "YOUR AGENT HERE"; Ramp's cloud fading to about 10% at the rim.
- **Build** A CSS grid of equal cells, with marks from simple-icons or supplied SVGs. Opacity falls off radially: `opacity = 1 - min(1, d / rMax) * 0.85`. Hatched cells use `repeating-linear-gradient(135deg, ink/6% 0 1px, transparent 1px 6px)`. Pair it with bento-craft R5/R12 for a moving version.
- **Amateur** A full wall of 30 equally bright logos, or hand-drawn brand marks.
- **Refs** lovable-tabbed-stack-dark.png, lindy-scrolly-numbered.png, plain-dashed-3x2-dark.png, ramp-platform-2plus3.png

## C18 Action-chip cluster

- **Spec** 4-6 chips at 14-15px with leading icons, in brand-accent fills, laid in 2 offset rows with dashed empty chips at the row ends (Plain: "Summarize thread", "Send docs", "Diagnose issue", "Draft reply").
- **Build** Flex rows with `gap-2`. The chips are real buttons sized to the system's xs/sm button. The empty chips are `border border-dashed border-accent/40`. Mask the cluster's left and right edges so rows look endless.
- **Amateur** Pastel pills with emoji and random colours.
- **Refs** plain-dashed-3x2-dark.png

## C19 Object render (card, chip, badge)

- **Spec** A physical object rendered with light: Ramp's black metal card with engraved diagonal lines, cropped by the tile bottom; Stripe's gradient Visa card (chip plus contactless glyph, white lower half); Mercury's slate virtual card with a blurred stack behind it.
- **Build** Use a rendered image when possible. A CSS build needs 4 parts: a base gradient, a `repeating-linear-gradient` for texture at 4-6% ink, an `inset 0 1px 0 rgba(255,255,255,.12)` top light, and a 0 24px 48px -24px shadow. Logos come from supplied files.
- **Amateur** A flat rounded rectangle with "**** 4242" and a gold square.
- **Refs** ramp-platform-2plus3.png, stripe-flexible-6col.png, mercury-media-caption-2x2.png

## C20 Device mockup

- **Spec** A phone or terminal with real UI inside, cropped by the tile: Cursor's phone (radius 44 bezel, 300x650) showing "All Repos" rows with a 3.1s "Working" shimmer; Stripe's POS terminal at €26.89 in front of the checkout.
- **Build** The bezel is a rounded div with a 4-6px dark ring (not an image) and the screen is real HTML. Crop at least 25% of the device. Use one device per grid.
- **Amateur** A full iPhone PNG with a screenshot pasted in, centred with margins.
- **Refs** cursor-frontier-3up.png, stripe-flexible-6col.png

## C21 Isometric line drawing

- **Spec** Linear's FIG 0.1-0.3: 1px strokes at about 25-35% white on `#08090a`, 265-304px drawings (stacked plates with a disc, clustered cubes, a fan of cards), and a `FIG 0.N` label in 12px mono at the top. Kargul uses Rive artboards. Spline uses an isometric floor grid at about 6% under its 3D objects.
- **Build** An authored SVG (exported, light and dark variants, bento-craft 2.5). Use one projection and one stroke weight across all figures. Small filled details (a 6x6 dot grid on a cube face) make it read drawn, not generated.
- **Amateur** Isometric icons from a stock pack in different stroke weights and colours.
- **Refs** linear-fig-triptych.png, kargul-services-bento.png, spline-agentic-brick.png

## C22 Compliance seal cluster

- **Spec** 3-4 round seals of 88-96px (ISO 27001, SOC 2 Type II, GDPR, AIUC-1), each a dark disc with a 1px gradient ring, mono type, and star dots for GDPR. They hang on 1px dashed verticals and sit over a bottom blue-pink glow (Lovable).
- **Build** A badge component with the text in mono at 11-22px. Use only certifications the client actually holds (CLAUDE.md honesty rule; otherwise use C17 or C16 instead).
- **Amateur** Shield icons with checkmarks and the word "Secure".
- **Refs** lovable-tabbed-stack-dark.png

## C23 Icon plate

- **Spec** Cal: a 64x64 plate at radius 12, `#f5f5f5`, with 4 corner "screws" (2px dots at 25% ink, 6px in), shadow `0 1px 5px -4px rgba(19,19,22,.7), 0 0 0 1px rgba(34,42,53,.1)`, and a 28px filled glyph. Notion uses illustrated 40px icons. This is used only in catalogue tiles (L14).
- **Build**
  ```tsx
  const IconPlate = ({ icon }: { icon: React.ReactNode }) => (
    <div className="relative grid size-16 place-items-center rounded-[12px] bg-[#f5f5f5]
      shadow-[0_1px_5px_-4px_rgba(19,19,22,.7),0_0_0_1px_rgba(34,42,53,.1)]">
      {[["left-1.5 top-1.5"], ["right-1.5 top-1.5"], ["left-1.5 bottom-1.5"], ["right-1.5 bottom-1.5"]].map(([p]) =>
        <span key={p} className={`absolute ${p} size-[3px] rounded-full bg-black/25`} />)}
      <span className="size-7 text-ink">{icon}</span>
    </div>
  )
  ```
- **Amateur** A colourful icon in a tinted circle inside every main-grid tile.
- **Refs** cal-icon-tiles-4x2.png, notion-ai-2plus1plus5.png

## C24 Video poster loop

- **Spec** An mp4 or webm loop of real product use (Plain: a 793x480 wide tile; Spline: tiles of 596x400 and 460x400; Mercury: tiles with a 32px play button at the bottom-left). The poster frame reads alone.
- **Build** `<video muted playsInline loop preload="metadata" poster=…>` that starts in view and pauses out of view. Keep a visible pause control (BE-27). Under reduced motion, show the poster. Use one compression budget per tile (under 1.5MB).
- **Amateur** Autoplaying video with sound, or a screen recording of a cursor wandering.
- **Refs** plain-agents-1plus3.png, spline-agentic-brick.png, mercury-media-caption-2x2.png

## C25 Live counter plus event feed

- **Spec** Dub: three mono counters in brand orange (LINKS CREATED 243,239,149 / EVENTS TRACKED 4,151,225,464 / REVENUE TRACKED $2,530,996,022.66), uppercase 14px labels, a dotted globe with pins, and a vertical feed of event cards ("New sign up ****@acme.com", "New click Indonesia · Mobile", "New sale $9.09") that fades out at the bottom.
- **Build** Counters tick with `requestAnimationFrame`, adding a plausible per-second rate. Feed items enter at the top every 1.6-2.4s (y: -8 to 0, opacity 0 to 1, 0.4s). The column carries `mask-image: linear-gradient(#000 60%, transparent)`. Pause when out of view. Label the figures as illustrative unless they are the client's real numbers.
- **Amateur** Fake "1M+ users" in a 64px gradient numeral.
- **Refs** dub-globe-feed.png

## C26 Selector or state control

- **Spec** A real control open mid-use: Cursor's model picker (Auto Suggested, a list of 7 models, a checkmark on the selected one, 13-15px rows); Apple's compare selector re-filling the whole grid; Ramp's category/department/location selects inside the invoice.
- **Build** A static open dropdown or a working one. Selected row: `bg-ink/5` plus a check icon. The tile hover can move the highlight down one row (0.15s). Keep it at true control height (28-36px rows).
- **Amateur** A giant toggle switch as the whole visual.
- **Refs** cursor-frontier-3up.png, apple-iphone-upgrade-3x2.png, ramp-platform-2plus3.png

## C27 Skeuomorphic key or object

- **Spec / Build** Use bento-craft R11 (Raycast keycap: radial face, multi-ring shadow, press transition 0.2s) and the Clerk passcode keys. Use one object family per tile, at 100-140px.
- **Amateur** Neumorphic soft buttons.
- **Refs** raycast-bento-b.png, clerk-bento-a.png, hover-raycast-hotkeys.png

## C28 People or portrait grid

- **Spec** Uniform portrait cells of about 80x94 with consistent crop and tint (Clerk Custom roles). Linear's chat uses 28px real avatars. Granola's video-call grid of 6 people sits inside a call window.
- **Build** `img` in equal cells with `object-cover`, tinted with a shared `mix-blend-mode: luminosity` overlay where the palette needs it. Use consented or licensed portraits only.
- **Amateur** Cartoon avatars or emoji faces, or mismatched stock headshots.
- **Refs** clerk-bento-b.png, granola-photo-plate.png, linear-intake-unboxed.png

---

## Picking types per tile (worked example)

A 5-tile L03 for a finance product (from Ramp's grid): lead A = C02 (card plus narrating bubbles) on a C11 field; lead B = C01 (invoice form with selects, C26 inside); support 1 = C01 table (different construction from lead B: rows, not a form); support 2 = C13 treasury chart plus approval row; support 3 = C17 integration hub. That is 4 distinct types, a material field in 2 of 5 tiles, and one accent.

A 6-tile L01 spec grid (from Apple): row 1 C06, C07, C05; row 2 C05, C06, C07. The two figure tiles sit diagonally, so no two share an edge.
