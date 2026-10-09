// Quire hero (Press system, light, warm paper). Layout: editorial centred-wordmark nav over a hairline rule, centred
// Instrument Serif headline with one italic ink word, and the product as an annotated document: an answer types onto a
// white sheet and its citations pull source cards into the margins with hairline leaders.
import { MotionConfig } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Reveal } from './kit'
import Sheet from './Sheet'

const T = { nav: 0.05, copy: 0.12, sheet: 0.95, type: 2.0 }
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>")`

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-multiply" style={{ backgroundImage: GRAIN }} />

        {/* nav G12: links left, serif wordmark dead centre, actions right, hairline rule under */}
        <Reveal at={T.nav} y={-6} className="absolute inset-x-0 top-0 z-40">
          <header className="relative mx-20 flex h-[76px] items-center border-b border-[var(--line)]">
            <nav aria-label="Main"><ul className="-ml-3 flex">
              {['Product', 'Research', 'Pricing'].map((l) => <li key={l}><a href="#" className="flex h-10 items-center px-3 text-[15px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">{l}</a></li>)}
            </ul></nav>
            <a href="#" aria-label="Quire home" className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-display)] text-[34px] leading-none tracking-[-0.01em]">Quire</a>
            <a href="#" className="ml-auto flex h-10 items-center px-3 text-[15px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">Sign in</a>
            <a href="#" className="btn-ink-rect press ml-2 flex h-10 items-center rounded-[3px] px-4 text-[15px] font-[500]">Try Quire free</a>
          </header>
        </Reveal>

        <main className="pointer-events-none absolute inset-x-0 top-[122px] z-20 flex flex-col items-center text-center [&>*]:pointer-events-auto">
          <Reveal at={T.copy} y={14} blur>
            <h1 className="font-[family-name:var(--font-display)] text-[92px] font-[400] leading-[0.98] tracking-[-0.015em]">Research That <em className="text-[var(--blue)]">Cites</em><br />Its Own Sources</h1>
          </Reveal>
          <Reveal at={T.copy + 0.08} y={14} blur>
            <p className="mt-6 text-[18px] leading-[28px] text-[var(--sub)]">Ask a hard question. Quire reads the filings, papers and call transcripts,<br />then writes an answer where every claim links to its source.</p>
          </Reveal>
          <Reveal at={T.copy + 0.16} y={14}>
            <div className="mt-8 flex items-center gap-7">
              <a href="#" className="btn-ink-rect press flex h-11 items-center rounded-[3px] px-5 text-[16px] font-[500]">Try Quire free</a>
              <a href="#" className="btn-editorial flex items-center gap-1 text-[16px]">Read a sample report<ArrowUpRight size={14} /></a>
            </div>
          </Reveal>
        </main>

        <div className="absolute left-0 top-[524px] z-10" role="img" aria-label="Quire answer with sample data: three claims, each cited, with source cards in the margins">
          <div inert><Sheet intro={T.sheet} typeAt={T.type} /></div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[90px] bg-[linear-gradient(to_bottom,transparent,var(--canvas))]" />
      </div>
    </MotionConfig>
  )
}
