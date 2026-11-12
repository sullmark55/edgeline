// ===================== DATA (swap weekly) =====================
const NFL_CSV = `/*NFLCSV*/`;
const CFB_ROWS = /*CFBROWS*/; // [team, conf, offPPA, defPPA, offSR, defSR, offPassPPA, defPassPPA, offPlays]

// Game rows: [dateYYYY-MM-DD, timeET "HH:MM", away, home, homeSpread, total, mlAway, mlHome, tv, extra]
// homeSpread: home team's line (negative = home favored).
const NFL_GAMES = [
  ["2026-11-12", "20:15", "WAS", "NYG", -2.5, 41.5, 110, -130, "Prime"],
  ["2026-11-15", "09:30", "NE", "DET", -2.5, 51.5, 124, -148, "FOX", {"venue": "Allianz Arena, Munich", "hfa": 0.5, "note": "Munich — treated as near-neutral"}],
  ["2026-11-15", "13:00", "BUF", "NYJ", 8.5, 50.5, -485, 370, "CBS"],
  ["2026-11-15", "13:00", "KC", "ATL", 3.5, 45.5, -180, 150, "CBS"],
  ["2026-11-15", "13:00", "MIA", "IND", -3.5, 38.5, 154, -185, "CBS"],
  ["2026-11-15", "13:00", "MIN", "GB", -3.5, 41.5, 142, -170, "FOX"],
  ["2026-11-15", "13:00", "CAR", "NO", -1.5, 48.5, 102, -122, "FOX"],
  ["2026-11-15", "13:00", "JAX", "TEN", 10.5, 46.5, -600, 440, "FOX"],
  ["2026-11-15", "13:00", "HOU", "CLE", 4.5, 39.5, -225, 185, "FOX"],
  ["2026-11-15", "16:05", "LA", "ARI", 9.5, 39.5, -425, 330, "CBS"],
  ["2026-11-15", "16:05", "SEA", "LV", 6, 40.5, -278, 225, "CBS"],
  ["2026-11-15", "16:25", "SF", "DAL", 3.5, 55.5, -205, 170, "FOX"],
  ["2026-11-15", "20:20", "PIT", "CIN", -3.5, 49.5, 145, -175, "NBC"],
  ["2026-11-16", "20:15", "LAC", "BAL", -4.5, 38.5, 160, -192, "ESPN"],
];
const NFL_VENUES={"BAL": "M&T Bank Stadium", "NO": "Caesars Superdome", "IND": "Lucas Oil Stadium", "CAR": "Bank of America Stadium", "MIA": "Hard Rock Stadium", "WAS": "Northwest Stadium", "PHI": "Lincoln Financial Field", "KC": "GEHA Field at Arrowhead Stadium", "LAC": "SoFi Stadium", "SF": "Levi's Stadium", "NE": "Gillette Stadium", "SEA": "Lumen Field", "CHI": "Soldier Field", "MIN": "U.S. Bank Stadium"};

