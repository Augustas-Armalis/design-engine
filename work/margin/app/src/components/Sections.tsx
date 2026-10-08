// Homepage below the hero, on the product-site blueprint (knowledge/web/product-site-anatomy.md):
// proof strip, product chapter, bento, story tabs, breather, closing CTA, footer. Sample data only.
import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  RiChat3Line, RiCheckboxCircleFill, RiCornerDownRightLine, RiGitMergeFill, RiGitPullRequestLine, RiGithubFill, RiLoader4Line,
  RiPushpinLine, RiQuillPenAiFill, RiSortDesc, RiCodeSSlashLine, RiBookOpenLine,
} from '@remixicon/react'
import { InView } from '../kit'
import { ease, spring } from '../motion'

const W = 'mx-auto w-[1152px]'

/** Section shell: a hairline across the rails with registration nodes, then content. */
function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-rail" />
      {[120, 1320].map((x) => <span key={x} aria-hidden className="absolute -top-[3px] size-[7px] rounded-[2px] bg-canvas shadow-[0_0_0_1px_#cfcbc3]" style={{ left: x - 3 }} />)}
      {children}
    </section>
  )
}

/** Two-tone lead heading: ink sentence, muted continuation (10/18 studied sites). */
function Lead({ ink, muted, center, size = 44 }: { ink: string; muted: string; center?: boolean; size?: number }) {
  return (
    <h2 className={`text-balance font-[560] leading-[1.1] tracking-[-0.03em] text-ink ${center ? 'text-center' : ''}`} style={{ fontSize: size }}>
      {ink} <span className="text-[#8b867d]">{muted}</span>
    </h2>
  )
}

const Mark = ({ size = 13 }: { size?: number }) => <RiQuillPenAiFill size={size} />

