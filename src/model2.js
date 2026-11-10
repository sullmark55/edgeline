// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-11-12", "20:15", "WAS", "NYG", -1.5, 43.5, 105, -125, "Prime"],
  ["2026-11-15", "09:30", "NE", "DET", -2.5, 50.5, 120, -142, "FOX", {"venue": "Allianz Arena, Munich", "hfa": 0.5, "note": "Munich — treated as near-neutral"}],
  ["2026-11-15", "13:00", "BUF", "NYJ", 8.5, 51.5, -550, 410, "CBS"],
  ["2026-11-15", "13:00", "KC", "ATL", 3.5, 46.5, -180, 150, "CBS"],
  ["2026-11-15", "13:00", "MIA", "IND", -2.5, 41.5, 110, -130, "CBS"],
  ["2026-11-15", "13:00", "MIN", "GB", -3, 42.5, 142, -170, "FOX"],
  ["2026-11-15", "13:00", "CAR", "NO", 1.5, 47.5, -120, 100, "FOX"],
  ["2026-11-15", "13:00", "JAX", "TEN", 9.5, 46.5, -500, 380, "FOX"],
  ["2026-11-15", "13:00", "HOU", "CLE", 4.5, 39.5, -192, 160, "FOX"],
  ["2026-11-15", "16:05", "LA", "ARI", 7, 45.5, -310, 250, "CBS"],
  ["2026-11-15", "16:05", "SEA", "LV", 3, 42.5, -166, 140, "CBS"],
  ["2026-11-15", "16:25", "SF", "DAL", 4.5, 55.5, -225, 185, "FOX"],
  ["2026-11-15", "20:20", "PIT", "CIN", -3.5, 47.5, 142, -170, "NBC"],
  ["2026-11-16", "20:15", "LAC", "BAL", -4.5, 38.5, 154, -185, "ESPN"],
];
const NFL_VENUES={"BAL": "M&T Bank Stadium", "NO": "Caesars Superdome", "IND": "Lucas Oil Stadium", "CAR": "Bank of America Stadium", "MIA": "Hard Rock Stadium", "WAS": "Northwest Stadium", "PHI": "Lincoln Financial Field", "KC": "GEHA Field at Arrowhead Stadium", "LAC": "SoFi Stadium", "SF": "Levi's Stadium", "NE": "Gillette Stadium", "SEA": "Lumen Field", "CHI": "Soldier Field", "MIN": "U.S. Bank Stadium"};

