import os,json
from themes import css_for
d=os.path.dirname(os.path.abspath(__file__))
r=lambda n:open(os.path.join(d,n)).read()
ORDER=["paris","bcn","roma","londra","amsterdam","lisbona","berlino","praga","vienna"]
# città non ancora pronte: compaiono come «In arrivo»
META={
"bcn":{"n":"Barcellona","c":"Spagna","e":"🏖️","col":["#004d98","#a50044","#edbb00"],"k":"barcellona barcelona spagna"},
"roma":{"n":"Roma","c":"Italia","e":"🏛️","col":["#8e1b1b","#c7962c","#f2c14e"],"k":"roma rome italia"},
"londra":{"n":"Londra","c":"Regno Unito","e":"🎡","col":["#14306f","#c8102e","#e0b22e"],"k":"londra london inghilterra uk"},
"amsterdam":{"n":"Amsterdam","c":"Paesi Bassi","e":"🚲","col":["#bf2a1f","#2c4a6e","#f39200"],"k":"amsterdam olanda paesi bassi"},
"lisbona":{"n":"Lisbona","c":"Portogallo","e":"🚋","col":["#1c4f8f","#ffd200","#f2f2f2"],"k":"lisbona lisbon portogallo"},
"berlino":{"n":"Berlino","c":"Germania","e":"🐻","col":["#b3122a","#3b3f4a","#f0b323"],"k":"berlino berlin germania"},
"praga":{"n":"Praga","c":"Repubblica Ceca","e":"🏰","col":["#11457e","#c8102e","#d4a017"],"k":"praga prague repubblica ceca"},
"vienna":{"n":"Vienna","c":"Austria","e":"🎻","col":["#a7102a","#d9b25f","#ffffff"],"k":"vienna wien austria"}}
have=[c for c in ORDER if os.path.exists(os.path.join(d,'cities',c+'.js'))]
soon=[dict(id=c,**META[c]) for c in ORDER if c not in have and c in META]
cities=r('cities/_it.js')+'\n'+''.join(r('cities/'+c+'.js')+'\n' for c in have)
boot='window.CITY_ORDER='+json.dumps(have)+';window.SOON='+json.dumps(soon,ensure_ascii=False)+''';
(function(){var id=null;try{id=sessionStorage.getItem("via-pick")}catch(e){}if(!id||!CITIES[id]){id=null;try{var t=JSON.parse(localStorage.getItem("via-trip")||"null");if(t&&t.date)id=t.dest||"paris"}catch(e){}}
window.PD=CITIES[id]||CITIES[CITY_ORDER[0]];Object.keys(CITIES).forEach(function(k){var C=CITIES[k];C.fx=C.fx||{};C.T=C.T||{}});
/* skyline della città */
if(PD.SKY)[].forEach.call(document.querySelectorAll("svg.sky,svg.spsky"),function(sv){var df=sv.querySelector("defs");sv.innerHTML="";if(df)sv.appendChild(df);sv.insertAdjacentHTML("beforeend",PD.SKY)})})();'''
head=r('head.html')
theme=''.join(css_for(c) for c in have if c!='paris')
mark='html.pick #splash{display:none!important}'
assert head.count(mark)==1
head=head.replace(mark,theme+mark)
html=head+r('body.html')+'<script>\n'+cities+boot+'\n</script>\n<script>\n'+r('app1.js')+'\n</script>\n<script>\n'+r('app2.js')+'\n</script>\n</body>\n</html>\n'
open('/home/claude/viatico/index.html','w').write(html)
print(len(html),have)
