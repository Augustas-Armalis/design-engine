// Cadence glass: own dark hero (work/cadence-glass/DIRECTION.md). A night canvas, one purple eclipse rising over the
// horizon (the only light source), and a liquid-glass command surface that refracts it: backdrop displacement from an
// edge-shaped map (feImage) + a little blur and saturation, a specular rim, and a dark contact drop. Copy quiet and
// centred above (Kargul structure), Linear's near-white 500 h1 and alpha text ladder. Sample product data.
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

const W = 1440, H = 900
const INK = '#f5f3fa', SUB = 'rgb(236 232 248 / 0.68)', SOFT = 'rgb(236 232 248 / 0.58)'

// Liquid-glass displacement map, computed per pixel from the slab's rounded-rect SDF: inside a rim band of width
// `edge` the backdrop is pulled along the inward normal with a convex (lens) profile, flat in the middle. R = x shift,
// G = y shift, 128 = none. Rendered once to a canvas -> data URL for feImage.
function lensMap(w: number, h: number, r: number, edge: number) {
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const g = c.getContext('2d')!, img = g.createImageData(w, h)
  const sd = (x: number, y: number) => { const qx = Math.abs(x - w / 2) - (w / 2 - r), qy = Math.abs(y - h / 2) - (h / 2 - r); return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const d = -sd(x + 0.5, y + 0.5), o = (y * w + x) * 4
    let dx = 0, dy = 0
    if (d > 0 && d < edge) {
      const nx = sd(x + 1.5, y + 0.5) - sd(x - 0.5, y + 0.5), ny = sd(x + 0.5, y + 1.5) - sd(x + 0.5, y - 0.5), nl = Math.hypot(nx, ny) || 1
      const t = 1 - d / edge, m = 1 - Math.sqrt(1 - t * t) // convex lens: steep at the very rim
      dx = (-nx / nl) * m; dy = (-ny / nl) * m
    }
    img.data[o] = 128 + dx * 127; img.data[o + 1] = 128 + dy * 127; img.data[o + 2] = 128; img.data[o + 3] = 255
  }
  g.putImageData(img, 0, 0); return c.toDataURL()
}

function GlassDefs({ id, w, h, r, scale = 52, edge = 30 }: { id: string; w: number; h: number; r: number; scale?: number; edge?: number }) {
  const [map, setMap] = useState('')
  useEffect(() => setMap(lensMap(w, h, r, edge)), [w, h, r, edge])
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        {map && <feImage href={map} x="0" y="0" width={w} height={h} result="map" preserveAspectRatio="none" />}
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="src" />
        {/* chromatic fringe: R, G, B bent by slightly different amounts, recombined additively */}
        {[[scale, 'r', '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'], [scale * 0.94, 'g', '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0'], [scale * 0.88, 'b', '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0']].map(([sc, k, m]) => (
          <g key={k as string}><feDisplacementMap in="src" in2="map" scale={sc as number} xChannelSelector="R" yChannelSelector="G" result={`d${k}`} /><feColorMatrix in={`d${k}`} type="matrix" values={m as string} result={`c${k}`} /></g>
        ))}
        <feComposite in="cr" in2="cg" operator="arithmetic" k2="1" k3="1" result="rg" />
        <feComposite in="rg" in2="cb" operator="arithmetic" k2="1" k3="1" result="rgb" />
        <feColorMatrix in="rgb" type="saturate" values="1.35" />
      </filter>
    </svg>
  )
}

