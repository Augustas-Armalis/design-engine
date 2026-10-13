// Perch hero (fictional Mac utility; all content is sample). Apple-light page, one tilted MacBook display, the product in the notch.
// One timeline T: nav -> chip -> headline words -> subtitle -> CTAs -> display rises and settles its tilt -> shelf springs open
// -> clips arrive -> the screenshot is dragged into the document.
import { MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { siApple } from 'simple-icons'
import { Reveal, Word } from './kit'
import { STAGGER } from './motion'
import AppIcon from './AppIcon'
import Mac from './Mac'

const T = { nav: 0.1, chip: 0.22, h1: 0.32, mac: 1.05 }
const T_SUB = T.h1 + 5 * STAGGER + 0.05
const T_CTA = T_SUB + 0.12

function Apple({ s = 16 }: { s?: number }) { return <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden><path d={siApple.path} fill="currentColor" /></svg> }

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* G04 nav at rest: transparent, rail width; morphs to a capsule on scroll */}
        <header className="absolute inset-x-[64px] top-[18px] z-40 flex h-[52px] items-center">
          <Reveal at={T.nav} y={-10}><a href="#" className="flex items-center gap-2.5" aria-label="Perch home"><AppIcon size={30} /><span className="font-display text-[21px] font-[600] tracking-[-0.025em]">Perch</span></a></Reveal>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <Reveal at={T.nav + STAGGER} y={-10}>
              <ul className="flex items-center gap-1 text-[15px] font-[500] text-[#424245]">
                {['Features', 'How It Works', 'Pricing', 'Changelog'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 transition-colors duration-200 hover:bg-black/[0.045] hover:text-[var(--ink)]">{l}</a></li>)}
              </ul>
            </Reveal>
          </nav>
          <Reveal at={T.nav + 2 * STAGGER} y={-10} className="ml-auto flex items-center gap-2">
            <a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 text-[15px] font-[500] text-[#424245] transition-colors hover:bg-black/[0.045] hover:text-[var(--ink)]">Log in</a>
            <a href="#" className="key-ink flex h-9 items-center gap-1.5 rounded-[11px] px-3.5 text-[14px] font-[550]"><Apple s={14} />Download</a>
          </Reveal>
        </header>

        <main className="relative flex h-full flex-col items-center pt-[104px] text-center">
          <Reveal at={T.chip} y={10}>
            <a href="#" className="group flex h-8 items-center gap-2.5 rounded-full bg-white py-1 pl-1 pr-3.5 text-[13.5px] font-[500] text-[#424245] shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.04)]">
              <span className="rounded-full bg-[#1d1d1f] px-2 py-[3px] font-mono text-[11.5px] font-[500] text-white">v2.0</span>
              Screenshots now land in the notch
              <ArrowRight size={14} strokeWidth={2} className="text-[#86868b] transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
          <h1 className="font-display mt-5 text-[78px] font-[460] leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
            <Word i={0} start={T.h1}>Your</Word> <Word i={1} start={T.h1}>Notch,</Word><br />
            <Word i={2} start={T.h1}>Now</Word> <Word i={3} start={T.h1}>A</Word> <Word i={4} start={T.h1}>Shelf.</Word>
          </h1>
          <Reveal at={T_SUB} blur className="mt-5 max-w-[600px]">
            <p className="text-balance text-[19px] leading-[29px] text-[#5e5e63]">Everything you copy, screenshot or drag waits in a shelf under your MacBook's notch. Grab it, drop it anywhere.</p>
          </Reveal>
          <Reveal at={T_CTA} className="mt-7 flex items-center gap-6">
            <a href="#" className="key-ink flex h-[50px] items-center gap-2 rounded-[15px] pl-5 pr-6 text-[16px] font-[550]"><Apple s={17} />Download for Mac</a>
            <a href="#" className="link-arrow flex h-[50px] items-center gap-1.5 text-[16px] font-[500] text-[#424245] transition-colors">Watch the 40s tour<ArrowRight size={16} strokeWidth={2} /></a>
          </Reveal>
          <Reveal at={T_CTA + STAGGER} className="mt-3.5 text-[13px] text-[#6e6e73]">Free for 14 days · macOS 14 or later · Apple silicon and Intel</Reveal>

        {/* the display: ≥64px under the CTAs, bleeds off the fold */}
        <div role="img" aria-label="Perch's shelf open under a MacBook notch, a screenshot being dragged into a document (sample content)" className="absolute left-1/2 top-[532px] z-0 -translate-x-1/2 text-left">
          <div style={{ zoom: 0.8 }}><Mac at={T.mac} /></div>
        </div>
        </main>
      </div>
    </MotionConfig>
  )
}
