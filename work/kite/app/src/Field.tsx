// Hero texture: the same dot-matrix world as the product map, very faint, fading out at the edges, with a few soft
// region lights. It is texture behind the type (founder: no colour blobs), so it stays monochrome and under 14% white.
import { useMemo } from 'react'
import { geoEqualEarth } from 'd3-geo'
import { landMask } from './geo'
import { regions } from './data'

export default function Field({ w = 1440, h = 760, step = 7, opacity = 0.12, id = 'f' }: { w?: number; h?: number; step?: number; opacity?: number; id?: string }) {
  const { dots, P } = useMemo(() => {
    const proj = geoEqualEarth().fitExtent([[-40, -60], [w + 40, h + 160]], { type: 'Sphere' } as never)
    const isLand = landMask(proj, w, h)
    const dots: [number, number][] = []
    for (let y = step / 2; y < h; y += step) for (let x = step / 2; x < w; x += step) {
      const ll = proj.invert!([x, y]); if (!ll || ll[1] < -56) continue
      if (isLand(x, y)) dots.push([x, y])
    }
    return { dots, P: regions.map((r) => proj([r.lon, r.lat])!) }
  }, [w, h, step])
  return (
    <svg width={w} height={h} className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2" aria-hidden>
      <defs>
        <radialGradient id={`${id}-fade`} cx="50%" cy="45%" r="55%"><stop offset="0.35" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
        <mask id={`${id}-m`}><rect width={w} height={h} fill={`url(#${id}-fade)`} /></mask>
        <radialGradient id={`${id}-g`}><stop offset="0" stopColor="#fff" stopOpacity="0.5" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <g mask={`url(#${id}-m)`}>
        {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.1} fill="#fff" fillOpacity={opacity} />)}
        {P.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={26} fill={`url(#${id}-g)`} opacity={0.35} /><circle cx={x} cy={y} r={2} fill="#fff" fillOpacity={0.6} /></g>)}
      </g>
    </svg>
  )
}
