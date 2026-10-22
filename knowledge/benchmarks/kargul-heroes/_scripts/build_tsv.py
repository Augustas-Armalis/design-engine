import json, statistics as st, csv, os
B = '/Users/augustas/Documents/Larpo front-end engine/knowledge/benchmarks/kargul-heroes/'
case = {r[0]: (r[1], r[3]) for r in json.load(open('/private/tmp/claude-501/-Users-augustas-Documents-Larpo-front-end-engine/c7ae5869-cc65-4450-bbb6-04aec004ab65/scratchpad/kh/case_rows.json'))}
SW = 'https://kargul.studio/assets/images/swipe-file/showcase/'
X = 'https://x.com/marcelkargul/status/'
# columns: id, file, project, source, mode, family, scale, precision, h1_text, lines, words, case, size, weight, track_em, font,
#          h1_top, above, gap_above_h1, gap_h1_sub, sub, gap_sub_cta, cta_h, cta_r, cta_material, gap_cta_next, next_el, nav, background, signature, colour
R = []
def add(**k): R.append(k)
F1, F2, F3, F4, F5, F6, F7, F8, F9, F10 = ('F1 centred over product', 'F2 centred over scene/illustration', 'F3 split copy|visual',
    'F4 visual-first, copy at the bottom', 'F5 split header over product', 'F6 prompt-first composer', 'F7 typographic centred', 'F8 flat brand illustration',
    'F9 centred over a system diagram', 'F10 centred over a generative field')
# ---------------- case-study originals (cdn.sanity.io 2880x2070, s=2 unless noted) ----------------
add(id='43-01', file='originals/case-43-01.png', project='43.io (VC)', mode='dark', family=F2, scale='2 (full bleed)', precision='P',
    h1='Never Build Alone', lines=1, words=3, case='Title', size=80, weight='400', track='-0.01', font='transitional serif (Source Serif-like; not identified)',
    top=242, above='none', g_above='', g_sub=33, sub='2 lines serif ~22px, two-tone (grey + cream emphasis words)', g_cta=36.5, cta_h=57, cta_r=14,
    cta='flat orange #ffb25c, rim 1 step darker (#e39f51), serif label + arrow', g_next=45, nxt='painting (cave mouth framing Golden Gate)',
    nav='centred caps links 11px + orange pill CTA right; no bar', bg='#010101 black', sig='cinematic oil-painting key art: explorers in a cave looking out at the Golden Gate, the cave mouth is the frame', colour='black + one warm orange; cream text #fff8e9')
add(id='43-09', file='originals/case-43-09.png', project='43.io apply page', mode='dark', family=F3, scale='2 (zoomed crop)', precision='crop',
    h1='(Apply ...) funding at the earliest stage.', lines=2, words=0, case='Sentence', size='', weight='400', track='', font='serif (same as 43-01)',
    top='', above='', g_above='', g_sub=28.5, sub='3 lines serif small', g_cta=41, cta_h='', cta_r='pill', cta='cream pill', g_next='', nxt='',
    nav='', bg='dark green-black gradient', sig='the same painting, now as a tall photo panel on the right edge', colour='black-green + painting colour')
add(id='agent-arcade-09', file='originals/case-agent-arcade-09.png', project='Agent Arcade', mode='dark', family=F9, scale='2', precision='P',
    h1='AGENTIC TRADING IS HERE. / BE EARLY.', lines=2, words=6, case='UPPER', size=50, weight='700', track='0', font='extended grotesk caps; line 2 outlined rainbow gradient',
    top=223, above='stat pill: label + divider + green value ($ 2,452,236)', g_above=30, g_sub=37.5, sub='2 lines 15px grey with a white emphasis clause', g_cta=21, cta_h=33, cta_r='pill',
    cta='dark pill with rainbow gradient ring + plain dark pill', g_next=60, nxt='orbit rings with LLM logos as planets + arcade cabinet with P&L chart',
    nav='logo left, 3 links centred, Login text + Sign up dark pill', bg='#0e0e13 + neon rainbow orbit lines', sig='LLM logos orbiting an arcade machine; rainbow light rings', colour='near-black + full rainbow, only in lines and the outlined word')
add(id='altrina-01', file='originals/case-altrina-01.png', project='Altrina (healthcare AI)', mode='light', family=F4, scale='2', precision='P',
    h1='AI that thinks with / you, not for you.', lines=2, words=8, case='Sentence', size=70, weight='400', track='-0.03', font='geometric grotesk light (Saans per live site)',
    top=643, above='none', g_above='', g_sub='(sub sits in the right column, top-aligned with the h1)', sub='2 lines 15px #496f7e, right column', g_cta=35, cta_h=30, cta_r=3,
    cta='teal gradient box (#1e6f7b to #458a94) + white box', g_next=90, nxt='logo row "Backed by the best" with a hairline above',
    nav='logo + 5 links left, text link + boxed CTA right, hairline under nav', bg='#f2f5f6 pale blue-grey panel inside a white page frame', sig='woven line-wave ribbon of ~100 teal strokes with node labels (Data, Expertise, Clarity) and the logo hex at the knot', colour='one teal family, tints to deep')
add(id='am-trades-00', file='originals/case-am-trades-00.png', project='AM Trades', mode='dark', family=F1, scale='2', precision='P+L',
    h1='Where traders end their / search for consistency.', lines=2, words=7, case='Sentence', size=56, weight='400', track='-0.054', font='Inter Variable (live)',
    top=185.5, above='none', g_above='', g_sub=16, sub='2 lines 18px #a3a3a3', g_cta=30.5, cta_h=36.5, cta_r=10, cta='flat blue #4785ff + dark #121212 secondary', g_next=110,
    nxt='product window (dark app) with a blue rim light along its top edge, cut by the fold', nav='1024 container: logo + 4 links, Sign in dark pill + blue CTA', bg='#121212 flat', sig='the real course library inside a window lit from behind by a blue edge glow', colour='neutral dark + one blue')
