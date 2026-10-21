// Linear homepage fold (dark), pixel replica for study only. Internal, never published.
// Reference: knowledge/benchmarks/dark/linear-fold-1440x900@2x.png (1440x900 CSS @2x) + linear.measure.json.
// Font: Inter Variable (Linear ships "Inter Variable" too). Logo marks are neutral placeholders, not Linear's mark.
// Every coordinate below was measured from the reference pixels (2x px / 2) or taken from the computed styles.
import type { CSSProperties, ReactNode } from 'react'
import {
  ArrowDown, ArrowUp, ArrowRight, Box, ChevronDown, Copy, Ellipsis, GitPullRequest, Inbox, Link, ListFilter,
  Maximize2, Minus, Navigation2, ScanFace, Search, SquarePen, Star, X, Zap,
} from 'lucide-react'

// measured tokens
const C = {
  canvas: '#08090a',
  text1: '#f7f8f8', // h1, logo, bubble text
  text2: '#d0d6e0', // "New", strong UI
  text3: '#8a8f98', // nav links, sub, muted
  text4: '#62666d', // 12px labels only
  ui: '#e2e4e7', // in-product primary text
  hair: 'rgba(255,255,255,0.08)',
  hairStrong: 'rgba(255,255,255,0.12)',
}
const abs = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left, top, ...extra })
const T = (size: number, weight: number, color: string, extra: CSSProperties = {}): CSSProperties => ({
  fontSize: size, fontWeight: weight, color, lineHeight: 1, whiteSpace: 'nowrap', ...extra,
})

