// Overlap product pieces shared by the hero and the post card. Sample team (fictional), viewed from London (UTC+1).
// The overlap is computed, not drawn: every bar and the shared window come from each person's local work hours.
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export const ease = { out: [0.16, 1, 0.3, 1], reveal: [0.26, 0.32, 0.14, 1] } as const
export const VIEW_TZ = 1 // London, BST

export type Person = { name: string; city: string; code: string; tz: number; start: number; end: number; hue: number }
export const TEAM: Person[] = [
  { name: 'Maya Okafor', city: 'San Francisco', code: 'SFO', tz: -7, start: 8, end: 17, hue: 24 },
  { name: 'Ana Ruiz', city: 'New York', code: 'NYC', tz: -4, start: 9, end: 18, hue: 152 },
  { name: 'Tom Hale', city: 'London', code: 'LDN', tz: 1, start: 9, end: 18, hue: 262 },
  { name: 'Rui Matos', city: 'Lisbon', code: 'LIS', tz: 1, start: 10, end: 19, hue: 330 },
  { name: 'Lea Brandt', city: 'Berlin', code: 'BER', tz: 2, start: 9, end: 18, hue: 196 },
  { name: 'Kenji Mori', city: 'Tokyo', code: 'TYO', tz: 9, start: 10, end: 19, hue: 78 },
]

const wrap = (h: number) => ((h % 24) + 24) % 24
/** a person's work hours as [from, to) segments in viewer time (split at midnight) */
export function segments(p: Person): [number, number][] {
  const a = wrap(p.start - p.tz + VIEW_TZ), b = a + (p.end - p.start)
  return b <= 24 ? [[a, b]] : [[a, 24], [0, b - 24]]
}
const awakeAt = (p: Person, h: number) => segments(p).some(([a, b]) => h >= a && h < b)
/** the longest run of hours where everyone but `skip` is working (viewer time) */
export function overlap(team: Person[], skip: string[] = []) {
  const who = team.filter((p) => !skip.includes(p.code))
  let best: [number, number] = [0, 0], run = -1
  for (let h = 0; h <= 24; h++) {
    const ok = h < 24 && who.every((p) => awakeAt(p, h + 0.5))
    if (ok && run < 0) run = h
    if (!ok && run >= 0) { if (h - run > best[1] - best[0]) best = [run, h]; run = -1 }
  }
  return best
}
export const SLOT = overlap(TEAM, ['TYO']) // [16, 17] -> 16:00-17:00 BST
export const local = (p: Person, viewerHour: number) => wrap(viewerHour - VIEW_TZ + p.tz)
export const fmt = (h: number) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`
export const ampm = (h: number) => { const H = Math.floor(h), m = Math.round((h % 1) * 60); const s = H < 12 ? 'am' : 'pm'; const hh = H % 12 === 0 ? 12 : H % 12; return `${hh}:${String(m).padStart(2, '0')} ${s}` }

export function Avatar({ p, size = 24 }: { p: Person; size?: number }) {
  const initials = p.name.split(' ').map((w) => w[0]).join('')
  return (
    <span aria-hidden className="inline-flex shrink-0 items-center justify-center rounded-full font-[600] tracking-[-0.01em]"
      style={{ width: size, height: size, fontSize: Math.max(9, size * 0.38), color: `oklch(0.42 0.09 ${p.hue})`, background: `oklch(0.95 0.035 ${p.hue})`, boxShadow: `inset 0 0 0 1px oklch(0.42 0.09 ${p.hue} / 0.12)` }}>
      {initials}
    </span>
  )
}

/** one person's 24h track: hatched off-hours, a work bar, the bar turns azure where it meets the proposed slot */
export function Track({ p, slot, h = 28, at = 0, i = 0, still = false }: { p: Person; slot: [number, number]; h?: number; at?: number; i?: number; still?: boolean }) {
  const pct = (x: number) => `${(x / 24) * 100}%`
  const inSlot = segments(p).some(([a, b]) => a < slot[1] && b > slot[0])
  return (
    <div className="hatch relative w-full rounded-[7px]" style={{ height: h }}>
      {segments(p).map(([a, b], k) => (
        <motion.div key={k} className="absolute inset-y-0 rounded-[7px] bg-[#fff] shadow-[0_0_0_1px_rgb(23_22_15/0.09),0_1px_2px_rgb(23_22_15/0.05)]"
          style={{ left: pct(a), width: pct(b - a), transformOrigin: '0% 50%' }}
          initial={still ? false : { scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: at + i * 0.06 + (k ? 0.25 : 0), duration: 1.1, ease: ease.out, opacity: { delay: at + i * 0.06, duration: 0.3 } }} />
      ))}
      {inSlot && (
        <motion.div className="absolute inset-y-0 rounded-[7px] bg-[var(--accent)] shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_1px_2px_rgb(47_107_255/0.3)]"
          style={{ left: pct(slot[0]), width: pct(slot[1] - slot[0]) }}
          initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: at + 0.9 + i * 0.05, duration: 0.6, ease: ease.out }} />
      )}
    </div>
  )
}

export const Kbd = ({ children }: { children: ReactNode }) => (
  <span className="mono inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-[var(--weak)] px-1 text-[11px] text-[var(--soft)] shadow-[0_0_0_1px_rgb(23_22_15/0.06)]">{children}</span>
)
