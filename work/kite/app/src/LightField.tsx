// The hero's one light source (Basit BA-01..03): a rendered field, not CSS blobs. Silky ribbons of light swept along
// a diagonal curve, blurred in the canvas, then grain added only where there is light (the black stays clean).
// Neutral silver with a faint warm cast; brightest band runs just behind the product's top edge (BA-14).
import { useEffect, useRef } from 'react'

export default function LightField({ w, h, className = '' }: { w: number; h: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2.67), cv = ref.current!
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr)
    const ctx = cv.getContext('2d')!; ctx.scale(dpr, dpr)
    ctx.fillStyle = '#0b0b0c'; ctx.fillRect(0, 0, w, h)
    // ribbons: a fan of strokes along one cubic from lower-left, cresting behind the product top, out to upper-right
    const ribbon = (off: number, width: number, a: number, col: string, blur: number) => {
      ctx.save(); ctx.filter = `blur(${blur}px)`; ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = col.replace('A', String(a)); ctx.lineWidth = width; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(-200, h * 1.02 + off); ctx.bezierCurveTo(w * 0.3, h * 0.66 + off, w * 0.56, h * 0.56 + off, w + 240, h * 0.3 + off); ctx.stroke(); ctx.restore()
    }
    ribbon(40, 260, 0.10, 'rgba(255,236,222,A)', 90)
    ribbon(0, 120, 0.20, 'rgba(255,244,236,A)', 46)
    ribbon(-26, 46, 0.34, 'rgba(255,250,246,A)', 18)
    ribbon(-40, 10, 0.55, 'rgba(255,255,255,A)', 5)
    ribbon(70, 70, 0.09, 'rgba(255,170,140,A)', 40)
    // fall to canvas before the reading zone (top) and toward the bottom corners
    const top = ctx.createLinearGradient(0, 0, 0, h)
    top.addColorStop(0, 'rgba(11,11,12,0.97)'); top.addColorStop(0.4, 'rgba(11,11,12,0.7)'); top.addColorStop(0.58, 'rgba(11,11,12,0)')
    ctx.fillStyle = top; ctx.fillRect(0, 0, w, h)
    // grain in the light only
    const img = ctx.getImageData(0, 0, cv.width, cv.height), d = img.data
    for (let i = 0; i < d.length; i += 4) {
      const l = (d[i] + d[i + 1] + d[i + 2]) / 765
      if (l < 0.06) continue
      const n = (Math.random() - 0.5) * 34 * Math.min(1, l * 2.2)
      d[i] += n; d[i + 1] += n; d[i + 2] += n
    }
    ctx.putImageData(img, 0, 0)
  }, [w, h])
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute left-0 top-0 ${className}`} style={{ width: w, height: h }} />
}