add(id='boomtax-01', file='originals/case-boomtax-01.png', project='Boomtax', mode='light', family=F2, scale='2', precision='P',
    h1='E-File Your Tax / Forms in Seconds.', lines=2, words=6, case='Title', size=70, weight='400', track='-0.04', font='serif (Literata/Source Serif class)',
    top=118, above='none', g_above='', g_sub=25.5, sub='2 lines 17px #4d5d67', g_cta=43, cta_h=53, cta_r=0, cta='flat blue #0099ff square + white square with hairline', g_next=114,
    nxt='logo strip in hairline cells, then the iso conveyor', nav='serif wordmark + links inside a bordered box; Log in | Book a Demo split by a rule', bg='white + vertical hairline rails/stripes',
    sig='isometric conveyor: tax documents ride a belt into a scanner box that glows green', colour='white + one blue + green signal')
add(id='breez-01', file='originals/case-breez-01.png', project='Breez (voice AI)', mode='dark', family=F3, scale='1.897 (2732 export)', precision='P',
    h1='Conversational / AI For Everyone', lines=2, words=4, case='Title', size=75, weight='500', track='-0.03', font='grotesk (DM Sans class)',
    top=171, above='none', g_above='', g_sub=25, sub='2 lines 16px #bbb5b4', g_cta=46, cta_h=48, cta_r='pill', cta='orange gradient pill (#fd5925 to #e15021, light top) + dark translucent pill', g_next=310,
    nxt='"Powered by the best" logo row', nav='logo + 4 links left, text link + orange-tint pill right', bg='near-black brown with an orange light streak from the top right',
    sig='glowing node graph: Persona -> Agent tiles wired with orange fibre lines, a light leak across the fold', colour='black + one orange, emitted as light')
add(id='chatsheet-01', file='originals/case-chatsheet-01.png', project='Chatsheet', mode='light', family=F2, scale='2', precision='P (replicated earlier)',
    h1='Turn Manual Tasks / into Automations', lines=2, words=5, case='Title', size=72, weight='400', track='-0.03', font='Lora-class serif (closest free: Lora)',
    top=151.5, above='none', g_above='', g_sub=37.5, sub='2 lines Inter 17/28 #525b6e', g_cta=57, cta_h=47, cta_r='pill', cta='blue pill #3d79fe with inset edge set + white pill', g_next=60,
    nxt='iso coin + integration tiles', nav='logo left, 4 links centred, white pill right; rails at x40/1400', bg='#f5f6f7 + 1px rails', sig='blue-line isometric target coin with app tiles flowing in', colour='grey + one blue')
add(id='defendlab-01', file='originals/case-defendlab-01.png', project='DefendLab', mode='light', family=F1, scale='2', precision='P+L',
    h1='Advanced Code / Security That Thinks', lines=2, words=5, case='Title', size=70, weight='500', track='-0.06', font='Inter (live)',
    top=159, above='none', g_above='', g_sub=14, sub='2 lines 20px #707070', g_cta=56, cta_h=51, cta_r=15, cta='ink gradient (#333 to #1d1d1d) with crisp top light + white with hairline', g_next=151,
    nxt='row of 8 integration icons in white circles, then the dashboard in a green stage', nav='logo + 4 links left, Sign in + ink button right', bg='#fafafa + faint circuit traces + green gradient stage rising from the bottom',
    sig='circuit-board traces with nodes behind the copy; product dashboard inside a mint-to-green glow stage', colour='neutral + one green')
add(id='ecom-jobs-03', file='originals/case-ecom-jobs-03.png', project='ecom.jobs', mode='light', family=F1, scale='2 (framed)', precision='P',
    h1="Don't just read the job, see the / company's traffic.", lines=2, words=10, case='Sentence', size=48, weight='500', track='-0.03', font='Geist (live site)',
    top=227, above='eyebrow: green dot + caps "LIVE COMPANY SIGNALS · REFRESHED WEEKLY" 11px', g_above=27.5, g_sub='', sub='none: the search card is the sub', g_cta='', cta_h='', cta_r='', cta='search fields + filter chips act as the CTA', g_next=65,
    nxt='search card, then job cards with growth chips', nav='wordmark only', bg='white', sig='the product (job search) is the hero', colour='white + one green')
add(id='gopher-01', file='originals/case-gopher-01.png', project='Gopher (crypto)', mode='light', family=F10, scale='2', precision='P',
    h1='Alpha for everyone', lines=1, words=3, case='Sentence', size=86, weight='400', track='-0.03', font='Cy Grotesk (brand type specimen); closest free: see replica',
    top=168, above='none', g_above='', g_sub=14, sub='1 line 26px tagline in ink (not grey)', g_cta=24, cta_h=49.5, cta_r='pill', cta='green pill #018440 + cream pill with hairline', g_next=0,
    nxt='logo strip in hairline cells (Pond, BNB Chain, base ...)', nav='logo in a bordered cell, 5 links centred, theme toggle right; hairline grid', bg='#fbf7eb cream + hairline cells',
    sig='dot-matrix market chart: green dots stack into rising bars on both sides of the headline', colour='cream + one green ink family')
add(id='hunt-01', file='originals/case-hunt-01.png', project='Hunt.io', mode='dark', family=F4, scale='zoom crop; full fold in x-hunt-see', precision='P+L',
    h1='See What Other / Threat Feeds Miss.', lines=2, words=6, case='Title', size=80, weight='600', track='-0.04', font='Inter 600 (live)',
    top='(bottom-left)', above='none', g_above='', g_sub='(sub in a right column)', sub='2 lines 15px grey, right column', g_cta=12, cta_h=40, cta_r='pill', cta='white pill + chevron', g_next='',
    nxt='', nav='logo | divider | 4 links with chevrons, Log In text + dark pill', bg='black + hexagon-dot world map', sig='hex-dot world map with glowing red/cyan threat nodes and mono labels (Unique error page, Hash Match, JA4 fingerprint)', colour='black + red/cyan signal pair')
