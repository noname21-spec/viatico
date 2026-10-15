/* guide rapide: schermata principale e scheda del viaggio, solo la prima volta; si rivedono dalle Impostazioni */
(function(){
var $=function(s){return document.querySelector(s)},rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var KEY={home:"via-coach-home",trip:"via-coach-trip"},act=null;
function got(k){try{return localStorage.getItem(KEY[k])==="1"}catch(e){return false}}
function mark(k){try{localStorage.setItem(KEY[k],"1")}catch(e){}}
function homeOn(){var d=$("#dest");return !!d&&d.classList.contains("on")&&!d.classList.contains("pick")}
var STEPS={
home:function(){var tr=($("#dhc")||{}).dataset&&$("#dhc").dataset.mode==="trip";return[
 ["#dhc",tr?"Il tuo prossimo viaggio":"Le città del momento",tr?"Toccalo per aprirlo. Tienilo premuto: compaiono Apri ed Elimina, scorri il dito su una voce e rilascia per sceglierla.":"Scorri le mete del momento e tocca una città per aprire la sua guida."],
 ["#dopen","Apri o pianifica","Da qui apri il viaggio in programma o ne crei uno nuovo: scegli la città e le date, al resto penso io."],
 ["#dmy","I miei viaggi","L'elenco di tutti i tuoi viaggi, quelli in programma e quelli già fatti."],
 ["#dsb","Sorprendimi","Non sai dove andare? Ti propongo una meta nuova."],
 ["#dgear","Impostazioni","Notifiche, tema, mappa offline e questa guida, che puoi rivedere quando vuoi."]]},
trip:function(){return[
 ["#ahome","Torna ai viaggi","Ti riporta alla pagina principale con tutti i tuoi viaggi."],
 ["#gsb","Cerca nel viaggio","Trova al volo una tappa, un locale, un consiglio o una spesa."],
 ["#wx","Meteo di adesso","Tocca per vedere le previsioni dei prossimi giorni."],
 [".tabbar","La barra delle sezioni","Toccala per l'azione della sezione (Portami lì, Aggiungi spesa). Trascinala di lato per cambiare sezione. Tienila premuta per aprire il ventaglio con tutte le sezioni e la Home."]]}};
function vis(el){if(!el)return null;var r=el.getBoundingClientRect();if(r.width<4||r.height<4||r.bottom<0||r.top>innerHeight)return null;var cs=getComputedStyle(el);if(cs.visibility==="hidden"||cs.display==="none")return null;return r}
function run(k,force){if(act||!STEPS[k])return false;
 var all=STEPS[k](),st=all.filter(function(s){var e=$(s[0]);if(e)try{e.scrollIntoView({block:"nearest"})}catch(x){}return vis($(s[0]))});if(!st.length)return false;
 var i=0,el=document.createElement("div");el.className="cch";el.setAttribute("role","dialog");el.setAttribute("aria-modal","true");el.setAttribute("aria-label","Guida rapida");
 el.innerHTML='<i class="ccs"></i><div class="ccb" tabindex="-1"><b class="cct"></b><p class="ccp"></p><div class="ccf"><div class="ccd">'+st.map(function(){return"<i></i>"}).join("")+'</div><button type="button" class="ccx">Salta</button><button type="button" class="ccn">Avanti</button></div></div>';
 document.body.appendChild(el);act={el:el,k:k};
 var sp=el.querySelector(".ccs"),bx=el.querySelector(".ccb");
 function place(){var s=st[i],t=$(s[0]),r=vis(t);if(!r){if(i<st.length-1){i++;place();return}fin();return}
  var pad=7,cs=getComputedStyle(t),br=parseFloat(cs.borderTopLeftRadius)||14;if(r.width>innerWidth-8)r={left:4,top:r.top,width:innerWidth-8,height:r.height,right:innerWidth-4,bottom:r.bottom};
  sp.style.cssText="left:"+(r.left-pad)+"px;top:"+(r.top-pad)+"px;width:"+(r.width+pad*2)+"px;height:"+(r.height+pad*2)+"px;border-radius:"+Math.min(60,br+pad)+"px";
  el.querySelector(".cct").textContent=s[1];el.querySelector(".ccp").textContent=s[2];
  [].forEach.call(el.querySelectorAll(".ccd i"),function(d,n){d.classList.toggle("on",n===i)});
  el.querySelector(".ccn").textContent=i===st.length-1?"Fine":"Avanti";el.querySelector(".ccx").hidden=i===st.length-1;
  var bh=bx.offsetHeight,below=innerHeight-(r.bottom+pad),top=below>=bh+20?r.bottom+pad+12:Math.max(12,r.top-pad-bh-12);if(below<bh+20&&r.top-pad-bh-12<12)top=Math.max(12,Math.min(innerHeight-bh-12,r.bottom-bh-12));
  bx.style.top=top+"px";}
 function fin(){mark(k);document.removeEventListener("keydown",key,true);window.removeEventListener("resize",place);var o=el;act=null;if(o.animate&&!rm){var a=o.animate([{opacity:1},{opacity:0}],{duration:180,fill:"forwards"});a.onfinish=function(){o.remove()}}else o.remove()}
 function nx(){if(i>=st.length-1){fin();return}i++;place()}
 function key(e){if(e.key==="Escape"){e.preventDefault();fin()}else if(e.key==="Enter"||e.key==="ArrowRight"){e.preventDefault();nx()}else if(e.key==="ArrowLeft"&&i>0){e.preventDefault();i--;place()}}
 el.querySelector(".ccn").addEventListener("click",function(e){e.stopPropagation();nx()});
 el.querySelector(".ccx").addEventListener("click",function(e){e.stopPropagation();fin()});
 el.addEventListener("click",function(e){if(!e.target.closest(".ccb"))nx()});
 document.addEventListener("keydown",key,true);window.addEventListener("resize",place);
 place();requestAnimationFrame(function(){el.classList.add("on");bx.focus({preventScroll:true})});return true}
window.VCoach={run:run,got:got,reset:function(){Object.keys(KEY).forEach(function(k){try{localStorage.removeItem(KEY[k])}catch(e){}})}};
/* avvio automatico la prima volta */
var ok=0,pk="";
function busy(){return act||$(".tour")||$("#sheet.on")||$(".tkm")||$("#gs.on")||document.querySelector(".zin.on")}
function tour(){try{return localStorage.getItem("via-tour")==="1"}catch(e){return true}}
function tick(){if(got("home")&&got("trip")){clearInterval(iv);return}
 if(busy()||!tour()||document.hidden){ok=0;return}
 var k=homeOn()?"home":(!$("#dest")||$("#dest").getAttribute("aria-hidden")==="true")&&vis($(".tabbar"))?"trip":"";
 if(!k||got(k)){ok=0;return}
 if(k!==pk){pk=k;ok=1;return}
 if(++ok>=2){ok=0;run(k)}}
var iv=navigator.webdriver?0:setInterval(tick,1300);
/* rivedi dalle Impostazioni */
var row=$("#shcoach");if(row)row.addEventListener("click",function(){var s=$("#sheet");var k=homeOn()?"home":"trip";if(s){s.classList.remove("on");s.setAttribute("aria-hidden","true")}setTimeout(function(){run(k,true)},260)});
})();
