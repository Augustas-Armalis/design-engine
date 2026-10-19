// Overlap hero (1440x900). Editorial band: headline left, subtitle + CTAs right with bottoms aligned; the product's
// own verb below it as the visual: six teammates' work hours on one 24h axis, the shared hour lit in azure.
import { motion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { Avatar, ease, fmt, ampm, local, SLOT, TEAM, Track } from './product'

const T = { nav: 0.1, h1: 0.2, sub: 0.45, cta: 0.55, win: 0.6, rows: 0.95, slot: 1.85 }
const Up = ({ at, y = 14, children, className = '' }: { at: number; y?: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 1.1, ease: ease.out, opacity: { delay: at, duration: 0.6 } }}>{children}</motion.div>
)

export function Mark({ size = 22 }: { size?: number }) {
  // two hour-rings overlapping; the shared lens is the only filled shape
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs><clipPath id="ov-l"><circle cx="9" cy="12" r="7" /></clipPath></defs>
      <circle cx="9" cy="12" r="6.25" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="15" cy="12" r="6.25" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="15" cy="12" r="7" fill="var(--accent)" clipPath="url(#ov-l)" />
    </svg>
  )
}

// hour labels every 3h, minus the ones the slot flag sits on
const HOURS = Array.from({ length: 9 }, (_, i) => i * 3).filter((h) => Math.abs(h - (SLOT[0] + SLOT[1]) / 2) > 2.6)
const LEFT = 236 // name column

