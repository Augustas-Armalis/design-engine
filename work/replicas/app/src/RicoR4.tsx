// Replica study (never published): Rico / Ace Studio, Scout company page, "Growth" bar-chart card.
// Reference: knowledge/benchmarks/heyrico-x/live/work-scout/crop-04-growth-card-x1770-y1155-1380x900.png, a lossless crop of
// the acedesign.io case CDN original work-scout/cdn/04-fNEy2UmGaNPLjSJ0XdgFa2wico.png (5160x3000 = a 1720x1000 frame at 3x:
// the window border is exactly 3 image px). The crop is 460x300 CSS at 3x.
// Type is Inter (not SF): digits and "G" match Inter, widths fit Inter at 13/12/17 with 0 tracking. Colours are his
// "cool Inter" cheatsheet: text #434356, subtle #838693, hairline #DEE0E2; bars a single #4E9BFD with 3px tops.
import type { CSSProperties, ReactNode } from 'react'
import { ArrowUp } from 'lucide-react'

const C = { text: '#434356', sub: '#838693', bar: '#4e9bfd', green: '#08ab4c', ring: '#dee0e2', page: '#fcfcfc' }
const FONT = '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif'
// Inter hhea ascender .96875, descender .2421875, cap .727 -> box top for a cap top
const capTop = (cap: number, fs: number, lh: number) => cap - lh / 2 + 0.3637 * fs

function Tx({ x, r, cx, cap, fs = 13, c = C.sub, w = 400, ls = 0, children, style }: { x?: number; r?: number; cx?: number; cap: number; fs?: number; c?: string; w?: number; ls?: number; children: ReactNode; style?: CSSProperties }) {
  const L = Math.round(fs * 1.3)
  const pos: CSSProperties = r !== undefined ? { right: 460 - r } : cx !== undefined ? { left: cx - 30, width: 60, textAlign: 'center' } : { left: x }
  return <div style={{ position: 'absolute', ...pos, top: capTop(cap, fs, L), fontSize: fs, lineHeight: `${L}px`, color: c, fontWeight: w, letterSpacing: ls, whiteSpace: 'pre', fontFeatureSettings: '"cv11" 0', ...style }}>{children}</div>
}

// bar tops measured per bar (CSS px, crop space); every bar ends at 233
const TOPS = [213, 165, 145, 165, 116, 137, 131, 121, 109, 154, 116, 154]
const BAR_X = [42, 74, 105.67, 137.67, 169.33, 201.33, 233, 265, 296.67, 328.67, 360.33, 392.33]

export default function RicoR4() {
  return <div className="rr" data-product style={{ width: 460, height: 300, position: 'relative', background: C.page, fontFamily: FONT, WebkitFontSmoothing: 'antialiased', overflow: 'hidden' }}>
    <style>{'.rr, .rr * { corner-shape: round !important; }'}</style>
    <div style={{ position: 'absolute', left: 9.67, top: 8.67, width: 440.67, height: 274.67, background: '#fff', borderRadius: 6.5, boxShadow: `0 0 0 .34px ${C.ring}, 0 .6px 1.2px rgba(16,24,40,.06)` }} />
    <Tx x={26.3} cap={30.9} fs={13} w={500}>Growth</Tx>
    <Tx r={433.1} cap={30.9} fs={12} w={500}>Last 12 months</Tx>
    <Tx x={26.4} cap={58.9} fs={17.5} w={450} ls={-0.15} c={C.text}>89.8%</Tx>
    <Tx x={89.3} cap={63.4} fs={12} w={400} ls={-0.2} c={C.green}>12.5%</Tx>
    <div style={{ position: 'absolute', left: 127.67, top: 62.67, width: 10.67, height: 10.67, borderRadius: 6, background: C.green, display: 'grid', placeItems: 'center' }}>
      <ArrowUp size={8} strokeWidth={2.4} color="#fff" />
    </div>
    {TOPS.map((t, i) => <div key={i} style={{ position: 'absolute', left: BAR_X[i], top: t, width: 25.67, height: 233 - t, background: C.bar, borderRadius: 3.3 }} />)}
    {BAR_X.map((x, i) => <Tx key={i} cx={x + 12.83} cap={253.6} fs={12.5} ls={0}>{String(i + 1)}</Tx>)}
  </div>
}
