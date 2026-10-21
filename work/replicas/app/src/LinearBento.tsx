// Linear homepage, section below the hero: the "A new species of product tool." statement, the FIG 0.1-0.3
// hairline triptych and the start of "Intake". Pixel replica for study only. Internal, never published.
// Reference: knowledge/benchmarks/bento/linear-fig-triptych.png (1440x1150 CSS @2x). Notes: work/replicas/LINEAR-BENTO-NOTES.md
// Copy is Linear's, kept verbatim only to register type tuples; it must not leave this study.
//
// Line-art construction (own code): 2:1 dimetric (edges slope 0.5, 26.565deg), every object is a polygon of sharp
// vertices with a screen-space circular fillet per vertex (tangent distance d = r / tan(theta/2)). Strokes are
// 0.5 CSS px (one device pixel at 2x). Fills are the page colour so nearer objects occlude farther ones; depth
// comes from occlusion, a stroke-colour ladder and a blurred page-colour halo ("out" shadow) under nearer objects.

type P = [number, number]

const BG = '#08090a'
const INK = { hi: '#d0d6e0', mid: '#62666d', lo: '#3e3e44', inner: '#2e2e32' }
const SANS = '"Inter Variable", "SF Pro Display", -apple-system, system-ui, sans-serif'
const MONO = '"Geist Mono Variable", ui-monospace, "SF Mono", Menlo, monospace'

const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]]
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]]
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k]
const len = (a: P) => Math.hypot(a[0], a[1])
const unit = (a: P): P => mul(a, 1 / len(a))
const f = (n: number) => +n.toFixed(3)
const pt = (p: P) => `${f(p[0])} ${f(p[1])}`

/** tangent distance of a fillet of radius r at vertex p between neighbours a and b */
function tangentDist(a: P, p: P, b: P, r: number) {
  const u1 = unit(sub(a, p)), u2 = unit(sub(b, p))
  const th = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])))
  return r / Math.tan(th / 2)
}

