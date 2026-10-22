# Connecting a founder's X account

How a teammate's account starts getting the engine's designs, in its own lane and caption patterns, without ever repeating another account's designs or captions. The design engine never posts: it designs, checks and hands off a file; the account owner's X engine profile (Telegram confirm, Buffer) posts.

## What each person needs (once)

1. **Their X account connected to Buffer** as a channel, and a Buffer API access token for it (the X engine stores it encrypted, one key and one X channel per profile).
2. **Telegram** with the Larpo bot, used to verify the profile and to confirm every post (`approval: manual`; the default is auto, switch it).
3. **An X engine profile** on their own Mac: `npm run init` in `larpo-x-engine` (they run it themselves; it asks for the Telegram code and the Buffer token, then the timezone and 1-4 post times). They send us the **profile id** it prints (not the X handle).
4. **Emoji on or off** in that profile (`allowEmoji`): the caption gate refuses emoji when off.

## What we set in the design engine

In `system/x/accounts.json`, for that handle:
- `profileId`: the id from step 3, `profileIdVerified: true`;
- `scheduled: true`, `maxPerDay` (1 for a new account), `slots` (Vilnius times; Rokas: 16:00);
- `freshOnly: true`: only designs never posted on any account;
- `lane`: the subject world their new designs come from, so four feeds never look alike (Rokas: operations and people tools; proposals for the others are in the file);
- caption patterns: their rotation in `system/x/captions.json` (studio register from `knowledge/x/caption-patterns.md`; the same design never gets the same caption, or a shared three-word run, on two accounts).

Then `node tools/x_plan.mjs plan --date <day>` places their posts, and the daily run designs for them.

## What is still missing on the X engine side

The X engine cannot read our hand-off yet. It needs the importer described in `knowledge/x/x-engine-audit.md` section 4.6: a `client/import.mjs` command (about 150 lines) and a small Worker change (about 40 lines) so a post can carry our images, time and caption, and stay out of its own hero rotation. Until that lands, the owner posts from `library/x-days/<date>/plan.md` by hand, or pauses the X engine's own generation (`paused: true`) and imports once it exists. LinkedIn needs a schema change there too.

## Who is on now (2026-10-22)

| Account | State |
|---|---|
| @augustasdesign | manual only: never scheduled; the best finals are listed for him to post by hand |
| @rokasrem | scheduled daily, 16:00, never-posted designs only (first project: Panelry) |
| @faulkner_Design | not scheduled; needs steps 1-4 and a yes from the founder |
| @marius_vanagas | not scheduled; needs steps 1-4 and a yes from the founder |
