/* ===== Ginevra (dati verificati il 14 ottobre 2026; 1 CHF ≈ 1,07 €) ===== */
window.CITIES=window.CITIES||{};
CITIES.ginevra=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Ginevra (GVA) è l'unico scalo con voli diretti dall'Italia; Basilea e Lione sono troppo lontani */
var PAR={
GVA:{n:"Ginevra (GVA)",s:"Genève Aéroport (Cointrin)",url:"https://www.gva.ch/en",live:"Ginevra",inMin:30,buf:120,pos:[46.2381,6.1089],sd:"Aeroporto GVA · treno diretto",rt:"Dall'aeroporto: treno diretto fino alla stazione di Ginevra-Cornavin, circa 7 minuti.",
 arr:"La Svizzera fa parte dello spazio Schengen: dall'Italia si arriva senza controllo passaporti, ma non è nell'Unione europea, quindi la dogana per le merci resta. La stazione dei treni è dentro l'aeroporto, a pochi minuti a piedi dal terminal: segui i cartelli «Train». Dal binario partono treni diretti per la stazione di Ginevra-Cornavin, il centro della città, in circa 7 minuti e fino a 7 corse all'ora nelle ore di punta (dal sito dell'aeroporto). In tutto, dall'uscita dei bagagli al centro, ci vogliono circa 25–30 minuti. In alternativa il bus 10 porta in centro in circa 20 minuti, ma è più lento e di solito non serve.",
 tk:"Biglietto: al ritiro bagagli c'è una macchinetta che distribuisce un biglietto gratuito per i trasporti pubblici di Ginevra, valido 80 minuti e solo il giorno dell'arrivo, da portare con la carta d'imbarco (informazione da una scheda di servizio non recente: da confermare all'arrivo). Se non lo trovi, il biglietto da 1 ora per la zona 10 costa 3 CHF (circa 3,20 €) alle macchinette delle FFS o dei TPG, all'app SBB Mobile o ai bus. Se dormi in un alloggio registrato a Ginevra ricevi tre giorni prima dell'arrivo una Geneva Transport Card digitale, gratuita per tutta la durata del soggiorno, che copre anche il treno dall'aeroporto (dal sito di Genève Tourisme).",
 gm:"Gare de Genève-Aéroport",
 tips:["Il viaggio in treno è il più comodo: un taxi per il centro costa da circa 35 a 45 CHF (stima da una guida, da confermare) e non è molto più veloce.","Il biglietto da 1 ora per la zona 10 (3 CHF) vale per tutti i mezzi della città, con cambi illimitati: per il ritorno basta quello. Il biglietto giornaliero a 10 CHF conviene solo con più di tre corse.","Se hai la Geneva Transport Card dell'alloggio, mostrala sul telefono: con quella non servono biglietti, né dall'aeroporto né in città."]}
};
/* linee (tracciati indicativi) */
var SEG={
gva:{c:"#d52b1e",n:"Treno diretto dall'aeroporto",p:[[46.2318,6.1085,"Aeroporto",2],[46.2290,6.1210],[46.2105,6.1424,"Cornavin",2]]},
t15:{c:"#1a56a8",n:"Tram 15 per le Nazioni",p:[[46.2105,6.1424,"Cornavin",2],[46.2170,6.1405],[46.2257,6.1413,"Nations",2]]},
t18c:{c:"#2a8f3c",n:"Tram 18 per Carouge",p:[[46.2105,6.1424,"Cornavin",2],[46.2045,6.1430,"Bel-Air"],[46.1990,6.1405,"Plainpalais"],[46.1835,6.1415,"Carouge",2]]},
t18k:{c:"#2a8f3c",n:"Tram 18 per il CERN",p:[[46.2105,6.1424,"Cornavin",2],[46.2150,6.1270],[46.2185,6.1105,"Balexert"],[46.2290,6.0780],[46.2325,6.0552,"CERN",2]]}
};
var START=[46.2105,6.1424];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
vieille:{t:"Vieille-Ville e Bourg-de-Four",z:"A",p:1,min:60,id:90,max:130,pos:[46.2008,6.1473],q:"Place du Bourg-de-Four, Genève",cls:"walk",sun:1,
 d:"La città vecchia sulla collina della riva sinistra: la piazza del Bourg-de-Four con la sua fontana, la Grand-Rue dove nacque Jean-Jacques Rousseau, l'Hôtel de Ville con l'Arsenal e i suoi cannoni, e la Promenade de la Treille con la lunghissima panchina sotto gli alberi. Si cammina senza fretta tra vicoli e piazzette.",
 m:"Si cammina gratis, a qualsiasi ora. Le botteghe sono aperte da lunedì a sabato e la domenica quasi tutte chiuse (come in tutta la Svizzera); restano aperti i caffè e i ristoranti."},
cattedrale:{t:"Cattedrale di St-Pierre e le sue torri",z:"A",p:1,min:45,id:60,max:100,pos:[46.2012,6.1480],q:"Cathédrale Saint-Pierre, Genève",cls:"",sun:1,tk:[7.5,"Torri della cattedrale (7 CHF)",1,1],
 win:function(wd){return wd===6?[12*60,17*60]:[10*60,17*60]},
 d:"La grande cattedrale dove predicò Calvino, a due passi dal Bourg-de-Four: dentro si vedono la navata gotica e la «sedia di Calvino». Si può salire sulla torre nord (157 gradini) per un panorama a 360 gradi sulla città, sul lago e, col bel tempo, sul Monte Bianco. Sotto la chiesa c'è un importante sito archeologico.",
 m:"Orari da una guida (Routard), non dal sito ufficiale: da confermare. Da ottobre a maggio la cattedrale apre dal lunedì al sabato 10–17:30 e la domenica 12–17:30; le torri chiudono mezz'ora prima. La navata è gratis, la salita alle torri costa 7 CHF (circa 7,50 €). Il sito archeologico è a pagamento (prezzo e orari da controllare su site-archeologique.ch)."},
bastions:{t:"Parc des Bastions e Muro dei Riformatori",z:"A",p:2,min:30,id:45,max:70,pos:[46.2001,6.1467],q:"Mur des Réformateurs, Genève",cls:"walk",sun:1,
 d:"Il parco sotto le mura della città vecchia, con i grandi scacchi all'aperto e il Muro dei Riformatori, un fregio lungo cento metri con le statue di Farel, Calvino, Beza e Knox, i protagonisti della Riforma protestante. Davanti c'è la sede storica dell'Università.",
 m:"Il parco e il muro sono gratis e aperti a qualsiasi ora. I giganti degli scacchi si usano liberamente quando non c'è la neve."},
