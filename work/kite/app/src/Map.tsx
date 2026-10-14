// Traffic by region, v2 (founder: "the map is not polished... Marcel / Rico style").
// A fine dot field (4.3px pitch, Equal Earth) shaded like a heat map: dots brighten near busy regions and warm to red
// around the degraded one; a radial mask fades the edges. Nodes are crisp white cores with soft light. Origin pulls from
// iad1 are hairline arcs with a light travelling along them; the suggested reroute sin1 -> hkg1 is the one red arc.
// Loops: travelling lights + the degraded node's pulse.
import { useMemo } from 'react'
import { geoContains, geoEqualEarth } from 'd3-geo'
import { feature } from 'topojson-client'
import land110 from 'world-atlas/land-110m.json'
import { regions, series, fmtK } from './data'

const W = 712, H = 336, STEP = 4.3
const FLOWS: [string, string][] = [['iad1', 'fra1'], ['iad1', 'sfo1'], ['iad1', 'gru1'], ['fra1', 'bom1'], ['hnd1', 'hkg1'], ['hkg1', 'syd1'], ['lhr1', 'iad1']]

export default function Map({ rerouted = false }: { rerouted?: boolean }) {
  const { dots, P } = useMemo(() => {
    const land = feature(land110 as never, (land110 as never as { objects: { land: never } }).objects.land) as never
    const proj = geoEqualEarth().fitExtent([[-14, -46], [W + 14, H + 96]], { type: 'Sphere' } as never)
    const P = Object.fromEntries(regions.map((r) => [r.code, proj([r.lon, r.lat])!])) as Record<string, [number, number]>
    const max = Math.max(...regions.map((r) => r.rps))
    const dots: { x: number; y: number; a: number; red: number }[] = []
    for (let y = STEP / 2; y < H; y += STEP) for (let x = STEP / 2; x < W; x += STEP) {
      const ll = proj.invert!([x, y]); if (!ll || ll[1] < -56) continue
      if (!geoContains(land, ll)) continue
      let heat = 0
      for (const r of regions) { const [rx, ry] = P[r.code]; const d2 = (x - rx) ** 2 + (y - ry) ** 2; heat += (0.35 + 0.65 * r.rps / max) * Math.exp(-d2 / (2 * 34 ** 2)) }
      const [sx, sy] = P.sin1; const red = Math.exp(-((x - sx) ** 2 + (y - sy) ** 2) / (2 * 28 ** 2))
      dots.push({ x, y, a: Math.min(0.62, 0.075 + heat * 0.42), red })
    }
    return { dots, P }
  }, [])
  const max = Math.max(...regions.map((r) => r.rps))
  const arc = (a: [number, number], b: [number, number], lift = 0.22) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy)
    return `M${a[0]} ${a[1]} Q${mx} ${my - len * lift} ${b[0]} ${b[1]}`
  }
  const [sx, sy] = P.sin1
  const reroute = arc(P.sin1, P.hkg1, 0.35)
  const sinSeries = series.slice(40, 90).map((d) => d.p95 * 2.6)
  const sMax = Math.max(...sinSeries), sMin = Math.min(...sinSeries)
  const spark = sinSeries.map((v, i) => `${i ? 'L' : 'M'}${(i / (sinSeries.length - 1)) * 190} ${30 - ((v - sMin) / (sMax - sMin)) * 26}`).join(' ')

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg width={W} height={H} className="absolute inset-0" role="img" aria-label="World map of requests per second by edge region, sample data">
        <defs>
          <radialGradient id="fade" cx="50%" cy="48%" r="62%"><stop offset="0.62" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
          <mask id="edge"><rect width={W} height={H} fill="url(#fade)" /></mask>
          <radialGradient id="glow"><stop offset="0" stopColor="#fff" stopOpacity="0.32" /><stop offset="0.45" stopColor="#fff" stopOpacity="0.08" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <radialGradient id="glow-red"><stop offset="0" stopColor="var(--red)" stopOpacity="0.55" /><stop offset="0.45" stopColor="var(--red)" stopOpacity="0.14" /><stop offset="1" stopColor="var(--red)" stopOpacity="0" /></radialGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" /></filter>
          {FLOWS.map(([a, b]) => <linearGradient key={a + b} id={`g-${a}-${b}`} gradientUnits="userSpaceOnUse" x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]}><stop offset="0" stopColor="#fff" stopOpacity="0.04" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.32" /><stop offset="1" stopColor="#fff" stopOpacity="0.04" /></linearGradient>)}
          <linearGradient id="g-reroute" gradientUnits="userSpaceOnUse" x1={P.sin1[0]} y1={P.sin1[1]} x2={P.hkg1[0]} y2={P.hkg1[1]}><stop offset="0" stopColor="var(--red)" /><stop offset="1" stopColor="#fff" /></linearGradient>
        </defs>
        <g mask="url(#edge)">
          {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={0.95} fill={!rerouted && d.red > 0.18 ? 'var(--red)' : '#fff'} fillOpacity={!rerouted && d.red > 0.18 ? Math.min(0.75, 0.2 + d.red * 0.6) : d.a} />)}
        </g>
        {FLOWS.map(([a, b], i) => { const d = arc(P[a], P[b]); return (
          <g key={a + b}>
            <path d={d} fill="none" stroke={`url(#g-${a}-${b})`} strokeWidth="1" />
            <circle r="1.6" fill="#fff" filter="url(#soft)" className="pulse"><animateMotion dur={`${3.2 + (i % 3) * 0.7}s`} begin={`-${0.6 + i * 0.45}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" /></circle>
            <circle r="0.9" fill="#fff" className="pulse"><animateMotion dur={`${3.2 + (i % 3) * 0.7}s`} begin={`-${0.6 + i * 0.45}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" /></circle>
          </g>) })}
        {!rerouted && (
          <g>
            <path d={reroute} fill="none" stroke="url(#g-reroute)" strokeWidth="1.25" strokeDasharray="2 3.5" strokeLinecap="round" style={{ animation: 'dash 1.2s linear infinite' }} className="pulse" />
          </g>
        )}
        {regions.map((r) => {
          const [x, y] = P[r.code], rad = 2 + Math.sqrt(r.rps / max) * 1.6, hot = r.state === 'hot' && !rerouted
          return (
            <g key={r.code}>
              <circle cx={x} cy={y} r={rad * 7} fill={`url(#${hot ? 'glow-red' : 'glow'})`} />
              {hot && <circle cx={x} cy={y} r={rad + 2} fill="none" stroke="var(--red)" strokeWidth="1" className="pulse" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'pulse-ring 1.8s cubic-bezier(.22,1,.36,1) infinite' }} />}
              <circle cx={x} cy={y} r={rad + 2.2} fill="#0a0a0b" fillOpacity="0.85" stroke={hot ? 'var(--red)' : '#fff'} strokeOpacity={hot ? 0.9 : 0.28} strokeWidth="1" />
              <circle cx={x} cy={y} r={rad} fill={hot ? 'var(--red)' : '#fff'} />
            </g>
          )
        })}
      </svg>
      {/* chip labels */}
      {regions.map((r) => {
        const [x, y] = P[r.code], left = ['sfo1', 'lhr1', 'gru1', 'bom1'].includes(r.code), hot = r.state === 'hot' && !rerouted
        return (
          <span key={r.code} className={`pointer-events-none absolute flex h-[19px] -translate-y-1/2 items-center gap-1 rounded-full px-1.5 shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_4px_10px_-2px_rgb(0_0_0/0.6)] backdrop-blur-sm ${hot ? 'bg-[rgb(60_22_20/0.85)]' : 'bg-[rgb(22_22_24/0.85)]'}`}
            style={{ top: y, ...(left ? { right: W - x + 11 } : { left: x + 11 }) }}>
            <span className={`mono text-[10.5px] ${hot ? 'text-[var(--red)]' : 'text-[var(--ink)]'}`}>{r.code}</span>
            <span className="tnum text-[10.5px] text-[var(--soft)]">{fmtK(r.rps)}</span>
          </span>
        )
      })}
      {/* tactile read-out on the region that needs attention */}
      {!rerouted && (
        <div className="absolute w-[236px] rounded-[14px] p-1 shadow-[var(--pop)]" style={{ left: sx - 262, top: sy - 28, background: 'linear-gradient(180deg,#1d1d1f,#161618)' }}>
          <div className="flex items-center gap-2 px-2.5 pb-1 pt-2">
            <span className="relative grid size-2 place-items-center"><span className="absolute size-2 rounded-full bg-[var(--red)] opacity-40" /><span className="size-1.5 rounded-full bg-[var(--red)]" /></span>
            <span className="text-[13px] font-[600]">Singapore</span><span className="mono ml-auto text-[var(--soft)]">sin1 · p95</span>
          </div>
          <svg width="208" height="36" className="mx-2.5 my-1 block overflow-visible" aria-hidden>
            <defs><linearGradient id="sp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--red)" stopOpacity="0.28" /><stop offset="1" stopColor="var(--red)" stopOpacity="0" /></linearGradient></defs>
            <path d={`${spark} L190 34 L0 34 Z`} fill="url(#sp)" /><path d={spark} fill="none" stroke="var(--red)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[10px] bg-[rgb(255_255_255/0.06)]">
            {[['p95', '124', 'ms', true], ['req/s', fmtK(157800), '', false], ['5xx', '0.36', '%', true]].map(([k, v, u, bad]) => (
              <div key={k as string} className="bg-[#18181a] px-2.5 py-2"><div className="text-[11px] text-[var(--soft)]">{k}</div><div className={`tnum text-[15px] font-[600] ${bad ? 'text-[var(--red)]' : ''}`}>{v}<span className="text-[11px] font-[500] text-[var(--soft)]">{u}</span></div></div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
