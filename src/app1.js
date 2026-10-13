/* ===== nucleo: configurazione, pianificazione, sezioni ===== */
(function(){
"use strict";
document.documentElement.classList.add("js");
var S=PD.STOPS,V=PD.V;
var DAYS=["lunedì","martedì","mercoledì","giovedì","venerdì","sabato","domenica"];
var DAB=["Lun","Mar","Mer","Gio","Ven","Sab","Dom"];
var MESI=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
var MAXD=10;
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
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v)}catch(e){return null}}
var PICK=ss("via-pick"),OPEN=ss("via-open");ss("via-pick",null);ss("via-open",null);
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
function estMin(pa,pb){var d=hav(pa,pb);return d<1.6?Math.round(d*1.3/4.5*60)+3:Math.round(12+d*2.8)}
function legOf(a,b){var L=PD.LEGS&&PD.LEGS[a+">"+b];if(L)return L;
if(PD.fx.leg){L=PD.fx.leg(a,b,E);if(L)return L}
var pa=posOf(a),pb=posOf(b),d=hav(pa,pb),hb=b==="home";
if(d<0.25)return{min:3,mode:"walk",txt:hb?"L'alloggio è a due passi.":"A pochi passi.",g:[{w:[pa,pb]}]};
if(d<1.6){var w=Math.round(d*1.3/4.5*60)+3;return{min:w,mode:"walk",txt:"A piedi"+(hb?" fino all'alloggio":"")+", circa "+w+" minuti.",g:[{w:[pa,pb]}]}}
var m=Math.round(12+d*2.8);return{min:m,mode:"metro",txt:(PD.T.ride||"In metro")+(hb?" fino all'alloggio":"")+", circa "+m+" minuti: Google Maps ti indica la linea migliore.",g:[{w:[pa,pb],dash:1}]}}
function lc(t){return t.charAt(0).toLowerCase()+t.slice(1)}
function retOf(ap,id){var R=PD.RET[ap];if(R[id])return R[id];if(!PD.RETC||id==="start")return R.A;var l=legOf(id,"start"),A=R.A;return{min:l.min+A.min,txt:"Verso "+PD.hub.n+": "+lc(l.txt)+" Poi "+lc(A.txt),g:l.g.concat(A.g||[]),rides:l.mode==="metro"?1:0}}
function access(pos,to){var d=hav(pos,to);if(d<0.25)return{min:3,mode:"walk",d:d};if(d<1.6)return{min:Math.round(d*1.3/4.5*60)+3,mode:"walk",d:d};return{min:Math.round(12+d*2.8),mode:"metro",d:d}}
/* dall'alloggio all'aeroporto, e dall'arrivo all'alloggio */
function homeAir(){if(PD.fx.homeAir)return PD.fx.homeAir(E);var l=legOf("home","start"),A=PD.RET[CFG.to].A;return{min:l.min+A.min,txt:(l.mode==="walk"?"A piedi fino a ":(PD.T.ride||"In metro")+" fino a ")+PD.hub.n+" ("+l.min+" minuti), poi "+lc(A.txt),g:l.g.concat(A.g||[])}}
function arrLeg(){if(PD.fx.arrLeg)return PD.fx.arrLeg(E);var l=legOf("start","home");return{min:Math.max(3,l.min),mode:l.mode,txt:"Da "+PD.hub.n+": "+lc(l.txt),g:l.g}}
function lastRet(prev){var HA=homeAir(),l=prev==="home"?null:legOf(prev,"home");
return{min:(l?l.min:0)+15+HA.min,txt:(l?"Torna all'alloggio a ritirare i bagagli: "+l.txt.charAt(0).toLowerCase()+l.txt.slice(1)+" Poi: ":"Ritira i bagagli e parti: ")+HA.txt.charAt(0).toLowerCase()+HA.txt.slice(1),g:(l?l.g:[]).concat(HA.g),toHome:l,rides:l&&l.mode==="metro"?1:0}}

/* ===== pianificazione di una giornata ===== */
function win(id,wd,date){var w=S[id].win;return w?w(wd,date,sunset(date)):null}
function sim(acts,dur,ctx){
var t=ctx.c0,prev=ctx.start,items=[],B=false,L=false,D=false,late=0,lastEnd=0,LO=PD.LUNCHO||0;
function meal(k,d){var w=prev==="start"||prev==="home"?3:8;t+=w;items.push({k:"meal",m:k,t:t,d:d,z:zoneOf(prev),walk:w,near:prev==="home",hotel:k==="col"&&prev==="home"&&!!ctx.multi&&COPT.hb===1});t+=d}
if(ctx.wantB){meal("col",30);B=true}
acts.forEach(function(id){
var lg=legOf(prev,id);
if(!L&&ctx.wantL&&(t>=11*60+50+LO||(t>=11*60+15+LO&&t+lg.min+dur[id]>13*60+50+LO)||(t>=11*60+LO&&t+lg.min+dur[id]>14*60+15+LO))){meal("pra",60);L=true}
if(!D&&ctx.wantD&&t>=ctx.dinAt){meal("cen",55);D=true}
t+=lg.min;var w=win(id,ctx.wd,ctx.date);if(w&&t<w[0])t=w[0];
if(D&&ctx.multi)late+=60;
if(w&&t+dur[id]>w[1])late+=t+dur[id]-w[1];
items.push({k:"act",id:id,t:t,d:dur[id],leg:lg});t+=dur[id];lastEnd=t;prev=id});
var R=ctx.endOf(prev);
if(!L&&ctx.wantL&&t<15*60+30+LO&&t>=11*60+15+LO){meal("pra",50);L=true}
if(ctx.multi&&lastEnd>ctx.dinAt+20)late+=lastEnd-ctx.dinAt-20;
if(!D&&ctx.wantD){
 if((ctx.free||(ctx.multi&&!acts.length))&&t<ctx.dinAt-45){var fl=legOf(prev,"home");items.push({k:"free",t:t+2,d:ctx.dinAt-t-2,leg:fl,from:prev});t=ctx.dinAt;prev="home";R=ctx.endOf(prev)}
 meal("cen",55);D=true}
if(ctx.snack&&!D&&t>=15*60+30&&t+25+R.min<=ctx.dl){t+=5;items.push({k:"snk",t:t,d:20,z:zoneOf(prev)});t+=20}
var slack=ctx.dl-(t+R.min);if(late>0)slack=Math.min(slack,-late);
return{items:items,end:t,prev:prev,ret:R,slack:slack,B:B,L:L,D:D}}
function planDay(acts,ctx,opt){
var dur={},dropped=[],r,g=0,minLen=ctx.single?1:0;
acts=acts.slice();acts.forEach(function(id){dur[id]=S[id].id});
while(g++<80){r=sim(acts,dur,ctx);if(r.slack>=0)break;
var cand=acts.slice().sort(function(a,b){return S[b].p-S[a].p});
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
(PD.SINGLE.ins||[]).forEach(function(x){if(x[3]&&!(opt&&opt.single))return;if(x[2]&&acts.indexOf(x[2])<0)return;tryIns(x[0],x[1])});
var order=acts.slice().sort(function(a,b){return S[a].p-S[b].p}),ch=true,k=0;
while(r.slack>=15&&ch&&k++<200){ch=false;for(var i=0;i<order.length;i++){var id=order[i];if(dur[id]+5<=S[id].max){dur[id]+=5;var r2=sim(acts,dur,ctx);if(r2.slack>=10){r=r2;ch=true}else dur[id]-=5}}}}
var shrunk=acts.filter(function(id){return dur[id]<S[id].id-4});
return{r:r,acts:acts,dropped:dropped,shrunk:shrunk,none:none}}
function ridesOf(items){var n=0;items.forEach(function(x){var l=x.leg;if(x.k==="act"||x.k==="free"||x.k==="night"){if(l&&l.mode==="metro")n++}});return n}

/* gita in giornata: come la prima versione dell'app */
function planSingle(c){
var A=PD.PAR[c.to],land=toMin(c.a_arr),dep=toMin(c.r_dep),imb=toMin(c.r_imb),wd=wdOf(c.date);
var c0=land+A.inMin,dl=Math.min(dep-A.buf,imb!=null?imb-45:1e9);
var ctx={single:1,c0:c0,start:"start",dl:dl,wd:wd,date:c.date,endOf:function(p){return retOf(c.to,p)},wantB:c0<10*60+45,wantL:c0<14*60+(PD.LUNCHO||0)&&dl>13*60+30+(PD.LUNCHO||0),wantD:dl>=18*60+15,dinAt:18*60+45,snack:1};
var x=planDay(PD.SINGLE.acts,ctx,{single:1}),r=x.r;
var items=[{k:"air",t:land,d:A.inMin,c0:c0}].concat(r.items);
items.push({k:"ret",t:r.end,d:r.ret.min,ret:r.ret,arr:r.end+r.ret.min,slack:r.slack,dl:dl});
var n=0;items.forEach(function(it){if(it.k==="act")it.n=++n});
return{kind:"single",i:0,date:c.date,wd:wd,items:items,acts:x.acts,dropped:x.dropped,shrunk:x.shrunk,none:x.none,c0:c0,dl:dl,land:land,dep:dep,imb:imb,leave:r.end,prev:r.prev,B:r.B,L:r.L,D:r.D,A:A,rides:ridesOf(items)+(A.xr||0)}}

