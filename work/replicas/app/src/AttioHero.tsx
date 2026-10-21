// Pixel replica (internal study, never published) of Attio's homepage fold, 1440x900 CSS @2x.
// Reference: knowledge/benchmarks/attio/fold-home.png. Every position below was measured from the reference pixels
// (scratch probes: ink bboxes and colour runs, /2 for CSS) and from knowledge/benchmarks/type-buttons/attio.json.
// Substitutions: Attio sets display text in "interDisplay" and UI in "inter"; we use Inter Variable with the opsz axis
// (opsz 32 at display sizes = Inter Display), so glyphs are the same family. Logo is a neutral placeholder mark and
// wordmark, not theirs. Headline / sub / nav copy kept verbatim only so the overlay can register; window sample data
// is ours (Northwind workspace). The cookie banner in the capture is omitted (the sidebar it covers is filled in).
// Override: squircle.css corner-shape is reset to round inside this page because Attio's corners are plain arcs.
import type { CSSProperties, ReactNode } from 'react'
import {
  ArrowRight, X, ChevronDown, ChevronRight, House, Settings, CircleHelp, Search, ArrowUp, Bell,
  SquareCheck, File, Video, ChartColumn, Play, Send, Mic, Workflow,
} from 'lucide-react'

const F = '"Inter Variable", ui-sans-serif, system-ui, sans-serif'
const INK = '#1c1d1f'      // h1, lab(10.72)
const NAVINK = '#2e3238'   // nav links + secondary button text, lab(20.57)
const SUB = '#6f7988'      // sub, lab(50.38)
const UI = '#242629'       // product UI text
const MUTED = '#737373'    // product UI muted, rgba(0,0,0,.55) on white
const abs = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left, top, ...extra })
const txt = (size: number, weight: number, lh: number, ls: number, color: string): CSSProperties =>
  ({ fontSize: size, fontWeight: weight, lineHeight: `${lh}px`, letterSpacing: ls, color, fontFamily: F, fontFeatureSettings: '"ss03"', fontVariationSettings: '"opsz" 14' })

/* ---------- marketing chrome ---------- */

function Banner() {
  return (
    <div style={abs(0, 0, { width: 1440, height: 48, background: '#000' })}>
      <div style={abs(577, 14, { display: 'flex', alignItems: 'center', gap: 5.5, ...txt(13, 500, 20, -0.16, '#fff') })}>
        <span>Orchestrate revenue agents with Workflows</span>
        <ArrowRight size={16} strokeWidth={1.6} color="#fff" />
      </div>
      <X size={14} strokeWidth={1.7} color="#9a9a9a" style={abs(1393, 17)} />
    </div>
  )
}

/** neutral placeholder mark: two stacked offset rounded bars (not Attio's) + a plain wordmark */
function Logo() {
  return (
    <div style={abs(28, 70, { display: 'flex', alignItems: 'center', gap: 7, height: 24 })}>
      <svg width="28" height="24" viewBox="0 0 28 24" aria-hidden>
        <rect x="1" y="2" width="16" height="9" rx="4.5" fill={INK} />
        <rect x="9" y="13" width="18" height="9" rx="4.5" fill={INK} />
      </svg>
      <span style={{ ...txt(27, 620, 24, 0.6, INK), fontVariationSettings: '"opsz" 32', marginTop: -3 }}>orbit</span>
    </div>
  )
}

function NavLink({ label, chevron, left, width }: { label: string; chevron?: boolean; left: number; width: number }) {
  return (
    <a href="#" style={abs(left, 64, { width, height: 36, display: 'flex', alignItems: 'center', paddingLeft: 13, gap: chevron ? 7 : 0, textDecoration: 'none', ...txt(15, 500, 22, -0.16, NAVINK) })}>
      {label}{chevron && <ChevronDown size={16} strokeWidth={1.7} color={NAVINK} style={{ marginTop: 1 }} />}
    </a>
  )
}

