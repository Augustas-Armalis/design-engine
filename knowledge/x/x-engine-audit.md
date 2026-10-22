---
source: code:github.com/RokasRem/larpo-x-engine @ 3a2fcba (2026-10-08, local clone /Users/augustas/dev/larpo-x-engine, identical to origin) + code:github.com/RokasRem/larpo-knowledge-base (local clone @ d8636fc 2026-09-01; upstream @ 315d9a4 2026-10-08 read through the GitHub API, read-only) + this engine's canon (knowledge/founder/canon/post-component.md, INDEX.md) and knowledge/web/x-design-posts.md
chapter: X engine audit: how larpo-x-engine generates, gates, approves, schedules and measures posts; where the team's four-pillar brain stands; weaknesses against the design engine's bar; the x-handoff.json plug-in
pages: n/a (code read 2026-10-22; nothing run except the X engine's pure caption gate on the example captions)
topic_tags: [x, twitter, linkedin, posting, pipeline, buffer, telegram, approval, cloudflare-worker, d1, kv, launchd, captions, caption-gate, formats, carousel, video, analytics, grok, metrics, handoff, schema, integration]
status: studied
---

# The larpo X engine: audit and plug-in

Read-only audit. Nothing in `larpo-x-engine` or `larpo-knowledge-base` was changed, run, deployed or posted. Line numbers are against the commits named in the frontmatter. "XE" = `larpo-x-engine`, "KB" = `larpo-knowledge-base`, "DE" = this design engine.

## 0. The one-paragraph answer

The X engine is a well-built **delivery pipe with a weak design head**. Each founder's own Mac runs `claude -p` or `codex exec` hourly (launchd), which writes one or more static 1920x1080 hero HTML files plus a `post.json` from a pasted brief. Playwright renders them to 2560x1440 JPEGs. A deterministic caption gate (lower case, fixed templates) runs on the Mac and again in a Cloudflare Worker. The Worker stores the images in KV and schedules them in that founder's own Buffer on X only, either straight away or after a Telegram confirm. It then snapshots Buffer metrics at 24 h and 7 days and sends a Sunday text report. Identity, isolation, idempotency, offline safety and approval are solid and tested (138 tests). What it lacks is everything the design engine is for: reference-led, canon-floor design (the founder rejected "random heroes for X posts" on 2026-10-22), native X formats (2-up 7:8, lead-plus-two, video), per-account caption voice, cross-account memory and an analytics loop. The four-pillar brain (design, analytics, content creation, research) exists only as an unprocessed vision note (`KB inbox/2026-08-27-knowledge-base-capability-vision.md`) plus scattered parts. The smallest clean plug-in is an **import path**: DE writes `x-handoff.json` (assets plus one post record per account with its own caption and time). A new `client/import.mjs` turns each post into the bundle the client already delivers (`run.mjs` outbox, then `deliver`), and about 40 lines in the Worker let a post create its own slot under a new non-rotating format `design-engine`. Telegram approval, Buffer scheduling, media hosting and metrics stay theirs, unchanged.

## 1. What exists

### 1.1 Repos and state

| Thing | Where | State |
|---|---|---|
| X engine | `RokasRem/larpo-x-engine` (private), local `/Users/augustas/dev/larpo-x-engine`, HEAD `3a2fcba` 2026-10-08 | v1 goal met and deployed 2026-10-06 (`GOAL.md:31-46`): Worker `larpo-x-ingest` live with D1, KV, cron and 4 secrets; 85 client + 48 worker + 5 e2e tests |
| Telegram bot | `RokasRem/larpo-bot` | not visible to the personal GitHub account; the XE Worker depends on its `lx:` callback forward (`worker/RUNBOOK.md:48-63`) |
| KB | `RokasRem/larpo-knowledge-base` | local clone is 21 commits behind (stops 2026-09-01); upstream adds the Grok harness, projects/, week and daily X plans |
| Onboarding on this Mac | `~/.config/larpo-x`, `~/.local/share/larpo-x` | absent: no profile has been initialised on this machine |

### 1.2 Pipeline

```text
FOUNDER'S MAC (one per profile)                        CLOUDFLARE WORKER larpo-x-ingest (Free plan)
launchd hourly  launchd.mjs:27-44 (StartInterval 3600)
  cli.mjs run   cli.mjs:162-191 (run.lock, one at a time)
   flushOutbox  run.mjs:131-138 ----------------------> (re-deliver anything left offline)
   api.plan()   api.mjs:48 -------------------------->  GET /v1/plan  app.mjs:318-347
                                                          slots = profile postTimes in its tz, next 48 h
                                                          (slots.mjs:45-58); format drawn by equal rotation
                                                          (formats.mjs:43-53), persisted in D1 slots
   per slot:
    pickCategories   categories.mjs:24-32 (local history.json, LRU)
    buildTask        prompt.mjs:64-102  -> TASK.md (brief + voice + templates pasted in)
    runAgent         agent.mjs:65-82   claude -p / codex exec, 20 min, tools Read/Write/Edit/Glob/
                                       Bash(node preview.mjs)  (agent.mjs:15-36)
    checkPost        checks.mjs:15-44  caption gate + template + concept block + alt text
    renderPost       render.mjs:103-152 Playwright 1920x1080 -> 2560x1440 JPEG q90; pairs and crops
                                       composited into ONE 16:9 image in a larpo frame
    (2 attempts, findings appended to TASK.md: run.mjs:18, 45-67)
    bundleOf + writeBundle  run.mjs:69-93  -> outbox/<slot>/bundle.json + files
    deliver          run.mjs:99-129
      POST /v1/posts (Idempotency-Key = slotId) ------>  createPostRoute app.mjs:357-405
                                                          gate again (gate.mjs:63-92, formats.mjs:72-78)
                                                          INSERT posts (status uploading), slot filled
      PUT  /v1/posts/:id/files/:name (each) --------->  putFile app.mjs:407-434  images -> KV (5 MB),
                                                          html -> D1 (1.5 MB)
      POST /v1/posts/:id/finalize ------------------->  finalizePost publish.mjs:56-76
                                                          manual: Telegram photo + confirm/reject/regenerate
                                                          auto:   scheduleInBuffer publish.mjs:22-47
                                                                  -> Buffer createPost (buffer.mjs:112-141)
                                                                  -> Telegram photo + withdraw
TELEGRAM (@larpostudiobot via larpo-bot forward)  ---->  POST /internal/telegram-callback app.mjs:490-516
                                                          (owner's tap only; confirm schedules in Buffer)
BUFFER fetches GET|HEAD /i/:postId/:name  ------------>  serveImage app.mjs:469-476 (HEAD = content-length)
CRON "7 * * * *" (wrangler.jsonc:21)                     runCron cron.mjs:196-205: outbox retries, approval
                                                          expiry (due-1h), missing-submission reminder (due-6h),
                                                          reconcile -> published/failed + Telegram, Buffer key
                                                          expiry alerts, Sunday 09 UTC report, metric
                                                          snapshots 24 h / 168 h, KV image cleanup after 14 d
```

### 1.3 Facts that matter for a plug-in

| Topic | What the code does | Evidence |
|---|---|---|
| Who writes the design | The founder's own agent subscription, headless, default model unless `model` is set; no design system, no references, no product kit | `agent.mjs:18-37`, `prompt.mjs:76-101`, `playbook/hero-brief.md` |
| Delivery contract for the agent | one self-contained static HTML per hero, inline CSS/SVG, Google Fonts only, no JS frameworks, no external images, animations frozen | `hero-brief.md:9-13`; renderer blocks every other request `render.mjs:21-24, 43`; `FREEZE` `render.mjs:19` |
| Formats | 7, equal rotation, excluded if used in the last 3 | `shared/formats.mjs:13-21, 43-53`; `playbook/formats.md` |
| Layouts | `single`, `pair` (two heroes composited side by side in one 2560x1440 image), `multi` (2-4 separate 16:9 images), `hero-and-crop` | `formats.mjs:6-12`; `render.mjs:118-147` |
| Media types | JPEG/PNG only, names `^[a-z0-9-]{1,40}\.(jpg|jpeg|png)$`, 5 MB each, 1-4 per post, alt text required (<= 1000 chars); no video, no GIF | `app.mjs:24, 28, 375-380, 415`; `buffer.mjs:112-130` |
| Media hosting | KV key `<postId>/<name>`, public `GET|HEAD /i/:postId/:name`, deleted 14 days after the post settles | `app.mjs:424, 469-476, 528-529`; `cron.mjs:18, 125-135` |
| Captions | the agent fills one of 2-5 lower case templates per format; the client and the Worker both require a template match and a clean gate | `playbook/captions.json`; `checks.mjs:23-26`; `app.mjs:386-389` |
| Caption gate | empty, X-weighted length <= 280, em dash, hashtag, mention, `!`, link, emoji (per profile), upper case outside `PROPER_NAMES`, banned words, the fictional brand name | `shared/gate.mjs:63-92`; `shared/brand-rules.mjs` |
| Profiles | one per founder: one Telegram id (UNIQUE), many device tokens, one encrypted Buffer key, one X channel, `approval` auto/manual (default auto), timezone, 1-4 `postTimes`, `formats`, `allowEmoji`, `paused` | `migrations/0001_init.sql:3-24`; `app.mjs:39-53, 210-276`; `init.mjs:251-253` |
| Slot times | local wall-clock times in the profile's IANA zone, DST-safe, 48 h horizon; a post must be >= 30 min out | `slots.mjs:25-58`; `app.mjs:22-23, 318-339, 369` |
| Platforms | X only: the channel list drops every Buffer channel whose service is not `twitter` | `buffer.mjs:183` |
| Buffer call | `customScheduled`, `schedulingType: automatic`, `needsApproval: false`; a create is never retried when ambiguous | `buffer.mjs:5-7, 112-141`; `publish.mjs:21-47` |
| Approval | manual: Telegram photo of image 1 + caption with confirm / reject / regenerate, expires 1 h before due; auto: scheduled at once with a withdraw button | `publish.mjs:56-122`; `notify.mjs:82-101`; `cron.mjs:33-46` |
| Metrics | Buffer `post.metrics` (reposts, reactions, comments, impressions, engagementRate) at 24 h and 168 h into D1 `metrics`; surfaced only in the Sunday Telegram report, by format | `cron.mjs:15, 96-122, 156-194`; `0001_init.sql:103-109`; `tests/fixtures/buffer/post-metrics.json` |
| History | per profile in D1 `posts` (`GET /v1/posts`, max 100, no metrics); category history in a local `history.json` (40 entries, this Mac only) | `app.mjs:55-61, 461-465`; `categories.mjs:1-4, 34-45` |
| Trends | Hacker News front page + Product Hunt feed titles, unsafe topics filtered; X is never read | `client/trends.mjs:5-30` |
| Offline safety | bundle written to the outbox before the first network call, removed only after finalize; Idempotency-Key = slot id | `run.mjs:1-6, 89-129`; `app.mjs:358-364` |

## 2. The brain (four pillars)

**Found, but only as direction.** `KB inbox/2026-08-27-knowledge-base-capability-vision.md` (status `unprocessed`, "raw direction to refine, not yet an adopted architecture or playbook") names the four areas: design, analytics, content creation and research. It also lists the four founder handles to analyse: `@augustasdesign`, `@faulkner_Design`, `@marius_vanagas`, `@rokasrem`. No repo or running system implements it as one brain. What exists per pillar:

| Pillar | The vision asks for (vision note lines) | What exists | Gap |
|---|---|---|---|
| Design | examples, lessons, dos and don'ts, anti-AI, polish pass (13-26) | KB inbox research (design-intelligence, saas-visual-systems, anti-ai-design-playbook, design-generation-refresh, hero concepts) + `playbooks/x-saas-hero-generation.md`, `visual-deliverable-preflight.md`; XE condenses these into `playbook/hero-brief.md`; **this design engine** is the most developed implementation | XE does not use DE at all; the KB rules and DE canon disagree in places (section 3, item 1) |
| Analytics | agent-controlled Grok API harness over the 4 founders' posts, provenance joined to performance, strategy updated from evidence, lead-oriented (28-42) | **Upstream only** (not in the local KB clone): `scripts/grok.py` + `playbooks/x-research-grok.md` (commit `144debb`, 2026-09-02). It is a stdlib Python wire to xAI `/v1/responses` with server-side `x_search`, default `grok-4.6`, handle and date filters, output printed with a `Sources:` list and filed by hand to `inbox/`; attended path `playbooks/x-research-intake.md`; automating grok.com evaluated and rejected 2026-09-02 (AGENTS.md upstream). Separately, XE's Buffer snapshots + Sunday report. Manual reference set: `inbox/x-post-descriptions-2026-08-30/` (SYNTHESIS covers 20 posts; posts 21-30 were added upstream 2026-09-08 and are not in the synthesis) | Not scheduled, no structured store, no join between a post's provenance (XE `posts.meta`) and its numbers; no lead metric (Buffer gives impressions, reactions, comments, reposts only); XE metrics are not readable by any API route |
| Content creation | X **and LinkedIn**, recycling across 4 accounts with independently written captions, distinct founder voices, no copied-looking posts, queue and approvals over weeks (44-57) | XE (X only, per founder, hero formats, shared caption templates); upstream `inbox/x-design-week-01-2026-09-21/` (21-post plan, log empty) and `inbox/x-design-daily-plan-2026-10-08/plan.md` (one hero a day for Titas, log empty as read) | No LinkedIn anywhere in code; no cross-account recycling rule; one voice for all (`brand/voice.md:7-11`) |
| Research | monitor curated X creators, library of tools, libraries, repos, skills (59-69) | KB inbox research + `inbox/2026-09-01-hero-divergence-and-design-research.md`; XE `trends.mjs`; DE `knowledge/` (far larger) | No creator-monitoring job; Grok harness could do it but is manual |

Founders seen in the KB history: Rokas (`RokasRem`), Augustas, Marius Vanagas (`vanagas`), Titas (requester of the daily plan). Which founder owns `@faulkner_Design` is not recorded. KB `state/now.md` (upstream, updated 2026-09-09) still lists `@larpostudio` as never posted and `@augustasdesign` as dormant since about March 2026.

## 3. Weaknesses, ranked by impact

1. **Design quality has a low ceiling, and nothing measures it.**
   Evidence: an unattended agent gets 20 minutes and 2 attempts per slot (`agent.mjs:15`, `run.mjs:18`). It may only write static single-file HTML with no external images and no JS (`hero-brief.md:9-13`, `render.mjs:21-24`). The only visual check is "rendered with almost no text" (`render.mjs:114-116`). "Passed checks" in `GOAL.md:42` means captions and structure, not design. The DE founder verdict of 2026-10-22 rejects this exact practice: "hero sections by random for X post ... you're getting worse" (`canon/post-component.md:66-67`); an X post must start from a replicated, rated reference.
   The KB brief also bans DE canon defaults: "left copy plus right dashboard" (`hero-brief.md:32`) is DE's default light hero, the Quorum split (`canon/INDEX.md` decision 5); "rounded capsule CTAs" are banned (`hero-brief.md:38`). Merging prompts would not fix it. Minor bug: TASK.md tells the agent to look at `preview-*.png` (`prompt.mjs:89`), but `preview.mjs` writes `preview-*.jpg` (`agent.mjs:53`).
   Fix: DE produces the media at its bar (gate + design view + founder verdict); XE imports finished assets (section 4) and keeps its generator only as a fallback, or pauses it.

2. **Captions are shared templates, so four accounts would look copied; and the case rule conflicts with DE's canon.**
   Evidence: 2-5 templates per format (`playbook/captions.json`) are regex-matched on both sides (`formats.mjs:55-78`, `app.mjs:388`), and every profile uses the same set. Four founders would post "hero section concept" in the same week, the exact failure the vision forbids ("avoid posts appearing copied", vision 52-53). `hero-ab` and `light-dark` captions are questions ("a or b?", "light or dark?"), which the KB's own data calls losers: binary question 0.26x (SYNTHESIS), post-26 0.22x and post-16 0.2x (daily plan). DE measured 0.5x (XP-14).
   The gate refuses sentence case (`gate.mjs:79-80`), while DE's post canon says captions are sentence case (`post-component.md:27`, XP-13). Tested: "Payroll approvals concept, three crops" fails with `lowercase`.
   Fix: captions written per account by DE (free text, still gated); template matching skipped for imported posts; founders decide the case rule (section 5).

3. **Format coverage is narrow and partly cropped by X itself.**
   Evidence: heroes only. Pairs are composited into one 2560x1440 16:9 image (`render.mjs:124-134`), not X's native 2-up at 7:8 (XP-04, XP-24; the 2-up is the strongest image format at 1.2x). Collections are 2-4 equal 16:9 images (`formats.mjs:17`, `render.mjs:118-123`), so a 3-image post loses the sides of its lead in X's 7:8 left tile (XP-05). There is no video or GIF (`app.mjs:28, 415`; `buffer.mjs:116-124`), no component post, no before/after (the strongest shape in both data sets: KB post-21 ~7.6x and post-22 ~6x; DE XP-16 3.3x), no lesson or spec post, and no first self-reply (XP-18).
   Fix: DE exports each format at X's tile ratios (`system/variety/x-post-formats.json`); XE accepts up to 4 images per imported post. Video is phase 2 (section 4.9).

4. **Analytics are captured but never fed back.**
   Evidence: snapshots only at 24 h and 168 h (`cron.mjs:15`), stored in D1 `metrics`, readable only as a Sunday text by format (`cron.mjs:156-194`). No route returns metrics (`postView`, `app.mjs:55-61`). Rotation is equal and blind to results (`formats.mjs:37-53`). Bookmarks, profile visits and leads are not captured. The Grok harness lives in another repo and writes prose to `inbox/` by hand.
   Fix: expose metrics on `GET /v1/posts` (phase 2); DE pulls them into its ledger keyed by the hand-off `postId` it wrote into `posts.meta`; the Grok harness runs weekly over the same post URLs.

5. **No cross-account memory, series or asset library.**
   Evidence: each Mac generates alone. Category history is a local file "kept on this machine, which is the only one generating for the profile" (`categories.mjs:1-4, 34-45`). The Worker's "recent" list is per profile, last 10 (`app.mjs:343-346`). Nothing stops two founders posting the same category or format on the same day, and there is no series id (XP-19, numbered series 2.95x). Images leave KV after 14 days (`cron.mjs:125-135`), so XE is not an archive.
   Fix: DE owns the asset library and series; the hand-off carries `assetId` and `series` into `posts.meta`; the import receipt (section 4.6) closes the loop.

6. **Approvers see part of what they approve.**
   Evidence: the Telegram preview sends image 1 only (`publish.mjs:57`; only `sendPhoto` and `sendMessage` exist, `telegram.mjs:76-95`). Alt text is never shown. A caption cannot be edited, only confirmed, rejected or regenerated (`notify.mjs:96-101`). The default mode is `auto`, which schedules with no human look (`0001_init.sql:15`, `init.mjs:251`). A manual post with no tap expires 1 h before due (`cron.mjs:33-46`).
   Fix: per-post `requireConfirm` for imported posts (`publish.mjs:58`); `sendMediaGroup` for multi-image previews (phase 2).

7. **Single points of failure.**
   Evidence:
   - Generation needs the founder's Mac awake and their agent subscription working (`launchd.mjs:1-3`); a sleeping Mac produces only a reminder (`cron.mjs:48-65`).
   - One Worker on the Free plan: 40-subrequest budget per run (`deps.mjs:6-7`), KV at 1,000 writes a day (`RUNBOOK.md:73-76`).
   - Losing `KEY_ENC_SECRET` invalidates every stored Buffer key (`RUNBOOK.md:37-39`).
   - Buffer is the only publisher, and its keys expire (`cron.mjs:137-154`).
   - The approval buttons depend on larpo-bot's forward (`RUNBOOK.md:48-63`), a repo we cannot see.
   - X only (`buffer.mjs:183`), with one channel per profile and one profile per Telegram id (`0001_init.sql:5-7`), so LinkedIn needs a schema change.
   Fix: the import path removes the Mac and agent dependency for DE posts (any machine with the device token can import); LinkedIn is phase 2.

8. **Small hazards.**
   - `meta` is stored as `JSON.stringify(meta).slice(0, 20_000)` (`app.mjs:401`), so an oversized meta is saved as invalid JSON.
   - `PROPER_NAMES` lacks `LinkedIn`, which the KB says keeps its capital (`brand-rules.mjs:43-46` vs KB `context/constraints.md:26`).
   - `paused` stops planning but not `POST /v1/posts` (`app.mjs:321` vs `357-405`). This is useful for imports, but it is undocumented.

## 4. The plug-in

### 4.1 Where a post record is created

`client/run.mjs` `bundleOf` (69-87) builds `{ slotId, dueAt, body, files, workdir }`. Then `writeBundle` (89-93) and `deliver` (99-129) call `api.createPost(body)` (`client/api.mjs:49`, header `Idempotency-Key: slotId`). The Worker's `createPostRoute` (`worker/src/app.mjs:357-405`) validates the slot, images, sources and gate. It inserts one `posts` row (`0001_init.sql:64-87`) with `status = 'uploading'` and marks the slot `filled`. Files go up through `putFile` (407-434), and `finalize` (436-447) hands over to `finalizePost` (`publish.mjs:56-76`): Telegram, then Buffer.

**One `posts` row = one account, one time, one caption, 1-4 images.** The hand-off therefore has one `post` entry per account and platform, each pointing at a shared `asset`. Rejected alternative, zero Worker change (set the profile's `postTimes` to the hand-off times and submit into rotation slots): it fails because the slot format is drawn by rotation (`app.mjs:330`), must equal the post's format (`app.mjs:371`), and the caption must match that format's templates (`app.mjs:388`), with image counts capped per layout (`app.mjs:375`).

### 4.2 The hand-off schema (`x-handoff.json`, JSON Schema 2020-12)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:larpo:x-handoff:v1",
  "title": "x-handoff v1: design engine to larpo-x-engine",
  "type": "object",
  "additionalProperties": false,
  "required": ["schema", "handoffId", "createdAt", "producer", "timezone", "assets", "posts"],
  "properties": {
    "schema": { "const": "larpo.x-handoff/v1" },
    "handoffId": { "type": "string", "pattern": "^[a-z0-9][a-z0-9-]{7,63}$" },
    "createdAt": { "type": "string", "format": "date-time" },
    "day": { "type": "string", "format": "date" },
    "timezone": { "type": "string", "minLength": 1, "description": "IANA zone the day was planned in, e.g. Europe/Vilnius; display only, scheduledAt carries its own offset" },
    "producer": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "version"],
      "properties": {
        "name": { "const": "design-engine" },
        "version": { "type": "string", "description": "design engine git commit" },
        "operator": { "type": "string" }
      }
    },
    "assets": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/asset" } },
    "posts": { "type": "array", "minItems": 1, "items": { "$ref": "#/$defs/post" } }
  },
  "$defs": {
    "asset": {
      "type": "object",
      "additionalProperties": false,
      "required": ["assetId", "designFormat", "kind", "conceptName", "media"],
      "properties": {
        "assetId": { "type": "string", "pattern": "^[a-z0-9][a-z0-9-]{2,63}$", "description": "id in the design engine asset library" },
        "designFormat": { "enum": ["single-still", "component-loop", "pair-7x8", "lead-plus-two", "grid-4-16x9", "detail-strip", "before-after", "lesson-square", "hero-reel", "object-on-field", "spec-poster"] },
        "kind": { "enum": ["hero-light", "hero-dark", "section-bento", "product-ui", "post-component", "logo", "branding", "full-website"] },
        "conceptName": { "type": "string", "maxLength": 60, "description": "fictional brand name(s) visible in the media, comma separated; empty for larpo's own work. The X engine gate refuses a caption that contains it" },
        "sample": { "type": "boolean", "description": "true when the media shows fictional or sample content" },
        "ledgerId": { "type": ["string", "null"], "description": "ledger/entries/<id> of the founder verdict" },
        "gate": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "designView": { "enum": ["pass", "fail", "skipped"] },
            "check": { "enum": ["pass", "fail", "skipped"] },
            "ranAt": { "type": "string", "format": "date-time" }
          }
        },
        "series": {
          "type": ["object", "null"],
          "additionalProperties": false,
          "required": ["seriesId", "index"],
          "properties": {
            "seriesId": { "type": "string", "pattern": "^[a-z0-9][a-z0-9-]{1,47}$" },
            "label": { "type": "string" },
            "index": { "type": "integer", "minimum": 1 }
          }
        },
        "media": { "type": "array", "minItems": 1, "maxItems": 4, "items": { "$ref": "#/$defs/media" } }
      }
    },
    "media": {
      "type": "object",
      "additionalProperties": false,
      "required": ["path", "name", "mime", "width", "height", "bytes", "sha256", "altText"],
      "properties": {
        "path": { "type": "string", "minLength": 1, "description": "local file, relative to the directory holding x-handoff.json" },
        "name": { "type": "string", "pattern": "^[a-z0-9-]{1,40}\\.(jpg|jpeg|png|mp4)$", "description": "upload name; the X engine serves it at /i/<postId>/<name>" },
        "mime": { "enum": ["image/jpeg", "image/png", "video/mp4"] },
        "width": { "type": "integer", "minimum": 1 },
        "height": { "type": "integer", "minimum": 1 },
        "bytes": { "type": "integer", "minimum": 1 },
        "sha256": { "type": "string", "pattern": "^[0-9a-f]{64}$" },
        "durationMs": { "type": "integer", "minimum": 500 },
        "role": { "enum": ["single", "lead", "detail", "before", "after", "light", "dark"] },
        "altText": { "type": "string", "minLength": 1, "maxLength": 1000 }
      }
    },
    "post": {
      "type": "object",
      "additionalProperties": false,
      "required": ["postId", "assetId", "account", "platform", "scheduledAt", "caption", "approval"],
      "properties": {
        "postId": { "type": "string", "pattern": "^[a-z0-9][a-z0-9-]{2,63}$", "description": "unique for all time; becomes the slot id <profileId>:de:<postId> and the Idempotency-Key" },
        "assetId": { "type": "string" },
        "account": {
          "type": "object",
          "additionalProperties": false,
          "required": ["profileId", "handle"],
          "properties": {
            "profileId": { "type": "string", "pattern": "^[a-z0-9-]{2,24}$", "description": "X engine profile id (not the X handle)" },
            "handle": { "type": "string", "pattern": "^[A-Za-z0-9_.-]{1,100}$" },
            "channelId": { "type": ["string", "null"], "description": "Buffer channel id; null = the profile's own channel" }
          }
        },
        "platform": { "enum": ["x", "linkedin"] },
        "scheduledAt": { "type": "string", "format": "date-time", "pattern": "(Z|[+-][0-9]{2}:[0-9]{2})$" },
        "caption": { "type": "string", "minLength": 1, "maxLength": 3000, "description": "written for this account only; for x it must pass shared/gate.mjs (weighted <= 280)" },
        "approval": {
          "type": "object",
          "additionalProperties": false,
          "required": ["state"],
          "properties": {
            "state": { "enum": ["draft", "ready", "hold"] },
            "designVerdict": { "enum": ["accepted", "partial", "none"] },
            "approvedBy": { "type": ["string", "null"] },
            "requireConfirm": { "type": "boolean", "description": "force a Telegram confirm even on an auto profile" }
          }
        }
      }
    }
  }
}
```

### 4.3 Field map (hand-off to X engine)

| Hand-off field | X engine destination | Code |
|---|---|---|
| `post.account.profileId` | must equal the device token's profile; `posts.profile_id` | `app.mjs:192-199` |
| `post.postId` | `slotId = <profileId>:de:<postId>` = `slots.slot_id` = `posts.slot_id` = `posts.idempotency_key` | `app.mjs:358-364`; `api.mjs:49` |
| `post.scheduledAt` | `new Date(scheduledAt).toISOString()` as `body.dueAt`, then `slots.due_at`, `posts.due_at`, Buffer `dueAt` | new in `app.mjs:366`; `buffer.mjs:115, 126` |
| `post.caption` | `body.caption` = `posts.caption` = Buffer `text`; gated | `app.mjs:386-399`; `publish.mjs:31` |
| `asset.conceptName` | `body.conceptName` = `posts.concept_name`; feeds the gate's concept-name rule | `app.mjs:385`; `gate.mjs:85-89` |
| `asset.media[i].name`, `altText` | `body.images[i] = { name, altText }` = `posts.images`; Buffer `metadata.altText` | `app.mjs:374-380, 400`; `buffer.mjs:124` |
| `asset.media[i].path`, `mime`, `bytes` | `PUT /v1/posts/:id/files/:name` body, `content-type`, `content-length` -> KV `<postId>/<name>` | `run.mjs:19, 112-115`; `app.mjs:407-434` |
| `asset.media[i].width/height/sha256` | importer checks only, copied into `posts.meta.design.media` | `client/import.mjs` (new) |
| `asset.designFormat` | `meta.concept.archetype` = `posts.archetype`, shown in `/v1/plan` recent | `app.mjs:394, 343-346` |
| `assetId`, `series`, `ledgerId`, `gate`, `kind`, `handoffId`, `postId`, `platform` | `posts.meta.design` (keep it under 20,000 chars) | `app.mjs:393, 401` |
| `post.approval.requireConfirm` | `posts.meta.approval.requireConfirm`; forces the manual path | new in `publish.mjs:58` |
| `post.approval.state` | importer filter: only `ready` is submitted | `client/import.mjs` (new) |
| `post.platform`, `account.channelId` | phase 1: `x` and null (or equal to the profile channel); phase 2: `posts.channel_id` | `buffer.mjs:183`; `0001_init.sql:7` |
| (constant) | `format = "design-engine"` for `posts.format` and `slots.format` | new in `shared/formats.mjs:13-21` |

### 4.4 Example: one day, 3 posts, 2 accounts, one 3-image carousel reused with a different caption

Profile ids, ledger ids and hashes are illustrative. Captions were run through XE's `checkCaption` with their concept names: all three pass. Times are Vilnius summer time (+03:00 until 2026-10-25).

```json
{
  "schema": "larpo.x-handoff/v1",
  "handoffId": "de-2026-10-24-01",
  "createdAt": "2026-10-23T18:05:00+03:00",
  "day": "2026-10-24",
  "timezone": "Europe/Vilnius",
  "producer": { "name": "design-engine", "version": "9428d52", "operator": "augustas" },
  "assets": [
    {
      "assetId": "clausewell-hero-v3",
      "designFormat": "single-still",
      "kind": "hero-light",
      "conceptName": "Clausewell",
      "sample": true,
      "ledgerId": "2026-10-23-clausewell",
      "gate": { "designView": "pass", "check": "pass", "ranAt": "2026-10-23T17:40:00+03:00" },
      "series": null,
      "media": [
        {
          "path": "assets/clausewell-hero-v3/hero-3840x2160.jpg",
          "name": "post-1.jpg",
          "mime": "image/jpeg",
          "width": 3840,
          "height": 2160,
          "bytes": 1486220,
          "sha256": "36823a205d56802b68ec89146e91aba66602156b0b3738b6c4457f49df726e8e",
          "role": "single",
          "altText": "Landing page hero for Clausewell, a fictional contract review tool. A two line headline and a dark button on the left; on the right, a contract with three clauses flagged in amber and a reviewer about to approve the second one. Sample data, concept."
        }
      ]
    },
    {
      "assetId": "payvane-run-approval-3up",
      "designFormat": "lead-plus-two",
      "kind": "product-ui",
      "conceptName": "Payvane",
      "sample": true,
      "ledgerId": "2026-10-23-payvane",
      "gate": { "designView": "pass", "check": "pass", "ranAt": "2026-10-23T17:52:00+03:00" },
      "series": { "seriesId": "payroll-approvals", "label": "payroll approvals", "index": 2 },
      "media": [
        {
          "path": "assets/payvane-run-approval-3up/lead-1760x2000.jpg",
          "name": "post-1.jpg",
          "mime": "image/jpeg",
          "width": 1760,
          "height": 2000,
          "bytes": 812344,
          "sha256": "6ae484f131775119a7d6e8ef7147366dc4295f2adfda3554393c4d89e060cac9",
          "role": "lead",
          "altText": "Payroll run approval screen for Payvane, a fictional payroll tool: a list of 14 employees across three countries with totals, two rows flagged for review, and an approve run button. Sample data, concept."
        },
        {
          "path": "assets/payvane-run-approval-3up/detail-a-2400x1350.jpg",
          "name": "post-2.jpg",
          "mime": "image/jpeg",
          "width": 2400,
          "height": 1350,
          "bytes": 655120,
          "sha256": "564df7c7200881d715f4c6ad75958b26f9e2a2eabb03981e7b468d6586ebf065",
          "role": "detail",
          "altText": "Close up of a flagged payroll row: an overtime line that changed by 12 percent since last month, with the previous value struck through. Sample data."
        },
        {
          "path": "assets/payvane-run-approval-3up/detail-b-2400x1350.jpg",
          "name": "post-3.jpg",
          "mime": "image/jpeg",
          "width": 2400,
          "height": 1350,
          "bytes": 701904,
          "sha256": "84a34c4a8be9cad81beddd1afd2b0fdfbc3a3a5b34c6f9a83cc9d159637a58d4",
          "role": "detail",
          "altText": "Close up of the approve run button with the run total and a two person approval indicator, one approver already signed. Sample data."
        }
      ]
    }
  ],
  "posts": [
    {
      "postId": "augustas-2026-10-24-0930",
      "assetId": "clausewell-hero-v3",
      "account": { "profileId": "augustas", "handle": "augustasdesign", "channelId": null },
      "platform": "x",
      "scheduledAt": "2026-10-24T09:30:00+03:00",
      "caption": "landing page concept for a contract review tool",
      "approval": { "state": "ready", "designVerdict": "accepted", "approvedBy": "augustas", "requireConfirm": true }
    },
    {
      "postId": "rokas-2026-10-24-1300",
      "assetId": "payvane-run-approval-3up",
      "account": { "profileId": "rokas", "handle": "rokasrem", "channelId": null },
      "platform": "x",
      "scheduledAt": "2026-10-24T13:00:00+03:00",
      "caption": "payroll approvals concept: the hero, then two details up close",
      "approval": { "state": "ready", "designVerdict": "accepted", "approvedBy": "augustas", "requireConfirm": true }
    },
    {
      "postId": "augustas-2026-10-24-1830",
      "assetId": "payvane-run-approval-3up",
      "account": { "profileId": "augustas", "handle": "augustasdesign", "channelId": null },
      "platform": "x",
      "scheduledAt": "2026-10-24T18:30:00+03:00",
      "caption": "a run approval screen for a payroll tool, three crops. concept.",
      "approval": { "state": "ready", "designVerdict": "accepted", "approvedBy": "augustas", "requireConfirm": true }
    }
  ]
}
```

### 4.5 Producer rules (what DE checks before writing the file)

- **RULE** HO-01 Every `post.caption` for `platform: x` passes XE's gate as written: lower case except `PROPER_NAMES`, X-weighted <= 280, no em dash, `#`, `@`, `!`, link, banned word or `conceptName`, no emoji unless that profile allows it.
  **Why** The Worker refuses the post with `422 gate` (`app.mjs:386-389`), and a sentence-case caption fails today.
  **Check** import `checkCaption` from `shared/gate.mjs` (pure, no IO) with `{ conceptName, allowEmoji }`.
