/*MODEL*/

const DATA={nfl:buildLeague("nfl"),cfb:buildLeague("cfb"),nba:buildLeague("nba")};
const MK={spread:"Spread",totals:"Total",ml:"ML"};
let state={lg:"nfl",m:"all",s:"edge",q:"",collapsed:true};
try{const v=JSON.parse(localStorage.getItem("geb-state")||"null"); if(v){state=Object.assign(state,v); state.q="";}}catch(e){}
if(!DATA[state.lg]) state.lg="nfl";

const $=s=>document.querySelector(s);
const pct=x=>(x*100).toFixed(1)+"%";
const sgn=x=>(x>0?"+":"")+x.toFixed(1);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tierVar=t=>`var(--${t.toLowerCase()})`;
const cur=()=>DATA[state.lg];
function esHTML(b){return `<span class="es"><span class="bar"><i style="width:${b.score*10}%;background:${tierVar(b.tier)}"></i></span>${b.score.toFixed(1)}</span>`}

// kickoff shown in the viewer's own time zone
const fmtDay=d=>d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"});
const fmtTime=d=>d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit",timeZoneName:"short"});
const fmtDayLong=d=>d.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});

// network chips in each broadcaster's brand colors
const NET_COLORS=[
  [/^ESPN\+/,"#ffd400","#111111"],[/^ESPN/,"#d00000","#ffffff"],[/^ABC/,"#000000","#ffffff"],
  [/^CBS|^Paramount/,"#1f5fd6","#ffffff"],[/^FOX|^FS1/,"#003b7e","#ffffff"],
  [/^NBC|^Peacock/,"#5b2a86","#ffffff"],[/^Prime/,"#00a8e1","#08131f"],[/^NFLN/,"#013369","#ffffff"],
  [/^BTN/,"#0088ce","#ffffff"],[/^SECN/,"#0c2340","#f2c75c"],[/^ACCN/,"#013ca6","#ffffff"],
  [/^The CW/,"#00a651","#ffffff"],[/^USA/,"#1c2b7a","#ffffff"],[/^TNT|^truTV/,"#e4002b","#ffffff"],[/^MW\+/,"#6b2c3e","#ffffff"],
];
function netChip(tv){
  if(!tv) return "";
  const m=NET_COLORS.find(([re])=>re.test(tv)); const [bg,fg]=m?[m[1],m[2]]:["#5d6878","#ffffff"];
  return `<span class="net" style="--nb:${bg};--nf:${fg}">${esc(tv)}</span>`;
}

