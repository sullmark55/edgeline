// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-11-05", "20:15", "JAX", "BAL", 8.5, 42.5, -470, 360, "Prime"],
  ["2026-11-08", "09:30", "CIN", "ATL", 3, 52.5, -162, 136, "NFLN", {"venue": "Santiago Bernabéu, Madrid", "hfa": 0.5, "note": "Madrid — treated as near-neutral"}],
  ["2026-11-08", "13:00", "CLE", "NO", -2.5, 43.5, 120, -142, "CBS"],
  ["2026-11-08", "13:00", "DAL", "IND", 6, 51.5, -270, 220, "FOX"],
  ["2026-11-08", "13:00", "DEN", "CAR", 3, 43.5, -148, 124, "CBS"],
  ["2026-11-08", "13:00", "DET", "MIA", 7, 50.5, -360, 285, "FOX"],
  ["2026-11-08", "13:00", "LA", "WAS", 5.5, 47.5, -238, 195, "FOX"],
  ["2026-11-08", "13:00", "NYG", "PHI", 3.5, 40.5, -175, 145, "FOX"],
  ["2026-11-08", "13:00", "NYJ", "KC", -9.5, 46.5, 370, -485, "CBS"],
  ["2026-11-08", "16:05", "HOU", "LAC", 4.5, 40.5, -198, 164, "CBS"],
  ["2026-11-08", "16:25", "LV", "SF", -10, 51.5, 410, -550, "CBS"],
  ["2026-11-08", "16:25", "GB", "NE", -3, 46.5, 130, -155, "FOX"],
  ["2026-11-08", "16:25", "ARI", "SEA", -11.5, 44.5, 490, -675, "FOX"],
  ["2026-11-08", "20:20", "TB", "CHI", -6, 46.5, 210, -258, "NBC"],
  ["2026-11-09", "20:15", "BUF", "MIN", 3.5, 46.5, -185, 154, "ESPN"],
];
const NFL_VENUES={"BAL": "M&T Bank Stadium", "NO": "Caesars Superdome", "IND": "Lucas Oil Stadium", "CAR": "Bank of America Stadium", "MIA": "Hard Rock Stadium", "WAS": "Northwest Stadium", "PHI": "Lincoln Financial Field", "KC": "GEHA Field at Arrowhead Stadium", "LAC": "SoFi Stadium", "SF": "Levi's Stadium", "NE": "Gillette Stadium", "SEA": "Lumen Field", "CHI": "Soldier Field", "MIN": "U.S. Bank Stadium"};

