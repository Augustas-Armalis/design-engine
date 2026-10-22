// Cadence hero, three variants after cadence-hero r1 ("empty... nothing above the title, nothing below the buttons, nothing in
// the background... inconsistent roundness... nav out of place"). All three share ONE set of rules (canon hero-light, 2026-10-22):
//  - one grid: the product renders at Z = 0.8333 so its 1448 window is 1207 wide; nav, copy and frame sit on x 117..1323.
//  - one radius ladder derived from the product's scale: frame 36 (44 x Z), CTA/card 10 (12 x Z), composer 16 with a 10 inner
//    button (16 - 6), pills full. Nothing else.
//  - every fold: an element above the h1, a product element below the CTAs, a living background behind the product.
// Variants differ in type, layout and background colour only. Sample data; no customer or metric claims.
import '@fontsource-variable/geist'
import '@fontsource-variable/instrument-sans'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowRight, Check, Sparkles, CornerDownLeft } from 'lucide-react'
import Calendar from './Calendar'

const Z = 0.8333, WIN_W = 1448 * Z, GX = (1440 - WIN_W) / 2 // 116.7: the grid edge everything aligns to
const R = { frame: 24, ctl: 12, comp: 18 } // canon ladder: frame/stage 24 (80+ band), controls 12 (40-48 band), composer 18 with 12 inside (18 - 6)
const INK = '#111214', SUB = '#5b5f66'
type V = { font: string; canvas: string; h1: CSSProperties }
const VAR: Record<1 | 2 | 3, V> = {
  1: { font: '"Inter Variable", system-ui, sans-serif', canvas: '#f7f7f8', h1: { fontSize: 66, fontWeight: 550, letterSpacing: '-0.045em', lineHeight: 1.03, fontOpticalSizing: 'auto' } },
  2: { font: '"Geist Variable", system-ui, sans-serif', canvas: '#f6f5f3', h1: { fontSize: 58, fontWeight: 550, letterSpacing: '-0.04em', lineHeight: 1.04 } },
  3: { font: '"Instrument Sans Variable", system-ui, sans-serif', canvas: '#eef0f4', h1: { fontSize: 72, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 } },
}
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const ink: CSSProperties = { background: 'linear-gradient(180deg, #2b2c31 0%, #111214 100%)', color: '#fff', boxShadow: 'inset 0 1px 0 rgb(255 255 255 / .16), 0 0 0 1px #0c0d0f, 0 1px 2px rgb(17 18 20 / .24), 0 8px 18px -8px rgb(17 18 20 / .5)' }
const ghost: CSSProperties = { background: '#fff', color: INK, boxShadow: '0 0 0 1px rgb(17 18 20 / .1), 0 1px 2px rgb(17 18 20 / .06)' }

