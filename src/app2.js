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
var A=P.A;if(ends){var am=L.marker(A.pos,{icon:icon("lap","✈️",30),zIndexOffset:900}).addTo(gStops);bind(am,"Aeroporto di "+A.n,A.arr,A.gm)}
if(multi){var hm=L.marker(H.pos,{icon:icon("lap lhm","🏨",32),zIndexOffset:950,title:"Alloggio"}).addTo(gStops);bind(hm,"🏨 "+H.name,"Zona "+H.zn+". Check-in dalle "+H.cin+", check-out entro le "+H.cout+"."+(H.geo?"":" Posizione indicativa."),H.q)}
P.items.forEach(function(it){if(it.k!=="act")return;var s=PD.STOPS[it.id],mk=L.marker(s.pos,{icon:icon("lpin",it.n,30),zIndexOffset:1000,title:"Tappa "+it.n}).addTo(gStops);bind(mk,it.n+" · "+PAR.fmt(it.t)+" · "+s.t,s.d,s.q)});
var wd=PAR.wd(),seen={};
P.items.forEach(function(it){var ids,L0;if(it.k==="meal"){ids=PAR.mealIds(it.m,it.z)||[];L0={col:"C",pra:"P",cen:"D"}[it.m]}else if(it.k==="snk"){ids=PD.MEAL.snk[it.z]||[];L0="S"}else return;
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
function init(){if(!window.L){off.textContent="La mappa non si è caricata: serve una connessione. Riprova quando sei online.";return}
el.hidden=false;map=L.map(el,{zoomControl:false,attributionControl:true,zoomSnap:.25});
gRoute=L.layerGroup().addTo(map);gStops=L.layerGroup().addTo(map);gFood=L.layerGroup();gPh=L.layerGroup();gWater=L.layerGroup();
setTiles();map.setView(PD.LL,13);
map.on("zoomend",function(){el.classList.toggle("far",map.getZoom()<13.5)});
document.querySelector(".mc-tr").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
if(b.id==="zi")map.zoomIn();else if(b.id==="zo")map.zoomOut();else if(b.id==="zr"&&bnds)map.flyToBounds(bnds,{paddingTopLeft:[16,24],paddingBottomRight:[48,24],maxZoom:15,duration:.8});else if(b.id==="fs"){setTimeout(function(){map.invalidateSize()},350);setTimeout(function(){map.invalidateSize()},800)}});
var dm=document.getElementById("dm");if(dm)dm.addEventListener("change",function(){setTimeout(function(){restyle();draw()},50)});try{mq.addEventListener("change",function(){restyle();draw()})}catch(e){}
var tab=document.getElementById("t-mappa");tab.addEventListener("change",function(){if(tab.checked)setTimeout(function(){map.invalidateSize();if(bnds)map.fitBounds(bnds,{paddingTopLeft:[16,24],paddingBottomRight:[48,24],maxZoom:15});anim()},150)});
PAR.on(function(){waterLoaded=false;gWater.clearLayers();draw()});draw();
setTimeout(function(){if(!ok&&!navigator.onLine)off.textContent="Sei offline: la mappa mostra solo le zone già viste."},5000)}
function load(){var sc=document.createElement("script");sc.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";sc.onload=init;sc.onerror=function(){off.textContent="La mappa non si è caricata: serve una connessione."};document.head.appendChild(sc)}
if(document.readyState==="complete")load();else addEventListener("load",load);
/* legenda e schermo intero */
var lg=document.getElementById("lg");
lg.addEventListener("click",function(e){e.stopPropagation();var open=lgp.hidden;lgp.hidden=!open;lg.setAttribute("aria-expanded",open)});
document.addEventListener("click",function(e){if(!lgp.hidden&&!lgp.contains(e.target)&&e.target!==lg){lgp.hidden=true;lg.setAttribute("aria-expanded",false)}});
var fsb=document.getElementById("fs"),box=document.getElementById("mapbox"),ph=document.createComment("map"),isFs=false;
function setFs(on){if(on===isFs)return;isFs=on;if(on){box.parentNode.insertBefore(ph,box);document.body.appendChild(box)}else{ph.parentNode.insertBefore(box,ph);ph.parentNode.removeChild(ph)}
box.classList.toggle("fs",on);document.body.classList.toggle("fsmap",on);fsb.classList.toggle("on",on);fsb.setAttribute("aria-label",on?"Esci da schermo intero":"Schermo intero")}
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
else if(it.k==="ret"){parts.push("Ritorno: "+lc(it.ret.txt));if(it.multi&&it.ret.toHome)node(H.q,"Alloggio",it.ret.toHome.mode);else if(it.multi)node(H.q,"Alloggio");node(P.A.gm,"Aeroporto di "+P.A.n,"transit")}});
document.getElementById("route").innerHTML=parts.length?"<b>I mezzi in ordine"+(multi?" (giorno "+(PAR.sel+1)+")":"")+":</b> "+esc(parts.join(" ")):"";
var h="";for(var i=1;i<nodes.length;i++){h+='<li><a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(nodes[i-1].q)+'&destination='+encodeURIComponent(nodes[i].q)+'&travelmode='+(nodes[i].m==="walk"?"walking":"transit")+'">'+esc(nodes[i-1].t+" → "+nodes[i].t)+'</a></li>'}
document.getElementById("gmroutes").innerHTML=h||'<li>Oggi nessuno spostamento da pianificare.</li>'}
PAR.on(side);side();
})();

