// Recreation of rico's (@_heyrico) settings / wallet screen (knowledge/benchmarks/heyrico/settings-wallet-segmented-meters.jpg).
// Private study. Page CSS px measured from the reference at scale 1.125 (1600x1024 frame).
import type { CSSProperties, ReactNode } from 'react'
import {
  BadgeCheck, Bell, ChartColumn, ChevronLeft, CircleHelp, CircleUserRound, Contrast, Gift, Globe, KeyRound, LockKeyhole, Medal, Wallet as WalletIcon, Webhook,
} from 'lucide-react'
import { RiCodeBoxFill } from '@remixicon/react'

const C = { canvas: '#ededed', win: '#fbfbfb', white: '#ffffff', line: '#f0f0f0', strong: '#3a3a3a', title: '#333333', row: '#424242', count: '#474747', nav: '#494949', icon: '#7e7e7e', sub: '#828282', meta: '#656565', label: '#a3a3a3', tick: '#559ff6', empty: '#f0f0f0', pill: '#f0f0f0' }
const abs = (x: number, y: number, w?: number, h?: number): CSSProperties => ({ position: 'absolute', left: x, top: y, width: w, height: h })
// place a single text line so its cap top lands on the measured cap top (Inter: ascender .96875, content 1.2109em, cap .727em)
const capTop = (cap: number, fs: number, lh: number) => cap - (lh - 1.2109 * fs) / 2 - (0.96875 - 0.727) * fs
function T({ x, cap, fs, lh = Math.round(fs * 1.34), w = 'auto', weight = 500, color = C.strong, ls = 0, align, children }: { x: number; cap: number; fs: number; lh?: number; w?: number | 'auto'; weight?: number; color?: string; ls?: number; align?: 'right'; children: ReactNode }) {
  const style: CSSProperties = { position: 'absolute', top: capTop(cap, fs, lh), fontSize: fs, lineHeight: `${lh}px`, fontWeight: weight, color, letterSpacing: ls, whiteSpace: 'nowrap' }
  if (align === 'right') Object.assign(style, { right: 1600 - x, textAlign: 'right' }); else Object.assign(style, { left: x, width: w })
  return <span style={style}>{children}</span>
}

const NAV: { label?: string; c: number; t?: string; icon?: ReactNode; active?: boolean }[] = [
  { label: 'Account', c: 154.7 },
  { t: 'Profile', c: 183.5, icon: <CircleUserRound /> },
  { t: 'Password', c: 213.3, icon: <LockKeyhole /> },
  { label: 'Billing', c: 259.1 },
  { t: 'Wallet', c: 287.6, icon: <WalletIcon />, active: true },
  { t: 'Usage', c: 317.3, icon: <ChartColumn /> },
  { t: 'Referral', c: 347.2, icon: <Gift /> },
  { label: 'Preferences', c: 392 },
  { t: 'Appearance', c: 421.3, icon: <Contrast /> },
  { t: 'Notifications', c: 450.7, icon: <Bell /> },
  { label: 'Email', c: 496 },
  { t: 'Deliverability', c: 525.3, icon: <BadgeCheck /> },
  { label: 'Developers', c: 571 },
  { t: 'Integrations', c: 599.6, icon: <Globe /> },
  { t: 'API Keys', c: 629.3, icon: <KeyRound /> },
  { t: 'Webhooks', c: 659.5, icon: <Webhook /> },
]
const ROWS = [
  ['5 hour usage limit', 'Resets daily at midnight UTC', '0 / 25'],
  ['Image generations', 'Resets daily at midnight UTC', '0 / 30'],
  ['Monthly AI requests', 'Manage your credits and plan limits.', '0 / 30'],
  ['Brands', 'Active brands in your account', '0 / 30'],
  ['Emails sent today', 'Resets daily at midnight UTC', '0 / 30'],
  ['Emails sent this month', 'Resets on the 1st of each month', '0 / 30'],
]

function Meter({ y, filled = 8 }: { y: number; filled?: number }) {
  return (
    <div style={abs(1000.1, y + 0.9, 113, 12)} className="flex justify-between">
      {Array.from({ length: 10 }, (_, i) => <span key={i} className="block h-[12px] w-[8px] rounded-[2px]" style={{ background: i < filled ? C.tick : C.empty }} />)}
    </div>
  )
}

