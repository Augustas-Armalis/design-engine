// Three-image X post of the Tandem product (Marcel Kargul's format: one product, cut into close crops, on a soft field).
// X lays out 3 images as one tall left cell (~8:9) and two stacked 16:9 cells, so: #/x3-1 = 1600x1800 hero piece (the
// approval card alone), #/x3-2 = 1600x900 sidebar + thread crop, #/x3-3 = 1600x900 approval + run details crop.
// The windows bleed off the canvas edge on purpose: a crop of a real product, not a framed screenshot.
import type { ReactNode } from 'react'
import Product from './Product'
import Approval from './Approval'

/** soft periwinkle field in Tandem's blue: layered radial light + fine grain, lit from the upper left */
function Field({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  return (
    <div className="relative mx-auto overflow-hidden" style={{ width: w, height: h, background: '#dfe6fb' }}>
      <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(70% 60% at 18% 12%, #f7f9ff 0%, transparent 70%), radial-gradient(60% 55% at 92% 90%, #b7c8ff 0%, transparent 72%), radial-gradient(45% 40% at 85% 15%, #e9e0ff 0%, transparent 70%), linear-gradient(160deg, #eef2fd 0%, #d6dffa 55%, #c4d2fb 100%)' }} />
      <div aria-hidden className="absolute inset-0 opacity-[0.35] mix-blend-soft-light" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")", backgroundSize: '180px 180px' }} />
      {children}
    </div>
  )
}

/** a crop window: the real product at `zoom`, shifted so (sx, sy) of the product sits at the window's top-left */
function Crop({ x, y, w, h, zoom, sx, sy, radius = 22 }: { x: number; y: number; w: number; h: number; zoom: number; sx: number; sy: number; radius?: number }) {
  return (
    <div className="absolute overflow-hidden bg-white" style={{ left: x, top: y, width: w, height: h, borderRadius: radius, boxShadow: '0 0 0 1px rgba(30,45,110,0.08), 0 2px 4px rgba(30,45,110,0.06), 0 30px 60px -20px rgba(30,45,110,0.28)' }}>
      <div style={{ zoom, marginLeft: -sx, marginTop: -sy }}><Product /></div>
    </div>
  )
}

export default function XPost({ n }: { n: number }) {
  if (n === 1) return (
    <Field w={1600} h={1440}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zoom: 3.15 }}>
        <div className="rounded-[22px] bg-white/55 p-[6px] shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_24px_60px_-24px_rgba(30,45,110,0.35)] backdrop-blur-sm">
          <Approval />
        </div>
      </div>
    </Field>
  )
  if (n === 2) return (
    <Field w={1600} h={900}>
      {/* sidebar + the agent's thread, the window bleeds off the right and bottom edges */}
      <Crop x={110} y={110} w={1600} h={900} zoom={1.45} sx={0} sy={0} radius={26} />
    </Field>
  )
  return (
    <Field w={1600} h={900}>
      {/* the whole run-details panel (status, permissions, activity), bleeding off the bottom */}
      <Crop x={150} y={96} w={512} h={900} zoom={1.6} sx={1120} sy={0} radius={26} />
      {/* the follow-up chips and the composer ("Ask before acting"), bleeding off the right edge */}
      <Crop x={730} y={350} w={960} h={238} zoom={1.4} sx={372} sy={726} radius={24} />
    </Field>
  )
}