// team colors [primary, secondary]
const TEAM_COLORS={
 nba:{ATL:["#E03A3E","#C1D32F"],BOS:["#007A33","#BA9653"],BKN:["#000000","#FFFFFF"],CHA:["#1D1160","#00788C"],CHI:["#CE1141","#000000"],CLE:["#860038","#FDBB30"],DAL:["#00538C","#B8C4CA"],DEN:["#0E2240","#FEC524"],DET:["#C8102E","#1D42BA"],GSW:["#1D428A","#FFC72C"],HOU:["#CE1141","#000000"],IND:["#002D62","#FDBB30"],LAC:["#1D428A","#C8102E"],LAL:["#552583","#FDB927"],MEM:["#5D76A9","#12173F"],MIA:["#98002E","#F9A01B"],MIL:["#00471B","#EEE1C6"],MIN:["#0C2340","#78BE20"],NOP:["#0C2340","#C8102E"],NYK:["#006BB6","#F58426"],OKC:["#007AC1","#EF3B24"],ORL:["#0077C0","#C4CED4"],PHI:["#006BB6","#ED174C"],PHX:["#1D1160","#E56020"],POR:["#E03A3E","#000000"],SAC:["#5A2D81","#63727A"],SAS:["#C4CED4","#000000"],TOR:["#CE1141","#000000"],UTA:["#002B5C","#F9A01B"],WAS:["#002B5C","#E31837"]},
 nfl:{ARI:["#97233F","#FFB612"],ATL:["#A71930","#000000"],BAL:["#241773","#9E7C0C"],BUF:["#00338D","#C60C30"],CAR:["#0085CA","#101820"],CHI:["#0B162A","#C83803"],CIN:["#FB4F14","#000000"],CLE:["#311D00","#FF3C00"],DAL:["#003594","#869397"],DEN:["#FB4F14","#002244"],DET:["#0076B6","#B0B7BC"],GB:["#203731","#FFB612"],HOU:["#03202F","#A71930"],IND:["#002C5F","#A2AAAD"],JAX:["#006778","#D7A22A"],KC:["#E31837","#FFB81C"],LA:["#003594","#FFA300"],LAC:["#0080C6","#FFC20E"],LV:["#000000","#A5ACAF"],MIA:["#008E97","#FC4C02"],MIN:["#4F2683","#FFC62F"],NE:["#002244","#C60C30"],NO:["#D3BC8D","#101820"],NYG:["#0B2265","#A71930"],NYJ:["#125740","#FFFFFF"],PHI:["#004C54","#A5ACAF"],PIT:["#FFB612","#101820"],SEA:["#002244","#69BE28"],SF:["#AA0000","#B3995D"],TB:["#D50A0A","#34302B"],TEN:["#0C2340","#4B92DB"],WAS:["#5A1414","#FFB612"]},
 cfb:{"Arizona":["#CC0033", "#003366"],"Boise State":["#0033A0", "#D64309"],"Clemson":["#F56600", "#522D80"],"Illinois":["#13294B", "#E84A27"],"Iowa":["#000000", "#FFCD00"],"Iowa State":["#C8102E", "#F1BE48"],"Liberty":["#0A254E", "#C41230"],"Marshall":["#00B140", "#000000"],"Minnesota":["#7A0019", "#FFCC33"],"NC State":["#CC0000", "#000000"],"New Mexico State":["#861F41", "#FFFFFF"],"North Texas":["#00853E", "#000000"],"South Alabama":["#00205B", "#BF0D3E"],"South Carolina":["#73000A", "#000000"],"Stanford":["#8C1515", "#FFFFFF"],"Texas A&M":["#500000", "#FFFFFF"],"UCF":["#000000", "#BA9B37"],"UConn":["#000E2F", "#FFFFFF"],"USC":["#990000", "#FFC72C"],"Utah State":["#0F2439", "#8A8D8F"],"Delaware":["#00539F","#FFD200"],"Middle Tennessee":["#0066CC","#000000"],"Florida International":["#081E3F","#B6862C"],"Jacksonville State":["#CC0000","#000000"],"Kennesaw State":["#FDBB30","#0B1315"],"Missouri State":["#5E0009","#FFFFFF"],"Western Kentucky":["#C60C30","#000000"],"Sam Houston":["#F76800","#FFFFFF"],"Georgia Southern":["#011E41","#87714D"],"Old Dominion":["#003057","#7C878E"],"East Carolina":["#592A8A","#FDC82F"],"UAB":["#1E6B52","#F4C300"],"Colorado State":["#1E4D2B","#C8C372"],"Texas State":["#501214","#8D734A"],"Memphis":["#003087","#898D8D"],"Tulane":["#006747","#418FDE"],"App State":["#222222","#FFCC00"],"Coastal Carolina":["#006F71","#A27752"],"Washington":["#4B2E83","#B7A57A"],"Purdue":["#CEB888","#000000"],"Florida":["#0021A5","#FA4616"],"Texas":["#BF5700","#FFFFFF"],"Virginia":["#232D4B","#F84C1E"],"SMU":["#0033A0","#C8102E"],"Mississippi State":["#660000","#FFFFFF"],"LSU":["#461D7C","#FDD023"],"Kansas":["#0051BA","#E8000D"],"Kansas State":["#512888","#FFFFFF"],"Cincinnati":["#E00122","#000000"],"West Virginia":["#002855","#EAAA00"],"Georgia State":["#0039A6","#C60C30"],"James Madison":["#450084","#CBB677"],"Pittsburgh":["#003594","#FFB81C"],"Boston College":["#98002E","#BC9B6A"],"Florida Atlantic":["#003366","#CC0000"],"Army":["#000000","#D4BF91"],"Northwestern":["#4E2A84","#FFFFFF"],"Michigan State":["#18453B","#FFFFFF"],"Ball State":["#BA0C2F","#FFFFFF"],"Bowling Green":["#FE5000","#4F2C1D"],"Ohio State":["#BB0000","#666666"],"Indiana":["#990000","#EEEDEB"],"Rutgers":["#CC0033","#5F6A72"],"Maryland":["#E03A3E","#FFD520"],"Charlotte":["#046A38","#B9975B"],"Temple":["#9D2235","#FFFFFF"],"Massachusetts":["#881C1C","#FFFFFF"],"Buffalo":["#005BBB","#FFFFFF"],"Western Michigan":["#6C4023","#B5A167"],"Central Michigan":["#6A0032","#FFC82E"],"Georgia Tech":["#003057","#B3A369"],"Virginia Tech":["#861F41","#E5751F"],"Northern Illinois":["#BA0C2F","#000000"],"Wyoming":["#492F24","#FFC425"],"UNLV":["#CF0A2C","#666666"],"Air Force":["#003087","#8A8D8F"],"Arizona State":["#8C1D40","#FFC627"],"Texas Tech":["#CC0000","#000000"],"Missouri":["#F1B82D","#000000"],"Ole Miss":["#CE1126","#14213D"],"Penn State":["#041E42","#FFFFFF"],"Michigan":["#00274C","#FFCB05"],"Alabama":["#9E1B32","#828A8F"],"Tennessee":["#FF8200","#FFFFFF"],"Auburn":["#0C2340","#E87722"],"Georgia":["#BA0C2F","#000000"],"Toledo":["#15397F","#FFDA00"],"Eastern Michigan":["#006633","#FFFFFF"],"North Carolina":["#7BAFD4","#13294B"],"Duke":["#003087","#FFFFFF"],"Akron":["#041E42","#A89968"],"Miami (OH)":["#C3142D","#FFFFFF"],"Tulsa":["#002D72","#C8102E"],"Rice":["#00205B","#7C7E7F"],"Troy":["#8A2432","#B3B5B8"],"Louisiana":["#CE181E","#FFFFFF"],"Washington State":["#981E32","#5E6A71"],"Oregon State":["#DC4405","#000000"],"Florida State":["#782F40","#CEB888"],"Miami":["#F47321","#005030"],"Kent State":["#002664","#EAAB00"],"South Florida":["#006747","#CFC493"],"TCU":["#4D1979","#A3A9AC"],"Baylor":["#154734","#FFB81C"],"Nevada":["#003366","#807F84"],"North Dakota State":["#0A5640","#FFC72A"],"Arkansas State":["#CC092F","#000000"],"Southern Miss":["#000000","#FFAB00"],"Arkansas":["#9D2235","#FFFFFF"],"Vanderbilt":["#000000","#CFAE70"],"Wisconsin":["#C5050C","#FFFFFF"],"UCLA":["#2D68C4","#F2A900"],"Louisville":["#AD0000","#000000"],"Syracuse":["#F76900","#000E54"],"Notre Dame":["#0C2340","#C99700"],"BYU":["#002E5D","#FFFFFF"],"Kentucky":["#0033A0","#FFFFFF"],"Oklahoma":["#841617","#FDF9D8"],"Oklahoma State":["#FF7300","#000000"],"Houston":["#C8102E","#FFFFFF"],"Louisiana Tech":["#002F8B","#E31B23"],"UL Monroe":["#840029","#BA9B37"],"Navy":["#00205B","#C5B783"],"UTSA":["#0C2340","#F15A22"],"San José State":["#0055A2","#E5A823"],"UTEP":["#FF8200","#041E42"],"Ohio":["#00694E","#FFFFFF"],"Sacramento State":["#043927","#C4B581"],"Utah":["#CC0000","#FFFFFF"],"Colorado":["#CFB87C","#000000"],"Wake Forest":["#9E7E38","#000000"],"California":["#003262","#FDB515"],"Fresno State":["#DB0032","#002E6D"],"San Diego State":["#A6192E","#000000"],"New Mexico":["#BA0C2F","#63666A"],"Hawai'i":["#024731","#FFFFFF"],"Nebraska":["#E41C38","#FFFFFF"],"Oregon":["#154733","#FEE123"]}
};
const colorsOf=(lg,code)=>TEAM_COLORS[lg][code]||["#6b7488","#a3abbd"];
function swatch(lg,code){const [a,b]=colorsOf(lg,code);return `<i class="sw" style="--c1:${a};--c2:${b}" aria-hidden="true"></i>`}
const CFB_ABBR={"Arizona":"ARIZ","Boise State":"BSU","Clemson":"CLEM","Illinois":"ILL","Iowa":"IOWA","Iowa State":"ISU","Liberty":"LIB","Marshall":"MRSH","Minnesota":"MINN","NC State":"NCST","New Mexico State":"NMSU","North Texas":"UNT","South Alabama":"USA","South Carolina":"SC","Stanford":"STAN","Texas A&M":"TA&M","UCF":"UCF","UConn":"UCON","USC":"USC","Utah State":"USU","Delaware":"DEL","Middle Tennessee":"MTSU","Florida International":"FIU","Jacksonville State":"JSU","Kennesaw State":"KENN","Missouri State":"MOST","Western Kentucky":"WKU","Sam Houston":"SHSU","Georgia Southern":"GASO","Old Dominion":"ODU","East Carolina":"ECU","UAB":"UAB","Colorado State":"CSU","Texas State":"TXST","Memphis":"MEM","Tulane":"TUL","App State":"APP","Coastal Carolina":"CCU","Washington":"UW","Purdue":"PUR","Florida":"UF","Texas":"TEX","Virginia":"UVA","SMU":"SMU","Mississippi State":"MSST","LSU":"LSU","Kansas":"KU","Kansas State":"KSU","Cincinnati":"CIN","West Virginia":"WVU","Georgia State":"GAST","James Madison":"JMU","Pittsburgh":"PITT","Boston College":"BC","Florida Atlantic":"FAU","Army":"ARMY","Northwestern":"NU","Michigan State":"MSU","Ball State":"BALL","Bowling Green":"BGSU","Ohio State":"OSU","Indiana":"IU","Rutgers":"RU","Maryland":"UMD","Charlotte":"CLT","Temple":"TEM","Massachusetts":"MASS","Buffalo":"BUF","Western Michigan":"WMU","Central Michigan":"CMU","Georgia Tech":"GT","Virginia Tech":"VT","Northern Illinois":"NIU","Wyoming":"WYO","UNLV":"UNLV","Air Force":"AF","Arizona State":"ASU","Texas Tech":"TTU","Missouri":"MIZ","Ole Miss":"MISS","Penn State":"PSU","Michigan":"MICH","Alabama":"BAMA","Tennessee":"TENN","Auburn":"AUB","Georgia":"UGA","Toledo":"TOL","Eastern Michigan":"EMU","North Carolina":"UNC","Duke":"DUKE","Akron":"AKR","Miami (OH)":"M-OH","Tulsa":"TLSA","Rice":"RICE","Troy":"TROY","Louisiana":"ULL","Washington State":"WSU","Oregon State":"ORST","Florida State":"FSU","Miami":"MIA","Kent State":"KENT","South Florida":"USF","TCU":"TCU","Baylor":"BAY","Nevada":"NEV","North Dakota State":"NDSU","Arkansas State":"ARST","Southern Miss":"USM","Arkansas":"ARK","Vanderbilt":"VAN","Wisconsin":"WIS","UCLA":"UCLA","Louisville":"LOU","Syracuse":"SYR","Notre Dame":"ND","BYU":"BYU","Kentucky":"UK","Oklahoma":"OU","Oklahoma State":"OKST","Houston":"HOU","Louisiana Tech":"LT","UL Monroe":"ULM","Navy":"NAVY","UTSA":"UTSA","San José State":"SJSU","UTEP":"UTEP","Ohio":"OHIO","Sacramento State":"SAC","Utah":"UTAH","Colorado":"COLO","Wake Forest":"WAKE","California":"CAL","Fresno State":"FRES","San Diego State":"SDSU","New Mexico":"UNM","Hawai'i":"HAW","Nebraska":"NEB","Oregon":"ORE"};
function abbr(lg,code){ if(lg!=="cfb") return code; return CFB_ABBR[code]||code.split(/[\s()-]+/).filter(Boolean).map(w=>w[0]).join("").slice(0,4).toUpperCase(); }
function lum(hex){const n=parseInt(hex.slice(1),16),c=[n>>16&255,n>>8&255,n&255].map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2];}
// round monogram badge in team colors (not a logo)
function badge(lg,code,size){
  const [a,b]=colorsOf(lg,code), t=abbr(lg,code), fg=lum(a)>.42?"#0d0d0d":"#ffffff";
  const fs=t.length>=4?.3:t.length===3?.36:.42;
  return `<span class="badge" style="--c1:${a};--c2:${b};--bf:${fg};--bs:${size||32}px;--bfs:${fs}" aria-hidden="true">${esc(t)}</span>`;
}
// circular Edge Score gauge
function gauge(score,tr,size){
  const s=size||46, r=17, C=2*Math.PI*r, d=(score/10)*C;
  return `<span class="gauge" style="width:${s}px;height:${s}px"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="${r}" fill="none" stroke="var(--surface2)" stroke-width="4"></circle><circle cx="20" cy="20" r="${r}" fill="none" stroke="${tierVar(tr)}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${d.toFixed(2)} ${C.toFixed(2)}" transform="rotate(-90 20 20)"></circle></svg><b class="num">${score.toFixed(1)}</b></span>`;
}
const started=g=>Date.now()>=g.kickoff.getTime();
// final scores [away, home], keyed "away|home"
const FINALS={"DAL|PHI":[38,21],"nba:MIN|CLE":[125,127],"nba:WAS|CHA":[103,110],"nba:DAL|MIA":[113,109],"nba:PHX|OKC":[114,125],"nba:IND|MIL":[102,110],"nba:LAL|UTA":[132,123],"nba:IND|BKN":[136,109],"nba:LAC|OKC":[101,108],"nba:ORL|NYK":[111,102],"nba:TOR|MIN":[94,117],"nba:DET|PHI":[106,93],"nba:MEM|SAC":[123,112],"KC|SEA":[3,20],"DEN|ARI":[30,16],"LA|LV":[35,21],"GB|DET":[17,20],"PIT|NO":[16,10],"MIA|NYJ":[28,25],"CIN|BAL":[35,13],"CLE|TEN":[27,24],"TB|CAR":[43,13],"SF|ATL":[20,29],"IND|MIN":[10,16],"NYG|HOU":[27,21],"nba:GSW|PHX":[122,131],"nba:WAS|CHI":[124,120],"nba:HOU|ATL":[121,114],"nba:NOP|DEN":[135,141],"Louisiana|Southern Miss":[31,35],"nba:MIA|CHA":[110,115],"nba:MIL|PHI":[116,127],"nba:BKN|CLE":[121,125],"nba:SAS|DAL":[122,106],"Oregon|Illinois":[10,21],"Texas Tech|Cincinnati":[24,37],"Baylor|Kansas":[24,25],"Pittsburgh|Miami":[23,52],"Rutgers|Northwestern":[14,42],"Indiana|Michigan":[13,6],"West Virginia|TCU":[24,20],"nba:LAC|LAL":[117,125],"nba:POR|SAC":[128,120],"nba:MEM|GSW":[111,108],"NC State|Stanford":[28,31],"nba:CHI|MIL":[132,125],"nba:ATL|CHA":[128,81],"nba:NYK|BOS":[103,107],"nba:TOR|WAS":[112,102],"nba:MIN|ORL":[115,93],"nba:DAL|IND":[121,105],"nba:DET|MIA":[128,111],"nba:NOP|UTA":[119,120],"nba:HOU|SAS":[114,110],"Massachusetts|UConn":[16,35],"Duke|Virginia":[19,16],"Army|Tulsa":[38,35],"Air Force|Wyoming":[14,28],"nba:CLE|PHI":[106,114],"nba:DEN|OKC":[84,96],"NE|CHI":[24,30],"James Madison|App State":[31,34],"Liberty|Kennesaw State":[34,6],"East Carolina|Memphis":[34,41],"nba:GSW|LAL":[105,127],"nba:PHX|POR":[83,124],"nba:SAC|LAC":[96,121],"nba:ATL|ORL":[132,125],"nba:MIL|WAS":[116,128],"nba:MIN|MIA":[131,106],"nba:CHI|TOR":[92,135],"nba:CHA|BKN":[110,103],"nba:UTA|MEM":[103,123],"nba:IND|NOP":[123,120],"nba:DAL|HOU":[110,128],"Middle Tennessee|Florida International":[26,23],"Missouri State|Delaware":[38,61],"South Alabama|Marshall":[13,20],"New Mexico State|Sam Houston":[30,24],"nba:BOS|DET":[113,121],"nba:PHI|NYK":[106,100],"nba:OKC|SAS":[116,104],"SEA|DEN":[14,17],"East Carolina|UAB":[17,30],"Georgia Southern|Old Dominion":[23,15],"Colorado State|Texas State":[27,66],"Memphis|Tulane":[17,31],"App State|Coastal Carolina":[35,32],"Washington|Purdue":[38,26],"Georgia State|James Madison":[22,49],"Northwestern|Michigan State":[24,21],"Florida|Texas":[27,24],"Virginia|SMU":[13,23],"Mississippi State|LSU":[0,31],"Kansas|Kansas State":[24,35],"Cincinnati|West Virginia":[42,45],"Ball State|Bowling Green":[32,31],"Ohio State|Indiana":[19,15],"Pittsburgh|Boston College":[21,27],"Florida Atlantic|Army":[24,56],"Rutgers|Maryland":[37,30],"Charlotte|Temple":[38,31],"Massachusetts|Buffalo":[18,25],"Western Michigan|Central Michigan":[21,14],"Northern Illinois|Wyoming":[23,41],"Akron|Miami (OH)":[14,34],"Georgia Tech|Virginia Tech":[24,34],"Auburn|Georgia":[27,24],"Missouri|Ole Miss":[3,31],"UNLV|Air Force":[31,41],"Alabama|Tennessee":[10,26],"Toledo|Eastern Michigan":[34,14],"Penn State|Michigan":[18,21],"North Carolina|Duke":[24,20],"Tulsa|Rice":[38,17],"Troy|Louisiana":[6,33],"Arkansas State|Southern Miss":[23,13],"Washington State|Oregon State":[30,48],"Kent State|South Florida":[2,29],"Arkansas|Vanderbilt":[31,21],"TCU|Baylor":[17,6],"Nevada|North Dakota State":[17,31],"Kentucky|Oklahoma":[21,13],"Wisconsin|UCLA":[7,17],"Louisville|Syracuse":[34,26],"Notre Dame|BYU":[24,28],"Oklahoma State|Houston":[32,35],"Louisiana Tech|UL Monroe":[24,0],"Nebraska|Oregon":[14,17],"Wake Forest|California":[41,7],"Ohio|Sacramento State":[48,7],"Florida State|Miami":[35,43],"Utah|Colorado":[27,24],"Fresno State|San Diego State":[23,26],"New Mexico|Hawai'i":[21,10],"Navy|UTSA":[34,38],"San José State|UTEP":[24,11],"Arizona State|Texas Tech":[25,53],"HOU|JAX":[34,31],"TEN|IND":[26,20],"BAL|CLE":[10,13],"CHI|ATL":[31,23],"NYJ|NE":[19,26],"CAR|PHI":[25,14],"NO|NYG":[34,27],"PIT|TB":[26,19],"ARI|LA":[18,16],"LAC|KC":[6,22],"BUF|LV":[33,30],"nba:ATL|HOU":[110,120],"nba:MEM|UTA":[110,105],"nba:GSW|DEN":[134,114],"nba:BKN|BOS":[124,125],"nba:SAC|SAS":[103,130],"nba:DET|NYK":[97,111],"nba:POR|LAL":[136,129],"Delaware|Western Kentucky":[35,21],"Sam Houston|Missouri State":[3,24],"nba:CHA|DET":[89,97],"nba:MIA|ATL":[129,117],"nba:PHI|IND":[114,109],"nba:WAS|CLE":[111,121],"nba:DEN|NOP":[104,91],"nba:GSW|MIN":[119,114],"nba:NYK|CHI":[133,127],"nba:HOU|MIL":[132,100],"nba:SAS|UTA":[117,111],"nba:OKC|DAL":[96,120],"nba:LAL|LAC":[103,87],"Kennesaw State|Middle Tennessee":[44,28],"Jacksonville State|New Mexico State":[24,0],"Troy|James Madison":[24,21],"Florida Atlantic|North Texas":[41,48],"CAR|GB":[19,27],"nba:CLE|ATL":[111,114],"nba:SAC|NOP":[120,132],"nba:MEM|POR":[124,103],"nba:CHA|WAS":[79,95],"nba:DET|BKN":[110,94],"nba:CHI|BOS":[111,125],"nba:NYK|PHI":[93,98],"nba:ORL|TOR":[121,114],"nba:LAC|MIN":[101,127],"nba:IND|MIA":[125,145],"nba:HOU|DAL":[111,116],"nba:LAL|GSW":[95,112],"nba:DEN|PHX":[127,120],"Tulane|Charlotte":[38,31],"Baylor|UCF":[41,9],"Kent State|Sacramento State":[10,31],"Notre Dame|Navy":[35,13],"UAB|South Florida":[10,30],"Bowling Green|Western Michigan":[10,23],"Wisconsin|Iowa":[0,30],"Boston College|Duke":[2,47],"California|NC State":[10,31],"Illinois|Maryland":[20,17]};
const finalOf=g=>FINALS[g.league+":"+g.away+"|"+g.home]||(g.league==="nba"?null:FINALS[g.away+"|"+g.home])||null;
// NBA: hide finished games 24 hours after they end (tip + ~2.5h)
(function(){const D=DATA.nba; if(!D) return; const cut=Date.now()-(24+2.5)*3600e3;
  D.rows=D.rows.filter(r=>!FINALS["nba:"+r.g.away+"|"+r.g.home]);})(); // finished NBA games leave the board (they stay in the record)

