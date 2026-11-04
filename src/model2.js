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
  ["2026-11-04", "19:00", "Ball State", "Massachusetts", -3, 49.5, 130, -155, "ESPNU"],
  ["2026-11-04", "19:00", "Toledo", "Sacramento State", 25.5, 52.5, -2800, 1300, "CBSSN"],
  ["2026-11-04", "19:30", "Central Michigan", "Eastern Michigan", -1.5, 44.5, 100, -120, "ESPN2", {"venue": "Ford Field, Detroit", "hfa": 0, "note": "Neutral site"}],
  ["2026-11-05", "19:30", "UTSA", "Florida Atlantic", 7, 72.5, -265, 215, "ESPN"],
  ["2026-11-05", "20:00", "James Madison", "Southern Miss", 14.5, 58.5, -650, 470, "ESPN2"],
  ["2026-11-06", "19:00", "Virginia Tech", "SMU", -6, 55.5, 185, -225, "ESPN"],
  ["2026-11-06", "19:30", "South Florida", "East Carolina", -1.5, 39.5, 105, -125, "ESPN2"],
  ["2026-11-06", "20:00", "Nebraska", "Illinois", 4.5, 49.5, -198, 164, "FOX"],
  ["2026-11-06", "21:00", "New Mexico", "Nevada", 9.5, 38.5, -395, 310, "CBSSN"],
  ["2026-11-06", "22:15", "TCU", "Arizona", -8.5, 42.5, 270, -340, "ESPN"],
  ["2026-11-07", "12:00", "Clemson", "Syracuse", 2.5, 50.5, -142, 120, "ESPN2"],
  ["2026-11-07", "12:00", "Florida State", "Boston College", 7, 51.5, -270, 220, "ACCN"],
  ["2026-11-07", "12:00", "North Carolina", "UConn", 7, 54.5, -270, 220, "CBSSN"],
  ["2026-11-07", "12:00", "Tulsa", "Tulane", 1.5, 49.5, -122, 102, "ESPNU"],
  ["2026-11-07", "12:00", "BYU", "Utah", -5.5, 48.5, 170, -205, "ABC"],
  ["2026-11-07", "12:00", "Iowa State", "Baylor", -10, 50.5, 295, -375, "FS1"],
  ["2026-11-07", "12:00", "UCLA", "Minnesota", 5.5, 39.5, -218, 180, "FOX"],
  ["2026-11-07", "12:00", "Texas", "Missouri", 2.5, 43.5, -148, 124, "ESPN"],
  ["2026-11-07", "12:30", "Duke", "NC State", 4.5, 51.5, -198, 164, "The CW"],
  ["2026-11-07", "12:30", "Maryland", "Purdue", -6.5, 57.5, 200, -245, "BTN"],
  ["2026-11-07", "12:45", "Arkansas", "Auburn", -10.5, 52.5, 320, -410, "SECN"],
  ["2026-11-07", "13:00", "Oklahoma State", "Kansas State", 4, 61.5, -192, 160, "TNT/truTV"],
  ["2026-11-07", "13:00", "Old Dominion", "Coastal Carolina", -7, 43.5, 225, -278, "ESPN+"],
  ["2026-11-07", "14:30", "Georgia State", "App State", -5.5, 55.5, 164, -198, "ESPN+"],
  ["2026-11-07", "15:00", "Texas A&M", "South Carolina", -7, 51.5, 235, -290, "ESPN"],
  ["2026-11-07", "15:00", "UL Monroe", "Arkansas State", -14.5, 53.5, 500, -700, "ESPN+"],
  ["2026-11-07", "15:00", "Delaware", "Kennesaw State", 2.5, 55.5, -130, 110, "ESPN+"],
  ["2026-11-07", "15:30", "Charlotte", "UAB", -10.5, 51.5, 320, -410, "ESPN+"],
  ["2026-11-07", "15:30", "Temple", "Navy", -7, 52.5, 220, -270, "CBSSN"],
  ["2026-11-07", "15:30", "Cincinnati", "Houston", -10.5, 62.5, 320, -410, "FOX"],
  ["2026-11-07", "15:30", "Oregon", "Ohio State", -7.5, 48.5, 280, -355, "CBS"],
  ["2026-11-07", "15:30", "Penn State", "Washington", -2.5, 43.5, 102, -122, "FS1"],
  ["2026-11-07", "15:30", "Western Kentucky", "Middle Tennessee", -1.5, 52.5, -102, -118, "ESPN+"],
  ["2026-11-07", "15:30", "Marshall", "Georgia Southern", -9.5, 53.5, 275, -345, "ESPN+"],
  ["2026-11-07", "15:30", "Alabama", "LSU", -4.5, 52.5, 145, -175, "ABC"],
  ["2026-11-07", "15:45", "UCF", "Kansas", -3, 48.5, 114, -135, "ESPN2"],
  ["2026-11-07", "16:00", "Rice", "North Texas", -16.5, 65.5, 625, -950, "ESPNU"],
  ["2026-11-07", "16:00", "Louisiana Tech", "Troy", 6.5, 45.5, -218, 180, "ESPN+"],
  ["2026-11-07", "16:00", "Missouri State", "Florida International", -4.5, 49.5, 160, -192, "ESPN+"],
  ["2026-11-07", "16:00", "Northern Illinois", "San José State", -11.5, 50.5, 300, -380, "NBCS Bay"],
  ["2026-11-07", "16:15", "Rutgers", "Wisconsin", -16.5, 46.5, 525, -750, "BTN"],
  ["2026-11-07", "16:15", "Vanderbilt", "Mississippi State", -2.5, 47.5, 110, -130, "SECN"],
  ["2026-11-07", "17:00", "South Alabama", "Louisiana", -7, 57.5, 215, -265, "ESPN+"],
  ["2026-11-07", "18:00", "Boise State", "Colorado State", 18.5, 68.5, -1200, 750, "USA"],
  ["2026-11-07", "18:15", "Kentucky", "Tennessee", -6, 51.5, 164, -198, "ESPN"],
  ["2026-11-07", "19:00", "Sam Houston", "Jacksonville State", -15.5, 47.5, 500, -700, "CBSSN"],
  ["2026-11-07", "19:30", "Miami", "Notre Dame", -4.5, 57.5, 170, -205, "NBC"],
  ["2026-11-07", "19:30", "Michigan State", "Michigan", -13.5, 39.5, 440, -600, "Peacock"],
  ["2026-11-07", "19:30", "Georgia", "Ole Miss", 3, 56.5, -142, 120, "ABC"],
  ["2026-11-07", "19:30", "Iowa", "Northwestern", -1.5, 42.5, 105, -125, "FOX"],
  ["2026-11-07", "19:30", "Air Force", "Army", -4.5, 49.5, 154, -185, "CBS"],
  ["2026-11-07", "19:30", "Colorado", "Arizona State", -3.5, 49.5, 130, -155, "ESPN2"],
  ["2026-11-07", "19:30", "Louisville", "Georgia Tech", 13.5, 59.5, -600, 440, "ACCN"],
  ["2026-11-07", "19:45", "Oklahoma", "Florida", -6.5, 47.5, 180, -218, "SECN"],
  ["2026-11-07", "20:00", "Liberty", "New Mexico State", 16.5, 47.5, -750, 525, "ESPNU"],
  ["2026-11-07", "21:30", "West Virginia", "Texas Tech", -16.5, 63.5, 470, -650, "ESPN"],
  ["2026-11-07", "21:30", "Fresno State", "Utah State", 2.5, 41.5, -130, 110, "USA"],
  ["2026-11-07", "21:30", "Hawai'i", "UTEP", 9.5, 49.5, -325, 260, "FS1"],
  ["2026-11-07", "22:30", "Texas State", "Oregon State", -7.5, 67.5, 225, -278, "The CW"],
  ["2026-11-07", "22:30", "Wyoming", "UNLV", -7.5, 46.5, 205, -250, "CBSSN"],
];

