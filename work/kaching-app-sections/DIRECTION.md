# DIRECTION: kaching-app-sections

Brief (one line): fill the two empty boxes on every Kaching app page: the light "Ask Claude About Your <App>" box (MCP section) and the dark "Using another <app>? We'll help you switch" box (migration section), animated, with a real phone mode, in Barbora's card kit and the site's own language.

Code: `/Users/augustas/Desktop/Kaching-Website-Export-2026-10-05/wt/r28-app-sections`, branch `fb/r28-app-sections` (commit `e2bc2d5` for box 1). Rules: `RULES.md` (98 selected), trimmed below.

## Class and concept

- Not a hero: two section visuals inside an existing, accepted page template. Hero rules (h1, CTA air, nav) dropped.
- Box 1 concept: **the accepted MCP hero conversation, re-asked per app.** Same window, same beats (type, send, tool call, approve, stream, data card), only the question, the tool and the card change. Product proof: a workflow and a decision, not decoration.
- Box 2 concept (concepts only, founder picks): **your current offers, rebuilt by a person, checked, live on day one.** Three routes (A rows rebuilt, B side by side, C storefront day one); stills in the session scratchpad `app-sections/concepts/`.

## Reference triad

| role | reference | rule taken |
|---|---|---|
| structural | `src/components/app-visuals/mcp-scenes/McpConversation.jsx` (MCP page hero, accepted / not objected) | the box IS the window; one thread that scrolls under a 28px mask; composer pinned to the bottom |
| type / identity | Barbora's card kit (`card-shell/tokens.js`, `style-v2.js`): 14/600 titles, 14/500 body, 12 meta, SHADOW.face 6% ring, RADIUS 16/12/8 | one visual language across every scene (founder-taste "ONE visual language") |
| proof / motion | Cart migration scene (`cart-scenes/agent6_OtherScenes.jsx`, dark DK tokens) + knowledge/web/dark-mode-premium.md (Linear/Supabase edges) | dark visual in a dark section: raised +1 step, white .08 hairlines, top highlight, accent only on the selected thing |

Web references for box 2: gathered in `app-sections/refs/` (see the session report; Shopify/Skio/Linear/Notion-class switch pages).

## Rules kept (trimmed from RULES.md, 31)

founder-taste: one visual language (#45); sibling pages identical boxes (#46); each visual its own build-in (#47); product art in the section palette (#48); dark sections have dark visuals (#57); revise approved visuals, never regenerate a set (#58); content references are content only (#54); numbers never invented, illustrative and modest (CLAUDE.md principle 4); Lucide icons (#67); quiet depth (#13, #24); simpler product UI beats denser (core idea 4); hero shows one view, not the whole product (#74, applied to section boxes); looping accents invisible until their moment (#40); even frame for leading tiles (last rule, 2026-10-12, and memory `leading-icon-even-inset`); premium dark (#64); feedback playbook rules 1-4; core: attio-product-ui#55 (one job per block), LDP-16 (believable workflow), magic-ui#1 (no ambient effect), focus/aria rules for the host box, AH-TY-01 (no text under 12px).

Newest Kaching rules named in the brief and applied here, though not yet written into founder-taste.md at the time of this build: the wide-visual / concept-first rule (box 2 stopped at concepts), "busy is a defect" (one moving element at a time; at most one card per answer), even frame, edge-to-edge dividers (every row and header divider in both boxes spans the full box width).

Dropped (do not apply to section visuals): every hero/nav/headline/subtitle/CTA rule, logo rules, dot-grid/rails texture rules, X-post and component-post rules, sidebar/dashboard grammar rules (#53, #59, #60, #68), depth-of-field collage rules (#66, #69, #70), announcement pill and button-variety rules (#78, #79: the visuals reuse the kit's ink Approve button by consistency).

## Overrides

- override: founder-taste#63 (numbers roll digit by digit) because the accepted sibling (MCP hero conversation) fades its figures in, and the five app boxes must match it; rolling digits would make the app boxes a different family from the MCP page. Revisit on both together.
- override: founder-taste#47 (each visual its own build-in) for the five MCP boxes because they are one visual on five pages (founder-taste#46 wins: sibling pages keep identical boxes); the per-app difference is content and colour, the build-in is shared with the accepted MCP hero.
- override: app-page box aspect 1.4 for the MCP box: fixed 412px (432 on phones), the MCP hero's own heights, because at 1.4 the box is 250px tall on phones and the scene would scale 14px type to ~10px.

## Divergence row

Not applicable (no new brand). Consistency is the goal: the boxes follow the shipped Kaching system and the accepted MCP scene; the divergence gate is skipped deliberately.

## Variety row

Not run: the bound system is Kaching's shipped one (founder: Kaching is the standard), not a new house system.