const CFB_GAMES = [
  ["2026-11-03", "19:00", "Ohio", "Akron", 14, 51.5, -575, 425, "ESPN2"],
  ["2026-11-03", "20:00", "Buffalo", "Miami (OH)", -6, 44.5, 195, -238, "ESPN"],
  ["2026-11-04", "19:00", "Ball State", "Massachusetts", -2.5, 49.5, 120, -142, "ESPNU"],
  ["2026-11-04", "19:00", "Toledo", "Sacramento State", 25.5, 52.5, -3200, 1400, "CBSSN"],
  ["2026-11-04", "19:30", "Central Michigan", "Eastern Michigan", -1.5, 44.5, -108, -112, "ESPN2", {"venue": "Ford Field, Detroit", "hfa": 0, "note": "Neutral site"}],
  ["2026-11-05", "19:30", "UTSA", "Florida Atlantic", 7, 72.5, -265, 215, "ESPN"],
  ["2026-11-05", "20:00", "James Madison", "Southern Miss", 14.5, 57.5, -650, 470, "ESPN2"],
  ["2026-11-06", "19:00", "Virginia Tech", "SMU", -6, 56.5, 185, -225, "ESPN"],
  ["2026-11-06", "19:30", "South Florida", "East Carolina", -2.5, 39.5, 110, -130, "ESPN2"],
  ["2026-11-06", "20:00", "Nebraska", "Illinois", 4.5, 50.5, -198, 164, "FOX"],
  ["2026-11-06", "21:00", "New Mexico", "Nevada", 9.5, 36.5, -375, 295, "CBSSN"],
  ["2026-11-06", "22:15", "TCU", "Arizona", -8.5, 44.5, 275, -345, "ESPN"],
  ["2026-11-07", "12:00", "Clemson", "Syracuse", 2.5, 50.5, -142, 120, "ESPN2"],
  ["2026-11-07", "12:00", "Florida State", "Boston College", 6.5, 50.5, -258, 210, "ACCN"],
  ["2026-11-07", "12:00", "North Carolina", "UConn", 7, 54.5, -270, 220, "CBSSN"],
  ["2026-11-07", "12:00", "Tulsa", "Tulane", 1.5, 49.5, -122, 102, "ESPNU"],
  ["2026-11-07", "12:00", "BYU", "Utah", -5.5, 48.5, 164, -198, "ABC"],
  ["2026-11-07", "12:00", "Iowa State", "Baylor", -10, 50.5, 295, -375, "FS1"],
  ["2026-11-07", "12:00", "UCLA", "Minnesota", 5.5, 39.5, -218, 180, "FOX"],
  ["2026-11-07", "12:00", "Texas", "Missouri", 2.5, 42.5, -142, 120, "ESPN"],
  ["2026-11-07", "12:30", "Duke", "NC State", 4.5, 51.5, -198, 164, "The CW"],
  ["2026-11-07", "12:30", "Maryland", "Purdue", -6, 57.5, 185, -225, "BTN"],
  ["2026-11-07", "12:45", "Arkansas", "Auburn", -10.5, 52.5, 320, -410, "SECN"],
  ["2026-11-07", "13:00", "Oklahoma State", "Kansas State", 5.5, 62.5, -218, 180, "TNT/truTV"],
  ["2026-11-07", "13:00", "Old Dominion", "Coastal Carolina", -7, 43.5, 225, -278, "ESPN+"],
  ["2026-11-07", "14:30", "Georgia State", "App State", -5.5, 55.5, 180, -218, "ESPN+"],
  ["2026-11-07", "15:00", "Texas A&M", "South Carolina", -7, 51.5, 225, -278, "ESPN"],
  ["2026-11-07", "15:00", "UL Monroe", "Arkansas State", -14.5, 53.5, 500, -700, "ESPN+"],
  ["2026-11-07", "15:00", "Delaware", "Kennesaw State", 1.5, 56.5, -125, 105, "ESPN+"],
  ["2026-11-07", "15:30", "Charlotte", "UAB", -8.5, 47.5, 285, -350, "ESPN+"],
  ["2026-11-07", "15:30", "Temple", "Navy", -7.5, 54.5, 235, -285, "CBSSN"],
  ["2026-11-07", "15:30", "Cincinnati", "Houston", -10.5, 62.5, 340, -400, "FOX"],
  ["2026-11-07", "15:30", "Oregon", "Ohio State", -7.5, 46.5, 245, -275, "CBS"],
  ["2026-11-07", "15:30", "Penn State", "Washington", -1.5, 44.5, 105, -125, "FS1"],
  ["2026-11-07", "15:30", "Western Kentucky", "Middle Tennessee", -1.5, 52.5, -108, -108, "ESPN+"],
  ["2026-11-07", "15:30", "Marshall", "Georgia Southern", -10, 54.5, 320, -385, "ESPN+"],
  ["2026-11-07", "15:30", "Alabama", "LSU", -5.5, 52.5, 187, -210, "ABC"],
  ["2026-11-07", "15:45", "UCF", "Kansas", -3, 48.5, 120, -143, "ESPN2"],
  ["2026-11-07", "16:00", "Rice", "North Texas", -16.5, 64.5, 640, -901, "ESPNU"],
  ["2026-11-07", "16:00", "Louisiana Tech", "Troy", 4.5, 47.5, -188, 165, "ESPN+"],
  ["2026-11-07", "16:00", "Missouri State", "Florida International", -4.5, 49.5, 170, -200, "ESPN+"],
  ["2026-11-07", "16:00", "Northern Illinois", "San José State", -10, 51.5, 330, -395, "NBCS Bay"],
  ["2026-11-07", "16:15", "Rutgers", "Wisconsin", -16.5, 46.5, 525, -750, "BTN"],
  ["2026-11-07", "16:15", "Vanderbilt", "Mississippi State", -2.5, 48.5, 130, -150, "SECN"],
  ["2026-11-07", "17:00", "South Alabama", "Louisiana", -8.5, 57.5, 270, -325, "ESPN+"],
  ["2026-11-07", "18:00", "Boise State", "Colorado State", 17, 68.5, -909, 650, "USA"],
  ["2026-11-07", "18:15", "Kentucky", "Tennessee", -6.5, 50.5, 198, -238, "ESPN"],
  ["2026-11-07", "19:00", "Sam Houston", "Jacksonville State", -16.5, 48.5, 640, -833, "CBSSN"],
  ["2026-11-07", "19:30", "Miami", "Notre Dame", -5.5, 57.5, 175, -200, "NBC"],
  ["2026-11-07", "19:30", "Michigan State", "Michigan", -13, 39.5, 440, -549, "Peacock"],
  ["2026-11-07", "19:30", "Georgia", "Ole Miss", 3.5, 56.5, -175, 145, "ABC"],
  ["2026-11-07", "19:30", "Iowa", "Northwestern", -2.5, 45.5, 114, -133, "FOX"],
  ["2026-11-07", "19:30", "Air Force", "Army", -3, 44.5, 140, -160, "CBS"],
  ["2026-11-07", "19:30", "Colorado", "Arizona State", -3, 48.5, 136, -161, "ESPN2"],
  ["2026-11-07", "19:30", "Louisville", "Georgia Tech", 14.5, 61.5, -649, 500, "ACCN"],
  ["2026-11-07", "19:45", "Oklahoma", "Florida", -6, 44.5, 195, -215, "SECN"],
  ["2026-11-07", "20:00", "Liberty", "New Mexico State", 16.5, 46.5, -833, 640, "ESPNU"],
  ["2026-11-07", "21:30", "West Virginia", "Texas Tech", -16.5, 64.5, 600, -800, "ESPN"],
  ["2026-11-07", "21:30", "Fresno State", "Utah State", 2.5, 42.5, -128, 110, "USA"],
  ["2026-11-07", "21:30", "Hawai'i", "UTEP", 9.5, 49.5, -345, 290, "FS1"],
  ["2026-11-07", "22:30", "Texas State", "Oregon State", -6.5, 72.5, 205, -244, "The CW"],
  ["2026-11-07", "22:30", "Wyoming", "UNLV", -6, 48.5, 190, -230, "CBSSN"]
];