const CFB_GAMES = [
  ["2026-11-10", "19:00", "Western Michigan", "Akron", 14, 48.5, -600, 440, "CBSSN"],
  ["2026-11-10", "19:00", "Kent State", "Bowling Green", -5.5, 44.5, 180, -218, "ESPNU"],
  ["2026-11-10", "20:00", "Ohio", "Miami (OH)", 1.5, 46.5, -118, -102, "ESPN2"],
  ["2026-11-11", "19:30", "Buffalo", "Ball State", 2.5, 51.5, -135, 114, "ESPN2"],
  ["2026-11-11", "19:30", "Sacramento State", "Central Michigan", -18.5, 43.5, 675, -1050, "ESPNU"],
  ["2026-11-11", "19:30", "Massachusetts", "Toledo", -14.5, 52.5, 455, -625, "CBSSN"],
  ["2026-11-12", "20:00", "Memphis", "South Florida", 4, 49.5, -192, 160, "ESPN"],
  ["2026-11-12", "21:00", "Louisiana", "UL Monroe", 10.5, 49.5, -410, 320, "ESPN2"],
  ["2026-11-13", "19:00", "Florida State", "Pittsburgh", -3.5, 54.5, 142, -170, "ESPN"],
  ["2026-11-13", "21:00", "Illinois", "UCLA", -10, 47.5, 300, -380, "FOX"],
  ["2026-11-13", "22:15", "Houston", "Colorado", 10.5, 50.5, -395, 310, "ESPN"],
  ["2026-11-14", "12:00", "Cincinnati", "Iowa State", -3, 60.5, 130, -155, "TNT"],
  ["2026-11-14", "12:00", "Auburn", "Mississippi State", 2.5, 50.5, -148, 124, "ESPN2"],
  ["2026-11-14", "12:00", "Duke", "Miami", -13.5, 54.5, 410, -550, "ABC"],
  ["2026-11-14", "12:00", "Syracuse", "NC State", 3, 53.5, -135, 114, "ACCN"],
  ["2026-11-14", "12:00", "Wake Forest", "SMU", 1.5, 61.5, -115, -105, "ESPN"],
  ["2026-11-14", "12:00", "Wisconsin", "Maryland", 8.5, 43.5, -325, 260, "FS1"],
  ["2026-11-14", "12:00", "Northwestern", "Ohio State", -12.5, 46.5, 360, -470, "FOX"],
  ["2026-11-14", "12:00", "James Madison", "UConn", 4, 57.5, -192, 160, "CBSSN"],
  ["2026-11-14", "12:30", "Georgia Tech", "Clemson", -13.5, 47.5, 410, -550, "The CW"],
  ["2026-11-14", "12:30", "Nebraska", "Rutgers", 13.5, 52.5, -550, 410, "BTN"],
  ["2026-11-14", "12:45", "Alabama", "Vanderbilt", 15.5, 50.5, -850, 575, "SECN"],
  ["2026-11-14", "13:00", "East Carolina", "Charlotte", 11.5, 44.5, -470, 360, "ESPN+"],
  ["2026-11-14", "13:00", "UAB", "Temple", -2.5, 48.5, 110, -130, "ESPN+"],
  ["2026-11-14", "13:00", "Arkansas State", "Coastal Carolina", -1.5, 50.5, -102, -118, "ESPN+"],
  ["2026-11-14", "14:00", "Kansas State", "TCU", -10, 45.5, 310, -395, "ESPNU"],
  ["2026-11-14", "14:00", "Tulane", "Rice", -2.5, 48.5, 110, -130, "ESPN+"],
  ["2026-11-14", "14:00", "Kennesaw State", "Sam Houston", 7.5, 46.5, -305, 245, "ESPN+"],
  ["2026-11-14", "15:00", "Tennessee", "Texas A&M", 2.5, 43.5, -135, 114, "ESPN"],
  ["2026-11-14", "15:00", "Florida International", "Delaware", -5, 54.5, 180, -210, "ESPN+"],
  ["2026-11-14", "15:00", "New Mexico State", "Missouri State", -1.5, 49.5, 105, -122, "ESPN+"],
  ["2026-11-14", "15:30", "Michigan", "Oregon", -11.5, 38.5, 340, -440, "FS1"],
  ["2026-11-14", "15:30", "Baylor", "BYU", -7.5, 49.5, 240, -298, "FOX"],
  ["2026-11-14", "15:30", "Nevada", "Northern Illinois", 7, 47.5, -275, 230, "MW+"],
  ["2026-11-14", "15:30", "Jacksonville State", "Western Kentucky", 7, 54.5, -285, 235, "ESPN+"],
  ["2026-11-14", "15:30", "Florida Atlantic", "Tulsa", -5.5, 74.5, 180, -205, "ESPN+"],
  ["2026-11-14", "15:30", "USC", "Indiana", -7.5, 49.5, 230, -285, "CBS"],
  ["2026-11-14", "15:30", "California", "Virginia", -10, 47.5, 333, -410, "ACCN"],
  ["2026-11-14", "15:30", "Arizona State", "UCF", -3.5, 49.5, 142, -164, "ESPN2"],
  ["2026-11-14", "15:30", "Boston College", "Notre Dame", -29.5, 52.5, 1800, -5000, "NBC"],
  ["2026-11-14", "15:30", "Middle Tennessee", "Liberty", -20.5, 53.5, 900, -1429, "CBSSN"],
  ["2026-11-14", "15:30", "Georgia Southern", "Georgia State", 5.5, 56.5, -205, 170, "ESPN+"],
  ["2026-11-14", "15:30", "Missouri", "Georgia", -15.5, 47.5, 500, -700, "ABC"],
  ["2026-11-14", "16:00", "Fresno State", "Texas State", -8.5, 60.5, 295, -350, "The CW"],
  ["2026-11-14", "16:15", "Washington", "Michigan State", 3, 43.5, -162, 142, "BTN"],
  ["2026-11-14", "16:15", "Ole Miss", "Oklahoma", 1.5, 48.5, -115, -105, "SECN"],
  ["2026-11-14", "17:00", "Southern Miss", "Louisiana Tech", -17.5, 55.5, 650, -901, ""],
  ["2026-11-14", "17:30", "Kansas", "West Virginia", -3, 67.5, 120, -142, ""],
  ["2026-11-14", "18:00", "App State", "Marshall", 1.5, 53.5, -120, 104, ""],
  ["2026-11-14", "18:00", "Oregon State", "Boise State", -13.5, 65.5, 390, -520, ""],
  ["2026-11-14", "18:15", "Florida", "Kentucky", -3.5, 53.5, 140, -166, ""],
  ["2026-11-14", "19:00", "San José State", "Air Force", -11.5, 47.5, 375, -469, ""],
  ["2026-11-14", "19:00", "Minnesota", "Penn State", -9.5, 41.5, 290, -340, ""],
  ["2026-11-14", "19:00", "Troy", "South Alabama", -3, 56.5, 130, -154, ""],
  ["2026-11-14", "19:00", "Louisville", "North Carolina", 3.5, 59.5, -170, 142, ""],
  ["2026-11-14", "19:30", "Stanford", "Virginia Tech", -15, 58.5, 530, -714, ""],
  ["2026-11-14", "19:30", "Purdue", "Iowa", -16.5, 47.5, 625, -950, ""],
  ["2026-11-14", "19:30", "Texas", "LSU", -3.5, 46.5, 150, -180, ""],
  ["2026-11-14", "19:30", "Utah", "Arizona", 2.5, 54.5, -142, 120, ""],
  ["2026-11-14", "19:30", "UNLV", "New Mexico", -14, 46.5, 500, -588, ""],
  ["2026-11-14", "19:45", "South Carolina", "Arkansas", 7.5, 51.5, -310, 250, ""],
  ["2026-11-14", "21:00", "North Texas", "UTSA", 2.5, 77.5, -125, 108, ""],
  ["2026-11-14", "21:30", "Texas Tech", "Oklahoma State", -3.5, 72.5, 142, -170, ""],
  ["2026-11-14", "21:30", "Utah State", "San Diego State", 2.5, 42.5, -135, 122, ""],
  ["2026-11-14", "22:00", "Wyoming", "UTEP", 7.5, 39.5, -305, 260, ""],
  ["2026-11-14", "22:30", "Colorado State", "Washington State", -8.5, 67.5, 285, -334, ""],
  ["2026-11-14", "23:00", "North Dakota State", "Hawai'i", 6.5, 38.5, -235, 200, ""],
];

