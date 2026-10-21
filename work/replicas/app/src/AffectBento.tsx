// Replica: affectUI home "One file per piece, code you own" 3-up bento (www.affectui.com, captured 2026-10-21 at 1440 wide
// @2x with every CSS animation paused at one frame: install loop 4.2s/6s, tweak loop 5.0s/10s, theme loop 1.8s/6s ->
// knowledge/benchmarks/bento/affectui-live-bento@2x.png, 2016x1218 = 1008x609 CSS). Geometry and recipes from the live
// computed styles; own code. Brand marks (integration logos, the centre mark, the memoji) are neutral placeholders.
import type { CSSProperties, ReactNode } from 'react'
import {
  RiStackFill, RiFlashlightFill, RiShapesFill, RiCompass3Fill, RiLeafFill, RiDropFill, RiFireFill, RiPlanetFill,
  RiSunFill, RiCloudFill, RiTriangleFill, RiHexagonFill, RiSquareFill, RiStarFill, RiMoonFill, RiHeartFill,
} from '@remixicon/react'

// affectUI light tokens (:root on the live page)
const T = { text: '#0a0a0a', muted: '#737373', subtle: 'rgba(0,0,0,0.4)', border: '#e5e5e5', cardStroke: 'rgba(10,10,10,0.055)', preview: '#fafafa', mutedBg: 'rgba(0,0,0,0.04)', hoverBg: 'rgba(0,0,0,0.05)', proFrom: '#dd0674', proTo: '#5e3ee0', green: '#1f8a4c' }
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

// own folder glyph (not their asset): back flap + translucent front
const Folder = () => (
  <svg width="15" height="13" viewBox="0 0 15 13" aria-hidden>
    <path d="M1.6 0.5h3.6c.5 0 .8.2 1 .5l.5.8c.2.3.4.4.8.4h6c.7 0 1 .4 1 1v8.2c0 .7-.4 1.1-1 1.1H1.6c-.7 0-1.1-.4-1.1-1.1V1.6C.5.9.9.5 1.6.5Z" fill="#5bb7ea" />
    <rect x="3" y="2.6" width="9" height="7" rx="0.8" fill="#fff" opacity="0.9" />
    <path d="M1.6 3.4h11.8c.7 0 1.1.4 1.1 1.1v6.9c0 .7-.4 1.1-1.1 1.1H1.6c-.7 0-1.1-.4-1.1-1.1V4.5c0-.7.4-1.1 1.1-1.1Z" fill="rgba(110,195,238,0.72)" />
    <path d="M1.6 3.4h11.8c.7 0 1.1.4 1.1 1.1v.4H.5v-.4c0-.7.4-1.1 1.1-1.1Z" fill="rgba(255,255,255,0.35)" />
  </svg>
)

function Install() {
  const ext = (n: boolean): CSSProperties => ({ background: n ? 'rgba(94,62,224,0.12)' : T.mutedBg, color: n ? T.proTo : T.subtle, borderRadius: 4, padding: '0 4px', fontSize: 8, fontStyle: 'normal', fontWeight: 600, lineHeight: '13px' })
  return (
    <div className="flex flex-col" style={{ width: 250, gap: 8 }}>
      <Tray head="Terminal" meta="zsh" icon={<span style={{ color: T.muted, fontFamily: mono, fontSize: 9, fontWeight: 600 }}>&gt;_</span>}>
        <TrayCard style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4, fontFamily: mono, fontSize: 10, lineHeight: '15px' }}>
          <span className="flex" style={{ gap: 6, whiteSpace: 'nowrap' }}><b style={{ color: T.subtle, fontWeight: 500 }}>$</b>
            <span style={{ color: T.text, borderRight: `1.5px solid ${T.text}`, width: '30ch', overflow: 'hidden' }}>npx shadcn add thinking-loader</span></span>
          <span style={{ color: T.green }}>✓ Created 1 file</span>
        </TrayCard>
      </Tray>
      <Tray head="components/ui" meta="2 files" icon={<span className="flex" style={{ width: 15, height: 13 }}><Folder /></span>}>
        <TrayCard style={{ padding: 4, display: 'flex', flexDirection: 'column' }}>
          <span className="flex items-center" style={{ height: 24, borderRadius: 6, padding: '0 6px', gap: 7, fontSize: 10.5, color: T.muted }}><i style={ext(false)}>TSX</i>button.tsx</span>
          <span className="flex items-center" style={{ height: 24, borderRadius: 6, padding: '0 6px', gap: 7, fontSize: 10.5, color: T.text, background: T.hoverBg }}><i style={ext(true)}>TSX</i>thinking-loader.tsx
            <em style={{ marginLeft: 'auto', borderRadius: 999, background: 'rgba(221,6,116,0.1)', color: T.proFrom, padding: '0 6px', fontSize: 9, fontStyle: 'normal', fontWeight: 500, lineHeight: '15px' }}>New</em></span>
        </TrayCard>
      </Tray>
    </div>
  )
}

