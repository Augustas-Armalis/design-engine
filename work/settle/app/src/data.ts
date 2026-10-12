// Settle sample data. Fictional workspace; vendor names are used as plausible payees, not as customers or endorsements.
// Today is Monday 12 Oct 2026. Pay runs go out on Thursdays. Every total on screen is derived from these rows.
import { createAvatar } from '@dicebear/core'
import { openPeeps } from '@dicebear/collection'
import { siGooglecloud, siDatadog, siFigma, siVercel, siNotion, siLinear, siGithub, siHubspot, siAtlassian, siSentry, siMongodb, siCloudflare, siGusto, siDropbox, siWebflow } from 'simple-icons'
const si = { siGooglecloud, siDatadog, siFigma, siVercel, siNotion, siLinear, siGithub, siHubspot, siAtlassian, siSentry, siMongodb, siCloudflare, siGusto, siDropbox, siWebflow }

export type Person = { id: string; name: string; role: string; face: string }
const face = (seed: string, bg: string) => createAvatar(openPeeps, { seed, backgroundColor: [bg], maskProbability: 0, scale: 92, translateY: 2 }).toDataUri()
const P = (id: string, name: string, role: string, bg: string): Person => ({ id, name, role, face: face(name, bg) })
export const people = {
  maya: P('maya', 'Maya Okafor', 'Controller', 'ececec'),
  daniel: P('daniel', 'Daniel Reyes', 'CFO', 'ececec'),
  priya: P('priya', 'Priya Natarajan', 'Engineering', 'ececec'),
  tom: P('tom', 'Tom Becker', 'Operations', 'ececec'),
  lena: P('lena', 'Lena Vogt', 'Marketing', 'ececec'),
  sam: P('sam', 'Sam Whitaker', 'People', 'ececec'),
  jonas: P('jonas', 'Jonas Lindqvist', 'Infrastructure', 'ececec'),
  aiko: P('aiko', 'Aiko Tanaka', 'Design', 'ececec'),
}
export const me = people.maya

export type Vendor = { name: string; icon?: { path: string; hex: string }; mono?: string; tint?: string }
const V = (name: string, key?: keyof typeof si, mono?: string, tint?: string): Vendor =>
  ({ name, icon: key ? { path: (si[key] as { path: string }).path, hex: (si[key] as { hex: string }).hex } : undefined, mono, tint })
export const vendors = {
  gcloud: V('Google Cloud', 'siGooglecloud'),
  datadog: V('Datadog', 'siDatadog'),
  figma: V('Figma', 'siFigma'),
  vercel: V('Vercel', 'siVercel'),
  notion: V('Notion', 'siNotion'),
  linear: V('Linear', 'siLinear'),
  github: V('GitHub', 'siGithub'),
  hubspot: V('HubSpot', 'siHubspot'),
  atlassian: V('Atlassian', 'siAtlassian'),
  sentry: V('Sentry', 'siSentry'),
  mongodb: V('MongoDB Atlas', 'siMongodb'),
  cloudflare: V('Cloudflare', 'siCloudflare'),
  gusto: V('Gusto', 'siGusto'),
  dropbox: V('Dropbox', 'siDropbox'),
  webflow: V('Webflow', 'siWebflow'),
  hartwell: V('Hartwell Properties', undefined, 'HP', '#b4690e'),
  northline: V('Northline Freight', undefined, 'NF', '#2f6fe4'),
  kessler: V('Kessler & Ames LLP', undefined, 'KA', '#7a5af5'),
  brightdesk: V('Brightdesk Contractors', undefined, 'BC', '#0b7a5c'),
}

export type Category = 'Software' | 'Infrastructure' | 'Facilities' | 'Contractors' | 'Legal' | 'Freight' | 'Marketing' | 'Payroll'
export const categoryHue: Record<Category, string> = {
  Software: 'violet', Infrastructure: 'blue', Facilities: 'amber', Contractors: 'teal', Legal: 'rose', Freight: 'sky', Marketing: 'pink', Payroll: 'slate',
}

export type Status = 'review' | 'approval' | 'approved' | 'scheduled' | 'paid'
export type Step = { who: Person; state: 'done' | 'waiting' | 'todo' }
export type Bill = {
  id: string; vendor: Vendor; invoice: string; category: Category; owner: Person; amount: number
  due: string; dueIn: number; status: Status; chain: Step[]; match: [boolean, boolean, boolean] | null
  method: 'ACH' | 'Wire' | 'Card'; run?: string; discount?: { terms: string; save: number; by: string }; memo: string
}
const chain = (...s: [Person, Step['state']][]) => s.map(([who, state]) => ({ who, state }))
const { maya, daniel, priya, tom, lena, sam, jonas, aiko } = people
const v = vendors

