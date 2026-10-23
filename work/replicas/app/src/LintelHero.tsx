// Lintel hero r2 (#/lintel, 1440x900), an X post. Founder 2026-10-23: "let's just create a completely new hero as a post";
// on r1 (a plain product window): "interesting... try maybe something different with bg and right visual in this layout".
// Dark split: copy left on the 120 rail; the right half is the signature visual, the repo as a dithered pixel map
// (LintelField): files are cell clusters, imports are stepped pixel lines, and the path the review followed is lit amber from
// the changed file to api/webhooks.ts, three files away. One product card sits on the map: Lintel's review of the flagged line,
// with the fix. Amber marks only that story; everything else is graphite and white. All values are sample product state.
import type { CSSProperties, ReactNode } from 'react'
import { RiFileCodeLine, RiCheckLine, RiChat3Line } from '@remixicon/react'
import LintelLockup, { Mark } from './LintelLogo'
import LintelField, { FieldLabels } from './LintelField'

const W = 1440, H = 900, RAIL = 120
const C = { page: '#0A0A0B', ink: '#F4F4F5', sub: '#A1A1A6', mute: '#8A8A92', faint: '#6E6E76', s1: '#111113', s2: '#161618',
  ring: 'rgba(255,255,255,0.09)', hair: 'rgba(255,255,255,0.06)', amber: '#F5B03E', amberInk: '#F7C46C', amberFill: 'rgba(245,176,62,0.10)', amberRing: 'rgba(245,176,62,0.28)', add: '#5BD49A' }
const SANS = '"Inter Variable", Inter, system-ui, sans-serif', MONO = '"Geist Mono Variable", "Geist Mono", ui-monospace, monospace'
const row: CSSProperties = { display: 'flex', alignItems: 'center' }
const abs = (x: number, y: number, s: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: x, top: y, ...s })
// the product's two buttons; the hero CTAs are the same tokens at 44
const white: CSSProperties = { background: 'linear-gradient(#FFFFFF, #DCDCDE)', color: '#0A0A0B', boxShadow: '0 0 0 1px #0A0A0B, inset 0 1px 0 #FFFFFF, 0 1px 2px rgba(0,0,0,0.4)' }
const dark: CSSProperties = { background: 'linear-gradient(#2A2A2F, #1C1C20)', color: C.ink, boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 1px 2px rgba(0,0,0,0.5)' }
const pill = (h: number, fs: number, px: number): CSSProperties => ({ ...row, justifyContent: 'center', gap: 6, height: h, boxSizing: 'border-box', padding: `0 ${px}px 0.5px`, borderRadius: 999, fontSize: fs, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap' })
const kw = (s: string) => <span style={{ color: '#C4B5FD' }}>{s}</span>
const fn = (s: string) => <span style={{ color: '#E4E4E7' }}>{s}</span>
const st = (s: string) => <span style={{ color: '#A7F3D0' }}>{s}</span>

// ---- nav: a 72px band on a full-width hairline, + marks where the rails cross it ----
function Nav() {
  return (
    <header style={abs(0, 0, { width: W, height: 72 })}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: C.hair }} />
      {[RAIL, W - RAIL].map((x) => <span key={x} aria-hidden style={abs(x - 5, 66, { width: 11, height: 11, color: C.faint, fontSize: 0 })}><svg width={11} height={11} viewBox="0 0 11 11"><path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth={1} /></svg></span>)}
      <nav style={{ ...row, position: 'absolute', left: RAIL, right: RAIL, top: 0, height: 72 }}>
        <LintelLockup size={22} color={C.ink} />
        <span style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)', margin: '0 24px' }} />
        <span style={{ ...row, gap: 28, fontSize: 15, fontWeight: 500, color: C.sub }}>{['Product', 'Reviews', 'Docs', 'Changelog', 'Pricing'].map((l) => <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>)}</span>
        <span style={{ ...row, gap: 20, marginLeft: 'auto' }}>
          <a href="#" style={{ fontSize: 15, fontWeight: 500, color: C.sub, textDecoration: 'none' }}>Sign in</a>
          <a href="#" style={{ ...pill(36, 14, 16), ...dark, textDecoration: 'none' }}>Start free</a>
        </span>
      </nav>
    </header>
  )
}

const Chip = ({ children, tone }: { children: ReactNode; tone?: 'amber' }) => (
  <span style={{ ...row, gap: 5, height: 22, padding: '0 8px', borderRadius: 8, fontFamily: MONO, fontSize: 11.5, color: tone ? C.amberInk : C.sub, background: tone ? C.amberFill : 'rgba(255,255,255,0.04)', boxShadow: `inset 0 0 0 1px ${tone ? C.amberRing : C.ring}`, whiteSpace: 'nowrap' }}>{children}</span>
)
const Diff = ({ k, children, n }: { k: ' ' | '+' | '-'; children: ReactNode; n?: number }) => (
  <div style={{ ...row, height: 21, fontFamily: MONO, fontSize: 12, whiteSpace: 'pre', background: k === '+' ? 'rgba(91,212,154,0.06)' : undefined }}>
    {n !== undefined && <span style={{ width: 30, flex: 'none', textAlign: 'right', color: C.faint }}>{n}</span>}
    <span style={{ width: 24, flex: 'none', textAlign: 'center', color: k === '+' ? C.add : C.mute }}>{k === ' ' ? '' : k}</span>
    <span style={{ color: k === '-' ? C.mute : '#D4D4D8' }}>{children}</span>
  </div>
)

