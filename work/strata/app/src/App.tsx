// Strata: AI workflow automation. Image-led, framed page, left-aligned editorial hero, mono operator voice.
// Built from system/kits/product-hero (one T timeline, Kaching motion tokens); brand world = generative engraving.
import { useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { RiArrowRightLine, RiStackFill } from '@remixicon/react'
import { Reveal, Stage, Word } from './kit'
import { STAGGER, dur, ease } from './motion'
import Engraving from './components/Engraving'
import Flow from './components/Flow'
import { Closing, Footer, RunLog, Tools, UseCases } from './components/Sections'

const T = { nav: 0.3, h1: 0.45, dash: 1.0 }
const T_SUB = T.h1 + 7 * STAGGER + 0.05
const T_CTA = T_SUB + STAGGER * 1.5
const LINKS = ['Product', 'Use cases', 'Templates', 'Pricing', 'Docs']

function Nav() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <header className="absolute inset-x-10 top-6 z-40 flex h-11 items-center">
      <Reveal at={T.nav} y={-10}>
        <a href="#" className="flex items-center gap-2" aria-label="Strata home"><RiStackFill size={22} /><span className="text-[21px] font-[600] tracking-[-0.025em]">Strata</span></a>
      </Reveal>
      <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
        <ul className="flex items-center gap-1" onMouseLeave={() => setHover(null)}>
          {LINKS.map((l, i) => (
            <motion.li key={l} className="relative" initial={{ opacity: 0.01, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.nav + 0.06 + i * 0.04, duration: 0.7, ease: ease.outQuint }}>
              <a href="#" onMouseEnter={() => setHover(l)} onFocus={() => setHover(l)} className="mono-ui relative flex h-10 items-center px-3.5 text-[12.5px] text-ink">
                {l}
                {hover === l && <motion.span layoutId="nav-rule" transition={{ type: 'spring', stiffness: 420, damping: 36 }} className="absolute inset-x-3.5 bottom-2 h-[1.5px] bg-ink" />}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <Reveal at={T.nav + 0.2} y={-10} className="ml-auto flex items-center gap-2">
        <a href="#" className="btn-paper mono-ui flex h-10 items-center px-4 text-[12px]">Log in</a>
        <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-ink mono-ui flex h-10 items-center px-4 text-[12px]">Start building</motion.a>
      </Reveal>
    </header>
  )
}

function Hero() {
  return (
    <div className="relative h-[886px] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[640px]"><Engraving hero delay={0} /></div>
      <div aria-hidden className="absolute inset-x-0 top-[540px] h-[100px] bg-[linear-gradient(to_bottom,rgba(251,250,248,0),#fbfaf8)]" />
      <Nav />
      <div className="pointer-events-none relative z-20 pl-14 pt-[150px] [&>*]:pointer-events-auto">
        <h1 className="text-[66px] font-[500] leading-[1.03] tracking-[-0.035em] text-ink">
          <Word i={0} start={T.h1}>Automations</Word> <Word i={1} start={T.h1}>Your</Word> <Word i={2} start={T.h1}>Whole</Word><br />
          <Word i={3} start={T.h1}>Team</Word> <Word i={4} start={T.h1}>Can</Word> <Word i={5} start={T.h1}>Actually</Word> <Word i={6} start={T.h1}>Read</Word>
        </h1>
        <Reveal at={T_SUB} y={20} blur className="mt-5 max-w-[520px]">
          <p className="text-[18px] leading-[28px] text-sub">Strata turns the busywork between your tools into flows<br />anyone can follow, check and change.</p>
        </Reveal>
        <Reveal at={T_CTA} y={20} className="mt-8 flex items-center gap-6">
          <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-ink mono-ui group flex h-12 items-center gap-2.5 px-5 text-[13px]">
            Start building<RiArrowRightLine size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.a>
          <a href="#" className="mono-ui -my-2 inline-block py-2 text-[13px] text-ink underline decoration-[#0f1729]/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-[#0f1729]">See a flow run</a>
        </Reveal>
      </div>
      <Stage at={T.dash} className="absolute inset-x-10 top-[452px] z-10">
        <div className="h-[600px] overflow-hidden rounded-[10px] bg-white shadow-[var(--shadow-frame)]"><Flow start={T.dash} /></div>
      </Stage>
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-[1440px] p-[14px]">
        <div className="overflow-hidden rounded-[20px] bg-sheet shadow-[0_0_0_1px_rgba(15,23,41,0.06),0_30px_60px_-30px_rgba(15,23,41,0.25)]">
          <main>
            <Hero />
            <Tools />
            <UseCases />
            <RunLog />
            <Closing />
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}
