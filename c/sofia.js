(function(o){
/* ===== Sofia (dati verificati il 14 ottobre 2026) ===== */
/* Fonti: sito della Galleria Nazionale (nationalgallery.bg) per Cripta e Museo dell'arte socialista; sito della metro di Sofia (metropolitan.bg) e BNT per le tariffe 2026;
   sito della chiesa di Boyana; Commissione europea per l'euro; schede Google (orari, coordinate, fascia di prezzo); guide e recensioni recenti per il resto (segnato «da confermare»).
   La Bulgaria usa l'euro dal 1° gennaio 2026: nessun CUR, prezzi in euro. */
window.CITIES=window.CITIES||{};
CITIES.sofia=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
SOF:{n:"Sofia (SOF)",s:"Aeroporto internazionale di Sofia",url:"https://www.sofia-airport.bg/en",live:"Sofia",inMin:45,buf:120,pos:[42.6879,23.4161],sd:"Aeroporto SOF · metro diretta al centro",rt:"Dall'aeroporto: metro dalla stazione del Terminal 2 fino a Serdika, nel centro di Sofia.",
 arr:"Dall'Italia si entra in Bulgaria senza controllo passaporti (spazio Schengen). L'aeroporto ha due terminal: la stazione della metro è fuori dal Terminal 2 (uscendo dalle partenze, a sinistra, seguendo i cartelli «Metro»). Se arrivi al Terminal 1, che usano alcune compagnie a basso costo, prendi prima la navetta gratuita T1–T2 (circa ogni 15 minuti). Dal Terminal 2 la metro va direttamente a Serdika senza cambi, in circa 20–30 minuti (tempo da guide recenti, da confermare). Serdika è proprio nel centro, a due passi dalle rovine romane e dal viale Vitosha. In alternativa gli autobus 84 e 184 vanno in centro per circa 1 €, ma sono più lenti e il biglietto non vale sulla metro.",
 tk:"Biglietto: la metro costa 0,80 € a corsa (tariffa 2026 dal sito della metro di Sofia); una guida di luglio 2026 indica 1 €, quindi tieni qualche moneta in più. Si paga con carta o telefono contactless direttamente ai tornelli; la biglietteria della stazione dell'aeroporto, secondo recensioni recenti, accetta solo contanti e le macchinette automatiche non sempre funzionano. Il taxi per il centro costa all'incirca 8–12 € (stima da una guida di luglio 2026, da confermare): usa i taxi con tassametro dello sportello ufficiale in aeroporto.",
 gm:"Sofia Airport Metro Station",
 tips:["Controlla il terminal del tuo volo: il Terminal 1 e il Terminal 2 sono separati e la metro parte solo dal Terminal 2 (navetta gratuita tra i due, terminal assegnati da confermare con la compagnia).","L'ultima metro da e per l'aeroporto parte poco prima di mezzanotte (circa le 23:49 secondo una recensione recente, da confermare): se arrivi tardi usa il taxi o l'autobus notturno N4, che circola tra mezzanotte e le 4.","Uber e Grab non sono disponibili in città (guida di luglio 2026): usa i taxi ufficiali o un'app locale di chiamata."]}
};
/* linee (tracciati indicativi) */
var SEG={
mt:{c:"#0072bc",n:"Metro dall'aeroporto al centro",p:[[42.6879,23.4161,"Aeroporto Terminal 2",2],[42.6978,23.3214,"Serdika",2]]}
};
var START=[42.6978,23.3214];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
nevsky:{t:"Cattedrale Aleksandr Nevskij e Cripta delle icone",z:"B",p:1,min:60,id:90,max:120,pos:[42.6960,23.3325],q:"Alexander Nevsky Cathedral, Sofia",cls:"",sun:1,
 win:function(){return[8*60,18*60+30]},
 d:"La grande cattedrale con le cupole dorate è il simbolo di Sofia, costruita in ricordo dei soldati caduti nella guerra russo-turca del 1877–78. Dentro si cammina tra mosaici e marmi; sotto la chiesa, nella cripta, c'è una raccolta di icone dal Medioevo all'Ottocento.",
 m:"La cattedrale è aperta tutti i giorni dalle 7 alle 19 e l'ingresso è gratuito (scheda Google e guide recenti); è una chiesa in uso, quindi con le funzioni si visita in silenzio e con spalle e ginocchia coperte. La Cripta delle icone (museo) è aperta da martedì a domenica 10–18, ultimo ingresso alle 17:30, chiusa il lunedì e nei giorni festivi: biglietto 10 € (sito della Galleria Nazionale; il giovedì costa 2 €). Prezzo e orari della cattedrale da confermare."},
serdica:{t:"Serdica romana, Largo e Rotonda di San Giorgio",z:"A",p:1,min:60,id:80,max:110,pos:[42.6970,23.3230],q:"Ancient Serdica Complex, Sofia",cls:"walk",sun:1,
 d:"Nel punto più centrale di Sofia, accanto alla metro Serdika, ci sono le rovine della Serdica romana, camminabili e gratuite. Intorno si apre il Largo, il grande slargo con i palazzi dell'epoca socialista, la chiesa di Sveta Nedelya e, nel cortile, la Rotonda di San Giorgio, l'edificio più antico della città.",
 m:"Il complesso archeologico di Serdica è aperto da martedì a domenica 10–18 e chiuso il lunedì, ingresso libero (scheda Google, da confermare); le rovine nei passaggi della metro si vedono sempre. La Rotonda di San Giorgio, del IV secolo e con affreschi medievali, è aperta ogni giorno 8–19:30 (chiesa in uso, ingresso libero). La cattedrale di Sveta Nedelya è aperta 7–19 (ingresso libero)."},
banya:{t:"Moschea Banya Bashi, Sinagoga e Mercato Centrale",z:"A",p:3,min:45,id:60,max:90,pos:[42.6995,23.3226],q:"Banya Bashi Mosque, Sofia",cls:"walk",sun:1,
 d:"Tre luoghi vicinissimi: la moschea del Cinquecento costruita sopra sorgenti termali, la grande sinagoga sefardita, una delle più grandi d'Europa, e il Mercato Centrale coperto, un edificio storico restaurato dove si trovano negozi, bar e piccoli ristoranti.",
 m:"La moschea è un luogo di culto attivo: dalla scheda Google risulta aperta 10:30–22, ma si entra solo fuori dagli orari di preghiera, con spalle e gambe coperte e senza scarpe. La Sinagoga Centrale è aperta lunedì–venerdì e domenica 9–17, chiusa il sabato; secondo una recensione recente il biglietto costa 10 €, serve un documento d'identità e c'è un controllo di sicurezza (da confermare). Il Mercato Centrale è aperto ogni giorno 7–22."},
vitosha:{t:"Viale Vitosha, Teatro Ivan Vazov e Giardino della Città",z:"A",p:2,min:60,id:90,max:130,pos:[42.6948,23.3208],q:"Vitosha Boulevard, Sofia",cls:"walk",multi:1,sun:1,
 d:"La via pedonale principale, con negozi, caffè e, sullo sfondo, il monte Vitosha. In fondo si arriva al Giardino della Città con il Teatro Nazionale Ivan Vazov, un edificio neoclassico con la facciata chiara e dorata, il più antico teatro del paese.",
 m:"La via e il giardino si percorrono liberamente a tutte le ore. Il teatro si vede da fuori; per entrare serve un biglietto di spettacolo (programma sul sito del teatro). Nella strada principale i prezzi dei caffè sono più alti: per mangiare meglio spostati nelle vie laterali."},
archeo:{t:"Museo Archeologico Nazionale",z:"A",p:2,min:60,id:75,max:105,pos:[42.6964,23.3246],q:"National Archaeological Museum, Sofia",cls:"",
 win:function(){return[10*60,17*60+30]},
 d:"Il museo dei tesori della Bulgaria, dall'età della pietra al Medioevo, ospitato in una ex grande moschea ottomana. La sala del tesoro con gli ori traci è la parte più bella; è piccolo e si visita in un'ora.",
 m:"Aperto ogni giorno 10–18, ultimo ingresso 30 minuti prima della chiusura (scheda Google e guide recenti per l'orario estivo, da confermare per l'inverno su naim.bg). Biglietto circa 6 € (recensioni e guide del 2026, listino non visto); gratuito l'ultima domenica del mese (da confermare)."},
sofiachurch:{t:"Basilica di Santa Sofia e Chiesa Russa",z:"B",p:3,min:45,id:60,max:80,pos:[42.6966,23.3313],q:"St. Sofia Basilica, Sofia",cls:"walk",sun:1,
 d:"La basilica di Santa Sofia, in mattoni rossi, risale al VI secolo e ha dato il nome alla città; sotto la chiesa c'è un piccolo museo con le tombe antiche. A pochi passi, la Chiesa Russa di San Nicola ha cinque cupole dorate su un tetto verde.",
 m:"La basilica è aperta ogni giorno 7–18; l'accesso al museo sotterraneo inizia verso le 10 e ha un piccolo biglietto (pochi euro, importo da confermare). La Chiesa Russa è aperta ogni giorno 8–18:30 ed è gratuita (scheda Google)."},
boyana:{t:"Chiesa di Boyana (UNESCO)",z:"E",p:2,min:75,id:95,max:140,pos:[42.6446,23.2662],q:"Boyana Church, Sofia",cls:"",tk:[6,"Chiesa di Boyana (circa 6 €)",1,1],
 win:function(wd,d){var o=d.slice(5),w=(o>="11-01"||o<="03-31");return w?[9*60,17*60]:[9*60+30,17*60+30]},
 d:"Una piccola chiesa medievale ai piedi del monte Vitosha, patrimonio UNESCO, famosa per gli affreschi del 1259, tra i più importanti dell'arte bizantina dell'Europa orientale. Fuori c'è un giardino tranquillo.",
 m:"Aperta ogni giorno: da aprile a ottobre 9:30–18 (biglietteria fino alle 17:30), da novembre a marzo 9–17:30 (biglietteria fino alle 17) dal sito della chiesa. Biglietto circa 6 € (guide e recensioni del 2026, listino non letto sul sito). Dentro entrano solo 9–10 persone alla volta, per circa 10 minuti, e non si fotografa: nelle ore di punta si aspetta anche un'ora. Si consiglia di prenotare per telefono (+359 2 959 09 39) o email nei giorni feriali. È a circa 8 km dal centro: taxi circa 20 minuti, oppure autobus 64 o 107."},
ndk:{t:"Palazzo Nazionale della Cultura (NDK)",z:"C",p:4,min:45,id:60,max:90,pos:[42.6852,23.3190],q:"National Palace of Culture, Sofia",cls:"walk",sun:1,
 d:"L'enorme centro congressi in cemento degli anni Ottanta, simbolo della Sofia socialista, in mezzo a un grande parco con fontane. È un posto per camminare e vedere l'architettura; sullo sfondo si vede il monte Vitosha.",
 m:"Il parco intorno è sempre accessibile. Dentro si entra di solito per eventi o per le visite guidate (orari della scheda Google 9–20 nei giorni feriali e 10–20 nel fine settimana, da confermare): non sempre si può entrare liberamente."},
socialist:{t:"Museo dell'arte socialista",z:"F",p:5,min:60,id:75,max:100,pos:[42.6660,23.3580],q:"Museum of Socialist Art, Sofia",cls:"",
 win:function(wd){return wd===0?[0,0]:[10*60,17*60+30]},
 d:"Un museo e un parco con le statue gigantesche dell'epoca comunista bulgara: Lenin, operai e soldati in bronzo e pietra, tolti dalle piazze dopo il 1989. All'interno ci sono dipinti e manifesti.",
 m:"Aperto da martedì a domenica 10–18, biglietteria fino alle 17:30, chiuso il lunedì e nei giorni festivi (sito della Galleria Nazionale). Biglietto circa 4 € (8 leva = 4,09 € sul sito prima dell'euro; ridotto circa 2 €, giovedì circa 1,50 €: importo in euro da confermare). Il parco con le statue si vede anche quando l'interno è chiuso. È a circa 5 km dal centro (periferia sud-est)."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","serdica",5,"walk","A piedi dall'uscita della metro Serdika, circa 5 minuti: le rovine si vedono già nel passaggio della stazione.","A piedi fino alla metro Serdika, circa 5 minuti.",{f:[W([[42.6978,23.3214],[42.6970,23.3230]])],r:[W([[42.6970,23.3230],[42.6978,23.3214]])]});
P2("start","banya",6,"walk","A piedi dalla metro Serdika lungo il viale Maria Luiza fino alla moschea, circa 6 minuti.","A piedi fino alla metro Serdika, circa 6 minuti.",{f:[W([[42.6978,23.3214],[42.6995,23.3226]])],r:[W([[42.6995,23.3226],[42.6978,23.3214]])]});
P2("serdica","banya",7,"walk","A piedi lungo il viale Maria Luiza fino alla moschea, circa 7 minuti.","A piedi dalla moschea fino al Largo, circa 7 minuti.",{f:[W([[42.6970,23.3230],[42.6995,23.3226]])],r:[W([[42.6995,23.3226],[42.6970,23.3230]])]});
P2("serdica","vitosha",6,"walk","A piedi per la piazza di Sveta Nedelya e il viale Vitosha, circa 6 minuti.","A piedi per il viale Vitosha fino al Largo, circa 6 minuti.",{f:[W([[42.6970,23.3230],[42.6948,23.3208]])],r:[W([[42.6948,23.3208],[42.6970,23.3230]])]});
P2("start","archeo",7,"walk","A piedi dal Largo lungo il viale Dondukov fino al museo, circa 7 minuti.","A piedi fino alla metro Serdika, circa 7 minuti.",{f:[W([[42.6978,23.3214],[42.6964,23.3246]])],r:[W([[42.6964,23.3246],[42.6978,23.3214]])]});
P2("serdica","archeo",5,"walk","A piedi dal Largo fino al museo, circa 5 minuti.","A piedi fino al Largo, circa 5 minuti.",{f:[W([[42.6970,23.3230],[42.6964,23.3246]])],r:[W([[42.6964,23.3246],[42.6970,23.3230]])]});
P2("archeo","nevsky",12,"walk","A piedi lungo il viale Tsar Osvoboditel, quello con i mattoni gialli, passando dal Teatro Ivan Vazov, fino alla cattedrale, circa 12 minuti.","A piedi lungo il viale dei mattoni gialli fino al museo, circa 12 minuti.",{f:[W([[42.6964,23.3246],[42.6955,23.3290],[42.6960,23.3325]])],r:[W([[42.6960,23.3325],[42.6955,23.3290],[42.6964,23.3246]])]});
P2("archeo","sofiachurch",10,"walk","A piedi lungo il viale Tsar Osvoboditel fino alla basilica di Santa Sofia, circa 10 minuti.","A piedi fino al museo, circa 10 minuti.",{f:[W([[42.6964,23.3246],[42.6955,23.3289],[42.6966,23.3313]])],r:[W([[42.6966,23.3313],[42.6955,23.3289],[42.6964,23.3246]])]});
P2("start","nevsky",15,"walk","A piedi dal Largo per il viale Tsar Osvoboditel fino alla cattedrale, circa 15 minuti.","A piedi fino al Largo e alla metro Serdika, circa 15 minuti. Oppure la metro «Sofiyski Universitet» a pochi passi dalla cattedrale.",{f:[W([[42.6978,23.3214],[42.6955,23.3290],[42.6960,23.3325]])],r:[W([[42.6960,23.3325],[42.6955,23.3290],[42.6978,23.3214]])]});
P2("vitosha","ndk",17,"walk","A piedi lungo il viale Vitosha, che sale fino al Palazzo della Cultura, circa 17 minuti.","A piedi lungo il viale Vitosha verso il centro, circa 17 minuti.",{f:[W([[42.6948,23.3208],[42.6852,23.3190]])],r:[W([[42.6852,23.3190],[42.6948,23.3208]])]});
P2("start","ndk",20,"walk","A piedi lungo il viale Vitosha fino al Palazzo della Cultura, circa 20 minuti.","A piedi lungo il viale Vitosha fino a Serdika, circa 20 minuti.",{f:[W([[42.6978,23.3214],[42.6948,23.3208],[42.6852,23.3190]])],r:[W([[42.6852,23.3190],[42.6948,23.3208],[42.6978,23.3214]])]});
P2("start","boyana",35,"metro","In taxi circa 20 minuti (8 km) dal centro. In alternativa autobus 64 (fermata Boyansko Hanche) o 107 (fermata Boyanska tsarkva): linee e capolinea da controllare su Google Maps. Calcola 10–15 minuti in più per l'attesa all'ingresso.","In taxi o in autobus 64 o 107 verso il centro, circa 35 minuti.",{f:[{w:[[42.6978,23.3214],[42.6446,23.2662]],dash:1}],r:[{w:[[42.6446,23.2662],[42.6978,23.3214]],dash:1}]});
P2("start","socialist",25,"metro","In taxi o con i mezzi, circa 25 minuti (5 km, quartiere Iztok): Google Maps ti indica la linea migliore.","In taxi o con i mezzi verso Serdika, circa 25 minuti.",{f:[{w:[[42.6978,23.3214],[42.6660,23.3580]],dash:1}],r:[{w:[[42.6660,23.3580],[42.6978,23.3214]],dash:1}]});
/* ritorno in aeroporto: metro da Serdika */
var RET={
SOF:{
 A:{min:45,txt:"Metro da Serdika fino alla stazione dell'aeroporto, sotto il Terminal 2 (circa 20–30 minuti, tempo da guide recenti); se parti dal Terminal 1 prendi la navetta gratuita dal Terminal 2. Biglietto circa 0,80 €, da pagare con carta ai tornelli. Occhio all'ultima corsa, poco prima di mezzanotte; in alternativa il taxi o l'autobus 84 o 184.",g:[["mt","Serdika","Aeroporto"]]}}
};
var ARR={
SOF:[["mt","Aeroporto","Serdika"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e fasce di prezzo da schede Google e recensioni di ottobre 2026, non letti sui siti dei locali: da confermare */
var V={
banitsa:{n:"Sofiyska Banitsa",a:"Graf Ignatiev 7A",z:"A",r:"4,5",pos:[42.6938,23.3232],h:["07:00-18:00","07:00-18:00","07:00-18:00","07:00-18:00","07:00-18:00","08:00-15:00","08:00-15:00"],
 d:"Un piccolo forno specializzato in banitsa, la sfoglia con formaggio bianco, spinaci o zucca che i bulgari mangiano a colazione, da accompagnare con ayran (bevanda di yogurt) o boza.",pr:"Una banitsa costa di solito 2–4 € con una bevanda (stima, listino non visto). Orari dalla scheda Google, da confermare."},
izzy:{n:"Izzy's Coffee and Brunch",a:"Knyaginya Maria Luiza 17",z:"A",r:"4,8",pos:[42.6988,23.3215],h:["09:00-17:00","09:00-17:00","09:00-17:00","09:00-17:00","09:00-17:00","09:00-21:30","09:00-21:30"],
 d:"Un caffè di tendenza a due passi dalla moschea Banya Bashi: uova alla Benedict, toast con avocado, torte e caffè curato, in un cortile pieno di graffiti.",pr:"Un brunch costa intorno ai 8–14 € (fascia «€€» su Google; listino non visto). Orari dalla scheda Google, da confermare."},
mabaker:{n:"Café Ma Baker",a:"Vitosha 44",z:"A",r:"4,4",pos:[42.6910,23.3193],h:["07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","09:00-19:00","09:00-19:00"],
 d:"Un piccolo caffè-forno sul viale Vitosha: croissant, dolci e panini freschi, con qualche tavolino all'aperto in una via laterale.",pr:"Un caffè con un dolce costa intorno ai 4–7 € (fascia «€€»; listino non visto). Orari dalla scheda Google, da confermare."},
hlebar:{n:"HleBar",a:"Tsar Shishman 27",z:"B",r:"4,3",pos:[42.6903,23.3288],h:D7("07:30-21:00"),
 d:"Una panetteria con tavoli, in una via tranquilla del centro: pane fatto in casa, banitsa, polpette e piatti semplici del giorno, in un ambiente accogliente con un piano di sopra.",pr:"Una banitsa e un caffè sono 4–8 €, un piatto del giorno 8–12 € (fascia «€€», stima; listino non visto). Il pane finisce presto. Orari dalla scheda Google, da confermare."},
gevrek:{n:"Gevrek Bagels",a:"Georgi Benkovski 6",z:"B",r:"4,7",pos:[42.6949,23.3282],h:["","09:30-17:00","09:30-17:00","09:30-17:00","09:30-17:00","10:00-17:00","10:00-17:00"],
 d:"Una bagelleria piccola e molto amata vicino al Teatro Nazionale e al parco: bagel caldi con tante farce, anche con uova e pancetta, da mangiare nel parco vicino. Ha poco spazio per sedersi.",pr:"Un bagel costa intorno ai 3–6 € (stima, listino non visto). Chiuso il lunedì. Orari dalla scheda Google, da confermare."},
sunmoon:{n:"Sun Moon",a:"6 Septemvri 39",z:"B",r:"4,4",pos:[42.6896,23.3254],h:D7("09:00-22:00"),
 d:"Un locale vegetariano a due passi dalla zona pedonale, con molti piatti anche vegani, pane fatto in casa, banitsa e dolci. La cucina è casalinga e il servizio gentile.",pr:"Un pranzo per due con bevande è intorno ai 23 € (recensione recente, fascia «€€»; listino non visto). Orari dalla scheda Google, da confermare."},
sweetsalty:{n:"Sweet and Salty Bakery/Cafe",a:"Vitosha 62A",z:"C",r:"4,3",pos:[42.6892,23.3185],h:D7("08:00-20:00"),
 d:"Un caffè-forno per colazione e brunch sul viale Vitosha, con dolci, torte salate e succhi fatti in casa; molte scelte vegetariane e vegane.",pr:"Una colazione costa intorno ai 6–12 € (fascia «€€»; listino non visto). Orari dalla scheda Google, da confermare."},
supastar:{n:"Supa Star",a:"Tsar Shishman 8",z:"B",r:"4,6",pos:[42.6927,23.3311],h:["11:00-20:00","11:00-20:00","11:00-20:00","11:00-20:00","11:00-20:00","12:00-20:00","12:00-19:00"],
 d:"Un locale di zuppe di ogni tipo, di carne, vegetariane e vegane, con pane integrale cotto sul posto: pranzo caldo, veloce e leggero, con tavoli al piano di sopra.",pr:"Una zuppa costa circa 4,5–6 € (recensioni recenti; listino non visto). Orari dalla scheda Google, da confermare."},
filiika:{n:"Filiika",a:"Graf Ignatiev 14",z:"A",r:"4,9",pos:[42.6932,23.3231],h:["12:00-19:00","12:00-19:00","12:00-19:00","12:00-19:00","12:00-20:00","12:00-20:00","12:00-18:00"],
 d:"Una tavola calda nel vicolo: una decina di toast caldi con farce diverse, lyutenitsa (salsa di peperoni) e sale alle erbe fatti in casa. Il titolare è molto gentile e consiglia cosa assaggiare.",pr:"Un toast costa intorno ai 3–6 € (fascia «€», stima; listino non visto). Orari dalla scheda Google, da confermare."},
sonya:{n:"Kuhnyata na Sonya",a:"Mayor Yuriy Gagarin 27",z:"F",r:"4,8",pos:[42.6710,23.3632],h:["07:30-15:30","07:30-15:30","07:30-15:30","07:30-15:30","07:30-15:30","",""],
 d:"Una mensa vegetariana nel quartiere Iztok, comoda dopo il Museo dell'arte socialista: ogni giorno un menù diverso, con zuppe, insalate e piatti caldi.",pr:"Un pranzo costa intorno ai 6–10 € (fascia «€€», stima; listino non visto). Chiuso il sabato e la domenica. Orari dalla scheda Google, da confermare."},
moma:{n:"Moma Bulgarian Food & Wine",a:"Solunska 28",z:"A",r:"4,2",pos:[42.6930,23.3188],h:D7("12:30-23:30"),
 d:"Un ristorante di cucina bulgara su tre piani con giardino, vicino al viale Vitosha: antipasti con lyutenitsa e formaggi, fagioli al peperoncino, agnello al forno e vini locali (Rubin, Mavrud). Meglio prenotare per cena.",pr:"Una cena con antipasto e piatto principale è intorno ai 18–28 € a persona (fascia «€€€»; listino non visto). Orari dalla scheda Google, da confermare."},
hadjcellars:{n:"Hadjidraganovite Izbi",a:"Hristo Belchev 18",z:"A",r:"4,5",pos:[42.6929,23.3212],h:D7("11:30-23:00"),
 d:"Una taverna di cantine con pareti di pietra, botti e arredi tradizionali: piatti di carne alla griglia, insalata shopska, affettati e vini bulgari. Alla sera spesso c'è musica dal vivo.",pr:"Una cena intorno ai 18–28 € a persona (fascia «€€€»; listino non visto). Orari dalla scheda Google, da confermare."},
izbata:{n:"Izbata Tavern",a:"Slavyanska 18",z:"B",r:"4,4",pos:[42.6925,23.3298],h:["11:30-22:30","11:30-22:30","11:30-22:30","11:30-22:30","11:30-22:30","11:30-22:30","11:00-22:30"],
 d:"Una taverna con arredi tradizionali che propone piatti bulgari classici in porzioni abbondanti: kavarma di pollo, insalate e antipasti freschi fatti ogni giorno, birra e vino locali.",pr:"Un piatto principale con pane e antipasto sta intorno ai 18–25 € (recensione recente, fascia «€€€»; listino non visto). Orari dalla scheda Google, da confermare."},
manastirska:{n:"Manastirska Magernitsa",a:"Han Asparuh 67",z:"B",r:"4,3",pos:[42.6893,23.3246],h:D7("12:00-23:00"),
 d:"Un ristorante in una casa antica, con ricette ispirate ai monasteri bulgari: pane fatto in casa, salsicce affumicate, funghi al burro, stufati e il famoso vino di lamponi. Atmosfera rustica, ambiente quieto.",pr:"Una cena intorno ai 18–28 € a persona (fascia «€€€»; listino non visto). Le recensioni sono miste sul servizio. Orari dalla scheda Google, da confermare."},
hadjhouses:{n:"Hadjidraganovite Kashti",a:"Kozloduy 75",z:"D",r:"4,5",pos:[42.7066,23.3226],h:D7("11:30-23:30"),
 d:"Il ristorante delle «case» di Hadjidraganov, vicino alla stazione centrale e al mercato Zhenski Pazar: cucina tradizionale con grigliate, stinco di maiale e agnello, e musica dal vivo la sera. Conviene prenotare.",pr:"Una cena intorno ai 18–28 € a persona (fascia «€€€»; listino non visto). Orari dalla scheda Google, da confermare."},
podlipite:{n:"Pod Lipite (Sotto i tigli)",a:"Elin Pelin 1",z:"C",r:"4,4",pos:[42.6818,23.3355],h:D7("12:00-23:00"),
 d:"Una storica trattoria del 1926, monumento culturale, nel quartiere Lozenets: cucina bulgara casalinga con verdure e carne della propria fattoria, insalata shopska, kachamak (polenta con formaggio) e grigliate. Si consiglia di prenotare.",pr:"Una cena intorno ai 15–25 € a persona (fascia «€€€», stima; listino non visto). Secondo una recensione la cucina chiude alle 21:30. Orari dalla scheda Google, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["banitsa","izzy","mabaker"],B:["hlebar","gevrek","sunmoon"],C:["sweetsalty","mabaker"],D:["banitsa","hlebar"],E:["sweetsalty","mabaker"],F:["hlebar","gevrek"]},
pra:{A:["filiika","sunmoon","banitsa"],B:["supastar","gevrek","sunmoon"],C:["sweetsalty","supastar"],D:["hadjhouses","filiika"],E:["sweetsalty","supastar"],F:["sonya","supastar"]},
cen:{A:["moma","hadjcellars"],B:["izbata","manastirska","hadjcellars"],C:["podlipite","moma"],D:["hadjhouses","hadjcellars"],E:["podlipite","moma"],F:["izbata","manastirska"]},
snk:{A:["filiika","izzy","mabaker"],B:["hlebar","gevrek"],C:["sweetsalty"],D:["banitsa"],E:["sweetsalty"],F:["gevrek","hlebar"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Serdica, Largo e viale Vitosha",acts:["serdica","vitosha","banya"],need:200,core:1},
{id:"chiese",t:"Cattedrale Nevskij, Santa Sofia e museo archeologico",acts:["nevsky","sofiachurch","archeo"],need:230,core:1},
{id:"boyana",t:"Boyana e Palazzo della Cultura",acts:["boyana","ndk"],need:210,core:1},
{id:"soc",t:"Museo dell'arte socialista",acts:["socialist"],need:100}
];
var ORDER=["nevsky","serdica","vitosha","archeo","boyana","banya","sofiachurch","ndk","socialist"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cen","Centro (Serdika, Largo, viale Vitosha)",[42.6970,23.3225],"A"],
["nev","Cattedrale Nevskij e Università",[42.6950,23.3310],"B"],
["ndk","Palazzo della Cultura e sud del viale Vitosha",[42.6850,23.3190],"C"],
["sta","Stazione centrale e mercato Zhenski Pazar",[42.7060,23.3215],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[42.6978,23.3214],""]
];
/* imposta di soggiorno: Sofia applica una tassa comunale a notte per persona, pochi centesimi o pochi euro a seconda delle stelle (cifre della proposta del Comune del 2024, in vigore da confermare) */
var TAX=[["h5","Hotel 4–5 stelle",1.25],["h3","Hotel fino a 3 stelle, B&B o appartamento",0.75],["host","Ostello o struttura economica",0.5],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Banitsa sas sirene","sfoglia ripiena di formaggio bianco (sirene), la colazione bulgara per eccellenza."],["Mekitsa","frittella di pasta lievitata, con zucchero a velo, marmellata o formaggio."],["Ayran ili boza","ayran: bevanda salata di yogurt; boza: bevanda dolce di cereali fermentati."]],
pra:[["Shopska salata","insalata di pomodori, cetrioli e cipolla con formaggio bianco grattugiato sopra: ovunque."],["Kebapche i kyufte","spiedino e polpetta di carne macinata alla griglia, con pane e patatine."],["Supa","zuppa del giorno: lenticchie, fagioli o verdure."],["Tost ili sandvich","toast caldo ripieno, per una pausa veloce."]],
cen:[["Kavarma","stufato di carne con verdure e spezie, servito in tegamino di terracotta."],["Moussaka","la versione bulgara: patate e carne macinata con una crema di yogurt gratinata."],["Svinski dzholan","stinco di maiale al forno con verdure."],["Sarmi","involtini di foglie di vite o di cavolo ripieni di riso e carne."],["Baklava","il dolce di pasta sfoglia, noci e sciroppo."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Le cupole dorate della cattedrale Nevskij","Foto","Le cupole d'oro e il campanile, meglio dal parco di fronte o dal lato di piazza Aleksandr Nevskij, al mattino con il sole di lato.",[42.6957,23.3318],"Alexander Nevsky Cathedral, Sofia","nevsky"],
["🤳","La Chiesa Russa","Selfie","Le cinque cupole dorate sul tetto verde, con il verde dei giardini davanti.",[42.6957,23.3289],"Church of St. Nicholas the Wonderworker, Sofia","sofiachurch"],
["📷","La basilica di Santa Sofia","Foto","Le mura di mattoni rossi con il giardino e gli alberi intorno.",[42.6966,23.3313],"St. Sofia Basilica, Sofia","sofiachurch"],
["📷","Le rovine di Serdica","Foto","Le strade romane in basso nel passaggio della metro, con i palazzi moderni sopra.",[42.6977,23.3217],"Ancient Serdica Complex, Sofia","serdica"],
["📷","La Rotonda di San Giorgio","Foto","La chiesetta di mattoni nascosta nel cortile tra palazzi socialisti, un contrasto fotografico.",[42.6969,23.3229],"Church of St. George Rotunda, Sofia","serdica"],
["📷","Sveta Nedelya sul Largo","Foto","La cattedrale con la grande cupola, vista dalla piazza.",[42.6967,23.3213],"Sveta Nedelya Church, Sofia","serdica"],
["📷","Il minareto di Banya Bashi","Foto","La moschea con il minareto, di fronte alle terme e ai palazzi del viale Maria Luiza.",[42.6995,23.3226],"Banya Bashi Mosque, Sofia","banya"],
["📷","Il Teatro Ivan Vazov","Foto","La facciata chiara del teatro dietro le fontane del Giardino della Città, ancora più bella di sera quando è illuminata.",[42.6944,23.3261],"Ivan Vazov National Theater, Sofia","vitosha"],
["📷","Il monte Vitosha dal viale","Foto","In fondo al viale Vitosha, nelle giornate limpide, si vede la montagna sopra i tetti.",[42.6930,23.3198],"Vitosha Boulevard, Sofia","vitosha"],
["📷","Il Museo Archeologico","Foto","L'ex moschea con le cupole bianche, nel cuore del centro.",[42.6964,23.3246],"National Archaeological Museum, Sofia","archeo"],
["📷","Gli affreschi fuori da Boyana","Foto","All'interno non si fotografa: la chiesetta e il giardino si fotografano da fuori, con i grandi alberi intorno.",[42.6446,23.2662],"Boyana Church, Sofia","boyana"],
["📷","Il Palazzo della Cultura","Foto","Il blocco di cemento e le fontane del parco, con il Vitosha sullo sfondo al tramonto.",[42.6852,23.3190],"National Palace of Culture, Sofia","ndk"],
["🤳","Le statue socialiste","Selfie","Le statue giganti dell'era comunista nel parco, un'ambientazione particolare per un selfie.",[42.6660,23.3580],"Museum of Socialist Art, Sofia","socialist"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2026-12-31",t:"Bulgaria in euro, ma i prezzi sono ancora segnati in due valute",x:"La Bulgaria usa l'euro dal 1° gennaio 2026, quindi non serve cambiare denaro. Alcuni cartellini o scontrini riportano ancora il prezzo in leva accanto a quello in euro: il cambio fisso è 1 € = 1,95583 leva."},
{from:"2026-10-14",to:"2026-10-31",t:"Boyana: orari invernali dal 1° novembre",x:"La chiesa di Boyana è aperta 9:30–18 fino al 31 ottobre; dal 1° novembre l'orario cambia a 9–17:30 (biglietteria fino alle 17). Entrano pochi visitatori alla volta: nelle ore di punta si aspetta."},
{from:"2026-10-14",to:"2027-03-31",t:"Museo Archeologico: orari invernali da confermare",x:"Le fonti consultate danno l'orario estivo (10–18). Controlla i giorni di apertura invernali su naim.bg prima di andare."},
{from:"2026-12-20",to:"2027-01-03",t:"Natale e Capodanno: musei e Cripta chiusi",x:"La Galleria Nazionale (Cripta delle icone e Museo dell'arte socialista) è chiusa nei giorni festivi, a Natale e a Capodanno. Il 24, 25 e 26 dicembre e il 1° gennaio molti locali e negozi riducono gli orari."}
];
/* clima medio di Sofia (indicativo, massime/minime) */
var CLIM=[[3,-3],[6,-2],[11,1],[17,5],[22,9],[26,13],[29,15],[29,15],[24,11],[17,6],[10,2],[4,-1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Sofia: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="nevsky"&&WD===0)meta+=" Oggi è lunedì: la Cripta delle icone è chiusa, resta aperta la cattedrale.";
if(it.id==="nevsky"&&WD===3)meta+=" Oggi è giovedì: la Cripta delle icone costa solo 2 €.";
if(it.id==="serdica"&&WD===0)meta+=" Oggi è lunedì: il museo dei resti di Serdica è chiuso, ma le rovine nel passaggio della metro si vedono lo stesso.";
if(it.id==="socialist"&&WD===0)meta+=" Oggi è lunedì: il museo è chiuso, ma il parco con le statue si vede da fuori.";
if(it.id==="banya"&&WD===5)meta+=" Oggi è sabato: la Sinagoga è chiusa.";
return meta}
Object.assign(C,{id:"sofia",n:"Sofia",cn:"Bulgaria",e:"⛪",flag:"🇧🇬",col:["#00966e","#d62612","#e8e8e8"],k:"sofia bulgaria",
TZ:"Europe/Sofia",LL:[42.6977,23.3219],CC:"bg",QN:"Sofia",BK:"Sofia",ARE:/sofia|софия|\b1[0-7][0-9]{2}\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"bg-BG",LANGN:"bulgaro",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Serdika",q:"Serdika metro station, Sofia"},
SINGLE:{acts:["nevsky","serdica","vitosha","archeo"],ins:[]},
EXCL:[],
DICON:{nevsky:"⛪",serdica:"🏛️",banya:"🕌",vitosha:"🛍️",archeo:"🏺",sofiachurch:"⛪",boyana:"🎨",ndk:"🏢",socialist:"🗿"},
ZN:{A:"nel centro, tra Serdika e il viale Vitosha",B:"intorno alla cattedrale Nevskij e a Tsar Shishman",C:"verso il Palazzo della Cultura",D:"verso la stazione centrale",E:"verso Boyana",F:"nel quartiere Iztok"},
NEAR:{col:"forno o caffè",pra:"locale veloce o zuppa",cen:"locale tipico",snk:"forno o caffè"},
SE:{banitsa:"🥐",izzy:"🍳",mabaker:"🥐",hlebar:"🥖",gevrek:"🥯",sunmoon:"🥗",sweetsalty:"🧁",supastar:"🍲",filiika:"🥪",sonya:"🥗",moma:"🍷",hadjcellars:"🍖",izbata:"🍽️",manastirska:"🍽️",hadjhouses:"🍖",podlipite:"🍽️"},
TR:{one:0.8,cap:2,lbl:"Metro, tram, filobus e autobus (Sofia)",
 air:{SOF:{one:0.8,n:"Metro dall'aeroporto (0,80 €)"}},
 passes:[
 {n:"Carta giornaliera",d:1,max:1,p:2,note:"La carta giornaliera costa 2 € e vale su tutti i mezzi urbani di Sofia per il giorno di calendario. La carta da 24 ore (3 €) include anche i mezzi notturni."}],
 note:"Prezzi 2026 dal sito della metro di Sofia: corsa singola 0,80 € (30 minuti con cambi) o 1,10 € (60 minuti con cambi), carta giornaliera 2 €, carta da 24 ore 3 €, carta da 72 ore 7,60 €. La metro si paga anche con carta contactless ai tornelli. Una guida di luglio 2026 indica 1 € per il biglietto della metro dell'aeroporto e degli autobus: i prezzi possono variare. Il centro si gira bene a piedi: i mezzi servono soprattutto per l'aeroporto, Boyana e il Museo dell'arte socialista."},
FOOD:{co:[5,"Colazione al forno o al caffè"],pr:[8,"Pranzo (zuppa, toast o piatto del giorno)"],ce:[18,"Cena (cucina bulgara)"],sp:[3,"Spuntini e dolci"]},
T:{ride:"In metro, bus o taxi",move:"quasi tutto a piedi, con qualche tratto in metro o in taxi",bags:"«Може ли да оставя багажа си тук?» (Mòzhe li da ostàvia bagàzha si tuk?)",bagsPM:"«Може ли да оставя багажа си тук до следобед?»",bagsAM:"«Може ли да оставя багажа си тук до обед?»",
pra:"Un locale veloce o una zuppa",praZ:{A:"Sul viale Vitosha i locali con i tavolini in strada costano di più: nelle vie laterali (Graf Ignatiev, Tsar Shishman) si mangia meglio e per meno.",B:"Intorno a Tsar Shishman ci sono molte zuppe, bagel e forni per un pranzo veloce e a buon prezzo."},
freeLong:"Qualche idea: una sosta in un forno con una banitsa e un caffè, una passeggiata nel Giardino della Città o nel parco davanti alla cattedrale, un bagno di rovine romane al Largo o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè del viale Vitosha.",
remind:"Per Boyana conviene prenotare (ingresso contingentato, 9–10 persone alla volta). Cattedrale e chiese: spalle e ginocchia coperte. Porta documento: serve anche per la Sinagoga.",
rain1:"Al coperto: Museo Archeologico, Cripta delle icone, cattedrale Nevskij, Santa Sofia e i caffè del centro.",
rainM:"Al coperto: Museo Archeologico, Cripta delle icone, Museo dell'arte socialista (interno), chiese e caffè.",
water:"L'acqua del rubinetto di Sofia è potabile: riempite la borraccia. Ci sono fontanelle pubbliche e, nel centro, una fontana d'acqua minerale tiepida vicino alle ex Terme Centrali, davanti a Banya Bashi (da confermare). Attivate «Acqua» sulla mappa.",
kitchen:"A Sofia si pranza tra le 12 e le 15 e si cena dalle 18: la maggior parte dei ristoranti tradizionali serve fino alle 22–23, ma qualche locale chiude la cucina prima.",
night:[["🍷","Un bicchiere di vino bulgaro (Mavrud o Rubin) o una rakia, la grappa locale, in una taverna del centro."],["🕙","Le cucine servono fino alle 22–23; la metro ferma poco prima di mezzanotte, dopo ci sono i bus notturni (N4 verso l'aeroporto) e i taxi."],["☕","Molti forni aprono alle 7:30: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto si può bere)",
fuso:"Sofia è un'ora avanti rispetto all'Italia: sposta l'orologio avanti di un'ora",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per forni, zuppe e taverne tradizionali: una colazione sta intorno ai 4–8 €, un pranzo veloce intorno agli 8 € e una cena con antipasto e piatto principale intorno ai 18–25 €. Si paga quasi sempre con la carta; per mercati e piccoli forni tieni qualche euro in contanti.",
taxNote:"Sofia applica una piccola imposta di soggiorno, a notte e a persona, che varia con le stelle (pochi centesimi fino a circa 1,50 € secondo la proposta del Comune del 2024; l'importo in vigore va confermato). Spesso è già compresa nel prezzo dell'annuncio: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: almeno 4 stelle su Google, forni, taverne e caffè di quartiere, niente catene. Colazione sotto i 8–10 € e cena sotto i 25–30 € a persona. Orari e fasce di prezzo sono quelli delle schede Google e delle recensioni (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["La metro per il centro parte dal Terminal 2 e arriva a Serdika senza cambi: è la via più semplice. Se arrivi al Terminal 1, prendi prima la navetta gratuita.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto metro (0,80 € a corsa; carta giornaliera 2 €): contactless ai tornelli. La biglietteria dell'aeroporto accetta solo contanti",function(E){return true}],["boy","Prenota la chiesa di Boyana (ingresso contingentato; +359 2 959 09 39) e porta circa 6 € in contanti",["boyana"]],["syn","Documento d'identità per la Sinagoga (controllo di sicurezza all'ingresso)",["banya"]],["cov","Spalle e ginocchia coperte per cattedrale e chiese",["nevsky","sofiachurch","serdica"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per mercati, forni e la biglietteria della metro"]],
NUM:{1:["един","edin","èdin"],2:["двама","dvama","dvàma"],3:["трима","trima","trìma"],4:["четирима","chetirima","cetìrima"],5:["петима","petima","petìma"],6:["шестима","shestima","shèstima"],7:["седмина","sedmina","sedmìna"],8:["осмина","osmina","osmìna"],9:["деветима","devetima","devetìma"],10:["десетима","desetima","desetìma"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Добър ден / Добър вечер","dòbar den / dòbar vècer (Dobar den / Dobar vecher)"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Маса за "+(N===1?"един":nu[0])+", моля","màsa za "+(N===1?"èdin":nu[2])+", mòlia (Masa za "+(N===1?"edin":nu[1])+", molya)"],["Una banitsa e un caffè, per favore","Една баница и едно кафе, моля","èdna bànitsa i èdno kafè, mòlia (Edna banitsa i edno kafe, molya)"],["Acqua del rubinetto, per favore","Вода от чешмата, моля","vòda ot chèshmata, mòlia (Voda ot cheshmata, molya)"],["Il conto, per favore","Сметката, моля","smètkata, mòlia (Smetkata, molya)"],["Posso pagare con la carta?","Мога ли да платя с карта?","mòga li da plàtia s kàrta (Moga li da platya s karta?)"],["Quanto costa?","Колко струва?","kòlko strùva (Kolko struva?)"],["Dov'è la metro?","Къде е метрото?","kadè e metròto (Kade e metroto?)"],["Come si arriva all'aeroporto?","Как се стига до летището?","kak se stìga do lètishteto (Kak se stiga do letishteto?)"]];
if(M)fr=fr.concat([["Ho una prenotazione","Имам резервация","ìmam rezervàtsia (Imam rezervatsiya)"],["Posso lasciare i bagagli?","Може ли да оставя багажа си тук?","mòzhe li da ostàvia bagàzha si tuk (Mozhe li da ostavya bagazha si tuk?)"],["A che ora devo lasciare la stanza?","Кога трябва да освободя стаята?","kogà trìabva da osvobòdia stàiata (Koga tryabva da osvobodya stayata?)"]]);
return fr.concat([["Mi scusi","Извинете","izvinète (Izvinete)"],["Grazie mille!","Благодаря много!","blagodarià mnògo (Blagodarya mnogo)"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Sofia: "+(tx[2]?"circa "+tx[2].toFixed(2).replace(".",",")+" € a notte per persona ("+tx[1].toLowerCase()+", importo da confermare)":"non si paga se sei ospite di amici o parenti")+". Spesso è già compresa nel prezzo dell'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["Il centro (Serdika, Largo, viale Vitosha) è a pochi passi da quasi tutto: chi dorme qui fa il giro a piedi. La metro serve soprattutto per l'aeroporto."],
ZONES:[
["🚇 Metro, bus e biglietti",["La metro costa 0,80 € a corsa, la carta giornaliera 2 € e la carta da 24 ore 3 €. Si può pagare con la carta contactless ai tornelli.","I biglietti di carta si comprano nelle stazioni; alla stazione dell'aeroporto, secondo recensioni recenti, la biglietteria accetta solo contanti.","Autobus 84 e 184 vanno dall'aeroporto al centro, ma sono più lenti della metro.","La metro in genere finisce poco prima di mezzanotte; dopo ci sono i taxi e gli autobus notturni."]],
["⛪ Chiese e Cattedrale Nevskij",["La cattedrale Aleksandr Nevskij, la Chiesa Russa e Santa Sofia sono tutte vicine: si fanno a piedi in poco tempo.","Sono luoghi di culto attivi: spalle e ginocchia coperte, silenzio durante le funzioni.","La Cripta delle icone sotto la cattedrale è aperta da martedì a domenica 10–18 e il giovedì costa solo 2 €."],["nevsky","sofiachurch"]],
["🏛️ Serdica e il centro",["Le rovine di Serdica si vedono gratis a pochi passi dalla metro Serdika, nel passaggio sotterraneo e nel complesso accanto.","La Rotonda di San Giorgio è nel cortile tra i palazzi del Largo ed è il monumento più antico della città.","Vicino ci sono la moschea Banya Bashi, la Sinagoga e il Mercato Centrale: tre ambienti diversi in poche centinaia di metri."],["serdica","banya"]],
["🥣 Mangiare a Sofia",["Si mangia bene e a prezzi più bassi che in molte altre capitali europee: banitsa a colazione, zuppe o kebapche a pranzo, cucina bulgara a cena.","Nelle vie laterali (Graf Ignatiev, Tsar Shishman) si spende meno che sul viale Vitosha.","In alcuni locali turistici è aggiunto in automatico il 10% di servizio: controlla il conto."],["banitsa","supastar","moma"]],
["🌅 Un giorno fuori Sofia",["Boyana è già dentro la città e ci si arriva in taxi in 20 minuti.","Il Monastero di Rila, patrimonio UNESCO, è a circa due ore da Sofia: una gita lunga, meglio con un tour organizzato (non verificato)."]]],
WTIPS:["L'acqua del rubinetto di Sofia è potabile: riempi la borraccia in albergo o nei locali.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Vicino alle ex Terme Centrali, davanti a Banya Bashi, c'è una fontana d'acqua minerale tiepida: i locali la bevono (da confermare).","Le fontane monumentali, come quelle del Palazzo della Cultura, non sono da bere."],
GEN:["La Bulgaria usa l'euro dal 1° gennaio 2026 e fa parte dello spazio Schengen: basta la carta d'identità valida. Non serve cambiare denaro.","Sofia è un'ora avanti rispetto all'Italia.","In Bulgaria il cenno del capo è spesso il contrario del nostro: scuotere la testa da un lato all'altro significa «sì», annuire significa «no». Per evitare equivoci, di' anche «da» (sì) e «ne» (no).","Mancia: si lascia di solito il 10% al tavolo; controlla se è già incluso nel conto.","Nel frasario la pronuncia italiana è approssimata: «sh» come in «scena», «zh» come la «j» francese, «a» muta («ъ») come una «a» appena accennata.","Uber e Grab non sono disponibili: usa i taxi con tassametro ufficiali o un'app locale.","Controlla orari e prezzi qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Metro di Sofia: <a href="https://www.metropolitan.bg/en" target="_blank" rel="noopener">metropolitan.bg</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Sofia: <a href="https://ambsofia.esteri.it" target="_blank" rel="noopener">ambsofia.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati a Sofia. In passato ci sono stati scioperi e proteste dei lavoratori dei trasporti urbani che hanno fermato bus e tram per qualche giorno, con la metro in funzione. Nei giorni prima controllate <a href="https://www.metropolitan.bg/en" target="_blank" rel="noopener">metropolitan.bg</a> e le notizie locali.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="360" cy="24" r="10"/><path d="M0 106 V80 Q40 52 90 66 Q130 40 180 62 Q230 38 280 60 Q330 44 400 74 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M12 106 V82 H50 V106 Z M12 82 Q31 52 50 82 Z M30 52 V44 H32 V52 Z M26 47 H36 V49 H26 Z"/></g>'+
'<g style="--k:2"><path d="M66 106 V76 H104 V106 Z M66 76 Q85 52 104 76 Z M84 52 V44 H86 V52 Z M112 106 V42 H118 V106 Z M110 42 L115 22 L120 42 Z"/></g>'+
'<g style="--k:3"><path d="M138 106 V72 H196 V106 Z M144 72 Q167 36 190 72 Z M164 38 V24 H170 V38 Z M166 24 V18 H168 V24 Z M142 72 Q148 58 154 72 Z M180 72 Q186 58 192 72 Z"/></g>'+
'<g style="--k:4"><path d="M214 106 V80 H290 V106 Z M214 80 Q224 62 234 80 Z M270 80 Q280 62 290 80 Z M232 80 Q252 34 272 80 Z M251 36 V22 H253 V36 Z M248 26 H256 V28 H248 Z M294 106 V40 H306 V106 Z M292 40 L300 18 L308 40 Z"/></g>'+
'<g style="--k:5"><path d="M326 106 V76 L346 62 H394 V106 Z M338 62 V50 H342 V62 Z M356 62 V54 H394 V62 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M72 90 v14 M92 90 v14 M146 88 v16 M168 88 v16 M188 88 v16"/><path d="M334 84 h50 M334 94 h50"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="40" cy="12" r="1.6"/><circle cx="120" cy="14" r="1.3"/><circle cx="204" cy="12" r="1.3"/><circle cx="250" cy="10" r="1.3"/><circle cx="318" cy="16" r="1.3"/><circle cx="388" cy="40" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.sofia);

;var n=window.CITIES["sofia"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["sofia"]);
