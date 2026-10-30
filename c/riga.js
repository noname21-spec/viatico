(function(o){
/* ===== Riga (dati verificati il 14 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.riga=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Riga ha un solo aeroporto commerciale */
var PAR={
RIX:{n:"Riga (RIX)",s:"Aeroporto Internazionale di Riga",url:"https://www.riga-airport.com/en",live:"Riga",inMin:35,buf:120,pos:[56.9236,23.9711],sd:"Aeroporto RIX · autobus 22",rt:"Dall'aeroporto: autobus 22 fino al centro (circa 25–30 minuti), poi a piedi o in tram fino alla Città Vecchia.",
 arr:"Dall'Italia si entra in Lettonia senza controllo passaporti (spazio Schengen). Riga ha un solo aeroporto, a circa 10 km a sud-ovest del centro. Dai voli dall'Italia arrivano in particolare airBaltic (Milano Malpensa, Roma, Pisa fino a fine novembre) e Ryanair (Milano Bergamo, Roma Ciampino, Treviso): i collegamenti cambiano con la stagione, quindi controlla sul sito dell'aeroporto o della compagnia quelli del tuo giorno. Dopo il ritiro bagagli cerca la fermata dell'autobus 22 fuori dal terminal: arriva in centro in circa 25–30 minuti, con una corsa ogni 10–20 minuti di giorno (primo autobus verso le 5:30, ultimo verso le 23:50; orari da una guida, da confermare su rigassatiksme.lv). In alternativa l'autobus 222, più rapido ma con meno fermate (2 €, da confermare), oppure un taxi o un'auto con app come Bolt. Riga non ha la metropolitana: dalle fermate del 22 vicino alla stazione si va a piedi alla Città Vecchia in 10–15 minuti.",
 tk:"Biglietto: l'autobus 22 costa 1,50 € se compri il biglietto prima (chioschi Narvesen, distributori automatici, app Mobilly o Rīgas satiksme) e 1,81 € se paghi il conducente con la carta, solo sul 22 (prezzi da liveriga.com e da una guida, ottobre 2026). Il biglietto va convalidato sul validatore arancione anche se hai pagato a bordo; i controllori fanno multe molto più alte del biglietto (importo da controllare). Il taxi costa in genere 15–25 € a tassametro fino alla Città Vecchia, con Bolt 10–18 € (stime da una guida, da confermare): usa i taxi in fila fuori dagli arrivi, non chi ti ferma dentro il terminal.",
 gm:"Riga International Airport, Mārupe",
 tips:["L'autobus 22 è l'unico mezzo pubblico per l'aeroporto: non c'è né treno né metropolitana. Se arrivi o riparti di notte controlla l'autobus notturno N22 (orari da confermare su rigassatiksme.lv).","Non salire su un taxi che ti viene offerto dentro il terminal: usa quelli in fila fuori dagli arrivi o prenota con Bolt.","Il biglietto di carta o l'app si convalidano a bordo, subito dopo essere saliti."]}
};
/* linee (tracciati indicativi) */
var SEG={
b22:{c:"#d32f2f",n:"Autobus 22 dall'aeroporto",p:[[56.9236,23.9711,"Aeroporto",2],[56.9440,24.1170,"Centro / Mercato Centrale",2]]},
tram:{c:"#2a7ab0",n:"Tram (linee 2, 4, 5, 6, 7, 10 intorno alla Città Vecchia)",p:[[56.9439,24.1157,"Mercato Centrale",2],[56.9477,24.1067,"Città Vecchia",2],[56.9590,24.1070,"Alberta iela",2]]}
};
var START=[56.9477,24.1067];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti; cl: giorni di chiusura (0 = lunedì) */
var STOPS={
oldtown:{t:"Piazza del Municipio e Casa delle Teste Nere",z:"A",p:1,min:40,id:60,max:90,pos:[56.9477,24.1067],q:"Rātslaukums, Rīga",cls:"",sun:1,tk:[10,"Casa delle Teste Nere (10 €)",1,1],
 win:function(wd){return[10*60,16*60+30]},
 d:"Il cuore della Città Vecchia: la piazza con la facciata ricostruita della Casa delle Teste Nere, un palazzo gotico del Quattrocento, e la statua di Rolando davanti. Tutt'intorno ci sono le strette vie medievali, i cortili e i caffè.",
 m:"La piazza si vede gratis sempre. La Casa delle Teste Nere è aperta tutti i giorni dalle 10 alle 17 (sito ufficiale melngalvjunams.lv), ma nelle giornate di eventi chiude: sul sito risultavano chiusi il 14, 15 e 16 ottobre e orario ridotto (10–14) il 28 ottobre, senza che l'anno fosse indicato, quindi da confermare. Biglietto 10 €; con caffè 12 €; ridotto 6 € per studenti e anziani; audioguida 4 €."},
peter:{t:"Chiesa di San Pietro e vista dalla torre",z:"A",p:1,min:45,id:60,max:90,pos:[56.9475,24.1096],q:"Saint Peter's Church, Rīga",cls:"",cl:[0],sun:1,tk:[9,"San Pietro: chiesa e torre (9 €)",1,1],
 d:"La chiesa gotica con la guglia altissima che domina il centro. Con un ascensore si sale sulla torre, a circa 72 metri, da dove si vede tutta Riga: i tetti rossi della Città Vecchia, il fiume Daugava e la città nuova.",
 m:"Biglietto unico per chiesa e torre: 9 € (7 € per studenti), gratis sotto i 7 anni (da una guida, non dal sito della chiesa: da confermare su peterbaznica.riga.lv). Chiusa il lunedì. Gli orari esatti cambiano con la stagione: di solito si apre a metà mattina e si chiude nel tardo pomeriggio, ma non ho trovato l'orario invernale aggiornato. Quando il cielo è coperto la torre perde interesse."},
dom:{t:"Cattedrale di Riga e Piazza del Duomo",z:"A",p:2,min:40,id:55,max:80,pos:[56.9492,24.1048],q:"Rīgas Doms, Rīga",cls:"",sun:1,tk:[5,"Cattedrale di Riga (5 €)",1,1],
 win:function(wd){return wd===6?[14*60,16*60+30]:[10*60,16*60+30]},
 d:"La più grande chiesa medievale dei Paesi Baltici, fondata nel 1211, con un interno ampio e luminoso, un enorme organo ottocentesco e un chiostro. La piazza davanti è piena di caffè e di tavoli all'aperto nella bella stagione.",
 m:"Aperta dal lunedì al sabato dalle 10 alle 17 e la domenica dalle 14 alle 17 (sito doms.lv). Ingresso 5 € per gli adulti, 3 € per ragazzi da 11 a 18 anni, gratis sotto i 10. Gli orari cambiano nella settimana: nel sito c'è un file con l'orario del 9–19 ottobre 2026, da controllare prima. Spesso la chiesa ospita concerti d'organo."},
tre:{t:"Tre Fratelli, Porta Svedese e Casa dei Gatti",z:"A",p:4,min:35,id:50,max:70,pos:[56.9495,24.1018],q:"Trīs brāļi, Mazā Pils iela 17, Rīga",cls:"walk",sun:1,
 d:"Una passeggiata nelle strade più antiche di Riga: i Tre Fratelli, tre case medievali affiancate, la Porta Svedese, l'unica porta rimasta delle mura, e la Casa dei Gatti, con i due gatti neri sul tetto, vicino a Piazza Livu.",
 m:"Sono tutti esterni e si vedono gratis, a ogni ora. Se hai tempo, entra nei cortili: spesso sono aperti e senza turisti."},
freedom:{t:"Monumento alla Libertà e parco del Canale",z:"B",p:2,min:30,id:45,max:70,pos:[56.9516,24.1133],q:"Brīvības piemineklis, Rīga",cls:"walk",sun:1,
 d:"Il monumento simbolo della Lettonia indipendente, una colonna di 42 metri con una figura di donna che sorregge tre stelle. Alle spalle c'è il parco intorno al canale cittadino (Bastejkalns), con i viali, i ponticelli e l'Opera Nazionale.",
 m:"Il monumento si vede sempre, gratis. Davanti c'è un cambio della guardia d'onore molto semplice: gli orari non li ho verificati. Il parco è liberamente accessibile; da dicembre a gennaio è illuminato."},
market:{t:"Mercato Centrale (hangar degli Zeppelin)",z:"C",p:2,min:60,id:75,max:110,pos:[56.9439,24.1157],q:"Rīgas Centrāltirgus, Nēģu iela 7, Rīga",cls:"walk",sun:1,
 win:function(wd){return[7*60+30,16*60]},
 d:"Uno dei più grandi mercati coperti d'Europa, in cinque ex hangar per Zeppelin tedeschi della Prima guerra mondiale. Banchi di pesce affumicato, carne, latticini, pane di segale, miele e, all'esterno, frutta e verdura. Ottimo per assaggiare pirāgi (fagottini di pancetta e cipolla) e acquistare qualcosa.",
 m:"L'ingresso è gratis. Il mercato è aperto ogni giorno: le aree esterne dalle 7 alle 18 e i padiglioni di solito dalle 7:30 alle 17–18 (centraltirgus.lv; i singoli banchi chiudono prima, specie nei giorni feriali). La sera dalle 17:30 c'è un mercato per i produttori agricoli (orari da confermare). Si paga spesso in contanti ai banchi piccoli."},
artn:{t:"Quartiere Art Nouveau (Alberta iela)",z:"B",p:1,min:45,id:60,max:90,pos:[56.9590,24.1070],q:"Alberta iela, Rīga",cls:"walk",sun:1,
 d:"Una via lunga mezzo chilometro con i palazzi liberty più incredibili d'Europa, quasi tutti progettati da Mikhail Eisenstein: facciate con maschere, sfingi, pavoni e figure femminili. Riga ha oltre 700 edifici in questo stile.",
 m:"Si cammina gratis. Quasi tutti i palazzi sono abitazioni private: si vedono da fuori. Per vedere gli interni c'è il museo Art Nouveau (tappa successiva). Alberta iela si trova a 15–20 minuti a piedi dalla Città Vecchia, o con un tram o un taxi breve."},
artnm:{t:"Museo Art Nouveau di Riga",z:"B",p:3,min:40,id:55,max:75,pos:[56.9588,24.1086],q:"Rīgas Jūgendstila muzejs, Alberta iela 12, Rīga",cls:"",cl:[0],sun:1,tk:[9,"Museo Art Nouveau (9 €)",1,1],
 win:function(wd){return[10*60,17*60+15]},
 d:"L'appartamento restaurato dell'architetto Konstantīns Pēkšēns, con mobili, decorazioni, piastrelle e una scala originali dei primi anni del Novecento. È il modo migliore per capire com'erano le case borghesi di Riga.",
 m:"Aperto da martedì a domenica dalle 10 alle 18, chiuso il lunedì (da una guida, non dal sito jugendstils.riga.lv: da confermare). Biglietto circa 9 € per gli adulti, 5 € per studenti e anziani. Gli orari cambiano nelle feste nazionali."},
occ:{t:"Museo dell'Occupazione della Lettonia",z:"A",p:3,min:70,id:90,max:130,pos:[56.9484,24.1125],q:"Latvijas Okupācijas muzejs, Rīga",cls:"",sun:1,tk:[8,"Museo dell'Occupazione (8 €)",1,1],
 win:function(wd){return[10*60,17*60]},
 d:"Il museo racconta il periodo dal 1940 al 1991, tra le occupazioni sovietica e nazista e la lotta per l'indipendenza: documenti, foto, oggetti e testimonianze di chi fu deportato in Siberia. Fa capire molto della Lettonia di oggi.",
 m:"Aperto tutti i giorni dalle 10 alle 18, chiuso l'1 gennaio, il 23–24 giugno e il 24, 25, 26 e 31 dicembre (sito okupacijasmuzejs.lv). Ingresso 8 €, studenti 5 €, audioguida 4 €; visite guidate alle 11, 12, 13, 14, 15 e 16. Gratis il 18 novembre. Il sito diceva «chiuso» al momento della lettura: controlla gli orari del giorno."},
lnma:{t:"Museo Nazionale d'Arte Lettone",z:"B",p:4,min:80,id:100,max:150,pos:[56.9582,24.1170],q:"Latvijas Nacionālais mākslas muzejs, Jaņa Rozentāla laukums 1, Rīga",cls:"",cl:[0],sun:1,
 win:function(wd){return wd===4?[10*60,19*60]:(wd>=5?[10*60,16*60+30]:[10*60,17*60+30])},
 d:"Un grande palazzo neobarocco dei primi del Novecento con l'arte lettone dal Settecento a oggi: pittori simbolisti, il realismo del periodo sovietico e le opere moderne. Si fa più in fretta se interessa solo la collezione permanente.",
 m:"Aperto da martedì a giovedì dalle 10 alle 18, venerdì fino alle 20, sabato e domenica 10–17; chiuso il lunedì e in alcune feste, come il 24–26 e il 31 dicembre (da una guida: da confermare su lnmm.gov.lv). Il biglietto cumulativo costa circa 15 €, la sola collezione permanente meno (le cifre trovate non sono coerenti: controlla il sito). L'ultima domenica del mese l'ingresso è gratuito."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
function WK(a,b,min,ta,tb,via){var A=a==="start"?START:STOPS[a].pos,B=b==="start"?START:STOPS[b].pos;var f=[A].concat(via||[]).concat([B]);var r=f.slice().reverse();P2(a,b,min,"walk",ta,tb,{f:[W(f)],r:[W(r)]})}
WK("start","oldtown",1,"Sei già in Rātslaukums, davanti alla Casa delle Teste Nere.","Sei già in Rātslaukums.");
WK("start","peter",3,"A piedi lungo Kaļķu iela fino a San Pietro, circa 3 minuti.","A piedi dalla chiesa di San Pietro a Rātslaukums, circa 3 minuti.");
WK("start","dom",5,"A piedi per Kaļķu iela e Jāņa sēta fino alla piazza della Cattedrale, circa 5 minuti.","A piedi dalla piazza della Cattedrale a Rātslaukums, circa 5 minuti.");
WK("start","tre",6,"A piedi per le vie della Città Vecchia fino alla Mazā Pils iela, circa 6 minuti.","A piedi dalla Mazā Pils iela a Rātslaukums, circa 6 minuti.");
WK("start","occ",6,"A piedi lungo Kaļķu iela fino al Museo dell'Occupazione, circa 6 minuti.","A piedi dal Museo dell'Occupazione a Rātslaukums, circa 6 minuti.");
WK("start","freedom",10,"A piedi lungo Kaļķu iela e Brīvības bulvāris fino al Monumento alla Libertà, circa 10 minuti.","A piedi dal Monumento alla Libertà lungo Kaļķu iela a Rātslaukums, circa 10 minuti.");
WK("start","market",12,"A piedi lungo Kaļķu iela e il lungofiume fino al Mercato Centrale, circa 12 minuti.","A piedi dal Mercato Centrale a Rātslaukums, circa 12 minuti.");
WK("start","artn",18,"A piedi lungo Elizabetes iela e Alberta iela, circa 18 minuti (oppure tram fino a Alberta iela).","A piedi dalla Alberta iela fino a Rātslaukums, circa 18 minuti.");
WK("start","lnma",18,"A piedi o in tram per Brīvības bulvāris fino al Museo Nazionale d'Arte, circa 18 minuti.","A piedi dal Museo d'Arte a Rātslaukums, circa 18 minuti.");
WK("peter","dom",5,"A piedi dalla chiesa di San Pietro alla Piazza del Duomo, circa 5 minuti.","A piedi dalla Piazza del Duomo alla chiesa di San Pietro, circa 5 minuti.");
WK("peter","oldtown",3,"A piedi da San Pietro a Rātslaukums, circa 3 minuti.","A piedi da Rātslaukums a San Pietro, circa 3 minuti.");
WK("oldtown","dom",5,"A piedi per Jāņa sēta fino alla piazza della Cattedrale, circa 5 minuti.","A piedi dalla Cattedrale a Rātslaukums, circa 5 minuti.");
WK("dom","tre",6,"A piedi per le vie intorno al castello fino ai Tre Fratelli, circa 6 minuti.","A piedi dai Tre Fratelli alla Cattedrale, circa 6 minuti.");
WK("oldtown","tre",6,"A piedi fino ai Tre Fratelli, circa 6 minuti.","A piedi da Mazā Pils iela a Rātslaukums, circa 6 minuti.");
WK("peter","occ",6,"A piedi da San Pietro fino al Museo dell'Occupazione, circa 6 minuti.","A piedi dal Museo dell'Occupazione a San Pietro, circa 6 minuti.");
WK("oldtown","occ",6,"A piedi da Rātslaukums al Museo dell'Occupazione, circa 6 minuti.","A piedi dal Museo dell'Occupazione a Rātslaukums, circa 6 minuti.");
WK("occ","freedom",6,"A piedi dal Museo dell'Occupazione al Monumento alla Libertà, circa 6 minuti.","A piedi dal Monumento alla Libertà al Museo dell'Occupazione, circa 6 minuti.");
WK("peter","freedom",10,"A piedi da San Pietro al Monumento alla Libertà, circa 10 minuti.","A piedi dal Monumento alla Libertà a San Pietro, circa 10 minuti.");
WK("oldtown","freedom",10,"A piedi da Rātslaukums al Monumento alla Libertà, circa 10 minuti.","A piedi dal Monumento alla Libertà a Rātslaukums, circa 10 minuti.");
WK("freedom","lnma",9,"A piedi per Brīvības bulvāris e il parco del canale fino al Museo d'Arte, circa 9 minuti.","A piedi dal Museo d'Arte al Monumento alla Libertà, circa 9 minuti.");
WK("freedom","artn",12,"A piedi lungo Elizabetes iela fino a Alberta iela, circa 12 minuti.","A piedi da Alberta iela al Monumento alla Libertà, circa 12 minuti.");
WK("lnma","artn",9,"A piedi per Elizabetes iela fino a Alberta iela, circa 9 minuti.","A piedi da Alberta iela al Museo d'Arte, circa 9 minuti.");
WK("artn","artnm",2,"Il museo è al numero 12 di Alberta iela, due minuti a piedi.","Due minuti a piedi lungo Alberta iela.");
WK("lnma","artnm",9,"A piedi per Elizabetes iela fino al Museo Art Nouveau, circa 9 minuti.","A piedi dal Museo Art Nouveau al Museo d'Arte, circa 9 minuti.");
WK("freedom","artnm",12,"A piedi lungo Elizabetes iela fino al Museo Art Nouveau, circa 12 minuti.","A piedi dal Museo Art Nouveau al Monumento alla Libertà, circa 12 minuti.");
WK("market","occ",8,"A piedi dal Mercato Centrale al Museo dell'Occupazione lungo il canale, circa 8 minuti.","A piedi dal Museo dell'Occupazione al Mercato Centrale, circa 8 minuti.");
WK("market","peter",10,"A piedi dal Mercato Centrale a San Pietro, circa 10 minuti.","A piedi da San Pietro al Mercato Centrale, circa 10 minuti.");
WK("market","freedom",14,"A piedi dal Mercato Centrale al Monumento alla Libertà, circa 14 minuti.","A piedi dal Monumento alla Libertà al Mercato Centrale, circa 14 minuti.");
/* ritorno in aeroporto: autobus 22 */
var RET={
RIX:{
 A:{min:45,txt:"Autobus 22 dalla zona del Mercato Centrale e della stazione fino all'aeroporto (circa 25–30 minuti, una corsa ogni 10–20 minuti di giorno). Biglietto da 1,50 € se comprato prima, 1,81 € se paghi il conducente con la carta. In alternativa Bolt (10–18 €) o un taxi.",g:[W([[56.9477,24.1067],[56.9440,24.1170]]),["b22","Centro / Mercato Centrale","Aeroporto"]]},
 B:{min:45,txt:"Dalla zona del centro a piedi o in tram fino alle fermate vicino al Mercato Centrale e alla stazione, poi autobus 22 per l'aeroporto (circa 25–30 minuti). Biglietto da 1,50 € se comprato prima. In alternativa Bolt o un taxi.",g:[["b22","Centro / Mercato Centrale","Aeroporto"]]},
 C:{min:40,txt:"Autobus 22 dalle fermate vicino al Mercato Centrale e alla stazione fino all'aeroporto (circa 25–30 minuti). Biglietto da 1,50 € se comprato prima.",g:[["b22","Centro / Mercato Centrale","Aeroporto"]]}}
};
var ARR={
RIX:[["b22","Aeroporto","Centro / Mercato Centrale"],W([[56.9440,24.1170],[56.9477,24.1067]])]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
milda:{n:"Milda",a:"Grēcinieku iela 26",z:"A",r:"4,5",pos:[56.9465,24.1076],h:["","12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-22:00"],
 d:"Un ristorante lettone in pieno centro storico con una cucina semplice e ben fatta: i pelēkie zirņi, piselli grigi con pancetta e panna acida, considerati il piatto nazionale, ma anche pelmeni e piatti di carne.",pr:"Fascia media (€€): un piatto principale sta intorno ai 10–16 € (listino non visto). Chiuso il lunedì. Orari da una guida, da confermare."},
pet:{n:"Pētergailis",a:"Skārņu iela 25",z:"A",r:"4,2",pos:[56.9473,24.1106],h:D7("12:00-23:59"),
 d:"Una trattoria nel centro storico aperta dal 1978, con cucina lettone tradizionale: piselli grigi con pancetta, maiale arrosto e karbonāde, la cotoletta impanata con contorni.",pr:"Fascia media (€€): un piatto sta intorno ai 10–15 € (listino non visto). Orari da una guida, da confermare."},
domini:{n:"Domini Canes",a:"Skārņu iela 10",z:"A",r:"4,3",pos:[56.9481,24.1093],h:D7("12:00-23:00"),
 d:"Una cucina lettone più moderna, con verdure di fattoria, funghi del bosco e frutti di bosco: in autunno c'è il piatto di funghi di stagione. Un po' più curato dei locali vicini.",pr:"Fascia media (€€): un piatto principale sta intorno ai 14–20 € (listino non visto). Orari da una guida, da confermare."},
ala:{n:"Folkklubs Ala Pagrabs",a:"Peldu iela 19",z:"A",r:"4,4",pos:[56.9464,24.1077],h:["14:00-02:00","16:00-02:00","16:00-02:00","16:00-02:00","16:00-04:00","16:00-04:00","14:00-04:00"],
 d:"Una cantina sotterranea nella Città Vecchia, ritrovo della musica popolare lettone, con 32 birre locali alla spina. Si mangia bene piatti semplici come i piselli grigi e lo stinco di maiale.",pr:"Fascia media (€€): un piatto sta intorno ai 10–15 €, una birra intorno ai 4–6 € (listino non visto). Spesso c'è musica dal vivo la sera. Orari da una guida, da confermare."},
rozen:{n:"Rozengrāls",a:"Rozena iela 1",z:"A",r:"4,3",pos:[56.9486,24.1059],h:["12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:30","12:00-23:30","12:00-23:30"],
 d:"Un ristorante a tema medievale sotto la piazza della Cattedrale, in una cantina a lume di candela: piatti come il coniglio in umido, l'anatra al forno o l'agnello, e la birra al miele. Meglio prenotare.",pr:"Fascia media (€€–€€€): un piatto principale sta intorno ai 15–25 € (listino non visto). Orari da una guida, da confermare. Posizione sulla mappa approssimativa."},
miit:{n:"MiiT Coffee",a:"Lāčplēša iela 10",z:"B",r:"4,5",pos:[56.9566,24.1205],h:["08:00-19:00","08:00-19:00","08:00-19:00","08:00-20:00","08:00-20:00","09:00-19:00","09:00-18:00"],
 d:"Una piccola torrefazione con caffè di specialità e una carta tutta vegetariana: colazioni, pranzi leggeri e dolci. Un buon posto per iniziare la giornata o fare una pausa, a pochi minuti da Alberta iela.",pr:"Economico (€): colazione e caffè intorno ai 6–10 € (listino non visto). Orari da una guida, da confermare."},
rocket:{n:"Rocket Bean Roastery (Dzirnavu)",a:"Dzirnavu iela 39",z:"B",r:"4,4",pos:[56.9579,24.1145],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","10:00-18:00","10:00-18:00"],
 d:"Una caffetteria di Riga, parte di una piccola rete di caffè locali con torrefazione propria: ottimo flat white e filtro, qualche dolce e panino. Ha più sedi in città, questa è nel centro.",pr:"Economico (€): un caffè con un dolce sta intorno ai 5–9 € (listino non visto). Orari da una scheda online, da confermare."},
innocent:{n:"Innocent Café",a:"Blaumaņa iela 34-2",z:"B",r:"4,4",pos:[56.9552,24.1224],h:["08:00-17:00","08:00-17:00","08:00-17:00","08:00-17:00","08:00-17:00","10:00-16:00","10:00-16:00"],
 d:"Un caffè di quartiere per il brunch: uova alla Benedict sul pane di segale lettone, flat white e macchiato. Nel fine settimana si riempie, meglio andare in settimana.",pr:"Economico–medio (€): un brunch sta intorno ai 8–14 € (listino non visto). Orari da una scheda online, da confermare. La posizione sulla mappa è approssimativa."},
mercato:{n:"Banchi di pirāgi al Mercato Centrale",a:"Nēģu iela 7",z:"C",r:"4,2",pos:[56.9439,24.1157],h:D7("07:30-17:00"),
 d:"Dentro i padiglioni del mercato centrale ci sono banchi dove si mangiano pirāgi (fagottini di pancetta e cipolla), zuppe e pane di segale, in piedi o a piccoli tavolini. È il pranzo più economico e più lettone possibile.",pr:"Molto economico (€): un pirāgs costa intorno a 1 €, una zuppa 3–5 € (prezzi stimati, non letti). Orari del mercato da centraltirgus.lv; i banchi chiudono prima. Spesso si paga in contanti."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["rocket","miit","innocent"],B:["miit","rocket","innocent"],C:["mercato","miit","rocket"]},
pra:{A:["pet","milda","domini"],B:["innocent","milda","miit"],C:["mercato","milda","pet"]},
cen:{A:["milda","domini","pet","ala","rozen"],B:["domini","milda","pet"],C:["milda","pet","domini"]},
snk:{A:["rocket","miit","ala"],B:["miit","rocket","innocent"],C:["mercato","rocket"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"vecchia",t:"Città Vecchia: Municipio, San Pietro e Duomo",acts:["oldtown","peter","dom"],need:210,core:1},
{id:"artn",t:"Art Nouveau e Museo d'Arte",acts:["artn","artnm","lnma"],need:230,core:1},
{id:"lib",t:"Monumento alla Libertà e Museo dell'Occupazione",acts:["freedom","occ","tre"],need:210,core:1},
{id:"mercato",t:"Mercato Centrale",acts:["market"],need:90}
];
var ORDER=["oldtown","peter","artn","dom","freedom","market","occ","artnm","lnma","tre"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["vec","Città Vecchia (Vecrīga)",[56.9490,24.1070],"A"],
["cen","Centro e quartiere Art Nouveau (Centrs)",[56.9560,24.1130],"B"],
["mer","Mercato Centrale e stazione",[56.9440,24.1170],"C"],
["altro","Altra zona (scrivi l'indirizzo)",[56.9477,24.1067],""]
];
/* imposta di soggiorno di Riga: 1 € a persona e a notte; 2 € dal 1° gennaio 2027 */
var TAX=[["h5","Hotel 4–5 stelle",1],["h3","Hotel fino a 3 stelle, B&B o appartamento",1],["host","Ostello o struttura economica",1],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Auzu pārslu biezputra","porridge di avena, con frutti di bosco o miele."],["Pankūkas","frittelle sottili, con panna acida o marmellata."],["Rupjmaize ar sieru","pane di segale scuro con formaggio e burro."]],
pra:[["Pīrāgi","fagottini di pasta con pancetta e cipolla, da mangiare caldi."],["Pelmeņi","ravioli di carne bolliti, con panna acida."],["Maizes zupa","una zuppa dolce di pane di segale, con panna montata."],["Sklandrausis","una crostata di segale con carote e patate, dolce e speziata."]],
cen:[["Pelēkie zirņi ar speķi","i piselli grigi con pancetta e cipolla: il piatto nazionale."],["Karbonāde","cotoletta di maiale impanata con patate e salsa."],["Cepta siļķe","aringa fritta o marinata, con patate lesse."],["Rupjmaizes kārtojums","dolce a strati con pane di segale, marmellata di frutti di bosco e panna."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","La Casa delle Teste Nere","Foto","La facciata decorata con i grandi orologi e le statue, specie al mattino presto.",[56.9477,24.1067],"Melngalvju nams, Rīga","oldtown"],
["🤳","La statua di Rolando","Selfie","Il cavaliere di pietra in Rātslaukums, simbolo della libertà della città, davanti alla Casa delle Teste Nere.",[56.9476,24.1066],"Rolands statue, Rātslaukums, Rīga","oldtown"],
["📷","La guglia di San Pietro","Foto","La guglia vista dalla strada stretta Kaļķu iela, con le case di mattoni intorno.",[56.9475,24.1096],"Saint Peter's Church, Rīga","peter"],
["📷","Riga dall'alto","Foto","La vista panoramica dalla torre, con i tetti rossi, il fiume e la Cattedrale: porta una giacca per il vento.",[56.9475,24.1096],"Saint Peter's Church, Rīga","peter"],
["📷","La piazza del Duomo","Foto","La facciata della Cattedrale con i tavolini all'aperto davanti, soprattutto verso sera.",[56.9492,24.1048],"Doma laukums, Rīga","dom"],
["📷","I Tre Fratelli","Foto","Le tre case affiancate di Mazā Pils iela, con facciate del Quattrocento, Seicento e Settecento.",[56.9495,24.1018],"Trīs brāļi, Rīga","tre"],
["🤳","La Casa dei Gatti","Selfie","I due gatti neri sul tetto della casa, inarcati verso la sede della Grande Gilda.",[56.9497,24.1086],"Kaķu nams, Rīga","tre"],
["📷","Il Monumento alla Libertà","Foto","La colonna con le tre stelle, con la guardia d'onore, meglio al tramonto.",[56.9516,24.1133],"Brīvības piemineklis, Rīga","freedom"],
["📷","Il canale e i ponticelli","Foto","L'acqua del canale cittadino con i ponticelli e gli alberi, nel parco di Bastejkalns.",[56.9525,24.1165],"Bastejkalns, Rīga","freedom"],
["📷","Gli hangar degli Zeppelin","Foto","Le grandi volte metalliche del mercato, con i banchi di frutta all'esterno.",[56.9439,24.1157],"Rīgas Centrāltirgus, Rīga","market"],
["🤳","Le facciate di Alberta iela","Selfie","Le maschere, i pavoni e le sfingi sui palazzi Art Nouveau: guarda in alto e porta una lente lunga.",[56.9590,24.1070],"Alberta iela, Rīga","artn"],
["📷","La scala del Museo Art Nouveau","Foto","La scala originale con le vetrate, ben conservata e con una luce morbida.",[56.9588,24.1086],"Rīgas Jūgendstila muzejs, Rīga","artnm"],
["📷","La facciata neobarocca del Museo d'Arte","Foto","Il palazzo di mattoni chiari con la torre, sul lato est dello Esplanade.",[56.9582,24.1170],"Latvijas Nacionālais mākslas muzejs, Rīga","lnma"],
["📷","Il Museo dell'Occupazione","Foto","L'edificio cubico degli anni Sessanta, ex Museo dei Fucilieri rossi, sulla piazza dei Fucilieri.",[56.9484,24.1125],"Latvijas Okupācijas muzejs, Rīga","occ"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2026-10-31",t:"Casa delle Teste Nere: giorni di chiusura",x:"Sul sito ufficiale la Casa delle Teste Nere risultava chiusa il 14, 15 e 16 ottobre e con orario ridotto (10–14) il 28 ottobre, senza che fosse indicato l'anno: da confermare su melngalvjunams.lv prima di andare. Di solito è aperta tutti i giorni 10–17."},
{from:"2026-10-14",to:"2026-12-31",t:"Imposta di soggiorno: 1 € ora, 2 € dal 2027",x:"Il Comune di Riga ha deciso di portare l'imposta di soggiorno da 1 a 2 € a persona e a notte dal 1° gennaio 2027. Fino a quella data resta 1 €."},
{from:"2026-11-20",to:"2027-01-04",t:"Mercatino di Natale in Piazza del Duomo",x:"Il mercatino di Natale di Riga (Piazza del Duomo, banchi anche in Livu laukums e Vērmanes dārzs) è previsto dal 27 novembre 2026 al 4 gennaio 2027 (da una guida, da confermare su liveriga.com). Il centro è molto più affollato."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: musei chiusi",x:"Il 24, 25, 26 e 31 dicembre molti musei, tra cui il Museo dell'Occupazione e il Museo d'Arte, sono chiusi. Controlla gli orari: i ristoranti restano aperti con orari ridotti."}
];
/* clima medio di Riga (indicativo, massime/minime) */
var CLIM=[[-1,-6],[0,-6],[4,-3],[11,2],[17,7],[21,11],[23,14],[22,14],[17,10],[10,5],[4,1],[0,-3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Riga: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="peter"&&WD===0)meta+=" Oggi è lunedì: la chiesa di San Pietro è chiusa.";
if(it.id==="artnm"&&WD===0)meta+=" Oggi è lunedì: il Museo Art Nouveau è chiuso.";
if(it.id==="lnma"&&WD===0)meta+=" Oggi è lunedì: il Museo Nazionale d'Arte è chiuso.";
if(it.id==="lnma"&&WD===4)meta+=" Oggi è venerdì: il Museo d'Arte resta aperto fino alle 20.";
if(it.id==="dom"&&WD===6)meta+=" Oggi è domenica: la Cattedrale apre solo dalle 14.";
return meta}
Object.assign(C,{id:"riga",n:"Riga",cn:"Lettonia",e:"🏰",flag:"🇱🇻",col:["#9e1b32","#e8e8e8","#c9a24a"],k:"riga lettonia latvia",
TZ:"Europe/Riga",LL:[56.9496,24.1052],CC:"lv",QN:"Riga",BK:"Riga",ARE:/riga|rīga|latvija|latvia|\bLV-?\d{4}\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"lv-LV",LANGN:"lettone",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Piazza del Municipio (Rātslaukums)",q:"Rātslaukums, Rīga"},
SINGLE:{acts:["oldtown","peter","dom","artn","freedom"],ins:[]},
EXCL:[],
DICON:{oldtown:"🏛️",peter:"⛪",dom:"🎼",tre:"🏘️",freedom:"🗽",market:"🛒",artn:"🏠",artnm:"🖼️",occ:"📜",lnma:"🎨"},
ZN:{A:"nella Città Vecchia",B:"nel centro e a Alberta iela",C:"vicino al Mercato Centrale"},
NEAR:{col:"caffè",pra:"locale o banco del mercato",cen:"ristorante",snk:"caffè"},
SE:{milda:"🍲",pet:"🍲",domini:"🍄",ala:"🍺",rozen:"🍖",miit:"☕",rocket:"☕",innocent:"🥞",mercato:"🥟"},
TR:{one:1.5,cap:5,lbl:"Tram, filobus e autobus (Rīgas satiksme)",
 air:{RIX:{one:1.5,n:"Autobus 22 per l'aeroporto (1,50 €)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:5,note:"Il biglietto 24 ore (5 €) vale su tram, filobus e autobus di Riga per 24 ore dalla prima convalida."},
 {n:"Biglietto 3 giorni",d:3,p:8,only:function(T){return T.n>=3},note:"Il biglietto 3 giorni (8 €) vale per tre giorni di fila sui mezzi urbani di Riga."},
 {n:"Biglietto 5 giorni",d:5,p:10,only:function(T){return T.n>=5},note:"Il biglietto 5 giorni (10 €) vale per cinque giorni di fila sui mezzi urbani di Riga."}],
 note:"Prezzi da liveriga.com e da un articolo del 19 marzo 2026: corsa da 90 minuti con cambi 1,50 €, 24 ore 5 €, 3 giorni 8 €, 5 giorni 10 €, mensile 30 €. Alcune tariffe regionali sono salite a gennaio 2026, ma non quelle urbane. I biglietti si comprano ai chioschi Narvesen, ai distributori, agli uffici della Rīgas satiksme o con le app Mobilly e Rīgas satiksme. Si paga con la carta direttamente all'autista solo sull'autobus 22 (1,81 €). Riga non ha la metropolitana. Il biglietto va convalidato ogni volta che sali, anche cambiando mezzo."},
FOOD:{co:[6,"Colazione al caffè"],pr:[9,"Pranzo (banco del mercato o locale semplice)"],ce:[16,"Cena (cucina lettone)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"A piedi o in tram",move:"quasi tutto a piedi, a volte in tram",bags:"«Vai varu atstāt somas šeit?»",bagsPM:"«Vai varu atstāt somas šeit līdz pēcpusdienai?»",bagsAM:"«Vai varu atstāt somas šeit līdz pusdienlaikam?»",
pra:"Un banco del mercato o un locale semplice",praZ:{A:"Nelle piazze intorno al Municipio e al Duomo i tavoli all'aperto costano più che nelle vie laterali: per un pasto vero scegli Skārņu iela e le strade dietro la Cattedrale.",C:"Al Mercato Centrale i banchi dei pirāgi e delle zuppe sono il pranzo più economico: porta qualche euro in contanti."},
freeLong:"Qualche idea: un giro tra i cortili della Città Vecchia, una sosta in un caffè sulla piazza della Cattedrale, il parco lungo il canale o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè della Città Vecchia.",
remind:"Il lunedì sono chiusi la chiesa di San Pietro, il Museo Art Nouveau e il Museo d'Arte: pianifica di conseguenza. A fine ottobre fa freddo e buio presto.",
rain1:"Al coperto: il Museo dell'Occupazione, il Museo d'Arte, la Cattedrale, la Casa delle Teste Nere e il Mercato Centrale.",
rainM:"Al coperto: Museo dell'Occupazione, Museo Nazionale d'Arte, Museo Art Nouveau, Cattedrale, San Pietro e i padiglioni del Mercato Centrale.",
water:"L'acqua del rubinetto a Riga è potabile; se non ti convince il sapore, la fontanella più vicina e l'acqua in bottiglia costano poco. Attivate «Acqua» sulla mappa per vedere le fontanelle.",
kitchen:"A Riga si pranza tra le 12 e le 15 e si cena dalle 18: molti ristoranti nella Città Vecchia restano aperti tutto il giorno, i caffè chiudono presto, spesso alle 17–19.",
night:[["🍺","Una birra lettone in una cantina della Città Vecchia, come Folkklubs Ala Pagrabs, è un modo tipico di chiudere la serata."],["🕙","Le cucine servono di solito fino alle 22–23; i tram finiscono verso mezzanotte, poi si va a piedi o con Bolt."],["☕","I caffè aprono tra le 8 e le 9: la colazione di domani è nella prima tappa."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Riga ha un'ora in più dell'Italia: sposta l'orologio avanti di un'ora",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per locali semplici: una colazione sta intorno ai 6–10 €, un pranzo ai banchi del mercato intorno ai 4–10 € e una cena completa con un piatto principale intorno ai 14–22 €. Si paga quasi sempre con la carta; ai banchi del mercato conviene avere qualche euro in contanti.",
taxNote:"L'imposta di soggiorno di Riga è 1 € a persona e a notte; salirà a 2 € dal 1° gennaio 2027 (comune di Riga, ottobre 2026). Spesso è già compresa nel prezzo: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: ristoranti lettoni e caffè indipendenti, niente grandi catene. Colazione e cena restano sotto i 15–20 € a persona. Orari e prezzi sono quelli di guide e schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["L'autobus 22 è l'unico mezzo pubblico per l'aeroporto: arriva fuori dal terminal. Compra il biglietto prima per pagare meno.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto autobus 22 per l'aeroporto (1,50 €) e biglietto 24 ore (5 €): si comprano ai chioschi Narvesen, ai distributori o con l'app Mobilly",function(E){return true}],["bh","Orario della Casa delle Teste Nere (10 €) per il giorno scelto: a volte chiusa per eventi",["oldtown"]],["pet","Orario della chiesa di San Pietro (9 €): chiusa il lunedì",["peter"]],["occ","Orario del Museo dell'Occupazione (8 €)",["occ"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per i banchi del mercato"]],
NUM:{1:["vienam","VIE-nam"],2:["diviem","DI-viem"],3:["trijiem","TRI-yiem"],4:["četriem","CHE-triem"],5:["pieciem","PIE-tsiem"],6:["sešiem","SHE-shiem"],7:["septiņiem","SEP-ti-niem"],8:["astoņiem","A-sto-niem"],9:["deviņiem","DE-vi-niem"],10:["desmit","DES-mit"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Labdien / Labvakar","LAB-dien / LAB-va-kar"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Galdiņu "+nu[0]+", lūdzu","GAL-di-nyu "+nu[1]+", LU-dzu"],["Un caffè e una fetta di torta, per favore","Vienu kafiju un kūkas gabalu, lūdzu","VIE-nu KA-fiyu un KU-kas GA-ba-lu, LU-dzu"],["Acqua del rubinetto, per favore","Krāna ūdeni, lūdzu","KRA-na U-de-ni, LU-dzu"],["Il conto, per favore","Rēķinu, lūdzu","RE-kyi-nu, LU-dzu"],["Posso pagare con la carta?","Vai varu maksāt ar karti?","vai VA-ru MAK-sat ar KAR-ti"],["Quanto costa?","Cik tas maksā?","tsik tas mak-SA"],["Dov'è la fermata del tram?","Kur ir tramvaja pietura?","kur ir TRAM-va-ya PIE-tu-ra"],["Quale autobus va all'aeroporto?","Kurš autobuss brauc uz lidostu?","kursh AU-to-bus brautz uz LI-dos-tu"]];
if(M)fr=fr.concat([["Ho una prenotazione","Man ir rezervācija","man ir re-zer-VA-tsi-ya"],["Posso lasciare i bagagli qui?","Vai varu atstāt somas šeit?","vai VA-ru AT-stat SO-mas sheit"],["A che ora è il check-out?","Cikos ir izrakstīšanās?","TSI-kos ir iz-RAK-sti-sha-nas"]]);
return fr.concat([["Mi scusi","Atvainojiet","AT-vai-no-yiet"],["Grazie mille!","Liels paldies!","liels PAL-dies"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Riga: "+(tx[2]?"1 € a persona e a notte ("+tx[1].toLowerCase()+"), 2 € dal 1° gennaio 2027":"non si paga se sei ospite di amici o parenti")+". Spesso è già compresa nel prezzo che trovi sull'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["Riga ha tram, filobus e autobus con lo stesso biglietto, ma non la metropolitana. La Città Vecchia e il centro si girano quasi tutti a piedi."],
ZONES:[
["🚋 Tram, autobus e biglietti",["Un solo biglietto vale su tram, filobus e autobus: la corsa da 90 minuti con cambi costa 1,50 €, il 24 ore 5 €, il 3 giorni 8 € e il 5 giorni 10 €.","Il biglietto va convalidato a ogni salita, anche cambiando mezzo: i controllori fanno multe molto più alte del biglietto (importo da controllare).","L'aeroporto si raggiunge con l'autobus 22, che si può pagare con la carta direttamente all'autista (1,81 €).","Riga non ha la metropolitana: per la Città Vecchia e il centro il tram è utile solo per le distanze lunghe."]],
["🏛️ Città Vecchia: Municipio, San Pietro e Duomo",["Rātslaukums, San Pietro e la Cattedrale sono a pochi minuti a piedi l'uno dall'altro.","La torre di San Pietro è il punto migliore per capire com'è fatta la città.","In giornata si vedono bene i tre punti principali, con una sosta pranzo in Skārņu iela."],["oldtown","peter","dom"]],
["🏠 Art Nouveau",["Alberta iela è a 15–20 minuti a piedi dalla Città Vecchia, lungo Elizabetes iela.","I palazzi sono abitazioni: si guardano da fuori, in silenzio.","Il Museo Art Nouveau al numero 12 mostra gli interni originali."],["artn","artnm"]],
["🥟 Mercato Centrale",["I padiglioni sono aperti ogni giorno, di solito dalle 7:30 alle 17–18.","I pirāgi caldi e la zuppa sono il pranzo più economico di Riga.","Fai attenzione a borse e tasche: in luoghi affollati i borseggiatori sono comuni."],["market"]],
["🌅 Un giorno fuori Riga",["Jūrmala, la località di mare a mezz'ora di treno, ha una spiaggia lunghissima e ville di legno.","Il castello di Rundāle e Sigulda, con il parco nazionale di Gauja, si raggiungono in un'ora circa con il treno o l'auto."]]],
WTIPS:["L'acqua del rubinetto a Riga è potabile; se ti sembra di sapore forte, usa bottiglie o un filtro.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se lo chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Lettonia usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Riga ha un'ora in più dell'Italia.","Mancia: nei ristoranti si lascia di solito il 10% se il servizio non è già incluso; nei caffè si arrotonda.","Molti banchi di mercato accettano solo contanti: porta qualche euro.","A fine ottobre fa freddo e buio presto: porta guanti e un cappello, e controlla gli orari dei musei.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚋 Trasporti pubblici e oggetti smarriti: <a href="https://www.rigassatiksme.lv/" target="_blank" rel="noopener">rigassatiksme.lv</a> · treni: <a href="https://www.vivi.lv/" target="_blank" rel="noopener">vivi.lv</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Riga: <a href="https://ambriga.esteri.it" target="_blank" rel="noopener">ambriga.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Riga. Controlla <a href="https://www.rigassatiksme.lv/" target="_blank" rel="noopener">rigassatiksme.lv</a> e, per l\'aeroporto, <a href="https://www.riga-airport.com/" target="_blank" rel="noopener">riga-airport.com</a> nei giorni prima di partire.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 80 110 86 Q150 90 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M14 106 V66 H50 V106 Z M10 66 H54 L32 44 Z M24 44 V34 H40 V44 Z M30 34 V26 H34 V34 Z"/></g>'+
'<g style="--k:2"><path d="M74 106 V52 H98 V106 Z M72 52 H100 L86 30 Z M85 30 L86 4 L87 30 Z M80 106 V68 H92 V106 Z"/></g>'+
'<g style="--k:3"><path d="M120 106 V60 H180 V106 Z M120 60 H180 V52 H120 Z M124 52 V44 H134 V52 Z M146 52 V40 H156 V52 Z M168 52 V46 H176 V52 Z M148 40 L151 22 L154 40 Z"/></g>'+
'<g style="--k:4"><path d="M210 106 V76 H230 V106 Z M210 76 L220 66 L230 76 Z M214 66 H226 V60 H214 Z M219 60 V50 H221 V60 Z"/></g>'+
'<g style="--k:5"><path d="M256 106 V48 H268 V106 Z M254 48 H270 V42 H254 Z M258 42 V30 H266 V42 Z M262 30 V24 H263 V30 Z M272 106 V70 H300 V106 Z M270 70 H302 V64 H270 Z"/></g>'+
'<g style="--k:6"><path d="M326 106 V62 H352 V106 Z M324 62 H354 L340 40 Z M338 40 V24 H342 V40 Z M360 106 V74 H388 V106 Z M358 74 H390 V68 H358 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M124 80 h52 M124 90 h52"/><path d="M364 82 h22 M364 92 h22"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="24" cy="16" r="1.6"/><circle cx="106" cy="16" r="1.3"/><circle cx="196" cy="20" r="1.3"/><circle cx="244" cy="14" r="1.3"/><circle cx="318" cy="12" r="1.3"/><circle cx="392" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.riga);

;var n=window.CITIES["riga"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["riga"]);
