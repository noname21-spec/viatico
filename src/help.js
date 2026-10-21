/* lingua (traduzione automatica) e supporto */
(function(){
var KEY="via-lang",LS=function(){try{return localStorage.getItem(KEY)||"it"}catch(e){return"it"}};
function toast(t){var el=document.getElementById("toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},t.length>40?7000:2400)}
function cookie(l){var past="expires=Thu, 01 Jan 1970 00:00:00 GMT",h=location.hostname;
if(l==="it"){document.cookie="googtrans=; "+past+"; path=/";document.cookie="googtrans=; "+past+"; path=/; domain="+h;document.cookie="googtrans=; "+past+"; path=/; domain=."+h}
else document.cookie="googtrans=/it/"+l+"; path=/"}
function load(){if(window.google&&google.translate&&google.translate.TranslateElement)return;
window.viaGT=function(){try{new google.translate.TranslateElement({pageLanguage:"it",autoDisplay:false},"gtx")}catch(e){}};
var U=["https://translate.google.com/translate_a/element.js?cb=viaGT","https://translate.googleapis.com/translate_a/element.js?cb=viaGT"],ui=0;
function tryLoad(){var s=document.createElement("script");s.async=true;s.src=U[ui];s.onerror=function(){s.remove();if(++ui<U.length){tryLoad();return}toast("Traduzione non disponibile: lo script di Google non si carica"+(viol.length?" ("+viol[0]+")":" (rete o blocco del dispositivo)"))};document.head.appendChild(s)}
tryLoad()}
var viol=[];document.addEventListener("securitypolicyviolation",function(e){viol.push((e.violatedDirective||"")+" "+String(e.blockedURI||"").slice(0,70))});
var cur=LS(),sel=document.getElementById("shlang");
if(sel)sel.value=cur;
function verify(){setTimeout(function(){var h=document.documentElement.classList;if(!h.contains("translated-ltr")&&!h.contains("translated-rtl"))toast("Traduzione non riuscita"+(viol.length?" ("+viol.filter(function(v,i){return viol.indexOf(v)===i}).slice(0,3).join("; ")+")":": controlla la connessione"))},10000)}
if(cur!=="it"){document.documentElement.setAttribute("data-lang",cur);cookie(cur);load();verify()}
if(sel)sel.addEventListener("change",function(){var l=sel.value;try{localStorage.setItem(KEY,l)}catch(e){}cookie(l);toast(l==="it"?"Torno all'italiano…":"Traduco l'app…");setTimeout(function(){location.reload()},450)});
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
