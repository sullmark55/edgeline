// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-11-19", "20:15", "IND", "HOU", -12.5, 44.5, 500, -700, "Prime"],
  ["2026-11-22", "13:00", "ARI", "KC", -16.5, 41.5, 850, -1450, ""],
  ["2026-11-22", "13:00", "BAL", "CAR", -2.5, 43.5, 120, -142, ""],
  ["2026-11-22", "13:00", "MIA", "BUF", -16.5, 45.5, 750, -1200, ""],
  ["2026-11-22", "13:00", "NO", "CHI", -11.5, 49.5, 490, -675, ""],
  ["2026-11-22", "13:00", "TB", "DET", -6.5, 45.5, 220, -270, ""],
  ["2026-11-22", "13:00", "TEN", "DAL", -8.5, 54.5, 330, -425, ""],
  ["2026-11-22", "13:00", "PIT", "PHI", 4.5, 38.5, -218, 180, ""],
  ["2026-11-22", "16:05", "NYJ", "LAC", -3.5, 40.5, 150, -180, ""],
  ["2026-11-22", "16:25", "JAX", "NYG", 6, 46.5, -265, 215, ""],
  ["2026-11-22", "16:25", "LV", "DEN", -10, 40.5, 410, -550, ""],
  ["2026-11-22", "20:20", "MIN", "SF", -3, 46.5, 136, -162, "NBC", {"venue": "Estadio Banorte, Mexico City", "hfa": 0.5, "note": "Mexico City — treated as near-neutral"}],
  ["2026-11-23", "20:15", "CIN", "WAS", 6.5, 52.5, -298, 240, "ESPN"],
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

