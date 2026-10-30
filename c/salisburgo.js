(function(o){
/* ===== Salisburgo (dati verificati il 14 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.salisburgo=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
SZG:{n:"Salisburgo (SZG)",s:"Salzburg Airport W. A. Mozart",url:"https://www.salzburg-airport.com/en/",live:"Salisburgo",inMin:45,buf:120,pos:[47.7933,13.0043],sd:"Aeroporto SZG · autobus 2",rt:"Dall'aeroporto: autobus urbano linea 2 fino alla stazione centrale (Hauptbahnhof), circa 20 minuti; poi a piedi o in autobus fino alla città vecchia.",
 arr:"Dall'Italia si entra in Austria senza controllo passaporti (spazio Schengen). L'aeroporto è piccolo e in città: dall'uscita si trova la fermata degli autobus urbani proprio davanti al terminal. L'autobus linea 2 porta alla stazione centrale (Hauptbahnhof) in circa 20 minuti, con diverse corse all'ora (frequenza da una scheda non recente: da confermare sul sito della Salzburg AG). Dalla stazione la città vecchia è a circa 20 minuti a piedi, oppure con un autobus urbano per Rathaus o Mozartsteg. Il taxi per il centro è una corsa breve, di solito intorno ai 20–25 € (stima, da confermare).",
 tk:"Biglietto: per l'autobus urbano vale il biglietto da 1 ora della Salisburgo Verkehr (2,60 € intero, tariffa dal 1° gennaio 2026, sito salzburg-verkehr.at), valido 60 minuti nella zona centrale. Non si compra a bordo: serve la macchinetta alla fermata, l'app o il sito. Che l'aeroporto rientri nella zona centrale e il prezzo di un eventuale biglietto giornaliero non li ho potuti verificare: da confermare prima di partire.",
 gm:"Salzburg Airport, Innsbrucker Bundesstraße 95",
 tips:["Dall'Italia i voli diretti per Salisburgo sono pochi e dipendono dalla stagione: ho visto Roma Fiumicino con Sky Alps (più giorni a settimana, tra novembre e gennaio) e Olbia con Eurowings (un volo il 7 novembre). Da altri aeroporti italiani non ho trovato voli diretti: controlla sul sito della compagnia.","Alternativa per chi non trova il volo diretto: volare a Monaco di Baviera (MUC) e prendere il treno per Salisburgo (circa 1 ora e mezza dalla stazione di Monaco; fino al 12 dicembre 2026 i lavori tra Passau e Obertraubling allungano di circa 15 minuti alcuni viaggi) oppure a Innsbruck (INN), da dove il treno richiede circa 2 ore (durate da confermare su oebb.at o bahn.de).","Salisburgo è molto piccola: tutto il centro si gira a piedi. Non serve un abbonamento ai mezzi, bastano pochi biglietti da 1 ora."]}
};
/* linee (tracciati indicativi) */
var SEG={
bus2:{c:"#c8102e",n:"Autobus 2 dall'aeroporto",p:[[47.7933,13.0043,"Aeroporto",2],[47.8130,13.0457,"Hauptbahnhof",2]]}
};
var START=[47.7988,13.0436];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
altstadt:{t:"Città vecchia: Getreidegasse e Alter Markt",z:"A",p:1,min:60,id:90,max:130,pos:[47.7999,13.0440],q:"Getreidegasse, Salzburg",cls:"walk",sun:1,
 d:"Il cuore della città, patrimonio dell'UNESCO: la Getreidegasse, stretta e piena di insegne di ferro battuto, la piazzetta dell'Alter Markt e la Residenzplatz con la fontana barocca. Si gira a piedi in un reticolo di cortili, passaggi e vicoli.",
 m:"Si cammina gratis, a qualsiasi ora. In Austria i negozi sono chiusi la domenica e nei giorni festivi: restano aperti caffè, ristoranti e musei. Nei periodi dei mercatini di Natale (dal 20 novembre) il centro è molto più affollato."},
festung:{t:"Fortezza di Hohensalzburg",z:"C",p:1,min:90,id:120,max:180,pos:[47.7946,13.0476],q:"Festung Hohensalzburg, Salzburg",cls:"",sun:1,tk:[12.8,"Fortezza: Panorama Ticket con funicolare (12,80 €)",1,1],
 win:function(){return[9*60+30,17*60]},
 d:"La grande fortezza medievale che domina la città dalla collina, una delle più grandi d'Europa rimaste intere. Dai bastioni si vedono i tetti della città vecchia, il fiume e le Alpi. Si sale con la funicolare in meno di un minuto, oppure a piedi in circa 15 minuti.",
 m:"Prezzi 2026 (sito ufficiale della fortezza, validi dal 1° febbraio): Panorama Ticket con funicolare 12,80 €, Festungscard «Basic» 15,50 €, «All Inclusive» 19,20 €; salendo a piedi i prezzi sono più bassi (10,10 €, 12,00 € e 14,50 €). Orari da ottobre a dicembre: 9:30–17:00. La funicolare (4 € solo andata, 6,30 € andata e ritorno) è chiusa per manutenzione dal 9 al 13 novembre 2026 e dall'11 gennaio al 14 marzo 2027: la fortezza si raggiunge comunque a piedi."},
dom:{t:"Duomo, Residenzplatz e DomQuartier",z:"A",p:2,min:60,id:90,max:150,pos:[47.7981,13.0467],q:"Salzburger Dom, Salzburg",cls:"",sun:1,
 win:function(){return[10*60,17*60]},
 d:"Il Duomo barocco di Salisburgo, con la cupola e le tre navate dove fu battezzato Mozart, sulla Residenzplatz. A fianco il DomQuartier è un percorso di musei che collega la Residenz degli arcivescovi, il Museo del Duomo e la terrazza sopra la navata.",
 m:"Il DomQuartier è aperto tutti i giorni tranne il martedì, dalle 10 alle 17 (ultimo ingresso un'ora prima; chiuso il 24 dicembre). La Residenzgalerie è chiusa fino all'autunno 2027 e dal 17 agosto 2026 la terrazza Dombogen si raggiunge solo attraverso il Museo del Duomo. Il biglietto non l'ho potuto leggere sul sito ufficiale: da confermare su domquartier.at. Gli orari del Duomo vanno controllati sul posto, perché la chiesa chiude durante le funzioni."},
geburtshaus:{t:"Casa natale di Mozart",z:"A",p:1,min:40,id:50,max:80,pos:[47.8004,13.0431],q:"Mozarts Geburtshaus, Salzburg",cls:"",sun:1,tk:[15,"Casa natale di Mozart (circa 15 €)",1,1],
 win:function(){return[9*60,17*60+30]},
 d:"La casa gialla in Getreidegasse 9 dove Mozart nacque nel 1756 e visse fino ai 17 anni. Dentro si vedono il suo violino da bambino, lettere e ricordi di famiglia in poche stanze molto frequentate.",
 m:"Aperta tutti i giorni dalle 9 alle 17:30 (da una guida del 2022, orari da confermare sul sito della Fondazione Mozarteum). Il prezzo del solo biglietto per la Casa natale non l'ho trovato nelle fonti ufficiali del 2026: circa 15 €, da confermare. Il biglietto cumulativo con la Mozart-Wohnhaus costa 23 € (sito di vendita biglietti, 2026). Non è alta stagione: di solito si entra senza prenotare."},
wohnhaus:{t:"Casa di Mozart (Mozart-Wohnhaus)",z:"B",p:3,min:40,id:50,max:80,pos:[47.8047,13.0450],q:"Mozart-Wohnhaus, Makartplatz 8, Salzburg",cls:"",sun:1,tk:[15,"Mozart-Wohnhaus (15 €)",1,1],
 win:function(){return[9*60,17*60+30]},
 d:"La grande casa sulla Makartplatz dove la famiglia Mozart si trasferì nel 1773. È la parte più ricca del percorso: strumenti originali, il pianoforte da viaggio e una mostra sulla vita musicale della famiglia.",
 m:"Aperta tutti i giorni dalle 9 alle 17:30, ultimo ingresso 30 minuti prima della chiusura; il 24 dicembre dalle 9 alle 13 e il 1° gennaio dalle 12 (sito di vendita biglietti, 2026). Biglietto intero 15 €, biglietto cumulativo con la Casa natale 23 €. Dà accesso anche alla sala dei concerti."},
mirabell:{t:"Castello e giardino di Mirabell",z:"B",p:2,min:40,id:60,max:90,pos:[47.8054,13.0427],q:"Schloss Mirabell, Salzburg",cls:"walk",sun:1,
 win:function(){return[8*60,18*60]},
 d:"Il giardino barocco davanti al castello, con aiuole, fontane, il Pegasus e la scalinata con i nani di pietra: il punto dove si girò parte di «Tutti insieme appassionatamente». Dal fondo del giardino la fortezza compare dietro le aiuole.",
 m:"Il giardino è gratuito e aperto ogni giorno dalle 6. Il castello è aperto di norma dalle 8 alle 18 e la sala di marmo (Marmorsaal) ha orari limitati nella settimana (lun, mer, gio 8–16; mar e ven 13–16): dati da una guida del 2022, da confermare."},
monchsberg:{t:"Mönchsberg: ascensore e belvedere",z:"C",p:3,min:45,id:70,max:120,pos:[47.7989,13.0390],q:"Mönchsbergaufzug, Salzburg",cls:"walk",sun:1,
 d:"La collina boscosa a ridosso della città vecchia, con sentieri panoramici e vista sui tetti, sulla fortezza e sulle montagne. Si sale con l'ascensore in pietra sul retro della Gstättengasse e si passeggia sul crinale fino alla fortezza.",
 m:"Il sentiero si percorre gratis. L'ascensore (Mönchsbergaufzug) ha un biglietto a pagamento, il cui prezzo e gli orari non li ho potuti verificare sul sito ufficiale: da confermare. Con il ghiaccio o la neve alcuni sentieri sono scivolosi."},
hellbrunn:{t:"Castello e giochi d'acqua di Hellbrunn",z:"F",p:3,min:90,id:120,max:180,pos:[47.7627,13.0616],q:"Schloss Hellbrunn, Salzburg",cls:"",sun:1,tk:[16.5,"Hellbrunn: castello e giochi d'acqua (16,50 €)",1,1],
 win:function(){return[9*60+30,17*60+30]},
 d:"La villa di piacere dell'arcivescovo, nel parco a sud della città: i giochi d'acqua nascosti nei giardini sono la cosa più divertente, perché spruzzano all'improvviso gli ospiti. Si visitano con una guida in gruppo.",
 m:"Aperto ogni giorno dal 28 marzo al 1° novembre 2026 (sito ufficiale), da ottobre dalle 9:30 alle 17:30 con ultimo ingresso alle 16:30; biglietto per castello e giochi d'acqua 16,50 € (sito ufficiale). Dopo il 1° novembre la visita al castello e ai giochi d'acqua non è prevista fino alla primavera 2027 (date da confermare); i giardini restano accessibili dalle 6:30 alle 21, e dal 20 novembre al 24 dicembre c'è il mercatino di Natale. Si raggiunge in autobus dal centro o a piedi in circa 45 minuti."},
museum:{t:"Salzburg Museum",z:"A",p:4,min:60,id:75,max:100,pos:[47.7985,13.0437],q:"Salzburg Museum, Mozartplatz 1, Salzburg",cls:"",sun:1,tk:[9,"Salzburg Museum (circa 9 €)",1,1],
 win:function(){return[9*60,17*60]},
 d:"Il museo della storia della città e della regione, nella Neue Residenz sulla Mozartplatz: oggetti dell'epoca dei principi arcivescovi, arte, strumenti musicali e mostre temporanee. Dal piano alto si vede la piazza.",
 m:"Orari e prezzo da una guida non recente (2022): aperto dal martedì alla domenica dalle 9 alle 17, chiuso il lunedì; intero circa 9 €. Il museo ha cambiato mostre da allora: da confermare sul sito ufficiale prima di andare."},
stpeter:{t:"Abbazia di San Pietro e cimitero",z:"A",p:4,min:30,id:40,max:60,pos:[47.7976,13.0447],q:"Stift St. Peter, Salzburg",cls:"walk",sun:1,
 d:"Il monastero benedettino più antico di lingua tedesca, con una chiesa rococò, un piccolo cimitero tra le rocce del Mönchsberg e catacombe scavate nella parete. È una pausa silenziosa a pochi passi dal Duomo.",
 m:"Chiesa e cimitero si visitano gratis di giorno, ma gli orari precisi della stagione invernale non li ho letti sul sito ufficiale: da confermare sul posto. Le catacombe hanno un biglietto a parte (prezzo da confermare). Il ristorante Stiftskeller è nello stesso complesso."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
function PP(id){return id==="start"?START:STOPS[id].pos}
function WK(a,b,min,t1,t2){var pa=PP(a),pb=PP(b);P2(a,b,min,"walk",t1,t2,{f:[W([pa,pb])],r:[W([pb,pa])]})}
WK("start","altstadt",3,"A piedi per la Getreidegasse, circa 3 minuti.","A piedi fino a Mozartplatz, circa 3 minuti.");
WK("start","geburtshaus",4,"A piedi fino alla Getreidegasse, circa 4 minuti.","A piedi fino a Mozartplatz, circa 4 minuti.");
WK("start","dom",4,"A piedi per la Residenzplatz fino al Duomo, circa 4 minuti.","A piedi per la Residenzplatz fino a Mozartplatz, circa 4 minuti.");
WK("start","museum",2,"A piedi, il museo è sulla stessa piazza.","A piedi fino a Mozartplatz, circa 2 minuti.");
WK("start","stpeter",5,"A piedi per la Kapitelplatz fino a San Pietro, circa 5 minuti.","A piedi fino a Mozartplatz, circa 5 minuti.");
WK("start","festung",15,"A piedi fino alla stazione a valle della funicolare (Festungsgasse), poi su in meno di un minuto: circa 15 minuti in tutto, o 25 a piedi su per il sentiero.","In funicolare e a piedi fino a Mozartplatz, circa 15 minuti.");
WK("start","mirabell",12,"A piedi attraverso lo Staatsbrücke fino a Mirabellplatz, circa 12 minuti.","A piedi per lo Staatsbrücke fino a Mozartplatz, circa 12 minuti.");
WK("start","wohnhaus",10,"A piedi attraverso lo Staatsbrücke fino alla Makartplatz, circa 10 minuti.","A piedi per lo Staatsbrücke fino a Mozartplatz, circa 10 minuti.");
WK("start","monchsberg",7,"A piedi fino all'ascensore del Mönchsberg in Gstättengasse, circa 7 minuti.","A piedi fino a Mozartplatz, circa 7 minuti.");
WK("mirabell","wohnhaus",5,"A piedi fino alla Makartplatz, circa 5 minuti.","A piedi fino a Mirabellplatz, circa 5 minuti.");
WK("wohnhaus","altstadt",10,"A piedi attraverso lo Staatsbrücke fino alla Getreidegasse, circa 10 minuti.","A piedi per lo Staatsbrücke fino alla Makartplatz, circa 10 minuti.");
WK("mirabell","altstadt",12,"A piedi attraverso lo Staatsbrücke fino alla Getreidegasse, circa 12 minuti.","A piedi fino al giardino di Mirabell, circa 12 minuti.");
WK("dom","stpeter",3,"A piedi fino a San Pietro, circa 3 minuti.","A piedi fino al Duomo, circa 3 minuti.");
WK("dom","festung",10,"A piedi fino alla funicolare e su alla fortezza, circa 10 minuti.","In funicolare e a piedi fino al Duomo, circa 10 minuti.");
WK("monchsberg","festung",20,"A piedi lungo il crinale del Mönchsberg fino alla fortezza, circa 20 minuti.","A piedi lungo il crinale fino all'ascensore, circa 20 minuti.");
P2("start","hellbrunn",30,"metro","Autobus 25 dalla stazione degli autobus di Rudolfskai/Hauptbahnhof fino a Hellbrunn, circa 25–30 minuti (linea e frequenza da confermare). In alternativa a piedi lungo la Hellbrunner Allee, circa 45 minuti.","Autobus 25 o a piedi fino al centro, circa 30 minuti (da confermare).",{f:[W([START,[47.7800,13.0540],[47.7627,13.0616]])],r:[W([[47.7627,13.0616],[47.7800,13.0540],START])]});
/* ritorno in aeroporto: a piedi o in autobus fino alla stazione e autobus 2 */
var RET={
SZG:{
 A:{min:45,txt:"Dalla Mozartplatz a piedi o in autobus urbano fino alla stazione centrale (Hauptbahnhof, circa 20 minuti a piedi), poi autobus 2 per l'aeroporto (circa 20 minuti, più corse all'ora). Biglietto da 1 ora 2,60 € (tariffa 2026, da confermare che l'aeroporto sia nella zona centrale).",g:[W([[47.7988,13.0436],[47.8012,13.0459],[47.8054,13.0427],[47.8130,13.0457]]),["bus2","Hauptbahnhof","Aeroporto"]]}}
};
var ARR={
SZG:[["bus2","Aeroporto","Hauptbahnhof"],W([[47.8130,13.0457],[47.8054,13.0427],[47.8012,13.0459],[47.7988,13.0436]])]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari da guide e schede online, non letti sui siti: da confermare */
var V={
tomaselli:{n:"Café Tomaselli",a:"Alter Markt 9",z:"A",r:"4,3",pos:[47.7992,13.0443],h:["07:00-19:00","07:00-19:00","07:00-19:00","07:00-19:00","07:00-19:00","07:00-19:00","08:00-19:00"],
 d:"Il caffè storico di Salisburgo, aperto dal 1705 sull'Alter Markt: sale con stucchi, camerieri con i vassoi di torte da cui scegliere e una Melange con il classico strudel di mele.",pr:"Un caffè con una fetta di torta sta intorno ai 9–12 € (listino non visto). Orari da una guida: altre fonti indicano una chiusura serale più tarda (19:00 o 21:00), da confermare."},
fuerst:{n:"Café-Konditorei Fürst",a:"Brodgasse 13",z:"A",r:"4,4",pos:[47.8001,13.0432],h:D7("09:00-18:00"),
 d:"La pasticceria dove nel 1890 Paul Fürst inventò la Mozartkugel, la pallina di pistacchio, marzapane e cioccolato fondente. Si fa colazione con una fetta di torta o si compra una scatola da portare a casa.",pr:"Una Mozartkugel costa circa 1,5–2 € al pezzo; un caffè con una torta sta intorno ai 8–11 € (listino non visto). Orari da una guida: altre fonti indicano un'apertura più lunga, da confermare."},
bazar:{n:"Café Bazar",a:"Schwarzstraße 3",z:"B",r:"4,4",pos:[47.8039,13.0444],h:["07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30",""],
 d:"Un caffè letterario dal 1909 sulla riva destra della Salzach, con la terrazza sul fiume e la fortezza di fronte. Si prende una Melange con il Milchrahmstrudel, o un panino o una frittata per pranzo.",pr:"Un caffè con una torta sta intorno ai 8–11 € e un piatto leggero sui 10–14 € (listino non visto). Accetta solo contanti (da una guida). Alcune fonti indicano apertura anche la domenica: da confermare."},
ratio:{n:"Ratio Coffee Roasters",a:"Linzergasse 72A",z:"B",r:"4,6",pos:[47.8057,13.0472],h:D7("08:00-18:00"),
 d:"Una piccola torrefazione sulla Linzergasse, vicino al Kapuzinerberg: caffè di specialità (filtro, flat white), qualche torta e uno snack leggero, con alcuni tavoli all'aperto.",pr:"Un caffè sta intorno ai 3,5–5 € e una fetta di torta ai 4–6 € (listino non visto). Orari da una guida, da confermare."},
alchemie:{n:"Kaffee Alchemie",a:"Rudolfskai 38",z:"A",r:"4,6",pos:[47.8021,13.0468],h:["07:00-18:00","07:00-18:00","07:00-18:00","07:00-18:00","07:00-18:00","09:00-18:00","09:00-18:00"],
 d:"Un caffè di specialità sul lungofiume Rudolfskai, con più di dieci tipi di caffè di origini diverse e dolci fatti in casa, in un ambiente raccolto e tranquillo.",pr:"Un caffè sta intorno ai 3,5–5 € e un dolce ai 4–6 € (listino non visto). Orari da una guida: nel fine settimana l'apertura è circa alle 9, da confermare."},
grad:{n:"220 Grad",a:"Wiener-Philharmoniker-Gasse 9",z:"A",r:"4,5",pos:[47.7985,13.0418],h:["","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00"],
 d:"Una torrefazione familiare nel Kaiviertel, accanto al Festspielhaus: espresso e caffè filtro, un piccolo menù di piatti e dolci per una pausa tranquilla dopo la città vecchia.",pr:"Un caffè sta intorno ai 3,5–5 €, un piatto leggero ai 9–13 € (listino non visto). Chiuso il lunedì secondo una guida, da confermare."},
braustubl:{n:"Augustiner Bräustübl",a:"Augustinergasse 4",z:"D",r:"4,5",pos:[47.8060,13.0357],h:["15:00-23:00","15:00-23:00","15:00-23:00","15:00-23:00","15:00-23:00","14:30-23:00","14:30-23:00"],
 d:"La più grande birreria monastica d'Austria: la birra si spilla da botti di legno in boccali di pietra, si prende da mangiare nel passaggio delle bancarelle (salsicce, maiale arrosto, pretzel) e si siede nelle sale o nel giardino con i castagni. Prima si paga il boccale alla cassa e si porta con la ricevuta alla spina.",pr:"Una birra da mezzo litro costa circa 5–6 €; un piatto di cucina tipica sta intorno ai 10–15 € (listino non visto). Gli orari li ricordo da fonti non datate (apre il pomeriggio): da confermare sul sito."},
stiftskeller:{n:"St. Peter Stiftskeller",a:"St.-Peter-Bezirk 1/4",z:"A",r:"4,3",pos:[47.7974,13.0443],h:D7("11:30-22:00"),
 d:"Un ristorante dentro l'abbazia di San Pietro che si presenta come uno dei più antichi d'Europa, con sale voltate e un cortile: cucina salisburghese con piatti come il Tafelspitz (bollito di manzo) e i Nockerl, la meringa dolce simbolo della città.",pr:"Un piatto principale sta intorno ai 18–28 € (listino non visto). È un po' più caro degli altri locali della lista. Orari da fonti non datate: da confermare, e conviene prenotare la sera."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["fuerst","tomaselli","alchemie","grad"],B:["bazar","ratio"],C:["grad","fuerst","tomaselli"],D:["bazar","ratio"],F:["tomaselli","fuerst"]},
pra:{A:["fuerst","tomaselli","stiftskeller"],B:["bazar","ratio"],C:["fuerst","stiftskeller"],D:["bazar","ratio"],F:["tomaselli","fuerst"]},
cen:{A:["stiftskeller","braustubl"],B:["braustubl","stiftskeller"],C:["stiftskeller","braustubl"],D:["braustubl","stiftskeller"],F:["stiftskeller","braustubl"]},
snk:{A:["fuerst","tomaselli","ratio"],B:["ratio","bazar"],C:["grad","fuerst"],D:["bazar","ratio"],F:["tomaselli","fuerst"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Getreidegasse e Casa natale di Mozart",acts:["altstadt","geburtshaus","dom"],need:230,core:1},
{id:"rocca",t:"Fortezza e Mönchsberg",acts:["festung","monchsberg"],need:190,core:1},
{id:"mira",t:"Mirabell e Casa di Mozart",acts:["mirabell","wohnhaus"],need:110,core:1},
{id:"barocco",t:"San Pietro e Salzburg Museum",acts:["stpeter","museum"],need:115},
{id:"hell",t:"Castello di Hellbrunn",acts:["hellbrunn"],need:120}
];
var ORDER=["altstadt","geburtshaus","festung","dom","mirabell","wohnhaus","monchsberg","stpeter","museum","hellbrunn"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["alt","Altstadt (città vecchia)",[47.7999,13.0440],"A"],
["neu","Neustadt / Mirabell / Hauptbahnhof",[47.8060,13.0450],"B"],
["non","Nonntal / Mönchsberg / Fortezza",[47.7930,13.0480],"C"],
["mul","Mülln / Maxglan",[47.8060,13.0360],"D"],
["hel","Hellbrunn / Sud",[47.7700,13.0600],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[47.7988,13.0436],""]
];
/* imposta di soggiorno: non verificata (importo per persona e notte, da confermare con la struttura) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Frühstück mit Semmel","la colazione con panini freschi, burro, marmellata e un caffè."],["Melange und Strudel","caffè con latte schiumato (Melange) e un dolce, di solito lo strudel di mele o il Milchrahmstrudel."],["Mozartkugel","la pallina di pistacchio e cioccolato inventata a Salisburgo, ottima con un caffè."]],
pra:[["Bosna","il panino tipico di Salisburgo con salsiccia, cipolla e senape."],["Leberkäsesemmel","un panino con una fetta di polpettone caldo."],["Eine kleine Gulaschsuppe","zuppa di gulasch, pasto veloce e caldo."],["Brezn","il pretzel, da mangiare con la birra o in pausa."]],
cen:[["Salzburger Nockerl","la meringa dolce al forno, il dolce simbolo di Salisburgo, da dividere in due."],["Wiener Schnitzel","cotoletta impanata con insalata di patate."],["Tafelspitz","bollito di manzo con rafano e mele."],["Kasnocken","gnocchetti al formaggio con cipolle fritte, un piatto tipico delle montagne."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","La fortezza dal ponte","Foto","Dallo Mozartsteg o dallo Staatsbrücke la fortezza si specchia sulla Salzach: è la foto classica della città.",[47.8007,13.0461],"Mozartsteg, Salzburg","festung"],
["📷","Getreidegasse e le insegne","Foto","Le insegne di ferro battuto che sporgono dalle facciate sono il tema più fotografato della strada.",[47.8004,13.0436],"Getreidegasse, Salzburg","altstadt"],
["🤳","Davanti alla Casa natale di Mozart","Selfie","La facciata gialla al numero 9 della Getreidegasse, con l'insegna sopra la porta.",[47.8004,13.0431],"Mozarts Geburtshaus, Salzburg","geburtshaus"],
["📷","Il Duomo dalla Residenzplatz","Foto","La facciata in marmo del Duomo e la fontana barocca sulla piazza.",[47.7982,13.0461],"Residenzbrunnen, Salzburg","dom"],
["🤳","Il giardino di Mirabell","Selfie","I nani di pietra e le aiuole con la fortezza sullo sfondo, soprattutto al mattino.",[47.8056,13.0414],"Mirabellgarten, Salzburg","mirabell"],
["📷","Il Pegasus di Mirabell","Foto","La fontana del Pegasus all'ingresso del giardino, al centro della prospettiva del castello.",[47.8049,13.0422],"Pegasusbrunnen Mirabell, Salzburg","mirabell"],
["📷","La città dal Mönchsberg","Foto","Dalla terrazza sopra l'ascensore i tetti, i campanili e le montagne in un solo scatto.",[47.7989,13.0386],"Mönchsberg Aussichtspunkt, Salzburg","monchsberg"],
["📷","Il cimitero di San Pietro","Foto","Le tombe tra le rocce del Mönchsberg: un angolo raccolto e fuori dalla folla.",[47.7977,13.0450],"Petersfriedhof, Salzburg","stpeter"],
["🤳","I giochi d'acqua di Hellbrunn","Selfie","Il tavolo con i sedili spruzzanti è lo scherzo più famoso del castello.",[47.7624,13.0624],"Wasserspiele Hellbrunn, Salzburg","hellbrunn"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2027-03-27",t:"Hellbrunn: giochi d'acqua chiusi da novembre",x:"Il castello e i giochi d'acqua di Hellbrunn sono aperti tutti i giorni fino al 1° novembre 2026; dopo non è prevista la visita fino alla primavera 2027 (date da confermare su hellbrunn.at). I giardini restano aperti e dal 20 novembre al 24 dicembre c'è il mercatino di Natale."},
{from:"2026-11-01",to:"2026-11-14",t:"Funicolare della fortezza chiusa dal 9 al 13 novembre",x:"La funicolare che sale a Hohensalzburg è ferma per manutenzione dal 9 al 13 novembre 2026. La fortezza resta raggiungibile a piedi in circa 15–25 minuti, con un biglietto più economico. Dall'11 gennaio al 14 marzo 2027 la funicolare è chiusa per lavori di accessibilità."},
{from:"2026-11-20",to:"2027-01-01",t:"Mercatini di Natale di Salisburgo",x:"Il Christkindlmarkt in Dom- e Residenzplatz è aperto dal 20 novembre 2026 al 1° gennaio 2027 (lun–gio 10–20:30, ven 10–21, sab 9–21, dom 9–20:30; 24 dicembre 9–15). A Hellbrunn l'Adventzauber va dal 20 novembre al 24 dicembre. Il Festungsadvent, nel cortile della fortezza, è aperto da metà novembre fino a poco prima di Natale, venerdì–domenica 11–19. Il centro è molto più affollato."},
{from:"2026-10-14",to:"2026-12-12",t:"Treni tra Monaco e Salisburgo più lenti",x:"Fino al 12 dicembre 2026 la linea Passau–Obertraubling in Baviera è chiusa per lavori: alcuni viaggi tra Salisburgo e Monaco durano circa 15 minuti in più e qualche IC tra Wels e Salisburgo è cancellato. Se usi Monaco come aeroporto, controlla l'orario su oebb.at."},
{from:"2026-10-14",to:"2027-09-30",t:"DomQuartier: alcune sezioni chiuse",x:"La Residenzgalerie è chiusa fino all'autunno 2027 e dal 17 agosto 2026 la terrazza Dombogen si raggiunge solo attraverso il Museo del Duomo. Il percorso è aperto tutti i giorni tranne il martedì."}
];
/* clima medio di Salisburgo (indicativo, massime/minime) */
var CLIM=[[2,-5],[5,-4],[10,-1],[15,3],[20,8],[23,12],[25,14],[25,13],[20,9],[14,5],[7,1],[3,-3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Salisburgo: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="dom"&&WD===1)meta+=" Oggi è martedì: il DomQuartier è chiuso, il Duomo resta visitabile fuori dalle funzioni.";
if(it.id==="museum"&&WD===0)meta+=" Oggi è lunedì: il Salzburg Museum di norma è chiuso.";
if(it.id==="altstadt"&&WD===6)meta+=" Oggi è domenica: i negozi della Getreidegasse sono chiusi, restano aperti caffè e ristoranti.";
return meta}
Object.assign(C,{id:"salisburgo",n:"Salisburgo",cn:"Austria",e:"🎼",flag:"🇦🇹",col:["#c8102e","#e8e8e8","#c9a24a"],k:"salisburgo salzburg austria",
TZ:"Europe/Vienna",LL:[47.7988,13.0436],CC:"at",QN:"Salisburgo",BK:"Salisburgo",ARE:/salzburg|salisburgo|\b50[0-9]{2}\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"de-AT",LANGN:"tedesco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Mozartplatz",q:"Mozartplatz, Salzburg"},
SINGLE:{acts:["altstadt","geburtshaus","festung","mirabell","dom"],ins:[]},
EXCL:[],
DICON:{altstadt:"🏘️",festung:"🏰",dom:"⛪",geburtshaus:"🎻",wohnhaus:"🎹",mirabell:"🌷",monchsberg:"⛰️",hellbrunn:"💦",museum:"🖼️",stpeter:"🕯️"},
ZN:{A:"nella città vecchia",B:"nella Neustadt e a Mirabell",C:"a Nonntal e sul Mönchsberg",D:"a Mülln",F:"a Hellbrunn"},
NEAR:{col:"caffè",pra:"locale veloce o caffè",cen:"locale",snk:"caffè o pasticceria"},
SE:{tomaselli:"☕",fuerst:"🍫",bazar:"☕",ratio:"☕",alchemie:"☕",grad:"☕",braustubl:"🍺",stiftskeller:"🍽️"},
TR:{one:2.6,lbl:"Autobus urbani (biglietto da 1 ora)",
 air:{SZG:{one:2.6,n:"Autobus 2 per l'aeroporto (biglietto da 1 ora, 2,60 €; da confermare)"}},
 passes:[],
 note:"Prezzo dal sito della Salzburg Verkehr (tariffa dal 1° gennaio 2026): biglietto da 1 ora 2,60 € intero, minimo 1,30 €, valido 60 minuti nella zona centrale e non acquistabile a bordo (macchinette, app o sito). Il biglietto giornaliero e l'eventuale Salzburg Card (musei e mezzi) non li ho potuti verificare: confronta i prezzi sul sito ufficiale se pensi di visitare molti musei. Il centro storico è piccolo e si fa quasi tutto a piedi."},
FOOD:{co:[8,"Colazione al caffè"],pr:[9,"Pranzo (panino o piatto leggero)"],ce:[17,"Cena (cucina salisburghese)"],sp:[5,"Spuntini e dolci"]},
T:{ride:"In autobus",move:"quasi tutto a piedi, a volte in autobus",bags:"«Kann ich meine Koffer hier lassen?»",bagsPM:"«Kann ich meine Koffer bis heute Nachmittag hier lassen?»",bagsAM:"«Kann ich meine Koffer bis Mittag hier lassen?»",
pra:"Un panino o un caffè",praZ:{A:"Nella Getreidegasse e intorno all'Alter Markt i ristoranti con il menù esposto sono per turisti e costano molto: per un pasto vero cerca le vie laterali o la riva destra del fiume."},
freeLong:"Qualche idea: una passeggiata sul lungofiume Salzach, una sosta in un caffè storico, il giardino di Mirabell, una salita sul Mönchsberg o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè storico.",
remind:"Domenica i negozi sono chiusi. Controlla gli orari di Casa natale, DomQuartier e fortezza: cambiano in inverno.",
rain1:"Al coperto: la fortezza, la Casa natale e la Mozart-Wohnhaus, il DomQuartier, il Duomo e i caffè storici.",
rainM:"Al coperto: fortezza, Casa natale, Mozart-Wohnhaus, DomQuartier, Salzburg Museum e i caffè storici.",
water:"Riempite la borraccia: l'acqua del rubinetto di Salisburgo arriva dalle sorgenti alpine ed è ottima. Ci sono fontanelle in città: attivate «Acqua» sulla mappa.",
kitchen:"A Salisburgo si pranza tra le 12 e le 14:30 e si cena dalle 18: i caffè servono tutto il giorno, ma molti ristoranti tradizionali chiudono tra i due servizi.",
night:[["🍺","Una birra al Bräustübl di Mülln, tra i boccali di pietra e le sale con le volte: il modo salisburghese di chiudere la giornata."],["🕙","Le cucine chiudono presto, di solito alle 21–22; di sera la città vecchia è molto tranquilla."],["☕","Molti caffè aprono alle 7–8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Salisburgo ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per caffè e locali tipici: una colazione sta intorno agli 8–12 € e una cena completa con un piatto principale intorno ai 17–25 €. Quasi ovunque si paga con la carta; il Café Bazar accetta solo contanti.",
taxNote:"L'imposta di soggiorno di Salisburgo è una tassa per persona e per notte, di pochi euro, che spesso si paga alla struttura oltre al prezzo dell'annuncio. L'importo preciso non l'ho potuto verificare: chiedi alla struttura se è già compresa.",
mcrit:"Criteri: almeno 4 stelle su Google, caffè storici e locali tradizionali, niente catene. Colazione e cena restano intorno a 8–12 € e 17–25 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["L'aeroporto è piccolo: i controlli di sicurezza richiedono di solito poco tempo, ma presentati almeno due ore prima.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietti da 1 ora (2,60 €) per l'autobus 2 e i mezzi: si comprano alla macchinetta, con l'app o sul sito, non a bordo",function(E){return true}],["fes","Fortezza di Hohensalzburg: Panorama Ticket con funicolare (12,80 €)",["festung"]],["moz","Casa natale (circa 15 €) e Mozart-Wohnhaus (15 €; biglietto cumulativo 23 €)",["geburtshaus","wohnhaus"]],["dq","DomQuartier (martedì chiuso): controlla il biglietto su domquartier.at",["dom"]],["hel","Hellbrunn: aperto solo fino al 1° novembre 2026 (16,50 €)",["hellbrunn"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti, per esempio per il Café Bazar"]],
NUM:{1:["ein","ain"],2:["zwei","zvai"],3:["drei","drai"],4:["vier","fir"],5:["fünf","fünf"],6:["sechs","zeks"],7:["sieben","ZI-ben"],8:["acht","acht"],9:["neun","noin"],10:["zehn","zen"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Grüß Gott / Guten Abend","grüs got / GU-ten A-bent"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Einen Tisch für "+(N===1?"eine Person":nu[0])+", bitte","AI-nen tish für "+(N===1?"AI-ne per-ZON":nu[1])+", BIT-te"],["Una Melange e una fetta di torta, per favore","Eine Melange und ein Stück Torte, bitte","AI-ne me-LANSH unt ain shtük TOR-te, BIT-te"],["Acqua del rubinetto, per favore","Leitungswasser, bitte","LAI-tungs-vas-ser, BIT-te"],["Il conto, per favore","Zahlen, bitte","TSA-len, BIT-te"],["Posso pagare con la carta?","Kann ich mit Karte zahlen?","kan ich mit KAR-te TSA-len"],["Quanto costa?","Wie viel kostet das?","vi fil KOS-tet das"],["Dov'è la fermata dell'autobus?","Wo ist die Bushaltestelle?","vo ist di BUS-hal-te-shtel-le"],["Qual è l'autobus per l'aeroporto?","Welcher Bus fährt zum Flughafen?","VEL-cher bus fert tsum FLUG-ha-fen"]];
if(M)fr=fr.concat([["Ho una prenotazione","Ich habe eine Reservierung","ich HA-be AI-ne re-ser-VI-rung"],["Posso lasciare i bagagli?","Kann ich meine Koffer hier lassen?","kan ich MAI-ne KOF-fer hir LAS-sen"],["A che ora è il check-out?","Um wie viel Uhr ist das Check-out?","um vi fil ur ist das tsek-AUT"]]);
return fr.concat([["Mi scusi","Entschuldigung","ent-SHUL-di-gung"],["Grazie mille!","Vielen Dank!","FI-len dank"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Salisburgo: "+(tx[0]==="no"?"non si paga se sei ospite di amici o parenti":"è una tassa per persona e per notte, di pochi euro (importo da confermare con la struttura, spesso pagata a parte)")+"."},
STAYTIPS:["I mezzi pubblici sono pochi e comodi solo per raggiungere la stazione, l'aeroporto o Hellbrunn: la città vecchia è piccola e si gira quasi tutta a piedi. Le zone vicine alla Salzach (Altstadt e Neustadt) sono le più pratiche."],
ZONES:[
["🚌 Autobus e biglietti",["Il biglietto da 1 ora costa 2,60 € intero (tariffa 2026) e vale 60 minuti, con tutti i cambi che ti servono: non si compra a bordo, ma alla macchinetta, con l'app o sul sito.","Per l'aeroporto prendi l'autobus 2 dalla Hauptbahnhof: circa 20 minuti.","Il centro storico è quasi tutto pedonale: in autobus serve soprattutto per Hellbrunn o per la stazione."]],
["🎼 Mozart e la città vecchia",["La Casa natale (Getreidegasse 9) e la Mozart-Wohnhaus (Makartplatz) sono due biglietti distinti o un biglietto cumulativo da 23 €.","Dopo le case, le tappe più vicine sono la Getreidegasse, l'Alter Markt, la Residenzplatz e il Duomo: si fanno in circa tre ore a piedi.","Il Duomo e la Residenz sono più interessanti con il DomQuartier, chiuso il martedì."],["geburtshaus","wohnhaus","altstadt","dom"]],
["🏰 Fortezza e Mönchsberg",["La funicolare sale in meno di un minuto; costa 4 € solo andata e 6,30 € andata e ritorno, ma il Panorama Ticket (12,80 €) la comprende.","La salita a piedi dura circa 15–25 minuti ed è più economica.","Dal Mönchsberg si cammina sul crinale fino alla fortezza, con belle viste sulla città."],["festung","monchsberg"]],
["☕ Caffè e Mozartkugel",["I caffè storici (Tomaselli, Fürst) sono una pausa da non saltare: si resta anche ore con una sola consumazione.","La Mozartkugel originale è quella della pasticceria Fürst, in carta d'argento e blu.","Una Melange è un cappuccino all'austriaca; un Einspänner è un caffè con panna."],["tomaselli","fuerst","bazar"]],
["🌅 Un giorno fuori Salisburgo",["Il Salzkammergut, con i laghi di Hallstatt e St. Wolfgang, si raggiunge in autobus o in treno in circa 1–2 ore.","Le miniere di sale di Hallein sono a una ventina di minuti in treno (orari e prezzi da controllare).","Monaco di Baviera è a circa 1 ora e mezza di treno."]]],
WTIPS:["L'acqua del rubinetto di Salisburgo arriva dalle sorgenti alpine ed è ottima: puoi chiederla in ogni locale («Leitungswasser, bitte») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["L'Austria usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Salisburgo ha lo stesso fuso orario dell'Italia.","Mancia: si arrotonda al tavolo (5–10%), dicendo la cifra al cameriere al momento di pagare, non lasciandola sul tavolo.","La domenica e nei festivi i negozi sono chiusi; sono aperti ristoranti, caffè e musei.","Alcuni caffè storici accettano solo contanti: porta qualche euro.","Dal Mönchsberg e dalla fortezza il freddo si sente di più: porta un cappello e un giubbotto caldo in autunno e in inverno.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (numero unico europeo); in alternativa 133 polizia, 144 ambulanza, 122 vigili del fuoco</li><li>🚌 Trasporti pubblici: <a href="https://salzburg-verkehr.at/en/" target="_blank" rel="noopener">salzburg-verkehr.at</a> · treni: <a href="https://www.oebb.at/" target="_blank" rel="noopener">oebb.at</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Vienna: <a href="https://ambvienna.esteri.it" target="_blank" rel="noopener">ambvienna.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Salisburgo. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://salzburg-verkehr.at/en/" target="_blank" rel="noopener">salzburg-verkehr.at</a> e, per i treni, <a href="https://www.oebb.at/" target="_blank" rel="noopener">oebb.at</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V80 L40 56 L70 74 L110 44 L150 70 L180 60 L210 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 V84 H38 V106 Z M14 84 V70 H34 V84 Z M18 70 L24 54 L30 70 Z"/></g>'+
'<g style="--k:2"><path d="M70 106 V72 H130 V106 Z M70 72 H78 V56 H122 V72 H130 L100 40 Z M96 40 V32 H104 V40 Z M60 106 V72 L70 72 Z"/></g>'+
'<g style="--k:3"><path d="M150 106 V66 H190 V106 Z M156 66 V52 H164 V66 Z M176 66 V52 H184 V66 Z M154 52 H166 L160 36 Z M174 52 H186 L180 36 Z"/></g>'+
'<g style="--k:4"><path d="M218 106 V76 H250 V106 Z M222 76 V28 L228 18 L234 28 V76 Z M246 76 V60 H250 V76 Z"/></g>'+
'<g style="--k:5"><path d="M276 106 V50 H392 V106 Z M270 50 H396 V44 H270 Z M290 44 V30 H312 V44 Z M330 44 V24 H352 V44 Z M366 44 V34 H380 V44 Z M300 30 V22 H302 V30 Z M340 24 V14 H342 V24 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M0 100 q50 -3 100 0 t100 0 t100 0 t100 0"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.salisburgo);

;var n=window.CITIES["salisburgo"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["salisburgo"]);
