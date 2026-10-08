"""Render every page of a PDF to JPG and OCR it with macOS Vision.
usage: ocr_pdf.py <pdf> <outdir> [dpi]
writes <outdir>/pages/p-0001.jpg and <outdir>/text/p-0001.txt
"""
import sys, os, fitz, Vision, Quartz
from Foundation import NSURL

pdf, out = sys.argv[1], sys.argv[2]
dpi = int(sys.argv[3]) if len(sys.argv) > 3 else 100
os.makedirs(f"{out}/pages", exist_ok=True); os.makedirs(f"{out}/text", exist_ok=True)
doc = fitz.open(pdf)

def ocr(path):
    url = NSURL.fileURLWithPath_(path)
    req = Vision.VNRecognizeTextRequest.alloc().init()
    req.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
    req.setUsesLanguageCorrection_(True)
    h = Vision.VNImageRequestHandler.alloc().initWithURL_options_(url, None)
    ok, err = h.performRequests_error_([req], None)
    if not ok: return f"[OCR ERROR {err}]"
    obs = sorted(req.results(), key=lambda o: (-round(o.boundingBox().origin.y + o.boundingBox().size.height, 2), o.boundingBox().origin.x))
    return "\n".join(o.topCandidates_(1)[0].string() for o in obs)

for i, page in enumerate(doc, 1):
    jp = f"{out}/pages/p-{i:04d}.jpg"
    tp = f"{out}/text/p-{i:04d}.txt"
    if os.path.exists(tp): continue
    if not os.path.exists(jp): page.get_pixmap(dpi=dpi).save(jp, jpg_quality=82)
    open(tp, "w").write(ocr(jp))
    if i % 25 == 0: print("done", i, flush=True)
print("FINISHED", len(doc))
