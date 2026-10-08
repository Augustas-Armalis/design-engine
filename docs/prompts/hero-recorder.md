# Prompt: build "Reel" (working name), a pixel-perfect hero animation recorder

Paste everything below the line into a new Claude Code chat, opened in an empty folder (for example `~/dev/reel`).

---

## What I want

Build me a product I will use every day: I paste a URL (a public site **or** a `localhost` dev server), and it records the page's load-in animation (and anything after it) as a perfectly smooth, full-quality video: 4K, 60 or 120 fps, no dropped frames, no compression mush, at the exact size and aspect ratio of my hero designs (we design heroes at 1440×900, so 16:10). Then I can trim and tweak the recording and export it in the formats I need (a master file and an X/Twitter-ready file).

Today I do this by hand with screen recording. It is slow, ugly, drops frames and can never reach full quality. This tool should make it one click.

The sites I record are built with React, Framer Motion (`motion/react`), Tailwind, CSS transitions and keyframes, SVG path animations, and sometimes WebGL/canvas shaders. Everything must be captured correctly.

## The core technical requirement: deterministic frame capture, not screen recording

Do **not** build this as a real-time screen recorder (`getDisplayMedia`, CDP `Page.startScreencast`, or OS capture). Those cannot hold 4K at 60/120 fps and they drop frames.

Instead, render frame by frame in a headless Chromium with **virtualised time**. Advance the page's clock exactly 1/fps per step, capture a lossless frame, repeat, then encode with ffmpeg. A 5-second clip at 120 fps is then exactly 600 perfect frames, however long rendering takes.

The hard part is making **every** animation source obey the virtual clock:
- `requestAnimationFrame`, `performance.now()`, `Date.now()`, `setTimeout`/`setInterval` (JS-driven animation, Framer Motion springs, count-ups)
- CSS transitions and `@keyframes`
- Web Animations API (Framer Motion runs opacity/transform on WAAPI when it can)
- SVG path animations, `<video>`, and WebGL/canvas draw loops

Before building the product, **spike and prove the capture engine**. Make a test page (in the repo, `fixtures/torture.html`) that contains one of each source above: a CSS keyframe, a CSS transition triggered on load, a WAAPI animation, a Framer Motion stagger plus a spring plus a `layoutId` move, an rAF canvas, a WebGL shader using a time uniform, an SVG `pathLength` draw, and a visible millisecond counter. Then evaluate these approaches and keep the one that is frame-exact for all of them:

1. **chrome-headless-shell with `--deterministic-mode` / `--enable-begin-frame-control` and CDP `HeadlessExperimental.beginFrame`** (screenshot returned per begin frame). This is the most promising because it drives the compositor too. Verify that it works with Playwright's or Puppeteer's bundled headless shell.
2. **CDP `Emulation.setVirtualTimePolicy`** (advance the budget per frame) combined with **CDP `Animation` domain** control (`setPlaybackRate`, `seekAnimations`) for CSS and WAAPI.
3. **timecut/timesnap-style JS time overrides** (inject before any page script: rAF, `performance.now`, `Date`, timers) plus seeking CSS/WAAPI animations via `document.getAnimations()` and setting `currentTime` on each frame.

Write down in `docs/capture-engine.md` which approach won and why, with proof:
- a contact sheet of frames from the torture page;
- a test asserting that frame N's counter shows exactly N × (1000/fps) ms;
- a test that rendering the same URL twice gives identical frames.

Make that test part of CI. Do not claim any approach works without that test passing.

Other determinism details to handle:
- Wait for `document.fonts.ready` and the network to go idle *before* time 0, without starting the clock.
- Seed `Math.random` (option to keep it real).
- Pause `<video>` and seek it per frame.
- Disable Lenis/smooth-scroll unless a scroll is scripted.
- Set `prefers-reduced-motion: no-preference` and `color-scheme` explicitly.
- Keep `deviceScaleFactor` fractional-safe.
- Use `preserveDrawingBuffer` or capture through the compositor for WebGL.

## Capture settings (per recording)

- **URL:** any http(s) URL, including `http://localhost:<port>`.
- **Viewport:** default 1440×900. Presets: 1440×900 (16:10 hero), 1920×1080, 1280×800, 390×844 (mobile).
- **Output resolution:** set by `deviceScaleFactor`, so the page renders natively at the output size, never upscaled.
  - 1440×900 at scale 2.6667 gives 3840×2400. That is "4K" for our 16:10 heroes, while true 4K UHD is 3840×2160 (16:9), so show both clearly.
  - Also offer 2× (2880×1800) and 3× (4320×2700).
