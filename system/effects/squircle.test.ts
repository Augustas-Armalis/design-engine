// Tests for squircle.ts.
// run: node --import ./system/effects/demo/react-resolve.mjs --test system/effects/squircle.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  getCornerParams, getSquirclePath, getSquircleBandPath, distributeCorners, nativeCornerFor, equivalentRadius,
  squircleMaskImage, boxShadowToDropShadow, Squircle,
} from "./squircle.ts";

type Pt = [number, number];
type Seg = { kind: "C"; p0: Pt; p1: Pt; p2: Pt; p3: Pt } | { kind: "A"; p0: Pt; p1: Pt; r: number } | { kind: "L"; p0: Pt; p1: Pt };

/** Walk the subset of path syntax getSquirclePath emits (M, c, a, L, l, Z) into absolute segments. */
function parse(d: string): { start: Pt; end: Pt; segs: Seg[] } {
  const tok = d.match(/[MmCcAaLlZz]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  let i = 0, cur: Pt = [0, 0], start: Pt = [0, 0], cmd = "";
  const n = () => parseFloat(tok[i++]);
  const segs: Seg[] = [];
  while (i < tok.length) {
    if (/[A-Za-z]/.test(tok[i])) cmd = tok[i++];
    if (cmd === "M") { cur = [n(), n()]; start = cur; }
    else if (cmd === "L") { const p: Pt = [n(), n()]; segs.push({ kind: "L", p0: cur, p1: p }); cur = p; }
    else if (cmd === "l") { const p: Pt = [cur[0] + n(), cur[1] + n()]; segs.push({ kind: "L", p0: cur, p1: p }); cur = p; }
    else if (cmd === "c") { const a: Pt = [cur[0] + n(), cur[1] + n()], b: Pt = [cur[0] + n(), cur[1] + n()], c: Pt = [cur[0] + n(), cur[1] + n()]; segs.push({ kind: "C", p0: cur, p1: a, p2: b, p3: c }); cur = c; }
    else if (cmd === "a") { const r = n(); n(); n(); n(); n(); const p: Pt = [cur[0] + n(), cur[1] + n()]; segs.push({ kind: "A", p0: cur, p1: p, r }); cur = p; }
    else if (cmd === "Z" || cmd === "z") { cmd = ""; }
    else throw new Error("unexpected token " + tok[i]);
  }
  return { start, end: cur, segs };
}
const bez = (s: Extract<Seg, { kind: "C" }>, t: number): Pt => {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * s.p0[k] + 3 * u * u * t * s.p1[k] + 3 * u * t * t * s.p2[k] + t * t * t * s.p3[k]) as Pt;
};
const curvature = (s: Extract<Seg, { kind: "C" }>, t: number): number => {
  const d1 = [0, 1].map((k) => 3 * (1 - t) ** 2 * (s.p1[k] - s.p0[k]) + 6 * (1 - t) * t * (s.p2[k] - s.p1[k]) + 3 * t * t * (s.p3[k] - s.p2[k]));
  const d2 = [0, 1].map((k) => 6 * (1 - t) * (s.p2[k] - 2 * s.p1[k] + s.p0[k]) + 6 * t * (s.p3[k] - 2 * s.p2[k] + s.p1[k]));
  return Math.abs(d1[0] * d2[1] - d1[1] * d2[0]) / Math.hypot(d1[0], d1[1]) ** 3;
};

test("corner params reproduce figma-squircle's worked numbers (R 16, smoothing 0.6)", () => {
  const q = getCornerParams(16, 0.6, 100);
  assert.ok(Math.abs(q.p - 25.6) < 1e-9);
  assert.ok(Math.abs(q.arcSectionLength - 6.992) < 1e-3);
  assert.ok(Math.abs(q.c - 3.423) < 1e-3);
  assert.ok(Math.abs(q.d - 1.744) < 1e-3);
  assert.ok(Math.abs(q.b - 4.480) < 1e-3);
  assert.ok(Math.abs(q.a - 8.961) < 1e-3);
});

test("smoothing 0 degenerates to a plain rounded rectangle (pure arcs)", () => {
  const q = getCornerParams(24, 0, 1000);
  assert.deepEqual([q.a, q.b, q.c, q.d].map((v) => +v.toFixed(9)), [0, 0, 0, 0]);
  assert.equal(q.p, 24);
  assert.ok(Math.abs(q.arcSectionLength - 24) < 1e-9);
});

test("path closes, stays inside its box and touches all four edges", () => {
  for (const [w, h, r, s] of [[200, 120, 24, 0.6], [320, 48, 24, 1], [64, 64, 16, 0.6], [120, 80, 100, 0.6], [500, 300, 0, 0.6]] as const) {
    const d = getSquirclePath({ width: w, height: h, radius: r, smoothing: s, precision: 6 });
    const { start, end, segs } = parse(d);
    // the outline ends on the top edge, so Z closes it with a straight, horizontal top side (as figma-squircle does)
    assert.ok(Math.abs(end[1] - start[1]) < 1e-4 && end[0] <= start[0] + 1e-4, `closes ${w}x${h} r${r}: ${start} vs ${end}`);
    segs.push({ kind: "L", p0: end, p1: start });
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const sg of segs) {
      const pts: Pt[] = sg.kind === "C" ? Array.from({ length: 21 }, (_, k) => bez(sg, k / 20)) : [sg.p0, sg.p1];
      for (const [x, y] of pts) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
    }
    assert.ok(minX > -1e-4 && minY > -1e-4 && maxX < w + 1e-4 && maxY < h + 1e-4, `in box ${w}x${h}`);
    assert.ok(Math.abs(minX) < 1e-3 && Math.abs(minY) < 1e-3 && Math.abs(maxX - w) < 1e-3 && Math.abs(maxY - h) < 1e-3, `touches edges ${w}x${h}`);
  }
});