// team display helpers (NFL uses abbreviations + nicknames; college uses school names)
// 2026 college records through Oct 12 (CBS Sports standings): [overall, home, away]; "" = not yet available
const CFB_RECORDS={"Air Force":["5-2","3-1","2-1"],"Akron":["1-7","1-2","0-5"],"Alabama":["6-2","4-1","2-1"],"App State":["5-2","3-1","2-1"],"Arizona":["6-1","4-0","2-1"],"Arizona State":["4-3","3-1","0-2"],"Arkansas State":["4-4","3-1","1-3"],"Army":["5-2","3-1","2-1"],"Auburn":["4-3","2-2","1-1"],"BYU":["6-1","4-0","2-1"],"Ball State":["3-5","2-1","1-4"],"Baylor":["4-3","3-1","1-1"],"Boise State":["6-1","3-0","3-1"],"Boston College":["4-3","3-1","1-2"],"Bowling Green":["2-6","1-3","1-3"],"Buffalo":["5-3","4-1","1-2"],"California":["3-5","2-3","1-2"],"Central Michigan":["3-5","3-2","0-3"],"Cincinnati":["5-2","4-0","0-2"],"Clemson":["4-3","3-2","1-1"],"Colorado":["2-5","1-2","1-3"],"Colorado State":["3-4","3-2","0-2"],"Delaware":["3-4","3-1","0-3"],"Duke":["5-2","3-1","2-1"],"East Carolina":["3-4","2-1","1-3"],"Eastern Michigan":["4-5","2-2","2-3"],"Florida Atlantic":["5-2","4-0","1-2"],"Florida International":["3-4","3-1","0-3"],"Georgia State":["4-3","3-0","1-3"],"Georgia Tech":["2-5","2-3","0-2"],"Hawai'i":["2-6","1-3","1-3"],"Houston":["6-2","4-0","2-2"],"Illinois":["4-3","3-2","1-1"],"Indiana":["7-1","4-1","3-0"],"Iowa":["5-2","3-1","2-1"],"Iowa State":["3-4","3-1","0-3"],"James Madison":["7-1","4-0","3-1"],"Kansas":["3-4","3-1","0-2"],"Kansas State":["4-3","4-1","0-2"],"Kennesaw State":["1-6","1-3","0-3"],"Kent State":["3-5","3-1","0-4"],"Kentucky":["7-1","4-1","3-0"],"LSU":["6-2","5-0","1-2"],"Liberty":["6-1","3-0","3-1"],"Louisiana":["5-3","4-0","1-3"],"Louisiana Tech":["5-2","4-0","1-2"],"Marshall":["4-3","3-1","1-2"],"Massachusetts":["4-4","2-2","2-2"],"Memphis":["6-2","4-0","2-2"],"Miami":["7-0","4-0","3-0"],"Miami (OH)":["5-3","3-1","2-1"],"Michigan":["4-3","4-2","0-1"],"Michigan State":["2-6","2-3","0-3"],"Middle Tennessee":["4-3","3-0","1-3"],"Minnesota":["5-2","4-1","1-1"],"Mississippi State":["4-3","2-2","2-1"],"Missouri State":["2-5","2-1","0-4"],"NC State":["3-4","3-1","0-3"],"Navy":["2-5","2-1","0-4"],"Nevada":["3-4","2-2","1-2"],"New Mexico":["6-1","4-0","2-1"],"New Mexico State":["3-4","2-1","1-3"],"North Carolina":["4-3","1-2","2-1"],"North Dakota State":["6-2","4-0","2-2"],"North Texas":["5-2","3-0","2-2"],"Northern Illinois":["0-7","0-3","0-4"],"Northwestern":["6-1","5-0","1-1"],"Ohio":["6-2","4-0","2-2"],"Oklahoma":["4-3","2-1","1-2"],"Oklahoma State":["5-2","4-0","1-2"],"Old Dominion":["2-6","1-3","1-3"],"Ole Miss":["5-2","3-0","1-2"],"Oregon":["4-3","3-1","1-2"],"Pittsburgh":["5-3","4-1","1-2"],"Rice":["1-7","1-3","0-4"],"Rutgers":["2-5","1-3","1-2"],"SMU":["6-1","5-0","1-1"],"Sacramento State":["1-7","1-3","0-4"],"Sam Houston":["1-6","1-3","0-3"],"San Diego State":["3-5","3-1","0-4"],"San José State":["4-4","1-2","3-2"],"South Alabama":["4-3","3-0","1-3"],"South Carolina":["4-3","3-2","1-1"],"Southern Miss":["2-5","2-2","0-3"],"Stanford":["4-4","4-1","0-3"],"Syracuse":["3-4","1-2","2-2"],"TCU":["3-4","2-2","1-1"],"Tennessee":["6-2","4-1","2-1"],"Texas":["5-2","4-1","1-0"],"Texas A&M":["4-4","4-1","0-3"],"Texas State":["4-3","4-1","0-2"],"Texas Tech":["6-1","4-0","2-1"],"Toledo":["6-2","4-1","2-1"],"Troy":["3-4","3-1","0-3"],"Tulane":["3-4","3-1","0-3"],"Tulsa":["4-4","2-2","2-2"],"UCF":["4-3","4-0","0-3"],"UCLA":["7-0","4-0","3-0"],"UConn":["4-3","2-2","2-1"],"UL Monroe":["1-6","0-3","1-3"],"USC":["6-2","4-1","2-1"],"UTSA":["7-1","4-0","3-1"],"Utah":["7-0","5-0","2-0"],"Utah State":["2-5","2-1","0-4"],"Vanderbilt":["3-5","3-2","0-3"],"Virginia":["4-4","4-1","0-2"],"Virginia Tech":["6-2","3-1","3-1"],"Washington State":["1-7","1-3","0-4"],"West Virginia":["5-3","3-2","1-1"],"Western Michigan":["5-3","2-1","3-2"],"Wisconsin":["5-2","4-0","1-1"],"Wyoming":["5-3","4-0","1-3"],"UNLV":["4-3","—","—"],"UTEP":["1-6","—","—"],"Wake Forest":["6-1","—","—"],"Louisville":["4-3","—","—"],"Florida State":["3-4","—","—"],"Oregon State":["5-2","—","—"],"Fresno State":["4-3","—","—"],"Georgia":["6-1","—","—"],"Missouri":["5-2","—","—"],"Florida":["5-2","—","—"],"Arkansas":["3-4","—","—"],"Notre Dame":["6-1","—","—"],"Ohio State":["6-1","—","—"],"Nebraska":["5-2","—","—"],"Washington":["4-3","—","—"],"Purdue":["3-4","—","—"],"Penn State":["3-4","—","—"],"Maryland":["2-5","—","—"],"Georgia Southern":["3-4","—","—"],"Coastal Carolina":["2-5","—","—"],"South Florida":["5-2","—","—"],"UAB":["4-3","—","—"],"Temple":["2-5","—","—"],"Charlotte":["1-6","—","—"],"Jacksonville State":["5-2","—","—"],"Western Kentucky":["3-4","—","—"]};
const rec=(code,i)=>(CFB_RECORDS[code]||[])[i]||"—";

