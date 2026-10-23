// Lintel's mark: a placeholder for a fictional brand, redrawn from a Pinterest pin (work/lintel/brand/ref/SOURCE.txt). Four equal
// pieces in a 2x2, each a square with its top-right and bottom-left corners chamfered by half; neighbours touch at one point,
// so the 45° cuts read as one diagonal weave. Drawn as exact geometry (the auto-trace rounded the chamfers).
const piece = (x: number, y: number) => `M${x} ${y}h25l25 25v25h-25l-25-25z`
const D = [piece(0, 0), piece(50, 0), piece(0, 50), piece(50, 50)].join('')

export function Mark({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden style={{ display: 'block', flex: 'none' }}><path d={D} fill={color} /></svg>
}

export default function LintelLockup({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(size * 0.45), color }}>
      <Mark size={size} />
      <span style={{ fontSize: Math.round(size * 0.95), fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1 }}>Lintel</span>
    </span>
  )
}
