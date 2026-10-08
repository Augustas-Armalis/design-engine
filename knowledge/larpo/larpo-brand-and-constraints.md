---
source: larpo-knowledge-base (context/brand.md, positioning.md, constraints.md, audience.md, clients.md, offer.md, web-presence.md; decisions/; inbox/x-post-descriptions-2026-08-30)
chapter: Larpo brand voice, visual system, hard constraints, audience, proof rules and X caption doctrine
pages: n/a (internal canonical context and decisions)
topic_tags: [larpo, brand, voice, lowercase, geist, constraints, audience, client-proof, positioning, x-captions, motion]
status: studied
---

# Larpo brand and constraints

Provenance tags: **[founder]** = recorded as a founder decision or direct founder rule (named deciders: Augustas, Rokas Remeika, Marius Vanagas); **[team research]** = Larpo canonical context or team research. Context files are marked `status: active` in the Larpo KB; hard items are stated in `context/constraints.md` as "genuinely fixed". Paths relative to `/Users/augustas/dev/larpo/larpo-knowledge-base/`. Companion summary for quick use: `brand-constraints.md`. Do not change Larpo's own brand system from the engine repo (CLAUDE.md hard stop; the canonical edit gate in Larpo's `AGENTS.md` requires showing the diff and getting human approval).

## 1. Core ideas

1. Larpo is "a full-stack web partner for saas and ai teams": brand strategy, identity, web design, custom code, integrations and launch from one senior team. It is **not** a product design studio; the focus is the brand and marketing website around a product.
2. Voice: direct, calm, compact, product-literate; practical outcome first, then craft; confident without agency-brochure language.
3. Visual system for larpo-owned surfaces: clean, monochrome, restrained; geist only; work and proof carry more weight than oversized headlines.
4. Hard constraints protect truth and identity: no invented proof, lowercase public copy (acronyms included), no em dashes, no product-design-studio self-description.
5. **Publisher vs subject**: the Larpo visual system binds larpo's website, profiles, captions and any frame presented as larpo; a labelled fictional concept's product identity is a work artifact and should generally use its own distinct identity.
6. Audience: founders and small growth teams at seed to series B saas, ai, fintech and software companies; DTC and Shopify are not targeted.

## 2. Rules

### 2a. Verbal identity

- **RULE [LBC-01]** [team research] Write in a direct, calm, compact, product-literate voice; explain the practical outcome first, then the craft behind it. Confident without acting like an agency brochure.
  **Why** Canonical verbal identity.
  **Applies to** larpo copy. **Check** `visual`/copy review. **Source** `context/brand.md` "Verbal identity".

- **RULE [LBC-02]** [team research] Use short sentences and specific nouns; say what is built, who it is for and what happens next; put proof close to the claim. Example to follow: "a complete brand and custom website, for bigger teams and projects". Counter-example: "we craft transformational digital experiences for visionary founders".
  **Why** Specificity over abstraction.
  **Applies to** larpo copy. **Check** mean sentence length; banned-vocabulary scan (LBC-07). **Source** `context/brand.md`.

- **RULE [LBC-03]** [team research] Keep calls to action plain: `book a call` and `write us a message`. The two CTAs are paired deliberately (book vs message answer different visitor states) and map to `https://cal.com/larpo/15min` and the Telegram concierge `https://t.me/larpostudiobot`.
  **Why** Brand voice and routes.
  **Applies to** larpo surfaces. **Check** CTA labels on larpo pages. **Source** `context/brand.md`; `context/web-presence.md` "Canonical routes".

- **RULE [LBC-04]** [team research] Never use em dashes in larpo copy (HARD).
  **Why** Hard constraint; the engine's copy lint allows <=1 per 100 words in body, so the Larpo rule is stricter.
  **Applies to** larpo copy (all copy larpo writes: site, titles, bios, captions, bot output). **Check** regex for U+2014 and ` -- ` returns 0 matches. **Source** `context/brand.md`; `context/constraints.md` "Public copy".