/* viaggio di più giorni */
function frame(c,i,n){var A=PD.PAR[c.to],date=addDays(c.date,i),wd=wdOf(date),kind=i===0?"first":i===n-1?"last":"mid",f={i:i,date:date,wd:wd,kind:kind,A:A,acts:[]};
if(kind==="first"){var land=toMin(c.a_arr),tC=land+A.inMin,lh=arrLeg(),tH=tC+lh.min;f.land=land;f.tC=tC;f.tH=tH;f.lh=lh;f.c0=tH+15;f.dl=22*60+45}
else{f.c0=8*60+45;f.dl=22*60+45}
if(kind==="last"){var dep=toMin(c.r_dep),imb=toMin(c.r_imb);f.dep=dep;f.imb=imb;f.dl=Math.min(dep-A.buf,imb!=null?imb-45:1e9);f.cap=f.dl-homeAir().min-15-f.c0-30-(f.dl>14*60?60:0)-30}
else f.cap=f.dl-f.c0-(f.c0<10*60+45?30:0)-(f.c0<14*60?60:0)-55-45-60;
return f}
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
wantB:f.c0<10*60+45,wantL:f.c0<14*60+(PD.LUNCHO||0)&&f.dl>13*60+30+(PD.LUNCHO||0),wantD:last?f.dl>=18*60+15:f.c0<21*60+30,dinAt:last?18*60+45:19*60+30+(PD.DINO||0),free:!last,snack:last};
var x=planDay(f.acts,ctx,null),r=x.r,items=[];
if(f.kind==="first"){items.push({k:"air",t:f.land,d:f.A.inMin,c0:f.tC,multi:1});items.push({k:"home",t:f.tH,d:15,arr:1,leg:f.lh})}
else items.push({k:"home",t:f.c0,d:0,co:last?1:0,mor:last?0:1});
items=items.concat(r.items);
var fr=last&&!x.none&&!x.acts.length&&r.slack>=75?{k:"free",t:r.end,d:Math.floor((r.slack-30)/5)*5,last:1}:null,rt=r.end+(fr?fr.d:0);if(fr)items.push(fr);
if(last)items.push({k:"ret",t:rt,d:r.ret.min,ret:r.ret,arr:rt+r.ret.min,slack:r.slack-(fr?fr.d:0),dl:f.dl,multi:1});
else if(r.prev!=="home"||items[items.length-1].k==="meal")items.push({k:"night",t:r.end,d:r.ret.min,leg:r.ret});
var n=0;items.forEach(function(it){if(it.k==="act")it.n=++n});
var rides=ridesOf(items)+(last&&r.ret.rides?1:0)+((f.kind==="first"||last)?(f.A.xrm||0):0);
return Object.assign(f,{items:items,acts:x.acts,dropped:x.dropped,shrunk:x.shrunk,none:x.none,leave:rt,prev:r.prev,B:r.B,L:r.L,D:r.D,rides:rides,end:rt+(last?0:r.ret.min)})}
function buildTrip(c){var n=nDays(c),A=PD.PAR[c.to];
if(n===1)return{multi:false,n:1,A:A,days:[planSingle(c)],left:[]};
var days=[];for(var i=0;i<n;i++)days.push(frame(c,i,n));
var left=assign(days,n);
return{multi:true,n:n,A:A,days:days.map(function(f){return planMulti(f,c)}),left:left}}

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
function prefList(ids,wd,t,m,z){var base=vSorted(ids,wd,t);if(!fprefOn())return{main:base,rest:[]};
var main=[],rest=[],ord={ok:0,mid:1,ko:2};base.forEach(function(o,i){o.i=i;o.f=ffit(o.id);(o.f.ok?main:rest).push(o)});
if((FP.d.length||FP.p)&&main.filter(function(o){return o.s.c!=="ko"}).length<2)fpool(m,z).forEach(function(id){if(ids.indexOf(id)>=0)return;var o=vSorted([id],wd,t)[0];o.f=ffit(id);if(o.f.ok){o.extra=1;o.i=99;main.push(o)}});
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
return '<li class="'+(o.s.c==="ko"?"closed":"")+'"><b><a target="_blank" rel="noopener" href="'+esc(PD.G(q))+'">'+esc(v.n)+'</a></b> <span class="st '+o.s.c+'">'+(o.s.c==="ok"?"✓ ":o.s.c==="ko"?"⚠️ ":"⏱ ")+esc(o.s.t)+'</span> <a class="go sm" href="'+esc(gdir(q))+'" target="_blank" rel="noopener">↗︎ Portami lì</a> – '+v.r+' ★ · '+esc(v.a)+'. '+esc(v.d)+' <i style="font-style:normal;color:var(--mute)">'+esc(v.pr)+'</i>'+fbadge(o.id,o.extra)+'<span class="hrs">🕐 '+esc(hrsTxt(v,wd))+'</span></li>'}
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
 L:{},on:function(fn){(this.L.f=this.L.f||[]).push(fn)},emit:function(){(this.L.f||[]).forEach(function(f){try{f()}catch(e){console.error(e)}})}};

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
body='<p>'+(it.m==="col"?(it.near?"A pochi passi dall'alloggio.":"Appena usciti dalla stazione, a pochi passi."):it.m==="pra"?((PD.T.praZ||{})[it.z]||PD.T.pra+": "+(it.d>=60?"un'ora a tavola, con calma.":"un pranzo veloce.")):(TRIP.multi&&P.kind!=="last"?"La cena della giornata, senza fretta.":"Mangia qui e non in aeroporto: si spende meno e si mangia meglio. Tieni d'occhio l'orologio."))+'</p><div class="eat"><h3>Dove mangiare</h3>'+eatUL(pl,WD,it.m,it.z)+fpNote()+'</div>'+(first?goBtn(vq(first.v),"walking","Portami lì","🚶"):"")}}
else if(it.k==="snk"){cls="food";ti="Ultimo assaggio prima di partire";var sids=PD.MEAL.snk[it.z]||(it.z==="X"?null:PD.MEAL.snk.A);
body='<p>Non c\'è tempo per una cena seduti: prendete qualcosa da mangiare in viaggio o in aeroporto prima dei controlli.</p>'+(sids?'<div class="eat"><h3>Dove prenderlo</h3>'+eatUL(prefList(sids,WD,it.t,"snk",it.z),WD,"snk",it.z)+fpNote()+'</div>':nearBox("snk"))}
else if(it.k==="act"){var s=S[it.id];cls=s.cls;ti=s.t;var meta=s.m,lg=it.leg;
if(PD.fx.meta)meta=PD.fx.meta(it,meta,E);
if(s.sun){var ss=sunset(P.date);if(Math.abs(it.t+it.d/2-ss)<120)meta+=" Il sole tramonta alle "+fmt(ss)+": "+(it.t+it.d>ss?"sei qui al momento giusto per la luce del tramonto.":"goditi l'ultima luce.")}
(PD.EXCL||[]).forEach(function(x){if(it.id===x[1]&&TRIP.multi&&TRIP.days.some(function(d){return d.acts.indexOf(x[0])>=0}))meta=x[2]});
body='<div class="leg"><i>'+(lg.mode==="walk"?"🚶":"🚇")+'</i><span>'+esc(lg.txt)+'</span></div><p>'+esc(s.d)+'</p>'+(meta?'<p class="meta">'+esc(meta)+'</p>':'')+goBtn(s.q,lg.mode==="walk"?"walking":"transit","Portami lì",lg.mode==="walk"?"🚶":"🚇")}
else if(it.k==="free"&&it.last){cls="home";ti="Mattinata libera";body='<p>Hai circa '+fdur(it.d)+' prima di partire: lascia i bagagli all\'alloggio e goditi il quartiere, con un caffè in terrazza, gli ultimi acquisti o una passeggiata. Alle '+fmt(it.t+it.d)+' si riparte per l\'aeroporto.</p>'}
else if(it.k==="free"){cls="home";var lng=it.d>=150;ti=lng?"Pomeriggio libero":"Tempo libero";body='<div class="leg"><i>'+(it.leg.mode==="walk"?"🚶":"🚇")+'</i><span>'+esc(it.leg.txt)+'</span></div><p>'+(lng?"Hai circa "+fdur(it.d)+" senza tappe fisse. "+PD.T.freeLong:PD.T.freeShort)+' La cena è verso le '+fmt(it.t+it.d)+'.</p>'}
else if(it.k==="night"){cls="home";ti="Rientro all'alloggio";var nx=TRIP.days[P.i+1];body='<div class="leg"><i>'+(it.leg.mode==="walk"?"🚶":"🚇")+'</i><span>'+esc(it.leg.txt)+'</span></div><p>Buonanotte! '+(nx?(nx.kind==="last"?"Domani è l'ultimo giorno: check-out entro le "+esc(h.cout)+".":"Domani si riparte alle "+fmt(nx.c0)+(nx.acts.length?" con "+esc(S[nx.acts[0]].t)+".":".")):"")+'</p>'+goBtn(h.q,it.leg.mode==="walk"?"walking":"transit","Portami all'alloggio","🏨")}
else if(it.k==="ret"){cls="air";ti=it.multi?"Bagagli e aeroporto":"Ritorno all'aeroporto";var R=it.ret,imb=P.imb!=null?fmt(P.imb):null;
body='<p>'+esc(R.txt)+'</p><p class="meta">Arrivo in aeroporto verso le '+fmt(it.arr)+(imb?", imbarco dalle "+imb:"")+", decollo alle "+fmt(P.dep)+"."+(it.slack>=20?" Hai circa "+fdur(it.slack)+" di margine in più.":"")+'</p>'+(it.multi&&R.toHome?goBtn(h.q,R.toHome.mode==="walk"?"walking":"transit","Portami all'alloggio","🏨")+' ':'')+goBtn(A.gm,"transit","Portami in aeroporto","🚆")}
return '<li class="step '+cls+'" data-t="'+it.t+'"><div class="t">'+fmt(it.t)+'</div><div class="body"><h2>'+esc(ti)+'</h2>'+body+'</div></li>'}

function rangeTxt(){var c=CFG,a=dateObj(c.date),b=dateObj(c.date_r);if(TRIP.n===1)return dateShort(c.date);
return a.getUTCMonth()===b.getUTCMonth()?a.getUTCDate()+"–"+b.getUTCDate()+" "+MESI[b.getUTCMonth()]:dateShort(c.date)+" – "+dateShort(c.date_r)}
function renderHero(){var c=CFG,A=TRIP.A,n=TRIP.n,ttl=n===1?PD.n+" in un giorno":PD.n+" in "+n+" giorni";
$("#hero h1").textContent=ttl;
$("#hsub").textContent=(n===1?cap(dateLong(c.date))+".":"Da "+dateLong(c.date).replace(/ \d{4}$/,"")+" a "+dateLong(c.date_r)+": "+n+" giorni e "+(n-1)+(n===2?" notte.":" notti."))+" Atterraggio a "+A.n+" alle "+fmt(toMin(c.a_arr))+", volo di ritorno alle "+fmt(toMin(c.r_dep))+". "+(c.ppl===1?"Una persona":c.ppl+" persone")+(n>1?", alloggio in "+home().where+".":", "+PD.T.move+".");
$("#appt").innerHTML=esc(PD.n)+" <b>· "+esc(rangeTxt())+"</b>";
$("#sps").textContent=PD.n+" · "+rangeTxt();
document.title="Viaticum · "+ttl}
function renderBar(){var it=P.items,segs=[],end=P.kind==="single"||P.kind==="last"?P.dep:(P.end||P.leave);
for(var i=0;i<it.length;i++){var a=it[i],b=it[i+1];segs.push(Math.max(10,(b?b.t:end)-a.t))}
$("#hbar").innerHTML=segs.map(function(f){return '<i style="flex:'+f+'"></i>'}).join("");
var s0=P.kind==="single"||P.kind==="first"?fmt(P.land)+" atterraggio":fmt(P.c0)+(P.kind==="last"?" check-out":" partenza"),s1=P.kind==="single"||P.kind==="last"?fmt(P.dep)+" decollo":fmt(end)+" alloggio";
$("#hs").textContent=s0;$("#he").textContent=s1;$("#hbar").setAttribute("aria-label","La giornata: "+s0+", "+s1)}

function renderShort(){var el=$("#short"),t=[];
if(P.none){t.push(P.kind==="single"?"Con questi orari non resta tempo per entrare in città: tra il trasferimento dall'aeroporto e il ritorno non ci sono abbastanza minuti. Controlla gli orari dei voli.":P.kind==="first"?"Atterri tardi: oggi c'è solo il tempo di arrivare all'alloggio.":P.kind==="last"?"Il volo parte presto: oggi c'è giusto il tempo per il check-out e il viaggio in aeroporto.":"Oggi non resta tempo per le tappe.")}
else{if(P.dropped.length)t.push("Il tempo è poco, quindi ho tolto: "+P.dropped.map(function(id){return S[id].t}).join(", ")+".");
if(P.shrunk.length&&!P.dropped.length)t.push("Il tempo è stretto: ho accorciato "+P.shrunk.map(function(id){return S[id].t}).join(", ")+".")}
if(TRIP.multi&&SEL===0&&TRIP.left.length)t.push("In "+TRIP.n+" giorni non ci stanno: "+TRIP.left.map(function(b){return b.t}).join(", ")+". Allunga il viaggio per aggiungerli.");
el.hidden=!t.length;el.textContent=t.length?"⏳ "+t.join(" "):""}

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
$("[data-edit]",el).addEventListener("click",function(){openSetup(false)})}

function renderItin(){$("#ith").textContent=TRIP.multi?"Giorno "+(SEL+1)+" · "+DAYS[P.wd]+" "+dateObj(P.date).getUTCDate():"Itinerario";$("#steps").innerHTML=P.items.map(stepHTML).join("");buildWheel()}