// own cursor glyph: a rounded arrow, ink fill with a white keyline
const Cursor = () => (
  <svg width="21" height="25" viewBox="0 0 21 25" style={{ position: 'absolute', left: -2.5, top: -0.3, overflow: 'visible', filter: 'drop-shadow(rgba(0,0,0,0.18) 0px 2px 4px)' }} aria-hidden>
    <path d="M3.2 1.6c-.9-.5-1.9.3-1.7 1.3l3.4 17c.2 1 1.5 1.3 2.1.5l3.5-4.6c.3-.4.7-.6 1.2-.6l5.9-.3c1-.1 1.5-1.3.7-2L3.2 1.6Z" fill="#141b34" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" paintOrder="stroke" />
  </svg>
)

function Tweak() {
  const tray = (s: CSSProperties): CSSProperties => ({ position: 'absolute', display: 'flex', flexDirection: 'column', background: `linear-gradient(${T.mutedBg}, ${T.mutedBg}), #fff`, ...s })
  const row: CSSProperties = { height: 26, padding: '0 8px', display: 'flex', alignItems: 'center' }
  const swatch = ['#2f6bff', '#5e3ee0', '#dd0674', '#14b8a6', '#f97316']
  return (
    <div style={A({ inset: 0, backgroundImage: `radial-gradient(${T.border} 1px, transparent 1.2px)`, backgroundPosition: '6px 6px', backgroundSize: '12px 12px', color: T.muted, fontSize: 10 })}>
      <div style={A({ width: 290, height: 180, top: '50%', left: '50%', translate: '-50% -50%', scale: '0.88' })}>
        <Tray head="Preview" meta={<span className="inline-flex items-center" style={{ gap: 4 }}><i style={{ width: 5, height: 5, borderRadius: '50%', background: T.green }} />Live</span>} style={tray({ width: 124, height: 180, top: 0, left: 0 })}>
          <TrayCard style={{ flex: '1 1 0%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10, boxShadow: 'rgba(0,0,0,0.25) 0px 12px 24px -10px, rgba(0,0,0,0.05) 0px 2px 4px' }}>
            <span className="grid place-items-center" style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(221,6,116,0.1)', marginBottom: 6, overflow: 'hidden', fontSize: 10, fontWeight: 600, color: T.proFrom }}>JW</span>
            <b style={{ color: T.text, fontSize: 10.5, fontWeight: 500, lineHeight: '13px' }}>Jonas Weber</b>
            <small style={{ color: T.subtle, fontSize: 9, lineHeight: '11px' }}>Design lead</small>
            <span className="flex" style={{ gap: 8, margin: '7px 0 9px', fontSize: 8.5, color: T.subtle }}><span><b style={{ color: T.text, fontWeight: 600 }}>128</b> posts</span><span><b style={{ color: T.text, fontWeight: 600 }}>2.4k</b> fans</span></span>
            <span style={{ alignSelf: 'stretch', textAlign: 'center', borderRadius: 16, background: T.proTo, color: '#fff', padding: '3px 0', fontSize: 9.5, fontWeight: 500 }}>Follow</span>
          </TrayCard>
        </Tray>
        <Tray head="Accent" meta={<span style={{ fontFamily: mono, fontSize: 8.5 }}>#5E3EE0</span>} style={tray({ width: 158, left: 132, top: 0 })}>
          <TrayCard style={{ ...row, gap: 9, position: 'relative' }}>
            {swatch.map((c) => <i key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, flex: '0 0 auto' }} />)}
            <b style={A({ width: 17, height: 17, borderRadius: '50%', top: '50%', left: 5.5, marginTop: -8.5, translate: '20px', boxShadow: `0 0 0 1.25px ${T.text}` })} />
          </TrayCard>
        </Tray>
        <Tray head="Radius" meta={<span style={{ fontVariantNumeric: 'tabular-nums' }}>16px</span>} style={tray({ width: 158, left: 132, top: 62 })}>
          <TrayCard style={{ ...row, padding: '0 12px' }}>
            <span style={{ position: 'relative', flex: '1 1 0%', height: 3, borderRadius: 2, background: T.mutedBg }}>
              <span style={A({ inset: '0 auto 0 0', width: '80%', borderRadius: 2, background: T.text })} />
              <i style={A({ top: '50%', left: '80%', width: 10, height: 10, margin: '-5px 0 0 -5px', borderRadius: '50%', background: '#fff', boxShadow: `0 0 0 1.25px ${T.text}` })} />
            </span>
          </TrayCard>
        </Tray>
        <Tray head="Shadow" meta="Elevation" style={tray({ width: 158, left: 132, top: 124 })}>
          <TrayCard style={{ ...row, justifyContent: 'space-between', fontSize: 9.5, color: T.muted }}>Soft lift
            <span style={{ position: 'relative', width: 24, height: 14, borderRadius: 999, background: T.green }}>
              <i style={A({ width: 10, height: 10, top: 2, left: 2, translate: '10px', borderRadius: '50%', background: '#fff', boxShadow: 'rgba(0,0,0,0.2) 0px 1px 2px' })} />
            </span>
          </TrayCard>
        </Tray>
        <span style={A({ zIndex: 2, top: 0, left: 0, translate: '251.18px 112.4px' })}><Cursor /></span>
      </div>
    </div>
  )
}

// integration grid: 1200 x 560 design units on a 140-unit pitch, sized by container width (u = width / 1200)
const TILES: [number, number, number, number, string | null, ReactNode][] = [
  [280, 120, 0.428, 0.642, null, <RiStackFill />], [440, 120, 0.506, 0.774, '#635BFF', <RiFlashlightFill />], [600, 120, 0.545, 0.84, '#F24E1E', <RiShapesFill />],
  [760, 120, 0.506, 0.774, '#5E6AD2', <RiCompass3Fill />], [920, 120, 0.428, 0.642, '#FF7A59', <RiLeafFill />],
  [120, 280, 0.355, 0.52, '#0061FF', <RiDropFill />], [280, 280, 0.45, 0.68, '#0052CC', <RiFireFill />], [440, 280, 0.545, 0.84, '#7AB55C', <RiPlanetFill />],
  [760, 280, 0.545, 0.84, '#FF4F00', <RiSunFill />], [920, 280, 0.45, 0.68, '#18BFFF', <RiCloudFill />], [1080, 280, 0.355, 0.52, '#4A154B', <RiTriangleFill />],
  [280, 440, 0.428, 0.642, null, <RiHexagonFill />], [440, 440, 0.506, 0.774, '#4285F4', <RiSquareFill />], [600, 440, 0.545, 0.84, '#EA4335', <RiStarFill />],
  [760, 440, 0.506, 0.774, '#F06A6A', <RiMoonFill />], [920, 440, 0.428, 0.642, '#0052CC', <RiHeartFill />],
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
        {/* neutral placeholder mark: four soft petals */}
        <svg width={68 * u} height={68 * u} viewBox="0 0 48 48" aria-hidden><g fill={ink}>{[0, 90, 180, 270].map((r) => <ellipse key={r} cx="24" cy="13" rx="5.5" ry="10" transform={`rotate(${r} 24 24)`} />)}</g><circle cx="24" cy="24" r="3.4" fill={dark ? '#2a2a2d' : '#fff'} /></svg>
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
      <div className="grid place-items-center" style={{ position: 'relative', overflow: 'hidden', height: 220, marginBottom: 16, borderRadius: 8, background: T.preview, boxShadow: `inset 0 0 0 1px ${T.cardStroke}` }}>{children}</div>
      <h3 style={{ margin: 0, padding: '0 12px 4px', fontSize: 15, lineHeight: '22px', fontWeight: 500, letterSpacing: -0.2, color: T.text }}>{title}</h3>
      <p style={{ margin: 0, padding: '0 12px', fontSize: 13, lineHeight: '20px', color: T.muted }}>{text}</p>
    </article>
  )
}