- **RULE [LBC-05]** [team research] Reuse the approved positioning statements verbatim rather than paraphrasing: primary "a full-stack web partner for saas and ai teams."; short description "your brand and website, built from zero to launch."; share title "larpo / a full-stack web partner for saas and ai teams"; share description "your brand and website, built from zero to launch. we handle the strategy, identity, web design, custom code and every final connection."
  **Why** Approved public statements ("Use these verbatim").
  **Applies to** larpo copy, metadata. **Check** string match against `context/positioning.md`. **Source** `context/positioning.md`.

- **RULE [LBC-06]** [founder] Larpo's public copy is lower case, with no acronym exception: `saas`, `ai`, `seo`, `cms`, `b2b` stay lower case in page titles, meta titles, social bios, site copy and bot output. Proper names keep capitals (`Framer`, `Webflow`, `LinkedIn`); a category is not a name. Quoting other people stays untouched.
  **Why** Rokas Remeika, 2026-08-26: an exception that covers conventional acronyms would swallow the rule; lower case is a deliberate part of the identity. Any capitalised acronym in larpo's own copy is a defect.
  **Applies to** larpo-owned surfaces only (not fictional subject work, see LHS-02 and LBC-17). **Check** regex for `\b(SaaS|AI|SEO|CMS|B2B)\b` in larpo copy returns 0. **Source** `decisions/2026-08-26-lowercase-acronyms.md`; `context/constraints.md`; `context/brand.md`.

- **RULE [LBC-07]** [team research] Avoid the vocabulary list: world-class, premium, innovative, immersive, full-service, and vague claims about digital experiences or transformative design; also avoid "product design studio". Would bend only if a specific client context demanded a word, and even then not on larpo's own surfaces.
  **Why** Soft constraint with a stated exception; reflects differentiation by ownership and completion.
  **Applies to** larpo copy. **Check** keyword scan. **Source** `context/constraints.md` "Soft"; `context/positioning.md` "Avoid".

- **RULE [LBC-08]** [team research] Lead with ownership and completion: one team from first idea to live website; strategy, identity, web design and custom code in one place; a clear brand and website for the next stage of the company; custom built and ready to launch. The work does not stop at mockups or a handoff.
  **Why** The meaningful difference.
  **Applies to** larpo copy. **Check** `visual`. **Source** `context/positioning.md` "Differentiation".

- **RULE [LBC-09]** [team research] Never describe larpo as a product design studio.
  **Why** HARD self-description constraint.
  **Applies to** larpo copy. **Check** keyword scan. **Source** `context/constraints.md` "Self-description"; `context/mission.md`.

### 2b. Visual identity (larpo-owned surfaces)

- **RULE [LBC-10]** [team research] Visual direction: clean, monochrome and restrained; closer to mobbin's editorial discipline and the compact commercial clarity of avero and kargul than a typical animated agency site. References are "ingredients, not templates" (mobbin: quiet navigation, tight spacing, work as visual proof; avero: obvious formats, pricing clarity, paired book/message CTAs, compact social proof; kargul: short positioning, clean founder/studio bios; kree8: memorable personality moderated for larpo's quieter system).
  **Why** Canonical visual direction.
  **Applies to** larpo surfaces. **Check** `visual`. **Source** `context/brand.md` "Visual direction", "Visual and commercial references".

- **RULE [LBC-11]** [team research] Larpo-owned surfaces use geist as the only typeface (restrained negative letter spacing); black, white and neutral gray only (no yellow-gray cast); no gradients, blobs or decorative glow (HARD).
  **Why** Binds larpo's website, profiles, captions and any surrounding publisher frame.
  **Applies to** larpo-owned surfaces. **Check** computed font-family = Geist only; computed colours are neutral (chroma ~0); no `gradient`/glow in CSS. **Source** `context/constraints.md` "Visual system for larpo-owned surfaces"; `context/brand.md`.

