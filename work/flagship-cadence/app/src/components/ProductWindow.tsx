import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, BarChart3, Briefcase, ChevronDown, Layers, LayoutGrid, MessageSquareText, Search, Users } from 'lucide-react'

// Sample quarter (fictional): cumulative bookings in $M, 13 weeks. Actuals through week 7, forecast after.
const ACTUAL = [0.28, 0.61, 0.97, 1.42, 1.9, 2.31, 2.84]
const FORECAST = [2.84, 3.21, 3.58, 3.93, 4.12, 4.47, 4.82]          // weeks 7..13 (dip at week 11: Northwind slipped)
const LOW = [2.84, 3.12, 3.41, 3.68, 3.86, 4.18, 4.5]
const HIGH = [2.84, 3.3, 3.76, 4.2, 4.46, 4.88, 5.31]
const TARGET = 5.0
const WEEKS = ['Oct 6', '', 'Oct 20', '', 'Nov 3', '', 'Nov 17', '', 'Dec 1', '', 'Dec 15', '', 'Dec 29']
const W = 620, H = 236, PADL = 44, PADR = 14, PADT = 14, PADB = 28, YMAX = 6
const x = (i: number) => PADL + (i / 12) * (W - PADL - PADR)
const y = (v: number) => PADT + (1 - v / YMAX) * (H - PADT - PADB)
const line = (vals: number[], start: number) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(start + i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
const band = `${line(HIGH, 6)} ${[...LOW].reverse().map((v, i) => `L${x(12 - i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')} Z`

const DEALS = [
  { co: 'Northwind Logistics', owner: 'MR', tone: 'bg-[#e8dff5] text-[#5b3d8a]', amt: '$180k', stage: 'Slipped to Q1', warn: true, p: 0 },
  { co: 'Kestrel Bank', owner: 'AO', tone: 'bg-[#dcefe6] text-[#1f6b4c]', amt: '$410k', stage: 'Commit', p: 90 },
  { co: 'Halden Health', owner: 'JS', tone: 'bg-[#f6e6d6] text-[#8a4d1c]', amt: '$240k', stage: 'Negotiation', p: 70 },
  { co: 'Orbital Freight', owner: 'MR', tone: 'bg-[#e8dff5] text-[#5b3d8a]', amt: '$95k', stage: 'Proposal', p: 45 },
  { co: 'Linea Software', owner: 'KT', tone: 'bg-[#dbe8f7] text-[#24548f]', amt: '$62k', stage: 'Closed won', p: 100 },
]

const NAV = [
  { icon: BarChart3, label: 'Forecast', active: true },
  { icon: Layers, label: 'Pipeline' },
  { icon: Briefcase, label: 'Deals' },
  { icon: Users, label: 'Team' },
  { icon: MessageSquareText, label: 'Explanations' },
]

export function ProductWindow() {
  const reduce = useReducedMotion()
  const draw = reduce ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white text-left shadow-[0_1px_2px_rgba(10,12,11,0.04),0_24px_60px_-20px_rgba(10,12,11,0.22)]" role="img"
      aria-label="Sample Cadence forecast for Q4 2026: committed 4.82 million dollars against a 5 million target; the drop is explained by the Northwind Logistics renewal slipping to January.">
      <div className="grid lg:grid-cols-[200px_minmax(0,1fr)_292px]">
        {/* sidebar */}
        <aside className="hidden border-r border-line bg-[#fbfbfa] px-3 py-4 lg:block">
          <div className="flex items-center gap-2 px-2 pb-4 text-[13px] font-semibold tracking-[-0.02em] text-ink">
            <span className="flex size-5 items-center justify-center rounded-[6px] bg-ink"><span className="size-1.5 rounded-full bg-[#3ad18b]" /></span>
            Northwind Sales <ChevronDown className="ml-auto size-3.5 text-muted" />
          </div>
          <div className="mb-3 flex h-8 items-center gap-2 rounded-[9px] border border-line bg-white px-2.5 text-[12.5px] text-muted"><Search className="size-3.5" />Search deals<span className="ml-auto font-mono text-[11px]">⌘K</span></div>
          {NAV.map(({ icon: I, label, active }) => (
            <div key={label} className={`flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-[13px] font-medium tracking-[-0.01em] ${active ? 'bg-white text-ink shadow-[0_0_0_1px_var(--color-line)]' : 'text-[#555]'}`}><I className="size-[15px]" strokeWidth={1.8} />{label}</div>
          ))}
          <div className="mt-6 rounded-[10px] border border-line bg-white p-3">
            <div className="text-[11.5px] font-medium text-muted">Q4 2026</div>
            <div className="mt-1 flex items-baseline justify-between"><span className="text-[13px] font-semibold text-ink">Week 7 of 13</span><span className="font-mono text-[11px] text-muted">54%</span></div>
            <div className="mt-2 h-1.5 rounded-full bg-[#ececea]"><div className="h-full w-[54%] rounded-full bg-ink" /></div>
          </div>
        </aside>

        {/* forecast */}
        <div className="min-w-0 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[15px] font-semibold tracking-[-0.02em] text-ink">Q4 2026 forecast</div>
              <div className="mt-0.5 text-[12px] text-muted">Updated 8 min ago from Salesforce · sample data</div>
            </div>
            <div className="flex rounded-[9px] border border-line p-0.5 text-[12px] font-medium">
              <span className="rounded-[7px] px-2.5 py-1 text-muted">Week</span><span className="rounded-[7px] bg-[#f1f1ef] px-2.5 py-1 text-ink">Quarter</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-[12px] border border-line sm:grid-cols-4">
            {[
              { k: 'Committed', v: '$4.82M', d: '−$180k vs target', warn: true },
              { k: 'Best case', v: '$5.31M', d: '+$310k upside' },
              { k: 'Target', v: '$5.00M', d: 'Set Oct 1' },
              { k: 'Win rate', v: '31%', d: '+2 pts QoQ' },
            ].map((m, i) => (
              <div key={m.k} className={`px-3.5 py-2.5 ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line sm:border-t-0' : ''} ${i === 2 ? 'sm:border-l' : ''}`}>
                <div className="text-[11.5px] font-medium text-muted">{m.k}</div>
                <div className="mt-1 text-[21px] font-semibold tracking-[-0.04em] text-ink tabular-nums">{m.v}</div>
                <div className={`mt-0.5 text-[11.5px] font-medium ${m.warn ? 'text-[#a3580d]' : 'text-muted'}`}>{m.d}</div>
              </div>
            ))}
          </div>

          <div className="relative mt-4">
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6].map((v) => (
                <g key={v}>
                  <line x1={PADL} x2={W - PADR} y1={y(v)} y2={y(v)} stroke="#eeeeec" />
                  <text x={PADL - 10} y={y(v) + 4} textAnchor="end" fontSize="10.5" fill="#8a8a87" fontFamily="Geist Mono Variable">${v}M</text>
                </g>
              ))}
              {WEEKS.map((w, i) => w && <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10.5" fill="#8a8a87" fontFamily="Geist Mono Variable">{w}</text>)}
              <line x1={PADL} x2={W - PADR} y1={y(TARGET)} y2={y(TARGET)} stroke="#0b0d0c" strokeDasharray="3 4" strokeWidth={1} />
              <text x={W - PADR} y={y(TARGET) - 7} textAnchor="end" fontSize="11" fontWeight={600} fill="#0b0d0c" fontFamily="Geist Variable">Target $5.0M</text>
              <motion.path d={band} fill="#3ad18b" fillOpacity={0.14} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} />
              <path d={line(ACTUAL, 0)} fill="none" stroke="#0b0d0c" strokeWidth={2.2} strokeLinejoin="round" />
              <motion.path d={line(FORECAST, 6)} fill="none" stroke="#14915a" strokeWidth={2.2} strokeDasharray="5 4" strokeLinejoin="round" {...draw} />
              <line x1={x(6)} x2={x(6)} y1={PADT} y2={H - PADB} stroke="#c9c9c6" />
              <rect x={x(6) - 20} y={PADT - 2} width={40} height={17} rx={5} fill="#0b0d0c" />
              <text x={x(6)} y={PADT + 10} textAnchor="middle" fontSize="10.5" fontWeight={600} fill="#fff" fontFamily="Geist Variable">Today</text>
              <circle cx={x(6)} cy={y(2.84)} r={4} fill="#0b0d0c" stroke="#fff" strokeWidth={2} />
              <motion.path d={`M${x(4.6)} ${y(4.75)} C ${x(7.2)} ${y(4.62)}, ${x(9)} ${y(4.4)}, ${x(10) - 6} ${y(4.12)}`} fill="none" stroke="#c46a12" strokeWidth={1.2} strokeDasharray="2 3" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.4 }} />
              <circle cx={x(10)} cy={y(4.12)} r={4.5} fill="#fff" stroke="#c46a12" strokeWidth={2.2} />
            </svg>
            <motion.div initial={reduce ? false : { opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-3 w-full lg:absolute lg:left-[7%] lg:top-[1%] lg:mt-0 lg:w-[252px] rounded-[12px] border border-line bg-white p-3 shadow-[0_12px_32px_-12px_rgba(10,12,11,0.28)]">
              <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#a3580d]"><span className="size-1.5 rounded-full bg-[#c46a12]" />Forecast moved −$180k today</div>
              <p className="mt-1.5 text-[12.5px] leading-[1.45] tracking-[-0.01em] text-[#333]">Northwind Logistics pushed its Dec 15 renewal to Jan 12. Without it the quarter lands at <b className="font-semibold text-ink">$4.82M</b>, $180k under target.</p>
              <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-ink">Open deal <ArrowUpRight className="size-3.5" /></div>
            </motion.div>
          </div>
        </div>

        {/* deals */}
        <section className="hidden border-l border-line px-4 py-5 lg:block">
          <div className="flex items-center justify-between"><span className="text-[13px] font-semibold tracking-[-0.02em] text-ink">Deals moving this week</span><LayoutGrid className="size-3.5 text-muted" /></div>
          <ul className="mt-3 divide-y divide-line">
            {DEALS.map((d) => (
              <li key={d.co} className="flex items-center gap-2.5 py-2.5">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10.5px] font-semibold ${d.tone}`}>{d.owner}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2"><span className="truncate text-[12.5px] font-semibold tracking-[-0.01em] text-ink">{d.co}</span><span className="font-mono text-[11.5px] text-ink tabular-nums">{d.amt}</span></div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded-[5px] px-1.5 py-px text-[10.5px] font-medium ${d.warn ? 'bg-[#fbeedd] text-[#8f4a0c]' : 'bg-[#f1f1ef] text-[#555]'}`}>{d.stage}</span>
                    {!d.warn && <span className="h-1 flex-1 rounded-full bg-[#ececea]"><span className="block h-full rounded-full bg-[#14915a]" style={{ width: `${d.p}%` }} /></span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
