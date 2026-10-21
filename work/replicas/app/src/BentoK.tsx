// Cadence services bento v6, drawn only with the construction measured off Kargul's services bento (ISO-31..38,
// replica in KargulIso.tsx). Each cell borrows one of his five constructions and gives it a Cadence subject:
//   Find a time      <- Full-stack: hatched-thickness plate, wireframe in plane, wired to satellite sheets
//   Focus time       <- Product UI/UX: standing panes in depth, checker texture, white bar, dotted leader to a label
//   Conflicts        <- Branding: exploded flat sheets, nodes on corners, dotted drops between layers
//   Scheduling links <- Landing pages: one sheet curling from the booking page down into the calendar
//   Weekly insight   <- Landing pages bars: outline-only iso boxes on a base sheet, type laid in plane
// Greys only, 1px strokes on a 3-step alpha ladder, one solid white mark per cell. Every shape lives in plane units
// and is projected by an SVG matrix (Flat / XZ / YZ), so strokes stay exact 1px (non-scaling) and type lies on the plane.
// Sample product copy; no claims.
import type { ReactNode } from 'react'

const C = 0.866, S = 0.5
type P = [number, number]
const EDGE = 'rgb(255 255 255 / 0.62)', DIM = 'rgb(255 255 255 / 0.3)', GUIDE = 'rgb(255 255 255 / 0.13)', TEX = 'rgb(255 255 255 / 0.2)', GREY = 'rgb(255 255 255 / 0.36)'
const SHEET = '#2a2a2a', LOW = '#303030', CELL = '#313131'
const ns = { vectorEffect: 'non-scaling-stroke' as const }

const pr = (o: P, x: number, y: number, z = 0): P => [o[0] + (x - y) * C, o[1] + (x + y) * S - z]
// plane matrices: Flat (x,y) at height z; XZ standing pane at depth y0, local (x, v=-z); YZ pane at x0, local (y, v=-z)
const flat = (o: P, z = 0) => `matrix(${C} ${S} ${-C} ${S} ${o[0]} ${o[1] - z})`
const xz = (o: P, y0: number) => `matrix(${C} ${S} 0 1 ${o[0] - y0 * C} ${o[1] + y0 * S})`
const yz = (o: P, x0: number) => `matrix(${-C} ${S} 0 1 ${o[0] + x0 * C} ${o[1] + x0 * S})`
const seg = (a: P, b: P) => `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${b[0].toFixed(2)} ${b[1].toFixed(2)}`

const Flat = ({ o, z = 0, children }: { o: P; z?: number; children: ReactNode }) => <g transform={flat(o, z)}>{children}</g>
/** a flat sheet: fill + 1px edge + iso-diamond nodes on its corners (ISO-31/33) */
function Sheet({ o, x = 0, y = 0, z = 0, w, d, fill = SHEET, stroke = EDGE, nodes = 'light' }: { o: P; x?: number; y?: number; z?: number; w: number; d: number; fill?: string; stroke?: string; nodes?: 'light' | 'dim' | 'none' }) {
  return (
    <Flat o={o} z={z}>
      <rect x={x} y={y} width={w} height={d} fill={fill} stroke={stroke} {...ns} />
      {nodes !== 'none' && [[x, y], [x + w, y], [x + w, y + d], [x, y + d]].map(([a, b], i) => <rect key={i} x={a - 2.6} y={b - 2.6} width={5.2} height={5.2} fill={nodes === 'light' ? '#e2e2e2' : '#6b6b6b'} />)}
    </Flat>
  )
}
/** ISO-37: every edge of a sheet extended both ways as a faint dashed guide */
function Guides({ o, x = 0, y = 0, z = 0, w, d, L = 500 }: { o: P; x?: number; y?: number; z?: number; w: number; d: number; L?: number }) {
  const ls: [number, number, number, number][] = [[x - L, y, x + w + L, y], [x - L, y + d, x + w + L, y + d], [x, y - L, x, y + d + L], [x + w, y - L, x + w, y + d + L]]
  return <>{ls.map(([a, b, c, e], i) => <path key={i} d={seg(pr(o, a, b, z), pr(o, c, e, z))} stroke={GUIDE} strokeDasharray="3 3" />)}</>
}
const Rows = ({ x, y, w, n, gap = 4, stroke = TEX }: { x: number; y: number; w: number[] | number; n: number; gap?: number; stroke?: string }) => (
  <>{Array.from({ length: n }, (_, i) => <path key={i} d={`M${x} ${y + i * gap}h${Array.isArray(w) ? w[i % w.length] : w}`} stroke={stroke} {...ns} />)}</>
)
/** Cadence mark, laid in plane: four rounded tiles, one per quarter (a week folded into four) */
const Mark = ({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) => (
  <g fill={fill} transform={`translate(${x} ${y}) scale(${s})`}><rect width="6" height="6" rx="1.6" /><rect x="7.5" width="6" height="6" rx="1.6" /><rect y="7.5" width="6" height="6" rx="1.6" /><rect x="7.5" y="7.5" width="6" height="6" rx="3" /></g>
)

function Defs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <pattern id="hx" width="4" height="2.2" patternUnits="userSpaceOnUse"><rect width="4" height="0.75" fill="rgb(255 255 255 / 0.24)" /></pattern>
        <pattern id="hy" width="2.2" height="4" patternUnits="userSpaceOnUse"><rect width="0.75" height="4" fill="rgb(255 255 255 / 0.24)" /></pattern>
        <filter id="grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="7" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 -0.34" /></filter>
      </defs>
    </svg>
  )
}

