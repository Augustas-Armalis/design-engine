---
name: logo-from-image
description: Source an abstract logo mark from an image (Pinterest reference, a screenshot, a file the founder sends) and convert it into a clean single-colour SVG + React component for a build. Use when the founder says "find a logo from Pinterest", "use this image as the logo", "convert this logo to SVG", or a build needs a placeholder mark that should not be drawn from scratch.
---

# logo-from-image

The founder's call (2026-10-15): for a fictional brand, find an abstract mark on Pinterest and trace it instead of drawing one; he swaps it if he doesn't like it. For a real client mark, use `system/logo/drawing-method.md` instead.

## 1. Source the image

- **Founder sent an image:** save it to `work/<name>/brand/ref/` and go to step 2.
- **Pinterest, from the CLI** (the browser pane blocks pinterest.com; logged-out search pages don't contain pins and the JSON API returns 403). Find pins through Bing Images, which indexes `i.pinimg.com`:
  ```bash
  UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
  curl -sL -A "$UA" "https://www.bing.com/images/search?q=site%3Apinterest.com+abstract+logo+mark&count=80" \
    | grep -oE 'murl&quot;:&quot;https://i\.pinimg\.com/[^&]+' | sed 's/murl&quot;:&quot;//' | sort -u > urls.txt
  ```
  Then download each URL into a new, empty scratch folder. Use `curl -A "$UA"` because the `736x/` paths need a browser UA. If one returns 403, the `originals/` path often still works.
- **Contact sheet:** lay the downloads out in a grid and Read it. Pick a mark that:
  - is one shape, solid, high contrast, no text;
  - reads at 16px;
  - fits the product's idea (Quorum: two loops linked through the middle, "many voices, one answer");
  - is not a famous brand's mark.
- **Record the source:** keep the original in `work/<name>/brand/ref/` with its URL in `ref/SOURCE.txt`. Mark it as a placeholder in DIRECTION.md. It is never presented as client work.

## 2. Trace it

```bash
node tools/trace_logo.mjs work/<name>/brand/ref/<img> work/<name>/brand/<name>-mark.svg --sheet work/<name>/brand/trace-compare.png
```

- **How it works:** Chromium canvas, upscaled 4x, then marching squares, an undirected loop walk, smoothing, RDP and Catmull-Rom cubics. The output is one evenodd path with `fill=currentColor`, 100 units wide.
- **Ink side:** chosen automatically from the corners (light mark on dark, or dark on light).
- **Flags:**
  - `--invert yes|no` if the ink side comes out wrong;
  - `--threshold` (default 128) for a mid-grey edge;
  - `--smooth 0-4` (default 2);
  - `--eps` (simplify tolerance, default 0.35 source px; raise it for fewer nodes);
  - `--min-area` (drops specks);
  - `--pad` (viewBox breathing room).
- **Eye check:** Read the sheet (source crop | 256 | 64 | 32 | 16). It passes when the silhouette, counters and corner softness match the source and the 16px version still reads. If counters vanish or blobs merge, adjust the threshold. If curves wobble, raise `--smooth`.

## 3. Use it

- **Component:** create `<Brand>Logo.tsx` exporting a `<Mark width>` (inline path, `fill="currentColor"`, aspect from the viewBox) and a default lockup.
- **Lockup:** mark plus wordmark in the build's own type (e.g. Inter display 20/600/-0.035em) with a 10px gap. No container tile. The mark's optical height is roughly the wordmark's cap height plus 20%.
- **Where it appears:** use the same mark in the nav, the product (assistant avatar, favicon) and the closing section. One colour (ink). Accent colour only if the brand system says so.

## Founder rules this follows

- Logos are not "a letter in a container" and not compass-built road signs (`knowledge/founder/founder-taste.md`).
- A placeholder is fine for fictional work. A real client gets the drawing method.
