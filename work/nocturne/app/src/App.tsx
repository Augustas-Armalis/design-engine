// Nocturne: AI agents that work the backlog overnight. Dark hero; dawn rises behind the product as last night's run replays.
import { useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { RiArrowRightSLine, RiMoonClearFill } from '@remixicon/react'
import { Reveal, Stage, Word } from './kit'
import { STAGGER, dur, ease, spring } from './motion'
import Dawn from './components/Dawn'
import Board from './components/Board'

const T = { nav: 0.15, h1: 0.3, dash: 0.85 }
const T_SUB = T.h1 + 6 * STAGGER + 0.05
const T_CTA = T_SUB + STAGGER * 1.5
const LINKS = ['Product', 'How it works', 'Security', 'Pricing', 'Docs']
const FRAME_TOP = 500

function Nav() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <header className="absolute inset-x-[120px] top-6 z-40 flex h-11 items-center">
      <Reveal at={T.nav} y={-10}>
        <a href="#" className="flex items-center gap-2" aria-label="Nocturne home">
          <RiMoonClearFill size={22} className="text-[#f5b26b]" /><span className="text-[20px] font-[600] tracking-[-0.03em]">Nocturne</span>
        </a>
      </Reveal>
      <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
        <Reveal at={T.nav + STAGGER} y={-10}>
          <ul onMouseLeave={() => setHover(null)} className="flex h-11 items-center gap-0.5 rounded-[14px] bg-white/[0.04] p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-md">
            {LINKS.map((l) => (
              <li key={l} className="relative">
                {hover === l && <motion.span layoutId="nav-pill" transition={spring} className="absolute inset-0 rounded-[10px] bg-white/[0.08]" />}
                <a href="#" onMouseEnter={() => setHover(l)} onFocus={() => setHover(l)}
                  className={`relative flex h-9 items-center rounded-[10px] px-3.5 text-[14px] font-[500] transition-colors duration-[220ms] ${hover === l ? 'text-white' : 'text-white/65'}`}>{l}</a>
              </li>
            ))}
          </ul>
        </Reveal>
      </nav>
      <Reveal at={T.nav + 2 * STAGGER} y={-10} className="ml-auto flex items-center gap-1">
        <a href="#" className="flex h-10 items-center rounded-[12px] px-3.5 text-[14px] font-[500] text-white/70 transition-colors duration-[220ms] hover:text-white">Sign in</a>
        <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-light flex h-10 items-center rounded-[12px] px-4 text-[14px] font-[600]">Start free</motion.a>
      </Reveal>
    </header>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative mx-auto h-[900px] w-[1440px] overflow-hidden">
        <div className="absolute inset-0"><Dawn horizon={1 - (FRAME_TOP - 26) / 900} delay={T.dash + 0.3} /></div>
        <Nav />
        <div className="pointer-events-none relative z-20 flex flex-col items-center pt-[150px] text-center [&>*]:pointer-events-auto">
          <h1 className="text-[72px] font-[560] leading-[1.04] tracking-[-0.045em]">
            <span className="headline"><Word i={0} start={T.h1}>Wake</Word> <Word i={1} start={T.h1}>Up</Word> <Word i={2} start={T.h1}>To</Word> <Word i={3} start={T.h1}>A</Word></span><br />
            <span className="headline"><Word i={4} start={T.h1}>Finished</Word> <Word i={5} start={T.h1}>Backlog</Word></span>
          </h1>
          <Reveal at={T_SUB} y={20} blur className="mt-5">
            <p className="text-[18px] leading-7 text-white/60">Agents work your tickets overnight and leave tested pull requests by morning.</p>
          </Reveal>
          <Reveal at={T_CTA} y={20} className="mt-8 flex items-center gap-5">
            <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-light group flex h-11 items-center gap-1 rounded-[14px] pl-5 pr-4 text-[15px] font-[600]">
              Start free tonight<RiArrowRightSLine size={18} className="text-[#0b0d13]/60 transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.a>
            <a href="#" className="-my-2 py-2 text-[15px] font-[500] text-white/75 transition-colors duration-200 hover:text-white">See last night's run</a>
          </Reveal>
        </div>
        <div className="absolute left-[152px] z-10 w-[1136px]" style={{ top: FRAME_TOP }}>
          <Stage at={T.dash}>
            <div className="relative rounded-[22px] bg-white/[0.035] p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09),0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              {/* the dawn catches the frame's top edge */}
              <motion.span aria-hidden className="absolute inset-x-16 -top-px h-px bg-[linear-gradient(90deg,transparent,rgba(255,196,140,0.9),transparent)]"
                initial={{ opacity: 0, scaleX: 0.3 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: T.dash + 1.2, duration: 1.6, ease: ease.outExpo }} />
              <div className="h-[560px] overflow-hidden rounded-[16px] bg-[#0b0d13] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"><Board start={T.dash} /></div>
            </div>
          </Stage>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 bg-[linear-gradient(to_bottom,rgba(5,6,10,0),#05060a)]" />
      </main>
    </MotionConfig>
  )
}
