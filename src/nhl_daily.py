"""Daily NHL (beta) refresh for Edgeline. Run from the src/ folder:
    python3 nhl_daily.py update.json
update.json:
{
  "label": "Tue Nov 24",                      # tab label for today's slate
  "dataDate": "2026-11-24",                   # date the team stats run through (only when "teams" is given)
  "footer": "Beta. Lines from DraftKings via ESPN, Nov 24. ...",   # optional
  "teams":   [["CAR","Hurricanes",24,4.17,2.25,33.5,21.6,25.6,82.7], ...],   # optional, all 32:
             #  [abbr, nickname, gp, GF/gp, GA/gp, SF/gp, SA/gp, PP%, PK%]  (Kalshi NHL team stats page)
  "goalies": [["Jesper Wallstedt","MIN",22,22,575,0.923,18.4], ...],         # optional: [name, team, gp, gs, shots against, sv%, GSAA]
             #  (hockey-reference NHL_2027_goalies; team codes NJ, LA, SJ, TB, VGK)
  "games": [["2026-11-24","20:00","VGK","EDM",1.5,6.5,-118,-102,"",
             {"plAway":220,"plHome":-270,"over":102,"under":-122,"gA":"Carter Hart","gH":"Tristan Jarry","gsA":"Likely","gsH":"Confirmed"}], ...],
             #  [date, ET time, away, home, home puck line (-1.5 or +1.5), total, mlAway, mlHome, tv, extra]
             #  starters from Daily Faceoff; a goalie not in NHL_GOALIES counts as league average
  "finals": {"CBJ|NJ": [2, 3]},              # finished games, away|home: [awayGoals, homeGoals] incl. the OT/SO winner's goal
  "lockBefore": "16:00"                       # optional: only lock picks for games starting before this ET time
                                              # (morning runs use it so evening games wait for confirmed goalies)
}
Rewrites the NHL data in model2.js, records finals, grades NHL picks, locks new 6+ picks for games that
haven't started, then rebuilds nfl-edge-board.html (the Claude artifact page) and ../index.html (edgeline.pro).
Rerunning with changed lines/starters re-prices unlocked games; already-locked picks stay as they were.
"""
import json, re, sys, subprocess, datetime

U = json.load(open(sys.argv[1]))
m = open('model2.js').read()


def arr(rows): return '[\n' + ''.join('  ' + json.dumps(r, ensure_ascii=False) + ',\n' for r in rows) + ']'


if U.get('teams'):
    assert len(U['teams']) == 32, 'need all 32 teams'
    m = re.sub(r'const NHL_TEAMS = \[.*?\n\];', lambda _: 'const NHL_TEAMS = ' + arr(U['teams']) + ';', m, count=1, flags=re.S)
if U.get('goalies'):
    m = re.sub(r'const NHL_GOALIES = \[.*?\n\];', lambda _: 'const NHL_GOALIES = ' + arr(U['goalies']) + ';', m, count=1, flags=re.S)
old_games = re.search(r'const NHL_GAMES = \[.*?\n\];', m, flags=re.S).group(0)
if 'games' in U:
    m = re.sub(r'const NHL_GAMES = \[.*?\n\];', lambda _: 'const NHL_GAMES = ' + arr(U['games']) + ';', m, count=1, flags=re.S)
if U.get('label'):
    m = re.sub(r'(nhl: \{ key:"nhl", label:"NHL", beta:true, weekLabel:")[^"]*"', lambda x: x.group(1) + U['label'] + '"', m, count=1)
if U.get('teams') and U.get('dataDate'):
    m = re.sub(r'(nhl: \{ key:"nhl",[^\n]*?dataDate:")[^"]*"', lambda x: x.group(1) + U['dataDate'] + '"', m, count=1)
if U.get('games') and re.search(r'const NHL_GAMES = \[.*?\n\];', m, flags=re.S).group(0) != old_games:
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    m = re.sub(r'(nhl: \{ key:"nhl",[^\n]*?linesAt:")[^"]*"', lambda x: x.group(1) + now + '"', m, count=1)
if U.get('footer'):
    m = re.sub(r'(cfg:\{regressGP:.*?\n\s*footer:")[^"]*"', lambda x: x.group(1) + U['footer'].replace('"', "'") + '"', m, count=1, flags=re.S)
open('model2.js', 'w').write(m)


def et_now():
    u = datetime.datetime.now(datetime.timezone.utc); y = u.year
    def sun(mo, n):
        d = datetime.date(y, mo, 1); d += datetime.timedelta((6 - d.weekday()) % 7); return d + datetime.timedelta(7 * (n - 1))
    return (u - datetime.timedelta(hours=4 if sun(3, 2) <= u.date() < sun(11, 1) else 5)).replace(tzinfo=None)


def not_started(g):
    try: return datetime.datetime.fromisoformat(g[0] + 'T' + g[1]) > et_now()
    except Exception: return False


a = open('app_script.js').read()
fm = re.search(r'const FINALS=(\{.*?\});', a)
F = json.loads(fm.group(1))
for g in U.get('games', []):  # rematch: an old final for a game that hasn't started would hide it
    k = g[2] + '|' + g[3]
    if k not in U.get('finals', {}) and not_started(g) and F.pop('nhl:' + k, None): print('cleared old final for rematch', k)
for k, v in U.get('finals', {}).items(): F['nhl:' + k] = v
a = a[:fm.start(1)] + json.dumps(F, separators=(',', ':'), ensure_ascii=False) + a[fm.end(1):]
pm = re.search(r'const PICK_LOG = (\[.*?\]);\n', a, re.S)
L = json.loads(pm.group(1)); graded = 0
today = et_now().date()
for p in L:
    if p['lg'] == 'nhl' and p.get('fa') is None:
        f = U.get('finals', {}).get(p['away'] + '|' + p['home'])
        if f and abs((today - datetime.date.fromisoformat(p['date'])).days) <= 4: p['fa'], p['fh'] = f; graded += 1
a = a[:pm.start(1)] + json.dumps(L, ensure_ascii=False) + a[pm.end(1):]
open('app_script.js', 'w').write(a)

subprocess.run(['python3', 'build.py'], check=True)
subprocess.run(['node', 'picks_nhl.js'], check=True, stdout=subprocess.DEVNULL)
new = json.load(open('nhlpicks.json')); have = {(p['date'], p['away'], p['home'], p['m']) for p in L if p['lg'] == 'nhl'}
added = []
for p in new:
    if (p['date'], p['away'], p['home'], p['m']) in have or ('nhl:' + p['away'] + '|' + p['home']) in F: continue
    t = next((g[1] for g in U.get('games', []) if g[0] == p['date'] and g[2] == p['away'] and g[3] == p['home']), None)
    if U.get('lockBefore') and t and t >= U['lockBefore']: continue
    p['locked'] = today.isoformat(); L.append(p); added.append(p)
a = open('app_script.js').read(); pm = re.search(r'const PICK_LOG = (\[.*?\]);\n', a, re.S)
a = a[:pm.start(1)] + json.dumps(L, ensure_ascii=False) + a[pm.end(1):]
open('app_script.js', 'w').write(a)
subprocess.run(['python3', 'build.py'], check=True)
subprocess.run(['node', '--check', 'chk.js'], check=True)
subprocess.run(['python3', 'make_site.py'], check=True)
print('graded', graded, 'new picks', len(added))
for p in added: print(' ', p['score'], p['pick'], '|', p['away'], '@', p['home'], '|', p.get('goalies', ''))
