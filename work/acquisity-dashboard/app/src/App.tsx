// Acquisity dashboard v2: AlignUI template grammar. Few boxes; sections divided by hairlines; a right rail behind one rule.
import { useState } from 'react'
import { MotionConfig } from 'motion/react'
import Sidebar from './components/Sidebar'
import { Filters, PageHeader } from './components/Top'
import Kpis from './components/Kpis'
import Chart from './components/Chart'
import { Intent, Sources } from './components/Breakdown'
import { Campaigns } from './components/Tables'
import { Attention, Run } from './components/Rail'

export default function App() {
  const [range, setRange] = useState('30d')
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen w-full overflow-hidden bg-white">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="px-8 pt-7">
            <PageHeader />
            <div className="py-5"><Filters range={range} setRange={setRange} /></div>
            <div className="pb-7"><Kpis /></div>
            <div className="h-px bg-stroke-soft" />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_352px] px-8 pb-10">
            <div className="min-w-0 space-y-8 pr-8 pt-7">
              <Chart />
              <div className="rule-dash" />
              <div className="grid grid-cols-2 gap-8"><Intent /><Sources /></div>
              <div className="rule-dash" />
              <Campaigns />
            </div>
            <aside className="space-y-8 border-l border-stroke-soft pl-8 pt-7" aria-label="Activity">
              <Run />
              <div className="h-px bg-stroke-soft" />
              <Attention />
            </aside>
          </div>
        </main>
      </div>
    </MotionConfig>
  )
}
