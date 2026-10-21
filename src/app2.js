/* ===== mappa interattiva (Leaflet + OpenStreetMap) ===== */
(function(){
var stage=document.querySelector(".stage"),el=document.getElementById("lmap"),info=document.getElementById("info"),off=document.getElementById("mapoff");
var map,tiles,gRoute,gStops,gFood,gPh,gWater,lines=[],ok=false,root=document.documentElement,mq=matchMedia("(prefers-color-scheme: dark)"),bnds=null,waterLoaded=false;
var tg=document.getElementById("tg"),tp=document.getElementById("tp"),tw=document.getElementById("tw"),lgp=document.getElementById("lgp");
function dark(){var cb=document.getElementById("dm");if(cb&&cb.checked)return true;var t=root.getAttribute("data-theme");return t?t==="dark":mq.matches}
function esc(t){return PAR.esc(t)}
function seg(ref){var s=PD.SEG[ref[0]],p=s.p,ia=-1,ib=-1;p.forEach(function(x,i){if(x[2]===ref[1])ia=i;if(x[2]===ref[2])ib=i});if(ia<0||ib<0)return null;
var sl=ia<=ib?p.slice(ia,ib+1):p.slice(ib,ia+1).reverse();return{k:ref[0],c:s.c,n:s.n,p:sl}}
function chunks(g){return g.map(function(x){return Array.isArray(x)?seg(x):x.k?{k:x.k,c:x.c,n:x.n,p:x.w.map(function(q){return[q[0],q[1],q[2],q[3]]}),dash:x.dash}:{k:"walk",w:1,c:"var(--c4)",n:"A piedi",p:x.w.map(function(q){return[q[0],q[1]]}),dash:x.dash}}).filter(Boolean)}
function icon(cls,txt,sz){return L.divIcon({className:"lmk "+cls,html:"<span>"+txt+"</span>",iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]})}
function pop(t,d,q){return '<div class="lpop"><b>'+esc(t)+'</b><p>'+esc(d)+'</p><div class="lpa"><a class="go sm" target="_blank" rel="noopener" href="'+esc(PAR.gdir(q))+'">↗︎ Portami lì</a><a class="lpm" target="_blank" rel="noopener" href="'+esc(PD.G(q))+'">Apri in Google Maps</a></div></div>'}
function show(t,d,q){info.innerHTML='<h3></h3><p></p>'+(q?'<a target="_blank" rel="noopener">Apri in Google Maps</a>':'');info.querySelector("h3").textContent=t;info.querySelector("p").textContent=d;if(q)info.querySelector("a").href=PD.G(q)}
function bind(mk,t,d,q){mk.bindPopup(pop(t,d,q),{className:"lglass",maxWidth:240,minWidth:180,autoPanPaddingTopLeft:[12,124],autoPanPaddingBottomRight:[64,64]});mk.on("click",function(){show(t,d,q)})}
/* ===== tratti a piedi lungo le strade (percorsi pedonali OpenStreetMap, con memoria locale) ===== */
var RC=(function(){try{return JSON.parse(localStorage.getItem("via-rc")||"{}")||{}}catch(e){return{}}})(),RQ=[],RB=0,RURL="https://routing.openstreetmap.de/routed-foot/route/v1/foot/";
function rcSave(){try{var k=Object.keys(RC);if(k.length>70){k.slice(0,k.length-70).forEach(function(x){delete RC[x]})}localStorage.setItem("via-rc",JSON.stringify(RC))}catch(e){}}
function rkey(pts){return pts.map(function(q){return q[0].toFixed(5)+","+q[1].toFixed(5)}).join(";")}
function hv(a,b){var R=6371000,r=Math.PI/180,dl=(b[0]-a[0])*r,dg=(b[1]-a[1])*r,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dg/2)*Math.sin(dg/2);return 2*R*Math.asin(Math.sqrt(x))}
function snapWalk(ch,pl,halo,done){var pts=ch.p.map(function(q){return[q[0],q[1]]});if(pts.length<2)return;
var len=0;for(var i=1;i<pts.length;i++)len+=hv(pts[i-1],pts[i]);if(len<40)return;
if(pts.length>20){var st=(pts.length-1)/19,np=[];for(i=0;i<20;i++)np.push(pts[Math.round(i*st)]);pts=np}
var k=rkey(pts),hit=RC[k];if(hit){apply(hit);return}
RQ.push({k:k,pts:pts,len:len,apply:apply});pump();
function apply(g){try{pl.setLatLngs(g);halo.setLatLngs(g);done&&done()}catch(e){}}}
function pump(){if(RB>=2||!RQ.length)return;var j=RQ.shift();RB++;
var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},9000);
fetch(RURL+j.pts.map(function(q){return q[1].toFixed(5)+","+q[0].toFixed(5)}).join(";")+"?overview=full&geometries=geojson",ctl?{signal:ctl.signal}:{}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
var rt=d&&d.routes&&d.routes[0];if(!rt||!rt.geometry||!rt.geometry.coordinates||rt.geometry.coordinates.length<2)throw 0;
if(rt.distance>j.len*3+300)throw 0;var g=rt.geometry.coordinates.map(function(c){return[+c[1].toFixed(5),+c[0].toFixed(5)]});
RC[j.k]=g;rcSave();j.apply(g)}).catch(function(){}).then(function(){clearTimeout(tm);RB--;pump()})}
function draw(){try{draw0()}catch(e){console.error("draw",e&&e.stack)}}
function vq(v){return PAR.vq(v)}
function draw0(){var P=PAR.plan,c=PAR.cfg,T=PAR.trip;if(!map||!P)return;var multi=!!(T&&T.multi),H=multi?PAR.home():null,ends=P.kind==="single"||P.kind==="first"||P.kind==="last";
[gRoute,gStops,gFood,gPh].forEach(function(g){if(g)g.clearLayers()});lines=[];
var used={},all=[];function add(g){chunks(g).forEach(function(ch){all.push(ch);if(!used[ch.k])used[ch.k]=ch})}
if(P.kind==="single"||P.kind==="first")add(PD.ARR[c.to]);P.items.forEach(function(it){if((it.k==="act"||it.k==="free"||it.k==="night"||(it.k==="home"&&it.arr))&&it.leg)add(it.leg.g);if(it.k==="ret")add(it.ret.g)});
var d=dark(),stn={};
all.forEach(function(ch){var walk=ch.k==="walk",col=walk?getComputedStyle(document.documentElement).getPropertyValue("--c4").trim()||"#5468d8":ch.c;
var ll=ch.p.map(function(q){return[q[0],q[1]]});var halo=L.polyline(ll,{color:d?"#060d20":"#ffffff",weight:walk?7:9,opacity:.75,interactive:false}).addTo(gRoute);
var pl=L.polyline(ll,{color:col,weight:walk?4:6,opacity:.95,dashArray:walk||ch.dash?"1 10":null,lineCap:"round",lineJoin:"round"}).addTo(gRoute);
var a=ch.p[0],b=ch.p[ch.p.length-1],tt=walk?"A piedi":ch.n+(a[2]&&b[2]?" · "+a[2]+" → "+b[2]:"");
pl.bindTooltip("<b>"+esc(walk?"A piedi":ch.n)+"</b>"+(walk?"":"<br>"+esc((a[2]||"")+" → "+(b[2]||""))),{sticky:true,className:"ltip"});pl.on("click",function(e){pl.openTooltip(e.latlng);show(walk?"A piedi":ch.n,walk?(ch.snapped?"Percorso a piedi lungo le strade (dati OpenStreetMap).":"Tratto a piedi (indicativo)."):(a[2]||"")+" → "+(b[2]||"")+" (tracciato indicativo).")});
lines.push({pl:pl,halo:halo,walk:walk,k:ch.k});if(walk)snapWalk(ch,pl,halo,function(){ch.snapped=1});
if(!walk)ch.p.forEach(function(s){if(s[2]&&!stn[s[2]])stn[s[2]]=s})});
Object.keys(stn).forEach(function(n){var s=stn[n],key=s[3]||0,m=L.circleMarker([s[0],s[1]],{radius:key?5:3.5,color:d?"#eef0ff":"#0f1430",weight:2,fillColor:d?"#141832":"#ffffff",fillOpacity:1}).addTo(gRoute);
m.bindTooltip(n,{permanent:key>=1,direction:"right",offset:[6,0],className:"lst"+(key===2?" key":"")});if(!key)m.on("click",function(){m.openTooltip()})});
var A=P.A,Rr=P.R||A;function apm(X){var am=L.marker(X.pos,{icon:icon("lap","✈️",30),zIndexOffset:900,title:"Aeroporto di "+X.n}).addTo(gStops);bind(am,"Aeroporto di "+X.n,X.arr,X.gm)}
if(P.kind==="single"||P.kind==="first")apm(A);if((P.kind==="single"&&Rr!==A)||P.kind==="last")apm(Rr);
if(multi){var hm=L.marker(H.pos,{icon:icon("lap lhm","🏨",32),zIndexOffset:950,title:"Alloggio"}).addTo(gStops);bind(hm,"🏨 "+H.name,"Zona "+H.zn+". Check-in dalle "+H.cin+", check-out entro le "+H.cout+"."+(H.geo?"":" Posizione indicativa."),H.q)}
P.items.forEach(function(it){if(it.k!=="act")return;var s=PD.STOPS[it.id],mk=L.marker(s.pos,{icon:icon("lpin",it.n,30),zIndexOffset:1000,title:"Tappa "+it.n}).addTo(gStops);bind(mk,it.n+" · "+PAR.fmt(it.t)+" · "+s.t,s.d,s.q)});
var wd=PAR.wd(),seen={};
P.items.forEach(function(it){var ids,L0;if(it.k==="meal"){if(it.hotel)return;ids=PAR.mealIds(it.m,it.z)||[];L0={col:"C",pra:"P",cen:"D"}[it.m]}else if(it.k==="snk"){ids=PD.MEAL.snk[it.z]||[];L0="S"}else return;
PAR.vSorted(ids,wd,it.t).forEach(function(o){if(seen[o.id])return;seen[o.id]=1;var v=o.v,q=vq(v),mk=L.marker(v.pos,{icon:icon("lfd",L0,24),zIndexOffset:500});bind(mk,v.n+" · "+v.r+" ★",(o.s.c==="ok"?"✓ ":"⚠️ ")+o.s.t+". "+v.d,q);mk.addTo(gFood)})});
var snkSeen={};P.items.filter(function(x){return x.k==="act"}).forEach(function(x){(PD.MEAL.snk[PD.STOPS[x.id].z]||[]).forEach(function(id){if(seen[id]||snkSeen[id])return;snkSeen[id]=1;var v=PD.V[id],q=vq(v),st=PAR.vSorted([id],wd,x.t)[0].s,mk=L.marker(v.pos,{icon:icon("lfd","S",22),zIndexOffset:450});bind(mk,v.n+" · "+v.r+" ★",(st.c==="ok"?"✓ ":"⚠️ ")+st.t+". "+v.d,q);mk.addTo(gFood)})});
PD.PH.forEach(function(p){var mk=L.marker(p[4],{icon:icon("lph",p[0],28),zIndexOffset:600});bind(mk,p[0]+" "+p[1],p[2]+": "+p[3],p[5]);mk.addTo(gPh)});
var b=L.latLngBounds([multi?H.pos:PD.START]);P.items.forEach(function(it){if(it.k==="act")b.extend(PD.STOPS[it.id].pos)});if(!P.acts.length)b.extend(multi?PD.START:[48.8584,2.2945]);bnds=b;
map.fitBounds(b,{paddingTopLeft:[16,24],paddingBottomRight:[48,24],maxZoom:15});
legend(used);sync();
if(document.getElementById("t-mappa").checked)setTimeout(anim,250)}
function legend(used){var h=Object.keys(used).map(function(k){var u=used[k];return '<span><i style="border-color:'+(k==="walk"?"var(--c4)":u.c)+(k==="walk"?";border-top-style:dotted":"")+'"></i>'+esc(k==="walk"?"A piedi":u.n)+'</span>'}).join("");
lgp.innerHTML=h+'<span>Numeri: le tappe in ordine. ✈️ aeroporto'+(PAR.trip&&PAR.trip.multi?", 🏨 alloggio":"")+'.</span><span><i style="border-color:var(--food)"></i>Locali: C colazione, P pranzo, D cena, S spuntini</span><span>💧 Fontanelle: '+(PD.WATER==="paris"?"dati aperti del Comune di Parigi":"dati di OpenStreetMap")+'.</span><span>Tracciati indicativi. Tocca punti e linee per i dettagli.</span>'}
function sync(){if(!map)return;function t(btn,g){if(btn.getAttribute("aria-checked")==="true")g.addTo(map);else g.remove()}t(tg,gFood);t(tp,gPh);t(tw,gWater);if(tw.getAttribute("aria-checked")==="true")water()}
[tg,tp,tw].forEach(function(b){b.addEventListener("click",function(){b.setAttribute("aria-checked",b.getAttribute("aria-checked")!=="true");sync()})});
function water(){if(waterLoaded||!map||!window.fetch)return;waterLoaded=true;var P=PAR.plan,T=PAR.trip,pts=[T&&T.multi?PAR.home().pos:PD.START];P.items.forEach(function(it){if(it.k==="act")pts.push(PD.STOPS[it.id].pos)});
var cache=PAR.lj("via-water",null);if(cache&&cache.t>Date.now()-7*864e5&&cache.k===pts.join("|")){paint(cache.r);return}
show("💧 Fontanelle","Cerco le fontanelle vicine al percorso…");
if(PD.WATER!=="paris"){var qs="[out:json][timeout:20];("+pts.map(function(p){return 'node["amenity"="drinking_water"](around:550,'+p[0]+','+p[1]+');'}).join("")+");out body 120;";
fetch("https://overpass-api.de/api/interpreter",{method:"POST",body:"data="+encodeURIComponent(qs),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){var out=[],seen={};(j.elements||[]).forEach(function(e){var k=e.lat.toFixed(5)+","+e.lon.toFixed(5);if(seen[k])return;seen[k]=1;var tg=e.tags||{};if(/^(no|disused)$/i.test(tg.drinking_water||"")||tg["disused:amenity"])return;out.push([e.lat,e.lon,tg.name||"fontanella",tg.description||"",tg.check_date?"Verificata il "+tg.check_date:""])});
PAR.ls("via-water",JSON.stringify({t:Date.now(),k:pts.join("|"),r:out}));paint(out);show("💧 Fontanelle",out.length?out.length+" fontanelle vicino alle tappe, dai dati di OpenStreetMap: qualcuna potrebbe essere spenta.":"Nessuna fontanella segnata su OpenStreetMap vicino alle tappe.")}).catch(function(){show("💧 Fontanelle","Non riesco a leggere i dati di OpenStreetMap in questo momento. Riprova tra poco.");waterLoaded=false});return}
Promise.all(pts.map(function(p){var u="https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=40&where="+encodeURIComponent("within_distance(geo_point_2d, geom'POINT("+p[1]+" "+p[0]+")', 550m)");
return fetch(u).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){return(j.results||[]).map(function(x){var g=x.geo_point_2d||{};return{lat:g.lat,lon:g.lon,f:x}})}).catch(function(){
return fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=fontaines-a-boire&rows=40&geofilter.distance="+p[0]+","+p[1]+",550").then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){return(j.records||[]).map(function(x){var c=(x.geometry||{}).coordinates||[];return{lat:c[1],lon:c[0],f:x.fields||{}}})}).catch(function(){return null})})})).then(function(res){
if(res.every(function(x){return x===null})){show("💧 Fontanelle","Non riesco a leggere i dati del Comune di Parigi in questo momento. Cerca le fontane Wallace verdi lungo il percorso.");waterLoaded=false;return}
var out=[],seen={};res.forEach(function(a){(a||[]).forEach(function(w){if(w.lat==null)return;var k=w.lat.toFixed(5)+","+w.lon.toFixed(5);if(seen[k])return;seen[k]=1;var f=w.f,st=String(f.dispo||f.statut_obj||f.statut||"");if(/^(non|hors|indispon|ferm)/i.test(st))return;
out.push([w.lat,w.lon,String(f.type_objet||"Fontanella").replace(/_/g," ").toLowerCase(),String(f.modele||""),[f.no_voirie_pair||f.no_voirie_impair||"",f.voie||""].join(" ").trim()])})});
PAR.ls("via-water",JSON.stringify({t:Date.now(),k:pts.join("|"),r:out}));paint(out);show("💧 Fontanelle",out.length+" fontanelle segnalate come attive vicino alle tappe. Fonte: dati aperti del Comune di Parigi.")})}
function paint(r){gWater.clearLayers();r.forEach(function(w){var t=PAR.cap(w[2])+(w[3]?" · "+w[3]:""),q=w[0]+","+w[1],mk=L.marker([w[0],w[1]],{icon:icon("lwt","💧",20),zIndexOffset:300});
mk.bindPopup('<div class="lpop"><b>'+esc(t)+'</b><p>'+esc(w[4]||"Acqua potabile")+'</p><div class="lpa"><a class="go sm" target="_blank" rel="noopener" href="'+esc(PAR.gdir(q))+'">↗︎ Portami lì</a></div></div>',{className:"lglass",maxWidth:220});mk.addTo(gWater)})}
function setTiles(){if(!map)return;if(tiles)map.removeLayer(tiles);tiles=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,keepBuffer:1,updateWhenZooming:false,attribution:'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',crossOrigin:true}).addTo(map);el.classList.toggle("dk",dark());tiles.on("tileload",function(){if(!ok){ok=true;off.hidden=true}})}
function restyle(){var d=dark();lines.forEach(function(o){o.halo.setStyle({color:d?"#060d20":"#ffffff"})});el.classList.toggle("dk",d)}
function anim(){if(!map||matchMedia("(prefers-reduced-motion: reduce)").matches)return;lines.forEach(function(o,i){var p=o.pl._path;if(!p||!p.animate)return;var dl=150+i*120;
if(o.walk){p.animate([{opacity:0},{opacity:1}],{duration:500,delay:dl,fill:"backwards"});return}
var len=p.getTotalLength();p.style.strokeDasharray=len+" "+len;var a=p.animate([{strokeDashoffset:len},{strokeDashoffset:0}],{duration:700,delay:dl,fill:"backwards",easing:"cubic-bezier(.5,0,.3,1)"});a.onfinish=function(){p.style.strokeDasharray=""}})}
/* ===== la mia posizione in tempo reale (resta sul telefono, non viene salvata né inviata) ===== */
function locInit(){
var b=document.getElementById("loc");if(!b)return;
if(!navigator.geolocation){b.hidden=true;return}
var wid=null,want=false,follow=false,far=false,fix=null,mk=null,ac=null,trail=[],trl=null,rtl=null,hdg=null,cmpOK=false,cmpOn=false,first=true,tm=0,lastMove=0,dragAt=0,gMe=L.layerGroup().addTo(map),tabs=document.querySelectorAll(".tabr"),mt=document.getElementById("t-mappa"),IDLE=30*60*1000;
function state(){return !want?"off":fix?"on":"search"}
function paintBtn(){var s=state();b.classList.toggle("on",s!=="off");b.classList.toggle("fol",s==="on"&&follow);b.classList.toggle("srch",s==="search");b.setAttribute("aria-pressed",s!=="off"?"true":"false");
b.setAttribute("aria-label",s==="off"?"Mostra la mia posizione":s==="search"?"Cerco la tua posizione: tocca per annullare":follow||far?"Nascondi la mia posizione":"Torna alla mia posizione")}
function running(){return want&&!document.hidden&&!!mt&&mt.checked}
function onOri(e){var h=e.webkitCompassHeading!=null?e.webkitCompassHeading:(e.absolute&&e.alpha!=null?360-e.alpha:null);if(h==null||!isFinite(h))return;h=Math.round((h+360)%360);if(hdg!=null&&Math.abs(((h-hdg+540)%360)-180)<6)return;hdg=h;var el=mk&&mk.getElement();if(el){el.classList.add("hd");el.style.setProperty("--hd",hdg+"deg")}}
var oriEv="ondeviceorientationabsolute" in window?"deviceorientationabsolute":"deviceorientation";
function cmp(on){if(on&&!cmpOn){cmpOn=true;addEventListener(oriEv,onOri,true)}else if(!on&&cmpOn){cmpOn=false;removeEventListener(oriEv,onOri,true)}}
function sync(){cmp(running()&&cmpOK);if(running()){if(wid==null)try{wid=navigator.geolocation.watchPosition(ok,err,{enableHighAccuracy:true,maximumAge:4000,timeout:25000})}catch(e){wid=null}}
else if(wid!=null){try{navigator.geolocation.clearWatch(wid)}catch(e){}wid=null}}
function clear(){gMe.clearLayers();mk=null;ac=null;fix=null;trail=[];trl=null;rtl=null;hdg=null}
function locOff(msg){want=false;follow=false;far=false;first=true;clearTimeout(tm);sync();clear();paintBtn();if(msg)show("La mia posizione",msg)}
function arm(){clearTimeout(tm);tm=setTimeout(function(){locOff("Ho spento la posizione per risparmiare batteria. Tocca di nuovo il pulsante per riattivarla.")},IDLE)}
function near(){var P=PAR.plan,T=PAR.trip,best=null;if(!P||!fix)return null;
function c(n,pos,q){var d=hv(fix,pos);if(!best||d<best.d)best={n:n,d:d,q:q,pos:pos}}
P.items.forEach(function(it){if(it.k==="act"){var x=PD.STOPS[it.id];if(x)c(it.n+" · "+x.t,x.pos,x.q)}});
if(T&&T.multi){var H=PAR.home();if(H&&H.pos)c("l'alloggio",H.pos,H.q)}return best}
function infoNear(n,acc){show("Sei qui","Il punto più vicino dell'itinerario è «"+n.n+"», a "+dist(n.d)+(acc>60?" (posizione approssimata, ±"+Math.round(acc)+" m)":"")+".",n.q);
var bt=document.createElement("button");bt.type="button";bt.className="go sm lrt";bt.textContent="🚶 Percorso a piedi fin lì";info.appendChild(bt);bt.addEventListener("click",function(){walkTo(n,bt)})}
function walkTo(n,bt){if(!fix)return;var a=fix.slice(),b=n.pos;bt.disabled=true;bt.textContent="Calcolo il percorso…";
function draw(g,txt,dash){if(rtl)gMe.removeLayer(rtl);rtl=L.polyline(g,{color:"#2f7df6",weight:5,opacity:.9,dashArray:dash?"2 10":null,lineCap:"round",interactive:false}).addTo(gMe);try{map.fitBounds(rtl.getBounds(),{paddingTopLeft:[24,70],paddingBottomRight:[64,40],maxZoom:17})}catch(e){}follow=false;paintBtn();bt.disabled=false;bt.textContent="🚶 "+txt+" · aggiorna"}
function fall(){var d=hv(a,b)*1.3;draw([a,b],"circa "+Math.max(1,Math.round(d/75))+" min a piedi, in linea d'aria",1)}
var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){ctl&&ctl.abort()},9000);
fetch(RURL+a[1].toFixed(5)+","+a[0].toFixed(5)+";"+b[1].toFixed(5)+","+b[0].toFixed(5)+"?overview=full&geometries=geojson",ctl?{signal:ctl.signal}:{}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var rt=d&&d.routes&&d.routes[0];if(!rt||!rt.geometry||rt.geometry.coordinates.length<2)throw 0;clearTimeout(t);
var g=rt.geometry.coordinates.map(function(c){return[c[1],c[0]]}),m=Math.max(1,Math.round(rt.distance/75));draw(g,m+" min a piedi, "+dist(rt.distance))}).catch(function(){clearTimeout(t);fall()})}
function dist(m){return m<950?Math.max(10,Math.round(m/10)*10)+" m":(m/1000).toFixed(m<10000?1:0).replace(".",",")+" km"}
function ok(p){var cc=p.coords,now=Date.now(),ll=[cc.latitude,cc.longitude];
if(!isFinite(ll[0])||!isFinite(ll[1]))return;
if(fix&&hv(fix,ll)<3&&Math.abs((ac?ac.getRadius():0)-cc.accuracy)<8)return;
if(!fix||hv(fix,ll)>50)lastMove=now,arm();
var wasFix=!!fix;fix=ll;
if(!mk){var ic=L.divIcon({className:"lme",html:"<i></i><u></u><b></b>",iconSize:[22,22],iconAnchor:[11,11]});
ac=L.circle(ll,{radius:Math.min(cc.accuracy||30,2000),color:"#2f7df6",weight:1,opacity:.5,fillColor:"#2f7df6",fillOpacity:.12,interactive:false}).addTo(gMe);
mk=L.marker(ll,{icon:ic,interactive:false,keyboard:false,zIndexOffset:2000,title:"La mia posizione"}).addTo(gMe)}
else{mk.setLatLng(ll);ac.setLatLng(ll);ac.setRadius(Math.min(cc.accuracy||30,2000))}
var last=trail[trail.length-1];if((cc.accuracy||999)<70&&(!last||hv(last,ll)>=15)){trail.push(ll);if(trail.length>600)trail.shift();if(!trl)trl=L.polyline(trail,{color:"#2f7df6",weight:4,opacity:.65,dashArray:"1 9",lineCap:"round",interactive:false}).addTo(gMe);else trl.setLatLngs(trail)}
var el=mk.getElement();if(el&&hdg==null){var h=cc.heading,mv=h!=null&&isFinite(h)&&(cc.speed||0)>0.8;el.classList.toggle("hd",mv);if(mv)el.style.setProperty("--hd",Math.round(h)+"deg")}
if(!wasFix||first){first=false;var d=hv(ll,PD.LL);far=d>40000;
if(far){follow=false;show("La mia posizione","Sei a circa "+Math.round(d/1000)+" km da "+PD.n+": il punto blu è fuori dalla mappa della città. Tocca di nuovo il pulsante per nasconderlo.")}
else{follow=true;try{map.flyTo(ll,Math.max(map.getZoom(),16),{duration:.9})}catch(e){}var n=near();if(n)infoNear(n,cc.accuracy);else show("Sei qui","Il punto blu è la tua posizione in tempo reale.")}
paintBtn();return}
if(follow&&now-dragAt>4000)try{map.panTo(ll,{animate:true,duration:.6,easeLinearity:.5})}catch(e){}
paintBtn()}
var errAt=0;
function err(e){var now=Date.now();if(e&&e.code===1){locOff("Posizione non consentita. Per usarla attiva la localizzazione per Viaticum dalle impostazioni del telefono o del browser, poi riprova.");return}
if(fix||now-errAt<20000)return;errAt=now;show("La mia posizione",e&&e.code===3?"Non riesco ancora a trovarti: se sei al chiuso prova vicino a una finestra. Continuo a cercare.":"Posizione non disponibile al momento: serve segnale GPS o rete. Continuo a cercare.")}
b.addEventListener("click",function(){var s=state();
if(s==="off"){try{var DO=window.DeviceOrientationEvent;if(DO&&DO.requestPermission)DO.requestPermission().then(function(r){cmpOK=r==="granted";sync()}).catch(function(){});else cmpOK=!!DO}catch(e){}want=true;follow=false;far=false;first=true;errAt=0;paintBtn();show("La mia posizione","Cerco la tua posizione… La posizione resta sul telefono e viene usata solo mentre guardi la mappa.");arm();sync()}
else if(s==="on"&&!follow&&!far&&fix){follow=true;dragAt=0;try{map.flyTo(fix,Math.max(map.getZoom(),16),{duration:.6})}catch(e){}paintBtn();arm()}
else locOff()});
map.on("dragstart",function(){dragAt=Date.now();if(follow){follow=false;paintBtn()}arm&&want&&arm()});
document.addEventListener("visibilitychange",sync);
[].forEach.call(tabs,function(t){t.addEventListener("change",sync)});
addEventListener("pagehide",function(){if(wid!=null)try{navigator.geolocation.clearWatch(wid)}catch(e){}wid=null});
paintBtn()}
function init(){if(!window.L){off.textContent="La mappa non si è caricata: serve una connessione. Riprova quando sei online.";return}
el.hidden=false;map=L.map(el,{zoomControl:false,attributionControl:true,zoomSnap:.25});
var coarse=false;try{coarse=matchMedia("(pointer:coarse)").matches}catch(e){}
if(coarse){map.dragging.disable();var hint=document.createElement("div");hint.className="maphint";hint.setAttribute("aria-hidden","true");hint.textContent="Due dita per muovere la mappa";el.parentNode.appendChild(hint);var hT=0,seen=false;
el.addEventListener("touchmove",function(e){if(e.touches.length!==1||map.dragging.enabled()||seen)return;seen=true;hint.classList.add("on");clearTimeout(hT);hT=setTimeout(function(){hint.classList.remove("on");seen=false},1800)},{passive:true})}
window.__mapCoarse=function(on){if(!coarse)return;if(on)map.dragging.enable();else map.dragging.disable()};
gRoute=L.layerGroup().addTo(map);gStops=L.layerGroup().addTo(map);gFood=L.layerGroup();gPh=L.layerGroup();gWater=L.layerGroup();
setTiles();map.setView(PD.LL,13);
map.on("zoomend",function(){el.classList.toggle("far",map.getZoom()<13.5)});
var dcT=0;function declutter(){var els=[].slice.call(el.querySelectorAll(".leaflet-tooltip.lst"));els.forEach(function(t){t.style.visibility=""});var kept=[];els.sort(function(a,b){return (b.classList.contains("key")?1:0)-(a.classList.contains("key")?1:0)}).forEach(function(t){if(getComputedStyle(t).display==="none")return;var r=t.getBoundingClientRect();for(var i=0;i<kept.length;i++){var k=kept[i];if(r.left<k.right+3&&r.right>k.left-3&&r.top<k.bottom+2&&r.bottom>k.top-2){t.style.visibility="hidden";return}}kept.push(r)})}
function soon(){clearTimeout(dcT);dcT=setTimeout(function(){requestAnimationFrame(declutter)},120)}
map.on("zoomend moveend layeradd layerremove",soon);soon();
document.querySelector(".mc-tr").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
if(b.id==="zi")map.zoomIn();else if(b.id==="zo")map.zoomOut();else if(b.id==="zr"&&bnds)map.flyToBounds(bnds,{paddingTopLeft:[16,24],paddingBottomRight:[48,24],maxZoom:15,duration:.8});else if(b.id==="fs"){setTimeout(function(){map.invalidateSize()},350);setTimeout(function(){map.invalidateSize()},800)}});
var dm=document.getElementById("dm");if(dm)dm.addEventListener("change",function(){setTimeout(function(){restyle();draw()},50)});try{mq.addEventListener("change",function(){restyle();draw()})}catch(e){}
var tab=document.getElementById("t-mappa");tab.addEventListener("change",function(){if(tab.checked)setTimeout(function(){map.invalidateSize();if(bnds)map.fitBounds(bnds,{paddingTopLeft:[16,24],paddingBottomRight:[48,24],maxZoom:15});anim()},150)});
var legHL=null;window.__mapLeg=function(pts){if(!pts||pts.length<2)return;if(!tab.checked){tab.checked=true;tab.dispatchEvent(new Event("change",{bubbles:true}))}
setTimeout(function(){map.invalidateSize();if(legHL)map.removeLayer(legHL);legHL=L.polyline(pts,{color:"#2f7df6",weight:7,opacity:.9,dashArray:"2 12",lineCap:"round",interactive:false}).addTo(map);
try{map.flyToBounds(legHL.getBounds(),{paddingTopLeft:[40,90],paddingBottomRight:[70,60],maxZoom:17,duration:.8})}catch(e){}setTimeout(function(){if(legHL)try{map.fitBounds(legHL.getBounds(),{paddingTopLeft:[40,90],paddingBottomRight:[70,60],maxZoom:17})}catch(e){console.error(e)}},900);setTimeout(function(){if(legHL){map.removeLayer(legHL);legHL=null}},15000)},420)};
PAR.on(function(){waterLoaded=false;gWater.clearLayers();draw()});draw();if(tab.checked)setTimeout(function(){map.invalidateSize();if(bnds)map.fitBounds(bnds,{paddingTopLeft:[16,24],paddingBottomRight:[48,24],maxZoom:15});anim()},150);try{locInit()}catch(e){console.error("loc",e&&e.stack)}
setTimeout(function(){if(!ok&&!navigator.onLine)off.textContent="Sei offline: la mappa mostra solo le zone già viste."},5000)}
function load(){var sc=document.createElement("script");sc.src="lib/leaflet.js";sc.onload=init;sc.onerror=function(){off.textContent="La mappa non si è caricata: serve una connessione."};document.head.appendChild(sc)}
/* la mappa si prepara solo quando serve (o a riposo, molto dopo l'intro): non pesa sull'avvio */
var started=false,mtab=document.getElementById("t-mappa");function start(){if(started)return;started=true;load()}
mtab.addEventListener("change",function(){if(mtab.checked)start()});
if(mtab.checked)start();else addEventListener("load",function(){setTimeout(function(){if(window.requestIdleCallback)requestIdleCallback(start,{timeout:5000});else setTimeout(start,1500)},7000)});
/* legenda e schermo intero */
var lg=document.getElementById("lg");
lg.addEventListener("click",function(e){e.stopPropagation();var open=lgp.hidden;lgp.hidden=!open;lg.setAttribute("aria-expanded",open)});
document.addEventListener("click",function(e){if(!lgp.hidden&&!lgp.contains(e.target)&&e.target!==lg){lgp.hidden=true;lg.setAttribute("aria-expanded",false)}});
var fsb=document.getElementById("fs"),box=document.getElementById("mapbox"),ph=document.createComment("map"),isFs=false;
function setFs(on){if(on===isFs)return;isFs=on;if(on){box.parentNode.insertBefore(ph,box);document.body.appendChild(box)}else{ph.parentNode.insertBefore(box,ph);ph.parentNode.removeChild(ph)}
if(window.__mapCoarse)__mapCoarse(on);box.classList.toggle("fs",on);document.body.classList.toggle("fsmap",on);fsb.classList.toggle("on",on);fsb.setAttribute("aria-label",on?"Esci da schermo intero":"Schermo intero")}
fsb.addEventListener("click",function(){setFs(!isFs)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&isFs)setFs(false)});
/* foto, mezzi in ordine, percorsi in Google Maps */
function side(){var P=PAR.plan,c=PAR.cfg,T=PAR.trip;if(!P||!T)return;var multi=T.multi,H=multi?PAR.home():null,inDay={};
T.days.forEach(function(d,i){d.acts.forEach(function(a){if(inDay[a]==null)inDay[a]=i})});
document.getElementById("shots").innerHTML='<summary>📸 Migliori scatti e selfie <small>'+PD.PH.length+' punti</small></summary><ul>'+PD.PH.map(function(p){var di=inDay[p[6]];return '<li><span class="shi">'+p[0]+'</span><div><b>'+esc(p[1])+'</b> <em>'+esc(p[2])+'</em><p>'+esc(p[3])+'</p><small>'+esc(PD.STOPS[p[6]].t)+(di==null?" · fuori dal tuo percorso":multi?" · giorno "+(di+1):"")+'</small> <a class="go sm" href="'+esc(PAR.gdir(p[5]))+'" target="_blank" rel="noopener">↗︎ Portami lì</a></div></li>'}).join("")+'</ul><p class="meta">Attiva «Foto» sulla mappa per vederli. I punti sono indicativi.</p>';
function lc(t){return t.charAt(0).toLowerCase()+t.slice(1)}
var parts=[],nodes=[];
function node(q,t,m){var l=nodes[nodes.length-1];if(l&&l.q===q)return;nodes.push({q:q,t:t,m:m})}
if(P.kind==="single")node(PD.hub.q,PD.hub.n);
else if(P.kind==="first")node(P.A.gm,"Aeroporto di "+P.A.n);
else node(H.q,"Alloggio");
P.items.forEach(function(it){
if(it.k==="air"){parts.push(P.A.rt||P.A.arr.split(".")[0]+".")}
else if(it.k==="home"&&it.arr){parts.push("Verso l'alloggio: "+lc(it.leg.txt));node(H.q,"Alloggio","transit")}
else if(it.k==="act"){var s=PD.STOPS[it.id];parts.push("Verso "+s.t+": "+lc(it.leg.txt));node(s.q,s.t,it.leg.mode)}
else if(it.k==="free"&&it.leg){parts.push("Pausa all'alloggio: "+lc(it.leg.txt));node(H.q,"Alloggio",it.leg.mode)}
else if(it.k==="night"){parts.push("Rientro: "+lc(it.leg.txt));node(H.q,"Alloggio",it.leg.mode)}
else if(it.k==="ret"){parts.push("Ritorno: "+lc(it.ret.txt));if(it.multi&&it.ret.toHome)node(H.q,"Alloggio",it.ret.toHome.mode);else if(it.multi)node(H.q,"Alloggio");node((P.R||P.A).gm,"Aeroporto di "+(P.R||P.A).n,"transit")}});
document.getElementById("route").innerHTML=parts.length?moreHtml("<b>I mezzi in ordine"+(multi?" (giorno "+(PAR.sel+1)+")":"")+":</b> "+esc(parts.join(" "))):"";
RN=nodes;rtList()}
var RN=[];
function rtApp(){var v=null;try{v=localStorage.getItem("via-mapapp")}catch(e){}return v==="a"||v==="g"?v:(/iPhone|iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend" in document?"a":"g")}
function rtList(){var ap=rtApp(),h="";for(var i=1;i<RN.length;i++){var A=RN[i-1],B=RN[i],w=B.m==="walk",u=ap==="a"?"https://maps.apple.com/?saddr="+encodeURIComponent(A.q)+"&daddr="+encodeURIComponent(B.q)+"&dirflg="+(w?"w":"r"):"https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(A.q)+"&destination="+encodeURIComponent(B.q)+"&travelmode="+(w?"walking":"transit");h+='<li><a target="_blank" rel="noopener" href="'+u+'">'+esc(A.t+" → "+B.t)+'</a></li>'}
document.getElementById("gmroutes").innerHTML=h||'<li>Oggi nessuno spostamento da pianificare.</li>';
[].forEach.call(document.querySelectorAll("#rtp .rsw button"),function(b){var on=b.dataset.a===ap;b.classList.toggle("on",on);b.setAttribute("aria-checked",on)})}
(function(){var b=document.getElementById("rtb"),p=document.getElementById("rtp");if(!b||!p)return;
b.addEventListener("click",function(){var o=p.hidden;p.hidden=!o;b.setAttribute("aria-expanded",o);b.classList.toggle("on",o)});
[].forEach.call(p.querySelectorAll(".rsw button"),function(x){x.addEventListener("click",function(){try{localStorage.setItem("via-mapapp",x.dataset.a)}catch(e){}rtList()})})})();
PAR.on(side);side();
})();

/* ===== interfaccia: schede, barra, tema, meteo nella barra, splash ===== */
(function(){
var rs=[].slice.call(document.querySelectorAll(".tabr")),bar=document.querySelector(".tabbar"),body=document.body,cur=0,t1,t2,blks=[].slice.call(document.querySelectorAll(".blk"));
function onBlk(){var a=document.querySelector(".tabr:checked");blks.forEach(function(b){b.classList.toggle("on",a&&b.id===a.id.slice(2))})}
rs.forEach(function(r,i){if(r.checked)cur=i;r.addEventListener("change",function(){if(!r.checked)return;body.classList.remove("dir-r","dir-l");body.classList.add(i>=cur?"dir-r":"dir-l");cur=i;onBlk();
bar.classList.remove("moving");requestAnimationFrame(function(){bar.classList.add("moving")});clearTimeout(t1);t1=setTimeout(function(){bar.classList.remove("moving")},1050);setMin(false);badge(r);if(r.id==="t-mappa")setTimeout(function(){if(isMap())setMin(true)},600);requestAnimationFrame(upd)})});
/* barra che si riduce a un pulsante tondo mentre scorri */
function isMap(){var a=document.querySelector(".tabr:checked");return !!a&&a.id==="t-mappa"}
function badge(r){var l=r&&document.querySelector('label[for="'+r.id+'"] .em'),d=bar.querySelector(".tbdots");if(l&&d)d.innerHTML=l.innerHTML}
var last={},lockT=0;/* la barra delle sezioni resta sempre fissa e aperta: niente più condensazione */
function setMin(on){if(body.classList.contains("tbmin")){body.classList.remove("tbmin");bar.setAttribute("aria-label","Sezioni")}}
blks.forEach(function(b){b.addEventListener("scroll",function(){var y=Math.max(0,Math.min(b.scrollTop,b.scrollHeight-b.clientHeight)),d=y-(last[b.id]||0);last[b.id]=y;if(body.classList.contains("nomin")||Date.now()-lockT<700)return;var mn=body.classList.contains("tbmin");if(!mn&&d>4&&y>24)setMin(true);else if(mn&&y<=8&&!isMap())setMin(false)},{passive:true})});
bar.addEventListener("click",function(e){if(body.classList.contains("tbmin")){e.preventDefault();e.stopPropagation();setMin(false)}},true);
var wasMin=false;new MutationObserver(function(){var m=body.classList.contains("tbmin");if(m===wasMin)return;wasMin=m;if(!m){bar.classList.remove("opening");requestAnimationFrame(function(){bar.classList.add("opening")});clearTimeout(t2);t2=setTimeout(function(){bar.classList.remove("opening")},600)}}).observe(body,{attributes:true,attributeFilter:["class"]});
document.addEventListener("pointerdown",function(e){if(body.classList.contains("tbmin")||bar.contains(e.target))return;var a=document.querySelector(".tabr:checked"),b=a&&document.getElementById(a.id.slice(2));if(a&&(a.id==="t-mappa"||(b&&b.scrollTop>24)))setMin(true)},{passive:true});
badge(document.querySelector(".tabr:checked"));
function rOf(l){return l&&document.getElementById(l.htmlFor)}
/* tocca la sezione già aperta: torna in cima */
[].forEach.call(bar.querySelectorAll("label"),function(l){l.addEventListener("click",function(){if(body.classList.contains("tbmin"))return;var r=rOf(l);if(!r||!r.checked)return;var b=document.getElementById(r.id.slice(2));if(!b||b.scrollTop<=0)return;body.classList.add("nomin");try{b.scrollTo({top:0,behavior:"smooth"})}catch(e){b.scrollTop=0}clearTimeout(l._t);l._t=setTimeout(function(){body.classList.remove("nomin")},900)})});
/* scorri il dito sulla barra per cambiare sezione */
var on=false,moved=false;
function pick(x,y){var el=document.elementFromPoint(x,y),l=el&&el.closest&&el.closest(".tabbar label"),r=rOf(l);if(r&&!r.checked){r.checked=true;r.dispatchEvent(new Event("change",{bubbles:true}))}}
bar.addEventListener("touchstart",function(){on=!body.classList.contains("tbmin");moved=false},{passive:true});
bar.addEventListener("touchmove",function(e){if(!on||!e.touches||e.touches.length!==1)return;e.preventDefault();if(!moved){moved=true;bar.classList.add("scrub")}var t=e.touches[0];pick(t.clientX,t.clientY)},{passive:false});
function end(){on=false;if(moved)setTimeout(function(){bar.classList.remove("scrub")},250)}
bar.addEventListener("touchend",end);bar.addEventListener("touchcancel",end);
/* niente zoom della pagina: solo la mappa si ingrandisce */
function stop(e){if(!(e.target&&e.target.closest&&e.target.closest(".stage")))e.preventDefault()}
["gesturestart","gesturechange","gestureend"].forEach(function(t){document.addEventListener(t,stop,{passive:false})});
document.addEventListener("touchmove",function(e){if(e.touches&&e.touches.length>1&&!(e.target.closest&&e.target.closest(".stage")))e.preventDefault()},{passive:false});
/* tema chiaro/scuro stile iPhone */
var cb=document.getElementById("dm"),root=document.documentElement,mq=matchMedia("(prefers-color-scheme: dark)"),meta=document.querySelector('meta[name="theme-color"]');
function curD(){var t=root.getAttribute("data-theme");return t?t==="dark":mq.matches}
function sync(){cb.checked=curD();if(meta)setTimeout(function(){var v=getComputedStyle(root).getPropertyValue("--tc").trim();meta.setAttribute("content",v||(cb.checked?"#04121a":"#0388b0"))},30)}
window.addEventListener("citycolor",sync);
function themeNow(){return root.getAttribute("data-theme")||"auto"}
function paintTheme(){var c=themeNow();[].forEach.call(document.querySelectorAll(".seg3 [data-t]"),function(b){var on=b.dataset.t===c;b.setAttribute("aria-checked",on?"true":"false");b.classList.toggle("on",on)})}
function setTheme(t){if(t==="auto"){root.removeAttribute("data-theme");try{localStorage.removeItem("via-theme")}catch(e){}}else{root.setAttribute("data-theme",t);try{localStorage.setItem("via-theme",t)}catch(e){}}sync();paintTheme()}
[].forEach.call(document.querySelectorAll(".seg3 [data-t]"),function(b){b.addEventListener("click",function(){setTheme(b.dataset.t)})});paintTheme();
try{mq.addEventListener("change",function(){if(!root.getAttribute("data-theme"))sync()})}catch(e){}sync();
/* meteo attuale di Parigi nella barra in alto */
var wx=document.getElementById("wx"),wt=document.getElementById("wxt"),wi=wx.querySelector(".wxi");
function kind(c){return c===0?["☀️","sun","Sereno"]:c<=2?["🌤️","sun","Poche nubi"]:c===3?["☁️","cloud","Nuvoloso"]:c<=48?["🌫️","fog","Nebbia"]:c<=67?["🌧️","rain","Pioggia"]:c<=77?["🌨️","snow","Neve"]:c<=82?["🌦️","rain","Rovesci"]:["⛈️","storm","Temporale"]}
function paint(t,c){var k=kind(c);wi.textContent=k[0];wx.className="wx "+k[1];wt.textContent=Math.round(t)+"°";var wd=document.getElementById("wxd");if(wd)wd.textContent=k[2];wx.setAttribute("aria-label",PD.n+" ora: "+Math.round(t)+" gradi")}
try{var sv=JSON.parse(localStorage.getItem("via-wx")||"null");if(sv&&sv.city===PD.id)paint(sv.t,sv.c)}catch(e){}
function load(){if(!window.fetch)return;fetch("https://api.open-meteo.com/v1/forecast?latitude="+PD.LL[0]+"&longitude="+PD.LL[1]+"&current=temperature_2m,weather_code&timezone="+encodeURIComponent(PD.TZ)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var t=d.current.temperature_2m,c=d.current.weather_code;if(t==null)return;paint(t,c);try{localStorage.setItem("via-wx",JSON.stringify({t:t,c:c,city:PD.id}))}catch(e){}}).catch(function(){})}
var lw=Date.now();function loadW(){lw=Date.now();load()}load();setInterval(function(){if(!document.hidden)loadW()},15*60*1000);document.addEventListener("visibilitychange",function(){if(!document.hidden&&Date.now()-lw>15*60*1000)loadW()});
var tk=0;function upd(){tk=0;var a=document.querySelector(".tabr:checked"),b=a&&document.getElementById(a.id.slice(2));body.classList.toggle("scrolled",!!(b&&b.scrollTop>40))}
blks.forEach(function(b){b.addEventListener("scroll",function(){if(!tk)tk=requestAnimationFrame(upd)},{passive:true})});
/* splash a ogni apertura */
var sp=document.getElementById("splash"),hid=0,tm;function hide(){if(!sp)return;var s=sp,sh=s.querySelector(".spshr"),tg=document.getElementById("dlw"),de=document.getElementById("dest");
if(s.animate&&s.style.display!=="none"){s.style.pointerEvents="none";s.animate([{opacity:1},{opacity:0}],{duration:380,easing:"ease-out",fill:"forwards"}).onfinish=function(){s.style.display="none";try{s.getAnimations().forEach(function(x){x.cancel()})}catch(e){}};return}
s.style.display="none"}tm=setTimeout(hide,3500);
document.addEventListener("visibilitychange",function(){if(document.hidden){hid=Date.now();return}if(!sp||!hid||Date.now()-hid<120000||matchMedia("(prefers-reduced-motion: reduce)").matches)return;var n=sp.cloneNode(true);n.style.display="";sp.parentNode.replaceChild(n,sp);sp=n;clearTimeout(tm);tm=setTimeout(hide,3500)});
/* service worker per l'uso offline */
try{if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(function(r){r.update()}).catch(function(){});var _r=false;navigator.serviceWorker.addEventListener("controllerchange",function(){if(_r)return;_r=true;if(!document.getElementById("setup").classList.contains("on"))location.reload()})}}catch(e){}
})();

