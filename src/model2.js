// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-10-29","20:15","CAR","GB",-3.5,47.5,165,-200,"Prime"],
  ["2026-11-01","13:00","IND","JAX",-7.5,46.5,325,-410,"CBS"],
  ["2026-11-01","13:00","TEN","CIN",-10.5,46.5,450,-600,"CBS"],
  ["2026-11-01","13:00","CLE","PIT",-3.5,38.5,165,-200,"CBS"],
  ["2026-11-01","13:00","BAL","BUF",-3.5,53.5,158,-188,"CBS"],
  ["2026-11-01","13:00","LV","NYJ",-1.5,44.5,-107,-113,"CBS"],
  ["2026-11-01","13:00","MIN","DET",-3.5,46.5,141,-166,"FOX"],
  ["2026-11-01","13:00","ATL","TB",-1.5,46.5,114,-134,"FOX"],
  ["2026-11-01","13:00","ARI","DAL",-6.5,53.5,240,-300,"FOX"],
  ["2026-11-01","16:05","LAC","LA",-6.5,43.5,250,-310,"CBS"],
  ["2026-11-01","16:25","NE","MIA",7.5,44.5,-380,300,"FOX"],
  ["2026-11-01","16:25","KC","DEN",1.5,41.5,-125,105,"FOX"],
  ["2026-11-01","20:20","PHI","WAS",-3.5,40.5,163,-180,"NBC"],
  ["2026-11-02","20:15","CHI","SEA",-3.5,46.5,152,-182,"ABC/ESPN"],
];
const NFL_VENUES={GB:"Lambeau Field",JAX:"EverBank Stadium",CIN:"Paycor Stadium",PIT:"Acrisure Stadium",BUF:"Highmark Stadium",NYJ:"MetLife Stadium",DET:"Ford Field",TB:"Raymond James Stadium",DAL:"AT&T Stadium",LA:"SoFi Stadium",MIA:"Hard Rock Stadium",DEN:"Empower Field at Mile High",WAS:"Northwest Stadium",SEA:"Lumen Field"};

