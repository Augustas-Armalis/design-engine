#!/usr/bin/env python3
"""Build system/rules/index.json from every **RULE** block in knowledge/**/*.md.

usage: .venv/bin/python tools/build_index.py            # rebuild index
       .venv/bin/python tools/build_index.py query typography line-height   # keyword search
Re-run after any change to knowledge/. Never hand-edit the index.
"""
import json, os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
KNOW = os.path.join(ROOT, "knowledge")
OUT = os.path.join(ROOT, "system", "rules", "index.json")

# Accepted rule openers (IDs may be multi-part, e.g. T-SC-01; studies write them three ways): **RULE** text, **RULE [ID]** text, **RULE ID** text, **ID RULE** text.
# Group 1 = id (bracketed, after RULE, or before RULE), group 2 = the rule text.
START = re.compile(r"^\s*(?:[-*]|\d+\.)?\s*\*\*(?:([A-Z]{1,5}(?:-[A-Z]{1,5})*-\d+[a-z]?)\s+)?RULE(?:\s*\[([^\]]+)\]|\s+([A-Z]{1,5}(?:-[A-Z]{1,5})*-\d+[a-z]?))?\*\*\s*(.*)")
FIELD = re.compile(r"\*\*(Why|Applies to|Check|Source|Severity|Applies)\*\*\s*:?\s*")


def front(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip()
    return meta


def parse(path):
    text = open(path, encoding="utf-8").read()
    meta = front(text)
    rel = os.path.relpath(path, KNOW)
    tags = [t.strip() for t in re.sub(r"[\[\]]", "", meta.get("topic_tags", "")).split(",") if t.strip()]
    rules, section, lines, i = [], "", text.split("\n"), 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("#"):
            section = line.lstrip("# ").strip()
        m = START.match(line)
        if m:
            block = [m.group(4)]
            rid = m.group(2) or m.group(3) or m.group(1)
            i += 1
            while i < len(lines) and lines[i].strip() != "" and not START.match(lines[i]) and not lines[i].startswith("#"):
                block.append(lines[i].strip())
                i += 1
            rules.append((section, " ".join(block), rid))
            continue
        i += 1
    out = []
    for n, (sec, blob, rid) in enumerate(rules, 1):
        parts = FIELD.split(blob)
        head = parts[0].strip()
        fields = {}
        for k, v in zip(parts[1::2], parts[2::2]):
            fields[k.lower().replace(" ", "_")] = v.strip()
        check = fields.get("check", "")
        checkable = bool(check) and not re.match(r"^`?(visual|n/a)", check.strip(), re.I)
        applies = fields.get("applies_to", fields.get("applies", ""))
        kind = "opinion" if re.search(r"\(opinion\)|\bopinion\b", blob, re.I) else ("engine" if "[engine note]" in blob else "source")
        slug = re.sub(r"\.md$", "", rel).replace("/", ".")
        out.append({
            "id": rid if rid and re.match(r"^[A-Za-z]+-", rid) else f"{slug}#{n}",
            "text": head,
            "why": fields.get("why", ""),
            "applies": applies,
            "check": check,
            "checkable": checkable,
            "source": fields.get("source", ""),
            "file": rel,
            "section": sec,
            "tags": tags,
            "kind": kind,
            "origin": meta.get("source", ""),
        })
    return out


def build():
    rules = []
    for dp, _, fs in os.walk(KNOW):
        for f in sorted(fs):
            if f.endswith(".md") and f not in ("SCHEMA.md", "INDEX.md"):
                rules += parse(os.path.join(dp, f))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(rules, open(OUT, "w"), indent=1, ensure_ascii=False)
    by_file = {}
    for r in rules:
        by_file[r["file"]] = by_file.get(r["file"], 0) + 1
    chk = sum(r["checkable"] for r in rules)
    print(f"{len(rules)} rules from {len(by_file)} files; {chk} mechanically checkable -> {os.path.relpath(OUT, ROOT)}")
    return rules


def query(words):
    rules = json.load(open(OUT, encoding="utf-8"))
    words = [w.lower() for w in words]
    hits = [r for r in rules if all(w in (r["text"] + " " + r["why"] + " " + " ".join(r["tags"]) + " " + r["section"]).lower() for w in words)]
    for r in hits[:25]:
        print(f"[{r['id']}] {r['text'][:200]}\n   check: {r['check'][:120]}  src: {r['source'][:60]}")
    print(f"-- {len(hits)} matches")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "query":
        query(sys.argv[2:])
    else:
        build()
