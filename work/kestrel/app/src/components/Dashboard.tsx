import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { MARK } from './mark'
import { dur, ease, spring } from '../motion'
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

// Dense UI reveal: shorter travel than the hero, same Kaching curves.
const rise = (delay: number, y = 12) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { y: { delay, duration: 1, ease: ease.reveal }, opacity: { delay, duration: 0.7, ease: ease.outQuint } },
})

const NAV = [
  { icon: RiDashboardLine, label: 'Overview' },
  { icon: RiSparkling2Fill, label: 'Ask Kestrel', badge: 'AI' },
  { icon: RiLightbulbFlashLine, label: 'Insights' },
  { icon: RiFilter3Line, label: 'Funnels' },
  { icon: RiLoopLeftLine, label: 'Retention' },
  { icon: RiUser3Line, label: 'Users' },
  { icon: RiFlaskLine, label: 'Experiments' },
]
const SAVED = ['Weekly activation', 'Pricing drop-off']

function SideItem({ icon: Icon, label, badge, active, hovered, onHover, delay }: {
  icon: typeof RiDashboardLine; label: string; badge?: string; active?: boolean; hovered: boolean; onHover: () => void; delay: number
}) {
  return (
    <motion.div {...rise(delay, 8)} onMouseEnter={onHover} className="relative">
      {active && <span className="absolute inset-0 rounded-[8px] bg-white shadow-[var(--shadow-ring)]" />}
      {hovered && !active && <motion.span layoutId="side-hover" transition={spring} className="absolute inset-0 rounded-[8px] bg-[#f0f0f0]" />}
      <div className={`relative flex h-8 items-center gap-2 rounded-[8px] px-2 text-[13px] font-[500] leading-none tracking-[-0.006em] transition-colors duration-[220ms] ${active || hovered ? 'text-ink' : 'text-sub'}`}>
        <Icon size={16} className={active ? 'text-blue' : 'text-soft'} />
        {label}
        {badge && <span className="ml-auto flex h-[18px] items-center rounded-full bg-blue-tint px-1.5 text-[11px] font-[550] leading-none text-blue">{badge}</span>}
      </div>
    </motion.div>
  )
}

// Kaching count-up: ease.link, ~0.9s first roll.
function CountUp({ to, decimals = 0, suffix = '', delay }: { to: number; decimals?: number; suffix?: string; delay: number }) {
  const still = useReducedMotion()
  const v = useMotionValue(still ? to : to * 0.6)
  const text = useTransform(v, (n) => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix)
  useEffect(() => {
    if (still) return
    const c = animate(v, to, { delay, duration: 1.3, ease: ease.link })
    return () => c.stop()
  }, [v, to, delay, still])
  return <motion.span>{text}</motion.span>
}

function Kpi({ label, to, decimals, suffix, delta, up, good, delay }: { label: string; to: number; decimals?: number; suffix?: string; delta: string; up: boolean; good: boolean; delay: number }) {
  return (
    <motion.div {...rise(delay, 16)} className="relative rounded-[16px] bg-white p-3.5 shadow-[var(--shadow-ring)] transition-shadow duration-300 hover:shadow-[var(--shadow-tile)]">
      <div className="text-[12px] font-[500] text-sub">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="tnum text-[22px] font-[550] leading-7 tracking-[-0.02em] text-ink"><CountUp to={to} decimals={decimals} suffix={suffix} delay={delay + 0.15} /></span>
        <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: delay + 0.9, duration: 0.6, ease: ease.outQuint }}
          className={`tnum inline-flex h-[18px] items-center gap-0.5 rounded-[8px] px-1.5 text-[11px] font-[550] leading-none ${good ? 'bg-green-tint text-green-text' : 'bg-red-tint text-red-text'}`}>
          {up ? <RiArrowUpLine size={11} /> : <RiArrowDownLine size={11} />}{delta}
        </motion.span>
      </div>
    </motion.div>
  )
}

