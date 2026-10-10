// Quillwork dark hero (hero B): a brand-campaign composition, the opposite of hero A. Left-set Bodoni statement, one lit
// document on the right as the only product (no dashboard), warm-black desk with grain, a lamp spotlight from the upper
// right as the only light source, a micro-strip nav with counts and status (nav-grammars G11), an icon-tile statement
// button (button-grammars #12) with a smooth-cornered app icon. One T timeline.
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Reveal, Word } from './kit'
import { STAGGER } from './motion'
import Doc from './Doc'
import { squircleMaskImage } from './squircle'

const T = { nav: 0.05, eyebrow: 0.2, h1: 0.28, doc: 0.7 }
const T_SUB = T.h1 + 5 * STAGGER + 0.1

function AppIcon({ size = 52 }: { size?: number }) {
  // app-icon context (a tile is allowed here, LG-02): a smooth-cornered ink tile with the serif Q in paper
  const mask = squircleMaskImage({ width: size, height: size, radius: size * 0.27, smoothing: 0.6 })
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size, WebkitMaskImage: mask, maskImage: mask, background: 'linear-gradient(160deg, #3a2a1c, #1a120b)' }}>
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_15%,rgba(255,190,140,0.35),transparent)]" />
      <span className="serif relative text-[32px] font-[500] leading-none text-[var(--paper)]" style={{ marginTop: -2 }}>Q</span>
      <span aria-hidden className="absolute bottom-[12px] right-[13px] size-[6px] rounded-full bg-[var(--ember)]" />
    </span>
  )
}

export default function App() {
  const still = useReducedMotion()
  const words = ['Write', 'The', 'Draft', 'You', 'Meant']
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* the lamp: one warm spotlight from the upper right, falling on the desk where the document lies */}
        <motion.div aria-hidden className="pointer-events-none absolute -right-[160px] -top-[260px] h-[1100px] w-[1150px] rounded-full bg-[radial-gradient(closest-side,rgba(255,196,140,0.22),rgba(255,170,110,0.08)_45%,transparent_72%)]"
          initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1.8, ease: [0.26, 0.32, 0.14, 1] }} />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_60%,transparent_55%,rgba(0,0,0,0.45))]" />

        {/* micro strip nav: full bleed, counts as superscripts, a status, one text action */}
        <Reveal at={T.nav} y={-6} className="absolute inset-x-0 top-0 z-40">
          <header className="flex h-14 items-center px-6">
            <a href="#" aria-label="Quillwork home" className="serif text-[22px] font-[500] tracking-[-0.01em]">Quillwork</a>
            <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2"><ul className="flex">{[['Desk', ''], ['Precedents', '12'], ['Pricing', ''], ['Changelog', '31']].map(([l, c]) => (
              <li key={l}><a href="#" className="flex h-9 items-center px-3.5 text-[12.5px] font-[600] tracking-[0.01em] text-[#e2d9cb] transition-opacity hover:opacity-70">{l}{c && <sup className="ml-0.5 text-[10px] font-[600] text-[var(--soft)]">({c})</sup>}</a></li>
            ))}</ul></nav>
            <span className="ml-auto mr-5 flex items-center gap-2 text-[12.5px] font-[600] text-[#e2d9cb]"><span className="size-1.5 rounded-full bg-[var(--ember)] shadow-[0_0_0_3px_rgba(249,110,49,0.18)]" />Drafting</span>
            <a href="#" className="flex h-9 items-center text-[12.5px] font-[600] text-[#e2d9cb] underline decoration-[#e2d9cb]/30 underline-offset-[4px] hover:decoration-[#e2d9cb]">Sign in</a>
          </header>
        </Reveal>

        <main className="absolute left-[112px] top-[226px] z-20 w-[700px]">
          <Reveal at={T.eyebrow} y={6}><p className="text-[14px] text-[var(--sub)]">The writing desk for in-house legal teams</p></Reveal>
          <h1 className="serif mt-5 text-[84px] font-[500] leading-[1] tracking-[-0.025em]">
            {words.map((w, i) => <span key={w}><Word i={i} start={T.h1}>{w}</Word>{i === 2 ? <br /> : i < words.length - 1 ? ' ' : ''}</span>)}
          </h1>
          <Reveal at={T_SUB} blur className="mt-7"><p className="max-w-[470px] text-[18px] leading-[29px] text-[var(--sub)]">Quillwork reads your precedents and suggests the edit a senior partner would make, with the clause it came from. Every change is yours to keep or throw away.</p></Reveal>
          <Reveal at={T_SUB + STAGGER} className="mt-10 flex items-center gap-6">
            <a href="#" className="btn-tile press flex h-[68px] items-center gap-4 rounded-[22px] py-2 pl-2 pr-6">
              <AppIcon />
              <span className="text-left"><span className="block text-[17px] font-[500] leading-[22px] text-[var(--ink)]">Download for Mac</span><span className="block text-[12.5px] leading-[18px] text-[var(--soft)]">macOS 14 or later · free trial</span></span>
              <ArrowRight className="go ml-1 text-[var(--ink)]" size={18} strokeWidth={1.75} />
            </a>
            <a href="#" className="group flex h-10 items-center gap-1.5 text-[15px] text-[var(--ink)]">Try it in the browser<ArrowRight size={15} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" /></a>
          </Reveal>
        </main>

        <motion.aside aria-label="Sample document" className="absolute left-[800px] top-[150px] z-10" style={{ rotate: 2.5 }}
          initial={still ? false : { opacity: 0, y: 40, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 2.5 }} transition={{ delay: T.doc, duration: 1.4, ease: [0.26, 0.32, 0.14, 1] }}>
          <Doc at={T.doc + 0.5} />
        </motion.aside>
      </div>
    </MotionConfig>
  )
}