- **RULE** HO-02 No two posts in a hand-off, and no post within 30 days on any account, share a caption; a reused `assetId` gets an independently written caption and lands >= 6 hours from its other use.
  **Why** The vision forbids copied-looking accounts (vision 52-53); XP-26 limits feed repetition.
  **Check** normalised caption set; time gap per `assetId`.
- **RULE** HO-03 Media obey XE's limits: 1-4 per asset; images JPEG or PNG <= 5,242,880 bytes; names match `^[a-z0-9-]{1,40}\.(jpg|jpeg|png)$` and are unique per asset; alt text 1-1000 characters; `video/mp4` only once phase 2 lands.
  **Why** `app.mjs:24, 28, 375-380, 415-420`.
  **Check** stat, sniff and hash each file.
- **RULE** HO-04 Export at X's tile ratios: single still 16:9 to 3:2 (>= 0.84 if portrait); 2-up both at 7:8 (1760x2000); 3-up as 7:8 lead plus two 16:9 (2400x1350); 4-up all 16:9; widths >= 1800 px.
  **Why** XP-04 to XP-07 and XP-11; XE never re-renders imported media.
  **Check** w/h per `designFormat` from `system/variety/x-post-formats.json`.
- **RULE** HO-05 `scheduledAt` carries an explicit offset, lies >= 30 minutes (target >= 2 hours) and <= 14 days after the import, and no account gets more than 2 media posts per 24 h.
  **Why** `app.mjs:23, 369`; a regenerate needs > 2 h (`publish.mjs:102`); XP-26.
  **Check** date arithmetic at write time.