/** liquid glass slab: refracted backdrop, faint fill, specular rim (bright top-left, dim bottom), dark drop */
function Glass({ id, w, h, r, style, children, tint = 0.035 }: { id: string; w: number; h: number; r: number; style?: CSSProperties; children?: ReactNode; tint?: number }) {
  return (
    <div style={{ position: 'absolute', width: w, height: h, borderRadius: r, ...style }}>
      <GlassDefs id={id} w={w} h={h} r={r} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: r, backdropFilter: `url(#${id}) brightness(0.92)`, background: `linear-gradient(180deg, rgb(255 255 255 / ${tint}), rgb(255 255 255 / ${tint / 3})), rgb(12 9 22 / 0.42)`, boxShadow: '0 30px 70px -24px rgb(0 0 0 / 0.75), 0 2px 6px rgb(0 0 0 / 0.35)' }} />
      {/* specular rim: 1px ring that is bright where light from the eclipse below-centre and the sky above-left hits */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: r, padding: 1, background: 'linear-gradient(160deg, rgb(255 255 255 / 0.55), rgb(255 255 255 / 0.08) 38%, rgb(255 255 255 / 0.04) 62%, rgb(214 180 255 / 0.45))', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: r, boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.22), inset 0 -10px 24px -18px rgb(196 150 255 / 0.45), inset 0 12px 28px -20px rgb(255 255 255 / 0.25)' }} />
      <div style={{ position: 'relative', height: '100%' }}>{children}</div>
    </div>
  )
}

