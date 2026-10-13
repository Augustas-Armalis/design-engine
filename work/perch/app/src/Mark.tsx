// Perch mark: placeholder traced from the founder's reference (LogoFav / Matsuura). Three leaning ellipses fitted to the
// reference pixels (1.0% area error, work/perch/brand/ref/ellipses.json) joined by a smooth-union fillet. Local concept
// only: this is another company's mark and must be replaced before anything is published.
import { useId } from 'react'

const E = [[13.13,64.54,10.77,21.12,24.38],[40.44,58.39,14.16,27.87,24.13],[77.06,50,18.91,37.01,24.09]] as const
const BOX = { x: -1.0, y: 14.3, w: 102.0, h: 71.3 } // tight to the fitted shape

export default function Mark({ size = 28, color = '#1eaf5c', className = '' }: { size?: number; color?: string; className?: string }) {
  const id = useId().replace(/:/g, '')
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16) / 255)
  return (
    <svg viewBox={`${BOX.x} ${BOX.y} ${BOX.w} ${BOX.h}`} height={size} width={(size * BOX.w) / BOX.h} aria-hidden className={`shrink-0 overflow-visible ${className}`}>
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="1.15" />
          <feColorMatrix values={`0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 24 -11.5`} />
        </filter>
      </defs>
      <g filter={`url(#${id})`} fill={color}>
        {E.map(([cx, cy, rx, ry, a], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${a} ${cx} ${cy})`} />)}
      </g>
    </svg>
  )
}
