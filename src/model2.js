// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-10-29", "20:15", "CAR", "GB", -3.5, 47.5, 165, -200, "Prime"],
  ["2026-11-01", "13:00", "IND", "JAX", -10, 46.5, 380, -500, "CBS"],
  ["2026-11-01", "13:00", "TEN", "CIN", -12.5, 46.5, 490, -675, "CBS"],
  ["2026-11-01", "13:00", "CLE", "PIT", -3.5, 39.5, 160, -192, "CBS"],
  ["2026-11-01", "13:00", "BAL", "BUF", -3, 54.5, 145, -175, "CBS"],
  ["2026-11-01", "13:00", "LV", "NYJ", -1.5, 45.5, 102, -122, "CBS"],
  ["2026-11-01", "13:00", "MIN", "DET", -3, 46.5, 142, -170, "FOX"],
  ["2026-11-01", "13:00", "ATL", "TB", -2.5, 44.5, 120, -142, "FOX"],
  ["2026-11-01", "13:00", "ARI", "DAL", -7, 54.5, 250, -310, "FOX"],
  ["2026-11-01", "16:05", "LAC", "LA", -6.5, 45.5, 220, -270, "CBS"],
  ["2026-11-01", "16:25", "NE", "MIA", 7, 43.5, -325, 260, "FOX"],
  ["2026-11-01", "16:25", "KC", "DEN", 1.5, 40.5, -118, -102, "FOX"],
  ["2026-11-01", "20:20", "PHI", "WAS", -6, 40.5, 205, -250, "NBC"],
  ["2026-11-02", "20:15", "CHI", "SEA", -3, 46.5, 142, -170, "ABC/ESPN"],
];
const NFL_VENUES={GB:"Lambeau Field",JAX:"EverBank Stadium",CIN:"Paycor Stadium",PIT:"Acrisure Stadium",BUF:"Highmark Stadium",NYJ:"MetLife Stadium",DET:"Ford Field",TB:"Raymond James Stadium",DAL:"AT&T Stadium",LA:"SoFi Stadium",MIA:"Hard Rock Stadium",DEN:"Empower Field at Mile High",WAS:"Northwest Stadium",SEA:"Lumen Field"};

