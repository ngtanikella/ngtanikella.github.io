#!/usr/bin/env python3
"""
fetch_scholar.py
================
Pulls Google Scholar stats for a single author profile and writes them to
_data/scholar.yml so the Jekyll site can display them.

Runs in GitHub Actions on a schedule. Google Scholar blocks bots aggressively,
so this script is designed to FAIL GRACEFULLY: if the fetch doesn't work,
we preserve the previous numbers and just log the failed attempt. The page
will never show blank/zero stats because of a temporary Scholar block.

Behavior:
  1. Load existing _data/scholar.yml (if any) as the fallback.
  2. Try fetching directly (GitHub Actions IPs sometimes work).
  3. If that fails, retry behind free proxies (FreeProxies from scholarly).
  4. On success, overwrite the numbers and bump `last_updated`.
  5. On failure, keep the numbers and just bump `last_attempt`.

Env vars:
  SCHOLAR_ID  — the `user=` value from your Scholar profile URL.
                Defaults to ZwY-zMgAAAAJ (Nagendra Tanikella).
  OUT_PATH    — output YAML path. Defaults to _data/scholar.yml.
"""
import os
import sys
import datetime as dt
from pathlib import Path

import yaml
from scholarly import scholarly, ProxyGenerator


SCHOLAR_ID = os.environ.get("SCHOLAR_ID", "ZwY-zMgAAAAJ")
OUT_PATH = Path(os.environ.get("OUT_PATH", "_data/scholar.yml"))


def load_existing() -> dict:
    """Read the existing YAML so we can preserve it on failure."""
    if OUT_PATH.exists():
        try:
            with OUT_PATH.open() as f:
                return yaml.safe_load(f) or {}
        except Exception as exc:
            print(f"Could not parse existing {OUT_PATH}: {exc}", file=sys.stderr)
    return {}


def try_free_proxy() -> bool:
    """Activate free proxies in scholarly. Returns True if one was found."""
    try:
        pg = ProxyGenerator()
        ok = pg.FreeProxies()
        if ok:
            scholarly.use_proxy(pg)
            print("Using a FreeProxies proxy.", file=sys.stderr)
            return True
        print("FreeProxies returned no usable proxy.", file=sys.stderr)
    except Exception as exc:
        print(f"Proxy setup error: {exc}", file=sys.stderr)
    return False


def fetch_stats() -> dict:
    """Fetch the author record and extract the numbers we care about."""
    author = scholarly.search_author_id(SCHOLAR_ID)
    # `basics` = name/affiliation, `indices` = h / i10, `counts` = citedby totals,
    # `publications` = list we only use for `len()` to get the pub count.
    author = scholarly.fill(
        author, sections=["basics", "indices", "counts", "publications"]
    )

    def as_int(v):
        try:
            return int(v)
        except (TypeError, ValueError):
            return 0

    return {
        "citations":    as_int(author.get("citedby")),
        "citations_5y": as_int(author.get("citedby5y")),
        "h_index":      as_int(author.get("hindex")),
        "h_index_5y":   as_int(author.get("hindex5y")),
        "i10_index":    as_int(author.get("i10index")),
        "i10_index_5y": as_int(author.get("i10index5y")),
        "publications": len(author.get("publications") or []),
    }


def main() -> int:
    data = load_existing()
    data["scholar_id"] = SCHOLAR_ID

    stats = None
    # Two attempts: direct, then via a free proxy.
    for attempt_num, use_proxy in enumerate([False, True], start=1):
        try:
            if use_proxy and not try_free_proxy():
                continue
            print(f"Attempt {attempt_num} (proxy={use_proxy})...", file=sys.stderr)
            stats = fetch_stats()
            break
        except Exception as exc:
            print(f"Attempt {attempt_num} failed: {exc}", file=sys.stderr)

    today = dt.datetime.utcnow().strftime("%Y-%m-%d")
    if stats is None:
        print("All fetch attempts failed; keeping previous numbers.", file=sys.stderr)
        data["last_attempt"] = today
        data["last_attempt_status"] = "failed"
    else:
        data.update(stats)
        data["last_updated"] = today
        data["last_attempt"] = today
        data["last_attempt_status"] = "ok"
        print(f"Fetched stats: {stats}", file=sys.stderr)

    # Stable field order in the YAML file (nicer diffs).
    order = [
        "scholar_id", "citations", "citations_5y",
        "h_index", "h_index_5y", "i10_index", "i10_index_5y",
        "publications", "last_updated", "last_attempt", "last_attempt_status",
    ]
    ordered = {k: data[k] for k in order if k in data}
    for k, v in data.items():
        if k not in ordered:
            ordered[k] = v

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PATH.open("w") as f:
        yaml.safe_dump(ordered, f, sort_keys=False, default_flow_style=False)
    print(f"Wrote {OUT_PATH}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
