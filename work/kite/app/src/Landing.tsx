// Kite landing page (fictional edge network; every product screen is the real dashboard build, sample data).
// Hero: Title Case 2-line headline, hand-set 2-line subtitle, bevelled white pill + tactile secondary, the live
// dashboard straight-on in a 3-edge frame (ring, top light, deep drop) that plays its own load-in. Then a bento of the
// product's real pieces, how it works, a closing CTA over the dot world, footer.
import { useEffect, useState, type ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import App from './App'
import Wordmark from './Wordmark'
import { ease } from './anim'

const Word = ({ children, i }: { children: ReactNode; i: number }) => (
  <motion.span className="inline-block" initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.15 + i * 0.07, duration: 1.1, ease: ease.out }}>{children}</motion.span>
)
const Up = ({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 1.0, ease: ease.out }}>{children}</motion.div>
)
/* Replicates Linear's hero grammar (knowledge/benchmarks/dark/linear-fold-1440x900@2x.png, linear.measure.json):
   73px nav with a full-width 8% hairline, 1280 container, left-aligned 64/64 Inter 510 -1.4px #f7f8f8 headline,
   one muted subtitle line with a quiet "New" link on the right, no hero buttons, the product nearly full-width in a
   #0f1011 frame with an 8% hairline, bleeding off the fold. */
export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), 600); return () => clearTimeout(id) }, [])
  const inter = { fontFamily: '"Inter Variable", system-ui, sans-serif' }
  const FW = 1312, ZOOM = (FW - 2) / 1440
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden" style={{ background: '#08090a', ...inter }}>
        <header className="absolute inset-x-0 top-0 z-30 h-[73px] border-b border-[rgb(255_255_255/0.08)]">
          <div className="mx-auto flex h-full w-[1280px] items-center">
            <a href="#" className="flex h-10 items-center"><Wordmark size={22} /></a>
            <nav aria-label="Main" className="ml-auto flex items-center">
              <ul className="flex items-center gap-[10px] text-[14px] text-[#8a8f98]">{['Product', 'Regions', 'Pricing', 'Docs', 'Changelog'].map((l) => <li key={l}><a href="#" className="st flex h-8 items-center px-2 hover:text-[#f7f8f8]">{l}</a></li>)}</ul>
              <span aria-hidden className="mx-4 h-4 w-px bg-[rgb(255_255_255/0.12)]" />
              <a href="#" className="st flex h-8 items-center px-2 text-[14px] text-[#8a8f98] hover:text-[#f7f8f8]">Log in</a>
              <a href="#" className="st ml-2 flex h-8 items-center rounded-full bg-[#e5e5e6] px-3.5 text-[14px] font-[510] text-[#08090a] hover:bg-white">Start deploying</a>
            </nav>
          </div>
        </header>

        <section className="relative mx-auto w-[1280px] pt-[277px]">
          <h1 className="text-[64px] font-[510] leading-[64px] tracking-[-1.4px] text-[#f7f8f8]">
            <Word i={0}>Ship</Word> <Word i={1}>To</Word> <Word i={2}>Every</Word> <Word i={3}>Region.</Word><br />
            <Word i={4}>Know</Word> <Word i={5}>Which</Word> <Word i={6}>One</Word> <Word i={7}>Needs</Word> <Word i={8}>You.</Word>
          </h1>
          <Up at={0.55} className="mt-[40px] flex items-baseline justify-between">
            <p className="text-[17px] leading-[26px] text-[#8a8f98]">Ten edge regions, live latency and one-click reroutes. Built for teams that deploy every day.</p>
            <a href="#" className="st group flex items-baseline gap-2 text-[15px]"><span className="text-[#f7f8f8]">New</span><span className="text-[#8a8f98] group-hover:text-[#f7f8f8]">One-click reroute</span><ArrowRight size={14} className="self-center text-[#8a8f98]" /></a>
          </Up>
        </section>

        <motion.div className="absolute left-1/2 top-[530px] -translate-x-1/2 overflow-hidden rounded-[12px] border border-[rgb(255_255_255/0.08)] bg-[#0f1011]" style={{ width: FW }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1.3, ease: ease.out }}>
          <div role="img" aria-label="The Kite dashboard: traffic by region, latency and deployments, sample data" inert style={{ height: 900 * ZOOM }}>
            <div style={{ zoom: ZOOM }}>{dash ? <App embedded /> : <div className="h-[900px] w-[1440px] bg-[var(--canvas)]" />}</div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
