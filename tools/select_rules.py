#!/usr/bin/env python3
"""Select the rules that matter for one brief, so the build sees ~50 loud rules instead of 1,300 quiet ones.

usage: .venv/bin/python tools/select_rules.py --name acme-hero --type hero --brief "AI code review tool, start trial" [--keep 60]
types: hero | landing | pricing | funnel | section | app-ui | form
writes work/<name>/RULES.md and work/<name>/rules_shown.json. Claude then trims the slate to the 20-50 that apply.
Design follows knowledge/ecosystem/self-improvement.md 2.2: filter, slots, BM25 per slot with caps, core rules, dedupe, rank by authority.
"""
import argparse, datetime, json, math, os, re
from collections import Counter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
INDEX = os.path.join(ROOT, "system", "rules", "index.json")

# page type -> topic slots (each slot is a small query)
SLOTS = {
    "hero": ["hero headline size hierarchy", "typography type scale line-height tracking", "cta button primary action",
             "navigation header nav", "spacing whitespace rhythm proximity", "color contrast palette accent",
             "product proof screenshot interface", "motion animation entrance easing", "copy headline microcopy", "mobile responsive"],
    "landing": ["hero headline", "section sequence landing page anatomy", "social proof testimonial logos", "features benefits cards",
                "pricing tiers", "faq footer final cta", "typography type scale", "spacing section padding rhythm",
                "color contrast surfaces", "motion scroll animation", "copy headline cta", "mobile responsive layout grid"],
    "pricing": ["pricing tiers plans anchor", "table comparison", "toggle billing monthly annual", "cta button", "faq",
                "typography numbers tabular", "spacing cards", "color contrast", "copy microcopy", "mobile responsive"],
    "funnel": ["form fields labels validation error", "cta button", "trust security proof", "countdown urgency", "thank you confirmation",
               "typography", "spacing", "color contrast", "copy microcopy", "mobile responsive"],
    "form": ["form fields labels placeholder", "validation error messages", "input height focus states", "buttons primary secondary",
             "spacing grouping proximity", "accessibility keyboard", "copy microcopy", "mobile touch target"],
    "section": ["layout grid alignment", "typography hierarchy", "spacing whitespace", "cards", "color contrast", "motion", "copy", "mobile responsive"],
    "app-ui": ["dashboard data density", "table rows columns", "forms inputs states", "navigation sidebar tabs", "empty loading error states",
               "buttons variants sizes", "typography ui text", "spacing grid", "color semantic states", "dialog modal menu", "accessibility keyboard focus"],
}
# always-on core: hard craft + access + honesty
CORE_QUERIES = ["contrast ratio text", "focus visible outline keyboard", "touch target size", "body text size minimum",
                "line length characters", "heading hierarchy single h1", "reduced motion", "invent fake testimonial proof logos"]

TIER_BY_PATH = [
    (r"web-sources/(a11y|webdev-learn-accessibility|apple-hig|material3|govuk|nngroup|chrome-css|webdev)", "T1"),
    (r"web/(implementation-craft|measurable-assertions|teardown|design-systems|tokens-)", "T1"),
    (r"systems-research/", "T1"),
]


def tier(r):
    if r.get("kind") == "engine":
        return "T4"
    if r.get("kind") == "opinion":
        return "T3"
    if "[founder]" in (r["text"] + r["why"]):
        return "L"
    for pat, t in TIER_BY_PATH:
        if re.search(pat, r["file"]):
            return t
    return "T2"


AUTH = {"L": 1.35, "T1": 1.25, "T2": 1.0, "T3": 0.7, "T4": 0.6}
tok = lambda s: re.findall(r"[a-z0-9]+", s.lower())


class BM25:
    def __init__(self, docs, k1=1.4, b=0.75):
        self.docs = [Counter(d) for d in docs]
        self.len = [sum(d.values()) for d in self.docs]
        self.avg = sum(self.len) / max(1, len(self.len))
        df = Counter(t for d in self.docs for t in d)
        n = len(self.docs)
        self.idf = {t: math.log(1 + (n - c + 0.5) / (c + 0.5)) for t, c in df.items()}
        self.k1, self.b = k1, b

    def score(self, q, i):
        d, L, s = self.docs[i], self.len[i], 0.0
        for t in q:
            if t in d:
                f = d[t]
                s += self.idf.get(t, 0) * f * (self.k1 + 1) / (f + self.k1 * (1 - self.b + self.b * L / self.avg))
        return s