/* ghiera scorrevole */
var WH={};
function buildWheel(){var ol=$("#steps");var old=$("#itinerario .wbox");if(old)old.remove();
var steps=$$(".step",ol),box=document.createElement("section");box.className="wbox";
box.innerHTML='<div class="wheelwrap"><div class="wheel" id="wheel" tabindex="0" role="listbox" aria-label="Tappe della giornata"></div></div><div id="detail" aria-live="polite"></div><div class="ctl"><button type="button" id="wl">'+(document.body.classList.contains("showall")?"Torna alla ghiera":"Mostra tutto l'elenco")+'</button></div>';
ol.parentNode.insertBefore(box,ol);
var wheel=$("#wheel",box),detail=$("#detail",box),H=44,cur=-1,tick=0;
var items=steps.map(function(li,i){var b=document.createElement("button");b.type="button";b.className="wi";b.setAttribute("role","option");b.innerHTML='<span class="wt"></span><span class="wn"></span>';b.children[0].textContent=$(".t",li).textContent;b.children[1].textContent=$("h2",li).textContent;b.addEventListener("click",function(){wheel.scrollTo({top:i*H,behavior:"smooth"})});wheel.appendChild(b);return b});
function upd(){var y=wheel.scrollTop,idx=Math.max(0,Math.min(items.length-1,Math.round(y/H)));items.forEach(function(b,i){var d=Math.min(3,Math.abs(y/H-i));b.style.opacity=1-d*0.28;b.style.transform="scale("+(1-d*0.06)+")";b.classList.toggle("sel",i===idx);b.setAttribute("aria-selected",i===idx)});
if(idx!==cur){cur=idx;detail.innerHTML=$(".body",steps[idx]).innerHTML;$$("[data-edit]",detail).forEach(function(x){x.addEventListener("click",function(){openSetup(false)})})}}
wheel.addEventListener("scroll",function(){if(!tick)tick=requestAnimationFrame(function(){tick=0;upd()})});
wheel.addEventListener("keydown",function(e){if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();wheel.scrollTo({top:(cur+(e.key==="ArrowDown"?1:-1))*H,behavior:"smooth"})}});
$("#wl",box).addEventListener("click",function(){var all=document.body.classList.toggle("showall");this.textContent=all?"Torna alla ghiera":"Mostra tutto l'elenco"});
WH={wheel:wheel,items:items,go:function(i){wheel.scrollTop=i*H;upd()}};upd()}

/* banner dal vivo */
var lastNow=-2;
function todayIdx(){if(!TRIP)return -1;var d=paris().d;for(var i=0;i<TRIP.days.length;i++)if(TRIP.days[i].date===d)return i;return -1}
var lastDay=null;
function liveTick(){var live=$("#live");if(!TRIP||!CFG){live.hidden=true;return}var dd=paris().d;if(lastDay&&dd!==lastDay){lastDay=dd;try{renderAll()}catch(e){console.error(e)}return}lastDay=dd;
var n=paris(),c=CFG,A=TRIP.A,D0=TRIP.days[0],DN=TRIP.days[TRIP.n-1];
function set(cls,b,sp){live.className="live "+cls;live.innerHTML='<i class="dot"></i><div class="lt"><b></b><span></span></div>';$("b",live).textContent=b;$("span",live).textContent=sp;live.hidden=false}
var steps=$$("#steps .step");steps.forEach(function(li){li.classList.remove("now")});if(WH.items)WH.items.forEach(function(w){w.classList.remove("now")});
if(n.d<D0.date){var d=Math.round((dateObj(D0.date)-dateObj(n.d))/864e5);set("calm",d===1?"Domani si parte! ✈️":"Mancano "+d+" giorni al viaggio",(c.a_num?"Volo "+c.a_num+(c.a_dep?" alle "+c.a_dep:"")+". ":"")+"Atterraggio a "+A.n+" alle "+c.a_arr+"."+(d<=2&&PD.T.remind?" "+PD.T.remind:""));return}
if(n.d>DN.date){set("calm","Com'è andata a "+PD.n+"? "+PD.flag,"L'itinerario resta qui come ricordo.");return}
var di=todayIdx(),T=TRIP.days[di];if(!T)return;
var i=-1;T.items.forEach(function(s,k){if(n.m>=s.t)i=k});
if(di===SEL){steps.forEach(function(li,k){li.classList.toggle("now",k===i)});if(WH.items){WH.items.forEach(function(w,k){w.classList.toggle("now",k===i)});if(i!==lastNow){lastNow=i;if(i>=0)try{WH.go(i)}catch(e){}}}}
var nm=function(s){return s?stepTitle(T,s):""};
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
function acts(j,k){if(di!==SEL)return;var s=steps[k],l=s&&s.querySelector("a.go"),h='<div class="lact"><button type="button" class="lb" data-j="'+j+'">Vai alla tappa</button>'+(l?'<a class="lb lb2" href="'+esc(l.getAttribute("href"))+'" target="_blank" rel="noopener">🧭 Portami lì</a>':"")+'</div>';$(".lt",live).insertAdjacentHTML("beforeend",h)}
if(i<0){set("","Prima tappa: "+nm(T.items[0]),"Alle "+fmt(T.items[0].t)+", tra "+fdur(T.items[0].t-n.m));acts(0,0);return}
set("","Ora: "+nm(cur),nx2?"Prossima: "+nm(nx2)+" tra "+fdur(nx2.t-n.m):"");acts(i,nx2?i+1:i)}
$("#live").addEventListener("click",function(e){var b=e.target.closest(".lb");if(!b||b.tagName==="A")return;var s=$$("#steps .step")[+b.dataset.j];if(s)s.scrollIntoView({behavior:"smooth",block:"center"})});
function stepTitle(T,it){var keep=P;P=T;var h=stepHTML(it);P=keep;var m=/<h2>(.*?)<\/h2>/.exec(h);return m?m[1].replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"'):""}

/* avvisi e scioperi */
function avvList(){var c=CFG,res=[],last=TRIP.days[TRIP.n-1].date;
function inR(a,d){return d>=a.from&&d<=a.to}
PD.AVV.concat(window.AVV_IT||[]).forEach(function(a){var hit;
if(a.fa)hit=inR(a,c.date);
else if(a.fl){if(a.ap&&a.ap.indexOf(c.to)<0)return;hit=inR(a,c.date)||inR(a,last);if(a.air)hit=(a.air.test(c.a_num||"")&&inR(a,c.date))||(a.air.test(c.r_num||"")&&inR(a,last))}
else hit=TRIP.days.some(function(d){if(!inR(a,d.date))return false;if(a.wd&&a.wd.indexOf(d.wd+1)<0)return false;if(a.ap&&a.ap.indexOf(c.to)<0)return false;
 if(a.after!=null){var f=(d.kind==="single"||d.kind==="first")&&(d.land+d.A.inMin>=a.after-90),l=(d.kind==="single"||d.kind==="last")&&d.leave>=a.after-90;if(!f&&!l)return false}return true});
if(hit&&!res.some(function(r){return r.t===a.t}))res.push(a)});return res}
function renderAvv(){var el=$("#avv"),L=avvList();el.hidden=!L.length;el.innerHTML=L.map(function(a){return "<b>⚠️ "+esc(a.t)+"</b><p>"+esc(a.x)+"</p>"}).join("")}

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
+fld("a","Andata",(F.code||"")+" → "+esc(c.to))+fld("r","Ritorno",esc(c.to)+" → "+(F.code||""))+fld("x","Extra","Bagagli, posti, imbarco prioritario")
+'<div class="vct"><span>Totale voli</span><span id="vctt"></span></div><p class="vcn">Le voci compaiono nella tabella dei Costi e nel PDF. Le trovi spuntabili anche lì.</p>';
function upd(){var R=flightRows(),pp=R.reduce(function(s,r){return s+r[2]},0);$("#vctt").textContent=pp?eur(pp*N)+(multi?" ("+eur(pp)+" a persona)":""):"—"}
function save(){COPT.vl=COPT.vl||{};ls("via-copt",JSON.stringify(COPT));upd();if(PREADY||true){renderCosti(false);renderSpese()}}
box.querySelectorAll("input").forEach(function(i){i.addEventListener("input",function(){COPT.vl=COPT.vl||{};var v=parseFloat(String(i.value).replace(",","."));COPT.vl[i.dataset.k]=v>0?Math.round(v*100)/100:0;save()})});
box.querySelectorAll(".vcm button").forEach(function(b){b.addEventListener("click",function(){COPT.vl=COPT.vl||{};COPT.vl.m=b.dataset.m;ls("via-copt",JSON.stringify(COPT));renderVcost();renderCosti(false);renderSpese()})});
upd()}

function renderVoli(){var c=CFG,A=TRIP.A,F=fromInfo(c),DL=TRIP.days[TRIP.n-1],fr=function(n){return n?'<a class="vch" target="_blank" rel="noopener" href="https://www.flightradar24.com/data/flights/'+encodeURIComponent(n.replace(/\s+/g,"").toLowerCase())+'">Flightradar24 ↗︎</a>':""};
function card(side){var a=side==="a",num=a?c.a_num:c.r_num,o=a?F.code||"—":c.to,d=a?c.to:F.code||"—",dt=a?c.date:(c.date_r||c.date);
var rows=a?[["Data",cap(dateLong(dt))],["Numero volo",num||"—"],["Partenza",c.a_dep||"—"],["Atterraggio a "+PD.n,c.a_arr]]:[["Data",cap(dateLong(dt))],["Numero volo",num||"—"],["Apertura imbarco",c.r_imb||"—"],["Partenza",c.r_dep]];
var lk=a?[[F.url,"🛫 Partenze "+F.name],[A.url,"🛬 Arrivi "+A.n]]:[[A.url,"🛫 Partenze "+A.n],[F.url,"🛬 Arrivi "+F.name]];
return '<div class="vcard"><div class="vleg"><span class="iata">'+esc(o)+'</span><i class="pl">✈︎</i><span class="iata">'+esc(d)+'</span> '+(a?"Andata":"Ritorno")+'</div>'+rows.map(function(r){return '<div class="vrw"><span>'+r[0]+'</span><b>'+esc(r[1])+'</b></div>'}).join("")+'<div class="vlinks">'+lk.filter(function(x){return x[0]}).map(function(x){return '<a class="vch" target="_blank" rel="noopener" href="'+esc(x[0])+'">'+esc(x[1])+' ↗︎</a>'}).join("")+fr(num)+'</div></div>'}
$("#vgrid").innerHTML=card("a")+card("r");
renderVcost();
$("#vtips").innerHTML='<details><summary>🛬 Dall\'aeroporto di '+esc(A.n)+(TRIP.multi?' all\'alloggio':' al centro')+'</summary><ul><li>'+esc(A.arr)+'</li><li>'+esc(A.tk)+'</li>'+(PD.fx.voliTip?PD.fx.voliTip(E):(A.vt?'<li>'+esc(A.vt)+'</li>':''))+'</ul></details><details><summary>🛫 Ritorno in aeroporto</summary><ul><li>'+(TRIP.multi?"L'ultimo giorno parti alle "+fmt(DL.leave)+". ":"Parti dall'ultima tappa alle "+fmt(DL.leave)+". ")+esc(DL.items[DL.items.length-1].ret.txt)+'</li><li>Calcolo l\'arrivo in aeroporto almeno '+fdur(A.buf)+' prima del decollo'+(DL.imb!=null?' e 45 minuti prima dell\'apertura dell\'imbarco':'')+'.</li></ul></details>'}

