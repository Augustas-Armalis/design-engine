---
source: web:competitor desk research (Foreplay help centre and blog, Atria vendor pages + third-party reviews, Motion Sep 2024 Creative Research demo + help snippets) + Sellify Ad Spy code read 2026-10-15. Study: ~/Documents/sellify sth/eng-2080-ad-spy-research/RESEARCH.md (ENG-2080)
chapter: Ad intelligence flows (ad libraries, swipe files): search and filters, winning signals, follow brands, brand pages, boards, browser extension save, saved ad to own version
pages: n/a (web + code; no hands-on screenshots)
topic_tags: [ad-library, swipe-file, search, filters, presets, sorting, winning-signals, follow, notifications, brand-page, timeline, boards, tags, notes, sharing, browser-extension, save, recreate, brief, saas-app-ui]
status: studied
---

# Ad intelligence flows

Studied 2026-10-15 from the ENG-2080 research comparing Sellify's Ad Spy with Foreplay, Atria and Motion across six jobs: find winning ads, follow brands, study a brand page, save and organise, save from the extension, and turn a saved ad into your own. Evidence quality differs by product: **Foreplay** is documented best (a real help centre); **Motion** thinly (one Sep 2024 demo, help snippets; Creative Research is now beta); **Atria** least (most UI claims from third-party reviews, marked *(review)*). Several comparison pages are written by rival vendors, so claims about rivals are soft. No account was opened and no screenshots exist. The rules generalise to any library or research product where users find, collect and act on items (inspiration boards, template galleries, asset libraries).

## 1. Core ideas

