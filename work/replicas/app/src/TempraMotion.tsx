// One clock for every Tempra video. A route wraps the page in <Clock mode="hero"|"story">; components read the time with
// useAnim() and derive every entrance from one timeline table (motion canon: one T object, one expo-out curve, glides, no springs).
// Without a Clock, useAnim() is null and every helper returns the final static state, so the stills are untouched.
// The clock runs on requestAnimationFrame + performance.now, which Reel's virtual clock steps frame by frame.
import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react'

export type Mode = 'hero' | 'story'
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

// an entrance: rise + fade on the shared curve, only in the given mode; {} otherwise (final state)
export function rise(a: Anim, mode: Mode, d: number, y = 10, dur = 0.9): CSSProperties {
  if (!a || a.mode !== mode) return {}
  const p = prog(a.t, d, dur)
  return { opacity: clamp(p * 1.2), transform: `translateY(${((1 - p) * y).toFixed(2)}px)` }
}
// the same entrance in either mode, each with its own delay
export function enter(a: Anim, hd: number | null, sd: number | null, y = 8): CSSProperties {
  if (!a) return {}
  if (a.mode === 'hero') return hd == null ? {} : rise(a, 'hero', hd, y)
  return sd == null ? {} : rise(a, 'story', sd, y)
}
