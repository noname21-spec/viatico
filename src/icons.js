/* ===== icone di Viatico: sostituiscono le emoji di sistema =====
   Immagini 3D: Fluent Emoji di Microsoft (licenza MIT, vedi privacy.html). Dentro il testo ogni emoji
   viene sostituita da <img class="ic i3" data-n="nome">. Le immagini (WebP in base64) sono create in fase di build e
   trasformate in blob alla prima richiesta: così Safari le disegna sempre, a differenza degli sfondi CSS enormi. */
(function(){
var IMG=__IMG__,BL={};
function src(n){if(BL[n])return BL[n];var b64=IMG[n];if(!b64)return"";var u="data:image/webp;base64,"+b64;try{var bin=atob(b64),a=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);u=URL.createObjectURL(new Blob([a],{type:"image/webp"}))}catch(e){}return BL[n]=u}
/* corrispondenze emoji → icona */
var M={};
function m(n,s){s.split(/\s+/).forEach(function(c){if(c)M[c]=n})}
m("plane","✈ 🛫 🛬 🛩");m("train","🚇 🚆 🚉 🚄 🚅 🚊 🚝 🚞 🚂 🚌 🚍 🚎 🚃");m("walk","🚶 🚶‍♂ 🚶‍♀ 🏃 🥾");m("car","🚗 🚕 🚖 🛺 🚙 🚐");m("motorbike","🏍 🛵");m("boat","⛴ 🛶 ⛵ 🚤 🚢");m("bike","🚲");
m("temple","🏛 🏦");m("castle","🏰 🏯 🏗");m("dome","⛪ 🕌 🕍 ⛩ ✡ ⚜ 🛕 ⛫");m("tower","🗼");m("statue","🗽 🗿");m("city","🏙 🌆 🌇 🌃 🌁 🏢 🏬 🏘");m("bridge","🌉");m("beach","🏖 🏝 ⛱");m("mountain","🏔 ⛰ 🌋 🗻 🏜 ⛷ 🏂");
m("tree","🌳 🌲 🎄");m("leaf","🌿 🍀 🌱 🥦 🌾 🥝 🍎 🍏 🍁 🌻 🌷 🌸 🌹 🥬 🍃 🥑 🍅 🥕 🌽");m("palm","🌴");m("fountain","⛲");m("wall","🧱");m("vase","🏺");m("palette","🎨");m("frame","🖼");m("mask","🎭 💃 🎪 🎶 🎸 🎻 🎵 🎤");m("film","🎬 🎞");m("dice","🎰");m("camera","📷 📸 🤳 📹");
m("cup","☕ 🍵 🧋 🫖");m("croissant","🥐 🥯 🥨");m("bread","🥖 🍞");m("sandwich","🥪 🥙 🌮 🌯 🍔 🌭 🍟 🧇 🥞");m("cake","🍰 🍮 🍫 🍯 🥧 🍩 🍪 🧁 🎂 🍬");m("icecream","🍦 🍨 🍧");m("pizza","🍕");m("bowl","🍝 🍜 🍲 🥘 🍛 🍙 🥟 🍚 🍱 🍣 🥣");m("fish","🐟 🦞 🦐 🦑 🐙 🍤");m("steak","🥩 🍖 🍗");m("salad","🥗");m("wine","🍷 🥂 🍸 🍹 🥃");m("beer","🍺 🍻");m("cutlery","🍽 🍴");m("egg","🍳 🧀");
m("sun","☀ 🌞");m("suncloud","🌤 🌦 ⛅ 🌥");m("cloud","☁");m("rain","🌧");m("snow","🌨 ❄");m("storm","⛈ 🌩");m("fog","🌫");m("moon","🌙 🌗 🌕 🌛");m("sunrise","🌅 🌄");m("spark","✨ 🎉 🌈 🌟 ⭐ 🎊");
m("gear","⚙");m("search","🔎 🔍");m("pin","📍 🚩 📌");m("compass","🧭");m("map","🗺");m("calendar","📅 📆");m("clipboard","📋");m("share","📤 📲");m("link","🔗 ➿");m("user","👤");m("users","🤝 👥");m("phone","📞 ☎");m("signal","📡 📶");m("speaker","🔊 🔈");m("speech","🗣 💬");m("pencil","✏ ✍");m("trash","🗑");m("mail","✉ 📧");m("lock","🔒");m("euro","💶 💰 💵");m("card","💳");m("drop","💧");m("clock","🕙 🕗 🕐 🕓 ⌚ ⏱ 🕒 🕔 🕕 🕖 🕘 🕑 🕚 🕛 ⏰");m("hourglass","⏳");m("warn","⚠ 🚨");m("check","✅ ✓ ✔");m("ban","🚫");m("bulb","💡");m("buoy","🛟");m("bag","🛍");m("suitcase","🧳");m("bottle","🧴");m("book","📖 📚");m("doc","📄 📃");m("cross","🏥");m("crown","👑");m("globe","🌍 🌏 🌎");m("shield","🛡");m("phoneoff","📴");m("hot","♨");m("anchor","⚓");m("home","🏠 🏡");m("hotel","🏨 🏩");m("paw","🦎 🦁 🐻 🐼 🐴 🐉 🦌 🦅 🦙 🐪 🦒 🦘 🦕 🧜 🧜‍♀ 🐘 🦜 🐋 🐬 🦈 🦢 🐧 🦦 🐿 🦊");m("torii","⛩");m("ski","⛷");m("star","★");m("arrow","→");m("back","←");m("up","↗");m("refresh","↻");m("close","✕");m("eye","👁");
var KEYS=Object.keys(M).sort(function(a,b){return b.length-a.length}).map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")});
/* emoji (con eventuale selettore di variante FE0F e legature) oppure simbolo semplice */
var RE=new RegExp("("+KEYS.join("|")+")️?","g");
/* glifi lineari (solo frecce e comandi); tutte le altre icone sono immagini 3D, definite in CSS (.i3[data-n]) */
var G='<g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">',E='</g>';
var D={check:G+'<path d="M4.5 12.5 10 18 19.5 6.5"/>'+E,arrow:G+'<path d="M5 12h14M13 6l6 6-6 6"/>'+E,back:G+'<path d="M19 12H5M11 6l-6 6 6 6"/>'+E,up:G+'<path d="M7 17 17 7M9 7h8v8"/>'+E,refresh:G+'<path d="M20 11a8 8 0 0 0-14.5-3.5L4 9.5M4 4.5v5h5M4 13a8 8 0 0 0 14.5 3.5l1.5-2M20 19.5v-5h-5"/>'+E,close:G+'<path d="M6 6l12 12M18 6 6 18"/>'+E,dl:G+'<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 20h14"/>'+E};
var sp='<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>'+Object.keys(D).map(function(k){return '<symbol id="i-'+k+'" viewBox="0 0 24 24">'+D[k]+'</symbol>'}).join("")+'</defs></svg>';
function mount(){if(document.getElementById("ic-sprite"))return;var d=document.createElement("div");d.id="ic-sprite";d.setAttribute("aria-hidden","true");d.style.cssText="position:absolute;width:0;height:0;overflow:hidden";d.innerHTML=sp;document.body.insertBefore(d,document.body.firstChild)}
var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,TITLE:1,INPUT:1,SELECT:1,CODE:1,NOSCRIPT:1};
function ok(n){for(var p=n.parentNode;p&&p!==document.body;p=p.parentNode){if(p.nodeType!==1)continue;if(SKIP[p.tagName]||p.hasAttribute("data-noicon")||p.namespaceURI==="http://www.w3.org/2000/svg")return false}return true}
function icon(name){
  if(D[name]){var s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","ic ic-"+name);s.setAttribute("viewBox","0 0 24 24");s.setAttribute("aria-hidden","true");var u=document.createElementNS("http://www.w3.org/2000/svg","use");u.setAttribute("href","#i-"+name);s.appendChild(u);return s}
  var e=document.createElement("img");e.className="ic i3";e.setAttribute("data-n",name);e.alt="";e.setAttribute("aria-hidden","true");e.draggable=false;e.decoding="sync";e.onerror=function(){this.onerror=null;this.src="data:image/webp;base64,"+IMG[name]};e.src=src(name);return e}
function fix(t){var s=t.nodeValue;if(!s||!RE.test(s)){RE.lastIndex=0;return}RE.lastIndex=0;if(!ok(t))return;
var f=document.createDocumentFragment(),last=0,mm;while((mm=RE.exec(s))){if(mm.index>last)f.appendChild(document.createTextNode(s.slice(last,mm.index)));f.appendChild(icon(M[mm[1]]));last=mm.index+mm[0].length}
if(last<s.length)f.appendChild(document.createTextNode(s.slice(last)));t.parentNode.replaceChild(f,t)}
function scan(root){if(!root)return;if(root.nodeType===3){fix(root);return}if(root.nodeType!==1)return;if(SKIP[root.tagName])return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),a=[],n;while((n=w.nextNode()))a.push(n);a.forEach(fix)}
var q=[],raf=0;function flush(){raf=0;var b=q;q=[];b.forEach(function(n){if(n.isConnected)scan(n)})}
function sched(n){q.push(n);if(!raf)raf=requestAnimationFrame(flush)}
function start(){mount();scan(document.body);
var mo=new MutationObserver(function(rs){rs.forEach(function(r){if(r.type==="childList")r.addedNodes.forEach(function(n){if(n.nodeType===1||n.nodeType===3)sched(n)});else if(r.type==="characterData")sched(r.target)})});
mo.observe(document.body,{childList:true,subtree:true,characterData:true})}
/* controllo di sicurezza: se un'icona non si è disegnata (immagine non decodificata o blob perso), la ricarica */
function repair(){var l=document.querySelectorAll("img.i3"),i,e,n;for(i=0;i<l.length;i++){e=l[i];if(e.complete&&e.naturalWidth===0){n=e.getAttribute("data-n");if(IMG[n]){e.onerror=null;e.src="data:image/webp;base64,"+IMG[n]}}}}
var rt=0;function repairSoon(d){clearTimeout(rt);rt=setTimeout(repair,d||250)}
document.addEventListener("visibilitychange",function(){if(!document.hidden)repairSoon(120)});
window.addEventListener("pageshow",function(){repairSoon(120)});window.addEventListener("online",function(){repairSoon(200)});
window.addEventListener("resize",function(){repairSoon(400)});window.addEventListener("orientationchange",function(){repairSoon(500)});
document.addEventListener("change",function(){repairSoon(350)},true);window.addEventListener("load",function(){repairSoon(900);setTimeout(repair,3500)});
var NAMES={};Object.keys(M).forEach(function(k){NAMES[M[k]]=1});window.VIC={icon:icon,scan:scan,names:Object.keys(NAMES),map:M};
if(document.body)start();else document.addEventListener("DOMContentLoaded",start)
})();
