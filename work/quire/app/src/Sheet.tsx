// Quire product as an annotated document: an answer types onto a white sheet; each citation chip sends its source card into
// the margin (left or right, like footnotes in a printed report) with a hairline leader drawn from the sheet edge.
// Anchor points are measured from layout after the sheet has landed. Sample data, fictional companies and sources.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CheckCircle, FileText, MagnifyingGlass, Microphone, Newspaper } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { RollingNumber } from './kit'

const ease = [0.22, 1, 0.36, 1] as const
const SEG: { t: string; cite?: number }[] = [
  { t: 'Margins widened for one reason more than any other: contract repricing. Northbeam moved 40% of its lanes to index-linked rates', cite: 1 },
  { t: ', Cartwheel cut empty miles by 11% after consolidating depots', cite: 2 },
  { t: ', and spot rates fell faster than contract rates', cite: 3 },
  { t: '.' },
]
const SRC: Record<number, { side: 'l' | 'r'; icon: Icon; who: string; doc: string; quote: string; loc: string }> = {
  1: { side: 'l', icon: Microphone, who: 'Northbeam Freight', doc: 'Q2 earnings call', quote: '“Roughly 40% of lanes now reprice monthly against the index.”', loc: 'Transcript, p. 4' },
  2: { side: 'r', icon: FileText, who: 'Cartwheel Logistics', doc: 'Q2 quarterly report', quote: '“Empty miles fell 11% year on year following depot consolidation.”', loc: 'Note 7' },
  3: { side: 'r', icon: Newspaper, who: 'Harbourline Research', doc: 'Freight outlook, July', quote: '“Spot rates fell 9% in Q2 while contract rates held flat.”', loc: 'Fig. 3' },
}
const TOTAL = SEG.reduce((a, s) => a + s.t.length, 0)
const SHEET = { x: 360, w: 720 } // hero px
const CARD_W = 252