const CFB_GAMES = [
  ["2026-10-27", "19:00", "Delaware", "Western Kentucky", 1.5, 57.5, -125, 105, "CBSSN"],
  ["2026-10-27", "20:00", "Sam Houston", "Missouri State", -5.5, 51.5, 185, -225, "ESPN2"],
  ["2026-10-28", "19:00", "Kennesaw State", "Middle Tennessee", -3, 49.5, 114, -135, "CBSSN"],
  ["2026-10-28", "20:00", "Jacksonville State", "New Mexico State", 3, 49.5, -142, 120, "ESPN2"],
  ["2026-10-29", "19:30", "Florida Atlantic", "North Texas", -10.5, 72.5, 350, -455, "ESPN"],
  ["2026-10-29", "19:30", "Troy", "James Madison", -19.5, 52.5, 900, -1600, "ESPN2"],
  ["2026-10-30", "19:00", "Tulane", "Charlotte", 11.5, 46.5, -500, 380, "ESPN2"],
  ["2026-10-30", "19:30", "Baylor", "UCF", -1.5, 47.5, 110, -130, "ESPN"],
  ["2026-10-30", "22:30", "Kent State", "Sacramento State", 10.5, 46.5, -440, 340, "ESPN2"],
  ["2026-10-31", "12:00", "SMU", "Syracuse", 10, 57.5, -345, 275, "ESPN2"],
  ["2026-10-31", "12:00", "California", "NC State", -8.5, 56.5, 235, -290, "ACCN"],
  ["2026-10-31", "12:00", "Boston College", "Duke", -7, 47.5, 210, -258, "The CW"],
  ["2026-10-31", "12:00", "Notre Dame", "Navy", 30.5, 52.5, -9000, 2500, "ABC", {"venue": "Gillette Stadium, Foxborough", "hfa": 0, "note": "Neutral site"}],
  ["2026-10-31", "12:00", "UAB", "South Florida", -9.5, 46.5, 270, -340, "ESPNU"],
  ["2026-10-31", "12:00", "Arizona", "Texas Tech", -4.5, 55.5, 145, -175, "ESPN"],
  ["2026-10-31", "12:00", "Illinois", "Maryland", 3, 52.5, -142, 120, "FS1"],
  ["2026-10-31", "12:00", "Wisconsin", "Iowa", -3.5, 38.5, 130, -155, "FOX"],
  ["2026-10-31", "12:00", "Bowling Green", "Western Michigan", -15.5, 43.5, 525, -750, "CBSSN"],
  ["2026-10-31", "12:30", "Michigan", "Rutgers", 14, 47.5, -625, 455, "BTN"],
  ["2026-10-31", "12:45", "Auburn", "Ole Miss", -12.5, 55.5, 350, -455, "SECN"],
  ["2026-10-31", "13:00", "Marshall", "Old Dominion", 3, 46.5, -142, 120, "ESPN+"],
  ["2026-10-31", "14:00", "Kansas State", "Colorado", 2.5, 48.5, -125, 105, "TNT/truTV"],
  ["2026-10-31", "14:00", "Coastal Carolina", "Georgia State", -6.5, 57.5, 180, -218, "ESPN+"],
  ["2026-10-31", "15:00", "Temple", "East Carolina", -4.5, 49.5, 145, -175, "ESPN+"],
  ["2026-10-31", "15:00", "UConn", "Air Force", -3, 55.5, 130, -155, "MW+"],
  ["2026-10-31", "15:00", "Louisiana Tech", "South Alabama", 4.5, 56.5, -180, 150, "ESPN+"],
  ["2026-10-31", "15:15", "Stanford", "Louisville", -21, 61.5, 850, -1450, "ACCN"],
  ["2026-10-31", "15:30", "Florida", "Georgia", -10.5, 56.5, 330, -425, "ABC", {"venue": "Mercedes-Benz Stadium, Atlanta", "hfa": 0, "note": "Neutral site"}],
  ["2026-10-31", "15:30", "Northwestern", "Oregon", -3.5, 50.5, 130, -155, "Peacock"],
  ["2026-10-31", "15:30", "Arizona State", "BYU", -14.5, 50.5, 455, -625, "FOX"],
  ["2026-10-31", "15:30", "Minnesota", "Indiana", -19.5, 42.5, 900, -1600, "CBS"],
  ["2026-10-31", "15:30", "Florida International", "Liberty", -11.5, 44.5, 330, -425, "CBSSN"],
  ["2026-10-31", "15:30", "Kansas", "TCU", -4.5, 48.5, 150, -180, "FS1"],
  ["2026-10-31", "15:45", "Utah", "Cincinnati", 7, 55.5, -250, 205, "ESPN"],
  ["2026-10-31", "15:45", "Virginia", "Wake Forest", -13.5, 49.5, 380, -500, "ESPN2"],
  ["2026-10-31", "16:00", "New Mexico", "San José State", 14.5, 41.5, -625, 455, "NBCS Bay"],
  ["2026-10-31", "16:15", "South Carolina", "Oklahoma", -3.5, 44.5, 130, -155, "SECN"],
  ["2026-10-31", "16:15", "Nevada", "UCLA", -22.5, 46.5, 1100, -2100, "BTN"],
  ["2026-10-31", "16:15", "Purdue", "Penn State", -8.5, 52.5, 245, -305, "BTN"],
  ["2026-10-31", "18:30", "App State", "Georgia Southern", -3.5, 54.5, 136, -162, "ESPN+"],
  ["2026-10-31", "19:00", "Clemson", "Florida State", -5.5, 50.5, 164, -198, "ACCN"],
  ["2026-10-31", "19:00", "Oklahoma State", "Iowa State", 10, 56.5, -380, 300, "FS1"],
  ["2026-10-31", "19:30", "Ohio State", "USC", 7, 50.5, -245, 200, "NBC"],
  ["2026-10-31", "19:30", "Miami", "North Carolina", 16.5, 51.5, -800, 550, "ABC"],
  ["2026-10-31", "19:30", "Mississippi State", "Texas", -20.5, 50.5, 800, -1350, "ESPN"],
  ["2026-10-31", "19:30", "Georgia Tech", "Pittsburgh", -7, 52.5, 205, -250, "ESPN2"],
  ["2026-10-31", "19:45", "Missouri", "Arkansas", 10, 47.5, -345, 275, "SECN"],
  ["2026-10-31", "20:00", "Washington", "Nebraska", -9.5, 49.5, 260, -325, "BTN"],
  ["2026-10-31", "20:00", "Army", "Memphis", -6, 56.5, 200, -245, "ESPNU"],
  ["2026-10-31", "22:00", "Texas State", "Boise State", -12.5, 65.5, 340, -440, "The CW"],
  ["2026-10-31", "23:00", "Oregon State", "Fresno State", 7, 57.5, -250, 205, "USA"],
];

