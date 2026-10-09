// Ferry hero: split layout. Copy on the left over a quiet sea chart; the real product sails in from the right edge at 1:1
// and makes one crossing (reply in, meeting out) while the steps on the left light up in sync. One clock: T for entrances,
// BEAT (hero/Story.tsx) for the story.
import { useState } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { Sailboat } from '@phosphor-icons/react'
import './ferry/tokens.css'
import { Frame, Reveal } from './kit'
import { ease, spring } from './motion'
import Field from './hero/Field'
import { Draft, Product, Steps, useStory } from './hero/Story'

const T = { field: 0, nav: 0.05, copy: 0.12, window: 0.35, steps: 0.6 }
const LINKS = ['Product', 'Agents', 'Pricing', 'Changelog']
// chart soundings (depths), placed only where the field shows: the strip above the product and the gutter beside the copy
const SOUNDINGS: [number, number, string][] = [
  [700, 106, '14'], [818, 92, '17'], [948, 116, '21'], [1086, 96, '19'], [1214, 114, '24'], [1352, 98, '22'],
  [606, 214, '12'], [588, 330, '11'], [604, 448, '9'], [470, 560, '7'], [520, 612, '8'],
]

function Nav() {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <header className="absolute inset-x-[80px] top-[22px] z-40 flex h-[44px] items-center">
      <Reveal at={T.nav} y={-8}>
        <div onMouseLeave={() => setHover(null)} className="flex h-[44px] items-center rounded-[14px] bg-white/80 py-[5px] pl-4 pr-[5px] shadow-[var(--shadow-ring)] backdrop-blur-md">
          <a href="#" aria-label="Ferry home" className="flex items-center gap-1.5 pr-4">
            <Sailboat size={22} weight="fill" className="text-[var(--accent)]" />
            <span className="font-[family-name:var(--font-display)] text-[21px] font-[650] tracking-[-0.045em]">Ferry</span>
          </a>
          <span aria-hidden className="mr-2 h-5 w-px bg-[var(--line)]" />
          <nav aria-label="Main"><ul className="flex items-center gap-0.5">
            {LINKS.map((l) => (
              <li key={l} className="relative">
                {hover === l && <motion.span layoutId="nav-hover" transition={spring} className="absolute inset-0 rounded-[10px] bg-[var(--weak)]" />}
                <a href="#" onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHover(l) }} onFocus={() => setHover(l)}
                  className={`relative flex h-[34px] items-center rounded-[10px] px-[11px] text-[15px] font-[500] tracking-[-0.015em] transition-colors duration-200 ${hover === l ? 'text-[var(--ink)]' : 'text-[var(--sub)]'}`}>{l}</a>
              </li>
            ))}
          </ul></nav>
        </div>
      </Reveal>
      <Reveal at={T.nav + 0.07} y={-8} className="ml-auto">
        <div className="flex items-center gap-1">
          <a href="#" className="flex h-10 items-center rounded-[12px] px-4 text-[15px] font-[500] tracking-[-0.015em] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">Log in</a>
          <a href="#" className="btn-ink press flex h-10 items-center rounded-[12px] px-4 text-[15px] font-[550] tracking-[-0.015em]">Start free</a>
        </div>
      </Reveal>
    </header>
  )
}

export default function App() {
  const p = useStory()
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.field, duration: 0.8 }} className="absolute inset-0"><Field /></motion.div>
        {/* chart soundings: decorative chart ink, so they live in an aria-hidden SVG rather than as page text */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 1440 900">
          {SOUNDINGS.map(([x, y, v], i) => (
            <motion.text key={i} x={x} y={y + 9} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.04, duration: 0.6 }}
              className="font-mono text-[10px] [font-variant-numeric:tabular-nums]" fill="rgba(38,109,240,0.5)">{v}</motion.text>
          ))}
        </svg>

        <Nav />

        <main className="pointer-events-none absolute left-[80px] top-[188px] z-20 w-[540px] [&>*]:pointer-events-auto">
          <Reveal at={T.copy} y={14} blur>
            <h1 className="font-[family-name:var(--font-display)] text-[74px] font-[600] leading-[0.98] tracking-[-0.052em] text-[var(--ink)]">Turn Replies<br />Into Meetings</h1>
          </Reveal>
          <Reveal at={T.copy + 0.06} y={14} blur>
            <p className="mt-6 text-[18px] leading-[28px] tracking-[-0.012em] text-[var(--sub)]">Your AI SDR handles every warm reply in one inbox.<br />Approve a draft and the call lands on your calendar.</p>
          </Reveal>
          <Reveal at={T.copy + 0.12} y={14}>
            <div className="mt-9 flex items-center gap-6">
              <a href="#" className="btn-ink press flex h-11 items-center rounded-[14px] px-5 text-[18px] font-[550] tracking-[-0.54px]">Start free</a>
              <a href="#" className="text-[18px] font-[500] tracking-[-0.54px] text-[var(--ink)] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-[var(--ink)]">Book a demo</a>
            </div>
          </Reveal>
        </main>

        <Reveal at={T.steps} y={10} className="absolute left-[80px] top-[606px] z-20"><Steps p={p} /></Reveal>

        <motion.section initial={{ opacity: 0.01, x: 64 }} animate={{ opacity: 1, x: 0 }}
          transition={{ x: { delay: T.window, duration: 1.2, ease: ease.reveal }, opacity: { delay: T.window, duration: 0.6, ease: ease.outQuint } }}
          className="absolute left-[640px] top-[148px] z-10 w-[1180px] [mask-image:linear-gradient(to_bottom,#000_660px,transparent_820px)]" role="img" aria-label="Ferry product, sample data: a new reply from Ines Carvalho is drafted, approved and booked as a meeting">
          {/* a picture of the product, not a second app: inert keeps its links out of the tab order and under the card */}
          <div inert><Frame inner={16} pad={6} height={840}><Product p={p} /></Frame></div>
        </motion.section>

        {/* the card exists only from its beat, so nothing half-faded sits in the page before the story reaches it */}
        {p >= 2 && <div className="absolute left-[548px] top-[536px] z-30"><Draft p={p} /></div>}
      </div>
    </MotionConfig>
  )
}