function teamLine(lg,code,at){const t=DATA[lg].teams[code]; return badge(lg,code,34)+`<span class="tn">${at?'<span class="at">@</span>':""}${esc(code)}${lg!=="cfb"?`<small>${esc(t.name)}</small>`:`<small class="num">${esc(rec(code,0))}</small>`}</span>`}
function fullName(lg,code){return lg==="cfb"?code:DATA[lg].teams[code].name}
function shortName(lg,code){return lg==="nfl"?code:code}

function matches(r){
  if(!state.q) return true; const q=state.q.toLowerCase();
  const t=cur().teams; return [r.g.away,r.g.home,t[r.g.away].name,t[r.g.home].name].some(s=>String(s).toLowerCase().includes(q));
}

function header(){
  const d=cur(), L=d.L; let plays=0, strong=0;
  d.rows.forEach(r=>["spread","totals","ml"].forEach(k=>{if(r.p[k].score>=4)plays++; if(r.p[k].score>=8)strong++;}));
  $("#sub").textContent=`${L.label} ${L.weekLabel} · Model vs. Vegas · team data as of ${new Date(L.dataDate+"T12:00").toLocaleDateString(undefined,{month:"short",day:"numeric"})}`;
  $("#meta").innerHTML=`<div><b class="num">${d.rows.length}</b>games</div><div><b class="num">${plays}</b>plays 4+</div><div><b class="num">${strong}</b>strong</div>`;
  $("#foot").textContent=`${L.footer} ${state.lg==="nba"?"Tip":"Kickoff"} times are shown in your time zone. Projections update when new team data and lines are loaded.`;
  const c=L.cfg, isNFL=state.lg==="nfl";
  if(state.lg==="nba"){
    $("#methodList").innerHTML=`
    <li><b>Team ratings.</b> Dunks &amp; Threes team stats: opponent-adjusted offensive and defensive rating (points per 100 possessions) and pace, through ${new Date(L.dataDate+"T12:00").toLocaleDateString(undefined,{month:"short",day:"numeric"})}. Each is measured against the league average (${c.lg.lgO.toFixed(1)} per 100).</li>
    <li><b>Possessions.</b> Expected possessions are the average of both teams' pace. With only a game or two played, each team's pace is pulled heavily toward the league average (${c.lg.lgP.toFixed(1)}) and loosens as games are added.</li>
    <li><b>Raw score.</b> Each team scores (league-average efficiency + its offense − opponent's defense × ${c.regress}) × possessions ÷ 100, plus ${c.hfa / 2} for home court. Totals are then shifted so the slate's average matches the market's.</li>
    <li><b>Blend with Vegas.</b> Margins are ${Math.round(c.wModel*100)}% model / ${Math.round((1-c.wModel)*100)}% market. Totals are ${Math.round(c.wTotal*100)}% model / ${Math.round((1-c.wTotal)*100)}% market, because pace from so few games is noisy.</li>
    <li><b>Probabilities.</b> Cover and win chances use a normal curve around the projection (SD ${c.sdMargin} for margin, ${c.sdTotal} for totals).</li>
    <li><b>Edge Score (0–10).</b> Same scale as football: how far the model's probability clears the break-even for the price. NBA has no key numbers, so there's no 3/7 bump.</li>`;
    $("#methodNote").textContent="Stats from dunksandthrees.com/stats/team. Ratings refreshed Oct 31 (games through Oct 30). Lines from FanDuel Research and other public odds pages on each game day; each tile notes its source when it isn't FanDuel or CBS. Picks lock at the lines shown. Ratings don't know about last-minute injuries or rest days, so check the injury report before betting. This is a statistical model for entertainment and research, not financial advice.";
    return;
  }
  $("#methodList").innerHTML=`
    <li><b>Team ratings.</b> Each offense and defense gets a composite: 45% EPA/play, 30% pass EPA, 25% success rate, measured against the ${isNFL?"NFL":"FBS"} average.${isNFL?"":" College uses CFBD's PPA, which is its version of EPA."} Defense ratings are "allowed," so lower is better.</li>
    <li><b>Raw score.</b> Expected points = ${c.basePts.toFixed(1)} + (offense rating + opponent defense rating) × ${c.plays} plays × ${c.regress}. The ${c.regress} shrinks numbers toward average${isNFL?" this early in the season":" more than the NFL model does, because college stats aren't adjusted for opponent strength"}. Home field is worth ${c.hfa} points${isNFL?" (0.5 for the London game)":""}.${c.calibrateTotals?" The ${c.basePts.toFixed(1)} base is set so the model's average total matches the market's average for this slate.":""}</li>
    <li><b>Blend with Vegas.</b> The final projection is ${Math.round(c.wModel*100)}% EPA model and ${Math.round((1-c.wModel)*100)}% market line, so the model only moves the number where the data clearly disagrees.</li>
    <li><b>Probabilities.</b> Cover and win chances use a normal curve around the projection (SD ${c.sdMargin} for margin, ${c.sdTotal} for totals).</li>
    <li><b>Edge Score (0–10).</b> How far the model's probability clears the break-even for the price. Spreads and totals use −110 (52.4% break-even), with a small bump when the projection crosses 3 or 7. Moneylines use the posted price and are discounted for long shots above +250.</li>`;
  $("#methodNote").textContent=isNFL
    ? "Lines refreshed Oct 29 (VegasInsider consensus). Picks locked earlier in the week stay graded at the line they were locked at. Recheck your book before betting. This is a statistical model for entertainment and research, not financial advice."
    : "Lines refreshed Oct 15 from CBS Sports; kickoff times and TV from FBSchedules. Lines will move, so recheck your book before betting. College stats include games against FCS teams, which flatters some teams. This is a statistical model for entertainment and research, not financial advice.";
}

function bestPlays(){
  const all=[]; cur().rows.filter(matches).filter(r=>!started(r.g)).forEach(r=>["spread","totals","ml"].forEach(k=>{
    if(state.m!=="all"&&state.m!==k)return; const b=r.p[k]; if(b.score>0) all.push({r,k,b});}));
  all.sort((a,b)=>b.b.score-a.b.score);
  const top=all.slice(0,8), lg=state.lg;
  $("#best").innerHTML=top.length?top.map(x=>{const g=x.r.g;
    const team=x.k==="totals"?null:(x.b.pick.startsWith(g.home+" ")?g.home:g.away);
    return `<button class="bp" data-id="${g.id}" aria-label="Open ${esc(g.away)} at ${esc(g.home)}">
      <span class="bp-top">${gauge(x.b.score,x.b.tier,52)}<span class="chip t-${x.b.tier}">${x.b.tier}</span></span>
      <span class="bp-pick">${team?badge(lg,team,22):'<span class="ou">O/U</span>'}<span class="pk">${esc(x.b.pick)}</span></span>
      <span class="lbl">${x.k==="ml"?"Moneyline":MK[x.k]} · ${esc(abbr(lg,g.away))} @ ${esc(abbr(lg,g.home))}</span>
      <span class="lbl">${fmtDay(g.kickoff)} · ${fmtTime(g.kickoff)}</span>
    </button>`;}).join(""):`<div class="empty">No positive edges match.</div>`;
}

