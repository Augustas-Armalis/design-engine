// Traffic by region, v2 (founder: "the map is not polished... Marcel / Rico style").
// A fine dot field (4.3px pitch, Equal Earth) shaded like a heat map: dots brighten near busy regions and warm to red
// around the degraded one; a radial mask fades the edges. Nodes are crisp white cores with soft light. Origin pulls from
// iad1 are hairline arcs with a light travelling along them; the suggested reroute sin1 -> hkg1 is the one red arc.
// Loops: travelling lights + the degraded node's pulse.
import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ease, T } from './anim'
import { geoEqualEarth } from 'd3-geo'
import { landMask } from './geo'
import { regions, series, fmtK } from './data'

const W = 712, H = 300, STEP = 4.3
const FLOWS: [string, string][] = [['iad1', 'fra1'], ['iad1', 'sfo1'], ['iad1', 'gru1'], ['fra1', 'bom1'], ['hnd1', 'hkg1'], ['hkg1', 'syd1'], ['lhr1', 'iad1']]

export default function Map({ rerouted = false, at = 0 }: { rerouted?: boolean; at?: number }) {
  const still = useReducedMotion()
  // load-in stages: routes draw once the nodes have lit, their lights start after, then sin1 flares red
  const [stage, setStage] = useState(still ? 3 : 0)
  useEffect(() => {
    if (still) return
    const ids = [[1, at + (T.beam ? 0.95 : 0.85)], [2, at + (T.beam ? 1.5 : 1.45)], [3, T.sin]].map(([s, t]) => window.setTimeout(() => setStage((p) => Math.max(p, s)), t * 1000))
    return () => ids.forEach(clearTimeout)
  }, [at, still])
  // when a point appears: behind the scan beam (left to right), or, without the beam, a soft bloom out from the centre
  // without the beam the map resolves like pixels: a diagonal sweep with per-dot jitter (j), each dot stepping in
  const scan = (x: number, y = H / 2, j = 0) => T.beam ? at + 0.15 + (x / W) * 0.85 + (y / H) * 0.12 : at + 0.05 + ((x / W) * 0.8 + (y / H) * 0.2) * 0.85 + j * 0.4
  const jit = (i: number) => { const s = Math.sin(i * 12.9898) * 43758.5453; return s - Math.floor(s) }
  const { dots, P } = useMemo(() => {
    const proj = geoEqualEarth().fitExtent([[-14, -46], [W + 14, H + 96]], { type: 'Sphere' } as never)
    const isLand = landMask(proj, W, H)
    const P = Object.fromEntries(regions.map((r) => [r.code, proj([r.lon, r.lat])!])) as Record<string, [number, number]>
    const max = Math.max(...regions.map((r) => r.rps))
    const dots: { x: number; y: number; a: number; red: number }[] = []
    for (let y = STEP / 2; y < H; y += STEP) for (let x = STEP / 2; x < W; x += STEP) {
      const ll = proj.invert!([x, y]); if (!ll || ll[1] < -56) continue
      if (!isLand(x, y)) continue
      let heat = 0
      for (const r of regions) { const [rx, ry] = P[r.code]; const d2 = (x - rx) ** 2 + (y - ry) ** 2; heat += (0.35 + 0.65 * r.rps / max) * Math.exp(-d2 / (2 * 34 ** 2)) }
      const [sx, sy] = P.sin1; const red = Math.exp(-((x - sx) ** 2 + (y - sy) ** 2) / (2 * 28 ** 2))
      dots.push({ x, y, a: Math.min(0.62, 0.075 + heat * 0.42), red })
    }
    // centre the land in the card: measure the dot field's bounds and shift dots + nodes by the difference
    const xs = dots.map((d) => d.x), ys = dots.map((d) => d.y)
    const dx = Math.round((W - (Math.min(...xs) + Math.max(...xs))) / 2), dy = Math.round((H - (Math.min(...ys) + Math.max(...ys))) / 2)
    for (const d of dots) { d.x += dx; d.y += dy }
    for (const k of Object.keys(P)) P[k] = [P[k][0] + dx, P[k][1] + dy]
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

  const flare = stage >= 3 && !rerouted
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
        {/* the dot field lights up behind the scanning beam */}
        <g mask="url(#edge)">
          {dots.map((d, i) => {
            const red = flare && d.red > 0.18
            return <circle key={i} cx={d.x} cy={d.y} r={0.95} className="dot" fill={red ? 'var(--red)' : '#fff'} fillOpacity={red ? Math.min(0.75, 0.2 + d.red * 0.6) : d.a}
              style={{ animationDelay: `${scan(d.x, d.y, jit(i))}s`, ...(T.beam ? {} : { animationName: 'dot-px', animationDuration: '0.5s', animationTimingFunction: 'steps(3, end)' }), transitionDelay: red ? `${Math.hypot(d.x - sx, d.y - sy) / 200}s` : '0s' }} />
          })}
        </g>
        {FLOWS.map(([a, b], i) => { const d = arc(P[a], P[b]); return (
          <g key={a + b}>
            <motion.path d={d} fill="none" stroke={`url(#g-${a}-${b})`} strokeWidth="1" initial={still ? false : { pathLength: 0, opacity: 0 }} animate={stage >= 1 ? { pathLength: 1, opacity: 1 } : undefined} transition={{ duration: 0.85, delay: i * 0.05, ease: ease.inOut }} />
            {stage >= 2 && <>
              <circle r="1.6" fill="#fff" filter="url(#soft)" className="pulse"><animateMotion dur={`${3.2 + (i % 3) * 0.7}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" /></circle>
              <circle r="0.9" fill="#fff" className="pulse"><animateMotion dur={`${3.2 + (i % 3) * 0.7}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" /></circle>
            </>}
          </g>) })}
        {flare && (
          <motion.path d={reroute} fill="none" stroke="url(#g-reroute)" strokeWidth="1.25" strokeDasharray="2 3.5" strokeLinecap="round" style={{ animation: 'dash 1.2s linear infinite' }} className="pulse"
            initial={still ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.15, duration: 0.8, ease: ease.inOut }} />
        )}
        {regions.map((r) => {
          const [x, y] = P[r.code], rad = 2 + Math.sqrt(r.rps / max) * 1.6, hot = r.state === 'hot' && flare
          return (
            <motion.g key={r.code} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial={still ? false : { opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: scan(x, T.beam ? 0 : y) + (T.beam ? 0.02 : 0.25), duration: T.beam ? 0.7 : 1.0, ease: ease.out }}>
              <circle cx={x} cy={y} r={rad * 7} fill="url(#glow)" style={{ opacity: hot ? 0 : 1, transition: 'opacity .6s' }} />
              <circle cx={x} cy={y} r={rad * 7} fill="url(#glow-red)" style={{ opacity: hot ? 1 : 0, transition: 'opacity .6s' }} />
              {hot && <circle cx={x} cy={y} r={rad + 2} fill="none" stroke="var(--red)" strokeWidth="1" className="pulse" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'pulse-ring 1.8s cubic-bezier(.22,1,.36,1) infinite' }} />}
              <circle cx={x} cy={y} r={rad + 2.2} fill="#0a0a0b" fillOpacity="0.85" stroke={hot ? 'var(--red)' : '#fff'} strokeOpacity={hot ? 0.9 : 0.28} strokeWidth="1" style={{ transition: 'stroke .5s, stroke-opacity .5s' }} />
              <circle cx={x} cy={y} r={rad} fill={hot ? 'var(--red)' : '#fff'} style={{ transition: 'fill .5s' }} />
            </motion.g>
          )
        })}
      </svg>
      {/* the scanning beam: a soft light bar with a bright core, crossing once */}
      {!still && T.beam && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-y-0 w-[120px]" initial={{ x: -140, opacity: 0 }} animate={{ x: [-140, W + 20], opacity: [0, 1, 1, 0] }}
          transition={{ delay: at + 0.15, duration: 0.95, ease: ease.inOut, opacity: { delay: at + 0.15, duration: 0.95, times: [0, 0.12, 0.8, 1] } }}
          style={{ background: 'linear-gradient(90deg, transparent, rgb(255 255 255 / 0.05) 70%, rgb(255 255 255 / 0.12) 96%, transparent)', maskImage: 'linear-gradient(180deg, transparent, #000 15%, #000 85%, transparent)' }}>
          <span className="absolute inset-y-[10%] right-[4px] w-px bg-[linear-gradient(180deg,transparent,rgb(255_255_255/0.7),transparent)]" />
        </motion.div>
      )}
      {/* chip labels arrive just after their node */}
      {regions.map((r) => {
        const [x, y] = P[r.code], left = ['sfo1', 'lhr1', 'gru1', 'bom1'].includes(r.code), hot = r.state === 'hot' && flare
        return (
          <motion.span key={r.code} initial={still ? false : { opacity: 0, x: left ? 6 : -6, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ delay: scan(x, T.beam ? 0 : y) + (T.beam ? 0.1 : 0.4), duration: 0.6, ease: ease.out }}
            className={`pointer-events-none absolute flex h-[19px] -translate-y-1/2 items-center gap-1 rounded-full px-1.5 shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_4px_10px_-2px_rgb(0_0_0/0.6)] backdrop-blur-sm transition-colors duration-500 ${hot ? 'bg-[rgb(60_22_20/0.85)]' : 'bg-[rgb(22_22_24/0.85)]'}`}
            style={{ top: y, ...(left ? { right: W - x + 11 } : { left: x + 11 }) }}>
            <span className={`mono text-[10.5px] transition-colors duration-500 ${hot ? 'text-[var(--red)]' : 'text-[var(--ink)]'}`}>{r.code}</span>
            <span className="tnum text-[10.5px] text-[var(--soft)]">{fmtK(r.rps)}</span>
          </motion.span>
        )
      })}
      {/* tactile read-out springs in once sin1 flares; its sparkline draws */}
      {flare && (
        <motion.div className="absolute w-[236px] rounded-[14px] p-1 shadow-[var(--pop)]" style={{ left: sx - 262, top: sy - 28, background: 'linear-gradient(180deg,#1d1d1f,#161618)', transformOrigin: '100% 20%' }}
          initial={still ? false : { opacity: 0, scale: 0.96, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: ease.out, opacity: { delay: 0.25, duration: 0.4 } }}>
          <div className="flex items-center gap-2 px-2.5 pb-1 pt-2">
            <span className="relative grid size-2 place-items-center"><span className="absolute size-2 rounded-full bg-[var(--red)] opacity-40" /><span className="size-1.5 rounded-full bg-[var(--red)]" /></span>
            <span className="text-[13px] font-[600]">Singapore</span><span className="mono ml-auto text-[var(--soft)]">sin1 · p95</span>
          </div>
          <svg width="208" height="36" className="mx-2.5 my-1 block overflow-visible" aria-hidden>
            <defs><linearGradient id="sp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--red)" stopOpacity="0.28" /><stop offset="1" stopColor="var(--red)" stopOpacity="0" /></linearGradient></defs>
            <motion.path d={`${spark} L190 34 L0 34 Z`} fill="url(#sp)" initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.6 }} />
            <motion.path d={spark} fill="none" stroke="var(--red)" strokeWidth="1.5" strokeLinejoin="round" initial={still ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.85, ease: ease.inOut }} />
          </svg>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[10px] bg-[rgb(255_255_255/0.06)]">
            {[['p95', '124', 'ms', true], ['req/s', fmtK(157800), '', false], ['5xx', '0.36', '%', true]].map(([k, v, u, bad]) => (
              <div key={k as string} className="bg-[#18181a] px-2.5 py-2"><div className="text-[11px] text-[var(--soft)]">{k}</div><div className={`tnum text-[15px] font-[600] ${bad ? 'text-[var(--red)]' : ''}`}>{v}<span className="text-[11px] font-[500] text-[var(--soft)]">{u}</span></div></div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
