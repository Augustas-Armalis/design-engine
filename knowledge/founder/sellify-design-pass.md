---
source: founder
chapter: The Sellify design pass, step by step (how Augustas wants every UI task run)
pages: n/a
topic_tags: [founder, sellify, process, checklist, alignui, affectui, consistency, handoff]
status: studied
---

# Sellify design pass

This is the order every Sellify UI task follows. It was distilled from the 14-20 Oct 2026 work on Video Ad Creator (ENG-2079), Ad Spy (ENG-2080, ENG-2510), guided screens and avatars (ENG-2105) and the email system, and from every correction Augustas made along the way. Visual taste lives in `founder-taste.md`. This note is the process.

## 1. Core ideas

1. **Latest first.** Before designing, pull the latest `main` into the local design branch and read what teammates changed in the area (`git log <base>..origin/main -- <area>`). Their logic, labels, steps, prices and flags win. Restyle on top; never redesign over a teammate's decision.
2. **Whole Sellify, not one feature.** Every screen must match the rest of Sellify: the same owners, tokens, radii, type and colour roles. Compare against another live studio screen before calling it done.
3. **Competitor UX, our look.** Borrow patterns (visible actions, cost before commit, clear states) from competitors. Never borrow their visuals or rename our things. Anything that changes behaviour or naming becomes a suggestion for the owner (Christian, Aaron, Arthur), not code.
4. **Every state, every size.** A screen is not done until every step, dialog, popover, empty, loading, error, long-content and many-items state is captured at 1440, 1100, 390 and 1440 dark, and reviewed at full resolution.
5. **Feedback is a sweep, not a patch.** One comment on one crop means fixing that issue everywhere it appears in the diff, and then recording it as a rule.
6. **Show it in action.** Proof is the real route with real-looking data (upload test media through the app's own flow on localhost if needed), plus a before/after image. A gallery or a passing build is not proof.
7. **Nothing leaves the Mac without a yes.** No push, PR, Linear post, Slack message or Figma update until Augustas says so for that specific item. No AI attribution anywhere, ever.

## 2. Rules

- **RULE** [founder-process] Start every Sellify UI task by fetching `origin/main`, merging it into the local design branch, and listing teammates' commits in the area; adopt their logic and naming before touching visuals.
  **Why** "have you got the latest versions and updated what we designed to them... if christian did anything" (2026-10-20). Our Ad Spy Tests tab duplicated Aaron's ENG-2232 because the branch was a day stale.
  **Applies to** Sellify. **Check** branch is 0 behind origin/main at handoff; report lists teammate commits adopted. **Source** founder, 2026-10-19/20

- **RULE** [founder-process] Run the component checklist on every screen before handoff: shared owner and system API (no lookalikes); radius 12/16/20; type 12/14/18 at 450/500 with no tracking or leading classes; orange (brand-signal) only for data, selected and active, green only for success; one edge per box and overlay with the single overlay shadow; grey sections holding white items, with white fields inside white popups; ghost Cancel; no dead white space; long names and many items; cursor and hover on everything clickable; no clipping or horizontal scroll at 390.
  **Why** "triple check every component, then the affectui alignui style" (2026-10-20), and the repeated catches: green chart, square bars, double popup borders, white boxes in white popups, dead space under a redo note.
  **Applies to** Sellify. **Check** a written pass/fail per screen in the session report. **Source** founder, 2026-10-14..20

- **RULE** [founder-process] When a fix is asked as "the button", check the whole component around it against the checklist before calling it done.
  **Why** ENG-2510: the first round only fixed the hidden Analyze button. "did you actually fix stuff to make it properly like in our design style" led to "Your upload", empty rows dropped and the orange saved icon.
  **Applies to** Sellify. **Check** the report lists the surrounding issues found, not only the asked one. **Source** founder, 2026-10-19

- **RULE** [founder-process] For a reported bug or ticket, reproduce it on the real local route with data like the reporter's (upload through the product's own flow), then deliver a side-by-side of the reporter's screenshot and the fixed live page.
  **Why** "show me the result in action so I could see where what they were talking about" (2026-10-19).
  **Applies to** Sellify tickets. **Check** a before/after PNG exists in the ticket folder. **Source** founder, 2026-10-19

