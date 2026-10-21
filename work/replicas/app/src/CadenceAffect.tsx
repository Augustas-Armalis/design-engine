// Cadence feature section in affectUI's measured 3-up grammar (replica AffectBento.tsx, spec
// work/replicas/ALIGN-AFFECT-BENTO-NOTES.md): white tiles (1px rgba(10,10,10,.055), r14, padding 6 6 18), a 220px #fafafa
// preview well (r8, inner 1px ring), 15/22/500 title and 13/20 #737373 text, trays (3px grey well around a white r9
// card, 24px label rows), the configurator scaled 0.88 on a 12px dot grid, the light/dark split integration grid.
// Same primitives and recipes as the replica; all content is Cadence sample data; marks are neutral glyphs.
import type { CSSProperties, ReactNode } from 'react'
import {
  RiCalendarFill, RiMailFill, RiVideoChatFill, RiSlackFill, RiNotionFill, RiGoogleFill, RiMicrosoftFill, RiGithubFill,
  RiFigmaFill, RiZoomInFill, RiTimeFill, RiGlobalFill, RiTeamFill, RiNotification3Fill, RiMapPin2Fill, RiLinksFill,
} from '@remixicon/react'

// affectUI light tokens (:root on the live page); muted/subtle darkened a step to clear AA (theirs: #737373, .4)
const T = { text: '#0a0a0a', muted: '#6b6b6b', subtle: 'rgba(0,0,0,0.58)', border: '#e5e5e5', cardStroke: 'rgba(10,10,10,0.055)', preview: '#fafafa', mutedBg: 'rgba(0,0,0,0.04)', hoverBg: 'rgba(0,0,0,0.05)', proFrom: '#dd0674', proTo: '#5e3ee0', green: '#1f8a4c' }
const sans = '"Inter Variable", ui-sans-serif, system-ui, sans-serif'
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const A = (s: CSSProperties): CSSProperties => ({ position: 'absolute', ...s })

// tray = 3px grey well around a white card; the head is a 24px label row
const Tray = ({ head, meta, icon, children, style }: { head: string; meta?: ReactNode; icon?: ReactNode; children: ReactNode; style?: CSSProperties }) => (
  <div style={{ background: T.mutedBg, borderRadius: 12, padding: 3, ...style }}>
    <span className="flex items-center" style={{ height: 24, padding: '0 8px 1px', gap: 6, fontSize: 10.5, fontWeight: 500, color: T.text }}>
      {icon}{head}<span style={{ marginLeft: 'auto', fontWeight: 400, color: T.subtle }}>{meta}</span>
    </span>
    {children}
  </div>
)
const TrayCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ border: `1px solid ${T.border}`, background: '#fff', borderRadius: 9, ...style }}>{children}</div>
)

// own cursor glyph: a rounded arrow, ink fill with a white keyline
const Cursor = () => (
  <svg width="21" height="25" viewBox="0 0 21 25" style={{ position: 'absolute', left: -2.5, top: -0.3, overflow: 'visible', filter: 'drop-shadow(rgba(0,0,0,0.18) 0px 2px 4px)' }} aria-hidden>
    <path d="M3.2 1.6c-.9-.5-1.9.3-1.7 1.3l3.4 17c.2 1 1.5 1.3 2.1.5l3.5-4.6c.3-.4.7-.6 1.2-.6l5.9-.3c1-.1 1.5-1.3.7-2L3.2 1.6Z" fill="#141b34" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" paintOrder="stroke" />
  </svg>
)

