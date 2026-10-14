// Kite landing page (fictional edge network; every product screen is the real dashboard build, sample data).
// Hero: Title Case 2-line headline, hand-set 2-line subtitle, bevelled white pill + tactile secondary, the live
// dashboard straight-on in a 3-edge frame (ring, top light, deep drop) that plays its own load-in. Then a bento of the
// product's real pieces, how it works, a closing CTA over the dot world, footer.
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, MotionConfig, useInView } from 'motion/react'
import { ArrowRight, ArrowUpRight, Check, GitBranch, Globe, Rocket, RotateCcw, Shield, Terminal, Zap } from 'lucide-react'
import App from './App'
import Map from './Map'
import Chart from './Chart'
import Field from './Field'
import Wordmark from './Wordmark'
import { deployments } from './data'
import { ease } from './anim'

const Word = ({ children, i }: { children: ReactNode; i: number }) => (
  <motion.span className="inline-block" initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.15 + i * 0.07, duration: 1.1, ease: ease.out }}>{children}</motion.span>
)
const Up = ({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: at, duration: 1.0, ease: ease.out }}>{children}</motion.div>
)
/** scroll reveal: mounts its children when 25% visible, so product pieces play their own load-in in view */
function InView({ children, className = '', mount = false }: { children: ReactNode; className?: string; mount?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.25 })
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 28 }} animate={seen ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.0, ease: ease.out }}>{mount ? (seen ? children : null) : children}</motion.div>
}
const Primary = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <a href="#" className={`st flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#fff,#dcdcde)] font-[600] text-[#0a0a0b] shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_1px_0_#fff,0_8px_20px_-8px_rgb(255_255_255/0.25)] hover:bg-white ${className}`}>{children}</a>
)
const Secondary = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <a href="#" className={`st btn-tactile flex items-center gap-2 rounded-full font-[550] text-[var(--ink)] ${className}`}>{children}</a>
)

function Bento({ title, body, icon: Ic, className = '', children }: { title: string; body: string; icon: typeof Zap; className?: string; children: ReactNode }) {
  return (
    <InView className={`card-surface relative overflow-hidden rounded-[22px] shadow-[var(--card)] ${className}`}>
      <div className="relative z-10 p-6 pb-0">
        <div className="flex items-center gap-2.5"><span className="tile grid size-7 place-items-center rounded-[8px] text-[var(--sub)]"><Ic size={14} strokeWidth={1.9} /></span><h3 className="text-[15px] font-[600]">{title}</h3></div>
        <p className="mt-2 max-w-[380px] text-[14px] leading-[21px] text-[var(--sub)]">{body}</p>
      </div>
      {children}
    </InView>
  )
}

