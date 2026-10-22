# usage: pipeline.py stage(jobs|score) parse.json ref.json rdir out.json [imgroot]
import sys,json,os,numpy as np
sys.path.insert(0,'scripts')
import solve as S
from verify import jobs_for, score
from PIL import Image
stage,pj,refp,rdir,outp=sys.argv[1:6]
P=json.load(open(pj)); S.load(refp)
K=10
def variants(rows,top):
    out=[]
    for s in top:
        refs=S.REF[s['c']]
        for f in (0.985,1.0,1.015):
            sz=s['size']*f; T=[]
            for r in rows:
                ref=refs[r['t']]; n=max(1,len(r['t'])-1)
                T.append((r['w']-ref['w']*sz/64)/(n*sz))
            out.append(dict(c=s['c'],size=round(sz,2),track=round(float(np.mean(T)),4)))
    return out
if stage=='jobs':
    jobs=[]
    for k,v in P.items():
        rows=[dict(t=r['t'],asc=r['asc'],xh=r['xh'],w=r['right']-r['left'],area=r['area']) for r in v.get('h1',[])]
        if not rows: continue
        top=S.solve(rows,top=K,whi=0.01)
        v['_sol']=top
        jobs.append(jobs_for(k,rows,variants(rows,top),v['h1'][0]['fg'],v['page_bg']))
    json.dump(jobs,open(outp,'w'))
    print(len(jobs))
else:
    jobs={j['id']:j for j in json.load(open(outp.replace('.json','_jobs.json')))}
    root=sys.argv[6]
    res={}
    for k,v in P.items():
        if k not in jobs: continue
        img=np.asarray(Image.open(v['_img'] if v.get('_img') else os.path.join(root,v.get('cat','hero'),'img',k)).convert('RGB')).astype(float)
        rows=[dict(t=r['t'],top=r['top'],base=r['base'],left=r['left'],right=r['right'],asc=r['asc']) for r in v['h1']]
        # score variants individually: items carry cid only, so tag size
        j=jobs[k]
        for i,it in enumerate(j['items']): it['cid']=f"{it['cid']}@{it['size']}@{round(it['ls']/it['size'],4)}"
        sc=score(img,rows,j,rdir)
        res[k]=sc[:6]
    json.dump(res,open(outp,'w'),indent=0)
    print(len(res))
