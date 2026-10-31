/* usato da build.py: titoli e descrizioni delle tappe di ogni città, per costruire i dizionari inglesi */
const fs=require("fs");global.window=global;global.CITIES={};const d=process.argv[2]+"/cities/";eval(fs.readFileSync(d+"_it.js","utf8"));
for(const f of fs.readdirSync(d)){if(f[0]=="_")continue;try{eval(fs.readFileSync(d+f,"utf8"))}catch(e){}}
const o={};for(const id in CITIES){const S=CITIES[id].STOPS||{};o[id]={};for(const k in S)o[id][k]=[S[k].t||"",S[k].d||""]}
fs.writeFileSync(process.argv[3],JSON.stringify(o));
