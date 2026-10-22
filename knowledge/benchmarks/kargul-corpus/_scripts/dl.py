# Sequential, quiet downloader. usage: python -I dl.py <list.tsv: id\turl\toutpath> [sleep]
# Skips files that exist; one request at a time; logs failures to <list>.fail
import sys,os,time,urllib.request
lst=sys.argv[1]; slp=float(sys.argv[2]) if len(sys.argv)>2 else 1.0
rows=[l.rstrip('\n').split('\t') for l in open(lst) if l.strip()]
fail=open(lst+'.fail','a'); ok=sk=bad=0
for i,(iid,url,out) in enumerate(rows):
  if os.path.exists(out) and os.path.getsize(out)>0: sk+=1; continue
  os.makedirs(os.path.dirname(out),exist_ok=True)
  for att in range(3):
    try:
      req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
      with urllib.request.urlopen(req,timeout=60) as r: data=r.read()
      open(out+'.part','wb').write(data); os.replace(out+'.part',out); ok+=1; break
    except Exception as e:
      if att==2: fail.write(f'{iid}\t{url}\t{e}\n'); fail.flush(); bad+=1
      time.sleep(5*(att+1))
  if i%25==0: print(i,len(rows),ok,sk,bad,flush=True)
  time.sleep(slp)
print('done ok',ok,'skipped',sk,'failed',bad)