const CFB_GAMES = [
  ["2026-10-27", "19:00", "Delaware", "Western Kentucky", 1.5, 57.5, -125, 105, "CBSSN"],
  ["2026-10-27", "20:00", "Sam Houston", "Missouri State", -5.5, 51.5, 185, -225, "ESPN2"],
  ["2026-10-28", "19:00", "Kennesaw State", "Middle Tennessee", -3, 49.5, 114, -135, "CBSSN"],
  ["2026-10-28", "20:00", "Jacksonville State", "New Mexico State", 3, 49.5, -142, 120, "ESPN2"],
  ["2026-10-29", "19:30", "Florida Atlantic", "North Texas", -14, 77.5, 410, -550, "ESPN"],
  ["2026-10-29", "19:30", "Troy", "James Madison", -19.5, 50.5, 800, -1350, "ESPN2"],
  ["2026-10-30", "19:00", "Tulane", "Charlotte", 8.5, 47.5, -345, 275, "ESPN2"],
  ["2026-10-30", "19:30", "Baylor", "UCF", 1.5, 48.5, -110, -110, "ESPN"],
  ["2026-10-30", "22:30", "Kent State", "Sacramento State", 7.5, 46.5, -305, 245, "ESPN2"],
  ["2026-10-31", "12:00", "SMU", "Syracuse", 10.5, 57.5, -380, 300, "ESPN2"],
  ["2026-10-31", "12:00", "California", "NC State", -7, 56.5, 215, -265, "ACCN"],
  ["2026-10-31", "12:00", "Boston College", "Duke", -7, 48.5, 225, -278, "The CW"],
  ["2026-10-31", "12:00", "Notre Dame", "Navy", 30.5, 56.5, -6500, 2000, "ABC", {"venue": "Gillette Stadium, Foxborough", "hfa": 0, "note": "Neutral site"}],
  ["2026-10-31", "12:00", "UAB", "South Florida", -7.5, 42.5, 245, -305, "ESPNU"],
  ["2026-10-31", "12:00", "Arizona", "Texas Tech", -3.5, 54.5, 140, -166, "ESPN"],
  ["2026-10-31", "12:00", "Illinois", "Maryland", 2.5, 54.5, -135, 114, "FS1"],
  ["2026-10-31", "12:00", "Wisconsin", "Iowa", -3, 36.5, 142, -170, "FOX"],
  ["2026-10-31", "12:00", "Bowling Green", "Western Michigan", -13.5, 44.5, 400, -535, "CBSSN"],
  ["2026-10-31", "12:30", "Michigan", "Rutgers", 15.5, 45.5, -675, 490, "BTN"],
  ["2026-10-31", "12:45", "Auburn", "Ole Miss", -12.5, 57.5, 380, -500, "SECN"],
  ["2026-10-31", "13:00", "Marshall", "Old Dominion", 3, 43.5, -142, 120, "ESPN+"],
  ["2026-10-31", "14:00", "Kansas State", "Colorado", -1.5, 46.5, 105, -125, "TNT/truTV"],
  ["2026-10-31", "14:00", "Coastal Carolina", "Georgia State", -6, 57.5, 180, -218, "ESPN+"],
  ["2026-10-31", "15:00", "Temple", "East Carolina", -5.5, 49.5, 185, -225, "ESPN+"],
  ["2026-10-31", "15:00", "UConn", "Air Force", -1.5, 51.5, -105, -115, "MW+"],
  ["2026-10-31", "15:00", "Louisiana Tech", "South Alabama", 5.5, 58.5, -218, 180, "ESPN+"],
  ["2026-10-31", "15:15", "Stanford", "Louisville", -22.5, 59.5, 1100, -2100, "ACCN"],
  ["2026-10-31", "15:30", "Florida", "Georgia", -12.5, 55.5, 360, -470, "ABC", {"venue": "Mercedes-Benz Stadium, Atlanta", "hfa": 0, "note": "Neutral site"}],
  ["2026-10-31", "15:30", "Northwestern", "Oregon", -3.5, 50.5, 130, -155, "Peacock"],
  ["2026-10-31", "15:30", "Arizona State", "BYU", -16.5, 48.5, 525, -750, "FOX"],
  ["2026-10-31", "15:30", "Minnesota", "Indiana", -20.5, 41.5, 850, -1429, "CBS"],
  ["2026-10-31", "15:30", "Florida International", "Liberty", -11.5, 44.5, 330, -425, "CBSSN"],
  ["2026-10-31", "15:30", "Kansas", "TCU", -5.5, 46.5, 190, -230, "FS1"],
  ["2026-10-31", "15:45", "Utah", "Cincinnati", 6.5, 56.5, -240, 210, "ESPN"],
  ["2026-10-31", "15:45", "Virginia", "Wake Forest", -12.5, 49.5, 400, -500, "ESPN2"],
  ["2026-10-31", "16:00", "New Mexico", "San José State", 14.5, 41.5, -667, 500, "NBCS Bay", {"noTotal": true}],
  ["2026-10-31", "16:15", "South Carolina", "Oklahoma", -4.5, 44.5, 165, -192, "SECN", {"noTotal": true}],
  ["2026-10-31", "16:15", "Nevada", "UCLA", -22.5, 43.5, 1400, -2000, "BTN"],
  ["2026-10-31", "16:15", "Purdue", "Penn State", -9.5, 52.5, 290, -345, "BTN", {"noTotal": true}],
  ["2026-10-31", "18:30", "App State", "Georgia Southern", -5.5, 54.5, 176, -205, "ESPN+", {"noTotal": true}],
  ["2026-10-31", "19:00", "Clemson", "Florida State", -6, 49.5, 180, -215, "ACCN"],
  ["2026-10-31", "19:00", "Oklahoma State", "Iowa State", 9.5, 57.5, -345, 290, "FS1"],
  ["2026-10-31", "19:30", "Ohio State", "USC", 6.5, 51.5, -245, 205, "NBC"],
  ["2026-10-31", "19:30", "Miami", "North Carolina", 14, 53.5, -625, 480, "ABC"],
  ["2026-10-31", "19:30", "Mississippi State", "Texas", -20.5, 50.5, 890, -1250, "ESPN"],
  ["2026-10-31", "19:30", "Georgia Tech", "Pittsburgh", -7.5, 52.5, 250, -300, "ESPN2", {"noTotal": true}],
  ["2026-10-31", "19:45", "Missouri", "Arkansas", 9.5, 49.5, -380, 310, "SECN"],
  ["2026-10-31", "20:00", "Washington", "Nebraska", -7.5, 49.5, 255, -310, "BTN", {"noTotal": true}],
  ["2026-10-31", "20:00", "Army", "Memphis", -6.5, 56.5, 190, -218, "ESPNU", {"noTotal": true}],
  ["2026-10-31", "22:00", "Texas State", "Boise State", -10.5, 63.5, 350, -426, "The CW"],
  ["2026-10-31", "23:00", "Oregon State", "Fresno State", 5.5, 57.5, -210, 185, "USA", {"noTotal": true}],
];

