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
/* Supabase top half + Cursor product stage, set with Kestrel's type craft (the founder loved its font, lightness,
   spacing and professionalism). Calm 56px / 500 / -0.035em headline left, description in the right column, compact
   CTAs, then a full-width stage panel (faint dot grid, hairline) with the dashboard window floating inside it. */
export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), 600); return () => clearTimeout(id) }, [])
  const C = 1200, WIN = 1040, ZOOM = (WIN - 2) / 1440
  const L = new URLSearchParams(location.search).get('theme') === 'light'
  const t = L ? { bg: '#f6f6f5', ink: '#171717', sub: '#5c5c5c', nav: '#4a4a4a', line: 'rgb(0 0 0 / 0.07)', ring: 'rgb(0 0 0 / 0.12)', stage: '#ededeb', dot: 'rgb(0 0 0 / 0.1)', btn: '#171717', btnInk: '#fff', soft: '#8f8f8f' } : { bg: '#0b0b0c', ink: '#f4f4f5', sub: '#a1a1a6', nav: '#a1a1a6', line: 'rgb(255 255 255 / 0.07)', ring: 'rgb(255 255 255 / 0.12)', stage: '#111113', dot: 'rgb(255 255 255 / 0.09)', btn: '#f4f4f5', btnInk: '#0b0b0c', soft: '#8e8e93' }
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden" style={{ background: t.bg, color: t.ink, fontFamily: '"Inter Variable", system-ui, sans-serif' }}>
        <header className="absolute inset-x-0 top-0 z-30 h-16" style={{ borderBottom: `1px solid ${t.line}` }}>
          <div className="mx-auto flex h-full items-center" style={{ width: C }}>
            <a href="#" className="flex h-10 items-center" style={L ? { filter: 'invert(1)' } : undefined}><Wordmark size={21} /></a>
            <nav aria-label="Main" className="ml-10"><ul className="flex items-center gap-1 text-[14px] font-[450]" style={{ color: t.nav }}>{['Product', 'Regions', 'Pricing', 'Docs', 'Changelog'].map((l) => <li key={l}><a href="#" className="st flex h-9 items-center rounded-[8px] px-3 hover:opacity-70">{l}</a></li>)}</ul></nav>
            <div className="ml-auto flex items-center gap-2">
              <a href="#" className="st flex h-8 items-center rounded-[8px] px-3 text-[14px] font-[450] hover:opacity-80" style={{ color: t.ink, boxShadow: `inset 0 0 0 1px ${t.ring}` }}>Sign in</a>
              <a href="#" className="st flex h-8 items-center rounded-[8px] px-3 text-[14px] font-[550] hover:opacity-90" style={{ background: t.btn, color: t.btnInk }}>Start deploying</a>
            </div>
          </div>
        </header>

        <section className="relative mx-auto pt-[150px]" style={{ width: C }}>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[56px] font-[500] leading-[1.06] tracking-[-0.035em]" style={{ color: t.ink }}>
                <Word i={0}>Ship</Word> <Word i={1}>to</Word> <Word i={2}>every</Word> <Word i={3}>region</Word><br />
                <span style={{ color: t.soft }}><Word i={4}>See</Word> <Word i={5}>the</Word> <Word i={6}>one</Word> <Word i={7}>that</Word> <Word i={8}>needs</Word> <Word i={9}>you</Word></span>
              </h1>
              <Up at={0.55} className="mt-8 flex items-center gap-2.5">
                <a href="#" className="st flex h-10 items-center gap-1.5 rounded-[10px] px-4 text-[14px] font-[550] hover:opacity-90" style={{ background: t.btn, color: t.btnInk }}>Start deploying<ArrowRight size={15} strokeWidth={2.2} /></a>
                <a href="#" className="st flex h-10 items-center rounded-[10px] px-4 text-[14px] font-[500] hover:opacity-80" style={{ color: t.ink, boxShadow: `inset 0 0 0 1px ${t.ring}` }}>Request a demo</a>
              </Up>
            </div>
            <Up at={0.45} className="mt-[14px] w-[420px]"><p className="text-[17px] leading-[27px]" style={{ color: t.sub }}>Kite runs your app in ten edge regions. It watches latency everywhere, points at the region that slows down, and offers the fix in one click.</p></Up>
          </div>
        </section>

        {/* Cursor-style stage: a full-width panel with a faint dot grid, the dashboard window floating inside */}
        <motion.div className="absolute left-1/2 top-[416px] -translate-x-1/2 overflow-hidden rounded-[16px]" style={{ width: C, height: 520, background: t.stage, boxShadow: `inset 0 0 0 1px ${t.line}` }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.2, ease: ease.out }}>
          <div aria-hidden className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${t.dot} 1px, transparent 1.2px)`, backgroundSize: '18px 18px', backgroundPosition: '8px 8px' }} />
          <motion.div className="absolute left-1/2 top-[56px] -translate-x-1/2 overflow-hidden rounded-[12px]" style={{ width: WIN, boxShadow: '0 0 0 1px rgb(255 255 255 / 0.1), 0 30px 60px -20px rgb(0 0 0 / 0.8), 0 0 0 6px rgb(0 0 0 / 0.25)' }}
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
