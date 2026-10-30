/* ===== skyline in rilievo: estrusione, ombre, sole/luna, nuvole, uccelli, riflesso ===== */
(function(){
var NS="http://www.w3.org/2000/svg",root=document.documentElement;
/* secondo colore di ogni città (preso da qualcosa che in città si vede davvero) */
var Z={paris:"#F2B84B",bcn:"#E8B21C",roma:"#F2B33D",londra:"#E0313F",amsterdam:"#F39200",lisbona:"#F5C400",berlino:"#F0B323",praga:"#E4572E",vienna:"#E4BE6A",bruxelles:"#F1BF00",cracovia:"#E3B04B",budapest:"#EFB548",porto:"#F08A3C",monaco:"#E0A526",madrid:"#E8B21C",milano:"#E3B04B",firenze:"#E0A84A",venezia:"#EFB548",napoli:"#F2B33D",siviglia:"#F08A3C",valencia:"#F5C400",varsavia:"#E3B04B",amburgo:"#E0A526",zurigo:"#E0A526",copenaghen:"#E8B21C",stoccolma:"#F1C40F",oslo:"#E0A526",helsinki:"#8FB8D6",reykjavik:"#8FB8D6",dublino:"#E0A526",edimburgo:"#C9A0DC",atene:"#F0C060",istanbul:"#F08A3C",vilnius:"#E0A526",lubiana:"#7FC4E8",zagabria:"#F0B040",bucarest:"#FCD116",sofia:"#E0A526",riga:"#E3B04B",tallinn:"#8FB8D6",valletta:"#E3B04B",salisburgo:"#E3B04B",ginevra:"#8FB8D6",malaga:"#F5C400"};
if(window.PD&&Z[PD.id])root.style.setProperty("--gz",Z[PD.id]);
window.SKYZ=Z;window.zSky=zSky;
/* finestre accese: quota che dipende dall'ora della città (0 di giorno, quasi tutte di notte) */
function cityH(tz){try{var p=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:tz||"Europe/Rome"}).formatToParts(new Date()),h=0,m=0;p.forEach(function(x){if(x.type==="hour")h=+x.value;if(x.type==="minute")m=+x.value});return h+m/60}catch(e){var d=new Date();return d.getHours()+d.getMinutes()/60}}
function sst(a,b,x){x=Math.max(0,Math.min(1,(x-a)/(b-a)));return x*x*(3-2*x)}
function litF(h){return h<12?.9*(1-sst(.5,7.6,h)):.92*sst(17.2,20.8,h)}
/* altezza del sole sull'orizzonte (gradi) nel luogo e nell'istante dati: le luci seguono il tramonto vero, non un orario fisso */
function sunEl(ll,t){var r=Math.PI/180,d=(t||Date.now())/864e5-10957.5,g=(357.529+.98560028*d)*r,q=280.459+.98564736*d,L=(q+1.915*Math.sin(g)+.02*Math.sin(2*g))*r,e=(23.439-3.6e-7*d)*r,
 ra=Math.atan2(Math.cos(e)*Math.sin(L),Math.cos(L))/r,dec=Math.asin(Math.sin(e)*Math.sin(L)),gm=(18.697374558+24.06570982441908*d)%24,ha=(gm*15+ll[1]-ra)*r,la=ll[0]*r;
 return Math.asin(Math.sin(la)*Math.sin(dec)+Math.cos(la)*Math.cos(dec)*Math.cos(ha))/r}
window.sunEl=sunEl;
function llOf(sv){var a=sv&&sv.getAttribute("data-ll");if(a){var v=a.split(",").map(Number);if(v.length===2&&!isNaN(v[0]))return v}return null}
/* quota di finestre accese: 0 col sole alto, sale dal tramonto, piena a buio fatto; a notte fonda qualcuna si spegne */
function litNow(sv){var fx=sv.getAttribute("data-lit");if(fx)return +fx;var ll=llOf(sv),tz=sv.getAttribute("data-tz")||(window.PD&&PD.TZ),h=cityH(tz);if(!ll)return litF(h);
 var el=sunEl(ll),f=.92*(1-sst(-7,5,el));if(h>=1&&h<6)f*=1-.4*sst(1,3.5,h)*(1-sst(5,6,h));return f}