// NBA: Dunks & Threes team stats (SRS-adjusted), games through Fri Oct 30 2026.
// [abbr, name, aORTG, aDRTG, pace, gamesPlayed] — aORTG/aDRTG are points per 100 possessions scored/allowed, opponent-adjusted
const NBA_ROWS = [
  ["SAS", "Spurs", 116.1, 108.0, 100.2, 7],
  ["HOU", "Rockets", 116.4, 109.8, 98.5, 8],
  ["OKC", "Thunder", 113.6, 107.1, 98.0, 7],
  ["BOS", "Celtics", 114.5, 110.5, 97.5, 7],
  ["POR", "Trail Blazers", 114.5, 110.6, 101.0, 6],
  ["LAL", "Lakers", 115.9, 112.0, 100.5, 8],
  ["TOR", "Raptors", 113.8, 110.3, 102.4, 7],
  ["DEN", "Nuggets", 116.0, 112.9, 98.8, 6],
  ["DET", "Pistons", 112.3, 109.5, 98.4, 7],
  ["MIN", "Timberwolves", 112.6, 109.8, 101.4, 8],
  ["MEM", "Grizzlies", 114.6, 111.9, 101.3, 7],
  ["GSW", "Warriors", 113.9, 111.2, 100.0, 8],
  ["NYK", "Knicks", 113.0, 111.5, 96.9, 7],
  ["PHI", "76ers", 111.5, 110.9, 100.3, 8],
  ["CLE", "Cavaliers", 114.1, 113.8, 101.6, 7],
  ["ATL", "Hawks", 110.9, 111.0, 103.0, 8],
  ["MIA", "Heat", 113.8, 114.3, 103.9, 7],
  ["DAL", "Mavericks", 110.6, 111.1, 99.6, 7],
  ["ORL", "Magic", 111.1, 112.1, 97.4, 7],
  ["PHX", "Suns", 112.9, 114.5, 98.2, 5],
  ["IND", "Pacers", 112.3, 114.2, 101.4, 8],
  ["NOP", "Pelicans", 111.3, 113.6, 104.0, 7],
  ["UTA", "Jazz", 110.2, 112.7, 101.2, 7],
  ["LAC", "Clippers", 109.6, 112.3, 100.7, 7],
  ["CHA", "Hornets", 109.5, 113.9, 96.9, 8],
  ["WAS", "Wizards", 109.2, 113.6, 98.9, 7],
  ["SAC", "Kings", 109.2, 115.4, 103.0, 7],
  ["MIL", "Bucks", 108.5, 116.2, 104.7, 7],
  ["CHI", "Bulls", 108.9, 117.2, 106.0, 7],
  ["BKN", "Nets", 106.5, 114.9, 99.8, 7],
];
// tip times ET
const NBA_GAMES = [
  ["2026-11-04", "19:00", "PHI", "DET", -2.5, 217.5, 106, -125, "ESPN"],
  ["2026-11-04", "19:00", "ATL", "WAS", 2.5, 231.5, -136, 115, ""],
  ["2026-11-04", "19:30", "MIL", "BOS", -11.5, 223.5, 391, -514, ""],
  ["2026-11-04", "19:30", "CHA", "BKN", 3.5, 213.5, -162, 136, ""],
  ["2026-11-04", "19:30", "CHI", "NYK", -12.5, 233.5, 443, -597, ""],
  ["2026-11-04", "20:00", "IND", "MEM", -6.5, 230.5, 212, -258, ""],
  ["2026-11-04", "20:00", "UTA", "NOP", -5.5, 235.5, 172, -207, ""],
  ["2026-11-04", "20:00", "CLE", "OKC", -2.5, 228.5, 125, -148, ""],
  ["2026-11-04", "20:30", "MIN", "HOU", -8.5, 219.5, 261, -324, ""],
  ["2026-11-04", "21:00", "TOR", "DEN", -4.5, 231.5, 160, -192, ""],
  ["2026-11-04", "21:00", "POR", "PHX", 3.5, 227.5, -155, 130, ""],
  ["2026-11-04", "21:30", "DAL", "SAS", -11.5, 227.5, 411, -545, "ESPN"],
  ["2026-11-04", "22:00", "LAL", "SAC", 11.5, 235.5, -540, 407, ""],
  ["2026-11-04", "22:30", "MIA", "LAC", 4.5, 234.5, -201, 168, ""],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

// CBB: KenPom ratings (pasted from kenpom.com, Nov 3). [team, conf, W-L, AdjO, AdjD, AdjT, AdjEM]
const CBB_ROWS = /*CBBROWS*/;
// tip times ET. [date, time, away, home, homeSpread, total, mlAway, mlHome, tv, extra]; null moneyline = not posted
const CBB_GAMES = [
  ["2026-11-04", "19:00", "Fairleigh Dickinson", "Butler", -25.5, 155.5, 2500, -8000, "ESPN+"],
  ["2026-11-04", "19:30", "CSUN", "Wichita State", -14.5, 161.5, 700, -1100, "ESPN+"],
  ["2026-11-04", "20:00", "Northern Kentucky", "South Dakota", 2.5, 159.5, -125, 105, ""],
  ["2026-11-04", "22:00", "Milwaukee", "Santa Clara", -18.5, 159.5, 1200, -2400, "ESPN+"],
  ["2026-11-04", "22:00", "North Dakota State", "Saint Mary's", -12.5, 149.5, 525, -750, "ESPN+"],
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
    footer:"Lines from DraftKings via ESPN (Nov 3) where posted, otherwise SportsBettingDime openers (Nov 1). Games without a posted line are left off.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Wed Nov 4", dataDate:"2026-11-02",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from DraftKings via ESPN, Nov 4. Finished games drop off once they end.",
  },
  cbb: { key:"cbb", label:"CBB", weekLabel:"Nov 4–6", dataDate:"2026-11-03",
    cfg:{basePts:70, plays:68, regress:1.0, sdMargin:10.5, sdGrow:0.12, sdTotal:12.0, wModel:0.35, wTotal:0.30, hfa:3.2, keys:[]},
    footer:"Lines from DraftKings via ESPN, Nov 4 (FDU–Butler from Dimers). Games without a posted line are left off. Finished games drop off once they end.",
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
