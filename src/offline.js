/* ===== uso offline: avviso senza rete ===== */
(function(){
var $=function(s){return document.querySelector(s)};
function toast(t){try{if(window.VNUI&&VNUI.toast(t))return}catch(e){}var el=$("#toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},2600)}
/* avviso offline */
var chip=$("#offl");function net(first){if(chip)chip.hidden=navigator.onLine;document.documentElement.classList.toggle('isoff',!navigator.onLine);if(!first)toast(navigator.onLine?"Di nuovo online":"Sei offline: l'app funziona, mappa solo nelle zone già viste")}
window.addEventListener("online",function(){net()});window.addEventListener("offline",function(){net()});net(true);
})();

/* ===== v286 senza internet: tutto il necessario dei viaggi salvato sul telefono ===== */
(function(){
var $=function(s){return document.querySelector(s)};
function toast(t){try{if(window.VNUI&&VNUI.toast(t))return}catch(e){}var el=$("#toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},2600)}
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function dests(){var s=(g("via-trip")||"")+(g("via-trips")||""),re=/"dest":\s*"([a-z0-9_]+)"/g,m,o=[];while((m=re.exec(s)))if(o.indexOf(m[1])<0)o.push(m[1]);return o}
var OC="vt-offline";
function prep(force){if(!window.caches||!navigator.onLine)return Promise.resolve(null);var last=+(g("via-offt")||0),ds=dests();
 if(!force&&Date.now()-last<6*3600e3&&g("via-offd")===ds.join(","))return Promise.resolve(null);
 var urls=[];ds.filter(function(d){return d!=="paris"}).forEach(function(d){urls.push("c/"+d+".js","c/"+d+".css")});
 return caches.open(OC).then(function(c){return Promise.all(urls.map(function(u){return fetch(u,{cache:"no-cache"}).then(function(r){if(r.ok)return c.put(u,r)}).catch(function(){})}))}).then(function(){try{localStorage.setItem("via-offt",String(Date.now()));localStorage.setItem("via-offd",ds.join(","))}catch(e){}return ds})}
function status(){var el=$("#shoffs");if(!el)return;if(!window.caches){el.textContent="Questo browser non salva l'app per l'uso senza internet";return}
 var ds=dests();Promise.all([caches.open("via-tiles-v1").then(function(c){return c.keys()}).then(function(k){return k.length}).catch(function(){return 0}),caches.open(OC).then(function(c){return c.keys()}).then(function(k){return k.map(function(r){return r.url})}).catch(function(){return[]})]).then(function(a){
  var ok=ds.filter(function(d){return d==="paris"||a[1].some(function(u){return u.indexOf("c/"+d+".js")>=0})}).length;
  el.textContent=(ds.length?(ok===ds.length?"Pronta: "+(ds.length===1?"il viaggio è salvato":"i "+ds.length+" viaggi sono salvati"):ok+" viaggi su "+ds.length+" salvati")+" sul telefono":"Itinerario, guide, pasti e costi funzionano anche senza rete")+" · mappa: "+(a[0]?a[0]+" pezzi delle zone già viste":"solo le zone già viste")})}
window.addEventListener("load",function(){setTimeout(function(){prep(false).then(status)},4000)});
window.addEventListener("online",function(){prep(false)});
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("#shoff");if(!b)return;toast(navigator.onLine?"Salvo il viaggio per l'uso senza internet…":"Sei offline: uso quello che è già salvato");prep(true).then(function(d){status();if(d)toast("Fatto: il viaggio funziona anche senza internet. La mappa mostra le zone che hai già guardato.")})});
var mo=new MutationObserver(function(){var el=$("#shoffs");if(el&&el.offsetParent)status()});setTimeout(function(){var sh=$("#sheet");if(sh)mo.observe(sh,{attributes:true,attributeFilter:["class"]})},1500);

/* ===== copia dei dati: un file con viaggi, spese, liste e biglietti ===== */
var SKIP=/^(via-offt|via-offd|via-splash|via-tbcap\d*|via-pres-opt|via-tbhold|via-rc)$/;
function backup(){var d={},n=0;try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(!/^via-/.test(k)||SKIP.test(k))continue;d[k]=localStorage.getItem(k);n++}}catch(e){}
 if(!d["via-trip"]&&!d["via-trips"]){toast("Non c'è ancora niente da salvare");return}
 var o={app:"Viaticum",v:1,at:new Date().toISOString(),data:d},name="viaticum-copia-"+new Date().toISOString().slice(0,10)+".json",blob=new Blob([JSON.stringify(o)],{type:"application/json"});
 if(window.viaSaveFile)viaSaveFile(blob,name,"application/json").then(function(w){toast(w||"Copia salvata: "+name)});else{var u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(u)},4000);toast("Copia salvata: "+name)}}
function restore(){var inp=document.createElement("input");inp.type="file";inp.accept="application/json,.json";inp.style.display="none";document.body.appendChild(inp);
 inp.addEventListener("change",function(){var f=inp.files&&inp.files[0];inp.remove();if(!f)return;f.text().then(function(t){var o=JSON.parse(t);if(!o||o.app!=="Viaticum"||!o.data||typeof o.data!=="object")throw 0;
  var keys=Object.keys(o.data).filter(function(k){return /^via-/.test(k)&&typeof o.data[k]==="string"}),when=o.at?new Date(o.at).toLocaleDateString("it-IT",{day:"numeric",month:"long",year:"numeric"}):"";
  var go=function(){try{var rm=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^via-/.test(k)&&k!=="via-sh-me")rm.push(k)}rm.forEach(function(k){localStorage.removeItem(k)});keys.forEach(function(k){localStorage.setItem(k,o.data[k])});try{sessionStorage.clear()}catch(e){}toast("Dati ripristinati");setTimeout(function(){location.reload()},600)}catch(e){toast("Memoria piena: non riesco a ripristinare tutto")}};
  var A=window.__viaSh&&window.__viaSh.ask;if(A)A("Ripristinare la copia"+(when?" del "+when:"")+"?","I dati che hai ora su questo telefono vengono sostituiti da quelli della copia.",[{t:"Ripristina",fn:go}]);else if(confirm("Ripristinare la copia? I dati attuali vengono sostituiti."))go()}).catch(function(){toast("Questo file non è una copia di Viaticum")})});inp.click()}
document.addEventListener("click",function(e){var t=e.target.closest&&e.target.closest("#shbak,#shrst");if(!t)return;if(t.id==="shbak")backup();else restore()});
})();