var TODF={dawn:.28,day:0,dusk:.5,night:.9},RM0=matchMedia("(prefers-reduced-motion: reduce)");
function skyLit(sv,f){if(!sv)return;if(f==null)f=litNow(sv);var w=sv.querySelectorAll(".wn"),first=!sv._lit,k=0;sv._lit=1;
 for(var i=0;i<w.length;i++){var on=+w[i].getAttribute("data-o")<f;if(w[i].classList.contains("on")!==on){/* si accendono una dopo l'altra, non tutte insieme */
  w[i].style.transitionDelay=RM0.matches?"":(on?(first?.3:0)+(+w[i].getAttribute("data-o"))*(first?2.4:1.6)*Math.random()+"s":Math.random()*.8+"s");w[i].classList.toggle("on",on);k++}}}
/* qualche finestra che si accende e si spegne mentre guardi, quando è buio */
setInterval(function(){if(document.hidden||RM0.matches||window.LITE||document.documentElement.classList.contains("lite"))return;var a=document.querySelectorAll("svg.sky");for(var i=0;i<a.length;i++){var sv=a[i];if(!sv.getClientRects().length)continue;var hh=sv.closest("#hero");if(hh&&hh._lp)continue;
 var f=litNow(sv);if(f<.15)continue;var w=sv.querySelectorAll(".wn"),n=Math.min(3,1+(Math.random()*3|0));for(var j=0;j<n;j++){var x=w[Math.random()*w.length|0];if(!x)continue;var o=+x.getAttribute("data-o");if(Math.abs(o-f)<.25){x.style.transitionDelay=Math.random()*.6+"s";x.classList.toggle("on")}}}},3500);
