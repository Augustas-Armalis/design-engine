import { ArrowRight, CalendarBlank, CaretDown, Scan } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { Radar } from './components/Radar'

// Radar stage (page px, desktop 1440x900): a wide field rising from below the fold.
const FIELD = { top: 500, h: 400, cx: 720, cy: 700, r: 1000 }
// Six escalations that survive triage, and where their lines land on the card (top edge, centre).
const SIX = [
  { x: 290, y: 566 }, { x: 420, y: 532 }, { x: 560, y: 556 }, { x: 880, y: 552 }, { x: 1020, y: 528 }, { x: 1150, y: 562 },
]
const CARD = { w: 560, top: 632 }
const landX = (i: number) => 720 - 220 + i * 88
const route = (p: { x: number; y: number }, i: number) => {
  const ex = landX(i), ey = CARD.top
  return `M${p.x} ${p.y} C ${p.x + (ex - p.x) * 0.15} ${p.y + 70}, ${ex} ${ey - 46}, ${ex} ${ey}`
}

const ROWS = [
  { sev: 'High', title: 'Impossible travel on an admin account', src: 'okta', time: '09:42' },
  { sev: 'High', title: 'Access key created on a dormant IAM user', src: 'aws', time: '10:15' },
  { sev: 'Medium', title: 'Mass download from a shared drive by a new contractor', src: 'gws', time: '11:03' },
]

