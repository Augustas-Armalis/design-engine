# Product-hero kit

The craft layer behind **Kestrel**, the first build the founder called "top tier quality with animations" (accepted, `knowledge/engine-accepted/kestrel/`, commit `61b7969`). It packages what made Kestrel feel finished so every new brand starts at that floor, then diverges on purpose.

Start a build: `node tools/new_build.mjs <name> --system <slug>` (copies `template/`, binds the compiled house system, writes a DIRECTION.md stub, installs deps).

## What the kit gives you (keep)

| piece | file | what it guarantees |
|---|---|---|
| Motion tokens | `src/motion.ts` | Kaching's shipped curves and timings: `ease.reveal` 1.2s travel + 0.9s fade, 70ms stagger, `outQuint` 220ms controls, `link` count-ups |
| `Word` | `src/kit.tsx` | headline words rise out of a 6px blur, 70ms apart |
| `Reveal` | | any block arrives on the timeline (blur only on text) |
| `Stage` | | the product window lifts from 97% and rises, fades in fast |
| `Frame` | | double-bezel product frame, concentric radii (outer = inner + pad) |
| `PillNav` | | link track with a white pill sliding to the hovered link (`layoutId`), 36px items |
| `Segmented` | | equal-width slots, labels centred both ways, sliding pill, 32px = neighbouring icon buttons |
| `CountUp` | | numbers settle up from 60% on `ease.link` |
| `RollingNumber` | | NumberFlow-style: each digit rolls up in its own masked slot (45ms stagger), symbols stay still, later changes roll only changed digits; the founder's preferred number motion (Ferry hero). Prefer it over `CountUp` for KPIs and stats |
| `Route` | | a line draws to an edge, its endpoint lands when it arrives, then pulses, then a comet loops |
| `FloatTile` | | icon tiles rise, bob gently, straighten on hover |
| `Rails` | | rails draw down, hairline draws out, registration nodes land |
| CSS layer | `src/index.css` | brand-layer variable names (`--canvas --ink --sub --soft --line --rail --weak --track --accent`, `--shadow-ring/tile/frame`), fancy ink + white buttons |

## The timeline discipline (non-negotiable)

0. **The kit stagger is a tool, not the default.** Founder on Nocturne: repeating "everything loads in" on every brand is "noobish". Each brand gets one conceptual reveal tied to its idea; copy is readable by ~300ms unless the concept needs a reveal; at most 2-3 entrance groups, settled by ~1.2-1.5s. `Word` (word-by-word blur) is for one brand at a time, never by reflex.

1. One `T` object holds every entrance time; every delay is derived from it.
2. Order: frame lines, nav (logo, track, actions), headline words, subtitle, CTAs, stage, stage contents in reading order (sidebar, header, KPIs, chart, side panel), decorative tiles, routes, landing dots.
3. Nothing is visible before its moment. Loops (pulses, comets, floats) start only after their element's entrance, and every looping keyframe array starts at opacity 0 (Framer Motion paints the first keyframe during the delay; Margin build 1 showed a static red dot from page load).
4. Hovers slide (shared `layoutId`) and only on real pointers (`@media (hover: hover)`, `pointerType === 'mouse'`); presses use `.press` (scale 0.98, 160ms; 0.97 is fine for dense app buttons); no lift on primary buttons; nothing ever animates from `scale: 0` (start at 0.5-0.95 with opacity 0).
5. `MotionConfig reducedMotion="user"` plus `useReducedMotion()` to drop loops AND blur/travel (MotionConfig does not cover `filter`). Polish rules from `knowledge/web/skills-better-ui-and-emil.md` (94 rules) apply to every build.
6. Nothing transparent sits above interactive elements: positioned headers get `z-40`; full-width text wrappers get `pointer-events-none` with `[&>*]:pointer-events-auto`. `check.mjs` fails `interaction.blocked-targets` otherwise.

## What must change per brand (diverge)

The founder rejects sameness ("too alike the project we just did"). Per brand, change at least: palette and neutral temperature (house system), type voice, the product world (what UI proves the product), the signature visual (Kestrel's is data-source tiles + routes; pick another from `knowledge/web/art-direction-moves.md`, Heckel/Comeau recipes, or the product itself), and one of nav or CTA construction. Record it in the DIRECTION.md divergence table against Kestrel.

## Kestrel's accepted numbers (reference, measured as rendered)

- Canvas `#f7f7f7`, ink `#171717`, sub `#5c5c5c`, soft `#737373`, accent `#335cff`; Inter Variable (opsz) 550, h1 72/1.04, -4.5%.
- Nav: 44px track, 36px links r10, 40px buttons r12; h1 top at 150px (~85px air under the nav); no chip above the h1.
- CTAs 44px r14 (fancy ink + white, secondary text-only).
- Product radius ladder: 8 (sidebar items, badges, inner segments, tooltip) / 12 (32px controls, small buttons, inputs) / 16 (cards, bubbles, app) / 22 (outer frame).
- Dot grid 16px only between the rails, faded behind the headline. Dashboard top at 476px, 1136px wide, cut by the fold with a 56px fade.

## Measuring overlays (connectors, callouts) inside animated stages
Measure anchor points with layout offsets (`offsetLeft/offsetTop` summed up to the container), never `getBoundingClientRect` on first render: the stage is still mid-transform (scale 0.97, translateY) and every point lands a few px off. Founder caught Margin's note dots sitting above the centre of their code lines.

## Product build-in (founder, Ferry hero round 5)
"Product should load in with stagger and fully load in, plus the numbers count up professionally by sliding up each number." The frame lands first (empty white app), then the whole product builds top to bottom on one `intro` time: sidebar items 25ms apart in parallel with header, tabs, KPI cards (numbers roll via `RollingNumber`, sparks grow from the baseline), the table card, then rows 35ms apart. Done in about 0.9s, and only then does any live story begin. Build the stagger wrapper as a stable module-level component (a wrapper defined inside render remounts and replays on every hover).
