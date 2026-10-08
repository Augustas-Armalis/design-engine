import { useState } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import {
  RiArrowDownSLine, RiArrowRightSLine, RiBankCardLine, RiCodeSSlashLine, RiDatabase2Line,
  RiGlobalLine, RiMailLine, RiSmartphoneLine, RiSparkling2Fill,
} from '@remixicon/react'
import Dashboard from './components/Dashboard'
import { MARK } from './components/mark'
import { STAGGER, dur, ease, reveal, spring } from './motion'

// One load-in timeline (seconds), Kaching cadence: frame -> nav -> headline words -> copy -> stage -> tiles -> routes -> loops.
const T = { frame: 0, nav: 0.12, h1: 0.3, dash: 0.75, tiles: 1.15, routes: 1.5 }
const WORDS = 5
const T_SUB = T.h1 + WORDS * STAGGER + 0.05
const T_CTA = T_SUB + STAGGER * 1.5

// Data sources feeding Kestrel: tiles around the copy, routes flowing into the dashboard's top edge.
const TOP = 476
const SOURCES = [
  { icon: RiGlobalLine, c: [176, 150], end: 196, rot: -6, label: 'Web events', order: 0 },
  { icon: RiSmartphoneLine, c: [240, 256], end: 268, rot: 4, label: 'Mobile SDK', order: 2 },
  { icon: RiCodeSSlashLine, c: [304, 362], end: 340, rot: -3, label: 'Server events', order: 4 },
  { icon: RiDatabase2Line, c: [1264, 150], end: 1244, rot: 6, label: 'Warehouse', order: 1 },
  { icon: RiBankCardLine, c: [1200, 256], end: 1172, rot: -4, label: 'Billing', order: 3 },
  { icon: RiMailLine, c: [1136, 362], end: 1100, rot: 3, label: 'CRM', order: 5 },
]
type Source = (typeof SOURCES)[number]
const route = ({ c: [cx, cy], end }: Source) => {
  const sy = cy + 26, mid = (sy + TOP) / 2
  return `M${cx} ${sy} C${cx} ${mid + 30} ${end} ${mid - 10} ${end} ${TOP}`
}
const DRAW = 1.1
const routeStart = (s: Source) => T.routes + s.order * STAGGER
const arrival = (s: Source) => routeStart(s) + DRAW
const fill = { transformBox: 'fill-box', transformOrigin: 'center' } as const

function Route({ s, still }: { s: Source; still: boolean }) {
  const d = route(s)
  const at = arrival(s)
  return (
    <g>
      <motion.path d={d} fill="none" stroke="url(#route)" strokeWidth={1.25}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { delay: routeStart(s), duration: DRAW, ease: ease.inOut }, opacity: { delay: routeStart(s), duration: 0.3 } }} />
      {!still && (
        <motion.path d={d} fill="none" stroke="#335cff" strokeWidth={1.75} strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px rgba(51,92,255,0.8))' }}
          initial={{ pathLength: 0.09, pathOffset: 0, opacity: 0 }}
          animate={{ pathOffset: [0, 0.91], opacity: [0, 1, 1, 0] }}
          transition={{ delay: at + 0.6 + s.order * 0.5, duration: 2.4, ease: ease.inOut, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: 1.8 }} />
      )}
      {/* each endpoint appears only when its route lands, then starts breathing */}
      <motion.g style={fill} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: at - 0.08, duration: 0.6, ease: ease.outExpo }}>
        {!still && (
          <motion.circle cx={s.end} cy={TOP} r={6} fill="#335cff" style={fill}
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 2.6], opacity: [0.5, 0] }}
            transition={{ delay: at + 0.15, duration: 2.4, ease: ease.outQuint, repeat: Infinity, repeatDelay: 0.8 + s.order * 0.15 }} />
        )}
        <circle cx={s.end} cy={TOP} r={3} fill="#fff" stroke="#335cff" strokeWidth={1.5} />
      </motion.g>
    </g>
  )
}

