"""Generatore di palette per le città: da pochi colori ricava tema chiaro e scuro con contrasto verificato."""
from themes_base import lum, mix, contrast

def _fix(c, bg, ratio, toward):
    # avvicina c a 'toward' finché il contrasto con bg raggiunge 'ratio'
    for i in range(0, 41):
        r = mix(c, toward, i * 0.025)
        if contrast(r, bg) >= ratio:
            return r
    return toward

def mk(pri, sec, gold, cream, flag=None):
    # ---- chiaro ----
    bg = mix(cream, pri, .035)
    c1 = _fix(pri, bg, 7.5, '#000000')
    c3 = mix(c1, '#000000', .38)
    c4 = mix(pri, '#ffffff', .12)
    c5 = mix(pri, '#ffffff', .45)
    c2 = _fix(sec, bg, 4.8, '#000000')
    ink = mix('#0a0a0a', pri, .22)
    mute = _fix(mix(ink, bg, .5), bg, 5.6, '#000000')
    sand = mix(cream, gold, .35)
    L = dict(c1=c1, c2=c2, c3=c3, c4=c4, c5=c5, gold=gold, sand=sand, cream=cream, pin=c3, blue=c1, food=c2,
             bg=bg, land=mix(bg, pri, .07), ink=ink, mute=mute, line=mix(bg, pri, .14),
             paper=mix('#ffffff', bg, .45), surf2=mix(bg, pri, .045),
             shadow='%d,%d,%d' % tuple(int(c3[i:i + 2], 16) for i in (1, 3, 5)))
    # ---- scuro ----
    dbg = mix('#000000', pri, .13)
    dc1 = _fix(mix(pri, '#ffffff', .55), dbg, 8, '#ffffff')
    dc3 = _fix(mix(pri, '#ffffff', .4), dbg, 7, '#ffffff')
    dc4 = mix(pri, '#ffffff', .22)
    dc5 = mix(pri, '#ffffff', .4)
    dc2 = _fix(mix(sec, '#ffffff', .45), dbg, 7, '#ffffff')
    dgold = _fix(gold, dbg, 7, '#ffffff')
    dink = mix(cream, '#ffffff', .35)
    dmute = _fix(mix(dink, dbg, .38), dbg, 5.8, '#ffffff')
    D = dict(c1=dc1, c2=dc2, c3=dc3, c4=dc4, c5=dc5, gold=dgold, sand=sand, cream=cream, pin=dc4, blue=dc1, food=dc2,
             bg=dbg, land=mix(dbg, pri, .12), ink=dink, mute=dmute, line=mix(dbg, pri, .3),
             paper=mix(dbg, pri, .12), surf=mix(dbg, pri, .16), surf2=mix(dbg, pri, .24),
             shade='%d,%d,%d' % tuple(int(mix(dbg, '#000000', .4)[i:i + 2], 16) for i in (1, 3, 5)))
    tabs = [c3, c1, c4, c5, gold, mix(gold, cream, .5), cream]
    t = dict(L=L, D=D,
        grad=[c3, c1, c4, gold, cream], gradb=[c3, c1, c4, mix(gold, '#000000', .18)], gradx=[c3, c1, c4, c2],
        gradf=[c3, c4, gold, cream, c2, c3],
        Dgrad=[pri, dc4, dc3, gold, cream], Dgradx=[dc3, dc1, dgold, cream], Dgradf=[dc4, dc3, dgold, cream, dc2, dc4],
        tabs=tabs,
        lights=[(c3, 30), (c2, 18), (gold, 38), (sand, 80)], dlights=[(pri, 70), (c2, 26), (gold, 12), (sand, 9)],
        spark=mix(gold, '#ffffff', .35), flag=flag or [gold, c2, c3], tc=c3, dtc=dbg)
    return t
