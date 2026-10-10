from themes_base import *
GLASS_L="--glass:rgba(255,255,255,.55);--glassb:rgba(255,255,255,.8);--gl:rgba(255,255,255,.3);--gl2:rgba(255,255,255,.4);--edge:rgba(255,255,255,.62);--hi:rgba(255,255,255,.95);--hi2:rgba(255,255,255,.42);--gltb:rgba(255,255,255,.18)"
GLASS_D="--glass:rgba(255,255,255,.06);--glassb:rgba(255,255,255,.12);--gl2:rgba(255,255,255,.06);--edge:rgba(255,255,255,.14);--hi:rgba(255,255,255,.34);--hi2:rgba(255,255,255,.09);--glsh:rgba(0,0,0,.45)"

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
'vienna':dict(pri='#a7102a',sec='#7a5a1e',gold='#d9b25f',cream='#fbf3e2',flag=['#c8102e','#ffffff','#d9b25f'])}
for _k,_v in CITY_PAL.items():T[_k]=mk(**_v)

def css_for(cid):
    t=T[cid];L=t['L'];D=t['D'];S=':root[data-city="%s"]'%cid
    def base(V,dark):
        sh=V.get('shadow') or V.get('shade')
        out=';'.join('--%s:%s'%(k,V[k]) for k in ['c1','c2','c3','c4','c5','gold','sand','cream','pin','blue','food','bg','land','ink','mute','line','paper'])
        out+=';--surf:%s;--surf2:%s'%(V.get('surf',V['paper']),V['surf2'])
        if dark: out+=';'+GLASS_D+';--gl:rgba(%s,.4);--gltb:rgba(%s,.32)'%(sh,sh)
        else: out+=';'+GLASS_L+';--glsh:rgba(%s,.15)'%sh
        g=t['Dgrad'] if dark else t['grad'];gx=t['Dgradx'] if dark else t['gradx'];gf=t['Dgradf'] if dark else t['gradf']
        on='#ffffff' if contrast('#ffffff',g[1])>=contrast(V['ink'] if not dark else '#0a1a33',g[1]) else '#0a1a33'
        out+=';--grad:%s;--gradb:%s;--gradx:%s;--gradf:%s;--on:%s'%(grad(g),grad(t['gradb']),grad(gx,95),'linear-gradient(90deg,%s)'%','.join(gf),on)
        if not dark: out+=';--ons:0 1px 2px rgba(%s,.45);--bink:%s'%(sh,t['tc'])
        out+=';--tc:%s'%(t['dtc'] if dark else t['tc'])
        return out
    lb=','.join('radial-gradient(%s,color-mix(in srgb,%s %d%%,transparent),transparent 70%%)'%(pos,c,p) for pos,(c,p) in zip(['58% 44% at 4% 2%','46% 38% at 96% 10%','44% 36% at 6% 56%','58% 46% at 98% 98%'],t['lights']))
    db=','.join('radial-gradient(%s,color-mix(in srgb,%s %d%%,transparent),transparent 70%%)'%(pos,c,p) for pos,(c,p) in zip(['58% 44% at 4% 2%','46% 38% at 96% 10%','44% 36% at 6% 56%','58% 46% at 98% 98%'],t['dlights']))
    tabs=['itinerario','voli','mappa','mangiare','costi','consigli'];tb=t['tabs']
    css=S+'{'+base(L,0)+'}\n'
    css+='@media (prefers-color-scheme:dark){'+S+':not([data-theme="light"]){'+base(D,1)+'}}\n'
    css+=S+'[data-theme="dark"],'+S+':has(#dm:checked){'+base(D,1)+'}\n'
    css+=S+' body::before{background:'+lb+'!important;background-size:100% 100%!important}\n'
    for i,k in enumerate(tabs):
        m=mix(tb[i],tb[i+1],.5);white=contrast('#ffffff',m)>=contrast(L['ink'],m)
        css+=S+' body:has(#t-%s:checked) label[for=t-%s]{color:%s!important;text-shadow:%s!important}'%(k,k,'#fff' if white else L['ink'],'0 1px 2px rgba(0,0,0,.45)' if white else '0 1px 1px rgba(255,255,255,.35)')
        css+=S+' body:has(#t-%s:checked) .tbind{--g1:%s;--g2:%s}'%(k,tb[i],tb[i+1])
    css+='\n'+S+' .sk-spark circle{fill:%s}\n'%t['spark']
    css+=''.join(S+' .sp-flag i:nth-child(%d){background:%s}'%(i+1,c) for i,c in enumerate(t['flag']))+'\n'
    css+=S+'[data-theme="dark"] body::before,'+S+':has(#dm:checked) body::before{background:'+db+'!important;opacity:1!important}\n'
    css+='@media (prefers-color-scheme:dark){'+S+':not([data-theme="light"]) body::before{background:'+db+'!important}}\n'
    return css

if __name__=='__main__':
    for k in T:print(css_for(k)[:300])