// ---------------------------------------------------------------- proof strip (honest: languages, not invented logos)
const LANGS = ['TypeScript', 'Python', 'Go', 'Rust', 'Java', 'Kotlin', 'Ruby', 'Swift', 'C#', 'PHP']
export function Proof() {
  return (
    <Section>
      <div className={`${W} py-14 text-center`}>
        <InView><p className="text-[14px] text-soft">Reviews the languages your team ships</p></InView>
        <div className="mt-6 flex items-center justify-between px-6">
          {LANGS.map((l, i) => <InView key={l} i={i * 0.5} y={10}><span className="font-mono text-[16px] tracking-[-0.01em] text-soft">{l}</span></InView>)}
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------- chapter: notes where the problem is
const FEATS = [
  { icon: RiPushpinLine, t: 'Pinned to the line', d: 'Every note sits on the code it is about, so nobody scrolls to find it.' },
  { icon: RiSortDesc, t: 'Ranked by severity', d: 'Blocking, should fix or nit. Read the first one, merge after the last.' },
  { icon: RiCodeSSlashLine, t: 'Fixes you can commit', d: 'When the fix is clear, the note carries it. One click commits it to the branch.' },
]
const INLINE = [
  { n: 41, code: [['tk-k', 'const '], ['', 'user = '], ['tk-k', 'await '], ['', 'db.users.'], ['tk-f', 'find'], ['', '(id)']] },
  { n: 42, code: [['tk-k', 'if '], ['', '(user.role === '], ['tk-s', "'admin'"], ['', ') {']], hit: true },
  { n: 43, code: [['', '  '], ['tk-k', 'return '], ['tk-f', 'grantAll'], ['', '(user)']] },
  { n: 44, code: [['', '}']] },
]
export function Chapter() {
  return (
    <Section>
      <div className={`${W} grid grid-cols-[480px_1fr] gap-14 py-28`}>
        <div className="pt-4">
          <InView><Lead size={40} ink="Notes where the problem is." muted="Not a wall of comments under the PR." /></InView>
          <div className="mt-10 space-y-7">
            {FEATS.map((f, i) => (
              <InView key={f.t} i={i + 1}>
                <div className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-[12px] bg-white text-ink shadow-[var(--shadow-ring)]"><f.icon size={17} /></span>
                  <div>
                    <div className="text-[16px] font-[600] tracking-[-0.01em]">{f.t}</div>
                    <p className="mt-1 text-[15px] leading-[23px] text-sub">{f.d}</p>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
        {/* product crop, bleeding past the right edge and fading */}
        <InView i={1} className="relative -mr-[24px]">
          <div className="overflow-hidden rounded-l-[18px] bg-white shadow-[var(--shadow-frame)] [mask-image:linear-gradient(to_right,#000_82%,transparent)]">
            <div className="flex h-10 items-center gap-2 border-b border-line px-4 font-mono text-[12px] text-sub">src/auth/permissions.ts</div>
            <div className="code py-3">
              {INLINE.map((l) => (
                <div key={l.n}>
                  <div className={`flex whitespace-pre ${l.hit ? 'bg-[#fcf0ee]' : ''}`}>
                    <span className="w-12 shrink-0 pr-3 text-right text-[#706c65]">{l.n}</span>
                    <span className="text-[#3b3934]">{l.code.map(([c, x], j) => <span key={j} className={c}>{x}</span>)}</span>
                  </div>
                  {l.hit && (
                    <div className="my-2 ml-12 mr-24 rounded-[16px] bg-white p-3.5 font-sans shadow-[var(--shadow-tile)]">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="grid size-5 place-items-center rounded-[6px] bg-ink text-white"><Mark size={11} /></span>
                        <span className="text-[12px] font-[600]">Margin</span>
                        <span className="flex h-[20px] items-center rounded-[8px] bg-red-tint px-1.5 font-[600] text-red-text">Blocking</span>
                      </div>
                      <p className="mt-2 text-[13px] leading-[20px] text-sub">Role is read from the request body on line 12, so anyone can send <span className="font-mono text-[12px] text-ink">"admin"</span>. Read it from the session instead.</p>
                      <div className="code mt-2 overflow-hidden rounded-[8px] text-[11.5px] leading-[22px] shadow-[inset_0_0_0_1px_rgba(27,26,23,0.08)]">
                        <div className="flex whitespace-pre bg-[#fcf0ee]"><span className="w-5 pl-2 text-red-text">−</span><span>{'const user = await db.users.find(id)'}</span></div>
                        <div className="flex whitespace-pre bg-[#eef8f1]"><span className="w-5 pl-2 text-green-text">+</span><span>{'const user = await session.user()'}</span></div>
                      </div>
                      <div className="mt-3 flex gap-1.5">
                        <span className="btn-green inline-flex h-8 items-center rounded-[12px] px-3 text-[12px] font-[600]">Commit fix</span>
                        <span className="btn-white inline-flex h-8 items-center gap-1 rounded-[12px] px-3 text-[12px] font-[550]"><RiCornerDownRightLine size={13} className="text-soft" />Reply</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </InView>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------- bento
function Tile({ i, className = '', title, line, children }: { i: number; className?: string; title: string; line: string; children: ReactNode }) {
  return (
    <InView i={i} className={className}>
      <div className="flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[var(--shadow-ring)]">
        <div className="relative flex-1 overflow-hidden bg-[#faf9f6] [background-image:radial-gradient(rgba(27,26,23,0.07)_1px,transparent_1.2px)] [background-size:14px_14px]">{children}</div>
        <div className="border-t border-line p-5">
          <div className="text-[16px] font-[600] tracking-[-0.01em]">{title}</div>
          <p className="mt-1 text-[14px] leading-[21px] text-sub">{line}</p>
        </div>
      </div>
    </InView>
  )
}
const RULES = [
  { r: 'Return Result<T>, never throw, in src/billing', n: 38 },
  { r: 'Money is integer cents, never floats', n: 22 },
  { r: 'Every webhook handler is idempotent', n: 17 },
]
export function Bento() {
  const [on, setOn] = useState([true, true, false])
  return (
    <Section>
      <div className={`${W} py-28`}>
        <InView><Lead ink="Reviews like your best senior engineer." muted="Without the two-day queue." /></InView>
        <div className="mt-12 grid grid-cols-3 grid-rows-[300px_300px] gap-4">
          <Tile i={1} className="col-span-2" title="Learns your conventions" line="Margin reads your merged history and holds new code to the rules your team already follows.">
            <div className="absolute inset-x-8 top-8 space-y-2.5">
              {RULES.map((r, i) => (
                <InView key={r.r} i={2 + i} y={12}>
                  <div className="flex h-12 items-center gap-3 rounded-[12px] bg-white px-4 shadow-[var(--shadow-ring)]">
                    <RiBookOpenLine size={16} className="text-soft" />
                    <span className="font-mono text-[12.5px] text-ink">{r.r}</span>
                    <span className="ml-auto text-[12px] text-soft">from {r.n} merged PRs · sample</span>
                  </div>
                </InView>
              ))}
            </div>
          </Tile>
          <Tile i={2} title="Asks before it guesses" line="When intent is unclear, it asks once instead of filing a wrong note.">
            <div className="absolute inset-x-6 top-8 space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[8px] bg-ink text-white"><Mark size={12} /></span>
                <div className="rounded-[14px] rounded-tl-[4px] bg-white px-3 py-2 text-[13px] leading-[19px] text-sub shadow-[var(--shadow-ring)]">Is <span className="font-mono text-[12px] text-ink">retry()</span> meant to run more than once per event?</div>
              </div>
              <div className="ml-10 rounded-[14px] rounded-tr-[4px] bg-ink px-3 py-2 text-[13px] leading-[19px] text-white">Yes, up to 5 times.</div>
              <div className="flex items-center gap-1.5 pl-8 text-[12px] text-soft"><RiCheckboxCircleFill size={14} className="text-green" />Noted for this repository</div>
            </div>
          </Tile>
          <Tile i={3} title="Severity you can trust" line="Three levels, the same everywhere. Blocking means it would break.">
            <div className="absolute inset-x-6 top-9 space-y-2">
              {([['Blocking', 'bg-red-tint text-red-text', 1], ['Should fix', 'bg-amber-tint text-amber-text', 2], ['Nit', 'bg-weak text-sub', 4]] as const).map(([l, c, n]) => (
                <div key={l} className="flex h-11 items-center rounded-[12px] bg-white px-3 shadow-[var(--shadow-ring)]">
                  <span className={`flex h-[22px] items-center rounded-[8px] px-2 text-[12px] font-[600] ${c}`}>{l}</span>
                  <span className="tnum ml-auto text-[13px] font-[600] text-ink">{n}</span>
                </div>
              ))}
            </div>
          </Tile>
          <Tile i={4} title="Stays out of the way" line="Quiet on drafts, strict on hotfixes. You set where it speaks up.">
            <div className="absolute inset-x-6 top-9 space-y-2">
              {['Skip nits on draft PRs', 'Blocking only on hotfix/*', 'Summarise PRs over 400 lines'].map((l, i) => (
                <button key={l} type="button" onClick={() => setOn((o) => o.map((v, j) => (j === i ? !v : v)))} aria-pressed={on[i]}
                  className="flex h-11 w-full items-center rounded-[12px] bg-white px-3 text-left text-[13px] text-ink shadow-[var(--shadow-ring)]">
                  {l}
                  <span className={`relative ml-auto flex h-5 w-9 items-center rounded-full px-0.5 transition-colors duration-200 ${on[i] ? 'justify-end bg-green' : 'justify-start bg-[#d9d5ce]'}`}>
                    <motion.span layout transition={spring} className="size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
                  </span>
                </button>
              ))}
            </div>
          </Tile>
          <Tile i={5} title="Lives in the pull request" line="Notes arrive as review comments. No new dashboard to check.">
            <div className="absolute inset-x-6 top-9 rounded-[14px] bg-white p-3 shadow-[var(--shadow-ring)]">
              <div className="flex items-center gap-2 text-[12px]">
                <RiGitPullRequestLine size={15} className="text-green" />
                <span className="font-[600]">#482</span><span className="truncate text-soft">Retry failed payment webhooks</span>
              </div>
              <div className="mt-3 space-y-1.5 text-[12px]">
                {[['Margin', 'requested changes', 'text-red-text'], ['CI', '14 of 14 checks passed', 'text-green-text'], ['You', 'committed the fix', 'text-sub']].map(([w, a, c]) => (
                  <div key={w} className="flex items-center gap-2"><span className="w-12 font-[600] text-ink">{w}</span><span className={c}>{a}</span></div>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------- story tabs (auto-advance with progress)
const STEPS = [
  { k: 'Opened', d: 'A pull request opens. Margin starts while CI is still installing dependencies.' },
  { k: 'Reviewed', d: 'Notes land on the lines that matter, ranked, with fixes where the fix is clear.' },
  { k: 'Merged', d: 'Blocking notes resolved, the reviewer approves knowing exactly what changed.' },
]
const DUR = 5.5
function StepPanel({ i }: { i: number }) {
  if (i === 0) return (
    <div className="space-y-2">
      {[['Install dependencies', 'done'], ['Typecheck', 'done'], ['Margin review', 'run'], ['Integration tests', 'run'], ['Deploy preview', 'wait']].map(([l, s]) => (
        <div key={l} className="flex h-11 items-center gap-3 rounded-[12px] bg-white px-4 text-[13.5px] shadow-[var(--shadow-ring)]">
          {s === 'done' ? <RiCheckboxCircleFill size={17} className="text-green" /> : s === 'run' ? <RiLoader4Line size={17} className="animate-spin text-[#c08a2a]" /> : <span className="size-[17px] rounded-full border-2 border-[#d9d5ce]" />}
          <span className={l === 'Margin review' ? 'font-[600]' : ''}>{l}</span>
          <span className="ml-auto text-[12px] text-soft">{s === 'done' ? 'passed' : s === 'run' ? 'running' : 'queued'}</span>
        </div>
      ))}
    </div>
  )
  if (i === 1) return (
    <div className="space-y-2.5">
      {[['Blocking', 'bg-red-tint text-red-text', 'retry.ts:20', 'A retry can charge twice. Pass the event id as the idempotency key.'], ['Should fix', 'bg-amber-tint text-amber-text', 'queue.ts:8', 'The queue is unbounded; cap it at the worker count.'], ['Nit', 'bg-weak text-sub', 'retry.ts:24', 'Add ±20% jitter to the backoff.']].map(([s, c, at, t]) => (
        <div key={at} className="rounded-[14px] bg-white p-3.5 shadow-[var(--shadow-ring)]">
          <div className="flex items-center gap-2 text-[11px]"><span className={`flex h-[20px] items-center rounded-[8px] px-1.5 font-[600] ${c}`}>{s}</span><span className="font-mono text-soft">{at}</span></div>
          <p className="mt-1.5 text-[13.5px] leading-[20px] text-sub">{t}</p>
        </div>
      ))}
    </div>
  )
  return (
    <div className="rounded-[16px] bg-white p-5 shadow-[var(--shadow-ring)]">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-[12px] bg-green-tint text-green"><RiGitMergeFill size={20} /></span>
        <div><div className="text-[15px] font-[600]">Ready to merge</div><div className="text-[13px] text-soft">3 of 3 notes resolved · 1 approval</div></div>
      </div>
      <div className="mt-4 space-y-2 text-[13px]">
        {['Blocking: idempotency key added', 'Should fix: queue capped at 8', 'Nit: jitter added'].map((l) => (
          <div key={l} className="flex items-center gap-2 text-sub"><RiCheckboxCircleFill size={15} className="text-green" />{l}</div>
        ))}
      </div>
      <div className="btn-green mt-5 flex h-10 items-center justify-center rounded-[12px] text-[14px] font-[600]">Squash and merge</div>
    </div>
  )
}
export function Story() {
  const [step, setStep] = useState(0)
  const still = useReducedMotion()
  useEffect(() => {
    if (still) return
    const id = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), DUR * 1000)
    return () => clearTimeout(id)
  }, [step, still])
  return (
    <Section>
      <div className={`${W} py-28`}>
        <InView><Lead ink="From opened to merged" muted="in one review pass." /></InView>
        <div className="mt-12 grid grid-cols-[420px_1fr] gap-12">
          <div className="space-y-2">
            {STEPS.map((s, i) => (
              <InView key={s.k} i={i + 1}>
                <button type="button" onClick={() => setStep(i)} aria-pressed={step === i}
                  className={`relative w-full overflow-hidden rounded-[16px] p-5 text-left transition-colors duration-300 ${step === i ? 'bg-white shadow-[var(--shadow-ring)]' : 'hover:bg-white/60'}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] text-soft">0{i + 1}</span>
                    <span className="text-[18px] font-[600] tracking-[-0.015em]">{s.k}</span>
                  </div>
                  <motion.div initial={false} animate={{ height: step === i ? 'auto' : 0, opacity: step === i ? 1 : 0 }} transition={{ duration: 0.45, ease: ease.outQuint }}
                    className="overflow-hidden pl-8 text-[15px] leading-[23px] text-sub"><p className="pt-2">{s.d}</p></motion.div>
                  {step === i && !still && (
                    <motion.span key={`bar-${step}`} className="absolute bottom-0 left-0 h-[2px] bg-green" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: DUR, ease: 'linear' }} />
                  )}
                </button>
              </InView>
            ))}
          </div>
          <InView i={2}>
            <div className="relative h-[380px] overflow-hidden rounded-[22px] bg-white/55 p-1.5 shadow-[var(--shadow-frame)]">
              <div className="h-full rounded-[16px] bg-[#faf9f6] p-6 [background-image:radial-gradient(rgba(27,26,23,0.07)_1px,transparent_1.2px)] [background-size:14px_14px]">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: ease.outExpo }}>
                    <StepPanel i={step} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </InView>
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------- breather
export function Breather() {
  return (
    <Section>
      <div className={`${W} py-32`}>
        <InView className="mx-auto max-w-[880px]">
          <p className="text-balance text-center text-[40px] font-[540] leading-[1.18] tracking-[-0.028em] text-ink">
            Margin never approves a pull request. <span className="text-[#8b867d]">It makes sure the person who does already knows where to look.</span>
          </p>
        </InView>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------- closing CTA
export function Closing() {
  return (
    <Section>
      <div className={`${W} relative py-32 text-center`}>
        <InView><h2 className="text-[56px] font-[560] leading-[1.04] tracking-[-0.04em]">Put a senior reviewer<br />on every pull request</h2></InView>
        <InView i={1}><p className="mt-5 text-[18px] leading-7 text-sub">Install the GitHub app, open a PR, read the first notes in minutes.</p></InView>
        <InView i={2}>
          <div className="mt-9 flex items-center justify-center gap-3">
            <motion.a whileTap={{ scale: 0.98 }} href="#" className="btn-green flex h-11 items-center gap-2 rounded-[14px] px-5 text-[15px] font-[600]"><RiGithubFill size={18} />Install the GitHub app</motion.a>
            <motion.a whileTap={{ scale: 0.98 }} href="#" className="btn-white flex h-11 items-center rounded-[14px] px-5 text-[15px] font-[600]">Book a demo</motion.a>
          </div>
        </InView>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------- footer
const COLS: [string, string[]][] = [
  ['Product', ['Review', 'Conventions', 'Severity', 'Changelog']],
  ['Developers', ['Docs', 'API', 'GitHub app', 'Status']],
  ['Company', ['About', 'Careers', 'Blog', 'Contact']],
  ['Resources', ['Guides', 'Security', 'Self-hosting', 'Brand']],
  ['Legal', ['Privacy', 'Terms', 'DPA']],
]
export function Footer() {
  return (
    <footer className="relative">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-rail" />
      {[120, 1320].map((x) => <span key={x} aria-hidden className="absolute -top-[3px] size-[7px] rounded-[2px] bg-canvas shadow-[0_0_0_1px_#cfcbc3]" style={{ left: x - 3 }} />)}
      <div className={`${W} pb-12 pt-16`}>
        <div className="grid grid-cols-[1.4fr_repeat(5,1fr)] gap-8">
          <div>
            <div className="flex items-center gap-2"><RiQuillPenAiFill size={22} /><span className="text-[20px] font-[600] tracking-[-0.03em]">Margin</span></div>
            <p className="mt-3 max-w-[240px] text-[14px] leading-[21px] text-sub">AI code review with notes in the margin.</p>
          </div>
          {COLS.map(([h, ls]) => (
            <div key={h}>
              <div className="text-[13px] font-[600] text-ink">{h}</div>
              <ul className="mt-3 space-y-2">{ls.map((l) => <li key={l}><a href="#" className="text-[14px] text-sub transition-colors duration-200 hover:text-ink">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex items-center border-t border-line pt-6 text-[13px] text-soft">
          <span>© 2026 Margin. Concept site; all product data shown is sample data.</span>
          <span className="ml-auto flex items-center gap-1.5"><RiChat3Line size={14} />Made for teams who read every diff</span>
        </div>
      </div>
    </footer>
  )
}
