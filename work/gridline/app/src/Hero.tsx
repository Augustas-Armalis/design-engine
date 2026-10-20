// Gridline hero (1440x900), Kestrel floor (accepted): centred Title Case headline, 2-line subtitle, 44px ink + white
// buttons, the real product in a double-bezel frame 72px under the CTAs. Signature visual: the live Europe grid map
// inside the product (GridMap). AlignUI/affectUI material: hairline rings, one control shadow, soft radii 8/12/16/24.
// Fictional company and sample grid data.
import { motion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { RiArrowRightUpLine, RiArrowRightSLine } from '@remixicon/react'
import Product from './Product'

const E = [0.16, 1, 0.3, 1] as const
const T = { nav: 0.05, h1: 0.12, sub: 0.3, cta: 0.4, frame: 0.5, map: 0.9 }
const Up = ({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 0.9, ease: E }}>{children}</motion.div>
)
const ink = '#171717', sub = '#5c5c5c', line = '#ececec'
const ctl = `0 0 0 1px ${line}, 0 1px 2px rgb(0 0 0 / 0.045)`

function Logo() {
  return (
    <span className="flex items-center gap-2 text-[20px] font-[600] tracking-[-0.03em]" style={{ color: ink }}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><rect x="1" y="1" width="22" height="22" rx="7" fill="#171717" /><path d="M6 12h3l2-4 2.5 8 2-4H18" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Gridline
    </span>
  )
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden" style={{ background: '#f7f7f7', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: ink }}>
        {/* quiet structure: a fine dot grid between the rails, faded behind the copy */}
        <div aria-hidden className="absolute inset-y-0 left-[120px] right-[120px]" style={{ backgroundImage: 'radial-gradient(rgb(0 0 0 / 0.16) 1.1px, transparent 1.5px)', backgroundSize: '22px 22px', maskImage: 'radial-gradient(46% 34% at 50% 30%, rgb(0 0 0 / 0.15) 40%, #000 100%)' }} />
        {[120, 1320].map((x) => <div key={x} aria-hidden className="absolute inset-y-0 w-px" style={{ left: x, background: 'rgb(0 0 0 / 0.06)' }} />)}

        <header className="absolute inset-x-[144px] top-0 z-20 flex h-[72px] items-center">
          <Up at={T.nav}><a href="#" aria-label="Gridline home"><Logo /></a></Up>
          <Up at={T.nav + 0.04} className="absolute left-1/2 -translate-x-1/2">
            <nav aria-label="Main"><ul className="flex h-11 items-center gap-0.5 rounded-[14px] bg-white p-1 text-[14px] font-[500]" style={{ boxShadow: ctl, color: sub }}>
              {['Platform', 'Flexibility', 'Forecasts', 'Customers', 'Pricing'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 hover:bg-[#f5f5f5] hover:text-[#171717]">{l}</a></li>)}
            </ul></nav>
          </Up>
          <Up at={T.nav + 0.08} className="ml-auto flex items-center gap-2 text-[14px] font-[500]">
            <a href="#" className="flex h-10 items-center rounded-[12px] px-3.5" style={{ color: sub }}>Sign in</a>
            <a href="#" className="btn-ink press flex h-10 items-center rounded-[12px] px-4">Book a demo</a>
          </Up>
        </header>

        <main className="absolute inset-x-0 top-[136px] z-10 flex flex-col items-center text-center">
          <h1 className="text-[58px] font-[550] leading-[1.04] tracking-[-0.045em]">
            <Up at={T.h1}>See Every Megawatt</Up>
            <Up at={T.h1 + 0.07}>Before It Moves</Up>
          </h1>
          <Up at={T.sub} className="mt-[18px]"><p className="text-[18px] leading-[28px] tracking-[-0.01em]" style={{ color: sub }}>Gridline watches every cross-border line in Europe and tells<br />your control room which flow to move before it hits the limit.</p></Up>
          <Up at={T.cta} className="mt-8 flex items-center gap-3 text-[15px] font-[500]">
            <a href="#" className="btn-ink press flex h-11 items-center gap-1.5 rounded-[14px] px-5">Book a demo<RiArrowRightUpLine size={16} /></a>
            <a href="#" className="btn-white press flex h-11 items-center gap-1 rounded-[14px] px-5">See a live grid<RiArrowRightSLine size={16} /></a>
          </Up>
        </main>

        <motion.div data-product role="img" aria-label="Gridline dashboard: live cross-border flows across Europe with one line at its limit (sample data)"
          className="absolute left-[130px] top-[472px] z-10 rounded-[24px] p-[8px]" style={{ background: 'linear-gradient(180deg, #fff, rgb(255 255 255 / 0.6))', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.05), 0 24px 56px -24px rgb(0 0 0 / 0.16)' }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.frame, duration: 1.2, ease: E, opacity: { delay: T.frame, duration: 0.5 } }}>
          <Product />
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120px]" style={{ background: 'linear-gradient(180deg, transparent, #f7f7f7)' }} />
      </div>
    </MotionConfig>
  )
}
