/**
 * squircle.ts: Apple-style continuous-curvature corners for the web.
 *
 * Path generator: Figma "corner smoothing" construction (Daniel Furse, figma.com/blog/desperately-seeking-squircles),
 * same math as the MIT `figma-squircle` package (phamfoo, src/draw.ts + distribute.ts): each corner is
 * straight edge -> cubic (curvature 0 -> 1/R) -> shortened circular arc -> mirrored cubic -> straight edge.
 * smoothing 0 = plain rounded rect, 0.6 = iOS ("xi = 0.6 just about nails the iOS shape"), 1 = no arc left.
 * A smoothed corner consumes p = (1 + smoothing) * R of each edge, so it needs more room than border-radius.
 *
 * Three ways to put it on the page (see knowledge/web/effects-materials.md, sections 2.1 and 3.1):
 *   1. native  `corner-shape: superellipse(K)` + border-radius (Chromium 139+ only, Oct 2026). Borders, box-shadow,
 *              outline, overflow and backdrop-filter follow the shape; cheapest. Use nativeCornerFor() to get K and the
 *              radius that visually matches a given Figma radius/smoothing (fitted by raster comparison, demo/build.mjs).
 *   2. svg     `clip-path: path()` regenerated on resize (ResizeObserver). clip-path clips box-shadow and border, so the
 *              border and ring are drawn as exact even-odd SVG bands and blurred shadows go on an unclipped sibling.
 *   3. mask    data-URI SVG for mask-image (static sizes: icons, avatars, tiles).
 * <Squircle mode="auto"> uses native when supported and svg otherwise.
 *
 * Erasable TypeScript only (no enums/namespaces), so Node >= 22.6 can run it with type stripping.
 */
import * as React from "react";

export interface CornerRadii {
  topLeft?: number;
  topRight?: number;
  bottomRight?: number;
  bottomLeft?: number;
}

export interface SquircleOptions {
  width: number;
  height: number;
  /** Corner radius in px (the radius of the circular arc at the corner's middle), or one per corner. */
  radius: number | CornerRadii;
  /** Figma corner smoothing 0..1. 0.6 = iOS. Default 0.6. */
  smoothing?: number;
  /**
   * When a corner has no room for (1 + smoothing) * R: true keeps the smoothing and shortens the handles (Figma's
   * "preserve smoothing"); false reduces the smoothing first (Figma default). Default false.
   */
  preserveSmoothing?: boolean;
  /** Offset the shape inward (> 0) or outward (< 0) by n px on every side; radius changes by the same n. Default 0. */
  inset?: number;
  /** Decimal places in the emitted path. Default 3. */
  precision?: number;
}

export interface CornerParams {
  a: number;
  b: number;
  c: number;
  d: number;
  p: number;
  arcSectionLength: number;
  radius: number;
  smoothing: number;
}

type CornerKey = "topLeft" | "topRight" | "bottomRight" | "bottomLeft";
const CORNERS: CornerKey[] = ["topLeft", "topRight", "bottomRight", "bottomLeft"];
const ADJACENT: Record<CornerKey, Array<{ corner: CornerKey; side: "top" | "right" | "bottom" | "left" }>> = {
  topLeft: [{ corner: "topRight", side: "top" }, { corner: "bottomLeft", side: "left" }],
  topRight: [{ corner: "topLeft", side: "top" }, { corner: "bottomRight", side: "right" }],
  bottomRight: [{ corner: "bottomLeft", side: "bottom" }, { corner: "topRight", side: "right" }],
  bottomLeft: [{ corner: "bottomRight", side: "bottom" }, { corner: "topLeft", side: "left" }],
};

