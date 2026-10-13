// Product-hero kit: the craft primitives behind Kestrel (accepted, "top tier quality with animations").
// Brand-neutral: colours come from CSS variables, timings from ./motion. Compose them; do not copy Kestrel's layout.
import { type ReactNode, useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { STAGGER, dur, ease, reveal, spring } from './motion'

/** Headline word that rises out of a 6px blur (Kaching hero reveal). Put spaces between <Word>s. */
export function Word({ children, i, start = 0.3 }: { children: ReactNode; i: number; start?: number }) {
  const still = useReducedMotion()
  return <motion.span className="inline-block" {...reveal(start + i * STAGGER, { y: still ? 0 : 28, blur: !still })}>{children}</motion.span>
}

/** Any block that should arrive on the timeline. */
export function Reveal({ at, y = 20, blur = false, className, children }: { at: number; y?: number; blur?: boolean; className?: string; children: ReactNode }) {
  const still = useReducedMotion()
  return <motion.div {...reveal(at, { y: still ? 0 : y, blur: blur && !still })} className={className}>{children}</motion.div>
}

/** Product stage: lifts from 97% and rises, fading in quickly (Kaching page-hero-stage). */
export function Stage({ at, className, children }: { at: number; className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} style={{ transformOrigin: '50% 0%' }}
      initial={{ opacity: 0, y: 64, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ y: { delay: at, duration: 1.4, ease: ease.reveal }, scale: { delay: at, duration: 1.4, ease: ease.outExpo }, opacity: { delay: at, duration: 0.5, ease: ease.outQuint } }}>
      {children}
    </motion.div>
  )
}

/** Double-bezel product frame: translucent shell + inner app surface. Radii are concentric (outer = inner + padding). */
export function Frame({ inner = 16, pad = 6, height, className = '', children }: { inner?: number; pad?: number; height?: number; className?: string; children: ReactNode }) {
  return (
    <div className={`bg-white/55 shadow-[var(--shadow-frame)] backdrop-blur-sm ${className}`} style={{ borderRadius: inner + pad, padding: pad }}>
      <div className="overflow-hidden bg-white shadow-[0_0_0_1px_rgba(23,23,23,0.06)]" style={{ borderRadius: inner, height }}>{children}</div>
    </div>
  )
}

/** Link track with a white pill that slides to the hovered item (shared layoutId). Items >= 36px tall. */
export function PillNav({ links, active, id = 'nav-pill' }: { links: string[]; active: string; id?: string }) {
  const [hover, setHover] = useState<string | null>(null)
  const on = hover ?? active
  return (
    <ul onMouseLeave={() => setHover(null)} className="flex items-center gap-0.5 rounded-[14px] bg-[var(--track,#ededed)] p-1 shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
      {links.map((l) => (
        <li key={l} className="relative">
          {on === l && <motion.span layoutId={id} transition={spring} className="absolute inset-0 rounded-[10px] bg-white shadow-[var(--shadow-ring)]" />}
          <a href="#" onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHover(l) }} onFocus={() => setHover(l)}
            className={`relative flex h-9 items-center rounded-[10px] px-3.5 text-[14px] font-[500] tracking-[-0.01em] transition-colors duration-[220ms] ${on === l ? 'text-[var(--ink)]' : 'text-[var(--sub)]'}`}>{l}</a>
        </li>
      ))}
    </ul>
  )
}

