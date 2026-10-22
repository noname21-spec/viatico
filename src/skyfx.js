/* ===== skyline in rilievo: estrusione, ombre, sole/luna, nuvole, uccelli, riflesso ===== */
(function(){
var NS="http://www.w3.org/2000/svg",root=document.documentElement;
/* secondo colore di ogni città (preso da qualcosa che in città si vede davvero) */
var Z={paris:"#F2B84B",bcn:"#E8B21C",roma:"#F2B33D",londra:"#E0313F",amsterdam:"#F39200",lisbona:"#F5C400",berlino:"#F0B323",praga:"#E4572E",vienna:"#E4BE6A",bruxelles:"#F1BF00",cracovia:"#E3B04B",budapest:"#EFB548",porto:"#F08A3C",monaco:"#E0A526",madrid:"#E8B21C",milano:"#E3B04B",firenze:"#E0A84A",venezia:"#EFB548",napoli:"#F2B33D",siviglia:"#F08A3C",valencia:"#F5C400",varsavia:"#E3B04B",amburgo:"#E0A526",zurigo:"#E0A526",copenaghen:"#E8B21C",stoccolma:"#F1C40F",oslo:"#E0A526",helsinki:"#8FB8D6",reykjavik:"#8FB8D6",dublino:"#E0A526",edimburgo:"#C9A0DC",atene:"#F0C060",istanbul:"#F08A3C",vilnius:"#E0A526",lubiana:"#7FC4E8",zagabria:"#F0B040",bucarest:"#FCD116",sofia:"#E0A526",riga:"#E3B04B",tallinn:"#8FB8D6",valletta:"#E3B04B",salisburgo:"#E3B04B",ginevra:"#8FB8D6",malaga:"#F5C400"};
if(window.PD&&Z[PD.id])root.style.setProperty("--gz",Z[PD.id]);
window.SKYZ=Z;window.zSky=zSky;
var svg=document.querySelector("svg.sky:not(.zsk)");if(!svg||!window.PD||!PD.SKY)return;
/* il cielo segue l'ora della città: alba, giorno, tramonto, notte */
(function(){var hero=document.getElementById("hero");if(!hero)return;
function hr(){try{var p=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:PD.TZ||"Europe/Rome"}).formatToParts(new Date()),h=0,m=0;p.forEach(function(x){if(x.type==="hour")h=+x.value;if(x.type==="minute")m=+x.value});return h+m/60}catch(e){var d=new Date();return d.getHours()+d.getMinutes()/60}}
function set(){var h=hr(),t=h>=5.5&&h<8?"dawn":h>=8&&h<17.5?"day":h>=17.5&&h<20.5?"dusk":"night";if(hero.getAttribute("data-tod")!==t)hero.setAttribute("data-tod",t)}
set();setInterval(set,300000);document.addEventListener("visibilitychange",function(){if(!document.hidden)set()})})();
var reduce=matchMedia("(prefers-reduced-motion: reduce)"),exts=[],px=0,tx=null,raf=0,vis=true;
function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function build(svg,sfx,sky,lite){
  var exts=[];svg.innerHTML="";svg.setAttribute("viewBox",lite?"0 -4 400 132":"-30 -4 460 132");
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
  el("circle",{"class":"halo",cx:sunX,cy:sunY,r:sunR*2.6},sg);el("circle",{"class":"sun",cx:sunX,cy:sunY,r:sunR},sg);
  el("circle",{"class":"moonc",cx:sunX+sunR*.45,cy:sunY-sunR*.3,r:sunR*.85},sg);
  [["cl1",62,24],["cl2",120,12]].forEach(function(c){var g=el("g",{"class":c[0]},far);[[0,4,10,5],[9,0,9,8],[18,4,10,5]].forEach(function(e){el("ellipse",{"class":"cloud",cx:c[1]+e[0],cy:c[2]+e[1],rx:e[2],ry:e[3]},g)})});
  var dir=sunX<200?1:-1,shd=el("g",{"class":"shd",filter:"url(#"+sfx+"fBlur)"},svg),mons=el("g",{"class":"mons"},svg);
  var main=src.querySelector(".sk-main"),i=0;
  if(main)[].forEach.call(main.children,function(g){
    var id=sfx+"skm"+(i++),k=(g.getAttribute("style")||"").match(/--k:(\d+)/);k=k?k[1]:i;
    el("use",{href:"#"+id,transform:"matrix(1,0,"+(-.95*dir)+",-.2,"+(100.7*dir)+",127.2)"},shd);
    var m=el("g",{"class":"mon",style:"--k:"+k},mons);
    for(var s=6;s>=1;s--){var u=el("use",{href:"#"+id,"class":"ext"},m);u._s=s;exts.push(u)}
    var f=g.cloneNode(true);f.removeAttribute("style");f.setAttribute("id",id);f.setAttribute("class","face");m.appendChild(f);
    el("use",{href:"#"+id},cp)});
  if(!lite){var sw=el("g",{"clip-path":"url(#"+sfx+"cpF)"},mons);el("rect",{"class":"sweep",x:-130,y:-10,width:80,height:130,fill:"url(#"+sfx+"gSweep)",transform:"skewX(-18)"},sw)}
  var lines=src.querySelector(".sk-lines");
  if(lines)[].forEach.call(lines.children,function(p,j){var c=p.cloneNode(true);c.setAttribute("class","ln");c.setAttribute("style","--i:"+j);mons.appendChild(c)});
  fade(el("rect",{"class":"gnd",x:-40,y:106,width:480,height:24},svg));fade(el("rect",{"class":"gl",x:-40,y:105.4,width:480,height:1.2,rx:.6},svg));
  var sea=src.querySelector(".sk-sea");if(sea){var sg2=sea.cloneNode(true);sg2.setAttribute("class","sea");sg2.removeAttribute("style");svg.appendChild(fade(sg2))}
  var spk=src.querySelector(".sk-spark"),sp=el("g",{"class":"spk"},svg);
  if(spk)[].forEach.call(spk.children,function(c,j){var n=c.cloneNode(true);n.setAttribute("style","--i:"+j);sp.appendChild(n)});
  if(!lite){var fl=el("g",{"class":"flock"},svg);[[0,40],[12,34],[22,44]].forEach(function(b,j){var g=el("g",{transform:"translate("+b[0]+" "+b[1]+")"},fl);el("path",{"class":"bird",d:"M0 0q3-3 6 0q3-3 6 0",style:"animation-delay:"+(j*.13)+"s"},g)})}
  return exts}
