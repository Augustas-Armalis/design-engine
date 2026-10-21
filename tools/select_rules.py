#!/usr/bin/env python3
"""Select the rules that matter for one brief, so the build sees ~50 loud rules instead of 1,300 quiet ones.

usage: .venv/bin/python tools/select_rules.py --name acme-hero --type hero --brief "AI code review tool, start trial"
       [--kind hero-light] [--keep 30] [--per-slot 5] [--founder-cap 30]
types: hero | landing | pricing | funnel | section | app-ui | form
writes work/<name>/RULES.md and work/<name>/rules_shown.json.

Slate = (1) the founder canon page for the kind, knowledge/founder/canon/<kind>.md, inlined (if it is missing: only the
founder-taste.md rules whose "Applies to" matches the kind, capped); (2) 8 core craft rules (one per core query, no brief
terms); (3) --keep topical rules dealt round-robin across the type's slots. Rules from unrelated domains are filtered out
before scoring: other files under knowledge/founder/ (the canon replaces them), client-app process notes (Sellify, AI video
ads, avatars, approvals) unless the type is app-ui/form or the brief names them, logo/post/iso notes unless asked, career
and agency notes, and rules whose "Applies to" names only other surfaces (e.g. "SaaS app UI, forms" in a hero).
Design follows knowledge/ecosystem/self-improvement.md 2.2 (filter, slots, BM25 per slot with caps, dedupe, authority);
audit docs/PROCESS-AUDIT-2026-10-21.md 4.2 for why the founder folder is no longer dumped.
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


# type -> canon kind (knowledge/founder/canon/<kind>.md); hero picks light/dark from the brief
KIND_OF_TYPE = {"hero": None, "landing": "full-website", "pricing": "full-website", "funnel": "full-website",
                "section": "section-bento", "form": "product-ui", "app-ui": "product-ui"}
CANON_DIR = os.path.join(ROOT, "knowledge", "founder", "canon")

# files that belong to one domain; excluded unless the type or the brief opens that domain
DOMAIN_FILES = {
    "client": r"^web/(ai-video-ad-creator-flows|ad-intelligence-flows|approval-and-generation-ui)\.md$",
    "logo": r"^web/logo-",
    "post": r"^web/(x-design-posts|style-refs-x-)",
    "iso": r"^web/isometric-line-art",
    "career": r"^what-to-do-next/(career|freelance|presenting)",
}
TYPE_DOMAINS = {"hero": set(), "landing": {"iso"}, "pricing": set(), "funnel": set(), "section": {"iso"},
                "form": {"client"}, "app-ui": {"client"}}
BRIEF_DOMAINS = {"client": r"sellify|avatar|video ad|ad library|ad spy|approval", "logo": r"\blogo|\bmark\b|brand ?mark",
                 "post": r"\bpost\b|\bx post|social|tweet", "iso": r"\biso|isometric|bento"}

# "Applies to" tokens that are on-domain per type; a rule is kept if any token matches (or it names no surface)
UNIVERSAL = r"^(all\.?|all|web: all|web|every\b.*|all builds|all visual deliverables|copy|cards|larpo surfaces|larpo copy|design systems)$"
MARKETING = r"hero|landing|marketing|saas heroes|product heroes|product proof|brand|nav\b|cta|headline|subtitle|pricing|section"
TYPE_APPLIES = {
    "hero": MARKETING,
    "landing": MARKETING + r"|bento|footer|faq|testimonial|social proof|feature",
    "pricing": MARKETING + r"|checkout",
    "funnel": MARKETING + r"|forms?|checkout|funnel",
    "section": MARKETING + r"|bento|feature|cards",
    "form": r"forms?|saas app ui|app ui|checkout|mobile",
    "app-ui": r"saas app ui|app ui|dashboards?|forms?|tables?|dialogs?|product ui|component|mobile",
}
OFF_APPLIES = r"process|human-only|agency|native-only|sellify|marks|x captions|icon design|career|portfolio"

# founder-taste fallback (no canon page): "Applies to" include / exclude per kind
FOUNDER_FILTER = {
    "hero-light": (r"hero|landing|marketing|nav|cta|h1|subtitle|saas|new brand|product proof|product-led|signature|^all|all builds|every (brief|build|hero|new|revision|redesign|design delivery|delivery)|^delivery|revision|edit",
                   r"\bdark\b|bento|iso art|component posts|component showcases|brand marks|client app|existing app|overlay|dialogs|sidebars|showcase|pricing-tier|tab selectors|^saas app ui|^all saas app ui|^dashboards and product ui|product ui cards|grids, card rows|section visuals|section art|multi-page"),
    "hero-dark": (r"hero|landing|marketing|nav|cta|h1|subtitle|saas|new brand|product proof|product-led|signature|dark|^all|all builds|every (brief|build|hero|new|revision|redesign|design delivery|delivery)|^delivery|revision|edit",
                  r"light minimal|light saas|bento|iso art|component posts|component showcases|brand marks|client app|existing app|overlay|dialogs|sidebars|pricing-tier|tab selectors|^saas app ui|^all saas app ui|product ui cards|grids, card rows|section visuals|section art|multi-page"),
    "full-website": (r"hero|landing|marketing|nav|cta|section|bento|feature|multi-page|saas|new brand|^all|all builds|every|delivery|revision", r"brand marks|client app|existing app|component posts|iso art"),
    "section-bento": (r"bento|section|feature|card|visual|iso|^all|all builds|every (brief|build|design delivery|delivery|revision)|delivery|revision", r"brand marks|client app|existing app|hero h1|hero subtitle|nav"),
    "product-ui": (r"product ui|app|dashboard|sidebar|card|chip|dialog|overlay|popover|grid|modal|^all|all builds|every|delivery|revision", r"brand marks|hero h1|hero subtitle|hero ctas|marketing nav|component posts|iso art"),
}


def canon_kind(a):
    if a.kind:
        return a.kind
    k = KIND_OF_TYPE.get(a.type)
    if k:
        return k
    return "hero-dark" if re.search(r"\bdark\b", a.brief.lower()) else "hero-light"


def on_domain_applies(applies, typ):
    toks = [t.strip().rstrip(".").strip() for t in re.split(r"[|,;]| and ", (applies or "").lower()) if t.strip()]
    if not toks:
        return True
    for t in toks:
        if re.search(OFF_APPLIES, t):
            continue
        if re.match(UNIVERSAL, t) or re.search(TYPE_APPLIES[typ], t):
            return True
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--name", required=True)
    ap.add_argument("--type", default="hero", choices=sorted(SLOTS))
    ap.add_argument("--kind", default=None, help="canon kind (knowledge/founder/canon/<kind>.md); default from --type and the brief")
    ap.add_argument("--brief", default="")
    ap.add_argument("--keep", type=int, default=30, help="topical rules (core and founder are separate)")
    ap.add_argument("--per-slot", type=int, default=5)
    ap.add_argument("--founder-cap", type=int, default=30, help="founder-taste rules when no canon page exists")
    a = ap.parse_args()
    kind = canon_kind(a)
    brief_l = a.brief.lower()

    allr = [r for r in json.load(open(INDEX, encoding="utf-8")) if r.get("status", "") != "retired"]
    open_domains = set(TYPE_DOMAINS[a.type]) | {d for d, pat in BRIEF_DOMAINS.items() if re.search(pat, brief_l)}
    def keep(r):
        f = r["file"]
        if f.startswith("founder/"):
            return False  # founder knowledge comes from the canon page (or the filtered founder-taste fallback) below
        for d, pat in DOMAIN_FILES.items():
            if re.search(pat, f) and d not in open_domains:
                return False
        return on_domain_applies(r.get("applies", ""), a.type)
    rules = [r for r in allr if keep(r)]
    dropped = len(allr) - len(rules)
    texts = [tok(f"{r['text']} {r['why']} {' '.join(r['tags'])} {r['section']}") for r in rules]
    tagsets = [set(t.lower() for t in r["tags"]) for r in rules]
    bm = BM25(texts)
    brief_terms = tok(a.brief)
    picked = {}  # index -> (slot, score)

    def ranked(query, with_brief):
        q = tok(query) + (brief_terms[:12] if with_brief else [])
        out = []
        for i, r in enumerate(rules):
            s = bm.score(q, i)
            if s <= 0:
                continue
            s *= 2.0 if tagsets[i] & set(tok(query)) else 1.0  # tag boost
            s *= AUTH[tier(r)]
            out.append((s, i))
        out.sort(reverse=True)
        return out

    def fresh(i):
        return i not in picked and not any(jacc(texts[i], texts[j]) > 0.6 for j in picked)  # near-duplicate guard

    # core: hard craft + access + honesty, generic, so no brief terms (they pulled avatar and AI-wait rules into heroes)
    for q in CORE_QUERIES:
        for s, i in ranked(q, False):
            if fresh(i):
                picked[i] = ("core", s)
                break

    # topical: round-robin across the type's slots so every slot is represented, up to --keep
    queues = {q: ranked(q, True)[: a.per_slot * 4] for q in SLOTS[a.type]}
    counts = Counter()
    n_topical = 0
    while n_topical < a.keep and any(queues.values()):
        progressed = False
        for q in SLOTS[a.type]:
            if n_topical >= a.keep or counts[q] >= a.per_slot:
                continue
            while queues[q]:
                s, i = queues[q].pop(0)
                if fresh(i):
                    picked[i] = (q.split()[0], s)
                    counts[q] += 1
                    n_topical += 1
                    progressed = True
                    break
        if not progressed:
            break

    # founder: the canon page for the kind, else founder-taste rules that apply to the kind
    canon_path = os.path.join(CANON_DIR, f"{kind}.md")
    founder_lines, founder_ids, founder_src = [], [], None
    if os.path.exists(canon_path):
        founder_src = os.path.relpath(canon_path, ROOT)
        body = open(canon_path, encoding="utf-8").read().strip().splitlines()
        founder_lines = [("##" + l) if l.startswith("#") else l for l in body]  # demote headings under the slate
    else:
        inc, exc = FOUNDER_FILTER.get(kind, FOUNDER_FILTER["hero-light"])
        fr = [r for r in allr if r["file"] == "founder/founder-taste.md"
              and re.search(inc, (r.get("applies") or "").lower()) and not re.search(exc, (r.get("applies") or "").lower())]
        ft = BM25([tok(f"{r['text']} {r['why']} {r.get('applies', '')}") for r in fr]) if fr else None
        q = tok(" ".join(SLOTS[a.type])) + brief_terms
        best = sorted(((ft.score(q, i), i) for i in range(len(fr))), reverse=True)[: a.founder_cap] if fr else []
        founder_src = f"knowledge/founder/founder-taste.md (filtered to {kind}: {len(fr)} match, top {len(best)})"
        for s, i in sorted(best, key=lambda x: x[1]):
            r = fr[i]
            founder_ids.append(r["id"])
            why = f" ({r['why'][:140]})" if r["why"] else ""
            founder_lines.append(f"- **{r['id']}** [L] {r['text'][:260]}{why}")

    chosen = sorted(picked.items(), key=lambda kv: (kv[1][0] != "core", kv[1][0], -kv[1][1]))
    out_dir = os.path.join(ROOT, "work", a.name)
    os.makedirs(out_dir, exist_ok=True)
    lines = [f"# Rule slate: {a.name}", "", f"Brief: {a.brief or '(none given)'}  ",
             f"Page type: {a.type}; canon kind: {kind}. Generated {datetime.date.today()} from {len(rules)} on-domain rules ({dropped} off-domain or founder-folder rules filtered out of {len(allr)}).", "",
             "Founder canon first: it outranks every rule below. Rules are defaults: break one only with `override: <id> because <reason>` in DIRECTION.md.", "",
             f"## founder: {founder_src}", ""] + founder_lines
    cur = None
    for i, (slot, s) in chosen:
        r = rules[i]
        if slot != cur:
            lines += ["", f"## {slot}", ""]
            cur = slot
        why = f" ({r['why'][:140]})" if r["why"] else ""
        lines.append(f"- **{r['id']}** [{tier(r)}] {r['text'][:260]}{why}")
    open(os.path.join(out_dir, "RULES.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    json.dump({"name": a.name, "brief": a.brief, "type": a.type, "kind": kind, "founder": founder_src, "founderRules": founder_ids,
               "generated": datetime.datetime.now().isoformat(timespec="seconds"),
               "rules": [{"id": rules[i]["id"], "slot": slot, "score": round(s, 2), "tier": tier(rules[i])} for i, (slot, s) in chosen]},
              open(os.path.join(out_dir, "rules_shown.json"), "w"), indent=1)
    by = Counter(slot for _, (slot, _) in chosen)
    fdesc = f"canon {os.path.basename(canon_path)} inline" if os.path.exists(canon_path) else f"founder-taste:{len(founder_ids)}"
    print(f"{len(chosen) + len(founder_ids)} rules + {fdesc} -> work/{a.name}/RULES.md  ({', '.join(f'{k}:{v}' for k, v in by.items())})")


if __name__ == "__main__":
    main()
