import json, math, itertools
ONLC=60
from clib import *

def mk(L,C,H):
    Lm,Cm,Hm=map_srgb(L,C,H)
    return {'oklch':'oklch(%.3f %.3f %.0f)'%(Lm,Cm,Hm),'hex':to_hex(L,C,H),'_l':Lm,'_c':Cm,'_h':Hm}

def solve(C,H,bgs,target,start,direction,apca_min=0,step=0.002):
    """scan L from start in direction (+1 lighter / -1 darker); return first L whose hex meets target vs ALL bg hexes"""
    L=start
    for _ in range(600):
        hx=to_hex(L,C,H)
        ok=all(wcag(hx,b)>=target and abs(apca(hx,b))>=apca_min for b in bgs)
        if ok: return L
        L+=direction*step
        if L<0 or L>1: break
    raise ValueError('no solution C=%s H=%s target=%s'%(C,H,target))

def build_mode(p,mode):
    m=p[mode]; light=(mode=='light')
    nh,nc=m['nh'],m['nc']
    T={}
    sl=m['surf']  # page,card,sunken,raised,inverse
    names=['page','card','sunken','raised','inverse']
    for n,L in zip(names,sl):
        c=nc*(0.6 if n=='inverse' and light else 1.0)
        T['surface-'+n]=mk(L,c,nh)
    page,card,sunk=T['surface-page']['hex'],T['surface-card']['hex'],T['surface-sunken']['hex']
    base=[page,card,sunk]
    d=-1 if light else 1
    start=0.3 if light else 0.7
    # ink
    T['ink-1']=mk(m['ink1'],nc*0.8,nh)
    L2=solve(nc,nh,base,7.0,0.45 if light else 0.6,d if True else d) if False else None
    # for ink2 we scan from the soft end toward strong end: light mode scan from L=0.75 darker; dark mode from 0.3 lighter
    L2=solve(nc,nh,base,7.0,0.75 if light else 0.30,-1 if light else +1,75)
    L3=solve(nc,nh,base,4.5,0.80 if light else 0.25,-1 if light else +1,60)
    T['ink-2']=mk(L2,nc,nh); T['ink-3']=mk(L3,nc,nh)
    T['ink-inverse']=mk(m['inkinv'],nc*0.8,nh)
    # borders
    bs=m['surf'][0]+(-0.075 if light else 0.085)
    T['border-subtle']=mk(bs,nc*1.2,nh)
    Lb=solve(nc*1.3,nh,[page,card],3.0,0.85 if light else 0.25,-1 if light else +1,30)
    T['border-strong']=mk(Lb,nc*1.3,nh)
    # accent
    a=m['accent']; ah=p['accent_hue']
    L,C=a['L'],a['C']
    onpref=a['on']  # 'light' or 'dark'
    global ONLC
    ONLC=a.get('lc',60)
    onfill=mk(0.985,nc*0.5,nh) if onpref=='light' else mk(0.19,nc*0.8,nh)
    # push fill L until on-fill >=4.5
    for _ in range(400):
        fx=to_hex(L,C,ah)
        if wcag(fx,onfill['hex'])>=4.5 and abs(apca(onfill['hex'],fx))>=ONLC: break
        L+= -0.002 if onpref=='light' else 0.002
    fill=mk(L,C,ah); T['accent']=fill; T['accent-on']=onfill
    hv=L+(-0.045 if onpref=='light' else 0.04)
    for _ in range(400):
        hx=to_hex(hv,C,ah)
        if wcag(hx,onfill['hex'])>=4.5 and abs(apca(onfill['hex'],hx))>=ONLC: break
        hv+= -0.002 if onpref=='light' else 0.002
    T['accent-hover']=mk(hv,C,ah)
    soft=mk(m['soft'],min(C,0.045),ah); T['accent-soft']=soft
    LT=solve(min(C,0.16),ah,base+[soft['hex']],4.5,0.8 if light else 0.3,-1 if light else +1,60)
    T['accent-text']=mk(LT,min(C,0.16),ah)
    if min(wcag(fill['hex'],page),wcag(fill['hex'],card))>=3 and min(abs(apca(fill['hex'],page)),abs(apca(fill['hex'],card)))>=30:
        T['ring']=mk(fill['_l'],fill['_c'],ah)
    else:
        LR=solve(min(C,0.16),ah,[page,card],3.0,0.85 if light else 0.3,-1 if light else +1,30)
        T['ring']=mk(LR,min(C,0.16),ah)
    # P3 variant of accent (same L,H; more chroma) when displayable
    lo,hi=fill['_c'],0.4
    for _ in range(30):
        mid=(lo+hi)/2
        if in_p3(oklch2lin(fill['_l'],mid,ah)): lo=mid
        else: hi=mid
    cp3=min(lo,C*1.12)
    if cp3>fill['_c']+0.012: T['_accent_p3']='oklch(%.3f %.3f %.0f)'%(fill['_l'],cp3,ah)
    if 'accent2' in p:
        b=p['accent2']; bh=b['hue']; bm=b[mode]
        onp=bm['on']; on2=mk(0.985,nc*0.5,nh) if onp=='light' else mk(0.19,nc*0.8,nh)
        L2f=bm['L']
        for _ in range(400):
            if wcag(to_hex(L2f,bm['C'],bh),on2['hex'])>=4.5 and abs(apca(on2['hex'],to_hex(L2f,bm['C'],bh)))>=ONLC: break
            L2f+= -0.002 if onp=='light' else 0.002
        T['accent2']=mk(L2f,bm['C'],bh); T['accent2-on']=on2
        s2=mk(m['soft'],min(bm['C'],0.04),bh); T['accent2-soft']=s2
        LT2=solve(min(bm['C'],0.14),bh,base+[s2['hex']],4.5,0.8 if light else 0.3,-1 if light else +1,60)
        T['accent2-text']=mk(LT2,min(bm['C'],0.14),bh)
    # states
    sh=dict(success=150,warning=82,danger=27,info=240); sh.update(p.get('state_hue',{}))
    sc=p.get('state_chroma',1.0)
    for k,h in sh.items():
        c=(0.13 if k!='warning' else 0.12)*sc
        sL=(0.955 if light else m['surf'][0]+0.06); scol=mk(sL,0.04*sc,h)
        Ls=solve(c,h,base+[scol['hex']],4.5,0.8 if light else 0.3,-1 if light else +1,60)
        T[k]=mk(Ls,c,h); T[k+'-soft']=scol
    return T

