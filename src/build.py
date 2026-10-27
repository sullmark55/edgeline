import re
csv=re.search(r'const CSV = `(.*?)`',open('model.js').read(),re.S).group(1)
mb=open('model2.js').read().replace('/*NFLCSV*/',csv).replace('/*CFBROWS*/',open('cfb_data.json').read())
open('model2_built.js','w').write(mb)
s=open('app_script.js').read(); t=open('app_template.html').read()
b=s.replace('/*MODEL*/',mb).replace('  header(); bestPlays(); grid();\n}','  $("#grid").dataset.lg=state.lg; header(); bestPlays(); grid();\n}')
head=t.split('<script>')[0].replace('.conf{font-size:11px;color:var(--muted)}','.conf{font-size:11px;color:var(--muted)}\n#grid[data-lg="cfb"] .team{font-size:20px;line-height:1.1}\n#grid[data-lg="cfb"] .pts{font-size:21px}',1)
open('nfl-edge-board.html','w').write(head+'<script>\n'+b+'\n</script>\n'); open('chk.js','w').write(b)
