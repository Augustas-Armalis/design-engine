import sys,json,re,numpy as np
sys.path.insert(0,'scripts')
from ink import line_metrics
from PIL import Image
B='/Users/augustas/Documents/Larpo front-end engine/knowledge/benchmarks/lunor/'
O=json.load(open('ocr.json'))
def dist(a,b): return float(np.sqrt(((np.array(a,float)-np.array(b,float))**2).sum()))
def rows_of(a,lines):
    ms=[]
    for l in lines:
        if l['c']<0.3 or not re.search(r'[A-Za-z0-9]',l['t']): continue
        m=line_metrics(a,l)
        if not m or m['asc']<5: continue
        m['t']=l['t']; ms.append(m)
    ms.sort(key=lambda m:(m['base'],m['left']))
    rows=[]
    for m in ms:
        for r in rows:
            if abs(r['base']-m['base'])<=max(2,0.18*max(r['asc'],m['asc'])) and min(abs(m['left']-r['right']),abs(r['left']-m['right']))<1.6*max(r['asc'],m['asc']) and abs(r['asc']-m['asc'])<0.35*max(r['asc'],m['asc']):
                r['parts'].append(m); r['left']=min(r['left'],m['left']); r['right']=max(r['right'],m['right']); r['top']=min(r['top'],m['top']); r['asc']=max(r['asc'],m['asc']); break
        else:
            rows.append(dict(parts=[m],left=m['left'],right=m['right'],top=m['top'],base=m['base'],asc=m['asc']))
    for r in rows:
        r['parts'].sort(key=lambda p:p['left']); r['t']=' '.join(p['t'] for p in r['parts'])
        r['fg']=max(r['parts'],key=lambda p:p['area'])['fg']; r['bg']=r['parts'][0]['bg']
        r['xh']=max(r['parts'],key=lambda p:p['area'])['xh']
        r['area']=sum(p['area'] for p in r['parts'])
    rows.sort(key=lambda r:(r['top'],r['left']))
    return rows
