// Preflight negative control (#/pfneg): one planted defect per probe of tools/preflight.mjs, plus a passing control for each,
// so a change to a threshold is proven on both sides (docs/PREFLIGHT.md). Not a design; never ship or post it.
import { RiArrowRightLine, RiAddLine } from '@remixicon/react'
import type { CSSProperties } from 'react'

const font: CSSProperties = { fontFamily: '"Inter Variable", Inter, system-ui, sans-serif', color: '#0E121B' }
const btn: CSSProperties = { position: 'absolute', height: 40, padding: '0 16px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 500, boxSizing: 'border-box' }
const ink: CSSProperties = { ...btn, background: '#1a1a1d', color: '#fff' }
const white: CSSProperties = { ...btn, background: '#fff', boxShadow: 'inset 0 0 0 1px #ECEDF1' }

export default function PreflightNegative() {
  return (
    <main style={{ ...font, position: 'relative', width: 1200, height: 800, background: '#FBFBFB', overflow: 'hidden' }}>
      <h1 style={{ position: 'absolute', left: 48, top: 24, margin: 0, fontSize: 20, fontWeight: 600 }}>Preflight negative control</h1>
      {/* optical.label-centre: planted label 1.5px low (padding-top 3), control centred */}
      <span style={{ ...white, left: 48, top: 80, paddingTop: 3 }}>Label sits low</span>
      <span style={{ ...white, left: 220, top: 80 }}>Centred control</span>
      {/* primary.per-view: two heavy ink buttons in one view */}
      <span style={{ ...ink, left: 48, top: 150 }}>Save changes<RiArrowRightLine size={16} style={{ marginLeft: 6 }} /></span>
      <span style={{ ...ink, left: 220, top: 150 }}>Publish now</span>
      {/* optical.icon-centre: glyph pushed 3px right inside a square icon button; control centred */}
      <span style={{ position: 'absolute', left: 400, top: 150, width: 40, height: 40, borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px #ECEDF1', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 6, boxSizing: 'border-box' }} aria-label="Off-centre add"><RiAddLine size={18} /></span>
      <span style={{ position: 'absolute', left: 452, top: 150, width: 40, height: 40, borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px #ECEDF1', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Centred add"><RiAddLine size={18} /></span>
      {/* grey.fill-twins: two big near-identical neutral fills (#F4F5F7 vs #F2F3F5) */}
      <div style={{ position: 'absolute', left: 48, top: 230, width: 320, height: 160, borderRadius: 16, background: '#F4F5F7' }} />
      <div style={{ position: 'absolute', left: 392, top: 230, width: 320, height: 160, borderRadius: 16, background: '#F2F3F5' }} />
      {/* edge.small-cut: a chip cut by the right frame edge */}
      <span style={{ position: 'absolute', left: 1160, top: 260, height: 28, padding: '0 10px', borderRadius: 8, background: '#EEF0F3', display: 'flex', alignItems: 'center', fontSize: 13, whiteSpace: 'nowrap' }}>Cut chip at the edge</span>
      {/* copy.reference-names: a name from a studied reference */}
      <p style={{ position: 'absolute', left: 48, top: 420, margin: 0, fontSize: 15 }}>Synced with Chatsheet last night.</p>
      {/* load.fonts: a family that is not loaded */}
      <p style={{ position: 'absolute', left: 48, top: 460, margin: 0, fontSize: 15, fontFamily: '"Nonexistent Sans", serif' }}>This line falls back to another face.</p>
      {/* fold.end: a text line and a small card cut by the bottom edge, no fade */}
      <div style={{ position: 'absolute', left: 48, top: 760, width: 240, height: 70, borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px #ECEDF1', padding: '22px 14px', boxSizing: 'border-box', fontSize: 15 }}>Cut by the bottom</div>
    </main>
  )
}
