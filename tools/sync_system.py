#!/usr/bin/env python3
"""Sync machine-readable design data from knowledge/web into system/.

usage: .venv/bin/python tools/sync_system.py
Idempotent. knowledge/ stays the source of truth; system/ is what builds and tools consume.
"""
import json, os, re, shutil

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
WEB = os.path.join(ROOT, "knowledge", "web")
SYS = os.path.join(ROOT, "system")


def copy(src, dst):
    s, d = os.path.join(WEB, src), os.path.join(SYS, dst)
    if not os.path.exists(s):
        print(f"  skip (missing): {src}")
        return
    os.makedirs(os.path.dirname(d), exist_ok=True)
    json.load(open(s, encoding="utf-8"))  # validate before copying
    shutil.copyfile(s, d)
    print(f"  {src} -> system/{dst}")


def blocks(md_name, names):
    """Extract fenced ```json blocks from a note, in order, saving each under names[i]."""
    p = os.path.join(WEB, md_name)
    if not os.path.exists(p):
        print(f"  skip (missing): {md_name}")
        return
    found = re.findall(r"```json\n(.*?)```", open(p, encoding="utf-8").read(), re.S)
    for i, raw in enumerate(found):
        name = names[i] if i < len(names) else f"extra-{i + 1}"
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            print(f"  block {i + 1} in {md_name} is not valid JSON ({e}); skipped")
            continue
        out = os.path.join(SYS, "tokens", f"{name}.json")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        json.dump(data, open(out, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        print(f"  {md_name} block {i + 1} -> system/tokens/{name}.json")


print("sync system/ from knowledge/web")
copy("palettes.json", "tokens/palettes.json")
copy("motion-tokens.json", "tokens/motion.json")
copy("font-catalogue.json", "fonts/catalogue.json")
blocks("tokens-spacing-radius-sizing.md", ["primitive", "semantic", "theme-knobs", "component-audit"])
