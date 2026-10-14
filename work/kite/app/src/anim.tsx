// Kite load-in: one timeline T (seconds from first paint). Everything that appears is placed on it, so the page
// assembles in one breath: shell -> title -> KPIs count up -> the map is scanned in, nodes light, routes draw, then sin1
// flares red -> regions cascade -> latency lines draw left to right. Kaching easing (reveal = soft start, long settle).
import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'

export const ease = { reveal: [0.26, 0.32, 0.14, 1], out: [0.22, 1, 0.36, 1], inOut: [0.65, 0, 0.35, 1] } as const
export const T = { side: 0.05, top: 0.12, title: 0.22, kpi: 0.36, map: 0.52, regions: 0.66, latency: 0.84, deploys: 0.94 }
export const SIN = T.map + 2.05 // the moment the degraded region flares

/** rises in like a sheet of glass settling: y, a touch of scale and blur, Kaching reveal curve */
export const rise = (at: number, y = 18) => ({
  initial: { opacity: 0, y, scale: 0.985, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  transition: { delay: at, duration: 1.0, ease: ease.reveal, opacity: { delay: at, duration: 0.5, ease: ease.out } },
})

/** counts the number inside a formatted value ("1.84B", "0.021", "94.2") up from zero, keeping its decimals */
export function CountUp({ value, at, dur = 1.1 }: { value: string; at: number; dur?: number }) {
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
