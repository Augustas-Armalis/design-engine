// Tempra mark: four quarter-discs on a 2x2 grid, an hour cut into quarters that also reads as a calendar grid.
// Placeholder sourced from a Pinterest pin (work/tempra/brand/ref/SOURCE.txt), traced (tempra-mark.svg) and then redrawn
// as exact geometry: cells 47 with a 6 gap, every disc centred on its cell's bottom-right corner. Fictional brand, not client work.
import type { CSSProperties } from 'react'

const C = 47, G = 6
const quarter = (x: number, y: number) => `M${x + C} ${y + C}H${x}A${C} ${C} 0 0 1 ${x + C} ${y}Z`
export const MARK_PATH = [quarter(0, 0), quarter(C + G, 0), quarter(0, C + G), quarter(C + G, C + G)].join('')

export function Mark({ size = 24, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" aria-hidden style={{ display: 'block', flex: 'none', ...style }}>
      <path d={MARK_PATH} />
    </svg>
  )
}

export default function TempraLockup({ size = 22, style }: { size?: number; style?: CSSProperties }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.45, ...style }}>
      <Mark size={size} />
      <span style={{ fontSize: size, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1 }}>Tempra</span>
    </span>
  )
}
