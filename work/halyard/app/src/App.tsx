// Halyard landing hero, built to Marcel Kargul's dark grammar (a hairline cell grid frames the page; numbered mono labels;
// pixel art lit by one accent) with a Rico-grade product window in the first scroll. One T timeline: every delay derives
// from it, nothing shows before its moment, the field and the product loops start after the entrances.
import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Reveal, Stage, Word } from './kit'
import { STAGGER } from './motion'
import Field, { type FieldPhase } from './Field'
import Product from './Product'

const T = { nav: 0.08, label: 0.22, h1: 0.3, field: 0.45, product: 1.05 }
const T_SUB = T.h1 + 5 * STAGGER + 0.05
const X0 = 120, X1 = 1320 // content rails (Marcel: everything sits between two full-height hairlines)

function Mark() {
  // Halyard mark, route C "Sail H" (work/halyard/brand: CONCEPTS.md -> sweep.png -> draw.cjs -> present.png): the left stem is
  // the mast, the bar climbs at 14 degrees, the right stem is a sail with a full leech. One contour, continuous outer corners.
  return (
    <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden className="shrink-0" fill="#f2f2f0">
      <path d="M9.89416,93.33939c-5.89416,0 -5.89416,0 -5.89416,-5.89416v-70.77675c0,-4.60502 0,-4.60502 4.46823,-5.71908l9.88138,-2.46371c2.41339,-0.60172 4.03109,-1.00506 5.11545,-1.00506c2.20463,0 2.20463,1.66723 2.20463,6.72414v32.54476l30.90506,-7.25223c1.69223,-0.3971 2.90184,-0.68095 3.76646,-0.74246v-32.09425c24.00128,14.05948 35.65879,43.91581 35.65879,68.38338c0,4.11779 -0.33018,8.08295 -0.98727,11.7945c-6.50091,5.41742 -26.00364,6.50091 -34.67152,6.50091v-41.23138c-0.60739,0.19155 -1.38503,0.37403 -2.38063,0.60766l-32.29088,7.57743v27.15213c0,5.89416 0,5.89416 -5.89416,5.89416z" />
    </svg>
  )
}

