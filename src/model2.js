// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-11-25", "20:00", "GB", "LA", -2.5, 44.5, 114, -135, "Netflix"],
  ["2026-11-26", "13:00", "CHI", "DET", 1.5, 56.5, -114, -103, "CBS"],
  ["2026-11-26", "16:30", "PHI", "DAL", -9.5, 49.5, 371, -482, "FOX"],
  ["2026-11-26", "20:20", "KC", "BUF", -3, 45.5, 129, -153, "NBC"],
  ["2026-11-27", "15:00", "DEN", "PIT", 4.5, 36.5, -229, 190, "Prime"],
  ["2026-11-29", "13:00", "ATL", "MIN", -7, 41.5, 252, -311, ""],
  ["2026-11-29", "13:00", "BAL", "HOU", -6.5, 47.5, 267, -332, ""],
  ["2026-11-29", "13:00", "NO", "CIN", -10, 49.5, 423, -563, ""],
  ["2026-11-29", "13:00", "NYG", "IND", 6, 41.5, -287, 236, ""],
  ["2026-11-29", "13:00", "NYJ", "MIA", 4.5, 40.5, -220, 183, ""],
  ["2026-11-29", "13:00", "TEN", "JAX", -14.5, 49.5, 740, -1180, ""],
  ["2026-11-29", "16:05", "NE", "LAC", 1.5, 35.5, -117, -101, ""],
  ["2026-11-29", "16:25", "SEA", "SF", -2.5, 44.5, 130, -154, ""],
  ["2026-11-29", "16:25", "WAS", "ARI", 6.5, 41.5, -351, 281, ""],
  ["2026-11-29", "20:20", "LV", "CLE", -4.5, 40.5, 201, -244, "NBC"],
  ["2026-11-30", "20:15", "CAR", "TB", -3, 43.5, 132, -157, "ESPN"],
];
const NFL_VENUES={"BAL": "M&T Bank Stadium", "NO": "Caesars Superdome", "IND": "Lucas Oil Stadium", "CAR": "Bank of America Stadium", "MIA": "Hard Rock Stadium", "WAS": "Northwest Stadium", "PHI": "Lincoln Financial Field", "KC": "GEHA Field at Arrowhead Stadium", "LAC": "SoFi Stadium", "SF": "Levi's Stadium", "NE": "Gillette Stadium", "SEA": "Lumen Field", "CHI": "Soldier Field", "MIN": "U.S. Bank Stadium"};

