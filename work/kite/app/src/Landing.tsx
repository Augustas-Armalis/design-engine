// Kite landing page (fictional edge network; every product screen is the real dashboard build, sample data).
// Hero: Title Case 2-line headline, hand-set 2-line subtitle, bevelled white pill + tactile secondary, the live
// dashboard straight-on in a 3-edge frame (ring, top light, deep drop) that plays its own load-in. Then a bento of the
// product's real pieces, how it works, a closing CTA over the dot world, footer.
import { useEffect, useState, type ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import App from './App'
import Wordmark from './Wordmark'
import LightField from './LightField'
import { ease } from './anim'

const Word = ({ children, i }: { children: ReactNode; i: number }) => (
  <motion.span className="inline-block" initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.15 + i * 0.07, duration: 1.1, ease: ease.out }}>{children}</motion.span>
)
const Up = ({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 1.0, ease: ease.out }}>{children}</motion.div>
)
/* Basit cinematic-dark grammar (knowledge/web/basit-craft.md BA-01..19): inset framed stage, one rendered light field
   with grain in the light, floating glass capsule nav, centred 2-line headline at 450 / -0.05em with the second line at
   half value, small close sub-copy, 48px CTAs (white carries its own inner light), the live dashboard ~72% wide sitting
   in the brightest band, glass frame, dissolving into the canvas. */
const Glass = 'linear-gradient(180deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.03))'
export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), 600); return () => clearTimeout(id) }, [])
  const SW = 1412, SH = 872, PW = 1040, ZOOM = (PW - 12) / 1440
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[#050506]" style={{ fontFamily: '"Inter Variable", system-ui, sans-serif' }}>
        {/* the stage */}
        <div className="absolute left-[14px] top-[14px] overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgb(255_255_255/0.06)]" style={{ width: SW, height: SH }}>
          <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.0, ease: ease.out }}><LightField w={SW} h={SH} /></motion.div>

          {/* floating capsule nav */}
          <Up at={0.05} className="absolute left-1/2 top-[22px] z-30 -translate-x-1/2">
            <header className="flex h-[52px] w-[760px] items-center rounded-full pl-5 pr-[6px] backdrop-blur-xl" style={{ background: 'rgb(18 18 20 / 0.72)', boxShadow: '0 0 0 1px rgb(255 255 255 / 0.08), inset 0 1px 0 rgb(255 255 255 / 0.08), 0 12px 30px -12px rgb(0 0 0 / 0.8)' }}>
              <a href="#" className="flex h-10 items-center"><Wordmark size={20} /></a>
              <nav aria-label="Main" className="mx-auto"><ul className="flex items-center gap-1 text-[14px] text-[#a1a1a6]">{['Product', 'Regions', 'Pricing', 'Docs'].map((l) => <li key={l}><a href="#" className="st flex h-9 items-center rounded-full px-3 hover:text-white">{l}</a></li>)}</ul></nav>
              <a href="#" className="st flex h-10 items-center rounded-full bg-white px-4 text-[14px] font-[550] text-[#0a0a0b] shadow-[inset_0_-2px_6px_rgb(0_0_0/0.12)] hover:bg-[#f2f2f2]">Start deploying</a>
            </header>
          </Up>

          {/* copy */}
          <div className="relative z-20 flex flex-col items-center pt-[148px] text-center">
            <h1 className="text-[60px] font-[450] leading-[1.06] tracking-[-0.05em] text-[#f4f4f5]">
              <Word i={0}>Ship</Word> <Word i={1}>To</Word> <Word i={2}>Every</Word> <Word i={3}>Region.</Word><br />
              <span className="text-[rgb(244_244_245/0.48)]"><Word i={4}>Know</Word> <Word i={5}>Which</Word> <Word i={6}>One</Word> <Word i={7}>Needs</Word> <Word i={8}>You.</Word></span>
            </h1>
            <Up at={0.5} className="mt-[18px]"><p className="text-[16px] leading-[24px] text-[#a1a1a6]">Ten edge regions, live latency and one-click reroutes,<br />in one calm dashboard.</p></Up>
            <Up at={0.6} className="mt-[32px] flex items-center gap-3">
              <a href="#" className="st group flex h-12 items-center gap-2 rounded-full bg-white pl-6 pr-5 text-[15px] font-[550] text-[#0a0a0b] hover:bg-[#f4f4f4]" style={{ boxShadow: 'inset 0 -3px 10px rgb(0 0 0 / 0.14), inset 0 1px 0 #fff, 0 0 0 1px rgb(255 255 255 / 0.2)' }}>Start deploying<ArrowRight size={16} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5" /></a>
              <a href="#" className="st flex h-12 items-center rounded-full px-6 text-[15px] font-[500] text-white backdrop-blur-md hover:bg-[rgb(255_255_255/0.1)]" style={{ background: Glass, boxShadow: '0 0 0 1px rgb(255 255 255 / 0.1), inset 0 1px 0 rgb(255 255 255 / 0.1)' }}>See it live</a>
            </Up>
          </div>

          {/* the product, in the light */}
          <motion.div className="absolute left-1/2 z-10 -translate-x-1/2 rounded-[22px] p-[6px] backdrop-blur-md" style={{ top: 478, width: PW, background: Glass, boxShadow: '0 0 0 1px rgb(255 255 255 / 0.12), inset 0 1px 0 rgb(255 255 255 / 0.18), 0 40px 80px -20px rgb(0 0 0 / 0.8)' }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1.4, ease: ease.out }}>
            <div role="img" aria-label="The Kite dashboard: traffic by region, latency and deployments, sample data" inert className="overflow-hidden rounded-[16px] shadow-[0_0_0_1px_rgb(0_0_0/0.6)]" style={{ height: 900 * ZOOM }}>
              <div style={{ zoom: ZOOM }}>{dash ? <App embedded /> : <div className="h-[900px] w-[1440px] bg-[var(--canvas)]" />}</div>
            </div>
          </motion.div>
          {/* dissolve the product into the stage */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[130px]" style={{ background: 'linear-gradient(180deg, transparent, rgb(11 11 12 / 0.85) 70%, #0b0b0c)' }} />
        </div>
      </div>
    </MotionConfig>
  )
}
