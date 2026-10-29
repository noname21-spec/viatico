import os,json,datetime
from themes import css_for
from world import W,REG as REGN
d=os.path.dirname(os.path.abspath(__file__))
r=lambda n:open(os.path.join(d,n)).read()
ORDER=["paris","bcn","roma","londra","amsterdam","lisbona","berlino","praga","vienna","bruxelles","cracovia","budapest","porto","monaco","madrid","milano","firenze","venezia","napoli","siviglia","valencia","varsavia","amburgo","zurigo","copenaghen","stoccolma","oslo","helsinki","reykjavik","dublino","edimburgo","atene","istanbul","vilnius","lubiana","zagabria","bucarest","sofia","riga","tallinn","valletta","salisburgo","ginevra","malaga"]
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
RG={"paris":"eu","bcn":"eu","roma":"eu","londra":"eu","amsterdam":"eu","lisbona":"eu","berlino":"eu","praga":"eu","vienna":"eu","bruxelles":"eu","cracovia":"eu","budapest":"eu","porto":"eu","monaco":"eu","madrid":"eu","milano":"eu","firenze":"eu","venezia":"eu","napoli":"eu","siviglia":"eu","valencia":"eu","varsavia":"eu","amburgo":"eu","zurigo":"eu","copenaghen":"eu","stoccolma":"eu","oslo":"eu","helsinki":"eu","reykjavik":"eu","dublino":"eu","edimburgo":"eu","atene":"eu","istanbul":"eu","vilnius":"eu","lubiana":"eu","zagabria":"eu","bucarest":"eu","sofia":"eu","riga":"eu","tallinn":"eu","valletta":"eu","salisburgo":"eu","ginevra":"eu","malaga":"eu"}
soon=[dict(id=c,r=RG[c],**META[c]) for c in ORDER if c not in have and c in META]
soon+=[dict(id=i,n=n,c=c,e=e,r=r,col=col,k=k) for (i,n,c,e,r,col,k) in W if i not in have]
cities=r('cities/_it.js')+'\n'+''.join(r('cities/'+c+'.js')+'\n' for c in have)+r('foodtags.js')+'\n'+r('words.js')+'\n'
boot='window.CITY_ORDER='+json.dumps(have)+';window.REG='+json.dumps(RG)+';window.REGN='+json.dumps(REGN,ensure_ascii=False)+';window.SOON='+json.dumps(soon,ensure_ascii=False)+''';
(function(){var id=null;try{id=sessionStorage.getItem("via-pick")}catch(e){}if(!id||!CITIES[id]){id=null;try{var t=JSON.parse(localStorage.getItem("via-trip")||"null");if(t&&t.date)id=t.dest||"paris"}catch(e){}}
window.PD=CITIES[id]||CITIES[CITY_ORDER[0]];Object.keys(CITIES).forEach(function(k){var C=CITIES[k];C.fx=C.fx||{};C.T=C.T||{}});
/* skyline della città */
if(PD.SKY)[].forEach.call(document.querySelectorAll("svg.sky:not(.zsk),svg.spsky"),function(sv){var df=sv.querySelector("defs");sv.innerHTML="";if(df)sv.appendChild(df);sv.insertAdjacentHTML("beforeend",PD.SKY)})})();'''
cfgp=os.path.join(d,'supabase.json')
SBC=json.load(open(cfgp)) if os.path.exists(cfgp) else {}
SHARED=r('shared.js').replace('__SB_URL__',SBC.get('url','')).replace('__SB_KEY__',SBC.get('key',''))
SYNC=r('sync.js').replace('__SB_URL__',SBC.get('url','')).replace('__SB_KEY__',SBC.get('key',''))
supp=json.load(open(os.path.join(d,'support.json'))) if os.path.exists(os.path.join(d,'support.json')) else {}
body=r('body.html').replace('__SUPPORT__',supp.get('email','')).replace('__BUILD__',__import__('re').search(r'via-v(\d+)',open('sw.js').read()).group(1)+' · '+datetime.date.today().strftime('%d/%m/%Y'))
head=r('head.html')
assert head.count('</style>\n</head>')==1
head=head.replace('</style>\n</head>',r('design-g.css')+'\n</style>\n</head>')
# icone 3D (Fluent Emoji, MIT): un'immagine WebP per nome, incorporata nel CSS
import re,base64,glob
imgs={}  # icone 3D (Fluent) non più usate: ora icone a linea Lucide (vedi icons.js)
used=set(re.findall(r'm\("(\w+)"',r('icons.js')))
mono={'check','arrow','back','up','refresh','close','dl'}