add(id='hunt-03', file='originals/case-hunt-03.png', project='Hunt.io (variant)', mode='dark', family=F3, scale='zoom crop; full fold in x-hunt-find', precision='P',
    h1='Find the Threat / Before It Finds You.', lines=2, words=7, case='Title', size=64, weight='600', track='-0.04', font='Inter 600',
    top='', above='none', g_above='', g_sub='(right column)', sub='2 lines grey right column', g_cta=35, cta_h=44, cta_r='pill', cta='white pill + chevron', g_next='',
    nxt='', nav='footer-like logo bottom left', bg='black + hex world map', sig='one glowing cyan hex token at the centre throwing light rays over the map', colour='black + one cyan')
add(id='lemon-01', file='originals/case-lemon-01.png', project='Lemon (voice AI)', mode='light', family=F2, scale='2', precision='P',
    h1='Turn words into actions', lines=1, words=4, case='Sentence', size=76, weight='500', track='0', font='soft display serif (Recoleta/Young Serif class)',
    top=203, above='none', g_above='', g_sub=24, sub='2 lines serif 16px #667665', g_cta=36, cta_h=44, cta_r=13.5, cta='flat yellow #e5cf7a + white', g_next=89,
    nxt='iso voice device with floating question chips', nav='floating centred pill nav (logo, links, Sign in, dark CTA pill) between rails', bg='#f9f5eb cream + rails', sig='isometric glass device that turns spoken questions (chips) into tasks', colour='cream + forest green + one yellow')
add(id='mfc-07', file='originals/case-mobile-first-company-07.png', project='The Mobile-First Company', mode='light', family=F2, scale='~2 (framed)', precision='P',
    h1='AI Suite for Small Teams / Replacing Legacy Software.', lines=2, words=8, case='Title', size=60, weight='700', track='-0.03', font='heavy grotesk',
    top=360, above='eyebrow: "The mobile first company" serif with italic', g_above=16, g_sub=14, sub='2 lines 15px', g_cta=30, cta_h=53, cta_r=16, cta='flat yellow #f3e74d + white', g_next='',
    nxt='(copy sits inside the scene)', nav='yellow announcement bar only', bg='cream desk surface', sig='photo-real desk still life: CD, beige keyboard, mouse, sticky notes, receipts and coins around the copy (legacy-office nostalgia)', colour='cream + one yellow')
add(id='opero-labs-01', file='originals/case-opero-labs-01.png', project='Opero Labs', mode='light', family=F3, scale='2', precision='P',
    h1='AI Agents That / Navigate the Web', lines=2, words=6, case='Title', size=64, weight='400', track='-0.03', font='grotesk regular (system/Inter class)',
    top=145.5, above='none', g_above='', g_sub=20.5, sub='2 lines 15px #666', g_cta=43, cta_h=52, cta_r=0, cta='black square with arrow + light grey square', g_next=390,
    nxt='"collaborates with leading AI organizations" + logo row', nav='logo + 3 links left, text link + grey box CTA right', bg='white', sig='isometric black line-art: browser windows, forms and a cursor path wired to the logo cube on a dotted floor grid', colour='black and white only')
add(id='opsis-07', file='originals/case-opsis-partners-07.png', project='Opsis Partners', mode='dark', family=F10, scale='~2 (framed)', precision='P',
    h1="We take care of the operational / work behind your company. If it's / not handled, you don't pay.", lines=3, words=19, case='Sentence', size=40, weight='400', track='0', font='Georgia-class serif',
    top=185, above='logo only (centred)', g_above=106, g_sub=24, sub='3 lines 13px #b5b4ae', g_cta=46.5, cta_h=38, cta_r=0, cta='cream square #dedad4, serif label', g_next='',
    nxt='point-cloud ribbon fills the lower 60%', nav='centred logo only', bg='#131d18 deep green, cream frame', sig='a ribbon of dense grain particles twisting through the fold with constellation points', colour='deep green + cream, no accent')
add(id='ostium-01', file='originals/case-ostium-01.png', project='Ostium (trading)', mode='dark', family=F3, scale='2', precision='P+L',
    h1='One app. Your / Wallet. Every Asset', lines=2, words=6, case='Title', size=60, weight='400', track='-0.02', font='Manrope (live)',
    top=310.5, above='none', g_above='', g_sub=14.5, sub='2 lines 13px #bca7a2', g_cta=36.5, cta_h=42.5, cta_r=4.5, cta='flat orange #ff5a19, mono caps label + arrow', g_next=110,
    nxt='4 stat columns (label + value)', nav='logo + mono caps links left, small orange CTA right', bg='cinematic AI photo at dusk', sig='a monk walking toward a glowing orange monolith on a misty plain (cinematic key art)', colour='warm brown-black + one orange; h1 peach')
add(id='rork-04', file='originals/case-rork-04.png', project='Rork', mode='dark', family=F6, scale='2', precision='P+L',
    h1='Ship Mobile Apps / Without Code', lines=2, words=5, case='Title', size=64, weight='600', track='-0.02', font='SF Pro (live: -apple-system 60/600)',
    top=116, above='none', g_above='', g_sub=26.5, sub='2 lines 16px #a6a6a6', g_cta=22, cta_h=175, cta_r=16, cta='the prompt composer IS the CTA (textarea, attach icon, Public toggle, white round send)', g_next=50,
    nxt='"Backed By | Used By" toggle + 3 logos, then 3 tilted phones', nav='logo left, Sign in + white pill right (no links)', bg='#202020 flat', sig='prompt box over a fan of three phones running generated apps', colour='neutral dark, no accent')
