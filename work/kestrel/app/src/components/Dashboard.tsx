import { motion } from 'motion/react'
import {
  RiArrowDownLine, RiArrowUpLine, RiCornerDownLeftLine, RiDashboardLine, RiExpandUpDownLine, RiFilter3Line,
  RiFlaskLine, RiLightbulbFlashLine, RiLoopLeftLine, RiMore2Line, RiSearchLine, RiShareLine, RiSparkling2Fill,
  RiUser3Line, RiUserAddLine, RiBookmarkLine, RiPulseLine,
} from '@remixicon/react'

// Sample data only: 30 days of activation rate, with the dip the AI panel explains.
const CUR = [44.1, 44.6, 44.0, 44.9, 45.3, 44.8, 45.6, 45.1, 45.9, 46.2, 45.7, 46.4, 45.8, 46.6, 46.1, 46.9, 46.3, 45.8, 46.5, 45.9, 44.2, 41.6, 39.4, 38.7, 39.2, 40.1, 40.8, 41.2, 41.5, 41.8]
const PREV = [42.8, 43.1, 42.6, 43.4, 43.0, 43.8, 43.3, 43.9, 43.5, 44.2, 43.8, 44.4, 44.0, 44.7, 44.3, 44.9, 44.5, 45.1, 44.6, 45.2, 44.8, 45.3, 44.9, 45.4, 45.0, 45.6, 45.2, 45.7, 45.3, 45.8]
const W = 506, H = 132, MIN = 32, MAX = 50
const x = (i: number) => (i / (CUR.length - 1)) * W
const y = (v: number) => H - ((v - MIN) / (MAX - MIN)) * H

