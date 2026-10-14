// Kite landing page (fictional edge network; every product screen is the real dashboard build, sample data).
// Hero: Title Case 2-line headline, hand-set 2-line subtitle, bevelled white pill + tactile secondary, the live
// dashboard straight-on in a 3-edge frame (ring, top light, deep drop) that plays its own load-in. Then a bento of the
// product's real pieces, how it works, a closing CTA over the dot world, footer.
import { useEffect, useState, type ReactNode } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import App from './App'
import KiteLogo from './KiteLogo'
import HeroMap from './HeroMap'
import { ease } from './anim'

const Up = ({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 1.0, ease: ease.out }}>{children}</motion.div>
)
/* Kite hero, rebuilt against founder-taste.md (checklist in work/kite/DIRECTION.md "Hero, by the rules"):
   Kestrel's loved composition in dark: rails at 120/1320 with a dot grid only between them (faded behind the type),
   + marks where the nav rule crosses the rails; centred Title Case headline, no full stop, one colour, Inter 600 / 64 /
   -0.04em, ~84px under the nav; one-line subtitle; 44px CTAs with smooth 14px corners (white bevel = product Deploy
   grammar, dark tactile secondary, text only); 40px nav controls; full dashboard in a double-bezel frame 64px under
   the CTAs, dissolving at the fold; one Kaching-token load-in. */
const RAIL = 'rgb(255 255 255 / 0.07)'
function Rails() {
  const plus = (x: number, y: number) => (
    <span key={`${x}${y}`} className="absolute size-[11px]" style={{ left: x - 5, top: y - 5 }}><span className="absolute left-[5px] top-0 h-[11px] w-px bg-[rgb(255_255_255/0.3)]" /><span className="absolute left-0 top-[5px] h-px w-[11px] bg-[rgb(255_255_255/0.3)]" /></span>
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {[120, 1320].map((x) => <div key={x} className="absolute inset-y-0 w-px" style={{ left: x, background: RAIL }} />)}
      <div className="absolute inset-x-0 top-[72px] h-px" style={{ background: RAIL }} />
      {[120, 1320].map((x) => plus(x, 72))}
    </div>
  )
}
/* hero buttons, polished: white bevel with a trailing arrow tile (inset 6 on every side, radius 14 - 6 = 8), and a
   graphite tactile secondary with a lit top edge; both 46px, radius 14, press 0.98, no glow */
