// Pixel replica (study only) of Kargul Studio's Chatsheet hero, from the 20 Oct 2026 post "this is what a $15,000
// landing page looks like" (frame at work/replicas/ref-chatsheet-hero.png, 1252x900, scrolled ~2px).
// Measured with tools/probe.mjs: page #f6f5f8, nav band #f9f9fb 0..48 + #ebebed rule, rails at x 26/1224, h1 Source
// Serif ~62/60 centred at 628, sub 16/25, CTAs 195x40 and 128x40. The scene is one 25deg dimetric plane (coin top
// ellipse 215x92 -> ry/rx 0.43): every object is drawn in plane units through the same matrix.
import '@fontsource-variable/source-serif-4/opsz.css'
import type { ReactNode } from 'react'

type P = [number, number]
const A = 0.7071, B = 0.304 // plane x -> (A, B), plane y -> (-A, B)
const flat = (o: P, z = 0) => `matrix(${A} ${B} ${-A} ${B} ${o[0]} ${o[1] - z})`
const INK = '#0e1330', BLUE = '#3f79f9'
const SERIF = '"Source Serif 4 Variable", Georgia, serif', SANS = '"Inter Variable", system-ui, sans-serif'

/** a flat app tile: rounded square in a dimetric plane of ratio k (tiles read steeper than the coin: perspective),
 * thin white side with a blue underside edge, soft contact shadow; glyph laid flat but squared to the screen */
function Tile({ at, s = 50, k = 0.53, t = 9, children, fade = 1 }: { at: P; s?: number; k?: number; t?: number; children?: ReactNode; fade?: number }) {
  const r = 10, b = A * k
  const m = (dy: number) => `matrix(${A} ${b} ${-A} ${b} ${at[0]} ${at[1] + dy})`
  return (
    <g opacity={fade}>
      <g transform={m(t + 7)}><rect x={-s / 2} y={-s / 2} width={s} height={s} rx={r} fill="#2a3f86" opacity="0.13" filter="url(#ksoft)" /></g>
      <g transform={m(t + 0.6)}><rect x={-s / 2} y={-s / 2} width={s} height={s} rx={r} fill="#bccbef" /></g>
      {Array.from({ length: t }, (_, i) => <g key={i} transform={m(t - i)}><rect x={-s / 2} y={-s / 2} width={s} height={s} rx={r} fill="#f4f6fc" /></g>)}
      <g transform={m(0)}>
        <rect x={-s / 2} y={-s / 2} width={s} height={s} rx={r} fill="#ffffff" stroke="#dfe5f3" strokeWidth="1" />
        <g transform="rotate(-45)">{children}</g>
      </g>
    </g>
  )
}
/** standing plate along the plane -y axis, leaning back (Slack); glass (PDF) when ghost */
function Plate({ at, w = 46, h = 62, lean = 0.12, children, ghost = false }: { at: P; w?: number; h?: number; lean?: number; children?: ReactNode; ghost?: boolean }) {
  const m = `matrix(${A} ${-A * 0.45} ${lean} 1 ${at[0]} ${at[1]})`
  return (
    <g transform={m}>
      <rect x={-w / 2 + 4} y={-h / 2 + 5} width={w} height={h} rx="10" fill={ghost ? 'none' : '#2a3f86'} opacity="0.1" filter="url(#ksoft)" />
      <rect x={-w / 2 + 3} y={-h / 2 + 2} width={w} height={h} rx="10" fill={ghost ? 'none' : '#bccbef'} stroke={ghost ? '#cdd7ef' : 'none'} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="10" fill={ghost ? 'rgb(255 255 255 / 0.55)' : '#fff'} stroke="#dfe5f3" />
      {children}
    </g>
  )
}