function tile(r){
  const {g,p}=r, lg=g.league, aw=p.away>p.home, hw=p.home>p.away, live=started(g), fin=finalOf(g);
  const keys=state.m==="all"?["spread","totals","ml"]:[state.m];
  const heroKey=keys.reduce((a,k)=>p[k].score>p[a].score?k:a,keys[0]), hb=p[heroKey];
  const rest=keys.filter(k=>k!==heroKey);
  const vg=`${abbr(lg,g.home)} ${fmtLine(g.spread)} · O/U ${g.total} · ML ${fmtML(g.mlAway)}/${fmtML(g.mlHome)}`;
  const pa=1-p.ml.pHomeWin, ph=p.ml.pHomeWin, [ca]=colorsOf(lg,g.away), [ch]=colorsOf(lg,g.home);
  const hero=hb.score>0
    ? `<div class="hero" style="--tc:${tierVar(hb.tier)}"><div style="min-width:0"><div class="hk">Best bet · ${heroKey==="ml"?"Moneyline":MK[heroKey]}</div><div class="hp">${esc(hb.pick)}</div><div class="hs">${pct(hb.prob)} to hit · <span class="chip t-${hb.tier}">${hb.tier}</span></div></div>${gauge(hb.score,hb.tier,50)}</div>`
    : `<div class="hero none"><div><div class="hk">${keys.length>1?"No edge on this game":"No edge"}</div><div class="hs">The model agrees with Vegas here.</div></div></div>`;
  const open=OPEN.has(g.id)!==state.collapsed?false:true;
  const label=`${esc(fullName(lg,g.away))} at ${esc(fullName(lg,g.home))}`;
  const peek=hb.score>0
    ? `<span class="peek"><span class="pk">${esc(hb.pick)}</span><span class="pscore num c-${hb.tier}">${hb.score.toFixed(1)}</span></span>`
    : `<span class="peek none">No edge</span>`;
  return `<article class="tile${live?' live':''}${open?' is-open':''}" style="--ca:${ca};--ch:${ch}">
    <button class="tile-main" type="button" data-id="${g.id}" aria-label="${label}, open details">
    <div class="kick">${fin?`<span class="livetag final">Final · ${esc(abbr(lg,g.away))} ${fin[0]}, ${esc(abbr(lg,g.home))} ${fin[1]}</span>`:live?`<span class="livetag">${lg==="nba"?"Tipped off":"Kicked off"}</span>`:`<span class="when">${fmtDay(g.kickoff)} · ${fmtTime(g.kickoff)}</span>`}${netChip(g.tv)}</div>
    <div class="score">
      <div class="team">${teamLine(lg,g.away)}</div><div class="pts" style="${aw?'color:var(--turf)':''}">${p.away.toFixed(1)}</div>
      <div class="team">${teamLine(lg,g.home,true)}</div><div class="pts" style="${hw?'color:var(--turf)':''}">${p.home.toFixed(1)}</div>
    </div>
    <div class="wp" aria-label="Win chance ${esc(g.away)} ${Math.round(pa*100)}%, ${esc(g.home)} ${Math.round(ph*100)}%">
      <span class="num">${Math.round(pa*100)}%</span><span class="wpbar"><i style="width:${(pa*100).toFixed(1)}%;background:${ca}"></i><i style="width:${(ph*100).toFixed(1)}%;background:${ch}"></i></span><span class="num">${Math.round(ph*100)}%</span>
    </div>
    </button>
    <button class="fold" type="button" data-fold="${g.id}" aria-expanded="${open}" aria-controls="more-${g.id}" aria-label="${open?'Hide':'Show'} bets for ${label}">
      ${open?'<span class="peek none">Hide bets</span>':peek}<span class="chev" aria-hidden="true"></span>
    </button>
    <div class="more" id="more-${g.id}"${open?'':' inert'}>
      <button class="tile-more" type="button" data-id="${g.id}" tabindex="${open?0:-1}" aria-label="${label}, open details">
        <div class="vegas num"><abbr title="Vegas" style="text-decoration:none">V</abbr>: ${esc(vg)}</div>
        ${hero}
        ${rest.length?`<div class="picks">${rest.map(k=>{const b=p[k];return `<div class="prow ${b.score===0?'dim':''}"><span class="mk">${MK[k]}</span><span class="pk">${b.score===0?'No edge':esc(b.pick)}<em>${b.score===0?'':pct(b.prob)}</em></span>${esHTML(b)}</div>`}).join("")}</div>`:""}
        <div class="tilefoot"><span class="open">Details ›</span></div>
      </button>
    </div>
  </article>`;
}

// collapse state: tiles start collapsed; OPEN holds the ones that differ from the default
const OPEN=new Set();
function setFold(id,toOpen){
  const art=document.querySelector(`[data-fold="${CSS.escape(id)}"]`)?.closest(".tile"); if(!art) return;
  const differs=toOpen===state.collapsed; differs?OPEN.add(id):OPEN.delete(id);
  const r=[...DATA.nfl.rows,...DATA.cfb.rows,...DATA.nba.rows].find(x=>x.g.id===id);
  const fresh=document.createElement("div"); fresh.innerHTML=tile(r); art.replaceWith(fresh.firstElementChild);
  const btn=document.querySelector(`[data-fold="${CSS.escape(id)}"]`); btn&&btn.focus({preventScroll:true});
}
function syncFoldAll(){ const b=$("#foldAll"); if(!b)return; b.textContent=state.collapsed?"Expand all":"Collapse all"; b.setAttribute("aria-pressed",String(!state.collapsed)); }

function grid(){
  const list=cur().rows.filter(matches);
  const key=r=>state.m==="all"?r.best:r.p[state.m].score;
  if(!list.length){$("#grid").innerHTML=`<div class="empty">No games match "${esc(state.q)}".</div>`;return;}
  if(state.s==="edge"){ list.sort((a,b)=>(started(a.g)-started(b.g))||(key(b)-key(a))); $("#grid").innerHTML=list.map(tile).join(""); return; }
  list.sort((a,b)=>a.g.kickoff-b.g.kickoff);
  let html="", last="";
  list.forEach(r=>{const d=fmtDayLong(r.g.kickoff); if(d!==last){html+=`<div class="daydiv">${d}</div>`;last=d;} html+=tile(r);});
  $("#grid").innerHTML=html;
}

function statRow(label,k,A,H,lowerBetter,digits=3){
  const a=A[k],h=H[k]; const better=lowerBetter?(a<h?'a':'h'):(a>h?'a':'h');
  return `<tr><td>${label}</td><td class="${better==='a'?'good':''}">${a.toFixed(digits)}</td><td class="${better==='h'?'good':''}">${h.toFixed(digits)}</td></tr>`;
}
function mbar(label,off,def){
  const e=off+def; const w=Math.min(50,Math.abs(e)*400); const left=e>=0?50:50-w;
  return `<div class="mbar"><span class="l">${esc(label)}</span><span class="track"><i style="left:${left}%;width:${w}%;background:${e>=0?'var(--strong)':'var(--accent)'}"></i><i style="left:50%;width:1px;background:var(--muted)"></i></span><span class="num">${e>=0?'+':''}${e.toFixed(3)}</span></div>`;
}

function betBlock(k,b,g,p){
  let rows="";
  if(k==="spread"){
    rows=`<dt>Vegas line</dt><dd>${esc(g.home)} ${fmtLine(g.spread)}</dd><dt>Model line</dt><dd>${esc(g.home)} ${fmtLine(+p.spread.modelLine.toFixed(1))}</dd>
    <dt>${g.league==="nba"?"Pure ratings line":"Pure EPA line"}</dt><dd>${esc(g.home)} ${fmtLine(+(-p.rawMargin).toFixed(1))}</dd><dt>Edge</dt><dd>${b.edgePts.toFixed(1)} pts</dd>
    <dt>Cover chance</dt><dd>${pct(b.prob)}</dd><dt>Break-even (−110)</dt><dd>52.4%</dd><dt>EV per $100</dt><dd>${b.ev>=0?'+':'−'}$${Math.abs(b.ev*100).toFixed(2)}</dd>`;
  } else if(k==="totals"){
    rows=`<dt>Vegas total</dt><dd>${g.total}</dd><dt>Model total</dt><dd>${p.total.toFixed(1)}</dd><dt>${g.league==="nba"?"Pure ratings total":"Pure EPA total"}</dt><dd>${p.rawTotal.toFixed(1)}</dd>
    <dt>Edge</dt><dd>${b.edgePts.toFixed(1)} pts</dd><dt>Over / Under chance</dt><dd>${pct(b.pOver)} / ${pct(1-b.pOver)}</dd><dt>EV per $100</dt><dd>${b.ev>=0?'+':'−'}$${Math.abs(b.ev*100).toFixed(2)}</dd>`;
  } else {
    rows=`<dt>${esc(g.away)} price · model win</dt><dd>${fmtML(g.mlAway)} · ${pct(1-b.pHomeWin)}</dd><dt>${esc(g.home)} price · model win</dt><dd>${fmtML(g.mlHome)} · ${pct(b.pHomeWin)}</dd>
    <dt>Vegas no-vig (away / home)</dt><dd>${pct(b.nvAway)} / ${pct(b.nvHome)}</dd><dt>Probability edge</dt><dd>${sgn(b.probEdge*100)} pts</dd>
    <dt>EV per $100</dt><dd>${b.ev>=0?'+':'−'}$${Math.abs(b.ev*100).toFixed(2)}</dd>`;
  }
  return `<div class="bet"><div class="bethead"><span style="min-width:0"><span class="mk note">${k==="ml"?"Moneyline":MK[k]}</span><br><span class="pk">${b.score===0?'No edge':esc(b.pick)}</span></span>
    <span style="text-align:right"><span class="scorebig c-${b.tier}">${b.score.toFixed(1)}</span><br><span class="chip t-${b.tier}">${b.tier}</span></span></div>
    <dl class="kv">${rows}</dl></div>`;
}

