const fs=require('fs'),path=require('path');const d=process.argv[2];
global.window=global;global.CITIES={};global.document={documentElement:{}};global.navigator={};global.location={};
const ids=JSON.parse(process.argv[3]);
new Function(fs.readFileSync(path.join(d,'cities/_it.js'),'utf8'))();
const out={},sizes={};
for(const id of ids){new Function(fs.readFileSync(path.join(d,'cities',id+'.js'),'utf8'))();}
for(const id of ids){const C=CITIES[id];const o={};for(const k of Object.keys(C)){const v=C[k];if(typeof v==='function'||v instanceof RegExp)continue;let j;try{j=JSON.stringify(v)}catch(e){continue}if(j===undefined)continue;if(k==='SKY'||j.length<=300)o[k]=v}out[id]=o;sizes[id]=JSON.stringify(o).length}
fs.writeFileSync(process.argv[4],JSON.stringify(out));console.error(JSON.stringify(sizes).slice(0,400));
