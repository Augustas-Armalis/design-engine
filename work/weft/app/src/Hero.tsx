// Weft hero (1440x900), Basit grammar (knowledge/web/basit-craft.md, Lowpro pattern): a rendered glass field out of
// focus at both edges, a misty centre for a big two-tone sentence-case headline at -0.05em, black + frosted pills,
// and the real product cropped by the fold and dissolving into white (sample data).
import { motion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import Field from './Field'
import { ease, Logo, Window } from './flow'

const T = { field: 0, nav: 0.1, l1: 0.2, l2: 0.35, sub: 0.6, cta: 0.75, win: 0.85, canvas: 1.2 }
const spring = { type: 'spring', duration: 1.2, bounce: 0 } as const
const Up = ({ at, y = 40, children, className = '' }: { at: number; y?: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: at, ...spring, opacity: { delay: at, duration: 0.6 }, filter: { delay: at, duration: 0.7 } }}>{children}</motion.div>
)
const GLASS = ['#6f5bff', '#ff6fae', '#4cb3ff', '#ffb36b']

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[#eef0f4]">
        {/* the light: two glass clusters out of focus, left and right, settling from scale 1.15 (Basit: the field arrives last) */}
        <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: T.field, duration: 1.8, ease: ease.out, opacity: { duration: 1.0 } }}>
          <div className="absolute -left-[220px] -top-[120px] h-[1100px] w-[860px]" style={{ maskImage: 'linear-gradient(90deg, #000 45%, transparent 92%)' }}><Field w={860} h={1100} colors={GLASS} blur={6} scale={1.15} rotation={100} density={1.5} frame={2400} /></div>
          <div className="absolute -right-[220px] -top-[80px] h-[1100px] w-[860px]" style={{ maskImage: 'linear-gradient(270deg, #000 45%, transparent 92%)' }}><Field w={860} h={1100} colors={['#4cb3ff', '#8a6cff', '#ff6fae', '#ffc46b']} blur={7} scale={1.15} rotation={124} density={1.5} frame={5200} /></div>
        </motion.div>
        {/* mist: keeps the reading zone calm and lets the fold fall to white */}
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(42% 46% at 50% 40%, rgb(238 240 244 / 0.92) 30%, rgb(238 240 244 / 0) 100%), linear-gradient(180deg, transparent 62%, #f6f7f9 88%)' }} />

        {/* three-pill nav: black logo, black link capsule, white CTA */}
        <header className="absolute inset-x-0 top-[22px] z-20 flex justify-center gap-2.5">
          <Up at={T.nav} y={-30}><a href="#" className="flex h-[46px] items-center gap-2 rounded-full bg-[#0c0d10] pl-2 pr-4 text-[17px] font-[600] tracking-[-0.03em] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]"><Logo size={30} />Weft</a></Up>
          <Up at={T.nav + 0.05} y={-30}>
            <nav aria-label="Main"><ul className="flex h-[46px] items-center gap-1 rounded-full bg-[#0c0d10] px-2 text-[14px] font-[500] text-white/80 shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]">
              {['Product', 'Templates', 'Integrations', 'Pricing', 'Docs'].map((l) => <li key={l}><a href="#" className="flex h-[34px] items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">{l}</a></li>)}
            </ul></nav>
          </Up>
          <Up at={T.nav + 0.1} y={-30}><a href="#" className="flex h-[46px] items-center rounded-full bg-white px-5 text-[15px] font-[600] tracking-[-0.01em] shadow-[0_0_0_1px_rgb(15_16_19/0.04),0_6px_16px_-6px_rgb(15_16_19/0.18)]">Get started</a></Up>
        </header>

        <main className="absolute inset-x-0 top-[150px] z-10 flex flex-col items-center text-center">
          <h1 className="text-[76px] font-[500] leading-[1.0] tracking-[-0.05em]">
            <Up at={T.l1} className="text-[#77797f]">Workflows that think,</Up>
            <Up at={T.l2}>then act for you.</Up>
          </h1>
          <Up at={T.sub} y={20} className="mt-6"><p className="text-[16px] leading-[24px] tracking-[-0.005em] text-[#2b2d33]">Weft runs support, billing and ops on AI steps that read the context,<br />ask a person when it matters, and only then act.</p></Up>
          <Up at={T.cta} y={20} className="mt-8 flex items-center gap-2.5 text-[16px]">
            <a href="#" className="press flex h-[54px] items-center rounded-full bg-[#0c0d10] px-7 font-[550] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_10px_24px_-10px_rgb(15_16_19/0.5)]">Start building</a>
            <a href="#" className="press flex h-[54px] items-center rounded-full bg-white/60 px-7 font-[550] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.7),0_6px_16px_-8px_rgb(15_16_19/0.15)] backdrop-blur-[20px]">Watch a live run</a>
          </Up>
        </main>

        {/* the product, cropped by the fold at ~58% and dissolving into the floor */}
        <motion.div role="img" aria-label="Weft workflow editor: a refund run paused on an approval (sample data)" className="absolute left-[72px] top-[528px] z-10 h-[560px] w-[1296px]"
          style={{ scale: 0.86, transformOrigin: '50% 0%', maskImage: 'linear-gradient(180deg, #000 55%, transparent 92%)' }}
          initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.win, type: 'spring', duration: 1.5, bounce: 0, opacity: { delay: T.win, duration: 0.6 } }}>
          <Window at={T.canvas} />
        </motion.div>
      </div>
    </MotionConfig>
  )
}
