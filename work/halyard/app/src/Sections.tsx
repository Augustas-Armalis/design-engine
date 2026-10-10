// Halyard sections 04-05 and the footer, built to knowledge/web/section-anatomy.md and footers.md inside Marcel's cell grid:
// 04 how it works (numbered steps on one incident's timeline), 05 FAQ (heading-left split + accordion, SA FAQ variant),
// closing CTA merged into the footer (7 of 43 sites; the page still ends on a CTA), footer layout A (brand column +
// 4 link columns, ~24 links, 14px links at ~60% ink on a 30px pitch, 14/500 column heads), a live status pill (19% of
// footers; on-brand for an on-call product) and a giant wordmark (12%) drawn from the hero field's own pixel cells.
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, Plus } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const Label = ({ n, children }: { n: string; children: ReactNode }) => (
  <span className="mono flex items-center gap-2.5 text-[12px] tracking-[0.04em] text-[var(--sub)]"><span className="rounded-[3px] px-1.5 py-[3px] leading-none shadow-[inset_0_0_0_1px_var(--rule-2)]">{n}</span>{children}</span>
)

/* 04: five steps of one incident, a rail fills as the section enters */
export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const shown = useInView(ref, { once: true, margin: '0px 0px -25% 0px' })
  const reduce = useReducedMotion()
  const steps = [
    ['T+0:00', 'Detect', 'An alert fires. Halyard opens the incident and pulls the last two hours of signals.'],
    ['T+0:40', 'Investigate', 'It reads metrics, logs, traces and deploys, and narrows the cause to one change.'],
    ['T+2:14', 'Ask', 'It pages the one person on call with the cause, the fix and what the fix touches.'],
    ['T+2:50', 'Fix', 'After approval it rolls back, watches recovery, and keeps an undo open for 30 minutes.'],
    ['T+9:00', 'Report', 'It drafts the status update and the postmortem while the details are still fresh.'],
  ]
  return (
    <section ref={ref} aria-labelledby="how-h">
      <div className="border-b border-[var(--rule)] px-12 pb-12 pt-14">
        <Label n="04">How it works</Label>
        <h2 id="how-h" className="mt-5 text-[40px] font-[500] leading-[1.08] tracking-[-0.025em]">Nine Minutes, Start To Postmortem</h2>
        <p className="mt-4 max-w-[540px] text-[16px] leading-[26px] text-[var(--sub)]">One sample incident, from the first alert to the written report. You are in it for about thirty seconds.</p>
      </div>
      <div className="relative grid grid-cols-5">
        <motion.div aria-hidden className="absolute left-0 top-0 h-px w-full origin-left bg-[var(--amber)]" initial={reduce ? false : { scaleX: 0 }} animate={shown ? { scaleX: 1 } : undefined} transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }} />
        {steps.map(([t, k, d], i) => (
          <motion.div key={k} className={`relative px-7 pb-10 pt-8 ${i ? 'border-l border-[var(--rule)]' : ''}`} initial={reduce ? false : { opacity: 0.01, y: 12 }} animate={shown ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.15 + i * 0.42, duration: 0.6, ease }}>
            <span aria-hidden className={`absolute -top-[4px] left-7 size-2 rounded-full ${i === 2 ? 'bg-[var(--amber)] shadow-[0_0_0_4px_rgba(245,165,36,0.15)]' : 'bg-[#f2f2f0]'}`} />
            <div className="mono text-[11.5px] text-[var(--sub)]">{t}</div>
            <h3 className="mt-3 text-[19px] font-[500] leading-[1.25] tracking-[-0.01em]">{k}{i === 2 && <span className="mono ml-2 align-middle text-[11.5px] font-[400] text-[var(--amber-ink)]">you</span>}</h3>
            <p className="mt-2 text-[14px] leading-[22px] text-[var(--sub)]">{d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* 05: FAQ, heading left, accordion right; real buttons with aria-expanded */
export function Faq() {
  const qs = [
    ['What can Halyard do without asking?', 'Only what your policy allows. Out of the box it can read everything and change nothing; you choose which actions run on their own (restarting pods, scaling replicas) and which always wait for a person.'],
    ['Where does it run?', 'In your cloud account, next to your services. Signals are read in place; nothing leaves your network unless you connect a hosted model.'],
    ['Which tools does it read from?', 'Your metrics, logs, traces and deploy history, through the integrations you already use. If a source is missing, the investigation says so instead of guessing.'],
    ['Who gets paged?', 'The person on call in your existing rotation, once, with the cause and the proposed fix attached. Escalation follows your rules.'],
    ['Can I undo what it did?', 'Every change it makes keeps an undo window, 30 minutes by default, and lands in the incident timeline with who approved it.'],
    ['How long does setup take?', 'Most teams connect their first service in an afternoon: one read-only role, one rotation, one policy.'],
  ]
  const [open, setOpen] = useState(0)
  return (
    <section aria-labelledby="faq-h" className="flex">
      <div className="w-[480px] shrink-0 border-r border-[var(--rule)] px-12 pb-14 pt-14">
        <Label n="05">Questions</Label>
        <h2 id="faq-h" className="mt-5 text-[40px] font-[500] leading-[1.08] tracking-[-0.025em]">Before You<br />Hand Over The Pager</h2>
        <a href="#" className="mt-6 inline-flex h-10 items-center gap-1.5 text-[14.5px] text-[var(--ink)]">Read the security notes<ArrowRight size={15} strokeWidth={1.75} /></a>
      </div>
      <dl className="flex-1 py-6">
        {qs.map(([q, a], i) => (
          <div key={q} className={`px-12 ${i ? 'border-t border-[var(--rule)]' : ''}`}>
            <dt>
              <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)} className="flex min-h-[62px] w-full items-center gap-4 py-3 text-left text-[17px] font-[500] tracking-[-0.005em]">
                <span className="mono w-6 text-[11.5px] font-[400] text-[var(--sub)]">0{i + 1}</span><span className="flex-1">{q}</span>
                <Plus size={18} strokeWidth={1.6} className={`shrink-0 text-[var(--sub)] transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
              </button>
            </dt>
            <motion.dd id={`faq-${i}`} initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
              <p className="max-w-[560px] pb-5 pl-10 text-[16px] leading-[25px] text-[var(--sub)]">{a}</p>
            </motion.dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* pixel font (5x7) for the giant wordmark: the hero field's own cell */
const GLYPH: Record<string, string[]> = {
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
}
function PixelWord({ word = 'HALYARD', width = 1104 }: { word?: string; width?: number }) {
  const cols = word.length * 6 - 1, P = width / cols, C = P * 0.78
  const ref = useRef<SVGSVGElement>(null)
  const shown = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [scan, setScan] = useState(-99)
  useEffect(() => {
    if (!shown || reduce) return
    const t0 = performance.now()
    const id = setInterval(() => { const t = ((performance.now() - t0) / 1000) % 7; setScan(t < 3.2 ? (t / 3.2) * (cols + 12) - 6 : -99) }, 50)
    return () => clearInterval(id)
  }, [shown, reduce, cols])
  const cells: { x: number; y: number; c: number }[] = []
  ;[...word].forEach((ch, li) => GLYPH[ch].forEach((row, r) => [...row].forEach((v, c) => { if (v === '1') cells.push({ x: (li * 6 + c) * P, y: r * P, c: li * 6 + c }) })))
  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${7 * P}`} width={width} aria-hidden className="block">
      {cells.map(({ x, y, c }, i) => {
        const d = Math.abs(c - scan), lit = d < 3 ? 1 - d / 3 : 0
        return <rect key={i} x={x} y={y} width={C} height={C} rx={1.5} fill="#f2f2f0" opacity={0.1 + lit * 0.5} />
      })}
    </svg>
  )
}

/* closing CTA merged into the footer, then the footer (layout A) */
export function Footer({ Mark }: { Mark: () => ReactNode }) {
  const cols: [string, string[]][] = [
    ['Product', ['Investigations', 'Approvals', 'Rollbacks', 'Postmortems', 'Status updates', 'Policies', 'Changelog']],
    ['Platform', ['Integrations', 'Self-hosting', 'Security', 'API', 'Audit log', 'Pricing']],
    ['Resources', ['Docs', 'Runbook library', 'Sample incidents', 'Guides', 'Blog', 'Community']],
    ['Company', ['About', 'Careers', 'Contact', 'Press kit', 'Legal']],
  ]
  return (
    <footer>
      <div className="flex items-end justify-between border-b border-[var(--rule)] px-12 pb-14 pt-20">
        <div>
          <h2 className="text-[52px] font-[500] leading-[1.04] tracking-[-0.03em]">Sleep Through<br />The Next Incident</h2>
          <p className="mt-4 max-w-[440px] text-[16px] leading-[26px] text-[var(--sub)]">Connect one service this afternoon. Halyard reads, asks, and writes; you approve.</p>
        </div>
        <div className="flex items-center gap-5 pb-1">
          <a href="#" className="group flex h-10 items-center gap-1.5 text-[14.5px] text-[var(--ink)]">Talk to an engineer<ArrowRight size={15} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" /></a>
          <a href="#" className="btn-mono press flex h-11 items-center px-6">Start on-call free</a>
        </div>
      </div>
      <div className="flex border-b border-[var(--rule)]">
        <div className="flex w-[360px] shrink-0 flex-col border-r border-[var(--rule)] px-12 py-12">
          <a href="#" aria-label="Halyard home" className="flex items-center gap-[6px]"><Mark /><span className="text-[20px] font-[600] tracking-[-0.03em]">Halyard</span></a>
          <p className="mt-4 max-w-[240px] text-[14px] leading-[22px] text-[var(--sub)]">The on-call engineer that reads everything and asks first.</p>
          <a href="#" className="mt-auto inline-flex h-8 w-fit items-center gap-2 rounded-full px-3 text-[12.5px] text-[#d4d4d4] shadow-[inset_0_0_0_1px_var(--rule-2)]">
            <span className="relative grid size-2 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-[var(--ok)] opacity-40" /><span className="size-1.5 rounded-full bg-[var(--ok)]" /></span>All systems normal
          </a>
        </div>
        <nav aria-label="Footer" className="grid flex-1 grid-cols-4 px-12 py-12">
          {cols.map(([h, ls]) => (
            <div key={h}>
              <h3 className="text-[14px] font-[500] leading-[1.25] text-[var(--ink)]">{h}</h3>
              <ul className="mt-3">{ls.map((l) => <li key={l}><a href="#" className="flex h-[30px] items-center text-[14px] text-[var(--sub)] transition-colors hover:text-[var(--ink)]">{l}</a></li>)}</ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="px-12 pt-12"><PixelWord /></div>
      <div className="flex items-center gap-6 px-12 pb-10 pt-8 text-[13px] text-[var(--sub)]">
        <span>© 2026 Halyard. Sample brand for a design study.</span>
        <a href="#" className="inline-flex h-6 items-center hover:text-[var(--ink)]">Privacy</a><a href="#" className="inline-flex h-6 items-center hover:text-[var(--ink)]">Terms</a><a href="#" className="inline-flex h-6 items-center hover:text-[var(--ink)]">Security</a>
        <span className="ml-auto flex gap-3"><a href="#" className="inline-flex h-6 min-w-6 items-center justify-center px-1 hover:text-[var(--ink)]">X</a><a href="#" className="inline-flex h-6 items-center px-1 hover:text-[var(--ink)]">GitHub</a><a href="#" className="inline-flex h-6 items-center px-1 hover:text-[var(--ink)]">LinkedIn</a></span>
      </div>
    </footer>
  )
}
