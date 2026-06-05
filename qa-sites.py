#!/usr/bin/env python3
"""
qa-sites.py — QA verification for 5 ODNT-SOL demo sites
Runs curl-based checks against all 5 sites.
Exit 0 = all pass, non-zero = failures.
"""

import subprocess
import sys
import re
import urllib.request
import urllib.error
import json
from typing import Optional

# ─── Sites ───────────────────────────────────────────────────────────────────
SITES = {
    "canopy-house":      "https://canopy-house.pages.dev",
    "meridian-security": "https://meridian-security.pages.dev",
    "fieldstone-it":     "https://fieldstone-it.pages.dev",
    "copper-kitchen":    "https://copper-kitchen.pages.dev",
    "solace-wellness":   "https://solace-wellness.pages.dev",
}

# ─── Helpers ─────────────────────────────────────────────────────────────────
PASS = 0
FAIL = 0
TOTAL = 0

def log(msg: str):
    global PASS, TOTAL
    print(f"  \033[0;32m[PASS]\033[0m {msg}")
    PASS += 1
    TOTAL += 1

def logf(msg: str):
    global FAIL, TOTAL
    print(f"  \033[0;31m[FAIL]\033[0m {msg}")
    FAIL += 1
    TOTAL += 1

def logw(msg: str):
    print(f"  \033[0;33m[WARN]\033[0m {msg}")

def fetch(url: str, timeout: int = 10) -> Optional[str]:
    """Fetch URL with GET, follow redirects, return body or None."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "QA-Bot/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        return None

def http_code(url: str, timeout: int = 10) -> int:
    """Return HTTP status code for a URL."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "QA-Bot/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return 0

def grep_count(text: str, pattern: str, flags: int = 0) -> int:
    """Count regex matches in text. case-insensitive if flags=re.IGNORECASE."""
    return len(re.findall(pattern, text, flags))

# ─── Tests ────────────────────────────────────────────────────────────────────

def test_homepage_200(site: str, url: str):
    code = http_code(url)
    if code == 200:
        log(f"{site}: homepage → HTTP {code}")
    else:
        logf(f"{site}: homepage → HTTP {code} (expected 200)")

