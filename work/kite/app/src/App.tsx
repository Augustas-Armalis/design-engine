// Kite (fictional edge network; sample data). Dark overview for an on-call platform engineer: KPIs, live traffic map,
// regions (problem first, with its fix), latency with deploy markers, recent deployments.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react'
import { CountUp, ease, rise, SIN, T } from './anim'
import { Activity, AlertTriangle, ArrowUpRight, Bell, ChevronDown, ChevronsUpDown, Database, Gauge, Globe, LayoutGrid, Logs, Map as MapIcon, Rocket, Search, Server, Shield, SlidersHorizontal, Timer, Waypoints } from 'lucide-react'
import Map from './Map'
import Chart from './Chart'
import { deployments, kpis, regions, totalRps, fmtK } from './data'

const I = { size: 15, strokeWidth: 1.75 } as const
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

function Card({ className, children, at }: { className?: string; children: React.ReactNode; at: number }) {
  return <motion.section {...rise(at)}
    className={cx('card-surface rounded-[16px] shadow-[var(--card)]', className)}>{children}</motion.section>
}
function Head({ title, meta, right, icon: Ic }: { title: string; meta?: React.ReactNode; right?: React.ReactNode; icon: typeof Activity }) {
  return (
    <div className="flex h-[54px] items-center gap-3 px-4 shadow-[inset_0_-1px_0_var(--div)]">
      <span className="tile grid size-7 shrink-0 place-items-center rounded-[8px] text-[var(--sub)]"><Ic size={14} strokeWidth={1.9} /></span>
      <h2 className="text-[14px] font-[600]">{title}</h2>{meta}<div className="ml-auto flex items-center gap-2">{right}</div>
    </div>
  )
}
/* Rico-style mini bars: 16 quiet bars, the latest four lit; on a bad KPI the anomalous bars light red */
function Bars({ s, bad, at }: { s: number[]; bad?: boolean; at: number }) {
  const v = s.slice(-16), lo = Math.min(...v), hi = Math.max(...v)
  const med = [...v].sort((p, q) => p - q)[8]
  return (
    <div className="flex h-[30px] items-end gap-[3px]" aria-hidden>
      {v.map((x, i) => {
        const anomaly = bad && Math.abs(x - med) > 0.45 * (hi - lo)
        return <motion.span key={i} className="w-[4px] origin-bottom rounded-[1.5px]" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: at + i * 0.028, type: 'spring', stiffness: 380, damping: 22, opacity: { delay: at + i * 0.028, duration: 0.2 } }}
          style={{ height: 5 + ((x - lo) / (hi - lo || 1)) * 25, background: anomaly ? 'var(--red)' : i >= 12 ? 'rgb(255 255 255 / 0.62)' : 'rgb(255 255 255 / 0.14)' }} />
      })}
    </div>
  )
}

function Avatar({ t }: { t: string }) {
  return <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--s3)] text-[10px] font-[650] text-[var(--sub)] shadow-[inset_0_0_0_1px_var(--line)]">{t}</span>
}

