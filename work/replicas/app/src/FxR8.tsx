// FxR8 (study only, never published): a modal whose header is a grainy painted gradient with glass app tiles.
// Reference crop: work/replicas/fx/refs/fxr8-ref.png (510x250 CSS at 2x, downsampled from a 4096px export of a 1440
// frame, scale 2.844; frame origin = page (466,146)). Copy, glyphs and app marks are neutral placeholders.
// Measured construction (CSS px in the 510x250 frame):
//  - backdrop #b8b8b8 (the dimmed app); the modal x 19.2..488.6 from y 18.2, r 24, 0.5px dark ring, white body
//  - header y 18..87: a 2D gradient = a saturated top row blended into a pastel bottom row (mask 0 at y 25 -> 1 at
//    y 84). Top row: lavender #c8b5f2 (to x 125) > violet #ae81ec (200) > magenta #f56dcf (215) > pink #fa57a5 (245) >
//    coral #f77385 (260) > orange #faaf6f (275) > apricot #fabd7f (305-335) > peach #faac8f (350) > pink #fa5599 (395)
//    > orchid #ee8bdb (440) > lavender #c6b0f1 (470). Bottom row: all of it pulled to #f0a2f2..#fcc9ed
//  - grain: MONOCHROME (channel correlation 0.95-1.0), std 9/255 (~3.5%), ~1 device px, added after the gradient;
//    the header melts into the white body over 3px (y 85-88)
//  - glass tiles 40x40 r10 at x 190 / 278, y 32.7: white 16% fill + 1px white 38% ring + a blurred copy of the field
//    behind; white glyphs; three 6px ring dots between them (white 22% fill, white 55% ring) at a 11.7 pitch
import { useEffect, useRef } from 'react'
import '@fontsource-variable/source-serif-4/wght.css'
import type { CSSProperties } from 'react'

const W = 510, H = 250
const M = { x: 19.2, y: 18.2, w: 469.4, r: 24, hb: 87 }
const TOP: [number, string][] = [[0, '#c8b5f2'], [125, '#bfaff1'], [170, '#b69bf1'], [200, '#ae81ec'], [215, '#f56dcf'], [245, '#fa57a5'], [260, '#f77385'], [275, '#faaf6f'], [305, '#fabe7b'], [335, '#fbb986'], [350, '#faac8f'], [380, '#f78397'], [395, '#fa5599'], [425, '#f86bbe'], [440, '#ee8bdb'], [455, '#d4a9ef'], [470, '#c6b0f1'], [490, '#c4b2f1']]
const BOT: [number, string][] = [[0, '#c4b4ee'], [50, '#c7b4f1'], [80, '#ccb4f1'], [110, '#e2b3f4'], [140, '#eca9f3'], [170, '#f1a2f2'], [200, '#faa1e0'], [230, '#f99ada'], [260, '#fa9de0'], [290, '#fcc2e8'], [320, '#fcc9ed'], [350, '#fbbde1'], [380, '#fba9dc'], [410, '#f485e4'], [440, '#e28fee'], [470, '#c9a4f0'], [490, '#c6a8f0']]

function Header() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const d = 2, cv = ref.current!, w = M.w, h = M.hb - M.y + 2
    cv.width = Math.round(w * d); cv.height = Math.round(h * d)
    const g = cv.getContext('2d')!; g.scale(d, d)
    const row = (stops: [number, string][]) => { const lg = g.createLinearGradient(-M.x, 0, W - M.x, 0); for (const [x, c] of stops) lg.addColorStop(x / W, c); return lg }
    g.fillStyle = row(TOP); g.fillRect(0, 0, w, h)
    // the pastel bottom row, faded in vertically (mask 0 at y 25 -> 1 at y 84, frame coords)
    const off = new OffscreenCanvas(cv.width, cv.height); const o = off.getContext('2d')!; o.scale(d, d)
    o.fillStyle = row(BOT); o.fillRect(0, 0, w, h)
    o.globalCompositeOperation = 'destination-in'
    const vm = o.createLinearGradient(0, 25 - M.y, 0, 84 - M.y); vm.addColorStop(0, 'rgba(0,0,0,0)'); vm.addColorStop(1, 'rgba(0,0,0,1)')
    o.fillStyle = vm; o.fillRect(0, 0, w, h)
    g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(off, 0, 0)
    // monochrome grain, std ~9-10/255, one device pixel
    const img = g.getImageData(0, 0, cv.width, cv.height), D = img.data
    let s = 12345; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
    const gauss = () => { let a = 0; for (let k = 0; k < 4; k++) a += rnd(); return (a - 2) * 1.732 }
    for (let i = 0; i < D.length; i += 4) {
      const n = gauss() * 8   // independent per device px (a row-lagged noise reads as horizontal streaks)
      D[i] = Math.min(255, D[i] + n); D[i + 1] = Math.min(255, D[i + 1] + n); D[i + 2] = Math.min(255, D[i + 2] + n)
    }
    g.putImageData(img, 0, 0)
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', left: 0, top: 0, width: M.w, height: M.hb - M.y + 2 }} />
}

