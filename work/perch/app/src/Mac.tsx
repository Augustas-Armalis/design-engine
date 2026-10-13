// The hero object: one MacBook display, tilted back in 3D, with Perch living in the notch.
// Story in one moment: the shelf grows out of the notch (Dynamic Island spring), five clips arrive, the screenshot lifts
// out and is dragged into the open document, which lights its drop zone. Sample content; Draftboard is fictional.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Battery, ClipboardList, Image, Layers, Pin, Search, Wifi } from 'lucide-react'
import { siApple } from 'simple-icons'
import Wallpaper from './Wallpaper'
import { ease } from './motion'

const W = 1152, SHELF = 664, CARD = 112, GAP = 10
const shelfX = (W - SHELF) / 2
const cardX = (i: number) => (SHELF - (5 * CARD + 4 * GAP)) / 2 + i * (CARD + GAP)
type Phase = 'closed' | 'open' | 'lift' | 'drag' | 'hover'

function Apple({ s = 14 }: { s?: number }) { return <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden><path d={siApple.path} fill="currentColor" /></svg> }

/* macOS arrow cursor: black body, white outline */
function Cursor() {
  return <svg width="22" height="30" viewBox="0 0 22 30" aria-hidden className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"><path d="M2 2 L2 23 L7.4 17.8 L11 26.6 L14.6 25 L11 16.4 L18.6 16.4 Z" fill="#000" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}

function Thumb({ i }: { i: number }) {
  if (i === 0) return ( // screenshot: a tiny pricing page
    <div className="relative size-full overflow-hidden bg-[#f6f6f8] p-1.5">
      <div className="mx-auto h-[5px] w-10 rounded-full bg-[#1d1d1f]" />
      <div className="mt-1.5 grid grid-cols-3 gap-1">{[0, 1, 2].map((k) => <div key={k} className={`h-[34px] rounded-[4px] ${k === 1 ? 'bg-[#1d1d1f]' : 'bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12)]'}`}><div className={`mx-1 mt-1.5 h-[3px] w-5 rounded-full ${k === 1 ? 'bg-[#ff6a3d]' : 'bg-[#d4d4d8]'}`} /><div className={`mx-1 mt-1 h-[5px] w-7 rounded-full ${k === 1 ? 'bg-white' : 'bg-[#1d1d1f]'}`} /></div>)}</div>
    </div>
  )
  if (i === 1) return ( // link
    <div className="flex size-full flex-col justify-between bg-[linear-gradient(160deg,#2c2c30,#1a1a1d)] p-2">
      <span className="grid size-5 place-items-center rounded-[6px] bg-white text-[9px] font-[700] text-[#1d1d1f]">A</span>
      <span className="text-[10.5px] font-[500] leading-[13px] text-white/85">arcline.app/<br />pricing</span>
    </div>
  )
  if (i === 2) return <div className="flex size-full items-end bg-[#ff6a3d] p-2"><span className="font-mono text-[10.5px] font-[500] text-white">#FF6A3D</span></div>
  if (i === 3) return <div className="size-full bg-[#2a2a2e] p-2 text-[10.5px] leading-[14px] text-white/80">“Ship pricing Friday. Lena sends copy Wed.”</div>
  return ( // file
    <div className="grid size-full place-items-center bg-[#2a2a2e]">
      <span className="relative h-[46px] w-[36px] rounded-[5px] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]"><span className="absolute bottom-1.5 left-1 rounded-[3px] bg-[#e5484d] px-1 text-[7px] font-[700] text-white">PDF</span><span className="absolute left-1.5 top-2 h-[2px] w-5 rounded-full bg-[#d4d4d8]" /><span className="absolute left-1.5 top-[13px] h-[2px] w-4 rounded-full bg-[#d4d4d8]" /></span>
    </div>
  )
}
const META = [['Screenshot', 'PNG · 2s ago'], ['Pricing v3', 'Link · 1m'], ['Accent', 'Colour · 3m'], ['Lena', 'Text · 5m'], ['Board deck', 'PDF · 4.2 MB']]

function Card({ i, ghost }: { i: number; ghost?: boolean }) {
  if (ghost) return <div className="h-[124px] w-[112px] rounded-[16px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] [background:repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0_6px,transparent_6px_12px)]" />
  return (
    <div className="h-[124px] w-[112px] rounded-[16px] bg-[#1c1c1f] p-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="h-[72px] overflow-hidden rounded-[11px]"><Thumb i={i} /></div>
      <div className="px-1.5 pt-2"><div className="truncate text-[12px] font-[500] leading-[15px] text-white">{META[i][0]}</div><div className="truncate text-[11px] leading-[14px] text-white/45">{META[i][1]}</div></div>
    </div>
  )
}

export default function Mac({ at }: { at: number }) {
  const still = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(still ? 'hover' : 'closed')
  useEffect(() => {
    if (still) return
    const steps: [Phase, number][] = [['open', at + 0.9], ['lift', at + 2.5], ['drag', at + 2.85], ['hover', at + 3.75]]
    const ids = steps.map(([p, t]) => window.setTimeout(() => setPhase(p), t * 1000))
    return () => ids.forEach(clearTimeout)
  }, [at, still])
  const open = phase !== 'closed'
  const lifted = phase === 'lift' || phase === 'drag' || phase === 'hover'
  const cardHome = { x: shelfX + cardX(0), y: 46 }
  const dropAt = { x: 150, y: 270 }

  return (
    <div className="relative" style={{ perspective: 2400, perspectiveOrigin: '50% 0%' }}>
      <motion.div style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
        initial={still ? false : { rotateX: 14, y: 90, opacity: 0 }} animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ rotateX: { delay: at, duration: 1.6, ease: ease.reveal }, y: { delay: at, duration: 1.6, ease: ease.reveal }, opacity: { delay: at, duration: 0.6 } }}>
        {/* lid: space-black bezel, aluminium rim, one soft floor shadow */}
        <div className="relative w-[1180px] rounded-[38px] bg-[linear-gradient(180deg,#141416,#0a0a0b)] p-[14px] shadow-[0_0_0_1.5px_#c3c3c8,0_0_0_2.5px_#8e8e93,inset_0_0_0_1px_rgba(255,255,255,0.06),0_50px_100px_-40px_rgba(30,20,40,0.45)]">
          <div className="relative h-[740px] overflow-hidden rounded-[24px] bg-black">
            <Wallpaper />

            {/* menu bar */}
            <div className="absolute inset-x-0 top-0 flex h-[30px] items-center gap-5 bg-white/[0.16] px-4 text-[13px] font-[500] text-white backdrop-blur-xl" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.12)' }}>
              <Apple /><span className="font-[650]">Draftboard</span>
              {['File', 'Edit'].map((m) => <span key={m} className="text-white/95">{m}</span>)}
              <span className="ml-auto flex items-center gap-4">
                <span className="grid h-[18px] w-[22px] place-items-center rounded-[5px] bg-white/25"><span className="h-[5px] w-[12px] rounded-b-[3px] bg-white" /></span>
                <Wifi size={15} strokeWidth={2.2} /><Battery size={19} strokeWidth={1.8} /><span className="tnum">Tue 13 Oct  9:41</span>
              </span>
            </div>

            {/* desktop files on the right edge (what Perch replaces) */}
            <div className="absolute right-7 top-[64px] flex flex-col items-center gap-5">
              {['Screenshot 9.38', 'Screenshot 9.40'].map((n) => (
                <div key={n} className="flex w-[84px] flex-col items-center gap-1.5">
                  <div className="h-[50px] w-[64px] rounded-[5px] bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.25)]"><div className="size-full rounded-[3px] bg-[#f3f4f7] p-1"><div className="h-[3px] w-5 rounded-full bg-[#1d1d1f]" /><div className="mt-1 grid grid-cols-3 gap-[2px]"><div className="h-4 rounded-[2px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.15)]" /><div className="h-4 rounded-[2px] bg-[#1d1d1f]" /><div className="h-4 rounded-[2px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.15)]" /></div></div></div>
                  <span className="rounded-[4px] px-1 text-center text-[11px] font-[500] leading-[13px] text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{n}.png</span>
                </div>
              ))}
            </div>

            {/* the document window: drop target */}
            <div className="absolute left-[64px] top-[152px] h-[520px] w-[600px] overflow-hidden rounded-[14px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.3),0_22px_70px_-10px_rgba(0,0,0,0.55)]">
              <div className="flex h-[40px] items-center gap-2 border-b border-black/[0.07] bg-[#f6f6f7] px-3.5">
                <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" /><span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" /><span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
                <span className="ml-3 text-[13px] font-[600] text-[#3a3a3c]">Launch notes</span><span className="text-[13px] text-[#6e6e73]">— Edited</span>
              </div>
              <div className="px-9 pt-6">
                <div className="text-[22px] font-[650] tracking-[-0.02em] text-[#1d1d1f]">Pricing page, Friday</div>
                <motion.div animate={{ backgroundColor: phase === 'hover' ? 'rgba(255,106,61,0.08)' : 'rgba(0,0,0,0.025)', boxShadow: phase === 'hover' ? 'inset 0 0 0 1.5px #ff6a3d' : 'inset 0 0 0 1px rgba(0,0,0,0.08)' }} transition={{ duration: 0.25 }}
                  className="mt-4 flex h-[150px] w-[380px] items-center justify-end rounded-[14px] pr-6">
                  <span className={`text-[13px] font-[500] ${phase === 'hover' ? 'text-[#c2410c]' : 'text-[#6e6e73]'}`}>{phase === 'hover' ? 'Drop to insert image' : 'Hero screenshot'}</span>
                </motion.div>
                <p className="mt-4 max-w-[420px] text-[14px] leading-[22px] text-[#48484a]">Final copy from Lena on Wednesday. Hero uses the new accent; the comparison table moves below the fold.</p>
              </div>
            </div>

            {/* the shelf: grows out of the notch */}
            <motion.div className="absolute top-0 z-20 overflow-hidden bg-black" style={{ left: '50%', x: '-50%' }}
              initial={false} animate={open ? { width: SHELF, height: 214, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 } : { width: 196, height: 32, borderBottomLeftRadius: 13, borderBottomRightRadius: 13 }}
              transition={{ type: 'spring', stiffness: 230, damping: 26, mass: 1 }}>
              <span className="absolute left-1/2 top-[11px] size-[9px] -translate-x-1/2 rounded-full bg-[#141418] shadow-[inset_0_0_0_1.5px_#26262c]"><span className="absolute left-[2px] top-[2px] size-[2px] rounded-full bg-[#4b5a8a]" /></span>
              <AnimatePresence>
                {open && (
                  <motion.div key="in" className="absolute inset-0" initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.18, duration: 0.4 }}>
                    <div className="absolute left-[22px] top-[9px] flex items-center gap-4 text-[12.5px] font-[500]">
                      <span className="flex items-center gap-1.5 text-white"><ClipboardList size={13} strokeWidth={2} />Clipboard <span className="text-white/40">24</span></span>
                      <span className="flex items-center gap-1.5 text-white/50"><Layers size={13} strokeWidth={2} />Shelf <span className="text-white/30">3</span></span>
                      <span className="flex items-center gap-1.5 text-white/50"><Image size={13} strokeWidth={2} />Shots <span className="text-white/30">6</span></span>
                    </div>
                    <div className="absolute right-[22px] top-[9px] flex items-center gap-3.5 text-white/55"><Search size={13} strokeWidth={2} /><Pin size={13} strokeWidth={2} /></div>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div key={i} className="absolute top-[46px]" style={{ left: cardX(i) }} initial={{ opacity: 0, y: -14, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.28 + i * 0.06, type: 'spring', stiffness: 380, damping: 30 }}>
                        <Card i={i} ghost={i === 0 && lifted} />
                      </motion.div>
                    ))}
                    <div className="absolute inset-x-[22px] bottom-[11px] flex items-center justify-between text-[11px] text-white/40">
                      <span>Drag anything out · Space to preview</span><span className="flex items-center gap-1"><kbd className="rounded-[4px] bg-white/10 px-1 font-sans">⌘</kbd><kbd className="rounded-[4px] bg-white/10 px-1 font-sans">⇧</kbd><kbd className="rounded-[4px] bg-white/10 px-1 font-sans">V</kbd>paste stack</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* the dragged clip + cursor */}
            <AnimatePresence>
              {lifted && (
                <motion.div key="drag" className="absolute z-30" initial={{ x: cardHome.x, y: cardHome.y, rotate: 0, scale: 1 }}
                  animate={phase === 'lift' ? { x: cardHome.x + 4, y: cardHome.y + 18, rotate: -1, scale: 1.06 } : { x: dropAt.x, y: dropAt.y, rotate: -2, scale: 1.04 }}
                  transition={phase === 'lift' ? { duration: 0.35, ease: ease.outQuint } : { duration: 0.9, ease: [0.45, 0, 0.2, 1] }}>
                  <div className="shadow-[0_24px_40px_-12px_rgba(0,0,0,0.55),0_8px_14px_-6px_rgba(0,0,0,0.35)] rounded-[16px]"><Card i={0} /></div>
                  <span className="absolute -right-2 -top-2 grid size-[22px] place-items-center rounded-full bg-[#28c840] text-[15px] font-[700] leading-none text-white shadow-[0_0_0_2px_#fff,0_2px_4px_rgba(0,0,0,0.3)]">+</span>
                  <span className="absolute left-[58px] top-[40px]"><Cursor /></span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
