(function(o){
/* ===== Vilnius (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.vilnius=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Vilnius (voli diretti dall'Italia: Bergamo, Milano Malpensa, Roma Ciampino, Treviso, Torino, Catania) e Kaunas (Bergamo, Pescara) */
var PAR={
VNO:{n:"Vilnius (VNO)",s:"Vilnius International Airport",url:"https://www.vilnius-airport.lt/en",live:"Vilnius",inMin:40,buf:120,pos:[54.6341,25.2858],sd:"Aeroporto VNO · bus 88 o treno",rt:"Dall'aeroporto: bus 88 (o 3G) fino alla Città Vecchia, oppure treno fino alla stazione di Vilnius e 15 minuti a piedi.",
 arr:"Dall'Italia si entra in Lituania senza controllo passaporti (spazio Schengen) e si paga in euro. L'aeroporto è molto vicino al centro. Hai due strade. Il bus 88 (o l'espresso 3G) parte dalla fermata accanto agli Arrivi e arriva in centro in circa 20–25 minuti; il 88 arriva nella Città Vecchia. Oppure il treno: la stazione dell'aeroporto è a circa 2 minuti a piedi dal terminal, in 8 minuti si arriva alla stazione di Vilnius, poi sono circa 15 minuti a piedi per via Aušros Vartų fino alla Città Vecchia. In tutto servono 35–45 minuti.",
 tk:"Biglietti: per il bus 60 minuti costano 1,25 € (si pagano anche con la carta contactless sul mezzo o nell'app Trafi); lo stesso biglietto urbano vale dall'aeroporto, che è dentro la città. Il treno costa 0,90 € a tratta, senza posto riservato (dal sito dell'aeroporto): si compra su ltglink.lt, nell'app LTG Link, alle macchinette o sul treno. Taxi e auto con app (Bolt, Uber) aspettano fuori dagli Arrivi e ci mettono 15–20 minuti; i prezzi non li ho verificati, controllali nell'app prima di partire.",
 gm:"Vilnius Airport (VNO)",
 tips:["I treni dall'aeroporto per Vilnius partono dalle 7:10 alle 19:20 circa, ma sono poco frequenti (16 al giorno, con attese di mezz'ora o più): se hai fretta, il bus 88 passa più spesso e di sera c'è il notturno 88N (dalle 22:30 alle 5:30).","Il biglietto del bus si convalida a bordo; la carta JUDU (1,50 €) si compra al Narvesen dell'aeroporto, ma per una gita in giornata basta la carta contactless o l'app Trafi.","Taxi e auto con app: confronta il prezzo prima di salire e non accettare passaggi da chi ti avvicina in aeroporto."]},
KUN:{n:"Kaunas (KUN)",s:"Kaunas Airport",url:"https://kaunas-airport.lt/en",live:"Kaunas",inMin:45,buf:150,pos:[54.9639,24.0848],sd:"Aeroporto KUN · bus e treno (circa 100 km)",rt:"Dall'aeroporto: bus di linea fino alla stazione di Kaunas, poi treno per Vilnius.",
 arr:"Kaunas è il secondo aeroporto della Lituania, a circa 100 km da Vilnius; ci arrivano voli diretti Ryanair da alcuni aeroporti italiani. Non c'è un collegamento diretto con Vilnius: dall'aeroporto si prende un bus di linea fino alla stazione di Kaunas (circa 40 minuti, linea e orari da controllare sul sito dell'aeroporto: non li ho verificati), poi il treno per Vilnius, che impiega da 1 ora e 5 a 1 ora e 40 minuti secondo il tipo di treno. In tutto servono 2 ore e 30 minuti–3 ore. Per una gita in giornata conviene solo se il volo costa molto meno di quelli per Vilnius.",
 tk:"Biglietti: il treno Kaunas–Vilnius costa circa 10 € in seconda classe sui treni veloci (prezzo da una guida ferroviaria, non dal sito delle ferrovie: da confermare su ltglink.lt), più o meno la metà sui treni regionali. Il bus dall'aeroporto alla stazione di Kaunas costa poco (prezzo non verificato). Dalla stazione di Vilnius sono circa 15 minuti a piedi fino alla Città Vecchia.",
 gm:"Kaunas Airport (KUN)",
 tips:["Valuta il tempo di ritorno: l'ultimo treno da Vilnius per Kaunas e il bus per l'aeroporto vanno controllati su ltglink.lt prima di partire.","Se perdi il collegamento a Kaunas non c'è un bus diretto per Vilnius dall'aeroporto: tieni un margine di almeno un'ora.","Per una sola giornata a Vilnius, l'aeroporto di Vilnius è quasi sempre la scelta migliore."]}
};
/* linee (tracciati indicativi) */
var SEG={
b88:{c:"#0072bc",n:"Bus 88 dall'aeroporto",p:[[54.6341,25.2858,"Aeroporto",2],[54.6706,25.2833,"Stazione di Vilnius",2],[54.6783,25.2876,"Città Vecchia",2]]},
tr:{c:"#00794a",n:"Treno aeroporto–stazione di Vilnius",p:[[54.6345,25.2840,"Aeroporto",2],[54.6706,25.2833,"Stazione di Vilnius",2]]},
trk:{c:"#00794a",n:"Treno Kaunas–Vilnius",p:[[54.8970,23.9072,"Stazione di Kaunas",2],[54.6706,25.2833,"Stazione di Vilnius",2]]},
bk:{c:"#0072bc",n:"Bus aeroporto di Kaunas–stazione",p:[[54.9639,24.0848,"Aeroporto di Kaunas",2],[54.8970,23.9072,"Stazione di Kaunas",2]]}
};
var START=[54.6783,25.2876];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti; cl = giorni di chiusura (0 = lunedì) */
var STOPS={
katedra:{t:"Cattedrale e Piazza della Cattedrale",z:"B",p:1,min:30,id:50,max:80,pos:[54.6858,25.2877],q:"Vilnius Cathedral, Vilnius",cls:"walk",sun:1,
 d:"La cattedrale neoclassica con il portico a colonne bianche e il campanile separato, il vero cuore della città. Sulla piazza c'è la piastrella «Stebuklas» (il miracolo): per tradizione si sta sopra, si gira tre volte in senso orario e si esprime un desiderio. Subito dietro sale la collina del castello.",
 m:"La piazza si vede gratis in ogni momento. La cattedrale è visitabile fuori dalle funzioni; gli orari esatti e il prezzo di cripta e campanile non li ho trovati su un sito ufficiale: controlla sulla pagina di Go Vilnius (govilnius.lt) o davanti alla porta."},
gediminas:{t:"Torre di Gediminas e Collina del Castello",z:"B",p:1,min:60,id:90,max:130,pos:[54.6869,25.2909],q:"Gediminas Tower, Vilnius",cls:"",sun:1,tk:[8,"Torre di Gediminas (8 €)",1,1],
 win:function(){return[10*60,20*60]},
 d:"Quello che resta del castello dei granduchi di Lituania: una torre di mattoni rossi sulla collina sopra la Città Vecchia. Dentro c'è un piccolo museo e in cima una terrazza con la vista più bella sui tetti rossi di Vilnius.",
 m:"Aperta ogni giorno dalle 10 alle 20, la biglietteria chiude mezz'ora prima (sito del Museo Nazionale di Lituania, lnm.lt). Biglietto 8 €, ridotto 4 €; il «Triangolo storico» con Casa del Castellano e Vecchio Arsenale costa 15 €. L'ultima domenica del mese l'ingresso è gratuito per tutti. Si sale a piedi in circa 10 minuti, con una scalinata di legno scivolosa con pioggia o gelo, oppure con la funicolare (3 € andata e ritorno, 2 € una corsa, 10–20): una guida segnala che era ferma per lavori nel 2025, quindi controlla che funzioni. Chiusa il 1° e 2 novembre e il 24 e 25 dicembre."},
valdovu:{t:"Palazzo dei Granduchi di Lituania",z:"B",p:2,min:60,id:90,max:140,pos:[54.6862,25.2926],q:"Palace of the Grand Dukes of Lithuania, Vilnius",cls:"",cl:[0],sun:0,tk:[10,"Palazzo dei Granduchi: un percorso (4–10 €)",1,1],
 win:function(wd){return[10*60,wd===3?20*60:wd===6?16*60:18*60]},
 d:"La residenza dei granduchi, distrutta nell'Ottocento e ricostruita negli anni 2000 ai piedi della collina. Dentro ci sono sale gotiche e rinascimentali arredate, gli scavi nei sotterranei e mostre sulla storia della Lituania.",
 m:"Da settembre a maggio: martedì, mercoledì, venerdì e sabato 10–18, giovedì 10–20, domenica 10–16; lunedì chiuso. L'ultimo ingresso è un'ora prima della chiusura (sito ufficiale valdovurumai.lt). Si compra un percorso alla volta: costano da 4 a 10 € ciascuno, tutti e quattro 17 €, con sconto fino al 50% sui percorsi aggiuntivi. L'ultima domenica del mese l'ingresso è gratuito. Chiuso il 1° novembre e dal 24 al 26 dicembre."},
pilies:{t:"Via Pilies e Città Vecchia",z:"A",p:1,min:50,id:80,max:130,pos:[54.6838,25.2873],q:"Pilies gatvė, Vilnius",cls:"walk",multi:1,sun:1,
 d:"La strada principale della Città Vecchia, dalla Piazza della Cattedrale in giù: botteghe di ambra e di lino, caffè, cortili nascosti e artisti di strada. Prosegue nella Didžioji gatvė fino al Municipio, in mezzo a una delle città vecchie barocche più grandi d'Europa.",
 m:"Si cammina gratis in ogni momento. I ristoranti sulla via Pilies sono per turisti e costano più delle vie laterali; per mangiare meglio svolta in Stiklių gatvė o in Šv. Mikalojaus gatvė."},
univ:{t:"Università e Campanile di San Giovanni",z:"A",p:2,min:45,id:70,max:110,pos:[54.6826,25.2878],q:"Vilnius University, Universiteto g. 3, Vilnius",cls:"",sun:1,tk:[7,"Campanile di San Giovanni (7 €)",1,1],
 win:function(){return[10*60,19*60]},
 d:"Una delle università più antiche dell'Europa orientale (1579): una serie di cortili interni con arcate e affreschi, e la chiesa di San Giovanni con l'alto campanile bianco. Dalla cima si vede tutta la Città Vecchia.",
 m:"Cortili: lunedì–sabato 9–18; chiesa di San Giovanni lunedì–sabato 9–19, domenica 9–15; campanile ogni giorno 10–19 con biglietti fino alle 18:30 (sito del museo dell'università, muziejus.vu.lt, pagina senza data: da confermare). Biglietto del campanile 7 € (4 € ridotto). L'ingresso è dal lato di Universiteto gatvė."},
aurora:{t:"Porta dell'Alba e chiesa di Santa Teresa",z:"A",p:2,min:20,id:35,max:60,pos:[54.6742,25.2899],q:"Gate of Dawn, Vilnius",cls:"walk",sun:1,
 win:function(wd,d){return[(d&&d<"2026-11-01"?6:7)*60,19*60]},
 d:"L'unica porta rimasta delle mura medievali di Vilnius, con una cappella sopra, aperta sulla strada, dove si venera il quadro della Madonna della Misericordia, meta di pellegrinaggio. Accanto c'è la chiesa barocca di Santa Teresa.",
 m:"Cappella: ogni giorno 6–19 da maggio a ottobre, 7–19 da novembre ad aprile; chiesa di Santa Teresa lunedì–sabato 10–19, domenica 7–19 (Go Vilnius). L'ingresso è gratuito. È un luogo di preghiera: la via sotto la cappella è piena di fedeli, per cui si passa in silenzio."},
anne:{t:"Chiesa di Sant'Anna e dei Bernardini",z:"A",p:3,min:20,id:35,max:60,pos:[54.6818,25.2944],q:"St. Anne's Church, Vilnius",cls:"walk",sun:1,
 d:"Una piccola chiesa gotica in mattoni rossi, con una facciata fitta di guglie e finestre: secondo la leggenda Napoleone se ne innamorò e avrebbe voluto portarla a Parigi. Dietro c'è la grande chiesa dei Bernardini.",
 m:"L'ingresso è gratuito, ma gli orari interni sono limitati e non li ho trovati su un sito ufficiale: se è chiusa, la facciata si vede da fuori in ogni momento. Si fotografa meglio la mattina."},
uzupis:{t:"Užupis, la repubblica degli artisti",z:"C",p:2,min:40,id:70,max:120,pos:[54.6810,25.2980],q:"Užupis, Vilnius",cls:"walk",multi:1,sun:1,
 d:"Il quartiere bohémien oltre il fiume Vilnia, che dal 1° aprile 1997 si proclama «repubblica» con tanto di Costituzione, scritta su targhe in tante lingue lungo la Paupio gatvė. Ci sono gallerie, caffè, la statua dell'Angelo di Užupis nella piazza principale e la piccola Sirena sul lungofiume.",
 m:"Si cammina gratis in ogni momento. Il timbro «Užupis» sul passaporto costa pochi euro. Per mangiare ci sono caffè e locali sul lungofiume."},
hales:{t:"Mercato coperto di Halės",z:"D",p:3,min:40,id:60,max:90,pos:[54.6764,25.2838],q:"Halės turgus, Pylimo g. 58, Vilnius",cls:"",sun:1,
 win:function(wd){return[7*60,wd===6?15*60:18*60]},
 d:"Il mercato più antico di Vilnius, in un edificio con struttura di ferro del 1906: banchi di formaggi, carni, verdure, pane, e piccoli locali con caffè torrefatto, panini e piatti caldi. È il posto giusto per assaggiare i prodotti lituani senza i prezzi del centro.",
 m:"Il mercato è aperto da martedì a sabato 7–18 e la domenica 7–15 (scheda ufficiale di Go Vilnius, del 2024); il lunedì non è indicato e probabilmente è chiuso: controlla. I singoli banchi hanno orari propri, di solito dalle 9–10 alle 16–17."},
kgb:{t:"Museo delle Occupazioni e delle Lotte per la Libertà",z:"F",p:3,min:60,id:90,max:130,pos:[54.6897,25.2688],q:"Genocido aukų muziejus, Aukų g. 2A, Vilnius",cls:"",cl:[0,1],sun:0,tk:[6,"Museo delle Occupazioni (6 €)",1,1],
 win:function(wd){return[10*60,wd===6?17*60:18*60]},
 d:"Il museo nell'ex sede del KGB sovietico, accanto a Piazza Lukiškės: mostra l'occupazione sovietica e la resistenza lituana. Le celle e la sala degli interrogatori nel seminterrato sono la parte più impressionante.",
 m:"Mercoledì–sabato 10–18, domenica 10–17; lunedì e martedì chiuso, e chiuso nei giorni festivi nazionali (govilnius.lt). Biglietto 6 €, ridotto 3 €. Il percorso nelle celle è duro e non adatto ai bambini piccoli."},
croci:{t:"Colle delle Tre Croci",z:"B",p:4,min:35,id:55,max:90,pos:[54.6868,25.3003],q:"Three Crosses Hill, Vilnius",cls:"walk",sun:1,
 d:"Tre grandi croci bianche di cemento su una collina a est della Città Vecchia, nel parco Kalnų: un punto panoramico gratuito, ottimo al tramonto, che ricorda i frati francescani uccisi secondo la tradizione e le deportazioni sovietiche.",
 m:"Il parco è sempre aperto e gratuito. La salita dalla piazza della Cattedrale richiede circa 15 minuti; il sentiero è ripido e può essere scivoloso con la pioggia o il ghiaccio, per cui servono buone scarpe."}
};
/* collegamenti tra le tappe (le coppie mancanti sono calcolate dall'app in base alla distanza) */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","pilies",8,"walk","A piedi lungo la Didžioji gatvė, dal Municipio verso nord, circa 8 minuti, fino all'inizio di via Pilies.","A piedi lungo la Didžioji gatvė fino al Municipio, circa 8 minuti.",{f:[W([[54.6783,25.2876],[54.6810,25.2872],[54.6838,25.2873]])],r:[W([[54.6838,25.2873],[54.6810,25.2872],[54.6783,25.2876]])]});
P2("start","katedra",12,"walk","A piedi per la Didžioji e via Pilies fino alla Piazza della Cattedrale, circa 12 minuti.","A piedi per via Pilies e la Didžioji fino al Municipio, circa 12 minuti.",{f:[W([[54.6783,25.2876],[54.6838,25.2873],[54.6858,25.2877]])],r:[W([[54.6858,25.2877],[54.6838,25.2873],[54.6783,25.2876]])]});
P2("start","aurora",8,"walk","A piedi lungo la Aušros Vartų gatvė fino alla Porta dell'Alba, circa 8 minuti in salita.","A piedi lungo la Aušros Vartų gatvė fino al Municipio, circa 8 minuti.",{f:[W([[54.6783,25.2876],[54.6760,25.2888],[54.6742,25.2899]])],r:[W([[54.6742,25.2899],[54.6760,25.2888],[54.6783,25.2876]])]});
P2("pilies","katedra",5,"walk","A piedi in fondo a via Pilies fino alla Piazza della Cattedrale, circa 5 minuti.","A piedi su via Pilies in direzione del Municipio, circa 5 minuti.",{f:[W([[54.6838,25.2873],[54.6858,25.2877]])],r:[W([[54.6858,25.2877],[54.6838,25.2873]])]});
P2("katedra","gediminas",8,"walk","A piedi dalla piazza alla collina del castello: la scalinata di legno richiede circa 8 minuti; in alternativa la funicolare dal cortile del Vecchio Arsenale.","A piedi dalla torre alla Piazza della Cattedrale, circa 8 minuti.",{f:[W([[54.6858,25.2877],[54.6864,25.2893],[54.6869,25.2909]])],r:[W([[54.6869,25.2909],[54.6864,25.2893],[54.6858,25.2877]])]});
P2("katedra","valdovu",5,"walk","A piedi dietro la cattedrale fino al Palazzo dei Granduchi, circa 5 minuti.","A piedi fino alla Piazza della Cattedrale, circa 5 minuti.",{f:[W([[54.6858,25.2877],[54.6860,25.2905],[54.6862,25.2926]])],r:[W([[54.6862,25.2926],[54.6860,25.2905],[54.6858,25.2877]])]});
P2("gediminas","valdovu",6,"walk","A piedi giù dalla collina fino al Palazzo dei Granduchi, circa 6 minuti.","A piedi su per la collina fino alla Torre di Gediminas, circa 6 minuti.",{f:[W([[54.6869,25.2909],[54.6865,25.2918],[54.6862,25.2926]])],r:[W([[54.6862,25.2926],[54.6865,25.2918],[54.6869,25.2909]])]});
P2("pilies","univ",4,"walk","A piedi lungo via Pilies fino all'ingresso dell'università, circa 4 minuti.","A piedi su via Pilies in direzione della cattedrale, circa 4 minuti.",{f:[W([[54.6838,25.2873],[54.6826,25.2878]])],r:[W([[54.6826,25.2878],[54.6838,25.2873]])]});
P2("univ","anne",7,"walk","A piedi per la Maironio gatvė fino a Sant'Anna, circa 7 minuti.","A piedi fino all'università, circa 7 minuti.",{f:[W([[54.6826,25.2878],[54.6822,25.2912],[54.6818,25.2944]])],r:[W([[54.6818,25.2944],[54.6822,25.2912],[54.6826,25.2878]])]});
P2("anne","uzupis",12,"walk","A piedi oltre il fiume Vilnia fino alla piazza di Užupis, circa 12 minuti.","A piedi fino alla chiesa di Sant'Anna, circa 12 minuti.",{f:[W([[54.6818,25.2944],[54.6808,25.2955],[54.6810,25.2980]])],r:[W([[54.6810,25.2980],[54.6808,25.2955],[54.6818,25.2944]])]});
P2("start","uzupis",13,"walk","A piedi per Vilniaus gatvė e il ponte sulla Vilnelė fino a Užupis, circa 13 minuti.","A piedi fino al Municipio, circa 13 minuti.",{f:[W([[54.6783,25.2876],[54.6795,25.2930],[54.6810,25.2980]])],r:[W([[54.6810,25.2980],[54.6795,25.2930],[54.6783,25.2876]])]});
P2("aurora","hales",8,"walk","A piedi per la Aušros Vartų gatvė e la Pylimo fino al mercato di Halės, circa 8 minuti.","A piedi fino alla Porta dell'Alba, circa 8 minuti.",{f:[W([[54.6742,25.2899],[54.6755,25.2870],[54.6764,25.2838]])],r:[W([[54.6764,25.2838],[54.6755,25.2870],[54.6742,25.2899]])]});
P2("start","hales",10,"walk","A piedi per la Vokiečių gatvė fino al mercato di Halės, circa 10 minuti.","A piedi fino al Municipio, circa 10 minuti.",{f:[W([[54.6783,25.2876],[54.6772,25.2858],[54.6764,25.2838]])],r:[W([[54.6764,25.2838],[54.6772,25.2858],[54.6783,25.2876]])]});
P2("katedra","croci",15,"walk","A piedi attraverso il parco Kalnų, circa 15 minuti in salita.","A piedi giù dal parco Kalnų fino alla Piazza della Cattedrale, circa 15 minuti.",{f:[W([[54.6858,25.2877],[54.6865,25.2940],[54.6868,25.3003]])],r:[W([[54.6868,25.3003],[54.6865,25.2940],[54.6858,25.2877]])]});
P2("gediminas","croci",12,"walk","A piedi per il sentiero del parco Kalnų, circa 12 minuti in salita.","A piedi dalle Tre Croci alla Torre di Gediminas, circa 12 minuti.",{f:[W([[54.6869,25.2909],[54.6868,25.2960],[54.6868,25.3003]])],r:[W([[54.6868,25.3003],[54.6868,25.2960],[54.6869,25.2909]])]});
P2("katedra","kgb",18,"walk","A piedi per tutto il viale Gedimino (Gedimino prospektas) fino a Piazza Lukiškės, circa 18 minuti.","A piedi lungo il viale Gedimino fino alla Piazza della Cattedrale, circa 18 minuti.",{f:[W([[54.6858,25.2877],[54.6880,25.2780],[54.6897,25.2688]])],r:[W([[54.6897,25.2688],[54.6880,25.2780],[54.6858,25.2877]])]});
P2("start","kgb",22,"walk","A piedi per Vilniaus gatvė e il viale Gedimino fino a Piazza Lukiškės, circa 22 minuti.","A piedi fino al Municipio, circa 22 minuti.",{f:[W([[54.6783,25.2876],[54.6840,25.2790],[54.6897,25.2688]])],r:[W([[54.6897,25.2688],[54.6840,25.2790],[54.6783,25.2876]])]});
/* ritorno in aeroporto */
var RET={
VNO:{
 A:{min:45,txt:"Dal Municipio prendi il bus 88 (o l'espresso 3G) dalla fermata più vicina, in circa 20–25 minuti; biglietto 60 minuti 1,25 €. In alternativa 15 minuti a piedi fino alla stazione di Vilnius e treno per l'aeroporto (8 minuti, 0,90 €): l'ultimo parte verso le 18:30 secondo la scheda LTG Link che ho letto (da confermare), dopo vai in bus.",g:[["b88","Città Vecchia","Aeroporto"]]}},
KUN:{
 A:{min:200,txt:"Dalla stazione di Vilnius (15 minuti a piedi dal Municipio) prendi il treno per Kaunas (da 1 ora e 5 a 1 ora e 40 minuti, circa 10 € sui treni veloci), poi il bus per l'aeroporto (circa 40 minuti, da controllare). Controlla gli orari dell'ultimo treno su ltglink.lt e tieni un margine di un'ora.",g:[["trk","Stazione di Vilnius","Stazione di Kaunas"],["bk","Stazione di Kaunas","Aeroporto di Kaunas"]]}}
};
var ARR={
VNO:[["b88","Aeroporto","Città Vecchia"]],
KUN:[["bk","Aeroporto di Kaunas","Stazione di Kaunas"],["trk","Stazione di Kaunas","Stazione di Vilnius"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari da schede online (Table Journey, Wolt, pagina di Go Vilnius), non letti sui siti dei locali: da confermare. Il voto non è stato verificato (n.d.) */
var V={
lokys:{n:"Lokys",a:"Stiklių g. 8",z:"A",r:"n.d.",pos:[54.6810,25.2853],h:D7("12:00-24:00"),
 d:"Un ristorante in una cantina con volte di mattoni in una traversa di via Pilies, specializzato in cucina lituana con selvaggina e piatti tradizionali: zuppa fredda di barbabietole (šaltibarščiai), cepelinai, carne alla griglia e birra locale.",pr:"Fascia medio-alta nella scheda (tre simboli su quattro). Le zuppe costano 8–9 € (menù di Wolt): per un piatto principale metti in conto 15–22 € (stima). Orari da guide, da confermare."},
snekutis:{n:"Šnekutis",a:"Šv. Mikalojaus g. 15",z:"A",r:"n.d.",pos:[54.6798,25.2862],h:D7("11:00-23:00"),
 d:"Un ristorante di cucina lituana tradizionale in una strada tranquilla del centro: cepelinai, frittelle di patate (bulviniai blynai), zuppe e carne con patate, in sale semplici e senza fretta.",pr:"Fascia media (due simboli su quattro nella scheda). Listino non letto: orientativamente un piatto 10–16 € (stima). Orari da guide, da confermare."},
trobele:{n:"Senoji Trobelė",a:"Naugarduko g. 36",z:"D",r:"n.d.",pos:[54.6805,25.2720],h:["11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","12:00-23:00","12:00-23:00"],
 d:"Una trattoria di cucina lituana appena fuori dalla Città Vecchia, frequentata dai vilnesi: cepelinai con ricotta, gnocchi di patate con spinaci, pane di lino cotto ogni giorno e un liquore al miele (balsamo Žalgiris).",pr:"Fascia media (due simboli su quattro nella scheda). Listino non letto: orientativamente un piatto 9–15 € (stima). Orari da guide, da confermare."},
uzupio:{n:"Užupio Kavinė",a:"Užupio g. 2",z:"C",r:"n.d.",pos:[54.6808,25.2952],h:D7("11:00-23:00"),
 d:"Il caffè-ristorante sul lungofiume all'ingresso di Užupis, accanto al ponte e alla sirena: cucina lituana semplice, zuppe, insalate e dolci, con vista sul fiume.",pr:"Fascia media (due simboli su quattro nella scheda). Listino non letto: orientativamente 8–15 € a pasto (stima). Orari da guide, da confermare."},
mint:{n:"Mint Vinetu",a:"Šv. Ignoto g. 16",z:"A",r:"n.d.",pos:[54.6803,25.2866],h:["10:00-21:00","10:00-21:00","10:00-21:00","10:00-21:00","10:00-21:00","10:00-21:00","11:00-19:00"],
 d:"Un caffè con libreria in una via interna della Città Vecchia: torte fatte in casa, snack vegani e tè alla menta. Un posto tranquillo per fermarsi con un libro.",pr:"Fascia bassa (un simbolo su quattro nella scheda). Un tè con una fetta di torta costa orientativamente 5–8 € (stima). Orari da guide, da confermare."},
bagel:{n:"Beigelių Krautuvėlė (The Bagel Shop)",a:"Pylimo g. 4",z:"D",r:"n.d.",pos:[54.6789,25.2815],h:["10:00-17:00","10:00-17:00","10:00-17:00","10:00-17:00","10:00-17:00","",""],
 d:"Una piccola bottega di bagel nel quartiere ebraico storico, vicino al museo ebraico di Pylimo: bagel con salmone (bagel lox), bialy e altri prodotti da forno ebraici. Per un pasto veloce o da portare in giro.",pr:"Fascia bassa (un simbolo su quattro nella scheda). Un bagel con salmone sta orientativamente sui 5–8 € (stima). Chiuso il sabato e la domenica; di pomeriggio finisce tutto. Orari da guide, da confermare."},
hales:{n:"Mercato Halės: Depeche Coffee e Smoke House",a:"Pylimo g. 58",z:"D",r:"n.d.",pos:[54.6764,25.2838],h:["","08:00-16:00","08:00-16:00","08:00-16:00","08:00-16:00","08:00-16:00","08:00-15:00"],
 d:"Dentro il mercato coperto di Halės: un banco di caffè appena torrefatto per la colazione e Smoke House con panini al pastrami e altri piatti caldi, da mangiare in piedi o ai tavoli del mercato.",pr:"Fascia bassa (un simbolo su quattro per il bistrot del mercato nella scheda). Un caffè e un panino stanno orientativamente sui 8–12 € (stima). Il lunedì il mercato è probabilmente chiuso. Orari dalla scheda ufficiale di Go Vilnius del 2024, da confermare."},
rosehip:{n:"RoseHip Vegan Bistro",a:"Vilniaus g. 22",z:"F",r:"n.d.",pos:[54.6833,25.2798],h:["11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","12:00-21:00"],
 d:"Un bistrot vegano nel centro, tra Città Vecchia e viale Gedimino: zuppe, bowl e hamburger di verdure con prodotti locali. Una pausa leggera tra una tappa e l'altra.",pr:"Fascia media (due simboli su quattro nella scheda). Un piatto sta orientativamente sui 9–14 € (stima). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["mint","hales","bagel"],B:["mint","hales"],C:["mint","uzupio"],D:["hales","bagel"],F:["rosehip","hales"]},
pra:{A:["snekutis","mint","lokys"],B:["snekutis","lokys"],C:["uzupio","mint"],D:["hales","trobele","bagel"],F:["rosehip","snekutis"]},
cen:{A:["lokys","snekutis","trobele"],B:["lokys","snekutis"],C:["uzupio","lokys"],D:["trobele","lokys"],F:["rosehip","lokys"]},
snk:{A:["mint","bagel"],B:["mint","snekutis"],C:["uzupio","mint"],D:["hales","bagel"],F:["rosehip","mint"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Cattedrale, Torre di Gediminas e Palazzo dei Granduchi",acts:["katedra","gediminas","valdovu"],need:240,core:1,cl:[0]},
{id:"vecchia",t:"Via Pilies e Università",acts:["pilies","univ"],need:140,core:1},
{id:"uzupis",t:"Sant'Anna e Užupis",acts:["anne","uzupis"],need:140,core:1},
{id:"porta",t:"Porta dell'Alba e mercato di Halės",acts:["aurora","hales"],need:110},
{id:"gedimino",t:"Museo delle Occupazioni e Colle delle Tre Croci",acts:["kgb","croci"],need:190,cl:[0,1]}
];
var ORDER=["katedra","gediminas","pilies","valdovu","univ","uzupis","aurora","anne","hales","kgb","croci"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cv","Città Vecchia (Senamiestis)",[54.6810,25.2870],"A"],
["cat","Cattedrale e Colle del Castello",[54.6862,25.2900],"B"],
["uzu","Užupis",[54.6810,25.2975],"C"],
["sta","Stazione e Halės (Naujamiestis)",[54.6735,25.2835],"D"],
["ged","Viale Gedimino e Lukiškės",[54.6890,25.2720],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[54.6783,25.2876],""]
];
/* tassa di soggiorno di Vilnius: 2 € a persona e a notte dal 1° gennaio 2024; esenti i minori di 18 anni */
var TAX=[["h5","Hotel 4–5 stelle",2],["h3","Hotel fino a 3 stelle, B&B o appartamento",2],["host","Ostello o struttura economica",2],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Kava ir bandelė","un caffè con un panino dolce o un croissant."],["Blynai","frittelle sottili con panna acida o marmellata."],["Kepta duona","pane di segale fritto con aglio e formaggio: più uno spuntino che una colazione, ma tipico."]],
pra:[["Cepelinai","grossi gnocchi di patate a forma di dirigibile, ripieni di carne o ricotta, con pancetta e panna acida."],["Bulviniai blynai","frittelle di patate con panna acida."],["Šaltibarščiai","zuppa fredda rosa di barbabietola e kefir con patate calde: il piatto simbolo dell'estate, ma si trova tutto l'anno."],["Kibinai","pasticcini ripieni di carne, specialità di Trakai."]],
cen:[["Cepelinai","gnocchi di patate ripieni, con salsa di pancetta e funghi."],["Kugelis","budino di patate al forno con pancetta."],["Žemaičių blynai","frittelle di patate ripiene di carne."],["Skilandis ir juoda duona","salume affumicato con pane di segale e un boccale di birra locale."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","La Piazza della Cattedrale","Foto","La facciata bianca con le colonne e il campanile separato, meglio la mattina presto con poca gente.",[54.6858,25.2877],"Vilnius Cathedral, Vilnius","katedra"],
["🤳","La piastrella Stebuklas","Selfie","Al centro della piazza: si gira tre volte in senso orario e si esprime un desiderio. Di solito c'è un po' di coda.",[54.6857,25.2868],"Stebuklas, Cathedral Square, Vilnius","katedra"],
["📷","Vilnius dalla Torre di Gediminas","Foto","I tetti rossi, le guglie delle chiese e la città nuova in lontananza, soprattutto verso il tramonto.",[54.6869,25.2909],"Gediminas Tower, Vilnius","gediminas"],
["📷","Il Palazzo dei Granduchi","Foto","La facciata ricostruita vista dalla strada, sotto la collina.",[54.6862,25.2926],"Palace of the Grand Dukes of Lithuania, Vilnius","valdovu"],
["📷","Via Pilies","Foto","La strada in discesa vista dal basso, con le insegne dei negozi e i cortili.",[54.6838,25.2873],"Pilies gatvė, Vilnius","pilies"],
["📷","I cortili dell'università","Foto","Le arcate e gli affreschi dei cortili interni, quasi senza folla.",[54.6826,25.2878],"Vilnius University, Universiteto g. 3, Vilnius","univ"],
["📷","La Porta dell'Alba","Foto","La cappella sopra l'arco di mattoni, vista dalla strada di sotto.",[54.6742,25.2899],"Gate of Dawn, Vilnius","aurora"],
["📷","Sant'Anna","Foto","La facciata gotica di mattoni rossi, meglio la mattina quando prende la luce.",[54.6818,25.2944],"St. Anne's Church, Vilnius","anne"],
["🤳","L'Angelo di Užupis","Selfie","La statua dorata nella piazza principale del quartiere, con il caffè accanto.",[54.6810,25.2980],"Užupio angelas, Vilnius","uzupis"],
["🤳","La Sirena di Užupis","Selfie","La piccola scultura sul parapetto del fiume Vilnelė, all'ingresso del quartiere.",[54.6806,25.2951],"Užupio undinė, Vilnius","uzupis"],
["📷","La Costituzione di Užupis","Foto","Le targhe con gli articoli della Costituzione, in tante lingue, lungo la Paupio gatvė.",[54.6807,25.2962],"Užupio konstitucija, Paupio g. 3, Vilnius","uzupis"],
["📷","Il mercato di Halės","Foto","I banchi sotto la struttura di ferro del 1906. Chiedi sempre il permesso prima di fotografare i venditori.",[54.6764,25.2838],"Halės turgus, Vilnius","hales"],
["📷","Le Tre Croci al tramonto","Foto","La città dall'alto con le croci in primo piano: porta una giacca, tira vento.",[54.6868,25.3003],"Three Crosses Hill, Vilnius","croci"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-11-02",t:"Musei chiusi il 1° e 2 novembre",x:"Il 1° novembre (Tutti i Santi) è festivo: il Palazzo dei Granduchi è chiuso e le sedi del Museo Nazionale (Torre di Gediminas, Casa del Castellano, Arsenale) risultano chiuse il 1° e il 2 novembre (sito lnm.lt). I musei chiusi nei festivi nazionali, come il Museo delle Occupazioni, lo sono anche il 1° novembre."},
{from:"2026-10-13",to:"2026-12-31",t:"Ultima domenica del mese: musei gratis e più affollati",x:"L'ultima domenica del mese (25 ottobre, 29 novembre, 27 dicembre) l'ingresso al Palazzo dei Granduchi e alle sedi del Museo Nazionale, Torre di Gediminas compresa, è gratuito per tutti: meno spesa, ma molta più coda."},
{from:"2026-10-13",to:"2027-03-31",t:"Funicolare del Colle del Castello da controllare",x:"Il sito del museo la indica aperta ogni giorno dalle 10 alle 20 (3 € andata e ritorno), ma una guida segnala che nel 2025 era ferma per lavori. Se non funziona, la salita a piedi richiede circa 10 minuti e ha una scalinata di legno."},
{from:"2026-11-20",to:"2027-01-06",t:"Mercatino di Natale in Piazza della Cattedrale",x:"Da fine novembre a fine dicembre c'è il mercatino di Natale con l'albero in Piazza della Cattedrale (l'albero resta fino al 6 gennaio). Le date esatte del 2026 non le ho trovate: controlla su govilnius.lt. Il centro è molto più affollato."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: musei chiusi",x:"Il Palazzo dei Granduchi è chiuso dal 24 al 26 dicembre; le sedi del Museo Nazionale (Torre di Gediminas compresa) sono chiuse il 24 e il 25 dicembre e aperte il 26 dalle 10 alle 20. Molti ristoranti chiudono o riducono l'orario il 24 e il 25."}
];
/* clima medio di Vilnius (indicativo, massime/minime) */
var CLIM=[[-3,-8],[-2,-8],[3,-4],[11,1],[17,6],[21,10],[24,13],[23,13],[17,8],[10,4],[4,0],[0,-4]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Vilnius: comportamenti e testi propri della città ===== */
(function(C){
function lastSun(d){var m=/^(\d{4})-(\d\d)-(\d\d)$/.exec(d||"");if(!m)return false;var y=+m[1],mo=+m[2],da=+m[3],n=new Date(Date.UTC(y,mo,0)).getUTCDate();return new Date(Date.UTC(y,mo-1,da)).getUTCDay()===0&&da+7>n}
function meta(it,meta,E){var WD=E.wd,dt=null;try{dt=E.plan&&E.plan.date}catch(e){}
if((it.id==="gediminas"||it.id==="valdovu")&&lastSun(dt))meta+=" Oggi è l'ultima domenica del mese: l'ingresso è gratuito, ma c'è più coda.";
if(it.id==="valdovu"&&WD===0)meta+=" Oggi è lunedì: il Palazzo dei Granduchi è chiuso.";
if(it.id==="valdovu"&&WD===3)meta+=" Oggi è giovedì: il palazzo resta aperto fino alle 20.";
if(it.id==="valdovu"&&WD===6)meta+=" Oggi è domenica: il palazzo chiude alle 16.";
if(it.id==="kgb"&&(WD===0||WD===1))meta+=" Oggi il Museo delle Occupazioni è chiuso (apre da mercoledì a domenica).";
if(it.id==="hales"&&WD===0)meta+=" Oggi è lunedì: il mercato di Halės probabilmente è chiuso, controlla prima di andare.";
if(it.id==="hales"&&WD===6)meta+=" Oggi è domenica: il mercato chiude alle 15.";
return meta}
Object.assign(C,{id:"vilnius",n:"Vilnius",cn:"Lituania",e:"🏰",flag:"🇱🇹",col:["#c1272d","#006a44","#fdb913"],k:"vilnius lituania lithuania",
TZ:"Europe/Vilnius",LL:[54.6872,25.2797],CC:"lt",QN:"Vilnius",BK:"Vilnius",ARE:/vilnius|vilniaus|\bLT-?\d{5}\b|\b0[1-9]\d{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"lt-LT",LANGN:"lituano",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Municipio (Rotušė)",q:"Vilnius Town Hall, Rotušės a. 1, Vilnius"},
SINGLE:{acts:["katedra","gediminas","pilies","univ","uzupis"],ins:[]},
EXCL:[],
DICON:{katedra:"⛪",gediminas:"🏰",valdovu:"👑",pilies:"🚶",univ:"🎓",aurora:"🙏",anne:"⛪",uzupis:"🎨",hales:"🥔",kgb:"🕯️",croci:"✝️"},
ZN:{A:"nella Città Vecchia",B:"vicino alla Cattedrale e al Colle del Castello",C:"a Užupis",D:"vicino alla stazione e a Halės",F:"sul viale Gedimino"},
NEAR:{col:"caffè",pra:"locale veloce o bistrot",cen:"ristorante",snk:"caffè o panetteria"},
SE:{lokys:"🍖",snekutis:"🥔",trobele:"🥔",uzupio:"🍲",mint:"🥧",bagel:"🥯",hales:"☕",rosehip:"🥗"},
TR:{one:1.25,cap:7.5,lbl:"Bus e filobus (Vilnius)",
 air:{VNO:{one:1.25,n:"Bus 88 per il centro (1,25 €)"},KUN:{one:10,n:"Treno Kaunas–Vilnius (circa 10 €, da confermare)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:7.5,note:"Il biglietto 24 ore (7,50 €) si compra nell'app Trafi o sulla carta JUDU e vale su bus e filobus di Vilnius per 24 ore dalla convalida."},
 {n:"Biglietto 3 giorni",d:3,p:13.5,note:"Il biglietto 72 ore (13,50 €) vale su bus e filobus di Vilnius per tre giorni dalla convalida."}],
 note:"Prezzi dalla pagina di Go Vilnius (govilnius.lt): biglietto 30 minuti 1,00 €, 60 minuti 1,25 €, 24 ore 7,50 €, 72 ore 13,50 €. Con la carta contactless si può pagare direttamente sul mezzo 1,25 €, valido 60 minuti con i cambi gratis. I biglietti elettronici si comprano nell'app Trafi o sulla carta ricaricabile JUDU (1,50 €). Il centro si visita quasi tutto a piedi: i mezzi servono soprattutto per l'aeroporto e per la stazione. Il treno per l'aeroporto costa 0,90 € a corsa e non è compreso nel biglietto urbano."},
FOOD:{co:[6,"Colazione al caffè"],pr:[9,"Pranzo (zuppa, panino o frittelle)"],ce:[16,"Cena (cucina lituana)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"A piedi o in bus",move:"quasi tutto a piedi",bags:"«Ar galiu čia palikti bagažą?»",bagsPM:"«Ar galiu čia palikti bagažą iki popiet?»",bagsAM:"«Ar galiu čia palikti bagažą iki vidurdienio?»",
pra:"Un locale veloce o un bistrot",praZ:{A:"Su via Pilies e nelle piazze della Città Vecchia molti ristoranti con i tavoli fuori fanno prezzi da turisti: per un pasto più genuino cerca le vie laterali (Stiklių, Šv. Mikalojaus, Vokiečių).",B:"Intorno alla Cattedrale ci sono pochi locali: conviene fermarsi in via Pilies o in una traversa."},
freeLong:"Qualche idea: una pausa in un caffè con un dolce, una passeggiata lungo la Vilnelė a Užupis, il parco Kalnų con le Tre Croci o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè della Città Vecchia.",
remind:"Il Palazzo dei Granduchi è chiuso il lunedì, il Museo delle Occupazioni il lunedì e il martedì. Controlla l'orario dell'ultimo treno per l'aeroporto.",
rain1:"Al coperto: il Palazzo dei Granduchi, il Museo delle Occupazioni, la Cattedrale, il mercato di Halės e i caffè.",
rainM:"Al coperto: Palazzo dei Granduchi, Torre di Gediminas (museo), Museo delle Occupazioni, chiese e caffè della Città Vecchia.",
water:"L'acqua del rubinetto di Vilnius è potabile; se il gusto non ti piace, nei negozi si trova acqua in bottiglia a pochi centesimi. Attivate «Acqua» sulla mappa per vedere le fontanelle vicine al percorso.",
kitchen:"A Vilnius si pranza tra le 12 e le 15 e si cena dalle 18: i ristoranti tradizionali sono quasi tutti aperti senza pausa tra il pranzo e la cena. Di sera la Città Vecchia è viva fino alle 23 circa.",
night:[["🍺","Una birra artigianale lituana, con il pane di segale fritto all'aglio (kepta duona): è lo spuntino serale di tutta la Lituania."],["🌙","Le cucine dei ristoranti servono di solito fino alle 22–23; dopo le 22:30 il notturno 88N porta all'aeroporto."],["☕","Molti caffè aprono alle 9–10: la colazione di domani va scelta con calma."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Vilnius è un'ora avanti rispetto all'Italia: sposta l'orologio avanti di un'ora",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per locali di cucina lituana a prezzi medi: una colazione sta intorno ai 5–8 €, un pranzo veloce sui 9–12 € e una cena con un piatto principale sui 14–20 €. Si paga quasi sempre con la carta; le bancarelle dei mercatini di Natale e i banchi di Halės possono volere contanti.",
taxNote:"La tassa di soggiorno di Vilnius è di 2 € a persona e a notte, dal 1° gennaio 2024; non la pagano i minori di 18 anni. Non è inclusa nel prezzo della camera e compare come voce a parte sulla fattura; chi prenota con Airbnb la paga attraverso la piattaforma.",
mcrit:"Criteri: locali lituani indipendenti, niente catene, fascia di prezzo bassa o media. Orari e fasce di prezzo sono quelli delle schede online (Table Journey, Wolt, Go Vilnius, ottobre 2026) e non sono stati letti sui siti dei locali: i prezzi indicati sono stime e il voto su Google non è stato verificato. Controlla orari e prezzi qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il bus 88 dall'aeroporto arriva alla Città Vecchia in circa 20–25 minuti e ferma anche di sera; l'ultimo treno per l'aeroporto parte intorno alle 18:30.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto bus da 60 minuti (1,25 €) o carta contactless: si paga sul mezzo, oppure si usa l'app Trafi",function(E){return true}],["gd","Torre di Gediminas (8 €): conviene salire presto per la luce e verificare se la funicolare funziona",["gediminas"]],["pg","Palazzo dei Granduchi (da 4 a 10 € per percorso): chiuso il lunedì",["valdovu"]],["un","Campanile di San Giovanni (7 €): ingresso da Universiteto gatvė",["univ"]],["kg","Museo delle Occupazioni (6 €): chiuso il lunedì e il martedì",["kgb"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per i banchi dei mercati"]],
NUM:{1:["vienam","VIE-nam"],2:["dviem","dvièm"],3:["trims","trims"],4:["keturiems","ke-tu-RIEMS"],5:["penkiems","pen-KIEMS"],6:["šešiems","she-SHIEMS"],7:["septyniems","sep-ti-NIEMS"],8:["aštuoniems","ash-tuo-NIEMS"],9:["devyniems","de-vi-NIEMS"],10:["dešimčiai","de-SHIM-chiai"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Laba diena / Labas vakaras","LA-ba DIE-na / LA-bas VA-ka-ras"],["Un tavolo per "+(N===1?"una persona":N)+", per favore","Staliuką "+nu[0]+", prašau","sta-LIU-kan "+nu[1]+", PRA-shau"],["Un caffè e una fetta di torta, per favore","Kavą ir pyragą, prašau","KA-van ir pi-RA-gan, PRA-shau"],["Acqua del rubinetto, per favore","Vandens iš čiaupo, prašau","VAN-dens ish CHIOU-po, PRA-shau"],["Il conto, per favore","Sąskaitą, prašau","SAN-skai-tan, PRA-shau"],["Posso pagare con la carta?","Ar galiu mokėti kortele?","ar GA-liu mo-KE-ti kor-TE-le"],["Quanto costa?","Kiek kainuoja?","kiek kai-NUO-ia"],["Dov'è la stazione dei treni?","Kur yra traukinių stotis?","kur i-RA trau-KI-niu STO-tis"],["Quale bus va all'aeroporto?","Koks autobusas važiuoja į oro uostą?","koks au-to-BU-sas va-ZHIUO-ia i O-ro UOS-tan"]];
if(M)fr=fr.concat([["Ho una prenotazione","Turiu rezervaciją","tu-RIU re-zer-VA-tsi-ian"],["Posso lasciare i bagagli?","Ar galiu palikti bagažą?","ar GA-liu pa-LIK-ti ba-GA-zhan"],["A che ora è il check-out?","Kelintą valandą reikia išsiregistruoti?","ke-LIN-tan va-LAN-dan REI-kia ish-si-re-gis-TRUO-ti"]]);
return fr.concat([["Mi scusi","Atsiprašau","at-si-PRA-shau"],["Grazie mille!","Labai ačiū!","la-BAI A-chiu"]])},
taxTxt:function(tx){return "Tassa di soggiorno di Vilnius: "+(tx[2]?"2 € a persona e a notte ("+tx[1].toLowerCase()+"), dal 1° gennaio 2024; i minori di 18 anni sono esenti":"non si paga se sei ospite di amici o parenti")+". Non è inclusa nel prezzo della camera e compare come voce a parte sulla fattura; chi prenota con Airbnb la paga attraverso la piattaforma."},
STAYTIPS:["Il centro si gira a piedi; per l'aeroporto e la stazione servono i bus (88 e 3G) e il filobus. Il bus notturno 88N va dalle 22:30 alle 5:30."],
ZONES:[
["🚌 Bus, treno e biglietti",["Un solo biglietto vale su bus e filobus: 60 minuti 1,25 €, 24 ore 7,50 €, 72 ore 13,50 €. Si può pagare direttamente sul mezzo con la carta contactless.","Il biglietto cartaceo o elettronico va convalidato a bordo. Con l'app Trafi si compra e si attiva dal telefono.","Il treno per l'aeroporto costa 0,90 € e non è compreso nel biglietto urbano; l'ultimo parte verso le 18:30 (orari da confermare su ltglink.lt).","Il centro storico si gira bene a piedi: le distanze tra le tappe sono di 5–15 minuti."]],
["🏛️ Cattedrale, castello e Palazzo dei Granduchi",["La Piazza della Cattedrale è il punto di partenza naturale: Torre di Gediminas e Palazzo dei Granduchi sono a 5–8 minuti a piedi.","La salita alla torre si fa a piedi in 10 minuti, oppure con la funicolare dal cortile del Vecchio Arsenale (controlla che funzioni).","Il Palazzo dei Granduchi è chiuso il lunedì."],["katedra","gediminas","valdovu"]],
["🎨 Città Vecchia e Užupis",["Via Pilies e Didžioji gatvė portano dal Municipio alla Cattedrale: la strada più bella è quella con le botteghe e i cortili.","L'Università ha cortili splendidi e un campanile con vista.","Užupis è a 15 minuti dal Municipio: la Costituzione sui muri, l'Angelo e la Sirena sono i punti da non perdere."],["pilies","univ","uzupis"]],
["🥔 Mangiare a Vilnius",["La cucina lituana è fatta di patate, carne e latticini: cepelinai, frittelle di patate, zuppa fredda di barbabietole e pane di segale.","I locali tradizionali di solito tengono la cucina aperta senza pausa fino alle 22–23.","Si lascia di solito il 10% di mancia nei ristoranti, a mano o dicendolo al cameriere (usanza da confermare)."],["lokys","snekutis","trobele"]],
["🌅 Un giorno fuori Vilnius",["Trakai, con il castello su un'isola in un lago, è a circa mezz'ora in treno o in bus: il biglietto del castello costa 12 € da ottobre a marzo (14 € da aprile a settembre; prezzo dal sito del museo, da confermare per il 2026).","Kaunas, la seconda città della Lituania, è a circa un'ora e mezza di treno."]]],
WTIPS:["L'acqua del rubinetto di Vilnius è potabile: puoi chiederla nei locali («Vandens iš čiaupo, prašau») e riempire la borraccia a casa o in albergo.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap; in città ce ne sono poche.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Lituania usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Vilnius ha un'ora in più rispetto all'Italia: l'orario del ritorno va letto con l'ora locale.","Si lascia di solito il 10% di mancia nei ristoranti, a mano o dicendolo al cameriere (usanza da confermare).","Molti giovani parlano inglese; con gli anziani meglio avere sotto mano le frasi in lituano.","Il centro è molto sicuro, ma di sera attenzione alle strade poco illuminate fuori dalla Città Vecchia.","Il sole tramonta presto da novembre: già alle 16 in pieno inverno, e il freddo scende sotto zero.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚌 Trasporti pubblici: <a href="https://www.govilnius.lt/plan-your-trip/getting-around-vilnius-/public-transport" target="_blank" rel="noopener">govilnius.lt</a> · treni: <a href="https://ltglink.lt/en" target="_blank" rel="noopener">ltglink.lt</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Vilnius: <a href="https://ambvilnius.esteri.it" target="_blank" rel="noopener">ambvilnius.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Vilnius. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.govilnius.lt/plan-your-trip/getting-around-vilnius-/public-transport" target="_blank" rel="noopener">govilnius.lt</a> e, per i treni, <a href="https://ltglink.lt/en" target="_blank" rel="noopener">ltglink.lt</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V92 Q60 80 120 88 Q160 92 190 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M6 106 V82 Q30 70 54 82 V106 Z M28 74 V44 H31 V74 Z M22 52 H37 V55 H22 Z M17 66 V50 H19 V66 Z M12 58 H24 V60 H12 Z"/></g>'+
'<g style="--k:2"><path d="M78 106 V96 Q100 82 122 96 V106 Z M92 96 V50 H108 V96 Z M90 50 H110 V44 H106 V47 H102 V44 H98 V47 H94 V44 H90 Z M99 44 V30 H110 L106 34 L110 38 H99 Z"/></g>'+
'<g style="--k:3"><path d="M146 106 V68 H202 V106 Z M142 68 H206 L174 50 Z M214 106 V58 H230 V106 Z M212 58 H232 L222 40 Z M221 40 V30 H223 V40 Z"/></g>'+
'<g style="--k:4"><path d="M258 106 V62 L266 34 L274 62 L282 40 L290 62 V106 Z M264 106 V80 H268 V106 Z M276 106 V80 H280 V106 Z"/></g>'+
'<g style="--k:5"><path d="M314 106 V62 H358 V106 Z M314 62 L336 48 L358 62 Z M326 106 V82 A10 10 0 0 1 346 82 V106 Z M372 106 V74 H390 V106 Z M370 74 H392 L381 62 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M154 74 v32 M164 74 v32 M174 74 v32 M184 74 v32 M194 74 v32"/><path d="M262 90 h24"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.vilnius);

;var n=window.CITIES["vilnius"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["vilnius"]);
