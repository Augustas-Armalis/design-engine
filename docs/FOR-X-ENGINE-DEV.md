# For the X engine dev (Rokas): what changed on 2026-10-22

## Do now (on your Mac, in `larpo-x-engine`)
Augustas asked for every old X-engine design queued on @rokasrem to go ("they're trash") and for 3 new posts a day, auto-approved:
1. `npm run status`: lists the open slots and the scheduled posts.
2. `npm run withdraw -- <postId>` for each queued post (or the Telegram withdraw button); delete anything left in your Buffer queue for that channel.
3. `npm run uninstall`: removes the hourly job, so the engine stops generating its own designs (your config stays).
4. `npm run init -- --non-interactive --set approval=auto --set post-times=09:30,15:30,21:30` once the importer below exists, then send Augustas your profile id.
Until the importer exists, the day's posts are in `library/x-days/<date>/plan.md` with their images and captions.

## What happened
- Augustas reviewed the posts the X engine generated on the co-founder accounts (the auto-made concept heroes and their titles: "landing page concept for ...", "a or b? same hero, different color field", "... light or dark?"). Verdict: "they were stupid as fuck and shall never be like that... plus the entire title writing of the post and format... it's all ass". The design engine is told never to study or imitate them (ledger `x-engine-posts` r1).
- From now on the **design engine designs the posts**. Your engine keeps what it does well: Telegram approval, Buffer scheduling, media hosting, metrics.
- @augustasdesign is **never scheduled**: he posts by hand. **@rokasrem gets three posts a day** (09:30, 15:30, 21:30 Vilnius, auto-approved, `requireConfirm: false`), always designs never posted anywhere. A daily scheduled run designs it, checks it, and pushes it to the design-engine repo.

## What the design engine produces each day
`library/x-days/<YYYY-MM-DD>/` in `Augustas-Armalis/design-engine`:
- `x-handoff.json`: the contract (`system/x/x-handoff.schema.json`): assets (PNG paths relative to the file, width, height, bytes, sha256, alt text), posts (`postId`, `account.profileId`/`handle`, `scheduledAt` with offset, `caption`, `reply` for the first self-reply with the link, `quotesPostId` when a series step quotes the previous one, `approval` with `requireConfirm: true`).
- `plan.md` (human readable), `plan.json`, `day.png` (every post at X's 514px feed tile).
Captions are lowercase and pass your own `shared/gate.mjs checkCaption` (the planner imports it from `~/dev/larpo-x-engine`). They never contain the fictional brand name; "concept" goes in the reply.

## What your engine needs (the full spec: `knowledge/x/x-engine-audit.md` section 4)
1. **Importer:** `client/import.mjs` + an `import` command that reads `x-handoff.json` and delivers through the existing `writeBundle`/`deliver` path, then writes `x-handoff.receipt.json` (`{ handoffId, importedAt, profileId, results: [{ postId, slotId, xPostId, status, error }] }`) so the design engine can record what went out.
2. **Worker:** a `design-engine` format outside the hero rotation; `createPostRoute` makes its own slot from `dueAt`, takes up to 4 images, keeps the caption gate; imported slots stay out of the hourly plan; regenerate skips them; per-post `requireConfirm` forces the Telegram confirm.
3. **Turn off your own hero generation** per profile (`paused` for the agent rotation, imports still flow).
4. **Be lenient** with the extra fields (`reply`, `quotesPostId`, `strips-3`, `full-plus-strips`, `gate.preflight`): store or ignore, never refuse. A first-reply step (post the `reply` 30-150 min later) is the next feature that pays: links in the post ran 0.33x, in a reply 1.02x.
5. Your profile id: send it to Augustas; it goes into `system/x/accounts.json` (`rokas` is a placeholder).

## Paste this into your agent for context
```
Context: Larpo's design engine (github.com/Augustas-Armalis/design-engine) now designs our X posts and writes a daily
library/x-days/<date>/x-handoff.json (schema: system/x/x-handoff.schema.json; spec of what our larpo-x-engine must change:
knowledge/x/x-engine-audit.md section 4; example: library/x-days/2026-10-23/x-handoff.json). Our X engine's own generated
hero designs and title templates are retired by the founder: do not generate designs or captions; import the hand-off,
keep Telegram confirm (requireConfirm always true), Buffer scheduling, media hosting and metrics. Build: client/import.mjs +
`import` CLI using writeBundle/deliver, receipt file x-handoff.receipt.json, Worker design-engine format outside the rotation,
slot from dueAt, up to 4 images, caption gate kept, regenerate skips imported posts, per-profile pause of our own generation,
lenient on extra fields (reply, quotesPostId, strips-3, full-plus-strips, gate.preflight). Offline tests in tests/ and
worker/test/. Never deploy or post from the agent; open a PR.
```
