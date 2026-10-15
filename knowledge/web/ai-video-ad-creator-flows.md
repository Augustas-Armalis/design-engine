---
source: web:competitor desk research (Creatify, Arcads, HeyGen, Higgsfield help centres, docs, blogs) + Sellify Video Ad Creator code read on origin/main 30da89994 (2026-10-15). Studies: ~/Documents/sellify sth/reusable-characters-research/RESEARCH.md, eng-2079-video-ux/REPORT.md, eng-2079-video-ux/COMPETITOR-GUIDE.md
chapter: AI video ad creator flows: template and brief, cast and avatars, approve before spend, anchor view first, cost on the button, waiting and failure, reuse, finished screen and editing
pages: n/a (web + code; no hands-on screenshots of competitors)
topic_tags: [ai-generation, video-ads, flows, onboarding, brief, templates, avatars, characters, approval, cost, credits, loading, failure, reuse, library, editor, saas-app-ui]
status: studied
---

# AI video ad creator flows

Studied 2026-10-15 from three Sellify research pieces (reusable characters, ENG-2079 video UX report and its competitor run guide). The competitor column is **desk research only**: public docs, help centres, blogs. Nobody ran a 30 s ad through each tool and the screenshot folders are empty, so every competitor claim below is "documented", not "seen". The Sellify column was read from code on main. Rules are written for any AI-generation product (images, video, voice, copy, characters), with the video-ad evidence in Source. The tile-level UI (status chips, sweep, sticky footer, grids) lives in `approval-and-generation-ui.md`.

## 1. Core ideas

1. **The costliest mistake in an AI generation flow is paying for the whole output before seeing anything.** A user who sees a bad script or a wrong-looking character only after spending will not retry. The cheap preview is the trust moment (REPORT gap 1).
2. **Every competitor puts a cheaper artefact before the expensive one.** Creatify shows several storyboard drafts before render; HeyGen Product Placement shows 4 combined images before the video; Higgsfield approves a static Hero Frame before video and shows the credit cost on the Generate button (REPORT §1, RESEARCH §1.4).
3. **Anchor first, derive the rest.** Approving one front view / hero frame before generating the other views avoids paying for five views of a face the user rejects (RESEARCH §4 step 2, Higgsfield Hero Frame).
4. **Start from what the user already has: a product link or one photo.** Creatify and Higgsfield build the brief from a URL; Creatify and Arcads start a character from one photo. 20-80 photo training (Higgsfield Soul ID) and "send us a 2-minute video" (Arcads Clone Yourself) are conversion cliffs (RESEARCH §2-3).
5. **A long brief reads as work.** Sellify's product step holds up to ~15 controls with 3 required fields, and voice and music come before the user has seen anything. The fix is three short cards with "Look and sound" collapsed to AI picks (REPORT gap 3).
6. **Template choice is the biggest creative decision, so the template must show motion.** A still of another product does not tell you whether the ad is a talking product, a montage or a jingle (REPORT gap 2).
7. **The generated thing is an asset, not a one-off.** The strongest save pattern is: pick one result, name it, it lands in a library the creator reads from (Creatify Smart Assets, HeyGen Avatars list, Higgsfield character library). Reuse is the payoff, so anything that delays it (a human review gate) kills it (RESEARCH TL;DR 2-3).
8. **Nobody documents failure.** None of the four tools documents a reject, retry or timeout state for character creation. Do not copy the silence (RESEARCH §3 Avoid 8).
9. **The finished screen is the start of the next job.** A video that cannot move into a campaign in one click wastes the product's advantage over standalone tools (REPORT gap 4).
10. **The wait is dead time unless the product owns it**: a step list, a time estimate, "keeps going if you leave", resume, and a notification when ready (REPORT gap 5).

## 2. Rules

- **RULE AV-01** Put the cheapest reviewable artefact (script, storyboard, first frames, set images) before the expensive generation, and make that pause the default, not an opt-in checkbox.
  **Why** Trust is won or lost at the first spend; a preview lets the user correct course for a fraction of the cost.
  **Applies to** SaaS app UI. **Check** visual: walk the default path; the first paid step must produce something reviewable before the full render. **Source** Creatify storyboard drafts, HeyGen 4 combined images, Higgsfield Hero Frame (docs); Sellify script pause defaults off (`scriptCheckRequested: false`, REPORT gap 1)
- **RULE AV-02** Generate one anchor (front view, hero frame) first, approve it, then generate the remaining views or scenes from that anchor.
  **Why** Every later output inherits the anchor's identity; approving it first avoids paying for a whole set built on a rejected face or look.
  **Applies to** SaaS app UI. **Check** visual: the step list shows an anchor step before the batch step; the batch button is disabled until the anchor is approved. **Source** Higgsfield Hero Frame approved before video (docs); RESEARCH §4 step 2
