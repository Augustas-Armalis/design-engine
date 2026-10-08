---
source: web:https://julian.com/guide/startup/landing-pages + https://julian.com/guide/write/ + https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 + https://designerfund.com/blog/how-to-use-photography-in-ui (+ photography-in-branding, to-drive-growth-dive-into-data)
chapter: Gap fill - landing-page structure, hero and CTA writing, copy rewriting method, dev-tool landing study, photography and growth-experiment rules
pages: n/a
topic_tags: [landing-page, hero, headline, copywriting, cta, social-proof, features, photography, experiments, writing-process]
status: studied
---

# Gap fill: landing-page craft and writing (Julian Shapiro, Evil Martians, Designer Fund)

Read 2026-10-08. Raw text is in `corpus/web/gaps/` (jul-*, evilm-*, df-*), private and gitignored. All notes are paraphrase; rule IDs use the prefix LW-. Provenance labels: **[fetched]** I read the page; **(opinion)** author taste or a single-author heuristic; **[engine note]** my own inference, not in the source.

Verification notes: (a) Julian's landing-pages page and Writing Well handbook were read in full from julian.com (HTTP 200). (b) Evil Martians' study (2025-07-08) is one design head's survey of 100+ dev-tool landing pages, not a controlled test, so its frequencies are descriptive. (c) The Designer Fund photography posts are 2015 and were written by a photo-app founder; the principles are durable but the examples are dated.

## 1. Core ideas

1. **Landing pages are scored on a simple equation.** Purchase likelihood rises with the visitor's desire and falls with the labor they must spend and the confusion they feel. Every section either adds desire or removes labor/confusion; anything else is cut. [fetched, Julian]
2. **Use the standard structure unless you have a reason.** Navbar, hero, social proof, call to action, features-with-objections, repeat CTA, footer. Julian's claim is that each detour makes the average visitor more confused. Evil Martians' sample of 100+ dev-tool pages lands on nearly the same skeleton. [fetched]
3. **The headline is a description, not a slogan.** The test: if this were the only text read, would the visitor know what is being sold? Specificity is step one; a hook (bold claim or pre-empted objection) is step two. [fetched]
4. **People have short consideration spans, not short attention spans.** A long page is fine if the hero earns the scroll; this is why the hero gets most of the writing effort. [fetched]
5. **Features are value propositions plus objection handling plus a demonstrating image**, tied back to the hero promise as a running narrative. [fetched]
6. **Social proof should look curated and sit in the right place.** Right after the hero as a trust strip; quotes near the bottom or attached to the feature they praise; hand-picked, never auto-embedded. [fetched, Evil Martians]
7. **Writing is rewriting.** First drafts are for extracting ideas; the second draft is for clarity, brevity and intrigue. Concrete tools: plain words at a thirteen-year-old level, one idea per sentence, rewrite from memory after a break, compress to a tweet. [fetched, Julian Writing Well]
8. **Photography is a branding decision before it is a layout decision.** A photo moves up or down the visual hierarchy by size, whitespace, overlay and subject clarity; stock-looking photos are almost always a mistake. [fetched, Designer Fund]
9. **Experiments need duration and repetition.** One full week minimum, run twice, beware atypical traffic. [fetched, Designer Fund / Andy Johns]

## 2. Rules

### 2.1 Landing-page structure and hero (Julian Shapiro)