/* ===== stato live dei voli (AeroDataBox, chiave solo sul telefono) ===== */
(function(){
var HOST="aerodatabox.p.rapidapi.com",KK="via-adb-key",CK="via-vlive",UK="via-vlive-n";
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function p(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}
var key=g(KK)||g("par-adb-key")||"",C={};try{C=JSON.parse(g(CK)||"{}")||{}}catch(e){}
var box=document.getElementById("vkey"),kin=document.getElementById("vkin"),kok=document.getElementById("vkok"),kdel=document.getElementById("vkdel"),ks=document.getElementById("vks"),ref=document.getElementById("vref"),upd=document.getElementById("vupd");
var busy=false,timer;
var ST={Expected:["In orario",""],Unknown:["Nessun dato","idle"],CanceledUncertain:["Da verificare","warn"],CheckIn:["Check-in aperto",""],Boarding:["Imbarco in corso",""],GateClosed:["Gate chiuso","warn"],Departed:["Decollato",""],EnRoute:["In volo",""],Approaching:["In avvicinamento",""],Delayed:["In ritardo","warn"],Arrived:["Atterrato",""],Canceled:["Cancellato","bad"],Diverted:["Dirottato","bad"]};
function cfg(){return PAR.cfg}
function DAY(side){var c=cfg();return c?(side==="r"?(c.date_r||c.date):c.date):""}
function sides(){var c=cfg()||{},f=c.fromCode||"";return{a:{f:"a_num",dep:f,arr:c.to},r:{f:"r_num",dep:c.to,arr:f}}}
function num(side){var c=cfg()||{};return String(c[sides()[side].f]||"").replace(/\s+/g,"").toUpperCase()}
function hm(t){if(!t)return"";var x=typeof t==="string"?t:(t.local||"");var m=/[ T](\d{2}):(\d{2})/.exec(x);return m?m[1]+":"+m[2]:""}
function ut(t,legacy){var x=t&&typeof t==="object"?t.utc:legacy;if(!x)return NaN;var z=String(x).replace(" ","T");if(!/(Z|[+-]\d\d:?\d\d)$/.test(z))z+="Z";return Date.parse(z)}
function pick(list,side){if(!Array.isArray(list))list=list?[list]:[];var d=sides()[side].dep;for(var i=0;i<list.length;i++){var f=list[i];if(f&&f.departure&&f.departure.airport&&f.departure.airport.iata===d)return f}return list[0]||null}
function norm(f){if(!f)return null;var d=f.departure||{},a=f.arrival||{};
var dl=Math.round((ut(d.revisedTime,d.actualTimeUtc)-ut(d.scheduledTime,d.scheduledTimeUtc))/6e4),al=Math.round((ut(a.revisedTime,a.actualTimeUtc)-ut(a.scheduledTime,a.scheduledTimeUtc))/6e4);
return{st:f.status||"Unknown",dS:hm(d.scheduledTime||d.scheduledTimeLocal),dR:hm(d.revisedTime||d.actualTimeLocal),dW:hm(d.runwayTime),aS:hm(a.scheduledTime||a.scheduledTimeLocal),aR:hm(a.revisedTime||a.actualTimeLocal),aW:hm(a.runwayTime),dl:isFinite(dl)?dl:0,al:isFinite(al)?al:0,dT:d.terminal||"",gate:d.gate||"",desk:d.checkInDesk||"",aT:a.terminal||"",belt:a.baggageBelt||"",air:(f.airline&&f.airline.name)||"",ac:(f.aircraft&&f.aircraft.model)||"",dIata:(d.airport&&d.airport.iata)||"",aIata:(a.airport&&a.airport.iata)||"",sDep:ut(d.scheduledTime,d.scheduledTimeUtc),sArr:ut(a.scheduledTime,a.scheduledTimeUtc)}}
function esc(x){return PAR.esc(x)}
function ago(t){var m=Math.round((Date.now()-t)/6e4);return m<1?"adesso":m<60?m+" min fa":Math.round(m/60)+" h fa"}
function trow(lbl,s,r,w,dl){var now=w||r;var h=now&&now!==s?"<s>"+esc(s)+"</s>"+esc(now):esc(s||now||"—");if(dl>=5)h+='<span class="vdl">+'+dl+"′</span>";return'<div class="vrow"><span>'+lbl+"</span><b>"+h+"</b></div>"}
function ck(n,side){return n+"@"+DAY(side)}
function render(){var LIVE={};
["a","r"].forEach(function(side){var el=document.querySelector('.vlive[data-l="'+side+'"]');if(!el)return;var n=num(side),c=C[ck(n,side)];
if(!key||!n){el.hidden=true;return}el.hidden=false;
if(!c){el.className="vlive idle";el.innerHTML='<div class="vtop"><span class="vpill">In attesa</span></div><div class="verr">Tocca “Aggiorna stato” per leggere i dati del volo '+esc(n)+".</div>";return}
if(c.err){el.className="vlive idle";el.innerHTML='<div class="vtop"><span class="vpill">Non disponibile</span><span class="vag">'+ago(c.t)+'</span></div><div class="verr">'+esc(c.err)+"</div>";return}
var d=c.d,s=ST[d.st]||[d.st,""],cls=s[1];if(!cls&&d.dl>=15&&/Expected|CheckIn|Boarding|GateClosed/.test(d.st)){cls="warn";s=["In ritardo","warn"]}
LIVE[side]=d;var chips=[];if(d.dT)chips.push("Terminal "+d.dT);if(d.desk)chips.push("Check-in "+d.desk);if(d.gate)chips.push("Gate "+d.gate);if(d.aT&&side==="a")chips.push("Arrivo terminal "+d.aT);if(d.belt)chips.push("Nastro bagagli "+d.belt);
el.className="vlive "+cls;
el.innerHTML='<div class="vtop"><span class="vpill">'+esc(s[0])+'</span><span class="vag">agg. '+ago(c.t)+"</span></div>"+trow("Partenza "+(d.dIata||sides()[side].dep),d.dS,d.dR,d.dW,d.dl)+trow("Arrivo "+(d.aIata||sides()[side].arr),d.aS,d.aR,d.aW,d.al)+(chips.length?'<div class="vchips">'+chips.map(function(x){return"<i>"+esc(x)+"</i>"}).join("")+"</div>":"")+(d.air||d.ac?'<div class="vag">'+esc([d.air,d.ac].filter(Boolean).join(" · "))+"</div>":"")});
window.PARLIVE=LIVE;try{window.dispatchEvent(new Event("vlive"))}catch(e){}
var any=!!(key&&(num("a")||num("r")));ref.hidden=!any;
var ts=["a","r"].map(function(x){var c=C[ck(num(x),x)];return c&&c.t||0}),last=Math.max.apply(null,ts);
var mo=PAR.paris().d.slice(0,7),used=0;try{used=(JSON.parse(g(UK)||"{}")||{})[mo]||0}catch(e){}
upd.textContent=any&&last?"Ultimo aggiornamento "+ago(last)+(used?" · "+used+" richieste questo mese":""):"";
box.classList.toggle("on",!!key);ks.textContent=key?"Collegato ✓":"Non collegato";kdel.hidden=!key;kin.placeholder=key?"Chiave salvata •••• "+key.slice(-4):"Incolla la chiave"}
function count(){var mo=PAR.paris().d.slice(0,7),U={};try{U=JSON.parse(g(UK)||"{}")||{}}catch(e){}U[mo]=(U[mo]||0)+1;p(UK,JSON.stringify(U))}
function load(side){var n=num(side);if(!n||!DAY(side))return Promise.resolve();count();
return fetch("https://"+HOST+"/flights/number/"+encodeURIComponent(n)+"/"+DAY(side)+"?withAircraftImage=false&withLocation=false",{headers:{"x-rapidapi-key":key,"x-rapidapi-host":HOST}}).then(function(r){
if(r.status===204||r.status===404)throw"Volo "+n+" non trovato per il "+PAR.dateShort(DAY(side))+". Controlla il numero (es. FR1234): i dati compaiono di solito qualche giorno prima.";
if(r.status===401||r.status===403)throw"Chiave non valida o piano Basic non attivo su RapidAPI.";
if(r.status===429)throw"Limite gratuito del mese raggiunto. Usa i pulsanti degli aeroporti qui sotto.";
if(!r.ok)throw"Servizio non raggiungibile ("+r.status+"). Riprovo più tardi.";
return r.json()}).then(function(j){var d=norm(pick(j,side));if(!d)throw"Nessun dato per il volo "+n+".";C[ck(n,side)]={t:Date.now(),d:d}},function(e){C[ck(n,side)]={t:Date.now(),err:typeof e==="string"?e:"Connessione assente. Riprovo più tardi."}}).then(function(){p(CK,JSON.stringify(C))})}
function due(side){var n=num(side);if(!n)return false;var c=C[ck(n,side)];if(!c)return true;var age=Date.now()-c.t,today=PAR.paris().d,DAYv=DAY(side);
if(today>DAYv)return false;if(today<DAYv)return age>12*36e5;var d=c.d,now=Date.now();
if(d&&isFinite(d.sDep)&&isFinite(d.sArr)){if(/Arrived|Canceled/.test(d.st))return age>60*6e4;if(now>d.sDep-3*36e5&&now<d.sArr+36e5)return age>10*6e4;return age>60*6e4}
return age>(c.err?30:10)*6e4}
function visible(){var t=document.getElementById("t-itinerario"),v=document.getElementById("t-voli");return !document.hidden&&((t&&t.checked)||(v&&v.checked))}
function auto(force){if(!key||busy||!cfg())return;if(!force&&!visible())return;var list=["a","r"].filter(function(x){return force||due(x)});if(!list.length){render();return}
busy=true;ref.disabled=true;ref.textContent="↻ Aggiorno…";Promise.all(list.map(load)).then(function(){busy=false;ref.disabled=false;ref.textContent="↻ Aggiorna stato";render()})}
ref.addEventListener("click",function(){var ts=["a","r"].map(function(x){var c=C[ck(num(x),x)];return c&&c.t||0});if(Date.now()-Math.max.apply(null,ts)<6e4&&ts.every(Boolean)){render();return}auto(true)});
kok.addEventListener("click",function(){var v=kin.value.trim();if(!v)return;key=v;p(KK,v);kin.value="";C={};p(CK,"{}");box.open=false;render();auto(true)});
kin.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();kok.click()}});
kdel.addEventListener("click",function(){key="";p(KK,null);C={};p(CK,"{}");render()});
PAR.on(function(){key=g(KK)||"";clearTimeout(timer);timer=setTimeout(function(){render();auto(false)},800)});
document.addEventListener("visibilitychange",function(){if(!document.hidden)auto(false)});
[].forEach.call(document.querySelectorAll(".tabr"),function(r){r.addEventListener("change",function(){auto(false)})});
setInterval(function(){if(cfg()){render();auto(false)}},60000);
if(cfg()){render();setTimeout(function(){auto(false)},1500)}
})();