function openSheet(id){
  const lg=id.split("-")[0], D=DATA[lg]; const r=D.rows.find(x=>x.g.id===id); if(!r)return;
  const {g,p}=r, A=D.teams[g.away], H=D.teams[g.home], n=D.teamCount;
  const fav=p.margin>0?g.home:g.away;
  const where=[g.venue,g.note].filter(Boolean).map(esc).join(" · ");
  $("#sheet").innerHTML=`<div class="sheethead"><h3 id="sh-title">${esc(g.away)} @ ${esc(g.home)}</h3><button class="x" id="closeBtn" aria-label="Close">×</button></div>
  <div class="note" style="margin-top:8px"><span class="when">${fmtDayLong(g.kickoff)} · ${fmtTime(g.kickoff)}</span> ${netChip(g.tv)}${where?` · ${where}`:""}</div>
  <div class="block"><h4>Projected score</h4>
    <div class="bigscore"><div>${badge(lg,g.away,44)}<div class="t">${esc(fullName(lg,g.away))}</div><div class="n">${p.away.toFixed(1)}</div></div><div class="at">at</div><div>${badge(lg,g.home,44)}<div class="t">${esc(fullName(lg,g.home))}</div><div class="n">${p.home.toFixed(1)}</div></div></div>
    <p class="note" style="text-align:center;margin:8px 0 0">${esc(fav)} by ${Math.abs(p.margin).toFixed(1)} · total ${p.total.toFixed(1)} · ${lg==="nba"?"pure ratings model":"pure EPA model"}: ${esc(g.away)} ${p.rawAway.toFixed(1)}, ${esc(g.home)} ${p.rawHome.toFixed(1)}</p>
  </div>
  <div class="block"><h4>Bets</h4>${["spread","totals","ml"].map(k=>betBlock(k,p[k],g,p)).join("")}</div>
  <div class="block"><h4>Matchup edges</h4>
    <p class="note" style="margin:0 0 6px">Offense rating + opposing defense rating${lg==="nba"?" (per possession)":""}. Right of center favors the offense.</p>
    ${mbar(shortName(lg,g.away)+" off",A.offRating,H.defRating)}${mbar(shortName(lg,g.home)+" off",H.offRating,A.defRating)}
  </div>
  <div class="block"><h4>Team data</h4><div class="tblwrap"><table class="tbl">
    <thead><tr><th></th><th>${esc(g.away)}</th><th>${esc(g.home)}</th></tr></thead><tbody>
    ${lg==="cfb"?`<tr><td>Record</td><td>${esc(rec(g.away,0))}</td><td>${esc(rec(g.home,0))}</td></tr>
    <tr><td>Home record</td><td>${esc(rec(g.away,1))}</td><td>${esc(rec(g.home,1))}</td></tr>
    <tr><td>Away record</td><td>${esc(rec(g.away,2))}</td><td>${esc(rec(g.home,2))}</td></tr>
    <tr><td>Conference</td><td>${esc(A.conf)}</td><td>${esc(H.conf)}</td></tr>`:""}
    ${lg==="nba"?`<tr><td>Adj. net rating</td><td class="${A.net>H.net?'good':''}">${sgn(A.net)}</td><td class="${H.net>A.net?'good':''}">${sgn(H.net)}</td></tr>
    <tr><td>Offense (pts/100)</td><td class="${A.ortg>H.ortg?'good':''}">${sgn(A.ortg)}</td><td class="${H.ortg>A.ortg?'good':''}">${sgn(H.ortg)}</td></tr>
    <tr><td>Defense (pts/100)</td><td class="${A.drtg>H.drtg?'good':''}">${sgn(A.drtg)}</td><td class="${H.drtg>A.drtg?'good':''}">${sgn(H.drtg)}</td></tr>
    <tr><td>Adj. ORTG / DRTG</td><td>${A.aORTG.toFixed(1)} / ${A.aDRTG.toFixed(1)}</td><td>${H.aORTG.toFixed(1)} / ${H.aDRTG.toFixed(1)}</td></tr>
    <tr><td>Pace (rank)</td><td>${A.pace.toFixed(1)} (#${A.paceRank})</td><td>${H.pace.toFixed(1)} (#${H.paceRank})</td></tr>
    <tr><td>Games in sample</td><td>${A.gp}</td><td>${H.gp}</td></tr>`:""}
    <tr><td>Power rank (of ${n})</td><td>#${A.powerRank}</td><td>#${H.powerRank}</td></tr>
    <tr><td>Offense rank</td><td>#${A.offRank}</td><td>#${H.offRank}</td></tr>
    <tr><td>Defense rank</td><td>#${A.defRank}</td><td>#${H.defRank}</td></tr>
    ${lg==="nba"?"":`${statRow(lg==="cfb"?"Off PPA/play":"Off EPA/play","offEPA",A,H,false)}${statRow(lg==="cfb"?"Def PPA/play":"Def EPA/play","defEPA",A,H,true)}
    ${statRow("Off success rate","offSR",A,H,false)}${statRow("Def success rate","defSR",A,H,true)}
    ${statRow(lg==="cfb"?"Off pass PPA":"Off pass EPA","offPass",A,H,false)}${statRow(lg==="cfb"?"Def pass PPA":"Def pass EPA","defPass",A,H,true)}`}
    </tbody></table></div><p class="note" style="margin:8px 0 0">${lg==="nba"?"Green marks the better side. Offense and defense are points per 100 possessions vs. league average; positive is better on both ends. Pace is possessions per 48 minutes.":"Green marks the better side of each stat. Defensive numbers are allowed, so lower is better."}</p></div>`;
  $("#scrim").hidden=false; document.body.style.overflow="hidden";
  $("#closeBtn").focus(); $("#closeBtn").onclick=closeSheet;
}

// ===================== MODEL RECORD (picks rated 6+) =====================
// Locked when published, before kickoff. fa/fh = final away/home score (null until graded).
const PICK_LOG = [{"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-15", "away": "SEA", "home": "DEN", "m": "totals", "side": "under", "line": 40.5, "price": -110, "pick": "Under 40.5", "score": 7.8, "prob": 0.58, "fa": 14, "fh": 17}, {"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-18", "away": "CAR", "home": "PHI", "m": "spread", "side": "away", "line": 1.5, "price": -110, "pick": "CAR +1.5", "score": 9.2, "prob": 0.589, "fa": 25, "fh": 14}, {"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-18", "away": "CHI", "home": "ATL", "m": "totals", "side": "under", "line": 49.5, "price": -110, "pick": "Under 49.5", "score": 10, "prob": 0.603, "fa": 31, "fh": 23}, {"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-18", "away": "NO", "home": "NYG", "m": "spread", "side": "home", "line": 1.5, "price": -110, "pick": "NYG +1.5", "score": 7.2, "prob": 0.575, "fa": 34, "fh": 27}, {"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-18", "away": "NYJ", "home": "NE", "m": "ml", "side": "away", "line": null, "price": 300, "pick": "NYJ +300", "score": 7.3, "prob": 0.319, "fa": 19, "fh": 26}, {"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-18", "away": "TEN", "home": "IND", "m": "ml", "side": "away", "line": null, "price": 265, "pick": "TEN +265", "score": 6.2, "prob": 0.331, "fa": 26, "fh": 20}, {"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-18", "away": "BUF", "home": "LV", "m": "spread", "side": "home", "line": 6, "price": -110, "pick": "LV +6", "score": 8, "prob": 0.581, "fa": 33, "fh": 30}, {"w": "NFL Wk 6", "lg": "nfl", "date": "2026-10-18", "away": "BUF", "home": "LV", "m": "ml", "side": "home", "line": null, "price": 225, "pick": "LV +225", "score": 10, "prob": 0.405, "fa": 33, "fh": 30}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Florida", "home": "Texas", "m": "ml", "side": "away", "line": null, "price": 333, "pick": "Florida +333", "score": 7, "prob": 0.299, "fa": 27, "fh": 24}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Georgia State", "home": "James Madison", "m": "spread", "side": "away", "line": 11.5, "price": -110, "pick": "Georgia State +11.5", "score": 9.4, "prob": 0.591, "fa": 22, "fh": 49}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Georgia State", "home": "James Madison", "m": "ml", "side": "away", "line": null, "price": 360, "pick": "Georgia State +360", "score": 8.8, "prob": 0.304, "fa": 22, "fh": 49}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Northwestern", "home": "Michigan State", "m": "totals", "side": "over", "line": 48.5, "price": -110, "pick": "Over 48.5", "score": 6.3, "prob": 0.569, "fa": 24, "fh": 21}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Ohio State", "home": "Indiana", "m": "ml", "side": "home", "line": null, "price": 150, "pick": "Indiana +150", "score": 6.5, "prob": 0.459, "fa": 19, "fh": 15}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Charlotte", "home": "Temple", "m": "spread", "side": "away", "line": 21.5, "price": -110, "pick": "Charlotte +21.5", "score": 7.7, "prob": 0.579, "fa": 38, "fh": 31}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Massachusetts", "home": "Buffalo", "m": "spread", "side": "away", "line": 6.5, "price": -110, "pick": "Massachusetts +6.5", "score": 10, "prob": 0.593, "fa": 18, "fh": 25}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Massachusetts", "home": "Buffalo", "m": "ml", "side": "away", "line": null, "price": 215, "pick": "Massachusetts +215", "score": 10, "prob": 0.427, "fa": 18, "fh": 25}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Northern Illinois", "home": "Wyoming", "m": "totals", "side": "over", "line": 40.5, "price": -110, "pick": "Over 40.5", "score": 8.4, "prob": 0.584, "fa": 23, "fh": 41}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Alabama", "home": "Tennessee", "m": "ml", "side": "home", "line": null, "price": 275, "pick": "Tennessee +275", "score": 8.6, "prob": 0.346, "fa": 10, "fh": 26}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Akron", "home": "Miami (OH)", "m": "totals", "side": "over", "line": 47.5, "price": -110, "pick": "Over 47.5", "score": 6.2, "prob": 0.568, "fa": 14, "fh": 34}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Kent State", "home": "South Florida", "m": "spread", "side": "away", "line": 20.5, "price": -110, "pick": "Kent State +20.5", "score": 10, "prob": 0.597, "fa": 2, "fh": 29}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Arkansas State", "home": "Southern Miss", "m": "ml", "side": "home", "line": null, "price": 220, "pick": "Southern Miss +220", "score": 8.1, "prob": 0.386, "fa": 23, "fh": 13}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Louisville", "home": "Syracuse", "m": "spread", "side": "home", "line": 14.5, "price": -110, "pick": "Syracuse +14.5", "score": 10, "prob": 0.612, "fa": 34, "fh": 26}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Louisville", "home": "Syracuse", "m": "ml", "side": "home", "line": null, "price": 500, "pick": "Syracuse +500", "score": 8.3, "prob": 0.257, "fa": 34, "fh": 26}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Notre Dame", "home": "BYU", "m": "spread", "side": "home", "line": 10, "price": -110, "pick": "BYU +10", "score": 6.2, "prob": 0.568, "fa": 24, "fh": 28}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Notre Dame", "home": "BYU", "m": "ml", "side": "home", "line": null, "price": 300, "pick": "BYU +300", "score": 7.2, "prob": 0.318, "fa": 24, "fh": 28}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Ohio", "home": "Sacramento State", "m": "spread", "side": "home", "line": 14, "price": -110, "pick": "Sacramento State +14", "score": 9.5, "prob": 0.592, "fa": 48, "fh": 7}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Ohio", "home": "Sacramento State", "m": "ml", "side": "home", "line": null, "price": 455, "pick": "Sacramento State +455", "score": 6.4, "prob": 0.251, "fa": 48, "fh": 7}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Wake Forest", "home": "California", "m": "ml", "side": "home", "line": null, "price": 290, "pick": "California +290", "score": 6.5, "prob": 0.318, "fa": 41, "fh": 7}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Nebraska", "home": "Oregon", "m": "spread", "side": "away", "line": 7.5, "price": -110, "pick": "Nebraska +7.5", "score": 8.8, "prob": 0.584, "fa": 14, "fh": 17}, {"w": "CFB Wk 7", "lg": "cfb", "date": "2026-10-17", "away": "Nebraska", "home": "Oregon", "m": "ml", "side": "away", "line": null, "price": 240, "pick": "Nebraska +240", "score": 10, "prob": 0.393, "fa": 14, "fh": 17}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-25", "away": "IND", "home": "MIN", "m": "totals", "side": "under", "line": 41.5, "price": -110, "pick": "Under 41.5", "score": 10, "prob": 0.629, "fa": 10, "fh": 16}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-25", "away": "NYG", "home": "HOU", "m": "ml", "side": "away", "line": null, "price": 355, "pick": "NYG +355", "score": 9.9, "prob": 0.316, "fa": 27, "fh": 21}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-25", "away": "LA", "home": "LV", "m": "ml", "side": "home", "line": null, "price": 200, "pick": "LV +200", "score": 7.3, "prob": 0.4, "fa": 35, "fh": 21}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-26", "away": "DAL", "home": "PHI", "m": "totals", "side": "over", "line": 44.5, "price": -110, "pick": "Over 44.5", "score": 6.2, "prob": 0.568, "fa": 38, "fh": 21}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-22", "away": "James Madison", "home": "App State", "m": "ml", "side": "home", "price": 340, "pick": "App State +340", "score": 7.9, "prob": 0.305, "fa": 31, "fh": 34}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-22", "away": "East Carolina", "home": "Memphis", "m": "totals", "side": "under", "line": 54.5, "price": -110, "pick": "Under 54.5", "score": 6.5, "prob": 0.571, "fa": 34, "fh": 41}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-23", "away": "Massachusetts", "home": "UConn", "m": "spread", "side": "away", "line": 15.5, "price": -110, "pick": "Massachusetts +15.5", "score": 10, "prob": 0.618, "fa": 16, "fh": 35}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-23", "away": "Massachusetts", "home": "UConn", "m": "ml", "side": "away", "price": 575, "pick": "Massachusetts +575", "score": 8.2, "prob": 0.242, "fa": 16, "fh": 35}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-23", "away": "NC State", "home": "Stanford", "m": "ml", "side": "home", "price": 240, "pick": "Stanford +240", "score": 7.2, "prob": 0.36, "fa": 28, "fh": 31}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-24", "away": "Pittsburgh", "home": "Miami", "m": "spread", "side": "away", "line": 20.5, "price": -110, "pick": "Pittsburgh +20.5", "score": 7.5, "prob": 0.578, "fa": 23, "fh": 52}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-24", "away": "Texas Tech", "home": "Cincinnati", "m": "spread", "side": "home", "line": 10.5, "price": -110, "pick": "Cincinnati +10.5", "score": 6.1, "prob": 0.567, "fa": 24, "fh": 37}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-24", "away": "Texas Tech", "home": "Cincinnati", "m": "ml", "side": "home", "price": 340, "pick": "Cincinnati +340", "score": 8, "prob": 0.306, "fa": 24, "fh": 37}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-24", "away": "Baylor", "home": "Kansas", "m": "totals", "side": "under", "line": 54.5, "price": -110, "pick": "Under 54.5", "score": 8, "prob": 0.581, "fa": 24, "fh": 25}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-24", "away": "Oregon", "home": "Illinois", "m": "spread", "side": "home", "line": 10, "price": -110, "pick": "Illinois +10", "score": 6.8, "prob": 0.573, "fa": 10, "fh": 21}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-24", "away": "Oregon", "home": "Illinois", "m": "ml", "side": "home", "price": 320, "pick": "Illinois +320", "score": 8.8, "prob": 0.322, "fa": 10, "fh": 21}, {"w": "CFB Wk 8", "lg": "cfb", "date": "2026-10-24", "away": "Louisiana", "home": "Southern Miss", "m": "ml", "side": "home", "price": 320, "pick": "Southern Miss +320", "score": 6.2, "prob": 0.299, "fa": 31, "fh": 35}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-21", "away": "CHA", "home": "BKN", "m": "ml", "side": "away", "line": null, "price": -108, "pick": "CHA -108", "score": 9.3, "prob": 0.604, "fa": 110, "fh": 103}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-21", "away": "GSW", "home": "LAL", "m": "spread", "side": "away", "line": 6.5, "price": -110, "pick": "GSW +6.5", "score": 6.8, "prob": 0.572, "fa": 105, "fh": 127}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-22", "away": "NE", "home": "CHI", "m": "totals", "side": "under", "line": 50.5, "price": -110, "pick": "Under 50.5", "score": 6.8, "prob": 0.573, "locked": "2026-10-22", "fa": 24, "fh": 30}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-25", "away": "NYG", "home": "HOU", "m": "spread", "side": "away", "line": 10.5, "price": -110, "pick": "NYG +10.5", "score": 8.4, "prob": 0.584, "locked": "2026-10-22", "fa": 27, "fh": 21}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-25", "away": "DEN", "home": "ARI", "m": "ml", "side": "home", "line": null, "price": 190, "pick": "ARI +190", "score": 7.4, "prob": 0.412, "locked": "2026-10-22", "fa": 30, "fh": 16}, {"w": "NFL Wk 7", "lg": "nfl", "date": "2026-10-25", "away": "KC", "home": "SEA", "m": "ml", "side": "away", "line": null, "price": 130, "pick": "KC +130", "score": 6.3, "prob": 0.492, "locked": "2026-10-22", "fa": 3, "fh": 20}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-24", "away": "SAS", "home": "DAL", "m": "spread", "side": "home", "line": 11.5, "price": -110, "pick": "DAL +11.5", "score": 7.1, "prob": 0.575, "fa": 122, "fh": 106}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-24", "away": "GSW", "home": "PHX", "m": "spread", "side": "away", "line": 8.5, "price": -110, "pick": "GSW +8.5", "score": 10, "prob": 0.603, "fa": 122, "fh": 131}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-26", "away": "DAL", "home": "MIA", "m": "spread", "side": "away", "line": 8.5, "price": -110, "pick": "DAL +8.5", "score": 7, "prob": 0.574, "fa": 113, "fh": 109}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-27", "away": "Sam Houston", "home": "Missouri State", "m": "ml", "side": "away", "line": null, "price": 185, "pick": "Sam Houston +185", "score": 6, "prob": 0.406, "locked": "2026-10-27", "fa": 3, "fh": 24}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-28", "away": "CHA", "home": "DET", "m": "totals", "side": "over", "line": 215.5, "price": -110, "pick": "Over 215.5", "score": 7, "prob": 0.574, "locked": "2026-10-28", "fa": 89, "fh": 97}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-29", "away": "Florida Atlantic", "home": "North Texas", "m": "totals", "side": "under", "line": 77.5, "price": -110, "pick": "Under 77.5", "score": 10, "prob": 0.601, "locked": "2026-10-29", "fa": 41, "fh": 48}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-29", "away": "Troy", "home": "James Madison", "m": "spread", "side": "away", "line": 19.5, "price": -110, "pick": "Troy +19.5", "score": 9.1, "prob": 0.589, "locked": "2026-10-29", "fa": 24, "fh": 21}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-30", "away": "Tulane", "home": "Charlotte", "m": "ml", "side": "home", "line": null, "price": 275, "pick": "Charlotte +275", "score": 7.4, "prob": 0.336, "locked": "2026-10-29", "fa": 38, "fh": 31}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-30", "away": "Kent State", "home": "Sacramento State", "m": "ml", "side": "home", "line": null, "price": 245, "pick": "Sacramento State +245", "score": 7.8, "prob": 0.361, "locked": "2026-10-29", "fa": 10, "fh": 31}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Notre Dame", "home": "Navy", "m": "spread", "side": "home", "line": 30.5, "price": -110, "pick": "Navy +30.5", "score": 10, "prob": 0.656, "locked": "2026-10-29", "fa": 35, "fh": 13}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Michigan", "home": "Rutgers", "m": "spread", "side": "home", "line": 15.5, "price": -110, "pick": "Rutgers +15.5", "score": 8.5, "prob": 0.585, "locked": "2026-10-29"}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Stanford", "home": "Louisville", "m": "spread", "side": "away", "line": 22.5, "price": -110, "pick": "Stanford +22.5", "score": 9.8, "prob": 0.594, "locked": "2026-10-29"}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Minnesota", "home": "Indiana", "m": "spread", "side": "away", "line": 20.5, "price": -110, "pick": "Minnesota +20.5", "score": 7.9, "prob": 0.58, "locked": "2026-10-29"}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "New Mexico", "home": "San José State", "m": "spread", "side": "home", "line": 14.5, "price": -110, "pick": "San José State +14.5", "score": 7.2, "prob": 0.575, "locked": "2026-10-29"}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Nevada", "home": "UCLA", "m": "spread", "side": "away", "line": 22.5, "price": -110, "pick": "Nevada +22.5", "score": 10, "prob": 0.596, "locked": "2026-10-29"}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Oklahoma State", "home": "Iowa State", "m": "ml", "side": "home", "line": null, "price": 290, "pick": "Iowa State +290", "score": 6, "prob": 0.314, "locked": "2026-10-29"}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Mississippi State", "home": "Texas", "m": "spread", "side": "away", "line": 20.5, "price": -110, "pick": "Mississippi State +20.5", "score": 10, "prob": 0.617, "locked": "2026-10-29"}, {"w": "CFB Wk 9", "lg": "cfb", "date": "2026-10-31", "away": "Missouri", "home": "Arkansas", "m": "ml", "side": "home", "line": null, "price": 310, "pick": "Arkansas +310", "score": 6.4, "prob": 0.305, "locked": "2026-10-29"}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-30", "away": "IND", "home": "MIA", "m": "spread", "side": "away", "line": 7.5, "price": -110, "pick": "IND +7.5", "score": 6.8, "prob": 0.572, "locked": "2026-10-30", "fa": 125, "fh": 145}, {"w": "NFL Wk 8", "lg": "nfl", "date": "2026-11-01", "away": "ATL", "home": "TB", "m": "totals", "side": "under", "line": 44.5, "price": -110, "pick": "Under 44.5", "score": 10, "prob": 0.618, "locked": "2026-10-30"}, {"w": "NFL Wk 8", "lg": "nfl", "date": "2026-11-01", "away": "LAC", "home": "LA", "m": "totals", "side": "under", "line": 45.5, "price": -110, "pick": "Under 45.5", "score": 10, "prob": 0.604, "locked": "2026-10-30"}, {"w": "NFL Wk 8", "lg": "nfl", "date": "2026-11-02", "away": "CHI", "home": "SEA", "m": "totals", "side": "under", "line": 46.5, "price": -110, "pick": "Under 46.5", "score": 9.3, "prob": 0.59, "locked": "2026-10-30"}, {"w": "NBA Wk 1", "lg": "nba", "date": "2026-10-31", "away": "MIN", "home": "SAS", "m": "spread", "side": "away", "line": 12.5, "price": -110, "pick": "MIN +12.5", "score": 9.9, "prob": 0.595, "locked": "2026-10-31"}];

