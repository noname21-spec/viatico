(function(o){
/* ===== Napoli (dati verificati il 13 ottobre 2026) ===== */
/* Fonti ufficiali lette: cultura.gov.it (MANN, Palazzo Reale, Certosa di San Martino). Da guide recenti (agosto 2026) e da confermare:
   Cappella Sansevero, Duomo, Santa Chiara, Castel Nuovo, Castel dell'Ovo, Pio Monte, Napoli Sotterranea, Alibus, taxi, biglietti ANM.
   Locali: orari, prezzi e valutazioni NON letti sui siti dei locali (ricerca web esaurita): da confermare. */
window.CITIES=window.CITIES||{};
CITIES.napoli=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
NAP:{n:"Capodichino",s:"Napoli-Capodichino",url:"https://www.aeroportodinapoli.it/",live:"Napoli",inMin:55,buf:100,pos:[40.8860,14.2908],sd:"Capodichino · Alibus",rt:"Dall'aeroporto: Alibus diretto fino a Piazza Garibaldi (Stazione Centrale).",
 arr:"All'aeroporto di Napoli arrivano tutti i voli dall'Italia: è l'unico aeroporto della città e si trova a circa 6 km dal centro. Dopo il ritiro bagagli esci dal terminal: la fermata dell'Alibus è proprio fuori. L'Alibus arriva a Piazza Garibaldi (Stazione Centrale) in 20–30 minuti, poi prosegue per Piazza Municipio e il porto (Molo Beverello) in 35–40 minuti: una corsa ogni 15–25 minuti circa, dalle 6 alle 23:30 circa. La metropolitana non arriva ancora all'aeroporto: la stazione Capodichino della Linea 1 è quasi finita, ma l'apertura è attesa solo nel 2027.",
 tk:"Biglietto Alibus: 5 € a corsa, valido 90 minuti dalla convalida (su questo bus non vale il biglietto urbano normale). Lo trovi alle macchinette in aeroporto, in tabaccheria e nell'app ANM; a bordo si paga con un sovrapprezzo. Prezzo e orari da guide recenti, da controllare su anm.it.",
 gm:"Aeroporto di Napoli Capodichino",
 tips:["Taxi con tariffa fissa per tutta l'auto, bagagli compresi: 21 € fino alla Stazione Centrale, a Capodimonte e al centro storico, 24 € fino a Piazza Municipio, al porto, al teatro San Carlo e al Museo Archeologico (tariffa del Comune da guide 2026, da confermare). Chiedi la tariffa fissa prima di salire e non seguire chi ti avvicina nel terminal.","I bus di linea ANM costano 1,50 € a corsa ma sono più lenti e meno diretti dell'Alibus: controlla la linea sull'app ANM.","Non c'è un collegamento diretto in treno con l'aeroporto: dalla Stazione Centrale partono i treni per Pompei, Ercolano e Salerno, ma servono per le gite fuori città.","In alternativa all'Alibus, in 3–4 persone un taxi a tariffa fissa può costare quanto i biglietti."]}
};
/* linee (tracciati indicativi) */
var SEG={
ali:{c:"#2e8b57",n:"Alibus",p:[[40.8860,14.2908,"Aeroporto di Capodichino",2],[40.8790,14.2850],[40.8650,14.2790],[40.8529,14.2716,"Piazza Garibaldi",2],[40.8490,14.2650],[40.8430,14.2585],[40.8386,14.2527,"Piazza Municipio",2]]},
l1:{c:"#e8a317",n:"Metro Linea 1",p:[[40.8529,14.2716,"Garibaldi",2],[40.8492,14.2622,"Duomo",2],[40.8445,14.2573,"Università",2],[40.8397,14.2535,"Municipio",2],[40.8393,14.2493,"Toledo",2],[40.8497,14.2510,"Dante",2],[40.8530,14.2505,"Museo",2]]}
};
var START=[40.8527,14.2718];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti; cl = giorni di chiusura (0 = lunedì) */
var STOPS={
spaccanapoli:{t:"Spaccanapoli e San Gregorio Armeno",z:"A",p:1,min:40,id:60,max:100,pos:[40.8497,14.2574],q:"Via San Gregorio Armeno, Napoli",cls:"walk",
 d:"Spaccanapoli è la strada diritta che taglia in due il centro antico, tra palazzi, chiese e panni stesi. Una traversa, Via San Gregorio Armeno, è la via dei presepi: le botteghe vendono statuine di pastori, santi e personaggi famosi, da regalare o da guardare.",
 m:"Si cammina gratis. Le botteghe dei presepi sono aperte tutto l'anno, ma da metà novembre al 6 gennaio la via è piena di gente. Attenzione ai motorini che passano stretti e ai borseggiatori nella folla."},
sansevero:{t:"Cappella Sansevero e il Cristo Velato",z:"A",p:1,min:30,id:40,max:60,pos:[40.8484,14.2554],q:"Cappella Sansevero, Napoli",cls:"",cl:[1],tk:[12,"Cappella Sansevero (12 €)",1,1],
 win:function(wd){return wd===1?[0,0]:[9*60,18*60+30]},
 d:"Una piccola cappella del Settecento con un capolavoro: il Cristo Velato, una statua di marmo con un velo così sottile che sembra di stoffa vera. Intorno ci sono altre sculture e, sotto, le due «macchine anatomiche».",
 m:"Biglietto intero 12 € (ridotto 8 € per 18–26 anni, 6 € per 10–17), ingressi a numero chiuso: prenota online su museosansevero.it. Aperta 9–19 (ultimo ingresso 30 minuti prima), chiusa il martedì; in estate apre a volte anche di martedì. Dentro non si fotografa. Prezzi e orari da una guida di agosto 2026: da confermare."},
santachiara:{t:"Santa Chiara e il chiostro maiolicato",z:"A",p:3,min:30,id:45,max:70,pos:[40.8468,14.2531],q:"Complesso Monumentale di Santa Chiara, Napoli",cls:"",tk:[7,"Chiostro di Santa Chiara (7 €)",1],
 win:function(wd){return wd===6?[10*60,13*60+30]:[9*60+30,16*60+30]},
 d:"Una grande basilica gotica con un chiostro nascosto: un giardino con 72 pilastri e panche coperti di maioliche dipinte con scene di campagna e di vita napoletana. È il posto più tranquillo del centro.",
 m:"Chiostro e museo 7 € (ridotto 5 €), aperti lunedì–sabato 9:30–17 e domenica 10–14, ultimo ingresso 30 minuti prima. La basilica è gratuita, aperta 7:45–12:45 e 16:40–20 (orari da una guida di agosto 2026, da confermare)."},
piomonte:{t:"Pio Monte della Misericordia e Caravaggio",z:"A",p:4,min:25,id:35,max:50,pos:[40.8510,14.2590],q:"Pio Monte della Misericordia, Napoli",cls:"",multi:1,tk:[10,"Pio Monte della Misericordia (10 €)",1],
 win:function(wd){return wd===6?[9*60,14*60]:[10*60,17*60+30]},
 d:"In una piccola chiesa ottagonale c'è «Le sette opere di Misericordia», il grande dipinto che Caravaggio fece a Napoli nel 1607, dove le buone azioni sono mostrate come scene di strada. Nella pinacoteca al piano di sopra ci sono altri quadri del Seicento.",
 m:"Biglietto 10 € (ridotto 8 €), aperto lunedì–sabato 10–18 e domenica 9–14:30. Orari e prezzo da una scheda online, da confermare."},
duomo:{t:"Duomo e Cappella di San Gennaro",z:"A",p:2,min:35,id:50,max:80,pos:[40.8529,14.2594],q:"Duomo di Napoli",cls:"",
 win:function(){return[9*60+30,17*60]},
 d:"La cattedrale dedicata al santo patrono di Napoli, San Gennaro. Nella cappella del Tesoro, con affreschi e argenti, si conserva l'ampolla con il suo sangue, che tre volte all'anno si scioglie davanti ai fedeli. Sul lato c'è la basilica più antica di Santa Restituta, con un museo.",
 m:"Secondo una guida di agosto 2026 il Duomo è aperto ogni giorno 9:30–17 con visite a orari fissi, a ingresso gratuito ma su prenotazione; la Cappella del Tesoro ha ingresso libero con pause a mezzogiorno; il Museo del Tesoro costa 15 € con audioguida (9:30–18, ultimo ingresso 17). Orari e regole da confermare sul sito della Diocesi."},
mann:{t:"Museo Archeologico Nazionale",z:"A",p:1,min:60,id:90,max:150,pos:[40.8531,14.2504],q:"Museo Archeologico Nazionale, Napoli",cls:"",cl:[1],tk:[20,"Museo Archeologico Nazionale (20 €)",1],
 win:function(wd){return wd===1?[0,0]:[9*60,19*60]},
 d:"Uno dei più importanti musei archeologici del mondo. Conserva i mosaici, gli affreschi e gli oggetti di Pompei ed Ercolano, il Mosaico di Alessandro, le statue colossali della collezione Farnese, come l'Ercole e il Toro Farnese, e il «Gabinetto segreto» con le opere erotiche degli antichi.",
 m:"Biglietto intero 20 € (ridotto 2 € per 18–25 anni dell'UE, gratis sotto i 18 anni): lo trovi sul sito ufficiale cultura.gov.it. Aperto 9–19:30, biglietteria fino alle 18:30, chiuso il martedì. La prima domenica del mese l'ingresso è gratuito, ma c'è molta gente. Dati dal sito del Ministero della Cultura."},
plebiscito:{t:"Piazza del Plebiscito e Galleria Umberto I",z:"B",p:2,min:25,id:40,max:70,pos:[40.8358,14.2487],q:"Piazza del Plebiscito, Napoli",cls:"walk",sun:1,
 d:"La piazza più grande di Napoli, chiusa da un colonnato semicircolare con la chiesa di San Francesco di Paola, di fronte al Palazzo Reale. Poco più in là ci sono il Teatro San Carlo, tra i più antichi d'Europa, e la Galleria Umberto I, un'elegante galleria con una cupola di ferro e vetro.",
 m:"Piazza e galleria sono sempre accessibili e gratuite. Dentro la Galleria ci sono negozi e caffè, e vicino c'è il Gran Caffè Gambrinus, caffè storico dal 1860."},
reale:{t:"Palazzo Reale",z:"B",p:3,min:60,id:90,max:120,pos:[40.8359,14.2488],q:"Palazzo Reale, Napoli",cls:"",multi:1,cl:[2],tk:[15,"Palazzo Reale (15 €)",1],
 win:function(wd){return wd===2?[0,0]:[9*60,19*60]},
 d:"La residenza dei Borbone, con lo scalone d'onore, gli appartamenti storici con arredi e arazzi, il teatrino di corte e la Cappella Reale. Dalle finestre si vedono il golfo e il Vesuvio. Il Giardino Romantico, accanto, è gratuito.",
 m:"Biglietto intero 15 € (18–24 anni 2 €, gratis sotto i 18). Aperto tutti i giorni 9–20 (ultimo ingresso 19), chiuso il mercoledì. Il Giardino Romantico è gratis 9–19. Dati dal sito del Ministero della Cultura."},
castelnuovo:{t:"Castel Nuovo (Maschio Angioino)",z:"B",p:2,min:40,id:55,max:90,pos:[40.8386,14.2528],q:"Castel Nuovo, Napoli",cls:"",tk:[6,"Castel Nuovo (6 €)",1],
 win:function(wd){return wd===6?[8*60+30,13*60]:[8*60+30,16*60]},
 d:"Il castello medievale con cinque torri rotonde che domina il porto, costruito nel Duecento dagli Angioini. Si vedono l'arco trionfale di marmo di Alfonso d'Aragona, la Sala dei Baroni e la Cappella Palatina con resti di affreschi.",
 m:"Biglietto 6 € (gratis sotto i 18 anni). Aperto lunedì–sabato 8:30–17 (biglietteria un'ora prima) e domenica fino alle 14: le sale a volte chiudono prima, controlla all'ingresso. Orari e prezzo da una scheda online di marzo 2026, da confermare."},
ovo:{t:"Castel dell'Ovo e Borgo Marinari",z:"C",p:2,min:40,id:55,max:90,pos:[40.8283,14.2477],q:"Castel dell'Ovo, Napoli",cls:"walk",sun:1,
 win:function(wd){return wd===6?[9*60,13*60+30]:[9*60,18*60]},
 d:"La fortezza più antica di Napoli, su un isolotto collegato alla terraferma da una strada sul mare. Dalle terrazze si vedono il golfo, il Vesuvio e la città. Intorno c'è il Borgo Marinari, un villaggio di pescatori con i ristoranti sul porticciolo.",
 m:"L'ingresso al castello è gratuito. Orari estivi di norma 9–19:30 nei giorni feriali e 9–14 la domenica, più brevi in inverno: il castello può chiudere per eventi con poco preavviso. Il lungomare di Via Partenope è gratuito sempre. Dati da guide, da confermare."},
sanmartino:{t:"Certosa di San Martino e il Vomero",z:"F",p:3,min:75,id:100,max:140,pos:[40.8444,14.2392],q:"Certosa e Museo di San Martino, Napoli",cls:"",multi:1,cl:[1],tk:[6,"Certosa e Museo di San Martino (6 €)",1],
 win:function(wd){return wd===1?[0,0]:[8*60+30,17*60+30]},
 d:"Un ex monastero sulla collina del Vomero, con il chiostro grande, i giardini e il museo con presepi, carrozze e dipinti. Dalle terrazze si vede tutta Napoli, la baia e il Vesuvio: è uno dei panorami più belli della città.",
 m:"Biglietto intero 6 € (18–25 anni 2 €, gratis sotto i 18). Aperta 8:30–18:30 (ultimo ingresso 17:30), chiusa il martedì; i giardini chiudono un'ora prima. Dati dal sito del Ministero della Cultura."},
sotterranea:{t:"Napoli Sotterranea",z:"A",p:4,min:90,id:100,max:120,pos:[40.8505,14.2565],q:"Napoli Sotterranea, Piazza San Gaetano 68, Napoli",cls:"",multi:1,tk:[10,"Napoli Sotterranea, visita guidata (10 €)",1,1],
 win:function(){return[10*60,18*60]},
 d:"Una visita guidata sotto il centro storico: si scende di 40 metri tra cisterne dell'acquedotto greco e romano, gallerie e un teatro romano, e si vedono i rifugi usati dai napoletani durante i bombardamenti della Seconda guerra mondiale.",
 m:"Biglietto 10 €, visita di circa due ore a orari fissi (di norma alle 10, 12, 14 e 16, da una guida del 2024). Il percorso ha spazi stretti e temperatura di circa 17 gradi: porta una giacca. Prenota online per l'orario. Orari e prezzo da confermare."},
quartieri:{t:"Quartieri Spagnoli e il murale di Maradona",z:"B",p:4,min:30,id:45,max:70,pos:[40.8415,14.2462],q:"Largo Maradona, Napoli",cls:"walk",multi:1,
 d:"Un reticolo di vicoli stretti e ripidi pieni di vita quotidiana: panni stesi, altarini, botteghe e motorini. Il murale di Maradona nei vicoli è diventato un luogo di culto per i tifosi.",
 m:"Si cammina gratis. Di giorno e la sera presto è vivace; dopo tardi evita i vicoli deserti. Tieni borsa e telefono davanti e fai attenzione ai motorini."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","mann",20,"metro","Metro Linea 1 da Garibaldi (davanti alla stazione) fino a Museo (6 fermate), poi 3 minuti a piedi: circa 20 minuti.","Metro Linea 1 da Museo fino a Garibaldi (circa 15 minuti), a due passi dalla stazione.",{f:[["l1","Garibaldi","Museo"],W([[40.8530,14.2505],[40.8531,14.2504]])],r:[W([[40.8531,14.2504],[40.8530,14.2505]]),["l1","Museo","Garibaldi"]]});
P2("start","duomo",15,"metro","Metro Linea 1 da Garibaldi a Duomo (una fermata), poi 8 minuti a piedi lungo Via Duomo fino alla cattedrale: circa 15 minuti.","A piedi dal Duomo alla stazione Duomo della Linea 1 (8 minuti), poi metro fino a Garibaldi: circa 15 minuti.",{f:[["l1","Garibaldi","Duomo"],W([[40.8492,14.2622],[40.8510,14.2608],[40.8529,14.2594]])],r:[W([[40.8529,14.2594],[40.8510,14.2608],[40.8492,14.2622]]),["l1","Duomo","Garibaldi"]]});
P2("start","castelnuovo",17,"metro","Metro Linea 1 da Garibaldi a Municipio (3 fermate), poi 3 minuti a piedi fino al castello: circa 17 minuti.","A piedi fino alla metro Municipio, Linea 1 fino a Garibaldi: circa 17 minuti.",{f:[["l1","Garibaldi","Municipio"],W([[40.8397,14.2535],[40.8386,14.2528]])],r:[W([[40.8386,14.2528],[40.8397,14.2535]]),["l1","Municipio","Garibaldi"]]});
P2("mann","santachiara",15,"walk","A piedi per Via Pessina, Piazza Dante e Via Santa Maria di Costantinopoli fino a Santa Chiara, circa 15 minuti.","A piedi per Via Benedetto Croce e Piazza Dante fino al Museo Archeologico, circa 15 minuti.",{f:[W([[40.8531,14.2504],[40.8497,14.2510],[40.8480,14.2520],[40.8468,14.2531]])],r:[W([[40.8468,14.2531],[40.8480,14.2520],[40.8497,14.2510],[40.8531,14.2504]])]});
P2("santachiara","sansevero",5,"walk","A piedi per Piazza del Gesù Nuovo e Via Benedetto Croce fino a Piazza San Domenico Maggiore, circa 5 minuti.","A piedi per Via Benedetto Croce fino a Santa Chiara, circa 5 minuti.",{f:[W([[40.8468,14.2531],[40.8478,14.2543],[40.8484,14.2554]])],r:[W([[40.8484,14.2554],[40.8478,14.2543],[40.8468,14.2531]])]});
P2("sansevero","spaccanapoli",8,"walk","A piedi lungo Spaccanapoli (Via Benedetto Croce e Via San Biagio dei Librai) fino a Via San Gregorio Armeno, circa 8 minuti.","A piedi lungo Spaccanapoli fino a San Domenico Maggiore, circa 8 minuti.",{f:[W([[40.8484,14.2554],[40.8490,14.2563],[40.8497,14.2574]])],r:[W([[40.8497,14.2574],[40.8490,14.2563],[40.8484,14.2554]])]});
P2("spaccanapoli","duomo",9,"walk","A piedi per Via dei Tribunali e Via Duomo fino alla cattedrale, circa 9 minuti.","A piedi per Via Duomo e Via dei Tribunali fino a San Gregorio Armeno, circa 9 minuti.",{f:[W([[40.8497,14.2574],[40.8512,14.2585],[40.8529,14.2594]])],r:[W([[40.8529,14.2594],[40.8512,14.2585],[40.8497,14.2574]])]});
P2("duomo","piomonte",4,"walk","A piedi lungo Via dei Tribunali, circa 4 minuti.","A piedi lungo Via dei Tribunali fino al Duomo, circa 4 minuti.",{f:[W([[40.8529,14.2594],[40.8517,14.2592],[40.8510,14.2590]])],r:[W([[40.8510,14.2590],[40.8517,14.2592],[40.8529,14.2594]])]});
P2("piomonte","sotterranea",5,"walk","A piedi lungo Via dei Tribunali fino a Piazza San Gaetano, circa 5 minuti.","A piedi lungo Via dei Tribunali fino al Pio Monte, circa 5 minuti.",{f:[W([[40.8510,14.2590],[40.8507,14.2575],[40.8505,14.2565]])],r:[W([[40.8505,14.2565],[40.8507,14.2575],[40.8510,14.2590]])]});
P2("sotterranea","spaccanapoli",5,"walk","A piedi per Via San Gregorio Armeno, circa 5 minuti.","A piedi per Via San Gregorio Armeno fino a Piazza San Gaetano, circa 5 minuti.",{f:[W([[40.8505,14.2565],[40.8500,14.2570],[40.8497,14.2574]])],r:[W([[40.8497,14.2574],[40.8500,14.2570],[40.8505,14.2565]])]});
P2("duomo","castelnuovo",20,"metro","A piedi fino alla metro Duomo (8 minuti), poi Linea 1 fino a Municipio (2 fermate) e 3 minuti a piedi fino al castello: circa 20 minuti.","A piedi fino a Municipio, metro Linea 1 fino a Duomo e 8 minuti a piedi: circa 20 minuti.",{f:[W([[40.8529,14.2594],[40.8492,14.2622]]),["l1","Duomo","Municipio"],W([[40.8397,14.2535],[40.8386,14.2528]])],r:[W([[40.8386,14.2528],[40.8397,14.2535]]),["l1","Municipio","Duomo"],W([[40.8492,14.2622],[40.8529,14.2594]])]});
P2("castelnuovo","plebiscito",8,"walk","A piedi per Via San Carlo e il Teatro San Carlo fino a Piazza del Plebiscito, circa 8 minuti.","A piedi per Via San Carlo fino a Castel Nuovo, circa 8 minuti.",{f:[W([[40.8386,14.2528],[40.8375,14.2505],[40.8362,14.2492],[40.8358,14.2487]])],r:[W([[40.8358,14.2487],[40.8362,14.2492],[40.8375,14.2505],[40.8386,14.2528]])]});
P2("plebiscito","reale",3,"walk","A piedi dall'altro lato della piazza, circa 3 minuti.","A piedi attraverso la piazza, circa 3 minuti.",{f:[W([[40.8358,14.2487],[40.8359,14.2488]])],r:[W([[40.8359,14.2488],[40.8358,14.2487]])]});
P2("reale","castelnuovo",9,"walk","A piedi per Via San Carlo fino a Castel Nuovo, circa 9 minuti.","A piedi per Via San Carlo fino al Palazzo Reale, circa 9 minuti.",{f:[W([[40.8359,14.2488],[40.8375,14.2505],[40.8386,14.2528]])],r:[W([[40.8386,14.2528],[40.8375,14.2505],[40.8359,14.2488]])]});
P2("plebiscito","ovo",15,"walk","A piedi per Via Cesario Console e il lungomare di Via Partenope fino a Castel dell'Ovo, circa 15 minuti.","A piedi dal lungomare di Via Partenope fino a Piazza del Plebiscito, circa 15 minuti.",{f:[W([[40.8358,14.2487],[40.8335,14.2478],[40.8308,14.2492],[40.8283,14.2477]])],r:[W([[40.8283,14.2477],[40.8308,14.2492],[40.8335,14.2478],[40.8358,14.2487]])]});
P2("quartieri","plebiscito",8,"walk","A piedi in discesa per Via Toledo e Via San Carlo fino a Piazza del Plebiscito, circa 8 minuti.","A piedi in salita da Piazza del Plebiscito fino al murale di Maradona, circa 8 minuti.",{f:[W([[40.8415,14.2462],[40.8390,14.2480],[40.8365,14.2487]])],r:[W([[40.8365,14.2487],[40.8390,14.2480],[40.8415,14.2462]])]});
P2("mann","quartieri",18,"metro","Metro Linea 1 da Museo a Toledo (2 fermate), poi 6 minuti a piedi per Via Toledo e i vicoli fino al murale: circa 18 minuti.","A piedi a Toledo, metro Linea 1 fino a Museo e 3 minuti a piedi: circa 18 minuti.",{f:[["l1","Museo","Toledo"],W([[40.8393,14.2493],[40.8415,14.2462]])],r:[W([[40.8415,14.2462],[40.8393,14.2493]]),["l1","Toledo","Museo"]]});
P2("quartieri","sanmartino",25,"metro","Funicolare di Montesanto fino a Morghen, poi 12 minuti a piedi in salita per Via Tito Angelini fino alla Certosa: circa 25 minuti. Il biglietto urbano ANM vale anche sulle funicolari.","A piedi in discesa dalla Certosa a Morghen, funicolare fino a Montesanto e 8 minuti a piedi: circa 25 minuti.",{f:[{w:[[40.8415,14.2462],[40.8444,14.2392]],dash:1}],r:[{w:[[40.8444,14.2392],[40.8415,14.2462]],dash:1}]});
/* ritorno in aeroporto: Alibus da Piazza Garibaldi o da Piazza Municipio */
var RET={
NAP:{
 A:{min:40,txt:"Alibus da Piazza Garibaldi, davanti alla Stazione Centrale, fino all'aeroporto: 20–30 minuti con traffico normale, una corsa ogni 15–25 minuti circa. Biglietto 5 €. Le ultime corse partono verso mezzanotte: controlla gli orari su anm.it.",g:[["ali","Piazza Garibaldi","Aeroporto di Capodichino"]]},
 castelnuovo:{min:50,txt:"Alibus da Piazza Municipio (fermata vicino al castello e alla stazione Municipio) fino all'aeroporto: 35–40 minuti, una corsa ogni 15–25 minuti circa. Biglietto 5 €. Controlla l'ultima corsa su anm.it.",g:[["ali","Piazza Municipio","Aeroporto di Capodichino"]]},
 plebiscito:{min:60,txt:"A piedi per Via San Carlo fino a Piazza Municipio (8 minuti), poi Alibus fino all'aeroporto: 35–40 minuti. Biglietto 5 €.",g:[W([[40.8358,14.2487],[40.8375,14.2505],[40.8386,14.2527]]),["ali","Piazza Municipio","Aeroporto di Capodichino"]]},
 ovo:{min:70,txt:"A piedi per Via Partenope e Via Cesario Console fino a Piazza Municipio (circa 20 minuti), poi Alibus fino all'aeroporto: 35–40 minuti. Biglietto 5 €.",g:[W([[40.8283,14.2477],[40.8308,14.2492],[40.8335,14.2478],[40.8358,14.2487],[40.8386,14.2527]]),["ali","Piazza Municipio","Aeroporto di Capodichino"]]}}
};
var ARR={
NAP:[["ali","Aeroporto di Capodichino","Piazza Garibaldi"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari, prezzi e valutazioni da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
scaturchio:{n:"Pasticceria Scaturchio",a:"Piazza San Domenico Maggiore 19",z:"A",r:"4,3",pos:[40.8483,14.2536],h:D7("07:00-21:00"),
 d:"Pasticceria storica del 1903 nel centro antico, sulla piazza di San Domenico Maggiore: sfogliatelle, babà, il dolce «Ministeriale» al cioccolato e caffè al banco.",pr:"Un caffè e una sfogliatella al banco restano sotto i 5 € (listino non visto). Orari da guide, da confermare."},
mexico:{n:"Caffè Mexico",a:"Piazza Dante 86",z:"A",r:"4,3",pos:[40.8493,14.2510],h:D7("07:00-20:30"),
 d:"Bar storico di Piazza Dante dove i napoletani prendono il caffè in piedi al banco: è cremoso, già zuccherato e molto forte. Si paga prima alla cassa e si porta lo scontrino al barista.",pr:"Un caffè costa circa 1,20–1,50 € (listino non visto). Orari da guide, da confermare."},
dimatteo:{n:"Antica Pizzeria Di Matteo",a:"Via dei Tribunali 94",z:"A",r:"4,3",pos:[40.8507,14.2560],h:["09:00-23:00","09:00-23:00","09:00-23:00","09:00-23:00","09:00-23:00","09:00-23:00",""],
 d:"Pizzeria storica su Via dei Tribunali, nota per la pizza fritta e per il cuoppo di fritti. Si prende un numero e si aspetta fuori; i tavoli sono stretti e si mangia in fretta. Chiusa la domenica.",pr:"Una margherita costa circa 5–6 €; con una bibita si sta sotto i 10 € (da recensioni). Orari da guide, da confermare."},
portalba:{n:"Pizzeria Port'Alba",a:"Via Port'Alba 18",z:"A",r:"4,1",pos:[40.8493,14.2511],h:D7("11:00-00:00"),
 d:"La pizzeria più antica di Napoli, aperta dal 1738 sotto l'arco di Port'Alba, tra le librerie di Piazza Dante: pizza classica napoletana, calzone e piatti di mare in una sala ampia.",pr:"Una margherita costa circa 7–8 €; con una birra si sta sui 12 € (da recensioni). Orari da guide, da confermare."},
michele:{n:"L'Antica Pizzeria da Michele",a:"Via Cesare Sersale 1",z:"D",r:"4,4",pos:[40.8494,14.2634],h:["11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00",""],
 d:"Pizzeria del 1870, celebre per il film «Mangia prega ama», che propone solo due pizze: margherita e marinara. Dal 2020 si può fare la coda con il numero consegnato all'ingresso. Chiusa la domenica.",pr:"Una pizza costa circa 6–7 €; con una bibita si sta sui 10 € (da recensioni). Orari da guide, da confermare."},
attanasio:{n:"Pasticceria Attanasio",a:"Vico Ferrovia 2",z:"D",r:"4,4",pos:[40.8534,14.2709],h:["07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","07:30-14:00"],
 d:"A due passi dalla stazione, la pasticceria che vende la sfogliatella calda di ricotta appena sfornata, riccia o frolla, spesso con la fila. Sempre un buon modo per iniziare o chiudere la giornata a Napoli.",pr:"Una sfogliatella costa circa 2,50–3 € (da recensioni). Orari da guide, da confermare."},
gambrinus:{n:"Gran Caffè Gambrinus",a:"Via Chiaia 12",z:"B",r:"4,2",pos:[40.8369,14.2491],h:D7("07:00-00:00"),
 d:"Il caffè storico di Napoli dal 1860, accanto al Palazzo Reale e al Teatro San Carlo: sale con specchi e stucchi, pasticceria e caffè al banco, più economico che al tavolo.",pr:"Al banco un caffè e una sfogliatella stanno sotto i 6 €; ai tavolini i prezzi sono più alti (listino non visto). Orari da guide, da confermare."},
sfmary:{n:"Sfogliatella Mary",a:"Galleria Umberto I, Via San Carlo 1",z:"B",r:"4,3",pos:[40.8388,14.2492],h:D7("07:30-20:00"),
 d:"Un piccolo chiosco-pasticceria dentro la Galleria Umberto I, famoso per le sfogliatelle calde e per i dolci da portare via: si mangia in piedi sotto la cupola.",pr:"Una sfogliatella costa circa 2,50–3 € (da recensioni). Orari da guide, da confermare."},
nennella:{n:"Trattoria da Nennella",a:"Vico Lungo Teatro Nuovo 103",z:"B",r:"4,3",pos:[40.8421,14.2476],h:["12:00-16:00,19:00-23:00","12:00-16:00,19:00-23:00","12:00-16:00,19:00-23:00","12:00-16:00,19:00-23:00","12:00-16:00,19:00-23:00","12:00-16:00,19:00-23:00","12:00-16:00"],
 d:"Trattoria rumorosa e allegra nei Quartieri Spagnoli, con i camerieri che cantano e scherzano e piatti napoletani abbondanti, come pasta e patate, ragù e polpette. Si mangia a tavoli lunghi condivisi.",pr:"Fascia economica; un pasto completo sta sotto i 20 € (da recensioni). Orari da guide, da confermare."},
brandi:{n:"Pizzeria Brandi",a:"Salita Sant'Anna di Palazzo 1",z:"B",r:"4,2",pos:[40.8379,14.2487],h:D7("12:00-15:00,19:00-00:00"),
 d:"La pizzeria dove nel 1889 sarebbe nata la pizza margherita, in un vicolo vicino al Palazzo Reale: forno a legna e sala con le foto d'epoca.",pr:"Una pizza costa circa 8–10 €; con una bibita si sta intorno ai 15 € (da recensioni). Orari da guide, da confermare."},
starita:{n:"Pizzeria Starita a Materdei",a:"Via Materdei 27",z:"E",r:"4,3",pos:[40.8591,14.2483],h:D7("12:00-15:30,19:00-23:30"),
 d:"Pizzeria del quartiere Materdei, fuori dai percorsi turistici, aperta dal 1901: la pizza fritta «montanara» è il suo piatto classico. Si va con il numero e l'attesa è lunga a cena.",pr:"Una pizza costa circa 6–8 €; con una bibita si sta sui 11 € (da recensioni). Orari da guide, da confermare."},
concettina:{n:"Pizzeria Concettina ai Tre Santi",a:"Via Arena della Sanità 7 bis",z:"E",r:"4,5",pos:[40.8586,14.2501],h:["12:00-15:30,19:00-23:30","12:00-15:30,19:00-23:30","12:00-15:30,19:00-23:30","12:00-15:30,19:00-23:30","12:00-15:30,19:00-23:30","12:00-15:30,19:00-23:30",""],
 d:"Pizzeria del Rione Sanità, il quartiere di Totò, con impasto soffice e ingredienti locali come i pomodori del Vesuvio. È uno dei locali preferiti dai napoletani che vogliono mangiare bene senza spendere troppo. Chiusa la domenica.",pr:"Una pizza costa circa 7–9 €; con una bibita si sta sui 13 € (da recensioni). Orari da guide, da confermare."},
chaletciro:{n:"Chalet Ciro a Mergellina",a:"Via Caracciolo 31",z:"C",r:"4,3",pos:[40.8268,14.2213],h:D7("07:00-23:00"),
 d:"Gelateria e pasticceria sul porticciolo di Mergellina, dalla colazione fino a tardi: il gelato, il tartufo e le sfogliatelle da mangiare passeggiando sul lungomare.",pr:"Un gelato costa circa 3–5 € (da recensioni). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["scaturchio","mexico"],B:["gambrinus","sfmary"],C:["chaletciro","gambrinus"],D:["attanasio","mexico"],E:["mexico","scaturchio"],F:["mexico","gambrinus"]},
pra:{A:["dimatteo","portalba"],B:["nennella","brandi","sfmary"],C:["brandi","chaletciro"],D:["michele","attanasio"],E:["starita","concettina"],F:["brandi","portalba"]},
cen:{A:["dimatteo","portalba"],B:["nennella","brandi"],C:["brandi","nennella"],D:["michele","dimatteo"],E:["starita","concettina"],F:["brandi","portalba"]},
snk:{A:["scaturchio","mexico","dimatteo"],B:["sfmary","gambrinus"],C:["chaletciro","gambrinus"],D:["attanasio","mexico"],E:["concettina","starita"],F:["gambrinus","sfmary"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"antico",t:"Duomo, Spaccanapoli e Cappella Sansevero",acts:["duomo","piomonte","sotterranea","spaccanapoli","sansevero","santachiara"],need:330,core:1},
{id:"museo",t:"Museo Archeologico e Quartieri Spagnoli",acts:["mann","quartieri"],need:190,core:1,cl:[1]},
{id:"reale",t:"Plebiscito, Palazzo Reale e Castel dell'Ovo",acts:["plebiscito","reale","castelnuovo","ovo"],need:260,core:1,cl:[2]},
{id:"vomero",t:"Certosa di San Martino e il Vomero",acts:["sanmartino"],need:140,cl:[1]}
];
var ORDER=["mann","santachiara","sansevero","spaccanapoli","sotterranea","piomonte","duomo","quartieri","castelnuovo","plebiscito","reale","ovo","sanmartino"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["garibaldi","Stazione Centrale / Piazza Garibaldi",[40.8527,14.2718],"D"],
["centro","Centro storico (Spaccanapoli, Tribunali)",[40.8495,14.2560],"A"],
["dante","Piazza Dante / Museo Archeologico",[40.8497,14.2510],"A"],
["toledo","Via Toledo / Quartieri Spagnoli / Municipio",[40.8400,14.2490],"B"],
["plebiscito","Plebiscito / Santa Lucia",[40.8365,14.2465],"B"],
["lungomare","Chiaia / Lungomare / Mergellina",[40.8300,14.2330],"C"],
["vomero","Vomero",[40.8447,14.2315],"F"],
["sanita","Sanità / Materdei",[40.8582,14.2490],"E"],
["altro","Altra zona (scrivi l'indirizzo)",[40.8470,14.2540],""]
];
/* imposta di soggiorno di Napoli: tariffe 2026 per persona e notte (da stampa, aumentate di 1 € nel 2026) */
var TAX=[["h5","Hotel 4 o 5 stelle",6],["h3","Hotel a 3 stelle, B&B o affittacamere",5.5],["apt","Appartamento turistico",6],["host","Hotel a 1 o 2 stelle",4.5],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Caffè e sfogliatella","il caffè al banco, piccolo e forte, con la sfogliatella: riccia (a strati croccanti) o frolla (di pasta morbida), sempre con ricotta e canditi."],["Babà","il dolce soffice imbevuto di rum, la pasticceria più famosa dopo la sfogliatella."],["Cornetto o fiocco di neve","un cornetto vuoto o ripieno, o il «fiocco di neve», un dolce morbido con crema di latte."]],
pra:[["Pizza a portafoglio","la pizza piegata in quattro e mangiata in mano, la merenda dei napoletani."],["Cuoppo di fritti","il cono di carta con frittelle, crocchè e arancini."],["Pasta e patate","il primo di patate, pasta e provola, cremoso e filante."]],
cen:[["Pizza margherita","con pomodoro, mozzarella e basilico: l'impasto è morbido, il bordo alto e gonfio."],["Spaghetti alle vongole","il primo napoletano per eccellenza, con vongole veraci."],["Ragù napoletano","il sugo di carne cotto per ore, con la pasta e la carne a parte."],["Un gelato","in cono o coppetta, alla fine di una passeggiata."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Vesuvio dal lungomare","Foto","La sagoma del vulcano sopra la baia, vista da Via Partenope: la luce migliore è al tramonto.",[40.8290,14.2490],"Via Partenope, Napoli","ovo"],
["📷","Castel dell'Ovo dal Borgo Marinari","Foto","Il castello sul mare con il porticciolo dei pescatori davanti.",[40.8280,14.2488],"Borgo Marinari, Napoli","ovo"],
["📷","Castel Nuovo e le sue torri","Foto","Le cinque torri rotonde e l'arco di marmo, da Piazza Municipio.",[40.8386,14.2528],"Castel Nuovo, Napoli","castelnuovo"],
["📷","Il colonnato del Plebiscito","Foto","Il semicerchio di colonne con la chiesa di San Francesco di Paola, meglio al mattino quando la piazza è vuota.",[40.8358,14.2487],"Piazza del Plebiscito, Napoli","plebiscito"],
["📷","La cupola della Galleria Umberto I","Foto","Inquadra verso l'alto da sotto la croce di marmo: ferro e vetro del 1890.",[40.8388,14.2490],"Galleria Umberto I, Napoli","plebiscito"],
["🤳","La stazione Toledo","Selfie","I mosaici blu e la luce di mare che scende fino al binario: una delle metro più belle d'Europa.",[40.8393,14.2493],"Metro Toledo, Napoli","plebiscito"],
["📷","Le botteghe di San Gregorio Armeno","Foto","Le statuine dei presepi in vetrina, da una mano a una pezzatura piccola: chiedi sempre il permesso prima di fotografare gli artigiani.",[40.8497,14.2574],"Via San Gregorio Armeno, Napoli","spaccanapoli"],
["📷","Spaccanapoli in linea retta","Foto","La lunga via dritta vista dall'inizio: i palazzi alti, i panni stesi e il Vesuvio sullo sfondo, in cima.",[40.8479,14.2549],"Via Benedetto Croce, Napoli","spaccanapoli"],
["📷","Il chiostro di Santa Chiara","Foto","Le panche e i pilastri coperti di maioliche dipinte, nel giardino nascosto.",[40.8467,14.2531],"Chiostro di Santa Chiara, Napoli","santachiara"],
["📷","La facciata del Duomo","Foto","La facciata neogotica su Via Duomo.",[40.8529,14.2594],"Duomo di Napoli","duomo"],
["🤳","Il murale di Maradona","Selfie","Il grande murale nei vicoli dei Quartieri Spagnoli, con altarini e bandiere intorno.",[40.8413,14.2462],"Largo Maradona, Napoli","quartieri"],
["📷","Napoli dalla Certosa","Foto","Il golfo, la città e il Vesuvio dal chiostro e dalle terrazze del monastero.",[40.8442,14.2395],"Certosa di San Martino, Napoli","sanmartino"],
["📷","La scalinata dello scalone d'onore","Foto","I gradini di marmo sotto la grande volta del Palazzo Reale.",[40.8359,14.2488],"Palazzo Reale, Napoli","reale"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2027-06-30",t:"Metro per l'aeroporto non ancora aperta",x:"La stazione Capodichino della Linea 1 è quasi finita (oltre il 95% dei lavori) ma non è ancora aperta: l'apertura è attesa nel 2027. Per l'aeroporto si usa l'Alibus (5 €) o il taxi a tariffa fissa."},
{from:"2026-11-01",to:"2026-11-01",t:"Musei statali gratuiti: più gente",x:"La prima domenica del mese l'ingresso ai musei statali (Museo Archeologico, Palazzo Reale, Certosa di San Martino) è di norma gratuito, ma si forma molta coda. Il 1° novembre è anche la festa di Ognissanti."},
{from:"2026-11-15",to:"2027-01-06",t:"Presepi e Natale: San Gregorio Armeno molto affollata",x:"Da metà novembre al 6 gennaio Via San Gregorio Armeno è piena di visitatori per le botteghe dei presepi: cammina con calma e tieni borsa e telefono davanti."},
{from:"2026-12-06",to:"2026-12-06",t:"Musei statali gratuiti: più gente",x:"La prima domenica del mese l'ingresso ai musei statali è di norma gratuito, ma si forma molta coda."},
{from:"2026-12-16",to:"2026-12-16",t:"Miracolo di San Gennaro",x:"Il 16 dicembre nel Duomo si ripete la liquefazione del sangue di San Gennaro: la cattedrale è molto affollata e le visite turistiche possono essere limitate."}
];
/* clima medio di Napoli (indicativo, massime/minime) */
var CLIM=[[13,6],[14,6],[16,8],[19,10],[23,14],[27,18],[31,21],[31,21],[27,18],[23,14],[18,10],[14,7]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Napoli: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="sansevero"&&WD===1)meta+=" Oggi è martedì: la Cappella Sansevero di solito è chiusa.";
if(it.id==="mann"&&WD===1)meta+=" Oggi è martedì: il Museo Archeologico è chiuso.";
if(it.id==="reale"&&WD===2)meta+=" Oggi è mercoledì: il Palazzo Reale è chiuso.";
if(it.id==="santachiara"&&WD===6)meta+=" Oggi è domenica: il chiostro apre solo dalle 10 alle 14.";
if(it.id==="castelnuovo"&&WD===6)meta+=" Oggi è domenica: il castello chiude prima, verso le 14.";
return meta}
Object.assign(C,{id:"napoli",n:"Napoli",cn:"Italia",e:"🍕",flag:"🇮🇹",col:["#0f6fb4","#e3a82b","#c2412d"],k:"napoli naples italia",
TZ:"Europe/Rome",LL:[40.8470,14.2540],CC:"it",QN:"Napoli",BK:"Naples",ARE:/napoli|naples|\b80[0-9]{3}\b/i,VER:"13 ottobre 2026",
Z0:"D",LANG:"it-IT",LANGN:"napoletano",NOSAY:1,WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Piazza Garibaldi",q:"Stazione Napoli Centrale, Piazza Garibaldi, Napoli"},
SINGLE:{acts:["mann","santachiara","sansevero","spaccanapoli","duomo","castelnuovo","plebiscito","ovo"],ins:[["piomonte","duomo"]]},
EXCL:[],
DICON:{spaccanapoli:"🎄",sansevero:"🗿",santachiara:"🌿",piomonte:"🎨",duomo:"⛪",mann:"🏺",plebiscito:"🏛️",reale:"👑",castelnuovo:"🏰",ovo:"🌊",sanmartino:"🌅",sotterranea:"🕯️",quartieri:"🛵"},
ZN:{A:"nel centro storico",B:"verso Toledo e il Plebiscito",C:"sul lungomare",D:"vicino alla Stazione Centrale",E:"alla Sanità e a Materdei",F:"al Vomero"},
NEAR:{col:"bar o pasticceria",pra:"pizzeria o trattoria",cen:"pizzeria o trattoria",snk:"pasticceria o gelateria"},
SE:{scaturchio:"🍰",mexico:"☕",dimatteo:"🍕",portalba:"🍕",michele:"🍕",attanasio:"🥐",gambrinus:"☕",sfmary:"🥐",nennella:"🍝",brandi:"🍕",starita:"🍕",concettina:"🍕",chaletciro:"🍦"},
TR:{one:1.5,cap:5.5,lbl:"Metro, bus e funicolari (Tap&Go)",
 air:{NAP:{one:5,n:"Alibus (aeroporto–Stazione Centrale)"}},
 passes:[
 {n:"Giornaliero ANM",d:1,max:1,p:4.5,note:"Il giornaliero ANM (4,50 €) vale su metro, bus, tram e funicolari fino alle 24 del giorno della convalida."},
 {n:"3 giorni",d:3,p:10.8,only:function(T){return T.n===3},note:"Il biglietto da 3 giorni (10,80 €) vale su metro, bus, tram e funicolari urbani."},
 {n:"Settimanale ANM",d:7,p:13.5,only:function(T){return T.n>=5},note:"L'abbonamento settimanale ANM (13,50 €) vale sui mezzi urbani per sette giorni."}],
 note:"Prezzi da guide recenti (luglio–agosto 2026), da confermare su anm.it: biglietto singolo di metro 1,50 € e di bus, tram e funicolari 1,30 €, valido 90–100 minuti con cambio, giornaliero ANM 4,50 €, 3 giorni 10,80 €, settimanale 13,50 €. Con il Tap&Go (carta contactless o telefono ai tornelli di Linea 1 e Linea 6) si paga 1,50 € a corsa, con un tetto di 5,50 € al giorno. L'Alibus costa 5 € a parte; i biglietti si convalidano prima di salire. Il biglietto urbano ANM non vale sulla Circumvesuviana, che ha un biglietto proprio."},
FOOD:{co:[4,"Colazione al banco (caffè e sfogliatella)"],pr:[8,"Pranzo (pizza, fritti o un panino)"],ce:[12,"Cena (pizza e bibita, o un primo)"],sp:[4,"Gelato e dolci"]},
T:{ride:"In metro o in funicolare",move:"tutto a piedi, in metro o in funicolare",bags:"«Posso lasciare i bagagli?»",bagsPM:"«Posso lasciare i bagagli fino al pomeriggio?»",bagsAM:"«Posso lasciare i bagagli fino a mezzogiorno?»",
pra:"Una pizza, un fritto o un panino",praZ:{A:"Nelle pizzerie storiche di Via dei Tribunali la fila a pranzo è lunga: arriva prima delle 12:30 o dopo le 14.",B:"Intorno a Via Toledo e al Plebiscito molti ristoranti puntano ai turisti: cerca le trattorie nei vicoli dei Quartieri Spagnoli.",C:"Sul lungomare e a Borgo Marinari i ristoranti sono belli ma cari: per spendere meno prendi una pizza o un gelato."},
freeLong:"Qualche idea: una passeggiata sul lungomare fino a Mergellina, un caffè in un bar storico, i giardini della Villa Comunale, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata sul lungomare o un gelato nel quartiere.",
remind:"Per la Cappella Sansevero prenota prima l'orario; il Museo Archeologico e il Palazzo Reale chiudono un giorno a settimana (martedì e mercoledì).",
rain1:"Al coperto: il Museo Archeologico, la Cappella Sansevero, il Duomo, Santa Chiara e le chiese del centro.",
rainM:"Al coperto: Museo Archeologico, Palazzo Reale, Cappella Sansevero, Pio Monte, Napoli Sotterranea e Certosa di San Martino.",
water:"L'acqua del rubinetto di Napoli è potabile: puoi riempire la borraccia e chiederla nei locali. Attivate «Acqua» sulla mappa per vedere le fontanelle più vicine.",
kitchen:"A Napoli si pranza tra le 12:30 e le 15:30 e si cena dalle 19:30: molte trattorie chiudono tra i due servizi, guarda l'orario accanto a ogni locale. Le pizzerie storiche hanno la fila nell'ora di punta.",
night:[["🍨","Un gelato dopo cena è una buona abitudine: scegli una gelateria artigianale, con colori naturali."],["🕙","Le trattorie servono fino alle 23; la Linea 1 gira fino alle 23 circa e fino all'una e mezza il venerdì e il sabato."],["🥐","Molti bar aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Stesso fuso orario e stessa lingua: non serve adattatore né cambio",
plug:"Caricabatterie (la spina è quella italiana, nessun adattatore)",
foodNote:"I pasti sono stime per pizzerie, fritti e bar di quartiere: colazione e cena restano sotto i 15 € a persona. Molti locali piccoli accettano solo contanti.",
taxNote:"L'imposta di soggiorno si paga a persona e a notte; il numero massimo di notti tassate e le esenzioni (per esempio per i bambini) vanno controllati sul sito del Comune di Napoli, perché non li ho trovati su fonti ufficiali. Spesso non è compresa nel prezzo e si paga alla struttura.",
mcrit:"Criteri: locali storici e di quartiere, pizzerie, bar e trattorie, niente catene. Colazione e cena restano intorno o sotto i 15 € a persona. Orari, prezzi e valutazioni sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Per l'Alibus compra il biglietto prima di salire (macchinetta, tabaccheria o app): a bordo costa di più.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietti dei mezzi (singolo, giornaliero o Tap&Go) e biglietto dell'Alibus (5 €): macchinette, tabaccherie e app ANM"],["san","Prenotazione dell'orario per la Cappella Sansevero (museosansevero.it)",["sansevero"]],["mann","Biglietto per il Museo Archeologico Nazionale (20 €)",["mann"]],["reale","Biglietto per il Palazzo Reale (15 €)",["reale"]],["sot","Prenotazione per Napoli Sotterranea (10 €, visita guidata)",["sotterranea"]],["cash","Qualche euro in contanti per pizzerie, bar e bancarelle"],["cov","Qualcosa per coprire spalle e ginocchia in chiesa",["duomo","santachiara"]]],
NUM:{1:["una persona","U-na per-SO-na"]},
PHR:function(){return [["Andiamo!","Jamme!","IAM-me"],["Come stai?","Comme staje?","KOM-me STA-ie"],["Grazie mille","Grazie assaje","GRA-tsie as-SA-ie"],["Guarda che bello!","Uè, guarda comm'è bello!","ue, GUAR-da KOM-me BEL-lo"],["Che stai facendo?","Che staje facenno?","ke STA-ie fa-CEN-no"],["Facciamo una foto?","Facimmo 'na foto?","fa-CIM-mo na FO-to"],["Non ti preoccupare","Nun te preoccupà","nun te pre-oc-cu-PA"],["Ho fame","Tengo famme","TEN-go FAM-me"],["Mi piace tantissimo","Me piace assaje","me PIA-ce as-SA-ie"],["Non c'è problema","Nun ce stanno problemi","nun ce STAN-no pro-BLE-mi"]]},
PHN:"Un po' di napoletano, per divertirsi e farsi capire dai napoletani: la prima riga è l'italiano, sotto c'è la versione di Napoli. Non serve la voce: sono parole da leggere e usare con un sorriso.",
taxTxt:function(tx){return "Imposta di soggiorno di Napoli (tariffe 2026 da stampa, da confermare): "+(tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+")":"non si paga se sei ospite di amici o parenti")+". Controlla sul sito del Comune il numero massimo di notti e le esenzioni."},
STAYTIPS:["La Linea 1 della metropolitana gira circa dalle 6 alle 23; il venerdì e il sabato resta aperta più a lungo (l'ultima corsa da Garibaldi è verso l'una e mezza). Orari da guide, da confermare su anm.it."],
ZONES:[
["🚇 Metro, funicolari e biglietti",["La Linea 1 (gialla) va da Garibaldi a Piscinola passando per Duomo, Università, Municipio, Toledo, Dante, Museo e Materdei; alcune stazioni, come Toledo, Università e Museo, hanno opere d'arte.","Un biglietto vale su metro, bus, tram e le quattro funicolari (Centrale, Chiaia, Mergellina e Montesanto): la corsa singola costa 1,50 € in metro, il giornaliero ANM 4,50 €. Con una carta contactless puoi passare direttamente al tornello (Tap&Go): 1,50 € a corsa, massimo 5,50 € al giorno.","Il biglietto ANM non vale sulla Circumvesuviana, il treno per Pompei, Ercolano e Sorrento: serve un biglietto EAV a parte.","La metropolitana non arriva all'aeroporto: la stazione di Capodichino non è ancora aperta (attesa nel 2027)."]],
["🚉 Stazione Centrale e Piazza Garibaldi",["La zona della stazione è comoda per i collegamenti ma di sera è meno tranquilla: borseggiatori e venditori abusivi, zaino davanti e telefono in tasca.","L'Alibus per l'aeroporto parte da Piazza Garibaldi, davanti alla stazione. Taxi: 21 € a tariffa fissa fino al centro storico.","Per mangiare bene non restare nelle vie intorno alla stazione: la pizzeria da Michele e i locali del centro antico sono a pochi minuti di metro."]],
["⛪ Centro antico: Duomo, Tribunali e Spaccanapoli",["Spaccanapoli, Via dei Tribunali e San Gregorio Armeno sono le vie principali: si fa tutto a piedi, ma i motorini passano stretti.","La Cappella Sansevero richiede prenotazione e a volte è esaurita: prenota l'orario con qualche giorno di anticipo.","Intorno a Piazza Dante e a Port'Alba ci sono librerie e pizzerie storiche."],["duomo","sansevero","spaccanapoli","santachiara","piomonte","sotterranea"]],
["🏺 Museo Archeologico",["Il Museo Archeologico è chiuso il martedì; la prima domenica del mese è gratuito ma affollato.","I pezzi di Pompei ed Ercolano si vedono meglio la mattina, quando ci sono meno gruppi.","La stazione Museo della Linea 1 è a due passi dall'ingresso."],["mann"]],
["🏛️ Plebiscito, Palazzo Reale e Castel Nuovo",["Il Palazzo Reale è chiuso il mercoledì; il Giardino Romantico accanto è gratuito.","Il Gran Caffè Gambrinus e la Galleria Umberto I sono a due passi dal Plebiscito: al banco i prezzi sono più bassi che ai tavolini.","Dal porto (Molo Beverello) partono i traghetti e gli aliscafi per Capri, Ischia e Procida."],["plebiscito","reale","castelnuovo"]],
["🌊 Lungomare e Castel dell'Ovo",["Il lungomare di Via Partenope, tra il castello e Mergellina, è una passeggiata di circa 4 km, quasi tutta pianeggiante.","Il Borgo Marinari ha ristoranti di pesce belli ma cari: controlla il prezzo prima di sederti.","Per vedere il tramonto sul Vesuvio resta sul lungomare dopo la visita al castello."],["ovo"]],
["🌅 Vomero e Certosa di San Martino",["Si sale con le funicolari (Centrale, Montesanto o Chiaia): il biglietto urbano vale anche lì.","La Certosa è chiusa il martedì; dalle terrazze il panorama su Napoli e sul golfo è tra i più belli della città.","Il Vomero è un quartiere residenziale, con negozi e bar tranquilli."],["sanmartino"]],
["🍕 Come si mangia a Napoli",["La pizza napoletana ha il bordo alto e morbido e il centro sottile: si mangia con le mani, o con coltello e forchetta. Una margherita costa di solito 5–8 €.","Al bar si prende il caffè al banco: prima si paga alla cassa, poi si porta lo scontrino al barista. In piedi costa meno che al tavolo.","Spesso nelle pizzerie storiche si prende un numero e si aspetta: arriva a pranzo prima delle 12:30 o dopo le 14, a cena prima delle 19:30."]]],
WTIPS:["L'acqua del rubinetto di Napoli è potabile: puoi riempire la borraccia ovunque e chiederla nei locali.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Le fontane monumentali, come quelle del Plebiscito, non sono da bere.","Al ristorante puoi chiedere l'acqua del rubinetto, ma di solito portano bottiglie a pagamento: se non la vuoi, dillo subito."],
GEN:["Stessa lingua e stesso fuso orario, nessuna valuta da cambiare.","A Napoli si pranza tra le 12:30 e le 15:30 e si cena dalle 19:30.","Il coperto (di solito 1–3 € a persona) è legale se segnato nel menu; la mancia non è obbligatoria.","Al bar, al banco si paga meno che al tavolo: prima si paga alla cassa, poi si porta lo scontrino al barista.","Attenzione ai borseggiatori in metro, sui bus pieni e nelle strade affollate del centro: zaino davanti e telefono in tasca.","Molti motorini passano nei vicoli e attraversano gli incroci senza fermarsi: guarda bene prima di attraversare.","Il centro storico ha una zona a traffico limitato (ZTL): in auto non si entra senza permesso, meglio muoversi a piedi o in metro.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Numero unico di emergenza · <a class="call" href="tel:118">📞 118</a> Ambulanza</li><li>🚇 Metro, bus e funicolari, anche per oggetti smarriti: <a href="https://www.anm.it/" target="_blank" rel="noopener">anm.it</a>; Circumvesuviana e treni EAV: <a href="https://www.eavsrl.it/" target="_blank" rel="noopener">eavsrl.it</a>.</li><li>🛡️ Per denunciare un furto: qualsiasi commissariato di Polizia di Stato o stazione dei Carabinieri.</li>',
STRK:'Non ho verificato scioperi dei trasporti di Napoli per le prossime settimane. Nei giorni prima controllate il servizio su <a href="https://www.anm.it/" target="_blank" rel="noopener">anm.it</a> e, se usate il treno, su <a href="https://www.trenitalia.com/" target="_blank" rel="noopener">trenitalia.com</a>; gli scioperi nazionali sono elencati su <a href="https://scioperi.mit.gov.it/" target="_blank" rel="noopener">scioperi.mit.gov.it</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="52" cy="22" r="11"/><path d="M196 106 L290 58 L304 52 L326 42 L350 34 L372 44 L400 70 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M0 106 V96 Q8 88 26 90 H70 Q90 88 98 106 Z"/><path d="M14 90 L22 72 H70 L80 90 Z"/><path d="M22 72 V68 h6 v4 M34 72 V68 h6 v4 M46 72 V68 h6 v4 M58 72 V68 h6 v4"/><path d="M36 72 V58 h22 V72 Z M34 58 H60 V54 H34 Z"/></g>'+
'<g style="--k:2"><path d="M108 106 V70 H182 V106 Z"/><path d="M108 70 V50 H128 V70 Z M162 70 V50 H182 V70 Z"/><path d="M108 50 V46 h4 v4 M116 50 V46 h4 v4 M124 50 V46 h4 v4 M162 50 V46 h4 v4 M170 50 V46 h4 v4 M178 50 V46 h4 v4"/><path d="M134 70 V58 H156 V70 Z"/></g>'+
'<g style="--k:3"><path d="M196 106 V76 H268 V106 Z"/><path d="M194 76 H270 L232 62 Z"/><path d="M216 62 V50 H248 V62 Z"/><path d="M216 50 Q216 30 232 28 Q248 30 248 50 Z"/><path d="M230 28 V20 h4 V28 Z"/><path d="M182 106 V90 Q190 82 196 84 V106 Z M268 84 Q274 82 282 90 V106 H268 Z"/></g>'+
'<g style="--k:4"><path d="M292 106 V82 H342 V106 Z"/><path d="M296 82 V68 H312 V82 Z M324 82 V72 H340 V82 Z"/><path d="M296 68 V64 h4 v4 M304 68 V64 h4 v4 M324 72 V68 h4 v4 M332 72 V68 h4 v4"/></g>'+
'<g style="--k:5"><path d="M376 106 V88 h4 V106 Z"/><path d="M360 88 Q366 76 378 76 Q390 76 396 88 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M30 90 h40"/><path d="M139 106 V88 Q145 80 151 88 V106"/><path d="M204 80 v24 M214 80 v24 M224 80 v24 M236 80 v24 M246 80 v24 M256 80 v24"/><path d="M300 92 v8 M312 92 v8 M324 92 v8 M334 92 v8"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="30" cy="12" r="1.6"/><circle cx="118" cy="22" r="1.3"/><circle cx="196" cy="12" r="1.3"/><circle cx="270" cy="22" r="1.3"/><circle cx="340" cy="10" r="1.3"/><circle cx="390" cy="22" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.napoli);

;var n=window.CITIES["napoli"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["napoli"]);