def jacc(a, b):
    a, b = set(a), set(b)
    return len(a & b) / max(1, len(a | b))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--name", required=True)
    ap.add_argument("--type", default="hero", choices=sorted(SLOTS))
    ap.add_argument("--brief", default="")
    ap.add_argument("--keep", type=int, default=60)
    ap.add_argument("--per-slot", type=int, default=5)
    a = ap.parse_args()

    rules = [r for r in json.load(open(INDEX, encoding="utf-8")) if r.get("status", "") != "retired"]
    texts = [tok(f"{r['text']} {r['why']} {' '.join(r['tags'])} {r['section']}") for r in rules]
    tagsets = [set(t.lower() for t in r["tags"]) for r in rules]
    bm = BM25(texts)
    brief_terms = tok(a.brief)

    picked = {}  # index -> (slot, score)

    def take(query, slot, cap):
        q = tok(query) + brief_terms[:12]
        scored = []
        for i, r in enumerate(rules):
            s = bm.score(q, i)
            if s <= 0:
                continue
            s *= 2.0 if tagsets[i] & set(tok(query)) else 1.0  # tag boost
            s *= AUTH[tier(r)]
            scored.append((s, i))
        scored.sort(reverse=True)
        n = 0
        for s, i in scored:
            if n >= cap:
                break
            if i in picked:
                continue
            if any(jacc(texts[i], texts[j]) > 0.6 for j in picked):  # near-duplicate of something already shown
                continue
            picked[i] = (slot, s)
            n += 1

    for q in CORE_QUERIES:
        take(q, "core", 2)
    for q in SLOTS[a.type]:
        take(q, q.split()[0], a.per_slot)

    # founder verdicts (L tier) are the cheapest proven value: include the best-matching ones, capped
    q_all = tok(" ".join(SLOTS[a.type])) + brief_terms
    founder = sorted(((bm.score(q_all, i), i) for i, r in enumerate(rules) if tier(r) == "L" and i not in picked), reverse=True)
    for s, i in founder[:10]:
        if s > 0:
            picked[i] = ("founder", s)

    order = {"core": 0, "founder": 1}
    ranked = sorted(picked.items(), key=lambda kv: (order.get(kv[1][0], 2), -kv[1][1]))
    fixed = [kv for kv in ranked if kv[1][0] in order]
    chosen = fixed + [kv for kv in ranked if kv[1][0] not in order][: max(0, a.keep - len(fixed))]
    chosen = sorted(chosen, key=lambda kv: (order.get(kv[1][0], 2), kv[1][0], -kv[1][1]))
    out_dir = os.path.join(ROOT, "work", a.name)
    os.makedirs(out_dir, exist_ok=True)
    lines = [f"# Rule slate: {a.name}", "", f"Brief: {a.brief or '(none given)'}  ", f"Page type: {a.type}. Generated {datetime.date.today()} from {len(rules)} indexed rules.", "",
             "Trim this to the 20-50 rules that apply. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.", ""]
    cur = None
    for i, (slot, s) in chosen:
        r = rules[i]
        if slot != cur:
            lines += ["", f"## {slot}", ""]
            cur = slot
        why = f" ({r['why'][:140]})" if r["why"] else ""
        lines.append(f"- **{r['id']}** [{tier(r)}] {r['text'][:260]}{why}")
    open(os.path.join(out_dir, "RULES.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    json.dump({"name": a.name, "brief": a.brief, "type": a.type, "generated": datetime.datetime.now().isoformat(timespec="seconds"),
               "rules": [{"id": rules[i]["id"], "slot": slot, "score": round(s, 2), "tier": tier(rules[i])} for i, (slot, s) in chosen]},
              open(os.path.join(out_dir, "rules_shown.json"), "w"), indent=1)
    by = Counter(slot for _, (slot, _) in chosen)
    print(f"{len(chosen)} rules -> work/{a.name}/RULES.md  ({', '.join(f'{k}:{v}' for k, v in by.items())})")


if __name__ == "__main__":
    main()