export default function AffectBento() {
  return (
    <section className="af-root" style={{ width: 1008, height: 608, padding: '0 0 112px', background: '#fff', color: T.text, fontFamily: sans, fontVariationSettings: '"opsz" 14', fontSize: 13, lineHeight: '18.571px', WebkitFontSmoothing: 'antialiased' }}>
      <style>{`.af-root, .af-root * { corner-shape: round; } .af-logo svg { width: 100%; height: 100%; }`}</style>
      <div className="flex flex-col items-center" style={{ gap: 16 }}>
        <h2 style={{ margin: 0, textAlign: 'center', fontSize: 28, lineHeight: '34px', fontWeight: 500, letterSpacing: -0.7, color: T.text, textWrap: 'initial' }}>One file per piece,<br />code you own</h2>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14, paddingTop: 32 }}>
        <Tile title="One command, one file" text="Install with the shadcn CLI or copy it. It lands as one TSX file, styles included."><Install /></Tile>
        <Tile title="Yours to change" text="Plain React and CSS variables. Change a radius or a color, keep the rest."><Tweak /></Tile>
        <Tile title="Light and dark, built in" text="Every piece follows your theme, and motion respects reduced-motion settings."><Theme /></Tile>
      </div>
      <div className="flex justify-center" style={{ paddingTop: 32 }}>
        <a className="inline-flex items-center justify-center" style={{ height: 36, padding: '0 15px', gap: 6, borderRadius: 999, background: T.mutedBg, color: T.text, fontSize: 13, fontWeight: 500, lineHeight: '18.571px', textDecoration: 'none' }}>Learn more</a>
      </div>
    </section>
  )
}
