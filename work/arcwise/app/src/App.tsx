// Arcwise hero (Polar system, dark recipe "Midnight ink"). Layout: floating capsule nav, centred Sora headline, and the
// product tilted back in 3D below, lit by its own edge (the window is the light source) and reflected on the floor.
// One conceptual reveal: the dashboard lands and builds, then a question is typed into the Ask bar and answered on the chart.
import { useEffect, useState } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowUp, ChartPolar, Sparkle } from '@phosphor-icons/react'
import { Reveal } from './kit'
import { ease } from './motion'
import Dash from './Dash'

const T = { nav: 0.05, copy: 0.12, window: 0.5, intro: 1.05, ask: 2.6, answer: 4.1 }
const Q = 'Why did ARR jump in August?'
const LINKS = ['Product', 'Customers', 'Pricing', 'Docs']

function useStory() {
  const still = useReducedMotion()
  const [phase, setPhase] = useState(still ? 2 : 0)
  const [typed, setTyped] = useState(still ? Q.length : 0)
  useEffect(() => {
    if (still) return
    const ids = [setTimeout(() => setPhase(1), T.ask * 1000), setTimeout(() => setPhase(2), T.answer * 1000)]
    const t0 = performance.now() + T.ask * 1000
    const iv = setInterval(() => { const k = Math.max(0, Math.min(1, (performance.now() - t0) / 1100)); setTyped(Math.round(k * Q.length)); if (k >= 1) clearInterval(iv) }, 24)
    return () => { ids.forEach(clearTimeout); clearInterval(iv) }
  }, [still])
  return { phase, typed }
}

export default function App() {
  const { phase, typed } = useStory()
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* capsule nav: one floating container, links centred */}
        <Reveal at={T.nav} y={-8} className="absolute inset-x-[150px] top-5 z-40">
          <header className="flex h-[58px] items-center rounded-[18px] bg-[rgb(16_19_25/0.72)] pl-5 pr-2.5 shadow-[0_0_0_1px_var(--line),inset_0_1px_0_rgb(255_255_255/0.05)] backdrop-blur-xl">
            <a href="#" aria-label="Arcwise home" className="flex items-center gap-2">
              <ChartPolar size={22} weight="fill" className="text-[var(--accent)]" />
              <span className="font-[family-name:var(--font-display)] text-[19px] font-[600] tracking-[-0.03em]">Arcwise</span>
            </a>
            <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2"><ul className="flex">
              {LINKS.map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 text-[14px] text-[var(--sub)] transition-colors hover:bg-[rgb(243_245_250/0.05)] hover:text-[var(--ink)]">{l}</a></li>)}
            </ul></nav>
            <a href="#" className="ml-auto flex h-10 items-center px-3.5 text-[14px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">Log in</a>
            <a href="#" className="btn-deep press flex h-10 items-center rounded-full px-4 text-[14px] font-[550]">Start free trial</a>
          </header>
        </Reveal>

        <main className="pointer-events-none absolute inset-x-0 top-[132px] z-20 flex flex-col items-center text-center [&>*]:pointer-events-auto">
          <Reveal at={T.copy} y={14} blur>
            <h1 className="font-[family-name:var(--font-display)] text-[64px] font-[600] leading-[1.04] tracking-[-0.04em]">Revenue Analytics<br /><span className="text-[#b9c2ff]">That Answers Back</span></h1>
          </Reveal>
          <Reveal at={T.copy + 0.08} y={14} blur>
            <p className="mt-5 text-[17px] leading-[27px] text-[var(--sub)]">Ask why a number moved and get the accounts, the cohort<br />and the chart behind it in seconds.</p>
          </Reveal>
          <Reveal at={T.copy + 0.16} y={14}>
            <div className="mt-8 flex items-center gap-3">
              <a href="#" className="btn-deep press flex h-11 items-center rounded-full px-5 text-[15px] font-[550]">Start free trial</a>
              <a href="#" className="btn-glass press flex h-11 items-center rounded-full px-5 text-[15px] font-[500]">Book a demo</a>
            </div>
          </Reveal>
        </main>

        {/* the product is the light: tilted window, edge spotlight, reflection on the floor */}
        <div className="absolute inset-x-0 top-[452px] z-10 flex justify-center [perspective:1700px]">
          <motion.div initial={{ opacity: 0.01, rotateX: 30, y: 60 }} animate={{ opacity: 1, rotateX: 15, y: 0 }}
            transition={{ duration: 1.4, delay: T.window, ease: ease.reveal }} style={{ transformOrigin: '50% 0%' }}
            className="relative w-[1180px]" role="img" aria-label="Arcwise revenue dashboard with sample data: ARR line, KPIs, and an answer explaining August expansion">
            <div aria-hidden className="absolute -inset-x-24 -top-16 h-40 bg-[radial-gradient(50%_60%_at_50%_100%,rgb(140_155_255/0.16),transparent_70%)] blur-xl" />
            <div inert className="relative h-[560px] overflow-hidden rounded-[18px] shadow-[0_0_0_1px_oklch(0.86_0.02_266/0.12),inset_0_1px_0_rgb(255_255_255/0.08),0_30px_60px_-20px_rgb(0_0_0/0.8)]">
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgb(200_208_255/0.6)_35%,rgb(200_208_255/0.6)_65%,transparent)]" />
              <Dash intro={T.intro} phase={phase} />
            </div>
          </motion.div>
        </div>
        {/* floor: the window's light falling on the ground, feathered into the canvas */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[220px] bg-[linear-gradient(to_bottom,transparent,var(--canvas)_78%)]" />

        {/* Ask bar floats in front of the tilted product (not tilted itself) */}
        <Reveal at={T.ask - 0.35} y={16} className="absolute left-1/2 top-[812px] z-30 -translate-x-1/2">
          <div className="flex h-[54px] w-[520px] items-center gap-3 rounded-full bg-[rgb(24_27_33/0.86)] pl-5 pr-2 shadow-[0_0_0_1px_var(--line-2),inset_0_1px_0_rgb(255_255_255/0.06),0_20px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl">
            <Sparkle size={17} weight="fill" className="shrink-0 text-[var(--accent)]" />
            <span className="flex-1 truncate text-left text-[15px] text-[var(--ink)]">
              {typed ? Q.slice(0, typed) : <span className="text-[var(--soft)]">Ask anything about revenue…</span>}
              {typed > 0 && typed < Q.length && <span className="ml-px inline-block h-[15px] w-[1.5px] translate-y-[2px] animate-pulse bg-[var(--accent)]" />}
            </span>
            <motion.span animate={{ scale: phase === 1 && typed >= Q.length ? [1, 0.9, 1] : 1 }} transition={{ duration: 0.3 }}
              className={`grid size-[38px] place-items-center rounded-full transition-colors duration-300 ${typed >= Q.length ? 'bg-[var(--accent)] text-[var(--accent-ink)]' : 'bg-[rgb(243_245_250/0.08)] text-[var(--soft)]'}`}><ArrowUp size={17} weight="bold" /></motion.span>
          </div>
        </Reveal>
      </div>
    </MotionConfig>
  )
}