- **RULE** HO-06 Only `approval.state: ready` assets with `gate.designView` and `gate.check` both `pass` and a founder `designVerdict` of `accepted` go out; everything else is written as `draft` or `hold`.
  **Why** The founder's 2026-10-22 rule: "Volume only after one passes the founder" (`post-component.md:67`).
  **Check** schema plus importer filter.
- **RULE** HO-07 Keep `meta` small: the importer copies only the ids, series, gate summary and media dimensions.
  **Why** `app.mjs:401` truncates the serialised meta at 20,000 characters into invalid JSON.
  **Check** `JSON.stringify(meta).length < 8000`.

### 4.6 The change on their side (described, not applied)

Worker and shared code, about 40 lines:
1. `shared/formats.mjs:13-21` adds `'design-engine': { layout: 'direct', heroes: { min: 0, max: 0 }, files: [], maxImages: 4, imported: true }`. `formats.mjs:23` becomes `export const FORMAT_IDS = Object.keys(FORMATS).filter((id) => !FORMATS[id].imported)`, so the new format never enters rotation (`nextFormat`), profile format lists (`app.mjs:49, 129, 240`) or `--set formats` (`client/settings.mjs:69`).
2. In `worker/src/app.mjs:366-371` (`createPostRoute`), when `FORMATS[body.format]?.imported` and the slot does not exist:
   - require `body.slotId` to start with `${profile.profile_id}:de:`;
   - require `body.dueAt` to be a valid instant between now + `MIN_LEAD_MS` and now + 14 days;
   - build the slot in memory and, in the batch at `:395-403`, `INSERT INTO slots (..., state) VALUES (..., 'filled')` instead of the `UPDATE`.

   The repeat check (`:363-364`), the gate (`:386`), the insert and the rest are unchanged.
