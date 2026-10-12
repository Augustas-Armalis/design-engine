// Tiny store: bill statuses, the cash fix, selection and toasts. Every control on screen writes here.
import { useSyncExternalStore } from 'react'
import { bills as seed, me, type Bill } from './data'

type Toast = { id: number; title: string; detail?: string; undo?: () => void }
type State = { bills: Bill[]; moved: boolean; selected: Set<string>; toasts: Toast[] }
let state: State = { bills: seed, moved: false, selected: new Set(), toasts: [] }
const subs = new Set<() => void>()
const set = (p: Partial<State>) => { state = { ...state, ...p }; subs.forEach((f) => f()) }
export const useStore = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f) }, () => state)

let tid = 0
export function toast(t: Omit<Toast, 'id'>) {
  const id = ++tid
  set({ toasts: [...state.toasts, { ...t, id }].slice(-3) })
  setTimeout(() => dismiss(id), 5200)
}
export const dismiss = (id: number) => set({ toasts: state.toasts.filter((t) => t.id !== id) })

/* approving as Maya marks her step done; if she was the last pending step, the bill becomes Approved */
export function approve(ids: string[]) {
  const before = state.bills
  const next = state.bills.map((b) => {
    if (!ids.includes(b.id)) return b
    const chain = b.chain.map((s) => (s.who.id === me.id && s.state === 'waiting' ? { ...s, state: 'done' as const } : s))
    const nextIdx = chain.findIndex((s) => s.state === 'todo')
    if (nextIdx > -1) chain[nextIdx] = { ...chain[nextIdx], state: 'waiting' }
    return { ...b, chain, status: chain.every((s) => s.state === 'done') ? ('approved' as const) : b.status }
  })
  const sel = new Set(state.selected); ids.forEach((i) => sel.delete(i))
  set({ bills: next, selected: sel })
  const total = before.filter((b) => ids.includes(b.id)).reduce((a, b) => a + b.amount, 0)
  const first = before.find((b) => b.id === ids[0])
  toast({ title: ids.length === 1 ? `Approved ${first?.vendor.name}` : `Approved ${ids.length} bills`, detail: `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, undo: () => set({ bills: before }) })
}
export function setMoved(v: boolean) {
  set({ moved: v, bills: state.bills.map((b) => (b.id === 'b2' ? { ...b, run: v ? 'Oct 16' : 'Oct 15' } : b)) })
  if (v) toast({ title: 'Hartwell wire moved to Oct 16', detail: 'Oct 15 now clears $22,581 above buffer', undo: () => setMoved(false) })
}
export function toggle(id: string, on: boolean) { const s = new Set(state.selected); if (on) s.add(id); else s.delete(id); set({ selected: s }) }
export function selectAll(ids: string[], on: boolean) { set({ selected: on ? new Set(ids) : new Set() }) }
