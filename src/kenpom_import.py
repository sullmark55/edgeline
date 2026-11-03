"""Convert a copy-paste of the kenpom.com ratings table into cbb_data.json:  python3 kenpom_import.py pasted.txt
Rows: [team, conf, W-L, AdjO, AdjD, AdjT, NetRtg]. Team names: "St." -> "State", Connecticut -> UConn, Miami FL -> Miami."""
import json,re,sys
ALIAS={"Connecticut":"UConn","Miami FL":"Miami","Sam Houston St.":"Sam Houston","Miami OH":"Miami (OH)"}
def norm(n):
    n=re.sub(r'\s+\d+$','',n.strip())  # drop tournament seeds if present
    return ALIAS.get(n) or re.sub(r'(?<=\S) St\.(?=\s|$)',' State',n)
rows=[]
for l in open(sys.argv[1]).read().splitlines():
    c=l.split('\t')
    if len(c)<10 or not c[0].strip().isdigit(): continue
    rows.append([norm(c[1]),c[2].strip(),c[3].strip(),float(c[5]),float(c[7]),float(c[9]),float(c[4])])
assert len(rows)>=350 and len({r[0] for r in rows})==len(rows), len(rows)
json.dump(rows,open('cbb_data.json','w'),separators=(',',':'),ensure_ascii=False); print('teams',len(rows))
