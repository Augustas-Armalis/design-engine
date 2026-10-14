// Latency, last 24h: p95 is the line that matters (accent + soft area), p50 and p99 sit quietly around it. The incident
// window is a faint red band; deploys are ticks on the floor (the bad one red). Hover snaps to 15-min points.
import { useState } from 'react'
import { deploys, series, timeLabel } from './data'

const W = 712, H = 210, PT = 14, PB = 26, PR = 40, MAX = 180
const x = (i: number) => (i / (series.length - 1)) * (W - PR)
const y = (v: number) => PT + (1 - v / MAX) * (H - PT - PB)
const line = (k: 'p50' | 'p95' | 'p99') => series.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(d[k]).toFixed(1)}`).join(' ')

export default function Chart() {
  const [h, setH] = useState<number | null>(null)
  const d = h != null ? series[h] : null
  return (
    <div className="relative select-none" style={{ width: W, height: H }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const i = Math.round(((e.clientX - r.left) / (W - PR)) * (series.length - 1)); setH(i >= 0 && i < series.length ? i : null) }}
      onPointerLeave={() => setH(null)}>
      <svg width={W} height={H} className="absolute inset-0 overflow-visible" role="img" aria-label="p50, p95 and p99 latency over 24 hours, sample data">
        <defs><linearGradient id="p95f" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity="0.2" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
        {[0, 50, 100, 150].map((t) => <g key={t}><line x1={0} x2={W - PR} y1={y(t)} y2={y(t)} stroke="var(--div)" /><text x={W - PR + 10} y={y(t) + 4} className="tnum fill-[var(--soft)] text-[11px]">{t}</text></g>)}
        <rect x={x(57)} width={x(70) - x(57)} y={PT} height={H - PT - PB} fill="var(--red)" fillOpacity="0.06" />
        <text x={x(57) + 6} y={PT + 12} className="fill-[var(--red)] text-[11px] font-[500]">sin1 · p95 elevated</text>
        <path d={`${line('p95')} L${x(series.length - 1)} ${y(0)} L0 ${y(0)} Z`} fill="url(#p95f)" />
        <path d={line('p99')} fill="none" stroke="var(--sub)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="2 3" />
        <path d={line('p50')} fill="none" stroke="var(--sub)" strokeOpacity="0.7" strokeWidth="1.25" />
        <path d={line('p95')} fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinejoin="round" />
        {deploys.map((dp) => (
          <g key={dp.id}><line x1={x(dp.i)} x2={x(dp.i)} y1={H - PB - 8} y2={H - PB} stroke={dp.bad ? 'var(--red)' : 'var(--sub)'} strokeWidth="1.5" /><circle cx={x(dp.i)} cy={H - PB - 10} r={2.5} fill={dp.bad ? 'var(--red)' : 'var(--sub)'} /></g>
        ))}
        {[0, 16, 32, 48, 64, 80].map((i) => <text key={i} x={x(i)} y={H - 6} textAnchor={i ? 'middle' : 'start'} className="tnum fill-[var(--soft)] text-[11px]">{timeLabel(i)}</text>)}
        {d && <g><line x1={x(h!)} x2={x(h!)} y1={PT} y2={H - PB} stroke="var(--ink)" strokeOpacity="0.2" /><circle cx={x(h!)} cy={y(d.p95)} r={4} fill="var(--accent)" stroke="var(--s1)" strokeWidth="2" /></g>}
      </svg>
      {d && (
        <div className="pointer-events-none absolute z-10 w-[168px] rounded-[10px] bg-[var(--s2)] p-2.5 shadow-[var(--pop)]" style={{ left: Math.min(x(h!) + 12, W - PR - 168), top: 8 }}>
          <div className="tnum mb-1.5 text-[11px] text-[var(--soft)]">Today {timeLabel(h!)}</div>
          {(['p99', 'p95', 'p50'] as const).map((k) => (
            <div key={k} className="flex items-center gap-2 text-[12px] leading-[18px]"><span className={`h-[2px] w-2.5 rounded-full ${k === 'p95' ? 'bg-[var(--accent)]' : 'bg-[var(--sub)]'}`} /><span className="flex-1 text-[var(--sub)]">{k}</span><span className="tnum font-[600]">{Math.round(d[k])} ms</span></div>
          ))}
        </div>
      )}
    </div>
  )
}
