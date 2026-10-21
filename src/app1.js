window.__IS_APP=location.hostname==='localhost'&&location.protocol==='https:'&&/Android/.test(navigator.userAgent);
/* ===== nucleo: configurazione, pianificazione, sezioni ===== */
(function(){
"use strict";
document.documentElement.classList.add("js");
var S=PD.STOPS,V=PD.V;
var DAYS=["lunedì","martedì","mercoledì","giovedì","venerdì","sabato","domenica"];
var DAB=["Lun","Mar","Mer","Gio","Ven","Sab","Dom"];
var MESI=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
var MAXD=10;
/* stile del viaggio: tema (mix, cul, eno) e ritmo (rel, mid, int); mix+mid è il comportamento di base */
var ST={th:"mix",pc:"mid"},THS=["mix","cul","eno"],PCS=["rel","mid","int"];
function sty(c){return{th:THS.indexOf(c&&c.th)>=0?c.th:"mix",pc:PCS.indexOf(c&&c.pc)>=0?c.pc:"mid"}}
function MD(){var d={col:30,pra:60,cen:55};if(ST.th==="eno"){d.col+=10;d.pra+=30;d.cen+=45}else if(ST.th==="cul"){d.pra-=10;d.cen-=5}
if(ST.pc==="rel"){d.col+=5;d.pra+=15;d.cen+=15}else if(ST.pc==="int"){d.col-=10;d.pra-=15;d.cen-=10}
d.col=Math.min(45,Math.max(20,d.col));d.pra=Math.min(95,Math.max(40,d.pra));d.cen=Math.min(100,Math.max(45,d.cen));return d}
var PSH={rel:{c:45,e:-15},mid:{c:0,e:0},int:{c:-30,e:30}};
function LF(){return({rel:.8,mid:1,int:1.25})[ST.pc]*({mix:1,cul:1.1,eno:.75})[ST.th]}
function pri(id){var q=S[id],v=q.p;if(ST.th==="eno"&&q.tk)v+=1.5;else if(ST.th==="cul"&&!q.tk&&q.cls==="walk")v+=1.5;return v}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}if(window.viaSync)viaSync.dirty(k)}
function lj(k,d){try{return JSON.parse(ls(k)||"null")||d}catch(e){return d}}
function esc(x){return String(x==null?"":x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function toMin(s){if(!s)return null;var m=/^(\d{1,2}):(\d{2})/.exec(s);return m?+m[1]*60+ +m[2]:null}
function fmt(x){x=Math.round(x);x=((x%1440)+1440)%1440;var h=Math.floor(x/60),m=x%60;return h+":"+(m<10?"0":"")+m}
function fdur(x){x=Math.round(x);var h=Math.floor(x/60),m=x%60;return h?(h+" h"+(m?" "+m+" min":"")):m+" min"}
function eur(x){return (Math.round(x*100)/100).toLocaleString("it-IT",{minimumFractionDigits:x%1?2:0,maximumFractionDigits:2})+" €"}
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function dateObj(d){var p=d.split("-");return new Date(Date.UTC(+p[0],+p[1]-1,+p[2],12))}
function addDays(d,k){var o=dateObj(d);o.setUTCDate(o.getUTCDate()+k);return o.toISOString().slice(0,10)}
function wdOf(d){return (dateObj(d).getUTCDay()+6)%7}
function dateLong(d){var o=dateObj(d);return DAYS[wdOf(d)]+" "+o.getUTCDate()+" "+MESI[o.getUTCMonth()]+" "+o.getUTCFullYear()}
function dateShort(d){var o=dateObj(d);return o.getUTCDate()+" "+MESI[o.getUTCMonth()]}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function paris(){var o={};new Intl.DateTimeFormat("en-CA",{timeZone:PD.TZ,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});return{d:o.year+"-"+o.month+"-"+o.day,m:(+o.hour%24)*60+ +o.minute}}
function gdir(q,mode){return "https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(q)+"&travelmode="+(mode||"walking")}
function hav(a,b){var R=6371,r=Math.PI/180,dl=(b[0]-a[0])*r,dg=(b[1]-a[1])*r,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dg/2)*Math.sin(dg/2);return 2*R*Math.asin(Math.sqrt(x))}
window.__undoToast=function(t,lab,fn){var old=document.querySelector(".utoast");if(old)old.remove();var el=document.createElement("div");el.className="utoast";el.setAttribute("role","status");el.innerHTML='<span></span><button type="button"></button>';el.firstChild.textContent=t;el.lastChild.textContent=lab;document.body.appendChild(el);var done=0;function end(){if(done)return;done=1;el.classList.remove("on");setTimeout(function(){el.remove()},250)}el.lastChild.addEventListener("click",function(){if(done)return;end();fn()});requestAnimationFrame(function(){el.classList.add("on")});setTimeout(end,7000)};
function toast(t){var el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},1800)}
/* tramonto (algoritmo NOAA semplificato), ora locale della città */
function sunset(d){var o=dateObj(d),N=Math.floor((o-Date.UTC(o.getUTCFullYear(),0,0))/864e5),lat=PD.LL[0],lng=PD.LL[1],r=Math.PI/180;
var g=2*Math.PI/365*(N-1+(18-12)/24),eq=229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g)),de=0.006918-0.399912*Math.cos(g)+0.070257*Math.sin(g)-0.006758*Math.cos(2*g)+0.000907*Math.sin(2*g)-0.002697*Math.cos(3*g)+0.00148*Math.sin(3*g);
var ha=Math.acos(Math.cos(90.833*r)/(Math.cos(lat*r)*Math.cos(de))-Math.tan(lat*r)*Math.tan(de))/r,utc=720-4*(lng-ha)-eq;
var tzs=new Date(Date.UTC(o.getUTCFullYear(),o.getUTCMonth(),o.getUTCDate(),12)).toLocaleString("en-US",{timeZone:PD.TZ,timeZoneName:"shortOffset"}),mm=/GMT([+-]\d+)(?::(\d+))?/.exec(tzs),hrs=mm?parseInt(mm[1],10)+(mm[2]?(mm[1][0]==="-"?-1:1)*mm[2]/60:0):0;return utc+hrs*60}

/* ===== configurazione ===== */
var SAVED=lj("via-trip",null);if(SAVED&&SAVED.date&&!SAVED.dest)SAVED.dest="paris";
var CFG=SAVED&&SAVED.date&&SAVED.dest===PD.id?SAVED:null;
if(CFG&&(typeof CFG!=="object"||!PD.RET[CFG.to])){if(CFG&&typeof CFG==="object"&&PD.RET&&Object.keys(PD.RET).length)CFG.to=Object.keys(PD.RET)[0];else{CFG=null;SAVED=null}}
if(CFG&&!PD.RET[CFG.rt])CFG.rt=CFG.to;
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v)}catch(e){return null}}
var PICK=ss("via-pick"),OPEN=ss("via-open"),HASHT=/^#t=/.test(location.hash);ss("via-pick",null);ss("via-open",null);
function nDays(c){if(!c||!c.date_r||c.date_r<=c.date)return 1;return Math.round((dateObj(c.date_r)-dateObj(c.date))/864e5)+1}
function fromCode(s){s=String(s||"");var m=/\(([A-Z]{3})\)/i.exec(s)||/^\s*([A-Z]{3})\s*$/i.exec(s);if(m)return m[1].toUpperCase();var low=s.toLowerCase();for(var i=0;i<PD.FROM.length;i++)if(low&&PD.FROM[i][1].toLowerCase().indexOf(low)===0)return PD.FROM[i][0];return ""}
function fromInfo(c){var f=PD.FROM.filter(function(x){return x[0]===c.fromCode})[0];return {code:c.fromCode||"",name:f?f[1]:(c.from||"Partenza"),url:f?f[2]:(c.fromCode?"https://www.flightradar24.com/data/airports/"+c.fromCode.toLowerCase():"")}}
function hzOf(id){return PD.HZ.filter(function(z){return z[0]===id})[0]||PD.HZ[0]}
/* l'alloggio (solo per i viaggi di più giorni) */
function home(){var s=(CFG&&CFG.stay)||{},z=hzOf(s.zone),geo=!!(s.pos&&s.geo),vz=z[3]||"X";
if(z[0]==="altro"&&geo){var bz=null,bd=1.3;PD.HZ.forEach(function(q){if(q[0]==="altro"||!q[3]||q[3]==="X")return;var d=hav(s.pos,q[2]);if(d<bd){bd=d;bz=q}});if(bz)vz=bz[3]}
return{pos:geo?s.pos:z[2],geo:geo,addr:s.addr||"",q:s.addr?(s.addr+(PD.ARE.test(s.addr)?"":", "+PD.QN)):(z[1].split(" / ")[0]+", "+PD.QN),name:s.addr||("Alloggio in zona "+z[1]),zn:z[1],alt:z[0]==="altro",where:z[0]==="altro"?(s.addr||"un indirizzo da indicare"):"zona "+z[1],vz:vz,cin:s.cin||"15:00",cout:s.cout||"11:00",price:+s.price||0,type:s.type||"h3"}}

/* ===== spostamenti ===== */
function posOf(id){return id==="start"?PD.START:id==="home"?home().pos:S[id].pos}
function zoneOf(id){return id==="start"?(PD.Z0||"A"):id==="home"?home().vz:S[id].z}
function estMin(pa,pb){var d=hav(pa,pb);return d<WALKD?Math.round(d*1.3/4.5*60)+3:Math.round(12+d*2.8)}
var WALKD=.95;/* oltre ~20 minuti a piedi si prende un mezzo */
function legOf(a,b){var L=PD.LEGS&&PD.LEGS[a+">"+b];if(L)return L.mode==="walk"&&L.min>20?modeFix(L,a,b):L;
if(PD.fx.leg){L=PD.fx.leg(a,b,E);if(L)return L}
var pa=posOf(a),pb=posOf(b),d=hav(pa,pb),hb=b==="home";
if(d<0.25)return{min:3,mode:"walk",txt:hb?"L'alloggio è a due passi.":"A pochi passi.",g:[{w:[pa,pb]}]};
if(d<WALKD){var w=Math.round(d*1.3/4.5*60)+3;return{min:w,mode:"walk",txt:"A piedi"+(hb?" fino all'alloggio":"")+", circa "+w+" minuti.",g:[{w:[pa,pb]}]}}
var m=Math.round(12+d*2.8);return{min:m,mode:"metro",txt:(d<2.6?"In bus, tram o metro":(PD.T.ride||"In metro"))+(hb?" fino all'alloggio":"")+", circa "+m+" minuti: Google Maps ti indica la linea migliore.",g:[{w:[pa,pb],dash:1}]}}
/* un tratto a piedi troppo lungo diventa un giro in mezzo pubblico, se conviene davvero */
function modeFix(L,a,b){var pa=posOf(a),pb=posOf(b),d=hav(pa,pb),m=Math.round(12+d*2.8);if(m>L.min-6)return L;return{min:m,mode:"metro",txt:(d<2.6?"In bus, tram o metro":(PD.T.ride||"In metro"))+(b==="home"?" fino all'alloggio":"")+", circa "+m+" minuti (a piedi ne servirebbero "+L.min+"): Google Maps ti indica la linea migliore.",g:[{w:[pa,pb],dash:1}]}}
function lc(t){return t.charAt(0).toLowerCase()+t.slice(1)}
function retOf(ap,id){var R=PD.RET[ap];if(R[id])return R[id];if(!PD.RETC||id==="start")return R.A;var l=legOf(id,"start"),A=R.A;return{min:l.min+A.min,txt:"Verso "+PD.hub.n+": "+lc(l.txt)+" Poi "+lc(A.txt),g:l.g.concat(A.g||[]),rides:l.mode==="metro"?1:0}}
function access(pos,to){var d=hav(pos,to);if(d<0.25)return{min:3,mode:"walk",d:d};if(d<WALKD)return{min:Math.round(d*1.3/4.5*60)+3,mode:"walk",d:d};return{min:Math.round(12+d*2.8),mode:"metro",d:d}}
/* dall'alloggio all'aeroporto, e dall'arrivo all'alloggio */
function homeAir(){if(PD.fx.homeAir)return PD.fx.homeAir(E);var l=legOf("home","start"),A=PD.RET[CFG.rt||CFG.to].A;return{min:l.min+A.min,txt:(l.mode==="walk"?"A piedi fino a ":(PD.T.ride||"In metro")+" fino a ")+PD.hub.n+" ("+l.min+" minuti), poi "+lc(A.txt),g:l.g.concat(A.g||[])}}
function arrLeg(){if(PD.fx.arrLeg)return PD.fx.arrLeg(E);var l=legOf("start","home");return{min:Math.max(3,l.min),mode:l.mode,txt:"Da "+PD.hub.n+": "+lc(l.txt),g:l.g}}
function lastRet(prev){var HA=homeAir(),l=prev==="home"?null:legOf(prev,"home");
return{min:(l?l.min:0)+15+HA.min,txt:(l?"Torna all'alloggio a ritirare i bagagli: "+l.txt.charAt(0).toLowerCase()+l.txt.slice(1)+" Poi: ":"Ritira i bagagli e parti: ")+HA.txt.charAt(0).toLowerCase()+HA.txt.slice(1),g:(l?l.g:[]).concat(HA.g),toHome:l,rides:l&&l.mode==="metro"?1:0}}

/* ===== pianificazione di una giornata ===== */
function win(id,wd,date){var w=S[id].win;return w?w(wd,date,sunset(date)):null}
function sim(acts,dur,ctx){
var t=ctx.c0,prev=ctx.start,items=[],B=false,L=false,D=false,late=0,lastEnd=0,LO=PD.LUNCHO||0;
function meal(k,d){var w=prev==="start"||prev==="home"?3:8;t+=w;items.push({k:"meal",m:k,t:t,d:d,z:zoneOf(prev),walk:w,near:prev==="home",hotel:k==="col"&&prev==="home"&&!!ctx.multi&&COPT.hb===1});t+=d}
var MX=MD();if(ctx.wantB){meal("col",MX.col);B=true}
acts.forEach(function(id){
var lg=legOf(prev,id);
if(!L&&ctx.wantL&&(t>=11*60+50+LO||(t>=11*60+15+LO&&t+lg.min+dur[id]>13*60+50+LO)||(t>=11*60+LO&&t+lg.min+dur[id]>14*60+15+LO))){meal("pra",MX.pra);L=true}
if(!D&&ctx.wantD&&t>=ctx.dinAt){meal("cen",MX.cen);D=true}
t+=lg.min;var w=win(id,ctx.wd,ctx.date);if(w&&t<w[0])t=w[0];
if(D&&ctx.multi)late+=60;
if(w&&t+dur[id]>w[1])late+=t+dur[id]-w[1];
items.push({k:"act",id:id,t:t,d:dur[id],leg:lg});t+=dur[id];lastEnd=t;prev=id});
var R=ctx.endOf(prev);
if(!L&&ctx.wantL&&t<15*60+30+LO&&t>=11*60+15+LO){meal("pra",MX.pra-10);L=true}
if(ctx.multi&&lastEnd>ctx.dinAt+20)late+=lastEnd-ctx.dinAt-20;
if(ctx.snx&&!D&&t>=15*60&&t<ctx.dinAt-40){t+=5;items.push({k:"snk",x:1,t:t,d:25,z:zoneOf(prev)});t+=25}
if(!D&&ctx.wantD){
 if((ctx.free||(ctx.multi&&!acts.length))&&t<ctx.dinAt-45){var fl=legOf(prev,"home");items.push({k:"free",t:t+2,d:ctx.dinAt-t-2,leg:fl,from:prev});t=ctx.dinAt;prev="home";R=ctx.endOf(prev)}
 meal("cen",MX.cen);D=true}
if(ctx.snack&&!D&&t>=15*60+30&&t+25+R.min<=ctx.dl){t+=5;items.push({k:"snk",t:t,d:20,z:zoneOf(prev)});t+=20}
var slack=ctx.dl-(t+R.min);if(late>0)slack=Math.min(slack,-late);
return{items:items,end:t,prev:prev,ret:R,slack:slack,B:B,L:L,D:D}}
function planDay(acts,ctx,opt){
var dur={},dropped=[],r,g=0,minLen=ctx.single?1:0,need=ST.pc==="rel"?30:0;
acts=acts.slice();acts.forEach(function(id){dur[id]=ST.pc==="int"?Math.round((S[id].min+S[id].id)/10)*5:S[id].id;if(dur[id]<S[id].min)dur[id]=S[id].min});
if(need){var b0=sim([],dur,ctx).slack;need=Math.max(0,Math.min(need,b0-10))}
while(g++<80){r=sim(acts,dur,ctx);if(r.slack>=0&&(r.slack>=need||!(acts.length>minLen||acts.some(function(id){return dur[id]>S[id].min}))))break;
var cand=acts.slice().sort(function(a,b){return pri(b)-pri(a)});
var sh=cand.filter(function(id){return dur[id]>S[id].min})[0];
if(sh){dur[sh]=S[sh].min;continue}
if(acts.length>minLen){dropped.push(cand[0]);acts.splice(acts.indexOf(cand[0]),1);continue}
if(ctx.wantD){ctx.wantD=false;continue}
if(!ctx.single&&ctx.wantL){ctx.wantL=false;continue}
if(!ctx.single&&ctx.wantB){ctx.wantB=false;continue}
break}
var none=false;
if(r.slack<0){acts=[];ctx.wantB=false;ctx.wantL=false;ctx.wantD=false;r=sim(acts,dur,ctx);none=true}
function tryIns(id,after){var i=acts.indexOf(after);if(i<0||r.slack<60||acts.indexOf(id)>=0)return;var a2=acts.slice();a2.splice(i+1,0,id);dur[id]=S[id].id;var r2=sim(a2,dur,ctx);if(r2.slack>=15){acts=a2;r=r2}}
if(!none){
(ST.pc==="rel"?[]:PD.SINGLE.ins||[]).forEach(function(x){if(x[3]&&!(opt&&opt.single))return;if(x[2]&&acts.indexOf(x[2])<0)return;tryIns(x[0],x[1])});
var order=acts.slice().sort(function(a,b){return pri(a)-pri(b)}),ch=true,k=0;
while(r.slack>=15&&ch&&k++<200){ch=false;for(var i=0;i<order.length;i++){var id=order[i];if(dur[id]+5<=(ST.pc==="int"?S[id].id:S[id].max)){dur[id]+=5;var r2=sim(acts,dur,ctx);if(r2.slack>=10){r=r2;ch=true}else dur[id]-=5}}}}
var shrunk=acts.filter(function(id){return dur[id]<S[id].id-4});
return{r:r,acts:acts,dropped:dropped,shrunk:shrunk,none:none}}
function ridesOf(items){var n=0;items.forEach(function(x){var l=x.leg;if(x.k==="act"||x.k==="free"||x.k==="night"){if(l&&l.mode==="metro")n++}});return n}

/* gita in giornata: come la prima versione dell'app */
function planSingle(c){
var A=PD.PAR[c.to],R=PD.PAR[c.rt||c.to],land=toMin(c.a_arr),dep=toMin(c.r_dep),imb=toMin(c.r_imb),wd=wdOf(c.date);
var c0=land+A.inMin,dl=Math.min(dep-R.buf,imb!=null?imb-45:1e9);
var ctx={single:1,c0:c0,start:"start",dl:dl,wd:wd,date:c.date,endOf:function(p){return retOf(c.rt||c.to,p)},wantB:c0<10*60+45,wantL:c0<14*60+(PD.LUNCHO||0)&&dl>13*60+30+(PD.LUNCHO||0),wantD:dl>=18*60+15,dinAt:18*60+45,snack:1};
var x=planDay(PD.SINGLE.acts,ctx,{single:1}),r=x.r;
var items=[{k:"air",t:land,d:A.inMin,c0:c0}].concat(r.items);
items.push({k:"ret",t:r.end,d:r.ret.min,ret:r.ret,arr:r.end+r.ret.min,slack:r.slack,dl:dl});
var n=0;items.forEach(function(it){if(it.k==="act")it.n=++n});
return{kind:"single",i:0,date:c.date,wd:wd,items:items,acts:x.acts,dropped:x.dropped,shrunk:x.shrunk,none:x.none,c0:c0,dl:dl,land:land,dep:dep,imb:imb,leave:r.end,prev:r.prev,B:r.B,L:r.L,D:r.D,A:A,R:R,rides:ridesOf(items)+((A.xr||0)+(R.xr||0))/2}}

/* viaggio di più giorni */
function frame(c,i,n){var A=PD.PAR[c.to],R=PD.PAR[c.rt||c.to],date=addDays(c.date,i),wd=wdOf(date),kind=i===0?"first":i===n-1?"last":"mid",f={i:i,date:date,wd:wd,kind:kind,A:A,R:R,acts:[]};
if(kind==="first"){var land=toMin(c.a_arr),tC=land+A.inMin,lh=arrLeg(),tH=tC+lh.min;f.land=land;f.tC=tC;f.tH=tH;f.lh=lh;f.c0=tH+15;f.dl=22*60+45+PSH[ST.pc].e}
else{f.c0=8*60+45+PSH[ST.pc].c;f.dl=22*60+45+PSH[ST.pc].e}
if(kind==="last"){var dep=toMin(c.r_dep),imb=toMin(c.r_imb);f.dep=dep;f.imb=imb;f.dl=Math.min(dep-R.buf,imb!=null?imb-45:1e9);f.cap=f.dl-homeAir().min-15-f.c0-30-(f.dl>14*60?60:0)-30}
else f.cap=f.dl-f.c0-(f.c0<10*60+45?30:0)-(f.c0<14*60?60:0)-55-45-60;
f.cap=Math.round(f.cap*LF());return f}
function assign(days,n){var cap=days.map(function(d){return d.cap}),left=[],pri=function(b){return b.full?(n>=4?0:2):b.core?1:2};
PD.BUNDLES.map(function(b,i){return[b,i]}).sort(function(x,y){return pri(x[0])-pri(y[0])||x[1]-y[1]}).map(function(x){return x[0]}).forEach(function(b){var best=-1,bv=-1e9;
days.forEach(function(d,i){if(b.cl&&b.cl.indexOf(d.wd)>=0)return;if(b.full&&d.kind!=="mid")return;var v=cap[i]-b.need;if(v>bv){bv=v;best=i}});
if(best<0||cap[best]<b.need*(b.core?0.55:1)){left.push(b);return}
var ok=b.acts.filter(function(id){return !(S[id].cl&&S[id].cl.indexOf(days[best].wd)>=0)});
days[best].acts=days[best].acts.concat(ok);days[best].themes=(days[best].themes||[]).concat([b.t]);cap[best]-=b.need});
days.forEach(function(d){(PD.EXCL||[]).forEach(function(x){if(d.acts.indexOf(x[0])>=0)d.acts=d.acts.filter(function(y){return y!==x[1]})});d.acts.sort(function(a,b){return PD.ORDER.indexOf(a)-PD.ORDER.indexOf(b)})});
return left}
function planMulti(f,c){var last=f.kind==="last";
var ctx={multi:1,c0:f.c0,start:"home",dl:f.dl,wd:f.wd,date:f.date,
endOf:last?lastRet:function(p){return legOf(p,"home")},
wantB:f.c0<10*60+45,wantL:f.c0<14*60+(PD.LUNCHO||0)&&f.dl>13*60+30+(PD.LUNCHO||0),wantD:last?f.dl>=18*60+15:f.c0<21*60+30,dinAt:last?18*60+45:19*60+30+(PD.DINO||0),free:!last,snack:last,snx:!last&&ST.th==="eno"};
var x=planDay(f.acts,ctx,null),r=x.r,items=[];
if(f.kind==="first"){items.push({k:"air",t:f.land,d:f.A.inMin,c0:f.tC,multi:1});items.push({k:"home",t:f.tH,d:15,arr:1,leg:f.lh})}
else items.push({k:"home",t:f.c0,d:0,co:last?1:0,mor:last?0:1});
items=items.concat(r.items);
var fr=last&&!x.none&&!x.acts.length&&r.slack>=75?{k:"free",t:r.end,d:Math.floor((r.slack-30)/5)*5,last:1}:null,rt=r.end+(fr?fr.d:0);if(fr)items.push(fr);
if(last)items.push({k:"ret",t:rt,d:r.ret.min,ret:r.ret,arr:rt+r.ret.min,slack:r.slack-(fr?fr.d:0),dl:f.dl,multi:1});
else if(r.prev!=="home"||items[items.length-1].k==="meal")items.push({k:"night",t:r.end,d:r.ret.min,leg:r.ret});
var n=0;items.forEach(function(it){if(it.k==="act")it.n=++n});
var rides=ridesOf(items)+(last&&r.ret.rides?1:0)+(f.kind==="first"?(f.A.xrm||0):0)+(last?(f.R.xrm||0):0);
return Object.assign(f,{items:items,acts:x.acts,dropped:x.dropped,shrunk:x.shrunk,none:x.none,leave:rt,prev:r.prev,B:r.B,L:r.L,D:r.D,rides:rides,end:rt+(last?0:r.ret.min)})}
function buildTrip(c){ST=sty(c);if(!c.rt||!PD.PAR[c.rt])c.rt=c.to;var n=nDays(c),A=PD.PAR[c.to],R=PD.PAR[c.rt];
if(n===1)return{multi:false,n:1,A:A,R:R,days:[planSingle(c)],left:[]};
var days=[];for(var i=0;i<n;i++)days.push(frame(c,i,n));
var left=assign(days,n);
return{multi:true,n:n,A:A,R:R,days:days.map(function(f){return planMulti(f,c)}),left:left}}

