/* Logo di stagione: neve, petali, luce d'estate, foglie. Una sola tela leggera, ferma quando non serve. */
(function(){
var dest=document.getElementById("dest"),box=document.querySelector(".dbrand");if(!dest||!box||!window.requestAnimationFrame)return;
var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var m=new Date().getMonth(),S=m===11||m<2?"winter":m<5?"spring":m<8?"summer":"autumn";
dest.dataset.sea=S;
if(rm)return;
var cv=document.createElement("canvas");cv.className="seac";cv.setAttribute("aria-hidden","true");box.insertBefore(cv,box.firstChild);
var cx=cv.getContext("2d"),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,window.LITE?1:1.75),P=[],raf=0,last=0,t0=0,N=window.LITE?14:S==="winter"?60:S==="summer"?22:26;
function size(){W=box.clientWidth;H=Math.min(300,box.clientHeight||300);cv.width=W*dpr;cv.height=H*dpr;cv.style.height=H+"px";cx.setTransform(dpr,0,0,dpr,0,0)}
/* sprite del fiocco: cerchio morbido, disegnato una sola volta */
var sp=document.createElement("canvas");sp.width=sp.height=32;(function(){var g=sp.getContext("2d"),r=g.createRadialGradient(16,16,0,16,16,16);r.addColorStop(0,"rgba(255,255,255,1)");r.addColorStop(.5,"rgba(255,255,255,.95)");r.addColorStop(.78,"rgba(165,198,235,.3)");r.addColorStop(1,"rgba(165,198,235,0)");g.fillStyle=r;g.fillRect(0,0,32,32)})();
var LC=["#d9741f","#c2491d","#e8a030","#a8421c","#f0b43a"],PC=["#ffc2d6","#ffd9e5","#fff","#f7a8c4"];
function mk(init){var d=Math.random(),p={d:d,x:Math.random()*W,y:init?Math.random()*H:-12,ph:Math.random()*6.28,a:Math.random()*6.28};
if(S==="winter"){p.r=1+d*d*4.2;p.v=14+d*46;p.sw=6+d*16;p.o=.55+d*.45;p.f=.4+Math.random()*.9}
else if(S==="spring"){p.r=3+d*3;p.v=18+d*22;p.sw=14+Math.random()*16;p.o=.55+d*.4;p.c=PC[Math.floor(Math.random()*PC.length)];p.sp=1+Math.random()*2.2;p.f=.5+Math.random()*.6}
else if(S==="autumn"){p.r=5+d*5;p.v=22+d*30;p.sw=18+Math.random()*24;p.o=.8+d*.2;p.c=LC[Math.floor(Math.random()*LC.length)];p.sp=1+Math.random()*2.4;p.f=.4+Math.random()*.6}
else{p.x=Math.random()*W;p.y=Math.random()*H;p.r=1+d*2.4;p.v=-4-d*8;p.sw=8;p.o=0;p.f=.6+Math.random()*1.2}
return p}
function init(){size();P=[];for(var i=0;i<N;i++)P.push(mk(true))}
function draw(ts){raf=0;if(document.hidden||!dest.classList.contains("on")||dest.classList.contains("pick")){return}
var dt=Math.min(.05,(ts-last)/1000||.016);last=ts;if(!t0)t0=ts;var t=(ts-t0)/1000,wind=Math.sin(t*.35)*16+Math.sin(t*.9+1)*7;
cx.clearRect(0,0,W,H);
for(var i=0;i<P.length;i++){var p=P[i];
if(S==="summer"){p.ph+=dt*p.f;var tw=.5+.5*Math.sin(p.ph*2);p.y+=p.v*dt;p.x+=Math.sin(p.ph)*6*dt;var al=tw*.7*(1-Math.max(0,(p.y/H)*.4));cx.globalAlpha=al;cx.fillStyle="#ffe9a0";cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill();cx.globalAlpha=al*.35;cx.beginPath();cx.arc(p.x,p.y,p.r*3,0,6.283);cx.fill();if(p.y<-8||p.y>H+8){P[i]=mk(true)}continue}
p.ph+=dt*p.f;p.y+=p.v*dt;p.x+=(Math.sin(p.ph)*p.sw+wind*(.3+p.d))*dt;
if(p.y>H+14||p.x<-20||p.x>W+20){P[i]=mk(false);continue}
var fade=Math.min(1,Math.max(0,(H-p.y)/90));
if(S==="winter"){cx.globalAlpha=p.o*fade;var s=p.r*(p.d<.3?2.3:1.8);cx.drawImage(sp,p.x-s,p.y-s,s*2,s*2)}
else{p.a+=dt*p.sp;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.globalAlpha=p.o*fade;cx.fillStyle=p.c;
if(S==="spring"){cx.scale(1,.55+.45*Math.abs(Math.sin(p.ph*1.3)));cx.beginPath();cx.ellipse(0,0,p.r,p.r*.62,0,0,6.283);cx.fill()}
else{var sq=.35+.65*Math.abs(Math.cos(p.ph*1.2));cx.scale(1,sq);cx.beginPath();cx.moveTo(-p.r,0);cx.quadraticCurveTo(0,-p.r*.8,p.r,0);cx.quadraticCurveTo(0,p.r*.8,-p.r,0);cx.fill();cx.globalAlpha*=.5;cx.strokeStyle="rgba(90,30,0,.6)";cx.lineWidth=.6;cx.beginPath();cx.moveTo(-p.r,0);cx.lineTo(p.r*.9,0);cx.stroke()}
cx.restore()}}
cx.globalAlpha=1;raf=requestAnimationFrame(draw)}
function go(){if(!raf&&!document.hidden&&dest.classList.contains("on")&&!dest.classList.contains("pick")){last=performance.now();raf=requestAnimationFrame(draw)}}
init();window.addEventListener("resize",function(){size()});
new MutationObserver(go).observe(dest,{attributes:true,attributeFilter:["class"]});
document.addEventListener("visibilitychange",go);go();
})();