add(id='runinfra-00', file='originals/case-runinfra-00.png', project='RunInfra', mode='light', family=F6, scale='2', precision='P+L',
    h1='Optimize any open / model for production', lines=2, words=6, case='Sentence', size=56, weight='500', track='-0.025', font='Inter (live) with pixel-font words',
    top=252.5, above='"Backed by [Y] Combinator" 12px', g_above=22.5, g_sub=23.5, sub='2 lines 16px #4c4c4c', g_cta=27.5, cta_h=42, cta_r=0, cta='flat green #76b900 square + grey square', g_next=70,
    nxt='prompt composer card with model/engine selects', nav='black announcement bar; logo + "by RightNow", 6 links centred, Sign in outline + green square', bg='#f5f5f5 + dotted rails + pixel blocks', sig='two words of the headline swap into a pixel font ("any", "for") with pixel blocks scattered at the rails', colour='light grey + one green')
add(id='stardust-01', file='originals/case-stardust-01.png', project='Stardust', mode='dark', family=F2, scale='zoom crop', precision='crop+L',
    h1='Scale ... (live: Manrope 63/400)', lines=2, words=0, case='Title', size=63, weight='400', track='-0.02', font='Manrope (live)',
    top='', above='', g_above='', g_sub='', sub='2 lines 18px', g_cta='', cta_h=40, cta_r=8, cta='violet glass button: inset glows + 0.5px violet ring', g_next='',
    nxt='glass orb with KPI glass cards', nav='', bg='deep purple-black', sig='a glowing glass globe with orbit rings, flanked by glass KPI cards (Targeting, App install, Revenue, Engagement)', colour='black-violet, one violet')
add(id='supermetal-00', file='originals/case-supermetal-00.png', project='Supermetal', mode='dark', family=F9, scale='2', precision='P+L',
    h1='Sync Data at The / Speed of Light', lines=2, words=7, case='Title', size=64, weight='500', track='-0.03', font='Chakra Petch (live)',
    top=134, above='none', g_above='', g_sub=19, sub='3 lines 15px #a0a0a0', g_cta=40, cta_h=49, cta_r=0, cta='flat orange #ea580c square, lighter rim #ee793d + dark grey square', g_next=25,
    nxt='"Built in Rust and Apache Arrow" meta line, then the constellation', nav='logo + 5 links left, text link + dark box right', bg='#111 + faint grid',
    sig='database logo tiles on both sides wired by thin lines that converge into a glowing orange S core block', colour='black + one orange')
add(id='txtcart-04', file='originals/case-txtcart-04.png', project='TxtCart', mode='light', family=F1, scale='2', precision='P',
    h1='Rich messaging that converts', lines=1, words=4, case='Sentence', size=60, weight='500', track='-0.03', font='grotesk (Inter class)',
    top=331, above='chip "RCS Messaging ->" with hairline', g_above=46, g_sub=17, sub='3 lines 15px #43546d', g_cta=37, cta_h=38, cta_r=8, cta='flat blue #007af5 + white', g_next=85,
    nxt='sky-gradient stage with a phone showing an RCS message', nav='blue announcement bar; logo, 6 links with chevrons, Sign In outline + blue', bg='white -> sky gradient stage', sig='one word of the h1 in the brand blue; phone on a blue sky', colour='white + one blue')
add(id='uniops-00', file='originals/case-uniops-00.png', project='UniOps', mode='light', family=F1, scale='framed (~1.3); live tuple used', precision='P+L',
    h1='The browser that lets your team share / the account, never the password.', lines=2, words=13, case='Sentence', size=56, weight='500', track='-0.01', font='Inter Variable (live)',
    top=160, above='none', g_above='', g_sub=12, sub='2 lines 18px/460 rgba(20,20,20,.64)', g_cta=40, cta_h=50, cta_r='pill', cta='blue pill #4785ff + translucent white pill', g_next=70,
    nxt='browser window with the product, then a dock of app icons', nav='logo left, 5 links centred, Sign up + dark pill', bg='sky gradient blue -> peach', sig='the product as a real browser on a sky gradient, with a macOS dock underneath', colour='sky blue + peach')
add(id='uplinq-05', file='originals/case-uplinq-05.png', project='Uplinq', mode='dark', family=F3, scale='zoom crop', precision='crop+L',
    h1='(Books) done. Stress gone.', lines=1, words=4, case='Sentence', size=66, weight='500', track='-0.02', font='TWK Lausanne (live)',
    top='', above='chip "Bookkeeping"', g_above=42, g_sub=7, sub='second headline line in grey + 2 lines body', g_cta=31.5, cta_h=38, cta_r='pill', cta='white pill + dark pill', g_next='',
    nxt='', nav='pill-tab nav (Home active)', bg='#080808 + grid', sig='3D ledger cylinder stack with cyan light beams', colour='black + one cyan')
add(id='zeroleaks-02', file='originals/case-zeroleaks-02.png', project='ZeroLeaks', mode='dark', family=F1, scale='2', precision='P+L',
    h1='Enterprise-Grade Security / for AI Systems', lines=2, words=6, case='Title', size=56, weight='500', track='-0.024', font='Geist (live)',
    top=218, above='pill "• Starter now includes a 14 Day Trial"', g_above=42.5, g_sub=23, sub='2 lines 15px #7a7a7a', g_cta=26.5, cta_h=36, cta_r=8.8, cta='white box + dark box with hairline', g_next=41,
    nxt='product dashboard frame on a grid', nav='logo left, 5 links centred, Sign in + white box', bg='#030303 + grid lines', sig='two halftone dot arcs (orange -> blue gradient dots) bracket the headline; "AI Systems" in an orange-pink gradient', colour='black + one gradient')
# ---------------- swipe-file originals (kargul.studio/swipe-file, 1590 px exports = 2880 frames at 0.552, s=1.104 assumed) ----------------
add(id='allo', file='originals/swipe-allo-p29.png', project='allo (Mobile-First Company)', mode='dark', family=F4, scale='1.104', precision='P',
    h1='Clearer Calls. / Faster Setup.', lines=2, words=4, case='Title', size=70, weight='700', track='-0.035', font='heavy grotesk', top=626, above='none', g_above='',
    g_sub='(sub in right column)', sub='3 lines 13px, right column, above a phone-number input', g_cta='', cta_h=36, cta_r='pill', cta='yellow pill inside a dark pill input ("Switch to Allo")', g_next=72,
    nxt='"Trusted by 15,000+" logo bar', nav='logo + 3 links left, text + dark pill right', bg='#0b2120 deep green', sig='isometric wireframe phone (contact card) with a glowing yellow call button and a light beam', colour='deep green + one yellow')