const Mark = ({ s = 22 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 22 22" aria-hidden><g fill={INK}><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /></g><rect x="12" y="12" width="9" height="9" rx="4.5" fill="#6e3ff3" /></svg>
)
function Nav() {
  return (
    <header style={{ position: 'absolute', left: GX, right: GX, top: 0, height: 76, ...row }}>
      <span style={{ ...row, gap: 10, fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}><Mark />Cadence</span>
      <nav style={{ ...row, gap: 34, position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 15, fontWeight: 500, color: SUB }}>
        {['Product', 'Teams', 'Integrations', 'Pricing', 'Changelog'].map((l) => <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>)}
      </nav>
      <span style={{ marginLeft: 'auto', ...row, gap: 20, fontSize: 15, fontWeight: 500 }}>
        <a href="#" style={{ color: SUB, textDecoration: 'none' }}>Sign in</a>
        <a href="#" style={{ ...row, height: 36, padding: '0 14px', borderRadius: R.ctl, textDecoration: 'none', ...ghost }}>Get Cadence</a>
      </span>
    </header>
  )
}
function Announce({ tone = '#6e3ff3' }: { tone?: string }) {
  return (
    <a href="#" style={{ ...row, display: 'inline-flex', width: 'fit-content', gap: 10, height: 32, padding: '0 12px 0 4px', borderRadius: 999, background: '#fff', boxShadow: '0 0 0 1px rgb(17 18 20 / .08), 0 1px 2px rgb(17 18 20 / .05)', fontSize: 13.5, fontWeight: 500, color: INK, textDecoration: 'none' }}>
      <span style={{ ...row, gap: 5, height: 24, padding: '0 9px', borderRadius: 999, background: `color-mix(in oklab, ${tone} 12%, white)`, color: tone, fontSize: 12.5 }}><Sparkles size={12} strokeWidth={2} />New</span>
      Focus time for whole teams<ArrowRight size={14} strokeWidth={2} color={SUB} />
    </a>
  )
}
function Ctas() {
  return (
    <div style={{ ...row, gap: 10, fontSize: 15, fontWeight: 550 }}>
      <a href="#" style={{ ...row, gap: 8, height: 46, padding: '0 16px 0 20px', borderRadius: R.ctl, textDecoration: 'none', ...ink }}>Start for free<ArrowRight size={16} strokeWidth={2} style={{ opacity: 0.8 }} /></a>
      <a href="#" style={{ ...row, height: 46, padding: '0 20px', borderRadius: R.ctl, textDecoration: 'none', ...ghost }}>Book a demo</a>
    </div>
  )
}
function Facts({ size = 14, gap = 18 }: { size?: number; gap?: number } = {}) {
  return (
    <div style={{ ...row, gap, fontSize: size, color: SUB, whiteSpace: 'nowrap' }}>
      {['Free for up to 5 people', 'Google and Outlook', 'Set up in two minutes'].map((t) => <span key={t} style={{ ...row, gap: 7 }}><Check size={15} strokeWidth={2.2} color="#6e3ff3" />{t}</span>)}
    </div>
  )
}
function Composer({ w = 470 }: { w?: number }) {
  return (
    <div style={{ width: w, padding: 6, borderRadius: R.comp, background: '#fff', boxShadow: '0 0 0 1px rgb(17 18 20 / .08), 0 1px 2px rgb(17 18 20 / .05), 0 12px 28px -14px rgb(17 18 20 / .18)' }}>
      <div style={{ ...row, gap: 10, height: 44, padding: '0 6px 0 12px' }}>
        <Sparkles size={16} strokeWidth={2} color="#6e3ff3" />
        <span style={{ fontSize: 15.5, fontWeight: 500, color: INK, letterSpacing: '-0.01em' }}>Find 45 min with Maya and Theo next week</span>
        <span style={{ marginLeft: 'auto', display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: R.ctl, ...ink }}><CornerDownLeft size={15} strokeWidth={2} /></span>
      </div>
      <div style={{ ...row, gap: 8, height: 40, margin: '2px 0 0', padding: '0 12px', borderRadius: R.comp - 6, background: '#f6f5fb', fontSize: 13.5, color: SUB }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: '#22a35a' }} /><span style={{ color: INK, fontWeight: 500 }}>Wed 22, 14:30</span>everyone free, focus time kept
      </div>
    </div>
  )
}
/** the real product window at Z, clipped by a frame whose radius is the window's radius x Z */
function Product({ left, top, w = WIN_W, h, offX = 0, offY = 0, corners, font }: { left: number; top: number; w?: number; h: number; offX?: number; offY?: number; corners?: string; font: string }) {
  return (
    <div data-product style={{ position: 'absolute', left, top, width: w, height: h, borderRadius: corners ?? R.frame, overflow: 'hidden', background: '#fff', boxShadow: '0 0 0 1px rgb(17 18 20 / .07), 0 2px 4px rgb(17 18 20 / .04), 0 30px 60px -24px rgb(17 18 20 / .22)' }}>
      <div style={{ zoom: Z, marginLeft: -76 - offX, marginTop: -146 - offY, width: 1600, height: 1200, pointerEvents: 'none' }}><Calendar font={font} windowRadius={R.frame / Z} /></div>
    </div>
  )
}
function Shell({ v, children, bg }: { v: 1 | 2 | 3; children: ReactNode; bg: ReactNode }) {
  return (
    <div style={{ position: 'relative', width: 1440, height: 900, overflow: 'hidden', background: VAR[v].canvas, fontFamily: VAR[v].font, fontFeatureSettings: '"cv11", "ss01"', color: INK }}>
      {bg}
      <Nav />
      <main>{children}</main>
    </div>
  )
}

/* V1: centred over a violet gradient stage (Inter display) */
export function CadenceHeroV1() {
  return (
    <Shell v={1} bg={<>
      <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: 420, bottom: 0, background: 'radial-gradient(70% 80% at 50% 100%, #b9a4ff 0%, #ddd3ff 40%, rgba(247,247,248,0) 74%), radial-gradient(40% 50% at 18% 90%, #ffd9c7 0%, rgba(247,247,248,0) 70%), radial-gradient(40% 50% at 84% 85%, #cfe0ff 0%, rgba(247,247,248,0) 70%)' }} />
      <div aria-hidden style={{ position: 'absolute', left: GX, right: GX, top: 0, height: 560, backgroundImage: 'radial-gradient(rgb(17 18 20 / .09) 1px, transparent 1.2px)', backgroundSize: '16px 16px', WebkitMaskImage: 'radial-gradient(48% 46% at 50% 36%, transparent 0%, #000 82%)', maskImage: 'radial-gradient(48% 46% at 50% 36%, transparent 0%, #000 82%)' }} />
    </>}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 126, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Announce />
        <h1 style={{ margin: '22px 0 0', ...VAR[1].h1 }}>Your Week,<br />Already Arranged</h1>
        <p style={{ margin: '20px 0 0', fontSize: 18, lineHeight: '28px', letterSpacing: '-0.01em', color: SUB }}>Cadence reads every calendar on the invite, protects deep work<br />and settles conflicts before anyone has to ask.</p>
        <div style={{ marginTop: 30 }}><Ctas /></div>
        <div style={{ marginTop: 22 }}><Facts /></div>
      </div>
      <Product left={GX} top={556} h={384} font={VAR[1].font} />
    </Shell>
  )
}