3. `app.mjs:375` becomes `const maxImages = spec.maxImages ?? (...)`.
4. `app.mjs:388` and `client/checks.mjs:24` skip `matchCaption` when `spec.imported`; the gate itself still runs.
5. `app.mjs:335-338` (`planSlots` final SELECT) adds `AND format != 'design-engine'`, so an imported slot never reaches the hourly agent.
6. `worker/src/publish.mjs:99-107` (`regeneratePost`): for an imported post, skip the slot and edit the Telegram note to "regenerate it in the design engine and import again", because no agent can rebuild it.
7. `publish.mjs:58`: `const manual = profile.approval === 'manual' || JSON.parse(post.meta || '{}').approval?.requireConfirm === true`.
8. `docs/API.md:68-80` documents `format: "design-engine"`, `dueAt` and the `<profileId>:de:` slot prefix. This file is the contract, and its own rule is to change it first (`API.md:3-4`).

Client, about 150 lines:
1. `client/run.mjs:89` and `:99`: `export` `writeBundle` and `deliver`. They are module-private today; only `flushOutbox` is exported.
2. New `client/import.mjs`, which exports `importHandoff({ file, p, api, log, now })`:
   1. Parse and validate against the schema with hand-rolled checks in the style of `settings.mjs` (the repo has 2 dependencies and no ajv).
   2. `loadLocal(p)` (`store.mjs:16-18`) and `api.profile()`. Keep the posts whose `account.profileId` equals the local profile, `platform === 'x'` and `approval.state === 'ready'`; report the rest as skipped with a reason.
   3. Per post, check: `scheduledAt` lead time; that the handle matches the profile; each media file's existence, size, MIME, name and sha256; `checkCaption` with the profile's `allowEmoji`.
   4. Copy the media into `p.runs/<safe slotId>-<ts>/` and build the bundle exactly in `bundleOf`'s shape: `{ slotId, dueAt, body: { slotId, format: 'design-engine', dueAt, caption, conceptName, images: [{ name, altText }], sources: [], meta }, files, workdir }`.
   5. `writeBundle(p.outbox/<safe slotId>)`, then `deliver(...)`. Offline imports wait in the outbox and go out on the next hourly `flushOutbox` (`run.mjs:131-138`).
   6. Write `x-handoff.receipt.json` next to the hand-off: `{ handoffId, importedAt, profileId, results: [{ postId, slotId, xPostId, status, error }] }`. This is the return channel DE reads into its ledger.