rade:{t:"Jet d'eau e lungolago",z:"B",p:1,min:60,id:90,max:150,pos:[46.2074,6.1556],q:"Jet d'eau, Genève",cls:"walk",sun:1,
 d:"Il simbolo di Ginevra: un getto d'acqua alto 140 metri che si alza dal lago. Si arriva a piedi lungo il lungolago, passando dal Pont du Mont-Blanc e dal Jardin Anglais, dove c'è il famoso orologio fiorito. Da qui partono anche i piccoli battelli (Mouettes genevoises) che attraversano la rada, inclusi nel biglietto dei trasporti.",
 m:"La passeggiata è gratuita. Il getto si ferma con vento forte o gelo e ogni autunno viene spento per cinque settimane circa per la manutenzione: nel 2025 è stato fermo dal 29 ottobre al 21 novembre; le date del 2026 non le ho trovate, quindi da confermare su sig-ge.ch prima di andare."},
paquis:{t:"Bains des Pâquis e il molo",z:"B",p:3,min:60,id:90,max:150,pos:[46.2121,6.1529],q:"Bains des Pâquis, Genève",cls:"walk",sun:1,
 d:"I bagni pubblici sul lago, amati dai ginevrini: un molo che si spinge nell'acqua con il faro, la vista su Jet d'eau e Mont Blanc, la buvette e, in inverno, sauna e hammam. In estate ci si tuffa dal molo, in autunno e in inverno si viene per la fonduta e per la passeggiata.",
 m:"Stagione invernale dal 20 settembre 2026 al 23 maggio 2027 (dal sito dei bagni): l'ingresso ai bagni costa 2 CHF; la zona benessere (sauna, hammam, bagno turco) è aperta lunedì 9–22:30, martedì–venerdì 9–21:30 (il martedì solo donne), sabato 9–22:30, domenica 8–22:30, e costa 22 CHF (15 CHF il lunedì). Se serva il biglietto d'ingresso anche per passeggiare sul molo: da confermare."},
mah:{t:"Musée d'art et d'histoire (MAH)",z:"A",p:3,min:90,id:120,max:180,pos:[46.2005,6.1573],q:"Musée d'art et d'histoire, Rue Charles-Galland 2, Genève",cls:"",sun:1,cl:[0],
 win:function(wd){return wd===3?[12*60,21*60]:[11*60,18*60]},
 d:"Il museo più grande della città, con arte, archeologia e arti applicate: dipinti di Hodler e di pittori svizzeri ed europei, armature, la famosa pala di Konrad Witz e collezioni dall'Egitto alla Svizzera moderna.",
 m:"Dal sito della Città di Ginevra: martedì–domenica 11–18, giovedì 12–21, lunedì chiuso. Le collezioni permanenti dovrebbero essere gratuite e le mostre temporanee a pagamento, ma l'informazione viene da una scheda del 2014: da confermare sul sito del museo. È in corso un progetto di ampliamento e restauro dell'edificio, senza date."},
patek:{t:"Patek Philippe Museum",z:"C",p:3,min:90,id:120,max:150,pos:[46.1976,6.1380],q:"Patek Philippe Museum, Rue des Vieux-Grenadiers 7, Genève",cls:"",sun:1,cl:[0],tk:[10.7,"Patek Philippe Museum (10 CHF)",1,1],
 win:function(wd){return wd===5?[10*60,18*60]:[14*60,18*60]},
 d:"Il museo dell'orologeria della casa Patek Philippe: cinque secoli di orologi da tasca e da polso, automi, smalti e pezzi unici, in un palazzo a Plainpalais. È il posto giusto per capire perché Ginevra è la capitale degli orologi.",
 m:"Dal sito del museo: martedì–venerdì e domenica 14–18, sabato 10–18, lunedì chiuso. Ingresso 10 CHF (circa 10,70 €). Il sito elenca alcune chiusure nei giorni festivi (per esempio il 25 dicembre): controlla le date prima di andare."},
croce:{t:"Museo internazionale della Croce Rossa",z:"D",p:3,min:90,id:120,max:150,pos:[46.2279,6.1410],q:"Musée international de la Croix-Rouge et du Croissant-Rouge, Genève",cls:"",sun:1,cl:[0],tk:[16.1,"Museo della Croce Rossa (15 CHF)",1,1],
 win:function(wd){return wd===3?[10*60,20*60]:[10*60,17*60]},
 d:"Il museo dedicato alla storia della Croce Rossa e della Mezzaluna Rossa, nato a Ginevra con Henry Dunant: con foto, oggetti e racconti di guerre e soccorsi, un percorso emozionante e di facile lettura. Si trova di fronte al Palazzo delle Nazioni.",
 m:"Orari da una scheda di museums.ch (il sito del museo indica fino alle 18): da confermare. Martedì–domenica 10–17, giovedì fino alle 20, lunedì chiuso; chiuso il 24, 25 e 31 dicembre e l'1 gennaio. Biglietto 15 CHF (circa 16,10 €), ridotto 10 CHF. Dal luglio 2026 il museo è in lavori per quasi due anni ma resta aperto: la nuova esposizione permanente apre per gradi (prima parte a ottobre 2026, sezione «futur» a dicembre 2026) e sarà completa l'8 maggio 2028."},
onu:{t:"Palais des Nations e la Broken Chair",z:"D",p:4,min:90,id:120,max:150,pos:[46.2262,6.1405],q:"Palais des Nations, Genève",cls:"",sun:0,cl:[5,6],tk:[26.8,"Visita guidata del Palais des Nations (25 CHF)",1,1],
 win:function(){return[10*60,16*60]},
 d:"La sede europea delle Nazioni Unite, in un grande parco: la visita guidata di circa un'ora porta nelle sale delle assemblee e dei consigli. Davanti, nella Place des Nations, c'è la Broken Chair, la gigantesca sedia con una gamba spezzata, simbolo contro le mine antiuomo, che si fotografa gratis a qualsiasi ora.",
 m:"La visita costa 25 CHF (circa 26,80 €) per gli adulti, 22 CHF per studenti e anziani, 14 CHF per i ragazzi di 14–17 anni; si prenota online sul sito dell'ONU di Ginevra. I biglietti per i singoli visitatori escono il 20 di ogni mese per il mese dopo e si esauriscono in fretta. Serve un documento valido (la carta d'identità europea va bene) e bisogna arrivare 30 minuti prima. Il palazzo è in ristrutturazione: il percorso può cambiare e l'accesso può chiudere con poco preavviso. Giorni e orari delle visite non sono indicati sulla pagina: ho messo i giorni feriali di mattina e pomeriggio, da confermare in fase di prenotazione."},
cern:{t:"CERN Science Gateway",z:"D",p:4,min:120,id:150,max:200,pos:[46.2333,6.0555],q:"CERN Science Gateway, Esplanade des Particules 1, Meyrin",cls:"",multi:1,sun:1,cl:[0],
 win:function(){return[9*60,17*60]},
 d:"Il centro visitatori del CERN, il laboratorio europeo di fisica delle particelle: mostre interattive sugli acceleratori, le particelle e l'universo, installazioni scientifiche e un caffè. L'ingresso è gratuito. Si arriva da Ginevra con il tram 18 fino al capolinea CERN.",
 m:"Dal sito del CERN: aperto da martedì a domenica, lunedì chiuso; mostre dalle 9 alle 17 (ultimo ingresso 16:30). Ingresso gratuito; le visite guidate dei laboratori si prenotano. Chiuso il 24, 25 e 31 dicembre e l'1 gennaio. Il viaggio in tram da Cornavin richiede circa 35 minuti (stima, da controllare su tpg.ch)."},
