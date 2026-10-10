"""Temi colore delle città: stessi gruppi di variabili del tema di Parigi."""

def lum(h):
    h=h.lstrip('#');r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c:c/12.92 if c<=.03928 else ((c+.055)/1.055)**2.4
    return .2126*f(r)+.7152*f(g)+.0722*f(b)
def mix(a,b,t):
    a=a.lstrip('#');b=b.lstrip('#')
    return '#'+''.join('%02x'%round(int(a[i:i+2],16)*(1-t)+int(b[i:i+2],16)*t) for i in (0,2,4))
def contrast(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True);return (la+.05)/(lb+.05)