- **RULE [LBC-12]** [team research] Show the mark only in the navigation; the mark-and-wordmark lockup goes in the footer or formal contexts. The mark is five rounded petal shapes around a negative-space star (files: `assets/brand/logo-mark.png`, `logo-lockup-wordmark.png`, `x-profile-banner.png`).
  **Why** Brand asset usage.
  **Applies to** larpo surfaces. **Check** DOM audit. **Source** `context/brand.md`; `assets/INDEX.md`.

- **RULE [LBC-13]** [team research] Group with small, rounded, borderless surfaces only where grouping needs help; use generous but controlled spacing; work and proof carry more visual weight than oversized headlines; secondary actions use a light neutral background with no border; use lucide icons consistently and sparingly; a thin black branded scrollbar is acceptable.
  **Why** Canonical component rules.
  **Applies to** larpo surfaces. **Check** `visual`; `scrollbar-color/width` set. **Source** `context/brand.md` "Visual direction".

- **RULE [LBC-14]** [team research] Buttons never jump upward on hover.
  **Why** Soft constraint, motion restraint.
  **Applies to** larpo surfaces. **Check** no `translateY(<0)` in `:hover` for buttons. **Source** `context/brand.md`; `context/constraints.md` "Motion restraint".

- **RULE [LBC-15]** [team research] Motion feels premium but disappears into use: short, smooth opacity and small vertical entrance transitions with a gentle custom ease; reveal late enough to be noticed and early enough to avoid empty space; respect reduced motion; no blur-fly-in effects; no decorative scroll effects.
  **Why** Canonical motion budget.
  **Applies to** larpo surfaces. **Check** `prefers-reduced-motion` handled; no `filter: blur()` in entrance keyframes. **Source** `context/brand.md` "Motion".

- **RULE [LBC-16]** [team research] Homepage structure of larpo.studio: hero with current-project availability, direct claim, short supporting copy and two CTAs; infinite clickable work reel to `/work/`; trusted-by logos and a `20+` neutral proof tile; four concise capability cards; compact two-up testimonials with square portraits; clear starting-price formats with both CTAs; concise FAQ (first item open, question underline on hover); quiet footer with large invisible social hit areas. The work archive is a visual browse page (large body of landing-page references, two-column desktop, one-column mobile) that demonstrates taste and scale rather than reading like a case-study database.
  **Why** Documented site experience.
  **Applies to** larpo site. **Check** n/a. **Source** `context/web-presence.md` "Site experience".

- **RULE [LBC-17]** [team research] The Larpo visual system applies to the publisher layer (website, profiles, captions, surrounding frame), not by default to the fictional product shown inside a labelled concept; the product inside gets a distinct subject-specific identity; the larpo caption and truth boundary remain larpo's. A labelled fictional concept is a work artifact, not larpo's own interface.
  **Why** Settled on 2026-08-30 after Baton; written into `context/constraints.md`.
  **Applies to** hero concepts and client-voice work. **Check** `DIRECTION.md` names layers. **Source** `context/constraints.md`; `playbooks/visual-deliverable-preflight.md` Gate 0.

### 2c. Audience, proof and commercial constraints

- **RULE [LBC-20]** [team research] Primary audience: founders and small growth teams at seed to series B saas, ai, fintech and software companies, moving quickly and needing a visible step up in market perception without building an internal brand, design and engineering function. Buyer triggers: a launch, fundraise or major release; a promising product with early-stage/inconsistent presence; a website that does not explain a complex offer; more serious buyers/partners/enterprise conversations; fragmented work across freelancers, templates and agencies.
  **Why** Canonical audience.
  **Applies to** all larpo work. **Check** `visual`/copy review. **Source** `context/audience.md`; `context/mission.md`.

