// Gridline's signature visual: Europe as a fine dot matrix shaded by grid load (dots darken around busy nodes), country
// nodes as crisp white cores with a soft ring, interconnector flows as hairline arcs with a light travelling along them in
// the direction of flow, and the one congested line (FR -> ES at 98%) drawn in amber with a pulsing node. Light mode.
// Land test via an offscreen canvas (Kite's landMask technique) so tens of thousands of dots build in one frame.
import { useMemo } from 'react'
import { motion } from 'motion/react'
import { geoConicConformal, geoPath, type GeoProjection } from 'd3-geo'
import { feature } from 'topojson-client'
import land50 from 'world-atlas/land-50m.json'

export type Node = { code: string; name: string; lon: number; lat: number; load: number }
export const NODES: Node[] = [
  { code: 'FR', name: 'France', lon: 2.4, lat: 46.6, load: 0.92 }, { code: 'DE', name: 'Germany', lon: 10.4, lat: 51.1, load: 0.86 },
  { code: 'ES', name: 'Spain', lon: -3.7, lat: 40.3, load: 0.71 }, { code: 'IT', name: 'Italy', lon: 12.6, lat: 42.8, load: 0.64 },
  { code: 'GB', name: 'Great Britain', lon: -1.6, lat: 53.0, load: 0.78 }, { code: 'NL', name: 'Netherlands', lon: 5.3, lat: 52.2, load: 0.58 },
  { code: 'PL', name: 'Poland', lon: 19.4, lat: 52.1, load: 0.55 }, { code: 'NO', name: 'Norway', lon: 8.5, lat: 60.5, load: 0.48 },
  { code: 'SE', name: 'Sweden', lon: 15.5, lat: 60.1, load: 0.44 }, { code: 'PT', name: 'Portugal', lon: -8.2, lat: 39.6, load: 0.39 },
  { code: 'AT', name: 'Austria', lon: 14.5, lat: 47.6, load: 0.41 }, { code: 'DK', name: 'Denmark', lon: 9.3, lat: 56.0, load: 0.36 },
  { code: 'CZ', name: 'Czechia', lon: 15.4, lat: 49.8, load: 0.38 }, { code: 'CH', name: 'Switzerland', lon: 8.2, lat: 46.8, load: 0.46 },
]
// [from, to, MW, congested?]
export const FLOWS: [string, string, number, boolean?][] = [
  ['NO', 'DE', 1400], ['NO', 'GB', 1250], ['FR', 'GB', 1980], ['DE', 'PL', 820], ['FR', 'IT', 2100], ['SE', 'DK', 640],
  ['DK', 'DE', 900], ['NL', 'GB', 1000], ['CH', 'IT', 1600], ['DE', 'AT', 1300], ['CZ', 'AT', 540], ['ES', 'PT', 700], ['FR', 'ES', 2940, true],
]

const land = feature(land50 as never, (land50 as never as { objects: { land: never } }).objects.land) as never
function landMask(proj: GeoProjection, w: number, h: number) {
  const c = document.createElement('canvas'); c.width = Math.ceil(w); c.height = Math.ceil(h)
  const ctx = c.getContext('2d')!
  ctx.beginPath(); geoPath(proj, ctx)(land); ctx.fillStyle = '#fff'; ctx.fill()
  const data = ctx.getImageData(0, 0, c.width, c.height).data
  return (x: number, y: number) => { const i = (Math.floor(y) * c.width + Math.floor(x)) * 4 + 3; return x >= 0 && y >= 0 && x < c.width && y < c.height && data[i] > 127 }
}

const AMBER = '#e8890c', INK = '17 17 17'

