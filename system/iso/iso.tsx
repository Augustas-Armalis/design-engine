/**
 * iso.tsx: precise isometric line-art kit (React + SVG, no dependencies).
 *
 * Read knowledge/web/isometric-line-art.md first (rules ISO-01..). The method in one line: every coordinate is
 * computed in world space (x right-down, y left-down, z up), projected to screen space in JS, and emitted as plain
 * screen-space path data. No SVG transform ever touches a stroked element, so stroke widths, dash lengths and node
 * sizes are exact screen pixels and identical across every object in the scene (ISO-03).
 *
 * Curves are exact: a circle or rounded corner is built from cubic Beziers in the object's own plane and the
 * control points are projected. A parallel projection is affine and affine maps preserve Beziers, so a projected
 * rounded rect is the true projection, not an approximation (ISO-04).
 *
 * Projections: "iso" = true isometric, axes at 30deg, 1.732:1 diamonds (Kargul, Opero, ChatSheet, Boomtax).
 *              "dimetric" = 2:1 pixel dimetric, axes at 26.565deg (Linear FIG triptych), crisper 1px diagonals.
 *
 * Erasable TypeScript only (no enums/namespaces).
 */
import * as React from "react";

/* ------------------------------------------------------------------------------------------------ projection */

export type V3 = readonly [number, number, number];
export type Pt = { x: number; y: number };
export type ProjectionKind = "iso" | "dimetric";

export interface Projector {
  kind: ProjectionKind;
  /** px per world unit along an axis (world units are drawn at true length, isometric-drawing convention) */
  scale: number;
  origin: Pt;
  ex: Pt;
  ey: Pt;
  ez: Pt;
  p: (x: number, y: number, z?: number) => Pt;
  pv: (v: V3) => Pt;
  /** screen angle of the x axis in degrees (30 or 26.565) */
  angle: number;
}

/**
 * Build a projector. iso: ex = (cos30, sin30), ez = (0, -1). dimetric 2:1: ex = (2,1)/sqrt5, and the vertical axis is
 * scaled by cos(30deg)/|x axis| = 1.0954 so a cube stays a cube (orthographic view at 30deg elevation, 45deg azimuth).
 * snap: round every output point to the nearest 0.5px (use for 1x screens and 1px strokes; see ISO-05).
 */
export function makeProjector(opts: {
  kind?: ProjectionKind;
  scale?: number;
  origin?: Pt;
  snap?: boolean;
} = {}): Projector {
  const kind = opts.kind ?? "iso";
  const s = opts.scale ?? 1;
  const o = opts.origin ?? { x: 0, y: 0 };
  const a = kind === "iso" ? Math.PI / 6 : Math.atan(0.5);
  const zk = kind === "iso" ? 1 : Math.cos(Math.PI / 6) / Math.sqrt(0.5 + 0.5 * 0.25);
  const ex = { x: Math.cos(a) * s, y: Math.sin(a) * s };
  const ey = { x: -Math.cos(a) * s, y: Math.sin(a) * s };
  const ez = { x: 0, y: -zk * s };
  const r = (n: number) => (opts.snap ? Math.round(n * 2) / 2 : Math.round(n * 1000) / 1000);
  const p = (x: number, y: number, z = 0): Pt => ({
    x: r(o.x + x * ex.x + y * ey.x + z * ez.x),
    y: r(o.y + x * ex.y + y * ey.y + z * ez.y),
  });
  return { kind, scale: s, origin: o, ex, ey, ez, p, pv: (v) => p(v[0], v[1], v[2]), angle: (a * 180) / Math.PI };
}

/** One-off projection with the default true-isometric projector. */
export function project(x: number, y: number, z = 0, kind: ProjectionKind = "iso", scale = 1): Pt {
  return makeProjector({ kind, scale }).p(x, y, z);
}

/* ------------------------------------------------------------------------------------------------ planes + paths */

/** A plane in world space: point(a, b) = o + a*u + b*v. */
export interface Plane {
  o: V3;
  u: V3;
  v: V3;
}
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
export const planePoint = (pl: Plane, a: number, b: number): V3 => add(pl.o, add(mul(pl.u, a), mul(pl.v, b)));

/** Top face at height z (a along +x, b along +y). */
export const topPlane = (x = 0, y = 0, z = 0): Plane => ({ o: [x, y, z], u: [1, 0, 0], v: [0, 1, 0] });
/** Screen-left face (constant y), a along +x, b downward (-z). */
export const leftPlane = (x = 0, y = 0, z = 0): Plane => ({ o: [x, y, z], u: [1, 0, 0], v: [0, 0, -1] });
/** Screen-right face (constant x), a along -y (so text reads left to right), b downward (-z). */
export const rightPlane = (x = 0, y = 0, z = 0): Plane => ({ o: [x, y, z], u: [0, -1, 0], v: [0, 0, -1] });
/** Upright sheet at constant x, a along +y, b downward: the face seen on the screen-right of an object. */
export const wallPlane = (x = 0, y = 0, z = 0): Plane => ({ o: [x, y, z], u: [0, 1, 0], v: [0, 0, -1] });