- **RULE [LW-01]** Build a homepage, persona page or product page in this order: navbar, hero (header, subheader, image), social proof, CTA with a one-line incentive, features and objections, repeat CTA, footer. Deviate only with a stated reason.
  **Why** Familiar order lowers confusion; Julian ties purchase rate to desire minus labor and confusion, and says each departure from the template adds confusion for the average visitor.
  **Applies to** landing page. **Check** list the top-level section roles in DOM order; the first five must match navbar, hero, proof, CTA, features; the last two must be CTA and footer. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-02]** Make the hero header fully descriptive: a stranger who reads only the H1 must be able to say what the product is or does. Reject slogan-style headers of the "Improve your workflow" or "Supercharge your collaboration" kind.
  **Why** If the visitor does not understand what is sold at once, they leave from laziness or skim and form a wrong impression.
  **Applies to** landing page. **Check** (1) H1 contains a concrete noun naming the product category or the thing delivered; (2) H1 does not match the banned-verb list `supercharge|empower|revolutioni[sz]e|unleash|elevate|streamline|reimagine|improve your workflow|next[- ]gen`; (3) cold-read test: ask a model with no product context what is sold from the H1 alone. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-03]** Derive the header from a value proposition: name the bad alternative people use today, state how this product is better, then turn that into an action statement. Then add one hook, either a bold specific claim or a pre-empted objection, never both stuffed in.
  **Why** Specificity is what makes a header descriptive; the hook is what makes people keep reading ("how is that possible?"). Bloating the header with several objections makes it hard to read.
  **Applies to** landing page. **Check** header plus subheader contain either a number, time or comparison claim, or an objection phrase ("no coding", "in 5 minutes"); header is at most about 2 sentences. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-04]** Find the key objection by surveying real customers, with two questions: what almost stopped you from buying, and why do non-customers not buy. Address only the biggest one in the header and leave the rest to the body of the page.
  **Why** Unaddressed doubts make visitors bounce before they scroll; surveying beats guessing.
  **Applies to** landing page. **Check** process: brief lists the surveyed objections and marks which one the header answers; `visual` for the page. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-05]** Keep the subheader to one or two sentences: first say what the product is, then say how the header's claim is possible.
  **Why** The subheader makes the bold claim believable and must stay breezy so momentum holds.
  **Applies to** landing page. **Check** sentence count of the paragraph under the H1 is 1-2; second sentence references a mechanism or feature. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-06]** When the product serves several major personas, offer a persona chooser near the top that routes to persona-specific sections or pages.
  **Why** One generic message cannot be both specific and relevant; routing keeps each visitor's page specific ("choose your own adventure").
  **Applies to** landing page. **Check** hero contains 2-3 persona links/cards each with distinct destination; `visual` otherwise. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-07]** Put social proof directly under the hero as a logo collage (press and best-known customers) or a customer count if impressive. If there are no notable customers yet, give the product free to people at well-known companies and show their logos once they use it.
  **Why** The aim is to look like everybody already knows the product and to make the visitor feel left out.
  **Applies to** landing page. **Check** a logo/stat strip is the next sibling section after the hero; logos count at least 5 for B2B (Evil Martians gives no hard count; this threshold is an [engine note]). **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

### 2.2 Features, images, CTAs (Julian Shapiro)

- **RULE [LW-08]** Give the features section 3 to 6 features. Each is one block: a short header stating the value proposition, a paragraph that describes it and handles the objection it raises, and an image that reinforces it.
  **Why** Header-paragraph-image gives skimmers and readers two speeds and avoids a wall of text.
  **Applies to** landing page. **Check** count feature blocks (3-6); each contains heading + paragraph + media element. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-09]** Write feature headers as blunt value propositions (portable-grill example: "Cooks and sears", "No clean up", "Cooks more than just meat"). Avoid "Empower your sales" and "Revolutionize your workflow".
  **Why** Visitors decide from the header whether the feature is relevant to them and whether to read the paragraph.
  **Applies to** landing page. **Check** feature H3 text is at most about 6 words and fails the banned-verb regex from LW-02. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-10]** Make the features read as one running narrative: each feature paragraph should echo the hero value proposition (for example finishing with a clause that ties back to the hero promise).
  **Why** Repetition of the core promise in new contexts converts a list of features into one argument.
  **Applies to** landing page. **Check** key noun/verb from the H1 appears in at least half of the feature paragraphs. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-11]** For a complex feature, put extra detail behind an in-place reveal button instead of a separate page; if the detail is long, link out as a fallback.
  **Why** An in-place reveal keeps the visitor in the flow of the page.
  **Applies to** landing page. **Check** feature blocks with long copy (over about 60 words) use `<details>` or a disclosure button. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-12]** Feature images must demonstrate the product doing its job. For software show the product in action (a GIF or UI shot) and avoid abstract decorative imagery; blur tiny text that distracts, so the eye lands on how it works. For physical goods show use cases and build-quality close-ups.
  **Why** Showing the product de-risks the visitor's time investment; abstract art says nothing about value.
  **Applies to** landing page. **Check** each feature media element is a product screenshot, video or UI render (alt text names a product action); count of purely decorative images in feature blocks is 0. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-13]** Write the CTA as the next step of the hero's promise ("Find food", "Start learning"), not a context-free ask such as "Request a meeting".
  **Why** A CTA that continues the narrative feels natural to click; a vague one raises the "why would I?" question.
  **Applies to** landing page. **Check** CTA label contains a verb plus object that appears in the H1/subheader; label is not in `get started|submit|click here|learn more|request a demo` unless the product is sales-led. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

