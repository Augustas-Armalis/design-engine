---
source: web:https://ui.aceternity.com/llms.txt ; https://ui.aceternity.com/llms-full.txt ; https://ui.aceternity.com/registry/*.json
chapter: Aceternity UI animated marketing components: effect vocabulary, defaults, cliché audit
pages: n/a (web sources, fetched 2026-10-08)
topic_tags: [motion, marketing, effects, ai-cliche, scroll, 3d, reduced-motion, landing-page]
status: studied
---

# Aceternity UI

Machine profile: `system/systems-research/aceternity-ui.json`. Raw fetches: `corpus/web/systems/magic-ui-aceternity/` (aceternity-llms.txt, aceternity-llms-full.txt, ac_*.json for text-generate-effect, moving-border, aurora-background, lamp, spotlight-new, hover-border-gradient). Licence (from llms-full.txt header): free for unlimited personal and commercial projects; reselling or redistributing as a competing library not permitted; full terms at ui.aceternity.com/licence (not read). Pro blocks/templates commercial. Companion: `magic-ui.md`.

## 1. Core ideas

1. **Cinematic dark-first effects.** 112+ free components (Tailwind + Motion), 180 pro blocks, 17 templates. No tokens; colours inline.
2. **What it standardises beyond Magic UI:** scroll-linked 3D (Container Scroll Animation, Macbook Scroll, Hero Parallax, Sticky Scroll Reveal, Tracing Beam), light sources (Lamp, Spotlight, Spotlight New, Aurora Background, Background Beams, Background Gradient Animation, Wavy Background, Vortex, Shooting/Glowing Stars, Meteors, Sparkles), cursor/hover tricks (3D Card, 3D Pin, Direction Aware Hover, Evervault Card, Card Spotlight, Following Pointer, Glare Card, Wobble Card, Lens), text (Flip Words, Typewriter, Text Generate, Encrypted Text, Colourful Text, Hero Highlight), navigation (Floating Navbar, Resizable Navbar, Floating Dock, Notch), shaders (Dither, Cloud, Chromatic Image).
3. **Defaults:** TextGenerateEffect 0.5s per word with blur filter; Lamp delay 0.3s, duration 0.8s, easeInOut, conic cyan-500 light widening 8rem -> 16rem in view; MovingBorder 3000ms per lap, radius 1.75rem; SpotlightNew 7s loop, 1.5s easeInOut; HoverBorderGradient 1s per step linear; Aurora uses blue-300/400/500, indigo-300, violet-200 with 10px blur.
4. **No reduced-motion handling** in the 6 sampled sources.
5. **Strongest cliché load of any library studied.** Lamp, spotlight, aurora, background beams, meteors, sparkles, moving borders and the "3D tilted dashboard rising on scroll" are recognised shorthand for template AI landing pages.

### Cliché audit [engine note]

| Ban by default | Salvageable idea |
|---|---|
| Lamp, Spotlight(s), Aurora, Background Beams (+collision), Gradient Animation, Vortex, Wavy, Meteors, Sparkles, Shooting/Glowing Stars | Container Scroll Animation: product screen tilts flat on scroll, if the screen proves a workflow; drop the glow ground |
| Moving Border, Hover Border Gradient, Glowing Effect | Sticky Scroll Reveal: text steps paired with a sticky product state; a real explanatory device |
| Evervault/Glare/Wobble/3D cards on feature grids | Compare (before/after slider) when both images are real |
| Flip Words / Typewriter headlines | Timeline for genuine changelog/roadmap |
| Floating Dock, Floating Navbar glass pills | Text Flipping Board (split-flap) for a brand whose world is transit/time |

## 2. Rules

- **RULE** Do not use decorative light sources (lamp, spotlight, aurora, beams, meteors, sparkles, stars) as hero backgrounds unless the brand's world literally is light or sky, and record the override.
  **Why** These are the most recognisable AI-landing clichés and replace a concept with atmosphere.
  **Applies to** landing page. **Check** hero has no blurred gradient layer >= blur 24px or animated beam/star canvas. **Source** ui.aceternity.com/llms.txt catalogue + knowledge/web/anti-ai-slop.md

- **RULE** Use scroll-linked 3D only to reveal a real product state, keep the transform under ~20deg and complete it within one viewport of scroll.
  **Why** The device proves product when the screen is real; long or extreme transforms read as showreel and cause motion sickness.
  **Applies to** landing page. **Check** visual + reduced-motion fallback shows the flat final frame. **Source** [engine note] from container-scroll-animation / macbook-scroll descriptions

- **RULE** Never rotate headline words (Flip Words, Typewriter) for the main claim.
  **Why** The visitor reads a different headline depending on timing; the claim must be one sentence that holds still.
  **Applies to** landing page. **Check** `h1` text content constant over 5s. **Source** [engine note]

- **RULE** Word-by-word text generation at 0.5s per word with blur is too slow for headlines longer than five words; cap total reveal at 1s or skip it.
  **Why** Reading speed is ~4 words/s; slower reveals make the visitor wait for the claim.
  **Applies to** landing page. **Check** total entrance time of h1 <= 1000ms. **Source** ac text-generate-effect default duration 0.5

## 3. Numbers & scales

| Component | Defaults |
|---|---|
| TextGenerateEffect | duration 0.5s, filter (blur) true |
| Lamp | delay 0.3s, duration 0.8s, easeInOut; width 8rem -> 16rem and 15rem -> 30rem whileInView; blur-md..3xl layers; cyan-400/500 |
| MovingBorder | borderRadius 1.75rem, duration 3000ms |
| SpotlightNew | translateY -350, width 560, height 1380, smallWidth 240, duration 7s, xOffset 100 |
| HoverBorderGradient | duration 1s, clockwise, linear |
| AuroraBackground | blue-300/400/500, indigo-300, violet-200, blur 10px, radial mask on |

Catalogue size: 112+ free components, 180 pro blocks, 17 templates, 23 pro components (llms.txt "Quick Stats").

## 4. Dos and Don'ts

- Don't: glowing purple/cyan ground + gradient headline + tilted dashboard: the full cliché stack.
- Do: if a scroll device is used, make the product screen the only moving thing.

## 5. Exceptions & judgement calls

- [engine note] For an AI product whose concept is literally "illumination" or "night sky", one light effect can be the concept; still give it a brand-specific palette and a static reduced-motion frame.

## 6. Figures worth keeping

- none captured (animated demos).

## 7. Open questions

- Licence page itself not read; summary from llms-full.txt header.
- Only 6 registry sources sampled for defaults and reduced motion.
