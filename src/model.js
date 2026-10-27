// ===== DATA (swap weekly) =====
const DATA_DATE = "2026-10-13";
const WEEK = 6;
const CSV = `#,Team,Off EPA/play,Def EPA/play,Off SR,Def SR,Off Pass EPA,Def Pass EPA
1,BUF,0.21027236816807446,0.14805043834811768,0.4920212765957447,0.48729792147806006,0.33759369769079894,0.26546184034227305
2,SF,0.1537665229697017,-0.040242737303939964,0.5265700483091788,0.4360086767895879,0.26573095754827863,0.0659581125147478
3,DET,0.14378135307112158,0.14874116375169588,0.49877750611246946,0.46206896551724136,0.30906720662693254,0.24211835838996676
4,DAL,0.1421326998190845,0.13976450279075323,0.48822269807280516,0.47516198704103674,0.202899941973101,0.27413159599118514
5,JAX,0.11707224271538237,-0.016188881115402648,0.4679144385026738,0.42780748663101603,0.22666436688417776,0.06360517457714145
6,CIN,0.10807016467482856,-0.03381902193204475,0.4864864864864865,0.4360313315926893,0.20635869398991616,-0.0012349591062750028
7,KC,0.10392844363012842,-0.045868758182843875,0.46612466124661245,0.40987654320987654,0.12264228504052098,0.024975473442017202
8,BAL,0.07091449359307624,0.019016615018377512,0.4617117117117117,0.4377880184331797,0.18600719334714536,0.07832175938164593
9,LA,0.05889303672849812,-0.04245970206172803,0.4898373983739837,0.4288888888888889,0.1172139859196146,0.018875211173374557
10,NE,0.05215222255637064,0.01710482318714522,0.4501108647450111,0.43559718969555034,0.21511724019442652,0.07679653430527768
11,CHI,0.05188593338436791,-0.018184344238761307,0.47024952015355087,0.4098360655737705,0.15373295735700504,0.024734415740932932
12,CAR,0.046252110009397204,0.022088727398725506,0.43099273607748184,0.43734643734643736,0.11262612666697602,0.06357320252184064
13,HOU,0.030806617478224392,0.04893064090875944,0.4336283185840708,0.41956521739130437,0.13803229446681173,0.10619351204637191
14,NYG,0.027393633077048223,0.013239277510252914,0.42947368421052634,0.43187066974595845,0.1182895199466424,0.08224030790783045
15,LV,0.018837556026602986,0.04043624537250818,0.43103448275862066,0.47071583514099785,0.16805000860507185,0.14163620160424617
16,NYJ,0.011425071411567253,0.01563574135732293,0.44844124700239807,0.45336225596529284,0.11891556401570423,0.1407258826147722
17,GB,-0.001009459850323705,-0.02917402943196046,0.38752783964365256,0.4570230607966457,0.13307750781877403,0.019663766470377222
18,WAS,-0.007642403435313429,0.0665588475734517,0.41265822784810124,0.4755784061696658,0.06928655916887967,0.1445841317234365
19,ARI,-0.023611968782121406,0.10519703596196031,0.4457831325301205,0.4447058823529412,0.021007288744914403,0.291994409580772
20,PIT,-0.02898298343271481,-0.040768115714038364,0.4226579520697168,0.41935483870967744,-0.06317176575354214,0.013151571261452366
21,NO,-0.03086635770219733,0.08064080763242071,0.41983122362869196,0.4911894273127753,0.04094689813066369,0.1219712073374647
22,ATL,-0.03766524250978239,-0.022063444523206032,0.4444444444444444,0.43388429752066116,-0.06951075797671499,0.026305858502836205
23,DEN,-0.03956981456013859,-0.051619464289375035,0.37857142857142856,0.39641434262948205,-0.004334016458202547,-0.05070614146002312
24,CLE,-0.039709337656397,-0.037401385476779604,0.4269406392694064,0.4190687361419069,0.03914539035655325,0.0053922588700733385
25,SEA,-0.041681492862778495,-0.11777610465446318,0.42358078602620086,0.36533957845433257,0.1033228217827239,-0.06987630743293448
26,MIA,-0.049383449841349965,0.12719001118910409,0.3983050847457627,0.49303621169916434,-0.005428235176840755,0.29820755529988796
27,IND,-0.06339912341115228,0.03222200480040994,0.4252136752136752,0.42417061611374407,-0.13009145714958048,0.08424732632052331
28,TB,-0.08141742937356325,-0.10553994173083547,0.40919037199124725,0.4131455399061033,-0.12972073355771407,-0.07773732289519306
29,PHI,-0.08637642695468419,0.10412462472281805,0.3726851851851852,0.45918367346938777,-0.054877005101362834,0.17499872898007893
30,MIN,-0.09864660125669704,-0.22036990237198195,0.3665768194070081,0.3380281690140845,-0.028652737969704814,-0.22589593505237548
31,TEN,-0.12429347523322418,0.04483834554416579,0.4015151515151515,0.44490644490644493,-0.12329320783520785,0.13880861956383628
32,LAC,-0.20884786673264574,-0.034353870297025274,0.3686868686868687,0.43351063829787234,-0.19141793841622995,0.012694479623335166`;