/** Segmented control: equal-width slots, labels centred, sliding pill; height matches neighbouring 32px controls. */
export function Segmented({ options, value, onChange, id = 'seg-pill', track = 12, pill = 8 }: { options: string[]; value: string; onChange: (v: string) => void; id?: string; track?: number; pill?: number }) {
  return (
    <div role="group" className="flex h-8 items-center gap-0.5 bg-[var(--weak,#f5f5f5)] p-0.5 text-[12px] font-[500] leading-none text-[var(--sub)]" style={{ borderRadius: track }}>
      {options.map((d) => (
        <button key={d} type="button" onClick={() => onChange(d)} aria-pressed={value === d}
          className={`relative flex h-7 w-10 items-center justify-center transition-colors duration-[220ms] ${value === d ? 'text-[var(--ink)]' : 'hover:text-[var(--ink)]'}`} style={{ borderRadius: pill }}>
          {value === d && <motion.span layoutId={id} transition={spring} className="absolute inset-0 bg-white shadow-[var(--shadow-ring)]" style={{ borderRadius: pill }} />}
          <span className="relative">{d}</span>
        </button>
      ))}
    </div>
  )
}

/** Number that rolls up on ease.link (Kaching count-up). Starts at 60% so it reads as settling, not counting. */
export function CountUp({ to, decimals = 0, suffix = '', at }: { to: number; decimals?: number; suffix?: string; at: number }) {
  const still = useReducedMotion()
  const v = useMotionValue(still ? to : to * 0.6)
  const text = useTransform(v, (n) => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix)
  useEffect(() => {
    if (still) return
    const c = animate(v, to, { delay: at, duration: 1.3, ease: ease.link })
    return () => c.stop()
  }, [v, to, at, still])
  return <motion.span className="tabular-nums">{text}</motion.span>
}

const fillBox = { transformBox: 'fill-box', transformOrigin: 'center' } as const

/** SVG route that draws from a source to an edge point; the endpoint lands when the line arrives, then pulses; a comet loops after.
 *  Render inside an <svg> that defines a gradient with id `gradientId`. */
export function Route({ d, end, at, order = 0, color = 'var(--accent,#335cff)', gradientId = 'route', draw = 1.1 }: {
  d: string; end: [number, number]; at: number; order?: number; color?: string; gradientId?: string; draw?: number
}) {
  const still = !!useReducedMotion()
  const land = at + draw
  return (
    <g>
      <motion.path d={d} fill="none" stroke={`url(#${gradientId})`} strokeWidth={1.25} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { delay: at, duration: draw, ease: ease.inOut }, opacity: { delay: at, duration: 0.3 } }} />
      {!still && (
        <motion.path d={d} fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
          initial={{ pathLength: 0.09, pathOffset: 0, opacity: 0 }} animate={{ pathOffset: [0, 0.91], opacity: [0, 1, 1, 0] }}
          transition={{ delay: land + 0.6 + order * 0.5, duration: 2.4, ease: ease.inOut, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: 1.8 }} />
      )}
      <motion.g style={fillBox} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: land - 0.08, duration: 0.6, ease: ease.outExpo }}>
        {!still && (
          <motion.circle cx={end[0]} cy={end[1]} r={6} fill={color} style={fillBox} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 0.6, 2.6], opacity: [0, 0.5, 0] }}
            transition={{ delay: land + 0.15, duration: 2.5, times: [0, 0.05, 1], ease: ease.outQuint, repeat: Infinity, repeatDelay: 0.8 + order * 0.15 }} />
        )}
        <circle cx={end[0]} cy={end[1]} r={3} fill="#fff" stroke={color} strokeWidth={1.5} />
      </motion.g>
    </g>
  )
}