/* V2: split, copy left with the Ask composer, product on a warm stage right (Geist) */
export function CadenceHeroV2() {
  const SX = 660
  return (
    <Shell v={2} bg={<div aria-hidden style={{ position: 'absolute', left: SX, top: 104, right: 0, bottom: 0, borderTopLeftRadius: R.frame, background: 'radial-gradient(70% 60% at 30% 20%, #ffe3d3 0%, rgba(255,227,211,0) 60%), radial-gradient(70% 70% at 80% 80%, #dcd2ff 0%, rgba(220,210,255,0) 65%), #f1ece8', boxShadow: 'inset 0 0 0 1px rgb(17 18 20 / .05)' }} />}>
      <div style={{ position: 'absolute', left: GX, top: 150, width: 500 }}>
        <Announce tone="#a8380a" />
        <h1 style={{ margin: '22px 0 0', ...VAR[2].h1 }}>Your Week,<br />Already Arranged</h1>
        <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: '27px', color: SUB }}>Cadence reads every calendar on the invite, protects<br />deep work and settles conflicts before anyone asks.</p>
        <div style={{ marginTop: 30 }}><Ctas /></div>
        <div style={{ marginTop: 56 }}><Composer w={470} /></div>
      </div>
      <Product left={SX + 48} top={152} w={900} h={800} offX={0} offY={0} corners={`${R.frame}px 0 0 0`} font={VAR[2].font} />
    </Shell>
  )
}

/* V3: editorial, left headline with the sub in a second column, full-width product on a cool tinted canvas (Instrument Sans) */
export function CadenceHeroV3() {
  return (
    <Shell v={3} bg={<>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 78% 0%, #ffffff 0%, rgba(255,255,255,0) 70%), radial-gradient(60% 50% at 50% 100%, #d8def0 0%, rgba(238,240,244,0) 70%)' }} />
      <div aria-hidden style={{ position: 'absolute', left: GX, right: GX, top: 0, bottom: 0, boxShadow: 'inset 1px 0 0 rgb(17 18 20 / .06), inset -1px 0 0 rgb(17 18 20 / .06)' }} />
    </>}>
      <div style={{ position: 'absolute', left: GX, right: GX, top: 120 }}>
        <Announce tone="#2f5bd6" />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 64, marginTop: 24 }}>
          <h1 style={{ margin: 0, width: 600, ...VAR[3].h1 }}>Your week,<br />already arranged</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 6 }}>
            <p style={{ margin: 0, fontSize: 18, lineHeight: '28px', color: SUB }}>Cadence reads every calendar on the invite,<br />protects deep work and settles conflicts<br />before anyone has to ask.</p>
            <Ctas />
            <Facts size={13} gap={14} />
          </div>
        </div>
      </div>
      <Product left={GX} top={436} h={504} font={VAR[3].font} />
    </Shell>
  )
}
export default CadenceHeroV1