add(id='volcano', file='originals/swipe-volcano-p21.png', project='Volcano SDK', mode='dark', family=F3, scale='1.104', precision='P',
    h1='Build MCP-Powered / AI Agents in Minutes', lines=2, words=6, case='Title', size=64, weight='600', track='-0.03', font='line 1 pixel font, line 2 grotesk', top=148, above='none', g_above='',
    g_sub=24.5, sub='2 lines 15px #b2b2b2', g_cta=45, cta_h=51, cta_r=0, cta='flat orange-red square #f95e39 + dark code chip "npm install volcano-sdk"', g_next=20,
    nxt='"Using Cursor?" card with a ghost button', nav='pixel wordmark + 3 links left, text + dark box right', bg='black, pixel-dither edge into white', sig='pixel-art volcano erupting (orange-red-blue pixels) with a dithered pixel horizon', colour='black + orange-red')
add(id='cashflow', file='originals/swipe-cashflow-p9.png', project='CashflowApp', mode='light', family=F1, scale='1.104', precision='P',
    h1='Smarter Investing. / Zero Complexity.', lines=2, words=4, case='Title', size=64, weight='500', track='-0.04', font='grotesk', top=130, above='none', g_above='',
    g_sub='', sub='none', g_cta=15, cta_h=47, cta_r=14, cta='one wide ink pill-box "Join Waitlist" directly under the h1', g_next=30,
    nxt='wallet dashboard cards + a green APY card in front', nav='centred logo only', bg='white with a mint glow under the product', sig='stacked fintech cards with one green highlight card (Steakhouse Financial 7.4% APY)', colour='white + one mint green')
add(id='sideshift-ugc', file='originals/swipe-sideshift-ugc-p18.png', project='SideShift', mode='light', family=F3, scale='1.104', precision='P+L',
    h1='The UGC Engine for / Creators [toggle] Brands.', lines=2, words=6, case='Title', size=72, weight='550', track='-0.035', font='Geist (live)', top=128, above='none', g_above='',
    g_sub=22, sub='2 lines 15px #535556', g_cta=41, cta_h=52, cta_r='pill', cta='ink pill (gradient) + white pill', g_next='',
    nxt='logo row "Trusted By Top Brands Worldwide"', nav='logo + 4 links left, Sign in + white pill', bg='#e0f5ff sky', sig='a live toggle switch inside the headline between "Creators" (grey) and "Brands."; 3D paper plane with floating UGC cards', colour='sky blue + ink')
add(id='teamos', file='originals/swipe-teamos-p38.png', project='TeamOS', mode='light', family=F2, scale='1.104', precision='P',
    h1='Make your org faster, / everyday, for every team', lines=2, words=8, case='Sentence', size=70, weight='600', track='-0.03', font='heavy grotesk', top=152, above='none', g_above='',
    g_sub=24.5, sub='2 lines 15px #575265', g_cta=38, cta_h=44, cta_r=12, cta='violet #6941c6 + white', g_next=60,
    nxt='isometric org map, then a product table rising from the bottom', nav='logo + 5 links left, Log in + white box', bg='#f2f2f2', sig='"Google Maps for your org": an isometric map of rivers, roads and team buildings with pins', colour='grey + violet + mint map')
add(id='adam-3d', file='originals/swipe-adam-3d-p46.png', project='Adam (3D AI) careers', mode='dark', family=F3, scale='1.104', precision='P',
    h1='Help Shape the / Future of 3D', lines=2, words=6, case='Title', size=80, weight='500', track='-0.03', font='grotesk, pink gradient fill', top=169, above='none', g_above='',
    g_sub='', sub='none', g_cta=39, cta_h=34, cta_r='pill', cta='pink pill with a white circle arrow', g_next='', nxt='next section title', nav='logo + 6 links, Log in + pink pill',
    bg='black + magenta haze', sig='glossy pink 3D arrow-loop object (the brand mark extruded)', colour='black + magenta')
add(id='valius', file='originals/swipe-valius-p48.png', project='Valius (oncology)', mode='light', family=F3, scale='1.104', precision='P',
    h1='Every cancer cell has a / weakness. we expose it.', lines=2, words=9, case='Sentence', size=46, weight='400', track='-0.02', font='serif (Newsreader class)', top=180, above='none', g_above='',
    g_sub=27, sub='3 lines 15px #658774', g_cta=38, cta_h=40, cta_r=0, cta='deep green square + white with email', g_next='', nxt='(single-fold site: footer follows)', nav='logo + 3 links left, email right',
    bg='#f3f5f4', sig='a grid of faint circles where some cells fuse into green chains: a cell culture as a pattern', colour='green-grey + deep green')
add(id='minto', file='originals/swipe-minto-p54.png', project='Minto (wallet infra)', mode='light', family=F3, scale='1.104 (possibly zoomed)', precision='P',
    h1='One click. / Zero friction.', lines=2, words=4, case='Sentence', size=96, weight='600', track='-0.04', font='heavy grotesk', top=644, above='none', g_above='',
    g_sub=36, sub='2 lines 17px #5d5d5d', g_cta=34, cta_h=44, cta_r='pill', cta='mint pill #66e061 + grey pill', g_next='', nxt='', nav='logo only', bg='white + grey panel right',
    sig='isometric keyboard whose keys spell START, Connect, Learn More, with a Figma selection box and cursor on a floating chip', colour='white + one mint')