/** polygon / polyline with a circular fillet of radius r[i] at each vertex (open: ends are not filleted) */
function rpath(pts: P[], r: number[], closed: boolean) {
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

/** a 2:1 dimetric slab: sharp top vertex (cx, ty), half width hw, thickness h, fillets back / side / front */
function slab(cx: number, ty: number, hw: number, h: number, rT: number, rS: number, rF: number) {
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

/** front edge of the top face (where top meets the front faces), inset a from the sides, dropped by dy */
function topFrontEdge(cx: number, ty: number, hw: number, a: number, dy: number, r: number) {
  const S: P = [cx - hw + a, ty + hw / 2 + a / 2 + dy], B: P = [cx, ty + hw + dy], E: P = [cx + hw - a, ty + hw / 2 + a / 2 + dy]
  return rpath([S, B, E], [0, r, 0], false)
}

// ---------- FIG 0.1: five stacked plates + one lifted plate with a sunset glyph laid in its top plane ----------
function Fig1() {
  const hw = 120, h = 20.54, cx = 132.25
  const top = slab(cx, 7.44, hw, h, 6.86, 3.43, 10.29)
  const stackTy = [0, 1, 2, 3, 4].map((k) => 55.41 + k * 16.3015).reverse() // painted bottom plate first
  // sunset: a circle on the top plane (2:1 ellipse) cut into alternating bands of 4.064 px
  const E = { cx, cy: 7.44 + hw / 2 + 0.86, rx: 54.86, ry: 27.43 }
  const halfW = (y: number) => E.rx * Math.sqrt(Math.max(0, 1 - ((y - E.cy) / E.ry) ** 2))
  const arcSide = (y1: number, y2: number, side: 1 | -1) => {
    // walk the ellipse boundary between y1 and y2 on one side as a sampled polyline (sub-pixel exact)
    const N = 24, out: string[] = []
    for (let i = 0; i <= N; i++) { const y = y1 + ((y2 - y1) * i) / N; out.push(`${f(E.cx + side * halfW(y))} ${f(y)}`) }
    return out
  }
  const band = (y1: number, y2: number) => {
    const left = arcSide(y1, y2, -1), right = arcSide(y2, y1, 1)
    return `M${left[0]}L${left.slice(1).join('L')}L${right.join('L')}Z`
  }
  const step = 4.064, y0 = 70.36
  const sun = [band(E.cy - E.ry, y0), band(y0 + step, y0 + 2 * step), band(y0 + 3 * step, y0 + 4 * step), band(y0 + 5 * step, E.cy + E.ry)].join('')
  // dashed corner guides, masked out where they would cross a plate's side band
  const bandPoly = (ty: number) => {
    const L: P = [cx - hw, ty + hw / 2], B: P = [cx, ty + hw], R: P = [cx + hw, ty + hw / 2]
    return `M${pt([L[0], L[1] - 3.64])}L${pt([B[0], B[1] - 1.52])}L${pt([R[0], R[1] - 3.64])}L${pt([R[0], R[1] + h + 3.64])}L${pt([B[0], B[1] + h + 4.5])}L${pt([L[0], L[1] + h + 3.64])}Z`
  }
  return (
    <svg width={265} height={262} viewBox="0 0 265 262" fill="none" style={{ position: 'absolute', left: 144.328, top: 382.797, overflow: 'visible' }}>
      <defs>
        <filter id="lb-f1" x="0" y="0" width="264.5" height="156.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feOffset in="SourceAlpha" dy="4" /><feGaussianBlur stdDeviation="6" result="b" />
          <feComposite in="b" in2="SourceAlpha" operator="out" result="o" />
          <feColorMatrix in="o" values="0 0 0 0 0.0314 0 0 0 0 0.0353 0 0 0 0 0.0392 0 0 0 0.6 0" />
        </filter>
        <mask id="lb-m1" maskUnits="userSpaceOnUse" x="0" y="0" width="265" height="262">
          <rect width="265" height="262" fill="#fff" />
          <path fill="#000" d={[7.44, ...stackTy].map(bandPoly).join('')} />
        </mask>
      </defs>
      {stackTy.map((ty, i) => {
        const s = slab(cx, ty, hw, h, 6.86, 3.43, 10.29)
        return (
          <g key={ty}>
            <path fill={BG} d={s.fill} />
            <path stroke={INK.hi} strokeWidth={0.5} d={s.top} />
            <path stroke={i === 0 ? INK.hi : INK.lo} strokeWidth={0.5} d={s.front} />
            <path stroke={INK.lo} strokeWidth={0.5} strokeLinecap="round" d={topFrontEdge(cx, ty, hw, 6.857, 0.86, 10.29)} />
          </g>
        )
      })}
      <path fill={BG} filter="url(#lb-f1)" d={top.fill} />
      <path fill={BG} d={top.fill} />
      <path stroke={INK.hi} strokeWidth={0.5} d={top.top} />
      <path stroke={INK.hi} strokeWidth={0.5} d={top.front} />
      <path stroke={INK.lo} strokeWidth={0.5} strokeLinecap="round" d={topFrontEdge(cx, 7.44, hw, 6.857, 0.86, 10.29)} />
      <path stroke={INK.lo} strokeWidth={0.5} strokeLinejoin="round" d={sun} />
      <g mask="url(#lb-m1)">
        <path stroke={INK.lo} strokeWidth={1} strokeDasharray="1 3" strokeLinecap="round"
          d={`M${f(cx - hw + 0.429)} 69.56V199.036M${f(cx + hw - 0.429)} 69.56V199.036M${cx} 129.379V258.855`} />
      </g>
    </svg>
  )
}

// ---------- FIG 0.2: a cluster of rounded cubes, three carrying a 5x5 dot-grid label on the top plane ----------
const CUBES: { cx: number; ty: number; h: number; ink: string; halo: boolean }[] = [
  { cx: 152, ty: -0.665, h: 129.691, ink: INK.hi, halo: false }, // tall back tower
  { cx: 88, ty: 137.335, h: 23.692, ink: INK.lo, halo: true }, // low slab, front-left, behind the front cube
  { cx: 88, ty: 51.336, h: 77.692, ink: INK.hi, halo: true }, // left cube
  { cx: 216, ty: 95.336, h: 65.692, ink: INK.hi, halo: true }, // right cube
  { cx: 216, ty: 62.336, h: 23.692, ink: INK.lo, halo: true }, // lid floating above the right cube
  { cx: 152, ty: 143.335, h: 49.692, ink: INK.hi, halo: true }, // front cube
]
// dot labels: centre of the 5x5 grid, column step u, row step v (page px), lit dots (row*5+col) from the reference frame
// lit: dot index -> opacity in the captured animation frame (resting dots sit at DIM)
const DIM = 0.24
const LABELS: { c: P; u: P; v: P; lit: Record<number, number> }[] = [
  { c: [719.58, 528.28], u: [2.172, 1.139], v: [-2.026, 1.025], lit: { 22: 0.75 } },
  { c: [656.34, 437.2], u: [2.114, 1.006], v: [-2.199, 0.867], lit: { 5: 0.9, 9: 0.88, 10: 0.76, 11: 0.63, 14: 0.76, 15: 0.71, 19: 0.65, 18: 0.42 } },
  { c: [719.58, 385.22], u: [2.302, 0.947], v: [-2.145, 0.791], lit: { 0: 1 } },
]
function Fig2() {
  const hw = 55.75
  return (
    <>
      <svg width={304} height={281} viewBox="0 0 304 281" fill="none" style={{ position: 'absolute', left: 567.484, top: 373.297, overflow: 'visible' }}>
        <defs>
          <filter id="lb-f2" x="-40" y="-40" width="384" height="361" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="16" result="b" />
            <feComposite in="b" in2="SourceAlpha" operator="out" result="o" />
            <feColorMatrix in="o" values="0 0 0 0 0.0314 0 0 0 0 0.0353 0 0 0 0 0.0392 0 0 0 1 0" />
          </filter>
        </defs>
        {CUBES.map((c, i) => {
          const s = slab(c.cx, c.ty, hw, c.h, 7.75, 3.75, 7.75)
          return (
            <g key={i}>
              {c.halo && <path fill={BG} filter="url(#lb-f2)" d={s.fill} />}
              <path fill={BG} stroke={c.ink} strokeWidth={0.5} d={s.fill} />
              <path stroke={INK.inner} strokeWidth={0.5} strokeLinecap="round" d={topFrontEdge(c.cx, c.ty, hw, 5.75, 0, 8)} />
            </g>
          )
        })}
      </svg>
      <svg width={1440} height={1150} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
        {LABELS.map((l, k) => (
          <g key={k} opacity={0.7}>
            {Array.from({ length: 25 }, (_, i) => {
              const r = Math.floor(i / 5) - 2, c = (i % 5) - 2
              const x = l.c[0] + c * l.u[0] + r * l.v[0], y = l.c[1] + c * l.u[1] + r * l.v[1]
              const m = [l.u[0] / 3.5, l.u[1] / 3.5, l.v[0] / 3.5, l.v[1] / 3.5].map(f).join(' ')
              return <circle key={i} r={1} fill="#e4e5e9" opacity={l.lit[i] ?? DIM} transform={`matrix(${m} ${f(x)} ${f(y)})`} />
            })}
          </g>
        ))}
      </svg>
    </>
  )
}

// ---------- FIG 0.3: fifteen thin standing cards on one ground line, heights rising to a peak and falling ----------
const CARD_H = [20.529, 34.049, 54.331, 81.373, 128.697, 81.373, 54.331, 34.049, 20.529, 13.768, 10.387, 8.698, 7.852, 7.853, 7.853]
function Fig3() {
  const run: P = [118.06, 59.03] // card length along the +x iso axis
  const thick: P = [3.13, -1.565] // card thickness along the other iso axis (front -> back)
  return (
    <svg width={272} height={267} viewBox="0 0 272 267" fill="none" style={{ position: 'absolute', left: 1026.656, top: 380.297, overflow: 'visible' }}>
      {CARD_H.map((H, i) => {
        const Hs = H + 2.825
        const E: P = [134.558 - 8.45 * i, 132.265 + 4.225 * i] // bottom front-left (ground)
        const F: P = [E[0], E[1] - Hs], A = add(F, thick), B = add(A, run), C: P = [B[0], B[1] + Hs], D = sub(C, thick)
        const G = add(F, run)
        const inner = rpath([add(F, [3.131, 1.535]), G, [G[0], D[1] - 3.1]], [0, 3.38, 0], false)
        return (
          <g key={i} strokeWidth={0.5}>
            <path fill={BG} stroke={INK.mid} d={rpath([A, B, C, D, E, F], [1.44, 3.13, 1.44, 1.44, 3.13, 1.44], true)} />
            <path stroke={INK.inner} strokeLinecap="round" d={inner} />
          </g>
        )
      })}
    </svg>
  )
}

const COL_W = 1280 / 3
const BENEFITS = [
  { fig: 'Fig 0.1', title: 'Purpose-built', body: 'Linear is shaped by the practices and principles of world-class product teams.' },
  { fig: 'Fig 0.2', title: 'Powered by agents', body: 'Designed for workflows shared by humans and agents. From drafting PRDs to pushing PRs.' },
  { fig: 'Fig 0.3', title: 'Designed for speed', body: 'Reduces noise and restores momentum to help teams ship with high velocity and focus.' },
]

export default function LinearBento() {
  return (
    <div style={{
      position: 'relative', width: 1440, height: 1150, overflow: 'hidden', background: BG, fontFamily: SANS,
      WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility', fontFeatureSettings: '"cv01", "ss03"',
    }}>
      {/* statement: one h2, the lead sentence at text tier 1, the rest at tier 4 */}
      <h2 style={{
        position: 'absolute', left: 46, top: 39.797, width: 1250, boxSizing: 'border-box', padding: '0 32px', margin: 0,
        fontSize: 48, fontWeight: 510, lineHeight: '48px', letterSpacing: '-1.056px', color: '#8a8f98', textWrap: 'wrap',
      }}>
        <strong style={{ fontWeight: 510, color: '#f7f8f8' }}>A new species of product tool.</strong>{' '}
        Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.
      </h2>

      {/* triptych: three 426.67 columns, 1px white .08 dividers, text pinned to the column bottom */}
      {BENEFITS.map((b, i) => (
        <div key={b.fig} style={{
          position: 'absolute', left: 80 + i * COL_W, top: 319.797, width: COL_W, height: 468, boxSizing: 'border-box',
          paddingLeft: i === 0 ? 0 : 32, paddingRight: i === 2 ? 0 : 32,
          borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <span style={{
            position: 'absolute', top: 0, left: i === 0 ? 0 : 32, fontFamily: MONO, fontSize: 11.65, fontWeight: 400,
            lineHeight: '16.8px', color: '#8a8f98', opacity: 0.4, textTransform: 'uppercase', fontFeatureSettings: 'normal',
          }}>{b.fig}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 510, lineHeight: '24px', letterSpacing: '-0.165px', color: '#d0d6e0' }}>{b.title}</span>
            <p style={{ margin: 0, maxWidth: 368, textWrap: 'balance', fontSize: 15, fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.165px', color: '#8a8f98' }}>{b.body}</p>
          </div>
        </div>
      ))}
      <Fig1 />
      <Fig2 />
      <Fig3 />

      {/* section keyline: 1px black shadow line, then 1px white .08 */}
      <div style={{ position: 'absolute', left: 0, top: 947.797, width: 1440, height: 1, background: '#000' }} />
      <div style={{ position: 'absolute', left: 0, top: 948.797, width: 1440, height: 1, background: 'rgba(255,255,255,0.08)' }} />

      {/* Intake header: title left at 78, description from the half-way column at 752 */}
      <h2 style={{
        position: 'absolute', left: 78, top: 1117.797, maxWidth: '18ch', margin: 0, fontSize: 48, fontWeight: 510, lineHeight: '48px',
        letterSpacing: '-1.056px', color: '#f7f8f8', textBox: 'trim-both cap alphabetic',
      } as React.CSSProperties}>Intake<br />and integrations</h2>
      <p style={{
        position: 'absolute', left: 752, top: 1119.438, width: 566.438, margin: 0, fontSize: 24, fontWeight: 400, lineHeight: '31.92px',
        letterSpacing: '-0.288px', color: '#d0d6e0', textBox: 'trim-both cap alphabetic',
      } as React.CSSProperties}>Automatically turn conversations and customer feedback into actionable issues that are instantly routed, labeled, and prioritized for the right team.</p>
    </div>
  )
}
