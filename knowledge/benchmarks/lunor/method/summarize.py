import json,numpy as np,sys
sys.path.insert(0,'scripts')
P=json.load(open('hero_parse.json')); V=json.load(open('vr_hero.json'))
RS=json.load(open('ref_small.json')); FM=json.load(open('fontmetrics.json'))
def fam_of(cid): return cid.rsplit('-',1)[0]
def size_small(rows,fam):
    best=None
    for w in (400,500):
        refs=RS.get(f'{fam}-{w}')
        if not refs: continue
        S=[];T=[];DA=[]
        for r in rows:
            ref=refs.get(r['t'])
            if not ref or not ref['asc']: continue
            s=64*r['asc']/ref['asc']; n=max(1,len(r['t'])-1)
            S.append(s); T.append(((r['right']-r['left'])-ref['w']*s/64)/(n*s)); DA.append((r['area']/r['asc']**2)/(ref['area']/ref['asc']**2)-1)
        if not S: continue
        sc=abs(np.mean(DA))+abs(min(0,np.mean(T)+0.05))
        if best is None or sc<best[0]: best=(sc,w,float(np.mean(S)),float(np.mean(T)))
    return best
out={}
for k,p in P.items():
    if 'h1' not in p or not V.get(k): continue
    err,c=V[k][0]; cid,sz,tr=c.split('@'); sz=float(sz); tr=float(tr); fam=fam_of(cid); w=int(cid.rsplit('-',1)[1])
    fm=FM.get(fam,FM['inter-disp'])
    h1=p['h1']; L1=(h1[-1]['base']-h1[0]['base'])/(len(h1)-1) if len(h1)>1 else 1.1*sz
    def box(base,L,s): return (base-L/2-(fm['asc']-fm['desc'])*s/2, base+L/2-(fm['asc']-fm['desc'])*s/2)
    h1top=box(h1[0]['base'],L1,sz)[0]; h1bot=box(h1[-1]['base'],L1,sz)[1]
    r=dict(file=k,author=k.split('__')[0],font=fam,weight=w,size=round(sz,1),track_em=round(tr,4),err=round(err,1),lines=len(h1),lh=round(L1/sz,3),h1_text=' / '.join(x['t'] for x in h1),
           h1_ink_top=h1[0]['top'],h1_left=min(x['left'] for x in h1),h1_right=max(x['right'] for x in h1),align=p['align'],h1_fg=h1[0]['fg'],page_bg=p['page_bg'],h1_css_top=round(h1top,1))
    sub=p.get('sub',[])
    if sub:
        ss=size_small(sub,fam)
        if ss:
            _,sw,ssz,str_=ss; L2=(sub[-1]['base']-sub[0]['base'])/(len(sub)-1) if len(sub)>1 else 1.5*ssz
            stop=box(sub[0]['base'],L2,ssz)[0]; sbot=box(sub[-1]['base'],L2,ssz)[1]
            r.update(sub_size=round(ssz,1),sub_weight=sw,sub_track=round(str_,4),sub_lines=len(sub),sub_lh=round(L2/ssz,2),sub_fg=sub[0]['fg'],sub_w=max(x['right'] for x in sub)-min(x['left'] for x in sub),
                     gap_h1_sub_css=round(stop-h1bot,1),gap_h1_sub_optical=sub[0]['top']-h1[-1]['base'],sub_text=' / '.join(x['t'] for x in sub))
            anchor_css=sbot; anchor_opt=sub[-1]['base']
        else: anchor_css=h1bot; anchor_opt=h1[-1]['base']
    else: anchor_css=h1bot; anchor_opt=h1[-1]['base']
    ctas=[c for c in p.get('ctas',[]) if c.get('box')]
    if ctas:
        b0=min(c['box']['y'] for c in ctas)
        r.update(cta=[dict(t=c['t'],h=c['box']['h'],w=c['box']['w'],r=c['box']['r'],filled=c['box']['filled'],fill=c['box']['fill'],fg=c['fg'],text_asc=c['text_asc']) for c in p['ctas'] if c.get('box')],
                 gap_sub_cta_css=round(b0-anchor_css,1),gap_sub_cta_optical=b0-anchor_opt)
        if len(ctas)>1:
            cs=sorted(ctas,key=lambda c:c['box']['x']); r['cta_gap']=cs[1]['box']['x']-(cs[0]['box']['x']+cs[0]['box']['w'])
        bot=max(c['box']['y']+c['box']['h'] for c in ctas)
        if p.get('next_y'): r['gap_cta_next']=p['next_y']-bot
    ch=p.get('chip')
    if ch:
        r['chip_text']=ch['t']; r['chip_box']=ch['box']
        cb=(ch['box']['y']+ch['box']['h']) if ch['box'] else ch['base']
        r['gap_chip_h1_css']=round(h1top-cb,1); r['gap_chip_h1_optical']=h1[0]['top']-cb
    nav=p['nav']['rows']
    if nav: r['nav']=[(x['t'][:18],x['asc'],x['left'],x['base']) for x in nav]
    out[k]=r
json.dump(out,open('hero_summary.json','w'),indent=1)
print(len(out))