export const bills: Bill[] = [
  { id: 'b1', vendor: v.gcloud, invoice: 'GCP-3392-1180', category: 'Infrastructure', owner: jonas, amount: 42118.55, due: 'Oct 15', dueIn: 3, status: 'approval', chain: chain([jonas, 'done'], [maya, 'waiting'], [daniel, 'todo']), match: null, method: 'ACH', memo: 'September usage, prod + staging projects' },
  { id: 'b2', vendor: v.hartwell, invoice: 'HP-2026-10', category: 'Facilities', owner: tom, amount: 38500, due: 'Oct 15', dueIn: 3, status: 'scheduled', chain: chain([tom, 'done'], [maya, 'done']), match: [true, true, true], method: 'Wire', run: 'Oct 15', memo: 'Office lease, 4th floor, October (5-day grace)' },
  { id: 'b3', vendor: v.datadog, invoice: 'DD-118204', category: 'Infrastructure', owner: jonas, amount: 18940.12, due: 'Oct 19', dueIn: 7, status: 'approval', chain: chain([jonas, 'done'], [priya, 'waiting'], [maya, 'todo']), match: [true, false, true], method: 'ACH', memo: 'APM + logs overage, September' },
  { id: 'b4', vendor: v.brightdesk, invoice: 'BC-0412', category: 'Contractors', owner: priya, amount: 16800, due: 'Oct 10', dueIn: -2, status: 'approval', chain: chain([priya, 'done'], [maya, 'waiting']), match: [true, true, true], method: 'ACH', memo: '2 contractors, sprint 41-42 (120h)' },
  { id: 'b5', vendor: v.figma, invoice: 'FIG-77310', category: 'Software', owner: aiko, amount: 14400, due: 'Oct 22', dueIn: 10, status: 'approved', chain: chain([aiko, 'done'], [maya, 'done']), match: [true, true, true], method: 'Card', discount: { terms: '2/10 net 30', save: 288, by: 'Oct 16' }, memo: 'Organization plan, 40 seats, annual' },
  { id: 'b6', vendor: v.kessler, invoice: 'KA-55-2291', category: 'Legal', owner: daniel, amount: 12250, due: 'Oct 26', dueIn: 14, status: 'review', chain: chain([daniel, 'todo'], [maya, 'todo']), match: null, method: 'Wire', memo: 'Series B data-room review, 24.5h' },
  { id: 'b7', vendor: v.northline, invoice: 'NF-90817', category: 'Freight', owner: tom, amount: 6820.4, due: 'Oct 15', dueIn: 3, status: 'scheduled', chain: chain([tom, 'done']), match: [true, true, true], method: 'ACH', run: 'Oct 15', discount: { terms: '1/10 net 30', save: 68.2, by: 'Oct 15' }, memo: 'Hardware kits to EU warehouse' },
  { id: 'b8', vendor: v.hubspot, invoice: 'HS-40021', category: 'Marketing', owner: lena, amount: 6400, due: 'Oct 29', dueIn: 17, status: 'approval', chain: chain([lena, 'done'], [maya, 'waiting']), match: null, method: 'Card', memo: 'Marketing Hub Pro, Q4' },
  { id: 'b9', vendor: v.mongodb, invoice: 'MDB-662019', category: 'Infrastructure', owner: jonas, amount: 5312.9, due: 'Oct 22', dueIn: 10, status: 'scheduled', chain: chain([jonas, 'done'], [maya, 'done']), match: [true, true, true], method: 'ACH', run: 'Oct 22', memo: 'Atlas M40 cluster, September' },
  { id: 'b10', vendor: v.atlassian, invoice: 'ATL-AT-3381', category: 'Software', owner: priya, amount: 4860, due: 'Oct 22', dueIn: 10, status: 'approved', chain: chain([priya, 'done'], [maya, 'done']), match: [true, true, true], method: 'Card', memo: 'Jira + Confluence, 60 seats' },
  { id: 'b11', vendor: v.vercel, invoice: 'VC-2026-0931', category: 'Infrastructure', owner: priya, amount: 3212.8, due: 'Oct 16', dueIn: 4, status: 'scheduled', chain: chain([priya, 'done']), match: [true, true, true], method: 'Card', run: 'Oct 15', memo: 'Pro team + bandwidth overage' },
  { id: 'b12', vendor: v.cloudflare, invoice: 'CF-77104', category: 'Infrastructure', owner: jonas, amount: 2950, due: 'Oct 29', dueIn: 17, status: 'approved', chain: chain([jonas, 'done'], [maya, 'done']), match: [true, true, true], method: 'Card', memo: 'Enterprise add-ons, October' },
  { id: 'b13', vendor: v.webflow, invoice: 'WF-31122', category: 'Marketing', owner: lena, amount: 2388, due: 'Nov 2', dueIn: 21, status: 'review', chain: chain([lena, 'todo'], [maya, 'todo']), match: null, method: 'Card', memo: 'CMS plan + 2 editor seats, annual' },
  { id: 'b14', vendor: v.notion, invoice: 'NTN-58834', category: 'Software', owner: sam, amount: 2160, due: 'Oct 26', dueIn: 14, status: 'scheduled', chain: chain([sam, 'done']), match: [true, true, true], method: 'Card', run: 'Oct 22', memo: 'Plus plan, 120 members' },
  { id: 'b15', vendor: v.linear, invoice: 'LIN-12007', category: 'Software', owner: priya, amount: 1920, due: 'Oct 19', dueIn: 7, status: 'approved', chain: chain([priya, 'done']), match: [true, true, true], method: 'Card', memo: 'Business plan, 80 seats' },
  { id: 'b16', vendor: v.sentry, invoice: 'SEN-8812', category: 'Infrastructure', owner: jonas, amount: 1480, due: 'Oct 26', dueIn: 14, status: 'approval', chain: chain([jonas, 'done'], [maya, 'waiting']), match: null, method: 'Card', memo: 'Team plan + replays' },
  { id: 'b17', vendor: v.github, invoice: 'GH-INV-40217', category: 'Software', owner: priya, amount: 1386, due: 'Oct 19', dueIn: 7, status: 'scheduled', chain: chain([priya, 'done']), match: [true, true, true], method: 'Card', run: 'Oct 15', memo: 'Team, 66 seats + Actions minutes' },
  { id: 'b18', vendor: v.dropbox, invoice: 'DBX-447120', category: 'Software', owner: sam, amount: 899.4, due: 'Oct 8', dueIn: -4, status: 'review', chain: chain([sam, 'todo']), match: null, method: 'Card', memo: 'Business, 30 licences' },
  { id: 'b19', vendor: v.gusto, invoice: 'GUS-PR-1015', category: 'Payroll', owner: sam, amount: 1240, due: 'Oct 15', dueIn: 3, status: 'paid', chain: chain([sam, 'done']), match: null, method: 'ACH', memo: 'Payroll platform fee, October' },
]