window.skyLit=skyLit;
setInterval(function(){if(document.hidden)return;var a=document.querySelectorAll("svg.sky");for(var i=0;i<a.length;i++){var hh=a[i].closest("#hero");if(hh&&hh._lp)continue;skyLit(a[i])}},60000);document.addEventListener("visibilitychange",function(){if(document.hidden)return;var a=document.querySelectorAll("svg.sky");for(var i=0;i<a.length;i++){var hh=a[i].closest("#hero");if(!(hh&&hh._lp))skyLit(a[i])}});
var svg=document.querySelector("svg.sky:not(.zsk)");if(!svg||!window.PD||!PD.SKY)return;if(PD.LL)svg.setAttribute("data-ll",PD.LL.join(","));if(PD.TZ)svg.setAttribute("data-tz",PD.TZ);
/* il cielo segue l'ora della città: alba, giorno, tramonto, notte */
(function(){var hero=document.getElementById("hero");if(!hero)return;
function hr(){try{var p=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:PD.TZ||"Europe/Rome"}).formatToParts(new Date()),h=0,m=0;p.forEach(function(x){if(x.type==="hour")h=+x.value;if(x.type==="minute")m=+x.value});return h+m/60}catch(e){var d=new Date();return d.getHours()+d.getMinutes()/60}}
function set(){var h=hr(),t=h>=5.5&&h<8?"dawn":h>=8&&h<17.5?"day":h>=17.5&&h<20.5?"dusk":"night";if(PD.LL){var se=sunEl(PD.LL);t=se>7?"day":se>-9?(h<12?"dawn":"dusk"):"night"}var sv0=hero.querySelector("svg.sky");if(sv0&&PD.LL&&!sv0.getAttribute("data-ll"))sv0.setAttribute("data-ll",PD.LL.join(","));hero._real=t;if(hero._lp)return;if(hero.getAttribute("data-tod")!==t)hero.setAttribute("data-tod",t);skyLit(hero.querySelector("svg.sky"))}
set();setInterval(set,300000);document.addEventListener("visibilitychange",function(){if(!document.hidden)set()})})();
var reduce=matchMedia("(prefers-reduced-motion: reduce)"),exts=[],px=0,tx=null,raf=0,vis=true;
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function build(svg,sfx,sky,lite){
  var exts=[];svg.innerHTML="";svg.setAttribute("viewBox",lite?"0 4 400 106":"0 4 400 104");if(!lite)svg.setAttribute("preserveAspectRatio","xMidYMax slice");
  var src=new DOMParser().parseFromString('<svg xmlns="'+NS+'">'+sky+"</svg>","image/svg+xml").documentElement;
  var defs=el("defs",{},svg);
  var gf=el("linearGradient",{id:sfx+"gFace",x1:0,y1:0,x2:.35,y2:1},defs);el("stop",{offset:0,style:"stop-color:var(--f1)"},gf);el("stop",{offset:1,style:"stop-color:var(--f2)"},gf);
  var gs=el("radialGradient",{id:sfx+"gSun"},defs);el("stop",{offset:0,style:"stop-color:var(--sunHalo);stop-opacity:.75"},gs);el("stop",{offset:1,style:"stop-color:var(--sunHalo);stop-opacity:0"},gs);
  var gg=el("linearGradient",{id:sfx+"gGround",x1:0,y1:0,x2:0,y2:1},defs);el("stop",{offset:0,style:"stop-color:var(--skg)"},gg);el("stop",{offset:1,style:"stop-color:var(--skg);stop-opacity:0"},gg);
  var gw=el("linearGradient",{id:sfx+"gSweep",x1:0,y1:0,x2:1,y2:0},defs);el("stop",{offset:0,style:"stop-color:#fff;stop-opacity:0"},gw);el("stop",{offset:.5,style:"stop-color:#fff;stop-opacity:var(--swo)"},gw);el("stop",{offset:1,style:"stop-color:#fff;stop-opacity:0"},gw);
  var fb=el("filter",{id:sfx+"fBlur",x:"-20%",y:"-50%",width:"140%",height:"200%"},defs);el("feGaussianBlur",{stdDeviation:1.4},fb);
  var cp=el("clipPath",{id:sfx+"cpF"},defs);
  var fm=null;if(!lite){var fg=el("linearGradient",{id:sfx+"gEdge",x1:0,y1:0,x2:1,y2:0},defs);[[0,0],[.11,1],[.89,1],[1,0]].forEach(function(s){el("stop",{offset:s[0],"stop-color":"#fff","stop-opacity":s[1]},fg)});var mk=el("mask",{id:sfx+"mEdge",maskUnits:"userSpaceOnUse",x:-30,y:-4,width:460,height:132},defs);el("rect",{x:-30,y:-4,width:460,height:132,fill:"url(#"+sfx+"gEdge)"},mk);fm="url(#"+sfx+"mEdge)"}
  function fade(n){if(fm)n.setAttribute("mask",fm);return n}
  var back=src.querySelector(".sk-back"),sunX=40,sunY=30,sunR=13;
  var far=el("g",{"class":"far"},svg),hills=fade(el("g",{"class":"hills"},far));
  if(back)[].forEach.call(back.children,function(n){if(n.tagName==="circle"){sunX=+n.getAttribute("cx");sunY=+n.getAttribute("cy");sunR=+n.getAttribute("r")}else{var c=n.cloneNode(true);c.setAttribute("class","hill");hills.appendChild(c)}});
  var sg=el("g",{"class":"sunG"},far);
  var mm=el("mask",{id:sfx+"mMoon",maskUnits:"userSpaceOnUse",x:sunX-sunR*2,y:sunY-sunR*2,width:sunR*4,height:sunR*4},defs);
  el("rect",{x:sunX-sunR*2,y:sunY-sunR*2,width:sunR*4,height:sunR*4,fill:"#fff"},mm);el("circle",{"class":"mooncut",cx:sunX+sunR*.5,cy:sunY-sunR*.32,r:sunR*.86},mm);
  el("circle",{"class":"halo",cx:sunX,cy:sunY,r:sunR*2.6},sg);el("circle",{"class":"sun",cx:sunX,cy:sunY,r:sunR,mask:"url(#"+sfx+"mMoon)"},sg);
  [["cl1",62,24],["cl2",120,12]].forEach(function(c){var g=el("g",{"class":c[0]},far);[[0,4,10,5],[9,0,9,8],[18,4,10,5]].forEach(function(e){el("ellipse",{"class":"cloud",cx:c[1]+e[0],cy:c[2]+e[1],rx:e[2],ry:e[3]},g)})});
  var R=seedR(sky),bk=el("g",{"class":"bk"},svg),mons=el("g",{"class":"mons"},svg);
  backRow(bk,R);
  var main=src.querySelector(".sk-main"),i=0;
  if(main)[].forEach.call(main.children,function(g){
    var id=sfx+"skm"+(i++),k=(g.getAttribute("style")||"").match(/--k:(\d+)/);k=k?k[1]:i;
    var m=el("g",{"class":"mon",style:"--k:"+k},mons);
    var f=g.cloneNode(true);f.removeAttribute("style");f.setAttribute("id",id);f.setAttribute("class","face");m.appendChild(f);
    el("use",{href:"#"+id},cp)});
  var lines=src.querySelector(".sk-lines");
  if(lines)[].forEach.call(lines.children,function(p,j){var c=p.cloneNode(true);c.setAttribute("class","ln");c.setAttribute("style","--i:"+j);mons.appendChild(c)});
  fade(el("rect",{"class":"gnd",x:-40,y:106,width:480,height:24},svg));fade(el("rect",{"class":"gl",x:-40,y:105.4,width:480,height:1.2,rx:.6},svg));
  var sea=src.querySelector(".sk-sea");if(sea){var sg2=sea.cloneNode(true);sg2.setAttribute("class","sea");sg2.removeAttribute("style");svg.appendChild(fade(sg2))}
  var spk=src.querySelector(".sk-spark"),sp=el("g",{"class":"spk"},svg);
  if(spk)[].forEach.call(spk.children,function(c,j){var n=c.cloneNode(true);n.setAttribute("style","--i:"+j);sp.appendChild(n)});
  try{addNight(far,mons,sky,sunX,sunY,R,lite)}catch(e){}
  try{skyLit(svg)}catch(e){}
  if(!lite){var fl=el("g",{"class":"flock"},svg);[[0,40],[12,34],[22,44]].forEach(function(b,j){var g=el("g",{transform:"translate("+b[0]+" "+b[1]+")"},fl);el("path",{"class":"bird",d:"M0 0q3-3 6 0q3-3 6 0",style:"animation-delay:"+(j*.13)+"s"},g)})}
  return exts}
