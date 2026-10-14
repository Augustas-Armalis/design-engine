// Traffic by region: a dot-matrix world (Equal Earth, land tested per dot) with one node per edge region sized by
// requests/s. Healthy nodes are periwinkle; the elevated region is red. The dashed arc is the suggested reroute
// (sin1 -> hkg1). Loops: node pulses + the arc's dash flow (two, the page maximum).
import { useMemo } from 'react'
import { geoContains, geoEqualEarth } from 'd3-geo'
import { feature } from 'topojson-client'
import land110 from 'world-atlas/land-110m.json'
import { regions, fmtK } from './data'

const W = 712, H = 318, STEP = 6.2
export default function Map({ rerouted = false }: { rerouted?: boolean }) {
  const { dots, proj } = useMemo(() => {
    const land = feature(land110 as never, (land110 as never as { objects: { land: never } }).objects.land) as never
    const proj = geoEqualEarth().fitExtent([[6, 10], [W - 6, H + 34]], { type: 'Sphere' } as never)
    const dots: [number, number][] = []
    for (let y = STEP / 2; y < H; y += STEP) for (let x = STEP / 2; x < W; x += STEP) {
      const ll = proj.invert!([x, y]); if (!ll) continue
      if (ll[1] < -58) continue // drop Antarctica
      if (geoContains(land, ll)) dots.push([x, y])
    }
    return { dots, proj }
  }, [])
  const max = Math.max(...regions.map((r) => r.rps))
  const P = Object.fromEntries(regions.map((r) => [r.code, proj([r.lon, r.lat])!]))
  const [sx, sy] = P.sin1, [hx, hy] = P.hkg1
  const arc = `M${sx} ${sy} Q ${(sx + hx) / 2 + 26} ${(sy + hy) / 2 + 4} ${hx} ${hy}`

  return (
    <div className="relative" style={{ width: W, height: H }}>
      <svg width={W} height={H} className="absolute inset-0 overflow-visible" role="img" aria-label="World map of requests per second by edge region, sample data">
        <defs>
          <radialGradient id="halo"><stop offset="0" stopColor="var(--accent)" stopOpacity="0.45" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
          <radialGradient id="halo-red"><stop offset="0" stopColor="var(--red)" stopOpacity="0.5" /><stop offset="1" stopColor="var(--red)" stopOpacity="0" /></radialGradient>
        </defs>
        {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.15} fill="rgb(243 245 250)" fillOpacity={0.17} />)}
        {!rerouted && <path d={arc} fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 4" strokeLinecap="round" style={{ animation: 'dash 1.4s linear infinite' }} className="pulse" />}
        {regions.map((r, i) => {
          const [x, y] = P[r.code], rad = 2.6 + Math.sqrt(r.rps / max) * 4.2, hot = r.state === 'hot' && !rerouted
          return (
            <g key={r.code}>
              <circle cx={x} cy={y} r={rad * 4} fill={`url(#${hot ? 'halo-red' : 'halo'})`} />
              <circle cx={x} cy={y} r={rad} fill="none" stroke={hot ? 'var(--red)' : 'var(--accent)'} strokeWidth="1" className="pulse"
                style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `pulse-ring ${hot ? 1.6 : 2.8}s ${(i * 0.37) % 2.8}s cubic-bezier(.22,1,.36,1) infinite` }} />
              <circle cx={x} cy={y} r={rad} fill={hot ? 'var(--red)' : 'var(--accent)'} stroke="var(--s1)" strokeWidth="1.5" />
            </g>
          )
        })}
      </svg>
      {/* code labels, offset so they never sit on a node */}
      {regions.map((r) => { const [x, y] = P[r.code]; const left = ['sfo1', 'gru1', 'lhr1'].includes(r.code); return (
        <span key={r.code} className={`mono pointer-events-none absolute -translate-y-1/2 text-[11px] ${r.state === 'hot' && !rerouted ? 'text-[var(--red)]' : 'text-[var(--soft)]'}`}
          style={{ top: y, ...(left ? { right: W - x + 10 } : { left: x + 10 }) }}>{r.code}</span>) })}
      {/* the pinned read-out on the region that needs attention */}
      {!rerouted && <div className="absolute w-[214px] rounded-[12px] bg-[var(--s2)] p-1 shadow-[var(--pop)]" style={{ left: sx - 228, top: sy + 24 }}>
        <div className="flex items-center gap-2 px-2.5 pb-1.5 pt-2">
          <span className="size-1.5 rounded-full bg-[var(--red)]" /><span className="text-[13px] font-[600]">Singapore</span><span className="mono ml-auto text-[var(--soft)]">sin1</span>
        </div>
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[8px] bg-[var(--div)]">
          {[['p95', '124', 'ms', true], ['req/s', fmtK(157800), '', false], ['5xx', '0.36', '%', true]].map(([k, v, u, bad]) => (
            <div key={k as string} className="bg-[var(--s2)] px-2.5 py-2"><div className="text-[11px] text-[var(--soft)]">{k}</div><div className={`tnum text-[15px] font-[600] ${bad ? 'text-[var(--red)]' : ''}`}>{v}<span className="text-[11px] font-[500] text-[var(--soft)]">{u}</span></div></div>
          ))}
        </div>
      </div>}
    </div>
  )
}
