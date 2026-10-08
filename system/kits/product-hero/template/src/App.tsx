// Scaffolded from system/kits/product-hero. Replace everything brand-specific; keep the timeline discipline:
// one T object, every delay derived from it, nothing visible before its moment, loops start after entrances.
import { MotionConfig } from 'motion/react'
import { Frame, PillNav, Rails, Reveal, Stage, Word } from './kit'
import { STAGGER } from './motion'

const T = { nav: 0.12, h1: 0.3, dash: 0.75 }
const T_SUB = T.h1 + 4 * STAGGER + 0.05

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden">
        <Rails />
        <header className="absolute inset-x-[144px] top-[22px] z-40 flex h-11 items-center">
          <Reveal at={T.nav} y={-10}><span className="text-[21px] font-[600] tracking-[-0.03em]">__NAME__</span></Reveal>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2"><Reveal at={T.nav + STAGGER} y={-10}><PillNav links={['Product', 'Pricing', 'Docs']} active="Product" /></Reveal></nav>
          <Reveal at={T.nav + 2 * STAGGER} y={-10} className="ml-auto"><a href="#" className="btn-ink flex h-10 items-center rounded-[12px] px-4 text-[14px] font-[550]">Start free</a></Reveal>
        </header>
        <main className="pointer-events-none relative z-20 flex flex-col items-center pt-[150px] text-center [&>*]:pointer-events-auto">
          <h1 className="text-[72px] font-[550] leading-[1.04] tracking-[-0.045em]">
            <Word i={0}>Two</Word> <Word i={1}>Line</Word><br /><Word i={2}>Headline</Word> <Word i={3}>Here</Word>
          </h1>
          <Reveal at={T_SUB} blur className="mt-[18px] text-[18px] leading-7 text-[var(--sub)]"><p>One balanced line of subtitle.</p></Reveal>
        </main>
        <Stage at={T.dash} className="absolute left-[152px] top-[476px] w-[1136px]">
          <Frame height={600}><div className="grid h-full place-items-center text-[var(--soft)]">Product UI goes here (a real workflow, labelled sample data)</div></Frame>
        </Stage>
      </div>
    </MotionConfig>
  )
}