/** Floating tile (icon card) that rises in, then bobs gently; straightens on hover. */
export function FloatTile({ x, y, at, rot = 0, title, children }: { x: number; y: number; at: number; rot?: number; title: string; children: ReactNode }) {
  const still = !!useReducedMotion()
  return (
    <motion.div className="absolute z-20" style={{ left: x - 26, top: y - 26 }}
      initial={{ opacity: 0, scale: 0.86, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ y: { delay: at, duration: dur.reveal, ease: ease.reveal }, scale: { delay: at, duration: dur.reveal, ease: ease.outExpo }, opacity: { delay: at, duration: 0.6 } }}>
      <motion.div animate={still ? undefined : { y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: at + 1 }}>
        <motion.div title={title} whileHover={{ scale: 1.06, rotate: 0 }} transition={{ duration: 0.35, ease: ease.outQuint }}
          className="grid size-[52px] place-items-center rounded-[14px] bg-white text-[var(--sub)] shadow-[var(--shadow-tile)]" style={{ rotate: rot }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Frame lines: rails draw down, a hairline draws out, registration nodes land. Pass x positions and the hairline y. */
export function Rails({ xs = [120, 1320], hairline = 88 }: { xs?: number[]; hairline?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {xs.map((l) => <motion.div key={l} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.6, ease: ease.outExpo }} className="absolute inset-y-0 w-px origin-top bg-[var(--rail,#e4e4e4)]" style={{ left: l }} />)}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.05, duration: 1.6, ease: ease.outExpo }} className="absolute inset-x-0 h-px bg-[var(--rail,#e4e4e4)]" style={{ top: hairline }} />
      {xs.map((l) => <motion.span key={`n${l}`} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.6, ease: ease.outExpo }} className="absolute size-[7px] rounded-[2px] bg-[var(--canvas,#f7f7f7)] shadow-[0_0_0_1px_#d4d4d4]" style={{ left: l - 3, top: hairline - 3 }} />)}
    </div>
  )
}

/** Scroll reveal (product-motion-patterns: ~0.7s, trigger when the block top reaches ~76% of the viewport, ~78ms stagger).
 *  Starts at 0.01 opacity (LCP-safe). Use `i` to stagger siblings. */
export function InView({ i = 0, y = 24, className, children }: { i?: number; y?: number; className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} initial={{ opacity: 0.01, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -24% 0px' }}
      transition={{ y: { delay: i * 0.078, duration: 0.9, ease: ease.reveal }, opacity: { delay: i * 0.078, duration: 0.6, ease: ease.outQuint } }}>
      {children}
    </motion.div>
  )
}

/** Rolling number (NumberFlow-style): every digit sits in its own masked slot and rolls up to its value; symbols ($ , . % s)
 *  stay still. On mount it rolls up from 0 at `at` seconds with a small left-to-right stagger; later changes roll only the
 *  digits that changed. Digits align from the right so 720 -> 721 moves one slot. Screen readers get the plain value.
 *  Slots are 1.2em tall: give static siblings (other stats in a row) line-height 1.2 too, or the rows sit apart. */
export function RollingNumber({ value, at = 0, stagger = 0.045, className = '' }: { value: string; at?: number; stagger?: number; className?: string }) {
  const still = useReducedMotion()
  const [born] = useState(() => performance.now())
  if (still) return <span className={`tabular-nums ${className}`}>{value}</span>
  const chars = [...value]
  const wait = Math.max(0, at - (performance.now() - born) / 1000)
  const first = wait > 0
  return (
    <span className={`relative inline-flex tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((c, i) => {
          const key = chars.length - i // keyed from the right so slots stay put when the value changes
          if (!/\d/.test(c)) return <span key={`s${key}${c}`} className="inline-block h-[1.2em] leading-[1.2em]">{c === ' ' ? '\u00a0' : c}</span> // same box as a digit slot; spaces kept (inline-block would collapse them)
          const d = Number(c)
          return (
            <span key={`d${key}`} className="relative inline-block h-[1.2em] overflow-hidden leading-[1.2em] [mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_91%,transparent)]">
              <span className="invisible">{c}</span>{/* sized to its own digit, so proportional figures keep their spacing */}
              <motion.span className="absolute inset-x-0 top-0 flex flex-col items-center" initial={{ y: '0%' }} animate={{ y: `${-d * 10}%` }}
                transition={{ delay: (first ? wait : 0) + i * stagger, duration: first ? 1.1 : 0.6, ease: ease.outExpo }}>
                {'0123456789'.split('').map((n) => <span key={n} className="h-[1.2em]">{n}</span>)}
              </motion.span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