add(id='hgrid', file='originals/swipe-hgrid-p80.png', project='hgrid (observability)', mode='dark', family=F3, scale='zoom crop', precision='crop',
    h1='(See) every signal. / (Sh)ip without surprises.', lines=2, words=0, case='Sentence', size='', weight='400', track='0', font='monospace', top='', above='gradient chip "AI RESEARCH PARTNER"', g_above=23.5,
    g_sub=31, sub='3 lines 15px grey', g_cta=47, cta_h=34, cta_r=0, cta='white square + outline square', g_next='', nxt='logo row', nav='mono caps links in a boxed group, LOGIN + SIGN UP box', bg='#0c0c0c + vertical stripe texture',
    sig='isometric 3D wireframe terrain (latency surface) with labelled metric flags (P99, TIMEOUT, ERROR RATE)', colour='black + gradient wireframe')
add(id='campaigns', file='originals/swipe-campaigns-p82.png', project='(lifecycle messaging, unnamed)', mode='light', family=F3, scale='framed', precision='P',
    h1='Stop sending / campaigns. Start / designing momentum.', lines=3, words=6, case='Sentence', size=48, weight='600', track='-0.03', font='grotesk', top='', above='none', g_above='',
    g_sub='', sub='2 lines 13px', g_cta='', cta_h=32, cta_r=8, cta='ink + white', g_next='', nxt='2 icon feature blurbs, then logo row', nav='logo, 5 links centred, Login + Register',
    bg='#f9f9f9 with a hairline column', sig='three stacked isometric glass metric cards (+168.3%, +118.2%, +87.2%)', colour='white + pastel violet/cyan glass')
add(id='scraper', file='originals/swipe-scraper-p83.png', project='Scrapeon', mode='light', family=F1, scale='framed ~2', precision='P',
    h1='The fastest way to / scrape & automate web data.', lines=2, words=8, case='Sentence', size=54, weight='600', track='-0.02', font='grotesk', top=209, above='pill "Trusted by fast-growing teams worldwide · Learn more"', g_above=34.5,
    g_sub=25, sub='2 lines 14px #757575', g_cta=43.5, cta_h=28.5, cta_r='pill', cta='green gradient pill + white pill', g_next=105, nxt='tab strip, then the integrations panel over a blurred grass photo',
    nav='logo left, 5 links centred, Login + Register', bg='#f9f9f9', sig='product panel floating on a motion-blurred nature photo', colour='white + one green')
add(id='specs-waitlist', file='originals/swipe-specs-waitlist-p33.png', project='(spec-to-ticket AI, unnamed)', mode='dark', family=F2, scale='zoom crop', precision='crop',
    h1='(cut)', lines='', words=0, case='', size='', weight='', track='', font='', top='', above='', g_above='', g_sub='', sub='2 lines 15px', g_cta=72, cta_h=40, cta_r=0, cta='cyan glowing outline box + dark box',
    g_next='', nxt='', nav='', bg='#0e0f11', sig='isometric glass tickets flowing from a PRD doc into a pipeline with teal light', colour='black + one teal')
add(id='zeroleaks-community', file='originals/swipe-zeroleaks-community-p190.png', project='ZeroLeaks community page', mode='dark', family=F7, scale='2', precision='P',
    h1='Welcome to the / ZeroLeaks Community', lines=2, words=5, case='Title', size=56, weight='500', track='-0.024', font='Geist', top=141.5, above='pill "Community"', g_above=40,
    g_sub=28, sub='2 lines 15px #7a7a7a', g_cta='', cta_h='', cta_r='', cta='none', g_next=60, nxt='2-column category cards', nav='', bg='#030303', sig='none (sub-page)', colour='black')
# ---------------- X timeline originals ----------------
for nm, h1, fam, mode, sig, cta in [
    ('metricly', 'Real-Time SaaS / Metrics at a Glance', F2, 'light', 'floating 3D app icons around a product orb on a lilac gradient', 'none in fold'),
    ('signlio', 'Understand / Every Contract / Before You Sign', F3, 'light', 'contract card with a magnifier on a pink gradient field', 'pink pill bottom-left'),
    ('flowpilot', 'Remote Teams / Unified & Automated', F1, 'light', 'integration icon row + product dashboard rising on a blue-violet gradient', 'ink pill + white'),
    ('inboxwarden', 'Keep Your Emails / Always Out of Spam', F2, 'light', 'pastel ribbon lines flowing through an envelope; pill above the h1; line 2 in a gradient', 'none in fold'),
    ('leadburst', 'Prioritize Leads That / Will Actually Convert', F5, 'dark', 'navy-to-blue gradient sky over three product cards', 'none in fold'),
    ('bugscout', 'Find & Fix JavaScript / Bugs in Seconds', F5, 'light', 'h1 left, sub + CTAs right; three product cards on a lilac gradient', 'violet gradient pill + white pill')]:
    fam = F9 if nm == 'metricly' else fam
    add(id=nm, file=f'originals/x-grid-{nm}-2087115320418811976.png', project=f'{nm} (concept, X post "a simple gradient is sometimes all you need")', mode=mode, family=fam, scale='1 (2880x2688 grid of 1440x896 folds)', precision='P',
        h1=h1, lines=h1.count('/') + 1, words=len(h1.replace('/', ' ').split()), case='Title', size={'metricly': 80, 'flowpilot': 71}.get(nm, ''), weight='500', track='-0.05', font='grotesk (Inter class)', top='', above='pill' if nm == 'inboxwarden' else 'none', g_above='',
        g_sub={'metricly': 33, 'flowpilot': 27}.get(nm, ''), sub='2 lines 15px', g_cta='', cta_h='', cta_r='pill', cta=cta, g_next='', nxt='', nav='logo + links, pill CTA', bg='soft multi-hue gradient', sig=sig, colour='white + one pastel gradient')
