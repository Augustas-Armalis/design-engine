// Sample data (fictional people and companies). Reconciles with the KPIs: 8 replies to handle, $96,400 potential.
import type { Hue } from './ui'
export type Reply = { id: number; lead: string; title: string; company: string; logo: string; intent: 'Interested' | 'Question' | 'Not now' | 'Referral'; campaign: string; value: number; received: string; ai: 'Draft ready' | 'Needs you' | 'Booked'; message: string; draft: string }
export const INTENT_HUE: Record<Reply['intent'], Hue> = { Interested: 'green', Question: 'blue', 'Not now': 'grey', Referral: 'purple' }
export const AI_HUE: Record<Reply['ai'], Hue> = { 'Draft ready': 'blue', 'Needs you': 'yellow', Booked: 'green' }
export const REPLIES: Reply[] = [
  { id: 1, lead: 'Maya Lindqvist', title: 'Head of Talent', company: 'Northbeam Freight', logo: '#08804c', intent: 'Interested', campaign: 'Logistics growth', value: 18400, received: '12 min ago', ai: 'Draft ready',
    message: 'This is timely. We are opening two depots in Q4 and hiring 40 drivers. Can you share how the pilot works and what it would cost for one region?', draft: 'Thanks Maya. The pilot runs for 30 days in one region and we only charge for interviews booked. I have Thursday 10:00 or Friday 14:00 free for a 20 minute walkthrough. Would either work?' },
  { id: 2, lead: 'Tomás Herrera', title: 'Managing Director', company: 'Herrera Recruitment', logo: '#1f5fd9', intent: 'Question', campaign: 'Recruitment MDs, UK', value: 12000, received: '40 min ago', ai: 'Draft ready',
    message: 'Do you integrate with Bullhorn, or would my team have to copy candidates across by hand?', draft: 'Good question, Tomás. Candidates sync to Bullhorn both ways, so nothing is copied by hand. Happy to show it on a 15 minute call this week.' },
  { id: 3, lead: 'Priya Natarajan', title: 'COO', company: 'Cartwheel Logistics', logo: '#b9560c', intent: 'Interested', campaign: 'Logistics growth', value: 22000, received: '1 h ago', ai: 'Booked',
    message: 'Booked a slot for Tuesday. Please send the agenda beforehand.', draft: 'Agenda sent with the calendar invite for Tuesday 11:00.' },
  { id: 4, lead: 'Daniel Okafor', title: 'Founder', company: 'Okafor & Co Accounting', logo: '#6a3fd6', intent: 'Referral', campaign: 'Accounting founders', value: 9500, received: '2 h ago', ai: 'Needs you',
    message: 'Not me, but our operations lead, Ruth Adeyemi, owns this. I have copied her in.', draft: 'Thanks Daniel. Ruth, would a short intro call next week be useful? I can send a two minute video first if easier.' },
  { id: 5, lead: 'Hanna Becker', title: 'Partner', company: 'Becker Legal', logo: '#8a6a00', intent: 'Not now', campaign: 'Recruitment MDs, UK', value: 0, received: '3 h ago', ai: 'Draft ready',
    message: 'We have just signed with another provider. Try us again in the new year.', draft: 'Understood, Hanna. I will check back in January. Good luck with the rollout.' },
  { id: 6, lead: 'Sam Whitfield', title: 'Ops Director', company: 'Whitfield Haulage', logo: '#0a5a70', intent: 'Interested', campaign: 'Logistics growth', value: 14500, received: '5 h ago', ai: 'Draft ready',
    message: 'Send me the case study you mentioned and some times next week.', draft: 'Here is the Cartwheel case study. I have Monday 09:30 or Wednesday 15:00 open next week.' },
  { id: 7, lead: 'Leah Morgan', title: 'Talent Partner', company: 'Morgan Search', logo: '#c4313a', intent: 'Question', campaign: 'Recruitment MDs, UK', value: 8000, received: 'Yesterday', ai: 'Needs you',
    message: 'What does pricing look like for a team of six recruiters?', draft: 'For six seats it is £1,140 a month billed annually. Want me to set up a trial for the team?' },
  { id: 8, lead: 'Arjun Mehta', title: 'CEO', company: 'Ledgerline', logo: '#4711bb', intent: 'Interested', campaign: 'Accounting founders', value: 12000, received: 'Yesterday', ai: 'Draft ready',
    message: 'Interesting. Who else in accounting is using this?', draft: 'Several firms around your size are piloting it. I can share an anonymised example and set up a call.' },
]
export const WEEKS = [{ w: 'Aug 11', r: 118 }, { w: 'Aug 18', r: 131 }, { w: 'Aug 25', r: 149 }, { w: 'Sep 1', r: 166 }, { w: 'Sep 8', r: 190 }, { w: 'Sep 15', r: 215 }]
export const CAMPAIGNS = [
  { name: 'Recruitment MDs, UK', hue: '#266df0', sent: 12480, rate: 3.1, meetings: 14, status: 'Sending' },
  { name: 'Logistics growth', hue: '#0eb472', sent: 9310, rate: 2.4, meetings: 8, status: 'Sending' },
  { name: 'Accounting founders', hue: '#9b69ff', sent: 6120, rate: 1.8, meetings: 5, status: 'Paused' },
  { name: 'Legal partners, EU', hue: '#c9ccd1', sent: 0, rate: 0, meetings: 0, status: 'Draft' },
]
