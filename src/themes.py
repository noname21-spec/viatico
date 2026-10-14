from themes_base import *
GLASS_L="--glass:var(--surf);--glassb:var(--surf);--gl:var(--surf);--gl2:var(--surf);--edge:var(--line);--hi:color-mix(in srgb,var(--ink) 5%,transparent);--hi2:transparent;--gltb:var(--surf)"
GLASS_D="--glass:var(--surf);--glassb:var(--surf);--gl:var(--surf);--gl2:var(--surf);--edge:var(--line);--hi:color-mix(in srgb,var(--ink) 5%,transparent);--hi2:transparent;--gltb:var(--surf);--glsh:rgba(0,0,0,.45)"

def grad(stops,ang=135):
    n=len(stops);return 'linear-gradient(%ddeg,%s)'%(ang,','.join('%s %d%%'%(c,round(i*100/(n-1))) for i,c in enumerate(stops)))

T={}
from palettes import mk
# Barcellona: blu del Mediterraneo, granata e oro (i colori della città e della senyera), sabbia
T['bcn']=dict(
 L=dict(c1='#0f4c9a',c2='#a8323e',c3='#073a7a',c4='#1f6fb8',c5='#5b9bd5',gold='#e8b21c',sand='#efd9a7',cream='#fbf1d8',pin='#073a7a',blue='#0f4c9a',food='#a8323e',
        bg='#fbf6ea',land='#f1e8d2',ink='#0a2747',mute='#566579',line='#e6dabd',paper='#fffdf6',surf2='#f6edd8',shadow='7,58,122'),
 D=dict(c1='#bcd5f2',c2='#f0a3a9',c3='#9cc3f0',c4='#3f86cf',c5='#7fb1e3',gold='#f0c43c',sand='#efd9a7',cream='#fbf1d8',pin='#1f6fb8',blue='#bcd5f2',food='#f0a3a9',
        bg='#04122a',land='#0a1d3d',ink='#f7efdc',mute='#a6b2c4',line='#19305a',paper='#0a1d3d',surf='#0b2044',surf2='#112a54',shade='4,18,42'),
 grad=['#073a7a','#0f4c9a','#1f6fb8','#e8b21c','#fbf1d8'],gradb=['#073a7a','#0f4c9a','#1f6fb8','#c9971a'],gradx=['#073a7a','#0f4c9a','#1f6fb8','#a8323e'],gradf=['#073a7a','#1f6fb8','#e8b21c','#fbf1d8','#a8323e','#073a7a'],
 Dgrad=['#0f4c9a','#1f6fb8','#3f86cf','#e8b21c','#fbf1d8'],Dgradx=['#9cc3f0','#bcd5f2','#f0c43c','#fbf1d8'],Dgradf=['#1f6fb8','#9cc3f0','#f0c43c','#fbf1d8','#f0a3a9','#1f6fb8'],
 tabs=['#073a7a','#0f4c9a','#1f6fb8','#5b9bd5','#e8b21c','#efc65a','#fbf1d8'],
 lights=[('#073a7a',30),('#a8323e',18),('#e8b21c',38),('#efd9a7',80)],dlights=[('#0f4c9a',70),('#a8323e',26),('#e8b21c',12),('#efd9a7',9)],
 spark='#ffe08a',flag=['#e8b21c','#a8323e','#073a7a'],tc='#073a7a',dtc='#04122a')

