// ===== DATA (swap weekly) =====
const DATA_DATE = "2026-10-13";
const WEEK = 6;
const CSV = `#,Team,Off EPA/play,Def EPA/play,Off SR,Def SR,Off Pass EPA,Def Pass EPA
1,SF,0.19635372240640708,-0.015827378482511572,0.5342237061769616,0.4429223744292237,0.3183062437341843,0.0363739288899915
2,CIN,0.15619330682668084,0.014954910521291165,0.5161290322580645,0.4635658914728682,0.25536207872563377,0.02816366832187111
3,DAL,0.1455294584525899,0.1255433115225754,0.507227332457293,0.4891304347826087,0.20840132955182938,0.1857181829663659
4,DET,0.13325745494806476,0.06540241639207968,0.509090909090909,0.46038863976083705,0.21697698167874632,0.12705884462986852
5,BUF,0.13223349624081174,-0.004994507345071933,0.48114630467571645,0.4535768645357686,0.18645037732294778,0.0055398167320180325
6,KC,0.1321638239482971,-0.07621809976929453,0.49291338582677163,0.4070121951219512,0.18338318946616403,-0.05324734296921581
7,JAX,0.09686526701554984,-0.08004100892178881,0.4696485623003195,0.4110929853181077,0.18206852091001965,-0.04490257063937005
8,LA,0.08228018616978772,-0.07745328630846574,0.5057636887608069,0.4066115702479339,0.12040392432344058,-0.053348872002416364
9,HOU,0.06243951349812967,0.0033139571716283346,0.4325153374233129,0.4166666666666667,0.16171362352172172,0.03337652273281475
10,CHI,0.03209688727652972,-0.04562852336955338,0.4646892655367232,0.4169611307420495,0.08929756346011712,-0.036255905437258595
11,CAR,0.03111325482598385,0.036267181254813596,0.436046511627907,0.44165435745937964,0.062038562744388244,0.0906899018631021
12,NE,0.026331537830867748,0.053548941570851626,0.4538216560509554,0.45032051282051283,0.10599700569707475,0.12320343527926969
13,DEN,0.024432404547162553,-0.0018864907298656085,0.41346153846153844,0.4226950354609929,0.07285685041559434,0.008221159048510293
14,GB,0.017258158713772172,-0.017504852744718996,0.40752351097178685,0.45870206489675514,0.1245816970397503,-0.0003096843773780927
15,NYJ,0.01266727020530191,0.09102508882185019,0.46735905044510384,0.49358059914407987,0.05556146035595349,0.1690062950741594
16,LV,0.011734016559703204,0.0857571066381612,0.43447293447293445,0.5041666666666667,0.09938654154013848,0.16140488028466618
17,NYG,0.01114751067204892,-0.008262726462944344,0.4270833333333333,0.4301412872841444,0.08842690561677047,0.02624003872586035
18,BAL,0.004816595064963363,0.03070647330837405,0.45534407027818447,0.455988455988456,0.03434792625483027,0.07058163636076026
19,WAS,0.002506620455436616,0.04134684329149752,0.43343653250773995,0.47166921898928027,0.041512327382442496,0.09369930631054514
20,PIT,-0.007258929724919633,-0.019572499075789295,0.42194744976816073,0.4320388349514563,-0.04514598682157797,0.027040292592924276
21,SEA,-0.012464623659176883,-0.06827763993840312,0.43956043956043955,0.3848684210526316,0.08919536073895407,-0.05556806569855394
22,NO,-0.028205389457132173,0.0490106513191405,0.4281524926686217,0.4670750382848392,0.025474894738520507,0.09174751756985167
23,ARI,-0.036089443084997806,0.12235510362269664,0.43472222222222223,0.4630681818181818,-0.0268275608401314,0.28535619036886184
24,CLE,-0.03658023022931212,-0.006819541305657928,0.4254658385093168,0.4230769230769231,0.017369098092262815,0.009725064608492087
25,TEN,-0.04162245257799269,0.11679141953708264,0.4504201680672269,0.4956521739130435,-0.04035701505393917,0.23552150821479143
26,TB,-0.06049184200635695,-0.07655925547230057,0.41935483870967744,0.43602693602693604,-0.09641905151267592,-0.07576110613854257
27,MIA,-0.06328762873675485,0.05956185471292546,0.38666666666666666,0.48111658456486045,-0.04477012088127505,0.12898892456451774
28,ATL,-0.0677914138697021,0.034677250570086214,0.4297253634894992,0.4539969834087481,-0.12580960238917258,0.08223720284602941
29,PHI,-0.08619868256762808,0.055245284575036316,0.36129032258064514,0.43731778425655976,-0.06948205916276651,0.10380015744482526
30,MIN,-0.08835670915837085,-0.08612882718332758,0.40894039735099336,0.38943894389438943,-0.08133865171860698,-0.0807285243794541
31,IND,-0.11009053026994291,0.04271174104794335,0.41260744985673353,0.43085880640465796,-0.18743786778942542,0.08235219834983061
32,LAC,-0.11831786474659042,0.045643091134650225,0.40217391304347827,0.4520766773162939,-0.11669801749208972,0.09365311378330025`;

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
