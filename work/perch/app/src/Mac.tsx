// The hero object: one MacBook display, straight-on, with Perch living in the notch.
// One moment, drawn the way macOS draws it: the shelf springs out of the notch, the screenshot's card dims as its
// translucent drag image lifts out, the cursor carries it into the document, and a system-blue insertion line opens
// between two paragraphs. Then it drops in, and the loop restarts. Sample content; Draftboard is fictional.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Battery, ClipboardList, Image, Layers, Pin, Search, Share, Wifi } from 'lucide-react'
import { siApple } from 'simple-icons'
import Wallpaper from './Wallpaper'
import { ease } from './motion'

const W = 1152, SHELF = 664, CARD = 112, GAP = 10
const shelfX = (W - SHELF) / 2
const cardX = (i: number) => (SHELF - (5 * CARD + 4 * GAP)) / 2 + i * (CARD + GAP)
const WIN = { x: 112, y: 232, w: 560 }
type Phase = 'closed' | 'open' | 'lift' | 'drag' | 'hover' | 'drop'

function Apple({ s = 14 }: { s?: number }) { return <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden><path d={siApple.path} fill="currentColor" /></svg> }

/* macOS arrow cursor */
function Cursor() {
  return <svg width="20" height="28" viewBox="0 0 22 30" aria-hidden className="drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.35)]"><path d="M2 2 L2 23 L7.4 17.8 L11 26.6 L14.6 25 L11 16.4 L18.6 16.4 Z" fill="#000" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
}