// NBA: Dunks & Threes team stats (SRS-adjusted), games through Sat Oct 24 2026.
// [abbr, name, aORTG, aDRTG, pace, gamesPlayed] — aORTG/aDRTG are points per 100 possessions scored/allowed, opponent-adjusted
const NBA_ROWS = [
  ["OKC", "Thunder", 114.1, 106, 99.3, 4],
  ["SAS", "Spurs", 115, 108, 101.3, 3],
  ["HOU", "Rockets", 115, 108.8, 100.3, 4],
  ["BOS", "Celtics", 114.8, 109.8, 99.3, 3],
  ["TOR", "Raptors", 112, 108.9, 105, 3],
  ["LAL", "Lakers", 114.4, 111.4, 101.7, 3],
  ["POR", "Trail Blazers", 113.2, 110.3, 102, 2],
  ["DET", "Pistons", 113, 110.1, 99.7, 3],
  ["DEN", "Nuggets", 115.5, 113.2, 99.2, 3],
  ["NYK", "Knicks", 113.2, 111, 99, 3],
  ["ATL", "Hawks", 112.8, 110.8, 103.3, 4],
  ["MIN", "Timberwolves", 112.9, 111, 101.1, 4],
  ["ORL", "Magic", 110.7, 109.7, 102.7, 3],
  ["PHI", "76ers", 111.2, 110.3, 104.3, 4],
  ["GSW", "Warriors", 112.9, 112.1, 100, 4],
  ["MEM", "Grizzlies", 112, 111.7, 101, 4],
  ["CLE", "Cavaliers", 111.9, 112.3, 105.7, 3],
  ["IND", "Pacers", 112, 112.7, 103.3, 4],
  ["MIA", "Heat", 111.8, 112.7, 103.5, 4],
  ["PHX", "Suns", 112.4, 113.5, 98, 3],
  ["LAC", "Clippers", 109.6, 110.9, 103, 3],
  ["DAL", "Mavericks", 110.1, 111.9, 100.8, 4],
  ["CHA", "Hornets", 110.4, 113, 99.8, 4],
  ["UTA", "Jazz", 110.9, 113.9, 102.3, 4],
  ["NOP", "Pelicans", 110.3, 114.6, 104.1, 3],
  ["WAS", "Wizards", 109.7, 114.9, 102.8, 4],
  ["SAC", "Kings", 109.4, 115.5, 103, 3],
  ["MIL", "Bucks", 108.8, 116.2, 107.3, 4],
  ["CHI", "Bulls", 108.2, 115.7, 108.5, 4],
  ["BKN", "Nets", 107.3, 116, 104.3, 3],
];
// tip times ET
const NBA_GAMES = [
  ["2026-10-29", "20:00", "CLE", "ATL", -1.5, 237.5, 102, -122, ""],
  ["2026-10-29", "20:00", "SAC", "NOP", -6, 237.5, 190, -230, ""],
  ["2026-10-29", "22:00", "MEM", "POR", -7.5, 234.5, 230, -282, ""],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 8", dataDate:"2026-10-27",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines from bet365 via Fox Sports, Oct 26. Bye: HOU, NYG, NO, SF.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 9", dataDate:"2026-10-27",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Opening lines as of Oct 25. Games without a posted line are left off.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Thu Oct 29", dataDate:"2026-10-26",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from WagerTalk/TheSpread/iHeart consensus, Oct 29. Finished games drop off once they end.",
  },
};

