"""Controlli automatici di Viaticum su tutte le città.

Uso:  python3 tests/check.py            (tutte le città)
      python3 tests/check.py bcn,roma   (solo alcune)

Per ogni città apre l'app con un orologio finto e un viaggio di prova e controlla:
  - nessun errore JavaScript in: giorno del viaggio, dopo il viaggio, schede Mappa/Pasti/Costi/Consigli
  - la card della tappa, lo skyline con le finestre e la cartolina di fine viaggio ci sono
  - la pagina principale e l'elenco "I miei viaggi" si aprono senza errori
Richiede Python 3 con Playwright e Chromium (pip install playwright; playwright install chromium).
Esce con codice 1 se qualcosa non va, così si può usare prima di ogni pubblicazione.
"""
import sys, os, json, threading, datetime, functools, http.server, socketserver
from concurrent.futures import ThreadPoolExecutor
from zoneinfo import ZoneInfo
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'

def serve():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Q, directory=ROOT)
    s = socketserver.ThreadingTCPServer(('127.0.0.1', 0), h)
    s.daemon_threads = True
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s, 'http://127.0.0.1:%d/index.html' % s.server_address[1]

def utc(t, tz):
    return datetime.datetime.fromisoformat(t).replace(tzinfo=ZoneInfo(tz)).astimezone(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

def open_trip(b, url, city, t, multi=False, theme='light'):
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, user_agent=UA, timezone_id='Europe/Rome', color_scheme=theme)
    ctx.route('**/*', lambda r: r.continue_() if r.request.url.startswith(url.rsplit('/', 1)[0]) else r.abort())
    ctx.add_init_script("sessionStorage.setItem('via-pick','%s');localStorage.setItem('via-splash','1');localStorage.setItem('via-tour','1')" % city)
    pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
    pg.clock.install(time=utc(t, 'Europe/Rome'))
    pg.goto(url); pg.wait_for_timeout(500)
    to = pg.evaluate("Object.keys(PD.RET||PD.PAR)[0]")
    d = dict(dest=city, date='2026-10-28', date_r='2026-10-30' if multi else '2026-10-28', ppl=2, to=to, a_num='FR1234', a_dep='06:05', a_arr='07:45',
             r_num='FR1235', r_imb='17:45' if multi else '19:30', r_dep='19:10' if multi else '20:55', **{'from': 'Bologna', 'fromCode': 'BLQ'})
    if multi: d['stay'] = dict(zone='altro', addr='', cin='15:00', cout='11:00', price=240, type='h3')
    pg.evaluate("localStorage.setItem('via-trip',%s)" % json.dumps(json.dumps(d)))
    pg.reload(); pg.wait_for_timeout(800); pg.clock.run_for(32000); pg.wait_for_timeout(500)
    for nm in ('Iniziamo', 'No, grazie'):
        bt = pg.get_by_role('button', name=nm)
        if bt.count() and bt.first.is_visible(): bt.first.click(); pg.clock.run_for(2000)
    return ctx, pg, errs

def check_city(url, city):
    bad = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx, pg, errs = open_trip(b, url, city, '2026-10-28T10:20:00')
        if not pg.evaluate("!!document.querySelector('#hero .wdet .wc')"): bad.append('manca la card della tappa')
        if pg.evaluate("document.querySelectorAll('#hero svg.sky .wn').length") < 40: bad.append('skyline senza finestre')
        if errs: bad.append('giorno del viaggio: ' + errs[0])
        ctx.close()
        ctx, pg, errs = open_trip(b, url, city, '2026-10-31T21:00:00', multi=True)
        if not pg.evaluate("!!document.querySelector('#pcd .pcf svg')"): bad.append('manca la cartolina')
        for tab in ('t-mappa', 't-mangiare', 't-costi', 't-consigli', 't-itinerario'):
            pg.evaluate("t=>{var r=document.getElementById(t);r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))}", tab)
            pg.clock.run_for(1500)
        pg.evaluate("PAR.openDest()"); pg.clock.run_for(1500)
        pg.evaluate("var m=document.getElementById('dmy');m&&!m.hidden&&m.click()"); pg.clock.run_for(1500)
        if errs: bad.append('dopo il viaggio / schede / pagina principale: ' + errs[0])
        ctx.close(); b.close()
    return city, bad

def main():
    s, url = serve()
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(); pg.goto(url); pg.wait_for_timeout(800)
        cities = pg.evaluate("CITY_ORDER"); b.close()
    if len(sys.argv) > 1: cities = [c for c in sys.argv[1].split(',') if c in cities]
    fails = 0
    with ThreadPoolExecutor(4) as ex:
        for city, bad in ex.map(lambda c: check_city(url, c), cities):
            print(('OK   ' if not bad else 'ERR  ') + city + ('' if not bad else ': ' + ' | '.join(bad)), flush=True)
            fails += bool(bad)
    print('\n%d città controllate, %d con problemi' % (len(cities), fails))
    s.shutdown()
    sys.exit(1 if fails else 0)

if __name__ == '__main__':
    main()