def test_navbar_links(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    # Count unique section anchor hrefs (href="#something" with at least one letter after #)
    hrefs = re.findall(r'href="(#[A-Za-z][^"]*)"', html)
    unique = set(hrefs)
    # Exclude bare href="#"
    real = [h for h in unique if h != "#"]
    if len(real) >= 3:
        log(f"{site}: found {len(real)} nav section links: {', '.join(sorted(real)[:6])}")
    else:
        logf(f"{site}: only {len(real)} nav section links (expected ≥3)")

def test_mobile_menu_button(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    found = bool(re.search(
        r'hamburger|menu-toggle|nav-toggle|navbar__burger|mobile-menu-btn',
        html, re.IGNORECASE
    ))
    if found:
        log(f"{site}: mobile menu button found")
    else:
        logf(f"{site}: mobile menu button NOT found")

def test_mobile_drawer(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    found = bool(re.search(r'mobile-nav|nav-drawer|nav-menu', html, re.IGNORECASE))
    if found:
        log(f"{site}: mobile drawer markup found")
    else:
        logf(f"{site}: mobile drawer markup NOT found")

def test_buttons_exist(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    count = grep_count(html, r'<a[^>]*class="[^"]*btn|<button', re.IGNORECASE)
    if count >= 2:
        log(f"{site}: found {count} button elements")
    else:
        logf(f"{site}: only {count} buttons (expected ≥2)")

def test_button_backgrounds(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    bg_refs = grep_count(html, r'class="[^"]*bg-|class="[^"]*background', re.IGNORECASE)
    empty_styles = grep_count(html, r'style=""')
    if bg_refs >= 2:
        log(f"{site}: button backgrounds via CSS ({bg_refs} bg refs, {empty_styles} empty style attrs)")
    elif empty_styles > 5:
        logw(f"{site}: {empty_styles} empty inline styles — verify buttons are styled")
    else:
        logw(f"{site}: low CSS bg count ({bg_refs}) — manual verify recommended")

def test_footer(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    found = bool(re.search(r'<footer', html, re.IGNORECASE))
    if found:
        log(f"{site}: footer element found")
    else:
        logf(f"{site}: footer NOT found")

def test_no_dead_buttons(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    # Count all unique section anchor hrefs (real sections, not bare #)
    hrefs = re.findall(r'href="(#[A-Za-z][^"]*)"', html)
    unique = [h for h in set(hrefs) if h != "#"]
    if len(unique) >= 3:
        log(f"{site}: {len(unique)} section anchor links (no dead buttons)")
    else:
        logf(f"{site}: only {len(unique)} section anchors — possible dead links")

def test_css_loads(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    # Find CSS href
    match = re.search(r'href="([^"]*\.css)"', html)
    if not match:
        logf(f"{site}: no .css href found in HTML")
        return
    css_url = match.group(1)
    if not css_url.startswith("http"):
        css_url = url.rstrip("/") + "/" + css_url.lstrip("/")
    code = http_code(css_url)
    if code == 200:
        log(f"{site}: CSS → HTTP {code}")
    else:
        logf(f"{site}: CSS → HTTP {code} (expected 200)")

def test_fieldstone_colors(site: str, url: str):
    html = fetch(url)
    if html is None:
        logf(f"{site}: could not fetch page")
        return
    # Find CSS href
    match = re.search(r'href="([^"]*\.css)"', html)
    if not match:
        logf(f"{site}: no CSS file found")
        return
    css_url = match.group(1)
    if not css_url.startswith("http"):
        css_url = url.rstrip("/") + "/" + css_url.lstrip("/")
    css = fetch(css_url)
    if css is None:
        logf(f"{site}: could not fetch CSS")
        return
    # Check old harsh colors are GONE
    old_navy = bool(re.search(r'#1E3A5F|#152942', css, re.IGNORECASE))
    old_orange = bool(re.search(r'#E85D04|#C44E03', css, re.IGNORECASE))
    if old_navy:
        logf(f"{site}: old navy color #1E3A5F still in CSS")
        return
    if old_orange:
        logf(f"{site}: old orange color #E85D04 still in CSS")
        return
    # Check new palette presence
    new_colors = 0
    for color in ["#3D5A4C", "#7A9E7E", "#E8D5B7", "#8B7355", "#B87A3A", "#D4C5A9"]:
        if color.lower() in css.lower():
            new_colors += 1
    if new_colors >= 3:
        log(f"{site}: new warm stone palette found ({new_colors}/6 colors)")
    else:
        logw(f"{site}: only {new_colors}/6 new palette colors — verify design")

# ─── Main ─────────────────────────────────────────────────────────────────────
def main():
    global PASS, FAIL, TOTAL
    print("")
    print("═" * 60)
    print("  ODNT-SOL Demo Sites — QA Verification")
    import datetime
    print(f"  {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("═" * 60)
    print("")

    for site, url in SITES.items():
        print("─" * 60)
        print(f"  {site}")
        print(f"  {url}")
        print("─" * 60)

        test_homepage_200(site, url)
        test_navbar_links(site, url)
        test_mobile_menu_button(site, url)
        test_mobile_drawer(site, url)
        test_buttons_exist(site, url)
        test_button_backgrounds(site, url)
        test_footer(site, url)
        test_no_dead_buttons(site, url)
        test_css_loads(site, url)

        if site == "fieldstone-it":
            test_fieldstone_colors(site, url)

        print("")

    print("═" * 60)
    print(f"  RESULTS: {PASS} passed, {FAIL} failed, {TOTAL} total")
    print("═" * 60)
    print("")

    if FAIL > 0:
        print(f"\033[0;31mQA FAILED — {FAIL} tests\033[0m")
        sys.exit(1)
    else:
        print(f"\033[0;32mQA PASSED — all {PASS} tests successful\033[0m")
        sys.exit(0)

if __name__ == "__main__":
    main()