// Lines: spread is HOME team's line (negative = home favored). hfa: home-field points.
const GAMES = [
  {id:1, day:"Thu", time:"8:15 PM ET", tv:"Prime", away:"SEA", home:"DEN", spread:2.5, total:40.5, mlAway:-148, mlHome:124, venue:"Empower Field at Mile High", hfa:1.5},
  {id:2, day:"Sun", time:"9:30 AM ET", tv:"NFLN", away:"HOU", home:"JAX", spread:-2.5, total:42.5, mlAway:123, mlHome:-146, venue:"Wembley Stadium, London", hfa:0.5, note:"London — treated as near-neutral site"},
  {id:3, day:"Sun", time:"1:00 PM ET", tv:"CBS", away:"BAL", home:"CLE", spread:4.5, total:41.5, mlAway:-235, mlHome:190, venue:"Huntington Bank Field", hfa:1.5},
  {id:4, day:"Sun", time:"1:00 PM ET", tv:"FOX", away:"CAR", home:"PHI", spread:-1.5, total:40.5, mlAway:-105, mlHome:-115, venue:"Lincoln Financial Field", hfa:1.5},
  {id:5, day:"Sun", time:"1:00 PM ET", tv:"FOX", away:"CHI", home:"ATL", spread:3, total:49.5, mlAway:-178, mlHome:149, venue:"Mercedes-Benz Stadium", hfa:1.5},
  {id:6, day:"Sun", time:"1:00 PM ET", tv:"FOX", away:"NO", home:"NYG", spread:1.5, total:45.5, mlAway:-115, mlHome:-105, venue:"MetLife Stadium", hfa:1.5},
  {id:7, day:"Sun", time:"1:00 PM ET", tv:"CBS", away:"NYJ", home:"NE", spread:-7.5, total:43.5, mlAway:300, mlHome:-380, venue:"Gillette Stadium", hfa:1.5},
  {id:8, day:"Sun", time:"1:00 PM ET", tv:"CBS", away:"PIT", home:"TB", spread:2.5, total:40.5, mlAway:-152, mlHome:127, venue:"Raymond James Stadium", hfa:1.5},
  {id:9, day:"Sun", time:"1:00 PM ET", tv:"CBS", away:"TEN", home:"IND", spread:-7, total:44, mlAway:265, mlHome:-330, venue:"Lucas Oil Stadium", hfa:1.5},
  {id:10, day:"Sun", time:"4:05 PM ET", tv:"FOX", away:"ARI", home:"LA", spread:-13, total:52.5, mlAway:600, mlHome:-900, venue:"SoFi Stadium", hfa:1.5},
  {id:11, day:"Sun", time:"4:25 PM ET", tv:"CBS", away:"BUF", home:"LV", spread:6, total:53.5, mlAway:-275, mlHome:225, venue:"Allegiant Stadium", hfa:1.5},
  {id:12, day:"Sun", time:"4:25 PM ET", tv:"CBS", away:"LAC", home:"KC", spread:-8.5, total:42.5, mlAway:340, mlHome:-440, venue:"GEHA Field at Arrowhead", hfa:1.5},
  {id:13, day:"Sun", time:"8:20 PM ET", tv:"NBC", away:"DAL", home:"GB", spread:-3, total:51.5, mlAway:142, mlHome:-170, venue:"Lambeau Field", hfa:1.5},
  {id:14, day:"Mon", time:"8:15 PM ET", tv:"ABC/ESPN", away:"WAS", home:"SF", spread:-7.5, total:50.5, mlAway:330, mlHome:-420, venue:"Levi's Stadium", hfa:1.5},
];

