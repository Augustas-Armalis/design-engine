// Weft hero, replicating Basit's Taxo grammar exactly (knowledge/benchmarks/basit/measure/taxo-deep.json):
// a rendered silk light field, one blue ramp lit from the top, grain in the light and none in the black;
// a one-line serif headline (italic word + roman word) 120/156 w400 -6px; sub 16/22.4 w300 +0.16px 14px below;
// one ringed white pill CTA with a blue glow; a 70px frosted nav. The field arrives last, settling from 1.2x.
import { motion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { Warp } from '@paper-design/shaders-react'
import { Logo } from './flow'

const spring = (delay: number, duration = 1.2) => ({ delay, type: 'spring' as const, duration, bounce: 0 })
const Rise = ({ at, y = 120, children, className = '' }: { at: number; y?: number; children: ReactNode; className?: string }) => (
  <motion.span className={`inline-block ${className}`} initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring(at), opacity: { delay: at, duration: 0.6 } }}>{children}</motion.span>
)

export const Grain = ({ o = 0.7, id = 'g' }: { o?: number; id?: string }) => (
  <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" style={{ mixBlendMode: 'overlay', opacity: o }}>
    <filter id={id}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
    <rect width="100%" height="100%" filter={`url(#${id})`} />
  </svg>
)

export function Silk({ frame = 6000, rotation = 200 }: { frame?: number; rotation?: number }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-10" style={{ filter: 'blur(2.5px)' }}>
        <Warp style={{ width: '100%', height: '100%' }} colors={['#030406', '#0a2f5f', '#2365a4', '#d9e5f5']} shape="edge" shapeScale={0.15} distortion={0.25} swirl={0.6} swirlIterations={10} proportion={0.45} softness={1} rotation={rotation} speed={0} frame={frame} />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 42%, rgb(4 5 6 / 0.85) 72%, #040506 92%)' }} />
      <Grain />
    </div>
  )
}

/** Taxo pill: 10% white ring, white fill inset 3px, a blue radial glow (blur 15) and stroke at the right */
export function Pill({ children, w = 176 }: { children: ReactNode; w?: number }) {
  return (
    <a href="#" className="group relative grid h-14 place-items-center rounded-[118px] bg-white/10" style={{ width: w }}>
      <span aria-hidden className="absolute inset-0 rounded-[72px] blur-[15px]" style={{ background: 'radial-gradient(25% 38.4% at 89.6% 39.6%, rgb(59 128 255) 0%, transparent 100%)' }} />
      <span aria-hidden className="absolute inset-0 rounded-[72px]" style={{ background: 'radial-gradient(17.1% 43% at 89.6% 39.6%, rgb(59 128 255) 0%, transparent 100%)' }} />
      <span className="absolute inset-[3px] grid place-items-center rounded-[114px] bg-white font-serif text-[16px] font-[600] text-[#080808] transition-colors group-hover:bg-[#f1f4f9]">{children}</span>
    </a>
  )
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[#040506] text-white" style={{ ['--font-serif' as string]: '"Source Serif 4 Variable", Georgia, serif' }}>
        <motion.div className="absolute inset-0 origin-[70%_20%]" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 1.5, ease: [0.16, 1, 0.3, 1], opacity: { delay: 1.5, duration: 0.9 } }}>
          <Silk />
        </motion.div>

        <motion.header className="absolute inset-x-0 top-0 z-20 flex h-[70px] items-center bg-[rgb(8_8_8/0.7)] px-12 backdrop-blur-[20px]" initial={{ opacity: 0, y: -80 }} animate={{ opacity: 1, y: 0 }} transition={spring(0, 1)}>
          <a href="#" className="flex items-center gap-2.5 text-[21px] font-[600] tracking-[-0.03em]"><Logo size={30} />Weft</a>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-10 font-serif text-[16px] font-[300] tracking-[0.01em] text-[#d4d8de]">
              {['Product', 'Templates', 'Pricing', 'Docs'].map((l) => <li key={l}><a href="#" className="transition-colors hover:text-white">{l}</a></li>)}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-1"><Pill>Book a demo</Pill><Pill w={134}>Sign in</Pill></div>
        </motion.header>

        <main className="absolute inset-x-0 top-[311px] z-10 flex flex-col items-center text-center font-serif">
          <h1 className="whitespace-nowrap text-[120px] font-[400] leading-[156px] tracking-[-6px]">
            <Rise at={0.2} className="italic">Thoughtful</Rise> <Rise at={0.4}>automation</Rise>
          </h1>
          <motion.p className="mt-[14px] text-[16px] font-[300] leading-[22.4px] tracking-[0.16px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring(0.8), opacity: { delay: 0.8, duration: 0.6 } }}>
            AI workflows that read the ticket, check the order, ask the right person, and only then act.
          </motion.p>
          <motion.div className="mt-[36px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring(1.0), opacity: { delay: 1.0, duration: 0.6 } }}>
            <Pill>Start building</Pill>
          </motion.div>
        </main>
      </div>
    </MotionConfig>
  )
}