function Logo() {
  return (
    <a href="#" aria-label="Vigil, home" className="inline-flex h-[33px] items-center gap-2 text-ink no-underline">
      <Scan size={24} weight="bold" className="text-lime" />
      <span className="text-[20px] font-semibold tracking-[-0.045em]">Vigil</span>
    </a>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } })
  return (
    <div className="relative h-[900px] min-w-[1440px] overflow-hidden bg-night">
      {/* rails: full height, behind the field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[120px] w-px bg-line" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[1319px] w-px bg-line" />

      {/* signature field */}
      <div className="absolute inset-x-0 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent_0,#000_14%,#000_86%,transparent_100%),linear-gradient(to_bottom,transparent_0,#000_32%)]" style={{ top: FIELD.top, height: FIELD.h }}>
        <Radar width={1440} height={FIELD.h} cx={FIELD.cx} cy={FIELD.cy} r={FIELD.r} palette={['#151b22', '#34404b', '#7d8b98']} />
      </div>

      {/* the six that survive triage, flowing into the card */}
      <svg className="absolute inset-0 z-[5]" width={1440} height={900} aria-hidden="true">
        <defs>
          {SIX.map((p, i) => (
            <linearGradient key={i} id={`flow-${i}`} gradientUnits="userSpaceOnUse" x1={p.x} y1={p.y} x2={landX(i)} y2={CARD.top}>
              <stop offset="0" stopColor="#a3e635" /><stop offset="1" stopColor="#a3e635" stopOpacity="0.15" />
            </linearGradient>
          ))}
        </defs>
        {SIX.map((p, i) => (
          <g key={i}>
            <motion.path d={route(p, i)} fill="none" stroke={`url(#flow-${i})`} strokeWidth={1.4} initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 + i * 0.1, duration: 1, ease: [0.65, 0, 0.35, 1] }} />
            {!reduce && <path d={route(p, i)} pathLength={100} fill="none" stroke="#a3e635" strokeWidth={2.2} strokeLinecap="round" className="comet" style={{ animationDelay: `${2.4 + i * 0.4}s`, animationDuration: `${2.6 + (i % 3) * 0.3}s` }} />}
            <circle cx={p.x} cy={p.y} r={9} fill="#a3e635" fillOpacity={0.2} className="pulse" />
            <circle cx={p.x} cy={p.y} r={3.5} fill="#a3e635" />
          </g>
        ))}
      </svg>

      {/* header: Kaching nav spec, dark */}
      <header className="relative z-20 mx-auto mt-4 flex h-[43px] w-[1128px] items-center justify-between gap-3">
        <nav aria-label="Primary" className="flex items-center gap-4 rounded-[14px] bg-white/[0.06] py-[5px] pr-[5px] pl-4 shadow-[var(--shadow-ring)] backdrop-blur-[8px]">
          <Logo />
          <ul className="flex items-center gap-[2px]">
            {['Product', 'Integrations', 'Pricing', 'Docs'].map((l, i) => (
              <li key={l}><a href="#" className={`flex items-center gap-[5px] rounded-[12px] py-[6px] text-[15px] leading-[21px] font-medium tracking-[-0.45px] text-ink no-underline transition-colors duration-150 hover:bg-white/[0.08] ${i === 0 ? 'pr-[11px] pl-[14px]' : 'px-[11px]'}`}>{l}{i === 0 && <CaretDown size={12} weight="bold" className="text-muted" />}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <a href="#" className="rounded-[12px] px-4 py-[9px] text-[15px] leading-[19.5px] font-medium tracking-[-0.45px] text-ink no-underline transition-colors duration-150 hover:bg-white/[0.06]">Log in</a>
          <a href="#" className="rounded-[12px] bg-ink px-4 py-[9px] text-[15px] leading-[19.5px] font-medium tracking-[-0.45px] text-night no-underline transition-colors duration-150 hover:bg-white">Start free trial</a>
        </div>
      </header>

      <main className="relative z-10 mx-auto h-[841px] w-[1128px] pt-[84px] text-center">
        <motion.a {...fade(0)} href="#" className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] py-1 pr-3 pl-1 text-[13.5px] font-medium tracking-[-0.03em] text-ink no-underline shadow-[var(--shadow-ring)] backdrop-blur-[8px] transition-colors duration-150 hover:bg-white/[0.09]">
          <span className="rounded-full bg-[#4f8f16] px-2 py-0.5 text-[11.5px] font-semibold text-white">New</span>
          Investigations for Okta, AWS and Google Workspace
          <ArrowRight size={13} weight="bold" className="text-muted" />
        </motion.a>
        <motion.h1 {...fade(0.06)} className="mt-6 text-[84px] leading-[1.0] font-semibold tracking-[-0.058em] text-ink">
          Every Alert Investigated<br /><span className="text-[#6f7a85]">Only Real Threats Reach You</span>
        </motion.h1>
        <motion.p {...fade(0.12)} className="mx-auto mt-6 text-[18px] leading-[1.45] font-medium tracking-[-0.03em] text-muted">
          Vigil reads every alert from your SIEM, cloud and identity tools,<br />and escalates the few that need a human, with the evidence attached.
        </motion.p>
        <motion.div {...fade(0.18)} className="mt-8 flex items-center justify-center gap-2.5">
          <a href="#" className="inline-flex h-[46px] items-center gap-2.5 rounded-[14px] bg-ink px-5 text-[18px] font-medium tracking-[-0.54px] text-night no-underline transition-[background-color,transform] duration-150 hover:bg-white active:scale-[0.98]">
            Start free trial <ArrowRight size={18} weight="bold" />
          </a>
          <a href="#" className="inline-flex h-[46px] items-center gap-3 rounded-[14px] bg-white/[0.05] py-[5px] pr-4 pl-[5px] text-[18px] font-medium tracking-[-0.54px] text-ink no-underline shadow-[var(--shadow-ring)] transition-colors duration-150 hover:bg-white/[0.09] active:scale-[0.98]">
            <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-[#a3e635]/15 text-lime"><CalendarBlank size={19} weight="duotone" /></span>
            Book a demo
          </a>
        </motion.div>

        {/* product proof: the escalation queue, anchored to the hero bottom */}
        <motion.section {...fade(0.4)} aria-label="Sample escalation queue" className="absolute bottom-9 left-1/2 -translate-x-1/2 rounded-[18px] bg-[#0d1116]/95 p-5 text-left shadow-[var(--shadow-card)] backdrop-blur-[10px]" style={{ width: CARD.w }}>
          <div className="flex items-center justify-between">
            <div className="text-[15px] font-semibold tracking-[-0.03em] text-ink">Escalated today</div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a3e635]/12 px-2.5 py-1 text-[12px] font-semibold tracking-[-0.02em] text-lime">6 of 3,412 alerts</span>
          </div>
          <div className="mt-1 text-[13px] font-medium tracking-[-0.02em] text-muted">3,406 investigated and closed automatically · sample</div>
          <ul className="mt-4 divide-y divide-white/[0.07] border-t border-white/[0.07]">
            {ROWS.map((r) => (
              <li key={r.title} className="flex items-center gap-3 py-2.5">
                <span className={`w-[62px] shrink-0 rounded-[6px] px-1.5 py-0.5 text-center text-[11.5px] font-semibold ${r.sev === 'High' ? 'bg-[#f04438]/15 text-[#ff8a80]' : 'bg-[#f5a524]/15 text-[#f7c46a]'}`}>{r.sev}</span>
                <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium tracking-[-0.02em] text-ink">{r.title}</span>
                <span className="font-mono text-[12px] text-muted">{r.src} · {r.time}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </main>
      <p className="sr-only">Vigil is a fictional product; all alerts, names and numbers are sample data.</p>
    </div>
  )
}
