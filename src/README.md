# Edgeline source
`index.html` at the repo root is built from these files; edit here, never by hand.
- `python3 build.py` builds `nfl-edge-board.html` (the Claude artifact page); `python3 make_site.py` writes `../index.html` for edgeline.pro.
- Daily NBA refresh: `python3 nba_daily.py update.json` (format in the script's docstring) does both builds.
- Daily college basketball refresh: `python3 cbb_daily.py cbb.json` (format in its docstring). KenPom ratings come from a pasted kenpom.com table: `python3 kenpom_import.py pasted.txt` writes cbb_data.json.

- Header freshness line: each league in `LEAGUES` (model2.js) has `linesAt` (UTC time the lines were last loaded) next to `dataDate`. `nba_daily.py` and `cbb_daily.py` stamp it automatically when the games/lines change; for NFL/CFB set it by hand when loading lines. The header turns it amber when lines are older than 26h (NBA/CBB) or 72h (NFL/CFB), or team data is older than about 4 days (NBA), 7 (CBB) or 8 (football).
- CBB big-spread taper (Nov 11): for spreads over 20 points the KenPom weight shrinks as wModel/(1+bigK*(|spread|-20)), bigK 0.027 in LEAGUES.cbb.cfg. At 36.5 that's about 0.24 instead of 0.35. Set bigK to 0 to turn it off.
- `results.py`: records final scores for any league and grades picks without touching slates or lines. `python3 results.py --pending` lists started games that still have ungraded picks; `python3 results.py finals.json` records them, rebuilds and prints the record. Used by the 4:30 / 7:00 / 10:00 PM results task.
