/* ===== barra delle sezioni: tre sezioni · tasto azione al centro · tre sezioni ===== */
(function(){
var rs=[].slice.call(document.querySelectorAll(".tabr"));if(rs.length<5)return;
var FULL=["Itinerario","Mappa","Pasti","Costi","Consigli"],SHORT=["Tappe","Mappa","Pasti","Costi","Consigli"];
var $=function(s,r){return(r||document).querySelector(s)};
function svg(d,w){return '<svg viewBox="0 0 24 24" width="'+(w||24)+'" height="'+(w||24)+'" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"/></svg>'}
var IC=["M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z","M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14","M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M7 3v2M11 3v2","M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15 9.5a3.5 3 0 0 0-6 1.5v2a3.5 3 0 0 0 6 1.5M7.5 11h5M7.5 13h5","M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"];
var AI={"🧭":"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z","🔎":"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4.5 4.5","📍":"M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z","＋":"M12 5v14M5 12h14"};
function curI(){for(var i=0;i<rs.length;i++)if(rs[i].checked)return i;return 0}
function setI(i){var r=rs[(i+rs.length)%rs.length];if(r.checked)return;r.checked=true;r.dispatchEvent(new Event("change",{bubbles:true}))}
function clk(s){var b=$(s);if(b){b.click();return true}return false}
function srch(){clk("#gsb")}
/* l'azione giusta per ogni sezione */
function act(i){
 if(i===0){var a=$("#detail a.go");if(a)return{e:"🧭",t:"Portami lì",f:function(){var h=$("#detail a.go");if(h)window.open(h.href,"_blank","noopener")}};return{e:"🔎",t:"Cerca nel viaggio",f:srch}}
 if(i===1){var l=$("#loc");return l&&!l.hidden?{e:"📍",t:"Dove sono",f:function(){l.click()}}:{e:"🔎",t:"Cerca un luogo",f:srch}}
 if(i===2)return{e:"🔎",t:"Cerca un locale",f:srch};
 if(i===3)return{e:"＋",t:"Aggiungi spesa",f:function(){clk("#sadd")}};
 return{e:"🔎",t:"Cerca un consiglio",f:srch}}
/* costruzione */
var old=$(".tabbar");if(old)old.setAttribute("aria-hidden","true");
var bar=document.createElement("nav");bar.className="nbar";bar.setAttribute("aria-label","Sezioni");
function tab(i){return '<button type="button" class="nt" data-i="'+i+'" aria-label="'+FULL[i]+'">'+svg(IC[i])+'<span>'+SHORT[i]+'</span></button>'}
bar.innerHTML='<div class="nrow"><i class="nind" aria-hidden="true"></i>'+tab(0)+tab(1)+tab(2)+tab(3)+tab(4)+'</div><button type="button" class="nfab"><span class="nfi"></span><span class="nfc"></span></button><div class="nmenu" hidden role="menu"><button type="button" role="menuitem" data-m="s">'+svg(AI["🔎"],20)+'Cerca nel viaggio</button><button type="button" role="menuitem" data-m="h">'+svg("M3.5 11 12 4l8.5 7M5.5 9.5V20h13V9.5M10 20v-5.5h4V20",20)+'Tutti i viaggi</button></div>';
document.body.appendChild(bar);
var row=$(".nrow",bar),ind=$(".nind",bar),tabs=[].slice.call(bar.querySelectorAll(".nt")),fab=$(".nfab",bar),fi=$(".nfi",bar),fc=$(".nfc",bar),menu=$(".nmenu",bar),lastI=-1,lastE="";
function place(){var c=curI(),b=tabs[c];if(!b||!b.offsetWidth)return;ind.style.width=b.offsetWidth-6+"px";ind.style.transform="translateX("+(b.offsetLeft+3)+"px)"}
function render(){var c=curI(),a=act(c);tabs.forEach(function(b,i){if(i===c)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});place();
 if(lastE!==a.e+a.t){lastE=a.e+a.t;fi.innerHTML=svg(AI[a.e]||AI["🔎"],22);fc.textContent=a.t;fab.setAttribute("aria-label",a.t);if(lastI!==-1&&lastI!==c){fab.classList.remove("pop");void fab.offsetWidth;fab.classList.add("pop")}}
 lastI=c;bar.setAttribute("data-sec",FULL[c])}
tabs.forEach(function(b){b.addEventListener("click",function(){var i=+b.dataset.i;if(i===curI()){var bl=document.getElementById(FULL[i]==="Itinerario"?"itinerario":rs[i].id.replace(/^t-/,""));if(bl&&bl.scrollTo)bl.scrollTo({top:0,behavior:"smooth"});return}setI(i)})});
/* tasto centrale: tocco = azione, pressione lunga = cerca o tutti i viaggi */
var lp=0,held=0;
function mOpen(on){menu.hidden=!on;fab.setAttribute("aria-expanded",on?"true":"false")}
fab.addEventListener("pointerdown",function(){held=0;clearTimeout(lp);lp=setTimeout(function(){held=1;mOpen(true);try{localStorage.setItem("via-tbhold","1")}catch(e){}if(navigator.vibrate)try{navigator.vibrate(14)}catch(e){}},450)});
["pointerup","pointercancel","pointerleave"].forEach(function(n){fab.addEventListener(n,function(){clearTimeout(lp)})});
fab.addEventListener("contextmenu",function(e){e.preventDefault()});
fab.addEventListener("click",function(){if(held){held=0;return}if(!menu.hidden){mOpen(false);return}var a=act(curI());try{a.f()}catch(x){}});
menu.addEventListener("click",function(e){var b=e.target.closest("button[data-m]");if(!b)return;mOpen(false);if(b.dataset.m==="s")srch();else clk("#shdest")||clk("#ahome")});
document.addEventListener("pointerdown",function(e){if(!menu.hidden&&!e.target.closest(".nmenu,.nfab"))mOpen(false)},true);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!menu.hidden)mOpen(false)});
rs.forEach(function(r){r.addEventListener("change",render)});
addEventListener("resize",place);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);
/* transizione, vibrazione e swipe tra le sezioni */
var prevI=curI();
rs.forEach(function(r){r.addEventListener("change",function(){var i=curI(),d=i>prevI?1:-1;prevI=i;try{if(navigator.vibrate)navigator.vibrate(8)}catch(e){}
if(matchMedia("(prefers-reduced-motion:reduce)").matches||document.documentElement.classList.contains("lite"))return;
var b=document.getElementById(r.id.replace(/^t-/,""));if(!b)return;b.classList.remove("bin-l","bin-r");void b.offsetWidth;b.classList.add(d>0?"bin-r":"bin-l");setTimeout(function(){b.classList.remove("bin-l","bin-r")},420)})});
(function(){var x0,y0,t0,ok=0;
function blocked(el){for(var n=el;n&&n!==document.body;n=n.parentNode){if(n.nodeType!==1)continue;var tg=n.tagName;if(tg==="INPUT"||tg==="SELECT"||tg==="TEXTAREA"||tg==="TABLE"||n.isContentEditable||n.hasAttribute("data-noswipe"))return 1;if(n.classList&&(n.classList.contains("leaflet-container")||n.classList.contains("nbar")))return 1;if(n.scrollWidth>n.clientWidth+4){var o=getComputedStyle(n).overflowX;if(o==="auto"||o==="scroll")return 1}}return 0}
function busy(){return document.querySelector("#setup.on,#sheet.on,#dest.on,#ask.on,#exp.on,.cch,.tour")}
document.addEventListener("touchstart",function(e){ok=0;if(e.touches.length!==1||busy()||!document.querySelector(".tabr:checked")||getComputedStyle(bar).display==="none")return;if(blocked(e.target))return;var t=e.touches[0];x0=t.clientX;y0=t.clientY;t0=Date.now();ok=1},{passive:true});
document.addEventListener("touchend",function(e){if(!ok)return;ok=0;var t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;if(Date.now()-t0>650||Math.abs(dx)<72||Math.abs(dy)>Math.abs(dx)*.5)return;var i=curI()+(dx<0?1:-1);if(i<0||i>=rs.length)return;setI(i)},{passive:true})})();
window.addEventListener("voli",function(){setTimeout(render,60)});
setInterval(function(){if(!document.hidden)render()},4000);
/* suggerimento la prima volta */
(function(){var k="via-tbcap3",s=false;try{s=!!localStorage.getItem(k)}catch(e){}if(s)return;var n=0,iv=setInterval(function(){if(++n>40){clearInterval(iv);return}var r=bar.getBoundingClientRect();if(r.width<10||document.hidden||document.querySelector(".cch,.tour"))return;clearInterval(iv);try{localStorage.setItem(k,"1")}catch(e){}var c=document.createElement("div");c.className="tbcap";c.innerHTML="<b>●</b> Il tasto in basso a destra cambia con la sezione. Tienilo premuto per cercare o tornare ai viaggi";document.body.appendChild(c);requestAnimationFrame(function(){c.classList.add("on")});setTimeout(function(){c.classList.remove("on");setTimeout(function(){c.remove()},300)},6000);c.addEventListener("click",function(){c.remove()})},1500)})();
render();
})();
