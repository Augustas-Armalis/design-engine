// Replica study (never published): Rico's own studio site, acedesign.io home fold (his marketing register).
// Reference: knowledge/benchmarks/heyrico-x/live/home/fold-1440@2x.png (live Playwright capture, 1440x900 @2x, 2026-10-22),
// with every box and type tuple read from the live DOM (live/home/fold-dom.txt, dom.json).
// Fonts: Anton is his actual display face (exact). GT America Trial and GT America Mono Trial are commercial trials, so they
// are stood in by the closest open faces solved from rendered string widths across 23 sans and 16 mono candidates:
// Libre Franklin (GT America is Franklin-derived; mean error 1.1px) and Fragment Mono (0.26px). Client logos in the marquee
// are neutral placeholder wordmarks of the same boxes; the ASCII globe is a drawn stand-in.
import '@fontsource/anton/400.css'
import '@fontsource-variable/libre-franklin/wght.css'
import '@fontsource/fragment-mono/400.css'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

const C = { lime: '#e1f435', grey: '#bfbfbf', line: '#1a1a1a', nav: '#d9d9d9' }
const SANS = '"Libre Franklin Variable", "Libre Franklin", system-ui, sans-serif'
const MONO = '"Fragment Mono", ui-monospace, monospace'
const DISPLAY = 'Anton, Impact, sans-serif'

// text boxes are placed with the live DOM's own line boxes (top = line box top), so line-height carries the offset
function T({ x, y, lh, fs, f = SANS, w = 400, ls = 0, c = '#fff', children, style }: { x: number; y: number; lh: number; fs: number; f?: string; w?: number; ls?: number; c?: string; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: 'absolute', left: x, top: y, fontFamily: f, fontSize: fs, lineHeight: `${lh}px`, fontWeight: w, letterSpacing: ls, color: c, whiteSpace: 'pre', ...style }}>{children}</div>
}
const Box = (p: { x: number; y: number; w: number; h: number; style?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, boxSizing: 'border-box', ...p.style }}>{p.children}</div>
// the "¬" crop tick: 2px bars, top and right
const Tick = ({ x, y, s = 9, t = 2, c }: { x: number; y: number; s?: number; t?: number; c: string }) =>
  <><Box x={x} y={y} w={s} h={t} style={{ background: c }} /><Box x={x + s - t} y={y} w={t} h={s} style={{ background: c }} /></>
const Cross = ({ x, y }: { x: number; y: number }) => <><Box x={x} y={y - 2.5} w={1} h={6} style={{ background: '#fff' }} /><Box x={x - 2.5} y={y} w={6} h={1} style={{ background: '#fff' }} /></>