// ===== MODEL =====
const CFG = {
  basePts: 22.0,     // league-average points per team
  plays: 62,         // offensive plays per team-game
  regress: 0.55,     // keep 55% of observed EPA signal (early-season shrink)
  sdMargin: 13.5,    // SD of NFL margin vs projection
  sdTotal: 13.0,     // SD of NFL total vs projection
  srScale: 2.4,      // converts success-rate deviation into EPA-like units
  wModel: 0.40,      // weight on pure EPA model vs Vegas when building final projection
};

function parseCSV(csv){
  const rows = csv.trim().split(/\r?\n/).slice(1).map(l=>l.split(","));
  const t = {};
  rows.forEach(r=>{ t[r[1]] = {rank:+r[0], team:r[1], offEPA:+r[2], defEPA:+r[3], offSR:+r[4], defSR:+r[5], offPass:+r[6], defPass:+r[7]}; });
  return t;
}
const mean = a => a.reduce((s,x)=>s+x,0)/a.length;

function buildRatings(teams){
  const T = Object.values(teams);
  const m = k => mean(T.map(t=>t[k]));
  const avg = {offEPA:m("offEPA"), defEPA:m("defEPA"), offSR:m("offSR"), defSR:m("defSR"), offPass:m("offPass"), defPass:m("defPass")};
  T.forEach(t=>{
    // composite: overall EPA (45%), pass EPA (30%), success rate (25%) — all as deviations from league avg
    t.offRating = 0.45*(t.offEPA-avg.offEPA) + 0.30*(t.offPass-avg.offPass)*0.65 + 0.25*(t.offSR-avg.offSR)*CFG.srScale;
    t.defRating = 0.45*(t.defEPA-avg.defEPA) + 0.30*(t.defPass-avg.defPass)*0.65 + 0.25*(t.defSR-avg.defSR)*CFG.srScale; // positive = bad defense
    t.net = t.offRating - t.defRating;
  });
  // power ranks
  [...T].sort((a,b)=>b.net-a.net).forEach((t,i)=>t.powerRank=i+1);
  [...T].sort((a,b)=>b.offRating-a.offRating).forEach((t,i)=>t.offRank=i+1);
  [...T].sort((a,b)=>a.defRating-b.defRating).forEach((t,i)=>t.defRank=i+1);
  return avg;
}

// normal CDF
function Phi(x){ const t=1/(1+0.2316419*Math.abs(x)); const d=0.3989423*Math.exp(-x*x/2);
  let p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274)))); return x>0?1-p:p; }
const mlToProb = ml => ml<0 ? -ml/(-ml+100) : 100/(ml+100);
const mlPayout = ml => ml<0 ? 100/-ml : ml/100; // profit per 1 unit
const evOf = (p, ml) => p*mlPayout(ml) - (1-p);

// edge score 0–10 from EV (and a little from point edge)
// Edge Score 0–10: how far the model's win/cover probability clears the price's break-even.
function edgeScore(p, breakeven, mult, bonus){
  const s = (p - breakeven)*100*mult + (bonus||0);
  return Math.max(0, Math.min(10, +s.toFixed(1)));
}
function tier(s){ return s>=8?"Strong":s>=6?"Solid":s>=4?"Lean":s>0?"Thin":"Pass"; }

function crossesKey(a,b){ // does the interval between projected and market margin cross 3 or 7?
  const lo=Math.min(Math.abs(a),Math.abs(b)), hi=Math.max(Math.abs(a),Math.abs(b));
  let k=0; if (lo<3 && hi>3) k+=0.6; if (lo<7 && hi>7) k+=0.4; return k;
}

