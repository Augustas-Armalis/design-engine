// v3 primitives. One action height (28), one icon family (Phosphor, 16 regular; fill = state), chips = tint + darker border + deep text (Attio).
// Every card header is CardHead: 16px solid tile with a white filled glyph + 14/600 title + soft meta + right-aligned actions.
import type { ReactNode } from 'react'
import type { Icon } from '@phosphor-icons/react'
import { CalendarCheck, Sparkle, WarningCircle } from '@phosphor-icons/react'

export function Btn({ children, icon: I, primary, kbd, label, className = '' }: { children?: ReactNode; icon?: Icon; primary?: boolean; kbd?: string; label?: string; className?: string }) {
  const only = !children
  return (
    <button type="button" aria-label={label} className={`press inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-[8px] t14 leading-none ${only ? 'w-7' : 'px-2.5'} ${primary ? 'btn-primary text-white' : 'btn-white text-[var(--ink)]'} ${className}`}>
      {I && <I size={16} weight={primary ? 'bold' : 'regular'} className={`shrink-0 ${primary ? '' : 'text-[var(--sub)]'}`} />}
      {children && <span className="leading-none">{children}</span>}
      {kbd && <kbd className={`ml-auto flex h-[18px] items-center rounded-[6px] px-1 font-sans text-[11px] leading-none ${primary ? 'text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]' : 'text-[var(--soft)] shadow-[inset_0_0_0_1px_var(--line)]'}`}>{kbd}</kbd>}
    </button>
  )
}

export function Ghost({ children, icon: I, dashed, active, onClick }: { children: ReactNode; icon?: Icon; dashed?: boolean; active?: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`press inline-flex h-7 items-center gap-1.5 rounded-[8px] px-2 t14 leading-none ${dashed ? 'border border-dashed border-[#dcdee2] text-[var(--sub)] hover:border-[#c9ccd1] hover:text-[var(--ink)]' : active ? 'bg-[var(--hover)] text-[var(--ink)]' : 'text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]'}`}>
      {I && <I size={16} className="shrink-0 text-[var(--soft)]" />}{children}
    </button>
  )
}

/** Solid 16px tile + white filled glyph: the record-type mark shared by the sidebar and card headers. */
export function Tile({ icon: I, hue }: { icon: Icon; hue: string }) {
  return <span className="grid size-4 shrink-0 place-items-center rounded-[4.5px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" style={{ background: hue }}><I size={10} weight="fill" color="#fff" /></span>
}

export function CardHead({ icon, hue, title, meta, children }: { icon: Icon; hue: string; title: string; meta?: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex h-12 shrink-0 items-center gap-2 px-4">
      <Tile icon={icon} hue={hue} />
      <h2 className="t14 font-[600] text-[var(--ink)]">{title}</h2>
      {meta != null && <span className="tnum t13 text-[var(--soft)]">{meta}</span>}
      <div className="ml-auto flex items-center gap-1.5">{children}</div>
    </div>
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

/** AI state renders as quiet icon + text everywhere (table and panel), so the only filled chips on screen are the lead's intent. */
const AI = { 'Draft ready': { I: Sparkle, c: '#266df0' }, Booked: { I: CalendarCheck, c: '#0a8a4f' }, 'Needs you': { I: WarningCircle, c: '#d97a06' } } as const
export function AiStatus({ s }: { s: keyof typeof AI }) {
  const { I, c } = AI[s]
  return <span className="inline-flex items-center gap-1.5 whitespace-nowrap t14 leading-none text-[var(--ink)]"><I size={16} weight="fill" color={c} className="shrink-0" />{s}</span>
}

/** Micro bar spark (Rico KPI cards): 3px bars, 2px gap, grey history, the latest period in the accent. */
export function Spark({ values, down }: { values: number[]; down?: boolean }) {
  const max = Math.max(...values)
  return (
    <span aria-hidden className="flex h-6 items-end gap-[2px]">
      {values.map((v, i) => <span key={i} className="w-[3px] rounded-[1px]" style={{ height: `${Math.max(12, (v / max) * 100)}%`, background: i === values.length - 1 ? (down ? '#e5484d' : 'var(--blue)') : '#dfe1e5' }} />)}
    </span>
  )
}

/** Segmented meter (Kargul win-probability grammar): n 3px segments, filled share in the row's hue. */
export function Meter({ value, hue, n = 12 }: { value: number; hue: string; n?: number }) {
  const on = Math.round(value * n)
  return <span aria-hidden className="flex h-3 gap-[1.5px]">{Array.from({ length: n }, (_, i) => <span key={i} className="w-[3px] rounded-[1px]" style={{ background: i < on ? hue : '#e9eaed' }} />)}</span>
}

export function Checkbox({ label }: { label: string }) {
  return <input type="checkbox" aria-label={label} onClick={(e) => e.stopPropagation()} className="check size-4 cursor-pointer appearance-none rounded-[4.5px] bg-white" />
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