const ANSWER = ['Activation', 'fell', '3.1 pts', 'since', 'Sep 29.', 'Almost', 'all', 'of', 'it', 'comes', 'from', 'mobile', 'trials', 'that', 'skipped', 'Connect data.']
const BOLD = new Set(['3.1 pts', 'Connect data.'])
const RANGES = ['7d', '30d', '90d']
const micro = { duration: dur.micro, ease: ease.outQuint }

export default function Dashboard({ start = 0.75 }: { start?: number }) {
  const still = !!useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)
  const [range, setRange] = useState('30d')
  const t = (s: number) => start + s // offsets from the moment the stage starts rising
  const LINE = { delay: t(1.05), duration: 1.6 }
  const dipAt = LINE.delay + LINE.duration * (DIP / (CUR.length - 1))

  return (
    <div className="rounded-[22px] bg-white/55 p-1.5 shadow-[var(--shadow-frame)] backdrop-blur-sm">
      <div className="grid h-[600px] grid-cols-[208px_1fr_300px] overflow-hidden rounded-[16px] bg-white shadow-[0_0_0_1px_rgba(23,23,23,0.06)]">
        {/* sidebar */}
        <aside className="border-r border-line bg-[#fbfbfb] p-3" aria-label="Sample app navigation" onMouseLeave={() => setHover(null)}>
          <motion.div {...rise(t(0.3), 8)} className="flex items-center gap-2.5 rounded-[8px] p-1.5">
            <span className="grid size-7 place-items-center rounded-[8px] bg-[linear-gradient(180deg,#5a7bff,#2a4ef0)] text-[13px] font-[600] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">N</span>
            <div className="leading-4">
              <div className="text-[13px] font-[550] text-ink">Northwind</div>
              <div className="text-[11px] text-soft">Sample workspace</div>
            </div>
            <RiExpandUpDownLine size={14} className="ml-auto text-soft" />
          </motion.div>
          <motion.div {...rise(t(0.36), 8)} className="mt-2.5 flex h-8 items-center gap-2 rounded-[8px] bg-white px-2 text-[13px] leading-none text-soft shadow-[var(--shadow-ring)]">
            <RiSearchLine size={15} /> Search
            <kbd className="ml-auto flex h-[18px] items-center rounded-[4px] border border-line px-1 font-sans text-[10px] leading-none text-soft">⌘K</kbd>
          </motion.div>
          <motion.div {...rise(t(0.42), 6)} className="mt-4 px-2 text-[11px] font-[500] text-soft">Analytics</motion.div>
          <nav className="mt-1.5 space-y-0.5">
            {NAV.map((n, i) => (
              <SideItem key={n.label} {...n} active={i === 0} hovered={hover === n.label} onHover={() => setHover(n.label)} delay={t(0.46 + i * 0.04)} />
            ))}
          </nav>
          <motion.div {...rise(t(0.76), 6)} className="mt-4 px-2 text-[11px] font-[500] text-soft">Saved</motion.div>
          <div className="mt-1.5 space-y-0.5">
            {SAVED.map((l, i) => (
              <SideItem key={l} icon={RiBookmarkLine} label={l} hovered={hover === l} onHover={() => setHover(l)} delay={t(0.8 + i * 0.04)} />
            ))}
          </div>
        </aside>

        {/* main */}
        <section className="min-w-0 p-5" aria-label="Sample overview">
          <motion.div {...rise(t(0.4))} className="flex items-center gap-3">
            <div>
              <div className="text-[17px] font-[550] tracking-[-0.015em] text-ink">Overview</div>
              <div className="text-[12px] text-soft">All trials · last 30 days</div>
            </div>
            <div role="group" aria-label="Date range" className="ml-auto flex h-8 items-center gap-0.5 rounded-[12px] bg-weak p-0.5 text-[12px] font-[500] leading-none text-sub">
              {RANGES.map((d) => (
                <button key={d} type="button" onClick={() => setRange(d)} aria-pressed={range === d}
                  className={`relative flex h-7 w-10 items-center justify-center rounded-[8px] transition-colors duration-[220ms] ${range === d ? 'text-ink' : 'hover:text-ink'}`}>
                  {range === d && <motion.span layoutId="range-pill" transition={spring} className="absolute inset-0 rounded-[8px] bg-white shadow-[var(--shadow-ring)]" />}
                  <span className="relative">{d}</span>
                </button>
              ))}
            </div>
            <motion.button type="button" aria-label="Share" whileTap={{ scale: 0.95 }} transition={micro} className="btn-white grid size-8 place-items-center rounded-[12px] text-sub">
              <RiShareLine size={15} />
            </motion.button>
          </motion.div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <Kpi label="Weekly active users" to={18420} delta="6.2%" up good delay={t(0.5)} />
            <Kpi label="Activation rate" to={41.8} decimals={1} suffix="%" delta="3.1 pts" up={false} good={false} delay={t(0.57)} />
            <Kpi label="Trial to paid" to={9.6} decimals={1} suffix="%" delta="0.8 pts" up good delay={t(0.64)} />
          </div>

          <motion.div {...rise(t(0.71), 20)} className="mt-2.5 rounded-[16px] bg-white p-4 shadow-[var(--shadow-ring)]">
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
                  <clipPath id="reveal">
                    <motion.rect x={-4} y={-10} height={H + 20} initial={{ width: 0 }} animate={{ width: W + 8 }} transition={{ ...LINE, ease: ease.inOut }} />
                  </clipPath>
                </defs>
                {[35, 40, 45, 50].map((v) => (
                  <g key={v}>
                    <line x1={0} x2={W} y1={y(v)} y2={y(v)} stroke="#f0f0f0" />
                    <text x={-10} y={y(v) + 3.5} textAnchor="end" className="fill-soft text-[10px]">{v}%</text>
                  </g>
                ))}
                <motion.rect x={x(20)} y={0} width={x(27) - x(20)} height={H} rx={6} fill="#e5484d"
                  initial={{ opacity: 0 }} animate={{ opacity: 0.06 }} transition={{ delay: dipAt, duration: 0.8, ease: ease.outQuint }} />
                <motion.path d={prevLine} fill="none" stroke="#bdbdbd" strokeWidth={1.25} strokeDasharray="3 4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: t(0.9), duration: 0.8 }} />
                {/* the fill and the line are revealed by one sweeping clip, so they stay in step */}
                <g clipPath="url(#reveal)">
                  <path d={`${curLine} L${W},${H} L0,${H} Z`} fill="url(#fill)" />
                  <path d={curLine} fill="none" stroke="#335cff" strokeWidth={2} strokeLinecap="round" />
                </g>
                <motion.line x1={x(DIP)} x2={x(DIP)} y1={24} y2={y(CUR[DIP]) - 6} stroke="#e5484d" strokeOpacity={0.45} strokeDasharray="2 3"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: dipAt + 0.2, duration: 0.5 }} />
                <g transform={`translate(${x(DIP)},${y(CUR[DIP])})`}>
                  {!still && (
                    <motion.circle r={9} fill="#e5484d" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 0.6, 2], opacity: [0, 0.35, 0] }}
                      transition={{ delay: dipAt + 0.5, duration: 2.3, times: [0, 0.05, 1], repeat: Infinity, repeatDelay: 0.6, ease: ease.outQuint }} />
                  )}
                  <motion.circle r={4.5} fill="#fff" stroke="#e5484d" strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: dipAt, duration: 0.6, ease: ease.outExpo }} />
                </g>
                {['Sep 8', 'Sep 15', 'Sep 22', 'Sep 29', 'Oct 7'].map((l, i) => (
                  <text key={l} x={[0, 7, 14, 21, 29].map(x)[i]} y={H + 16} textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'} className="fill-soft text-[10px]">{l}</text>
                ))}
              </svg>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: dipAt + 0.35, duration: 0.8, ease: ease.outExpo }}
                className="tnum absolute flex items-baseline gap-1.5 whitespace-nowrap rounded-[8px] bg-white px-2 py-1 text-[11px] shadow-[var(--shadow-tile)]" style={{ left: 32 + x(DIP), top: -2, translateX: '-50%' }}>
                <span className="text-soft">Oct 1</span><span className="text-[12px] font-[550] text-ink">38.7%</span><span className="text-soft">vs 45.4%</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* AI panel */}
        <section className="flex flex-col border-l border-line p-4" aria-label="Sample AI answer">
          <motion.div {...rise(t(0.4))} className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-[8px] bg-ink text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"><svg viewBox={MARK.viewBox} className="size-3.5" aria-hidden><path fill="currentColor" fillRule="evenodd" d={MARK.d} /></svg></span>
            <span className="text-[13px] font-[550] text-ink">Ask Kestrel</span>
            <RiMore2Line size={16} className="ml-auto text-soft" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: t(0.9), duration: 0.9, ease: ease.outExpo }}
            style={{ transformOrigin: '100% 100%' }} className="mt-4 self-end rounded-[16px] rounded-br-[6px] bg-weak px-3 py-2 text-[13px] text-ink">
            Why did activation drop last week?
          </motion.div>
          <div className="mt-3 text-[13px] leading-5 text-sub">
            {ANSWER.map((w, i) => (
              <motion.span key={i} initial={{ opacity: 0, filter: 'blur(4px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: t(1.35) + i * 0.045, duration: 0.5, ease: ease.outQuint }}
                className={BOLD.has(w) ? 'font-[550] text-ink' : ''}>{w} </motion.span>
            ))}
          </div>
          <motion.div {...rise(t(2.05), 16)} className="mt-3 rounded-[16px] bg-white p-3 shadow-[var(--shadow-ring)]">
            <div className="flex items-center gap-1.5 text-[11px] font-[500] text-soft"><RiPulseLine size={13} /> Change by segment</div>
            {[
              { l: 'Mobile, skipped step 2', v: '−7.4', w: 92, c: '#e5484d' },
              { l: 'Mobile, completed', v: '−0.6', w: 14, c: '#f2a3a5' },
              { l: 'Desktop', v: '+0.2', w: 6, c: '#c9c9c9' },
            ].map((r, i) => (
              <div key={r.l} className="mt-2.5">
                <div className="flex text-[12px]"><span className="text-sub">{r.l}</span><span className="tnum ml-auto font-[550] text-ink">{r.v}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-weak">
                  <motion.div className="h-full rounded-full" style={{ background: r.c }} initial={{ width: 0 }} animate={{ width: `${r.w}%` }}
                    transition={{ delay: t(2.3) + i * 0.07, duration: 1.2, ease: ease.outExpo }} />
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div {...rise(t(2.55), 10)} className="mt-3 flex gap-2">
            <motion.span whileTap={{ scale: 0.98 }} transition={micro} className="btn-blue inline-flex h-8 items-center gap-1.5 rounded-[12px] px-3 text-[12px] font-[550] leading-none"><RiUserAddLine size={14} /> Create cohort · 412</motion.span>
            <motion.span whileTap={{ scale: 0.98 }} transition={micro} className="btn-white inline-flex h-8 items-center rounded-[12px] px-3 text-[12px] font-[550] leading-none">Open funnel</motion.span>
          </motion.div>
          <div className="mt-auto flex h-9 items-center gap-2 rounded-[12px] bg-white px-3 text-[12px] text-soft shadow-[var(--shadow-ring)]">
            Ask a follow-up <RiCornerDownLeftLine size={14} className="ml-auto" />
          </div>
        </section>
      </div>
    </div>
  )
}
