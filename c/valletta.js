(function(o){
/* ===== La Valletta (dati verificati il 14 ottobre 2026) =====
   Fonti: Heritage Malta, sito della Co-Cattedrale di San Giovanni, Malta Public Transport (Airport Direct), guide e schede online.
   Le coordinate sono indicative (cercate a mano, non lette da una mappa ufficiale): controllale sulla mappa prima di fidarti al metro. */
window.CITIES=window.CITIES||{};
CITIES.valletta=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: a Malta c'è un solo aeroporto */
var PAR={
MLA:{n:"Malta Luqa (MLA)",s:"Malta International Airport, Luqa",url:"https://www.maltairport.com",live:"Malta",inMin:45,buf:120,pos:[35.8575,14.4775],sd:"Aeroporto MLA · bus TD4 Airport Direct",rt:"Dall'aeroporto: bus TD4 (Tallinja Direct) fino alla fermata di City Gate, all'ingresso della Valletta.",
 arr:"Dall'Italia si entra a Malta senza controllo passaporti (spazio Schengen). L'aeroporto di Luqa è l'unico dell'isola ed è a circa 6 chilometri dalla Valletta. Il modo più semplice è il bus TD4 «Airport Direct» di Malta Public Transport, che collega l'aeroporto alla Valletta (e prosegue per il traghetto veloce per Gozo): frequente, ma l'orario e la durata esatta non li ho trovati sul sito, controlla il giorno prima su publictransport.com.mt (la corsa dura in genere circa 20–30 minuti). Le vecchie linee X1–X4 sono state sostituite dal 2025. Alla Valletta il bus arriva al terminal accanto alla Fontana del Tritone, davanti alla porta della città (City Gate): da lì si entra a piedi in Republic Street. In alternativa c'è il taxi bianco con tariffa fissa dal banco in sala arrivi, o un'auto con l'app (eCabs, Bolt). In tutto, fino a City Gate, sono circa 30–45 minuti.",
 tk:"Biglietto: il bus TD4 costa 3 € a persona, pagato a bordo in contanti o con carta contactless (1,50 € con la carta personale Tallinja; gratis con la Explore Unlimited Travel Card). Il taxi con tariffa fissa dall'aeroporto alla Valletta costa circa 17–20 € a vettura (prezzo da guide, da confermare al banco prima di salire); un'auto con app costa di solito 12–20 € ma può salire nelle ore di punta. Per i bus urbani della Valletta vedi i biglietti nella scheda dei mezzi.",
 gm:"Malta International Airport, Luqa",
 tips:["I bus Tallinja Direct (TD) costano di più dei bus normali (3 € a bordo) e non entrano nel tetto settimanale della carta personale: se arrivi con la carta Explore ricordati che sul TD4 è gratis.","Il banco taxi è nella sala arrivi: si paga il prezzo fisso e si riceve la ricevuta prima di salire. Il banco cambia le tariffe ogni tanto: chiedi il prezzo prima.","Il tragitto da City Gate al centro è tutto a piedi, in leggera salita e su pietra: scarpe comode."]}
};
/* linee (tracciati indicativi) */
var SEG={
td4:{c:"#cf142b",n:"Bus TD4 Airport Direct",p:[[35.8575,14.4775,"Aeroporto",2],[35.8880,14.4950,"Floriana"],[35.8992,14.5085,"City Gate",2]]},
fer:{c:"#1d6fa5",n:"Traghetto per le Tre Città",p:[[35.8933,14.5117,"Lascaris Wharf",2],[35.8878,14.5222,"Birgu",2]]}
};
var START=[35.8992,14.5085];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
sjohn:{t:"Co-Cattedrale di San Giovanni e il Caravaggio",z:"A",p:1,min:75,id:90,max:130,pos:[35.8974,14.5137],q:"St John's Co-Cathedral, Valletta",cls:"",sun:0,tk:[15,"Co-Cattedrale di San Giovanni (15 €)",1,1],
 win:function(){return[9*60,16*60]},
 d:"La chiesa dei Cavalieri di Malta, da fuori severa e dentro tutta d'oro: pavimento di lapidi di marmo intarsiato e volta dipinta da Mattia Preti. Nell'oratorio c'è la «Decollazione di San Giovanni Battista» di Caravaggio, l'unico quadro firmato dall'artista.",
 m:"Aperta da lunedì a sabato dalle 9 alle 16:45, ultimo ingresso alle 16 (sito della cattedrale). La domenica e nei giorni festivi è chiusa ai visitatori. Biglietto 15 € per gli adulti, con audioguida; prezzi e orari sul sito stjohnscocathedral.com. Servono spalle e ginocchia coperte."},
palace:{t:"Palazzo del Gran Maestro",z:"A",p:1,min:75,id:90,max:130,pos:[35.8972,14.5125],q:"Grand Master's Palace, Valletta",cls:"",sun:1,tk:[12,"Palazzo del Gran Maestro (12 €)",1,1],
 win:function(){return[9*60,17*60]},
 d:"Il palazzo che fu residenza dei Gran Maestri e oggi è la sede del Presidente di Malta. Si visitano le Sale di Stato con gli arazzi e gli affreschi, e l'Armeria, una delle raccolte di armature più grandi d'Europa.",
 m:"Biglietto 12 € per gli adulti (Heritage Malta): ridotti 10 € per i giovani e gli over 60, 8 € per i bambini. Orari esatti non letti (le pagine di Heritage Malta li mostrano in immagine): in genere aperto ogni giorno, ma da confermare su heritagemalta.mt. La Sala del Trono è chiusa fino a nuovo avviso. Le Sale di Stato restano chiuse fino alle 13:30 il 28 ottobre, il 18 novembre e il 2 dicembre 2026, e tutto il giorno il 26 ottobre 2026; l'Armeria è aperta anche in quei giorni. Chiuso il 24, 25 e 31 dicembre, l'1 gennaio e il Venerdì Santo."},
manoel:{t:"Teatro Manoel",z:"A",p:4,min:45,id:60,max:90,pos:[35.8995,14.5112],q:"Manoel Theatre, Valletta",cls:"",sun:0,
 d:"Uno dei teatri più antichi d'Europa ancora in uso, costruito nel 1731: una sala barocca tutta d'oro, con tre ordini di palchi dipinti. Si visita con una breve visita guidata.",
 m:"Orari delle visite e prezzo non verificati: controlla il sito del teatro (teatrumanoel.mt) e prenota online. Le visite non si fanno quando ci sono prove o spettacoli."},
barrakka:{t:"Giardini Upper Barrakka e Saluting Battery",z:"B",p:1,min:50,id:70,max:100,pos:[35.8948,14.5114],q:"Upper Barrakka Gardens, Valletta",cls:"walk",sun:1,
 d:"Il giardino a terrazza sulle mura, con la vista migliore sul Grand Harbour e sulle Tre Città di fronte. Sotto, la batteria dei cannoni spara due colpi al giorno: a mezzogiorno e alle 16.",
 m:"Il giardino è aperto ogni giorno dalle 7 alle 22 e l'ingresso è gratis. L'ascensore panoramico per scendere al livello del porto costa 1 € (andata e ritorno), aperto dalle 7 alle 21 da novembre a maggio. La Saluting Battery è aperta ogni giorno dalle 10 alle 17; il colpo di cannone è alle 12 (con un breve commento dalle 11:45) e alle 16. L'ingresso alla batteria è a pagamento (prezzo non letto, vedi salutingbattery.com). Chiusa a Natale, Capodanno, Venerdì Santo, Pasqua e il 15 agosto."},
lascaris:{t:"Lascaris War Rooms",z:"B",p:3,min:75,id:100,max:130,pos:[35.8943,14.5110],q:"Lascaris War Rooms, Valletta",cls:"",sun:0,tk:[20,"Lascaris War Rooms (20 €)",1,1],
 win:function(){return[9*60+30,17*60]},
 d:"I tunnel scavati sotto le mura, usati dagli inglesi come centro di comando nella seconda guerra mondiale: da qui furono guidate la difesa dell'isola e l'invasione della Sicilia nel 1943. Si vedono la sala operativa e le mappe originali.",
 m:"Aperto da lunedì a sabato dalle 9:30 alle 17:30, ultimo ingresso alle 17; la domenica non risulta aperto. Biglietto adulti (dai 16 anni) 20 €, ridotto 19 € per gli over 60, bambini 7 €. Visite guidate alle 10:30 e alle 12:30 a 5 € in più. Si paga solo con carta, conviene comprare il biglietto online (lascariswarrooms.com)."},
elmo:{t:"Forte Sant'Elmo e Museo Nazionale della Guerra",z:"C",p:2,min:90,id:110,max:150,pos:[35.8998,14.5192],q:"National War Museum, Fort St Elmo, Valletta",cls:"",sun:1,tk:[10,"Museo Nazionale della Guerra (10 €)",1,1],
 win:function(){return[9*60,17*60]},
 d:"Il forte in cima alla penisola, dove nel 1565 si combatté l'inizio del Grande Assedio. Dentro, il museo racconta la storia militare di Malta, con aerei, mezzi e cimeli della seconda guerra mondiale, tra cui la «Gloster Gladiator» e la jeep di Eisenhower.",
 m:"Aperto ogni giorno dalle 9 alle 17 da ottobre a marzo (ultimo ingresso 16:30), dalle 9 alle 18 da aprile a settembre. Biglietto adulti 10 €, ridotto 7,50 € per giovani, over 60 e studenti, 5,50 € per i bambini (6–11 anni). La sezione sulla Prima guerra mondiale è chiusa fino a nuovo avviso. Chiuso il 24, 25 e 31 dicembre, l'1 gennaio e il Venerdì Santo."},
gate:{t:"City Gate, Parlamento e Republic Street",z:"A",p:2,min:45,id:70,max:100,pos:[35.8992,14.5085],q:"City Gate, Valletta",cls:"walk",sun:1,
 d:"L'ingresso moderno della città: la porta, il Parlamento di Renzo Piano con la facciata scolpita come una cava, le rovine del vecchio teatro dell'Opera e la Fontana del Tritone. Da qui parte Republic Street, la via principale, dritta fino al forte.",
 m:"Si cammina gratis, a tutte le ore. Il chiosco di dolci fritti ai datteri (imqaret) sotto la porta è aperto ogni giorno dalle 8 alle 22 (orario da guide, da confermare). Il Parlamento si visita solo con visite guidate gratuite su prenotazione (orari da controllare sul sito del Parlamento: non letti)."},
strait:{t:"Strait Street e i vicoli del centro",z:"A",p:4,min:50,id:75,max:100,pos:[35.8967,14.5133],q:"Strait Street, Valletta",cls:"walk",sun:1,
 d:"La stradina stretta, parallela a Republic Street, che per decenni fu il quartiere dei marinai: bar, musica e locali notturni. Oggi è piena di bar, ristoranti e botteghe di artigiani. Le vie in discesa verso il porto hanno viste sul mare a ogni incrocio.",
 m:"Si cammina gratis. Di giorno è tranquilla e la vita si sposta alla sera; i locali cambiano gestione spesso, quindi gli orari vanno controllati caso per caso."},
hastings:{t:"Giardini Hastings e bastioni sul porto di Marsamxett",z:"B",p:5,min:30,id:50,max:70,pos:[35.8958,14.5072],q:"Hastings Gardens, Valletta",cls:"walk",sun:1,
 d:"Il giardino sul bastione, sul lato opposto della città rispetto al Grand Harbour: da qui si vedono Sliema, Manoel Island e la baia di Marsamxett.",
 m:"Giardino pubblico, ingresso gratuito. Orari di apertura non verificati."},
birgu:{t:"Birgu e le Tre Città",z:"D",p:3,min:150,id:180,max:240,pos:[35.8878,14.5222],q:"Birgu (Vittoriosa), Malta",cls:"walk",multi:1,sun:1,
 d:"Il borgo fortificato dei Cavalieri sul lato opposto del porto, più antico della Valletta: vicoli stretti, la baia con gli yacht e la vista sulla Valletta dall'acqua. Si arriva in dieci minuti di traghetto.",
 m:"Il traghetto parte dalla banchina sotto i Giardini Upper Barrakka (Lascaris Wharf), raggiungibile anche con l'ascensore panoramico (1 €): la corsa costa circa 2 € a persona (prezzo da guide del 2026, da confermare). I traghetti non fanno parte della rete dei bus e non sono compresi nella Explore card. Dopo le 19:30 i prezzi salgono (circa 3,50 €). Il forte di Sant'Angelo e i musei di Birgu hanno orari propri, non verificati."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
var P={start:START,sjohn:STOPS.sjohn.pos,palace:STOPS.palace.pos,manoel:STOPS.manoel.pos,barrakka:STOPS.barrakka.pos,lascaris:STOPS.lascaris.pos,elmo:STOPS.elmo.pos,gate:STOPS.gate.pos,strait:STOPS.strait.pos,hastings:STOPS.hastings.pos,birgu:STOPS.birgu.pos};
/* a piedi tra due tappe: tracciato diretto, tempi stimati sulla distanza */
function WK(a,b,min,tab,tba){P2(a,b,min,"walk",tab,tba,{f:[W([P[a],P[b]])],r:[W([P[b],P[a]])]})}
WK("start","sjohn",12,"A piedi da City Gate per tutta Republic Street fino a San Giovanni (circa 12 minuti, in leggera salita).","A piedi per Republic Street fino a City Gate, circa 12 minuti.");
WK("start","palace",10,"A piedi da City Gate per Republic Street fino al Palazzo del Gran Maestro, circa 10 minuti.","A piedi per Republic Street fino a City Gate, circa 10 minuti.");
WK("start","gate",1,"Sei già a City Gate.","Sei già a City Gate.");
WK("gate","palace",9,"A piedi per Republic Street fino al Palazzo del Gran Maestro, circa 9 minuti.","A piedi per Republic Street fino a City Gate, circa 9 minuti.");
WK("gate","sjohn",11,"A piedi per Republic Street e poi in St John Street fino alla cattedrale, circa 11 minuti.","A piedi fino a Republic Street e a City Gate, circa 11 minuti.");
WK("sjohn","palace",4,"A piedi per Republic Street fino al Palazzo, circa 4 minuti.","A piedi fino a St John Street, circa 4 minuti.");
WK("palace","manoel",4,"A piedi fino a Old Theatre Street, circa 4 minuti.","A piedi fino al Palazzo del Gran Maestro, circa 4 minuti.");
WK("sjohn","manoel",5,"A piedi per Old Theatre Street fino al Teatro Manoel, circa 5 minuti.","A piedi fino a San Giovanni, circa 5 minuti.");
WK("palace","barrakka",10,"A piedi per South Street e Castille Place fino ai giardini, circa 10 minuti.","A piedi fino al Palazzo del Gran Maestro, circa 10 minuti.");
WK("sjohn","barrakka",11,"A piedi per Merchants Street e South Street fino ai giardini, circa 11 minuti.","A piedi fino a San Giovanni, circa 11 minuti.");
WK("barrakka","lascaris",5,"A piedi, uscendo dai giardini lungo le mura fino all'ingresso delle War Rooms, circa 5 minuti.","A piedi fino ai giardini Upper Barrakka, circa 5 minuti.");
WK("barrakka","hastings",8,"A piedi lungo i bastioni fino ai giardini Hastings, circa 8 minuti.","A piedi lungo i bastioni fino ai giardini Upper Barrakka, circa 8 minuti.");
WK("start","barrakka",12,"A piedi da City Gate per Castille Place fino ai giardini, circa 12 minuti.","A piedi fino a City Gate, circa 12 minuti.");
WK("start","hastings",8,"A piedi da City Gate lungo i bastioni fino ai giardini Hastings, circa 8 minuti.","A piedi fino a City Gate, circa 8 minuti.");
WK("hastings","lascaris",10,"A piedi lungo le mura fino a Lascaris, circa 10 minuti.","A piedi fino ai giardini Hastings, circa 10 minuti.");
WK("start","lascaris",14,"A piedi da City Gate fino alle War Rooms, circa 14 minuti.","A piedi fino a City Gate, circa 14 minuti.");
WK("palace","strait",6,"A piedi per Strait Street, circa 6 minuti.","A piedi fino al Palazzo del Gran Maestro, circa 6 minuti.");
WK("sjohn","strait",5,"A piedi in discesa fino a Strait Street, circa 5 minuti.","A piedi in salita fino a San Giovanni, circa 5 minuti.");
WK("strait","elmo",12,"A piedi fino al Forte Sant'Elmo, circa 12 minuti.","A piedi fino a Strait Street, circa 12 minuti.");
WK("sjohn","elmo",14,"A piedi per Republic Street fino al forte Sant'Elmo, circa 14 minuti.","A piedi per Republic Street fino a San Giovanni, circa 14 minuti.");
WK("palace","elmo",16,"A piedi per Republic Street fino al forte Sant'Elmo, circa 16 minuti.","A piedi per Republic Street fino al Palazzo, circa 16 minuti.");
WK("start","elmo",25,"A piedi per tutta Republic Street fino al forte, circa 25 minuti.","A piedi per Republic Street fino a City Gate, circa 25 minuti.");
WK("start","strait",14,"A piedi da City Gate lungo Republic Street e poi giù per Strait Street, circa 14 minuti.","A piedi fino a City Gate, circa 14 minuti.");
WK("start","manoel",9,"A piedi da City Gate per Republic Street fino al Teatro Manoel, circa 9 minuti.","A piedi fino a City Gate, circa 9 minuti.");
WK("lascaris","elmo",24,"A piedi per Republic Street fino al forte Sant'Elmo, circa 24 minuti.","A piedi per Republic Street fino a Lascaris, circa 24 minuti.");
P2("barrakka","birgu",25,"walk","Scendi con l'ascensore panoramico (1 €) fino al porto e prendi il traghetto per Birgu (circa 10 minuti di mare), in tutto circa 25 minuti.","Traghetto da Birgu fino a Lascaris Wharf (circa 10 minuti), poi ascensore panoramico (1 €) fino ai giardini, circa 25 minuti.",{f:[W([P.barrakka,[35.8933,14.5117]]),["fer","Lascaris Wharf","Birgu"]],r:[["fer","Birgu","Lascaris Wharf"],W([[35.8933,14.5117],P.barrakka])]});
P2("start","birgu",35,"walk","A piedi da City Gate fino ai giardini Upper Barrakka (circa 12 minuti), poi ascensore e traghetto per Birgu, circa 35 minuti in tutto.","Traghetto da Birgu fino a Lascaris Wharf e ascensore, poi a piedi fino a City Gate, circa 35 minuti.",{f:[W([P.start,P.barrakka]),W([P.barrakka,[35.8933,14.5117]]),["fer","Lascaris Wharf","Birgu"]],r:[["fer","Birgu","Lascaris Wharf"],W([[35.8933,14.5117],P.barrakka]),W([P.barrakka,P.start])]});
/* ritorno in aeroporto: a piedi fino a City Gate e bus TD4 */
var RET={
MLA:{
 A:{min:45,txt:"A piedi fino al terminal dei bus davanti a City Gate, accanto alla Fontana del Tritone, poi bus TD4 per l'aeroporto (circa 20–30 minuti). Biglietto 3 € a bordo, in contanti o con carta contactless (gratis con la Explore card). In alternativa taxi bianco a tariffa fissa (circa 17–20 € a vettura) o auto con app. Controlla l'orario del TD4 sul sito di Malta Public Transport: non l'ho trovato.",g:[["td4","City Gate","Aeroporto"]]}}
};
var ARR={
MLA:[["td4","Aeroporto","City Gate"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
cordina:{n:"Caffe Cordina",a:"Republic Street, Piazza della Repubblica",z:"A",r:"4,2",pos:[35.8985,14.5114],h:D7("08:00-22:00"),
 d:"Il caffè storico della Valletta, aperto dal 1837, sulla piazza davanti alla biblioteca: colazione, pastizzi, dolci e pranzi veloci ai tavolini all'aperto. È un posto per sedersi, non per correre.",pr:"Colazione 8–15 €; un pastizz costa circa 1,50 € (listino non visto). Orari da guide, da confermare."},
lot61:{n:"Lot Sixty One",a:"61 Republic Street",z:"A",r:"4,5",pos:[35.8982,14.5098],h:["08:00-17:00","08:00-17:00","08:00-17:00","08:00-17:00","08:00-17:00","08:30-16:00","08:30-16:00"],
 d:"Un caffè piccolo e luminoso su Republic Street, con colazioni, uova, toast e piatti da brunch fatti con prodotti locali. Va bene per un inizio di giornata più leggero del solito.",pr:"Colazione o brunch 10–18 € (listino non visto). Orari da guide, da confermare."},
society:{n:"Cafe Society",a:"St John Street",z:"A",r:"4,4",pos:[35.8975,14.5136],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","09:00-15:00"],
 d:"Un caffè in una via laterale a due passi da San Giovanni, con colazioni, panini e dolci. Si sta bene anche con la pioggia.",pr:"Colazione 8–14 € (listino non visto). Orari da guide, da confermare."},
bridge:{n:"Bridge Bar",a:"Upper Barrakka, Castille Wharf",z:"B",r:"4,3",pos:[35.8944,14.5117],h:D7("08:00-23:00"),
 d:"Il bar-ristorante vicino ai giardini Upper Barrakka, con terrazza e vista sul Grand Harbour: colazione fino a mezzogiorno, poi panini, insalate e piatti caldi. Lo scegli per la vista più che per il menù.",pr:"Colazione 10–16 € (listino non visto). Orari da guide, da confermare."},
sphinx:{n:"Sphinx Pastizzeria",a:"Merchants Street",z:"A",r:"4,3",pos:[35.8979,14.5123],h:["07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-15:00"],
 d:"Un banco di pastizzi, le sfogliatine di pasta fillo con ricotta o piselli: si mangiano in piedi, caldi, con un tè o un caffè. È il pranzo più economico e più maltese della città.",pr:"Un pastizz costa circa 0,50–1 € (listino non visto). Orari da guide, da confermare."},
museumcafe:{n:"Museum Cafe",a:"Melita Street",z:"A",r:"4,2",pos:[35.8995,14.5099],h:["07:00-16:00","07:00-16:00","07:00-16:00","07:00-16:00","07:00-16:00","07:00-13:00",""],
 d:"Un caffè di pranzo dove si prende la ftira maltese, un pane piatto con tonno, capperi, olive e cipolla, o un panino. Chiude presto e la domenica non apre.",pr:"Una ftira costa circa 4–8 € (listino non visto). Orari da guide, da confermare."},
aaron:{n:"Aaron's Kitchen",a:"107 Archbishop Street",z:"A",r:"4,5",pos:[35.8969,14.5101],h:["12:00-15:00,18:30-22:30","12:00-15:00,18:30-22:30","12:00-15:00,18:30-22:30","12:00-15:00,18:30-22:30","12:00-15:00,18:30-22:30","12:00-15:00,18:30-22:30",""],
 d:"Un ristorante di cucina maltese casalinga: tra settembre e dicembre c'è la torta di lampuki, il pesce di stagione in crosta, e gli stufati. Domenica chiuso.",pr:"Un piatto principale costa circa 20–30 € (listino non visto). Orari da guide, da confermare."},
doffice:{n:"D'Office Bistro",a:"132 Archbishop Street",z:"A",r:"4,3",pos:[35.8966,14.5107],h:D7("11:30-22:30"),
 d:"Un bistrot a pochi passi dal Palazzo del Gran Maestro, con braġioli (involtini di manzo) e altri piatti maltesi, anche a pranzo e senza pausa.",pr:"Un piatto principale costa circa 18–26 € (listino non visto). Orari da guide, da confermare."},
kiosk:{n:"Chiosco degli imqaret a City Gate",a:"Piazza della Fontana del Tritone",z:"A",r:"4,0",pos:[35.8996,14.5079],h:D7("08:00-22:00"),
 d:"Il chiosco sotto la porta della città, dove si friggono gli imqaret, dolci di pasta di datteri: caldi, unti e buonissimi, da mangiare mentre si entra a piedi in città.",pr:"Pochi pezzi costano 1–2 € (listino non visto). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["cordina","lot61","society"],B:["bridge","cordina"],C:["society","cordina"],D:["cordina","lot61"]},
pra:{A:["sphinx","museumcafe","doffice"],B:["bridge","sphinx"],C:["sphinx","doffice"],D:["sphinx","museumcafe"]},
cen:{A:["aaron","doffice","cordina"],B:["doffice","aaron","bridge"],C:["aaron","doffice"],D:["aaron","doffice"]},
snk:{A:["kiosk","sphinx","cordina"],B:["bridge","kiosk"],C:["sphinx","kiosk"],D:["kiosk","sphinx"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"San Giovanni, Palazzo del Gran Maestro e Republic Street",acts:["gate","sjohn","palace"],need:210,core:1},
{id:"porto",t:"Giardini Barrakka, Lascaris e Forte Sant'Elmo",acts:["barrakka","lascaris","elmo"],need:260,core:1},
{id:"tre",t:"Birgu e le Tre Città",acts:["birgu"],need:180},
{id:"vicoli",t:"Teatro Manoel, Strait Street e Hastings",acts:["manoel","strait","hastings"],need:140}
];
var ORDER=["sjohn","palace","barrakka","elmo","gate","lascaris","birgu","manoel","strait","hastings"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["val","Valletta (centro storico)",[35.8975,14.5125],"A"],
["flo","Floriana",[35.8930,14.5040],"A"],
["sli","Sliema / Gżira",[35.9125,14.5035],"A"],
["stj","St Julian's / Paceville",[35.9185,14.4890],"A"],
["altro","Altra zona (scrivi l'indirizzo)",[35.8992,14.5085],""]
];
/* imposta di soggiorno: eco-contribution, 1,50 € a notte a persona dal 1° luglio 2026 (tetto 22,50 € a soggiorno); da confermare */
var TAX=[["h5","Hotel 4–5 stelle",1.5],["h3","Hotel fino a 3 stelle, B&B o appartamento",1.5],["host","Ostello o struttura economica",1.5],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Kafe u pastizz","un caffè con un pastizz, la sfogliatina con ricotta o piselli."],["Ftira bil-bajd","un pane piatto con uova, la colazione salata maltese."],["Te' u ħobż","tè e pane, per una colazione leggera."]],
pra:[["Pastizz tar-rikotta","pastizz con ricotta, caldo, da mangiare in piedi."],["Ftira","pane piatto con tonno, capperi, olive e pomodoro."],["Ħobż biż-żejt","pane con olio, pomodoro, tonno e olive: il panino maltese."]],
cen:[["Stuffat tal-fenek","stufato di coniglio, il piatto nazionale, di solito con pasta."],["Aljotta","zuppa di pesce con aglio, riso e pomodoro."],["Torta tal-lampuki","torta di lampuki, pesce di stagione (da fine agosto a dicembre)."],["Braġioli","involtini di manzo con olive e piselli."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","City Gate e il Parlamento","Foto","La porta moderna e il Parlamento dalla piazza, appena si arriva: la facciata di pietra scolpita prende bene la luce del mattino.",[35.8992,14.5085],"City Gate, Valletta","gate"],
["📷","Republic Street dall'alto","Foto","La via principale dritta fino al forte, vista dalla salita davanti al Parlamento.",[35.8988,14.5092],"Republic Street, Valletta","gate"],
["📷","La facciata di San Giovanni","Foto","La facciata semplice con i due campanili, in St John Street: poca luce, meglio dalla piazza davanti.",[35.8974,14.5137],"St John's Co-Cathedral, Valletta","sjohn"],
["📷","Il Palazzo del Gran Maestro","Foto","La facciata dal lato di Palace Square, con le guardie in uniforme.",[35.8972,14.5125],"Palace Square, Valletta","palace"],
["🤳","Le balconate di legno colorato","Selfie","I balconi chiusi di legno, in verde, giallo e blu, lungo Merchants Street e le vie in discesa: il simbolo fotografico della Valletta.",[35.8980,14.5125],"Merchants Street, Valletta","strait"],
["📷","Il Grand Harbour dalle Barrakka","Foto","La vista del porto e delle Tre Città dalla balconata dei giardini Upper Barrakka: il tramonto qui è molto bello.",[35.8948,14.5114],"Upper Barrakka Gardens, Valletta","barrakka"],
["📷","Il cannone delle 12 e delle 16","Foto","La Saluting Battery, sotto i giardini, con la salva di mezzogiorno.",[35.8940,14.5116],"Saluting Battery, Valletta","barrakka"],
["📷","Il Forte Sant'Elmo","Foto","I bastioni sul mare in punta alla penisola, con il faro e il Mediterraneo.",[35.8998,14.5192],"Fort St Elmo, Valletta","elmo"],
["📷","Valletta da Birgu","Foto","Le mura della Valletta e le cupole viste dal lungomare di Birgu, soprattutto al tramonto.",[35.8878,14.5222],"Birgu waterfront, Malta","birgu"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2026-10-26",t:"Palazzo del Gran Maestro: Sale di Stato chiuse il 26 ottobre",x:"Il 26 ottobre 2026 (giorno del bilancio dello Stato) le Sale di Stato sono chiuse tutto il giorno; l'Armeria resta aperta. La Sala del Trono è chiusa fino a nuovo avviso."},
{from:"2026-10-14",to:"2026-10-28",t:"Palazzo del Gran Maestro: il 28 ottobre Sale di Stato chiuse fino alle 13:30",x:"Anche il 18 novembre e il 2 dicembre 2026 le Sale di Stato aprono solo dalle 13:30. L'Armeria è aperta come sempre. Le date possono cambiare: controlla heritagemalta.mt."},
{from:"2026-10-14",to:"2027-06-30",t:"Il bus dall'aeroporto è il TD4",x:"Dal 2025 le vecchie linee espresse X1–X4 sono state sostituite dalle linee Tallinja Direct: per la Valletta c'è il TD4 (3 € a bordo). Orari e durata esatti non letti: controlla publictransport.com.mt."},
{from:"2026-10-14",to:"2027-06-30",t:"Tassa di soggiorno più alta dal 1° luglio 2026",x:"L'eco-contribution è salita da 0,50 € a 1,50 € a notte a persona (tetto di 22,50 € per soggiorno) dal 1° luglio 2026 (fonte: Malta Institute of Taxation, da confermare). Spesso si paga alla struttura."},
{from:"2026-12-20",to:"2027-01-02",t:"Natale e Capodanno: musei chiusi e negozi serrati",x:"Heritage Malta e le attrazioni principali chiudono il 24, 25 e 31 dicembre e l'1 gennaio. L'8 dicembre (Immacolata) e il 13 dicembre (Festa della Repubblica) sono festivi e molte attività chiudono."}
];
/* clima medio di La Valletta (indicativo, massime/minime) */
var CLIM=[[16,10],[16,10],[18,11],[21,13],[25,16],[29,20],[32,23],[32,24],[29,22],[26,19],[21,15],[17,12]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== La Valletta: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="sjohn"&&WD===6)meta+=" Oggi è domenica: la Co-Cattedrale di San Giovanni è chiusa ai visitatori.";
if(it.id==="lascaris"&&WD===6)meta+=" Oggi è domenica: le Lascaris War Rooms non risultano aperte.";
return meta}
Object.assign(C,{id:"valletta",n:"La Valletta",cn:"Malta",e:"⚓",flag:"🇲🇹",col:["#cf142b","#e8e8e8","#c9a24a"],k:"la valletta valletta malta",
TZ:"Europe/Malta",LL:[35.8989,14.5146],CC:"mt",QN:"Valletta",BK:"Valletta",ARE:/valletta|floriana|\bvlt\s?\d{4}\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"mt-MT",LANGN:"maltese",WATER:"osm",TAXDEF:"h3",TAXMAXN:15,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"City Gate",q:"City Gate, Valletta"},
SINGLE:{acts:["gate","sjohn","palace","barrakka","strait"],ins:[]},
EXCL:[],
DICON:{sjohn:"⛪",palace:"👑",manoel:"🎭",barrakka:"🌅",lascaris:"🛡️",elmo:"🏰",gate:"🚪",strait:"🏘️",hastings:"🌳",birgu:"⛴️"},
ZN:{A:"nel centro della Valletta",B:"vicino ai giardini Barrakka",C:"verso Forte Sant'Elmo",D:"a Birgu"},
NEAR:{col:"caffè",pra:"pasticceria o locale veloce",cen:"locale",snk:"chiosco o pasticceria"},
SE:{cordina:"☕",lot61:"🍳",society:"☕",bridge:"🌅",sphinx:"🥟",museumcafe:"🥪",aaron:"🍲",doffice:"🍽️",kiosk:"🍯"},
TR:{one:2,cap:7,lbl:"Bus Tallinja e traghetti",
 air:{MLA:{one:3,n:"Bus TD4 per la Valletta (3 € a bordo)"}},
 passes:[
 {n:"Explore card 7 giorni",d:7,p:21,only:function(T){return T.n>=4},note:"La Explore card 7 giorni (circa 21–25 €, da confermare) vale per bus illimitati su tutta l'isola, compreso il TD4 per l'aeroporto, ma non sui traghetti."}],
 note:"Prezzi da guide del 2026, non letti sul sito di Malta Public Transport: il biglietto singolo sui bus normali costa circa 2 € d'estate (da metà giugno a metà ottobre) e 1,50 € d'inverno; con la carta personale Tallinja (15 €, una tantum) la corsa costa 0,75 €. I bus Tallinja Direct (come il TD4 per l'aeroporto) costano 3 € a bordo. I traghetti per Sliema (circa 1,50 € a corsa) e per le Tre Città (circa 2 €) sono separati dai bus; l'ascensore delle Barrakka costa 1 €. La Valletta si visita tutta a piedi: i bus servono per l'aeroporto e per uscire dal centro."},
FOOD:{co:[8,"Colazione al caffè"],pr:[7,"Pranzo (pastizzi, ftira o panino)"],ce:[22,"Cena (cucina maltese)"],sp:[5,"Spuntini e dolci"]},
T:{ride:"A piedi o in traghetto",move:"quasi tutto a piedi, con qualche salita e scalinata",bags:"«Nista' nħalli l-bagalji hawn?» (in inglese: «Can I leave my bags here?»)",bagsPM:"«Can I leave my bags here until this afternoon?»",bagsAM:"«Can I leave my bags here until noon?»",
pra:"Una pasticceria o un locale veloce",praZ:{A:"Sulla piazza della Repubblica e in Merchants Street i ristoranti con il menù in piazza costano più delle vie laterali: per pranzare spendendo poco cerca un banco di pastizzi o un bar dove si mangia in piedi.",B:"Il lungomare e i locali con vista sul porto costano molto: spesso si paga la vista."},
freeLong:"Qualche idea: un caffè con un pastizz in una via laterale, una passeggiata sui bastioni, i giardini Upper Barrakka (gratis) o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè.",
remind:"Domenica la cattedrale di San Giovanni è chiusa, e molti musei hanno l'ultimo ingresso mezz'ora prima della chiusura. Prenota online San Giovanni, le Lascaris War Rooms e le visite al Teatro Manoel.",
rain1:"Al coperto: la Co-Cattedrale di San Giovanni, il Palazzo del Gran Maestro, il Museo Nazionale della Guerra e le Lascaris War Rooms.",
rainM:"Al coperto: San Giovanni, Palazzo del Gran Maestro, Lascaris War Rooms, Museo Nazionale della Guerra e il Teatro Manoel.",
water:"A Malta l'acqua del rubinetto viene in gran parte da impianti di dissalazione e non è molto gradevole al gusto: molti la bevono, ma la maggior parte compra acqua in bottiglia. Attivate «Acqua» sulla mappa per le fontanelle (dati OpenStreetMap, poche).",
kitchen:"A Malta si pranza tra le 12:30 e le 15 e si cena dalle 19: i caffè servono tutto il giorno, ma molti ristoranti chiudono nel pomeriggio.",
night:[["🍷","Un calice di vino maltese, o una birra Cisk, in una delle vie in discesa verso il porto: la sera Strait Street si anima."],["🕙","Le cucine servono fino alle 22–22:30; i bus notturni (N) girano il venerdì e il sabato dalle 23 alle 4, circa ogni ora, a 3 €."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua è dissalata, il gusto non è il migliore)",
fuso:"Malta ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (a Malta la presa è di tipo inglese, a tre spinotti: porta un adattatore)",
foodNote:"I pasti sono stime per caffè e locali medi: una colazione sta intorno agli 8–15 €, un pranzo veloce con i pastizzi sotto i 7 €, una cena con un piatto principale tra 18 e 30 €. A Malta si paga quasi ovunque con la carta; ai banchi di pastizzi e ai chioschi conviene avere qualche euro in contanti.",
taxNote:"A Malta si paga l'eco-contribution: dal 1° luglio 2026 è di 1,50 € a notte a persona dai 18 anni in su, con tetto di 22,50 € a soggiorno (fonte: Malta Institute of Taxation; da confermare, perché altre pagine riportano ancora la vecchia tariffa di 0,50 €). Spesso la struttura la fa pagare a parte.",
mcrit:"Criteri: caffè e locali con almeno 4 stelle su Google, cucina maltese, niente catene. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["A Malta si parla maltese e inglese, due lingue ufficiali, e molti capiscono anche l'italiano: puoi chiedere indicazioni in italiano o in inglese. Il bus TD4 per la Valletta parte dal piazzale davanti al terminal: guarda il tabellone o chiedi all'info point.","💧 Passa i controlli con la borraccia vuota e riempila dopo."],
CHECK:[["tk","Biglietto del bus TD4 per la Valletta (3 € a bordo, contanti o contactless) e qualche euro per i pastizzi",function(E){return true}],["sj","Biglietto per la Co-Cattedrale di San Giovanni (15 €): chiusa la domenica",["sjohn"]],["pal","Biglietto per il Palazzo del Gran Maestro (12 €): le Sale di Stato hanno chiusure speciali il 26 e 28 ottobre",["palace"]],["lw","Biglietto per le Lascaris War Rooms (20 €): meglio online",["lascaris"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per pastizzi e chioschi"]],
NUM:{1:["wieħed","uèhed"],2:["tnejn","tneyn"],3:["tlieta","tlièta"],4:["erbgħa","èrba"],5:["ħamsa","hàmsa"],6:["sitta","sìtta"],7:["sebgħa","sèba"],8:["tmienja","tmìenia"],9:["disgħa","dìsa"],10:["għaxra","àshra"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Bonġu / Bonswa","bonju / bonsùa"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Mejda għal "+nu[0]+", jekk jogħġbok","mèida al "+nu[1]+", yek yodzbok"],["Un caffè e un pastizz, per favore","Kafè u pastizz, jekk jogħġbok","cafè u pastìts, yek yodzbok"],["Acqua, per favore","Ilma, jekk jogħġbok","ilma, yek yodzbok"],["Il conto, per favore","Il-kont, jekk jogħġbok","il-kont, yek yodzbok"],["Posso pagare con la carta?","Nista' nħallas bil-karta?","nìsta nhalàs bil-càrta"],["Quanto costa?","Kemm jiswa?","kem yìsua"],["Dov'è la fermata del bus?","Fejn hi l-waqfa tal-karozza?","feyn i l-uàkfa tal-carotsa"],["Qual è il bus per l'aeroporto?","Liema karozza tmur l-ajruport?","liema carotsa tmur l-airport"]];
if(M)fr=fr.concat([["Ho una prenotazione","Għandi prenotazzjoni","àndi prenotatsiòni"],["Posso lasciare i bagagli?","Nista' nħalli l-bagalji hawn?","nìsta nhàlli l-bagàli haun"],["A che ora è il check-out?","Fi x'ħin hu l-check-out?","fi shin u l-ceck-aut"]]);
return fr.concat([["Mi scusi","Skużani","skuzàni"],["Grazie mille!","Grazzi ħafna!","gràtsi àfna"]])},
taxTxt:function(tx){return "Eco-contribution di Malta: "+(tx[2]?"1,50 € a notte per persona dai 18 anni in su ("+tx[1].toLowerCase()+"), con tetto di 22,50 € a soggiorno":"non si paga se sei ospite di amici o parenti")+"; dal 1° luglio 2026 (da confermare: alcune fonti riportano ancora 0,50 €). Spesso la struttura la fa pagare a parte."},
STAYTIPS:["La Valletta è piccola e cara: molti dormono a Sliema o a St Julian's, dove ci sono più alberghi e più scelta, e raggiungono la Valletta in traghetto da Sliema (circa 1,50 €, 5 minuti) o in bus. Dentro la città vecchia, di sera, ci sono salite e scalinate."],
ZONES:[
["🚌 Bus, traghetti e biglietti",["Il bus TD4 dall'aeroporto costa 3 € a bordo; la Explore card lo comprende, ma non i traghetti.","Il biglietto singolo sui bus normali costa circa 2 € d'estate e 1,50 € d'inverno (0,75 € con la carta personale Tallinja): prezzi da guide, da confermare.","I traghetti per Sliema e per le Tre Città partono da sotto le mura: l'ascensore delle Barrakka (1 €) scende fino al porto.","La Valletta si visita a piedi: Republic Street è lunga meno di un chilometro e mezzo."]],
["🏛️ Il cuore: San Giovanni e il Palazzo",["La Co-Cattedrale di San Giovanni è chiusa la domenica; le sale e l'oratorio col Caravaggio costano 15 € in un solo biglietto con audioguida.","Il Palazzo del Gran Maestro è a quattro minuti: il biglietto da 12 € comprende le Sale di Stato e l'Armeria.","Il 26 ottobre e il 28 ottobre 2026 le Sale di Stato hanno chiusure speciali (vedi gli avvisi)."],["sjohn","palace","manoel"]],
["⚓ Il porto e le mura",["Dai giardini Upper Barrakka si vede tutto il Grand Harbour: il cannone spara alle 12 e alle 16.","Le Lascaris War Rooms sono sotto le mura vicine: prenota il biglietto online.","Il Forte Sant'Elmo è in fondo a Republic Street, a 20–25 minuti a piedi dalla porta."],["barrakka","lascaris","elmo"]],
["🍽️ Mangiare a Malta",["I pastizzi (sfogliatine di ricotta o piselli) costano meno di 1,50 € l'uno e sono il pranzo più economico.","La ftira è un pane piatto con tonno, capperi e olive: vale come pranzo.","Lo stuffat tal-fenek (coniglio) e la torta di lampuki (da fine agosto a dicembre) sono i piatti da provare a cena."],["sphinx","aaron","doffice"]],
["🌅 Un giorno fuori dalla Valletta",["Le Tre Città (Birgu, Senglea, Cospicua) sono a dieci minuti di traghetto.","Mdina, l'antica capitale, si raggiunge con i bus Tallinja in circa 45 minuti dalla Valletta (tempo da confermare).","Gozo si raggiunge con il traghetto veloce dalla Valletta (circa 45 minuti, circa 7 €, da guide: da confermare)."]]],
WTIPS:["Il rubinetto di Malta eroga acqua dissalata: è potabile, ma ha un sapore particolare. Molti locali servono acqua in bottiglia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap; a Malta sono poche.","Molti caffè riempiono la borraccia se lo chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["Malta usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","A Malta le lingue ufficiali sono il maltese e l'inglese, e molti capiscono anche l'italiano. Il maltese è semitico, con tante parole italiane: il frasario è in maltese, con pronuncia all'italiana, ma in inglese ti capiscono ovunque.","Malta ha lo stesso fuso orario dell'Italia.","Si guida a sinistra e la presa è inglese, a tre spinotti: porta un adattatore.","Mancia: si lascia il 5–10% al ristorante, se il servizio non è già compreso.","Nelle chiese serve il vestiario coperto (spalle e ginocchia).","Molti musei e la cattedrale di San Giovanni chiudono mezz'ora dopo l'ultimo ingresso e i giorni festivi: controlla gli orari."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚌 Trasporti pubblici e oggetti smarriti: <a href="https://www.publictransport.com.mt/" target="_blank" rel="noopener">publictransport.com.mt</a>.</li><li>🇮🇹 Ambasciata d\'Italia a La Valletta: <a href="https://ambvalletta.esteri.it" target="_blank" rel="noopener">ambvalletta.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Malta. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.publictransport.com.mt/" target="_blank" rel="noopener">publictransport.com.mt</a> e le notizie locali.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="350" cy="26" r="11"/><path d="M0 106 V92 Q60 80 120 86 Q160 90 180 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 V76 H82 V106 Z M10 76 H82 V70 H10 Z M14 70 V50 H30 V70 Z M56 70 V50 H72 V70 Z M14 50 H30 L22 38 Z M56 50 H72 L64 38 Z M40 70 V58 H46 V70 Z"/></g>'+
'<g style="--k:2"><path d="M106 106 V62 H146 V106 Z M110 62 Q126 26 142 62 Z M124 28 V16 H128 V28 Z M118 62 V70 H134 V62 Z"/></g>'+
'<g style="--k:3"><path d="M168 106 V56 H190 V106 Z M166 56 H192 L179 22 Z M178 22 V8 H180 V22 Z"/></g>'+
'<g style="--k:4"><path d="M214 106 V66 H266 V106 Z M214 66 H266 V60 H214 Z M222 60 V52 H230 V60 Z M250 60 V52 H258 V60 Z"/></g>'+
'<g style="--k:5"><path d="M290 106 V72 H388 V106 Z M290 72 V66 H300 V72 Z M310 72 V66 H320 V72 Z M330 72 V66 H340 V72 Z M350 72 V66 H360 V72 Z M370 72 V66 H380 V72 Z M338 72 V54 H352 V72 Z M335 54 H355 L345 40 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M96 90 h4 M104 98 h6 M200 92 h30 M200 100 h30"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="100" cy="14" r="1.3"/><circle cx="160" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="320" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.valletta);

;var n=window.CITIES["valletta"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["valletta"]);