icons_js=r('icons.js').replace('__IMG__',json.dumps(imgs,separators=(',',':')))
theme=''.join(css_for(c) for c in have if c!='paris')
mark='html.pick #splash{display:none!important}'
assert head.count(mark)==1
head=head.replace(mark,theme+mark)
assert '<!--SPLASH-->' in body
body=body.replace('<!--SPLASH-->',r('splash.html'),1)
import importlib.util as _iu,json as _js
_sp=_iu.spec_from_file_location("i18n_en","/home/claude/viatico/src/i18n_en.py");_m=_iu.module_from_spec(_sp);_sp.loader.exec_module(_m)
_F=[[a,re.sub(r'\\(\d)',r'$\1',b)] for a,b in _m.F]
I18N='window.__I18N='+_js.dumps({'D':_m.D,'F':_F,'MON':_m.MON,'DAY':_m.DAY,'DAB':_m.DAB},ensure_ascii=False).replace('</','<\\/')+';'
html=head+body+'<script>\n'+r('guard.js')+'\n</script>\n<script>\n'+I18N+'\n'+r('i18n.js')+'\n</script>\n<script>\n'+icons_js+'\n</script>\n<script>\n'+cities+boot+'\n</script>\n<script>\n'+r('app1.js')+'\n</script>\n<script>\n'+SHARED+'\n</script>\n<script>\n'+r('app2.js')+'\n</script>\n<script>\n'+r('skyfx.js')+'\n</script>\n<script>\n'+r('mapbg.js')+'\n</script>\n<script>\n'+r('anim.js')+'\n</script>\n<script>\n'+r('tabnav.js')+'\n</script>\n<script>\n'+r('season.js')+'\n</script>\n<script>\n'+r('pdf.js')+'\n</script>\n<script>\n'+SYNC+'\n</script>\n<script>\n'+r('offline.js')+'\n</script>\n<script>\n'+r('help.js')+'\n</script>\n<script>\n'+r('tutorial.js')+'\n</script>\n<script>\n'+r('coach.js')+'\n</script>\n<script>\n'+r('nui.js')+'\n</script>\n<script>\n'+r('notify.js')+'\n</script>\n<script>\nwindow.__viaOK=1;try{window.__zinReady&&window.__zinReady()}catch(e){}\n</script>\n</body>\n</html>\n'
# Content-Security-Policy: hash di ogni script inline, niente 'unsafe-inline' per gli script
import hashlib
def b64h(t): return base64.b64encode(hashlib.sha256(t.encode('utf-8')).digest()).decode()
assert not re.search(r'<script\b[^>]*\bsrc=',html), 'script esterno nel markup'
assert not re.search(r'<script\b[^>]+>',html), 'script con attributi: non coperto dalla CSP'
shs=sorted(set(b64h(m) for m in re.findall(r'<script>(.*?)</script>',html,re.S)))
sbu=SBC.get('url','')
sbh=re.sub(r'^https?://','',sbu)
CONN=["'self'","https://api.open-meteo.com","https://nominatim.openstreetmap.org","https://overpass-api.de","https://routing.openstreetmap.de","https://opendata.paris.fr","https://tile.openstreetmap.org","https://*.tile.openstreetmap.org"]+([sbu,'wss://'+sbh] if sbu else [])
CSP="; ".join([
 "default-src 'self'",
 "script-src 'self' "+" ".join("'sha256-%s'"%h for h in shs)+"",
 "style-src 'self' 'unsafe-inline'",
 "font-src 'self' data:",
 "img-src 'self' data: blob: https://tile.openstreetmap.org https://*.tile.openstreetmap.org",
 "connect-src "+" ".join(CONN),

 "worker-src 'self'","manifest-src 'self'","object-src 'none'","base-uri 'self'","form-action 'self'"])
# prestazioni: i selettori :has() su html/body costringono il browser a ricalcolare lo stile di tutta la pagina a ogni cambio; li sostituisco con classi mantenute da uno script
def _nohas(css):
    css=css.replace('body:not(:has(#t-itinerario:checked))','body:not(.k-t-itinerario)')
    css=css.replace('body:has(#dest.on,#setup.on)','body:is(.k-dest,.k-setup)')
    css=css.replace(':has(#hero.pre)','.k-heropre')
    css=re.sub(r':has\(#(t-[a-z]+):checked\)',r'.k-\1',css)
    css=css.replace(':has(#dm:checked)','.k-dm')
    css=css.replace(':has(#sheet.on)','.k-sheet').replace(':has(#dest.on)','.k-dest')
    return css
_parts=re.split(r'(<style[^>]*>.*?</style>)',html,flags=re.S)
html=''.join(_nohas(x) if x.startswith('<style') else x for x in _parts)
mk='<meta name="color-scheme" content="light dark">'
assert html.count(mk)==1
html=html.replace(mk,'<meta http-equiv="Content-Security-Policy" content="'+CSP+'">\n'+mk,1)
open('/home/claude/viatico/index.html','w').write(html)
print(len(html),have)