/* the screenshot itself, drawn once at 176x110 and scaled wherever it appears (shelf card, drag image, inserted image) */
function Shot() {
  return (
    <div className="relative h-[110px] w-[176px] overflow-hidden bg-white">
      <div className="flex h-[14px] items-center gap-1.5 px-2.5"><span className="size-[5px] rounded-[2px] bg-[#1d1d1f]" /><span className="h-[3px] w-6 rounded-full bg-[#1d1d1f]" /><span className="ml-auto h-[3px] w-5 rounded-full bg-[#c7c7cc]" /><span className="h-[3px] w-5 rounded-full bg-[#c7c7cc]" /><span className="h-[7px] w-9 rounded-[3px] bg-[#1d1d1f]" /></div>
      <div className="mt-[7px] flex flex-col items-center gap-[3px]"><span className="h-[6px] w-[86px] rounded-full bg-[#1d1d1f]" /><span className="h-[6px] w-[60px] rounded-full bg-[#1d1d1f]" /><span className="mt-[2px] h-[3px] w-[70px] rounded-full bg-[#c7c7cc]" /></div>
      <div className="mt-[9px] grid grid-cols-3 gap-[5px] px-[14px]">
        {[0, 1, 2].map((k) => (
          <div key={k} className={`h-[52px] rounded-[5px] p-[5px] ${k === 1 ? 'bg-[#1d1d1f]' : 'bg-[#f5f5f7]'}`}>
            <span className={`block h-[3px] w-6 rounded-full ${k === 1 ? 'bg-white/60' : 'bg-[#aeaeb2]'}`} />
            <span className={`mt-[5px] block h-[7px] w-8 rounded-full ${k === 1 ? 'bg-[#ff6a3d]' : 'bg-[#1d1d1f]'}`} />
            <span className={`mt-[6px] block h-[2px] w-9 rounded-full ${k === 1 ? 'bg-white/30' : 'bg-[#d1d1d6]'}`} /><span className={`mt-[3px] block h-[2px] w-7 rounded-full ${k === 1 ? 'bg-white/30' : 'bg-[#d1d1d6]'}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Thumb({ i }: { i: number }) {
  if (i === 0) return <div className="origin-top-left" style={{ zoom: 102 / 176 }}><Shot /></div>
  if (i === 1) return ( // link with its preview image
    <div className="relative size-full bg-[linear-gradient(140deg,#ffcfae_0%,#ff7a45_45%,#c63a6e_100%)]">
      <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-[6px] bg-black/55 py-[3px] pl-[3px] pr-1.5 text-[9.5px] font-[500] text-white backdrop-blur"><span className="grid size-3 place-items-center rounded-[3px] bg-white text-[7px] font-[800] text-[#1d1d1f]">A</span>arcline.app</span>
    </div>
  )
  if (i === 2) return <div className="relative size-full bg-[#ff6a3d]"><span className="absolute bottom-1.5 left-1.5 rounded-[5px] bg-white/90 px-1.5 py-[2px] font-mono text-[9.5px] font-[500] text-[#1d1d1f]">FF6A3D</span></div>
  if (i === 3) return <div className="size-full bg-[#2a2a2e] px-2 py-1.5"><span className="font-display block text-[18px] leading-[14px] text-[#ff8a5c]">“</span><span className="block text-[10.5px] leading-[13.5px] text-white/85">Ship pricing Friday. Copy from me Wed.</span></div>
  return ( // pdf first page
    <div className="grid size-full place-items-center bg-[#3a3a3e]">
      <span className="relative block h-[58px] w-[46px] rounded-[3px] bg-white p-[5px] shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
        <span className="block h-[3px] w-6 rounded-full bg-[#1d1d1f]" /><span className="mt-[3px] block h-[2px] w-8 rounded-full bg-[#d1d1d6]" />
        <span className="mt-[5px] flex h-[16px] items-end gap-[2px]">{[6, 10, 8, 14, 11].map((h, k) => <span key={k} className={`w-[4px] rounded-[1px] ${k === 3 ? 'bg-[#ff6a3d]' : 'bg-[#c7c7cc]'}`} style={{ height: h }} />)}</span>
        <span className="mt-[4px] block h-[2px] w-7 rounded-full bg-[#d1d1d6]" />
      </span>
    </div>
  )
}
const META = [['Screenshot', 'PNG · 2s ago'], ['Pricing v3', 'Link · 1m'], ['Accent', 'Colour · 3m'], ['Lena', 'Text · 5m'], ['Board deck', 'PDF · 4.2 MB']]

function Card({ i, dim }: { i: number; dim?: boolean }) {
  return (
    <motion.div animate={{ opacity: dim ? 0.35 : 1 }} transition={{ duration: 0.25 }} className="h-[124px] w-[112px] rounded-[16px] bg-[#1c1c1f] p-[5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="h-[72px] overflow-hidden rounded-[11px]"><Thumb i={i} /></div>
      <div className="px-1.5 pt-2"><div className="truncate text-[12px] font-[500] leading-[15px] text-white">{META[i][0]}</div><div className="truncate text-[11px] leading-[14px] text-white/45">{META[i][1]}</div></div>
    </motion.div>
  )
}

export default function Mac({ at }: { at: number }) {
  const still = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(still ? 'hover' : 'closed')
  useEffect(() => {
    if (still) return
    const ids: number[] = []
    const run = (t0: number, first: boolean) => {
      const steps: [Phase, number][] = [...(first ? [['open', t0 + 0.9] as [Phase, number]] : []), ['lift', t0 + 2.5], ['drag', t0 + 2.8], ['hover', t0 + 3.7], ['drop', t0 + 5.6]]
      ids.push(...steps.map(([p, t]) => window.setTimeout(() => setPhase(p), t * 1000)))
      ids.push(window.setTimeout(() => { setPhase('open'); run(-1.6, false) }, (t0 + 8.4) * 1000))
    }
    run(at, true)
    return () => ids.forEach(clearTimeout)
  }, [at, still])
  const open = phase !== 'closed'
  const carrying = phase === 'lift' || phase === 'drag' || phase === 'hover'
  const home = { x: shelfX + cardX(0) + 5, y: 51 }
  const over = { x: WIN.x + 268, y: WIN.y + 62 }

  return (
    <motion.div initial={still ? false : { rotateX: 14, y: 80, opacity: 0 }} animate={{ rotateX: 0, y: 0, opacity: 1 }}
      style={{ transformOrigin: '50% 0%', transformPerspective: 2400 }}
      transition={{ rotateX: { delay: at, duration: 1.5, ease: ease.reveal }, y: { delay: at, duration: 1.5, ease: ease.reveal }, opacity: { delay: at, duration: 0.6 } }}>
      {/* lid: space-black bezel, aluminium rim, one soft floor shadow */}
      <div className="relative w-[1180px] rounded-[38px] bg-[linear-gradient(180deg,#141416,#0a0a0b)] p-[14px] shadow-[0_0_0_1.5px_#c3c3c8,0_0_0_2.5px_#8e8e93,inset_0_0_0_1px_rgba(255,255,255,0.06),0_50px_100px_-40px_rgba(30,20,40,0.45)]">
        <div className="relative h-[740px] overflow-hidden rounded-[24px] bg-black">
          <Wallpaper />

          {/* menu bar */}
          <div className="absolute inset-x-0 top-0 flex h-[30px] items-center gap-5 bg-white/[0.16] px-4 text-[13px] font-[500] text-white backdrop-blur-xl" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.12)' }}>
            <Apple /><span className="font-[650]">Draftboard</span><span>File</span><span>Edit</span>
            <span className="ml-auto flex items-center gap-4">
              <span className="grid h-[18px] w-[22px] place-items-center rounded-[5px] bg-white/25"><span className="h-[5px] w-[12px] rounded-b-[3px] bg-white" /></span>
              <Wifi size={15} strokeWidth={2.2} /><Battery size={19} strokeWidth={1.8} /><span className="tnum">Tue 13 Oct  9:41</span>
            </span>
          </div>

          {/* the document: fully visible under the shelf */}
          <div className="absolute overflow-hidden rounded-[12px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.28),0_24px_60px_-16px_rgba(0,0,0,0.5),0_8px_16px_-8px_rgba(0,0,0,0.2)]" style={{ left: WIN.x, top: WIN.y, width: WIN.w, height: 440 }}>
            <div className="relative flex h-9 items-center px-3.5 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]">
              <span className="flex gap-2">{['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="size-3 rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)]" style={{ background: c }} />)}</span>
              <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-[600] text-[#3a3a3c]">Launch notes</span>
              <Share size={14} strokeWidth={1.8} className="ml-auto text-[#6e6e73]" />
            </div>
            <div className="px-11 pt-[26px]">
              <div className="text-[12px] font-[500] text-[#6e6e73]">Pricing page · ships Friday</div>
              <div className="mt-1.5 text-[24px] font-[700] leading-[30px] tracking-[-0.02em] text-[#1d1d1f]">Launch notes</div>
              <p className="mt-2.5 text-[14px] leading-[22px] text-[#3a3a3c]">Final copy from Lena on Wednesday. The hero uses the new accent, and the comparison table moves below the fold.</p>
              {/* insertion point: a system-blue line opens where the image will land, then the image drops in */}
              <div className="relative my-3.5">
                <AnimatePresence initial={false} mode="popLayout">
                  {phase === 'drop' ? (
                    <motion.div key="img" initial={{ height: 0, opacity: 0 }} animate={{ height: 176, opacity: 1 }} transition={{ height: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} className="overflow-hidden">
                      <div className="h-[176px] w-[282px] overflow-hidden rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"><div className="origin-top-left" style={{ zoom: 282 / 176 }}><Shot /></div></div>
                    </motion.div>
                  ) : (
                    <motion.div key="line" className="flex h-[2px] items-center" initial={{ opacity: 0 }} animate={{ opacity: phase === 'hover' ? 1 : 0, scaleX: phase === 'hover' ? 1 : 0.6 }} style={{ originX: 0 }} transition={{ duration: 0.2 }}>
                      <span className="-ml-[4px] size-[8px] shrink-0 rounded-full bg-white shadow-[inset_0_0_0_2px_#0a84ff]" /><span className="h-[2px] flex-1 rounded-full bg-[#0a84ff]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-[14px] leading-[22px] text-[#3a3a3c]">Still open: annual discount at 15% or 20%, and whether Teams gets its own column.</p>
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
                      <Card i={i} dim={i === 0 && carrying} />
                    </motion.div>
                  ))}
                  <div className="absolute inset-x-[22px] bottom-[11px] flex items-center justify-between text-[11px] text-white/40">
                    <span>Drag anything out · Space to preview</span><span className="flex items-center gap-1"><kbd className="rounded-[4px] bg-white/10 px-1 font-sans">⌘</kbd><kbd className="rounded-[4px] bg-white/10 px-1 font-sans">⇧</kbd><kbd className="rounded-[4px] bg-white/10 px-1 font-sans">V</kbd>paste stack</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* the drag image: the screenshot itself, translucent, carried by the cursor at its lower edge */}
          <AnimatePresence>
            {carrying && (
              <motion.div key="drag" className="absolute z-30" initial={{ x: home.x, y: home.y, scale: 0.58, opacity: 0 }}
                animate={phase === 'lift' ? { x: home.x - 6, y: home.y + 26, scale: 0.86, opacity: 1 } : { x: over.x, y: over.y, scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                style={{ originX: 0, originY: 0 }}
                transition={phase === 'lift' ? { duration: 0.3, ease: ease.outQuint } : { duration: 0.9, ease: [0.45, 0, 0.2, 1] }}>
                <motion.div animate={{ rotate: phase === 'hover' ? 0 : -1.5 }} transition={{ duration: 0.4 }} className="relative">
                  <div className="overflow-hidden rounded-[9px] shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_26px_48px_-14px_rgba(0,0,0,0.5),0_8px_14px_-6px_rgba(0,0,0,0.28)]"><Shot /></div>
                  <span className="absolute -right-[7px] -top-[7px] grid size-[18px] place-items-center rounded-full bg-[#28c840] shadow-[0_0_0_1.5px_#fff,0_1px_3px_rgba(0,0,0,0.3)]"><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><path d="M5 1.5v7M1.5 5h7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg></span>
                  <span className="absolute left-[78px] top-[92px]"><Cursor /></span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
