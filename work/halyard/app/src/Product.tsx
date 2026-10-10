// Halyard incident workspace, built to Rico's dark product grammar (measured: window #171717, side #131313, raised #1c1c1c,
// selected row #292929, 1px white 7.5% edges, a small white pill as the one primary, agent work shown as worked-for +
// sources + findings + an approval card). Lucide icons, stroke 1.75 at 16px. All data is sample data.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Activity, ArrowUp, BellRing, BookOpen, ChevronDown, ChevronRight, CircleDot, FileText, GitCommitHorizontal, House,
  Mic, PanelLeft, Plus, ScrollText, Search, Server, ShieldCheck, Siren, Users, Waypoints,
} from 'lucide-react'
import { RollingNumber } from './kit'

const SW = 1.6
const ease = [0.22, 1, 0.36, 1] as const

function In({ at, children, className = '', y = 8 }: { at: number; children: ReactNode; className?: string; y?: number }) {
  const still = useReducedMotion()
  return (
    <motion.div className={className} initial={still ? false : { opacity: 0, y, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: at, duration: 0.6, ease }}>
      {children}
    </motion.div>
  )
}

/** agent avatar: a lit orb (Rico's gradient orbs), greyscale so the page keeps one accent; the waiting agent gets amber */
function Orb({ size = 20, live = false }: { size?: number; live?: boolean }) {
  return <span className="relative shrink-0 rounded-full" style={{ width: size, height: size, background: live ? 'radial-gradient(circle at 32% 28%, #ffe2a8, #f5a524 45%, #7a4a06 100%)' : 'radial-gradient(circle at 32% 28%, #f4f4f4, #9a9a9a 48%, #3a3a3a 100%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)' }} />
}
function Person({ i, size = 20 }: { i: string; size?: number }) {
  return <span className="grid shrink-0 place-items-center rounded-full bg-[#2c2c2c] font-[600] text-[#d6d6d6] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.42)) }}>{i}</span>
}
const Chip = ({ children, tone = 'grey' }: { children: ReactNode; tone?: 'grey' | 'amber' }) => (
  <span className={`inline-flex h-[22px] items-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[12.5px] font-[500] leading-none ${tone === 'amber' ? 'bg-[var(--amber-tint)] text-[var(--amber-ink)]' : 'bg-white/[0.06] text-[#c4c4c4] shadow-[inset_0_0_0_1px_var(--edge)]'}`}>{children}</span>
)
const Source = ({ icon: I, label }: { icon: typeof Activity; label: string }) => (
  <span className="inline-flex h-7 items-center gap-1.5 rounded-[8px] bg-[var(--win-raised)] pl-1.5 pr-2.5 text-[12.5px] text-[#cfcfcf] shadow-[inset_0_0_0_1px_var(--edge)]">
    <span className="grid size-[18px] place-items-center rounded-[5px] bg-white/[0.08]"><I size={12} strokeWidth={2} /></span>{label}
  </span>
)

function Row({ icon: I, children, count, active, amber }: { icon: typeof Activity; children: ReactNode; count?: string; active?: boolean; amber?: boolean }) {
  return (
    <a href="#" className={`flex h-[30px] items-center rounded-[8px] pl-2.5 pr-2 text-[13.5px] ${active ? 'bg-[var(--win-sel)] text-[var(--ink)]' : 'text-[#bdbdbd] hover:bg-[var(--win-hover)]'}`}>
      <I size={15} strokeWidth={SW} className={`mr-2.5 ${active ? 'text-[var(--ink)]' : 'text-[#8a8a8a]'}`} />
      <span className="flex-1">{children}</span>
      {count && <span className={`tnum text-[12.5px] ${amber ? 'rounded-full bg-[var(--amber-tint)] px-1.5 py-0.5 leading-none text-[var(--amber-ink)]' : 'text-[#8a8a8a]'}`}>{count}</span>}
    </a>
  )
}