function project(g, teams){
  const A = teams[g.away], H = teams[g.home];
  const ptsPer = CFG.plays*CFG.regress;
  const awayE = A.offRating + H.defRating, homeE = H.offRating + A.defRating;
  const rawAway0=0;
  let away = CFG.basePts + awayE*ptsPer - g.hfa/2;
  let home = CFG.basePts + homeE*ptsPer + g.hfa/2;
  const rawAway=+away.toFixed(1), rawHome=+home.toFixed(1);
  // raw EPA model
  const rawMargin = home - away, rawTotal = home + away;
  // blend with market (market is sharp; model gets weight W)
  const mktMarginRaw = -g.spread;
  const margin = CFG.wModel*rawMargin + (1-CFG.wModel)*mktMarginRaw;
  const total  = CFG.wModel*rawTotal  + (1-CFG.wModel)*g.total;
  away = total/2 - margin/2; home = total/2 + margin/2;

  // --- spread ---
  const mktMargin = -g.spread;               // market expected home margin
  const sEdge = margin - mktMargin;          // + => home side value
  const sideHome = sEdge>=0;
  const pHomeCover = 1 - Phi((mktMargin - margin)/CFG.sdMargin);
  const pCover = sideHome ? pHomeCover : 1-pHomeCover;
  const sEV = evOf(pCover, -110);
  const sScore = edgeScore(pCover, 0.5238, 1.4, crossesKey(margin, mktMargin));
  const spreadPick = sideHome ? `${g.home} ${fmtLine(g.spread)}` : `${g.away} ${fmtLine(-g.spread)}`;

  // --- total ---
  const tEdge = total - g.total;
  const pOver = 1 - Phi((g.total - total)/CFG.sdTotal);
  const isOver = tEdge>=0; const pT = isOver?pOver:1-pOver;
  const tEV = evOf(pT, -110);
  const tScore = edgeScore(pT, 0.5238, 1.4, 0);
  const totalPick = `${isOver?"Over":"Under"} ${g.total}`;

  // --- moneyline ---
  const pHomeWin = Phi(margin/CFG.sdMargin);
  const ih = mlToProb(g.mlHome), ia = mlToProb(g.mlAway), vig = ih+ia;
  const nvHome = ih/vig, nvAway = ia/vig;
  const evH = evOf(pHomeWin, g.mlHome), evA = evOf(1-pHomeWin, g.mlAway);
  const mlHome = evH>=evA; const mlEV = Math.max(evH,evA);
  const mlProbEdge = mlHome ? pHomeWin-nvHome : (1-pHomeWin)-nvAway;
  const mlPrice = mlHome?g.mlHome:g.mlAway;
  const longshot = mlPrice>250 ? (mlPrice-250)/150 : 0;
  const mScore = edgeScore(mlHome?pHomeWin:1-pHomeWin, mlToProb(mlPrice), 1.1, -longshot);
  const mlPick = mlHome ? `${g.home} ${fmtML(g.mlHome)}` : `${g.away} ${fmtML(g.mlAway)}`;

  return {
    away:+away.toFixed(1), home:+home.toFixed(1), margin, total, rawAway, rawHome, rawMargin, rawTotal,
    awayE, homeE,
    spread:{pick:spreadPick, edgePts:Math.abs(sEdge), prob:pCover, ev:sEV, score:sScore, tier:tier(sScore), modelLine:-margin},
    totals:{pick:totalPick, edgePts:Math.abs(tEdge), prob:pT, ev:tEV, score:tScore, tier:tier(tScore), pOver},
    ml:{pick:mlPick, prob:mlHome?pHomeWin:1-pHomeWin, implied:mlHome?nvHome:nvAway, probEdge:mlProbEdge, ev:mlEV, score:mScore, tier:tier(mScore), pHomeWin, nvHome, nvAway, evH, evA},
  };
}
function fmtLine(x){ return x===0?"PK":(x>0?"+":"")+x; }
function fmtML(x){ return (x>0?"+":"")+x; }

if (typeof module!=="undefined"){
  const teams=parseCSV(CSV); buildRatings(teams);
  GAMES.forEach(g=>{ const p=project(g,teams);
    console.log(`${g.away}@${g.home} ${p.away}-${p.home} tot ${p.total.toFixed(1)} | mkt ${g.spread}/${g.total} | SP ${p.spread.pick} ${p.spread.edgePts.toFixed(1)}pt ${(p.spread.prob*100).toFixed(1)}% s${p.spread.score} | TOT ${p.totals.pick} ${p.totals.edgePts.toFixed(1)} s${p.totals.score} | ML ${p.ml.pick} ${(p.ml.prob*100).toFixed(1)} vs ${(p.ml.implied*100).toFixed(1)} ev${(p.ml.ev*100).toFixed(1)} s${p.ml.score}`);});
  Object.values(teams).sort((a,b)=>a.powerRank-b.powerRank).forEach(t=>console.log(t.powerRank,t.team,t.net.toFixed(3),t.offRank,t.defRank));
}