function gradePick(x){
  if(x.fa==null||x.fh==null) return null;
  const pickedPts=x.side==="home"?x.fh:x.fa, oppPts=x.side==="home"?x.fa:x.fh;
  let d;
  if(x.m==="spread") d=pickedPts-oppPts+x.line;
  else if(x.m==="totals") d=x.side==="over"?(x.fa+x.fh)-x.line:x.line-(x.fa+x.fh);
  else d=pickedPts-oppPts;
  return d>0?"W":d<0?"L":"P";
}
function unitsFor(x,r){ if(r==="W") return mlPayout(x.price); if(r==="L") return -1; return 0; }
function tally(list){
  const t={W:0,L:0,P:0,pend:0,units:0,risked:0};
  list.forEach(x=>{const r=gradePick(x); if(!r){t.pend++;return;} t[r]++; t.units+=unitsFor(x,r); if(r!=="P") t.risked+=1;});
  t.graded=t.W+t.L; t.pct=t.graded?t.W/t.graded:null; t.roi=t.risked?t.units/t.risked:null; return t;
}
const fmtU=u=>(u>0?"+":u<0?"−":"")+Math.abs(u).toFixed(2)+"u";
function statBox(label,t){
  const rec=`${t.W}-${t.L}${t.P?"-"+t.P:""}`;
  const u=t.units===0?"0.00u":fmtU(t.units);
  const bits=[t.graded?`${(t.pct*100).toFixed(1)}%`:"",t.pend?`${t.pend} pending`:""].filter(Boolean).join(" · ");
  return `<div class="stat"><div class="k">${label}</div><div class="v num">${rec} <span class="${t.units>0?'pos':t.units<0?'neg':''}" style="font-size:18px">${u}</span></div><div class="s">${bits||"&nbsp;"}</div></div>`;
}
function openRecord(grp){
  grp=grp||(state.lg==="nba"?"nba":"fb");
  const LOG=PICK_LOG.filter(x=>grp==="nba"?x.lg==="nba":x.lg!=="nba");
  const all=tally(LOG);
  const by=(f)=>LOG.filter(f);
  const gk=x=>grp==="nba"?x.date:x.w; // NBA groups by game date, football by week
  const weeks=[...new Set(LOG.map(gk))];
  // current weeks (any pick still pending) on top, newest first; finished weeks below, collapsed
  const wkT=Object.fromEntries(weeks.map(w=>[w,tally(by(x=>gk(x)===w))]));
  const nflFirst=(a,b)=>(a.startsWith("NFL")?0:1)-(b.startsWith("NFL")?0:1);
  const ordered=grp==="nba"
    ? [...weeks.filter(w=>wkT[w].pend).sort(),...weeks.filter(w=>!wkT[w].pend).sort().reverse()]
    : [...weeks.filter(w=>wkT[w].pend).reverse().sort(nflFirst),...weeks.filter(w=>!wkT[w].pend).reverse().sort(nflFirst)];
  const wkLabel=w=>grp==="nba"?new Date(w+"T12:00").toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"}):w;
  const rows=ordered.map(w=>{
    const items=by(x=>gk(x)===w).sort((a,b)=>b.score-a.score), t=wkT[w];
    const sum=[t.graded||t.P?`${t.W}-${t.L}${t.P?"-"+t.P:""} <span class="num ${t.units>0?'pos':t.units<0?'neg':''}">${t.units===0?"0.00u":fmtU(t.units)}</span>`:"",t.pend?`${t.pend} pending`:""].filter(Boolean).join(" · ");
    return `<details class="wk"${t.pend?" open":""}><summary><span class="wkhead">${esc(wkLabel(w))}</span><span class="wksum">${sum}</span><span class="wkchev" aria-hidden="true"></span></summary><div class="plog">${items.map(x=>{
      const r=gradePick(x);
      const chip=r?`<span class="res res-${r}">${r}</span>`:`<span class="res res-pending">—</span>`;
      const fin=r?` · Final ${esc(x.away)} ${x.fa}, ${esc(x.home)} ${x.fh}`:"";
      const u=r?` <span class="num ${unitsFor(x,r)>=0?'pos':'neg'}">${fmtU(unitsFor(x,r))}</span>`:"";
      return `<div class="row">${chip}<div style="min-width:0"><div class="pk">${esc(x.pick)}${u}</div><div class="sub">${MK[x.m]==="ML"?"Moneyline":MK[x.m]} · ${esc(x.away)} @ ${esc(x.home)}${fin}</div></div><span class="scorebig c-${tier(x.score)}" style="font-size:18px">${x.score.toFixed(1)}</span></div>`;}).join("")}</div></details>`;
  }).join("");
  $("#sheet").innerHTML=`<div class="sheethead"><h3 id="sh-title">${grp==="nba"?"NBA record":"Football record"}</h3><button class="x" id="closeBtn" aria-label="Close">×</button></div>
  <div class="rgsw" role="group" aria-label="Which record"><button type="button" data-rg="fb" aria-pressed="${grp==="fb"}">Football</button><button type="button" data-rg="nba" aria-pressed="${grp==="nba"}">NBA</button></div>
  <p class="note" style="margin:8px 0 0">${grp==="nba"?"NBA picks are tracked separately from football. ":""}Every pick rated 6.0 or higher, locked before ${grp==="nba"?"tip-off":"kickoff"}. Spreads and totals graded at −110; moneylines at the posted price. 1 unit risked per pick.</p>
  <div class="block"><h4>Overall</h4><div class="recgrid">
    ${statBox("All 6+ picks",all)}
    <div class="stat"><div class="k">Units</div><div class="v num ${all.units>=0?'pos':'neg'}">${all.graded?fmtU(all.units):"—"}</div><div class="s">ROI ${all.roi!=null?(all.roi*100).toFixed(1)+"%":"—"}</div></div>
    <div class="stat"><div class="k">Pending</div><div class="v num">${all.pend}</div><div class="s">of ${LOG.length} picks</div></div>
  </div></div>
  <div class="block"><h4>By bet type</h4><div class="recgrid">${statBox("Spread",tally(by(x=>x.m==="spread")))}${statBox("Total",tally(by(x=>x.m==="totals")))}${statBox("Moneyline",tally(by(x=>x.m==="ml")))}</div></div>
  <div class="block"><h4>${grp==="nba"?"By rating":"By rating and league"}</h4><div class="recgrid">${statBox("Strong 8+",tally(by(x=>x.score>=8)))}${statBox("Solid 6–7.9",tally(by(x=>x.score<8)))}${grp==="nba"?"":statBox("NFL",tally(by(x=>x.lg==="nfl")))+statBox("CFB",tally(by(x=>x.lg==="cfb")))}</div></div>
  <div class="block"><h4>Pick history</h4>${rows||'<p class="note">No picks yet.</p>'}</div>`;
  $("#scrim").hidden=false; document.body.style.overflow="hidden";
  $("#closeBtn").focus(); $("#closeBtn").onclick=closeSheet;
  document.querySelectorAll("[data-rg]").forEach(b=>b.onclick=()=>{openRecord(b.dataset.rg); const t=document.querySelector(`[data-rg="${b.dataset.rg}"]`); t&&t.focus();});
}
$("#recBtn").onclick=()=>openRecord();
function closeSheet(){$("#scrim").hidden=true;document.body.style.overflow="";}
$("#scrim").addEventListener("click",e=>{if(e.target.id==="scrim")closeSheet()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#scrim").hidden)closeSheet()});
document.addEventListener("click",e=>{
  const f=e.target.closest("[data-fold]"); if(f){const id=f.dataset.fold; setFold(id,f.getAttribute("aria-expanded")!=="true"); return;}
  const t=e.target.closest("[data-id]");if(t&&!t.closest(".sheet"))openSheet(t.dataset.id)});
$("#foldAll").onclick=()=>{state.collapsed=!state.collapsed; OPEN.clear(); syncFoldAll(); try{localStorage.setItem("geb-state",JSON.stringify({lg:state.lg,m:state.m,s:state.s,collapsed:state.collapsed}))}catch(e){} grid();};
document.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{state.m=b.dataset.m;render()});
document.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{state.s=b.dataset.s;render()});
document.querySelectorAll("[data-lg]").forEach(b=>b.onclick=()=>{state.lg=b.dataset.lg;state.q="";$("#q").value="";render()});
$("#q").addEventListener("input",e=>{state.q=e.target.value.trim();bestPlays();grid();});

