# Kaching landing visuals: review (r29)

Scope: the non-app visuals on the homepage (integrations band, MCP section, team/support desk, "What's new" list, closing CTA) and, as time allowed, the Integrations page visuals (MCP band, support chat). App interface visuals, the MCP page and the app pages' MCP/migration sections were out of scope.

Brief from the founder: "improve our landing page visuals too, to be in the same style, if needed; if not, leave them, they're not bad as of now." So the default was to leave things alone. Praise marks the floor (feedback-playbook 1.3).

Code: `Kaching-Website-Export-2026-10-05/wt/r29-landing-review`, branch `fb/r29-landing-review` (from `fb/round3` @ 3ec8bc9).
Screenshots: `/private/tmp/claude-501/-Users-augustas-Desktop-Kaching-Website-Export-2026-10-05/c3b8a3b8-4ffe-48b8-ac1f-555c7212f7c6/scratchpad/landing-review/` (`*-before.png`, `*-after.png`, `home-mcp-<w>-check.png` at 1440/1024/768/390/375, `ref-commslayer-*.png`).
Checker: `reports/kaching-landing-review/` (before) and `reports/kaching-landing-review-after/` (after).

## Method

1. Built the branch, served it with `astro preview` on 127.0.0.1:4511, kept a copy of the before build.
2. `node tools/check.mjs http://127.0.0.1:4511/ --name kaching-landing-review`: 4 fail / 4 warn / 23 pass. All four FAILs are outside these visuals (see "Out of scope" below).
3. Captured each visual at 1440 and 390, DPR 2, after its reveal and a few seconds of its own timeline.
4. Read computed styles inside each visual (box face, radii, every distinct box-shadow) and compared them against the accepted sibling, the MCP page hero conversation (`app-visuals/mcp-scenes`, card-shell tokens).
5. Screenshotted commslayer.com's dark sections (`ref-commslayer-0.png` integrations band, `ref-commslayer-2.png` hands-on support) to compare dark-section and texture treatment.

## Findings, ranked

### 1. HIGH (changed): the homepage MCP visual spoke a third, one-off visual language

Where: `#mcp .refresh-mcp-visual`, `src/components/landing/McpFlow.tsx` + `src/styles/landing-mcp.css`.

Evidence (computed, 1440):
- Box face `#f7f7f7` grey stage, 1px `#e3e3e3`, r24, holding a node diagram (apps -> K -> assistants, travelling dot, dither glow).
- Three box-shadow recipes that exist nowhere else on the site: `0 1px 2px .04 + 0 10px 24px -14px .22` (hub), `0 1px 2px .04 + 0 6px 14px -10px .18` (assistant tiles), `0 1px 2px .04` (prompt).
- Radii scaled off the ladder by container units: 22.88 / 14.56 / 12.48px.
- The accepted MCP page hero (`.mcp-hero-visual`) draws the same idea with the card-shell kit: radii exactly 24 / 12 / 8 / 999 and the kit's five shadow tokens.
- So Kaching MCP was drawn three ways across the site: this light diagram (homepage), a light conversation (MCP page hero) and a dark conversation (Integrations band).
- The copy says "A conversation away"; the visual showed a wiring diagram, not a conversation.

Rules: founder-taste "Every product visual on one site speaks ONE visual language... one grey shadow scale of at most 3 levels... audit computed values across ALL visuals" (Kaching round 2: "3 completely different styles of colours, effects, roundness"). CLAUDE.md quality bar: "Never a flat diagram". product-ui-in-marketing 1.7: "AI panels show the work... the product proves a workflow, not a chat bubble."

Fix (done): the homepage box now hosts the MCP page's own scene through the shared host, `<McpLiveVisual scene="conversation" />`. It is the same component, not a copy. The box takes the hero window's face: white, 1px `#e3e3e3`, r24. `McpFlow.tsx` and `landing-mcp.css` are deleted (no other users). The scene lays out at full size from 296x340 and scales below that, so the box is 400px tall on phones (was 260) and at 900-1100px (was 5/4 aspect, about 300px). At 768-899 it keeps its 2/1 card (670x335, scale 0.98).

After (computed): the homepage MCP box's shadow set and radius set are identical to `.mcp-hero-visual` (24 / 12 / 8 / 999; the same five kit shadows). The scene ran with no transform (scale 1) at 1440 (600x407), 1024 (376x400), 390 (350x400) and 375 (335x400).

Provenance: engine rule (founder-taste one-visual-language; CLAUDE.md "never a flat diagram") plus the brief's own question. Choosing the conversation over the connection scene was my own judgement: it matches the section's "A conversation away" copy, and the connection scene needs 380px of height and reads as a tall column.

