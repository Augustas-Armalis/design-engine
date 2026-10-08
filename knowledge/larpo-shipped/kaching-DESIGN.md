# Kaching website — current design contract

Updated 1 October 2026. Start here when continuing the website.

- **Running project:** `/Users/augustas/Documents/ChatGPT/Kaching-hero-figma`.
- **Preview:** `http://127.0.0.1:4340/`, `/apps/subscriptions/`, `/affiliate/`, and `/mcp/`.
- **Current complete rules:** [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md).
- **Sitemap / actual versus future routes:** [docs/SITEMAP.md](docs/SITEMAP.md).
- **Current task and component reuse:** [docs/SUBSCRIPTIONS-HANDOFF.md](docs/SUBSCRIPTIONS-HANDOFF.md).
- **Affiliate page:** [docs/AFFILIATE-HANDOFF.md](docs/AFFILIATE-HANDOFF.md). Partner-specific composition and orange identity; do not replace it with an app-page bento.
- **MCP page:** [docs/MCP-HANDOFF.md](docs/MCP-HANDOFF.md). Dark split hero, charcoal/stone dither, five app-specific question cards plus one setup card, a full-dither connection visual and dark setup-guide section using the shared boxed benefits and white CTA. Closing CTA reuses the shared app-page composition. Authentication and approval stay in Shopify; Bundles can create or edit deals, while the other connected apps provide insights.
- **Verified app content:** [references/subscriptions-content-sources.md](references/subscriptions-content-sources.md).
- **MCP wireframe evidence:** [references/subscriptions-figma-wireframe.md](references/subscriptions-figma-wireframe.md).

The accepted homepage is the visual authority: self-hosted variable Geist; 1200px side rails; full-width section backgrounds; 36px/600 section titles with -0.06em tracking; compact 16px buttons; thin gray dividers; Lucide controls; slow app-coloured procedural dither. Commslayer informs composition and Attio informs pacing. Do not replace Kaching's system with either site's fonts.

The homepage hero app switcher retains its plain white visual placeholder. The six catalogue cells show the supplied looping app visuals directly over each app's dither, with no outer white preview window. Bundles uses the blue BundleCardBlue animation in the existing catalogue dither, with only its product interface panel retained; do not add its standalone preview dither or outer frame. Their cameras stay fixed so the full moving interface remains visible throughout the loop. The source animations use the site's Geist Variable font. Other intentionally empty product windows remain reserved for later assets. Keep animated dither around them, with transitions quantized into pixels instead of white opacity gradients. Reviews use three moving rows, no avatars/logos. Buttons do not lift on hover. Case images have no shadow and a 1px white20% border. Mobile menu groups open collapsed. Footer uses a bottom-cropped glass wordmark (Geist 600) on desktop and a modest 332px maximum glass symbol on mobile/tablet, with 40% white fill, 8px live blur and 1px white20% contour. Only actual app pages retain identity labels above the hero title; Affiliate and MCP begin directly with the headline.

Subscriptions is the first app-page implementation. The user initially mentioned Bundles and then explicitly chose Subscriptions. Preserve the supplied hero composition; treat all below-hero Figma wireframes as structure, not approved polished visuals. Use app-specific verified copy and pricing, never placeholder revenue/store counts.

Keep the compact MCP block on Subscriptions after its capability grid: it shows a concrete product use case and links to the full connection guide without repeating setup. For future app pages, this block is optional; use it when there is a useful app-specific example. Bundles copy must state that deal creation/editing is possible, while the other named apps can describe read-only insights. Do not reuse one generic MCP headline or permission caption across every app.

Historical documents remain in `references/`; contradictory older directions are superseded by the files linked above. The preceding complete homepage source/assets/context are preserved in `archives/kaching-homepage-before-subscriptions-20260929-205319.zip`.

This is a local, unpublished frontend preview. The new app visuals are illustrative animations, and remaining product placeholders are deliberate; there is no live CMS, account connection, payment processing or backend integration in this website.
