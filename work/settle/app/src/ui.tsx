// Settle primitives. One control height (30), icons 14 beside 14px text, rings not borders (BN-03), squircle corners (BN-12).
import type { ComponentProps, ReactNode } from 'react'
import { Tooltip as T } from '@base-ui/react/tooltip'
import { Checkbox as CB } from '@base-ui/react/checkbox'
import { Check, Minus } from 'lucide-react'
import type { Person, Vendor } from './data'

export const cx = (...c: (string | number | false | null | undefined)[]) => c.filter(Boolean).join(' ')
export const I = { size: 14, strokeWidth: 1.75 } as const

/* Buttons: 30px, r9 squircle. primary = ink, secondary = white + control ring, ghost = text only. icon = 30 square, xs = 24 square (row actions). */
type BtnProps = ComponentProps<'button'> & { variant?: 'primary' | 'secondary' | 'ghost' | 'accent'; size?: 'md' | 'icon' | 'xs' }
export function Button({ variant = 'secondary', size = 'md', className, ...p }: BtnProps) {
  return (
    <button {...p} className={cx('st inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap font-[500] disabled:opacity-50',
      size === 'md' && 'h-[30px] rounded-[9px] px-3 text-[14px]',
      size === 'icon' && 'size-[30px] rounded-[9px]',
      size === 'xs' && 'size-6 rounded-[7px]',
      variant === 'primary' && 'bg-[var(--primary)] text-[var(--primary-ink)] shadow-[var(--sh-primary)] hover:opacity-90',
      variant === 'accent' && 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_0_0_1px_var(--accent),inset_0_1px_0_rgba(255,255,255,0.18)] hover:opacity-90',
      variant === 'secondary' && 'bg-[var(--card)] text-[var(--ink)] shadow-[var(--sh-control)] hover:bg-[var(--sunk)]',
      variant === 'ghost' && 'text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]',
      className)} />
  )
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return <kbd className={cx('inline-grid h-[18px] min-w-[18px] place-items-center rounded-[5px] px-1 font-mono text-[11px] leading-none text-[var(--soft)] shadow-[0_0_0_1px_var(--line-2),0_1px_0_var(--line-2)]', className)}>{children}</kbd>
}

/* tinted tag triplets: tint bg, deeper text, faint ring; one hue per category */
const HUE: Record<string, [string, string, string, string]> = {
  // light text, light bg, dark text, dark bg
  violet: ['#5b3fd6', 'rgba(122,90,245,0.10)', '#b9a8ff', 'rgba(162,140,255,0.13)'],
  blue: ['#2457c5', 'rgba(47,111,228,0.10)', '#9cbcff', 'rgba(107,156,255,0.13)'],
  amber: ['#9a5b00', 'rgba(214,140,10,0.13)', '#f3c272', 'rgba(233,162,59,0.14)'],
  teal: ['#08664d', 'rgba(11,122,92,0.10)', '#7fdcb9', 'rgba(63,199,154,0.13)'],
  rose: ['#b42d4a', 'rgba(217,58,90,0.09)', '#ff9db0', 'rgba(240,106,130,0.13)'],
  sky: ['#0b6b95', 'rgba(14,140,190,0.10)', '#8fd3f2', 'rgba(80,180,230,0.13)'],
  pink: ['#b02c86', 'rgba(210,60,160,0.09)', '#f6a2d8', 'rgba(230,110,190,0.13)'],
  slate: ['#4f4f4b', 'rgba(20,20,18,0.06)', '#bdbdb9', 'rgba(255,255,255,0.08)'],
  green: ['#17733f', 'rgba(31,157,85,0.10)', '#8ee0ad', 'rgba(70,195,123,0.13)'],
  red: ['#b42626', 'rgba(217,58,58,0.09)', '#ff9a9a', 'rgba(240,106,106,0.13)'],
}
export const hueVars = (h: string) => ({ ['--t' as string]: HUE[h][0], ['--tb' as string]: HUE[h][1], ['--td' as string]: HUE[h][2], ['--tbd' as string]: HUE[h][3] })
export function Tag({ hue, children, dot }: { hue: string; children: ReactNode; dot?: boolean }) {
  return (
    <span style={hueVars(hue)} className="inline-flex h-[22px] shrink-0 items-center gap-1.5 rounded-full bg-[var(--tb)] px-2 text-[12px] font-[500] leading-none text-[var(--t)] dark:bg-[var(--tbd)] dark:text-[var(--td)]">
      {dot && <span className="size-1.5 rounded-full bg-current" />}{children}
    </span>
  )
}