test("smoothed corner leaves the straight edge with zero curvature and joins the arc tangentially", () => {
  const R = 40, s = 0.6;
  const { segs } = parse(getSquirclePath({ width: 400, height: 400, radius: R, smoothing: s, precision: 9 }));
  const c1 = segs.find((x) => x.kind === "C") as Extract<Seg, { kind: "C" }>;
  assert.ok(curvature(c1, 0) < 1e-9, "curvature 0 where the edge ends (G2 with the straight side)");
  // tangent at the cubic's end points at beta = 45 * s degrees, which is where the arc begins (G1 at the arc)
  const dx = c1.p3[0] - c1.p2[0], dy = c1.p3[1] - c1.p2[1];
  assert.ok(Math.abs((Math.atan2(dy, dx) * 180) / Math.PI - 45 * s) < 1e-6);
  // Figma's construction is not exactly G2 at the arc junction: report the jump instead of pretending.
  const kEnd = curvature(c1, 1) * R;
  assert.ok(kEnd > 1 && kEnd < 1.6, `curvature at cubic end = ${kEnd.toFixed(3)} / R`);
});

test("a corner that has no room is clamped to half the short side", () => {
  const dist = distributeCorners(120, 80, 100);
  assert.equal(dist.topLeft.budget, 40);
  const q = getCornerParams(dist.topLeft.radius, 0.6, dist.topLeft.budget);
  assert.ok(q.p <= 40 + 1e-9);
  assert.ok(q.smoothing < 0.6, "smoothing reduced when preserveSmoothing is false");
  const qp = getCornerParams(dist.topLeft.radius, 0.6, dist.topLeft.budget, true);
  assert.equal(qp.smoothing, 0.6);
  assert.ok(qp.p <= 40 + 1e-9);
});

test("per-corner radii: zero corners emit straight joins, larger corners claim the shared side first", () => {
  const d = getSquirclePath({ width: 200, height: 100, radius: { topLeft: 0, topRight: 24, bottomRight: 24, bottomLeft: 0 }, smoothing: 0.6 });
  assert.match(d, /l0 0/); // zero-length joins at the square corners
  const dist = distributeCorners(100, 100, { topLeft: 80, topRight: 20 });
  assert.equal(dist.topLeft.budget, 80);
  assert.equal(dist.topRight.budget, 20);
});

test("band path = outer + inner subpaths (exact even-odd border)", () => {
  const band = getSquircleBandPath({ width: 200, height: 120, radius: 24, smoothing: 0.6 }, 0, 1);
  assert.equal((band.match(/M/g) ?? []).length, 2);
  assert.equal((band.match(/Z/g) ?? []).length, 2);
});

test("native mapping and fallbacks follow fit.json", () => {
  assert.deepEqual(nativeCornerFor(16, 0.6), { k: 1.32, radius: 19.2, cornerShape: "superellipse(1.32)" });
  assert.deepEqual(nativeCornerFor(16, 0), { k: 1, radius: 16, cornerShape: "superellipse(1)" });
  assert.equal(equivalentRadius(24, 0.6), 24);
  assert.equal(equivalentRadius(25, 1), 26);
  assert.match(squircleMaskImage({ width: 40, height: 40, radius: 10 }), /^url\("data:image\/svg\+xml,/);
});

test("box-shadow -> drop-shadow drops rings and inset layers", () => {
  const out = boxShadowToDropShadow("0 0 0 1px rgb(0 0 0 / .08), inset 0 1px 0 rgb(255 255 255 / .1), 0 8px 24px -8px rgb(0 0 0 / .12)");
  assert.equal(out, "drop-shadow(0 0 0 rgb(0 0 0 / .08)) drop-shadow(0 8px 24px rgb(0 0 0 / .12))");
});

test("React <Squircle> renders clip-path + exact SVG edge in svg mode, corner-shape in native mode", () => {
  const svg = renderToStaticMarkup(React.createElement(Squircle, {
    width: 240, height: 120, radius: 24, smoothing: 0.6, mode: "svg", fill: "#fff",
    border: { width: 1, color: "rgb(0 0 0 / .08)" }, ring: { width: 1, color: "rgb(0 0 0 / .06)" }, shadow: "0 8px 24px -8px rgb(0 0 0 / .12)",
  }, "hello"));
  assert.match(svg, /clip-path:path\(&#x27;M/);
  assert.equal((svg.match(/fill-rule="evenodd"/g) ?? []).length, 2);
  assert.match(svg, /box-shadow:0 8px 24px -8px/);
  assert.match(svg, /hello/);
  const nat = renderToStaticMarkup(React.createElement(Squircle, { width: 240, height: 120, radius: 24, mode: "native", fill: "#fff" }));
  assert.match(nat, /corner-shape:superellipse\(1.32\)/);
  assert.match(nat, /border-radius:28.8px/);
});
