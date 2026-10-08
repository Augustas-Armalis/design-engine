import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useMemo } from 'react'

// One flat, two renderings. Units are centimetres; the sample flat is 10.8 x 7.8 m (84.2 m2).
type Seg = [number, number, number, number]
const OUTER: Seg[] = [[0, 0, 1080, 0], [1080, 0, 1080, 780], [0, 0, 0, 780], [0, 780, 480, 780], [570, 780, 1080, 780]]
const INNER: Seg[] = [[620, 0, 620, 300], [620, 390, 620, 460], [0, 460, 180, 460], [270, 460, 470, 460], [610, 460, 800, 460], [890, 460, 1080, 460], [380, 460, 380, 780], [760, 460, 760, 780]]
const WINDOWS: Seg[] = [[120, 0, 420, 0], [760, 0, 980, 0], [0, 120, 0, 340], [60, 780, 300, 780], [1080, 140, 1080, 360]]
const DOORS = [
  { hinge: [620, 390], leaf: [710, 390], to: [620, 300], sweep: 0 },
  { hinge: [180, 460], leaf: [180, 550], to: [270, 460], sweep: 0 },
  { hinge: [890, 460], leaf: [890, 550], to: [800, 460], sweep: 1 },
  { hinge: [480, 780], leaf: [480, 690], to: [570, 780], sweep: 1 },
]
const ROOMS = [
  { name: 'Living / Kitchen', area: '28.5', x: 310, y: 225, sketch: 'living?' },
  { name: 'Bedroom', area: '21.2', x: 850, y: 225, sketch: 'bed' },
  { name: 'Bedroom', area: '12.2', x: 190, y: 615, sketch: 'bed 2 ?' },
  { name: 'Hall', area: '12.2', x: 570, y: 615, sketch: 'hall' },
  { name: 'Bath', area: '10.2', x: 920, y: 615, sketch: 'bath' },
]
export const MARKERS = [
  { n: 1, x: 300, y: 150, note: 'Read your note “living?” as Living / Kitchen' },
  { n: 2, x: 620, y: 460, note: 'Squared 11 wobbly corners to exactly 90°' },
  { n: 3, x: 525, y: 780, note: 'Scaled from one known length: the 900 mm entrance door' },
]
const REST = 470 // where the boundary settles: sketch on the left, measured plan on the right

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

// Pencil version of a straight wall: overshoot at both ends, a slight bow, two passes.
function sketchPaths(segs: Seg[], seed: number) {
  const r = rng(seed)
  const out: { d: string; w: number; o: number }[] = []
  for (const [x1, y1, x2, y2] of segs) {
    const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len, px = -uy, py = ux
    for (let pass = 0; pass < 2; pass++) {
      const o1 = 8 + r() * 18, o2 = 8 + r() * 18, off = (r() - 0.5) * 7, bow = (r() - 0.5) * 16
      const ax = x1 - ux * o1 + px * off, ay = y1 - uy * o1 + py * off
      const bx = x2 + ux * o2 + px * (off + (r() - 0.5) * 6), by = y2 + uy * o2 + py * (off + (r() - 0.5) * 6)
      const mx = (ax + bx) / 2 + px * bow, my = (ay + by) / 2 + py * bow
      out.push({ d: `M${ax.toFixed(1)} ${ay.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`, w: pass ? 1.8 : 3.4, o: pass ? 0.5 : 0.95 })
    }
  }
  return out
}

function Dim({ x1, y1, x2, y2, label, vertical }: { x1: number; y1: number; x2: number; y2: number; label: string; vertical?: boolean }) {
  const t = 9
  const tick = (x: number, y: number) => <line x1={x - t} y1={y + t} x2={x + t} y2={y - t} stroke="var(--text-strong)" strokeWidth={1.6} />
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-strong)" strokeWidth={1} />
      {tick(x1, y1)}{tick(x2, y2)}
      <text x={vertical ? mx - 14 : mx} y={vertical ? my : my - 12} textAnchor="middle" transform={vertical ? `rotate(-90 ${mx - 14} ${my})` : undefined}
        fontFamily="var(--font-mono)" fontSize={21} fill="var(--text-strong)" className="num">{label}</text>
    </g>
  )
}

