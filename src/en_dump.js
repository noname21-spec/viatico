/* usato da build.py: titoli e descrizioni delle tappe di ogni città, per costruire i dizionari inglesi */
const fs=require("fs");global.window=global;global.CITIES={};const d=process.argv[2]+"/cities/";eval(fs.readFileSync(d+"_it.js","utf8"));
for(const f of fs.readdirSync(d)){if(f[0]=="_")continue;try{eval(fs.readFileSync(d+f,"utf8"))}catch(e){}}
for(const f of fs.readdirSync(process.argv[2])){if(/^cat[a-z]*\.js$/.test(f)){try{eval(fs.readFileSync(process.argv[2]+"/"+f,"utf8"))}catch(e){}}}
const o={};for(const id in CITIES){const C=CITIES[id],S=C.STOPS||{};o[id]={};for(const k in S)o[id][k]=[S[k].t||"",S[k].d||""];
 /* v296 note pratiche, locali dei pasti e catalogo: chiave -> testo italiano */
 const x={};for(const k in S)if(S[k].m)x["m:"+k]=S[k].m;for(const k in (C.V||{})){const v=C.V[k];if(v.d)x["vd:"+k]=v.d;if(v.pr)x["vp:"+k]=v.pr}
 for(const r of ((global.CATX||{})[id]||[])){if(r[1])x["cn:"+r[0]]=r[1];if(r[9])x["cd:"+r[0]]=r[9];if(r[10])x["cx:"+r[0]]=r[10]}
 o[id]["__x"]=x}
fs.writeFileSync(process.argv[3],JSON.stringify(o));
