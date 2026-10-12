// Sidebar on the canvas (Rico/Linear inset shell): workspace switcher, word-led nav with quiet 14px glyphs, saved views,
// and the operating account as the footer object (Kargul's CRM footer carries trial state; ours carries cash).
import { ArrowLeftRight, BarChart3, Building2, ChevronsUpDown, CreditCard, FileText, Inbox, LayoutGrid, LifeBuoy, Settings, Stamp, Wallet } from 'lucide-react'
import { bills, me, OPENING } from './data'
import { Avatar, cx, I, Kbd, Money } from './ui'

type Item = { id: string; label: string; icon: typeof Inbox; count?: number; href?: string }
const waiting = bills.filter((b) => b.chain.some((s) => s.who.id === me.id && s.state === 'waiting')).length
const nav: Item[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid, href: '#/' },
  { id: 'inbox', label: 'Inbox', icon: Inbox, count: 3 },
  { id: 'bills', label: 'Bills', icon: FileText, count: bills.filter((b) => b.status !== 'paid').length, href: '#/bills' },
  { id: 'approvals', label: 'Approvals', icon: Stamp, count: waiting },
  { id: 'runs', label: 'Pay runs', icon: ArrowLeftRight },
  { id: 'vendors', label: 'Vendors', icon: Building2 },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
]
const views = [
  { label: 'Due this week', color: 'var(--amber)' },
  { label: 'Over $10,000', color: 'var(--violet)' },
  { label: 'Missing receipt', color: 'var(--red)' },
  { label: 'Contractors', color: 'var(--accent)' },
]

function Row({ it, active }: { it: Item; active: boolean }) {
  const Icon = it.icon
  return (
    <a href={it.href ?? '#'} aria-current={active ? 'page' : undefined}
      className={cx('st group flex h-[30px] items-center gap-2 rounded-[9px] px-2 text-[14px] font-[500]',
        active ? 'bg-[var(--card)] text-[var(--ink)] shadow-[var(--sh-control)]' : 'text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]')}>
      <Icon {...I} className={active ? 'text-[var(--ink)]' : 'text-[var(--faint)] group-hover:text-[var(--sub)]'} />
      <span className="flex-1">{it.label}</span>
      {it.count != null && <span className={cx('tnum text-[12px]', active ? 'text-[var(--sub)]' : 'text-[var(--soft)]')}>{it.count}</span>}
    </a>
  )
}

export default function Sidebar({ page }: { page: string }) {
  return (
    <aside className="flex w-[248px] shrink-0 flex-col px-3 pb-3 pt-3">
      <button className="st flex h-[44px] items-center gap-2.5 rounded-[11px] px-2 text-left hover:bg-[var(--hover)]">
        <span className="grid size-7 shrink-0 place-items-center rounded-[8px] bg-[linear-gradient(180deg,#2b2b29,#121211)] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.2)]">
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden><path d="M3.5 15.5 9 4.5a1.1 1.1 0 0 1 2 0l5.5 11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6.6 11.2c2.2-.9 4.6-.9 6.8 0" fill="none" stroke="#5fd3ab" strokeWidth="2.2" strokeLinecap="round" /></svg>
        </span>
        <span className="min-w-0 flex-1 leading-[16px]">
          <span className="block truncate text-[14px] font-[550]">Arcline Inc.</span>
          <span className="block truncate text-[12px] text-[var(--soft)]">Sample workspace</span>
        </span>
        <ChevronsUpDown {...I} className="text-[var(--faint)]" />
      </button>

      <a href="#/k" className="st mt-3 flex h-[30px] items-center gap-2 rounded-[9px] bg-[var(--card)] px-2 text-[14px] text-[var(--soft)] shadow-[var(--sh-control)] hover:text-[var(--sub)]">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <span className="flex-1">Search</span><Kbd>⌘</Kbd><Kbd>K</Kbd>
      </a>

      <nav aria-label="Main" className="mt-4 flex flex-col gap-0.5">{nav.map((it) => <Row key={it.id} it={it} active={it.id === page} />)}</nav>

      <div className="mt-6 px-2 text-[12px] font-[500] text-[var(--soft)]">Saved views</div>
      <div className="mt-1.5 flex flex-col gap-0.5">
        {views.map((v) => (
          <a key={v.label} href="#/bills" className="st flex h-[30px] items-center gap-2 rounded-[9px] px-2 text-[14px] font-[500] text-[var(--sub)] hover:bg-[var(--hover)] hover:text-[var(--ink)]">
            <span className="grid size-[14px] place-items-center"><span className="size-[7px] rounded-full" style={{ background: v.color }} /></span>{v.label}
          </a>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-0.5">
        <a href="#" className="st flex h-[30px] items-center gap-2 rounded-[9px] px-2 text-[14px] font-[500] text-[var(--sub)] hover:bg-[var(--hover)]"><Settings {...I} className="text-[var(--faint)]" />Settings</a>
        <a href="#" className="st flex h-[30px] items-center gap-2 rounded-[9px] px-2 text-[14px] font-[500] text-[var(--sub)] hover:bg-[var(--hover)]"><LifeBuoy {...I} className="text-[var(--faint)]" />Help</a>
        <div className="mt-3 rounded-[14px] bg-[var(--card)] p-1 shadow-[var(--sh-card)]">
          <div className="flex items-center gap-2 px-2.5 pb-2 pt-2.5">
            <Wallet {...I} className="text-[var(--faint)]" />
            <span className="flex-1 text-[12px] font-[500] text-[var(--sub)]">Operating ··4821</span>
            <span className="flex items-center gap-1 text-[12px] text-[var(--soft)]"><span className="size-1.5 rounded-full bg-[var(--green)]" />2m</span>
          </div>
          <div className="px-2.5 pb-2.5 text-[16px] font-[550] tracking-[-0.01em]"><Money n={OPENING} /></div>
          <div className="flex items-center gap-2 rounded-[10px] bg-[var(--sunk)] py-1.5 pl-1.5 pr-2 dark:bg-[rgba(255,255,255,0.03)]">
            <Avatar p={me} size={20} />
            <span className="min-w-0 flex-1 truncate text-[12px] font-[500]">{me.name}</span>
            <span className="text-[12px] text-[var(--soft)]">{me.role}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