const Primary = ({ children, h = 46, tile = true, className = '' }: { children: ReactNode; h?: number; tile?: boolean; className?: string }) => (
  <a href="#" className={`st press group flex items-center gap-3 rounded-[14px] font-[550] tracking-[-0.01em] text-[#0a0a0b] ${tile ? 'pl-5 pr-[6px]' : 'px-4'} ${className}`}
    style={{ height: h, background: 'linear-gradient(180deg, #ffffff 0%, #f1f1f2 55%, #e2e2e4 100%)', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.7), inset 0 1px 0 #fff, inset 0 -1px 0 rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.5), 0 8px 18px -8px rgb(0 0 0 / 0.7)' }}>
    {children}
    {tile && <span className="grid place-items-center rounded-[8px] bg-[linear-gradient(180deg,#2a2a2d,#141416)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_0_0_1px_rgb(0_0_0/0.4)]" style={{ width: h - 12, height: h - 12 }}><ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-0.5" /></span>}
  </a>
)
const Secondary = ({ children, h = 46, className = '' }: { children: ReactNode; h?: number; className?: string }) => (
  <a href="#" className={`st press flex items-center rounded-[14px] px-5 font-[500] tracking-[-0.01em] text-[#f4f4f5] hover:brightness-125 ${className}`}
    style={{ height: h, background: 'linear-gradient(180deg, #1f1f22 0%, #151517 100%)', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.8), inset 0 0 0 1px rgb(255 255 255 / 0.07), inset 0 1px 0 rgb(255 255 255 / 0.12), 0 1px 2px rgb(0 0 0 / 0.5)' }}>{children}</a>
)
const T0 = { nav: 0.1, h1: 0.25, sub: 0.62, cta: 0.72, frame: 0.85 }
const W2 = ({ children, i }: { children: ReactNode; i: number }) => (
  <motion.span className="inline-block" initial={{ opacity: 0.01, y: 28, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ y: { delay: T0.h1 + i * 0.07, duration: 1.2, ease: ease.reveal }, opacity: { delay: T0.h1 + i * 0.07, duration: 0.9, ease: ease.out }, filter: { delay: T0.h1 + i * 0.07, duration: 0.9 } }}>{children}</motion.span>
)

export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), (T0.frame + 0.2) * 1000); return () => clearTimeout(id) }, [])
  const FW = 1136, PAD = 6, ZOOM = (FW - PAD * 2) / 1440
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[#0a0a0b] text-[#f4f4f5]" style={{ fontFamily: '"Inter Variable", system-ui, sans-serif', fontOpticalSizing: 'auto', fontFeatureSettings: '"cv11", "ss01"', ['--font-sans' as string]: '"Inter Variable", system-ui, sans-serif' }}>
        <Rails />
        <HeroMap />
        <header className="absolute inset-x-[144px] top-0 z-30 flex h-[72px] items-center">
          <Up at={T0.nav}><a href="#" className="flex h-10 items-center"><KiteLogo size={22} /></a></Up>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <Up at={T0.nav + 0.07}>
              <ul className="flex h-11 items-center gap-0.5 rounded-[14px] bg-[#0e0e0f] p-1 text-[15px] font-[500] text-[#a1a1a6] shadow-[inset_0_1px_2px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.07)]">
                {['Product', 'Regions', 'Pricing', 'Docs', 'Changelog'].map((l, i) => <li key={l}><a href="#" aria-current={i === 0 ? 'page' : undefined} className={`st flex h-9 items-center rounded-[10px] px-3.5 ${i === 0 ? 'tile text-[#f4f4f5]' : 'hover:text-[#f4f4f5]'}`}>{l}</a></li>)}
              </ul>
            </Up>
          </nav>
          <Up at={T0.nav + 0.14} className="ml-auto flex items-center gap-2 text-[15px]">
            <a href="#" className="st flex h-10 items-center rounded-[12px] px-4 font-[500] text-[#a1a1a6] hover:text-[#f4f4f5]">Sign in</a>
            <Primary h={40} tile={false} className="rounded-[12px]">Start deploying</Primary>
          </Up>
        </header>

        <section className="relative z-10 flex flex-col items-center pt-[156px] text-center">
          <h1 className="text-[68px] font-[550] leading-[1.04] tracking-[-0.045em] text-[#f4f4f5]">
            <W2 i={0}>Every</W2> <W2 i={1}>Region,</W2> <W2 i={2}>Live</W2><br />
            <W2 i={3}>Every</W2> <W2 i={4}>Fix,</W2> <W2 i={5}>One</W2> <W2 i={6}>Click</W2>
          </h1>
          <Up at={T0.sub} className="mt-5"><p className="text-[18px] font-[450] leading-[28px] tracking-[-0.011em] text-[#a1a1a6]">Kite runs your app in ten edge regions and hands you<br />the fix the moment one of them slows down.</p></Up>
          <Up at={T0.cta} className="mt-8 flex items-center gap-3 text-[16px]">
            <Primary>Start deploying</Primary>
            <Secondary>Book a demo</Secondary>
          </Up>
        </section>

        {/* double-bezel frame, 64px under the CTAs, the full dashboard inside, dissolving at the fold */}
        <motion.div className="absolute left-1/2 z-10 -translate-x-1/2" style={{ top: 515, width: FW, transformOrigin: '50% 0%' }}
          initial={{ opacity: 0, y: 64, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ y: { delay: T0.frame, duration: 1.4, ease: ease.reveal }, scale: { delay: T0.frame, duration: 1.4, ease: ease.out }, opacity: { delay: T0.frame, duration: 0.5 } }}>
          <div className="rounded-[22px]" style={{ padding: PAD, background: 'linear-gradient(180deg, rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.02))', boxShadow: '0 0 0 1px rgb(255 255 255 / 0.08), inset 0 1px 0 rgb(255 255 255 / 0.07), 0 30px 70px -24px rgb(0 0 0 / 0.9)' }}>
            <div role="img" aria-label="The Kite dashboard: traffic by region, latency and deployments, sample data" inert className="overflow-hidden rounded-[16px] shadow-[0_0_0_1px_rgb(0_0_0/0.7)]" style={{ height: 900 * ZOOM, color: 'var(--ink)' }}>
              <div style={{ zoom: ZOOM }}>{dash ? <App embedded /> : <div className="h-[900px] w-[1440px] bg-[var(--canvas)]" />}</div>
            </div>
          </div>
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120px] bg-[linear-gradient(180deg,transparent,#0a0a0b)]" />
      </div>
    </MotionConfig>
  )
}
