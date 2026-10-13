/* ===== Amburgo (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.amburgo=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Amburgo (HAM) è l'unico con voli di linea dall'Italia. Lübeck (LBC) ha solo voli Ryanair per Regno Unito e Spagna: non incluso */
var PAR={
HAM:{n:"Amburgo Helmut Schmidt (HAM)",s:"Hamburg Airport Helmut Schmidt",url:"https://www.hamburg-airport.de/en",live:"Hamburg",inMin:40,buf:120,pos:[53.6304,9.9882],sd:"Aeroporto HAM · S-Bahn S1",rt:"Dall'aeroporto: S-Bahn S1 diretta fino alla stazione Jungfernstieg, nel cuore della città, senza cambi.",
 arr:"Dall'Italia si entra in Germania senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «S-Bahn»: la stazione è sotto l'aeroporto, a pochi passi dai terminal. La S1 porta in circa 25 minuti alla Hauptbahnhof (la stazione centrale) e prosegue per Jungfernstieg, Stadthausbrücke e Landungsbrücken, quindi vai a Jungfernstieg o scendi dove ti serve. Un treno ogni 10 minuti nelle ore di punta e ogni 20 minuti di sera; il servizio va dalla mattina presto a dopo mezzanotte (orari da controllare su s-bahn-hamburg.de). In tutto servono circa 30–40 minuti dall'uscita dall'aeroporto al centro.",
 tk:"Biglietto: la S1 per il centro vale un biglietto singolo «Hamburg AB» da 4,10 € (3,81 € se lo compri online o con l'app «hvv switch»; prezzi della tariffa 2026). Si compra alle macchinette gialle alla stazione S-Bahn o con l'app, e va convalidato prima di salire se è cartaceo. Il biglietto va comprato prima del viaggio: i controllori sono in borghese.",
 gm:"Hamburg Airport S-Bahn station",
 tips:["La S1 è l'unico collegamento rapido ed economico: il taxi per il centro costa di solito 25–35 € e 20–40 minuti, secondo il traffico (da guide, da confermare).","Il servizio notturno della S1 può cambiare nel fine settimana: controlla l'ultimo treno prima di un volo serale o tardo.","Sul tabellone alla stazione cerca «Jungfernstieg» o «Altona» come direzione: controlla che il treno vada verso il centro e non verso Poppenbüttel."]}
};
/* linee (tracciati indicativi) */
var SEG={
s1:{c:"#2f9f57",n:"S-Bahn S1 dall'aeroporto",p:[[53.6304,9.9882,"Aeroporto",2],[53.5530,10.0066,"Hauptbahnhof",2],[53.5528,9.9926,"Jungfernstieg",2],[53.5489,9.9825,"Stadthausbrücke"],[53.5461,9.9697,"Landungsbrücken",2],[53.5497,9.9628,"Reeperbahn",2]]},
u3:{c:"#f7b900",n:"U-Bahn U3 (gialla)",p:[[53.5503,9.9937,"Rathaus",2],[53.5471,9.9812,"Rödingsmarkt",2],[53.5440,9.9873,"Baumwall",2],[53.5461,9.9697,"Landungsbrücken",2]]},
u1:{c:"#1d63b3",n:"U-Bahn U1 (blu)",p:[[53.5528,9.9926,"Jungfernstieg",2],[53.5611,9.9833,"Stephansplatz",2]]}
};
var START=[53.5527,9.9926];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
elbphi:{t:"Elbphilharmonie: la Plaza panoramica",z:"B",p:1,min:45,id:60,max:90,pos:[53.5413,9.9841],q:"Elbphilharmonie Hamburg",cls:"",sun:1,tk:[5,"Elbphilharmonie Plaza (5 €)",1,1],
 win:function(){return[10*60,24*60]},
 d:"La sala da concerti sul porto, costruita sopra un vecchio magazzino di mattoni, con il tetto a onde di vetro. La Plaza, il terrazzo panoramico a 37 metri, gira attorno all'edificio e dà una vista a 360 gradi su porto, fiume e città.",
 m:"La Plaza è aperta ogni giorno dalle 10 alle 24 (ultimo ingresso alle 23:30). Il biglietto per salire costa 5 € a persona (3 € ridotto per i ragazzi dai 3 ai 17 anni e gli studenti), da comprare online o al Ticket Pavilion davanti all'edificio; prenotare online garantisce l'ingresso all'orario scelto senza coda (dal sito dell'Elbphilharmonie). Chi ha un biglietto per un concerto può salire sulla Plaza fino a due ore prima. Orari invernali e chiusure per eventi da controllare su elbphilharmonie.de."},
speicher:{t:"Speicherstadt e HafenCity",z:"B",p:1,min:60,id:80,max:120,pos:[53.5435,9.9930],q:"Speicherstadt, Hamburg",cls:"walk",sun:1,
 d:"Il più grande quartiere di magazzini su palafitte del mondo, patrimonio UNESCO: palazzi di mattoni rossi con torrette, canali (fleet) e ponti. Dopo il Wasserschloss, il castello d'acqua, il quartiere nuovo di HafenCity porta fino all'Elbphilharmonie.",
 m:"Si cammina gratis, a ogni ora del giorno. Le barche sui canali della Speicherstadt dipendono dalla marea e sono a pagamento (prezzi e orari da controllare, vedi sito dell'operatore). Di sera i palazzi sono illuminati e il quartiere è molto suggestivo. Alcuni magazzini ospitano musei piccoli (dogana, caffè, spezie) con orari propri."},
wunder:{t:"Miniatur Wunderland",z:"B",p:2,min:120,id:150,max:240,pos:[53.5437,9.9889],q:"Miniatur Wunderland, Hamburg",cls:"",sun:1,tk:[22,"Miniatur Wunderland (da 22 €)",1,1],
 win:function(){return[9*60+30,18*60]},
 d:"Il più grande plastico ferroviario del mondo, dentro un magazzino della Speicherstadt: in miniatura ci sono l'Italia, gli Stati Uniti, un aeroporto con aerei che decollano, le Alpi e Amburgo stessa, con migliaia di treni, auto e persone. È una delle attrazioni più amate di Amburgo, per adulti e bambini.",
 m:"Aperto ogni giorno dell'anno, almeno dalle 9:30 alle 18; nei weekend, nelle vacanze scolastiche e in alcune sere gli orari sono più lunghi (calendario sul sito). Il biglietto ha un orario d'ingresso scelto online: senza prenotazione si rischia una lunga attesa. Il prezzo base per adulti parte da circa 22 € (da guide e scheda ufficiale parziale: da confermare su miniatur-wunderland.com). Nel weekend e nelle vacanze costa di più e si esaurisce."},
