"""Record final scores and grade picks for every league, without touching slates or lines.

  python3 results.py --pending        # list ungraded picks whose game should have started, with team names to look up
  python3 results.py finals.json      # record finals, grade picks, rebuild the site, print the record

finals.json (any league may be left out):
  {"nfl": {"BUF|NYJ": [27, 13]},                      # NFL: team abbreviations as on the NFL tab (LA = Rams, JAX = Jaguars)
   "cfb": {"Western Michigan|Akron": [42, 14]},       # CFB: names exactly as in cfb_data.json
   "nba": {"MIA|UTA": [118, 104]},                    # NBA: abbreviations as in NBA_ROWS
   "cbb": {"Hofstra|Arizona State": [64, 85]}}        # CBB: names exactly as in cbb_data.json
Keys are "away|home" in the same order the game is listed on the board, values [awayPts, homePts].
Only finished games. A pick is graded only when its date is within 4 days of the final being recorded,
so an old matchup can't grade a rematch.
"""
import json, re, sys, subprocess, datetime, os

HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)
A = open('app_script.js').read()
M = open('model2.js').read()
PL = re.search(r'const PICK_LOG = (\[.*?\]);?\n', A)
P = json.loads(PL.group(1))
FM = re.search(r'const FINALS=(\{.*?\});', A)
F = json.loads(FM.group(1))
PREFIX = {'nfl': '', 'cfb': '', 'nba': 'nba:', 'cbb': 'cbb:'}
SLATE = {'nfl': 'NFL_GAMES', 'cfb': 'CFB_GAMES', 'nba': 'NBA_GAMES', 'cbb': 'CBB_GAMES'}


def slate_times():
    t = {}
    for lg, name in SLATE.items():
        m = re.search(r'const %s = \[(.*?)\n\];' % name, M, re.S)
        for row in re.findall(r'\[\s*"(\d{4}-\d\d-\d\d)",\s*"(\d\d:\d\d)",\s*"([^"]+)",\s*"([^"]+)"', m.group(1) if m else ''):
            d, tm, a, h = row; t[(lg, d, a, h)] = tm
    return t


def names(lg):
    if lg == 'cfb': return {r[0] for r in json.load(open('cfb_data.json'))}
    if lg == 'cbb': return {r[0] for r in json.load(open('cbb_data.json'))}
    if lg == 'nba':
        i = M.index('const NBA_ROWS'); return set(re.findall(r'\["([A-Z]{2,3})"', M[i:M.index('];', i)]))
    csv = re.search(r'const CSV = `(.*?)`', open('model.js').read(), re.S).group(1).strip().split('\n')[1:]
    return {l.split(',')[1] for l in csv}


def et_now():
    u = datetime.datetime.now(datetime.timezone.utc)
    # US Eastern: EST (UTC-5) from the first Sunday of November to the second Sunday of March
    y = u.year
    def nth_sun(m, n):
        d = datetime.date(y, m, 1); d += datetime.timedelta((6 - d.weekday()) % 7); return d + datetime.timedelta(7 * (n - 1))
    dst = nth_sun(3, 2) <= u.date() < nth_sun(11, 1)
    return (u - datetime.timedelta(hours=4 if dst else 5)).replace(tzinfo=None)


if len(sys.argv) > 1 and sys.argv[1] == '--pending':
    T = slate_times(); now = et_now(); rows = set()
    for p in P:
        if p.get('fa') is not None: continue
        tm = T.get((p['lg'], p['date'], p['away'], p['home']))
        start = datetime.datetime.fromisoformat(p['date'] + 'T' + (tm or '00:00'))
        if start <= now: rows.add((p['lg'], p['date'], tm or '?', p['away'], p['home']))
    if not rows: print('no started games with ungraded picks')
    for r in sorted(rows): print('%s  %s %s ET  %s @ %s' % r)
    sys.exit()

U = json.load(open(sys.argv[1]))
bad = []
for lg, fin in U.items():
    ok = names(lg)
    for k in fin:
        for t in k.split('|'):
            if t not in ok: bad.append((lg, t))
if bad:
    import difflib
    for lg, t in bad: print('unknown %s team %r; did you mean %s' % (lg, t, difflib.get_close_matches(t, names(lg), 3)))
    sys.exit(1)

today = et_now().date(); graded = []
for lg, fin in U.items():
    for k, v in fin.items():
        F[PREFIX[lg] + k] = v
        a, h = k.split('|')
        for p in P:
            if p['lg'] == lg and p['away'] == a and p['home'] == h and p.get('fa') is None \
               and abs((today - datetime.date.fromisoformat(p['date'])).days) <= 4:
                p['fa'], p['fh'] = v; graded.append(p)

A = A[:FM.start(1)] + json.dumps(F, separators=(',', ':'), ensure_ascii=False) + A[FM.end(1):]
PL = re.search(r'const PICK_LOG = (\[.*?\]);?\n', A)
A = A[:PL.start(1)] + json.dumps(P, ensure_ascii=False) + A[PL.end(1):]
open('app_script.js', 'w').write(A)


def res(p):
    pk = p['fh'] if p['side'] == 'home' else p['fa']; op = p['fa'] if p['side'] == 'home' else p['fh']
    if p['m'] == 'spread': d = pk - op + p['line']
    elif p['m'] == 'totals': d = ((p['fa'] + p['fh']) - p['line']) * (1 if p['side'] == 'over' else -1)
    else: d = pk - op
    return 'W' if d > 0 else 'L' if d < 0 else 'P'


for p in graded: print('  %s  %-28s | %s @ %s  %s-%s' % (res(p), p['pick'], p['away'], p['home'], p['fa'], p['fh']))
print('recorded', sum(len(v) for v in U.values()), 'finals; graded', len(graded), 'picks')
subprocess.run(['python3', 'build.py'], check=True, stdout=subprocess.DEVNULL)
subprocess.run(['node', '--check', 'chk.js'], check=True)
subprocess.run(['python3', 'make_site.py'], check=True, stdout=subprocess.DEVNULL)
for grp, lgs in [('Football', ('nfl', 'cfb')), ('NBA', ('nba',)), ('CBB', ('cbb',))]:
    w = l = 0; u = 0.0; pend = 0
    for p in P:
        if p['lg'] not in lgs: continue
        if p.get('fa') is None: pend += 1; continue
        r = res(p)
        if r == 'W': w += 1; u += p['price'] / 100 if p['price'] > 0 else 100 / -p['price']
        elif r == 'L': l += 1; u -= 1
    print('%s %d-%d %+.2fu, %d pending' % (grp, w, l, u, pend))