const f = (n: number) => String(Math.round(n * 100) / 100);
const ptStr = (p: Pt) => `${f(p.x)} ${f(p.y)}`;

/** Polyline / polygon through world points. */
export function polyPath(P: Projector, pts: V3[], close = false): string {
  return pts.map((v, i) => (i ? "L" : "M") + ptStr(P.pv(v))).join(" ") + (close ? " Z" : "");
}

const K = 0.5522847498; // cubic circle constant

/** Rounded rectangle drawn in a plane, projected exactly (cubic corners). r is clamped to half the short side. */
export function planeRoundRect(P: Projector, pl: Plane, a: number, b: number, w: number, h: number, r = 0): string {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  const q = (u: number, v: number) => ptStr(P.pv(planePoint(pl, a + u, b + v)));
  if (rr === 0) return `M${q(0, 0)} L${q(w, 0)} L${q(w, h)} L${q(0, h)} Z`;
  const k = rr * (1 - K);
  return [
    `M${q(rr, 0)}`,
    `L${q(w - rr, 0)}`,
    `C${q(w - k, 0)} ${q(w, k)} ${q(w, rr)}`,
    `L${q(w, h - rr)}`,
    `C${q(w, h - k)} ${q(w - k, h)} ${q(w - rr, h)}`,
    `L${q(rr, h)}`,
    `C${q(k, h)} ${q(0, h - k)} ${q(0, h - rr)}`,
    `L${q(0, rr)}`,
    `C${q(0, k)} ${q(k, 0)} ${q(rr, 0)}`,
    "Z",
  ].join(" ");
}

/** Circle of radius r centred at (ca, cb) in a plane; projects to an exact ellipse (iso: 1.732:1 on the top plane). */
export function planeCircle(P: Projector, pl: Plane, ca: number, cb: number, r: number): string {
  const q = (u: number, v: number) => ptStr(P.pv(planePoint(pl, ca + u, cb + v)));
  const k = r * K;
  return [
    `M${q(r, 0)}`,
    `C${q(r, k)} ${q(k, r)} ${q(0, r)}`,
    `C${q(-k, r)} ${q(-r, k)} ${q(-r, 0)}`,
    `C${q(-r, -k)} ${q(-k, -r)} ${q(0, -r)}`,
    `C${q(k, -r)} ${q(r, -k)} ${q(r, 0)}`,
    "Z",
  ].join(" ");
}

/** Sample a plane rounded rect as world points (used to find silhouettes for side faces). */
function sampleRoundRect(pl: Plane, a: number, b: number, w: number, h: number, r: number, n = 12): V3[] {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  const out: V3[] = [];
  const corner = (cx: number, cy: number, a0: number) => {
    if (rr === 0) {
      out.push(planePoint(pl, a + cx, b + cy));
      return;
    }
    for (let i = 0; i <= n; i++) {
      const t = a0 + (i / n) * (Math.PI / 2);
      out.push(planePoint(pl, a + cx + Math.cos(t) * rr, b + cy + Math.sin(t) * rr));
    }
  };
  corner(w - rr, rr, -Math.PI / 2); // top-right in plane (a max, b min)
  corner(w - rr, h - rr, 0);
  corner(rr, h - rr, Math.PI / 2);
  corner(rr, rr, Math.PI);
  return out;
}

/**
 * Orthogonal route through world points with rounded elbows (radius in world units), projected exactly.
 * Use for cables and connectors that run along the iso axes (Boomtax, Opero).
 */
export function routePath(P: Projector, pts: V3[], radius = 6): string {
  if (pts.length < 2) return "";
  const parts: string[] = [`M${ptStr(P.pv(pts[0]))}`];
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1], b = pts[i], c = pts[i + 1];
    const d1 = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const d2 = Math.hypot(c[0] - b[0], c[1] - b[1], c[2] - b[2]);
    const r = Math.min(radius, d1 / 2, d2 / 2);
    const p1 = add(b, mul(add(a, mul(b, -1)), r / d1));
    const p2 = add(b, mul(add(c, mul(b, -1)), r / d2));
    const c1 = add(p1, mul(add(b, mul(p1, -1)), K));
    const c2 = add(p2, mul(add(b, mul(p2, -1)), K));
    parts.push(`L${ptStr(P.pv(p1))}`, `C${ptStr(P.pv(c1))} ${ptStr(P.pv(c2))} ${ptStr(P.pv(p2))}`);
  }
  parts.push(`L${ptStr(P.pv(pts[pts.length - 1]))}`);
  return parts.join(" ");
}

/* ------------------------------------------------------------------------------------------------ theme */

export type IsoMode = "dark" | "light";

