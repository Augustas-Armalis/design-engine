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
| `Route` | | a line draws to an edge, its endpoint lands when it arrives, then pulses, then a comet loops |
| `FloatTile` | | icon tiles rise, bob gently, straighten on hover |
| `Rails` | | rails draw down, hairline draws out, registration nodes land |
| CSS layer | `src/index.css` | brand-layer variable names (`--canvas --ink --sub --soft --line --rail --weak --track --accent`, `--shadow-ring/tile/frame`), fancy ink + white buttons |

## The timeline discipline (non-negotiable)

1. One `T` object holds every entrance time; every delay is derived from it.
2. Order: frame lines, nav (logo, track, actions), headline words, subtitle, CTAs, stage, stage contents in reading order (sidebar, header, KPIs, chart, side panel), decorative tiles, routes, landing dots.
3. Nothing is visible before its moment. Loops (pulses, comets, floats) start only after their element's entrance, and every looping keyframe array starts at opacity 0 (Framer Motion paints the first keyframe during the delay; Margin build 1 showed a static red dot from page load).
4. Hovers slide (shared `layoutId`), presses scale to 0.98 in 220ms, no lift on primary buttons.
5. `MotionConfig reducedMotion="user"` plus `useReducedMotion()` to drop loops.
6. Nothing transparent sits above interactive elements: positioned headers get `z-40`; full-width text wrappers get `pointer-events-none` with `[&>*]:pointer-events-auto`. `check.mjs` fails `interaction.blocked-targets` otherwise.

## What must change per brand (diverge)

The founder rejects sameness ("too alike the project we just did"). Per brand, change at least: palette and neutral temperature (house system), type voice, the product world (what UI proves the product), the signature visual (Kestrel's is data-source tiles + routes; pick another from `knowledge/web/art-direction-moves.md`, Heckel/Comeau recipes, or the product itself), and one of nav or CTA construction. Record it in the DIRECTION.md divergence table against Kestrel.

## Kestrel's accepted numbers (reference, measured as rendered)

- Canvas `#f7f7f7`, ink `#171717`, sub `#5c5c5c`, soft `#737373`, accent `#335cff`; Inter Variable (opsz) 550, h1 72/1.04, -4.5%.
- Nav: 44px track, 36px links r10, 40px buttons r12; h1 top at 150px (~85px air under the nav); no chip above the h1.
- CTAs 44px r14 (fancy ink + white, secondary text-only).
- Product radius ladder: 8 (sidebar items, badges, inner segments, tooltip) / 12 (32px controls, small buttons, inputs) / 16 (cards, bubbles, app) / 22 (outer frame).
- Dot grid 16px only between the rails, faded behind the headline. Dashboard top at 476px, 1136px wide, cut by the fold with a 56px fade.