/* ===== stato dei locali nel giorno scelto ===== */
function ivs(h){return h?h.split(",").map(function(s){var p=s.split("-"),a=toMin(p[0]),b=toMin(p[1]);if(b<=a)b+=1440;return[a,b]}):[]}
function vStat(v,wd,t){var h=v.h[wd];if(!h)return{c:"ko",t:"Chiuso di "+DAYS[wd]};var I=ivs(h);
for(var i=0;i<I.length;i++)if(t>=I[i][0]&&t+30<=I[i][1])return{c:"ok",t:"Aperto alle "+fmt(t)};
for(i=0;i<I.length;i++)if(t>=I[i][0]&&t<I[i][1])return{c:"mid",t:"Chiude alle "+fmt(I[i][1])};
for(i=0;i<I.length;i++)if(I[i][0]>t)return{c:"mid",t:"Apre alle "+fmt(I[i][0])};
return{c:"ko",t:"A quell'ora è chiuso"}}
function hrsTxt(v,wd){var h=v.h[wd];return cap(DAYS[wd])+": "+(h?h.split(",").map(function(s){return s.replace("-","–").replace(/^0/,"").replace(/–0/,"–")}).join(" e "):"chiuso")}
function vSorted(ids,wd,t){return ids.map(function(id){var v=V[id];return{id:id,v:v,s:vStat(v,wd,t)}}).sort(function(a,b){var o={ok:0,mid:1,ko:2};return o[a.s.c]-o[b.s.c]})}
function vq(v){return v.q||(v.n+" "+v.a+(PD.QSKIP&&PD.QSKIP.test(v.a)?"":" "+PD.QN))}
/* ===== preferenze di cibo (alimentazione, prezzo, gusti) ===== */
var FP=(function(){var o=lj("via-fp",null)||{};return{d:Array.isArray(o.d)?o.d:[],p:+o.p||0,k:Array.isArray(o.k)?o.k:[]}})();
var FDK={veg:"V",vegan:"N",gf:"F"},FDN={veg:"Vegetariano",vegan:"Vegano",gf:"Senza glutine"},FDE={veg:"🥦",vegan:"🌱",gf:"🌾"},
FKN={c:"Colazione e forno",d:"Dolci e gelato",t:"Cucina tipica",p:"Pizza e pasta",m:"Pesce",r:"Carne",s:"Street food",w:"Internazionale"},
FKE={c:"🥐",d:"🍦",t:"🍲",p:"🍕",m:"🐟",r:"🥩",s:"🌭",w:"🌏"},FPN=["","€ Economico","€€ Medio o meno"];
function fprefOn(){return FP.d.length>0||FP.p>0||FP.k.length>0}
function fpSum(){var a=[];FP.d.forEach(function(d){a.push(FDN[d])});if(FP.p)a.push(FP.p===1?"solo economici":"fino a prezzo medio");FP.k.forEach(function(k){a.push(FKN[k])});return a.join(" · ")}
function ftag(id){var s=PD.FT&&PD.FT[id];if(!s)return null;var f=s.slice(2),lv=function(U){return f.indexOf(U)>=0?2:f.indexOf(U.toLowerCase())>=0?1:0},t={k:s[0],p:+s[1]||2,V:lv("V"),N:lv("N"),F:lv("F")};if(t.N>t.V)t.V=t.N;return t}
function ffit(id){var t=ftag(id);if(!t)return{ok:!FP.d.length&&!FP.p,lv:0,k:0};var ok=true,lv=2;FP.d.forEach(function(d){var x=t[FDK[d]];if(x<1)ok=false;else if(x<lv)lv=x});if(FP.p&&t.p>FP.p)ok=false;return{ok:ok,lv:ok?lv:0,k:FP.k.indexOf(t.k)>=0?1:0}}
function fpool(m,z){var M=PD.MEAL,zz=z==="X"?"A":z,nm=(m==="pra"||m==="cen")?["pra","cen"]:["col","snk"],o=[];nm.forEach(function(n){var L=(M[n]&&(M[n][zz]||M[n].A))||[];L.forEach(function(id){if(o.indexOf(id)<0)o.push(id)})});
if(m==="pra"||m==="cen")o=o.filter(function(id){var t=ftag(id);return t&&t.k!=="c"&&t.k!=="d"});return o}
function kindRk(id){var t=ftag(id);return t?({t:0,m:1,r:1,p:1,w:2,s:3,c:4,d:4})[t.k]:2}
function prefList(ids,wd,t,m,z){ids=ids.filter(function(i){return !mHid(i)});var base=vSorted(ids,wd,t);
if(ST.th==="eno"&&(m==="pra"||m==="cen")){var so={ok:0,mid:1,ko:2};base=base.map(function(o,i){o.i0=i;return o}).sort(function(a,b){return so[a.s.c]-so[b.s.c]||kindRk(a.id)-kindRk(b.id)||a.i0-b.i0})}if(!fprefOn())return{main:base,rest:[]};
var main=[],rest=[],ord={ok:0,mid:1,ko:2};base.forEach(function(o,i){o.i=i;o.f=ffit(o.id);(o.f.ok?main:rest).push(o)});
if((FP.d.length||FP.p)&&main.filter(function(o){return o.s.c!=="ko"}).length<2)fpool(m,z).forEach(function(id){if(ids.indexOf(id)>=0||mHid(id))return;var o=vSorted([id],wd,t)[0];o.f=ffit(id);if(o.f.ok){o.extra=1;o.i=99;main.push(o)}});
main.sort(function(a,b){return ord[a.s.c]-ord[b.s.c]||b.f.lv-a.f.lv||b.f.k-a.f.k||a.i-b.i});
return{main:main.slice(0,4),rest:rest.concat(main.slice(4))}}
function fbadge(id,extra){var t=ftag(id);if(!t&&!extra)return"";var a=[];if(extra)a.push('<span class="fb x">📍 Altro locale della zona</span>');
if(t){a.push('<span class="fb">'+FKE[t.k]+" "+FKN[t.k]+'</span>','<span class="fb" title="Fascia di prezzo rispetto alla città">'+"€€€".slice(0,t.p)+'</span>');
var q=function(lv){return lv<2?" · da chiedere":""};
if(t.N)a.push('<span class="fb g'+(t.N<2?" q":"")+'">🌱 Vegano'+q(t.N)+'</span>');else if(t.V)a.push('<span class="fb g'+(t.V<2?" q":"")+'">🥦 Vegetariano'+q(t.V)+'</span>');
if(t.F)a.push('<span class="fb g'+(t.F<2?" q":"")+'">🌾 Senza glutine'+q(t.F)+'</span>')}
return '<span class="fbs">'+a.join("")+'</span>'}
function fpMapsLink(m,z){var q=[];FP.d.forEach(function(d){if(d==="veg"&&FP.d.indexOf("vegan")>=0)return;q.push(d==="gf"?"gluten free":d==="vegan"?"vegan":"vegetarian")});if(!q.length&&!FP.p)return"";
if(FP.p===1)q.push("cheap");q.push(m==="col"?"breakfast cafe":m==="snk"?"snack":"restaurant");var h=null;try{h=TRIP&&TRIP.multi?home():null}catch(e){}
var loc=h&&h.q?(h.geo?h.pos.join(","):h.q):(PD.hub.n+" "+PD.n);
return '<a class="go sm" target="_blank" rel="noopener" href="'+esc("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q.join(" ")+" near "+loc))+'">🔎 Cerca su Maps: '+esc(q.join(" "))+'</a>'}
function eatUL(pl,wd,m,z){var h="";
if(pl.main.length)h='<ul>'+pl.main.map(function(o){return vLi(o,wd)}).join("")+'</ul>';
else h='<p class="meta fpnone">Nessun locale della mia lista, in questa zona, risponde alle tue preferenze ('+esc(fpSum())+').</p>'+fpMapsLink(m,z);
if(pl.rest.length)h+='<details class="fprest"><summary>Altri '+pl.rest.length+' locali della zona (non adatti o da verificare)</summary><ul>'+pl.rest.map(function(o){return vLi(o,wd)}).join("")+'</ul></details>';
return h}
function fpNote(){return fprefOn()?'<p class="fpnote">🥗 Filtrato per le tue preferenze: '+esc(fpSum())+'. <a class="fplink" href="#">Modifica</a></p>':'<p class="fpnote"><a class="fplink" href="#">🥗 Imposta le tue preferenze di cibo</a> (vegetariano, vegano, prezzo, gusti)</p>'}
function vLi(o,wd){var v=o.v,q=vq(v);
return '<li class="'+(o.s.c==="ko"?"closed":"")+'"><div class="vhd"><b><a target="_blank" rel="noopener" href="'+esc(PD.G(q))+'">'+esc(v.n)+'</a></b><span class="st '+o.s.c+'">'+(o.s.c==="ok"?"✓ ":o.s.c==="ko"?"⚠️ ":"⏱ ")+esc(o.s.t)+'</span></div><p class="vd">'+esc(v.a)+'. '+esc(v.d)+'</p><div class="vm"><span class="vr">★ '+esc(String(v.r))+'</span><span class="hrs">🕐 '+esc(hrsTxt(v,wd))+'</span></div><p class="vp">'+esc(v.pr)+'</p>'+fbadge(o.id,o.extra)+'<a class="go sm" href="'+esc(gdir(q))+'" target="_blank" rel="noopener">↗︎ Portami lì</a></li>'}
var MN={col:"Colazione",pra:"Pranzo",cen:"Cena"},ZN=Object.assign({X:"vicino all'alloggio"},PD.ZN);
function mealIds(m,z){var M=PD.MEAL[m];if(z==="X")return null;return M[z]||M.A||M[Object.keys(M)[0]]}
function mealTitle(it){if(it.hotel)return "Colazione in hotel";var where=it.near?"vicino all'alloggio":ZN[it.z]||"";if(it.m==="cen"&&it.t<18*60+30)return "Cena anticipata "+where;return MN[it.m]+" "+where}
function ordBox(m){return '<div class="ord"><b>🍽️ Cosa ordinare</b>'+PD.ORD[m].map(function(o){return "<p><i>"+esc(o[0])+"</i> – "+esc(o[1])+"</p>"}).join("")+"</div>"}
function hotelBf(){return '<p>La colazione è inclusa nel tuo hotel: scendi con calma nella sala colazioni.</p><p class="meta">Controlla gli orari del servizio (di solito dalle 7 alle 10:30) e, se hai fretta, chiedi alla reception se prepara un cestino da portare via.</p>'}
function nearBox(m){var h=home(),k=PD.NEAR[m]||PD.NEAR.col;
return '<div class="eat"><h3>Dove mangiare</h3><p class="meta" style="margin:4px 0 8px">In questa zona non ho locali verificati: cerca una '+k+' con almeno 4 stelle vicino all\'alloggio.</p><a class="go sm" target="_blank" rel="noopener" href="'+esc("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(fpWords()+k+" near "+(h.geo?h.pos.join(","):h.q)))+'">🔎 '+cap(k)+(fpWords()?" ("+esc(fpWords().trim())+")":"")+' vicino all\'alloggio</a></div>'}
function fpWords(){var q=[];FP.d.forEach(function(d){if(d==="veg"&&FP.d.indexOf("vegan")>=0)return;q.push(d==="gf"?"gluten free":d==="vegan"?"vegan":"vegetarian")});return q.length?q.join(" ")+" ":""}

/* ===== rendering ===== */
var TRIP=null,P=null,WD=0,SEL=0;
window.PAR={get S(){return S},get MN(){return MN},get cfg(){return CFG},get plan(){return P},get trip(){return TRIP},get sel(){return SEL},home:home,fmt:fmt,fdur:fdur,esc:esc,toMin:toMin,paris:paris,gdir:gdir,eur:eur,ls:ls,lj:lj,dateShort:dateShort,dateLong:dateLong,wd:function(){return WD},DAYS:DAYS,mealIds:mealIds,vSorted:vSorted,vq:vq,toast:toast,cap:cap,fromInfo:function(){return fromInfo(CFG)},
 L:{},on:function(fn){(this.L.f=this.L.f||[]).push(fn)},emit:function(){if(this.quiet)return;(this.L.f||[]).forEach(function(f){try{f()}catch(e){console.error(e)}})}};

var E={get S(){return S},get V(){return V},get cfg(){return CFG},get trip(){return TRIP},get plan(){return P},get wd(){return WD},home:home,legOf:legOf,posOf:posOf,access:access,hav:hav,est:estMin,fmt:fmt,fdur:fdur,eur:eur,esc:esc,toMin:toMin,sunset:sunset,dateObj:dateObj,lc:lc,allActs:function(){return allActs()},has:function(id){return allActs().indexOf(id)>=0},get copt(){return COPT}};
function goBtn(q,mode,label,icon){return '<a class="go" href="'+esc(gdir(q,mode))+'" target="_blank" rel="noopener"><span>'+icon+'</span> '+label+'</a>'}
function stepHTML(it){var A=P.A,c=CFG,cls="",ti="",body="",h=TRIP.multi?home():null;
if(it.k==="air"){cls="air";ti="Atterraggio a "+A.n;
body='<p>'+esc(A.arr)+'</p><p class="meta">'+esc(A.tk)+(it.multi?' Poi vai all\'alloggio a lasciare i bagagli.':' In centro, a '+(A.hubn||PD.hub.n)+', verso le '+fmt(it.c0)+'.')+'</p>'+(it.multi?goBtn(h.q,"transit","Portami all'alloggio","🏨"):goBtn(A.hubq||PD.hub.q,"transit","Portami in centro","🚆"))}
else if(it.k==="home"){cls="home";
if(it.arr){ti="Arrivo all'alloggio";var early=toMin(h.cin)>it.t+15;body='<div class="leg"><i>'+(it.leg.mode==="walk"?"🚶":"🚇")+'</i><span>'+esc(it.leg.txt)+'</span></div><p>'+(early?"Il check-in è dalle "+esc(h.cin)+": lascia i bagagli, quasi tutte le strutture li tengono anche prima. Chiedi "+PD.T.bags+".":"Check-in e una sistemata veloce, poi si riparte.")+'</p>'+goBtn(h.q,"transit","Portami all'alloggio","🏨")}
else if(it.co){ti="Check-out e bagagli";body='<p>Lascia la camera entro le '+esc(h.cout)+'. '+(P.acts.length||P.items.some(function(x){return x.k==="free"})?'Chiedi di tenere i bagagli fino '+(P.leave>=13*60?'al pomeriggio':'a fine mattinata')+': '+esc(P.leave>=13*60?PD.T.bagsPM:PD.T.bagsAM)+'. Se non si può, ci sono depositi bagagli a pagamento come Nannybag o Bounce.':'Dopo colazione si parte per l\'aeroporto.')+'</p>'+(P.acts.length?'<p class="meta">Oggi: '+esc(P.acts.map(function(id){return S[id].t}).join(", "))+'.</p>':'')}
else{ti="Si parte dall'alloggio";body='<p>Giorno '+(P.i+1)+(P.themes&&P.themes.length?': '+esc(P.themes.join(" e ")):'')+'.</p>'+(P.acts.length?'<p class="meta">Le tappe: '+esc(P.acts.map(function(id){return S[id].t}).join(", "))+'.</p>':'<p class="meta">Giornata libera: nessuna tappa in programma.</p>')}}
else if(it.k==="meal"){cls="food";ti=mealTitle(it);var ids=mealIds(it.m,it.z);
if(it.hotel)body=hotelBf();
else if(!ids)body='<p>'+(it.m==="col"?"Prima di partire, qualcosa al volo vicino all'alloggio.":"Vicino all'alloggio, per non riattraversare la città.")+'</p>'+nearBox(it.m);
else{var pl=prefList(ids,WD,it.t,it.m,it.z),L=pl.main,first=L.filter(function(o){return o.s.c==="ok"})[0]||L[0];
body='<p>'+(it.m==="col"?(it.near?"A pochi passi dall'alloggio.":"Appena usciti dalla stazione, a pochi passi."):it.m==="pra"?((PD.T.praZ||{})[it.z]||PD.T.pra+": "+(it.d>=60?"un'ora a tavola, con calma.":"un pranzo veloce.")):(TRIP.multi&&P.kind!=="last"?"La cena della giornata, senza fretta.":"Mangia qui e non in aeroporto: si spende meno e si mangia meglio. Tieni d'occhio l'orologio."))+'</p>'+(ST.th==="eno"&&it.m!=="col"?'<p class="meta">🍷 Tavola lunga: piatti tipici e un calice di vino locale. Se puoi, prenota.</p>':'')+'<div class="eat"><h3>Dove mangiare</h3>'+eatUL(pl,WD,it.m,it.z)+fpNote()+'</div>'+mPickBlock(it,first)}}
else if(it.k==="snk"){cls="food";ti=it.x?"Aperitivo e assaggi":"Ultimo assaggio prima di partire";var sids=PD.MEAL.snk[it.z]||(it.z==="X"?null:PD.MEAL.snk.A);
body=(it.x?'<p>Una pausa golosa prima di cena: stuzzichini, un calice o un dolce tipico, assaggiando senza fretta.</p>':'<p>Non c\'è tempo per una cena seduti: prendete qualcosa da mangiare in viaggio o in aeroporto prima dei controlli.</p>')+(sids?'<div class="eat"><h3>Dove prenderlo</h3>'+eatUL(prefList(sids,WD,it.t,"snk",it.z),WD,"snk",it.z)+fpNote()+'</div>':nearBox("snk"))}
else if(it.k==="act"){var s=S[it.id];cls=s.cls;ti=s.t;var meta=s.m,lg=it.leg;
if(PD.fx.meta)meta=PD.fx.meta(it,meta,E);
if(s.sun){var ss=sunset(P.date);if(Math.abs(it.t+it.d/2-ss)<120)meta+=" Il sole tramonta alle "+fmt(ss)+": "+(it.t+it.d>ss?"sei qui al momento giusto per la luce del tramonto.":"goditi l'ultima luce.")}
(PD.EXCL||[]).forEach(function(x){if(it.id===x[1]&&TRIP.multi&&TRIP.days.some(function(d){return d.acts.indexOf(x[0])>=0}))meta=x[2]});
body='<div class="leg"><i>'+(lg.mode==="walk"?"🚶":"🚇")+'</i><span>'+esc(lg.txt)+'</span></div><p>'+esc(s.d)+'</p>'+(meta?'<p class="meta">'+esc(meta)+'</p>':'')+goBtn(s.q,lg.mode==="walk"?"walking":"transit","Portami lì",lg.mode==="walk"?"🚶":"🚇")}
else if(it.k==="free"&&it.last){cls="home";ti="Mattinata libera";body='<p>Hai circa '+fdur(it.d)+' prima di partire: lascia i bagagli all\'alloggio e goditi il quartiere, con un caffè in terrazza, gli ultimi acquisti o una passeggiata. Alle '+fmt(it.t+it.d)+' si riparte per l\'aeroporto.</p>'}
else if(it.k==="free"){cls="home";var lng=it.d>=150;ti=lng?"Pomeriggio libero":"Tempo libero";body='<div class="leg"><i>'+(it.leg.mode==="walk"?"🚶":"🚇")+'</i><span>'+esc(it.leg.txt)+'</span></div><p>'+(lng?"Hai circa "+fdur(it.d)+" senza tappe fisse. "+PD.T.freeLong:PD.T.freeShort)+' La cena è verso le '+fmt(it.t+it.d)+'.</p>'}
else if(it.k==="night"){cls="home";ti="Rientro all'alloggio";var nx=TRIP.days[P.i+1];body='<div class="leg"><i>'+(it.leg.mode==="walk"?"🚶":"🚇")+'</i><span>'+esc(it.leg.txt)+'</span></div><p>Buonanotte! '+(nx?(nx.kind==="last"?"Domani è l'ultimo giorno: check-out entro le "+esc(h.cout)+".":"Domani si riparte alle "+fmt(nx.c0)+(nx.acts.length?" con "+esc(S[nx.acts[0]].t)+".":".")):"")+'</p>'+goBtn(h.q,it.leg.mode==="walk"?"walking":"transit","Portami all'alloggio","🏨")}
else if(it.k==="ret"){cls="air";var RA=P.R||A;ti=(it.multi?"Bagagli e aeroporto":"Ritorno all'aeroporto")+(RA!==A?" · "+RA.n:"");var R=it.ret,imb=P.imb!=null?fmt(P.imb):null;
body='<p>'+esc(R.txt)+'</p><p class="meta">Arrivo in aeroporto verso le '+fmt(it.arr)+(imb?", imbarco dalle "+imb:"")+", decollo alle "+fmt(P.dep)+"."+(it.slack>=20?" Hai circa "+fdur(it.slack)+" di margine in più.":"")+'</p>'+(it.multi&&R.toHome?goBtn(h.q,R.toHome.mode==="walk"?"walking":"transit","Portami all'alloggio","🏨")+' ':'')+goBtn(RA.gm,"transit","Portami in aeroporto","🚆")}
return '<li class="step '+cls+'" data-t="'+it.t+'"><div class="t">'+fmt(it.t)+'</div><div class="body"><h2>'+esc(ti)+'</h2>'+body+'</div></li>'}

function apdTxt(){try{var i=todayIdx();if(i>=0&&TRIP.n>1)return"Giorno "+(i+1)+" di "+TRIP.n+" · "+dateShort(TRIP.days[i].date)}catch(e){}return rangeTxt()}
window.__apPaint=function(st){if(st!==undefined)window.__apLast=st;else st=window.__apLast;var d=document.querySelector("#appt .apd");if(d&&TRIP&&CFG)d.textContent=apdTxt();var s=document.querySelector("#appt .aps");if(s&&st!==undefined){s.textContent=st||"";s.hidden=!st}};
function rangeTxt(){var c=CFG,a=dateObj(c.date),b=dateObj(c.date_r);if(TRIP.n===1)return dateShort(c.date);
return a.getUTCMonth()===b.getUTCMonth()?a.getUTCDate()+"–"+b.getUTCDate()+" "+MESI[b.getUTCMonth()]:dateShort(c.date)+" – "+dateShort(c.date_r)}
window.fitH1=fitH1;function fitH1(){var h=$("#hero h1");if(!h)return;h.style.fontSize="";var go=function(){h.style.fontSize="";var w=h.clientWidth,sw=h.scrollWidth;if(w&&sw>w){h.style.fontSize=Math.floor(parseFloat(getComputedStyle(h).fontSize)*w/sw*.98*10)/10+"px"}};go();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go);addEventListener("resize",go)}
function renderHero(){var c=CFG,A=TRIP.A,n=TRIP.n,ttl=n===1?PD.n+" in un giorno":PD.n+" in "+n+" giorni";
$("#hero h1").textContent=ttl;fitH1();
(function(){var one=n===1,ch=[],R0=TRIP.R,sx=styTxt(c).replace(/^ Stile: /,"").replace(/\.$/,"");
if(!one){var sd=function(x){return dateLong(x).replace(/^\S+ /,"").replace(/ \d{4}$/,"")};ch.push(sd(c.date)+" – "+sd(c.date_r)+" · "+(n-1)+(n===2?" notte":" notti"))}
ch.push(c.ppl===1?"1 persona":c.ppl+" persone");
ch.push(one?A.n+" "+fmt(toMin(c.a_arr))+" → "+fmt(toMin(c.r_dep)):"arrivo "+fmt(toMin(c.a_arr))+" · ritorno "+fmt(toMin(c.r_dep)));
ch.push(n>1?"alloggio in "+home().where:PD.T.move);if(sx)ch.push(sx);
$("#hsub").innerHTML='<span class="hch">'+ch.map(function(t){return '<span>'+esc(t)+'</span>'}).join("")+'</span>'})();
$("#appt").innerHTML='<span class="apc" role="button" tabindex="0" aria-haspopup="menu" aria-expanded="false"><span class="apn">'+esc(PD.n)+'</span><i class="apv" aria-hidden="true"></i></span><span class="apd">'+esc(apdTxt())+'</span><span class="aps" hidden></span>';window.__apPaint&&__apPaint();
$("#sps").textContent=PD.n+" · "+rangeTxt();
document.title="Viaticum · "+ttl}
function renderBar(){var it=P.items,segs=[],end=P.kind==="single"||P.kind==="last"?P.dep:(P.end||P.leave);
for(var i=0;i<it.length;i++){var a=it[i],b=it[i+1];segs.push(Math.max(10,(b?b.t:end)-a.t))}
$("#hbar").innerHTML=segs.map(function(f){return '<i style="flex:'+f+'"></i>'}).join("");
var s0=P.kind==="single"||P.kind==="first"?fmt(P.land)+" atterraggio":fmt(P.c0)+(P.kind==="last"?" check-out":" partenza"),s1=P.kind==="single"||P.kind==="last"?fmt(P.dep)+" decollo":fmt(end)+" alloggio";
$("#hs").textContent=s0;$("#he").textContent=s1;$("#hbar").setAttribute("aria-label","La giornata: "+s0+", "+s1);hbarLive()}
function hbarLive(){var b=$("#hbar"),hc=$("#hc");if(!b||!P||!TRIP)return;var it=P.items,end=P.kind==="single"||P.kind==="last"?P.dep:(P.end||P.leave),on=todayIdx()===SEL,m=paris().m,el=b.children,cur=-1;
for(var k=0;k<el.length;k++){var a=it[k].t,e=it[k+1]?it[k+1].t:end,cl="";if(on){if(m>=e)cl="dn";else if(m>=a){cl="nw";cur=k;el[k].style.setProperty("--p",Math.round((m-a)/Math.max(1,e-a)*100)+"%")}}el[k].className=cl}
b.classList.toggle("hl",on);if(hc)hc.textContent=on&&cur>=0?(cur+1)+" di "+it.length:""}

function renderShort(){var el=$("#short"),t=[];
if(P.none){t.push(P.kind==="single"?"Con questi orari non resta tempo per entrare in città: tra il trasferimento dall'aeroporto e il ritorno non ci sono abbastanza minuti. Controlla gli orari dei voli.":P.kind==="first"?"Atterri tardi: oggi c'è solo il tempo di arrivare all'alloggio.":P.kind==="last"?"Il volo parte presto: oggi c'è giusto il tempo per il check-out e il viaggio in aeroporto.":"Oggi non resta tempo per le tappe.")}
else{if(P.dropped.length)t.push("Il tempo è poco, quindi ho tolto: "+P.dropped.map(function(id){return S[id].t}).join(", ")+".");
if(P.shrunk.length&&!P.dropped.length)t.push("Il tempo è stretto: ho accorciato "+P.shrunk.map(function(id){return S[id].t}).join(", ")+".")}
if(TRIP.multi&&SEL===0&&TRIP.left.length)t.push("In "+TRIP.n+" giorni non ci stanno: "+TRIP.left.map(function(b){return b.t}).join(", ")+". Allunga il viaggio per aggiungerli.");
el.hidden=!t.length;el.textContent=t.length?"⏳ "+t.join(" "):"";el.classList.remove("open");if(!el.__t){el.__t=1;el.setAttribute("role","button");el.tabIndex=0;el.addEventListener("click",function(){el.classList.toggle("open")})}}

/* selettore dei giorni */
function dayIcon(d){var I=PD.DICON||{};for(var k in I)if(d.acts.indexOf(k)>=0)return I[k];return "🚶"}
function renderDays(){var multi=TRIP.multi,today=paris().d;
$$(".dsel").forEach(function(box){box.hidden=!multi;if(!multi){box.innerHTML="";return}
var n=TRIP.n,tight=n>4;box.classList.toggle("fit",n<=7);box.classList.toggle("tight",tight);box.style.setProperty("--n",n);
box.innerHTML=TRIP.days.map(function(d,i){var o=dateObj(d.date);return '<button type="button" class="dp'+(i===SEL?" on":"")+(d.date===today?" today":"")+'" data-d="'+i+'" aria-pressed="'+(i===SEL)+'" aria-label="Giorno '+(i+1)+', '+DAYS[d.wd]+' '+o.getUTCDate()+'">'+(tight?'<small>'+DAB[d.wd]+'</small><span>'+o.getUTCDate()+'</span>':'<small>Giorno '+(i+1)+'</small><span>'+DAB[d.wd]+' '+o.getUTCDate()+'</span>')+'<em>'+(d.kind==="first"?"✈️":d.kind==="last"?"🧳":dayIcon(d))+'</em></button>'}).join("");
var on=$(".dp.on",box);if(on)try{box.scrollLeft=Math.max(0,on.offsetLeft-box.clientWidth/2+on.clientWidth/2)}catch(e){}})}
function selectDay(i){if(!TRIP||i===SEL||i<0||i>=TRIP.n)return;SEL=i;P=TRIP.days[SEL];WD=P.wd;lastNow=-2;renderDays();renderBar();renderShort();renderItin();renderPasti();liveTick();PAR.emit()}
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".dp");if(b){selectDay(+b.dataset.d)}});

/* l'alloggio */
function renderStay(){var el=$("#stay");if(!TRIP.multi){el.hidden=true;el.innerHTML="";return}
var h=home(),c=CFG,nights=TRIP.n-1;el.hidden=false;
var bk="https://www.booking.com/searchresults.it.html?ss="+encodeURIComponent(h.addr?PD.BK:h.zn.split(" / ")[0]+", "+PD.BK)+"&checkin="+c.date+"&checkout="+c.date_r+"&group_adults="+c.ppl+"&no_rooms=1";
el.innerHTML='<span class="se">🏨</span><div><b>'+esc(h.name)+'</b><small>'+(h.addr&&!h.alt?'Zona '+esc(h.zn)+' · ':'')+nights+(nights===1?" notte":" notti")+' · check-in dalle '+esc(h.cin)+' · check-out entro le '+esc(h.cout)+'</small><small>'+(h.geo?"📍 Posizione presa dall'indirizzo":h.addr?"📍 Indirizzo non trovato sulla mappa: uso il centro della zona":"📍 Posizione indicativa: centro della zona")+'</small><div class="lpa">'+'<a class="go sm" target="_blank" rel="noopener" href="'+esc(gdir(h.q,"transit"))+'">↗︎ Portami all\'alloggio</a>'+(h.addr?'':'<a class="go sm" target="_blank" rel="noopener" href="'+esc(bk)+'">🔎 Cerca su Booking</a>')+'<button type="button" class="go sm" data-edit>✏️ Modifica</button></div></div>';
$("[data-edit]",el).addEventListener("click",function(){openSetup(false,2)})}

function renderItin(){$("#ith").textContent=TRIP.multi?"Giorno "+(SEL+1)+" · "+DAYS[P.wd]+" "+dateObj(P.date).getUTCDate():"Itinerario";$("#steps").innerHTML=P.items.map(stepHTML).join("");buildWheel();buildCru()}

/* cruscotto: riquadri meteo e alloggio sopra le tappe */
function buildCru(){var it=$("#itinerario"),c=$("#cru");
if(!c){c=document.createElement("div");c.id="cru";c.className="cru";
c.innerHTML='<button type="button" class="ct cmt" aria-label="Apri il meteo"><span class="cl">Meteo</span><b class="cv"><i class="cmi"></i><span class="cmd"></span></b><small class="cs"></small></button><button type="button" class="ct cst" aria-label="Mostra l\'alloggio"><span class="cl">Alloggio</span><b class="cv cn"></b><small class="cs"></small></button>';
var tg=$("#tgr");tg.parentNode.insertBefore(c,tg);
$(".cmt",c).addEventListener("click",function(){var b=$('.tg[data-p="meteo"]');if(b)b.click()});
$(".cst",c).addEventListener("click",function(){var st=$("#stay");st.classList.toggle("cx");$(".cst",c).setAttribute("aria-expanded",!st.classList.contains("cx"))});
var me=$("#meteo");if(me)new MutationObserver(cruUpd).observe(me,{childList:true,subtree:true,characterData:true})}
var st=$("#stay");if(st&&st.previousElementSibling!==c){c.parentNode.insertBefore(st,$("#tgr"))}
if(st&&!st.__cx){st.__cx=1;st.classList.add("cx")}
cruUpd()}
function cruUpd(){var c=$("#cru");if(!c)return;var me=$("#meteo"),mi=me&&me.querySelector(".mi"),sp=me&&me.querySelector("div span"),b=me&&me.querySelector("div b");
var txt=((b&&b.textContent)||"").replace(/^Meteo\s*/i,"");
$(".cmi",c).textContent=mi?mi.textContent:"🌤️";
var t=sp?sp.textContent:"";var m=t.match(/-?\d+\s*°/);
$(".cmd",c).textContent=m?m[0].replace(/\s/g,""):"–";
$(".cmt .cs",c).textContent=t&&!/Caricamento/.test(t)?t.replace(/-?\d+\s*°C?/,"").replace(/^[\s·,:\-–]+/,"").slice(0,34):"Tocca per i dettagli";
var st=$("#stay"),on=st&&!st.hidden&&st.querySelector("b");
$(".cst",c).hidden=!on;c.classList.toggle("solo",!on);
if(on){$(".cst .cn",c).textContent=st.querySelector("b").textContent;var sm=st.querySelector("small"),mm=sm&&sm.textContent.match(/check-in dalle (\d{1,2}[:.]\d{2})/);$(".cst .cs",c).textContent=mm?"Check-in dalle "+mm[1]:"Tocca per i dettagli"}}

