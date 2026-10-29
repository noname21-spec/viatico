/* sfondo a mappa: un fiume con i riflessi del sole e della luna, che seguono l'ora della città.
   Solo decorazione: bassissimo contrasto, nessuno spostamento di layout, statico su Android lite e con "riduci movimento". */
(function(){
var LITE=!!window.LITE,RM=matchMedia("(prefers-reduced-motion: reduce)"),NS="http://www.w3.org/2000/svg";
function rng(s){return function(){s=(s*9301+49297)%233280;return s/233280}}
function f(n){return(+n).toFixed(1)}
function smooth(p){var n=p.length,m=function(a,b){return[(a[0]+b[0])/2,(a[1]+b[1])/2]},s=m(p[n-1],p[0]),d="M"+f(s[0])+" "+f(s[1]);for(var j=0;j<n;j++){var c=p[j],e=m(p[j],p[(j+1)%n]);d+="Q"+f(c[0])+" "+f(c[1])+" "+f(e[0])+" "+f(e[1])}return d+"Z"}
function blob(cx,cy,r,R){var pts=[],ph=[R()*6,R()*6,R()*6];for(var j=0;j<14;j++){var a=j/14*6.2832,rr=r*(1+.2*Math.sin(2*a+ph[0])+.14*Math.sin(3*a+ph[1])+.08*Math.sin(5*a+ph[2]));pts.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.86])}return smooth(pts)}
var RV="M110 -10C60 150 220 230 150 360S90 520 170 640";
/* punti del fiume, calcolati dalle due curve (niente misure sul DOM) */
function bez(p,t){var u=1-t;return[u*u*u*p[0][0]+3*u*u*t*p[1][0]+3*u*t*t*p[2][0]+t*t*t*p[3][0],u*u*u*p[0][1]+3*u*u*t*p[1][1]+3*u*t*t*p[2][1]+t*t*t*p[3][1]]}
var SEG=[[[110,-10],[60,150],[220,230],[150,360]],[[150,360],[80,490],[90,520],[170,640]]];
var GL=(function(){var R=rng(99),a=[],i;for(i=0;i<(LITE?0:64);i++){var q=bez(SEG[R()<.5?0:1],R());a.push({x:q[0]+(R()-.5)*44,y:q[1],w:2.4+R()*4.4,ph:R()*6})}return a})();
function markup(){var R=rng(5),s="",x,y;
 s+='<g transform="rotate(-9 150 310)">';
 for(y=-40;y<660;y+=26)for(x=-40;x<340;x+=34)if(R()<.78)s+='<rect class="mb-b" x="'+(x+2)+'" y="'+(y+2)+'" width="'+(30-(R()*6|0))+'" height="'+(22-(R()*4|0))+'" opacity="'+f(.45+R()*.55)+'"/>';
 s+="</g>";
 [[62,160,34],[240,470,40],[205,82,22],[60,560,26]].forEach(function(c){s+='<path class="mb-p" d="'+blob(c[0],c[1],c[2],R)+'"/>'});
 ["M-10 70C90 90 160 40 310 110","M-10 560C90 520 200 600 310 520","M40 -10C70 150 20 300 60 430S90 600 80 630","M240 -10C220 120 280 220 250 330S220 520 260 630","M-10 400C100 380 180 440 310 410","M-10 230L310 200"].forEach(function(d,k){s+='<path class="mb-r" d="'+d+'" stroke-width="'+(k<3?5.4:4)+'"/>'});
 s+='<path class="mb-w" d="'+RV+'" stroke-width="76"/><path class="mb-w2" d="'+RV+'" stroke-width="64"/>';
 s+='<g class="mb-g">';GL.forEach(function(g){s+='<ellipse cx="'+f(g.x)+'" cy="'+f(g.y)+'" rx="'+f(g.w)+'" ry=".9" opacity="0"/>'});s+="</g>";
 return'<div class="mapbg" aria-hidden="true"><svg viewBox="0 0 300 620" preserveAspectRatio="xMidYMid slice" focusable="false">'+s+'</svg><i class="mbt"></i></div>'}

