// Linear's hairline line-art construction as a reusable kit (measured in LinearBento.tsx, rules LA-01..15 in
// work/replicas/LINEAR-BENTO-NOTES.md): 2:1 dimetric (edges slope 0.5), polygons with a screen-space circular fillet per
// vertex, 0.5px strokes from a four-step solid ink ladder, page-colour fills so nearer objects occlude, one interior line
// (the top face's front edge) per object, blurred page-colour halos under nearer objects, dotted corner guides, and
// 5x5 dot-grid labels laid in a top plane as the only bright detail.
export type P = [number, number]
export const BG = '#08090a'
export const INK = { hi: '#d0d6e0', mid: '#62666d', lo: '#3e3e44', inner: '#2e2e32' }

export const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]]
export const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]]
export const mul = (a: P, k: number): P => [a[0] * k, a[1] * k]
const len = (a: P) => Math.hypot(a[0], a[1])
const unit = (a: P): P => mul(a, 1 / len(a))
export const f = (n: number) => +n.toFixed(3)
export const pt = (p: P) => `${f(p[0])} ${f(p[1])}`

export function tangentDist(a: P, p: P, b: P, r: number) {
  const u1 = unit(sub(a, p)), u2 = unit(sub(b, p))
  const th = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])))
  return r / Math.tan(th / 2)
}
export function rpath(pts: P[], r: number[], closed: boolean) {
  const n = pts.length
  const corner = (i: number) => {
    const a = pts[(i - 1 + n) % n], p = pts[i], b = pts[(i + 1) % n]
    if (!r[i]) return { t1: p, t2: p, arc: '' }
    const d = tangentDist(a, p, b, r[i])
    const t1 = add(p, mul(unit(sub(a, p)), d)), t2 = add(p, mul(unit(sub(b, p)), d))
    const v1 = sub(p, a), v2 = sub(b, p)
    const sweep = v1[0] * v2[1] - v1[1] * v2[0] > 0 ? 1 : 0
    return { t1, t2, arc: `A${f(r[i])} ${f(r[i])} 0 0 ${sweep} ${pt(t2)}` }
  }
  if (closed) {
    const c = pts.map((_, i) => corner(i))
    return `M${pt(c[0].t1)}${c[0].arc}` + c.slice(1).map((k) => `L${pt(k.t1)}${k.arc}`).join('') + 'Z'
  }
  let s = `M${pt(pts[0])}`
  for (let i = 1; i < n - 1; i++) { const k = corner(i); s += `L${pt(k.t1)}${k.arc}` }
  return s + `L${pt(pts[n - 1])}`
}
/** 2:1 dimetric slab: sharp top vertex (cx, ty), half width hw, thickness h, fillets back / side / front */
export function slab(cx: number, ty: number, hw: number, h: number, rT: number, rS: number, rF: number) {
  const T: P = [cx, ty], R: P = [cx + hw, ty + hw / 2], Rb: P = [cx + hw, ty + hw / 2 + h]
  const Bb: P = [cx, ty + hw + h], Lb: P = [cx - hw, ty + hw / 2 + h], L: P = [cx - hw, ty + hw / 2]
  const dS = tangentDist(Bb, Lb, L, rS)
  const sL = add(Lb, mul(unit(sub(Bb, Lb)), dS)), sR = add(Rb, mul(unit(sub(Bb, Rb)), dS))
  return {
    T, R, Rb, Bb, Lb, L,
    fill: rpath([T, R, Rb, Bb, Lb, L], [rT, rS, rS, rF, rS, rS], true),
    top: rpath([sL, Lb, L, T, R, Rb, sR], [0, rS, rS, rT, rS, rS, 0], false),
    front: rpath([sR, Bb, sL], [0, rF, 0], false),
  }
}
export function topFrontEdge(cx: number, ty: number, hw: number, a: number, dy: number, r: number) {
  const S: P = [cx - hw + a, ty + hw / 2 + a / 2 + dy], B: P = [cx, ty + hw + dy], E: P = [cx + hw - a, ty + hw / 2 + a / 2 + dy]
  return rpath([S, B, E], [0, r, 0], false)
}
/** matrix mapping top-face plane units (u along T->R, v along T->L, both 0..100) of a slab onto the screen */
export const topPlane = (cx: number, ty: number, hw: number) => `matrix(${f(hw / 100)} ${f(hw / 200)} ${f(-hw / 100)} ${f(hw / 200)} ${f(cx)} ${f(ty)})`
/** halo filters, as measured: lifted plate (dy 4, sigma 6, 60%) and cubes (sigma 16, 100%) */
export function HaloDefs({ id, x, y, w, h, kind }: { id: string; x: number; y: number; w: number; h: number; kind: 'plate' | 'cube' }) {
  return (
    <filter id={id} x={x} y={y} width={w} height={h} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      {kind === 'plate' && <feOffset in="SourceAlpha" dy="4" result="s" />}
      <feGaussianBlur in={kind === 'plate' ? 's' : 'SourceAlpha'} stdDeviation={kind === 'plate' ? 6 : 16} result="b" />
      <feComposite in="b" in2="SourceAlpha" operator="out" result="o" />
      <feColorMatrix in="o" values={`0 0 0 0 0.0314 0 0 0 0 0.0353 0 0 0 0 0.0392 0 0 0 ${kind === 'plate' ? 0.6 : 1} 0`} />
    </filter>
  )
}
/** 5x5 dot-grid label laid in a plane: centre c, column step u, row step v; lit: index -> opacity (rest at dim) */
export function DotLabel({ c, u, v, lit, dim = 0.24, fill = '#e4e5e9' }: { c: P; u: P; v: P; lit: Record<number, number>; dim?: number; fill?: string }) {
  return (
    <g opacity={0.7}>
      {Array.from({ length: 25 }, (_, i) => {
        const r = Math.floor(i / 5) - 2, k = (i % 5) - 2
        const x = c[0] + k * u[0] + r * v[0], y = c[1] + k * u[1] + r * v[1]
        const m = [u[0] / 3.5, u[1] / 3.5, v[0] / 3.5, v[1] / 3.5].map(f).join(' ')
        return <circle key={i} r={1} fill={lit[i] != null ? fill : '#e4e5e9'} opacity={lit[i] ?? dim} transform={`matrix(${m} ${f(x)} ${f(y)})`} />
      })}
    </g>
  )
}
