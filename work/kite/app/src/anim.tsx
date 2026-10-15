// Kite load-in: one timeline T (seconds from first paint). Everything that appears is placed on it, so the page
// assembles in one breath: shell -> title -> KPIs count up -> the map is scanned in, nodes light, routes draw, then sin1
// flares red -> regions cascade -> latency lines draw left to right. Kaching easing (reveal = soft start, long settle).
import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'

export const ease = { reveal: [0.26, 0.32, 0.14, 1], out: [0.16, 1, 0.3, 1], inOut: [0.45, 0, 0.2, 1] } as const
export const T = { side: 0, top: 0.06, title: 0.12, kpi: 0.18, map: 0.28, regions: 0.36, latency: 0.46, deploys: 0.52, sin: 0.28 + 1.55, step: 0.035, beam: true, dur: 1.1, y: 18 }
/** showcase (#/showcase): every component rises together as one slow wave (80ms apart, 1.6s settle), no scan beam:
    the map resolves pixel by pixel (stepped dither, sweeping left to right with jitter) while its card rises, and the
    sin1 alert lands as the wave settles. Applied with Object.assign(T, SHOWCASE_T) before the first render. */
export const SHOWCASE_T = { side: 0.1, top: 0.16, title: 0.22, kpi: 0.3, map: 0.38, regions: 0.46, latency: 0.54, deploys: 0.62, sin: 1.6, step: 0.04, beam: false, dur: 1.6, y: 28 }

/** rises in like a sheet of glass settling: y, a touch of scale and blur, Kaching reveal curve */
export const rise = (at: number, y = T.y) => ({
  initial: { opacity: 0, y, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { delay: at, duration: T.dur, ease: ease.out, opacity: { delay: at, duration: T.dur * 0.55, ease: ease.out } },
})

/** counts the number inside a formatted value ("1.84B", "0.021", "94.2") up from zero, keeping its decimals */
export function CountUp({ value, at, dur = 1.2 }: { value: string; at: number; dur?: number }) {
  const still = useReducedMotion()
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/)
  const target = m ? parseFloat(m[2].replace(/,/g, '')) : 0
  const dec = m && m[2].includes('.') ? m[2].split('.')[1].length : 0
  const [n, setN] = useState(still ? target : 0)
  useEffect(() => {
    if (still || !m) return
    const c = animate(0, target, { delay: at, duration: dur, ease: ease.out, onUpdate: setN })
    return () => c.stop()
  }, [at, dur, still, target]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <>{value}</>
  return <>{m[1]}{n.toFixed(dec)}{m[3]}</>
}

export const Rise = motion.div