/* ghiera scorrevole */
var WH={},WSEL={d:-1,i:0},WNOW=-1;
function wDone(it){if(it.k==="meal"||it.k==="snk")return !!(MEALS.s&&MEALS.s[P.i+"|"+mKeyOf(it)]);return !!(MEALS.v&&MEALS.v["d"+P.i+"|"+it.t])}
function wToPasti(it){var k=P.i+"|"+mKeyOf(it),t=$("#t-mangiare");if(!t)return;t.checked=true;t.dispatchEvent(new Event("change",{bubbles:true}));PS.open[k]=true;try{pDraw()}catch(e){}setTimeout(function(){var r=$("#mgrid [data-row=\""+k+"\"]");if(r)r.scrollIntoView({behavior:"smooth",block:"start"})},120)}
function wStamp(it){var on=!wDone(it);if(it.k==="meal"||it.k==="snk"){var k=P.i+"|"+mKeyOf(it);MEALS.s=MEALS.s||{};if(on)MEALS.s[k]=1;else delete MEALS.s[k]}else{var k2="d"+P.i+"|"+it.t;MEALS.v=MEALS.v||{};if(on)MEALS.v[k2]=1;else delete MEALS.v[k2]}mSave();try{renderPasti()}catch(e){}return on}
function buildWheel(){var ol=$("#steps");var old=$("#itinerario .wbox");if(old)old.remove();
var steps=$$(".step",ol),N=steps.length,box=document.createElement("section");box.className="wbox";
var sa0=document.body.classList.contains("showall"),its=P.items,H=148;
var end=P.kind==="single"||P.kind==="last"?P.dep:(P.end||P.leave),lens=[],real=[],cum=[],tot=0;
its.forEach(function(it,i){var r=Math.max(1,(its[i+1]?its[i+1].t:end)-it.t);real.push(r);var l=Math.max(10,r);cum.push(tot);lens.push(l);tot+=l});
box.innerHTML='<div class="vsw" role="tablist" aria-label="Come vedere le tappe"><button type="button" role="tab" data-v="w" aria-selected="'+!sa0+'" class="'+(sa0?"":"on")+'"><i aria-hidden="true">◎</i>Ghiera</button><button type="button" role="tab" data-v="l" aria-selected="'+sa0+'" class="'+(sa0?"on":"")+'"><i aria-hidden="true">☰</i>Elenco</button></div><div class="wcw"><div class="gb" aria-hidden="true"><div class="gbub"></div><div class="gbt"></div><div class="gnm" hidden></div><div class="gbth"></div><div class="gbe"><span></span><span></span></div></div><div class="gd"><div class="gds" tabindex="0" role="listbox" aria-label="Tappe della giornata"></div></div><div class="gct"><button type="button" class="gnow">↺ Vai ad Adesso</button><span class="wcn" aria-live="polite"></span></div><div class="wdet"></div></div>';
ol.parentNode.insertBefore(box,ol);
var gb=$(".gb",box),gbt=$(".gbt",box),th=$(".gbth",box),bub=$(".gbub",box),nm=$(".gnm",box),ds=$(".gds",box),det=$(".wdet",box),cn=$(".wcn",box),gnow=$(".gnow",box),cards=[],blocks=[],rows=[];
$(".gbe span:first-child",box).textContent=fmt(its[0]?its[0].t:0);$(".gbe span:last-child",box).textContent=fmt(end);
function tt(i){return $("h2",steps[i]).textContent}
function dur(m){return m>=60?(Math.round(m/6)/10).toString().replace(".",",")+" h":m+" min"}
its.forEach(function(it,i){
var c=document.createElement("article");c.className="wc sel";c.setAttribute("aria-label","Tappa "+(i+1)+" di "+N+": "+tt(i));
c.innerHTML='<div class="wch"><span>Tappa '+(i+1)+' di '+N+'</span><b class="wcp"></b></div><div class="wct"></div><div class="wcb"></div><div class="wca"><button type="button" class="wcs"></button></div><div class="wcst" aria-hidden="true">VISTO</div>';
$(".wct",c).textContent=$(".t",steps[i]).textContent;
var b=$(".wcb",c);b.innerHTML=$(".body",steps[i]).innerHTML;
var ac=$(".wca",c),eat=$(".eat",b);if(eat)eat.parentNode.removeChild(eat);$$("a.go",b).filter(function(g){return g.parentNode===b}).reverse().forEach(function(g){g.parentNode.removeChild(g);ac.insertBefore(g,ac.firstChild)});if(eat){var pb=document.createElement("button");pb.type="button";pb.className="wcp2";pb.innerHTML="<span aria-hidden=\"true\">🍽️</span> "+(mPick(it)?"Cambia in Pasti":"Scegli in Pasti");pb.addEventListener("click",function(){wToPasti(it)});ac.insertBefore(pb,ac.firstChild)}
$$("[data-edit]",c).forEach(function(x){x.addEventListener("click",function(){openSetup(false)})});
$(".wcs",c).addEventListener("click",function(){var on=wStamp(it);paint();if(on&&i<N-1)setTimeout(function(){if(WSEL.i===i&&WSEL.d===P.i)pick(i,"drum")},800)});
cards.push(c);
var bl=document.createElement("i");bl.style.flex=String(lens[i]);gbt.appendChild(bl);blocks.push(bl);
var r=document.createElement("button");r.type="button";r.className="gdr";r.setAttribute("role","option");r.innerHTML='<span class="a"></span><span class="b"></span><span class="c"></span>';$(".a",r).textContent=$(".t",steps[i]).textContent;$(".b",r).textContent=tt(i);r.addEventListener("click",function(){pick(i,"drum")});ds.appendChild(r);rows.push(r)});
var lock=0,drag=false,reduce=false;try{reduce=matchMedia("(prefers-reduced-motion:reduce)").matches}catch(e){}
function nowM(){return todayIdx()===SEL?paris().m:-1}
function pos(i,f){return (cum[i]+lens[i]*f)/tot*100}
function thumb(p,anim,txt){var t=anim&&!reduce?"left .35s cubic-bezier(.3,1.2,.4,1)":"none";th.style.transition=t;bub.style.transition=t;th.style.left=p+"%";bub.style.left=Math.max(14,Math.min(86,p))+"%";bub.textContent=txt}
function paint(){var i=WSEL.i,d=0,m=nowM();
cards.forEach(function(c,k){var dn=wDone(its[k]),nw=k===WNOW&&!dn;if(dn)d++;c.classList.toggle("dn",dn);c.classList.toggle("now",k===WNOW);$(".wcp",c).textContent=dn?"Fatto":nw?"Adesso":"";$(".wcp",c).className="wcp"+(dn?" dn":nw?" nw":"");var bt=$(".wcs",c);bt.textContent=dn?"Annulla timbro":"Timbra";bt.setAttribute("aria-pressed",dn);
blocks[k].className=(dn?"dn ":"")+(k===i?"sel":"");rows[k].className="gdr"+(dn?" dn":"")+(k===WNOW&&!dn?" now":"")+(k===i?" sel":"");rows[k].setAttribute("aria-selected",k===i);$(".c",rows[k]).textContent=dn?"✓ Visto":dur(real[k])});
if(det.firstChild!==cards[i]){det.innerHTML="";det.appendChild(cards[i])}
cn.textContent="Tappa "+(i+1)+" di "+N+(d?" · "+d+(d===1?" fatta":" fatte"):"");
gnow.hidden=m<0;
if(m>=0&&WNOW>=0&&its[WNOW]){nm.hidden=false;nm.style.left=pos(WNOW,Math.max(0,Math.min(1,(m-its[WNOW].t)/real[WNOW])))+"%"}else nm.hidden=true;
if(!drag)thumb(pos(i,.5),true,fmt(its[i].t))}
function fish(){}
function pick(i,from){i=Math.max(0,Math.min(N-1,i));if(i===WSEL.i&&from!=="init")return;WSEL={d:P.i,i:i};paint();if(from==="bar"||from==="drum"){lock=1;ds.scrollTo({left:i*H,behavior:from==="bar"||reduce?"auto":"smooth"});setTimeout(function(){lock=0},from==="bar"?60:450)}}
var tk=0;ds.addEventListener("scroll",function(){if(!tk)tk=requestAnimationFrame(function(){tk=0;fish();if(lock)return;var i=Math.max(0,Math.min(N-1,Math.round(ds.scrollLeft/H)));if(i!==WSEL.i){WSEL={d:P.i,i:i};paint()}})},{passive:true});
function frac(e){var r=gb.getBoundingClientRect(),f=Math.max(0,Math.min(1,(e.clientX-r.left)/Math.max(1,r.width)))*tot,k=0;for(var j=0;j<N;j++)if(f>=cum[j])k=j;return{k:k,f:Math.max(0,Math.min(1,(f-cum[k])/lens[k])),p:f/tot*100}}
function mv(e){var q=frac(e);thumb(q.p,false,fmt(its[q.k].t+Math.round(q.f*real[q.k])));if(q.k!==WSEL.i)pick(q.k,"bar")}
gb.setAttribute("data-noswipe","");gb.style.touchAction="none";
gb.addEventListener("pointerdown",function(e){drag=true;try{gb.setPointerCapture(e.pointerId)}catch(x){}mv(e)});gb.addEventListener("pointermove",function(e){if(drag)mv(e)});
function up(){if(!drag)return;drag=false;thumb(pos(WSEL.i,.5),true,fmt(its[WSEL.i].t))}gb.addEventListener("pointerup",up);gb.addEventListener("pointercancel",up);
gnow.addEventListener("click",function(){if(WNOW>=0)pick(WNOW,"drum")});
$$(".vsw button",box).forEach(function(b){b.addEventListener("click",function(){var all=b.dataset.v==="l";document.body.classList.toggle("showall",all);$$(".vsw button",box).forEach(function(x){var on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-selected",on)});if(!all)requestAnimationFrame(function(){ds.scrollLeft=WSEL.i*H;fish()})})});
var st=WSEL.d===P.i?WSEL.i:(todayIdx()===SEL&&WNOW>=0?WNOW:0);WSEL={d:P.i,i:Math.min(st,N-1)};
WH={paint:paint,go:function(i){pick(i,"drum")},setNow:function(i){WNOW=i;window.VNOW=i>=0&&its[i]?{t:fmt(its[i].t),n:tt(i)}:null;try{document.dispatchEvent(new Event("vnow"))}catch(e){}paint()}};
paint();ds.scrollLeft=WSEL.i*H;fish()}

/* banner dal vivo */
var lastNow=-2,LB=null;
function todayIdx(){if(!TRIP)return -1;var d=paris().d;for(var i=0;i<TRIP.days.length;i++)if(TRIP.days[i].date===d)return i;return -1}
var lastDay=null;
function liveTick(){if(document.hidden)return;var live=$("#live");if(!TRIP||!CFG){live.hidden=true;return}var dd=paris().d;if(lastDay&&dd!==lastDay){lastDay=dd;try{renderAll()}catch(e){console.error(e)}return}lastDay=dd;
var n=paris(),c=CFG,A=TRIP.A,D0=TRIP.days[0],DN=TRIP.days[TRIP.n-1];
function set(cls,b,sp){try{localStorage.setItem("via-live",JSON.stringify({k:c.dest+c.date,b:b,s:sp,t:Date.now(),bar:LB}))}catch(e){}live.className="live "+cls;var lk="",tt=b,mm=/^(Ora|Prima tappa): /.exec(b);if(mm){lk=mm[1]==="Ora"?"Adesso":"Prima tappa";tt=b.slice(mm[0].length)}live.innerHTML='<i class="dot"></i><div class="lt">'+(lk?'<small class="lk"></small>':'')+'<b></b><span></span></div>';if(lk)$(".lk",live).textContent=lk;$("b",live).textContent=tt;$("span",live).textContent=sp;live.hidden=false;window.__apPaint&&__apPaint(/^Prossima:/.test(sp)?"":b)}
var steps=$$("#steps .step");steps.forEach(function(li){li.classList.remove("now")});
if(n.d<D0.date){var d=Math.round((dateObj(D0.date)-dateObj(n.d))/864e5);set("calm",d===1?"Domani si parte! ✈️":"Mancano "+d+" giorni al viaggio",(c.a_num?"Volo "+c.a_num+(c.a_dep?" alle "+c.a_dep:"")+". ":"")+"Atterraggio a "+A.n+" alle "+c.a_arr+"."+(d<=2&&PD.T.remind?" "+PD.T.remind:""));return}
if(n.d>DN.date){set("calm","Com'è andata a "+PD.n+"? "+PD.flag,"L'itinerario resta qui come ricordo.");$(".lt",live).insertAdjacentHTML("beforeend",'<div class="lact"><button type="button" class="lb lb2 lrecap">Condividi il riepilogo</button></div>');return}
var di=todayIdx(),T=TRIP.days[di];if(!T)return;
var i=-1;T.items.forEach(function(s,k){if(n.m>=s.t)i=k});hbarLive();LB={a:T.items.map(function(s){return s.t}),e:T.kind==="single"||T.kind==="last"?T.dep:(T.end||T.leave),m:n.m};
if(di===SEL){steps.forEach(function(li,k){li.classList.toggle("now",k===i)});if(WH.setNow){WH.setNow(i);if(i!==lastNow){lastNow=i;if(i>=0)try{WH.go(i)}catch(e){}}}}
var nm=function(s){if(!s)return"";var t=stepTitle(T,s),pk=s.k==="meal"?mPickD(di,s):null;return pk?t+" · "+pk.n:t};
if(T.kind==="single"||T.kind==="last"){
var LV=(window.PARLIVE||{}).r,rdep=c.r_dep,gt=LV&&LV.gate?" · Gate "+LV.gate:"",rnum=c.r_num?" "+c.r_num:"";if(LV&&(LV.dR||LV.dS))rdep=LV.dR||LV.dS;
if(LV&&LV.st==="Canceled"){set("alert","Volo"+rnum+" cancellato","Controlla subito l'app o il sito della compagnia aerea.");return}
if(T.kind==="single"&&n.m<T.land){set("","Oggi si parte! ✈️",(c.a_num?"Volo "+c.a_num+". ":"")+"Atterraggio a "+A.n+" alle "+c.a_arr+".");return}
if(T.kind==="last"&&n.m<T.c0){set("calm","Ultimo giorno a "+PD.n,"Check-out entro le "+home().cout+". Decollo alle "+rdep+".");return}
var LEAVE=T.leave,R=T.items[T.items.length-1];
if(T.imb!=null&&n.m>=LEAVE+30&&n.m<T.imb){set("alert","Imbarco del volo"+rnum+" alle "+fmt(T.imb),"Tra "+fdur(T.imb-n.m)+". Decollo alle "+rdep+gt+".");return}
if(n.m>=LEAVE+R.d){set("calm","Buon volo"+rnum+"! ✈️","Il decollo è alle "+rdep+(T.imb!=null?", imbarco dalle "+fmt(T.imb):"")+gt+".");return}
if(n.m>=LEAVE){set("alert",T.kind==="last"&&R.ret.toHome?"È ora di prendere i bagagli":"È ora di andare in aeroporto",R.ret.txt+" Decollo alle "+rdep+gt+".");return}
if(LEAVE-n.m<=60){set("alert",(T.kind==="last"&&R.ret.toHome?"Torna all'alloggio per i bagagli tra ":"Parti per l'aeroporto tra ")+fdur(LEAVE-n.m),"Alle "+fmt(LEAVE)+". Decollo alle "+rdep+".");return}}
else{
if(T.kind==="first"&&n.m<T.land){set("","Oggi si parte! ✈️",(c.a_num?"Volo "+c.a_num+". ":"")+"Atterraggio a "+A.n+" alle "+c.a_arr+", poi in alloggio.");return}
if(T.kind==="mid"&&n.m<T.c0){set("calm","Buongiorno! Giorno "+(di+1),"Si parte alle "+fmt(T.c0)+(T.acts.length?": "+T.acts.map(function(id){return S[id].t}).join(", ")+".":"."));return}
var L=T.items[T.items.length-1];if(L.k==="night"&&n.m>=L.t+L.d){var nx=TRIP.days[di+1];set("calm","Buonanotte! 🌙",nx?"Domani si riparte alle "+fmt(nx.c0)+(nx.acts.length?" con "+S[nx.acts[0]].t+".":"."):"");return}}
var cur=T.items[i],nx2=T.items[i+1];
function acts(j,k){if(di!==SEL)return;var s=steps[k],l=s&&s.querySelector("a.go"),pk=T.items[j]&&T.items[j].k==="meal"?mPickD(di,T.items[j]):null,hr=pk?mGo(pk):(l?l.getAttribute("href"):""),h='<div class="lact"><button type="button" class="lb" data-j="'+j+'">Vai alla tappa</button>'+(hr?'<a class="lb lb2" href="'+esc(hr)+'" target="_blank" rel="noopener">🧭 Portami lì</a>':"")+'</div>';$(".lt",live).insertAdjacentHTML("beforeend",h)}
if(i<0){set("","Prima tappa: "+nm(T.items[0]),"Alle "+fmt(T.items[0].t)+", tra "+fdur(T.items[0].t-n.m));acts(0,0);return}
set("","Ora: "+nm(cur),nx2?"Prossima: "+nm(nx2)+" tra "+fdur(nx2.t-n.m):"");if(nx2&&nx2.t>cur.t){var pg=Math.max(0,Math.min(1,(n.m-cur.t)/(nx2.t-cur.t)));$(".lt",live).insertAdjacentHTML("beforeend",'<i class="lpg" aria-hidden="true"><i style="width:'+Math.round(pg*100)+'%"></i></i>')}acts(i,nx2?i+1:i)}
$("#live").addEventListener("click",function(e){var b=e.target.closest(".lb");if(!b||b.tagName==="A")return;if(b.classList.contains("lrecap")){window.__recap&&window.__recap();return}var s=$$("#steps .step")[+b.dataset.j];if(s)s.scrollIntoView({behavior:"smooth",block:"center"})});
function stepTitle(T,it){var keep=P;P=T;var h=stepHTML(it);P=keep;var m=/<h2>(.*?)<\/h2>/.exec(h);return m?m[1].replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"'):""}

/* avvisi e scioperi */
function avvList(){var c=CFG,res=[],last=TRIP.days[TRIP.n-1].date;
function inR(a,d){return d>=a.from&&d<=a.to}
PD.AVV.concat(window.AVV_IT||[]).forEach(function(a){var hit;
if(a.fa)hit=inR(a,c.date);
else if(a.fl){var apOK=function(ap){return !a.ap||a.ap.indexOf(ap)>=0};if(!apOK(c.to)&&!apOK(c.rt))return;hit=(apOK(c.to)&&inR(a,c.date))||(apOK(c.rt)&&inR(a,last));if(a.air)hit=(a.air.test(c.a_num||"")&&inR(a,c.date))||(a.air.test(c.r_num||"")&&inR(a,last))}
else hit=TRIP.days.some(function(d){if(!inR(a,d.date))return false;if(a.wd&&a.wd.indexOf(d.wd+1)<0)return false;if(a.ap&&a.ap.indexOf(c.to)<0&&a.ap.indexOf(c.rt)<0)return false;
 if(a.after!=null){var f=(d.kind==="single"||d.kind==="first")&&(d.land+d.A.inMin>=a.after-90),l=(d.kind==="single"||d.kind==="last")&&d.leave>=a.after-90;if(!f&&!l)return false}return true});
if(hit&&!res.some(function(r){return r.t===a.t}))res.push(a)});return res}
var AVVOPEN=false;
function moreHtml(h,open){return '<details class="more"'+(open?" open":"")+'><summary>Ulteriori informazioni<i aria-hidden="true">›</i></summary><div class="mb">'+h+'</div></details>'}window.moreHtml=moreHtml;
function renderAvv(){var el=$("#avv"),L=avvList(),tb=document.querySelector('.tg[data-p="avv"]'),nb=$("#tgavn");el.hidden=!L.length;if(tb)tb.hidden=!L.length;
if(!L.length){el.innerHTML="";if(window.__tgClose&&tb&&tb.getAttribute("aria-expanded")==="true")__tgClose();return}
if(nb)nb.textContent=L.length;
el.innerHTML='<div class="avl">'+L.map(function(a){return '<div class="avi"><b>'+esc(a.t)+'</b><p>'+esc(a.x)+'</p></div>'}).join("")+'</div>'}

/* meteo dei giorni del viaggio */
function wxKind(c){return c===0?["☀️","sun"]:c<=2?["🌤️","sun"]:c===3?["☁️","cloud"]:c<=48?["🌫️","fog"]:c<=67?["🌧️","rain"]:c<=77?["🌨️","snow"]:c<=82?["🌦️","rain"]:["⛈️","storm"]}
function meteo(){var me=$("#meteo"),c=CFG;if(!c)return;var d0=TRIP.days[0].date,d1=TRIP.days[TRIP.n-1].date,today=paris().d;
var maxD=addDays(today,15),key="via-met-"+d0+"_"+d1,sv=lj(key,null);
function clim(o){var rows=TRIP.days.map(function(d){var f=o&&o[d.date];return{d:d,f:f}});paint(rows)}
function paint(rows){var anyF=rows.some(function(r){return r.f}),rain=rows.some(function(r){return r.f&&(r.f.pp!=null?r.f.pp>=40:(r.f.c>=51&&r.f.c<=82))}),cold=rows.some(function(r){return r.f&&r.f.mn<10});
me.className="meteo"+(rain?" rain":"");var mo=dateObj(d0).getUTCMonth(),cl=PD.CLIM[mo];
if(TRIP.n===1||!anyF){var f=TRIP.n===1?rows[0].f:null;if(!f){me.innerHTML='<span class="mi">🌤️</span><div><b>Meteo a '+MESI[mo]+'</b><span>Di solito '+cl[0]+'° di giorno e '+cl[1]+'° la sera (medie indicative). Le previsioni vere compaiono qui circa due settimane prima.</span></div>'}
else{var k=wxKind(f.c);me.innerHTML='<span class="mi">'+k[0]+'</span><div><b>Previsioni per '+esc(dateLong(d0))+': '+Math.round(f.mx)+'° / '+Math.round(f.mn)+'°</b><span>'+(f.pp!=null?"Probabilità di pioggia "+f.pp+"%. ":"")+(rain?"Porta un ombrello. "+PD.T.rain1:"Giornata buona per camminare.")+(f.mn<10?" La sera fa fresco: una giacca leggera.":"")+'</span></div>'}}
else{me.innerHTML='<span class="mi">'+(anyF?wxKind(rows.filter(function(r){return r.f})[0].f.c)[0]:"🌤️")+'</span><div><b>'+(anyF?"Previsioni per i giorni del viaggio":"Meteo a "+MESI[mo])+'</b><ul class="mrows">'+rows.map(function(r){var o=dateObj(r.d.date);return '<li><span>'+DAB[r.d.wd]+' '+o.getUTCDate()+'</span>'+(r.f?'<i>'+wxKind(r.f.c)[0]+'</i><b>'+Math.round(r.f.mx)+'° / '+Math.round(r.f.mn)+'°</b><small>'+(r.f.pp!=null?"pioggia "+r.f.pp+"%":"")+'</small>':'<i>·</i><b>'+cl[0]+'° / '+cl[1]+'°</b><small>media</small>')+'</li>'}).join("")+'</ul><span>'+(rain?"Qualche giorno di pioggia: porta un ombrello. "+PD.T.rainM:anyF?"Giornate buone per camminare.":"Le previsioni vere compaiono qui circa due settimane prima.")+(cold?" La sera fa fresco.":"")+'</span></div>'}
if(window.PARRAIN!==rain){window.PARRAIN=rain;if(PREADY)renderConsigli()}}
if(d1<today||d0>maxD){clim(null);return}
if(sv)clim(sv);else clim(null);
if(!window.fetch)return;var s=d0<today?today:d0,e=d1>maxD?maxD:d1;
fetch("https://api.open-meteo.com/v1/forecast?latitude="+PD.LL[0]+"&longitude="+PD.LL[1]+"&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone="+encodeURIComponent(PD.TZ)+"&start_date="+s+"&end_date="+e).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var o={};d.daily.time.forEach(function(t,i){if(d.daily.weathercode[i]==null||d.daily.temperature_2m_max[i]==null)return;o[t]={c:d.daily.weathercode[i],mx:d.daily.temperature_2m_max[i],mn:d.daily.temperature_2m_min[i],pp:d.daily.precipitation_probability_max[i]}});ls(key,JSON.stringify(o));clim(o)}).catch(function(){})}
var PREADY=false;

/* ===== sezione voli (dati) ===== */
function renderVcost(){var box=$("#vcost");if(!box||!CFG)return;var c=CFG,N=c.ppl,o=COPT.vl||{},F=fromInfo(c),multi=N>1,m=o.m==="tot"&&multi?"tot":"pp";
var fld=function(k,t,sub){return '<label class="vcf"><span>'+t+(sub?'<small>'+sub+'</small>':'')+'</span><span class="vcin"><input type="number" inputmode="decimal" min="0" step="1" data-k="'+k+'" value="'+(+o[k]>0?o[k]:"")+'" placeholder="0" aria-label="'+esc(t)+'"><i>€</i></span></label>'};
box.innerHTML='<div class="vh2"><b>💶 Costo dei voli</b></div>'+(multi?'<div class="vcm" role="radiogroup" aria-label="Come hai inserito i prezzi"><button type="button" role="radio" data-m="pp" class="'+(m==="pp"?"on":"")+'" aria-checked="'+(m==="pp")+'">A persona</button><button type="button" role="radio" data-m="tot" class="'+(m==="tot"?"on":"")+'" aria-checked="'+(m==="tot")+'">Totale per '+N+'</button></div>':'')
+fld("a","Andata",(F.code||"")+" → "+esc(c.to))+fld("r","Ritorno",esc(c.rt||c.to)+" → "+(F.code||""))+fld("x","Extra","Bagagli, posti, imbarco prioritario")
+'<div class="vct"><span>Totale voli</span><span id="vctt"></span></div><p class="vcn">Le voci compaiono nella tabella dei Costi e nel PDF. Le trovi spuntabili anche lì.</p>';
function upd(){var R=flightRows(),pp=R.reduce(function(s,r){return s+r[2]},0);$("#vctt").textContent=pp?eur(pp*N)+(multi?" ("+eur(pp)+" a persona)":""):"—"}
function save(){COPT.vl=COPT.vl||{};ls("via-copt",JSON.stringify(COPT));upd();if(PREADY||true){renderCosti(false);renderSpese()}}
box.querySelectorAll("input").forEach(function(i){i.addEventListener("input",function(){COPT.vl=COPT.vl||{};var v=parseFloat(String(i.value).replace(",","."));COPT.vl[i.dataset.k]=v>0?Math.round(v*100)/100:0;save()})});
box.querySelectorAll(".vcm button").forEach(function(b){b.addEventListener("click",function(){COPT.vl=COPT.vl||{};COPT.vl.m=b.dataset.m;ls("via-copt",JSON.stringify(COPT));renderVcost();renderCosti(false);renderSpese()})});
upd()}

function renderVoli(){var c=CFG,A=TRIP.A,RA=TRIP.R||A,F=fromInfo(c),DL=TRIP.days[TRIP.n-1],fr=function(n){return n?'<a class="vch" target="_blank" rel="noopener" href="https://www.flightradar24.com/data/flights/'+encodeURIComponent(n.replace(/\s+/g,"").toLowerCase())+'">Flightradar24 ↗︎</a>':""};
function card(side){var a=side==="a",num=a?c.a_num:c.r_num,o=a?F.code||"—":(c.rt||c.to),d=a?c.to:F.code||"—",dt=a?c.date:(c.date_r||c.date);
var rows=a?[["Data",cap(dateLong(dt))],["Numero volo",num||"—"],["Partenza",c.a_dep||"—"],["Atterraggio a "+PD.n,c.a_arr]]:[["Data",cap(dateLong(dt))],["Numero volo",num||"—"],["Apertura imbarco",c.r_imb||"—"],["Partenza",c.r_dep]];
var lk=a?[[F.url,"🛫 Partenze "+F.name],[A.url,"🛬 Arrivi "+A.n]]:[[RA.url,"🛫 Partenze "+RA.n],[F.url,"🛬 Arrivi "+F.name]];
var nr=rows.length;rows=rows.filter(function(r){return r[1]&&r[1]!=="—"});var miss=rows.length<nr;
return '<div class="vcard"><div class="vleg"><span class="iata">'+esc(o==="—"?"?":o)+'</span><i class="pl">✈︎</i><span class="iata">'+esc(d==="—"?"?":d)+'</span> '+(a?"Andata":"Ritorno")+'</div>'+rows.map(function(r){return '<div class="vrw"><span>'+r[0]+'</span><b>'+esc(r[1])+'</b></div>'}).join("")+'<div class="vlinks">'+lk.filter(function(x){return x[0]}).map(function(x){return '<a class="vch" target="_blank" rel="noopener" href="'+esc(x[0])+'">'+esc(x[1])+' ↗︎</a>'}).join("")+fr(num)+'</div>'+(miss?'<button type="button" class="vadd" data-edit="1">＋ Aggiungi numero volo e orari</button>':'')+'</div>'}
$("#vgrid").innerHTML=card("a")+card("r");var vs=$("#vsum");if(vs){var pp=[];if(c.a_arr)pp.push("Andata · arrivo "+c.a_arr);if(c.r_dep)pp.push("Ritorno · partenza "+c.r_dep);vs.textContent=pp.join("  ·  ")||"Orari e aeroporti"}
var vt=document.querySelector('.tg[data-p="voli"]');if(vt){var ti=todayIdx();vt.classList.toggle("hot",ti===0||ti===TRIP.n-1)}$$("#vgrid [data-edit]").forEach(function(b){b.addEventListener("click",function(){openSetup(false,+b.dataset.edit||0)})});
renderVcost();
$("#vtips").innerHTML='<details><summary>🛬 Dall\'aeroporto di '+esc(A.n)+(TRIP.multi?' all\'alloggio':' al centro')+'</summary><ul><li>'+esc(A.arr)+'</li><li>'+esc(A.tk)+'</li>'+(PD.fx.voliTip?PD.fx.voliTip(E):(A.vt?'<li>'+esc(A.vt)+'</li>':''))+'</ul></details><details><summary>🛫 Ritorno in aeroporto'+(RA!==A?' ('+esc(RA.n)+')':'')+'</summary><ul>'+(RA!==A?'<li>Il volo di ritorno parte da '+esc(RA.n)+', non da '+esc(A.n)+'. '+esc(RA.tk)+'</li>':'')+'<li>'+(TRIP.multi?"L'ultimo giorno parti alle "+fmt(DL.leave)+". ":"Parti dall'ultima tappa alle "+fmt(DL.leave)+". ")+esc(DL.items[DL.items.length-1].ret.txt)+'</li><li>Calcolo l\'arrivo in aeroporto almeno '+fdur(RA.buf)+' prima del decollo'+(DL.imb!=null?' e 45 minuti prima dell\'apertura dell\'imbarco':'')+'.</li></ul></details>'}

/* ===== pasti ===== */
var MEALS=lj("via-meals",{}),PS={open:{},menu:null,fil:false,hrow:false,foc:{},add:null,pop:null,anim:"",L:[],day:-1,geo:null,gt:0,hh:""};
function mSave(){var e=!(MEALS.h&&MEALS.h.length);["c","o","s","r","v"].forEach(function(k){if(Object.keys(MEALS[k]||{}).length)e=false});ls("via-meals",e?null:JSON.stringify(MEALS));try{WH.paint&&WH.paint()}catch(x){}}
function mHid(id){return !!(MEALS.h&&MEALS.h.indexOf(id)>=0)}
function mFind(id){if(V[id])return V[id];var r=null;Object.keys(MEALS.o||{}).forEach(function(k){MEALS.o[k].forEach(function(x){if(x.id===id)r=x})});return r}
function mKeyOf(it){return it.k==="snk"?"snk":it.m}
function mPickD(di,it){var id=MEALS.c&&MEALS.c[di+"|"+mKeyOf(it)];return id?mFind(id):null}
function mPick(it){return mPickD(P.i,it)}
function mRes(di,it){return (MEALS.r&&MEALS.r[di+"|"+mKeyOf(it)])||""}
function mGo(v){return v.own?(/^https?:\/\//i.test(v.l||"")?v.l:gdir(v.l||v.n,"walking")):gdir(vq(v),"walking")}
function mTime(di,it){var n=paris();return TRIP.days[di].date===n.d?Math.max(it.t,n.m):it.t}
function mOrig(di,it){try{var n=paris();if(PS.geo&&Date.now()-PS.geo.t<6e5&&TRIP.days[di].date===n.d)return{pos:PS.geo.p,l:"da dove sei"};
var d=TRIP.days[di],i=d.items.indexOf(it),k,x;for(k=i-1;k>=0;k--){x=d.items[k];if(x.k==="act"&&S[x.id])return{pos:S[x.id].pos,l:"dalla tappa prima"};if(x.k==="home"&&TRIP.multi)return{pos:home().pos,l:"dall'alloggio"}}
return{pos:TRIP.multi?home().pos:PD.START,l:TRIP.multi?"dall'alloggio":"dal punto di arrivo"}}catch(e){return{pos:null,l:""}}}
function mWalk(v,o){return v&&!v.own&&v.pos&&o&&o.pos?access(o.pos,v.pos):null}
function mWalkTxt(w,o){return w?(w.mode==="walk"?"🚶 ":"🚇 ")+w.min+" min "+o.l:""}
function mWarn(di,it,v,o){if(!v||v.own||!v.h)return"";var w=mWalk(v,o),ar=mTime(di,it)+(w?w.min:0),st=vStat(v,TRIP.days[di].wd,ar);if(st.c==="ok")return"";return "⚠️ "+st.t+" · ci arrivi verso le "+fmt(ar)}
window.PAR.mealInfo=function(di,it){var v=mPickD(di,it);if(!v)return null;return{n:v.n,res:mRes(di,it),warn:mWarn(di,it,v,mOrig(di,it)).replace("⚠️ ","")}};
function mPickBlock(it,first){var v=mPick(it);if(v){var r=mRes(P.i,it),w=mWarn(P.i,it,v,mOrig(P.i,it));return '<p class="pickl">✓ Hai scelto <b>'+esc(v.n)+'</b>'+(r?' · 📅 prenotato alle '+esc(r):'')+'</p>'+(w?'<p class="pmw">'+esc(w)+'</p>':'')+'<a class="go" href="'+esc(mGo(v))+'" target="_blank" rel="noopener"><span>🚶</span> Portami lì</a>'}return first?goBtn(vq(first.v),"walking","Portami lì","🚶"):""}
/* spesa stimata in Costi */
var PCAT={col:"co",pra:"pr",cen:"ce",snk:"sp"};
function mPrice(v){var m=/(\d+(?:[.,]\d+)?)\s*(?:[–-]\s*(\d+(?:[.,]\d+)?))?\s*€/.exec(v.pr||"");if(!m)return 0;var a=parseFloat(m[1].replace(",",".")),b=m[2]?parseFloat(m[2].replace(",",".")):a;return Math.round((a+b)/2*100)/100}
function mExpDel(key){var n0=(SP.x||[]).length;SP.x=(SP.x||[]).filter(function(x){return x.mk!==key});return SP.x.length!==n0}
function mExpSet(key,v,mm){var ch=mExpDel(key),p=v&&!v.own?mPrice(v):0,add=false;if(p>0&&CFG){SP.x.push({id:"mk"+key.replace(/\W/g,""),d:(MN[mm]||"Spuntino")+" · "+v.n+" (stima)",a:Math.round(p*(CFG.ppl||1)*100)/100,p:0,w:null,m:"eq",c:PCAT[mm]||"ex",t:Date.now(),mk:key});add=true}
if(ch||add){saveSP();try{renderCosti(false);renderSpese()}catch(e){}}return add}
/* elenco pasti del giorno */
function pmeals(){var out=[];P.items.forEach(function(x){if(x.k!=="meal"&&x.k!=="snk")return;var sn=x.k==="snk",mm=sn?"snk":x.m,ids=sn?(PD.MEAL.snk[x.z]||(x.z==="X"?null:PD.MEAL.snk.A)):mealIds(x.m,x.z),key=P.i+"|"+mm;
out.push({it:x,mm:mm,key:key,ids:ids,ttl:sn?"Ultimo assaggio":mealTitle(x),nm:sn?"Assaggio":MN[x.m],hotel:!!x.hotel,sel:!x.hotel&&!!ids,done:!!(MEALS.s&&MEALS.s[key])})});return out}
function pHero(L){var n=paris(),td=TRIP.days[SEL].date===n.d,i;if(td)for(i=0;i<L.length;i++)if(L[i].sel&&!L[i].done&&L[i].it.t+(L[i].it.d||45)>n.m)return i;for(i=0;i<L.length;i++)if(L[i].sel&&!L[i].done)return i;return -1}
function pList(m){var di=P.i,pl=prefList(m.ids,WD,mTime(di,m.it),m.mm,m.it.z);
if(!fprefOn()&&ST.th!=="eno"){var o=mOrig(di,m.it),so={ok:0,mid:1,ko:2};pl.main=pl.main.map(function(x,i){var w=mWalk(x.v,o);x.w=w?w.min:99;x.i0=i;return x}).sort(function(a,b){return so[a.s.c]-so[b.s.c]||a.w-b.w||a.i0-b.i0})}return pl}
function pStat(o){return '<span class="st '+o.s.c+'">'+(o.s.c==="ok"?"✓ ":o.s.c==="ko"?"⚠️ ":"⏱ ")+esc(o.s.t)+'</span>'}
function pStatTxt(o){return (o.s.c==="ok"?"✓ ":o.s.c==="ko"?"⚠️ ":"⏱ ")+esc(o.s.t)}
function pMeta(v,wd){return (v.r?'<span>★ '+esc(String(v.r))+'</span>':'')+(v.h&&v.h.length?'<span>🕐 '+esc(hrsTxt(v,wd))+'</span>':'')}
function pBook(m,v){if(!v||v.own||(m.mm!=="pra"&&m.mm!=="cen"))return"";var r=parseFloat(String(v.r).replace(",","."));return (r>=4.6||/prenot/i.test((v.d||"")+" "+(v.pr||"")))?'<p class="pmbk">📅 Meglio prenotare: è molto apprezzato e può esserci fila (indicazione di massima).</p>':""}
function pMore(m){var o=mOrig(P.i,m.it),k=m.mm==="col"?"breakfast cafe":m.mm==="snk"?"snack":"restaurant",loc=o.pos?o.pos.join(","):PD.hub.n+" "+PD.n;return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(fpWords()+(FP.p===1?"cheap ":FP.p===2?"affordable ":"")+k+" near "+loc)}
function pBanner(L,hi){if(hi<0)return"";var m=L[hi],di=P.i,n=paris(),td=TRIP.days[SEL].date===n.d,ch=MEALS.c&&MEALS.c[m.key],v=ch&&mFind(ch),og=mOrig(di,m.it),
lk=(td?(m.it.t<=n.m?"Adesso":"Prossimo"):(hi===0?"Primo pasto":"Pasto"))+" · "+m.nm+(td&&m.it.t>n.m?" alle "+fmt(m.it.t):""),warn=v?mWarn(di,m.it,v,og):"";
return '<div class="pban"><div class="pbx"><small>'+esc(lk)+'</small><b>'+(v?esc(v.n):"Da scegliere")+'</b></div>'+(v?'<a class="pbb" href="'+esc(mGo(v))+'" target="_blank" rel="noopener">Portami lì</a>':'<button type="button" class="pbb" data-a="open" data-k="'+esc(m.key)+'">Scegli</button>')+'</div>'+(warn?'<p class="pmw">'+esc(warn)+'</p>':'')}
function pVsub(o,v,og){var w=mWalk(v,og);return (w?w.min+" min · ":"")+(v.r?"★ "+v.r+" · ":"")+(o?o.s.t:"")}
function pRow(m,id,o,og){var ch=MEALS.c&&MEALS.c[m.key],v=mFind(id);if(!v)return"";var sb=v.own?(v.d||"Il tuo posto"):pVsub(o,v,og);
return '<div class="pvr'+(ch===id?" on":"")+(o&&o.s.c==="ko"?" ko":"")+(PS.pop===id?" pop":"")+'" data-vid="'+esc(id)+'"><button type="button" class="pk" data-a="pick" data-k="'+esc(m.key)+'" data-v="'+esc(id)+'" aria-pressed="'+(ch===id)+'"><i class="rd" aria-hidden="true"></i><span><b>'+esc(v.n)+'</b><span class="psb">'+esc(sb)+'</span></span></button><button type="button" class="mo" data-a="more" data-k="'+esc(m.key)+'" data-v="'+esc(id)+'" aria-label="Altro su '+esc(v.n)+'" aria-haspopup="dialog">⋯</button></div>'}
function pDet(m,fo,o,og,pl){var di=P.i,v=mFind(fo),ch=MEALS.c&&MEALS.c[m.key],res=mRes(di,m.it),warn=ch===fo?mWarn(di,m.it,v,og):"",q=v.own?"":vq(v),w=mWalk(v,og);
return '<div class="pdt'+(PS.anim==="d"||PS.anim==="h"?" in":"")+'"><div class="vhd"><b>'+(v.own?esc(v.n):'<a target="_blank" rel="noopener" href="'+esc(PD.G(q))+'">'+esc(v.n)+'</a>')+'</b>'+(ch===fo?'<span class="tag ok">Scelto</span>':'')+'</div>'+
(v.own?'<p>'+esc(v.d||"")+'</p>'+(v.l&&!/^https?:\/\//i.test(v.l)?'<p class="dm">'+esc(v.l)+'</p>':''):'<p class="dm">'+esc((w?w.min+" min "+og.l+" · ":"")+(o?o.s.t:"")+" · ★ "+v.r+" · "+hrsTxt(v,WD))+'</p><p>'+esc(v.a)+'. '+esc(v.d)+' '+esc(v.pr)+'</p>'+fbadge(fo,o&&o.extra)+pBook(m,v))+
(warn?'<p class="pmw">'+esc(warn)+'</p>':'')+
(ch===fo?'<label class="pmr"><span>📅 Prenotazione</span><input type="time" data-a="res" data-k="'+esc(m.key)+'" value="'+esc(res)+'" aria-label="Orario della prenotazione"></label>':'')+
'<div class="prw">'+(ch===fo?'<a class="pbt" href="'+esc(mGo(v))+'" target="_blank" rel="noopener">Portami lì</a><button type="button" class="pbt s" data-a="un" data-k="'+esc(m.key)+'">Togli</button>':'<button type="button" class="pbt" data-a="pick" data-k="'+esc(m.key)+'" data-v="'+esc(fo)+'">Scelgo questo</button><a class="pbt s" href="'+esc(mGo(v))+'" target="_blank" rel="noopener">Portami lì</a>')+'<button type="button" class="pbt ib" data-a="more" data-k="'+esc(m.key)+'" data-v="'+esc(fo)+'" aria-label="Altro" aria-haspopup="dialog">⋯</button></div></div>'}
function pBody(m,i,hi,last){var di=P.i,h="",ch=MEALS.c&&MEALS.c[m.key];
if(PS.pre&&PS.pre[m.key]&&!(PS.hrow&&i===hi))h+=pBw(PS.pre[m.key],"pre|"+m.key,"","in");
if(m.hotel)h+='<div class="ptx">'+hotelBf()+'</div>';
else if(!m.ids)h+='<div class="ptx pnear">'+nearBox(m.mm==="snk"?"snk":m.mm)+'</div>';
else{var pl=pList(m),og=mOrig(di,m.it),own=(MEALS.o&&MEALS.o[m.key])||[],fo=PS.foc[m.key]||ch,hid=m.ids.filter(mHid).length,all=pl.main.concat(pl.rest),byId={};all.forEach(function(o){byId[o.id]=o});
var rows=own.map(function(x){return x.id}).concat(pl.main.map(function(o){return o.id})).filter(function(id){return id!==fo});
if(fo&&mFind(fo))h+=pDet(m,fo,byId[fo],og,pl)+(rows.length?'<span class="pmt2">Altre opzioni</span>':'');
h+=rows.map(function(id){return pRow(m,id,byId[id],og)}).join("");
if(!rows.length&&!(fo&&mFind(fo)))h+='<p class="pmhint">Nessun locale con questi filtri.</p>';
if(pl.rest.length)h+='<details class="fprest"><summary>Altri '+pl.rest.length+' locali (non adatti o da verificare)</summary>'+pl.rest.filter(function(o){return o.id!==fo}).map(function(o){return pRow(m,o.id,o,og)}).join("")+'</details>';
if(PS.add===m.key)h+='<form class="pmf" data-k="'+esc(m.key)+'"><label>Nome<input name="n" autocomplete="off" maxlength="60" placeholder="Per esempio: Da Enzo al 29"></label><label>Link o indirizzo<input name="l" autocomplete="off" maxlength="300" placeholder="Link di Google Maps o via"></label><label>Nota<input name="t" autocomplete="off" maxlength="140" placeholder="Prenotato per le 13"></label><div class="prw"><button class="pbt" type="submit">Aggiungi</button><button class="pbt g" type="button" data-a="adc">Annulla</button></div></form>';
else h+='<div class="prw pft"><button type="button" class="padd" data-a="addo" data-k="'+esc(m.key)+'">+ Un posto tuo</button>'+(hid?'<span class="pmhid">'+hid+(hid===1?" nascosto":" nascosti")+' <button type="button" data-a="unhide" data-k="'+esc(m.key)+'">Ripristina</button></span>':'')+(rows.length||fo?'':'<a class="padd" href="'+esc(pMore(m))+'" target="_blank" rel="noopener">🔎 Cerca altri locali qui</a>')+'</div>';
if(m.it.k==="meal"&&PD.ORD&&PD.ORD[m.mm])h+='<details class="pmo"><summary>🍽️ Cosa ordinare</summary>'+ordBox(m.mm)+'</details>'}
if(last&&PS.post&&PS.post.length)h+='<h3 class="pmsub">Dopo questo pasto</h3>'+PS.post.map(function(x,j){return pBw(x,"post|"+j,"","in")}).join("");
return h}
function pRep(v){var a=(($("#hlmail")||{}).getAttribute&&$("#hlmail").getAttribute("href"))||"",ad=a.indexOf("mailto:")===0?a.slice(7).split("?")[0]:"";if(!ad)return"";
return [["Chiuso per sempre","Il locale risulta chiuso definitivamente"],["Orari diversi","Gli orari indicati non sono corretti"],["Prezzo diverso","Il prezzo indicato non è corretto"],["Altro","Altro problema"]].map(function(x){return '<a class="pmi psub" role="menuitem" href="'+esc("mailto:"+ad+"?subject="+encodeURIComponent("Viaticum · segnalazione locale: "+v.n)+"&body="+encodeURIComponent("Locale: "+v.n+" ("+v.a+", "+PD.n+")\nProblema: "+x[1]+"\n\nDettagli (facoltativi): "))+'">'+esc(x[0])+'</a>'}).join("")}
function pBw(s,id,small,cls){var mt=/<small>([\s\S]*?)<\/small><b>([\s\S]*?)<\/b>/.exec(s);return '<details class="btwd'+(cls?" "+cls:"")+'" data-b="'+esc(id)+'"'+(PS.bo&&PS.bo[id]?" open":"")+'><summary><span class="btwi">'+(/🌙/.test(s.slice(0,120))?"🌙":"⏳")+'</span><span class="bs"><small>'+(small||(mt?mt[1]:""))+'</small><b>'+(mt?mt[2]:"")+'</b></span></summary>'+s+'</details>'}
function pDraw(){var g=$("#mgrid"),L=PS.L;if(!g||!L.length)return;L.forEach(function(x){x.done=!!(MEALS.s&&MEALS.s[x.key])});var hi=pHero(L),y=window.scrollY,nw=paris(),hm=hi>=0?L[hi]:null,
h=pBanner(L,hi);PS.hh=h;PS.hrow=!!(hm&&PS.pre&&PS.pre[hm.key]&&TRIP.days[SEL].date===nw.d&&hm.it.t>nw.m);
if(PS.hrow)h+='<div class="pmnow">'+pBw(PS.pre[hm.key],"hero|"+hm.key,"Nel frattempo · tra "+fdur(hm.it.t-nw.m)+" si mangia")+'</div>';
L.forEach(function(m,i){var op=!!PS.open[m.key],ch=MEALS.c&&MEALS.c[m.key],v=ch&&mFind(ch),sb,pl;
if(m.done)sb="✓ Già fatto";else if(v)sb="✓ "+v.n;else if(m.hotel)sb="Colazione in hotel";else if(!m.ids)sb="Vicino all'alloggio";else{pl=pList(m);sb="Da scegliere · "+(pl.main.length+((MEALS.o&&MEALS.o[m.key])||[]).length)+" locali"}
h+='<section class="pmrow'+(op?" op":"")+'" data-row="'+esc(m.key)+'"><button type="button" class="prh" data-a="tg" data-k="'+esc(m.key)+'" aria-expanded="'+op+'"><span class="ptm">'+fmt(m.it.t)+'</span><span><b>'+esc(m.nm)+(i===hi&&TRIP.days[SEL].date===nw.d&&m.it.t<=nw.m?" · adesso":"")+'</b><span class="psb'+((v||m.done)?" ok":"")+'">'+esc(sb)+'</span></span><i class="cv" aria-hidden="true"></i></button>'+(op?'<div class="prb">'+pBody(m,i,hi,i===L.length-1)+'</div>':'')+'</section>'});
g.innerHTML=h;window.scrollTo(0,y);PS.anim="";PS.pop=null;pOv()}
function pChoose(k,v){var m=PS.L.filter(function(x){return x.key===k})[0];MEALS.c[k]=v;PS.pop=v;PS.foc[k]=v;PS.anim="h";delete MEALS.s[k];mSave();var o=mFind(v),ex=mExpSet(k,o,m.mm);pDraw();renderItin();if(o)toast("Scelto: "+o.n+(ex?" · spesa stimata aggiunta":""))}
function pUn(k){delete MEALS.c[k];delete MEALS.r[k];PS.anim="h";mSave();if(mExpDel(k)){saveSP();try{renderCosti(false);renderSpese()}catch(e){}}pDraw();renderItin()}
function pAct(a,k,v){var m=PS.L.filter(function(x){return x.key===k})[0];MEALS.c=MEALS.c||{};MEALS.o=MEALS.o||{};MEALS.s=MEALS.s||{};MEALS.r=MEALS.r||{};
if(a==="tg"){PS.open[k]=!PS.open[k];pDraw();return}
if(a==="open"){PS.open[k]=true;pDraw();var r=document.querySelector('[data-row="'+k+'"]');if(r)r.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:"start"});return}
if(a==="pick"){if(MEALS.c[k]===v)pUn(k);else pChoose(k,v);return}
if(a==="un"){pUn(k);return}
if(a==="more"){PS.menu={k:k,v:v,rep:false};pOv();return}
if(a==="xm"){PS.menu=null;PS.fil=false;pOv();return}
if(a==="det"){PS.foc[k]=v;PS.open[k]=true;PS.menu=null;PS.anim="d";pDraw();return}
if(a==="rep"){PS.menu.rep=!PS.menu.rep;pOv();return}
if(a==="addo"){PS.add=k;PS.open[k]=true;pDraw();var f=document.querySelector(".pmf input");if(f)f.focus();return}
if(a==="adc"){PS.add=null;pDraw();return}
if(a==="done"){PS.menu=null;if(MEALS.s[k]){delete MEALS.s[k]}else{MEALS.s[k]=1;PS.open[k]=false}PS.anim="h";mSave();pDraw();toast(MEALS.s[k]?"Segnato come fatto":"Rimesso in lista");return}
if(a==="unhide"){MEALS.h=(MEALS.h||[]).filter(function(id){return (m.ids||[]).indexOf(id)<0});mSave();pDraw();renderItin();toast("Locali ripristinati");return}
if(a==="hide"||a==="rm"){PS.menu=null;pOv();var el=document.querySelector('.pvr[data-vid="'+v+'"]');var done=function(){if(a==="hide"){MEALS.h=MEALS.h||[];if(MEALS.h.indexOf(v)<0)MEALS.h.push(v)}else{MEALS.o[k]=(MEALS.o[k]||[]).filter(function(x){return x.id!==v})}
Object.keys(MEALS.c).forEach(function(kk){if(MEALS.c[kk]===v){delete MEALS.c[kk];delete MEALS.r[kk];mExpDel(kk);saveSP()}});delete PS.foc[k];PS.anim="h";mSave();pDraw();try{renderCosti(false);renderSpese()}catch(e){}renderItin();toast(a==="hide"?"Nascosto. Lo ritrovi sotto con «Ripristina»":"Rimosso")};
if(el&&!matchMedia("(prefers-reduced-motion:reduce)").matches){el.classList.add("out");setTimeout(done,200)}else done()}}
/* menu ⋯ e filtri: fogli dal basso */
var FOPT={d:[["veg","🥦","Vegetariano"],["vegan","🌱","Vegano"],["gf","🌾","Senza glutine"]],p:[["0","💶","Qualsiasi"],["1","€","Economico"],["2","€€","Medio o meno"]]};
function pOv(){var o=$("#pov");if(!o){o=document.createElement("div");o.id="pov";document.body.appendChild(o)}var h="",s=PS.menu,had=o.firstChild;
if(s){var m=PS.L.filter(function(x){return x.key===s.k})[0],v=mFind(s.v),own=v&&v.own,ch=MEALS.c&&MEALS.c[s.k];
if(m&&v)h='<div class="pbg" data-a="xm"></div><div class="psh" role="dialog" aria-label="Azioni su '+esc(v.n)+'"><i class="hd" aria-hidden="true"></i><div class="pst"><b>'+esc(v.n)+'</b><button type="button" data-a="xm" aria-label="Chiudi">✕</button></div>'+
(((PS.foc[s.k]||ch)!==s.v)?'<button type="button" class="pmi" role="menuitem" data-a="det" data-k="'+esc(s.k)+'" data-v="'+esc(s.v)+'">ℹ️ Dettagli</button>':'')+
'<a class="pmi" role="menuitem" href="'+esc(mGo(v))+'" target="_blank" rel="noopener">🧭 Portami lì</a>'+
'<button type="button" class="pmi" role="menuitem" data-a="'+(own?"rm":"hide")+'" data-k="'+esc(s.k)+'" data-v="'+esc(s.v)+'">'+(own?"🗑️ Rimuovi questo posto":"🙈 Nascondi questo locale")+'</button>'+
'<button type="button" class="pmi" role="menuitem" data-a="done" data-k="'+esc(s.k)+'">'+(m.done?"↩︎ Rimetti il pasto in lista":"✅ Segna il pasto come fatto")+'</button>'+
(own?'':'<button type="button" class="pmi" role="menuitem" data-a="rep" aria-expanded="'+!!s.rep+'">🚩 Segnala un errore</button>'+(s.rep?pRep(v):''))+
'<a class="pmi" role="menuitem" href="'+esc(pMore(m))+'" target="_blank" rel="noopener">🔎 Cerca altri locali qui</a></div>'}
else if(PS.fil){h='<div class="pbg" data-a="xm"></div><div class="psh" role="dialog" aria-label="Filtri"><i class="hd" aria-hidden="true"></i><div class="pst"><b>Filtra i locali</b><button type="button" data-a="xm" aria-label="Chiudi">✕</button></div><h4>Alimentazione</h4><div class="pfc">'+FOPT.d.map(function(x){return '<button type="button" class="'+(FP.d.indexOf(x[0])>=0?"on":"")+'" data-a="fd" data-v="'+x[0]+'" aria-pressed="'+(FP.d.indexOf(x[0])>=0)+'">'+x[1]+" "+x[2]+'</button>'}).join("")+'</div>'+(FP.d.indexOf("gf")>=0?'<p class="pmn">Per celiachia e allergie chiedi sempre al locale: da qui non posso verificare contaminazioni e ingredienti.</p>':'')+'<h4>Prezzo</h4><div class="pfc">'+FOPT.p.map(function(x){return '<button type="button" class="'+(FP.p===+x[0]?"on":"")+'" data-a="fp" data-v="'+x[0]+'" aria-pressed="'+(FP.p===+x[0])+'">'+x[1]+" "+x[2]+'</button>'}).join("")+'</div><h4>Gusti</h4><div class="pfc">'+Object.keys(FKN).map(function(k){return '<button type="button" class="'+(FP.k.indexOf(k)>=0?"on":"")+'" data-a="fk" data-v="'+k+'" aria-pressed="'+(FP.k.indexOf(k)>=0)+'">'+FKE[k]+" "+FKN[k]+'</button>'}).join("")+'</div><p class="pmn">«Da chiedere» significa che di solito ci sono opzioni, ma non è confermato. La fascia di prezzo è relativa alla città.</p><div class="prw"><button type="button" class="pbt" data-a="xm">Fatto</button>'+(fprefOn()?'<button type="button" class="pbt g" data-a="fz">Azzera</button>':'')+'</div></div>'}
var same=!!had===!!h;o.innerHTML=h;if(h&&!same){var f=$(".pmi,.pfc button",o);if(f)try{f.focus({preventScroll:true})}catch(e){}}}
function pFilt(a,v){if(a==="fd"){var i=FP.d.indexOf(v);if(i>=0)FP.d.splice(i,1);else FP.d.push(v)}else if(a==="fp")FP.p=+v;else if(a==="fk"){var k=FP.k.indexOf(v);if(k>=0)FP.k.splice(k,1);else FP.k.push(v)}else{FP.d=[];FP.p=0;FP.k=[]}
ls("via-fp",fprefOn()?JSON.stringify(FP):null);pFpaint();if(CFG&&P){renderItin();renderPasti()}}
function pFpaint(){var b=$("#fbtn");if(!b)return;var n=(FP.d.length?1:0)+(FP.p?1:0)+(FP.k.length?1:0),c=$(".fbn",b);c.hidden=!n;c.textContent=n||"";b.classList.toggle("on",n>0);pOv()}
function pGeo(){if(!navigator.geolocation||!navigator.permissions||Date.now()-PS.gt<12e4||!TRIP||!TRIP.days[SEL]||TRIP.days[SEL].date!==paris().d)return;PS.gt=Date.now();
navigator.permissions.query({name:"geolocation"}).then(function(p){if(p.state!=="granted")return;navigator.geolocation.getCurrentPosition(function(r){var q=[r.coords.latitude,r.coords.longitude],s=PD.START;if(s&&hav(q,s)>40)return;PS.geo={p:q,t:Date.now()};var t=$("#t-mangiare");if(t&&t.checked&&!PS.add&&!PS.menu&&!PS.fil)pDraw()},function(){},{maximumAge:120000,timeout:8000})}).catch(function(){})}
(function(){var g=$("#mgrid");if(!g)return;
function click(e){var b=e.target.closest("[data-a]");if(!b||b.tagName==="INPUT"||b.tagName==="A")return;e.preventDefault();var a=b.dataset.a;if(a==="fd"||a==="fp"||a==="fk"||a==="fz"){pFilt(a,b.dataset.v);return}pAct(a,b.dataset.k,b.dataset.v)}
g.addEventListener("click",function(e){if(g.contains(e.target))click(e)});
document.addEventListener("click",function(e){var o=$("#pov");if(o&&o.contains(e.target))click(e)});
var fb=$("#fbtn");if(fb)fb.addEventListener("click",function(){PS.fil=true;PS.menu=null;pOv()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&(PS.menu||PS.fil)){var f=PS.fil;PS.menu=null;PS.fil=false;pOv();if(f&&fb)fb.focus()}});
g.addEventListener("toggle",function(e){var d=e.target;if(d.classList&&d.classList.contains("btwd")&&d.dataset.b){PS.bo=PS.bo||{};PS.bo[d.dataset.b]=d.open}},true);
g.addEventListener("change",function(e){var i=e.target.closest("input[data-a=res]");if(!i)return;MEALS.r=MEALS.r||{};if(i.value)MEALS.r[i.dataset.k]=i.value;else delete MEALS.r[i.dataset.k];mSave();PS.anim="h";pDraw();renderItin();toast(i.value?"Prenotazione salvata: "+i.value:"Prenotazione tolta")});
g.addEventListener("submit",function(e){var f=e.target.closest(".pmf");if(!f)return;e.preventDefault();var k=f.dataset.k,n=f.n.value.trim();if(!n){f.n.focus();f.classList.remove("shk");void f.offsetWidth;f.classList.add("shk");return}
var id="u"+Date.now().toString(36);MEALS.o=MEALS.o||{};(MEALS.o[k]=MEALS.o[k]||[]).unshift({id:id,n:n,l:f.l.value.trim(),d:f.t.value.trim(),own:1});MEALS.c=MEALS.c||{};MEALS.c[k]=id;PS.foc[k]=id;PS.add=null;PS.pop=id;PS.anim="h";mSave();mExpDel(k);saveSP();pDraw();renderItin();toast("Aggiunto: "+n)});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest(".fplink");if(!a)return;e.preventDefault();var t=$("#t-mangiare");if(t){t.checked=true;t.dispatchEvent(new Event("change",{bubbles:true}))}setTimeout(function(){PS.fil=true;PS.menu=null;pOv()},120)});
setInterval(function(){if(document.hidden||!TRIP||!P||!PS.L.length)return;var t=$("#t-mangiare");if(!t||!t.checked||PS.add||PS.menu||PS.fil)return;pGeo();var a=document.activeElement;if(a&&a.closest&&a.closest("#mgrid")&&/INPUT/.test(a.tagName))return;if(pBanner(PS.L,pHero(PS.L))!==PS.hh){PS.anim="h";pDraw()}},60000);
PAR.fpPaint=pFpaint})();
function renderPasti(){var hb=$("#hbt");if(hb){hb.hidden=!(TRIP&&TRIP.multi);$("#hbc").checked=COPT.hb===1}if(PD.T.mcrit)$("#mcrit").textContent=PD.T.mcrit;var it=P.items,meals=it.filter(function(x){return x.k==="meal"||x.k==="snk"}),h="";
$("#mlead").textContent=TRIP.multi?"Giorno "+(P.i+1)+", "+dateLong(P.date)+": scegli dove mangiare e, nel mezzo, cosa assaggiare lungo il percorso.":"Scegli dove mangiare: i pasti in ordine e, nel mezzo, cosa assaggiare lungo il percorso.";
if(!meals.length){$("#mgrid").innerHTML='<p class="meta">Con questi orari non ci sono pasti in città.</p>';return}
var acts=function(a,b){return it.filter(function(x){return x.k==="act"&&x.t>a&&x.t<b})};
var L=pmeals(),pre={},post=[],prevT=P.c0;
meals.forEach(function(m,mi){var between=acts(prevT,m.t);
if(mi>0||(!P.B&&between.length))pre[L[mi].key]=btw(between,meals[mi-1],m);
prevT=m.t});
var tail=acts(prevT,1e9);if(tail.length)post.push(btw(tail,meals[meals.length-1],null));
if(P.kind==="single"||P.kind==="last")post.push('<div class="btw"><div class="btwh"><span class="btwi">⏳</span><div><small>'+fmt(P.leave)+' · Ritorno</small><b>Prima dell\'aeroporto</b></div></div><ul class="btwt"><li><span>🛫</span><p>In aeroporto si spende di più: se volete qualcosa per il volo, prendetelo in città.</p></li><li><span>🧴</span><p>Ai controlli non passano liquidi oltre i 100 ml: portate la borraccia vuota e riempitela dopo.</p></li></ul></div>');
else post.push('<div class="btw"><div class="btwh"><span class="btwi">🌙</span><div><small>Dopo cena</small><b>Prima di dormire</b></div></div><ul class="btwt">'+PD.T.night.map(function(t){return '<li><span>'+t[0]+'</span><p>'+esc(t[1])+'</p></li>'}).join("")+'</ul></div>');
PS.L=L;PS.pre=pre;PS.post=post;if(PS.day!==SEL){PS.day=SEL;PS.add=null;PS.menu=null;PS.anim="";PS.open={};var hi=pHero(L);if(hi>=0)PS.open[L[hi].key]=true;else if(L.length)PS.open[L[0].key]=true}
pDraw();pGeo();
function btw(between,a,b){var zs=[];between.forEach(function(x){var z=S[x.id].z;if(zs.indexOf(z)<0)zs.push(z)});
var ids=[];zs.forEach(function(z){(PD.MEAL.snk[z]||[]).forEach(function(id){if(ids.indexOf(id)<0&&!mHid(id))ids.push(id)})});
var t0=between.length?between[0].t:(a?a.t:P.c0),t1=b?b.t:P.leave,mid=(t0+t1)/2,tips=[];
tips.push(["💧",PD.T.water]);
if(a&&a.m==="col"&&b&&b.m==="pra")tips.push(["🚫","Evitate i caffè con vista sui monumenti: un caffè o un'acqua costano il doppio che nelle vie laterali."]);
if(b&&b.m==="cen"&&PD.T.kitchen)tips.push(["🕓",PD.T.kitchen]);
if(b&&b.m==="pra")tips.push(["🥖","Tenetevi leggeri: al massimo un dolce da dividere, il pranzo arriva presto."]);
var sn=(fprefOn()?prefList(ids,WD,mid,"snk",zs[0]||"A").main:vSorted(ids,WD,mid)).slice(0,4);
return '<div class="btw"><div class="btwh"><span class="btwi">⏳</span><div><small>'+fmt(t0)+' – '+fmt(t1)+(between.length?' · '+esc(between.map(function(x){return S[x.id].t.split(" e ")[0]}).join(", ")):'')+'</small><b>'+(a?(b?"Tra "+(a.m?MN[a.m].toLowerCase():"un pasto")+" e "+(b.m?MN[b.m].toLowerCase():"l'assaggio"):"Dopo "+(a.m?MN[a.m].toLowerCase():"l'assaggio")):"Prima di "+(b&&b.m?MN[b.m].toLowerCase():"mangiare"))+'</b></div></div><ul class="btwt">'+tips.map(function(t){return '<li><span>'+t[0]+'</span><p>'+esc(t[1])+'</p></li>'}).join("")+'</ul>'+(sn.length?'<div class="snacks">'+sn.map(function(o){var v=o.v,q=vq(v);return '<div class="snk'+(o.s.c==="ko"?" closed":"")+'"><span class="se">'+(v.e||(PD.SE||{})[o.id]||"🥐")+'</span><div class="snb"><div class="vhd"><b><a target="_blank" rel="noopener" href="'+esc(PD.G(q))+'">'+esc(v.n)+'</a></b><span class="st '+o.s.c+'">'+esc(o.s.t)+'</span></div><small class="sz">'+esc(v.a)+'</small><p>'+esc(v.d)+'</p><div class="vm"><span class="vr">★ '+esc(String(v.r))+'</span><span class="hrs">🕐 '+esc(hrsTxt(v,WD))+'</span></div><p class="vp">'+esc(v.pr)+'</p><a class="go sm" href="'+esc(gdir(q))+'" target="_blank" rel="noopener">↗︎ Portami lì</a></div></div>'}).join("")+'</div>':'')+'</div>'}}

/* ===== costi ===== */
var COPT=lj("via-copt",{});
pFpaint();
$("#hbc").addEventListener("change",function(){COPT.hb=this.checked?1:0;ls("via-copt",JSON.stringify(COPT));if(CFG)renderAll()});

function allActs(){var a=[];TRIP.days.forEach(function(d){d.acts.forEach(function(x){if(a.indexOf(x)<0)a.push(x)})});return a}
/* modello dei costi generico: prezzi in euro nei dati della città */
function transport(){var c=CFG,n=TRIP.n,TR=PD.TR,alt=[],rides=TRIP.days.reduce(function(s,d){return s+d.rides},0);
var cityDay=function(r){return TR.cap?Math.min(r*TR.one,TR.cap):r*TR.one},city=TRIP.days.reduce(function(s,d){return s+cityDay(d.rides)},0);
var rto=c.rt||c.to,AF=(TR.air||{})[c.to]||null,AF2=(TR.air||{})[rto]||null,same=rto===c.to,hf=function(f){return f?(f.one!=null?f.one:f.rt/2):0};
var air=same?(AF?(AF.rt!=null?AF.rt:2*AF.one):0):hf(AF)+hf(AF2),airRow=same?(AF?[["tr1",AF.n+(AF.rt!=null?" a/r":" a/r (2 × "+eur(AF.one)+")"),air]]:[]):airLegs(false,false);
function airLegs(sa,sr){var p=[],v=0;if(AF&&!sa){p.push(AF.n+" (andata, "+eur(hf(AF))+")");v+=hf(AF)}if(AF2&&!sr){p.push(AF2.n+" (ritorno, "+eur(hf(AF2))+")");v+=hf(AF2)}return p.length?[["tr1",p.join(" + "),v]]:[]}
function cityRows(){if(!rides)return[];var capd=TR.cap?TRIP.days.filter(function(d){return d.rides*TR.one>TR.cap}).length:0;return[["tr2",capd?TR.lbl+" ("+rides+" corse, con il tetto giornaliero di "+eur(TR.cap)+" in "+capd+(capd===1?" giorno":" giorni")+")":TR.lbl+", "+rides+" corse da "+eur(TR.one),city]]}
var opts=[{k:"single",n:"biglietti singoli",v:air+city,rows:airRow.concat(cityRows())}];
(TR.passes||[]).forEach(function(ps){if(ps.d<n||(ps.max&&n>ps.max))return;if(ps.per&&!rides)return;if(ps.only&&ps.only(TRIP)===false)return;var bestSame=opts.filter(function(o){return o.k==="p"+ps.n})[0];if(bestSame)return;
 var k=ps.per?Math.ceil(rides/ps.per):1,pp=ps.p*k,inO=function(ap){return ps.air&&(ps.air===true||ps.air.indexOf(ap)>=0)},inA=inO(c.to)&&inO(rto),pr=same?(inA?[]:airRow):airLegs(inO(c.to),inO(rto)),v=pp+pr.reduce(function(s,r){return s+r[2]},0);opts.push({k:"p"+ps.n,n:ps.n+(k>1?" × "+k:""),v:v,rows:pr.concat([["tr2",ps.n+(k>1?" × "+k:"")+(inA?" (aeroporto compreso)":ps.per?" per "+rides+" corse":""),pp]]),note:ps.note})});
opts.sort(function(a,b){return a.v-b.v});opts.slice(1).forEach(function(o){alt.push(o.n+" "+eur(o.v))});
return{T:opts[0].rows,alt:alt,best:opts[0].k,bn:opts[0].note}}
function flightRows(){var c=CFG,N=c.ppl,o=COPT.vl||{},d=o.m==="tot"&&N>1?N:1,F=fromInfo(c),R=[],pp=function(v){return(+v||0)/d};
if(+o.a>0)R.push(["fa","Volo di andata ("+(F.code||"partenza")+"-"+c.to+")",pp(o.a),1]);
if(+o.r>0)R.push(["fr","Volo di ritorno ("+(c.rt||c.to)+"-"+(F.code||"partenza")+")",pp(o.r),1]);
if(+o.x>0)R.push(["fx","Bagagli, posti e altri extra dei voli",pp(o.x),1]);
return R}
function costModel(){var M=costModelBase(),V=flightRows();M.V=V;M.tV=V.reduce(function(s,r){return s+(M.on(r)?r[2]:0)},0);return M}
function costModelBase(){if(PD.fx.cost)return PD.fx.cost(E);
var c=CFG,N=c.ppl,acts=allActs(),tr=transport(),T=tr.T.slice(),AT=[],F=[],AL=[],h=TRIP.multi?home():null,nights=TRIP.n-1,FD=PD.FOOD;
if(PD.TR.card)T.push(["card",PD.TR.card[1],PD.TR.card[0],1]);
acts.forEach(function(id){var t=S[id].tk;if(t)AT.push([id,t[1],t[0],1,t[3]?1:0])});
(PD.XTK||[]).forEach(function(x){if(!x[3]||acts.indexOf(x[3])>=0)AT.push([x[0],x[1],x[2],1,x[4]?1:0])});
var nb=0,nl=0,nd=0;TRIP.days.forEach(function(d){if(d.B&&!(d.items||[]).some(function(i){return i.k==="meal"&&i.m==="col"&&i.hotel}))nb++;if(d.L)nl++;if(d.D)nd++});
var x=function(k){return TRIP.n>1&&k>1?" (× "+k+")":""};
if(nb)F.push(["co",FD.co[1]+x(nb),FD.co[0]*nb]);if(nl)F.push(["pr",FD.pr[1]+x(nl),FD.pr[0]*nl]);if(nd)F.push(["ce",FD.ce[1]+x(nd),FD.ce[0]*nd]);
F.push(["sp",FD.sp[1]+x(TRIP.n),FD.sp[0]*TRIP.n]);
if(TRIP.multi){var tx=PD.TAX.filter(function(t){return t[0]===h.type})[0]||PD.TAX[0],pn=h.price?h.price/nights/N:0,pp=typeof tx[2]==="number"?tx[2]:(tx[2].pct?Math.min(tx[2].cap||1e9,pn*tx[2].pct/100):0);
AL.push(["al",h.price?"Alloggio, "+nights+(nights===1?" notte":" notti")+" ("+eur(h.price)+" in tutto"+(N>1?", diviso per "+N:"")+")":"Alloggio: inserisci il prezzo totale (⚙️)",h.price?h.price/N:0]);
var tn=Math.min(nights,PD.TAXMAXN||1e9);if(pp)AL.push(["tax","Tassa di soggiorno ("+eur(pp)+" a notte"+(typeof tx[2]==="number"?"":", "+tx[2].pct+"% del prezzo")+(tn<nights?", massimo "+tn+" notti":"")+")",pp*tn,1])}
function on(r){if(!r[3])return true;var k=COPT[r[0]];return k==null?!r[4]:!!k}
var sum=function(a){return a.reduce(function(s,r){return s+(on(r)?r[2]:0)},0)};
return{N:N,T:T,AT:AT,F:F,AL:AL,on:on,tT:sum(T),tA:sum(AT),tF:sum(F),tL:sum(AL),alt:tr.alt,best:tr.best,bn:tr.bn}}
function renderCosti(anim){var M=costModel(),N=M.N,tot=M.tT+M.tA+M.tF+M.tL+M.tV;
var cat=[["Trasporti",M.tT,"var(--k1)"],["Attrazioni",M.tA,"var(--k2)"],["Cibo",M.tF,"var(--k3)"]];if(TRIP.multi)cat.push(["Alloggio",M.tL,"var(--k4)"]);if(M.V.length)cat.splice(1,0,["Voli",M.tV,"var(--k5)"]);
var segs=cat.map(function(c,i){return '<i style="flex:'+Math.max(c[1],tot?tot*.012:1).toFixed(2)+';background:'+c[2]+';--i:'+i+'"></i>'}).join("");
var CCOL=window.CCOL=window.CCOL||{},GR={Voli:M.V,Trasporti:M.T,Attrazioni:M.AT,Cibo:M.F,Alloggio:M.AL},two=N>1,E2=function(v,z){return v?eur(v):z};
function grp(c){var t=c[0],a=GR[t]||[],hd='<span class="n"><i class="d" style="background:'+c[2]+'"></i>'+t+(a.length?'<i class="ch" aria-hidden="true">›</i>':'')+'</span><b>'+(c[1]?eur(c[1]):"—")+'</b>'+(two?'<b class="s">'+(c[1]?eur(c[1]*N):"—")+'</b>':'');
if(!a.length)return '<div class="cg"><div class="cs">'+hd+'</div></div>';
return '<details class="cg'+(CCOL[t]===false?" op":"")+'" data-g="'+esc(t)+'"'+(CCOL[t]===false?" open":"")+'><summary class="cs">'+hd+'</summary><div class="cd">'+a.map(function(r){var o=M.on(r),hot=r[0]==="al",z=hot?"—":"gratis";return '<div class="cr'+(o?"":" off")+'"><span class="n'+(r[3]?"":" np")+'">'+(r[3]?'<label class="opt"><input type="checkbox" data-o="'+r[0]+'"'+(o?" checked":"")+'><span>'+esc(r[1])+'</span></label>':hot?'<button type="button" class="hotb" data-hotel>'+esc(r[1])+' <b>Modifica ›</b></button>':'<span>'+esc(r[1])+'</span>')+'</span><span>'+E2(r[2],z)+'</span>'+(two?'<span class="s">'+E2(r[2]*N,z)+'</span>':'')+'</div>'}).join("")+'</div></details>'}
$("#cdonut").innerHTML='<div class="hero chero"><div class="ch-t"><span>Previsto · a persona</span><b style="--n:'+Math.max(4,eur(tot).length)+'">'+eur(tot)+'</b><em>'+(TRIP.n>1?TRIP.n+" giorni":"1 giorno")+(N>1?" · "+eur(tot*N)+" in "+N:"")+'</em></div><button type="button" class="ch-pdf" id="cdpdf" aria-label="Scarica i costi in PDF"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>PDF</button></div><div class="cbrk"><div class="cbar'+(anim?" anim":"")+'" aria-hidden="true">'+segs+'</div><div class="cacc'+(two?" two":"")+'" id="ctab"><div class="cth"><span></span><span>A persona</span>'+(two?'<span>In '+N+'</span>':'')+'</div>'+cat.map(grp).join("")+'<div class="ctot"><span>Totale</span><span>'+eur(tot)+'</span>'+(two?'<span>'+eur(tot*N)+'</span>':'')+'</div></div></div>';
var cdp=$("#cdpdf");if(cdp)cdp.addEventListener("click",function(){var o=$("#ccpdf");if(o)o.click()});
$$("#ctab details.cg").forEach(function(d){var g=d.dataset.g,sm=d.querySelector("summary"),c=d.querySelector(".cd");sm.addEventListener("click",function(e){e.preventDefault();if(!c)return;if(d.__a){d.__a.cancel();d.__a=null}
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches,du=window.LITE?170:280,op=!d.open,h;
if(op){d.open=true;d.classList.add("op");CCOL[g]=false;if(rm)return;h=c.offsetHeight;d.__a=c.animate([{height:"0px",paddingBottom:"0px",opacity:0},{height:h+"px",paddingBottom:"8px",opacity:1}],{duration:du,easing:"cubic-bezier(.2,.8,.2,1)"});d.__a.onfinish=function(){d.__a=null}}
else{d.classList.remove("op");CCOL[g]=true;if(rm){d.open=false;return}h=c.offsetHeight;var a=d.__a=c.animate([{height:h+"px",paddingBottom:"8px",opacity:1},{height:"0px",paddingBottom:"0px",opacity:0}],{duration:Math.round(du*.8),easing:"cubic-bezier(.4,0,.6,1)"});a.onfinish=function(){if(d.__a===a){d.open=false;d.__a=null}}}})});
$$("#ctab [data-hotel]").forEach(function(b){b.addEventListener("click",function(){openSetup(false,2);setTimeout(function(){var p=form.sprice;if(p&&!$("#stayin").hidden)try{p.focus({preventScroll:true});p.scrollIntoView({block:"center"})}catch(e){}},350)})});
$$("#ctab input[data-o]").forEach(function(x){x.addEventListener("change",function(){COPT[x.dataset.o]=x.checked?1:0;ls("via-copt",JSON.stringify(COPT));renderCosti(false);renderSpese()})});
var nt=(M.V.length?"Voli inclusi come li hai inseriti. ":"Voli esclusi: puoi aggiungerne il costo qui sotto, in «Costo dei voli». ")+"Tutte le attrazioni sono facoltative: togli la spunta a quelle che non ti interessano e il totale si aggiorna. ";
if(PD.fx.costNote)nt+=PD.fx.costNote(E,M);else{nt+=(M.bn?M.bn+" ":M.best==="single"?"Con poche corse i biglietti singoli costano meno degli abbonamenti. ":"")+(M.alt.length?"Alternative: "+M.alt.join(", ")+". ":"")+PD.TR.note+(PD.T.foodNote?" "+PD.T.foodNote:"");if(TRIP.multi&&PD.T.taxNote)nt+=" "+PD.T.taxNote}
var cn=$("#cnote"),wo=anim===false&&cn.querySelector("details")&&cn.querySelector("details").open;cn.innerHTML=moreHtml(esc(nt),wo);
window.PAREST=tot*N}

/* spese reali: elenco di spese condivise, saldi e rimborsi (come Splitwise) */
var SP=lj("via-spese",{});
(function(){if(!SP||typeof SP!=="object"||Array.isArray(SP))SP={};["n","x","q"].forEach(function(k){if(!Array.isArray(SP[k]))SP[k]=[]});if(typeof SP.lp!=="number")delete SP.lp;if(typeof SP.lc!=="string")delete SP.lc})();
function cats(){var a=[["tr","Trasporti"],["vo","Voli"],["co","Colazioni"],["pr","Pranzi"],["ce","Cene"],["sp","Spuntini"],["ex","Extra"]];if(TRIP&&TRIP.multi){a.splice(6,0,["mu","Musei"]);a.push(["al","Alloggio"])}else a[2][1]="Colazione",a[3][1]="Pranzo",a[4][1]="Cena";return a}
var CI={tr:"🚇",vo:"✈️",co:"🥐",pr:"🥙",ce:"🍽️",sp:"🍦",ex:"🛍️",mu:"🏛️",al:"🏨"};
function catName(k){var a=[["tr","Trasporti"],["vo","Voli"],["co","Colazione"],["pr","Pranzo"],["ce","Cena"],["sp","Spuntini"],["ex","Extra"],["mu","Musei"],["al","Alloggio"]].filter(function(c){return c[0]===k})[0];return a?a[1]:"Spesa"}
function names(){var N=CFG.ppl,a=[];for(var i=0;i<N;i++)a.push(((SP.n||[])[i]||"").trim()||(i===0?"Io":"Persona "+(i+1)));return a}
function saveSP(){ls("via-spese",JSON.stringify(SP))}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function c100(v){return Math.round((parseFloat(String(v).replace(",","."))||0)*100)}
function ec(c){return eur(c/100)}
function allIdx(N){var a=[];for(var i=0;i<N;i++)a.push(i);return a}
/* distribuisce tc centesimi in proporzione ai pesi, senza perdere nemmeno un centesimo */
function alloc(tc,w){var sum=w.reduce(function(s,v){return s+v},0),n=w.length,out=[],i;if(!(sum>0)){for(i=0;i<n;i++)out.push(0);return out}
var raw=w.map(function(v){return tc*v/sum}),fl=raw.map(Math.floor),rem=tc-fl.reduce(function(s,v){return s+v},0),ord=allIdx(n).sort(function(a,b){return (raw[b]-fl[b])-(raw[a]-fl[a])||a-b});
for(i=0;i<rem;i++)fl[ord[i]]++;return fl}
function shares(x,N){var tc=c100(x.a),i;
if(x.s){var o=[];for(i=0;i<N;i++)o.push(c100(x.s[i]||0));return o}
var w=(x.w&&x.w.length?x.w:allIdx(N)).filter(function(i){return i<N});if(!w.length)w=allIdx(N);
return alloc(tc,allIdx(N).map(function(i){return w.indexOf(i)>=0?1:0}))}
function ledger(N){var paid=[],owe=[],i;for(i=0;i<N;i++){paid.push(0);owe.push(0)}
(SP.x||[]).forEach(function(x){paid[Math.min(N-1,x.p||0)]+=c100(x.a);var s=shares(x,N);for(i=0;i<N;i++)owe[i]+=s[i]});
var net=paid.map(function(v,i){return v-owe[i]});
(SP.q||[]).forEach(function(q){var a=c100(q.a);net[Math.min(N-1,q.f)]+=a;net[Math.min(N-1,q.to)]-=a});
return{paid:paid,owe:owe,net:net,total:paid.reduce(function(s,v){return s+v},0)}}
function settle(net){var d=net.map(function(b,i){return{i:i,b:b}}).filter(function(x){return x.b<0}).sort(function(a,b){return a.b-b.b}),c=net.map(function(b,i){return{i:i,b:b}}).filter(function(x){return x.b>0}).sort(function(a,b){return b.b-a.b}),out=[];
while(d.length&&c.length){var x=Math.min(-d[0].b,c[0].b);out.push({f:d[0].i,t:c[0].i,a:x});d[0].b+=x;c[0].b-=x;if(d[0].b===0)d.shift();if(c[0].b===0)c.shift()}return out}
function dayTxt(t){return new Date(t).toLocaleDateString("it-IT",{day:"numeric",month:"short"})}
function renderSpese(){var N=CFG.ppl;SP.n=SP.n||[];SP.q=SP.q||[];
if(!Array.isArray(SP.x)){SP.x=[];if(SP.v){Object.keys(SP.v).forEach(function(k){var v=parseFloat(String(SP.v[k]||"").replace(",","."))||0;if(v>0)SP.x.push({id:uid(),d:catName(k),a:Math.round(v*100)/100,p:Math.min(N-1,(SP.p||{})[k]||0),w:null,m:"eq",c:k,t:Date.now()})});delete SP.v;delete SP.p;saveSP()}}
$("#sppl").textContent=N===1?"solo tu":"in "+N;
var who=$("#who");who.hidden=N<2;who.innerHTML=N<2?"":names().map(function(nm,i){return '<input type="text" maxlength="14" data-i="'+i+'" value="'+esc((SP.n[i]||""))+'" placeholder="'+esc(i===0?"Io":"Persona "+(i+1))+'" aria-label="Nome persona '+(i+1)+'">'}).join("");
$$("#who input").forEach(function(x){x.addEventListener("input",function(){SP.n[+x.dataset.i]=x.value;saveSP();renderSpeseBody()})});
renderSpeseBody()}
function renderSpeseBody(){var N=CFG.ppl,EST=window.PAREST||0,L=ledger(N),t=L.total/100,nm=names(),X=SP.x||[];window.__sqcRefresh&&window.__sqcRefresh();
$("#stot").textContent=eur(t);var sb=$("#sbar"),sd=$("#sdiff"),over=t>EST;sb.style.width=Math.min(100,EST?t/EST*100:0)+"%";sb.classList.toggle("over",over);sd.classList.toggle("over",over);
sd.textContent=t===0?"Previsto: "+eur(EST)+(N>1?" in "+N:""):over?"Sopra il previsto di "+eur(t-EST):"Restano "+eur(EST-t)+" sul previsto di "+eur(EST);
sd.classList.toggle("warn",!over&&EST>0&&t/EST>=.85);sb.classList.toggle("warn",!over&&EST>0&&t/EST>=.85);
(function(){var sp=$("#space"),ln=[];if(EST>0&&TRIP&&TRIP.n){var n=TRIP.n,ti=todayIdx(),last=TRIP.days[n-1].date,pd=paris().d,dE=EST/n;
if(pd>last){if(t>0)ln.push("Viaggio finito: hai speso "+eur(t)+(N>1?", cioè "+eur(t/N)+" a persona":"")+", "+(t<=EST?eur(EST-t)+" sotto":eur(t-EST)+" sopra")+" il previsto.")}
else if(ti>=0){var left=n-ti;if(t<=EST&&left>1)ln.push("Puoi spendere circa "+eur((EST-t)/left)+" al giorno nei "+left+" giorni che restano.");
if(ti>0&&t>0){var av=t/ti;ln.push("Finora "+eur(av)+" al giorno, previsto "+eur(dE)+" ("+(av<=dE?"in linea":"sopra ritmo")+").")}}}
sp.hidden=!ln.length;sp.innerHTML=ln.map(function(x){return '<p>'+esc(x)+'</p>'}).join("")})();
/* categorie */
var bc={};X.forEach(function(x){bc[x.c]=(bc[x.c]||0)+c100(x.a)});
var ks=Object.keys(bc).sort(function(a,b){return bc[b]-bc[a]}),tt=ks.reduce(function(q,k){return q+bc[k]},0),CC={tr:"#4f7fa8",vo:"#7a68b0",co:"#d9a441",pr:"#d4743a",ce:"#a8323f",sp:"#d98aa0",ex:"#4f9a86",mu:"#8a6d3b",al:"#6d8594"};
var scb=$("#scb");$("#scw").hidden=!ks.length;scb.innerHTML=ks.map(function(k){return '<i style="flex:'+bc[k]+';background:'+(CC[k]||"#888")+'" title="'+esc(catName(k))+'"></i>'}).join("");
$("#scat").innerHTML=ks.map(function(k){return '<span class="scp"><i style="--cc:'+(CC[k]||"#888")+'">'+(CI[k]||"💶")+'</i>'+esc(catName(k))+' <b>'+ec(bc[k])+'</b><em>'+Math.round(bc[k]/tt*100)+'%</em></span>'}).join("");
renderRecent();
/* elenco */
var list=X.map(function(x){return{t:x.t||0,x:x}}).concat(SP.q.map(function(q){return{t:q.t||0,q:q}})).sort(function(a,b){return b.t-a.t}),last="",h="";
var dt={};X.forEach(function(x){var k=dayTxt(x.t||0);dt[k]=(dt[k]||0)+c100(x.a)});
list.forEach(function(r){var d=dayTxt(r.t);if(d!==last){h+='<div class="sday"><span>'+esc(d)+'</span>'+(dt[d]?'<b>'+ec(dt[d])+'</b>':'')+'</div>';last=d}
if(r.x){var x=r.x,p=Math.min(N-1,x.p||0),w=(x.w&&x.w.length?x.w:allIdx(N)).filter(function(i){return i<N}),who2=N<2?catName(x.c):(x.s?"importi diversi":(w.length>=N?"tra tutti":"tra "+w.map(function(i){return nm[i]}).join(", ")));
h+='<button type="button" class="xr" data-id="'+esc(x.id)+'"><i style="--cc:'+(CC[x.c]||"#888")+'">'+(CI[x.c]||"💶")+'</i><span class="xd"><b>'+esc(x.d||catName(x.c))+'</b>'+(N>1?'<small>Ha pagato '+esc(nm[p])+' · '+esc(who2)+'</small>':'<small>'+esc(catName(x.c))+'</small>')+'</span><span class="xa">'+eur(x.a)+(x.o?'<small>'+esc(Number(x.o.v).toLocaleString("it-IT"))+' '+esc(x.o.s||x.o.c)+'</small>':'')+'</span></button>'}
else{var q=r.q;h+='<button type="button" class="xr xq" data-q="'+esc(q.id)+'"><i>🤝</i><span class="xd"><b>'+esc(nm[Math.min(N-1,q.f)])+' ha dato '+eur(q.a)+' a '+esc(nm[Math.min(N-1,q.to)])+'</b><small>Rimborso</small></span><span class="xa">'+eur(q.a)+'</span></button>'}});
$("#slist").innerHTML=h||'<div class="sxe"><svg class="sxi" viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 6h28v36l-5-3.5-4.5 3.5-4.5-3.5-4.5 3.5-4.5-3.5L10 42Z"/><path d="M17 15h14M17 22h14M17 29h8"/><circle cx="33" cy="29" r="1.2" fill="currentColor"/></svg><b>Ancora nessuna spesa</b><small>Segna qui quello che paghi: il conto con gli altri si fa da solo.</small></div>';
$$("#slist .xr[data-id]").forEach(function(b){b.addEventListener("click",function(){openExp(b.dataset.id)})});
$$("#slist .xr[data-q]").forEach(function(b){b.addEventListener("click",function(){var q=SP.q.filter(function(z){return z.id===b.dataset.q})[0];if(!q)return;ask("Eliminare il rimborso?",nm[Math.min(N-1,q.f)]+" ha dato "+eur(q.a)+" a "+nm[Math.min(N-1,q.to)]+". Il saldo tornerà com'era prima.",[{t:"Elimina il rimborso",fn:function(){SP.q=SP.q.filter(function(z){return z.id!==q.id});saveSP();renderSpeseBody()}}])})});
/* saldi e rimborsi (solo con più persone) */
var bal=$("#sbal"),sp=$("#split");$("#sshare").hidden=!X.length&&!SP.q.length;
if(N<2||(!X.length&&!SP.q.length)){bal.innerHTML="";sp.innerHTML="";return}
bal.innerHTML='<div class="sbh">Saldi</div>'+nm.map(function(n,i){var b=L.net[i],cl=b>0?"pos":b<0?"neg":"";return '<div class="sbr"><span class="sbn">'+esc(n)+'<small>anticipato '+ec(L.paid[i])+' · quota '+ec(L.owe[i])+'</small></span><b class="sbv '+cl+'">'+(b>0?"+":b<0?"−":"")+ec(Math.abs(b))+'</b></div>'}).join("");
var st=settle(L.net);
sp.innerHTML=st.length?'<div class="sbh">Per saldare</div>'+st.map(function(s,k){return '<div class="stl"><span>'+esc(nm[s.f])+' deve <b>'+ec(s.a)+'</b> a '+esc(nm[s.t])+'</span><button type="button" class="payb" data-k="'+k+'">Pagato</button></div>'}).join(""):'<div class="stl ok">Siete pari 🤝</div>';
$$("#split .payb").forEach(function(b){b.addEventListener("click",function(){var s=st[+b.dataset.k];SP.q.push({id:uid(),f:s.f,to:s.t,a:s.a/100,t:Date.now()});saveSP();renderSpeseBody();toast("Rimborso segnato")})})}
/* riepilogo del viaggio come immagine da condividere */
window.__recap=function(){if(!TRIP||!CFG||!window.PD)return;var d=dOf(PD.id),col=d.col||["#0a6f95","#1cc0d6","#ffb800"],N=CFG.ppl,L=ledger(N),stops=0;TRIP.days.forEach(function(T){T.items.forEach(function(it){if(it.k==="act")stops++})});
var W=1080,H=1350,cv=document.createElement("canvas");cv.width=W;cv.height=H;var x=cv.getContext("2d");
function draw(){var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,col[0]);g.addColorStop(1,col[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
x.fillStyle="rgba(255,255,255,.10)";x.beginPath();x.arc(W-120,260,360,0,7);x.fill();x.beginPath();x.arc(100,H-200,300,0,7);x.fill();
var F="Outfit,system-ui,-apple-system,sans-serif";x.textBaseline="alphabetic";x.fillStyle="rgba(255,255,255,.85)";x.font="600 40px "+F;x.fillText("IL MIO VIAGGIO",90,150);
x.font="180px "+F;x.fillText(PD.flag||d.e||"",90,380);x.fillStyle="#fff";x.font="800 150px "+F;var nm=PD.n,fs=150;while(x.measureText(nm).width>W-180&&fs>60){fs-=8;x.font="800 "+fs+"px "+F}x.fillText(nm,90,560);
x.font="500 50px "+F;x.fillStyle="rgba(255,255,255,.9)";x.fillText(rangeTxt(),90,640);
var st=[[String(TRIP.n),TRIP.n===1?"giorno":"giorni"],[String(stops),stops===1?"tappa":"tappe"]];if(L.total>0)st.push([ec(L.total/ (N>1?N:1)).replace(/\s/g," "),N>1?"a persona":"spesi"]);
var bw=(W-180-(st.length-1)*30)/st.length;st.forEach(function(q,i){var bx=90+i*(bw+30),by=760;x.fillStyle="rgba(255,255,255,.18)";x.beginPath();if(x.roundRect)x.roundRect(bx,by,bw,260,40);else x.rect(bx,by,bw,260);x.fill();x.fillStyle="#fff";x.textAlign="center";var f2=q[0].length>6?64:96;x.font="800 "+f2+"px "+F;x.fillText(q[0],bx+bw/2,by+130);x.font="600 38px "+F;x.fillStyle="rgba(255,255,255,.85)";x.fillText(q[1],bx+bw/2,by+200);x.textAlign="left"});
var EST=window.PAREST||0;if(EST>0&&L.total>0){var dv=EST-L.total/100,pp=N>1?N:1;x.fillStyle="rgba(255,255,255,.95)";x.font="600 44px "+F;x.fillText(dv>=0?eur(dv/pp)+(N>1?" a persona":"")+" sotto il previsto":eur(-dv/pp)+(N>1?" a persona":"")+" sopra il previsto",90,1120)}
x.fillStyle="rgba(255,255,255,.95)";x.font="800 54px "+F;x.fillText("Viaticum",90,H-140);x.font="500 36px "+F;x.fillStyle="rgba(255,255,255,.8)";x.fillText("Il tuo viaggio, tappa dopo tappa.",90,H-85);
cv.toBlob(function(b){if(!b){toast("Non riesco a creare l'immagine");return}var f=null;try{f=new File([b],"viaggio-"+PD.id+".png",{type:"image/png"})}catch(e){}
if(f&&navigator.canShare&&navigator.canShare({files:[f]})&&navigator.share){navigator.share({files:[f],title:"Il mio viaggio a "+PD.n}).catch(function(){});return}
var u=URL.createObjectURL(b),o=document.createElement("div");o.className="rcap";o.innerHTML='<div class="rcc"><img alt="Riepilogo del viaggio" src="'+u+'"><p>Tieni premuta l\'immagine per salvarla o condividerla.</p><a class="btn" download="viaggio-'+esc(PD.id)+'.png" href="'+u+'">Scarica</a><button type="button" class="btn ghost">Chiudi</button></div>';document.body.appendChild(o);function cl(){o.remove();setTimeout(function(){URL.revokeObjectURL(u)},500)}o.querySelector("button").addEventListener("click",cl);o.addEventListener("click",function(ev){if(ev.target===o)cl()})},"image/png")}
try{var fl=document.fonts&&document.fonts.load?Promise.all([document.fonts.load("800 80px Outfit"),document.fonts.load("500 40px Outfit")]):Promise.resolve();fl.then(draw,draw)}catch(er){draw()}};
function shareSpese(){var N=CFG.ppl,L=ledger(N),nm=names(),X=SP.x||[],o=["Spese del viaggio a "+PD.n+" ("+rangeTxt()+")","Totale: "+ec(L.total)+(N>1?" in "+N:""),""];
if(N>1){o.push("Saldi:");nm.forEach(function(n,i){o.push("• "+n+": "+(L.net[i]>0?"deve ricevere ":L.net[i]<0?"deve dare ":"pari ")+ec(Math.abs(L.net[i])))});var st=settle(L.net);if(st.length){o.push("","Per saldare:");st.forEach(function(s){o.push("• "+nm[s.f]+" dà "+ec(s.a)+" a "+nm[s.t])})}o.push("")}
o.push("Spese:");X.slice().sort(function(a,b){return (a.t||0)-(b.t||0)}).forEach(function(x){o.push("• "+dayTxt(x.t||0)+" · "+(x.d||catName(x.c))+": "+eur(x.a)+(N>1?" (pagato da "+nm[Math.min(N-1,x.p||0)]+")":""))});
var bc={};X.forEach(function(x){bc[x.c]=(bc[x.c]||0)+c100(x.a)});var ks=Object.keys(bc).sort(function(p,q){return bc[q]-bc[p]});if(ks.length){o.push("","Per categoria:");ks.forEach(function(k){o.push("• "+catName(k)+": "+ec(bc[k]))})}
var EST=window.PAREST||0;if(EST>0&&L.total>0){var tt=L.total/100;o.push("","Previsto "+eur(EST)+", speso "+eur(tt)+" ("+(tt<=EST?eur(EST-tt)+" sotto":eur(tt-EST)+" sopra")+").")}
o.push("","Fatto con Viaticum");var txt=o.join("\n");
if(navigator.share){navigator.share({text:txt}).catch(function(){})}else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){toast("Riepilogo copiato")},function(){toast("Non sono riuscito a copiare")})}else toast("Condivisione non disponibile")}
/* scheda per aggiungere o modificare una spesa */
var EXP=$("#exp");
/* spesa rapida: "12 caffè" = 12 € pagati da chi ha pagato l'ultima volta, divisi tra tutti */
var QC=false;
function guessCat(t,dc,CT){var s=t.toLowerCase(),R=[["tr",/taxi|metro|bus|treno|biglietto (bus|metro)|tram|navetta|uber|parcheggio|benzina|traghetto|ticket/],["mu",/museo|musei|mostra|galleria|ingresso|biglietto|visita|castello|tour/],["co",/colazione|cornetto|brioche|cappuccino/],["pr",/pranzo|panino|kebab|pizza al taglio|trattoria/],["ce",/cena|ristorante|osteria|birreria|pizzeria/],["sp",/caff[eè]|gelato|spuntino|snack|acqua|birra|drink|aperitivo|dolce|pasticcini|bibita/],["al",/hotel|alloggio|notte|airbnb|b&b/],["vo",/volo|bagaglio|aereo/],["ex",/souvenir|regalo|magnete|cartolina|negozio|shopping|farmacia/]];
for(var i=0;i<R.length;i++)if(R[i][1].test(s)&&CT.some(function(c){return c[0]===R[i][0]}))return R[i][0];return dc}
function addQuick(o){SP.x=SP.x||[];SP.x.push(o);SP.lc=o.c;if(o.p>=0)SP.lp=o.p;saveSP();renderSpeseBody();toast("Spesa aggiunta: "+eur(o.a))}
function renderRecent(){var box=$("#sqr");if(!box)return;var seen={},r=[],X=(SP.x||[]).slice().sort(function(a,b){return (b.t||0)-(a.t||0)});
X.forEach(function(x){var k=(x.d||"")+"|"+x.a;if(r.length<4&&!seen[k]&&x.d){seen[k]=1;r.push(x)}});
box.hidden=!r.length;box.innerHTML=r.map(function(x,i){return '<button type="button" data-i="'+i+'"><i>'+(CI[x.c]||"💶")+'</i>'+esc(x.d)+' <b>'+eur(x.a)+'</b></button>'}).join("");
$$("#sqr button").forEach(function(b){b.addEventListener("click",function(){var x=r[+b.dataset.i],o={};["d","a","p","c","m","w","s","xv","o"].forEach(function(k){if(x[k]!=null)o[k]=JSON.parse(JSON.stringify(x[k]))});o.id=uid();o.t=Date.now();addQuick(o)})})}
(function(){var f=$("#sq");if(!f)return;var cb=$("#sqc");
cb.addEventListener("click",function(){QC=!QC;cb.textContent=QC&&PD.CUR?PD.CUR.s:"€";cb.classList.toggle("on",QC)});
window.__sqcRefresh=function(){var cu=PD&&PD.CUR;cb.hidden=!cu;if(!cu)QC=false;cb.textContent=QC&&cu?cu.s:"€"};
f.addEventListener("submit",function(e){e.preventDefault();var i=$("#sqi"),t=i.value.trim(),m=/(\d+(?:[.,]\d{1,2})?)/.exec(t);if(!m||!(c100(m[1])>0)){toast("Scrivi importo e descrizione, per esempio 12 caffè");i.focus();return}
var N=CFG.ppl,CT=cats(),hr=new Date().getHours(),dc=hr<11?"co":hr<16?"pr":"ce";if(!CT.some(function(c){return c[0]===dc}))dc="ex";
var d=t.replace(m[0],"").replace(/^[\s€:\-–,]+|[\s€:\-–,]+$/g,"").trim(),c=guessCat(d,SP.lc&&CT.some(function(z){return z[0]===SP.lc})?SP.lc:dc,CT);
var v=c100(m[1])/100,CU=PD.CUR,o={id:uid(),d:d||catName(c),a:v,p:N>1?Math.min(N-1,SP.lp||0):0,c:c,m:"eq",w:null,t:Date.now()};
if(QC&&CU){o.a=Math.round(v*(CU.e||1)*100)/100;o.o={v:v,c:CU.c,s:CU.s}}
addQuick(o);i.value=""})})();
function openExp(id){var N=CFG.ppl,x=id?(SP.x||[]).filter(function(z){return z.id===id})[0]:null,nm=names(),CU=PD.CUR,CT=cats();
var hr=new Date().getHours(),dc=hr<11?"co":hr<16?"pr":"ce";if(!CT.some(function(c){return c[0]===dc}))dc="ex";
var st={m:x?(x.m||"eq"):"eq",w:x&&x.w&&x.w.length?x.w.slice():allIdx(N),p:x?Math.min(N-1,x.p||0):Math.min(N-1,SP.lp||0),xv:x&&x.xv?x.xv.slice():[],cu:x&&x.o?x.o.c:"EUR",c:x?x.c:(SP.lc&&CT.some(function(c){return c[0]===SP.lc})?SP.lc:dc)};
var av=x?(x.o?x.o.v:x.a):"";
var h='<h3>'+(x?"Modifica spesa":"Nuova spesa")+'</h3><div class="xf">'+
'<label>Importo<span class="xamt"><input id="xa" type="number" inputmode="decimal" step="0.01" min="0" placeholder="0,00" value="'+esc(av)+'">'+(CU?'<select id="xcu" aria-label="Valuta"><option value="EUR">€</option><option value="'+esc(CU.c)+'"'+(st.cu===CU.c?" selected":"")+'>'+esc(CU.s)+'</option></select>':'<span class="xeu">€</span>')+'</span></label>'+
'<label>Descrizione<input id="xd" type="text" maxlength="40" placeholder="Es. cena in birreria" value="'+esc(x?x.d:"")+'"></label>'+
'<label>Categoria<select id="xc">'+CT.map(function(c){return '<option value="'+c[0]+'"'+(c[0]===st.c?" selected":"")+'>'+(CI[c[0]]||"")+" "+c[1]+'</option>'}).join("")+'</select></label>'+
(N>1?'<label>Pagato da<select id="xp">'+nm.map(function(n,i){return '<option value="'+i+'"'+(i===st.p?" selected":"")+'>'+esc(n)+'</option>'}).join("")+'</select></label><div class="xw"><span>Diviso tra</span><div class="xmodes" role="tablist"><button type="button" data-m="eq">Uguale</button><button type="button" data-m="ex">Importi</button><button type="button" data-m="pc">%</button></div><div id="xpl"></div><div id="xchk" class="xchk" aria-live="polite"></div></div>':'')+
'</div><div class="qrb"><button type="button" class="btn" id="xsave">'+(x?"Salva modifiche":"Aggiungi")+'</button>'+(x?'<button type="button" class="btn ghost danger" id="xdel">Elimina la spesa</button>':'')+'<button type="button" class="btn ghost" id="xcancel">Annulla</button></div>';
$("#xbody").innerHTML=h;
function val(){var v=parseFloat($("#xa").value.replace(",","."));return isNaN(v)?0:v}
function cur(){var s=$("#xcu");return s?s.value:"EUR"}
function flTot(){var pp=flightRows().reduce(function(q,r){return q+r[2]},0);return Math.round(pp*N*100)/100}
$("#xc").addEventListener("change",function(){if(this.value!=="vo")return;var t=flTot(),a=$("#xa"),d=$("#xd");if(t>0&&!(parseFloat(String(a.value).replace(",","."))>0)){a.value=t;if(!d.value.trim())d.value="Voli";a.dispatchEvent(new Event("input"));toast("Importo preso dai costi dei voli")}})
function rate(){return cur()==="EUR"?1:(CU&&CU.e)||1}
function sym(){return cur()==="EUR"?"€":(CU&&CU.s)||"€"}
function tcents(){return Math.round(val()*rate()*100)}
function money(v){return (Math.round(v*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2})}
function paintPl(){if(N<2)return;var box=$("#xpl"),tc=tcents(),i;$$(".xmodes button").forEach(function(b){b.classList.toggle("on",b.dataset.m===st.m)});
if(st.m==="eq"){var sh=alloc(tc,allIdx(N).map(function(i){return st.w.indexOf(i)>=0?1:0}));box.innerHTML=nm.map(function(n,i){var on=st.w.indexOf(i)>=0;return '<label class="xch'+(on?" on":"")+'"><input type="checkbox" data-i="'+i+'"'+(on?" checked":"")+'><span>'+esc(n)+'</span><b>'+(on?ec(sh[i]):"—")+'</b></label>'}).join("");
$$("#xpl input").forEach(function(c){c.addEventListener("change",function(){var i=+c.dataset.i,k=st.w.indexOf(i);if(c.checked&&k<0)st.w.push(i);else if(!c.checked&&k>=0)st.w.splice(k,1);paintPl()})})}
else{box.innerHTML=nm.map(function(n,i){return '<div class="xch xin"><span>'+esc(n)+'</span><input type="number" inputmode="decimal" step="0.01" min="0" data-i="'+i+'" placeholder="0" value="'+esc(st.xv[i]==null?"":st.xv[i])+'"><em>'+(st.m==="pc"?"%":esc(sym()))+'</em></div>'}).join("");
$$("#xpl input").forEach(function(c){c.addEventListener("input",function(){st.xv[+c.dataset.i]=c.value;chk()})})}
chk()}
function chk(){if(N<2)return;var el=$("#xchk"),tc=tcents();if(st.m==="eq"){el.className="xchk"+(st.w.length?"":" bad");el.textContent=st.w.length?(tc?"Quota di ciascuno: "+(function(){var s=alloc(tc,allIdx(N).map(function(i){return st.w.indexOf(i)>=0?1:0})).filter(function(c){return c>0}).sort(function(a,b){return b-a});return s.length&&s[0]!==s[s.length-1]?"da "+ec(s[s.length-1])+" a "+ec(s[0]):ec(s[0]||0)})():""):"Scegli almeno una persona";return}
var sum=0;allIdx(N).forEach(function(i){sum+=parseFloat(String(st.xv[i]||"").replace(",","."))||0});
if(st.m==="pc"){var d=100-sum,ok=Math.abs(d)<.005;el.className="xchk"+(ok?" ok":" bad");el.textContent=ok?"Totale 100% ✓":d>0?"Mancano "+money(d)+"%":"Superi di "+money(-d)+"%"}
else{var d2=val()-sum,ok2=val()>0&&Math.abs(d2)<.005;el.className="xchk"+(ok2?" ok":" bad");el.textContent=ok2?"Gli importi quadrano ✓":d2>0?"Mancano "+money(d2)+" "+sym():"Superi di "+money(-d2)+" "+sym()}}
if(N>1){$$(".xmodes button").forEach(function(b){b.addEventListener("click",function(){if(st.m===b.dataset.m)return;st.m=b.dataset.m;if(st.m!=="eq"&&!st.xv.some(function(v){return v}))st.xv=[];paintPl()})});paintPl();$("#xa").addEventListener("input",paintPl);var cu=$("#xcu");cu&&cu.addEventListener("change",paintPl)}
else{var cu2=$("#xcu");cu2&&cu2.addEventListener("change",function(){})}
function save(){var v=val(),tc=tcents();if(!(v>0)||tc<1){toast("Inserisci l'importo");$("#xa").focus();return}
var o={id:x?x.id:uid(),d:$("#xd").value.trim(),a:tc/100,p:N>1?+$("#xp").value:0,c:$("#xc").value,m:st.m,t:x?x.t:Date.now()};if(!o.d)o.d=catName(o.c);
if(cur()!=="EUR"&&CU)o.o={v:v,c:CU.c,s:CU.s};
if(N>1){if(st.m==="eq"){if(!st.w.length){toast("Scegli almeno una persona");return}o.w=st.w.slice().sort(function(a,b){return a-b});if(o.w.length>=N)o.w=null}
else{var w=allIdx(N).map(function(i){return parseFloat(String(st.xv[i]||"").replace(",","."))||0}),sum=w.reduce(function(s,q){return s+q},0);
if(st.m==="pc"?Math.abs(sum-100)>=.005:Math.abs(sum-v)>=.005){toast(st.m==="pc"?"Le percentuali devono fare 100%":"Gli importi devono fare il totale");return}
o.s=alloc(tc,w).map(function(c){return c/100});o.xv=allIdx(N).map(function(i){return st.xv[i]||""});o.w=null}}
else{o.w=null;o.m="eq"}
if(x)SP.x[SP.x.indexOf(x)]=o;else{SP.x=SP.x||[];SP.x.push(o)}
SP.lp=o.p;SP.lc=o.c;saveSP();closeExp();renderSpeseBody();toast(x?"Spesa aggiornata":"Spesa aggiunta")}
$("#xsave").addEventListener("click",save);$("#xcancel").addEventListener("click",closeExp);
var dl=$("#xdel");dl&&dl.addEventListener("click",function(){closeExp();setTimeout(function(){ask("Eliminare questa spesa?",(x.d||catName(x.c))+", "+eur(x.a)+".",[{t:"Elimina la spesa",fn:function(){SP.x=SP.x.filter(function(z){return z.id!==x.id});saveSP();renderSpeseBody();toast("Spesa eliminata")}}])},180)});
EXP.classList.add("on");EXP.setAttribute("aria-hidden","false");if(!x)setTimeout(function(){try{$("#xa").focus()}catch(e){}},260)}
function closeExp(){EXP.classList.remove("on");EXP.setAttribute("aria-hidden","true")}
EXP.addEventListener("click",function(e){if(e.target===EXP)closeExp()});
$("#sadd").addEventListener("click",function(){openExp(null)});
$("#sshare").addEventListener("click",shareSpese);

/* ===== consigli ===== */
var CK=lj("via-check",{});
/* consigli: icone, colori e viste (come nella tavola R1 + 112 e lista a gruppi di R2) */
var CS={},CSI={voli:"M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z",bed:"M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 18v2M21 18v2M3 15h18M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2",land:"M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6",drop:"M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z",talk:"M4 5h16v11H9l-5 4z",phone:"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",alert:"M12 3l10 18H2zM12 10v5M12 18v.5",list:"M8 6h12M8 12h12M8 18h12M4 6h.5M4 12h.5M4 18h.5",train:"M7 3h10a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM4 11h16M8 21l2-3M16 21l-2-3",mappa:"M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",coffee:"M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M7 3v2M11 3v2",book:"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",shield:"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",sun:"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5",check:"M5 12.5l4.5 4.5L19 7.5",chev:"M9 6l6 6-6 6",back:"M15 6l-6 6 6 6",spk:"M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7",art:"M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2.2-.5-1.3.4-2.3 1.7-2.3H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5zM7.5 11.5h.01M10 7.5h.01M14.5 7.5h.01",doc:"M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",bag:"M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0",bat:"M4 8h14v8H4zM18 11h2v2h-2z"};
function csSvg(n,s,c,w){return '<svg viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="none" stroke="'+(c||"currentColor")+'" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(CSI[n]||CSI.mappa)+'"/></svg>'}
function csCirc(n,k,sz){return '<span class="cic" style="--kk:var(--k'+k+');width:'+sz+'px;height:'+sz+'px">'+csSvg(n,Math.round(sz*.5),"currentColor",1.9)+'</span>'}
function csRing(f,sz,sw,txt){var r=(sz-sw)/2,c=2*Math.PI*r;return '<span class="crg" style="width:'+sz+'px;height:'+sz+'px"><svg viewBox="0 0 '+sz+' '+sz+'" width="'+sz+'" height="'+sz+'" aria-hidden="true"><circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" class="rg-t" stroke-width="'+sw+'"/><circle cx="'+sz/2+'" cy="'+sz/2+'" r="'+r+'" class="rg-v" style="opacity:'+(f>0?1:0)+'" stroke-width="'+sw+'" stroke-dasharray="'+(c*f).toFixed(1)+' '+c.toFixed(1)+'"/></svg><b>'+txt+'</b></span>'}
function csZi(t){var m={"✈":["voli",1],"🚇":["train",1],"🚉":["train",1],"⛴":["train",1],"🏨":["bed",2],"🏠":["bed",2],"🏛":["land",3],"🏺":["land",3],"🏰":["land",3],"🏗":["land",3],"🧱":["land",3],"👑":["land",3],"🗿":["land",3],"⛪":["land",5],"✡":["land",5],"🎨":["art",5],"🖼":["art",5],"🎭":["art",5],"🎶":["art",5],"📚":["book",5],"📖":["book",5],"📋":["list",5],"🌅":["sun",4],"🌳":["sun",4],"🌿":["sun",4],"🌉":["sun",4],"⛰":["sun",4],"🏙":["sun",4],"🗼":["sun",4],"🛶":["eye",4],"🦎":["eye",4],"🦕":["eye",4],"♨":["eye",4],"💧":["drop",4],"🗣":["talk",4],"🥙":["coffee",2],"🥘":["coffee",2],"☕":["coffee",2],"🍷":["coffee",2],"🍺":["coffee",2],"🧇":["coffee",2],"🚨":["alert",3],"📞":["phone",6],"🏥":["shield",6],"🧭":["mappa",3]};return m[Array.from(t)[0]||""]||["mappa",t.length%5+1]}
function csName(t){return t.replace(/^[^A-Za-zÀ-ÿ0-9]+/,"")}
function renderConsigli(){var c=CFG,A=TRIP.A,N=c.ppl,acts=allActs(),has=function(id){return acts.indexOf(id)>=0},M=TRIP.multi,okIf=function(x){return !x||(typeof x==="function"?x(E):x.some(has))};
var items=[["doc",PD.T.doc||"Carta d'identità o passaporto"],["bp","Carte d'imbarco di andata e ritorno"]].concat((PD.CHECK||[]).filter(function(x){return okIf(x[2])}).map(function(x){return[x[0],typeof x[1]==="function"?x[1](E):x[1]]}));
if(M)items=items.concat([["st","Conferma e indirizzo dell'alloggio salvati sul telefono"],["ch","Caricabatterie"],["pl",PD.T.plug||"Adattatore, se hai caricatori con la spina italiana a tre poli in linea"]]);
items=items.concat([["bor",PD.T.bottle],["pb","Power bank e cavo"],["sc2","Scarpe comode: si cammina tanto"],["fe",window.PARRAIN?"Ombrello o k-way":"Giacca leggera per la sera"],["off","Scaricare la mappa offline (impostazioni) e aprire l'app con internet prima di partire"]]);
var CKI=items.map(function(x){var k=x[0],g=/^(ch|pl|pb|off)$/.test(k)?2:(/^(doc|bp|st)$/.test(k)||/bigliett|prenot|ingress|contant|€|document|passaporto|carta d|conferma|tessera/i.test(x[1]))?0:1;return{k:k,t:x[1],g:g}});
var CKG=[["Documenti e biglietti","doc",1],["In valigia","bag",2],["Telefono","phone",5]];
function ckCount(){var n=0;CKI.forEach(function(x){if(CK[x.k])n++});return n}
function ckHero(){var n=ckCount(),T=CKI.length,left=T-n,nx="";for(var i=0;i<CKI.length;i++)if(!CK[CKI[i].k]){nx=CKI[i].t;break}
$("#ckbox").innerHTML='<button type="button" class="hero chero cck" id="ckopen">'+csRing(T?n/T:1,68,8,n+"/"+T)+'<span class="ck-t"><b>Prima di partire</b><span>'+(left?(left===1?"Ti manca 1 cosa":"Ti mancano "+left+" cose")+". Prossima: "+esc(nx):"Tutto pronto, buon viaggio")+'</span></span><span class="ck-go">'+csSvg("chev",20,"currentColor",2.2)+'</span></button>'}
window.PARCKN=function(){var n=ckCount();return{done:n,total:CKI.length}};
var fr=PD.PHR?PD.PHR(N,M):[];
var h=M?home():null,tx=M?(PD.TAX.filter(function(t){return t[0]===h.type})[0]||PD.TAX[0]):null;
var avv=avvList(),Z=[["✈️ Aeroporto e trasporti",[A.arr,A.tk].concat(TRIP.R&&TRIP.R!==A?["Il ritorno è da "+TRIP.R.n+": "+TRIP.R.tk]:[]).concat(A.tips||[]).concat(PD.AIRTIPS||[]),1],
M?["🏨 Alloggio e bagagli",[(h.addr?"Il tuo alloggio: "+h.addr+(h.alt?"":" (zona "+h.zn+")"):"Il tuo alloggio è in zona "+h.zn)+". Check-in dalle "+h.cin+", check-out entro le "+h.cout+".","Il primo giorno l'itinerario passa dall'alloggio per lasciare i bagagli; l'ultimo giorno ripassa a prenderli prima dell'aeroporto. Chiedi alla struttura di tenerli: quasi tutte lo fanno gratis.","Se la struttura non tiene i bagagli, ci sono depositi a pagamento come Nannybag o Bounce, prenotabili online.",PD.taxTxt(tx)].concat(PD.STAYTIPS||[])]:null]
.concat((PD.ZONES||[]).filter(function(z){return okIf(z[2])}).map(function(z){return[z[0],z[1]]}))
.concat([PD.WTIPS?["💧 Acqua e fontanelle",PD.WTIPS]:null,fr.length?["🗣️ Frasario",null,2]:null,["📞 Numeri utili",null,3],["🚨 Scioperi e avvisi",null,4],["📋 In generale",PD.GEN]]).filter(Boolean);
function zBody(z){var body;
if(z[2]===2)body='<p class="fh">'+(PD.PHN?esc(PD.PHN):'Tocca l\'altoparlante per sentirla in '+PD.LANGN+'. Sotto c\'è la pronuncia all\'italiana.')+'</p><ul class="fras">'+fr.map(function(f){return '<li><div class="fl"><span class="it">'+esc(f[0])+'</span><b>'+esc(f[1])+'</b><small>'+esc(f[2])+'</small></div>'+(PD.NOSAY?'':'<button type="button" class="say" data-t="'+esc(f[1])+'" aria-label="Ascolta">'+csSvg("spk",22,"currentColor",1.9)+'</button>')+'</li>'}).join("")+'</ul>';
else if(z[2]===3)body='<ul>'+PD.NUMS+'</ul>';
else if(z[2]===4)body='<ul>'+(avv.length?avv.map(function(a){return "<li><b>⚠️ "+esc(a.t)+".</b> "+esc(a.x)+"</li>"}).join(""):"<li>Per "+(TRIP.n===1?esc(dateLong(c.date)):"i giorni del viaggio")+" non risultano scioperi o lavori che riguardano il tuo percorso (verifica del "+esc(PD.VER)+").</li>")+'<li>'+PD.STRK+' Il calendario degli scioperi in Italia è su <a href="https://scioperi.mit.gov.it/" target="_blank" rel="noopener">scioperi.mit.gov.it</a>.</li></ul>';
else body='<ul>'+z[1].map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul>';
return body}
CS.Z=Z.map(function(z){var ii=csZi(z[0]),nm=csName(z[0]),sb;
if(z[2]===2){sb=fr.length+" frasi da ascoltare"}else if(z[2]===3){sb="Emergenze e furti"}else if(z[2]===4){sb=avv.length?(avv.length===1?"1 avviso":avv.length+" avvisi"):"Nessun avviso";ii=avv.length?["alert",6]:["check",4]}
else if(M&&h&&/alloggio/i.test(nm)&&h.cin){sb="Check-in dalle "+h.cin}else{var n=(z[1]||[]).length;sb=n+(n===1?" consiglio":" consigli")}
return{t:nm,sb:sb,ic:ii[0],k:ii[1],body:zBody(z),fr:z[2]===2,warn:z[2]===4&&avv.length>0}});
CS.fn=function(){return};
$("#sosbox").innerHTML='<div class="csos"><div class="so-t"><span>Emergenza, in tutta Europa</span><b>112</b><em>Numero unico: polizia, ambulanza, vigili del fuoco</em></div><a class="so-call" href="tel:112" aria-label="Chiama il 112">'+csSvg("phone",28,"currentColor",2)+'</a></div>';
$("#zones").innerHTML=CS.Z.map(function(z,i){return '<button type="button" class="ctile'+(z.warn?" warn":"")+'" data-i="'+i+'">'+csCirc(z.ic,z.k,40)+'<span class="ct"><b>'+esc(z.t)+'</b><small>'+esc(z.sb)+'</small></span></button>'}).join("");
ckHero();if(CS.back)CS.back();
/* pronuncia: funziona anche con l'interruttore silenzioso dell'iPhone (sessione audio «playback» + traccia muta in loop) */
var QA=null;function quietAudio(){try{if(navigator.audioSession)navigator.audioSession.type="playback"}catch(e){}
try{if(!QA){var n=4000,b=new Uint8Array(44+n),v=new DataView(b.buffer),w=function(o,t){for(var i=0;i<t.length;i++)b[o+i]=t.charCodeAt(i)};w(0,"RIFF");v.setUint32(4,36+n,true);w(8,"WAVEfmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,"data");v.setUint32(40,n,true);for(var i=0;i<n;i++)b[44+i]=128;
QA=new Audio(URL.createObjectURL(new Blob([b],{type:"audio/wav"})));QA.loop=true;QA.setAttribute("playsinline","");QA.volume=.01}
var pr=QA.play();if(pr&&pr.catch)pr.catch(function(){})}catch(e){}}
function quietOff(){try{if(QA)QA.pause()}catch(e){}}
if(!CS.b){CS.b=1;var cv=$("#csview"),cons=$("#consigli");
CS.show=function(h,fr){cv.innerHTML=h;cv.hidden=false;$("#cshub").hidden=true;cons.classList.add("inv");window.scrollTo(0,0);cv.classList.remove("csin");void cv.offsetWidth;cv.classList.add("csin")};
CS.back=function(){var was=!cv.hidden;cv.hidden=true;cv.innerHTML="";$("#cshub").hidden=false;cons.classList.remove("inv");if(was){ckHero();window.scrollTo(0,0)}};
CS.topbar=function(){return '<button type="button" class="csback" aria-label="Torna ai consigli">'+csSvg("back",20,"currentColor",2.2)+'<span>Consigli</span></button>'};
CS.open=function(i){var z=CS.Z[i];if(!z)return;CS.show(CS.topbar()+'<div class="cshead">'+csCirc(z.ic,z.k,52)+'<h3>'+esc(z.t)+'</h3></div><div class="csbody'+(z.fr?" fr":"")+'">'+z.body+'</div>')};
CS.ck=function(){var n=ckCount(),T=CKI.length,hd='<div class="cshead">'+csRing(T?n/T:1,76,9,n+"/"+T)+'<div><h3>Prima di partire</h3><small id="ckleft">'+(T-n?(T-n===1?"Manca 1 cosa":"Mancano "+(T-n)+" cose"):"Tutto pronto")+'</small></div></div>';
var gs=CKG.map(function(g,gi){var l=CKI.filter(function(x){return x.g===gi});if(!l.length)return"";var dn=l.filter(function(x){return CK[x.k]}).length;return '<div class="ckgh">'+csCirc(g[1],g[2],32)+'<b>'+g[0]+'</b><small>'+dn+'/'+l.length+'</small></div><ul class="csck">'+l.map(function(x){return '<li><label><input class="ckin" type="checkbox" data-k="'+x.k+'"'+(CK[x.k]?" checked":"")+'><span class="bx" aria-hidden="true">'+csSvg("check",16,"currentColor",3)+'</span><span class="tx">'+esc(x.t)+'</span></label></li>'}).join("")+'</ul>'}).join("");
CS.show(CS.topbar()+hd+'<div class="ckgs">'+gs+'</div>')};
cons.addEventListener("click",function(e){var t=e.target.closest?e.target.closest(".ctile,#ckopen,.csback,.say"):null;if(!t)return;
if(t.classList.contains("ctile"))CS.open(+t.dataset.i);else if(t.id==="ckopen")CS.ck();else if(t.classList.contains("csback"))CS.back();
else if(t.classList.contains("say")&&t.dataset.t){try{quietAudio();var u=new SpeechSynthesisUtterance(t.dataset.t);u.lang=PD.LANG;u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u);t.classList.add("on");var fin=function(){t.classList.remove("on");setTimeout(quietOff,250)};u.onend=fin;u.onerror=fin;setTimeout(function(){t.classList.remove("on")},3000);setTimeout(quietOff,15000)}catch(x){quietOff()}}});
cons.addEventListener("change",function(e){var x=e.target;if(!x.classList||!x.classList.contains("ckin"))return;CK[x.dataset.k]=x.checked;ls("via-check",JSON.stringify(CK));
var n=ckCount(),T=CKI.length,r=cv.querySelector(".crg .rg-v"),rb=cv.querySelector(".crg b");if(r){var rr=+r.getAttribute("r"),cc=2*Math.PI*rr;r.setAttribute("stroke-dasharray",(cc*(T?n/T:1)).toFixed(1)+" "+cc.toFixed(1));r.style.opacity=n?1:0}if(rb)rb.textContent=n+"/"+T;
var lf=$("#ckleft");if(lf)lf.textContent=T-n?(T-n===1?"Manca 1 cosa":"Mancano "+(T-n)+" cose"):"Tutto pronto 🎉";
var ul=x.closest("ul"),hd=ul&&ul.previousElementSibling;if(hd){var sm=hd.querySelector("small"),all=ul.querySelectorAll(".ckin");sm.textContent=[].filter.call(all,function(q){return q.checked}).length+"/"+all.length}});
[].forEach.call(document.querySelectorAll(".tabr"),function(r){r.addEventListener("change",function(){if(this.id!=="t-consigli"&&CS.back)CS.back()})})}
$("#foot").textContent="Itinerario per "+(N===1?"una persona":N+" persone")+", "+rangeTxt()+" "+dateObj(c.date).getUTCFullYear()+". Dati verificati il "+PD.VER+"."}

var BOOT=true;
function renderAll(){if(!CFG)return;if(PAR.flush)PAR.flush();TRIP=buildTrip(CFG);var ti=todayIdx();SEL=ti>=0?ti:Math.min(SEL,TRIP.n-1);if(SEL<0)SEL=0;P=TRIP.days[SEL];WD=P.wd;lastNow=-2;
renderHero();renderDays();renderBar();renderStay();renderShort();renderItin();renderAvv();liveTick();
function rest(){PREADY=false;meteo();PREADY=true;renderVoli();renderPasti();renderCosti(false);renderSpese();renderConsigli()}
/* all'avvio le schede non visibili si preparano dopo la prima schermata, quando l'intro è finita; al primo tocco subito */
if(BOOT){BOOT=false;var bt=setTimeout(function(){PAR.flush&&PAR.flush()},3900);PAR.flush=function(){clearTimeout(bt);PAR.flush=null;rest();PAR.emit()}}else rest();
PAR.emit()}
PAR.render=renderAll;["pointerdown","keydown","change"].forEach(function(t){document.addEventListener(t,function(){if(PAR.flush)PAR.flush()},{capture:true,passive:true})});
setInterval(liveTick,30000);document.addEventListener("visibilitychange",function(){if(!document.hidden)liveTick()});window.addEventListener("pageshow",function(e){if(e.persisted)liveTick()});
document.getElementById("t-costi").addEventListener("change",function(){if(!(this.checked&&CFG))return;var mo=$("#cnote details");if(mo)mo.open=false;var bar=$("#cdonut .cbar");if(bar&&bar.children.length){bar.classList.remove("anim");void bar.offsetWidth;bar.classList.add("anim")}else renderCosti(true)});

/* ===== schermata «Il tuo viaggio» ===== */
var setup=$("#setup"),form=$("#sform"),serr=$("#serr"),stayF=$("#stayf");
$("#aplist").innerHTML=PD.FROM.map(function(f){return '<option value="'+esc(f[1]+" ("+f[0]+")")+'">'}).join("");
form.sz.innerHTML=PD.HZ.map(function(z){return '<option value="'+z[0]+'">'+esc(z[1])+'</option>'}).join("");
form.stype.innerHTML=PD.TAX.map(function(t){return '<option value="'+t[0]+'">'+esc(t[1])+'</option>'}).join("");
var APK=Object.keys(PD.PAR);var aptH=function(nm){return APK.map(function(k,i){var A=PD.PAR[k];return '<label class="apt"><input type="radio" name="'+nm+'" value="'+k+'"'+(i?'':' checked')+'><b>'+k+'</b><span>'+esc(A.sd)+'</span></label>'}).join("")};
$("#apts").innerHTML=aptH("to");$("#rapts").innerHTML=aptH("rto");$("#rapf").hidden=APK.length<2;
/* il ritorno segue l'arrivo finché non lo scegli tu */
function rtSync(){var t=($('input[name=to]:checked',form)||{}).value,r=($('input[name=rto]:checked',form)||{}).value;$("#rapn").hidden=!(t&&r&&t!==r)}
$("#apts").addEventListener("change",function(){if(!form.dataset.rt){var t=($('input[name=to]:checked',form)||{}).value;$$('input[name=rto]',form).forEach(function(r){r.checked=r.value===t})}rtSync()});
$("#rapts").addEventListener("change",function(){form.dataset.rt="1";rtSync()});
$("#sfuso").textContent="Orari in ora locale ("+PD.T.fuso+"). I dati restano solo su questo telefono.";
function dnote(){var a=form.date.value,b=form.date_r.value,n=1;if(a&&b&&b>a)n=Math.round((dateObj(b)-dateObj(a))/864e5)+1;
$("#dnote").textContent=!a?"Scegli le date: per una gita in giornata lascia il ritorno uguale all'andata.":n===1?"Gita in giornata, senza hotel.":n+" giorni e "+(n-1)+(n===2?" notte: dopo i voli aggiungerai l'hotel.":" notti: dopo i voli aggiungerai l'hotel.");
var multi=n>1,si=$("#stayin");if(si.hidden===multi){si.hidden=!multi;$("#stayno").hidden=multi;if(multi){si.classList.remove("pop");void si.offsetWidth;si.classList.add("pop")}}
$("#rlab").textContent=multi?"Ritorno":"Ritorno (stesso giorno)";paintSteps()}
form.date.addEventListener("change",function(){form.date_r.min=form.date.value;if(!form.date_r.value||form.date_r.value<form.date.value)form.date_r.value=form.date.value;dnote()});
form.date_r.addEventListener("change",dnote);$$('input[type=date],input[type=time]',form).forEach(function(i){i.addEventListener("click",function(){try{if(i.showPicker)i.showPicker()}catch(e){}})});form.date.addEventListener("input",dnote);form.date_r.addEventListener("input",dnote);
function openSetup(first,stp){var c=CFG||{},s=c.stay||{};form.date.value=c.date||"";form.date.min=paris().d;form.date_r.value=c.date_r||c.date||"";form.date_r.min=c.date||paris().d;$("#ppl").textContent=c.ppl||2;form.from.value=c.from||"";
var to0=c.to&&PD.PAR[c.to]?c.to:APK[0],rt0=c.rt&&PD.PAR[c.rt]?c.rt:to0;$$('input[name=to]',form).forEach(function(r){r.checked=r.value===to0});$$('input[name=rto]',form).forEach(function(r){r.checked=r.value===rt0});if(rt0!==to0)form.dataset.rt="1";else delete form.dataset.rt;rtSync();["a_dep","a_arr","r_imb","r_dep"].forEach(function(k){form[k].value=c[k]||""});
form.sz.value=s.zone||PD.HZ[0][0];form.saddr.value=s.addr||"";form.sin.value=s.cin||"15:00";form.sout.value=s.cout||"11:00";form.sprice.value=s.price||"";form.stype.value=s.type||PD.TAXDEF||PD.TAX[0][0];
var sv=sty(c);$$("input[name=th]",form).forEach(function(r){r.checked=r.value===sv.th});$$("input[name=pc]",form).forEach(function(r){r.checked=r.value===sv.pc});
$$("input,select",form).forEach(function(x){x.classList.remove("bad")});serr.textContent="";$("#scancel").hidden=!CFG;$("#stayin").hidden=true;$("#stayno").hidden=false;setHead();dnote();showStep(stp||0);
closeSheet();setup.classList.add("on");setup.setAttribute("aria-hidden","false");setup.scrollTop=0;setTimeout(function(){document.documentElement.classList.remove("hold")},600)}
function closeSetup(){setup.classList.remove("on");setup.setAttribute("aria-hidden","true")}
/* ===== destinazioni ===== */
var DEST=(window.CITY_ORDER||Object.keys(CITIES)).map(function(id){var C=CITIES[id];return{id:id,n:C.n,c:C.cn,e:C.e,ok:1,col:C.col,k:C.k,r:(window.REG||{})[id]||"eu"}}).concat(window.SOON||[]);
var SETDEST=PD.id;
function dOf(id){return DEST.filter(function(d){return d.id===id})[0]||DEST[0]}
function setCity(id){var r=document.documentElement,cur=r.getAttribute("data-city")||"";if((id||"")===cur)return;if(id)r.setAttribute("data-city",id);else r.removeAttribute("data-city");
r.classList.remove("recolor");void r.offsetWidth;r.classList.add("recolor");clearTimeout(setCity._t);setCity._t=setTimeout(function(){r.classList.remove("recolor")},950);try{window.dispatchEvent(new Event("citycolor"))}catch(e){}}
function setHead(){$("#sem").textContent=PD.e;$("#sdest").textContent=PD.n;$("#sdsub").textContent=PD.cn+" · guida completa";$("#alab").textContent="Atterraggio a "+PD.n}
var TK=["via-spese","via-check","via-copt","via-meals","via-water","via-vlive","via-vlive-n"];
function trips(){var a=lj("via-trips",[]);return Array.isArray(a)?a.filter(function(t){return t&&t.cfg&&t.cfg.date&&CITIES[t.cfg.dest]}):[]}
function putTrips(a){ls("via-trips",a.length?JSON.stringify(a.slice(0,12)):null)}
function newTid(){return Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36)}
function parkCur(){var s=lj("via-trip",null);if(s&&s.date&&CITIES[s.dest]){if(!s.tid)s.tid=newTid();var st={};TK.forEach(function(k){var v=ls(k);if(v!=null)st[k]=v});var a=trips().filter(function(t){return t.cfg.tid!==s.tid});a.unshift({cfg:s,st:st});putTrips(a)}ls("via-trip",null);TK.forEach(function(k){ls(k,null)})}
function switchTrip(i){var a=trips(),t=a[i];if(!t)return;a.splice(i,1);putTrips(a);parkCur();ls("via-trip",JSON.stringify(t.cfg));Object.keys(t.st||{}).forEach(function(k){if(TK.indexOf(k)>=0)ls(k,t.st[k])});goCity(t.cfg.dest)}
function dropCur(){ls("via-trip",null);TK.forEach(function(k){ls(k,null)});CFG=null;SAVED=null;TRIP=null;SP={};CK={};COPT={};MEALS={}}
function goCity(id,open){ss("via-pick",id);if(open)ss("via-open",open);location.reload()}
function rangeOf(c){var a=dateObj(c.date),b=dateObj(c.date_r||c.date);if((c.date_r||c.date)===c.date)return dateShort(c.date);return a.getUTCMonth()===b.getUTCMonth()?a.getUTCDate()+"–"+b.getUTCDate()+" "+MESI[b.getUTCMonth()]:dateShort(c.date)+" – "+dateShort(c.date_r)}
var destEl=$("#dest"),dgrid=$("#dgrid"),dfind=$("#dfind");
function sw(d){return '--a:'+d.col[0]+';--b:'+d.col[1]+';--c:'+d.col[2]}
var DREG="",DEXP=false,DLIM=12,DSET=null,DSN="",DALL=false;
var CHIPS=[["🏖️","Mare",["bcn","lisbona","valencia","malaga","atene","napoli","valletta","porto","siviglia","venezia"]],["🎄","Mercatini",["vienna","praga","salisburgo","monaco","budapest","bruxelles","cracovia","tallinn","riga","vilnius"]],["🧊","Nord",["copenaghen","stoccolma","oslo","helsinki","reykjavik","tallinn","riga","edimburgo"]],["🏛️","Arte e storia",["roma","firenze","atene","istanbul","vienna","parigi","paris","madrid","praga","venezia"]]];
(function(){var el=$("#dreg");if(!el)return;var R=window.REGN||{};el.innerHTML='<button type="button" class="on" data-r="">Tutte</button>'+Object.keys(R).map(function(k){return '<button type="button" data-r="'+k+'">'+R[k]+'</button>'}).join("");
el.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;DREG=b.dataset.r;DEXP=false;$$("button",el).forEach(function(x){x.classList.toggle("on",x===b)});renderDest()})})();
function liveBlk(t){var o=null;try{o=JSON.parse(localStorage.getItem("via-live")||"null")}catch(e){}
if(!o||o.k!==t.cfg.dest+t.cfg.date||Date.now()-o.t>4*36e5)return '';
var h='<span class="pnx"><b>'+esc(o.b)+'</b>'+(o.s?'<small>'+esc(o.s)+'</small>':'')+'</span>';
if(o.bar&&o.bar.a&&o.bar.a.length){var a=o.bar.a,e=o.bar.e,st=a[0],span=Math.max(1,e-st),m=Math.max(st,Math.min(e,o.bar.m+Math.round((Date.now()-o.t)/6e4))),p=((m-st)/span*100).toFixed(1);
h+='<span class="pdy" aria-hidden="true">'+a.map(function(x,i){var nx=(a[i+1]!=null?a[i+1]:e),w=Math.max(2,(nx-x)/span*100);return '<i style="flex:'+w.toFixed(1)+'"></i>'}).join("")+'<em style="left:'+p+'%"></em></span>'}
return h}
var WXC={};function pPr(t){return t.now?1:Math.max(.06,Math.min(1,1-t.dd/60)).toFixed(3)}
function wxIc(c){return c===0?"☀️":c<=2?"🌤️":c===3?"☁️":c<=48?"🌫️":c<=67?"🌧️":c<=77?"🌨️":c<=82?"🌦️":"⛈️"}
function pSp(t){var q=spSum(t);return q?'<span class="pe" aria-label="Spese finora">💶 '+esc(ec(q.tot))+(t.cfg.ppl>1?' · '+esc(ec(q.pp))+' a testa':'')+'</span>':''}
function tkSp(t){var q=spSum(t);if(!q)return '';return '<span class="tkx">💶 '+esc(ec(q.tot))+(t.cfg.ppl>1?' · '+esc(ec(q.pp))+' a testa':'')+(t.past&&q.cs[0]?' · '+(CI[q.cs[0].k]||"")+' '+esc(catName(q.cs[0].k)):'')+'</span>'}
function wxPass(t){var el=$("#pw");if(!el||!t||t.dd>14||t.dd<-1)return;var c=t.cfg,L=CITIES[c.dest]&&CITIES[c.dest].LL,day=t.now?todayStr():c.date,key=c.dest+day;if(!L)return;
function show(w){var e=$("#pw");if(!e||!w)return;e.hidden=false;e.innerHTML='<span aria-hidden="true">'+wxIc(w[0])+'</span> '+(t.now&&w[3]!=null?'Adesso '+Math.round(w[3])+'° · ':'')+Math.round(w[1])+'° / '+Math.round(w[2])+'°'}
if(WXC[key]){show(WXC[key]);return}if(!window.fetch)return;
fetch("https://api.open-meteo.com/v1/forecast?latitude="+L[0]+"&longitude="+L[1]+"&current=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date="+day+"&end_date="+day).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){var d=j&&j.daily;if(!d||d.weathercode==null)throw 0;var cu=j.current;WXC[key]=[t.now&&cu&&cu.weathercode!=null?cu.weathercode:d.weathercode[0],d.temperature_2m_max[0],d.temperature_2m_min[0],t.now&&cu?cu.temperature_2m:null];show(WXC[key])}).catch(function(){})}
function stampMap(dn){var el=$("#dmap");if(!el)return;if(!dn.length){el.hidden=true;el.innerHTML="";return}var vis={};dn.forEach(function(t){var id=t.cfg.dest,d=dateObj(t.cfg.date);if(!vis[id]||d<vis[id])vis[id]=d});
var ids=Object.keys(CITIES).filter(function(i){return CITIES[i]&&CITIES[i].LL}),got=ids.filter(function(i){return vis[i]}).sort(function(a,b){return vis[a]-vis[b]}),lock=ids.filter(function(i){return!vis[i]}),h="",k=0;
function rot(id){var n=0;for(var q=0;q<id.length;q++)n+=id.charCodeAt(q)*(q+3);return(n%15)-7}
got.slice(0,15).forEach(function(i){var d=dOf(i),m=vis[i].toLocaleDateString("it-IT",{month:"short",year:"numeric"}).replace(".","").toUpperCase(),nm=(d.n||i).toUpperCase();
h+='<li class="stp" style="--a:'+d.col[0]+';--b:'+d.col[1]+';--r:'+rot(i)+'deg;--d:'+(k++*.1).toFixed(2)+'s"><i aria-hidden="true">'+d.e+'</i><b'+(nm.length>9?' class="lg"':'')+'>'+esc(nm)+'</b><small>'+esc(m)+'</small></li>'});
lock.slice(0,Math.max(1,Math.ceil((Math.min(got.length,15)+1)/4)*4-Math.min(got.length,15))).forEach(function(){h+='<li class="stp lk" aria-hidden="true"><i>?</i><small>da scoprire</small></li>'});
var more=Math.max(0,got.length-15);
el.hidden=false;el.innerHTML='<p class="dmt">Il tuo passaporto</p><ul class="stps" aria-label="Timbri delle città visitate: '+got.length+' di '+ids.length+'">'+h+'</ul><div class="dmc"><b>'+got.length+'</b> di '+ids.length+' città'+(more?' · altri '+more+' timbri':'')+'</div>'}
function favs(){var a=lj("via-fav",[]);return Array.isArray(a)?a.filter(function(x){return CITIES[x]}):[]}
function favTog(id){var a=favs(),i=a.indexOf(id);if(i<0)a.unshift(id);else a.splice(i,1);ls("via-fav",a.length?JSON.stringify(a):null);return i<0}
function hap(n){try{if(navigator.vibrate)navigator.vibrate(n||12)}catch(e){}}
/* spese di un viaggio (anche se parcheggiato): totale, a testa e categorie */
function spSum(t){var raw=null;try{raw=t.cur?localStorage.getItem("via-spese"):((trips()[t.i]||{}).st||{})["via-spese"]}catch(e){}if(!raw)return null;var o;try{o=JSON.parse(raw)}catch(e){return null}
var X=o&&Array.isArray(o.x)?o.x:[];if(!X.length)return null;var tot=0,by={};X.forEach(function(x){var c=c100(x.a);tot+=c;by[x.c||"ex"]=(by[x.c||"ex"]||0)+c});if(!(tot>0))return null;
var cs=Object.keys(by).sort(function(a,b){return by[b]-by[a]}).slice(0,3).map(function(k){return{k:k,v:by[k]}});return{tot:tot,pp:Math.round(tot/Math.max(1,t.cfg.ppl||1)),cs:cs,n:X.length}}
function renderDest(){var q=(dfind.value||"").trim().toLowerCase(),list=DEST.filter(function(d){return(!DSET||DSET.indexOf(d.id)>=0)&&(!DREG||d.r===DREG)&&(!q||d.k.indexOf(q)>=0||d.n.toLowerCase().indexOf(q)>=0)});
var fl=$("#dfil");if(fl){fl.hidden=!DSET;fl.innerHTML=DSET?'<button type="button" class="dfx">'+esc(DSN)+' <i aria-hidden="true">✕</i></button>':"";var fx=fl.querySelector(".dfx");if(fx)fx.addEventListener("click",function(){DSET=null;DSN="";DEXP=false;renderDest()})}
var FV=favs();if(!q)list=list.slice().sort(function(a,b){return(FV.indexOf(a.id)<0?1:0)-(FV.indexOf(b.id)<0?1:0)});
var lim=(!q&&!DEXP)?DLIM:1e9,more=$("#dmore");more.hidden=!!q||list.length<=DLIM;more.textContent=DEXP?"Mostra meno ▴":"Mostra tutte le città ("+(list.length-DLIM)+" altre) ▾";more.setAttribute("aria-expanded",DEXP?"true":"false");
dgrid.innerHTML=list.slice(0,lim).map(function(d){return '<button type="button" class="dcity'+(d.ok?" ok":"")+'" data-city="'+d.id+'" style="'+sw(d)+'"><i class="dsw"></i><span class="dem">'+d.e+'</span><b>'+esc(d.n)+'</b><small>'+esc(d.c)+'</small><em>'+(d.ok?"Guida completa":"In arrivo")+'</em><span class="dfv'+(FV.indexOf(d.id)>=0?" on":"")+'" data-fv="'+d.id+'" role="button" tabindex="0" aria-pressed="'+(FV.indexOf(d.id)>=0)+'" aria-label="Preferita: '+esc(d.n)+'">'+(FV.indexOf(d.id)>=0?"♥":"♡")+'</span></button>'}).join("");
var none=$("#dnone");none.hidden=list.length>0;if(!list.length)none.textContent=q?"Nessuna città per «"+dfind.value.trim()+"», per ora. Ne aggiungiamo di nuove di continuo.":"Nessuna città in questa area, per ora.";
var mine=$("#dmine"),all=[],hasCur=SAVED&&SAVED.date&&CITIES[SAVED.dest];if(hasCur)all.push({cur:1,cfg:SAVED});trips().forEach(function(t,k){all.push({i:k,cfg:t.cfg})});
var td=todayStr();all.forEach(function(t){var c=t.cfg,en=c.date_r||c.date;t.past=en<td;t.now=!t.past&&c.date<=td;t.dd=Math.round((dateObj(c.date)-dateObj(td))/864e5)});
var up=all.filter(function(t){return!t.past}).sort(function(x,y){return x.cfg.date<y.cfg.date?-1:1}),dn=all.filter(function(t){return t.past}).sort(function(x,y){return x.cfg.date<y.cfg.date?1:-1});
all=up.concat(dn);
function stub(t){if(t.past)return '<b>✓</b><span>fatto</span>';if(t.now){var tot=Math.round((dateObj(t.cfg.date_r||t.cfg.date)-dateObj(t.cfg.date))/864e5)+1;return '<span>giorno</span><b>'+(1-t.dd)+'</b><span>di '+tot+'</span>'}if(t.dd===0)return '<b>oggi</b>';return '<span>tra</span><b>'+t.dd+'</b><span>'+(t.dd===1?"giorno":"giorni")+'</span>'}
function rt(c,d){return c.fromCode&&c.to?esc(c.fromCode)+" → "+esc(c.to):d.e+" "+esc(d.n)}
var dl=$("#dlw"),dp=$("#dpass"),db=$("#dbrand")||dl.parentNode,bd=$("#dbadge");
db.dataset.st=!all.length?"":up.length?"up":"done";var hs=false;try{hs=!localStorage.getItem("via-iconhint")}catch(e){}dl.classList.toggle("hint",hs&&all.length>0&&!DOPEN);dl.disabled=false;
bd.hidden=!all.length;bd.textContent=up.length?up.length:"✓";
if(up.length){var n0=up[0],d0=dOf(n0.cfg.dest);dp.hidden=false;dp.classList.toggle("now",!!n0.now);dp.style.cssText=sw(d0);dp.innerHTML='<span class="tm"><small>'+(n0.now?"Viaggio in corso":"Prossimo viaggio")+'</small><b>'+rt(n0.cfg,d0)+'</b><span>'+esc(d0.n)+' · '+(n0.now?"oggi giorno "+(1-n0.dd)+" di "+(Math.round((dateObj(n0.cfg.date_r||n0.cfg.date)-dateObj(n0.cfg.date))/864e5)+1):esc(rangeOf(n0.cfg)))+'</span><span class="pgo">'+(n0.now?"Apri il viaggio":"Apri il viaggio")+' →</span>'+(n0.now?liveBlk(n0):'<span class="pl" aria-hidden="true"><i style="--p:'+pPr(n0)+'"></i><em style="--p:'+pPr(n0)+'">✈︎</em></span>')+'<span class="pw" id="pw" hidden></span>'+pSp(n0)+'</span><span class="ts'+(n0.now?" nw":"")+'">'+stub(n0)+'</span>';wxPass(n0)}else{dp.hidden=true;dp.innerHTML=""}
$("#dnext .dnl").textContent=all.length?"Pianifica un nuovo viaggio":"Pianifica il tuo primo viaggio";var al=$("#dal");if(up.length&&!up[0].now&&up[0].dd<=2){al.hidden=false;al.textContent=up[0].dd===0?"Si parte oggi: buon viaggio!":up[0].dd===1?"Domani si parte: hai controllato voli, documenti e valigia?":"Mancano due giorni: hai controllato voli e meteo?"}else{al.hidden=true;al.textContent=""}
stampMap(dn);var st=$("#dstat");if(dn.length){var cs={},dys=0;dn.forEach(function(t){cs[t.cfg.dest]=1;dys+=Math.round((dateObj(t.cfg.date_r||t.cfg.date)-dateObj(t.cfg.date))/864e5)+1});var nc=Object.keys(cs).length;st.hidden=false;st.textContent=nc+(nc===1?" città · ":" città · ")+dys+(dys===1?" giorno":" giorni")+" in viaggio"}else{st.hidden=true;st.textContent=""}
var ide=$("#didea"),IDEE=[
[["reykjavik","Luci del nord e bagni caldi"],["edimburgo","Vicoli e pub contro il freddo"],["vienna","Caffè storici e concerti"],["praga","Città vecchia senza la folla"]],
[["venezia","Calli quasi vuote e aria di Carnevale"],["budapest","Bagni termali con il freddo"],["siviglia","Primi tepori andalusi"],["salisburgo","Atmosfera d'inverno da cartolina"]],
[["siviglia","Arance in fiore e primavera in arrivo"],["lisbona","Luce dolce e terrazze"],["malaga","Sole già caldo e mare"],["valencia","Aria di festa e sole"]],
[["amsterdam","Stagione dei tulipani"],["porto","Fiumi, vino e primavera"],["roma","Primavera tra i monumenti"],["bruxelles","Parchi e caffè all'aperto"]],
[["lisbona","Luce e terrazze sul fiume"],["bcn","Spiaggia e tapas"],["copenaghen","Biciclette e giornate lunghe"],["firenze","Colline e giardini in fiore"]],
[["helsinki","Giornate lunghissime"],["stoccolma","Isole e luce infinita"],["tallinn","Città vecchia con il sole fino a sera"],["oslo","Fiordi e tramonti tardi"]],
[["tallinn","La città vecchia d'estate"],["riga","Art nouveau e giorni lunghi"],["reykjavik","Luce a tutte le ore"],["copenaghen","Bagni nel porto"]],
[["lubiana","Fiume, caffè e verde fresco"],["zagabria","Estate lenta e caffè all'aperto"],["valletta","Mare e pietra dorata"],["oslo","Fiordi in estate"]],
[["porto","Luce dorata e vendemmia"],["monaco","Birrerie e prati d'autunno"],["vienna","Fine estate nei caffè"],["istanbul","Bosforo senza il caldo forte"]],
[["edimburgo","Autunno scozzese tra castelli e vicoli"],["lisbona","Ancora luce e tram"],["atene","Antichità senza il caldo estremo"],["praga","Tetti rossi e foglie"]],
[["budapest","Bagni termali con il freddo"],["napoli","Pizza e sole tiepido"],["amburgo","Porto e atmosfera nordica"],["sofia","Montagne e poca folla"]],
[["vienna","Mercatini di Natale"],["salisburgo","Natale tra le Alpi"],["praga","Mercatini e Città vecchia"],["tallinn","Piazza con l'albero e i mercatini"]]],
mn=new Date().getMonth(),ix=(IDEE[mn]||[]).filter(function(x){return CITIES[x[0]]});window.__ideas=ix;window.__used={};all.forEach(function(t){window.__used[t.cfg.dest]=1});
if(ix.length){ide.hidden=false;ide.innerHTML='<div class="dih">'+(all.length?"Idee per "+MESI[mn]:"Dove vuoi andare? Idee per "+MESI[mn])+'</div><div class="dir">'+ix.map(function(x){var q=dOf(x[0]);return '<button type="button" class="dic" data-c="'+x[0]+'" style="'+sw(q)+'"><span class="ie">'+q.e+'</span><b>'+esc(q.n)+'</b><span>'+esc(x[1])+'</span></button>'}).join("")+'</div>'}else ide.hidden=true;
homeSet(all,up,dn,ix);var my=$("#dmy");if(my){my.hidden=!all.length;$("#dmyn").textContent=all.length;my.setAttribute("aria-expanded",DOPEN?"true":"false");$(".dmyl",my).textContent=DOPEN?"Chiudi i viaggi":"I miei viaggi"}
dl.setAttribute("aria-label",all.length?"I miei viaggi ("+all.length+")":"Viaticum");
if(!all.length)DOPEN=false;
if(all.length){mine.hidden=!DOPEN;
function tk(t){var c=t.cfg,d=dOf(c.dest),k=all.indexOf(t),pl=c.ppl===1?"1 persona":(c.ppl||1)+" persone";
var det=(c.a_dep&&c.a_arr?'<div><small>Andata</small><b>'+esc(c.a_dep)+' → '+esc(c.a_arr)+'</b></div>':'')+(c.r_dep?'<div><small>Ritorno, partenza</small><b>'+esc(c.r_dep)+'</b></div>':'');
return '<div class="tk'+(t.past?" dn":"")+'" style="'+sw(d)+';--n:'+k+'"><button type="button" class="tkb" data-k="'+k+'" aria-expanded="false"><span class="tm"><small>'+d.e+' '+esc(d.n)+' · '+pl+'</small><b>'+rt(c,d)+'</b><span>'+esc(rangeOf(c))+'</span>'+tkSp(t)+'</span><span class="ts'+(t.now?" nw":"")+'">'+stub(t)+'</span>'+(t.past?'<span class="stamp" aria-hidden="true">'+esc(d.n)+'<br>'+MESI[dateObj(c.date_r||c.date).getUTCMonth()]+' '+(c.date_r||c.date).slice(0,4)+'</span>':'')+'</button><div class="tkd" hidden>'+(det?'<div class="tkg">'+det+'</div>':'')+'<div class="tka"><button type="button" class="btn tgo" data-k="'+k+'">Apri viaggio</button></div><div class="tfoot"><button type="button" class="tcl">Chiudi</button><button type="button" class="tdel" data-k="'+k+'">Elimina viaggio</button></div></div></div>'}
var dns=DALL?dn:dn.slice(0,3);var lpu=false;try{lpu=!!localStorage.getItem("via-lpused")}catch(e){}mine.innerHTML=(lpu?'':'<p class="thint">Tocca un viaggio per aprirlo · tieni premuto per le opzioni</p>')+(up.length?'<div class="tsec">In programma</div>'+up.map(tk).join(""):'')+(dn.length?'<div class="tsec">Già fatti</div>'+dns.map(tk).join("")+(dn.length>3?'<button type="button" class="tmore" id="tmore">'+(DALL?"Mostra meno":"Vedi tutti ("+dn.length+")")+'</button>':''):'')+'<button type="button" class="tnew" id="dnew">＋ Nuovo viaggio</button>';
window.__openNext=function(){if(up.length)openTk(all.indexOf(up[0]))};var tm=$("#tmore",mine);if(tm)tm.addEventListener("click",function(){DALL=!DALL;renderDest()});
function openTk(k){var t=all[+k];if(!t)return;fade(function(){go()});function go(){if(t.cur){if(!SAVED||!SAVED.dest){closeDest();return}if(SAVED.dest===PD.id&&CFG){closeDest();setCity(PD.id)}else goCity(SAVED.dest)}else switchTrip(t.i)}}
function fade(fn,ms){var el=destEl;if(!el.animate||matchMedia("(prefers-reduced-motion:reduce)").matches||window.LITE&&0){fn();return}var an=el.animate([{opacity:1,transform:"none"},{opacity:0,transform:"scale(.985)"}],{duration:ms||170,easing:"ease-in",fill:"forwards"});an.onfinish=function(){fn();setTimeout(function(){try{an.cancel()}catch(e){}},60)}}
var TKM=null;
function closeMenu(now){if(!TKM)return;var m=TKM;TKM=null;$$(".tk.sel").forEach(function(x){x.classList.remove("sel")});if(now||!m.el.animate){m.el.remove();m.bg.remove();return}var o=m.el.animate([{opacity:1},{opacity:0}],{duration:120,fill:"forwards"});m.bg.animate([{opacity:1},{opacity:0}],{duration:120,fill:"forwards"});o.onfinish=function(){m.el.remove();m.bg.remove()}}
function showMenu(b,x,y){try{localStorage.setItem("via-lpused","1")}catch(e){}closeMenu(true);var tkEl=b.parentNode,k=b.dataset.k,t=all[+k],c=t.cfg,d=dOf(c.dest),W=innerWidth,H=innerHeight,R=92,up=y>200,ud=up?-1:1,cx=Math.max(122,Math.min(W-122,x)),
 bg=document.createElement("div"),el=document.createElement("div");
tkEl.classList.add("sel");
bg.className="tkm-bg";el.className="tkm";el.setAttribute("role","menu");el.setAttribute("aria-label","Opzioni del viaggio a "+d.n);
var det=(c.a_dep&&c.a_arr?"Andata "+c.a_dep+" → "+c.a_arr:"")+(c.r_dep?(c.a_dep&&c.a_arr?" · ":"")+"ritorno "+c.r_dep:"");
function bt(lab,ic,ang,cls,fn,i){var r=ang*Math.PI/180,L=Math.round(cx+R*Math.cos(r)),T=Math.round(y+ud*R*Math.sin(r)),u=document.createElement("button");u.type="button";u.className="tkm-b "+cls;u.setAttribute("role","menuitem");u.style.cssText="left:"+L+"px;top:"+T+"px;--i:"+i+";--fx:"+(x-L)+"px;--fy:"+(y-T)+"px";u.innerHTML='<span aria-hidden="true">'+ic+'</span><small>'+lab+'</small>';u.addEventListener("click",function(ev){ev.stopPropagation();closeMenu(true);fn()});return u}
var lab=document.createElement("div");lab.className="tkm-l";lab.style.cssText="left:"+Math.max(Math.min(122,W/2-12),Math.min(W-Math.min(122,W/2-12),cx))+"px;top:"+Math.round(up?y-R-86:y+R+60)+"px";lab.innerHTML='<b>'+d.e+' '+esc(d.n)+'</b><span>'+esc(rangeOf(c))+(det?' · '+esc(det):'')+'</span>';
var pt=document.createElement("i");pt.className="tkm-p";pt.style.cssText="left:"+x+"px;top:"+y+"px";
el.appendChild(pt);el.appendChild(lab);
el.appendChild(bt("Apri","▶",125,"go",function(){openTk(k)},0));
el.appendChild(bt("Elimina","🗑",55,"del",function(){tkEl.querySelector(".tdel").click()},1));
bg.addEventListener("click",function(){closeMenu()});bg.addEventListener("contextmenu",function(e){e.preventDefault();closeMenu()});
document.body.appendChild(bg);document.body.appendChild(el);TKM={el:el,bg:bg};
try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}}
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&TKM)closeMenu()});document.addEventListener("selectstart",function(e){if(TKM||e.target.closest&&e.target.closest(".tkb"))e.preventDefault()},true);
function lpAttach(el,open,can){var tm=0,sx=0,sy=0,hold=false,pt="mouse",hv=null;
function cl(){clearTimeout(tm);tm=0}
function hov(x,y){var best=null,bd=56;if(TKM)[].forEach.call(TKM.el.querySelectorAll(".tkm-b"),function(u){var r=u.getBoundingClientRect(),d=Math.hypot(x-(r.left+r.width/2),y-(r.top+r.height/2));if(d<bd){bd=d;best=u}});if(best===hv)return;if(hv)hv.classList.remove("hov");hv=best;if(best){best.classList.add("hov");try{navigator.vibrate&&navigator.vibrate(4)}catch(e){}}}
function fin(ok){if(!hold)return;hold=false;var u=hv;if(hv){hv.classList.remove("hov");hv=null}if(ok&&u)u.click();else closeMenu()}
el.addEventListener("pointerdown",function(e){el.__lp=false;hold=false;sx=e.clientX;sy=e.clientY;pt=e.pointerType;cl();if(can&&!can())return;tm=setTimeout(function(){tm=0;el.__lp=true;hold=pt!=="mouse";try{getSelection().removeAllRanges()}catch(x){}open(sx,sy)},450)});
el.addEventListener("pointermove",function(e){if(hold){hov(e.clientX,e.clientY);return}if(tm&&(Math.abs(e.clientX-sx)>9||Math.abs(e.clientY-sy)>9))cl()});
el.addEventListener("pointerup",function(){cl();fin(true)});el.addEventListener("pointercancel",function(){cl();fin(false)});el.addEventListener("pointerleave",cl);el.addEventListener("touchmove",function(e){if(hold&&e.cancelable)e.preventDefault()},{passive:false});
el.addEventListener("contextmenu",function(e){e.preventDefault();if(hold||TKM&&pt!=="mouse")return;if(can&&!can())return;cl();el.__lp=true;open(e.clientX,e.clientY)})}
$$(".tkb",mine).forEach(function(b){lpAttach(b,function(x,y){showMenu(b,x,y)});
b.addEventListener("click",function(e){if(b.__lp){b.__lp=false;e.preventDefault();return}openTk(b.dataset.k)})});
window.__tkMenu=function(x,y){var b=mine.querySelector(".tk:not(.dn) .tkb");if(b)showMenu(b,x,y)};
var hcE=$("#dhc");if(hcE&&!hcE.__lpb){hcE.__lpb=1;lpAttach(hcE,function(x,y){if(window.__tkMenu)window.__tkMenu(x,y)},function(){return hcE.dataset.mode==="trip"})}
$$(".tcl",mine).forEach(function(b){b.addEventListener("click",function(){var k=b.closest(".tk");k.querySelector(".tkd").hidden=true;k.querySelector(".tkb").setAttribute("aria-expanded","false")})});
$$(".tgo",mine).forEach(function(b){b.addEventListener("click",function(){var t=all[+b.dataset.k];if(!t)return;if(t.cur){if(!SAVED||!SAVED.dest){closeDest();return}if(SAVED.dest===PD.id&&CFG){closeDest();setCity(PD.id)}else goCity(SAVED.dest)}else switchTrip(t.i)})});
$("#dnew",mine).addEventListener("click",function(){setPick(1)});
$$(".tdel",mine).forEach(function(b){b.addEventListener("click",function(){var t=all[+b.dataset.k],d=dOf(t.cfg.dest),snap={};try{for(var q=0;q<localStorage.length;q++){var kk=localStorage.key(q);if(kk&&kk.indexOf("via-")===0)snap[kk]=localStorage.getItem(kk)}}catch(x){}var wasCur=!!t.cur;if(t.cur)dropCur();else{var a=trips();a.splice(t.i,1);putTrips(a)}renderDest();
window.__undoToast("Viaggio eliminato","Annulla",function(){try{Object.keys(snap).forEach(function(kk){localStorage.setItem(kk,snap[kk])})}catch(x){}if(wasCur){location.reload();return}renderDest();toast("Viaggio ripristinato")})})})}else{mine.hidden=true;mine.innerHTML=""}
destEl.classList.toggle("empty",!all.length);var dx=$("#dex");if(dx)dx.hidden=!!all.length;var dl2=$("#dal");if(dl2&&!dl2.hidden){dl2.dataset.go=up.length&&!up[0].now&&up[0].dd<=3?"1":"";dl2.setAttribute("role",dl2.dataset.go?"button":"note");dl2.tabIndex=dl2.dataset.go?0:-1}db.classList.toggle("open",DOPEN&&all.length>0);destEl.classList.toggle("myo",DOPEN&&all.length>0);dl.setAttribute("aria-expanded",DOPEN&&all.length>0)}
var DOPEN=false;

