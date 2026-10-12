// Settle: accounts payable for finance teams (fictional; sample data). Inset-panel shell: the sidebar sits on the canvas,
// the work happens on one white panel. Routes: #/ overview, #/bills, #/bills/<id> (detail sheet), #/k (palette). ?theme=dark
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { Bell, ChevronRight, Moon, Sun } from 'lucide-react'
import Sidebar from './Sidebar'
import Overview from './Overview'
import Bills from './Bills'
import Sheet from './Sheet'
import Command from './Command'
import { dismiss, useStore } from './store'
import { Button, I, Tip } from './ui'

function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[340px] flex-col gap-2">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div key={t.id} layout initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }} transition={{ duration: 0.22, ease: [0.215, 0.61, 0.355, 1] }}
            role="status" className="pointer-events-auto flex items-center gap-3 rounded-[12px] bg-[#161615] py-2 pl-3.5 pr-2 text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] dark:bg-[#26262a] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.5)]">
            <div className="min-w-0 flex-1 leading-[18px]"><div className="truncate text-[14px] font-[500]">{t.title}</div>{t.detail && <div className="tnum truncate text-[12px] text-white/60">{t.detail}</div>}</div>
            {t.undo && <button onClick={() => { t.undo!(); dismiss(t.id) }} className="st h-[30px] rounded-[8px] px-2.5 text-[14px] font-[500] text-white/90 hover:bg-white/10">Undo</button>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const [hash, setHash] = useState(location.hash || '#/')
  const [theme, setTheme] = useState<'light' | 'dark'>(new URLSearchParams(location.search).get('theme') === 'dark' ? 'dark' : 'light')
  useEffect(() => { const f = () => setHash(location.hash || '#/'); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const parts = hash.slice(2).split('/')
  const page = parts[0] === 'bills' ? 'bills' : 'overview'
  const sheet = parts[0] === 'bills' && parts[1] ? parts[1] : null
  const [palette, setPalette] = useState(parts[0] === 'k')
  useEffect(() => { if (parts[0] === 'k') setPalette(true) }, [hash]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((p) => !p) }
      if (e.shiftKey && e.key === 'T' && !(e.target instanceof HTMLInputElement)) toggleTheme()
    }
    addEventListener('keydown', f); return () => removeEventListener('keydown', f)
  }, [toggleTheme])

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen min-h-[760px] w-full min-w-[1200px] overflow-hidden bg-[var(--canvas)]">
        <Sidebar page={page} />
        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--panel)]">
          <div className="flex h-[52px] shrink-0 items-center gap-2 px-5 shadow-[inset_0_-1px_0_var(--div)]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px] font-[500]">
              <a href="#/" className="st -mx-1 inline-flex h-6 items-center rounded-[6px] px-1 text-[var(--soft)] hover:text-[var(--ink)]">Payables</a>
              <ChevronRight size={12} strokeWidth={2} className="text-[var(--faint)]" />
              <span aria-current="page">{page === 'bills' ? 'Bills' : 'Overview'}</span>
            </nav>
            <div className="ml-auto flex items-center gap-1">
              <Tip label="Notifications"><Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell {...I} /><span className="absolute right-[8px] top-[7px] size-[6px] rounded-full bg-[var(--ink)] shadow-[0_0_0_1.5px_var(--panel)]" /></Button></Tip>
              <Tip label={theme === 'dark' ? 'Light theme' : 'Dark theme'}><Button variant="ghost" size="icon" aria-label="Switch theme" onClick={toggleTheme}>{theme === 'dark' ? <Sun {...I} /> : <Moon {...I} />}</Button></Tip>
            </div>
          </div>
          <main className="min-h-0 flex-1 overflow-y-auto">{page === 'bills' ? <Bills /> : <Overview />}</main>
          <Sheet id={sheet} />
        </div>
      </div>
      <Command open={palette} onOpen={(v) => { setPalette(v); if (!v && parts[0] === 'k') history.replaceState(null, '', '#/') }} toggleTheme={toggleTheme} />
      <Toasts />
    </MotionConfig>
  )
}
