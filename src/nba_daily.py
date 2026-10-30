"""Daily NBA refresh for Edgeline. Run from the src/ folder:
    python3 nba_daily.py update.json
update.json:
{
  "label": "Wed Oct 28",              # tab label for today's slate
  "dataDate": "2026-10-27",           # date the team stats run through
  "footer": "Lines from FanDuel, Oct 28. Finished games drop off once they end.",
  "rows":  [["OKC","Thunder",114.4,106.2,98.5,2], ...],   # optional: [abbr,name,aORTG,aDRTG,pace,gp] for all 30 teams
  "games": [["2026-10-28","19:30","CHI","BOS",-13.5,233.5,590,-847,"ESPN"], ...],  # [date,ET time,away,home,homeSpread,total,mlAway,mlHome,tv]
  "finals": {"MIN|CLE":[125,127], ...}  # finished NBA games, away|home: [awayPts, homePts]
}
It rewrites the NBA data in model2.js, records finals, grades NBA picks, locks new 6+ picks,
then rebuilds nfl-edge-board.html (the Claude artifact page) and ../index.html (edgeline.pro).
"""
import json,re,sys,subprocess,datetime
U=json.load(open(sys.argv[1]))
m=open('model2.js').read()
def arr(rows): return '[\n'+',\n'.join('  '+json.dumps(r) for r in rows)+',\n]'
if U.get('rows'):
    assert len(U['rows'])==30, 'need all 30 teams'
    m=re.sub(r'const NBA_ROWS = \[.*?\n\];',lambda _:'const NBA_ROWS = '+arr(U['rows'])+';',m,count=1,flags=re.S)
m=re.sub(r'const NBA_GAMES = \[.*?\n\];',lambda _:'const NBA_GAMES = '+arr(U['games'])+';',m,count=1,flags=re.S)
m=re.sub(r'(nba: \{ key:"nba", label:"NBA", weekLabel:")[^"]*(", dataDate:")[^"]*"',lambda x:x.group(1)+U['label']+x.group(2)+U['dataDate']+'"',m,count=1)
if U.get('footer'):
    m=re.sub(r'(cfg:\{basePts:115.*?\n\s*footer:")[^"]*"',lambda x:x.group(1)+U['footer'].replace('"',"'")+'"',m,count=1,flags=re.S)
open('model2.js','w').write(m)
a=open('app_script.js').read()
fm=re.search(r'const FINALS=(\{.*?\});',a)
F=json.loads(fm.group(1))
# rematch: an older final for a matchup on today's slate would hide the game and block its picks; drop it
for g in U['games']:
    k=g[2]+'|'+g[3]
    if k not in U.get('finals',{}) and F.pop('nba:'+k,None): print('cleared old final for rematch',k)
for k,v in U.get('finals',{}).items(): F['nba:'+k]=v
a=a[:fm.start(1)]+json.dumps(F,separators=(',',':'))+a[fm.end(1):]
pm=re.search(r'const PICK_LOG = (\[.*?\]);\n',a,re.S)
L=json.loads(pm.group(1)); graded=0
for p in L:
    if p['lg']=='nba' and p.get('fa') is None:
        f=F.get('nba:'+p['away']+'|'+p['home'])
        if f: p['fa'],p['fh']=f; graded+=1
open('app_script.js','w').write(a)
subprocess.run(['python3','build.py'],check=True)
subprocess.run(['node','picks_nba.js'],check=True)
new=json.load(open('nbapicks.json')); have={(p['date'],p['away'],p['home'],p['m']) for p in L}
today=datetime.date.today().isoformat(); added=[]
for p in new:
    k=(p['date'],p['away'],p['home'],p['m'])
    if k in have or ('nba:'+p['away']+'|'+p['home']) in F: continue
    p['locked']=today; L.append(p); added.append(p)
a=open('app_script.js').read(); pm=re.search(r'const PICK_LOG = (\[.*?\]);\n',a,re.S)
a=a[:pm.start(1)]+json.dumps(L,ensure_ascii=False)+a[pm.end(1):]
open('app_script.js','w').write(a)
subprocess.run(['python3','build.py'],check=True)
subprocess.run(['node','--check','chk.js'],check=True)
subprocess.run(['python3','make_site.py'],check=True)
print('graded',graded,'new picks',len(added))
for p in added: print(' ',p['score'],p['pick'],'|',p['away'],'@',p['home'])
