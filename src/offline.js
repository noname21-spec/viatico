/* ===== uso offline: avviso senza rete ===== */
(function(){
var $=function(s){return document.querySelector(s)};
function toast(t){var el=$("#toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},2600)}
/* avviso offline */
var chip=$("#offl");function net(first){if(chip)chip.hidden=navigator.onLine;document.documentElement.classList.toggle('offl',!navigator.onLine);if(!first)toast(navigator.onLine?"Di nuovo online":"Sei offline: l'app funziona, mappa solo nelle zone già viste")}
window.addEventListener("online",function(){net()});window.addEventListener("offline",function(){net()});net(true);
})();