function mixc(a,b,k){var A=[parseInt(a.substr(1,2),16),parseInt(a.substr(3,2),16),parseInt(a.substr(5,2),16)],B=[parseInt(b.substr(1,2),16),parseInt(b.substr(3,2),16),parseInt(b.substr(5,2),16)];return"rgb("+A.map(function(v,i){return Math.round(v+(B[i]-v)*k)}).join(",")+")"}
function rgbA(s){return s.match(/\d+/g).map(Number)}
function mixr(a,b,k){return"rgb("+a.map(function(v,i){return Math.round(v+(b[i]-v)*k)}).join(",")+")"}
/* "Il cielo sulla carta": cielo con sole, luna e stelle sopra la pianta a isolati della città */
function markupMain(){var R=rng(61),s="",x,y,hh,ww,k;
 s+='<defs><pattern id="mh" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4" class="sk-h"/></pattern>'
  +'<linearGradient id="msk" x1="0" y1="0" x2="0" y2="1"><stop class="sk-a" offset="0" stop-color="#3f8fdc"/><stop class="sk-b" offset=".3" stop-color="#bfe3f7"/><stop offset=".6" stop-color="#bfe3f7" stop-opacity="0"/></linearGradient>'
  +'<radialGradient id="msg"><stop offset="0" stop-color="#fff6c8"/><stop offset=".28" stop-color="#ffe9a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>'
  +'<radialGradient id="mcg"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>';
 s+='<rect width="300" height="620" class="sk-p"/><g transform="rotate(-14 150 310)">';
 for(y=-130;y<760;y+=hh+6){hh=20+(R()*20|0);for(x=-130;x<440;x+=ww+6){ww=26+(R()*34|0);var q=R();
  if(q<.07)s+='<rect x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" class="sk-g"/>';
  else s+='<rect x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" class="sk-b2"/>'+(q<.3?'<rect x="'+(x+2)+'" y="'+(y+2)+'" width="'+(ww-4)+'" height="'+(hh-4)+'" fill="url(#mh)" opacity=".55"/>':"")}}
 s+='</g><path d="M-20 545C100 485 200 605 330 520" class="sk-w" stroke-width="24"/><path d="M-20 545C100 485 200 605 330 520" class="sk-wl" transform="translate(0 -12)"/><path d="M-20 545C100 485 200 605 330 520" class="sk-wl" transform="translate(0 12)"/>';
 s+='<path d="M-100 110L420 480" class="sk-rl" stroke-width="12"/><path d="M-100 110L420 480" class="sk-r" stroke-width="10"/>';
 s+='<rect width="300" height="620" class="sk-nt"/><rect width="300" height="400" fill="url(#msk)"/>';
 for(k=0;k<(LITE?16:40);k++)s+='<circle cx="'+f(R()*300)+'" cy="'+f(R()*230)+'" r="'+f(.4+R()*.9)+'" fill="#fff" class="sk-st'+(LITE?"":" sk-tw")+'" style="animation-delay:'+f(R()*3)+'s"/>';
 if(!LITE)[[0,60,0],[1,120,-9],[2,36,-18]].forEach(function(c){s+='<g class="sk-c sk-c'+(c[0]+1)+'" style="animation-delay:'+c[2]+'s"><ellipse cx="0" cy="'+c[1]+'" rx="52" ry="12" fill="url(#mcg)"/><ellipse cx="34" cy="'+(c[1]-6)+'" rx="32" ry="11" fill="url(#mcg)"/></g>'});
 s+='<g class="sk-sun"><circle r="38" fill="url(#msg)"/><circle r="11" fill="#fff3b8"/></g><g class="sk-mo"><circle r="26" fill="#cfd9ff" opacity=".18"/><circle r="9.5" fill="#f3ebd8"/><circle cx="-2.6" cy="1.5" r="1.8" fill="#d6cdb6"/><circle cx="3" cy="-2.6" r="1.4" fill="#d6cdb6"/></g>';
 s+='<rect width="300" height="620" class="sk-dim"/>';
 return'<div class="mapbg mb-main mb-sky" aria-hidden="true"><svg viewBox="0 0 300 620" preserveAspectRatio="xMidYMid slice" focusable="false">'+s+'</svg><i class="mbt"></i></div>'}
