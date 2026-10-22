// Replica study (never published): Rico / Ace Studio, Alpaca "Super Computer" composer empty state.
// Reference: knowledge/benchmarks/heyrico-x/live/work-alpaca/cdn/10-Ppebb0ihyNnYaPqCZrvFR99w.png (acedesign.io case CDN
// original, 7200x4060). Export scale = 10x exactly: the suggestion-card stroke is 10 image px (1 CSS px) on all four
// sides, so the frame is 720x406 CSS. SF Pro solved from 10 ink widths at 10x: title 19/400 -0.2, placeholder 14/400,
// chip 13/400, "New" 11/400, card titles 13/500, card subs 12/400, all at 0 tracking (not his -0.15 cheatsheet value).
// Colours are his SF Pro cheatsheet: strong #292929, default #5D5D5D, subtle #7F7F7F; ring #E4E4E5, wells #F6F6F7.
// The pixel band is a deterministic stand-in for his dithered dot field (same pitch and square size, not his pattern).
import type { CSSProperties, ReactNode } from 'react'
import { Plus, Mic, ArrowUp, ScanSearch, type LucideIcon } from 'lucide-react'

const C = { strong: '#292929', def: '#5c5c5c', sub: '#7f7f7f', ring: '#e4e4e5', well: '#f6f6f7', blue: '#3082ff', send: '#b7d8f6' }
const FONT = 'system-ui, -apple-system, "SF Pro Text", "Inter Variable", sans-serif'
const capTop = (cap: number, fs: number, lh: number) => cap - lh / 2 + 0.3495 * fs - 0.25

function Tx({ x, cap, fs = 13, c = C.strong, w = 400, ls = 0, children, style }: { x: number; cap: number; fs?: number; c?: string; w?: number; ls?: number; children: ReactNode; style?: CSSProperties }) {
  const L = Math.round(fs * 1.3)
  return <div style={{ position: 'absolute', left: x - 0.5, top: capTop(cap, fs, L), fontSize: fs, lineHeight: `${L}px`, color: c, fontWeight: w, letterSpacing: ls, whiteSpace: 'pre', ...style }}>{children}</div>
}
function Ic({ I, cx, cy, s = 16, sw = 1.3, c = C.sub }: { I: LucideIcon; cx: number; cy: number; s?: number; sw?: number; c?: string }) {
  return <I size={s} strokeWidth={sw} color={c} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }} />
}
const Box = (p: { x: number; y: number; w: number; h: number; style?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, boxSizing: 'border-box', ...p.style }}>{p.children}</div>

// paper plane with two speed lines (his Super Computer mark), drawn at the measured footprint
function Plane({ x, y, s, c, sw }: { x: number; y: number; s: number; c: string; sw: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: x, top: y }}>
    <path d="M21.5 2.5 8.6 9.2l4.3 3.1 3.1 4.3Z" /><path d="M21.5 2.5 12.9 12.3" /><path d="M6.6 15.4 4 18M8.9 17.9 4.6 22.2" />
  </svg>
}
function Workflow2({ cx, cy }: { cx: number; cy: number }) {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={C.sub} strokeWidth=".95" strokeLinecap="round" style={{ position: 'absolute', left: cx - 6, top: cy - 6 }}>
    <circle cx="2.6" cy="2.6" r="1.9" /><circle cx="9.4" cy="2.6" r="1.9" /><circle cx="2.6" cy="9.4" r="1.9" /><path d="M8 4 4 8M9.4 6.9v4.6M7.1 9.2h4.6" />
  </svg>
}
function GlobeCursor({ cx, cy }: { cx: number; cy: number }) {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={C.sub} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: cx - 9, top: cy - 9 }}>
    <path d="M14.6 8.2A6.6 6.6 0 1 0 8.3 14.8" /><path d="M1.8 8.2h12.8M8.2 1.6c-1.9 1.9-2.8 4.1-2.8 6.6s.9 4.7 2.8 6.6M8.2 1.6c1.6 1.6 2.6 3.6 2.8 5.8" /><path d="m10.4 10.4 5.6 2.2-2.5 1-1 2.5Z" />
  </svg>
}