const CFB_GAMES = [
  ["2026-11-10", "19:00", "Western Michigan", "Akron", 14, 48.5, -599, 500, "CBSSN"],
  ["2026-11-10", "19:00", "Kent State", "Bowling Green", -5.5, 44.5, 180, -210, "ESPNU"],
  ["2026-11-10", "20:00", "Ohio", "Miami (OH)", 1.5, 46.5, -118, -102, "ESPN2"],
  ["2026-11-11", "19:30", "Buffalo", "Ball State", 2.5, 51.5, -132, 114, "ESPN2"],
  ["2026-11-11", "19:30", "Sacramento State", "Central Michigan", -17.5, 43.5, 760, -1000, "ESPNU"],
  ["2026-11-11", "19:30", "Massachusetts", "Toledo", -14, 52.5, 475, -599, "CBSSN"],
  ["2026-11-12", "20:00", "Memphis", "South Florida", 4, 50.5, -172, 160, "ESPN"],
  ["2026-11-12", "21:00", "Louisiana", "UL Monroe", 10.5, 49.5, -410, 333, "ESPN2"],
  ["2026-11-13", "19:00", "Florida State", "Pittsburgh", -3.5, 54.5, 142, -160, "ESPN"],
  ["2026-11-13", "21:00", "Illinois", "UCLA", -9.5, 47.5, 310, -370, "FOX"],
  ["2026-11-13", "22:15", "Houston", "Colorado", 10.5, 51.5, -395, 320, "ESPN"],
  ["2026-11-14", "12:00", "Cincinnati", "Iowa State", -3, 60.5, 130, -150, "TNT"],
  ["2026-11-14", "12:00", "Auburn", "Mississippi State", 2.5, 50.5, -142, 124, "ESPN2"],
  ["2026-11-14", "12:00", "Duke", "Miami", -13, 54.5, 425, -549, "ABC"],
  ["2026-11-14", "12:00", "Syracuse", "NC State", 2.5, 54.5, -135, 122, "ACCN"],
  ["2026-11-14", "12:00", "Wake Forest", "SMU", 1.5, 61.5, -115, -105, "ESPN"],
  ["2026-11-14", "12:00", "Wisconsin", "Maryland", 7.5, 43.5, -300, 260, "FS1"],
  ["2026-11-14", "12:00", "Northwestern", "Ohio State", -12.5, 46.5, 385, -455, "FOX"],
  ["2026-11-14", "12:00", "James Madison", "UConn", 3.5, 57.5, -182, 160, "CBSSN"],
  ["2026-11-14", "12:30", "Georgia Tech", "Clemson", -13.5, 47.5, 430, -549, "The CW"],
  ["2026-11-14", "12:30", "Nebraska", "Rutgers", 13.5, 52.5, -549, 450, "BTN"],
  ["2026-11-14", "12:45", "Alabama", "Vanderbilt", 15.5, 50.5, -719, 575, "SECN"],
  ["2026-11-14", "13:00", "East Carolina", "Charlotte", 11.5, 45.5, -450, 375, "ESPN+"],
  ["2026-11-14", "13:00", "UAB", "Temple", -2.5, 48.5, 110, -126, "ESPN+"],
  ["2026-11-14", "13:00", "Arkansas State", "Coastal Carolina", -1, 50.5, -102, -118, "ESPN+"],
  ["2026-11-14", "14:00", "Kansas State", "TCU", -10, 46.5, 320, -395, "ESPNU"],
  ["2026-11-14", "14:00", "Tulane", "Rice", -1.5, 48.5, 110, -126, "ESPN+"],
  ["2026-11-14", "14:00", "Kennesaw State", "Sam Houston", 7.5, 46.5, -275, 245, "ESPN+"],
  ["2026-11-14", "15:00", "Tennessee", "Texas A&M", 2.5, 43.5, -135, 116, "ESPN"],
  ["2026-11-14", "15:00", "Florida International", "Delaware", -5, 54.5, 180, -210, "ESPN+"],
  ["2026-11-14", "15:00", "New Mexico State", "Missouri State", -1.5, 49.5, 105, -122, "ESPN+"],
  ["2026-11-14", "15:30", "Michigan", "Oregon", -11.5, 38.5, 350, -435, "FS1"],
  ["2026-11-14", "15:30", "Baylor", "BYU", -7, 49.5, 240, -278, "FOX"],
  ["2026-11-14", "15:30", "Nevada", "Northern Illinois", 7, 47.5, -275, 230, "MW+"],
  ["2026-11-14", "15:30", "Jacksonville State", "Western Kentucky", 7, 54.5, -285, 235, "ESPN+"],
  ["2026-11-14", "15:30", "Florida Atlantic", "Tulsa", -5.5, 74.5, 180, -205, "ESPN+"],
  ["2026-11-14", "15:30", "USC", "Indiana", -7.5, 49.5, 240, -285, "CBS"],
  ["2026-11-14", "15:30", "California", "Virginia", -10, 47.5, 333, -410, "ACCN"],
  ["2026-11-14", "15:30", "Arizona State", "UCF", -3.5, 49.5, 142, -164, "ESPN2"],
  ["2026-11-14", "15:30", "Boston College", "Notre Dame", -28.5, 52.5, 2200, -5000, "NBC"],
  ["2026-11-14", "15:30", "Middle Tennessee", "Liberty", -20.5, 53.5, 900, -1429, "CBSSN"],
  ["2026-11-14", "15:30", "Georgia Southern", "Georgia State", 5.5, 56.5, -205, 170, "ESPN+"],
  ["2026-11-14", "15:30", "Missouri", "Georgia", -15.5, 47.5, 500, -700, "ABC"],
  ["2026-11-14", "16:00", "Fresno State", "Texas State", -8.5, 60.5, 295, -350, "The CW"],
  ["2026-11-14", "16:15", "Washington", "Michigan State", 3, 43.5, -162, 142, "BTN"],
  ["2026-11-14", "16:15", "Ole Miss", "Oklahoma", 1.5, 49.5, -115, -105, "SECN"],
  ["2026-11-14", "17:00", "Southern Miss", "Louisiana Tech", -17.5, 55.5, 650, -901, ""],
  ["2026-11-14", "17:30", "Kansas", "West Virginia", -3, 67.5, 120, -142, ""],
  ["2026-11-14", "18:00", "App State", "Marshall", 1.5, 53.5, -120, 104, ""],
  ["2026-11-14", "18:00", "Oregon State", "Boise State", -12.5, 65.5, 400, -500, ""],
  ["2026-11-14", "18:15", "Florida", "Kentucky", -3.5, 53.5, 145, -162, ""],
  ["2026-11-14", "19:00", "San José State", "Air Force", -11.5, 47.5, 375, -469, ""],
  ["2026-11-14", "19:00", "Minnesota", "Penn State", -9.5, 41.5, 290, -340, ""],
  ["2026-11-14", "19:00", "Troy", "South Alabama", -3, 56.5, 130, -154, ""],
  ["2026-11-14", "19:00", "Louisville", "North Carolina", 3.5, 59.5, -170, 142, ""],
  ["2026-11-14", "19:30", "Stanford", "Virginia Tech", -15, 58.5, 530, -714, ""],
  ["2026-11-14", "19:30", "Purdue", "Iowa", -17, 47.5, 650, -909, ""],
  ["2026-11-14", "19:30", "Texas", "LSU", -3.5, 46.5, 150, -175, ""],
  ["2026-11-14", "19:30", "Utah", "Arizona", 2.5, 54.5, -142, 120, ""],
  ["2026-11-14", "19:30", "UNLV", "New Mexico", -14, 46.5, 500, -588, ""],
  ["2026-11-14", "19:45", "South Carolina", "Arkansas", 7.5, 51.5, -294, 250, ""],
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
  ["SAS", "Spurs", 117.7, 107.7, 99.3, 11],
  ["OKC", "Thunder", 114.5, 106.3, 98.9, 11],
  ["HOU", "Rockets", 116.2, 109.0, 97.6, 11],
  ["POR", "Trail Blazers", 116.1, 110.9, 100.7, 10],
  ["BOS", "Celtics", 115.4, 110.5, 96.6, 11],
  ["GSW", "Warriors", 115.2, 110.3, 100.1, 11],
  ["LAL", "Lakers", 117.2, 112.4, 100.4, 12],
  ["MIN", "Timberwolves", 113.7, 109.7, 100.6, 11],
  ["DEN", "Nuggets", 116.6, 112.6, 98.2, 9],
  ["NYK", "Knicks", 113.8, 111.2, 95.8, 10],
  ["DET", "Pistons", 112.7, 110.4, 99.2, 10],
  ["TOR", "Raptors", 114.1, 112.0, 100.7, 10],
  ["MEM", "Grizzlies", 114.2, 112.6, 100.9, 10],
  ["DAL", "Mavericks", 112.7, 111.5, 100.1, 11],
  ["PHX", "Suns", 114.4, 114.1, 98.3, 10],
  ["CLE", "Cavaliers", 114.1, 114.7, 100.5, 11],
  ["ATL", "Hawks", 112.2, 112.9, 103.3, 12],
  ["MIA", "Heat", 113.4, 114.0, 102.8, 11],
  ["PHI", "76ers", 110.9, 111.8, 100.3, 12],
  ["ORL", "Magic", 110.6, 111.9, 97.9, 10],
  ["IND", "Pacers", 112.0, 113.7, 101.3, 11],
  ["LAC", "Clippers", 110.3, 113.1, 100.8, 10],
  ["UTA", "Jazz", 109.0, 112.6, 101.2, 11],
  ["NOP", "Pelicans", 111.9, 115.8, 101.8, 11],
  ["WAS", "Wizards", 108.9, 115.2, 100.0, 11],
  ["CHA", "Hornets", 108.5, 114.8, 96.8, 11],
  ["SAC", "Kings", 109.0, 115.8, 100.6, 11],
  ["BKN", "Nets", 107.2, 115.9, 100.0, 10],
  ["CHI", "Bulls", 109.4, 118.6, 104.8, 9],
  ["MIL", "Bucks", 108.5, 117.8, 100.3, 11],
];
// tip times ET
const NBA_GAMES = [
  ["2026-11-11", "19:00", "WAS", "IND", -4.5, 226.5, 135, -160, ""],
  ["2026-11-11", "19:00", "BOS", "TOR", 7.5, 215.5, -279, 228, ""],
  ["2026-11-11", "19:00", "CLE", "NYK", -3.5, 221.5, 140, -166, "ESPN"],
  ["2026-11-11", "20:00", "SAS", "CHI", 15.5, 239.5, -940, 630, ""],
  ["2026-11-11", "20:00", "BKN", "NOP", -4.5, 230.5, 140, -166, ""],
  ["2026-11-11", "20:00", "DEN", "MEM", 4.5, 227.5, -162, 136, ""],
  ["2026-11-11", "20:00", "LAL", "MIL", 12.5, 231.5, -654, null, ""],
  ["2026-11-11", "21:00", "ORL", "UTA", 4.5, 217.5, -166, 140, ""],
  ["2026-11-11", "21:30", "GSW", "HOU", -5.5, 222.5, 158, -189, "ESPN"],
  ["2026-11-11", "22:00", "OKC", "POR", 2.5, 225.5, -132, 111, ""],
];
const NBA_VENUES={NYK:"Madison Square Garden",MIN:"Target Center",CHI:"United Center",DEN:"Ball Arena",PHX:"Mortgage Matchup Center",ATL:"State Farm Arena",DAL:"American Airlines Center",CLE:"Rocket Arena",MIL:"Fiserv Forum",BOS:"TD Garden",CHA:"Spectrum Center",IND:"Gainbridge Fieldhouse",UTA:"Delta Center",GSW:"Chase Center",SAC:"Golden 1 Center",PHI:"Xfinity Mobile Arena",OKC:"Paycom Center",DET:"Little Caesars Arena",NYK:"Madison Square Garden",SAS:"Frost Bank Center",ORL:"Kia Center",WAS:"Capital One Arena",BKN:"Barclays Center",MIA:"Kaseya Center",TOR:"Scotiabank Arena",MEM:"FedExForum",NOP:"Smoothie King Center",HOU:"Toyota Center",LAL:"Crypto.com Arena",POR:"Moda Center",LAC:"Intuit Dome"};