CITY_PAL={
'roma':dict(pri='#9b2226',sec='#a4561a',gold='#e0a526',cream='#fbf2dc',flag=['#8e1b1b','#c7962c','#f2c14e']),
'londra':dict(pri='#14306f',sec='#c8102e',gold='#e0b22e',cream='#f6f3ec',flag=['#c8102e','#ffffff','#14306f']),
'amsterdam':dict(pri='#bf2a1f',sec='#2c4a6e',gold='#f39200',cream='#fbf4e8',flag=['#d52b1e','#ffffff','#2c4a6e']),
'lisbona':dict(pri='#1c4f8f',sec='#a87900',gold='#f5c400',cream='#fbf6e6',flag=['#1c4f8f','#ffd200','#f2f2f2']),
'berlino':dict(pri='#b3122a',sec='#3b3f4a',gold='#f0b323',cream='#f5f3ef',flag=['#e4002b','#ffffff','#111111']),
'praga':dict(pri='#11457e',sec='#b30d27',gold='#d4a017',cream='#faf3e3',flag=['#ffffff','#c8102e','#11457e']),
'vienna':dict(pri='#a7102a',sec='#7a5a1e',gold='#d9b25f',cream='#fbf3e2',flag=['#c8102e','#ffffff','#d9b25f']),
'bruxelles':dict(pri='#c8102e',sec='#2b2b2b',gold='#f1bf00',cream='#fbf4e0',flag=['#2b2b2b','#f1bf00','#c8102e']),
'cracovia':dict(pri='#b0122b',sec='#8c6a3a',gold='#d9b25f',cream='#faf2e4',flag=['#ffffff','#dc143c','#8c6a3a']),
'budapest':dict(pri='#b3262e',sec='#3f7a4a',gold='#d9b25f',cream='#fbf3e2',flag=['#ce2939','#ffffff','#477050']),
'porto':dict(pri='#1c4f8f',sec='#7a2e2e',gold='#c9a24a',cream='#f8f3e8',flag=['#1c4f8f','#ffffff','#7a2e2e']),
'monaco':dict(pri='#1f6fb4',sec='#3b3f4a',gold='#d9a520',cream='#f6f4ee',flag=['#1f6fb4','#ffffff','#d9a520']),
'madrid':dict(pri='#a8182b',sec='#2f3e5c',gold='#d9a520',cream='#faf2e4',flag=['#c60b1e', '#f1bf00', '#a8182b']),
'milano':dict(pri='#8a1c2b',sec='#2f3a4a',gold='#c9a24a',cream='#f7f3ea',flag=['#ffffff', '#c8102e', '#8a1c2b']),
'firenze':dict(pri='#a3262a',sec='#5a6b3a',gold='#c9a24a',cream='#faf1e2',flag=['#ffffff', '#c8102e', '#5a6b3a']),
'venezia':dict(pri='#1f5f8b',sec='#9b2c2c',gold='#c9a24a',cream='#f7f2e6',flag=['#1f5f8b', '#c9a24a', '#9b2c2c']),
'napoli':dict(pri='#1d6fb8',sec='#b3322a',gold='#e0a526',cream='#fbf3e3',flag=['#1d6fb8', '#ffffff', '#e0a526']),
'siviglia':dict(pri='#c8501e',sec='#2d6a4f',gold='#e0a526',cream='#fbf1e1',flag=['#c8501e', '#e0a526', '#2d6a4f']),
'valencia':dict(pri='#d9731a',sec='#1f5f8b',gold='#e8b21c',cream='#fbf3e3',flag=['#d9731a', '#e8b21c', '#1f5f8b']),
'varsavia':dict(pri='#b3122a',sec='#2b3a55',gold='#d9b25f',cream='#faf3e6',flag=['#ffffff', '#dc143c', '#2b3a55']),
'amburgo':dict(pri='#b3122a',sec='#1f3a5f',gold='#c9a24a',cream='#f6f3ee',flag=['#ffffff', '#b3122a', '#1f3a5f']),
'zurigo':dict(pri='#c4281c',sec='#1f3a6b',gold='#c9a24a',cream='#f5f4f0',flag=['#c4281c', '#ffffff', '#1f3a6b']),
'copenaghen':dict(pri='#c8102e',sec='#3f5f7a',gold='#d9b25f',cream='#faf3e8',flag=['#c8102e', '#ffffff', '#3f5f7a']),
'stoccolma':dict(pri='#1f5f9f',sec='#2b4a6b',gold='#e0b22e',cream='#f6f4ec',flag=['#1f6fb4', '#f1c40f', '#2b4a6b']),
'oslo':dict(pri='#b3122a',sec='#1f3a6b',gold='#c9a24a',cream='#f6f3ee',flag=['#c8102e', '#ffffff', '#1f3a6b']),
'helsinki':dict(pri='#1f5fa8',sec='#3b5f7a',gold='#c9a24a',cream='#f5f4f0',flag=['#ffffff', '#1f5fa8', '#5a8fc4']),
'reykjavik':dict(pri='#1f3a6b',sec='#b3122a',gold='#8fb8d6',cream='#f3f4f4',flag=['#1f3a6b', '#ffffff', '#c8102e']),
'dublino':dict(pri='#13804f',sec='#c8651e',gold='#d9a520',cream='#f6f4ea',flag=['#169b62', '#ffffff', '#ff883e']),
'edimburgo':dict(pri='#1f3a6b',sec='#6b4a8c',gold='#c9a24a',cream='#f6f2ea',flag=['#1f3a6b', '#ffffff', '#6b4a8c']),
'atene':dict(pri='#0d5eaf',sec='#7a5a1e',gold='#c9a24a',cream='#faf4e6',flag=['#0d5eaf', '#ffffff', '#c9a24a']),
'istanbul':dict(pri='#b3122a',sec='#1f6f8b',gold='#d9b25f',cream='#faf2e2',flag=['#c8102e', '#ffffff', '#1f6f8b']),
'vilnius':dict(pri='#a8202a',sec='#006a44',gold='#e0a526',cream='#faf3e4',flag=['#fdb913', '#006a44', '#c1272d']),
'lubiana':dict(pri='#0a6ebd',sec='#2e7d4f',gold='#d9a520',cream='#f6f4ec',flag=['#0a6ebd', '#ffffff', '#c8102e']),
'zagabria':dict(pri='#c8102e',sec='#1f3a6b',gold='#d9a520',cream='#f8f3ea',flag=['#c8102e', '#ffffff', '#1f3a6b']),
'bucarest':dict(pri='#1f3a8a',sec='#b3122a',gold='#e0b000',cream='#f7f3e6',flag=['#1f3a8a', '#fcd116', '#ce1126']),
'sofia':dict(pri='#00805a',sec='#b3201a',gold='#d9a520',cream='#f6f4ea',flag=['#ffffff', '#00966e', '#d62612']),
'riga':dict(pri='#9e1b32',sec='#6b4a2e',gold='#c9a24a',cream='#f8f1e6',flag=['#9e1b32', '#ffffff', '#9e1b32']),
'tallinn':dict(pri='#0b5fa8',sec='#2b2b2b',gold='#c9a24a',cream='#f4f4f1',flag=['#0072ce', '#2b2b2b', '#ffffff']),
'valletta':dict(pri='#c4122a',sec='#7a5a1e',gold='#c9a24a',cream='#faf2e2',flag=['#ffffff', '#cf142b', '#c9a24a']),
'salisburgo':dict(pri='#b3122a',sec='#7a5a1e',gold='#c9a24a',cream='#f9f2e4',flag=['#c8102e', '#ffffff', '#c8102e']),
'ginevra':dict(pri='#c4281c',sec='#1f3a6b',gold='#c9a24a',cream='#f5f4f0',flag=['#d52b1e', '#ffffff', '#1f3a6b']),
'malaga':dict(pri='#c8501e',sec='#1f6f8b',gold='#e8b21c',cream='#fbf2e0',flag=['#c8102e', '#f1bf00', '#1f6f8b'])}
for _k,_v in CITY_PAL.items():T[_k]=mk(**_v)