function Tile({ s, still }: { s: Source; still: boolean }) {
  const delay = T.tiles + s.order * STAGGER
  return (
    <motion.div className="absolute z-20" style={{ left: s.c[0] - 26, top: s.c[1] - 26 }}
      initial={{ opacity: 0, scale: 0.86, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ y: { delay, duration: dur.reveal, ease: ease.reveal }, scale: { delay, duration: dur.reveal, ease: ease.outExpo }, opacity: { delay, duration: 0.6 } }}>
      <motion.div animate={still ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 6 + s.order * 0.4, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}>
        <motion.div title={s.label} whileHover={{ scale: 1.06, rotate: 0 }} transition={{ duration: 0.35, ease: ease.outQuint }}
          className="grid size-[52px] place-items-center rounded-[14px] bg-white text-sub shadow-[var(--shadow-tile)]" style={{ rotate: s.rot }}>
          <s.icon size={22} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const LINKS = ['Product', 'Ask AI', 'Pricing', 'Docs', 'Changelog']

function Nav() {
  const [hover, setHover] = useState<string | null>(null)
  const on = hover ?? 'Product'
  return (
    <header className="absolute inset-x-[144px] top-[22px] z-40 flex h-11 items-center">
      <motion.a {...reveal(T.nav, { y: -10 })} href="#" className="flex items-center gap-2" aria-label="Kestrel home">
        <motion.svg viewBox={MARK.viewBox} className="size-[26px] text-ink" aria-hidden
          initial={{ rotate: -120 }} animate={{ rotate: 0 }} transition={{ delay: T.nav, duration: 1.4, ease: ease.outExpo }}>
          <path fill="currentColor" fillRule="evenodd" d={MARK.d} />
        </motion.svg>
        <span className="text-[21px] font-[600] tracking-[-0.03em]">Kestrel</span>
      </motion.a>
      <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
        <motion.ul {...reveal(T.nav + STAGGER, { y: -10 })} onMouseLeave={() => setHover(null)}
          className="flex items-center gap-0.5 rounded-[14px] bg-[#ededed] p-1 shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
          {LINKS.map((l, i) => (
            <li key={l} className="relative">
              {on === l && <motion.span layoutId="nav-pill" transition={spring} className="absolute inset-0 rounded-[10px] bg-white shadow-[var(--shadow-ring)]" />}
              <a href="#" onMouseEnter={() => setHover(l)} onFocus={() => setHover(l)}
                className={`relative flex h-9 items-center gap-1 rounded-[10px] px-3.5 text-[14px] font-[500] tracking-[-0.01em] transition-colors duration-[220ms] ${on === l ? 'text-ink' : 'text-sub'}`}>
                {l}{i === 0 && <RiArrowDownSLine size={16} className="text-soft" />}
              </a>
            </li>
          ))}
        </motion.ul>
      </nav>
      <motion.div {...reveal(T.nav + STAGGER * 2, { y: -10 })} className="ml-auto flex items-center gap-1">
        <a href="#" className="flex h-10 items-center rounded-[12px] px-3.5 text-[14px] font-[500] text-sub transition-colors duration-[220ms] hover:text-ink">Sign in</a>
        <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-ink flex h-10 items-center rounded-[12px] px-4 text-[14px] font-[550]">Start free</motion.a>
      </motion.div>
    </header>
  )
}

function Word({ children, i }: { children: string; i: number }) {
  return <motion.span className="inline-block" {...reveal(T.h1 + i * STAGGER, { y: 28, blur: true })}>{children}</motion.span>
}

export default function App() {
  const still = !!useReducedMotion()
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden">
        {/* frame: rails draw down, the hairline draws out from the centre, nodes land, the dot grid fades in */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1.6, ease: ease.outQuint }}
            className="absolute bottom-0 left-[121px] top-[89px] w-[1199px] bg-[radial-gradient(circle,rgba(23,23,23,0.16)_1px,transparent_1.3px)] bg-[length:16px_16px] bg-[position:8px_8px] [mask-image:radial-gradient(ellipse_44%_32%_at_50%_22%,rgba(0,0,0,0.25),#000_100%)]" />
          {[120, 1320].map((l) => (
            <motion.div key={l} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: T.frame, duration: 1.6, ease: ease.outExpo }}
              className="absolute inset-y-0 w-px origin-top bg-rail" style={{ left: l }} />
          ))}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: T.frame + 0.05, duration: 1.6, ease: ease.outExpo }}
            className="absolute inset-x-0 top-[88px] h-px bg-rail" />
          {[120, 1320].map((l) => (
            <motion.span key={l} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.6, ease: ease.outExpo }}
              className="absolute top-[85px] size-[7px] rounded-[2px] bg-canvas shadow-[0_0_0_1px_#d4d4d4]" style={{ left: l - 3 }} />
          ))}
        </div>

        <Nav />

        <svg aria-hidden className="pointer-events-none absolute inset-0 z-10" width={1440} height={900}>
          <defs>
            <linearGradient id="route" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#c4c4c4" stopOpacity="0" />
              <stop offset="0.45" stopColor="#c4c4c4" stopOpacity="0.9" />
              <stop offset="1" stopColor="#335cff" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          {SOURCES.map((s) => <Route key={s.label} s={s} still={still} />)}
        </svg>
        {SOURCES.map((s) => <Tile key={s.label} s={s} still={still} />)}

        <main className="pointer-events-none relative z-20 flex flex-col items-center pt-[150px] text-center [&>*]:pointer-events-auto">
          <h1 className="text-[72px] font-[550] leading-[1.04] tracking-[-0.045em] text-ink">
            <Word i={0}>Product</Word> <Word i={1}>Analytics</Word><br />
            <Word i={2}>That</Word>
            <motion.span initial={{ rotate: -30, scale: 0.5, opacity: 0 }} animate={{ rotate: -6, scale: 1, opacity: 1 }}
              whileHover={{ rotate: 4, scale: 1.05 }}
              transition={{ delay: T.h1 + 3 * STAGGER, duration: 1.1, ease: ease.outExpo }}
              className="mx-3.5 inline-grid size-[60px] -translate-y-1.5 place-items-center rounded-[18px] bg-[linear-gradient(160deg,#6d8bff_0%,#335cff_55%,#2443e0_100%)] align-middle text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(17,40,170,0.35),0_0_0_1px_rgba(37,71,214,0.6),0_10px_22px_-8px_rgba(51,92,255,0.6)]">
              <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: T.h1 + 4 * STAGGER, duration: 1.1, ease: ease.outExpo }} className="grid">
                <RiSparkling2Fill size={30} />
              </motion.span>
            </motion.span>
            <Word i={3}>Answers</Word> <Word i={4}>Back</Word>
          </h1>

          <motion.p {...reveal(T_SUB, { y: 20, blur: true })} className="mt-[18px] text-[18px] leading-7 tracking-[-0.01em] text-sub">
            Ask a question in plain English and get the chart, the cohort and the reason.
          </motion.p>

          <motion.div {...reveal(T_CTA, { y: 20 })} className="mt-8 flex items-center gap-3">
            <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-ink group flex h-11 items-center gap-1.5 rounded-[14px] pl-5 pr-3.5 text-[15px] font-[550] tracking-[-0.01em]">
              Start for free <span className="font-[450] text-white/50">· No card needed</span>
              <RiArrowRightSLine size={18} className="text-white/60 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-white flex h-11 items-center rounded-[14px] px-5 text-[15px] font-[550] tracking-[-0.01em]">
              See it answer
            </motion.a>
          </motion.div>
        </main>

        {/* Kaching stage: the window lifts from 97% and rises, fading in quickly */}
        <motion.div className="absolute left-[152px] top-[476px] z-0 w-[1136px]" style={{ transformOrigin: '50% 0%' }}
          initial={{ opacity: 0, y: 64, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ y: { delay: T.dash, duration: 1.4, ease: ease.reveal }, scale: { delay: T.dash, duration: 1.4, ease: ease.outExpo }, opacity: { delay: T.dash, duration: 0.5, ease: ease.outQuint } }}>
          <Dashboard start={T.dash} />
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-14 bg-[linear-gradient(to_bottom,rgba(247,247,247,0),#f7f7f7)]" />
      </div>
    </MotionConfig>
  )
}
