// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-11-19", "20:15", "IND", "HOU", -12.5, 44.5, 500, -700, "Prime"],
  ["2026-11-22", "13:00", "ARI", "KC", -15.5, 40.5, 850, -1440, ""],
  ["2026-11-22", "13:00", "BAL", "CAR", -2.5, 44.5, 119, -140, ""],
  ["2026-11-22", "13:00", "MIA", "BUF", -16.5, 44.5, 890, -1560, ""],
  ["2026-11-22", "13:00", "NO", "CHI", -11.5, 47.5, 476, -650, ""],
  ["2026-11-22", "13:00", "TB", "DET", -3.5, 48.5, 183, -219, ""],
  ["2026-11-22", "13:00", "TEN", "DAL", -7.5, 54.5, 309, -390, ""],
  ["2026-11-22", "13:00", "PIT", "PHI", 3.5, 37.5, -200, 168, ""],
  ["2026-11-22", "16:05", "NYJ", "LAC", -3, 42.5, 145, -173, ""],
  ["2026-11-22", "16:25", "JAX", "NYG", 6, 45.5, -266, 219, ""],
  ["2026-11-22", "16:25", "LV", "DEN", -10.5, 40.5, 469, -640, ""],
  ["2026-11-22", "20:20", "MIN", "SF", -3.5, 46.5, 148, -176, "NBC", {"venue": "Estadio Banorte, Mexico City", "hfa": 0.5, "note": "Mexico City — treated as near-neutral"}],
  ["2026-11-23", "20:15", "CIN", "WAS", 6, 54.5, -296, 241, "ESPN"],
];
const NFL_VENUES={"BAL": "M&T Bank Stadium", "NO": "Caesars Superdome", "IND": "Lucas Oil Stadium", "CAR": "Bank of America Stadium", "MIA": "Hard Rock Stadium", "WAS": "Northwest Stadium", "PHI": "Lincoln Financial Field", "KC": "GEHA Field at Arrowhead Stadium", "LAC": "SoFi Stadium", "SF": "Levi's Stadium", "NE": "Gillette Stadium", "SEA": "Lumen Field", "CHI": "Soldier Field", "MIN": "U.S. Bank Stadium"};

