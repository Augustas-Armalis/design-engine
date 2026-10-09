// Tandem primitives in Flo Hoeller's grammar: chips, app tiles, avatars, the card-in-card showcase frame.
import type { ReactNode } from 'react'
import type { Icon } from '@phosphor-icons/react'
import { Copy, Lightning } from '@phosphor-icons/react'

export function Chip({ children, tone = 'grey', className = '' }: { children: ReactNode; tone?: 'grey' | 'blue' | 'green' | 'amber' | 'pink' | 'white'; className?: string }) {
  const t = {
    grey: 'bg-[rgba(0,0,0,0.045)] text-[var(--sub)]', blue: 'bg-[var(--blue-tint)] text-[#1f4fd1]', green: 'bg-[var(--green-tint)] text-[var(--green)]',
    amber: 'bg-[var(--amber-tint)] text-[var(--amber)]', pink: 'bg-[var(--pink-tint)] text-[var(--pink)]', white: 'bg-white text-[var(--sub)] shadow-[0_0_0_1px_var(--line-2)]',
  }[tone]
  return <span className={`inline-flex h-[22px] items-center gap-1 whitespace-nowrap rounded-full px-2 text-[12px] font-[500] leading-none ${t} ${className}`}>{children}</span>
}

/** Generic app tile (no third-party logos): a soft colour square with a white filled glyph. */
export function AppTile({ icon: I, hue, size = 18 }: { icon: Icon; hue: string; size?: number }) {
  return <span className="grid shrink-0 place-items-center rounded-[5px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.25)]" style={{ width: size, height: size, background: hue }}><I size={size * 0.62} weight="fill" color="#fff" /></span>
}

const AV: Record<string, string> = { MR: '#dbe7ff,#1d3f9c', JW: '#fde7d4,#8a3b0b', AK: '#e3f6e8,#14532d', SL: '#efe4ff,#4c1d95', TA: '#0a0a0a,#ffffff' }
export function Avatar({ i, size = 24 }: { i: string; size?: number }) {
  const [bg, fg] = (AV[i] ?? '#eeeeee,#525252').split(',')
  return <span className="grid shrink-0 place-items-center rounded-full font-[600] leading-none shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" style={{ width: size, height: size, background: bg, color: fg, fontSize: Math.max(10, Math.round(size * 0.4)) }}>{i}</span>
}

/** affectUI showcase frame: outer card (r24, hairline), inner grey stage (r18) with category + Pro chips, then title,
 *  one-line description and a round copy button. */
export function Showcase({ category, title, desc, children, pro = true }: { category: string; title: string; desc: string; children: ReactNode; pro?: boolean }) {
  return (
    <figure className="w-[440px] rounded-[24px] bg-white p-2 shadow-[0_0_0_1px_var(--line)]">
      <div className="relative grid h-[420px] place-items-center overflow-hidden rounded-[18px] bg-[var(--panel)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)]">
        <span className="absolute left-3 top-3"><Chip tone="white">{category}</Chip></span>
        {pro && <span className="absolute right-3 top-3"><Chip tone="pink" className="shadow-[0_0_0_1px_rgba(201,26,116,0.18)]"><Lightning size={12} weight="fill" />Pro</Chip></span>}
        {children}
      </div>
      <figcaption className="flex items-center gap-3 px-3 pb-2.5 pt-3.5">
        <div className="min-w-0 flex-1">
          <div className="text-[16px] font-[500] tracking-[-0.01em]">{title}</div>
          <div className="mt-0.5 truncate text-[15px] text-[var(--sub)]">{desc}</div>
        </div>
        <button type="button" aria-label={`Copy ${title}`} className="pill-white press grid size-10 shrink-0 place-items-center rounded-full"><Copy size={16} weight="fill" className="text-[#404040]" /></button>
      </figcaption>
    </figure>
  )
}
