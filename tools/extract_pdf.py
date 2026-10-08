"""Extract text-layer PDFs: per-page txt + jpg render. usage: extract_pdf.py <pdf> <outdir> [dpi]"""
import sys, os, fitz
pdf, out = sys.argv[1], sys.argv[2]; dpi = int(sys.argv[3]) if len(sys.argv) > 3 else 80
os.makedirs(f"{out}/pages", exist_ok=True); os.makedirs(f"{out}/text", exist_ok=True)
d = fitz.open(pdf)
for i, p in enumerate(d, 1):
    open(f"{out}/text/p-{i:04d}.txt", "w").write(p.get_text())
    p.get_pixmap(dpi=dpi).save(f"{out}/pages/p-{i:04d}.jpg", jpg_quality=80)
print("FINISHED", pdf, len(d))