export default function GridMap({ w, h, step = 3.8, at = 0 }: { w: number; h: number; step?: number; at?: number }) {
  const { dots, P } = useMemo(() => {
    const proj = geoConicConformal().rotate([-9, 0]).parallels([38, 60])
      .fitExtent([[0, 18], [w, 254]], { type: 'MultiPoint', coordinates: [[-11, 38.5], [23, 38.5], [-11, 59], [23, 59]] } as never)
    const isLand = landMask(proj, w, h)
    const P = Object.fromEntries(NODES.map((n) => [n.code, proj([n.lon, n.lat])!])) as Record<string, [number, number]>
    const dots: { x: number; y: number; a: number; hot: number }[] = []
    const [fx, fy] = P.FR, [ex, ey] = P.ES, hx = (fx + ex) / 2 + 8, hy = (fy + ey) / 2
    for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) {
      if (!isLand(x, y)) continue
      let heat = 0
      for (const n of NODES) { const [nx, ny] = P[n.code]; heat += n.load * Math.exp(-((x - nx) ** 2 + (y - ny) ** 2) / (2 * 46 ** 2)) }
      const hot = Math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / (2 * 30 ** 2))
      // edge fade so the map dissolves into the card
      const edge = Math.min(1, x / 50, (w - x) / 50, y / 24, (330 - y) / 60)
      dots.push({ x, y, a: (0.15 + Math.min(1, heat) * 0.36) * Math.max(0, edge), hot })
    }
    // centre the land horizontally in the card (Kite): measure the dot field and shift dots + nodes
    const xs = dots.filter((d) => d.a > 0.05).map((d) => d.x)
    const dx = Math.round((w - (Math.min(...xs) + Math.max(...xs))) / 2)
    for (const d of dots) d.x += dx
    for (const k of Object.keys(P)) P[k] = [P[k][0] + dx, P[k][1]]
    return { dots, P }
  }, [w, h, step])

  const arc = (a: [number, number], b: [number, number]) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), mx = (a[0] + b[0]) / 2 - dy * 0.18, my = (a[1] + b[1]) / 2 + dx * 0.18 - len * 0.08
    return `M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`
  }
  const max = Math.max(...FLOWS.map((f) => f[2]))
  return (
    <svg width={w} height={h} className="block" aria-hidden>
      <defs>
        <radialGradient id="node-glow"><stop offset="0" stopColor={`rgb(${INK})`} stopOpacity="0.14" /><stop offset="1" stopColor={`rgb(${INK})`} stopOpacity="0" /></radialGradient>
        <radialGradient id="hot-glow"><stop offset="0" stopColor={AMBER} stopOpacity="0.35" /><stop offset="1" stopColor={AMBER} stopOpacity="0" /></radialGradient>
      </defs>
      <g>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.15} fill={d.hot > 0.25 ? AMBER : `rgb(${INK})`} fillOpacity={d.hot > 0.25 ? Math.min(0.9, d.a + d.hot * 0.5) : d.a} />
        ))}
      </g>
      {FLOWS.map(([a, b, mw, bad], i) => {
        const p = arc(P[a], P[b]), dur = 3.4 - (mw / max) * 1.4
        return (
          <g key={a + b}>
            <motion.path d={p} fill="none" stroke={bad ? AMBER : `rgb(${INK})`} strokeOpacity={bad ? 0.95 : 0.3} strokeWidth={bad ? 1.8 : 0.8 + (mw / max) * 1}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: at + 0.2 + i * 0.05, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
            <circle r={bad ? 2.4 : 1.8} fill={bad ? AMBER : `rgb(${INK})`} opacity="0">
              <set attributeName="opacity" to={bad ? '1' : '0.7'} begin={`${at + 1.2 + i * 0.2}s`} />
              <animateMotion dur={`${dur}s`} begin={`${at + 1.2 + i * 0.2}s`} repeatCount="indefinite" path={p} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.3 1" />
            </circle>
          </g>
        )
      })}
      {NODES.map((n) => {
        const [x, y] = P[n.code], r = 3 + n.load * 3.2, hot = n.code === 'FR' || n.code === 'ES'
        return (
          <g key={n.code}>
            <circle cx={x} cy={y} r={r * 5} fill={`url(#${hot ? 'hot-glow' : 'node-glow'})`} />
            {n.code === 'FR' && <circle cx={x} cy={y} r={r + 3} fill="none" stroke={AMBER} strokeWidth="1"><animate attributeName="r" values={`${r + 2};${r + 14}`} dur="1.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0" dur="1.8s" repeatCount="indefinite" /></circle>}
            <circle cx={x} cy={y} r={r + 2.2} fill="#fff" stroke={hot ? AMBER : `rgb(${INK})`} strokeOpacity={hot ? 0.9 : 0.18} />
            <circle cx={x} cy={y} r={r * 0.55} fill={hot ? AMBER : `rgb(${INK})`} />
          </g>
        )
      })}
      {/* labels: code + load, on white chips */}
      {NODES.filter((n) => ['FR', 'DE', 'ES', 'GB', 'IT', 'NO', 'PL'].includes(n.code)).map((n) => {
        const [x, y] = P[n.code], left = ['GB', 'ES', 'FR'].includes(n.code)
        return (
          <foreignObject key={n.code} x={left ? x - 92 : x + 12} y={y - 12} width="80" height="24">
            <div className={`flex h-[22px] w-fit items-center gap-1 rounded-full bg-white/90 px-2 text-[11px] font-[500] tabular-nums shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.05)] ${left ? 'ml-auto' : ''}`} style={{ color: '#171717' }}>
              {n.code}<span style={{ color: n.code === 'FR' ? AMBER : '#8a8a8a' }}>{Math.round(n.load * 100)}%</span>
            </div>
          </foreignObject>
        )
      })}
    </svg>
  )
}