const rad = (deg: number) => (deg * Math.PI) / 180;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Figma/figma-squircle corner construction for one corner, given the room ("budget") it may use along each edge. */
export function getCornerParams(radius: number, smoothing: number, budget: number, preserveSmoothing = false): CornerParams {
  let s = clamp01(smoothing);
  const R = Math.max(0, radius);
  if (R === 0) return { a: 0, b: 0, c: 0, d: 0, p: 0, arcSectionLength: 0, radius: 0, smoothing: s };
  let p = (1 + s) * R;
  if (!preserveSmoothing) {
    const maxSmoothing = budget / R - 1;
    s = Math.max(0, Math.min(s, maxSmoothing));
    p = Math.min(p, budget);
  }
  const arcMeasure = 90 * (1 - s);
  const arcSectionLength = Math.sin(rad(arcMeasure / 2)) * R * Math.SQRT2;
  const angleAlpha = (90 - arcMeasure) / 2;
  const p3ToP4 = R * Math.tan(rad(angleAlpha / 2));
  const angleBeta = 45 * s;
  const c = p3ToP4 * Math.cos(rad(angleBeta));
  const d = c * Math.tan(rad(angleBeta));
  let b = (p - arcSectionLength - c - d) / 3;
  let a = 2 * b;
  if (preserveSmoothing && p > budget) {
    const p1ToP3Max = budget - d - arcSectionLength - c;
    const minA = p1ToP3Max / 6;
    const maxB = p1ToP3Max - minA;
    b = Math.min(b, maxB);
    a = p1ToP3Max - b;
    p = Math.min(p, budget);
  }
  return { a, b, c, d, p, arcSectionLength, radius: R, smoothing: s };
}

/** Per-corner radius + budget, largest corner first (figma-squircle distributeAndNormalize). */
export function distributeCorners(width: number, height: number, radius: number | CornerRadii): Record<CornerKey, { radius: number; budget: number }> {
  const r: Record<CornerKey, number> =
    typeof radius === "number"
      ? { topLeft: radius, topRight: radius, bottomRight: radius, bottomLeft: radius }
      : { topLeft: radius.topLeft ?? 0, topRight: radius.topRight ?? 0, bottomRight: radius.bottomRight ?? 0, bottomLeft: radius.bottomLeft ?? 0 };
  for (const k of CORNERS) r[k] = Math.max(0, r[k] || 0);
  const budget: Record<CornerKey, number> = { topLeft: -1, topRight: -1, bottomRight: -1, bottomLeft: -1 };
  const order = [...CORNERS].sort((x, y) => r[y] - r[x]);
  for (const k of order) {
    const own = r[k];
    const b = Math.min(
      ...ADJACENT[k].map(({ corner, side }) => {
        const adj = r[corner];
        if (own === 0 && adj === 0) return 0;
        const sideLength = side === "top" || side === "bottom" ? width : height;
        if (budget[corner] >= 0) return sideLength - budget[corner];
        return (own / (own + adj)) * sideLength;
      }),
    );
    budget[k] = Math.max(0, b);
    r[k] = Math.min(own, budget[k]);
  }
  return {
    topLeft: { radius: r.topLeft, budget: budget.topLeft },
    topRight: { radius: r.topRight, budget: budget.topRight },
    bottomRight: { radius: r.bottomRight, budget: budget.bottomRight },
    bottomLeft: { radius: r.bottomLeft, budget: budget.bottomLeft },
  };
}

function insetRadius(radius: number | CornerRadii, inset: number): number | CornerRadii {
  if (!inset) return radius;
  const f = (v: number | undefined) => Math.max(0, (v ?? 0) - inset);
  return typeof radius === "number"
    ? f(radius)
    : { topLeft: f(radius.topLeft), topRight: f(radius.topRight), bottomRight: f(radius.bottomRight), bottomLeft: f(radius.bottomLeft) };
}

