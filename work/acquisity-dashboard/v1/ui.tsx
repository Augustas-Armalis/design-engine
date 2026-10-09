// The consistency contract, as components. Every control picks a size from one ladder:
//   size   height  radius  padding-x  icon  text
//   xs     24      6       8          16    label-xs
//   sm     32      8       10         16    label-sm
//   md     36      8       12         20    label-sm
//   lg     40      10      14         20    label-sm
// Icons are centred by flex on a line-height-1 row (Kargul CRM measured 0.00px offset this way); icon-only = square.
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import type { RemixiconComponentType } from '@remixicon/react'

export type Size = 'xs' | 'sm' | 'md' | 'lg'
const H: Record<Size, string> = { xs: 'h-6', sm: 'h-8', md: 'h-9', lg: 'h-10' }
const SQ: Record<Size, string> = { xs: 'size-6', sm: 'size-8', md: 'size-9', lg: 'size-10' }
const R: Record<Size, string> = { xs: 'rounded-[6px]', sm: 'rounded-[8px]', md: 'rounded-[8px]', lg: 'rounded-[10px]' }
const PX: Record<Size, string> = { xs: 'px-2', sm: 'px-2.5', md: 'px-3', lg: 'px-3.5' }
export const ICON: Record<Size, number> = { xs: 16, sm: 16, md: 20, lg: 20 }
const TEXT: Record<Size, string> = { xs: 'label-xs', sm: 'label-sm', md: 'label-sm', lg: 'label-sm' }

type Variant = 'primary' | 'neutral' | 'stroke' | 'ghost' | 'error-light'
const V: Record<Variant, string> = {
  primary: 'bg-primary text-white shadow-[0_1px_2px_rgba(14,18,27,0.24),inset_0_1px_0_rgba(255,255,255,0.16)] hover:bg-primary-dark',
  neutral: 'bg-bg-strong text-white shadow-[0_1px_2px_rgba(14,18,27,0.24),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[#2b2b2b]',
  stroke: 'bg-white text-text-sub shadow-[var(--ring),var(--shadow-xs)] hover:bg-bg-weak hover:text-text-strong hover:shadow-none',
  ghost: 'text-text-sub hover:bg-bg-weak hover:text-text-strong',
  'error-light': 'bg-error-light text-error-text hover:bg-[#ffdfe1]',
}

export function Button({ size = 'sm', variant = 'stroke', icon: Icon, trailing: Trail, children, label, className = '' }: {
  size?: Size; variant?: Variant; icon?: RemixiconComponentType; trailing?: RemixiconComponentType; children?: ReactNode; label?: string; className?: string
}) {
  const only = !children
  return (
    <button type="button" aria-label={label} className={`press inline-flex shrink-0 items-center justify-center gap-1.5 leading-none ${H[size]} ${R[size]} ${only ? SQ[size] : PX[size]} ${TEXT[size]} ${V[variant]} ${className}`}>
      {Icon && <Icon size={ICON[size]} className="shrink-0" />}
      {children && <span className="leading-none">{children}</span>}
      {Trail && <Trail size={ICON[size]} className="-mr-0.5 shrink-0 opacity-70" />}
    </button>
  )
}

type Tone = 'success' | 'warning' | 'error' | 'neutral' | 'primary'
const TONE: Record<Tone, string> = {
  success: 'bg-success-light text-success-text', warning: 'bg-warning-light text-warning-text', error: 'bg-error-light text-error-text',
  neutral: 'bg-bg-weak text-text-sub', primary: 'bg-primary-alpha text-primary-dark',
}
const DOT: Record<Tone, string> = { success: 'bg-success', warning: 'bg-warning', error: 'bg-error', neutral: 'bg-text-disabled', primary: 'bg-primary' }
/** Status badge: 24px, radius 6, 6px dot in a 16px box (AlignUI status badge). */
export function Badge({ tone = 'neutral', dot, icon: Icon, children }: { tone?: Tone; dot?: boolean; icon?: RemixiconComponentType; children: ReactNode }) {
  return (
    <span className={`inline-flex h-6 items-center gap-1 rounded-[6px] px-2 label-xs leading-none ${TONE[tone]}`}>
      {dot && <span className="grid size-4 place-items-center"><span className={`size-1.5 rounded-full ${DOT[tone]}`} /></span>}
      {Icon && <Icon size={16} className="shrink-0" />}
      <span className="leading-none">{children}</span>
    </span>
  )
}

/** Delta pill on KPIs: 20px, radius 6. */
export function Delta({ up, children }: { up: boolean; children: ReactNode }) {
  return <span className={`tnum inline-flex h-5 items-center rounded-[6px] px-1.5 label-xs leading-none ${up ? 'bg-success-light text-success-text' : 'bg-error-light text-error-text'}`}>{children}</span>
}

/** Icon tile: square, radius scales with size (32 -> 8, 40 -> 10), icon centred by grid. */
export function IconTile({ icon: Icon, size = 32, tone = 'neutral' }: { icon: RemixiconComponentType; size?: 32 | 40; tone?: Tone | 'white' }) {
  const cls = tone === 'white' ? 'bg-white text-text-sub shadow-[var(--ring),var(--shadow-xs)]' : TONE[tone as Tone]
  return <span className={`grid shrink-0 place-items-center ${size === 32 ? 'size-8 rounded-[8px]' : 'size-10 rounded-[10px]'} ${cls}`}><Icon size={size === 32 ? 16 : 20} /></span>
}

/** Segmented control: container radius 10, padding 4, items 28 radius 6 (AlignUI); thumb slides. */
export function Segmented({ options, value, onChange, id }: { options: string[]; value: string; onChange: (v: string) => void; id: string }) {
  return (
    <div role="group" className="inline-flex h-9 items-center gap-0.5 rounded-[10px] bg-bg-weak p-1">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} aria-pressed={value === o}
          className={`relative flex h-7 min-w-11 items-center justify-center rounded-[6px] px-2.5 label-sm leading-none transition-colors duration-150 ${value === o ? 'text-text-strong' : 'text-text-sub hover:text-text-strong'}`}>
          {value === o && <motion.span layoutId={id} transition={{ type: 'spring', duration: 0.35, bounce: 0.12 }} className="absolute inset-0 rounded-[6px] bg-white shadow-[0_6px_10px_rgba(14,18,27,0.06),0_2px_4px_rgba(14,18,27,0.03),0_0_0_1px_rgba(14,18,27,0.02)]" />}
          <span className="relative">{o}</span>
        </button>
      ))}
    </div>
  )
}

/** Card: white, radius 16, hairline ring + xs shadow; header padding 20 x 16. */
export function Card({ title, sub, action, children, className = '', bodyClass = 'p-5 pt-0' }: { title: ReactNode; sub?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; bodyClass?: string }) {
  return (
    <section className={`flex flex-col rounded-[16px] bg-white shadow-[var(--ring),var(--shadow-xs)] ${className}`}>
      <header className="flex items-start gap-3 px-5 py-4">
        <div className="min-w-0 flex-1"><h2 className="label-md text-text-strong">{title}</h2>{sub && <p className="mt-0.5 para-xs text-text-sub">{sub}</p>}</div>
        {action}
      </header>
      <div className={`min-h-0 flex-1 ${bodyClass}`}>{children}</div>
    </section>
  )
}
