import json,numpy as np
REF=None
def load(p):
    global REF; REF=json.load(open(p))
def solve(rows, top=5, wlo=-0.08, whi=0.03):
    """rows: list of dict(t, asc, xh, w, area). returns ranked candidates"""
    out=[]
    for cid,refs in REF.items():
        S=[];T=[];DA=[];DX=[];ok=True
        for r in rows:
            ref=refs.get(r['t'])
            if not ref or not r['asc'] or not ref['asc']: ok=False;break
            s=64*r['asc']/ref['asc']
            n=max(1,len(r['t'])-1)
            t=(r['w']-ref['w']*s/64)/(n*s)
            a_img=r['area']/r['asc']**2; a_ref=ref['area']/ref['asc']**2
            DA.append(a_img/a_ref-1)
            if r.get('xh') and ref.get('xh'): DX.append(r['xh']/r['asc']-ref['xh']/ref['asc'])
            S.append(s);T.append(t)
        if not ok or not S: continue
        S=np.array(S);T=np.array(T)
        pen=sum(max(0,wlo-t)+max(0,t-whi) for t in T)*20
        score=abs(np.mean(DA))*2+ (np.mean(np.abs(DX)) if DX else 0)*4 + pen + (np.std(S)/np.mean(S))*3 + np.std(T)*20
        out.append(dict(c=cid,score=round(float(score),3),size=round(float(np.mean(S)),1),track=round(float(np.mean(T)),4),dA=round(float(np.mean(DA)),3),dX=round(float(np.mean(DX)) if DX else 0,3)))
    out.sort(key=lambda d:d['score'])
    return out[:top]
