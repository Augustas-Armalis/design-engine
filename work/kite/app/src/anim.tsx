// Kite load-in: one timeline T (seconds from first paint). Everything that appears is placed on it, so the page
// assembles in one breath: shell -> title -> KPIs count up -> the map is scanned in, nodes light, routes draw, then sin1
// flares red -> regions cascade -> latency lines draw left to right. Kaching easing (reveal = soft start, long settle).
import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'

export const ease = { reveal: [0.26, 0.32, 0.14, 1], out: [0.16, 1, 0.3, 1], inOut: [0.45, 0, 0.2, 1] } as const
export const T = { side: 0, top: 0.06, title: 0.12, kpi: 0.18, map: 0.28, regions: 0.36, latency: 0.46, deploys: 0.52 }
export const SIN = T.map + 1.55 // the moment the degraded region flares

/** rises in like a sheet of glass settling: y, a touch of scale and blur, Kaching reveal curve */
export const rise = (at: number, y = 18) => ({
  initial: { opacity: 0, y, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { delay: at, duration: 1.1, ease: ease.out, opacity: { delay: at, duration: 0.6, ease: ease.out } },
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
