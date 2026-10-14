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
const Primary = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <a href="#" className={`st flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#fff,#dcdcde)] font-[600] text-[#0a0a0b] shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_1px_0_#fff] hover:bg-white ${className}`}>{children}</a>
)
const Secondary = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <a href="#" className={`st btn-tactile flex items-center gap-2 rounded-full font-[550] text-[var(--ink)] ${className}`}>{children}</a>
)

function Wide({ centreY }: { centreY: number }) {
  const m = `radial-gradient(42% 46% at 50% ${centreY}px, #000 0%, transparent 100%)`
  return <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: 'linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)', backgroundSize: '120px 120px', backgroundPosition: '0 -48px', maskImage: m, WebkitMaskImage: m }} />
}
/* backgrounds to choose from (?bg=lines|hatch|grid): all hairline-level, no glow */
const RAIL = 'rgb(255 255 255 / 0.07)'
function Lines({ y2 }: { y2: number }) {
  const mark = (x: number, y: number) => <span key={`${x}-${y}`} className="absolute size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-[1.5px] bg-[var(--canvas)] shadow-[0_0_0_1px_rgb(255_255_255/0.22)]" style={{ left: x, top: y }} />
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {[120, 1320].map((x) => <div key={x} className="absolute inset-y-0 w-px" style={{ left: x, background: RAIL }} />)}
      {[72, y2].map((y) => <div key={y} className="absolute inset-x-0 h-px" style={{ top: y, background: RAIL }} />)}
      {[120, 1320].flatMap((x) => [72, y2].map((y) => mark(x, y)))}
    </div>
  )
}
function Hatch() {
  const hatch = { backgroundImage: 'repeating-linear-gradient(135deg, rgb(255 255 255 / 0.045) 0 1px, transparent 1px 8px)' }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-y-0 left-0 w-[120px]" style={hatch} /><div className="absolute inset-y-0 right-0 w-[120px]" style={hatch} />
      {[120, 1320].map((x) => <div key={x} className="absolute inset-y-0 w-px" style={{ left: x, background: RAIL }} />)}
      <div className="absolute inset-x-0 top-[72px] h-px" style={{ background: RAIL }} />
    </div>
  )
}
function Grid() {
  const fade = 'linear-gradient(180deg, #000 0%, #000 35%, transparent 70%)'
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-x-[120px] top-[72px] h-[560px]" style={{ backgroundImage: `linear-gradient(${RAIL} 1px, transparent 1px), linear-gradient(90deg, ${RAIL} 1px, transparent 1px)`, backgroundSize: '60px 60px', backgroundPosition: '-1px -1px', maskImage: fade, WebkitMaskImage: fade }} />
      {[120, 1320].map((x) => <div key={x} className="absolute inset-y-0 w-px" style={{ left: x, background: RAIL }} />)}
      <div className="absolute inset-x-0 top-[72px] h-px" style={{ background: RAIL }} />
    </div>
  )
}

const q = new URLSearchParams(location.search)
const BG = (['wide', 'lines', 'hatch', 'grid'] as const).find((b) => b === q.get('bg')) ?? 'wide'
const LAYOUT = (['centre', 'split'] as const).find((l) => l === q.get('layout')) ?? 'centre'

function Title({ align }: { align: 'center' | 'left' }) {
  return (
    <h1 className={`text-[60px] font-[500] leading-[1.02] tracking-[-0.04em] text-[#f2f2f2] ${align === 'left' ? 'text-left' : 'text-center'}`} style={{ fontVariationSettings: '"wdth" 104' }}>
      <Word i={0}>Latency</Word> <Word i={1}>Has</Word><br />
      <span className="text-[#8e8e93]"><Word i={2}>An</Word> <Word i={3}>Address.</Word></span>
    </h1>
  )
}
const Ctas = ({ className = '' }: { className?: string }) => (
  <Up at={0.6} className={`flex items-center gap-3 ${className}`}>
    <Primary className="h-11 px-5 text-[15px]">Start deploying free<ArrowRight size={16} strokeWidth={2.2} /></Primary>
    <Secondary className="h-11 px-5 text-[15px]">See the live demo</Secondary>
  </Up>
)

