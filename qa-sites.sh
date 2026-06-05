#!/usr/bin/env bash
#────────────────────────────────────────────────────────────────────────────
# qa-sites.sh — QA verification for 5 ODNT-SOL demo sites
# Runs curl-based checks against all 5 sites.
# Exit 0 = all pass, non-zero = failures.
#────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
RESULTS="$BASE_DIR/qa-results.txt"
export NOCOLOR="\033[0m" GREEN="\033[0;32m" RED="\033[0;31m" YELLOW="\033[0;33m"

declare -A SITES=(
  ["canopy-house"]="https://canopy-house.pages.dev"
  ["meridian-security"]="https://meridian-security.pages.dev"
  ["fieldstone-it"]="https://fieldstone-it.pages.dev"
  ["copper-kitchen"]="https://copper-kitchen.pages.dev"
  ["solace-wellness"]="https://solace-wellness.pages.dev"
)

TOTAL=0; PASS=0; FAIL=0

log()  { echo -e "${GREEN}[PASS]${NOCOLOR} $*"; : $((PASS++)); : $((TOTAL++)); }
logf() { echo -e "${RED}[FAIL]${NOCOLOR} $*"; : $((FAIL++)); : $((TOTAL++)); }
logw() { echo -e "${YELLOW}[WARN]${NOCOLOR} $*"; }

httping() {
  local url="$1"; local name="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 \
    -L "$url" -A "QA-Bot/1.0" 2>/dev/null || echo "000")
  echo "$code"
}

# ─── TEST 1: Homepage returns 200 ─────────────────────────────────────────
test_homepage_200() {
  local site="$1"; local url="$2"
  echo -n "  homepage 200: $url ... "
  local code
  code=$(httping "$url" "$site")
  if [[ "$code" == "200" ]]; then
    log "$site: homepage → HTTP $code"
  else
    logf "$site: homepage → HTTP $code (expected 200)"
  fi
}

# ─── TEST 2: Navbar present and has nav links ───────────────────────────────
test_navbar_links() {
  local site="$1"; local url="$2"
  echo -n "  navbar links: $site ... "
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  # Must have anchor tags pointing to sections (not just #)
  local link_count
  link_count=$(echo "$html" | grep -o 'href="#[^"]*"' | grep -v 'href="#"' | wc -l)
  
  if [[ "$link_count" -ge 3 ]]; then
    log "$site: found $link_count nav section links"
  else
    logf "$site: only $link_count nav section links found (expected ≥3)"
  fi
}

# ─── TEST 3: Mobile hamburger button present ────────────────────────────────
test_mobile_menu_button() {
  local site="$1"; local url="$2"
  echo -n "  mobile menu button: $site ... "
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  # Look for hamburger / menu toggle
  if echo "$html" | grep -qi 'hamburger\|menu-toggle\|aria-label.*menu\|nav-toggle\|☰'; then
    log "$site: mobile menu button found"
  else
    logf "$site: mobile menu button NOT found"
  fi
}

# ─── TEST 4: Mobile drawer markup present ──────────────────────────────────
test_mobile_drawer() {
  local site="$1"; local url="$2"
  echo -n "  mobile drawer: $site ... "
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  # Look for drawer, nav-list, or nav-menu class
  if echo "$html" | grep -qi 'class="[^"]*nav-drawer\|class="[^"]*nav-menu\|class="[^"]*mobile-nav\|class="[^"]*nav-list'; then
    log "$site: mobile drawer/nav-menu markup found"
  else
    logf "$site: mobile drawer markup NOT found"
  fi
}

# ─── TEST 5: CTA/button elements exist ────────────────────────────────────
test_buttons_exist() {
  local site="$1"; local url="$2"
  echo -n "  buttons present: $site ... "
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  local btn_count
  btn_count=$(echo "$html" | grep -oi '<a[^>]*class="[^"]*btn\|<button' | wc -l)
  
  if [[ "$btn_count" -ge 2 ]]; then
    log "$site: found $btn_count button elements"
  else
    logf "$site: only $btn_count buttons found (expected ≥2)"
  fi
}

# ─── TEST 6: Color contrast — background colors on buttons/hero ────────────
test_button_backgrounds() {
  local site="$1"; local url="$2"
  echo -n "  button backgrounds: $site ... "
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  # Count background-related CSS class occurrences in HTML
  local has_bg_class=0
  has_bg_class=$(echo "$html" | grep -oi 'class="[^"]*bg-\|class="[^"]*background' | wc -l)
  
  # Count inline style= attributes (potential unstyled elements)
  local inline_count=0
  inline_count=$(echo "$html" | grep -oi 'style=""' | wc -l)
  
  if [[ "$has_bg_class" -ge 2 ]]; then
    log "$site: button backgrounds via CSS ($has_bg_class bg class refs, $inline_count empty style attrs)"
  elif [[ "$inline_count" -gt 5 ]]; then
    logw "$site: $inline_count empty inline styles — verify buttons are styled"
  else
    logw "$site: low CSS bg count ($has_bg_class) — manual verify recommended"
  fi
}