3. In `client/cli.mjs:264-273`, add `case 'import': return cmdImport(positionals, values, p)`, run inside `withLock` (`:143-160`) so it never overlaps the hourly run. Add help text at `:32-56` and the script `"import": "node client/cli.mjs import"` in `package.json:8-21`.
4. `tests/import.test.mjs`: a fixture hand-off plus the fake API pattern from `tests/run.test.mjs`. The Worker tests extend `worker/test/posts.test.mjs` for the slot-creating path, the 4-image cap and the regenerate guard.

Multi-account: one machine holds one device token per `LARPO_X_HOME` (`paths.mjs:10-21`, `store.mjs:25-29`). There are two ways to import for all four founders:
- each founder runs `npm run import -- x-handoff.json` on their own Mac, where only their entries are taken;
- one machine keeps four homes (`LARPO_X_HOME=~/.config/larpo-x/<profile>`), each linked once with `register` + `verify`. Re-verifying adds a device to an existing profile (`app.mjs:79-136`), and the code goes to that founder's Telegram, so each founder consents once.

If a founder wants only DE posts, `paused: true` stops the agent rotation (`app.mjs:321`) while imports still flow (`createPostRoute` does not check `paused`).

### 4.7 What stays theirs, unchanged

- Identity and isolation: Telegram-verified profiles, hashed device tokens, cross-profile 404 (`app.mjs:79-199`).
- Telegram previews and approval: confirm, reject, withdraw, expiry, owner-only taps, the larpo-bot forward (`publish.mjs:56-122`, `notify.mjs`, `app.mjs:482-516`, `cron.mjs:33-46`).
- Buffer: encrypted keys, channel choice, `createPost` with no ambiguous retries, withdraw (`buffer.mjs`, `publish.mjs:22-47, 109-122`, `crypto.mjs`).
- Media hosting for Buffer, HEAD included, and cleanup (`app.mjs:469-476`, `cron.mjs:125-135`).
- Reconcile to published or failed with the live link, metric snapshots and the weekly report (`cron.mjs:67-122, 156-194`).
- The caption gate as the final word on every caption (`shared/gate.mjs`), and the outbox's offline safety (`run.mjs:89-138`).