function Sidebar({ rerouted, flared }: { rerouted: boolean; flared: boolean }) {
  const nav = [['Overview', LayoutGrid, true], ['Deployments', Rocket], ['Analytics', Activity], ['Logs', Logs], ['Edge config', SlidersHorizontal], ['Firewall', Shield], ['Domains', Globe], ['Routing', Waypoints]] as const
  return (
    <motion.aside initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: T.side, duration: 0.9, ease: ease.reveal }} className="flex w-[232px] shrink-0 flex-col px-3 pb-3 pt-3 shadow-[inset_-1px_0_0_var(--div)]">
      <button className="st flex h-11 items-center gap-2.5 rounded-[10px] px-2 text-left hover:bg-[var(--hover)]">
        <span className="tile grid size-7 place-items-center rounded-[8px] text-[12px] font-[750] text-[var(--ink)]">S</span>
        <span className="min-w-0 flex-1 leading-[16px]"><span className="block text-[14px] font-[600]">Storefront</span><span className="block text-[12px] text-[var(--soft)]">Pro · sample team</span></span>
        <ChevronsUpDown size={14} className="text-[var(--faint)]" />
      </button>
      <nav aria-label="Main" className="mt-4 flex flex-col gap-0.5">
        {nav.map(([l, Ic, on], i) => (
          <motion.a initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: T.side + 0.1 + i * 0.035, duration: 0.5, ease: ease.out }} key={l} href="#" aria-current={on ? 'page' : undefined} className={cx('st flex h-8 items-center gap-2.5 rounded-[9px] px-2 text-[14px] font-[500]', on ? 'bg-[var(--select)] text-[var(--ink)]' : 'text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]')}>
            <Ic {...I} className={on ? 'text-[var(--ink)]' : 'text-[var(--soft)]'} />{l}
          </motion.a>
        ))}
      </nav>
      <div className="mt-6 px-2 text-[12px] font-[500] text-[var(--soft)]">Projects</div>
      <div className="mt-1.5 flex flex-col gap-0.5">
        {[['storefront-prod', true, true], ['storefront-staging', false], ['checkout-api', false], ['marketing-site', false]].map(([n, on, hot], i) => (
          <motion.a initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: T.side + 0.42 + i * 0.035, duration: 0.5, ease: ease.out }} key={n as string} href="#" className={cx('st flex h-8 items-center gap-2.5 rounded-[9px] px-2 text-[14px] font-[500]', on ? 'text-[var(--ink)]' : 'text-[var(--sub)] hover:bg-[var(--hover)]')}>
            <span className={cx('size-1.5 rounded-full transition-colors duration-500', hot && flared && !rerouted ? 'bg-[var(--red)]' : 'bg-[var(--sub)] opacity-60')} /><span className="truncate">{n as string}</span>
          </motion.a>
        ))}
      </div>
      <motion.div {...rise(T.side + 0.6, 10)} className="card-surface mt-auto rounded-[12px] p-3 shadow-[var(--card)]">
        <div className="flex items-baseline justify-between text-[12px]"><span className="text-[var(--sub)]">Edge requests</span><span className="tnum text-[var(--soft)]">Oct</span></div>
        <div className="tnum mt-1 text-[14px] font-[600]">31.2B <span className="font-[450] text-[var(--soft)]">/ 50B</span></div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-[var(--s3)]"><motion.div initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ delay: T.side + 0.9, duration: 1.2, ease: ease.out }} className="h-full rounded-full bg-[linear-gradient(90deg,rgb(255_255_255/0.35),#fff)]" /></div>
      </motion.div>
    </motion.aside>
  )
}

