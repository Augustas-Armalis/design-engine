// One orthographic projection shared by the WebGL globe and the SVG arc layer, so arcs land on the right city.
export const VIEW = { lon0: 10, lat0: 0 } // view centre in degrees
export type City = { id: string; name: string; lat: number; lon: number }
export const HQ: City = { id: 'ber', name: 'Berlin', lat: 52.52, lon: 13.4 }
export const CITIES: City[] = [
  { id: 'nyc', name: 'New York', lat: 40.71, lon: -74.0 },
  { id: 'los', name: 'Lagos', lat: 6.52, lon: 3.38 },
  { id: 'cai', name: 'Cairo', lat: 30.04, lon: 31.24 },
  { id: 'nbo', name: 'Nairobi', lat: -1.29, lon: 36.82 },
]
const rad = (d: number) => (d * Math.PI) / 180
export function project(lat: number, lon: number) {
  const la = rad(lat), dl = rad(lon - VIEW.lon0), l0 = rad(VIEW.lat0)
  const x = Math.cos(la) * Math.sin(dl)
  const y = Math.cos(l0) * Math.sin(la) - Math.sin(l0) * Math.cos(la) * Math.cos(dl)
  const z = Math.sin(l0) * Math.sin(la) + Math.cos(l0) * Math.cos(la) * Math.cos(dl)
  return { x, y, z }
}