// ---- the product: Lintel's review of the flagged line, on the map ----
function Review() {
  return (
    <div style={{ width: 476, borderRadius: 18, background: C.s2, boxShadow: `inset 0 0 0 1px ${C.ring}, 0 24px 60px -20px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.5)`, fontFamily: SANS, color: C.ink, overflow: 'hidden' }}>
      <div style={{ ...row, gap: 10, height: 46, padding: '0 14px 0 12px', boxShadow: `inset 0 -1px 0 ${C.hair}` }}>
        <span className="round" style={{ width: 24, height: 24, borderRadius: 999, display: 'grid', placeItems: 'center', background: '#F4F4F5', color: '#0A0A0B' }}><Mark size={12} /></span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Lintel</span>
        <span style={{ ...row, gap: 5, height: 22, padding: '0 8px', borderRadius: 999, background: C.amberFill, boxShadow: `inset 0 0 0 1px ${C.amberRing}`, fontSize: 11.5, fontWeight: 500, color: C.amberInk }}>
          <span className="round" style={{ width: 6, height: 6, borderRadius: 999, background: C.amber }} />Can charge twice
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: C.mute }}>PR #482 · 3.1s</span>
      </div>
      {/* the flagged line, as it sits in the diff */}
      <div style={{ padding: '6px 0', background: C.s1, boxShadow: `inset 0 -1px 0 ${C.hair}` }}>
        <Diff k="+" n={43}>  {kw('await')} {fn('sleep')}(delay)</Diff>
        <div style={{ background: C.amberFill, boxShadow: `inset 2px 0 0 ${C.amber}` }}><Diff k="+" n={44}>  {kw('const')} result = {kw('await')} {fn('charge')}(payment)</Diff></div>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: '21px', color: '#D4D4D8' }}>
          <code style={{ fontFamily: MONO, fontSize: 12.5, color: C.ink }}>onPaymentFailed</code> retries this charge too, from a file this PR never touches. Neither call sends an idempotency key, so one failure can bill the card twice.
        </p>
        <div style={{ ...row, gap: 6, marginTop: 10 }}>
          <Chip tone="amber"><RiFileCodeLine size={12} />api/webhooks.ts:118</Chip>
          <Chip>payments/stripe.ts:42</Chip>
        </div>
        <div style={{ marginTop: 12, borderRadius: 10, overflow: 'hidden', boxShadow: `inset 0 0 0 1px ${C.ring}`, background: C.s1, padding: '6px 0' }}>
          <Diff k="-">{kw('const')} result = {kw('await')} {fn('charge')}(payment)</Diff>
          <Diff k="+">{kw('const')} key = {st('`${id}:${attempt}`')}</Diff>
          <Diff k="+">{kw('const')} result = {kw('await')} {fn('charge')}(payment, {'{'} key {'}'})</Diff>
        </div>
        <div style={{ ...row, gap: 8, marginTop: 14 }}>
          <span style={{ ...pill(32, 13, 14), ...white }}><RiCheckLine size={15} />Apply fix</span>
          <span style={{ ...pill(32, 13, 14), ...dark }}>Dismiss</span>
          <span style={{ ...row, gap: 6, marginLeft: 'auto', fontSize: 12, color: C.mute }}><RiChat3Line size={14} />Reply</span>
        </div>
      </div>
    </div>
  )
}

// the map fades in from the copy side and out at the nav and the fold
const FIELD_MASK = 'linear-gradient(90deg, transparent 600px, #000 820px), linear-gradient(transparent 76px, #000 150px, #000 780px, transparent 900px)'

export default function LintelHero() {
  return (
    <main aria-label="Lintel, AI code review" style={{ width: W, height: H, position: 'relative', overflow: 'hidden', background: C.page, fontFamily: SANS, fontOpticalSizing: 'auto', fontFeatureSettings: '"cv11", "ss01"', WebkitFontSmoothing: 'antialiased', color: C.ink }}>
      {/* the stage: Lintel's context map (what the review read) and the review itself, one product view on the right */}
      <div data-product aria-label="Sample review: the context map and Lintel's comment" style={abs(600, 80, { width: W - 600, height: H - 80 })}>
        <div aria-hidden style={{ position: 'absolute', left: -600, top: -80, width: W, height: H, WebkitMaskImage: FIELD_MASK, WebkitMaskComposite: 'source-in', maskImage: FIELD_MASK, maskComposite: 'intersect' }}>
          <LintelField x0={560} y0={80} x1={1440} y1={900} />
        </div>
        <div style={{ position: 'absolute', left: -600, top: -80, width: W, height: H, pointerEvents: 'none' }}>
          <FieldLabels mono={MONO} mute="#8E8E96" amber={C.amberInk} ink={C.ink} page={C.page} />
          <div style={abs(728, 470)}><Review /></div>
        </div>
      </div>
      <Nav />
      {/* copy: on the 120 rail, centred in the fold below the nav */}
      <div style={abs(RAIL, 300, { width: 520 })}>
        <h1 style={{ margin: 0, fontSize: 60, fontWeight: 550, letterSpacing: '-0.045em', lineHeight: 1.04, color: C.ink }}>Catch What<br />The Diff Hides</h1>
        <p style={{ margin: '20px 0 0', fontSize: 18, lineHeight: '28px', fontWeight: 450, color: C.sub }}>Lintel reviews every pull request against your whole<br />repo, so the break three files away shows up first.</p>
        <div style={{ ...row, gap: 12, marginTop: 32 }}>
          <a href="#" style={{ ...pill(44, 15, 20), ...white, textDecoration: 'none' }}>Start free</a>
          <a href="#" style={{ ...pill(44, 15, 20), ...dark, textDecoration: 'none' }}>Book a demo</a>
        </div>
      </div>
    </main>
  )
}
