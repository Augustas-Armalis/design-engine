// Kite sample data (fictional edge network, project "storefront-prod"). Coherent story: deploy #4127 at 13:52 changed
// image caching; sin1 p95 climbs from 38 to 124 ms from 14:05 while every other region stays flat.
export type Region = { code: string; city: string; lat: number; lon: number; rps: number; p95: number; err: number; state: 'ok' | 'hot' }
export const regions: Region[] = [
  { code: 'iad1', city: 'Washington, D.C.', lat: 38.9, lon: -77.0, rps: 418_200, p95: 31, err: 0.012, state: 'ok' },
  { code: 'sfo1', city: 'San Francisco', lat: 37.77, lon: -122.42, rps: 264_900, p95: 34, err: 0.018, state: 'ok' },
  { code: 'gru1', city: 'São Paulo', lat: -23.55, lon: -46.63, rps: 88_300, p95: 52, err: 0.021, state: 'ok' },
  { code: 'lhr1', city: 'London', lat: 51.5, lon: -0.12, rps: 231_600, p95: 29, err: 0.009, state: 'ok' },
  { code: 'fra1', city: 'Frankfurt', lat: 50.11, lon: 8.68, rps: 312_400, p95: 28, err: 0.011, state: 'ok' },
  { code: 'bom1', city: 'Mumbai', lat: 19.07, lon: 72.88, rps: 96_700, p95: 47, err: 0.019, state: 'ok' },
  { code: 'sin1', city: 'Singapore', lat: 1.35, lon: 103.82, rps: 157_800, p95: 124, err: 0.36, state: 'hot' },
  { code: 'hkg1', city: 'Hong Kong', lat: 22.32, lon: 114.17, rps: 118_500, p95: 36, err: 0.014, state: 'ok' },
  { code: 'hnd1', city: 'Tokyo', lat: 35.68, lon: 139.69, rps: 201_300, p95: 30, err: 0.010, state: 'ok' },
  { code: 'syd1', city: 'Sydney', lat: -33.87, lon: 151.21, rps: 61_900, p95: 41, err: 0.016, state: 'ok' },
]
export const totalRps = regions.reduce((a, r) => a + r.rps, 0)

// 24h latency (ms), 96 points at 15 min. Deterministic noise.
const rnd = (i: number) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x) }
export const series = Array.from({ length: 96 }, (_, i) => {
  const day = 1 + 0.18 * Math.sin(((i - 30) / 96) * Math.PI * 2) // daily traffic swell
  const incident = i >= 57 && i <= 70 ? Math.exp(-((i - 62) ** 2) / 14) : 0 // 14:15 - 17:30
  const p50 = 17 * day + rnd(i) * 2.2
  const p95 = 33 * day + rnd(i + 99) * 4.5 + incident * 52
  const p99 = 61 * day + rnd(i + 199) * 9 + incident * 96
  return { i, p50, p95, p99 }
})
export const deploys = [
  { i: 22, id: '#4119' }, { i: 41, id: '#4123' }, { i: 55, id: '#4127', bad: true }, { i: 79, id: '#4131' },
]
export const timeLabel = (i: number) => { const m = i * 15; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}` }

export type Deploy = { id: string; msg: string; branch: string; sha: string; who: string; ago: string; dur: string; state: 'ready' | 'building' | 'rolled-back' }
export const deployments: Deploy[] = [
  { id: '#4131', msg: 'Revert image cache key for /p/* in sin1', branch: 'main', sha: 'a91e04c', who: 'MR', ago: '14m', dur: '38s', state: 'building' },
  { id: '#4127', msg: 'Cache product images at the edge for 24h', branch: 'main', sha: '3fd2b7a', who: 'JL', ago: '3h', dur: '41s', state: 'rolled-back' },
  { id: '#4123', msg: 'Move /api/cart to fra1 + iad1 only', branch: 'main', sha: 'c0e1192', who: 'AK', ago: '7h', dur: '36s', state: 'ready' },
  { id: '#4119', msg: 'Bump runtime to node 24 for edge functions', branch: 'main', sha: '77ab3e0', who: 'MR', ago: '12h', dur: '44s', state: 'ready' },
]

// KPI sparklines (24 points)
const spark = (base: number, amp: number, seed: number, spike = 0) => Array.from({ length: 24 }, (_, i) => base + amp * Math.sin(i / 3.2 + seed) + rnd(i + seed * 50) * amp * 0.6 + (spike && i >= 14 && i <= 17 ? spike * Math.exp(-((i - 15.5) ** 2) / 2) : 0))
export const kpis = [
  { k: 'Requests', v: '1.84B', unit: '', delta: '+12.4%', good: true, note: 'last 24h', s: spark(10, 2, 1) },
  { k: 'p95 latency', v: '41', unit: 'ms', delta: '+9 ms', good: false, note: 'all regions', s: spark(34, 3, 2, 22) },
  { k: 'Error rate', v: '0.021', unit: '%', delta: '+0.006', good: false, note: '5xx / requests', s: spark(1, 0.15, 3, 1.4) },
  { k: 'Cache hit ratio', v: '94.2', unit: '%', delta: '−1.1 pt', good: false, note: 'edge cache', s: spark(94, 0.6, 4, -2.5) },
]
export const fmtK = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : `${Math.round(n / 1000)}k`)