export default function App() {
  const [phase, setPhase] = useState<FieldPhase>('calm')
  const onPhase = useCallback((p: FieldPhase) => setPhase(p), [])
  const words = ['Incidents', 'Fixed', 'Before', 'You', 'Wake']
  const alarm = phase === 'incident' || phase === 'scanning'
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* the grid: two full-height rails; rows add their own rules */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 z-0 w-px bg-[var(--rule)]" style={{ left: X0 }} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 z-0 w-px bg-[var(--rule)]" style={{ left: X1 }} />

        {/* nav: one ruled row of cells */}
        <Reveal at={T.nav} y={-6} className="relative z-30">
          <header className="flex h-16 border-b border-[var(--rule)]" style={{ marginLeft: X0, width: X1 - X0 }}>
            <a href="#" aria-label="Halyard home" className="flex w-[240px] items-center gap-[6px] border-r border-[var(--rule)] pl-6"><Mark /><span className="text-[20px] font-[600] tracking-[-0.03em]">Halyard</span></a>
            <nav aria-label="Main" className="flex flex-1 items-center justify-center">
              <ul className="flex gap-1">{['Product', 'Agents', 'Pricing', 'Docs'].map((l, i) => (
                <li key={l}><a href="#" className="group flex h-10 items-center gap-2 rounded-[6px] px-3.5 text-[14px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]"><span className="mono text-[11px] text-[var(--soft)] group-hover:text-[var(--amber-ink)]">0{i + 1}</span>{l}</a></li>
              ))}</ul>
            </nav>
            <div className="flex w-[300px] items-center justify-end gap-2 border-l border-[var(--rule)] pr-4">
              <a href="#" className="flex h-10 items-center px-3 text-[14px] text-[var(--sub)] hover:text-[var(--ink)]">Log in</a>
              <a href="#" className="btn-mono press flex h-9 items-center px-4">Start on-call</a>
            </div>
          </header>
        </Reveal>

        <main>
        {/* dot-matrix band (Marcel's texture strip), faded at both ends, with a live status line */}
        <section aria-label="Sample system status" className="relative z-10 flex h-12 items-center justify-center border-b border-[var(--rule)]" style={{ marginLeft: X0, width: X1 - X0 }}>
          <div aria-hidden className="dots absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)]" />
          <Reveal at={T.label} y={4} className="relative">
            <span className="mono flex items-center gap-2 rounded-[4px] bg-[var(--canvas)] px-2.5 py-1 text-[11px] tracking-[0.06em] text-[var(--sub)]">
              <span className={`size-1.5 rounded-full transition-colors duration-500 ${alarm ? 'bg-[var(--amber)]' : 'bg-[#6b6b6b]'}`} />
              {phase === 'incident' ? 'SAMPLE · CHECKOUT-API P99 2.4S' : phase === 'scanning' ? 'SAMPLE · AGENT INVESTIGATING' : 'SAMPLE · ALL SERVICES NOMINAL'}
            </span>
          </Reveal>
        </section>

        {/* hero row: copy cell | field cell */}
        <div className="relative z-10 flex border-b border-[var(--rule)]" style={{ marginLeft: X0, width: X1 - X0 }}>
          <div className="flex w-[560px] flex-col border-r border-[var(--rule)] px-12 pb-9 pt-12">
            <Reveal at={T.label} y={6}><span className="mono flex items-center gap-2.5 text-[12px] tracking-[0.04em] text-[var(--sub)]"><span className="rounded-[3px] px-1.5 py-[3px] leading-none shadow-[inset_0_0_0_1px_var(--rule-2)]">01</span>AI on-call engineer</span></Reveal>
            <h1 className="mt-5 text-[60px] font-[500] leading-[1.02] tracking-[-0.032em]">
              {words.map((w, i) => <span key={w}><Word i={i} start={T.h1}>{w}</Word>{i === 1 ? <br /> : i < words.length - 1 ? ' ' : ''}</span>)}
            </h1>
            <Reveal at={T_SUB} blur className="mt-5"><p className="max-w-[440px] text-[17px] leading-[27px] text-[var(--sub)]">Halyard watches your services, finds the cause and drafts the fix. It asks before it touches production.</p></Reveal>
            <Reveal at={T_SUB + STAGGER} className="mt-8 flex items-center gap-5">
              <a href="#" className="btn-mono press flex h-10 items-center px-5">Start on-call free</a>
              <a href="#" className="group flex h-10 items-center gap-1.5 text-[14.5px] text-[var(--ink)]">See a sample incident<ArrowRight size={15} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" /></a>
            </Reveal>
            <Reveal at={T_SUB + 2 * STAGGER} className="mt-auto pt-10">
              <ul className="grid grid-cols-3 border-t border-[var(--rule)]">
                {[['Reads', 'metrics, logs, traces, deploys'], ['Asks', 'before anything in production'], ['Writes', 'the timeline and postmortem']].map(([k, v], i) => (
                  <li key={k} className={`pt-4 ${i ? 'border-l border-[var(--rule)] pl-4' : 'pr-4'}`}><div className="mono text-[11px] uppercase tracking-[0.06em] text-[var(--sub)]">{k}</div><div className="mt-1.5 text-[13.5px] leading-[19px] text-[var(--sub)]">{v}</div></li>
                ))}
              </ul>
            </Reveal>
          </div>
          <figure className="relative m-0 flex flex-1 items-center justify-center py-10">
            <div aria-hidden className="dots absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_50%,transparent_40%,#000)]" />
            <span className="mono absolute left-5 top-4 text-[11px] tracking-[0.04em] text-[var(--sub)]">fig. 1 · service map, sample</span>
            <Field at={T.field} onPhase={onPhase} />
          </figure>
        </div>

        {/* product row */}
        <section aria-label="Sample incident workspace" className="relative z-10 border-b border-[var(--rule)] px-6 pb-6 pt-6" style={{ marginLeft: X0, width: X1 - X0 }}>
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="mono flex items-center gap-2.5 text-[12px] tracking-[0.04em] text-[var(--sub)]"><span className="rounded-[3px] px-1.5 py-[3px] leading-none shadow-[inset_0_0_0_1px_var(--rule-2)]">02</span>The incident, worked end to end</span>
            <span className="mono text-[11px] text-[var(--sub)]">sample workspace</span>
          </div>
          <Stage at={T.product}><Product at={T.product + 0.2} /></Stage>
        </section>
        </main>
        <div className="h-24" />
      </div>
    </MotionConfig>
  )
}