- **RULE [LW-14]** Before shipping, get the draft reviewed by two audiences, people outside the market and people inside it, and have both score six criteria: conversion (would you hand over a card now), interest (1-10), clarity (what is unclear), expansion (what you want more of), brevity (what would you delete if half had to go), disbelief (what felt like scammy sales speak).
  **Why** Outsiders reveal over-assumed knowledge; insiders test uniqueness against competitors.
  **Applies to** landing page. **Check** process; record the six scores per reviewer in the verdict. **Source** https://julian.com/guide/startup/landing-pages (read 2026-10-08)

### 2.3 Dev-tool landing study (Evil Martians, 100+ pages, 2025)

- **RULE [LW-15]** For an early-stage developer product use the skeleton hero, trust block, feature block, social-proof block, optional supporting blocks (comparison, pricing, FAQ, changelog preview), final CTA. Lead with clean type, layout and breathing room; defer flashy interaction.
  **Why** Early teams need to validate quickly; across the sample the winning rules were no salesy copy and clever, simple execution.
  **Applies to** landing page. **Check** section order and count; at most 1 marquee/animated hero decoration (matches the repo's anti-slop limits). **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-16]** Default the hero to a centered composition: large headline, supporting graphic directly below, max-width container. Use side-by-side text-left/visual-right only as a deliberate exception.
  **Why** In the sample the vast majority were centered; it reads stable and trustworthy. Left-right splits read as classic SaaS and were rare in dev tools.
  **Applies to** landing page. **Check** computed `text-align:center` on H1 and the main visual is below the H1 within the same container; `visual` for exceptions. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-17]** Choose the hero visual by product maturity and shape: animated product UI (most effort, best for demos), static product UI (fast and valid), switchable multi-UI (many use cases, messaging not yet narrowed), live embed (narrow utility tools only), code snippet (SDKs, libraries, infra), abstract illustration or text-only (no UI yet or product lives under the hood).
  **Why** The visual must match what exists; faking UI that does not exist erodes trust.
  **Applies to** landing page. **Check** hero visual type is declared in the brief; code-heavy products without UI use a snippet. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-18]** Use two hero CTAs: a bold primary with a specific verb ("Start building", "Download now") and a visually lighter or outlined secondary (docs, GitHub, waitlist) that does not compete.
  **Why** One converts paying users; the other gives developers immediate value through docs or open source.
  **Applies to** landing page. **Check** exactly 2 CTAs in the hero; the secondary has lower fill emphasis (outline/ghost) than the primary; primary label is not "Get started". **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-19]** Place the trust block immediately after the hero. B2B: customer logos (about half the sample used an auto-scrolling belt to save height; with few logos use one testimonial with a photo and name). Individual-user tools: big numbers (GitHub stars, usage, awards).
  **Why** It is the fastest credibility builder; the right proof type depends on whether buyers are companies or individuals.
  **Applies to** landing page. **Check** next section after hero is logos or stats; a belt, if used, pauses on hover/reduced motion. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-20]** Tell the feature story from the user's problem, not from a function list. Ranking in the sample, weakest to strongest for early products: list of functions, then task-oriented slogans ("Build faster"), then problem-oriented stories; bold standalone statements suit established brands; mission-statement openings work only when the problem is real and under-appreciated.
  **Why** Problem framing creates resonance; function lists do not connect to need.
  **Applies to** landing page. **Check** each feature section opens by naming a pain or situation (contains "without", "stop", "no more", or a problem noun) rather than only a capability name; `visual` otherwise. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-21]** Pick a feature layout to fit content: full screenshots with short captions (UI-heavy), alternating chess rows (more text per feature), icon plus headline plus line (SDKs, many small features), belts (many small items), bento (needs deliberate composition to avoid clutter), tabs (feature categories or personas).
  **Why** Layout is a rhythm tool; bento and belts break vertical rhythm, chess rows add it.
  **Applies to** landing page. **Check** max 2 consecutive chess rows (repo rule) and at least 2 distinct layout families in the feature area. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-22]** Use curated testimonials styled to fit the page (avatar, name, company logo for B2B), not live tweet embeds. One quote is enough at the start; when scaling, moderate any auto-pulled feed. Where possible put a short quote directly beneath the feature it praises.
  **Why** Curation guarantees relevant, positive, well-formatted proof; contextual quotes reinforce a specific value claim.
  **Applies to** landing page. **Check** testimonial blocks have 1-4 quotes each with attribution; no third-party embed iframes. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-23]** Early on, supporting blocks beyond an FAQ are optional. Add a comparison table only when the product is not revolutionary but wins on execution, speed or DX; keep pricing on its own page unless it is simple; add a changelog or blog strip only as an "we are shipping" signal for mature teams.
  **Why** Extra blocks dilute a young page; each has one narrow job.
  **Applies to** landing page. **Check** presence list vs. maturity declared in the brief; FAQ is an accordion near the end with practical questions. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-24]** End with a full-width final CTA block that is clearly separated by background (colored or dark on light), one short motivating message and one button with one goal. For lead-starved teams a calendar-booking widget in this block can beat another sign-up button.
  **Why** It catches visitors who scrolled to the end without acting.
  **Applies to** landing page. **Check** last section before footer has a background that differs from its neighbour by at least a visible step, with exactly 1 primary button. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08)