const CFB_GAMES = [
  ["2026-11-17", "18:00", "Eastern Michigan", "Western Michigan", -14.5, 47.5, 500, -700, ""],
  ["2026-11-17", "19:00", "Ball State", "Ohio", -9.5, 50.5, 350, -455, ""],
  ["2026-11-17", "19:00", "Miami (OH)", "Kent State", 8.5, 45.5, -355, 280, ""],
  ["2026-11-18", "19:00", "Akron", "Massachusetts", -3.5, 47.5, 136, -162, ""],
  ["2026-11-18", "19:30", "Central Michigan", "Buffalo", -1.5, 43.5, -102, -118, ""],
  ["2026-11-19", "19:30", "Rice", "Temple", -4, 47.5, 124, -148, ""],
  ["2026-11-20", "18:00", "Iowa State", "UCF", -1.5, 54.5, 105, -125, ""],
  ["2026-11-20", "19:30", "Clemson", "Duke", -8.5, 44.5, 390, -520, ""],
  ["2026-11-20", "19:30", "Bowling Green", "Toledo", -15.5, 47.5, 525, -750, ""],
  ["2026-11-20", "20:00", "Oregon", "Michigan State", 12.5, 45.5, -750, 525, ""],
  ["2026-11-20", "20:00", "UTEP", "Air Force", -21.5, 46.5, 1100, -2100, ""],
  ["2026-11-20", "21:00", "New Mexico", "Wyoming", 10.5, 38.5, -305, 245, ""],
  ["2026-11-21", "12:00", "Vanderbilt", "Florida", -13.5, 48.5, 410, -550, ""],
  ["2026-11-21", "12:00", "BYU", "Kansas", 7, 50.5, -225, 185, ""],
  ["2026-11-21", "12:00", "Colorado", "Cincinnati", -2.5, 59.5, 136, -162, ""],
  ["2026-11-21", "12:00", "Syracuse", "Boston College", 3.5, 50.5, -135, 114, ""],
  ["2026-11-21", "12:00", "Wake Forest", "Georgia Tech", 20.5, 56.5, -1600, 900, ""],
  ["2026-11-21", "12:00", "Northwestern", "Minnesota", 3, 43.5, -155, 130, ""],
  ["2026-11-21", "12:00", "Ohio State", "Nebraska", 5.5, 47.5, -162, 136, ""],
  ["2026-11-21", "12:00", "Wisconsin", "Purdue", 6, 44.5, -218, 180, ""],
  ["2026-11-21", "12:00", "East Carolina", "Army", -4.5, 42.5, 185, -225, ""],
  ["2026-11-21", "12:00", "Memphis", "Navy", 3, 64.5, -170, 142, ""],
  ["2026-11-21", "12:00", "North Texas", "Tulane", 13.5, 60.5, -250, 205, ""],
  ["2026-11-21", "12:30", "North Carolina", "Virginia", -1.5, 43.5, -102, -118, ""],
  ["2026-11-21", "13:00", "Houston", "West Virginia", 7, 71.5, -310, 250, ""],
  ["2026-11-21", "13:00", "Western Kentucky", "Liberty", -14.5, 52.5, 575, -850, ""],
  ["2026-11-21", "14:00", "Charlotte", "Tulsa", -20.5, 52.5, 1100, -2100, ""],
  ["2026-11-21", "14:00", "Missouri State", "Jacksonville State", -10.5, 53.5, 320, -410, ""],
  ["2026-11-21", "14:00", "Middle Tennessee", "Sam Houston", 5.5, 49.5, -218, 180, ""],
  ["2026-11-21", "14:30", "Iowa", "Illinois", 5.5, 43.5, -325, 260, ""],
  ["2026-11-21", "14:30", "South Florida", "Florida Atlantic", -1.5, 69.5, -115, -105, ""],
  ["2026-11-21", "14:30", "UL Monroe", "App State", -13.5, 50.5, 455, -625, ""],
  ["2026-11-21", "15:00", "Coastal Carolina", "Louisiana", -7.5, 50.5, 320, -410, ""],
  ["2026-11-21", "15:00", "Delaware", "New Mexico State", 4.5, 53.5, -166, 140, ""],
  ["2026-11-21", "15:00", "Florida International", "Kennesaw State", -4, 42.5, 142, -170, ""],
  ["2026-11-21", "15:30", "LSU", "Tennessee", 1.5, 57.5, -115, -105, ""],
  ["2026-11-21", "15:30", "Arkansas", "Texas", -21, 48.5, 900, -1600, ""],
  ["2026-11-21", "15:30", "Texas Tech", "Baylor", 1.5, 55.5, -170, 142, ""],
  ["2026-11-21", "15:30", "NC State", "Florida State", -10, 54.5, 295, -375, ""],
  ["2026-11-21", "15:30", "UCLA", "Michigan", 5.5, 42.5, -185, 154, ""],
  ["2026-11-21", "15:30", "Rutgers", "Penn State", -20.5, 49.5, 1200, -2400, ""],
  ["2026-11-21", "15:30", "Indiana", "Washington", 7.5, 43.5, -310, 250, ""],
  ["2026-11-21", "15:30", "Old Dominion", "UConn", -14.5, 48.5, 400, -535, ""],
  ["2026-11-21", "15:45", "Texas A&M", "Oklahoma", -2.5, 51.5, 245, -305, ""],
  ["2026-11-21", "16:00", "Northern Illinois", "North Dakota State", -25.5, 48.5, 1400, -3200, ""],
  ["2026-11-21", "16:00", "Georgia Southern", "Troy", 8.5, 47.5, -325, 260, ""],
  ["2026-11-21", "16:00", "Georgia State", "Marshall", 1.5, 57.5, -110, -110, ""],
  ["2026-11-21", "16:00", "South Alabama", "Southern Miss", 3.5, 65.5, -185, 154, ""],
  ["2026-11-21", "18:00", "Washington State", "Texas State", -10.5, 61.5, 330, -425, ""],
  ["2026-11-21", "18:15", "Maryland", "USC", -17.5, 57.5, 600, -900, ""],
  ["2026-11-21", "19:00", "Arizona", "Kansas State", 7, 52.5, -290, 235, ""],
  ["2026-11-21", "19:00", "Virginia Tech", "Miami", -20.5, 61.5, 900, -1600, ""],
  ["2026-11-21", "19:00", "UNLV", "San José State", 7, 46.5, -258, 210, ""],
  ["2026-11-21", "19:00", "Arkansas State", "Louisiana Tech", -13.5, 52.5, 425, -575, ""],
  ["2026-11-21", "19:30", "Kentucky", "Missouri", -5.5, 48.5, 180, -218, ""],
  ["2026-11-21", "19:30", "Georgia", "South Carolina", 16.5, 50.5, -850, 575, ""],
  ["2026-11-21", "19:30", "Pittsburgh", "Louisville", -13.5, 50.5, 410, -550, ""],
  ["2026-11-21", "19:30", "SMU", "Notre Dame", -20.5, 56.5, 950, -1650, ""],
  ["2026-11-21", "19:30", "Stanford", "California", 2.5, 56.5, -130, 110, ""],
  ["2026-11-21", "19:30", "Colorado State", "Fresno State", -20.5, 65.5, 850, -1450, ""],
  ["2026-11-21", "20:00", "UTSA", "UAB", 6.5, 52.5, -238, 195, ""],
  ["2026-11-21", "21:00", "Utah", "TCU", 7, 46.5, -270, 220, ""],
  ["2026-11-21", "21:30", "San Diego State", "Boise State", -16.5, 61.5, 600, -900, ""],
  ["2026-11-21", "22:15", "Oklahoma State", "Arizona State", 3, 61.5, -162, 136, ""],
  ["2026-11-21", "22:30", "Utah State", "Oregon State", -9.5, 51.5, 280, -355, ""],
  ["2026-11-21", "22:30", "Hawai'i", "Nevada", -4, 40.5, 160, -192, ""],
];

