# Section benchmark credits

Study evidence only. Every screenshot in this folder shows a live website owned by the company named in the file name (or a template by its credited Framer/Tailwind author). They exist so the engine can learn section construction (variants, counts, measured spacing and type). Never copy, trace or present any of them as engine or Larpo work. What was learned lives in `knowledge/web/section-anatomy.md`, `knowledge/web/footers.md` and `system/sections/variants.json`.

Captured 2026-10-10 with headless Chromium (Playwright 1.64) at 1440x900, no account, no login. Cookie banners: "Reject all" / "Decline" / "Only necessary" was clicked when offered; banners that offered no rejection were hidden with `display:none` (never accepted). A few folds still show an undismissed consent card (Mistral blog/careers, Pitch pricing); they were left as captured. Nothing was submitted, subscribed, liked or downloaded.

Not captured: openai.com (Cloudflare human-verification wall; not bypassed), height.app (connection reset), oatmeal.tailwindui.com (no DNS). posthog.com renders a desktop-OS homepage with no section stack, so it is excluded from section counts.

## Files

| Path | What |
|---|---|
| `full/<slug>.jpg` | full-page overview, 1x (1440 wide), JPEG q68, capped at 22,000px. `<site>.jpg` = homepage; `<site>--<kind>.jpg` = pricing, changelog, blog, careers, security, integrations, customers, compare; `fr_*` = Framer marketplace SaaS templates; `g-*` = gallery pages. |
| `raw/<slug>.json` | measured DOM: top-level blocks (geometry, padding, heading/eyebrow/subtitle type, heading-to-content gap, card clusters, feature counts), all h2s, top strips, deep footer data. |
| `types.json` | type-specific measurements (logos, testimonials, metrics, FAQ, CTA, pricing plans, comparison tables) from `measure-types.mjs`. |
| `sequences.json` | homepage section order read by eye (43 sites + 6 Framer templates). |
| `<section>/*.jpg` | section crops at 2x (2880 wide), JPEG q84-86. `home-*` = homepage section, `page-*` = top 1600px of a dedicated page, `pricing-*` (in faq/) = FAQ on a pricing page, `template-*` = Framer template. Folders: announcement, logos, statement, feature-rows, feature-tabs, how-it-works, product-tour, metrics, testimonials, case-studies, integrations, security, pricing, comparison, faq, cta, changelog, blog, careers, footers (49 crops). |
| `capture.mjs`, `measure-types.mjs`, `analyze.mjs` | regenerate everything from `targets.json` (run from repo root). `targets-galleries.json` lists the gallery pages. |

## Sites (homepage URL; dedicated pages are the same domain)

Linear linear.app; Vercel vercel.com; Stripe stripe.com; Attio attio.com; Raycast raycast.com; Resend resend.com; Clerk clerk.com; Supabase supabase.com; Framer framer.com; Arc arc.net; Cursor cursor.com; Mercury mercury.com; Ramp ramp.com; Notion notion.com; Lovable lovable.dev; Granola granola.ai; Dub dub.co; Cal.com cal.com; Plain plain.com; Lindy lindy.ai; Retool retool.com; PostHog posthog.com (excluded from counts); Webflow webflow.com; Loom loom.com; Superhuman superhuman.com; Perplexity perplexity.ai/enterprise; Anthropic anthropic.com; Mistral mistral.ai; ElevenLabs elevenlabs.io; Runway runwayml.com; Pitch pitch.com; Rippling rippling.com; Deel deel.com; Brex brex.com; Vanta vanta.com; Clay clay.com; Campsite campsite.com; Liveblocks liveblocks.io; Neon neon.com; Railway railway.com; Fly.io fly.io.

Templates: Tailwind Plus "Radiant" (radiant.tailwindui.com), "Salient" (salient.tailwindui.com), "Pocket" (pocket.tailwindui.com) by Tailwind Labs. Framer marketplace SaaS category templates, credited as listed on framer.com/marketplace: Verity (verity-template.framer.website), Platform (plat-form.framer.ai), Grovia (grovia.framer.ai), Coorda (coorda.framer.website), Optivio (optivio.framer.website), Strand (strand.framer.website). No Webflow template preview links were exposed on webflow.com/templates without interaction, so none were captured.

Galleries (variant counting only, thumbnails credited to the sites they show): saaslandingpage.com by Davide Pacilio (`/pricing/` 15 pricing pages, `/testimonials/` 14 testimonial pages, `/faq/` 14 FAQ pages, `/features/`, home); lapa.ninja/category/saas; land-book.com; godly.website (now redirects to recent.design); siteinspire.com/websites/category/technology; framer.com/marketplace/templates/category/saas; tailwindcss.com/plus/templates. Gallery pages mostly showed hero thumbnails and ads (lapa, land-book, godly/recent, siteinspire); only saaslandingpage's per-section collections were used for counts.

Comparison pages found through each site's own footer links: dub.co/compare/bitly, framer.com/compare/framer-vs-webflow, webflow.com/vs/framer, plain.com/compare, cal.com/calcom-vs-calendly, docs.railway.com/maturity/compare-to-vercel.