// NBA: Dunks & Threes team stats (SRS-adjusted), games through Fri Oct 30 2026.
// [abbr, name, aORTG, aDRTG, pace, gamesPlayed] — aORTG/aDRTG are points per 100 possessions scored/allowed, opponent-adjusted
const NBA_ROWS = [
  ["ATL", "Hawks", 111.4, 111.1, 102.8, 9],
  ["BKN", "Nets", 107.1, 115.1, 99.1, 8],
  ["BOS", "Celtics", 114.2, 110.7, 97.2, 8],
  ["CHA", "Hornets", 109.4, 114.4, 96.6, 9],
  ["CHI", "Bulls", 108.7, 118.0, 105.3, 8],
  ["CLE", "Cavaliers", 114.4, 113.9, 101.7, 8],
  ["DAL", "Mavericks", 111.1, 111.2, 99.5, 8],
  ["DEN", "Nuggets", 116.6, 112.8, 98.7, 7],
  ["DET", "Pistons", 112.2, 109.5, 98.8, 8],
  ["GSW", "Warriors", 114.0, 111.4, 100.0, 8],
  ["HOU", "Rockets", 116.5, 109.9, 98.3, 9],
  ["IND", "Pacers", 112.3, 113.2, 101.4, 9],
  ["LAC", "Clippers", 109.1, 112.1, 100.7, 8],
  ["LAL", "Lakers", 115.8, 112.1, 100.4, 9],
  ["MEM", "Grizzlies", 114.0, 111.9, 101.6, 8],
  ["MIA", "Heat", 113.7, 114.1, 103.4, 8],
  ["MIL", "Bucks", 108.7, 116.2, 103.4, 8],
  ["MIN", "Timberwolves", 113.0, 109.5, 101.1, 9],
  ["NOP", "Pelicans", 111.5, 113.4, 103.2, 8],
  ["NYK", "Knicks", 113.2, 111.4, 97.4, 8],
  ["OKC", "Thunder", 113.7, 107.1, 98.6, 8],
  ["ORL", "Magic", 110.9, 112.1, 97.4, 7],
  ["PHI", "76ers", 111.8, 110.6, 100.4, 9],
  ["PHX", "Suns", 113.2, 114.8, 99.0, 6],
  ["POR", "Trail Blazers", 114.9, 110.7, 101.1, 7],
  ["SAC", "Kings", 109.0, 115.4, 102.4, 8],
  ["SAS", "Spurs", 116.2, 108.2, 99.8, 8],
  ["TOR", "Raptors", 113.8, 111.1, 101.8, 8],
  ["UTA", "Jazz", 109.9, 112.8, 101.0, 8],
  ["WAS", "Wizards", 109.0, 113.9, 99.0, 8],
];
// tip times ET
const NBA_GAMES = [
  ["2026-11-05", "21:00", "ORL", "PHX", -1.5, 223.5, null, null, ""],
  ["2026-11-05", "22:00", "MIA", "GSW", -7.5, 235.5, 230, -281, "NBA TV"],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

// CBB: KenPom ratings (pasted from kenpom.com, Nov 3). [team, conf, W-L, AdjO, AdjD, AdjT, AdjEM]
const CBB_ROWS = /*CBBROWS*/;
// tip times ET. [date, time, away, home, homeSpread, total, mlAway, mlHome, tv, extra]; null moneyline = not posted
const CBB_GAMES = [
  ["2026-11-05", "18:00", "Chattanooga", "Penn State", -15.5, 159.5, 1000, -1800, "BTN"],
  ["2026-11-05", "18:00", "Wake Forest", "Vanderbilt", -17.5, 154.5, 1300, -2800, "ESPN2"],
  ["2026-11-05", "19:00", "Georgia State", "Charlotte", -11.5, 151.5, 525, -750, "ESPN+"],
  ["2026-11-05", "19:00", "Hofstra", "Princeton", -1.5, 140.5, 110, -130, "ESPN+"],
  ["2026-11-05", "19:00", "Green Bay", "Cincinnati", -24.5, 150.5, 3000, -10000, "ESPN+"],
  ["2026-11-05", "19:00", "Mercer", "Virginia Tech", -21.5, 152.5, 1700, -4500, "ACCNX"],
  ["2026-11-05", "19:00", "Buffalo", "Pittsburgh", -18.5, 151.5, 1300, -2800, "ACCNX"],
  ["2026-11-05", "20:00", "Jacksonville State", "South Alabama", -3.5, 142.5, 124, -148, "ESPN+"],
  ["2026-11-05", "20:00", "Toledo", "Michigan State", -26.5, 152.5, 3000, -10000, "Peacock"],
  ["2026-11-05", "20:00", "Northern Illinois", "Tulsa", -15.5, 152.5, 800, -1350, "ESPN+"],
  ["2026-11-05", "20:00", "VMI", "SMU", -24.5, 159.5, 2200, -8000, "ACCNX"],
  ["2026-11-05", "20:00", "West Georgia", "Loyola Chicago", -16.5, 144.5, 1100, -2100, "ESPN+"],
  ["2026-11-05", "20:00", "Coastal Carolina", "Duke", -40.5, 148.5, null, null, "ACC Network"],
  ["2026-11-05", "20:30", "Penn", "Illinois", -29.5, 165.5, null, null, "FS1"],
  ["2026-11-05", "20:30", "South Florida", "DePaul", -6.5, 150.5, 230, -285, "truTV"],
  ["2026-11-05", "21:00", "Towson", "Utah", -10.5, 141.5, 400, -535, "ESPN+"],
  ["2026-11-05", "22:30", "Cal Poly", "Arizona", -30.5, 172.5, 4000, -50000, "truTV"],
  ["2026-11-06", "20:00", "UConn", "Michigan", 5.5, 146.5, -230, 190, "TNT", {"venue": "TD Garden, Boston", "hfa": 0, "note": "Hall of Fame Series — neutral site"}],
];

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 9", dataDate:"2026-11-03",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines: VegasInsider consensus, Nov 3. Bye: PIT, TEN. Sunday 1 PM / 4 PM networks are estimated.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 10", dataDate:"2026-11-03",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Lines refreshed Nov 4: DraftKings via ESPN for Wed–Sat early games, CBS Sports for the rest. Rutgers–Wisconsin has no current line (Nov 1 opener shown). Games without a posted line are left off.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Thu Nov 5", dataDate:"2026-11-04",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from PickDawgz and iHeart, Nov 5. Finished games drop off once they end.",
  },
  cbb: { key:"cbb", label:"CBB", weekLabel:"Nov 5–6", dataDate:"2026-11-03",
    cfg:{basePts:70, plays:68, regress:1.0, sdMargin:10.5, sdGrow:0.12, sdTotal:12.0, wModel:0.35, wTotal:0.30, hfa:3.2, keys:[]},
    footer:"Lines from DraftKings via ESPN, Nov 5. Games without a posted line are left off. Finished games drop off once they end.",
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
function parseCBB(rows){
  const t={}, avg=k=>rows.reduce((s,r)=>s+r[k],0)/rows.length;
  const lgO=avg(3), lgD=avg(4), lgP=avg(5);
  rows.forEach(r=>{ const [team,conf,wl,o,d,p]=r; const gp=wl.split("-").reduce((s,x)=>s+(+x||0),0);
    const ortg=o-lgO, drtg=lgD-d;
    t[team]={team, short:team, name:team, conf, rec:wl, aORTG:o, aDRTG:d, pace:p, gp, ortg, drtg, net:ortg+drtg,
      paceAdj:p, offRating:ortg/100, defRating:-drtg/100}; });
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
function fmtML(x){return x==null?"—":(x>0?"+":"")+x;}

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
  const sdM=cfg.sdMargin+(cfg.sdGrow||0)*Math.abs(g.spread); // CBB: bigger spreads, wider outcomes
  const pHomeCover=1-Phi((mktMargin-margin)/sdM);
  const pCover=sideHome?pHomeCover:1-pHomeCover;
  const sScore=edgeScore(pCover,0.5238,1.4,(cfg.keys&&cfg.keys.length?crossesKey(margin,mktMargin):0));
  const spreadPick=sideHome?`${g.home} ${fmtLine(g.spread)}`:`${g.away} ${fmtLine(-g.spread)}`;
  // total
  const tEdge=total-g.total, pOver=1-Phi((g.total-total)/cfg.sdTotal), isOver=tEdge>=0, pT=isOver?pOver:1-pOver;
  const tScore=g.noTotal?0:edgeScore(pT,0.5238,1.4,0);
  // moneyline
  const pHomeWin=Phi(margin/sdM);
  const hasML=g.mlHome!=null&&g.mlAway!=null;
  const ih=hasML?mlToProb(g.mlHome):pHomeWin, ia=hasML?mlToProb(g.mlAway):1-pHomeWin, vig=ih+ia, nvHome=ih/vig, nvAway=ia/vig;
  const evH=hasML?evOf(pHomeWin,g.mlHome):0, evA=hasML?evOf(1-pHomeWin,g.mlAway):0;
  const mlHome=evH>=evA, mlEV=Math.max(evH,evA), mlPrice=mlHome?g.mlHome:g.mlAway;
  const longshot=mlPrice>250?(mlPrice-250)/150:0;
  const mScore=!hasML?0:edgeScore(mlHome?pHomeWin:1-pHomeWin,mlToProb(mlPrice),1.1,-longshot);

  return {away,home,margin,total,rawAway,rawHome,rawMargin,rawTotal,
    spread:{pick:spreadPick,edgePts:Math.abs(sEdge),prob:pCover,ev:evOf(pCover,-110),score:sScore,tier:tier(sScore),modelLine:-margin},
    totals:{pick:`${isOver?"Over":"Under"} ${g.total}`,edgePts:Math.abs(tEdge),prob:pT,ev:evOf(pT,-110),score:tScore,tier:tier(tScore),pOver},
    ml:{pick:!hasML?"No moneyline posted":mlHome?`${g.home} ${fmtML(g.mlHome)}`:`${g.away} ${fmtML(g.mlAway)}`,prob:mlHome?pHomeWin:1-pHomeWin,implied:mlHome?nvHome:nvAway,
        probEdge:mlHome?pHomeWin-nvHome:(1-pHomeWin)-nvAway,ev:mlEV,score:mScore,tier:tier(mScore),pHomeWin,nvHome,nvAway}};
}

function buildLeague(key){
  const L=LEAGUES[key];
  const hoops=key==="nba"||key==="cbb";
  const teams=key==="nfl"?parseNFL(NFL_CSV):key==="nba"?parseNBA(NBA_ROWS):key==="cbb"?parseCBB(CBB_ROWS):parseCFB(CFB_ROWS);
  const LG=teams.__lg; delete teams.__lg;
  if(!hoops) buildRatings(teams,L.cfg);
  const src=key==="nfl"?NFL_GAMES:key==="nba"?NBA_GAMES:key==="cbb"?CBB_GAMES:CFB_GAMES;
  const missing=[];
  const games=src.map((r,i)=>toGame(r,i,key)).filter(g=>{const ok=teams[g.away]&&teams[g.home]; if(!ok)missing.push(g.away+" @ "+g.home); return ok;});
  if(L.cfg.calibrateTotals){ // match the model's average scoring level to the market's for this slate
    const ptsPer=L.cfg.plays*L.cfg.regress;
    const dev=mean(games.map(g=>(teams[g.away].offRating+teams[g.home].defRating+teams[g.home].offRating+teams[g.away].defRating)*ptsPer));
    L.cfg.basePts=(mean(games.map(g=>g.total))-dev)/2;
  }
  if(hoops){ // possessions from both teams' pace; base points at league-average efficiency, then calibrated to the slate's market totals
    games.forEach(g=>{const A=teams[g.away],H=teams[g.home]; g.poss=key==="cbb"?A.pace*H.pace/LG.lgP:(A.paceAdj+H.paceAdj)/2; g.basePts=LG.lgO/100*g.poss;});
    const raw=g=>{const A=teams[g.away],H=teams[g.home];return 2*g.basePts+(A.offRating+H.defRating+H.offRating+A.defRating)*g.poss*L.cfg.regress;};
    if(games.length){const shift=mean(games.map(g=>g.total))-mean(games.map(raw)); games.forEach(g=>g.basePts+=shift/2); L.cfg.calShift=shift;}
    L.cfg.lg=LG;
  }
  const rows=games.map(g=>{const p=project(g,teams,L.cfg);return {g,p,best:Math.max(p.spread.score,p.totals.score,p.ml.score)};});
  return {L,teams,rows,missing,teamCount:Object.keys(teams).length};
}