const tile = (x: number): CSSProperties => ({ position: 'absolute', left: x - M.x, top: 32.7 - M.y, width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.16)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.38), 0 1px 2px rgba(120,40,120,0.06)', backdropFilter: 'blur(6px) saturate(1.1)', WebkitBackdropFilter: 'blur(6px) saturate(1.1)', display: 'grid', placeItems: 'center' })

export default function FxR8() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#b8b8b8', fontFamily: '"Inter Variable", sans-serif', cornerShape: 'round' } as CSSProperties}>
      <div style={{ position: 'absolute', left: M.x, top: M.y, width: M.w, height: 400, borderRadius: M.r, background: '#fff', overflow: 'hidden', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.16), 0 10px 30px rgba(0,0,0,0.06)' }}>
        <Header />
        {/* 3px melt into the white body */}
        <div style={{ position: 'absolute', left: 0, top: 85 - M.y, width: M.w, height: 4, background: 'linear-gradient(rgba(255,255,255,0), #fff)' }} />
        <div style={tile(190.3)}>
          <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="none" stroke="#fff" strokeWidth="3" /><circle cx="10" cy="10" r="2.4" fill="#fff" /></svg>
        </div>
        {[242, 253.7, 265.4].map((x) => <div key={x} style={{ position: 'absolute', left: x - 3 - M.x, top: 52.5 - 3 - M.y, width: 6, height: 6, borderRadius: 9, background: 'rgba(255,255,255,0.22)', boxShadow: 'inset 0 0 0 0.75px rgba(255,255,255,0.55)' }} />)}
        <div style={tile(278.3)}>
          <svg width="24" height="24" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#fff" strokeWidth="1.8" /><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" style={{ position: 'absolute', left: 461.5 - 6 - M.x, top: 45.5 - 6 - M.y }}><path d="M2 2l8 8M10 2l-8 8" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /></svg>
        <div style={{ position: 'absolute', left: 0, width: M.w, top: 116 - M.y, textAlign: 'center', fontFamily: '"Source Serif 4 Variable", serif', fontSize: 19.5, lineHeight: '24px', color: '#262626', letterSpacing: '-0.01em' }}>Connect the browser</div>
        <div style={{ position: 'absolute', left: 0, width: M.w, top: 146 - M.y, textAlign: 'center', fontSize: 13, lineHeight: '18px', color: '#5c5c5c' }}>Built for your workspace</div>
        <div style={{ position: 'absolute', left: 47.5 - M.x, top: 186 - M.y, width: 412, height: 200, borderRadius: 14, boxShadow: 'inset 0 0 0 1px #ececec' }}>
          <div style={{ position: 'absolute', left: 16, top: 16, fontSize: 10.5, fontWeight: 500, color: '#262626' }}>Source</div>
          <div style={{ position: 'absolute', left: 16, top: 35, fontSize: 10.5, color: '#5c5c5c' }}>by Sample Co</div>
          <div style={{ position: 'absolute', right: 15, top: 16, height: 16, padding: '0 6px', borderRadius: 5, boxShadow: 'inset 0 0 0 1px #e6e6e6', fontSize: 9.5, lineHeight: '16px', color: '#404040' }}>Category</div>
        </div>
      </div>
    </div>
  )
}
