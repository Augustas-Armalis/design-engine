// FxR3 (study only, never published): a product window lit by a coloured rim. Reference crop:
// work/replicas/fx/refs/fxr3-ref.png (1140x255 CSS at 2x). The window content is neutral grey bars; the study is the bezel.
// Measured construction (CSS px in the 1140x255 frame):
//  - the rim is the BEZEL'S OWN FILL, not a glow: an 8.5px solid band (outer r18, inner r11) on a #121212 page;
//    pixels 1px outside the bezel are exactly #121212, there is no bloom, no shadow, no inner highlight
//  - its colour is a radial ramp from the top-left corner (32,21), squashed 0.92 vertically:
//    d 28 #1963d0, 108 #1a54ac, 148 #174792, 228 #173d78, 308 #173460, 388 #162845, 468 #17243b, 588 #171f2e, 668+ #171c25
//    (a single cobalt hue sinking into a cool steel, never into black: the far rim stays visibly a rim)
//  - a second, weaker light from below the right corner lifts the right side toward #3978aa (off-crop at the bottom)
//  - interior #121212; the main panel #0a0a0a with a 1px #1c1c1c ring, r14
import type { CSSProperties } from 'react'

const W = 1140, H = 255
const F = { x: 32, y: 21, w: 1077.5, h: 700, r: 18, b: 8.5 }

const bezel = [
  'radial-gradient(ellipse 700px 610px at 32px 21px, #1a66d6 0px, #1963d0 28px, #1d62cb 68px, #1a54ac 108px, #174792 148px, #174184 188px, #173d78 228px, #17396c 268px, #173460 308px, #172e52 348px, #162845 388px, #172740 428px, #17243b 468px, #172132 548px, #171f2e 588px, #171d29 628px, rgba(23,28,37,0) 700px)',
  'radial-gradient(ellipse 560px 760px at 1110px 780px, rgba(62,128,180,0.9) 0px, rgba(40,90,140,0.6) 300px, rgba(28,50,85,0.35) 480px, rgba(23,28,37,0) 620px)',
  '#171c25',
].join(', ')

const bar = (x: number, y: number, w: number, h = 9, c = '#262626', r = 3): CSSProperties => ({ position: 'absolute', left: x, top: y, width: w, height: h, background: c, borderRadius: r })

export default function FxR3() {
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: '#121212', cornerShape: 'round' } as CSSProperties}>
      <div style={{ position: 'absolute', left: F.x, top: F.y, width: F.w, height: F.h, borderRadius: F.r, background: bezel }} />
      <div style={{ position: 'absolute', left: F.x + F.b, top: F.y + F.b, width: F.w - 2 * F.b, height: F.h, borderRadius: F.r - 7, background: '#121212' }} />
      {/* neutral window content */}
      <div style={{ position: 'absolute', left: 222, top: 35, width: 830, height: 400, borderRadius: 14, background: '#0a0a0a', boxShadow: '0 0 0 1px #1c1c1c' }} />
      <div style={{ ...bar(222, 77, 830, 1, '#1c1c1c', 0) }} />
      <div style={{ ...bar(222, 155, 830, 1, '#1c1c1c', 0) }} />
      <div style={bar(52, 42, 24, 12, '#d8d8d8')} />
      {[80, 107, 133, 160, 187, 214].map((y, i) => <div key={y} style={bar(59, y, i === 1 ? 160 : 70, 9, i === 1 ? '#2a2a2a' : '#262626')} />)}
      <div style={bar(52, 99, 160, 23, '#1a1a1a', 8)} />
      <div style={bar(244, 51, 34, 9, '#cfcfcf')} />
      <div style={bar(355, 99, 46, 14, '#d6d6d6')} />
      <div style={bar(355, 125, 350, 9, '#5a5a5a')} />
      <div style={bar(355, 170, 230, 10, '#4a4a4a')} />
      <div style={bar(355, 191, 12, 1.5, '#3b82f6', 0)} />
      <div style={bar(355, 208, 240, 23, '#0e0e0e', 8)} />
      <div style={bar(617, 41, 135, 20, '#101010', 7)} />
    </div>
  )
}
