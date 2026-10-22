// X-post crop frame (#/xframe?src=cprodb&x=900&y=16&bg=%23ECEDF0): shows any route through a window the size of the
// viewport, offset by (x, y) CSS px. The renderer (tools/library.mjs) sets the viewport to the crop size, so a crop is a
// real page: tools/preflight.mjs and tools/gate.mjs see text cut by a crop edge as a viewport crossing (designers-eye
// DE-07) instead of guessing from a PNG. Sources are laid out in fixed px, so their layout does not change in the frame.
import type { JSX } from 'react'

export default function XFrame({ routes, q }: { routes: Record<string, () => JSX.Element>; q: URLSearchParams }) {
  const Src = routes[`#/${q.get('src') ?? ''}`]
  const x = +(q.get('x') ?? 0), y = +(q.get('y') ?? 0)
  if (!Src) return <p style={{ font: '14px system-ui', padding: 24 }}>xframe: unknown src "{q.get('src')}"</p>
  return (
    <div data-xframe="" style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: q.get('bg') ?? 'transparent' }}>
      <div style={{ position: 'absolute', left: -x, top: -y }}><Src /></div>
    </div>
  )
}