- **RULE AV-03** Show the price on the primary button before the user commits ("Make my character (N credits)"), round it up, and show the full price only on the step that spends it; after a partial run show "Charged so far" and "Rest of the video".
  **Why** A price discovered after the click feels like a trick; a price on the button is the confirmation.
  **Applies to** SaaS app UI. **Check** every generate/redo primary button label contains a cost token; cost values are integers rounded up. **Source** Higgsfield cost on the Generate/Edit button (docs); Sellify ENG-2093 pay button, ENG-2217 round up, script check "Charged so far" (REPORT)
- **RULE AV-04** Show price and wait on every template or mode card ("≈ N credits · about M min").
  **Why** The template choice sets the cost; the user should compare cost while choosing, not after.
  **Applies to** SaaS app UI. **Check** each template card contains a credits token and a duration token. **Source** Sellify ENG-2184 (#1790)
- **RULE AV-05** Template and style cards show the output moving: a 9:16 card that plays a short example on hover, and the selected template playing in the preview with its scene structure underneath.
  **Why** A still image of a different product cannot tell the user what kind of ad they will get.
  **Applies to** SaaS app UI. **Check** template card contains `<video>` or a hover-play handler; the preview shows the scene list. **Source** all four competitors show an example before choosing (docs); Sellify cards are static `next/image` (REPORT gap 2); singing style cards got an example clip (ENG-2216)
- **RULE AV-06** Start the brief from a link: "Fill from link" pulls name, photos, price and offer; the remaining brief is at most three short cards (Product, Story, Look and sound), with the look-and-sound choices collapsed to "AI picks" until opened.
  **Why** Marketers already have a product page; ~15 controls with required fields before any output reads as work.
  **Applies to** SaaS app UI, forms. **Check** count visible required controls on the brief's first screen (target <= 5); a link field is present. **Source** Creatify URL to Video "Analyze", Higgsfield URL to Ad (docs); Sellify product step ~15 controls, no URL scraping found (REPORT gap 3)
- **RULE AV-07** Start a character from one photo or from a short preset form; never require 20+ photos, a recorded video, or a sales-team hand-off on the first run. Put photo tips inline (front facing, even light, one person) and a consent line next to the upload.
  **Why** Each extra input requirement is a conversion cliff for a marketer making a first ad.
  **Applies to** SaaS app UI, forms. **Check** visual: count required uploads on the first character path (target 1). **Source** Creatify BYOA one photo, Arcads Custom Actor one headshot; avoid Higgsfield Soul ID 20-80 photos, Arcads Clone 2 min video sent to the team (RESEARCH §1-3)
- **RULE AV-08** Kill the blank page with 4-6 demo examples that autofill the form on tap, then a few chips (gender, age range, style, outfit) and one free-text "More details" field; prefill from what the product already knows (the ad's audience).
  **Why** Editing a near match is faster and better than describing from nothing; a long menu builder is too much for non-experts.
  **Applies to** SaaS app UI, forms. **Check** visual: the create screen shows tappable examples above the form. **Source** Creatify DYOA demo avatars auto-fill the prompt; avoid Higgsfield AI Influencer Builder (too granular) (RESEARCH §2-3)
- **RULE AV-09** Ask for the name after the user has seen and approved the result, as one inline action with a prefilled name ("Maya, 30s, casual"); never ask for name and demographics before showing anything.
  **Why** Naming something you have not seen is friction with no payoff.
  **Applies to** SaaS app UI. **Check** visual: no name field before the first generated preview. **Source** avoid HeyGen new-avatar form (name, age, gender first) (RESEARCH §3 Avoid 4); Sellify `SaveAvatarAction`
- **RULE AV-10** Saving makes the asset usable immediately: no human review queue between "save" and "use in my next ad".
  **Why** Reuse is the whole payoff; a 1-2 business day gate kills it.
  **Applies to** SaaS app UI. **Check** visual: after save, the item appears selectable in the next run's picker without a pending state. **Source** avoid Creatify DYOA submit for review, 1-2 business days (RESEARCH §1.1, §3)
- **RULE AV-11** Keep generated reusable assets in a dedicated library of their kind (characters, voices), not a mixed asset bin, and offer them in the next run's setup as a picker or chip row with "Create new" as the trailing item.
  **Why** Characters get lost next to uploads; the picker in setup is where reuse happens.
  **Applies to** SaaS app UI. **Check** visual: the setup step lists saved items plus a create tile. **Source** HeyGen Avatars list, Higgsfield Character tab and `@` Elements; avoid Creatify Smart Assets mixed bin (RESEARCH §2-3)
- **RULE AV-12** If a saved asset only works with some models or pipelines, say so in the picker before selection, not with a late failure.
  **Why** Silent lock-in fails at the most expensive moment.
  **Applies to** SaaS app UI. **Check** visual: incompatible items show a reason in the picker. **Source** Higgsfield Soul ID reported tied to the model it was trained in (conflicting reports) (RESEARCH §1.4, §3 Avoid 6)
- **RULE AV-13** Keep independent choices on their own step or card (voice is its own card, not a mandatory step inside character creation).
  **Why** Bundling forces decisions the user is not ready for and blocks the step that matters.
  **Applies to** SaaS app UI. **Check** visual. **Source** avoid HeyGen voice as a required creation step (RESEARCH §3 Avoid 5)
- **RULE AV-14** Own the wait: a step list ("Writing the script", "Generating scene N of M", "Rendering") with "about N min left", the line "It keeps going if you leave this page", resume from the list page, and a notification (email or push) when it is ready.
  **Why** Waits of several minutes make people leave; without a ping they do not come back.
  **Applies to** SaaS app UI. **Check** visual: the making screen has a per-step list, an ETA and a leave-safe line; a notify option exists. **Source** HeyGen "close and come back" + notification, Creatify waiting screen (docs); Sellify `video-ad-progress.ts`, no notification found (REPORT gap 5)
- **RULE AV-15** Design generating, failed and abandoned states for every generated item: per-item failure copy that says what happened and what to do ("We could not make this. Try a redo."), the last good result stays approvable, and a half-finished flow resumes as a draft marked "Needs approval".
  **Why** None of the documented competitors handles failure; silence after a spend is the worst experience in the flow.
  **Applies to** SaaS app UI. **Check** states exist in the preview route (`?state=generating|failed|...`); failure text names a next action. **Source** none of Creatify, Arcads, HeyGen, Higgsfield documents reject/retry/timeout (RESEARCH §2, §3 Avoid 8); Sellify existing copy
- **RULE AV-16** When an input is rejected (no face, several faces, too small) or credits are short, say why and what to do inline, and disable the primary button with the shortfall shown next to it.
  **Why** A disabled button without a reason is a dead end.
  **Applies to** SaaS app UI, forms. **Check** visual: low-credit and rejected-photo states show a reason string near the disabled control. **Source** RESEARCH §4 "States to design" (recommendation, no competitor evidence)
- **RULE AV-17** End the result screen with the next job, not just Download: a hero download, then a "Use your output" row (launch the campaign, save to the library, make another version), with the parts (scenes) still editable below.
  **Why** The product's advantage over standalone tools is what happens after the render.
  **Applies to** SaaS app UI. **Check** visual: the finished screen offers at least one action beyond download. **Source** Creatify editor + variations, HeyGen AI Studio, Higgsfield virality score + regenerate (docs); Sellify finished screen ends at Download (REPORT gap 4)
- **RULE AV-18** Offer edits at the smallest unit first (redo one scene or one view with a note) and make a re-render after an edit free, before offering a full regenerate.
  **Why** Regenerate-only (Higgsfield) throws away good parts; small redos keep the user's approved work.
  **Applies to** SaaS app UI. **Check** visual: each scene/view has its own redo. **Source** Higgsfield regenerate only, no editing (guide); Sellify per-scene retakes, ENG-2191 free re-render after editor edits (REPORT)
- **RULE AV-19** A saved asset has rename and delete in a three-dot menu; "edit" means reopening it and redoing one view with a note (no free-form editing in v1), and delete confirms and names what uses it.
  **Why** Cheap, expected management; honest about what can change.
  **Applies to** SaaS app UI. **Check** visual: library cards have a menu with Rename and Delete. **Source** HeyGen rename + three-dot Delete; Creatify "you can't modify an existing avatar" (RESEARCH §1); delete-names-usage is the RESEARCH §4 recommendation

## 3. Numbers & scales

| Fact | Value | Source |
|---|---|---|
| Creatify DYOA previews | 2 (feature page) or 4 (API); sources disagree | RESEARCH §1.1 |
| Creatify render time | 5-10 min | RESEARCH §1.1 |
| Creatify DYOA review gate | 1-2 business days | RESEARCH §1.1 |
| Creatify custom avatars by plan | Free 0, Starter ($19/mo) 1, Pro 3 | RESEARCH §1.1 |
| Arcads Clone Yourself input | continuous video >= 2 min (2:30 recommended), PRO only | RESEARCH §1.2 |
| Arcads clone video cost | 1,600 credits per video | RESEARCH §1.2 |
| Arcads trial | 72 h, 1,000 credits, card required; one video ~800 credits | COMPETITOR-GUIDE |
| HeyGen Look variations | 3 per generation; up to 500 Looks per avatar | RESEARCH §1.3 |
| HeyGen Product Placement preview | 4 combined images before the video | COMPETITOR-GUIDE, REPORT |
| Higgsfield Soul ID training | 20+ photos, up to 80 | RESEARCH §1.4 |
| Higgsfield AI Influencer preview | 1 preview, up to 4K | RESEARCH §1.4 |
| Higgsfield Marketing Studio clip | max 15 s (a 30 s ad = 2 parts) | RESEARCH §1.4, guide |
| Sellify brief controls | up to ~15 on one page, 3 required | REPORT gap 3 |
| Sellify typical wait | ~7 min | REPORT gap 5 |
| Sellify old full-run price | 510 credits (old branch, not re-checked; quote the app's number) | REPORT |
| Redo note length | 300 characters | RESEARCH §4 |
| Demo examples on create | 4-6 | RESEARCH §3 Copy 1 |
| Competitor run budget | $15-50 for all four | COMPETITOR-GUIDE |

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| "Write script · 1 credit" as the default first button, full price on the step that spends it | One "Make video · ≈ N credits" button that runs script, images, clips and render | Preview before spend (AV-01) |
| Front view first, other views after approval | Generate all views at once, approve or regenerate the lot | Anchor first (AV-02) |
| One photo + inline tips + consent line | 20-80 photos or a 2 min video sent to a team | Conversion cliff (AV-07) |
| Demo characters that autofill; chips + one text field | A long Face/Body/Style menu builder | Blank page vs overload (AV-08) |
| Name at the moment of approval, prefilled | Name, age, gender, ethnicity before any preview | Name what you have seen (AV-09) |
| Saved = usable now | "Submitted for review" for 1-2 business days | Reuse payoff (AV-10) |
| Characters-only library, chip row in setup | Characters mixed with uploads in one asset bin | Findability (AV-11) |
| Hover-playing 9:16 template cards | Still template images of another product | Shows the kind of ad (AV-05) |
| Result screen with Launch / Save to library / Make another version | Result screen that ends at Download | Next job (AV-17) |

## 5. Exceptions & judgement calls

- **Per-item approval vs speed.** No competitor documents per-view approve/redo; the market pattern is "generate 1-4 whole previews, pick one, save". Sellify's per-card approve or redo-with-note is stronger for control but slower. For a single-output generation (one image), a small batch to pick from (HeyGen 3, HeyGen Product Placement 4, Creatify 2-4) may be the better grammar. [engine note]
- **"No free-form edit" is a v1 choice**, honest and simple (Creatify makes the same call), not a permanent rule.
- **Higgsfield's Builder** is too long for ad marketers but right for creators building an influencer persona. Match the form depth to the audience. [engine note]
- **Default script pause adds a step** for confident users; keep a quick path ("Create it for me") for repeat users, but the first-run default is the pause. [engine note]
- **Template hover video needs real sample clips per template**; until they exist, the honest fallback is a still plus scene count, length and price, not a fake animation. [engine note]

## 6. Figures worth keeping

None captured. Sellify's own screens exist (`~/Documents/sellify sth/eng-2079-video-ux/1-our-flow/`, `4-redesign/`, 33 screens from an older branch; Figma file `2KmzMghBBamv10Zj80q6ey` sections 203:4 proposed flow, 198:4 current flow). Competitor folders `2-competitors/*` are empty.

## 7. Open questions

- **No hands-on competitor screens.** Every competitor claim is from docs. The run plan in COMPETITOR-GUIDE.md (Creatify, HeyGen, Higgsfield, Arcads, in that order) is not yet done.
- Conflicting numbers kept as conflicts: Creatify DYOA preview count (2 vs 4); Higgsfield Soul ID photo count and cost (20-80 photos vs 5; ~25 credits in one blog); HeyGen credit rates (Avatar IV ~16-20 credits/min, third party); Arcads plan credits (Starter 8,000 / Creator 16,000, reported).
- Not documented: Arcads Custom Actor creation UI and styles; Arcads and HeyGen reuse-in-later-ad selector; HeyGen text-prompt "Design with AI" steps; any competitor's loading, failure, or mobile creation flow; Creatify's reject path after review.
- HeyGen Product Placement may be paid only (guide says screenshot the paywall and fall back to Video Agent).
- Whether Sellify's "Make the scenes" cost equals estimate phases minus script and image is an assumption to confirm with engineering (frame-approval hand-over note).
