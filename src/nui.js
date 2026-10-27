/* ===== avvisi dentro l'app: una forma diversa per ogni tipo =====
   volo → biglietto · alloggio, riepilogo, lista → isola · tappe e pasti → banner con campanella
   conferme → toast con tempo · timbro della città → timbro sul passaporto.
   Se qualcosa va storto, chi chiama ricade sul vecchio toast. */
(function(){
var rm=matchMedia("(prefers-reduced-motion: reduce)"),host=null;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ic(p,f){return '<svg viewBox="0 0 24 24" aria-hidden="true" class="'+(f?"nf":"ns")+'"><path d="'+p+'"/></svg>'}
var P={plane:'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z',
pin:'M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
bell:'M6 17h12l-1.6-2.4V10a4.4 4.4 0 0 0-8.8 0v4.6zM10 20a2 2 0 0 0 4 0',
fork:'M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2.5 5-2 8h2v10',
bed:'M3 19v-8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8M3 15h18',
sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
list:'M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2',
check:'M5 12.5l4.5 4.5L19 7.5'};
var KIND={vol:["ticket","plane"],alloggio:["isola","bed"],riep:["isola","sun"],lista:["isola","list"],tappe:["banner","pin"],pasti:["banner","fork"],test:["banner","bell"]};
function clean(t){return String(t||"").replace(/^[^\p{L}\p{N}]+\s*/u,"")}
function vib(p){try{if(!rm.matches&&navigator.vibrate)navigator.vibrate(p)}catch(e){}}
function getHost(){if(host&&host.isConnected)return host;host=document.createElement("div");host.id="nui";host.setAttribute("role","region");host.setAttribute("aria-label","Avvisi");host.setAttribute("aria-live","polite");document.body.appendChild(host);
 host.addEventListener("click",function(e){if(host.children.length>1&&!e.target.closest(".nui-ok,.nui-r")){host.classList.toggle("fan");stack()}});return host}
/* pila: più avvisi insieme si sovrappongono con un contatore, un tocco li apre a ventaglio */
function stack(){var h=getHost(),n=h.children.length;h.classList.toggle("stk",n>1);if(n<2)h.classList.remove("fan");
 [].forEach.call(h.querySelectorAll(".nui-n"),function(b){b.textContent=n});
 [].forEach.call(h.children,function(c,i){if(i)c.style.setProperty("--ov",(-Math.max(20,c.offsetHeight-14*i))+"px")})}
function close(el,dx){if(!el||el._gone)return;el._gone=1;clearTimeout(el._t);
 if(dx!=null)el.style.setProperty("--dx",dx>0?"118%":"-118%");
 var k=el.dataset.k;if(k==="isola")el.classList.remove("open");
 setTimeout(function(){el.classList.add("out");stack()},k==="isola"?650:0);
 setTimeout(function(){el.remove();stack()},k==="isola"?1400:k==="ticket"?1300:650)}
function arm(el,ms){clearTimeout(el._t);el._t=setTimeout(function(){close(el)},ms)}
function swipe(el){var x0=null,dx=0;
 el.addEventListener("pointerdown",function(e){if(e.target.closest("button"))return;x0=e.clientX;dx=0;clearTimeout(el._t);el.style.transition="none"});
 el.addEventListener("pointermove",function(e){if(x0==null)return;dx=e.clientX-x0;if(Math.abs(dx)>6)el.style.transform="translateX("+dx+"px)"});
 function end(){if(x0==null)return;x0=null;el.style.transition="";if(Math.abs(dx)>70){el.style.transform="";close(el,dx)}else{el.style.transform="";arm(el,2600)}}
 el.addEventListener("pointerup",end);el.addEventListener("pointercancel",end)}
function routeOf(id){var c=window.PAR&&PAR.cfg;if(!c||!c.fromCode||!c.to)return"";var r=/:vr$/.test(id||"");return(r?c.to:c.fromCode)+" → "+(r?c.fromCode:c.to)}
function build(kind,ico,title,body,id){
 var t=esc(clean(title)),b=esc(body||""),I=ic(P[ico],ico==="plane");
 if(kind==="ticket"){var lbl=/:vr$/.test(id||"")?"Volo di ritorno":"Volo";var r=routeOf(id);
  return '<div class="nui-l"><div class="nui-lb">'+lbl+(r?" · "+esc(r):"")+'</div><b>'+t+'</b>'+(b?'<span>'+b+'</span>':'')+'<div class="nui-trk"><i>'+ic(P.plane,1)+'</i></div></div><button type="button" class="nui-r" aria-label="Chiudi l\'avviso">'+ic(P.plane,1)+'<em>Ok</em></button><span class="nui-n"></span>'}
 if(kind==="isola")return '<div class="nui-hd"><span class="nui-si">'+I+'</span><b>'+t+'</b></div><div class="nui-bd"><div>'+(b?'<p>'+b+'</p>':'')+'<button type="button" class="nui-ok">Ok</button></div></div><span class="nui-n"></span>';
 return '<div class="nui-ic">'+I+'</div><div class="nui-tx"><b>'+t+'</b>'+(b?'<span>'+b+'</span>':'')+'</div><span class="nui-tm">ora</span><span class="nui-n"></span>'}
function show(type,title,body,id){
 var k=KIND[type]||KIND.test,h=getHost(),el=document.createElement("div");
 el.className="nui-c nui-"+k[0];el.dataset.k=k[0];el.setAttribute("role","status");el.innerHTML=build(k[0],k[1],title,body,id);
 while(h.children.length>=3)h.lastElementChild.remove();
 h.insertBefore(el,h.firstChild);stack();swipe(el);
 var ok=el.querySelector(".nui-ok,.nui-r");if(ok)ok.addEventListener("click",function(e){e.stopPropagation();close(el,1)});
 void el.offsetWidth;el.classList.add("in");
 if(k[0]==="isola")setTimeout(function(){if(!el._gone){el.classList.add("open");setTimeout(stack,700)}},rm.matches?0:550);
 setTimeout(stack,720);setTimeout(stack,1300);
 arm(el,k[0]==="ticket"?12000:k[0]==="isola"?9000:7000);
 if(type==="vol")vib(16);else if(type!=="riep")vib(8);
 return true}
/* toast con tempo: la barra si consuma, tenendo premuto si ferma */
var tt=null;
function toast(msg){if(!msg)return false;
 if(!tt||!tt.isConnected){tt=document.createElement("div");tt.className="nui-t";tt.setAttribute("role","status");tt.setAttribute("aria-live","polite");document.body.appendChild(tt);
  var stop=function(){tt.classList.add("hold")},go=function(){tt.classList.remove("hold");if(rm.matches)tt._r=setTimeout(hide,2600)};
  tt.addEventListener("pointerdown",function(){stop();clearTimeout(tt._r)});tt.addEventListener("pointerup",go);tt.addEventListener("pointercancel",go);
  tt.addEventListener("animationend",function(e){if(e.animationName==="nuiDrain")hide()})}
 function hide(){tt.classList.remove("on")}
 tt.innerHTML=ic(P.check)+'<span>'+esc(msg)+'</span><u></u>';tt.classList.remove("hold");
 tt.classList.remove("on");void tt.offsetWidth;tt.classList.add("on");clearTimeout(tt._r);if(rm.matches)tt._r=setTimeout(hide,2600);return true}
/* timbro sul passaporto */
function stamp(o){var d=document.createElement("div");d.className="nui-s";d.setAttribute("role","status");
 var cf="",c=["var(--ga)","#d9a441","#2f8f83","#5aa05a"];for(var k=0;k<14;k++)cf+='<i style="--a:'+Math.round(k*360/14)+'deg;--d:'+(70+(k%3)*22)+'px;--c:'+c[k%4]+'"></i>';
 d.innerHTML='<div class="nui-dm"></div><div class="nui-cd"><div class="nui-stp"><span class="nui-ink"></span><svg viewBox="0 0 112 112" aria-hidden="true"><circle cx="56" cy="56" r="50" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="56" cy="56" r="42" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 4"/><text x="56" y="54" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="800" font-size="26" fill="currentColor">'+esc(o.code)+'</text><text x="56" y="74" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="600" font-size="11" fill="currentColor" letter-spacing="1.5">'+esc(o.date)+'</text></svg><div class="nui-cf">'+cf+'</div></div><div class="nui-sx"><h3>Timbro di '+esc(o.city)+'</h3><p>'+esc(o.sub||"Aggiunto al passaporto")+'</p></div></div>';
 document.body.appendChild(d);void d.offsetWidth;d.classList.add("in");
 setTimeout(function(){d.classList.add("tx")},rm.matches?0:1100);vib([20,50,20]);
 var done=function(){if(d._g)return;d._g=1;d.classList.remove("in");setTimeout(function(){d.remove()},rm.matches?0:600)};
 d.addEventListener("click",done);setTimeout(done,6500);return true}
window.VNUI={show:show,toast:toast,stamp:stamp,close:function(){[].slice.call((host&&host.children)||[]).forEach(function(e){close(e)})}};
})();