/* ---------- 1. Find a time: plate with hatched thickness, three guest columns, wired to three guest sheets ---------- */
function ArtFind() {
  const o: P = [204, 62], W = 132, D = 92, T = 7
  const sats: [number, number, string][] = [[-74, 26, 'MC'], [56, -84, 'TP'], [176, -20, 'AR']]
  const busy: [number, number, number][] = [[0, 26, 38], [0, 60, 74], [1, 22, 40], [1, 62, 84], [2, 24, 34], [2, 64, 72], [2, 76, 86]]
  const anchor: P[] = [[0, 50], [92, 0], [W, 12]]
  return (
    <svg width="391" height="240" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden>
      <Guides o={o} w={W} d={D} z={-T} />
      {/* connectors: plate edge -> guest sheet centre, a node at each end */}
      {sats.map(([x, y], i) => {
        const a = pr(o, anchor[i][0], anchor[i][1]), b = pr(o, x + 22, y + 22)
        return <g key={i}><path d={seg(a, b)} stroke={DIM} /><circle cx={a[0]} cy={a[1]} r="1.8" fill="#bdbdbd" /></g>
      })}
      {sats.map(([x, y, n]) => (
        <g key={n}>
          <Sheet o={o} x={x} y={y} w={44} d={44} fill={CELL} stroke={DIM} nodes="none" />
          <Flat o={o}><circle cx={x + 22} cy={y + 22} r="13" fill="none" stroke={DIM} {...ns} /><text x={x + 22} y={y + 26} textAnchor="middle" fontSize="11" fontWeight="600" fill={GREY} letterSpacing="0.02em">{n}</text></Flat>
        </g>
      ))}
      {/* plate thickness, hatched (Full-stack) */}
      <g transform={yz(o, W)}><rect x="0" y="0" width={D} height={T} fill="url(#hy)" stroke={DIM} {...ns} /></g>
      <g transform={xz(o, D)}><rect x="0" y="0" width={W} height={T} fill="url(#hx)" stroke={DIM} {...ns} /></g>
      <Sheet o={o} w={W} d={D} />
      <Flat o={o}>
        <Mark x={8} y={7} s={0.62} fill={GREY} />
        <Rows x={20} y={9} w={[30, 18]} n={2} gap={4} />
        {[0, 1, 2].map((c) => <rect key={c} x={8 + c * 40} y={21} width={36} height={65} rx="3" fill="none" stroke={DIM} {...ns} />)}
        {busy.map(([c, a, b], i) => <rect key={i} x={11 + c * 40} y={a} width={30} height={b - a} rx="2" fill="rgb(255 255 255 / 0.13)" />)}
        {/* the one hour everyone has free */}
        <rect x={5} y={45} width={W - 10} height={10} rx="5" fill="#fff" />
        <path d={`M${W - 5} 50H${W + 20}`} stroke={EDGE} strokeDasharray="1.5 2.5" {...ns} />
        <text x={W + 23} y={53} fontSize="8" fontWeight="600" fill={GREY} letterSpacing="0.04em">10:00</text>
      </Flat>
    </svg>
  )
}