/** SVG path data for a smoothed rounded rectangle in its own coordinate box (0,0)-(width,height), offset by `inset`. */
export function getSquirclePath(opts: SquircleOptions): string {
  const inset = opts.inset ?? 0;
  const w = Math.max(0, opts.width - 2 * inset);
  const h = Math.max(0, opts.height - 2 * inset);
  const smoothing = opts.smoothing ?? 0.6;
  const prec = opts.precision ?? 3;
  const f = (v: number) => {
    const s = (Math.round(v * 10 ** prec) / 10 ** prec).toString();
    return s === "-0" ? "0" : s;
  };
  if (w === 0 || h === 0) return "";
  const dist = distributeCorners(w, h, insetRadius(opts.radius, inset));
  const q: Record<CornerKey, CornerParams> = {
    topLeft: getCornerParams(dist.topLeft.radius, smoothing, dist.topLeft.budget, opts.preserveSmoothing),
    topRight: getCornerParams(dist.topRight.radius, smoothing, dist.topRight.budget, opts.preserveSmoothing),
    bottomRight: getCornerParams(dist.bottomRight.radius, smoothing, dist.bottomRight.budget, opts.preserveSmoothing),
    bottomLeft: getCornerParams(dist.bottomLeft.radius, smoothing, dist.bottomLeft.budget, opts.preserveSmoothing),
  };
  const ox = inset, oy = inset;
  const tr = q.topRight, br = q.bottomRight, bl = q.bottomLeft, tl = q.topLeft;
  const seg: string[] = [`M${f(ox + w - tr.p)} ${f(oy)}`];
  // top-right
  if (tr.radius) seg.push(`c${f(tr.a)} 0 ${f(tr.a + tr.b)} 0 ${f(tr.a + tr.b + tr.c)} ${f(tr.d)}`, `a${f(tr.radius)} ${f(tr.radius)} 0 0 1 ${f(tr.arcSectionLength)} ${f(tr.arcSectionLength)}`, `c${f(tr.d)} ${f(tr.c)} ${f(tr.d)} ${f(tr.b + tr.c)} ${f(tr.d)} ${f(tr.a + tr.b + tr.c)}`);
  else seg.push(`l${f(tr.p)} 0`);
  seg.push(`L${f(ox + w)} ${f(oy + h - br.p)}`);
  // bottom-right
  if (br.radius) seg.push(`c0 ${f(br.a)} 0 ${f(br.a + br.b)} ${f(-br.d)} ${f(br.a + br.b + br.c)}`, `a${f(br.radius)} ${f(br.radius)} 0 0 1 ${f(-br.arcSectionLength)} ${f(br.arcSectionLength)}`, `c${f(-br.c)} ${f(br.d)} ${f(-(br.b + br.c))} ${f(br.d)} ${f(-(br.a + br.b + br.c))} ${f(br.d)}`);
  else seg.push(`l0 ${f(br.p)}`);
  seg.push(`L${f(ox + bl.p)} ${f(oy + h)}`);
  // bottom-left
  if (bl.radius) seg.push(`c${f(-bl.a)} 0 ${f(-(bl.a + bl.b))} 0 ${f(-(bl.a + bl.b + bl.c))} ${f(-bl.d)}`, `a${f(bl.radius)} ${f(bl.radius)} 0 0 1 ${f(-bl.arcSectionLength)} ${f(-bl.arcSectionLength)}`, `c${f(-bl.d)} ${f(-bl.c)} ${f(-bl.d)} ${f(-(bl.b + bl.c))} ${f(-bl.d)} ${f(-(bl.a + bl.b + bl.c))}`);
  else seg.push(`l${f(-bl.p)} 0`);
  seg.push(`L${f(ox)} ${f(oy + tl.p)}`);
  // top-left
  if (tl.radius) seg.push(`c0 ${f(-tl.a)} 0 ${f(-(tl.a + tl.b))} ${f(tl.d)} ${f(-(tl.a + tl.b + tl.c))}`, `a${f(tl.radius)} ${f(tl.radius)} 0 0 1 ${f(tl.arcSectionLength)} ${f(-tl.arcSectionLength)}`, `c${f(tl.c)} ${f(-tl.d)} ${f(tl.b + tl.c)} ${f(-tl.d)} ${f(tl.a + tl.b + tl.c)} ${f(-tl.d)}`);
  else seg.push(`l0 ${f(-tl.p)}`);
  seg.push("Z");
  return seg.join(" ");
}

/** `clip-path` value. Pixel-based: regenerate when the element resizes. */
export function squircleClipPath(opts: SquircleOptions): string {
  return `path('${getSquirclePath(opts)}')`;
}

/** Even-odd band between two offsets of the shape (outer offset -o1, inner offset +i). Used for exact borders and rings. */
export function getSquircleBandPath(opts: SquircleOptions, outerInset: number, innerInset: number): string {
  return `${getSquirclePath({ ...opts, inset: outerInset })} ${getSquirclePath({ ...opts, inset: innerInset })}`;
}

/** Static mask-image data URI (icons, avatars, fixed tiles). */
export function squircleMaskImage(opts: SquircleOptions): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${opts.width}' height='${opts.height}' viewBox='0 0 ${opts.width} ${opts.height}'><path fill='#000' d='${getSquirclePath(opts)}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Native `corner-shape` equivalent of a Figma radius + smoothing, fitted by rendering both in Chromium 156 and
 * minimising the corner pixel difference (system/effects/demo/build.mjs, table in effects-materials.md 3.1).
 * Returns the CSS superellipse parameter K (exponent = 2^K) and the border-radius to pair with it.
 */