/* finestre che si accendono la sera e stelle la notte (solo sui telefoni non lenti) */
function addNight(far,mons,sky,sunX,sunY,rnd,lite){
  var st=el("g",{"class":"stars"},far);
  for(var i=0;i<(lite?0:16);i++){var x=-20+rnd()*440,y=-2+rnd()*46;if(Math.abs(x-sunX)<34&&Math.abs(y-sunY)<30)continue;el("circle",{cx:x.toFixed(1),cy:y.toFixed(1),r:(.6+rnd()*.6).toFixed(2),style:"--d:"+(rnd()*1.6).toFixed(2)+"s"},st)}
  var tmp=document.createElementNS(NS,"svg");tmp.setAttribute("width","0");tmp.setAttribute("height","0");tmp.style.cssText="position:absolute;visibility:hidden;pointer-events:none";document.body.appendChild(tmp);
  var wg=el("g",{"class":"wins"},mons),pts=[];
  try{var doc=new DOMParser().parseFromString('<svg xmlns="'+NS+'">'+sky+"</svg>","image/svg+xml").documentElement,main=doc.querySelector(".sk-main");
  if(main)[].forEach.call(main.children,function(g){var c=document.importNode(g,true);tmp.appendChild(c);
    [].forEach.call(c.querySelectorAll("path"),function(p){var bb=p.getBBox();if(bb.width<12||bb.height<14)return;
      var n=Math.min(9,Math.round(bb.width*bb.height/230)),got=0,tries=0,pt=tmp.createSVGPoint();
      function inside(x,y){pt.x=x;pt.y=y;return p.isPointInFill(pt)}
      while(got<n&&tries<n*14){tries++;var x=bb.x+3+rnd()*(bb.width-7),y=bb.y+6+rnd()*(bb.height-10);
        if(y>101||!inside(x,y)||!inside(x+1.8,y)||!inside(x,y+2.6)||!inside(x+1.8,y+2.6))continue;
        var ok=true;for(var k=0;k<pts.length;k++){if(Math.abs(pts[k][0]-x)<4&&Math.abs(pts[k][1]-y)<4){ok=false;break}}
        if(!ok)continue;pts.push([x,y]);got++}})})}catch(e){}
  tmp.parentNode.removeChild(tmp);
  pts.forEach(function(q){el("rect",{"class":"wn","data-o":rnd().toFixed(3),x:q[0].toFixed(1),y:q[1].toFixed(1),width:1.8,height:2.6,rx:.3},wg)})}