/* home: città a tutto schermo, parola del giorno, anno in viaggio */
function dayNo(){var d=new Date();return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)}
function streakTick(){var n=1,t=todayStr(),o=null;try{o=JSON.parse(localStorage.getItem("via-streak")||"null")}catch(e){}
if(o&&o.d===t)return o.n;if(o&&o.d){var p=Math.round((dateObj(t)-dateObj(o.d))/864e5);n=p===1?o.n+1:1}try{localStorage.setItem("via-streak",JSON.stringify({d:t,n:n}))}catch(e){}return n}
var STK=streakTick();
function wordSet(id){var el=$("#dword");if(!el||!window.WLANG)return;var k=id+":"+dayNo()+":"+STK;if(el.dataset.k===k)return;el.dataset.k=k;el.classList.remove("fl");
var lg=window.WLANG[(window.WCITY||{})[id]||"it"]||window.WLANG.it,L=lg[2],w=L[(dayNo()+id.length)%L.length],fs=w[0].length>12?".98rem":w[0].length>8?"1.15rem":"1.4rem";
el.innerHTML='<span class="dwi"><span class="dwf dwa">'+(STK>1?'<em class="dwc">🔥 '+STK+'</em>':'')+'<small>Parola del giorno</small><b style="font-size:'+fs+'">'+esc(w[0])+'</b><small class="dwh">'+esc(lg[0])+' · tocca</small></span><span class="dwf dwb"><small>Significa</small><b style="font-size:1.05rem">'+esc(w[1])+'</b><small>'+lg[1]+' '+esc(lg[0])+'</small></span></span>'}
function skySet(){var h=$("#dhero"),sk=$("#dsk");if(!h||!sk||!h.dataset.id||sk.firstChild)return;var z=window.zSky?zSky(h.dataset.id,"h"):null;if(z)sk.appendChild(z)}
window.__homeSky=skySet;
var HCL={k:"",items:[],i:0,at:0,nc:0};
function heroPaint(it){var h=$("#dhero"),hc=$("#dhc");if(!h||!hc)return;var d=dOf(it.id);hc.dataset.mode=it.mode;hc.dataset.id=it.id;$("#dhl").textContent=it.lab;var hn=$("#dhn");hn.textContent=d.n;hn.style.setProperty("--l",Math.max(5,d.n.length));$("#dbn").textContent=d.n;$("#dhs").textContent=it.sub;
h.style.setProperty("--a",d.col[0]);h.style.setProperty("--z",(window.SKYZ&&SKYZ[it.id])||d.col[1]);var fu=$("#dfull");if(fu){fu.style.setProperty("--a",d.col[0]);fu.style.setProperty("--z",(window.SKYZ&&SKYZ[it.id])||d.col[1])}
if(h.dataset.id!==it.id){h.dataset.id=it.id;var sk=$("#dsk");sk.innerHTML="";skySet()}
var dt=$("#dhd");if(dt){dt.hidden=HCL.items.length<2;dt.innerHTML=HCL.items.length<2?"":HCL.items.map(function(x,k){return '<button type="button" data-k="'+k+'" aria-label="'+esc(dOf(x.id).n)+'"'+(k===HCL.i?' class="on" aria-current="true"':'')+'></button>'}).join("")}}
function hcGo(i,user){var L=HCL;if(L.items.length<2)return;L.i=(i+L.items.length)%L.items.length;L.at=Date.now();if(user)L.nc=Date.now();var it=L.items[L.i],hc=$("#dhc"),sk=$("#dsk");
if(!hc.animate||matchMedia("(prefers-reduced-motion:reduce)").matches){heroPaint(it);return}
[hc,sk].forEach(function(e){e.animate([{opacity:1},{opacity:0}],{duration:170,fill:"forwards"})});
setTimeout(function(){heroPaint(it);[hc,sk].forEach(function(e){e.getAnimations().forEach(function(a){a.cancel()});e.animate([{opacity:0},{opacity:1}],{duration:340,easing:"ease-out"})})},175)}
function heroSet(up,ix,all){var h=$("#dhero"),hc=$("#dhc");if(!h||!hc)return;var items=[],stable;
if(up.length){var n0=up[0];stable=n0.cfg.dest;items=[{id:stable,mode:"trip",lab:n0.now?"Viaggio in corso":"Il tuo prossimo viaggio",sub:n0.now?"Oggi · giorno "+(1-n0.dd)+" di "+(Math.round((dateObj(n0.cfg.date_r||n0.cfg.date)-dateObj(n0.cfg.date))/864e5)+1):rangeOf(n0.cfg)+" · "+(n0.dd===0?"si parte oggi":n0.dd===1?"domani":"tra "+n0.dd+" giorni")}]}
else{var us=window.__used||{},pool=ix.filter(function(x){return!us[x[0]]});if(!pool.length)pool=ix;
pool.forEach(function(p){if(CITIES[p[0]])items.push({id:p[0],mode:"idea",lab:"Città di "+MESI[new Date().getMonth()],sub:p[1]})});
favs().filter(function(id){return!us[id]}).reverse().forEach(function(id){items.unshift({id:id,mode:"idea",lab:"Tra i tuoi preferiti ♥",sub:""})});
var seen={};items=items.filter(function(x){if(seen[x.id])return false;seen[x.id]=1;return true});
if(!items.length){var f=Object.keys(CITIES)[0];items=[{id:f,mode:"idea",lab:"Idea di oggi",sub:""}]}
stable=items[dayNo()%items.length].id}
var key=items.map(function(x){return x.id+x.mode}).join(",");
if(HCL.k!==key){HCL.k=key;HCL.items=items;HCL.i=Math.min(HCL.i,items.length-1);if(up.length)HCL.i=0;else HCL.i=dayNo()%items.length;HCL.at=Date.now()}
heroPaint(HCL.items[HCL.i]);
destEl.dataset.nxt=up.length?"open":"plan";
$("#dopen").textContent=up.length?(up[0].now?"Apri il viaggio":"Apri viaggio"):(all.length?"Pianifica un viaggio":"Pianifica il tuo primo viaggio");wordSet(stable)}
/* il carosello delle città del momento: scorre da solo, si può sfogliare con un gesto o con i puntini */
(function(){var h=$("#dhero");if(!h)return;var sx=0,sy=0;
h.addEventListener("touchstart",function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY},{passive:true});
h.addEventListener("touchend",function(e){var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.4)hcGo(HCL.i+(dx<0?1:-1),1)},{passive:true});
$("#dhd").addEventListener("click",function(e){var b=e.target.closest("button");if(b)hcGo(+b.dataset.k,1)});
setInterval(function(){if(HCL.items.length<2||document.hidden||!destEl.classList.contains("on")||destEl.classList.contains("pick")||destEl.scrollTop>40||Date.now()-HCL.at<6500||matchMedia("(prefers-reduced-motion:reduce)").matches)return;hcGo(HCL.i+1)},1000)})();
function yearSet(dn){var el=$("#dyear");if(!el)return;var y=String(new Date().getFullYear()),yr=dn.filter(function(t){return(t.cfg.date_r||t.cfg.date).slice(0,4)===y});
if(!yr.length){el.hidden=true;el.innerHTML="";el.dataset.k="";return}
var cs={},dys=0;yr.forEach(function(t){cs[t.cfg.dest]=1;dys+=Math.round((dateObj(t.cfg.date_r||t.cfg.date)-dateObj(t.cfg.date))/864e5)+1});var nc=Object.keys(cs).length,k=yr.length+"/"+dys+"/"+nc;
el.hidden=false;if(el.dataset.k===k)return;el.dataset.k=k;
el.innerHTML='<small>Il tuo anno in viaggio</small><div class="dys"><div><b data-n="'+yr.length+'">'+yr.length+'</b><span>'+(yr.length===1?"viaggio":"viaggi")+'</span></div><div><b data-n="'+dys+'">'+dys+'</b><span>'+(dys===1?"giorno":"giorni")+'</span></div><div><b data-n="'+nc+'">'+nc+'</b><span>'+(nc===1?"città":"città")+'</span></div></div>';
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)[].forEach.call(el.querySelectorAll("b"),function(b){var N=+b.dataset.n,t0=0;function f(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/700);b.textContent=Math.round(N*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}b.textContent="0";requestAnimationFrame(f)})}
function homeSet(all,up,dn,ix){heroSet(up,ix,all);yearSet(dn)}

