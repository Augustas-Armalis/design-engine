---
source: web:https://magicui.design/llms.txt ; https://magicui.design/r/*.json ; https://github.com/magicuidesign/magicui
chapter: Magic UI animated marketing components: effect vocabulary, defaults, cliché audit
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [motion, marketing, effects, ai-cliche, reduced-motion, springs, landing-page]
status: studied
---

# Magic UI

Machine profile: `system/systems-research/magic-ui.json`. Raw fetches: `corpus/web/systems/magic-ui-aceternity/` (magicui-llms.txt, mu_*.json for blur-fade, border-beam, shimmer-button, marquee, magic-card, number-ticker, text-animate, particles). Licence: MIT. Companion: `aceternity-ui.md`.

## 1. Core ideas

1. **An effect library, not a design system.** 79 components, no tokens, no type/colour/spacing scale; installed through the shadcn registry, props with hex defaults.
2. **What it standardises (families):**
   - Entrances: Blur Fade, Text Animate (by word/char/line), Text Reveal on scroll, Animated List, Typing Animation, Word Rotate, Hyper Text scramble, Morphing Text.
   - Light-on-edges: Border Beam, Shine Border, Shimmer Button, Rainbow Button, Neon Gradient Card, Magic Card (cursor spotlight), Glare Hover, Backlight.
   - Ambient backgrounds: Grid/Dot/Hexagon/Striped Pattern, Animated/Interactive/Flickering Grid, Retro Grid, Ripple, Meteors, Particles, Light Rays, Warp Background, Noise Texture.
   - Proof/framing: Marquee, Number Ticker, Tweet Card, Avatar Circles, Safari/iPhone/Android mockups, Terminal, Code Comparison, File Tree, Globe, Dotted Map, Icon Cloud.
   - Text decoration: Aurora Text, Animated Gradient Text, Animated Shiny Text, Sparkles Text, Line Shadow, Highlighter, Video Text, Comic Text, Kinetic weight, Text 3D Flip.
3. **Defaults are consistent and small:** entrance 0.3-0.4s, 6px offset, 6px blur; text spring stiffness 300 / damping 15; card spotlight springs 250-300 / 30-35; number ticker spring 100 / 60; loops linear (marquee 40s, border beam 6s, shimmer 3s alternate).
4. **No reduced-motion handling** in any of the 8 sampled sources (grep for `prefers-reduced-motion` / `useReducedMotion` = 0).
5. **Cliché status.** The light-on-edges family, gradient text, grid/dot backgrounds, bento grids and logo marquees are the visual signature of 2023-25 AI and dev-tool launch pages; the engine already bans most of them by default (`knowledge/web/anti-ai-slop.md` rows on coloured glow, spotlight/grid backgrounds, auto-marquee).

### Cliché audit [engine note]

| Reads as AI cliché (ban by default) | Usable with care |
|---|---|
| Border Beam, Shine Border, Shimmer/Rainbow/Pulsating Button, Neon Gradient Card | Number Ticker (real, sourced numbers only) |
| Aurora / Animated Gradient / Shiny / Sparkles text | Blur Fade at 0.3-0.4s for one section entrance |
| Grid/Dot/Retro Grid/Flickering Grid, Meteors, Particles, Light Rays, Ripple, Warp | Marquee of real customer logos, slow, pause on hover, static under reduced motion |
| Magic Card cursor spotlight, Glare Hover | Safari/iPhone mockups framing a real product screen |
| Bento Grid of feature tiles with icons | Terminal / Code Comparison for dev tools when the code is real |
| Orbiting Circles / Icon Cloud / Globe as "integrations" decoration | Highlighter (hand-drawn mark) used once on a key phrase |

## 2. Rules

- **RULE** Use at most one ambient or edge-light effect per page, and none from the cliché column without an override in DIRECTION.md.
  **Why** Beams, shimmer, aurora text and grid backgrounds now signal "AI template" and spend attention on decoration instead of proof.
  **Applies to** landing page. **Check** count of animated background/border-light components per page <= 1. **Source** magicui.design/llms.txt catalogue + knowledge/web/anti-ai-slop.md

- **RULE** Section entrances: 300-400ms, translate <= 8px, optional blur <= 6px, once per element, triggered in view.
  **Why** Magic UI's defaults (0.4s, 6px, 6px blur; text 0.3s) are short enough to never block reading; larger offsets read as gimmick.
  **Applies to** landing page. **Check** entrance animation duration 300-400ms and translate <= 8px. **Source** r/blur-fade.json, r/text-animate.json

- **RULE** Every looping or entrance effect must have a `prefers-reduced-motion: reduce` path that renders the final state without motion.
  **Why** The sampled components ship no reduced-motion handling; vestibular-sensitive users get infinite loops.
  **Applies to** all. **Check** with reduced motion emulated, no element has a running animation after load. **Source** [engine note] from grep of r/*.json

- **RULE** Animate numbers only when the number is real, sourced and final; never tick to placeholder metrics.
  **Why** Counting motion draws the eye to the claim; an invented number becomes a highlighted lie.
  **Applies to** landing page. **Check** each Number Ticker value has a source note. **Source** CLAUDE.md principle 4 + r/number-ticker.json

- **RULE** Run marquees slowly (>= 30s per loop), pause on hover/focus, and only for real logos or real quotes.
  **Why** Fast marquees are unreadable; fake logos break the never-invent-proof rule.
  **Applies to** landing page. **Check** animation-duration >= 30s; hover pauses. **Source** r/marquee.json (default 40s, pauseOnHover false)

## 3. Numbers & scales

| Component | Defaults |
|---|---|
| BlurFade | duration 0.4s, delay 0, offset 6px, direction down, blur 6px, inViewMargin -50px |
| TextAnimate | duration 0.3s, by word, fadeIn, startOnView true, spring 300/15 |
| Marquee | --duration 40s, --gap 1rem, repeat 4, pauseOnHover false, linear infinite |
| BorderBeam | duration 6s, size 50, colours #ffaa40 -> #9c40ff, borderWidth 1 |
| ShimmerButton | shimmer #ffffff, size 0.05em, duration 3s, radius 100px |
| MagicCard | gradientSize 200, spotlight #262626 @0.8, gradient #9E7AFF -> #FE8BBB; springs 250-300 / 30-35 |
| NumberTicker | spring stiffness 100, damping 60 |
| Particles | quantity 100, staticity 50, ease 50, size 0.4, colour #ffffff |

## 4. Dos and Don'ts

- Do: Safari mockup around a real screenshot that proves a workflow. Don't: Safari mockup around a stock dashboard.
- Don't: purple-to-orange gradients (Border Beam / Magic Card defaults) as brand colour.

## 5. Exceptions & judgement calls

- [engine note] A deliberately retro or rave brand can use Retro Grid or Particles as its world, if it is the one motion signature and the palette is the brand's, not the defaults.
- [engine note] The springs (300/15 for text) are reusable outside Magic UI as house values.

## 6. Figures worth keeping

- none captured (all demos are animated).

## 7. Open questions

- Only 8 of 79 registry sources sampled; some components may handle reduced motion.
- Magic UI Pro not studied.