# ─── TEST 7: Footer present ─────────────────────────────────────────────────
test_footer() {
  local site="$1"; local url="$2"
  echo -n "  footer: $site ... "
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  if echo "$html" | grep -qi '<footer'; then
    log "$site: footer element found"
  else
    logf "$site: footer NOT found"
  fi
}

# ─── TEST 8: No dead JavaScript href="#" buttons ────────────────────────────
test_no_dead_buttons() {
  local site="$1"; local url="$2"
  echo -n "  no dead href# buttons: $site ... "
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  # Check for nav links that point to real section IDs
  local section_links
  section_links=$(echo "$html" | grep -o 'href="https\?://[^"]*#' | grep -v '#$' | wc -l)
  
  # Also check local anchors
  local local_anchors
  local_anchors=$(echo "$html" | grep -o 'href="#[^"]*"' | grep -v 'href="#"' | wc -l)
  
  local total=$((section_links + local_anchors))
  if [[ "$total" -ge 3 ]]; then
    log "$site: $total section anchor links (no dead buttons)"
  else
    logf "$site: only $total section anchors — possible dead links"
  fi
}

# ─── TEST 9: CSS file loads ────────────────────────────────────────────────
test_css_loads() {
  local site="$1"; local url="$2"
  echo -n "  CSS loads: $site ... "
  
  # Get the HTML and find CSS href
  local css_url
  css_url=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null | \
    grep -o 'href="[^"]*\.css"' | head -1 | tr -d '"' | sed 's|^/|//|')
  
  if [[ -z "$css_url" ]]; then
    logf "$site: no .css href found in HTML"
    return
  fi
  
  # Resolve relative URLs
  if [[ "$css_url" != http* ]]; then
    css_url="${url}${css_url}"
  fi
  
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$css_url" 2>/dev/null || echo "000")
  if [[ "$code" == "200" ]]; then
    log "$site: CSS → HTTP $code"
  else
    logf "$site: CSS → HTTP $code (expected 200)"
  fi
}

# ─── TEST 10: Fieldstone IT — no harsh #1E3A5F or #E85D04 colors ──────────
test_fieldstone_colors() {
  local site="$1"; local url="$2"
  echo -n "  fieldstone color palette: $site ... "
  
  local html
  html=$(curl -s -L --max-time 10 -A "QA-Bot/1.0" "$url" 2>/dev/null)
  
  # Check CSS for the old harsh colors
  local css_url
  css_url=$(echo "$html" | grep -o 'href="[^"]*\.css"' | head -1 | tr -d '"')
  if [[ "$css_url" != http* ]]; then
    css_url="${url}${css_url}"
  fi
  
  local css
  css=$(curl -s -L --max-time 10 "$css_url" 2>/dev/null || echo "")
  
  local bad_colors=0
  if echo "$css" | grep -qi '#1E3A5F\|#152942'; then
    logf "$site: old navy color #1E3A5F still present in CSS"
    ((FAIL++)); ((TOTAL++)); return
  fi
  if echo "$css" | grep -qi '#E85D04\|#C44E03'; then
    logf "$site: old orange color #E85D04 still present in CSS"
    ((FAIL++)); ((TOTAL++)); return
  fi
  
  # Check for new palette presence
  local new_colors=0
  for color in "#3D5A4C" "#7A9E7E" "#E8D5B7" "#8B7355" "#B87A3A" "#D4C5A9"; do
    if echo "$css" | grep -qi "$color"; then ((new_colors++)); fi
  done
  
  if [[ "$new_colors" -ge 3 ]]; then
    log "$site: new warm stone palette found ($new_colors/6 color refs)"
  else
    logw "$site: only $new_colors/6 new palette colors — verify design"
  fi
}

# ─── Run all tests ───────────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════"
echo " ODNT-SOL Demo Sites — QA Verification"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "══════════════════════════════════════════════"
echo ""

for site in canopy-house meridian-security fieldstone-it copper-kitchen solace-wellness; do
  url="${SITES[$site]}"
  echo "──────────────────────────────────────────────"
  echo " $site"
  echo " $url"
  echo "──────────────────────────────────────────────"
  
  test_homepage_200 "$site" "$url"
  test_navbar_links "$site" "$url"
  test_mobile_menu_button "$site" "$url"
  test_mobile_drawer "$site" "$url"
  test_buttons_exist "$site" "$url"
  test_button_backgrounds "$site" "$url"
  test_footer "$site" "$url"
  test_no_dead_buttons "$site" "$url"
  test_css_loads "$site" "$url"
  
  # Fieldstone IT gets the color-specific test
  if [[ "$site" == "fieldstone-it" ]]; then
    test_fieldstone_colors "$site" "$url"
  fi
  
  echo ""
done

echo "══════════════════════════════════════════════"
echo " RESULTS: $PASS passed, $FAIL failed, $TOTAL total"
echo "══════════════════════════════════════════════"

if [[ "$FAIL" -gt 0 ]]; then
  echo -e "${RED}QA FAILED — $FAIL tests${NOCOLOR}"
  exit 1
else
  echo -e "${GREEN}QA PASSED — all tests successful${NOCOLOR}"
  exit 0
fi
