// FxR2 (study only, never published): emitted-light orb. Effect layer replica of a dark hero's signature visual.
// Reference crop: work/replicas/fx/refs/fxr2-ref.png (640x510 CSS at 2x; source in knowledge/web/effects-replicas-2026-10.md).
// Labels in the cards are neutral placeholders; only the light, glass and field are studied.
// Measured construction (CSS px in the 640x510 frame):
//  - canvas #0c0c0f; a corner wash rgba(58,30,80) from the top-left; violet halo around the shell (r164 -> r230)
//  - glass shell: circle c(321,310) r164, rim 1.5px lavender, fill brightest at the rim (#8052d6 at r-2) and dark inside
//  - the core sphere: circle c(321,328) r146, tangent to the shell at the bottom; vertical ramp
//    #f6ebff(182) #faa8ff(192) #d087ff(204) #aa6eff(228) #8a5aff(258) #754fff(300) #4d33ff(340) #4630d7(380) #4b35af(420) #7e5ac7(450)
//  - the shell's own vertical ramp is near-white #f8efff for its top 11% (146..182): the lit cap, with grain
//  - 15 meridians: ellipses c(321,328) rx 20k ry 146 (k=1..7 + centre); each band is brightest at its outer meridian
//  - one equator orbit (ellipse c(321,260) 362x56) and two atom loops (fitted conics) + an X through the centre
//  - flares: radial white blooms r10-13 where an orbit pierces the shell
//  - dot globe: concentric rings around the core, 11px radial and tangential pitch, 1px dots, alpha by distance
import { useEffect, useRef } from 'react'
import '@fontsource-variable/manrope'

const W = 640, H = 510
const C = { x: 321, y: 310, r: 164 }       // glass shell
const K = { x: 321, y: 328, r: 146 }       // core sphere

function rng(seed: number) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }

function DotField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!; const d = 2; cv.width = W * d; cv.height = H * d
    const g = cv.getContext('2d')!; g.scale(d, d)
    // dot globe: rings around the core
    for (let r = 176; r < 560; r += 11) {
      const n = Math.round((2 * Math.PI * r) / 11)
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2 + r * 0.013
        const x = K.x + Math.cos(t) * r, y = K.y - 10 + Math.sin(t) * r * 0.98
        if (x < -2 || x > W + 2 || y < -2 || y > H + 2) continue
        const fall = Math.max(0, 1 - (r - 176) / 420)
        const wave = 0.55 + 0.45 * Math.cos(t * 3 + r * 0.035)            // the moire bands of the globe
        const top = Math.min(1, Math.max(0.15, (y - 40) / 160))             // fades toward the top of the frame
        const a = Math.min(1, 2.2 * fall * wave * top)
        if (a < 0.05) continue
        const right = Math.min(1, Math.max(0, (x - 140) / 360))            // purple-pink left, blue-violet right
        const cr = Math.round(160 - 70 * right), cg = Math.round(90 - 40 * right), cb = Math.round(215 + 40 * right)
        g.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`
        g.beginPath(); g.arc(x, y, 1.0, 0, Math.PI * 2); g.fill()
      }
    }
    // stars
    const R = rng(7)
    for (let i = 0; i < 70; i++) {
      const x = R() * W, y = R() * 240, a = 0.25 + R() * 0.6, s = R() < 0.15 ? 1.1 : 0.6
      g.fillStyle = `rgba(235,225,255,${a.toFixed(2)})`; g.beginPath(); g.arc(x, y, s, 0, Math.PI * 2); g.fill()
    }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: W, height: H }} />
}

function Card({ x, y, w, h, flip }: { x: number; y: number; w: number; h: number; flip?: boolean }) {
  // glass card: outer bezel r34 (1px lavender ring, brightest at the corner nearest the light) + inner panel r22 with a
  // pink-violet 1.5px edge and a 3px-pitch pixel dot texture
  const id = `cg${flip ? 'r' : 'l'}`
  return (
    <svg width={w} height={h} style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      <defs>
        <linearGradient id={`${id}o`} x1={flip ? 0 : 1} y1="0" x2={flip ? 1 : 0} y2="0.6">
          <stop offset="0" stopColor="#e2c8ff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#9b78d6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5b4690" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}i`} x1={flip ? 0 : 1} y1="0" x2={flip ? 1 : 0} y2="0.5">
          <stop offset="0" stopColor="#d77dff" />
          <stop offset="0.5" stopColor="#a35ae0" />
          <stop offset="1" stopColor="#6f3fb0" stopOpacity="0.7" />
        </linearGradient>
        <pattern id={`${id}d`} width="3" height="3" patternUnits="userSpaceOnUse">
          <rect x="0.5" y="0.5" width="1.5" height="1.5" fill="#8a45c8" fillOpacity="0.55" />
        </pattern>
      </defs>
      <rect x="0.5" y="0.5" width={w - 1} height={h + 40} rx="34" fill="#1f1733" fillOpacity="0.92" stroke={`url(#${id}o)`} strokeWidth="1.5" />
      <rect x={flip ? 12.5 : 0.5 - 40} y="12.5" width={w - 12 + 40 - 1} height={h + 40} rx="22" fill="#1d1430" stroke={`url(#${id}i)`} strokeWidth="1.5" />
      <rect x={flip ? 14 : -40} y="14" width={w - 14 + 40 - 2} height={h + 40} rx="20" fill={`url(#${id}d)`} />
      {!flip && <g>
        <rect x={-60} y="34.5" width={206} height="43" rx="21.5" fill="#4a2a6a" fillOpacity="0.92" stroke="#b98ae8" strokeOpacity="0.35" />
        <text x="140" y="64" textAnchor="end" fontFamily="Manrope Variable, sans-serif" fontSize="19" fill="#e7d6ff" letterSpacing="0.2">Value 16,900</text>
        <path d="M137 101 L151 77 L151 101 Z" fill="#f4ecff" />
      </g>}
      {flip && <text x="33" y="61" fontFamily="Manrope Variable, sans-serif" fontSize="18" fill="#dcc8ff">Activity</text>}
    </svg>
  )
}

