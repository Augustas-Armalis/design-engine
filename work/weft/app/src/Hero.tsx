// Weft hero (1440x900): Kestrel-clean centred copy over a halftone stage that holds the real product, a live
// workflow run paused on a human approval (sample data).
import { motion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import Halftone from './Halftone'
import { ease, Logo, Window } from './flow'

const T = { nav: 0.1, h1: 0.2, sub: 0.45, cta: 0.55, stage: 0.5, win: 0.7, canvas: 1.0 }
const Up = ({ at, y = 14, children, className = '' }: { at: number; y?: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 1.1, ease: ease.out, opacity: { delay: at, duration: 0.6 } }}>{children}</motion.div>
)
const SW = 1392, SH = 476
const BLOBS = [{ x: 40, y: 10, r: 560, k: 1.15 }, { x: SW - 20, y: SH + 40, r: 640, k: 1.15 }, { x: SW - 120, y: -40, r: 300, k: 0.55 }]

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <header className="absolute inset-x-16 top-0 z-20 flex h-[76px] items-center">
          <Up at={T.nav} y={0}><a href="#" className="flex items-center gap-2.5 text-[19px] font-[600] tracking-[-0.03em]"><Logo size={26} />Weft</a></Up>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <Up at={T.nav + 0.05} y={0}>
              <ul className="flex items-center gap-1 text-[14px] font-[500] text-[var(--sub)]">
                {['Product', 'Templates', 'Integrations', 'Pricing', 'Docs'].map((l) => <li key={l}><a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 transition-colors hover:bg-[rgb(15_16_19/0.05)] hover:text-[var(--ink)]">{l}</a></li>)}
              </ul>
            </Up>
          </nav>
          <Up at={T.nav + 0.1} y={0} className="ml-auto flex items-center gap-2">
            <a href="#" className="flex h-9 items-center rounded-[10px] px-3.5 text-[14px] font-[500] text-[var(--sub)] hover:text-[var(--ink)]">Sign in</a>
            <a href="#" className="btn-ink press flex h-9 items-center rounded-[10px] px-3.5 text-[14px] font-[550]">Start building</a>
          </Up>
        </header>

        <main className="absolute inset-x-0 top-[128px] flex flex-col items-center text-center">
          <h1 className="text-[58px] font-[560] leading-[1.02] tracking-[-0.045em]">
            <Up at={T.h1} y={22}>Workflows That</Up>
            <Up at={T.h1 + 0.08} y={22}>Think First</Up>
          </h1>
          <Up at={T.sub} className="mt-5"><p className="text-[18px] leading-[28px] tracking-[-0.01em] text-[var(--sub)]">Weft runs your support, billing and ops workflows with AI steps that read<br />the context, ask a person when it matters, and only then act.</p></Up>
          <Up at={T.cta} className="mt-8 flex items-center gap-3 text-[15px]">
            <a href="#" className="btn-ink press flex h-[46px] items-center rounded-[12px] px-5 font-[550]">Start building free</a>
            <a href="#" className="btn-white press flex h-[46px] items-center rounded-[12px] px-5 font-[550]">Watch a live run</a>
          </Up>
        </main>

        {/* halftone stage, bleeding off the bottom, with the product inside */}
        <motion.div className="absolute left-6 top-[452px] overflow-hidden rounded-[28px]" style={{ width: SW, height: SH }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.stage, duration: 1.0 }}>
          <Halftone w={SW} h={SH} cell={7} blobs={BLOBS} />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_0_1px_rgb(15_16_19/0.05)]" />
        </motion.div>
        <motion.div role="img" aria-label="Weft workflow editor: a refund run paused on an approval (sample data)" className="absolute left-[72px] top-[490px] h-[540px] w-[1296px]"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.win, duration: 1.3, ease: ease.out, opacity: { delay: T.win, duration: 0.5 } }}>
          <Window at={T.canvas} />
        </motion.div>
      </div>
    </MotionConfig>
  )
}
