// Palisade bento: three live product tiles under the headline. One story: a failing access control is detected, Palisade
// revokes stale accounts and it passes; evidence keeps streaming in; readiness rolls from 91% to 96%. Sample data.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Camera, CheckCircle, CircleNotch, Database, FileText, GitBranch, Key, Laptop, ShieldCheck, Users, WarningCircle, XCircle } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { RollingNumber } from './kit'

const ease = [0.22, 1, 0.36, 1] as const
export const BEAT = { fail: 2.0, fixing: 2.8, pass: 3.9 }
type Ev = { id: string; icon: Icon; what: string; src: string }
const EVIDENCE: Ev[] = [
  { id: 'e1', icon: GitBranch, what: 'Branch protection on main', src: 'repo settings' },
  { id: 'e2', icon: Key, what: 'MFA enforced for 64 admins', src: 'identity provider' },
  { id: 'e3', icon: Database, what: 'Encryption at rest, 12 stores', src: 'cloud config' },
  { id: 'e4', icon: Laptop, what: 'Disk encryption on 212 laptops', src: 'device agent' },
  { id: 'e5', icon: Users, what: 'Q3 access review signed off', src: 'reviewer: J. Okoro' },
  { id: 'e6', icon: Camera, what: 'Backup restore test passed', src: 'runbook #14' },
]

function useClock() {
  const still = useReducedMotion()
  const [s, setS] = useState(still ? 99 : 0)
  useEffect(() => {
    if (still) return
    const t0 = performance.now()
    const id = setInterval(() => setS((performance.now() - t0) / 1000), 100)
    return () => clearInterval(id)
  }, [still])
  return s
}

function Tile({ i, title, icon: I, meta, children, intro }: { i: number; title: string; icon: Icon; meta: React.ReactNode; children: React.ReactNode; intro: number }) {
  const still = useReducedMotion()
  return (
    <motion.section initial={still ? false : { opacity: 0.01, y: 36 }} animate={{ opacity: 1, y: 0 }}
      transition={{ y: { delay: intro + i * 0.1, duration: 1.1, ease: [0.26, 0.32, 0.14, 1] }, opacity: { delay: intro + i * 0.1, duration: 0.6, ease } }}
      className="flex h-[440px] w-[413px] flex-col overflow-hidden rounded-[16px] bg-[var(--s1)] shadow-[0_0_0_1px_var(--line),inset_0_1px_0_rgb(255_255_255/0.06),0_30px_60px_-30px_rgb(0_0_0/0.8)]">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-[var(--line)] px-4">
        <I size={16} className="text-[var(--sub)]" /><span className="text-[14px] font-[500]">{title}</span>
        <span className="ml-auto text-[12px] text-[var(--soft)]">{meta}</span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </motion.section>
  )
}