// neutral placeholder mark: a disc with three diagonal cuts (not Linear's logo)
function Mark({ size, color = C.text1 }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden>
      <circle cx="10" cy="10" r="10" fill={color} />
      <path d="M3 14 14 3M6 17 17 6" stroke={C.canvas} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// in-progress status (half-filled ring)
function Status({ size = 14, color = '#f2c94c' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden>
      <circle cx="7" cy="7" r="6" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M7 3.5a3.5 3.5 0 0 1 0 7z" fill={color} />
    </svg>
  )
}

// text whose baseline sits at y (CSS px). Inter: ascender .96875, descender .2421875 -> baseline at .727 of a 1.2109em box offset
function At({ x, base, size, children, style }: { x: number; base: number; size: number; children: ReactNode; style?: CSSProperties }) {
  const top = base - size * 0.96875 // line-height:1.2109 box with no half-leading -> baseline = ascent
  return <div style={{ position: 'absolute', left: x, top, fontSize: size, lineHeight: 1.2109, whiteSpace: 'nowrap', ...style }}>{children}</div>
}

// neutral avatar placeholder (head + shoulders), not a person's photo
function Avatar({ x, y }: { x: number; y: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" style={abs(x, y)} aria-hidden>
      <defs><clipPath id="av"><circle cx="8" cy="8" r="8" /></clipPath></defs>
      <g clipPath="url(#av)"><rect width="16" height="16" fill="#d9dbde" /><circle cx="8" cy="6.4" r="3.1" fill="#3a3c40" /><path d="M1.5 16c.6-3.6 3.2-5.4 6.5-5.4s5.9 1.8 6.5 5.4z" fill="#3a3c40" /></g>
    </svg>
  )
}
// label (tag) icon, horizontal, as in Linear's activity feed
function LabelIcon({ x, y }: { x: number; y: number }) {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" style={abs(x, y)} aria-hidden>
      <path d="M4 .9h6.4a1.8 1.8 0 0 1 1.8 1.8v4.6a1.8 1.8 0 0 1-1.8 1.8H4L1.1 5.7a1.1 1.1 0 0 1 0-1.4z" fill="none" stroke="#8a8f98" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

const ic = (color: string, size = 16, sw = 1.6) => ({ size, color, strokeWidth: sw, absoluteStrokeWidth: false })

function SideItem({ y, icon, label }: { y: number; icon: ReactNode; label: string }) {
  return (
    <>
      <div style={abs(83, y - 13.5, { width: 14, height: 14, display: 'grid', placeItems: 'center' })}>{icon}</div>
      <At x={105} base={y} size={13} style={{ fontWeight: 510, color: '#d0d6e0' }}>{label}</At>
    </>
  )
}

function ToolBtn({ x, children, w = 28 }: { x: number; children: ReactNode; w?: number }) {
  return (
    <div style={abs(x, 588, {
      width: w, height: 28, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
      background: 'rgba(255,255,255,0.02)', boxShadow: `inset 0 0 0 1px ${C.hair}`,
    })}>{children}</div>
  )
}

export default function LinearHero() {
  const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E")`
  return (
    <div className="lin" style={{
      position: 'relative', width: 1440, height: 900, overflow: 'hidden', background: C.canvas, color: C.text1,
      fontFamily: '"Inter Variable", "SF Pro Display", -apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility', fontFeatureSettings: '"cv01", "ss03"',
    }}>
      {/* Linear uses plain round corners; opt this study out of the engine-wide squircle default */}
      <style>{`.lin, .lin * { corner-shape: round; }
        .lin-cta { transition: background-color .16s cubic-bezier(.25,.46,.45,.94), border-color .16s cubic-bezier(.25,.46,.45,.94); }
        .lin-cta:hover { background: #fff !important; border-color: #fff !important; }
        .lin-ghost { transition: background-color .16s cubic-bezier(.25,.46,.45,.94), color .16s cubic-bezier(.25,.46,.45,.94); border-radius: 9999px; }
        .lin-ghost:hover { background: rgba(255,255,255,.08); color: #f7f8f8 !important; }`}</style>

      {/* ---- light: the only "glow" is a pale wash under the product frame, edges only (measured 1416x768) ---- */}
      <div aria-hidden style={abs(12, 527, {
        width: 1416, height: 768, opacity: 0.63,
        background: 'radial-gradient(52.53% 57.5% at 50% 100%, rgba(8,9,10,0) 0%, rgba(8,9,10,0.5) 100%), linear-gradient(#08090a 10%, #d0d6e0 100%)',
      })} />

      {/* ---- header 73px: transparent + blur(20px), hairline .08 ---- */}
      <header style={abs(0, 0, {
        width: 1440, height: 73, background: 'rgba(10,10,11,0.6)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${C.hair}`, boxSizing: 'border-box', zIndex: 5,
      })}>
        <div style={abs(79, 25)}><Mark size={22} /></div>
        <At x={110} base={43.5} size={20.6} style={{ fontWeight: 600, letterSpacing: -0.5, color: C.text1 }}>Linear</At>
        {[['Product', 753.5], ['Resources', 826], ['Customers', 914], ['Pricing', 1005], ['Now', 1072], ['Contact', 1123.5]].map(([l, x]) => (
          <At key={l as string} x={(x as number) - 0.5} base={40.5} size={13} style={{ fontWeight: 400, color: C.text3, letterSpacing: 0 }}>{l}</At>
        ))}
        <div style={abs(1199.5, 29, { width: 1, height: 16, background: C.hair })} />
        <a href="#" className="lin-ghost" style={abs(1218.5, 20, { height: 32, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 400, color: C.text3, textDecoration: 'none' })}>Log in</a>
        <a href="#" className="lin-cta" style={abs(1288, 20, {
          height: 32, padding: '0 12px', boxSizing: 'border-box', borderRadius: 9999, background: '#e5e5e6', border: '1px solid #e5e5e6',
          color: C.canvas, fontSize: 13, fontWeight: 510, display: 'flex', alignItems: 'center', textDecoration: 'none',
          boxShadow: 'rgba(0,0,0,0) 0 8px 2px, rgba(0,0,0,.01) 0 5px 2px, rgba(0,0,0,.04) 0 3px 2px, rgba(0,0,0,.07) 0 1px 1px, rgba(0,0,0,.08) 0 0 1px',
        })}>Sign up</a>
      </header>

      {/* ---- headline 64/510/64 -1.408px, sub 15/400/24 -0.165px ---- */}
      <h1 style={abs(78, 272, {
        margin: 0, fontSize: 64, fontWeight: 510, lineHeight: '64px', letterSpacing: -1.408, color: C.text1, whiteSpace: 'nowrap',
      })}>The product development<br />system for teams and agents</h1>
      <p style={abs(80, 432, { margin: 0, fontSize: 15, fontWeight: 400, lineHeight: '24px', letterSpacing: -0.165, color: C.text3, whiteSpace: 'nowrap' })}>
        Purpose-built for planning and building products. Designed for the AI era.
      </p>
      <a href="#" style={abs(1255.5, 433, { display: 'flex', alignItems: 'center', gap: 0, fontSize: 15, lineHeight: '24px', letterSpacing: -0.165, textDecoration: 'none', whiteSpace: 'nowrap' })}>
        <span style={{ color: C.text2, fontWeight: 510 }}>New</span>
        <span style={{ color: C.text3, fontWeight: 400, marginLeft: 12 }}>Loops</span>
        <ArrowRight size={15} color={C.text3} strokeWidth={1.75} style={{ marginLeft: 4 }} />
      </a>

      {/* ---- product frame: #101112-ish, 1px ring + top-left border spotlight + 0 2px 32px .25 drop ---- */}
      <div style={abs(60, 527, {
        width: 1320, height: 560, borderRadius: 12, boxSizing: 'border-box', overflow: 'hidden',
        background: '#111314', border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'rgba(0,0,0,0.2) 0 0 0 1px, rgba(0,0,0,0.25) 0 2px 32px 0',
      })}>
        {/* spotlight: a second bordered layer masked to the top-left corner */}
        <div aria-hidden style={{
          position: 'absolute', inset: -1, borderRadius: 12, border: '1px solid rgba(255,255,255,0.14)', pointerEvents: 'none',
          maskImage: 'radial-gradient(200px 200px at 8% 0%, #000 0%, rgba(0,0,0,.6) 30%, rgba(0,0,0,.2) 50%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(200px 200px at 8% 0%, #000 0%, rgba(0,0,0,.6) 30%, rgba(0,0,0,.2) 50%, transparent 70%)',
        }} />
      </div>

      {/* sidebar (frame coordinates are page coordinates; the frame is a pure surface) */}
      <div style={abs(84, 551.5)}><Mark size={12.5} color="#e2e4e7" /></div>
      <At x={106.5} base={564} size={14} style={{ fontWeight: 510, color: C.ui }}>Linear</At>
      <ChevronDown {...ic('#8a8f98', 17, 1.6)} style={abs(152.2, 549.5)} />
      <Search {...ic('#9ea3ab', 15, 1.7)} style={abs(228, 549.5)} />
      <div style={abs(256, 543, { width: 28, height: 28, borderRadius: 9999, background: 'rgba(255,255,255,0.04)', boxShadow: `inset 0 0 0 1px ${C.hair}`, display: 'grid', placeItems: 'center' })}>
        <SquarePen {...ic('#d0d6e0', 14, 1.7)} />
      </div>

      <SideItem y={607} icon={<Zap {...ic('#a8abb0', 14, 1.6)} />} label="Pulse" />
      <SideItem y={637} icon={<Inbox {...ic('#a8abb0', 14, 1.6)} />} label="Inbox" />
      <SideItem y={666.5} icon={<ScanFace {...ic('#a8abb0', 14, 1.6)} />} label="My issues" />
      <SideItem y={696.5} icon={<GitPullRequest {...ic('#a8abb0', 14, 1.6)} />} label="Reviews" />
      <At x={82} base={737.5} size={12} style={{ fontWeight: 510, color: C.text4 }}>Workspace <span style={{ fontSize: 8, marginLeft: 2 }}>▼</span></At>
      <SideItem y={764.5} icon={<Navigation2 {...ic('#a8abb0', 14, 1.6)} />} label="Initiatives" />
      <SideItem y={794.5} icon={<Box {...ic('#a8abb0', 14, 1.6)} />} label="Projects" />
      <SideItem y={825} icon={<Ellipsis {...ic('#a8abb0', 14, 1.8)} />} label="More" />
      <At x={82.5} base={865.7} size={12} style={{ fontWeight: 510, color: C.text4 }}>Favorites <span style={{ fontSize: 8, marginLeft: 2 }}>▼</span></At>
      <div style={abs(76, 873, { width: 208, height: 32, borderRadius: 6, background: 'rgba(255,255,255,0.03)' })} />
      <div style={abs(83, 879.5)}><Status size={14} color="#e2c800" /></div>
      <At x={105} base={893} size={13} style={{ fontWeight: 510, color: '#d0d6e0' }}>Faster app launch</At>

      {/* ---- main panel: inset 8px in the frame, #18191a, 1px white .08, r9 ---- */}
      <div style={abs(300, 535, {
        width: 1072, height: 520, borderRadius: 9, boxSizing: 'border-box', background: '#151618', border: `1px solid ${C.hair}`,
        boxShadow: 'rgba(0,0,0,0.2) 0 0 12px 0 inset',
      })}>
        <div style={abs(0, 43, { width: '100%', height: 1, background: C.hair })} />
      </div>

      {/* panel header */}
      <div style={abs(322.5, 550.5)}><Status size={14} color="#f6d500" /></div>
      <At x={345} base={562.7} size={12} style={{ fontWeight: 510, color: C.ui, letterSpacing: 0.1, fontVariantNumeric: 'tabular-nums' }}>DRV-8852</At>
      <At x={414.5} base={562.7} size={12} style={{ fontWeight: 510, color: C.ui }}>Faster app launch</At>
      <Star size={13} fill="#f7d800" color="#f7d800" strokeWidth={1} style={abs(533.5, 551)} />
      <Ellipsis {...ic('#80868f', 14, 2)} style={abs(561, 550.5)} />
      <At x={1256.5} base={562.7} size={12} style={{ fontWeight: 400, color: '#a9adb4', fontVariantNumeric: 'tabular-nums' }}>1 / 84</At>
      <ArrowUp {...ic('#bbbec3', 13, 1.7)} style={abs(1307.8, 551)} />
      <ArrowDown {...ic('#bbbec3', 13, 1.7)} style={abs(1337.3, 551)} />

      {/* toolbar: 28px pills, 6px gap */}
      <ToolBtn x={1197}><Link {...ic('#b8bbc1', 13, 1.7)} /></ToolBtn>
      <ToolBtn x={1231}><Copy {...ic('#b8bbc1', 13, 1.7)} /></ToolBtn>
      <ToolBtn x={1265}><GitPullRequest {...ic('#b8bbc1', 13, 1.7)} /></ToolBtn>
      <ToolBtn x={1299} w={60}>
        <ListFilter {...ic('#b8bbc1', 13, 1.7)} style={{ marginRight: 9 }} />
        <span style={{ width: 1, height: 14, background: C.hair, marginRight: 8 }} />
        <ChevronDown {...ic('#b8bbc1', 13, 1.7)} />
      </ToolBtn>

      {/* issue body */}
      <At x={373} base={663} size={20} style={{ fontWeight: 590, color: C.ui, letterSpacing: -0.2 }}>Faster app launch</At>
      <At x={372.5} base={693.2} size={14} style={{ fontWeight: 400, color: '#bdc0c5', letterSpacing: -0.15 }}>Render UI before</At>
      <div style={abs(486, 678, {
        width: 105, height: 23.5, boxSizing: 'border-box', borderRadius: 5, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
      })} />
      <At x={494} base={693.7} size={11.4} style={{ fontFamily: '"Geist Mono Variable", ui-monospace, monospace', fontWeight: 400, color: C.ui }}>vehicle_state</At>
      <At x={595.5} base={694.2} size={14} style={{ fontWeight: 400, color: '#bdc0c5', letterSpacing: -0.15 }}>sync when minimum required state is present,</At>
      <At x={372.5} base={716} size={14} style={{ fontWeight: 400, color: '#bdc0c5', letterSpacing: -0.15 }}>instead of blocking on full refresh during iOS startup.</At>
      <At x={373} base={764.6} size={16} style={{ fontWeight: 590, color: C.ui, letterSpacing: 0 }}>Activity</At>

      <Avatar x={372.5} y={795.5} />
      <div style={abs(379, 814, { width: 1, height: 9, background: 'rgba(255,255,255,0.14)' })} />
      <At x={397} base={808.7} size={12} style={{ fontWeight: 400, color: C.text3 }}>
        <b style={{ fontWeight: 510, color: '#959ba4' }}>Linear</b> created the issue via <b style={{ fontWeight: 510, color: '#959ba4' }}>Slack</b> on behalf of <b style={{ fontWeight: 510, color: '#959ba4' }}>Karri</b> · 2min ago
      </At>
      <LabelIcon x={372.8} y={831} />
      <At x={397} base={840.7} size={12} style={{ fontWeight: 400, color: C.text3 }}>
        <b style={{ fontWeight: 510, color: '#959ba4' }}>Triage Intelligence</b> added the labels <b style={{ fontWeight: 510, color: '#959ba4' }}>Performance</b> and <b style={{ fontWeight: 510, color: '#959ba4' }}>iOS</b> · 2min ago
      </At>

      {/* comment card under the agent panel */}
      <div style={abs(358, 868, { width: 700, height: 80, borderRadius: 12, background: '#19191a', border: `1px solid ${C.hairStrong}`, boxSizing: 'border-box', boxShadow: 'rgba(0,0,0,0.4) 0 0 0 1px' })} />
      <Avatar x={372.5} y={883} />
      <At x={397.5} base={896.8} size={13} style={{ fontWeight: 510, color: C.ui }}>karri <span style={{ color: C.text3, fontWeight: 400, fontSize: 12 }}>· 4 min ago</span></At>

      {/* right rail */}
      <At x={1082.5} base={648.7} size={12} style={{ fontWeight: 400, color: C.text3 }}>Reviews</At>
      <GitPullRequest {...ic('#6d78d5', 14, 1.9)} style={abs(1082.5, 667)} />
      <At x={1103.5} base={678.7} size={12} style={{ fontWeight: 400, color: '#d0d3d7' }}>Revert</At>

      {/* ---- agent panel: raised surface, ring white .14, drop 0 2px 32px .25 ---- */}
      <div style={abs(959, 706, {
        width: 400, height: 260, borderRadius: 12, boxSizing: 'border-box', background: '#18191a', border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: 'rgba(0,0,0,0.25) 0 2px 32px 0, rgba(0,0,0,0.2) 0 0 0 1px',
      })} />
      <div style={abs(981.5, 724.5)}><Mark size={13} color="#e2e4e7" /></div>
      <At x={1002.5} base={736.5} size={13} style={{ fontWeight: 510, color: C.ui }}>Linear</At>
      <div style={abs(1047, 722, { height: 18, padding: '0 5px', borderRadius: 4, boxShadow: `inset 0 0 0 1px ${C.hairStrong}`, display: 'flex', alignItems: 'center', fontSize: 11, color: '#a9adb4', boxSizing: 'border-box' })}>Opus 5</div>
      <Minus {...ic('#bdc0c5', 12, 1.6)} style={abs(1279, 728)} />
      <Maximize2 {...ic('#bdc0c5', 12, 1.6)} style={abs(1304.5, 725)} />
      <X {...ic('#bdc0c5', 17, 1.5)} style={abs(1328.2, 722.3)} />

      <div style={abs(1006, 768.5, { width: 342, height: 60, borderRadius: 8, background: 'rgba(255,255,255,0.05)' })} />
      <At x={1015.5} base={794.4} size={13} style={{ fontWeight: 400, color: C.text1 }}>Fix the dimmed ride rows that never reset and open</At>
      <At x={1015.5} base={814.9} size={13} style={{ fontWeight: 400, color: C.text1 }}>a PR</At>

      <div style={abs(1163, 837.5)}><Status size={15.5} color="#bcbec4" /></div>
      <At x={1185.5} base={849} size={12} style={{ fontWeight: 400, color: '#bcbec4', letterSpacing: 0, fontVariantNumeric: 'tabular-nums' }}>DRV-364</At>
      <At x={1246.5} base={849.5} size={12} style={{ letterSpacing: -0.1, fontWeight: 400, color: '#9096a0' }}>added to context</At>
      <At x={980} base={882.5} size={13} style={{ fontWeight: 400, color: '#909197' }}>
        <span style={{ color: '#e3e5f0' }}>Think</span>ing...
      </At>

      {/* grain over the product frame only (measured sd 1.2-1.7 levels on every frame surface; flat canvas has none) */}
      <div aria-hidden style={abs(60, 527, { width: 1320, height: 373, borderRadius: '12px 12px 0 0', backgroundImage: grain, opacity: 0.22, mixBlendMode: 'overlay', pointerEvents: 'none' })} />
    </div>
  )
}
