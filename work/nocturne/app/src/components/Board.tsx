// Hero product: last night's agent run, replayed on load (each ticket works, then lands as a ready PR). Sample data only.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  RiCheckLine, RiFolder3Line, RiGitPullRequestLine, RiInboxLine, RiLoader4Line, RiMoonClearFill, RiQuestionLine, RiTimeLine,
} from '@remixicon/react'
import { ease, spring } from '../motion'

const ROWS = [
  { time: '01:12', id: 'ENG-482', title: 'Fix double charge on webhook retry', add: 48, del: 12, need: false },
  { time: '01:58', id: 'ENG-477', title: 'Paginate the invoices export', add: 131, del: 20, need: false },
  { time: '02:40', id: 'ENG-469', title: 'Fix the flaky checkout test', add: 6, del: 9, need: false },
  { time: '03:25', id: 'ENG-490', title: 'Add idempotency keys to refunds', add: 74, del: 3, need: false },
  { time: '04:51', id: 'ENG-463', title: 'Dark mode for settings', add: 0, del: 0, need: true },
  { time: '05:37', id: 'ENG-455', title: 'Upgrade the payments SDK to v15', add: 212, del: 188, need: false },
]
const HOURS = [0.2, 0.55, 0.8, 0.65, 0.9, 0.7, 0.45, 0.15] // agent activity per hour, 00-07 (sample)
const FILTERS = ['All', 'Ready', 'Needs you']