export default function Wallet() {
  return (
    <div className="relative overflow-hidden" style={{ width: 1600, height: 1024, background: C.canvas }}>
      <div style={{ ...abs(132, 94, 1336, 835), background: C.win, borderRadius: 8 }} />
      {/* sidebar */}
      <span style={{ ...abs(148.4, 112.4, 16, 16), color: '#4b4b4b' }} className="[&>svg]:size-4"><ChevronLeft strokeWidth={1.5} /></span>
      <T x={172.3} cap={115} fs={12} weight={550} ls={-0.15} color={C.nav}>Back to migma</T>
      {NAV.map((n) => n.label ? (
        <T key={n.label} x={148.2} cap={n.c - 4} fs={11} color={C.label}>{n.label}</T>
      ) : (
        <div key={n.t}>
          {n.active && <div style={{ ...abs(140, n.c - 14, 204.5, 28), background: C.pill, borderRadius: 8 }} />}
          <span style={{ ...abs(148.6, n.c - 7.6, 15, 15), color: n.active ? '#494a4e' : C.icon }} className="[&>svg]:size-[15px] [&>svg]:stroke-[1.6]">{n.icon}</span>
          <T x={173.2} cap={n.c - 4.7} fs={13} ls={-0.35} weight={550} color={C.nav}>{n.t}</T>
        </div>
      ))}
      <span style={{ ...abs(148.6, 897.4, 15, 15), color: C.icon }} className="[&>svg]:size-[15px] [&>svg]:stroke-[1.6]"><CircleHelp /></span>
      <T x={173.2} cap={900.3} fs={13} ls={-0.35} weight={550} color={C.nav}>Helps</T>

      {/* content panel */}
      <div style={{ ...abs(353, 100.5, 1109, 821.5), background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={abs(-354, -101.5, 1600, 1024)}>
          <T x={610} cap={151.1} fs={16.5} lh={20} weight={550} color={C.title}>Wallet</T>

          {/* usage card (tinted) holding the white plan/billing card */}
          <div style={{ ...abs(610, 204, 595.5, 547.5), background: '#fbfbfb', border: `1px solid ${C.line}`, borderRadius: 12 }} />
          <div style={{ ...abs(615, 209.5, 585.5, 112.5), background: C.white, border: `1px solid ${C.line}`, borderRadius: 7 }} />
          <div style={{ ...abs(906.5, 210.5, 1, 110.5), background: C.line }} />
          <T x={628.3} cap={225.5} fs={11} weight={550} color={C.meta}>Plan</T>
          <T x={628.3} cap={249.8} fs={14} lh={20} weight={550}>Basic</T>
          <span style={{ ...abs(674, 248, 16, 16), color: '#525252' }} className="[&>svg]:size-4"><Medal strokeWidth={2} /></span>
          <T x={628.3} cap={299.5} fs={11} color={C.sub}>$100/mo</T>
          <T x={894.4} cap={299.5} fs={11} color={C.sub} align="right">Next billing on Apr 16</T>
          <T x={920.8} cap={225.5} fs={11} weight={550} color={C.meta}>Billing</T>
          <T x={920.8} cap={249.8} fs={14} lh={20} weight={550} ls={-0.2}>Mastercard 1234</T>
          <span style={abs(1041.5, 250.5, 13.5, 9)} className="relative">
            <i className="absolute left-0 top-0 block size-[9px] rounded-full" style={{ background: '#d0131c' }} />
            <i className="absolute left-[4.5px] top-0 block size-[9px] rounded-full" style={{ background: '#f9a020', mixBlendMode: 'multiply' }} />
          </span>
          <T x={920.8} cap={300} fs={11} color={C.sub}>Expires on 06/27</T>

          {ROWS.map(([t, s, n], i) => {
            const y = 348.9 + i * 59.56
            return (
              <div key={t}>
                <T x={628.3} cap={y} fs={12} ls={-0.15} weight={550} color={C.row}>{t}</T>
                <T x={628.3} cap={y + 19.4} fs={11} ls={0.06} color={C.sub}>{s}</T>
                <Meter y={y + 7.4} filled={8} />
                <T x={1187.6} cap={y + 10.3} fs={12} weight={550} color={C.count} align="right">{n}</T>
              </div>
            )
          })}
          <div style={{ ...abs(627.5, 701.5, 116, 32.5), background: 'linear-gradient(180deg, #363636, #1c1c1c)', borderRadius: 8, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.10), 0 0 0 0.5px #161616' }} className="flex items-center justify-center text-[12px] leading-[16px] font-[500] text-white">Manage Billing</div>

          {/* API rate limits card */}
          <div style={{ ...abs(610, 791.5, 595.5, 300), background: C.white, border: `1px solid ${C.line}`, borderRadius: 12 }} />
          <span style={{ ...abs(628, 807.4, 14, 14), color: '#4a4854' }}><RiCodeBoxFill size={14} /></span>
          <T x={653} cap={810.7} fs={12} weight={550} color={C.row}>API Rate Limits</T>
          <T x={628.3} cap={843.3} fs={12} weight={550} color={C.row}>Requests per minute</T>
          <T x={1187.6} cap={843.3} fs={12} weight={550} color={C.count} align="right">100</T>
          <T x={629} cap={876.4} fs={12} weight={550} color={C.row}>Sending routes (/min)</T>
          <T x={1186.7} cap={876.5} fs={12} weight={550} color={C.count} align="right">10</T>
          <div style={{ ...abs(628, 909, 146, 30), border: `1px solid #e8e8e8`, borderRadius: 8, background: C.white }} className="flex items-center justify-center text-[12px] leading-[16px] font-[500]" ><span style={{ color: C.strong }}>Request limit access</span></div>
        </div>
      </div>
    </div>
  )
}
