import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, MotionConfig, animate, motion, stagger, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

// tokens (measured medians in comments)
const outExpo = [0.16, 1, 0.3, 1] as const // dub.co hero ease; Kaching ease.outExpo
const outCubic = [0.33, 1, 0.68, 1] as const // attio+stripe ease; Kaching ease.link
const soft = [0, 0, 0.58, 1] as const // attio.com hero ease (CSS ease-out)

/* 1. Word reveal: 33-70ms per word, blur only if each word is its own span */
const words = { hidden: {}, show: { transition: { delayChildren: stagger(0.05, { startDelay: 0.1 }) } } }
const word = {
  hidden: { opacity: 0.01, y: 20, filter: 'blur(6px)' }, // 0.01 not 0: LCP lands at animation end when opacity starts at 0
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: outExpo } },
}
export function Headline({ text }: { text: string }) {
  return (
    <motion.h1 variants={words} initial="hidden" animate="show" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block" aria-hidden>{w}&nbsp;</motion.span>
      ))}
    </motion.h1>
  )
}

/* 2. Stage lift: opacity + y + scale from .975, starts 200-900ms after the headline, longer than text */
export const StageLift = ({ children, at = 0.5 }: { children: ReactNode; at?: number }) => (
  <motion.div style={{ transformOrigin: '50% 0%' }} initial={{ opacity: 0.01, y: 40, scale: 0.975 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: at, duration: 1.2, ease: outExpo, opacity: { delay: at, duration: 0.6 } }}>{children}</motion.div>
)

/* 3. layoutId pill: nav hover indicator (measured 200-550ms across sites) */
export function Nav({ items }: { items: string[] }) {
  const [on, setOn] = useState(items[0])
  return (
    <ul onMouseLeave={() => setOn(items[0])} className="relative flex">
      {items.map((l) => (
        <li key={l} className="relative">
          {on === l && <motion.span layoutId="pill" className="absolute inset-0 rounded-lg bg-white" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
          <a href="#" onMouseEnter={() => setOn(l)} onFocus={() => setOn(l)} className="relative px-3.5 py-2">{l}</a>
        </li>
      ))}
    </ul>
  )
}

/* 4. Count-up: starts in view, <=1s for hero figures (attio 933ms, stripe digits 325ms), tabular-nums */
export function CountUp({ to, ms = 900, format = (n: number) => Math.round(n).toLocaleString('en-US') }: { to: number; ms?: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -24% 0px' })
  const reduce = useReducedMotion()
  const v = useMotionValue(reduce ? to : 0)
  const text = useTransform(v, format)
  useEffect(() => { if (inView && !reduce) { const c = animate(v, to, { duration: ms / 1000, ease: [0.33, 1, 0.68, 1] }); return () => c.stop() } }, [inView, reduce, to, ms, v])
  return <motion.span ref={ref} className="tabular-nums">{text}</motion.span>
}

/* 5. Route draw with landing dot: dot appears when the stroke arrives, then breathes slowly */
export function Route({ d, x, y, delay = 1.5, draw = 1.1 }: { d: string; x: number; y: number; delay?: number; draw?: number }) {
  return (
    <g>
      <motion.path d={d} fill="none" stroke="currentColor" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { delay, duration: draw, ease: [0.65, 0, 0.35, 1] }, opacity: { delay, duration: 0.3 } }} />
      <motion.circle cx={x} cy={y} r={3} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: delay + draw - 0.08, duration: 0.6, ease: outExpo }} />
    </g>
  )
}

/* 6. Scroll reveal group: fires with block top at 76% of viewport (measured median), 80ms step, <=20px, 2px blur */
const group = { hidden: {}, show: { transition: { delayChildren: stagger(0.08) } } }
const item = {
  hidden: { opacity: 0.01, y: 12, filter: 'blur(2px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.47, ease: outCubic } },
}
export const RevealGroup = ({ children }: { children: ReactNode }) => (
  <motion.div variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -24% 0px' }}>{children}</motion.div>
)
export const RevealItem = ({ children }: { children: ReactNode }) => <motion.div variants={item}>{children}</motion.div>

/* 7. Tab content crossfade: exit about half of enter (commslayer 220 out / 450 in), 4px blur + 9px drift on text swaps */
export function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={id} initial={{ opacity: 0, filter: 'blur(4px)', y: 9 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, filter: 'blur(4px)', y: -9, transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } }}>{children}</motion.div>
    </AnimatePresence>
  )
}

/* 8. Bento hover: measured peers rarely lift large panels (1 of 37 changed anything); react on 150ms colour/border, nudge only inner media */
export const BentoCard = ({ children }: { children: ReactNode }) => (
  <motion.article whileHover="hover" className="group rounded-2xl border border-black/10 bg-white transition-[border-color,background-color] duration-150 ease-[cubic-bezier(.4,0,.2,1)] hover:border-black/20">
    <motion.div variants={{ hover: { scale: 1.015 } }} transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}>{children}</motion.div>
  </motion.article>
)

/* 9. Marquee with pause: 24-51 px/s (median 35), pause on hover and while offscreen, static under reduced motion */
export function Marquee({ children, width, pxPerSec = 40 }: { children: ReactNode; width: number; pxPerSec?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '100px' })
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const ctl = useRef<ReturnType<typeof animate> | null>(null)
  useEffect(() => {
    if (reduce) return
    ctl.current = animate(x, -width, { duration: width / pxPerSec, ease: 'linear', repeat: Infinity, repeatType: 'loop' })
    return () => ctl.current?.stop()
  }, [reduce, width, pxPerSec, x])
  useEffect(() => { if (inView) ctl.current?.play(); else ctl.current?.pause() }, [inView])
  return (
    <div ref={ref} className="overflow-hidden" onMouseEnter={() => ctl.current?.pause()} onMouseLeave={() => inView && ctl.current?.play()}>
      <motion.div style={{ x }} className="flex w-max">{children}{children}</motion.div>
    </div>
  )
}

/* 10. Reduced motion: opacity stays, travel/blur/scale/loops go; one switch at the root */
export const Root = ({ children }: { children: ReactNode }) => <MotionConfig reducedMotion="user">{children}</MotionConfig>
export function useTravel(px: number) { return useReducedMotion() ? 0 : px }

/* 11. Digit roll (stripe-style): per-digit translateY, 325ms, 50ms apart */
export function DigitRoll({ value }: { value: string }) {
  return (
    <span className="inline-flex overflow-hidden tabular-nums" aria-label={value}>
      {value.split('').map((c, i) => (
        <motion.span key={`${i}-${c}`} aria-hidden initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ delay: i * 0.05, duration: 0.325, ease: [0.33, 1, 0.68, 1] }}>{c}</motion.span>
      ))}
    </span>
  )
}

/* 12. Stroke draw (signature / underline): 1.1s eased, second stroke after a beat (commslayer 1091ms then 500ms at +2021ms) */
export const Stroke = ({ d, delay = 0.98 }: { d: string; delay?: number }) => (
  <motion.path d={d} fill="none" stroke="currentColor" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
    transition={{ delay, duration: 1.09, ease: [0.28, 0.12, 0.5, 0.92] }} />
)

/* 13. Pause an ambient loop offscreen (8 of 9 measured sites keep offscreen loops running) */
export function useOffscreenPause<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { margin: '120px' })
  return { ref, style: { animationPlayState: inView ? 'running' : 'paused' } as const }
}

export { soft }