// NBA injury adjustments, applied to the team's ratings until the return date (pts per 100 possessions).
// ortg: change to offensive rating (negative = worse); drtg: change to points allowed per 100 (positive = worse)
const NBA_INJ = [
  {team:"GSW", player:"Stephen Curry", until:"2026-12-05", ortg:-5.0, drtg:1.0},
];
function nbaRowsAdj(rows){
  const today=new Date().toISOString().slice(0,10);
  return rows.map(r=>{const adj=NBA_INJ.filter(x=>x.team===r[0]&&today<x.until);
    if(!adj.length) return r; const o=r.slice(); adj.forEach(x=>{o[2]+=x.ortg; o[3]+=x.drtg;}); return o;});
}
// NBA: Dunks & Threes team stats (SRS-adjusted), games through Fri Oct 30 2026.
// [abbr, name, aORTG, aDRTG, pace, gamesPlayed] — aORTG/aDRTG are points per 100 possessions scored/allowed, opponent-adjusted
const NBA_ROWS = [
  ["SAS", "Spurs", 117.9, 109.1, 98.7, 16],
  ["BOS", "Celtics", 116.3, 109.3, 96.6, 15],
  ["OKC", "Thunder", 114.3, 107.7, 99.3, 15],
  ["HOU", "Rockets", 118.5, 112.1, 97.6, 16],
  ["MIN", "Timberwolves", 113.3, 108.5, 100.8, 16],
  ["POR", "Trail Blazers", 116.3, 111.6, 100.8, 15],
  ["NYK", "Knicks", 114.9, 110.5, 95.3, 15],
  ["DET", "Pistons", 113.9, 110.5, 98.7, 14],
  ["LAL", "Lakers", 117.1, 114.2, 100.1, 16],
  ["MEM", "Grizzlies", 117.1, 114.3, 100.0, 16],
  ["DEN", "Nuggets", 116.3, 113.6, 98.1, 13],
  ["TOR", "Raptors", 114.2, 112.7, 97.9, 15],
  ["PHI", "76ers", 114.4, 113.0, 100.1, 16],
  ["GSW", "Warriors", 112.9, 112.0, 99.2, 16],
  ["CLE", "Cavaliers", 116.2, 115.4, 100.0, 16],
  ["MIA", "Heat", 116.2, 115.7, 102.2, 15],
  ["ATL", "Hawks", 111.8, 112.2, 103.6, 15],
  ["ORL", "Magic", 112.8, 113.3, 97.3, 14],
  ["DAL", "Mavericks", 112.3, 112.9, 100.1, 15],
  ["PHX", "Suns", 114.7, 115.4, 98.4, 14],
  ["IND", "Pacers", 112.2, 113.8, 100.6, 15],
  ["UTA", "Jazz", 109.9, 113.1, 100.3, 16],
  ["LAC", "Clippers", 111.4, 116.0, 99.9, 14],
  ["CHI", "Bulls", 112.2, 117.3, 103.7, 14],
  ["CHA", "Hornets", 108.6, 114.0, 96.2, 14],
  ["WAS", "Wizards", 111.0, 116.8, 99.4, 16],
  ["NOP", "Pelicans", 112.0, 118.1, 101.2, 16],
  ["MIL", "Bucks", 109.5, 117.5, 101.0, 16],
  ["BKN", "Nets", 110.1, 118.1, 99.5, 14],
  ["SAC", "Kings", 108.6, 117.2, 100.5, 14],
];
// tip times ET
const NBA_GAMES = [
  ["2026-11-23", "19:00", "MEM", "CHA", 3.5, 215.5, -164, 138, ""],
  ["2026-11-23", "19:00", "POR", "PHI", -2.5, 228.5, 121, -144, ""],
  ["2026-11-23", "19:30", "BKN", "MIN", -12.5, 223.5, 410, -549, "Peacock"],
  ["2026-11-23", "19:30", "MIL", "TOR", -10.5, 223.5, 350, -450, ""],
  ["2026-11-23", "19:30", "OKC", "IND", 5.5, 222.5, -200, 168, ""],
  ["2026-11-23", "20:00", "CLE", "CHI", 8.5, 239.5, -330, 265, ""],
  ["2026-11-23", "20:00", "PHX", "NOP", 2.5, 233.5, -156, 132, ""],
  ["2026-11-23", "20:30", "LAC", "HOU", -13.5, 225.5, 448, -610, ""],
  ["2026-11-23", "22:00", "SAS", "SAC", 10.5, 224.5, -481, 370, ""],
  ["2026-11-23", "22:00", "UTA", "LAL", -13.5, 227.5, 570, -820, "NBA TV"],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

// CBB: KenPom ratings (pasted from kenpom.com, Nov 5). [team, conf, W-L, AdjO, AdjD, AdjT, AdjEM]
const CBB_ROWS = /*CBBROWS*/;
// tip times ET. [date, time, away, home, homeSpread, total, mlAway, mlHome, tv, extra]; null moneyline = not posted
const CBB_GAMES = [
  ["2026-11-23", "11:00", "St. Bonaventure", "App State", 4.5, 134.5, -205, 170, "ESPN2", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "11:00", "Northern Iowa", "Davidson", -5.5, 142.5, 185, -225, "", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "12:30", "Indiana State", "East Carolina", -2.5, 146.5, 130, -155, "", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "13:00", "Long Beach State", "Florida International", -9.5, 159.5, 340, -440, "ESPN+"],
  ["2026-11-23", "13:30", "Akron", "Wright State", -1.5, 147.5, 110, -130, "ESPNU", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "13:30", "Charlotte", "Florida Gulf Coast", 7.5, 145.5, -278, 225, "", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "14:00", "Tulsa", "Oregon State", -6.5, 151.5, 210, -258, "FloSports", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "14:30", "Ole Miss", "Clemson", 5.5, 150.5, -230, 190, "ESPN2", {"venue": "Lahaina Civic Center, Lahaina, HI", "hfa": 0, "note": "Maui Invitational — neutral site"}],
  ["2026-11-23", "15:00", "Middle Tennessee", "Southern Illinois", -1.5, 150.5, 130, -155, "", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "15:30", "Arkansas State", "Southern Utah", 6.5, 159.5, -298, 240, "ESPN+", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "15:30", "William & Mary", "IU Indy", 4.5, 165.5, -218, 180, "ESPN+", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "16:00", "Yale", "Belmont", -2.5, 143.5, 120, -142, "ESPNU", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "16:00", "Tulane", "Georgia State", -1.5, 149.5, 105, -125, "", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "16:30", "Nevada", "San Francisco", 7.5, 138.5, -325, 260, "FloSports", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "17:00", "Washington", "BYU", -10.5, 166.5, 525, -750, "ESPN2", {"venue": "Lahaina Civic Center, Lahaina, HI", "hfa": 0, "note": "Maui Invitational — neutral site"}],
  ["2026-11-23", "17:30", "Temple", "Tennessee Martin", 4.5, 145.5, -148, 124, "", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — likely neutral site (venue unconfirmed)"}],
  ["2026-11-23", "18:30", "Maryland Eastern Shore", "Youngstown State", -13.5, 133.5, 800, -1350, "ESPN+"],
  ["2026-11-23", "19:00", "North Carolina A&T", "South Carolina State", 2.5, 149.5, -142, 120, ""],
  ["2026-11-23", "19:00", "Georgia Southern", "Northern Kentucky", -3.5, 166.5, 136, -162, "ESPN+"],
  ["2026-11-23", "19:00", "Fairleigh Dickinson", "Iona", -9.5, 135.5, 320, -410, "ESPN+"],
  ["2026-11-23", "19:00", "Central Arkansas", "North Florida", 8.5, 164.5, -470, 360, "ESPN+"],
  ["2026-11-23", "19:00", "Illinois State", "Santa Clara", -4.5, 151.5, 185, -225, "FloSports", {"venue": "neutral site", "hfa": 0, "note": "Feast Week event — neutral site"}],
  ["2026-11-23", "19:30", "Texas A&M Corpus Chris", "Wichita State", -21.5, 144.5, 2000, -6500, "ESPN+"],
  ["2026-11-23", "20:00", "Stephen F. Austin", "Utah Valley", -3.5, 152.5, 145, -175, ""],
  ["2026-11-23", "20:00", "Winthrop", "Illinois", -43.5, 180.5, null, null, "BTN"],
  ["2026-11-23", "20:00", "Monmouth", "North Carolina", -19.5, 153.5, 1700, -4500, "ACCN"],
  ["2026-11-23", "20:00", "Denver", "Kansas", -35.5, 158.5, null, null, "ESPN+"],
  ["2026-11-23", "21:00", "VCU", "Providence", -1.5, 154.5, 102, -122, "ESPNU", {"venue": "Lahaina Civic Center, Lahaina, HI", "hfa": 0, "note": "Maui Invitational — neutral site"}],
  ["2026-11-23", "21:30", "UNC Greensboro", "Pepperdine", -10.5, 155.5, 470, -650, "ESPN+"],
  ["2026-11-23", "22:00", "Eastern Washington", "UNLV", -7.5, 160.5, 270, -340, "MW Network"],
  ["2026-11-23", "22:00", "Alabama State", "California", -19.5, 145.5, 1800, -5000, "ACCNX"],
  ["2026-11-23", "23:30", "Colorado State", "Arizona", -16.5, 159.5, 1200, -2400, "ESPN2", {"venue": "Lahaina Civic Center, Lahaina, HI", "hfa": 0, "note": "Maui Invitational — neutral site"}],
];

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 11", dataDate:"2026-11-17", linesAt:"2026-11-22T16:30Z",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines: DraftKings via ESPN, Nov 17. Bye: ATL, CLE, GB, LA, NE, SEA. Vikings–49ers is in Mexico City (treated as near-neutral). Team ratings do not account for injuries.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 12", dataDate:"2026-11-16", linesAt:"2026-11-17T14:00Z",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Lines: DraftKings via ESPN, Nov 17 at 8:00 AM CT. Team stats (EPA per play, success rate, pass EPA) through Nov 16. Finished games drop off once they end.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Mon Nov 23", dataDate:"2026-11-20", linesAt:"2026-11-23T13:42Z",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from DraftKings via ESPN and FanDuel Research, Nov 23. Finished games drop off once they end.",
  },
  cbb: { key:"cbb", label:"CBB", weekLabel:"Mon Nov 23", dataDate:"2026-11-23", linesAt:"2026-11-23T16:38Z",
    cfg:{basePts:70, plays:68, regress:1.0, sdMargin:10.5, sdGrow:0.12, sdTotal:12.0, wModel:0.35, bigStart:20, bigK:0.027, wTotal:0.33, hfa:3.2, keys:[]},
    footer:"Lines from DraftKings via ESPN, Nov 23. Games without a posted line are left off. Finished games drop off once they end.",
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
  // CBB: trust the ratings less on huge spreads (early-season blowouts outrun them)
  const big=Math.max(0,Math.abs(g.spread)-(cfg.bigStart??99)), wM=cfg.wModel/(1+(cfg.bigK||0)*big);
  const margin=wM*rawMargin+(1-wM)*mktMargin;
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
  const teams=key==="nfl"?parseNFL(NFL_CSV):key==="nba"?parseNBA(nbaRowsAdj(NBA_ROWS)):key==="cbb"?parseCBB(CBB_ROWS):parseCFB(CFB_ROWS);
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
