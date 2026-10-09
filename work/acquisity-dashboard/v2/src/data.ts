// Sample data for the redesign. Everything reconciles (the original's KPIs and chart disagreed):
//   last 4 weeks replies 149+166+190+215 = 720 = KPI replies = campaign replies 387+223+110
//   last 4 weeks meetings 5+6+7+9 = 27 = KPI meetings = campaign meetings 14+8+5
//   emails sent 12,480+9,310+6,120 = 27,910; reply rate 720 / 27,910 = 2.58%
export const WEEKS = ['Aug 11', 'Aug 18', 'Aug 25', 'Sep 1', 'Sep 8', 'Sep 15']
export const REPLIES = [118, 131, 149, 166, 190, 215]
export const MEETINGS = [2, 4, 5, 6, 7, 9]

export const KPIS = [
  { label: 'Replies', value: '720', delta: '+14.6%', up: true, note: 'vs last 30 days', spark: [118, 131, 149, 166, 190, 215] },
  { label: 'Meetings booked', value: '27', delta: '+6', up: true, note: 'vs last 30 days', spark: [2, 4, 5, 6, 7, 9] },
  { label: 'Pipeline', value: '$184,300', delta: '+8.1%', up: true, note: 'from 27 meetings', spark: [120, 128, 141, 150, 168, 184] },
  { label: 'Reply rate', value: '2.58%', delta: '−0.2 pts', up: false, note: '720 of 27,910 emails', spark: [2.9, 2.8, 2.7, 2.7, 2.6, 2.58] },
]

export const CAMPAIGNS = [
  { name: 'Recruitment MDs, UK', owner: 'DW', status: 'Active', sent: 12480, replies: 387, meetings: 14 },
  { name: 'Logistics growth leads', owner: 'AI', status: 'Active', sent: 9310, replies: 223, meetings: 8 },
  { name: 'Accounting founders', owner: 'DW', status: 'Paused', sent: 6120, replies: 110, meetings: 5 },
  { name: 'Legal partners, EU', owner: 'DW', status: 'Draft', sent: 0, replies: 0, meetings: 0 },
] as const

export const INTENT = [
  { label: 'Interested', n: 4, cls: 'bg-primary' },
  { label: 'Not now', n: 6, cls: 'bg-[#94a8ff]' },
  { label: 'Out of office', n: 3, cls: 'bg-[#cdd7ff]' },
  { label: 'Unsubscribe', n: 1, cls: 'bg-[#e1e4ea]' },
]

// Reply sources (sample): sums to the 720 replies.
export const CHANNELS = [
  { label: 'Cold email', replies: 512, rate: '2.9%', trend: '+3.1%', up: true },
  { label: 'LinkedIn', replies: 141, rate: '4.2%', trend: '+0.8%', up: true },
  { label: 'Follow-ups', replies: 67, rate: '1.1%', trend: '−0.4%', up: false },
]
