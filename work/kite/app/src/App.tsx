// Kite (fictional edge network; sample data). Dark overview for an on-call platform engineer: KPIs, live traffic map,
// regions (problem first, with its fix), latency with deploy markers, recent deployments.
import { useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import { Activity, ArrowUpRight, Bell, ChevronDown, ChevronsUpDown, Globe, LayoutGrid, Logs, Rocket, Search, Shield, SlidersHorizontal, Waypoints } from 'lucide-react'
import Map from './Map'
import Chart from './Chart'
import { deployments, kpis, regions, totalRps, fmtK } from './data'

const I = { size: 15, strokeWidth: 1.75 } as const
const ease = [0.22, 1, 0.36, 1] as const
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

function Card({ className, children, i = 0 }: { className?: string; children: React.ReactNode; i?: number }) {
  return <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease }}
    className={cx('rounded-[14px] bg-[var(--s1)] shadow-[var(--card)]', className)}>{children}</motion.section>
}
function Head({ title, meta, right }: { title: string; meta?: React.ReactNode; right?: React.ReactNode }) {
  return <div className="flex h-12 items-center gap-2.5 px-4"><h2 className="text-[14px] font-[600]">{title}</h2>{meta}<div className="ml-auto flex items-center gap-2">{right}</div></div>
}
function Spark({ s, bad }: { s: number[]; bad?: boolean }) {
  const lo = Math.min(...s), hi = Math.max(...s), w = 76, h = 26
  const d = s.map((v, i) => `${i ? 'L' : 'M'}${((i / (s.length - 1)) * w).toFixed(1)} ${(h - 2 - ((v - lo) / (hi - lo || 1)) * (h - 4)).toFixed(1)}`).join(' ')
  return <svg width={w} height={h} aria-hidden><path d={d} fill="none" stroke={bad ? 'var(--red)' : 'var(--accent)'} strokeOpacity={bad ? 0.9 : 1} strokeWidth="1.5" strokeLinejoin="round" /></svg>
}
function Avatar({ t }: { t: string }) {
  return <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--s3)] text-[10px] font-[650] text-[var(--sub)] shadow-[inset_0_0_0_1px_var(--line)]">{t}</span>
}

function Sidebar() {
  const nav = [['Overview', LayoutGrid, true], ['Deployments', Rocket], ['Analytics', Activity], ['Logs', Logs], ['Edge config', SlidersHorizontal], ['Firewall', Shield], ['Domains', Globe], ['Routing', Waypoints]] as const
  return (
    <aside className="flex w-[232px] shrink-0 flex-col px-3 pb-3 pt-3 shadow-[inset_-1px_0_0_var(--div)]">
      <button className="st flex h-11 items-center gap-2.5 rounded-[10px] px-2 text-left hover:bg-[var(--hover)]">
        <span className="grid size-7 place-items-center rounded-[8px] bg-[linear-gradient(160deg,#c9d0ff,#7c8cff)] text-[12px] font-[750] text-[#0b0e1c] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">S</span>
        <span className="min-w-0 flex-1 leading-[16px]"><span className="block text-[14px] font-[600]">Storefront</span><span className="block text-[12px] text-[var(--soft)]">Pro · sample team</span></span>
        <ChevronsUpDown size={14} className="text-[var(--faint)]" />
      </button>
      <nav aria-label="Main" className="mt-4 flex flex-col gap-0.5">
        {nav.map(([l, Ic, on]) => (
          <a key={l} href="#" aria-current={on ? 'page' : undefined} className={cx('st flex h-8 items-center gap-2.5 rounded-[9px] px-2 text-[14px] font-[500]', on ? 'bg-[var(--select)] text-[var(--ink)]' : 'text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]')}>
            <Ic {...I} className={on ? 'text-[var(--ink)]' : 'text-[var(--soft)]'} />{l}
          </a>
        ))}
      </nav>
      <div className="mt-6 px-2 text-[12px] font-[500] text-[var(--soft)]">Projects</div>
      <div className="mt-1.5 flex flex-col gap-0.5">
        {[['storefront-prod', true, true], ['storefront-staging', false], ['checkout-api', false], ['marketing-site', false]].map(([n, on, hot]) => (
          <a key={n as string} href="#" className={cx('st flex h-8 items-center gap-2.5 rounded-[9px] px-2 text-[14px] font-[500]', on ? 'text-[var(--ink)]' : 'text-[var(--sub)] hover:bg-[var(--hover)]')}>
            <span className={cx('size-1.5 rounded-full', hot ? 'bg-[var(--red)]' : 'bg-[var(--accent)] opacity-70')} /><span className="truncate">{n as string}</span>
          </a>
        ))}
      </div>
      <div className="mt-auto rounded-[12px] bg-[var(--s1)] p-3 shadow-[var(--card)]">
        <div className="flex items-baseline justify-between text-[12px]"><span className="text-[var(--sub)]">Edge requests</span><span className="tnum text-[var(--soft)]">Oct</span></div>
        <div className="tnum mt-1 text-[14px] font-[600]">31.2B <span className="font-[450] text-[var(--soft)]">/ 50B</span></div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-[var(--s3)]"><div className="h-full w-[62%] rounded-full bg-[var(--accent)]" /></div>
      </div>
    </aside>
  )
}

