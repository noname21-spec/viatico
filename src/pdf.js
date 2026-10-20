/* ===== impostazioni: PDF dell'itinerario, condivisione, QR code ===== */
(function(){
var $=function(s){return document.querySelector(s)};
function toast(t){var el=$("#toast");if(!el)return;el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},2200)}

/* ---------- generatore di QR code (modalità byte, correzione M, versioni 1-10) ---------- */
var QR=(function(){
var ECPB=[0,10,16,26,18,24,16,18,22,22,26],NB=[0,1,1,1,2,2,4,4,4,5,5];
function raw(v){var r=(16*v+128)*v+64;if(v>=2){var n=Math.floor(v/7)+2;r-=(25*n-10)*n-55;if(v>=7)r-=36}return r}
function dataCw(v){return Math.floor(raw(v)/8)-ECPB[v]*NB[v]}
function gmul(x,y){var z=0;for(var i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z}
function rsDiv(deg){var r=[],i,j,root=1;for(i=0;i<deg-1;i++)r.push(0);r.push(1);for(i=0;i<deg;i++){for(j=0;j<r.length;j++){r[j]=gmul(r[j],root);if(j+1<r.length)r[j]^=r[j+1]}root=gmul(root,2)}return r}
function rsRem(data,div){var r=div.map(function(){return 0});data.forEach(function(b){var f=b^r.shift();r.push(0);div.forEach(function(c,i){r[i]^=gmul(c,f)})});return r}
function utf8(s){var o=[],b=unescape(encodeURIComponent(s));for(var i=0;i<b.length;i++)o.push(b.charCodeAt(i));return o}
function make(text){
 var bytes=utf8(text),v,i,j;
 for(v=1;v<=10;v++){if(4+(v<10?8:16)+bytes.length*8<=dataCw(v)*8)break}
 if(v>10)return null;
 var bits=[];function put(val,n){for(var k=n-1;k>=0;k--)bits.push((val>>>k)&1)}
 put(4,4);put(bytes.length,v<10?8:16);bytes.forEach(function(b){put(b,8)});
 var cap=dataCw(v)*8;put(0,Math.min(4,cap-bits.length));put(0,(8-bits.length%8)%8);
 for(var pad=0xEC;bits.length<cap;pad^=0xEC^0x11)put(pad,8);
 var data=[];for(i=0;i<bits.length;i+=8){var by=0;for(j=0;j<8;j++)by=(by<<1)|bits[i+j];data.push(by)}
 var nb=NB[v],ecl=ECPB[v],rawCw=Math.floor(raw(v)/8),nShort=nb-rawCw%nb,sLen=Math.floor(rawCw/nb),blocks=[],div=rsDiv(ecl),k=0;
 for(i=0;i<nb;i++){var d=data.slice(k,k+sLen-ecl+(i<nShort?0:1));k+=d.length;var e=rsRem(d,div);if(i<nShort)d.push(0);blocks.push(d.concat(e))}
 var all=[];for(i=0;i<blocks[0].length;i++)blocks.forEach(function(b,jj){if(i!==sLen-ecl||jj>=nShort)all.push(b[i])});
 var size=v*4+17,m=[],fn=[];
 for(i=0;i<size;i++){m.push(new Array(size).fill(false));fn.push(new Array(size).fill(false))}
 function set(x,y,d){m[y][x]=d;fn[y][x]=true}
 function bit(x,i){return((x>>>i)&1)!==0}
 for(i=0;i<size;i++){set(6,i,i%2===0);set(i,6,i%2===0)}
 function finder(cx,cy){for(var dy=-4;dy<=4;dy++)for(var dx=-4;dx<=4;dx++){var dist=Math.max(Math.abs(dx),Math.abs(dy)),xx=cx+dx,yy=cy+dy;if(xx>=0&&xx<size&&yy>=0&&yy<size)set(xx,yy,dist!==2&&dist!==4)}}
 finder(3,3);finder(size-4,3);finder(3,size-4);
 var pos=[];if(v>1){var na=Math.floor(v/7)+2,step=Math.ceil((v*4+4)/(na*2-2))*2;pos=[6];for(var p=size-7;pos.length<na;p-=step)pos.splice(1,0,p)}
 pos.forEach(function(a,ia){pos.forEach(function(b,ib){if((ia===0&&ib===0)||(ia===0&&ib===pos.length-1)||(ia===pos.length-1&&ib===0))return;for(var dy=-2;dy<=2;dy++)for(var dx=-2;dx<=2;dx++)set(a+dx,b+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1)})});
 function fmt(mask){var dd=mask,rem=dd,t;for(t=0;t<10;t++)rem=(rem<<1)^((rem>>>9)*0x537);var b=((dd<<10)|rem)^0x5412;
  for(t=0;t<=5;t++)set(8,t,bit(b,t));set(8,7,bit(b,6));set(8,8,bit(b,7));set(7,8,bit(b,8));for(t=9;t<15;t++)set(14-t,8,bit(b,t));
  for(t=0;t<8;t++)set(size-1-t,8,bit(b,t));for(t=8;t<15;t++)set(8,size-15+t,bit(b,t));set(8,size-8,true)}
 fmt(0);
 if(v>=7){var r2=v,t2;for(t2=0;t2<12;t2++)r2=(r2<<1)^((r2>>>11)*0x1F25);var vb=(v<<12)|r2;for(t2=0;t2<18;t2++){var c=bit(vb,t2),a=size-11+t2%3,b2=Math.floor(t2/3);set(a,b2,c);set(b2,a,c)}}
 var n=0;for(var right=size-1;right>=1;right-=2){if(right===6)right=5;for(var vert=0;vert<size;vert++)for(j=0;j<2;j++){var x=right-j,up=((right+1)&2)===0,y=up?size-1-vert:vert;if(!fn[y][x]&&n<all.length*8){m[y][x]=bit(all[n>>>3],7-(n&7));n++}}}
 function mask(mk){for(var y=0;y<size;y++)for(var x=0;x<size;x++){if(fn[y][x])continue;var inv;switch(mk){case 0:inv=(x+y)%2===0;break;case 1:inv=y%2===0;break;case 2:inv=x%3===0;break;case 3:inv=(x+y)%3===0;break;case 4:inv=(Math.floor(x/3)+Math.floor(y/2))%2===0;break;case 5:inv=x*y%2+x*y%3===0;break;case 6:inv=(x*y%2+x*y%3)%2===0;break;default:inv=((x+y)%2+x*y%3)%2===0}if(inv)m[y][x]=!m[y][x]}}
 function penalty(){var res=0,y,x;
  function hist(h,len){if(h[0]===0)len+=size;h.pop();h.unshift(len)}
  function pat(h){var q=h[1],core=q>0&&h[2]===q&&h[3]===q*3&&h[4]===q&&h[5]===q;return(core&&h[0]>=q*4&&h[6]>=q?1:0)+(core&&h[6]>=q*4&&h[0]>=q?1:0)}
  function term(col,len,h){if(col){hist(h,len);len=0}len+=size;hist(h,len);return pat(h)}
  for(y=0;y<size;y++){var col=false,run=0,h=[0,0,0,0,0,0,0];for(x=0;x<size;x++){if(m[y][x]===col){run++;if(run===5)res+=3;else if(run>5)res++}else{hist(h,run);if(!col)res+=pat(h)*40;col=m[y][x];run=1}}res+=term(col,run,h)*40}
  for(x=0;x<size;x++){var col2=false,run2=0,h2=[0,0,0,0,0,0,0];for(y=0;y<size;y++){if(m[y][x]===col2){run2++;if(run2===5)res+=3;else if(run2>5)res++}else{hist(h2,run2);if(!col2)res+=pat(h2)*40;col2=m[y][x];run2=1}}res+=term(col2,run2,h2)*40}
  for(y=0;y<size-1;y++)for(x=0;x<size-1;x++){var cc=m[y][x];if(cc===m[y][x+1]&&cc===m[y+1][x]&&cc===m[y+1][x+1])res+=3}
  var dark=0;m.forEach(function(r){r.forEach(function(c){if(c)dark++})});var tot=size*size;res+=(Math.ceil(Math.abs(dark*20-tot*10)/tot)-1)*10;return res}
 var best=0,bp=1e9;for(var mk=0;mk<8;mk++){mask(mk);fmt(mk);var pn=penalty();if(pn<bp){bp=pn;best=mk}mask(mk)}
 mask(best);fmt(best);
 return{size:size,m:m}
}
function svg(text,quiet){var q=make(text);if(!q)return "";quiet=quiet==null?4:quiet;var s=q.size,d="";
 for(var y=0;y<s;y++){var x=0;while(x<s){if(q.m[y][x]){var x0=x;while(x<s&&q.m[y][x])x++;d+="M"+x0+" "+y+"h"+(x-x0)+"v1h-"+(x-x0)+"z"}else x++}}
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(-quiet)+' '+(-quiet)+' '+(s+quiet*2)+' '+(s+quiet*2)+'" shape-rendering="crispEdges" aria-hidden="true"><rect x="'+(-quiet)+'" y="'+(-quiet)+'" width="'+(s+quiet*2)+'" height="'+(s+quiet*2)+'" fill="#fff"/><path d="'+d+'" fill="#000"/></svg>'}
return{svg:svg,make:make}
})();
window.VIATICO_QR=QR;

/* ---------- finestra QR ---------- */
var qrbox=$("#qrbox");
function appUrl(){var u=location.href.split("#")[0].split("?")[0];return u.replace(/index\.html$/,"")}
function openQr(){var u=appUrl();$("#qrimg").innerHTML=QR.svg(u,4);$("#qru").textContent=u.replace(/^https?:\/\//,"");qrbox.classList.add("on");qrbox.setAttribute("aria-hidden","false")}
function closeQr(){qrbox.classList.remove("on");qrbox.setAttribute("aria-hidden","true")}
function copyText(t){return(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject()).catch(function(){var a=document.createElement("textarea");a.value=t;a.setAttribute("readonly","");a.style.cssText="position:fixed;opacity:0;top:0";document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}a.remove();if(!ok)throw 0})}
if(qrbox){
 $("#shapp").addEventListener("click",function(){openQr()});
 var ds=$("#dshare");if(ds)ds.addEventListener("click",function(){openQr()});var ds2=$("#dshare2");if(ds2)ds2.addEventListener("click",function(){openQr()});
 $("#qrclose").addEventListener("click",closeQr);
 qrbox.addEventListener("click",function(e){if(e.target===qrbox)closeQr()});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")closeQr()});
 $("#qrshare").addEventListener("click",function(){var u=appUrl();if(navigator.share){navigator.share({title:"Viaticum",text:"Viaticum: itinerario, voli, mappa, pasti e costi per il tuo viaggio.",url:u}).catch(function(){})}else{copyText(u).then(function(){toast("Link copiato")},function(){toast("Copia il link dal codice qui sopra")})}});
 $("#qrcopy").addEventListener("click",function(){copyText(appUrl()).then(function(){toast("Link copiato")},function(){toast("Non riesco a copiare il link")})});
}

/* ---------- lettura dell'itinerario dalla pagina ---------- */
function T(e){return(e&&e.textContent||"").replace(/\s+/g," ").trim()}
function grabDay(){
 var steps=[];
 [].forEach.call(document.querySelectorAll("#steps > li"),function(li){
  var t=T(li.querySelector(".t")),body=li.querySelector(".body"),title=T(body&&body.querySelector("h2")),parts=[];
  if(body)[].forEach.call(body.children,function(c){
   var tag=c.tagName;
   if(tag==="H2"||(tag==="A"&&c.classList.contains("go")))return;
   if(c.classList.contains("leg")){parts.push({k:"leg",text:T(c.querySelector("span"))||T(c)});return}
   if(tag==="P"){var s=T(c);if(s)parts.push({k:c.classList.contains("meta")?"meta":"p",text:s});return}
   if(c.classList.contains("eat")){
    [].forEach.call(c.querySelectorAll("li"),function(it){
     var cl=it.cloneNode(true);[].forEach.call(cl.querySelectorAll(".go,.st"),function(x){x.remove()});
     var hr=cl.querySelector(".hrs"),hrs=hr?T(hr).replace(/^\S*\s*/,""):"";if(hr)hr.remove();
     var nm=T(cl.querySelector("b")),all=T(cl),rest=nm?all.slice(nm.length).replace(/^[\s–-]+/,""):all;
     parts.push({k:"item",name:nm,text:rest,hrs:hrs})});return}
   var s2=T(c);if(s2)parts.push({k:"p",text:s2})
  });
  steps.push({t:t,title:title,cls:li.className,parts:parts})});
 return{head:T($("#ith")),steps:steps}
}
function grabCosts(){
 var rows=[],q=function(x){return[].map.call(x.children,function(y){return T(y)})},H=document.querySelector("#ctab .cth");
 if(H){var h=q(H);h[0]="Voce";rows.push({k:"head",c:h})}
 [].forEach.call(document.querySelectorAll("#ctab .cg"),function(g){
  var s=g.querySelector(".cs");rows.push({k:"grp",c:q(s).map(function(x){return x.replace(/›$/,"")})});
  [].forEach.call(g.querySelectorAll(".cr"),function(r){if(!r.classList.contains("off"))rows.push({k:"row",c:q(r).map(function(x){return x.replace(/ Modifica ›$/,"")})})})});
 var t=document.querySelector("#ctab .ctot");if(t)rows.push({k:"tot",c:q(t)});
 return rows
}
function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
function grabAll(){
 function P(i){return document.querySelectorAll("#dsel1 .dp")[i]}
 var cnt=document.querySelectorAll("#dsel1 .dp").length,cur=0,days=[],i0;
 for(i0=0;i0<cnt;i0++)if(P(i0).classList.contains("on"))cur=i0;
 var P0=window.PAR,seq=Promise.resolve();if(P0)P0.quiet=1;
 function one(i){seq=seq.then(function(){P(i).click();days.push(grabDay());return new Promise(function(r){requestAnimationFrame(function(){r()})})})}
 for(i0=0;i0<cnt;i0++)one(i0);
 if(cnt)seq=seq.then(function(){P(cur).click()});else seq=seq.then(function(){days.push(grabDay())});
 seq=seq.then(function(){if(P0){P0.quiet=0;P0.emit()}},function(e){if(P0)P0.quiet=0;throw e});
 return seq.then(function(){
  var h1=T($("#itinerario h1"))||"Itinerario",city=(h1.split(/\s+in\s+/)[0]||h1);
  return{title:h1,city:city,sub:T($("#hsub")),days:days,costs:grabCosts()}})
}

/* ---------- PDF (testo, Helvetica) ---------- */
var WR=[278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
var WB=[278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];
var SP={"’":"'","‘":"'","“":'"',"”":'"',"«":'"',"»":'"',"→":"->","←":"<-","↗":"","︎":"","️":"","‍":"","‑":"-","−":"-","≈":"~","✓":""," ":" "," ":" "," ":" ","≤":"<=","≥":">=","ł":"l","Ł":"L","đ":"d","Đ":"D","•":"•"};
var WIN={"€":128,"…":133,"‘":145,"’":146,"“":147,"”":148,"•":149,"–":150,"—":151,"™":153};
function clean(s){
 s=String(s==null?"":s).replace(/\s*★/g," stelle").replace(/[\u{1F000}-\u{1FFFF}☀-➿⬀-⯿⌀-⏿]/gu,"");
 var o="";for(var i=0;i<s.length;i++){var ch=s.charAt(i);if(SP.hasOwnProperty(ch)){o+=SP[ch];continue}
  var c=ch.charCodeAt(0);
  if((c>=32&&c<=126)||(c>=160&&c<=255)||WIN[ch]){o+=ch;continue}
  var b=ch.normalize("NFD").replace(/[̀-ͯ]/g,"");if(b&&b.length===1&&b.charCodeAt(0)<127&&b.charCodeAt(0)>=32)o+=b}
 return o.replace(/\(\s*\)/g,"").replace(/\s+/g," ").replace(/\s+([,.;:])/g,"$1").trim()
}
function cw(ch,bold){var c=ch.charCodeAt(0);if(c>=32&&c<=126)return(bold?WB:WR)[c-32];
 if(WIN[ch]){return ch==="—"?1000:ch==="…"?1000:ch==="•"?350:ch==="€"?556:ch==="–"?556:(bold?500:333)}
 if(c===183)return 278;if(c===176)return 400;if(c===215)return 584;
 var b=ch.normalize("NFD").charAt(0),bc=b.charCodeAt(0);if(bc>=32&&bc<=126)return(bold?WB:WR)[bc-32];return 556}
function tw(s,size,bold){var w=0;for(var i=0;i<s.length;i++)w+=cw(s.charAt(i),bold);return w*size/1000}
function enc(s){var o="";for(var i=0;i<s.length;i++){var ch=s.charAt(i),c=ch.charCodeAt(0);if(WIN[ch])c=WIN[ch];
 if(c===40||c===41||c===92)o+="\\"+ch;else if(c<32||c>126)o+="\\"+("00"+c.toString(8)).slice(-3);else o+=ch}return o}
function wrap(s,size,bold,w){var words=s.split(" "),lines=[],cur="";
 words.forEach(function(wd){if(!wd)return;var t=cur?cur+" "+wd:wd;if(tw(t,size,bold)<=w||!cur)cur=t;else{lines.push(cur);cur=wd}});
 if(cur)lines.push(cur);return lines}
function hex(c){c=(c||"#0388b0").replace("#","");if(c.length===3)c=c.replace(/./g,"$&$&");return[parseInt(c.substr(0,2),16)/255,parseInt(c.substr(2,2),16)/255,parseInt(c.substr(4,2),16)/255]}
function mixc(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]}
function lum(c){return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function f(n){return(Math.round(n*100)/100).toString()}
function rg(c){return f(c[0])+" "+f(c[1])+" "+f(c[2])}

function makePdf(D){
 var W=595.28,H=841.89,M=44,CW=W-M*2,TOP=M,BOT=H-M-14;
 var CS=window.CITIES&&CITIES[document.documentElement.getAttribute("data-city")],cols=(CS&&CS.col&&CS.col[0]&&CS.col[0].charAt&&CS.col[0].charAt(0)==="#")?CS.col:["#0388b0","#16b6cf","#ffd23f"];
 var A=hex(cols[0]),B=hex(cols[1]),INK=[.1,.13,.17],MUTE=[.38,.42,.47],WHITE=[1,1,1],TINT=mixc(A,WHITE,.9),LINE=mixc(A,WHITE,.78);
 if(lum(A)>.62)A=mixc(A,[0,0,0],.45);
 var pages=[],cur,y;
 function np(){cur=[];pages.push(cur);y=TOP}
 function ensure(h){if(y+h>BOT)np()}
 function txt(x,yb,size,font,col,s){cur.push("BT /"+font+" "+f(size)+" Tf "+rg(col)+" rg "+f(x)+" "+f(H-yb)+" Td ("+enc(s)+") Tj ET")}
 function rect(x,yt,w,h,col){cur.push(rg(col)+" rg "+f(x)+" "+f(H-yt-h)+" "+f(w)+" "+f(h)+" re f")}
 function rrect(x,yt,w,h,r,col){var k=.5523*r,x2=x+w,yb=H-yt-h,y2=H-yt;cur.push(rg(col)+" rg "+f(x+r)+" "+f(yb)+" m "+f(x2-r)+" "+f(yb)+" l "+f(x2-r+k)+" "+f(yb)+" "+f(x2)+" "+f(yb+r-k)+" "+f(x2)+" "+f(yb+r)+" c "+f(x2)+" "+f(y2-r)+" l "+f(x2)+" "+f(y2-r+k)+" "+f(x2-r+k)+" "+f(y2)+" "+f(x2-r)+" "+f(y2)+" c "+f(x+r)+" "+f(y2)+" l "+f(x+r-k)+" "+f(y2)+" "+f(x)+" "+f(y2-r+k)+" "+f(x)+" "+f(y2-r)+" c "+f(x)+" "+f(yb+r)+" l "+f(x)+" "+f(yb+r-k)+" "+f(x+r-k)+" "+f(yb)+" "+f(x+r)+" "+f(yb)+" c f")}
 function hline(yt,col,x1,x2){cur.push(rg(col)+" RG .6 w "+f(x1)+" "+f(H-yt)+" m "+f(x2)+" "+f(H-yt)+" l S")}
 function para(s,o){s=clean(s);if(!s)return;var size=o.size||9.5,lead=o.lead||size*1.38,x=o.x==null?M:o.x,w=o.w||CW,font=o.bold?"F2":o.it?"F3":"F1",lines=wrap(s,size,o.bold,w);
  lines.forEach(function(l){ensure(lead);txt(x,y+size,size,font,o.col||INK,l);y+=lead});y+=o.after||0}
 np();
 /* copertina */
 rect(0,0,W,118,A);rect(0,118,W,3,B);
 txt(M,38,9,"F2",mixc(A,WHITE,.7),"VIATICUM");
 var ttl=clean(D.title),tsz=26;while(tw(ttl,tsz,true)>CW&&tsz>16)tsz-=1;
 txt(M,86,tsz,"F2",lum(A)>.62?INK:WHITE,ttl);
 y=118+3+16;
 para(D.sub,{size:10,col:MUTE,after:6});
 /* giorni */
 D.days.forEach(function(d,di){
  ensure(70);y+=6;
  var hd=clean(d.head)||("Giorno "+(di+1));
  rrect(M,y,CW,26,7,TINT);rect(M,y+5,4,16,A);txt(M+14,y+18,12.5,"F2",A,hd);y+=26+10;
  d.steps.forEach(function(s,si){
   var tx=M+44,tw2=CW-44;
   var tl=wrap(clean(s.title),11,true,tw2),first=(s.parts[0]&&s.parts[0].k==="leg")?2:1;
   ensure(tl.length*15+first*14+8);
   var y0=y;
   txt(M,y+11,10,"F2",A,clean(s.t));
   tl.forEach(function(l){txt(tx,y+11,11,"F2",INK,l);y+=15});
   s.parts.forEach(function(p){
    if(p.k==="leg")para("-> "+p.text,{size:8.8,it:1,col:A,x:tx,w:tw2,after:2});
    else if(p.k==="meta")para(p.text,{size:8.6,col:MUTE,x:tx,w:tw2,after:2});
    else if(p.k==="item"){var nm=clean(p.name),tx2=tx+8,w2=tw2-8,line1=clean(p.text);
     ensure(24);txt(tx,y+8.6,8.6,"F2",A,"•");
     var nl=wrap(nm,9.2,true,w2);nl.forEach(function(l){ensure(13);txt(tx2,y+9.2,9.2,"F2",INK,l);y+=12.5});
     if(line1)para(line1,{size:8.6,col:MUTE,x:tx2,w:w2});
     if(p.hrs)para("Orario: "+p.hrs,{size:8.4,col:MUTE,x:tx2,w:w2,it:1});y+=3}
    else para(p.text,{size:9.3,x:tx,w:tw2,after:2})});
   y+=5;if(si<d.steps.length-1)hline(y,LINE,tx,M+CW);y+=7});
  y+=6});
 /* costi */
 if(D.costs&&D.costs.length){
  ensure(80);y+=8;rrect(M,y,CW,26,7,TINT);rect(M,y+5,4,16,A);txt(M+14,y+18,12.5,"F2",A,"Costi stimati");y+=26+8;
  var c2=M+CW-70,c1=M+CW-150;
  D.costs.forEach(function(r){
   if(r.k==="grp"){ensure(24);y+=4;txt(M+4,y+11,10,"F2",A,clean(r.c[0]));y+=17;return}
   var isH=r.k==="head",isT=r.k==="tot",font=(isH||isT)?"F2":"F1",size=isH?8.8:9.2,col=isH?MUTE:INK;
   var lines=wrap(clean(r.c[0]),size,isT||isH,c1-M-14);ensure(lines.length*12+6);
   if(isT){hline(y+1,A,M,M+CW);y+=5}
   lines.forEach(function(l,li){txt(M+4,y+size+1,size,font,col,l);if(li===0){var a=clean(r.c[1]||""),b=clean(r.c[2]||"");txt(c1+60-tw(a,size,isT||isH),y+size+1,size,font,col,a);if(r.c[2])txt(c2+60-tw(b,size,isT||isH),y+size+1,size,font,col,b)}y+=12});
   y+=2});
  para("Stime a persona e per il gruppo: i prezzi cambiano, controllali prima di partire.",{size:8.4,col:MUTE,it:1})}
 ensure(34);y+=10;
 para("Orari, prezzi, scioperi e lavori cambiano: verifica sempre prima di partire. "+(D.only?"Costi stimati con Viaticum il ":"Itinerario creato con Viaticum il ")+new Date().toLocaleDateString("it-IT")+".",{size:8.4,col:MUTE,it:1});
 /* piè di pagina */
 var N=pages.length;
 pages.forEach(function(pg,i){cur=pg;hline(H-M+2,LINE,M,W-M);var s=clean("Viaticum · "+D.city),t=(i+1)+" / "+N;txt(M,H-M+16,8,"F1",MUTE,s);txt(W-M-tw(t,8,false),H-M+16,8,"F1",MUTE,t)});
 /* oggetti PDF */
 var out="%PDF-1.4\n%âãÏÓ\n",offs=[];
 function obj(s){offs.push(out.length);out+=(offs.length)+" 0 obj\n"+s+"\nendobj\n"}
 var nPg=pages.length,kids=[];for(var i=0;i<nPg;i++)kids.push((7+i*2)+" 0 R");
 obj("<</Type/Catalog/Pages 2 0 R>>");
 obj("<</Type/Pages/Kids["+kids.join(" ")+"]/Count "+nPg+">>");
 ["Helvetica","Helvetica-Bold","Helvetica-Oblique"].forEach(function(n){obj("<</Type/Font/Subtype/Type1/BaseFont/"+n+"/Encoding/WinAnsiEncoding>>")});
 obj("<</Title("+enc(clean(D.title))+")/Creator(Viaticum)/Producer(Viaticum)>>");
 pages.forEach(function(pg,i){var s=pg.join("\n");
  obj("<</Type/Page/Parent 2 0 R/MediaBox[0 0 "+f(W)+" "+f(H)+"]/Resources<</Font<</F1 3 0 R/F2 4 0 R/F3 5 0 R>>>>/Contents "+(8+i*2)+" 0 R>>");
  obj("<</Length "+s.length+">>\nstream\n"+s+"\nendstream")});
 var xr=out.length;out+="xref\n0 "+(offs.length+1)+"\n0000000000 65535 f \n";
 offs.forEach(function(o){out+=("0000000000"+o).slice(-10)+" 00000 n \n"});
 out+="trailer\n<</Size "+(offs.length+1)+"/Root 1 0 R/Info 6 0 R>>\nstartxref\n"+xr+"\n%%EOF";
 var u8=new Uint8Array(out.length);for(var k=0;k<out.length;k++)u8[k]=out.charCodeAt(k)&255;
 return new Blob([u8],{type:"application/pdf"})
}
window.VIATICO_PDF={make:makePdf,grab:grabAll,clean:clean,wrap:wrap};

/* ---------- testo riassuntivo (se non si può condividere il file) ---------- */
function summary(D){var o=[D.title,D.sub,""];D.days.forEach(function(d){o.push(d.head);d.steps.forEach(function(s){o.push("  "+s.t+"  "+s.title)});o.push("")});o.push("Creato con Viaticum: "+appUrl());return o.join("\n")}

/* ---------- pulsanti ---------- */
function ready(){if(!document.querySelector("#steps > li")){toast("Imposta prima il tuo viaggio");return false}return true}
function slug(s){return clean(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"viaggio"}
function mk(){return grabAll().then(function(D){return{D:D,blob:makePdf(D),name:"Viaticum-"+slug(D.city)+"-itinerario.pdf"}})}
var isIOS=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
function download(blob,name){var u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=name;a.rel="noopener";document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(u)},4000)}
var pdfBtn=$("#shpdf"),pdfS=$("#shpdfs"),pdfS0=pdfS&&pdfS.textContent;
function busy(b,on){b.disabled=on;b.style.opacity=on?".6":""}
if(pdfBtn){pdfBtn.addEventListener("click",function(){
 if(!ready())return;busy(pdfBtn,true);pdfS.textContent="Preparo il PDF…";
 mk().then(function(r){
  var file;if(isIOS&&window.File&&navigator.canShare){try{file=new File([r.blob],r.name,{type:"application/pdf"})}catch(e){}}
  if(file&&navigator.canShare({files:[file]})){navigator.share({files:[file],title:r.D.title}).catch(function(){})}
  else download(r.blob,r.name);
  pdfS.textContent="Fatto: "+r.name;toast("PDF pronto")})
 .catch(function(){pdfS.textContent="Non sono riuscito a creare il PDF. Riprova tra poco.";toast("Il PDF non si è creato: riprova tra poco")})
 .then(function(){busy(pdfBtn,false);setTimeout(function(){pdfS.textContent=pdfS0},5000)})})}

/* ---------- calendario (.ics) ---------- */
function icsEsc(s){return String(s==null?"":s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n")}
function fold(l){var o=[];while(l.length>70){o.push(l.slice(0,70));l=" "+l.slice(70)}o.push(l);return o.join("\r\n")}
function tzOff(ms,tz){var p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(ms)).forEach(function(x){p[x.type]=+x.value});return(Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-ms)/6e4}
function utcOf(date,min,tz){var a=date.split("-").map(Number),g=Date.UTC(a[0],a[1]-1,a[2],0,min),o=tzOff(g,tz);o=tzOff(g-o*6e4,tz);return g-o*6e4}
function zt(ms){var d=new Date(ms),z=function(n){return("0"+n).slice(-2)};return d.getUTCFullYear()+z(d.getUTCMonth()+1)+z(d.getUTCDate())+"T"+z(d.getUTCHours())+z(d.getUTCMinutes())+"00Z"}
function ft(date,min){var z=function(n){return("0"+n).slice(-2)};return date.replace(/-/g,"")+"T"+z(Math.floor(min/60)%24)+z(min%60)+"00"}
function mkIcs(D){
 var P=window.PAR,trip=P&&P.trip,cfg=P&&P.cfg,tz=(window.PD&&PD.TZ)||"Europe/Rome",L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Viaticum//IT","CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:"+icsEsc(D.title)],stamp=zt(Date.now()),n=0;
 function ev(o){n++;L.push("BEGIN:VEVENT","UID:viatico-"+(cfg&&(cfg.tid||cfg.dest+cfg.date)||"x")+"-"+n+"@viatico","DTSTAMP:"+stamp,o.when,"SUMMARY:"+icsEsc(o.title));if(o.desc)L.push("DESCRIPTION:"+icsEsc(o.desc));if(o.loc)L.push("LOCATION:"+icsEsc(o.loc));
  (o.alarms||[]).forEach(function(a){L.push("BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:"+icsEsc(o.title),"TRIGGER:-"+a,"END:VALARM")});L.push("END:VEVENT")}
 var tm=function(s){var m=/(\d{1,2}):(\d{2})/.exec(s||"");return m?+m[1]*60+ +m[2]:null};
 if(cfg&&cfg.a_dep&&cfg.date&&tm(cfg.a_dep)!=null){var s0=tm(cfg.a_dep);ev({when:"DTSTART:"+ft(cfg.date,s0)+"\r\nDTEND:"+ft(cfg.date,s0+90),title:"Volo di andata"+(cfg.a_num?" "+cfg.a_num:"")+" verso "+D.city,desc:"Partenza da "+(cfg.from||"casa")+". Imbarco, documenti e bagagli: controlla la lista in Viaticum.",alarms:["P1D","PT3H"]})}
 D.days.forEach(function(d,i){var dt=trip&&trip.days[i]&&trip.days[i].date;if(!dt)return;
  d.steps.forEach(function(s){var m=/(\d{1,2}):(\d{2})(?:\s*[–-]\s*(\d{1,2}):(\d{2}))?/.exec(s.t||"");if(!m)return;var a=+m[1]*60+ +m[2],e=m[3]?+m[3]*60+ +m[4]:a+45;if(e<=a)e=a+45;
   var title=clean(s.title)||"Tappa",desc=s.parts.map(function(p){return clean(p.k==="item"?(p.name+(p.text?": "+p.text:"")):p.text)}).filter(Boolean).join("\n");
   ev({when:"DTSTART:"+zt(utcOf(dt,a,tz))+"\r\nDTEND:"+zt(utcOf(dt,e,tz)),title:title+" · "+D.city,desc:desc,alarms:["PT15M"]})})});
 if(cfg&&cfg.r_dep&&trip&&tm(cfg.r_dep)!=null){var last=trip.days[trip.days.length-1].date,r0=tm(cfg.r_dep);ev({when:"DTSTART:"+zt(utcOf(last,r0,tz))+"\r\nDTEND:"+zt(utcOf(last,r0+90,tz)),title:"Volo di ritorno"+(cfg.r_num?" "+cfg.r_num:"")+" da "+D.city,desc:"Apertura imbarco: "+(cfg.r_imb||"controlla il biglietto")+".",alarms:["PT4H","PT2H"]})}
 L.push("END:VCALENDAR");return L.map(fold).join("\r\n")+"\r\n"}
var cpBtn=$("#ccpdf");
if(cpBtn){cpBtn.addEventListener("click",function(){
 if(!ready())return;var lab=cpBtn.textContent;busy(cpBtn,true);cpBtn.textContent="Preparo il PDF…";
 var h1=T($("#itinerario h1"))||"Costi",city=(h1.split(/\s+in\s+/)[0]||h1),D={title:"Costi stimati · "+city,city:city,sub:T($("#hsub")),days:[],costs:grabCosts(),only:1},name="Viaticum-"+slug(city)+"-costi.pdf";
 try{var blob=makePdf(D),file;if(isIOS&&window.File&&navigator.canShare){try{file=new File([blob],name,{type:"application/pdf"})}catch(e){}}
  if(file&&navigator.canShare({files:[file]})){navigator.share({files:[file],title:D.title}).catch(function(){})}else download(blob,name);toast("PDF dei costi pronto")}
 catch(e){toast("Il PDF non si è creato: riprova tra poco")}
 cpBtn.textContent=lab;busy(cpBtn,false)})}
var calBtn=$("#shcal"),calS=$("#shcals"),calS0=calS&&calS.textContent;
if(calBtn){calBtn.addEventListener("click",function(){
 if(!ready())return;busy(calBtn,true);calS.textContent="Preparo il calendario…";
 grabAll().then(function(D){var txt=mkIcs(D),name="Viaticum-"+slug(D.city)+".ics",blob=new Blob([txt],{type:"text/calendar;charset=utf-8"}),file;
  if(window.File&&navigator.canShare){try{file=new File([blob],name,{type:"text/calendar"})}catch(e){}}
  if(isIOS&&file&&navigator.canShare({files:[file]}))navigator.share({files:[file],title:D.title}).catch(function(){});else download(blob,name);
  calS.textContent="Fatto: apri il file per aggiungere gli eventi";toast("Calendario pronto")})
 .catch(function(){calS.textContent="Non sono riuscito a creare il calendario. Riprova tra poco.";toast("Il calendario non si è creato: riprova tra poco")})
 .then(function(){busy(calBtn,false);setTimeout(function(){calS.textContent=calS0},6000)})})}
window.VIATICO_ICS=mkIcs;
var shBtn=$("#shsit");
if(shBtn){shBtn.addEventListener("click",function(){
 if(!ready())return;busy(shBtn,true);
 mk().then(function(r){
  var file;try{file=new File([r.blob],r.name,{type:"application/pdf"})}catch(e){}
  if(file&&navigator.canShare&&navigator.canShare({files:[file]}))return navigator.share({files:[file],title:r.D.title,text:"Il mio itinerario con Viaticum"}).catch(function(){});
  if(navigator.share)return navigator.share({title:r.D.title,text:summary(r.D)}).catch(function(){});
  return copyText(summary(r.D)).then(function(){toast("Itinerario copiato")},function(){download(r.blob,r.name);toast("PDF scaricato")})})
 .catch(function(){toast("Condivisione non riuscita: riprova o copia il link")})
 .then(function(){busy(shBtn,false)})})}
})();
