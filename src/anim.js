/* ===== animazioni: indicatore dei giorni a molla, totale che conta ===== */
(function(){
var reduce=matchMedia("(prefers-reduced-motion: reduce)");
/* indicatore che scivola sul giorno scelto */
function place(d){
  var on=d.querySelector(".dp.on");
  if(!on||!on.offsetWidth){if(d.classList.contains("ind"))d.classList.remove("ind");return}
  var l=on.offsetLeft+"px",w=on.offsetWidth+"px";
  if(d.style.getPropertyValue("--dl")!==l)d.style.setProperty("--dl",l);if(d.style.getPropertyValue("--dw")!==w)d.style.setProperty("--dw",w);
  /* solo se serve: cambiare la classe anche senza differenze riattivava l'osservatore e ripartiva all'infinito */
  if(!d.classList.contains("ind"))d.classList.add("ind")}
var q=0;
function all(){q=0;[].forEach.call(document.querySelectorAll(".dsel"),place)}
function sched(){if(!q)q=requestAnimationFrame(all)}
var mo=new MutationObserver(sched);
[].forEach.call(document.querySelectorAll(".dsel"),function(d){mo.observe(d,{childList:true,subtree:true,attributes:true,attributeFilter:["class","hidden"]})});
addEventListener("resize",sched);
if(window.ResizeObserver){var ro=new ResizeObserver(sched);[].forEach.call(document.querySelectorAll(".dsel"),function(d){ro.observe(d)})}
[].forEach.call(document.querySelectorAll(".tabr"),function(r){r.addEventListener("change",function(){setTimeout(sched,60)})});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sched);
sched();
/* pillola della barra: segue l'etichetta attiva, con le icone che scorrono al loro posto */
var bar=document.querySelector(".tabbar"),labs=bar?[].slice.call(bar.querySelectorAll("label")):[],prev=[];
function active(){var r=document.querySelector(".tabr:checked");return r&&bar.querySelector('label[for="'+r.id+'"]')}
function pill(animate){
  var a=active();if(!a||!a.offsetWidth)return;
  var now=labs.map(function(l){return l.offsetLeft});
  if(animate&&prev.length&&!reduce.matches)labs.forEach(function(l,k){var dx=prev[k]-now[k];if(Math.abs(dx)>.5)try{l.animate([{transform:"translateX("+dx+"px)"},{transform:"none"}],{duration:420,easing:getComputedStyle(document.documentElement).getPropertyValue("--spring").trim()||"cubic-bezier(.2,1.3,.35,1)"})}catch(e){}});
  bar.style.setProperty("--tbl",a.offsetLeft+"px");bar.style.setProperty("--tbw",a.offsetWidth+"px");prev=now}
if(bar){
  [].forEach.call(document.querySelectorAll(".tabr"),function(r){r.addEventListener("change",function(){pill(true)})});
  if(window.ResizeObserver)new ResizeObserver(function(){pill(false)}).observe(bar);
  addEventListener("resize",function(){pill(false)});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){pill(false)});
  pill(false)}
/* il totale dei costi sale fino al valore */
var cd=document.getElementById("cdonut"),lastT=0;
function count(){
  if(reduce.matches||!cd)return;var b=cd.querySelector(".chero b");if(!b||!b.offsetParent)return;
  var txt=b.textContent,m=/^([\d.]+)(?:,(\d+))?\s*€$/.exec(txt.replace(/\s/g,""));if(!m)return;
  var to=parseFloat(m[1].replace(/\./g,"")+"."+(m[2]||"0")),dec=m[2]?m[2].length:0,t0=performance.now(),dur=900;
  (function f(t){var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);b.textContent=(to*e).toLocaleString("it-IT",{minimumFractionDigits:dec,maximumFractionDigits:dec})+" €";if(p<1)requestAnimationFrame(f);else b.textContent=txt})(t0);
  }
var tc=document.getElementById("t-costi");
if(tc)tc.addEventListener("change",function(){if(tc.checked)setTimeout(function(){if(Date.now()-lastT>600){lastT=Date.now();count()}},120)});
/* arrivo da un'altra città: la scheda colorata resta un attimo con lo skyline, poi si dissolve */
var zi=window.__zin;if(zi&&zi.parentNode){try{var zs=window.zSky&&zSky(zi.getAttribute("data-id"));if(zs)zi.querySelector(".zcol").appendChild(zs)}catch(e){}
setTimeout(function(){if(zi.parentNode)zi.className="zov out"},400);setTimeout(function(){if(zi.parentNode)zi.remove()},1000)}
/* a schermo fermo da qualche secondo le animazioni senza fine (nuvole, scintille, icone) si fermano; tornano al primo tocco */
var idleT=0,held=[],lastTouch=0;
function holdAnims(){try{document.getAnimations().forEach(function(a){var t=a.effect&&a.effect.getComputedTiming?a.effect.getComputedTiming():null;if(t&&t.iterations===Infinity&&a.playState==="running"){a.pause();held.push(a)}})}catch(e){}}
function wakeAnims(){var n=Date.now();if(!held.length&&n-lastTouch<1500)return;lastTouch=n;if(held.length){held.forEach(function(a){try{a.play()}catch(e){}});held=[]}clearTimeout(idleT);idleT=setTimeout(holdAnims,12000)}
["pointerdown","pointermove","keydown","touchstart","wheel"].forEach(function(e){addEventListener(e,wakeAnims,{passive:true,capture:true})});
addEventListener("scroll",wakeAnims,{passive:true,capture:true});
document.addEventListener("visibilitychange",function(){if(document.hidden){clearTimeout(idleT);holdAnims()}else wakeAnims()});
[].forEach.call(document.querySelectorAll(".tabr"),function(r){r.addEventListener("change",function(){lastTouch=0;wakeAnims()})});
wakeAnims();
})();
