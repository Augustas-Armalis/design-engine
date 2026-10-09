// v3 primitives. One action height (28), icons at text size (14-16, stroke 1.5), chips = tint + darker border + deep text (Attio).
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export const ICON = { size: 16, strokeWidth: 1.5 } as const

export function Btn({ children, icon: Icon, primary, kbd, label, className = '' }: { children?: ReactNode; icon?: LucideIcon; primary?: boolean; kbd?: string; label?: string; className?: string }) {
  const only = !children
  return (
    <button type="button" aria-label={label} className={`press inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-[8px] t14 leading-none ${only ? 'w-7' : 'px-2.5'} ${primary ? 'bg-[var(--blue)] text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(38,109,240,0.3)] hover:bg-[#1f5fd9]' : 'bg-white text-[var(--ink)] shadow-[var(--btn)] hover:bg-[var(--hover)]'} ${className}`}>
      {Icon && <Icon {...ICON} className="shrink-0" />}
      {children && <span className="leading-none">{children}</span>}
      {kbd && <kbd className={`ml-auto flex h-[18px] items-center rounded-[6px] px-1 font-sans text-[11px] leading-none ${primary ? 'text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]' : 'text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--line)]'}`}>{kbd}</kbd>}
    </button>
  )
}

export function Ghost({ children, icon: Icon, dashed, active, onClick }: { children: ReactNode; icon?: LucideIcon; dashed?: boolean; active?: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`press inline-flex h-7 items-center gap-1.5 rounded-[8px] px-2 t14 leading-none ${dashed ? 'border border-dashed border-[var(--grid)] text-[var(--soft)] hover:text-[var(--sub)]' : active ? 'bg-[var(--hover)] text-[var(--ink)]' : 'text-[var(--sub)] hover:bg-[var(--hover)]'}`}>
      {Icon && <Icon {...ICON} className="shrink-0" />}{children}
    </button>
  )
}

const CHIP = {
  blue: 'bg-[#e5eeff] border-[#d6e5ff] text-[#183c81]', green: 'bg-[#ddf9e4] border-[#c7f4d3] text-[#075a39]', purple: 'bg-[#f5eeff] border-[#e8ddfe] text-[#4711bb]',
  yellow: 'bg-[#fff3cc] border-[#ffebad] text-[#705500]', pink: 'bg-[#feecf1] border-[#fddde7] text-[#6f065d]', grey: 'bg-[#f4f5f6] border-[#eeeff1] text-[#5c5e63]', cyan: 'bg-[#daf4fc] border-[#c3edf9] text-[#0a5a70]',
} as const
export type Hue = keyof typeof CHIP
export function Chip({ hue = 'grey', children }: { hue?: Hue; children: ReactNode }) {
  return <span className={`inline-flex h-[22px] items-center whitespace-nowrap rounded-[7px] border px-[5px] t14 leading-none ${CHIP[hue]}`}>{children}</span>
}

const AV = ['#f5eeff,#4711bb', '#e5eeff,#183c81', '#ddf9e4,#075a39', '#fff3cc,#705500', '#feecf1,#6f065d', '#daf4fc,#0a5a70']
export function Avatar({ name, size = 20 }: { name: string; size?: 20 | 24 | 32 }) {
  const i = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length
  const [bg, fg] = AV[i].split(',')
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('')
  return <span className="grid shrink-0 place-items-center rounded-full font-[600] leading-none" style={{ width: size, height: size, background: bg, color: fg, fontSize: size === 32 ? 12 : 10 }}>{initials}</span>
}

/** Company "logo" tile (sample data has no real logos): 16px, radius 4.5, solid hue + white lettermark. */
export function Logo({ name, hue }: { name: string; hue: string }) {
  return <span className="grid size-4 shrink-0 place-items-center rounded-[4.5px] text-[10px] font-[700] leading-none text-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" style={{ background: hue }}>{name[0]}</span>
}

export function Person({ name }: { name: string }) {
  return <span className="inline-flex items-center gap-2 whitespace-nowrap t14 leading-none text-[var(--ink)]"><Avatar name={name} />{name}</span>
}
