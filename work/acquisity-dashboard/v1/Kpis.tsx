import { RiChat1Line, RiCalendarCheckLine, RiMoneyDollarCircleLine, RiPercentLine } from '@remixicon/react'
import { KPIS } from '../data'
import { Delta } from '../ui'

const ICONS = [RiChat1Line, RiCalendarCheckLine, RiMoneyDollarCircleLine, RiPercentLine]

function Spark({ v, up }: { v: readonly number[]; up: boolean }) {
  const min = Math.min(...v), max = Math.max(...v), W = 64, H = 24
  const pts = v.map((n, i) => [(i / (v.length - 1)) * W, H - 3 - ((n - min) / (max - min || 1)) * (H - 6)])
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const c = up ? '#1fc16b' : '#fb3748'
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden className="overflow-visible">
      <path d={`${d} L${W} ${H} L0 ${H} Z`} fill={c} opacity={0.08} />
      <path d={d} fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.at(-1)![0]} cy={pts.at(-1)![1]} r={2.5} fill="#fff" stroke={c} strokeWidth={1.5} />
    </svg>
  )
}

/** One card, four cells divided by hairlines: reads as one instrument, not four boxes. */
export default function Kpis() {
  return (
    <section aria-label="Key numbers (sample)" className="grid grid-cols-4 rounded-[16px] bg-white shadow-[var(--ring),var(--shadow-xs)]">
      {KPIS.map((k, i) => {
        const Icon = ICONS[i]
        return (
          <div key={k.label} className={`p-5 ${i ? 'border-l border-stroke-soft' : ''}`}>
            <div className="flex items-center gap-2 leading-none">
              <Icon size={16} className="shrink-0 text-text-soft" />
              <span className="label-sm text-text-sub">{k.label}</span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="flex items-center gap-2"><span className="tnum title-h5 text-text-strong">{k.value}</span><Delta up={k.up}>{k.delta}</Delta></div>
              <Spark v={k.spark} up={k.up} />
            </div>
            <div className="mt-1.5 whitespace-nowrap para-xs text-text-sub">{k.note}</div>
          </div>
        )
      })}
    </section>
  )
}