rathaus:{t:"Rathaus, Jungfernstieg e Binnenalster",z:"A",p:2,min:60,id:80,max:120,pos:[53.5503,9.9921],q:"Rathaus Hamburg",cls:"walk",sun:1,
 d:"Il municipio neorinascimentale con la torre alta 112 metri e le facciate scolpite, davanti alla grande piazza Rathausmarkt. A pochi passi, il Jungfernstieg è il viale che costeggia il lago della Binnenalster, con le barche, i cigni e i palazzi eleganti.",
 m:"La piazza e il viale si vedono gratis. Dentro il Rathaus si entra solo con visita guidata a pagamento (di solito in tedesco e in inglese, qualche volta al giorno; orari e prezzi da controllare sul sito del comune). Dalla fine di novembre la piazza ospita di solito il mercatino di Natale (date 2026 da confermare)."},
michel:{t:"Michel: la chiesa simbolo di Amburgo",z:"A",p:2,min:45,id:60,max:90,pos:[53.5489,9.9790],q:"Hauptkirche St. Michaelis, Hamburg",cls:"",sun:1,tk:[5,"Michel: salita alla torre (5 €)",1,1],
 win:function(){return[10*60,17*60+30]},
 d:"La chiesa barocca con la torre di rame verde, alta 132 metri, è il simbolo della città. Dentro, la navata bianca e dorata è tra le più belle dei paesi luterani del nord. Dalla piattaforma sulla torre, a 106 metri, si vede tutto il porto.",
 m:"La torre è aperta di inverno ogni giorno dalle 10 alle 17:30 (da scheda turistica, da confermare). Salita alla torre 5 €, cripta con mostra e film 4 €, biglietto doppio 7 €; il prezzo è un po' più basso con la Hamburg Card. L'ascensore porta fino a metà torre, il resto è una breve rampa di scale. La navata si può visitare con una piccola offerta, fuori dalle funzioni."},
nikolai:{t:"Mahnmal St. Nikolai",z:"A",p:4,min:30,id:45,max:60,pos:[53.5473,9.9889],q:"Mahnmal St. Nikolai, Hamburg",cls:"",sun:1,tk:[12,"Mahnmal St. Nikolai (da 11,90 €)",1,1],
 win:function(){return[10*60,17*60]},
 d:"Il campanile gotico di una chiesa distrutta dai bombardamenti del 1943, lasciato in piedi come monumento contro la guerra. Nella cripta c'è una mostra sulla distruzione di Amburgo; un ascensore panoramico porta a 76 metri.",
 m:"L'ingresso con la salita parte da 11,90 € (scheda turistica, da confermare). Orari invernali non letti: controllare su mahnmal-st-nikolai.de prima di andare. La parte esterna con le rovine si vede gratis."},
landung:{t:"Landungsbrücken, Alter Elbtunnel e giro del porto",z:"C",p:1,min:90,id:120,max:180,pos:[53.5455,9.9700],q:"Landungsbrücken, Hamburg",cls:"",sun:1,tk:[19,"Giro del porto in barca (circa 19 €)",1,1],
 win:function(){return[10*60,17*60]},
 d:"I moli galleggianti da cui partono i battelli del porto, con la scritta bianca «St. Pauli Landungsbrücken». Da qui si passa sotto il fiume a piedi nel vecchio tunnel dell'Elba del 1911, o si fa il giro del porto in barca, tra gru, container e navi.",
 m:"Il giro del porto in barca dura circa un'ora: i prezzi vanno da 17 a 26 € secondo la compagnia, da novembre a Pasqua le partenze sono ogni ora o ogni mezz'ora, circa dalle 10–11 alle 15–17 (elenco del sito del turismo di Amburgo, senza garanzia: da confermare). Per risparmiare, la barca di linea 62 dell'HVV attraversa il porto con un normale biglietto dei mezzi. L'Alter Elbtunnel è gratuito per chi va a piedi; controlla sul sito del comune eventuali lavori all'ascensore. La domenica mattina, nelle vicinanze, c'è il Fischmarkt, il mercato del pesce, molto presto (orari invernali da confermare: di solito dalle 7 alle 9:30)."},
reeper:{t:"Reeperbahn e St. Pauli",z:"C",p:3,min:45,id:60,max:120,pos:[53.5499,9.9633],q:"Reeperbahn, Hamburg",cls:"walk",multi:1,sun:1,
 d:"La strada del divertimento di Amburgo, famosa nel mondo, nel quartiere di St. Pauli: teatri, musica dal vivo, bar e luci al neon. Nei vicoli vicini c'è la Große Freiheit dove cominciarono i Beatles, e la Davidstraße con la storia del quartiere.",
 m:"Di giorno si cammina senza problemi; la sera e il fine settimana la zona diventa molto affollata, con bar rumorosi: tieni sempre vicini borse e telefoni. Si vede gratis dal marciapiede. Evita le vie secondarie a notte fonda."},
kontor:{t:"Kontorhausviertel e Chilehaus",z:"A",p:3,min:45,id:60,max:90,pos:[53.5497,10.0014],q:"Chilehaus, Hamburg",cls:"walk",sun:1,
 d:"Il quartiere degli uffici di mattoni degli anni Venti, patrimonio UNESCO, con il Chilehaus, un palazzo a forma di prua di nave che sembra navigare nella strada. Un'architettura espressionista unica in Germania.",
 m:"Si vede gratis dalla strada, a ogni ora del giorno; l'interno degli uffici non è aperto. Il Chilehaus ha un cortile con alcuni negozi aperti di giorno."},
kunsthalle:{t:"Hamburger Kunsthalle",z:"F",p:4,min:75,id:105,max:150,pos:[53.5555,10.0004],q:"Hamburger Kunsthalle",cls:"",cl:[0],sun:1,tk:[14,"Hamburger Kunsthalle (circa 14 €)",1,1],
 win:function(){return[10*60,18*60]},
 d:"Il grande museo d'arte di Amburgo, di fronte alla stazione centrale, con dipinti dal Medioevo all'arte contemporanea: i paesaggi romantici di Caspar David Friedrich (il «Viandante sul mare di nebbia») sono la sua opera più famosa, poi Rembrandt, Monet, Munch.",
 m:"Aperto da martedì a domenica dalle 10 alle 18, il giovedì fino alle 21; il lunedì è chiuso (orari da scheda online, da confermare su hamburger-kunsthalle.de). Il biglietto costa circa 14 € (prezzo non letto: da confermare); i minori di 18 anni entrano gratis."},
