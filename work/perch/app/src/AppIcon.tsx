// Perch app icon, drawn as an object (macOS icon grammar), not a letter in a box: a white Apple-grid squircle, the black
// notch tab hanging from its top edge, and two clips perching on the tab's lower lip (one brand orange, one paper white)
// as if just pulled out. Read at 16px it is "black tab + orange"; at 128px the lip highlight and card edges show.
import { useId } from 'react'
import { getSquirclePath } from './squircle'

export default function AppIcon({ size = 28 }: { size?: number }) {
  const id = useId().replace(/:/g, '')
  const S = 100, body = getSquirclePath({ width: 82, height: 82, radius: 22, smoothing: 0.6 })
  return (
    <svg viewBox={`0 0 ${S} ${S}`} width={size} height={size} aria-hidden className="shrink-0">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e6e7eb" /></linearGradient>
        <linearGradient id={`${id}o`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff8a55" /><stop offset="1" stopColor="#f2541f" /></linearGradient>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2a2d" /><stop offset="1" stopColor="#050506" /></linearGradient>
        <clipPath id={`${id}c`}><path d={body} transform="translate(9 9)" /></clipPath>
        <filter id={`${id}s`} x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.4" floodColor="#000" floodOpacity="0.28" /></filter>
      </defs>
      <path d={body} transform="translate(9 9)" fill={`url(#${id}b)`} />
      <g clipPath={`url(#${id}c)`}>
        {/* the clips, fanned, tucked under the tab */}
        <g filter={`url(#${id}s)`}>
          <rect x="31" y="34" width="25" height="31" rx="6" transform="rotate(-11 43 50)" fill="#fff" stroke="#d9dade" strokeWidth="1" />
          <rect x="45" y="36" width="25" height="31" rx="6" transform="rotate(9 57 52)" fill={`url(#${id}o)`} />
          <rect x="49.5" y="44" width="13" height="2.6" rx="1.3" transform="rotate(9 57 52)" fill="#fff" opacity="0.85" />
          <rect x="49.5" y="49.5" width="9" height="2.6" rx="1.3" transform="rotate(9 57 52)" fill="#fff" opacity="0.6" />
        </g>
        {/* the notch tab: flat top in the icon's top edge, continuous lower corners, a lit lip */}
        <path d="M27 9 H73 V30 C73 38.5 69.5 42 61 42 H39 C30.5 42 27 38.5 27 30 Z" fill={`url(#${id}t)`} />
        <path d="M30.5 37.6 C33 40.6 35.6 41.2 39 41.2 H61 C64.4 41.2 67 40.6 69.5 37.6" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />
        <circle cx="50" cy="20" r="2.4" fill="#18181b" stroke="#3a3a40" strokeWidth="0.8" />
      </g>
      <path d={body} transform="translate(9 9)" fill="none" stroke="#000" strokeOpacity="0.1" strokeWidth="1" />
    </svg>
  )
}
