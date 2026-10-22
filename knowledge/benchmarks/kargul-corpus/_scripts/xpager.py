# Page the public FixTweet profile endpoint until the cursor stops. No login.
# usage: python -I xpager.py <handle> <kind: statuses|media> <outdir> [maxpages]
import json,urllib.request,urllib.parse,time,sys,os
handle,kind,outdir=sys.argv[1],sys.argv[2],sys.argv[3]
maxp=int(sys.argv[4]) if len(sys.argv)>4 else 400
cur=None;seen=set();n=0;fails=0;i=0
while i<maxp:
  url=f'https://api.fxtwitter.com/2/profile/{handle}/{kind}'+(f'?cursor={urllib.parse.quote(cur)}' if cur else '')
  try:
    d=json.load(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=40))
  except Exception as e:
    fails+=1; print('err',e,flush=True)
    if fails>4: break
    time.sleep(15); continue
  fails=0
  r=d.get('results') or []
  new=[x for x in r if x.get('id') not in seen]
  for x in r: seen.add(x.get('id'))
  json.dump(d,open(f'{outdir}/page{i:03d}.json','w'))
  n+=len(new)
  print(i,len(r),len(new),r[-1].get('created_at') if r else None,flush=True)
  nc=(d.get('cursor') or {}).get('bottom')
  if not r or not nc or nc==cur or (i>2 and not new): break
  cur=nc;i+=1
  time.sleep(3)
print('total unique',n)