planten:{t:"Planten un Blomen",z:"D",p:5,min:45,id:60,max:90,pos:[53.5620,9.9820],q:"Planten un Blomen, Hamburg",cls:"walk",multi:1,sun:1,
 d:"Il parco verde in centro, nato dalle antiche mura della città, con giardino giapponese, serre dei fiori e il lago con la fontana. Nella stagione calda, la sera, ci sono i concerti con giochi d'acqua e luci.",
 m:"L'ingresso al parco è gratuito e il parco è aperto tutto l'anno dalle 7 fino a tardi (orari invernali da confermare). Le serre tropicali hanno un biglietto a parte, mentre i giochi d'acqua della sera sono limitati alla stagione calda: d'inverno di solito non ci sono."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","rathaus",7,"walk","A piedi lungo la Binnenalster e per la Reesendammbrücke fino al Rathaus, circa 7 minuti.","A piedi per la Reesendammbrücke fino a Jungfernstieg, circa 7 minuti.",{f:[W([[53.5527,9.9926],[53.5515,9.9925],[53.5503,9.9921]])],r:[W([[53.5503,9.9921],[53.5515,9.9925],[53.5527,9.9926]])]});
P2("start","elbphi",22,"metro","A piedi fino alla U3 Rathaus (6 minuti), U3 fino a Baumwall (circa 4 minuti), poi 7 minuti a piedi lungo la Brooktorkai fino all'Elbphilharmonie.","A piedi fino a Baumwall, U3 fino a Rathaus e 6 minuti a piedi fino a Jungfernstieg, circa 22 minuti.",{f:[W([[53.5527,9.9926],[53.5503,9.9937]]),["u3","Rathaus","Baumwall"],W([[53.5440,9.9873],[53.5425,9.9855],[53.5413,9.9841]])],r:[W([[53.5413,9.9841],[53.5425,9.9855],[53.5440,9.9873]]),["u3","Baumwall","Rathaus"],W([[53.5503,9.9937],[53.5527,9.9926]])]});
P2("start","michel",12,"metro","S-Bahn S1 o S3 da Jungfernstieg a Stadthausbrücke (una fermata), poi 8 minuti a piedi fino al Michel.","A piedi fino a Stadthausbrücke, S1 o S3 fino a Jungfernstieg, circa 12 minuti.",{f:[["s1","Jungfernstieg","Stadthausbrücke"],W([[53.5489,9.9825],[53.5490,9.9805],[53.5489,9.9790]])],r:[W([[53.5489,9.9790],[53.5490,9.9805],[53.5489,9.9825]]),["s1","Stadthausbrücke","Jungfernstieg"]]});
P2("start","landung",5,"metro","S-Bahn S1 o S3 da Jungfernstieg a Landungsbrücken (2 fermate, circa 4 minuti).","S1 o S3 da Landungsbrücken a Jungfernstieg, circa 4 minuti.",{f:[["s1","Jungfernstieg","Landungsbrücken"]],r:[["s1","Landungsbrücken","Jungfernstieg"]]});
P2("start","reeper",10,"metro","S-Bahn S1 o S3 da Jungfernstieg a Reeperbahn (3 fermate, circa 6 minuti).","S1 o S3 da Reeperbahn a Jungfernstieg, circa 6 minuti.",{f:[["s1","Jungfernstieg","Reeperbahn"]],r:[["s1","Reeperbahn","Jungfernstieg"]]});
P2("start","kunsthalle",12,"metro","S-Bahn S1 o S3 da Jungfernstieg a Hauptbahnhof (una fermata, circa 2 minuti), poi 4 minuti a piedi attraverso la stazione fino alla Kunsthalle.","A piedi fino alla Hauptbahnhof, S1 o S3 fino a Jungfernstieg, circa 12 minuti.",{f:[W([[53.5527,9.9926],[53.5530,10.0066]]),W([[53.5530,10.0066],[53.5555,10.0004]])],r:[W([[53.5555,10.0004],[53.5530,10.0066]]),W([[53.5530,10.0066],[53.5527,9.9926]])]});
P2("start","planten",10,"metro","Metro U1 da Jungfernstieg a Stephansplatz (una fermata, circa 2 minuti), poi 5 minuti a piedi nel parco.","A piedi fino a Stephansplatz, U1 fino a Jungfernstieg, circa 10 minuti.",{f:[["u1","Jungfernstieg","Stephansplatz"],W([[53.5611,9.9833],[53.5620,9.9820]])],r:[W([[53.5620,9.9820],[53.5611,9.9833]]),["u1","Stephansplatz","Jungfernstieg"]]});
P2("rathaus","michel",17,"walk","A piedi per la Michaelisstraße e il Ness fino al Michel, circa 17 minuti.","A piedi per la Michaelisstraße fino al Rathaus, circa 17 minuti.",{f:[W([[53.5503,9.9921],[53.5496,9.9850],[53.5489,9.9790]])],r:[W([[53.5489,9.9790],[53.5496,9.9850],[53.5503,9.9921]])]});
P2("rathaus","nikolai",12,"walk","A piedi per la Willy-Brandt-Straße fino al Mahnmal St. Nikolai, circa 12 minuti.","A piedi lungo la Willy-Brandt-Straße fino al Rathaus, circa 12 minuti.",{f:[W([[53.5503,9.9921],[53.5487,9.9905],[53.5473,9.9889]])],r:[W([[53.5473,9.9889],[53.5487,9.9905],[53.5503,9.9921]])]});
P2("rathaus","kontor",13,"walk","A piedi per la Mönckebergstraße fino al Chilehaus, circa 13 minuti.","A piedi per la Mönckebergstraße fino al Rathaus, circa 13 minuti.",{f:[W([[53.5503,9.9921],[53.5502,9.9965],[53.5497,10.0014]])],r:[W([[53.5497,10.0014],[53.5502,9.9965],[53.5503,9.9921]])]});
P2("nikolai","michel",9,"walk","A piedi per la Ost-West-Straße e Ludwig-Erhard-Straße fino al Michel, circa 9 minuti.","A piedi fino al Mahnmal St. Nikolai, circa 9 minuti.",{f:[W([[53.5473,9.9889],[53.5480,9.9840],[53.5489,9.9790]])],r:[W([[53.5489,9.9790],[53.5480,9.9840],[53.5473,9.9889]])]});
P2("nikolai","speicher",8,"walk","A piedi per la Zollkanal e il ponte fino alla Speicherstadt, circa 8 minuti.","A piedi fino al Mahnmal St. Nikolai, circa 8 minuti.",{f:[W([[53.5473,9.9889],[53.5455,9.9905],[53.5435,9.9930]])],r:[W([[53.5435,9.9930],[53.5455,9.9905],[53.5473,9.9889]])]});
P2("speicher","wunder",4,"walk","A piedi per il Kehrwieder fino al Miniatur Wunderland, circa 4 minuti.","A piedi per il Kehrwieder fino alla Speicherstadt, circa 4 minuti.",{f:[W([[53.5435,9.9930],[53.5436,9.9910],[53.5437,9.9889]])],r:[W([[53.5437,9.9889],[53.5436,9.9910],[53.5435,9.9930]])]});
P2("speicher","elbphi",12,"walk","A piedi per la Kehrwiederspitze e il molo fino all'Elbphilharmonie, circa 12 minuti.","A piedi per HafenCity fino alla Speicherstadt, circa 12 minuti.",{f:[W([[53.5435,9.9930],[53.5425,9.9880],[53.5413,9.9841]])],r:[W([[53.5413,9.9841],[53.5425,9.9880],[53.5435,9.9930]])]});
P2("wunder","elbphi",14,"walk","A piedi lungo il canale e il molo fino all'Elbphilharmonie, circa 14 minuti.","A piedi lungo il molo fino al Miniatur Wunderland, circa 14 minuti.",{f:[W([[53.5437,9.9889],[53.5425,9.9865],[53.5413,9.9841]])],r:[W([[53.5413,9.9841],[53.5425,9.9865],[53.5437,9.9889]])]});
P2("elbphi","michel",18,"walk","A piedi per l'Hafenpromenade e il Rödingsmarkt fino al Michel, circa 18 minuti.","A piedi fino al Baumwall e lungo il fiume fino all'Elbphilharmonie, circa 18 minuti.",{f:[W([[53.5413,9.9841],[53.5445,9.9820],[53.5489,9.9790]])],r:[W([[53.5489,9.9790],[53.5445,9.9820],[53.5413,9.9841]])]});
P2("elbphi","landung",18,"walk","A piedi lungo la passeggiata sull'Elba fino ai Landungsbrücken, circa 18 minuti.","A piedi lungo l'Elba fino all'Elbphilharmonie, circa 18 minuti.",{f:[W([[53.5413,9.9841],[53.5435,9.9770],[53.5455,9.9700]])],r:[W([[53.5455,9.9700],[53.5435,9.9770],[53.5413,9.9841]])]});
P2("michel","landung",12,"walk","A piedi giù per la Ditmar-Koel-Straße fino ai Landungsbrücken, circa 12 minuti.","A piedi su per la Ditmar-Koel-Straße fino al Michel, circa 12 minuti.",{f:[W([[53.5489,9.9790],[53.5470,9.9745],[53.5455,9.9700]])],r:[W([[53.5455,9.9700],[53.5470,9.9745],[53.5489,9.9790]])]});
P2("michel","reeper",15,"walk","A piedi per Neuer Pferdemarkt e Davidstraße fino alla Reeperbahn, circa 15 minuti.","A piedi fino al Michel passando per la Ditmar-Koel-Straße, circa 15 minuti.",{f:[W([[53.5489,9.9790],[53.5495,9.9700],[53.5499,9.9633]])],r:[W([[53.5499,9.9633],[53.5495,9.9700],[53.5489,9.9790]])]});
P2("landung","reeper",12,"walk","A piedi su per la Davidstraße fino alla Reeperbahn, circa 12 minuti.","A piedi giù per la Davidstraße fino ai Landungsbrücken, circa 12 minuti.",{f:[W([[53.5455,9.9700],[53.5480,9.9665],[53.5499,9.9633]])],r:[W([[53.5499,9.9633],[53.5480,9.9665],[53.5455,9.9700]])]});
P2("kontor","speicher",12,"walk","A piedi per la Brandstwiete fino alla Speicherstadt, circa 12 minuti.","A piedi per la Brandstwiete fino al Chilehaus, circa 12 minuti.",{f:[W([[53.5497,10.0014],[53.5465,9.9975],[53.5435,9.9930]])],r:[W([[53.5435,9.9930],[53.5465,9.9975],[53.5497,10.0014]])]});
P2("kunsthalle","kontor",10,"walk","A piedi per la Steintorwall e la Klosterwall fino al Chilehaus, circa 10 minuti.","A piedi fino alla Kunsthalle passando per la Hauptbahnhof, circa 10 minuti.",{f:[W([[53.5555,10.0004],[53.5530,10.0008],[53.5497,10.0014]])],r:[W([[53.5497,10.0014],[53.5530,10.0008],[53.5555,10.0004]])]});
P2("kunsthalle","rathaus",15,"walk","A piedi per la Mönckebergstraße fino al Rathaus, circa 15 minuti.","A piedi per la Mönckebergstraße fino alla Kunsthalle, circa 15 minuti.",{f:[W([[53.5555,10.0004],[53.5530,9.9970],[53.5503,9.9921]])],r:[W([[53.5503,9.9921],[53.5530,9.9970],[53.5555,10.0004]])]});
P2("kunsthalle","planten",20,"walk","A piedi lungo la Binnenalster e per il Gänsemarkt fino a Planten un Blomen, circa 20 minuti.","A piedi lungo la Binnenalster fino alla Kunsthalle, circa 20 minuti.",{f:[W([[53.5555,10.0004],[53.5580,9.9920],[53.5620,9.9820]])],r:[W([[53.5620,9.9820],[53.5580,9.9920],[53.5555,10.0004]])]});
P2("planten","rathaus",20,"walk","A piedi per il Gänsemarkt e la Poststraße fino al Rathaus, circa 20 minuti.","A piedi fino al parco passando per il Gänsemarkt, circa 20 minuti.",{f:[W([[53.5620,9.9820],[53.5565,9.9890],[53.5503,9.9921]])],r:[W([[53.5503,9.9921],[53.5565,9.9890],[53.5620,9.9820]])]});
P2("planten","reeper",22,"walk","A piedi per il parco e lo Heiligengeistfeld fino alla Reeperbahn, circa 22 minuti.","A piedi per lo Heiligengeistfeld e il parco fino a Planten un Blomen, circa 22 minuti.",{f:[W([[53.5620,9.9820],[53.5560,9.9720],[53.5499,9.9633]])],r:[W([[53.5499,9.9633],[53.5560,9.9720],[53.5620,9.9820]])]});
/* ritorno in aeroporto: S1 diretta da Jungfernstieg */
var RET={
HAM:{
 A:{min:45,txt:"S-Bahn S1 da Jungfernstieg (o dalla Hauptbahnhof) direttamente all'aeroporto, in circa 25–30 minuti; un treno ogni 10 minuti nelle ore di punta e ogni 20 minuti la sera. Biglietto singolo «Hamburg AB» da 4,10 € (3,81 € online). Controlla sul tabellone che la direzione sia «Hamburg Airport» e non Altona o Wedel, e se hai un volo molto presto o tardissimo verifica l'ultimo e il primo treno.",g:[["s1","Jungfernstieg","Aeroporto"]]}}
};
var ARR={
HAM:[["s1","Aeroporto","Jungfernstieg"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
paris:{n:"Café Paris",a:"Rathausstraße 4",z:"A",r:"4,5",pos:[53.5502,9.9948],h:D7("09:00-23:00"),
 d:"Una brasserie in stile francese dentro un ex negozio di latticini di fine Ottocento, tutto piastrelle e specchi, a due passi dal Rathaus. Si fa una colazione ricca o un pranzo con piatti semplici.",pr:"Una colazione costa circa 10–16 € e un piatto del giorno 14–22 € (listino non visto). Orari da guide, da confermare."},
ratswein:{n:"Hamburger Ratsweinkeller",a:"Große Johannisstraße 2",z:"A",r:"4,4",pos:[53.5497,9.9925],h:["11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-22:00"],
 d:"La cantina del Rathaus, con volte di mattoni dal 1897: cucina di Amburgo con pesce, Labskaus e Pannfisch e una buona carta di vini. È un posto da pasto vero, meno costoso della maggior parte dei ristoranti sul lungolago.",pr:"Un piatto principale sta intorno ai 16–26 € (listino non visto). Orari da guide, da confermare."},
wischer:{n:"Daniel Wischer",a:"Spitalerstraße 12",z:"A",r:"4,3",pos:[53.5516,10.0007],h:["09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","10:00-18:00"],
 d:"Un banco di panini al pesce nella Spitalerstraße, la via pedonale tra la stazione e il centro: Fischbrötchen con aringa, salmone e gamberetti, da mangiare in piedi, per un pranzo veloce e tipico di Amburgo.",pr:"Un panino al pesce costa circa 4–8 € (listino non visto). Orari da guide, da confermare."},
bruecke10:{n:"Brücke 10",a:"Landungsbrücken, Brücke 10",z:"C",r:"4,2",pos:[53.5457,9.9687],h:D7("10:00-20:00"),
 d:"Il chiosco del pesce più famoso ai Landungsbrücken: Fischbrötchen con aringa, Backfisch (pesce fritto) o salmone, con vista sul porto. È il pranzo simbolo di Amburgo, da mangiare in piedi sul molo.",pr:"Un panino al pesce costa circa 5–9 € (listino non visto). Orari da guide, da confermare."},
ocr:{n:"Old Commercial Room",a:"Englische Planke 10",z:"A",r:"4,4",pos:[53.5455,9.9768],h:D7("11:30-23:00"),
 d:"Una taverna tradizionale vicina al Michel, aperta dal 1795, frequentata da marinai e dai commercianti del porto: legno scuro, quadri di navi e un piatto di Labskaus (purè di patate, manzo salato e barbabietola) o Pannfisch.",pr:"Un piatto principale costa circa 18–30 € (listino non visto): è più caro delle birrerie. Orari da guide, da confermare."},
groeninger:{n:"Gröninger Braukeller",a:"Willy-Brandt-Straße 47",z:"A",r:"4,3",pos:[53.5478,9.9870],h:["11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-22:00"],
 d:"Una birreria con produzione propria in una cantina di mattoni a pochi passi dal Michel e dalla Nikolaikirche: birra fatta in casa e piatti di cucina del nord, con porzioni abbondanti e prezzi medi.",pr:"Un piatto con birra sta intorno ai 18–26 € (listino non visto). Orari da guide, da confermare."},
albrecht:{n:"Brauhaus Joh. Albrecht",a:"Willy-Brandt-Straße 15",z:"A",r:"4,3",pos:[53.5475,9.9936],h:["11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-22:00"],
 d:"Una birreria-ristorante nel centro, vicina al Rathaus, con birra prodotta sul posto e un menù di piatti di Amburgo e dell'Alta Germania: Schnitzel, Labskaus e salsicce.",pr:"Un piatto principale costa circa 15–24 € (listino non visto). Orari da guide, da confermare."},
gnosa:{n:"Café Gnosa",a:"Lange Reihe 93",z:"F",r:"4,4",pos:[53.5561,10.0103],h:D7("09:00-23:00"),
 d:"Uno dei primi caffè di St. Georg, aperto dal 1978, sulla Lange Reihe, la via con negozi e bar a due passi dalla stazione centrale: colazioni, torte fatte in casa e piatti leggeri.",pr:"Una colazione sta intorno ai 9–14 € e una fetta di torta 5–6 € (listino non visto). Orari da guide, da confermare."},
fleet:{n:"Fleetschlösschen",a:"Brooktorkai 17",z:"B",r:"4,4",pos:[53.5434,9.9980],h:D7("10:00-22:00"),
 d:"Un piccolo edificio di mattoni sul canale della Speicherstadt, con i tavolini sull'acqua: caffè, torte, Fischbrötchen e qualche piatto semplice, il posto ideale per una pausa tra la Speicherstadt e HafenCity.",pr:"Un caffè con un dolce sta intorno ai 7–10 € e un panino al pesce 6–10 € (listino non visto). Orari da guide, da confermare."},
schanzen:{n:"Schanzenstern",a:"Bartelsstraße 12",z:"D",r:"4,3",pos:[53.5641,9.9688],h:D7("08:00-23:00"),
 d:"Un caffè-ristorante alternativo nel quartiere della Sternschanze, da una cooperativa locale: colazioni abbondanti, piatti con ingredienti biologici e molte opzioni vegetariane. Prezzi popolari in un quartiere vivace.",pr:"Una colazione costa circa 8–12 € e un piatto del giorno 11–16 € (listino non visto). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["paris","gnosa"],B:["fleet","paris"],C:["schanzen","paris"],D:["schanzen","gnosa"],F:["gnosa","paris"]},
pra:{A:["wischer","albrecht","ratswein"],B:["fleet","wischer","groeninger"],C:["bruecke10","schanzen"],D:["schanzen","bruecke10"],F:["wischer","gnosa"]},
cen:{A:["ratswein","albrecht","ocr"],B:["albrecht","groeninger","ocr"],C:["ocr","groeninger","schanzen"],D:["schanzen","groeninger"],F:["albrecht","gnosa"]},
snk:{A:["paris","wischer"],B:["fleet","paris"],C:["bruecke10","schanzen"],D:["schanzen","gnosa"],F:["gnosa","wischer"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"porto",t:"Speicherstadt, Miniatur Wunderland ed Elbphilharmonie",acts:["speicher","wunder","elbphi"],need:280,core:1},
{id:"centro",t:"Rathaus e Kontorhausviertel",acts:["rathaus","kontor"],need:150,core:1},
{id:"pauli",t:"Landungsbrücken, porto e Reeperbahn",acts:["landung","reeper"],need:200,core:1},
{id:"michel",t:"Michel e Mahnmal St. Nikolai",acts:["michel","nikolai"],need:130},
{id:"arte",t:"Kunsthalle e Planten un Blomen",acts:["kunsthalle","planten"],need:190}
];
var ORDER=["elbphi","speicher","landung","rathaus","michel","wunder","kontor","reeper","kunsthalle","nikolai","planten"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["alt","Altstadt / Neustadt / Jungfernstieg (centro)",[53.5511,9.9937],"A"],
["haf","HafenCity / Speicherstadt",[53.5435,9.9930],"B"],
["pau","St. Pauli / Landungsbrücken",[53.5499,9.9633],"C"],
["sch","Sternschanze / Karolinenviertel",[53.5630,9.9650],"D"],
["geo","St. Georg / Hauptbahnhof",[53.5560,10.0070],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[53.5527,9.9926],""]
];
/* imposta di soggiorno: Kultur- und Tourismustaxe di Amburgo, a scaglioni per persona e per notte secondo il prezzo netto della camera */
var TAX=[["h5","Hotel 4–5 stelle",3.6],["h3","Hotel fino a 3 stelle, B&B o appartamento",2.4],["host","Ostello o struttura economica",1.2],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Franzbrötchen","il dolce tipico di Amburgo: un cornetto schiacciato alla cannella, da prendere con un caffè."],["Rundstück warm","un panino caldo con arrosto di maiale e sugo, la colazione sostanziosa dei portuali."],["Frühstück mit Brötchen","la colazione tedesca: panini con burro, formaggio e salumi, un uovo e un caffè."]],
pra:[["Fischbrötchen","panino al pesce, con aringa (Matjes o Bismarck), salmone o gamberetti: il pranzo simbolo di Amburgo."],["Backfischbrötchen","panino con pesce fritto (Backfisch) e salsa remoulade."],["Currywurst","salsiccia a pezzi con salsa al curry e patatine, dal chiosco."],["Hamburger Aalsuppe","la zuppa agrodolce di Amburgo, con prugne e verdure."]],
cen:[["Labskaus","il piatto marinaro: purè di patate con manzo salato, barbabietola e uovo al tegamino."],["Pannfisch","pesce in padella con salsa alla senape e patate saltate."],["Finkenwerder Scholle","passera di mare di Finkenwerder, al burro con patate."],["Rote Grütze","il dolce classico: gelatina di frutti rossi con salsa alla vaniglia."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","L'Elbphilharmonie dal molo","Foto","La sala da concerti con le onde di vetro, vista dalla passeggiata davanti, soprattutto al tramonto.",[53.5420,9.9815],"Elbphilharmonie Hamburg","elbphi"],
["🤳","La Plaza dell'Elbphilharmonie","Selfie","Dal terrazzo si inquadra tutto il porto con le gru, un ottimo sfondo per un selfie.",[53.5413,9.9841],"Elbphilharmonie Plaza, Hamburg","elbphi"],
["📷","Il Wasserschloss","Foto","Il castello d'acqua della Speicherstadt, un edificio di mattoni rossi circondato dai canali, specie con la luce della sera.",[53.5435,9.9930],"Wasserschloss, Speicherstadt, Hamburg","speicher"],
["📷","Il Kehrwieder e i fleet","Foto","I palazzi di mattoni che si specchiano nei canali al calar della sera.",[53.5432,9.9904],"Kehrwieder, Hamburg","speicher"],
["🤳","Il Rathausmarkt","Selfie","La facciata neorinascimentale del Rathaus sullo sfondo della grande piazza.",[53.5503,9.9921],"Rathausmarkt, Hamburg","rathaus"],
["📷","Il Jungfernstieg","Foto","I cigni e le barche sulla Binnenalster, con le torri delle chiese sullo sfondo.",[53.5527,9.9926],"Jungfernstieg, Hamburg","rathaus"],
["📷","Il Michel dalla Ditmar-Koel-Straße","Foto","La torre di rame verde che sovrasta i tetti delle case del porto.",[53.5470,9.9745],"Ditmar-Koel-Straße, Hamburg","michel"],
["📷","La torre di St. Nikolai","Foto","Il campanile solitario e i resti della chiesa, un monumento contro la guerra.",[53.5473,9.9889],"Mahnmal St. Nikolai, Hamburg","nikolai"],
["🤳","I Landungsbrücken","Selfie","I moli galleggianti con la grande scritta, davanti ai battelli del porto.",[53.5455,9.9700],"Landungsbrücken, Hamburg","landung"],
["📷","L'Alter Elbtunnel","Foto","Le piastrelle verdi e il tunnel illuminato sotto il fiume; al ritorno, la vista dei cantieri navali.",[53.5459,9.9655],"Alter Elbtunnel, Hamburg","landung"],
["📷","La Reeperbahn di sera","Foto","I neon dei locali sulla strada più famosa di Amburgo, meglio dopo il tramonto.",[53.5499,9.9633],"Reeperbahn, Hamburg","reeper"],
["📷","Il Chilehaus","Foto","L'angolo a prua di nave del palazzo di mattoni, visto dalla Fischertwiete.",[53.5497,10.0014],"Chilehaus, Hamburg","kontor"],
["📷","La Kunsthalle","Foto","L'edificio di mattoni e la sala ottocentesca, con la piazza davanti alla stazione.",[53.5555,10.0004],"Hamburger Kunsthalle","kunsthalle"],
["🤳","Planten un Blomen","Selfie","Il giardino giapponese e il laghetto, un posto tranquillo in centro.",[53.5620,9.9820],"Planten un Blomen, Hamburg","planten"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-10-28",t:"U1: lavori alla stazione di Ohlsdorf",x:"Fino al 14 ottobre la U1 è interrotta tra Fuhlsbüttel Nord e Lattenkamp, con bus sostitutivi. Dal 15 al 28 ottobre i treni della U1 in direzione città non fermano a Ohlsdorf. La S-Bahn S1 per l'aeroporto non è toccata e funziona regolarmente (dalla Hochbahn). Controlla hvv.de/ohlsdorf se devi passare da quella zona."},
{from:"2026-11-20",to:"2026-12-31",t:"Mercatini di Natale di Amburgo",x:"I mercatini di Natale di Amburgo (Rathausmarkt, Jungfernstieg, Spitalerstraße e altri) aprono di solito verso la fine di novembre e restano fino al 23 dicembre circa. Le date esatte del 2026 non sono state lette: controllale su hamburg.de. Il centro è molto più affollato."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: negozi e musei chiusi o a orario ridotto",x:"In Germania il 24 dicembre i negozi chiudono presto e il 25 e il 26 dicembre sono chiusi, musei compresi in molti casi. La domenica i negozi sono sempre chiusi."},
{from:"2026-10-13",to:"2027-04-30",t:"Domenica: negozi chiusi",x:"In Germania i negozi sono chiusi la domenica e nei giorni festivi, eccetto stazioni e aeroporto. Restano aperti ristoranti, caffè e musei."}
];
/* clima medio di Amburgo (indicativo, massime/minime) */
var CLIM=[[3,-1],[5,-1],[9,1],[14,4],[19,8],[22,12],[24,14],[24,14],[20,11],[14,7],[8,3],[5,1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Amburgo: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="kunsthalle"&&WD===3)meta+=" Oggi è giovedì: la Kunsthalle resta aperta fino alle 21.";
if(it.id==="landung"&&WD===6)meta+=" Oggi è domenica: al mattino presto, vicino ai Landungsbrücken, c'è il Fischmarkt (mercato del pesce); di solito chiude verso le 9:30.";
if(it.id==="reeper"&&(WD===4||WD===5))meta+=" Stasera la Reeperbahn è molto affollata: tieni vicini borse e telefoni.";
return meta}
Object.assign(C,{id:"amburgo",n:"Amburgo",cn:"Germania",e:"⚓",flag:"🇩🇪",col:["#c8102e","#1f3a6b","#e8e8e8"],k:"amburgo hamburg germania",
TZ:"Europe/Berlin",LL:[53.5511,9.9937],CC:"de",QN:"Hamburg",BK:"Hamburg",ARE:/hamburg|amburgo|\b2[0-2][0-9]{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"de-DE",LANGN:"tedesco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Jungfernstieg",q:"Jungfernstieg S-Bahn, Hamburg"},
SINGLE:{acts:["rathaus","michel","speicher","elbphi","landung"],ins:[]},
EXCL:[],
DICON:{elbphi:"🎼",speicher:"🧱",wunder:"🚂",rathaus:"🏛️",michel:"⛪",nikolai:"🕍",landung:"⚓",reeper:"🎸",kontor:"🏢",kunsthalle:"🖼️",planten:"🌷"},
ZN:{A:"nella Altstadt",B:"a HafenCity",C:"a St. Pauli",D:"alla Sternschanze",F:"a St. Georg"},
NEAR:{col:"caffè",pra:"banco di pesce o locale veloce",cen:"birreria o ristorante",snk:"caffè o banco del pesce"},
SE:{paris:"☕",ratswein:"🍺",wischer:"🐟",bruecke10:"🐟",ocr:"🍽️",groeninger:"🍺",albrecht:"🍺",gnosa:"🍰",fleet:"☕",schanzen:"🥐"},
TR:{one:4.1,cap:8.9,lbl:"S-Bahn, U-Bahn, bus e traghetti (HVV)",
 air:{HAM:{one:4.1,n:"S-Bahn per l'aeroporto (S1, biglietto Hamburg AB 4,10 €)"}},
 passes:[
 {n:"Tageskarte (biglietto giornaliero)",d:1,max:1,p:8.9,note:"La Tageskarte vale per un giorno intero su S-Bahn, U-Bahn, bus e traghetti HVV nel Großbereich (zone A e B). Il prezzo 2026 non è stato letto: circa 8,5–9 €, da confermare su hvv.de."}],
 note:"Prezzi dalla tariffa HVV del 1° gennaio 2026: biglietto singolo «Hamburg AB» 4,10 € (3,81 € online o con l'app «hvv switch»), corsa breve (Kurzstrecke) 2,10 €, biglietto per ragazzi 1,50 €. Il prezzo della Tageskarte non è stato letto: circa 8,50–9 €, da confermare su hvv.de. L'aeroporto è in zona AB: il biglietto singolo basta, e con la Tageskarte non si paga altro. Esiste anche la Hamburg Card (trasporti e sconti ai musei): conviene solo se vuoi entrare in molte attrazioni scontate. I biglietti cartacei vanno convalidati prima di salire; i controllori sono in borghese e la multa è alta.",},
FOOD:{co:[9,"Colazione al caffè"],pr:[10,"Pranzo (panino al pesce o birreria)"],ce:[18,"Cena (cucina del nord)"],sp:[5,"Spuntini e dolci"]},
T:{ride:"In S-Bahn o metro",move:"tutto a piedi, in S-Bahn o in metro",bags:"«Kann ich meine Koffer hier lassen?»",bagsPM:"«Kann ich meine Koffer bis heute Nachmittag hier lassen?»",bagsAM:"«Kann ich meine Koffer bis Mittag hier lassen?»",
pra:"Un banco del pesce o un locale veloce",praZ:{A:"Sul lungolago del Jungfernstieg e in piazza i ristoranti hanno prezzi alti: per un pasto vero cerca le birrerie vicino al Rathaus e alla Willy-Brandt-Straße.",C:"Ai Landungsbrücken i banchi del pesce sono economici, mentre i ristoranti in vista sul molo hanno prezzi molto alti."},
freeLong:"Qualche idea: una passeggiata sull'Elba da Övelgönne, una sosta in un caffè con una fetta di torta, un giro sulla Binnenalster o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè sul canale.",
remind:"Per il Miniatur Wunderland conviene prenotare l'orario d'ingresso online e per la Plaza dell'Elbphilharmonie il biglietto da 5 €. La domenica i negozi sono chiusi.",
rain1:"Al coperto: il Miniatur Wunderland, la Kunsthalle, l'interno del Michel, l'Elbphilharmonie (la Plaza è parzialmente coperta) e le birrerie.",
rainM:"Al coperto: Miniatur Wunderland, Kunsthalle, Michel (navata e cripta), Elbphilharmonie e birrerie.",
water:"Riempite la borraccia: l'acqua del rubinetto di Amburgo è ottima e si può chiedere in tutti i locali. Ci sono alcune fontanelle pubbliche: attivate «Acqua» sulla mappa.",
kitchen:"Ad Amburgo si pranza tra le 12 e le 14:30 e si cena dalle 18 alle 21: molte cucine tradizionali chiudono presto. I banchi di pesce e i caffè sono aperti tutto il giorno.",
night:[["🍺","Una birra in una birreria vicino al Michel o un bicchiere di vino al Ratsweinkeller: è un modo tipico di chiudere la giornata."],["🕙","Le cucine servono fino alle 21–22; la S-Bahn e la metro girano fino a tarda notte e il fine settimana tutta la notte (U-Bahn e S-Bahn), nei giorni feriali ci sono i bus notturni."],["☕","Molti caffè aprono alle 8–9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Amburgo ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per banchi di pesce, caffè e birrerie: una colazione sta intorno ai 9–13 € e una cena con un piatto principale intorno ai 16–25 €. Quasi ovunque si paga con la carta, ma in Germania alcuni locali e banchi accettano solo contanti: porta qualche euro.",
taxNote:"L'imposta di soggiorno di Amburgo (Kultur- und Tourismustaxe) si paga per persona e per notte, a scaglioni secondo il prezzo netto della camera: ad esempio 2,40 € a notte se la camera costa tra 50 e 100 € a persona e 3,60 € tra 100 e 150 € (tariffe 2025 aumentate del 20%; scaglioni inferiori e superiori da confermare). Spesso è già compresa nel prezzo dell'annuncio: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: almeno 4 stelle su Google, birrerie, banchi del pesce e caffè storici, niente catene. Colazione e cena restano sotto i 15–25 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["La S1 porta in circa 25 minuti alla Hauptbahnhof e prosegue per Jungfernstieg: è la via più rapida e senza cambi.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto della S-Bahn per l'aeroporto (4,10 €) e Tageskarte: si comprano alle macchinette o con l'app «hvv switch»",function(E){return true}],["wun","Biglietto per il Miniatur Wunderland con orario d'ingresso (da circa 22 €): prenota online",["wunder"]],["elb","Biglietto per la Plaza dell'Elbphilharmonie (5 €): prenota online l'orario",["elbphi"]],["mic","Biglietto per la torre del Michel (5 €)",["michel"]],["kun","Biglietto per la Hamburger Kunsthalle (circa 14 €); lunedì chiuso",["kunsthalle"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per i banchi del pesce"]],
NUM:{1:["ein","ain"],2:["zwei","zvai"],3:["drei","drai"],4:["vier","fir"],5:["fünf","fünf"],6:["sechs","zeks"],7:["sieben","ZI-ben"],8:["acht","acht"],9:["neun","noin"],10:["zehn","zen"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera (ad Amburgo si dice «Moin» a ogni ora)","Moin! / Guten Abend","moin / GU-ten A-bent"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Einen Tisch für "+(N===1?"eine Person":nu[0])+", bitte","AI-nen tish für "+(N===1?"AI-ne per-ZON":nu[1])+", BIT-te"],["Un caffè e un Franzbrötchen, per favore","Einen Kaffee und ein Franzbrötchen, bitte","AI-nen KA-fe unt ain FRANTS-brœt-chen, BIT-te"],["Un panino al pesce, per favore","Ein Fischbrötchen, bitte","ain FISH-brœt-chen, BIT-te"],["Acqua del rubinetto, per favore","Leitungswasser, bitte","LAI-tungs-vas-ser, BIT-te"],["Il conto, per favore","Zahlen, bitte","TSA-len, BIT-te"],["Posso pagare con la carta?","Kann ich mit Karte zahlen?","kan ich mit KAR-te TSA-len"],["Quanto costa?","Wie viel kostet das?","vi fil KOS-tet das"],["Dov'è la S-Bahn?","Wo ist die S-Bahn?","vo ist di ES-ban"],["Qual è la S-Bahn per l'aeroporto?","Welche S-Bahn fährt zum Flughafen?","VEL-che ES-ban fert tsum FLUG-ha-fen"]];
if(M)fr=fr.concat([["Ho una prenotazione","Ich habe eine Reservierung","ich HA-be AI-ne re-ser-VI-rung"],["Posso lasciare i bagagli?","Kann ich meine Koffer hier lassen?","kan ich MAI-ne KOF-fer hir LAS-sen"],["A che ora è il check-out?","Um wie viel Uhr ist das Check-out?","um vi fil ur ist das tsek-AUT"]]);
return fr.concat([["Mi scusi","Entschuldigung","ent-SHUL-di-gung"],["Grazie mille!","Vielen Dank!","FI-len dank"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Amburgo (Kultur- und Tourismustaxe): "+(typeof tx[2]==="number"&&tx[2]>0?"circa "+String(tx[2]).replace(".",",")+" € a notte per persona ("+tx[1].toLowerCase()+"), a scaglioni secondo il prezzo netto della camera":"non si paga se sei ospite di amici o parenti")+"; le cifre sono stime sulle tariffe 2025, da confermare. Spesso è già compresa nel prezzo che trovi sull'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["S-Bahn, U-Bahn, bus e traghetti del porto usano gli stessi biglietti HVV. La notte del fine settimana le linee S e U girano tutta la notte; nei giorni feriali ci sono i bus notturni."],
ZONES:[
["🚇 S-Bahn, U-Bahn e biglietti",["Un solo biglietto vale su S-Bahn, U-Bahn, bus e traghetti HVV: il singolo «Hamburg AB» costa 4,10 € (3,81 € online), la corsa breve 2,10 € e la Tageskarte circa 8,50–9 € (da confermare).","I biglietti cartacei vanno convalidati prima di salire; i controllori sono in borghese e la multa è alta: tieni il biglietto fino alla fine del viaggio.","L'aeroporto è in zona AB: il biglietto singolo da 4,10 € basta per la S1.","La barca di linea 62 dei Landungsbrücken attraversa il porto con un normale biglietto HVV: è un giro economico."]],
["🏛️ Centro: Rathaus, Michel e Nikolai",["Il Jungfernstieg è a pochi passi dal Rathaus; da lì il Michel è a 17 minuti a piedi.","Il Michel e il Mahnmal St. Nikolai sono vicini, e la Speicherstadt è a 8 minuti dal Nikolai.","In inverno la torre del Michel e la cripta hanno orari ridotti: controlla l'orario di chiusura."],["rathaus","michel","nikolai"]],
["🚢 Porto: Speicherstadt, Elbphilharmonie e Landungsbrücken",["Elbphilharmonie, Speicherstadt e Miniatur Wunderland sono vicini: si fanno a piedi nello stesso pomeriggio.","Per l'Elbphilharmonie, prenota online la Plaza con un orario: la sera al tramonto è la più richiesta.","Dai Landungsbrücken parte il giro del porto: da novembre a Pasqua le partenze sono meno frequenti."],["elbphi","speicher","wunder","landung"]],
["🍺 Birrerie e panini al pesce",["Ad Amburgo il pranzo veloce è un Fischbrötchen, il panino al pesce: costa 4–9 € ed è ottimo.","Le birrerie (come quelle della Willy-Brandt-Straße) fanno birra in casa e piatti abbondanti a prezzi medi.","Si paga al tavolo e si lascia il 5–10% di mancia, dicendo la cifra al cameriere."],["groeninger","albrecht","bruecke10"]],
["🌅 Un giorno fuori Amburgo",["Lübeck, la città anseatica con la Holstentor, è a circa 45 minuti di treno regionale.","Altona e Övelgönne, sul fiume, sono raggiungibili in S-Bahn e col traghetto."]]],
WTIPS:["L'acqua del rubinetto di Amburgo è ottima: puoi chiederla in ogni locale («Leitungswasser, bitte») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","L'acqua dei canali e dell'Elba non è potabile."],
GEN:["La Germania usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Amburgo ha lo stesso fuso orario dell'Italia.","Mancia: si arrotonda al tavolo (5–10%), dicendo la cifra al cameriere al momento di pagare, non lasciandola sul tavolo.","La domenica e nei festivi i negozi sono chiusi; sono aperti ristoranti, caffè, musei e le stazioni.","In Germania molti banchi e piccoli locali accettano solo contanti: porta qualche euro.","Il saluto tipico di Amburgo è «Moin», a ogni ora del giorno.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (ambulanza, vigili del fuoco) · <a class="call" href="tel:110">110</a> Polizia</li><li>🚇 Trasporti pubblici e oggetti smarriti: <a href="https://www.hvv.de/" target="_blank" rel="noopener">hvv.de</a> · S-Bahn: <a href="https://www.s-bahn-hamburg.de/" target="_blank" rel="noopener">s-bahn-hamburg.de</a> · treni: <a href="https://www.bahn.de/" target="_blank" rel="noopener">bahn.de</a>.</li><li>🇮🇹 Consolato Generale d\'Italia ad Amburgo: <a href="https://consamburgo.esteri.it" target="_blank" rel="noopener">consamburgo.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Il 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Amburgo. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.hvv.de/" target="_blank" rel="noopener">hvv.de</a>, <a href="https://www.s-bahn-hamburg.de/" target="_blank" rel="noopener">s-bahn-hamburg.de</a> e, per i treni, <a href="https://www.bahn.de/" target="_blank" rel="noopener">bahn.de</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V96 Q60 84 120 90 Q160 94 180 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M18 106 V56 H48 V106 Z M23 56 V40 H43 V56 Z M24 40 Q33 20 42 40 Z M32 22 V8 H34 V22 Z"/></g>'+
'<g style="--k:2"><path d="M68 106 V76 H152 V106 Z M68 76 Q84 38 104 62 Q124 30 152 76 Z"/></g>'+
'<g style="--k:3"><path d="M176 106 V68 H244 V106 Z M196 68 V42 H224 V68 Z M194 42 H226 L210 24 Z M209 24 V10 H211 V24 Z M180 68 V58 H190 V68 Z M230 68 V58 H240 V68 Z"/></g>'+
'<g style="--k:4"><path d="M262 106 V70 H280 V106 Z M265 70 L271 4 L277 70 Z"/></g>'+
'<g style="--k:5"><path d="M304 106 V48 H310 V106 Z M296 48 H372 V54 H296 Z M366 54 V80 H368 V54 Z M300 54 V70 H302 V54 Z M322 106 V90 H352 V106 Z M326 90 V82 H348 V90 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M72 90 h72 M72 96 h72 M72 101 h72"/><path d="M296 98 h96 M296 103 h96"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.amburgo);