export default function App() {
  const [rerouted, setRerouted] = useState(false)
  const still = useReducedMotion()
  const [flared, setFlared] = useState(!!still)
  useEffect(() => { if (still) return; const id = window.setTimeout(() => setFlared(true), SIN * 1000); return () => clearTimeout(id) }, [still])
  const hot = regions.filter((r) => r.state === 'hot' && !rerouted && flared)
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-[900px] w-[1440px] overflow-hidden bg-[var(--canvas)]">
        <Sidebar rerouted={rerouted} flared={flared} />
        <div className="flex min-w-0 flex-1 flex-col">
          <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.top, duration: 0.7, ease: ease.out }} className="flex h-[52px] shrink-0 items-center gap-3 px-6 shadow-[inset_0_-1px_0_var(--div)]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[14px] font-[500]"><span className="text-[var(--soft)]">Storefront</span><span aria-hidden className="text-[var(--soft)]">/</span><span className="text-[var(--soft)]">storefront-prod</span><span aria-hidden className="text-[var(--soft)]">/</span><span aria-current="page">Overview</span></nav>
            <div className="ml-auto flex items-center gap-2">
              <button className="st btn-tactile flex h-8 w-[220px] items-center gap-2 rounded-[10px] px-2.5 text-[13px] text-[var(--soft)]"><Search size={14} />Search<kbd className="mono ml-auto rounded-[5px] px-1.5 text-[11px] text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--line-2)]">⌘K</kbd></button>
              <button aria-label="Notifications" className="st relative grid size-8 place-items-center rounded-[9px] text-[var(--sub)] hover:bg-[var(--hover)]"><Bell {...I} /><span className="absolute right-[7px] top-[7px] size-1.5 rounded-full bg-[var(--red)]" /></button>
            </div>
          </motion.header>

          <main className="min-h-0 flex-1 overflow-hidden px-6 pt-5">
            <motion.div {...rise(T.title, 10)} className="flex items-center gap-3">
              <h1 className="text-[22px] font-[650] tracking-[-0.02em]">storefront-prod</h1>
              <span className="flex h-6 items-center gap-1.5 rounded-full bg-[rgb(255_255_255/0.06)] px-2.5 text-[12px] font-[550] text-[var(--ink)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]"><span className="size-1.5 rounded-full bg-[#ededed]" />Production</span>
              <a href="#" className="mono flex h-6 items-center gap-1 text-[var(--soft)] hover:text-[var(--sub)]">storefront.app<ArrowUpRight size={12} /></a>
              <div className="ml-auto flex items-center gap-2">
                <div role="tablist" aria-label="Range" className="flex h-8 items-center rounded-[11px] bg-[#0e0e0f] p-[3px] shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.06)]">
                  {['1h', '24h', '7d', '30d'].map((t) => <button key={t} role="tab" aria-selected={t === '24h'} className={cx('st h-[26px] rounded-[7px] px-2.5 text-[13px] font-[550]', t === '24h' ? 'tile text-[var(--ink)]' : 'text-[var(--soft)] hover:text-[var(--ink)]')}>{t}</button>)}
                </div>
                <button className="st btn-tactile flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-[550]">All regions<ChevronDown size={14} className="text-[var(--soft)]" /></button>
                <button className="st flex h-8 items-center rounded-full bg-[linear-gradient(180deg,#fff,#dcdcde)] px-4 text-[13px] font-[600] text-[var(--canvas)] shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_1px_0_#fff] hover:bg-white">Deploy</button>
              </div>
            </motion.div>

            <Card at={T.kpi} className="mt-4 grid grid-cols-4">
              {kpis.map((k, i) => (
                <div key={k.k} className={cx('flex items-end gap-3 px-5 py-4', i > 0 && 'shadow-[inset_1px_0_0_var(--div)]')}>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[12px] font-[500] text-[var(--soft)]">{[<Server key="a" size={13} />, <Timer key="b" size={13} />, <AlertTriangle key="c" size={13} />, <Database key="d" size={13} />][i]}{k.k}</div>
                    <div className="tnum mt-1.5 text-[26px] font-[650] leading-[30px] tracking-[-0.03em]"><CountUp value={k.v} at={T.kpi + 0.2 + i * 0.07} /><span className="ml-0.5 text-[15px] font-[500] text-[var(--soft)]">{k.unit}</span></div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[12px]"><span className={cx('tnum font-[550]', k.good ? 'text-[var(--ink)]' : 'text-[var(--red)]')}>{k.delta}</span><span className="text-[var(--soft)]">{k.note}</span></div>
                  </div>
                  <Bars s={k.s} bad={!k.good} at={T.kpi + 0.3 + i * 0.07} />
                </div>
              ))}
            </Card>

            <div className="mt-4 grid grid-cols-[744px_1fr] gap-4">
              <Card at={T.map}>
                <Head icon={MapIcon} title="Traffic by region" meta={<span className="flex items-center gap-1.5 text-[12px] text-[var(--soft)]"><span className="size-1.5 rounded-full bg-[#ededed] shadow-[0_0_6px_rgb(255_255_255/0.6)]" />Live · {fmtK(totalRps)} req/s</span>}
                  right={<span className="flex items-center gap-3 text-[12px] text-[var(--soft)]"><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[#ededed]" />Healthy</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[var(--red)]" />Elevated</span></span>} />
                <div className="px-4 pb-2 pt-1"><Map rerouted={rerouted} at={T.map} /></div>
              </Card>

              <Card at={T.regions} className="flex flex-col">
                <Head icon={Globe} title="Regions" meta={<span className="tnum text-[13px] text-[var(--soft)]">10</span>} right={<a href="#" className="st flex h-7 items-center gap-1 rounded-[8px] px-2 text-[12px] font-[550] text-[var(--sub)] hover:bg-[var(--hover)]">All<ArrowUpRight size={12} /></a>} />
                <AnimatePresence initial={false} mode="popLayout">
                {!flared ? null : hot.length > 0 ? (
                  <motion.div key="alert" initial={{ opacity: 0, height: 0, scale: 0.97 }} animate={{ opacity: 1, height: 'auto', scale: 1 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.55, ease: ease.out }} className="overflow-hidden"><div className="mx-3 mb-2 mt-3 rounded-[12px] bg-[linear-gradient(180deg,rgb(255_107_94/0.12),rgb(255_107_94/0.06))] p-3 shadow-[inset_0_0_0_1px_rgb(255_107_94/0.2),inset_0_1px_0_rgb(255_255_255/0.04)]">
                    <div className="text-[13px] font-[600]">sin1 p95 is 3.3x its baseline</div>
                    <div className="mt-0.5 text-[12px] leading-[17px] text-[var(--sub)]">Since deploy #4127 at 13:52. hkg1 has 41% headroom at 36 ms.</div>
                    <div className="mt-2.5 flex gap-2">
                      <button onClick={() => setRerouted(true)} className="st h-7 rounded-full bg-[linear-gradient(180deg,#fff,#dcdcde)] px-3 text-[12px] font-[600] text-[var(--canvas)] shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_1px_0_#fff]">Shift 30% to hkg1</button>
                      <button className="st btn-tactile h-7 rounded-full px-3 text-[12px] font-[550] text-[var(--sub)]">Open trace</button>
                    </div>
                  </div></motion.div>
                ) : (
                  <motion.div key="ok" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: ease.out }} className="overflow-hidden"><div className="mx-3 mb-2 mt-3 flex items-center justify-between rounded-[12px] bg-[rgb(255_255_255/0.05)] p-3 text-[13px] font-[550] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">30% of sin1 now served from hkg1<button onClick={() => setRerouted(false)} className="text-[12px] text-[var(--sub)] underline decoration-[var(--faint)] underline-offset-4">Undo</button></div></motion.div>
                )}
                </AnimatePresence>
                <div className="flex-1 px-1.5 pb-1.5">
                  {[...regions].sort((a, b) => b.rps - a.rps).filter((r, _i, a) => r.state === "hot" || a.filter((q) => q.state !== "hot").indexOf(r) < 4).map((r, ri) => {
                    const bad = r.state === 'hot' && !rerouted && flared
                    return (
                      <motion.div layout="position" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: T.regions + 0.3 + ri * 0.055, duration: 0.55, ease: ease.out, layout: { duration: 0.5, ease: ease.out } }} key={r.code} className="st grid h-8 grid-cols-[46px_1fr_92px_52px] items-center gap-2 rounded-[8px] px-2.5 hover:bg-[var(--hover)]">
                        <span className={cx('mono transition-colors duration-500', bad ? 'text-[var(--red)]' : 'text-[var(--sub)]')}>{r.code}</span>
                        <span className="truncate text-[13px]">{r.city}</span>
                        <span className="h-1 overflow-hidden rounded-full bg-[var(--s3)]"><motion.span initial={{ width: 0 }} animate={{ width: `${(r.rps / 420000) * 100}%` }} transition={{ delay: T.regions + 0.45 + ri * 0.055, duration: 0.9, ease: ease.out }} className={cx('block h-full rounded-full transition-colors duration-500', bad ? 'bg-[var(--red)]' : 'bg-[linear-gradient(90deg,rgb(255_255_255/0.25),rgb(255_255_255/0.8))]')} /></span>
                        <span className={cx('tnum text-right text-[13px] font-[550] transition-colors duration-500', bad && 'text-[var(--red)]')}>{r.state === 'hot' && (rerouted || !flared) ? (rerouted ? 44 : 38) : r.p95}<span className="text-[11px] font-[450] text-[var(--soft)]"> ms</span></span>
                      </motion.div>
                    )
                  })}
                </div>
              </Card>
            </div>

            <div className="mt-4 grid grid-cols-[744px_1fr] gap-4">
              <Card at={T.latency}>
                <Head icon={Gauge} title="Latency" meta={<span className="text-[12px] text-[var(--soft)]">all regions · 24h</span>}
                  right={<span className="flex items-center gap-3 text-[12px] text-[var(--soft)]"><span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full bg-[#ededed]" />p95</span><span className="flex items-center gap-1.5"><span className="h-[2px] w-3 rounded-full bg-[var(--sub)] opacity-70" />p50</span><span className="flex items-center gap-1.5"><span className="h-px w-3 border-t border-dashed border-[var(--sub)] opacity-60" />p99</span></span>} />
                <div className="px-4 pb-2 pt-2"><Chart at={T.latency} /></div>
              </Card>
              <Card at={T.deploys}>
                <Head icon={Rocket} title="Deployments" right={<a href="#" className="st flex h-7 items-center gap-1 rounded-[8px] px-2 text-[12px] font-[550] text-[var(--sub)] hover:bg-[var(--hover)]">All<ArrowUpRight size={12} /></a>} />
                <div className="px-1.5 pb-2 pt-1.5">
                  {deployments.map((d, di) => (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: T.deploys + 0.3 + di * 0.07, duration: 0.55, ease: ease.out }} key={d.id} className="st flex h-11 items-center gap-3 rounded-[8px] px-2.5 hover:bg-[var(--hover)]">
                      <span className={cx('size-2 shrink-0 rounded-full', d.state === 'rolled-back' ? 'bg-[var(--red)]' : d.state === 'building' ? 'bg-[#ededed] shadow-[0_0_0_3px_rgb(255_255_255/0.12),0_0_8px_rgb(255_255_255/0.5)]' : 'bg-[var(--sub)] opacity-60')} />
                      <span className="min-w-0 flex-1 leading-[17px]"><span className="block truncate text-[13px] font-[550]">{d.msg}</span><span className="mono block truncate text-[11.5px] text-[var(--soft)]">{d.id} · {d.branch} · {d.sha}</span></span>
                      <span className="flex flex-col items-end gap-0.5"><Avatar t={d.who} /><span className="tnum text-[11.5px] text-[var(--soft)]">{d.ago}</span></span>
                    </motion.div>
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
