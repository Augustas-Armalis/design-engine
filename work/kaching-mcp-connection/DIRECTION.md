# kaching-mcp-connection: DIRECTION

Section visual (not a hero) for the Kaching MCP page (`/mcp/`), "Connect once. Ask away." Code lives in the Kaching worktree
`wt/r27-mcp-concepts` (branch `fb/r27-mcp-concepts`) on Barbora's card kit (`src/components/app-visuals/card-shell/`,
`mcp-scenes/kit.jsx`). This folder holds the engine side: rules, direction, check reports. Stills for the founder's pick
are in the session scratchpad `mcp-concepts/` and listed in the round report.

## Understand

- Product: Kaching MCP, which lets a Shopify merchant ask Claude, ChatGPT or Claude Code about their installed Kaching apps.
- The one idea the section must land: one connection, any of the three assistants, every installed app answers.
- Box: 1061x436 white box on the dark MCP dither stage at 1440 (308x397 at 390). Wide format is the brief: use all of it.
- Rejected before: v1 "busy and ugly, use our real logo"; v2 a small centred column (assistant chips, MCP card, app icons)
  floating in the wide box: "super shit... did you look at any examples online?". Both were diagrams, not product.
- Closing visual (scope added): the 514x296 box on the dark closing card ("Ask your next question."). Two stills.

## Hero class

Product proof, inside a section. The sibling to match is the accepted hero conversation (`McpConversation.jsx`), which the
founder did not complain about: a white assistant window, Geist type roles from style-v2, 48px rows with 28px squares in an
even frame, ink approve button, app colour only on that app's data.

## Concept in one sentence

The merchant's apps are a live product surface and the assistants are windows onto it: each concept shows real Kaching
answers being made, never a flow chart of boxes.

- A, "The answer is assembled" (flow, left to right): a Claude window on the left asks; the call passes the real Kaching
  mark on one gradient route; real app fragments on the right (Bundles, Subscriptions, Cart) light up, and the figures
  travel back as chips into the answer card.
- B, "Any assistant, same apps" (window row): a carousel of assistant windows across the full width (ChatGPT, Claude,
  Claude Code terminal, ...), each with the same "Kaching connected" header chip, each answering from a different app;
  the row drifts one window at a time and the centred one plays its conversation.
- C, "Ask across your apps" (command surface): one composer on top, the five installed apps as live tiles below; the
  question lights the one app it needs, its rows are read, a figure lifts into the answer line under the composer.

## Reference triad (one rule taken from each)

- Structural: Linear home "AI and automations" + Linear for Agents hero (refs `02`, `03`): a row of real assistant windows
  wider than the frame, outer ones cropped and faded at the frame edge. Rule taken: fill the wide frame with several real
  windows at reading size and let the edges dissolve (mask), never one small object centred in white space.
- Identity: the accepted Kaching hero conversation + Barbora's card kit (`McpConversation.jsx`, `card-shell/style-v2.js`):
  face-ring white boxes (6% ring, no grey border), radius 12 rows / 16 windows, type roles 12-20px at 500/600, ink primary,
  app colour only in app data. Rule taken: every pixel in the box is a kit component at kit sizes.
- Motion and material: Stripe Agentic Commerce "For businesses" (ref `05`: catalogue rows selected with a dotted bracket
  feeding the chat answer) + Raycast AI extensions (ref `07`: inline app tokens and "Checking existing tasks in Things... 3"
  tool rows) + founder rule "data routes flow: gradient stroke + comet". Rule taken: show data in transit between two real
  surfaces (a value leaves a real row and lands in the answer), and narrate the tool call as a real row.

## Engine rules applied (from RULES.md, trimmed to what applies)

Kept: founder-taste #45 one visual language (one edge, one radius ladder, <= 3 shadows, 500/600), #47 own build-in per visual,
#25 routes flow with gradient + comet, #40 loops invisible until their moment, #44 no generic parade (one conceptual reveal),
#16 callouts follow one placement rule, #17 money in bold sans tabular, #74 show the product not the whole product (one focus),
#69/#70 side cards fall off gently and are real mini-components, #57 (see override), #1/#36 real marks only (Kaching logo
from `assets.logo` / brand kit, Claude and OpenAI SVGs from `/public/brands`), LDP-16 believable workflow with consistent
sample data. Kaching docs: the even-frame rule (left inset = (height - square)/2) and app colour only on app data.

