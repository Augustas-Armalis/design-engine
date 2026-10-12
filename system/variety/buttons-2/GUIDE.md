# Buttons II

Founder (2026-10-12): buttons must vary between builds, but "mostly fully round or smoother corners, the effects inside of them, just clean". So the **shape** stays a pill (999px) or a 14-20px smooth corner, and the **effect inside** changes. Use with `buttons-2.css` (vars `--acc`, `--acc-2`, `--ink`, `--canvas`; `.is-hover` shows a hover statically; `[data-theme=light]` for light pages). Specimen: `specimen.png` (open `index.html`).

| # | class | effect | best as | used in |
|---|---|---|---|---|
| 01 | `b2-gloss` | white to ice gradient, lit top edge | primary on cinematic dark | Murmur |
| 02 | `b2-glow` | accent gradient lit from inside | primary on gradient fields | |
| 03 | `b2-rim` | dark glass + gradient rim (mask-composite) | secondary on dark | |
| 04 | `b2-roll` | label rolls up to its twin on hover | primary, editorial/studio | |
| 05 | `b2-tile` | round arrow tile inside the pill, turns on hover | primary or secondary | |
| 06 | `b2-sweep` | soft sheen crosses on hover | primary on light | |
| 07 | `b2-spot` | light follows the cursor inside (`--x/--y`) | secondary, devtools | |
| 08 | `b2-split` | fused action + choice segment | downloads, platform pick | |
| 09 | `b2-app` | smooth-corner statement with an app tile | apps, downloads | Quillwork (rejected page, button fine) |
| 10 | `b2-soft` | tinted accent fill, smooth corners | quiet primary / sales | |
| 11 | `b2-wipe` | hairline pill, fill rises on hover | secondary | |
| 12 | `b2-live` | carries a live state dot | demos, status | |
| 13 | `b2-key` | soft key, presses 1px | light pages, tools | |
| 14 | `b2-beam` | light travels the rim (loops; one per page) | one special CTA | |
| - | `.btn-slide` (Weekline) | slide-swap label + arrow | | Weekline |

**Pairing rule:** primary and secondary come from different effects (e.g. 05 + 03, 01 + 11, 04 + 03, 09 + 06); never two loud effects together. Do not reuse the last two builds' primary effect (founder-taste).

## Announcement pills (optional, never the same twice in a row)

`p2-dot` (status dot), `p2-ver` (mono version chip), `p2-avatar` (brand tile), `p2-shine` (gradient rim + moving text light), `p2-date` (mono date stamp, no container), `p2-link` (underlined link, no container), `p2-glass` (glass + keycap), `p2-tag` (tag + tinted fade). The stock "[New] text →" capsule is the AI tell; vary the construction and make it say something specific.