/* ---------- 2. Focus time: three standing panes in depth (Product UI/UX) ---------- */
function ArtFocus() {
  const o: P = [190, 134], W = 112, H = 96, step = 34
  const corners = (w: number, h: number) => [[0, -h], [w, -h], [w, 0], [0, 0]]
  const cells = [[0, 0, 0.13], [1, 0, 0.3], [3, 0, 0.13], [0, 1, 0.45], [2, 1, 0.13], [4, 1, 0.3], [1, 2, 0.13], [2, 2, 0.45], [3, 2, 0.13], [0, 3, 0.3], [3, 3, 0.45], [4, 3, 0.13], [1, 4, 0.3], [4, 4, 0.13]]
  return (
    <svg width="391" height="240" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden>
      <Guides o={o} w={W} d={step * 2} />
      {/* back pane: the focus block, framed, with corner nodes and a dotted leader to its label */}
      <g transform={xz(o, 0)}>
        <rect x="0" y={-H} width={W} height={H} fill={SHEET} stroke={EDGE} {...ns} />
        <rect x="10" y={-H + 12} width={W - 34} height="11" rx="5.5" fill="#fff" />
        <Rows x={10} y={-H + 32} w={[46, 30]} n={2} gap={5} />
        <circle cx={W - 30} cy={-30} r="17" fill="none" stroke={DIM} {...ns} />
        <path d={`M${W - 30} -30V-42M${W - 30} -30L${W - 22} -25`} stroke={EDGE} {...ns} />
        {corners(W, H).map(([a, b], i) => <rect key={i} x={a - 2.5} y={b - 2.5} width="5" height="5" fill="#e2e2e2" />)}
        <path d={`M${W} -18H${W + 46}`} stroke={EDGE} strokeDasharray="1.5 2.5" {...ns} />
        <rect x={W + 44} y={-20.5} width="5" height="5" fill="#e2e2e2" />
        <text x={W + 52} y={-14} fontSize="12" fontWeight="500" fill={GREY}>4h</text>
        <Rows x={W + 52} y={-6} w={[18, 12, 16]} n={3} gap={3} />
      </g>
      {/* middle pane: the week as a checker of meetings */}
      <g transform={xz(o, step)}>
        <rect x="0" y={-H + 6} width={W - 12} height={H - 6} fill={SHEET} stroke={DIM} {...ns} />
        {cells.map(([c, r, a], i) => <rect key={i} x={10 + c * 16} y={-H + 18 + r * 15} width="14" height="13" fill={`rgb(255 255 255 / ${a})`} />)}
      </g>
      {/* front pane: the noise of requests, vertical hatch */}
      <g transform={xz(o, step * 2)}>
        <rect x="0" y={-H + 14} width={W - 24} height={H - 14} fill={SHEET} stroke={DIM} {...ns} />
        <rect x="0" y={-H + 14} width={W - 24} height={H - 14} fill="url(#hy)" />
        <rect x="14" y={-52} width="13" height="13" fill={SHEET} /><rect x="44" y={-34} width="13" height="13" fill="rgb(255 255 255 / 0.4)" /><rect x="58" y={-66} width="13" height="13" fill={SHEET} />
        {[[0, -H + 14], [W - 24, -H + 14], [W - 24, 0], [0, 0]].map(([a, b], i) => <rect key={i} x={a - 2.5} y={b - 2.5} width="5" height="5" fill="#6b6b6b" />)}
      </g>
    </svg>
  )
}

