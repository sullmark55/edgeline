const fs=require('fs');eval(fs.readFileSync('model2_built.js','utf8')+';global.buildLeague=buildLeague;');
const out=[];
const B=buildLeague('nhl');console.log('nhl games',B.rows.length,'missing',B.missing);
for(const {g,p} of B.rows){for(const m of ['spread','totals','ml']){const x=p[m];
  if(x.score>=6&&Date.now()<g.kickoff.getTime()){
    let side,line,price;
    if(m==='spread'){side=x.side;line=x.line;price=x.price;}
    else if(m==='totals'){side=x.side;line=g.total;price=x.price;}
    else{side=x.pick.startsWith(g.home+' ')?'home':'away';line=null;price=side==='home'?g.mlHome:g.mlAway;}
    out.push({w:'NHL',lg:'nhl',date:g.date,away:g.away,home:g.home,m,side,line,price,pick:x.pick,score:x.score,prob:+x.prob.toFixed(3),
      goalies:(p.goalies.away.name+' / '+p.goalies.home.name)});}}}
console.log(out.length);out.forEach(o=>console.log(o.score,o.pick,'|',o.away,'@',o.home,'|',o.prob));
fs.writeFileSync('nhlpicks.json',JSON.stringify(out));
