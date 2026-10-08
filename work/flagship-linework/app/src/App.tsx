import { motion, useReducedMotion } from 'motion/react'
import { Logo } from './components/Logo'
import { MARKERS, Plan } from './components/Plan'

const enter = (i: number, reduce: boolean | null) =>
  reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15 + i * 0.08, duration: 0.42, ease: [0.16, 1, 0.3, 1] as const } }

function Arrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  return (
    <div className="min-h-screen bg-surface-canvas">
      <header className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Logo />
        <nav aria-label="Primary" className="flex items-center gap-1 text-[15px] font-medium text-text-strong">
          <ul className="hidden items-center gap-1 md:flex">
            {['How it measures', 'For studios', 'Pricing'].map((l) => (
              <li key={l}><a href="#" className="inline-flex min-h-11 items-center px-3 no-underline hover:text-accent-text">{l}</a></li>
            ))}
          </ul>
          <a href="#" className="ml-2 inline-flex min-h-11 items-center px-3 no-underline hover:text-accent-text">Sign in</a>
        </nav>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-16 lg:px-10">
        <section aria-labelledby="hero-title" className="relative border border-text-strong bg-surface-raised p-2 lg:p-7">
          {/* the drawing sheet: margin band with grid references between the trim line and the drawing border */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-7 top-1.5 hidden h-5 grid-cols-4 font-mono text-xs text-text-muted lg:grid">
            {['A', 'B', 'C', 'D'].map((c) => <span key={c} className="flex items-center justify-center">{c}</span>)}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-7 left-1.5 hidden w-5 grid-rows-3 font-mono text-xs text-text-muted lg:grid">
            {['1', '2', '3'].map((c) => <span key={c} className="flex items-center justify-center">{c}</span>)}
          </div>
          <div className="relative grid border border-text-strong lg:grid-cols-[minmax(0,1fr)_448px]">
            {/* title block (first in source and on mobile; right on desktop, as on a real sheet) */}
            <div className="order-1 flex flex-col border-b border-text-strong lg:order-2 lg:border-b-0 lg:border-l">
              <motion.div {...enter(0, reduce)} className="flex items-center justify-between border-b border-text-strong px-6 py-3 font-mono text-[13px] text-text-muted">
                <span>Drawing A-101 · Ground floor</span><span>Sample</span>
              </motion.div>

              <motion.div {...enter(1, reduce)} className="border-b border-text-strong px-6 pt-7 pb-8 lg:px-8">
                <h1 id="hero-title" className="font-display text-[clamp(48px,5.3vw,78px)] leading-[0.98] tracking-[-0.012em] text-text-strong text-balance">
                  Your sketch, measured.
                </h1>
                <p className="mt-5 max-w-[38ch] text-[17px] leading-[1.6] text-text-muted">
                  Photograph a floor plan you drew by hand. Linework straightens the walls, reads your notes and returns a measured plan your builder can work from.
                </p>
              </motion.div>

              <motion.dl {...enter(2, reduce)} className="grid grid-cols-2 border-b border-text-strong">
                {[
                  ['Scale', '1:50'], ['Area', '84.2 m²'],
                  ['Drawn', 'Photo · 14:02'], ['Measured', 'Linework · 14:03'],
                ].map(([k, v], i) => (
                  <div key={k} className={`px-6 py-3 lg:px-8 ${i % 2 === 0 ? 'border-r border-text-strong' : ''} ${i < 2 ? 'border-b border-border-hairline' : ''}`}>
                    <dt className="text-[13px] text-text-muted">{k}</dt>
                    <dd className="num mt-0.5 font-mono text-[15px] text-text-strong">{v}</dd>
                  </div>
                ))}
              </motion.dl>

              <motion.div {...enter(3, reduce)} className="px-6 py-7 lg:flex-1 lg:px-8">
                <a href="#upload" className="group flex h-[72px] w-full items-center justify-between bg-accent-solid px-6 text-[19px] font-semibold text-text-on-accent no-underline transition-colors duration-200 hover:bg-accent-solid-hover">
                  Upload a sketch <Arrow />
                </a>
                <p className="mt-4 text-[15px] leading-[1.5] text-text-muted">
                  First three plans free. Exports DWG, PDF and IFC.{' '}
                  <a href="#sample" className="font-medium text-text-strong underline decoration-1 underline-offset-4 hover:text-accent-text">See a sample project</a>
                </p>
              </motion.div>
              <div className="flex items-center justify-between gap-4 border-t border-text-strong px-6 py-3 font-mono text-[12px] leading-[1.5] text-text-muted lg:px-8">
                <span>Fictional product, sample data</span><span className="shrink-0">Sheet 1 of 1</span>
              </div>
            </div>

            {/* the plan */}
            <div className="order-2 px-5 pt-6 pb-7 lg:order-1 lg:px-8 lg:pt-6">
              <Plan />
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {MARKERS.map((m, i) => (
                  <motion.li key={m.n} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 2.3 + i * 0.1, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3 text-[15px] leading-[1.45] text-pretty text-text-body">
                    <span aria-hidden="true" className="num flex size-6 shrink-0 items-center justify-center bg-surface-inverse font-mono text-[13px] text-text-inverse">{m.n}</span>
                    <span>{m.note}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>
              </main>
    </div>
  )
}
