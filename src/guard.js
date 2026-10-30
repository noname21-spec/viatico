/* rete di sicurezza: se l'app non parte, invece di una pagina vuota compare una scheda con due tasti */
(function(){
var shown=0;
function show(){if(shown||window.__viaOK)return;shown=1;
 try{var d=document.createElement("div");d.id="crash";d.setAttribute("role","alertdialog");d.setAttribute("aria-label","Errore");
 d.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(20,16,14,.72);font:500 16px/1.45 Outfit,system-ui,sans-serif";
 d.innerHTML='<div style="max-width:380px;width:100%;box-sizing:border-box;padding:24px;border-radius:28px;background:#fff;color:#26221f;box-shadow:0 20px 50px rgba(0,0,0,.35)"><b style="display:block;font-size:22px;letter-spacing:-.02em;margin-bottom:8px">Qualcosa non è partito bene</b><p style="margin:0 0 18px;color:#6b645d">Succede di rado. Riprova: se il problema resta, puoi ripristinare i dati salvati su questo telefono (i viaggi non sincronizzati verranno cancellati).</p><button type="button" id="cr-r" style="display:block;width:100%;min-height:48px;margin-bottom:10px;border:0;border-radius:24px;background:#26221f;color:#fff;font:600 16px Outfit,system-ui,sans-serif">Riprova</button><button type="button" id="cr-x" style="display:block;width:100%;min-height:48px;border:0;border-radius:24px;background:#f1ece6;color:#26221f;font:600 16px Outfit,system-ui,sans-serif">Ripristina i dati e riparti</button></div>';
 (document.body||document.documentElement).appendChild(d);
 var r=d.querySelector("#cr-r"),x=d.querySelector("#cr-x"),sure=0;
 r.addEventListener("click",function(){location.reload()});
 x.addEventListener("click",function(){if(!sure){sure=1;x.textContent="Tocca ancora per cancellare i dati locali";x.style.background="#c0392b";x.style.color="#fff";return}
  try{var k=[],i;for(i=0;i<localStorage.length;i++){var n=localStorage.key(i);if(n&&n.indexOf("via-")===0)k.push(n)}k.forEach(function(n){localStorage.removeItem(n)})}catch(e){}
  try{sessionStorage.clear()}catch(e){}
  var p=[];try{if(window.caches)p.push(caches.keys().then(function(ks){return Promise.all(ks.map(function(c){return caches.delete(c)}))}))}catch(e){}
  try{if(navigator.serviceWorker)p.push(navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(s){return s.unregister()}))}))}catch(e){}
  Promise.all(p).then(function(){location.reload()},function(){location.reload()})})
 }catch(e){}}
window.addEventListener("error",function(e){if(window.__viaOK)return;var f=e&&e.filename;if(f&&f.indexOf(location.origin)!==0)return;setTimeout(show,1200)});
window.addEventListener("unhandledrejection",function(){});
setTimeout(show,7000);
})();

/* classi di stato al posto dei selettori :has() (più leggero per lo stile) */
(function(){var H=document.documentElement,B=document.body;function sync(){if(!B)B=document.body;if(!B)return;var dm=document.getElementById("dm");H.classList.toggle("k-dm",!!(dm&&dm.checked));
var r=document.querySelector(".tabr:checked"),cur=r?r.id:"";["t-itinerario","t-voli","t-mappa","t-mangiare","t-costi","t-consigli"].forEach(function(id){B.classList.toggle("k-"+id,id===cur)});
var sh=document.getElementById("sheet"),de=document.getElementById("dest"),se=document.getElementById("setup"),hr=document.getElementById("hero");B.classList.toggle("k-sheet",!!(sh&&sh.classList.contains("on")));B.classList.toggle("k-dest",!!(de&&de.classList.contains("on")));B.classList.toggle("k-setup",!!(se&&se.classList.contains("on")));B.classList.toggle("k-heropre",!!(hr&&hr.classList.contains("pre")));B.classList.toggle("k-heropost",!!(hr&&hr.classList.contains("post")))}
window.__ksync=sync;sync();document.addEventListener("change",function(e){var t=e.target;if(t&&(t.id==="dm"||(t.classList&&t.classList.contains("tabr"))))sync()},true);
function obs(){["sheet","dest","setup","hero"].forEach(function(id){var el=document.getElementById(id);if(el&&!el.__ko){el.__ko=1;new MutationObserver(sync).observe(el,{attributes:true,attributeFilter:["class"]})}});
["dm"].concat([].map.call(document.querySelectorAll(".tabr"),function(x){return x.id})).forEach(function(id){var el=document.getElementById(id);if(el&&!el.__kp){el.__kp=1;var d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked");try{Object.defineProperty(el,"checked",{get:function(){return d.get.call(this)},set:function(v){d.set.call(this,v);setTimeout(sync,0)}})}catch(x){}}});sync()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",obs);else obs();setTimeout(obs,1500)})();
