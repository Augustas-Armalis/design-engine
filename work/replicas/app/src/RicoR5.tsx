// Replica study (never published): Rico / Ace Studio, Alpaca onboarding step "Start free, no demo required".
// Reference: knowledge/benchmarks/heyrico-x/live/work-alpaca/cdn/02-cnCMWO6D91bvX8A5iedHzyk4HA.png (acedesign.io case CDN
// original, 5160x3000 = 1720x1000 at 3x: the window sits at 140,50 and is exactly 1440x900 CSS inside a #F0F0F0 canvas).
// Type is Inter (his sign-in/onboarding system): every string fits Inter at whole sizes, 0 to -0.1 tracking. Colours are his
// sign-in cheatsheet values: #232323 strong, #646465 subtle, #333 CTA, #0091FF link-blue CTA; chips #F2F2F2 and #F4F8FC.
// The two card header images are his generated art; here they are CSS gradient stand-ins of the same size and hue.
import type { CSSProperties, ReactNode } from 'react'
import { CircleCheck } from 'lucide-react'

const C = { strong: '#232323', sub: '#646465', body: '#5d5d5d', label: '#414141', ring: '#e3e3e3', canvas: '#f0f0f0', cta: '#333333', blue: '#0091ff' }
const FONT = '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif'
const capTop = (cap: number, fs: number, lh: number) => cap - lh / 2 + 0.3637 * fs

function Tx({ x, cx, cap, fs = 14, c = C.strong, w = 400, ls = 0, children, style }: { x?: number; cx?: number; cap: number; fs?: number; c?: string; w?: number; ls?: number; children: ReactNode; style?: CSSProperties }) {
  const L = Math.round(fs * 1.4)
  const pos: CSSProperties = cx !== undefined ? { left: cx - 400, width: 800, textAlign: 'center' } : { left: x }
  return <div style={{ position: 'absolute', ...pos, top: capTop(cap, fs, L), fontSize: fs, lineHeight: `${L}px`, color: c, fontWeight: w, letterSpacing: ls, whiteSpace: 'pre', ...style }}>{children}</div>
}
const Box = (p: { x: number; y: number; w: number; h: number; style?: CSSProperties; children?: ReactNode }) =>
  <div style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, boxSizing: 'border-box', ...p.style }}>{p.children}</div>

function Asterisk({ cx, cy, s, c }: { cx: number; cy: number; s: number; c: string }) {
  const r = s / 2 - 1.3
  return <svg width={s} height={s} style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2 }} stroke={c} strokeWidth="2.6" strokeLinecap="round">
    {[0, 45, 90, 135].map((a) => { const t = (a * Math.PI) / 180, dx = Math.cos(t) * r, dy = Math.sin(t) * r; return <line key={a} x1={s / 2 - dx} y1={s / 2 - dy} x2={s / 2 + dx} y2={s / 2 + dy} /> })}
  </svg>
}
function Pixels() {
  const cells: ReactNode[] = []
  let seed = 11
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  for (let r = 0; r < 11; r++) for (let c = 0; c < 131; c++) {
    const x = 549 + c * 4.75, y = 54 + r * 4.75
    const e = Math.min(1, (x - 549) / 100, (1171 - x) / 100) * Math.min(1, (r + 1) / 3, (11 - r) / 3)
    const a = rnd() * Math.max(0, e)
    if (a < 0.15) continue
    cells.push(<rect key={`${r}-${c}`} x={x} y={y} width="2.4" height="2.4" fill={a > 0.6 ? '#f5f5f6' : '#fafafa'} />)
  }
  return <svg width="1720" height="120" style={{ position: 'absolute', left: 0, top: 0 }}>{cells}</svg>
}

