// Hero product: a pull request mid-review. Sample data only (fictional repo "northwind/checkout").
import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  RiArrowDownSLine, RiCornerDownRightLine, RiFileCodeLine, RiFolder3Line, RiGitPullRequestLine, RiQuillPenAiFill, RiMore2Line,
} from '@remixicon/react'
import { ease } from '../motion'

type Tok = [string, string] // [class, text]
type Line = { kind: 'ctx' | 'add' | 'del'; n: number; toks: Tok[]; note?: 0 | 1 }

const k = (t: string): Tok => ['tk-k', t], f = (t: string): Tok => ['tk-f', t], s = (t: string): Tok => ['tk-s', t], n = (t: string): Tok => ['tk-n', t], p = (t: string): Tok => ['', t]
export const DIFF: Line[] = [
  { kind: 'ctx', n: 18, toks: [k('export async function '), f('retryWebhook'), p('(event: WebhookEvent) {')] },
  { kind: 'del', n: 19, toks: [p('  '), k('const '), p('res = '), k('await '), f('charge'), p('(event.amount)')] },
  { kind: 'add', n: 19, toks: [p('  '), k('const '), p('attempt = '), k('await '), p('queue.'), f('next'), p('(event.id)')] },
  { kind: 'add', n: 20, toks: [p('  '), k('const '), p('res = '), k('await '), f('charge'), p('(event.amount, {')], note: 0 },
  { kind: 'add', n: 21, toks: [p('    customer: event.customerId,')] },
  { kind: 'add', n: 22, toks: [p('  })')] },
  { kind: 'ctx', n: 23, toks: [p('  '), k('if '), p('(!res.ok) {')] },
  { kind: 'del', n: 21, toks: [p('    '), k('throw new '), f('Error'), p('('), s("'charge failed'"), p(')')] },
  { kind: 'add', n: 24, toks: [p('    '), k('return '), f('backoff'), p('(attempt, '), n('200'), p(' * '), n('2'), p(' ** attempt.n)')], note: 1 },
  { kind: 'ctx', n: 25, toks: [p('  }')] },
  { kind: 'ctx', n: 26, toks: [p('  '), k('await '), f('markPaid'), p('(event.id)')] },
  { kind: 'ctx', n: 27, toks: [p('}')] },
]

const FILES = [
  { dir: 'src/webhooks', files: [{ name: 'retry.ts', add: 48, del: 12, note: 'red', active: true }, { name: 'queue.ts', add: 22, del: 3 }, { name: 'handler.ts', add: 6, del: 6 }] },
  { dir: 'src/billing', files: [{ name: 'charge.ts', add: 9, del: 2, note: 'amber' }, { name: 'idempotency.ts', add: 31, del: 0 }] },
  { dir: 'tests', files: [{ name: 'retry.test.ts', add: 64, del: 0 }, { name: 'queue.test.ts', add: 18, del: 4 }] },
]

const SEV = [
  { label: 'Blocking', chip: 'bg-red-tint text-red-text', stroke: '#d4483b' },
  { label: 'Nit', chip: 'bg-amber-tint text-amber-text', stroke: '#c08a2a' },
] as const