/* ---------- 3. Conflicts: exploded sheets, the moved meeting dropping from its old slot (Branding) ---------- */
function ArtConflict() {
  const o: P = [212, 58], W = 124, D = 92, Z = [0, -30, -60]
  const oldB = { x: 46, y: 30, w: 58, d: 20 }, newB = { x: 46, y: 60, w: 58, d: 20 }
  return (
    <svg width="391" height="240" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden>
      <Guides o={o} w={W} d={D} z={Z[2]} />
      {/* bottom: the day itself */}
      <Sheet o={o} w={W} d={D} z={Z[2]} fill={LOW} stroke={DIM} nodes="dim" />
      <Flat o={o} z={Z[2]}>
        <rect x="4" y="64" width="54" height="24" fill="url(#hx)" />
        <rect x="100" y="8" width="20" height="56" fill="#fff" filter="url(#grain)" opacity="0.5" />
        <Rows x={66} y={70} w={[40, 28, 34]} n={4} gap={4.5} />
      </Flat>
      {/* middle: the meeting that stays, and the dashed slot the other one is leaving, overlap hatched */}
      <Sheet o={o} w={W} d={D} z={Z[1]} fill={LOW} stroke={DIM} nodes="dim" />
      <Flat o={o} z={Z[1]}>
        <rect x="14" y="16" width="56" height="26" rx="4" fill="rgb(255 255 255 / 0.13)" stroke={DIM} {...ns} />
        <rect x={oldB.x} y={oldB.y} width={24} height={12} fill="url(#hx)" />
        <rect x={oldB.x} y={oldB.y} width={oldB.w} height={oldB.d} rx="4" fill="none" stroke={EDGE} strokeDasharray="3 2.5" {...ns} />
      </Flat>
      {/* top: the moved meeting, the one white mark */}
      <Sheet o={o} w={W} d={D} />
      <Flat o={o}>
        <Rows x={8} y={10} w={[34, 22]} n={2} gap={4} />
        <rect x={newB.x} y={newB.y} width={newB.w} height={newB.d} rx="5" fill="#fff" />
        <text x={newB.x} y={newB.y - 5} fontSize="7.5" fontWeight="600" fill={GREY} letterSpacing="0.04em">1:00 PM</text>
      </Flat>
      {/* dotted drops: new slot corners on top down to the old slot below */}
      {[[0, 0], [newB.w, 0], [newB.w, newB.d], [0, newB.d]].map(([dx, dy], i) => {
        const a = pr(o, newB.x + dx, newB.y + dy, 0), b = pr(o, oldB.x + dx, oldB.y + dy, Z[1])
        return <path key={i} d={seg(a, b)} stroke={DIM} strokeDasharray="1.5 2.5" />
      })}
    </svg>
  )
}

