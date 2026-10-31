/* ===== viaggio condiviso: lo stesso viaggio su più telefoni, con un codice =====
   Si condividono date, voli, alloggio, ritmo, tappe saltate e biglietti scelti.
   Ogni telefono controlla ogni pochi secondi: se qualcuno cambia qualcosa, l'altro lo vede da solo.
   Se due persone cambiano cose diverse insieme, le modifiche si uniscono; sulla stessa cosa vince l'ultima. */
(function(){
var SB={url:"__SB_URL__",key:"__SB_KEY__"},ON=/^https:\/\//.test(SB.url)&&SB.key.length>20,H=window.__viaSh;
if(!H)return;
function $(s){return document.querySelector(s)}
function esc(x){return String(x==null?"":x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function p(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}
var ME=g("via-sh-me");if(!ME){ME=Math.random().toString(36).slice(2,10);p("via-sh-me",ME)}
var TICK=5000,busy=false,timer=0,note="",lastOk=0;
/* v286 prima con lo stesso client della sincronizzazione (quello che funziona già sul telefono), poi con una richiesta diretta */
var LASTERR="";
function rpc(fn,args){var viaCl=window.__sbClient?Promise.race([window.__sbClient(),new Promise(function(_,ko){setTimeout(function(){ko(new Error("lento"))},6000)})]).then(function(cl){return cl.rpc(fn,args)}).then(function(r){if(r.error)throw new Error("rpc "+(r.error.code||"")+" "+(r.error.message||""));return r.data}):Promise.reject(new Error("no client"));
 return viaCl.catch(function(e){LASTERR=String(e&&e.message||e);return rpc0(fn,args)}).catch(function(e){LASTERR=(LASTERR?LASTERR+" · ":"")+String(e&&e.message||e);try{console.warn("viaggio condiviso:",LASTERR)}catch(x){}throw e})}
function errTag(){var t=LASTERR.replace(/\s+/g," ").trim();return t?" ("+t.slice(0,90)+")":""}
function rpc0(fn,args){var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},12000);
 return fetch(SB.url+"/rest/v1/rpc/"+fn,{method:"POST",headers:{"apikey":SB.key,"Content-Type":"application/json"},body:JSON.stringify(args),signal:ctl?ctl.signal:undefined}).then(function(r){clearTimeout(tm);if(!r.ok)throw new Error("http "+r.status);return r.json()},function(e){clearTimeout(tm);throw e})}
function one(r){return Array.isArray(r)?r[0]:r}
/* memoria locale per codice: ultima versione vista (rev) e il documento a quel punto (base per unire) */
function stGet(code){try{return JSON.parse(g("via-sh:"+code)||"null")||{rev:0,base:null}}catch(e){return{rev:0,base:null}}}
function stSet(code,o){p("via-sh:"+code,JSON.stringify(o))}
/* il documento si appiattisce in coppie chiave/valore per unire campo per campo */
function flat(d){var f={};if(!d)return f;var c=d.cfg||{};Object.keys(c).forEach(function(k){f["c."+k]=JSON.stringify(c[k])});
 var s=d.skip||{};Object.keys(s).forEach(function(k){if(s[k]&&s[k].length)f["s."+k]=JSON.stringify(s[k])});
 var t=d.tk||{};Object.keys(t).forEach(function(k){f["t."+k]=JSON.stringify(t[k])});
var r=d.rep||{};Object.keys(r).forEach(function(k){if(r[k]&&Object.keys(r[k]).length)f["r."+k]=JSON.stringify(r[k])});return f}
function unflat(f){var d={v:1,cfg:{},skip:{},tk:{},rep:{}};Object.keys(f).sort().forEach(function(k){var v=JSON.parse(f[k]),n=k.slice(2);if(k[0]==="c")d.cfg[n]=v;else if(k[0]==="s")d.skip[n]=v;else if(k[0]==="r")d.rep[n]=v;else d.tk[n]=v});return d}
function merge(base,mine,theirs){var b=flat(base),m=flat(mine),t=flat(theirs),out={},keys={};[b,m,t].forEach(function(o){Object.keys(o).forEach(function(k){keys[k]=1})});
 Object.keys(keys).forEach(function(k){var v=m[k]!==b[k]?m[k]:t[k];if(v!==undefined)out[k]=v});return unflat(out)}
function same(a,b){return JSON.stringify(flat(a))===JSON.stringify(flat(b))}
function sortedStr(d){var f=flat(d),o={};Object.keys(f).sort().forEach(function(k){o[k]=f[k]});return JSON.stringify(o)}
function busyUI(){var s=$("#setup");return !!(s&&s.classList.contains("on"))}
/* un giro: manda le mie modifiche, poi prende quelle degli altri */
function tick(force){var code=H.code();if(!ON||!code||busy||!navigator.onLine)return Promise.resolve();if(document.hidden&&!force)return Promise.resolve();busy=true;
 var st=stGet(code),mine=H.doc();
 var chain=Promise.resolve();
 if(mine&&st.base&&sortedStr(mine)!==sortedStr(st.base)){
  chain=rpc("shared_put",{p_code:code,p_data:mine,p_base:st.rev,p_by:ME}).then(function(r){r=one(r);
   if(!r){gone(code);return}
   if(r.ok){stSet(code,{rev:r.rev,base:mine});lastOk=Date.now();return}
   var m=merge(st.base,mine,r.data);
   return rpc("shared_put",{p_code:code,p_data:m,p_base:r.rev,p_by:ME}).then(function(r2){r2=one(r2);if(r2&&r2.ok){stSet(code,{rev:r2.rev,base:m});lastOk=Date.now();if(!same(m,mine))remote(m)}else if(r2){stSet(code,{rev:st.rev,base:st.base})}})})}
 else if(!st.base&&mine){/* primo giro dopo l'ingresso: la base sono io */}
 return chain.then(function(){st=stGet(code);return rpc("shared_get",{p_code:code,p_rev:st.rev})}).then(function(r){r=one(r);
   if(!r){gone(code);return}
   lastOk=Date.now();
   if(r.data&&r.rev>st.rev){var cur=H.doc();
    if(st.base&&cur&&sortedStr(cur)!==sortedStr(st.base)){/* ho modifiche non ancora inviate: unisco */
     var m=merge(st.base,cur,r.data);remote(m);stSet(code,{rev:r.rev,base:r.data})}
    else{remote(r.data);stSet(code,{rev:r.rev,base:r.data})}}
   else if(r.rev===st.rev&&!st.base){stSet(code,{rev:st.rev,base:mine})}})
  .catch(function(){}).then(function(){busy=false;paint()})}
/* applica un documento ricevuto, senza interrompere chi sta modificando */
function remote(doc){if(busyUI()){setTimeout(function(){remote(doc)},3000);return}
 var before=H.doc();if(before&&same(before,doc))return;
 if(H.apply(doc)){note="Aggiornato da un altro telefono";H.toast("Il viaggio è stato aggiornato da un altro telefono")}else{note="La destinazione è cambiata: rientra con il codice"}}
function gone(code){note="Codice non più valido";H.detach();paint()}
function loop(){clearTimeout(timer);timer=setTimeout(function(){tick().then(loop)},TICK)}
document.addEventListener("visibilitychange",function(){if(!document.hidden)tick(1)});
addEventListener("online",function(){tick(1)});
addEventListener("focus",function(){tick(1)});
loop();
/* ---- interfaccia ---- */
function linkOf(code){return(window.__IS_APP?"https://noname21-spec.github.io/viatico/":location.origin+location.pathname)+"#j="+code}
function open(){var m=$("#shm");if(!m)return;m.classList.add("on");m.setAttribute("aria-hidden","false");paint()}
function close(){var m=$("#shm");if(!m)return;m.classList.remove("on");m.setAttribute("aria-hidden","true")}
function say(t){var e=$("#shmst");if(e)e.textContent=t||""}
function copy(t){try{return navigator.clipboard.writeText(t).then(function(){H.toast("Copiato")},function(){prompt("Copia",t)})}catch(e){prompt("Copia",t)}}
function paint(){var m=$("#shm");if(!m||!m.classList.contains("on"))return;var b=$("#shmbody"),code=H.code(),mode=m.dataset.mode||"";
 if(!ON){b.innerHTML='<p class="qrp">Il viaggio condiviso non è disponibile in questa versione.</p>';return}
 if(mode==="join"||(!code&&mode!=="make")){
  b.innerHTML='<p class="qrp">Scrivi il codice che ti ha dato chi ha creato il viaggio: lo vedrai uguale, con le stesse tappe, voli e alloggio.</p><input id="shmin" class="shmin" maxlength="6" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABC123" value="'+esc(m.dataset.pre||"")+'"><div class="qrb"><button type="button" class="btn" id="shmgo">Entra nel viaggio</button></div><p class="qrp" id="shmst"></p>'+(H.has()?'<div class="qrb"><button type="button" class="btn ghost" id="shmmk">Oppure condividi il mio viaggio</button></div>':"");
  var inp=$("#shmin");inp.addEventListener("input",function(){inp.value=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,"")});
  $("#shmgo").onclick=function(){var c=inp.value.trim().toUpperCase();if(c.length!==6){say("Il codice ha 6 caratteri");return}join(c)};
  var mk=$("#shmmk");if(mk)mk.onclick=function(){m.dataset.mode="make";paint()};return}
 if(!code){b.innerHTML='<p class="qrp">Chi entra con il codice vede il tuo viaggio e lo modifica con te: voli, alloggio e tappe si aggiornano da soli su tutti i telefoni. Chiunque abbia il codice può modificarlo, quindi daglielo solo a chi viaggia con te.</p><div class="qrb"><button type="button" class="btn" id="shmnew">Crea il codice</button><button type="button" class="btn ghost" id="shmj">Ho già un codice</button></div><p class="qrp" id="shmst"></p>';
  $("#shmnew").onclick=function(){create()};$("#shmj").onclick=function(){m.dataset.mode="join";paint()};return}
 var ago=lastOk?Math.max(0,Math.round((Date.now()-lastOk)/1000)):-1;
 b.innerHTML='<p class="qrp">Codice del viaggio</p><div class="shcode" id="shcode">'+esc(code)+'</div><p class="qrp">Fai inserire il codice dal menu «Entra con un codice», oppure manda il link: si apre il viaggio da solo.</p><div class="qrb"><button type="button" class="btn" id="shmsend">Invia il codice</button><button type="button" class="btn ghost" id="shmcp">Copia il codice</button><button type="button" class="btn ghost" id="shmstop">Smetti di condividere</button></div><p class="qrp" id="shmst">'+esc(note||(ago<0?"Controllo gli aggiornamenti…":(ago<20?"Aggiornato ✓":"Ultimo controllo "+Math.round(ago/60)+" min fa")))+'</p>';
 $("#shmsend").onclick=function(){var t="Entra nel mio viaggio su Viaticum con il codice "+code+": "+linkOf(code);if(navigator.share)navigator.share({title:"Viaggio condiviso su Viaticum",text:t}).catch(function(){});else copy(t)};
 $("#shmcp").onclick=function(){copy(code)};
 $("#shmstop").onclick=function(){H.ask("Smettere di condividere?","Il viaggio resta sul tuo telefono com'è adesso. Chi ha il codice smette di ricevere i tuoi cambiamenti.",[{t:"Smetti di condividere",fn:function(){H.detach();note="";var mm=$("#shm");if(mm)mm.dataset.mode="";paint()}}])}}
function create(){say("Creo il codice…");var doc=null;try{doc=H.doc()}catch(e){LASTERR="doc "+(e&&e.message||e);say("Non riesco a preparare il viaggio da condividere"+errTag());return}if(!doc){say("Imposta prima il tuo viaggio");return}
 rpc("shared_create",{p_data:doc,p_by:ME}).then(function(r){r=one(r);if(!r||!r.code)throw 0;H.attach(r.code);stSet(r.code,{rev:r.rev,base:doc});lastOk=Date.now();note="";var m=$("#shm");if(m)m.dataset.mode="";paint()}).catch(function(){say(navigator.onLine?"Non riesco a creare il codice. Riprova tra poco."+errTag():"Per condividere serve internet")})}
function join(code){say("Cerco il viaggio…");
 rpc("shared_get",{p_code:code,p_rev:0}).then(function(r){r=one(r);if(!r||!r.data){say("Non trovo nessun viaggio con questo codice");return}
  if(H.code()===code){say("Sei già dentro questo viaggio");return}
  var go=function(){stSet(code,{rev:r.rev,base:r.data});if(!H.join(code,r.data)){say("Il viaggio non si può aprire")}};
  var cur=H.has();if(cur)H.ask("Entrare nel viaggio condiviso?","Il viaggio che hai ora resta salvato nella tua lista.",[{t:"Entra",fn:go}]);else go()}).catch(function(){say(navigator.onLine?"Non riesco a controllare il codice. Riprova tra poco."+errTag():"Per entrare serve internet")})}
function init(){var a=$("#shlive"),j=$("#shjoin");
 [a,j].forEach(function(b){if(b)b.addEventListener("click",function(){H.closeSheet();var m=$("#shm");m.dataset.mode=b===j?"join":(H.code()?"":"make");m.dataset.pre="";open()})});
 var c=$("#shmclose");if(c)c.addEventListener("click",close);var m=$("#shm");if(m)m.addEventListener("click",function(e){if(e.target===m)close()});
 [a,j].forEach(function(b){if(b&&!ON)b.hidden=true});
 /* link con codice: #j=ABC123 */
 var h=/^#j=([A-Za-z0-9]{6})$/.exec(location.hash||"");if(h&&ON){try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}setTimeout(function(){var mm=$("#shm");mm.dataset.mode="join";mm.dataset.pre=h[1].toUpperCase();open()},2500)}}
window.addEventListener("hashchange",function(){if(/^#j=/.test(location.hash))location.reload()});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
window.viaShared={tick:tick,open:open,on:ON};
})();