export default function FxR2() {
  const merid = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#0c0c0f', cornerShape: 'round' } as React.CSSProperties}>
      {/* corner wash + broad violet bloom around the orb */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(420px 300px at 0px 0px, rgba(52,28,76,0.85), rgba(28,18,40,0.35) 55%, transparent 80%), radial-gradient(260px 240px at 321px 300px, rgba(70,40,150,0.42), rgba(45,25,90,0.22) 62%, transparent 100%)' }} />
      <DotField />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="halo" cx={C.x} cy={C.y} r={232} gradientUnits="userSpaceOnUse">
            <stop offset={164 / 232} stopColor="#5a2ed0" stopOpacity="0.85" />
            <stop offset={172 / 232} stopColor="#43209a" stopOpacity="0.55" />
            <stop offset={190 / 232} stopColor="#2c1a55" stopOpacity="0.35" />
            <stop offset={210 / 232} stopColor="#1a1228" stopOpacity="0.2" />
            <stop offset="1" stopColor="#0c0c0f" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shell" cx={C.x} cy={C.y} r={C.r} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2a1470" stopOpacity="0.6" />
            <stop offset="0.86" stopColor="#3f20a8" stopOpacity="0.8" />
            <stop offset="0.93" stopColor="#5d34c8" />
            <stop offset="0.985" stopColor="#8c5ae6" />
            <stop offset="1" stopColor="#c69cff" />
          </radialGradient>
          <linearGradient id="core" x1="0" y1={K.y - K.r} x2="0" y2={K.y + K.r} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f6ebff" />
            <stop offset={4 / 292} stopColor="#f6cfff" />
            <stop offset={10 / 292} stopColor="#faa8ff" />
            <stop offset={22 / 292} stopColor="#d087ff" />
            <stop offset={46 / 292} stopColor="#aa6eff" />
            <stop offset={76 / 292} stopColor="#7c4cff" />
            <stop offset={118 / 292} stopColor="#5f3cfa" />
            <stop offset={158 / 292} stopColor="#4528e6" />
            <stop offset={198 / 292} stopColor="#3a24c4" />
            <stop offset={238 / 292} stopColor="#3c2a9c" />
            <stop offset={268 / 292} stopColor="#6e50b8" />
            <stop offset={282 / 292} stopColor="#9a6ed8" />
            <stop offset="1" stopColor="#e9d4ff" />
          </linearGradient>
          <radialGradient id="limb" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.82" stopColor="#d8b4ff" stopOpacity="0" />
            <stop offset="1" stopColor="#d8b4ff" stopOpacity="0.28" />
          </radialGradient>
          <linearGradient id="shellV" x1="0" y1={146} x2="0" y2={474} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e2c8ff" />
            <stop offset={4 / 328} stopColor="#f8efff" />
            <stop offset={36 / 328} stopColor="#f8efff" />
            <stop offset={48 / 328} stopColor="#f2a6ff" />
            <stop offset={78 / 328} stopColor="#bf6cff" />
            <stop offset={120 / 328} stopColor="#9050f8" />
            <stop offset={184 / 328} stopColor="#7c50d6" />
            <stop offset={260 / 328} stopColor="#5f36c4" />
            <stop offset="1" stopColor="#7a50d8" />
          </linearGradient>
          <radialGradient id="shellEdge" cx={C.x} cy={C.y} r={C.r} gradientUnits="userSpaceOnUse">
            <stop offset="0.9" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.985" stopColor="#e8c8ff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#f4e4ff" stopOpacity="0.45" />
          </radialGradient>
          <linearGradient id="atmoFade" x1="0" y1="110" x2="0" y2="270" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.35" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="atmoMask"><rect width={W} height={H} fill="url(#atmoFade)" /></mask>
          <radialGradient id="under" cx={321} cy={478} r={175} gradientTransform="translate(0 478) scale(1 0.32) translate(0 -478)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#5a1ff0" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#4a1ac0" stopOpacity="0.6" />
            <stop offset="1" stopColor="#2a1270" stopOpacity="0" />
          </radialGradient>
          {merid.map((k) => (
            <radialGradient key={k} id={`band${k}`} cx="0.5" cy="0.5" r="0.5">
              <stop offset={1 - 1 / k} stopColor="#c8a8ff" stopOpacity="0" />
              <stop offset={1 - 0.35 / k} stopColor="#a878ff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#c08cff" stopOpacity="0.45" />
            </radialGradient>
          ))}
          <filter id="grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="3" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.35" />
          </filter>
          <filter id="grainDark" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="9" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.02  0 0 0 0 0.25  0 0 0 2.4 -1.25" />
          </filter>
          <filter id="haze" x="-50%" y="-80%" width="200%" height="260%"><feGaussianBlur stdDeviation="9" /></filter>
          <filter id="atmo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
          <radialGradient id="flare">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#fff6ff" stopOpacity="0.95" />
            <stop offset="0.6" stopColor="#f2d8ff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#d8b8ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dim">
            <stop offset="0" stopColor="#c9c0d8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#c9c0d8" stopOpacity="0" />
          </radialGradient>
          <clipPath id="coreClip"><circle cx={K.x} cy={K.y} r={K.r} /></clipPath>
          <clipPath id="shellClip"><circle cx={C.x} cy={C.y} r={C.r} /></clipPath>
          <mask id="outside"><rect width={W} height={H} fill="#fff" /><circle cx={C.x} cy={C.y} r={C.r - 1} fill="#000" /></mask>
        </defs>

        <circle cx={C.x} cy={C.y} r={232} fill="url(#halo)" />
        {/* atmosphere haze above the cap, and the emission under the core */}
        <circle cx={C.x} cy={C.y + 4} r={C.r + 9} fill="none" stroke="#9a66ff" strokeWidth="18" opacity="0.8" filter="url(#atmo)" mask="url(#atmoMask)" />
        <ellipse cx={321} cy={478} rx={175} ry={56} fill="url(#under)" />

        {/* atom loops (behind; only outside the shell) */}
        <g mask="url(#outside)" fill="none" stroke="#b07cf0" strokeWidth="1.1" strokeOpacity="0.85">
          <ellipse cx={318.7} cy={215} rx={221} ry={63.7} transform="rotate(51.6 318.7 215)" />
          <ellipse cx={294.5} cy={237.3} rx={246.8} ry={65.2} transform="rotate(-47.4 294.5 237.3)" />
          <ellipse cx={321} cy={260} rx={362} ry={56} transform="rotate(0.8 321 260)" stroke="#a96ff0" />
        </g>

        {/* shell */}
        <circle cx={C.x} cy={C.y} r={C.r} fill="url(#shell)" />
        <g clipPath="url(#shellClip)">
          <rect x={C.x - C.r} y={C.y - C.r} width={C.r * 2} height={C.r * 2} filter="url(#grainDark)" opacity="0.5" />
          <rect x={C.x - C.r} y={C.y - C.r} width={C.r * 2} height={C.r * 2} fill="url(#shellV)" />
          <circle cx={C.x} cy={C.y} r={C.r} fill="url(#shellEdge)" />
        </g>
        <circle cx={C.x} cy={C.y} r={C.r - 0.6} fill="none" stroke="#d5b4ff" strokeWidth="1.4" strokeOpacity="0.9" />

        {/* core sphere */}
        <g clipPath="url(#coreClip)">
          <circle cx={K.x} cy={K.y} r={K.r} fill="url(#core)" />
          {merid.slice().reverse().map((k) => <ellipse key={k} cx={K.x} cy={K.y} rx={20 * k} ry={K.r} fill={`url(#band${k})`} />)}
          <circle cx={K.x} cy={K.y} r={K.r} fill="url(#limb)" opacity="0.5" />
          <g fill="none" stroke="#e2c4ff" strokeOpacity="0.72" strokeWidth="1.1">
            {merid.map((k) => <ellipse key={k} cx={K.x} cy={K.y} rx={20 * k} ry={K.r} />)}
            <line x1={K.x} y1={K.y - K.r} x2={K.x} y2={K.y + K.r} />
          </g>
          <rect x={K.x - K.r} y={K.y - K.r} width={K.r * 2} height={K.r * 2} filter="url(#grain)" opacity="0.07" />
          {/* white cap overlaps the top of the core */}
        </g>
        <circle cx={K.x} cy={K.y} r={K.r - 0.5} fill="none" stroke="#f0dcff" strokeWidth="1.3" strokeOpacity="0.85" />

        {/* front orbit + X through the centre */}
        <g fill="none" stroke="#f0d8ff" strokeOpacity="0.9" strokeWidth="1.1">
          <path d={`M ${C.x - C.r} 312 Q 321 320 ${C.x + C.r} 314`} />
          <line x1={234} y1={207} x2={446} y2={432} />
          <line x1={398} y1={215} x2={196} y2={438} />
        </g>
        {/* flares where orbits pierce the shell */}
        <circle cx={235} cy={207} r={22} fill="url(#flare)" />
        <circle cx={399} cy={216} r={18} fill="url(#flare)" />
        <ellipse cx={451} cy={313} rx={20} ry={12} fill="url(#flare)" />
        <circle cx={370} cy={85} r={10} fill="url(#dim)" />
        <circle cx={126} cy={208} r={8} fill="url(#dim)" />
      </svg>
      <Card x={-30} y={410.5} w={218} h={100} />
      <Card x={453} y={412} w={220} h={98} flip />
    </div>
  )
}