/* generatore ripetibile per città: stessa fila di palazzi a ogni apertura */
function seedR(str){var h=7;for(var i=0;i<str.length;i+=7)h=(h*31+str.charCodeAt(i))%233280;var s=h||7;return function(){s=(s*9301+49297)%233280;return s/233280}}
/* fila di palazzi qualsiasi dietro i monumenti, con le loro finestre */
function backRow(g,R){var x=-6;while(x<406){var w=12+R()*18,h=20+R()*30,y=106-h;el("rect",{x:x.toFixed(1),y:y.toFixed(1),width:w.toFixed(1),height:(h+1).toFixed(1)},g);
  for(var yy=y+4;yy<103;yy+=6)for(var xx=x+2.6;xx<x+w-3.2;xx+=5)if(R()<.5)el("rect",{"class":"wn","data-o":R().toFixed(3),x:xx.toFixed(1),y:yy.toFixed(1),width:2,height:2.8,rx:.3},g);
  x+=w+(R()<.25?2+R()*7:0)}}
function buildHero(){var parent=svg.parentNode,next=svg.nextSibling;parent.removeChild(svg);exts=build(svg,"",PD.SKY,false);parent.insertBefore(svg,next);persp(0)}
function zSky(id,sfx){var C=window.CITIES&&CITIES[id];if(!C||!C.SKY)return null;var z=document.createElementNS(NS,"svg");z.setAttribute("class","sky zsk");z.setAttribute("aria-hidden","true");if(C.TZ)z.setAttribute("data-tz",C.TZ);if(C.LL)z.setAttribute("data-ll",C.LL.join(","));build(z,sfx||"z",C.SKY,true);skyLit(z);return z}
var lastP=null;function persp(p){p=Math.round(p*200)/200;if(p===lastP)return;lastP=p;
  var dx=.75+p*.55,dy=-.55;
  for(var j=0;j<exts.length;j++){var u=exts[j];u.setAttribute("transform","translate("+(u._s*dx).toFixed(2)+" "+(u._s*dy).toFixed(2)+")")}
  var f=svg.querySelector(".far");if(f)f.setAttribute("transform","translate("+(-p*7).toFixed(2)+" 0)");
  var m=svg.querySelector(".mons");if(m)m.setAttribute("transform","translate("+(p*2.5).toFixed(2)+" 0)");var b=svg.querySelector(".bk");if(b)b.setAttribute("transform","translate("+(p*1.1).toFixed(2)+" 0)")}
