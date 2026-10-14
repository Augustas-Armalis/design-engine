// Fast land test for the dot maps: draw the land once into an offscreen canvas with the same projection, then a dot is
// "land" when its pixel is filled. Replaces per-dot geoContains (tens of thousands of polygon tests that blocked the
// main thread for seconds and froze the load-in).
import { geoPath, type GeoProjection } from 'd3-geo'
import { feature } from 'topojson-client'
import land110 from 'world-atlas/land-110m.json'

const land = feature(land110 as never, (land110 as never as { objects: { land: never } }).objects.land) as never
export function landMask(proj: GeoProjection, w: number, h: number) {
  const c = document.createElement('canvas'); c.width = Math.ceil(w); c.height = Math.ceil(h)
  const ctx = c.getContext('2d')!
  ctx.beginPath(); geoPath(proj, ctx)(land); ctx.fillStyle = '#fff'; ctx.fill()
  const data = ctx.getImageData(0, 0, c.width, c.height).data
  return (x: number, y: number) => { const i = (Math.floor(y) * c.width + Math.floor(x)) * 4 + 3; return x >= 0 && y >= 0 && x < c.width && y < c.height && data[i] > 127 }
}