function parseNFL(csv){
  const t={};
  csv.trim().split(/\r?\n/).slice(1).map(l=>l.split(",")).forEach(r=>{
    t[r[1]]={team:r[1], short:r[1], name:NFL_NAMES[r[1]]||r[1], offEPA:+r[2], defEPA:+r[3], offSR:+r[4], defSR:+r[5], offPass:+r[6], defPass:+r[7]};
  });
  return t;
}
function parseNBA(rows){
  const t={}, avg=k=>rows.reduce((s,r)=>s+r[k],0)/rows.length;
  const lgO=avg(2), lgD=avg(3), lgP=avg(4);
  rows.forEach(r=>{ const [ab,name,o,d,p,gp]=r;
    const ortg=o-lgO, drtg=lgD-d; // both: points per 100 vs league average, + = better
    t[ab]={team:ab, short:ab, name, aORTG:o, aDRTG:d, pace:p, gp, ortg, drtg, net:ortg+drtg,
      paceAdj:lgP+(p-lgP)*gp/(gp+6), // tiny samples: lean on league-average pace until games pile up
      offRating:ortg/100, defRating:-drtg/100}; });
  const T=Object.values(t);
  [...T].sort((a,b)=>b.net-a.net).forEach((x,i)=>x.powerRank=i+1);
  [...T].sort((a,b)=>b.ortg-a.ortg).forEach((x,i)=>x.offRank=i+1);
  [...T].sort((a,b)=>b.drtg-a.drtg).forEach((x,i)=>x.defRank=i+1);
  [...T].sort((a,b)=>b.pace-a.pace).forEach((x,i)=>x.paceRank=i+1);
  t.__lg={lgO,lgD,lgP};
  return t;
}
function parseCFB(rows){
  const t={};
  rows.forEach(r=>{ t[r[0]]={team:r[0], short:r[0], name:r[1], conf:r[1], offEPA:r[2], defEPA:r[3], offSR:r[4], defSR:r[5], offPass:r[6], defPass:r[7], plays:r[8]}; });
  return t;
}
const mean=a=>a.reduce((s,x)=>s+x,0)/a.length;

function buildRatings(teams,cfg){
  const T=Object.values(teams), m=k=>mean(T.map(t=>t[k]));
  const avg={offEPA:m("offEPA"),defEPA:m("defEPA"),offSR:m("offSR"),defSR:m("defSR"),offPass:m("offPass"),defPass:m("defPass")};
  T.forEach(t=>{
    // composite: 45% EPA/play, 30% pass EPA, 25% success rate (deviations from league average)
    t.offRating=0.45*(t.offEPA-avg.offEPA)+0.30*(t.offPass-avg.offPass)*cfg.passScale+0.25*(t.offSR-avg.offSR)*cfg.srScale;
    t.defRating=0.45*(t.defEPA-avg.defEPA)+0.30*(t.defPass-avg.defPass)*cfg.passScale+0.25*(t.defSR-avg.defSR)*cfg.srScale; // + = bad D
    t.net=t.offRating-t.defRating;
  });
  [...T].sort((a,b)=>b.net-a.net).forEach((t,i)=>t.powerRank=i+1);
  [...T].sort((a,b)=>b.offRating-a.offRating).forEach((t,i)=>t.offRank=i+1);
  [...T].sort((a,b)=>a.defRating-b.defRating).forEach((t,i)=>t.defRank=i+1);
  return avg;
}

