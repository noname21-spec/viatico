(function(o){
/* ===== Copenaghen (dati verificati il 13 ottobre 2026; 1 corona danese = 0,134 €, cambio fisso 1 € = 7,46 DKK) ===== */
window.CITIES=window.CITIES||{};
CITIES.copenaghen=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
CPH:{n:"Copenaghen Kastrup (CPH)",s:"Copenhagen Airport, Kastrup",url:"https://www.cph.dk/en",live:"Copenaghen",inMin:40,buf:120,pos:[55.6296,12.6479],sd:"Aeroporto CPH · metro M2",rt:"Dall'aeroporto: metro M2 (la linea gialla, senza conducente) fino a Kongens Nytorv, nel cuore della città.",
 arr:"Dall'Italia si entra in Danimarca senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «Metro» e «Tog» (treno) verso il Terminal 3: la stazione del metro e quella dei treni sono proprio sotto e accanto al terminal, a pochi minuti a piedi. La metro M2 parte ogni pochi minuti di giorno, funziona 24 ore su 24 e in circa 13 minuti arriva a Kongens Nytorv, dove finisce la strada pedonale Strøget e da dove si va a piedi a Nyhavn. In alternativa il treno regionale DSB arriva alla stazione centrale (København H) in circa 15 minuti. In tutto sono circa 25–40 minuti dall'uscita del terminal al centro. L'aeroporto è a circa 8 km dal centro.",
 tk:"Biglietto: la corsa fino in centro (3 zone) costa circa 30–36 corone (circa 4–5 €); le schede che ho letto non concordano sulla cifra esatta (30 o 36), quindi controlla l'importo sul biglietto o nell'app. Vale su metro, treno e autobus per 90 minuti. Si compra alle macchinette alla stazione (accettano le carte) o con l'app DOT Billetter. Non ci sono tornelli: il biglietto va comprato prima di salire, perché i controllori passano di continuo e la multa è alta.",
 gm:"Lufthavnen Metro Station, Copenhagen",
 tips:["La metro M2 non si ferma mai: funziona 24 ore su 24, con corse più rade tra l'una e le cinque di notte.","Il taxi per il centro costa circa 250–350 corone (circa 33–47 €) con il tassametro; la metro costa un decimo e impiega meno.","Alla stazione sotto il terminal ci sono metro e treno: per la stazione centrale il treno è diretto, per Kongens Nytorv, Nyhavn e il centro storico conviene la metro."]}
};
/* linee (tracciati indicativi) */
var SEG={
m2:{c:"#f6c90e",n:"Metro M2 (gialla) dall'aeroporto",p:[[55.6296,12.6479,"Aeroporto",2],[55.6731,12.5939,"Christianshavn",2],[55.6806,12.5857,"Kongens Nytorv",2]]},
trn:{c:"#c8102e",n:"Treno DSB dall'aeroporto",p:[[55.6296,12.6479,"Aeroporto",2],[55.6727,12.5648,"København H",2]]},
m3:{c:"#d81e2c",n:"Metro M3 (Cityringen, rossa)",p:[[55.6806,12.5857,"Kongens Nytorv",2],[55.6785,12.5790,"Gammel Strand",2],[55.6757,12.5690,"Rådhuspladsen",2]]}
};
var START=[55.6806,12.5857];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
nyhavn:{t:"Nyhavn e il porto",z:"A",p:1,min:45,id:60,max:90,pos:[55.6798,12.5910],q:"Nyhavn, København",cls:"walk",sun:1,
 d:"Il canale del porto con le case colorate del Seicento e Settecento e le vecchie barche di legno ormeggiate, l'immagine più famosa di Copenaghen. Hans Christian Andersen abitò qui in tre case diverse. Sul lato sud (quello al sole) ci sono ristoranti e bar con i tavoli all'aperto, sul lato nord si passeggia con più tranquillità.",
 m:"Si cammina gratis, a ogni ora. I ristoranti con il menù sul canale sono pensati per i turisti e costano molto: per un pasto vero allontanati di qualche strada. Da qui partono anche i giri in battello sui canali (circa 200 corone, circa 27 €, prezzo da una scheda secondaria: controlla alla biglietteria)."},
christians:{t:"Palazzo di Christiansborg e la Torre",z:"C",p:1,min:90,id:120,max:160,pos:[55.6761,12.5800],q:"Christiansborg Slot, København",cls:"",sun:1,tk:[16.1,"Christiansborg: Sale di Rappresentanza Reali (120 corone)",1,1],
 win:function(wd,d){if(d>="2026-12-24"&&d<="2026-12-25")return[0,0];if(d>="2026-11-02"&&wd===0)return[0,0];return[10*60,16*60+30]},
 d:"Il palazzo sull'isolotto di Slotsholmen dove ha sede il Parlamento danese e dove il re riceve gli ospiti di stato. Si visitano le Sale di Rappresentanza Reali con gli arazzi che raccontano la storia del paese, le rovine dei castelli più antichi sotto il palazzo e le cucine reali. La torre del palazzo è la più alta della città e la salita è gratuita.",
 m:"Sale di Rappresentanza Reali 120 corone (circa 16 €), rovine, cucina reale o scuderie 60 corone ciascuna, biglietto combinato 175 corone (prezzi dalle schede turistiche, non dal sito ufficiale che era in aggiornamento). I minori di 18 anni entrano gratis. Fino al 1° novembre le sale sono aperte ogni giorno 10–17 (sito ufficiale). Dal 2 novembre le fonti non concordano sul lunedì: per prudenza qui considero chiuso il lunedì. Chiuso il 24 e 25 dicembre. La torre è gratuita ma serve un biglietto con orario, da ritirare al centro visitatori, e un documento. Le sale possono chiudere senza preavviso per cerimonie di stato."},
amalien:{t:"Amalienborg e il cambio della guardia",z:"B",p:2,min:45,id:75,max:110,pos:[55.6841,12.5932],q:"Amalienborg Slot, København",cls:"",sun:1,tk:[18.1,"Museo di Amalienborg (135 corone)",1,1],
 win:function(wd,d){if(d>="2026-12-24"&&d<="2026-12-25")return[0,0];if(d>="2026-11-01"&&d<="2026-12-23"&&wd===0)return[0,0];return[10*60,16*60]},
 d:"La residenza invernale della famiglia reale: quattro palazzi settecenteschi attorno a una grande piazza ottagonale con il monumento equestre a Federico V. Una parte è aperta come museo, con gli appartamenti privati dei re e delle regine dell'Ottocento e del Novecento, la camera dei gioielli e le sale di rappresentanza. Poco distante c'è la Chiesa di Marmo con la grande cupola.",
 m:"La piazza si vede sempre, gratis. Museo di Amalienborg 125 corone online e 135 alla cassa (circa 17–18 €, dal sito del museo). Dal 1° novembre al 23 dicembre è chiuso il lunedì e apre 10–16; ad ottobre di norma è aperto ogni giorno 10–16 (orario da confermare). Chiuso il 24 e 25 dicembre. Il cambio della guardia a mezzogiorno è il momento più suggestivo; l'orario può cambiare quando la famiglia reale non è presente, controlla sul sito della Guardia Reale."},
rosenb:{t:"Castello di Rosenborg e i Gioielli della Corona",z:"F",p:2,min:60,id:90,max:120,pos:[55.6858,12.5775],q:"Rosenborg Slot, København",cls:"",sun:1,tk:[20.1,"Castello di Rosenborg (150 corone)",1,1],
 win:function(wd,d){if(d>="2026-12-24"&&d<="2026-12-25")return[0,0];if(d>="2026-11-02"&&d<="2026-12-23")return wd===0?[0,0]:[10*60,15*60+30];return[10*60,16*60+30]},
 d:"Un castello rinascimentale in mattoni rossi del Seicento, costruito dal re Cristiano IV come residenza di campagna, oggi circondato dal parco più amato dai danesi, il Kongens Have. Dentro ci sono le sale con i mobili e i troni originali e, nei sotterranei, la camera del tesoro con i gioielli e le insegne reali.",
 m:"Dal sito ufficiale: aperto ogni giorno 10–17 fino al 1° novembre; dal 2 novembre al 23 dicembre chiuso il lunedì e aperto 10–16. Chiuso il 24 e 25 dicembre. Ultimo ingresso mezz'ora prima della chiusura. Il biglietto costa circa 140–150 corone (circa 19–20 €; i prezzi dalle schede turistiche non concordano, quello ufficiale non l'ho letto); l'ingresso online costa 5 corone in meno. Il parco intorno è gratuito e aperto a tutti."},
rund:{t:"Rundetaarn e Strøget",z:"A",p:3,min:45,id:60,max:90,pos:[55.6813,12.5757],q:"Rundetaarn, København",cls:"",sun:1,tk:[8,"Rundetaarn (60 corone)",1,1],
 win:function(wd,d){if(d==="2026-12-24"||d==="2026-12-25"||d==="2027-01-01")return[0,0];return[10*60,18*60]},
 d:"Una torre cilindrica del 1642 che il re Cristiano IV fece costruire per l'osservatorio astronomico dell'università. Invece dei gradini c'è una larga rampa a spirale in cui, secondo la storia, ci passava anche una carrozza. In cima la terrazza dà sui tetti verdi del centro. Intorno ci sono i vicoli più vecchi e Strøget, la lunga via pedonale dei negozi.",
 m:"Ingresso 60 corone (circa 8 €); i minori di 18 anni entrano gratis (dal sito dei musei di Copenaghen). Nel periodo invernale (dal 24 novembre) è aperta ogni giorno 10–18; in autunno l'orario non l'ho trovato, per questo uso lo stesso. Chiusa il 24 e 25 dicembre e il 1° gennaio; ci sono anche chiusure per restauri nei mesi invernali: controlla rundetaarn.dk."},
tivoli:{t:"Giardini di Tivoli",z:"C",p:2,min:120,id:150,max:240,pos:[55.6736,12.5681],q:"Tivoli Gardens, København",cls:"",multi:1,sun:1,tk:[26.8,"Ingresso a Tivoli (200 corone)",1,1],
 win:function(wd,d){if(d>="2026-11-02"&&d<="2026-11-12")return[0,0];if(d>="2027-01-04"&&d<="2027-03-18")return[0,0];return[11*60,22*60]},
 d:"Uno dei parchi di divertimenti più antichi del mondo (1843), nel mezzo della città, con i giardini, i laghetti, i padiglioni cinesi, le montagne russe di legno del 1914 e tante luci la sera. Dopo il tramonto è la parte più bella. Walt Disney ne prese spunto per Disneyland.",
 m:"Ingresso 200 corone (circa 27 €), le giostre a parte con un braccialetto da 269 corone (da una scheda turistica del 2026–27: controlla tivoli.dk). Stagione di Halloween dal 2 ottobre al 1° novembre, apertura alle 11; chiuso dal 2 al 12 novembre; stagione di Natale dal 13 novembre al 3 gennaio 2027. L'orario di chiusura serale cambia da giorno a giorno: qui uso le 22, ma controlla il calendario sul sito. Chiuso dal 4 gennaio al 18 marzo."},
natmus:{t:"Museo Nazionale di Danimarca",z:"C",p:3,min:90,id:120,max:180,pos:[55.6742,12.5785],q:"Nationalmuseet, København",cls:"",sun:1,tk:[18.1,"Museo Nazionale (135 corone online)",1,1],
 win:function(wd,d){if(d==="2026-12-24"||d==="2026-12-25"||d==="2026-12-31")return[0,0];if(d>="2026-11-01"&&wd===0)return[0,0];return[10*60,17*60]},
 d:"Il museo di storia più grande del paese, a due passi da Christiansborg: i Vichinghi, i gioielli e le armi dell'età del bronzo, il famoso carro solare di Trundholm, le collezioni di Groenlandia e Artico. C'è anche una sezione per bambini.",
 m:"Dal sito ufficiale: aperto ogni giorno 10–17 da aprile a ottobre; da novembre a marzo chiuso il lunedì. Chiuso il 24, 25 e 31 dicembre. Biglietto 150 corone alla cassa e 135 online (circa 18–20 €). I minori di 18 anni entrano gratis. Il biglietto vale un anno."},
kastell:{t:"Kastellet e la Sirenetta",z:"B",p:3,min:60,id:90,max:120,pos:[55.6914,12.5948],q:"Kastellet, København",cls:"walk",sun:1,
 d:"Una fortezza a forma di stella del Seicento, oggi un parco con i bastioni coperti d'erba, il vecchio mulino e le case rosse dei soldati. Lungo il mare, a 10 minuti a piedi, c'è la Sirenetta, la statuetta in bronzo che ricorda la fiaba di Andersen. È piccola: molti restano delusi, ma la passeggiata sul porto è bella.",
 m:"Kastellet e la Sirenetta si vedono gratis e sempre, di giorno e di notte. I vialetti sono aperti a tutti; le costruzioni militari dentro sono ancora in uso. Poco prima, vicino a Kastellet, c'è la grande Fontana di Gefion, con la dea che trascina i buoi."},
christiansh:{t:"Christianshavn, Chiesa del Salvatore e Christiania",z:"D",p:3,min:75,id:100,max:140,pos:[55.6727,12.5942],q:"Vor Frelsers Kirke, København",cls:"walk",multi:1,sun:1,
 d:"Un quartiere di canali ispirato ad Amsterdam, con le case basse, i ponti e le barche. La Chiesa del Salvatore (Vor Frelsers Kirke) ha una guglia barocca con una scala a spirale esterna che si sale fino in cima per vedere tutta la città. A pochi passi c'è Christiania, un'area autogestita nata nel 1971 in una ex caserma, con murales, laboratori e locali alternativi.",
 m:"Il quartiere e i canali si vedono gratis. La torre della chiesa è a pagamento (prezzo e orari non verificati: controlla vorfrelserskirke.dk) e chiude quando c'è vento forte, pioggia o ghiaccio. A Christiania si entra gratis ma ci sono regole: non si fotografa nella via principale (Pusher Street), non si corre e si rispettano le persone. Pusher Street è una zona di vendita di droga illegale: evitala."},
torve:{t:"Torvehallerne",z:"F",p:4,min:45,id:60,max:90,pos:[55.6838,12.5714],q:"Torvehallerne, København",cls:"walk",sun:1,
 win:function(wd){return[10*60,17*60]},
 d:"Due padiglioni di vetro vicino alla stazione di Nørreport con oltre 60 banchi: smørrebrød (i panini aperti danesi), pesce fresco, formaggi, pasticceria, caffè, frutta. È il posto migliore per un pranzo veloce o per qualche assaggio.",
 m:"Aperto ogni giorno con orari larghi (di norma dalle 10 fino alla sera). Qui uso una finestra prudente 10–17 per i giorni feriali e i festivi; gli orari reali sono più estesi, ma non li ho letti sul sito. Si paga quasi tutto con la carta."},
glypt:{t:"Ny Carlsberg Glyptotek",z:"C",p:4,min:60,id:90,max:120,pos:[55.6726,12.5655],q:"Ny Carlsberg Glyptotek, København",cls:"",multi:1,sun:1,tk:[16.8,"Ny Carlsberg Glyptotek (circa 125 corone)",1,1],
 win:function(wd,d){if(wd===0)return[0,0];if(d==="2026-12-24"||d==="2026-12-25")return[0,0];return[11*60,17*60+30]},
 d:"Un museo d'arte vicino a Tivoli con sculture egizie, greche e romane e una bella raccolta di impressionisti francesi, fondato dal birraio Carl Jacobsen. Il Giardino d'inverno al centro dell'edificio, con palme e una fontana, è un posto tranquillo per fermarsi.",
 m:"Circa 125 corone, circa 17 € (prezzo da una scheda secondaria, da confermare su glyptoteket.dk). Di norma chiuso il lunedì e aperto dalle 11 alle 18; il giovedì apre fino a sera. Orari non letti sul sito ufficiale: controlla prima di andare."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
function pp(id){return id==="start"?START:STOPS[id].pos}
function WK(a,b,min,t1,t2,mid){var f=[pp(a)].concat(mid||[]).concat([pp(b)]);var r=f.slice().reverse();P2(a,b,min,"walk",t1,t2,{f:[W(f)],r:[W(r)]})}
WK("start","nyhavn",6,"A piedi lungo Kongens Nytorv e il canale di Nyhavn, circa 6 minuti.","A piedi fino a Kongens Nytorv, circa 6 minuti.");
WK("start","rund",10,"A piedi per Østergade e la strada pedonale Strøget fino a Rundetaarn, circa 10 minuti.","A piedi per Strøget fino a Kongens Nytorv, circa 10 minuti.",[[55.6795,12.5815]]);
WK("start","amalien",10,"A piedi per Bredgade fino alla piazza di Amalienborg, circa 10 minuti.","A piedi per Bredgade fino a Kongens Nytorv, circa 10 minuti.",[[55.6830,12.5895]]);
WK("start","christians",10,"A piedi per Gammel Strand e il ponte fino a Christiansborg, circa 10 minuti.","A piedi per Gammel Strand fino a Kongens Nytorv, circa 10 minuti.",[[55.6785,12.5825]]);
P2("start","tivoli",14,"metro","Metro M3 da Kongens Nytorv a Rådhuspladsen (2 fermate, circa 4 minuti), poi 5 minuti a piedi fino all'ingresso di Tivoli.","A piedi fino a Rådhuspladsen (5 minuti), poi metro M3 fino a Kongens Nytorv, circa 12 minuti in tutto.",{f:[["m3","Kongens Nytorv","Rådhuspladsen"],W([[55.6757,12.5690],[55.6736,12.5681]])],r:[W([[55.6736,12.5681],[55.6757,12.5690]]),["m3","Rådhuspladsen","Kongens Nytorv"]]});
WK("start","christiansh",17,"A piedi per Nyhavn, Holmens Kanal e il ponte Knippelsbro, poi per la Torvegade, circa 17 minuti. In alternativa metro M2 per una fermata fino a Christianshavn.","A piedi per la Torvegade e il ponte Knippelsbro fino a Kongens Nytorv, circa 17 minuti.",[[55.6770,12.5900]]);
WK("nyhavn","amalien",8,"A piedi lungo Sankt Annæ Plads fino alla piazza di Amalienborg, circa 8 minuti.","A piedi lungo Sankt Annæ Plads fino a Nyhavn, circa 8 minuti.",[[55.6820,12.5920]]);
WK("amalien","kastell",13,"A piedi per Amaliegade e il giardino di Churchillparken fino a Kastellet, circa 13 minuti.","A piedi per Churchillparken e Amaliegade fino ad Amalienborg, circa 13 minuti.",[[55.6880,12.5945]]);
WK("nyhavn","christiansh",13,"A piedi o in bici per il ponte Knippelsbro e la Torvegade fino alla Chiesa del Salvatore, circa 13 minuti.","A piedi per il ponte Knippelsbro fino a Nyhavn, circa 13 minuti.",[[55.6770,12.5900]]);
WK("nyhavn","christians",13,"A piedi lungo Holmens Kanal fino a Christiansborg, circa 13 minuti.","A piedi lungo Holmens Kanal fino a Nyhavn, circa 13 minuti.",[[55.6785,12.5850]]);
WK("rund","rosenb",8,"A piedi per Købmagergade e Kronprinsessegade fino al parco e al castello di Rosenborg, circa 8 minuti.","A piedi per Kronprinsessegade fino a Rundetaarn, circa 8 minuti.",[[55.6840,12.5760]]);
WK("rosenb","torve",7,"A piedi per Kronprinsessegade e Frederiksborggade fino a Torvehallerne, circa 7 minuti.","A piedi fino a Rosenborg, circa 7 minuti.",[[55.6845,12.5740]]);
WK("rund","torve",6,"A piedi per Frederiksborggade fino a Torvehallerne, circa 6 minuti.","A piedi per Frederiksborggade fino a Rundetaarn, circa 6 minuti.");
WK("rund","christians",10,"A piedi per Nørregade e Frederiksholms Kanal fino a Christiansborg, circa 10 minuti.","A piedi fino a Rundetaarn, circa 10 minuti.",[[55.6785,12.5775]]);
WK("christians","natmus",4,"A piedi sopra il canale fino al Museo Nazionale, circa 4 minuti.","A piedi fino a Christiansborg, circa 4 minuti.");
WK("natmus","tivoli",11,"A piedi per Ny Vestergade e Rådhuspladsen fino a Tivoli, circa 11 minuti.","A piedi fino al Museo Nazionale, circa 11 minuti.",[[55.6740,12.5730]]);
WK("tivoli","glypt",3,"A piedi, subito accanto all'ingresso di Tivoli, circa 3 minuti.","A piedi, circa 3 minuti.");
WK("natmus","glypt",14,"A piedi per Rådhuspladsen fino alla Glyptotek, circa 14 minuti.","A piedi fino al Museo Nazionale, circa 14 minuti.",[[55.6735,12.5720]]);
WK("christians","christiansh",16,"A piedi per il ponte Knippelsbro e la Torvegade fino alla Chiesa del Salvatore, circa 16 minuti.","A piedi fino a Christiansborg, circa 16 minuti.",[[55.6740,12.5870]]);
WK("rosenb","amalien",16,"A piedi per Gothersgade e Frederiksgade fino ad Amalienborg, circa 16 minuti.","A piedi fino a Rosenborg, circa 16 minuti.",[[55.6860,12.5850]]);
/* ritorno in aeroporto: metro M2 da Kongens Nytorv */
var RET={
CPH:{
 A:{min:25,txt:"Metro M2 (linea gialla) da Kongens Nytorv fino all'aeroporto (Lufthavnen), circa 13 minuti, con corse ogni pochi minuti di giorno. Biglietto di 3 zone, circa 30–36 corone (circa 4–5 €), da comprare prima di salire. In alternativa treno DSB dalla stazione centrale (København H), circa 15 minuti.",g:[["m2","Kongens Nytorv","Aeroporto"]]}}
};
var ARR={
CPH:[["m2","Aeroporto","Kongens Nytorv"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare. Gli orari qui sotto sono prudenti (più stretti di quelli reali) */
var V={
torvehal:{n:"Torvehallerne",a:"Frederiksborggade 21",z:"F",r:"4,5",pos:[55.6838,12.5714],h:D7("10:00-17:00"),
 d:"Il mercato coperto di vetro vicino a Nørreport: decine di banchi di smørrebrød, pesce, formaggi, pasticceria e caffè. Ognuno prende quello che vuole e mangia ai tavoli comuni o fuori sulla piazza.",pr:"Un panino o un piatto sta tra 9 e 16 €, un dolce con caffè sui 7–9 € (listino non visto). Orari indicativi, da confermare."},
hallernes:{n:"Hallernes Smørrebrød",a:"Torvehallerne, Frederiksborggade 21",z:"F",r:"4,4",pos:[55.6838,12.5714],h:D7("11:00-16:00"),
 d:"Un banco dentro Torvehallerne che prepara lo smørrebrød, il tipico panino aperto danese di pane di segale con aringhe, gamberi, roast beef o uova, ricoperti di salse e guarnizioni. Si mangia in piedi o ai tavolini del mercato.",pr:"Un pezzo costa circa 5–8 € e due bastano per un pranzo (listino non visto). Orari indicativi, da confermare."},
norden:{n:"Café Norden",a:"Østergade 61",z:"A",r:"4,2",pos:[55.6797,12.5836],h:D7("09:00-21:00"),
 d:"Un caffè con grandi finestre sull'angolo di Nikolaj Plads, sulla via pedonale Strøget: colazioni, torte, piatti semplici di cucina danese e un bar. Ci si siede e si guarda la gente passare.",pr:"Una colazione costa circa 11–15 €, un piatto 16–22 € (listino non visto). Orari da guide, da confermare."},
laglace:{n:"Conditori La Glace",a:"Skoubogade 3",z:"A",r:"4,5",pos:[55.6790,12.5733],h:["09:00-17:00","09:00-17:00","09:00-17:00","09:00-17:00","09:00-17:00","09:00-17:00","10:00-17:00"],
 d:"La pasticceria più antica della Danimarca, aperta dal 1870: una vetrina di torte, la torta alla panna e frutta di stagione (la Sportskage) e il cioccolato caldo. Le sale sono ottocentesche; si siede o si compra da portare via.",pr:"Una fetta di torta con caffè sta intorno ai 10–13 € (listino non visto). Orari da guide, da confermare."},
schonnemann:{n:"Restaurant Schønnemann",a:"Hauser Plads 16",z:"A",r:"4,5",pos:[55.6808,12.5744],h:["11:30-16:00","11:30-16:00","11:30-16:00","11:30-16:00","11:30-16:00","11:30-16:00",""],
 d:"Un ristorante del 1877 dedicato allo smørrebrød, con sale in legno scuro e tavoli vicino a Rundetaarn: si ordinano due o tre panini aperti (aringhe, gamberi, roast beef) e un piccolo bicchiere di aquavit. Solo a pranzo, da lunedì a sabato.",pr:"Due o tre panini aperti costano in tutto circa 25–40 € (listino non visto). Orari da guide, da confermare: conviene prenotare."},
atelier:{n:"Café Atelier September",a:"Gothersgade 30",z:"F",r:"4,4",pos:[55.6833,12.5810],h:D7("09:00-16:00"),
 d:"Un piccolo caffè luminoso vicino ai giardini di Rosenborg, famoso per le colazioni (uova, avocado, pane di segale e dolci) e per i pranzi leggeri. Ci sono pochi tavoli, ma ci si siede in coda in un attimo.",pr:"Una colazione costa circa 10–15 € e un piatto leggero 12–17 € (listino non visto). Orari da guide, da confermare."},
paludan:{n:"Café Paludan Bogcafé",a:"Fiolstræde 10",z:"A",r:"4,2",pos:[55.6794,12.5728],h:D7("10:00-19:00"),
 d:"Un caffè-libreria vicino a Rundetaarn: pareti di libri dal pavimento al soffitto, tavoli di legno e una cucina semplice con panini, insalate, zuppe e torte. Aperto anche la sera.",pr:"Un panino o un'insalata sta sui 12–16 €, una zuppa o un piatto del giorno 14–18 € (listino non visto). Orari da guide, da confermare."},
europa:{n:"Café Europa 1989",a:"Amagertorv 1",z:"A",r:"4,1",pos:[55.6786,12.5823],h:D7("09:00-17:00"),
 d:"Il caffè sulla piazza Amagertorv, sulla via pedonale Strøget, con i tavolini all'aperto e un'ottima vista sulla piazza e la fontana delle cicogne. Caffè, croissant e panini leggeri.",pr:"Un caffè con un dolce sta intorno agli 8–11 € (listino non visto). Orari da guide, da confermare."},
wilder:{n:"Café Wilder",a:"Wildersgade 56",z:"D",r:"4,4",pos:[55.6722,12.5933],h:D7("09:00-16:00"),
 d:"Un caffè di quartiere a Christianshavn, in una via laterale vicino ai canali: colazioni all'americana, panini, insalate e brunch del fine settimana, in un ambiente informale.",pr:"Un brunch o un pranzo sta sui 11–17 € (listino non visto). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["europa","atelier","laglace"],B:["europa","norden"],C:["europa","laglace"],D:["wilder","europa"],F:["atelier","torvehal","paludan"]},
pra:{A:["hallernes","schonnemann","paludan"],B:["norden","hallernes"],C:["norden","hallernes","paludan"],D:["wilder","hallernes"],F:["hallernes","torvehal","schonnemann"]},
cen:{A:["norden","paludan"],B:["norden","paludan"],C:["norden","paludan"],D:["norden","paludan"],F:["paludan","norden"]},
snk:{A:["laglace","europa","torvehal"],B:["norden","laglace"],C:["laglace","europa"],D:["wilder","laglace"],F:["torvehal","atelier","laglace"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"nyh",t:"Nyhavn, Amalienborg e Kastellet",acts:["nyhavn","amalien","kastell"],need:190,core:1},
{id:"slot",t:"Christiansborg e Museo Nazionale",acts:["christians","natmus"],need:200,core:1},
{id:"rosen",t:"Rundetaarn, Rosenborg e Torvehallerne",acts:["rund","rosenb","torve"],need:190,core:1},
{id:"tiv",t:"Tivoli e Ny Carlsberg Glyptotek",acts:["tivoli","glypt"],need:200},
{id:"chr",t:"Christianshavn e Christiania",acts:["christiansh"],need:100}
];
var ORDER=["nyhavn","christians","amalien","rosenb","tivoli","rund","kastell","christiansh","natmus","torve","glypt"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["ind","Indre By (centro storico, Strøget e Nyhavn)",[55.6790,12.5800],"A"],
["fre","Frederiksstaden / Østerbro (Amalienborg, Kastellet)",[55.6880,12.5900],"B"],
["ves","Vesterbro / stazione centrale / Tivoli",[55.6720,12.5650],"C"],
["chr","Christianshavn / Amager (Islands Brygge)",[55.6700,12.5950],"D"],
["nor","Nørrebro / Nørreport / Rosenborg",[55.6860,12.5700],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[55.6806,12.5857],""]
];
/* imposta di soggiorno: la Danimarca non ne ha */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Morgenmad","la colazione danese: pane di segale e di grano con formaggio, burro e marmellata, uova e caffè."],["Kanelsnegl","un panino a chiocciola alla cannella, la colazione dolce più amata dai danesi."],["Wienerbrød","la pasta sfoglia danese (quella che noi chiamiamo «danese»), con crema o marmellata."]],
pra:[["Smørrebrød","pane di segale tostato con aringhe, gamberi, roast beef o uova: due o tre pezzi sono un pranzo."],["Pølse","il classico hot dog danese dal carretto, con cipolla fritta, senape dolce e cetrioli."],["Stjerneskud","un'ampia fetta di pane con pesce impanato, gamberetti e salse."],["Frikadeller","polpette danesi di maiale, con patate e cavolo rosso."]],
cen:[["Stegt flæsk med persillesovs","maiale croccante con patate e salsa al prezzemolo, il piatto che i danesi considerano nazionale."],["Frikadeller med kartofler","polpette di maiale con patate e sugo."],["Røget laks","salmone affumicato, con pane e salsa."],["Æbleskiver","palline dolci con la marmellata, tipiche di Natale."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Nyhavn dal ponte","Foto","Le case colorate sul canale con le barche d'epoca: il punto migliore è il ponticello a metà canale, al mattino presto.",[55.6797,12.5909],"Nyhavn, København","nyhavn"],
["📷","Nyhavn al tramonto","Foto","Dopo il tramonto le facciate si illuminano e i riflessi sull'acqua rendono la foto più calda.",[55.6803,12.5916],"Nyhavn, København","nyhavn"],
["📷","La torre di Christiansborg","Foto","La torre del palazzo vista dal ponte sul canale, con le barche da diporto e il Museo della Borsa sulla destra.",[55.6759,12.5810],"Christiansborg Slot, København","christians"],
["🤳","La Borsa e la guglia dei draghi","Selfie","La guglia della Børsen è fatta da quattro code di drago intrecciate: si vede bene dal ponte, di fronte.",[55.6749,12.5825],"Børsen, København","christians"],
["📷","Il cambio della guardia","Foto","I soldati della Guardia Reale che attraversano la città a mezzogiorno fino alla piazza di Amalienborg.",[55.6841,12.5932],"Amalienborg Slot Square, København","amalien"],
["📷","La Chiesa di Marmo","Foto","La cupola verde e il piazzale visti da Amalienborg: si inquadra bene con il monumento equestre in primo piano.",[55.6850,12.5897],"Frederiks Kirke, København","amalien"],
["🤳","Il parco di Rosenborg","Selfie","Il castello rosso tra i prati e le aiuole del Kongens Have, specie in autunno con le foglie.",[55.6855,12.5770],"Rosenborg Slot, København","rosenb"],
["📷","Rundetaarn dalla strada","Foto","La torre cilindrica che sporge tra i palazzi bassi di Købmagergade.",[55.6813,12.5757],"Rundetaarn, København","rund"],
["📷","Tivoli di sera","Foto","I viali e il lago con le luci accese, soprattutto durante Halloween e a Natale.",[55.6736,12.5681],"Tivoli Gardens, København","tivoli"],
["🤳","La Sirenetta","Selfie","La statuetta sul sasso in riva al mare: di mattina presto ci sono meno turisti.",[55.6929,12.5993],"Den Lille Havfrue, København","kastell"],
["📷","I bastioni di Kastellet","Foto","Il mulino a vento e le case rosse dentro le mura a stella, poco affollate.",[55.6914,12.5948],"Kastellet, København","kastell"],
["📷","La guglia della Chiesa del Salvatore","Foto","La scala a spirale dorata vista dal canale di Christianshavn.",[55.6727,12.5942],"Vor Frelsers Kirke, København","christiansh"],
["🤳","Il canale di Christianshavn","Selfie","Le barche ormeggiate e le case colorate lungo il canale, a pochi passi dalla chiesa.",[55.6717,12.5934],"Christianshavns Kanal, København","christiansh"],
["📷","I banchi di Torvehallerne","Foto","Le vetrine dei banchi di smørrebrød e di dolci: chiedi sempre il permesso prima di fotografare i venditori.",[55.6838,12.5714],"Torvehallerne, København","torve"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-11-12",t:"Tivoli: Halloween fino al 1° novembre, poi chiuso fino al 12",x:"Il parco di Tivoli è aperto per Halloween dal 2 ottobre al 1° novembre 2026 (dalle 11). Dal 2 al 12 novembre è chiuso, poi riapre il 13 novembre con la stagione di Natale (fino al 3 gennaio 2027). L'orario di chiusura serale cambia da giorno a giorno: controlla tivoli.dk."},
{from:"2026-10-13",to:"2026-12-23",t:"Da novembre castelli chiusi il lunedì",x:"Il Castello di Rosenborg e il Museo di Amalienborg, aperti ogni giorno ad ottobre, dal 1°–2 novembre al 23 dicembre chiudono il lunedì (orario 10–16). Anche il Museo Nazionale chiude il lunedì da novembre a marzo."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: musei chiusi il 24 e il 25",x:"Il 24 e il 25 dicembre i castelli di Rosenborg e Amalienborg, Rundetaarn e il Museo Nazionale sono chiusi; il 26 dicembre riaprono con orari ridotti e il 31 dicembre chiudono presto. Anche Christiansborg chiude il 24 e il 25. Nei giorni di Natale i mezzi hanno orari ridotti: controlla rejseplanen.dk."},
{from:"2026-11-13",to:"2027-01-03",t:"Mercatini di Natale e Tivoli",x:"Dal 13 novembre al 3 gennaio il Tivoli diventa un grande mercatino di Natale, con molte luci e molta gente: la sera conviene arrivare presto. Ci sono mercatini anche a Nyhavn e in altre piazze del centro."}
];
/* clima medio di Copenaghen (indicativo, massime/minime) */
var CLIM=[[3,-1],[4,-1],[7,1],[12,4],[17,8],[20,11],[22,14],[22,14],[18,11],[13,7],[8,4],[5,1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Copenaghen: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="glypt"&&WD===0)meta+=" Oggi è lunedì: di norma la Glyptotek è chiusa il lunedì.";
if(it.id==="natmus"&&WD===0)meta+=" Oggi è lunedì: da novembre a marzo il Museo Nazionale è chiuso il lunedì.";
if(it.id==="rosenb"&&WD===0)meta+=" Oggi è lunedì: dal 2 novembre al 23 dicembre il Castello di Rosenborg è chiuso il lunedì.";
if(it.id==="amalien"&&WD===0)meta+=" Oggi è lunedì: dal 1° novembre al 23 dicembre il Museo di Amalienborg è chiuso il lunedì (la piazza è sempre aperta).";
return meta}
Object.assign(C,{id:"copenaghen",n:"Copenaghen",cn:"Danimarca",e:"🧜‍♀️",flag:"🇩🇰",col:["#c8102e","#e8e8e8","#3f5f7a"],k:"copenaghen copenhagen danimarca",
TZ:"Europe/Copenhagen",LL:[55.6761,12.5683],CC:"dk",QN:"Copenhagen",BK:"Copenhagen",ARE:/k[øo]benhavn|copenhagen|copenaghen|frederiksberg|\b(1\d{3}|2[0-4]\d{2})\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"da-DK",LANGN:"danese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"DKK",s:"kr",e:1/7.46},hub:{n:"Kongens Nytorv",q:"Kongens Nytorv metro station, København"},
SINGLE:{acts:["nyhavn","christians","amalien","rosenb","rund"],ins:[]},
EXCL:[],
DICON:{nyhavn:"⚓",christians:"🏛️",amalien:"👑",rosenb:"💎",rund:"🔭",tivoli:"🎢",natmus:"🏺",glypt:"🗿",kastell:"🧜‍♀️",christiansh:"⛪",torve:"🥪"},
ZN:{A:"a Indre By",B:"a Frederiksstaden",C:"a Slotsholmen e Vesterbro",D:"a Christianshavn",F:"a Nørreport e Nørrebro"},
NEAR:{col:"caffè",pra:"banco di smørrebrød o caffè",cen:"locale",snk:"pasticceria o caffè"},
SE:{torvehal:"🥪",hallernes:"🥪",norden:"☕",laglace:"🍰",schonnemann:"🐟",atelier:"🍳",paludan:"📚",europa:"☕",wilder:"🥞"},
TR:{one:3.2,cap:13.4,lbl:"Metro, treno e bus (Movia/DOT)",
 air:{CPH:{one:4.8,n:"Metro M2 o treno per l'aeroporto (3 zone, circa 36 corone)"}},
 passes:[
 {n:"City Pass Small 24 ore",d:1,max:1,p:13.4,note:"Il City Pass Small (zone 1–4, circa 100 corone, circa 13,40 €) vale su metro, treno e bus per 24 ore e comprende l'aeroporto. Si compra nell'app DOT Billetter o alle macchinette."},
 {n:"City Pass Small 72 ore",d:3,p:27,only:function(T){return T.n===3},note:"Il City Pass Small per 72 ore costa circa 200 corone (circa 27 €, cifra da controllare): vale sulle zone 1–4, aeroporto compreso."}],
 note:"Prezzi dalle schede turistiche (tariffa dal 18 gennaio 2026), convertiti a 1 € = 7,46 corone: corsa di 2 zone 24 corone (circa 3,20 €, valida 75 minuti), di 3 zone circa 30–36 corone (circa 4–5 €, valida 90 minuti), City Pass Small 24 ore circa 100 corone (circa 13,40 €). Un solo sistema vale per metro, treno e bus: i biglietti si comprano prima di salire (nell'app DOT Billetter, alle macchinette o con il Rejsekort). La Copenhagen Card (da 589 corone, circa 79 €, per 24 ore) comprende molti musei e i mezzi, ma conviene solo con quattro o più ingressi al giorno. Il metro M1–M4 funziona 24 ore su 24. Non ci sono tornelli: i controlli sono frequenti e la multa è alta."},
FOOD:{co:[11,"Colazione al caffè"],pr:[15,"Pranzo (smørrebrød o hot dog)"],ce:[26,"Cena (cucina danese)"],sp:[7,"Spuntini e dolci"]},
T:{ride:"In metro o in bus",move:"tutto a piedi, in bici, in metro o in bus",bags:"«Kan jeg efterlade min kuffert her?»",bagsPM:"«Kan jeg efterlade min kuffert her til i eftermiddag?»",bagsAM:"«Kan jeg efterlade min kuffert her til middag?»",
pra:"Un banco di smørrebrød o un caffè",praZ:{A:"Su Nyhavn e intorno a Strøget i ristoranti con il menù fuori sono tutti per turisti e i prezzi sono alti: per un pasto più normale cerca le vie laterali, verso Rundetaarn o il mercato di Torvehallerne.",C:"Vicino a Tivoli e alla stazione centrale i prezzi dei ristoranti sono i più alti; a Vesterbro, a dieci minuti, ci sono locali più abbordabili."},
freeLong:"Qualche idea: una sosta in una pasticceria con un wienerbrød, una passeggiata nel parco di Rosenborg, un giro in battello sui canali o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè con un wienerbrød.",
remind:"Dal 1° novembre Rosenborg e Amalienborg chiudono il lunedì. Si paga quasi tutto con la carta: porta pochissimi contanti.",
rain1:"Al coperto: Christiansborg, il Museo Nazionale, la Glyptotek, il castello di Rosenborg e Torvehallerne.",
rainM:"Al coperto: Christiansborg, Museo Nazionale, Glyptotek, Rosenborg, Amalienborg e Torvehallerne.",
water:"Riempite la borraccia: l'acqua del rubinetto di Copenaghen è ottima e potabile. Ci sono fontanelle pubbliche in città: attivate «Acqua» sulla mappa.",
kitchen:"A Copenaghen si pranza tra le 11:30 e le 14 e si cena presto, dalle 17:30: molti ristoranti tradizionali chiudono tra i due servizi e lo smørrebrød si mangia a pranzo.",
night:[["🍺","Una birra artigianale in un locale del quartiere di Vesterbro o di Nørrebro è il modo danese di chiudere la giornata."],["🕙","Le cucine servono fino alle 21–22. Il metro funziona 24 ore su 24; di notte ci sono anche i bus notturni (linee con la lettera N)."],["☕","Molti caffè aprono alle 8–9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Copenaghen ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per smørrebrød, caffè e carretti: la Danimarca è cara, una colazione costa intorno a 10–14 €, due smørrebrød 20–30 € e una cena completa con un piatto principale 25–35 €. Quasi ovunque si paga solo con carta o telefono; alcuni locali non accettano i contanti.",
taxNote:"A Copenaghen, come in tutta la Danimarca, non si paga l'imposta di soggiorno: il prezzo che trovi sull'annuncio è quello che paghi.",
mcrit:"Criteri: almeno 4 stelle su Google, caffè storici, mercati e banchi di smørrebrød, niente catene. Colazione e pranzo restano sotto i 15–20 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: gli orari qui indicati sono prudenti, controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["La metro M2 parte sotto il Terminal 3 e arriva a Kongens Nytorv in circa 13 minuti, con corse ogni pochi minuti di giorno.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto metro per l'aeroporto (3 zone, circa 30–36 corone) e City Pass Small da 24 ore (circa 100 corone): si comprano nell'app DOT Billetter o alle macchinette",function(E){return true}],["chr","Biglietto per Christiansborg: Sale di Rappresentanza Reali (120 corone), la torre è gratuita ma serve il biglietto con orario",["christians"]],["ros","Biglietto per il Castello di Rosenborg (circa 140–150 corone): online costa 5 corone in meno",["rosenb"]],["tiv","Biglietto per Tivoli (200 corone): controlla le date, il parco chiude dal 2 al 12 novembre",["tivoli"]],["nat","Biglietto per il Museo Nazionale (135 corone online)",["natmus"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Una carta di pagamento o il telefono per pagare: in Danimarca i contanti si usano pochissimo"]],
NUM:{1:["en","en"],2:["to","to"],3:["tre","tre"],4:["fire","FI-re"],5:["fem","fem"],6:["seks","seks"],7:["syv","siu"],8:["otte","O-te"],9:["ni","ni"],10:["ti","ti"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Goddag / Godaften","go-DÈ / go-AF-ten"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Et bord til "+(N===1?"én person":nu[0])+", tak","et bor til "+(N===1?"en per-SON":nu[1])+", tak"],["Un caffè e una cannella, per favore","En kaffe og en kanelsnegl, tak","en KA-fe o en ka-NEL-snail, tak"],["Acqua del rubinetto, per favore","Postevand, tak","POS-te-van, tak"],["Il conto, per favore","Regningen, tak","RAI-ning-en, tak"],["Posso pagare con la carta?","Kan jeg betale med kort?","kan yai be-TA-le me kort"],["Quanto costa?","Hvor meget koster det?","vor MAI-et KOS-ter de"],["Dov'è la metro?","Hvor er metroen?","vor er ME-tro-en"],["Qual è il treno per l'aeroporto?","Hvilket tog kører til lufthavnen?","VIL-ket tou KÖ-rer til LUFT-hau-nen"]];
if(M)fr=fr.concat([["Ho una prenotazione","Jeg har en reservation","yai har en re-ser-va-SHON"],["Posso lasciare i bagagli?","Kan jeg efterlade min kuffert her?","kan yai EF-ter-la-de min KU-fert her"],["A che ora è il check-out?","Hvornår er check-out?","vor-NOR er tsjek-AUT"]]);
return fr.concat([["Mi scusi","Undskyld","ON-skul"],["Grazie mille!","Mange tak!","MANG-e tak"]])},
taxTxt:function(tx){return "A Copenaghen non c'è imposta di soggiorno"+(tx[2]?"":" (e comunque non si pagherebbe se sei ospite di amici o parenti)")+": il prezzo che trovi sull'annuncio è quello che paghi, a meno che la struttura non aggiunga altri costi."},
STAYTIPS:["Il metro (M1–M4) funziona 24 ore su 24 e vale lo stesso biglietto del treno e dei bus. Di notte ci sono anche i bus notturni. Copenaghen è anche una città da girare in bici: i noleggi sono ovunque, ma segui le corsie ciclabili e fai attenzione ai ciclisti quando attraversi."],
ZONES:[
["🚇 Metro, treno e biglietti",["Un solo sistema di zone vale su metro, treno e bus: la corsa di 2 zone costa 24 corone, quella dall'aeroporto (3 zone) circa 30–36 corone, il City Pass Small da 24 ore circa 100 corone.","I biglietti si comprano prima di salire (app DOT Billetter, macchinette o Rejsekort): non ci sono tornelli e la multa è alta.","La metro M1–M4 funziona 24 ore su 24; la linea M3 (rossa) fa il giro del centro e arriva a Kongens Nytorv, Rådhuspladsen e alla stazione centrale.","Le piste ciclabili sono ovunque e hanno la precedenza: guarda sempre prima di scendere dal marciapiede."]],
["🏛️ Centro: Nyhavn, Amalienborg e Christiansborg",["Da Kongens Nytorv si arriva a piedi a Nyhavn in 6 minuti e ad Amalienborg in 10.","Christiansborg ha la torre più alta della città, con salita gratuita: serve il biglietto con orario e un documento.","Il cambio della guardia ad Amalienborg è a mezzogiorno, ma l'orario può cambiare."],["nyhavn","christians","amalien"]],
["🎢 Tivoli e i musei",["Tivoli è chiuso dal 2 al 12 novembre 2026; dal 13 novembre c'è il Natale.","Il Museo Nazionale e la Glyptotek sono a pochi passi da Tivoli.","Da novembre molti musei chiudono il lunedì."],["tivoli","natmus","glypt"]],
["☕ Smørrebrød e pasticcerie",["Lo smørrebrød è un pasto di pane di segale con pesce o carne: due pezzi sono un pranzo.","Per le torte e il wienerbrød cerca le pasticcerie storiche (La Glace) o i banchi di Torvehallerne.","L'acqua si chiede come «postevand»: è gratuita e ottima."],["torvehal","laglace","schonnemann"]],
["🌅 Un giorno fuori Copenaghen",["Il castello di Kronborg a Helsingør (il castello di Amleto) si raggiunge in treno in circa 45 minuti.","Malmö, in Svezia, è a circa 35 minuti di treno dalla stazione centrale attraverso il ponte dell'Øresund (serve un documento)."]]],
WTIPS:["L'acqua del rubinetto di Copenaghen è ottima: puoi chiederla in ogni locale («postevand, tak») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Danimarca fa parte dello spazio Schengen e non usa l'euro: la moneta è la corona danese (1 € vale circa 7,46 corone). Per entrare basta la carta d'identità valida.","Copenaghen ha lo stesso fuso orario dell'Italia.","Si paga quasi tutto con la carta o il telefono; alcuni locali e i piccoli negozi non accettano contanti. Nei ristoranti la mancia è già compresa nel conto: si arrotonda solo per un servizio speciale.","I prezzi sono alti: per mangiare con meno spendi in mercati, banchi di smørrebrød e panetterie.","Le piste ciclabili sono ovunque: non camminare sulla corsia delle bici e guarda sempre prima di attraversare.","L'inglese lo parlano quasi tutti: puoi usare qualche parola danese per cortesia («tak» = grazie).","Controlla orari e prezzi qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Trasporti pubblici, orari e biglietti: <a href="https://www.rejseplanen.dk/" target="_blank" rel="noopener">rejseplanen.dk</a> · metro: <a href="https://intl.m.dk/" target="_blank" rel="noopener">m.dk</a> · treni: <a href="https://www.dsb.dk/" target="_blank" rel="noopener">dsb.dk</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Copenaghen: <a href="https://ambcopenaghen.esteri.it" target="_blank" rel="noopener">ambcopenaghen.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Copenaghen. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.rejseplanen.dk/" target="_blank" rel="noopener">rejseplanen.dk</a> e, per i treni, <a href="https://www.dsb.dk/" target="_blank" rel="noopener">dsb.dk</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 78 110 84 Q150 88 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M16 106 V58 H48 V106 Z M13 58 H51 V52 H13 Z M22 52 V44 H42 V52 Z M28 44 Q32 34 36 44 Z M31 34 V26 H33 V34 Z"/></g>'+
'<g style="--k:2"><path d="M70 106 V50 H104 V106 Z M68 50 H106 V44 H68 Z M76 44 V30 H98 V44 Z M80 30 H94 L87 14 Z M86 14 V4 H88 V14 Z"/></g>'+
'<g style="--k:3"><path d="M120 106 V82 H200 V106 Z M130 82 V72 H190 V82 Z M154 72 Q146 56 156 46 Q150 36 158 26 Q160 16 158 8 H162 Q164 16 164 26 Q172 36 166 46 Q174 56 166 72 Z"/></g>'+
'<g style="--k:4"><path d="M216 106 V74 H264 V106 Z M224 74 V60 H256 V74 Z M232 60 V44 H248 V60 Z M234 44 Q238 24 239 6 Q241 24 246 44 Z"/></g>'+
'<g style="--k:5"><path d="M290 106 V70 L300 62 L310 70 V106 Z M312 106 V64 L322 54 L332 64 V106 Z M334 106 V72 L344 66 L354 72 V106 Z M356 106 V60 L366 50 L376 60 V106 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M232 40 l14 -4 M233 30 l12 -4 M235 20 l8 -3"/><path d="M296 82 h8 M296 92 h8 M318 82 h8 M318 92 h8 M340 84 h8 M340 94 h8 M362 80 h8 M362 90 h8"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.copenaghen);

;var n=window.CITIES["copenaghen"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["copenaghen"]);
