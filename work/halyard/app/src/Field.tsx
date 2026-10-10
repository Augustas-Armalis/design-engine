// The Halyard signature visual (after Marcel Kargul's Uplinq / Supermetal pixel art): a service map drawn as a matrix of
// square cells. Services are blocks, routes are single-cell lines, packets travel along them. An incident lights the
// checkout-api block amber (the only accent: "a human is needed"), its routes stall amber, then the agent's scan line
// sweeps across and cools the cells back to white. One clock (performance.now) drives every frame, so Reel's virtual clock
// records it frame-exact; reduced motion draws the resolved state once.
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const COLS = 34, ROWS = 24, CELL = 11, GAP = 5, P = CELL + GAP
const W = COLS * P - GAP, H = ROWS * P - GAP
const LOOP = 11 // seconds
// phase times inside one loop (s)
const IGNITE = 1.4, SCAN0 = 3.6, SCAN1 = 6.6, RESOLVED = 6.9

type Block = { id: string; c: number; r: number; w: number; h: number }
const BLOCKS: Block[] = [
  { id: 'gateway', c: 1, r: 2, w: 6, h: 4 },
  { id: 'auth', c: 1, r: 15, w: 6, h: 5 },
  { id: 'checkout-api', c: 13, r: 8, w: 8, h: 7 },
  { id: 'payments', c: 26, r: 2, w: 7, h: 5 },
  { id: 'orders-db', c: 26, r: 15, w: 7, h: 6 },
  { id: 'search', c: 13, r: 19, w: 6, h: 3 },
]
// routes as polylines in cell coordinates (horizontal / vertical legs only)
const ROUTES: { pts: [number, number][]; hot: boolean }[] = [
  { pts: [[7, 4], [10, 4], [10, 10], [12, 10]], hot: true },
  { pts: [[7, 17], [10, 17], [10, 13], [12, 13]], hot: true },
  { pts: [[21, 9], [23, 9], [23, 4], [25, 4]], hot: true },
  { pts: [[21, 13], [23, 13], [23, 18], [25, 18]], hot: true },
  { pts: [[16, 15], [16, 18]], hot: false },
]
const routeCells = ROUTES.map(({ pts, hot }) => {
  const cells: [number, number][] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const [c0, r0] = pts[i], [c1, r1] = pts[i + 1]
    const n = Math.max(Math.abs(c1 - c0), Math.abs(r1 - r0))
    for (let k = i ? 1 : 0; k <= n; k++) cells.push([c0 + Math.sign(c1 - c0) * k, r0 + Math.sign(r1 - r0) * k])
  }
  return { cells, hot }
})
const ROUTE_AT = new Map<string, boolean>()
routeCells.forEach(({ cells, hot }) => cells.forEach(([c, r]) => ROUTE_AT.set(`${c},${r}`, hot)))
const inBlock = (b: Block, c: number, r: number) => c >= b.c && c < b.c + b.w && r >= b.r && r < b.r + b.h
const HOT = BLOCKS[2]
const hash = (c: number, r: number) => { const x = Math.sin(c * 127.1 + r * 311.7) * 43758.5453; return x - Math.floor(x) }
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

export type FieldPhase = 'calm' | 'incident' | 'scanning' | 'resolved'

