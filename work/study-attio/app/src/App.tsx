// Private study: 1:1 recreation of Attio's records table (attio.com/platform/data, "sales-screen" image).
// Credit: Attio. Logos and photos are cropped from the reference for the overlay exercise only; everything else is built.
import { RectangleEllipsis, PanelLeft, Bell, ChevronDown, ChevronRight, CircleDollarSign, Download, Mail, Plus, Search, Settings, SquareCheck, User, Workflow, ArrowUpDown, File } from 'lucide-react'
import { RiBarChartBoxLine, RiEqualizerLine, RiPriceTag3Line } from '@remixicon/react'
import { User as PUser, Buildings as PBuildings, Receipt as PReceipt, Handshake as PHandshake, SealCheck as PSealCheck } from '@phosphor-icons/react'
import './study.css'

const I = { size: 14, absoluteStrokeWidth: true, strokeWidth: 1.25 } as const
const A = (n: string) => `./ref-assets/${n}.png`

type Tone = 'blue' | 'green' | 'grey' | 'purple' | 'cyan' | 'yellow' | 'pink'
const TYPE: Record<string, Tone> = { 'One-time': 'blue', Recurring: 'green', Trial: 'grey', Exclusive: 'pink' }
const SRC: Record<string, Tone> = { Outreach: 'grey', Referral: 'purple', Event: 'cyan', Inbound: 'yellow' }

const ROWS: [string, string, string, string, string, string, string][] = [
  ['Retool', 'retool', 'One-time', '$4,300', 'Emily Johnson', 'emily', 'Outreach'],
  ['DigitalOcean', 'digitalocean', 'Recurring', '$70,650', 'Ethan Smith', 'ethan', 'Referral'],
  ['Stripe', 'stripe', 'Trial', '$5,800', 'Javier Torres', 'javier', 'Referral'],
  ['Square', 'square', 'Recurring', '$100,200', 'Ava Taylor', 'ava', 'Event'],
  ['Loom', 'loom', 'One-time', '$3,900', 'Liam Jones', 'liam', 'Inbound'],
  ['Superhuman', 'superhuman', 'One-time', '$6,250', 'Sophia Davis', 'sophia', 'Outreach'],
  ['Notion', 'notion', 'Exclusive', '$4,700', 'Alex Anderson', 'alex', 'Outreach'],
  ['Webflow', 'webflow', 'Recurring', '$90,100', 'Lucas Miller', 'lucas', 'Event'],
  ['Miro', 'miro', 'One-time', '$3,200', 'Sofia Petrova', 'sofia', 'Referral'],
  ['Linear', 'linear', 'Exclusive', '$7,950', 'Maria Gonzalez', 'maria', 'Inbound'],
]

function Sidebar() {
  return (
    <aside className="side" aria-label="Workspace">
      <div className="side-head">
        <img className="ws-logo" src={A('ws-logo')} alt="" />
        <span className="ws-name">Basepoint</span>
        <ChevronDown className="ws-chev" size={16} absoluteStrokeWidth strokeWidth={1.25} />
        <PanelLeft className="side-toggle" size={20} absoluteStrokeWidth strokeWidth={1.3} />
      </div>
      <div className="side-actions">
        <span className="btn qa"><span className="keycap">K</span>Quick actions<span className="kbd">⌘K</span></span>
        <span className="btn search"><Search {...I} /><span className="kbd">/</span></span>
      </div>
      <ul className="nav">
        <li><Bell {...I} />Notifications</li>
        <li><SquareCheck {...I} />Tasks</li>
        <li><File {...I} />Notes</li>
        <li><Mail {...I} />Emails</li>
        <li><RiBarChartBoxLine size={16} style={{ margin: '0 -1px' }} />Reports</li>
        <li><Workflow {...I} />Automations</li>
      </ul>
      <div className="sec sec-fav"><ChevronRight size={12} absoluteStrokeWidth strokeWidth={1.4} />Favorites</div>
      <div className="sec sec-rec"><ChevronDown size={12} absoluteStrokeWidth strokeWidth={1.4} />Records</div>
      <ul className="nav records">
        <li><span className="tile" style={{ background: '#266df0' }}><PUser size={10} weight="fill" /></span>People</li>
        <li><span className="tile" style={{ background: '#266df0' }}><PBuildings size={10} weight="fill" /></span>Companies</li>
        <li className="active"><span className="tile" style={{ background: '#fd9038' }}><PReceipt size={10} weight="fill" /></span>Deals</li>
        <li><span className="tile" style={{ background: '#0eb472' }}><PHandshake size={10} weight="fill" /></span>Partnerships</li>
        <li><span className="tile" style={{ background: '#dba600' }}><PSealCheck size={10} weight="fill" /></span>Invoices</li>
      </ul>
    </aside>
  )
}