// CBB: KenPom ratings (pasted from kenpom.com, Nov 5). [team, conf, W-L, AdjO, AdjD, AdjT, AdjEM]
const CBB_ROWS = /*CBBROWS*/;
// tip times ET. [date, time, away, home, homeSpread, total, mlAway, mlHome, tv, extra]; null moneyline = not posted
const CBB_GAMES = [
  ["2026-11-11", "11:30", "Fairleigh Dickinson", "East Texas A&M", -10.5, 137.5, 390, -520, "ESPN+"],
  ["2026-11-11", "12:00", "Kansas City", "Florida A&M", 6.5, 143.5, -230, 190, "YouTube"],
  ["2026-11-11", "13:00", "Dartmouth", "Albany", 1.5, 138.5, -130, 110, "ESPN+"],
  ["2026-11-11", "14:00", "Incarnate Word", "UC Davis", -11.5, 145.5, 600, -900, ""],
  ["2026-11-11", "15:00", "Saint Joseph's", "South Florida", -7.5, 151.5, 245, -305, "CBSSN", {"venue": "Alumni Hall, Annapolis, MD", "hfa": 0, "note": "Veterans Classic — neutral site"}],
  ["2026-11-11", "15:00", "Loyola Chicago", "Air Force", 10.5, 159.5, -550, 410, ""],
  ["2026-11-11", "16:00", "North Carolina A&T", "East Carolina", -10.5, 151.5, 440, -600, "ESPN+"],
  ["2026-11-11", "17:00", "Bethune Cookman", "San Diego State", -18.5, 152.5, 1300, -2800, ""],
  ["2026-11-11", "17:30", "Penn", "Navy", 7.5, 146.5, -375, 295, "CBSSN"],
  ["2026-11-11", "18:00", "North Carolina Central", "VMI", -7.5, 147.5, 300, -380, "ESPN+"],
  ["2026-11-11", "18:30", "Charleston", "Temple", 1.5, 157.5, -125, 105, "ESPN+"],
  ["2026-11-11", "18:30", "Southern Indiana", "IU Indy", -8.5, 163.5, 280, -355, "ESPN+"],
  ["2026-11-11", "19:00", "Milwaukee", "Indiana State", -4.5, 154.5, 160, -192, "ESPN+"],
  ["2026-11-11", "19:00", "Kent State", "UNC Wilmington", -7.5, 156.5, 270, -340, "FloHoops"],
  ["2026-11-11", "19:00", "Old Dominion", "Norfolk State", 6.5, 136.5, -270, 220, ""],
  ["2026-11-11", "19:00", "South Carolina State", "Notre Dame", -26.5, 149.5, 3500, -20000, "ACCNX"],
  ["2026-11-11", "19:00", "Stony Brook", "Princeton", -5.5, 139.5, 180, -218, "ESPN+"],
  ["2026-11-11", "19:00", "Saint Peter's", "South Carolina", -21.5, 126.5, 1800, -5000, "SEC Network+"],
  ["2026-11-11", "19:00", "Furman", "Holy Cross", 12.5, 151.5, -850, 575, "ESPN+"],
  ["2026-11-11", "19:00", "James Madison", "Delaware", 2.5, 149.5, -155, 130, "ESPN+"],
  ["2026-11-11", "19:00", "Campbell", "East Tennessee State", -5.5, 145.5, 185, -225, "ESPN+"],
  ["2026-11-11", "19:00", "Colgate", "St. John's", -29.5, 158.5, 5000, -100000, "Peacock"],
  ["2026-11-11", "19:00", "NJIT", "VCU", -34.5, 149.5, null, null, "ESPN+"],
  ["2026-11-11", "19:00", "William & Mary", "Florida Atlantic", -5.5, 165.5, 180, -218, "ESPN+"],
  ["2026-11-11", "19:00", "UNC Asheville", "West Georgia", -1.5, 147.5, 110, -130, "ESPN+"],
  ["2026-11-11", "19:00", "American", "Drexel", -1.5, 138.5, -115, 102, "FloHoops"],
  ["2026-11-11", "19:00", "Cornell", "St. Bonaventure", -7.5, 157.5, 295, -375, "ESPN+"],
  ["2026-11-11", "19:00", "UMass Lowell", "Massachusetts", -7.5, 150.5, 280, -355, "ESPN+"],
  ["2026-11-11", "19:00", "Marquette", "Michigan", -3.5, 157.5, 136, -162, "FS1"],
  ["2026-11-11", "19:30", "Pepperdine", "Sam Houston", 3.5, 159.5, -162, 136, "ESPN+"],
  ["2026-11-11", "20:00", "Valparaiso", "South Dakota State", 2.5, 141.5, -125, 105, ""],
  ["2026-11-11", "20:00", "Robert Morris", "Arkansas", -29.5, 155.5, 5000, -100000, "SEC Network+"],
  ["2026-11-11", "20:00", "Oral Roberts", "Tulsa", -18.5, 155.5, 1400, -3200, "ESPN+"],
  ["2026-11-11", "20:00", "Jacksonville State", "Houston", -33.5, 135.5, null, null, "ESPN+"],
  ["2026-11-11", "20:00", "Jackson State", "Southern Miss", -8.5, 152.5, 350, -455, "ESPN+"],
  ["2026-11-11", "20:00", "Stephen F. Austin", "Abilene Christian", 6.5, 142.5, -250, 205, "ESPN+"],
  ["2026-11-11", "20:00", "Santa Clara", "North Texas", 1.5, 154.5, -122, 102, "ESPN+"],
  ["2026-11-11", "21:00", "Arkansas Pine Bluff", "UCLA", -47.5, 157.5, null, null, "NBCSN"],
  ["2026-11-11", "21:00", "Oakland", "Boise State", -16.5, 160.5, 1000, -1800, "YouTube"],
  ["2026-11-11", "21:00", "Lindenwood", "Nebraska", -34.5, 152.5, null, null, "FS1"],
  ["2026-11-11", "21:00", "Portland State", "Colorado State", -16.5, 150.5, 1100, -2100, "YouTube"],
  ["2026-11-11", "21:00", "Nevada", "UC Santa Barbara", -1.5, 145.5, -115, -105, "ESPN+"],
  ["2026-11-11", "21:00", "Cal Poly", "Grand Canyon", -18.5, 181.5, 1400, -3200, ""],
  ["2026-11-11", "22:00", "Mississippi Valley State", "Oregon", -35.5, 149.5, null, null, "B1G+"],
  ["2026-11-11", "22:00", "Chicago State", "Cal Baptist", -11.5, 138.5, 575, -850, "ESPN+"],
  ["2026-11-11", "22:00", "Pacific", "Long Beach State", 5.5, 138.5, -258, 210, "ESPN+"],
  ["2026-11-11", "22:00", "UTSA", "Seattle", -16.5, 148.5, 1100, -2100, "ESPN+"],
  ["2026-11-11", "23:00", "USC", "California", 8.5, 160.5, -360, 285, "ESPN2"],
];

