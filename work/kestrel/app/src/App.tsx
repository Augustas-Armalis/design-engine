import { motion, MotionConfig } from 'motion/react'
import {
  RiArrowDownSLine, RiArrowRightSLine, RiBankCardLine, RiCodeSSlashLine, RiDatabase2Line,
  RiGlobalLine, RiMailLine, RiPlayCircleLine, RiSmartphoneLine, RiSparkling2Fill,
} from '@remixicon/react'
import Dashboard from './components/Dashboard'
import { MARK } from './components/mark'

const ease = [0.16, 1, 0.3, 1] as const
const rise = (d: number) => ({ initial: { opacity: 0, y: 14, filter: 'blur(6px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { delay: d, duration: 0.8, ease } })

// Data sources feeding Kestrel: tiles around the copy, routes flowing into the dashboard's top edge.
const TOP = 476
const LEFT = [
  { icon: RiGlobalLine, c: [176, 150], end: 196, rot: -6, label: 'Web events' },
  { icon: RiSmartphoneLine, c: [240, 256], end: 268, rot: 4, label: 'Mobile SDK' },
  { icon: RiCodeSSlashLine, c: [304, 362], end: 340, rot: -3, label: 'Server events' },
]
const RIGHT = [
  { icon: RiDatabase2Line, c: [1264, 150], end: 1244, rot: 6, label: 'Warehouse' },
  { icon: RiBankCardLine, c: [1200, 256], end: 1172, rot: -4, label: 'Billing' },
  { icon: RiMailLine, c: [1136, 362], end: 1100, rot: 3, label: 'CRM' },
]
const SOURCES = [...LEFT, ...RIGHT]
const route = ({ c: [cx, cy], end }: (typeof SOURCES)[number]) => {
  const sy = cy + 26, mid = (sy + TOP) / 2
  return `M${cx} ${sy} C${cx} ${mid + 30} ${end} ${mid - 10} ${end} ${TOP}`
}

const LINKS = ['Product', 'Ask AI', 'Pricing', 'Docs', 'Changelog']

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden">
        {/* rails + registration nodes */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-[121px] top-[89px] w-[1199px] bg-[radial-gradient(circle,rgba(23,23,23,0.16)_1px,transparent_1.3px)] bg-[length:16px_16px] bg-[position:8px_8px] [mask-image:radial-gradient(ellipse_44%_32%_at_50%_22%,rgba(0,0,0,0.25),#000_100%)]" />
          <div className="absolute inset-y-0 left-[120px] w-px bg-rail" />
          <div className="absolute inset-y-0 left-[1320px] w-px bg-rail" />
          <div className="absolute inset-x-0 top-[88px] h-px bg-rail" />
          {[120, 1320].map((l) => <span key={l} className="absolute top-[85px] size-[7px] -translate-x-[3px] rounded-[2px] bg-canvas shadow-[0_0_0_1px_#d4d4d4]" style={{ left: l }} />)}
        </div>

        <header className="absolute inset-x-[144px] top-[22px] flex h-11 items-center">
          <a href="#" className="flex items-center gap-2" aria-label="Kestrel home">
            <svg viewBox={MARK.viewBox} className="size-[26px] text-ink" aria-hidden><path fill="currentColor" fillRule="evenodd" d={MARK.d} /></svg>
            <span className="text-[21px] font-[600] tracking-[-0.03em]">Kestrel</span>
          </a>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-0.5 rounded-[14px] bg-[#ededed] p-1 shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
              {LINKS.map((l, i) => (
                <li key={l}>
                  <a href="#" className={`flex h-9 items-center gap-1 rounded-[10px] px-3.5 text-[14px] font-[500] tracking-[-0.01em] transition-colors ${i === 0 ? 'bg-white text-ink shadow-[var(--shadow-ring)]' : 'text-sub hover:text-ink'}`}>
                    {l}{i === 0 && <RiArrowDownSLine size={16} className="text-soft" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <a href="#" className="flex h-10 items-center rounded-[12px] px-3.5 text-[14px] font-[500] text-sub hover:text-ink">Sign in</a>
            <a href="#" className="btn-ink flex h-10 items-center rounded-[12px] px-4 text-[14px] font-[550]">Start free</a>
          </div>
        </header>

        {/* sources + flowing routes */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 z-10" width={1440} height={900}>
          <defs>
            <linearGradient id="route" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#c4c4c4" stopOpacity="0" />
              <stop offset="0.45" stopColor="#c4c4c4" stopOpacity="0.9" />
              <stop offset="1" stopColor="#335cff" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          {SOURCES.map((s, i) => (
            <g key={s.label}>
              <motion.path d={route(s)} fill="none" stroke="url(#route)" strokeWidth={1.25}
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 + i * 0.08, duration: 1, ease }} />
              <path d={route(s)} pathLength={100} fill="none" stroke="#335cff" strokeWidth={1.75} strokeLinecap="round" className="comet"
                style={{ animationDelay: `${2 + i * 0.55}s` }} />
              <circle cx={s.end} cy={TOP} r={6} fill="#335cff" className="ping" style={{ animationDelay: `${i * 0.4}s` }} />
              <circle cx={s.end} cy={TOP} r={3} fill="#fff" stroke="#335cff" strokeWidth={1.5} />
            </g>
          ))}
        </svg>
        {SOURCES.map((s, i) => (
          <motion.div key={s.label} {...rise(0.5 + i * 0.06)} className="absolute z-20" style={{ left: s.c[0] - 26, top: s.c[1] - 26 }}>
            <div className="bob" style={{ animationDelay: `${i * -1.1}s` }}>
              <div title={s.label} className="grid size-[52px] place-items-center rounded-[14px] bg-white text-sub shadow-[var(--shadow-tile)]" style={{ transform: `rotate(${s.rot}deg)` }}>
                <s.icon size={22} />
              </div>
            </div>
          </motion.div>
        ))}

        <main className="relative z-20 flex flex-col items-center pt-[150px] text-center">
          

          <motion.h1 {...rise(0.08)} className="text-[72px] font-[550] leading-[1.04] tracking-[-0.045em] text-ink">
            Product Analytics<br />
            That
            <motion.span initial={{ rotate: -24, scale: 0.6, opacity: 0 }} animate={{ rotate: -6, scale: 1, opacity: 1 }} transition={{ delay: 0.55, type: 'spring', stiffness: 260, damping: 16 }}
              className="mx-3.5 inline-grid size-[60px] -translate-y-1.5 place-items-center rounded-[18px] bg-[linear-gradient(160deg,#6d8bff_0%,#335cff_55%,#2443e0_100%)] align-middle text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(17,40,170,0.35),0_0_0_1px_rgba(37,71,214,0.6),0_10px_22px_-8px_rgba(51,92,255,0.6)]">
              <RiSparkling2Fill size={30} />
            </motion.span>
            Answers Back
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-[18px] text-[18px] leading-7 tracking-[-0.01em] text-sub">
            Ask a question in plain English and get the chart, the cohort and the reason.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-8 flex items-center gap-3">
            <a href="#" className="btn-ink flex h-11 items-center gap-1.5 rounded-[14px] pl-5 pr-3.5 text-[15px] font-[550] tracking-[-0.01em]">
              Start for free <span className="font-[450] text-white/50">· No card needed</span><RiArrowRightSLine size={18} className="text-white/60" />
            </a>
            <a href="#" className="btn-white flex h-11 items-center gap-1.5 rounded-[14px] pl-4 pr-5 text-[15px] font-[550] tracking-[-0.01em]">
              <RiPlayCircleLine size={18} className="text-soft" /> See it answer
            </a>
          </motion.div>
        </main>

        <motion.div initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.1, ease }}
          className="absolute left-[152px] top-[476px] z-0 w-[1136px]">
          <Dashboard />
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-14 bg-[linear-gradient(to_bottom,rgba(247,247,247,0),#f7f7f7)]" />
      </div>
    </MotionConfig>
  )
}
