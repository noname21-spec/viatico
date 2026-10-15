/* ===== notifiche e promemoria =====
   Gli avvisi partono mentre l'app è aperta (o appena riaperta): non c'è un server che possa
   svegliare il telefono a app chiusa. Per quello resta il calendario (.ics) con i suoi allarmi. */
(function(){
var $=function(s){return document.querySelector(s)},KEY="via-notif",FK="via-nfired";
var DEF={on:false,vol:1,tappe:1,pasti:1,alloggio:1,riep:1,lista:1,lead:15};
function lj(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v&&typeof v==="object"?v:d}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var ST=Object.assign({},DEF,lj(KEY,{}));
function toast(t){var el=$("#toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},3200)}
var supported="Notification" in window;
var ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
var standalone=(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true;
function perm(){return supported?Notification.permission:"unsupported"}
/* fuso orario della città */
function tzOff(ms,tz){var p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(ms)).forEach(function(x){p[x.type]=+x.value});return(Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-ms)/6e4}
function utcOf(date,min,tz){var a=date.split("-").map(Number),g=Date.UTC(a[0],a[1]-1,a[2],0,min),o=tzOff(g,tz);o=tzOff(g-o*6e4,tz);return g-o*6e4}
function tm(s){var m=/(\d{1,2}):(\d{2})/.exec(s||"");return m?+m[1]*60+ +m[2]:null}
function hhmm(m){m=((m%1440)+1440)%1440;return Math.floor(m/60)+":"+("0"+m%60).slice(-2)}
function short(t){t=String(t).replace(/\s+/g," ").trim();if(t.length<=80)return t;var c=t.slice(0,80),i=c.lastIndexOf(" ");return c.slice(0,i>40?i:80).replace(/[,;:]$/,"")+"…"}
/* elenco dei promemoria del viaggio */
function build(){
 var P=window.PAR,trip=P&&P.trip,cfg=P&&P.cfg;if(!trip||!cfg||!trip.days||!trip.days.length||!window.PD)return[];
 var tz=PD.TZ||"Europe/Rome",city="",out=[],sig=(cfg.dest||"")+(cfg.date||""),S=P.S||{},MN=P.MN||{},lead=+ST.lead||15;
 var h1=$("#itinerario h1");city=h1?(h1.textContent.split(/\s+in\s+/)[0]||"").trim():"";
 function add(type,id,date,min,title,body,extra){if(!date||min==null)return;out.push(Object.assign({type:type,id:sig+":"+id,at:utcOf(date,min,tz),title:title,body:body||"",grace:6*36e5},extra||{}))}
 var d0=trip.days[0].date,dN=trip.days[trip.days.length-1].date;
 if(cfg.a_dep&&tm(cfg.a_dep)!=null){var a=tm(cfg.a_dep);add("vol","va",cfg.date,a-180,"✈️ Si parte tra 3 ore","Volo"+(cfg.a_num?" "+cfg.a_num:"")+" alle "+cfg.a_dep+": documenti, carte d'imbarco e bagagli.")}
 if(cfg.r_dep&&tm(cfg.r_dep)!=null){var r=tm(cfg.r_dep);add("vol","vr",dN,r-240,"✈️ Volo di ritorno tra 4 ore","Partenza alle "+cfg.r_dep+(cfg.r_imb?" · imbarco "+cfg.r_imb:"")+". Controlla di non aver dimenticato nulla.")}
 var h=null;try{h=trip.multi?P.home():null}catch(e){}
 if(h&&h.cin&&tm(h.cin)!=null)add("alloggio","cin",d0,tm(h.cin),"🏨 Check-in dall'alloggio","Da adesso puoi fare il check-in (dalle "+h.cin+").",{grace:3*36e5});
 if(h&&h.cout&&tm(h.cout)!=null)add("alloggio","cout",dN,tm(h.cout)-60,"🏨 Check-out tra un'ora","Lascia la camera entro le "+h.cout+". Puoi chiedere di tenere i bagagli in deposito.",{grace:2*36e5});
 trip.days.forEach(function(d,i){
  var acts=[];
  (d.items||[]).forEach(function(it,j){
   if(it.k==="act"&&S[it.id]){acts.push(S[it.id].t);add("tappe","t"+i+"_"+j,d.date,it.t-lead,"📍 Tra "+lead+" minuti: "+S[it.id].t,"Alle "+hhmm(it.t)+"."+(it.leg&&it.leg.txt?" "+short(it.leg.txt):""),{grace:25*6e4})}
   else if(it.k==="meal"&&MN[it.m]){add("pasti","p"+i+"_"+j,d.date,it.t-lead,"🍽️ "+MN[it.m]+" tra "+lead+" minuti","Alle "+hhmm(it.t)+": apri la sezione Pasti per i posti consigliati.",{grace:25*6e4})}
  });
  var first=(d.items||[]).filter(function(x){return x.k==="act"})[0];
  var body=acts.length?"Oggi: "+acts.slice(0,acts.length>4?3:4).join(", ")+(acts.length>4?" e altre "+(acts.length-3):acts.length===4?" e "+acts[3]:"")+".":"Oggi niente di fisso: goditi la città.";
  if(!(i===0&&cfg.a_dep))add("riep","r"+i,d.date,8*60+30,"☀️ Buongiorno! Giorno "+(i+1)+" a "+city,body,{grace:4*36e5});
  if(i===0){var prev=new Date(utcOf(d.date,12*60,tz)-864e5),pd=new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit"}).format(prev);
   add("riep","go1",pd,20*60,"🧳 Domani si parte","Ultimo controllo: documenti, caricabatterie e lista «Prima di partire».",{grace:5*36e5});
   [3,1].forEach(function(n){var dd=new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(utcOf(d.date,12*60,tz)-n*864e5));
    add("lista","l"+n,dd,18*60,"✅ Lista «Prima di partire»","",{grace:6*36e5,dyn:function(){var f=window.PARCKN&&PARCKN();if(!f||f.done>=f.total)return null;return"Hai spuntato "+f.done+" cose su "+f.total+". Controlla cosa manca."}})})}
 });
 return out.filter(function(e){return ST[e.type]})
}
/* consegna */
function fired(){return lj(FK,{})}
function mark(id){var f=fired(),now=Date.now();Object.keys(f).forEach(function(k){if(now-f[k]>40*864e5)delete f[k]});f[id]=now;sv(FK,f)}
function show(title,body,tag){
 var opt={body:body,tag:tag||"viatico",icon:"icon-192.png",badge:"icon-192.png",lang:"it",data:{url:"./"}};
 var vis=document.visibilityState==="visible";
 var inApp=function(){toast(title.replace(/^\S+\s/,"")+(body?" · "+body:""))};
 if(perm()!=="granted"){inApp();return Promise.resolve(false)}
 if(vis)inApp();
 var p=navigator.serviceWorker&&navigator.serviceWorker.getRegistration?navigator.serviceWorker.getRegistration():Promise.resolve(null);
 return p.then(function(reg){if(reg&&reg.showNotification)return reg.showNotification(title,opt).then(function(){return true});new Notification(title,opt);return true}).catch(function(){try{new Notification(title,opt);return true}catch(e){return false}})
}
var list=[],sigNow="";
function refresh(){var s=JSON.stringify([window.PAR&&PAR.cfg,ST]);if(s===sigNow&&list.length)return;sigNow=s;try{list=build()}catch(e){list=[];console.error(e)}}
function tick(){
 if(!ST.on)return;refresh();var now=Date.now(),f=fired();
 list.forEach(function(e){if(f[e.id]||e.at>now||now-e.at>e.grace)return;
  var b=e.body;if(e.dyn){b=e.dyn();if(!b){mark(e.id);return}}
  mark(e.id);show(e.title,b,e.id)})
}
var timer=0;function start(){stop();if(!ST.on)return;tick();timer=setInterval(tick,20000)}function stop(){clearInterval(timer);timer=0}
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")tick()});
window.addEventListener("focus",tick);window.addEventListener("pageshow",tick);
if(window.PAR&&PAR.on)PAR.on(function(){sigNow="";if(ST.on)tick()});
/* impostazioni */
var btn=$("#shnot"),box=$("#nbox");if(!btn||!box)return;if(window.__IS_APP){btn.hidden=true;box.hidden=true;box.setAttribute("data-off","1");return}
var on=$("#non"),opts=$("#nopts"),st=$("#nst"),sub=$("#shnots"),note=$("#nnote"),lead=$("#nlead");
function label(){
 var p=perm(),t;
 if(!ST.on)t="Disattivati";
 else if(p==="granted")t="Attivi";
 else if(p==="denied")t="Attivi nell'app (notifiche bloccate dal telefono)";
 else if(p==="unsupported")t="Attivi solo dentro l'app";
 else t="Attivi nell'app (permesso non concesso)";
 st.textContent=t;sub.textContent=ST.on?t:"Voli, tappe, pasti, alloggio e lista";
 opts.classList.toggle("off",!ST.on);
 var m="I promemoria suonano quando l'app è aperta o appena usata. Per avere gli avvisi anche con l'app chiusa, aggiungi il viaggio al calendario del telefono.";
 if(ios&&!standalone)m="Su iPhone le notifiche funzionano solo se Viaticum è sulla schermata Home: apri la condivisione di Safari e scegli «Aggiungi alla schermata Home». "+m;
 if(p==="denied")m="Le notifiche sono bloccate per Viaticum: puoi riattivarle dalle impostazioni del telefono o del browser. Nel frattempo i promemoria compaiono dentro l'app. "+m;
 note.textContent=m}
function sync(){on.checked=!!ST.on;[].forEach.call(box.querySelectorAll(".nsw[data-k]"),function(c){c.checked=!!ST[c.dataset.k]});lead.value=String(ST.lead);label()}
function save(){sv(KEY,ST);sigNow="";label()}
btn.addEventListener("click",function(){var o=box.hidden;box.hidden=!o;btn.setAttribute("aria-expanded",String(o));if(o)setTimeout(function(){try{box.scrollIntoView({block:"nearest",behavior:"smooth"})}catch(e){}},60)});
function ask(){if(!supported||Notification.permission!=="default")return Promise.resolve(perm());
 try{var r=Notification.requestPermission(function(){});return Promise.resolve(r).then(function(){return perm()})}catch(e){return Promise.resolve(perm())}}
on.addEventListener("change",function(){
 ST.on=on.checked;save();
 if(ST.on){ask().then(function(p){label();if(p==="granted")toast("Promemoria attivati");else if(p==="denied")toast("Notifiche bloccate dal telefono: i promemoria restano dentro l'app");else if(ios&&!standalone)toast("Aggiungi Viaticum alla schermata Home per le notifiche");else toast("Promemoria attivi dentro l'app");start()})}
 else{stop();toast("Promemoria disattivati")}});
[].forEach.call(box.querySelectorAll(".nsw[data-k]"),function(c){c.addEventListener("change",function(){ST[c.dataset.k]=c.checked?1:0;save();tick()})});
lead.addEventListener("change",function(){ST.lead=+lead.value||15;save();tick()});
$("#ntest").addEventListener("click",function(){
 ask().then(function(p){label();show("🔔 Viaticum","Funziona! I promemoria arriveranno così.","test").then(function(ok){if(!ok&&p!=="granted")toast("Per le notifiche del telefono concedi il permesso")})})});
$("#ncal").addEventListener("click",function(){var c=$("#shcal");if(c)c.click()});
sync();if(ST.on)start();
window.VNOT={list:function(){refresh();return list},state:function(){return ST},tick:tick,build:build,reset:function(){sv(FK,{})}};
})();