const btnBase: CSSProperties = { height: 36, borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', textDecoration: 'none', whiteSpace: 'nowrap', ...txt(14, 500, 20, -0.07, NAVINK) }
const Secondary = ({ children, style }: { children: ReactNode; style: CSSProperties }) =>
  <a href="#" style={{ ...btnBase, background: '#fff', border: '1px solid #cad0d9', ...style }}>{children}</a>
const Primary = ({ children, style }: { children: ReactNode; style: CSSProperties }) =>
  <a href="#" style={{ ...btnBase, background: 'radial-gradient(at 50% -10%, #202124 0%, #202124 100%)', border: '1px solid #505967', color: '#f3f4f6', ...style }}>{children}</a>

function Nav() {
  return (
    <header style={abs(0, 48, { width: 1440, height: 68, borderBottom: '1px solid #e4e7ec', boxSizing: 'border-box', background: '#fff' })}>
      <div style={{ position: 'absolute', inset: 0, top: -48 }}>
        <Logo />
        <nav aria-label="Main">
          <NavLink label="Platform" chevron left={163} width={105} />
          <NavLink label="Resources" chevron left={274} width={120} />
          <NavLink label="Developers" left={400} width={106} />
          <NavLink label="Customers" left={512} width={103} />
          <NavLink label="Pricing" left={621} width={75} />
        </nav>
        <Secondary style={abs(1225, 64, { width: 71 })}>Sign in</Secondary>
        <Primary style={abs(1306, 64, { width: 110 })}>Start for free</Primary>
      </div>
    </header>
  )
}

function Pill() {
  return (
    <a href="#" style={abs(579, 212, { width: 282, height: 30, borderRadius: 13, border: '1px solid #edeff3', boxSizing: 'border-box', display: 'flex', alignItems: 'center', paddingLeft: 11, gap: 4, textDecoration: 'none', ...txt(13, 500, 18, -0.16, '#232529') })}>
      <span>GTM lessons from Elena Verna and more</span>
      <ChevronRight size={11} strokeWidth={2} color="#232529" />
      {/* the travelling light on the bottom edge: blue -> cyan, fading into the border */}
      <span aria-hidden style={{ position: 'absolute', left: 49, bottom: -1, width: 92, height: 1, background: 'linear-gradient(90deg, rgba(112,159,244,0) 0%, #709ff4 8%, #68b7f6 16%, #8de2ec 34%, rgba(186,237,237,.6) 60%, rgba(237,239,243,0) 100%)' }} />
    </a>
  )
}

/* ---------- product window ---------- */

/** Attio-style dome house: rounded body, flat floor line (drawn, not lucide) */
const HomeIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1.6 5.6c0-.5.2-.9.6-1.2L5.1 2a1.4 1.4 0 0 1 1.8 0l2.9 2.4c.4.3.6.7.6 1.2v3.6c0 .8-.6 1.4-1.4 1.4H3c-.8 0-1.4-.6-1.4-1.4z" />
    <path d="M4.4 8.2h3.2" />
  </svg>
)
/** wide sidebar-toggle glyph, 15x11.5 as measured */
const PanelIcon = () => (
  <svg width="16" height="12.5" viewBox="0 0 16 12.5" fill="none" stroke="#8a8a8a" strokeWidth="1" style={{ position: 'absolute', left: 219.5, top: 15.5 }} aria-hidden>
    <rect x=".5" y=".5" width="15" height="11.5" rx="2.6" /><path d="M5.5 .8v11" /><path d="M2.4 3.4h1.4M2.4 5.4h1.4" strokeLinecap="round" />
  </svg>
)

const ring = '0 0 2px 0 rgba(28,40,64,0.18), 0 1px 3px 0 rgba(0,0,0,0.04)'
const Kbd = ({ children, w }: { children: ReactNode; w: number }) => (
  <span style={{ width: w, height: 18, borderRadius: 5, boxShadow: '0 0 0 1px #ececed', background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...txt(11, 500, 14, 0, '#9a9a9c') }}>{children}</span>
)

function SideItem({ icon, label, top, active, indent = 0 }: { icon: ReactNode; label: string; top: number; active?: boolean; indent?: number }) {
  return (
    <div style={abs(10 + indent, top, { width: 232 - indent, height: 26, borderRadius: 8, background: active ? '#eeeff1' : 'transparent', display: 'flex', alignItems: 'center', paddingLeft: 7, gap: 5.5, boxSizing: 'border-box', ...txt(13, 500, 20, -0.13, UI) })}>
      <span style={{ width: 12, height: 12, display: 'grid', placeItems: 'center', color: '#5c5e62' }}>{icon}</span>{label}
    </div>
  )
}

