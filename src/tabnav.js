/* ===== barra delle sezioni: Home · pulsante centrale che si sfoglia · menu ===== */
(function(){
var bar=document.querySelector(".tabbar");if(!bar)return;
var rs=[].slice.call(document.querySelectorAll(".tabr")),labs=rs.map(function(r){return bar.querySelector('label[for="'+r.id+'"]')});
if(!rs.length||labs.some(function(l){return!l}))return;
var NAMES=["Tappe","Voli","Mappa","Pasti","Costi","Consigli"],ICO=labs.map(function(l){var e=l.querySelector(".em");return e?e.innerHTML:""});
var $=function(s,r){return(r||document).querySelector(s)};
function curI(){for(var i=0;i<rs.length;i++)if(rs[i].checked)return i;return 0}
function setI(i){var r=rs[(i+rs.length)%rs.length];if(r.checked)return;r.checked=true;r.dispatchEvent(new Event("change",{bubbles:true}))}
function clk(s){var b=$(s);if(b){b.click();return true}return false}
function srch(){clk("#gsb")}
/* l'azione giusta per ogni sezione */
function act(i){
 if(i===0){var a=$("#detail a.go");if(a)return{e:"🧭",t:"Portami lì",f:function(){var h=$("#detail a.go");if(h)window.open(h.href,"_blank","noopener")}};return{e:"🔎",t:"Cerca nel viaggio",f:srch}}
 if(i===1)return{e:"✈️",t:"Modifica i voli",f:function(){clk('[data-edit="1"]')||srch()}};
 if(i===2){var l=$("#loc");return l&&!l.hidden?{e:"📍",t:"Dove sono",f:function(){l.click()}}:{e:"🔎",t:"Cerca un luogo",f:srch}}
 if(i===3)return{e:"🔎",t:"Cerca un locale",f:srch};
 if(i===4)return{e:"＋",t:"Aggiungi spesa",f:function(){clk("#sadd")}};
 return{e:"🔎",t:"Cerca un consiglio",f:srch}}
function lab(i){var a=act(((i%6)+6)%6);return a.e+" "+a.t}
/* costruzione */
bar.classList.add("tb2");
var home=document.createElement("button");home.type="button";home.className="tbh";home.setAttribute("aria-label","Tutti i viaggi: torna alla pagina principale");
home.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/></svg>';
var menu=document.createElement("button");menu.type="button";menu.className="tbm";menu.setAttribute("aria-label","Tutte le sezioni");menu.setAttribute("aria-haspopup","dialog");
menu.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14"/></svg>';
var pill=document.createElement("div");pill.className="tbact";pill.setAttribute("role","group");pill.setAttribute("tabindex","0");pill.setAttribute("aria-label","Azione della sezione. Scorri a sinistra o a destra per cambiare sezione");
pill.innerHTML='<i class="tbc l" aria-hidden="true">‹</i><span class="tbo" aria-hidden="true">'+rs.map(function(){return"<i></i>"}).join("")+'</span><div class="tbv"><div class="tbt"><b></b><b></b><b></b></div></div><i class="tbc r" aria-hidden="true">›</i>';
var ind=$(".tbind",bar);if(ind)pill.insertBefore(ind,pill.firstChild);
bar.insertBefore(home,bar.firstChild);bar.insertBefore(pill,home.nextSibling);bar.insertBefore(menu,pill.nextSibling);
var trk=$(".tbt",pill),lbs=trk.querySelectorAll("b"),dots=pill.querySelectorAll(".tbo i"),chv=pill.querySelectorAll(".tbc");
function render(){var c=curI();lbs[0].textContent=lab(c-1);lbs[1].textContent=lab(c);lbs[2].textContent=lab(c+1);[].forEach.call(dots,function(d,i){d.classList.toggle("on",i===c)});pill.setAttribute("data-sec",NAMES[c])}
/* foglio con tutte le sezioni */
var sh=document.createElement("div");sh.className="tbsh";sh.hidden=true;sh.setAttribute("role","dialog");sh.setAttribute("aria-label","Sezioni del viaggio");
sh.innerHTML='<div class="tbp"><i class="tbg" aria-hidden="true"></i><div class="tbgr">'+rs.map(function(r,i){return'<button type="button" data-i="'+i+'"><b class="em">'+ICO[i]+'</b><span>'+NAMES[i]+'</span></button>'}).join("")+'</div></div>';
document.body.appendChild(sh);
function shOpen(on){sh.hidden=!on;if(on){[].forEach.call(sh.querySelectorAll("button"),function(b){var e=labs[+b.dataset.i].querySelector(".em"),t=b.querySelector(".em");if(e&&t&&e.innerHTML)t.innerHTML=e.innerHTML});[].forEach.call(sh.querySelectorAll("button"),function(b){b.classList.toggle("on",+b.dataset.i===curI())});sh.classList.remove("in");void sh.offsetWidth;sh.classList.add("in")}}
menu.addEventListener("click",function(){shOpen(sh.hidden)});
sh.addEventListener("click",function(e){var b=e.target.closest("button[data-i]");if(b){shOpen(false);setI(+b.dataset.i);return}if(e.target===sh)shOpen(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!sh.hidden)shOpen(false)});
home.addEventListener("click",function(){var h=$("#ahome");if(h)h.click()});
/* il pulsante si trascina: a sinistra e a destra cambia sezione */
var sx=null,dx=0,drag=0,busy=0,t0=0,W=150;
function mv(x){trk.style.transform="translateX("+x+"px)"}
function settle(d){busy=1;W=pill.clientWidth;trk.style.transition="transform .28s cubic-bezier(.2,1,.3,1)";mv(-d*W);
 setTimeout(function(){trk.style.transition="none";setI(curI()+d);render();mv(0);[].forEach.call(chv,function(c){c.classList.add("gone")});try{localStorage.setItem("via-tbhint","1")}catch(e){}busy=0;if(navigator.vibrate)try{navigator.vibrate(8)}catch(e){}},290)}
function back(){trk.style.transition="transform .3s cubic-bezier(.2,1.3,.4,1)";mv(0)}
bar.addEventListener("pointerdown",function(e){if(busy||e.target.closest(".tbh,.tbm"))return;sx=e.clientX;dx=0;drag=0;t0=Date.now();W=pill.clientWidth;trk.style.transition="none";try{bar.setPointerCapture(e.pointerId)}catch(x){}});
bar.addEventListener("pointermove",function(e){if(sx==null)return;dx=e.clientX-sx;if(Math.abs(dx)>6)drag=1;if(drag)mv(dx)});
function end(){if(sx==null)return;var v=Math.abs(dx)/Math.max(1,Date.now()-t0);sx=null;if(!drag)return;if(Math.abs(dx)>W*.22||(v>.45&&Math.abs(dx)>14))settle(dx<0?1:-1);else back()}
bar.addEventListener("pointerup",end);bar.addEventListener("pointercancel",function(){if(sx!=null){sx=null;back()}});
bar.addEventListener("click",function(e){if(e.target.closest(".tbh,.tbm"))return;if(drag){drag=0;e.stopPropagation();return}if(e.target.closest(".tbact")){var a=act(curI());try{a.f()}catch(x){}}},true);
pill.addEventListener("keydown",function(e){if(busy)return;if(e.key==="ArrowRight")settle(1);else if(e.key==="ArrowLeft")settle(-1);else if(e.key==="Enter"||e.key===" "){e.preventDefault();var a=act(curI());try{a.f()}catch(x){}}});
rs.forEach(function(r){r.addEventListener("change",render)});window.addEventListener("voli",function(){setTimeout(render,60)});
setInterval(function(){if(!document.hidden)render()},4000);
/* un cenno all'inizio fa capire che si trascina */
var seen=false;try{seen=!!localStorage.getItem("via-tbhint")}catch(e){}
if(seen)[].forEach.call(chv,function(c){c.classList.add("gone")});
else{var n=0;setTimeout(function hn(){if(n++>=2||pill.querySelector(".tbc.gone"))return;if(!document.hidden&&!busy&&sx==null&&!document.body.classList.contains("tbmin")){trk.style.transition="transform .45s cubic-bezier(.2,1.3,.4,1)";mv(-24);setTimeout(function(){if(sx==null)back()},320)}setTimeout(hn,3000)},2500)}
render();
})();
