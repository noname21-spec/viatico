/* lingua (traduzione automatica) e supporto */
(function(){
var KEY="via-lang",LS=function(){try{return localStorage.getItem(KEY)||"it"}catch(e){return"it"}};
function toast(t){var el=document.getElementById("toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},t.length>40?7000:2400)}
var cur=LS(),sel=document.getElementById("shlang");
if(cur!=="en")cur="it";if(sel)sel.value=cur;
var viol=[];document.addEventListener("securitypolicyviolation",function(e){viol.push((e.violatedDirective||"")+" "+String(e.blockedURI||"").slice(0,70))});
if(sel)sel.addEventListener("change",function(){var l=sel.value==="en"?"en":"it";try{localStorage.setItem(KEY,l)}catch(e){}toast(l==="it"?"Torno all'italiano…":"Switching to English…");setTimeout(function(){location.reload()},450)});
/* supporto */
var help=document.getElementById("help"),mail=document.getElementById("hlmail");
function info(){var c=null;try{c=JSON.parse(localStorage.getItem("via-trip")||"null")}catch(e){}
return["Viaticum "+((document.getElementById("hlver")||{}).textContent||"").replace("Viaticum · ",""),"Città: "+(c&&c.dest||"nessun viaggio"),"Lingua: "+cur,"Schermo: "+innerWidth+"x"+innerHeight,"Browser: "+navigator.userAgent,"CSP: "+(viol.slice(0,3).join(" | ")||"-")].join("\n")}
function openHelp(){var s=document.getElementById("sheet");if(s){s.classList.remove("on");s.setAttribute("aria-hidden","true")}
if(mail&&mail.getAttribute("href").indexOf("mailto:")===0&&mail.dataset.ok!=="1"){var to=mail.getAttribute("href").slice(7).split("?")[0];mail.href="mailto:"+to+"?subject="+encodeURIComponent("Assistenza Viaticum")+"&body="+encodeURIComponent("Descrivi il problema:\n\n\n\n---\nDettagli tecnici (non cancellare):\n"+info());mail.dataset.ok="1"}
setTimeout(function(){help.classList.add("on");help.setAttribute("aria-hidden","false")},s?160:0)}
function closeHelp(){help.classList.remove("on");help.setAttribute("aria-hidden","true")}
document.getElementById("shhelp").addEventListener("click",openHelp);
document.getElementById("hlclose").addEventListener("click",closeHelp);
help.addEventListener("click",function(e){if(e.target===help)closeHelp()});
document.getElementById("hlcopy").addEventListener("click",function(){var t=info();if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(function(){toast("Dettagli copiati")},function(){toast("Non sono riuscito a copiare")});else toast("Copia non disponibile")});
})();