var M=markup(),MM=null,inst=[],env=null,sx=150,o=0;
function mount(host,first){if(!host)return;var d=document.createElement("div");var main=host===document.body;if(main&&!MM)MM=markupMain();d.innerHTML=main?MM:M;var n=d.firstChild;if(host===document.body)n.classList.add("mb-main");var df=host.id==="dest"&&host.querySelector(".dfull");if(df)host.insertBefore(n,df.nextSibling);else host.insertBefore(n,host.firstChild);inst.push({n:n,host:host,es:[].slice.call(n.querySelectorAll(".mb-g ellipse")),gg:n.querySelector(".mb-g"),sky:main?{a:n.querySelector(".sk-a"),b:n.querySelector(".sk-b"),sun:n.querySelector(".sk-sun"),mo:n.querySelector(".sk-mo"),dim:n.querySelector(".sk-dim")}:null});if(env)paint(inst[inst.length-1])}
function ss(a,b,x){x=Math.max(0,Math.min(1,(x-a)/(b-a)));return x*x*(3-2*x)}
/* alba e tramonto (formula NOAA semplificata), in ore locali della città */
function sun(lat,lng,tz,now){try{var P={};new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now).forEach(function(p){P[p.type]=+p.value});
 var N=Math.floor((Date.UTC(P.year,P.month-1,P.day)-Date.UTC(P.year,0,0))/864e5),r=Math.PI/180,g=2*Math.PI/365*(N-1+.25),eq=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g)),de=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(2*g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g),c=Math.cos(90.833*r)/(Math.cos(lat*r)*Math.cos(de))-Math.tan(lat*r)*Math.tan(de);
 if(!(c>-1&&c<1))return null;var ha=Math.acos(c)/r,off=new Date(Date.UTC(P.year,P.month-1,P.day,12)).toLocaleString("en-US",{timeZone:tz,timeZoneName:"shortOffset"}),mm=/GMT([+-]\d+)(?::(\d+))?/.exec(off),hrs=mm?parseInt(mm[1],10)+(mm[2]?(mm[1][0]==="-"?-1:1)*mm[2]/60:0):0,noon=720-4*lng-eq;
 return[(noon-4*ha)/60+hrs,(noon+4*ha)/60+hrs]}catch(e){return null}}
function hourIn(tz,now){try{var h=0,m=0;new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:tz}).formatToParts(now).forEach(function(x){if(x.type==="hour")h=+x.value;if(x.type==="minute")m=+x.value});return h+m/60}catch(e){return now.getHours()+now.getMinutes()/60}}
function calc(){var now=new Date(),pd=window.PD,tz=pd&&pd.TZ||"Europe/Rome",ll=pd&&pd.LL||[45,10],t=hourIn(tz,now),w=sun(ll[0],ll[1],tz,now)||[7,18],sr=w[0],st=w[1],u=(t-sr)/(st-sr),day=u>=0&&u<=1,e,v=0;
 if(day)e=Math.sin(Math.PI*u);else{var nl=24-(st-sr),tt=t>=st?t-st:t+24-st;v=tt/nl;e=-Math.sin(Math.PI*v)}
 var L=ss(-.14,.2,e);return{t:t,u:u,v:v,e:e,L:L,N:1-L,W:Math.exp(-(e*e)/.045),day:day}}