export function Avatar({ p, size = 20, ring }: { p: Person; size?: number; ring?: boolean }) {
  return (
    <span className={cx('relative inline-block shrink-0 overflow-hidden rounded-full bg-[var(--sunk)]', ring && 'shadow-[0_0_0_2px_var(--canvas)]')} style={{ width: size, height: size }}>
      <img src={p.face} alt="" className="size-full dark:opacity-90" draggable={false} />
    </span>
  )
}
export function Stack({ people, size = 20 }: { people: Person[]; size?: number }) {
  return <span className="flex items-center">{people.map((p, i) => <span key={p.id} className={i ? '-ml-1.5' : ''}><Avatar p={p} size={size} ring /></span>)}</span>
}

/* vendor tile (v2 clean): the vendor's mark in ink on a neutral fill step, no ring, no brand colour (founder: v1 "dirty") */
export function VendorTile({ v, size = 24 }: { v: Vendor; size?: number }) {
  const r = Math.round(size * 0.3)
  return (
    <span className="grid shrink-0 place-items-center bg-[var(--sunk)] font-[600] tracking-[-0.02em] text-[var(--ink)]" style={{ width: size, height: size, borderRadius: r, fontSize: size < 26 ? 11 : Math.round(size * 0.4) }}>
      {v.icon ? <svg viewBox="0 0 24 24" width={Math.round(size * 0.5)} height={Math.round(size * 0.5)} aria-hidden><path d={v.icon.path} fill="currentColor" /></svg> : v.mono?.[0]}
    </span>
  )
}

/* status: a dot and a word. Only "needs you" and "late" carry colour. */
export function Status({ label, tone }: { label: string; tone: 'warn' | 'bad' | 'muted' | 'ink' }) {
  const dot = tone === 'warn' ? 'bg-[var(--amber)]' : tone === 'bad' ? 'bg-[var(--red)]' : tone === 'ink' ? 'bg-[var(--ink)]' : 'bg-[var(--faint)]'
  return <span className="inline-flex items-center gap-2 whitespace-nowrap text-[14px] text-[var(--sub)]"><span className={cx('size-1.5 rounded-full', dot)} />{label}</span>
}

export function Tip({ label, children, side = 'top' }: { label: ReactNode; children: React.ReactElement; side?: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <T.Root>
      <T.Trigger render={children} />
      <T.Portal>
        <T.Positioner side={side} sideOffset={6}>
          <T.Popup className="pop rounded-[8px] bg-[#161615] px-2 py-1 text-[12px] font-[500] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:bg-[#2a2a2d] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.5)]">{label}</T.Popup>
        </T.Positioner>
      </T.Portal>
    </T.Root>
  )
}

export function Checkbox({ checked, indeterminate, onChange, label }: { checked: boolean; indeterminate?: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <CB.Root checked={checked} indeterminate={indeterminate} onCheckedChange={onChange} aria-label={label}
      className="st grid size-4 place-items-center rounded-[5px] bg-[var(--card)] shadow-[0_0_0_1px_var(--line-2),0_1px_1px_rgba(20,20,18,0.05)] data-[checked]:bg-[var(--primary)] data-[checked]:shadow-[0_0_0_1px_var(--primary)] data-[indeterminate]:bg-[var(--primary)] data-[indeterminate]:shadow-[0_0_0_1px_var(--primary)]">
      <CB.Indicator className="text-[var(--primary-ink)]">{indeterminate ? <Minus size={11} strokeWidth={3} /> : <Check size={11} strokeWidth={3} />}</CB.Indicator>
    </CB.Root>
  )
}

/* 3-way match meter: PO / receipt / invoice as three squircle segments */
export function Match({ m }: { m: [boolean, boolean, boolean] | null }) {
  if (!m) return <span className="text-[12px] text-[var(--soft)]">No PO</span>
  const ok = m.filter(Boolean).length
  return (
    <Tip label={`PO ${m[0] ? 'matched' : 'missing'} · Receipt ${m[1] ? 'matched' : 'missing'} · Invoice ${m[2] ? 'matched' : 'missing'}`}>
      <span className="inline-flex items-center gap-2" tabIndex={0}>
        <span className="flex gap-[3px]">{m.map((x, i) => <span key={i} className={cx('h-3 w-[5px] rounded-[2px]', x ? 'bg-[var(--ink)] opacity-70' : 'bg-[var(--amber)]')} />)}</span>
        <span className={cx('tnum text-[12px]', ok === 3 ? 'text-[var(--sub)]' : 'font-[500] text-[#9a5b00] dark:text-[var(--amber)]')}>{ok}/3</span>
      </span>
    </Tip>
  )
}

export function Money({ n, className, cents = true }: { n: number; className?: string; cents?: boolean }) {
  const [w, c] = (cents ? n : Math.round(n)).toFixed(2).split('.')
  return <span className={cx('tnum whitespace-nowrap', className)}><span className="text-[var(--soft)]">$</span>{Number(w).toLocaleString('en-US')}{cents && <span className="text-[var(--soft)]">.{c}</span>}</span>
}