/** p99 latency for checkout-api over the last 60 min: flat ~180ms, deploy #4821 at 13:53, spike to 2.4s from 13:57 */
function LatencyChart({ at }: { at: number }) {
  const still = useReducedMotion()
  const pts = Array.from({ length: 61 }, (_, i) => {
    const base = 180 + Math.sin(i * 1.7) * 14 + Math.sin(i * 0.6) * 9
    const spike = i < 34 ? 0 : Math.min(1, (i - 34) / 4) * (2220 + Math.sin(i * 2.3) * 160)
    return base + spike
  })
  const X = (i: number) => 36 + i * 9.2, Y = (v: number) => 128 - (v / 3000) * 110
  const fill = pts.slice(34).map((v, k) => `${k ? 'L' : 'M'}${X(34 + k).toFixed(1)} ${Y(v).toFixed(1)}`).join('') + `L${X(60)} 128L${X(34)} 128Z`
  return (
    <svg viewBox="0 0 600 150" className="w-full" role="img" aria-label="Sample chart: checkout-api p99 latency, last 60 minutes, rising from 180 ms to 2.4 s after deploy 4821">
      {[0, 1000, 2000, 3000].map((v) => (
        <g key={v}><line x1="36" x2="592" y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,0.06)" /><text x="28" y={Y(v) + 3.5} textAnchor="end" fontSize="10" fill="#8a8a8a" fontFamily="IBM Plex Mono">{v ? `${v / 1000}s` : '0'}</text></g>
      ))}
      <line x1="36" x2="592" y1={Y(1500)} y2={Y(1500)} stroke="rgba(245,165,36,0.45)" strokeDasharray="3 4" />
      <text x="592" y={Y(1500) - 5} textAnchor="end" fontSize="10" fill="#d99d54" fontFamily="IBM Plex Mono">alert 1.5s</text>
      <line x1={X(30)} x2={X(30)} y1="22" y2="128" stroke="rgba(255,255,255,0.28)" strokeDasharray="2 3" />
      <rect x={X(30) - 22} y="4" width="44" height="16" rx="4" fill="#262626" stroke="rgba(255,255,255,0.1)" />
      <text x={X(30)} y="15.5" textAnchor="middle" fontSize="10" fill="#d4d4d4" fontFamily="IBM Plex Mono">#4821</text>
      <defs>
        <linearGradient id="latfill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="rgba(245,165,36,0.2)" /><stop offset="1" stopColor="rgba(245,165,36,0)" /></linearGradient>
        <clipPath id="latclip"><motion.rect x="0" y="0" height="150" initial={still ? false : { width: 0 }} animate={{ width: 600 }} transition={{ delay: at, duration: 1.4, ease: [0.65, 0, 0.35, 1] }} /></clipPath>
      </defs>
      <g clipPath="url(#latclip)">
        <path d={fill} fill="url(#latfill)" />
        <path d={pts.slice(0, 35).map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join('')} fill="none" stroke="#d4d4d4" strokeWidth="1.6" strokeLinejoin="round" />
        <path d={pts.slice(34).map((v, k) => `${k ? 'L' : 'M'}${X(34 + k).toFixed(1)} ${Y(v).toFixed(1)}`).join('')} fill="none" stroke="#f5a524" strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      {['13:10', '13:25', '13:40', '13:55', '14:10'].map((t, i) => <text key={t} x={36 + i * 138} y="145" fontSize="10" fill="#8a8a8a" fontFamily="IBM Plex Mono" textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'}>{t}</text>)}
    </svg>
  )
}

export default function Product({ at = 0 }: { at?: number }) {
  const s = (k: number) => at + k * 0.06
  return (
    <div className="flex h-[880px] w-[1152px] overflow-hidden rounded-[16px] bg-[var(--win)] text-left shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.06),0_30px_80px_-24px_rgba(0,0,0,0.9)]">
      {/* sidebar */}
      <aside aria-label="Workspace navigation" className="flex w-[232px] shrink-0 flex-col border-r border-[var(--edge)] bg-[var(--win-side)] px-2.5 pb-3">
        <In at={s(1)} className="flex h-14 items-center pl-1.5 pr-0.5">
          <span className="mr-2.5 grid size-6 place-items-center rounded-[7px] bg-[#2b2b2b] text-[12.5px] font-[600] text-[#e5e5e5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">N</span>
          <span className="text-[13.5px] font-[600] tracking-[-0.01em]">Northwind</span><ChevronDown size={14} strokeWidth={SW} className="ml-1 text-[#8a8a8a]" />
          <span className="ml-auto flex"><button type="button" aria-label="Search" className="grid size-8 place-items-center rounded-[8px] text-[#8a8a8a] hover:bg-[var(--win-hover)]"><Search size={16} strokeWidth={SW} /></button><button type="button" aria-label="Collapse sidebar" className="grid size-8 place-items-center rounded-[8px] text-[#8a8a8a] hover:bg-[var(--win-hover)]"><PanelLeft size={16} strokeWidth={SW} /></button></span>
        </In>
        <In at={s(2)}><nav aria-label="Workspace" className="space-y-px">
          <Row icon={House}>Home</Row>
          <Row icon={Siren} count="2" amber active>Incidents</Row>
          <Row icon={Users}>On-call</Row>
          <Row icon={Server} count="38">Services</Row>
          <Row icon={BookOpen}>Runbooks</Row>
          <Row icon={FileText}>Postmortems</Row>
        </nav></In>
        <In at={s(3)}>
          <div className="mb-1 mt-5 pl-2.5 text-[12.5px] font-[500] text-[#8a8a8a]">Agents</div>
          {([['Triage agent', 'working'], ['Rollback agent', 'waiting'], ['Comms agent', '']] as const).map(([n, st]) => (
            <a key={n} href="#" className="flex h-[30px] items-center gap-2.5 rounded-[8px] pl-2.5 pr-2 text-[13.5px] text-[#bdbdbd] hover:bg-[var(--win-hover)]">
              <Orb size={18} live={st === 'waiting'} /><span className="flex-1">{n}</span>{st && <span className={`text-[12.5px] ${st === 'waiting' ? 'text-[var(--amber-ink)]' : 'text-[#8a8a8a]'}`}>{st}</span>}
            </a>
          ))}
        </In>
        <In at={s(4)}>
          <div className="mb-1 mt-5 pl-2.5 text-[12.5px] font-[500] text-[#8a8a8a]">Recent</div>
          {([['INC-2291', 'checkout-api latency', true], ['INC-2288', 'Search indexing lag', false], ['INC-2276', 'Webhook retries', false]] as const).map(([id, t, on]) => (
            <a key={id} href="#" className="flex h-[30px] items-center gap-2.5 rounded-[8px] pl-2.5 pr-2 text-[13.5px] text-[#bdbdbd] hover:bg-[var(--win-hover)]">
              <CircleDot size={14} strokeWidth={2} className={on ? 'text-[var(--amber)]' : 'text-[#6b6b6b]'} /><span className="truncate">{t}</span>
            </a>
          ))}
        </In>
        <In at={s(5)} className="mt-auto">
          <div className="rounded-[12px] bg-[var(--win-raised)] p-3 shadow-[inset_0_0_0_1px_var(--edge)]">
            <div className="flex items-center gap-2 text-[12.5px] text-[#8a8a8a]"><span className="size-1.5 rounded-full bg-[var(--ok)]" />On call now</div>
            <div className="mt-2 flex items-center gap-2.5"><Person i="ML" size={26} /><div><div className="text-[13.5px] font-[500]">Maya Lindqvist</div><div className="mono text-[11.5px] text-[#8a8a8a]">until 18:00 UTC</div></div></div>
          </div>
        </In>
      </aside>

      {/* incident thread */}
      <section className="flex min-w-0 flex-1 flex-col">
        <In at={s(2)} className="flex h-14 shrink-0 items-center gap-2.5 border-b border-[var(--edge)] px-5 text-[13.5px]">
          <span className="text-[#8a8a8a]">Incidents</span><ChevronRight size={14} strokeWidth={SW} className="text-[#6b6b6b]" />
          <span className="mono text-[12.5px] text-[#a3a3a3]">INC-2291</span><span className="text-[13.5px] font-[600]">checkout-api p99 latency</span>
          <Chip tone="amber">SEV-2</Chip><span className="ml-auto text-[12.5px] text-[#8a8a8a]">Ongoing <span className="tnum text-[#cfcfcf]">14m</span></span>
        </In>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div className="mx-auto max-w-[620px] px-2 pt-5">
            <In at={s(4)} className="flex items-center gap-2.5 text-[13.5px] text-[#a3a3a3]">
              <span className="grid size-7 place-items-center rounded-full bg-[var(--amber-tint)]"><BellRing size={14} strokeWidth={2} className="text-[var(--amber-ink)]" /></span>
              <span><span className="text-[var(--ink)]">Alert fired</span> · p99 above 1.5s for 5 min · Maya paged</span><span className="mono ml-auto text-[11.5px] text-[#8a8a8a]">14:02</span>
            </In>
            <div className="ml-[13px] mt-1 h-4 w-px bg-white/[0.08]" />
            <In at={s(6)} className="flex items-center gap-2.5 text-[13.5px]">
              <Orb size={28} /><span className="font-[500]">Triage agent</span>
              <span className="flex items-center gap-1 text-[#8a8a8a]">Investigated for <RollingNumber value="2m 14s" at={s(7)} className="text-[#cfcfcf]" /><ChevronDown size={13} strokeWidth={SW} /></span>
            </In>
            <In at={s(8)} className="ml-[38px] mt-2.5 flex flex-wrap gap-1.5">
              <Source icon={Activity} label="Metrics" /><Source icon={ScrollText} label="Logs" /><Source icon={Waypoints} label="Traces" /><Source icon={GitCommitHorizontal} label="Deploys" />
            </In>
            <In at={s(9)} className="ml-[38px] mt-3 text-[13.5px] leading-[22px] text-[#d9d9d9]">
              p99 went from 180 ms to 2.4 s at 13:57, four minutes after deploy <span className="mono rounded-[4px] bg-white/[0.07] px-1 text-[13.5px]">#4821</span>. Traces point to a new N+1 query in <span className="mono rounded-[4px] bg-white/[0.07] px-1 text-[13.5px]">CartSummary.load</span> (412 calls per request). Errors are flat: this is latency, not failure.
            </In>
            <In at={s(10)} className="ml-[38px] mt-4 rounded-[14px] bg-[var(--win-raised)] p-3.5 pb-2 shadow-[inset_0_0_0_1px_var(--edge)]">
              <div className="mb-1.5 flex items-center text-[12.5px]"><span className="font-[500] text-[#e5e5e5]">checkout-api · p99 latency</span><span className="ml-2 text-[#8a8a8a]">last 60 min</span><span className="mono ml-auto text-[12.5px] text-[var(--amber-ink)]">2.41s</span></div>
              <LatencyChart at={s(11)} />
            </In>

            {/* the human step: the rollback waits for an approval */}
            <In at={s(13)} className="ml-[38px] mt-4 overflow-hidden rounded-[14px] bg-[var(--win-raised)] shadow-[inset_0_0_0_1px_var(--edge-2),0_12px_30px_-12px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2 px-3.5 pt-3 text-[12.5px] text-[#a3a3a3]"><Orb size={18} live /><span className="font-[500] text-[#e5e5e5]">Rollback agent</span> wants to
                <span className="ml-auto flex items-center gap-1.5 text-[var(--amber-ink)]"><span className="relative grid size-2 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-[var(--amber)] opacity-50" /><span className="size-1.5 rounded-full bg-[var(--amber)]" /></span>Waiting for you</span></div>
              <div className="px-3.5 pb-3 pt-1.5">
                <div className="text-[15px] font-[600] tracking-[-0.01em]">Roll back checkout-api to <span className="mono font-[500]">#4820</span></div>
                <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-[10px] shadow-[inset_0_0_0_1px_var(--edge)]">
                  {[['Recovery', '3-4 min'], ['Blast radius', 'checkout-api'], ['Reverts', '1 commit']].map(([k, v], i) => (
                    <div key={k} className={`px-3 py-2 ${i ? 'border-l border-[var(--edge)]' : ''}`}><div className="text-[11.5px] text-[#8a8a8a]">{k}</div><div className="mt-0.5 text-[13.5px] text-[#e5e5e5]">{v}</div></div>
                  ))}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5"><Chip><ShieldCheck size={12} strokeWidth={2} className="text-[#86efac]" />Production · eu-west-1</Chip><Chip>Once</Chip><Chip>Undo for 30 min</Chip></div>
              </div>
              <div className="flex items-center gap-2 border-t border-[var(--edge)] bg-white/[0.015] px-3 py-2.5">
                <span className="text-[12.5px] text-[#8a8a8a]">Maya, this needs your approval</span>
                <button type="button" className="pill-ghost ml-auto h-8 rounded-full px-3.5 text-[13.5px] font-[500]">Hold</button>
                <button type="button" className="pill-white h-8 rounded-full px-3.5 text-[13.5px] font-[600]">Approve rollback</button>
              </div>
            </In>
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_bottom,transparent,var(--win))]" />
        </div>
        <In at={s(14)} className="shrink-0 px-5 pb-4">
          <div className="mx-auto max-w-[620px] rounded-[16px] bg-[var(--win-raised)] p-3 shadow-[inset_0_0_0_1px_var(--edge)]">
            <div className="h-6 text-[13.5px] text-[#8a8a8a]">Ask Halyard, or @ an agent</div>
            <div className="mt-2 flex items-center gap-1.5">
              <button type="button" aria-label="Add context" className="grid size-8 place-items-center rounded-[9px] text-[#a3a3a3] shadow-[inset_0_0_0_1px_var(--edge)]"><Plus size={16} strokeWidth={SW} /></button>
              <span className="mono ml-1 text-[11.5px] text-[#8a8a8a]">INC-2291 attached</span>
              <button type="button" aria-label="Dictate" className="ml-auto grid size-8 place-items-center rounded-full text-[#a3a3a3]"><Mic size={16} strokeWidth={SW} /></button>
              <button type="button" aria-label="Send" className="grid size-8 place-items-center rounded-full bg-[#f2f2f0] text-[#111]"><ArrowUp size={16} strokeWidth={2.25} /></button>
            </div>
          </div>
        </In>
      </section>

      {/* incident inspector */}
      <aside aria-label="Incident details" className="w-[290px] shrink-0 border-l border-[var(--edge)] px-4 pt-4 text-[13.5px]">
        <In at={s(3)} className="text-[12.5px] font-[500] text-[#8a8a8a]">Incident</In>
        <In at={s(4)}><dl className="mt-2.5 grid grid-cols-[96px_1fr] gap-y-2.5">
          <dt className="text-[#8a8a8a]">Status</dt><dd className="flex items-center gap-1.5 text-[#e5e5e5]"><span className="size-1.5 rounded-full bg-[var(--amber)]" />Mitigating</dd>
          <dt className="text-[#8a8a8a]">Severity</dt><dd><Chip tone="amber">SEV-2</Chip></dd>
          <dt className="text-[#8a8a8a]">Commander</dt><dd className="flex items-center gap-1.5 text-[#e5e5e5]"><Person i="ML" size={18} />Maya L.</dd>
          <dt className="text-[#8a8a8a]">Services</dt><dd className="flex flex-wrap gap-1"><Chip>checkout-api</Chip></dd>
          <dt className="text-[#8a8a8a]">Impact</dt><dd className="text-[#cfcfcf]">Slow checkout, no failed orders</dd>
          <dt className="text-[#8a8a8a]">Started</dt><dd className="mono text-[12.5px] text-[#cfcfcf]">13:57 UTC</dd>
        </dl></In>
        <In at={s(6)} className="mt-6 text-[12.5px] font-[500] text-[#8a8a8a]">Timeline</In>
        <ol className="relative mt-2.5 space-y-3.5 before:absolute before:bottom-2 before:left-[4.5px] before:top-2 before:w-px before:bg-white/[0.08]">
          {([['13:53', 'Deploy #4821 shipped', 'done'], ['13:57', 'p99 crossed 1.5s', 'done'], ['14:02', 'Alert fired, Maya paged', 'done'], ['14:03', 'Triage agent started', 'done'], ['14:05', 'Cause found: N+1 query', 'done'], ['14:06', 'Rollback proposed', 'now'], ['', 'Status page update', 'next']] as const).map(([t, l, st], i) => (
            <li key={l}><In at={s(7 + i * 0.6)} y={4} className="relative flex items-start gap-3">
              <span className={`relative mt-[5px] size-[10px] shrink-0 rounded-full ${st === 'done' ? 'bg-[#6b6b6b]' : st === 'now' ? 'bg-[var(--amber)] shadow-[0_0_0_3px_rgba(245,165,36,0.18)]' : 'border border-[#6b6b6b] bg-[var(--win)]'}`} />
              <div className="min-w-0"><div className={st === 'next' ? 'text-[#8a8a8a]' : 'text-[#e5e5e5]'}>{l}</div>{t && <div className="mono text-[11.5px] text-[#8a8a8a]">{t}</div>}</div>
            </In></li>
          ))}
        </ol>
        <In at={s(12)} className="mt-6 rounded-[12px] bg-[var(--win-raised)] p-3 shadow-[inset_0_0_0_1px_var(--edge)]">
          <div className="text-[12.5px] text-[#cfcfcf]">Comms agent drafted a status page update</div>
          <div className="mt-2 text-[12.5px] leading-[19px] text-[#8a8a8a]">"Checkout is slower than usual. Orders are going through. We are rolling back a change."</div>
          <a href="#" className="mt-1.5 inline-flex h-7 items-center text-[12.5px] font-[500] text-[#e5e5e5] underline decoration-white/25 underline-offset-[3px]">Review draft</a>
        </In>
      </aside>
    </div>
  )
}
