// ⌘K palette (Kargul CRM grammar): 48px input row, grouped 40px items, keyboard loop, kbd footer.
import { useEffect, useMemo, useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { ArrowRight, Check, CornerDownLeft, Moon, Plus, Search } from 'lucide-react'
import { me } from './data'
import { approve, setMoved, useStore } from './store'
import { cx, I, Kbd, Money, VendorTile } from './ui'

type It = { id: string; group: string; label: string; hint?: React.ReactNode; icon: React.ReactNode; run: () => void }

export default function Command({ open, onOpen, toggleTheme }: { open: boolean; onOpen: (v: boolean) => void; toggleTheme: () => void }) {
  const { bills } = useStore()
  const [q, setQ] = useState('')
  const [at, setAt] = useState(0)
  const items = useMemo<It[]>(() => {
    const mine = bills.filter((b) => b.chain.some((s) => s.who.id === me.id && s.state === 'waiting'))
    const all: It[] = [
      ...bills.filter((b) => b.status !== 'paid').slice(0, 30).map((b) => ({ id: b.id, group: 'Bills', label: b.vendor.name, hint: <span className="flex items-center gap-3"><span className="mono text-[var(--soft)]">{b.invoice}</span><Money n={b.amount} className="w-[96px] text-right text-[14px]" /></span>, icon: <VendorTile v={b.vendor} size={20} />, run: () => (location.hash = `#/bills/${b.id}`) })),
      { id: 'a1', group: 'Actions', label: `Approve ${mine.length} bills waiting on you`, hint: <Kbd>A</Kbd>, icon: <Check {...I} />, run: () => approve(mine.map((b) => b.id)) },
      { id: 'a2', group: 'Actions', label: 'Move Hartwell wire to Oct 16', icon: <ArrowRight {...I} />, run: () => setMoved(true) },
      { id: 'a3', group: 'Actions', label: 'New bill', hint: <Kbd>N</Kbd>, icon: <Plus {...I} />, run: () => {} },
      { id: 'a4', group: 'Actions', label: 'Switch theme', hint: <span className="flex gap-1"><Kbd>⇧</Kbd><Kbd>T</Kbd></span>, icon: <Moon {...I} />, run: toggleTheme },
    ]
    const s = q.trim().toLowerCase()
    const r = s ? all.filter((i) => i.label.toLowerCase().includes(s) || i.id.includes(s)) : [...all.filter((i) => i.group === 'Bills').slice(0, 4), ...all.filter((i) => i.group === 'Actions')]
    return r
  }, [bills, q, toggleTheme])
  useEffect(() => setAt(0), [q, open])
  const groups = [...new Set(items.map((i) => i.group))]
  const pick = (i: It) => { onOpen(false); i.run() }

  return (
    <Dialog.Root open={open} onOpenChange={onOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[rgba(20,20,18,0.12)] transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:bg-[rgba(0,0,0,0.45)]" />
        <Dialog.Popup className="fixed left-[calc(50%+124px)] top-[13vh] z-50 w-[620px] -translate-x-1/2 overflow-hidden rounded-[16px] bg-[var(--card)] shadow-[var(--sh-pop)] outline-none transition-[opacity,transform] duration-200 data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setAt((a) => (a + 1) % items.length) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setAt((a) => (a - 1 + items.length) % items.length) }
            if (e.key === 'Enter' && items[at]) { e.preventDefault(); pick(items[at]) }
          }}>
          <Dialog.Title className="sr-only">Search and commands</Dialog.Title>
          <div className="flex h-12 items-center gap-2.5 px-4 shadow-[inset_0_-1px_0_var(--div)]">
            <Search {...I} className="text-[var(--faint)]" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bills, vendors, actions…" aria-label="Search" className="cmd-input h-full flex-1 bg-transparent text-[14px] outline-none placeholder:text-[var(--soft)]" />
            <Kbd>Esc</Kbd>
          </div>
          <div className="max-h-[min(440px,60dvh)] overflow-y-auto p-1.5" role="listbox" aria-label="Results">
            {groups.map((g) => (
              <div key={g} className="pb-1">
                <div className="px-2.5 pb-1 pt-2 text-[12px] font-[500] text-[var(--soft)]">{g === 'Bills' && !q ? 'Recent bills' : g}</div>
                {items.filter((i) => i.group === g).map((i) => {
                  const idx = items.indexOf(i)
                  return (
                    <div key={i.id} role="option" aria-selected={idx === at} onMouseMove={() => setAt(idx)} onClick={() => pick(i)}
                      className={cx('flex h-10 items-center gap-3 rounded-[10px] px-2.5 text-[14px]', idx === at && 'bg-[var(--hover)] shadow-[inset_0_0_0_1px_var(--line)]')}>
                      <span className="grid size-5 place-items-center text-[var(--sub)]">{i.icon}</span>
                      <span className="flex-1 truncate font-[500]">{i.label}</span>
                      {i.hint}
                    </div>
                  )
                })}
              </div>
            ))}
            {!items.length && <div className="grid h-28 place-items-center text-[14px] text-[var(--soft)]">No bills or actions match “{q}”.</div>}
          </div>
          <div className="flex h-10 items-center gap-4 px-4 text-[12px] text-[var(--soft)] shadow-[inset_0_1px_0_var(--div)]">
            <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd>Navigate</span>
            <span className="flex items-center gap-1.5"><Kbd><CornerDownLeft size={10} strokeWidth={2.25} /></Kbd>Open</span>
            <span className="ml-auto">{items.length} results</span>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