function lightTheme(){try{var b=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(),m=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(b);if(!m)return true;var h=m[1].length===3?m[1].replace(/./g,"$&$&"):m[1];return(parseInt(h.substr(0,2),16)*.3+parseInt(h.substr(2,2),16)*.59+parseInt(h.substr(4,2),16)*.11)>128}catch(e){return true}}
function paintSky(I){var E=env,S=I.sky,st=I.n.style,lt=lightTheme(),u=Math.max(0,Math.min(1,E.u)),v=Math.max(0,Math.min(1,E.v));
 st.setProperty("--N",E.N.toFixed(3));st.setProperty("--L",E.L.toFixed(3));st.setProperty("--mw",(E.W*.5).toFixed(3));
 var top=rgbA(mixc("#050b22","#3f8fdc",E.L)),mid=rgbA(mixc("#1b2d66","#bfe3f7",E.L)),w=E.W*.85;
 var tc=top.map(function(v,i){return v+([110,92,168][i]-v)*w*.7});S.a.setAttribute("stop-color",mixr(top,[110,92,168],w*.7));var lum=(tc[0]*.3+tc[1]*.59+tc[2]*.11);S.b.setAttribute("stop-color",mixr(mid,[255,154,107],w));
 var sx=34+u*232,sy=262-Math.sin(Math.PI*u)*205;S.sun.setAttribute("transform","translate("+f(sx)+" "+f(sy)+")");S.sun.setAttribute("opacity",E.day?ss(-.05,.04,E.e).toFixed(2):0);
 var mx=34+v*232,my=262-Math.sin(Math.PI*v)*170;S.mo.setAttribute("transform","translate("+f(mx)+" "+f(my)+")");S.mo.setAttribute("opacity",E.day?0:ss(-.02,-.14,E.e).toFixed(2));
 st.setProperty("--dim",lt?"0":(.42*E.L+.12).toFixed(2));
 var nt=lt&&lum<135,cl=document.documentElement.classList;cl.toggle("skn",nt);cl.add("skm")}
function paint(I){if(I.sky)return paintSky(I);var E=env,x=34+Math.max(0,Math.min(1,E.day?E.u:E.v))*232,c=E.day?"#fff3b8":"#dfe8ff",a=E.day?ss(-.04,.12,E.e):ss(-.1,-.35,E.e)*.9;
 I.n.style.setProperty("--mw",(E.W*.07).toFixed(3));
 I.gg.setAttribute("fill",c);
 if(I.n.classList.contains("mb-main")){sx=x;o=a}
 if(LITE||RM.matches)draw(I,0)}
function draw(I,now){I.es.forEach(function(e,i){var g=GL[i],b=Math.max(0,1-Math.abs(g.x-sx)/80);e.setAttribute("opacity",(o*b*(.3+.7*Math.sin(now/260+g.ph))*.8).toFixed(2))})}
function live(I){return I.host===document.body?true:I.host.classList.contains("on")}
function update(){env=calc();inst.forEach(paint)}
var tm=0;
function loop(){tm=0;if(document.hidden||LITE||RM.matches)return;var now=performance.now();inst.forEach(function(I){if(live(I))draw(I,now)});tm=setTimeout(loop,100)}
function start(){if(!tm&&!LITE&&!RM.matches&&!document.hidden)tm=setTimeout(loop,100)}
function init(){mount(document.body);mount(document.getElementById("dest"));mount(document.getElementById("setup"));update();start();setInterval(function(){if(!document.hidden)update()},20000);
 document.addEventListener("visibilitychange",function(){if(!document.hidden){update();start()}});
 try{RM.addEventListener("change",function(){update();start()})}catch(e){}var sc=function(){document.documentElement.classList.toggle("sks",(window.scrollY||document.documentElement.scrollTop||0)>12)};sc();addEventListener("scroll",sc,{passive:true});var dm=document.getElementById("dm");if(dm)dm.addEventListener("change",function(){setTimeout(update,60)});try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",function(){setTimeout(update,60)})}catch(e){}new MutationObserver(function(){setTimeout(update,60)}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]})}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init)})();
