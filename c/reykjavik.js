(function(o){
/* ===== Reykjavík (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.reykjavik=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var B=function(a){return {w:a,dash:1}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: 1 € = 136,2 corone islandesi (ISK) al 13 ottobre 2026 */
var PAR={
KEF:{n:"Keflavík (KEF)",s:"Keflavík International Airport",url:"https://www.isavia.is/en/keflavik-airport",live:"Reykjavik",inMin:110,buf:120,pos:[63.9850,-22.6056],sd:"Aeroporto KEF · bus Flybus",rt:"Dall'aeroporto: bus Flybus fino alla stazione degli autobus BSÍ (circa 45 minuti), poi a piedi o in autobus fino al centro.",
 arr:"Dall'Italia si entra in Islanda senza controllo passaporti (spazio Schengen). Keflavík è a circa 50 chilometri dalla città e non c'è né treno né metro: si va in autobus. Il Flybus parte davanti al terminal poco dopo l'arrivo di ogni volo e arriva in circa 45 minuti alla stazione BSÍ, a 25 minuti a piedi dal centro; con un'aggiunta si può scendere con un minibus alla fermata più vicina all'albergo (circa 30 minuti in più). In alternativa c'è l'Airport Direct, che porta direttamente a molti alberghi, o l'autobus Strætó 55, più economico ma con pochi passaggi e circa 1 ora e 15 minuti di viaggio. In tutto, dall'atterraggio al centro, contate circa 1 ora e 45 minuti.",
 tk:"Biglietto: Flybus da circa 3.999 kr (circa 29 €), trasferimento fino all'albergo più 500 kr; Airport Direct circa 3.500–4.500 kr (26–33 €); Strætó 55 circa 2.280 kr (circa 17 €); il taxi costa 20.000–25.000 kr (150–185 €). Prezzi da guide e siti di prenotazione, non dal sito del Flybus: da confermare. I biglietti si comprano online o allo sportello dentro l'aeroporto, davanti all'uscita.",
 gm:"BSÍ Bus Terminal, Reykjavík",
 tips:["Il Flybus parte in coincidenza con ogni volo in arrivo: se il bagaglio ritarda, il bus successivo c'è comunque.","Il taxi costa 20.000–25.000 kr (circa 150–185 €): conviene solo in tre o quattro persone.","In Islanda si paga quasi tutto con la carta, anche un caffè: non serve cambiare molti soldi."]},
RKV:{n:"Reykjavík (RKV)",s:"Reykjavík Airport (voli interni)",url:"https://www.isavia.is/en/reykjavik-airport",live:"Reykjavik",inMin:45,buf:75,pos:[64.1300,-21.9406],sd:"Aeroporto RKV · voli interni",rt:"Dall'aeroporto: a piedi o in autobus Strætó fino al centro, circa 2 chilometri.",
 arr:"Reykjavík (RKV) è l'aeroporto dei voli interni, per le Isole Fær Øer e per la Groenlandia: dall'Italia non ci sono voli di linea, ci si arriva solo con una coincidenza o con un volo interno. Si trova a due chilometri dal centro, vicino al Tjörnin: a piedi sono circa 30 minuti, e in autobus Strætó o in taxi si arriva in 10–15 minuti. Prendete il percorso a piedi solo se il tempo è buono: a ottobre e a novembre il vento è forte.",
 tk:"Biglietto: una corsa in autobus Strætó costa circa 690 kr (circa 5 €); il taxi per il centro circa 2.500–3.500 kr (18–26 €, stima da controllare). L'autobus si paga con l'app Klappið.",
 gm:"Reykjavík Airport, Reykjavík",
 tips:["Con i voli internazionali da Keflavík non c'è un autobus diretto: a Keflavík cambia con il Flybus fino a BSÍ, a meno di un chilometro dall'aeroporto interno.","Il terminal è piccolo: arrivare 45 minuti prima del volo interno basta di solito."]}
};
/* linee (tracciati indicativi) */
var SEG={
fb:{c:"#c8102e",n:"Autobus Flybus dall'aeroporto",p:[[63.9850,-22.6056,"Aeroporto",2],[64.1382,-21.9434,"BSÍ",2]]}
};
var START=[64.1472,-21.9375];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
hallgrim:{t:"Hallgrímskirkja e la torre",z:"B",p:1,min:45,id:60,max:90,pos:[64.1417,-21.9266],q:"Hallgrímskirkja, Reykjavík",cls:"",sun:1,tk:[11,"Hallgrímskirkja: torre (1.500 kr)",1,1],
 win:function(){return[10*60,16*60+45]},
 d:"La grande chiesa luterana di cemento, con la torre alta 74 metri che ricorda le colonne di basalto islandesi: è il simbolo della città e si vede da quasi ovunque. Dalla torre c'è una vista a 360 gradi sui tetti colorati, sul mare e sulle montagne.",
 m:"Da settembre la chiesa è aperta tutti i giorni dalle 10 alle 17 e la torre dalle 10 alle 16:45 (ultimo ingresso). In estate gli orari sono 9–20. La domenica la chiesa e la torre di solito chiudono circa dalle 10:30 alle 12:30 per la messa; nei giorni feriali la navata chiude a volte per funzioni private. Torre: 1.500 kr (circa 11 €) per gli adulti, 1.300 kr con la tessera da studente, 200 kr per i bambini di 7–16 anni. I biglietti si comprano nel negozio della chiesa, non si prenotano. Chiusa il 24 e il 25 dicembre e il 1° gennaio (sito ufficiale)."},
harpa:{t:"Harpa e il lungomare del Sólfar",z:"A",p:1,min:45,id:60,max:90,pos:[64.1503,-21.9330],q:"Harpa Reykjavík",cls:"walk",sun:1,
 d:"La sala da concerti di vetro, con la facciata a cristalli di basalto che cambiano colore con la luce. Dentro si entra gratis nell'atrio, con i caffè e il negozio. Poco a est, sul lungomare, c'è il Sólfar, la scultura a forma di nave vichinga, e in giornate chiare si vede il monte Esja.",
 m:"L'edificio è aperto dalla domenica al martedì dalle 10 alle 18 e dal mercoledì al sabato dalle 10 alle 20; l'atrio è gratuito, mentre concerti, mostre e visite guidate hanno biglietti a parte (prezzi sul sito harpa.is: non letti). La biglietteria è aperta ogni giorno dalle 10 alle 18. Il Sólfar è sul lungomare e si vede sempre, gratis."},
laugavegur:{t:"Laugavegur e Skólavörðustígur",z:"A",p:2,min:60,id:90,max:150,pos:[64.1456,-21.9300],q:"Skólavörðustígur, Reykjavík",cls:"walk",sun:1,
 d:"La strada principale per camminare e fare acquisti, con i negozi di lana e di design, i caffè e i murales. Skólavörðustígur, la via che sale alla Hallgrímskirkja, è dipinta con i colori dell'arcobaleno ed è una delle foto più amate della città.",
 m:"Si cammina gratis. I negozi sono aperti di solito dalle 10 alle 18 (il sabato fino alle 17, la domenica a orario ridotto o chiusi); i caffè restano aperti fino a sera. A ottobre e a novembre fa buio presto, già verso le 18, e le strade si riempiono di luci."},
tjorn:{t:"Austurvöllur, Parlamento e lago Tjörnin",z:"A",p:2,min:40,id:60,max:90,pos:[64.1474,-21.9400],q:"Austurvöllur, Reykjavík",cls:"walk",sun:1,
 d:"La piazza dove si trovano il Parlamento (Alþingi) e la piccola cattedrale luterana, circondata da caffè. Poco più a sud c'è il Tjörnin, il laghetto in centro con cigni e anatre, vicino al Municipio, dove si cammina lungo l'acqua con il Parlamento e le case colorate sullo sfondo.",
 m:"Si cammina gratis. La cattedrale (Dómkirkjan) è aperta di solito di giorno, con orari ridotti nei fine settimana (non verificati). Il Municipio ha un atrio con un grande rilievo dell'Islanda, che da guide è visitabile in orario d'ufficio (non verificato)."},
landnam:{t:"Mostra dell'Insediamento (Reykjavík 871±2)",z:"A",p:2,min:45,id:60,max:90,pos:[64.1485,-21.9439],q:"The Settlement Exhibition, Aðalstræti 16, Reykjavík",cls:"",sun:1,tk:[13.2,"Mostra dell'Insediamento (1.800 kr)",1,1],
 win:function(){return[10*60,17*60]},
 d:"Un museo sotterraneo costruito intorno ai resti di una casa lunga vichinga del X secolo, scoperti nel centro della città: la più antica traccia di un insediamento umano a Reykjavík. Pannelli e proiezioni raccontano come vivevano i primi coloni.",
 m:"Aperto tutti i giorni dalle 10 alle 17. Ingresso 1.800 kr (circa 13 €) per gli adulti, 1.150 kr per gli studenti, gratis fino a 17 anni. Chiuso il 24, 25 e 26 dicembre e il 31 dicembre e il 1° gennaio (sito del Museo di Storia della Città)."},
hofn:{t:"Porto Vecchio e Grandi",z:"C",p:3,min:50,id:75,max:120,pos:[64.1518,-21.9437],q:"Reykjavík Old Harbour",cls:"walk",sun:1,
 d:"Il vecchio porto dei pescatori, con le barche colorate, i locali di pesce, i punti di partenza per vedere le balene e, più a ovest, il quartiere di Grandi con birrerie, caffè e una sala di cibo da strada. È il posto giusto per sentire l'odore di mare e fare una pausa.",
 m:"Si cammina gratis, ma le escursioni per le balene e per i puffin (stagionali) si prenotano a parte e dipendono dal meteo; in inverno le partenze sono meno frequenti (prezzi e orari non letti). I locali del porto hanno orari propri."},
hafnarhus:{t:"Hafnarhús: Museo d'Arte di Reykjavík",z:"A",p:3,min:60,id:90,max:120,pos:[64.1497,-21.9399],q:"Hafnarhús, Tryggvagata 17, Reykjavík",cls:"",sun:1,
 win:function(){return[10*60,17*60]},
 d:"Un ex magazzino del porto trasformato nella sezione di arte contemporanea del museo della città: mostre temporanee, le opere di Erró e installazioni di artisti islandesi. È una buona alternativa al coperto, a pochi passi da Harpa.",
 m:"Aperto dal venerdì al mercoledì dalle 10 alle 17 e il giovedì dalle 10 alle 22. Chiuso a Pasqua, il 24, 25 e 31 dicembre e il 1° gennaio; il 26 dicembre apre dalle 13 alle 17. Il biglietto è unico per i tre musei d'arte della città (il prezzo non l'ho letto: controlla su listasafnreykjavikur.is)."},
thjod:{t:"Museo Nazionale d'Islanda",z:"B",p:3,min:90,id:120,max:180,pos:[64.1428,-21.9503],q:"National Museum of Iceland, Suðurgata 41, Reykjavík",cls:"",sun:1,tk:[24.2,"Museo Nazionale d'Islanda (3.300 kr)",1,1],
 win:function(){return[10*60,17*60]},
 d:"La mostra permanente «Making of a Nation» percorre mille anni di storia dell'Islanda, dagli insediamenti vichinghi a oggi, con oggetti originali, tra cui il portale medievale della chiesa di Valþjófsstaður e le spade dell'età vichinga.",
 m:"Aperto tutti i giorni dalle 10 alle 17. Ingresso 3.300 kr (circa 24 €) per gli adulti, 1.600 kr per studenti e anziani, gratis sotto i 18 anni (sito del museo). Il caffè al momento è chiuso."},
perlan:{t:"Perlan: Wonders of Iceland",z:"D",p:4,min:90,id:120,max:180,pos:[64.1292,-21.9183],q:"Perlan, Reykjavík",cls:"",sun:1,tk:[52,"Perlan: Wonders of Iceland (7.090 kr online)",1,1],
 win:function(){return[10*60,18*60]},
 d:"Il museo sotto una cupola di vetro su una collina sopra la città: una vera grotta di ghiaccio, mostre sui ghiacciai e sui vulcani, un planetario e una terrazza panoramica a 360 gradi, inclusa nel biglietto. Dall'alto si vede tutta la baia.",
 m:"Biglietto adulti 7.090 kr online (circa 52 €), 7.490 kr alla cassa; bambini di 5–12 anni 5.090 kr. Il biglietto ha un orario d'ingresso scelto al momento dell'acquisto. Gli orari trovati non coincidono (sul sito ufficiale 10–18 con ultimo ingresso alle 17; altre fonti 9–21): prenota in anticipo e controlla perlan.is. Il ristorante è chiuso. Dal centro: autobus Strætó (la linea 18 ferma a Perlan: da controllare nell'app)."},
laugardal:{t:"Piscina geotermica di Laugardalslaug",z:"D",p:4,min:90,id:120,max:180,pos:[64.1437,-21.8745],q:"Laugardalslaug, Sundlaugavegur 30, Reykjavík",cls:"",multi:1,sun:1,
 win:function(){return[8*60,22*60]},
 d:"La piscina più grande della città, con vasche all'aperto d'acqua calda geotermica, uno scivolo e le vasche calde a 38–44 gradi: è il rito sociale degli islandesi. Dopo un giorno di vento e freddo è il modo migliore per scaldarsi.",
 m:"Aperta nei giorni feriali dalle 6:30 alle 22 e nel fine settimana dalle 8 alle 22 (sito del Comune). Il prezzo d'ingresso non l'ho letto: controlla su reykjavik.is. Prima di entrare in acqua bisogna fare la doccia senza costume, come richiedono le regole scritte all'ingresso; porta un asciugamano o noleggialo."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","tjorn",5,"walk","A piedi lungo Austurstræti fino alla piazza Austurvöllur, circa 5 minuti.","A piedi lungo Austurstræti fino a Lækjartorg, circa 5 minuti.",{f:[W([[64.1472,-21.9375],[64.1474,-21.9400]])],r:[W([[64.1474,-21.9400],[64.1472,-21.9375]])]});
P2("start","harpa",9,"walk","A piedi lungo Lækjargata e il porto fino a Harpa, circa 9 minuti.","A piedi lungo il porto e Lækjargata fino a Lækjartorg, circa 9 minuti.",{f:[W([[64.1472,-21.9375],[64.1490,-21.9360],[64.1503,-21.9330]])],r:[W([[64.1503,-21.9330],[64.1490,-21.9360],[64.1472,-21.9375]])]});
P2("start","laugavegur",7,"walk","A piedi lungo Bankastræti e Laugavegur, circa 7 minuti.","A piedi lungo Laugavegur e Bankastræti fino a Lækjartorg, circa 7 minuti.",{f:[W([[64.1472,-21.9375],[64.1464,-21.9340],[64.1456,-21.9300]])],r:[W([[64.1456,-21.9300],[64.1464,-21.9340],[64.1472,-21.9375]])]});
P2("start","hallgrim",14,"walk","A piedi lungo Bankastræti e Skólavörðustígur, in salita, fino alla chiesa, circa 14 minuti.","A piedi in discesa lungo Skólavörðustígur e Bankastræti fino a Lækjartorg, circa 14 minuti.",{f:[W([[64.1472,-21.9375],[64.1464,-21.9340],[64.1448,-21.9300],[64.1417,-21.9266]])],r:[W([[64.1417,-21.9266],[64.1448,-21.9300],[64.1464,-21.9340],[64.1472,-21.9375]])]});
P2("start","landnam",8,"walk","A piedi per Austurstræti e Aðalstræti fino alla Mostra dell'Insediamento, circa 8 minuti.","A piedi per Aðalstræti e Austurstræti fino a Lækjartorg, circa 8 minuti.",{f:[W([[64.1472,-21.9375],[64.1480,-21.9415],[64.1485,-21.9439]])],r:[W([[64.1485,-21.9439],[64.1480,-21.9415],[64.1472,-21.9375]])]});
P2("laugavegur","hallgrim",7,"walk","A piedi in salita lungo Skólavörðustígur fino alla chiesa, circa 7 minuti.","A piedi in discesa lungo Skólavörðustígur fino a Laugavegur, circa 7 minuti.",{f:[W([[64.1456,-21.9300],[64.1440,-21.9285],[64.1417,-21.9266]])],r:[W([[64.1417,-21.9266],[64.1440,-21.9285],[64.1456,-21.9300]])]});
P2("hallgrim","harpa",15,"walk","A piedi lungo Skólavörðustígur, Bankastræti e il porto fino a Harpa, circa 15 minuti.","A piedi in salita fino alla Hallgrímskirkja, circa 15 minuti.",{f:[W([[64.1417,-21.9266],[64.1448,-21.9300],[64.1464,-21.9340],[64.1490,-21.9360],[64.1503,-21.9330]])],r:[W([[64.1503,-21.9330],[64.1490,-21.9360],[64.1464,-21.9340],[64.1448,-21.9300],[64.1417,-21.9266]])]});
P2("hallgrim","tjorn",12,"walk","A piedi in discesa fino ad Austurvöllur, circa 12 minuti.","A piedi in salita fino alla Hallgrímskirkja, circa 12 minuti.",{f:[W([[64.1417,-21.9266],[64.1448,-21.9330],[64.1474,-21.9400]])],r:[W([[64.1474,-21.9400],[64.1448,-21.9330],[64.1417,-21.9266]])]});
P2("tjorn","landnam",5,"walk","A piedi per Aðalstræti fino alla Mostra dell'Insediamento, circa 5 minuti.","A piedi fino ad Austurvöllur, circa 5 minuti.",{f:[W([[64.1474,-21.9400],[64.1485,-21.9439]])],r:[W([[64.1485,-21.9439],[64.1474,-21.9400]])]});
P2("landnam","hafnarhus",7,"walk","A piedi per Tryggvagata fino all'Hafnarhús, circa 7 minuti.","A piedi per Tryggvagata fino alla Mostra dell'Insediamento, circa 7 minuti.",{f:[W([[64.1485,-21.9439],[64.1497,-21.9399]])],r:[W([[64.1497,-21.9399],[64.1485,-21.9439]])]});
P2("hafnarhus","harpa",6,"walk","A piedi lungo il porto fino a Harpa, circa 6 minuti.","A piedi lungo il porto fino all'Hafnarhús, circa 6 minuti.",{f:[W([[64.1497,-21.9399],[64.1503,-21.9330]])],r:[W([[64.1503,-21.9330],[64.1497,-21.9399]])]});
P2("landnam","hofn",8,"walk","A piedi per Mýrargata verso il porto vecchio, circa 8 minuti.","A piedi dal porto vecchio fino a Aðalstræti, circa 8 minuti.",{f:[W([[64.1485,-21.9439],[64.1518,-21.9437]])],r:[W([[64.1518,-21.9437],[64.1485,-21.9439]])]});
P2("harpa","hofn",12,"walk","A piedi lungo il lungomare fino al porto vecchio, circa 12 minuti.","A piedi lungo il lungomare fino a Harpa, circa 12 minuti.",{f:[W([[64.1503,-21.9330],[64.1510,-21.9390],[64.1518,-21.9437]])],r:[W([[64.1518,-21.9437],[64.1510,-21.9390],[64.1503,-21.9330]])]});
P2("start","thjod",18,"walk","A piedi passando per Austurstræti, Tjörnin e Suðurgata, circa 18 minuti.","A piedi per Suðurgata e Tjörnin fino a Lækjartorg, circa 18 minuti.",{f:[W([[64.1472,-21.9375],[64.1450,-21.9420],[64.1428,-21.9503]])],r:[W([[64.1428,-21.9503],[64.1450,-21.9420],[64.1472,-21.9375]])]});
P2("tjorn","thjod",13,"walk","A piedi lungo il Tjörnin e Suðurgata fino al museo, circa 13 minuti.","A piedi lungo il Tjörnin fino ad Austurvöllur, circa 13 minuti.",{f:[W([[64.1474,-21.9400],[64.1450,-21.9440],[64.1428,-21.9503]])],r:[W([[64.1428,-21.9503],[64.1450,-21.9440],[64.1474,-21.9400]])]});
P2("start","perlan",25,"metro","Autobus Strætó dal centro fino a Perlan, circa 20 minuti più l'attesa e la breve salita a piedi: controlla la linea nell'app Klappið.","Autobus Strætó da Perlan al centro, circa 20 minuti più l'attesa.",{f:[B([[64.1472,-21.9375],[64.1292,-21.9183]])],r:[B([[64.1292,-21.9183],[64.1472,-21.9375]])]});
P2("start","laugardal",28,"metro","Autobus Strætó dal centro fino a Laugardalslaug, circa 20–25 minuti più l'attesa: controlla la linea nell'app Klappið.","Autobus Strætó da Laugardalslaug al centro, circa 20–25 minuti più l'attesa.",{f:[B([[64.1472,-21.9375],[64.1437,-21.8745]])],r:[B([[64.1437,-21.8745],[64.1472,-21.9375]])]});
/* ritorno in aeroporto: a piedi o in bus fino a BSÍ e Flybus */
var RET={
KEF:{
 A:{min:90,txt:"A piedi (circa 25 minuti) o con l'autobus Strætó dal centro fino alla stazione BSÍ, poi Flybus per Keflavík (circa 45 minuti). Il Flybus parte circa 3 ore prima dei voli internazionali: guarda gli orari sul biglietto. In alternativa, con l'Airport Direct si può partire anche dall'albergo; il taxi costa 20.000–25.000 kr.",g:[W([[64.1472,-21.9375],[64.1440,-21.9400],[64.1382,-21.9434]]),["fb","BSÍ","Aeroporto"]]}},
RKV:{
 A:{min:35,txt:"A piedi dal centro (circa 30 minuti) o con un autobus Strætó o un taxi fino al terminal dei voli interni, vicino al Tjörnin.",g:[W([[64.1472,-21.9375],[64.1400,-21.9400],[64.1300,-21.9406]])]}}
};
var ARR={
KEF:[["fb","Aeroporto","BSÍ"],W([[64.1382,-21.9434],[64.1440,-21.9400],[64.1472,-21.9375]])],
RKV:[W([[64.1300,-21.9406],[64.1400,-21.9400],[64.1472,-21.9375]])]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
pylsur:{n:"Bæjarins Beztu Pylsur",a:"Tryggvagata 1",z:"A",pos:[64.1483,-21.9380],h:["09:00-01:00","09:00-01:00","09:00-01:00","09:00-02:00","09:00-06:00","09:00-06:00","09:00-01:00"],
 d:"Il chiosco di würstel più famoso d'Islanda, vicino al porto, aperto dal 1937: il piatto tipico è «eina með öllu», un hot dog con tutto, cioè cipolla cruda e fritta, ketchup, senape dolce e salsa remoulade. Si mangia in piedi sul marciapiede.",pr:"Un hot dog costava circa 500–600 kr (circa 4 €) in una guida, ma il prezzo è probabilmente salito (listino non visto). Orari da guide, da confermare."},
messinn:{n:"Messinn",a:"Lækjargata 6b",z:"A",pos:[64.1466,-21.9380],h:D7("11:30-15:00,17:00-22:00"),
 d:"Un ristorante di pesce vicino a Lækjartorg, noto per le padelle di pesce servite fumanti al tavolo: merluzzo, salmone o pesce del giorno con patate e burro. Locale piccolo, caldo e molto frequentato.",pr:"Fascia media-alta: un piatto di pesce sta di solito intorno ai 25–35 € (listino non visto). Orari da una scheda di maggio 2026, da confermare."},
svarta:{n:"Svarta Kaffið",a:"Laugavegur 54",z:"A",pos:[64.1451,-21.9290],h:["11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00","12:00-22:00"],
 d:"Un locale su Laugavegur che serve la zuppa dentro una pagnotta: la zuppa di renna o quella di erbe cremosa viene servita dentro una forma di pane appena sfornato. Porzioni abbondanti e locale accogliente, con opere di artisti locali.",pr:"Una zuppa nel pane costa di solito intorno ai 18–25 € (listino non visto). Orari da una scheda online, da confermare."},
mokka:{n:"Mokka Kaffi",a:"Skólavörðustígur 3a",z:"A",pos:[64.1472,-21.9330],h:D7("09:00-18:30"),
 d:"Il primo caffè di Reykjavík, aperto dal 1958, con le pareti tappezzate di quadri e un'atmosfera quieta; porta in Islanda l'espresso. È famoso per le sue torte e per la cioccolata calda.",pr:"Un caffè con una fetta di torta sta intorno ai 10–13 € (listino non visto). Orari da una guida, da confermare."},
sandholt:{n:"Sandholt",a:"Laugavegur 36",z:"A",pos:[64.1458,-21.9308],h:D7("07:30-18:00"),
 d:"Una panetteria storica di Reykjavík su Laugavegur: pane a lievitazione naturale, croissant e pasticcini al burro, fette di torta e colazioni calde. Si mangia ai tavolini o si porta via.",pr:"Un caffè e un croissant stanno intorno ai 8–10 €; una colazione completa sui 15 € (listino non visto). Orari da una guida, da confermare."},
loki:{n:"Café Loki",a:"Lokastígur 28",z:"B",pos:[64.1420,-21.9275],h:D7("08:00-22:00"),
 d:"Un caffè di cucina islandese tradizionale davanti alla Hallgrímskirkja: pane di segale cotto al vapore con pesce spappolato o con carne d'agnello affumicata, e un gelato al pane di segale. Una scelta onesta per provare i sapori locali a prezzi non folli.",pr:"Un piatto tipico sta intorno ai 14–20 € (listino non visto). Orari da una guida, da confermare."},
roasters:{n:"Reykjavík Roasters",a:"Kárastígur 1",z:"B",pos:[64.1445,-21.9262],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","09:00-17:00","09:00-17:00"],
 d:"Un piccolo torrefattore con il caffè tostato sul posto, a due passi dalla Hallgrímskirkja: tavoli comuni, buon caffè filtro e pasticcini. Spesso pieno.",pr:"Un caffè sta intorno ai 4–6 € e un dolce ai 5–7 € (listino non visto). Orari da una guida del 2020, da confermare."},
thrir:{n:"Þrír Frakkar",a:"Baldursgata 14",z:"B",pos:[64.1420,-21.9310],h:["11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00","18:00-22:00","18:00-22:00"],
 d:"Un ristorante a conduzione familiare dal 1989, specializzato nel pesce: merluzzo, nasello e specialità islandesi come lo stoccafisso, con alcuni piatti di balena e uccelli marini che si possono evitare. Ha un menù a pranzo più economico, nei giorni feriali.",pr:"Fascia media: un piatto principale sta intorno ai 25–35 €; il pranzo costa meno (listino non visto). Orari dal sito di Visit Reykjavík, da confermare."},
haiti:{n:"Café Haiti",a:"Geirsgata 7b",z:"C",pos:[64.1508,-21.9425],h:["06:00-18:00","06:00-20:00","06:00-20:00","06:00-20:00","06:00-21:00","07:00-21:00","07:00-18:00"],
 d:"Un caffè con una cucina haitiana ed etiope al porto vecchio: caffè filtrato fresco, stufati e zuppa di pesce, in un ambiente caldo e colorato. Si apre presto la mattina.",pr:"Un caffè e un dolce sono circa 8–10 €; un piatto caldo 15–20 € (listino non visto). Orari da una scheda online, da confermare."},
kaffivagninn:{n:"Kaffivagninn",a:"Grandagarður 10",z:"C",pos:[64.1540,-21.9490],h:["07:30-21:00","07:30-21:00","07:30-21:00","07:30-21:00","07:30-21:00","09:00-21:00","09:00-21:00"],
 d:"Il caffè dei pescatori del porto, aperto dal 1935: colazione abbondante, zuppa di pesce e piatti di casa a prezzi popolari, frequentato da operai e pescatori.",pr:"Una colazione intorno ai 12–16 € e un pasto caldo sui 15–25 € (listino non visto). Orari da una guida, da confermare."},
hlemmur:{n:"Hlemmur Mathöll",a:"Laugavegur 107",z:"D",pos:[64.1431,-21.9144],h:D7("11:00-23:00"),
 d:"Il primo mercato coperto di cibo di Reykjavík, in una ex stazione degli autobus: una dozzina di banconi con agnello, pizza napoletana, ramen, panini e un bar a un'estremità. Si prende da mangiare e ci si siede ai tavoli comuni.",pr:"Un pasto da banco sta intorno ai 14–22 € (listino non visto). Orari da una scheda online, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["sandholt","mokka"],B:["roasters","loki"],C:["haiti","kaffivagninn"],D:["sandholt","roasters"]},
pra:{A:["pylsur","svarta","messinn"],B:["loki","thrir"],C:["kaffivagninn","haiti"],D:["hlemmur","svarta"]},
cen:{A:["svarta","messinn","pylsur"],B:["thrir","loki"],C:["kaffivagninn","messinn"],D:["hlemmur","svarta"]},
snk:{A:["pylsur","mokka","sandholt"],B:["roasters","loki"],C:["haiti","kaffivagninn"],D:["hlemmur","roasters"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"chiesa",t:"Hallgrímskirkja e Laugavegur",acts:["hallgrim","laugavegur"],need:150,core:1},
{id:"mare",t:"Harpa, Hafnarhús e Porto Vecchio",acts:["harpa","hafnarhus","hofn"],need:200,core:1},
{id:"storia",t:"Austurvöllur, Insediamento e Museo Nazionale",acts:["tjorn","landnam","thjod"],need:270,core:1},
{id:"perlan",t:"Perlan e la piscina di Laugardalslaug",acts:["perlan","laugardal"],need:240}
];
var ORDER=["hallgrim","harpa","laugavegur","tjorn","landnam","hofn","hafnarhus","thjod","perlan","laugardal"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["mid","Miðborg (centro, Laugavegur)",[64.1466,-21.9340],"A"],
["thin","Þingholt / Skólavörðuholt (Hallgrímskirkja)",[64.1425,-21.9270],"B"],
["vest","Porto Vecchio / Grandi / Vesturbær",[64.1520,-21.9500],"C"],
["hlem","Hlemmur / Borgartún / Laugardalur",[64.1440,-21.9150],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[64.1466,-21.9340],""]
];
/* imposta di soggiorno: 800 kr per camera a notte (circa 5,90 €), qui stimata per due persone per camera */
var TAX=[["h5","Hotel 4–5 stelle",2.9],["h3","Hotel fino a 3 stelle, B&B o appartamento",2.9],["host","Ostello o struttura economica",2.9],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Skyr með berjum","yogurt islandese denso con frutti di bosco e un cucchiaio di miele."],["Kleinur og kaffi","ciambelle fritte e speziate con un caffè."],["Brauð með osti og skinku","pane con formaggio e prosciutto, come colazione calda."]],
pra:[["Pylsa með öllu","l'hot dog islandese con tutto: cipolla cruda e fritta, ketchup, senape dolce e remoulade."],["Kjötsúpa","zuppa di agnello con verdure, il piatto caldo più comune nei bar."],["Súpa í brauði","zuppa servita dentro una pagnotta."],["Plokkfiskur","un purè di pesce con patate e besciamella, sul pane di segale."]],
cen:[["Plokkfiskur","purè di pesce e patate, cucina di casa islandese."],["Fiskur dagsins","il pesce del giorno, di solito merluzzo o salmone alla piastra."],["Íslenskt lambakjöt","agnello islandese, tenero e saporito, allevato libero."],["Skyr með rjóma","il dessert tipico: skyr con panna e frutti di bosco."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","La Hallgrímskirkja","Foto","La facciata di cemento con la torre e la statua di Leif Eriksson, soprattutto con la luce bassa del tramonto.",[64.1417,-21.9266],"Hallgrímskirkja, Reykjavík","hallgrim"],
["📷","Vista dalla torre","Foto","Dalla torre si vedono i tetti colorati, il mare, il monte Esja e le montagne dall'altra parte della baia.",[64.1417,-21.9266],"Hallgrímskirkja, Reykjavík","hallgrim"],
["🤳","La scalinata arcobaleno","Selfie","Skólavörðustígur dipinta con i colori dell'arcobaleno, con la chiesa sullo sfondo in cima alla via.",[64.1442,-21.9285],"Skólavörðustígur, Reykjavík","laugavegur"],
["📷","Il Sólfar","Foto","La scultura a forma di nave vichinga sul lungomare, con il mare e il monte Esja sullo sfondo, soprattutto al tramonto.",[64.1476,-21.9220],"Sólfar Sun Voyager, Reykjavík","harpa"],
["📷","La facciata di Harpa","Foto","I cristalli di vetro della facciata cambiano colore con la luce e riflettono il cielo.",[64.1503,-21.9330],"Harpa Reykjavík","harpa"],
["📷","Il lago Tjörnin","Foto","Le case colorate e il Municipio riflessi nell'acqua del laghetto, con i cigni in primo piano.",[64.1437,-21.9427],"Tjörnin, Reykjavík","tjorn"],
["📷","Il Parlamento","Foto","L'edificio grigio dell'Alþingi di fronte alla piazza Austurvöllur.",[64.1477,-21.9395],"Alþingi, Reykjavík","tjorn"],
["📷","Il porto vecchio","Foto","Le barche da pesca ormeggiate e i capannoni rossi e blu, con le montagne sullo sfondo.",[64.1518,-21.9437],"Reykjavík Old Harbour","hofn"],
["🤳","Il Perlan al tramonto","Selfie","La cupola di vetro sulla collina e la città sotto, con il sole basso di ottobre.",[64.1292,-21.9183],"Perlan, Reykjavík","perlan"],
["📷","La baia dalla terrazza del Perlan","Foto","La baia, il centro e i monti all'orizzonte vengono fuori bene con il cielo limpido.",[64.1292,-21.9183],"Perlan, Reykjavík","perlan"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-12-31",t:"Vulcani sulla penisola di Reykjanes: controlla prima di partire",x:"Da dicembre 2023 la zona di Grindavík e della Laguna Blu ha avuto nove eruzioni; l'ultima che ho trovato è di luglio-agosto 2025. Le eruzioni sono di lava, senza nuvole di cenere, e l'aeroporto di Keflavík e la città sono rimasti aperti. Non ho potuto verificare lo stato attuale: nei giorni prima controllate vedur.is, road.is e il sito della Laguna Blu, che chiude temporaneamente durante le eruzioni."},
{from:"2026-10-13",to:"2027-03-31",t:"Giornate corte e tempo variabile",x:"A ottobre il sole sorge verso le 8 e tramonta verso le 18; a dicembre le ore di luce sono circa 4. Il vento e la pioggia sono frequenti e i venti forti possono fermare gli autobus per l'aeroporto: controlla le allerte su vedur.is e safetravel.is. Con il cielo limpido e notti scure si possono vedere le aurore boreali."},
{from:"2026-12-20",to:"2027-01-02",t:"Natale e Capodanno: musei e negozi chiusi",x:"Il 24 e il 25 dicembre e il 1° gennaio la Hallgrímskirkja e la torre sono chiuse tranne che per le funzioni; la Mostra dell'Insediamento chiude il 24, 25 e 26 dicembre e il 31 dicembre e il 1° gennaio; l'Hafnarhús chiude il 24, 25 e 31 dicembre e il 1° gennaio, e il 26 dicembre apre dalle 13. Molti negozi e ristoranti restano chiusi il 24 sera, il 25 e il 1° gennaio."}
];
/* clima medio di Reykjavík (indicativo, massime/minime) */
var CLIM=[[2,-3],[3,-2],[4,-1],[6,1],[9,4],[12,7],[14,9],[14,8],[11,6],[7,3],[4,0],[2,-2]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Reykjavík: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="hallgrim"&&WD===6)meta+=" Oggi è domenica: la chiesa e la torre chiudono di solito dalle 10:30 alle 12:30 per la messa.";
if(it.id==="hafnarhus"&&WD===3)meta+=" Oggi è giovedì: l'Hafnarhús resta aperto fino alle 22.";
if(it.id==="laugardal"&&(WD===5||WD===6))meta+=" Nel fine settimana la piscina apre alle 8, non alle 6:30.";
return meta}
Object.assign(C,{id:"reykjavik",n:"Reykjavík",cn:"Islanda",e:"🌋",flag:"🇮🇸",col:["#1f3a6b","#c8102e","#8fb8d6"],k:"reykjavik islanda iceland",
TZ:"Atlantic/Reykjavik",LL:[64.1466,-21.9426],CC:"is",QN:"Reykjavik",BK:"Reykjavik",ARE:/reykjav|\b10[1-9]\b|\b1[1-2][0-9]\b ?reykjav/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"is-IS",LANGN:"islandese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"ISK",s:"kr",e:1/136.2},hub:{n:"Lækjartorg",q:"Lækjartorg, Reykjavík"},
SINGLE:{acts:["hallgrim","laugavegur","tjorn","harpa","landnam"],ins:[]},
EXCL:[],
DICON:{hallgrim:"⛪",harpa:"🎶",laugavegur:"🌈",tjorn:"🦢",landnam:"⚔️",hofn:"⚓",hafnarhus:"🎨",thjod:"🏺",perlan:"🌋",laugardal:"♨️"},
ZN:{A:"in centro",B:"a Skólavörðuholt",C:"al Porto Vecchio e a Grandi",D:"a Hlemmur e verso est"},
NEAR:{col:"caffè o panetteria",pra:"zuppa o locale veloce",cen:"locale",snk:"caffè o chiosco"},
SE:{pylsur:"🌭",messinn:"🐟",svarta:"🍲",mokka:"☕",sandholt:"🥐",loki:"🍞",roasters:"☕",thrir:"🐟",haiti:"☕",kaffivagninn:"🍳",hlemmur:"🍕"},
TR:{one:5.1,cap:15.2,lbl:"Autobus Strætó (app Klappið)",
 air:{KEF:{one:29.4,n:"Flybus per BSÍ (circa 3.999 kr)"},RKV:{one:5.1,n:"Autobus Strætó (circa 690 kr)"}},
 passes:[],
 note:"Prezzi di ottobre 2026, convertiti a 1 € = 136,2 corone (kr): la corsa singola in autobus Strætó a Reykjavík costava 670 kr e, secondo il consiglio di amministrazione, dal 1° gennaio 2026 è salita del 3–3,4%, quindi circa 690 kr (circa 5,10 €); il prezzo esatto non l'ho letto sul sito. Con la app Klappið (o la carta Klapp) il massimale è automatico: dopo tre corse singole in un giorno il resto del giorno è gratis, e dopo nove in una settimana il resto della settimana. I biglietti da 24 e 72 ore non si vendono più. I bambini fino a 11 anni viaggiano gratis. Il centro si gira a piedi: l'autobus serve solo per Perlan e la piscina. Aeroporto: Flybus circa 3.999 kr (circa 29 €), Airport Direct 3.500–4.500 kr, autobus 55 circa 2.280 kr, tutti da guide e da siti di prenotazione: da confermare."},
FOOD:{co:[9,"Colazione al caffè"],pr:[14,"Pranzo (zuppa, hot dog o panino)"],ce:[28,"Cena (pesce o cucina islandese)"],sp:[6,"Spuntini e dolci"]},
T:{ride:"In autobus",move:"quasi tutto a piedi, a volte in autobus",bags:"«Má ég skilja töskurnar mínar hér?»",bagsPM:"«Má ég skilja töskurnar mínar hér til síðdegis?»",bagsAM:"«Má ég skilja töskurnar mínar hér til hádegis?»",
pra:"Una zuppa o un locale veloce",praZ:{A:"Su Laugavegur e intorno a Lækjartorg i ristoranti con il menù fuori sono cari e poco autentici: per un pasto veloce vai in un bar con la zuppa del giorno o nel mercato coperto di Hlemmur.",C:"Al porto vecchio i ristoranti di pesce sono cari: per risparmiare scegli una zuppa o un piatto del giorno nei locali dei pescatori."},
freeLong:"Qualche idea: un bagno in una piscina geotermica (da fare al rientro), un caffè nei locali di Laugavegur, una passeggiata sul lungomare fino al Sólfar o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata sul lungomare.",
remind:"A Reykjavík fa buio presto e il vento è forte: porta un giaccone antivento e guanti. Nei musei e al Perlan i biglietti si comprano online, con l'orario d'ingresso.",
rain1:"Al coperto: il Museo Nazionale, la Mostra dell'Insediamento, l'Hafnarhús, Harpa, il Perlan e le piscine geotermiche.",
rainM:"Al coperto: Museo Nazionale, Mostra dell'Insediamento, Hafnarhús, Harpa, Perlan e le piscine geotermiche.",
water:"Riempite la borraccia: l'acqua del rubinetto islandese è tra le più pure del mondo e arriva fredda dalle sorgenti. Attivate «Acqua» sulla mappa per le fontanelle più vicine; l'acqua calda dal rubinetto può avere odore di zolfo, ma è sicura.",
kitchen:"A Reykjavík si pranza tra le 11:30 e le 14 e si cena presto, dalle 18: molte cucine chiudono alle 21–22, e nei giorni feriali alcuni ristoranti aprono solo la sera.",
night:[["♨️","Un bagno in una piscina geotermica è il modo islandese di chiudere la giornata: sono aperte fino alle 22."],["🌌","In autunno e in inverno, con il cielo limpido, si possono vedere le aurore boreali: cerca un posto lontano dalle luci, ad esempio sul lungomare verso ovest, e controlla le previsioni su vedur.is."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Reykjavík è un'ora indietro rispetto all'Italia in inverno e due ore in estate, quando in Italia c'è l'ora legale",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per locali popolari: l'Islanda è uno dei paesi più cari d'Europa. Una colazione sta intorno ai 9–15 €, un pranzo veloce intorno ai 14–20 € e una cena con un piatto principale intorno ai 25–35 €. Si paga quasi sempre con la carta, anche un caffè. Le corone sono convertite a 1 € = 136,2 kr.",
taxNote:"L'imposta sul pernottamento è di 800 kr (circa 5,90 €) per camera a notte negli alberghi e nelle strutture autorizzate. È spesso già compresa nel prezzo dell'annuncio: controlla se la struttura la fa pagare a parte. La stima nel viaggio la divide per due persone per camera.",
mcrit:"Criteri: locali non di catena, caffè, panetterie, zuppe e cucina islandese, con prezzi non troppo alti per l'Islanda. Gli orari sono quelli di guide e schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima. Le valutazioni di Google non le ho verificate."},
fx:{meta:meta},
AIRTIPS:["Dall'Italia i voli diretti per Keflavík sono pochi, soprattutto in autunno e in inverno: spesso c'è uno scalo in un'altra capitale europea. Controlla gli orari dei voli prima di prenotare l'alloggio.","💧 Passa i controlli con la borraccia vuota e riempila dopo: l'acqua islandese è ottima e gratuita."],
CHECK:[["tk","Biglietto del Flybus (circa 3.999 kr) dall'aeroporto Keflavík: si compra online o allo sportello, e si scarica l'app Klappið per gli autobus urbani",function(E){return true}],["han","Hallgrímskirkja: la torre si paga nel negozio della chiesa (1.500 kr), senza prenotazione",["hallgrim"]],["per","Biglietto del Perlan con orario d'ingresso (7.090 kr online)",["perlan"]],["mus","Biglietto del Museo Nazionale (3.300 kr)",["thjod"]],["pool","Costume da bagno e asciugamano per la piscina (o noleggio), e flip-flop",["laugardal"]],["card","Carta d'identità o passaporto in corso di validità"],["jacket","Giaccone antivento e guanti: il vento e il freddo sono forti anche con il sole"]],
NUM:{1:["einn","eidn"],2:["tvo","tvo"],3:["þrjá","thrau"],4:["fjóra","FYOU-ra"],5:["fimm","fim"],6:["sex","seks"],7:["sjö","syö"],8:["átta","AU-ta"],9:["níu","NI-u"],10:["tíu","TI-u"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Góðan daginn / Gott kvöld","GOU-than DAI-in / got KVEUL"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Borð fyrir "+nu[0]+", takk","bor-th FI-rir "+nu[1]+", tak"],["Un caffè e una fetta di torta, per favore","Einn kaffi og eina kökusneið, takk","eidn KA-fi o EI-na KÖ-ku-sneith, tak"],["Acqua del rubinetto, per favore","Kranavatn, takk","KRA-na-vatn, tak"],["Il conto, per favore","Get ég fengið reikninginn?","get yeg FEN-gith REIK-nin-gin"],["Posso pagare con la carta?","Get ég borgað með korti?","get yeg BOR-gath meth KOR-ti"],["Quanto costa?","Hvað kostar þetta?","kvath KOS-tar THET-ta"],["Dov'è la fermata dell'autobus?","Hvar er strætóstoppistöðin?","kvar er STRAI-tou-stop-pi-stö-thin"],["Qual è l'autobus per l'aeroporto?","Hvaða strætó fer á flugvöllinn?","KVA-tha STRAI-tou fer au FLUG-vöt-lin"]];
if(M)fr=fr.concat([["Ho una prenotazione","Ég er með bókun","yeg er meth BOU-kun"],["Posso lasciare i bagagli?","Má ég skilja töskurnar mínar hér?","mau yeg SKIL-ya TÖS-kur-nar MI-nar hyer"],["A che ora è il check-out?","Klukkan hvað er útskráning?","KLUK-kan kvath er UT-skrau-ning"]]);
return fr.concat([["Mi scusi","Afsakið","AF-sa-kith"],["Grazie mille!","Kærar þakkir!","KAI-rar THAK-kir"]])},
taxTxt:function(tx){return "Imposta sul pernottamento in Islanda: "+(tx[2]?"800 kr (circa 5,90 €) per camera a notte, qui stimata in circa "+String(tx[2]).replace(".",",")+" € a notte per persona con due ospiti per camera ("+tx[1].toLowerCase()+")":"non si paga se sei ospite di amici o parenti")+". Spesso è già compresa nel prezzo che trovi sull'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["Il centro (Miðborg) è piccolo: quasi tutto si raggiunge a piedi. L'autobus Strætó serve per Perlan, la piscina di Laugardalslaug e i quartieri più lontani; di notte i bus non girano e si va a piedi o in taxi."],
ZONES:[
["🚌 Autobus e biglietti",["Si paga con l'app Klappið o con la carta Klapp: una corsa costa circa 690 kr (circa 5 €). Il resto del giorno è gratis dopo tre corse, per il massimale automatico.","I bambini fino a 11 anni viaggiano gratis. I biglietti da 24 e 72 ore non si vendono più.","Il centro si gira a piedi: Hallgrímskirkja, Harpa e il porto sono a 10–15 minuti l'uno dall'altro.","Da Keflavík il Flybus arriva alla stazione BSÍ, a 25 minuti a piedi dal centro."]],
["⛪ Centro: Hallgrímskirkja e Laugavegur",["Dalla Hallgrímskirkja si scende a piedi lungo Skólavörðustígur, la via arcobaleno, fino a Laugavegur.","La torre della chiesa si visita senza prenotare, ma chiude intorno alle 16:45 in questa stagione.","La domenica la chiesa chiude per la messa circa dalle 10:30 alle 12:30."],["hallgrim","laugavegur"]],
["🎶 Il lungomare: Harpa e il porto",["Da Lækjartorg a Harpa si cammina in 9 minuti; il Sólfar è poco più a est sul lungomare.","L'atrio di Harpa è gratuito: è un buon posto per scaldarsi con un caffè.","Nel porto vecchio partono le escursioni per vedere le balene: prenota con il tempo buono."],["harpa","hofn","hafnarhus"]],
["🌋 Perlan e la piscina",["Perlan è su una collina sopra la città: l'autobus è il modo più semplice, oppure a piedi si sale con una bella passeggiata.","La piscina di Laugardalslaug è un'esperienza tipica: ricorda di farti la doccia senza costume prima di entrare.","Le piscine sono aperte fino alle 22 e sono economiche rispetto ad altre attività."],["perlan","laugardal"]],
["🌊 Un giorno fuori da Reykjavík",["Il Circolo d'Oro (Þingvellir, Geysir e la cascata Gullfoss) si fa in una giornata con un tour o con un'auto a noleggio.","La Laguna Blu si trova vicino all'aeroporto, ma può chiudere durante le eruzioni: controlla lo stato prima di prenotare.","Per le aurore boreali ci sono tour serali da settembre ad aprile; dipendono dal cielo e non sono garantiti."]]],
WTIPS:["L'acqua del rubinetto islandese è tra le migliori d'Europa: puoi chiederla in ogni locale («Kranavatn, takk») e riempire la borraccia ovunque.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap (in autunno e in inverno alcune sono chiuse per il gelo).","Molti caffè riempiono la borraccia se lo chiedi gentilmente.","L'acqua calda dal rubinetto ha un odore di zolfo, perché è geotermica: è normale e non fa male."],
GEN:["L'Islanda usa la corona islandese (kr) e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Reykjavík è un'ora indietro rispetto all'Italia in inverno e due ore in estate, perché l'Islanda non cambia l'ora.","Si paga quasi tutto con la carta, anche un caffè; i contanti servono quasi mai.","La mancia non è usata: il servizio è già compreso nel prezzo e lasciare soldi in più non è necessario.","Prima di entrare in una piscina bisogna lavarsi senza costume: è obbligatorio e le regole sono scritte.","Il tempo cambia in fretta e il vento è forte: vestiti a strati e porta un giaccone impermeabile e antivento.","Controlla orari e prezzi di musei e locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚌 Autobus Strætó e oggetti smarriti: <a href="https://www.straeto.is/" target="_blank" rel="noopener">straeto.is</a> · sicurezza e meteo: <a href="https://safetravel.is/" target="_blank" rel="noopener">safetravel.is</a> e <a href="https://en.vedur.is/" target="_blank" rel="noopener">vedur.is</a>.</li><li>🇮🇹 L\'ambasciata d\'Italia a Oslo è competente anche per l\'Islanda: <a href="https://amboslo.esteri.it" target="_blank" rel="noopener">amboslo.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti dell\'Islanda. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.straeto.is/" target="_blank" rel="noopener">straeto.is</a> e, per l\'aeroporto di Keflavík, <a href="https://www.isavia.is/en/keflavik-airport" target="_blank" rel="noopener">isavia.is</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V84 L40 56 L70 74 L104 44 L142 72 L176 62 L200 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M20 106 V62 H44 V106 Z M16 62 H48 L32 40 Z M31 40 V18 H33 V40 Z M12 106 H52 V100 H12 Z"/></g>'+
'<g style="--k:2"><path d="M86 106 V44 H96 V106 Z M96 106 V36 H106 V106 Z M106 106 V28 H116 V106 Z M116 106 V36 H126 V106 Z M126 106 V44 H136 V106 Z M84 106 H138 V102 H84 Z"/></g>'+
'<g style="--k:3"><path d="M158 106 V66 H196 V106 Z M162 66 L177 50 L192 66 Z M174 50 V34 H180 V50 Z"/></g>'+
'<g style="--k:4"><path d="M222 106 V58 Q224 36 262 30 Q300 36 302 58 V106 Z M242 106 V84 H282 V106 Z M262 30 V18 H264 V30 Z"/></g>'+
'<g style="--k:5"><path d="M324 106 V82 H388 V106 Z M332 82 L356 60 L380 82 Z M352 60 V46 H360 V60 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M92 90 v16 M112 90 v16 M132 90 v16"/><path d="M332 94 h50 M332 100 h50"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="14" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.reykjavik);

;var n=window.CITIES["reykjavik"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["reykjavik"]);