def ramp12(H,Cpk,Lfill,mode,Ltext=None):
    if mode=='light':
        Ls=[0.993,0.982,0.960,0.938,0.905,0.863,0.810,0.734,Lfill,Lfill-0.027,Ltext,max(0.25,Ltext-0.23)]
        prof=[.016,.047,.104,.181,.264,.352,.461,.627,1,.948,.839,.497]
    else:
        Ls=[0.194,0.213,0.274,0.320,0.367,0.416,0.474,0.541,Lfill,Lfill+0.04,Ltext,min(0.95,Ltext+0.15)]
        prof=[.130,.155,.342,.503,.549,.585,.632,.725,1,.876,.653,.264]
    return [mk(L,Cpk*pr,H) for L,pr in zip(Ls,prof)]
def neutral12(H,c,mode):
    Ls=[0.991,0.982,0.955,0.931,0.907,0.885,0.851,0.792,0.643,0.610,0.503,0.244] if mode=='light' else [0.178,0.213,0.252,0.285,0.313,0.348,0.402,0.489,0.538,0.583,0.770,0.949]
    return [mk(L,c*(0.5+0.5*(i/8 if i<8 else 1)),H) for i,L in enumerate(Ls)]

PALS=json.load(open('pals.json'))
out=[]
for p in PALS:
    rec={k:p[k] for k in ('id','name','archetype','suits','avoid','mood','accent_hue') if k in p}
    rec['accent_hue']=p['accent_hue']
    for mode in ('light','dark'):
        T=build_mode(p,mode)
        rec[mode]={k:{'oklch':v['oklch'],'hex':v['hex']} for k,v in T.items() if not k.startswith('_')}
        rec[mode+'_p3_accent']=T.get('_accent_p3')
        # contrast report
        g=lambda k:T[k]['hex']
        pairs=[('ink-1','surface-page'),('ink-1','surface-card'),('ink-2','surface-sunken'),('ink-3','surface-sunken'),('accent-on','accent'),('accent-on','accent-hover'),
               ('accent-text','surface-page'),('accent-text','accent-soft'),('border-strong','surface-page'),('border-strong','surface-card'),('ring','surface-page'),('accent','surface-page'),
               ('ink-inverse','surface-inverse')]
        for s in ('success','warning','danger','info'):
            pairs+= [(s,'surface-page'),(s,s+'-soft')]
        if 'accent2' in T: pairs+=[('accent2-on','accent2'),('accent2-text','surface-page'),('accent2-text','accent2-soft')]
        rec[mode+'_contrast']=[{'fg':a,'bg':b,'wcag':round(wcag(g(a),g(b)),2),'apca':round(apca(g(a),g(b)),1)} for a,b in pairs]
        pk=p[mode]['accent']
        rec[mode+'_ramps']={'neutral':[{'oklch':x['oklch'],'hex':x['hex']} for x in neutral12(p[mode]['nh'],p[mode]['nc'],mode)],
                           'accent':[{'oklch':x['oklch'],'hex':x['hex']} for x in ramp12(p['accent_hue'],pk['C'],T['accent']['_l'],mode,T['accent-text']['_l'])]}
    out.append(rec)
json.dump(out,open('palettes_out.json','w'),indent=1)
# summary
for r in out:
    print('\n##',r['id'])
    for mode in ('light','dark'):
        bad=[c for c in r[mode+'_contrast'] if (c['wcag']<4.5 and c['fg'] not in ('border-strong','ring','accent')) or (c['fg'] in('border-strong','ring') and c['wcag']<3)]
        print(mode,'accent',r[mode]['accent']['oklch'],r[mode]['accent']['hex'],'on',r[mode]['accent-on']['hex'],'| fails:',bad)