function Ask() {
  const slot = (d: string, t: string, best?: boolean) => (
    <span className="flex items-center" style={{ height: 24, borderRadius: 6, padding: '0 6px', gap: 7, fontSize: 10.5, color: best ? T.text : T.muted, background: best ? T.hoverBg : undefined }}>
      <i style={{ background: best ? 'rgba(94,62,224,0.12)' : T.mutedBg, color: best ? T.proTo : T.subtle, borderRadius: 4, padding: '0 4px', fontSize: 8, fontStyle: 'normal', fontWeight: 600, lineHeight: '13px' }}>{d}</i>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{t}</span>
      {best && <em style={{ marginLeft: 'auto', borderRadius: 999, background: 'rgba(31,138,76,0.1)', color: T.green, padding: '0 6px', fontSize: 9, fontStyle: 'normal', fontWeight: 500, lineHeight: '15px' }}>All free</em>}
    </span>
  )
  return (
    <div className="flex flex-col" style={{ width: 250, gap: 8 }}>
      <Tray head="Cadence" meta={<span style={{ fontFamily: mono, fontSize: 9 }}>⌘K</span>} icon={<span className="grid" style={{ gridTemplateColumns: '5px 5px', gap: 1.5 }}>{[0, 1, 2, 3].map((i) => <i key={i} style={{ width: 5, height: 5, borderRadius: i === 3 ? 3 : 1.5, background: i === 3 ? T.proTo : T.text }} />)}</span>}>
        <TrayCard style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10.5, lineHeight: '15px' }}>
          <span style={{ color: T.text, borderRight: `1.5px solid ${T.text}`, width: 'fit-content', paddingRight: 1, whiteSpace: 'nowrap' }}>45 min with Maya and Theo, next week</span>
          <span style={{ color: T.green, fontSize: 10 }}>✓ Checked 6 calendars</span>
        </TrayCard>
      </Tray>
      <Tray head="Best slots" meta="3 found" icon={<span className="flex" style={{ color: T.muted, width: 12, height: 12 }}><RiTimeFill size={12} /></span>}>
        <TrayCard style={{ padding: 4, display: 'flex', flexDirection: 'column' }}>
          {slot('WED', '14:30 – 15:15', true)}
          {slot('THU', '09:15 – 10:00')}
          {slot('TUE', '10:00 – 10:45')}
        </TrayCard>
      </Tray>
    </div>
  )
}

