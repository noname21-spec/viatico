/* lingua dell'interfaccia: italiano (originale) o inglese, con dizionario interno, senza servizi esterni */
(function(){
var L="it";try{L=localStorage.getItem("via-lang")||"it"}catch(e){}
if(L!=="it"&&L!=="en"){L="it";try{localStorage.setItem("via-lang","it")}catch(e){}}
try{var h=location.hostname,x="=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";document.cookie="googtrans"+x;document.cookie="googtrans"+x+"; domain="+h;document.cookie="googtrans"+x+"; domain=."+h}catch(e){}
window.VLANG=L;if(L!=="en")return;
var X=window.__I18N||{},D=X.D||{},F=(X.F||[]).map(function(p){return[new RegExp(p[0]),p[1],/[\^$]/.test(p[0])]}),IT=/(^|[^A-Za-zÀ-ÿ])(il|lo|la|gli|le|di|del|dello|della|dei|degli|delle|che|con|fino|una|un|per|sotto|verso|alla|alle|al|ai|nel|nella|sul|sulla|dal|dalla|è|e|o|ti|si|da|in zona|tra)(?![A-Za-zÀ-ÿ])/i,MON=X.MON||{},DAY=X.DAY||{},DAB=X.DAB||{};
var R=document.documentElement;R.lang="en";R.classList.add("en");
function alt(o){return Object.keys(o).join("|")}
var reM=new RegExp("(^|[^A-Za-zÀ-ÿ])("+alt(MON)+")(?![A-Za-zÀ-ÿ])","gi"),reD=new RegExp("(^|[^A-Za-zÀ-ÿ])("+alt(DAY)+")(?![A-Za-zÀ-ÿ])","gi"),reA=new RegExp("^("+alt(DAB)+")(\\.?\\s+\\d)");
function cap(a,b){return /^[A-ZÀ-Ý]{2}/.test(a)?b.toUpperCase():/^[A-ZÀ-Ý]/.test(a)?b:b}
var C=new Map(),ENV=new Set();
function tr(s){if(!s||s.length>600)return null;var m=/^(\s*)([\s\S]*?)(\s*)$/.exec(s),t=m[2];if(!t||!/[A-Za-zÀ-ÿ]/.test(t))return null;if(typeof ENV!=="undefined"&&ENV.has(t))return null;
var r;if(C.has(t))r=C.get(t);else{r=D[t];if(r==null&&t.length<=120){var o=t;for(var i=0;i<F.length;i++)if(F[i][2])o=o.replace(F[i][0],F[i][1]);
var g=o;for(i=0;i<F.length;i++)if(!F[i][2])g=g.replace(F[i][0],F[i][1]);
g=g.replace(reA,function(a,b,c){return DAB[b]+c}).replace(reM,function(a,p,w){return p+cap(w,MON[w.toLowerCase()])}).replace(reD,function(a,p,w){return p+cap(w,DAY[w.toLowerCase()])});
if(g!==o&&!IT.test(g))o=g;
var mp=/^(.+) in (\d+) (days?)$/.exec(o);if(mp&&D[mp[1]])o=D[mp[1]]+" in "+mp[2]+" "+mp[3];
if(o!==t)r=o}if(r==null)r=null;C.set(t,r)}
return r==null?null:m[1]+r+m[3]}
window.VTR=function(s){var r=tr(s);return r==null?s:r};
var AT=["aria-label","title","placeholder","alt"];
function skip(el){return !el||el.closest&&el.closest('[translate="no"],script,style,textarea')}
function txt(n){var p=n.parentNode;if(!p||p.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName)||skip(p))return;var r=tr(n.nodeValue);if(r!=null&&r!==n.nodeValue)n.nodeValue=r}
function att(el,a){var v=el.getAttribute(a);if(!v)return;var r=tr(v);if(r!=null&&r!==v)el.setAttribute(a,r)}
function el(e){if(skip(e))return;for(var i=0;i<AT.length;i++)if(e.hasAttribute(AT[i]))att(e,AT[i])}
function walk(root){if(root.nodeType===3){txt(root);return}if(root.nodeType!==1)return;el(root);
var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT),n;while(n=w.nextNode()){if(n.nodeType===3)txt(n);else el(n)}}
function all(){walk(document.body);var t=tr(document.title);if(t)document.title=t}
/* v286 testi delle guide in inglese: un file per città (c/<id>.en.js), caricato quando serve */
window.__I18N_ADD=function(o){if(!o||typeof o!=="object")return;Object.keys(o).forEach(function(k){if(typeof o[k]==="string"){D[k]=o[k];ENV.add(o[k])}});C.clear();if(document.body)all()};
function guide(){var id=R.getAttribute("data-city")||"";if(!/^[a-z0-9_]+$/.test(id)||document.getElementById("gen-"+id))return;var sc=document.createElement("script");sc.id="gen-"+id;sc.src="c/"+id+".en.js";document.head.appendChild(sc)}
guide();try{new MutationObserver(guide).observe(R,{attributes:true,attributeFilter:["data-city"]})}catch(e){}
if(document.body)all();else document.addEventListener("DOMContentLoaded",all);
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==="characterData")txt(m.target);else if(m.type==="attributes"){if(!skip(m.target))att(m.target,m.attributeName)}else for(var j=0;j<m.addedNodes.length;j++)walk(m.addedNodes[j])}})
.observe(R,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:AT});
})();
