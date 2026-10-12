// Cash position, next 30 days: the owned visual. A step line (balance changes once a day), the buffer as a dashed rule,
// the days under it filled red, pay runs and payroll as rings on the drops, and a crosshair that snaps to days.
// `moved` applies the suggested fix (Hartwell wire Oct 15 -> Oct 16) and the line morphs to the new forecast.
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BUFFER, forecast, short } from './data'
import { cx, Money } from './ui'

const ease = [0.215, 0.61, 0.355, 1] as const
const H = 232, PT = 16, PB = 30, PR = 52
const Y0 = 650000, Y1 = 1200000

export function series(moved: boolean) {
  if (!moved) return forecast
  let shift = 0
  return forecast.map((d) => {
    const delta = d.i === 3 ? 38500 : d.i === 4 ? -38500 : 0
    shift += delta
    return { ...d, balance: d.balance + shift, outflow: d.outflow - delta, run: d.i === 3 && d.run ? { ...d.run, amount: d.run.amount - 38500, bills: d.run.bills - 1 } : d.run, moved: d.i === 4 ? 38500 : undefined }
  })
}

export default function Chart({ moved }: { moved: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const [W, setW] = useState(720)
  const [hover, setHover] = useState<number | null>(null)
  useLayoutEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    if (box.current) ro.observe(box.current)
    return () => ro.disconnect()
  }, [])
  const data = useMemo(() => series(moved), [moved])
  const n = data.length - 1
  const x = (i: number) => (i / n) * (W - PR)
  const y = (v: number) => PT + (1 - (v - Y0) / (Y1 - Y0)) * (H - PT - PB)
  const step = data.map((d, i) => (i ? `H${x(i).toFixed(1)} V${y(d.balance).toFixed(1)}` : `M0 ${y(d.balance).toFixed(1)}`)).join(' ') + ` H${x(n).toFixed(1)}`
  const area = `${step} V${H - PB} H0 Z`
  const by = y(BUFFER)
  const under = data.filter((d) => d.balance < BUFFER)
  const ticks = [700000, 800000, 900000, 1000000, 1100000, 1200000]
  const hd = hover != null ? data[hover] : null
  const dip = data[3]

  return (
    <div ref={box} className="relative select-none" style={{ height: H }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); const i = Math.round(((e.clientX - r.left) / (W - PR)) * n); setHover(i >= 0 && i <= n ? i : null) }}
      onPointerLeave={() => setHover(null)}>
      <svg width={W} height={H} className="absolute inset-0 overflow-visible" role="img" aria-label="Projected operating balance for the next 30 days, sample data">
        <defs>
          <linearGradient id="cash-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity="0.16" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient>
          <pattern id="under" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="var(--red)" fillOpacity="0.08" /><line x1="0" y1="0" x2="0" y2="6" stroke="var(--red)" strokeOpacity="0.35" strokeWidth="1.5" /></pattern>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={0} x2={W - PR} y1={y(t)} y2={y(t)} stroke="var(--div)" />
            <text x={W - PR + 12} y={y(t) + 4} className="tnum fill-[var(--soft)] text-[12px]">{short(t)}</text>
          </g>
        ))}
        <motion.path d={area} initial={false} animate={{ d: area }} transition={{ duration: 0.6, ease }} fill="url(#cash-fill)" />
        <AnimatePresence>
          {under.map((d) => (
            <motion.rect key={`u${d.i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              x={x(d.i)} width={x(d.i + 1) - x(d.i)} y={by} height={y(d.balance) - by} fill="url(#under)" />
          ))}
        </AnimatePresence>
        <line x1={0} x2={W - PR} y1={by} y2={by} stroke="var(--red)" strokeOpacity="0.6" strokeDasharray="3 4" strokeWidth="1.25" />
        <motion.path d={step} initial={false} animate={{ d: step }} transition={{ duration: 0.6, ease }} fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinejoin="round" />
        {data.map((d) => (d.run || d.payroll) ? (
          <motion.circle key={`m${d.i}`} cy={y(d.balance)} initial={false} animate={{ cy: y(d.balance) }} transition={{ duration: 0.6, ease }} cx={x(d.i)} r={3.5}
            fill="var(--card)" stroke={d.payroll ? 'var(--violet)' : 'var(--accent)'} strokeWidth="1.75" />
        ) : null)}
        {data.filter((_, i) => i % 7 === 0).map((d) => (
          <text key={`x${d.i}`} x={x(d.i)} y={H - 8} textAnchor={d.i === 0 ? 'start' : 'middle'} className="fill-[var(--soft)] text-[12px]">{d.i === 0 ? 'Today' : d.label}</text>
        ))}
        {hd && (
          <g>
            <line x1={x(hd.i)} x2={x(hd.i)} y1={PT - 6} y2={H - PB} stroke="var(--ink)" strokeOpacity="0.18" />
            <circle cx={x(hd.i)} cy={y(hd.balance)} r={4} fill="var(--accent)" stroke="var(--card)" strokeWidth="2" />
          </g>
        )}
      </svg>

      {/* buffer label sits on the rule, left */}
      <span className="absolute flex h-5 -translate-y-1/2 items-center bg-[var(--card)] pl-2 text-[12px] font-[500] text-[var(--red)]" style={{ top: by, right: PR - 10 }}>
        Buffer
      </span>

      {/* the dip, called out where it happens */}
      <AnimatePresence>
        {!moved && hover == null && (
          <motion.div key="dip" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }} transition={{ duration: 0.25, ease }}
            className="absolute flex items-center gap-1.5 whitespace-nowrap rounded-[8px] bg-[var(--card)] px-2 py-1 text-[12px] font-[500] shadow-[var(--sh-pop)]"
            style={{ left: x(4) + 10, top: y(dip.balance) - 12 }}>
            <span className="size-1.5 rounded-full bg-[var(--red)]" />
            <span className="text-[var(--ink)]">Oct 15</span><span className="text-[var(--red)]">−<Money n={BUFFER - dip.balance} cents={false} className="[&>span]:text-current" /> under buffer</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* tooltip */}
      {hd && (
        <div className={cx('pointer-events-none absolute z-10 w-[220px] rounded-[12px] bg-[var(--card)] p-1 shadow-[var(--sh-pop)]')}
          style={{ left: Math.min(x(hd.i) + 12, W - PR - 220), top: 6 }}>
          <div className="flex items-center justify-between px-2 pb-1 pt-1.5 text-[12px]"><span className="font-[500] text-[var(--sub)]">{hd.i === 0 ? 'Today' : hd.label}</span>{hd.balance < BUFFER && <span className="font-[500] text-[var(--red)]">Under buffer</span>}</div>
          <div className="px-2 pb-2 text-[16px] font-[550] tracking-[-0.01em]"><Money n={hd.balance} /></div>
          <div className="flex flex-col gap-1 rounded-[8px] bg-[var(--sunk)] p-2 text-[12px] dark:bg-[rgba(255,255,255,0.03)]">
            <Line dot="var(--green)" label="Receipts" v={hd.inflow} sign="+" />
            {hd.run && <Line dot="var(--accent)" label={`Pay run · ${hd.run.bills} bills`} v={hd.run.amount} sign="−" />}
            {hd.payroll && <Line dot="var(--violet)" label="Payroll" v={hd.payroll} sign="−" />}
            {'moved' in hd && hd.moved ? <Line dot="var(--amber)" label="Hartwell wire (moved)" v={hd.moved as number} sign="−" /> : null}
          </div>
        </div>
      )}
    </div>
  )
}

function Line({ dot, label, v, sign }: { dot: string; label: string; v: number; sign: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-1.5 rounded-full" style={{ background: dot }} />
      <span className="flex-1 text-[var(--sub)]">{label}</span>
      <span className="tnum text-[var(--ink)]">{v ? sign : ''}<Money n={v} cents={false} /></span>
    </div>
  )
}
