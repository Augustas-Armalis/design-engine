// Margin: AI code review homepage. Built from system/kits/product-hero (one T timeline, Kaching motion tokens).
import { useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { RiArrowDownSLine, RiGithubFill, RiQuillPenAiFill } from '@remixicon/react'
import { Frame, Reveal, Stage, Word } from './kit'
import { STAGGER, dur, ease, spring } from './motion'
import Review from './components/Review'
import { Bento, Breather, Chapter, Closing, Footer, Proof, Story } from './components/Sections'

const T = { nav: 0.12, h1: 0.3, dash: 0.8 }
const WORDS = 7
const T_SUB = T.h1 + WORDS * STAGGER + 0.05
const T_CTA = T_SUB + STAGGER * 1.5
const LINKS = ['Product', 'How it reviews', 'Pricing', 'Docs', 'Changelog']

function Nav() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <motion.header {...{ initial: { opacity: 0.01, y: -14 }, animate: { opacity: 1, y: 0 }, transition: { y: { delay: T.nav, duration: dur.reveal, ease: ease.reveal }, opacity: { delay: T.nav, duration: 0.6 } } }}
      className="absolute inset-x-[144px] top-5 z-40 flex h-14 items-center rounded-[16px] bg-white/85 pl-4 pr-2 shadow-[var(--shadow-ring)] backdrop-blur-md">
      <a href="#" className="flex items-center gap-2" aria-label="Margin home">
        <motion.span initial={{ rotate: -30, scale: 0.7 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: T.nav + 0.1, duration: 1.2, ease: ease.outExpo }} className="grid">
          <RiQuillPenAiFill size={24} />
        </motion.span>
        <span className="text-[21px] font-[600] tracking-[-0.03em]">Margin</span>
      </a>
      <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
        <ul className="flex items-center gap-0.5" onMouseLeave={() => setHover(null)}>
          {LINKS.map((l, i) => (
            <motion.li key={l} className="relative" initial={{ opacity: 0.01, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.nav + 0.08 + i * 0.04, duration: 0.7, ease: ease.outQuint }}>
              {hover === l && <motion.span layoutId="nav-hover" transition={spring} className="absolute inset-0 rounded-[10px] bg-weak" />}
              <a href="#" onMouseEnter={() => setHover(l)} onFocus={() => setHover(l)}
                className={`relative flex h-9 items-center gap-1 rounded-[10px] px-3.5 text-[14.5px] font-[500] tracking-[-0.01em] transition-colors duration-[220ms] ${hover === l ? 'text-ink' : 'text-sub'}`}>
                {l}{i === 0 && <RiArrowDownSLine size={16} className="text-soft" />}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="ml-auto flex items-center gap-1">
        <a href="#" className="flex h-10 items-center rounded-[12px] px-3.5 text-[14.5px] font-[500] text-sub transition-colors duration-[220ms] hover:text-ink">Sign in</a>
        <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-green flex h-10 items-center gap-1.5 rounded-[12px] px-4 text-[14.5px] font-[600]">
          <RiGithubFill size={16} />Install
        </motion.a>
      </div>
    </motion.header>
  )
}

function Hero() {
  return (
    <div className="relative h-[900px] overflow-hidden">
      {/* ruled paper inside the rails, fading out behind the headline and toward the fold */}
      <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1.6, ease: ease.outQuint }}
        className="ruled absolute bottom-0 left-[121px] top-0 w-[1199px] [mask-composite:intersect] [mask-image:radial-gradient(ellipse_42%_30%_at_50%_27%,rgba(0,0,0,0.2),#000_100%),linear-gradient(to_bottom,#000_60%,transparent)]" />
      <Nav />
      <div className="pointer-events-none relative z-20 flex flex-col items-center pt-[164px] text-center [&>*]:pointer-events-auto">
        <h1 className="text-[70px] font-[560] leading-[1.04] tracking-[-0.04em] text-ink">
          <Word i={0} start={T.h1}>Senior-Level</Word> <Word i={1} start={T.h1}>Review</Word><br />
          <Word i={2} start={T.h1}>On</Word> <Word i={3} start={T.h1}>Every</Word> <Word i={4} start={T.h1}>Pull</Word> <Word i={5} start={T.h1}>Request</Word>
        </h1>
        <Reveal at={T_SUB} y={20} blur className="mt-[18px]">
          <p className="text-[18px] leading-7 tracking-[-0.005em] text-sub">Margin reads every diff, flags what would break and hands you the fix to commit.</p>
        </Reveal>
        <Reveal at={T_CTA} y={20} className="mt-8 flex items-center gap-3">
          <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-green flex h-11 items-center gap-2 rounded-[14px] px-5 text-[15px] font-[600] tracking-[-0.01em]">
            <RiGithubFill size={18} />Install the GitHub app
          </motion.a>
          <motion.a whileTap={{ scale: 0.98 }} transition={{ duration: dur.micro, ease: ease.outQuint }} href="#" className="btn-white flex h-11 items-center rounded-[14px] px-5 text-[15px] font-[600] tracking-[-0.01em]">
            Book a demo
          </motion.a>
        </Reveal>
      </div>
      <Stage at={T.dash} className="absolute left-[152px] top-[478px] z-10 w-[1136px]">
        <Frame height={600}><Review start={T.dash} /></Frame>
      </Stage>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-14 bg-[linear-gradient(to_bottom,rgba(246,245,241,0),#f6f5f1)]" />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto w-[1440px]">
        {/* rails run the full page, behind everything */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[120, 1320].map((x) => (
            <motion.div key={x} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.8, ease: ease.outExpo }} className="absolute inset-y-0 w-px origin-top bg-rail" style={{ left: x }} />
          ))}
        </div>
        <main>
          <Hero />
          <Proof />
          <Chapter />
          <Bento />
          <Story />
          <Breather />
          <Closing />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
