# knowledge/x INDEX

Notes for planning and writing the founders' X posts ("designs for the day"). Format follows `../SCHEMA.md`. Display sizes, tile crops and the X ranking weights live in `../web/x-design-posts.md` (XP-01..28) and `../../system/variety/x-post-formats.json`; this folder adds cadence, sequencing and voice.

| File | What it covers | Status |
|---|---|---|
| `x-strategy.md` | XS-01..27: daily volume (3-5 posts across the four founder accounts, max 2 media posts per account per day), the five Vilnius slots with ET equivalents, format rotation and multipliers (vertical thirds 1.33x, portrait pairs 1.21x, video as a follow-up), subject choice (dashboards 2.05x, pricing 0.36x), series grammar with day gaps (close-up -> full -> thirds -> motion -> second showing), reuse windows (4-14 d 1.15x, <=3 d 0.49x), captions, links in the first reply, what never to post; measured from @marcelkargul, @kargulstudio, @_heyrico and the four founders | studied 2026-10-22 |
| `caption-voice.md` | CV-01..13: the lowercase caption rules; one voice per founder (Augustas reaction, Faulkner decision, Rokas detail, Marius contrast); Augustas's own captions with their numbers; 14 caption templates per format (close-up, full dashboard, 3-strip, hero, light/dark pair, bento, component, pricing, faq/footer/testimonials/changelog, motion follow-up, full after close-up, second showing, standalone motion, spec post) and 4 reply templates | studied 2026-10-22 |
| `cadence.json` | machine-readable planner defaults: per-account cadence, medians, hours, format mix; format and subject multipliers; weekly mix bands; slots; daily post limits and the default day; series day ranges and cooldowns; reply timing; caption bands; never-list; data-thin notes. Rebuilt by `../benchmarks/x-strategy-2026-10/_scripts/cadence.mjs` | generated 2026-10-22 |
| `x-engine-audit.md` | audit of the larpo-x-engine posting pipeline (generation, gates, approval, scheduling, measurement) and the hand-off from the design engine (written by a separate study) | studied 2026-10-22 |

Evidence: `../benchmarks/x-strategy-2026-10/` (CREDITS.md, `data/<handle>.json`, `_analysis.json`, `_series.json`, `_extra.json`, scripts in `_scripts/`, 8 founder thumbnails in `founders/`).

Tools that apply these notes: `tools/x_plan.mjs` (the day planner, `docs/X-PLANNER.md`) reads `cadence.json`, `system/x/{formats,rotation,accounts,captions}.json` and the library (`docs/LIBRARY.md`); every rendered post passes `tools/preflight.mjs` (`docs/PREFLIGHT.md`); the hand-off to the X engine is `system/x/x-handoff.schema.json`.