- **RULE [LBC-21]** [founder] Do not target or market DTC or Shopify Plus; larpo does not build websites on Shopify. Do not write copy, content, outreach or positioning aimed at that segment. Inbound is "not targeted, not marketed, possible on demand, ask first" (Eimantas could take it).
  **Why** Augustas, Marius Vanagas (2026-08-23): "nope, netargetinam vapšie jų"; "mes per shopify nekursim svetainių"; offering too much makes marketing hard. External X research proposing a 30% DTC content track is not adopted.
  **Applies to** larpo copy, positioning, concept subjects aimed at larpo's feed. **Check** keyword scan (DTC, Shopify). **Source** `decisions/2026-08-23-dtc-shopify-not-targeted.md`; `context/audience.md`.

- **RULE [LBC-22]** [team research] Publish only claims and quotes the client has approved. Never turn placeholder material, stock portraits or reference copy into an implied real endorsement. Never invent case-study outcomes, performance numbers or endorsements (HARD).
  **Why** Client proof hard constraint.
  **Applies to** all work shown under larpo. **Check** testimonial/logo/metric strings traced to approval. **Source** `context/constraints.md`; `context/clients.md`.

- **RULE [LBC-23]** [team research] A logo appears only where the client has approved it; a prospect is never displayed; nothing unsigned goes in a trusted-by row; ending an engagement does not withdraw the logo, a client asking to be removed does. Current trusted-by row: acquisity, god of prompt, sprout, poof, contles, celper.ai, sapone (seven logos); the `20+` tile counts teams beyond the seven (accessible label "and more than twenty additional teams"), not total clients or projects. The live site runs 22 testimonials; named contacts are barbora (cmo, contles), kristijonas (co-founder, celper ai), paulius (ceo and co-founder, sapone).
  **Why** Proof handling.
  **Applies to** larpo site. **Check** logo list vs `state/clients.md`. **Source** `context/clients.md`.

- **RULE [LBC-24]** [team research] Starting prices: launch page from EUR 3,000; full website from EUR 7,000; after-launch work is ongoing. No other public rate card and no packaged retainer is defined; do not invent one.
  **Why** Only two prices are committed.
  **Applies to** larpo copy. **Check** price strings. **Source** `context/offer.md`; `context/constraints.md` "Deliberately open".

- **RULE [LBC-25]** [team research] Canonical domain `https://larpo.studio/`; keep metadata consistent with `context/positioning.md`; do not claim a city or country (only "based in europe, working globally"); re-verify time-sensitive claims (social activity, client details, pricing, profile info) before publishing.
  **Why** Soft constraints and open questions.
  **Applies to** larpo surfaces. **Check** string match. **Source** `context/constraints.md`; `context/web-presence.md`; `state/now.md`.

- **RULE [LBC-26]** [team research] Fabricating provenance remains forbidden: record asset `source`/`license` when known and write `unknown` when not; the description body is the only intake gate. The three team portraits are approved with no recorded licence or consent (accepted risk), so do not feature them in new public work without confirming.
  **Why** Decision 2026-08-23 (deciders: Rokas Remeika).
  **Applies to** assets. **Check** sidecar fields. **Source** `decisions/2026-08-23-description-over-provenance.md`; `state/now.md`.

- **RULE [LBC-27]** [team research] A fictional concept must stay clearly labelled as concept/sample, never implying a client relationship; the Larpo-branded caption must disclose it (`concept` in plain captions does the disclosure).
  **Why** Truth boundary.
  **Applies to** social and concept work. **Check** caption contains `concept`. **Source** `context/constraints.md`; `inbox/x-post-descriptions-2026-08-30/SYNTHESIS.md`.

### 2d. X caption doctrine

- **RULE [LBC-40]** [founder] Plain description is the default caption: say what the thing is, add nothing, let the image carry it (e.g. "simple hero section page with vibrant colors"; `hero section concept`; `landing page designs`; `recent identity work`; `collection of ui elements`; `some recent concepts`).
  **Why** Rokas, 2026-08-31, after rejecting two agent drafts.
  **Applies to** larpo X captions. **Check** caption <= ~8 words and no hook/CTA/question. **Source** `inbox/x-post-descriptions-2026-08-30/my-thinking.md`; `SYNTHESIS.md`.

