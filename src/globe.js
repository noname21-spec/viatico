/* ===== intro: mappamondo puntinato che ruota dietro al logo ===== */
(function(){
var cv=document.getElementById("globe");
if(!cv||!cv.getContext)return;
if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var ctx=cv.getContext("2d");if(!ctx)return;
/* terre emerse: maschera 180x90 (2 gradi) compressa a run-length, da Natural Earth */
var MASK="__LANDMASK__",W=180,H=90,land=new Uint8Array(W*H),p=0,v=0;
MASK.split(",").forEach(function(h){var n=parseInt(h,16)||0;if(v)land.fill(1,p,p+n);p+=n;v^=1});
function isLand(lat,lon){var x=Math.floor((lon+180)/2)%W,y=Math.floor((90-lat)/2);if(x<0)x+=W;if(y<0)y=0;if(y>=H)y=H-1;return land[y*W+x]===1}
var R=Math.PI/180,pts=[],N=8000,GA=Math.PI*(3-Math.sqrt(5));
for(var k=0;k<N;k++){var la=Math.asin(1-2*(k+.5)/N),lo=((k*GA)%(2*Math.PI))-Math.PI;if(isLand(la/R,lo/R))pts.push([la,lo,Math.sin(la),Math.cos(la)])}
var CITY=[[48.86,2.35],[41.39,2.17],[41.9,12.5],[51.5,-.12],[52.37,4.9],[38.72,-9.14],[52.52,13.4],[50.08,14.43],[48.21,16.37]].map(function(c){var la=c[0]*R,lo=c[1]*R;return[la,lo,Math.sin(la),Math.cos(la)]});
/* colori del tema (si adattano a chiaro/scuro) */
var cc=document.createElement("canvas").getContext("2d");
function rgb(name,fb){var s=getComputedStyle(document.documentElement).getPropertyValue(name).trim()||fb;try{cc.fillStyle="#000";cc.fillStyle=s;s=cc.fillStyle}catch(e){s=fb;cc.fillStyle=fb;s=cc.fillStyle}
 if(s.charAt(0)==="#"){return[parseInt(s.substr(1,2),16),parseInt(s.substr(3,2),16),parseInt(s.substr(5,2),16)]}
 var m=s.match(/[\d.]+/g)||[3,136,176];return[+m[0],+m[1],+m[2]]}
var C3=rgb("--c3","#027a9e"),C2=rgb("--c2","#ffcf2a");
function col(c,a){return"rgba("+c[0]+","+c[1]+","+c[2]+","+a+")"}
var dpr=Math.min(window.devicePixelRatio||1,2),S=0;
function fit(){var w=cv.clientWidth;if(!w)return false;S=Math.round(w*dpr);if(cv.width!==S){cv.width=S;cv.height=S}return true}
var LAT0=19*R,t0=null,raf=0,DONE=3.4,base=0,miss=0,tl=0;
function ease(x){x=Math.min(1,Math.max(0,x));return 1-Math.pow(1-x,3)}
function frame(ts){
 if(t0===null)t0=ts;var t=base+(ts-t0)/1000;tl=t;
 if(!fit()){if(++miss<300)raf=requestAnimationFrame(frame);else raf=0;return}
 var sp=document.getElementById("splash");if(sp&&getComputedStyle(sp).visibility==="hidden"){raf=0;return}
 /* longitudine al centro: parte lontana e si ferma sull'Europa */
 var lon0=(10-230*(1-ease(t/2.5))+Math.max(0,t-2.5)*7)*R;
 var r=S/2*.82,cx=S/2,cy=S/2,sl=Math.sin(LAT0),cl=Math.cos(LAT0);
 ctx.clearRect(0,0,S,S);
 /* alone */
 var g=ctx.createRadialGradient(cx,cy,r*.9,cx,cy,r*1.16);g.addColorStop(0,col(C3,.22));g.addColorStop(1,col(C3,0));
 ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,r*1.16,0,7);ctx.fill();
 var b=ctx.createRadialGradient(cx-r*.3,cy-r*.35,r*.1,cx,cy,r);b.addColorStop(0,col(C3,.10));b.addColorStop(1,col(C3,.03));
 ctx.fillStyle=b;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.fill();
 ctx.lineWidth=1.4*dpr;ctx.strokeStyle=col(C3,.35);ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();
 /* reticolo: paralleli e meridiani */
 ctx.lineWidth=.8*dpr;ctx.strokeStyle=col(C3,.13);ctx.beginPath();
 function proj(la,lo){var dl=lo-lon0,sa=Math.sin(la),ca=Math.cos(la),cd=Math.cos(dl),c=sl*sa+cl*ca*cd;return[cx+r*ca*Math.sin(dl),cy-r*(cl*sa-sl*ca*cd),c]}
 var i,j,q,on;
 for(i=-60;i<=60;i+=30){on=false;for(j=-180;j<=180;j+=6){q=proj(i*R,j*R);if(q[2]>0){if(on)ctx.lineTo(q[0],q[1]);else{ctx.moveTo(q[0],q[1]);on=true}}else on=false}}
 for(j=-180;j<180;j+=30){on=false;for(i=-90;i<=90;i+=6){q=proj(i*R,j*R);if(q[2]>0){if(on)ctx.lineTo(q[0],q[1]);else{ctx.moveTo(q[0],q[1]);on=true}}else on=false}}
 ctx.stroke();
 /* terre: puntini in 3 livelli di opacità */
 var B=[[],[],[]],P;
 for(i=0;i<pts.length;i++){P=pts[i];var dl=P[1]-lon0,cd=Math.cos(dl),c=sl*P[2]+cl*P[3]*cd;if(c<=.02)continue;
  var x=cx+r*P[3]*Math.sin(dl),y=cy-r*(cl*P[2]-sl*P[3]*cd);B[c>.62?2:c>.3?1:0].push(x,y)}
 var al=[.28,.55,.9],rad=[.75,1.05,1.3];
 for(i=0;i<3;i++){ctx.fillStyle=col(C3,al[i]);ctx.beginPath();var A=B[i],rr=rad[i]*dpr*(S/460);for(j=0;j<A.length;j+=2){ctx.moveTo(A[j]+rr,A[j+1]);ctx.arc(A[j],A[j+1],rr,0,7)}ctx.fill()}
 /* città: punti dorati che pulsano */
 for(i=0;i<CITY.length;i++){P=CITY[i];q=proj(P[0],P[1]);if(q[2]<=.1)continue;
  var ph=(t*1.1+i*.37)%1,pr=(3+ph*11)*dpr*(S/460);
  ctx.strokeStyle=col(C2,(1-ph)*.7);ctx.lineWidth=1.6*dpr;ctx.beginPath();ctx.arc(q[0],q[1],pr,0,7);ctx.stroke();
  ctx.fillStyle=col(C2,1);ctx.beginPath();ctx.arc(q[0],q[1],2.6*dpr*(S/460),0,7);ctx.fill();
  ctx.fillStyle="rgba(255,255,255,.9)";ctx.beginPath();ctx.arc(q[0]-.6*dpr,q[1]-.6*dpr,.9*dpr,0,7);ctx.fill()}
 if(t<DONE)raf=requestAnimationFrame(frame);else raf=0
}
raf=requestAnimationFrame(function(ts){document.documentElement.classList.add("spgo");frame(ts)});
document.addEventListener("visibilitychange",function(){if(document.hidden){if(raf){cancelAnimationFrame(raf);raf=0}}else if(!raf&&tl<DONE){base=tl;t0=null;raf=requestAnimationFrame(frame)}});
})();