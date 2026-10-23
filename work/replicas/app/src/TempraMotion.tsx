// One clock for every Tempra video. A route wraps the page in <Clock mode="hero"|"story">; components read the time with
// useAnim() and derive every entrance from one timeline table (motion canon: one T object, one expo-out curve, glides, no springs).
// Without a Clock, useAnim() is null and every helper returns the final static state, so the stills are untouched.
// The clock runs on requestAnimationFrame + performance.now, which Reel's virtual clock steps frame by frame.
import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react'

export type Mode = 'hero' | 'story' | 'load' | 'chat'
export type Anim = { t: number; mode: Mode } | null
const AnimCtx = createContext<Anim>(null)
export const useAnim = () => useContext(AnimCtx)

export function Clock({ mode, children }: { mode: Mode; children: ReactNode }) {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = () => { setT((performance.now() - start) / 1000); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <AnimCtx.Provider value={{ t, mode }}>{children}</AnimCtx.Provider>
}

// expo-out, cubic-bezier(.16, 1, .3, 1) in spirit: fast start, long settle
const expo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x))
const clamp = (x: number) => Math.min(1, Math.max(0, x))
export const prog = (t: number, d: number, dur: number) => expo(clamp((t - d) / dur))
// 0 -> 1 -> 0 over dur: a press
export const bump = (t: number, d: number, dur: number) => { const x = clamp((t - d) / dur); return Math.sin(x * Math.PI) }

// the hero load-in: frame -> copy -> window -> contents top to bottom -> the found slot (the payoff, settles ~2.5s)
export const H = { nav: 0, pill: 0.1, h1: 0.16, sub: 0.26, cta: 0.34, win: 0.55, side: 0.85, head: 0.92, kpi: 1.0, week: 1.06, ev: 1.18, rail: 1.12,
  bubble: 1.25, check: 1.36, ans: 1.48, opt: 1.58, btn: 1.8, handled: 1.92, comp: 1.2, slot: 2.05 }
// the product story: type the ask -> send -> read five calendars -> answer -> the slot lands -> book it
export const S = { type0: 0.5, typeRate: 38, send: 2.0, bubble: 2.12, check: 2.35, chips: 2.45, checked: 3.05, ans: 3.2, opt: 3.45,
  slot: 3.8, btn: 4.0, handled: 4.2, press: 4.7, booked: 4.85 }

// the dashboard load-in: window -> sidebar rows 35ms apart -> header -> numbers roll -> the week assembles by column ->
// the ask rail -> the found slot lands last (settles ~2.5s; motion canon: <= 3 groups + one payoff, staggers 35-60ms)
export const L = { win: 0, ws: 0.12, search: 0.16, nav: 0.2, teams: 0.42, next: 0.62, user: 0.68, head: 0.16, kpi: 0.26, roll: 0.34,
  spark: 0.46, week: 0.34, days: 0.4, ev: 0.54, now: 1.15, rail: 0.24, bubble: 0.46, check: 0.58, chips: 0.64, ans: 0.76,
  opt: 0.92, btn: 1.14, handled: 1.24, comp: 0.4, slot: 1.55 }
// the standalone Ask Tempra component (chat), r2: the component scales in -> the ask is typed and sent -> five calendars are read ->
// the answer streams in words -> the options rise -> a cursor books Friday -> the other options fold away -> a second ask is typed ->
// the reminder is set and its switch turns on (settles ~12.2s)
export const C = { in: 0, type1: 1.3, typeRate: 34, send1: 3.05, think1: 3.3, chips: 3.45, checked1: 4.4, ans1: 4.5, wordRate: 18,
  opt: 5.7, btn: 6.05, cur: 6.4, press: 7.3, booked: 7.42, fold: 7.85, type2: 8.6, send2: 9.7, think2: 9.95, checked2: 10.55,
  ans2: 10.65, rem: 11.3, on: 11.85 }

// an entrance: rise + fade on the shared curve, only in the given mode; {} otherwise (final state)
export function rise(a: Anim, mode: Mode, d: number, y = 10, dur = 0.9): CSSProperties {
  if (!a || a.mode !== mode) return {}
  const p = prog(a.t, d, dur)
  return { opacity: clamp(p * 1.2), transform: `translateY(${((1 - p) * y).toFixed(2)}px)` }
}
// the same entrance in any mode, each with its own delay (story and chat share the story beat unless chat is given)
export function enter(a: Anim, hd: number | null, sd: number | null, y = 8, ld: number | null = null, cd: number | null = sd): CSSProperties {
  if (!a) return {}
  const d = a.mode === 'hero' ? hd : a.mode === 'story' ? sd : a.mode === 'load' ? ld : cd
  return d == null ? {} : rise(a, a.mode, d, y)
}

// digits roll in masked slots, each column from 0 to its digit, 45ms apart (motion canon: never a fade or a whole-number count)
export function Roll({ value, a, d, h = 26 }: { value: string; a: Anim; d: number; h?: number }) {
  if (!a || a.mode !== 'load') return <>{value}</>
  let k = 0
  return (
    <span style={{ display: 'inline-flex' }}>
      {value.split('').map((ch, i) => {
        if (!/[0-9]/.test(ch)) return <span key={i} style={{ opacity: prog(a.t, d + 0.1, 0.5), whiteSpace: 'pre' }}>{ch}</span>
        const dd = d + k++ * 0.045, p = prog(a.t, dd, 1.0), n = Number(ch)
        return (
          <span key={i} style={{ display: 'inline-block', height: h, overflow: 'hidden', verticalAlign: 'top' }}>
            <span style={{ display: 'flex', flexDirection: 'column', transform: `translateY(${(-n * p * h).toFixed(2)}px)` }}>
              {Array.from({ length: 10 }, (_, j) => <span key={j} style={{ height: h, lineHeight: `${h}px` }}>{j}</span>)}
            </span>
          </span>
        )
      })}
    </span>
  )
}