Dropped as not applicable (hero/page-level): nav, headline case and length, subtitle lines, CTA spacing, chip above h1,
hero card anchoring, logo construction, sidebar rules, dashboard density rules (#53/#55/#59/#60/#62/#63 apply only in part:
compact sizes, two text greys, one icon family).

## Divergence and variety

Not a new brand: this is a section inside the shipped Kaching system, so the variety row (layout/nav/button/type/palette/
system) is overridden by the bound Kaching house style. Divergence that matters here is from the two rejected versions
and from the hero: v1/v2 were diagrams (chips, lines, an MCP card); every concept here is product windows and app data;
the hero is one window, these are many (B), a two-surface flow (A) or an app surface (C).

## Overrides

- override: variety.mjs row because this is a section of an existing bound system (Kaching card kit), not a new build.
- override: founder-taste #57 ("dark sections get dark visuals") because the MCP stage is a dark dither frame around a
  white box by the site's accepted design (the hero conversation and every app closing card do the same); the box stays white.
- override: system/kits/product-hero (Vite + motion) because the code ships in the Kaching Astro site on its own kit
  (`useTimeline` loop clock, `m.*` under LazyMotion); motion tokens are Kaching's (`MOVE`, `FADE`, `D`).
- override: tools/check.mjs h1/nav/hero checks are page-level; the stills are a test route, so those FAILs are not this
  section's (recorded with the check report).

## Web references studied (Phase 1, 2026-10-12)

Screenshots: session scratchpad `mcp-concepts/refs/01..14`: Linear intake (01), Linear AI row (02), Linear for Agents (03),
Stripe Agentic Commerce hero (04) and "For businesses" (05), Stripe Connect funds flow (06), Raycast AI extensions (07),
Zapier MCP hero (08) and goal diagram (09), Attio workflow canvas (10) and "whole stack, connected" (11), Cursor hero (12),
Shopify Sidekick hero (13), Resend MCP prompts (14).

Patterns that make them premium:
1. Real UI at reading size, never icons in boxes: Linear, Stripe, Cursor show whole windows with real rows and states.
2. Wide frames are filled by several surfaces, cropped at the frame and dissolved with a mask (Linear 02/03, Attio 11).
3. One focus per moment: one window lit, siblings dimmed or resting at a different state (Linear 02).
4. Data in transit between two real surfaces: Stripe 05 brackets the catalogue rows the agent pulled and joins them to the
   chat answer with one dotted line; Raycast 07 puts the app inside the prompt and narrates the tool call as a row.
5. The tool call is shown as product (Linear "Worked for 12 sec", Raycast "Checking existing tasks in Things... 3").
6. Restraint in lines: when there are connectors, there are few, thin, and they end on real UI (Stripe 05, Attio 10);
   node-and-box diagrams (Stripe 06, Zapier 09) are the weakest visuals on their own pages.
7. Material: Zapier and Cursor put the product on a painted/photographic field; here the dither stage is that field.
8. Motion choreography is per surface and in reading order (question, call, answer), with long rests on the answer.

## Result (stills)

Stills (scratchpad `mcp-concepts/`): concept-A/B/C-1440.png and -390.png; closing-A/B-1440.png and -390.png.
Test route: `/explorations/mcp-connection-concepts/?c=A|B|C|K1|K2` (Kaching worktree commit 628e870).

check.mjs on the test route: 0 fail, 5 warn, 26 pass (reports/kaching-mcp-connection/). Warns justified: h1 line-height is
the test route's visually hidden label; targets.size is the closing card's replica of the shipped `.refresh-button`
(43px, the site's own); shape.squircle is an engine house-system recipe the Kaching kit does not use (override).
One FAIL fixed on the way: the quiet KPI grey in C was 4.42:1, now darker (>= 4.5:1).

Honest comparison with kaching-fold.png and kestrel-fold.png: B and C sit at the Kaching kit's finish (same type roles,
face-ring surfaces, ink buttons, app colour only in data) and use the wide box edge to edge, which v2 did not. A is the
weakest: its middle (one Kaching tile with fanned routes) still reads closest to a diagram, which is what was rejected.
None of the stills yet has Kestrel's life (routes with comets that move, numbers that roll); that lives in the motion pass.

## Recommendation

Connection: B (any assistant, same apps), with C as the runner-up. Closing: A (resting composer with the page's
questions), with closing B as the alternative if the founder wants the assistant switcher repeated from B.