carouge:{t:"Carouge, il quartiere «italiano»",z:"C",p:4,min:90,id:120,max:180,pos:[46.1830,6.1410],q:"Place du Marché, Carouge",cls:"walk",multi:1,sun:1,
 d:"Una cittadina fondata dal re di Sardegna nel Settecento, oggi quartiere di Ginevra: strade dritte, case basse a colori caldi, piazze alberate, botteghe di artigiani e caffè. Ha un'aria sabauda e un po' italiana, molto diversa dal centro.",
 m:"Si cammina gratis. Il mercato in Place du Marché è il mercoledì e il sabato mattina, circa 8–13 (da una scheda del 2015: da confermare). Si raggiunge in circa 20 minuti con il tram 12 o 18."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
function PW(a,b,min,tab,tba,pts){var r=pts.slice().reverse();P2(a,b,min,"walk",tab,tba,{f:[W(pts)],r:[W(r)]})}
var LEGS={};
PW("start","paquis",15,"A piedi dalla stazione per la Rue des Pâquis fino ai bagni sul lago, circa 15 minuti.","A piedi dai bagni per la Rue des Pâquis fino alla stazione, circa 15 minuti.",[[46.2105,6.1424],[46.2113,6.1475],[46.2121,6.1529]]);
PW("start","rade",28,"A piedi per la Rue du Mont-Blanc, il ponte e il lungolago fino al Jet d'eau, circa 28 minuti.","A piedi dal Jet d'eau per il lungolago e la Rue du Mont-Blanc fino alla stazione, circa 28 minuti.",[[46.2105,6.1424],[46.2072,6.1475],[46.2058,6.1503],[46.2074,6.1556]]);
PW("start","vieille",25,"A piedi per la Rue du Mont-Blanc e il centro fino al Bourg-de-Four, circa 25 minuti; oppure tram 14 o 15 fino a Bel-Air e poi 10 minuti a piedi.","A piedi dal Bourg-de-Four per il centro e la Rue du Mont-Blanc fino alla stazione, circa 25 minuti.",[[46.2105,6.1424],[46.2072,6.1475],[46.2040,6.1450],[46.2008,6.1473]]);
PW("vieille","cattedrale",3,"A piedi dal Bourg-de-Four fino alla cattedrale, circa 3 minuti.","A piedi dalla cattedrale fino al Bourg-de-Four, circa 3 minuti.",[[46.2008,6.1473],[46.2010,6.1477],[46.2012,6.1480]]);
PW("cattedrale","bastions",7,"A piedi dalla cattedrale fino al Parc des Bastions e al Muro dei Riformatori, circa 7 minuti.","A piedi dal Parc des Bastions fino alla cattedrale, circa 7 minuti.",[[46.2012,6.1480],[46.2007,6.1472],[46.2001,6.1467]]);
PW("vieille","bastions",8,"A piedi dal Bourg-de-Four al Parc des Bastions, circa 8 minuti.","A piedi dal Parc des Bastions al Bourg-de-Four, circa 8 minuti.",[[46.2008,6.1473],[46.2005,6.1470],[46.2001,6.1467]]);
PW("bastions","mah",8,"A piedi dal Parc des Bastions fino al Musée d'art et d'histoire, circa 8 minuti.","A piedi dal museo fino al Parc des Bastions, circa 8 minuti.",[[46.2001,6.1467],[46.2003,6.1520],[46.2005,6.1573]]);
PW("vieille","mah",12,"A piedi dal Bourg-de-Four al Musée d'art et d'histoire, circa 12 minuti.","A piedi dal museo al Bourg-de-Four, circa 12 minuti.",[[46.2008,6.1473],[46.2007,6.1520],[46.2005,6.1573]]);
PW("vieille","rade",18,"A piedi dal Bourg-de-Four per Rue de la Cité e il lungolago fino al Jet d'eau, circa 18 minuti.","A piedi dal Jet d'eau per il lungolago fino al Bourg-de-Four, circa 18 minuti.",[[46.2008,6.1473],[46.2035,6.1500],[46.2058,6.1520],[46.2074,6.1556]]);
PW("mah","rade",17,"A piedi dal museo per Rue de Rive e il lungolago fino al Jet d'eau, circa 17 minuti.","A piedi dal Jet d'eau per il lungolago fino al museo, circa 17 minuti.",[[46.2005,6.1573],[46.2040,6.1560],[46.2074,6.1556]]);
PW("rade","paquis",20,"A piedi dal Jet d'eau per il lungolago e il Pont du Mont-Blanc fino ai Bains des Pâquis, circa 20 minuti.","A piedi dai Bains des Pâquis per il Pont du Mont-Blanc e il lungolago fino al Jet d'eau, circa 20 minuti.",[[46.2074,6.1556],[46.2058,6.1503],[46.2090,6.1510],[46.2121,6.1529]]);
PW("bastions","patek",14,"A piedi dal Parc des Bastions per Plainpalais fino al Patek Philippe Museum, circa 14 minuti.","A piedi dal Patek Philippe Museum per Plainpalais fino al Parc des Bastions, circa 14 minuti.",[[46.2001,6.1467],[46.1990,6.1420],[46.1976,6.1380]]);
PW("carouge","patek",15,"A piedi da Carouge fino al Patek Philippe Museum, circa 15 minuti.","A piedi dal Patek Philippe Museum fino a Carouge, circa 15 minuti.",[[46.1830,6.1410],[46.1900,6.1395],[46.1976,6.1380]]);
PW("onu","croce",7,"A piedi dal Palais des Nations per l'Avenue de la Paix fino al Museo della Croce Rossa, circa 7 minuti.","A piedi dal museo fino alla Place des Nations, circa 7 minuti.",[[46.2262,6.1405],[46.2270,6.1408],[46.2279,6.1410]]);
P2("start","onu",15,"metro","Tram 15 dalla stazione di Cornavin fino alla fermata Nations (circa 10 minuti), poi pochi minuti a piedi fino alla Place des Nations.","A piedi fino alla fermata Nations e tram 15 fino alla stazione di Cornavin, circa 15 minuti.",{f:[["t15","Cornavin","Nations"],W([[46.2257,6.1413],[46.2262,6.1405]])],r:[W([[46.2262,6.1405],[46.2257,6.1413]]),["t15","Nations","Cornavin"]]});
P2("start","croce",18,"metro","Tram 15 da Cornavin fino alla fermata Nations (circa 10 minuti), poi 7 minuti a piedi fino al Museo della Croce Rossa.","A piedi fino alla fermata Nations e tram 15 fino alla stazione di Cornavin, circa 18 minuti.",{f:[["t15","Cornavin","Nations"],W([[46.2257,6.1413],[46.2279,6.1410]])],r:[W([[46.2279,6.1410],[46.2257,6.1413]]),["t15","Nations","Cornavin"]]});
P2("start","cern",40,"metro","Tram 18 dalla stazione di Cornavin fino al capolinea CERN (circa 35 minuti, da controllare su tpg.ch), poi pochi passi a piedi fino al Science Gateway.","Dal Science Gateway a piedi fino al capolinea CERN e tram 18 fino a Cornavin, circa 40 minuti.",{f:[["t18k","Cornavin","CERN"]],r:[["t18k","CERN","Cornavin"]]});
P2("start","carouge",22,"metro","Tram 18 dalla stazione di Cornavin fino a Carouge (circa 20 minuti, da controllare su tpg.ch).","Tram 18 da Carouge fino alla stazione di Cornavin, circa 22 minuti.",{f:[["t18c","Cornavin","Carouge"]],r:[["t18c","Carouge","Cornavin"]]});
/* ritorno in aeroporto: treno diretto da Cornavin */
var RET={
GVA:{
 A:{min:35,txt:"Dal centro vai alla stazione di Ginevra-Cornavin (a piedi o in tram) e prendi il treno diretto per l'aeroporto, circa 7 minuti e più corse all'ora. Biglietto da 1 ora per la zona 10: 3 CHF (circa 3,20 €), da comprare alla macchinetta o con l'app SBB Mobile (gratis se hai la Geneva Transport Card dell'alloggio). Alla stazione dell'aeroporto segui i cartelli per le partenze: il check-in è a pochi minuti a piedi. In tutto conta 35 minuti.",g:[["gva","Cornavin","Aeroporto"]]}}
};
var ARR={
GVA:[["gva","Aeroporto","Cornavin"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari da guide e siti turistici (ottobre 2026), non dai siti dei locali; prezzi stimati: da confermare */
var V={
soleil:{n:"Café du Soleil",a:"Place du Petit-Saconnex 6",z:"D",r:"4,2",pos:[46.2193,6.1384],h:["07:00-14:30,17:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","10:00-23:00","10:00-23:00"],
 d:"Il caffè di quartiere più famoso per la fonduta, nel Petit-Saconnex, un po' fuori dal centro: un locale rustico dove si mangia la fonduta di formaggio moitié-moitié e si beve un bicchiere di vino bianco. Molto frequentato dai ginevrini, spesso pieno la sera.",pr:"Una fonduta costa di solito 28–35 CHF a persona (stima, listino non visto). Orari discordanti tra due fonti (Time Out e una guida alla fonduta): ho messo i più prudenti, da confermare. Conviene prenotare per la cena."},
cousine:{n:"Chez Ma Cousine (Bourg-de-Four)",a:"Place du Bourg-de-Four 6",z:"A",r:"4,2",pos:[46.2009,6.1475],h:["11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30","11:00-22:30"],
 d:"Il pollo arrosto con patate e insalata, in una grande sala semplice sulla piazza più antica della città vecchia: una cucina per tutti, veloce e abbondante, con le patatine al forno e la salsa della casa.",pr:"Il mezzo pollo con patate e insalata costa circa 18 CHF (circa 19 €); pasti completi 15–20 CHF (listino non visto, da una scheda del 2014 e da una guida più recente). Orari da una scheda del 2014: da confermare."},
armures:{n:"Restaurant Les Armures",a:"Rue du Puits-Saint-Pierre 1",z:"A",r:"4,0",pos:[46.2010,6.1487],h:D7("11:00-23:00"),
 d:"Un ristorante nel palazzo del Seicento accanto alla cattedrale, con le armature alle pareti: fonduta, raclette e piatti ginevrini serviti in un'atmosfera da taverna di montagna. È turistico, ma storico, e comodo dopo la visita a St-Pierre.",pr:"La fonduta parte da 26 CHF a persona (circa 28 €); un piatto principale costa di solito 25–40 CHF (listino non visto). Orari da Time Out, da confermare."},
buvette:{n:"Buvette des Bains des Pâquis",a:"Quai du Mont-Blanc 30",z:"B",r:"4,2",pos:[46.2121,6.1529],h:D7("08:00-22:30"),
 d:"Il ristorante dei Bains des Pâquis sul lago: piatto del giorno semplice e ottimo, caffè e dolci, e in inverno la fonduta moitié-moitié. Si mangia in sala o, col sole, fuori sul molo.",pr:"Il piatto del giorno costa circa 15 CHF (circa 16 €) e la fonduta d'inverno circa 25 CHF (circa 27 €), da una guida (listino non visto). Gli orari variano tra le guide (da 7 a 8 la mattina, fino alle 22:30 o alle 23): ho messo i più prudenti, da confermare."},
papon:{n:"Café Papon",a:"Rue Henri-Fazy 1",z:"A",r:"4,1",pos:[46.2025,6.1488],h:["07:00-00:00","07:00-00:00","07:00-00:00","07:00-00:00","07:00-00:00","09:30-00:00","09:30-00:00"],
 d:"Un caffè storico della città vecchia, con soffitti alti, specchi e tavolini di legno: colazione, caffè, qualcosa di salato a pranzo e aperitivo la sera. Un buon posto per fermarsi al riparo dal freddo.",pr:"I piatti principali costano 30–40 CHF, ma per un caffè con una fetta di torta o un panino si spende molto meno (listino non visto). Orari da Time Out: da confermare."},
beyrouth:{n:"Parfums de Beyrouth",a:"Rue de Berne 1",z:"B",r:"4,3",pos:[46.2108,6.1456],h:["11:00-00:00","11:00-00:00","11:00-00:00","11:00-00:00","11:00-00:00","11:00-00:00","11:00-00:00"],
 d:"Un locale libanese tra Cornavin e il lago: shawarma di carne con tanta salsa all'aglio (toum), falafel e panini veloci, buoni e a prezzo basso per Ginevra. Ideale per un pranzo rapido da mangiare in piedi o seduti.",pr:"Un panino o un piatto veloce costa di solito 10–18 CHF (stima da una guida, listino non visto). Dalla guida, il locale chiude alle 2 (venerdì e sabato alle 4); qui ho messo mezzanotte per prudenza, da confermare."},
fornello:{n:"Il Fornello Napoletano",a:"Rue de Fribourg 15",z:"B",r:"4,3",pos:[46.2095,6.1430],h:["12:00-14:00,19:00-23:00","12:00-14:00,19:00-23:00","12:00-14:00,19:00-23:00","12:00-14:00,19:00-23:00","12:00-14:00,19:00-23:00","12:00-14:00,19:00-23:00",""],
 d:"Una pizzeria napoletana con il forno a legna vicino a Cornavin, se dopo giorni di fonduta vi viene voglia di una margherita. Prenotare la sera.",pr:"Una pizza costa di solito 20–28 CHF (stima, listino non visto). Aperto da lunedì a sabato a pranzo e a cena, chiuso la domenica, da una guida online: da confermare."},
edelweiss:{n:"Hotel Edelweiss (Chalet Suisse)",a:"Place de la Navigation 2",z:"B",r:"4,0",pos:[46.2110,6.1478],h:["","18:00-23:00","18:00-23:00","18:00-23:00","18:00-23:00","18:00-23:00",""],
 d:"Il ristorante dell'hotel Edelweiss, arredato come uno chalet di montagna, vicino alla stazione: fonduta e raclette servite la sera, con atmosfera molto turistica ma allegra.",pr:"La fonduta costa di solito 30–40 CHF a persona (stima, listino non visto). Orari da una guida alla fonduta (martedì–sabato dalle 18 alle 23): da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["papon","buvette"],B:["buvette","papon"],C:["papon","buvette"],D:["soleil","buvette"]},
pra:{A:["cousine","armures","papon"],B:["beyrouth","buvette","fornello"],C:["cousine","papon"],D:["soleil","beyrouth"]},
cen:{A:["armures","cousine","papon"],B:["fornello","edelweiss","beyrouth"],C:["armures","soleil"],D:["soleil","edelweiss"]},
snk:{A:["papon","buvette"],B:["buvette","papon"],C:["papon","buvette"],D:["soleil","buvette"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"vieille",t:"Vieille-Ville, cattedrale e Bastions",acts:["vieille","cattedrale","bastions"],need:200,core:1},
{id:"lago",t:"Jet d'eau, lungolago e Pâquis",acts:["rade","paquis"],need:180,core:1},
{id:"musei",t:"Museo d'arte e storia e Patek Philippe",acts:["mah","patek"],need:220,core:1},
{id:"nazioni",t:"Palais des Nations e Croce Rossa",acts:["onu","croce"],need:240},
{id:"cern",t:"CERN Science Gateway",acts:["cern"],need:180},
{id:"carouge",t:"Carouge",acts:["carouge"],need:120}
];
var ORDER=["vieille","cattedrale","bastions","rade","paquis","mah","patek","croce","onu","cern","carouge"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["vil","Vieille-Ville e Rive",[46.2020,6.1480],"A"],
["paq","Pâquis e Cornavin (stazione)",[46.2110,6.1450],"B"],
["pla","Plainpalais e Carouge",[46.1950,6.1410],"C"],
["nat","Nazioni e Petit-Saconnex",[46.2230,6.1400],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[46.2044,6.1432],""]
];
/* imposta di soggiorno: 4,25 CHF per persona e per notte, tutte le categorie (ge.ch); 1 CHF = 1,073 € */
var TAX=[["h5","Hotel 4–5 stelle",4.56],["h3","Hotel fino a 3 stelle, B&B o appartamento",4.56],["host","Ostello o struttura economica",4.56],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Un café crème","il caffè con latte caldo, la colazione classica."],["Un croissant ou une tartine","un cornetto francese o pane con burro e marmellata."],["Une tresse au beurre","la treccia di pane al burro tipica della Svizzera."]],
pra:[["Le plat du jour","il piatto del giorno, di solito carne con contorno o pasta, a prezzo fisso."],["Un demi-poulet rôti","mezzo pollo arrosto con patate e insalata."],["Une assiette de fromage","un piatto di formaggi svizzeri con pane."],["Un sandwich","un panino al prosciutto o al formaggio, da una panetteria."]],
cen:[["Une fondue moitié-moitié","la fonduta di Vacherin e Gruyère, con pane: il piatto simbolo, per due o più persone."],["La longeole","la salsiccia ginevrina di maiale, spesso con lenticchie o patate."],["Les filets de perche","i filetti di pesce persico del lago, fritti con patate."],["Un gratin de cardons","i cardi gratinati, il piatto di Natale di Ginevra, nella stagione fredda."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Jet d'eau","Foto","Dal lungolago o dal Pont du Mont-Blanc, con il getto alto 140 metri; di sera è illuminato.",[46.2074,6.1556],"Jet d'eau, Genève","rade"],
["📷","L'orologio fiorito","Foto","L'orologio di fiori nel Jardin Anglais, uno dei simboli dell'orologeria di Ginevra.",[46.2058,6.1503],"Horloge fleurie, Jardin Anglais, Genève","rade"],
["📷","Le torri di St-Pierre","Foto","La cattedrale vista dalla Cour Saint-Pierre, con le tre torri sopra i tetti.",[46.2012,6.1480],"Cathédrale Saint-Pierre, Genève","cattedrale"],
["🤳","Il Muro dei Riformatori","Selfie","Farel, Calvino, Beza e Knox alti cinque metri nel Parc des Bastions.",[46.2001,6.1467],"Mur des Réformateurs, Genève","bastions"],
["📷","Bourg-de-Four","Foto","La fontana e le facciate colorate della piazza più antica della città.",[46.2008,6.1473],"Place du Bourg-de-Four, Genève","vieille"],
["📷","Il lago dal molo dei Pâquis","Foto","Il faro, il molo e, nelle giornate limpide, il Monte Bianco in fondo.",[46.2121,6.1529],"Bains des Pâquis, Genève","paquis"],
["🤳","La Broken Chair","Selfie","La sedia gigante con una gamba spezzata davanti al Palazzo delle Nazioni.",[46.2263,6.1409],"Broken Chair, Place des Nations, Genève","onu"],
["📷","Le bandiere delle Nazioni","Foto","Le bandiere degli Stati membri davanti al Palais des Nations.",[46.2262,6.1405],"Palais des Nations, Genève","onu"],
["📷","Il Science Gateway","Foto","L'edificio con i tubi di legno e la passerella sopra il parco del CERN.",[46.2333,6.0555],"CERN Science Gateway, Meyrin","cern"],
["📷","Place du Marché a Carouge","Foto","La piazza alberata con le facciate sabaude, soprattutto nei giorni di mercato.",[46.1830,6.1410],"Place du Marché, Carouge","carouge"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2026-12-10",t:"Jet d'eau: manutenzione annuale in autunno",x:"Ogni autunno il Jet d'eau viene spento per due-cinque settimane per la manutenzione: nel 2025 è stato fermo dal 29 ottobre al 21 novembre e nel 2024 per circa cinque settimane. Le date del 2026 non le ho trovate: se viaggi tra fine ottobre e fine novembre controlla su sig-ge.ch. Si ferma anche con vento forte o gelo."},
{from:"2026-10-14",to:"2028-05-08",t:"Museo della Croce Rossa: lavori, ma aperto",x:"Dal luglio 2026 il museo è in ristrutturazione per quasi due anni, ma resta aperto; la nuova esposizione permanente apre a tappe (una prima versione dell'ingresso a ottobre 2026, la sezione «futur» a dicembre 2026) e sarà completa l'8 maggio 2028. Alcune sale possono essere chiuse."},
{from:"2026-10-14",to:"2026-12-31",t:"Palais des Nations: posti limitati e lavori",x:"Il palazzo è in ristrutturazione: le visite continuano, ma il percorso può cambiare. I biglietti per i singoli visitatori escono il 20 di ogni mese per il mese dopo e finiscono presto: prenota appena puoi sul sito ufficiale (ungeneva.org)."},
{from:"2026-12-04",to:"2026-12-14",t:"Fête de l'Escalade (da confermare)",x:"La festa che ricorda il fallito assalto savoiardo del 1602 si tiene ogni anno intorno al 12 dicembre, con un corteo in costume e la corsa podistica per le strade della città vecchia. Le date del 2026 non sono state verificate: il centro è molto affollato e gli alberghi più cari."},
{from:"2026-12-20",to:"2027-01-03",t:"Natale e Capodanno: orari ridotti",x:"Il CERN Science Gateway e il Museo della Croce Rossa sono chiusi il 24, il 25 e il 31 dicembre e l'1 gennaio; dal 23 dicembre al 5 gennaio il CERN non fa visite guidate. In Svizzera i negozi sono chiusi la domenica e nei festivi."}
];
/* clima medio di Ginevra (indicativo, massime/minime) */
var CLIM=[[5,0],[7,0],[12,3],[16,6],[20,10],[24,13],[27,15],[26,15],[21,11],[15,7],[9,3],[5,1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Ginevra: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="mah"&&WD===3)meta+=" Oggi è giovedì: il museo apre più tardi (12) ma chiude alle 21.";
if(it.id==="cattedrale"&&WD===6)meta+=" Oggi è domenica: la cattedrale apre solo a mezzogiorno.";
if(it.id==="patek"&&WD===5)meta+=" Oggi è sabato: il museo apre alle 10, negli altri giorni alle 14.";
if(it.id==="croce"&&WD===3)meta+=" Oggi è giovedì: il museo resta aperto fino alle 20.";
if(it.id==="vieille"&&WD===6)meta+=" Oggi è domenica: le botteghe sono chiuse, restano aperti caffè e ristoranti.";
if(it.id==="carouge"&&(WD===2||WD===5))meta+=" Oggi c'è il mercato in Place du Marché, di solito fino all'una.";
return meta}
Object.assign(C,{id:"ginevra",n:"Ginevra",cn:"Svizzera",e:"⛲",flag:"🇨🇭",col:["#d52b1e","#1f3a6b","#e8e8e8"],k:"ginevra geneve geneva svizzera switzerland",
TZ:"Europe/Zurich",LL:[46.2044,6.1432],CC:"ch",QN:"Geneva",BK:"Geneva",ARE:/gen[eè]ve|geneva|ginevra|\b12\d\d\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"fr-CH",LANGN:"francese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"CHF",s:"CHF",e:1.073},hub:{n:"Gare de Cornavin",q:"Gare de Genève-Cornavin"},
SINGLE:{acts:["vieille","cattedrale","bastions","rade","paquis"],ins:[]},
EXCL:[],
DICON:{vieille:"🏘️",cattedrale:"⛪",bastions:"🌳",rade:"⛲",paquis:"🏊",mah:"🖼️",patek:"⌚",croce:"➕",onu:"🌍",cern:"⚛️",carouge:"🏡"},
ZN:{A:"nella Vieille-Ville",B:"ai Pâquis e a Cornavin",C:"a Plainpalais o a Carouge",D:"alle Nazioni"},
NEAR:{col:"caffè",pra:"locale",cen:"ristorante",snk:"caffè"},
SE:{soleil:"🧀",cousine:"🍗",armures:"🫕",buvette:"🍲",papon:"☕",beyrouth:"🌯",fornello:"🍕",edelweiss:"🫕"},
TR:{one:3.2,cap:10.7,lbl:"Tram, bus, treni e battelli (unireso)",
 air:{GVA:{one:1.6,n:"Treno per l'aeroporto (andata gratuita con il biglietto dell'arrivo, ritorno 3 CHF)"}},
 passes:[
 {n:"Biglietto giornaliero (zona 10, tutta la città)",d:1,max:1,p:10.7,note:"Il biglietto giornaliero unireso per la zona 10 costa 10 CHF (circa 10,70 €), vale fino alle 5 del giorno dopo e copre tram, bus, treni locali e battelli; copre anche l'aeroporto. Dalle 9 c'è una versione a 8 CHF (circa 8,60 €), per una persona. Il sabato e la domenica il biglietto da 10 CHF vale per due persone."}],
 note:"Prezzi unireso in vigore a ottobre 2026 (da una guida ai trasporti di Ginevra, da confermare su tpg.ch o unireso.com): biglietto da 1 ora nella zona 10 (tutta la città e l'aeroporto) 3 CHF (circa 3,20 €), con cambi illimitati; corsa breve (fino a tre fermate, entro 10 minuti) 2 CHF; biglietto giornaliero 10 CHF (circa 10,70 €). Chi dorme in un alloggio registrato a Ginevra riceve gratis una Geneva Transport Card digitale per tutto il soggiorno (autobus, tram, treni delle FFS e Mouettes nella rete unireso), anche per il viaggio dall'aeroporto: in questo caso non serve comprare biglietti. All'arrivo in aeroporto c'è inoltre un biglietto gratuito da 80 minuti alla macchinetta del ritiro bagagli (da confermare). Il biglietto va comprato prima di salire; i controllori passano a campione. Le macchinette accettano le carte; si può comprare anche con l'app SBB Mobile."},
FOOD:{co:[11,"Colazione al caffè"],pr:[18,"Pranzo (pollo, panino o piatto del giorno)"],ce:[33,"Cena (fonduta o piatto tipico)"],sp:[9,"Spuntini e dolci"]},
T:{doc:"Carta d'identità (valida per l'espatrio) o passaporto: la Svizzera è nello spazio Schengen ma non nell'UE",ride:"A piedi o in tram",move:"tutto a piedi o in tram",bags:"«Puis-je laisser mes valises ici ?»",bagsPM:"«Puis-je laisser mes valises ici jusqu'à cet après-midi ?»",bagsAM:"«Puis-je laisser mes valises ici jusqu'à midi ?»",
pra:"Un pollo arrosto, un panino o un piatto del giorno",praZ:{A:"Nella Vieille-Ville molti ristoranti con il menu fuori sono per turisti e costano tanto: per risparmiare cerca i locali per tutti, come il pollo arrosto di Chez Ma Cousine.",B:"Ai Pâquis e vicino alla stazione i prezzi sono più bassi che in centro: un panino libanese o una pizza sono le soluzioni più economiche."},
freeLong:"Qualche idea: una passeggiata sul lungolago fino ai Pâquis, una sosta in un caffè storico, un riposo all'alloggio, oppure la sauna e l'hammam dei Bains des Pâquis.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè con una cioccolata calda.",
remind:"In Svizzera si paga in franchi svizzeri (CHF), non in euro: il bancomat o la carta ti danno il cambio migliore. La domenica i negozi sono chiusi.",
rain1:"Al coperto: il Museo d'arte e storia, il Patek Philippe, il Museo della Croce Rossa, la cattedrale e i caffè storici.",
rainM:"Al coperto: Museo d'arte e storia, Patek Philippe, Museo della Croce Rossa, cattedrale, CERN Science Gateway e i caffè storici.",
water:"Riempite la borraccia: l'acqua del rubinetto di Ginevra arriva dal lago ed è ottima. In città ci sono molte fontane con acqua potabile: attivate «Acqua» sulla mappa.",
kitchen:"A Ginevra si pranza tra le 12 e le 14 e si cena presto, dalle 19: molti ristoranti tradizionali chiudono tra i due servizi, e le cucine spesso chiudono verso le 22.",
night:[["🫕","Una fonduta di formaggio con un bicchiere di vino bianco svizzero è il modo giusto di chiudere la giornata in autunno e in inverno."],["🕙","Le cucine servono fino alle 22–23; i tram finiscono verso mezzanotte e mezza, poi nel fine settimana ci sono linee notturne (orari da controllare su tpg.ch)."],["☕","Molti caffè aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Ginevra ha lo stesso fuso orario dell'Italia",
plug:"Adattatore svizzero (tipo J): le spine a due poli sottili entrano, quelle italiane a tre poli no",
foodNote:"I prezzi in Svizzera sono tra i più alti d'Europa: i pasti sono stime per locali popolari e medi. Una colazione sta intorno agli 11–15 € (12–16 CHF), un pranzo veloce intorno ai 15–20 €, una cena con la fonduta intorno ai 30–40 € (28–38 CHF). Gli importi in franchi sono convertiti a 1 CHF = 1,07 €. Il servizio è già compreso nel conto. Quasi ovunque si paga con la carta; qualche chiosco preferisce i contanti.",
taxNote:"A Ginevra l'imposta di soggiorno è di 4,25 CHF a persona e a notte (circa 4,60 €) in tutte le strutture, ostelli compresi (dal sito del Cantone di Ginevra); la pagina non indica esenzioni per i bambini, da confermare. Di solito la struttura la fa pagare a parte al check-in. In cambio ricevi una Geneva Transport Card gratuita per i mezzi pubblici.",
mcrit:"Criteri: locali veri e senza catene, della tradizione ginevrina e di cucina popolare. Gli orari vengono da guide e siti turistici (Time Out, Genève Tourisme), non dai siti dei locali, e alcuni risalgono a qualche anno fa: controllali prima di andare. I prezzi sono stime: a Ginevra cambiano spesso."},
fx:{meta:meta},
AIRTIPS:["Dopo l'atterraggio il roaming del telefono non è più incluso: la Svizzera non fa parte dell'Unione europea, quindi i dati e le chiamate possono costare. Controlla il tuo operatore o attiva un pacchetto prima di partire.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara, ma ci sono fontanelle gratuite oltre i controlli."],
CHECK:[["tk","Biglietto gratuito di arrivo alla macchinetta del ritiro bagagli (80 minuti, da confermare) oppure biglietto da 1 ora (3 CHF) alle macchinette o con l'app SBB Mobile",function(E){return true}],["tc","Se dormi in un alloggio registrato: Geneva Transport Card gratuita che ti arriva via email 3 giorni prima dell'arrivo",function(E){return true}],["doc2","Roaming: la Svizzera non è nell'UE, controlla il piano dati del tuo operatore (o usa una eSIM)"],["chf","Qualche franco svizzero in contanti o una carta senza commissioni: gli euro non sono accettati quasi ovunque e il resto si dà in franchi"],["onu","Prenotazione della visita al Palais des Nations (25 CHF, posti limitati) e documento d'identità valido",["onu"]],["pat","Biglietto per il Patek Philippe Museum (10 CHF)",["patek"]],["cro","Biglietto per il Museo della Croce Rossa (15 CHF)",["croce"]],["cat","Biglietto per le torri della cattedrale (7 CHF, in cassa)",["cattedrale"]],["card","Carta d'identità o passaporto in corso di validità"]],
NUM:{1:["un","an"],2:["deux","dö"],3:["trois","truà"],4:["quatre","càtr"],5:["cinq","sènc"],6:["six","sis"],7:["sept","sèt"],8:["huit","uìt"],9:["neuf","nöf"],10:["dix","dis"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Bonjour / Bonsoir","bon-ZHÜR / bon-SUÀR"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Une table pour "+(N===1?"une personne":nu[0])+", s'il vous plaît","ün TÀBL pur "+(N===1?"ün per-SONN":nu[1])+", sil vu PLÈ"],["Una fonduta e un bicchiere di vino bianco, per favore","Une fondue au fromage et un verre de vin blanc, s'il vous plaît","ün fon-DÜ o fro-MAZH e an vèr de van BLAN, sil vu PLÈ"],["Una caraffa d'acqua, per favore","Une carafe d'eau, s'il vous plaît","ün ca-RAF do, sil vu PLÈ"],["Il conto, per favore","L'addition, s'il vous plaît","la-di-SION, sil vu PLÈ"],["Posso pagare con la carta?","Puis-je payer par carte ?","püizh pe-IÈ par CART"],["Quanto costa?","Combien ça coûte ?","con-BIAN sa KUT"],["Dov'è la stazione?","Où est la gare ?","u è la GAR"],["Qual è il treno per l'aeroporto?","Quel train va à l'aéroport ?","kèl TRAN va a la-e-ro-POR"]];
if(M)fr=fr.concat([["Ho una prenotazione","J'ai une réservation","zhè ün re-zer-va-SION"],["Posso lasciare i bagagli?","Puis-je laisser mes valises ici ?","püizh lè-SÈ mè va-LIZ i-SI"],["A che ora è il check-out?","À quelle heure est le check-out ?","a kèl ÖR è le ceck-AUT"]]);
return fr.concat([["Mi scusi","Excusez-moi","ècs-kü-ZÈ-mua"],["Grazie mille!","Merci beaucoup !","mèr-SI bo-KU"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Ginevra: "+(tx[2]?"4,25 CHF (circa 4,60 €) a persona e a notte ("+tx[1].toLowerCase()+"), di solito pagata a parte alla struttura; in cambio ricevi la Geneva Transport Card gratuita":"non si paga se sei ospite di amici o parenti")+(tx[2]?". Dalla pagina del Cantone non risultano esenzioni per i bambini: da confermare.":".")},
STAYTIPS:["Il tram, il bus, il treno locale e i battelli si usano con lo stesso biglietto unireso. Se dormi in un alloggio registrato, chiedi la Geneva Transport Card gratuita: copre tutto per tutto il soggiorno. I tram finiscono verso mezzanotte e mezza; nel fine settimana ci sono linee notturne."],
ZONES:[
["🚋 Tram, treni e biglietti",["Un solo biglietto unireso vale su tram, bus, treni locali e battelli (Mouettes): la zona 10 comprende tutta la città e l'aeroporto, e costa 3 CHF per un'ora.","Chi dorme in un alloggio registrato riceve gratis la Geneva Transport Card digitale per tutto il soggiorno.","Il biglietto si compra prima di salire, alle macchinette o con l'app SBB Mobile: i controllori passano a campione.","Ginevra è piccola: il centro si gira a piedi; per le Nazioni, il CERN e Carouge serve il tram."]],
["⛪ Vieille-Ville e cattedrale",["La cattedrale di St-Pierre è a due passi dal Bourg-de-Four: la navata è gratis, le torri costano 7 CHF.","Il Muro dei Riformatori e il Parc des Bastions sono a pochi minuti: bella passeggiata gratuita.","La Grand-Rue ha la casa natale di Rousseau e l'Hôtel de Ville ha l'Arsenal con i cannoni.","La domenica le botteghe sono chiuse, ma i caffè sono aperti."],["vieille","cattedrale","bastions"]],
["⛲ Lago e Pâquis",["Il Jet d'eau è alto 140 metri e si vede da lontano; ogni autunno viene spento per qualche settimana per la manutenzione.","I battelli Mouettes attraversano la rada e sono inclusi nel biglietto unireso.","I Bains des Pâquis hanno il molo con il faro, la buvette e d'inverno la fonduta e il bagno turco."],["rade","paquis"]],
["🖼️ Musei",["Il Museo d'arte e storia è chiuso il lunedì e il giovedì apre fino alle 21.","Il Patek Philippe Museum è chiuso il lunedì, il sabato apre alle 10 e negli altri giorni alle 14.","Il Museo della Croce Rossa è chiuso il lunedì e in questo periodo ha lavori in corso."],["mah","patek","croce"]],
["🌍 Nazioni e CERN",["Il Palais des Nations si visita solo con la prenotazione online (25 CHF): i posti per i singoli visitatori finiscono presto.","La Broken Chair, davanti al palazzo, si fotografa gratis.","Il CERN Science Gateway è gratuito e si raggiunge con il tram 18 in circa 35 minuti."],["onu","croce","cern"]],
["🌅 Un giorno fuori Ginevra",["Losanna è a 35–40 minuti di treno da Cornavin, con il lungolago e la cattedrale (da confermare).","Annecy, in Francia, è raggiungibile in circa un'ora e mezza con bus e treno; serve il documento (da confermare).","Il Salève, la montagna di Ginevra, è in Francia: servono il documento e una gita di mezza giornata (da confermare)."]]],
WTIPS:["L'acqua del rubinetto di Ginevra è ottima e si beve ovunque: chiedila come «une carafe d'eau» (nei ristoranti di solito la carafe è gratis o costa poco).","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti negozi riempiono la borraccia se la chiedi gentilmente.","Le fontane dove c'è scritto «Eau non potable» non sono da bere."],
GEN:["La Svizzera fa parte dello spazio Schengen ma non dell'Unione europea: per entrare basta la carta d'identità valida per l'espatrio o il passaporto, ma la dogana per le merci c'è.","La moneta è il franco svizzero (CHF): 1 CHF vale circa 1,07 €. Quasi ovunque si paga con la carta; molti negozi accettano gli euro solo con un cambio sfavorevole e danno il resto in franchi.","Il servizio è compreso nel conto, ma si lascia volentieri un piccolo arrotondamento (5–10%) per un buon servizio.","La domenica e nei festivi quasi tutti i negozi sono chiusi; restano aperti i ristoranti, i musei e i negozi della stazione e dell'aeroporto.","Ginevra ha lo stesso fuso orario dell'Italia. Si parla francese: molti capiscono l'inglese e qualcuno l'italiano. Attenzione ai numeri: qui 70 si dice «septante» e 90 «nonante».","I prezzi sono tra i più alti d'Europa: un caffè costa circa 4–5 CHF e una cena 30–45 CHF.","Il roaming dell'UE non vale in Svizzera: controlla il piano dati del tuo operatore.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (numero unico europeo, risponde anche in italiano); <a class="call" href="tel:117">117</a> polizia, <a class="call" href="tel:144">144</a> ambulanza, <a class="call" href="tel:118">118</a> vigili del fuoco.</li><li>🚋 Trasporti pubblici: <a href="https://www.tpg.ch/" target="_blank" rel="noopener">tpg.ch</a> e <a href="https://www.unireso.com/" target="_blank" rel="noopener">unireso.com</a> · treni e oggetti smarriti: <a href="https://www.sbb.ch/" target="_blank" rel="noopener">sbb.ch</a>.</li><li>🇮🇹 Consolato generale d\'Italia a Ginevra: <a href="https://consginevra.esteri.it" target="_blank" rel="noopener">consginevra.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Ginevra o all\'aeroporto; in Svizzera sono rari e quasi sempre preannunciati, ma a Ginevra ci sono stati scioperi di tram e aeroporto negli anni scorsi. Nei giorni prima controllate <a href="https://www.tpg.ch/" target="_blank" rel="noopener">tpg.ch</a>, <a href="https://www.sbb.ch/" target="_blank" rel="noopener">sbb.ch</a> e <a href="https://www.gva.ch/en" target="_blank" rel="noopener">gva.ch</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V82 Q40 56 90 70 Q140 84 190 62 Q250 40 310 70 Q360 86 400 74 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 V78 H38 V106 Z M6 78 H42 L24 64 Z M44 106 V72 H62 V106 Z"/></g>'+
'<g style="--k:2"><path d="M84 106 V74 H136 V106 Z M84 74 V46 H96 V74 Z M82 46 H98 L90 32 Z M124 74 V46 H136 V74 Z M122 46 H138 L130 32 Z M102 74 V58 H118 V74 Z M101 58 H119 L110 14 Z"/></g>'+
'<g style="--k:3"><path d="M184 106 V98 H236 V106 Z M207 98 L210 18 L213 98 Z M210 18 Q196 22 190 44 L195 42 Q201 29 210 24 Z M210 18 Q224 22 230 44 L225 42 Q219 29 210 24 Z"/></g>'+
'<g style="--k:4"><path d="M262 14 H268 V58 H262 Z M262 14 H284 V20 H262 Z M262 54 H288 V60 H262 Z M264 60 H268 V106 H264 Z M284 60 H288 V92 L294 102 L290 105 L284 97 Z"/></g>'+
'<g style="--k:5"><path d="M312 106 V68 H334 V106 Z M310 68 H336 L323 54 Z M338 106 V80 H352 V106 Z"/></g>'+
'<g style="--k:6"><path d="M358 98 V70 L378 98 Z M382 98 V80 L392 98 Z M354 100 H396 L392 104 H358 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M104 82 v8 M116 82 v8 M90 54 v6 M130 54 v6"/><path d="M180 102 h60 M246 102 h20"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="30" cy="14" r="1.6"/><circle cx="100" cy="8" r="1.3"/><circle cx="160" cy="18" r="1.3"/><circle cx="236" cy="12" r="1.3"/><circle cx="310" cy="12" r="1.3"/><circle cx="388" cy="18" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.ginevra);
