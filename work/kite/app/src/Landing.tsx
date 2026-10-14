// Kite landing page (fictional edge network; every product screen is the real dashboard build, sample data).
// Hero: Title Case 2-line headline, hand-set 2-line subtitle, bevelled white pill + tactile secondary, the live
// dashboard straight-on in a 3-edge frame (ring, top light, deep drop) that plays its own load-in. Then a bento of the
// product's real pieces, how it works, a closing CTA over the dot world, footer.
import { useEffect, useState, type ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import App from './App'
import KiteLogo from './KiteLogo'
import { ease } from './anim'

const Word = ({ children, i }: { children: ReactNode; i: number }) => (
  <motion.span className="inline-block" initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.15 + i * 0.07, duration: 1.1, ease: ease.out }}>{children}</motion.span>
)
const Up = ({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 1.0, ease: ease.out }}>{children}</motion.div>
)
/* Dark hero, Supabase top half + Cursor product stage. Founder round: one-colour bold title (Inter 600, -0.04em),
   a properly built 2-line subtitle, buttons built like the dashboard's own (white bevelled pill + dark tactile pill),
   and the supplied K-star logo. */
const BtnWhite = ({ children, h = 44, className = '' }: { children: ReactNode; h?: number; className?: string }) => (
  <a href="#" className={`st flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ffffff,#dedee0)] px-5 font-[600] text-[#0a0a0b] shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_1px_0_#fff,0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white ${className}`} style={{ height: h }}>{children}</a>
)
const BtnDark = ({ children, h = 44, className = '' }: { children: ReactNode; h?: number; className?: string }) => (
  <a href="#" className={`st btn-tactile flex items-center gap-2 rounded-full px-5 font-[550] text-[#f4f4f5] ${className}`} style={{ height: h }}>{children}</a>
)

export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), 600); return () => clearTimeout(id) }, [])
  const C = 1200, WIN = 1040, ZOOM = (WIN - 2) / 1440
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[#0a0a0b] text-[#f4f4f5]" style={{ fontFamily: '"Inter Variable", system-ui, sans-serif' }}>
        <header className="absolute inset-x-0 top-0 z-30 h-16 border-b border-[rgb(255_255_255/0.07)]">
          <div className="mx-auto flex h-full items-center" style={{ width: C }}>
            <a href="#" className="flex h-10 items-center"><KiteLogo /></a>
            <nav aria-label="Main" className="ml-10"><ul className="flex items-center gap-1 text-[14px] font-[500] text-[#a1a1a6]">{['Product', 'Regions', 'Pricing', 'Docs', 'Changelog'].map((l) => <li key={l}><a href="#" className="st flex h-9 items-center rounded-full px-3 hover:text-[#f4f4f5]">{l}</a></li>)}</ul></nav>
            <div className="ml-auto flex items-center gap-2 text-[14px]">
              <BtnDark h={34} className="px-4">Sign in</BtnDark>
              <BtnWhite h={34} className="px-4">Start deploying</BtnWhite>
            </div>
          </div>
        </header>

        <section className="relative mx-auto pt-[146px]" style={{ width: C }}>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[60px] font-[600] leading-[1.04] tracking-[-0.04em] text-[#f4f4f5]">
                <Word i={0}>Ship</Word> <Word i={1}>to</Word> <Word i={2}>every</Word> <Word i={3}>region.</Word><br />
                <Word i={4}>Fix</Word> <Word i={5}>the</Word> <Word i={6}>slow</Word> <Word i={7}>one</Word> <Word i={8}>first.</Word>
              </h1>
              <Up at={0.45} className="mt-5"><p className="text-[18px] leading-[28px] text-[#a1a1a6]">Kite runs your app in ten edge regions, points at the one<br />slowing down, and fixes it in one click.</p></Up>
            </div>
            <Up at={0.55} className="mb-[2px] flex items-center gap-2.5 text-[15px]">
              <BtnWhite>Start deploying<ArrowRight size={16} strokeWidth={2.2} /></BtnWhite>
              <BtnDark>Book a demo</BtnDark>
            </Up>
          </div>
        </section>

        <motion.div className="absolute left-1/2 top-[414px] -translate-x-1/2 overflow-hidden rounded-[18px]" style={{ width: C, height: 540, background: '#111113', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.07)' }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.2, ease: ease.out }}>
          <div aria-hidden className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1.2px)', backgroundSize: '18px 18px', backgroundPosition: '8px 8px' }} />
          <motion.div className="absolute left-1/2 top-[52px] -translate-x-1/2 overflow-hidden rounded-[12px]" style={{ width: WIN, boxShadow: '0 0 0 1px rgb(255 255 255 / 0.1), 0 0 0 6px rgb(0 0 0 / 0.3), 0 30px 60px -20px rgb(0 0 0 / 0.8)' }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 1.2, ease: ease.out }}>
            <div role="img" aria-label="The Kite dashboard: traffic by region, latency and deployments, sample data" inert style={{ height: 900 * ZOOM, color: 'var(--ink)' }}>
              <div style={{ zoom: ZOOM }}>{dash ? <App embedded /> : <div className="h-[900px] w-[1440px] bg-[var(--canvas)]" />}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