/* scorrendo: il nome della città sale nella barra, lo sfondo resta fermo */
(function(){var tk=false,hc=$("#dhc"),bn=$("#dbn"),sc=$("#dscrim");
function upd(){tk=false;var p=Math.max(0,Math.min(1,destEl.scrollTop/220));hc.style.opacity=Math.max(0,1-p*1.5).toFixed(3);hc.style.transform="translate3d(0,"+(-p*18).toFixed(1)+"px,0)";bn.style.opacity=Math.max(0,Math.min(1,(p-.45)*2.2)).toFixed(3);sc.style.opacity=p.toFixed(3)}
destEl.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});upd()})();
$("#dword").addEventListener("click",function(){this.classList.toggle("fl")});
$("#dopen").addEventListener("click",function(){if(destEl.dataset.nxt==="open"&&window.__openNext)window.__openNext();else setPick(1)});
$("#dhc").addEventListener("click",function(e){if(this.__lp){this.__lp=false;e.preventDefault();e.stopImmediatePropagation();return}if(Date.now()-HCL.nc<400)return;if(this.dataset.mode==="trip"&&window.__openNext)window.__openNext();else cityGo(this,this.dataset.id)});
function todayStr(){var d=new Date(),p=function(n){return(n<10?"0":"")+n};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())}
function togMine(){try{localStorage.setItem("via-iconhint","1")}catch(e){}$("#dlw").classList.remove("hint");var m=$("#dmine");if(!m||m.innerHTML===""){var l=$("#dlw");if(l&&l.animate)l.animate([{transform:"scale(1)"},{transform:"scale(.94)"},{transform:"scale(1)"}],{duration:260});return}if(DOPEN&&m.animate&&!matchMedia("(prefers-reduced-motion:reduce)").matches){var an=m.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateY(-8px)"}],{duration:140,easing:"ease-in",fill:"forwards"});an.onfinish=function(){DOPEN=false;renderDest();an.cancel()};return}DOPEN=!DOPEN;renderDest();if(DOPEN)setTimeout(function(){try{m.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(e){}},50)}
(function(){var c=$("#dchips");if(c){c.innerHTML=CHIPS.map(function(x,i){return '<button type="button" data-i="'+i+'"><span aria-hidden="true">'+x[0]+'</span>'+x[1]+'</button>'}).join("");c.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var x=CHIPS[+b.dataset.i];DSET=x[2];DSN=x[0]+" "+x[1];DEXP=true;setPick(1)})}})();
/* il logo: saluto e luce secondo l'ora */
function todSet(){var h=new Date().getHours(),k=h<5?"night":h<11?"dawn":h<17?"day":h<21?"dusk":"night",g=h<5?"Buonanotte":h<13?"Buongiorno":h<18?"Buon pomeriggio":h<22?"Buonasera":"Buonanotte",el=$("#dgreet"),b=$("#dbrand")||$("#dlw").parentNode;destEl.dataset.tod=k;if(!el){el=document.createElement("p");el.id="dgreet";el.className="dgreet";var lw=$("#dlw");if(lw&&lw.parentNode===b)b.insertBefore(el,lw.nextSibling);else b.appendChild(el)}el.textContent=g}
todSet();setInterval(todSet,6e4);
function togMy(){togMine();var my=$("#dmy");if(my){my.setAttribute("aria-expanded",DOPEN?"true":"false");$(".dmyl",my).textContent=DOPEN?"Chiudi i viaggi":"I miei viaggi"}}
$("#dmy").addEventListener("click",togMy);$("#dpass").addEventListener("click",function(){if(window.__openNext)window.__openNext();else togMine()});
/* Sorprendimi: una città adatta al mese, tra quelle non ancora in programma */
var LASTS="";
function surprise(){var used=window.__used||{},ide=window.__ideas||[],pool=[];
ide.forEach(function(x){if(!used[x[0]]){for(var i=0;i<3;i++)pool.push([x[0],x[1]])}});
DEST.forEach(function(d){if(d.ok&&!used[d.id]&&d.id!==LASTS)pool.push([d.id,"Una meta nuova, con guida completa"])});
pool=pool.filter(function(p){return p[0]!==LASTS});if(!pool.length)pool=DEST.filter(function(d){return d.ok}).map(function(d){return[d.id,d.c]});
var p=pool[Math.floor(Math.random()*pool.length)];LASTS=p[0];return p}
function showSur(){var p=surprise(),d=dOf(p[0]),box=$("#dsr"),dd=$(".dsd");
if(dd&&dd.animate)dd.animate([{transform:"rotate(0)"},{transform:"rotate(360deg)"}],{duration:520,easing:"cubic-bezier(.3,1.3,.5,1)"});
setTimeout(function(){box.hidden=false;box.style.cssText=sw(d);box.dataset.c=d.id;box.innerHTML='<span class="dse" aria-hidden="true">'+d.e+'</span><span class="dst"><b>'+esc(d.n)+'</b><small>'+esc(d.c)+'</small><em>'+esc(p[1])+'</em></span><span class="dsa"><button type="button" class="dsgo">Scopri →</button><button type="button" class="dsre">Un\'altra</button></span>';
if(box.animate)box.animate([{opacity:0,transform:"translateY(12px) scale(.96)"},{opacity:1,transform:"none"}],{duration:420,easing:"cubic-bezier(.2,1.3,.4,1)"})},dd&&dd.animate?300:0)}
$("#dsb").addEventListener("click",showSur);
$("#dsr").addEventListener("click",function(e){var box=$("#dsr");if(e.target.closest(".dsre")){showSur();return}if(e.target.closest(".dsgo")){cityGo(box,box.dataset.c)}});
$("#dnext").addEventListener("click",function(){setPick(1)});
(function(){var al=$("#dal");function go(){if(!al.dataset.go||!window.__openNext)return;window.__openNext();var n=0,iv=setInterval(function(){var r=$("#t-consigli");if(r&&$(".tabbar")&&++n>2){clearInterval(iv);r.checked=true;r.dispatchEvent(new Event("change",{bubbles:true}));setTimeout(function(){var c=$("#ckopen");if(c)c.click()},500)}else if(n>30)clearInterval(iv)},300)}al.addEventListener("click",go);al.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}});
function exLoop(){var n=0,ok=0,t0=Date.now(),iv=setInterval(function(){var f=$("#sfast"),q=$('#qd button[data-q="we"]');if(f&&q&&!f.hidden&&f.getBoundingClientRect().width>0&&!destEl.classList.contains("on")){if(Date.now()-t0>1800&&++ok>=2){clearInterval(iv);try{sessionStorage.removeItem("via-ex")}catch(x){}q.click();setTimeout(function(){f.click()},300)}}else{ok=0;if(++n>80){clearInterval(iv);try{sessionStorage.removeItem("via-ex")}catch(x){}}}},350)}
var dx=$("#dex");if(dx)dx.addEventListener("click",function(){var d=dOf("roma");if(!d.ok){toast("Esempio non disponibile");return}try{sessionStorage.setItem("via-ex","1")}catch(x){}cityGo(dx,"roma");exLoop()});
try{if(sessionStorage.getItem("via-ex")==="1")exLoop()}catch(x){}
})();$("#didea").addEventListener("click",function(e){var bt=e.target.closest(".dic");if(!bt)return;cityGo(bt,bt.dataset.c)});$("#dback").addEventListener("click",function(){setPick(0)});
function setPick(v){var dc=destEl.querySelector(".dcard"),rm=matchMedia("(prefers-reduced-motion:reduce)").matches,o=null;
function sw2(){destEl.classList.toggle("pick",!!v);destEl.scrollTop=0;if(v)DOPEN=false;renderDest();if(dc&&dc.animate&&!rm)dc.animate([{opacity:0,transform:"translateX("+(v?26:-26)+"px)"},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(.2,.8,.2,1)"});if(o)o.cancel()}
if(dc&&dc.animate&&!rm){o=dc.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateX("+(v?-26:26)+"px)"}],{duration:150,easing:"ease-in",fill:"forwards"});o.onfinish=sw2}else sw2()}
function openDest(){destEl.classList.remove("pick");DEXP=false;DOPEN=false;DSET=null;DSN="";DALL=false;closeSetup();closeSheet();setCity(null);dfind.value="";renderDest();destEl.classList.add("on");destEl.setAttribute("aria-hidden","false");destEl.scrollTop=0;setTimeout(function(){document.documentElement.classList.remove("hold")},600)}
function closeDest(){destEl.classList.remove("on");destEl.setAttribute("aria-hidden","true")}
PAR.openDest=openDest;
dfind.addEventListener("input",renderDest);
$("#dmore").addEventListener("click",function(){DEXP=!DEXP;renderDest();if(!DEXP){var g=$("#dreg")||dgrid;g.scrollIntoView({behavior:"smooth",block:"start"})}});
/* zoom sulla card scelta: la card si espande a schermo intero con i colori della città */
var zbusy=false;
var askEl=$("#ask");function closeAsk(){askEl.classList.remove("on");askEl.setAttribute("aria-hidden","true")}
window.__ask=function(a,b,c){return ask(a,b,c)};
function ask(tt,tx,btns){$("#asktt").textContent=tt;$("#asktx").textContent=tx;var box=$("#askb");box.innerHTML="";btns.concat([{t:"Annulla",g:1}]).forEach(function(b){var x=document.createElement("button");x.type="button";x.className="btn"+(b.g?" ghost":"");x.textContent=b.t;x.addEventListener("click",function(){closeAsk();if(b.fn)setTimeout(b.fn,120)});box.appendChild(x)});askEl.classList.add("on");askEl.setAttribute("aria-hidden","false")}
askEl.addEventListener("click",function(e){if(e.target===askEl)closeAsk()});
function sameCity(id){var r=[];if(SAVED&&SAVED.date&&SAVED.dest===id)r.push({cur:1});trips().forEach(function(t,i){if(t.cfg.dest===id)r.push({i:i})});return r}
function startNew(d,b){parkCur();SP={};CK={};COPT={};MEALS={};CFG=null;SAVED=null;TRIP=null;if(d.id!==PD.id){goCity(d.id,"setup");return}zoomGo(b,d,function(){setCity(d.id);closeDest();openSetup(true)})}
function zoomGo(btn,d,fn){
if(zbusy)return;
if(!btn.animate||(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){fn();return}
zbusy=true;
/* la città si apre dal punto toccato: il colore si allarga, il nome appare e i monumenti salgono uno dopo l'altro */
var r=btn.getBoundingClientRect(),x=Math.round(r.left+r.width/2),y=Math.round(r.top+r.height/2),W=innerWidth,H=innerHeight,R=Math.ceil(Math.hypot(Math.max(x,W-x),Math.max(y,H-y)))+6,
 zc=(window.SKYZ&&SKYZ[d.id])||d.col[1],ov=document.createElement("div");
ov.className="zov";ov.setAttribute("aria-hidden","true");ov.style.cssText="--a:"+d.col[0]+";--z:"+zc;
ov.innerHTML='<div class="zdot"></div><div class="zbg"></div><div class="zcol"><span class="zchip">'+esc(d.c||"")+'</span><b class="zn" style="--l:'+Math.max(5,d.n.length)+'">'+esc(d.n)+'</b></div>';
var sk=(d.id===PD.id&&window.zSky)?zSky(d.id):null;if(sk)ov.querySelector(".zcol").appendChild(sk);
document.body.appendChild(ov);
var done=function(){zbusy=false;if(ov.parentNode)ov.remove()};
try{
btn.animate([{transform:"scale(1)"},{transform:"scale(.95)"},{transform:"scale(1)"}],{duration:280,easing:"ease-out"});
var dt=ov.querySelector(".zdot");dt.style.cssText="left:"+(x-R)+"px;top:"+(y-R)+"px;width:"+2*R+"px;height:"+2*R+"px";
dt.animate([{transform:"scale(0)"},{transform:"scale(1)"}],{duration:480,easing:"cubic-bezier(.65,0,.15,1)",fill:"forwards"});
ov.querySelector(".zbg").animate([{opacity:0},{opacity:0,offset:.35},{opacity:1}],{duration:560,easing:"ease-out",fill:"forwards"});
ov.querySelector(".zcol").animate([{opacity:0,transform:"translateY(14px) scale(.96)"},{opacity:1,transform:"none"}],{duration:440,delay:240,easing:"cubic-bezier(.2,1.2,.4,1)",fill:"backwards"});
}catch(e){}
setTimeout(function(){
 try{ss("via-zoom",JSON.stringify({a:d.col[0],z:zc,c:d.c||"",n:d.n,id:d.id,s:sk?sk.outerHTML:""}))}catch(x){}
 fn();
 if(d.id!==PD.id)return;
 ov.classList.add("zx");var out=ov.animate?ov.animate([{opacity:1},{opacity:0}],{duration:320,delay:110,easing:"ease-in",fill:"forwards"}):null;
 if(out)out.onfinish=done;else done()},d.id!==PD.id?800:1450);
setTimeout(done,3200)}
dgrid.addEventListener("click",function(e){var f=e.target.closest(".dfv");if(f){e.stopPropagation();var on=favTog(f.dataset.fv);hap(on?18:8);toast(on?"Aggiunta ai preferiti ♥":"Tolta dai preferiti");renderDest();return}var b=e.target.closest(".dcity");if(b)cityGo(b,b.dataset.city)});
dgrid.addEventListener("keydown",function(e){var f=e.target.closest&&e.target.closest(".dfv");if(f&&(e.key==="Enter"||e.key===" ")){e.preventDefault();f.click()}});
function cityGo(b,id){var d=dOf(id);
if(!d.ok){b.animate&&b.animate([{transform:"translateX(0)"},{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"none"}],{duration:300,easing:"ease-out"});toast("La guida di "+d.n+" arriva presto ✨");return}
var ex=sameCity(d.id);if(ex.length){var e0=ex[0];ask("Hai già un viaggio a "+d.n,"Vuoi aprire quello che hai già o organizzarne uno nuovo?",[{t:"＋ Nuovo viaggio a "+d.n,fn:function(){startNew(d,b)}},{t:"Apri il viaggio esistente",fn:function(){if(e0.cur){if(d.id!==PD.id)goCity(d.id);else{closeDest();setCity(PD.id)}}else switchTrip(e0.i)}}]);return}
zoomGo(b,d,function(){if(d.id!==PD.id){goCity(d.id,"setup");return}setCity(d.id);closeDest();openSetup(!CFG)})}
$("#sback").addEventListener("click",function(){openDest()});
$("#shdest").addEventListener("click",function(){openDest()});
$("#ahome").addEventListener("click",function(){openDest()});
/* il nome della città apre l'elenco dei viaggi: cambia viaggio o torna a tutti i viaggi */
(function(){var ap=$("#appt"),pop=null;if(!ap)return;
function close(){if(!pop)return;var p=pop;pop=null;p.classList.remove("on");setTimeout(function(){p.remove()},160);var c=$(".apc",ap);if(c)c.setAttribute("aria-expanded","false");document.removeEventListener("pointerdown",out,true);document.removeEventListener("keydown",key)}
function out(e){if(pop&&!pop.contains(e.target)&&!ap.contains(e.target))close()}
function key(e){if(e.key==="Escape")close()}
function row(d,t,sub,cur,i){return '<button type="button" role="menuitem" class="tsw-i'+(cur?' cur':'')+'" data-i="'+i+'"><span class="tsw-e" aria-hidden="true">'+(d.e||"")+'</span><span class="tsw-t"><b>'+esc(d.n)+'</b><small>'+esc(sub)+'</small></span>'+(cur?'<i class="tsw-ok" aria-hidden="true">✓</i>':'')+'</button>'}
function open(){if(pop||!CFG)return;var a=trips(),h='<div class="tsw-h">I tuoi viaggi</div>'+row(dOf(CFG.dest),CFG,rangeOf(CFG),true,-1);
 a.forEach(function(t,i){h+=row(dOf(t.cfg.dest),t.cfg,rangeOf(t.cfg),false,i)});
 h+='<button type="button" role="menuitem" class="tsw-all" data-i="all"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/></svg>Tutti i viaggi</button>';
 pop=document.createElement("div");pop.className="tsw";pop.setAttribute("role","menu");pop.setAttribute("aria-label","I tuoi viaggi");pop.innerHTML=h;document.body.appendChild(pop);
 var c=$(".apc",ap),r=ap.getBoundingClientRect();pop.style.top=Math.round(r.top+(c?c.offsetHeight:30)+10)+"px";pop.style.left=Math.max(12,Math.round(r.left-2))+"px";
 if(c)c.setAttribute("aria-expanded","true");requestAnimationFrame(function(){if(pop)pop.classList.add("on")});
 pop.addEventListener("click",function(e){var b=e.target.closest("[data-i]");if(!b)return;var i=b.dataset.i;close();if(i==="all")openDest();else if(i!=="-1")switchTrip(+i)});
 document.addEventListener("pointerdown",out,true);document.addEventListener("keydown",key)}
ap.addEventListener("click",function(e){if(!e.target.closest(".apc"))return;pop?close():open()});
ap.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target.closest&&e.target.closest(".apc")){e.preventDefault();pop?close():open()}})})();

PAR.openSetup=openSetup;
$$("[data-st]",form).forEach(function(b){b.addEventListener("click",function(){var o=$("#ppl"),v=Math.max(1,Math.min(10,(+o.textContent||2)+ +b.dataset.st));o.textContent=v})});
$("#scancel").addEventListener("click",function(){closeSetup();if(CFG)setCity(PD.id)});
/* campi obbligatori: asterisco sempre visibile e riquadro evidenziato finché sono vuoti */
function paintReq(){var multi=!!form.date_r.value&&form.date_r.value>form.date.value,adr=multi&&form.sz.value==="altro";
[["date",1],["a_arr",1],["r_dep",1],["saddr",adr]].forEach(function(r){var el=form[r[0]];if(!el)return;var lab=el.closest("label"),need=!!r[1]&&!el.value.trim();lab.classList.toggle("req",!!r[1]);lab.classList.toggle("need",need);if(!need)el.classList.remove("bad")});
var sl=form.saddr.closest("label").firstElementChild;sl.textContent=adr?"Indirizzo dell'alloggio":"Indirizzo (facoltativo)";
var left=(STEP===0?[["date"]]:STEP===1?[["a_arr"],["r_dep"]]:[]).filter(function(r){return !form[r[0]].value}).length+(STEP===2&&adr&&!form.saddr.value.trim()?1:0);
var rn=$("#reqn");if(rn)rn.classList.toggle("done",!left)}
form.addEventListener("input",paintReq);form.addEventListener("change",paintReq);
var _os=openSetup;openSetup=function(){_os.apply(this,arguments);paintReq()};PAR.openSetup=openSetup;
/* ===== form a passi: date e partenza → voli → hotel (solo più giorni) → stile ===== */
var STEP=0,SN={0:"Date",1:"Voli",2:"Hotel",3:"Stile"};
function isMulti(){var a=form.date.value,b=form.date_r.value;return !!a&&!!b&&b>a}
function stepList(){return isMulti()?[0,1,2,3]:[0,1,3]}
function paintSteps(){var L=stepList(),i=L.indexOf(STEP);if(i<0){STEP=1;i=1}
$("#sstp").innerHTML=L.map(function(k,n){return '<li><button type="button" data-k="'+k+'" class="'+(k===STEP?"on":n<i?"done":"")+'"'+(k===STEP?' aria-current="step"':'')+'><b>'+(n<i?"✓":n+1)+'</b><span>'+SN[k]+'</span></button></li>'}).join("");
var sf=$("#sfast");if(sf)sf.hidden=!(STEP===0&&!CFG);var last=i===L.length-1;$("#sprev").hidden=i<=0;$("#snext").hidden=last;$("#ssub").hidden=!last}
function showStep(k,dir){STEP=k;$$("fieldset[data-s]",form).forEach(function(f){var on=+f.dataset.s===k;if(f.hidden===on){f.hidden=!on;if(on&&dir){f.classList.remove("sl","sr");void f.offsetWidth;f.classList.add(dir>0?"sr":"sl")}}});
form.dataset.st=k;paintSteps();serr.textContent="";
var rn=$("#reqn");rn.hidden=k===3;rn.querySelector("span").textContent=k===0?"data di andata":k===1?"orario di atterraggio e di partenza del ritorno":"indirizzo, solo se scegli «Altra zona»";
if(k===3)styDesc();paintReq();try{setup.scrollTo({top:0})}catch(e){setup.scrollTop=0}}
function verr(upTo){var d0=form.date.value,d1=form.date_r.value||d0,multi=d1>d0,n=multi?Math.round((dateObj(d1)-dateObj(d0))/864e5)+1:1;
var la=toMin(form.a_arr.value),rd=toMin(form.r_dep.value),ri=toMin(form.r_imb.value),ad=toMin(form.a_dep.value),E=function(s,b,m){return{s:s,bad:[b],msg:m}};
if(upTo>=0){if(!d0)return E(0,"date","Scegli la data di andata.");if(d1<d0)return E(0,"date_r","Il ritorno non può essere prima dell'andata.");if(n>MAXD)return E(0,"date_r","L'app pianifica viaggi fino a "+MAXD+" giorni.")}
if(upTo>=1){if(!form.a_arr.value)return E(1,"a_arr","Inserisci l'orario di atterraggio a "+PD.n+".");if(!form.r_dep.value)return E(1,"r_dep","Inserisci l'orario di partenza del volo di ritorno.");
if(!multi&&rd<=la)return E(1,"r_dep","Il volo di ritorno deve partire dopo l'atterraggio (gita in giornata).");if(ri!=null&&ri>=rd)return E(1,"r_imb","L'apertura dell'imbarco deve essere prima della partenza.");if(ad!=null&&ad>=la)return E(1,"a_dep","La partenza dell'andata deve essere prima dell'atterraggio.")}
if(upTo>=2&&multi&&form.sz.value==="altro"&&!form.saddr.value.trim())return E(2,"saddr","Scrivi l'indirizzo dell'alloggio, oppure scegli una zona.");
return null}
function showErr(e){if(e.s!==STEP)showStep(e.s,-1);$$("input,select",form).forEach(function(x){x.classList.toggle("bad",e.bad.indexOf(x.name)>=0)});serr.textContent=e.msg;paintReq();var f=form[e.bad[0]];if(f)try{f.focus({preventScroll:true})}catch(x){}}
function goNext(){var e=verr(STEP);if(e){showErr(e);return}var L=stepList(),i=L.indexOf(STEP);if(i<L.length-1)showStep(L[i+1],1)}
function goPrev(){var L=stepList(),i=L.indexOf(STEP);if(i>0)showStep(L[i-1],-1)}
$("#snext").addEventListener("click",goNext);$("#sprev").addEventListener("click",goPrev);
$("#sstp").addEventListener("click",function(e){var b=e.target.closest("button[data-k]");if(!b)return;var k=+b.dataset.k;if(k===STEP)return;if(k<STEP){showStep(k,-1);return}var L=stepList(),pv=L[L.indexOf(k)-1],er=verr(pv);if(er){showErr(er);return}showStep(k,1)});
/* stile: scelta di tema e ritmo */
var STYT={th:{cul:"culturale",eno:"enogastronomico",mix:""},pc:{rel:"tranquillo",int:"intenso",mid:""}};
function styVals(){return{th:($('input[name=th]:checked',form)||{}).value||"mix",pc:($('input[name=pc]:checked',form)||{}).value||"mid"}}
function styDesc(){var v=styVals(),a=[];
a.push(v.pc==="rel"?"si parte più tardi, con meno tappe e più pause":v.pc==="int"?"giornate lunghe, più tappe e pasti veloci":"un ritmo equilibrato");
a.push(v.th==="eno"?"tavole lunghe con piatti tipici, un aperitivo nel pomeriggio e meno monumenti":v.th==="cul"?"più musei e monumenti, visite più approfondite e pasti più rapidi":"il mix classico di monumenti, quartieri e buon cibo");
$("#sstyd").textContent="Così: "+a.join("; ")+". Potrai cambiarlo quando vuoi."}
form.addEventListener("change",function(e){if(e.target&&(e.target.name==="th"||e.target.name==="pc"))styDesc()});
function styTxt(c){var v=sty(c),a=[STYT.th[v.th],STYT.pc[v.pc]].filter(Boolean);return a.length?" Stile: "+a.join(", ")+".":""}
form.addEventListener("submit",function(e){e.preventDefault();var L=stepList();if(STEP!==L[L.length-1]){goNext();return}
var er=verr(3);if(er){showErr(er);return}
$$("input,select",form).forEach(function(x){x.classList.remove("bad")});
var d0=form.date.value,d1=form.date_r.value||d0,multi=d1>d0;
var to=($('input[name=to]:checked',form)||{}).value||APK[0],rt=($('input[name=rto]:checked',form)||{}).value||to,old=(CFG&&CFG.stay)||{};
var c={dest:PD.id,date:d0,date_r:d1,ppl:+$("#ppl").textContent||2,from:form.from.value.trim(),fromCode:fromCode(form.from.value),to:to,rt:rt,a_num:(CFG&&CFG.a_num)||"",a_dep:form.a_dep.value,a_arr:form.a_arr.value,r_num:(CFG&&CFG.r_num)||"",r_imb:form.r_imb.value,r_dep:form.r_dep.value,th:styVals().th,pc:styVals().pc};
if(multi){var addr=form.saddr.value.trim();c.stay={zone:form.sz.value,addr:addr,cin:form.sin.value||"15:00",cout:form.sout.value||"11:00",price:parseFloat(String(form.sprice.value).replace(",","."))||0,type:form.stype.value};
if(addr&&addr===old.addr&&old.geo){c.stay.pos=old.pos;c.stay.geo=1}}
var first=!CFG;if(SAVED&&SAVED.dest!==PD.id){parkCur();SP={};CK={};COPT={};MEALS={}}c.tid=(CFG&&CFG.tid)||newTid();CFG=c;SAVED=c;ls("via-trip",JSON.stringify(c));
waitFun(c,first,function(){closeSetup();SEL=0;renderAll();window.dispatchEvent(new Event("voli"));
var t0=$("#t-itinerario");if(!t0.checked){t0.checked=true;t0.dispatchEvent(new Event("change",{bubbles:true}))}
var blk=$("#itinerario");blk.scrollTop=0},function(){toast(first?"Itinerario pronto ✨":"Viaggio aggiornato ✓");hap([14,40,14]);if(FAST){FAST=0;setTimeout(function(){toast("Orari dei voli stimati: aggiornali in Voli ✈️")},2400)}
if(multi&&c.stay.addr&&!c.stay.geo)geocode()})});
/* attesa giocosa dopo la creazione: l'aereo gira intorno alla bandiera, le frasi cambiano, i passaggi si spuntano */
function waitFun(c,first,work,done){var red=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,ms=red?700:window.LITE?(first?1800:1100):first?2900:1700,
L=["Spiego la mappa di "+PD.n+"…","Cerco il caffè giusto per la colazione ☕","Metto in fila i monumenti, senza fretta","Controllo orari… e anche le code 👀","Scelgo dove pranzare (la parte più seria)","Controllo se serve l'ombrello ☂️"],v=styVals();
L.splice(2,0,v.th==="eno"?"Faccio spazio per un buon calice 🍷":v.th==="cul"?"Non perdiamo nemmeno un museo 🏛️":"Un po' di storia, un po' di buon cibo 🍝");
L.splice(4,0,v.pc==="rel"?"Aggiungo le pause gelato 🍦":v.pc==="int"?"Allaccio le scarpe da corsa 👟":"Bilancio camminate e pause ⚖️");
if(!first)L=["Rimetto a posto le tappe…","Ricalcolo orari e spostamenti ⏱️","Ultimi ritocchi ✨"];
var ST4=["Voli","Tappe","Pasti","Mappa"],el=document.createElement("div");el.className="mw"+(first?"":" mu");el.setAttribute("role","status");el.setAttribute("aria-live","polite");
el.style.setProperty("--mwd",ms+"ms");
el.innerHTML='<div class="mwc"><div class="mwo"><i class="mwr"></i><b class="mwp"><span>✈︎</span></b><div class="mwf">'+esc(PD.flag||"🧳")+'</div></div><h3 class="mwt">'+esc(first?"Preparo il tuo viaggio":"Aggiorno il tuo viaggio")+'</h3><p class="mwm" id="mwm">'+esc(L[0])+'</p>'+(first?'<ul class="mws">'+ST4.map(function(t){return '<li>'+t+'</li>'}).join("")+'</ul>':'')+'<div class="mwb"><i></i></div><p class="mwl">Dal latino <i>viaticum</i>: ciò che si porta con sé quando si parte.</p></div>';
document.body.appendChild(el);var m=el.querySelector("#mwm"),lis=el.querySelectorAll(".mws li"),k=0,tk=[];
requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add("on");setTimeout(function(){try{work()}catch(e){console.error(e)}},720)})});
if(!red){var per=Math.max(650,(ms-900)/L.length);L.forEach(function(t,i){if(!i)return;tk.push(setTimeout(function(){m.classList.add("out");setTimeout(function(){m.textContent=t;m.classList.remove("out")},200)},i*per+500))});
[].forEach.call(lis,function(li,i){tk.push(setTimeout(function(){li.classList.add("ok")},900+i*((ms-1900)/lis.length)))})}
else[].forEach.call(lis,function(li){li.classList.add("ok")});
tk.push(setTimeout(function(){m.textContent=first?"Pronto! Buon viaggio ✨":"Fatto ✓";el.classList.add("fin");[].forEach.call(lis,function(li){li.classList.add("ok")})},ms-650));
tk.push(setTimeout(function(){el.classList.remove("on");el.classList.add("bye");setTimeout(function(){el.remove();try{done()}catch(e){console.error(e)}},420)},ms))}
/* posizione dell'alloggio dall'indirizzo (OpenStreetMap Nominatim) */
function geocode(){var s=CFG&&CFG.stay;if(!s||!s.addr||!window.fetch)return;var q=s.addr+(PD.ARE.test(s.addr)?"":", "+PD.QN);
fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes="+PD.CC+"&accept-language="+PD.CC+"&email=support.viaticum%40gmail.com&q="+encodeURIComponent(q)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){var x=j&&j[0];if(!x)throw 0;var p=[+(+x.lat).toFixed(5),+(+x.lon).toFixed(5)];if(hav(p,PD.LL)>45)throw 0;
if(!CFG||!CFG.stay||CFG.stay.addr!==s.addr)return;CFG.stay.pos=p;CFG.stay.geo=1;ls("via-trip",JSON.stringify(CFG));renderAll();toast("Alloggio trovato sulla mappa 📍")}).catch(function(){})}