- **RULE** [founder-process] Explain status in plain words: what was asked, what was done, where it lives (branch, folder), and what Augustas has to do. No jargon dumps.
  **Why** "what are they simply so I could understand" (2026-10-20).
  **Applies to** all. **Check** each item fits in about three lines. **Source** founder, 2026-10-20

- **RULE** [founder-process] PRs only on an explicit "create a PR": base on latest main, authored as Augustas, no AI or tool tags, description from `.github/generate-pr-description.md`, screenshots on the `pr-assets` branch under `pr-<number>/`.
  **Why** "never look like it's made by not human" (2026-10-19), and the AGENTS.md screenshot rule.
  **Applies to** Sellify. **Check** `git log --format=%an` and the PR body contain no AI mention. **Source** founder, 2026-10-16/19

- **RULE** [founder-process] Never set up session-sharing tools (Traces) or anything that publishes agent sessions.
  **Why** "don't do that... let's have everything personally" (2026-10-20).
  **Applies to** all. **Check** no `traces` hooks in agent config. **Source** founder, 2026-10-20

## 3. Order of a pass

1. Pull the latest main and list teammate changes in the area.
2. Capture the "before" of every state at 4 sizes, and audit against the checklist and competitors.
3. Design on the shared owners, with new screens first and then the restyle.
4. Capture "after", self-review at full resolution, and sweep siblings for every issue found.
5. Run tests and typecheck, then commit locally (no push).
6. Write drafts (PR description, Linear comment, suggestions for the owner) in `~/Documents/sellify sth/<ticket>/`.
7. Report in plain words with before/after, then wait for "push" or "open the PR".

## 4. Component rules from the ENG-2079 review (2026-10-20)

- **RULE** [founder] No borderless filled boxes anywhere: every grey or filled box, list, value field or summary bar gets the quiet 1px border.
  **Why** "we don't really have borderless components... it should feature a border as everything else" (Story structure list, Current photo, Charged-so-far bar, Scene details fields all shipped borderless).
  **Applies to** Sellify. **Check** no element has a non-transparent background with a 0px border inside a surface. **Source** founder, 2026-10-20

- **RULE** [founder] Nested radii are concentric: inner radius = outer radius − padding between them; a nested box never looks rounder or sharper than its parent allows.
  **Why** "popups where the roundness of the rectangle is not properly configured relative to the outside box... and roundness below the video, why so much".
  **Applies to** all. **Check** computed inner radius ≈ outer radius − gap. **Source** founder, 2026-10-20

- **RULE** [founder] A choice between options that carry descriptions uses selectable option cards (icon, title, description, radio/check; selected = soft orange fill, orange border, filled orange check), not a sliding segmented control. Segmented controls are for short labels only.
  **Why** "instead of sliding, a full box or some component where you select one or another would be better UI and UX".
  **Applies to** Sellify. **Check** no segmented control has a description line under its options. **Source** founder, 2026-10-20

- **RULE** [founder] All pills and chips are one component: same height, padding and font, text vertically centred, and pills in one row share a centre line with the title beside them.
  **Why** "the length 10s and Not made, both pills and they aren't vertically spaced... you miss this A LOT".
  **Applies to** all. **Check** measure the pill boxes in a row: identical height and centre y. **Source** founder, 2026-10-20

- **RULE** [founder] Sibling collections look like one family: a populated grid uses the same tile system (columns, media ratio, chips on media, meta type) as its empty-state or template tiles.
  **Why** "why is the after for the library ass and different from the correct version which is beautiful" (library cards vs template tiles).
  **Applies to** Sellify. **Check** compare the populated and empty states side by side at 1440. **Source** founder, 2026-10-20

- **RULE** [founder] Sticky pay and action bars show key facts as small bordered pills with one quiet note line, spaced well clear of the primary button, never as two cramped text lines.
  **Why** "the bottom bar, the little text should be better spaced out... maybe some info put into pills".
  **Applies to** Sellify. **Check** the bar at 1440 and 390, with no wrapping collisions. **Source** founder, 2026-10-20