- **RULE [LW-25]** Use an eyebrow or announcement banner above the hero only to signal a release, funding round or launch event, and keep it to one item.
  **Why** It gives early-stage products a sense of momentum and context.
  **Applies to** landing page. **Check** at most one eyebrow/banner; text mentions an event, not a generic category. **Source** https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025 (read 2026-10-08). See section 5: this conflicts with Vercel's report guidance and the repo's anti-slop tracked-eyebrow ban.

### 2.4 Writing method (Julian Shapiro, Writing Well)

- **RULE [LW-26]** Write landing copy in plain words that a thirteen-year-old could follow, with one idea per sentence; do not drop the nuance that carries the point.
  **Why** Abstract wording ("charting a landscape") hides the claim; long multi-idea sentences make readers hold context in memory.
  **Applies to** all. **Check** Flesch-Kincaid grade of hero and feature copy at most 8 (grade 8 is an [engine note] proxy for "thirteen-year-old"); average sentence at most 20 words; abstract-noun list (landscape, paradigm, ecosystem, synergy, leverage) = 0 hits. **Source** https://julian.com/guide/write/rewriting (read 2026-10-08)

- **RULE [LW-27]** Edit copy in three passes: (1) rewrite each section from memory after a break of about an hour, or from a friend's 30-second spoken summary; (2) delete words that add no needed context; (3) rephrase each paragraph from scratch.
  **Why** Writing from memory drops fluff because only the critical points survive.
  **Applies to** all. **Check** process; word count of the final section is at most about 60% of draft 1 (the 60% figure is an [engine note]). **Source** https://julian.com/guide/write/rewriting (read 2026-10-08)

- **RULE [LW-28]** Apply the tweet test to long sections: if the whole point survives in one tweet-length message, replace the long version with the short one.
  **Why** Succinctness is the ratio of significant thoughts to all thoughts, not the raw length; words are free for the writer and costly for the reader.
  **Applies to** landing page | docs. **Check** for each section, produce a 280-character summary; if no information is lost, shorten. **Source** https://julian.com/guide/write/rewriting (read 2026-10-08)

- **RULE [LW-29]** Create intrigue with novelty (a counter-intuitive or surprising claim) and by withholding an answer until later. Structure pages around peak and end: a strong intro, at least one peak of insight or surprise, and an ending that justifies the read.
  **Why** People judge an experience by its most intense moment and its end; a good intro buys goodwill for an imperfect middle.
  **Applies to** landing page | docs. **Check** `visual`; list the peak section in the brief. **Source** https://julian.com/guide/write/rewriting (read 2026-10-08)

- **RULE [LW-30]** Run feedback on copy with a numeric target: average 7.5 or more out of 10 across a handful of readers; do not chase 9. If 3 of 10 give the same feedback and you are unsure, adopt it when cheap; if 4 or more of 10 agree and you disagree, assume you are wrong.
  **Why** Chasing universal approval bloats text; independent repeated feedback is a better signal than your own taste.
  **Applies to** all. **Check** process; record scores. **Source** https://julian.com/guide/write/rewriting (read 2026-10-08)

- **RULE [LW-31]** Write in a voice a real person would speak. Do not use words you would not say aloud ("plethora", "myriad") to sound smart.
  **Why** Inauthentic voice reads as fraud and pushes readers away.
  **Applies to** all. **Check** banned-word regex `plethora|myriad|utilize|leverage|robust|seamless|holistic|cutting-edge` returns 0 hits in body copy (the list beyond the first two is an [engine note]). **Source** https://julian.com/guide/write/style (read 2026-10-08)

