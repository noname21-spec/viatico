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
var M=markup(),inst=[],env=null,sx=150,o=0;
function mount(host,first){if(!host)return;var d=document.createElement("div");d.innerHTML=M;var n=d.firstChild;if(host===document.body)n.classList.add("mb-main");var df=host.id==="dest"&&host.querySelector(".dfull");if(df)host.insertBefore(n,df.nextSibling);else host.insertBefore(n,host.firstChild);inst.push({n:n,host:host,es:[].slice.call(n.querySelectorAll(".mb-g ellipse")),gg:n.querySelector(".mb-g")});if(env)paint(inst[inst.length-1])}
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
function paint(I){var E=env,x=34+Math.max(0,Math.min(1,E.day?E.u:E.v))*232,c=E.day?"#fff3b8":"#dfe8ff",a=E.day?ss(-.04,.12,E.e):ss(-.1,-.35,E.e)*.9;
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
 try{RM.addEventListener("change",function(){update();start()})}catch(e){}}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init)})();