// NBA: Dunks & Threes team stats (SRS-adjusted), games through Fri Oct 30 2026.
// [abbr, name, aORTG, aDRTG, pace, gamesPlayed] — aORTG/aDRTG are points per 100 possessions scored/allowed, opponent-adjusted
const NBA_ROWS = [
  ["SAS", "Spurs", 114.8, 107.7, 100.3, 5],
  ["OKC", "Thunder", 113.6, 106.8, 99.0, 5],
  ["HOU", "Rockets", 115.7, 109.2, 100.7, 6],
  ["TOR", "Raptors", 113.1, 109.0, 101.8, 5],
  ["BOS", "Celtics", 114.5, 110.5, 100.3, 5],
  ["MIN", "Timberwolves", 113.0, 109.4, 102.1, 6],
  ["LAL", "Lakers", 114.8, 111.7, 99.3, 6],
  ["GSW", "Warriors", 113.5, 111.1, 100.3, 6],
  ["DET", "Pistons", 111.9, 109.5, 98.5, 6],
  ["POR", "Trail Blazers", 113.8, 111.5, 102.0, 4],
  ["DEN", "Nuggets", 115.4, 113.1, 99.1, 5],
  ["NYK", "Knicks", 113.1, 111.4, 98.0, 6],
  ["MEM", "Grizzlies", 112.8, 111.3, 101.2, 5],
  ["ATL", "Hawks", 112.2, 110.8, 103.0, 6],
  ["PHI", "76ers", 111.0, 110.0, 101.7, 6],
  ["ORL", "Magic", 111.9, 111.0, 100.0, 5],
  ["MIA", "Heat", 113.9, 113.2, 104.2, 6],
  ["DAL", "Mavericks", 110.9, 110.4, 100.0, 6],
  ["CLE", "Cavaliers", 113.2, 112.8, 102.1, 5],
  ["IND", "Pacers", 113.1, 114.1, 103.2, 6],
  ["PHX", "Suns", 112.2, 114.4, 98.0, 4],
  ["LAC", "Clippers", 108.7, 111.4, 101.0, 5],
  ["UTA", "Jazz", 111.1, 113.9, 101.3, 5],
  ["CHA", "Hornets", 109.2, 112.0, 98.2, 6],
  ["WAS", "Wizards", 109.8, 114.2, 100.0, 6],
  ["NOP", "Pelicans", 109.3, 113.9, 104.8, 5],
  ["MIL", "Bucks", 108.6, 115.7, 106.2, 5],
  ["SAC", "Kings", 108.6, 116.4, 104.0, 5],
  ["CHI", "Bulls", 108.5, 116.3, 107.0, 6],
  ["BKN", "Nets", 106.9, 115.2, 103.1, 5],
];
// tip times ET
const NBA_GAMES = [
  ["2026-10-31", "15:00", "POR", "UTA", 6.0, 232.0, -240, 200, ""],
  ["2026-10-31", "18:00", "PHI", "CHA", 1.5, 215.5, -120, 100, ""],
  ["2026-10-31", "19:00", "ATL", "NOP", 4.5, 239.5, -170, 142, ""],
  ["2026-10-31", "20:00", "SAC", "MEM", -10.5, 232.5, 380, -500, ""],
  ["2026-10-31", "20:00", "CLE", "MIL", 9.5, 237.5, -335, 270, ""],
  ["2026-10-31", "20:00", "MIN", "SAS", -12.5, 226.5, 431, -549, ""],
  ["2026-10-31", "20:30", "OKC", "HOU", -3.5, 218.5, 136, -162, ""],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 8", dataDate:"2026-10-27",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines: VegasInsider consensus, Oct 29. Bye: HOU, NYG, NO, SF.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 9", dataDate:"2026-10-27",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Lines from DraftKings (via ESPN) and CBS Sports, Oct 29. Totals left unrated where no current total was posted.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Sat Oct 31", dataDate:"2026-10-30",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from FanDuel via Covers, Pick Dawgz, TheSpread & iHeart/BetMGM, Oct 31. Finished games drop off once they end.",
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