/* ===== pasti ===== */
function renderPasti(){var hb=$("#hbt");if(hb){hb.hidden=!(TRIP&&TRIP.multi);$("#hbc").checked=COPT.hb===1}if(PD.T.mcrit)$("#mcrit").textContent=PD.T.mcrit;var it=P.items,meals=it.filter(function(x){return x.k==="meal"||x.k==="snk"}),h="";
$("#mlead").textContent=TRIP.multi?"Giorno "+(P.i+1)+", "+dateLong(P.date)+": i pasti in ordine e, nel mezzo, cosa assaggiare lungo il percorso.":"La giornata a tavola, in ordine: i pasti e, nel mezzo, cosa assaggiare lungo il percorso.";
if(!meals.length){$("#mgrid").innerHTML='<p class="meta">Con questi orari non ci sono pasti in città.</p>';return}
var acts=function(a,b){return it.filter(function(x){return x.k==="act"&&x.t>a&&x.t<b})};
var prevT=P.c0;
meals.forEach(function(m,mi){var between=acts(prevT,m.t);
if(mi>0||(!P.B&&between.length)){h+=btw(between,meals[mi-1],m)}
var ids=m.k==="snk"?(PD.MEAL.snk[m.z]||(m.z==="X"?null:PD.MEAL.snk.A)):mealIds(m.m,m.z),ttl=m.k==="snk"?"Ultimo assaggio":mealTitle(m);
if(m.hotel)h+='<div class="eat"><h3>'+fmt(m.t)+' · '+esc(ttl)+'</h3>'+hotelBf()+'</div>';
else if(!ids)h+='<div class="eat"><h3>'+fmt(m.t)+' · '+esc(ttl)+'</h3></div>'+nearBox(m.m||"snk");
else h+='<div class="eat"><h3>'+fmt(m.t)+' · '+esc(ttl)+'</h3>'+eatUL(prefList(ids,WD,m.t,m.k==="snk"?"snk":m.m,m.z),WD,m.k==="snk"?"snk":m.m,m.z)+(m.k==="meal"?ordBox(m.m):"")+'</div>';
prevT=m.t});
var tail=acts(prevT,1e9);if(tail.length)h+=btw(tail,meals[meals.length-1],null);
if(P.kind==="single"||P.kind==="last")h+='<div class="btw"><div class="btwh"><span class="btwi">⏳</span><div><small>'+fmt(P.leave)+' · Ritorno</small><b>Prima dell\'aeroporto</b></div></div><ul class="btwt"><li><span>🛫</span><p>In aeroporto si spende di più: se volete qualcosa per il volo, prendetelo in città.</p></li><li><span>🧴</span><p>Ai controlli non passano liquidi oltre i 100 ml: portate la borraccia vuota e riempitela dopo.</p></li></ul></div>';
else h+='<div class="btw"><div class="btwh"><span class="btwi">🌙</span><div><small>Dopo cena</small><b>Prima di dormire</b></div></div><ul class="btwt">'+PD.T.night.map(function(t){return '<li><span>'+t[0]+'</span><p>'+esc(t[1])+'</p></li>'}).join("")+'</ul></div>';
$("#mgrid").innerHTML=h;
function btw(between,a,b){var zs=[];between.forEach(function(x){var z=S[x.id].z;if(zs.indexOf(z)<0)zs.push(z)});
var ids=[];zs.forEach(function(z){(PD.MEAL.snk[z]||[]).forEach(function(id){if(ids.indexOf(id)<0)ids.push(id)})});
var t0=between.length?between[0].t:(a?a.t:P.c0),t1=b?b.t:P.leave,mid=(t0+t1)/2,tips=[];
tips.push(["💧",PD.T.water]);
if(a&&a.m==="col"&&b&&b.m==="pra")tips.push(["🚫","Evitate i caffè con vista sui monumenti: un caffè o un'acqua costano il doppio che nelle vie laterali."]);
if(b&&b.m==="cen"&&PD.T.kitchen)tips.push(["🕓",PD.T.kitchen]);
if(b&&b.m==="pra")tips.push(["🥖","Tenetevi leggeri: al massimo un dolce da dividere, il pranzo arriva presto."]);
var sn=(fprefOn()?prefList(ids,WD,mid,"snk",zs[0]||"A").main:vSorted(ids,WD,mid)).slice(0,4);
return '<div class="btw"><div class="btwh"><span class="btwi">⏳</span><div><small>'+fmt(t0)+' – '+fmt(t1)+(between.length?' · '+esc(between.map(function(x){return S[x.id].t.split(" e ")[0]}).join(", ")):'')+'</small><b>'+(a?(b?"Tra "+(a.m?MN[a.m].toLowerCase():"un pasto")+" e "+(b.m?MN[b.m].toLowerCase():"l'assaggio"):"Dopo "+(a.m?MN[a.m].toLowerCase():"l'assaggio")):"Prima di "+(b&&b.m?MN[b.m].toLowerCase():"mangiare"))+'</b></div></div><ul class="btwt">'+tips.map(function(t){return '<li><span>'+t[0]+'</span><p>'+esc(t[1])+'</p></li>'}).join("")+'</ul>'+(sn.length?'<div class="snacks">'+sn.map(function(o){var v=o.v,q=vq(v);return '<div class="snk'+(o.s.c==="ko"?" closed":"")+'"><span class="se">'+(v.e||(PD.SE||{})[o.id]||"🥐")+'</span><div><b><a target="_blank" rel="noopener" href="'+esc(PD.G(q))+'">'+esc(v.n)+'</a></b> <span class="st '+o.s.c+'">'+esc(o.s.t)+'</span><small class="sz">'+esc(v.a)+'</small><p>'+esc(v.d)+'</p><small>'+v.r+' ★ · '+esc(hrsTxt(v,WD))+' · '+esc(v.pr)+'</small> <a class="go sm" href="'+esc(gdir(q))+'" target="_blank" rel="noopener">↗︎ Portami lì</a></div></div>'}).join("")+'</div>':'')+'</div>'}}

/* ===== costi ===== */
var COPT=lj("via-copt",{});
(function(){var box=$("#fp");if(!box)return;
function paint(){$$("#fp .fpc").forEach(function(c){var g=c.dataset.g;[].forEach.call(c.children,function(b){var v=b.dataset.v,on=g==="d"?FP.d.indexOf(v)>=0:g==="p"?FP.p===+v:FP.k.indexOf(v)>=0;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on?"true":"false")})});
$("#fpsum").textContent=fprefOn()?fpSum():"Nessuna: mostro tutti i locali";box.classList.toggle("act",fprefOn());$("#fpwarn").hidden=FP.d.indexOf("gf")<0}
function save(){ls("via-fp",fprefOn()?JSON.stringify(FP):null);paint();if(CFG&&P){renderItin();renderPasti()}}
box.addEventListener("click",function(e){var b=e.target.closest(".fpc button");if(!b)return;var g=b.parentNode.dataset.g,v=b.dataset.v;
if(g==="d"){var i=FP.d.indexOf(v);if(i>=0)FP.d.splice(i,1);else FP.d.push(v)}
else if(g==="p")FP.p=+v;else{var k=FP.k.indexOf(v);if(k>=0)FP.k.splice(k,1);else FP.k.push(v)}save()});
$("#fpx").addEventListener("click",function(){FP.d=[];FP.p=0;FP.k=[];save()});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest(".fplink");if(!a)return;e.preventDefault();var t=$("#t-mangiare");if(t){t.checked=true;t.dispatchEvent(new Event("change",{bubbles:true}))}box.open=true;setTimeout(function(){try{box.scrollIntoView({behavior:"smooth",block:"start"})}catch(x){}},80)});
PAR.fpPaint=paint;paint()})();
$("#hbc").addEventListener("change",function(){COPT.hb=this.checked?1:0;ls("via-copt",JSON.stringify(COPT));if(CFG)renderAll()});

function allActs(){var a=[];TRIP.days.forEach(function(d){d.acts.forEach(function(x){if(a.indexOf(x)<0)a.push(x)})});return a}
/* modello dei costi generico: prezzi in euro nei dati della città */
function transport(){var c=CFG,n=TRIP.n,TR=PD.TR,alt=[],rides=TRIP.days.reduce(function(s,d){return s+d.rides},0);
var cityDay=function(r){return TR.cap?Math.min(r*TR.one,TR.cap):r*TR.one},city=TRIP.days.reduce(function(s,d){return s+cityDay(d.rides)},0);
var AF=(TR.air||{})[c.to]||null,air=AF?(AF.rt!=null?AF.rt:2*AF.one):0,airRow=AF?[["tr1",AF.n+(AF.rt!=null?" a/r":" a/r (2 × "+eur(AF.one)+")"),air]]:[];
function cityRows(){if(!rides)return[];var capd=TR.cap?TRIP.days.filter(function(d){return d.rides*TR.one>TR.cap}).length:0;return[["tr2",capd?TR.lbl+" ("+rides+" corse, con il tetto giornaliero di "+eur(TR.cap)+" in "+capd+(capd===1?" giorno":" giorni")+")":TR.lbl+", "+rides+" corse da "+eur(TR.one),city]]}
var opts=[{k:"single",n:"biglietti singoli",v:air+city,rows:airRow.concat(cityRows())}];
(TR.passes||[]).forEach(function(ps){if(ps.d<n||(ps.max&&n>ps.max))return;if(ps.per&&!rides)return;if(ps.only&&ps.only(TRIP)===false)return;var bestSame=opts.filter(function(o){return o.k==="p"+ps.n})[0];if(bestSame)return;
 var k=ps.per?Math.ceil(rides/ps.per):1,pp=ps.p*k,inA=ps.air&&(ps.air===true||ps.air.indexOf(c.to)>=0),v=pp+(inA?0:air);opts.push({k:"p"+ps.n,n:ps.n+(k>1?" × "+k:""),v:v,rows:(inA?[]:airRow).concat([["tr2",ps.n+(k>1?" × "+k:"")+(inA?" (aeroporto compreso)":ps.per?" per "+rides+" corse":""),pp]]),note:ps.note})});
opts.sort(function(a,b){return a.v-b.v});opts.slice(1).forEach(function(o){alt.push(o.n+" "+eur(o.v))});
return{T:opts[0].rows,alt:alt,best:opts[0].k,bn:opts[0].note}}
function flightRows(){var c=CFG,N=c.ppl,o=COPT.vl||{},d=o.m==="tot"&&N>1?N:1,F=fromInfo(c),R=[],pp=function(v){return(+v||0)/d};
if(+o.a>0)R.push(["fa","Volo di andata ("+(F.code||"partenza")+"-"+c.to+")",pp(o.a),1]);
if(+o.r>0)R.push(["fr","Volo di ritorno ("+c.to+"-"+(F.code||"partenza")+")",pp(o.r),1]);
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
var cat=[["Trasporti",M.tT,"#5b95d6"],["Attrazioni",M.tA,"#e5786a"],["Cibo",M.tF,"#eeb04a"]];if(TRIP.multi)cat.push(["Alloggio",M.tL,"#62b78a"]);if(M.V.length)cat.splice(1,0,["Voli",M.tV,"#8c7bd8"]);var off=0,i=0;
var arcs=cat.map(function(c){var len=tot?Math.max(0,c[1]/tot*100-1.2):0,o='<circle class="arc'+(anim?" anim":"")+'" cx="60" cy="60" r="46" pathLength="100" stroke="'+c[2]+'" style="--len:'+len.toFixed(2)+';--off:'+(-off).toFixed(2)+';--i:'+(i++)+'"/>';off+=tot?c[1]/tot*100:0;return o}).join("");
$("#cdonut").innerHTML='<div class="donut"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="46" class="arc-bg"/>'+arcs+'</svg><div class="dc"><b>'+eur(tot)+'</b><span>a persona'+(TRIP.n>1?" in "+TRIP.n+" giorni":"")+'</span>'+(N>1?'<small>'+eur(tot*N)+' in '+N+'</small>':'')+'</div></div><ul class="dleg">'+cat.map(function(c){return '<li><i style="background:'+c[2]+'"></i><span>'+c[0]+'</span><b>'+eur(c[1])+'</b></li>'}).join("")+'</ul>';
function rows(t,a){if(!a.length)return"";return '<tr class="grp"><td colspan="'+(N>1?3:2)+'">'+t+'</td></tr>'+a.map(function(r){var o=M.on(r);return '<tr class="'+(o?"":"off")+'"><td>'+(r[3]?'<label class="opt"><input type="checkbox" data-o="'+r[0]+'"'+(o?" checked":"")+'><span>'+esc(r[1])+'</span></label>':esc(r[1]))+'</td><td>'+(r[2]?eur(r[2]):(r[0]==="al"?"—":"gratis"))+'</td>'+(N>1?'<td>'+(r[2]?eur(r[2]*N):(r[0]==="al"?"—":"gratis"))+'</td>':'')+'</tr>'}).join("")}
$("#ctab").innerHTML='<tr><th>Voce</th><th>A persona</th>'+(N>1?'<th>In '+N+'</th>':'')+'</tr>'+rows("Voli",M.V)+rows("Trasporti",M.T)+rows("Attrazioni",M.AT)+rows("Cibo",M.F)+rows("Alloggio",M.AL)+'<tr class="tot"><td>Totale</td><td>'+eur(tot)+'</td>'+(N>1?'<td>'+eur(tot*N)+'</td>':'')+'</tr>';
$$("#ctab input[data-o]").forEach(function(x){x.addEventListener("change",function(){COPT[x.dataset.o]=x.checked?1:0;ls("via-copt",JSON.stringify(COPT));renderCosti(false);renderSpese()})});
var nt=(M.V.length?"Voli inclusi come li hai inseriti. ":"Voli esclusi: puoi aggiungerne il costo nella sezione Voli. ")+"Tutte le attrazioni sono facoltative: togli la spunta a quelle che non ti interessano e il totale si aggiorna. ";
if(PD.fx.costNote)nt+=PD.fx.costNote(E,M);else{nt+=(M.bn?M.bn+" ":M.best==="single"?"Con poche corse i biglietti singoli costano meno degli abbonamenti. ":"")+(M.alt.length?"Alternative: "+M.alt.join(", ")+". ":"")+PD.TR.note+(PD.T.foodNote?" "+PD.T.foodNote:"");if(TRIP.multi&&PD.T.taxNote)nt+=" "+PD.T.taxNote}
$("#cnote").textContent=nt;
window.PAREST=tot*N}