/* ---------- 4. Scheduling links: the booking page curls down into the calendar (Landing pages) ---------- */
function ArtLink() {
  const o: P = [340, 92], D = 88, ZH = 46, X1 = 86, X2 = 150, X3 = 232
  const zAt = (x: number) => (x <= X1 ? ZH : x >= X2 ? 0 : ZH * (0.5 + 0.5 * Math.cos(((x - X1) / (X2 - X1)) * Math.PI)))
  const xs = Array.from({ length: 33 }, (_, i) => X1 + ((X2 - X1) * i) / 32)
  const edge = (y: number) => xs.map((x) => pr(o, x, y, zAt(x)))
  const line = (pts: P[]) => 'M' + pts.map((p) => p.map((n) => n.toFixed(2)).join(' ')).join('L')
  const curveFill = 'M' + [...edge(0), ...edge(D).reverse()].map((p) => p.map((n) => n.toFixed(2)).join(' ')).join('L') + 'Z'
  const slots: [number, number][] = [[10, 40], [36, 40], [62, 40], [10, 56], [36, 56], [62, 56]]
  return (
    <svg width="598" height="250" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden>
      <Guides o={o} w={X3} d={D} />
      {/* link satellite, wired to the page */}
      <path d={seg(pr(o, 0, 46, ZH), pr(o, -62, 46, ZH))} stroke={DIM} />
      <circle cx={pr(o, 0, 46, ZH)[0]} cy={pr(o, 0, 46, ZH)[1]} r="1.8" fill="#bdbdbd" />
      <Sheet o={o} x={-110} y={24} z={ZH} w={48} d={44} fill={CELL} stroke={DIM} nodes="none" />
      <Flat o={o} z={ZH}><rect x={-102} y={39} width={20} height={12} rx="6" fill="none" stroke={GREY} strokeWidth="2.4" /><rect x={-90} y={41} width={20} height={12} rx="6" fill="none" stroke={GREY} strokeWidth="2.4" /></Flat>
      {/* calendar end (flat, z 0) */}
      <Sheet o={o} x={X2} w={X3 - X2} d={D} nodes="none" />
      <Flat o={o}>
        {[0, 1, 2].map((c) => <rect key={c} x={X2 + 8 + c * 25} y={10} width={22} height={74} rx="3" fill="none" stroke={DIM} {...ns} />)}
        <rect x={X2 + 36} y={20} width={16} height={14} rx="2" fill="rgb(255 255 255 / 0.13)" />
        <rect x={X2 + 11} y={52} width={16} height={18} rx="2" fill="rgb(255 255 255 / 0.13)" />
        <rect x={X2 + 36} y={44} width={16} height={18} rx="2.5" fill="rgb(255 255 255 / 0.34)" stroke={EDGE} {...ns} />
      </Flat>
      {/* the curl, hatched along its fall */}
      <path d={curveFill} fill={SHEET} />
      {xs.filter((_, i) => i % 2 === 0).map((x, i) => <path key={i} d={seg(pr(o, x, 0, zAt(x)), pr(o, x, D, zAt(x)))} stroke={TEX} strokeWidth="0.8" />)}
      <path d={line(edge(0))} fill="none" stroke={EDGE} /><path d={line(edge(D))} fill="none" stroke={EDGE} />
      {/* booking page (flat, raised) */}
      <Sheet o={o} w={X1} d={D} z={ZH} nodes="none" />
      <Flat o={o} z={ZH}>
        <Mark x={8} y={8} s={0.62} fill={GREY} />
        <Rows x={8} y={22} w={[44, 30]} n={2} gap={5} stroke={DIM} />
        {slots.map(([x, y], i) => i === 4 ? <rect key={i} x={x} y={y} width={22} height={10} rx="5" fill="#fff" /> : <rect key={i} x={x} y={y} width={22} height={10} rx="5" fill="none" stroke={DIM} {...ns} />)}
        <Rows x={8} y={76} w={[60, 40]} n={2} gap={4} />
      </Flat>
      {/* outer edges + the corner nodes of the whole sheet */}
      <path d={seg(pr(o, 0, 0, ZH), pr(o, 0, D, ZH))} stroke={EDGE} /><path d={seg(pr(o, X3, 0), pr(o, X3, D))} stroke={EDGE} />
      <path d={seg(pr(o, 0, 0, ZH), pr(o, X1, 0, ZH))} stroke={EDGE} /><path d={seg(pr(o, 0, D, ZH), pr(o, X1, D, ZH))} stroke={EDGE} />
      <path d={seg(pr(o, X2, 0), pr(o, X3, 0))} stroke={EDGE} /><path d={seg(pr(o, X2, D), pr(o, X3, D))} stroke={EDGE} />
      {[pr(o, 0, 0, ZH), pr(o, 0, D, ZH), pr(o, X3, 0), pr(o, X3, D)].map((p, i) => <path key={i} d={`M${p[0]} ${p[1] - 2.6}l4.5 2.6l-4.5 2.6l-4.5 -2.6Z`} fill="#e2e2e2" />)}
    </svg>
  )
}

/* ---------- 5. Weekly insight: outline iso bars on a base sheet, days and hours laid in plane ---------- */
function IsoBox({ o, x, y, w, d, h, top = SHEET }: { o: P; x: number; y: number; w: number; d: number; h: number; top?: string }) {
  return (
    <g>
      <g transform={yz(o, x + w)}><rect x={y} y={-h} width={d} height={h} fill={CELL} stroke={EDGE} {...ns} /></g>
      <g transform={xz(o, y + d)}><rect x={x} y={-h} width={w} height={h} fill={SHEET} stroke={EDGE} {...ns} /></g>
      <Flat o={o} z={h}><rect x={x} y={y} width={w} height={d} fill={top} stroke={EDGE} {...ns} /></Flat>
    </g>
  )
}
function ArtInsight() {
  const o: P = [322, 96], W = 206, D = 72
  const days: [string, number][] = [['MON', 40], ['TUE', 62], ['WED', 28], ['THU', 92], ['FRI', 52]]
  return (
    <svg width="598" height="250" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden>
      <Guides o={o} w={W} d={D} />
      <Sheet o={o} w={W} d={D} fill={LOW} />
      <Flat o={o}>
        <rect x="4" y="50" width="196" height="18" fill="url(#hx)" opacity="0.6" />
        {days.map(([n], i) => <text key={n} x={22 + i * 38} y={62} fontSize="7" fontWeight="600" fill={GREY} letterSpacing="0.06em">{n}</text>)}
      </Flat>
      {/* back to front so nearer bars overlap farther ones */}
      {days.map(([n, h], i) => <IsoBox key={n} o={o} x={20 + i * 38} y={16} w={22} d={22} h={h} top={i === 3 ? '#fff' : SHEET} />)}
      {/* the week's figure, standing on a satellite card behind */}
      <g transform={xz(o, -46)}>
        <rect x="132" y="-70" width="82" height="58" fill={SHEET} stroke={DIM} {...ns} />
        <text x="140" y="-40" fontSize="22" fontWeight="500" letterSpacing="-0.03em" fill={GREY}>15h</text>
        <Rows x={140} y={-30} w={[50, 34, 42]} n={3} gap={4} />
      </g>
    </svg>
  )
}

