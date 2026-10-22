// FxR7 (study only, never published): a usage card in the double-card material with segmented tick meters.
// Reference crop: work/replicas/fx/refs/fxr7-ref.png (512x392 CSS, downsampled to 2x from a 6x original; frame origin
// = page (200,128)). Copy is neutral placeholder text; the study is the material, the ticks and the shadows.
// Measured construction (CSS px, page coordinates; native 6x values / 6):
//  - page #f2f1ed (warm paper). Outer card #fcfcfa, x 216..697.3, y 143..507, r 7.3; its edge is a 1px darkening
//    to 10% at the edge pixel (#d9d8d4 on #f2f1ed) and 14% along the bottom: a hairline plus a 1px-down 2px blur
//  - the inner card is pure #ffffff inset 4px on three sides (x 220..693.3, y 209..503, r 6), open to the header
//    above it; its ring is barely there (one native px at 8%) and its bottom shadow fades over ~2px onto the outer card
//  - two whites, 1.2% apart (#fcfcfa vs #ffffff), carry the whole hierarchy; no shadow tier above 2px blur
//  - meters: 83 ticks per row, 2.33 wide x 16 tall, pitch 5.33, fully rounded; track #f0f0f0, active ticks in
//    one saturated hue per row: #00bcff, #00c951, #615fff, #ff6900 (26, 25, 28, 25 active); rows 72px apart
import type { CSSProperties } from 'react'

const OX = 200, OY = 128, W = 512, H = 392
const ROWS: [string, string, string, number][] = [
  ['#00bcff', 'Pipelines', '2,100 units', 26], ['#00c951', 'Model tokens consumed', '1,400 units', 25],
  ['#615fff', 'Side panel', '980 units', 28], ['#ff6900', 'Speech', '310 units', 25],
]
const p = (x: number, y: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x - OX, top: y - OY, ...s })

export default function FxR7() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#f2f1ed', fontFamily: '"Inter Variable", sans-serif', cornerShape: 'round' } as CSSProperties}>
      <div style={p(216, 143, { width: 481.3, height: 364, borderRadius: 7.3, background: '#fcfcfa', boxShadow: '0 0 0 0.5px rgba(48,40,20,0.13), 0 1px 2px rgba(48,40,20,0.09), 0 0.5px 1px rgba(48,40,20,0.06)' })} />
      <div style={p(232, 157, { fontSize: 13, lineHeight: '16px', fontWeight: 450, color: '#404040', letterSpacing: '-0.005em' })}>Spend by module</div>
      <div style={p(232, 177, { fontSize: 11.5, lineHeight: '14px', color: '#646465' })}>Every metered surface in this cycle</div>
      <div style={p(220, 209, { width: 473.3, height: 294, borderRadius: 6, background: '#ffffff', boxShadow: '0 0 0 0.25px rgba(0,0,0,0.10), 0 1px 2px rgba(48,40,20,0.05)' })} />
      {ROWS.map(([c, label, val, n], r) => {
        const y = 253 + 72 * r
        return (
          <div key={label}>
            <div style={p(239.5, y - 23, { width: 5, height: 5, borderRadius: 9, background: c })} />
            <div style={p(254, y - 28.5, { fontSize: 13.5, lineHeight: '16px', color: '#3a3a3a', whiteSpace: 'nowrap' })}>{label}</div>
            <div style={p(560, y - 28.5, { width: 115.5, textAlign: 'right', fontSize: 13.5, lineHeight: '16px', color: '#3a3a3a', fontVariantNumeric: 'tabular-nums' })}>{val}</div>
            {/* SVG, not divs: 2.33px ticks on a 5.33 pitch must stay antialiased, divs snap to device px and look uneven */}
            <svg width={445} height={16} style={p(236, y)}>
              {Array.from({ length: 83 }, (_, k) => <rect key={k} x={(16 * k) / 3} y={0} width={7 / 3} height={16} rx={7 / 6} fill={k < n ? c : '#f0f0f0'} />)}
            </svg>
          </div>
        )
      })}
    </div>
  )
}
