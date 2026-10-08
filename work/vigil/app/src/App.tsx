import { ArrowRight, Scan, WarningOctagon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useRef } from 'react'
import { Lens } from './components/Lens'

const LENS = { home: { x: 1030, y: 440 }, r: 204 }
const Mark = ({ x, y }: { x: number; y: number }) => (
  <span aria-hidden="true" className="absolute size-3" style={{ left: x - 6, top: y - 6 }}>
    <span className="absolute top-1/2 left-0 h-px w-3 bg-white/30" /><span className="absolute top-0 left-1/2 h-3 w-px bg-white/30" />
  </span>
)

export default function App() {
  const reduce = useReducedMotion()
  const card = useRef<HTMLDivElement>(null)
  const follow = useCallback((x: number, y: number) => {
    if (card.current) card.current.style.transform = `translate(${x - LENS.r - 150}px, ${y + LENS.r * 0.5}px)`
  }, [])
  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } })

  return (
    <div className="relative h-[900px] min-w-[1440px] overflow-hidden bg-night">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[120px] w-px bg-line" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[1319px] w-px bg-line" />

      {/* signature: glass lens over the alert field */}
      <div className="absolute inset-0 [mask-composite:intersect] [mask-image:radial-gradient(120%_95%_at_70%_48%,#000_55%,transparent_100%),linear-gradient(to_right,transparent_0,transparent_36%,#000_58%),linear-gradient(to_bottom,transparent_0,transparent_72px,#000_170px)]">
        <Lens width={1440} height={900} home={LENS.home} radius={LENS.r} onMove={follow} />
      </div>

      {/* the lens's investigation, riding with it */}
      <div ref={card} className="absolute top-0 left-0 z-10 w-[320px] will-change-transform" style={{ transform: `translate(${LENS.home.x - LENS.r - 150}px, ${LENS.home.y + LENS.r * 0.5}px)` }}>
        <motion.div {...fade(1.4)} className="rounded-[14px] border border-white/[0.09] bg-[#0b0f14]/85 p-4 backdrop-blur-[12px]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold tracking-[-0.02em] text-[#ff8a80]"><WarningOctagon size={15} weight="fill" />High · Impossible travel</span>
            <span className="font-mono text-[12px] text-muted">09:42</span>
          </div>
          <div className="mt-2 text-[15px] font-semibold tracking-[-0.03em] text-ink">admin@northwind.dev</div>
          <div className="mt-0.5 text-[13px] tracking-[-0.02em] text-muted">Lisbon to Singapore in 9 minutes · sample</div>
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[12px]">
            <span className="text-muted">4 sign-ins · 1 MFA reset</span>
            <span className="text-lime">escalated</span>
          </div>
        </motion.div>
      </div>

      {/* figure framing (M15): registration marks where the rails meet the field */}
      <Mark x={120} y={104} /><Mark x={1319} y={104} /><Mark x={120} y={862} /><Mark x={1319} y={862} />

      {/* nav: a hairline bar between the rails, not a pill */}
      <header className="relative z-20 mx-auto flex h-[72px] w-[1199px] items-center justify-between border-b border-white/[0.08] px-9">
        <a href="#" aria-label="Vigil, home" className="flex items-center gap-2 text-ink no-underline">
          <Scan size={24} weight="bold" className="text-lime" />
          <span className="text-[20px] font-semibold tracking-[-0.045em]">Vigil</span>
        </a>
        <nav aria-label="Primary" className="absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-8 text-[15px] font-medium tracking-[-0.03em] text-[#b7bec6]">
            {['Product', 'How it investigates', 'Pricing', 'Docs'].map((l) => <li key={l}><a href="#" className="slide-link -my-2 inline-block py-2 text-[#b7bec6] transition-colors duration-150 hover:text-ink">{l}</a></li>)}
          </ul>
        </nav>
        <div className="flex items-center gap-6 text-[15px] font-medium tracking-[-0.03em]">
          <a href="#" className="slide-link -my-2 py-2 text-[#b7bec6] hover:text-ink">Log in</a>
          <a href="#" className="rounded-[10px] border border-lime/40 px-3.5 py-2 text-lime no-underline transition-colors duration-150 hover:bg-lime/10">Start trial</a>
        </div>
      </header>

      <main className="relative z-10 mx-auto h-[828px] w-[1128px] pt-[92px]">
        <motion.div {...fade(0)} className="flex items-center gap-2.5 font-mono text-[12.5px] tracking-[-0.01em] text-muted">
          <span className="size-1.5 bg-lime" />Fig. 0.1 · Alert field, Tue 14 Oct · 3,412 points
        </motion.div>
        <motion.h1 {...fade(0.06)} className="mt-5 font-mono text-[74px] leading-[1.02] font-semibold tracking-[-0.06em] text-ink">
          Every Alert Read<br /><span className="text-[#6f7a85]">Six Need You</span>
        </motion.h1>
        <motion.p {...fade(0.12)} className="mt-7 text-[18px] leading-[1.5] font-medium tracking-[-0.03em] text-muted">
          Vigil investigates every alert from your SIEM, cloud and identity<br />tools, and escalates only the few that need a human.
        </motion.p>
        <motion.div {...fade(0.18)} className="mt-9 flex items-center gap-7">
          <a href="#" className="push"><span className="push-shadow" /><span className="push-edge" /><span className="push-front">Start free trial <ArrowRight size={17} weight="bold" /></span></a>
          <a href="#" className="slide-link inline-flex items-center gap-2 text-[16px] font-medium tracking-[-0.03em] text-ink">Watch a triage <ArrowRight size={15} weight="bold" className="text-muted" /></a>
        </motion.div>
        <motion.div {...fade(0.3)} className="absolute top-[796px] left-0 flex gap-10 font-mono text-[12.5px] text-muted">
          <span><span className="text-ink">3,406</span> closed automatically</span><span><span className="text-lime">6</span> escalated</span><span><span className="text-ink">4m 12s</span> median investigation</span><span>sample data</span>
        </motion.div>
      </main>
      <p className="sr-only">Vigil is a fictional product; all alerts, names and numbers are sample data.</p>
    </div>
  )
}
