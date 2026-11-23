"""Load MoneyPuck team expected-goals data into the NHL (beta) model. Run from src/:
    python3 nhl_moneypuck.py pasted.txt [YYYY-MM-DD]
pasted.txt is MoneyPuck's team table (moneypuck.com/data, "teams" for the current season), tab- or
comma-separated with its header row, one row per team per situation (all, 5on5, 5on4, 4on5, other).
Writes NHL_XG in model2.js and sets the NHL xgDate (default today), then rebuilds the site.
Row: [abbr, gp, evSec, evXGF, evXGA, ppSec, ppXGF, ppXGA, pkSec, pkXGF, pkXGA, goalsFor, goalsAgainst]
xG is MoneyPuck's flurry- and score/venue-adjusted expected goals; times are total seconds.
"""
import csv, sys, re, json, datetime, subprocess

src = open(sys.argv[1], encoding='utf-8-sig').read()
delim = '\t' if src.split('\n', 1)[0].count('\t') > 5 else ','
rows = list(csv.reader(src.strip().splitlines(), delimiter=delim))
h = rows[0]
col = lambda k: h.index(k)
CODE = {'LAK': 'LA', 'NJD': 'NJ', 'SJS': 'SJ', 'TBL': 'TB', 'L.A': 'LA', 'N.J': 'NJ', 'S.J': 'SJ', 'T.B': 'TB'}
xf = 'flurryScoreVenueAdjustedxGoalsFor' if 'flurryScoreVenueAdjustedxGoalsFor' in h else 'xGoalsFor'
xa = 'flurryScoreVenueAdjustedxGoalsAgainst' if 'flurryScoreVenueAdjustedxGoalsAgainst' in h else 'xGoalsAgainst'
by = {}
for r in rows[1:]:
    if len(r) < len(h) - 1: continue
    t = CODE.get(r[0], r[0]); s = r[col('situation')]
    by.setdefault(t, {})[s] = r
out = []
for t, S in sorted(by.items()):
    for need in ('all', '5on5', '5on4', '4on5'): assert need in S, (t, need)
    f = lambda s, k: float(S[s][col(k)])
    out.append([t, int(f('all', 'games_played')),
                f('5on5', 'iceTime'), round(f('5on5', xf), 2), round(f('5on5', xa), 2),
                f('5on4', 'iceTime'), round(f('5on4', xf), 2), round(f('5on4', xa), 2),
                f('4on5', 'iceTime'), round(f('4on5', xf), 2), round(f('4on5', xa), 2),
                int(f('all', 'goalsFor')), int(f('all', 'goalsAgainst'))])
assert len(out) == 32, 'expected 32 teams, got %d' % len(out)
m = open('model2.js').read()
known = set(re.findall(r'\["([A-Z]{2,3})"', m[m.index('const NHL_TEAMS'):m.index('];', m.index('const NHL_TEAMS'))]))
assert {r[0] for r in out} == known, ({r[0] for r in out} ^ known)
block = 'const NHL_XG = [\n' + ''.join('  ' + json.dumps(r) + ',\n' for r in out) + '];'
if 'const NHL_XG = [' in m: m = re.sub(r'const NHL_XG = \[.*?\n\];', lambda _: block, m, count=1, flags=re.S)
else: raise SystemExit('NHL_XG block missing in model2.js')
d = sys.argv[2] if len(sys.argv) > 2 else datetime.date.today().isoformat()
m = re.sub(r'(nhl: \{ key:"nhl",[^\n]*?xgDate:")[^"]*"', lambda x: x.group(1) + d + '"', m, count=1)
open('model2.js', 'w').write(m)
subprocess.run(['python3', 'build.py'], check=True)
subprocess.run(['node', '--check', 'chk.js'], check=True)
subprocess.run(['python3', 'make_site.py'], check=True)
print('loaded MoneyPuck xG for', len(out), 'teams, through', d)
