(function(o){
/* ===== Zagabria (dati verificati il 14 ottobre 2026; la Croazia usa l'euro dal 2023) ===== */
window.CITIES=window.CITIES||{};
CITIES.zagabria=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Zagabria ha un solo aeroporto commerciale (Franjo Tuđman, ex Pleso) */
var PAR={
ZAG:{n:"Zagabria Franjo Tuđman (ZAG)",s:"Zagreb Franjo Tuđman Airport",url:"https://www.zagreb-airport.hr/en",live:"Zagreb",inMin:45,buf:120,pos:[45.7429,16.0688],sd:"Aeroporto ZAG · bus Pleso Prijevoz",rt:"Dall'aeroporto: bus navetta fino alla stazione degli autobus (Autobusni kolodvor), poi tram fino a Trg bana Jelačića, la piazza principale.",
 arr:"Dall'Italia si entra in Croazia senza controllo passaporti: la Croazia fa parte dello spazio Schengen dal 2023. L'aeroporto è a Velika Gorica, circa 10 chilometri a sud-est del centro, e non ha né treno né metro. Il collegamento più semplice è la navetta Pleso Prijevoz, che porta alla stazione degli autobus (Autobusni kolodvor) in circa 35–45 minuti, con partenze ogni 30–40 minuti dalle 4:30 circa fino all'ultimo volo della sera. Dalla stazione degli autobus il tram porta in circa 10–12 minuti a Trg bana Jelačića, la piazza al centro della città. In alternativa c'è il bus urbano ZET 290, più lento (50–65 minuti): finisce a Kvaternikov trg, da cui un tram porta al centro. In tutto servono circa 60 minuti.",
 tk:"Biglietto: la navetta Pleso Prijevoz costa 8 € solo andata e 12 € andata e ritorno (prezzo da una guida online, da confermare su plesoprijevoz.hr), si compra dall'autista o online. Il bus ZET 290 costa circa 1,50 €. Il tram dalla stazione degli autobus al centro costa un biglietto ZET (circa 0,60–1,00 €, da confermare su zet.hr), da comprare alle macchinette o all'edicola. Il taxi per il centro costa circa 25–45 € (corsa di 25–35 minuti; Uber e Bolt di solito sono i più economici): chiedi il prezzo prima di partire.",
 gm:"Zračna luka Franjo Tuđman, Velika Gorica",
 tips:["Non c'è un treno per l'aeroporto: la navetta è la soluzione più comoda e il taxi con le app (Bolt, Uber) costa meno dei taxi tradizionali. Gli orari e i prezzi vanno controllati sui siti della navetta e di ZET qualche giorno prima.","Usa solo i taxi ufficiali all'uscita degli arrivi o le app, e controlla che il tassametro sia acceso.","Se atterri tardi, controlla l'ultimo orario della navetta: il bus ZET 290 e il taxi sono le alternative."]}
};
/* linee (tracciati indicativi) */
var SEG={
pp:{c:"#c8102e",n:"Navetta Pleso Prijevoz dall'aeroporto",p:[[45.7429,16.0688,"Aeroporto",2],[45.8040,15.9960,"Stazione autobus",2]]},
tr:{c:"#1f5fa8",n:"Tram dalla stazione autobus al centro",p:[[45.8040,15.9960,"Stazione autobus",2],[45.8130,15.9772,"Trg bana Jelačića",2]]}
};
var START=[45.8130,15.9772];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
jelacic:{t:"Trg bana Jelačića e Zrinjevac",z:"B",p:1,min:45,id:70,max:110,pos:[45.8130,15.9772],q:"Trg bana Jelačića, Zagreb",cls:"walk",sun:1,
 d:"La piazza principale di Zagabria, con la statua equestre di Josip Jelačić e il punto in cui si incontrano la Città Alta e la Città Bassa. Da qui si cammina nel Donji Grad (la Città Bassa) fino a Zrinjevac, il parco con il chiosco della musica, tra palazzi ottocenteschi.",
 m:"Si cammina gratis, a ogni ora. La piazza si anima la sera e nei fine settimana; nel periodo dell'Avvento (dal 28 novembre 2026 al 7 gennaio 2027) è piena di bancarelle e di gente."},
dolac:{t:"Mercato di Dolac",z:"A",p:2,min:40,id:60,max:90,pos:[45.8142,15.9763],q:"Dolac Market, Zagreb",cls:"walk",sun:1,
 win:function(){return[7*60,13*60]},
 d:"Il mercato all'aperto più famoso di Zagabria, dietro la piazza principale, con gli ombrelloni rossi. Frutta, verdura, formaggi, ricami e fiori in superficie; carne e pesce nel mercato coperto sotto.",
 m:"Le bancarelle all'aperto sono aperte la mattina, di norma fino alle 14 dal lunedì al sabato e fino alle 13 la domenica (orari da guide, da confermare: le fonti non concordano sull'apertura, tra le 6 e le 7). Il pomeriggio il mercato è vuoto: conviene venire presto."},
cathedral:{t:"Cattedrale e Kaptol",z:"A",p:1,min:40,id:55,max:90,pos:[45.8147,15.9795],q:"Zagreb Cathedral",cls:"",sun:1,
 win:function(){return[10*60,17*60]},
 d:"La cattedrale dell'Assunzione, con le due guglie neogotiche alte oltre cento metri, è l'edificio religioso più grande della Croazia. Intorno c'è Kaptol, il vecchio quartiere del clero, con i palazzi e le piazze.",
 m:"L'ingresso è libero (offerta libera). Orari di visita da guide: lunedì–sabato 10–17, domenica 13–17, ma la chiesa si chiude durante le funzioni, quindi controlla gli orari (da confermare). Le guglie sono visibili da tutta la città."},
tkalcic:{t:"Via Tkalčićeva",z:"A",p:4,min:35,id:55,max:90,pos:[45.8156,15.9755],q:"Tkalčićeva ulica, Zagreb",cls:"walk",sun:1,
 d:"La stradina pedonale piena di caffè e ristoranti, che corre lungo il torrente Medveščak, ormai coperto, tra Kaptol e la Città Alta. È la strada dell'aperitivo di Zagabria, con le case basse e colorate.",
 m:"Si cammina gratis. I locali aprono di mattina e restano aperti fino a tardi; nei fine settimana la sera è affollata."},
stone:{t:"Porta di Pietra e Chiesa di San Marco",z:"C",p:1,min:60,id:85,max:120,pos:[45.8160,15.9738],q:"Kamenita vrata, Zagreb",cls:"walk",sun:1,
 d:"Nella Città Alta, la Porta di Pietra è l'unica porta medievale rimasta delle mura: sotto l'arco c'è una cappella con una Madonna considerata miracolosa. Poco più in là la Chiesa di San Marco ha il tetto di tegole colorate con gli stemmi della Croazia e di Zagabria, la vista più fotografata della città.",
 m:"La porta e la piazza si vedono gratis a ogni ora. L'interno della chiesa di San Marco di norma si visita solo durante le funzioni: il tetto si vede bene da fuori (da guide, da confermare)."},
broken:{t:"Museo delle Relazioni Spezzate",z:"C",p:2,min:60,id:75,max:100,pos:[45.8164,15.9736],q:"Museum of Broken Relationships, Zagreb",cls:"",sun:1,tk:[9,"Museo delle Relazioni Spezzate (9 €)",1,1],
 win:function(){return[9*60,21*60]},
 d:"Un piccolo museo originale e molto visitato, nato a Zagabria: espone oggetti lasciati da persone di tutto il mondo dopo la fine di un amore, ciascuno con la sua storia scritta in inglese e in croato. Si legge e si cammina con calma: le storie fanno ridere e commuovere.",
 m:"Dal sito del museo: aperto ogni giorno dalle 9 alle 21 da ottobre a maggio (ultimo ingresso 20:30), dalle 9 alle 22 in estate. Biglietto adulti 9 €, studenti, pensionati dai 65 anni e persone con disabilità 7 €. Chiuso a Ognissanti (1° novembre), Natale, Capodanno e Pasqua; il 31 dicembre apre dalle 10 alle 18."},
lotr:{t:"Torre Lotrščak, funicolare e passeggiata Strossmayer",z:"C",p:2,min:50,id:70,max:100,pos:[45.8138,15.9745],q:"Lotrščak Tower, Zagreb",cls:"",sun:1,
 win:function(){return[10*60,20*60]},
 d:"Una torre del Duecento con una scala stretta fino al piano più alto e una vista a 360 gradi sui tetti. Ogni giorno a mezzogiorno dalla torre parte un colpo di cannone. Accanto c'è la funicolare, una delle più corte del mondo, e la passeggiata Strossmayer, un belvedere con alberi e panchine.",
 m:"Per la torre le guide indicano 3–4 € e orari intorno alle 10–20 (fonti diverse, da confermare). La funicolare va ogni 10 minuti circa tra le 6:30 e le 22, ed è una corsa di circa un minuto: costa meno di 1 € (da guide, il biglietto ZET non vale: da confermare)."},
gric:{t:"Tunnel Grič",z:"A",p:4,min:30,id:45,max:70,pos:[45.8145,15.9752],q:"Grički tunel, Zagreb",cls:"walk",sun:1,
 win:function(){return[9*60,21*60]},
 d:"Una galleria sotto la Città Alta, costruita durante la Seconda guerra mondiale come rifugio antiaereo: oggi è uno spazio pedonale che collega Mesnička e Radićeva e ospita piccole mostre. Una pausa fresca d'estate e riparata dalla pioggia.",
 m:"Per le guide è aperto ogni giorno dalle 9 alle 21 e l'ingresso è gratuito (da confermare: le informazioni sono di fonte secondaria)."},
mirogoj:{t:"Cimitero Mirogoj",z:"A",p:3,min:70,id:90,max:140,pos:[45.8272,16.0052],q:"Mirogoj Cemetery, Zagreb",cls:"walk",sun:1,
 win:function(wd,date){var m=-1;try{m=new Date(date).getMonth()}catch(e){}return(m>=3&&m<=9)?[6*60,20*60]:[7*60+30,18*60]},
 d:"Considerato uno dei cimiteri più belli d'Europa, un grande parco con portici e cupole neorinascimentali opera di Hermann Bollé, e tombe di personaggi della storia croata. Più che un luogo triste, è un posto tranquillo da percorrere tra alberi e sculture, con ore di silenzio.",
 m:"L'ingresso è gratuito. Orari da guide: da aprile a ottobre 6–20, da novembre a marzo 7:30–18 (da confermare su gradskagroblja.hr). Per arrivarci c'è il bus ZET 106 da Kaptol, davanti alla cattedrale, in circa 10 minuti (da guide, da confermare). Intorno al 1° novembre (Ognissanti) il cimitero è molto affollato e il traffico è regolato."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","dolac",5,"walk","A piedi per la via Splavnica, circa 5 minuti.","A piedi, circa 5 minuti, fino alla piazza principale.",{f:[W([[45.8130,15.9772],[45.8142,15.9763]])],r:[W([[45.8142,15.9763],[45.8130,15.9772]])]});
P2("start","cathedral",8,"walk","A piedi per la via Radićeva e Kaptol, circa 8 minuti.","A piedi per Kaptol fino a Trg bana Jelačića, circa 8 minuti.",{f:[W([[45.8130,15.9772],[45.8147,15.9795]])],r:[W([[45.8147,15.9795],[45.8130,15.9772]])]});
P2("dolac","cathedral",4,"walk","A piedi per la scalinata di Dolac, circa 4 minuti.","A piedi dalla cattedrale al mercato, circa 4 minuti.",{f:[W([[45.8142,15.9763],[45.8147,15.9795]])],r:[W([[45.8147,15.9795],[45.8142,15.9763]])]});
P2("cathedral","tkalcic",8,"walk","A piedi da Kaptol alla via Tkalčićeva, circa 8 minuti.","A piedi da Tkalčićeva a Kaptol, circa 8 minuti.",{f:[W([[45.8147,15.9795],[45.8156,15.9755]])],r:[W([[45.8156,15.9755],[45.8147,15.9795]])]});
P2("tkalcic","stone",6,"walk","A piedi, in salita, fino alla Porta di Pietra nella Città Alta, circa 6 minuti.","A piedi in discesa fino a Tkalčićeva, circa 6 minuti.",{f:[W([[45.8156,15.9755],[45.8160,15.9738]])],r:[W([[45.8160,15.9738],[45.8156,15.9755]])]});
P2("stone","broken",3,"walk","A piedi, circa 3 minuti, fino al museo (Ćirilometodska).","A piedi, circa 3 minuti, fino alla Porta di Pietra.",{f:[W([[45.8160,15.9738],[45.8164,15.9736]])],r:[W([[45.8164,15.9736],[45.8160,15.9738]])]});
P2("broken","lotr",8,"walk","A piedi per Strossmayerovo šetalište, circa 8 minuti, fino alla torre.","A piedi, in leggera salita, fino al museo, circa 8 minuti.",{f:[W([[45.8164,15.9736],[45.8138,15.9745]])],r:[W([[45.8138,15.9745],[45.8164,15.9736]])]});
P2("lotr","start",8,"walk","Con la funicolare in un minuto fino a Ilica e a piedi a Trg bana Jelačića, circa 8 minuti in tutto.","A piedi per Ilica e con la funicolare fino alla torre, circa 10 minuti.",{f:[W([[45.8138,15.9745],[45.8130,15.9772]])],r:[W([[45.8130,15.9772],[45.8138,15.9745]])]});
P2("start","jelacic",3,"walk","A pochi passi.","A pochi passi.",{f:[W([[45.8130,15.9772],[45.8130,15.9772]])],r:[W([[45.8130,15.9772],[45.8130,15.9772]])]});
P2("start","mirogoj",30,"metro","Autobus 106 da Kaptol, davanti alla cattedrale (circa 10 minuti), dopo 8 minuti a piedi dalla piazza principale. In tutto circa 30 minuti (linea da confermare su zet.hr).","Autobus 106 da Mirogoj fino a Kaptol e a piedi fino alla piazza principale, circa 30 minuti.",{f:[{w:[[45.8130,15.9772],[45.8272,16.0052]],dash:1}],r:[{w:[[45.8272,16.0052],[45.8130,15.9772]],dash:1}]});
P2("cathedral","mirogoj",16,"metro","Autobus 106 dalla fermata davanti alla cattedrale, circa 10 minuti più l'attesa (linea da confermare su zet.hr).","Autobus 106 da Mirogoj a Kaptol, circa 10 minuti più l'attesa.",{f:[{w:[[45.8147,15.9795],[45.8272,16.0052]],dash:1}],r:[{w:[[45.8272,16.0052],[45.8147,15.9795]],dash:1}]});
/* ritorno in aeroporto: tram fino alla stazione autobus e navetta */
var RET={
ZAG:{
 A:{min:60,txt:"Tram da Trg bana Jelačića fino alla stazione degli autobus (Autobusni kolodvor, circa 10–12 minuti), poi la navetta Pleso Prijevoz per l'aeroporto (35–45 minuti, ogni 30–40 minuti). Biglietto navetta 8 €, biglietto del tram da comprare a parte. In alternativa il taxi o Bolt/Uber (circa 25–45 €, 25–35 minuti): se hai poco tempo è la soluzione più sicura.",g:[["tr","Trg bana Jelačića","Stazione autobus"],["pp","Stazione autobus","Aeroporto"]]}}
};
var ARR={
ZAG:[["pp","Aeroporto","Stazione autobus"],["tr","Stazione autobus","Trg bana Jelačića"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
fijaker:{n:"Stari Fijaker 900",a:"Mesnička 6",z:"A",r:"4,3",pos:[45.8140,15.9772],h:["11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-22:00"],
 d:"Una trattoria storica dal 1848 vicino a Dolac, con cucina di Zagabria e dello Zagorje: štrukli, sarma (involtini di cavolo), tacchino con mlinci e gulasch di cervo. Servizio semplice e porzioni abbondanti.",pr:"Un piatto principale sta intorno ai 15–25 € (listino non visto). Orari da una scheda online, da confermare."},
struk:{n:"La Štruk",a:"Skalinska 5",z:"A",r:"4,4",pos:[45.8144,15.9764],h:D7("11:00-23:00"),
 d:"Un piccolo locale vicino a Dolac dedicato agli štrukli, la pasta ripiena di formaggio fresco tipica di Zagabria, cotti al forno o lessati, anche in versione dolce o con tartufo.",pr:"Una porzione costa circa 8–12 € (listino non visto). Orari da una guida online (altre schede più vecchie danno orari diversi): da confermare."},
vinodol:{n:"Vinodol",a:"Nikole Tesle 10",z:"B",r:"4,3",pos:[45.8118,15.9757],h:D7("12:00-24:00"),
 d:"Un ristorante con un cortile interno a due passi dalla piazza principale: cucina croata di carne e di pesce, grigliate, agnello e piatti dell'entroterra.",pr:"Un piatto principale sta intorno ai 18–30 € (listino non visto). Orari da una guida online, da confermare."},
purger:{n:"Gostionica Purger",a:"Petrinjska 33",z:"B",r:"4,2",pos:[45.8098,15.9768],h:["07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00",""],
 d:"Un'osteria del 1932 tra la piazza principale e la stazione ferroviaria: colazione, pranzo e cena con piatti croati casalinghi, come sarma, agnello e vitello, in un ambiente semplice.",pr:"Un piatto sta intorno ai 10–20 € (listino non visto, scheda del 2017). Chiusa la domenica secondo la scheda, da confermare."},
tiptop:{n:"Gostionica Tip-Top",a:"Gundulićeva 18",z:"B",r:"4,2",pos:[45.8118,15.9695],h:["07:00-22:00","07:00-22:00","07:00-22:00","07:00-22:00","07:00-22:00","07:00-22:00",""],
 d:"Un'osteria storica nella Città Bassa, un tempo ritrovo di poeti, con la colazione fino alle 10, un menù del giorno a prezzi bassi e piatti di pesce, risotto e pasta.",pr:"Menù del giorno e piatti sui 10–18 € (scheda del 2017, listino non visto). Chiusa la domenica secondo la scheda, da confermare."},
quahwa:{n:"Quahwa",a:"Nikole Tesle 9",z:"B",r:"4,4",pos:[45.8115,15.9755],h:["09:00-21:00","08:00-22:00","08:00-22:00","08:00-22:00","08:00-22:00","08:00-22:00","09:00-21:00"],
 d:"Un caffè di tostatori con le poltrone comode e un piccolo terrazzo sulla via Tesla: caffè di filtro e latte macchiato con tazze colorate, tè e dolci. Un buon posto per la colazione.",pr:"Un caffè costa 2–3,50 €, una colazione 5–9 € (listino non visto). Orari da due schede che non concordano sul lunedì: da confermare."},
velvet:{n:"Velvet",a:"Dežmanova 9",z:"B",r:"4,3",pos:[45.8077,15.9789],h:["09:00-23:00","09:00-23:00","09:00-23:00","09:00-23:00","09:00-24:00","09:00-24:00","08:00-22:00"],
 d:"Un caffè elegante con due sale, lampadari e luci a stella, con spuntini dolci e salati, bevande calde e fredde. Comodo per una sosta dopo la passeggiata nella Città Bassa.",pr:"Un caffè con un dolce sta intorno ai 6–10 € (listino non visto). Orari da una scheda online, da confermare."},
mundoaka:{n:"Mundoaka Street Food",a:"Petrinjska 2",z:"B",r:"4,4",pos:[45.8112,15.9772],h:["","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00",""],
 d:"Un locale di cucina di strada a due passi dalla piazza principale: panini e piatti con ingredienti locali e internazionali, per un pranzo o una cena veloci a prezzi medi.",pr:"Un piatto sta intorno ai 10–18 € (listino non visto). Chiuso domenica e lunedì secondo la scheda, da confermare."},
malimedo:{n:"Mali Medo",a:"Tkalčićeva 36",z:"A",r:"4,2",pos:[45.8157,15.9755],h:["10:00-24:00","10:00-24:00","10:00-24:00","10:00-01:00","10:00-01:00","10:00-01:00","12:00-24:00"],
 d:"Il pub-ristorante della birreria Medvedgrad, sulla via Tkalčićeva, con una grande terrazza: birre artigianali alla spina e piatti croati di carne, perfetti per una cena senza fretta.",pr:"Un piatto sta intorno ai 12–20 € e una birra 4–5 € (listino non visto). Orari da una scheda online, da confermare."},
lav:{n:"Kavana Lav",a:"Opatička 2",z:"C",r:"4,2",pos:[45.8156,15.9733],h:D7("09:00-23:00"),
 d:"Un caffè della Città Alta, vicino a San Marco, con terrazza e tavolini all'aperto: caffè, dolci e una sosta riposante dopo le salite.",pr:"Un caffè con un dolce sta intorno ai 6–10 € (listino non visto). Orari da una guida del 2022, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["quahwa","fijaker"],B:["quahwa","velvet","purger"],C:["lav","quahwa"]},
pra:{A:["struk","fijaker","mundoaka"],B:["mundoaka","purger","tiptop","vinodol"],C:["fijaker","struk","mundoaka"]},
cen:{A:["fijaker","malimedo","struk"],B:["vinodol","fijaker","tiptop"],C:["fijaker","malimedo","vinodol"]},
snk:{A:["struk","malimedo","quahwa"],B:["velvet","quahwa"],C:["lav","velvet"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"alta",t:"Città Alta: Porta di Pietra, San Marco e Museo delle Relazioni Spezzate",acts:["stone","broken","lotr"],need:210,core:1},
{id:"centro",t:"Piazza principale, Dolac e Cattedrale",acts:["jelacic","dolac","cathedral"],need:160,core:1},
{id:"tkalcic",t:"Via Tkalčićeva e Tunnel Grič",acts:["tkalcic","gric"],need:80},
{id:"miro",t:"Cimitero Mirogoj",acts:["mirogoj"],need:90}
];
var ORDER=["jelacic","dolac","cathedral","tkalcic","gric","stone","broken","lotr","mirogoj"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["inn","Città Bassa (Donji Grad) e piazza principale",[45.8120,15.9760],"B"],
["kap","Kaptol, Dolac e Tkalčićeva",[45.8150,15.9765],"A"],
["gor","Città Alta (Gornji Grad)",[45.8160,15.9738],"C"],
["altro","Altra zona (scrivi l'indirizzo)",[45.8130,15.9772],""]
];
/* imposta di soggiorno: a Zagabria è una cifra fissa a persona e a notte; importo 2026 non verificato su fonte ufficiale */
var TAX=[["h5","Hotel 4–5 stelle",1.5],["h3","Hotel fino a 3 stelle, B&B o appartamento",1.5],["host","Ostello o struttura economica",1.5],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Kava s mlijekom","caffè con latte, la colazione tipica di Zagabria."],["Štrukli","sfoglia ripiena di formaggio fresco, anche a colazione."],["Kroasan i kava","un cornetto e un caffè al bar."]],
pra:[["Štrukli","sfoglia ripiena di formaggio fresco, cotta al forno o lessata: il piatto simbolo di Zagabria."],["Gablec","il menù del giorno, un pranzo completo e economico servito nelle osterie."],["Čevapi","salsicce di carne alla griglia con pane e cipolla."],["Burek","pasta sfoglia ripiena di formaggio o carne, da mangiare per strada."]],
cen:[["Purica s mlincima","tacchino arrosto con mlinci, pasta tradizionale di Zagabria."],["Sarma","involtini di cavolo ripieni di carne."],["Zagrebački odrezak","una cotoletta ripiena di prosciutto e formaggio: il piatto di carne della città."],["Kremšnita","un dolce di sfoglia e crema, tipico di Samobor e Zagabria."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Le guglie della cattedrale","Foto","Le due guglie neogotiche viste da Kaptol, soprattutto nella luce del mattino.",[45.8147,15.9795],"Zagreb Cathedral","cathedral"],
["🤳","La statua di Jelačić","Selfie","La statua equestre in mezzo alla piazza principale, con i tram che passano dietro.",[45.8130,15.9772],"Statue of Ban Jelačić, Zagreb","jelacic"],
["📷","Gli ombrelloni rossi di Dolac","Foto","Le bancarelle di frutta e verdura sotto gli ombrelloni rossi: chiedi il permesso prima di fotografare i venditori.",[45.8142,15.9763],"Dolac Market, Zagreb","dolac"],
["📷","Il tetto di San Marco","Foto","Il tetto di tegole colorate con gli stemmi di Croazia e Zagabria, dalla piazza davanti alla chiesa.",[45.8166,15.9733],"St. Mark's Church, Zagreb","stone"],
["🤳","La Porta di Pietra","Selfie","L'arco medievale con le candele e la cappella: ricorda che è un luogo di preghiera, fotografa con rispetto.",[45.8160,15.9738],"Kamenita vrata, Zagreb","stone"],
["📷","Zagabria dalla passeggiata Strossmayer","Foto","Il panorama sui tetti della Città Bassa e le guglie della cattedrale, vicino alla torre Lotrščak.",[45.8138,15.9745],"Strossmayerovo šetalište, Zagreb","lotr"],
["📷","La via Tkalčićeva","Foto","Le casette colorate e i tavolini all'aperto, di sera con le luci.",[45.8156,15.9755],"Tkalčićeva ulica, Zagreb","tkalcic"],
["📷","I portici di Mirogoj","Foto","Le arcate e le cupole neorinascimentali tra gli alberi, al mattino presto.",[45.8272,16.0052],"Mirogoj Cemetery, Zagreb","mirogoj"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2026-11-02",t:"Ognissanti: Mirogoj affollato e Museo delle Relazioni Spezzate chiuso",x:"Il 1° novembre (Ognissanti) è festa in Croazia: molta gente al cimitero Mirogoj, con traffico regolato attorno (da guide, da confermare). Il Museo delle Relazioni Spezzate è chiuso il 1° novembre secondo il sito del museo. Dal 1° novembre gli orari invernali di molti luoghi sono più corti."},
{from:"2026-11-20",to:"2027-01-07",t:"Avvento a Zagabria",x:"L'Avvento di Zagabria è dal 28 novembre 2026 al 7 gennaio 2027, con apertura di prova dal 25 al 27 novembre (tportal). Le piazze e le vie del centro si riempiono di bancarelle e di gente, e il traffico viene regolato: prenota in anticipo gli alloggi."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: orari ridotti",x:"Il 25 e il 26 dicembre in Croazia sono festivi e la maggior parte dei negozi è chiusa. Il Museo delle Relazioni Spezzate è chiuso il 24 e il 25 dicembre e il 1° gennaio secondo il sito del museo."}
];
/* clima medio di Zagabria (indicativo, massime/minime) */
var CLIM=[[3,-3],[6,-1],[12,2],[17,6],[22,11],[25,15],[28,17],[28,16],[23,12],[17,7],[10,3],[4,-1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Zagabria: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="dolac"&&WD===6)meta+=" Oggi è domenica: il mercato di Dolac chiude prima, intorno alle 13.";
if(it.id==="cathedral"&&WD===6)meta+=" Oggi è domenica: la cattedrale di norma apre solo dalle 13.";
return meta}
Object.assign(C,{id:"zagabria",n:"Zagabria",cn:"Croazia",e:"🚋",flag:"🇭🇷",col:["#c8102e","#1f3a6b","#e8e8e8"],k:"zagabria zagreb croazia croatia",
TZ:"Europe/Zagreb",LL:[45.8130,15.9772],CC:"hr",QN:"Zagreb",BK:"Zagreb",ARE:/zagreb|zagabria|\b10\d{3}\b/i,VER:"14 ottobre 2026",
Z0:"B",LANG:"hr-HR",LANGN:"croato",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Trg bana Jelačića",q:"Trg bana Jelačića, Zagreb"},
SINGLE:{acts:["jelacic","dolac","cathedral","stone","broken"],ins:[]},
EXCL:[],
DICON:{jelacic:"🏛️",dolac:"🍎",cathedral:"⛪",tkalcic:"🍻",stone:"🏰",broken:"💔",lotr:"🗼",gric:"🚇",mirogoj:"🌳"},
ZN:{A:"a Kaptol e Tkalčićeva",B:"nella Città Bassa",C:"nella Città Alta"},
NEAR:{col:"caffè",pra:"osteria o locale veloce",cen:"locale",snk:"caffè o locale"},
SE:{fijaker:"🍲",struk:"🥟",vinodol:"🍖",purger:"🍲",tiptop:"🍲",quahwa:"☕",velvet:"☕",mundoaka:"🥪",malimedo:"🍺",lav:"☕"},
TR:{one:1,cap:4,lbl:"Tram e bus (ZET)",
 air:{ZAG:{one:8,n:"Navetta Pleso Prijevoz per l'aeroporto (8 €)"}},
 passes:[
 {n:"Biglietto giornaliero ZET",d:1,max:1,p:4,note:"Il biglietto giornaliero (circa 4 €, da confermare) vale su tram e bus di Zagabria fino alle 4 del mattino successivo."},
 {n:"Biglietto 3 giorni",d:3,p:9.3,only:function(T){return T.n>=2},note:"Il biglietto da 3 giorni (circa 9,30 €, da confermare) vale per 72 ore su tram e bus."}],
 note:"Prezzi da guide online, non letti sul sito di ZET (zet.hr) e da confermare: biglietto da 30 minuti circa 0,60 €, da 60 minuti circa 1 €, da 90 minuti circa 1,50 €, giornaliero circa 4 €, 3 giorni circa 9,30 €. Una fonte indica anche 0,53 € per 30 minuti. A bordo il biglietto costa di più (circa 1,50 €, con i soldi contati). Il biglietto cartaceo si convalida appena si sale sul mezzo. La funicolare ha un biglietto a parte. La navetta per l'aeroporto non è compresa."},
FOOD:{co:[5,"Colazione al caffè"],pr:[10,"Pranzo (osteria o locale veloce)"],ce:[18,"Cena (cucina croata)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"In tram",move:"quasi tutto a piedi, a tratti in tram",bags:"«Mogu ostaviti prtljagu ovdje?»",bagsPM:"«Mogu ostaviti prtljagu ovdje do poslijepodne?»",bagsAM:"«Mogu ostaviti prtljagu ovdje do podne?»",
pra:"Un'osteria o un locale veloce",praZ:{A:"Intorno a Dolac e a Tkalčićeva i locali con i tavolini sulla strada sono per turisti e costano di più: nelle vie laterali si mangia meglio e si spende meno.",C:"Nella Città Alta ci sono pochi locali: una sosta con un caffè e un dolce è più facile di un pranzo vero."},
freeLong:"Qualche idea: una sosta con un caffè in un locale della Tkalčićeva, una passeggiata nel parco Zrinjevac, il mercato di Dolac o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè.",
remind:"A Zagabria la maggior parte dei negozi è chiusa la domenica pomeriggio (da confermare) e molti locali tradizionali chiudono tra i due servizi. Controlla gli orari del Museo delle Relazioni Spezzate.",
rain1:"Al coperto: il Museo delle Relazioni Spezzate, il Tunnel Grič, la cattedrale e i caffè.",
rainM:"Al coperto: Museo delle Relazioni Spezzate, Tunnel Grič, cattedrale e caffè.",
water:"Riempite la borraccia: l'acqua del rubinetto di Zagabria si può bere. Attivate «Acqua» sulla mappa per le fontanelle (dati di OpenStreetMap, da controllare).",
kitchen:"A Zagabria si pranza tra le 12 e le 15 e si cena dalle 18 alle 21 circa: molte osterie fanno il menù del giorno a pranzo, a prezzo basso.",
night:[["🍺","Una birra artigianale in una birreria della Tkalčićeva è il modo tipico di chiudere la giornata."],["🕙","Le cucine servono di norma fino alle 22–23; ci sono tram notturni, controlla le linee e gli orari su zet.hr."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto si beve)",
fuso:"Zagabria ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per osterie e locali popolari: una colazione sta intorno ai 5–9 €, un pranzo di menù del giorno intorno ai 10–15 € e una cena completa con un piatto principale intorno ai 15–25 €. Si paga quasi sempre con la carta; al mercato conviene avere qualche euro in contanti.",
taxNote:"L'imposta di soggiorno di Zagabria è una cifra fissa a persona e a notte, che varia secondo il tipo di struttura; qui è stimata in circa 1,50 € a persona e a notte, ma l'importo 2026 non è stato verificato su fonti ufficiali. Spesso si paga alla struttura: controlla l'importo esatto sull'annuncio o chiedendo a chi ti ospita.",
mcrit:"Criteri: locali veri e aperti, buona reputazione, prezzi popolari o medi, niente catene. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Non c'è un treno per l'aeroporto: la navetta Pleso Prijevoz è il modo più semplice, con partenze circa ogni 30–40 minuti.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto della navetta per l'aeroporto (8 € solo andata) e biglietti del tram: si comprano sul mezzo o alle macchinette",function(E){return true}],["brk","Biglietto per il Museo delle Relazioni Spezzate (9 €): si compra anche online",["broken"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per il mercato e i locali piccoli"]],
NUM:{1:["jedan","YE-dan"],2:["dva","dva"],3:["tri","tri"],4:["četiri","CHE-ti-ri"],5:["pet","pet"],6:["šest","shest"],7:["sedam","SE-dam"],8:["osam","O-sam"],9:["devet","DE-vet"],10:["deset","DE-set"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Dobar dan / Dobra večer","DO-bar dan / DO-bra VE-cher"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Stol za "+(N===1?"jednu osobu":nu[0])+", molim","stol za "+(N===1?"YED-nu O-so-bu":nu[1])+", MO-lim"],["Un caffè e una fetta di torta, per favore","Jednu kavu i komad torte, molim","YED-nu KA-vu i KO-mad TOR-te, MO-lim"],["Acqua del rubinetto, per favore","Vodu iz slavine, molim","VO-du iz SLA-vi-ne, MO-lim"],["Il conto, per favore","Račun, molim","RA-chun, MO-lim"],["Posso pagare con la carta?","Mogu platiti karticom?","MO-gu PLA-ti-ti KAR-ti-tsom"],["Quanto costa?","Koliko košta?","KO-li-ko KOSH-ta"],["Dov'è la fermata del tram?","Gdje je tramvajska stanica?","gdye ye TRAM-vai-ska STA-ni-tsa"],["Dov'è l'autobus per l'aeroporto?","Gdje je autobus za zračnu luku?","gdye ye AU-to-bus za ZRA-chnu LU-ku"]];
if(M)fr=fr.concat([["Ho una prenotazione","Imam rezervaciju","I-mam re-zer-VA-tsi-yu"],["Posso lasciare i bagagli?","Mogu ostaviti prtljagu ovdje?","MO-gu o-STA-vi-ti PRT-lya-gu OV-dye"],["A che ora è il check-out?","U koliko sati je odjava?","u KO-li-ko SA-ti ye OD-ya-va"]]);
return fr.concat([["Mi scusi","Oprostite","O-pro-sti-te"],["Grazie mille!","Hvala puno!","HVA-la PU-no"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Zagabria: "+(tx[2]?"circa "+String(tx[2]).replace(".",",")+" € a persona e a notte ("+tx[1].toLowerCase()+"), importo non verificato su fonti ufficiali":"non si paga se sei ospite di amici o parenti")+". Spesso va pagata alla struttura: controlla l'importo sull'annuncio."},
STAYTIPS:["Tram e bus si usano con lo stesso biglietto ZET; il biglietto cartaceo va convalidato appena si sale. La Città Bassa e la Città Alta si fanno a piedi: il centro è piccolo."],
ZONES:[
["🚋 Tram e biglietti",["Il tram è il mezzo principale: un solo biglietto ZET vale su tram e bus. I prezzi indicativi sono 0,60 € per 30 minuti, circa 1 € per 60 minuti e circa 4 € per tutto il giorno (da guide, da confermare su zet.hr).","Il biglietto cartaceo va convalidato appena si sale sul mezzo, nelle macchinette gialle o arancioni; i controllori fanno multe (importo da controllare).","La funicolare, che sale alla Città Alta, ha un biglietto a parte: il biglietto del tram non vale.","L'aeroporto è fuori città: la navetta costa a parte."]],
["🏛️ Città Alta e Città Bassa",["La Città Alta (Gornji Grad) si visita a piedi: la Porta di Pietra, San Marco e il Museo delle Relazioni Spezzate sono a pochi passi l'uno dall'altro.","Dalla piazza principale si sale alla Città Alta in 10 minuti a piedi per la via Radićeva o con la funicolare da Ilica.","La Città Bassa (Donji Grad) ha parchi, musei e palazzi ottocenteschi: Zrinjevac è il parco centrale."],["jelacic","stone","broken","lotr"]],
["🍎 Mercato e cucina locale",["A Dolac si compra al mattino: il pomeriggio il mercato è vuoto.","Lo štrukli è il piatto simbolo di Zagabria: pasta fresca ripiena di formaggio, cotta al forno o lessata.","Molte osterie fanno a pranzo il «gablec», un menù del giorno a prezzo basso."],["dolac"]],
["🌳 Mirogoj",["Mirogoj è un cimitero monumentale ma anche un parco: si visita in silenzio.","Dalla cattedrale c'è il bus 106 in circa 10 minuti (da confermare).","Il 1° novembre (Ognissanti) è molto affollato."],["mirogoj"]],
["🌅 Un giorno fuori Zagabria",["Samobor, una cittadina con la pasticceria e il castello, è a circa 30 minuti in autobus (da confermare).","Le colline di Medvednica si raggiungono in tram e funivia: controlla sul sito dei trasporti."]]],
WTIPS:["L'acqua del rubinetto di Zagabria si può bere: puoi chiederla nei locali («Vodu iz slavine, molim») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap, da controllare.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Croazia usa l'euro dal 2023 e fa parte dello spazio Schengen dal 2023: per entrare basta la carta d'identità valida.","Zagabria ha lo stesso fuso orario dell'Italia.","Mancia: si lascia il 5–10% (o si arrotonda) nei ristoranti, se il servizio è buono.","La domenica molti negozi sono chiusi o chiudono presto; sono aperti ristoranti, caffè e musei (da confermare).","Il centro è piccolo e si gira a piedi: il tram serve per Mirogoj e per la stazione degli autobus.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚋 Trasporti pubblici: <a href="https://www.zet.hr/" target="_blank" rel="noopener">zet.hr</a> · aeroporto: <a href="https://www.zagreb-airport.hr/en" target="_blank" rel="noopener">zagreb-airport.hr</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Zagabria: <a href="https://ambzagabria.esteri.it" target="_blank" rel="noopener">ambzagabria.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Zagabria. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.zet.hr/" target="_blank" rel="noopener">zet.hr</a> e <a href="https://www.viaggiaresicuri.it/" target="_blank" rel="noopener">viaggiaresicuri.it</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V92 Q60 74 130 84 Q180 90 210 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M14 106 V62 H92 V106 Z M24 62 V34 L32 6 L40 34 V62 Z M66 62 V34 L74 6 L82 34 V62 Z M44 62 V50 H62 V62 Z"/></g>'+
'<g style="--k:2"><path d="M120 106 V60 H144 V106 Z M116 60 H148 L132 36 Z M130 36 V24 H134 V36 Z M126 76 H138 V84 H126 Z"/></g>'+
'<g style="--k:3"><path d="M170 106 V70 H236 V106 Z M170 70 L203 44 L236 70 Z M196 44 V30 H210 V44 Z"/></g>'+
'<g style="--k:4"><path d="M262 106 V48 H284 V106 Z M258 48 H288 L273 28 Z M271 28 V18 H275 V28 Z M262 62 H284 V66 H262 Z"/></g>'+
'<g style="--k:5"><path d="M312 106 V80 H388 V106 Z M312 80 V74 H388 V80 Z M330 74 V66 H370 V74 Z M326 90 H334 V98 H326 Z M346 90 H354 V98 H346 Z M366 90 H374 V98 H366 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M176 86 h54 M176 96 h54"/><path d="M320 84 h60"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.zagabria);

;var n=window.CITIES["zagabria"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["zagabria"]);
