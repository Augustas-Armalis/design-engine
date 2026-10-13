// Perch hero (fictional Mac utility; all content is sample). Variants for the founder to choose from:
//   ?layout=centre | split | stage      ?font=rubik | bricolage | figtree | funnel | onest
// One timeline T: nav -> headline words -> subtitle -> CTAs -> display rises flat -> shelf springs open -> drag -> drop.
import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { siApple } from 'simple-icons'
import { Reveal, Word } from './kit'
import { STAGGER } from './motion'
import StarIcon from './Star'
import Mac from './Mac'

const q = new URLSearchParams(location.search)
const LAYOUT = (['centre', 'split', 'stage'] as const).find((l) => l === q.get('layout')) ?? 'centre'
const FONT = (['rubik', 'bricolage', 'figtree', 'funnel', 'onest'] as const).find((f) => f === q.get('font')) ?? 'rubik'
const T = { nav: 0.1, h1: 0.24, mac: 0.95 }
const T_SUB = T.h1 + 5 * STAGGER + 0.05
const T_CTA = T_SUB + 0.12

function Apple({ s = 16 }: { s?: number }) { return <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden><path d={siApple.path} fill="currentColor" /></svg> }

function Nav() {
  return (
    <header className="absolute inset-x-[64px] top-[18px] z-40 flex h-[52px] items-center">
      <Reveal at={T.nav} y={-10}><a href="#" className="flex h-10 items-center gap-2.5" aria-label="Perch home"><StarIcon size={30} /><span className="font-display text-[21px] leading-none" style={{ letterSpacing: '-0.025em' }}>Perch</span></a></Reveal>
      <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
        <Reveal at={T.nav + STAGGER} y={-10}>
          <ul className="flex items-center gap-1 text-[15px] font-[500] text-[#424245]">
            {['Features', 'How It Works', 'Pricing', 'Changelog'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 transition-colors duration-200 hover:bg-black/[0.05] hover:text-[var(--ink)]">{l}</a></li>)}
          </ul>
        </Reveal>
      </nav>
      <Reveal at={T.nav + 2 * STAGGER} y={-10} className="ml-auto flex items-center gap-2">
        <a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 text-[15px] font-[500] text-[#424245] transition-colors hover:bg-black/[0.05] hover:text-[var(--ink)]">Log in</a>
        <a href="#" className="key-ink flex h-9 items-center gap-1.5 rounded-[11px] px-3.5 text-[14px] font-[550]"><Apple s={14} />Download</a>
      </Reveal>
    </header>
  )
}

function Headline({ size, align = 'center', oneLine }: { size: number; align?: 'center' | 'left'; oneLine?: boolean }) {
  return (
    <h1 className={`font-display leading-[0.98] text-[var(--ink)] ${align === 'left' ? 'text-left' : 'text-center'}`} style={{ fontSize: size }}>
      <Word i={0} start={T.h1}>Your</Word> <Word i={1} start={T.h1}>Notch,</Word>{oneLine ? ' ' : <br />}
      <Word i={2} start={T.h1}>Now</Word> <Word i={3} start={T.h1}>A</Word> <Word i={4} start={T.h1}>Shelf.</Word>
    </h1>
  )
}

/* two lines, set by hand so each line is a phrase (founder: max two lines, clean break) */
function Sub({ align = 'center', className = '' }: { align?: 'center' | 'left'; className?: string }) {
  return (
    <Reveal at={T_SUB} blur className={className}>
      <p className={`text-[19px] leading-[29px] text-[var(--sub)] ${align === 'left' ? 'text-left' : 'text-center'}`}>Everything you copy, screenshot or drag<br />waits under your notch. Drop it anywhere.</p>
    </Reveal>
  )
}

function Ctas({ className = '' }: { className?: string }) {
  return (
    <>
      <Reveal at={T_CTA} className={`flex items-center gap-6 ${className}`}>
        <a href="#" className="key-ink flex h-[50px] items-center gap-2 rounded-[15px] pl-5 pr-6 text-[16px] font-[550]"><Apple s={17} />Download for Mac</a>
        <a href="#" className="link-arrow flex h-[50px] items-center gap-1.5 text-[16px] font-[500] text-[#424245] transition-colors">Watch the 40s tour<ArrowRight size={16} strokeWidth={2} /></a>
      </Reveal>
    </>
  )
}
const Note = ({ className = '' }: { className?: string }) => <Reveal at={T_CTA + STAGGER} className={`text-[13px] text-[#6e6e73] ${className}`}>Free for 14 days · macOS 14 or later · Apple silicon and Intel</Reveal>

function Display({ style, zoom, children }: { style: React.CSSProperties; zoom: number; children?: ReactNode }) {
  return (
    <div role="img" aria-label="Perch's shelf open under a MacBook notch, a screenshot being dragged into a document (sample content)" className="absolute z-0 text-left" style={style}>
      <div style={{ zoom }}><Mac at={T.mac} /></div>{children}
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div data-font={FONT} className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <Nav />
        {LAYOUT === 'centre' && (
          <main className="relative flex h-full flex-col items-center pt-[132px]">
            <Headline size={80} />
            <Sub className="mt-6" />
            <Ctas className="mt-8" />
            <Note className="mt-3.5" />
            <Display zoom={0.8} style={{ left: '50%', top: 536, transform: 'translateX(-50%)' }} />
          </main>
        )}
        {LAYOUT === 'split' && (
          <main className="relative h-full">
            <div className="absolute left-[96px] top-[236px] w-[520px]">
              <Headline size={78} align="left" />
              <Sub align="left" className="mt-6" />
              <Ctas className="mt-9" />
              <Note className="mt-4" />
            </div>
            <Display zoom={0.82} style={{ left: 660, top: 150 }} />
          </main>
        )}
        {LAYOUT === 'stage' && (
          <main className="relative flex h-full flex-col items-center pt-[124px]">
            <Headline size={64} oneLine />
            <Sub className="mt-5" />
            <Ctas className="mt-7" />
            <Display zoom={0.94} style={{ left: '50%', top: 452, transform: 'translateX(-50%)' }} />
          </main>
        )}
      </div>
    </MotionConfig>
  )
}