- **Region:**
  - full viewport (default);
  - a CSS selector (record just that element's box, for example `main` or `#hero`);
  - a custom rectangle drawn on a preview screenshot.
  - Optional padding and background colour around a selector crop.
- **FPS:** 30, 60 or 120.
- **Timing:**
  - "start recording at" (default 0 ms = first paint after reload, so the load-in is captured);
  - "duration" (default 6 s);
  - "hold last frame" (default 0.5 s).
- **Before start:**
  - wait for selector or network idle;
  - optional scripted actions on a timeline (hover x,y at t; click selector at t; scroll to y over d ms with easing; type text). These are needed to show hover pills and interactions.
- **Theme:** light or dark `prefers-color-scheme`. Optional CSS to inject (for example to hide a cookie banner).
- **Cursor overlay (optional):** render a smooth fake cursor that follows scripted actions, so demos look intentional.

## Editing after capture

Frames are stored once, so editing never re-renders the page.
- **Timeline scrubber:** frame-accurate preview with thumbnails, and play at true speed in the browser.
- **Trim:** in and out points.
- **Speed:** 0.5× to 2× (frame resampling).
- **Freeze-frame:** hold any frame for N seconds.
- **Loop mode:** crossfade or ping-pong for seamless loops.
- **Ease-in/out fades:** from and to the background colour.
- **Poster frame:** choose one and export it as PNG.
- **Crop/reframe after capture:** within the captured area.
- **Re-record:** with the same settings in one click, and keep a history of recordings per URL.

## Export presets (ffmpeg)

- **Master:** ProRes 4444 or 422 HQ `.mov` at full resolution and native fps, and optionally a PNG sequence zip.
- **High-quality MP4:** H.264 High, `-crf 12`, `-preset slow`, `yuv420p`, `+faststart`, at native fps.
- **HEVC MP4:** 10-bit, for Apple devices.
- **WebM VP9:** for the web.
- **X/Twitter-ready MP4:** look up and cite X's *current* video upload limits (resolution, fps, bitrate, size, length) at build time, store them in a config file with the date checked, and encode to fit (likely 1920×1200 or 1920×1080, 60 fps, H.264, `yuv420p`, AAC silent track if required).
- **GIF/animated WebP** for docs: palette-optimised, at 1x.
- **Colour:** tag sRGB / BT.709 correctly (`-colorspace bt709 -color_primaries bt709 -color_trc bt709`) so colours match the browser. Verify by comparing a rendered frame's pixel values with the encoded video's decoded frame.

Stream frames into ffmpeg (`image2pipe`) where possible. A 6 s 4K clip at 120 fps is 720 PNGs (several GB), so also offer a "lossless frames on disk" mode with clean-up.

## Product shape and stack

Local-first, because localhost URLs are only reachable from my Mac. The same codebase also deploys online for public URLs.

- **Monorepo** (pnpm workspaces), TypeScript everywhere:
  - `apps/web`: Next.js (App Router) UI. Tailwind v4 + coss ui (Base UI) components; follow the global instructions in my `~/.claude/CLAUDE.md`. Design the app's own UI to a high standard: it is a tool I look at every day. Clean, light, precise, AlignUI-like.
  - `packages/capture`: the deterministic capture engine (Playwright or Puppeteer, CDP). Fully unit-tested against the torture page.
  - `packages/encode`: ffmpeg presets and pipelines. Use a system ffmpeg if present, else `ffmpeg-static`.
  - `apps/worker`: job runner with a queue. SQLite (Drizzle) for local, Postgres for hosted. Stream progress to the UI with Server-Sent Events: frames done, ETA, preview thumbnails.
  - `apps/cli`: `reel record <url> --fps 120 --scale 2.6667 --duration 6 --selector main --out hero.mov`, for scripting and for use by other tools (my design engine will call this).
- **Local mode:** `pnpm dev` starts the UI and worker on my Mac. It records localhost directly. Recordings go to `~/Movies/Reel/<date>-<slug>/`.
- **Hosted mode:**
  - A Docker image (Chromium headless shell + ffmpeg + fonts, including emoji and CJK) deployed to a container host that allows long-running jobs and enough RAM/CPU: Fly.io, Railway or Render. Pick one, explain why, and write the deploy config. Not serverless functions, because jobs run for minutes.
  - S3-compatible storage (Cloudflare R2) for renders.
  - Simple auth (only me and my team).
  - For localhost URLs while using the hosted app, document and support a tunnel: Cloudflare Tunnel `cloudflared tunnel --url http://localhost:4321`, or a tiny local "agent" that the hosted UI hands jobs to. Recommend the cleaner one.
- **Presets:** save named presets ("Hero 4K120", "X post", "Mobile 60").
- **Defaults:**
  - default preset = 1440×900, scale 2.6667, 60 fps, start 0, duration 6 s, hold 0.5 s;
  - remember the last-used settings per URL.

## Repo, CI and deploy (do all of this)

1. `git init`, sensible `.gitignore` (recordings, frames, `.env`), MIT or private licence (ask me), README with a 30-second quick start and a GIF of the tool recording itself.
2. Create the GitHub repo with `gh repo create <name> --private --source . --push`. **Ask me for the repo name and private/public before creating it.**
3. GitHub Actions:
   - lint, typecheck and unit tests;
   - the capture determinism test against `fixtures/torture.html`, run in the Docker image;
   - build and push the Docker image to GHCR on `main`.
4. Deploy to the chosen host from CI on `main`, with secrets documented in `.env.example`. **Ask me before creating any cloud account resources or anything that costs money.**
5. `docs/`: architecture, capture-engine findings, export presets with the reasoning, troubleshooting (fonts missing, WebGL black frames, huge files, localhost not reachable).

## Working method

- Start by restating the plan and the riskiest unknowns. Do the capture-engine spike first and show me proof (contact sheet + determinism test output) before building the UI.
- Commit in small steps with clear messages.
- Measure, don't guess:
  - verify output resolution and fps with `ffprobe`;
  - verify smoothness by checking that frame timestamps are evenly spaced and that no two consecutive frames are identical during motion (unless the page is genuinely still).
- Test with real pages:
  - the torture page;
  - a Framer Motion hero (I will give you a localhost URL; one example is my Kestrel hero at `http://localhost:4321`, built with Vite + React + motion);
  - two public sites with rich load-ins (for example linear.app and vercel.com).
- Never upload my recordings anywhere I did not configure.

When the first end-to-end recording works, show me:
- the ffprobe output;
- a contact sheet;
- the file sizes per preset.
