/* ===== Madrid (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.madrid=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
var RV=function(a){return a.slice().reverse()};
var MO=function(d){return +d.slice(5,7)-1};
/* aeroporti: a Madrid arrivano i voli diretti dall'Italia solo a Barajas */
var PAR={
MAD:{n:"Madrid Barajas (MAD)",s:"Adolfo Suárez Madrid-Barajas",url:"https://www.aena.es/es/madrid-barajas.html",live:"Aena",inMin:85,buf:130,pos:[40.4719,-3.5626],sd:"Aeroporto MAD · bus Exprés Aeropuerto",rt:"Dall'aeroporto: autobus Exprés Aeropuerto fino alla stazione di Atocha, poi metro L1 fino a Sol.",
 arr:"Dall'Italia non c'è controllo passaporti (spazio Schengen), ma da agosto 2026 spesso sono in vigore controlli temporanei su chi arriva dall'Italia (vedi gli avvisi): tieni a portata di mano passaporto o carta d'identità elettronica e metti in conto un po' di coda. Dopo il ritiro bagagli segui i cartelli «Autobús»: l'Exprés Aeropuerto ferma davanti ai terminal T1, T2 e T4, funziona 24 ore su 24 e passa circa ogni 15–20 minuti. In 30–40 minuti arriva alla stazione di Atocha; da lì la metro L1 porta a Sol in circa 10 minuti. In tutto circa 55 minuti.",
 tk:"Biglietti: l'Exprés Aeropuerto costa 5 € a corsa (una guida indica 6 €: controlla su emtmadrid.es). La metro L8 (fino a Nuevos Ministerios, circa 12 minuti dalla T1-T2-T3 e meno di 20 dalla T4) ha un supplemento aeroporto di 3 € in entrata e in uscita, da aggiungere al biglietto singolo (1,50–2 €); secondo esMadrid dal 1° giugno 2026 ai tornelli si può usare anche la carta contactless (da confermare). Il taxi costa 33 € a tariffa fissa tra l'aeroporto e il centro, dentro la tangenziale M-30. Il biglietto turistico Zona A non vale sull'Exprés Aeropuerto.",
 gm:"Aeropuerto Adolfo Suárez Madrid-Barajas",
 tips:["Dalla T4 parte anche il treno Cercanías C-1 per Atocha e Chamartín (circa ogni 20 minuti): prezzo e orari da controllare su renfe.com.","Il taxi in centro costa 33 € fissi: se siete in tre o quattro conviene quanto il bus più la metro.","Di notte (dopo le 23:30) l'Exprés Aeropuerto parte da Cibeles invece che da Atocha: controlla su emtmadrid.es.","La T1 e la T4 sono lontane tra loro: la metro L8 ferma a T1-T2-T3 e alla T4, ma cambiare terminal richiede un altro biglietto, mentre il bus verde «Tránsito» è gratuito (da una guida, da confermare)."]}
};
/* linee (tracciati indicativi) */
var SEG={
ex:{c:"#e30613",n:"Autobus Exprés Aeropuerto",p:[[40.4719,-3.5626,"Aeroporto",2],[40.4215,-3.6745,"O'Donnell"],[40.4193,-3.6931,"Cibeles"],[40.4066,-3.6910,"Atocha",2]]},
l1:{c:"#2dbeef",n:"Metro L1 (azzurra)",p:[[40.4169,-3.7035,"Sol",2],[40.4126,-3.7040,"Tirso de Molina"],[40.4119,-3.6990,"Antón Martín"],[40.4066,-3.6910,"Atocha",2]]},
l3:{c:"#ffdf00",n:"Metro L3 (gialla)",p:[[40.4169,-3.7035,"Sol",2],[40.4198,-3.7058,"Callao"],[40.4234,-3.7123,"Plaza de España",2]]}
};
var START=[40.4169,-3.7035];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
sol:{t:"Puerta del Sol e Plaza Mayor",z:"A",p:1,min:50,id:70,max:110,pos:[40.4160,-3.7055],q:"Plaza Mayor, Madrid",cls:"walk",sun:1,
 d:"Il cuore di Madrid: la Puerta del Sol con il chilometro zero davanti alla Casa de Correos e la statua dell'orso e del corbezzolo, simbolo della città. A cinque minuti a piedi c'è la Plaza Mayor, la grande piazza porticata del Seicento.",
 m:"Si cammina gratis, a ogni ora. Nella calca di Sol e della metro attenzione ai borseggiatori. Alla Plaza Mayor tra fine novembre e il 31 dicembre c'è il mercatino di Natale (nel 2025 dal 27 novembre al 31 dicembre, 10–21; le date 2026 saranno annunciate in autunno)."},
palacio:{t:"Palazzo Reale",z:"A",p:1,min:90,id:120,max:180,pos:[40.4180,-3.7143],q:"Palacio Real de Madrid",cls:"",sun:1,tk:[18,"Palazzo Reale (18 €)",1,1],
 win:function(wd,d){var o=d.slice(5),c=(o>="04-01"&&o<="09-30")?19*60:18*60;if(wd===6)c=16*60;return[10*60,c]},
 d:"La residenza ufficiale dei re di Spagna, uno dei più grandi palazzi d'Europa: la Sala del Trono, la Sala da pranzo di gala, la Farmacia Reale e l'Armeria. Fuori ci sono la Plaza de Oriente e i Jardines de Sabatini, gratuiti.",
 m:"Biglietto 18 € (più 0,77 € di commissione online), ridotto 9 €. Da ottobre a marzo aperto lunedì–sabato 10–18 e domenica e festivi 10–16; la biglietteria chiude un'ora prima. Chiuso il 1° e il 6 gennaio, il 1° maggio e il 25 dicembre; il 24 e il 31 dicembre chiude alle 15. Può chiudere senza preavviso per cerimonie ufficiali. I cittadini UE entrano gratis dal lunedì al giovedì 16–18 (ottobre–marzo), ma la fila è lunga. Dati da una guida che cita il sito di Patrimonio Nacional, da confermare su patrimonionacional.es."},
almudena:{t:"Cattedrale dell'Almudena",z:"A",p:3,min:30,id:40,max:70,pos:[40.4156,-3.7140],q:"Catedral de la Almudena, Madrid",cls:"",sun:1,
 win:function(wd,d){var m=MO(d);return[10*60,(m===6||m===7)?21*60:20*60+30]},
 d:"La cattedrale di Madrid, di fronte al Palazzo Reale: neoclassica fuori, con un interno decorato a colori vivaci e un'abside moderna. Dal museo si sale alla cupola, con la vista sui tetti del Palazzo Reale e della città.",
 m:"L'ingresso alla cattedrale è gratuito (offerta suggerita 1 €), ogni giorno 10–20:30 (fino alle 21 in luglio e agosto), ma non si visita durante le funzioni. Museo e cupola costano 7 € e sono aperti solo da lunedì a sabato, 10–14:30. Dati da una guida, da confermare."},
prado:{t:"Museo del Prado",z:"B",p:1,min:120,id:150,max:210,pos:[40.4138,-3.6921],q:"Museo del Prado, Madrid",cls:"",sun:1,tk:[15,"Museo del Prado (15 €)",1,1],
 win:function(wd){return[10*60,wd===6?19*60:20*60]},
 d:"Uno dei più grandi musei d'arte al mondo: Velázquez con «Las Meninas», Goya con le Pitture nere, Bosch con il «Giardino delle delizie», e poi Tiziano, Rubens ed El Greco. Per una visita di due ore scegli poche sale e non tutto il museo.",
 m:"Biglietto 15 €, ridotto 7,50 € (over 65); sotto i 18 anni e studenti fino a 25 anni entrano gratis. Aperto lunedì–sabato 10–20, domenica e festivi 10–19. Collezione permanente gratuita lunedì–sabato 18–20 e domenica 17–19, con fila. Chiuso il 1° gennaio, il 1° maggio e il 25 dicembre; il 24 e il 31 dicembre 10–14. Dati da una guida verificata sul sito ufficiale il 13 settembre 2026: conferma su museodelprado.es."},