/* spese reali: elenco di spese condivise, saldi e rimborsi (come Splitwise) */
var SP=lj("via-spese",{});
(function(){if(!SP||typeof SP!=="object"||Array.isArray(SP))SP={};["n","x","q"].forEach(function(k){if(!Array.isArray(SP[k]))SP[k]=[]});if(typeof SP.lp!=="number")delete SP.lp;if(typeof SP.lc!=="string")delete SP.lc})();
function cats(){var a=[["tr","Trasporti"],["co","Colazioni"],["pr","Pranzi"],["ce","Cene"],["sp","Spuntini"],["ex","Extra"]];if(TRIP&&TRIP.multi){a.splice(5,0,["mu","Musei"]);a.push(["al","Alloggio"])}else a[1][1]="Colazione",a[2][1]="Pranzo",a[3][1]="Cena";return a}
var CI={tr:"🚇",co:"🥐",pr:"🥙",ce:"🍽️",sp:"🍦",ex:"🛍️",mu:"🏛️",al:"🏨"};
function catName(k){var a=[["tr","Trasporti"],["co","Colazione"],["pr","Pranzo"],["ce","Cena"],["sp","Spuntini"],["ex","Extra"],["mu","Musei"],["al","Alloggio"]].filter(function(c){return c[0]===k})[0];return a?a[1]:"Spesa"}
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
function renderSpeseBody(){var N=CFG.ppl,EST=window.PAREST||0,L=ledger(N),t=L.total/100,nm=names(),X=SP.x||[];
$("#stot").textContent=eur(t);var sb=$("#sbar"),sd=$("#sdiff"),over=t>EST;sb.style.width=Math.min(100,EST?t/EST*100:0)+"%";sb.classList.toggle("over",over);sd.classList.toggle("over",over);
sd.textContent=t===0?"Stima: "+eur(EST)+(N>1?" in "+N:""):over?"Sopra la stima di "+eur(t-EST):"Restano "+eur(EST-t)+" rispetto alla stima di "+eur(EST);
/* categorie */
var bc={};X.forEach(function(x){bc[x.c]=(bc[x.c]||0)+c100(x.a)});
$("#scat").innerHTML=Object.keys(bc).sort(function(a,b){return bc[b]-bc[a]}).map(function(k){return '<span class="scp"><i>'+(CI[k]||"💶")+'</i>'+esc(catName(k))+' <b>'+ec(bc[k])+'</b></span>'}).join("");
/* elenco */
var list=X.map(function(x){return{t:x.t||0,x:x}}).concat(SP.q.map(function(q){return{t:q.t||0,q:q}})).sort(function(a,b){return b.t-a.t}),last="",h="";
list.forEach(function(r){var d=dayTxt(r.t);if(d!==last){h+='<div class="sday">'+esc(d)+'</div>';last=d}
if(r.x){var x=r.x,p=Math.min(N-1,x.p||0),w=(x.w&&x.w.length?x.w:allIdx(N)).filter(function(i){return i<N}),who2=N<2?catName(x.c):(x.s?"importi diversi":(w.length>=N?"tra tutti":"tra "+w.map(function(i){return nm[i]}).join(", ")));
h+='<button type="button" class="xr" data-id="'+esc(x.id)+'"><i>'+(CI[x.c]||"💶")+'</i><span class="xd"><b>'+esc(x.d||catName(x.c))+'</b>'+(N>1?'<small>Ha pagato '+esc(nm[p])+' · '+esc(who2)+'</small>':'<small>'+esc(catName(x.c))+'</small>')+'</span><span class="xa">'+eur(x.a)+(x.o?'<small>'+esc(Number(x.o.v).toLocaleString("it-IT"))+' '+esc(x.o.s||x.o.c)+'</small>':'')+'</span></button>'}
else{var q=r.q;h+='<button type="button" class="xr xq" data-q="'+esc(q.id)+'"><i>🤝</i><span class="xd"><b>'+esc(nm[Math.min(N-1,q.f)])+' ha dato '+eur(q.a)+' a '+esc(nm[Math.min(N-1,q.to)])+'</b><small>Rimborso</small></span><span class="xa">'+eur(q.a)+'</span></button>'}});
$("#slist").innerHTML=h||'<p class="sxe">Ancora nessuna spesa: tocca «Aggiungi spesa» appena paghi qualcosa.</p>';
$$("#slist .xr[data-id]").forEach(function(b){b.addEventListener("click",function(){openExp(b.dataset.id)})});
$$("#slist .xr[data-q]").forEach(function(b){b.addEventListener("click",function(){var q=SP.q.filter(function(z){return z.id===b.dataset.q})[0];if(!q)return;ask("Eliminare il rimborso?",nm[Math.min(N-1,q.f)]+" ha dato "+eur(q.a)+" a "+nm[Math.min(N-1,q.to)]+". Il saldo tornerà com'era prima.",[{t:"Elimina il rimborso",fn:function(){SP.q=SP.q.filter(function(z){return z.id!==q.id});saveSP();renderSpeseBody()}}])})});
/* saldi e rimborsi (solo con più persone) */
var bal=$("#sbal"),sp=$("#split");$("#sshare").hidden=!X.length&&!SP.q.length;
if(N<2||(!X.length&&!SP.q.length)){bal.innerHTML="";sp.innerHTML="";return}
bal.innerHTML='<div class="sbh">Saldi</div>'+nm.map(function(n,i){var b=L.net[i],cl=b>0?"pos":b<0?"neg":"";return '<div class="sbr"><span class="sbn">'+esc(n)+'<small>anticipato '+ec(L.paid[i])+' · quota '+ec(L.owe[i])+'</small></span><b class="sbv '+cl+'">'+(b>0?"+":b<0?"−":"")+ec(Math.abs(b))+'</b></div>'}).join("");
var st=settle(L.net);
sp.innerHTML=st.length?'<div class="sbh">Per saldare</div>'+st.map(function(s,k){return '<div class="stl"><span>'+esc(nm[s.f])+' deve <b>'+ec(s.a)+'</b> a '+esc(nm[s.t])+'</span><button type="button" class="payb" data-k="'+k+'">Pagato</button></div>'}).join(""):'<div class="stl ok">Siete pari 🤝</div>';
$$("#split .payb").forEach(function(b){b.addEventListener("click",function(){var s=st[+b.dataset.k];SP.q.push({id:uid(),f:s.f,to:s.t,a:s.a/100,t:Date.now()});saveSP();renderSpeseBody();toast("Rimborso segnato")})})}
function shareSpese(){var N=CFG.ppl,L=ledger(N),nm=names(),X=SP.x||[],o=["Spese del viaggio a "+PD.n+" ("+rangeTxt()+")","Totale: "+ec(L.total)+(N>1?" in "+N:""),""];
if(N>1){o.push("Saldi:");nm.forEach(function(n,i){o.push("• "+n+": "+(L.net[i]>0?"deve ricevere ":L.net[i]<0?"deve dare ":"pari ")+ec(Math.abs(L.net[i])))});var st=settle(L.net);if(st.length){o.push("","Per saldare:");st.forEach(function(s){o.push("• "+nm[s.f]+" dà "+ec(s.a)+" a "+nm[s.t])})}o.push("")}
o.push("Spese:");X.slice().sort(function(a,b){return (a.t||0)-(b.t||0)}).forEach(function(x){o.push("• "+dayTxt(x.t||0)+" · "+(x.d||catName(x.c))+": "+eur(x.a)+(N>1?" (pagato da "+nm[Math.min(N-1,x.p||0)]+")":""))});
o.push("","Fatto con Viaticum");var txt=o.join("\n");
if(navigator.share){navigator.share({text:txt}).catch(function(){})}else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){toast("Riepilogo copiato")},function(){toast("Non sono riuscito a copiare")})}else toast("Condivisione non disponibile")}
/* scheda per aggiungere o modificare una spesa */
var EXP=$("#exp");
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
function renderConsigli(){var c=CFG,A=TRIP.A,N=c.ppl,acts=allActs(),has=function(id){return acts.indexOf(id)>=0},M=TRIP.multi,okIf=function(x){return !x||(typeof x==="function"?x(E):x.some(has))};
var items=[["doc",PD.T.doc||"Carta d'identità o passaporto"],["bp","Carte d'imbarco di andata e ritorno"]].concat((PD.CHECK||[]).filter(function(x){return okIf(x[2])}).map(function(x){return[x[0],typeof x[1]==="function"?x[1](E):x[1]]}));
if(M)items=items.concat([["st","Conferma e indirizzo dell'alloggio salvati sul telefono"],["ch","Caricabatterie"],["pl",PD.T.plug||"Adattatore, se hai caricatori con la spina italiana a tre poli in linea"]]);
items=items.concat([["bor",PD.T.bottle],["pb","Power bank e cavo"],["sc2","Scarpe comode: si cammina tanto"],["fe",window.PARRAIN?"Ombrello o k-way":"Giacca leggera per la sera"],["off","Scaricare la mappa offline (impostazioni) e aprire l'app con internet prima di partire"]]);
window.PARCKN=function(){var n=0;items.forEach(function(x){if(CK[x[0]])n++});return{done:n,total:items.length}};
var ckb=$("#ckbox"),CF=ls("via-ckfold")!=="0";ckb.classList.toggle("fold",CF);
ckb.innerHTML='<h3 role="button" tabindex="0" id="ckh" aria-controls="ckw" aria-expanded="'+(!CF)+'"><span class="ckt">✅ Prima di partire</span> <small id="ckn"></small><span class="ckch" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span></h3><div class="ckbar"><i id="ckbar"></i></div><div class="ckw" id="ckw"><ul>'+items.map(function(x){return '<li><label><input class="ckin" type="checkbox" data-k="'+x[0]+'"'+(CK[x[0]]?" checked":"")+'><span class="bx" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 12.5l3.6 3.6L17.5 8.5"/></svg></span><span class="tx">'+esc(x[1])+'</span></label></li>'}).join("")+'</ul></div>';
var ckh=$("#ckh");function ckTog(){var f=ckb.classList.toggle("fold");ckh.setAttribute("aria-expanded",String(!f));ls("via-ckfold",f?"1":"0")}
ckh.addEventListener("click",ckTog);ckh.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();ckTog()}});
var cks=$$("#ckbox input");function cnt(){var n=cks.filter(function(x){return x.checked}).length;$("#ckn").textContent=n+"/"+cks.length+(n===cks.length?" 🎉":"");$("#ckbar").style.width=(n/cks.length*100)+"%"}
cks.forEach(function(x){x.addEventListener("change",function(){CK[x.dataset.k]=x.checked;ls("via-check",JSON.stringify(CK));cnt()})});cnt();
var fr=PD.PHR?PD.PHR(N,M):[];
var h=M?home():null,tx=M?(PD.TAX.filter(function(t){return t[0]===h.type})[0]||PD.TAX[0]):null;
var avv=avvList(),Z=[["✈️ Aeroporto e trasporti",[A.arr,A.tk].concat(A.tips||[]).concat(PD.AIRTIPS||[]),1],
M?["🏨 Alloggio e bagagli",[(h.addr?"Il tuo alloggio: "+h.addr+(h.alt?"":" (zona "+h.zn+")"):"Il tuo alloggio è in zona "+h.zn)+". Check-in dalle "+h.cin+", check-out entro le "+h.cout+".","Il primo giorno l'itinerario passa dall'alloggio per lasciare i bagagli; l'ultimo giorno ripassa a prenderli prima dell'aeroporto. Chiedi alla struttura di tenerli: quasi tutte lo fanno gratis.","Se la struttura non tiene i bagagli, ci sono depositi a pagamento come Nannybag o Bounce, prenotabili online.",PD.taxTxt(tx)].concat(PD.STAYTIPS||[])]:null]
.concat((PD.ZONES||[]).filter(function(z){return okIf(z[2])}).map(function(z){return[z[0],z[1]]}))
.concat([PD.WTIPS?["💧 Acqua e fontanelle",PD.WTIPS]:null,fr.length?["🗣️ Frasario",null,2]:null,["📞 Numeri utili",null,3],["🚨 Scioperi e avvisi",null,4],["📋 In generale",PD.GEN]]).filter(Boolean);
$("#zones").innerHTML=Z.map(function(z){var body;
if(z[2]===2)body='<p class="fh">'+(PD.PHN?esc(PD.PHN):'Tocca una frase per sentirla in '+PD.LANGN+'. Sotto c\'è la pronuncia all\'italiana.')+'</p><ul class="fras">'+fr.map(function(f){return '<li><span class="it">'+esc(f[0])+'</span>'+(PD.NOSAY?'<span class="say mute">'+esc(f[1])+'<small>'+esc(f[2])+'</small></span>':'<button type="button" class="say" data-t="'+esc(f[1])+'">🔊 '+esc(f[1])+'<small>'+esc(f[2])+'</small></button>')+'</li>'}).join("")+'</ul>';
else if(z[2]===3)body='<ul>'+PD.NUMS+'</ul>';
else if(z[2]===4)body='<ul>'+(avv.length?avv.map(function(a){return "<li><b>⚠️ "+esc(a.t)+".</b> "+esc(a.x)+"</li>"}).join(""):"<li>Per "+(TRIP.n===1?esc(dateLong(c.date)):"i giorni del viaggio")+" non risultano scioperi o lavori che riguardano il tuo percorso (verifica del "+esc(PD.VER)+").</li>")+'<li>'+PD.STRK+' Il calendario degli scioperi in Italia è su <a href="https://scioperi.mit.gov.it/" target="_blank" rel="noopener">scioperi.mit.gov.it</a>.</li></ul>';
else body='<ul>'+z[1].map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul>';
return '<details'+((z[1]&&z[2]===1)||(z[2]===4&&avv.length)?" open":"")+'><summary>'+z[0]+(z[2]===4&&avv.length?' <span class="st ko">'+avv.length+'</span>':'')+'</summary>'+body+'</details>'}).join("");
/* pronuncia: funziona anche con l'interruttore silenzioso dell'iPhone (sessione audio «playback» + traccia muta in loop) */
var QA=null;function quietAudio(){try{if(navigator.audioSession)navigator.audioSession.type="playback"}catch(e){}
try{if(!QA){var n=4000,b=new Uint8Array(44+n),v=new DataView(b.buffer),w=function(o,t){for(var i=0;i<t.length;i++)b[o+i]=t.charCodeAt(i)};w(0,"RIFF");v.setUint32(4,36+n,true);w(8,"WAVEfmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,"data");v.setUint32(40,n,true);for(var i=0;i<n;i++)b[44+i]=128;
QA=new Audio(URL.createObjectURL(new Blob([b],{type:"audio/wav"})));QA.loop=true;QA.setAttribute("playsinline","");QA.volume=.01}
var pr=QA.play();if(pr&&pr.catch)pr.catch(function(){})}catch(e){}}
function quietOff(){try{if(QA)QA.pause()}catch(e){}}
$$(".say").forEach(function(b){b.addEventListener("click",function(){if(!b.dataset.t)return;try{quietAudio();var u=new SpeechSynthesisUtterance(b.dataset.t);u.lang=PD.LANG;u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u);b.classList.add("on");var fin=function(){b.classList.remove("on");setTimeout(quietOff,250)};u.onend=fin;u.onerror=fin;setTimeout(function(){b.classList.remove("on")},3000);setTimeout(quietOff,15000)}catch(e){quietOff()}})});
$("#foot").textContent="Itinerario per "+(N===1?"una persona":N+" persone")+", "+rangeTxt()+" "+dateObj(c.date).getUTCFullYear()+". Dati verificati il "+PD.VER+"."}