/* meteo in alto: tocca per aprire la finestra con le previsioni */
(function(){var wx=document.getElementById("wx");if(!wx)return;var pop=null;
wx.setAttribute("role","button");wx.setAttribute("tabindex","0");wx.setAttribute("aria-haspopup","dialog");wx.setAttribute("aria-expanded","false");
function close(){if(!pop)return;pop.classList.remove("on");wx.setAttribute("aria-expanded","false");var p=pop;pop=null;setTimeout(function(){p.remove()},180);document.removeEventListener("pointerdown",out,true);document.removeEventListener("keydown",key)}
function out(e){if(pop&&!pop.contains(e.target)&&!wx.contains(e.target))close()}
function key(e){if(e.key==="Escape")close()}
function open(){var m=document.getElementById("meteo");if(!m)return;pop=document.createElement("div");pop.className="wxp";pop.setAttribute("role","dialog");pop.setAttribute("aria-label","Previsioni meteo");
var body=document.createElement("div");body.className="wxpb meteo";body.innerHTML=m.innerHTML;var h=document.createElement("div");h.className="wxph";h.innerHTML='<b>Previsioni</b><button type="button" aria-label="Chiudi">✕</button>';h.querySelector("button").addEventListener("click",close);pop.appendChild(h);pop.appendChild(body);document.body.appendChild(pop);
requestAnimationFrame(function(){if(pop)pop.classList.add("on")});wx.setAttribute("aria-expanded","true");document.addEventListener("pointerdown",out,true);document.addEventListener("keydown",key)}
function tg(){pop?close():open()}
wx.addEventListener("click",tg);wx.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tg()}})})();