export default function Landing() {
  const [dash, setDash] = useState(false)
  useEffect(() => { const id = window.setTimeout(() => setDash(true), 650); return () => clearTimeout(id) }, [])
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto w-[1440px] overflow-hidden bg-[var(--canvas)]">
        {/* nav */}
        <header className="absolute inset-x-0 top-0 z-30 mx-auto flex h-[72px] max-w-[1200px] items-center">
          <Up at={0.05}><a href="#" className="flex h-10 items-center"><Wordmark size={24} /></a></Up>
          <nav aria-label="Main" className="absolute left-1/2 -translate-x-1/2">
            <Up at={0.1}><ul className="flex items-center gap-1 text-[14px] font-[500] text-[var(--sub)]">{['Product', 'Regions', 'Pricing', 'Docs', 'Changelog'].map((l) => <li key={l}><a href="#" className="st flex h-9 items-center rounded-[10px] px-3.5 hover:bg-[var(--hover)] hover:text-[var(--ink)]">{l}</a></li>)}</ul></Up>
          </nav>
          <Up at={0.15} className="ml-auto flex items-center gap-2">
            <a href="#" className="st flex h-9 items-center rounded-[10px] px-3.5 text-[14px] font-[500] text-[var(--sub)] hover:text-[var(--ink)]">Sign in</a>
            <Primary className="h-9 px-4 text-[14px]">Start deploying</Primary>
          </Up>
        </header>

        {/* hero */}
        <section className="relative pt-[148px]">
          <Field id="hero" opacity={0.11} />
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="text-[76px] font-[560] leading-[1.0] tracking-[-0.045em]" style={{ fontVariationSettings: '"wdth" 108' }}>
              <Word i={0}>The</Word> <Word i={1}>Edge</Word> <Word i={2}>Network</Word><br />
              <span className="text-[var(--sub)]"><Word i={3}>That</Word> <Word i={4}>Tells</Word> <Word i={5}>You</Word> <Word i={6}>Why.</Word></span>
            </h1>
            <Up at={0.6} className="mt-6"><p className="text-[19px] leading-[29px] text-[var(--sub)]">Kite runs your app in ten regions and points at the one<br />that needs you, with the fix one click away.</p></Up>
            <Up at={0.72} className="mt-9 flex items-center gap-3">
              <Primary className="h-12 px-6 text-[15px]">Start deploying<ArrowRight size={16} strokeWidth={2.2} /></Primary>
              <Secondary className="h-12 px-6 text-[15px]">See the live demo</Secondary>
            </Up>
            <Up at={0.82} className="mt-4 text-[13px] text-[var(--soft)]">Free for hobby projects · No credit card</Up>
          </div>
          {/* the product, straight-on, in a 3-edge frame; it plays its own load-in once the copy has landed */}
          <motion.div className="relative z-10 mx-auto mt-[76px] w-[1180px] rounded-[26px] p-2" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.4, ease: ease.out }}
            style={{ background: 'linear-gradient(180deg, rgb(255 255 255 / 0.07), rgb(255 255 255 / 0.02))', boxShadow: '0 0 0 1px rgb(255 255 255 / 0.08), inset 0 1px 0 rgb(255 255 255 / 0.1), 0 40px 120px -30px rgb(0 0 0 / 0.9)' }}>
            <div role="img" aria-label="The Kite dashboard: traffic by region, latency and deployments, sample data" inert className="overflow-hidden rounded-[18px] shadow-[0_0_0_1px_rgb(0_0_0/0.6)]" style={{ height: 900 * (1164 / 1440) }}>
              <div style={{ zoom: 1164 / 1440 }}>{dash ? <App embedded /> : <div className="h-[900px] w-[1440px] bg-[var(--canvas)]" />}</div>
            </div>
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[220px] bg-[linear-gradient(180deg,transparent,var(--canvas))]" />
        </section>

        {/* value strip */}
        <section className="mx-auto mt-6 grid max-w-[1200px] grid-cols-4 gap-px overflow-hidden rounded-[18px] bg-[var(--div)] shadow-[var(--card)]">
          {[[Globe, 'Ten edge regions', 'Requests land within 40 ms of most users.'], [Rocket, 'Deploys in under a minute', 'Every push builds once and ships everywhere.'], [RotateCcw, 'Instant rollback', 'Any deploy, any region, back in one click.'], [Shield, 'Firewall at the edge', 'Bad traffic stops before it reaches you.']].map(([Ic, t, b]) => {
            const I2 = Ic as typeof Zap
            return <InView key={t as string} className="card-surface p-6"><I2 size={16} strokeWidth={1.9} className="text-[var(--sub)]" /><div className="mt-4 text-[15px] font-[600]">{t as string}</div><div className="mt-1 text-[14px] leading-[20px] text-[var(--sub)]">{b as string}</div></InView>
          })}
        </section>

        {/* bento */}
        <section className="mx-auto mt-[150px] max-w-[1200px]">
          <InView className="text-center">
            <h2 className="text-[52px] font-[560] leading-[1.04] tracking-[-0.04em]" style={{ fontVariationSettings: '"wdth" 106' }}>Every Region, One Calm Screen.</h2>
            <p className="mx-auto mt-4 text-[18px] leading-[28px] text-[var(--sub)]">The map, the latency and the deploy that caused it,<br />side by side, so the answer is on the screen before you ask.</p>
          </InView>
          <div className="mt-14 grid grid-cols-12 gap-4">
            <Bento className="col-span-7 h-[470px]" icon={Globe} title="Live traffic, by region" body="Requests per second for every region, drawn as they happen. The one that needs you turns red.">
              <div className="absolute inset-x-6 bottom-4" style={{ zoom: 0.92 }}><Map at={0.2} /></div>
            </Bento>
            <Bento className="col-span-5 h-[470px]" icon={Zap} title="The fix, one click away" body="Kite knows which deploy caused the spike and which region has headroom, and offers the reroute.">
              <div className="absolute inset-x-6 bottom-6 rounded-[14px] bg-[linear-gradient(180deg,rgb(255_107_94/0.12),rgb(255_107_94/0.05))] p-4 shadow-[inset_0_0_0_1px_rgb(255_107_94/0.2),inset_0_1px_0_rgb(255_255_255/0.04)]">
                <div className="flex items-center gap-2 text-[14px] font-[600]"><span className="size-1.5 rounded-full bg-[var(--red)]" />sin1 p95 is 3.3x its baseline</div>
                <div className="mt-1 text-[13px] leading-[19px] text-[var(--sub)]">Since deploy #4127 at 13:52. hkg1 has 41% headroom at 36 ms.</div>
                <div className="mt-3 flex gap-2"><span className="flex h-8 items-center rounded-full bg-[linear-gradient(180deg,#fff,#dcdcde)] px-3.5 text-[13px] font-[600] text-[#0a0a0b] shadow-[0_0_0_1px_rgb(0_0_0/0.6),inset_0_1px_0_#fff]">Shift 30% to hkg1</span><span className="btn-tactile flex h-8 items-center rounded-full px-3.5 text-[13px] font-[550] text-[var(--sub)]">Open trace</span></div>
                <div className="mt-4 space-y-1.5">
                  {[['sin1', 'Singapore', 124, true], ['hkg1', 'Hong Kong', 36, false], ['hnd1', 'Tokyo', 30, false]].map(([c, n, ms, bad]) => (
                    <div key={c as string} className="grid h-8 grid-cols-[46px_1fr_auto] items-center gap-2 rounded-[8px] bg-[rgb(0_0_0/0.25)] px-2.5 text-[13px]"><span className={`mono ${bad ? 'text-[var(--red)]' : 'text-[var(--sub)]'}`}>{c as string}</span><span>{n as string}</span><span className={`tnum font-[550] ${bad ? 'text-[var(--red)]' : ''}`}>{ms as number}<span className="text-[11px] text-[var(--soft)]"> ms</span></span></div>
                  ))}
                </div>
              </div>
            </Bento>
            <Bento className="col-span-5 h-[330px]" icon={RotateCcw} title="Rollback in one second" body="Every deploy stays warm in every region. Going back is a pointer move, not a rebuild.">
              <div className="absolute inset-x-6 bottom-6 space-y-1">
                {deployments.slice(0, 3).map((d, i) => (
                  <div key={d.id} className={`flex h-[52px] items-center gap-3 rounded-[10px] px-3 ${i === 1 ? 'bg-[rgb(255_255_255/0.05)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]' : ''}`}>
                    <span className={`size-2 rounded-full ${d.state === 'rolled-back' ? 'bg-[var(--red)]' : 'bg-[var(--sub)] opacity-60'}`} />
                    <span className="min-w-0 flex-1 leading-[17px]"><span className="block truncate text-[13px] font-[550]">{d.msg}</span><span className="mono block text-[11.5px] text-[var(--soft)]">{d.id} · {d.sha}</span></span>
                    {i === 1 ? <span className="flex h-7 items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#fff,#dcdcde)] px-3 text-[12px] font-[600] text-[#0a0a0b]"><RotateCcw size={12} strokeWidth={2.4} />Rolled back</span> : <span className="tnum text-[12px] text-[var(--soft)]">{d.ago}</span>}
                  </div>
                ))}
              </div>
            </Bento>
            <Bento className="col-span-7 h-[330px]" icon={Zap} title="Latency, with the deploy that moved it" body="p50, p95 and p99 over time, with every deploy marked on the floor of the chart.">
              <InView mount className="absolute inset-x-6 bottom-5 h-[162px]"><div style={{ zoom: 0.94 }}><Chart at={0.1} /></div></InView>
            </Bento>
          </div>
        </section>

        {/* how it works */}
        <section className="mx-auto mt-[150px] max-w-[1200px]">
          <InView><h2 className="text-[44px] font-[560] leading-[1.06] tracking-[-0.04em]" style={{ fontVariationSettings: '"wdth" 106' }}>From Push To Ten Regions.</h2></InView>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: '01', t: 'Connect a repo', b: 'Point Kite at a GitHub repo. Every branch gets a preview URL.', v: <div className="flex items-center gap-2 rounded-[10px] bg-[rgb(0_0_0/0.3)] px-3 py-2.5 text-[13px] shadow-[inset_0_0_0_1px_var(--line)]"><GitBranch size={14} className="text-[var(--sub)]" /><span className="mono text-[var(--sub)]">storefront</span><span className="text-[var(--faint)]">/</span><span className="mono">main</span><span className="ml-auto flex items-center gap-1 text-[12px] text-[var(--sub)]"><Check size={13} />connected</span></div> },
              { n: '02', t: 'Deploy everywhere', b: 'One command builds once and ships to all ten regions.', v: <div className="mono rounded-[10px] bg-[rgb(0_0_0/0.35)] px-3 py-2.5 text-[12.5px] leading-[20px] shadow-[inset_0_0_0_1px_var(--line)]"><div className="text-[var(--soft)]"><Terminal size={12} className="mr-1.5 inline" />~/storefront</div><div><span className="text-[var(--soft)]">$</span> kite deploy</div><div className="text-[var(--sub)]">✓ built in 21s · 10/10 regions live</div></div> },
              { n: '03', t: 'Watch it, fix it', b: 'When a region drifts, Kite says why and offers the fix.', v: <div className="flex items-center gap-2 rounded-[10px] bg-[rgb(255_107_94/0.08)] px-3 py-2.5 text-[13px] shadow-[inset_0_0_0_1px_rgb(255_107_94/0.18)]"><span className="size-1.5 rounded-full bg-[var(--red)]" /><span>sin1 slowed after #4127</span><span className="ml-auto flex items-center gap-1 text-[12px] font-[550]">Reroute<ArrowUpRight size={12} /></span></div> },
            ].map((s) => (
              <InView key={s.n} className="card-surface rounded-[20px] p-6 shadow-[var(--card)]">
                <span className="mono text-[var(--soft)]">{s.n}</span>
                <div className="mt-6 text-[17px] font-[600]">{s.t}</div>
                <div className="mt-1.5 text-[14px] leading-[21px] text-[var(--sub)]">{s.b}</div>
                <div className="mt-6">{s.v}</div>
              </InView>
            ))}
          </div>
        </section>

        {/* closing CTA */}
        <section className="relative mt-[150px] h-[560px] overflow-hidden">
          <Field id="cta" h={560} step={6.5} opacity={0.14} />
          <InView className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h2 className="text-[64px] font-[560] leading-[1.02] tracking-[-0.045em]" style={{ fontVariationSettings: '"wdth" 108' }}>Deploy Once.<br /><span className="text-[var(--sub)]">Be Everywhere.</span></h2>
            <div className="mt-9 flex items-center gap-3"><Primary className="h-12 px-6 text-[15px]">Start deploying<ArrowRight size={16} strokeWidth={2.2} /></Primary><Secondary className="h-12 px-6 text-[15px]">Talk to us</Secondary></div>
          </InView>
        </section>

        {/* footer */}
        <footer className="mx-auto flex max-w-[1200px] items-start gap-16 border-t border-[var(--div)] pb-16 pt-12 text-[14px]">
          <div className="flex-1"><Wordmark size={22} /><p className="mt-3 max-w-[260px] text-[13px] leading-[20px] text-[var(--soft)]">The edge network that tells you why. A fictional product; all data shown is sample data.</p></div>
          {[['Product', ['Regions', 'Deployments', 'Analytics', 'Firewall']], ['Developers', ['Docs', 'CLI', 'API', 'Status']], ['Company', ['About', 'Blog', 'Careers', 'Contact']]].map(([h, ls]) => (
            <div key={h as string}><div className="text-[13px] font-[600]">{h as string}</div><ul className="mt-3 space-y-2 text-[var(--sub)]">{(ls as string[]).map((l) => <li key={l}><a href="#" className="hover:text-[var(--ink)]">{l}</a></li>)}</ul></div>
          ))}
        </footer>
      </div>
    </MotionConfig>
  )
}