function renderAll(){if(!CFG)return;TRIP=buildTrip(CFG);var ti=todayIdx();SEL=ti>=0?ti:Math.min(SEL,TRIP.n-1);if(SEL<0)SEL=0;P=TRIP.days[SEL];WD=P.wd;lastNow=-2;
renderHero();renderDays();renderBar();renderStay();renderShort();renderItin();renderAvv();PREADY=false;meteo();PREADY=true;renderVoli();renderPasti();renderCosti(false);renderSpese();renderConsigli();liveTick();PAR.emit()}
PAR.render=renderAll;
setInterval(liveTick,30000);document.addEventListener("visibilitychange",function(){if(!document.hidden)liveTick()});window.addEventListener("pageshow",function(e){if(e.persisted)liveTick()});
document.getElementById("t-costi").addEventListener("change",function(){if(this.checked&&CFG)renderCosti(true)});

/* ===== schermata «Il tuo viaggio» ===== */
var setup=$("#setup"),form=$("#sform"),serr=$("#serr"),stayF=$("#stayf");
$("#aplist").innerHTML=PD.FROM.map(function(f){return '<option value="'+esc(f[1]+" ("+f[0]+")")+'">'}).join("");
form.sz.innerHTML=PD.HZ.map(function(z){return '<option value="'+z[0]+'">'+esc(z[1])+'</option>'}).join("");
form.stype.innerHTML=PD.TAX.map(function(t){return '<option value="'+t[0]+'">'+esc(t[1])+'</option>'}).join("");
var APK=Object.keys(PD.PAR);$("#apts").innerHTML=APK.map(function(k,i){var A=PD.PAR[k];return '<label class="apt"><input type="radio" name="to" value="'+k+'"'+(i?'':' checked')+'><b>'+k+'</b><span>'+esc(A.sd)+'</span></label>'}).join("");
$("#sfuso").textContent="Orari in ora locale ("+PD.T.fuso+"). I dati restano solo su questo telefono.";
function dnote(){var a=form.date.value,b=form.date_r.value,n=1;if(a&&b&&b>a)n=Math.round((dateObj(b)-dateObj(a))/864e5)+1;
$("#dnote").textContent=!a?"Scegli le date: per una gita in giornata lascia il ritorno uguale all'andata.":n===1?"Gita in giornata, senza hotel.":n+" giorni e "+(n-1)+(n===2?" notte: aggiungi l'hotel qui sotto.":" notti: aggiungi l'hotel qui sotto.");
var multi=n>1,si=$("#stayin");if(si.hidden===multi){si.hidden=!multi;$("#stayno").hidden=multi;if(multi){si.classList.remove("pop");void si.offsetWidth;si.classList.add("pop")}}
$("#rlab").textContent=multi?"Ritorno":"Ritorno (stesso giorno)"}
form.date.addEventListener("change",function(){form.date_r.min=form.date.value;if(!form.date_r.value||form.date_r.value<form.date.value)form.date_r.value=form.date.value;dnote()});
form.date_r.addEventListener("change",dnote);$$('input[type=date],input[type=time]',form).forEach(function(i){i.addEventListener("click",function(){try{if(i.showPicker)i.showPicker()}catch(e){}})});form.date.addEventListener("input",dnote);form.date_r.addEventListener("input",dnote);
function openSetup(first){var c=CFG||{},s=c.stay||{};form.date.value=c.date||"";form.date.min=paris().d;form.date_r.value=c.date_r||c.date||"";form.date_r.min=c.date||paris().d;$("#ppl").textContent=c.ppl||2;form.from.value=c.from||"";
$$('input[name=to]',form).forEach(function(r){r.checked=r.value===(c.to&&PD.PAR[c.to]?c.to:APK[0])});["a_num","a_dep","a_arr","r_num","r_imb","r_dep"].forEach(function(k){form[k].value=c[k]||""});
form.sz.value=s.zone||PD.HZ[0][0];form.saddr.value=s.addr||"";form.sin.value=s.cin||"15:00";form.sout.value=s.cout||"11:00";form.sprice.value=s.price||"";form.stype.value=s.type||PD.TAXDEF||PD.TAX[0][0];
$$("input,select",form).forEach(function(x){x.classList.remove("bad")});serr.textContent="";$("#scancel").hidden=!CFG;$("#stayin").hidden=true;$("#stayno").hidden=false;setHead();dnote();
closeSheet();setup.classList.add("on");setup.setAttribute("aria-hidden","false");setup.scrollTop=0;setTimeout(function(){document.documentElement.classList.remove("hold")},600)}
function closeSetup(){setup.classList.remove("on");setup.setAttribute("aria-hidden","true")}
/* ===== destinazioni ===== */
var DEST=(window.CITY_ORDER||Object.keys(CITIES)).map(function(id){var C=CITIES[id];return{id:id,n:C.n,c:C.cn,e:C.e,ok:1,col:C.col,k:C.k,r:(window.REG||{})[id]||"eu"}}).concat(window.SOON||[]);
var SETDEST=PD.id;
function dOf(id){return DEST.filter(function(d){return d.id===id})[0]||DEST[0]}
function setCity(id){var r=document.documentElement,cur=r.getAttribute("data-city")||"";if((id||"")===cur)return;if(id)r.setAttribute("data-city",id);else r.removeAttribute("data-city");
r.classList.remove("recolor");void r.offsetWidth;r.classList.add("recolor");clearTimeout(setCity._t);setCity._t=setTimeout(function(){r.classList.remove("recolor")},950);try{window.dispatchEvent(new Event("citycolor"))}catch(e){}}
function setHead(){$("#sem").textContent=PD.e;$("#sdest").textContent=PD.n;$("#sdsub").textContent=PD.cn+" · guida completa";$("#alab").textContent="Atterraggio a "+PD.n}
var TK=["via-spese","via-check","via-copt","via-water","via-vlive","via-vlive-n"];
function trips(){var a=lj("via-trips",[]);return Array.isArray(a)?a.filter(function(t){return t&&t.cfg&&t.cfg.date&&CITIES[t.cfg.dest]}):[]}
function putTrips(a){ls("via-trips",a.length?JSON.stringify(a.slice(0,12)):null)}
function newTid(){return Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36)}
function parkCur(){var s=lj("via-trip",null);if(s&&s.date&&CITIES[s.dest]){if(!s.tid)s.tid=newTid();var st={};TK.forEach(function(k){var v=ls(k);if(v!=null)st[k]=v});var a=trips().filter(function(t){return t.cfg.tid!==s.tid});a.unshift({cfg:s,st:st});putTrips(a)}ls("via-trip",null);TK.forEach(function(k){ls(k,null)})}
function switchTrip(i){var a=trips(),t=a[i];if(!t)return;a.splice(i,1);putTrips(a);parkCur();ls("via-trip",JSON.stringify(t.cfg));Object.keys(t.st||{}).forEach(function(k){if(TK.indexOf(k)>=0)ls(k,t.st[k])});goCity(t.cfg.dest)}
function dropCur(){ls("via-trip",null);TK.forEach(function(k){ls(k,null)});CFG=null;SAVED=null;TRIP=null;SP={};CK={};COPT={}}
function goCity(id,open){ss("via-pick",id);if(open)ss("via-open",open);location.reload()}
function rangeOf(c){var a=dateObj(c.date),b=dateObj(c.date_r||c.date);if((c.date_r||c.date)===c.date)return dateShort(c.date);return a.getUTCMonth()===b.getUTCMonth()?a.getUTCDate()+"–"+b.getUTCDate()+" "+MESI[b.getUTCMonth()]:dateShort(c.date)+" – "+dateShort(c.date_r)}
var destEl=$("#dest"),dgrid=$("#dgrid"),dfind=$("#dfind");
function sw(d){return '--a:'+d.col[0]+';--b:'+d.col[1]+';--c:'+d.col[2]}
var DREG="",DEXP=false,DLIM=12;
(function(){var el=$("#dreg");if(!el)return;var R=window.REGN||{};el.innerHTML='<button type="button" class="on" data-r="">Tutte</button>'+Object.keys(R).map(function(k){return '<button type="button" data-r="'+k+'">'+R[k]+'</button>'}).join("");
el.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;DREG=b.dataset.r;DEXP=false;$$("button",el).forEach(function(x){x.classList.toggle("on",x===b)});renderDest()})})();
function renderDest(){var q=(dfind.value||"").trim().toLowerCase(),list=DEST.filter(function(d){return(!DREG||d.r===DREG)&&(!q||d.k.indexOf(q)>=0||d.n.toLowerCase().indexOf(q)>=0)});
var lim=(!q&&!DEXP)?DLIM:1e9,more=$("#dmore");more.hidden=!!q||list.length<=DLIM;more.textContent=DEXP?"Mostra meno ▴":"Mostra tutte le città ("+(list.length-DLIM)+" altre) ▾";more.setAttribute("aria-expanded",DEXP?"true":"false");
dgrid.innerHTML=list.slice(0,lim).map(function(d){return '<button type="button" class="dcity'+(d.ok?" ok":"")+'" data-city="'+d.id+'" style="'+sw(d)+'"><i class="dsw"></i><span class="dem">'+d.e+'</span><b>'+esc(d.n)+'</b><small>'+esc(d.c)+'</small><em>'+(d.ok?"Guida completa":"In arrivo")+'</em></button>'}).join("");
var none=$("#dnone");none.hidden=list.length>0;if(!list.length)none.textContent=q?"Nessuna città per «"+dfind.value.trim()+"», per ora. Ne aggiungiamo di nuove di continuo.":"Nessuna città in questa area, per ora.";
var mine=$("#dmine"),all=[],hasCur=SAVED&&SAVED.date&&CITIES[SAVED.dest];if(hasCur)all.push({cur:1,cfg:SAVED});trips().forEach(function(t,k){all.push({i:k,cfg:t.cfg})});
if(all.length){mine.hidden=false;mine.innerHTML='<div class="dmhr"><div class="dmh">'+(all.length>1?"I miei viaggi":"Il tuo viaggio")+'</div><button type="button" class="dnew" id="dnew">＋ Nuovo viaggio</button></div>'+all.map(function(t,k){var d=dOf(t.cfg.dest);return '<div class="dtw"><button type="button" class="dtrip" data-k="'+k+'" style="'+sw(d)+'"><span>'+d.e+'</span><div><small>'+(t.cur?"In corso":"Salvato")+'</small><b>'+esc(d.n)+' · '+esc(rangeOf(t.cfg))+'</b></div><i>›</i></button><button type="button" class="dtx" data-k="'+k+'" aria-label="Elimina il viaggio a '+esc(d.n)+'">✕</button></div>'}).join("");
$$(".dtrip",mine).forEach(function(b){b.addEventListener("click",function(){var t=all[+b.dataset.k];if(!t)return;if(t.cur){if(!SAVED||!SAVED.dest){closeDest();return}if(SAVED.dest===PD.id&&CFG){closeDest();setCity(PD.id)}else goCity(SAVED.dest)}else switchTrip(t.i)})});
$("#dnew",mine).addEventListener("click",function(){var g=$("#dreg")||dgrid;g.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(function(){dfind.focus()},450)});
$$(".dtx",mine).forEach(function(b){b.addEventListener("click",function(){var t=all[+b.dataset.k],d=dOf(t.cfg.dest);if(!confirm("Eliminare il viaggio a "+d.n+" ("+rangeOf(t.cfg)+")? Spese e lista di questo viaggio andranno perse."))return;if(t.cur)dropCur();else{var a=trips();a.splice(t.i,1);putTrips(a)}renderDest()})})}else{mine.hidden=true;mine.innerHTML=""}}
function openDest(){DEXP=false;closeSetup();closeSheet();setCity(null);dfind.value="";renderDest();destEl.classList.add("on");destEl.setAttribute("aria-hidden","false");destEl.scrollTop=0;setTimeout(function(){document.documentElement.classList.remove("hold")},600)}
function closeDest(){destEl.classList.remove("on");destEl.setAttribute("aria-hidden","true")}
PAR.openDest=openDest;
dfind.addEventListener("input",renderDest);
$("#dmore").addEventListener("click",function(){DEXP=!DEXP;renderDest();if(!DEXP){var g=$("#dreg")||dgrid;g.scrollIntoView({behavior:"smooth",block:"start"})}});
/* zoom sulla card scelta: la card si espande a schermo intero con i colori della città */
var zbusy=false;
var askEl=$("#ask");function closeAsk(){askEl.classList.remove("on");askEl.setAttribute("aria-hidden","true")}
function ask(tt,tx,btns){$("#asktt").textContent=tt;$("#asktx").textContent=tx;var box=$("#askb");box.innerHTML="";btns.concat([{t:"Annulla",g:1}]).forEach(function(b){var x=document.createElement("button");x.type="button";x.className="btn"+(b.g?" ghost":"");x.textContent=b.t;x.addEventListener("click",function(){closeAsk();if(b.fn)setTimeout(b.fn,120)});box.appendChild(x)});askEl.classList.add("on");askEl.setAttribute("aria-hidden","false")}
askEl.addEventListener("click",function(e){if(e.target===askEl)closeAsk()});
function sameCity(id){var r=[];if(SAVED&&SAVED.date&&SAVED.dest===id)r.push({cur:1});trips().forEach(function(t,i){if(t.cfg.dest===id)r.push({i:i})});return r}
function startNew(d,b){parkCur();SP={};CK={};COPT={};CFG=null;SAVED=null;TRIP=null;if(d.id!==PD.id){goCity(d.id,"setup");return}zoomGo(b,d,function(){setCity(d.id);closeDest();openSetup(true)})}
function zoomGo(btn,d,fn){
if(zbusy)return;
if(!btn.animate||(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)){fn();return}
zbusy=true;
var r=btn.getBoundingClientRect(),cl=document.createElement("div");
cl.className="dcity ok zcl";cl.setAttribute("aria-hidden","true");
cl.style.cssText="--a:"+d.col[0]+";--b:"+d.col[1]+";--c:"+d.col[2]+";left:"+r.left+"px;top:"+r.top+"px;width:"+r.width+"px;height:"+r.height+"px";
cl.innerHTML=btn.innerHTML+'<i class="zwash"></i><div class="zc"><span class="zem">'+d.e+'</span><b class="zn">'+esc(d.n)+'</b></div>';
document.body.appendChild(cl);btn.style.visibility="hidden";
var E="cubic-bezier(.7,0,.2,1)",geo=cl.animate([{left:r.left+"px",top:r.top+"px",width:r.width+"px",height:r.height+"px",borderRadius:"22px"},{left:"0px",top:"0px",width:"100%",height:"100%",borderRadius:"0px"}],{duration:540,easing:E,fill:"forwards"});
[].forEach.call(cl.children,function(c){
 if(c.classList.contains("zwash"))c.animate([{opacity:0},{opacity:1}],{duration:380,delay:60,easing:"ease-out",fill:"forwards"});
 else if(c.classList.contains("zc"))c.animate([{opacity:0,transform:"scale(.6)"},{opacity:1,transform:"none"}],{duration:320,delay:230,easing:"cubic-bezier(.2,1.3,.4,1)",fill:"forwards"});
 else c.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards"})});
destEl.animate([{opacity:1},{opacity:0}],{duration:420,easing:"ease-in",fill:"forwards"});
var fin=function(){
 try{ss("via-zoom",JSON.stringify({a:d.col[0],b:d.col[1],c:d.col[2],e:d.e,n:d.n}))}catch(x){}
 fn();
 setTimeout(function(){destEl.getAnimations().forEach(function(a){a.cancel()});btn.style.visibility="";zbusy=false;
  cl.animate([{opacity:1},{opacity:0}],{duration:420,easing:"ease-out",fill:"forwards"}).onfinish=function(){cl.remove()}},60)};
geo.onfinish=fin;geo.oncancel=function(){cl.remove();zbusy=false}}
dgrid.addEventListener("click",function(e){var b=e.target.closest(".dcity");if(!b)return;var d=dOf(b.dataset.city);
if(!d.ok){b.animate&&b.animate([{transform:"translateX(0)"},{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"none"}],{duration:300,easing:"ease-out"});toast("La guida di "+d.n+" arriva presto ✨");return}
var ex=sameCity(d.id);if(ex.length){var e0=ex[0];ask("Hai già un viaggio a "+d.n,"Vuoi aprire quello che hai già o organizzarne uno nuovo?",[{t:"＋ Nuovo viaggio a "+d.n,fn:function(){startNew(d,b)}},{t:"Apri il viaggio esistente",fn:function(){if(e0.cur){if(d.id!==PD.id)goCity(d.id);else{closeDest();setCity(PD.id)}}else switchTrip(e0.i)}}]);return}
zoomGo(b,d,function(){if(d.id!==PD.id){goCity(d.id,"setup");return}setCity(d.id);closeDest();openSetup(!CFG)})});
$("#sback").addEventListener("click",function(){openDest()});
$("#shdest").addEventListener("click",function(){openDest()});
$("#ahome").addEventListener("click",function(){openDest()});
PAR.openSetup=openSetup;
$$("[data-st]",form).forEach(function(b){b.addEventListener("click",function(){var o=$("#ppl"),v=Math.max(1,Math.min(10,(+o.textContent||2)+ +b.dataset.st));o.textContent=v})});
$("#scancel").addEventListener("click",function(){closeSetup();if(CFG)setCity(PD.id)});
/* campi obbligatori: asterisco sempre visibile e riquadro evidenziato finché sono vuoti */
function paintReq(){var multi=!!form.date_r.value&&form.date_r.value>form.date.value,adr=multi&&form.sz.value==="altro";
[["date",1],["a_arr",1],["r_dep",1],["saddr",adr]].forEach(function(r){var el=form[r[0]];if(!el)return;var lab=el.closest("label"),need=!!r[1]&&!el.value.trim();lab.classList.toggle("req",!!r[1]);lab.classList.toggle("need",need);if(!need)el.classList.remove("bad")});
var sl=form.saddr.closest("label").firstElementChild;sl.textContent=adr?"Indirizzo dell'alloggio":"Indirizzo (facoltativo)";
var left=[["date","la data di andata"],["a_arr","l'atterraggio"],["r_dep","la partenza del ritorno"]].filter(function(r){return !form[r[0]].value}).length+(adr&&!form.saddr.value.trim()?1:0);
var rn=$("#reqn");if(rn)rn.classList.toggle("done",!left)}
form.addEventListener("input",paintReq);form.addEventListener("change",paintReq);
var _os=openSetup;openSetup=function(){_os.apply(this,arguments);paintReq()};PAR.openSetup=openSetup;
form.addEventListener("submit",function(e){e.preventDefault();var bad=[],msg="";
function req(k,t){if(!form[k].value){bad.push(k);msg=msg||t}}
req("date","Scegli la data di andata.");req("a_arr","Inserisci l'orario di atterraggio a "+PD.n+".");req("r_dep","Inserisci l'orario di partenza del volo di ritorno.");
var d0=form.date.value,d1=form.date_r.value||d0,multi=d1>d0,n=multi?Math.round((dateObj(d1)-dateObj(d0))/864e5)+1:1;
var la=toMin(form.a_arr.value),rd=toMin(form.r_dep.value),ri=toMin(form.r_imb.value),ad=toMin(form.a_dep.value);
if(!msg&&d1<d0){bad.push("date_r");msg="Il ritorno non può essere prima dell'andata."}
if(!msg&&n>MAXD){bad.push("date_r");msg="L'app pianifica viaggi fino a "+MAXD+" giorni."}
if(!msg&&!multi&&rd<=la){bad.push("r_dep");msg="Il volo di ritorno deve partire dopo l'atterraggio (gita in giornata)."}
if(!msg&&ri!=null&&ri>=rd){bad.push("r_imb");msg="L'apertura dell'imbarco deve essere prima della partenza."}
if(!msg&&ad!=null&&ad>=la){bad.push("a_dep");msg="La partenza dell'andata deve essere prima dell'atterraggio."}
if(!msg&&multi&&form.sz.value==="altro"&&!form.saddr.value.trim()){bad.push("saddr");msg="Scrivi l'indirizzo dell'alloggio, oppure scegli una zona."}
$$("input,select",form).forEach(function(x){x.classList.toggle("bad",bad.indexOf(x.name)>=0)});
if(msg){serr.textContent=msg;paintReq();var f=form[bad[0]];if(f)try{f.scrollIntoView({block:"center",behavior:"smooth"});f.focus({preventScroll:true})}catch(x){}return}
var to=($('input[name=to]:checked',form)||{}).value||APK[0],old=(CFG&&CFG.stay)||{};
var c={dest:PD.id,date:d0,date_r:d1,ppl:+$("#ppl").textContent||2,from:form.from.value.trim(),fromCode:fromCode(form.from.value),to:to,a_num:form.a_num.value.replace(/\s+/g,"").toUpperCase(),a_dep:form.a_dep.value,a_arr:form.a_arr.value,r_num:form.r_num.value.replace(/\s+/g,"").toUpperCase(),r_imb:form.r_imb.value,r_dep:form.r_dep.value};
if(multi){var addr=form.saddr.value.trim();c.stay={zone:form.sz.value,addr:addr,cin:form.sin.value||"15:00",cout:form.sout.value||"11:00",price:parseFloat(String(form.sprice.value).replace(",","."))||0,type:form.stype.value};
if(addr&&addr===old.addr&&old.geo){c.stay.pos=old.pos;c.stay.geo=1}}
var first=!CFG;if(SAVED&&SAVED.dest!==PD.id){parkCur();SP={};CK={};COPT={}}c.tid=(CFG&&CFG.tid)||newTid();CFG=c;SAVED=c;ls("via-trip",JSON.stringify(c));closeSetup();SEL=0;renderAll();window.dispatchEvent(new Event("voli"));
var t0=$("#t-itinerario");if(!t0.checked){t0.checked=true;t0.dispatchEvent(new Event("change",{bubbles:true}))}
var blk=$("#itinerario");try{blk.scrollTo({top:0,behavior:"smooth"})}catch(x){blk.scrollTop=0}
toast(first?"Itinerario pronto ✨":"Viaggio aggiornato ✓");
if(multi&&c.stay.addr&&!c.stay.geo)geocode()});
/* posizione dell'alloggio dall'indirizzo (OpenStreetMap Nominatim) */
function geocode(){var s=CFG&&CFG.stay;if(!s||!s.addr||!window.fetch)return;var q=s.addr+(PD.ARE.test(s.addr)?"":", "+PD.QN);
fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes="+PD.CC+"&accept-language="+PD.CC+"&q="+encodeURIComponent(q)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){var x=j&&j[0];if(!x)throw 0;var p=[+(+x.lat).toFixed(5),+(+x.lon).toFixed(5)];if(hav(p,PD.LL)>45)throw 0;
if(!CFG||!CFG.stay||CFG.stay.addr!==s.addr)return;CFG.stay.pos=p;CFG.stay.geo=1;ls("via-trip",JSON.stringify(CFG));renderAll();toast("Alloggio trovato sulla mappa 📍")}).catch(function(){})}