function Sidebar() {
  const I = (C: typeof House) => <C size={13} strokeWidth={1.5} />
  return (
    <aside style={abs(0, 0, { width: 252, height: '100%', background: '#fbfbfb', borderRight: '1px solid #eeeff1' })}>
      <div style={{ height: 44.5, position: 'relative' }}>
        <div style={abs(0, 43.5, { width: '100%', height: 1, background: '#eeeff1' })} />
        {/* workspace mark: ours, not Attio's Basepoint glyph */}
        <div style={abs(11, 11, { width: 22, height: 22, borderRadius: 6.5, background: '#212024', display: 'grid', placeItems: 'center' })}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 10V2l8 8V2" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={abs(44, 11, { display: 'flex', alignItems: 'center', gap: 4.5, ...txt(15, 600, 20, -0.15, UI), height: 22 })}>
          Brightway<ChevronDown size={15} strokeWidth={1.8} color={UI} style={{ marginTop: 1 }} />
        </div>
        <PanelIcon />
      </div>
      {/* quick actions + search */}
      <div style={abs(9.5, 54, { width: 175, height: 26, borderRadius: 8, background: '#fff', boxShadow: ring, display: 'flex', alignItems: 'center', padding: '0 4px 0 6px', gap: 5.5, boxSizing: 'border-box', ...txt(13, 500, 20, -0.26, UI) })}>
        <span style={{ width: 13, height: 13, borderRadius: 3.5, boxShadow: 'inset 0 0 0 1.2px #5c5e62', display: 'grid', placeItems: 'center', ...txt(8, 700, 8, 0, '#5c5e62') }}>K</span>
        <span style={{ flex: 1 }}>Quick Actions</span><Kbd w={26}>⌘K</Kbd>
      </div>
      <div style={abs(192, 54, { width: 50, height: 26, borderRadius: 8, background: '#fff', boxShadow: ring, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 0 8px', boxSizing: 'border-box' })}>
        <Search size={13} strokeWidth={1.9} color={UI} /><Kbd w={17}>/</Kbd>
      </div>
      <SideItem icon={<HomeIcon />} label="Home" top={89} active />
      <SideItem icon={I(Bell)} label="Notifications" top={117} />
      <SideItem icon={I(SquareCheck)} label="Tasks" top={145} />
      <SideItem icon={I(File)} label="Notes" top={173} />
      <SideItem icon={I(Video)} label="Calls" top={201} />
      <SideItem icon={I(ChartColumn)} label="Reports" top={229} />
      <SideItem icon={I(Workflow)} label="Automations" top={257} />
      <div style={abs(22.5, 285, { width: 1, height: 60, background: '#e6e7e9' })} />
      <SideItem icon={I(Play)} label="Workflows" top={258 + 28 - 1} indent={22} />
      <SideItem icon={I(Send)} label="Sequences" top={313 - 1} indent={22} />
    </aside>
  )
}

function Main() {
  return (
    <section style={abs(252, 0, { right: 0, height: '100%', background: '#fff' })}>
      <div style={{ height: 44.5, position: 'relative' }}>
        <div style={abs(0, 43.5, { width: '100%', height: 1, background: '#eeeff1' })} />
        <div style={abs(14.5, 12, { display: 'flex', alignItems: 'center', gap: 5.5, ...txt(13, 500, 20, -0.13, UI) })}><HomeIcon size={13} />Home</div>
        <div style={abs(649, 12, { display: 'flex', alignItems: 'center', gap: 4, ...txt(13, 500, 20, -0.13, MUTED) })}><Settings size={13.5} strokeWidth={1.6} />Configure</div>
        <div style={abs(750, 12, { display: 'flex', alignItems: 'center', gap: 4, ...txt(13, 500, 20, -0.13, '#4a4c50') })}><CircleHelp size={13.5} strokeWidth={1.6} />Help</div>
      </div>
      {/* greeting + Ask composer, a 622px column centred in the main pane */}
      <h2 style={abs(103.5, 87.2, { margin: 0, ...txt(18.6, 600, 24, -0.19, UI) })}>Good morning, Ada</h2>
      <div style={abs(96, 133.5, { width: 622, height: 107.5, borderRadius: 14, border: '1px solid #b9d0fa', boxSizing: 'border-box', background: '#fff', boxShadow: '0 12px 30px 0 rgba(0,0,0,0.04)' })}>
        <div style={abs(11, 9, txt(13, 400, 20, -0.13, UI))}>Which deals need me before Friday?</div>
        <div style={abs(520, 74, { display: 'flex', alignItems: 'center', ...txt(13, 500, 18, -0.13, MUTED) })}>Auto</div>
        <span style={abs(563, 78.5, { width: 11.5, height: 12, borderRadius: 3, boxShadow: 'inset 0 0 0 1.1px #8a8a8a', display: 'grid', placeItems: 'center', ...txt(8, 600, 8, 0, '#737373') })}>/</span>
        <div style={abs(586, 71.5, { width: 26.5, height: 26.5, borderRadius: 8, background: '#266df0', border: '1px solid rgba(0,0,0,0.1)', boxSizing: 'border-box', display: 'grid', placeItems: 'center', boxShadow: '0 2px 4px -2px rgba(15,107,233,0.12), 0 3px 6px -2px rgba(15,107,233,0.08)' })}>
          <ArrowUp size={13} strokeWidth={2} color="#fff" />
        </div>
      </div>
      <div style={abs(0, 250, { width: 814, display: 'flex', justifyContent: 'center', gap: 8 })}>
        <Chip tint="#e5eeff" ink="#215bc4" icon={<svg width="8" height="9" viewBox="0 0 8 9"><rect y="1.2" width="8" height="7.8" rx="1.8" fill="currentColor" /><rect x="1.6" width="1.2" height="2.4" rx=".6" fill="currentColor" /><rect x="5.2" width="1.2" height="2.4" rx=".6" fill="currentColor" /><rect x="1" y="3.4" width="6" height=".8" fill="#e5eeff" /></svg>}>Prep for Lumen demo</Chip>
        <Chip tint="#feecf3" ink="#b81c5d" icon={<Mic size={10} strokeWidth={2.6} fill="currentColor" />}>Recap last call</Chip>
      </div>
    </section>
  )
}

function Chip({ tint, ink, icon, children }: { tint: string; ink: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', height: 26, borderRadius: 8, border: '1px solid #efefef', background: '#fdfdfd', boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 8px 0 5px', gap: 6, whiteSpace: 'nowrap', ...txt(13, 500, 18, -0.13, MUTED) }}>
      <span style={{ width: 14, height: 14, borderRadius: 4, background: tint, color: ink, display: 'grid', placeItems: 'center' }}>{icon}</span>{children}
    </div>
  )
}

function Window() {
  return (
    <div data-product style={abs(180, 580, {
      width: 1080, height: 618, borderRadius: 16, background: '#f3f4f8',
      boxShadow: '0 0 0 1px rgba(11,13,24,0.06), 0 1px 2px 0 rgba(11,13,24,0.024), 0 3px 6px 0 rgba(11,13,24,0.03), 0 8px 14px 0 rgba(11,13,24,0.035), 0 16px 28px 0 rgba(11,13,24,0.04)',
    })}>
      {[['#ff5b59', 14], ['#f5bb0c', 32], ['#1ac480', 50]].map(([c, x]) => (
        <span key={c} style={abs(x as number, 10, { width: 12, height: 12, borderRadius: 999, background: c as string, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.06)' })} />
      ))}
      <div style={abs(6, 32, { width: 1067.5, height: 590, borderRadius: 11, border: '1px solid #efefef', boxSizing: 'border-box', overflow: 'hidden', background: '#fff' })}>
        <Sidebar />
        <Main />
      </div>
    </div>
  )
}

export default function AttioHero() {
  return (
    <div className="attio-replica" style={{ position: 'relative', width: 1440, height: 900, overflow: 'hidden', background: '#fff', fontFamily: F, WebkitFontSmoothing: 'antialiased' }}>
      <style>{`.attio-replica, .attio-replica * { corner-shape: round !important; } .attio-replica a { color: inherit; }`}</style>
      {/* stage: white until ~470, then a cool lavender wash to #dfe6fc at the fold, with 1px light rules every 8px */}
      <div aria-hidden style={abs(0, 116, { width: 1440, height: 784, background: 'radial-gradient(60% 46% at 50% 49%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%), linear-gradient(180deg, #fff 0px, #fff 354px, #fbfcfe 372px, #f3f5fd 470px, #ebf0fc 590px, #e4eafc 700px, #dfe6fc 784px)' })} />
      <div aria-hidden style={abs(0, 470, { width: 1440, height: 430, background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 1px, rgba(255,255,255,0) 1px 8px)', WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 140px)', maskImage: 'linear-gradient(180deg, transparent 0, #000 140px)' })} />
      <Banner />
      <Nav />
      <main>
        <Pill />
        <h1 style={abs(0, 278, { width: 1440, margin: 0, textAlign: 'center', ...txt(64, 600, 60.8, -1.28, INK), fontVariationSettings: '"opsz" 32' })}>Welcome to agentic revenue.</h1>
        <p style={abs(477, 375, { width: 486, margin: 0, textAlign: 'center', textWrap: 'balance', ...txt(18, 500, 23.4, -0.18, SUB) })}>
          Attio is the CRM that builds pipeline, advances deals, and grows accounts around the clock.
        </p>
        <Secondary style={abs(606, 446, { width: 108 })}>Talk to sales</Secondary>
        <Primary style={abs(724, 446, { width: 110 })}>Start for free</Primary>
        <Window />
      </main>
    </div>
  )
}