- **RULE** [founder] Any list or timeline must be designed and tested for its real range (for example 2, 5 and 12+ scenes), with no truncation that hides meaning.
  **Why** "it gets cramped for bigger videos, so think of a solution... fully configured and tested".
  **Applies to** all. **Check** screenshots at the minimum, typical and maximum counts. **Source** founder, 2026-10-20

- **RULE** [founder] Status visuals are styled with intent: done = quiet check, current = orange plus motion, pending = grey ring; no heavy black filled checks. Add tasteful motion (progress, current step, enter, selection), respecting reduced motion.
  **Why** "regarding the orange colours and use of black checkboxes, just style the colours and icons there better... and animations everywhere also cool".
  **Applies to** Sellify. **Check** the step list in light and dark. **Source** founder, 2026-10-20

- **RULE** [founder] Every confirm or cost dialog uses the full studio dialog (header, bordered summary box with the facts, footer with ghost Cancel); a bare title-line-two-buttons dialog counts as unstyled.
  **Why** "I've found a completely unstyled popup, how did you miss that".
  **Applies to** Sellify. **Check** open every dialog in the flow during the audit; none is bare. **Source** founder, 2026-10-20

- **RULE** [founder] Borders are 1px everywhere, with no 2px borders, outlines or rings on fields, dropdowns, cards, tiles or selected states. Focus = 1px edge in the focus colour plus the soft 10% halo (box-shadow); selected = 1px orange edge plus a soft halo.
  **Why** "the fucking 2 px borders... nowhere even on dropdowns, we don't have 2px borders, only 1px" (avatars redo note overlay, 2026-10-20).
  **Applies to** Sellify. **Check** no computed border/outline width of 2px or more (except intentional dividers) on any interactive or surface element, at rest and focused. **Source** founder, 2026-10-20

## 5. Rules from the ENG-2079 round-3 review (2026-10-21)

- **RULE** [founder] A pill or chip inside a selected (orange-filled) card is white with a quiet border, never orange-on-orange; on an unselected card it may be orange.
  **Why** "a fully orange pill in an orange stuff... the pill should be white if it's selected and in orange background".
  **Applies to** Sellify. **Check** selected choice cards: no chip has an orange fill. **Source** founder, 2026-10-21
- **RULE** [founder] The page's top offset to the first section equals the side gutter; spacing to the frame is equal on all sides.
  **Why** "what's up with not equal spacing to the top of the frame".
  **Applies to** all. **Check** measure top vs left offset of the first tray. **Source** founder, 2026-10-21
- **RULE** [founder] Hint and error text sits a small consistent gap (about 6px) below its field, never touching it.
  **Why** "below input fields there should be a little gap, not literally nothing".
  **Applies to** all. **Check** gap between a field's bottom and its hint is 4-8px. **Source** founder, 2026-10-21
- **RULE** [founder] Media review grids show images at their real aspect ratio and are designed for volume (1, 3, 12, 20+), with aligned actions, a counter and bulk approve; long status or error messages live in one bordered status box and never shift the actions.
  **Why** "the image reviews with their size and what if there would be more and aspect ratio... the layout with errors, it fucks it up".
  **Applies to** Sellify. **Check** grid screenshots at 3, 12 and 20 items, plus a tile with a long error. **Source** founder, 2026-10-21
- **RULE** [founder] No native, unstyled media controls: audio and video players use the kit player (round play button, thin progress, tabular time).
  **Why** "is there a way to style that audio too?".
  **Applies to** Sellify. **Check** no `<audio controls>` in product UI. **Source** founder, 2026-10-21
- **RULE** [founder] Nothing overlaps or overflows its container: step trays, pills and labels truncate or scroll instead; test the longest real list (for example 8 steps).
  **Why** "small thing being overlapping stuff somewhere" (the current step pill overflowed the 8-step drama tray).
  **Applies to** all. **Check** a computed check that every child rect stays inside its parent's padding box. **Source** founder, 2026-10-21
- **RULE** [founder] Fields are never white on white: a field on a white surface (card, table, dialog) is grey with a 1px border.
  **Why** "the input fields white on white is not our thing" (the shot-plan model selects).
  **Applies to** Sellify. **Check** a field's background differs from its parent surface. **Source** founder, 2026-10-21
