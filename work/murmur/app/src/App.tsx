// Murmur dark hero, built to knowledge/web/basit-craft.md (Basit A. Khan, measured): one rendered light field lit from one
// corner, grain only inside the light, the light arriving last with a scale settle; display type at -0.05em, weight 500;
// a small subtitle close under the headline; 52px glossy pills; one tilted device sitting in the light. One T timeline.
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Reveal, Word } from './kit'
import { STAGGER } from './motion'
import Phone from './Phone'

const T = { nav: 0.0, chip: 0.15, h1: 0.2, phone: 0.7, light: 0.9 }
const T_SUB = T.h1 + 6 * STAGGER + 0.15

function Mark() {
  // placeholder mark: rising voice bars (logo pass pending)
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden className="shrink-0">
      <defs><linearGradient id="mk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#9fb6ff" /></linearGradient></defs>
      <rect x="2" y="9" width="4" height="6" rx="2" fill="url(#mk)" /><rect x="8" y="5" width="4" height="14" rx="2" fill="url(#mk)" /><rect x="14" y="2" width="4" height="20" rx="2" fill="url(#mk)" /><rect x="20" y="8" width="2.5" height="8" rx="1.25" fill="url(#mk)" opacity="0.6" />
    </svg>
  )
}

/** the light field: one source in the upper right, a volumetric beam with streaks, grain masked to the lit area only */
function Light() {
  const still = useReducedMotion()
  const streaks = [
    { top: 230, h: 30, o: 0.5, b: 16 }, { top: 318, h: 5, o: 0.85, b: 3 }, { top: 372, h: 46, o: 0.32, b: 24 },
    { top: 440, h: 3, o: 0.9, b: 2 }, { top: 482, h: 16, o: 0.5, b: 10 }, { top: 560, h: 70, o: 0.22, b: 34 },
  ]
  const beam = 'radial-gradient(48% 42% at 72% 38%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 75%)'
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0 origin-[78%_30%]" initial={still ? false : { opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: T.light, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}>
      <div className="absolute left-[600px] top-[-160px] h-[980px] w-[1180px] rotate-[-32deg] rounded-[50%] bg-[radial-gradient(closest-side,rgba(232,240,255,0.95),rgba(120,160,255,0.65)_30%,rgba(50,90,240,0.28)_58%,transparent_78%)] blur-[34px]" />
      <div className="absolute left-[540px] top-[-80px] h-[1040px] w-[1260px] rotate-[-32deg]">
        {streaks.map((s, i) => <span key={i} className="absolute inset-x-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(200,218,255,0.95)_45%,rgba(120,160,255,0.6)_72%,transparent)]" style={{ top: s.top, height: s.h, opacity: s.o, filter: `blur(${s.b}px)` }} />)}
      </div>
      <div className="absolute left-[760px] top-[40px] h-[820px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(150,180,255,0.42),rgba(70,110,255,0.2)_45%,transparent_75%)] blur-[50px]" />
      <div className="absolute inset-x-0 bottom-0 h-[460px] bg-[radial-gradient(60%_100%_at_78%_100%,rgba(60,100,255,0.32),transparent_70%)]" />
      <div className="grain absolute inset-0 opacity-[0.9]" style={{ WebkitMaskImage: beam, maskImage: beam }} />
    </motion.div>
  )
}

export default function App() {
  const still = useReducedMotion()
  const l1 = ['Record', 'The', 'Call.'], l2 = ['Keep', 'What', 'Matters.']
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <Light />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_75%_at_22%_52%,rgba(3,4,9,0.88),transparent_62%)]" />

        <Reveal at={T.nav} y={-8} className="absolute inset-x-0 top-0 z-40">
          <header className="mx-auto flex h-[92px] w-[1312px] items-center">
            <a href="#" aria-label="Murmur home" className="flex items-center gap-[7px]"><Mark /><span className="display text-[21px] font-[600] tracking-[-0.04em]">murmur</span></a>
            <nav aria-label="Main" className="glass absolute left-1/2 -translate-x-1/2 rounded-full p-1">
              <ul className="flex">{['Home', 'Features', 'Pricing', 'Teams', 'Blog'].map((l, i) => <li key={l}><a href="#" className={`flex h-10 items-center rounded-full px-4 text-[14px] transition-colors ${i === 0 ? 'bg-white/[0.08] text-[var(--ink)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]' : 'text-[var(--sub)] hover:text-[var(--ink)]'}`}>{l}</a></li>)}</ul>
            </nav>
            <a href="#" className="btn-ink ml-auto flex h-11 items-center rounded-full px-5 text-[14px]">Sign in</a>
            <a href="#" className="btn-ice press ml-2 flex h-11 items-center rounded-full px-5 text-[14px] font-[600]">Get the app</a>
          </header>
        </Reveal>

        <main className="absolute left-[120px] top-[214px] z-20 w-[700px]">
          <Reveal at={T.chip} y={8}>
            <a href="#" className="glass flex h-8 w-fit items-center gap-2 rounded-full pl-1 pr-3 text-[13px] text-[var(--sub)]">
              <span className="rounded-full bg-[linear-gradient(180deg,#6d93ff,#3d64f0)] px-2.5 py-[3px] text-[12px] font-[600] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">New</span>Murmur for Android is here<ArrowRight size={13} strokeWidth={1.75} />
            </a>
          </Reveal>
          <h1 className="display mt-7 text-[84px] font-[500] leading-[0.98] tracking-[-0.05em]">
            <span className="block">{l1.map((w, i) => <span key={w}><Word i={i} start={T.h1}>{w}</Word>{i < l1.length - 1 ? ' ' : ''}</span>)}</span>
            <span className="block bg-[linear-gradient(90deg,#d3d9ec_0%,#5f6785_90%)] bg-clip-text pb-[0.06em] text-transparent">{l2.map((w, i) => <span key={w}><Word i={i + 3} start={T.h1}>{w}</Word>{i < l2.length - 1 ? ' ' : ''}</span>)}</span>
          </h1>
          <Reveal at={T_SUB} blur className="mt-5"><p className="max-w-[540px] text-balance text-[16px] leading-[25px] text-[var(--sub)]">Murmur listens to your calls, writes the notes and pulls out who owes what by when. Nothing to rewatch, nothing to type up.</p></Reveal>
          <Reveal at={T_SUB + STAGGER} className="mt-9 flex items-center gap-3">
            <a href="#" className="btn-ice press flex h-[52px] items-center rounded-full px-8 text-[16px] font-[600]">Download free</a>
            <a href="#" className="btn-ink flex h-[52px] items-center gap-2 rounded-full px-7 text-[16px]">See how it works<ArrowRight size={16} strokeWidth={1.75} /></a>
          </Reveal>
          <Reveal at={T_SUB + 2 * STAGGER} className="mt-14"><p className="text-[13.5px] text-[var(--soft)]">Works on any call, online or in the room · iOS and Android</p></Reveal>
        </main>

        <div className="absolute left-[890px] top-[118px] z-10" style={{ perspective: 1800 }}>
          <motion.div style={{ transformStyle: 'preserve-3d' }}
            initial={still ? false : { opacity: 0, y: 110, rotateX: 16, rotateY: -32, rotateZ: 24 }} animate={{ opacity: 1, y: 0, rotateX: 10, rotateY: -20, rotateZ: 14 }} transition={{ delay: T.phone, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}>
            <Phone at={T.phone + 0.8} />
          </motion.div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[110px] bg-[linear-gradient(to_bottom,transparent,var(--canvas))]" />
      </div>
    </MotionConfig>
  )
}
