// Hero background built from the dashboard's own design language: its 4.3px dot-matrix world (white dots, heat-shaded
// by region traffic), crisp white region nodes with soft light, chip labels ("fra1 312k") and hairline route arcs. It
// lives only between the rails, is cleared behind the headline/subtitle/CTAs by a mask, and fades before the product.
import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { geoEqualEarth } from 'd3-geo'
import { landMask } from './geo'
import { regions, fmtK } from './data'

const W = 1200, H = 470, STEP = 4.6
const ROUTES: [string, string][] = [['sfo1', 'iad1'], ['iad1', 'lhr1'], ['fra1', 'bom1'], ['hkg1', 'hnd1'], ['iad1', 'gru1'], ['sin1', 'syd1']]
const LABEL = ['sfo1', 'gru1', 'lhr1', 'hnd1', 'syd1', 'sin1']

export default function HeroMap() {
  const still = useReducedMotion()
  const { dots, P } = useMemo(() => {
    const proj = geoEqualEarth().fitExtent([[-140, 62], [W + 60, H + 275]], { type: 'Sphere' } as never)
    const isLand = landMask(proj, W, H)
    const P = Object.fromEntries(regions.map((r) => [r.code, proj([r.lon, r.lat])!])) as Record<string, [number, number]>
    const max = Math.max(...regions.map((r) => r.rps))
    const dots: { x: number; y: number; a: number }[] = []
    for (let y = STEP / 2; y < H; y += STEP) for (let x = STEP / 2; x < W; x += STEP) {
      const ll = proj.invert!([x, y]); if (!ll || ll[1] < -56 || !isLand(x, y)) continue
      let heat = 0
      for (const r of regions) { const [rx, ry] = P[r.code]; heat += (0.35 + 0.65 * r.rps / max) * Math.exp(-((x - rx) ** 2 + (y - ry) ** 2) / (2 * 40 ** 2)) }
      dots.push({ x, y, a: Math.min(0.52, 0.12 + heat * 0.36) })
    }
    return { dots, P }
  }, [])
  const arc = (a: [number, number], b: [number, number]) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, len = Math.hypot(b[0] - a[0], b[1] - a[1]); return `M${a[0]} ${a[1]} Q${mx} ${my - len * 0.25} ${b[0]} ${b[1]}` }
  // clear the reading zone (headline + subtitle + CTAs) and fade before the product
  const mask = 'radial-gradient(40% 44% at 50% 49%, transparent 64%, #000 100%), linear-gradient(180deg, #000 78%, transparent 100%)'
  return (
    <motion.div aria-hidden className="pointer-events-none absolute left-[120px] top-[73px] z-0" style={{ width: W, height: H, maskImage: mask, WebkitMaskImage: mask, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
      initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1.6 }}>
      <svg width={W} height={H} className="absolute inset-0">
        <defs>
          <radialGradient id="hm-red"><stop offset="0" stopColor="#ff6b5e" stopOpacity="0.45" /><stop offset="0.45" stopColor="#ff6b5e" stopOpacity="0.1" /><stop offset="1" stopColor="#ff6b5e" stopOpacity="0" /></radialGradient>
          <radialGradient id="hm-glow"><stop offset="0" stopColor="#fff" stopOpacity="0.32" /><stop offset="0.45" stopColor="#fff" stopOpacity="0.08" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          {ROUTES.map(([a, b]) => <linearGradient key={a + b} id={`hm-${a}${b}`} gradientUnits="userSpaceOnUse" x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]}><stop offset="0" stopColor="#fff" stopOpacity="0.03" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.3" /><stop offset="1" stopColor="#fff" stopOpacity="0.03" /></linearGradient>)}
        </defs>
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={0.95} fill="#fff" fillOpacity={d.a} />)}
        {ROUTES.map(([a, b], i) => { const d = arc(P[a], P[b]); return (
          <g key={a + b}>
            <path d={d} fill="none" stroke={`url(#hm-${a}${b})`} strokeWidth="1" />
            {!still && <circle r="1.6" fill="#fff"><animateMotion dur={`${5 + i * 0.8}s`} begin={`${1.5 + i * 0.9}s`} repeatCount="indefinite" path={d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.25 1" /><animate attributeName="opacity" values="0;0.8;0.8;0" keyTimes="0;0.15;0.8;1" dur={`${5 + i * 0.8}s`} begin={`${1.5 + i * 0.9}s`} repeatCount="indefinite" /></circle>}
          </g>) })}
        {regions.map((r) => { const [x, y] = P[r.code], hot = r.state === 'hot'; return (
          <g key={r.code}>
            <circle cx={x} cy={y} r={hot ? 22 : 16} fill={`url(#${hot ? 'hm-red' : 'hm-glow'})`} />
            {hot && !still && <circle cx={x} cy={y} r={6} fill="none" stroke="#ff6b5e" strokeWidth="1" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'pulse-ring 2.4s cubic-bezier(.22,1,.36,1) 2s infinite', opacity: 0 }} />}
            <circle cx={x} cy={y} r={4.6} fill="#0a0a0b" stroke={hot ? '#ff6b5e' : '#fff'} strokeOpacity={hot ? 0.8 : 0.28} />
            <circle cx={x} cy={y} r={2.4} fill={hot ? '#ff6b5e' : '#fff'} />
          </g>
        ) })}
      </svg>
      {LABEL.map((c) => { const [x, y] = P[c], r = regions.find((q) => q.code === c)!, left = ['sfo1', 'gru1', 'lhr1'].includes(c); return (
        <span key={c} className="absolute flex h-[19px] -translate-y-1/2 items-center gap-1 rounded-full bg-[rgb(22_22_24/0.85)] px-1.5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]" style={{ top: y, ...(left ? { right: W - x + 10 } : { left: x + 10 }) }}>
          <span className={`font-mono text-[10.5px] ${r.state === 'hot' ? 'text-[#ff6b5e]' : 'text-[#ededed]'}`}>{c}</span><span className="text-[10.5px] text-[#8b8b90]">{fmtK(r.rps)}</span>
        </span>
      ) })}
    </motion.div>
  )
}