reina:{t:"Museo Reina Sofía e il Guernica",z:"C",p:2,min:100,id:120,max:180,pos:[40.4082,-3.6945],q:"Museo Reina Sofía, Madrid",cls:"",cl:[1],tk:[12,"Museo Reina Sofía (12 €)",1,1],
 win:function(wd){return wd===6?[10*60,14*60+30]:[10*60,21*60]},
 d:"Il museo d'arte del Novecento: nella sala 206 dell'edificio Sabatini c'è il «Guernica» di Picasso, circondato da studi e opere di altri maestri spagnoli come Dalí e Miró.",
 m:"Biglietto 12 €; gratis per under 18, over 65 e studenti. Aperto lunedì e mercoledì–sabato 10–21, domenica 10–14:30; chiuso il martedì. Ingresso gratuito (con biglietto gratuito da prenotare online) lunedì e mercoledì–sabato 19–21 e domenica 12:30–14:30. Chiuso anche il 1° e il 6 gennaio, il 1° e il 15 maggio, il 9 novembre, il 24, 25 e 31 dicembre. Dati da una guida verificata il 13 settembre 2026: conferma su museoreinasofia.es."},
thyssen:{t:"Museo Thyssen-Bornemisza",z:"B",p:3,min:90,id:110,max:160,pos:[40.4161,-3.6949],q:"Museo Thyssen-Bornemisza, Madrid",cls:"",sun:1,tk:[14,"Museo Thyssen-Bornemisza (14 €)",1,1],
 win:function(wd){return wd===0?[12*60,16*60]:wd===5?[10*60,23*60]:[10*60,19*60]},
 d:"Una collezione privata che attraversa sette secoli di pittura nel Palazzo di Villahermosa: dai primitivi italiani e fiamminghi all'Impressionismo e alle avanguardie del Novecento. È il museo più «facile» dei tre del Paseo del Prado.",
 m:"Biglietto 14 €, ridotto 10 €. Il lunedì (12–16) la collezione permanente è gratuita, senza biglietto. Martedì–venerdì e domenica 10–19; sabato 10–23, con le mostre temporanee gratuite dalle 21 alle 23. Chiuso il 1° gennaio, il 1° maggio e il 25 dicembre; il 24 e il 31 dicembre 10–15. Dati da una guida (14 settembre 2026), da confermare su museothyssen.org."},
retiro:{t:"Parco del Retiro",z:"B",p:2,min:90,id:120,max:180,pos:[40.4152,-3.6844],q:"Estanque Grande del Retiro, Madrid",cls:"walk",sun:1,
 win:function(wd,d){var o=d.slice(5);return[6*60,(o>="04-01"&&o<="09-30")?24*60:22*60]},
 d:"Il grande parco di Madrid, nato come giardino dei re: il laghetto con il monumento ad Alfonso XII e le barche a remi, i viali alberati e la Rosaleda. All'uscita c'è la Puerta de Alcalá, l'arco trionfale.",
 m:"Aperto ogni giorno dalle 6 alle 22 da ottobre a marzo (fino a mezzanotte da aprile a settembre), ingresso gratuito; con vento forte il Comune lo chiude. Il Palacio de Cristal è chiuso per lavori e coperto dall'opera «Fardo» fino al 1° gennaio 2027. Il Palacio de Velázquez, gratuito, è aperto 10–18 da ottobre a marzo. Barche sul laghetto 6–8 € per massimo 4 persone, 45 minuti (tariffa datata, da confermare)."},
debod:{t:"Tempio di Debod",z:"D",p:3,min:45,id:60,max:90,pos:[40.4240,-3.7177],q:"Templo de Debod, Madrid",cls:"walk",sun:1,
 d:"Un vero tempio egizio, donato alla Spagna dall'Egitto e rimontato pietra per pietra in un parco sopra il Palazzo Reale. Al tramonto, con il cielo che si riflette nelle vasche, è uno dei punti più belli della città.",
 m:"L'esterno è gratuito a ogni ora. L'interno (ingresso gratuito, 30 persone alla volta, al massimo mezz'ora) è aperto martedì–domenica e festivi 10–20, ultimo ingresso 19:30, dal 16 settembre al 14 giugno; chiuso il lunedì, il 1° e il 6 gennaio, il 1° maggio, il 24, 25 e 31 dicembre. Prenotare è gratuito e consigliato. Dati da una guida (settembre 2026)."},
granvia:{t:"Gran Vía e Plaza de España",z:"D",p:4,min:45,id:60,max:90,pos:[40.4202,-3.7054],q:"Gran Vía, Madrid",cls:"walk",sun:1,
 d:"Il grande viale dei teatri e dei palazzi del primo Novecento, tra Plaza de España e la Calle de Alcalá: l'Edificio Metrópolis con la cupola alata, i grattacieli «americani» e le insegne dei musical.",
 m:"Si cammina gratis, a ogni ora. Di sera è più bella con le luci. Il Círculo de Bellas Artes (Calle de Alcalá 42) ha una terrazza panoramica a pagamento: il prezzo non l'ho verificato. Qui i borseggiatori sono molti: zaino davanti."},
letras:{t:"Barrio de las Letras e Plaza de Santa Ana",z:"C",p:4,min:50,id:70,max:100,pos:[40.4143,-3.7008],q:"Plaza de Santa Ana, Madrid",cls:"walk",sun:1,
 d:"Il quartiere dei poeti e dei drammaturghi del Siglo de Oro, dove vissero Cervantes e Lope de Vega: sul selciato della Calle de las Huertas ci sono frasi scritte in lettere di bronzo. La Plaza de Santa Ana ha terrazze e il Teatro Español.",
 m:"Si passeggia gratis. Le terrazze della piazza costano di più delle vie interne; la sera il quartiere è pieno di bar."},