function Phi(x){const t=1/(1+0.2316419*Math.abs(x));const d=0.3989423*Math.exp(-x*x/2);
  const p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return x>0?1-p:p;}
const mlToProb=ml=>ml<0?-ml/(-ml+100):100/(ml+100);
const mlPayout=ml=>ml<0?100/-ml:ml/100;
const evOf=(p,ml)=>p*mlPayout(ml)-(1-p);
function edgeScore(p,be,mult,bonus){const s=(p-be)*100*mult+(bonus||0);return Math.max(0,Math.min(10,+s.toFixed(1)));}
function tier(s){return s>=8?"Strong":s>=6?"Solid":s>=4?"Lean":s>0?"Thin":"Pass";}
function crossesKey(a,b){const lo=Math.min(Math.abs(a),Math.abs(b)),hi=Math.max(Math.abs(a),Math.abs(b));let k=0;if(lo<3&&hi>3)k+=0.6;if(lo<7&&hi>7)k+=0.4;return k;}
function fmtLine(x){return x===0?"PK":(x>0?"+":"")+x;}
function fmtML(x){return (x>0?"+":"")+x;}

function toGame(row,i,league){
  const [date,time,away,home,spread,total,mlAway,mlHome,tv,extra]=row; const x=extra||{};
  return {id:league+"-"+(i+1), league, date, time, away, home, spread, total, mlAway, mlHome, tv,
    kickoff:new Date(`${date}T${time}:00${date>="2026-11-01"&&date<"2027-03-14"?"-05:00":"-04:00"}`), // listed in Eastern (EST from Nov 1)
    venue:x.venue||(league==="nfl"?NFL_VENUES[home]:league==="nba"?NBA_VENUES[home]:""), hfa:x.hfa, adjAway:x.adjAway||0, adjHome:x.adjHome||0, note:x.note||(spread===0?"Pick'em line":""), noTotal:!!x.noTotal};
}

