/* ===== uso offline: mappa scaricabile, avviso senza rete ===== */
(function(){
var $=function(s){return document.querySelector(s)};
function toast(t){var el=$("#toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},2600)}
/* avviso offline */
var chip=$("#offl");function net(first){if(chip)chip.hidden=navigator.onLine;if(!first)toast(navigator.onLine?"Di nuovo online":"Sei offline: l'app funziona, mappe solo nelle zone scaricate")}
window.addEventListener("online",function(){net()});window.addEventListener("offline",function(){net()});net(true);
/* tessere */
var LIB=["lib/leaflet.js","lib/leaflet.css","lib/images/marker-icon.png","lib/images/marker-icon-2x.png","lib/images/marker-shadow.png","lib/images/layers.png","lib/images/layers-2x.png"],MAXT=320,Z0=12,Z1=16,CN="via-tiles-v1";
function tx(lng,z){return Math.floor((lng+180)/360*Math.pow(2,z))}
function ty(lat,z){var r=lat*Math.PI/180;return Math.floor((1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*Math.pow(2,z))}
function points(){var P=window.PAR,T=P&&P.trip,pts=[];if(!T||!window.PD)return pts;if(PD.START)pts.push(PD.START);
try{var h=P.home&&P.home();if(h&&h.pos)pts.push(h.pos)}catch(e){}
T.days.forEach(function(d){d.items.forEach(function(it){if(it.k==="act"&&PD.STOPS[it.id])pts.push(PD.STOPS[it.id].pos)})});return pts}
function plan(){var pts=points();if(!pts.length)return null;var la=pts.map(function(p){return p[0]}),lo=pts.map(function(p){return p[1]});
var pad=.006,a=Math.min.apply(0,la)-pad,b=Math.max.apply(0,la)+pad,c=Math.min.apply(0,lo)-pad*1.4,d=Math.max.apply(0,lo)+pad*1.4,zs=[],tiles=[];
for(var z=Z0;z<=Z1;z++){var x0=tx(c,z),x1=tx(d,z),y0=ty(b,z),y1=ty(a,z),cnt=(x1-x0+1)*(y1-y0+1);zs.push({z:z,x0:x0,x1:x1,y0:y0,y1:y1,n:cnt})}
var tot=0,use=[];zs.forEach(function(q){if(tot+q.n<=MAXT){tot+=q.n;use.push(q)}});
use.forEach(function(q){for(var x=q.x0;x<=q.x1;x++)for(var y=q.y0;y<=q.y1;y++)tiles.push("https://tile.openstreetmap.org/"+q.z+"/"+x+"/"+y+".png")});return tiles}
function key(){var c=window.PAR&&PAR.cfg;return c?"via-off:"+(c.tid||c.dest+c.date):null}
function stat(){var k=key(),s=$("#shoffs");if(!s)return;var v=null;try{v=JSON.parse(localStorage.getItem(k)||"null")}catch(e){}
s.textContent=v?"Scaricata il "+new Date(v.at).toLocaleDateString("it-IT",{day:"numeric",month:"short"})+" · "+v.n+" tessere. Tocca per aggiornare.":"Salva le tessere dell'area dei tuoi spostamenti, per usarla senza rete"}
var btn=$("#shoff"),run=false;
function put(c,u){return fetch(u,{mode:"cors"}).then(function(r){if(!r.ok)throw 0;return c.put(u,r)})}
if(btn){var g=$("#gear");g&&g.addEventListener("click",stat);
btn.addEventListener("click",function(){
 if(run)return;if(!window.PAR||!PAR.cfg||!PAR.trip){toast("Imposta prima il tuo viaggio");return}
 if(!navigator.onLine){toast("Serve una connessione per scaricare la mappa");return}
 if(!window.caches){toast("Questo browser non supporta il salvataggio offline");return}
 var tiles=plan();if(!tiles||!tiles.length){toast("Nessuna area da scaricare");return}
 run=true;btn.disabled=true;btn.style.opacity=".6";var s=$("#shoffs"),done=0,fail=0,i=0,total=tiles.length+LIB.length;s.textContent="Scarico la mappa… 0%";
 caches.open(CN).then(function(c){
  var q=LIB.concat(tiles);
  function worker(){if(i>=q.length)return Promise.resolve();var u=q[i++];return put(c,u).catch(function(){fail++}).then(function(){done++;s.textContent="Scarico la mappa… "+Math.round(done/total*100)+"%";return worker()})}
  return Promise.all([worker(),worker(),worker(),worker()])})
 .then(function(){var ok=tiles.length-Math.max(0,fail-0);try{localStorage.setItem(key(),JSON.stringify({n:Math.max(0,tiles.length-fail),at:Date.now()}))}catch(e){}stat();toast(fail?"Mappa scaricata, qualche tessera è mancata":"Mappa pronta per l'uso offline")})
 .catch(function(){s.textContent="Download non riuscito, riprova con la rete";toast("Download non riuscito")})
 .then(function(){run=false;btn.disabled=false;btn.style.opacity=""})})}
window.VIATICO_OFFLINE={plan:plan};
})();