function render(){
  document.querySelectorAll("[data-lg]").forEach(b=>b.setAttribute("aria-selected",b.dataset.lg===state.lg));
  document.querySelectorAll("[data-m]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===state.m));
  document.querySelectorAll("[data-s]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.s===state.s));
  try{localStorage.setItem("geb-state",JSON.stringify({lg:state.lg,m:state.m,s:state.s,collapsed:state.collapsed}))}catch(e){}
  syncFoldAll();
  header(); bestPlays(); grid();
}

// ----- theme toggle -----
const rootEl=document.documentElement;
function effectiveTheme(){
  const t=rootEl.getAttribute("data-theme");
  if(t==="dark"||t==="light") return t;
  return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
}
function syncThemeBtn(){
  const next=effectiveTheme()==="dark"?"light":"dark";
  $("#themeLbl").textContent=next==="dark"?"Dark":"Light";
  $("#themeBtn").setAttribute("aria-label",`Switch to ${next} mode`);
}
try{const saved=localStorage.getItem("geb-theme"); if(saved==="dark"||saved==="light") rootEl.setAttribute("data-theme",saved);}catch(e){}
$("#themeBtn").onclick=()=>{
  const next=effectiveTheme()==="dark"?"light":"dark";
  rootEl.setAttribute("data-theme",next);
  try{localStorage.setItem("geb-theme",next)}catch(e){}
  syncThemeBtn();
};
if(window.matchMedia) try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",syncThemeBtn)}catch(e){}
syncThemeBtn();

render();