/* impostazioni */
var sheet=$("#sheet");
function closeSheet(){sheet.classList.remove("on");sheet.setAttribute("aria-hidden","true")}
/* offerta volontaria: solo nella versione web (le regole di Google Play per l'app richiedono Play Billing). Inserire qui il link della pagina di donazione */
(function(){var URL_CAFFE="https://buymeacoffee.com/viaticum",b=$("#shcof");if(!b||!URL_CAFFE||window.__IS_APP)return;b.hidden=false;b.addEventListener("click",function(){window.open(URL_CAFFE,"_blank","noopener")})})();
$("#gear").addEventListener("click",function(){sheet.classList.remove("home");sheet.classList.add("on");sheet.setAttribute("aria-hidden","false")});
/* impostazioni a pagine */
(function(){var c=sheet.querySelector(".shc"),tabs=$$(".stabs [data-t]",sheet),ind=$(".stind",sheet),pages=$$(".spage",sheet),cur="",sub="";
function vis(b){return b.offsetParent!==null}
function mv(){var b=tabs.filter(function(x){return x.dataset.t===cur})[0];if(!b||!vis(b))return;ind.style.width=b.offsetWidth+"px";ind.style.transform="translateX("+b.offsetLeft+"px)"}
function show(){var home=sheet.classList.contains("home");pages.forEach(function(g){var on=sub?g.dataset.p===sub:(g.dataset.p===cur);g.hidden=!on});c.classList.toggle("insub",!!sub);if(!sub)requestAnimationFrame(mv);tabs.forEach(function(b){var on=b.dataset.t===cur;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)})}
function go(t){if(sheet.classList.contains("home")&&t==="trip")t="look";cur=t;sub="";c.scrollTop=0;show()}
function open(){sub="";if(!cur||(sheet.classList.contains("home")&&cur==="trip"))cur=sheet.classList.contains("home")?"look":"trip";c.scrollTop=0;show()}
tabs.forEach(function(b){b.addEventListener("click",function(){go(b.dataset.t)})});
$$("[data-drill]",sheet).forEach(function(r){r.addEventListener("click",function(){sub=r.dataset.drill;c.scrollTop=0;show()})});
$$(".shbk",sheet).forEach(function(b){b.addEventListener("click",function(){sub="";show()})});
new MutationObserver(function(){if(sheet.classList.contains("on"))open()}).observe(sheet,{attributes:true,attributeFilter:["class"]});
window.addEventListener("resize",function(){if(sheet.classList.contains("on")&&!sub)mv()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&sub&&sheet.classList.contains("on")){e.stopPropagation();sub="";show()}},true);
open()})();
$("#dgear").addEventListener("click",function(){sheet.classList.add("home","on");sheet.setAttribute("aria-hidden","false")});
$("#shclose").addEventListener("click",closeSheet);
sheet.addEventListener("click",function(e){if(e.target===sheet)closeSheet()});
/* chiusura con lo swipe verso il basso */
(function(){var c=sheet.querySelector(".shc");if(!c)return;var y0=0,x0=0,dy=0,on=0,t0=0,busy=false;
var g=document.createElement("i");g.className="shgrab";g.setAttribute("aria-hidden","true");c.insertBefore(g,c.firstChild);
function tr(v){if(v)c.style.setProperty("transition",v,"important");else c.style.removeProperty("transition")}
function reset(){c.style.translate="";tr("");sheet.style.removeProperty("--sd")}
c.addEventListener("touchstart",function(e){if(busy||e.touches.length!==1||c.scrollTop>0&&!e.target.closest(".shgrab")){on=-1;return}y0=e.touches[0].clientY;x0=e.touches[0].clientX;dy=0;on=0;t0=Date.now();tr("none")},{passive:true});
c.addEventListener("touchmove",function(e){if(on<0||busy)return;var t=e.touches[0],d=t.clientY-y0,dx=t.clientX-x0;if(!on){if(d>8&&d>Math.abs(dx)*1.3&&c.scrollTop<=0)on=1;else if(Math.abs(dx)>10||d<-8){on=-1;tr("");return}else return}
dy=Math.max(0,d);c.style.translate="0 "+dy+"px";sheet.style.setProperty("--sd",String(Math.max(.2,1-dy/420)));if(e.cancelable)e.preventDefault()},{passive:false});
function end(){if(on!==1){if(on===0)tr("");return}on=0;var v=dy/Math.max(1,Date.now()-t0);
if(dy>110||v>.6){busy=true;tr("translate .22s ease");c.style.translate="0 "+(c.offsetHeight+20)+"px";setTimeout(function(){sheet.classList.add("sdis");closeSheet();reset();setTimeout(function(){sheet.classList.remove("sdis");busy=false},620)},230)}
else{tr("translate .35s cubic-bezier(.2,1.2,.35,1)");c.style.translate="0 0";sheet.style.removeProperty("--sd");setTimeout(function(){tr("");c.style.translate=""},360)}}
c.addEventListener("touchend",end);c.addEventListener("touchcancel",end)})();
$$("[data-edit]").forEach(function(b){b.addEventListener("click",function(){openSetup(false,+b.dataset.edit||0)})});
["via-adb-key","par-adb-key","via-vlive","via-vlive-n"].forEach(function(k){try{localStorage.removeItem(k)}catch(e){}});
$("#shreset").addEventListener("click",function(){if(!confirm("Cancellare TUTTI i viaggi, spese, liste e la chiave salvati su questo telefono?"))return;
["via-trip","via-trips","via-spese","via-check","via-copt","via-meals","via-adb-key","via-vlive","via-vlive-n","via-water","via-fp","via-notif","via-nfired","via-ckfold"].forEach(function(k){ls(k,null)});FP.d=[];FP.p=0;FP.k=[];if(PAR.fpPaint)PAR.fpPaint();CFG=null;SAVED=null;TRIP=null;SP={};CK={};COPT={};MEALS={};closeSheet();openDest()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeSheet();if(CFG){closeSetup();closeDest();setCity(PD.id)}}});