/* brand-ish glyphs (study approximations, flat in the tile plane) */
const Gmail = () => <g transform="scale(1.75)"><path d="M-15 -9v18h6V-2l9 7 9-7v11h6V-9l-15 11z" fill="#ea4335" /><path d="M-15 -9l6 5V9h-6z" fill="#4285f4" /><path d="M15 -9l-6 5V9h6z" fill="#34a853" /><path d="M9 -4l6 -5-3 -2-3 2z" fill="#fbbc04" /></g>
const YouTube = () => <g transform="scale(1.45)"><rect x="-12" y="-8.5" width="24" height="17" rx="5" fill="#ff0000" /><path d="M-3.5 -5v10l8 -5z" fill="#fff" /></g>
const Excel = () => <g transform="scale(1.55)"><rect x="-13" y="-12" width="26" height="24" rx="3" fill="#21a366" /><rect x="-13" y="-12" width="13" height="24" rx="3" fill="#107c41" /><path d="M-9 -6l6 12M-3 -6l-6 12" stroke="#fff" strokeWidth="2.6" /></g>
const Sheets = () => <g transform="scale(1.35)"><rect x="-10" y="-13" width="20" height="26" rx="2.5" fill="#0f9d58" /><rect x="-6" y="-3" width="12" height="9" fill="#fff" /><path d="M-6 1.5h12M0 -3v9" stroke="#0f9d58" strokeWidth="1.4" /></g>
const Drive = () => <g transform="scale(1.7)"><path d="M-4 -11h8l9 15h-8z" fill="#fbbc04" /><path d="M-4 -11l-9 15 4 7 9 -15z" fill="#0f9d58" /><path d="M-9 11h18l4 -7h-18z" fill="#4285f4" /></g>
const Docs = () => <g transform="scale(1.4)"><rect x="-10" y="-13" width="20" height="26" rx="2.5" fill="#4285f4" /><path d="M-5 -3h10M-5 1h10M-5 5h7" stroke="#fff" strokeWidth="1.6" /></g>
const Slack = () => (
  <g transform="scale(1.6)">
    {[[0, '#e01e5a'], [90, '#36c5f0'], [180, '#2eb67d'], [270, '#ecb22e']].map(([r, c]) => (
      <g key={r as number} transform={`rotate(${r})`}><rect x="-2.6" y="-14" width="5.2" height="11" rx="2.6" fill={c as string} /><rect x="-9.5" y="-14" width="5.2" height="5.2" rx="2.6" fill={c as string} transform="translate(0 0)" /></g>
    ))}
  </g>
)
const Pdf = () => <g><path d="M-9 -12h12l6 6v18h-18z" fill="none" stroke="#e4626a" strokeWidth="1.6" /><path d="M-4 6c3-9 5-13 5-13s2 9 7 11c-6-1-9 0-12 2" fill="none" stroke="#e4626a" strokeWidth="1.4" /></g>

/** glass workflow card fitted to its measured screen corners: L (left), T (top, end of the long side), Bt (bottom).
 * Local frame u along the long side L->T (0..100), v across L->Bt (0..100): a proper (non-mirrored) affine, so text
 * on +u reads up-right with its cap toward -v like his pills */
type Quad = { L: P; T: P; Bt: P }
const affine = ({ L, T, Bt }: Quad, dx = 0, dy = 0) => `matrix(${(T[0] - L[0]) / 100} ${(T[1] - L[1]) / 100} ${(Bt[0] - L[0]) / 100} ${(Bt[1] - L[1]) / 100} ${L[0] + dx} ${L[1] + dy})`
function Card({ q, label, pill, children }: { q: Quad; label: string; pill: [number, number, number]; children?: ReactNode }) {
  const [u0, u1, v] = pill
  return (
    <g>
      <g transform={affine(q, 4, 12)}><rect width="100" height="100" rx="7" fill="#2a4fb0" opacity="0.08" filter="url(#ksoft)" /></g>
      <g transform={affine(q, 0, 5)}><rect width="100" height="100" rx="7" fill="#dbe4fa" stroke="#c9d6f4" vectorEffect="non-scaling-stroke" /></g>
      <g transform={affine(q)}>
        <rect width="100" height="100" rx="7" fill="url(#kglass)" stroke="#d3ddf6" vectorEffect="non-scaling-stroke" />
        {children}
        <g transform={`translate(${u0} ${v})`}>
          <rect x="1.2" y="4" width={u1 - u0} height="21" rx="10.5" fill="#bfd0f6" opacity="0.7" />
          <rect x="0" y="0" width={u1 - u0} height="21" rx="10.5" fill={BLUE} />
          <text x={(u1 - u0) / 2} y="14.2" textAnchor="middle" fontSize="7.4" fontWeight="500" fill="#fff" fontFamily={SANS} letterSpacing="0.01em">{label}</text>
        </g>
      </g>
    </g>
  )
}
const Mini = ({ c, x, y, outline }: { c: string; x: number; y: number; outline?: boolean }) => <rect x={x} y={y} width="7" height="6" rx="1.4" fill={outline ? '#fff' : c} stroke={outline ? c : 'none'} strokeWidth="0.8" />