### 4.8 Phase 2 (each needs a founder yes)

- **Video (MP4) and GIF.** Today the code accepts images only: `IMAGE_NAME` (`app.mjs:28`), content types (`:415`), the 5 MB cap (`:24`) and image-only `buildCreateInput` (`buffer.mjs:116-124`). Video also needs object storage beyond KV's per-value limit. That means R2, which the runbook deliberately avoids (`RUNBOOK.md:7-9`). It also needs Buffer's video asset input, which this repo never introspected (`buffer.mjs:1-3`).
- **LinkedIn.**
  - Allow the `linkedin` service in `listChannels` (`buffer.mjs:183`).
  - Add a nullable `posts.channel_id`, validated against `GET /v1/channels`, falling back to `profiles.channel_id`.
  - A second profile per founder is not possible, because `tg_user_id` is UNIQUE (`0001_init.sql:5`).
  - LinkedIn copy is not bound by the X weighted 280, so the gate needs a per-platform `maxLength` (`gate.mjs:68`).
- **Metrics back.**
  - Add `metrics` (24 h and 168 h rows) to `postView` (`app.mjs:55-61`) or add `GET /v1/posts/:id/metrics`.
  - DE joins them to `posts.meta.design.postId` in its ledger.
  - Run the KB Grok harness weekly on the same handles and date range for bookmarks and replies that Buffer does not return.