Trade-off to flag: the homepage now repeats the MCP page hero exactly. That is a common pattern (a teaser of the product page's hero), but if the founder wants the homepage to differ, the next option is the accepted `McpConnection` scene in the same host (`scene="connection"`), a one-word change.

### 2. MEDIUM (left; needs a founder decision): the closing CTA preview is an empty white window on dark dither

Where: `.refresh-closing-preview` (473x298, white, 1px `#262626`, r24) inside `.refresh-closing-card` (`#08090c`, r36). It is shared by every app page's closing CTA.

Why it falls short: an empty box reads as unfinished ("assembled rather than designed"). It also breaks the founder rule "Visuals inside dark sections are dark visuals... never drop a bright white UI window onto a black band."

Why left: it is a documented, intentional reserved slot (`docs/DESIGN-SYSTEM.md` "reserved preview area"; aria-label "Product preview placeholder"; handoff: "supplied motion assets for reserved visuals"). Filling it means choosing what the product demo is, which is a content call, not a style fix. The founder also accepted white windows on dark heroes for the MCP slot, and Commslayer does the same (`ref-commslayer-2.png`: a white Slack card on its dark support band), so the dark-visuals rule and the accepted slots disagree. Recommendation: decide what lives there (for the homepage, an existing accepted scene through a host like `McpLiveVisual`/`AppVisual`; for app pages, that app's catalog card). Until then, leave it.

### 3. LOW (left): Integrations page MCP band is a separate dark build of the conversation (`integrations/McpAskVisual.tsx`)

Evidence: dark panels (`rgba(14,15,17,.8)` box, 1px `#1c1c1c`, r24, the same recipe as the homepage team box), its own header ("Kaching | Approved by you" chip), its own question set and percentage bars (2.3 / 4.6 / 3.4%). It renders correctly once settled (`int-mcp-1440-settled.png`). An early capture at 4.5s shows empty bars mid-timeline, which is by design.

Why left: the band is a dark section (`.directory-mcp { background:#08090c }`), and founder-taste requires dark visuals there. The MCP scenes are light-only (card-shell COLOR), so reusing them would put a white window on a black band, which that rule forbids. It is consistent with its dark sibling (the team desk box recipe). Minor note for a later pass: all three bars share one tint, while the MCP hero gives the lead row the accent. That is taste, not a defect.

### 4. LOW (left, liked by the founder): team / support desk (`landing/SupportDesk.tsx`)

Evidence: box r24 with `inset 0 1px 0 rgb(255 255 255/4%), 0 24px 48px -32px rgb(0 0 0/60%)`, panel inset 24 at r14, 1px white 8% ring, a dark field rising from the bottom. It follows dark-mode-premium "edge the window three ways" (ring, top highlight, dark drop). Phones show three whole rows plus the "+19 more" footer. No inconsistency worth touching. The founder's praise is the floor.

### 5. LOW (left): "What's new" updates list

Evidence: rows 123px, 28/32 padding, one 1px `#e3e3e3` rule per row, 36px app icon, 24/550 title, meta column 150px, Lucide `ArrowUpRight` 24 nudging 3px on hover. Calm and designed, with one rule owner per divider. Nothing below the bar. Copy note (not mine to change): all four rows are Bundles, so the icon repeats four times.

### 6. LOW (left): integrations band (`landing/IntegrationsField.tsx`)

A field of empty tile ghosts with real dithered brand marks (Shopify, PageFly, GemPages, Claude, OpenAI, ...) around centred copy. It uses real brand assets and is not busy, and it shares its idea with Commslayer's integrations band (`ref-commslayer-0.png`) without copying its construction. Leave.

### 7. LOW (left): Integrations support chat (`integrations/SupportChatVisual.tsx`)

A white chat window on the page's blue dither (DirectoryHelp, shared by the directory pages). It is the same white-window-on-dither pattern as the MCP hero and Commslayer's support band. Same open question as finding 2. Leave.

## Out of scope, reported only

- The checker FAILs on the homepage are all in the hero and proof sections: `span.app-tab-label` 4.22:1 contrast (hero tabs) and `label-content-name-mismatch` on the hero rating, the case-study photo links and the testimonials rating links.
- Pre-existing hydration error under reduced motion, on the homepage only: React #418, present in the before build too. Cause: `Hero.tsx` reads `useReducedMotion()` during render and conditionally renders elements (lines 387-393), so the server HTML and the reduced-motion client tree differ. It is in the hero, outside this scope.
- The after check adds a `shape.squircle` WARN (0/202 continuous corners, nav/skip-link). It comes from the checker version in the engine working tree (uncommitted work by another session), not from this change.

## Verification

- `npm run check`: 0 errors. `npm run build`: passes. `node --test tests/*.test.mjs`: 25/25. `git diff --check`: clean.
- At 1440, 1024, 768, 390 and 375, with and without reduced motion, on `/`, `/integrations/` and `/mcp/`: horizontal overflow 0, every `[data-reveal]` visible after a wheel scroll to the bottom, and no console errors except the pre-existing homepage React #418 under reduced motion (above).

## Before / after

| Visual | Before | After |
|---|---|---|
| Homepage MCP, 1440 | `home-mcp-1440-before.png` (diagram) | `home-mcp-1440-after.png` (conversation, answer frame) |
| Homepage MCP, 390 | `home-mcp-390-before.png` (260px box) | `home-mcp-390-after.png` (400px box) |
| Reference | `mcp-hero-1440-before.png` (MCP page hero, unchanged) | |
