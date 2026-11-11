"""Daily men's college basketball (CBB) refresh for Edgeline. Run from the src/ folder:
    python3 cbb_daily.py cbb.json
cbb.json:
{
  "label": "Wed Nov 4",                # tab label for the slate (e.g. "Nov 4–6" if it spans days)
  "footer": "Lines from DraftKings via ESPN, Nov 4. Games without a posted line are left off. Finished games drop off once they end.",
  "games": [["2026-11-04","19:30","CSUN","Wichita State",-14.5,161.5,700,-1100,""], ...],
      # [date, ET time 24h, away, home, homeSpread, total, mlAway, mlHome, tv, extra]
      # mlAway/mlHome may be null when no moneyline is posted; extra e.g. {"venue":"TD Garden, Boston","hfa":0,"note":"neutral site"}
  "finals": {"Wofford|Tennessee":[61,88], ...}   # finished games, "away|home": [awayPts, homePts]
}
Team names MUST be spelled exactly as in cbb_data.json (KenPom names with "St." written as "State",
"Connecticut" -> "UConn", "Miami FL" -> "Miami"). The script stops and suggests spellings for unknown names.
Team ratings (cbb_data.json) are NOT updated here: KenPom blocks automated access, so the owner pastes the
kenpom.com table and it is converted with:  python3 kenpom_import.py <pasted.txt>
It rewrites CBB_GAMES in model2.js, records finals, grades CBB picks, locks new 6+ picks (only games not yet
tipped), then rebuilds nfl-edge-board.html and ../index.html.
"""
import json,re,sys,subprocess,datetime,difflib
U=json.load(open(sys.argv[1]))
names={r[0] for r in json.load(open('cbb_data.json'))}
bad=sorted({t for g in U['games'] for t in g[2:4] if t not in names}|{t for k in U.get('finals',{}) for t in k.split('|') if t not in names})
if bad:
    for t in bad: print('UNKNOWN TEAM:',t,'-> maybe',difflib.get_close_matches(t,names,3,0.5))
    sys.exit('fix team names (or drop non-Division I games) and rerun')
m=open('model2.js').read()
arr='[\n'+',\n'.join('  '+json.dumps(r,ensure_ascii=False) for r in U['games'])+',\n]'
_old_games=re.search(r'const CBB_GAMES = \[.*?\n\];',m,flags=re.S).group(0)
m,n=re.subn(r'const CBB_GAMES = \[.*?\n\];',lambda _:'const CBB_GAMES = '+arr+';',m,count=1,flags=re.S); assert n==1
m=re.sub(r'(cbb: \{ key:"cbb", label:"CBB", weekLabel:")[^"]*"',lambda x:x.group(1)+U['label']+'"',m,count=1)
# stamp when the games/lines actually changed (shown in the header as "Lines updated ...");
# a results-only rerun with the same games keeps the old stamp
if U.get('games') and re.search(r'const CBB_GAMES = \[.*?\n\];',m,flags=re.S).group(0)!=_old_games:
    _now=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    m=re.sub(r'(cbb: \{ key:"cbb",[^\n]*?linesAt:")[^"]*"',lambda x:x.group(1)+_now+'"',m,count=1)
if U.get('footer'):
    m=re.sub(r'(cfg:\{basePts:70.*?\n\s*footer:")[^"]*"',lambda x:x.group(1)+U['footer'].replace('"',"'")+'"',m,count=1,flags=re.S)
open('model2.js','w').write(m)
def _et_now():
    u=datetime.datetime.now(datetime.timezone.utc); y=u.year
    def sun(mo,n):
        d=datetime.date(y,mo,1); d+=datetime.timedelta((6-d.weekday())%7); return d+datetime.timedelta(7*(n-1))
    return (u-datetime.timedelta(hours=4 if sun(3,2)<=u.date()<sun(11,1) else 5)).replace(tzinfo=None)
def _not_started(g):
    try: return datetime.datetime.fromisoformat(g[0]+'T'+g[1])>_et_now()
    except Exception: return False
a=open('app_script.js').read()
fm=re.search(r'const FINALS=(\{.*?\});',a); F=json.loads(fm.group(1))
for g in U['games']:
    k=g[2]+'|'+g[3]
    # only a game that hasn't tipped yet can be a rematch; never wipe the final of a game already played
    if k not in U.get('finals',{}) and _not_started(g) and F.pop('cbb:'+k,None): print('cleared old final for rematch',k)
for k,v in U.get('finals',{}).items(): F['cbb:'+k]=v
a=a[:fm.start(1)]+json.dumps(F,separators=(',',':'))+a[fm.end(1):]
pm=re.search(r'const PICK_LOG = (\[.*?\]);\n',a,re.S); L=json.loads(pm.group(1)); graded=[]
for p in L:
    if p['lg']=='cbb' and p.get('fa') is None:
        f=F.get('cbb:'+p['away']+'|'+p['home'])
        if f: p['fa'],p['fh']=f; graded.append(p)
a=a[:pm.start(1)]+json.dumps(L,ensure_ascii=False)+a[pm.end(1):]
open('app_script.js','w').write(a)
subprocess.run(['python3','build.py'],check=True)
subprocess.run(['node','picks_cbb.js'],check=True)
new=json.load(open('cbbpicks.json')); have={(p['date'],p['away'],p['home'],p['m']) for p in L}
today=datetime.date.today().isoformat(); added=[]
for p in new:
    k=(p['date'],p['away'],p['home'],p['m'])
    if k in have or ('cbb:'+p['away']+'|'+p['home']) in F: continue
    p['locked']=today; L.append(p); added.append(p)
a=open('app_script.js').read(); pm=re.search(r'const PICK_LOG = (\[.*?\]);\n',a,re.S)
a=a[:pm.start(1)]+json.dumps(L,ensure_ascii=False)+a[pm.end(1):]
open('app_script.js','w').write(a)
subprocess.run(['python3','build.py'],check=True)
subprocess.run(['node','--check','chk.js'],check=True)
subprocess.run(['python3','make_site.py'],check=True)
cb=[p for p in L if p['lg']=='cbb' and p.get('fa') is not None]
def res(p):
    pk=p['fh'] if p['side']=='home' else p['fa']; op=p['fa'] if p['side']=='home' else p['fh']
    d=pk-op+p['line'] if p['m']=='spread' else ((p['fa']+p['fh'])-p['line'])*(1 if p['side']=='over' else -1) if p['m']=='totals' else pk-op
    return 'W' if d>0 else 'L' if d<0 else 'P'
u=0;w=l=0
for p in cb:
    r=res(p)
    if r=='W': w+=1; u+=(100/-p['price'] if p['price']<0 else p['price']/100)
    elif r=='L': l+=1; u-=1
print('graded',len(graded),'| CBB record %d-%d %+.2fu'%(w,l,u),'| new picks',len(added))
for p in graded: print('  result',res(p),p['pick'],'|',p['away'],'@',p['home'],p['fa'],'-',p['fh'])
for p in added: print('  new',p['score'],p['pick'],'|',p['away'],'@',p['home'])