/* impostazioni */
var sheet=$("#sheet");
function closeSheet(){sheet.classList.remove("on");sheet.setAttribute("aria-hidden","true")}
$("#gear").addEventListener("click",function(){sheet.classList.remove("home");sheet.classList.add("on");sheet.setAttribute("aria-hidden","false")});
$("#dgear").addEventListener("click",function(){sheet.classList.add("home","on");sheet.setAttribute("aria-hidden","false")});
$("#shclose").addEventListener("click",closeSheet);
sheet.addEventListener("click",function(e){if(e.target===sheet)closeSheet()});
$$("[data-edit]").forEach(function(b){b.addEventListener("click",function(){openSetup(false)})});
["via-adb-key","par-adb-key","via-vlive","via-vlive-n"].forEach(function(k){try{localStorage.removeItem(k)}catch(e){}});
$("#shreset").addEventListener("click",function(){if(!confirm("Cancellare TUTTI i viaggi, spese, liste e la chiave salvati su questo telefono?"))return;
["via-trip","via-trips","via-spese","via-check","via-copt","via-adb-key","via-vlive","via-vlive-n","via-water","via-fp","via-notif","via-nfired","via-ckfold"].forEach(function(k){ls(k,null)});FP.d=[];FP.p=0;FP.k=[];if(PAR.fpPaint)PAR.fpPaint();CFG=null;SAVED=null;TRIP=null;SP={};CK={};COPT={};closeSheet();openDest()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeSheet();if(CFG){closeSetup();closeDest();setCity(PD.id)}}});

