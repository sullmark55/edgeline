// ===== DATA (swap weekly) =====
const DATA_DATE = "2026-10-13";
const WEEK = 6;
const CSV = `#,Team,Off EPA/play,Def EPA/play,Off SR,Def SR,Off Pass EPA,Def Pass EPA
1,SF,0.18036649239454236,-0.007591399366247285,0.5218978102189781,0.4440677966101695,0.29829864630032804,0.07042418642457403
2,CIN,0.16452504420635528,0.0024032554823476293,0.5115452930728241,0.4438687392055268,0.2720286795859009,0.023578390393922215
3,BUF,0.14290144266291008,0.011834487063523615,0.47863247863247865,0.45166666666666666,0.22228062202311374,0.046377741280612325
4,JAX,0.11891688581464831,-0.07576098229661839,0.4694244604316547,0.41208791208791207,0.2509344963616289,-0.039168951834040386
5,DAL,0.11671526316866303,0.12407527255407771,0.4799426934097421,0.4678624813153961,0.1828294843353419,0.20552350806949607
6,KC,0.11555134803234596,-0.07236580893983093,0.48056537102473496,0.405,0.15680790741633002,-0.03412901142660492
7,DET,0.10562060097738224,0.05449374509651378,0.4867549668874172,0.4425956738768719,0.2003534155110072,0.12540571947122575
8,LA,0.07006283016537129,-0.09179346428749326,0.484149855907781,0.4066115702479339,0.11686346739701267,-0.05403933716440865
9,HOU,0.05515027503742827,0.02394363781308897,0.424190800681431,0.4180602006688963,0.1570723062766701,0.0718326264231244
10,CHI,0.04093243414376659,-0.030264602632330922,0.4714946070878274,0.4080808080808081,0.10186347060202834,-0.002794232442058048
11,NYG,0.027482825756415974,0.004496361497620177,0.4231404958677686,0.43033509700176364,0.11626218225610577,0.060666642541621296
12,CAR,0.025446286174550633,0.026935194161769926,0.41935483870967744,0.43300653594771243,0.06296833303892263,0.10042689627156054
13,NE,0.02332233151112127,0.05616848671936035,0.445859872611465,0.4439102564102564,0.11575211007180139,0.1353059211179372
14,GB,0.016370096931711393,-0.022687581588749502,0.40282131661442006,0.443952802359882,0.14015545415284925,0.00231681774121324
15,DEN,0.012708838750158958,-0.00006546975166477414,0.40325497287522605,0.4166666666666667,0.0729993535504364,0.021442220343552355
16,LV,0.002940286164394324,0.07457715561765457,0.4296998420221169,0.4776579352850539,0.11563023697670306,0.17186146307419972
17,PIT,0.0000746996768401478,-0.005172924159541105,0.4253472222222222,0.43915343915343913,-0.043398104713670116,0.05497339895007037
18,WAS,-0.004650161886046069,0.03841610811736314,0.42758620689655175,0.4597315436241611,0.048918296721980684,0.08541069544475888
19,BAL,-0.006988338836399803,0.023328798104095022,0.43527508090614886,0.4432,0.0390332602303054,0.08080545210649319
20,NYJ,-0.012213676628161368,0.08190219182556342,0.44788273615635177,0.4711388455538221,0.04206878381684112,0.1824301598575192
21,SEA,-0.014103530689565349,-0.07175227894840142,0.4207221350078493,0.3815789473684211,0.10496620159789309,-0.05633500379648073
22,NO,-0.029023845514097944,0.0488688342279223,0.41407528641571195,0.4612794612794613,0.04145612288142765,0.09119476038351292
23,CLE,-0.03529701625066165,-0.006326617036136412,0.41770186335403725,0.41384615384615386,0.027733006253063956,0.01598632690239989
24,ARI,-0.035470463500432106,0.10100095967179536,0.4397590361445783,0.4503937007874016,-0.017398507027031985,0.2731088049764544
25,MIA,-0.050877746008379104,0.059651922397294554,0.39226519337016574,0.4689265536723164,-0.0067328028531535205,0.15324367499361682
26,TEN,-0.0611968849754682,0.08116730661127913,0.4147727272727273,0.46730462519936206,-0.045838984602880786,0.20176111122758522
27,ATL,-0.07455397358873493,0.025379420018252077,0.42164781906300486,0.44042232277526394,-0.12015761001833353,0.08056623680801342
28,TB,-0.07817739730944452,-0.11687707686471138,0.4065180102915952,0.4033457249070632,-0.12890997900476148,-0.10141557947994578
29,PHI,-0.07983912835562672,0.07258300818946523,0.36203866432337434,0.43902439024390244,-0.04792305582666235,0.14418920617119899
30,MIN,-0.1001064957766858,-0.13846419244711253,0.37988826815642457,0.3783783783783784,-0.06689499014797841,-0.14447227297774073
31,IND,-0.1028706719687143,0.03166854226163935,0.4228395061728395,0.41961414790996787,-0.17491248642562227,0.07095526595077474
32,LAC,-0.15888624018602032,0.01007259758809709,0.363013698630137,0.4381625441696113,-0.1388062944213833,0.05903203266992368
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