- **RULE [LBC-41]** [founder] Never put the fictional brand's name in the caption.
  **Why** Rokas, 2026-08-31: the brand does not exist so its name carries nothing; overrides post-13's `Finlyti - Finance & Fintech SaaS Template.` format even though it scored 13.5x reach (post-13 is a real template).
  **Applies to** larpo X captions. **Check** caption lacks the concept's proper name. **Source** `my-thinking.md`; `SYNTHESIS.md` "What this means for larpo".

- **RULE [LBC-42]** [founder] Do not write the caption from inside the fiction (a concept post is not an ad for the fake company; "i made the meeting bot knock before it joins" sells a feature of a company that does not exist).
  **Why** Rokas, 2026-08-31.
  **Applies to** larpo X captions. **Check** caption has no first-person product claim. **Source** `my-thinking.md`.

- **RULE [LBC-43]** [founder] Do not reach for a clever angle by default; naming the one strange detail you made (post-12 style) is an option, not the rule, and only works when something genuinely strange was made. If nothing is strange, describing the work plainly is the correct answer, not a weaker one.
  **Why** Two agent drafts failed by treating the post-12 move as a rule.
  **Applies to** larpo X captions. **Check** n/a. **Source** `my-thinking.md`.

- **RULE [LBC-44]** [team research] Caption reach data (views divided by followers, 16 ranked posts, single observations, a proxy and not truth): plain labels at the top (06 `hero section concept` 15x, 13 13.5x, 07 3.4x, 12 3.1x); hot takes, ego claims, binary questions and CTAs at the bottom (15 0.5x, 19 0.3x, 09 0.26x, 16 0.2x). Replies cost reach (post-19 2.2% replies at 0.3x reach). Plain label is the default; plain label + one soft adjective (post-18 `Love the clean details on this one.` 2.2x, 107 bookmarks) is safe; avoid hot-take/ego claim, binary question, CTA/recap during growth.
  **Why** Accounts start from zero, reach is the scarce resource.
  **Applies to** larpo X captions. **Check** caption type classification. **Source** `SYNTHESIS.md`; `duds/README.md`.

- **RULE [LBC-45]** [team research] Never caption an outcome the image cannot evidence ("makes investors believe in your vision" is both the worst-reach type and forbidden by the no-invented-outcomes constraint).
  **Why** Post-19 reclassified as dud.
  **Applies to** larpo X captions. **Check** copy review. **Source** `inbox/x-post-descriptions-2026-08-30/duds/README.md`.

- **RULE [LBC-46]** [team research] Reach and saves are different jobs: collections get saved (post-01, 03, 07, 08, 11, 14, 17), single pieces get seen; post-06 broke the pattern with 428 saves on 15,000 views (2.85%, best save ratio recorded). During a feeding period on accounts starting from zero favour single pieces with plain labels; use collections deliberately. Do not claim timing conclusions: seven timed posts cannot answer best posting hour (best and worst timed posts 77 minutes apart: 1:47 PM at 3.1x, 12:30 PM at 0.26x).
  **Why** Evidence limits stated by the team.
  **Applies to** larpo social planning. **Check** n/a. **Source** `SYNTHESIS.md`.