function Chip({ label, tone }: { label: string; tone: Tone }) {
  return <span className={`chip c-${tone}`}>{label}</span>
}

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <div className="topbar">
          <h1 className="title">Deals</h1>
          <div className="avatars" aria-label="Viewers">
            <span className="av-ring" style={{ borderColor: '#266df0' }}><img src={A('top-1')} alt="" /></span>
            <span className="av-ring" style={{ borderColor: '#9b69ff' }}><span style={{ background: '#f5b400', color: '#fff', fontSize: 11 }}>A</span></span>
            <span className="av-ring" style={{ borderColor: '#f97514' }}><img src={A('top-3')} alt="" /></span>
            <span className="av-more">+1</span>
          </div>
        </div>
        <div className="viewbar">
          <span className="btn alld"><span className="grid-ico"><i /><i /><i /><i /></span>All deals<ChevronDown className="chev" size={11} absoluteStrokeWidth strokeWidth={1.3} /></span>
          <span className="grow" />
          <span className="btn vs"><Settings {...I} />View settings</span>
          <span className="btn imp"><Download {...I} />Import / Export<ChevronDown className="chev" size={12} absoluteStrokeWidth strokeWidth={1.3} /></span>
        </div>
        <div className="sortbar">
          <span className="dashed sort"><ArrowUpDown size={14} absoluteStrokeWidth strokeWidth={1.2} />Sort</span>
          <span className="vdiv" />
          <span className="dashed"><RiEqualizerLine size={16} style={{ margin: '0 -1px' }} />Filter</span>
        </div>
        <div className="table" role="table" aria-label="Deals">
          <div className="th"><span className="check" /><span style={{ marginLeft: 4 }}>Deal</span><Plus className="plus" size={12} absoluteStrokeWidth strokeWidth={1.4} /></div>
          <div className="th"><RiPriceTag3Line size={15} style={{ margin: '0 -0.5px' }} />Type</div>
          <div className="th"><CircleDollarSign {...I} />Potential value (USD)</div>
          <div className="th"><User {...I} />Point of contact</div>
          <div className="th"><RectangleEllipsis {...I} />Source</div>
          {ROWS.map(([deal, logo, type, val, poc, av, src]) => (
            <div key={deal} style={{ display: 'contents' }}>
              <div className="td deal"><span className="check" /><img className="logo" src={A(`logo-${logo}`)} alt="" /><span className="ul">{deal}</span></div>
              <div className="td"><Chip label={type} tone={TYPE[type]} /></div>
              <div className="td num">{val}</div>
              <div className="td"><span className="rel"><img src={A(`av-${av}`)} alt="" />{poc}</span></div>
              <div className="td"><Chip label={src} tone={SRC[src]} /></div>
            </div>
          ))}
          <div className="td foot"><span className="k">2,813</span><span className="m">count</span></div>
          <div className="td foot"><span className="add"><Plus size={12} absoluteStrokeWidth strokeWidth={1.4} />Add calculation</span></div>
          <div className="td foot"><span className="k">$83,560,165</span><span className="m">sum</span></div>
          <div className="td foot"><span className="add"><Plus size={12} absoluteStrokeWidth strokeWidth={1.4} />Add calculation</span></div>
          <div className="td foot"><span className="add"><Plus size={12} absoluteStrokeWidth strokeWidth={1.4} />Add calculation</span></div>
        </div>
      </main>
    </div>
  )
}