const CFB_GAMES = [
  ["2026-11-24", "19:00", "Kent State", "Eastern Michigan", -5.5, 45.5, 185, -225, ""],
  ["2026-11-24", "19:00", "Miami (OH)", "Western Michigan", -6.5, 45.5, 220, -270, ""],
  ["2026-11-26", "20:00", "TCU", "Texas Tech", -13.5, 47.5, 410, -550, ""],
  ["2026-11-27", "12:00", "Mississippi State", "Ole Miss", -18.5, 56.5, 750, -1200, ""],
  ["2026-11-27", "12:00", "Nebraska", "Iowa", -4.5, 39.5, 170, -205, ""],
  ["2026-11-27", "12:00", "Tulsa", "UTSA", -1.5, 58.5, 100, -120, ""],
  ["2026-11-27", "12:00", "Buffalo", "Akron", 7.5, 50.5, -310, 250, ""],
  ["2026-11-27", "12:00", "Toledo", "Ohio", 3, 49.5, -155, 130, ""],
  ["2026-11-27", "15:00", "App State", "South Alabama", -3.5, 56.5, 136, -162, ""],
  ["2026-11-27", "15:30", "Florida", "Florida State", 6, 52.5, -218, 180, ""],
  ["2026-11-27", "15:30", "Temple", "Memphis", -17.5, 64.5, 625, -950, ""],
  ["2026-11-27", "15:30", "North Dakota State", "San José State", 9.5, 39.5, -375, 295, ""],
  ["2026-11-27", "16:30", "Air Force", "New Mexico", -6.5, 41.5, 210, -258, ""],
  ["2026-11-27", "19:30", "Texas", "Texas A&M", 12.5, 40.5, -485, 370, ""],
  ["2026-11-27", "19:30", "Minnesota", "Wisconsin", -7.5, 37.5, 235, -290, ""],
  ["2026-11-27", "21:00", "West Virginia", "Utah", -22.5, 68.5, 1000, -1800, ""],
  ["2026-11-28", "12:00", "Louisville", "Kentucky", 3, 53.5, -142, 120, ""],
  ["2026-11-28", "12:00", "Boston College", "Miami", -24.5, 54.5, 1300, -2800, ""],
  ["2026-11-28", "12:00", "NC State", "North Carolina", -5.5, 53.5, 185, -225, ""],
  ["2026-11-28", "12:00", "Notre Dame", "Syracuse", 25.5, 53.5, -2800, 1300, ""],
  ["2026-11-28", "12:00", "Michigan", "Ohio State", -10.5, 37.5, 330, -425, ""],
  ["2026-11-28", "12:00", "UConn", "Wyoming", 3.5, 44.5, -170, 142, ""],
  ["2026-11-28", "12:00", "Navy", "Charlotte", 16.5, 53.5, -800, 550, ""],
  ["2026-11-28", "12:00", "Central Michigan", "Ball State", 3.5, 50.5, -180, 150, ""],
  ["2026-11-28", "12:00", "Louisiana Tech", "Georgia Southern", -1.5, 52.5, 100, -120, ""],
  ["2026-11-28", "12:30", "Illinois", "Northwestern", -3.5, 48.5, 140, -166, ""],
  ["2026-11-28", "12:45", "LSU", "Arkansas", 14.5, 49.5, -625, 455, ""],
  ["2026-11-28", "13:00", "Florida Atlantic", "East Carolina", -1.5, 58.5, -102, -118, ""],
  ["2026-11-28", "13:00", "Kennesaw State", "Western Kentucky", 3.5, 54.5, -170, 142, ""],
  ["2026-11-28", "13:00", "Marshall", "UL Monroe", 6.5, 51.5, -230, 190, ""],
  ["2026-11-28", "13:00", "Southern Miss", "Old Dominion", -5.5, 49.5, 180, -218, ""],
  ["2026-11-28", "14:00", "UCF", "Colorado", -2.5, 47.5, 110, -130, ""],
  ["2026-11-28", "14:00", "Kansas State", "Iowa State", -4, 52.5, 160, -192, ""],
  ["2026-11-28", "14:00", "Army", "Rice", 4.5, 46.5, -198, 164, ""],
  ["2026-11-28", "14:00", "Coastal Carolina", "James Madison", -17.5, 54.5, 625, -950, ""],
  ["2026-11-28", "14:00", "Louisiana", "Georgia State", 4.5, 55.5, -198, 164, ""],
  ["2026-11-28", "14:00", "Liberty", "Missouri State", 18.5, 52.5, -1000, 650, ""],
  ["2026-11-28", "14:00", "Sam Houston", "Florida International", -11.5, 41.5, 360, -470, ""],
  ["2026-11-28", "14:00", "New Mexico State", "Middle Tennessee", -3, 51.5, 140, -166, ""],
  ["2026-11-28", "15:00", "South Carolina", "Clemson", 6.5, 42.5, -250, 205, ""],
  ["2026-11-28", "15:00", "Virginia", "Virginia Tech", -2.5, 50.5, 124, -148, ""],
  ["2026-11-28", "15:00", "Troy", "Arkansas State", -3.5, 46.5, 154, -185, ""],
  ["2026-11-28", "15:30", "Georgia Tech", "Georgia", -35.5, 55.5, 2200, -8000, ""],
  ["2026-11-28", "15:30", "Cincinnati", "BYU", -16.5, 55.5, 550, -800, ""],
  ["2026-11-28", "15:30", "Duke", "Wake Forest", -14.5, 55.5, 470, -650, ""],
  ["2026-11-28", "15:30", "SMU", "Stanford", 7.5, 60.5, -285, 230, ""],
  ["2026-11-28", "15:30", "Penn State", "Maryland", 7.5, 48.5, -290, 235, ""],
  ["2026-11-28", "15:30", "USC", "UCLA", 5.5, 46.5, -205, 170, "", {"adjHome": -5, "note": "UCLA starting a backup QB: model takes 5 points off UCLA"}],
  ["2026-11-28", "15:30", "Tulane", "South Florida", -7, 44.5, 220, -270, ""],
  ["2026-11-28", "15:30", "UTEP", "Northern Illinois", -4.5, 50.5, 160, -192, ""],
  ["2026-11-28", "15:30", "Massachusetts", "Bowling Green", -3, 41.5, 136, -162, ""],
  ["2026-11-28", "15:30", "Jacksonville State", "Delaware", -2.5, 58.5, 120, -142, ""],
  ["2026-11-28", "16:00", "UAB", "North Texas", -2.5, 44.5, 114, -135, ""],
  ["2026-11-28", "16:15", "Oklahoma", "Missouri", -1.5, 41.5, 105, -125, ""],
  ["2026-11-28", "16:15", "Michigan State", "Rutgers", 2.5, 45.5, -135, 114, ""],
  ["2026-11-28", "18:00", "Boise State", "Colorado State", 21, 76.5, -1800, 1000, ""],
  ["2026-11-28", "18:15", "Kansas", "Oklahoma State", -6, 64.5, 185, -225, ""],
  ["2026-11-28", "18:30", "San Diego State", "Washington State", -3, 46.5, 124, -148, ""],
  ["2026-11-28", "19:00", "Tennessee", "Vanderbilt", 13.5, 43.5, -550, 410, ""],
  ["2026-11-28", "19:00", "Purdue", "Indiana", -23.5, 52.5, 1200, -2400, ""],
  ["2026-11-28", "19:30", "Auburn", "Alabama", -14.5, 50.5, 490, -675, ""],
  ["2026-11-28", "19:30", "Pittsburgh", "California", 9.5, 47.5, -355, 280, ""],
  ["2026-11-28", "19:30", "Washington", "Oregon", -13.5, 51.5, 455, -625, ""],
  ["2026-11-28", "21:00", "Arizona State", "Arizona", -9.5, 53.5, 250, -310, ""],
  ["2026-11-28", "21:00", "Nevada", "UNLV", -5.5, 44.5, 185, -225, ""],
  ["2026-11-28", "21:30", "Baylor", "Houston", -3.5, 56.5, 145, -175, ""],
  ["2026-11-28", "21:30", "Texas State", "Utah State", 7.5, 52.5, -305, 245, ""],
  ["2026-11-28", "22:00", "Oregon State", "Fresno State", -3, 58.5, 124, -148, ""],
  ["2026-11-28", "23:00", "Sacramento State", "Hawai'i", -13.5, 39.5, 425, -575, ""],
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
  ["SAS", "Spurs", 117.9, 108.8, 98.5, 18],
  ["BOS", "Celtics", 115.0, 108.7, 96.2, 17],
  ["HOU", "Rockets", 118.7, 112.5, 97.7, 18],
  ["OKC", "Thunder", 114.6, 109.1, 99.6, 18],
  ["MIN", "Timberwolves", 113.6, 108.2, 100.7, 18],
  ["POR", "Trail Blazers", 116.7, 111.4, 99.9, 17],
  ["NYK", "Knicks", 114.5, 110.2, 95.3, 17],
  ["DEN", "Nuggets", 117.4, 114.3, 98.5, 15],
  ["DET", "Pistons", 113.6, 110.7, 98.2, 16],
  ["MEM", "Grizzlies", 117.2, 114.3, 99.5, 18],
  ["LAL", "Lakers", 117.0, 114.1, 99.5, 18],
  ["GSW", "Warriors", 112.9, 111.8, 98.5, 17],
  ["TOR", "Raptors", 114.3, 113.2, 97.4, 17],
  ["MIA", "Heat", 116.5, 115.8, 102.1, 16],
  ["PHI", "76ers", 114.8, 114.2, 99.9, 18],
  ["CLE", "Cavaliers", 115.8, 115.6, 100.3, 18],
  ["ATL", "Hawks", 111.9, 111.8, 102.9, 17],
  ["PHX", "Suns", 114.6, 115.0, 98.2, 16],
  ["DAL", "Mavericks", 112.5, 113.1, 99.7, 17],
  ["IND", "Pacers", 112.4, 113.8, 100.9, 18],
  ["ORL", "Magic", 112.5, 113.9, 96.9, 16],
  ["UTA", "Jazz", 109.6, 113.3, 99.7, 19],
  ["LAC", "Clippers", 111.2, 115.8, 99.4, 16],
  ["CHI", "Bulls", 112.5, 117.4, 102.7, 17],
  ["WAS", "Wizards", 110.7, 115.8, 98.9, 18],
  ["CHA", "Hornets", 108.9, 114.5, 95.9, 16],
  ["NOP", "Pelicans", 111.7, 117.6, 100.9, 19],
  ["MIL", "Bucks", 110.3, 117.9, 100.9, 18],
  ["SAC", "Kings", 109.0, 116.7, 99.5, 17],
  ["BKN", "Nets", 110.6, 118.9, 99.5, 16],
];
// tip times ET
const NBA_GAMES = [
  ["2026-11-28", "17:00", "ORL", "WAS", 3.5, 218.5, -169, 142, ""],
  ["2026-11-28", "18:00", "BKN", "CHA", -5.5, 213.5, 186, -224, ""],
  ["2026-11-28", "20:00", "IND", "CHI", -2.5, 234.5, 119, -141, ""],
  ["2026-11-28", "20:00", "OKC", "MIL", 12.5, 228.5, -561, 420, ""],
  ["2026-11-28", "20:30", "PHI", "HOU", -10.5, 221.5, 365, -473, ""],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

// CBB: KenPom ratings (pasted from kenpom.com, Nov 5). [team, conf, W-L, AdjO, AdjD, AdjT, AdjEM]
const CBB_ROWS = /*CBBROWS*/;
// tip times ET. [date, time, away, home, homeSpread, total, mlAway, mlHome, tv, extra]; null moneyline = not posted
const CBB_GAMES = [
  ["2026-11-28", "12:00", "Siena", "Seton Hall", -17.5, 156.5, 1300, -2800, ""],
  ["2026-11-28", "12:00", "Princeton", "St. Thomas", -2.5, 142.5, 110, -130, ""],
  ["2026-11-28", "12:00", "Elon", "NC State", -20.5, 149.5, null, null, ""],
  ["2026-11-28", "13:00", "Robert Morris", "Northern Iowa", -6.5, 147.5, 215, -265, ""],
  ["2026-11-28", "13:00", "Wofford", "Purdue Fort Wayne", -2.5, 154.5, 110, -130, ""],
  ["2026-11-28", "13:00", "Hampton", "Radford", 1.5, 134.5, -120, 100, ""],
  ["2026-11-28", "13:00", "Colgate", "Vermont", 1.5, 143.5, -122, 102, ""],
  ["2026-11-28", "13:00", "Alcorn State", "Georgia Tech", -28.5, 162.5, 3500, -20000, ""],
  ["2026-11-28", "13:00", "North Carolina Central", "Gardner Webb", -2.5, 137.5, 120, -142, ""],
  ["2026-11-28", "13:30", "Lehigh", "Pepperdine", -9.5, 148.5, 360, -470, ""],
  ["2026-11-28", "14:00", "Manhattan", "Morgan State", -2.5, 150.5, 120, -142, ""],
  ["2026-11-28", "14:00", "North Florida", "Columbia", -14.5, 157.5, 800, -1350, ""],
  ["2026-11-28", "14:00", "Central Connecticut", "Navy", 1.5, 128.5, -120, 100, ""],
  ["2026-11-28", "14:00", "Delaware State", "North Carolina A&T", -10.5, 141.5, 455, -625, ""],
  ["2026-11-28", "14:00", "Georgia Southern", "UNC Asheville", 1.5, 158.5, -120, 100, ""],
  ["2026-11-28", "14:00", "Troy", "Chattanooga", -4.5, 146.5, 150, -180, ""],
  ["2026-11-28", "14:00", "East Texas A&M", "Marshall", -8.5, 148.5, 285, -360, ""],
  ["2026-11-28", "14:00", "Prairie View A&M", "Iowa", -33.5, 136.5, null, null, ""],
  ["2026-11-28", "14:00", "The Citadel", "High Point", -26.5, 143.5, 3500, -20000, ""],
  ["2026-11-28", "14:00", "Sacramento State", "Presbyterian", -1.5, 156.5, 110, -130, ""],
  ["2026-11-28", "14:00", "Marist", "George Mason", -20.5, 130.5, 1500, -3600, ""],
  ["2026-11-28", "14:00", "Le Moyne", "Niagara", 1.5, 145.5, -122, 102, ""],
  ["2026-11-28", "14:00", "Chicago State", "Bradley", -14.5, 128.5, 950, -1650, ""],
  ["2026-11-28", "14:00", "Fordham", "Harvard", 3.5, 138.5, -162, 136, ""],
  ["2026-11-28", "14:00", "Ball State", "Southern Indiana", 3.5, 140.5, -155, 130, ""],
  ["2026-11-28", "15:00", "Western Illinois", "Coastal Carolina", -11.5, 140.5, 525, -750, ""],
  ["2026-11-28", "15:00", "Toledo", "Valparaiso", -4.5, 151.5, 142, -170, ""],
  ["2026-11-28", "15:00", "Liberty", "UNC Wilmington", -5.5, 149.5, 200, -245, ""],
  ["2026-11-28", "15:00", "Denver", "New Mexico State", -3.5, 143.5, 140, -166, ""],
  ["2026-11-28", "15:00", "UT Rio Grande Valley", "UNLV", -10.5, 150.5, null, null, ""],
  ["2026-11-28", "15:00", "Southeast Missouri", "Kansas City", -2.5, 146.5, 120, -142, ""],
  ["2026-11-28", "15:00", "Northern Illinois", "Eastern Illinois", 10.5, 140.5, -675, 490, ""],
  ["2026-11-28", "15:00", "Brown", "Air Force", -2.5, 158.5, 114, -135, ""],
  ["2026-11-28", "15:30", "North Texas", "Boise State", -4.5, 155.5, 164, -198, ""],
  ["2026-11-28", "15:30", "Merrimack", "Hofstra", -1.5, 124.5, 105, -125, ""],
  ["2026-11-28", "15:30", "Buffalo", "Towson", -2.5, 138.5, 130, -155, ""],
  ["2026-11-28", "16:00", "Tennessee Tech", "Eastern Kentucky", 4.5, 170.5, -175, 145, ""],
  ["2026-11-28", "16:00", "McNeese", "Louisiana", 8.5, 138.5, -355, 280, ""],
  ["2026-11-28", "16:00", "Drexel", "Mount St. Mary's", 5.5, 136.5, -225, 185, ""],
  ["2026-11-28", "16:00", "Delaware", "Stony Brook", -6.5, 136.5, 180, -218, ""],
  ["2026-11-28", "16:00", "San José State", "Utah Valley", -5.5, 154.5, 220, -270, ""],
  ["2026-11-28", "16:00", "Austin Peay", "Furman", -7.5, 150.5, 245, -305, ""],
  ["2026-11-28", "16:00", "Northern Colorado", "San Diego", -13.5, 146.5, 850, -1450, ""],
  ["2026-11-28", "16:00", "UMass Lowell", "American", -6.5, 141.5, 245, -305, ""],
  ["2026-11-28", "16:30", "Maine", "Lafayette", -6.5, 133.5, 215, -265, ""],
  ["2026-11-28", "17:00", "Weber State", "Cal State Fullerton", -10.5, 170.5, 455, -625, ""],
  ["2026-11-28", "17:00", "Northern Arizona", "Cal State Bakersfield", -6.5, 148.5, 210, -258, ""],
  ["2026-11-28", "17:00", "UC Irvine", "Seattle", -4.5, 138.5, 164, -198, ""],
  ["2026-11-28", "18:00", "South Alabama", "South Dakota State", -1.5, 139.5, -105, -115, ""],
  ["2026-11-28", "18:00", "Drake", "North Dakota State", 6.5, 142.5, -238, 195, "", {"venue":"ExtraMile Arena, Boise","hfa":0,"note":"Boise State multi-team event — neutral site"}],
  ["2026-11-28", "18:00", "Bucknell", "Penn", -15.5, 149.5, 1000, -1800, ""],
  ["2026-11-28", "18:00", "VMI", "Richmond", -15.5, 149.5, 900, -1600, ""],
  ["2026-11-28", "19:00", "Bethune Cookman", "San Francisco", -9.5, 148.5, 320, -410, ""],
  ["2026-11-28", "19:00", "Portland State", "Southern Illinois", -7.5, 155.5, 245, -305, ""],
  ["2026-11-28", "19:00", "Saint Joseph's", "Monmouth", 2.5, 147.5, -135, 114, ""],
  ["2026-11-28", "19:00", "Utah Tech", "Santa Clara", -17.5, 165.5, null, null, ""],
  ["2026-11-28", "19:00", "Rider", "Army", -9.5, 136.5, 300, -380, ""],
  ["2026-11-28", "19:00", "Morehead State", "Charleston Southern", -2.5, 148.5, 124, -148, ""],
  ["2026-11-28", "19:30", "South Carolina State", "Duquesne", -20.5, 142.5, 1600, -4000, ""],
  ["2026-11-28", "20:00", "Stonehill", "Notre Dame", -30.5, 149.5, null, null, ""],
  ["2026-11-28", "20:00", "California", "Minnesota", -7.5, 143.5, 250, -310, ""],
  ["2026-11-28", "22:00", "Loyola Marymount", "UC San Diego", -1.5, 155.5, 102, -122, ""],
];

// NHL (beta): team stats per game (Kalshi team stats page) and goalie stats (hockey-reference).
// [abbr, nickname, gp, goalsFor/gp, goalsAgainst/gp, shotsFor/gp, shotsAgainst/gp, PP%, PK%]
const NHL_TEAMS = [
  ["CAR", "Hurricanes", 25, 4.12, 2.2, 33.3, 22.0, 25.6, 82.1],
  ["COL", "Avalanche", 24, 4.0, 2.79, 30.4, 27.4, 24.1, 81.9],
  ["EDM", "Oilers", 27, 3.81, 2.93, 24.6, 26.9, 32.2, 77.3],
  ["ANA", "Ducks", 26, 3.69, 3.65, 26.3, 25.7, 33.7, 75.8],
  ["NJ", "Devils", 25, 3.68, 3.08, 32.6, 25.6, 19.8, 67.8],
  ["MIN", "Wild", 27, 3.63, 2.26, 28.9, 25.9, 25.3, 78.7],
  ["WSH", "Capitals", 22, 3.59, 3.91, 29.2, 27.0, 23.0, 75.0],
  ["TB", "Lightning", 24, 3.54, 2.92, 29.1, 25.4, 21.8, 73.3],
  ["BOS", "Bruins", 24, 3.5, 2.71, 27.2, 27.6, 20.0, 80.0],
  ["VGK", "Golden Knights", 26, 3.38, 2.88, 29.5, 25.6, 27.5, 79.4],
  ["UTA", "Mammoth", 26, 3.31, 3.31, 28.8, 25.0, 32.2, 72.7],
  ["STL", "Blues", 25, 3.28, 3.16, 27.0, 29.8, 21.2, 83.6],
  ["FLA", "Panthers", 25, 3.24, 2.96, 29.1, 25.4, 24.0, 85.4],
  ["OTT", "Senators", 26, 3.15, 2.92, 26.5, 26.3, 12.5, 75.3],
  ["TOR", "Maple Leafs", 26, 3.15, 3.46, 28.0, 28.8, 25.4, 82.3],
  ["WPG", "Jets", 26, 3.15, 3.27, 26.5, 28.2, 22.7, 73.0],
  ["SEA", "Kraken", 22, 3.14, 3.45, 25.5, 29.4, 22.1, 61.7],
  ["BUF", "Sabres", 25, 3.12, 3.32, 27.0, 28.0, 16.3, 73.3],
  ["NYI", "Islanders", 24, 3.08, 2.79, 26.0, 28.3, 16.4, 85.5],
  ["NSH", "Predators", 24, 3.0, 2.79, 26.9, 29.4, 23.7, 89.2],
  ["MTL", "Canadiens", 26, 2.92, 3.04, 27.4, 27.9, 13.5, 78.5],
  ["NYR", "Rangers", 24, 2.92, 2.83, 26.2, 27.2, 20.3, 90.3],
  ["PIT", "Penguins", 24, 2.83, 3.58, 27.7, 28.1, 20.3, 82.5],
  ["VAN", "Canucks", 27, 2.74, 4.41, 22.8, 31.0, 21.4, 60.5],
  ["LA", "Kings", 22, 2.68, 3.23, 27.2, 27.6, 21.7, 70.4],
  ["CHI", "Blackhawks", 25, 2.68, 3.84, 23.6, 30.6, 22.5, 80.5],
  ["DAL", "Stars", 24, 2.67, 2.38, 25.7, 24.4, 21.1, 89.2],
  ["DET", "Red Wings", 24, 2.63, 2.92, 27.8, 26.3, 21.2, 71.6],
  ["PHI", "Flyers", 27, 2.59, 3.48, 24.4, 27.8, 17.4, 77.1],
  ["CGY", "Flames", 26, 2.58, 3.42, 27.7, 29.5, 25.8, 80.0],
  ["SJ", "Sharks", 27, 2.52, 3.67, 27.2, 30.6, 20.8, 73.1],
  ["CBJ", "Blue Jackets", 23, 2.43, 3.17, 27.3, 28.2, 18.2, 73.4],
];
// MoneyPuck team expected goals (flurry + score/venue adjusted), loaded with nhl_moneypuck.py.
// [abbr, gp, evSec, evXGF, evXGA, ppSec, ppXGF, ppXGA, pkSec, pkXGF, pkXGA, goalsFor, goalsAgainst]  (5on5 = ev, 5on4 = pp, 4on5 = pk)
const NHL_XG = [
  ["ANA", 24, 68417.0, 45.88, 55.09, 6683.0, 13.94, 0.7, 7278.0, 2.13, 12.33, 87, 92],
  ["BOS", 23, 67625.0, 50.55, 44.53, 6836.0, 12.03, 2.48, 6238.0, 0.71, 12.88, 82, 61],
  ["BUF", 24, 69575.0, 47.78, 48.56, 6988.0, 14.09, 2.34, 7129.0, 1.55, 16.57, 73, 82],
  ["CAR", 24, 70040.0, 64.16, 39.61, 7166.0, 16.61, 0.66, 6782.0, 3.06, 10.6, 100, 54],
  ["CBJ", 21, 63747.0, 41.73, 46.67, 5104.0, 9.41, 0.95, 5284.0, 0.83, 10.08, 52, 68],
  ["CGY", 24, 71355.0, 45.82, 52.35, 5108.0, 8.26, 1.36, 7162.0, 1.84, 12.98, 60, 84],
  ["CHI", 24, 71077.0, 40.45, 55.74, 6019.0, 10.43, 1.65, 7256.0, 1.88, 15.6, 64, 95],
  ["COL", 23, 66979.0, 49.03, 42.82, 7569.0, 15.76, 1.82, 6626.0, 1.21, 11.76, 90, 67],
  ["DAL", 23, 67813.0, 41.07, 41.91, 5708.0, 14.97, 1.44, 8296.0, 1.86, 12.15, 63, 54],
  ["DET", 23, 68569.0, 44.08, 45.71, 6583.0, 14.29, 1.79, 6135.0, 0.66, 13.87, 58, 69],
  ["EDM", 26, 75985.0, 41.87, 45.5, 7370.0, 17.1, 1.08, 7591.0, 1.17, 15.82, 100, 74],
  ["FLA", 24, 66586.0, 41.14, 40.44, 8498.0, 22.57, 1.8, 8176.0, 1.67, 14.38, 76, 71],
  ["LA", 21, 61210.0, 39.44, 38.57, 6131.0, 11.82, 0.97, 5915.0, 1.43, 11.38, 57, 70],
  ["MIN", 25, 72721.0, 53.88, 44.4, 7316.0, 15.45, 2.06, 7345.0, 1.12, 13.0, 90, 55],
  ["MTL", 24, 68262.0, 49.5, 47.03, 6468.0, 11.62, 1.71, 8217.0, 2.68, 17.15, 75, 71],
  ["NJ", 23, 69473.0, 52.35, 42.2, 7164.0, 17.08, 0.91, 4919.0, 1.08, 9.49, 87, 73],
  ["NSH", 23, 68918.0, 47.42, 51.06, 6756.0, 12.57, 2.37, 6448.0, 1.26, 11.16, 69, 66],
  ["NYI", 22, 65625.0, 48.17, 46.26, 6119.0, 9.7, 1.14, 6250.0, 1.71, 13.94, 70, 61],
  ["NYR", 23, 66733.0, 47.96, 43.52, 6080.0, 14.32, 1.31, 6489.0, 1.15, 10.67, 69, 63],
  ["OTT", 24, 67793.0, 47.26, 37.92, 7725.0, 12.95, 1.88, 7394.0, 1.56, 14.94, 77, 70],
  ["PHI", 26, 75603.0, 43.26, 55.81, 7894.0, 15.69, 2.56, 7815.0, 2.31, 13.86, 67, 87],
  ["PIT", 23, 68200.0, 52.02, 48.7, 6021.0, 8.35, 1.47, 6257.0, 1.88, 13.34, 65, 80],
  ["SEA", 20, 60104.0, 37.84, 45.68, 5749.0, 10.33, 1.4, 4291.0, 0.19, 10.23, 65, 71],
  ["SJ", 25, 71911.0, 43.67, 56.48, 8877.0, 14.32, 2.6, 7509.0, 2.16, 19.27, 66, 87],
  ["STL", 24, 71364.0, 51.11, 50.94, 6358.0, 11.44, 1.29, 6682.0, 1.54, 12.95, 80, 77],
  ["TB", 23, 67172.0, 54.32, 40.76, 7403.0, 14.79, 1.23, 5860.0, 1.37, 11.74, 84, 67],
  ["TOR", 25, 73660.0, 42.73, 50.76, 6081.0, 13.76, 1.35, 7936.0, 1.37, 16.68, 78, 88],
  ["UTA", 24, 70351.0, 54.1, 41.08, 6942.0, 17.58, 0.7, 6642.0, 0.81, 15.45, 80, 79],
  ["VAN", 26, 76180.0, 40.71, 65.18, 7699.0, 14.23, 1.3, 7045.0, 1.25, 21.5, 73, 114],
  ["VGK", 25, 76550.0, 54.02, 47.8, 7061.0, 17.41, 3.26, 5745.0, 2.94, 10.59, 83, 72],
  ["WPG", 24, 72419.0, 45.9, 50.98, 6340.0, 14.66, 1.14, 6225.0, 1.85, 16.31, 74, 81],
  ["WSH", 21, 60149.0, 48.7, 43.88, 5625.0, 10.34, 1.11, 6504.0, 1.59, 15.19, 72, 83],
];
// [goalie, team, gp, gs, shotsAgainst, sv%, GSAA (goals saved above average)]
const NHL_GOALIES = [
  ["Jesper Wallstedt", "MIN", 23, 23, 599, 0.92, 17.4],
  ["Spencer Knight", "CHI", 20, 20, 599, 0.891, 0.4],
  ["Leevi Merilainen", "VAN", 19, 17, 547, 0.885, -3.3],
  ["Jake Oettinger", "DAL", 19, 19, 441, 0.912, 9.2],
  ["Mackenzie Blackwood", "COL", 18, 17, 466, 0.91, 8.9],
  ["Joel Hofer", "STL", 18, 18, 525, 0.92, 15.3],
  ["Juuse Saros", "NSH", 18, 17, 523, 0.918, 14.1],
  ["Stuart Skinner", "WPG", 18, 18, 479, 0.887, -1.7],
  ["Jeremy Swayman", "BOS", 18, 18, 478, 0.902, 5.2],
  ["Andrei Vasilevskiy", "TB", 18, 18, 447, 0.897, 2.8],
  ["Yaroslav Askarov", "SJ", 17, 17, 504, 0.889, -1.0],
  ["Ilya Sorokin", "NYI", 17, 17, 494, 0.917, 13.0],
  ["Karel Vejmelka", "UTA", 17, 16, 393, 0.873, -8.1],
  ["Jacob Fowler", "MTL", 16, 16, 463, 0.911, 9.6],
  ["Dylan Garand", "NYR", 16, 14, 396, 0.909, 7.3],
  ["Logan Thompson", "WSH", 16, 16, 399, 0.877, -5.4],
  ["Pyotr Kochetkov", "CAR", 15, 15, 302, 0.911, 6.0],
  ["Ukko-Pekka Luukkonen", "BUF", 15, 14, 399, 0.885, -2.4],
  ["Arturs Silovs", "PIT", 15, 15, 396, 0.874, -6.7],
  ["Dustin Wolf", "CGY", 15, 14, 409, 0.878, -5.3],
  ["Sergei Bobrovsky", "TOR", 14, 14, 404, 0.874, -6.9],
  ["Lukas Dostal", "ANA", 14, 13, 329, 0.857, -11.1],
  ["John Gibson", "DET", 14, 14, 319, 0.862, -9.2],
  ["Philipp Grubauer", "SEA", 14, 11, 349, 0.894, 1.1],
  ["Carter Hart", "VGK", 14, 14, 348, 0.885, -2.0],
  ["Darcy Kuemper", "LA", 14, 14, 377, 0.891, 0.2],
  ["Devon Levi", "EDM", 14, 14, 371, 0.892, -0.5],
  ["Jacob Markstrom", "FLA", 14, 14, 330, 0.894, 1.0],
  ["Cam Talbot", "CBJ", 14, 13, 378, 0.907, 6.3],
  ["Linus Ullmark", "OTT", 14, 14, 336, 0.935, 14.7],
  ["Joseph Woll", "PHI", 14, 14, 406, 0.887, -1.7],
  ["Adin Hill", "VGK", 13, 12, 315, 0.898, 2.4],
  ["Daniel Vladar", "PHI", 13, 13, 340, 0.876, -5.9],
  ["Joey Daccord", "SEA", 12, 11, 294, 0.878, -3.9],
  ["Anthony Stolarz", "TOR", 12, 12, 338, 0.902, 3.9],
  ["Jake Allen", "NJ", 11, 10, 284, 0.873, -5.0],
  ["Devin Cooley", "CGY", 11, 11, 319, 0.909, 5.8],
  ["Sebastian Cossa", "UTA", 11, 10, 251, 0.88, -2.6],
  ["Samuel Ersson", "OTT", 11, 8, 236, 0.869, -5.2],
  ["Jet Greaves", "CBJ", 11, 10, 265, 0.875, -4.1],
  ["Connor Hellebuyck", "NJ", 11, 11, 268, 0.899, 2.3],
  ["Tristan Jarry", "EDM", 11, 11, 301, 0.907, 3.9],
  ["Akira Schmid", "FLA", 11, 10, 279, 0.885, -1.5],
  ["Daniil Tarasov", "DET", 11, 9, 273, 0.93, 10.8],
  ["Brandon Bussi", "CAR", 10, 10, 248, 0.891, 0.1],
  ["Jakub Dobes", "MTL", 10, 10, 258, 0.868, -5.8],
  ["Kevin Lankinen", "VAN", 10, 8, 238, 0.815, -19.0],
  ["Alex Nedeljkovic", "SJ", 10, 10, 315, 0.889, -0.6],
  ["Nico Daws", "NJ", 4, 4, 86, 0.872, -1.6],
  ["Nico Daws", "WPG", 6, 4, 129, 0.907, 2.1],
  ["Anton Forsberg", "LA", 9, 8, 223, 0.901, 2.4],
  ["Ville Husso", "ANA", 9, 7, 185, 0.854, -6.8],
  ["Sergei Murashov", "PIT", 9, 9, 274, 0.891, -0.1],
  ["Colten Ellis", "BUF", 8, 7, 181, 0.873, -3.2],
  ["Charlie Lindgren", "WSH", 8, 6, 185, 0.849, -7.8],
  ["Justus Annunen", "NSH", 7, 6, 162, 0.864, -4.3],
  ["Jordan Binnington", "STL", 7, 7, 215, 0.847, -9.5],
  ["Michael DiPietro", "BOS", 7, 6, 181, 0.923, 5.8],
  ["Semyon Varlamov", "NYI", 7, 7, 180, 0.889, -0.3],
  ["Scott Wedgewood", "COL", 7, 7, 188, 0.883, -1.5],
  ["Laurent Brossoit", "ANA", 6, 6, 151, 0.887, -0.5],
  ["Casey DeSmith", "DAL", 6, 5, 139, 0.906, 2.2],
  ["Dennis Hildeby", "TB", 6, 6, 156, 0.885, -1.0],
  ["Igor Shesterkin", "NYR", 5, 5, 109, 0.927, 3.9],
  ["Arvid Soderblom", "CHI", 5, 4, 133, 0.842, -6.5],
  ["Clay Stevenson", "WPG", 5, 4, 123, 0.87, -2.6],
  ["Jonas Johansson", "OTT", 4, 4, 105, 0.848, -4.5],
  ["Joonas Korpisalo", "NYR", 4, 4, 113, 0.912, 2.3],
  ["Alex Lyon", "BUF", 4, 4, 118, 0.89, -0.1],
  ["Calvin Pickard", "MIN", 3, 3, 76, 0.855, -2.7],
  ["Michal Postava", "DET", 2, 1, 35, 0.886, -0.2],
  ["Nikita Tolopilo", "VAN", 2, 2, 48, 0.875, -0.8],
  ["Matt Tomkins", "EDM", 2, 2, 50, 0.88, -0.5],
  ["Cooper Black", "FLA", 1, 1, 21, 0.857, -0.7],
  ["Drew Commesso", "CHI", 1, 1, 25, 0.88, -0.3],
  ["Filip Gustavsson", "MIN", 1, 1, 24, 0.917, 0.6],
  ["Spencer Martin", "NYR", 1, 0, 18, 0.833, -1.0],
  ["Matt Murray", "NSH", 1, 1, 20, 0.9, 0.2],
  ["James Reimer", "NYR", 1, 1, 8, 0.625, -2.1],
  ["Arsenii Sergeev", "CGY", 1, 1, 34, 0.853, -1.3],
];
// puck drop ET. [date, time, away, home, homePuckLine(-1.5/+1.5), total, mlAway, mlHome, tv, extra]
// extra: plAway/plHome puck line prices, over/under prices, gA/gH starting goalies, gsA/gsH status (Confirmed/Likely/Unconfirmed)
const NHL_GAMES = [
  ["2026-11-28", "16:00", "MTL", "VGK", -1.5, 6.5, 102, -122, "", {"plAway": -230, "plHome": 190, "over": -105, "under": -115, "gA": "Jakub Dobes", "gH": "Adin Hill", "gsA": "Confirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "18:00", "TB", "FLA", -1.5, 6.5, -105, -115, "", {"plAway": -250, "plHome": 205, "over": -102, "under": -118, "gA": "Andrei Vasilevskiy", "gH": "Akira Schmid", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "19:00", "NSH", "DET", -1.5, 5.5, -108, -112, "", {"plAway": -258, "plHome": 210, "over": -135, "under": 114, "gA": "Justus Annunen", "gH": "Daniil Tarasov", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "19:00", "WPG", "NJ", -1.5, 6.5, 160, -192, "", {"plAway": -135, "plHome": 114, "over": -108, "under": -112, "gA": "Nico Daws", "gH": "Connor Hellebuyck", "gsA": "Unconfirmed", "gsH": "Confirmed"}],
  ["2026-11-28", "19:00", "CGY", "NYR", -1.5, 5.5, 154, -185, "", {"plAway": -155, "plHome": 130, "over": -130, "under": 110, "gA": "Dustin Wolf", "gH": "Joonas Korpisalo", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "19:00", "TOR", "PIT", -1.5, 6.5, 102, -122, "", {"plAway": -230, "plHome": 190, "over": -130, "under": 110, "gA": "Sergei Bobrovsky", "gH": "Arturs Silovs", "gsA": "Confirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "19:00", "OTT", "CAR", -1.5, 6.5, 195, -238, "", {"plAway": -112, "plHome": -108, "over": 102, "under": -122, "gA": "Samuel Ersson", "gH": "Pyotr Kochetkov", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "19:00", "WSH", "STL", -1.5, 6.5, -108, -112, "", {"plAway": -250, "plHome": 205, "over": -135, "under": 114, "gA": "Charlie Lindgren", "gH": "Jordan Binnington", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "19:30", "NYI", "PHI", 1.5, 6.5, -122, 102, "", {"plAway": 190, "plHome": -230, "over": 114, "under": -135, "gA": "Ilya Sorokin", "gH": "Joseph Woll", "gsA": "Confirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "20:00", "UTA", "DAL", -1.5, 5.5, 136, -162, "", {"plAway": -180, "plHome": 150, "over": -135, "under": 114, "gA": "Sebastian Cossa", "gH": "Jake Oettinger", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "21:00", "SJ", "COL", -1.5, 6.5, 225, -278, "", {"plAway": 100, "plHome": -120, "over": -115, "under": -105, "gA": "Alex Nedeljkovic", "gH": "Scott Wedgewood", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "21:00", "ANA", "LA", -1.5, 6.5, 120, -142, "", {"plAway": -192, "plHome": 160, "over": -105, "under": -115, "gA": "Lukas Dostal", "gH": "Anton Forsberg", "gsA": "Confirmed", "gsH": "Unconfirmed"}],
  ["2026-11-28", "22:00", "EDM", "SEA", 1.5, 6.5, -170, 142, "", {"plAway": 140, "plHome": -166, "over": -112, "under": -108, "gA": "Devon Levi", "gH": "Joey Daccord", "gsA": "Unconfirmed", "gsH": "Unconfirmed"}],
];
const NHL_VENUES={ANA:"Honda Center",BOS:"TD Garden",BUF:"KeyBank Center",CGY:"Scotiabank Saddledome",CAR:"Lenovo Center",CHI:"United Center",COL:"Ball Arena",CBJ:"Nationwide Arena",DAL:"American Airlines Center",DET:"Little Caesars Arena",EDM:"Rogers Place",FLA:"Amerant Bank Arena",LA:"Crypto.com Arena",MIN:"Grand Casino Arena",MTL:"Bell Centre",NSH:"Bridgestone Arena",NJ:"Prudential Center",NYI:"UBS Arena",NYR:"Madison Square Garden",OTT:"Canadian Tire Centre",PHI:"Xfinity Mobile Arena",PIT:"PPG Paints Arena",SJ:"SAP Center",SEA:"Climate Pledge Arena",STL:"Enterprise Center",TB:"Benchmark International Arena",TOR:"Scotiabank Arena",UTA:"Delta Center",VAN:"Rogers Arena",VGK:"T-Mobile Arena",WSH:"Capital One Arena",WPG:"Canada Life Centre"};

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 12", dataDate:"2026-11-24", linesAt:"2026-11-26T16:50Z",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines: DraftKings via ESPN, Nov 26. No byes this week. Packers–Rams is Wednesday night; three Thanksgiving games Thursday; Broncos–Steelers Friday. Team ratings do not account for injuries.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 13", dataDate:"2026-11-23", linesAt:"2026-11-28T14:35Z",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Lines: DraftKings via ESPN, Nov 28 at 8:35 AM CT. Team stats (EPA per play, success rate, pass EPA) through Nov 23. UCLA is starting a backup QB; the model takes 5 points off UCLA. Finished games drop off once they end.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Sat Nov 28", dataDate:"2026-11-23", linesAt:"2026-11-28T13:46Z",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from DraftKings via ESPN, Nov 28. Finished games drop off once they end.",
  },
  nhl: { key:"nhl", label:"NHL", beta:true, weekLabel:"Sat Nov 28", dataDate:"2026-11-28", xgDate:"2026-11-23", linesAt:"2026-11-28T13:48Z",
    cfg:{regressGP:8, wShots:0.5, hfa:0.20, wModel:0.60, goaliePrior:600, maxGoals:12, tieBoost:1.35, wXG:0.75, otGoals:0.08},
    footer:"Beta. Lines from DraftKings via ESPN, Nov 28. Starting goalies from Daily Faceoff. Finished games drop off once they end.",
  },
  cbb: { key:"cbb", label:"CBB", weekLabel:"Sat Nov 28", dataDate:"2026-11-28", linesAt:"2026-11-28T13:46Z",
    cfg:{basePts:70, plays:68, regress:1.0, sdMargin:10.5, sdGrow:0.12, sdTotal:12.0, wModel:0.35, bigStart:20, bigK:0.027, wTotal:0.33, hfa:3.2, keys:[]},
    footer:"Lines from DraftKings via ESPN, Nov 28. Games without a posted line are left off. Finished games drop off once they end.",
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
    x, venue:x.venue||(league==="nfl"?NFL_VENUES[home]:league==="nba"?NBA_VENUES[home]:league==="nhl"?NHL_VENUES[home]:""), hfa:x.hfa, adjAway:x.adjAway||0, adjHome:x.adjHome||0, note:x.note||(spread===0?"Pick'em line":""), noTotal:!!x.noTotal};
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

// ===================== NHL (beta): Poisson goals model =====================
function parseNHL(rows,goalies,cfg){
  const t={}, gpSum=rows.reduce((s,r)=>s+r[2],0);
  const lg=rows.reduce((s,r)=>s+r[3]*r[2],0)/gpSum;                        // league goals per team-game
  const lgSh=rows.reduce((s,r)=>s+r[3]*r[2],0)/rows.reduce((s,r)=>s+r[5]*r[2],0); // goals per shot on goal
  const lgPP=rows.reduce((s,r)=>s+r[7],0)/rows.length, lgPK=rows.reduce((s,r)=>s+r[8],0)/rows.length;
  const G={}; goalies.forEach(([name,team,gp,gs,sa,sv,gsaa])=>{
    (G[team]=G[team]||[]).push({name,team,gp,gs,sa,sv,gsaa,perShot:gsaa/(sa+cfg.goaliePrior)}); });
  rows.forEach(([ab,name,gp,gf,ga,sf,sa,pp,pk])=>{
    const gl=(G[ab]||[]).sort((a,b)=>b.gs-a.gs), gsaaTeam=gl.reduce((s,x)=>s+x.gsaa,0);
    const shrink=gp/(gp+cfg.regressGP);
    const offRaw=cfg.wShots*sf*lgSh+(1-cfg.wShots)*gf;                     // shot volume and actual goals
    const gaNeutral=ga+gsaaTeam/gp;                                         // goals allowed with average goaltending
    const defRaw=cfg.wShots*sa*lgSh+(1-cfg.wShots)*gaNeutral;
    const off=lg+(offRaw-lg)*shrink, def=lg+(defRaw-lg)*shrink;
    t[ab]={team:ab, short:ab, name, gp, gf, ga, sf, sa, pp, pk, gaNeutral, gsaaTeam, goalies:gl,
      off, def, offRating:off-lg, defRating:def-lg, net:(off-lg)-(def-lg)};
  });
  const T=Object.values(t);
  [...T].sort((a,b)=>b.net-a.net).forEach((x,i)=>x.powerRank=i+1);
  [...T].sort((a,b)=>b.offRating-a.offRating).forEach((x,i)=>x.offRank=i+1);
  [...T].sort((a,b)=>a.defRating-b.defRating).forEach((x,i)=>x.defRank=i+1);
  // MoneyPuck expected goals: per-60 rates at 5-on-5, on the power play and on the penalty kill, regressed like the rest
  const X=(typeof NHL_XG!=="undefined"?NHL_XG:[]).filter(r=>t[r[0]]);
  let xg=null;
  if(X.length===rows.length){
    const S=(i)=>X.reduce((s,r)=>s+r[i],0), per60=(g,sec)=>sec>0?g/sec*3600:0;
    xg={ev:per60(S(3),S(2)), pp:per60(S(6),S(5)), sh:per60(S(9),S(8)), gp:S(1)};
    xg.evMin=S(2)/xg.gp/60; xg.ppMin=S(5)/xg.gp/60;
    X.forEach(([ab,gp,evS,evF,evA,ppS,ppF,ppA,pkS,pkF,pkA,gf,ga])=>{
      const T=t[ab], k=gp/(gp+cfg.regressGP), reg=(v,l)=>l+(v-l)*k;
      T.xg={gp, evF:reg(per60(evF,evS),xg.ev), evA:reg(per60(evA,evS),xg.ev), ppF:reg(per60(ppF,ppS),xg.pp), pkA:reg(per60(pkA,pkS),xg.pp),
        pkF:reg(per60(pkF,pkS),xg.sh), ppA:reg(per60(ppA,ppS),xg.sh),
        evMin:evS/gp/60, ppMin:ppS/gp/60, pkMin:pkS/gp/60,
        evF60:per60(evF,evS), evA60:per60(evA,evS), ppF60:per60(ppF,ppS), pkA60:per60(pkA,pkS), xgf:(evF+ppF+pkF)/gp, xga:(evA+ppA+pkA)/gp};
    });
  }
  t.__lg={lg,lgSh,lgPP,lgPK,xg};
  return t;
}
// expected regulation goals for team A against team B from MoneyPuck rates, relative to an average matchup
function nhlXGRatio(A,B,XG){
  const a=A.xg,b=B.xg; if(!a||!b||!XG) return null;
  const ev=(a.evMin+b.evMin)/2, pp=(a.ppMin+b.pkMin)/2, sh=(a.pkMin+b.ppMin)/2;
  const g=ev/60*a.evF*b.evA/XG.ev + pp/60*a.ppF*b.pkA/XG.pp + sh/60*a.pkF*b.ppA/(XG.sh||1);
  const avg=XG.evMin/60*XG.ev + XG.ppMin/60*XG.pp + XG.ppMin/60*XG.sh;
  return g/avg;
}
function nhlGoalie(team,name){
  const g=(team.goalies||[]).find(x=>x.name===name);
  if(g) return g;
  if(!name&&team.goalies&&team.goalies.length) return team.goalies[0];      // no starter listed: the team's top goalie
  return {name:name||"Unknown", team:team.team, gp:0, gs:0, sa:0, sv:null, gsaa:0, perShot:0, unknown:true};
}
let EN_SHARE=0.30;
function poisArr(l,n){const a=[Math.exp(-l)];for(let k=1;k<=n;k++)a.push(a[k-1]*l/k);return a;}
// regulation goals are Poisson; tied scores are weighted up (tieBoost) because real NHL games reach OT more often (~22%)
// than independent Poisson says (~16%). A regulation tie goes to OT/shootout, won by the home side with share lh/(la+lh).
function nhlProbs(la,lh,n,tb){
  const A=poisArr(la,n),H=poisArr(lh,n), q=lh/(la+lh), k=tb||1.35; let pHome=0,pTie=0,Z=0; const cells=[];
  for(let i=0;i<=n;i++)for(let j=0;j<=n;j++){const p=A[i]*H[j]*(i===j?k:1); Z+=p; cells.push([i,j,p]);}
  cells.forEach(c=>{c[2]/=Z;});
  // empty-net goals: a share of one-goal regulation results end as two-goal wins (adds a goal to the total too)
  const en=EN_SHARE; if(en>0){ const add=[]; cells.forEach(c=>{const d=c[1]-c[0]; if(Math.abs(d)===1){const m=c[2]*en; c[2]-=m; add.push(d>0?[c[0],c[1]+1,m]:[c[0]+1,c[1],m]);}}); cells.push(...add); }
  cells.forEach(c=>{ if(c[1]>c[0])pHome+=c[2]; else if(c[0]===c[1])pTie+=c[2];});
  pHome+=pTie*q;
  const over=L=>cells.reduce((s,[i,j,p])=>s+(i+j+(i===j?1:0)>L?p:0),0);
  const homeCover=line=>cells.reduce((s,[i,j,p])=>{ if(i===j) return s+p*((1+line>0?q:0)+(-1+line>0?1-q:0)); return s+(j-i+line>0?p:0); },0);
  return {pHome,pTie,q,over,homeCover};
}
// market goals: find (away, home) expected goals whose Poisson odds match the no-vig moneyline and total
function nhlMarket(pHomeNV,pOverNV,L,n){
  let lo=3,hi=10,la=3,lh=3;
  for(let it=0;it<28;it++){ const T=(lo+hi)/2;
    let a=0.2,b=0.8; for(let k=0;k<28;k++){const s=(a+b)/2; nhlProbs(T*(1-s),T*s,n).pHome<pHomeNV?a=s:b=s;}
    const s=(a+b)/2; la=T*(1-s); lh=T*s; nhlProbs(la,lh,n).over(L)<pOverNV?lo=T:hi=T; }
  return [la,lh];
}
function projectNHL(g,teams,cfg,LG){
  const A=teams[g.away],H=teams[g.home], x=g.x||{}, n=cfg.maxGoals;
  const gA=nhlGoalie(A,x.gA), gH=nhlGoalie(H,x.gH);
  const shotsOnH=(A.sf+H.sa)/2, shotsOnA=(H.sf+A.sa)/2;                  // shots each goalie should face
  const hfa=g.hfa??cfg.hfa;
  // blend MoneyPuck expected goals (wXG) with the shots-and-goals ratings; level = league regulation goals per team
  const gRatA=(A.off/LG.lg)*(H.def/LG.lg), gRatH=(H.off/LG.lg)*(A.def/LG.lg);
  const xA=nhlXGRatio(A,H,LG.xg), xH=nhlXGRatio(H,A,LG.xg), wx=xA!=null&&xH!=null?cfg.wXG:0;
  const lvl=LG.lg-cfg.otGoals, ratA=wx*(xA||0)+(1-wx)*gRatA, ratH=wx*(xH||0)+(1-wx)*gRatH;
  const rawAway=Math.max(0.8,lvl*ratA-gH.perShot*shotsOnH-hfa/2);
  const rawHome=Math.max(0.8,lvl*ratH-gA.perShot*shotsOnA+hfa/2);
  const nv=(a,b)=>{const ia=mlToProb(a),ib=mlToProb(b);return [ia/(ia+ib),ib/(ia+ib)];};
  const [nvAway,nvHome]=nv(g.mlAway,g.mlHome), [nvOver]=nv(x.over??-110,x.under??-110);
  const [mA,mH]=nhlMarket(nvHome,nvOver,g.total,n);
  const w=cfg.wModel, away=w*rawAway+(1-w)*mA, home=w*rawHome+(1-w)*mH;
  const P=nhlProbs(away,home,n), R=nhlProbs(rawAway,rawHome,n);
  const longshot=pr=>pr>250?(pr-250)/150:0;
  // puck line
  const plH=x.plHome??-110, plA=x.plAway??-110, lineH=g.spread, lineA=-g.spread;
  const pcH=P.homeCover(lineH), pcA=1-pcH, evPH=evOf(pcH,plH), evPA=evOf(pcA,plA), plHome=evPH>=evPA;
  const plPrice=plHome?plH:plA, pPL=plHome?pcH:pcA;
  const sScore=edgeScore(pPL,mlToProb(plPrice),1.1,-longshot(plPrice));
  // total
  const pOver=P.over(g.total), oP=x.over??-110, uP=x.under??-110, evO=evOf(pOver,oP), evU=evOf(1-pOver,uP), isOver=evO>=evU;
  const tPrice=isOver?oP:uP, pT=isOver?pOver:1-pOver, tScore=edgeScore(pT,mlToProb(tPrice),1.2,0);
  // moneyline
  const pHomeWin=P.pHome, evH=evOf(pHomeWin,g.mlHome), evA=evOf(1-pHomeWin,g.mlAway), mlHome=evH>=evA, mlPrice=mlHome?g.mlHome:g.mlAway;
  const mScore=edgeScore(mlHome?pHomeWin:1-pHomeWin,mlToProb(mlPrice),1.1,-longshot(mlPrice));
  const total=away+home, margin=home-away;
  return {away,home,margin,total,rawAway,rawHome,rawMargin:rawHome-rawAway,rawTotal:rawAway+rawHome,mktAway:mA,mktHome:mH,xgUsed:wx>0,goalies:{away:gA,home:gH},
    spread:{pick:plHome?`${g.home} ${fmtLine(lineH)} ${fmtML(plH)}`:`${g.away} ${fmtLine(lineA)} ${fmtML(plA)}`,side:plHome?"home":"away",line:plHome?lineH:lineA,price:plPrice,
      edgePts:Math.abs(margin-(mH-mA)),prob:pPL,ev:Math.max(evPH,evPA),score:sScore,tier:tier(sScore),modelLine:-margin,pHomeCover:pcH,implied:mlToProb(plPrice)},
    totals:{pick:`${isOver?"Over":"Under"} ${g.total}`,side:isOver?"over":"under",price:tPrice,edgePts:Math.abs(total-(mA+mH)),prob:pT,ev:Math.max(evO,evU),score:tScore,tier:tier(tScore),pOver,rawPOver:R.over(g.total),implied:mlToProb(tPrice)},
    ml:{pick:mlHome?`${g.home} ${fmtML(g.mlHome)}`:`${g.away} ${fmtML(g.mlAway)}`,prob:mlHome?pHomeWin:1-pHomeWin,implied:mlHome?nvHome:nvAway,
      probEdge:mlHome?pHomeWin-nvHome:(1-pHomeWin)-nvAway,ev:Math.max(evH,evA),score:mScore,tier:tier(mScore),pHomeWin,nvHome,nvAway,pTie:P.pTie}};
}

function buildLeague(key){
  const L=LEAGUES[key];
  if(key==="nhl"){
    const teams=parseNHL(NHL_TEAMS,NHL_GOALIES,L.cfg), LG=teams.__lg; delete teams.__lg; L.cfg.lg=LG;
    const missing=[];
    const games=NHL_GAMES.map((r,i)=>toGame(r,i,key)).filter(g=>{const ok=teams[g.away]&&teams[g.home]; if(!ok)missing.push(g.away+" @ "+g.home); return ok;});
    const rows=games.map(g=>{const p=projectNHL(g,teams,L.cfg,LG);return {g,p,best:Math.max(p.spread.score,p.totals.score,p.ml.score)};});
    return {L,teams,rows,missing,teamCount:Object.keys(teams).length};
  }
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