function Status({ need, done }: { need: boolean; done: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {!done ? (
        <motion.span key="w" exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="flex h-6 items-center gap-1.5 rounded-[8px] bg-white/[0.06] px-2 text-[12px] text-white/60">
          <RiLoader4Line size={13} className="animate-spin" />Working
        </motion.span>
      ) : need ? (
        <motion.span key="n" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: ease.outExpo }}
          className="flex h-6 items-center gap-1.5 rounded-[8px] px-2 text-[12px] text-white/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]">
          <RiQuestionLine size={13} />Needs you
        </motion.span>
      ) : (
        <motion.span key="r" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: ease.outExpo }}
          className="flex h-6 items-center gap-1.5 rounded-[8px] bg-[#f5b26b]/[0.13] px-2 text-[12px] text-[#f6c48f]">
          <RiGitPullRequestLine size={13} />Ready
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export default function Board({ start }: { start: number }) {
  const still = !!useReducedMotion()
  const t = (x: number) => start + x
  const [done, setDone] = useState<number>(still ? ROWS.length : 0)
  const [filter, setFilter] = useState('All')
  const loaded = done >= ROWS.length
  // replay the night: each ticket resolves a beat after it appears
  useEffect(() => {
    if (still) return
    const ids = ROWS.map((_, i) => setTimeout(() => setDone((d) => Math.max(d, i + 1)), (start + 1.05 + i * 0.32 + 0.55) * 1000))
    return () => ids.forEach(clearTimeout)
  }, [still, start])
  const shown = ROWS.filter((r) => filter === 'All' || (filter === 'Needs you' ? r.need : !r.need))

  return (
    <div className="grid h-full grid-rows-[52px_1fr] text-white">
      <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ delay: t(0.3), duration: 0.6 }} className="flex items-center gap-3 border-b border-white/[0.07] px-4">
        <span className="grid size-7 place-items-center rounded-[8px] bg-[#f5b26b] text-[#1a1208]"><RiMoonClearFill size={15} /></span>
        <span className="text-[14px] font-[600]">Nocturne</span>
        <span className="h-4 w-px bg-white/10" />
        <span className="flex items-center gap-1.5 text-[13px] text-white/60"><RiFolder3Line size={15} />northwind</span>
        <span aria-hidden className="text-white/50">/</span>
        <span className="text-[13px] font-[550]">Overnight run #31</span>
        <span className="text-[12px] text-white/50">· sample</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[12.5px] text-white/60"><span className="size-1.5 rounded-full bg-[#f5b26b]" />Finished 06:42</span>
          <span className="flex h-8 items-center rounded-[12px] bg-white px-3 text-[12.5px] font-[600] text-[#0b0d13]">Review 5 PRs</span>
        </div>
      </motion.div>

      <div className="grid min-h-0 grid-cols-[208px_1fr_308px]">
        {/* runs */}
        <motion.aside initial={{ opacity: 0.01, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: t(0.45), duration: 0.8, ease: ease.outExpo }}
          className="border-r border-white/[0.07] p-3" aria-label="Sample runs">
          <div className="px-2 pb-1.5 text-[11.5px] font-[500] text-white/50">Runs</div>
          {[
            { k: 'Tonight', d: '7 tickets queued', icon: RiInboxLine },
            { k: 'Last night', d: '6 tickets · 5 PRs', icon: RiMoonClearFill, active: true },
            { k: 'Monday', d: '4 tickets · 4 PRs', icon: RiTimeLine },
            { k: 'Sunday', d: '5 tickets · 3 PRs', icon: RiTimeLine },
          ].map((r) => (
            <div key={r.k} className={`mb-0.5 flex items-center gap-2.5 rounded-[8px] px-2 py-2 ${r.active ? 'bg-white/[0.07] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]' : ''}`}>
              <r.icon size={15} className={r.active ? 'text-[#f5b26b]' : 'text-white/50'} />
              <div className="leading-[16px]"><div className="text-[13px] font-[500]">{r.k}</div><div className="text-[11.5px] text-white/50">{r.d}</div></div>
            </div>
          ))}
        </motion.aside>

        {/* tickets */}
        <section className="min-w-0 p-5" aria-label="Sample overnight tickets">
          <motion.div initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} transition={{ delay: t(0.5), duration: 0.6 }} className="flex items-center">
            <div>
              <div className="text-[16px] font-[600] tracking-[-0.01em]">Last night</div>
              <div className="text-[12.5px] text-white/50">6 tickets · 5 ready · 1 needs you</div>
            </div>
            <div className="ml-auto flex h-8 items-center gap-0.5 rounded-[12px] bg-white/[0.05] p-0.5 text-[12px] font-[500] text-white/60">
              {FILTERS.map((f) => (
                <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
                  className={`relative flex h-7 items-center justify-center rounded-[8px] px-3 transition-colors duration-200 ${filter === f ? 'text-white' : 'hover:text-white'}`}>
                  {filter === f && <motion.span layoutId="flt" transition={spring} className="absolute inset-0 rounded-[8px] bg-white/[0.09] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </motion.div>
          <div className="mt-4 space-y-1">
            {shown.map((r) => {
              const i = ROWS.indexOf(r)
              return (
                <motion.div key={r.id} layout initial={{ opacity: 0.01, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: loaded ? 0 : t(1.05 + i * 0.32), duration: 0.6, ease: ease.outExpo }}
                  className="flex h-[52px] items-center gap-3 rounded-[12px] px-3 hover:bg-white/[0.03]">
                  <span className="tnum w-10 font-mono text-[12px] text-white/50">{r.time}</span>
                  <span className="w-[62px] font-mono text-[12px] text-white/60">{r.id}</span>
                  <span className="min-w-0 flex-1 truncate text-[13.5px] font-[500]">{r.title}</span>
                  {!r.need && <span className="tnum font-mono text-[11.5px] text-white/50"><span className="text-[#8fd1a8]">+{r.add}</span> <span className="text-[#f0a3a3]">−{r.del}</span></span>}
                  <Status need={r.need} done={done > i} />
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* morning summary */}
        <motion.aside initial={{ opacity: 0.01, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: t(0.6), duration: 0.8, ease: ease.outExpo }}
          className="border-l border-white/[0.07] p-4" aria-label="Sample morning summary">
          <div className="rounded-[16px] bg-white/[0.04] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
            <motion.div initial={{ opacity: 0.01, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: t(1.05 + ROWS.length * 0.32 + 0.6), duration: 0.8, ease: ease.outExpo }}>
              <div className="text-[15px] font-[600]">Good morning</div>
              <p className="mt-1 text-[13px] leading-[19px] text-white/60">Five pull requests passed their tests overnight. One ticket needs your call.</p>
            </motion.div>
            <div className="mt-4 flex h-[64px] items-end gap-1.5">
              {HOURS.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <motion.div className="w-full rounded-[3px] bg-gradient-to-t from-[#f5b26b]/40 to-[#f5b26b]" initial={{ height: 0 }} animate={{ height: v * 48 }}
                    transition={{ delay: t(1.1 + i * 0.12), duration: 0.8, ease: ease.outExpo }} />
                </div>
              ))}
            </div>
            <div className="tnum mt-1.5 flex justify-between font-mono text-[10px] text-white/50"><span>00</span><span>02</span><span>04</span><span>06</span></div>
          </div>
          <motion.div initial={{ opacity: 0.01, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: t(1.05 + ROWS.length * 0.32 + 0.8), duration: 0.8, ease: ease.outExpo }}
            className="mt-3 rounded-[16px] bg-white/[0.04] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
            <div className="flex items-center gap-2 text-[12px] text-white/60"><RiQuestionLine size={14} />ENG-463 · needs your call</div>
            <p className="mt-1.5 text-[13px] leading-[19px] text-white/85">Two ways to theme settings. Pick one and it ships tonight.</p>
            <div className="mt-3 flex gap-2">
              {['Follow system', 'Manual toggle'].map((o, i) => (
                <span key={o} className={`flex h-8 items-center gap-1.5 rounded-[12px] px-3 text-[12px] font-[500] ${i === 0 ? 'bg-white text-[#0b0d13]' : 'text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]'}`}>
                  {i === 0 && <RiCheckLine size={13} />}{o}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.aside>
      </div>
    </div>
  )
}