function Cell({ w, h, title, body, chips, art, artShift = 0 }: { w: number; h: number; title: string; body: string; chips: string[]; art: ReactNode; artShift?: number }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: w, height: h, background: CELL, borderRadius: 18 }}>
      <div style={{ position: 'absolute', inset: 0, transform: `translateY(${artShift}px)` }}>{art}</div>
      <div style={{ position: 'absolute', left: 23.5, top: 17, fontSize: 18.5, fontWeight: 650, letterSpacing: '-0.02em', color: '#f2f2f2' }}>{title}</div>
      <div style={{ position: 'absolute', left: 23.5, right: 23.5, bottom: 22 }}>
        <p style={{ margin: 0, fontSize: 14.3, lineHeight: '22px', color: '#9b9b9b', maxWidth: 520 }}>{body}</p>
        <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', columnGap: 5, rowGap: 9 }}>{chips.map((c) => <span key={c} style={{ display: 'flex', alignItems: 'center', height: 25, padding: '0 12px', borderRadius: 99, fontSize: 10, fontWeight: 650, letterSpacing: '0.01em', background: '#272727', color: '#ececec' }}>{c}</span>)}</div>
      </div>
    </div>
  )
}

export default function BentoK() {
  const row = { display: 'flex', gap: 20 } as const
  return (
    <div style={{ position: 'relative', width: 1440, height: 1160, background: '#232323', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"' }}>
      <Defs />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 92, textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 44, fontWeight: 550, lineHeight: 1.06, letterSpacing: '-0.04em', color: '#f2f2f2' }}>Every Hour, Accounted For</h2>
        <p style={{ margin: '16px auto 0', fontSize: 17, lineHeight: '26px', color: '#9b9b9b' }}>Cadence finds the time, guards the focus and settles the conflicts,<br />so your week arrives already arranged.</p>
      </div>
      <div data-subject style={{ position: 'absolute', left: 109, top: 290, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={row}>
          <Cell w={391} h={434} artShift={34} title="Find a time" art={<ArtFind />} body="Cadence reads every guest's calendar and puts the one hour that works for all of them on the table." chips={['GOOGLE', 'OUTLOOK', 'TIME ZONES', 'ROOMS']} />
          <Cell w={391} h={434} artShift={34} title="Focus time" art={<ArtFocus />} body="Deep work is a real block on the calendar. Requests that would break it get a polite later slot." chips={['FOCUS BLOCKS', 'AUTO DECLINE', 'DO NOT DISTURB']} />
          <Cell w={391} h={434} artShift={34} title="Conflicts" art={<ArtConflict />} body="When two meetings collide, Cadence moves the one with the most flexible guests to their next shared slot." chips={['OVERLAPS', 'RESCHEDULE', 'NOTIFY GUESTS']} />
        </div>
        <div style={row}>
          <Cell w={601} h={386} artShift={4} title="Scheduling links" art={<ArtLink />} body="Share one link. People pick from the slots you actually have, and the event lands on both calendars." chips={['BOOKING PAGES', 'ROUND ROBIN', 'BUFFERS', 'ZOOM', 'GOOGLE MEET']} />
          <Cell w={601} h={386} artShift={4} title="Weekly insight" art={<ArtInsight />} body="See how much of the week went to meetings and how much to deep work, per person and per team." chips={['FOCUS HOURS', 'MEETING LOAD', 'TEAM REPORTS']} />
        </div>
      </div>
    </div>
  )
}
