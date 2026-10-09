// Ferry hero: split layout (Lightfield grammar). Copy vertically centred on a plain canvas; the real product sails in from
// the right edge, live: replies arrive, the AI drafts, a cursor approves, rows book, KPIs tick; a status pill narrates.
// Default: one grain-gradient stage behind the product (Folk / Cursor); ?bg=plain drops it. T for entrances, SCRIPT for the story.
import { useState } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { Sailboat } from '@phosphor-icons/react'
import './ferry/tokens.css'
import { Frame, Reveal, RollingNumber } from './kit'
import { ease, spring } from './motion'
import { Product, StatusPill, useLive } from './hero/Story'

const T = { nav: 0.05, copy: 0.12, window: 0.35 }
const LINKS = ['Product', 'Agents', 'Pricing', 'Changelog']
// film grain for the stage panel (inline SVG noise, no asset)
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.4 0 0 0 0 0.5 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

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
  const s = useLive()
  const stage = new URLSearchParams(location.search).get('bg') !== 'plain' // the product dissolves into the stage (or the canvas) at the bottom
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {stage && (
          // Folk / Cursor grammar: the only art on the page is one stage panel directly behind the product
          <motion.div aria-hidden initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ x: { delay: T.window - 0.05, duration: 1.2, ease: ease.reveal }, opacity: { delay: T.window - 0.05, duration: 0.7, ease: ease.outQuint } }}
            className="absolute left-[600px] top-[118px] h-[900px] w-[1000px] overflow-hidden rounded-[28px] shadow-[inset_0_0_0_1px_rgba(28,40,64,0.06)]"
            style={{ background: 'radial-gradient(120% 90% at 20% 0%, #f3f7ff 0%, rgba(243,247,255,0) 55%), linear-gradient(165deg, #dce7fb 0%, #c7d8f8 48%, #aec6f3 100%)' }}>
            <div className="absolute inset-0 opacity-[0.22] mix-blend-multiply" style={{ backgroundImage: GRAIN }} />
          </motion.div>
        )}

        {/* founder-approved texture: a fine dot grid on the copy side only, cleared behind the type, gone before the stage */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1 }}
          className="pointer-events-none absolute inset-y-0 left-0 w-[640px] bg-[radial-gradient(rgba(28,40,64,0.17)_1px,transparent_1.2px)] bg-[size:16px_16px] bg-[position:8px_8px] [mask-image:radial-gradient(ellipse_62%_46%_at_38%_50%,transparent_42%,#000_100%),linear-gradient(to_right,#000_70%,transparent)] [mask-composite:intersect]" />

        <Nav />

        <main className="pointer-events-none absolute left-[80px] top-[232px] z-20 w-[540px] [&>*]:pointer-events-auto">
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
          {/* product specs, not customer results: nothing here claims proof */}
          <Reveal at={T.copy + 0.3} y={10}>
            <dl className="mt-14 grid w-[468px] grid-cols-3">
              {[
                { v: <RollingNumber value="38s" at={T.copy + 0.35} />, l: 'to draft a reply' },
                { v: '24/7', l: 'inbox coverage' },
                { v: '1 click', l: 'to approve and book' },
              ].map((x, i) => (
                <div key={i} className={`${i ? 'border-l border-[#e3e5e9] pl-5' : 'pr-5'} ${i === 1 ? 'pr-5' : ''}`}>
                  <dt className="sr-only">{x.l}</dt>
                  <dd className="tnum font-[family-name:var(--font-display)] text-[30px] font-[600] leading-[1.1] tracking-[-0.045em] text-[var(--ink)]">{x.v}</dd>
                  <dd className="mt-2 whitespace-nowrap text-[14px] leading-[20px] tracking-[-0.01em] text-[var(--soft)]">{x.l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </main>

        <Reveal at={T.window + 1.25} y={8} className="absolute left-[640px] top-[140px] z-20"><StatusPill pill={s.pill} /></Reveal>

        <motion.section initial={{ opacity: 0.01, x: 64 }} animate={{ opacity: 1, x: 0 }}
          transition={{ x: { delay: T.window, duration: 1.2, ease: ease.reveal }, opacity: { delay: T.window, duration: 0.6, ease: ease.outQuint } }}
          className="absolute left-[640px] top-[198px] z-10 [mask-image:linear-gradient(to_bottom,#000_540px,transparent_700px)]" role="img" aria-label="Ferry product, sample data: new replies arrive, the AI drafts answers, two are approved and booked as meetings">
          {/* a picture of the product, not a second app: inert keeps its links out of the tab order.
              zoom 0.82 shows the dashboard at Lightfield/Attio hero scale (more of it, ~11.5px text) without a blurry transform */}
          <div inert><Frame inner={16} pad={6} height={856}><div style={{ zoom: 0.82, width: 1240, height: 1044 }}><Product s={s} intro={T.window + 0.45} /></div></Frame></div>
        </motion.section>

      </div>
    </MotionConfig>
  )
}