/* ===== interfaccia: schede, barra, tema, meteo nella barra, splash ===== */
(function(){
var rs=[].slice.call(document.querySelectorAll(".tabr")),bar=document.querySelector(".tabbar"),body=document.body,cur=0,t1,t2,blks=[].slice.call(document.querySelectorAll(".blk"));
function onBlk(){var a=document.querySelector(".tabr:checked");blks.forEach(function(b){b.classList.toggle("on",a&&b.id===a.id.slice(2))})}
rs.forEach(function(r,i){if(r.checked)cur=i;r.addEventListener("change",function(){if(!r.checked)return;body.classList.remove("dir-r","dir-l");body.classList.add(i>=cur?"dir-r":"dir-l");cur=i;onBlk();
bar.classList.remove("moving");requestAnimationFrame(function(){bar.classList.add("moving")});clearTimeout(t1);t1=setTimeout(function(){bar.classList.remove("moving")},1050);setMin(false);badge(r);if(r.id==="t-mappa")setTimeout(function(){if(isMap())setMin(true)},600);requestAnimationFrame(upd)})});
/* barra che si riduce a un pulsante tondo mentre scorri */
function isMap(){var a=document.querySelector(".tabr:checked");return !!a&&a.id==="t-mappa"}
function badge(r){var l=r&&document.querySelector('label[for="'+r.id+'"] .em'),d=bar.querySelector(".tbdots");if(l&&d)d.textContent=l.textContent}
var last={},lockT=0;function setMin(on){if(on===body.classList.contains("tbmin"))return;body.classList.toggle("tbmin",on);lockT=Date.now();bar.setAttribute("aria-label",on?"Apri le sezioni":"Sezioni")}
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
function kind(c){return c===0?["☀️","sun"]:c<=2?["🌤️","sun"]:c===3?["☁️","cloud"]:c<=48?["🌫️","fog"]:c<=67?["🌧️","rain"]:c<=77?["🌨️","snow"]:c<=82?["🌦️","rain"]:["⛈️","storm"]}
function paint(t,c){var k=kind(c);wi.textContent=k[0];wx.className="wx "+k[1];wt.textContent=Math.round(t)+"°";wx.setAttribute("aria-label",PD.n+" ora: "+Math.round(t)+" gradi")}
try{var sv=JSON.parse(localStorage.getItem("via-wx")||"null");if(sv&&sv.city===PD.id)paint(sv.t,sv.c)}catch(e){}
function load(){if(!window.fetch)return;fetch("https://api.open-meteo.com/v1/forecast?latitude="+PD.LL[0]+"&longitude="+PD.LL[1]+"&current=temperature_2m,weather_code&timezone="+encodeURIComponent(PD.TZ)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var t=d.current.temperature_2m,c=d.current.weather_code;if(t==null)return;paint(t,c);try{localStorage.setItem("via-wx",JSON.stringify({t:t,c:c,city:PD.id}))}catch(e){}}).catch(function(){})}
load();setInterval(load,15*60*1000);
var tk=0;function upd(){tk=0;var a=document.querySelector(".tabr:checked"),b=a&&document.getElementById(a.id.slice(2));body.classList.toggle("scrolled",!!(b&&b.scrollTop>40))}
blks.forEach(function(b){b.addEventListener("scroll",function(){if(!tk)tk=requestAnimationFrame(upd)},{passive:true})});
/* splash a ogni apertura */
var sp=document.getElementById("splash"),hid=0,tm;function hide(){if(sp)sp.style.display="none"}tm=setTimeout(hide,3200);
document.addEventListener("visibilitychange",function(){if(document.hidden){hid=Date.now();return}if(!sp||!hid||Date.now()-hid<5000||matchMedia("(prefers-reduced-motion: reduce)").matches)return;var n=sp.cloneNode(true);n.style.display="";sp.parentNode.replaceChild(n,sp);sp=n;clearTimeout(tm);tm=setTimeout(hide,3200)});
/* service worker per l'uso offline */
try{if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(function(r){r.update()}).catch(function(){});var _r=false;navigator.serviceWorker.addEventListener("controllerchange",function(){if(_r)return;_r=true;if(!document.getElementById("setup").classList.contains("on"))location.reload()})}}catch(e){}
})();