// NBA: Dunks & Threes team stats (SRS-adjusted), games through Fri Oct 30 2026.
// [abbr, name, aORTG, aDRTG, pace, gamesPlayed] — aORTG/aDRTG are points per 100 possessions scored/allowed, opponent-adjusted
const NBA_ROWS = [
  ["SAS", "Spurs", 118.1, 108.7, 98.8, 14],
  ["BOS", "Celtics", 116.9, 109.3, 96.3, 13],
  ["OKC", "Thunder", 114.5, 107.1, 99.0, 14],
  ["HOU", "Rockets", 118.2, 111.1, 97.9, 14],
  ["POR", "Trail Blazers", 116.6, 111.7, 100.4, 12],
  ["LAL", "Lakers", 117.8, 113.5, 100.5, 14],
  ["MIN", "Timberwolves", 113.6, 109.5, 101.2, 13],
  ["GSW", "Warriors", 114.5, 111.0, 99.6, 13],
  ["NYK", "Knicks", 114.0, 110.6, 96.0, 13],
  ["DEN", "Nuggets", 117.0, 113.7, 97.8, 11],
  ["DET", "Pistons", 113.5, 111.1, 99.4, 12],
  ["TOR", "Raptors", 114.1, 112.0, 99.4, 13],
  ["MEM", "Grizzlies", 115.5, 113.9, 100.5, 13],
  ["PHI", "76ers", 113.0, 112.3, 100.4, 14],
  ["CLE", "Cavaliers", 115.9, 115.6, 99.8, 14],
  ["MIA", "Heat", 114.9, 115.1, 102.5, 13],
  ["ATL", "Hawks", 111.4, 112.3, 103.6, 14],
  ["ORL", "Magic", 111.8, 112.8, 97.7, 12],
  ["PHX", "Suns", 114.1, 115.1, 98.4, 12],
  ["DAL", "Mavericks", 112.0, 113.1, 100.2, 14],
  ["IND", "Pacers", 112.4, 114.1, 100.9, 14],
  ["LAC", "Clippers", 111.3, 114.5, 99.8, 12],
  ["UTA", "Jazz", 109.2, 113.9, 100.3, 14],
  ["CHA", "Hornets", 108.5, 114.2, 96.5, 13],
  ["CHI", "Bulls", 111.6, 117.7, 103.7, 12],
  ["WAS", "Wizards", 110.5, 116.7, 99.6, 14],
  ["NOP", "Pelicans", 111.4, 118.2, 101.7, 14],
  ["BKN", "Nets", 109.5, 116.7, 99.5, 12],
  ["SAC", "Kings", 108.8, 116.7, 100.6, 13],
  ["MIL", "Bucks", 108.8, 117.2, 100.5, 14],
];
// tip times ET
const NBA_GAMES = [
  ["2026-11-18", "19:00", "MEM", "CLE", -5.5, 236.5, 164, -196, ""],
  ["2026-11-18", "19:00", "HOU", "IND", 7.5, 224.5, -264, 217, ""],
  ["2026-11-18", "19:00", "MIL", "MIA", -12.5, 236.5, 539, -770, ""],
  ["2026-11-18", "19:00", "PHI", "ORL", 1.5, 223.5, -122, 103, ""],
  ["2026-11-18", "19:30", "CHI", "BKN", -2.5, 237.5, 128, -152, ""],
  ["2026-11-18", "20:00", "ATL", "OKC", -7.5, 226.5, 221, -270, ""],
  ["2026-11-18", "20:00", "GSW", "DAL", -6.5, 221.5, 173, -208, ""],
  ["2026-11-18", "21:30", "BOS", "DEN", 2.5, 219.5, -141, 119, ""],
  ["2026-11-18", "22:00", "PHX", "SAC", 6.5, 229.5, -224, 186, ""],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

// CBB: KenPom ratings (pasted from kenpom.com, Nov 5). [team, conf, W-L, AdjO, AdjD, AdjT, AdjEM]
const CBB_ROWS = /*CBBROWS*/;
// tip times ET. [date, time, away, home, homeSpread, total, mlAway, mlHome, tv, extra]; null moneyline = not posted
const CBB_GAMES = [
  ["2026-11-18", "12:00", "Jackson State", "Baylor", -35.5, 155.5, null, null, ""],
  ["2026-11-18", "14:00", "Rutgers", "Notre Dame", -3.5, 149.5, 142, -170, "", {"venue": "Las Vegas, NV", "hfa": 0, "note": "Players Era Festival — neutral site"}],
  ["2026-11-18", "16:30", "Houston", "Florida", -1.5, 148.5, 110, -130, "", {"venue": "Las Vegas, NV", "hfa": 0, "note": "Players Era Festival — neutral site"}],
  ["2026-11-18", "18:30", "Tennessee Tech", "UNC Asheville", 2.5, 161.5, -155, 130, ""],
  ["2026-11-18", "18:30", "Samford", "USC Upstate", 7.5, 150.5, -278, 225, ""],
  ["2026-11-18", "18:30", "Chattanooga", "Winthrop", 1.5, 164.5, -125, 105, ""],
  ["2026-11-18", "18:30", "Detroit Mercy", "Eastern Michigan", -11.5, 141.5, 550, -800, ""],
  ["2026-11-18", "18:30", "IU Indy", "Penn State", -17.5, 168.5, 1000, -1800, ""],
  ["2026-11-18", "18:30", "Navy", "Georgetown", -22.5, 140.5, 2000, -6500, ""],
  ["2026-11-18", "19:00", "Mercer", "Presbyterian", -2.5, 154.5, 124, -148, ""],
  ["2026-11-18", "19:00", "James Madison", "Towson", -3.5, 139.5, 136, -162, ""],
  ["2026-11-18", "19:00", "Howard", "Duquesne", -6.5, 143.5, 225, -278, ""],
  ["2026-11-18", "19:00", "Coppin State", "La Salle", -13.5, 142.5, 900, -1600, ""],
  ["2026-11-18", "19:00", "Boston University", "Merrimack", -4.5, 133.5, 180, -218, ""],
  ["2026-11-18", "19:00", "Florida Gulf Coast", "Florida Atlantic", -6.5, 155.5, 225, -278, ""],
  ["2026-11-18", "19:00", "Furman", "Radford", 5.5, 149.5, -225, 185, ""],
  ["2026-11-18", "19:00", "VMI", "Longwood", -6.5, 152.5, 230, -285, ""],
  ["2026-11-18", "19:00", "Morgan State", "North Carolina A&T", -7.5, 149.5, 230, -285, ""],
  ["2026-11-18", "19:00", "Elon", "South Carolina", -15.5, 136.5, 900, -1600, ""],
  ["2026-11-18", "19:00", "Morehead State", "Ohio", -16.5, 150.5, 1000, -1800, ""],
  ["2026-11-18", "19:00", "Vermont", "Yale", -4.5, 140.5, 136, -162, ""],
  ["2026-11-18", "19:00", "Siena", "St. John's", -29.5, 167.5, 4000, -50000, ""],
  ["2026-11-18", "19:00", "North Carolina Central", "George Mason", -26.5, 133.5, 3500, -20000, ""],
  ["2026-11-18", "19:00", "UNC Wilmington", "LIU", 10.5, 147.5, null, null, ""],
  ["2026-11-18", "19:00", "NJIT", "Fairleigh Dickinson", -3.5, 136.5, 145, -175, ""],
  ["2026-11-18", "19:00", "Chicago State", "Illinois Chicago", -22.5, 141.5, 2000, -6500, ""],
  ["2026-11-18", "19:00", "Wofford", "Charleston Southern", 3.5, 161.5, -162, 136, ""],
  ["2026-11-18", "19:00", "Brown", "Holy Cross", 6.5, 138.5, -225, 185, ""],
  ["2026-11-18", "19:00", "Binghamton", "Lafayette", -2.5, 133.5, 120, -142, ""],
  ["2026-11-18", "19:30", "LSU New Orleans", "Texas Tech", -35.5, 153.5, null, null, ""],
  ["2026-11-18", "19:30", "Youngstown State", "Cincinnati", -27.5, 153.5, 3500, -20000, ""],
  ["2026-11-18", "19:30", "Kansas", "West Virginia", 9.5, 150.5, null, null, ""],
  ["2026-11-18", "19:30", "Northern Illinois", "Marquette", -29.5, 145.5, 4000, -50000, ""],
  ["2026-11-18", "20:00", "Florida A&M", "UTSA", -15.5, 150.5, 900, -1600, ""],
  ["2026-11-18", "20:00", "Incarnate Word", "Texas State", -17.5, 142.5, 1200, -2400, ""],
  ["2026-11-18", "20:00", "Arkansas Pine Bluff", "Arkansas State", -25.5, 160.5, 3000, -10000, ""],
  ["2026-11-18", "20:00", "Purdue Fort Wayne", "Bradley", -6.5, 135.5, 235, -290, ""],
  ["2026-11-18", "20:00", "Cornell", "Syracuse", -21.5, 158.5, 1800, -5000, ""],
  ["2026-11-18", "20:00", "New Hampshire", "Stonehill", 1.5, 133.5, -135, 114, ""],
  ["2026-11-18", "20:00", "UL Monroe", "LSU", -36.5, 159.5, null, null, ""],
  ["2026-11-18", "20:00", "UNC Greensboro", "Gardner Webb", 2.5, 148.5, -135, 114, ""],
  ["2026-11-18", "20:00", "Wichita State", "Loyola Chicago", 1.5, 149.5, -118, -102, ""],
  ["2026-11-18", "20:00", "Boston College", "Harvard", 3.5, 128.5, -170, 142, ""],
  ["2026-11-18", "20:00", "Campbell", "Oklahoma", -23.5, 147.5, 2200, -8000, ""],
  ["2026-11-18", "20:30", "South Dakota", "Nebraska", -33.5, 161.5, null, null, ""],
  ["2026-11-18", "21:00", "North Dakota State", "Colorado State", -13.5, 147.5, 750, -1200, ""],
  ["2026-11-18", "21:00", "Weber State", "Utah State", -32.5, 169.5, null, null, ""],
  ["2026-11-18", "21:00", "Alcorn State", "Missouri", -44.5, 153.5, null, null, ""],
  ["2026-11-18", "21:00", "Northern Colorado", "BYU", -29.5, 162.5, 4000, -50000, ""],
  ["2026-11-18", "21:00", "Oakland", "Arizona State", -24.5, 148.5, 2500, -9000, ""],
  ["2026-11-18", "21:00", "Fresno State", "San José State", -6.5, 153.5, 220, -270, ""],
  ["2026-11-18", "21:00", "Portland", "Colorado", -14.5, 154.5, 850, -1450, ""],
  ["2026-11-18", "21:00", "UConn", "Arizona", -3.5, 148.5, 140, -166, ""],
  ["2026-11-18", "21:00", "Bethune Cookman", "Creighton", -23.5, 151.5, null, null, ""],
  ["2026-11-18", "21:30", "UC Riverside", "San Diego", -7.5, 149.5, 250, -310, ""],
  ["2026-11-18", "22:00", "Texas Southern", "San Diego State", -27.5, 155.5, 4000, -50000, ""],
  ["2026-11-18", "22:00", "Washington State", "Hawai'i", -1.5, 141.5, 100, -120, ""],
  ["2026-11-18", "22:00", "Louisiana", "San Francisco", -10.5, 134.5, 455, -625, ""],
  ["2026-11-18", "22:00", "UNLV", "Auburn", -8.5, 161.5, null, null, ""],
  ["2026-11-18", "22:00", "Idaho", "Nevada", -18.5, 145.5, 1100, -2100, ""],
  ["2026-11-18", "22:30", "Cal State Fullerton", "UCLA", -34.5, 165.5, null, null, ""],
];

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 11", dataDate:"2026-11-17", linesAt:"2026-11-17T20:10Z",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines: DraftKings via ESPN, Nov 17. Bye: ATL, CLE, GB, LA, NE, SEA. Vikings–49ers is in Mexico City (treated as near-neutral). Team ratings do not account for injuries.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 12", dataDate:"2026-11-16", linesAt:"2026-11-17T14:00Z",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Lines: DraftKings via ESPN, Nov 17 at 8:00 AM CT. Team stats (EPA per play, success rate, pass EPA) through Nov 16. Finished games drop off once they end.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Wed Nov 18", dataDate:"2026-11-15", linesAt:"2026-11-18T13:46Z",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from DraftKings via ESPN, Nov 18. Finished games drop off once they end.",
  },
  cbb: { key:"cbb", label:"CBB", weekLabel:"Wed Nov 18", dataDate:"2026-11-15", linesAt:"2026-11-18T13:46Z",
    cfg:{basePts:70, plays:68, regress:1.0, sdMargin:10.5, sdGrow:0.12, sdTotal:12.0, wModel:0.35, bigStart:20, bigK:0.027, wTotal:0.33, hfa:3.2, keys:[]},
    footer:"Lines from DraftKings via ESPN, Nov 18. Games without a posted line are left off. Finished games drop off once they end.",
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
