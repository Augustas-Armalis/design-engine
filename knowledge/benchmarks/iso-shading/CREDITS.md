# iso-shading references (captured 2026-10-21)

Study material for the "Shading and colour" section of `knowledge/web/isometric-line-art.md` (ISO-19..). Captured with Playwright from public pages at 1440 CSS px, DPR 1, cropped. Copyright stays with the owners; kept for internal study only, never shipped.

| File | Source | What it teaches |
|---|---|---|
| `ibm-examples.png` | IBM Design Language, Isometric style / Design, https://www.ibm.com/design/language/illustration/isometric-style/design | Full shaded iso sets in light and dark: one hue family per object, translucent tinted panes, dotted connectors, glow emitter, light beams |
| `ibm-volumes-face-ramps.png` | same page, "Volumes" | The canonical three-face ramp per hue (top lightest, lit side mid, shade side darkest with a gradient darker toward the back). Measured purple cube: top oklch 0.75/0.15, right 0.66/0.22, left 0.59 front -> 0.48 back |
| `ibm-cylinder-prism-gradients.png` | same page | Combined primitives (magnifier, book) keep the same ramp; cylinder sides as smooth gradients |
| `ibm-light-shadow-behavior.png` | same page, "Behavior" | Flat hard cast shadow on a grey plate (-0.07 L), translucent tinted cubes (top L0.93 C0.03, sides L0.83 C0.08), dark scene with hard drop shadow (-0.08 L) |
| `ibm-dark-glow-emitter.png` | same page | Dark glow: emitter disc in concentric accent rings (white core -> L0.75 accent), dark accent side, tinted light column (bg +3% accent), dotted accent path |
| `ibm-drawing-dark-laptop.png` | same page, "Drawing" | Construction grid vs finished dark render; accent dots stepping in hue/lightness |
| `workos-dark-chip-glow.png` | WorkOS home, https://workos.com | Dark chip on a circuit field: one emitted teal glow under the object, horizon rim light, everything else navy neutrals |
| `kargul-studio-services-live.png` | Kargul Studio home, https://kargul.studio | Live capture of the monochrome services bento (the founder's loved base style) for comparison with the shaded versions |

Local references measured in the same study (already in the repo): `knowledge/benchmarks/kargul-deep/gallery/chatsheet-01.jpg`, `chatsheet-04.jpg` (tinted side bands, dotted tops, tinted contact shadow, navy-ink disc side), `boomtax-02.jpg`, `boomtax-03.jpg` (neutral grey sides, 1px edge highlight, green glow plates), `lemon-01.jpg` (dark-green box with tint ticks under a white plate), `uplinq-12.jpg`, `uplinq-14.jpg` (dark slabs, cyan payload, top darker than sides), `knowledge/benchmarks/bento/clerk-bento-a.png` (light cone, rim + inner highlight).
