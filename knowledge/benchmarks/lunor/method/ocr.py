import sys, json, os, Vision
from Foundation import NSURL
from PIL import Image
# usage: ocr.py out.json img1 img2 ...
out=sys.argv[1]; res={}
if os.path.exists(out): res=json.load(open(out))
for p in sys.argv[2:]:
    k=os.path.basename(p)
    if k in res: continue
    im=Image.open(p); W,H=im.size
    tmp='/private/tmp/claude-501/-Users-augustas-Documents-Larpo-front-end-engine/c7ae5869-cc65-4450-bbb6-04aec004ab65/scratchpad/lunor/_ocr.png'
    im.convert('RGB').save(tmp)
    req=Vision.VNRecognizeTextRequest.alloc().init()
    req.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
    req.setUsesLanguageCorrection_(False)
    req.setMinimumTextHeight_(0.008)
    h=Vision.VNImageRequestHandler.alloc().initWithURL_options_(NSURL.fileURLWithPath_(tmp),None)
    h.performRequests_error_([req],None)
    L=[]
    for o in req.results():
        c=o.topCandidates_(1)[0]; b=o.boundingBox()
        x=b.origin.x*W; w=b.size.width*W; hh=b.size.height*H; y=(1-b.origin.y-b.size.height)*H
        L.append({'t':c.string(),'c':round(float(c.confidence()),2),'x':round(x,1),'y':round(y,1),'w':round(w,1),'h':round(hh,1)})
    L.sort(key=lambda d:(d['y'],d['x']))
    res[k]=L
json.dump(res,open(out,'w'),indent=0)
print(len(res))
