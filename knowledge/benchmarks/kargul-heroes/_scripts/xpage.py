import json,urllib.request,urllib.parse,time,sys
handle,outdir,maxp=sys.argv[1],sys.argv[2],int(sys.argv[3])
cur=None;allr=[]
for i in range(maxp):
  url=f'https://api.fxtwitter.com/2/profile/{handle}/statuses'+(f'?cursor={urllib.parse.quote(cur)}' if cur else '')
  try:
    d=json.load(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=40))
  except Exception as e: print('err',e); time.sleep(10); continue
  r=d.get('results') or []
  if not r: print('empty page',i,d.get('code')); break
  allr+=r; json.dump(d,open(f'{outdir}/page{i:02d}.json','w'))
  cur=(d.get('cursor') or {}).get('bottom')
  print(i,len(r),r[-1].get('created_at'),flush=True)
  if not cur: break
  time.sleep(3)
json.dump(allr,open(f'{outdir}/all.json','w'))
print('total',len(allr))
