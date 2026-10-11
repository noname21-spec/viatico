/* ===== account e sincronizzazione (Supabase: Google / Apple) ===== */
(function(){
var SB={url:"__SB_URL__",key:"__SB_KEY__"};
var ok=/^https:\/\//.test(SB.url)&&SB.key.length>20;
var KEYS=["via-trip","via-trips","via-spese","via-check","via-copt"],TK=["via-spese","via-check","via-copt"],SESS=null,UID=null,CL=null,busy=false,applying=false,timer=0,lastPull=0;
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function p(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}
function j(k,d){try{return JSON.parse(g(k)||"null")||d}catch(e){return d}}
function $(s){return document.querySelector(s)}
function esc(x){return String(x==null?"":x).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function tidOf(c){return c.tid||(c.dest+"-"+c.date)}
/* dati locali <-> blob */
function localBlob(){var cfg=j("via-trip",null),cur=null;if(cfg&&cfg.date){cfg.tid=tidOf(cfg);var st={};TK.forEach(function(k){var v=g(k);if(v!=null)st[k]=v});cur={cfg:cfg,st:st}}
var tr=j("via-trips",[]);if(!Array.isArray(tr))tr=[];tr.forEach(function(t){if(t&&t.cfg)t.cfg.tid=tidOf(t.cfg)});return{v:1,cur:cur,trips:tr}}
function applyBlob(b){applying=true;try{var c=b.cur;if(c&&c.cfg){p("via-trip",JSON.stringify(c.cfg));TK.forEach(function(k){p(k,c.st&&c.st[k]!=null?c.st[k]:null)})}else{p("via-trip",null);TK.forEach(function(k){p(k,null)})}
p("via-trips",b.trips&&b.trips.length?JSON.stringify(b.trips):null)}finally{applying=false}}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b)}
/* unione al primo accesso: i viaggi presenti da una sola parte si tengono tutti */
function merge(a,b){var cur=a.cur||b.cur,all={},order=[];function add(t){if(!t||!t.cfg)return;var id=t.cfg.tid;if(!all[id]){all[id]=t;order.push(id)}}
if(a.cur)add(a.cur);a.trips.forEach(add);if(b.cur)add(b.cur);b.trips.forEach(add);
var cid=cur?cur.cfg.tid:null;return{v:1,cur:cid?all[cid]:null,trips:order.filter(function(i){return i!==cid}).map(function(i){return all[i]}).slice(0,12)}}
/* libreria caricata solo quando serve */
function lib(){return new Promise(function(res,rej){if(window.supabase)return res();var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.100.0/dist/umd/supabase.js";s.onload=res;s.onerror=function(){rej(new Error("offline"))};document.head.appendChild(s)})}
function client(){return lib().then(function(){if(!CL)CL=window.supabase.createClient(SB.url,SB.key,{auth:{flowType:"pkce",persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});return CL})}
function setSess(s){SESS=s;UID=s&&s.user?s.user.id:null;paint()}
function mail(){return SESS&&SESS.user?(SESS.user.email||"account collegato"):""}
function paint(){var on=!!UID;[["#dacct",1],["#shacct",0]].forEach(function(x){var el=$(x[0]);if(!el)return;el.hidden=!ok;var t=el.querySelector(".at"),s=el.querySelector(".as");if(!t)return;
t.textContent=on?"Sincronizzazione attiva":"Accedi o registrati";s.textContent=on?mail():"Ritrovi viaggi, spese e liste su ogni dispositivo"})
var m=$("#acct");if(m&&m.classList.contains("on"))modal()}
/* sincronizzazione */
function dirtyKey(){return"via-sync-dirty"}
function stamp(){return g("via-sync-at:"+UID)}
function push(){if(!UID||busy)return Promise.resolve();busy=true;clearTimeout(timer);var b=localBlob();
return client().then(function(c){return c.from("viatico_data").upsert({user_id:UID,data:b},{onConflict:"user_id"}).select("updated_at").single()}).then(function(r){if(r.error)throw r.error;p("via-sync-at:"+UID,r.data.updated_at);p(dirtyKey(),null);status("Sincronizzato ✓")}).catch(function(){status("Offline: riprovo più tardi")}).then(function(){busy=false})}
function pull(){if(!UID||busy)return Promise.resolve();lastPull=Date.now();busy=true;var uid=UID;
return client().then(function(c){return c.from("viatico_data").select("data,updated_at").eq("user_id",uid).maybeSingle()}).then(function(r){busy=false;if(r.error)throw r.error;var loc=localBlob(),rem=r.data&&r.data.data&&r.data.data.v?r.data.data:null,at=stamp(),dirty=g(dirtyKey());
if(!rem)return push();
if(!at||(dirty&&r.data.updated_at>at)){var m=merge(loc,rem);var chg=!same(m,loc);applyBlob(m);return push().then(function(){if(chg)location.reload()})}
if(r.data.updated_at>at){var chg2=!same(rem,loc);applyBlob(rem);p("via-sync-at:"+uid,r.data.updated_at);if(chg2)location.reload();return}
if(dirty)return push()}).catch(function(){busy=false;status("Offline: riprovo più tardi")})}
function status(t){var e=$("#acstat");if(e)e.textContent=t}
function dirty(k){if(!UID||applying||KEYS.indexOf(k)<0)return;p(dirtyKey(),"1");clearTimeout(timer);timer=setTimeout(push,2500)}
window.viaSync={dirty:dirty,on:ok};
/* interfaccia */
function open(){var m=$("#acct");m.classList.add("on");m.setAttribute("aria-hidden","false");modal()}
function close(){var m=$("#acct");m.classList.remove("on");m.setAttribute("aria-hidden","true")}
function modal(){var c=$("#acbody");if(UID){c.innerHTML='<p class="qrp">Hai effettuato l\'accesso come</p><p class="qru">'+esc(mail())+'</p><p class="qrp" id="acstat">Viaggi, spese e liste si sincronizzano da soli. La chiave dei voli resta solo su questo telefono.</p><div class="qrb"><button type="button" class="btn" id="acsync">Sincronizza ora</button><button type="button" class="btn ghost" id="acout">Esci</button><button type="button" class="btn ghost" id="acdel">Elimina i dati dal cloud</button></div>';
$("#acsync").onclick=function(){status("Sincronizzo…");p(dirtyKey(),"1");push()};
$("#acout").onclick=function(){client().then(function(cl){return cl.auth.signOut()}).catch(function(){}).then(function(){p("via-sync-at:"+UID,null);p(dirtyKey(),null);setSess(null);close()})};
$("#acdel").onclick=function(){if(!confirm("Eliminare dal cloud i dati sincronizzati? Su questo dispositivo restano."))return;var u=UID;client().then(function(cl){return cl.from("viatico_data").delete().eq("user_id",u)}).then(function(){p("via-sync-at:"+u,null);status("Dati cloud eliminati")}).catch(function(){status("Non riuscito, riprova")})}}
else{c.innerHTML='<p class="qrp">Crea un account per ritrovare i tuoi viaggi, le spese e le liste su ogni dispositivo. Non servono password.</p><div class="qrb"><button type="button" class="btn authb" data-p="google"><span aria-hidden="true">G</span> Continua con Google</button><button type="button" class="btn authb apple" data-p="apple"><span aria-hidden="true">🍎</span> Continua con Apple</button></div><p class="qrp" id="acstat">Salviamo solo viaggi, spese e liste, mai la chiave dei voli.</p>';
[].forEach.call(c.querySelectorAll(".authb"),function(b){b.onclick=function(){status("Apro l'accesso…");client().then(function(cl){return cl.auth.signInWithOAuth({provider:b.dataset.p,options:{redirectTo:location.origin+location.pathname}})}).then(function(r){if(r&&r.error)throw r.error}).catch(function(){status("Accesso non disponibile (sei offline?)")})}})}}
function init(){var a=$("#dacct"),b=$("#shacct");if(!ok||!a)return;[a,b].forEach(function(x){if(x)x.addEventListener("click",function(){var sh=$("#sheet");if(sh&&sh.classList.contains("on")){sh.classList.remove("on");sh.setAttribute("aria-hidden","true")}open()})});$("#acclose").addEventListener("click",close);$("#acct").addEventListener("click",function(e){if(e.target===$("#acct"))close()});paint();
var has=false;try{for(var i=0;i<localStorage.length;i++)if(/^sb-.*-auth-token/.test(localStorage.key(i)))has=true}catch(e){}
if(has||/[?&]code=|access_token=/.test(location.search+location.hash)){client().then(function(c){c.auth.onAuthStateChange(function(ev,s){if(ev==="SIGNED_OUT"){setSess(null)}else if(s&&(!UID||s.user.id!==UID)){setSess(s);pull()}});return c.auth.getSession()}).then(function(r){if(r&&r.data&&r.data.session&&!UID){setSess(r.data.session);pull()}}).catch(function(){})}
document.addEventListener("visibilitychange",function(){if(!document.hidden&&UID&&Date.now()-lastPull>20000)pull()})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