def scan_box(a,r,page_bg):
    """find a button/chip box around a text row. returns dict or None"""
    H,W,_=a.shape
    y=int((r['top']+r['base'])/2)
    inner=np.array(r['bg'],float)
    filled=dist(inner,page_bg)>12
    # horizontal scan left from text left
    def edge(x,dx,ref,lim):
        for k in range(1,lim):
            xx=x+dx*k
            if xx<0 or xx>=W: return None
            if dist(a[y,xx],ref)>14: return xx
        return None
    lim=int(min(80,3.2*r['asc']+30))
    if filled:
        L=edge(r['left']-1,-1,inner,lim); R=edge(r['right']+1,1,inner,lim)
        if L is None or R is None: return None
        L+=1; R-=1
    else:
        L=edge(r['left']-1,-1,page_bg,lim); R=edge(r['right']+1,1,page_bg,lim)
        if L is None or R is None: return None
    ref=inner if filled else page_bg
    ymid=int((r['top']+r['base'])/2)
    def vtop(cx):
        # from ymid go up until edge; for filled: leave fill; for ring: hit ring
        for k in range(1,int(2.5*r['asc'])+40):
            yy=ymid-k
            if yy<0: return None
            if dist(a[yy,cx],ref)>(40 if filled else 14): return yy+ (1 if filled else 0)
        return None
    def vbot(cx):
        for k in range(1,int(2.5*r['asc'])+40):
            yy=ymid+k
            if yy>=H: return None
            if dist(a[yy,cx],ref)>(40 if filled else 14): return yy-(1 if filled else 0)
        return None
    cx=max(L+2,r['left']-3)
    T=vtop(cx); Bt=vbot(cx)
    if T is None or Bt is None: return None
    h=Bt-T+1; w=R-L+1
    if h<14 or h>90 or w<30: return None
    prof=[]
    for k in range(0,min(h//2+1,(r['left']-L))):
        t_=vtop(L+k)
        if t_ is None: t_=ymid
        prof.append(t_-T)
    rad=0; best=None
    for R_ in range(0,h//2+2):
        e=0
        for k,o in enumerate(prof):
            dx=R_-(k+0.5)
            off=R_-np.sqrt(max(0,R_*R_-dx*dx)) if dx>0 else 0
            e+=abs(off-o)
        if best is None or e<best: best=e; rad=R_
    fill=[int(v) for v in a[min(T+h//2,H-1),L+2]] if filled else None
    return dict(x=int(L),y=int(T),w=int(w),h=int(h),r=rad,filled=bool(filled),fill=[int(v) for v in inner] if filled else None)
def parse(cat,k):
    a=np.asarray(Image.open(B+cat+'/img/'+k).convert('RGB')).astype(float)
    H,W,_=a.shape
    rows=rows_of(a,O[k])
    nav=[r for r in rows if r['top']<100]
    body=[r for r in rows if r['top']>=90]
    cand=[r for r in body if r['top']<0.86*H and len(re.sub(r'[^A-Za-z]','',r['t']))>=5 and r['right']-r['left']>120]
    if not cand: return dict(file=k,err='no h1')
    mx=max(cand,key=lambda r:r['asc'])
    # h1 block: rows with asc>=0.72*mx around mx, contiguous
    h1=[mx]
    for direction in (-1,1):
        cur=mx
        while True:
            nxt=None
            for r in body:
                if r in h1 or r['asc']<0.72*mx['asc']: continue
                if direction==1 and 0<r['top']-cur['base']<0.9*mx['asc'] and not (r['right']<cur['left'] or r['left']>cur['right']): nxt=r;break
                if direction==-1 and 0<cur['top']-r['base']<0.9*mx['asc'] and not (r['right']<cur['left'] or r['left']>cur['right']): nxt=r;break
            if not nxt: break
            h1.append(nxt); cur=nxt
    h1.sort(key=lambda r:r['top'])
    x0=min(r['left'] for r in h1); x1=max(r['right'] for r in h1)
    cx=(x0+x1)/2
    page_bg=np.array(h1[0]['bg'],float)
    align='center' if abs(cx-W/2)<40 else ('left' if x0<W/2 else 'right')
    after=[r for r in body if r['top']>h1[-1]['base'] and r not in h1]
    def overlaps(r): return not (r['right']<x0-80 or r['left']>x1+80) if align!='left' else (r['left']<x0+60 and r['left']>x0-40)
    after=[r for r in after if overlaps(r)]
    sub=[]
    for r in after:
        if r['asc']<0.62*mx['asc'] and r['asc']>=0.12*mx['asc']:
            if not sub and r['top']-h1[-1]['base']<3.2*mx['asc']+30: sub.append(r); continue
            if sub and r['top']-sub[-1]['base']<1.4*sub[-1]['asc']+8 and abs(r['asc']-sub[-1]['asc'])<=3: sub.append(r); continue
        if sub: break
    # CTA: rows after sub (or h1) within 160px
    anchor=(sub[-1]['base'] if sub else h1[-1]['base'])
    ctas=[]; cta_rows=[r for r in body if r['top']>anchor and r['top']-anchor<170 and r not in sub]
    cta_rows.sort(key=lambda r:r['top'])
    if cta_rows:
        first=cta_rows[0]
        same=[r for r in cta_rows if abs(r['base']-first['base'])<=6]
        for r in sorted(same,key=lambda r:r['left']):
            for p in r['parts']:
                pr=dict(p); pr['parts']=[p]; pr['t']=p['t']
                bx=scan_box(a,pr,page_bg)
                ctas.append(dict(t=p['t'],text_asc=p['asc'],text_left=p['left'],text_base=p['base'],fg=p['fg'],box=bx))
    above=[r for r in body if r['base']<h1[0]['top'] and h1[0]['top']-r['base']<150 and overlaps(r)]
    chip=None
    if above:
        r=above[-1]
        chip=dict(t=r['t'],asc=r['asc'],top=r['top'],base=r['base'],left=r['left'],right=r['right'],fg=r['fg'],box=scan_box(a,r,page_bg))
    # next element below CTA: scan rows in band x0..x1 for non-bg
    cta_bottom=max([c['box']['y']+c['box']['h'] for c in ctas if c['box']]+[c['text_base'] for c in ctas]+[anchor])
    nxt=None
    xs=slice(max(0,int(x0)-100),min(W,int(x1)+100))
    for yy in range(int(cta_bottom)+4,H):
        rowpx=a[yy,xs]; dd=np.sqrt(((rowpx-page_bg)**2).sum(1))
        if (dd>18).sum()>4: nxt=yy; break
    navinfo=dict(rows=[dict(t=r['t'],asc=r['asc'],top=r['top'],base=r['base'],left=r['left'],right=r['right'],fg=r['fg'],bg=r['bg']) for r in nav])
    def R(r): return dict(t=r['t'],asc=r['asc'],xh=r['xh'],top=r['top'],base=r['base'],left=r['left'],right=r['right'],fg=r['fg'],bg=r['bg'],area=r['area'])
    return dict(file=k,cat=cat,W=W,H=H,align=align,page_bg=[int(v) for v in page_bg],h1=[R(r) for r in h1],sub=[R(r) for r in sub],ctas=ctas,chip=chip,next_y=nxt,cta_bottom=int(cta_bottom),nav=navinfo)
if __name__=='__main__':
    import glob,os
    out={}
    for f in sorted(glob.glob(B+'hero/img/*.webp')):
        k=os.path.basename(f)
        try: out[k]=parse('hero',k)
        except Exception as e: out[k]=dict(file=k,err=repr(e))
    json.dump(out,open('hero_parse.json','w'),indent=1)
    print(len(out), sum(1 for v in out.values() if 'err' in v))