/* avvisi, voli e meteo: tre tasti sotto lo stato del viaggio, ognuno apre una finestra richiudibile */
(function(){var bar=document.getElementById("tgr"),w=document.getElementById("tgw");if(!bar||!w)return;var cur="",TT={avv:"Avvisi per il tuo viaggio",voli:"I tuoi voli",meteo:"Previsioni meteo"};
function show(p){cur=p;[].forEach.call(bar.querySelectorAll(".tg"),function(b){var on=b.dataset.p===p;b.setAttribute("aria-expanded",on?"true":"false")});
w.hidden=!p;[].forEach.call(w.querySelectorAll(".tgc"),function(c){c.hidden=c.dataset.p!==p});
if(p){document.getElementById("tgt").textContent=TT[p];w.style.animation="none";void w.offsetWidth;w.style.animation=""}}
bar.addEventListener("click",function(e){var b=e.target.closest(".tg");if(!b)return;show(cur===b.dataset.p?"":b.dataset.p);try{navigator.vibrate&&navigator.vibrate(8)}catch(x){}});
w.querySelector(".tgx").addEventListener("click",function(){show("")});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&cur)show("")});
window.__tgClose=function(){show("")};
var me=document.getElementById("meteo"),ti=document.getElementById("tgmi");function sy(){var m=me&&me.querySelector(".mi");if(m&&ti&&m.textContent)ti.textContent=m.textContent}
if(me&&window.MutationObserver)new MutationObserver(sy).observe(me,{childList:true,subtree:true,characterData:true});sy()})();

/* la finestra si dissolve in alto e in basso mentre scorre */
(function(){var bl=[].slice.call(document.querySelectorAll(".blk")),tk=0;
function fade(b){var y=b.scrollTop,mx=b.scrollHeight-b.clientHeight,t=y>4?Math.min(30,y*2):0,m=mx-y>4?Math.min(44,(mx-y)*2):0;b.style.setProperty("--mt",t+"px");b.style.setProperty("--mb",m+"px")}
bl.forEach(function(b){b.addEventListener("scroll",function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;bl.forEach(function(x){if(x.offsetParent!==null)fade(x)})})},{passive:true});fade(b)});
document.addEventListener("change",function(e){if(e.target.classList&&e.target.classList.contains("tabr"))setTimeout(function(){bl.forEach(fade)},60)});
addEventListener("resize",function(){bl.forEach(fade)});
if(window.ResizeObserver){var ro=new ResizeObserver(function(){bl.forEach(fade)});bl.forEach(function(b){ro.observe(b);if(b.firstElementChild)ro.observe(b.firstElementChild)})}})();