function buildHero(){var parent=svg.parentNode,next=svg.nextSibling;parent.removeChild(svg);exts=build(svg,"",PD.SKY,false);parent.insertBefore(svg,next);persp(0)}
function zSky(id,sfx){var C=window.CITIES&&CITIES[id];if(!C||!C.SKY)return null;var z=document.createElementNS(NS,"svg");z.setAttribute("class","sky zsk");z.setAttribute("aria-hidden","true");var ex=build(z,sfx||"z",C.SKY,true);for(var j=0;j<ex.length;j++){var u=ex[j];u.setAttribute("transform","translate("+(u._s*.75).toFixed(2)+" "+(u._s*-.55).toFixed(2)+")")}return z}
var lastP=null;function persp(p){p=Math.round(p*200)/200;if(p===lastP)return;lastP=p;
  var dx=.75+p*.55,dy=-.55;
  for(var j=0;j<exts.length;j++){var u=exts[j];u.setAttribute("transform","translate("+(u._s*dx).toFixed(2)+" "+(u._s*dy).toFixed(2)+")")}
  var f=svg.querySelector(".far");if(f)f.setAttribute("transform","translate("+(-p*7).toFixed(2)+" 0)");
  var m=svg.querySelector(".mons");if(m)m.setAttribute("transform","translate("+(p*2.5).toFixed(2)+" 0)")}
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
if("IntersectionObserver" in window)new IntersectionObserver(function(es){var v=es[0].isIntersecting;if(v!==vis){vis=v;if(v)wake(5000);else run()}}).observe(hero);
document.addEventListener("visibilitychange",function(){if(!document.hidden)wake(3000);else run()});
try{reduce.addEventListener("change",function(){run()})}catch(e){}
/* quando si torna alla scheda Tappe la città risale di nuovo */
var tr=document.getElementById("t-itinerario");
if(tr)tr.addEventListener("change",function(){if(tr.checked&&!reduce.matches){buildHero();wake(5000)}});
wake(5000);
})();