export const NATIVE_FIT: ReadonlyArray<{ smoothing: number; k: number; radiusScale: number }> = [
  // fit.json (R = 96px, Chromium 156): below ~0.4 smoothing the best native match is plain round at the same radius.
  { smoothing: 0, k: 1, radiusScale: 1 },
  { smoothing: 0.2, k: 1, radiusScale: 1 },
  { smoothing: 0.4, k: 1, radiusScale: 1 },
  { smoothing: 0.6, k: 1.32, radiusScale: 1.2 }, // = Apple continuous corner too (same K/scale fitted to UIBezierPath)
  { smoothing: 0.8, k: 1.76, radiusScale: 1.56 },
  { smoothing: 1, k: 2.2, radiusScale: 2.14 },
];

export function nativeCornerFor(radius: number, smoothing = 0.6): { k: number; radius: number; cornerShape: string } {
  const s = clamp01(smoothing);
  const t = NATIVE_FIT;
  let i = 0;
  while (i < t.length - 2 && s > t[i + 1].smoothing) i++;
  const lo = t[i], hi = t[i + 1];
  const u = (s - lo.smoothing) / (hi.smoothing - lo.smoothing);
  const k = lo.k + (hi.k - lo.k) * u;
  const scale = lo.radiusScale + (hi.radiusScale - lo.radiusScale) * u;
  const kr = Math.round(k * 100) / 100;
  return { k: kr, radius: Math.round(radius * scale * 100) / 100, cornerShape: `superellipse(${kr})` };
}

/**
 * Plain border-radius that best approximates the squircle's silhouette (shadow layers, SSR fallback). Figma smoothing
 * keeps the corner apex where a circular radius puts it and only lengthens the run-in, so the best plain stand-in is
 * the same radius up to 0.8 smoothing and ~1.04x at 1.0 (fit.json plainRadius).
 */
export function equivalentRadius(radius: number, smoothing = 0.6): number {
  const s = clamp01(smoothing);
  return Math.round(radius * (1 + 0.04 * Math.max(0, (s - 0.6) / 0.4)) * 100) / 100;
}

export function supportsCornerShape(): boolean {
  return typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("corner-shape", "superellipse(2)");
}

// ---------------------------------------------------------------------------------------------------------------
// React wrapper
// ---------------------------------------------------------------------------------------------------------------

export interface SquircleProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: keyof React.JSX.IntrinsicElements;
  /** Arc radius in px (Figma's corner radius), or one per corner. */
  radius: number | CornerRadii;
  /** Figma corner smoothing 0..1; 0.6 = iOS. */
  smoothing?: number;
  /** "auto" = native corner-shape when supported, else svg. */
  mode?: "auto" | "native" | "svg";
  /** Fixed size (skips ResizeObserver; required for meaningful SSR output). */
  width?: number;
  height?: number;
  /** Surface fill (any CSS background). */
  fill?: string;
  /** Inner border, drawn inside the shape (like `border` with box-sizing: border-box). */
  border?: { width: number; color: string };
  /** Outer hairline ring (like `box-shadow: 0 0 0 w color`). */
  ring?: { width: number; color: string };
  /**
   * Blurred shadow layers as a CSS box-shadow list (rings excluded). In svg mode they render on an unclipped sibling
   * with an equivalent border-radius (blur >= ~4px hides the corner difference); set shadowMode="exact" to use
   * filter: drop-shadow() on the wrapper instead (follows the curve exactly, ignores spread, costs a filter pass).
   */
  shadow?: string;
  shadowMode?: "approx" | "exact";
  children?: React.ReactNode;
}

type Size = { w: number; h: number };

const useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function useElementSize(ref: React.RefObject<HTMLElement | null>, fixed?: Size): Size | null {
  const [size, setSize] = React.useState<Size | null>(fixed ?? null);
  useIsoLayoutEffect(() => {
    if (fixed) { setSize(fixed); return; }
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const read = () => {
      const w = el.offsetWidth, h = el.offsetHeight;
      setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, fixed?.w, fixed?.h]);
  return size;
}

/** box-shadow layer list -> drop-shadow() list (spread and inset layers are dropped: drop-shadow cannot express them). */
export function boxShadowToDropShadow(shadow: string): string {
  const layers = shadow.split(/,(?![^(]*\))/).map((s) => s.trim()).filter(Boolean);
  return layers
    .filter((l) => !/\binset\b/.test(l))
    .map((l) => {
      const color = (l.match(/(rgba?|hsla?|oklch|oklab|lab|lch|color)\([^)]*\)|#[0-9a-f]{3,8}\b/i) || ["rgb(0 0 0 / .1)"])[0];
      const nums = l.replace(color, "").trim().split(/\s+/).filter((t) => /^-?[\d.]+(px)?$/.test(t));
      const [x = "0", y = "0", blur = "0"] = nums;
      return `drop-shadow(${x} ${y} ${blur} ${color})`;
    })
    .join(" ");
}

export function Squircle(props: SquircleProps): React.ReactElement {
  const {
    as = "div", radius, smoothing = 0.6, mode = "auto", width, height, fill, border, ring, shadow, shadowMode = "approx",
    style, children, ...rest
  } = props;
  const ref = React.useRef<HTMLElement | null>(null);
  const fixed = width != null && height != null ? { w: width, h: height } : undefined;
  const size = useElementSize(ref, fixed);
  const [native, setNative] = React.useState(mode === "native");
  useIsoLayoutEffect(() => { setNative(mode === "native" || (mode === "auto" && supportsCornerShape())); }, [mode]);

  const uniform = typeof radius === "number" ? radius : Math.max(radius.topLeft ?? 0, radius.topRight ?? 0, radius.bottomRight ?? 0, radius.bottomLeft ?? 0);
  const base: React.CSSProperties = { position: "relative", width, height, ...style };

  if (native) {
    const nc = nativeCornerFor(uniform, smoothing);
    const perCorner = typeof radius === "number" ? undefined : {
      borderTopLeftRadius: nativeCornerFor(radius.topLeft ?? 0, smoothing).radius,
      borderTopRightRadius: nativeCornerFor(radius.topRight ?? 0, smoothing).radius,
      borderBottomRightRadius: nativeCornerFor(radius.bottomRight ?? 0, smoothing).radius,
      borderBottomLeftRadius: nativeCornerFor(radius.bottomLeft ?? 0, smoothing).radius,
    };
    const shadows = [ring ? `0 0 0 ${ring.width}px ${ring.color}` : "", shadow ?? ""].filter(Boolean).join(", ");
    const s = {
      ...base, borderRadius: nc.radius, ...perCorner, cornerShape: nc.cornerShape, background: fill,
      border: border ? `${border.width}px solid ${border.color}` : undefined, boxSizing: "border-box", overflow: "hidden",
      boxShadow: shadows || undefined,
    } as React.CSSProperties;
    return React.createElement(as, { ...rest, ref, style: s, "data-squircle": "native" }, children);
  }

  const eqR = equivalentRadius(uniform, smoothing);
  const opts = size ? { width: size.w, height: size.h, radius, smoothing } : null;
  const d = opts ? getSquirclePath(opts) : "";
  const clip = d ? `path('${d}')` : undefined;
  const kids: React.ReactNode[] = [];
  if (shadow && shadowMode === "approx") {
    kids.push(React.createElement("span", { key: "sh", "aria-hidden": true, style: { position: "absolute", inset: 0, borderRadius: eqR, boxShadow: shadow, pointerEvents: "none" } }));
  }
  kids.push(React.createElement("div", {
    key: "body",
    style: { position: "relative", width: "100%", height: "100%", background: fill, clipPath: clip, borderRadius: clip ? undefined : eqR, overflow: clip ? undefined : "hidden" },
  }, children));
  if (opts && (border || ring)) {
    const rw = ring?.width ?? 0;
    const paths: React.ReactNode[] = [];
    if (border) paths.push(React.createElement("path", { key: "b", d: getSquircleBandPath(opts, 0, border.width), fill: border.color, fillRule: "evenodd", transform: `translate(${rw} ${rw})` }));
    if (ring) paths.push(React.createElement("path", { key: "r", d: getSquircleBandPath(opts, -ring.width, 0), fill: ring.color, fillRule: "evenodd", transform: `translate(${rw} ${rw})` }));
    kids.push(React.createElement("svg", {
      key: "edge", "aria-hidden": true, width: opts.width + 2 * rw, height: opts.height + 2 * rw,
      viewBox: `0 0 ${opts.width + 2 * rw} ${opts.height + 2 * rw}`,
      style: { position: "absolute", left: -rw, top: -rw, pointerEvents: "none", overflow: "visible" },
    }, paths));
  }
  const wrapStyle: React.CSSProperties = shadow && shadowMode === "exact" ? { ...base, filter: boxShadowToDropShadow(shadow) } : base;
  return React.createElement(as, { ...rest, ref, style: wrapStyle, "data-squircle": "svg" }, kids);
}

export default Squircle;
