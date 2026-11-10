// ===== DATA (swap weekly) =====
const DATA_DATE = "2026-10-13";
const WEEK = 6;
const CSV = `#,Team,Off EPA/play,Def EPA/play,Off SR,Def SR,Off Pass EPA,Def Pass EPA
1,SF,0.16250509020092616,-0.06524045609189584,0.5247933884297521,0.43333333333333335,0.28795749057098363,0.02444659863161309
2,CIN,0.14587313896777956,0.005302307017075672,0.5090180360721442,0.4480769230769231,0.2654723412099787,0.0347174906667487
3,BUF,0.1441908390091064,0.018473945933558077,0.4783427495291902,0.45660377358490567,0.25970500523680573,0.07156414970889573
4,KC,0.12121738783719918,-0.05691398438180252,0.48406374501992033,0.4109848484848485,0.1524586010354008,0.01626354090106265
5,JAX,0.11543782182526868,-0.10920909993559015,0.463768115942029,0.4110429447852761,0.23524150094374088,-0.06678658235454171
6,DAL,0.11252910762189508,0.10068787725154237,0.470873786407767,0.4628099173553719,0.19285374261553212,0.186756971468053
7,DET,0.10641681299939053,0.08651349906936935,0.48880597014925375,0.4438305709023941,0.2373231640148926,0.17659676691134163
8,HOU,0.06364420041098212,0.02319391081599397,0.43653846153846154,0.4143126177024482,0.18683883317206196,0.09026595500491677
9,LA,0.041476755012192855,-0.08831890038046424,0.4806451612903226,0.41228070175438597,0.0801132797018021,-0.03024128262966898
10,GB,0.04146887223918251,-0.04964378387340682,0.4065180102915952,0.44426229508196724,0.19836889994576665,-0.02527360539094607
11,NE,0.04019326916652187,0.044037040805678225,0.4543859649122807,0.43884892086330934,0.1616518492402475,0.15097740604702684
12,CHI,0.0382601316368201,-0.05400048400586094,0.4714946070878274,0.402020202020202,0.11219979001162501,-0.0265248199616
13,CAR,0.03135554421456325,0.04984582291554413,0.42727272727272725,0.44990892531876137,0.08857905502776671,0.12662510715486494
14,LV,0.01660515117532089,0.08156684861021136,0.4372822299651568,0.4789915966386555,0.1622134956891629,0.18940910695280921
15,NYG,0.016520780592279422,-0.02365318577682233,0.41404805914972276,0.40718562874251496,0.12395064773723087,0.03689349391498824
16,DEN,0.007671193763265599,-0.010151411330451988,0.4014466546112116,0.4166666666666667,0.07912149675433187,0.010942101572165736
17,NYJ,0.0004308140681246513,0.057946237318486866,0.44669117647058826,0.47189097103918226,0.0920172134274456,0.19533599902253124
18,PIT,-0.011050865335785986,-0.06833790897947467,0.4274661508704062,0.42147117296222664,-0.06932734551872496,-0.017400703610715218
19,BAL,-0.017891334815452048,0.02014339771544204,0.43636363636363634,0.4454225352112676,0.03991446379893489,0.09345148717078518
20,ARI,-0.01893013634085678,0.08644854526730113,0.44038155802861684,0.43672014260249553,0.012512264344598885,0.28409081152965976
21,WAS,-0.02194079622284369,0.02888591951394329,0.41050583657587547,0.4605263157894737,0.04427488915168814,0.08383116046216753
22,NO,-0.028163162365232024,0.06172827527662331,0.4233576642335766,0.4732824427480916,0.03432807568673225,0.12482282547976545
23,SEA,-0.03551884747303333,-0.08342981351504544,0.41680960548885077,0.39162112932604737,0.09996338971098995,-0.05489776155546609
24,CLE,-0.06644472497478923,-0.017291410391626887,0.4194107452339688,0.42710120068610635,0.02046692148532592,-0.0073463948784946555
25,ATL,-0.06717959463243783,0.000004341016251101826,0.43327239488117003,0.44407345575959933,-0.11434838930569764,0.05554382956515393
26,MIA,-0.06740360634171993,0.1089316707079541,0.391578947368421,0.48523206751054854,-0.015123724094448732,0.25382287263118036
27,TEN,-0.08301216332201435,0.06102982810135699,0.416135881104034,0.463898916967509,-0.06725943316536272,0.1777926549796297
28,TB,-0.10319072671327122,-0.15860476085510308,0.4099485420240137,0.4033457249070632,-0.16539765687429844,-0.14452776687510777
29,PHI,-0.1153635770581919,0.07718503025375663,0.36203866432337434,0.4373983739837398,-0.08717341549284344,0.15685947958485347
30,IND,-0.11836362991391616,0.0497387788501949,0.4230118443316413,0.427797833935018,-0.18915760900819933,0.10090039835194493
31,MIN,-0.15582267889807633,-0.16645899444286766,0.36886993603411516,0.368,-0.12556305226817288,-0.18298466481603898
32,LAC,-0.21888047416566256,0.00558031329629249,0.36242884250474383,0.4397590361445783,-0.18671456224840452,0.07415479353182533
`;

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
