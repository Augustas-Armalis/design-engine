// Replica study (never published): Rico / Ace Studio, Twin sidebar zoom + "Slack for your agents" promo card.
// Reference: knowledge/benchmarks/heyrico-x/live/work-twin/cdn/04-E9t0AJ7QwxEHeHetAyauJuTwSA.png (acedesign.io case CDN
// original, 4200x2380). Export scale solved as 7x: nav rows are 196 image px tall on a 210 pitch (= his 28/30 spec), the
// Connect pill is 168 (= 24) and the card padding 117 (~16), so the frame is 600x340 CSS. Every string then fits SF Pro
// at whole sizes (13/400 nav, 12/400 group label and body, 12/500 card title and CTA). Colours match his "SF Pro"
// cheatsheet exactly: default #5D5D5D, subtle #7F7F7F, label #9E9E9E, strong #333, selected #F3F3F1 on a #FCFCFC sheet.
// The wordmark is solved as a 600 serif at 18px (Source Serif 4 stands in for his serif). Logo glyph, Slack marks and the
// cursor are drawn placeholders of the same size, not his assets.
import '@fontsource-variable/source-serif-4/wght.css'
import type { CSSProperties, ReactNode } from 'react'
import { Plus, Copy, UserSquare2, ArrowUpRight, ChevronsLeft, Mail, type LucideIcon } from 'lucide-react'

const C = { canvas: '#f8f8f6', sheet: '#fcfcfc', edge: '#d9d9d8', def: '#5d5d5d', sub: '#7f7f7f', label: '#9e9e9e', strong: '#333333', sel: '#f3f3f1', card: '#333333' }
const FONT = 'system-ui, -apple-system, "SF Pro Text", "Inter Variable", sans-serif'
const capTop = (cap: number, fs: number, lh: number) => cap - lh / 2 + 0.3495 * fs - 0.25

function Tx({ x, cap, fs = 13, c = C.def, w = 400, ls = -0.1, children, style }: { x: number; cap: number; fs?: number; c?: string; w?: number; ls?: number; children: ReactNode; style?: CSSProperties }) {
  const L = Math.round(fs * 1.3)
  return <div style={{ position: 'absolute', left: x - 0.5, top: capTop(cap, fs, L), fontSize: fs, lineHeight: `${L}px`, color: c, fontWeight: w, letterSpacing: ls, whiteSpace: 'pre', ...style }}>{children}</div>
}
function Ic({ I, cx, cy, s = 16, sw = 1.3, c = C.sub }: { I: LucideIcon; cx: number; cy: number; s?: number; sw?: number; c?: string }) {
  return <I size={s} strokeWidth={sw} color={c} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }} />
}
const Box = (p: { x: number; y: number; w: number; h: number; style?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, boxSizing: 'border-box', ...p.style }}>{p.children}</div>

// Twin-style four-lobe cross (placeholder of the same footprint)
function Cross({ cx, cy, s, c }: { cx: number; cy: number; s: number; c: string }) {
  const h = s / 2
  return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ position: 'absolute', left: cx - h, top: cy - h }} fill={c}>
    {[0, 90, 180, 270].map((a) => <path key={a} transform={`rotate(${a} ${h} ${h})`} d={`M${h - s * 0.13} ${h - s * 0.09} C ${h - s * 0.12} ${s * 0.1}, ${h - s * 0.07} 0, ${h} 0 C ${h + s * 0.07} 0, ${h + s * 0.12} ${s * 0.1}, ${h + s * 0.13} ${h - s * 0.09} Z`} />)}
  </svg>
}
function Star({ cx, cy, s, c, sw = 1.3 }: { cx: number; cy: number; s: number; c: string; sw?: number }) {
  const r = s / 2 - sw / 2
  return <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }} stroke={c} strokeWidth={sw} strokeLinecap="round">
    {[0, 45, 90, 135].map((a) => { const t = (a * Math.PI) / 180, dx = Math.cos(t) * r, dy = Math.sin(t) * r; return <line key={a} x1={s / 2 - dx} y1={s / 2 - dy} x2={s / 2 + dx} y2={s / 2 + dy} /> })}
  </svg>
}
// four-colour hash mark of the same size as the Slack logo (placeholder geometry)
function Hash({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  const u = s / 12, bar = (x: number, y: number, w: number, h: number, f: string) => <rect x={x * u} y={y * u} width={w * u} height={h * u} rx={1.3 * u} fill={f} />
  return <svg width={s} height={s} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }}>
    {bar(3.4, 0, 2.6, 7.6, '#36c5f0')}{bar(0, 6.1, 7.6, 2.6, '#e01e5a')}{bar(6.1, 4.4, 2.6, 7.6, '#e01e5a')}{bar(4.4, 3.4, 7.6, 2.6, '#2eb67d')}
    {bar(6.1, 0, 2.6, 3, '#2eb67d')}{bar(0, 3.4, 3, 2.6, '#36c5f0')}{bar(9, 6.1, 3, 2.6, '#ecb22e')}{bar(3.4, 9, 2.6, 3, '#ecb22e')}
  </svg>
}
// tag-style "agents" glyph: a rounded bar with two dots and two speed lines
function AgentsGlyph({ x, y }: { x: number; y: number }) {
  return <svg width="15" height="10" viewBox="0 0 15 10" fill="none" stroke={C.sub} strokeWidth="1.25" strokeLinecap="round" style={{ position: 'absolute', left: x, top: y, transform: 'scale(.9)', transformOrigin: '7.5px 5px' }}>
    <rect x="4.6" y="0.6" width="9.8" height="8.8" rx="4.4" /><circle cx="8.3" cy="5" r="1.1" /><circle cx="11.3" cy="5" r="1.1" /><path d="M0.6 2.8h2.4M0.6 7.2h2.4" />
  </svg>
}

