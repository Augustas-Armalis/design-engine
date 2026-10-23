// Lintel's signature visual: the repo as a dithered pixel map (founder 2026-10-23 on the plain product window: "try maybe
// something different with bg and right visual"). Every file is a cluster of cells, imports run between them as stepped pixel
// lines, and the review's story is lit: the changed file (white) -> three files -> api/webhooks.ts (amber, the break the diff
// hides). Cells: 10px pitch, 6px squares, ordered (Bayer 4x4) dithering on a soft brightness field, so density reads as light.
// Deterministic (seeded noise), drawn as SVG rects so it stays crisp at 2x/3x. Page coordinates; the parent masks it.
import { useMemo } from 'react'

export type Node = { id: string; x: number; y: number; w: number; h: number; tone: 'base' | 'changed' | 'issue' | 'path'; label?: string; sub?: string; place?: 'above' | 'below' }
const P = 10, S = 6
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)
const bayer = (i: number, j: number) => BAYER[(((j % 4) + 4) % 4) * 4 + (((i % 4) + 4) % 4)]
const hash = (i: number, j: number) => { let h = (i * 374761393 + j * 668265263) ^ 0x5bd1e995; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296 }
// smooth value noise on a coarse lattice, for the faint base field
const vnoise = (x: number, y: number) => {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, s = (t: number) => t * t * (3 - 2 * t)
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1)
  return a + (b - a) * s(xf) + (c - a) * s(yf) + (a - b - c + d) * s(xf) * s(yf)
}

export const NODES: Node[] = [
  { id: 'retry', x: 860, y: 236, w: 10, h: 7, tone: 'changed', label: 'payments/retry.ts', sub: 'changed · +42 −8', place: 'above' },
  { id: 'queue', x: 1130, y: 170, w: 7, h: 5, tone: 'path', label: 'payments/queue.ts', place: 'above' },
  { id: 'events', x: 1310, y: 330, w: 6, h: 6, tone: 'path', label: 'core/events.ts', place: 'below' },
  { id: 'hooks', x: 1290, y: 540, w: 10, h: 7, tone: 'issue', label: 'api/webhooks.ts:118', sub: 'not in this PR', place: 'below' },
  { id: 'stripe', x: 760, y: 430, w: 6, h: 5, tone: 'base' },
  { id: 'ledger', x: 1010, y: 400, w: 7, h: 6, tone: 'base' },
  { id: 'session', x: 1380, y: 150, w: 5, h: 4, tone: 'base' },
  { id: 'ui', x: 720, y: 140, w: 6, h: 4, tone: 'base' },
  { id: 'cart', x: 1040, y: 640, w: 6, h: 5, tone: 'base' },
]
// imports: [from, to, lit]; lit edges are the path the review followed
const EDGES: [string, string, boolean][] = [['retry', 'queue', true], ['queue', 'events', true], ['events', 'hooks', true], ['retry', 'stripe', false], ['retry', 'ledger', false],
  ['ledger', 'cart', false], ['queue', 'session', false], ['ui', 'retry', false], ['ledger', 'hooks', false], ['stripe', 'cart', false]]

type Cell = { x: number; y: number; k: 'dot' | 'node' | 'changed' | 'issue' | 'edge' | 'lit'; a: number }

