// A macOS-style abstract wallpaper (original, not Apple's): three soft folded ribbons of warm light over a deep plum,
// built from blurred SVG paths + fine grain. Brand orange lives here, so the page around it can stay neutral.
export default function Wallpaper() {
  return (
    <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <linearGradient id="wp-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#eef0dc" /><stop offset="0.35" stopColor="#9fd39a" /><stop offset="0.68" stopColor="#1f9a57" /><stop offset="1" stopColor="#0c3a26" /></linearGradient>
        <linearGradient id="wp-r1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fbfbef" /><stop offset="0.5" stopColor="#c9e6b4" /><stop offset="1" stopColor="#5cc27a" /></linearGradient>
        <linearGradient id="wp-r2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3fbf6e" /><stop offset="1" stopColor="#0f5a37" /></linearGradient>
        <linearGradient id="wp-r3" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#0a2e1e" /><stop offset="1" stopColor="#1b8a4f" /></linearGradient>
        <filter id="wp-b1"><feGaussianBlur stdDeviation="28" /></filter>
        <filter id="wp-b2"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="wp-n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0" /></filter>
      </defs>
      <rect width="1200" height="760" fill="url(#wp-bg)" />
      <path d="M-120 210 C 180 60, 420 330, 700 220 S 1120 40, 1340 170 L 1340 360 C 1080 260, 900 470, 640 430 S 160 300, -120 420 Z" fill="url(#wp-r1)" opacity="0.9" filter="url(#wp-b1)" />
      <path d="M-120 430 C 160 330, 420 560, 720 470 S 1140 300, 1340 400 L 1340 620 C 1060 520, 860 720, 600 660 S 140 520, -120 640 Z" fill="url(#wp-r2)" opacity="0.95" filter="url(#wp-b2)" />
      <path d="M-120 640 C 220 560, 480 760, 780 680 S 1160 560, 1340 640 L 1340 900 L -120 900 Z" fill="url(#wp-r3)" opacity="0.95" filter="url(#wp-b2)" />
      <path d="M-120 300 C 200 200, 430 420, 720 330 S 1130 170, 1340 270" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" filter="url(#wp-b2)" />
      <rect width="1200" height="760" filter="url(#wp-n)" />
    </svg>
  )
}
