// Acquisity dashboard, redesigned from scratch in the AlignUI grammar (see work/acquisity-dashboard/DIRECTION.md).
import { useState } from 'react'
import { MotionConfig } from 'motion/react'
import Sidebar from './components/Sidebar'
import { PageHead, Topbar } from './components/Top'
import Kpis from './components/Kpis'
import Chart from './components/Chart'
import Agent from './components/Agent'
import { Attention, Campaigns } from './components/Tables'

export default function App() {
  const [range, setRange] = useState('30d')
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen w-full overflow-hidden bg-white">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1180px] space-y-6 px-8 py-7">
              <PageHead range={range} setRange={setRange} />
              <Kpis />
              <div className="grid grid-cols-[minmax(0,1fr)_368px] items-stretch gap-6">
                <Chart />
                <Agent />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_368px] items-start gap-6">
                <Campaigns />
                <Attention />
              </div>
            </div>
          </main>
        </div>
      </div>
    </MotionConfig>
  )
}
