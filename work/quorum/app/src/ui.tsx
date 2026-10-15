// Page-level primitives for the Quorum site: registration nodes where hairlines cross the rails, a scale-to-fit stage for
// fixed-size product views, the split section header (Title Case h2 left, two-line answer right) and the section shell.
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { InView } from './kit'

/** 7px registration squares where a horizontal hairline crosses the two rails. */
export function Nodes({ bottom = false }: { bottom?: boolean }) {
  const y = bottom ? { bottom: -4 } : { top: -4 }
  return (
    <>
      <span aria-hidden className="node absolute z-10 size-[7px] rounded-[2px] bg-[var(--canvas)] shadow-[0_0_0_1px_#d4d4d4]" style={{ left: -4, ...y }} />
      <span aria-hidden className="node absolute z-10 size-[7px] rounded-[2px] bg-[var(--canvas)] shadow-[0_0_0_1px_#d4d4d4]" style={{ right: -4, ...y }} />
    </>
  )
}

/** Renders a fixed-size view at 1:1 when it fits, scaled down (never up) when the column is narrower. */
export function Fit({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState(1)
  useLayoutEffect(() => {
    const el = ref.current!
    const ro = new ResizeObserver(() => setS(Math.min(1, el.clientWidth / w)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [w])
  return (
    <div ref={ref} className="w-full" style={{ height: h * s }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: '0 0' }}>{children}</div>
    </div>
  )
}

/** Full-bleed hairline on top, rails continue inside. */
export function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className="border-t border-[var(--rail)]">
      <div className={`wrap ${className}`}><Nodes />{children}</div>
    </section>
  )
}

/** Split header: Title Case h2 (no eyebrow, no full stop) on the left, the answer in two lines on the right. */
export function Head({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="grid items-end gap-5 px-6 pt-24 md:grid-cols-[1fr_auto] md:px-12 md:pt-28">
      <InView><h2 className="text-[36px] font-[550] leading-[1.06] tracking-[-0.04em] md:text-[48px]">{title}</h2></InView>
      <InView i={1}><p className="max-w-[420px] pb-1.5 text-[16px] leading-[26px] tracking-[-0.006em] text-[var(--sub)]">{children}</p></InView>
    </div>
  )
}
