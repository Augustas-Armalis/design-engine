// Latency, last 24h: p95 is the line that matters (accent + soft area), p50 and p99 sit quietly around it. The incident
// window is a faint red band; deploys are ticks on the floor (the bad one red). Hover snaps to 15-min points.
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ease } from './anim'
import { deploys, series, timeLabel } from './data'

const W = 712, H = 170, PT = 12, PB = 24, PR = 40, MAX = 180
const x = (i: number) => (i / (series.length - 1)) * (W - PR)
const y = (v: number) => PT + (1 - v / MAX) * (H - PT - PB)
const line = (k: 'p50' | 'p95' | 'p99') => series.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(d[k]).toFixed(1)}`).join(' ')

export default function Chart({ at = 0 }: { at?: number }) {
  const still = useReducedMotion()
  const DRAW = 0.85, draw0 = at + 0.08
  const passes = (i: number) => draw0 + DRAW * (i / (series.length - 1)) // when the line reaches point i
  const fade = (delay: number) => (still ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.35 } })
  const drawn = (delay: number) => (still ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay, duration: DRAW, ease: ease.inOut } })
  const [h, setH] = useState<number | null>(null)
  const d = h != null ? series[h] : null
  return (
    <div className="relative select-none" style={{ width: W, height: H }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const i = Math.round(((e.clientX - r.left) / (W - PR)) * (series.length - 1)); setH(i >= 0 && i < series.length ? i : null) }}
      onPointerLeave={() => setH(null)}>
      <svg width={W} height={H} className="absolute inset-0 overflow-visible" role="img" aria-label="p50, p95 and p99 latency over 24 hours, sample data">
        <defs>
          <linearGradient id="p95f" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.1" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <linearGradient id="p95s" gradientUnits="userSpaceOnUse" x1="0" x2={W - PR} y1="0" y2="0">
            <stop offset={x(54) / (W - PR)} stopColor="#ededed" /><stop offset={x(58) / (W - PR)} stopColor="var(--red)" /><stop offset={x(68) / (W - PR)} stopColor="var(--red)" /><stop offset={x(72) / (W - PR)} stopColor="#ededed" />
          </linearGradient>
          <filter id="lineglow" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="3.5" /></filter>
        </defs>
        {[0, 50, 100, 150].map((t, k) => <motion.g key={t} {...fade(at + k * 0.05)}><line x1={0} x2={W - PR} y1={y(t)} y2={y(t)} stroke="var(--div)" /><text x={W - PR + 10} y={y(t) + 4} className="tnum fill-[var(--soft)] text-[11px]">{t}</text></motion.g>)}
        <motion.rect x={x(57)} width={x(70) - x(57)} y={PT} height={H - PT - PB} fill="var(--red)" fillOpacity="0.045" {...fade(passes(57))} />
        <motion.text x={x(57) + 6} y={PT + 12} className="fill-[var(--red)] text-[11px] font-[500]" {...fade(passes(62))}>sin1 · p95 elevated</motion.text>
        <motion.path d={`${line('p95')} L${x(series.length - 1)} ${y(0)} L0 ${y(0)} Z`} fill="url(#p95f)" {...fade(draw0 + DRAW * 0.85)} />
        <motion.path d={line('p99')} fill="none" stroke="var(--sub)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="2 3" {...fade(draw0 + 0.25)} />
        <motion.path d={line('p50')} fill="none" stroke="var(--sub)" strokeOpacity="0.7" strokeWidth="1.25" {...drawn(draw0 + 0.06)} />
        <motion.path d={line('p95')} fill="none" stroke="url(#p95s)" strokeWidth="4" strokeOpacity="0.55" filter="url(#lineglow)" {...drawn(draw0)} />
        <motion.path d={line('p95')} fill="none" stroke="url(#p95s)" strokeWidth="1.75" strokeLinejoin="round" {...drawn(draw0)} />
        {deploys.map((dp) => (
          <motion.g key={dp.id} style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} {...(still ? {} : { initial: { opacity: 0, scaleY: 0 }, animate: { opacity: 1, scaleY: 1 }, transition: { delay: passes(dp.i), type: 'spring', stiffness: 600, damping: 28 } })}><line x1={x(dp.i)} x2={x(dp.i)} y1={H - PB - 8} y2={H - PB} stroke={dp.bad ? 'var(--red)' : 'var(--sub)'} strokeWidth="1.5" /><circle cx={x(dp.i)} cy={H - PB - 10} r={2.5} fill={dp.bad ? 'var(--red)' : 'var(--sub)'} /></motion.g>
        ))}
        {[0, 16, 32, 48, 64, 80].map((i) => <motion.text key={i} {...fade(passes(i))} x={x(i)} y={H - 6} textAnchor={i ? 'middle' : 'start'} className="tnum fill-[var(--soft)] text-[11px]">{timeLabel(i)}</motion.text>)}
        {d && <g><line x1={x(h!)} x2={x(h!)} y1={PT} y2={H - PB} stroke="var(--ink)" strokeOpacity="0.2" /><circle cx={x(h!)} cy={y(d.p95)} r={4} fill={h! >= 57 && h! <= 70 ? 'var(--red)' : '#fff'} stroke="#121213" strokeWidth="2" /></g>}
      </svg>
      {d && (
        <div className="pointer-events-none absolute z-10 w-[168px] rounded-[12px] p-2.5 shadow-[var(--pop)]" style={{ left: Math.min(x(h!) + 12, W - PR - 168), top: 8, background: 'linear-gradient(180deg,#1d1d1f,#161618)' }}>
          <div className="tnum mb-1.5 text-[11px] text-[var(--soft)]">Today {timeLabel(h!)}</div>
          {(['p99', 'p95', 'p50'] as const).map((k) => (
            <div key={k} className="flex items-center gap-2 text-[12px] leading-[18px]"><span className={`h-[2px] w-2.5 rounded-full ${k === 'p95' ? 'bg-[var(--ink)]' : 'bg-[var(--sub)] opacity-60'}`} /><span className="flex-1 text-[var(--sub)]">{k}</span><span className="tnum font-[600]">{Math.round(d[k])} ms</span></div>
          ))}
        </div>
      )}
    </div>
  )
}