// deterministic dither field: 2.4px squares on a 4.75px pitch, grey levels fade toward the band edges
function Pixels() {
  const cells: ReactNode[] = []
  let seed = 7
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  for (let r = 0; r < 12; r++) for (let c = 0; c < 128; c++) {
    const x = 60 + c * 4.75, y = 1.5 + r * 4.7
    const ex = Math.min(1, (x - 56) / 90, (664 - x) / 90), ey = Math.min(1, (r + 1) / 3, (12 - r) / 3)
    const a = rnd() * Math.max(0, ex) * ey
    if (a < 0.12) continue
    cells.push(<rect key={`${r}-${c}`} x={x} y={y} width="2.4" height="2.4" fill={a > 0.55 ? '#f1f1f2' : '#f7f7f8'} />)
  }
  return <svg width="720" height="60" style={{ position: 'absolute', left: 0, top: 0 }}>{cells}</svg>
}

const CARDS: [string, string, number, ReactNode][] = [
  ['Create', 'Tasks, Images, Docs', 120, null], ['Find', 'Answers & Files', 284, null], ['Research', 'Apps & Web', 448, null],
]

export default function RicoR3() {
  const soft = `0 0 0 .7px ${C.ring}, 0 1px 1.5px rgba(0,0,0,.05)`
  return <div className="rr" data-product style={{ width: 720, height: 406, position: 'relative', background: '#fff', fontFamily: FONT, WebkitFontSmoothing: 'antialiased', overflow: 'hidden' }}>
    <style>{'.rr, .rr * { corner-shape: round !important; }'}</style>
    <Pixels />
    {/* heading */}
    <Plane x={248.5} y={59.5} s={17} c={C.strong} sw={1.35} />
    <Tx x={279.5} cap={61.5} fs={19} ls={-0.2}>Alpaca Super Computer</Tx>
    {/* composer */}
    <Box x={120} y={106} w={480} h={124} style={{ background: '#fff', borderRadius: 19.5, boxShadow: `0 0 0 .7px ${C.ring}, 0 1px 2px rgba(0,0,0,.05)` }} />
    <Tx x={134.7} cap={123.6} fs={14} c={C.sub}>What should we work on next?</Tx>
    <Box x={134} y={194} w={24} h={24} style={{ background: '#fff', borderRadius: 8, boxShadow: soft }} />
    <Ic I={Plus} cx={146} cy={206} s={13} sw={0.95} />
    <Box x={166} y={194} w={24} h={24} style={{ background: '#fff', borderRadius: 8, boxShadow: soft }} />
    <Workflow2 cx={178} cy={206} />
    <Box x={198} y={194} w={168} h={24} style={{ background: C.well, borderRadius: 8 }} />
    <Plane x={205.5} y={200} s={11.5} c={C.strong} sw={1.5} />
    <Tx x={224.7} cap={201.6} fs={13} ls={-0.1}>Super Computer</Tx>
    <Tx x={333.9} cap={202.2} fs={11} c={C.blue}>New</Tx>
    <Ic I={Mic} cx={541.6} cy={206} s={12} sw={1.05} />
    <Box x={562} y={194} w={24} h={24} style={{ background: C.send, borderRadius: 12 }} />
    <Ic I={ArrowUp} cx={574} cy={206} s={12} sw={1.2} c="#fff" />
    {/* suggestion cards */}
    {CARDS.map(([t, s, x]) => <div key={t}>
      <Box x={x} y={254} w={152} h={99} style={{ background: '#fff', borderRadius: 16.5, border: `1px solid ${C.well}` }} />
      <Tx x={x + 14.7} cap={304.6} fs={13} w={500}>{t}</Tx>
      <Tx x={x + 14.5} cap={326.2} fs={12} c={C.def}>{s}</Tx>
    </div>)}
    <Ic I={Plus} cx={143} cy={277} s={15} sw={1.0} />
    <Ic I={ScanSearch} cx={307} cy={277} s={15} sw={1.0} />
    <GlobeCursor cx={471.5} cy={277.5} />
  </div>
}
