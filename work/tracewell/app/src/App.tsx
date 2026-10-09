// Tracewell hero, round 2 (founder kept the layout; rejected buttons, app and dark styling). Premium dark measured from Linear.
// Layout: headline left, subtitle + CTAs right on the headline's baseline, then the trace explorer full width bleeding right
// and bottom. One conceptual reveal: a live run streams through the waterfall; when a call fails, the AI panel explains it.
import { MotionConfig, motion } from 'motion/react'
import { ArrowRight, Command, Path } from '@phosphor-icons/react'
import { Reveal } from './kit'
import { ease } from './motion'
import Trace, { AiPanel, useStep, useTraceClock } from './Trace'

const T = { nav: 0.05, copy: 0.1, window: 0.45, intro: 0.95, run: 1.7 }
const LINKS = ['Product', 'Docs', 'Pricing', 'Changelog']

export default function App() {
  const t = useTraceClock(T.run)
  const step = useStep(t)
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* one soft overhead light; nothing else on the canvas */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_55%_60%_at_50%_-10%,rgba(255,255,255,0.055),transparent_70%)]" />

        <Reveal at={T.nav} y={-6} className="absolute inset-x-0 top-0 z-40">
          <header className="flex h-[68px] items-center border-b border-[rgba(255,255,255,0.08)] px-20 backdrop-blur-xl">
            <a href="#" aria-label="Tracewell home" className="flex items-center gap-2">
              <Path size={22} weight="bold" className="text-[var(--lime)]" />
              <span className="text-[19px] font-[600] tracking-[-0.03em]">Tracewell</span>
            </a>
            <nav aria-label="Main" className="ml-auto mr-5"><ul className="flex">
              {LINKS.map((l) => <li key={l}><a href="#" className="flex h-9 items-center px-3.5 text-[14px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">{l}</a></li>)}
            </ul></nav>
            <span aria-hidden className="mr-4 h-4 w-px bg-[var(--line-2)]" />
            <a href="#" className="btn-text flex h-9 items-center px-3 text-[14px]">Log in</a>
            <a href="#" className="btn-light press ml-1 flex h-9 items-center rounded-full px-4 text-[14px] font-[550]">Start tracing</a>
          </header>
        </Reveal>

        <main className="pointer-events-none absolute inset-x-20 top-[150px] z-20 flex items-end justify-between [&>*]:pointer-events-auto">
          <Reveal at={T.copy} y={14} blur>
            <h1 className="text-[70px] font-[550] leading-[1.02] tracking-[-0.03em]">See Every Step<br />Your Agents Take</h1>
          </Reveal>
          <Reveal at={T.copy + 0.1} y={14} className="mb-[8px] w-[420px]">
            <p className="text-[16px] leading-[25px] text-[var(--sub)]">Tracewell records every prompt, tool call and retry,<br />so you find the step that broke and ship the fix.</p>
            <div className="mt-6 flex items-center gap-5">
              <a href="#" className="btn-light press flex h-10 items-center gap-1.5 rounded-full pl-4 pr-3.5 text-[14px] font-[550]">Start tracing free<ArrowRight size={14} weight="bold" className="arr" /></a>
              <a href="#" className="btn-text flex items-center gap-1.5 text-[14px]"><Command size={14} />Read the docs<ArrowRight size={13} className="arr" /></a>
            </div>
          </Reveal>
        </main>

        <motion.section initial={{ opacity: 0.01, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ y: { delay: T.window, duration: 1.1, ease: ease.reveal }, opacity: { delay: T.window, duration: 0.6, ease: ease.outQuint } }}
          className="absolute left-[64px] top-[352px] z-10 w-[1500px] [mask-image:linear-gradient(to_bottom,#000_440px,transparent_560px)]"
          role="img" aria-label="Tracewell trace explorer with sample data: a support agent run streams in, a refund call fails, retries and succeeds, and the AI explains the failure">
          {/* frame: the canvas steps up to s1, a hairline ring, a faint top edge, and a soft drop into the dark */}
          <div inert className="relative h-[600px] overflow-hidden rounded-[16px] bg-[var(--s1)] shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.06),0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18)_30%,rgba(255,255,255,0.18)_60%,transparent)]" />
            <Trace intro={T.intro} t={t} step={step} />
            <div className="absolute right-[150px] top-[118px]"><AiPanel step={step} /></div>
          </div>
        </motion.section>
      </div>
    </MotionConfig>
  )
}