- **RULE [LW-32]** Teach with a before-and-after pair (a good and a bad example), not only the good one. Turn examples with many moving parts into diagrams.
  **Why** Showing the wrong version clarifies the boundary of the right one.
  **Applies to** docs | landing page. **Check** `visual`; count of comparison pairs in explainer sections is at least 1. **Source** https://julian.com/guide/write/rewriting (read 2026-10-08)

### 2.5 Photography on marketing pages (Designer Fund, 2015)

- **RULE [LW-33]** Decide a photo's rank in the hierarchy on purpose. To raise it: make it bigger, surround it with whitespace, put no overlay content on it, choose a single strong subject, soften other elements. To lower it: make it smaller, use it as a background behind blur or a colored/transparent-black overlay, choose a scene with open space for foreground content.
  **Why** Every photo on screen competes for attention; a photo with text layered on it becomes a background.
  **Applies to** landing page. **Check** hero image: if it is the focal element, no text node overlaps its bounding box; if it is background, a scrim with contrast of text at least 4.5:1 exists. **Source** https://designerfund.com/blog/how-to-use-photography-in-ui (read 2026-10-08)

- **RULE [LW-34]** With user-generated photos, remove competing elements and stay conservative; with curated photos you can take risks such as white text over a dark region you chose.
  **Why** You cannot control brightness, color or busyness of uploads.
  **Applies to** SaaS app UI | landing page. **Check** UGC image slots have no text overlay without a scrim; `visual`. **Source** https://designerfund.com/blog/how-to-use-photography-in-ui (read 2026-10-08)

- **RULE [LW-35]** Build photography from a curated moodboard (cut about 99 percent) and a written photography style guide covering content, story, mood, editing, and do/don't. Avoid obvious stock imagery.
  **Why** A brand is recognizable when someone can say an uncaptioned image looks like it belongs to you.
  **Applies to** landing page. **Check** brief lists the style-guide points; reverse-image check finds no stock-site matches. **Source** https://designerfund.com/blog/how-to-use-photography-in-branding (read 2026-10-08)

- **RULE [LW-36]** Grade each photo like a design: lighting (no lost highlights/shadows), contrast, harmonious color against the UI, composition with foreground/mid/background depth, no distractions, and authenticity.
  **Why** Small flaws in photos behave like a few pixels of misalignment: invisible to name, felt by everyone.
  **Applies to** landing page. **Check** `visual`; histogram clipping under 1% pure white/black pixels is an [engine note] heuristic. **Source** https://designerfund.com/blog/how-to-use-photography-in-branding (read 2026-10-08)

- **RULE [LW-37]** If the brand has no developed photographic identity (technical products), lean on illustration, UI and color instead of generic "people doing things" photos.
  **Why** A vague photo adds no brand signal; the Dropbox example relied on sketch-like illustration.
  **Applies to** landing page. **Check** `visual`. **Source** https://designerfund.com/blog/how-to-use-photography-in-branding (read 2026-10-08)

### 2.6 Growth experiments on landing pages (Designer Fund, Andy Johns)

- **RULE [LW-38]** Run every landing-page experiment for at least one full week (weekdays differ), repeat it a second time to see whether results match, and discount atypical traffic spikes such as a news mention.
  **Why** Single short runs on noisy traffic mislead; big companies have less noisy data than small ones.
  **Applies to** landing page. **Check** experiment log duration at least 7 days and a replicate; `visual` otherwise. **Source** https://designerfund.com/blog/to-drive-growth-dive-into-data (read 2026-10-08)

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Purchase rate model | desire minus (labor plus confusion) | Julian landing pages |
| Feature blocks | 3 to 6 per page | Julian |
| Subheader | 1 to 2 sentences | Julian |
| Copy feedback target | mean 7.5 or more of 10; 3 of 10 same note = adopt if cheap; 4 of 10 = you are wrong | Julian |
| Writing level | thirteen-year-old comprehension | Julian |
| Feedback delay before rewrite | about 1 hour for sections; about 1 week for hindsight; Stephen King-style drawer rest cited at 6 weeks | Julian |
| Dev-tool sample | 100+ pages studied, 2025 | Evil Martians |
| Hero CTAs | 2 (primary bold, secondary lighter) | Evil Martians |
| Experiment length | at least 7 days, run twice | Designer Fund |
| Conversion example | 0.2% to 5.5% (2 to 55 per 1000) over 14 months on one landing page | Designer Fund |
| Growth compounding | +10% growth-rate lift every 4 weeks takes 1% weekly growth to 3% in about 40 weeks | Designer Fund |