/* invio e importazione di un viaggio tramite link */
function tripLink(c){var k=["dest","date","date_r","ppl","from","fromCode","to","rt","a_num","a_dep","a_arr","r_num","r_imb","r_dep","th","pc"],o={};k.forEach(function(x){if(c[x]!=null&&c[x]!=="")o[x]=c[x]});if(c.stay){o.stay={};["zone","addr","cin","cout","price","type","pos","geo"].forEach(function(x){if(c.stay[x]!=null)o.stay[x]=c.stay[x]})}
return (window.__IS_APP?"https://noname21-spec.github.io/viatico/":location.origin+location.pathname)+"#t="+btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function readLink(){var m=/^#t=([\w-]+)/.exec(location.hash||"");if(!m)return null;try{var s=m[1].replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";var o=JSON.parse(decodeURIComponent(escape(atob(s))));
if(!o||!CITIES[o.dest]||!/^\d{4}-\d\d-\d\d$/.test(o.date||"")||!o.a_arr||!o.r_dep)return null;var c={},str=function(v){return String(v).slice(0,140)};["dest","date","date_r","from","fromCode","to","rt","a_num","a_dep","a_arr","r_num","r_imb","r_dep"].forEach(function(x){if(o[x]!=null)c[x]=str(o[x])});if(THS.indexOf(o.th)>=0)c.th=o.th;if(PCS.indexOf(o.pc)>=0)c.pc=o.pc;c.ppl=Math.max(1,Math.min(10,+o.ppl||2));
if(o.stay&&typeof o.stay==="object"){c.stay={};["zone","addr","cin","cout","type"].forEach(function(x){if(o.stay[x]!=null)c.stay[x]=str(o.stay[x])});c.stay.price=+o.stay.price||0;if(Array.isArray(o.stay.pos)&&o.stay.pos.length===2&&isFinite(o.stay.pos[0])&&isFinite(o.stay.pos[1])){c.stay.pos=[+o.stay.pos[0],+o.stay.pos[1]];c.stay.geo=1}}return c}catch(e){return null}}
$("#shlink").addEventListener("click",function(){if(!CFG){toast("Imposta prima il tuo viaggio");return}var u=tripLink(CFG),d=dOf(CFG.dest);closeSheet();
if(navigator.share)navigator.share({title:"Viaggio a "+d.n+" con Viaticum",text:"Apri il mio viaggio a "+d.n+" ("+rangeOf(CFG)+") su Viaticum:",url:u}).catch(function(){});else{try{navigator.clipboard.writeText(u).then(function(){toast("Link copiato")},function(){prompt("Copia il link",u)})}catch(e){prompt("Copia il link",u)}}});
window.addEventListener("hashchange",function(){if(/^#t=/.test(location.hash))location.reload()});
(function(){var c=readLink();if(!location.hash||!/^#t=/.test(location.hash))return;try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}if(!c){setTimeout(function(){toast("Il link del viaggio non è valido")},1500);return}
var d=dOf(c.dest);setTimeout(function(){ask("Importare il viaggio a "+d.n+"?",rangeOf(c)+(SAVED&&SAVED.date?". Il viaggio che hai ora resta salvato nella tua lista.":"."),[{t:"Importa il viaggio",fn:function(){parkCur();c.tid=newTid();ls("via-trip",JSON.stringify(c));goCity(c.dest)}}])},document.documentElement.classList.contains("pick")?600:3000)})();
/* ===== partenza rapida: date veloci e «Crea subito» ===== */
var FAST=0;
function ymd(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function addD(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x}
$("#qd").addEventListener("click",function(e){var b=e.target.closest("button[data-q]");if(!b)return;var q=b.dataset.q,t=new Date();t.setHours(12,0,0,0);var a,r;
if(q==="we"){a=addD(t,(6-t.getDay()+7)%7);r=addD(a,1)}
else if(q==="gg"){a=form.date.value?dateObj(form.date.value):addD(t,1);if(form.date.value){a=new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),12)}r=a}
else if(q==="2w"){a=addD(t,14);r=addD(a,2)}
else{a=form.date.value?new Date(dateObj(form.date.value).getUTCFullYear(),dateObj(form.date.value).getUTCMonth(),dateObj(form.date.value).getUTCDate(),12):addD(t,21);r=addD(a,6)}
form.date.value=ymd(a);form.date_r.value=ymd(r);form.date.dispatchEvent(new Event("input",{bubbles:true}));form.date.dispatchEvent(new Event("change",{bubbles:true}));form.date_r.dispatchEvent(new Event("change",{bubbles:true}));
$$("#qd button").forEach(function(x){x.classList.toggle("on",x===b)});hap(8)});
$("#sfast").addEventListener("click",function(){var er=verr(0);if(er){showErr(er);return}var m=isMulti();
if(!form.a_arr.value)form.a_arr.value=m?"11:00":"09:30";if(!form.r_dep.value)form.r_dep.value=m?"17:30":"21:00";
var er2=verr(3);if(er2){showErr(er2);return}FAST=1;var L=stepList();showStep(L[L.length-1],0);
if(form.requestSubmit)form.requestSubmit();else form.dispatchEvent(new Event("submit",{cancelable:true}))});
/* ===== ricerca in tutto il viaggio ===== */
(function(){var gs=$("#gs"),q=$("#gsq"),r=$("#gsr"),TABS={itinerario:"Tappe",mappa:"Mappa",mangiare:"Pasti",costi:"Costi",consigli:"Consigli"};
function open(){if(!CFG){toast("Imposta prima il tuo viaggio");return}gs.hidden=false;q.value="";r.innerHTML='<p class="gse">Scrivi un nome: tappa, locale, frase, consiglio.</p>';setTimeout(function(){q.focus()},60)}
function close(){gs.hidden=true;q.blur()}
function norm(x){return String(x).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function run(){var v=norm(q.value.trim());if(v.length<2){r.innerHTML='<p class="gse">Scrivi almeno due lettere.</p>';return}var out=[],seen={};
Object.keys(TABS).forEach(function(id){var blk=document.getElementById(id);if(!blk)return;[].forEach.call(blk.querySelectorAll("h2,h3,h4,summary,li,.cr,.ctile,.dic"),function(el){if(out.length>=40||el.closest("#gs"))return;var t=(el.textContent||"").replace(/\s+/g," ").trim();if(t.length<3||t.length>220||norm(t).indexOf(v)<0)return;
for(var k=0;k<out.length;k++){if(out[k].tab===id&&(out[k].el.contains(el)||el.contains(out[k].el))){if(el.contains(out[k].el))return;out.splice(k,1);break}}
var key=id+t;if(seen[key])return;seen[key]=1;out.push({tab:id,el:el,t:t})})});
out=out.slice(0,14);r.innerHTML=out.length?out.map(function(o,i){return '<button type="button" class="gsb2" data-i="'+i+'"><b>'+esc(o.t.length>90?o.t.slice(0,88)+"…":o.t)+'</b><small>'+TABS[o.tab]+'</small></button>'}).join(""):'<p class="gse">Niente per «'+esc(q.value.trim())+'». Prova con una parola più corta.</p>';r._o=out}
q.addEventListener("input",run);
r.addEventListener("click",function(e){var b=e.target.closest(".gsb2");if(!b)return;var o=(r._o||[])[+b.dataset.i];if(!o)return;close();hap(8);var t=document.getElementById("t-"+o.tab);if(t&&!t.checked){t.checked=true;t.dispatchEvent(new Event("change",{bubbles:true}))}
setTimeout(function(){var d=o.el.closest("details");if(d)d.open=true;try{o.el.scrollIntoView({block:"center",behavior:"smooth"})}catch(x){}o.el.classList.add("gsh2");setTimeout(function(){o.el.classList.remove("gsh2")},2200)},260)});
$("#gsb").addEventListener("click",open);$("#gsx").addEventListener("click",close);gs.addEventListener("click",function(e){if(e.target===gs)close()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!gs.hidden)close()})})();
/* ===== vibrazione leggera su azioni chiave (dove il telefono la permette) ===== */
document.addEventListener("change",function(e){var t=e.target;if(t&&t.classList&&t.classList.contains("tabr"))hap(6);else if(t&&t.type==="checkbox"&&t.closest("#consigli,#mangiare,#itinerario"))hap(10)},true);
/* tasto indietro (Android) e gesto indietro (iOS): chiudono la schermata aperta invece di uscire */
(function(){var els={ask:$("#ask"),exp:$("#exp"),help:$("#help"),sheet:$("#sheet"),qr:$("#qrbox"),acct:$("#acct"),setup:$("#setup"),dest:$("#dest")},order=[],has=false,pop=false;
try{if(history.state&&history.state.vov)history.replaceState(null,"")}catch(e){}
function isOn(k){var e=els[k];if(!e||!e.classList.contains("on"))return false;if(k==="dest"&&!CFG)return false;return true}
function closeTop(k){if(k==="ask")closeAsk();else if(k==="exp")closeExp();else if(k==="help"){var b3=$("#hlclose");b3&&b3.click()}else if(k==="sheet")closeSheet();else if(k==="qr"){var b=$("#qrclose");b&&b.click()}else if(k==="acct"){var b2=$("#acclose");b2&&b2.click()}else if(k==="setup"){if(CFG)$("#scancel").click();else $("#sback").click()}else if(k==="dest"){closeDest();setCity(PD.id)}}
var tm=0;function recon(){clearTimeout(tm);tm=setTimeout(function(){order=order.filter(isOn);Object.keys(els).forEach(function(k){if(isOn(k)&&order.indexOf(k)<0)order.push(k)});
var want=order.length>0;try{if(want&&!has){history.pushState({vov:1},"");has=true}else if(!want&&has){has=false;pop=true;history.back();setTimeout(function(){pop=false},400)}}catch(e){}},30)}
var mo=new MutationObserver(recon);Object.keys(els).forEach(function(k){els[k]&&mo.observe(els[k],{attributes:true,attributeFilter:["class"]})});
window.addEventListener("popstate",function(){if(pop){pop=false;return}if(!has)return;has=false;order=order.filter(isOn);var top=order.pop();if(top)closeTop(top);setTimeout(function(){order=order.filter(isOn);recon()},60)});
window.viaNavTick=recon})();
function havG(a,b,c,d){var R=6371,r=Math.PI/180,x=(c-a)*r,y=(d-b)*r,h=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(h))}
function geoTrip(cb){var td=todayStr(),L=[];if(SAVED&&SAVED.date&&CITIES[SAVED.dest])L.push({cur:1,c:SAVED});trips().forEach(function(t,i){L.push({k:i,c:t.cfg})});
L=L.filter(function(x){var en=x.c.date_r||x.c.date;return x.c.date<=td&&td<=en&&CITIES[x.c.dest]&&CITIES[x.c.dest].LL});
if(!L.length||!navigator.geolocation||!navigator.permissions||!navigator.permissions.query){cb(null);return}
var done=false;function fin(m){if(done)return;done=true;cb(m)}
setTimeout(function(){fin(null)},2400);
navigator.permissions.query({name:"geolocation"}).then(function(p){if(p.state!=="granted"){fin(null);return}
navigator.geolocation.getCurrentPosition(function(pos){var best=null,bd=1e9;L.forEach(function(x){var ll=CITIES[x.c.dest].LL,d=havG(pos.coords.latitude,pos.coords.longitude,ll[0],ll[1]);if(d<60&&d<bd){best=x;bd=d}});fin(best)},function(){fin(null)},{maximumAge:600000,timeout:2200,enableHighAccuracy:false})},function(){fin(null)})}
/* avvio */
if(CFG&&CFG.date&&CFG.a_arr&&CFG.r_dep){if(!CFG.date_r)CFG.date_r=CFG.date;setCity(PD.id);renderAll();document.documentElement.classList.remove("hold");if(TRIP.multi&&CFG.stay&&CFG.stay.addr&&!CFG.stay.geo)geocode();if(OPEN==="setup")openSetup(false);
/* all'apertura: sempre la schermata principale, tranne se il GPS ti colloca in un viaggio in corso */
if(!PICK&&!OPEN&&!HASHT){var t0=Date.now(),rmo=matchMedia("(prefers-reduced-motion: reduce)").matches;geoTrip(function(m){if(m){if(m.cur)return;if(m.k!=null){switchTrip(m.k);return}}setTimeout(function(){openDest()},Math.max(0,(rmo?500:2700)-(Date.now()-t0)))})}}
else{CFG=null;document.documentElement.classList.add("hold");if(PICK&&CITIES[PICK]){setCity(PD.id);openSetup(true)}else{setCity(null);setTimeout(function(){if(window.viaTour&&!viaTour.seen())viaTour.open(openDest);else openDest()},matchMedia("(prefers-reduced-motion: reduce)").matches?500:2700)}}
})();

/* condividi il viaggio: un solo punto d'ingresso */
(function(){var b=document.getElementById("shshare");if(!b)return;b.addEventListener("click",function(){var sh=document.getElementById("sheet");if(window.__ask)window.__ask("Condividi il viaggio","Come vuoi inviarlo?",[{t:"Invia l'itinerario in PDF",fn:function(){var x=document.getElementById("shsit");x&&x.click()}},{t:"Link per aprirlo su un altro telefono",fn:function(){var x=document.getElementById("shlink");x&&x.click()}},{t:"Riepilogo come immagine",fn:function(){window.__recap&&window.__recap()}}])})})();

/* pagina principale: fascia piena dietro logo e ingranaggio quando la scheda arriva in alto */
(function(){var d=document.getElementById("dest"),sh=document.getElementById("dsheet");if(!d||!sh)return;var t=0;function pin(){t=0;var top=sh.getBoundingClientRect().top;d.classList.toggle("pin",top<96+(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sat"))||0))}d.addEventListener("scroll",function(){if(!t)t=requestAnimationFrame(pin)},{passive:true});window.addEventListener("resize",pin)})();