- **Multi-image Telegram preview.** Add `sendMediaGroup` in `shared/telegram.mjs` and use it in `finalizePost` when `images.length > 1`.

## 5. Open questions for the founders

1. **Caption case.** The XE gate and KB `decisions/2026-08-26-lowercase-acronyms.md` say lower case. DE's post canon (`post-component.md:27`, XP-13) says sentence case, and DE's study treats lower case as a personal voice. Which rule holds for each founder account? Until this is decided, DE must write lower case or every import fails `422 gate`.
2. **Generator or importer.** Do the hourly agent heroes keep running beside DE posts, or is each profile set to `paused` with DE as the only source? The 2026-10-22 verdict on random X heroes argues for pausing.
3. **Who imports.** Each founder on their own Mac, or one machine with four linked profiles (each founder approves one Telegram code)?
4. **Approval.** Should DE posts always need a Telegram confirm (`requireConfirm`), whatever the profile's auto or manual mode? Who may confirm a post on another founder's account? Today only the owner can (`app.mjs:504-508`).
5. **Recycling.** May one asset appear on two founders' accounts? If so, with what minimum gap, and is the same day allowed? The vision allows reuse "with independently written descriptions" but no rule is written.
6. **Formats with questions.** Keep or drop `hero-ab` and `light-dark` with their `a or b?` and `light or dark?` captions, given 0.2-0.26x in the KB data and 0.5x in DE's?
7. **Video and LinkedIn.** Worth moving off the Workers Free plan's KV-only design (R2) for MP4? Which founders post to LinkedIn, and through which Buffer channels?
8. **Analytics target.** The vision optimises for leads and profile strength, not engagement. Buffer returns impressions, reactions, comments and reposts only. Who funds and runs the Grok harness on a schedule, and what counts as a lead?
9. **Accounts.** Who owns `@faulkner_Design`? Are all four founders on `STAFF_IDS` and onboarded? No profile exists on this Mac.
10. **Larpo's own account.** `@larpostudio` has never posted (KB `state/now.md`). Is it in scope for the hand-off, and does it get a profile of its own?
