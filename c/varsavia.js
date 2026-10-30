(function(o){
/* ===== Varsavia (dati verificati il 13 ottobre 2026; 1 € ≈ 4,38 zł, cambio del 11 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.varsavia=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var RV=function(a){return a.slice().reverse()};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
WAW:{n:"Varsavia Chopin (WAW)",s:"Warsaw Chopin Airport",url:"https://www.lotnisko-chopina.pl/en",live:"Varsavia",inMin:40,buf:120,pos:[52.1657,20.9671],sd:"Aeroporto WAW · treno SKM",rt:"Dall'aeroporto: treno SKM (linea S2 o S3) fino a Warszawa Centralna, la stazione centrale, in circa 20 minuti.",
 arr:"Dall'Italia si entra in Polonia senza controllo passaporti (spazio Schengen). L'aeroporto è a circa 8 km dal centro. Dopo il ritiro bagagli segui i cartelli «Pociągi / Trains»: la stazione Warszawa Lotnisko Chopina è sotto il terminal, si raggiunge con un percorso coperto e le scale mobili. La linea S3 della SKM passa più volte all'ora e arriva a Warszawa Centralna in circa 20 minuti; la S2 passa due volte all'ora e arriva a Warszawa Śródmieście, anch'essa in centro. In alternativa l'autobus 175 parte davanti all'uscita arrivi e attraversa il centro, ma ci mette 25–40 minuti. Di notte c'è l'autobus N32 (ogni 30 minuti circa) fino a Dworzec Centralny. In tutto sono circa 40 minuti dall'atterraggio alla stazione centrale.",
 tk:"Biglietto: treno SKM e autobus 175 usano lo stesso biglietto dei mezzi urbani di Varsavia, il biglietto da 75 minuti per la zona 1, che costa 4,40 zł (circa 1,00 €; tariffa dal sito del Comune, aggiornato a novembre 2025). Si compra alle macchinette della stazione, sull'app o in biglietteria, e si convalida come indicato sul biglietto. Il taxi per il centro costa circa 35–50 zł secondo una guida online di qualche anno fa, probabilmente di più oggi: usa un'app (Bolt, Uber, iTaxi) o un taxi ufficiale, mai chi ti avvicina nell'atrio.",
 gm:"Warszawa Lotnisko Chopina railway station",
 tips:["Alla stazione dell'aeroporto passano più treni all'ora, ma controlla l'orario sul tabellone: la S2 e la S3 hanno frequenze diverse e nel fine settimana a volte ci sono meno corse.","L'autobus 175 ferma sul livello inferiore, vicino all'uscita arrivi; sul livello superiore non si può salire per uscire dall'aeroporto.","Un taxi non ufficiale può chiedere tre o quattro volte la tariffa normale: concorda sempre il prezzo prima di salire, oppure usa un'app."]},
WMI:{n:"Varsavia Modlin (WMI)",s:"Warsaw Modlin Mazovia Airport",url:"https://www.modlinairport.pl/en",live:"Varsavia",inMin:75,buf:120,pos:[52.4511,20.6518],sd:"Aeroporto WMI · bus e treno KM",rt:"Dall'aeroporto: navetta fino alla stazione di Modlin, poi treno Koleje Mazowieckie fino a Warszawa Centralna, in circa un'ora in tutto.",
 arr:"Modlin è l'aeroporto secondario della città, usato dai voli low cost, a circa 40 km a nord del centro. Dall'Italia si entra in Polonia senza controllo passaporti (spazio Schengen). Per il centro hai due strade. La più economica: una navetta collega l'aeroporto alla stazione di Modlin in circa 10 minuti (secondo una fonte più vecchia, ogni 20 minuti circa, in coincidenza con i treni), poi il treno di Koleje Mazowieckie arriva a Warszawa Centralna in circa 40 minuti. La più semplice: l'autobus ModlinBus, diretto e coordinato con gli orari dei voli, che ferma a Metro Młociny e vicino a Warszawa Centralna (Aleje Jerozolimskie 56C). In tutto sono circa un'ora o più, a seconda dell'ora.",
 tk:"Biglietto: la navetta più il treno costano insieme circa 21–25 zł (circa 4,80–5,70 €) secondo una guida del 2026; il biglietto combinato venduto per l'aeroporto, con 75 minuti di mezzi urbani nella zona 1, costa 19 zł (circa 4,30 €) secondo un'altra guida: prezzi da controllare su mazowieckie.com.pl. Per il ModlinBus il prezzo non l'ho trovato: guarda modlinbus.pl. I biglietti navetta-treno si comprano alle macchinette nella sala bagagli o vicino all'uscita arrivi. Il taxi ufficiale parte da 159 zł (circa 36 €), 199 zł (circa 45 €) di notte: per il centro non conviene.",
 gm:"Mazovia Warsaw Modlin Airport",
 tips:["Dopo un volo serale controlla l'ultimo treno da Modlin e gli orari del ModlinBus: l'autobus segue i voli, il treno ha un'ultima corsa che può essere prima della mezzanotte.","Se il volo di ritorno parte presto, conta da Warszawa Centralna circa un'ora e mezza per il tragitto: alle 5 del mattino conviene il ModlinBus.","Il taxi dal centro costa molto di più che dall'aeroporto Chopin: non lo consiglio, se non per un gruppo di tre o quattro persone."]}
};
/* linee (tracciati indicativi) */
var SEG={
skm:{c:"#00833e",n:"Treno SKM (S2 / S3) dall'aeroporto",p:[[52.1657,20.9671,"Aeroporto",2],[52.2189,20.9658,"Warszawa Zachodnia",2],[52.2286,21.0034,"Warszawa Centralna",2]]},
nav:{c:"#e0a800",n:"Navetta Modlin aeroporto-stazione",p:[[52.4511,20.6518,"Aeroporto",2],[52.4297,20.7003,"Modlin",2]]},
km:{c:"#0072bc",n:"Treno Koleje Mazowieckie da Modlin",p:[[52.4297,20.7003,"Modlin",2],[52.4060,20.9260,"Legionowo"],[52.2523,21.0529,"Warszawa Wschodnia"],[52.2286,21.0034,"Warszawa Centralna",2]]},
m1:{c:"#1d5aa6",n:"Metro M1 (blu)",p:[[52.2286,21.0034,"Centralna",2],[52.2300,21.0114,"Centrum",2],[52.2352,21.0086,"Świętokrzyska",2],[52.2433,21.0010,"Ratusz Arsenał",2]]},
m2:{c:"#e30613",n:"Metro M2 (rossa)",p:[[52.2289,20.9841,"Rondo Daszyńskiego",2],[52.2331,20.9985,"Rondo ONZ"],[52.2352,21.0084,"Świętokrzyska",2],[52.2538,21.0348,"Dworzec Wileński",2]]}
};
var START=[52.2286,21.0034];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
stare:{t:"Città Vecchia: Rynek e Barbacane",z:"A",p:1,min:75,id:100,max:160,pos:[52.2497,21.0122],q:"Rynek Starego Miasta, Warszawa",cls:"walk",sun:1,
 d:"Il centro storico di Varsavia, raso al suolo dai tedeschi nel 1944 e ricostruito dopo la guerra con i quadri e le stampe dell'epoca, e per questo iscritto all'UNESCO. La piazza del mercato ha le case colorate e la statua della Sirenetta, il simbolo della città; poco più a nord c'è il Barbacane, il bastione di mattoni del Cinquecento.",
 m:"La piazza e il Barbacane si vedono gratis, a ogni ora. Sulla piazza c'è il Museo di Varsavia (Rynek Starego Miasta 28-42): martedì–venerdì 10–18 (giovedì fino alle 20), sabato 10–19, domenica 10–18, chiuso il lunedì; biglietto 25 zł (circa 5,70 €), ridotto 18 zł, la mostra permanente è gratuita il giovedì; la terrazza al quinto piano costa 10 zł a parte (pagina muzea.waw.pl, aggiornata l'11 ottobre 2026, non il sito ufficiale del museo). Il museo chiude il 1° novembre e il 24–26 e 31 dicembre 2026."},
zamek:{t:"Castello Reale",z:"A",p:1,min:75,id:105,max:170,pos:[52.2479,21.0147],q:"Zamek Królewski w Warszawie",cls:"",cl:[0],sun:1,tk:[13.7,"Castello Reale: Royal Route (60 zł)"],
 win:function(){return[10*60,18*60]},
 d:"La residenza dei re di Polonia in fondo alla piazza del Castello, distrutta nel 1944 e ricostruita negli anni Settanta con i soldi dei polacchi. Dentro ci sono gli appartamenti reali, la Sala del Trono, la Sala dei Cavalieri e i grandi quadri storici di Matejko; la colonna di Sigismondo sulla piazza è il punto d'incontro dei varsaviani.",
 m:"Aperto martedì–domenica dalle 10 alle 18, chiuso il lunedì (pagina muzea.waw.pl, aggiornata l'11 ottobre 2026). Biglietto per la Royal Route e la Museum Route: 60 zł (circa 13,70 €), ridotto 45 zł. Il mercoledì l'ingresso è gratuito solo ad alcune aree (il Palazzo sotto il Tetto e un percorso speciale): le altre sale sono chiuse. A novembre 2026 c'è un percorso gratuito che comprende le sale di rappresentanza. Fino a dicembre 2026 ci sono lavori al tetto a fasi, ma il castello resta aperto. Chiuso il 1° novembre, il 24, 25 e 31 dicembre e il 1° gennaio; aperto il 26 dicembre. Controlla zamek-krolewski.pl."},
krakowskie:{t:"Krakowskie Przedmieście e Nowy Świat",z:"A",p:2,min:60,id:90,max:130,pos:[52.2400,21.0160],q:"Krakowskie Przedmieście, Warszawa",cls:"walk",sun:1,
 d:"Il viale principale della Via Reale, che va dal Castello verso sud tra chiese, palazzi e l'Università: qui ci sono il palazzo presidenziale, la chiesa di Santa Croce, che custodisce il cuore di Chopin in un pilastro, e il caffè storico Bristol. Più a sud continua come Nowy Świat, la via dei caffè e dei negozi.",
 m:"Si cammina gratis. Il Museo di Chopin (Okólnik 1) è chiuso per lavori da gennaio 2026 e dovrebbe riaprire a gennaio 2027 (pagina muzea.waw.pl, aggiornata il 30 settembre 2026): non si può visitare. Per la chiesa di Santa Croce non ho trovato gli orari: guarda il cartello alla porta."},
sasski:{t:"Piazza Piłsudski e Giardino Sassone",z:"A",p:4,min:30,id:45,max:70,pos:[52.2432,21.0118],q:"Plac Piłsudskiego, Warszawa",cls:"walk",sun:1,
 d:"La grande piazza dove sorgeva il Palazzo Sassone, distrutto nel 1944: restano solo alcune arcate, che custodiscono la Tomba del Milite Ignoto con la guardia d'onore. Dietro la piazza si apre il Giardino Sassone, un parco pubblico settecentesco con viali e fontane, a due passi dal viale Krakowskie Przedmieście.",
 m:"La piazza e il giardino sono all'aperto e si attraversano gratis. Per gli orari della guardia d'onore e dei cambi non ho una fonte ufficiale: guarda i cartelli sul posto."},
pkin:{t:"Palazzo della Cultura e della Scienza",z:"B",p:2,min:45,id:60,max:100,pos:[52.2318,21.0060],q:"Pałac Kultury i Nauki, Warszawa",cls:"",sun:1,tk:[5,"Palazzo della Cultura: terrazza panoramica (22 zł)"],
 d:"Il grattacielo staliniano di 237 metri, regalo dell'Unione Sovietica alla Polonia, finito nel 1955, che domina il centro. Dalla terrazza al trentesimo piano si vede tutta la città; per i varsaviani è il posto da cui la vista è migliore perché è l'unico da cui non si vede il palazzo stesso.",
 m:"La terrazza costa 22 zł (circa 5 €), ridotto 15 zł (da un articolo del dicembre 2023 su kb.pl: il prezzo può essere cambiato, controlla su bilety.pkin.pl dove si compra online). Gli orari di apertura della terrazza non li ho trovati su una fonte aggiornata: controllali prima. Le visite guidate dell'edificio partono alle 11, 13, 14 e 15 da 40 zł (pik.warszawa.pl, programma 2026) e comprendono la terrazza senza la coda."},
powstanie:{t:"Museo dell'Insurrezione di Varsavia",z:"B",p:2,min:150,id:180,max:240,pos:[52.2326,20.9808],q:"Muzeum Powstania Warszawskiego",cls:"",cl:[1],sun:1,tk:[8,"Museo dell'Insurrezione (35 zł)"],
 win:function(wd){return[(wd>=5?10:8)*60,18*60]},
 d:"Il museo dedicato all'Insurrezione di Varsavia dell'agosto–ottobre 1944, contro l'occupazione tedesca, in una ex centrale elettrica. Il percorso, con suoni, fotografie e oggetti, ricostruisce 63 giorni di combattimenti in cui morirono circa 200.000 civili: è una visita lunga e a tratti dura, con l'ingresso che toglie il fiato.",
 m:"Aperto lunedì, mercoledì, giovedì e venerdì dalle 8 alle 18, sabato e domenica dalle 10 alle 18; chiuso il martedì, il 1° novembre 2026, il 25 dicembre e il 1° gennaio 2027 (pagina muzea.waw.pl, controllata il 7 ottobre 2026). Biglietto 35 zł (circa 8 €), ridotto 30 zł. Il giovedì l'ingresso è gratuito, con biglietti da ritirare in cassa il giorno stesso e code lunghe. La visita richiede da 2 ore e mezza a 4 ore."},
polin:{t:"POLIN: Museo della storia degli ebrei polacchi",z:"B",p:2,min:120,id:150,max:240,pos:[52.2494,20.9934],q:"POLIN Museum of the History of Polish Jews, Warszawa",cls:"",cl:[1],sun:1,tk:[10.3,"Museo POLIN (45 zł)"],
 win:function(wd){return[10*60,(wd===5?20:18)*60]},
 d:"Il museo sulla storia degli ebrei in Polonia, mille anni di vita comune dal Medioevo alla Shoah e a oggi, costruito sul sito dell'ex ghetto di Varsavia. Davanti c'è il Monumento agli Eroi del Ghetto del 1948. L'edificio di vetro e la mostra permanente richiedono tempo e attenzione.",
 m:"Aperto ogni giorno dalle 10 alle 18, il sabato fino alle 20, chiuso il martedì (pagina muzea.waw.pl, aggiornata il 30 settembre 2026). Biglietto 45 zł (circa 10,30 €), ridotto 35 zł; il giovedì l'ingresso è gratuito. La mostra permanente richiede 3–5 ore: se hai poco tempo, scegli le sale dal Medioevo al Novecento. Non ho trovato avvisi di chiusura per le feste: controlla polin.pl."},
lazienki:{t:"Parco Łazienki e Palazzo sull'Isola",z:"C",p:2,min:90,id:120,max:200,pos:[52.2150,21.0356],q:"Łazienki Królewskie, Warszawa",cls:"walk",sun:1,
 d:"Il parco più bello di Varsavia, di 76 ettari, la residenza estiva dell'ultimo re di Polonia, Stanislao Augusto. Nel laghetto sta il Palazzo sull'Isola, in stile neoclassico, e intorno ci sono giardini, teatri, un anfiteatro, pavoni e scoiattoli; il monumento a Chopin è all'ingresso da Aleje Ujazdowskie.",
 m:"L'ingresso al parco è gratuito. I palazzi, tra cui quello sull'Isola, sono a pagamento: una fonte del 2021 dava 40 zł intero e 20 zł ridotto, una del 2026 cita circa 70 zł per un biglietto combinato di più edifici (cifre non confermate). Gli orari di apertura dei palazzi non li ho trovati: guarda lazienki-krolewskie.pl. I concerti di Chopin della domenica sono da metà maggio a fine settembre, quindi non ora."},
wilanow:{t:"Palazzo e giardini di Wilanów",z:"C",p:3,min:120,id:180,max:260,pos:[52.1651,21.0900],q:"Pałac w Wilanowie, Warszawa",cls:"",sun:1,
 d:"La residenza barocca del re Giovanni III Sobieski, a sud della città, la «Versailles polacca»: un palazzo giallo sopravvissuto alla guerra quasi intatto, con appartamenti, ritratti e un grande giardino all'italiana e all'inglese.",
 m:"Si raggiunge con l'autobus 116, 180 o 519 dal centro, in 30–40 minuti (guida del 2026), oppure in taxi in 20–30 minuti. Il palazzo e il parco hanno biglietti separati; il giovedì l'ingresso al museo è gratuito secondo una guida. Gli orari variano con la stagione e non ho trovato quelli di ottobre–novembre 2026: controlla wilanow-palac.pl. È una tappa da mezza giornata."},
praga:{t:"Praga: Koneser e Ząbkowska",z:"D",p:4,min:75,id:100,max:160,pos:[52.2540,21.0445],q:"Centrum Praskie Koneser, Warszawa",cls:"walk",multi:1,sun:1,
 d:"Il quartiere sulla riva destra della Vistola, che nel 1944 non fu distrutto e conserva i cortili e le facciate d'epoca. Il Koneser è la vecchia fabbrica di vodka trasformata in centro con ristoranti e negozi, e la via Ząbkowska è piena di locali e murales.",
 m:"Si cammina all'aperto e gratis. Fermata della metro M2 più vicina: Dworzec Wileński, a circa 10 minuti a piedi. Gli orari dei singoli locali del Koneser variano: guarda sul posto."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
var L_SP=[[52.2286,21.0034],[52.2300,21.0050],[52.2318,21.0060]];
var L_KS=[[52.2400,21.0160],[52.2440,21.0143],[52.2479,21.0147],[52.2490,21.0130],[52.2497,21.0122]];
var L_KZ=[[52.2400,21.0160],[52.2440,21.0143],[52.2479,21.0147]];
var L_ZS=[[52.2479,21.0147],[52.2490,21.0130],[52.2497,21.0122]];
var L_KP=[[52.2400,21.0160],[52.2420,21.0135],[52.2432,21.0118]];
P2("start","pkin",5,"walk","A piedi dalla stazione centrale al Palazzo della Cultura, circa 5 minuti.","A piedi dal Palazzo della Cultura alla stazione centrale, circa 5 minuti.",{f:[W(L_SP)],r:[W(RV(L_SP))]});
P2("krakowskie","stare",15,"walk","A piedi lungo il viale fino alla piazza del Castello e poi per la via Świętojańska fino al Rynek, circa 15 minuti.","A piedi dal Rynek alla piazza del Castello e giù per il viale Krakowskie Przedmieście, circa 15 minuti.",{f:[W(L_KS)],r:[W(RV(L_KS))]});
P2("krakowskie","zamek",10,"walk","A piedi lungo il viale fino alla piazza del Castello, circa 10 minuti.","A piedi dal Castello giù per il viale Krakowskie Przedmieście, circa 10 minuti.",{f:[W(L_KZ)],r:[W(RV(L_KZ))]});
P2("zamek","stare",4,"walk","A piedi dalla piazza del Castello al Rynek della Città Vecchia, circa 4 minuti.","A piedi dal Rynek alla piazza del Castello, circa 4 minuti.",{f:[W(L_ZS)],r:[W(RV(L_ZS))]});
P2("krakowskie","sasski",6,"walk","A piedi in direzione di Piazza Piłsudski, circa 6 minuti.","A piedi da Piazza Piłsudski al viale Krakowskie Przedmieście, circa 6 minuti.",{f:[W(L_KP)],r:[W(RV(L_KP))]});
/* ritorno in aeroporto: treno SKM da Warszawa Centralna, oppure navetta e treno KM per Modlin */
var RET={
WAW:{
 A:{min:45,txt:"Raggiungi Warszawa Centralna a piedi, in metro o in tram, poi prendi il treno SKM S3 (o la S2 da Warszawa Śródmieście) fino a Warszawa Lotnisko Chopina: circa 20 minuti. Biglietto da 75 minuti per la zona 1: 4,40 zł (circa 1,00 €). In alternativa l'autobus 175 dal centro, che costa lo stesso ma impiega 25–40 minuti. Di notte c'è l'autobus N32 da Dworzec Centralny.",g:[["skm","Warszawa Centralna","Aeroporto"]]}},
WMI:{
 A:{min:90,txt:"Raggiungi Warszawa Centralna, poi prendi il treno Koleje Mazowieckie per Modlin (circa 40 minuti) e la navetta fino all'aeroporto (circa 10 minuti). Biglietto navetta e treno circa 21–25 zł (da controllare su mazowieckie.com.pl). In alternativa il ModlinBus, diretto, che fa servizio coordinato con i voli: controlla gli orari su modlinbus.pl. Metti in conto 90 minuti dal centro.",g:[["km","Warszawa Centralna","Modlin"],["nav","Modlin","Aeroporto"]]}}
};
var ARR={
WAW:[["skm","Aeroporto","Warszawa Centralna"]],
WMI:[["nav","Aeroporto","Modlin"],["km","Modlin","Warszawa Centralna"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Indirizzi, orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
familijny:{n:"Bar Mleczny Familijny",a:"Nowy Świat 39",z:"C",r:"n.d.",pos:[52.2327,21.0200],h:["07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","09:00-17:00",""],
 d:"Una delle «bar mleczny» del centro, le mense popolari polacche nate in epoca comunista, sulla via Nowy Świat. Si ordina al banco e si mangia a tavolini condivisi: żurek con salsiccia bianca, crespelle con la ricotta (naleśniki z twarogiem), cotolette di carne tritata.",pr:"Un piatto costa di solito 15–30 zł (3,50–7 €), una zuppa meno (stima da guide online: listino non visto). Orari da tablejourney.com, da confermare; chiuso la domenica."},
prasowy:{n:"Bar Mleczny Prasowy",a:"Marszałkowska 10/16",z:"B",r:"n.d.",pos:[52.2362,21.0117],h:D7("08:00-19:00"),
 d:"Una bar mleczny aperta dal 1954 in un palazzo del realismo socialista in centro: cucina polacca di casa a prezzi bassi, con zuppe, pierogi, cotolette e contorni da scegliere al banco.",pr:"Una zuppa costa di solito 4–8 zł e un piatto principale 15–30 zł (circa 1–7 €) (stima da guide online: listino non visto). Gli orari non li ho trovati: l'indicazione 8–19 è una stima, da controllare."},
pyzy:{n:"Pyzy, Flaki Gorące!",a:"Brzeska 29",z:"D",r:"n.d.",pos:[52.2556,21.0410],h:D7("11:00-22:00"),
 d:"Un locale di cucina polacca semplice a Praga, vicino al mercato Różycki: pyzy, grandi gnocchi di patate con il sugo di funghi, la zuppa di trippa (flaki) e il maiale impanato. Cucina da casa, senza decorazioni.",pr:"Un piatto sta intorno ai 20–40 zł (4,50–9 €) (stima, listino non visto). Orari da tablejourney.com, da confermare."},
pyzystare:{n:"Pyzy, Flaki Gorące! (Città Vecchia)",a:"Podwale 5",z:"A",r:"n.d.",pos:[52.2487,21.0100],h:D7("11:00-22:00"),
 d:"La sede della Città Vecchia dello stesso locale: pyzy con il sugo di funghi, flaki e il maiale impanato, a due passi dal Barbacane. Va bene per un pranzo o una cena polacca senza spendere come nei ristoranti della piazza.",pr:"Un piatto sta intorno ai 20–40 zł (4,50–9 €) (stima, listino non visto). Gli orari di questa sede non li ho trovati: sono quelli della sede di Praga, da controllare."},
wedel:{n:"Pijalnia Czekolady E. Wedel",a:"Szpitalna 8",z:"B",r:"n.d.",pos:[52.2350,21.0160],h:["09:00-22:00","09:00-22:00","09:00-22:00","09:00-22:00","09:00-22:00","09:00-22:00","09:00-21:00"],
 d:"Il salone della cioccolata del marchio polacco E. Wedel, aperto nel 1894, in una sala con specchi e lampadari: cioccolata calda densa, torte e cioccolatini. È un posto da colazione dolce o da merenda, non da pasto.",pr:"Una cioccolata calda con una fetta di torta sta intorno ai 30–50 zł (7–11 €) (stima, listino non visto). Orari da inyourpocket.com, da confermare."},
koszyki:{n:"Hala Koszyki",a:"Koszykowa 63",z:"B",r:"n.d.",pos:[52.2237,21.0152],h:D7("08:00-23:59"),
 d:"Un mercato coperto di inizio Novecento, restaurato, con più di venti banchi di cucina polacca e del mondo: panini, ramen, burger, formaggi e piatti caldi, e birra artigianale. Si prende da mangiare dai vari banchi e ci si siede ai tavoli comuni.",pr:"Un pasto sta intorno ai 30–60 zł (7–14 €) a seconda del banco (stima, listino non visto). Il mercato è aperto di norma dalle 8 all'1, ma i singoli banchi aprono più tardi o chiudono prima: controlla koszyki.com."},
lukullus:{n:"Lukullus (Mokotowska)",a:"Mokotowska 52A",z:"C",r:"n.d.",pos:[52.2207,21.0155],h:["09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-18:00"],
 d:"Una pasticceria di famiglia aperta dal 1946, nota per i pączki, le ciambelle fritte ripiene di marmellata di rosa, e per le torte. Ci si ferma a un tavolino o si compra per strada.",pr:"Un pączek costa di solito 6–10 zł (circa 1,50–2,30 €) e una fetta di torta 15–25 zł (stima, listino non visto). Orari da tablejourney.com, da confermare."},
beirut:{n:"Beirut Hummus & Music Bar",a:"Poznańska 12",z:"B",r:"n.d.",pos:[52.2276,21.0140],h:D7("12:00-23:59"),
 d:"Un locale libanese in una via del centro piena di ristoranti: hummus, falafel, mezze da dividere, e una carta di birre e vini libanesi. Non è cucina polacca, ma è una cena buona e a prezzo medio, aperta fino a tardi.",pr:"Un piatto o un giro di mezze sta intorno ai 40–70 zł (9–16 €) (stima, listino non visto). Secondo tablejourney.com è aperto fino alle 2 di notte; qui l'orario è segnato fino alla mezzanotte, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["wedel","koszyki"],B:["koszyki","wedel","prasowy"],C:["familijny","lukullus","koszyki"],D:["koszyki","wedel"]},
pra:{A:["pyzystare","prasowy","koszyki"],B:["prasowy","koszyki","beirut"],C:["familijny","koszyki","beirut"],D:["pyzy","koszyki"]},
cen:{A:["pyzystare","koszyki","beirut"],B:["koszyki","beirut","pyzystare"],C:["koszyki","beirut"],D:["pyzy","koszyki"]},
snk:{A:["wedel","koszyki"],B:["wedel","lukullus","koszyki"],C:["lukullus","wedel"],D:["wedel","koszyki"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"vecchia",t:"Città Vecchia, Castello Reale e Krakowskie Przedmieście",acts:["stare","zamek","krakowskie"],need:260,core:1},
{id:"mem",t:"Museo dell'Insurrezione e POLIN",acts:["powstanie","polin"],need:360,core:1,cl:[1]},
{id:"cultura",t:"Palazzo della Cultura e Piazza Piłsudski",acts:["pkin","sasski"],need:130},
{id:"verde",t:"Parco Łazienki e Palazzo di Wilanów",acts:["lazienki","wilanow"],need:360},
{id:"praga",t:"Praga e Koneser",acts:["praga"],need:140}
];
var ORDER=["stare","zamek","krakowskie","powstanie","polin","pkin","lazienki","wilanow","sasski","praga"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["vec","Città Vecchia e Krakowskie Przedmieście",[52.2440,21.0130],"A"],
["sro","Śródmieście (Centralna, Palazzo della Cultura)",[52.2300,21.0100],"B"],
["now","Nowy Świat, Powiśle e Mokotów",[52.2250,21.0200],"C"],
["pra","Praga",[52.2540,21.0430],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[52.2297,21.0122],""]
];
/* tassa di soggiorno: a Varsavia non risulta (da confermare) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Śniadanie","la colazione polacca: pane con burro, prosciutto, formaggio e uova, con tè o caffè."],["Pączek","la ciambella fritta ripiena di marmellata di rosa, tipica di Varsavia."],["Sernik","la torta di ricotta, un classico dei caffè."]],
pra:[["Zupa dnia","la zuppa del giorno, di solito con pane: il pasto veloce più economico."],["Pierogi","ravioli ripieni di patate e ricotta, carne, oppure cavolo e funghi."],["Żurek","zuppa acida di segale servita con salsiccia e uovo sodo."],["Pyzy","gnocchi di patate grandi, con il sugo di funghi."]],
cen:[["Bigos","stufato di crauti con carni diverse: il piatto tradizionale polacco."],["Kotlet schabowy","cotoletta di maiale impanata con patate e insalata di cavolo."],["Gołąbki","involtini di cavolo ripieni di carne e riso, con salsa di pomodoro."],["Flaki","la zuppa di trippa, tipica di Varsavia."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Rynek della Città Vecchia","Foto","Le case colorate della piazza, ricostruite dopo il 1944: meglio al mattino presto o a sera, con le luci accese.",[52.2497,21.0122],"Rynek Starego Miasta, Warszawa","stare"],
["🤳","La Sirenetta di Varsavia","Selfie","La statua della Sirena con spada e scudo, simbolo della città, al centro della piazza.",[52.2497,21.0122],"Syrenka Rynek Starego Miasta, Warszawa","stare"],
["📷","Il Barbacane","Foto","Il bastione di mattoni rossi con le mura medievali, specie al tramonto.",[52.2504,21.0105],"Barbakan, Warszawa","stare"],
["📷","La colonna di Sigismondo","Foto","La colonna sulla piazza del Castello, con il Castello Reale come sfondo.",[52.2479,21.0136],"Kolumna Zygmunta, Warszawa","zamek"],
["📷","Il Castello Reale dalla Vistola","Foto","La facciata verso il fiume, dai giardini sotto il Castello.",[52.2469,21.0158],"Zamek Królewski, Warszawa","zamek"],
["📷","Krakowskie Przedmieście","Foto","Il viale con la chiesa di Santa Croce e il palazzo presidenziale: il momento migliore è il tardo pomeriggio.",[52.2400,21.0160],"Krakowskie Przedmieście, Warszawa","krakowskie"],
["📷","Il Palazzo della Cultura","Foto","Il grattacielo visto da Plac Defilad, o dalla Złota 44 se vuoi un'altra inquadratura.",[52.2318,21.0060],"Pałac Kultury i Nauki, Warszawa","pkin"],
["📷","Il Giardino Sassone","Foto","Le fontane e i viali del parco, con le arcate della Tomba del Milite Ignoto.",[52.2418,21.0105],"Ogród Saski, Warszawa","sasski"],
["📷","Il Monumento all'Insurrezione","Foto","Il grande bronzo dei combattenti del 1944 in Plac Krasińskich: ricorda con rispetto, senza pose.",[52.2490,20.9990],"Pomnik Powstania Warszawskiego, Warszawa","powstanie"],
["📷","Il Monumento agli Eroi del Ghetto","Foto","Il monumento del 1948 davanti a POLIN: è un luogo di memoria, niente pose.",[52.2494,20.9934],"Pomnik Bohaterów Getta, Warszawa","polin"],
["📷","Il Palazzo sull'Isola","Foto","Il palazzo neoclassico riflesso nel laghetto del parco, soprattutto con le foglie d'autunno.",[52.2150,21.0356],"Pałac na Wyspie, Warszawa","lazienki"],
["🤳","Il monumento a Chopin","Selfie","La grande statua di Chopin sotto un salice, con lo stagno intorno.",[52.2158,21.0343],"Pomnik Fryderyka Chopina, Warszawa","lazienki"],
["📷","Il palazzo di Wilanów","Foto","La facciata gialla del palazzo vista dal giardino, nella luce del mattino.",[52.1651,21.0900],"Pałac w Wilanowie, Warszawa","wilanow"],
["📷","Il Koneser","Foto","Le ciminiere di mattoni della ex fabbrica di vodka, tra i locali del centro.",[52.2540,21.0445],"Centrum Praskie Koneser, Warszawa","praga"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-12-31",t:"Museo di Chopin chiuso fino a gennaio 2027",x:"Il Museo di Fryderyk Chopin (Okólnik 1) è chiuso per lavori dal 1° gennaio 2026 e dovrebbe riaprire a gennaio 2027 (pagina muzea.waw.pl del 30 settembre 2026). Non si può visitare: resta la chiesa di Santa Croce con il cuore di Chopin."},
{from:"2026-10-13",to:"2026-12-31",t:"Castello Reale: lavori al tetto, ma aperto",x:"Fino a dicembre 2026 ci sono lavori al tetto a fasi: il Castello Reale resta aperto, con aree segnalate. Il mercoledì l'ingresso gratuito riguarda solo alcune aree, e a novembre c'è un percorso gratuito delle sale di rappresentanza (muzea.waw.pl, 11 ottobre 2026)."},
{from:"2026-10-28",to:"2026-11-02",t:"1° novembre: Ognissanti, musei e negozi chiusi",x:"Il 1° novembre è festa nazionale in Polonia: il Castello Reale, il Museo dell'Insurrezione e il Museo di Varsavia sono chiusi, come i negozi. I cimiteri sono pieni di gente con i lumini; i mezzi pubblici seguono l'orario festivo."},
{from:"2026-11-09",to:"2026-11-12",t:"11 novembre: Festa dell'Indipendenza",x:"L'11 novembre è festa nazionale e a Varsavia c'è una grande marcia: alcune vie del centro vengono chiuse e i mezzi pubblici deviati. Negozi chiusi. Non ho i dettagli di quest'anno: controlla ztm.waw.pl nei giorni prima."},
{from:"2026-12-18",to:"2027-01-06",t:"Natale e Capodanno: musei chiusi o con orari ridotti",x:"Il 24 dicembre è festa in Polonia dal 2025: negozi chiusi il 24, 25 e 26 dicembre. Il Castello Reale chiude il 24, 25 e 31 dicembre e il 1° gennaio, il Museo dell'Insurrezione il 25 dicembre e il 1° gennaio, il Museo di Varsavia il 24–26 e 31 dicembre. Controlla gli orari degli altri musei."}
];
/* clima medio di Varsavia (indicativo, massime/minime) */
var CLIM=[[0,-5],[2,-4],[7,-1],[14,4],[20,9],[23,13],[25,15],[25,14],[19,10],[13,5],[6,1],[2,-2]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Varsavia: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd,P=E.plan,dt=(P&&P.date)||"";
var CL={zamek:["2026-11-01","2026-12-24","2026-12-25","2026-12-31","2027-01-01"],powstanie:["2026-11-01","2026-12-25","2027-01-01"],stare:["2026-11-01","2026-12-24","2026-12-25","2026-12-26","2026-12-31"]};
if(CL[it.id]&&CL[it.id].indexOf(dt)>=0)meta+=" Attenzione: in questa data il sito indica la visita come chiusa: scegli un altro giorno o controlla prima.";
if(it.id==="powstanie"&&WD===3)meta+=" Oggi è giovedì: l'ingresso al Museo dell'Insurrezione è gratuito, con biglietti da ritirare in cassa e code lunghe.";
if(it.id==="polin"&&WD===3)meta+=" Oggi è giovedì: l'ingresso a POLIN è gratuito.";
if(it.id==="polin"&&WD===5)meta+=" Oggi è sabato: POLIN apre fino alle 20.";
if(it.id==="zamek"&&WD===2)meta+=" Oggi è mercoledì: l'ingresso è gratuito solo ad alcune aree del Castello e le altre sale sono chiuse.";
if(it.id==="stare"&&WD===0)meta+=" Oggi è lunedì: il Museo di Varsavia sulla piazza è chiuso.";
if(it.id==="stare"&&WD===3)meta+=" Oggi è giovedì: il Museo di Varsavia apre fino alle 20 e la mostra permanente è gratuita.";
if(it.id==="wilanow"&&WD===3)meta+=" Oggi è giovedì: secondo una guida l'ingresso al museo è gratuito.";
return meta}
Object.assign(C,{id:"varsavia",n:"Varsavia",cn:"Polonia",e:"🧜",flag:"🇵🇱",col:["#c8102e","#1f3a6b","#e8e8e8"],k:"varsavia warsaw polonia",
TZ:"Europe/Warsaw",LL:[52.2297,21.0122],CC:"pl",QN:"Warsaw",BK:"Warsaw",ARE:/warszawa|warsaw|varsavia|\b0[0-4]-\d{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"pl-PL",LANGN:"polacco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"PLN",s:"zł",e:1/4.38},hub:{n:"Warszawa Centralna",q:"Warszawa Centralna railway station"},
SINGLE:{acts:["stare","zamek","krakowskie","pkin","lazienki"],ins:[]},
EXCL:[],
DICON:{stare:"🏘️",zamek:"👑",krakowskie:"⛪",sasski:"🌿",pkin:"🏢",powstanie:"🎖️",polin:"✡️",lazienki:"🌳",wilanow:"🏰",praga:"🏭"},
ZN:{A:"nella Città Vecchia e sul Krakowskie Przedmieście",B:"a Śródmieście",C:"a Nowy Świat e Mokotów",D:"a Praga"},
NEAR:{col:"caffè",pra:"locale veloce",cen:"locale",snk:"caffè o pasticceria"},
SE:{familijny:"🥞",prasowy:"🍲",pyzy:"🥟",pyzystare:"🥟",wedel:"🍫",koszyki:"🍽️",lukullus:"🍩",beirut:"🧆"},
TR:{one:1.0,cap:3.42,lbl:"Metro, tram e bus (ZTM)",
 air:{WAW:{one:1.0,n:"Treno SKM per l'aeroporto Chopin (biglietto urbano da 75 minuti, 4,40 zł)"},WMI:{one:5.0,n:"Navetta e treno per Modlin (circa 21–25 zł)"}},
 passes:[
 {n:"Biglietto 24 ore (zona 1)",d:1,max:1,p:3.42,note:"Il biglietto 24 ore per la zona 1 (15 zł, circa 3,40 €) vale su metro, tram, bus e treni SKM della città per 24 ore dalla convalida. Il biglietto per le zone 1 e 2 costa 26 zł (circa 5,90 €)."},
 {n:"Biglietto 72 ore (zona 1)",d:3,only:function(T){return T.n===3},p:8.22,note:"Il biglietto 72 ore per la zona 1 (36 zł, circa 8,20 €) vale su metro, tram, bus e treni SKM per tre giorni dalla convalida. Per le zone 1 e 2 costa 57 zł (circa 13 €)."}],
 note:"Prezzi dalla pagina del Comune di Varsavia (warszawa19115.pl, aggiornata il 20 novembre 2025), convertiti a 1 € = 4,38 zł: biglietto da 75 minuti nella zona 1 4,40 zł (circa 1,00 €), 24 ore 15 zł nella zona 1 e 26 zł nelle zone 1 e 2, 72 ore 36 zł nella zona 1 e 57 zł nelle zone 1 e 2, biglietto weekend 24 zł (dal venerdì alle 19 al lunedì alle 8). Non ho trovato conferme sul sito ZTM per il 2026: controlla ztm.waw.pl. Il centro e l'aeroporto Chopin sono nella zona 1, quindi il biglietto vale su metro M1 e M2, tram, bus e treni SKM. La navetta e il treno per Modlin sono un biglietto a parte, circa 21–25 zł (da controllare)."},
FOOD:{co:[6,"Colazione al caffè"],pr:[8,"Pranzo (bar mleczny, zuppa o pierogi)"],ce:[14,"Cena (cucina polacca)"],sp:[3,"Spuntini e dolci"]},
T:{ride:"In metro o tram",move:"a piedi, in metro, in tram e in bus",bags:"«Czy mogę zostawić tu bagaże?»",bagsPM:"«Czy mogę zostawić tu bagaże do popołudnia?»",bagsAM:"«Czy mogę zostawić tu bagaże do południa?»",
pra:"Una bar mleczny o un locale veloce",praZ:{A:"Sul Rynek e nelle vie intorno molti ristoranti con i tavoli in piazza sono per turisti e costano di più: per un pasto vero cerca le vie laterali, come Podwale e Piwna.",B:"Intorno al Palazzo della Cultura e a Marszałkowska ci sono molti locali di catena; per cucina polacca vera cerca una bar mleczny."},
freeLong:"Qualche idea: una sosta con una cioccolata calda da Wedel, una passeggiata nel parco Łazienki o nel Giardino Sassone, un giro nei locali del Koneser a Praga, un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata nel Giardino Sassone.",
remind:"Per il Castello Reale, il Museo dell'Insurrezione e POLIN conviene comprare prima il biglietto online. Il 1° novembre e l'11 novembre i musei e i negozi sono chiusi.",
rain1:"Al coperto: Castello Reale, Museo dell'Insurrezione, POLIN, Palazzo della Cultura (con la terrazza al chiuso) e le bar mleczne.",
rainM:"Al coperto: Castello Reale, Museo dell'Insurrezione, POLIN, Palazzo di Wilanów (interni), Museo di Varsavia e Hala Koszyki.",
water:"Riempite la borraccia: l'acqua del rubinetto di Varsavia è potabile (conferma con il tuo alloggio, perché nei palazzi vecchi i tubi interni possono dare sapore). Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Varsavia si pranza di solito tra le 12 e le 15 e si cena dalle 18: le bar mleczne chiudono presto (spesso intorno alle 19–20), i ristoranti restano aperti fino alle 22–23.",
night:[["🍺","Una birra polacca in uno dei locali di Praga o di Nowy Świat è il modo di chiudere la giornata."],["🕙","Le cucine servono fino alle 22–23; la metro gira fino a mezzanotte circa, nel fine settimana più a lungo, e dopo ci sono gli autobus notturni (linee N)."],["☕","Molti caffè aprono alle 8–9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Varsavia ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (le prese sono compatibili con quelle italiane, nessun adattatore)",
foodNote:"I pasti sono stime per bar mleczne e locali di quartiere: a Varsavia si mangia con poco, una cena completa con un piatto principale sta intorno ai 12–18 € a persona. Quasi ovunque si paga con la carta; per chioschi e bancarelle conviene avere qualche złoty. Cambio usato: 1 € = 4,38 zł.",
taxNote:"A Varsavia non risulta una tassa di soggiorno per i turisti: in Polonia la tassa locale (opłata miejscowa) riguarda le località turistiche e termali, e il Comune di Cracovia ha spiegato il 26 maggio 2026 che non c'è una base di legge per una tassa nelle grandi città. Per Varsavia non ho trovato una fonte del Comune: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: bar mleczne, caffè storici e locali di quartiere, niente catene. Colazione e cena restano sotto i 15–25 € a persona. Indirizzi, orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali; i voti Google non li ho letti («n.d.»). Controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Da Chopin il treno SKM S3 per Warszawa Centralna impiega circa 20 minuti ed è la via più rapida; l'autobus 175 costa lo stesso ma è più lento.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto da 75 minuti (4,40 zł) per il treno SKM dall'aeroporto Chopin, o biglietto 24 ore (15 zł): si comprano alle macchinette o con un'app per i biglietti",function(E){return true}],["zam","Biglietto per il Castello Reale (Royal Route: 60 zł): online, con data",["zamek"]],["pow","Biglietto per il Museo dell'Insurrezione (35 zł): online, o gratis il giovedì in cassa",["powstanie"]],["pol","Biglietto per POLIN (45 zł): online, o gratis il giovedì",["polin"]],["pk","Biglietto per la terrazza del Palazzo della Cultura (22 zł): online su bilety.pkin.pl",["pkin"]],["pln","Qualche złoty in contanti per bar mleczne, chioschi e bancarelle (la Polonia non usa l'euro)"],["card","Carta d'identità o passaporto in corso di validità"],["app","Un'app di taxi (Bolt, Uber) e un'app per i biglietti dei mezzi"]],
NUM:{2:["dwóch","dvuh"],3:["trzech","tsceh"],4:["czterech","CTE-reh"],5:["pięciu","PIEN-ciu"],6:["sześciu","SCEC-ciu"],7:["siedmiu","SIED-miu"],8:["ośmiu","OS-miu"],9:["dziewięciu","gie-VIEN-ciu"],10:["dziesięciu","gie-SCEN-ciu"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,Math.max(2,N))];var fr=[["Buongiorno / Buonasera","Dzień dobry / Dobry wieczór","gien DO-bri / DO-bri VIE-ciur"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Stolik dla "+(N===1?"jednej osoby":nu[0]+" osób")+", proszę","STO-lik dla "+(N===1?"IED-nei o-SO-bi":nu[1]+" O-sub")+", PRO-sce"],["Un caffè e una fetta di torta, per favore","Kawę i kawałek ciasta, proszę","KA-ve i ka-VA-uek CIA-sta, PRO-sce"],["Acqua del rubinetto, per favore","Wodę z kranu, proszę","VO-de s KRA-nu, PRO-sce"],["Il conto, per favore","Poproszę rachunek","po-PRO-sce ra-HU-nek"],["Posso pagare con la carta?","Czy mogę zapłacić kartą?","ci MO-ge za-PUA-cic KAR-tom"],["Quanto costa?","Ile to kosztuje?","I-le to kosc-TU-ie"],["Dov'è la fermata del tram?","Gdzie jest przystanek tramwajowy?","gdie iest psci-STA-nek tram-va-IO-vi"],["Dov'è la stazione del metro?","Gdzie jest stacja metra?","gdie iest STA-tsia ME-tra"],["Qual è il treno per l'aeroporto?","Który pociąg jedzie na lotnisko?","KTU-ri PO-cionk IE-gie na lot-NI-sko"]];
if(M)fr=fr.concat([["Ho una prenotazione","Mam rezerwację","mam re-zer-VA-tsie"],["Posso lasciare i bagagli?","Czy mogę zostawić bagaże?","ci MO-ge zo-STA-vic ba-GA-ze"],["A che ora è il check-out?","O której godzinie jest wymeldowanie?","o KTU-rei go-GI-nie iest vi-mel-do-VA-nie"]]);
return fr.concat([["Mi scusi","Przepraszam","psce-PRA-sciam"],["Grazie mille!","Dziękuję bardzo!","gien-KU-ie BAR-dzo"]])},
taxTxt:function(tx){return "A Varsavia non risulta una tassa di soggiorno ("+tx[1].toLowerCase()+"): il prezzo dell'annuncio è quello che paghi, ma non ho trovato una fonte del Comune di Varsavia: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["Il centro si gira in parte a piedi, ma le distanze sono più grandi che a Cracovia: la metro M1 (nord-sud) e la M2 (est-ovest) si incrociano a Świętokrzyska. Di notte ci sono gli autobus notturni (linee N), con un biglietto urbano."],
ZONES:[
["🚇 Metro, tram e biglietti",["Un solo biglietto vale su metro, tram, bus e treni SKM della zona 1: il biglietto da 75 minuti costa 4,40 zł (circa 1,00 €), il 24 ore 15 zł e il 72 ore 36 zł.","Il biglietto cartaceo va convalidato nella macchinetta prima di salire (o all'ingresso della metro). L'app dei biglietti evita la fila.","La metro ha due linee: M1 (blu) da nord a sud, M2 (rossa) da ovest a est, che si incrociano a Świętokrzyska. Il Palazzo della Cultura è tra Centrum e la stazione centrale.","Il treno per Modlin è un biglietto a parte, circa 21–25 zł (da controllare)."]],
["🏛️ Città Vecchia, Castello e Krakowskie Przedmieście",["La Città Vecchia, il Castello e il viale Krakowskie Przedmieście si fanno a piedi: dal Castello a Piazza Piłsudski sono circa 20 minuti.","La piazza del Castello è il punto d'incontro: da lì parte la Via Reale verso sud.","Il Museo di Chopin è chiuso per lavori fino a gennaio 2027."],["stare","zamek","krakowskie","sasski"]],
["🎖️ Memoria: Insurrezione, ghetto e POLIN",["Il Museo dell'Insurrezione (1944) e POLIN, il museo della storia degli ebrei, sono due visite lunghe e dure: non conviene metterle nella stessa mattina.","Davanti a POLIN c'è il Monumento agli Eroi del Ghetto, e il quartiere intorno (Muranów) fu quello del ghetto: parla piano, niente pose per le foto nei luoghi di dolore.","Entrambi sono chiusi il martedì e gratuiti il giovedì (con biglietti da ritirare in cassa)."],["powstanie","polin"]],
["🌳 Łazienki e Wilanów",["Łazienki è il parco più bello di Varsavia e si visita gratis; i palazzi dentro hanno un biglietto a parte.","Wilanów è a sud: autobus 116, 180 o 519 dal centro in 30–40 minuti, oppure taxi con un'app.","Entrambi si fanno meglio al mattino, con le giornate corte di novembre."],["lazienki","wilanow"]],
["🏭 Praga, la riva destra",["Praga non fu distrutta nel 1944 e conserva cortili e facciate d'epoca: oggi è il quartiere dei locali e dei murales.","Dalla Città Vecchia si arriva a Praga con la metro M2 (fermata Dworzec Wileński) o attraversando il ponte Świętokrzyski a piedi.","La sera Ząbkowska è il posto più vivo."],["praga"]],
["🌅 Un giorno fuori Varsavia",["Se hai un giorno in più, i dintorni sono più interessanti con un'auto o con i treni regionali: controlla gli orari su mazowieckie.com.pl e la tessera del museo che vuoi visitare."]]],
WTIPS:["L'acqua del rubinetto di Varsavia è potabile: puoi chiederla nei locali («Wodę z kranu, proszę») e riempire la borraccia; conferma con il tuo alloggio.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Polonia fa parte dello spazio Schengen, ma non usa l'euro: la moneta è lo złoty (PLN), circa 4,4 zł per 1 € (4,38 zł l'11 ottobre 2026). Le carte funzionano quasi ovunque.","Se uno sportello o il POS propone di pagare in euro invece che in złoty, scegli sempre gli złoty: il cambio proposto è peggiore. Evita i cambiavalute del centro e gli sportelli bancomat non bancari.","Varsavia ha lo stesso fuso orario dell'Italia.","Mancia: si lascia di solito il 10% al tavolo, a voce o arrotondando. Nelle bar mleczne non si lascia.","La domenica quasi tutti i negozi sono chiusi; restano aperti ristoranti, caffè e musei. Il 1° novembre, l'11 novembre, il 24, 25 e 26 dicembre i negozi sono chiusi.","Per i taxi usa un'app (Bolt, Uber): evita chi ti avvicina in aeroporto o in stazione.","La carta d'identità valida basta per entrare.","Il Museo dell'Insurrezione e POLIN sono luoghi di memoria: vestiti sobri, voce bassa, nessuna foto in posa.","Controlla orari e prezzi dei locali e dei musei qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (numero unico europeo; in Polonia anche 999 ambulanza e 997 polizia)</li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.ztm.waw.pl/" target="_blank" rel="noopener">ztm.waw.pl</a> · treni SKM: <a href="https://www.skm.warszawa.pl/" target="_blank" rel="noopener">skm.warszawa.pl</a> · treni regionali: <a href="https://www.mazowieckie.com.pl/" target="_blank" rel="noopener">mazowieckie.com.pl</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Varsavia: <a href="https://ambvarsavia.esteri.it" target="_blank" rel="noopener">ambvarsavia.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Varsavia. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.ztm.waw.pl/" target="_blank" rel="noopener">ztm.waw.pl</a> e, per i treni, <a href="https://www.mazowieckie.com.pl/" target="_blank" rel="noopener">mazowieckie.com.pl</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="350" cy="26" r="11"/><path d="M0 106 V94 Q50 80 104 86 Q144 90 164 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M6 106 V66 H66 V106 Z M6 66 V62 H66 V66 Z M12 62 V48 H24 V62 Z M11 48 H25 L18 34 Z M48 62 V44 H60 V62 Z M47 44 H61 L54 28 Z M54 28 V22 H55.5 V28 Z"/></g>'+
'<g style="--k:2"><path d="M80 106 V38 H83 V106 Z M78 38 H85 V35 H78 Z M80.5 35 V28 H82.5 V35 Z"/></g>'+
'<g style="--k:3"><path d="M96 106 V76 L104 68 L112 76 V106 Z M112 106 V72 L120 64 L128 72 V106 Z M128 106 V78 L136 70 L144 78 V106 Z M144 106 V74 L152 66 L160 74 V106 Z"/></g>'+
'<g style="--k:4"><path d="M174 106 V94 H190 V106 Z M178 94 V80 Q182 74 186 80 V94 Z M182 76 a3 3 0 1 1 0.01 0 Z M185 78 L196 62 L198 64 L187 80 Z"/></g>'+
'<g style="--k:5"><path d="M214 106 V78 H284 V106 Z M208 106 V86 H214 V106 Z M284 106 V86 H290 V106 Z M228 78 V60 H270 V78 Z M236 60 V44 H262 V60 Z M242 44 V30 H256 V44 Z M246 30 V20 H252 V30 Z M248.5 20 V4 H249.5 V20 Z"/></g>'+
'<g style="--k:6"><path d="M312 106 V32 H328 V106 Z M334 106 V50 H346 V106 Z M352 106 V22 H366 V106 Z M372 106 V62 H388 V106 Z M358.5 22 V8 H359.5 V22 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M232 84 h50 M232 92 h50"/><path d="M316 44 h10 M316 56 h10 M356 34 h8 M356 46 h8"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="30" cy="14" r="1.6"/><circle cx="104" cy="14" r="1.3"/><circle cx="176" cy="22" r="1.3"/><circle cx="292" cy="16" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="392" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.varsavia);

;var n=window.CITIES["varsavia"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["varsavia"]);