const Mark = ({ s = 22, lit = false }: { s?: number; lit?: boolean }) => (
  <svg width={s} height={s} viewBox="0 0 22 22" aria-hidden>
    <defs><linearGradient id={`mk${lit}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor={lit ? '#cdb4ff' : '#d9d4e6'} /></linearGradient></defs>
    <g fill={`url(#mk${lit})`}><rect x="1" y="1" width="9" height="9" rx="2.6" /><rect x="12" y="1" width="9" height="9" rx="2.6" /><rect x="1" y="12" width="9" height="9" rx="2.6" /><rect x="12" y="12" width="9" height="9" rx="4.5" fill={lit ? '#b38bff' : undefined} /></g>
  </svg>
)

const SLOTS: [string, string, string, boolean][] = [['Tue 21', '10:00 – 10:45', 'Maya is in a 1:1 until 9:50', false], ['Wed 22', '14:30 – 15:15', 'Everyone free, focus kept', true], ['Thu 23', '09:15 – 10:00', 'Theo travels after 11:00', false]]

export default function CadenceGlass() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#060509', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11", "ss01"', color: INK }}>
      {/* sky: faint stars + a grid that only lives near the horizon */}
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} aria-hidden>
        <defs>
          <radialGradient id="halo" cx="0.5" cy="1" r="0.75"><stop offset="0" stopColor="#8b5cf6" stopOpacity="0.55" /><stop offset="0.35" stopColor="#6d28d9" stopOpacity="0.28" /><stop offset="0.7" stopColor="#3b0764" stopOpacity="0.08" /><stop offset="1" stopColor="#060509" stopOpacity="0" /></radialGradient>
          <linearGradient id="rim" x1="0" x2="1"><stop offset="0.18" stopColor="#c4b5fd" stopOpacity="0" /><stop offset="0.5" stopColor="#f5f0ff" stopOpacity="1" /><stop offset="0.82" stopColor="#c4b5fd" stopOpacity="0" /></linearGradient>
          <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#c084fc" stopOpacity="0.55" /><stop offset="0.6" stopColor="#7c3aed" stopOpacity="0.12" /><stop offset="1" stopColor="#7c3aed" stopOpacity="0" /></linearGradient>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="rgb(196 181 253 / 0.07)" /></pattern>
          <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.35" stopColor="#fff" stopOpacity="0" /><stop offset="0.8" stopColor="#fff" stopOpacity="1" /></linearGradient>
          <mask id="gridM"><rect width={W} height={H} fill="url(#gridFade)" /></mask>
          <filter id="bloom" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22" /></filter>
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" /></filter>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" mask="url(#gridM)" />
        {Array.from({ length: 70 }, (_, i) => { const x = (i * 211.7) % W, y = (i * 97.3) % 560; return <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 0.9 : 0.55} fill="#fff" opacity={0.12 + ((i * 37) % 30) / 100} /> })}
        {/* the eclipse: halo, a beam rising behind the glass, the dark body, a hot rim at the crest */}
        <ellipse cx={720} cy={960} rx={1000} ry={540} fill="url(#halo)" />
        <rect x={540} y={300} width={360} height={560} fill="url(#beam)" filter="url(#bloom)" opacity="0.8" />
        {[-150, -96, -40, 18, 70, 128].map((dx, i) => <rect key={i} x={720 + dx} y={360 + (i % 3) * 30} width={i % 2 ? 1 : 1.6} height={500} fill="url(#beam)" opacity={0.28 + (i % 3) * 0.1} />)}
        <circle cx={720} cy={1720} r={980} fill="#8b5cf6" opacity="0.7" filter="url(#bloom)" />
        <circle cx={720} cy={1720} r={980} fill="#050408" />
        <circle cx={720} cy={1720} r={980} fill="none" stroke="url(#rim)" strokeWidth="1.6" />
        <circle cx={720} cy={1720} r={981} fill="none" stroke="url(#rim)" strokeWidth="8" opacity="0.5" filter="url(#bloom)" />
        <rect width={W} height={H} filter="url(#grain)" />
      </svg>

      {/* nav */}
      <header style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 72, display: 'flex', alignItems: 'center', padding: '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em' }}><Mark s={20} />Cadence</div>
        <nav style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 30, fontSize: 14, color: SUB }}>
          {['Product', 'Teams', 'Pricing', 'Changelog'].map((l) => <span key={l}>{l}</span>)}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 18, alignItems: 'center', fontSize: 14 }}>
          <span style={{ color: SUB }}>Sign in</span>
          <span style={{ height: 34, padding: '0 14px', display: 'flex', alignItems: 'center', borderRadius: 10, background: 'rgb(255 255 255 / 0.08)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.12), inset 0 1px 0 rgb(255 255 255 / 0.1)', fontWeight: 500 }}>Get Cadence</span>
        </div>
      </header>

      <main>
      {/* copy */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 68, lineHeight: 1.0, fontWeight: 550, letterSpacing: '-0.045em', fontVariationSettings: '"opsz" 32' }}>Your Week, Arranged<br />Before It Starts</h1>
        <p style={{ margin: '22px auto 0', maxWidth: 620, fontSize: 17, lineHeight: '27px', color: SUB, letterSpacing: '-0.005em' }}>Cadence finds the time, guards your focus and settles conflicts,<br />so every meeting lands where it should.</p>
        <div style={{ marginTop: 34, display: 'flex', justifyContent: 'center', gap: 12 }}>
          <a href="#" style={{ textDecoration: 'none', height: 44, padding: '0 20px', display: 'flex', alignItems: 'center', borderRadius: 22, background: 'linear-gradient(180deg, #ffffff, #e9e6f1)', color: '#0b0a10', fontSize: 15, fontWeight: 550, boxShadow: '0 0 0 1px rgb(255 255 255 / 0.6), 0 1px 2px rgb(0 0 0 / 0.4), 0 8px 18px -8px rgb(0 0 0 / 0.6)' }}>Start free</a>
          <a href="#" style={{ textDecoration: 'none', color: INK, height: 44, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 22, background: 'rgb(255 255 255 / 0.06)', backdropFilter: 'blur(10px)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.13), inset 0 1px 0 rgb(255 255 255 / 0.16)', fontSize: 15, fontWeight: 500 }}>Book a demo</a>
        </div>
      </div>

      {/* the glass command surface */}
      <Glass id="lg-main" w={840} h={328} r={32} style={{ left: 300, top: 516 }}>
        <div data-product style={{ position: 'absolute', inset: 0, padding: 10 }}>
          <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', borderRadius: 21, background: 'rgb(12 9 22 / 0.46)', boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.07)' }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, display: 'grid', placeItems: 'center', background: 'linear-gradient(180deg, rgb(167 139 250 / 0.35), rgb(124 58 237 / 0.2))', boxShadow: 'inset 0 0 0 1px rgb(196 181 253 / 0.3)' }}><Mark s={15} lit /></span>
            <span style={{ fontSize: 16, letterSpacing: '-0.01em' }}>Find 45 min with <span style={{ color: '#d8c8ff' }}>Maya</span> and <span style={{ color: '#d8c8ff' }}>Theo</span> next week</span>
            <span style={{ width: 1.5, height: 18, background: '#c4b5fd', marginLeft: -6 }} />
            <span style={{ marginLeft: 'auto', fontSize: 12, color: SOFT, fontFamily: '"Geist Mono Variable", monospace', padding: '3px 7px', borderRadius: 6, boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)' }}>⏎</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 8px 10px', fontSize: 12.5, color: SUB }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />Checked 3 calendars, 2 time zones and your focus blocks
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {SLOTS.map(([d, t, why, best]) => (
              <div key={d} style={{ position: 'relative', height: 146, borderRadius: 20, padding: '15px 16px', background: best ? 'linear-gradient(180deg, rgb(139 92 246 / 0.42), rgb(91 33 182 / 0.26))' : 'rgb(12 9 22 / 0.38)', boxShadow: best ? 'inset 0 0 0 1px rgb(216 200 255 / 0.42), inset 0 1px 0 rgb(255 255 255 / 0.25), 0 10px 30px -12px rgb(124 58 237 / 0.7)' : 'inset 0 0 0 1px rgb(255 255 255 / 0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: best ? '#e4d9ff' : SOFT, fontWeight: 500 }}>{d}{best && <span style={{ fontSize: 11, padding: '1px 7px', borderRadius: 99, background: 'rgb(255 255 255 / 0.14)', color: '#fff' }}>Best</span>}</div>
                <div style={{ marginTop: 8, fontSize: 21, fontWeight: 500, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums', color: best ? '#fff' : INK }}>{t}</div>
                <div style={{ marginTop: 4, fontSize: 12.5, lineHeight: '17px', whiteSpace: 'nowrap', color: best ? 'rgb(240 234 255 / 0.78)' : SOFT }}>{why}</div>
                <div style={{ position: 'absolute', right: 16, bottom: 22, width: 92, height: 4, borderRadius: 2, background: 'rgb(255 255 255 / 0.08)' }}><div style={{ position: 'absolute', left: `${({ 'Tue 21': 22, 'Wed 22': 58, 'Thu 23': 14 } as Record<string, number>)[d]}%`, width: '9%', top: -1, height: 6, borderRadius: 3, background: best ? '#e9ddff' : 'rgb(255 255 255 / 0.4)' }} /></div>
                <div style={{ position: 'absolute', left: 15, bottom: 14, display: 'flex' }}>
                  {[['M', 250], ['T', 150], ['Y', 300]].map(([n, hue], i) => <span key={n as string} style={{ width: 22, height: 22, marginLeft: i ? -5 : 0, borderRadius: 11, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 600, background: `oklch(0.42 0.09 ${hue})`, color: '#fff', boxShadow: `0 0 0 1.5px ${best ? '#3a2370' : '#141220'}` }}>{n}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '6px 6px 0 10px', fontSize: 13, color: SUB }}>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><span style={{ fontFamily: '"Geist Mono Variable", monospace', fontSize: 11.5, color: SOFT }}>Wed 22, 14:30</span>· Google Meet link · Reminds 10 min before</span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ height: 32, padding: '0 12px', display: 'flex', alignItems: 'center', borderRadius: 11, color: SUB }}>Other times</span>
              <span style={{ height: 34, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 8, borderRadius: 12, background: 'linear-gradient(180deg, #a78bfa, #7c3aed)', color: '#fff', fontWeight: 550, boxShadow: '0 0 0 1px rgb(91 33 182 / 0.9), inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -2px 6px rgb(46 16 101 / 0.35), 0 4px 12px -4px rgb(124 58 237 / 0.7)' }}>Send invite<span style={{ fontFamily: '"Geist Mono Variable", monospace', fontSize: 11, opacity: 0.75 }}>⌘⏎</span></span>
            </span>
          </div>
        </div>
      </Glass>
      </main>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontSize: 11.5, letterSpacing: '0.08em', color: 'rgb(236 232 248 / 0.56)' }}>SAMPLE DATA</div>
    </div>
  )
}
