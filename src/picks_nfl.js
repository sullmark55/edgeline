const fs=require('fs');eval(fs.readFileSync('model2_built.js','utf8')+';global.buildLeague=buildLeague;');
const out=[];
for(const k of ['nfl']){const B=buildLeague(k);console.log(k,'games',B.rows.length,'missing',B.missing,'base',B.L.cfg.basePts.toFixed(2));
 for(const {g,p} of B.rows){for(const m of ['spread','totals','ml']){const x=p[m];if(x.score>=6&&Date.now()<g.kickoff.getTime()){
  let side,line,price;
  if(m==='spread'){side=x.pick.startsWith(g.home+' ')?'home':'away';line=side==='home'?g.spread:-g.spread;price=-110;}
  else if(m==='totals'){side=x.pick.startsWith('Over')?'over':'under';line=g.total;price=-110;}
  else{side=x.pick.startsWith(g.home+' ')?'home':'away';line=null;price=side==='home'?g.mlHome:g.mlAway;}
  out.push({w:k==='nfl'?'NFL Wk 10':'CFB Wk 9',lg:k,date:g.date,away:g.away,home:g.home,m,side,line,price,pick:x.pick,score:x.score,prob:+x.prob.toFixed(3)});}}}}
console.log(out.length);out.forEach(o=>console.log(o.w,o.score,o.pick,'|',o.away,'@',o.home));
fs.writeFileSync('nflpicks.json',JSON.stringify(out));