## 4. Dos and Don'ts

- **Do** (Julian) "Visually design and develop sites from scratch. No coding." as a header: it states product, outcome and pre-empts the "do I need to code" objection. **Don't** "Improve your workflow!": it could describe any product.
- **Do** a CTA of "Find food" / "Start learning" that continues the hero promise. **Don't** "Request a meeting" with no product context.
- **Do** a feature image that is a real product GIF with irrelevant text blurred. **Don't** abstract shapes for software.
- **Do** (Designer Fund) a listing photo given full foreground placement with explanatory text below it. **Don't** a white title over a darkened photo when the photo is meant to sell the place.
- **Do** quotes curated and styled in the page's voice with avatar, name, logo. **Don't** live-embedded tweets that bring off-topic noise.

## 5. Exceptions & judgement calls

- **Eyebrows.** Evil Martians reports eyebrows/banners as a normal momentum signal in dev-tool heroes. Vercel's official report guidance (see `gaps-linear-stripe-vercel.md`) and this repo's `anti-ai-slop.md` rule (no tracked all-caps eyebrow) discourage them. `copy-and-ux-writing.md` CW-12 allows a short eyebrow that adds information. Resolution suggestion [engine note]: allow one eyebrow only for a dated event or proof stat, sentence case, not tracked caps; LW-25 and CW-12 are compatible on that reading; the Vercel rule is about report pages, not landing pages.
- **Centered hero vs. anti-slop.** `anti-ai-slop.md` lists "centred hero" as a first-wave AI tell, while Evil Martians finds centered heroes dominate real dev-tool pages. These are compatible only if the centered hero carries a real product visual and specific copy; a centered headline over cards is the tell. [engine note]
- **Julian's "do not deviate" vs. art-direction notes.** Julian optimizes conversion for unknown startups with a template; `art-direction-moves.md` and `creative-direction.md` favor distinctive composition. Use the template for the information order and break it in layout, type and imagery, not in section roles. [engine note]
- **Julian is not UI-design research.** The page is copy-and-structure advice from a growth operator; the dopamine-count and 7.5 targets are his personal heuristics (opinion).
- **Photography posts are from 2015** and about photo-led consumer products; apply the hierarchy mechanics, not the brand examples, to SaaS pages.
- **Hero length.** Julian says a long page is fine; Evil Martians sees trust blocks right after the hero and short pages for early products. Both can hold: keep length driven by objections to handle.

## 6. Figures worth keeping

No figures were saved: the Julian page uses annotated screenshots that did not survive text extraction (before/after header pairs). Evil Martians' study links a screenshot folder of all 100 landing pages (see the "Playbook: animated product preview" link in the article); worth a later browser capture for `examples/`.

## 7. Open questions

- **Dan Hollick.** The brief said "typefully/Make Things". Verified instead from his Typefully profile (typefully.com/DanHollick) and X bio: Dan Hollick is a design engineer, previously at Raycast and Tailwind CSS, who is writing a book about how software works at makingsoftware.com. `makethings.dev` is an unrelated studio site and should not be attributed to him. makingsoftware.com is behind a Vercel bot checkpoint (HTTP 429/403) and was not bypassed; his design writing remains unread. Re-try with a human-approved browser session.
- Julian Shapiro: only the startup handbook pages (landing pages, product-led acquisition, retention, growth channels, market pull) and the Writing Well handbook (ideas, first draft, rewriting, style) were fetched; no separate "design" guide exists at julian.com (a guessed /guide/startup/design-principles URL returned 404). The CSS animation / Velocity.js material is not at the tried URLs.
- The Julian page says "Pineapple List" for agencies and carries a newsletter promo; both ignored as not design content.
- The Designer Fund "Craft and Practice" category also includes "The ROI of Branding", "3 Tips for Designing Behavior Change" and the gusto illustration/lettering interview; they were fetched but yielded process rather than checkable UI rules, and are summarised in `gaps-process-interviews.md`.
- Evil Martians article may have been updated after 2025-07-08; counts such as "about half use a logo belt" are as stated in the article, not independently counted.