// Catmull-Rom to cubic Bezier: a smooth line through every point
function smooth(vals: number[]) {
  const p = vals.map((v, i) => [x(i), y(v)])
  let d = `M${p[0][0]},${p[0][1]}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}
const curLine = smooth(CUR)
const prevLine = smooth(PREV)
const DIP = 23

const ease = [0.16, 1, 0.3, 1] as const

function NavItem({ icon: Icon, label, active, badge }: { icon: typeof RiDashboardLine; label: string; active?: boolean; badge?: string }) {
  return (
    <div className={`flex h-8 items-center gap-2 rounded-lg px-2 text-[13px] font-[500] tracking-[-0.006em] ${active ? 'bg-white text-ink shadow-[var(--shadow-ring)]' : 'text-sub'}`}>
      <Icon size={16} className={active ? 'text-blue' : 'text-soft'} />
      {label}
      {badge && <span className="ml-auto rounded-full bg-blue-tint px-1.5 py-px text-[11px] font-[550] text-blue">{badge}</span>}
    </div>
  )
}

function Kpi({ label, value, delta, up, good, selected }: { label: string; value: string; delta: string; up: boolean; good: boolean; selected?: boolean }) {
  return (
    <div className={`relative rounded-xl bg-white p-3.5 ${selected ? 'shadow-[0_0_0_1px_#335cff,0_0_0_4px_rgba(51,92,255,0.12)]' : 'shadow-[var(--shadow-ring)]'}`}>
      <div className="text-[12px] font-[500] text-sub">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="tnum text-[22px] font-[550] leading-7 tracking-[-0.02em] text-ink">{value}</span>
        <span className={`tnum inline-flex items-center gap-0.5 rounded-md px-1.5 py-px text-[11px] font-[550] ${good ? 'bg-green-tint text-green-text' : 'bg-red-tint text-red-text'}`}>
          {up ? <RiArrowUpLine size={11} /> : <RiArrowDownLine size={11} />}{delta}
        </span>
      </div>
    </div>
  )
}

const ANSWER = ['Activation', 'fell', '3.1 pts', 'since', 'Sep 29.', 'Almost', 'all', 'of', 'it', 'comes', 'from', 'mobile', 'trials', 'that', 'skipped', 'Connect data.']
const BOLD = new Set(['3.1 pts', 'Connect data.'])

export default function Dashboard() {
  return (
    <div className="rounded-[22px] bg-white/55 p-1.5 shadow-[var(--shadow-frame)] backdrop-blur-sm">
      <div className="grid h-[600px] grid-cols-[208px_1fr_300px] overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(23,23,23,0.06)]">
        {/* sidebar */}
        <aside className="border-r border-line bg-[#fbfbfb] p-3" aria-label="Sample app navigation">
          <div className="flex items-center gap-2.5 rounded-lg p-1.5">
            <span className="grid size-7 place-items-center rounded-lg bg-[linear-gradient(180deg,#5a7bff,#2a4ef0)] text-[13px] font-[600] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">N</span>
            <div className="leading-4">
              <div className="text-[13px] font-[550] text-ink">Northwind</div>
              <div className="text-[11px] text-soft">Sample workspace</div>
            </div>
            <RiExpandUpDownLine size={14} className="ml-auto text-soft" />
          </div>
          <div className="mt-2.5 flex h-8 items-center gap-2 rounded-lg bg-white px-2 text-[13px] text-soft shadow-[var(--shadow-ring)]">
            <RiSearchLine size={15} /> Search
            <kbd className="ml-auto rounded border border-line px-1 font-sans text-[10px] text-soft">⌘K</kbd>
          </div>
          <div className="mt-4 px-2 text-[11px] font-[500] text-soft">Analytics</div>
          <nav className="mt-1.5 space-y-0.5">
            <NavItem icon={RiDashboardLine} label="Overview" active />
            <NavItem icon={RiSparkling2Fill} label="Ask Kestrel" badge="AI" />
            <NavItem icon={RiLightbulbFlashLine} label="Insights" />
            <NavItem icon={RiFilter3Line} label="Funnels" />
            <NavItem icon={RiLoopLeftLine} label="Retention" />
            <NavItem icon={RiUser3Line} label="Users" />
            <NavItem icon={RiFlaskLine} label="Experiments" />
          </nav>
          <div className="mt-4 px-2 text-[11px] font-[500] text-soft">Saved</div>
          <div className="mt-1.5 space-y-0.5">
            <NavItem icon={RiBookmarkLine} label="Weekly activation" />
            <NavItem icon={RiBookmarkLine} label="Pricing drop-off" />
          </div>
        </aside>

        {/* main */}
        <section className="min-w-0 p-5" aria-label="Sample overview">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[17px] font-[550] tracking-[-0.015em] text-ink">Overview</div>
              <div className="text-[12px] text-soft">All trials · last 30 days</div>
            </div>
            <div className="ml-auto flex items-center rounded-lg bg-weak p-0.5 text-[12px] font-[500] text-sub">
              {['7d', '30d', '90d'].map((d) => (
                <span key={d} className={`rounded-md px-2.5 py-1 ${d === '30d' ? 'bg-white text-ink shadow-[var(--shadow-ring)]' : ''}`}>{d}</span>
              ))}
            </div>
            <span className="btn-white grid size-8 place-items-center rounded-lg text-sub"><RiShareLine size={15} /></span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <Kpi label="Weekly active users" value="18,420" delta="6.2%" up good />
            <Kpi label="Activation rate" value="41.8%" delta="3.1 pts" up={false} good={false} selected />
            <Kpi label="Trial to paid" value="9.6%" delta="0.8 pts" up good />
          </div>

          <div className="mt-2.5 rounded-xl bg-white p-4 shadow-[var(--shadow-ring)]">
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-[550] text-ink">Activation rate</span>
              <span className="ml-auto flex items-center gap-1.5 text-[11px] text-sub"><i className="h-0.5 w-3 rounded-full bg-blue" /> This period</span>
              <span className="flex items-center gap-1.5 text-[11px] text-sub"><i className="h-0 w-3 border-t border-dashed border-[#b5b5b5]" /> Previous</span>
            </div>
            <div className="relative mt-3 pl-8">
              <svg width={W} height={H + 20} viewBox={`0 0 ${W} ${H + 20}`} className="overflow-visible" aria-hidden>
                <defs>
                  <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#335cff" stopOpacity="0.16" />
                    <stop offset="1" stopColor="#335cff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[35, 40, 45, 50].map((v) => (
                  <g key={v}>
                    <line x1={0} x2={W} y1={y(v)} y2={y(v)} stroke="#f0f0f0" />
                    <text x={-10} y={y(v) + 3.5} textAnchor="end" className="fill-soft text-[10px]">{v}%</text>
                  </g>
                ))}
                <line x1={x(DIP)} x2={x(DIP)} y1={24} y2={y(CUR[DIP]) - 6} stroke="#e5484d" strokeOpacity={0.45} strokeDasharray="2 3" />
                <rect x={x(20)} y={0} width={x(27) - x(20)} height={H} rx={6} fill="#e5484d" opacity={0.06} />
                <path d={prevLine} fill="none" stroke="#bdbdbd" strokeWidth={1.25} strokeDasharray="3 4" />
                <motion.path d={`${curLine} L${W},${H} L0,${H} Z`} fill="url(#fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }} />
                <motion.path d={curLine} fill="none" stroke="#335cff" strokeWidth={2} strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 1.3, ease }} />
                <g transform={`translate(${x(DIP)},${y(CUR[DIP])})`}>
                  <circle r={9} fill="#e5484d" className="ping" opacity={0.3} />
                  <circle r={4.5} fill="#fff" stroke="#e5484d" strokeWidth={2} />
                </g>
                {['Sep 8', 'Sep 15', 'Sep 22', 'Sep 29', 'Oct 7'].map((l, i) => (
                  <text key={l} x={[0, 7, 14, 21, 29].map(x)[i]} y={H + 16} textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'} className="fill-soft text-[10px]">{l}</text>
                ))}
              </svg>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0, duration: 0.5, ease }}
                className="tnum absolute flex items-baseline gap-1.5 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[11px] shadow-[var(--shadow-tile)]" style={{ left: 32 + x(DIP), top: -2, transform: 'translateX(-50%)' }}>
                <span className="text-soft">Oct 1</span><span className="text-[12px] font-[550] text-ink">38.7%</span><span className="text-soft">vs 45.4%</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI panel */}
        <section className="flex flex-col border-l border-line p-4" aria-label="Sample AI answer">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-blue text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"><RiSparkling2Fill size={13} /></span>
            <span className="text-[13px] font-[550] text-ink">Ask Kestrel</span>
            <RiMore2Line size={16} className="ml-auto text-soft" />
          </div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5, ease }}
            className="mt-4 self-end rounded-xl rounded-br-sm bg-weak px-3 py-2 text-[13px] text-ink">
            Why did activation drop last week?
          </motion.div>
          <div className="mt-3 text-[13px] leading-5 text-sub">
            {ANSWER.map((w, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 + i * 0.045, duration: 0.25 }}
                className={BOLD.has(w) ? 'font-[550] text-ink' : ''}>{w} </motion.span>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 0.5, ease }}
            className="mt-3 rounded-xl bg-white p-3 shadow-[var(--shadow-ring)]">
            <div className="flex items-center gap-1.5 text-[11px] font-[500] text-soft"><RiPulseLine size={13} /> Change by segment</div>
            {[
              { l: 'Mobile, skipped step 2', v: '−7.4', w: 92, c: '#e5484d' },
              { l: 'Mobile, completed', v: '−0.6', w: 14, c: '#f2a3a5' },
              { l: 'Desktop', v: '+0.2', w: 6, c: '#c9c9c9' },
            ].map((r) => (
              <div key={r.l} className="mt-2.5">
                <div className="flex text-[12px]"><span className="text-sub">{r.l}</span><span className="tnum ml-auto font-[550] text-ink">{r.v}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-weak"><motion.div className="h-full rounded-full" style={{ background: r.c }} initial={{ width: 0 }} animate={{ width: `${r.w}%` }} transition={{ delay: 2.5, duration: 0.8, ease }} /></div>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.7, duration: 0.4 }} className="mt-3 flex gap-2">
            <span className="btn-blue inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-[550]"><RiUserAddLine size={14} /> Create cohort · 412</span>
            <span className="btn-white inline-flex h-8 items-center rounded-lg px-3 text-[12px] font-[550]">Open funnel</span>
          </motion.div>
          <div className="mt-auto flex h-9 items-center gap-2 rounded-lg bg-white px-3 text-[12px] text-soft shadow-[var(--shadow-ring)]">
            Ask a follow-up <RiCornerDownLeftLine size={14} className="ml-auto" />
          </div>
        </section>
      </div>
    </div>
  )
}