export default function App() {
  const [rerouted, setRerouted] = useState(false)
  const hot = regions.filter((r) => r.state === 'hot' && !rerouted)
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[52px] shrink-0 items-center gap-3 px-6 shadow-[inset_0_-1px_0_var(--div)]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[14px] font-[500]"><span className="text-[var(--soft)]">Storefront</span><span aria-hidden className="text-[var(--soft)]">/</span><span className="text-[var(--soft)]">storefront-prod</span><span aria-hidden className="text-[var(--soft)]">/</span><span aria-current="page">Overview</span></nav>
            <div className="ml-auto flex items-center gap-2">
              <button className="st flex h-8 w-[220px] items-center gap-2 rounded-[9px] px-2.5 text-[13px] text-[var(--soft)] shadow-[var(--control)] hover:bg-[var(--hover)]"><Search size={14} />Search<kbd className="mono ml-auto rounded-[5px] px-1.5 text-[11px] text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--line-2)]">⌘K</kbd></button>
              <button aria-label="Notifications" className="st relative grid size-8 place-items-center rounded-[9px] text-[var(--sub)] hover:bg-[var(--hover)]"><Bell {...I} /><span className="absolute right-[7px] top-[7px] size-1.5 rounded-full bg-[var(--red)]" /></button>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-hidden px-6 pt-5">
            <div className="flex items-center gap-3">
              <h1 className="text-[22px] font-[650] tracking-[-0.02em]">storefront-prod</h1>
              <span className="flex h-6 items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 text-[12px] font-[550] text-[var(--accent)] shadow-[inset_0_0_0_1px_rgb(140_155_255/0.22)]"><span className="size-1.5 rounded-full bg-[var(--accent)]" />Production</span>
              <a href="#" className="mono flex h-6 items-center gap-1 text-[var(--soft)] hover:text-[var(--sub)]">storefront.app<ArrowUpRight size={12} /></a>
              <div className="ml-auto flex items-center gap-2">
                <div role="tablist" aria-label="Range" className="flex h-8 items-center rounded-[10px] bg-[var(--s1)] p-[3px] shadow-[var(--card)]">
                  {['1h', '24h', '7d', '30d'].map((t) => <button key={t} role="tab" aria-selected={t === '24h'} className={cx('st h-[26px] rounded-[7px] px-2.5 text-[13px] font-[550]', t === '24h' ? 'bg-[var(--s3)] text-[var(--ink)] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]' : 'text-[var(--soft)] hover:text-[var(--ink)]')}>{t}</button>)}
                </div>
                <button className="st flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-[550] shadow-[var(--control)] hover:bg-[var(--hover)]">All regions<ChevronDown size={14} className="text-[var(--soft)]" /></button>
                <button className="st flex h-8 items-center rounded-full bg-[var(--ink)] px-4 text-[13px] font-[600] text-[var(--canvas)] hover:bg-white">Deploy</button>
              </div>
            </div>

            <Card i={0} className="mt-4 grid grid-cols-4">
              {kpis.map((k, i) => (
                <div key={k.k} className={cx('flex items-end gap-3 px-5 py-4', i > 0 && 'shadow-[inset_1px_0_0_var(--div)]')}>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-[500] text-[var(--soft)]">{k.k}</div>
                    <div className="tnum mt-1.5 text-[26px] font-[650] leading-[30px] tracking-[-0.03em]">{k.v}<span className="ml-0.5 text-[15px] font-[500] text-[var(--soft)]">{k.unit}</span></div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[12px]"><span className={cx('tnum font-[550]', k.good ? 'text-[var(--accent)]' : 'text-[var(--red)]')}>{k.delta}</span><span className="text-[var(--soft)]">{k.note}</span></div>
                  </div>
                  <Spark s={k.s} bad={!k.good} />
                </div>
              ))}
            </Card>

            <div className="mt-4 grid grid-cols-[744px_1fr] gap-4">
              <Card i={1}>
                <Head title="Traffic by region" meta={<span className="flex items-center gap-1.5 text-[12px] text-[var(--soft)]"><span className="relative grid size-2 place-items-center"><span className="pulse absolute size-2 rounded-full bg-[var(--accent)] opacity-60" style={{ animation: 'pulse-ring 1.8s ease-out infinite' }} /><span className="size-1.5 rounded-full bg-[var(--accent)]" /></span>Live · {fmtK(totalRps)} req/s</span>}
                  right={<span className="flex items-center gap-3 text-[12px] text-[var(--soft)]"><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[var(--accent)]" />Healthy</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[var(--red)]" />Elevated</span></span>} />
                <div className="px-4 pb-3"><Map rerouted={rerouted} /></div>
              </Card>

              <Card i={2} className="flex flex-col">
                <Head title="Regions" meta={<span className="tnum text-[13px] text-[var(--soft)]">10</span>} right={<a href="#" className="st flex h-7 items-center gap-1 rounded-[8px] px-2 text-[12px] font-[550] text-[var(--sub)] hover:bg-[var(--hover)]">All<ArrowUpRight size={12} /></a>} />
                {hot.length > 0 ? (
                  <div className="mx-3 mb-2 rounded-[10px] bg-[var(--red-soft)] p-3 shadow-[inset_0_0_0_1px_rgb(255_122_122/0.18)]">
                    <div className="text-[13px] font-[600]">sin1 p95 is 3.3x its baseline</div>
                    <div className="mt-0.5 text-[12px] leading-[17px] text-[var(--sub)]">Since deploy #4127 at 13:52. hkg1 has 41% headroom at 36 ms.</div>
                    <div className="mt-2.5 flex gap-2">
                      <button onClick={() => setRerouted(true)} className="st h-7 rounded-full bg-[var(--ink)] px-3 text-[12px] font-[600] text-[var(--canvas)] hover:bg-white">Shift 30% to hkg1</button>
                      <button className="st h-7 rounded-full px-3 text-[12px] font-[550] text-[var(--sub)] shadow-[var(--control)] hover:bg-[var(--hover)]">Open trace</button>
                    </div>
                  </div>
                ) : (
                  <div className="mx-3 mb-2 flex items-center justify-between rounded-[10px] bg-[var(--accent-soft)] p-3 text-[13px] font-[550] shadow-[inset_0_0_0_1px_rgb(140_155_255/0.2)]">30% of sin1 now served from hkg1<button onClick={() => setRerouted(false)} className="text-[12px] text-[var(--accent)]">Undo</button></div>
                )}
                <div className="flex-1 px-1.5">
                  {[...regions].sort((a, b) => b.rps - a.rps).slice(0, 6).map((r) => {
                    const bad = r.state === 'hot' && !rerouted
                    return (
                      <div key={r.code} className="st grid h-9 grid-cols-[46px_1fr_92px_52px] items-center gap-2 rounded-[8px] px-2.5 hover:bg-[var(--hover)]">
                        <span className={cx('mono', bad ? 'text-[var(--red)]' : 'text-[var(--sub)]')}>{r.code}</span>
                        <span className="truncate text-[13px]">{r.city}</span>
                        <span className="h-1 overflow-hidden rounded-full bg-[var(--s3)]"><span className={cx('block h-full rounded-full', bad ? 'bg-[var(--red)]' : 'bg-[var(--accent)]')} style={{ width: `${(r.rps / 420000) * 100}%`, opacity: 0.85 }} /></span>
                        <span className={cx('tnum text-right text-[13px] font-[550]', bad && 'text-[var(--red)]')}>{bad ? r.p95 : r.state === 'hot' ? 44 : r.p95}<span className="text-[11px] font-[450] text-[var(--soft)]"> ms</span></span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            <div className="mt-4 grid grid-cols-[744px_1fr] gap-4">
              <Card i={3}>
                <Head title="Latency" meta={<span className="text-[12px] text-[var(--soft)]">all regions · 24h</span>}
                  right={<span className="flex items-center gap-3 text-[12px] text-[var(--soft)]"><span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full bg-[var(--accent)]" />p95</span><span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full bg-[var(--sub)] opacity-70" />p50</span><span className="flex items-center gap-1.5"><span className="h-px w-3 border-t border-dashed border-[var(--sub)] opacity-60" />p99</span></span>} />
                <div className="px-4 pb-3"><Chart /></div>
              </Card>
              <Card i={4}>
                <Head title="Deployments" right={<a href="#" className="st flex h-7 items-center gap-1 rounded-[8px] px-2 text-[12px] font-[550] text-[var(--sub)] hover:bg-[var(--hover)]">All<ArrowUpRight size={12} /></a>} />
                <div className="px-1.5 pb-2">
                  {deployments.map((d) => (
                    <div key={d.id} className="st flex h-[52px] items-center gap-3 rounded-[8px] px-2.5 hover:bg-[var(--hover)]">
                      <span className={cx('size-2 shrink-0 rounded-full', d.state === 'rolled-back' ? 'bg-[var(--red)]' : d.state === 'building' ? 'bg-[var(--accent)] shadow-[0_0_0_3px_rgb(140_155_255/0.2)]' : 'bg-[var(--sub)] opacity-60')} />
                      <span className="min-w-0 flex-1 leading-[17px]"><span className="block truncate text-[13px] font-[550]">{d.msg}</span><span className="mono block truncate text-[11.5px] text-[var(--soft)]">{d.id} · {d.branch} · {d.sha}</span></span>
                      <span className="flex flex-col items-end gap-0.5"><Avatar t={d.who} /><span className="tnum text-[11.5px] text-[var(--soft)]">{d.ago}</span></span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </MotionConfig>
  )
}