export default function KargulHero() {
  const coin: P = [625.5, 564]
  return (
    <div style={{ position: 'relative', width: 1252, height: 900, overflow: 'hidden', background: '#f6f5f8', fontFamily: SANS, color: INK }}>
      {/* frame rails */}
      <div style={{ position: 'absolute', left: 26, top: 48, bottom: 95, width: 2, background: '#efeef1' }} />
      <div style={{ position: 'absolute', right: 26, top: 48, bottom: 95, width: 2, background: '#efeef1' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 803, height: 2, background: '#efeef1' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 805, bottom: 0, background: '#f8f8fa' }} />
      {/* nav */}
      <header style={{ position: 'absolute', left: 0, right: 0, top: -2, height: 50, background: '#f9f9fb', borderBottom: '2px solid #ebebed' }}>
        <div style={{ position: 'absolute', left: 169, top: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10.5" fill={BLUE} /><circle cx="11" cy="11" r="7" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="11" cy="11" r="3.2" fill="#fff" /></svg>
          <span style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 450, letterSpacing: '-0.01em', color: '#16193a' }}>Chatsheet</span>
        </div>
        <nav style={{ position: 'absolute', left: 433, top: 7, display: 'flex', gap: 21.5, fontSize: 14.5, color: '#4a4c5c' }}>
          {['How it Works', 'Use Cases', 'Become a Partner', 'Partners'].map((l) => <span key={l}>{l}</span>)}
        </nav>
        <span style={{ position: 'absolute', left: 955, top: -2, width: 128, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 11, background: '#fff', boxShadow: '0 0 0 1px #e3e3e8, 0 1px 2px rgb(16 24 40 / 0.05)', fontSize: 14.5, fontWeight: 500, color: '#111' }}>Book a Free Call</span>
      </header>
      {/* copy */}
      <h1 style={{ position: 'absolute', left: 0, right: 0, top: 114, margin: 0, textAlign: 'center', fontFamily: SERIF, fontSize: 70, fontWeight: 400, lineHeight: '60px', letterSpacing: '-0.012em', color: INK, paddingLeft: 4 }}>Turn Manual Tasks<br />into Automations</h1>
      <p style={{ position: 'absolute', left: 0, right: 0, top: 257, margin: 0, textAlign: 'center', fontSize: 15, lineHeight: '25px', color: '#55586a', paddingLeft: 4 }}>Automate documents, emails, approvals, and more, with<br />expert help and enterprise-grade AI integrations.</p>
      <span style={{ position: 'absolute', left: 462, top: 351, width: 195, height: 41, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'linear-gradient(180deg, #3a74f4, #4680f8)', boxShadow: '0 0 0 1px #3463d4, inset 0 1px 0 rgb(255 255 255 / 0.22), 0 1px 2px rgb(30 60 160 / 0.25), 0 4px 10px -4px rgb(40 90 230 / 0.45)', color: '#fff', fontSize: 15.5, fontWeight: 500 }}>Book a Free Discovery</span>
      <span style={{ position: 'absolute', left: 667, top: 351, width: 128, height: 41, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#fff', boxShadow: '0 0 0 1px #dcdce1, 0 1px 2px rgb(16 24 40 / 0.06)', color: '#111', fontSize: 15.5, fontWeight: 500 }}>Case Studies</span>

      {/* scene */}
      <svg width="1252" height="900" style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <defs>
          <filter id="ksoft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="kblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4" /></filter>
          <radialGradient id="khalo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#bcd0ff" stopOpacity="0.95" /><stop offset="0.55" stopColor="#d6e2ff" stopOpacity="0.6" /><stop offset="1" stopColor="#f6f5f8" stopOpacity="0" /></radialGradient>
          <radialGradient id="kfloor" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#ffffff" stopOpacity="0.95" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></radialGradient>
          <linearGradient id="kglass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f7f9ff" /><stop offset="1" stopColor="#edf2ff" /></linearGradient>
          <linearGradient id="kfade" x1="0" y1="0" x2="1" y2="0"><stop offset="0.72" stopColor="#fff" /><stop offset="0.98" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <mask id="kfadeM"><rect width="1252" height="900" fill="url(#kfade)" /></mask>
        </defs>
        <ellipse cx={coin[0]} cy={coin[1] + 30} rx="240" ry="120" fill="url(#kfloor)" />
        <ellipse cx={coin[0]} cy={coin[1] - 30} rx="150" ry="95" fill="url(#khalo)" />
        {/* dotted path through the tool tiles */}
        <path d="M24 590C70 565 110 532 160 540S220 590 262 604S330 650 400 660S478 652 520 636" fill="none" stroke="#b7bccd" strokeWidth="1.2" strokeDasharray="2.5 3.5" />
        <path d="M554 712L540 800M421 700L320 748M320 748L230 800" fill="none" stroke="#b7bccd" strokeWidth="1.2" strokeDasharray="2.5 3.5" />
        {/* workflow cards, back to front, fading out to the right */}
        <g mask="url(#kfadeM)">
          <Card q={{ L: [960, 305], T: [1103, 224], Bt: [1066, 368] }} label="Personalised" pill={[40, 112, 64]}>{[0, 1, 2, 3, 4].map((i) => <Mini key={i} c="#1fa463" x={8 + i * 4} y={10 + i * 13} />)}</Card>
          <Card q={{ L: [799, 402], T: [942, 321], Bt: [905, 465] }} label="Strategy Content" pill={[28, 110, 64]}>
            <Mini c="#0f9d58" x={10} y={12} /><Mini c="#ea4335" x={9} y={26} /><Mini c="#e4626a" x={8} y={40} outline /><Mini c="#0a66c2" x={14} y={52} /><Mini c="#e4626a" x={13} y={66} outline />
          </Card>
          <Card q={{ L: [650, 487], T: [777, 416], Bt: [745, 557] }} label="Automation Action" pill={[28, 112, 60]}><Mini c="#e4626a" x={14} y={80} outline /></Card>
        </g>
        {/* coin: navy side with a blue sheen on the left, bevelled light rim, Chatsheet's open rings */}
        <defs><linearGradient id="kside" x1="0" x2="1"><stop offset="0" stopColor="#2c55c9" /><stop offset="0.12" stopColor="#0c1a4a" /><stop offset="1" stopColor="#060f30" /></linearGradient></defs>
        <path d={`M${coin[0] - 107.5} ${coin[1]}v26a107.5 46.2 0 0 0 215 0v-26z`} fill="url(#kside)" />
        <g transform={flat(coin)}>
          <circle r="107.5" fill="#eef4ff" />
          <circle r="105" fill="none" stroke="#c7d8fb" strokeWidth="2" />
          <circle r="100" fill="#e6efff" />
          <circle r="87" fill="#c4d9ff" />
          <g transform="translate(-10 -10)">
          {[[78.5, 17, 0.86], [44.5, 19, 0.8]].map(([r, w, open]) => <circle key={r} r={r} fill="none" stroke="#4078f6" strokeWidth={w} strokeDasharray={`${2 * Math.PI * r * open} ${2 * Math.PI * r * (1 - open)}`} transform={`rotate(${r === 78.5 ? -62 : 70})`} />)}
          <circle r="18" fill="#4078f6" />
          </g>
          {[[60, -20], [-30, 70], [20, -88], [-75, -10]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#fff" opacity="0.9" />)}
        </g>
        {/* tool tiles */}
        <g filter="url(#kblur)" opacity="0.75"><Plate at={[171, 420]} w={18} h={30}><rect x="-5" y="-9" width="10" height="18" rx="5" fill="#9fb6f2" /></Plate></g>
        <Plate at={[122, 605]} w={56} h={74}><Slack /></Plate>
        <Plate at={[210, 598]} w={58} h={46} lean={0.6} ghost><g transform="scale(1.25)"><Pdf /></g></Plate>
        <Tile at={[319, 610]} s={48}><YouTube /></Tile>
        <Tile at={[537, 622]} s={56}><Drive /></Tile>
        <Tile at={[421, 689]} s={56}><Gmail /></Tile>
        <Tile at={[553, 706]} s={48}><Sheets /></Tile>
        <Tile at={[320, 742]} s={55}><Excel /></Tile>
        <Tile at={[528, 798]} s={56}><Docs /></Tile>
        <Tile at={[182, 808]} s={44} />
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 805, height: 95, background: '#f8f8fa' }} />
    </div>
  )
}
