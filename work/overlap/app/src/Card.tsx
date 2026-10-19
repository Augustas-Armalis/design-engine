// Overlap "Find a time" card for a post (canvas 1600x1200). The hero's product, condensed to one component:
// a 24h mini timeline, the best hour as the headline number, everyone's local time, two actions.
import { motion, MotionConfig } from 'motion/react'
import { Avatar, ease, fmt, ampm, local, SLOT, TEAM, Track } from './product'
import { Mark } from './Hero'

const T = { card: 0.1, rows: 0.45, slot: 1.35, best: 1.5, chips: 1.6 }
const END = SLOT[0] + 0.75 // 45 min

export default function Card() {
  const pct = (x: number) => `${(x / 24) * 100}%`
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative grid h-[960px] w-[1280px] place-items-center overflow-hidden bg-[#eeede8]">
        {/* quiet dot grid, faded toward the edges */}
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgb(23 22 15 / 0.09) 1px, transparent 1.2px)', backgroundSize: '24px 24px', maskImage: 'radial-gradient(60% 60% at 50% 50%, #000, transparent 100%)' }} />
        <motion.section aria-label="Find a time, sample data" className="relative w-[500px] rounded-[26px] bg-[var(--paper)] p-2 shadow-[0_0_0_1px_rgb(23_22_15/0.06),0_2px_4px_rgb(23_22_15/0.03),0_40px_80px_-32px_rgb(23_22_15/0.28)]"
          initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: T.card, duration: 1.3, ease: ease.out, opacity: { delay: T.card, duration: 0.5 } }}>
          {/* header */}
          <div className="flex items-center gap-3 px-4 pb-4 pt-4">
            <span className="grid size-10 place-items-center rounded-[12px] bg-white shadow-[var(--shadow-ring)]"><Mark size={22} /></span>
            <div className="min-w-0 flex-1">
              <div className="text-[16px] font-[600] leading-5 tracking-[-0.015em]">Design review</div>
              <div className="text-[13px] leading-5 text-[var(--soft)]">Tue, 21 Oct · 45 min</div>
            </div>
            <div className="flex -space-x-1">
              {TEAM.map((p, i) => <span key={p.code} className="relative rounded-full ring-2 ring-[var(--paper)]" style={{ zIndex: 10 - i }}><Avatar p={p} size={26} /></span>)}
            </div>
          </div>

          {/* timeline panel */}
          <div className="relative rounded-[18px] bg-[var(--canvas)] px-4 pb-3.5 pt-3 shadow-[inset_0_0_0_1px_rgb(23_22_15/0.04)]">
            <div className="relative ml-[30px] h-5">
              {[0, 6, 12, 24].map((h) => <span key={h} className={`mono absolute text-[10.5px] text-[var(--mute)] ${h === 24 ? '-translate-x-full' : h ? '-translate-x-1/2' : ''}`} style={{ left: pct(h) }}>{fmt(h % 24)}</span>)}
            </div>
            <div className="relative ml-[30px]">
              {/* slot column */}
              <motion.div className="pointer-events-none absolute -inset-y-1.5 z-10 rounded-[8px] shadow-[inset_0_0_0_1.5px_var(--accent)]"
                style={{ left: `calc(${pct(SLOT[0])} - 4px)`, width: `calc(${pct(SLOT[1] - SLOT[0])} + 8px)` }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: T.slot, duration: 0.7, ease: ease.out }}>
                <span className="mono absolute -top-[19px] left-1/2 -translate-x-1/2 text-[10.5px] font-[500] text-[var(--accent)]">{fmt(SLOT[0])}</span>
              </motion.div>
              {TEAM.map((p, i) => (
                <div key={p.code} className="relative flex h-[26px] items-center">
                  <span className="absolute -left-[30px]"><Avatar p={p} size={20} /></span>
                  <Track p={p} slot={SLOT} h={14} at={T.rows} i={i} />
                </div>
              ))}
            </div>
          </div>

          {/* best time */}
          <motion.div className="flex items-end justify-between px-4 pb-1 pt-5"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.best, duration: 0.9, ease: ease.out }}>
            <div>
              <div className="flex items-center gap-1.5 text-[12.5px] font-[600] text-[var(--accent)]"><span className="size-1.5 rounded-full bg-[var(--accent)]" />Best time for everyone</div>
              <div className="tnum mt-1.5 text-[34px] font-[450] leading-[38px] tracking-[-0.035em]">{fmt(SLOT[0])} – {fmt(END)}</div>
            </div>
            <div className="pb-1 text-right text-[13px] leading-5 text-[var(--soft)]">London time<br /><span className="text-[var(--ink)]">5 of 6</span> in working hours</div>
          </motion.div>

          {/* everyone's local time */}
          <div className="grid grid-cols-3 gap-1.5 px-2 pb-2 pt-4">
            {TEAM.map((p, i) => {
              const off = p.code === 'TYO'
              return (
                <motion.div key={p.code} className="flex h-[52px] items-center gap-2.5 rounded-[14px] bg-white px-2.5 shadow-[var(--shadow-ring)]"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.chips + i * 0.04, duration: 0.8, ease: ease.out }}>
                  <Avatar p={p} size={26} />
                  <div className="min-w-0 leading-[17px]">
                    <div className="mono text-[11px] text-[var(--soft)]">{p.code}</div>
                    <div className={`tnum text-[13.5px] font-[550] tracking-[-0.01em] ${off ? 'text-[var(--mute)]' : ''}`}>{off ? 'Recording' : ampm(local(p, SLOT[0]))}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* actions */}
          <div className="flex gap-2 px-2 pb-2 pt-2">
            <span className="btn-white flex h-11 flex-1 items-center justify-center rounded-[14px] text-[14px] font-[550]">Other times</span>
            <span className="btn-ink-sm flex h-11 flex-[1.4] items-center justify-center gap-2 rounded-[14px] text-[14px] font-[550]">Send invite to 6</span>
          </div>
        </motion.section>
        <span className="absolute bottom-10 text-[12px] text-[var(--mute)]">Overlap · sample data</span>
      </div>
    </MotionConfig>
  )
}