export default function Tiles({ intro }: { intro: number }) {
  const still = useReducedMotion()
  const s = useClock()
  const state = still || s >= BEAT.pass ? 'pass' : s >= BEAT.fixing ? 'fixing' : s >= BEAT.fail ? 'fail' : 'idle'
  const shown = still ? EVIDENCE.length : Math.max(2, Math.min(EVIDENCE.length, 2 + Math.floor((s - 1.6) / 0.8)))
  const ready = state === 'pass' ? 96 : 91
  const b = (d: number) => (still ? {} : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: intro + 0.45 + d, duration: 0.45, ease } })

  const CONTROLS = [
    { k: 'MFA on all admin accounts', st: 'pass' }, { k: 'Encryption at rest', st: 'pass' },
    { k: 'Quarterly access review', st: state === 'idle' ? 'pass' : state }, { k: 'Vendor risk assessments', st: 'warn' },
    { k: 'Backup restore tested', st: 'pass' }, { k: 'Incident response drill', st: 'pass' }, { k: 'Laptop disk encryption', st: 'pass' },
  ] as { k: string; st: string }[]

  return (
    <div className="flex gap-5">
      <Tile i={0} title="Controls" icon={ShieldCheck} meta="SOC 2 · 118 total" intro={intro}>
        <div className="p-2">
          {CONTROLS.map((c, i) => {
            const hot = c.k === 'Quarterly access review' && state !== 'idle' && state !== 'pass'
            return (
              <motion.div key={c.k} {...b(i * 0.04)} className={`flex h-[44px] items-center gap-2.5 rounded-[9px] px-2.5 transition-colors duration-500 ${hot ? 'bg-[rgb(242_246_243/0.05)]' : ''}`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={c.st} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.25, ease }} className="grid size-4 place-items-center">
                    {c.st === 'pass' && <CheckCircle size={16} weight="fill" className="text-[var(--mint)]" />}
                    {c.st === 'warn' && <WarningCircle size={16} weight="fill" className="text-[var(--warn)]" />}
                    {c.st === 'fail' && <XCircle size={16} weight="fill" className="text-[var(--danger)]" />}
                    {c.st === 'fixing' && <CircleNotch size={15} weight="bold" className="animate-spin text-[var(--sub)]" />}
                  </motion.span>
                </AnimatePresence>
                <span className="flex-1 truncate text-[13.5px] text-[#dfe6e1]">{c.k}</span>
                <span className={`text-[12px] ${c.st === 'fail' ? 'text-[var(--danger)]' : c.st === 'warn' ? 'text-[var(--warn)]' : c.st === 'fixing' ? 'text-[var(--sub)]' : 'text-[var(--soft)]'}`}>
                  {c.st === 'fail' ? '3 stale accounts' : c.st === 'fixing' ? 'Revoking access…' : c.st === 'warn' ? '2 pending' : 'Passing'}
                </span>
              </motion.div>
            )
          })}
        </div>
      </Tile>

      <Tile i={1} title="Evidence" icon={FileText} meta={<span className="flex items-center gap-1.5"><span className="relative grid size-2 place-items-center"><span className="absolute size-2 animate-ping rounded-full bg-[var(--mint)] opacity-50" /><span className="size-1.5 rounded-full bg-[var(--mint)]" /></span>Collecting</span>} intro={intro}>
        <div className="space-y-1.5 p-3">
          <AnimatePresence initial={false}>
            {EVIDENCE.slice(0, shown).slice().reverse().map((e, i) => (
              <motion.div key={e.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
                className="flex items-center gap-3 rounded-[10px] bg-[var(--s2)] px-3 py-2.5 shadow-[inset_0_0_0_1px_var(--line)]">
                <span className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-[var(--s3)] text-[var(--sub)] shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]"><e.icon size={16} /></span>
                <div className="min-w-0 flex-1 leading-[18px]"><div className="truncate text-[13px] text-[var(--ink)]">{e.what}</div><div className="text-[12px] text-[var(--soft)]">{e.src}</div></div>
                <span className="font-mono text-[11px] text-[var(--soft)]">{i === 0 && !still ? 'now' : `${i * 4 + 2}m`}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Tile>

      <Tile i={2} title="Audit readiness" icon={ShieldCheck} meta="SOC 2 Type II" intro={intro}>
        <div className="flex flex-col items-center px-6 pt-8">
          <div className="relative grid size-[200px] place-items-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90" aria-hidden>
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgb(242 246 243 / 0.07)" strokeWidth="9" />
              <motion.circle cx="60" cy="60" r="52" fill="none" stroke="var(--mint)" strokeWidth="9" strokeLinecap="round"
                initial={still ? false : { pathLength: 0 }} animate={{ pathLength: ready / 100 }} transition={{ duration: state === 'pass' ? 0.9 : 1.4, delay: state === 'pass' ? 0 : intro + 0.6, ease }} />
            </svg>
            <div className="text-center">
              <div className="font-[family-name:var(--font-display)] text-[52px] font-[500] leading-none tracking-[-0.03em] [font-variant-numeric:lining-nums_tabular-nums]"><RollingNumber value={`${ready}%`} at={intro + 0.6} /></div>
              <div className="mt-2 text-[12px] text-[var(--sub)]">ready for audit</div>
            </div>
          </div>
          <dl className="mt-7 grid w-full grid-cols-2 gap-y-2 text-[13px]">
            <dt className="text-[var(--soft)]">Controls passing</dt><dd className="text-right font-mono text-[var(--ink)]"><RollingNumber value={`${state === 'pass' ? 113 : 107} / 118`} at={intro + 0.65} /></dd>
            <dt className="text-[var(--soft)]">Audit window opens</dt><dd className="text-right font-mono text-[var(--ink)]">in 14 days</dd>
            <dt className="text-[var(--soft)]">Open tasks</dt><dd className="text-right font-mono text-[var(--ink)]"><RollingNumber value={state === 'pass' ? '3' : '9'} at={intro + 0.7} /></dd>
          </dl>
        </div>
      </Tile>
    </div>
  )
}
