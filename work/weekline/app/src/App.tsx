// Weekline dark hero (hero A): "ours" made dark. Kestrel's centred composition over one product view, graphite ladder,
// regular-weight Host Grotesk, a hanging-sheet nav (nav-grammars G07), slide-swap primary (button-grammars #15). Light comes
// from the product window: a lit top edge and a cool spill above it, never a blob behind the type. One T timeline.
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Play } from 'lucide-react'
import { Reveal, Stage, Word } from './kit'
import { STAGGER } from './motion'
import Week from './Week'

const T = { nav: 0.06, chip: 0.18, h1: 0.26, product: 0.95 }
const T_SUB = T.h1 + 5 * STAGGER + 0.05

export default function App() {
  const still = useReducedMotion()
  const words = ['Your', 'Week,', 'Already', 'Arranged']
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* the light: spill from the product window's top edge (rises with the window) */}
        <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-[400px] h-[420px] w-[1240px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(150,190,255,0.16),rgba(150,190,255,0.05)_55%,transparent)] blur-[10px]"
          initial={still ? false : { opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.product, duration: 1.6, ease: [0.26, 0.32, 0.14, 1] }} />

        {/* hanging sheet nav */}
        <Reveal at={T.nav} y={-8} className="absolute inset-x-[36px] top-0 z-40">
          <header className="sh-3 flex h-16 items-center rounded-b-[16px] bg-[var(--panel)] pl-6 pr-3">
            <a href="#" aria-label="Weekline home" className="flex items-baseline text-[20px] font-[600] tracking-[-0.035em]">week<span className="text-[var(--sub)]">line</span></a>
            <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2"><ul className="flex">{['Product', 'Teams', 'Pricing', 'Changelog'].map((l) => <li key={l}><a href="#" className="flex h-10 items-center rounded-[10px] px-3.5 text-[14.5px] text-[var(--sub)] transition-colors hover:bg-white/[0.04] hover:text-[var(--ink)]">{l}</a></li>)}</ul></nav>
            <a href="#" className="btn-soft ml-auto flex h-10 items-center rounded-full px-4 text-[14px]">Log in</a>
            <a href="#" className="btn-slide press ml-2 flex h-10 items-center rounded-full px-5 text-[14px] font-[500]"><ArrowRight aria-hidden className="arr" size={15} strokeWidth={2} /><span className="lbl">Get Weekline</span></a>
          </header>
        </Reveal>

        <main className="relative z-20 flex flex-col items-center pt-[112px] text-center">
          <Reveal at={T.chip} y={8}>
            <a href="#" className="flex h-8 items-center gap-2 rounded-full bg-white/[0.04] pl-1 pr-3 text-[13px] text-[var(--sub)] shadow-[inset_0_0_0_1px_var(--line-2)]">
              <span className="rounded-full bg-[var(--blue-tint)] px-2 py-[3px] text-[12px] font-[500] text-[var(--blue-ink)]">New</span>Focus time that defends itself<ArrowRight size={13} strokeWidth={1.75} />
            </a>
          </Reveal>
          <h1 className="mt-6 text-[68px] font-[400] leading-[1.02] tracking-[-0.035em]">
            {words.map((w, i) => <span key={w}><Word i={i} start={T.h1}>{w}</Word>{i === 1 ? <br /> : i < words.length - 1 ? ' ' : ''}</span>)}
          </h1>
          <Reveal at={T_SUB} blur className="mt-5"><p className="max-w-[560px] text-[18px] leading-[28px] text-[var(--sub)]">Weekline reads your team's calendars, protects focus time and moves meetings before they collide. You approve every move.</p></Reveal>
          <Reveal at={T_SUB + STAGGER} className="mt-8 flex items-center gap-3">
            <a href="#" className="btn-slide press flex h-11 items-center rounded-full px-6 text-[15px] font-[500]"><ArrowRight aria-hidden className="arr" size={16} strokeWidth={2} /><span className="lbl">Get Weekline free</span></a>
            <a href="#" className="btn-soft flex h-11 items-center gap-2 rounded-full pl-4 pr-5 text-[15px]"><Play size={14} strokeWidth={0} fill="currentColor" />Watch the 2-minute tour</a>
          </Reveal>
        </main>

        <Stage at={T.product} className="absolute left-[160px] top-[556px] z-10"><Week at={T.product + 0.25} /></Stage>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[90px] bg-[linear-gradient(to_bottom,transparent,var(--canvas))]" />
      </div>
    </MotionConfig>
  )
}