/* invio e importazione di un viaggio tramite link */
function tripLink(c){var k=["dest","date","date_r","ppl","from","fromCode","to","a_num","a_dep","a_arr","r_num","r_imb","r_dep"],o={};k.forEach(function(x){if(c[x]!=null&&c[x]!=="")o[x]=c[x]});if(c.stay){o.stay={};["zone","addr","cin","cout","price","type","pos","geo"].forEach(function(x){if(c.stay[x]!=null)o.stay[x]=c.stay[x]})}
return location.origin+location.pathname+"#t="+btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function readLink(){var m=/^#t=([\w-]+)/.exec(location.hash||"");if(!m)return null;try{var s=m[1].replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";var o=JSON.parse(decodeURIComponent(escape(atob(s))));
if(!o||!CITIES[o.dest]||!/^\d{4}-\d\d-\d\d$/.test(o.date||"")||!o.a_arr||!o.r_dep)return null;var c={},str=function(v){return String(v).slice(0,140)};["dest","date","date_r","from","fromCode","to","a_num","a_dep","a_arr","r_num","r_imb","r_dep"].forEach(function(x){if(o[x]!=null)c[x]=str(o[x])});c.ppl=Math.max(1,Math.min(10,+o.ppl||2));
if(o.stay&&typeof o.stay==="object"){c.stay={};["zone","addr","cin","cout","type"].forEach(function(x){if(o.stay[x]!=null)c.stay[x]=str(o.stay[x])});c.stay.price=+o.stay.price||0;if(Array.isArray(o.stay.pos)&&o.stay.pos.length===2&&isFinite(o.stay.pos[0])&&isFinite(o.stay.pos[1])){c.stay.pos=[+o.stay.pos[0],+o.stay.pos[1]];c.stay.geo=1}}return c}catch(e){return null}}
$("#shlink").addEventListener("click",function(){if(!CFG){toast("Imposta prima il tuo viaggio");return}var u=tripLink(CFG),d=dOf(CFG.dest);closeSheet();
if(navigator.share)navigator.share({title:"Viaggio a "+d.n+" con Viaticum",text:"Apri il mio viaggio a "+d.n+" ("+rangeOf(CFG)+") su Viaticum:",url:u}).catch(function(){});else{try{navigator.clipboard.writeText(u).then(function(){toast("Link copiato")},function(){prompt("Copia il link",u)})}catch(e){prompt("Copia il link",u)}}});
window.addEventListener("hashchange",function(){if(/^#t=/.test(location.hash))location.reload()});
(function(){var c=readLink();if(!location.hash||!/^#t=/.test(location.hash))return;try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}if(!c){setTimeout(function(){toast("Il link del viaggio non è valido")},1500);return}
var d=dOf(c.dest);setTimeout(function(){ask("Importare il viaggio a "+d.n+"?",rangeOf(c)+(SAVED&&SAVED.date?". Il viaggio che hai ora resta salvato nella tua lista.":"."),[{t:"Importa il viaggio",fn:function(){parkCur();c.tid=newTid();ls("via-trip",JSON.stringify(c));goCity(c.dest)}}])},document.documentElement.classList.contains("pick")?600:3000)})();
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
/* avvio */
if(CFG&&CFG.date&&CFG.a_arr&&CFG.r_dep){if(!CFG.date_r)CFG.date_r=CFG.date;setCity(PD.id);renderAll();document.documentElement.classList.remove("hold");if(TRIP.multi&&CFG.stay&&CFG.stay.addr&&!CFG.stay.geo)geocode();if(OPEN==="setup")openSetup(false)}
else{CFG=null;document.documentElement.classList.add("hold");if(PICK&&CITIES[PICK]){setCity(PD.id);openSetup(true)}else{setCity(null);setTimeout(openDest,matchMedia("(prefers-reduced-motion: reduce)").matches?0:2300)}}
})();
