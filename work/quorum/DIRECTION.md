# Quorum: direction

**Brief:** founder 2026-10-15: "design me a light mode cool hero section of something", for an X post (a high-quality still). Quorum (fictional) turns customer interviews into tagged quotes and insights. Audience: product teams. The one action: start free. Proof: one interview with its quotes already highlighted and grouped into an insight. Sample data.

## Class and references
- **Class:** product proof, using Kestrel's centred light composition (the engine's accepted top-tier build).
- **Type, lightness, spacing:** from Kestrel (the founder: "the way you did the font, lightness, spacing and professionalism").
- **Product grammar:** affectUI/AlignUI light. Grey tray + white card, 1px rings, concentric radii.

## Variety
<!-- variety: layout=annotated-document nav=G09 button=arrow type=soft-serif palette=light system=ledger -->
- **override: type soft-serif.** Use the Inter display cut (Kestrel's loved tuple), because the founder rejected serif SaaS heroes (Quillwork) and asked twice for Kestrel's type.
- **override: layout annotated-document.** Use Kestrel's centred product-led layout (the founder's default SaaS hero rule). The "annotated document" idea lives inside the product instead: a transcript with highlight marks.
- **override: system binding.** Kit tokens (Kestrel light).

## Founder-rule checklist (targets, measured before showing)
1. **Headline:** Title Case, no full stop, two lines max, 3-5 words with an idea: "Turn Interviews / Into Answers". Inter display (opsz) 72/550/-0.045em/1.04, one colour.
2. **Room:** no chip above the headline; h1 top 80-90px under the nav.
3. **Subtitle:** 18/28, two hand-set balanced lines.
4. **CTAs:** pills built from the product's own buttons, 44px (ink pill + white ring pill). The secondary is text only.
5. **Gap:** >= 64px from the CTAs to the product frame (measured).
6. **Nav:** Kestrel: logo left, grey track with a white sliding pill centred, Sign in text + an ink pill right; links 36px tall in a 44px track.
7. **Background:** rails at 120/1320 with a dot grid only between them, faded behind the headline. No glows.
8. **Product:** one view at hero scale, Lucide icons, single 1px rings (no ring + inset doubles), concentric radii, squircles, sample data labelled.
9. **Fold:** the product dissolves at the fold; one Kaching-token load-in.
10. **X export:** 2880x1800 (2x) and 3840x2400 (4K) stills; a plain light canvas, no device frame.

## v2 (current): "highlighted transcript", hero only
Founder on v1 (2026-10-15): "identical in style and everything to the other one... create something new with different layouts, textures, maybe shaders, buttons effects nicer", and "JUST THE HERO". v1 (Kestrel grammar + full page) is kept in `Sections.tsx`/`ui.tsx` as negative evidence; `App.tsx` renders only `Hero.tsx`.
- **Layout:** editorial split. Copy column x 96 w 580 on warm paper (#f6f5f1 + film grain), with three spec cells at the bottom. A paper-shader stage (x 704, r28) bleeds off the right and bottom edges.
- **Signature visual:** a live WebGL halftone waveform of one interview (`VoiceField.tsx`). Its highlighted spans light up in their tag colours, with timestamp flags under each. A tilted transcript sheet and an insight card float on the stage.
- **Type:** Inter Tight 450/86/-0.04em. "Answers" is set in Instrument Serif italic over a highlighter swipe. **override:** the one-family headline rule, because the highlight is the product's verb; the fallback is `?font=` plus an all-grotesk headline.
- **Nav:** text-only, with tag-colour dots and a "Start free ↗" text link. No pill track.
- **Buttons:** a lamp-lit ink key (r14) with an arrow block and a shine sweep. The secondary is a text link with a hairline that draws in.
- **Logo:** a traced Pinterest mark (`brand/ref/SOURCE.txt`, `brand/quorum-mark.svg`).
- **Research:** `knowledge/web/light-hero-grammars.md`.
- **Stills:** `shots/quorum-hero-x-2x.png` (2880x1800) and `shots/quorum-hero-x-4k.png` (3840x2400), via `node work/quorum/fold.mjs`.

## v3 (current): v2 with a professional visual
Founder on v2: "not professional enough, especially the visual and the little three cards; the nav with circles is kinda cool". The art panel is now an engraved sound landscape (`Engraving.tsx`, five audio-envelope ridges hatched in slate on cream). On it sits one straight interview window: a scrubber whose highlight ranges sit at their real timestamps, a playhead in the import highlight, the transcript with marks, and a highlights list. One status bar ("Grouping highlights") floats above. The tilted sheet, flag chips and halftone are gone (`VoiceField.tsx` is kept as v2 evidence). The grain sits under the stage so the product stays pure white.
