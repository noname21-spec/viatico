var C="via-v286",T="via-tiles-v1",F=["./","icon-192.png","icon-mark-192.png","icon-512.png","icon-maskable-512.png","apple-touch-icon.png","manifest.webmanifest","lib/leaflet.js","lib/jsqr.min.js","lib/qrcode.min.js","lib/pdf.min.js","lib/zxing.min.js","lib/supabase.js","lib/leaflet.css","lib/images/layers.png","lib/images/layers-2x.png","lib/images/marker-icon.png","lib/images/marker-icon-2x.png","lib/images/marker-shadow.png","lib/outfit-latin-400.woff2","lib/outfit-latin-500.woff2","lib/outfit-latin-600.woff2","lib/caveat-latin-600.woff2","lib/outfit-latin-ext-400.woff2","lib/outfit-latin-ext-500.woff2","lib/outfit-latin-ext-600.woff2"];
function trim(c,n){c.keys().then(function(k){if(k.length>n)return Promise.all(k.slice(0,k.length-n).map(function(r){return c.delete(r)}))}).catch(function(){})}
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F.map(function(u){return new Request(u,{cache:"reload"})}))}).catch(function(){}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return /^via-/.test(n)&&n!==C&&n!==T&&n!=="via-share"}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
/* v286 «Condividi → Viaticum» dalla PWA installata: tengo i file e apro l'app */
if(e.request.method==="POST"&&/[?&]share-target=1/.test(e.request.url)){e.respondWith(e.request.formData().then(function(fd){return caches.open("via-share").then(function(c){var fs=fd.getAll("f").filter(function(f){return f&&f.size}).slice(0,6),tx=[fd.get("title"),fd.get("text")].filter(Boolean).join("\n"),n=0;
 return Promise.all(fs.map(function(f){return c.put("./__share/"+Date.now()+"_"+(n++),new Response(f,{headers:{"content-type":f.type||"application/octet-stream"}}))}).concat(tx?[c.put("./__share/t"+Date.now(),new Response(tx,{headers:{"content-type":"text/plain"}}))]:[]))})}).catch(function(){}).then(function(){return Response.redirect("./?shared=1",303)}));return}
if(e.request.method!=="GET")return;
var u=new URL(e.request.url),same=u.origin===location.origin;
if(/rapidapi\.com$|open-meteo\.com$|opendata\.paris\.fr$|opendatasoft\.com$/.test(u.hostname))return;
if(/tile\.openstreetmap\.org|cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.hostname)){
e.respondWith(caches.open(T).then(function(c){return c.match(e.request).then(function(m){var net=fetch(e.request).then(function(r){if(r&&(r.ok||r.type==="opaque")){c.put(e.request,r.clone());if(Math.random()<.04)trim(c,1500)}return r}).catch(function(){return m});return m||net})}));return}
if(!same)return;
var req=new Request(e.request,{cache:"no-cache"});
/* prima la rete (così l'app è sempre aggiornata), ma con poco segnale dopo 3,5 secondi si apre la copia salvata */
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(m){
var net=fetch(req).then(function(r){if(r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)}).catch(function(){})}return r});
try{e.waitUntil(net.catch(function(){}))}catch(x){}
if(!m)return net.catch(function(){return caches.match("./")});
return Promise.race([net.catch(function(){return m}),new Promise(function(res){setTimeout(function(){res(m)},3500)})])}));
});
self.addEventListener("notificationclick",function(e){e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){for(var i=0;i<l.length;i++){if("focus" in l[i])return l[i].focus()}return self.clients.openWindow((e.notification.data&&e.notification.data.url)||"./")}))});