export function Plan({ onSettled }: { onSettled?: () => void }) {
  const reduce = useReducedMotion()
  const b = useMotionValue(reduce ? REST : 1150)
  const sketchW = useTransform(b, (v) => v + 220)
  const chipX = useTransform(b, (v) => v - 82)
  const sketchOuter = useMemo(() => sketchPaths(OUTER, 7), [])
  const sketchInner = useMemo(() => sketchPaths(INNER, 11), [])

  useEffect(() => {
    if (reduce) { onSettled?.(); return }
    const c = animate(b, REST, { duration: 1.7, delay: 0.45, ease: [0.16, 1, 0.3, 1], onComplete: () => onSettled?.() })
    return () => c.stop()
  }, [b, reduce, onSettled])

  return (
    <svg viewBox="-130 -150 1330 1060" className="block h-auto w-full" role="img"
      aria-label="Sample floor plan. Left of the red line, the hand sketch you uploaded; right of it, the measured plan Linework returned: five rooms, 84.2 square metres, dimensions in millimetres.">
      <defs>
        <clipPath id="lw-sketch"><motion.rect x={-220} y={-200} width={sketchW} height={1300} /></clipPath>
        <clipPath id="lw-clean"><motion.rect x={b} y={-200} width={2000} height={1300} /></clipPath>
      </defs>

      {/* the hand sketch */}
      <g clipPath="url(#lw-sketch)" fill="none" strokeLinecap="round">
        {[...sketchOuter, ...sketchInner].map((p, i) => <path key={i} d={p.d} stroke="var(--text-muted)" strokeWidth={p.w} opacity={p.o} />)}
        {ROOMS.map((r) => (
          <text key={r.sketch} x={r.x} y={r.y} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={30} fill="var(--text-muted)" transform={`rotate(-4 ${r.x} ${r.y})`}>{r.sketch}</text>
        ))}
        <text x={300} y={-46} fontFamily="var(--font-sans)" fontSize={26} fill="var(--text-muted)" transform="rotate(-3 300 -46)">~ 6 m ?</text>
        <text x={-70} y={240} fontFamily="var(--font-sans)" fontSize={26} fill="var(--text-muted)" transform="rotate(-92 -70 240)">4.5</text>
      </g>

      {/* the measured plan */}
      <g clipPath="url(#lw-clean)">
        {OUTER.map(([x1, y1, x2, y2], i) => <line key={'o' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-strong)" strokeWidth={24} strokeLinecap="square" />)}
        {INNER.map(([x1, y1, x2, y2], i) => <line key={'i' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-strong)" strokeWidth={12} strokeLinecap="square" />)}
        {WINDOWS.map(([x1, y1, x2, y2], i) => {
          const h = y1 === y2
          return (
            <g key={'w' + i}>
              <rect x={h ? x1 : x1 - 13} y={h ? y1 - 13 : y1} width={h ? x2 - x1 : 26} height={h ? 26 : y2 - y1} fill="var(--surface-raised)" />
              {[-12, 0, 12].map((d) => <line key={d} x1={h ? x1 : x1 + d} y1={h ? y1 + d : y1} x2={h ? x2 : x2 + d} y2={h ? y2 + d : y2} stroke="var(--text-strong)" strokeWidth={1.4} />)}
            </g>
          )
        })}
        {DOORS.map((d, i) => (
          <g key={'d' + i} fill="none" stroke="var(--text-strong)">
            <line x1={d.hinge[0]} y1={d.hinge[1]} x2={d.leaf[0]} y2={d.leaf[1]} strokeWidth={3} />
            <path d={`M${d.leaf[0]} ${d.leaf[1]} A90 90 0 0 ${d.sweep} ${d.to[0]} ${d.to[1]}`} strokeWidth={1.2} />
          </g>
        ))}
        {ROOMS.map((r) => (
          <g key={r.name + r.x}>
            <text x={r.x} y={r.y} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={600} fontSize={25} fill="var(--text-strong)">{r.name}</text>
            <text x={r.x} y={r.y + 32} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={21} fill="var(--text-muted)" className="num">{r.area} m²</text>
          </g>
        ))}
        <Dim x1={0} y1={-62} x2={620} y2={-62} label="6 200" />
        <Dim x1={620} y1={-62} x2={1080} y2={-62} label="4 600" />
        <Dim x1={0} y1={-108} x2={1080} y2={-108} label="10 800" />
        <Dim x1={1142} y1={0} x2={1142} y2={460} label="4 600" vertical />
        <Dim x1={1142} y1={460} x2={1142} y2={780} label="3 200" vertical />
      </g>

      {/* the boundary: where the measuring happens */}
      <g>
        <motion.line x1={b} y1={-150} x2={b} y2={860} stroke="var(--accent-solid)" strokeWidth={3} />
        <motion.rect x={chipX} y={856} width={164} height={40} fill="var(--accent-solid)" />
        <motion.text x={b} y={883} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={19} fontWeight={500} fill="var(--text-on-accent)">sketch | plan</motion.text>
      </g>

      {/* what Linework did, numbered to the notes below the sheet */}
      {MARKERS.map((m, i) => (
        <motion.g key={m.n} initial={reduce ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduce ? 0 : 2.15 + i * 0.12, duration: 0.32, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: `${m.x}px ${m.y}px`, transformBox: 'view-box' }}>
          <rect x={m.x - 19} y={m.y - 19} width={38} height={38} fill="var(--surface-inverse)" />
          <text x={m.x} y={m.y + 8} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={22} fontWeight={500} fill="var(--text-inverse)">{m.n}</text>
        </motion.g>
      ))}
    </svg>
  )
}
