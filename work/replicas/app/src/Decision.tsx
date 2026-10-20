// Replica 3: affectUI "Decision Inbox" (knowledge/benchmarks/flohoeller/affectui-c-decision-inbox-stage.png, 1788x1040 at
// 2x = 894x520), rebuilt to its geometry with our own decisions. Own touch: a quiet "Due Fri" chip on the item that has
// a deadline. Fictional data (sample).
import type { ReactNode } from 'react'
import { RiErrorWarningFill } from '@remixicon/react'

const ink = '#171717', muted = '#8f8f8f'
const Primary = ({ children }: { children: ReactNode }) => (
  <span className="flex h-8 items-center whitespace-nowrap rounded-[10px] border border-transparent px-3 text-[14px] font-[500] text-[#fafafa]"
    style={{ background: 'linear-gradient(#323137, #201e25) padding-box, linear-gradient(#4b4951, #31303a, #18171b) border-box', boxShadow: '0 0 0 1px #0d0d0d, 0 2px 4px rgb(0 0 0 / 0.10)' }}>{children}</span>
)
const Secondary = ({ children }: { children: ReactNode }) => (
  <span className="flex h-8 items-center whitespace-nowrap rounded-[10px] bg-white px-3 text-[14px] font-[500]" style={{ color: ink, boxShadow: '0 0 0 1px #e5e5e5, 0 1px 2px rgb(0 0 0 / 0.04)' }}>{children}</span>
)
const Item = ({ q, meta, a, b, chip }: { q: string; meta: string; a: string; b: string; chip?: string }) => (
  <div className="px-5 pb-[14px] pt-[16px]">
    <div className="flex items-center gap-2 text-[14px] font-[500] leading-5" style={{ color: ink }}>{q}
      {chip && <span className="rounded-[6px] px-1.5 text-[11.5px] font-[500] leading-[18px]" style={{ background: '#f4f4f5', color: '#6b6b6b', boxShadow: 'inset 0 0 0 1px #ececec' }}>{chip}</span>}</div>
    <div className="mt-1 text-[13px] leading-[18px]" style={{ color: muted }}>{meta}</div>
    <div className="mt-[12px] flex gap-1.5"><Primary>{a}</Primary><Secondary>{b}</Secondary></div>
  </div>
)

export default function Decision() {
  return (
    <div className="relative" style={{ width: 894, height: 520, background: '#fff', fontFamily: '"Inter Variable", system-ui, sans-serif', fontFeatureSettings: '"cv11"' }}>
      <div className="absolute inset-0 rounded-[16px]" style={{ background: '#fafafa', boxShadow: 'inset 0 0 0 1px #e5e5e5' }} />
      <div data-subject className="absolute rounded-[20px] p-[6px] pt-0" style={{ left: 228, top: 116, width: 438, background: '#f0f0f0', boxShadow: 'inset 0 0 0 1px #ececec' }}>
        <div className="flex h-[46px] items-center gap-2 pl-[18px] text-[15px] font-[500]" style={{ color: '#f44900' }}>
          <RiErrorWarningFill size={17} />2 need your input
        </div>
        <div className="rounded-[16px] bg-white" style={{ boxShadow: '0 0 0 1px #ececec, 0 1px 2px rgb(0 0 0 / 0.04)' }}>
          <Item q="Ship the new checkout to the EU?" meta="Test won with +11% conversion · 3 weeks of data" a="Ship it" b="Keep testing" />
          <div className="h-px" style={{ background: '#ececec' }} />
          <Item q="Approve Jonas's offsite expenses?" meta="€2,614.40 · 2 receipts flagged by policy" a="Approve" b="Review receipts" chip="Due Fri" />
        </div>
      </div>
    </div>
  )
}