function Globe() {
  const ring = 'PRODUCT EXPERIENCE FOR AI-NATIVE TEAMS · '
  return <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', left: 230, top: 230 }}>
    <defs><path id="rr6c" d="M50 50 m-41.5 0 a41.5 41.5 0 1 1 83 0 a41.5 41.5 0 1 1 -83 0" /></defs>
    <text fill="#fff" fontFamily='"Geist Mono Variable", ui-monospace' fontSize="7.7" fontWeight="500" letterSpacing="1.9"><textPath href="#rr6c" startOffset="2">{ring}</textPath></text>
    <g fill="none" stroke="#fff" strokeWidth="1.1" strokeDasharray="2.2 1.1">
      <circle cx="50" cy="50" r="30" />
      <ellipse cx="50" cy="50" rx="11" ry="30" /><ellipse cx="50" cy="50" rx="22" ry="30" /><path d="M50 20v60" />
      <path d="M21 41h58M20 50h60M21 59h58M26 32h48M26 68h48" />
    </g>
  </svg>
}
function Mark() {
  return <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', left: 19, top: 18 }}>
    <circle cx="12" cy="12" r="10" fill={C.lime} /><path d="M12 2a10 10 0 0 1 0 20Z" fill="#000" />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${13 + i * 1.8} ${3 + i * 0.6}v${18 - i * 1.2}`} stroke={C.lime} strokeWidth=".9" />)}
  </svg>
}
// neutral placeholder wordmarks sized to the measured logo ink boxes (x, width)
const LOGOS: [number, number, string][] = [[670.5, 102.5, 'Northwind'], [852, 97.5, 'Lumenry'], [1028, 107, 'Halcyon'], [1216.5, 86.5, 'parallax']]
const STATS: [number, number, string, string][] = [[592, 754, '3', 'MEMBERS'], [774, 714, '56', 'COMPANIES'], [956, 674, '$20B+', 'TOTAL VALUATION'], [1138, 634, '150+', 'PROJECTS SHIPPED']]

export default function RicoR6() {
  return <div className="rr" style={{ width: 1440, height: 900, position: 'relative', background: '#000', overflow: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
    <style>{'.rr, .rr * { corner-shape: round !important; }'}</style>
    {/* nav */}
    <Mark />
    <T x={549.5} y={21.8} lh={14.4} fs={12} f={MONO} ls={0.96} c={C.nav}>HOME</T>
    <T x={601.1} y={21.8} lh={14.4} fs={12} f={MONO} ls={0.96} c={C.nav}>NOTES</T>
    <T x={661.1} y={21.8} lh={14.4} fs={12} f={MONO} ls={0.96} c={C.nav}>WORKS</T>
    <Box x={1207} y={14} w={94} h={32} style={{ boxShadow: 'inset 0 0 0 1px #fff' }} />
    <T x={1220.6} y={21.5} lh={16} fs={13} ls={-0.42}>Read Notes</T>
    <Box x={1312.7} y={14} w={111.3} h={32} style={{ background: '#fff', borderRadius: 3 }} />
    <T x={1326.7} y={21.5} lh={16} fs={13} ls={-0.38} c="#161801">Start A Project</T>
    <Box x={0} y={59} w={1440} h={1} style={{ background: '#191919' }} />
    {/* left column */}
    <Globe />
    <T x={56} y={678.5} lh={21} fs={14} w={300} ls={-0.2} c={C.grey}>Ace Studio is a senior design practice for AI-native companies.</T>
    <T x={56} y={715.5} lh={21} fs={14} w={300} ls={-0.22} c={C.grey}>{'Built with top 0.01% caliber design talent, we work with a few teams at a\ntime and go deep into the product experience and design foundation\nbehind AI/Agentic Software.'}</T>
    <Box x={56} y={812} w={216} h={40} style={{ background: C.lime }} />
    <T x={72} y={823.5} lh={16} fs={13} ls={-0.42} c="#000">Get Started</T>
    <Box x={288} y={812} w={216} h={40} style={{ boxShadow: 'inset 0 0 0 1px #fff' }} />
    <T x={304} y={823.5} lh={16} fs={13} ls={-0.42}>Read Notes</T>
    <ArrowRight size={18} strokeWidth={1.6} color="#fff" style={{ position: 'absolute', left: 470, top: 823 }} />
    {/* headline */}
    <T x={592} y={111} lh={60} fs={40} f={DISPLAY} ls={-1.2} c={C.lime}>PRODUCT DESIGN</T>
    <T x={859.47} y={111} lh={60} fs={40} f={DISPLAY} ls={-1.2}>DESIGN SYSTEM</T>
    <T x={592} y={169} lh={60} fs={40} f={DISPLAY} ls={-1.2}>DESIGN CULTURE</T>
    <T x={851.47} y={169} lh={60} fs={40} f={DISPLAY} ls={-1.2}>IN THE AGENTIC ERA</T>
    <Tick x={834} y={120} c={C.lime} /><Tick x={1089} y={120} c={C.grey} /><Tick x={826} y={178} c={C.grey} /><Tick x={1128.8} y={178} c={C.grey} />
    <T x={592} y={249.2} lh={22.4} fs={16} ls={-0.53} c={C.grey}>{'Ace Studio is a founder-led product design studio for ambitious AI companies. In focused 4–8\nweek engagements, we shape product core experiences, design systems, and the standards\nthat keep products coherent as they grow.'}</T>
    {/* companies marquee */}
    <T x={592} y={409.2} lh={15} fs={12} f={MONO} ls={1.2} c="rgba(255,255,255,.5)">COMPANIES</T>
    <T x={1296.98} y={409.2} lh={15} fs={12} f={MONO} ls={1.2} c="rgba(255,255,255,.5)">/01</T>
    <Box x={592} y={455} w={728} h={83} style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, borderLeft: `1px solid ${C.line}` }} />
    <Cross x={592.48} y={454.72} /><Cross x={1318.48} y={454.72} /><Cross x={592.48} y={537.7} /><Cross x={1318.48} y={537.7} />
    {LOGOS.map(([x, w, t]) => <svg key={t} width={w + 2} height="24" style={{ position: 'absolute', left: x - 1, top: 484 }}>
      <rect x="1" y="5" width="16" height="16" rx="4" fill="#fff" />
      <text x="22" y="20" fill="#fff" fontFamily={SANS} fontWeight="600" fontSize="20" textLength={w - 21} lengthAdjust="spacingAndGlyphs">{t}</text>
    </svg>)}
    {/* stair stats */}
    {STATS.map(([x, y, v, l]) => <div key={l}>
      <Box x={x} y={y} w={183} h={874 - y + 1} style={{ border: `1px solid ${C.line}` }} />
      <T x={x + 16.3} y={y + 16.2} lh={25} fs={21.5} f={MONO} ls={-0.6}>{v}</T>
      <Tick x={x + 16} y={848} s={8} t={1.7} c={C.lime} />
      <T x={x + 33} y={845.2} lh={14} fs={11} f={MONO} ls={1.1} c={C.grey}>{l}</T>
    </div>)}
  </div>
}