function Window() {
  const pct = (x: number) => `${(x / 24) * 100}%`
  const col = (h: number) => `calc(20px + ${LEFT}px + (100% - 40px - ${LEFT}px) * ${h / 24})`
  return (
    <div className="overflow-hidden rounded-[18px] bg-[var(--paper)] shadow-[var(--shadow-frame)]">
      {/* header */}
      <div className="flex h-[60px] items-center gap-3 px-5 shadow-[inset_0_-1px_0_var(--line)]">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[15px] font-[600] tracking-[-0.01em]">Design review</span>
          <span className="text-[13px] text-[var(--soft)]">45 min · 6 people</span>
        </div>
        <div className="ml-6 flex h-8 items-center gap-1 rounded-[9px] bg-[var(--weak)] px-1 text-[13px] shadow-[inset_0_0_0_1px_rgb(23_22_15/0.04)]">
          <span className="grid size-6 place-items-center text-[var(--soft)]">‹</span>
          <span className="px-1.5 font-[550]">Tue, 21 Oct</span>
          <span className="grid size-6 place-items-center text-[var(--soft)]">›</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[12px] text-[var(--mute)]">Sample data · times in London (BST)</span>
          <div className="flex h-8 items-center rounded-[9px] bg-[var(--weak)] p-[3px] text-[13px] font-[550]">
            <span className="flex h-full items-center rounded-[7px] bg-white px-3 shadow-[var(--shadow-ring)]">Day</span>
            <span className="flex h-full items-center px-3 text-[var(--soft)]">Week</span>
          </div>
          <span className="btn-ink-sm flex h-8 items-center gap-1.5 rounded-[9px] px-3 text-[13px] font-[550]">Send invite</span>
        </div>
      </div>
      {/* grid */}
      <div className="relative px-5 pb-6">
        {/* axis */}
        <div className="relative flex h-11 items-end pb-2.5" style={{ paddingLeft: LEFT }}>
          <span className="absolute bottom-2.5 left-0 text-[12px] font-[550] text-[var(--soft)]">Team</span>
          <div className="relative h-4 flex-1">
            {HOURS.map((h) => <span key={h} className={`mono absolute text-[11px] text-[var(--mute)] ${h === 24 ? '-translate-x-full' : h ? '-translate-x-1/2' : ''}`} style={{ left: pct(h) }}>{fmt(h)}</span>)}
          </div>
        </div>
        {/* the proposed slot: a column through every row, flagged at the top */}
        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: col(SLOT[0]), width: `calc((100% - 40px - ${LEFT}px) * ${(SLOT[1] - SLOT[0]) / 24})` }}>
          <motion.div className="absolute inset-x-[-6px] top-11 bottom-0 rounded-t-[10px] bg-[var(--accent-soft)] shadow-[inset_0_0_0_1px_var(--accent-line)]"
            initial={{ opacity: 0, scaleY: 0.96 }} animate={{ opacity: 1, scaleY: 1 }} style={{ transformOrigin: '50% 0%' }} transition={{ delay: T.slot, duration: 0.8, ease: ease.out }} />
          <motion.div className="absolute left-1/2 top-[6px] -translate-x-1/2"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.slot + 0.15, duration: 0.7, ease: ease.out }}>
            <span className="flex h-[26px] items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--accent)] pl-2 pr-2.5 text-[12px] font-[600] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_4px_10px_-4px_rgb(47_107_255/0.6)]">
              <span className="size-1.5 rounded-full bg-white" />{fmt(SLOT[0])}–{fmt(SLOT[1])} · 5 of 6 awake
            </span>
          </motion.div>
        </div>
        {/* now line */}
        <div className="pointer-events-none absolute top-11 bottom-0 z-10 w-px bg-[rgb(23_22_15/0.35)]" style={{ left: col(13.67) }}>
          <span className="absolute -left-[3px] -top-[3px] size-[7px] rounded-full bg-[var(--ink)]" />
        </div>
        {/* rows */}
        {TEAM.map((p, i) => {
          const off = p.code === 'TYO'
          return (
            <motion.div key={p.code} className="relative flex h-[58px] items-center shadow-[inset_0_-1px_0_var(--line)] last:shadow-none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.rows + i * 0.06, duration: 0.6 }}>
              <div className="flex shrink-0 items-center gap-3" style={{ width: LEFT }}>
                <Avatar p={p} size={30} />
                <div className="min-w-0">
                  <div className="text-[14px] font-[550] leading-[18px] tracking-[-0.01em]">{p.name}</div>
                  <div className="text-[12.5px] leading-[17px] text-[var(--soft)]">{p.city} · <span className={off ? '' : 'text-[var(--ink)]'}>{ampm(local(p, SLOT[0]))}</span></div>
                </div>
              </div>
              <div className="relative flex-1">
                <Track p={p} slot={SLOT} h={30} at={T.rows} i={i} />
                {off && (
                  <motion.span className="absolute top-1/2 z-20 flex h-6 -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full bg-white px-2.5 text-[11.5px] font-[550] text-[var(--sub)] shadow-[var(--shadow-ring)]"
                    style={{ left: pct((SLOT[0] + SLOT[1]) / 2) }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: T.slot + 0.35, duration: 0.6, ease: ease.out }}>
                    Asleep · gets the recording
                  </motion.span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <header className="absolute inset-x-16 top-0 z-20 flex h-[84px] items-center">
          <Up at={T.nav} y={0}><a href="#" className="flex items-center gap-2 text-[19px] font-[600] tracking-[-0.03em]"><Mark />Overlap</a></Up>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <Up at={T.nav + 0.05} y={0}>
              <ul className="flex items-center gap-8 text-[14px] font-[500] text-[var(--sub)]">
                {['Product', 'Teams', 'Integrations', 'Pricing', 'Changelog'].map((l) => <li key={l}><a href="#" className="link-draw inline-block py-1.5 hover:text-[var(--ink)]">{l}</a></li>)}
              </ul>
            </Up>
          </nav>
          <Up at={T.nav + 0.1} y={0} className="ml-auto flex items-center gap-6 text-[14px] font-[500]">
            <a href="#" className="link-draw inline-block py-1.5 text-[var(--sub)] hover:text-[var(--ink)]">Sign in</a>
            <a href="#" className="link-draw inline-block py-1.5">Start free ↗</a>
          </Up>
        </header>

        <main className="absolute inset-x-16 top-[176px] flex items-end justify-between">
          <h1 className="text-[58px] font-[450] leading-[1.02] tracking-[-0.04em]">
            <Up at={T.h1} y={22}>Find The Hour</Up>
            <Up at={T.h1 + 0.08} y={22}>Everyone’s Awake</Up>
          </h1>
          <div className="w-[452px] pb-[4px]">
            <Up at={T.sub}><p className="text-[17px] leading-[27px] text-[var(--sub)]">Overlap reads your team’s calendars and time zones,<br />then books the one hour that works for all of them.</p></Up>
            <Up at={T.cta} className="mt-7 flex items-center gap-6 text-[15px]">
              <a href="#" className="btn-lamp press flex h-12 items-center rounded-[14px] px-[22px] font-[550] tracking-[-0.01em]">Start free</a>
              <a href="#" className="link-draw inline-block py-1.5 font-[550]">See how it works →</a>
            </Up>
          </div>
        </main>

        <motion.div role="img" aria-label="Overlap finding a meeting time for a six-person team across five time zones (sample data)"
          className="absolute inset-x-16 top-[392px]" style={{ maskImage: 'linear-gradient(180deg, #000 84%, transparent 100%)' }}
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.win, duration: 1.3, ease: ease.out, opacity: { delay: T.win, duration: 0.6 } }}>
          <Window />
        </motion.div>
      </div>
    </MotionConfig>
  )
}
