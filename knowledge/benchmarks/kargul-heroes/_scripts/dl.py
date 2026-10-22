import json, urllib.request, os, time, shutil
H=['43-01','43-09','agent-arcade-09','altrina-01','boomtax-01','breez-01','chatsheet-01','defendlab-01','ecom-jobs-03','gopher-01','hunt-01','hunt-03','lemon-01','mobile-first-company-00','mobile-first-company-07','opero-labs-01','opsis-partners-07','ostium-01','runinfra-00','stardust-01','supermetal-00','txtcart-04','uniops-00','uplinq-05','volcano-00','zeroleaks-02']
c=json.load(open('kargul-studio-2026-10/cases.json'))
out='kargul-heroes/originals/'
rows=[]
for k,v in c.items():
  for i,im in enumerate(v['images']):
    g=(im.get('gallery_match') or '').replace('.jpg','')
    if g in H:
      fn=f'case-{g}.png'
      if not os.path.exists(out+fn):
        req=urllib.request.Request(im['source'],headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req,timeout=60) as r, open(out+fn,'wb') as f: f.write(r.read())
        time.sleep(0.5)
      rows.append((fn,k,v['url'],im['source']))
for src,name,k in [('kargul-studio-2026-10/am-trades/am-trades-00.png','case-am-trades-00.png','am-trades'),('kargul-studio-2026-10/rork/rork-04.png','case-rork-04.png','rork')]:
  shutil.copy(src,out+name); rows.append((name,k,c[k]['url'],c[k]['images'][0 if k=='am-trades' else 4]['source']))
json.dump(rows,open('/private/tmp/claude-501/-Users-augustas-Documents-Larpo-front-end-engine/c7ae5869-cc65-4450-bbb6-04aec004ab65/scratchpad/kh/case_rows.json','w'),indent=0)
print(len(rows))