var last=0,until=0;
/* l'oscillazione dura qualche secondo e poi si ferma: niente lavoro continuo quando nessuno tocca lo schermo */
function loop(t){raf=requestAnimationFrame(loop);if(t-last<33)return;last=t;
  if(t>until)tx=null;
  var target=tx!==null?tx:(t<until?Math.sin(t/2600)*.45:0);px+=(target-px)*.14;persp(px);
  if(t>until&&tx===null&&Math.abs(px)<.004){px=0;persp(0);cancelAnimationFrame(raf);raf=0}}
function run(){cancelAnimationFrame(raf);raf=0;if(!window.LITE&&!reduce.matches&&vis&&!document.hidden&&performance.now()<until)raf=requestAnimationFrame(loop)}
function wake(ms){until=Math.max(until,performance.now()+ms);if(!raf)run()}
buildHero();
var hero=svg.closest(".hero")||svg.parentNode;
hero.addEventListener("pointermove",function(e){var r=hero.getBoundingClientRect();tx=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width)*2-1));wake(1600)});
hero.addEventListener("pointerleave",function(){tx=null;wake(900)});
hero.addEventListener("pointercancel",function(){tx=null;wake(900)});
if("IntersectionObserver" in window)new IntersectionObserver(function(es){var v=es[0].isIntersecting;if(v!==vis){vis=v;if(v){wake(5000);if(Date.now()-(hero._hid||0)>60000&&window.heroLapse)heroLapse.arm();if(window.heroLapse)setTimeout(window.heroLapse,200)}else{hero._hid=Date.now();run()}}}).observe(hero);
document.addEventListener("visibilitychange",function(){if(!document.hidden)wake(3000);else run()});
try{reduce.addEventListener("change",function(){run()})}catch(e){}
/* time-lapse: all'apertura il cielo corre dall'alba fino all'ora vera della città */
var armed=true,lapT=[];
function splashUp(){var s=document.getElementById("splash");if(!s)return false;var c=getComputedStyle(s);return c.display!=="none"&&c.visibility!=="hidden"&&s.style.display!=="none"}
var CL={dawn:"dawn",day:"day",dusk:"gold",night:"night"};
function step(t){hero.setAttribute("data-tod",t);skyLit(svg,TODF[t]);["night","dawn","gold","day"].forEach(function(x){hero.classList.toggle("tod-"+x,x===CL[t])})}
function lapse(){if(!armed||reduce.matches||!hero._real||splashUp()||!hero.offsetParent||hero.getBoundingClientRect().height<50||document.hidden)return;armed=false;
  var O=["dawn","day","dusk","night"],real=hero._real,i=O.indexOf(real),seq=window.LITE?[O[(i+3)%4],real]:(real==="dawn"?["night","dawn"]:O.slice(0,i+1));
  lapT.forEach(clearTimeout);lapT=[];hero._lp=1;hero.classList.remove("lp");step(seq[0]);void hero.offsetWidth;hero.classList.add("lp");
  seq.slice(1).forEach(function(t,k){lapT.push(setTimeout(function(){step(t)},600+k*1500))});
  lapT.push(setTimeout(function(){hero._lp=0;hero.classList.remove("lp");if(hero.getAttribute("data-tod")!==hero._real)hero.setAttribute("data-tod",hero._real);skyLit(svg);if(window.heroTod)heroTod()},600+(seq.length-1)*1500+1300))}
lapse.arm=function(){armed=true};window.heroLapse=lapse;
setTimeout(lapse,300);

/* quando si torna alla scheda Tappe la città risale di nuovo */
var tr=document.getElementById("t-itinerario");
if(tr)tr.addEventListener("change",function(){if(tr.checked&&!reduce.matches){buildHero();wake(5000)}});
wake(5000);
})();
