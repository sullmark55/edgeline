// ===== DATA (swap weekly) =====
const DATA_DATE = "2026-10-13";
const WEEK = 6;
const CSV = `#,Team,Off EPA/play,Def EPA/play,Off SR,Def SR,Off Pass EPA,Def Pass EPA
1,MIN,-0.09896573633940714,-0.18943698901844805,0.3767772511848341,0.3608490566037736,-0.024303212634075762,-0.20988417618861155
2,TB,-0.0912556446891079,-0.14827613039293921,0.4108527131782946,0.40083507306889354,-0.15091511172297886,-0.13540888750085506
3,LA,0.04670518719799077,-0.08149214198474028,0.48717948717948717,0.4137254901960784,0.09429238207800164,-0.02472955404838787
4,JAX,0.12378356990060954,-0.0810030793456358,0.4649532710280374,0.4226327944572748,0.2284065070219952,-0.02291047897496656
5,SEA,-0.05017810059309545,-0.0769900154568299,0.4153846153846154,0.3870967741935484,0.07436191654834473,-0.044642531175799825
6,PIT,-0.011050865335785986,-0.06833790897947467,0.4274661508704062,0.42147117296222664,-0.06932734551872496,-0.017400703610715218
7,GB,0.009692027274600718,-0.04383691182380212,0.3996138996138996,0.44343065693430656,0.14208230302210056,-0.004502326474394563
8,SF,0.1537804535094327,-0.040242737303939964,0.5265700483091788,0.4360086767895879,0.26575498772931466,0.0659581125147478
9,LAC,-0.2306093897161571,-0.038119528120929336,0.35964912280701755,0.4372093023255814,-0.21026668996059472,-0.008727152551155097
10,ATL,-0.08728997122702672,-0.03786161065394658,0.4288659793814433,0.43278084714548803,-0.13786335336235883,0.006336637617547557
11,CHI,0.06633206832902344,-0.031911118151036734,0.47627118644067795,0.40186915887850466,0.15236378001049813,0.006362946933601242
12,DEN,-0.018040327035891788,-0.025800598474902858,0.3875,0.4087719298245614,0.03128899045466238,-0.013155784014391372
13,KC,0.11340097400935703,-0.022832004141981978,0.47139588100686497,0.4150537634408602,0.14369582523832578,0.05723626756204505
14,CLE,-0.06720571181515778,-0.01822815880749088,0.4280078895463511,0.4243614931237721,0.004260129061401924,-0.007132163039502211
15,CIN,0.1178989649911842,-0.006181655310666194,0.5033860045146726,0.44541484716157204,0.23501135336004075,0.034472593467989136
16,NE,0.05742173997687415,0.010852774543292993,0.4547244094488189,0.43584521384928715,0.21447761990455955,0.08110324304427183
17,NYG,0.027393633077048223,0.013239277510252914,0.42947368421052634,0.43187066974595845,0.1182895199466424,0.08224030790783045
18,BAL,0.017183567537134927,0.01688957091272353,0.4493927125506073,0.4444444444444444,0.09298310110686898,0.07662736360370948
19,CAR,0.01858575577165831,0.030386196748570998,0.4194214876033058,0.4432773109243697,0.07263033836836673,0.08511833743037545
20,WAS,-0.005499534039415378,0.03308461415712058,0.4118942731277533,0.4650655021834061,0.06108264483005548,0.1003684967429265
21,NYJ,0.04088994736097696,0.04352401964323147,0.4553014553014553,0.45977011494252873,0.1432839931495044,0.192626108160311
22,IND,-0.11136713771521628,0.047882426822858974,0.42125237191650855,0.4264705882352941,-0.18709810513831324,0.09708906532387589
23,HOU,0.030806617478224392,0.04893064090875944,0.4336283185840708,0.41956521739130437,0.13803229446681173,0.10619351204637191
24,TEN,-0.08301216332201435,0.06102982810135699,0.416135881104034,0.463898916967509,-0.06725943316536272,0.1777926549796297
25,LV,0.04619445235120904,0.06389508384520504,0.44,0.4742857142857143,0.21241062625648838,0.16141154009791087
26,NO,-0.03086635770219733,0.08064080763242071,0.41983122362869196,0.4911894273127753,0.04094689813066369,0.1219712073374647
27,BUF,0.17466714151966448,0.08511073915684009,0.4901098901098901,0.4720496894409938,0.2956528815276601,0.17381186913948007
28,ARI,-0.007449888550740628,0.08657130454482875,0.4409722222222222,0.43775100401606426,0.027035398346683736,0.27761236180194987
29,PHI,-0.09592619183629482,0.09388529511336079,0.3772455089820359,0.453551912568306,-0.06888436112695229,0.15582188007897171
30,DET,0.11865398620150701,0.12250361021191872,0.49581589958158995,0.4609053497942387,0.2635241257980247,0.21808526529038924
31,MIA,-0.046547340775100574,0.12334328257744537,0.4043062200956938,0.49278846153846156,0.013749002092650715,0.28793578988634166
32,DAL,0.1199624818426001,0.1334169860265963,0.4759259259259259,0.4658040665434381,0.2013353834989621,0.23927207354309502`;

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
