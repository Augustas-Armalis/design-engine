import random, math, json, itertools
from clib import *
M={'deut':[[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]],
   'prot':[[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]],
   'trit':[[1.255528,-0.076749,-0.178779],[-0.078411,0.930809,0.147602],[0.004733,0.691367,0.303900]]}
def lab_of(hx,mode=None):
    lin=[s2l(x) for x in hex2rgb(hx)]
    if mode:
        m=M[mode]; lin=[max(0,min(1,sum(m[i][j]*lin[j] for j in range(3)))) for i in range(3)]
    return lin2oklab(*lin)
def de(a,b): return math.dist(a,b)*100
def score(hexes):
    worst=99
    for mode in (None,'deut','prot','trit'):
        labs=[lab_of(h,mode) for h in hexes]
        for i,j in itertools.combinations(range(len(hexes)),2):
            d=de(labs[i],labs[j])
            w = d if mode is None else d*1.25   # CVD allowed to be a bit lower
            worst=min(worst,w)
    return worst
def search(n,bg,lrange,C,iters=6000,seed=1):
    rnd=random.Random(seed)
    best=None;bs=-1
    def mkc(h,l): return to_hex(l,C,h)
    def ok(hx): return wcag(hx,bg)>=3.0
    for restart in range(12):
        st=[(rnd.uniform(0,360),rnd.uniform(*lrange)) for _ in range(n)]
        def sc(s):
            hx=[mkc(h,l) for h,l in s]
            if not all(ok(x) for x in hx): return -1
            return score(hx)
        cur=sc(st)
        for it in range(iters//12):
            i=rnd.randrange(n); h,l=st[i]
            cand=list(st); cand[i]=((h+rnd.gauss(0,25))%360,min(lrange[1],max(lrange[0],l+rnd.gauss(0,0.04))))
            s2=sc(cand)
            if s2>=cur: st,cur=cand,s2
        if cur>bs: bs,best=cur,st
    return bs,best
if __name__=='__main__':
    res={}
    for name,bg,lr,C in (('light','#ffffff',(0.45,0.68),0.14),('dark','#141414',(0.62,0.85),0.13)):
        for n in (6,8):
            s,st=search(n,bg,lr,C)
            st=sorted(st,key=lambda x:x[0])
            hx=[to_hex(l,C,h) for h,l in st]
            res[f'{name}-{n}']={'score':round(s,1),'colors':[{'oklch':'oklch(%.3f %.3f %.0f)'%(map_srgb(l,C,h)),'hex':x,'wcag_vs_bg':round(wcag(x,bg),2)} for (h,l),x in zip(st,hx)]}
            print(name,n,round(s,1),hx)
    # Okabe-Ito check
    oi=['#E69F00','#56B4E9','#009E73','#F0E442','#0072B2','#D55E00','#CC79A7','#000000']
    print('okabe-ito 8 score',round(score(oi),1),' (7 w/o black',round(score(oi[:7]),1),')')
    print('okabe-ito min wcag vs white',min(round(wcag(x,'#ffffff'),2) for x in oi))
    json.dump(res,open('dv_out.json','w'),indent=1)
