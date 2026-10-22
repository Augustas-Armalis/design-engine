# Merge FixTweet pages + earlier timelines into posts.json and a media download list.
# usage: python -I build_x.py <handle> <prefix> <outdir> <pages-glob>... [--old file.json ...]
import json,glob,sys,os,re
handle,prefix,outdir=sys.argv[1:4]
files=[];old=[]
args=sys.argv[4:]
mode='p'
for a in args:
  if a=='--old': mode='o'; continue
  (files if mode=='p' else old).extend(sorted(glob.glob(a)))
posts={}
for f in files:
  for x in json.load(open(f)).get('results',[]): posts[x['id']]=x
for f in old:
  for x in json.load(open(f)):
    posts.setdefault(x['id'],x)
P=[]
for x in sorted(posts.values(),key=lambda x:-int(x['id'])):
  if x.get('author',{}).get('screen_name','').lower()!=handle.lower(): continue
  media=(x.get('media') or {}).get('all',[])
  P.append(dict(id=x['id'],url=x['url'],date=x.get('created_at'),ts=x.get('created_timestamp'),text=x.get('text'),
    views=x.get('views'),likes=x.get('likes'),reposts=x.get('reposts'),bookmarks=x.get('bookmarks'),replies=x.get('replies'),
    replying_to=(x.get('replying_to') or {}).get('screen_name') if isinstance(x.get('replying_to'),dict) else x.get('replying_to'),
    quote=(x.get('quote') or {}).get('id'),
    media=[dict(type=m['type'],w=m.get('width'),h=m.get('height'),url=m.get('url'),thumb=m.get('thumbnail_url'),dur=m.get('duration')) for m in media]))
json.dump(P,open(f'{outdir}/posts.json','w'),indent=0)
n=0
with open(f'{outdir}/../_scripts/{prefix}-list.tsv','w') as L:
  for p in P:
    for i,m in enumerate(p['media']):
      iid=f"{prefix}-{p['id']}-{i}"
      if m['type']=='photo':
        u=re.sub(r'\?name=\w+','',m['url']); u=u+'?name=orig'
        ext=os.path.splitext(u.split('?')[0])[1] or '.jpg'
        L.write(f"{iid}\t{u}\t_originals/{os.path.basename(outdir)}/{iid}{ext}\n")
      elif m.get('thumb'):
        L.write(f"{iid}-vthumb\t{m['thumb']}\t_originals/{os.path.basename(outdir)}/{iid}-vthumb.jpg\n")
      n+=1
print(len(P),'posts',n,'media', sum(1 for p in P if p['media']),'posts with media')