add(id='podcast-rebelaudio', file='originals/x-podcast-rejected-2089432182653677912.jpg', project='RebelAudio (rejected concept, 2 colourways)', mode='light+dark', family=F5, scale='~1.33', precision='V',
    h1='Your first episode is / closer than you think', lines=2, words=8, case='Sentence', size=48, weight='400', track='-0.02', font='grotesk regular, last words in orange', top='', above='mono caps eyebrow "NO STUDIO NO MICROPHONE NO CLUE? PERFECT"', g_above='',
    g_sub='', sub='none', g_cta='', cta_h='', cta_r='pill', cta='ink pill + text "Sign in"', g_next='', nxt='product dashboard', nav='logo, 4 links centred, Sign up + orange pill', bg='cream / maroon', sig='a giant orange brand swoosh (the R) sweeping behind the product', colour='cream + one orange')
add(id='runinfra-prompt', file='originals/x-oneprompt-thumb-2087640047323336875.jpg', project='RunInfra sub-page', mode='dark', family=F6, scale='video still', precision='V',
    h1='One chat prompt. Multiple paths / tested. One winner shipped.', lines=2, words=9, case='Sentence', size=48, weight='500', track='-0.02', font='Inter', top='', above='none', g_above='',
    g_sub='', sub='2 lines 15px grey', g_cta='', cta_h='', cta_r='', cta='none: the chat window is the action', g_next='', nxt='chat composer window', nav='', bg='#161616', sig='two-tone headline (white + grey last clause) over a chat window', colour='neutral dark')
add(id='hunt-see', file='originals/x-hunt-see-2089371829492203776.jpg', project='Hunt.io (full fold of hunt-01)', mode='dark', family=F4, scale='1.44', precision='V', h1='See What Other / Threat Feeds Miss.', lines=2, words=6, case='Title', size=80, weight='600', track='-0.04', font='Inter 600',
    top=640, above='none', g_above='', g_sub='right column', sub='2 lines', g_cta=12, cta_h=40, cta_r='pill', cta='white pill + chevron', g_next='', nxt='fold edge', nav='see hunt-01', bg='black hex map', sig='see hunt-01', colour='black + red/cyan')
add(id='hunt-find', file='originals/x-hunt-find-2089404418504429611.jpg', project='Hunt.io (full fold of hunt-03)', mode='dark', family=F3, scale='1.44', precision='V', h1='Find the Threat / Before It Finds You.', lines=2, words=7, case='Title', size=64, weight='600', track='-0.04', font='Inter 600',
    top=40, above='none', g_above='', g_sub='right column', sub='2 lines', g_cta=24, cta_h=44, cta_r='pill', cta='white pill + chevron', g_next='', nxt='', nav='minimal', bg='black hex map', sig='see hunt-03', colour='black + cyan')
add(id='brand-expenses', file='originals/brand-expenses-26.png', project='(fintech brand concept)', mode='light', family=F8, scale='1.104', precision='P', h1='Get detailed Insights / about your expenses', lines=2, words=6, case='Sentence', size=69, weight='500', track='-0.03', font='grotesk',
    top='', above='none', g_above='', g_sub='', sub='none', g_cta='', cta_h='', cta_r='', cta='none', g_next='', nxt='', nav='none (brand deck)', bg='#faf7f2 cream', sig='highlighter-pink box behind "your expenses"; flat donut + bar card illustration on a hairline grid', colour='cream + lime, violet, pink, green flats')
# ---------------- live client sites (DOM-measured) ----------------
live = {
 'kargul.studio': ('x-heroes-2026-10/kargul-fold.jpg', 'https://kargul.studio/', 'light', F7, 'A design and engineering partner for scale-ups and enterprise products.', 3, 10, 'Sentence', 52, '700', '-0.03', 'Geist', 'pill "Accepting 3 more projects for Q4 2026"', '', 54, 'pill', 'ink pill #232323 + text link', 'pill nav with logo and 2 CTAs', '#efefef', 'none: type + logo bar'),
 'listkit': ('x-heroes-2026-10/listkit-fold.jpg', 'https://www.listkit.io/', 'light', F7, 'Send 5,000 1,000 cold emails per day, immediately.', 3, 9, 'Sentence', 72, '600', '-0.06', 'DM Sans', 'none', '', 56, 'pill', 'blue pill #288dff with blue glow + light grey pill', 'logo + links, CTA pill', 'white', 'struck-through number swap inside the headline'),
 'sideshift-live': ('x-heroes-2026-10/sideshift-fold.jpg', 'https://sideshift.app/', 'light', F7, 'Turn organic creator marketing into your most profitable growth channel.', 3, 11, 'Sentence', 72, '550', '-0.035', 'Geist', 'none', '', 52, 'pill', 'ink pill with 2px drop', 'logo + links', '#fafafa', 'gradient-clipped headline text'),
 'sftensor': ('x-heroes-2026-10/sftensor-fold.jpg', 'https://sf-tensor.com/', 'light', F3, "Train what doesn't exist yet.", 2, 5, 'Sentence', 56, '400', '-0.035', 'Georgia', 'none', '', 40, 10, 'ink tactile (inset light + drop) + white tactile', 'logo + links', 'white', 'serif headline over technical imagery'),
 'lemon-live': ('live/lemon-fold-1440@2x.png', 'https://www.heylemon.ai/', 'light', F6, 'Stop typing prompts. Start talking.', 2, 5, 'Sentence', 82, '560', '-0.018', 'custom serif (italic word)', 'mono eyebrow "MEET LEMON · VOICE TO PROMPT"', 35, 51, 'pill', 'ink pill with long soft drop', 'logo left, links centred, ink pill', '#fbfbed + pastel stage', 'voice composer with a live transcript chip over the product'),
 'ecomjobs-live': ('live/ecomjobs-fold-1440@2x.png', 'https://ecom.jobs/', 'light', F5, 'Ecommerce jobs, delivered to you.', 2, 5, 'Sentence', 68, '600', '-0.045', 'Geist', 'stat pills (19,943 live roles | 4,070 new)', 31, 40, 'pill', 'role chips as CTAs', 'logo + 2 links, Sign up green pill', 'white', 'live job feed panel on the right'),
 'volcano-live': ('live/volcano-fold-1440@2x.png', 'https://volcano.dev/', 'dark', F2, 'AI infrastructure for agents and applications', 2, 6, 'Sentence', 40, '700', '-0.02', 'Space Mono', 'none', '', '', 0, 'mono boxed tabs', 'logo + links, Login white + orange box', 'black', 'pixel volcano behind a mono headline'),
 'uniops-live': ('live/uniops-fold-1440@2x.png', 'https://uniops.app/', 'light', F1, 'The browser that lets your team share the account, never the password.', 2, 13, 'Sentence', 56, '500', '-0.01', 'Inter Variable', 'none', '', 50, 'pill', 'blue pill + translucent white', 'logo, links centred, dark pill', 'sky gradient', 'see uniops-00'),
}
for k, v in live.items():
    f, url, mode, fam, h1, ln, wd, cs, sz, wt, tr, font, ab, gab, ch, cr, cta, nav, bg, sig = v
    add(id=k, file=('../' + f) if f.startswith('x-heroes') else f, project=k + ' (live site)', mode=mode, family=fam, scale='1 (DOM)', precision='L', h1=h1, lines=ln, words=wd, case=cs, size=sz, weight=wt, track=tr, font=font,
        top='', above=ab, g_above=gab, g_sub='', sub='', g_cta='', cta_h=ch, cta_r=cr, cta=cta, g_next='', nxt='', nav=nav, bg=bg, sig=sig, colour='')