def css_for(cid):
    t=T[cid];L=t['L'];D=t['D'];S=':root[data-city="%s"]'%cid
    def calm(V,dark):
        V=dict(V);c1=V['c1'];bg=V['bg'];ink=V['ink']
        V['c2']=c1 if dark else mix(c1,ink,.18)
        V['c4']=mix(c1,bg,.30 if not dark else .45)
        V['c5']=mix(c1,bg,.55 if not dark else .62)
        V['gold']=mix(c1,bg,.62 if not dark else .55)
        V['sand']=mix(c1,bg,.84 if not dark else .8)
        V['food']=V['c2']
        return V
    def base(V,dark):
        V=calm(V,dark)
        sh=V.get('shadow') or V.get('shade')
        out=';'.join('--%s:%s'%(k,V[k]) for k in ['c1','c2','c3','c4','c5','gold','sand','cream','pin','blue','food','bg','land','ink','mute','line','paper'])
        out+=';--surf:%s;--surf2:%s'%(V.get('surf',V['paper']),V['surf2'])
        if dark: out+=';'+GLASS_D
        else: out+=';'+GLASS_L+';--glsh:rgba(%s,.15)'%sh
        c3=V['c3'];c1=V['c1']
        g=[c3,c1,c1] if not dark else [V['c4'],c1,c1];gx=[c3,c1] if not dark else [V['c4'],c1];gf=[c3,c1,c3]
        tb_=dict(t,gradb=[c3,c1] if not dark else [V['c4'],c1])
        on='#ffffff' if contrast('#ffffff',g[1])>=contrast(V['ink'] if not dark else '#0a1a33',g[1]) else '#0a1a33'
        out+=';--grad:%s;--gradb:%s;--gradx:%s;--gradf:%s;--on:%s'%(grad(g),grad(tb_['gradb']),grad(gx,95),'linear-gradient(90deg,%s)'%','.join(gf),on)
        if not dark: out+=';--ons:0 1px 2px rgba(%s,.45);--bink:%s'%(sh,t['tc'])
        out+=';--tc:%s'%(t['dtc'] if dark else t['tc'])
        return out
    c1l=t['L']['c1'];c1d=t['D']['c1']
    lb='radial-gradient(60%% 42%% at 8%% 0%%,color-mix(in srgb,%s 20%%,transparent),transparent 72%%),radial-gradient(52%% 38%% at 100%% 100%%,color-mix(in srgb,%s 12%%,transparent),transparent 72%%)'%(c1l,c1l)
    db='radial-gradient(60%% 42%% at 8%% 0%%,color-mix(in srgb,%s 26%%,transparent),transparent 72%%),radial-gradient(52%% 38%% at 100%% 100%%,color-mix(in srgb,%s 12%%,transparent),transparent 72%%)'%(t['D']['c1'],t['D']['c1'])
    tabs=['itinerario','voli','mappa','mangiare','costi','consigli'];tb=[t['L']['c3']]*7
    css=S+'{'+base(L,0)+'}\n'
    css+='@media (prefers-color-scheme:dark){'+S+':not([data-theme="light"]){'+base(D,1)+'}}\n'
    css+=S+'[data-theme="dark"],'+S+':has(#dm:checked){'+base(D,1)+'}\n'
    css+=S+' body::before{background:'+lb+'!important;background-size:100% 100%!important}\n'
    for i,k in enumerate(tabs):
        m=mix(tb[i],tb[i+1],.5);white=contrast('#ffffff',m)>=contrast(L['ink'],m)
        css+=S+' body:has(#t-%s:checked) .tbind{--g1:%s;--g2:%s}'%(k,tb[i],tb[i+1])
    css+='\n'+S+' .sk-spark circle{fill:%s}\n'%t['spark']
    css+=''.join(S+' .sp-flag i:nth-child(%d){background:%s}'%(i+1,c) for i,c in enumerate(t['flag']))+'\n'
    css+=S+'[data-theme="dark"] body::before,'+S+':has(#dm:checked) body::before{background:'+db+'!important;opacity:1!important}\n'
    css+='@media (prefers-color-scheme:dark){'+S+':not([data-theme="light"]) body::before{background:'+db+'!important}}\n'
    return css

if __name__=='__main__':
    for k in T:print(css_for(k)[:300])