// NBA: Dunks & Threes team stats (SRS-adjusted), games through Fri Oct 30 2026.
// [abbr, name, aORTG, aDRTG, pace, gamesPlayed] — aORTG/aDRTG are points per 100 possessions scored/allowed, opponent-adjusted
const NBA_ROWS = [
  ["SAS", "Spurs", 117.0, 107.7, 99.9, 10],
  ["OKC", "Thunder", 114.5, 105.6, 99.0, 10],
  ["HOU", "Rockets", 115.8, 109.0, 98.0, 10],
  ["BOS", "Celtics", 114.4, 110.1, 97.1, 9],
  ["DEN", "Nuggets", 116.7, 112.5, 98.6, 8],
  ["POR", "Trail Blazers", 114.8, 110.8, 101.1, 9],
  ["LAL", "Lakers", 116.3, 112.2, 100.4, 10],
  ["MIN", "Timberwolves", 113.5, 109.6, 100.6, 10],
  ["GSW", "Warriors", 114.0, 110.8, 100.4, 10],
  ["TOR", "Raptors", 113.8, 111.2, 101.4, 9],
  ["DET", "Pistons", 112.0, 109.8, 98.8, 8],
  ["NYK", "Knicks", 113.3, 111.1, 96.6, 9],
  ["MEM", "Grizzlies", 113.5, 112.3, 101.8, 9],
  ["CLE", "Cavaliers", 114.2, 113.3, 100.6, 10],
  ["DAL", "Mavericks", 111.4, 110.9, 99.8, 9],
  ["PHI", "76ers", 111.0, 110.7, 100.5, 10],
  ["PHX", "Suns", 113.2, 113.7, 98.6, 8],
  ["ATL", "Hawks", 112.0, 112.6, 103.4, 11],
  ["MIA", "Heat", 112.8, 113.8, 103.6, 9],
  ["IND", "Pacers", 111.6, 113.1, 101.1, 10],
  ["ORL", "Magic", 110.2, 111.8, 98.0, 9],
  ["NOP", "Pelicans", 111.5, 113.4, 102.7, 9],
  ["LAC", "Clippers", 109.1, 111.8, 100.7, 8],
  ["UTA", "Jazz", 109.3, 112.5, 101.0, 9],
  ["WAS", "Wizards", 108.5, 114.8, 99.7, 10],
  ["SAC", "Kings", 109.0, 115.7, 101.7, 9],
  ["CHA", "Hornets", 108.0, 114.7, 96.5, 10],
  ["MIL", "Bucks", 108.6, 116.4, 102.8, 9],
  ["BKN", "Nets", 107.2, 115.3, 100.0, 9],
  ["CHI", "Bulls", 108.6, 117.8, 105.3, 8],
];
// tip times ET
const NBA_GAMES = [
  ["2026-11-10", "19:30", "MIL", "NYK", -15.5, 220.5, 650, -990, ""],
  ["2026-11-10", "20:00", "BOS", "PHI", 1.5, 216.5, -117, -101, ""],
  ["2026-11-10", "21:00", "MIA", "UTA", 10.5, 228.5, -497, 380, ""],
  ["2026-11-10", "22:00", "ORL", "SAC", 5.5, 222.5, -218, 181, ""],
  ["2026-11-10", "23:00", "OKC", "POR", 1.5, 226.5, -122, 103, ""],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

// CBB: KenPom ratings (pasted from kenpom.com, Nov 5). [team, conf, W-L, AdjO, AdjD, AdjT, AdjEM]
const CBB_ROWS = /*CBBROWS*/;
// tip times ET. [date, time, away, home, homeSpread, total, mlAway, mlHome, tv, extra]; null moneyline = not posted
const CBB_GAMES = [
  ["2026-11-09", "18:00", "Marshall", "Ohio State", -25.5, 162.5, 3000, -10000, ""],
  ["2026-11-09", "18:30", "Howard", "Penn", -5.5, 157.5, 195, -238, ""],
  ["2026-11-09", "18:30", "Syracuse", "Indiana", -5.5, 147.5, 190, -230, ""],
  ["2026-11-09", "19:00", "UNC Greensboro", "Illinois Chicago", -20.5, 149.5, 1700, -4500, ""],
  ["2026-11-09", "19:00", "Eastern Illinois", "Notre Dame", -28.5, 141.5, 4000, -50000, ""],
  ["2026-11-09", "19:00", "USC Upstate", "Coastal Carolina", -9.5, 148.5, 360, -470, ""],
  ["2026-11-09", "19:00", "North Florida", "Miami", -34.5, 162.5, null, null, ""],
  ["2026-11-09", "19:00", "Kansas City", "Jacksonville", -5.5, 145.5, 195, -238, ""],
  ["2026-11-09", "19:00", "Wagner", "UConn", -38.5, 140.5, null, null, ""],
  ["2026-11-09", "19:00", "Stonehill", "Columbia", -10.5, 144.5, 455, -625, ""],
  ["2026-11-09", "19:00", "LIU", "Towson", -4.5, 139.5, 205, -250, ""],
  ["2026-11-09", "19:00", "South Carolina State", "Chicago State", -4.5, 148.5, 190, -230, ""],
  ["2026-11-09", "19:00", "North Dakota", "Clemson", -21.5, 153.5, 2000, -6500, ""],
  ["2026-11-09", "19:00", "Minnesota", "Cincinnati", -7.5, 144.5, 260, -325, ""],
  ["2026-11-09", "19:00", "Cleveland State", "Bowling Green", -12.5, 157.5, 625, -950, ""],
  ["2026-11-09", "19:00", "Grambling State", "Texas", -35.5, 152.5, null, null, ""],
  ["2026-11-09", "19:00", "Radford", "Tennessee", -28.5, 153.5, 4000, -50000, ""],
  ["2026-11-09", "19:00", "Florida Gulf Coast", "Georgia", -22.5, 162.5, 1800, -5000, ""],
  ["2026-11-09", "19:30", "Florida A&M", "UAB", -16.5, 154.5, 1000, -1800, ""],
  ["2026-11-09", "19:30", "Jackson State", "Mississippi State", -23.5, 158.5, 2000, -6500, ""],
  ["2026-11-09", "19:30", "Oakland", "Alabama", -32.5, 171.5, 5000, -100000, ""],
  ["2026-11-09", "20:00", "SIUE", "Missouri", -29.5, 148.5, 4000, -50000, ""],
  ["2026-11-09", "20:00", "Louisiana Tech", "LSU", -30.5, 151.5, 5000, -100000, ""],
  ["2026-11-09", "20:00", "Boston University", "Northwestern", -16.5, 144.5, 900, -1600, ""],
  ["2026-11-09", "20:00", "UL Monroe", "Texas A&M", -36.5, 168.5, null, null, ""],
  ["2026-11-09", "20:00", "North Alabama", "Oklahoma", -27.5, 147.5, 3500, -20000, ""],
  ["2026-11-09", "20:30", "Illinois State", "Purdue", -15.5, 144.5, 1000, -1800, ""],
  ["2026-11-09", "21:00", "Seton Hall", "Charlotte", 5.5, 131.5, -225, 185, ""],
  ["2026-11-09", "21:00", "App State", "Auburn", -24.5, 146.5, 2500, -9000, ""],
  ["2026-11-09", "21:00", "Alabama A&M", "DePaul", -22.5, 138.5, 2200, -8000, ""],
];

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 10", dataDate:"2026-11-09", linesAt:"2026-11-10T13:58Z",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines: DraftKings via ESPN, Nov 9. Bye: CHI, DEN, PHI, TB. Patriots–Lions is in Munich (treated as near-neutral). Team ratings do not account for injuries.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 11", dataDate:"2026-11-08", linesAt:"2026-11-10T13:36Z",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Lines Nov 10 morning: DraftKings via ESPN where posted, CBS Sports consensus for the rest (Louisiana–UL Monroe spread and most late-Saturday games). Team EPA per play through Week 10; success rate and pass EPA through Week 9. Finished games drop off once they end.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Tue Nov 10", dataDate:"2026-11-07", linesAt:"2026-11-10T13:53Z",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from DraftKings via ESPN, Nov 10 morning. Clippers–Suns had no line posted yet. Finished games drop off once they end.",
  },
  cbb: { key:"cbb", label:"CBB", weekLabel:"Mon Nov 9", dataDate:"2026-11-08", linesAt:"2026-11-09T14:38Z",
    cfg:{basePts:70, plays:68, regress:1.0, sdMargin:10.5, sdGrow:0.12, sdTotal:12.0, wModel:0.35, wTotal:0.33, hfa:3.2, keys:[]},
    footer:"Lines from DraftKings via ESPN, Nov 9 morning. Games without a posted line are left off. Finished games drop off once they end.",
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