# sources
def src(r):
    f = os.path.basename(r['file'])
    if f in case: return case[f][1]
    if f.startswith('swipe-'): return SW + 'web/project-' + f.split('-p')[-1].split('.')[0] + '.png'
    if f.startswith('brand-'): return SW + 'brand/project-26.png'
    if f.startswith('x-grid-') or 'gradient' in f: return X + '2087115320418811976'
    if f.startswith('x-'): return X + f.split('-')[-1].split('.')[0]
    return {'kargul.studio': 'https://kargul.studio/', 'listkit': 'https://www.listkit.io/', 'sideshift-live': 'https://sideshift.app/', 'sftensor': 'https://sf-tensor.com/', 'lemon-live': 'https://www.heylemon.ai/', 'ecomjobs-live': 'https://ecom.jobs/', 'volcano-live': 'https://volcano.dev/', 'uniops-live': 'https://uniops.app/'}.get(r['id'], '')
DUP = {'hunt-see': 'hunt-01', 'hunt-find': 'hunt-03', 'uniops-live': 'uniops-00'}
for r in R: r['dup'] = DUP.get(r['id'], '')
cols = ['id', 'file', 'project', 'source', 'mode', 'family', 'scale', 'precision', 'h1', 'lines', 'words', 'case', 'size', 'weight', 'track', 'font', 'top', 'above', 'g_above', 'g_sub', 'sub', 'g_cta', 'cta_h', 'cta_r', 'cta', 'g_next', 'nxt', 'nav', 'bg', 'sig', 'colour', 'dup']
hdr = ['id', 'file', 'project', 'source_url', 'mode', 'layout_family', 'scale_css', 'precision', 'h1_text', 'h1_lines', 'h1_words', 'h1_case', 'h1_size_px', 'h1_weight', 'h1_track_em', 'h1_font',
       'h1_top_px', 'above_h1', 'gap_above_to_h1', 'gap_h1_to_sub', 'subtitle', 'gap_sub_to_cta', 'cta_h_px', 'cta_radius', 'cta_material', 'gap_cta_to_next', 'next_element', 'nav', 'background', 'signature_visual', 'colour_strategy', 'duplicate_of']
with open(B + 'measured.tsv', 'w') as fo:
    fo.write('# Kargul hero census, measured 2026-10-22. Gaps are ink-to-ink in CSS px (h1 ink bottom -> sub ink top; sub ink bottom -> CTA box top; CTA box bottom -> next element). precision: P pixel-probed on the original, L live DOM, P+L both, V visual estimate, crop = zoomed presentation crop (ratios only). Study only.\n')
    fo.write('\t'.join(hdr) + '\n')
    for r in R:
        r['source'] = src(r)
        fo.write('\t'.join(str(r.get(c, '')).replace('\t', ' ') for c in cols) + '\n')
with open(B + 'index.tsv', 'w') as fo:
    fo.write('file\tproject\tsource_url\tmode\tlayout_family\n')
    for r in R: fo.write(f"{r['file']}\t{r['project']}\t{r['source']}\t{r['mode']}\t{r['family']}\n")
# census
import collections
num = lambda k: [float(r[k]) for r in R if isinstance(r.get(k), (int, float)) or (isinstance(r.get(k), str) and r[k].replace('.', '', 1).replace('-', '', 1).isdigit())]
def med(k):
    v = num(k); return (round(st.median(v), 1), round(min(v), 1), round(max(v), 1), len(v)) if v else None
R_all = R; R = [r for r in R if not r['dup']]
print('heroes', len(R), 'files', len(R_all))
print('family', collections.Counter(r['family'] for r in R))
print('mode', collections.Counter(r['mode'] for r in R))
for k in ['size', 'track', 'g_above', 'g_sub', 'g_cta', 'cta_h', 'g_next', 'words', 'lines', 'top']: print(k, med(k))
print('weight', collections.Counter(r['weight'] for r in R))
print('case', collections.Counter(r['case'] for r in R))
print('above', collections.Counter('none' if r['above'] in ('none', '', 'logo only (centred)') else 'yes' for r in R))
print('cta_r', collections.Counter(str(r['cta_r']) for r in R))
json.dump(R_all, open('/private/tmp/claude-501/-Users-augustas-Documents-Larpo-front-end-engine/c7ae5869-cc65-4450-bbb6-04aec004ab65/scratchpad/kh/rows.json', 'w'), indent=0)