const NFL_NAMES={ARI:"Cardinals",ATL:"Falcons",BAL:"Ravens",BUF:"Bills",CAR:"Panthers",CHI:"Bears",CIN:"Bengals",CLE:"Browns",DAL:"Cowboys",DEN:"Broncos",DET:"Lions",GB:"Packers",HOU:"Texans",IND:"Colts",JAX:"Jaguars",KC:"Chiefs",LA:"Rams",LAC:"Chargers",LV:"Raiders",MIA:"Dolphins",MIN:"Vikings",NE:"Patriots",NO:"Saints",NYG:"Giants",NYJ:"Jets",PHI:"Eagles",PIT:"Steelers",SEA:"Seahawks",SF:"49ers",TB:"Buccaneers",TEN:"Titans",WAS:"Commanders"};

// ===================== MODEL =====================
const LEAGUES = {
  nfl: { key:"nfl", label:"NFL", weekLabel:"Week 10", dataDate:"2026-11-09", linesAt:"2026-11-12T02:45Z",
    cfg:{basePts:22.0, plays:62, regress:0.55, sdMargin:13.5, sdTotal:13.0, srScale:2.4, passScale:0.65, wModel:0.40, hfa:1.5, keys:[3,7]},
    footer:"Lines: DraftKings via ESPN, Nov 10. Bye: CHI, DEN, PHI, TB. Patriots–Lions is in Munich (treated as near-neutral). Team ratings do not account for injuries.",
  },
  cfb: { key:"cfb", label:"CFB", weekLabel:"Week 11", dataDate:"2026-11-08", linesAt:"2026-11-10T20:42Z",
    cfg:{basePts:28.0, plays:68, regress:0.40, sdMargin:15.5, sdTotal:15.0, srScale:2.5, passScale:0.65, wModel:0.30, hfa:2.5, keys:[3,7], calibrateTotals:true},
    footer:"Lines: CBS Sports consensus, Nov 10 at 2:45 PM CT (Wake Forest–SMU, Missouri–Georgia and UNLV–New Mexico still from DraftKings via ESPN that morning). Team EPA per play through Week 10; success rate and pass EPA through Week 9. Finished games drop off once they end.",
  },
  nba: { key:"nba", label:"NBA", weekLabel:"Wed Nov 11", dataDate:"2026-11-10", linesAt:"2026-11-11T13:43Z",
    cfg:{basePts:115, plays:100, regress:0.85, sdMargin:12.5, sdTotal:18.0, wModel:0.40, hfa:2.0, keys:[], anchorTotals:false, wTotal:0.25},
    footer:"Lines from DraftKings via ESPN, Pickdawgz, FanDuel Research and iHeart/Fox Sports 990, Nov 11. Finished games drop off once they end.",
  },
  cbb: { key:"cbb", label:"CBB", weekLabel:"Wed Nov 11", dataDate:"2026-11-11", linesAt:"2026-11-11T22:52Z",
    cfg:{basePts:70, plays:68, regress:1.0, sdMargin:10.5, sdGrow:0.12, sdTotal:12.0, wModel:0.35, bigStart:20, bigK:0.027, wTotal:0.33, hfa:3.2, keys:[]},
    footer:"Lines from DraftKings via ESPN; games not yet tipped refreshed Nov 11 at 4:55 PM CT. Games without a posted line are left off. Finished games drop off once they end.",
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