export const statusMeta: Record<Status, { label: string; tone: 'warn' | 'bad' | 'muted' | 'ink' }> = {
  review: { label: 'In review', tone: 'muted' },
  approval: { label: 'Needs approval', tone: 'warn' },
  approved: { label: 'Approved', tone: 'ink' },
  scheduled: { label: 'Scheduled', tone: 'ink' },
  paid: { label: 'Paid', tone: 'muted' },
}

// Cash forecast, next 30 days from Oct 12. Opening balance, then daily: customer receipts in, and the outflows that land.
// Outflows: Thursday pay runs (sum of bills scheduled/approved for that run), payroll on Oct 15 and Oct 30.
export const OPENING = 1084300
export const BUFFER = 750000
const runSum = (run: string) => { const b = bills.filter((x) => x.run === run); return { amount: b.reduce((a, x) => a + x.amount, 0), bills: b.length } }
const runOut: Record<number, { label: string; amount: number; bills: number; est?: boolean }> = {
  3: { label: 'Pay run · Oct 15', ...runSum('Oct 15') },
  10: { label: 'Pay run · Oct 22', ...runSum('Oct 22') },
  17: { label: 'Pay run · Oct 29', amount: 64200, bills: 7, est: true },
  24: { label: 'Pay run · Nov 5', amount: 41200, bills: 6, est: true },
}
const payroll: Record<number, number> = { 3: 412800, 18: 412800 }
const receipts = [0, 38200, 52400, 21900, 64100, 0, 0, 44800, 30100, 58200, 26400, 71900, 0, 0, 40300, 62200, 18800, 49900, 83100, 0, 0, 51200, 37400, 22600, 60800, 45500, 0, 0, 39900, 68400, 27300]
export type Day = { i: number; label: string; balance: number; inflow: number; outflow: number; run?: { label: string; amount: number; bills: number; est?: boolean }; payroll?: number }
const start = new Date(2026, 9, 12)
export const forecast: Day[] = (() => {
  let bal = OPENING
  return receipts.map((r, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i)
    const run = runOut[i], pr = payroll[i]
    const out = (run?.amount ?? 0) + (pr ?? 0)
    bal += r - out
    return { i, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), balance: bal, inflow: r, outflow: out, run, payroll: pr }
  })
})()

export const fmt = (n: number, cents = true) => n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })
export const short = (n: number) => n >= 1e6 ? `${+(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}k` : String(Math.round(n))