function draw(ctx: CanvasRenderingContext2D, t: number, intro: number) {
  ctx.clearRect(0, 0, W, H)
  const lt = t % LOOP
  const ignite = smooth(IGNITE, IGNITE + 0.8, lt) * (1 - smooth(RESOLVED, RESOLVED + 1.2, lt))
  const scanX = lt > SCAN0 && lt < SCAN1 ? ((lt - SCAN0) / (SCAN1 - SCAN0)) * (COLS + 4) - 2 : lt >= SCAN1 ? 99 : -99
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const appear = smooth(0, 1, intro * 2.2 - (c + r) / (COLS + ROWS)) // diagonal load-in
    if (appear <= 0) continue
    const block = BLOCKS.find((b) => inBlock(b, c, r))
    const route = ROUTE_AT.get(`${c},${r}`)
    let a = 0.028, rgb = '255,255,255'
    if (block) a = 0.2 + hash(c, r) * 0.06
    else if (route !== undefined) a = 0.12
    // incident: checkout-api cells flicker amber until the scan line has passed them
    const cooled = scanX > c ? smooth(0, 1.2, scanX - c) : 0
    if (block === HOT && ignite > 0) {
      const flick = 0.55 + 0.45 * Math.sin(t * (3 + hash(c, r) * 5) + hash(r, c) * 6.28)
      const heat = ignite * (1 - cooled)
      if (heat > 0.02) { rgb = '245,165,36'; a = a * (1 - heat) + heat * (0.35 + 0.55 * flick) }
      else a += 0.3 * (1 - smooth(RESOLVED, RESOLVED + 1.4, lt))
    }
    const d = Math.abs(c - scanX) // scan line: a soft white column
    if (d < 2.2) a += (1 - d / 2.2) * 0.32
    ctx.fillStyle = `rgba(${rgb},${(a * appear).toFixed(3)})`
    ctx.fillRect(c * P, r * P, CELL, CELL)
  }
  // packets travel along routes; hot routes stall and turn amber during the incident
  routeCells.forEach(({ cells, hot }, i) => {
    const stall = hot ? ignite * (scanX > 22 ? 0 : 1) : 0
    const pos = ((t * 9 * (1 - 0.85 * stall) + i * 7) % (cells.length + 6)) - 3
    for (let k = 0; k < 3; k++) {
      const idx = Math.floor(pos) - k
      if (idx < 0 || idx >= cells.length) continue
      const [c, r] = cells[idx]
      const a = (0.85 - k * 0.28) * intro
      ctx.fillStyle = stall > 0.3 ? `rgba(245,165,36,${a})` : `rgba(255,255,255,${a})`
      ctx.fillRect(c * P, r * P, CELL, CELL)
    }
  })
}

export default function Field({ at = 0.5, onPhase }: { at?: number; onPhase?: (p: FieldPhase) => void }) {
  const still = useReducedMotion()
  const ref = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<FieldPhase>('calm')
  useEffect(() => { onPhase?.(phase) }, [phase, onPhase])

  useEffect(() => {
    const cv = ref.current!, dpr = Math.min(3, window.devicePixelRatio || 1)
    cv.width = W * dpr; cv.height = H * dpr
    const ctx = cv.getContext('2d')!; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (still) { draw(ctx, RESOLVED + 2, 1); setPhase('resolved'); return }
    const t0 = performance.now() + at * 1000
    let raf = 0, last: FieldPhase = 'calm'
    const tick = () => {
      const t = Math.max(0, (performance.now() - t0) / 1000)
      draw(ctx, t, Math.min(1, t / 1.6))
      const lt = t % LOOP
      const p: FieldPhase = lt < IGNITE + 0.4 ? 'calm' : lt < SCAN0 ? 'incident' : lt < RESOLVED ? 'scanning' : 'resolved'
      if (p !== last) { last = p; setPhase(p) }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [still, at])

  const hot = phase === 'incident' || phase === 'scanning'
  return (
    <div className="relative" style={{ width: W, height: H }} role="img" aria-label="Sample service map: checkout-api lights up as an incident, the Halyard agent scans the map and the service returns to normal">
      <canvas ref={ref} style={{ width: W, height: H }} />
      {/* callouts sit on the grid above their block: mono, never over the cells they describe */}
      {[BLOCKS[0], BLOCKS[3], BLOCKS[4], BLOCKS[1], BLOCKS[5]].map((b) => (
        <span key={b.id} aria-hidden className="mono absolute -translate-y-[19px] bg-[var(--canvas)] pr-1.5 text-[11px] leading-[14px] tracking-[0.02em] text-[var(--sub)]" style={{ left: b.c * P, top: b.r * P }}>{b.id}</span>
      ))}
      <div aria-hidden className="absolute flex items-center gap-2 bg-[var(--canvas)] pr-1.5" style={{ left: HOT.c * P, top: HOT.r * P - 26 }}>
        <span className={`mono text-[11px] leading-none tracking-[0.02em] transition-colors duration-500 ${hot ? 'text-[var(--amber-ink)]' : 'text-[var(--ink)]'}`}>checkout-api</span>
        <span className={`mono rounded-[3px] px-1.5 py-[3px] text-[10.5px] leading-none transition-colors duration-500 ${hot ? 'bg-[var(--amber-tint)] text-[var(--amber-ink)]' : 'bg-white/[0.06] text-[var(--sub)]'}`}>
          {phase === 'incident' ? 'p99 2.4s' : phase === 'scanning' ? 'agent scanning' : phase === 'resolved' ? 'p99 180ms' : 'p99 182ms'}
        </span>
      </div>
    </div>
  )
}