type Plan = { x: number; name: string; chip: string; chipW: number; chipBg: string; chipRing: string; chipC: string; d: [string, string]; feats: string[]; cta: string; ctaBg: string; art: string }
const PLANS: Plan[] = [
  { x: 528, name: 'Starter', chip: 'Free', chipW: 38, chipBg: '#f0f0f0', chipRing: C.ring, chipC: C.sub, d: ['Hands-on with a free workspace.', 'Upgrade when you outgrow it.'], feats: ['Free for up to 10 properties', 'Connect 1 channel + 1 PMS', 'Live in under 10 minutes'], cta: 'Create Account', ctaBg: C.cta,
    art: 'radial-gradient(120px 70px at 18% 70%, rgba(214,120,255,.9), transparent 70%), radial-gradient(160px 90px at 40% 20%, rgba(255,255,255,.95), transparent 60%), radial-gradient(200px 120px at 90% 60%, #8fd2fb, transparent 70%), linear-gradient(100deg, #7f8cf5 0%, #c79af7 30%, #f2e7fb 50%, #b9e1fb 75%, #8cd0fa 100%)' },
  { x: 872, name: 'Pro', chip: '$650/month', chipW: 83.67, chipBg: '#f4f8fc', chipRing: '#dbe7fd', chipC: '#0a6eab', d: ["Get a 30-min walkthrough with our team", "if you'd rather see it first."], feats: ['Live screen-share session', 'Tailored to your use case', 'You can still sign up after'], cta: 'Book a Demo', ctaBg: C.blue,
    art: 'radial-gradient(90px 70px at 62% 90%, #f9b21c, transparent 72%), radial-gradient(150px 80px at 62% 100%, rgba(255,140,120,.85), transparent 75%), repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 1px, transparent 1px 3px), linear-gradient(180deg, #9ab9e2, #a4c2ea 60%, #c9b6d8)' },
]

export default function RicoR5() {
  return <div className="rr" data-product style={{ width: 1720, height: 1000, position: 'relative', background: C.canvas, fontFamily: FONT, WebkitFontSmoothing: 'antialiased', overflow: 'hidden' }}>
    <style>{'.rr, .rr * { corner-shape: round !important; }'}</style>
    <Box x={140} y={50} w={1440} h={900} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 0 0 .5px #d8d8d9' }} />
    <Pixels />
    <Asterisk cx={860} cy={188} s={25} c={C.strong} />
    <Tx cx={860} cap={225.4} fs={18} w={500} ls={0.06}>Start free, no demo required</Tx>
    <Tx cx={860} cap={253.6} fs={14} c={C.sub} ls={-0.03}>You're set to start on your own. Book a demo if you'd prefer a walkthrough</Tx>
    {PLANS.map((p) => <div key={p.name}>
      <Box x={p.x} y={317} w={320} h={480} style={{ borderRadius: 16, background: 'linear-gradient(#fdfdfd 0 40%, #fff 70%)', boxShadow: `0 0 0 .5px ${C.ring}, 0 2px 10px rgba(0,0,0,.025)`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 320, height: 80, background: p.art }} />
      </Box>
      <Tx x={p.x + 24.2} cap={422.0} fs={18} w={600} ls={-0.08}>{p.name}</Tx>
      <Box x={p.x + 320 - 24 - p.chipW} y={419} w={p.chipW} h={20} style={{ background: p.chipBg, borderRadius: 6, boxShadow: `inset 0 0 0 .75px ${p.chipRing}`, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 500, color: p.chipC, letterSpacing: 0 }}>{p.chip}</Box>
      <Tx x={p.x + 24.2} cap={454.4} c={C.sub} ls={-0.1}>{p.d[0]}</Tx>
      <Tx x={p.x + 24.2} cap={475.4} c={C.sub} ls={-0.05}>{p.d[1]}</Tx>
      <Tx x={p.x + 24.7} cap={524.9} fs={12} w={500} c={C.label}>{p.name === 'Starter' ? 'What you get:' : 'What you get:'}</Tx>
      {p.feats.map((f, i) => <div key={f}>
        <CircleCheck size={13.5} strokeWidth={1.2} color="#747474" style={{ position: 'absolute', left: p.x + 24.25, top: 550.25 + i * 28 }} />
        <Tx x={p.x + 46} cap={552.4 + i * 28} fs={13} c={C.body} ls={0.02}>{f}</Tx>
      </div>)}
      <Box x={p.x + 20} y={737} w={280} h={40} style={{ background: p.ctaBg, borderRadius: 20, display: 'grid', placeItems: 'center', paddingBottom: 2, color: '#fff', fontSize: 14, fontWeight: 400, letterSpacing: -0.22 }}>{p.cta}</Box>
    </div>)}
  </div>
}
