# Kargul X study: credits and capture notes

Study evidence only. Every post and image here belongs to Marcel Kargul / Kargul Studio (@marcelkargul, kargul.studio) and, for client screens, to the studio's clients. Nothing is to be copied, traced, reposted or presented as engine or Larpo work; client names and logos in the images stay theirs. The notes that use this evidence: `knowledge/web/kargul-saas-playbook.md` (rules KS-01..KS-32) and `system/product-ui/kargul-tokens.json`.

## How it was captured (2026-10-12)

- **Timeline** (`posts.json`, 223 statuses from 22 Sep to 12 Oct 2026): `https://api.fxtwitter.com/2/profile/marcelkargul/statuses`, the public FixTweet API (same mirror as `knowledge/benchmarks/x-posts/`), 25 pages of 20 with the returned cursor, no login, nothing liked, followed or posted. Fields kept: id, url, timestamp, text, public counts, reply/quote target, media type/size/URL.
- **Media list** (`media-urls.txt`, 217 items): post id, date, type, size, original `pbs.twimg.com` URL.
- **Images** (`kx-<postIndex>-<n>-<postId>.png|jpg`, 40 files): downloaded with `?name=large` (2048 px max) from `pbs.twimg.com`. `<postIndex>` is the index in `posts.json`. Some are PNG (kept as `.png`).
- **Gallery classification** (`gallery-classification.tsv`): every one of the 285 original case-study images in `knowledge/benchmarks/kargul-deep/gallery/` (downloaded by the earlier deep study) with a class and a one-line note.
- **Borders census** (`borders-census.json`): Playwright Chromium, 1440x900 @1x, on the public repos `github.com/kargulstudio/sales-crm` (MIT), `workflow-editor` and `kanban` (no licence: measured, not copied) run locally from `corpus/kargul-src/` with `next dev`. Views: CRM default, workflow canvas, workflow dashboard overview, kanban board, kanban overview. Per view: every border (width, colour, sides, ink-alpha against the surface below), single-side dividers, box-shadow rings, the separation method of every surface (fill / border / ring / drop) and up to 400 nesting records (child insets, parent and child radius, parent padding).

## Images (post index -> what it shows)

| File prefix | Post | Shows |
|---|---|---|
| kx-001-0/2/3 | 2109715596225257488 "CRM view." | light CRM list, inline detail panel, app with icon rail |
| kx-008-0 | 2109273659038650501 | Geist tracking demo at 100px |
| kx-013-0/2 | 2108671403981496458 | project home + task detail on a gradient canvas |
| kx-014-0 | 2108989644021100904 | sales dashboard (redesign post) |
| kx-025-0/2 | 2108891903911702779 | Attio-like companies table + detail |
| kx-036-0 | 2107505914345603127 "details." | dark actions menu |
| kx-048-0/1/3 | 2107619825719910460 | projects list, command palette, invite dialog |
| kx-052-0..3 | 2107175194838044784 | four dashboards from the free Figma file |
| kx-060-1/2 | 2107494499660529916 | dark analytics, project dashboard |
| kx-089..kx-170 | thread 2106428709305471047 (replies) | product design shots: analytics, team table, calendar, newsletter, report builder, link analytics, grouped bars, database insights, network, monitoring, property, pipeline, customers, tasks, email campaign, overview, traffic, performance, marketing |
| kx-194-0 | 2105278266890236209 "settings page" | settings |
| kx-209-0 | 2102766378016997575 | customers analytics |