- **RULE [LBC-47]** [team research] The external kree8 growth article is reference, not adopted: it conflicts with larpo canon on fake clients ("create fake ones"), "did I cook?" bait captions, roasting named brands (larpo's buyers are the founders whose sites would be roasted), and 2-3 posts a day (`@larpostudio` has never posted; `@augustasdesign` dormant since ~March 2026). Compliant version: clearly labelled fictional concept pieces.
  **Why** Four conflicts resolved in favour of larpo canon.
  **Applies to** social strategy. **Check** n/a. **Source** `inbox/x-growth-article-2026-08-31/satya-kree8-growth-article.md`.

- **RULE [LBC-48]** [team research] Content pillars: shipped work and visual before/after proof; useful teardowns of websites/landing pages/positioning; concise points of view on sameness, trust, speed and craft; founder process and how the team ships; occasional availability with a specific project format or time window. Do not over-index on follower counts or generic motivation; the founder account (`@augustasdesign`) does more of the posting.
  **Why** Documented content pillars.
  **Applies to** social planning. **Check** n/a. **Source** `context/web-presence.md`.

### 2e. Governance relevant to design work

- **RULE [LBC-60]** [team research] Do not publish, post or send externally from a design session; do not present fictional work as client work; do not add invented customers, endorsements, outcomes or security claims; do not change Larpo's own brand system without human approval (canonical edits to `context/`, `playbooks/`, `decisions/` need a shown diff and explicit approval).
  **Why** Escalation rules shared by both playbooks and `AGENTS.md`.
  **Applies to** process. **Check** n/a. **Source** `playbooks/x-saas-hero-generation.md`; `playbooks/visual-deliverable-preflight.md`; `AGENTS.md` s2; `decisions/2026-08-23-push-review-protocol.md`.

## 3. Numbers & scales

| Item | Value | Source |
|---|---|---|
| Launch page starting price | EUR 3,000 | offer.md |
| Full website starting price | EUR 7,000 | offer.md |
| Trusted-by logos | 7 (acquisity, god of prompt, sprout, poof, contles, celper.ai, sapone) | clients.md |
| Live testimonials | 22 | clients.md |
| `20+` tile | teams beyond the 7 logos | clients.md |
| Binary asset limit | 2 MB (pre-commit hook) | AGENTS.md; state/now.md |
| X reach top / bottom | 15x (`hero section concept`) / 0.2x (`weekly recap / which one is your favorite?`) | SYNTHESIS |
| Best save ratio | 2.85% (428 saves on 15,000 views) | SYNTHESIS |
| Account sizes read 2026-08-23 | `@larpostudio` 191 followers (never posted); `@augustasdesign` 9,776 followers (dormant since ~Mar 2026) | state/now.md |
| Colours | black, white, neutral gray only | brand.md |
| Typeface | geist only | brand.md |

## 4. Dos and Don'ts

| Don't | Do |
|---|---|
| `SaaS and AI teams` in a bio or title | `a full-stack web partner for saas and ai teams` |
| "we craft transformational digital experiences for visionary founders" | "a complete brand and custom website, for bigger teams and projects" |
| em dash in larpo copy | comma, full stop, or colon |
| `Finlyti - Finance & Fintech SaaS Template.` style caption for a fictional brand | `hero section concept` |
| lowercase everything inside the fictional product frame | normal capitalisation inside the subject; lowercase only in the larpo caption and chrome |

## 5. Exceptions & judgement calls

- The lowercase rule has two stated exceptions: proper names and platform requirements; a specific client engagement whose brand demands capitals in shared copy (that surface only). Quoting other people is untouched. Three live surfaces were off-rule on 2026-08-27 (`larpo.studio` page title, `@augustasdesign` and `@larpostudio` bios) and were "in flight".
- Banned vocabulary "would bend only if a specific client context demanded a word on this list, and even then not on larpo's own surfaces".
- Emoji in captions is unresolved: the two highest-save posts (17, 18) use one; `context/constraints.md` is silent; Rokas's call.
- The reach data are single observations, a proxy, 20 examples with no true flop; treat as evidence, not law.
- [engine note] Larpo's own homepage hero uses two CTAs, while Larpo's design doctrine prefers one dominant CTA; the pair is two distinct visitor states (book vs message), consistent with the "secondary only for a different visitor state" rule.

## 6. Figures worth keeping

`assets/brand/logo-mark.png`, `logo-lockup-wordmark.png`, `x-profile-banner.png` (brand marks); `inbox/x-post-descriptions-2026-08-30/winners/post-06.png`, `post-13.png`, `post-12.png` (caption exemplars).

## 7. Open questions

- Where larpo is based (no city or country recorded).
- Whether the bot should be mentioned publicly.
- What `lunor.design` (in the founder bio) is.
- Whether the three off-rule public surfaces have been fixed since 2026-08-27.
- Emoji policy on X.
