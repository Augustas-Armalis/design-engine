// Basit-grammar light field (BA-01..03): rendered translucent glass panels (Paper ColorPanels), not CSS blobs,
// pushed out of focus so the sharp product reads in front of it (depth of field, Lowpro). One frozen frame by default.
import { ColorPanels } from '@paper-design/shaders-react'

export type FieldProps = { w: number; h: number; colors?: string[]; back?: string; blur?: number; density?: number; angle?: number; rotation?: number; scale?: number; offsetX?: number; offsetY?: number; length?: number; frame?: number; speed?: number }

export default function Field({ w, h, colors = ['#7b5cff', '#ff6fb1', '#4fb7ff', '#ffb36b'], back = '#00000000', blur = 18, density = 1.6, angle = 0.3, rotation = 112, scale = 1, offsetX = 0, offsetY = 0, length = 1, frame = 1800, speed = 0 }: FieldProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ width: w, height: h }}>
      <div style={{ position: 'absolute', inset: -blur * 3, filter: blur ? `blur(${blur}px) saturate(1.15)` : undefined }}>
        <ColorPanels style={{ width: '100%', height: '100%' }} colors={colors} colorBack={back} angle1={angle} angle2={angle} length={length} edges blur={0.25}
          fadeIn={0.85} fadeOut={0.3} gradient={0} density={density} rotation={rotation} scale={scale} offsetX={offsetX} offsetY={offsetY} frame={frame} speed={speed} />
      </div>
    </div>
  )
}