export default function Review({ start }: { start: number }) {
  const still = !!useReducedMotion()
  const t = (x: number) => start + x
  const box = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const noteRefs = useRef<(HTMLDivElement | null)[]>([])
  const [paths, setPaths] = useState<{ d: string; end: [number, number] }[]>([])

  // connectors from each note card to the line it is about (measured, so they stay true at any font metrics)
  useLayoutEffect(() => {
    const measure = () => {
      const b = box.current?.getBoundingClientRect(); if (!b) return
      setPaths([0, 1].map((i) => {
        const li = DIFF.findIndex((l) => l.note === i)
        const l = lineRefs.current[li]?.getBoundingClientRect(), c = noteRefs.current[i]?.getBoundingClientRect()
        if (!l || !c) return { d: '', end: [0, 0] as [number, number] }
        const x1 = l.right - b.left - 14, y1 = l.top - b.top + l.height / 2
        const x2 = c.left - b.left, y2 = c.top - b.top + 22
        const mid = (x1 + x2) / 2
        return { d: `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`, end: [x1, y1] as [number, number] }
      }))
    }
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure); if (box.current) ro.observe(box.current)
    return () => ro.disconnect()
  }, [])

  const NOTE_AT = [t(1.55), t(1.95)]

  return (
    <div ref={box} className="relative grid h-full grid-rows-[52px_1fr]">
      {/* PR bar */}
      <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ delay: t(0.3), duration: 0.6 }}
        className="flex items-center gap-3 border-b border-line px-4">
        <span className="grid size-7 place-items-center rounded-[8px] bg-green-tint text-green"><RiGitPullRequestLine size={16} /></span>
        <div className="leading-[18px]">
          <div className="text-[13px] font-[600] text-ink">Retry failed payment webhooks <span className="font-[450] text-soft">#482</span></div>
          <div className="text-[11px] text-soft">northwind/checkout · sample repository</div>
        </div>
        <span className="ml-1 flex h-[22px] items-center rounded-full bg-green-tint px-2 text-[11px] font-[600] text-green-text">Open</span>
        <div className="ml-auto flex items-center gap-3">
          <div className="text-right leading-[16px]">
            <div className="shimmer text-[12px] font-[550]">Reviewing 12 of 14 files</div>
            <div className="mt-1 h-1 w-[140px] overflow-hidden rounded-full bg-weak">
              <motion.div className="h-full rounded-full bg-green" initial={{ width: '8%' }} animate={{ width: '86%' }} transition={{ delay: t(0.5), duration: 2.2, ease: ease.outExpo }} />
            </div>
          </div>
          <span className="btn-white grid size-8 place-items-center rounded-[12px] text-sub"><RiMore2Line size={15} /></span>
        </div>
      </motion.div>

      <div className="grid min-h-0 grid-cols-[212px_1fr_332px]">
        {/* files */}
        <aside aria-label="Sample changed files" className="border-r border-line bg-[#faf9f6] p-2.5">
          <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ delay: t(0.4), duration: 0.5 }}
            className="flex h-8 items-center px-2 text-[12px] font-[550] text-sub">Files changed <span className="ml-1.5 rounded-full bg-weak px-1.5 text-[11px] text-soft">14</span></motion.div>
          {FILES.map((g, gi) => (
            <div key={g.dir} className="mt-1">
              <motion.div initial={{ opacity: 0.01, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: t(0.45 + gi * 0.12), duration: 0.6, ease: ease.outQuint }}
                className="flex h-7 items-center gap-1.5 px-2 text-[12px] text-soft"><RiArrowDownSLine size={14} /><RiFolder3Line size={14} />{g.dir}</motion.div>
              {g.files.map((fl, fi) => (
                <motion.div key={fl.name} initial={{ opacity: 0.01, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: t(0.5 + gi * 0.12 + fi * 0.04), duration: 0.6, ease: ease.outQuint }}
                  className={`flex h-8 items-center gap-2 rounded-[8px] pl-6 pr-2 text-[12.5px] ${'active' in fl && fl.active ? 'bg-white text-ink shadow-[var(--shadow-ring)]' : 'text-sub'}`}>
                  <RiFileCodeLine size={14} className="shrink-0 text-soft" />
                  <span className="truncate">{fl.name}</span>
                  {'note' in fl && <span className={`size-1.5 shrink-0 rounded-full ${fl.note === 'red' ? 'bg-red' : 'bg-[#c08a2a]'}`} />}
                  <span className="tnum ml-auto font-mono text-[10.5px]"><span className="text-green-text">+{fl.add}</span> <span className="text-red-text">−{fl.del}</span></span>
                </motion.div>
              ))}
            </div>
          ))}
        </aside>

        {/* diff */}
        <section aria-label="Sample diff" className="min-w-0 bg-white">
          <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ delay: t(0.45), duration: 0.5 }}
            className="flex h-10 items-center gap-2 border-b border-line px-4 font-mono text-[12px] text-sub">
            src/webhooks/retry.ts <span className="tnum ml-1"><span className="text-green-text">+48</span> <span className="text-red-text">−12</span></span>
            <span className="ml-auto font-sans text-[11px] text-soft">Viewed 1 of 14</span>
          </motion.div>
          <div className="code py-2">
            {DIFF.map((l, i) => {
              const sev = l.note != null ? SEV[l.note] : null
              return (
                <motion.div key={i} ref={(el) => { lineRefs.current[i] = el }} initial={{ opacity: 0.01, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: t(0.6 + i * 0.05), duration: 0.5, ease: ease.outQuint }}
                  className={`relative flex whitespace-pre ${l.kind === 'add' ? 'bg-[#eef8f1]' : l.kind === 'del' ? 'bg-[#fcf0ee]' : ''}`}>
                  {sev && <motion.span aria-hidden className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1.5px ${sev.stroke}`, background: `${sev.stroke}0d` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.75] }}
                    transition={{ delay: NOTE_AT[l.note!] + 0.35, duration: 0.9, ease: ease.outQuint }} />}
                  <span className={`relative w-1 shrink-0 ${l.kind === 'add' ? 'bg-green' : l.kind === 'del' ? 'bg-red' : ''}`} />
                  <span className="relative w-10 shrink-0 select-none pr-2 text-right text-[#706c65]">{l.n}</span>
                  <span className={`relative w-4 shrink-0 select-none ${l.kind === 'add' ? 'text-green-text' : l.kind === 'del' ? 'text-red-text' : 'text-transparent'}`}>{l.kind === 'add' ? '+' : l.kind === 'del' ? '−' : ' '}</span>
                  <span className="relative text-[#3b3934]">{l.toks.map(([c, x], j) => <span key={j} className={c}>{x}</span>)}</span>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* margin notes */}
        <section aria-label="Sample Margin review" className="border-l border-line bg-[#faf9f6] p-3.5">
          <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ delay: t(0.45), duration: 0.5 }} className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-[8px] bg-ink text-white"><RiQuillPenAiFill size={13} /></span>
            <span className="text-[13px] font-[600]">Margin</span>
            <span className="text-[12px] text-soft">2 notes · 1 blocking</span>
          </motion.div>

          <motion.div ref={(el) => { noteRefs.current[0] = el }} initial={{ opacity: 0.01, x: 14, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: NOTE_AT[0], duration: 0.9, ease: ease.outExpo }} className="mt-3 rounded-[16px] bg-white p-3 shadow-[var(--shadow-tile)]">
            <div className="flex items-center gap-2 text-[11px]">
              <span className={`flex h-[20px] items-center rounded-[8px] px-1.5 font-[600] ${SEV[0].chip}`}>{SEV[0].label}</span>
              <span className="font-mono text-soft">retry.ts:20</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-[19px] text-sub">A retry can <span className="font-[600] text-ink">charge twice</span>. Pass the event id as the idempotency key.</p>
            <div className="code mt-2 overflow-hidden rounded-[8px] bg-[#eef8f1] text-[11.5px] leading-[22px] shadow-[inset_0_0_0_1px_rgba(12,127,68,0.15)]">
              <div className="flex whitespace-pre"><span className="w-4 pl-1.5 text-green-text">+</span><span className="text-[#3b3934]">    idempotencyKey: event.id,</span></div>
            </div>
            <div className="mt-2.5 flex gap-1.5">
              <motion.span whileTap={{ scale: 0.98 }} className="btn-green inline-flex h-8 items-center rounded-[12px] px-3 text-[12px] font-[600]">Commit fix</motion.span>
              <span className="btn-white inline-flex h-8 items-center gap-1 rounded-[12px] px-3 text-[12px] font-[550]"><RiCornerDownRightLine size={13} className="text-soft" />Reply</span>
            </div>
          </motion.div>

          <motion.div ref={(el) => { noteRefs.current[1] = el }} initial={{ opacity: 0.01, x: 14, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: NOTE_AT[1], duration: 0.9, ease: ease.outExpo }} className="mt-2.5 rounded-[16px] bg-white p-3 shadow-[var(--shadow-tile)]">
            <div className="flex items-center gap-2 text-[11px]">
              <span className={`flex h-[20px] items-center rounded-[8px] px-1.5 font-[600] ${SEV[1].chip}`}>{SEV[1].label}</span>
              <span className="font-mono text-soft">retry.ts:24</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-[19px] text-sub">No jitter: retries from one outage arrive together. Add ±20%.</p>
          </motion.div>
        </section>
      </div>

      {/* connectors: drawn after each note lands; the end dot sits on the line it is about */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" width="100%" height="100%">
        {paths.map((c, i) => c.d && (
          <g key={i}>
            <motion.path d={c.d} fill="none" stroke={SEV[i].stroke} strokeWidth={1.5} strokeDasharray={i ? '3 3' : undefined} strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ pathLength: { delay: NOTE_AT[i] + 0.25, duration: 0.7, ease: ease.inOut }, opacity: { delay: NOTE_AT[i] + 0.25, duration: 0.2 } }} />
            <motion.circle cx={c.end[0]} cy={c.end[1]} r={4} fill="#fff" stroke={SEV[i].stroke} strokeWidth={2} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: NOTE_AT[i] + 0.9, duration: 0.5, ease: ease.outExpo }} />
            {!still && i === 0 && (
              <motion.circle cx={c.end[0]} cy={c.end[1]} r={6} fill={SEV[i].stroke} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 2.4], opacity: [0.4, 0] }}
                transition={{ delay: NOTE_AT[i] + 1.1, duration: 2.2, ease: ease.outQuint, repeat: Infinity, repeatDelay: 0.8 }} />
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