1. **Filters must speak the user's job, not the data source.** Marketers think in creative style (UGC, testimonial, before/after) and niche; "Audience Network", "min brand followers" and "limit per brand" read as ad-ops (RESEARCH §1, gap 5).
2. **A "winner" signal is only trusted when it says what it measures.** Everyone uses longevity; Atria itself calls duration "a proxy, not proof"; sorts like "Stars" and "Top Performers" that do not explain themselves are criticised (RESEARCH §1, near misses).
3. **Cold start needs curation.** When the user does not know brand names, curated collections (Motion's named experts, Foreplay Experts, Shuffle) give them somewhere to begin (RESEARCH §1).
4. **Following should be a toggle, and then it should talk back.** Motion's Follow/Following flip is 2-3 clicks; Foreplay's is 5-6 clicks with a silent 5-10 minute wait. A followed brand that never says "3 new since you looked" makes following passive (RESEARCH §2, gap 4).
5. **A brand page needs a story, not just sections.** Foreplay's launch-cohort view with a "Winner Identified" badge answers "what did they test and what survived" in one glance; ten research chips with no "so what" do not (RESEARCH §3, gap 3).
6. **A save without intent has no memory.** Two weeks later a board of 60 ads with no tags or notes means nothing; Foreplay's tags and comments ("why I saved this") fix it (RESEARCH §4, gap 1).
7. **The extension save is a single in-page button with a visible done state.** Foreplay's button turns green; a remembered default board makes it one click (RESEARCH §5).
8. **The library's value is what you make from it.** Recreate-with-my-product is the strongest asset, but buried in a modal sidebar; lighter outputs (script, brief) serve users who want a human or a video (RESEARCH §6, gap 2).

## 2. Rules

- **RULE ADI-01** Lead the filter bar with the user's own vocabulary (creative style, niche, theme or angle) and collapse technical source filters under "Advanced".
  **Why** Users filter by how they think about the work; ad-ops terms make the library feel like a database.
  **Applies to** SaaS app UI. **Check** visual: the first visible filter group names styles/themes, not platform plumbing. **Source** Foreplay Content Style and Target Market filters, Atria "Filter by Themes"; Sellify gap 5 (RESEARCH §1)
- **RULE ADI-02** Ship 4-5 starter presets (for ads: UGC video, testimonial, offer-led, new in 7 days, longest running) beside the user's own saved presets.
  **Why** Presets the user has to build first are presets nobody uses.
  **Applies to** SaaS app UI. **Check** visual: presets are present on a fresh account. **Source** RESEARCH gap 5 fix (recommendation); Sellify already has saved filter presets
- **RULE ADI-03** Every ranking or "winning" signal says what it measures (tooltip or inline label), and longevity is labelled as a proxy.
  **Why** Opaque scores get distrusted; a stated measure gets used.
  **Applies to** SaaS app UI. **Check** each sort option and score badge has an explanation string. **Source** Atria: duration is "a proxy, not proof", "Spot Winners" with no visible reason; Foreplay "Longest Running" sort; Sellify "Stars"/"Top Performers" unexplained (RESEARCH §1, near misses)
- **RULE ADI-04** Give the empty or first search somewhere to go: curated collections, expert picks or a shuffle, never a blank grid.
  **Why** Users without brand names or keywords have no way in.
  **Applies to** SaaS app UI. **Check** visual: the library with no query shows curated content. **Source** Motion Collections by named experts, Foreplay Experts + Shuffle; Sellify Expert Picks (RESEARCH §1, §4)
- **RULE ADI-05** Search matches intent phrases ("supplement hook", "problem-aware angle") and the words spoken inside videos, not only brand names and exact keywords.
  **Why** Users describe what they want, not who made it.
  **Applies to** SaaS app UI. **Check** query a phrase that appears only in a transcript; it should return the item. **Source** Atria semantic and spoken-word search *(review)* (RESEARCH §1, feature gap 4)
- **RULE ADI-06** Follow is a one-click Follow / Following toggle wherever the entity appears (card, brand page, search result).
  **Why** Following is a lightweight bookmark; a 5-6 click flow with folders up front makes it a chore.
  **Applies to** SaaS app UI. **Check** visual: count clicks from a brand mention to followed (target 1). **Source** Motion Brand Intel Follow flips to Following, 2-3 clicks; Foreplay Spyder ~5-6 clicks (RESEARCH §2)
- **RULE ADI-07** When search misses an entity, offer "add by URL" (paste the source page) in the same dialog.
  **Why** The long tail is always missing from search; a URL fallback avoids a dead end.
  **Applies to** SaaS app UI. **Check** visual: the add flow has a URL option. **Source** Foreplay "Add Manually" with a Facebook Ad Library URL; Motion paste a Meta Ad Library URL (RESEARCH §2)
- **RULE ADI-08** At the follow moment, set every expectation: when items will appear (no silent wait), how updates arrive (digest cadence, channel), and the quota ("37 of 50 brands").
  **Why** A silent multi-minute load reads as broken; a hidden cap becomes a surprise.
  **Applies to** SaaS app UI. **Check** visual: the follow confirmation names timing, digest and quota. **Source** Foreplay 5-10 min wait after adding; Atria plan caps (1/50/100/200) shown as a feature; Sellify digest lives in settings, not the follow moment (RESEARCH §2)
- **RULE ADI-09** Followed entities carry a "N new since you looked" count, and can be grouped into folders.
  **Why** Without a new-item marker, following is passive; a flat list stops scaling past a handful.
  **Applies to** SaaS app UI. **Check** visual: the Following roster shows per-entity unseen counts and supports groups. **Source** Foreplay Spyder folders; unseen counts not documented by any competitor and not found in Sellify (RESEARCH gap 4, recommendation)
- **RULE ADI-10** Open an entity page with a tight summary of three facts above the fold (for brands: active ads, media mix, top landing pages) and lead with what they say (hooks, angles) before how many.
  **Why** The page should answer "so what" before offering depth.
  **Applies to** SaaS app UI. **Check** visual: the first viewport of the brand page has a summary row. **Source** Motion Brand Intel (active ad count, media mix donut, top landing pages); Atria leads with hooks, angles, personas (RESEARCH §3)
- **RULE ADI-11** Show change over time as a story: group items by launch cohort, mark the survivor ("Winner Identified" when one item of a cohort is still active), and offer a timeline view.
  **Why** "What did they test and what survived" is the question; a list of longest running ads cannot answer it.
  **Applies to** SaaS app UI. **Check** visual: a cohort or timeline view exists with a survivor marker. **Source** Foreplay Competitor Creative Tests + Timeline View (pan, zoom, day date picker, up to 3 years) (RESEARCH §3, gap 3)
- **RULE ADI-12** Order research sections by usefulness and do not make each tab re-ask for the same filters.
  **Why** Ten equal chips have no hierarchy; repeated filters are wasted work.
  **Applies to** SaaS app UI. **Check** visual. **Source** Foreplay four tabs each re-asking filters (avoid); Sellify ten research chips (RESEARCH §3, gap 3)
- **RULE ADI-13** The save popover captures intent: a one-line note and 2-3 tags, editable later in the detail view, and the saved view filters by tag.
  **Why** A board without notes or tags has no memory two weeks later.
  **Applies to** SaaS app UI. **Check** visual: save popover has a note field and tag input; Saved has a tag filter. **Source** Foreplay tags and comments (RESEARCH §4, gap 1)
- **RULE ADI-14** Create a board or folder inline inside the save popover, and make choosing the board the save itself.
  **Why** Leaving the save to create a board loses the item; a selection that does not save is a documented trap.
  **Applies to** SaaS app UI. **Check** visual: "New board" inside the popover; selecting a board saves. **Source** Foreplay inline New > Board/Folder; Foreplay "board selection that does not itself save" gotcha (RESEARCH §4-5)
- **RULE ADI-15** Sharing is a one-click "Copy link" on both items and boards, and saves are private by default with an explicit team view ("mine / team").
  **Why** Briefing a designer should take one click; org-wide visibility by default surprises people.
  **Applies to** SaaS app UI. **Check** visual: copy-link control on item and board; visibility default is private. **Source** Foreplay Share button + team view toggle; Motion copy link, org-wide by default (avoid) (RESEARCH §4)
- **RULE ADI-16** Say out loud that saved items are kept even if the original is removed.
  **Why** It answers the user's main fear about a swipe file.
  **Applies to** SaaS app UI. **Check** copy present in save confirmation or empty state. **Source** Atria cloud storage survives advertiser deletion (extension listing) (RESEARCH §4)
- **RULE ADI-17** The browser extension injects one save button on every item, behaves the same on every source, shows a done state on the button itself (it turns green / "Saved"), remembers a default board for one-click saves, offers inline board creation, and shows "already saved" on items saved before.
  **Why** In-page saving is the habit loop; the button state is the only confirmation the user sees.
  **Applies to** SaaS app UI, browser extensions. **Check** visual: save button state changes; already-saved items render the saved state. **Source** Foreplay Save to Foreplay (green done, default board, inline create, ~3-4 clicks or 1 with default), Atria and Motion same button on Meta and TikTok; Sellify saved-status endpoint exists (RESEARCH §5)
- **RULE ADI-18** Extension errors show inline on the button with the fix, not only a help-centre checklist.
  **Why** "Log in, disable adblock, hard refresh" in a doc does not help at the moment of failure.
  **Applies to** browser extensions. **Check** visual: a failed save renders an error state with a next step. **Source** Foreplay errors are a checklist only, no inline copy documented; Atria needs a refresh on TikTok (review) (RESEARCH §5)
- **RULE ADI-19** Put the "make my own version" action on the grid card and as the action in the post-save toast ("Saved. Recreate with your product?"), and offer lighter outputs (script, brief) beside the full recreate, with the user's brand profile prefilled and the cost shown up front.
  **Why** The best feature is wasted when it lives in a modal sidebar; not every user wants a finished ad.
  **Applies to** SaaS app UI. **Check** visual: recreate reachable from the card and the save toast; script/brief options exist. **Source** Sellify "Recreate this ad with my product" buried in the detail modal; Foreplay Briefs with brand profile prefill; Motion "Generate similar script"; Atria Clone ad (review, label VERIFY) (RESEARCH §6, gap 2)

## 3. Numbers & scales

| Fact | Value | Source |
|---|---|---|
| Foreplay Discovery library | 70M+ ads (community saves) | RESEARCH §1 |
| Atria library | 25M+ to 100M+ ads depending on page; Meta + TikTok only | RESEARCH §1 |
| Foreplay Spyder add brand | ~5-6 clicks; 5-10 min to load active ads; then daily | RESEARCH §2 |
| Foreplay Spyder history | back to Aug 2023 for 20k+ brands; timeline up to 3 years | RESEARCH §2-3 |
| Foreplay free tier | 2 tracked brands | RESEARCH §2 |
| Atria follow caps | Free 1, Core 50, Plus 100, Business 200 *(review)* | RESEARCH §2 |
| Motion follow | 2-3 clicks, Meta only | RESEARCH §2 |
| Foreplay extension save | ~3-4 clicks; 1 with a default board | RESEARCH §5 |
| Sellify brand research sections | 10 chips + 3 tabs | RESEARCH §3 |
| Starter presets suggested | 4-5 | RESEARCH gap 5 |
| Save intent fields suggested | 1 note line + 2-3 tags | RESEARCH gap 1 |

## 4. Dos and Don'ts

| Do | Don't | Why |
|---|---|---|
| Content Style, Niche, Theme filters first; technical under Advanced | "Audience Network", "min brand followers", "limit per brand" up front | User vocabulary (ADI-01) |
| "Longest running (a proxy for what works)" | "Top Performers" with no stated measure | Trust (ADI-03) |
| Follow / Following toggle on every brand mention | + > search > folder > Add, then a silent 5-10 min wait | Effort and feedback (ADI-06, ADI-08) |
| Launch cohorts with a survivor badge, timeline toggle | A flat "Longest running" list and ten equal chips | Story (ADI-11, ADI-12) |
| Note + tags in the save popover, inline new board | Boards only; board picker that does not save | Memory (ADI-13, ADI-14) |
| Private by default, team toggle, copy link | Everything shared with the whole org | Control (ADI-15) |
| Recreate on the card and in the save toast; script/brief options | Recreate only inside a modal sidebar | Reach (ADI-19) |

## 5. Exceptions & judgement calls

- **More filters is not worse.** Sellify already has more filters and presets than any competitor; the issue is order and vocabulary, not count. Keep the depth behind "Advanced". [engine note]
- **Folders for followed brands add a step**; keep folder choice optional (follow first, group later) so ADI-06's one-click toggle survives. [engine note]
- **Org-wide sharing by default** suits small teams that brief together (Motion pitches boards as designer briefs); a private default with a visible team toggle serves both. [engine note]
- **Foreplay stops at a brief document and does not generate the ad**; Atria goes reference to generation to Launch but reviewers report product distortion. A one-surface "reference to publish" flow is only good if the output keeps the product's look.

## 6. Figures worth keeping

None captured (no screenshots taken). Primary references: Foreplay help articles for Chrome Extension, Saving & Sharing Ads, Filters & Sorting, Spyder, Competitor Creative Tests, Timeline View, Briefs; Motion Creative Research demo (Sep 2024). Full link list in the source study.

## 7. Open questions

- **VERIFY** Foreplay: does Spyder offer notifications, and where do they live? (one third-party page claims email/Slack reports)
- **VERIFY** Atria: exact label and flow of "Clone ad"; what a followed brand's page looks like (no layout, charts or timeline documented).
- **VERIFY** Motion: what remains of Creative Research now that it is beta; whether the extension and Brand Intel still behave as in the Sep 2024 demo. The Motion help page returned 404 to fetch; only search snippets were read.
- Not documented for any competitor: empty, loading and error states of discovery; inline extension error copy.
- Sellify-side unknowns: whether the extension offers inline board creation and a remembered default board; whether the Following roster shows new-ad counts (not found in code).
