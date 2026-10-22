# Contact sheet: python sheet.py <ids.txt> <out-prefix> [cols] [rows] [cell_w]
# ids.txt lines: id (looked up in manifest.tsv study_file). Labels each cell with its line number and id tail.
import sys,os
from PIL import Image,ImageDraw,ImageFont
ids=[l.split('\t')[0].strip() for l in open(sys.argv[1]) if l.strip()]
pre=sys.argv[2]; C=int(sys.argv[3]) if len(sys.argv)>3 else 6; R=int(sys.argv[4]) if len(sys.argv)>4 else 5; CW=int(sys.argv[5]) if len(sys.argv)>5 else 300
M={l.split('\t')[0]:l.rstrip('\n').split('\t') for l in open('manifest.tsv')}
CH=int(CW*0.75); LH=16
try: font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',12)
except Exception: font=ImageFont.load_default()
per=C*R
for s in range(0,len(ids),per):
  sh=Image.new('RGB',(C*CW,R*(CH+LH)),(128,128,128)); d=ImageDraw.Draw(sh)
  for j,iid in enumerate(ids[s:s+per]):
    x=(j%C)*CW; y=(j//C)*(CH+LH)
    try:
      im=Image.open(M[iid][5]).convert('RGB'); im.thumbnail((CW-4,CH-4))
      sh.paste(im,(x+(CW-im.width)//2,y+LH+(CH-im.height)//2))
    except Exception as e: d.text((x+4,y+30),'ERR',fill=(255,0,0))
    d.rectangle([x,y,x+CW-1,y+LH-1],fill=(20,20,20)); d.text((x+3,y+2),f'{s+j+1} {iid[-22:]}',fill=(255,255,0),font=font)
  sh.save(f'{pre}-{s//per+1:02d}.jpg',quality=80)
print((len(ids)+per-1)//per,'sheets')
