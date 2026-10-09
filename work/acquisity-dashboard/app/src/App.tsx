// Ferry (v3): compact, record-centric product UI (Attio / Rico / Kargul grammar). v1 and v2 are kept in ../v1 and ../v2.
import { MotionConfig } from 'motion/react'
import './v3/tokens.css'
import { Sidebar } from './v3/Shell'
import HomeView from './v3/Home'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen w-full overflow-hidden bg-white text-[var(--ink)]"><Sidebar /><HomeView /></div>
    </MotionConfig>
  )
}