function project(g,teams,cfg){
  const A=teams[g.away],H=teams[g.home];
  const hfa=g.hfa??cfg.hfa, ptsPer=(g.poss||cfg.plays)*cfg.regress;
  const base=cfg.anchorTotals?g.total/2:(g.basePts??cfg.basePts); // NBA: per-game base from expected possessions
  const rawAway=base+(A.offRating+H.defRating)*ptsPer-hfa/2+(g.adjAway||0);
  const rawHome=base+(H.offRating+A.defRating)*ptsPer+hfa/2+(g.adjHome||0);
  const rawMargin=rawHome-rawAway, rawTotal=rawHome+rawAway;
  const mktMargin=-g.spread;
  const margin=cfg.wModel*rawMargin+(1-cfg.wModel)*mktMargin;
  const wT=cfg.wTotal??cfg.wModel; const total=wT*rawTotal+(1-wT)*g.total;
  const away=total/2-margin/2, home=total/2+margin/2;

  // spread
  const sEdge=margin-mktMargin, sideHome=sEdge>=0;
  const pHomeCover=1-Phi((mktMargin-margin)/cfg.sdMargin);
  const pCover=sideHome?pHomeCover:1-pHomeCover;
  const sScore=edgeScore(pCover,0.5238,1.4,(cfg.keys&&cfg.keys.length?crossesKey(margin,mktMargin):0));
  const spreadPick=sideHome?`${g.home} ${fmtLine(g.spread)}`:`${g.away} ${fmtLine(-g.spread)}`;
  // total
  const tEdge=total-g.total, pOver=1-Phi((g.total-total)/cfg.sdTotal), isOver=tEdge>=0, pT=isOver?pOver:1-pOver;
  const tScore=g.noTotal?0:edgeScore(pT,0.5238,1.4,0);
  // moneyline
  const pHomeWin=Phi(margin/cfg.sdMargin);
  const ih=mlToProb(g.mlHome), ia=mlToProb(g.mlAway), vig=ih+ia, nvHome=ih/vig, nvAway=ia/vig;
  const evH=evOf(pHomeWin,g.mlHome), evA=evOf(1-pHomeWin,g.mlAway);
  const mlHome=evH>=evA, mlEV=Math.max(evH,evA), mlPrice=mlHome?g.mlHome:g.mlAway;
  const longshot=mlPrice>250?(mlPrice-250)/150:0;
  const mScore=edgeScore(mlHome?pHomeWin:1-pHomeWin,mlToProb(mlPrice),1.1,-longshot);

  return {away,home,margin,total,rawAway,rawHome,rawMargin,rawTotal,
    spread:{pick:spreadPick,edgePts:Math.abs(sEdge),prob:pCover,ev:evOf(pCover,-110),score:sScore,tier:tier(sScore),modelLine:-margin},
    totals:{pick:`${isOver?"Over":"Under"} ${g.total}`,edgePts:Math.abs(tEdge),prob:pT,ev:evOf(pT,-110),score:tScore,tier:tier(tScore),pOver},
    ml:{pick:mlHome?`${g.home} ${fmtML(g.mlHome)}`:`${g.away} ${fmtML(g.mlAway)}`,prob:mlHome?pHomeWin:1-pHomeWin,implied:mlHome?nvHome:nvAway,
        probEdge:mlHome?pHomeWin-nvHome:(1-pHomeWin)-nvAway,ev:mlEV,score:mScore,tier:tier(mScore),pHomeWin,nvHome,nvAway}};
}

function buildLeague(key){
  const L=LEAGUES[key];
  const teams=key==="nfl"?parseNFL(NFL_CSV):key==="nba"?parseNBA(NBA_ROWS):parseCFB(CFB_ROWS);
  const LG=teams.__lg; delete teams.__lg;
  if(key!=="nba") buildRatings(teams,L.cfg);
  const src=key==="nfl"?NFL_GAMES:key==="nba"?NBA_GAMES:CFB_GAMES;
  const missing=[];
  const games=src.map((r,i)=>toGame(r,i,key)).filter(g=>{const ok=teams[g.away]&&teams[g.home]; if(!ok)missing.push(g.away+" @ "+g.home); return ok;});
  if(L.cfg.calibrateTotals){ // match the model's average scoring level to the market's for this slate
    const ptsPer=L.cfg.plays*L.cfg.regress;
    const dev=mean(games.map(g=>(teams[g.away].offRating+teams[g.home].defRating+teams[g.home].offRating+teams[g.away].defRating)*ptsPer));
    L.cfg.basePts=(mean(games.map(g=>g.total))-dev)/2;
  }
  if(key==="nba"){ // possessions from both teams' pace; base points at league-average efficiency, then calibrated to the slate's market totals
    games.forEach(g=>{const A=teams[g.away],H=teams[g.home]; g.poss=(A.paceAdj+H.paceAdj)/2; g.basePts=LG.lgO/100*g.poss;});
    const raw=g=>{const A=teams[g.away],H=teams[g.home];return 2*g.basePts+(A.offRating+H.defRating+H.offRating+A.defRating)*g.poss*L.cfg.regress;};
    if(games.length){const shift=mean(games.map(g=>g.total))-mean(games.map(raw)); games.forEach(g=>g.basePts+=shift/2); L.cfg.calShift=shift;}
    L.cfg.lg=LG;
  }
  const rows=games.map(g=>{const p=project(g,teams,L.cfg);return {g,p,best:Math.max(p.spread.score,p.totals.score,p.ml.score)};});
  return {L,teams,rows,missing,teamCount:Object.keys(teams).length};
}