function Tune() {
  const tray = (s: CSSProperties): CSSProperties => ({ position: 'absolute', display: 'flex', flexDirection: 'column', background: `linear-gradient(${T.mutedBg}, ${T.mutedBg}), #fff`, ...s })
  const row: CSSProperties = { height: 26, padding: '0 8px', display: 'flex', alignItems: 'center' }
  return (
    <div style={A({ inset: 0, backgroundImage: `radial-gradient(${T.border} 1px, transparent 1.2px)`, backgroundPosition: '6px 6px', backgroundSize: '12px 12px', color: T.muted, fontSize: 10 })}>
      <div style={A({ width: 290, height: 180, top: '50%', left: '50%', translate: '-50% -50%', scale: '0.88' })}>
        <Tray head="Invite" meta={<span className="inline-flex items-center" style={{ gap: 4 }}><i style={{ width: 5, height: 5, borderRadius: '50%', background: T.green }} />Ready</span>} style={tray({ width: 124, height: 180, top: 0, left: 0 })}>
          <TrayCard style={{ flex: '1 1 0%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10, boxShadow: 'rgba(0,0,0,0.25) 0px 12px 24px -10px, rgba(0,0,0,0.05) 0px 2px 4px' }}>
            <span style={{ width: 32, borderRadius: 7, overflow: 'hidden', boxShadow: `0 0 0 1px ${T.border}`, marginBottom: 6, textAlign: 'center' }}>
              <b style={{ display: 'block', background: T.proTo, color: '#fff', fontSize: 6.5, fontWeight: 600, letterSpacing: '0.06em', lineHeight: '10px' }}>WED</b>
              <b style={{ display: 'block', color: T.text, fontSize: 12, fontWeight: 600, lineHeight: '17px' }}>22</b>
            </span>
            <b style={{ color: T.text, fontSize: 10.5, fontWeight: 500, lineHeight: '13px' }}>Design review</b>
            <small style={{ color: T.subtle, fontSize: 9, lineHeight: '11px', fontVariantNumeric: 'tabular-nums' }}>14:30 – 15:15</small>
            <span className="flex" style={{ margin: '7px 0 9px' }}>{[['M', '#5b6ee8'], ['T', '#1f7a52'], ['Y', '#9a5a33']].map(([l, c], i) => <i key={l} className="grid place-items-center" style={{ width: 15, height: 15, marginLeft: i ? -2.5 : 0, borderRadius: 99, background: c, color: '#fff', fontSize: 7, fontStyle: 'normal', fontWeight: 600, boxShadow: '0 0 0 1.5px #fff' }}>{l}</i>)}</span>
            <span style={{ alignSelf: 'stretch', textAlign: 'center', borderRadius: 16, background: T.proTo, color: '#fff', padding: '3px 0', fontSize: 9.5, fontWeight: 500 }}>Send invite</span>
          </TrayCard>
        </Tray>
        <Tray head="Working hours" meta={<span style={{ fontVariantNumeric: 'tabular-nums' }}>9 – 18</span>} style={tray({ width: 158, left: 132, top: 0 })}>
          <TrayCard style={{ ...row, padding: '0 12px' }}>
            <span style={{ position: 'relative', flex: '1 1 0%', height: 3, borderRadius: 2, background: T.mutedBg }}>
              <span style={A({ top: 0, bottom: 0, left: '22%', width: '56%', borderRadius: 2, background: T.text })} />
              {['22%', '78%'].map((l) => <i key={l} style={A({ top: '50%', left: l, width: 10, height: 10, margin: '-5px 0 0 -5px', borderRadius: '50%', background: '#fff', boxShadow: `0 0 0 1.25px ${T.text}` })} />)}
            </span>
          </TrayCard>
        </Tray>
        <Tray head="Buffer" meta="Between calls" style={tray({ width: 158, left: 132, top: 62 })}>
          <TrayCard style={{ ...row, gap: 4, padding: '0 4px' }}>
            {['5m', '10m', '15m', '30m'].map((m) => <span key={m} style={{ flex: 1, textAlign: 'center', borderRadius: 5, lineHeight: '18px', fontSize: 9.5, background: m === '10m' ? T.hoverBg : undefined, color: m === '10m' ? T.text : T.muted, boxShadow: m === '10m' ? `inset 0 0 0 1px ${T.border}` : undefined }}>{m}</span>)}
          </TrayCard>
        </Tray>
        <Tray head="Focus" meta="Mornings" style={tray({ width: 158, left: 132, top: 124 })}>
          <TrayCard style={{ ...row, justifyContent: 'space-between', fontSize: 9.5, color: T.muted }}>Protect deep work
            <span style={{ position: 'relative', width: 24, height: 14, borderRadius: 999, background: T.green }}>
              <i style={A({ width: 10, height: 10, top: 2, left: 2, translate: '10px', borderRadius: '50%', background: '#fff', boxShadow: 'rgba(0,0,0,0.2) 0px 1px 2px' })} />
            </span>
          </TrayCard>
        </Tray>
        <span style={A({ zIndex: 2, top: 0, left: 0, translate: '252px 50px' })}><Cursor /></span>
      </div>
    </div>
  )
}

const TILES: [number, number, number, number, string | null, ReactNode][] = [
  [280, 120, 0.428, 0.642, null, <RiCalendarFill />], [440, 120, 0.506, 0.774, '#4285F4', <RiGoogleFill />], [600, 120, 0.545, 0.84, '#0078D4', <RiMicrosoftFill />],
  [760, 120, 0.506, 0.774, '#2D8CFF', <RiZoomInFill />], [920, 120, 0.428, 0.642, '#EA4335', <RiMailFill />],
  [120, 280, 0.355, 0.52, '#00A86B', <RiVideoChatFill />], [280, 280, 0.45, 0.68, '#4A154B', <RiSlackFill />], [440, 280, 0.545, 0.84, null, <RiNotionFill />],
  [760, 280, 0.545, 0.84, '#F24E1E', <RiFigmaFill />], [920, 280, 0.45, 0.68, null, <RiGithubFill />], [1080, 280, 0.355, 0.52, '#5E3EE0', <RiLinksFill />],
  [280, 440, 0.428, 0.642, null, <RiGlobalFill />], [440, 440, 0.506, 0.774, '#5E3EE0', <RiTeamFill />], [600, 440, 0.545, 0.84, '#F59E0B', <RiNotification3Fill />],
  [760, 440, 0.506, 0.774, '#EF4444', <RiMapPin2Fill />], [920, 440, 0.428, 0.642, '#14B8A6', <RiTimeFill />],
]
function Grid({ dark }: { dark?: boolean }) {
  const W = 292.66, u = W / 1200
  const ink = dark ? '#ededed' : '#0a0a0a'
  return (
    <div style={{ position: 'relative', width: W, height: W * 560 / 1200 }}>
      {TILES.map(([x, y, a, k, c, icon], i) => {
        const s = 140, ringA = (dark ? 0.1 : 0.15) * (0.7 + 0.3 * k), shA = 0.06 * (0.65 + 0.35 * k) * (dark ? 4 : 1)
        const fill = dark && c === '#4A154B' ? ink : c ?? ink
        return (
          <span key={i} className="grid place-items-center" style={A({ left: (x - s / 2) * u, top: (y - s / 2) * u, width: s * u, height: s * u, borderRadius: 22 * u,
            background: dark ? `rgb(35 35 38 / ${a})` : `rgb(255 255 255 / ${a})`,
            boxShadow: `inset 0 0 0 ${u}px rgb(${dark ? '255 255 255' : '0 0 0'} / ${ringA}), 0 ${12 * u}px ${14 * u}px ${-10 * u}px rgb(0 0 0 / ${shA})` })}>
            <span className="af-logo flex" style={{ color: fill, width: 52 * u, height: 52 * u }}>{icon}</span>
          </span>
        )
      })}
      <span className="grid place-items-center" style={A({ zIndex: 1, left: (600 - 84) * u, top: (280 - 84) * u, width: 168 * u, height: 168 * u, borderRadius: 28 * u,
        background: dark ? '#2a2a2d' : '#fff', color: ink,
        boxShadow: `inset 0 0 0 ${u}px ${dark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)'}, 0 ${16 * u}px ${18 * u}px ${-12 * u}px ${dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.14)'}` })}>
        {/* Cadence mark: four rounded tiles, the last a violet circle */}
        <svg width={62 * u} height={62 * u} viewBox="0 0 22 22" aria-hidden><g fill={ink}><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /></g><rect x="12" y="12" width="9" height="9" rx="4.5" fill={T.proTo} /></svg>
      </span>
    </div>
  )
}

function Theme() {
  const edge = 88.7
  const layer = (dark: boolean): CSSProperties => A({ inset: 0, display: 'grid', placeItems: 'center', padding: '0 10px', isolation: 'isolate', background: dark ? '#121213' : '#fafafa' })
  return (
    <div style={A({ inset: 0, overflow: 'hidden' })}>
      <div style={layer(false)}><Grid /></div>
      <div style={{ ...layer(true), zIndex: 1, clipPath: `inset(0 0 0 ${edge}px)` }}><Grid dark /></div>
      <span style={A({ zIndex: 2, top: 0, bottom: 0, left: 0, width: 1, translate: `${edge}px`, background: 'rgba(143,143,143,0.4)' })} />
      <span style={A({ zIndex: 2, top: 10, right: 10, width: 30, height: 17, borderRadius: 999, background: 'rgba(143,143,143,0.35)' })}>
        <i style={A({ top: 2, left: 2, width: 13, height: 13, translate: '11.6px', borderRadius: '50%', background: '#fff', boxShadow: 'rgba(0,0,0,0.2) 0px 1px 2px' })} />
      </span>
    </div>
  )
}

function Tile({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <article className="flex flex-col" style={{ border: `1px solid ${T.cardStroke}`, borderRadius: 14, background: '#fff', padding: '6px 6px 18px' }}>
      <div data-product className="grid place-items-center" style={{ position: 'relative', overflow: 'hidden', height: 220, marginBottom: 16, borderRadius: 8, background: T.preview, boxShadow: `inset 0 0 0 1px ${T.cardStroke}` }}>{children}</div>
      <h3 style={{ margin: 0, padding: '0 12px 4px', fontSize: 15, lineHeight: '22px', fontWeight: 500, letterSpacing: -0.2, color: T.text }}>{title}</h3>
      <p style={{ margin: 0, padding: '0 12px', fontSize: 13, lineHeight: '20px', color: T.muted }}>{text}</p>
    </article>
  )
}

export default function CadenceAffect() {
  return (
    <section className="af-root" data-subject style={{ width: 1008, height: 608, padding: '0 0 112px', background: '#fff', color: T.text, fontFamily: sans, fontVariationSettings: '"opsz" 14', fontSize: 13, lineHeight: '18.571px', WebkitFontSmoothing: 'antialiased' }}>
      <style>{`.af-root, .af-root * { corner-shape: round; } .af-logo svg { width: 100%; height: 100%; }`}</style>
      <div className="flex flex-col items-center" style={{ gap: 16 }}>
        <h2 style={{ margin: 0, textAlign: 'center', fontSize: 28, lineHeight: '34px', fontWeight: 500, letterSpacing: -0.7, color: T.text, textWrap: 'initial' }}>Scheduling that stays<br />out of the way</h2>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14, paddingTop: 32 }}>
        <Tile title="Ask in plain words" text="Type who and how long. Cadence checks every calendar and ranks the slots."><Ask /></Tile>
        <Tile title="Yours to tune" text="Working hours, buffers and focus blocks. Set them once, every invite follows."><Tune /></Tile>
        <Tile title="Every calendar, one place" text="Google, Outlook and the tools around them, in light and dark, kept in sync."><Theme /></Tile>
      </div>
      <div className="flex justify-center" style={{ paddingTop: 32 }}>
        <a href="#" className="inline-flex items-center justify-center" style={{ height: 36, padding: '0 15px', gap: 6, borderRadius: 999, background: T.mutedBg, color: T.text, fontSize: 13, fontWeight: 500, lineHeight: '18.571px', textDecoration: 'none' }}>See how it works</a>
      </div>
    </section>
  )
}
