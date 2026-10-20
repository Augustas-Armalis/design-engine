// Field lab (#/lab): Taxo-grammar silk fields (one blue ramp, lit top right, falling to black), fine grain in the light only.
import { Warp } from '@paper-design/shaders-react'

const RAMP = ['#030406', '#0a2f5f', '#2365a4', '#cfe0f5']
const V = [
  { name: 'edge .15', shape: 'edge', shapeScale: 0.15, distortion: 0.25, swirl: 0.6, proportion: 0.45, rotation: 200 },
  { name: 'edge .3', shape: 'edge', shapeScale: 0.3, distortion: 0.35, swirl: 0.9, proportion: 0.5, rotation: 220 },
  { name: 'stripes', shape: 'stripes', shapeScale: 0.12, distortion: 0.3, swirl: 0.7, proportion: 0.42, rotation: 210 },
  { name: 'checks', shape: 'checks', shapeScale: 0.08, distortion: 0.2, swirl: 0.8, proportion: 0.45, rotation: 200 },
] as const

export const Grain = ({ o = 0.32 }: { o?: number }) => (
  <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" style={{ mixBlendMode: 'overlay', opacity: o }}>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
)

export default function Lab() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white p-4">
      {V.map((v) => (
        <div key={v.name} className="relative overflow-hidden rounded-[16px]" style={{ width: 720, height: 450 }}>
          <Warp style={{ width: '100%', height: '100%' }} colors={[...RAMP]} shape={v.shape} shapeScale={v.shapeScale} distortion={v.distortion} swirl={v.swirl} swirlIterations={10} proportion={v.proportion} softness={1} rotation={v.rotation} speed={0} frame={6000} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, #030406 95%)' }} />
          <Grain />
          <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 text-[12px]">{v.name}</span>
        </div>
      ))}
    </div>
  )
}