const ROWS: [string, number, number][] = [['New chat', 105.4, 0], ['Discover', 134.75, 1], ['Feed', 165.1, 2], ['Agents', 195.1, 3], ['Org', 224.9, 4]]

export default function RicoR2() {
  return <div className="rr" data-product style={{ width: 600, height: 340, position: 'relative', background: C.canvas, fontFamily: FONT, WebkitFontSmoothing: 'antialiased', overflow: 'hidden' }}>
    <style>{'.rr, .rr * { corner-shape: round !important; }'}</style>
    {/* sidebar sheet, runs off the bottom */}
    <Box x={60} y={40} w={240} h={330} style={{ background: C.sheet, borderRadius: 14, boxShadow: `0 0 0 .6px ${C.edge}, 0 0 1.2px rgba(0,0,0,.10)` }} />
    <Box x={78} y={58} w={20} h={20} style={{ background: '#ffdb3f', borderRadius: 6, boxShadow: 'inset 0 0 0 .5px #e5c539' }} />
    <Cross cx={88} cy={68} s={12.5} c="#524a11" />
    <div style={{ position: 'absolute', left: 105.83, top: 54.5, fontFamily: '"Source Serif 4 Variable", "Source Serif 4", Georgia, serif', fontSize: 18, lineHeight: '24px', fontWeight: 600, color: '#383429', letterSpacing: 0 }}>twin</div>
    <Ic I={ChevronsLeft} cx={276} cy={68} s={14} sw={1.3} c="#47423d" />
    {/* nav */}
    <Ic I={Plus} cx={87} cy={110} s={16} sw={1.2} />
    <Star cx={87} cy={140} s={14} c={C.sub} sw={1.25} />
    <Ic I={Copy} cx={87} cy={170} s={15} sw={1.25} />
    <AgentsGlyph x={79.5} y={196.1} />
    <Ic I={UserSquare2} cx={87} cy={230} s={14.5} sw={1.25} />
    {ROWS.map(([t, cap]) => <Tx key={t} x={104.55} cap={cap + 0.5} ls={-0.04}>{t}</Tx>)}
    <Box x={266} y={163} w={14} h={14} style={{ borderRadius: 7, background: '#00a6f4' }} />
    <Tx x={270.6} cap={166.6} fs={10} w={500} ls={0} c="#fff">4</Tx>
    <Box x={72} y={246} w={216} h={28} style={{ background: C.sel, borderRadius: 8 }} />
    <Hash cx={87} cy={260} s={12.3} />
    <Tx x={104.55} cap={255.45} ls={-0.04} c={C.strong}>Slack</Tx>
    <Ic I={ArrowUpRight} cx={273} cy={260} s={14} sw={1.15} c={C.strong} />
    {/* cursor: hand pointer placeholder */}
    <svg width="16" height="19" viewBox="0 0 16 19" style={{ position: 'absolute', left: 173, top: 260 }} fill="#fff" stroke="#171717" strokeWidth="1" strokeLinejoin="round">
      <path d="M5 1.6c0-1 1.8-1 1.8 0V8l.2-1.2c0-1 1.7-1 1.7 0V8l.2-.8c0-1 1.7-1 1.7 0v1l.2-.4c0-1 1.7-1 1.7 0v4.6c0 2.6-1.6 4.8-4.4 4.8H7.6c-1.4 0-2.4-.6-3.2-1.6L1.6 11.2c-.6-.8.4-1.8 1.2-1.2L5 11.4Z" />
    </svg>
    <Tx x={80.3} cap={308.05} fs={12} c={C.label}>Workspace</Tx>
    <Ic I={Mail} cx={87} cy={338.5} s={14} sw={1.25} />
    <svg width="12" height="12" style={{ position: 'absolute', left: 267, top: 332.5 }} fill="none" stroke="#333" strokeWidth="1.4" strokeLinecap="round"><path d="M6 1a5 5 0 0 1 5 5" /></svg>
    <Tx x={104.55} cap={334.8} ls={-0.04}>Email &amp; Notifications</Tx>
    {/* promo card */}
    <Box x={319} y={171} w={240} h={140} style={{ background: C.card, borderRadius: 16 }} />
    <Hash cx={345} cy={197} s={17.7} />
    <Tx x={335.7} cap={221.3} fs={12} w={500} ls={0} c="#fff">Slack for your agents</Tx>
    <Tx x={335.7} cap={241.6} fs={12} ls={-0.1} c="#bfbfbf">Collaborate directly from Slack</Tx>
    <Box x={335} y={271} w={212} h={24} style={{ background: '#fff', borderRadius: 12 }} />
    <Tx x={417.6} cap={279.25} fs={12} w={500} ls={-0.1} c="#202020">Connect</Tx>
  </div>
}