export default function LintelField({ x0, y0, x1, y1 }: { x0: number; y0: number; x1: number; y1: number }) {
  const cells = useMemo(() => {
    const grid = new Map<string, Cell>()
    const put = (i: number, j: number, c: Omit<Cell, 'x' | 'y'>) => { if (i * P - S / 2 < x0 || i * P + S / 2 > x1 || j * P - S / 2 < y0 || j * P + S / 2 > y1) return; const key = `${i},${j}`; const o = grid.get(key); if (!o || o.a < c.a) grid.set(key, { x: i * P, y: j * P, ...c }) }
    const I0 = Math.ceil(x0 / P), I1 = Math.floor(x1 / P), J0 = Math.ceil(y0 / P), J1 = Math.floor(y1 / P)
    // 1. the base field: a faint, slowly varying density, dithered
    for (let i = I0; i <= I1; i++) for (let j = J0; j <= J1; j++) {
      const v = 0.05 + 0.16 * vnoise(i / 9, j / 9)
      if (v > bayer(i, j)) put(i, j, { k: 'dot', a: 0.13 })
    }
    // 2. edges: stepped pixel paths (across to the midpoint, down, across), the lit ones solid, the rest every other cell
    const at = (id: string) => NODES.find((n) => n.id === id)!
    for (const [f, t, lit] of EDGES) {
      const a = at(f), b = at(t)
      const ai = Math.round(a.x / P), aj = Math.round(a.y / P), bi = Math.round(b.x / P), bj = Math.round(b.y / P), mid = Math.round((ai + bi) / 2)
      const pts: [number, number][] = []
      const run = (i0: number, j0: number, i1: number, j1: number) => { const n = Math.max(Math.abs(i1 - i0), Math.abs(j1 - j0)); for (let s = 0; s <= n; s++) pts.push([i0 + Math.sign(i1 - i0) * Math.min(s, Math.abs(i1 - i0)), j0 + Math.sign(j1 - j0) * Math.min(s, Math.abs(j1 - j0))]) }
      run(ai, aj, mid, aj); run(mid, aj, mid, bj); run(mid, bj, bi, bj)
      pts.forEach(([i, j], k) => { if (lit) put(i, j, { k: 'lit', a: 0.6 }); else if (k % 2 === 0) put(i, j, { k: 'edge', a: 0.2 }) })
    }
    // 3. files: a rounded block of cells with a dithered rim, brightest in the middle
    for (const n of NODES) {
      const ci = Math.round(n.x / P), cj = Math.round(n.y / P), hw = n.w / 2, hh = n.h / 2
      for (let i = ci - Math.ceil(hw) - 3; i <= ci + Math.ceil(hw) + 3; i++) for (let j = cj - Math.ceil(hh) - 3; j <= cj + Math.ceil(hh) + 3; j++) {
        const dx = Math.max(0, Math.abs(i - ci) - hw + 1), dy = Math.max(0, Math.abs(j - cj) - hh + 1), d = Math.hypot(dx, dy)
        const v = d <= 0 ? 1 : Math.max(0, 1 - d / 2.6)
        if (v <= 0 || v < bayer(i, j)) continue
        const core = d <= 0
        if (n.tone === 'changed') put(i, j, { k: 'changed', a: core ? 0.92 : 0.5 })
        else if (n.tone === 'issue') put(i, j, { k: 'issue', a: core ? 1 : 0.6 })
        else put(i, j, { k: 'node', a: n.tone === 'path' ? (core ? 0.46 : 0.28) : core ? 0.28 : 0.17 })
      }
    }
    return [...grid.values()]
  }, [x0, y0, x1, y1])
  const fill = (k: Cell['k']) => (k === 'issue' || k === 'lit' ? '#F5B03E' : '#FFFFFF')
  return (
    <svg aria-hidden width={1440} height={900} viewBox="0 0 1440 900" style={{ position: 'absolute', left: 0, top: 0, display: 'block' }}>
      {cells.map((c, k) => <rect key={k} x={c.x - S / 2} y={c.y - S / 2} width={S} height={S} rx={1.2} fill={fill(c.k)} fillOpacity={c.a} />)}
    </svg>
  )
}

// the labels sit above or below their file on a small page-coloured backing, so a path never runs through the text
export function FieldLabels({ mono, mute, amber, ink, page }: { mono: string; mute: string; amber: string; ink: string; page: string }) {
  return (
    <>
      {NODES.filter((n) => n.label).map((n) => {
        const lines = n.sub ? 2 : 1, h = lines * 16 + 8
        const top = n.place === 'above' ? n.y - (n.h / 2) * P - 12 - h : n.y + (n.h / 2) * P + 12
        return (
          <div key={n.id} style={{ position: 'absolute', left: n.x, top, transform: 'translateX(-50%)', padding: '4px 8px', borderRadius: n.sub ? 10 : 8, background: page, boxShadow: `0 0 0 1px ${n.tone === 'issue' ? 'rgba(245,176,62,0.22)' : 'rgba(255,255,255,0.07)'}`, textAlign: 'center', fontFamily: mono, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
            <div style={{ fontSize: 12, lineHeight: '16px', color: n.tone === 'issue' ? amber : n.tone === 'changed' ? ink : mute }}>{n.label}</div>
            {n.sub && <div style={{ fontSize: 11, lineHeight: '16px', color: n.tone === 'issue' ? 'rgba(247,196,108,0.75)' : mute }}>{n.sub}</div>}
          </div>
        )
      })}
    </>
  )
}