export default function Sheet({ intro, typeAt }: { intro: number; typeAt: number }) {
  const still = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const chips = useRef<Record<number, HTMLSpanElement | null>>({})
  const [n, setN] = useState(still ? TOTAL : 0)
  const [ys, setYs] = useState<Record<number, number>>({})
  useEffect(() => {
    if (still) return
    const t0 = performance.now() + typeAt * 1000, dur = 3400
    const id = setInterval(() => { const k = Math.max(0, Math.min(1, (performance.now() - t0) / dur)); setN(Math.round(k * TOTAL)); if (k >= 1) clearInterval(id) }, 24)
    return () => clearInterval(id)
  }, [still, typeAt])
  // measure each visible chip's line centre in hero-box coordinates (layout offsets; the sheet has stopped moving by now)
  useLayoutEffect(() => {
    const b = box.current; if (!b) return
    const next: Record<number, number> = {}
    for (const [k, el] of Object.entries(chips.current)) {
      if (!el) continue
      let y = 0, e: HTMLElement | null = el
      while (e && e !== b) { y += e.offsetTop; e = e.offsetParent as HTMLElement | null }
      next[Number(k)] = y + el.offsetHeight / 2
    }
    if (JSON.stringify(next) !== JSON.stringify(ys)) setYs(next)
  })
  const done = n >= TOTAL
  let used = 0
  const b = (d: number) => (still ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: intro + d, duration: 0.5, ease } })
  // card tops: start level with the chip's line, stack on each side without overlap
  const tops: Record<number, number> = {}
  const last = { l: -999, r: -999 }
  for (const k of [1, 2, 3]) { if (ys[k] == null) continue; const s = SRC[k].side; tops[k] = Math.max(ys[k] - 26, last[s] + 14); last[s] = tops[k] + 132 }

  return (
    <div ref={box} className="relative h-[400px] w-[1440px]">
      {/* leaders: from a dot on the sheet edge at the chip's line, out to the card */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
        {[1, 2, 3].map((k) => {
          if (ys[k] == null || tops[k] == null) return null
          const s = SRC[k].side, x0 = s === 'l' ? SHEET.x : SHEET.x + SHEET.w, x1 = s === 'l' ? SHEET.x - 36 : SHEET.x + SHEET.w + 36, y0 = ys[k], y1 = tops[k] + 26
          return (
            <g key={k}>
              <motion.path d={`M${x0},${y0} C${(x0 + x1) / 2},${y0} ${(x0 + x1) / 2},${y1} ${x1},${y1}`} fill="none" stroke="var(--blue)" strokeWidth="1" strokeOpacity="0.55"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease }} />
              <motion.circle cx={x0} cy={y0} r="3" fill="var(--blue)" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, ease }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            </g>
          )
        })}
      </svg>

      {/* margin source cards */}
      <AnimatePresence>
        {[1, 2, 3].map((k) => tops[k] == null ? null : (
          <motion.aside key={k} initial={{ opacity: 0, x: SRC[k].side === 'l' ? 12 : -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.5, ease }}
            className="absolute rounded-[6px] bg-[var(--sheet)] p-3.5 shadow-[0_0_0_1px_var(--line),0_1px_2px_rgb(25_24_22/0.05),0_10px_24px_-14px_rgb(25_24_22/0.22)]"
            style={{ top: tops[k], width: CARD_W, left: SRC[k].side === 'l' ? SHEET.x - 36 - CARD_W : SHEET.x + SHEET.w + 36 }}>
            <div className="flex items-center gap-2 text-[12px] text-[var(--sub)]">
              <span className="grid h-[18px] min-w-[18px] place-items-center rounded-[3px] bg-[var(--blue)] px-1 font-mono text-[10.5px] font-[600] text-white">{k}</span>
              {(() => { const I = SRC[k].icon; return <I size={14} /> })()}<span className="truncate">{SRC[k].doc}</span>
            </div>
            <p className="mt-2 font-[family-name:var(--font-display)] text-[17px] leading-[22px] text-[var(--ink)]">{SRC[k].quote}</p>
            <div className="mt-2 flex items-center justify-between text-[11.5px] text-[var(--soft)]"><span>{SRC[k].who}</span><span>{SRC[k].loc}</span></div>
          </motion.aside>
        ))}
      </AnimatePresence>

      {/* the sheet */}
      <motion.div initial={still ? false : { opacity: 0.01, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ y: { delay: intro - 0.45, duration: 1.15, ease: [0.26, 0.32, 0.14, 1] }, opacity: { delay: intro - 0.45, duration: 0.6, ease } }}
        className="absolute top-0 h-[520px] rounded-t-[8px] bg-[var(--sheet)] shadow-[0_0_0_1px_var(--line),0_1px_2px_rgb(25_24_22/0.04),0_30px_60px_-30px_rgb(25_24_22/0.25)]" style={{ left: SHEET.x, width: SHEET.w }}>
        <motion.div {...b(0)} className="flex h-14 items-center gap-3 border-b border-[var(--line)] px-6">
          <MagnifyingGlass size={16} className="text-[var(--soft)]" />
          <span className="flex-1 truncate text-[15px] text-[var(--ink)]">What drove margin expansion at the largest freight forwarders in Q2?</span>
          <span className="font-mono text-[11.5px] text-[var(--soft)]">41 docs read</span>
        </motion.div>
        <div className="px-6 pt-5">
          <motion.div {...b(0.08)} className="text-[11.5px] uppercase tracking-[0.12em] text-[var(--soft)]">Answer</motion.div>
          <p className="mt-2 min-h-[116px] text-[17px] leading-[29px] text-[var(--ink)]">
            {SEG.map((s, i) => {
              const from = used; used += s.t.length
              const shown = s.t.slice(0, Math.max(0, Math.min(s.t.length, n - from)))
              const cited = s.cite != null && n >= used
              return (
                <span key={i}>
                  {shown}
                  {cited && (
                    <motion.span ref={(el) => { chips.current[s.cite!] = el }} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, ease }}
                      className="relative -top-[2px] mx-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[3px] bg-[var(--blue-tint)] px-1 align-middle font-mono text-[10.5px] font-[600] leading-none text-[var(--blue-deep)] shadow-[inset_0_0_0_1px_rgb(63_95_214/0.25)]">{s.cite}</motion.span>
                  )}
                </span>
              )
            })}
            {!done && n > 0 && <span className="ml-px inline-block h-[17px] w-[1.5px] translate-y-[3px] animate-pulse bg-[var(--blue)]" />}
          </p>
          <motion.div {...b(0.16)} className="mt-5 grid grid-cols-3 border-y border-[var(--line)] py-4">
            {[
              { l: 'Gross margin', v: done ? '21.0%' : '18.6%', d: done ? '+2.4 pts' : 'Q1' },
              { l: 'Lanes repriced', v: done ? '40%' : '0%', d: 'Northbeam' },
              { l: 'Empty miles', v: done ? '−11%' : '0%', d: 'Cartwheel' },
            ].map((f, i) => (
              <div key={f.l} className={i ? 'border-l border-[var(--line)] pl-5' : ''}>
                <div className="text-[12px] text-[var(--soft)]">{f.l}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-display)] text-[30px] leading-none"><RollingNumber value={f.v} at={intro + 0.3} /></span>
                  <span className="text-[12px] text-[var(--sub)]">{f.d}</span>
                </div>
              </div>
            ))}
          </motion.div>
          <AnimatePresence>
            {done && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4, ease }} className="mt-4 flex items-center gap-2 text-[13px] text-[var(--sub)]">
                <CheckCircle size={16} weight="fill" className="text-[var(--blue)]" />Every claim cited · 3 sources · confidence high
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
