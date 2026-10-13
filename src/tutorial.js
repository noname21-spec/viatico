/* tutorial: si apre al primo avvio e dalle Impostazioni */
(function(){
var KEY="via-tour",$=function(s){return document.querySelector(s)},red=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function seen(){try{return localStorage.getItem(KEY)==="1"}catch(e){return false}}
function mark(){try{localStorage.setItem(KEY,"1")}catch(e){}}
var PIN='<path d="M0 0C-17-22-20-30-20-36A20 20 0 1 1 20-36C20-30 17-22 0 0Z" fill="var(--tpin)"/><circle cy="-36" r="7" fill="var(--tbg)"/>';
var ART=[
/* 1 benvenuto: percorso che arriva a un pin */
'<svg viewBox="0 0 240 170" aria-hidden="true"><path d="M30 138C60 138 70 96 104 104S150 134 170 84" class="tr" /><circle cx="30" cy="138" r="8" class="td"/><g transform="translate(176 80) scale(1.5)">'+PIN+'</g><circle cx="204" cy="40" r="3" class="ts"/><circle cx="52" cy="48" r="2.4" class="ts"/><circle cx="120" cy="30" r="2" class="ts"/></svg>',
/* 2 città */
'<svg viewBox="0 0 240 170" aria-hidden="true"><g class="tc"><rect x="22" y="26" width="92" height="56" rx="14"/><rect x="126" y="26" width="92" height="56" rx="14"/><rect x="22" y="94" width="92" height="56" rx="14"/><rect x="126" y="94" width="92" height="56" rx="14" class="on"/></g><g class="tl"><path d="M36 62h32M140 62h40M36 130h44M140 130h30"/></g><g transform="translate(186 140) scale(.6)">'+PIN+'</g></svg>',
/* 3 itinerario */
'<svg viewBox="0 0 240 170" aria-hidden="true"><path d="M60 26V146" class="tr"/><g class="td2"><circle cx="60" cy="34" r="9"/><circle cx="60" cy="86" r="9"/><circle cx="60" cy="138" r="9"/></g><g class="tc"><rect x="86" y="18" width="130" height="32" rx="12"/><rect x="86" y="70" width="130" height="32" rx="12" class="on"/><rect x="86" y="122" width="130" height="32" rx="12"/></g><g class="tl"><path d="M98 34h60M98 86h82M98 138h50"/></g></svg>',
/* 4 mappa */
'<svg viewBox="0 0 240 170" aria-hidden="true"><rect x="22" y="16" width="196" height="138" rx="20" class="tm"/><path d="M22 110C70 90 110 130 218 96" class="tw"/><path d="M52 132L100 78L150 98L186 44" class="tr2"/><circle cx="52" cy="132" r="7" class="td"/><circle cx="150" cy="98" r="14" class="tg"/><circle cx="150" cy="98" r="6" class="tb"/><g transform="translate(186 50) scale(.9)">'+PIN+'</g></svg>',
/* 5 offline, tutto tuo */
'<svg viewBox="0 0 240 170" aria-hidden="true"><g class="tc"><rect x="46" y="18" width="148" height="134" rx="18"/></g><g class="tk"><rect x="66" y="40" width="18" height="18" rx="6" class="on"/><rect x="66" y="74" width="18" height="18" rx="6" class="on"/><rect x="66" y="108" width="18" height="18" rx="6"/></g><g class="tl"><path d="M96 49h64M96 83h78M96 117h52"/></g><path d="M71 49l4 4 7-8M71 83l4 4 7-8" class="tcheck"/><g transform="translate(196 36)"><circle r="20" class="tg"/><path d="M-9-1L-2 6L10-8" class="tcheck2"/></g></svg>'];
var S=[["Benvenuto in Viaticum","Il necessario per il viaggio, sempre con te. Ti basta scegliere dove andare: all'itinerario pensiamo noi."],
["Scegli la città","Tocca una delle città europee, poi inserisci date, voli e alloggio. Se parti e torni in giornata o resti più notti, l'app si adatta."],
["Un itinerario su misura","Orari, tappe, pasti e mezzi già in ordine. Scegli lo stile (culturale, enogastronomico o un po' di tutto) e il ritmo, tranquillo o intenso."],
["Mappa e posizione","Vedi le tappe sulla mappa e il percorso a piedi o con i mezzi. Se vuoi, la tua posizione in tempo reale e la bussola ti portano alla prossima tappa."],
["Tutto offline, tutto tuo","Funziona anche senza internet. Costi, spese, check-list e documenti restano sul tuo telefono. Puoi cambiare il viaggio quando vuoi."]];
var el=null,idx=0,done=null,last=null;
function close(ok){if(!el)return;mark();var e=el;el=null;e.classList.remove("on");e.classList.add("bye");document.removeEventListener("keydown",key,true);setTimeout(function(){e.remove();if(last&&last.focus)try{last.focus()}catch(x){}if(ok&&done)done();done=null},red?0:320)}
function key(e){if(e.key==="Escape"){e.stopPropagation();close(true)}else if(e.key==="ArrowRight")go(idx+1);else if(e.key==="ArrowLeft")go(idx-1)}
function go(i){if(!el||i<0)return;if(i>=S.length){close(true);return}idx=i;var t=el.querySelector(".tt");t.scrollTo?t.scrollTo({left:i*t.clientWidth,behavior:red?"auto":"smooth"}):t.scrollLeft=i*t.clientWidth;paint()}
function paint(){[].forEach.call(el.querySelectorAll(".td3"),function(d,i){d.classList.toggle("on",i===idx)});var n=el.querySelector(".tn");n.textContent=idx===S.length-1?"Inizia":"Avanti";el.querySelector(".tp").hidden=idx===0;el.querySelector(".tskip").style.visibility=idx===S.length-1?"hidden":"visible"}
function open(cb){if(el)return;done=cb||null;last=document.activeElement;idx=0;
el=document.createElement("div");el.className="tour";el.tabIndex=-1;el.setAttribute("role","dialog");el.setAttribute("aria-modal","true");el.setAttribute("aria-label","Come funziona Viaticum");
el.innerHTML='<button type="button" class="tskip">Salta</button><div class="tt">'+S.map(function(s,i){return '<section class="ts2" aria-label="'+(i+1)+' di '+S.length+'"><div class="ta">'+ART[i]+'</div><h2>'+s[0]+'</h2><p>'+s[1]+'</p></section>'}).join("")+'</div><div class="tf"><div class="tdots">'+S.map(function(){return '<i class="td3"></i>'}).join("")+'</div><div class="tbt"><button type="button" class="tp" hidden>Indietro</button><button type="button" class="tn">Avanti</button></div></div>';
document.body.appendChild(el);
el.querySelector(".tskip").addEventListener("click",function(){close(true)});
el.querySelector(".tn").addEventListener("click",function(){go(idx+1)});
el.querySelector(".tp").addEventListener("click",function(){go(idx-1)});
var t=el.querySelector(".tt"),tm=0;t.addEventListener("scroll",function(){clearTimeout(tm);tm=setTimeout(function(){var i=Math.round(t.scrollLeft/t.clientWidth);if(i!==idx){idx=i;paint()}},60)},{passive:true});
document.addEventListener("keydown",key,true);paint();requestAnimationFrame(function(){requestAnimationFrame(function(){if(el){el.classList.add("on");el.focus({preventScroll:true})}})})}
window.viaTour={open:open,seen:seen};
var b=$("#shtour");if(b)b.addEventListener("click",function(){var s=$("#sheet");if(s){s.classList.remove("on");s.setAttribute("aria-hidden","true")}setTimeout(function(){open()},s?250:0)});
})();
