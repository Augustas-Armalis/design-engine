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

export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), 650); return () => clearTimeout(id) }, [])
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* nav */}
        <header className="absolute inset-x-0 top-0 z-30 mx-auto flex h-[72px] max-w-[1200px] items-center">
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
        <section className="relative pt-[104px]">
          <div className="relative z-10 flex flex-col items-center text-center">
            <Up at={0.08} className="mb-6">
              <a href="#" className="st group flex h-8 items-center gap-2.5 rounded-full py-1 pl-1.5 pr-3.5 text-[13px] font-[500] text-[var(--sub)]" style={{ background: 'linear-gradient(180deg,#1c1c1e,#141415)', boxShadow: '0 0 0 1px rgb(0 0 0 / 0.7), inset 0 1px 0 rgb(255 255 255 / 0.08), inset 0 0 0 1px rgb(255 255 255 / 0.04)' }}>
                <span className="flex h-6 items-center gap-1.5 rounded-full bg-[rgb(255_107_94/0.12)] px-2 text-[12px] font-[550] text-[var(--red)] shadow-[inset_0_0_0_1px_rgb(255_107_94/0.22)]"><span className="relative grid size-1.5 place-items-center"><span className="size-1.5 rounded-full bg-[var(--red)]" /></span>New</span>
                <span className="group-hover:text-[var(--ink)]">One-click reroute when a region drifts</span><ArrowRight size={13} className="text-[var(--soft)] transition-transform group-hover:translate-x-0.5" />
              </a>
            </Up>
            <h1 className="text-[66px] font-[500] leading-[1.02] tracking-[-0.045em] text-[#f2f2f2]" style={{ fontVariationSettings: '"wdth" 108' }}>
              <Word i={0}>The</Word> <Word i={1}>Edge</Word> <Word i={2}>Network</Word><br />
              <span className="text-[#8e8e93]"><Word i={3}>That</Word> <Word i={4}>Tells</Word> <Word i={5}>You</Word> <Word i={6}>Why.</Word></span>
            </h1>
            <Up at={0.6} className="mt-5"><p className="text-[19px] leading-[29px] text-[var(--sub)]">Kite runs your app in ten regions and points at the one<br />that needs you, with the fix one click away.</p></Up>
            <Up at={0.72} className="mt-7 flex items-center gap-3">
              <Primary className="h-12 px-6 text-[15px]">Start deploying free<ArrowRight size={16} strokeWidth={2.2} /></Primary>
              <Secondary className="h-12 px-6 text-[15px]">See the live demo</Secondary>
            </Up>
          </div>
          {/* the product, straight-on, in a 3-edge frame; it plays its own load-in once the copy has landed */}
          <motion.div className="relative z-10 mx-auto mt-[64px] w-[1180px] rounded-[26px] p-[7px]" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.4, ease: ease.out }}
            style={{ background: '#141415', boxShadow: '0 0 0 1px rgb(255 255 255 / 0.08), inset 0 1px 0 rgb(255 255 255 / 0.06), 0 40px 100px -30px rgb(0 0 0 / 0.9)' }}>
            <div role="img" aria-label="The Kite dashboard: traffic by region, latency and deployments, sample data" inert className="overflow-hidden rounded-[18px] shadow-[0_0_0_1px_rgb(0_0_0/0.6)]" style={{ height: 900 * (1164 / 1440) }}>
              <div style={{ zoom: 1164 / 1440 }}>{dash ? <App embedded /> : <div className="h-[900px] w-[1440px] bg-[var(--canvas)]" />}</div>
            </div>
          </motion.div>
          
        </section>

      </div>
    </MotionConfig>
  )
}