sanmiguel:{t:"Mercado de San Miguel",z:"A",p:5,min:40,id:60,max:90,pos:[40.4155,-3.7090],q:"Mercado de San Miguel, Madrid",cls:"",sun:0,
 win:function(){return[10*60,24*60]},
 d:"Il mercato coperto in ferro e vetro del 1916, accanto alla Plaza Mayor: banchi di tapas, jamón, ostriche, formaggi e dolci, da assaggiare in piedi con un bicchiere di vermut.",
 m:"Ingresso libero, si paga solo quello che si prende: circa 15–20 € a persona per due o tre assaggi e un bicchiere, con prezzi da zona turistica (da una guida). Aperto domenica–giovedì 10–24; venerdì, sabato e vigilie dei festivi 10–1. Meglio tra le 11 e le 13 o tra le 16 e le 19: a pranzo nel fine settimana e dopo le 21 è pienissimo."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
function WK(a,b,min,tab,tba,pts){P2(a,b,min,"walk",tab,tba,{f:[W(pts)],r:[W(RV(pts))]})}
var LEGS={};
WK("start","palacio",13,"A piedi da Sol per la Calle Mayor fino alla Plaza de Oriente e al Palazzo Reale, circa 13 minuti.","A piedi per la Calle Mayor fino alla Puerta del Sol, circa 13 minuti.",[[40.4169,-3.7035],[40.4160,-3.7055],[40.4155,-3.7090],[40.4165,-3.7120],[40.4180,-3.7143]]);
WK("sol","palacio",10,"A piedi dalla Plaza Mayor per la Calle Mayor fino al Palazzo Reale, circa 10 minuti.","A piedi per la Calle Mayor fino alla Plaza Mayor, circa 10 minuti.",[[40.4160,-3.7055],[40.4155,-3.7090],[40.4165,-3.7120],[40.4180,-3.7143]]);
WK("sanmiguel","palacio",7,"A piedi per la Calle Mayor fino al Palazzo Reale, circa 7 minuti.","A piedi per la Calle Mayor fino al Mercado de San Miguel, circa 7 minuti.",[[40.4155,-3.7090],[40.4165,-3.7120],[40.4180,-3.7143]]);
WK("palacio","almudena",4,"A piedi attraverso la Plaza de la Armería fino alla cattedrale, circa 4 minuti.","A piedi attraverso la Plaza de la Armería fino al Palazzo Reale, circa 4 minuti.",[[40.4180,-3.7143],[40.4168,-3.7141],[40.4156,-3.7140]]);
WK("palacio","debod",12,"A piedi per i Jardines de Sabatini e il Parque del Oeste fino al Tempio di Debod, circa 12 minuti.","A piedi per il Parque del Oeste e i Jardines de Sabatini fino al Palazzo Reale, circa 12 minuti.",[[40.4180,-3.7143],[40.4210,-3.7150],[40.4235,-3.7165],[40.4240,-3.7177]]);
WK("almudena","debod",14,"A piedi per la Plaza de Oriente e il Parque del Oeste fino al Tempio di Debod, circa 14 minuti.","A piedi per il Parque del Oeste fino alla cattedrale, circa 14 minuti.",[[40.4156,-3.7140],[40.4180,-3.7143],[40.4210,-3.7150],[40.4235,-3.7165],[40.4240,-3.7177]]);
WK("debod","granvia",17,"A piedi in discesa fino a Plaza de España e poi lungo la Gran Vía, circa 17 minuti.","A piedi lungo la Gran Vía fino a Plaza de España e su fino al Tempio di Debod, circa 17 minuti.",[[40.4240,-3.7177],[40.4234,-3.7123],[40.4217,-3.7090],[40.4202,-3.7054]]);
WK("start","granvia",6,"A piedi da Sol per la Calle Preciados fino alla Gran Vía, circa 6 minuti.","A piedi per la Calle Preciados fino a Puerta del Sol, circa 6 minuti.",[[40.4169,-3.7035],[40.4185,-3.7045],[40.4202,-3.7054]]);
WK("sol","granvia",8,"A piedi dalla Plaza Mayor per la Calle Preciados fino alla Gran Vía, circa 8 minuti.","A piedi per la Calle Preciados fino alla Plaza Mayor, circa 8 minuti.",[[40.4160,-3.7055],[40.4185,-3.7048],[40.4202,-3.7054]]);
WK("granvia","letras",12,"A piedi fino a Sol e poi verso la Plaza de Santa Ana, circa 12 minuti.","A piedi fino a Sol e poi per la Calle Preciados fino alla Gran Vía, circa 12 minuti.",[[40.4202,-3.7054],[40.4169,-3.7035],[40.4150,-3.7020],[40.4143,-3.7008]]);
WK("sol","letras",7,"A piedi dalla Plaza Mayor per la Calle del Príncipe fino alla Plaza de Santa Ana, circa 7 minuti.","A piedi per la Calle del Príncipe fino alla Plaza Mayor, circa 7 minuti.",[[40.4160,-3.7055],[40.4150,-3.7030],[40.4143,-3.7008]]);
WK("letras","thyssen",9,"A piedi verso est fino al Paseo del Prado e al museo Thyssen, circa 9 minuti.","A piedi verso ovest fino alla Plaza de Santa Ana, circa 9 minuti.",[[40.4143,-3.7008],[40.4150,-3.6980],[40.4161,-3.6949]]);
WK("letras","prado",11,"A piedi per la Calle de las Huertas e il Paseo del Prado fino al Museo del Prado, circa 11 minuti.","A piedi per la Calle de las Huertas fino alla Plaza de Santa Ana, circa 11 minuti.",[[40.4143,-3.7008],[40.4140,-3.6960],[40.4138,-3.6921]]);
WK("letras","reina",12,"A piedi verso sud-est fino al Museo Reina Sofía, circa 12 minuti.","A piedi verso nord-ovest fino alla Plaza de Santa Ana, circa 12 minuti.",[[40.4143,-3.7008],[40.4115,-3.6975],[40.4082,-3.6945]]);
WK("thyssen","prado",6,"A piedi lungo il Paseo del Prado fino al Museo del Prado, circa 6 minuti.","A piedi lungo il Paseo del Prado fino al museo Thyssen, circa 6 minuti.",[[40.4161,-3.6949],[40.4150,-3.6935],[40.4138,-3.6921]]);
WK("prado","reina",11,"A piedi lungo il Paseo del Prado e la Calle de Santa Isabel fino al Reina Sofía, circa 11 minuti.","A piedi lungo la Calle de Santa Isabel e il Paseo del Prado fino al Prado, circa 11 minuti.",[[40.4138,-3.6921],[40.4110,-3.6935],[40.4082,-3.6945]]);
WK("thyssen","reina",13,"A piedi lungo il Paseo del Prado fino al Reina Sofía, circa 13 minuti.","A piedi lungo il Paseo del Prado fino al museo Thyssen, circa 13 minuti.",[[40.4161,-3.6949],[40.4125,-3.6935],[40.4082,-3.6945]]);
WK("prado","retiro",12,"A piedi attraverso la Puerta de Felipe IV e il parco fino al laghetto del Retiro, circa 12 minuti.","A piedi dal laghetto del Retiro fino al Museo del Prado, circa 12 minuti.",[[40.4138,-3.6921],[40.4145,-3.6890],[40.4152,-3.6844]]);
WK("thyssen","retiro",14,"A piedi per il Paseo del Prado e dentro il parco fino al laghetto del Retiro, circa 14 minuti.","A piedi dal laghetto del Retiro fino al museo Thyssen, circa 14 minuti.",[[40.4161,-3.6949],[40.4155,-3.6890],[40.4152,-3.6844]]);
WK("reina","retiro",18,"A piedi verso nord-est fino all'ingresso del Retiro e al laghetto, circa 18 minuti.","A piedi dal laghetto del Retiro fino al Museo Reina Sofía, circa 18 minuti.",[[40.4082,-3.6945],[40.4095,-3.6900],[40.4120,-3.6870],[40.4152,-3.6844]]);
WK("start","thyssen",11,"A piedi da Sol per la Carrera de San Jerónimo fino al Paseo del Prado e al museo Thyssen, circa 11 minuti.","A piedi per la Carrera de San Jerónimo fino a Puerta del Sol, circa 11 minuti.",[[40.4169,-3.7035],[40.4165,-3.6990],[40.4161,-3.6949]]);
WK("start","prado",16,"A piedi da Sol per la Carrera de San Jerónimo e il Paseo del Prado fino al Museo del Prado, circa 16 minuti.","A piedi per il Paseo del Prado e la Carrera de San Jerónimo fino a Sol, circa 16 minuti.",[[40.4169,-3.7035],[40.4165,-3.6990],[40.4161,-3.6949],[40.4138,-3.6921]]);
WK("sol","prado",15,"A piedi dalla Plaza Mayor per la Carrera de San Jerónimo fino al Museo del Prado, circa 15 minuti.","A piedi per la Carrera de San Jerónimo fino alla Plaza Mayor, circa 15 minuti.",[[40.4160,-3.7055],[40.4165,-3.6990],[40.4161,-3.6949],[40.4138,-3.6921]]);
WK("start","retiro",25,"A piedi da Sol per la Calle de Alcalá fino a Cibeles e alla Puerta de Alcalá, poi nel parco fino al laghetto, circa 25 minuti.","A piedi dal laghetto del Retiro per la Puerta de Alcalá e la Calle de Alcalá fino a Sol, circa 25 minuti.",[[40.4169,-3.7035],[40.4180,-3.6980],[40.4193,-3.6931],[40.4200,-3.6888],[40.4152,-3.6844]]);
P2("granvia","prado",22,"walk","A piedi per la Calle de Alcalá fino a Cibeles e al Paseo del Prado, circa 22 minuti.","A piedi dal Museo del Prado per Cibeles e la Calle de Alcalá fino alla Gran Vía, circa 22 minuti.",{f:[W([[40.4202,-3.7054],[40.4187,-3.6976],[40.4193,-3.6931],[40.4138,-3.6921]])],r:[W([[40.4138,-3.6921],[40.4193,-3.6931],[40.4187,-3.6976],[40.4202,-3.7054]])]});
P2("start","reina",17,"metro","Metro L1 da Sol ad Atocha (circa 8 minuti), poi 6 minuti a piedi fino al Museo Reina Sofía.","A piedi fino alla fermata Atocha, metro L1 fino a Sol, circa 17 minuti.",{f:[["l1","Sol","Atocha"],W([[40.4066,-3.6910],[40.4082,-3.6945]])],r:[W([[40.4082,-3.6945],[40.4066,-3.6910]]),["l1","Atocha","Sol"]]});
P2("start","debod",18,"metro","Metro L3 da Sol a Plaza de España (circa 5 minuti), poi 8 minuti a piedi in salita fino al Tempio di Debod.","A piedi fino a Plaza de España, metro L3 fino a Sol, circa 18 minuti.",{f:[["l3","Sol","Plaza de España"],W([[40.4234,-3.7123],[40.4240,-3.7177]])],r:[W([[40.4240,-3.7177],[40.4234,-3.7123]]),["l3","Plaza de España","Sol"]]});
/* ritorno in aeroporto: metro L1 fino ad Atocha e bus Exprés Aeropuerto */
var RET={
MAD:{
 A:{min:65,txt:"Metro L1 da Sol ad Atocha (circa 10 minuti), poi l'autobus Exprés Aeropuerto dalla stazione di Atocha (circa 40 minuti, 5 €): funziona 24 ore su 24 e passa circa ogni 15–20 minuti; di notte parte da Cibeles. In alternativa la metro L8 da Nuevos Ministerios, con 3 € di supplemento aeroporto.",g:[["l1","Sol","Atocha"],["ex","Atocha","Aeroporto"]]}}
};
var ARR={
MAD:[["ex","Aeroporto","Atocha"],["l1","Atocha","Sol"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
sangines:{n:"Chocolatería San Ginés",a:"Pasadizo de San Ginés 5",z:"A",pos:[40.4172,-3.7068],h:["08:00-23:59","08:00-23:59","08:00-23:59","00:00-23:59","00:00-23:59","00:00-23:59","00:00-23:59"],
 d:"La cioccolateria più famosa di Madrid, in un vicolo vicino a Sol, aperta dal 1894: churros caldi da intingere in una tazza di cioccolato denso. Non si prenota, si paga la consumazione.",pr:"Churros con cioccolato sui 6–8 € a persona (prezzo non letto, i prezzi sono esposti nel locale). Orari da una guida, da confermare: aperto 24 ore da giovedì a domenica."},
mallorquina:{n:"Pastelería La Mallorquina",a:"Puerta del Sol 8",z:"A",pos:[40.4167,-3.7036],h:D7("08:30-21:15"),
 d:"La pasticceria storica sulla Puerta del Sol: napolitanas (sfogliati) di crema, cioccolato o prosciutto e formaggio, millefoglie, croissant e palmeras. Al piano di sopra c'è un caffè con vista sulla piazza.",pr:"Una napolitana con un caffè sta intorno ai 4–6 € (prezzo non letto). Orari da Time Out, da confermare."},
campana:{n:"Cervecería La Campana",a:"Calle de Botoneras 6",z:"A",pos:[40.4150,-3.7073],h:["","10:00-23:00","10:00-23:00","10:00-23:00","10:00-23:00","10:00-23:00","10:00-23:00"],
 d:"Il bar a due passi dalla Plaza Mayor dove si mangia il bocadillo de calamares, il panino con i calamari fritti: la specialità di Madrid. Si mangia in piedi al banco, spesso con una caña.",pr:"Il bocadillo costa circa 4,50 € e si paga solo in contanti (guida, settembre 2026). Una guida lo dà chiuso il lunedì, un'altra aperto tutti i giorni 10–23: orari da confermare."},
labra:{n:"Casa Labra",a:"Calle Tetuán 12",z:"A",pos:[40.4168,-3.7019],h:D7("11:30-15:30,18:30-22:30"),
 d:"Una taverna del 1860 vicino a Sol, dove nacque il Partito Socialista spagnolo: si viene per le tajadas de bacalao, il baccalà fritto in pastella, e per le croquetas. Si ordina al banco e si mangia in piedi.",pr:"Una tajada de bacalao e una croqueta sono pochi euro l'una (prezzi non letti, fascia economica). Orari da Time Out (2025), da confermare: chiuso il 1° gennaio."},
abuelo:{n:"La Casa del Abuelo",a:"Calle de la Victoria 12",z:"A",pos:[40.4167,-3.7007],h:D7("12:00-23:00"),
 d:"Una bodega aperta dal 1906 vicino alla Puerta del Sol, famosa per le gambas al ajillo (gamberi all'aglio) e le gambas a la plancha, da accompagnare con il vino dolce della casa.",pr:"Circa 16–30 € a persona (una guida). Orari da esMadrid, da confermare."},
revuelta:{n:"Casa Revuelta",a:"Calle de Latoneros 3",z:"A",pos:[40.4137,-3.7087],h:["","10:30-16:00,19:00-23:00","10:30-16:00,19:00-23:00","10:30-16:00,19:00-23:00","10:30-16:00,19:00-23:00","10:30-16:00,19:00-23:00","10:30-16:00"],
 d:"Una taverna storica tra la Plaza Mayor e La Latina: il piatto unico è il baccalà fritto (bacalao rebozado), da prendere al banco con una caña. Piccola e sempre piena.",pr:"Fascia economica (Time Out: 1 su 4), sui 8–12 € per un assaggio e una birra (stima, listino non letto). Orari da Time Out, da confermare: chiusa il lunedì."},
brillante:{n:"Bar El Brillante",a:"Plaza del Emperador Carlos V 8",z:"B",pos:[40.4062,-3.6918],h:["08:00-23:30","","08:00-23:30","08:00-23:30","08:00-23:30","08:00-23:30","08:00-23:30"],
 d:"Il bar davanti alla stazione di Atocha, in piedi o in terrazza: bocadillo de calamares, churros con cioccolato a colazione, patatas bravas e huevos rotos. È aperto dal mattino a sera.",pr:"Bocadillo de calamares da 3,50 € (mini) a 7 € (grande); in terrazza 1,50–2 € in più (Time Out). Una guida di settembre 2026 lo dà chiuso il martedì: orari da confermare."},
alberto:{n:"Casa Alberto",a:"Calle de las Huertas 18",z:"C",pos:[40.4141,-3.6998],h:["","12:00-16:00,20:00-23:59","12:00-16:00,20:00-23:59","12:00-16:00,20:00-23:59","12:00-16:00,20:00-23:59","12:00-16:00,20:00-23:59","12:00-16:00"],
 d:"La taverna del 1827 nel Barrio de las Letras, con il bancone di zinco e il vermut alla spina: la casa dei callos a la madrileña (trippa), del rabo estofado (coda di bue) e delle albóndigas.",pr:"Fascia media (Time Out: 2 su 4), circa 20–30 € a cena (stima, listino non letto). Orari da Time Out, da confermare: chiusa il lunedì; la domenica solo a pranzo."},
antonio:{n:"Taberna Antonio Sánchez",a:"Calle Mesón de Paredes 13",z:"C",pos:[40.4094,-3.7014],h:["","13:00-23:59","13:00-23:59","13:00-23:59","13:00-23:59","13:00-23:59","12:00-17:00"],
 d:"Una taverna del 1830 a Lavapiés, la più antica di Madrid ancora aperta: bancone di zinco, pareti con teste di toro e cucina tradizionale come il cocido madrileño, la tortillita de camarones e il torrezno.",pr:"Menú del día a 14 € con primo, secondo, dessert e bevanda (Time Out). Orari da Time Out, da confermare: chiusa il lunedì, la domenica solo a pranzo."},
comercial:{n:"Café Comercial",a:"Glorieta de Bilbao 7",z:"D",pos:[40.4276,-3.7022],h:["08:30-02:00","08:30-02:00","08:30-02:00","08:30-02:00","08:30-02:00","09:00-02:00","09:30-02:00"],
 d:"Il caffè più antico di Madrid ancora aperto, dal 1887: specchi, banco originale e tavolini di marmo. Per colazione, merenda o una cena leggera con croquetas, ensaladilla e patatas bravas.",pr:"Fascia media (Time Out: 2 su 4), un caffè con un dolce sui 6–8 € (stima, listino non letto). Orari da Time Out (recensione del 2019): da confermare."},
ardosa:{n:"Bodega La Ardosa",a:"Calle de Colón 13",z:"D",pos:[40.4258,-3.7005],h:["09:00-02:00","09:00-02:00","09:00-02:00","09:00-02:00","09:00-02:30","10:00-02:30","10:00-02:30"],
 d:"Una bodega di Malasaña con l'aria di una volta: il pincho de tortilla poco cotta al centro, le croquetas, i callos e il vermut alla spina. Piena nelle ore del vermut.",pr:"Fascia economica (Time Out: 1 su 4), un pincho di tortilla e una caña sui 5–7 € (stima, listino non letto). Orari da Time Out, da confermare."},
sanmiguel:{n:"Mercado de San Miguel",a:"Plaza de San Miguel",z:"A",pos:[40.4155,-3.7090],h:["10:00-23:59","10:00-23:59","10:00-23:59","10:00-23:59","10:00-01:00","10:00-01:00","10:00-23:59"],
 d:"Il mercato coperto del 1916 trasformato in mercato gastronomico: tanti banchi di tapas, jamón, ostriche e dolci, da assaggiare in piedi. È più caro e più turistico dei bar di quartiere.",pr:"Circa 15–20 € a persona per due o tre assaggi e un bicchiere (guida, settembre 2026). Orari dal sito del mercato via una guida."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["sangines","mallorquina"],B:["brillante","mallorquina"],C:["brillante","sangines"],D:["comercial","ardosa"]},
pra:{A:["campana","labra","revuelta"],B:["brillante","alberto","abuelo"],C:["antonio","alberto","brillante"],D:["abuelo","comercial","ardosa"]},
cen:{A:["labra","abuelo","antonio"],B:["alberto","abuelo","antonio"],C:["antonio","alberto","revuelta"],D:["comercial","ardosa","abuelo"]},
snk:{A:["mallorquina","sangines","sanmiguel"],B:["brillante","sangines"],C:["alberto","brillante"],D:["ardosa","comercial"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Puerta del Sol, Palazzo Reale e Almudena",acts:["sol","palacio","almudena"],need:240,core:1},
{id:"arte",t:"Prado e Thyssen",acts:["prado","thyssen"],need:230,core:1},
{id:"reina",t:"Reina Sofía e Retiro",acts:["reina","retiro"],need:230,core:1,cl:[1]},
{id:"gran",t:"Tempio di Debod e Gran Vía",acts:["debod","granvia"],need:130},
{id:"letras",t:"Barrio de las Letras e Mercado de San Miguel",acts:["letras","sanmiguel"],need:120}
];
var ORDER=["sol","sanmiguel","palacio","almudena","debod","granvia","letras","thyssen","prado","reina","retiro"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["sol","Sol, Plaza Mayor e La Latina",[40.4155,-3.7050],"A"],
["pra","Paseo del Prado, Retiro e Atocha",[40.4120,-3.6910],"B"],
["let","Barrio de las Letras e Lavapiés",[40.4120,-3.7010],"C"],
["mal","Gran Vía, Malasaña e Chueca",[40.4230,-3.7030],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[40.4169,-3.7035],""]
];
/* imposta di soggiorno: a Madrid non c'è */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Chocolate con churros","i churros caldi, bastoncini di pasta fritta, da intingere in una tazza di cioccolato denso."],["Napolitana","uno sfogliato ripieno di crema o cioccolato, con un caffè."],["Café con leche y tostada","caffellatte e pane tostato con olio e pomodoro."]],
pra:[["Bocadillo de calamares","il panino con i calamari fritti: la specialità di Madrid."],["Tortilla de patatas","la frittata di patate, anche a pincho (una fetta) su un pezzo di pane."],["Tajada de bacalao","baccalà fritto in pastella, da mangiare al banco."],["Menú del día","il menu fisso di mezzogiorno: primo, secondo, dessert e bevanda a prezzo unico."]],
cen:[["Cocido madrileño","il piatto simbolo: brodo con ceci, verdure e carni, di solito servito in due o tre portate."],["Callos a la madrileña","trippa in umido piccante, un classico delle taverne."],["Gambas al ajillo","gamberi in olio e aglio, da mangiare col pane."],["Huevos rotos","uova fritte sopra patate fritte e prosciutto."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il chilometro zero a Sol","Foto","La piastra sul marciapiede davanti alla Casa de Correos segna il punto da cui partono le strade di Spagna; l'orologio sopra fa da sfondo.",[40.4167,-3.7036],"Kilómetro Cero, Puerta del Sol, Madrid","sol"],
["🤳","L'orso e il corbezzolo","Selfie","La statua simbolo di Madrid, a pochi passi dall'ingresso di Calle del Carmen.",[40.4169,-3.7033],"Estatua del Oso y el Madroño, Madrid","sol"],
["📷","Plaza Mayor","Foto","I portici rossi e gli affreschi della Casa de la Panadería, meglio al mattino quando la piazza è vuota.",[40.4155,-3.7074],"Plaza Mayor, Madrid","sol"],
["📷","Il Palazzo Reale da Plaza de Oriente","Foto","La facciata bianca del Palazzo con i giardini e le statue dei re, vista dalla piazza davanti.",[40.4181,-3.7134],"Plaza de Oriente, Madrid","palacio"],
["📷","Jardines de Sabatini","Foto","Le siepi geometriche e il laghetto con il Palazzo Reale alle spalle: gratis e quasi sempre tranquilli.",[40.4200,-3.7144],"Jardines de Sabatini, Madrid","palacio"],
["📷","La Almudena e il Palazzo","Foto","La cupola della cattedrale accanto alla facciata del Palazzo, dalla Plaza de la Armería.",[40.4157,-3.7142],"Plaza de la Armería, Madrid","almudena"],
["📷","La statua di Velázquez","Foto","Il monumento al pittore davanti all'ingresso principale del Prado.",[40.4140,-3.6924],"Estatua de Velázquez, Museo del Prado, Madrid","prado"],
["📷","La fontana di Cibeles","Foto","La dea sul carro trainato dai leoni, con il Palazzo de Cibeles dietro, soprattutto di sera.",[40.4193,-3.6931],"Fuente de Cibeles, Madrid","prado"],
["📷","Il laghetto del Retiro","Foto","Il monumento ad Alfonso XII sopra il laghetto con le barche, alla luce del mattino o del tramonto.",[40.4152,-3.6844],"Estanque del Retiro, Madrid","retiro"],
["📷","La Puerta de Alcalá","Foto","L'arco trionfale al centro della piazza, illuminato di sera.",[40.4200,-3.6888],"Puerta de Alcalá, Madrid","retiro"],
["📷","Il tramonto a Debod","Foto","Il tempio con le vasche, nell'ora del tramonto: il cielo rosa si specchia nell'acqua.",[40.4240,-3.7177],"Templo de Debod, Madrid","debod"],
["📷","L'Edificio Metrópolis","Foto","La cupola con la Vittoria alata all'inizio della Gran Vía, all'incrocio con Calle de Alcalá.",[40.4187,-3.6976],"Edificio Metrópolis, Madrid","granvia"],
["🤳","Plaza de Santa Ana","Selfie","La piazza con le terrazze e la statua di Calderón, dietro la facciata del Teatro Español.",[40.4150,-3.7005],"Plaza de Santa Ana, Madrid","letras"],
["📷","Mercado de San Miguel","Foto","Le colonne in ferro e le vetrate del mercato, con i banchi illuminati.",[40.4155,-3.7090],"Mercado de San Miguel, Madrid","sanmiguel"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-12-31",fl:1,ap:["MAD"],t:"Controlli di frontiera per chi arriva dall'Italia",x:"Da agosto 2026 la Spagna ha introdotto controlli temporanei alla frontiera per chi arriva dall'Italia, anche negli aeroporti (Euronews, 8 agosto; le verifiche possono avvenire al check-in, al gate o all'arrivo). Non ho trovato una data di fine aggiornata: controlla viaggiaresicuri.it. Servono passaporto o carta d'identità valida per l'espatrio, in formato elettronico: dal 3 agosto 2026 le carte cartacee non valgono più. Non bastano patente, tessera sanitaria o copie sul telefono. Prevedi più margine in aeroporto, all'andata e al ritorno."},
{from:"2026-10-13",to:"2027-01-01",t:"Retiro: il Palacio de Cristal è chiuso per lavori",x:"Il Palacio de Cristal del Retiro è chiuso e coperto dall'opera «Fardo» fino al 1° gennaio 2027. Il parco e il Palacio de Velázquez (gratuito, 10–18 da ottobre a marzo) sono aperti."},
{from:"2026-10-13",to:"2027-03-31",t:"Palazzo Reale: orario invernale",x:"Da ottobre a marzo il Palazzo Reale è aperto lunedì–sabato 10–18 e domenica e festivi 10–16, con ultimo ingresso un'ora prima. Può chiudere senza preavviso per cerimonie ufficiali: controlla patrimonionacional.es il giorno prima."},
{from:"2026-11-09",to:"2026-11-09",t:"Il 9 novembre il Reina Sofía è chiuso",x:"Il 9 novembre, festa della Madonna dell'Almudena (patrona di Madrid), il Museo Reina Sofía è chiuso, secondo una guida (14 settembre 2026): controlla museoreinasofia.es."},
{from:"2026-11-20",to:"2027-01-06",t:"Natale a Madrid: luci e mercatino",x:"Le luci di Natale si accendono verso fine novembre (il Comune annuncia giorno e piazza a fine ottobre) e restano fino al 6 gennaio. Il mercatino della Plaza Mayor, nel 2025 dal 27 novembre al 31 dicembre, è molto affollato: le date 2026 sono da confermare."},
{from:"2026-12-24",to:"2027-01-06",t:"Natale e Capodanno: musei chiusi o a orario ridotto",x:"Il Prado e il Thyssen sono chiusi il 25 dicembre e il 1° gennaio; il Prado il 24 e il 31 dicembre chiude alle 14 e il Thyssen alle 15. Il Palazzo Reale è chiuso il 25 dicembre, il 1° e il 6 gennaio e il 24 e il 31 dicembre chiude alle 15. Il Reina Sofía è chiuso il 24, 25 e 31 dicembre e il 1° e 6 gennaio. Il Tempio di Debod è chiuso il 24, 25 e 31 dicembre e il 1° e 6 gennaio. Dati da guide, da confermare."}
];
/* clima medio di Madrid (indicativo, massime/minime) */
var CLIM=[[10,3],[13,4],[17,7],[19,9],[24,12],[30,17],[34,20],[33,19],[28,16],[21,11],[14,6],[10,3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Madrid: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="reina"&&WD===6)meta+=" Oggi è domenica: il Reina Sofía chiude alle 14:30 (ingresso gratuito dalle 12:30).";
if(it.id==="prado"&&WD===6)meta+=" Oggi è domenica: il Prado chiude alle 19 (ingresso gratuito dalle 17).";
if(it.id==="thyssen"&&WD===0)meta+=" Oggi è lunedì: il Thyssen è aperto solo dalle 12 alle 16 e la collezione è gratuita.";
if(it.id==="thyssen"&&WD===5)meta+=" Oggi è sabato: il Thyssen resta aperto fino alle 23.";
if(it.id==="debod"&&WD===0)meta+=" Oggi è lunedì: l'interno del tempio è chiuso, si vede solo da fuori.";
if(it.id==="palacio"&&WD===6)meta+=" Oggi è domenica: il Palazzo Reale chiude alle 16 e l'ultimo ingresso è alle 15.";
if(it.id==="almudena"&&WD===6)meta+=" Oggi è domenica: il museo e la cupola della cattedrale sono chiusi.";
return meta}
Object.assign(C,{id:"madrid",n:"Madrid",cn:"Spagna",e:"🐻",flag:"🇪🇸",col:["#aa151b","#f1bf00","#6b1f2a"],k:"madrid spagna spain",
TZ:"Europe/Madrid",LL:[40.4169,-3.7035],CC:"es",QN:"Madrid",BK:"Madrid",ARE:/madrid|\b28\d{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"es-ES",LANGN:"spagnolo",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Puerta del Sol",q:"Puerta del Sol, Madrid"},
SINGLE:{acts:["sol","palacio","granvia","prado","retiro"],ins:[]},
EXCL:[],
DICON:{palacio:"👑",almudena:"⛪",prado:"🖼️",reina:"🎨",thyssen:"🏛️",retiro:"🌳",debod:"🏺",granvia:"🎭",letras:"📚",sanmiguel:"🍷"},
ZN:{A:"a Sol e alla Plaza Mayor",B:"sul Paseo del Prado",C:"nel Barrio de las Letras e a Lavapiés",D:"sulla Gran Vía e a Malasaña"},
NEAR:{col:"bar o pasticceria",pra:"bar de tapas",cen:"taberna",snk:"pasticceria o bar"},
SE:{sangines:"🍫",mallorquina:"🥐",campana:"🦑",labra:"🐟",abuelo:"🍤",revuelta:"🐟",brillante:"🥖",alberto:"🍷",antonio:"🍲",comercial:"☕",ardosa:"🍺",sanmiguel:"🍷"},
TR:{one:1.5,cap:10.3,lbl:"Metro e bus EMT",
 air:{MAD:{one:5,n:"Autobus Exprés Aeropuerto (5 €)"}},
 passes:[
 {n:"Abono Turístico 1 giorno (Zona A)",d:1,max:1,p:10.3,note:"L'Abono Turístico Zona A (10,30 € per 1 giorno) vale su metro, bus EMT (tranne l'Exprés Aeropuerto), Cercanías nelle zone 0 e A e metro leggero ML1. Si carica sulla Tarjeta Multi, che è gratuita se la compri insieme al biglietto turistico."},
 {n:"Abono Turístico 2 giorni (Zona A)",d:2,max:2,p:17.5,note:"L'Abono Turístico Zona A da 2 giorni (17,50 €) vale per giorni di calendario, dal primo uso, su metro, bus EMT (tranne l'Exprés Aeropuerto) e Cercanías nelle zone 0 e A."},
 {n:"Abono Turístico 3 giorni (Zona A)",d:3,max:3,p:23.1,note:"L'Abono Turístico Zona A da 3 giorni (23,10 €) vale per giorni di calendario, dal primo uso, su metro, bus EMT (tranne l'Exprés Aeropuerto) e Cercanías nelle zone 0 e A."},
 {n:"Abono Turístico 4 giorni (Zona A)",d:4,max:4,p:27.8,note:"L'Abono Turístico Zona A da 4 giorni (27,80 €) vale per giorni di calendario, dal primo uso, su metro, bus EMT (tranne l'Exprés Aeropuerto) e Cercanías nelle zone 0 e A."},
 {n:"Abono Turístico 5 giorni (Zona A)",d:5,max:5,p:33.4,note:"L'Abono Turístico Zona A da 5 giorni (33,40 €) vale per giorni di calendario, dal primo uso, su metro, bus EMT (tranne l'Exprés Aeropuerto) e Cercanías nelle zone 0 e A."},
 {n:"Abono Turístico 7 giorni (Zona A)",d:7,p:43.2,only:function(T){return T.n>=6},note:"L'Abono Turístico Zona A da 7 giorni (43,20 €) vale per giorni di calendario, dal primo uso, su metro, bus EMT (tranne l'Exprés Aeropuerto) e Cercanías nelle zone 0 e A."}],
 note:"Prezzi 2026 (redtransporte.com ed esMadrid): biglietto singolo di metro 1,50 € fino a 5 fermate e fino a 2 € per i tratti più lunghi; 10 viaggi 7,30 €; Tarjeta Multi 2,50 € (non rimborsabile). Abono Turístico Zona A: 1 giorno 10,30 €, 2 giorni 17,50 €, 3 giorni 23,10 €, 4 giorni 27,80 €, 5 giorni 33,40 €, 7 giorni 43,20 €. La Zona A vale solo nel comune di Madrid; la Zona T arriva anche a Toledo e Guadalajara. L'aeroporto ha un supplemento di 3 € in metro; il bus Exprés Aeropuerto costa 5 € e non è compreso. In città quasi tutto si fa a piedi: spesso non serve un abbonamento."},
FOOD:{co:[5,"Colazione al bar (churros o napolitana e caffè)"],pr:[12,"Pranzo (bocadillo, tapas o menú del día)"],ce:[20,"Cena (tapas e raciones o cocido)"],sp:[5,"Spuntini e vermut"]},
T:{doc:"Passaporto o carta d'identità elettronica (le carte cartacee non valgono più per l'espatrio dal 3 agosto 2026)",ride:"In metro o in bus",move:"tutto a piedi o in metro",bags:"«¿Puedo dejar las maletas aquí?»",bagsPM:"«¿Puedo dejar las maletas hasta esta tarde?»",bagsAM:"«¿Puedo dejar las maletas hasta mediodía?»",
pra:"Un bar de tapas",praZ:{A:"Intorno a Sol e alla Plaza Mayor molti ristoranti con il menu esposto in piazza sono per turisti e costano di più: per un pasto vero scendi verso La Latina (Calle de la Cava Baja) o cerca i banconi dei bar nelle vie laterali.",D:"Sulla Gran Vía i locali più in vista sono cari: a pochi isolati, verso Malasaña, i bar di quartiere costano meno."},
freeLong:"Qualche idea: una passeggiata nel Retiro, i Jardines de Sabatini, un vermut in una taverna di La Latina o del Barrio de las Letras, il Tempio di Debod al tramonto, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata nel Retiro o prendi un vermut in una taverna.",
remind:"Per il Prado, il Reina Sofía e il Palazzo Reale conviene comprare il biglietto online: eviti la fila alla cassa. Il Reina Sofía il martedì è chiuso.",
rain1:"Al coperto: il Prado, il Palazzo Reale, il Reina Sofía, il Thyssen e il Mercado de San Miguel.",
rainM:"Al coperto: Prado, Palazzo Reale, Reina Sofía, Thyssen, cattedrale dell'Almudena e Mercado de San Miguel.",
water:"Riempite la borraccia: l'acqua del rubinetto di Madrid arriva dalla Sierra de Guadarrama ed è buona da bere. Attivate «Acqua» sulla mappa per vedere le fontanelle pubbliche vicine al percorso.",
kitchen:"A Madrid si pranza tra le 13:30 e le 16 e si cena dalle 21: molti ristoranti tradizionali chiudono tra i due servizi, mentre i bar di tapas restano aperti. Guarda l'orario accanto a ogni locale.",
night:[["🍷","Per un vermut o una caña dopo cena restate nelle vie del vostro quartiere: tra Huertas, La Latina e Malasaña ci sono tanti bar, e nelle piazze più famose i prezzi salgono."],["🕙","A Madrid si cena tardi: molte cucine aprono alle 20–21 e si riempiono dopo le 21:30. La metro di solito chiude verso l'1:30 (da confermare su metromadrid.es); dopo ci sono i bus notturni."],["🥐","Le pasticcerie aprono verso le 8:30: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è buona)",
fuso:"Italia e Spagna hanno lo stesso fuso orario",
foodNote:"I pasti sono stime per bar e taverne: una colazione sta intorno ai 5 €, un bocadillo o un menú del día intorno ai 12–14 € e una cena di tapas e raciones intorno ai 20 €. Si paga con la carta quasi ovunque; alcuni bar storici (La Campana) accettano solo contanti.",
taxNote:"A Madrid non c'è tassa di soggiorno: il prezzo dell'alloggio è quello che paghi. (Verificato a maggio 2026 da una guida; il Comune e la Comunità di Madrid hanno rifiutato di introdurla.)",
mcrit:"Criteri: bar, taverne storiche e pasticcerie conosciute, niente catene, prezzi popolari o medi. Orari e prezzi sono quelli di guide e schede online (Time Out, esMadrid, guide del 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il bus Exprés Aeropuerto passa circa ogni 15–20 minuti: se hai poco margine, la metro L8 (circa 12 minuti da Nuevos Ministerios alla T1-T2-T3) è più rapida, ma costa 3 € di supplemento.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Metro e bus: una Tarjeta Multi (2,50 €) dalle macchinette della metro, e il biglietto 10 viaggi (7,30 €) o l'Abono Turístico",function(E){return true}],["pra","Biglietto per il Prado (15 €): online evita la fila",["prado"]],["rei","Biglietto per il Reina Sofía (12 €), gratuito la sera ma da prenotare",["reina"]],["pal","Biglietto per il Palazzo Reale (18 €): online",["palacio"]],["thy","Biglietto per il Thyssen (14 €)",["thyssen"]],["deb","Prenotazione gratuita per l'interno del Tempio di Debod",["debod"]],["card","Passaporto o carta d'identità elettronica: le carte cartacee non valgono più per l'espatrio"],["cash","Qualche euro in contanti per i bar storici (La Campana accetta solo contanti)"]],
NUM:{1:["una persona","U-na per-SO-na"],2:["dos","DOS"],3:["tres","TRES"],4:["cuatro","KUA-tro"],5:["cinco","THIN-ko"],6:["seis","SEIS"],7:["siete","SIE-te"],8:["ocho","O-cio"],9:["nueve","NUE-be"],10:["diez","DIETH"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Buenos días / Buenas tardes","BUE-nos DI-as / BUE-nas TAR-des"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Una mesa para "+nu[0]+", por favor","U-na ME-sa PA-ra "+nu[1]+", por fa-BOR"],["Una caña e una porzione di croquetas, per favore","Una caña y una ración de croquetas, por favor","U-na CA-nia i U-na ra-THION de kro-KE-tas, por fa-BOR"],["Un cioccolato con churros, per favore","Un chocolate con churros, por favor","un cio-ko-LA-te kon CIU-rros, por fa-BOR"],["Acqua del rubinetto, per favore","Agua del grifo, por favor","A-gua del GRI-fo, por fa-BOR"],["Il conto, per favore","La cuenta, por favor","la KUEN-ta, por fa-BOR"],["Posso pagare con la carta?","¿Puedo pagar con tarjeta?","PUE-do pa-GAR kon tar-HE-ta"],["Quanto costa?","¿Cuánto cuesta?","KUAN-to KUES-ta"],["Dov'è la metro?","¿Dónde está el metro?","DON-de es-TA el ME-tro"],["Dov'è la fermata del bus per l'aeroporto?","¿Dónde está la parada del autobús al aeropuerto?","DON-de es-TA la pa-RA-da del au-to-BUS al a-e-ro-PUER-to"]];
if(M)fr=fr.concat([["Ho una prenotazione","Tengo una reserva","TEN-go U-na re-SER-ba"],["Posso lasciare i bagagli?","¿Puedo dejar las maletas aquí?","PUE-do de-HAR las ma-LE-tas a-KI"],["A che ora è il check-out?","¿A qué hora es el check-out?","a KE O-ra es el cek-AUT"]]);
return fr.concat([["Mi scusi","Perdone","per-DO-ne"],["Grazie mille!","¡Muchas gracias!","MU-cias GRA-thias"]])},
taxTxt:function(tx){return "A Madrid non c'è tassa di soggiorno"+(tx[2]?"":" (e comunque non si pagherebbe se sei ospite di amici o parenti)")+": il prezzo che trovi sull'annuncio è quello che paghi, a meno che la struttura non aggiunga altri costi."},
STAYTIPS:["La metro e i bus EMT si usano con la Tarjeta Multi. La metro chiude di solito verso l'1:30: dopo ci sono i bus notturni (da confermare su emtmadrid.es)."],
ZONES:[
["🚇 Metro, bus e biglietti",["Il biglietto singolo di metro costa 1,50 € fino a 5 fermate e fino a 2 € per i tratti più lunghi; i 10 viaggi costano 7,30 €. Serve la Tarjeta Multi (2,50 €), che si compra alle macchinette della metro.","L'Abono Turístico Zona A copre metro, bus EMT (non l'Exprés Aeropuerto) e Cercanías nel comune: 1 giorno 10,30 €, 3 giorni 23,10 €, 7 giorni 43,20 €. In centro molte tappe distano 10–15 minuti a piedi: spesso non conviene.","Dagli aeroporti c'è un supplemento di 3 € sul biglietto di metro, in entrata e in uscita dalle stazioni dell'aeroporto.","Secondo esMadrid dal 1° giugno 2026 ai tornelli della metro si può usare anche una carta contactless: da confermare."]],
["👑 Sol, Plaza Mayor e Palazzo Reale",["Da Sol alla Plaza Mayor sono 5 minuti a piedi; dalla Plaza Mayor al Palazzo Reale altri 10, per la Calle Mayor.","Il Palazzo Reale può chiudere per cerimonie ufficiali: controlla il sito la sera prima.","Accanto al Palazzo ci sono i Jardines de Sabatini, gratuiti, e la cattedrale dell'Almudena."],["sol","palacio","almudena"]],
["🖼️ Paseo del Arte: Prado, Thyssen e Reina Sofía",["I tre musei sono a pochi minuti l'uno dall'altro lungo il Paseo del Prado: 6 minuti tra Thyssen e Prado, 11 tra Prado e Reina Sofía.","Per risparmiare, il Prado è gratuito la sera (lunedì–sabato 18–20), il Reina Sofía lunedì e mercoledì–sabato 19–21 e il Thyssen il lunedì 12–16. La fila per l'ingresso gratuito è lunga.","Il Reina Sofía è chiuso il martedì; nelle sale del Prado scegli poche opere (Velázquez, Goya, Bosch) invece di vedere tutto."],["prado","reina","thyssen"]],
["🍤 Cosa mangiare e dove",["A mezzogiorno molti bar offrono il menú del día a prezzo fisso, con primo, secondo, dessert e bevanda.","I classici da provare: il bocadillo de calamares, il cocido madrileño, le croquetas, il bacalao fritto e i churros con cioccolato.","Mancia: non è obbligatoria; si lascia qualche moneta arrotondando il conto."],["campana","labra","antonio"]],
["🌅 Un giorno fuori Madrid",["Toledo e Segovia sono a circa mezz'ora di treno ad alta velocità (da Atocha per Toledo, da Chamartín per Segovia): orari e prezzi su renfe.com.","L'Escorial, il monastero-palazzo di Filippo II, si raggiunge in treno Cercanías (C-8) o in bus."]]],
WTIPS:["L'acqua del rubinetto di Madrid arriva dalla Sierra de Guadarrama ed è buona da bere: puoi chiederla in ogni locale («Agua del grifo, por favor») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti bar riempiono la borraccia se lo chiedi gentilmente.","Le fontane monumentali, come Cibeles, non sono da bere."],
GEN:["La Spagna usa l'euro e fa parte dello spazio Schengen, ma dall'agosto 2026 sono in vigore controlli temporanei su chi arriva dall'Italia: porta il passaporto o la carta d'identità elettronica (le carte cartacee non valgono più per l'espatrio).","Madrid ha lo stesso fuso orario dell'Italia.","In Spagna la z e la c davanti a e/i si pronunciano con la lingua tra i denti, come il «th» inglese di «think»: nella pronuncia scritta nell'app le trovi come TH.","Mancia: non è obbligatoria; nei bar e nei ristoranti si arrotonda il conto o si lascia qualche moneta.","Si pranza tardi (dalle 13:30) e si cena ancora più tardi (dalle 21): le cucine dei ristoranti tradizionali chiudono tra le 16 e le 20.","Nelle zone affollate (Sol, Gran Vía, metro) attenzione ai borseggiatori: zaino davanti e telefono in tasca interna.","Controlla orari e prezzi dei musei e dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Metro: <a href="https://www.metromadrid.es/" target="_blank" rel="noopener">metromadrid.es</a> · autobus EMT: <a href="https://www.emtmadrid.es/" target="_blank" rel="noopener">emtmadrid.es</a> · treni: <a href="https://www.renfe.com/" target="_blank" rel="noopener">renfe.com</a>.</li><li>🇮🇹 Consolato Generale d\'Italia a Madrid: <a href="https://consmadrid.esteri.it" target="_blank" rel="noopener">consmadrid.esteri.it</a>, per documenti persi o rubati (può rilasciare un documento di viaggio d\'emergenza dopo la denuncia alla polizia spagnola).</li>',
STRK:'Al 13 ottobre 2026 non ho potuto verificare scioperi annunciati nella metro, negli autobus EMT o nei treni Cercanías di Madrid (le fonti consultate non riportavano nulla per la Spagna). Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.metromadrid.es/" target="_blank" rel="noopener">metromadrid.es</a>, <a href="https://www.emtmadrid.es/" target="_blank" rel="noopener">emtmadrid.es</a> e <a href="https://www.renfe.com/" target="_blank" rel="noopener">renfe.com</a>, oltre alla compagnia aerea.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="150" cy="22" r="10"/><path d="M0 106 V90 L34 72 L60 84 L98 66 L134 88 L162 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 V64 H58 V106 Z M20 64 V52 H48 V64 Z M18 52 Q34 24 50 52 Z M33 26 V10 H35 V26 Z M29 14 H39 V16 H29 Z"/></g>'+
'<g style="--k:2"><path d="M78 106 V68 H172 V106 Z M78 68 V62 H172 V68 Z M112 62 L125 50 L138 62 Z M78 62 V54 H90 V62 Z M160 62 V54 H172 V62 Z"/></g>'+
'<g style="--k:3"><path d="M190 106 V62 H228 V106 Z M187 62 V57 H231 V62 Z M197 57 V46 H221 V57 Z M199 46 Q209 30 219 46 Z M208 30 V20 H210 V30 Z M205 20 H213 L209 13 Z"/></g>'+
'<g style="--k:4"><path d="M252 106 V70 H308 V106 Z M250 70 V64 H310 V70 Z M262 64 V54 H298 V64 Z M268 54 L280 46 L292 54 Z M272 106 H288 V82 A8 8 0 0 0 272 82 Z M258 106 H266 V90 A4 4 0 0 0 258 90 Z M294 106 H302 V90 A4 4 0 0 0 294 90 Z"/></g>'+
'<g style="--k:5"><path d="M334 106 H348 L362 32 H350 Z M390 106 H376 L378 32 H366 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M92 82 v24 M106 82 v24 M120 82 v24 M134 82 v24 M148 82 v24 M162 82 v24"/><path d="M196 74 h26 M196 86 h26 M196 98 h26"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="8" r="1.6"/><circle cx="104" cy="14" r="1.3"/><circle cx="196" cy="8" r="1.3"/><circle cx="262" cy="22" r="1.3"/><circle cx="326" cy="12" r="1.3"/><circle cx="388" cy="22" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.madrid);