/** Measured stroke/fill ladder (see isometric-line-art.md section 3). Dark ranks by alpha at one weight; light by weight + grey. */
export interface IsoTheme {
  mode: IsoMode;
  bg: string;
  top: string; // plate top face
  topFocal: string; // top face of the one focal object
  left: string; // screen-left side face (shade side)
  right: string; // screen-right side face (lit side, grain)
  shadow: string; // flat cast shadow (light) / hatch ink (dark)
  hatch: string;
  grain: number; // grain opacity 0..1
  ink: string; // base stroke colour
  focal: { c: string; w: number };
  primary: { c: string; w: number };
  secondary: { c: string; w: number };
  detail: { c: string; w: number };
  guide: { c: string; w: number; dash: string };
  grid: { c: string; w: number; dash: string };
  nodeOn: string;
  nodeOff: string;
  accent: string;
  label: string;
  labelBg: string;
}

export function isoTheme(mode: IsoMode, accent?: string): IsoTheme {
  if (mode === "dark") {
    return {
      mode,
      bg: "#313131",
      top: "#2e2e2e",
      topFocal: "#2e2e2e",
      left: "#2a2a2a",
      right: "#333333",
      shadow: "rgba(0,0,0,0.30)",
      hatch: "rgba(0,0,0,0.34)",
      grain: 0.22,
      ink: "#ffffff",
      focal: { c: "rgba(255,255,255,0.66)", w: 1 },
      primary: { c: "rgba(255,255,255,0.42)", w: 1 },
      secondary: { c: "rgba(255,255,255,0.28)", w: 1 },
      detail: { c: "rgba(255,255,255,0.28)", w: 1 },
      guide: { c: "rgba(255,255,255,0.18)", w: 1, dash: "4 2" },
      grid: { c: "rgba(255,255,255,0.12)", w: 1, dash: "1 4" },
      nodeOn: "#d9d9d9",
      nodeOff: "rgba(255,255,255,0.28)",
      accent: accent ?? "#ffffff",
      label: "rgba(255,255,255,0.72)",
      labelBg: "#2a2a2a",
    };
  }
  return {
    mode,
    bg: "#ffffff",
    top: "#ffffff",
    topFocal: "#ffffff",
    left: "#f3f3f3",
    right: "#fafafa",
    shadow: "rgba(17,17,17,0.06)",
    hatch: "rgba(17,17,17,0.16)",
    grain: 0.18,
    ink: "#111111",
    focal: { c: "#1e1e1e", w: 1.5 },
    primary: { c: "rgba(17,17,17,0.78)", w: 1.25 },
    secondary: { c: "rgba(17,17,17,0.42)", w: 1 },
    detail: { c: "rgba(17,17,17,0.40)", w: 1 },
    guide: { c: "rgba(17,17,17,0.30)", w: 1, dash: "5 4" },
    grid: { c: "rgba(17,17,17,0.14)", w: 1, dash: "1 4" },
    nodeOn: "#1e1e1e",
    nodeOff: "rgba(17,17,17,0.30)",
    accent: accent ?? "#1e1e1e",
    label: "#1e1e1e",
    labelBg: "#ffffff",
  };
}

export type Level = "focal" | "primary" | "secondary" | "detail";

/* ------------------------------------------------------------------------------------------------ scene context */

interface IsoCtx {
  P: Projector;
  T: IsoTheme;
  id: (name: string) => string;
}
const Ctx = React.createContext<IsoCtx | null>(null);
export function useIso(): IsoCtx {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("iso primitives must be rendered inside <IsoScene>");
  return c;
}

/** Shared stroke props: one cap/join rule, non-scaling stroke as a guard if the svg is ever scaled (ISO-03). */
function strokeOf(T: IsoTheme, level: Level, extra: React.SVGProps<SVGPathElement> = {}): React.SVGProps<SVGPathElement> {
  const s = T[level];
  return {
    fill: "none",
    stroke: s.c,
    strokeWidth: s.w,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    vectorEffect: "non-scaling-stroke",
    ...extra,
  };
}

