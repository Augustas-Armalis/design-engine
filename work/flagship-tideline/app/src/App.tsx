import { ArrowRight, CaretDown, CheckCircle, CircleNotch, Headset } from '@phosphor-icons/react'
import { MARK_PATH, MARK_VIEWBOX } from './components/mark'
import { motion, useReducedMotion } from 'motion/react'
import { Globe } from './components/Globe'
import { CITIES, HQ, project } from './components/geo'

// Globe stage geometry (page px, desktop 1440x900).
const STAGE = { left: 600, top: 150, w: 840, h: 750 }
const G = { cx: 520, cy: 560, r: 470 }
const pt = (lat: number, lon: number) => { const p = project(lat, lon); return { x: G.cx + G.r * p.x, y: G.cy - G.r * p.y } }
const HQP = pt(HQ.lat, HQ.lon)

const PAYOUTS: Record<string, { amount: string; status: 'arrived' | 'flight'; time: string }> = {
  nyc: { amount: '$9,400.00', status: 'arrived', time: '41s' },
  los: { amount: '₦4,820,000', status: 'arrived', time: '1m 02s' },
  nbo: { amount: 'KSh 1,240,000', status: 'flight', time: 'landing' },
}

const LIFT: Record<string, number> = { nyc: 0.3, los: 0.16, nbo: 0.22 }
function arc(a: { x: number; y: number }, b: { x: number; y: number }, k = 0.32) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
  const nx = mx - G.cx, ny = my - G.cy, nl = Math.hypot(nx, ny) || 1
  const lift = Math.hypot(b.x - a.x, b.y - a.y) * k
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${(mx + (nx / nl) * lift).toFixed(1)} ${(my + (ny / nl) * lift).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

function Logo() {
  return (
    <a href="#" aria-label="Tideline, home" className="inline-flex h-10 items-center gap-2.5 text-ink no-underline">
      <svg viewBox={MARK_VIEWBOX} className="h-[29px] w-auto" aria-hidden="true"><path d={MARK_PATH} fill="currentColor" fillRule="evenodd" /></svg>
      <span className="text-[20px] font-semibold tracking-[-0.045em]">Tideline</span>
    </a>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } })
  return (
    <div className="relative h-[900px] min-w-[1440px] overflow-hidden bg-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[120px] z-0 w-px bg-line" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[1319px] z-[5] w-px bg-line" />

      {/* globe stage */}
      <div className="absolute [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%),linear-gradient(to_right,#000_80%,transparent_100%)]" style={{ left: STAGE.left, top: STAGE.top, width: STAGE.w, height: STAGE.h }}>
        <Globe width={STAGE.w} height={STAGE.h} cx={G.cx} cy={G.cy} r={G.r} palette={['#f3f1ec', '#dcd8cf', '#8e897f', '#1c1b18']} />
      </div>
      <div className="absolute z-[6]" style={{ left: STAGE.left, top: STAGE.top, width: STAGE.w, height: STAGE.h }}>
        <svg className="absolute inset-0 overflow-visible" width={STAGE.w} height={STAGE.h} aria-hidden="true">
          {CITIES.map((c, i) => {
            const d = arc(HQP, pt(c.lat, c.lon), LIFT[c.id])
            return (
              <g key={c.id}>
                <path d={d} fill="none" stroke="#1c1b18" strokeOpacity={0.18} strokeWidth={1} />
                <motion.path d={d} fill="none" stroke="#ff5b1f" strokeWidth={1.75} strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 + i * 0.18, duration: 1.1, ease: [0.65, 0, 0.35, 1] }} />
                {!reduce && <circle r={3} fill="#ff5b1f"><animateMotion dur={`${2.6 + i * 0.35}s`} begin={`${2.2 + i * 0.2}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" /></circle>}
              </g>
            )
          })}
          {CITIES.map((c) => { const p = pt(c.lat, c.lon); return (
            <g key={c.id + 'dot'}>
              <circle cx={p.x} cy={p.y} r={10} fill="#ff5b1f" fillOpacity={0.14} className="pulse" />
              <circle cx={p.x} cy={p.y} r={4} fill="#fff" stroke="#ff5b1f" strokeWidth={2} />
              <line x1={p.x} y1={p.y + 6} x2={p.x} y2={p.y + 18} stroke="#1c1b18" strokeOpacity={0.35} strokeWidth={1} />
            </g>) })}
          <circle cx={HQP.x} cy={HQP.y} r={6} fill="#1c1b18" stroke="#f3f1ec" strokeWidth={2.5} />
        </svg>
        {/* payout chips */}
        <motion.div {...fade(0.7)} className="absolute flex items-center gap-1.5 rounded-[10px] bg-ink px-2.5 py-1.5 text-[12.5px] font-medium tracking-[-0.02em] text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]" style={{ left: HQP.x + 14, top: HQP.y - 40 }}>
          Berlin <span className="font-mono text-[11.5px] text-white/60">payroll run</span>
        </motion.div>
        {CITIES.map((c, i) => {
          const p = pt(c.lat, c.lon), o = PAYOUTS[c.id]
          return (
            <motion.div key={c.id + 'chip'} {...fade(1.6 + i * 0.16)} className="absolute w-[172px] -translate-x-1/2 rounded-[12px] bg-white px-3 py-2.5 shadow-[0_0_0_1px_rgba(28,27,24,0.08),0_1px_2px_rgba(28,27,24,0.05),0_6px_16px_-8px_rgba(28,27,24,0.16)]" style={{ left: p.x, top: p.y + 18 }}>
              <div className="flex items-center justify-between text-[12px] font-medium tracking-[-0.02em] text-muted">
                <span>{c.name}</span>
                {o.status === 'arrived'
                  ? <span className="inline-flex items-center gap-1 text-[#13804a]"><CheckCircle size={14} weight="fill" />{o.time}</span>
                  : <span className="inline-flex items-center gap-1 text-[#c2410c]"><CircleNotch size={13} weight="bold" className="spin" />{o.time}</span>}
              </div>
              <div className="mt-0.5 text-[15px] font-semibold tracking-[-0.035em] text-ink tabular-nums">{o.amount}</div>
            </motion.div>
          )
        })}
      </div>

      {/* header: logo + links pill on the left, actions on the right, both on the content edges */}
      <header className="relative z-20 mx-auto flex w-[1128px] items-center justify-between pt-5">
        <nav aria-label="Primary" className="flex h-[52px] items-center rounded-[15px] bg-white pr-1.5 pl-4 shadow-[0_0_0_1px_rgba(28,27,24,0.07),0_1px_2px_rgba(28,27,24,0.04)]">
          <Logo />
          <span aria-hidden="true" className="mx-5 h-5 w-px bg-line" />
          <ul className="flex items-center gap-1 text-[15px] font-medium tracking-[-0.03em]">
            {['Product', 'Countries', 'Pricing', 'Customers'].map((l, i) => (
              <li key={l}><a href="#" className="inline-flex h-10 items-center gap-1 rounded-[11px] px-3.5 text-[#2a2926] no-underline transition-colors hover:bg-paper hover:text-ink">{l}{i === 0 && <CaretDown size={13} weight="bold" className="text-muted" />}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="inline-flex h-10 items-center rounded-[12px] px-4 text-[15px] font-medium tracking-[-0.03em] text-ink no-underline transition-colors hover:bg-white">Log in</a>
          <a href="#" className="inline-flex h-10 items-center rounded-[12px] bg-ink px-[18px] text-[15px] font-medium tracking-[-0.03em] text-white no-underline transition-colors hover:bg-[#303030]">Run payroll</a>
        </div>
      </header>

      {/* copy column */}
      <main className="relative z-10 mx-auto w-[1128px] pt-[60px]">
        <motion.a {...fade(0)} href="#" className="inline-flex items-center gap-2 rounded-full bg-white py-1 pr-3 pl-1 text-[13.5px] font-medium tracking-[-0.03em] text-ink no-underline shadow-[0_0_0_1px_var(--color-line)]">
          <span className="rounded-full bg-[#ff5b1f] px-2 py-0.5 text-[11.5px] font-semibold text-white">New</span>
          Same-day payouts in 41 currencies
          <ArrowRight size={13} weight="bold" className="text-muted" />
        </motion.a>
        <motion.h1 {...fade(0.06)} className="mt-6 text-[70px] leading-[1.02] font-semibold tracking-[-0.055em] text-ink">
          Payroll For Teams<br />In Every Timezone.
        </motion.h1>
        <motion.p {...fade(0.12)} className="mt-6 max-w-[520px] text-[18px] leading-[1.45] font-medium tracking-[-0.03em] text-muted">
          Pay people in 41 currencies, file local tax in every country, and watch each payment land as it happens.
        </motion.p>
        <motion.div {...fade(0.18)} className="mt-8 flex items-center gap-2.5">
          <a href="#" className="inline-flex h-[46px] items-center gap-2.5 rounded-[14px] bg-ink px-5 text-[18px] font-medium tracking-[-0.54px] text-white no-underline transition-[background-color,transform] duration-150 hover:bg-[#303030] active:scale-[0.98]">
            Run your first payroll <ArrowRight size={18} weight="bold" />
          </a>
          <a href="#" className="inline-flex h-[46px] items-center gap-3 rounded-[14px] border border-line bg-white py-[5px] pr-4 pl-[5px] text-[18px] font-medium tracking-[-0.54px] text-ink no-underline transition-colors duration-150 hover:bg-[#f2f2f0] active:scale-[0.98]">
            <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-[#ffe9df] text-[#c2410c]"><Headset size={19} weight="duotone" /></span>
            Talk to sales
          </a>
        </motion.div>

        {/* product proof: the payroll run the arcs are paying out */}
        <motion.section {...fade(0.3)} aria-label="Sample payroll run" className="mt-12 w-[408px] rounded-[18px] bg-white p-5 shadow-[0_0_0_1px_rgba(28,27,24,0.08),0_1px_2px_rgba(28,27,24,0.05),0_8px_20px_-12px_rgba(28,27,24,0.12)]">
          <div className="flex items-center justify-between">
            <div className="text-[15px] font-semibold tracking-[-0.03em] text-ink">October payroll</div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff1ea] px-2.5 py-1 text-[12px] font-semibold tracking-[-0.02em] text-[#c2410c]"><span className="pulse-dot size-1.5 rounded-full bg-[#ff5b1f]" />Paying</span>
          </div>
          <div className="mt-1 text-[13px] font-medium tracking-[-0.02em] text-muted">48 people · 11 currencies · sample</div>
          <div className="mt-4 text-[34px] leading-none font-semibold tracking-[-0.045em] text-ink tabular-nums">€184,320<span className="text-[#a8a49b]">.00</span></div>
          <div className="mt-3 flex h-2 gap-[3px]">
            {Array.from({ length: 48 }, (_, i) => <span key={i} className={`flex-1 rounded-[2px] ${i < 41 ? 'bg-ink' : 'bg-[#e6e3dc]'}`} />)}
          </div>
          <div className="mt-4 grid grid-cols-3 border-t border-line pt-3 text-[12.5px] font-medium tracking-[-0.02em]">
            <div><div className="text-muted">Paid</div><div className="mt-0.5 font-mono text-[14px] text-ink">41</div></div>
            <div><div className="text-muted">In flight</div><div className="mt-0.5 font-mono text-[14px] text-ink">7</div></div>
            <div><div className="text-muted">All paid by</div><div className="mt-0.5 font-mono text-[14px] text-ink">14:20 CET</div></div>
          </div>
        </motion.section>
      </main>
      <p className="sr-only">Tideline is a fictional product; all names, amounts and times are sample data.</p>
    </div>
  )
}