export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), 650); return () => clearTimeout(id) }, [])
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {BG === 'wide' ? <Wide centreY={LAYOUT === 'centre' ? 250 : 230} /> : BG === 'lines' ? <Lines y2={LAYOUT === 'centre' ? 444 : 378} /> : BG === 'hatch' ? <Hatch /> : <Grid />}
        {/* nav */}
        <header className="absolute inset-x-0 top-0 z-30 mx-auto flex h-[72px] max-w-[1200px] items-center px-6">
          <Up at={0.05}><a href="#" className="flex h-10 items-center"><Wordmark size={24} /></a></Up>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <Up at={0.1}><ul className="flex h-10 items-center gap-0.5 rounded-full bg-[#0e0e0f] p-1 text-[14px] font-[500] text-[var(--sub)] shadow-[inset_0_1px_2px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.07)]">{['Product', 'Regions', 'Pricing', 'Docs', 'Changelog'].map((l, i) => <li key={l}><a href="#" aria-current={i === 0 ? 'page' : undefined} className={`st flex h-8 items-center rounded-full px-3.5 ${i === 0 ? 'tile text-[var(--ink)]' : 'hover:text-[var(--ink)]'}`}>{l}</a></li>)}</ul></Up>
          </nav>
          <Up at={0.15} className="ml-auto flex items-center gap-2">
            <a href="#" className="st flex h-9 items-center rounded-[10px] px-3.5 text-[14px] font-[500] text-[var(--sub)] hover:text-[var(--ink)]">Sign in</a>
            <Primary className="h-9 px-4 text-[14px]">Start deploying</Primary>
          </Up>
        </header>

        {/* hero */}
        <section className="relative z-10">
          {LAYOUT === 'centre' ? (
            <div className="flex flex-col items-center pt-[148px] text-center">
              <Title align="center" />
              <Up at={0.5} className="mt-5"><p className="text-[18px] leading-[28px] text-[var(--sub)]">Kite watches ten regions and points at the one slowing down,<br />with the fix one click away.</p></Up>
              <Ctas className="mt-8" />
            </div>
          ) : (
            <div className="mx-auto flex max-w-[1200px] items-end justify-between px-[40px] pt-[156px]">
              <div>
                <Title align="left" />
                <Up at={0.5} className="mt-5"><p className="text-[18px] leading-[28px] text-[var(--sub)]">Kite watches ten regions and points at the one slowing down,<br />with the fix one click away.</p></Up>
              </div>
              <Ctas className="pb-1" />
            </div>
          )}
          {/* the product, straight-on, plain frame */}
          <motion.div className={`relative mx-auto w-[1180px] rounded-[26px] p-[7px] ${LAYOUT === 'centre' ? 'mt-[64px]' : 'mt-[72px]'}`} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1.4, ease: ease.out }}
            style={{ background: '#141415', boxShadow: '0 0 0 1px rgb(255 255 255 / 0.08), inset 0 1px 0 rgb(255 255 255 / 0.06), 0 40px 100px -30px rgb(0 0 0 / 0.9)' }}>
            <div role="img" aria-label="The Kite dashboard: traffic by region, latency and deployments, sample data" inert className="overflow-hidden rounded-[18px] shadow-[0_0_0_1px_rgb(0_0_0/0.6)]" style={{ height: 900 * (1164 / 1440) }}>
              <div style={{ zoom: 1164 / 1440 }}>{dash ? <App embedded /> : <div className="h-[900px] w-[1440px] bg-[var(--canvas)]" />}</div>
            </div>
          </motion.div>
          {/* bottom fade: the product dissolves into the page instead of ending hard at the fold */}
        </section>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[150px]" style={{ background: 'linear-gradient(180deg, transparent 0%, rgb(10 10 11 / 0.75) 60%, #0a0a0b 100%)' }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[90px]" style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(6px)', maskImage: 'linear-gradient(180deg, transparent, #000)', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000)' }} />
      </div>
    </MotionConfig>
  )
}
