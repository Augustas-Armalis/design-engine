// Palisade hero (Meridian system, dark recipe "Phosphor forest"). Layout: utility strip + main bar nav, an editorial serif
// headline left with a quiet frameworks column right, then a bento row of three live product tiles bleeding off the bottom,
// lit from below. One conceptual reveal: a failing control is caught and fixed while evidence streams and readiness rolls up.
import { MotionConfig } from 'motion/react'
import { ArrowRight, Check, ShieldCheck } from '@phosphor-icons/react'
import { Reveal } from './kit'
import Tiles from './Tiles'

const T = { nav: 0.05, copy: 0.12, tiles: 0.5 }
const LINKS = ['Platform', 'Frameworks', 'Pricing', 'Docs']
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>")`

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* floor light under the product only (Modal recipe), feathered into the canvas, grain against banding */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[560px] bg-[radial-gradient(50%_100%_at_50%_100%,oklch(0.34_0.08_150/0.75),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[560px] opacity-[0.05] mix-blend-soft-light" style={{ backgroundImage: GRAIN }} />

        {/* nav G06: utility strip + main bar */}
        <Reveal at={T.nav} y={-6} className="absolute inset-x-0 top-0 z-40">
          <div className="flex h-9 items-center border-b border-[var(--line)] bg-[#060a07] px-20 text-[12.5px]">
            <a href="#" className="flex items-center gap-1.5 text-[var(--sub)] transition-colors hover:text-[var(--ink)]"><span className="rounded-[4px] bg-[rgb(86_220_133/0.14)] px-1.5 py-px text-[11px] text-[var(--mint)] shadow-[inset_0_0_0_1px_rgb(86_220_133/0.22)]">New</span>Continuous ISO 27001 monitoring<ArrowRight size={12} /></a>
            <div className="ml-auto flex items-center gap-1">{['Trust center', 'Status', 'Contact sales'].map((l) => <a key={l} href="#" className="flex h-9 items-center px-3 text-[var(--sub)] transition-colors hover:text-[var(--ink)]">{l}</a>)}</div>
          </div>
          <header className="flex h-[68px] items-center px-20">
            <a href="#" aria-label="Palisade home" className="flex items-center gap-2">
              <ShieldCheck size={24} weight="fill" className="text-[var(--mint)]" />
              <span className="font-[family-name:var(--font-display)] text-[23px] font-[600] tracking-[-0.02em]">Palisade</span>
            </a>
            <nav aria-label="Main" className="ml-12"><ul className="flex">
              {LINKS.map((l) => <li key={l}><a href="#" className="flex h-10 items-center px-3.5 text-[15px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">{l}</a></li>)}
            </ul></nav>
            <a href="#" className="ml-auto flex h-10 items-center px-4 text-[15px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">Sign in</a>
            <a href="#" className="btn-forest press flex h-10 items-center rounded-[10px] px-4 text-[15px] font-[500]">Book a demo</a>
          </header>
        </Reveal>

        <main className="pointer-events-none absolute inset-x-20 top-[164px] z-20 flex items-start justify-between [&>*]:pointer-events-auto">
          <div>
            <Reveal at={T.copy} y={14} blur>
              <h1 className="font-[family-name:var(--font-display)] text-[76px] font-[450] leading-[1.02] tracking-[-0.02em] [font-variation-settings:'opsz'_60]">Pass Your Audit<br />Before It Starts</h1>
            </Reveal>
            <Reveal at={T.copy + 0.08} y={14} blur>
              <p className="mt-6 text-[18px] leading-[28px] text-[var(--sub)]">Palisade watches every control, collects the evidence and fixes drift,<br />so compliance stops eating a quarter of your year.</p>
            </Reveal>
            <Reveal at={T.copy + 0.16} y={14}>
              <div className="mt-8 flex items-center gap-7">
                <a href="#" className="btn-forest press flex h-11 items-center rounded-[10px] px-5 text-[16px] font-[500]">Start your audit plan</a>
                <a href="#" className="btn-underline text-[16px]">Talk to a specialist <span className="arr">→</span></a>
              </div>
            </Reveal>
          </div>
          <Reveal at={T.copy + 0.24} y={10} className="mt-3 w-[260px]">
            <div className="text-[12.5px] text-[var(--soft)]">Frameworks covered</div>
            <ul className="mt-3 space-y-2.5 border-t border-[var(--line)] pt-3.5 text-[15px]">
              {['SOC 2 Type I and II', 'ISO 27001', 'HIPAA', 'GDPR'].map((f) => <li key={f} className="flex items-center gap-2.5"><Check size={14} weight="bold" className="text-[var(--mint)]" />{f}</li>)}
            </ul>
          </Reveal>
        </main>

        <div className="absolute left-20 top-[524px] z-10" role="img" aria-label="Palisade product tiles with sample data: controls, live evidence collection and audit readiness">
          <div inert><Tiles intro={T.tiles} /></div>
        </div>
      </div>
    </MotionConfig>
  )
}