export interface IsoSceneProps {
  width: number;
  height: number;
  mode?: IsoMode;
  kind?: ProjectionKind;
  /** screen position of world (0,0,0); default centre */
  origin?: Pt;
  scale?: number;
  snap?: boolean;
  accent?: string;
  /** fade the whole scene out toward the cell edges (ISO-14); 0 = off, 0.6 = Kargul-like */
  edgeFade?: number;
  /** paint the background colour (off when the cell already has it) */
  background?: boolean;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Root. Renders an <svg> at 1:1 (width = viewBox width, ISO-03), the shared defs (grain, dot patterns, fades) and
 * the projector context. Draw order is the child order: guides and grid first, back objects before front ones.
 */
export function IsoScene(props: IsoSceneProps) {
  const { width, height, mode = "dark", kind = "iso", scale = 1, snap = false, edgeFade = 0 } = props;
  const uid = React.useId().replace(/:/g, "");
  const P = React.useMemo(
    () => makeProjector({ kind, scale, snap, origin: props.origin ?? { x: width / 2, y: height / 2 } }),
    [kind, scale, snap, props.origin?.x, props.origin?.y, width, height],
  );
  const T = React.useMemo(() => isoTheme(mode, props.accent), [mode, props.accent]);
  const ctx = React.useMemo<IsoCtx>(() => ({ P, T, id: (n) => `${uid}-${n}` }), [P, T, uid]);
  const id = ctx.id;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={props.className}
      style={{ display: "block", overflow: "visible", ...props.style }}
      role={props.title ? "img" : undefined}
      aria-label={props.title}
      aria-hidden={props.title ? undefined : true}
      shapeRendering="geometricPrecision"
    >
      <defs>
        {/* film grain: alpha noise, used on lit faces and text bars (Kargul) */}
        <filter id={id("grain")} x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves={1} seed={7} result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values={
              mode === "dark"
                ? "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 2.2 -1.1"
                : "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.2 -1.1"
            }
          />
        </filter>
        {/* square 1px dots, 5px pitch, screen space */}
        <pattern id={id("dots")} width={5} height={5} patternUnits="userSpaceOnUse">
          <rect x={2} y={2} width={1} height={1} fill={T.ink} />
        </pattern>
        {/* dense halftone, 3px pitch */}
        <pattern id={id("dots3")} width={3} height={3} patternUnits="userSpaceOnUse">
          <rect x={1} y={1} width={1} height={1} fill={T.ink} />
        </pattern>
        <radialGradient id={id("fadeG")} cx="50%" cy="50%" r="50%">
          <stop offset={0} stopColor="#fff" stopOpacity={1} />
          <stop offset={Math.max(0.05, 1 - edgeFade)} stopColor="#fff" stopOpacity={1} />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <mask id={id("fade")} maskUnits="userSpaceOnUse" x={0} y={0} width={width} height={height}>
          <rect width={width} height={height} fill={edgeFade > 0 ? `url(#${id("fadeG")})` : "#fff"} />
        </mask>
      </defs>
      {props.background && <rect width={width} height={height} fill={T.bg} />}
      <Ctx.Provider value={ctx}>
        <g mask={edgeFade > 0 ? `url(#${id("fade")})` : undefined}>{props.children}</g>
      </Ctx.Provider>
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------ fills */

/** Hatch: parallel lines at a screen angle, clipped to a path. spacing in px (Kargul shade face: 3px, 30deg). */
export function Hatch(props: { d: string; angle?: number; spacing?: number; color?: string; width?: number; bbox?: [number, number, number, number] }) {
  const { T, id } = useIso();
  const cid = id("h" + hash(props.d));
  const ang = ((props.angle ?? 30) * Math.PI) / 180;
  const sp = props.spacing ?? 3;
  const [bx, by, bw, bh] = props.bbox ?? bboxOf(props.d);
  const cx = bx + bw / 2, cy = by + bh / 2, R = Math.hypot(bw, bh) / 2 + sp;
  const dx = Math.cos(ang), dy = Math.sin(ang), nx = -dy, ny = dx;
  const segs: string[] = [];
  for (let t = -R; t <= R; t += sp) {
    const px = cx + nx * t, py = cy + ny * t;
    segs.push(`M${f(px - dx * R)} ${f(py - dy * R)}L${f(px + dx * R)} ${f(py + dy * R)}`);
  }
  return (
    <g>
      <clipPath id={cid}>
        <path d={props.d} />
      </clipPath>
      <path
        d={segs.join("")}
        clipPath={`url(#${cid})`}
        fill="none"
        stroke={props.color ?? T.hatch}
        strokeWidth={props.width ?? 1}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

/** Grain or dot fill inside a path. kind: grain (stipple noise) | dots (5px) | dots3 (3px halftone). */
export function Texture(props: { d: string; kind?: "grain" | "dots" | "dots3"; opacity?: number }) {
  const { T, id } = useIso();
  const kind = props.kind ?? "grain";
  const cid = id("t" + hash(props.d + kind));
  const [x, y, w, h] = bboxOf(props.d);
  return (
    <g>
      <clipPath id={cid}>
        <path d={props.d} />
      </clipPath>
      {kind === "grain" ? (
        <rect x={x} y={y} width={w} height={h} filter={`url(#${id("grain")})`} clipPath={`url(#${cid})`} opacity={props.opacity ?? T.grain} />
      ) : (
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id(kind)})`} clipPath={`url(#${cid})`} opacity={props.opacity ?? 0.22} />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------------------------------------ primitives */

export interface PlateProps {
  /** world position of the plate's min corner (bottom of the slab) */
  at: V3;
  /** footprint along x and y */
  w: number;
  d: number;
  /** thickness (z). 0 = a flat sheet with no side faces */
  h?: number;
  /** in-plane corner radius in world units */
  r?: number;
  level?: Level;
  /** top-face fill override, e.g. the accent for the one answer object (ISO-12) */
  topFill?: string;
  /** side treatment: hatch the shade face and grain the lit face (Kargul); flat = plain fills */
  sides?: "kargul" | "flat";
  /** draw diamond nodes on the four top corners (only meaningful with r = 0) */
  cornerNodes?: boolean | "on" | "off";
  /** dashed vertical corner edges instead of solid (Kargul exploded layer look) */
  dashedEdges?: boolean;
  /** flat cast shadow offset (light mode), in world units along +x/+y on the ground (z = 0) */
  shadow?: number;
  children?: React.ReactNode;
}

/**
 * Plate: rounded iso slab with true side faces. The visible side band is found from the projected silhouette of the
 * rounded footprint (leftmost -> front -> rightmost), so it is exact for any radius; it is split at the front point
 * into a shade face (screen-left) and a lit face (screen-right).
 */
export function Plate(props: PlateProps) {
  const { P, T } = useIso();
  const { at, w, d, h = 0, r = 0, level = "primary", sides = "kargul" } = props;
  const [x, y, z] = at;
  const topPl = topPlane(x, y, z + h);
  const topD = planeRoundRect(P, topPl, 0, 0, w, d, r);
  let leftD = "", rightD = "", bottomD = "";
  let edges: string[] = [];
  if (h > 0) {
    const ring = sampleRoundRect(topPl, 0, 0, w, d, r).map((v) => P.pv(v));
    const drop = { x: P.ez.x * -h, y: P.ez.y * -h };
    let li = 0, ri = 0, fi = 0;
    ring.forEach((p, i) => {
      if (p.x < ring[li].x - 1e-6) li = i;
      if (p.x > ring[ri].x + 1e-6) ri = i;
      if (p.y > ring[fi].y + 1e-6) fi = i;
    });
    // the visible lower chain is the ring walk between two silhouette points that runs through the front
    // (larger mean screen y); the other walk is the hidden back edge
    const walk = (from: number, to: number) => {
      const n = ring.length;
      const fwd: Pt[] = [], bwd: Pt[] = [];
      for (let i = from; ; i = (i + 1) % n) { fwd.push(ring[i]); if (i === to) break; }
      for (let i = from; ; i = (i - 1 + n) % n) { bwd.push(ring[i]); if (i === to) break; }
      const mean = (c: Pt[]) => c.reduce((t, p) => t + p.y, 0) / c.length;
      return mean(fwd) >= mean(bwd) ? fwd : bwd;
    };
    const band = (chain: Pt[]) =>
      "M" + chain.map(ptStr).join(" L") + " L" + chain.slice().reverse().map((p) => ptStr({ x: p.x + drop.x, y: p.y + drop.y })).join(" L") + " Z";
    const lChain = walk(li, fi), rChain = walk(fi, ri);
    leftD = band(lChain);
    rightD = band(rChain);
    const full = walk(li, ri);
    bottomD = "M" + full.map((p) => ptStr({ x: p.x + drop.x, y: p.y + drop.y })).join(" L");
    const vert = (p: Pt) => `M${ptStr(p)} L${ptStr({ x: p.x + drop.x, y: p.y + drop.y })}`;
    edges = [vert(ring[li]), vert(ring[ri])];
    if (r <= 1) edges.push(vert(ring[fi]));
  }
  const s = strokeOf(T, level);
  const nodes = props.cornerNodes
    ? ([[0, 0], [w, 0], [w, d], [0, d]] as const).map(([a, b], i) => (
        <Node key={i} at={[x + a, y + b, z + h]} tone={props.cornerNodes === "off" ? "off" : "on"} />
      ))
    : null;
  return (
    <g>
      {props.shadow ? (
        <path
          d={planeRoundRect(P, topPlane(x + props.shadow * 0.35, y + props.shadow, 0), 0, 0, w, d, r)}
          fill={T.shadow}
        />
      ) : null}
      {h > 0 && (
        <>
          <path d={leftD} fill={T.left} />
          <path d={rightD} fill={T.right} />
          {sides === "kargul" && (
            <>
              <Hatch d={leftD} angle={P.angle} spacing={3} />
              <Texture d={rightD} kind="grain" />
            </>
          )}
          <path d={bottomD} {...strokeOf(T, level === "focal" ? "primary" : "secondary")} />
          {edges.map((e, i) => (
            <path key={i} d={e} {...s} strokeDasharray={props.dashedEdges ? "2 1" : undefined} strokeLinecap={props.dashedEdges ? "butt" : "round"} />
          ))}
        </>
      )}
      <path d={topD} fill={props.topFill ?? (level === "focal" ? T.topFocal : T.top)} />
      {props.children}
      <path d={topD} {...s} />
      {nodes}
    </g>
  );
}

/** Box / Tower: an extruded prism (a Plate with height). Tower = small footprint, tall, small radius. */
export function Box(props: Omit<PlateProps, "h"> & { h: number }) {
  return <Plate r={2} {...props} />;
}
export function Tower(props: { at: V3; size?: number; h: number; level?: Level; topFill?: string; sides?: "kargul" | "flat" }) {
  const s = props.size ?? 24;
  return <Plate at={props.at} w={s} d={s} h={props.h} r={2.5} level={props.level} topFill={props.topFill} sides={props.sides} />;
}

/** Node: a square drawn in a plane (diamond on the top plane). size = side in world units (Kargul: 6 -> 10.4x6px). */
export function Node(props: { at: V3; size?: number; plane?: "top" | "left" | "right"; tone?: "on" | "off" | "accent"; ring?: boolean }) {
  const { P, T } = useIso();
  const s = props.size ?? 6;
  const [x, y, z] = props.at;
  const pl =
    props.plane === "left" ? leftPlane(x - s / 2, y, z + s / 2) : props.plane === "right" ? rightPlane(x, y + s / 2, z + s / 2) : topPlane(x - s / 2, y - s / 2, z);
  const fill = props.tone === "accent" ? T.accent : props.tone === "off" ? T.nodeOff : T.nodeOn;
  const d = planeRoundRect(P, pl, 0, 0, s, s, 0);
  return props.ring ? (
    <path d={planeCircle(P, topPlane(x, y, z), 0, 0, s / 2)} fill={T.bg} {...strokeOf(T, "focal")} />
  ) : (
    <path d={d} fill={fill} />
  );
}

/** Plus mark at a world point (iso-aligned arms), the Opero grid-intersection marker. */
export function Plus(props: { at: V3; arm?: number; level?: Level }) {
  const { P, T } = useIso();
  const a = props.arm ?? 3;
  const [x, y, z] = props.at;
  return (
    <path d={`${polyPath(P, [[x - a, y, z], [x + a, y, z]])} ${polyPath(P, [[x, y - a, z], [x, y + a, z]])}`} {...strokeOf(T, props.level ?? "secondary")} />
  );
}

export interface StackProps {
  at: V3;
  w: number;
  d: number;
  layers: number;
  /** vertical distance between layer tops (world units). Kargul exploded: ~0.37 x side; packed: = thickness */
  gap: number;
  thickness?: number;
  r?: number;
  /** index of the layer drawn as focal (default top) */
  focal?: number;
  /** dashed connectors between layer corners (exploded view) */
  connectors?: boolean;
  /** render callback for the top face content of layer i */
  content?: (i: number) => React.ReactNode;
}

/** Stack: exploded layers (bottom first) with dashed vertical connectors and corner nodes, focal layer brightest. */
export function Stack(props: StackProps) {
  const { P, T } = useIso();
  const { at, w, d, layers, gap, thickness = 0, r = 0 } = props;
  const focal = props.focal ?? layers - 1;
  const [x, y, z] = at;
  const out: React.ReactNode[] = [];
  for (let i = 0; i < layers; i++) {
    const zi = z + i * gap;
    if (props.connectors && i > 0) {
      const z0 = z + (i - 1) * gap + thickness;
      const corners: [number, number][] = [[0, 0], [w, 0], [w, d], [0, d]];
      out.push(
        <path
          key={"c" + i}
          d={corners.map(([a, b]) => polyPath(P, [[x + a, y + b, z0], [x + a, y + b, zi]])).join(" ")}
          {...strokeOf(T, "secondary")}
          strokeDasharray="2 2"
          strokeLinecap="butt"
        />,
      );
    }
    const lvl: Level = i === focal ? "focal" : i > focal ? "primary" : "secondary";
    out.push(
      <Plate key={i} at={[x, y, zi]} w={w} d={d} h={thickness} r={r} level={lvl} cornerNodes={r <= 1 ? (i === focal ? "on" : "off") : false}>
        {props.content?.(i)}
      </Plate>,
    );
  }
  return <g>{out}</g>;
}

export interface CardProps {
  at: V3;
  w?: number;
  d?: number;
  rows?: number;
  /** row index drawn in the accent (the answer, ISO-12) */
  highlight?: number;
  level?: Level;
  title?: boolean;
  chips?: number;
  h?: number;
}

/** Card: a UI card lying on a thin plate. Header bar (grain), rows with iso avatars (projected circles) and bars, chips. */
export function Card(props: CardProps) {
  const { P, T } = useIso();
  const { at, w = 150, d = 110, rows = 3, level = "focal", chips = 2, h = 4 } = props;
  const [x, y, z] = at;
  const pl = topPlane(x, y, z + h);
  const pad = 10;
  const items: React.ReactNode[] = [];
  let b = pad;
  if (props.title !== false) {
    const bar = planeRoundRect(P, pl, pad, b, w * 0.42, 6, 1.5);
    items.push(<Texture key="tb" d={bar} kind="grain" opacity={T.mode === "dark" ? 0.5 : 0.4} />, <path key="tbs" d={bar} {...strokeOf(T, "detail")} />);
    b += 16;
  }
  const rowH = (d - b - pad - (chips ? 14 : 0)) / rows;
  for (let i = 0; i < rows; i++) {
    const cb = b + i * rowH + rowH / 2;
    const hot = props.highlight === i;
    const lv: Level = hot ? "focal" : "detail";
    items.push(
      <path key={"av" + i} d={planeCircle(P, pl, pad + 5, cb, 5)} {...strokeOf(T, lv)} fill={hot ? T.accent : "none"} />,
      <path key={"l1" + i} d={polyPath(P, [planePoint(pl, pad + 16, cb - 2), planePoint(pl, w * 0.7, cb - 2)])} {...strokeOf(T, lv)} />,
      <path key={"l2" + i} d={polyPath(P, [planePoint(pl, pad + 16, cb + 2.5), planePoint(pl, w * 0.5, cb + 2.5)])} {...strokeOf(T, "detail")} />,
    );
    if (i < rows - 1)
      items.push(<path key={"sep" + i} d={polyPath(P, [planePoint(pl, pad, cb + rowH / 2), planePoint(pl, w - pad, cb + rowH / 2)])} {...strokeOf(T, "detail")} strokeOpacity={0.5} />);
  }
  for (let c = 0; c < chips; c++) {
    const cw = 26;
    items.push(<path key={"ch" + c} d={planeRoundRect(P, pl, pad + c * (cw + 4), d - pad - 8, cw, 8, 4)} {...strokeOf(T, "detail")} />);
  }
  return (
    <Plate at={at} w={w} d={d} h={h} r={6} level={level} sides="flat">
      {items}
    </Plate>
  );
}

/** Callout: anchor node, dotted leader with one elbow, upright pill label in screen space (labels stay readable). */
export function Callout(props: { at: V3; dx?: number; dy?: number; label: string; width?: number; tone?: "on" | "accent"; leader?: "dotted" | "solid" }) {
  const { P, T } = useIso();
  const a = P.pv(props.at);
  const dx = props.dx ?? 60, dy = props.dy ?? -30;
  const elbow = { x: a.x + dx * 0.6, y: a.y + dy };
  const end = { x: a.x + dx, y: a.y + dy };
  const fs = 10;
  const pw = props.width ?? Math.round(props.label.length * fs * 0.62 + 16);
  const ph = 18;
  const left = dx >= 0;
  const px = left ? end.x : end.x - pw;
  return (
    <g>
      <path
        d={`M${ptStr(a)} L${ptStr(elbow)} L${ptStr(end)}`}
        fill="none"
        stroke={T.primary.c}
        strokeWidth={1}
        strokeDasharray={props.leader === "solid" ? undefined : "1 3"}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <Node at={props.at} size={5} tone={props.tone === "accent" ? "accent" : "on"} />
      <rect x={f(px)} y={f(end.y - ph / 2)} width={pw} height={ph} rx={ph / 2} fill={T.labelBg} stroke={T.primary.c} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <text
        x={f(px + pw / 2)}
        y={f(end.y + fs * 0.35)}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)"
        fontSize={fs}
        letterSpacing="0.06em"
        fill={props.tone === "accent" ? T.accent : T.label}
      >
        {props.label.toUpperCase()}
      </text>
    </g>
  );
}

/**
 * GuideLines: iso-axis construction lines through world points, extended `reach` units both ways, dashed 4/2 and
 * fading from the object outwards (ISO-13), so the object sits on the cell's structure instead of floating.
 */
export function GuideLines(props: { through: V3[]; axes?: ("x" | "y" | "z")[]; reach?: number; level?: "guide" | "grid" }) {
  const { P, T, id } = useIso();
  const reach = props.reach ?? 400;
  const st = T[props.level ?? "guide"];
  const axes = props.axes ?? ["x", "y"];
  const out: React.ReactNode[] = [];
  props.through.forEach((v, i) =>
    axes.forEach((ax) => {
      const dir: V3 = ax === "x" ? [1, 0, 0] : ax === "y" ? [0, 1, 0] : [0, 0, 1];
      [-1, 1].forEach((sgn) => {
        const a = P.pv(v), b = P.pv(add(v, mul(dir, sgn * reach)));
        const gid = id(`g${i}${ax}${sgn}`);
        out.push(
          <g key={`${i}${ax}${sgn}`}>
            <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={a.x} y1={a.y} x2={b.x} y2={b.y}>
              <stop offset={0} stopColor={st.c} />
              <stop offset={1} stopColor={st.c} stopOpacity={0} />
            </linearGradient>
            <path d={`M${ptStr(a)} L${ptStr(b)}`} fill="none" stroke={`url(#${gid})`} strokeWidth={st.w} strokeDasharray={st.dash} vectorEffect="non-scaling-stroke" />
          </g>,
        );
      });
    }),
  );
  return <g>{out}</g>;
}

/** IsoGrid: floor grid on z, `cells` each way of `step` units, dashed or dotted, optional + marks, radial fade. */
export function IsoGrid(props: { at?: V3; cells?: number; step?: number; style?: "dashed" | "dotted"; plus?: boolean; fade?: boolean }) {
  const { P, T, id } = useIso();
  const [cx, cy, z] = props.at ?? [0, 0, 0];
  const n = props.cells ?? 8, s = props.step ?? 40;
  const half = (n * s) / 2;
  const lines: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = -half + i * s;
    lines.push(polyPath(P, [[cx + t, cy - half, z], [cx + t, cy + half, z]]), polyPath(P, [[cx - half, cy + t, z], [cx + half, cy + t, z]]));
  }
  const c = P.p(cx, cy, z);
  const R = half * P.scale * 1.05;
  const gid = id("gridfade");
  const st = props.style === "dotted" ? T.grid : T.guide;
  return (
    <g>
      <radialGradient id={gid} gradientUnits="userSpaceOnUse" cx={c.x} cy={c.y} r={R}>
        <stop offset={0} stopColor="#fff" />
        <stop offset={0.55} stopColor="#fff" stopOpacity={0.7} />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </radialGradient>
      <mask id={gid + "m"} maskUnits="userSpaceOnUse" x={c.x - R * 2} y={c.y - R * 2} width={R * 4} height={R * 4}>
        <rect x={c.x - R * 2} y={c.y - R * 2} width={R * 4} height={R * 4} fill={props.fade === false ? "#fff" : `url(#${gid})`} />
      </mask>
      <g mask={`url(#${gid}m)`}>
        <path d={lines.join(" ")} fill="none" stroke={st.c} strokeWidth={st.w} strokeDasharray={st.dash} strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
        {props.plus &&
          Array.from({ length: (n + 1) * (n + 1) }, (_, k) => {
            const i = k % (n + 1), j = Math.floor(k / (n + 1));
            return <Plus key={k} at={[cx - half + i * s, cy - half + j * s, z]} arm={2.5} />;
          })}
      </g>
    </g>
  );
}

/** Connector: orthogonal cable along iso axes with rounded elbows; ring nodes at the ends (Opero / Boomtax). */
export function Connector(props: { points: V3[]; radius?: number; dashed?: boolean; level?: Level; endNodes?: boolean }) {
  const { P, T } = useIso();
  const d = routePath(P, props.points, props.radius ?? 8);
  const last = props.points[props.points.length - 1];
  return (
    <g>
      <path d={d} {...strokeOf(T, props.level ?? "primary")} strokeDasharray={props.dashed ? T.guide.dash : undefined} />
      {props.endNodes && (
        <>
          <Node at={props.points[0]} size={6} ring />
          <Node at={last} size={6} ring />
        </>
      )}
    </g>
  );
}

/**
 * Wall: upright UI sheet standing on z. facing "left" = constant y, runs along +x (Kargul's exploded Product UI/UX
 * layers, stacked by stepping y); facing "right" = constant x, runs along +y. `at` is the sheet's bottom-start corner.
 */
export function Wall(props: { at: V3; w: number; h: number; r?: number; facing?: "left" | "right"; level?: Level; fill?: string; texture?: "grain" | "hatch" | "dots"; children?: (pl: Plane) => React.ReactNode }) {
  const { P, T } = useIso();
  const [x, y, z] = props.at;
  const pl = props.facing === "right" ? wallPlane(x, y, z + props.h) : leftPlane(x, y, z + props.h);
  const d = planeRoundRect(P, pl, 0, 0, props.w, props.h, props.r ?? 4);
  const lv = props.level ?? "primary";
  return (
    <g>
      <path d={d} fill={props.fill ?? T.top} />
      {props.texture === "grain" && <Texture d={d} kind="grain" />}
      {props.texture === "dots" && <Texture d={d} kind="dots3" />}
      {props.texture === "hatch" && <Hatch d={d} angle={90} spacing={3} color={lv === "focal" ? T.secondary.c : T.hatch} />}
      {props.children?.(pl)}
      <path d={d} {...strokeOf(T, lv)} />
    </g>
  );
}

/* ------------------------------------------------------------------------------------------------ utils */

function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

/** Bounding box of an M/L/C path in absolute coordinates (control points included; good enough for clip extents). */
function bboxOf(d: string): [number, number, number, number] {
  const n = d.match(/-?\d*\.?\d+(?:e-?\d+)?/g)?.map(Number) ?? [0, 0];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < n.length; i += 2) {
    x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]);
    y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]);
  }
  return [x0 - 1, y0 - 1, x1 - x0 + 2, y1 - y0 + 2];
}

/** Stroke props for custom paths so hand-drawn extras stay on the same ladder. */
export function useStroke(level: Level = "primary") {
  const { T } = useIso();
  return strokeOf(T, level);
}
