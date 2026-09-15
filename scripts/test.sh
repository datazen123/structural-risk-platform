#!/usr/bin/env bash
# All automated tests for the reach client.
#   ./scripts/test.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== logic tests =="
node --test apps/game/test/logic.test.mjs

echo
echo "== payload budget (C1: 200 KB gz) =="
SP=$(mktemp -d)
python3 scripts/bundle-game.py "$SP" >/dev/null
SIZE=$(gzip -9 -c "$SP/rubble-run.html" | wc -c)
printf "   %.1f KB gz  (%.1f%% of budget)\n" "$(echo "$SIZE/1024" | bc -l)" "$(echo "$SIZE/2048" | bc -l)"
[ "$SIZE" -lt 204800 ] || { echo "   FAIL: over 200 KB"; exit 1; }

echo
echo "== layout invariants =="
python3 - <<'PYCHK'
import re, sys
css = open('apps/game/index.html').read()
css = css[css.index('<style>'):css.index('</style>')]
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)        # comments are not rules
hits = [l.strip() for l in css.splitlines() if 'position:fixed' in l]
if hits:
    print('   FAIL: position:fixed inside an iOS iframe anchors to the document,')
    print('         not the viewport, so bottom-anchored controls go off-screen.')
    for h in hits: print('        ', h)
    sys.exit(1)
print('   ok: no position:fixed in any rule')
PYCHK

echo
echo "== browser tests =="
echo "   apps/game/test/dom.test.js runs in a real browser against a mobile"
echo "   viewport; see apps/game/test/README.md. Not runnable headless here."
echo
echo "All runnable checks passed."
