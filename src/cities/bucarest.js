/* ===== Bucarest (dati verificati il 14 ottobre 2026) =====
   Fonti lette: sito della Camera dei Deputati (visite al Palazzo del Parlamento), pagine di stampa e guide per i trasporti (STB, Metrorex, treno per l'aeroporto), aerocorner.com per i voli da Băneasa, notizie di stampa romena per i musei.
   Il sito di STB, Metrorex, dei musei e dei locali non è stato letto direttamente: dove un dato viene da guide o da articoli è scritto «da confermare».
   Le coordinate di locali e tappe sono indicative (circa 50–100 m). Cambio usato: 1 € = 5,34 lei (BNR, 12–13 ottobre 2026). */
window.CITIES=window.CITIES||{};
CITIES.bucarest=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Otopeni (OTP) e Băneasa (BBU), tutti e due con voli diretti dall'Italia */
var PAR={
OTP:{n:"Bucarest Henri Coandă, Otopeni (OTP)",s:"Aeroportul Internațional Henri Coandă București",url:"https://www.bucharestairports.ro/en",live:"Bucharest",inMin:55,buf:120,pos:[44.5711,26.0858],sd:"Aeroporto OTP · bus 100 o treno",rt:"Dall'aeroporto: bus 100 diretto fino a Piața Unirii, oppure treno fino alla stazione Gara de Nord.",
 arr:"Dall'Italia si entra in Romania senza controllo passaporti (spazio Schengen). È l'aeroporto principale, a circa 17 km a nord del centro. Il modo più semplice è il bus 100 dell'azienda cittadina STB: porta in centro senza fermate intermedie inutili, passa da Piața Victoriei e Piața Romană e finisce a Piața Unirii; passa ogni 15 minuti di giorno e ogni 30 di notte (informazione di aprile 2026) e impiega 40–50 minuti. Per i lavori nell'area degli arrivi, dal 22 aprile 2026 il bus 100 si prende solo alla fermata «Aeroport Henri Coandă Plecări» (partenze), che si raggiunge a piedi dal terminal. In alternativa c'è il treno dalla stazione dell'aeroporto fino a Gara de Nord (circa 20–25 minuti, circa ogni 40 minuti, anche di notte); da Gara de Nord si prosegue in metro. Con Bolt o Uber, o con il taxi, si fa in 30–45 minuti.",
 tk:"Biglietti (prezzi 2026 da guide, da confermare): bus 100 circa 6 lei (1,10 €), treno circa 5,50 lei (1 €); il taxi o Bolt costa di solito 45–80 lei (circa 9–15 €). Il biglietto dei mezzi urbani di Bucarest e quello del bus 100 e del treno sono venduti separatamente: controlla alle macchinette di STB o ai chioschi nell'area partenze, oppure sul sito stb.ro e su cfrcalatori.ro. Usa solo taxi con tassametro dalle app (Bolt, Uber) o dalle colonnine ufficiali nell'atrio: evita chi ti offre il passaggio in sala arrivi.",
 gm:"Aeroportul Internațional Henri Coandă București",
 tips:["Il bus 100 parte dalla fermata «Plecări» (partenze), non dagli arrivi: i lavori nell'area arrivi durano ancora (informazione di aprile 2026, da confermare).","Il taxi e le app di auto (Bolt, Uber) in genere costano meno di 80 lei (15 €) fino al centro; il traffico nelle ore di punta (mattina e tardo pomeriggio) può raddoppiare i tempi.","Per il treno controlla l'orario su cfrcalatori.ro: di norma è una corsa circa ogni 40 minuti, giorno e notte, ma può cambiare per lavori."]},
BBU:{n:"Bucarest Băneasa (BBU)",s:"Aeroportul Internațional București Băneasa - Aurel Vlaicu",url:"https://www.bucharestairports.ro/en",live:"Bucharest",inMin:45,buf:120,pos:[44.5032,26.0854],sd:"Aeroporto BBU · taxi o bus",rt:"Dall'aeroporto: taxi o Bolt fino a Piața Victoriei, poi metro M2 fino a Piața Unirii.",
 arr:"Băneasa è l'aeroporto più piccolo, a circa 8 km a nord del centro, usato da compagnie low cost: secondo aerocorner.com (7 ottobre 2026) ci sono voli diretti dall'Italia da Bergamo e Napoli (Wizz Air) e da Bari (Ryanair); i collegamenti cambiano con la stagione, quindi controlla i voli prima di prenotare. Non c'è né un treno né una stazione della metro: la soluzione più comoda è un taxi o una vettura Bolt/Uber fino a Piața Victoriei (circa 20–30 minuti, secondo il traffico), da dove la metro M2 porta in cinque fermate a Piața Unirii. In alternativa ci sono bus urbani che collegano l'aeroporto alla città (linee 131, 335 e altre, secondo una guida): le fermate e le linee vanno controllate su stb.ro, perché non ho potuto confermarle.",
 tk:"Il taxi o Bolt fino al centro costa di norma 30–50 lei (circa 6–10 €), secondo una guida (da confermare). Il biglietto della metro è 7 lei (circa 1,30 €) a corsa (tariffa dal 1° maggio 2026). Usa le app Bolt o Uber o le colonnine ufficiali dei taxi: evita chi ti offre il passaggio in sala arrivi.",
 gm:"Aeroportul Internațional București Băneasa - Aurel Vlaicu",
 tips:["A Băneasa non ci sono né treno né metro: calcola un taxi o un'auto con app (Bolt, Uber) o un bus urbano. Controlla le linee su stb.ro.","In alcune ore di punta il traffico verso il centro è lento: non contare su meno di 30 minuti per Piața Victoriei.","Controlla il tuo aeroporto di ritorno: Otopeni (OTP) e Băneasa (BBU) sono lontani tra loro (circa 30 minuti in auto)."]}
};
/* linee (tracciati indicativi) */
var SEG={
b100:{c:"#1f3a8a",n:"Bus 100 dall'aeroporto Otopeni",p:[[44.5711,26.0858,"Aeroporto",2],[44.5100,26.0720],[44.4527,26.0861,"Piața Victoriei",2],[44.4467,26.0970,"Piața Romană",2],[44.4283,26.1031,"Piața Unirii",2]]},
tr:{c:"#8b5a2b",n:"Treno dall'aeroporto Otopeni a Gara de Nord",p:[[44.5711,26.0858,"Aeroporto",2],[44.4468,26.0744,"Gara de Nord",2]]},
bt:{c:"#1f3a8a",n:"Taxi dall'aeroporto Băneasa",p:[[44.5032,26.0854,"Aeroporto",2],[44.4527,26.0861,"Piața Victoriei",2]]},
m2:{c:"#1d4ed8",n:"Metro M2 (blu)",p:[[44.4283,26.1031,"Piața Unirii",2],[44.4353,26.1022,"Universitate",2],[44.4467,26.0970,"Piața Romană",2],[44.4527,26.0861,"Piața Victoriei",2],[44.4636,26.0848,"Aviatorilor",2]]}
};
var START=[44.4283,26.1031];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti; cl = giorni di chiusura (0 = lunedì) */
var STOPS={
centrov:{t:"Centrul Vechi: Lipscani, Stavropoleos e Hanul lui Manuc",z:"A",p:1,min:75,id:105,max:150,pos:[44.4312,26.1000],q:"Centrul Vechi, București",cls:"walk",sun:1,
 d:"Il centro storico di Bucarest, un reticolo di viuzze ottocentesche intorno a Strada Lipscani, con palazzi ristrutturati, locali e bar. Qui ci sono il piccolo monastero di Stavropoleos, con il cortile in stile brâncovenesc, la locanda Hanul lui Manuc del 1808 con il grande cortile interno e le rovine della Curtea Veche, il palazzo dei principi di Valacchia.",
 m:"Le strade si percorrono gratis. Il monastero di Stavropoleos è di norma aperto dalle 9 alle 18 e chiude durante le funzioni (orari da guide, da confermare): ingresso libero, vestiti coprenti. Il cortile di Hanul lui Manuc si attraversa gratis. La sera e nel fine settimana l'Old Town è molto affollata e rumorosa, con musica fino a tardi."},
parlament:{t:"Palazzo del Parlamento (Casa Poporului)",z:"C",p:1,min:90,id:120,max:150,pos:[44.4252,26.0840],q:"Palatul Parlamentului, Strada Izvor 2-4, București",cls:"",tk:[15.9,"Palazzo del Parlamento: visita guidata standard (85 lei)",1,1],
 win:function(){return[9*60,17*60]},
 d:"Il secondo edificio amministrativo più grande del mondo, voluto dal dittatore Nicolae Ceaușescu negli anni Ottanta: migliaia di stanze, scaloni di marmo e lampadari giganteschi. Si visita in gruppo con una guida, in circa un'ora, attraverso alcune delle sale.",
 m:"Aperto tutti i giorni dalle 9 alle 17 (sito della Camera dei Deputati). Visita standard 85 lei (circa 15,90 €); studenti 19–26 anni 55 lei, bambini 7–18 anni 40 lei. I biglietti si comprano solo il giorno stesso, alla biglietteria nella sala espositiva «Constantin Brâncuși» (via Izvor 2-4), in contanti o con carta: non si vendono online. Per 1–9 persone bisogna prenotare telefonando al numero +40 733 558 102 o 103 almeno un giorno prima, dal lunedì al venerdì dalle 9 alle 16 (per visitare il lunedì si prenota il venerdì precedente). Occorre presentarsi 15 minuti prima con la carta d'identità fisica o il passaporto: la patente non è accettata. Il numero di sale visitabili cambia secondo gli eventi in corso."},
ateneu:{t:"Ateneul Român e Piața Revoluției",z:"B",p:2,min:60,id:90,max:120,pos:[44.4413,26.0974],q:"Ateneul Român, București",cls:"walk",sun:1,
 d:"L'Ateneo Romeno è la sala concerti della città, un tempio neoclassico del 1888 con una cupola e un fregio dipinto con la storia del Paese. Intorno ci sono la Piața Revoluției, dove nel dicembre 1989 cadde il regime di Ceaușescu, l'ex palazzo del Comitato Centrale e, sulla Calea Victoriei, il palazzo CEC e il Museo nazionale d'arte.",
 m:"L'esterno e la piazza si vedono gratis. L'interno si visita con visite guidate in date e orari variabili, o con un biglietto per un concerto della Filarmonica George Enescu (programma su fge.org.ro): non ho trovato un orario fisso di visita, controlla prima di venire."},
carusel:{t:"Cărturești Carusel",z:"A",p:3,min:30,id:45,max:75,pos:[44.4316,26.1005],q:"Cărturești Carusel, Strada Lipscani 55, București",cls:"",
 win:function(){return[10*60,22*60]},
 d:"Una libreria in un palazzo del 1903, su sei piani con gallerie in bianco, un soffitto alto e una luce che entra dall'alto. All'ultimo piano c'è un bistrot. È uno dei luoghi più fotografati della città, ma si può comprare un libro o semplicemente salire a guardare.",
 m:"Aperta dal lunedì al mercoledì dalle 10 alle 22 e dal giovedì alla domenica dalle 10 alle 24 (In Your Pocket; da confermare sul sito). L'ingresso è libero."},
tarani:{t:"Muzeul Țăranului Român",z:"D",p:2,min:75,id:105,max:150,pos:[44.4524,26.0868],q:"Muzeul Național al Țăranului Român, București",cls:"",cl:[0],
 win:function(){return[10*60,18*60]},
 d:"Il museo del contadino rumeno, uno dei più belli d'Europa: costumi, icone su vetro, tessuti, interni di case tradizionali e una chiesetta di legno ricostruita. Si trova in un palazzo neoromeno alla fine della Calea Victoriei, vicino a Piața Victoriei.",
 m:"Di norma aperto dal martedì alla domenica, di solito dalle 10 alle 18, e chiuso il lunedì (orari e prezzi non letti sul sito ufficiale, da confermare). Il biglietto costava 12 lei fino al 2023 (guida): ora probabilmente è più alto. Il museo è raggiungibile in metro M2 fino a Piața Victoriei e poi 5 minuti a piedi."},
arcul:{t:"Arcul de Triumf",z:"D",p:4,min:30,id:45,max:75,pos:[44.4673,26.0784],q:"Arcul de Triumf, București",cls:"",sun:1,cl:[0],tk:[2.8,"Arcul de Triumf: salita (15 lei)",1,1],
 win:function(){return[10*60,18*60]},
 d:"L'arco di trionfo di Bucarest, alto 27 metri, eretto nel 1936 in onore dell'esercito rumeno e della riunificazione. Si può salire all'interno fino alla piattaforma, con una vista sul viale Kiseleff e sul parco.",
 m:"Dal 2025 l'accesso è permanente: aperto dal martedì alla domenica dalle 10 alle 18, ingresso 15 lei (circa 2,80 €), ridotto 8 lei (informazione di marzo 2025 da un articolo di stampa, da confermare). Fotografare con il telefono è gratis."},
satului:{t:"Muzeul Satului Dimitrie Gusti",z:"D",p:2,min:90,id:120,max:180,pos:[44.4725,26.0775],q:"Muzeul Național al Satului Dimitrie Gusti, București",cls:"",sun:1,tk:[7.5,"Muzeul Satului (circa 40 lei)",1,1],
 win:function(){return[9*60,17*60]},
 d:"Un museo all'aperto in riva al lago di Herăstrău, con oltre 300 case, chiese di legno e mulini portati qui da tutte le regioni della Romania, e disposti come villaggi. Si cammina tra giardini, cortili e officine.",
 m:"Dal 13 ottobre (programma d'inverno 2025, da confermare per il 2026) aperto tutti i giorni dalle 9 alle 17, ultimo biglietto 30 minuti prima; d'estate dal mercoledì alla domenica dalle 9 alle 19. A gennaio 2026 le case sono state chiuse per lavori e il biglietto scontato del 50% costava 20 lei, quindi il prezzo intero dovrebbe essere circa 40 lei (circa 7,50 €): da confermare. Chiuso a Pasqua, il 25 e 26 dicembre e il 1 e 2 gennaio. Fermata della metro M2: Aviatorilor."},
herastrau:{t:"Parco Herăstrău (Regele Mihai I)",z:"D",p:4,min:45,id:75,max:120,pos:[44.4740,26.0830],q:"Parcul Regele Mihai I (Herăstrău), București",cls:"walk",sun:1,
 d:"Il parco più grande della città, intorno a un lago, con viali alberati, un'isola dei Giapponesi, piste ciclabili e panchine. È il posto dove i bucarestini vanno a passeggiare, soprattutto nel fine settimana.",
 m:"Il parco è aperto tutto il giorno e l'ingresso è gratuito. Fermate più vicine: metro M2 Aviatorilor o Aurel Vlaicu."},
cismigiu:{t:"Giardini Cișmigiu",z:"B",p:4,min:40,id:60,max:90,pos:[44.4366,26.0905],q:"Grădina Cișmigiu, București",cls:"walk",sun:1,
 d:"Il giardino pubblico più vecchio di Bucarest (1847), nel cuore della città, con un lago, aiuole, un vialetto degli scrittori e tavolini all'aperto. È la sosta più riposante dopo i palazzi del centro.",
 m:"Aperto tutto il giorno, ingresso libero. In inverno il lago può essere ghiacciato o vuoto."},
cotroceni:{t:"Palazzo Cotroceni",z:"F",p:5,min:75,id:105,max:150,pos:[44.4351,26.0668],q:"Palatul Cotroceni, București",cls:"",cl:[0,1,2,3],tk:[13.1,"Palazzo Cotroceni: museo e sale (70 lei)",1,1],
 win:function(){return[9*60,17*60]},
 d:"La residenza del presidente della Romania, un palazzo storico con una parte aperta al pubblico come museo: saloni di rappresentanza, appartamenti della famiglia reale e una piccola chiesa. Si trova nel quartiere residenziale di Cotroceni, accanto all'orto botanico.",
 m:"Dopo il 1° novembre il museo apre solo il sabato e la domenica, dalle 9 alle 17, ultimo ingresso alle 16 (formato 2025, da confermare per il 2026): 70 lei intero (circa 13,10 €), studenti 17,50 lei, pensionati 35 lei. Biglietti alla porta su Șoseaua Cotroceni o online (IaBilet, BookTes). In primavera ed estate le visite sono possibili anche in settimana e i giardini sono gratuiti. Porta la carta d'identità."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","centrov",8,"walk","A piedi da Piața Unirii per Strada Franceză fino a Hanul lui Manuc e a Lipscani, circa 8 minuti.","A piedi per Strada Franceză fino a Piața Unirii, circa 8 minuti.",{f:[W([[44.4283,26.1031],[44.4297,26.1015],[44.4312,26.1000]])],r:[W([[44.4312,26.1000],[44.4297,26.1015],[44.4283,26.1031]])]});
P2("centrov","carusel",3,"walk","A piedi lungo Strada Lipscani fino alla libreria, circa 3 minuti.","A piedi lungo Strada Lipscani, circa 3 minuti.",{f:[W([[44.4312,26.1000],[44.4316,26.1005]])],r:[W([[44.4316,26.1005],[44.4312,26.1000]])]});
P2("start","carusel",10,"walk","A piedi per Strada Franceză e Strada Lipscani fino alla libreria, circa 10 minuti.","A piedi per Strada Lipscani fino a Piața Unirii, circa 10 minuti.",{f:[W([[44.4283,26.1031],[44.4300,26.1018],[44.4316,26.1005]])],r:[W([[44.4316,26.1005],[44.4300,26.1018],[44.4283,26.1031]])]});
P2("start","parlament",25,"walk","A piedi per il Bulevardul Unirii e Bulevardul Națiunile Unite fino all'ingresso di via Izvor, circa 25 minuti. In alternativa taxi o Bolt (10 minuti).","A piedi per Bulevardul Națiunile Unite fino a Piața Unirii, circa 25 minuti.",{f:[W([[44.4283,26.1031],[44.4270,26.0950],[44.4252,26.0840]])],r:[W([[44.4252,26.0840],[44.4270,26.0950],[44.4283,26.1031]])]});
P2("parlament","centrov",22,"walk","A piedi per Bulevardul Națiunile Unite e Strada Franceză fino al Centrul Vechi, circa 22 minuti.","A piedi per Strada Franceză e Bulevardul Națiunile Unite fino al Parlamento, circa 22 minuti.",{f:[W([[44.4252,26.0840],[44.4280,26.0950],[44.4312,26.1000]])],r:[W([[44.4312,26.1000],[44.4280,26.0950],[44.4252,26.0840]])]});
P2("centrov","ateneu",18,"walk","A piedi per Strada Lipscani e Calea Victoriei fino all'Ateneul Român, circa 18 minuti.","A piedi per Calea Victoriei e Strada Lipscani fino al Centrul Vechi, circa 18 minuti.",{f:[W([[44.4312,26.1000],[44.4336,26.0968],[44.4395,26.0963],[44.4413,26.0974]])],r:[W([[44.4413,26.0974],[44.4395,26.0963],[44.4336,26.0968],[44.4312,26.1000]])]});
P2("ateneu","cismigiu",12,"walk","A piedi per Calea Victoriei e Strada Știrbei Vodă fino a Cișmigiu, circa 12 minuti.","A piedi per Strada Știrbei Vodă e Calea Victoriei fino all'Ateneul Român, circa 12 minuti.",{f:[W([[44.4413,26.0974],[44.4390,26.0940],[44.4366,26.0905]])],r:[W([[44.4366,26.0905],[44.4390,26.0940],[44.4413,26.0974]])]});
P2("cismigiu","centrov",20,"walk","A piedi per Bulevardul Regina Elisabeta e Calea Victoriei fino al Centrul Vechi, circa 20 minuti.","A piedi per Calea Victoriei fino a Cișmigiu, circa 20 minuti.",{f:[W([[44.4366,26.0905],[44.4350,26.0960],[44.4312,26.1000]])],r:[W([[44.4312,26.1000],[44.4350,26.0960],[44.4366,26.0905]])]});
P2("start","tarani",20,"metro","Metro M2 da Piața Unirii fino a Piața Victoriei (4 fermate, circa 10 minuti), poi 5 minuti a piedi lungo il viale Kiseleff.","A piedi fino a Piața Victoriei e metro M2 fino a Piața Unirii, circa 20 minuti.",{f:[["m2","Piața Unirii","Piața Victoriei"],W([[44.4527,26.0861],[44.4524,26.0868]])],r:[W([[44.4524,26.0868],[44.4527,26.0861]]),["m2","Piața Victoriei","Piața Unirii"]]});
P2("ateneu","tarani",30,"metro","A piedi fino a Piața Romană (10 minuti), metro M2 fino a Piața Victoriei (2 fermate) e 5 minuti a piedi.","A piedi fino a Piața Victoriei, metro M2 fino a Piața Romană e a piedi fino all'Ateneul Român, circa 30 minuti.",{f:[W([[44.4413,26.0974],[44.4467,26.0970]]),["m2","Piața Romană","Piața Victoriei"],W([[44.4527,26.0861],[44.4524,26.0868]])],r:[W([[44.4524,26.0868],[44.4527,26.0861]]),["m2","Piața Victoriei","Piața Romană"],W([[44.4467,26.0970],[44.4413,26.0974]])]});
P2("tarani","arcul",20,"walk","A piedi lungo tutto il viale Kiseleff fino all'Arcul de Triumf, circa 20 minuti.","A piedi lungo il viale Kiseleff fino al Muzeul Țăranului, circa 20 minuti.",{f:[W([[44.4524,26.0868],[44.4600,26.0820],[44.4673,26.0784]])],r:[W([[44.4673,26.0784],[44.4600,26.0820],[44.4524,26.0868]])]});
P2("arcul","satului",6,"walk","A piedi lungo il viale Kiseleff fino all'ingresso del museo, circa 6 minuti.","A piedi lungo il viale Kiseleff fino all'Arcul de Triumf, circa 6 minuti.",{f:[W([[44.4673,26.0784],[44.4700,26.0780],[44.4725,26.0775]])],r:[W([[44.4725,26.0775],[44.4700,26.0780],[44.4673,26.0784]])]});
P2("satului","herastrau",8,"walk","A piedi lungo la riva del lago fino al parco Herăstrău, circa 8 minuti.","A piedi dal parco fino al museo, circa 8 minuti.",{f:[W([[44.4725,26.0775],[44.4735,26.0805],[44.4740,26.0830]])],r:[W([[44.4740,26.0830],[44.4735,26.0805],[44.4725,26.0775]])]});
P2("arcul","herastrau",12,"walk","A piedi per il viale lungo il lago fino al parco Herăstrău, circa 12 minuti.","A piedi dal parco fino all'Arcul de Triumf, circa 12 minuti.",{f:[W([[44.4673,26.0784],[44.4710,26.0810],[44.4740,26.0830]])],r:[W([[44.4740,26.0830],[44.4710,26.0810],[44.4673,26.0784]])]});
P2("start","satului",30,"metro","Metro M2 da Piața Unirii fino ad Aviatorilor (6 fermate, circa 15 minuti), poi 10 minuti a piedi fino al museo.","A piedi fino ad Aviatorilor e metro M2 fino a Piața Unirii, circa 30 minuti.",{f:[["m2","Piața Unirii","Aviatorilor"],W([[44.4636,26.0848],[44.4680,26.0800],[44.4725,26.0775]])],r:[W([[44.4725,26.0775],[44.4680,26.0800],[44.4636,26.0848]]),["m2","Aviatorilor","Piața Unirii"]]});
P2("parlament","cotroceni",22,"walk","A piedi lungo il parco Izvor e via Eroilor fino a Cotroceni, circa 22 minuti.","A piedi per via Eroilor e il parco Izvor fino al Parlamento, circa 22 minuti.",{f:[W([[44.4252,26.0840],[44.4310,26.0750],[44.4351,26.0668]])],r:[W([[44.4351,26.0668],[44.4310,26.0750],[44.4252,26.0840]])]});
P2("cismigiu","cotroceni",22,"walk","A piedi per Bulevardul Eroilor fino a Cotroceni, circa 22 minuti.","A piedi per Bulevardul Eroilor fino a Cișmigiu, circa 22 minuti.",{f:[W([[44.4366,26.0905],[44.4360,26.0780],[44.4351,26.0668]])],r:[W([[44.4351,26.0668],[44.4360,26.0780],[44.4366,26.0905]])]});
P2("start","cotroceni",35,"metro","Il modo più semplice è un taxi o Bolt da Piața Unirii (circa 15 minuti, secondo il traffico).","Taxi o Bolt fino a Piața Unirii, circa 15 minuti.",{f:[W([[44.4283,26.1031],[44.4330,26.0850],[44.4351,26.0668]])],r:[W([[44.4351,26.0668],[44.4330,26.0850],[44.4283,26.1031]])]});
/* ritorno in aeroporto */
var RET={
OTP:{
 A:{min:55,txt:"Bus 100 da Piața Unirii (o da Piața Romană o Piața Victoriei) fino alla fermata «Aeroport Henri Coandă Plecări»: 40–50 minuti, circa 6 lei (da confermare), un bus ogni 15 minuti di giorno e ogni 30 di notte. In alternativa il treno da Gara de Nord (circa 20 minuti, circa ogni 40 minuti, circa 5,50 lei da confermare): da Piața Unirii si arriva a Gara de Nord con la metro M2 fino a Piața Victoriei e poi la M1 fino a Gara de Nord.",g:[["b100","Piața Unirii","Aeroporto"]]}},
BBU:{
 A:{min:45,txt:"Metro M2 da Piața Unirii fino a Piața Victoriei (4 fermate, circa 10 minuti), poi taxi o Bolt fino a Băneasa (circa 20–30 minuti, da confermare). In alternativa un taxi diretto da Piața Unirii. Non ci sono né treno né metro fino all'aeroporto.",g:[["m2","Piața Unirii","Piața Victoriei"],["bt","Piața Victoriei","Aeroporto"]]}}
};
var ARR={
OTP:[["b100","Aeroporto","Piața Unirii"]],
BBU:[["bt","Aeroporto","Piața Victoriei"],["m2","Piața Victoriei","Piața Unirii"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Quasi tutti gli orari e prezzi sono da guide e schede online, non letti sui siti: da confermare */
var V={
carubere:{n:"Caru' cu Bere",a:"Strada Stavropoleos 5",z:"A",r:"–",pos:[44.4314,26.0987],h:D7("10:00-24:00"),
 d:"Il ristorante storico di Bucarest, in un palazzo neogotico del 1879 con soffitti dipinti, vetrate e scale in legno: cucina romena tradizionale (sarmale, ciorbă, mici) e birra di casa. È famoso e spesso pieno, ma resta una delle pochissime sale storiche ancora vive.",pr:"Orario dal sito ufficiale. Un piatto tipico costa di norma 40–80 lei (circa 8–15 €) secondo le guide, listino non visto: da confermare. In ora di pranzo e cena c'è spesso la coda, meglio prenotare."},
lacrimi:{n:"Lacrimi și Sfinți",a:"Strada Șepcari 16",z:"A",r:"–",pos:[44.4308,26.0982],h:D7("12:00-23:00"),
 d:"Un ristorante nell'Old Town che serve piatti di carne e cucina romena rivisitata, in un locale con tavoli di legno. È un posto di prezzo medio, più curato delle tavole turistiche.",pr:"Fascia media: un piatto principale sta di solito sui 45–75 lei (circa 8,50–14 €) secondo una guida, listino non visto. Orari non verificati, da confermare."},
manuc:{n:"Hanul lui Manuc",a:"Strada Franceză 62-64",z:"C",r:"–",pos:[44.4301,26.1013],h:D7("09:00-23:00"),
 d:"La locanda del 1808 con un cortile interno a due piani di loggiati, oggi ristorante e caffè: cucina romena (sarmale, ciorbă di trippa, tochitură) e musica dal vivo la sera. Il cortile si attraversa anche senza mangiare.",pr:"Piatti sui 40–80 lei (circa 8–15 €), listino non visto. Orari tipici da una guida (9–23, la cucina resta aperta più tardi nel fine settimana): da confermare."},
crama:{n:"Crama Domnească",a:"Strada Șelari 13-15",z:"A",r:"–",pos:[44.4301,26.0998],h:D7("12:00-23:00"),
 d:"Un ristorante del centro storico con un cortile e musica dal vivo ogni sera, che propone piatti rumeni tradizionali e vini locali. Un buon posto per assaggiare la cucina del Paese in un'atmosfera tranquilla.",pr:"Fascia media: 35–65 lei a piatto (circa 7–12 €), secondo una guida, listino non visto. Orari non verificati, da confermare."},
origo:{n:"Origo",a:"Strada Lipscani 9",z:"A",r:"–",pos:[44.4322,26.0997],h:D7("09:00-18:00"),
 d:"Una caffetteria di specialty coffee nel centro storico, nota per il caffè filtro e per il banana bread. Il fine settimana la mattina c'è spesso la coda.",pr:"Un caffè con un dolce costa circa 15–25 lei (circa 3–5 €), prezzi da una guida. Orari non verificati, da confermare."},
carusel:{n:"Bistrot di Cărturești Carusel",a:"Strada Lipscani 55",z:"A",r:"–",pos:[44.4316,26.1005],h:["10:00-22:00","10:00-22:00","10:00-22:00","10:00-24:00","10:00-24:00","10:00-24:00","10:00-24:00"],
 d:"Il bistrot all'ultimo piano della libreria Carusel, con piatti semplici (anche vegetariani) e caffè tra gli scaffali e le gallerie bianche. Una pausa comoda e piacevole in pieno centro storico.",pr:"Orari della libreria (non è detto che il bistrot segua lo stesso orario): da confermare. Un pasto leggero sta intorno ai 40–60 lei (8–11 €), prezzo da una guida."},
linea:{n:"Linea Closer to the Moon",a:"Strada Lipscani 17",z:"A",r:"–",pos:[44.4314,26.1003],h:["10:00-01:00","10:00-01:00","10:00-01:00","10:00-01:00","10:00-02:00","10:00-02:00","10:00-01:00"],
 d:"Un locale con terrazza panoramica al piano alto di un palazzo di Strada Lipscani, adatto a una pausa con una bevanda e la vista sui tetti dell'Old Town.",pr:"Orari del rooftop bar da una guida (tablejourney.com): da confermare. Prezzi medio-alti per un caffè o un aperitivo; il ristorante ha un listino più caro (fascia $$$)."},
doina:{n:"Casa Doina",a:"Șoseaua Kiseleff 4",z:"D",r:"–",pos:[44.4536,26.0866],h:D7("12:00-23:00"),
 d:"Un ristorante di cucina romena in una villa con giardino, sul viale Kiseleff, vicino a Piața Victoriei e al Muzeul Țăranului: un posto comodo per un pranzo dopo il museo.",pr:"Fascia media-alta per Bucarest: un pasto completo può superare i 100 lei (circa 19 €), prezzo da una guida non verificato. Orari non verificati, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["origo","carusel","linea"],B:["origo","carusel"],C:["origo","manuc"],D:["doina","origo"],F:["origo","carusel"]},
pra:{A:["carusel","manuc","crama"],B:["carubere","carusel"],C:["manuc","crama"],D:["doina","carubere"],F:["carubere","manuc"]},
cen:{A:["carubere","lacrimi","crama"],B:["carubere","lacrimi"],C:["manuc","lacrimi"],D:["doina","carubere"],F:["carubere","lacrimi"]},
snk:{A:["origo","carusel","linea"],B:["origo","carusel"],C:["origo","manuc"],D:["doina","origo"],F:["origo","carusel"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"vecchio",t:"Centro storico e Cărturești Carusel",acts:["centrov","carusel"],need:130,core:1},
{id:"parl",t:"Palazzo del Parlamento",acts:["parlament"],need:130,core:1},
{id:"vittoria",t:"Ateneul Român e Cișmigiu",acts:["ateneu","cismigiu"],need:150,core:1},
{id:"kiseleff",t:"Muzeul Țăranului e Arcul de Triumf",acts:["tarani","arcul"],need:170},
{id:"sat",t:"Muzeul Satului e parco Herăstrău",acts:["satului","herastrau"],need:190},
{id:"cotr",t:"Palazzo Cotroceni",acts:["cotroceni"],need:120}
];
var ORDER=["centrov","parlament","ateneu","carusel","tarani","satului","arcul","herastrau","cismigiu","cotroceni"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["vec","Centrul Vechi / Lipscani (centro storico)",[44.4312,26.1000],"A"],
["uni","Piața Unirii / Bulevardul Unirii",[44.4283,26.1031],"C"],
["vic","Calea Victoriei / Piața Romană / Universitate",[44.4430,26.0990],"B"],
["kis","Piața Victoriei / Kiseleff / Herăstrău",[44.4540,26.0860],"D"],
["cot","Cotroceni / Cișmigiu",[44.4365,26.0850],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[44.4283,26.1031],""]
];
/* imposta di soggiorno: tassa turistica di Bucarest, 10 lei a notte per persona dal 2026 (circa 1,87 €) */
var TAX=[["h5","Hotel 4–5 stelle",1.87],["h3","Hotel fino a 3 stelle, B&B o appartamento",1.87],["host","Ostello o struttura economica",1.87],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["O cafea și un covrig","un caffè con un covrig, la ciambella di pane morbido venduta nei panifici."],["Plăcintă cu brânză","una torta salata di pasta sfoglia con formaggio fresco."],["Cozonac","il dolce lievitato con noci o cacao, tipico delle feste, ma si trova tutto l'anno."]],
pra:[["Mici cu muștar","gli involtini di carne alla griglia con senape e pane."],["Ciorbă de perișoare","zuppa acida con polpettine di carne e verdure."],["Langoși cu brânză","una frittella di pasta lievitata con formaggio e panna acida."],["Mămăligă cu brânză","polenta con formaggio e panna acida."]],
cen:[["Sarmale cu mămăligă","involtini di cavolo ripieni di carne con polenta: il piatto simbolo della Romania."],["Ciorbă de burtă","zuppa di trippa con panna acida e aglio, da provare almeno una volta."],["Tochitură moldovenească","spezzatino di maiale con polenta e uovo."],["Papanași","frittelle di formaggio fresco con panna acida e marmellata di amarene: il dolce da provare."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Strada Lipscani","Foto","Le viuzze del centro storico con i palazzi restaurati, meglio al mattino quando sono ancora vuote.",[44.4318,26.1000],"Strada Lipscani, București","centrov"],
["📷","Il cortile di Stavropoleos","Foto","Il piccolo monastero con le logge di pietra scolpita: si fotografa dal cortile, senza disturbare chi prega.",[44.4316,26.0991],"Mănăstirea Stavropoleos, București","centrov"],
["🤳","Hanul lui Manuc","Selfie","Il grande cortile ottocentesco con le due file di balconi in legno.",[44.4301,26.1013],"Hanul lui Manuc, București","centrov"],
["📷","La facciata del Parlamento","Foto","La facciata lunga quasi 300 metri, con il Bulevardul Unirii davanti: la prospettiva migliore è dal fondo del viale.",[44.4275,26.0950],"Palatul Parlamentului, București","parlament"],
["📷","Ateneul Român","Foto","Le colonne e la cupola dell'Ateneo, con la piazza davanti.",[44.4413,26.0974],"Ateneul Român, București","ateneu"],
["📷","Piața Revoluției","Foto","Il balcone dell'ex Comitato Centrale e il monumento della Rinascita, in memoria del 1989.",[44.4395,26.0963],"Piața Revoluției, București","ateneu"],
["🤳","La scala di Cărturești Carusel","Selfie","Le gallerie bianche viste dal pianoterra, il punto più fotografato della libreria.",[44.4316,26.1005],"Cărturești Carusel, București","carusel"],
["📷","Il viale Kiseleff","Foto","Il lungo viale alberato che sale verso l'Arcul de Triumf, bello in autunno.",[44.4600,26.0820],"Șoseaua Kiseleff, București","arcul"],
["📷","L'Arcul de Triumf","Foto","Il monumento visto dal viale, specie con la luce del pomeriggio.",[44.4673,26.0784],"Arcul de Triumf, București","arcul"],
["📷","Le chiese di legno del Muzeul Satului","Foto","Le piccole chiese di legno scuro tra i prati e i cortili del museo.",[44.4730,26.0790],"Muzeul Satului, București","satului"],
["📷","Il lago di Herăstrău","Foto","Il lago al tramonto con i riflessi degli alberi d'autunno.",[44.4740,26.0830],"Parcul Herăstrău, București","herastrau"],
["📷","Il lago di Cișmigiu","Foto","Le barchette e i salici sul lago, nella luce del mattino.",[44.4366,26.0905],"Grădina Cișmigiu, București","cismigiu"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2027-04-30",t:"Bus 100: si prende solo alla fermata «Plecări» dell'aeroporto Otopeni",x:"Dal 22 aprile 2026, per lavori nell'area arrivi di Otopeni, il bus 100 per il centro ferma solo alla fermata «Aeroport Henri Coandă Plecări» (partenze), che sarà ribattezzata «Aeroport Henri Coandă». Il bus 100 passa ogni 15 minuti di giorno e ogni 30 di notte (informazione di aprile 2026): controlla stb.ro prima del viaggio."},
{from:"2026-10-14",to:"2027-04-30",t:"Biglietti di metro e bus più cari dal 1° maggio 2026",x:"Dal 1° maggio 2026 la corsa singola in metro costa 7 lei (prima 5), il biglietto 24 ore della metro 18 lei e il biglietto unico metro più STB (120 minuti) 9 lei. Le macchinette mostrano solo i nuovi prezzi. I prezzi dei bus STB non sono stati confermati: da controllare su stb.ro."},
{from:"2026-11-01",to:"2027-03-31",t:"Palazzo Cotroceni: in inverno visite solo nel fine settimana",x:"Come nell'inverno 2025, dal 1° novembre il museo di Cotroceni potrebbe aprire solo il sabato e la domenica (9–17, ultimo ingresso 16), e gli spazi all'aperto restano chiusi. Controlla l'orario prima di andare."},
{from:"2026-11-15",to:"2027-01-05",t:"Feste: musei chiusi o con orario ridotto",x:"Il 1° dicembre è la Festa nazionale della Romania; il 25 e il 26 dicembre e il 1 e 2 gennaio molti musei sono chiusi (tra questi il Muzeul Satului). Il Parlamento e gli altri musei possono avere orari ridotti: controlla i singoli siti. Dal 2026 l'hotel applica anche la tassa di soggiorno di 10 lei a notte."}
];
/* clima medio di Bucarest (indicativo, massime/minime) */
var CLIM=[[2,-5],[5,-3],[11,1],[18,6],[24,11],[28,15],[31,17],[31,17],[25,12],[18,6],[10,2],[4,-2]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Bucarest: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="tarani"&&WD===0)meta+=" Oggi è lunedì: di norma il Muzeul Țăranului Român è chiuso, controlla l'orario.";
if(it.id==="arcul"&&WD===0)meta+=" Oggi è lunedì: l'Arcul de Triumf è chiuso, ma si può vedere da fuori.";
if(it.id==="parlament"&&WD===0)meta+=" Oggi è lunedì: per visitare il Parlamento devi aver prenotato per telefono il venerdì prima.";
if(it.id==="cotroceni"&&(WD>=0&&WD<=3))meta+=" Il museo di Cotroceni in inverno apre solo nel fine settimana: controlla l'orario.";
return meta}
Object.assign(C,{id:"bucarest",n:"Bucarest",cn:"Romania",e:"🏛️",flag:"🇷🇴",col:["#1f3a8a","#fcd116","#ce1126"],k:"bucarest bucharest romania",
TZ:"Europe/Bucharest",LL:[44.4350,26.1000],CC:"ro",QN:"Bucharest",BK:"Bucharest",ARE:/bucure[sș]ti|bucharest|bucarest|\b0[3-7]\d{4}\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"ro-RO",LANGN:"rumeno",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"RON",s:"lei",e:1/5.34},hub:{n:"Piața Unirii",q:"Piața Unirii metro station, București"},
SINGLE:{acts:["centrov","parlament","ateneu","carusel"],ins:[]},
EXCL:[],
DICON:{parlament:"🏢",ateneu:"🎻",carusel:"📚",tarani:"🧵",arcul:"🎖️",satului:"🛖",herastrau:"🌳",cismigiu:"🍂",cotroceni:"🏰"},
ZN:{A:"nel centro storico (Lipscani)",B:"su Calea Victoriei e Piața Romană",C:"a Piața Unirii",D:"a Piața Victoriei e Kiseleff",F:"a Cotroceni e Cișmigiu"},
NEAR:{col:"caffè",pra:"locale veloce",cen:"locale",snk:"caffè o pasticceria"},
SE:{carubere:"🍺",lacrimi:"🍖",manuc:"🍲",crama:"🍷",origo:"☕",carusel:"📚",linea:"🍸",doina:"🍽️"},
TR:{one:1.69,cap:4.31,lbl:"Metro, tram e bus (Metrorex + STB)",
 air:{OTP:{one:1.12,n:"Bus 100 per il centro (circa 6 lei)"},BBU:{one:1.31,n:"Metro M2 da Piața Victoriei (7 lei) più taxi o Bolt"}},
 passes:[
 {n:"Biglietto 24 ore (metro e bus)",d:1,max:1,p:4.31,note:"Il biglietto integrato 24 ore (23 lei, circa 4,30 €) vale su metro, bus, tram e filobus di Bucarest per 24 ore. Il solo biglietto metro 24 ore costa 18 lei (circa 3,40 €)."},
 {n:"Biglietto 7 giorni (metro e bus)",d:7,p:14.8,only:function(T){return T.n>=5},note:"L'abbonamento integrato 7 giorni (79 lei, circa 14,80 €) vale su tutti i mezzi urbani; il solo metro 7 giorni costa 60 lei (circa 11,20 €)."}],
 note:"Prezzi da articoli di stampa su Metrorex e le tariffe integrate dal 1° maggio 2026 (cambio 1 € = 5,34 lei): metro corsa singola 7 lei (circa 1,30 €), due corse 14 lei, 10 corse 55 lei, 24 ore 18 lei, 7 giorni 60 lei; biglietto unico metro più STB per 120 minuti 9 lei (circa 1,70 €), 24 ore 23 lei (circa 4,30 €), 7 giorni 79 lei (circa 14,80 €). Non ho trovato il prezzo aggiornato del solo bus STB e sul bus 100 (circa 6 lei) e sul treno per l'aeroporto (circa 5,50 lei) le cifre vengono da una guida di agosto 2026: da confermare su stb.ro, metrorex.ro e cfrcalatori.ro. Il centro storico, il Parlamento e l'Ateneul si raggiungono bene a piedi, la metro serve soprattutto per Piața Victoriei, Kiseleff e Herăstrău."},
FOOD:{co:[4,"Colazione al caffè"],pr:[8,"Pranzo (locale veloce)"],ce:[14,"Cena (cucina romena)"],sp:[3,"Spuntini e dolci"]},
T:{ride:"In metro o a piedi",move:"a piedi, in metro o in taxi",bags:"«Pot lăsa bagajele aici?»",bagsPM:"«Pot lăsa bagajele aici până după-amiază?»",bagsAM:"«Pot lăsa bagajele aici până la prânz?»",
pra:"Un locale veloce o una pasticceria",praZ:{A:"Nelle vie principali dell'Old Town (Lipscani, Stavropoleos) i locali con il buttadentro fuori sono cari: per un pasto più onesto cerca le vie laterali e i locali dei cortili.",D:"Sul viale Kiseleff e intorno a Piața Victoriei i locali sono più cari che nel centro storico."},
freeLong:"Qualche idea: una sosta in una pasticceria con un papanași, un giro nel parco Cișmigiu, i cortili dell'Old Town o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in una caffetteria.",
remind:"Il Palazzo del Parlamento si visita solo con una prenotazione telefonica il giorno prima, e con la carta d'identità. Il lunedì molti musei sono chiusi.",
rain1:"Al coperto: il Palazzo del Parlamento, il Muzeul Țăranului, l'Ateneul Român, Cărturești Carusel e i locali del centro storico.",
rainM:"Al coperto: Parlamento, Muzeul Țăranului, Cotroceni (interni), Cărturești Carusel e i locali del centro storico.",
water:"Riempite la borraccia con acqua in bottiglia o filtrata: l'acqua del rubinetto a Bucarest è potabile, ma molti la trovano poco gradevole (da confermare). Attivate «Acqua» sulla mappa per le fontanelle.",
kitchen:"A Bucarest si pranza di solito tra le 12 e le 15 e si cena dalle 19: nell'Old Town e nei locali turistici le cucine restano aperte fino a tardi.",
night:[["🍺","Una birra di casa o un bicchiere di vino rumeno nelle sale dell'Old Town, dove la sera c'è musica dal vivo."],["🕙","La metro chiude intorno a mezzanotte: per rientrare più tardi servono Bolt, Uber o un taxi con tassametro (la notte i bus notturni sono rari)."],["☕","Molti caffè aprono alle 8–9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile, ma molti preferiscono quella in bottiglia)",
fuso:"Bucarest ha un'ora avanti rispetto all'Italia: quando in Italia sono le 12, a Bucarest sono le 13",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per locali di fascia media: una colazione sta intorno ai 3–5 €, un pranzo veloce intorno agli 8 € e una cena con piatto tradizionale e bevanda intorno ai 12–18 €. In Romania si paga in lei; l'euro non è la moneta ufficiale e non sempre è accettato. Quasi ovunque c'è il pagamento con la carta.",
taxNote:"Dal 2026 Bucarest applica una tassa turistica di 10 lei (circa 1,90 €) a notte per persona, fissa e indipendente dal prezzo. Spesso è raccolta dalla struttura o dal portale di prenotazione: controlla se è già compresa nel prezzo che vedi.",
mcrit:"Criteri: locali in centro, a gestione singola (niente catene), con cucina romena o caffè di qualità, a prezzi medi. Orari e prezzi arrivano da guide e schede online, non dai siti dei locali (a parte Caru' cu Bere): controllali prima di andare. Le valutazioni non sono state verificate."},
fx:{meta:meta},
AIRTIPS:["Da Otopeni il bus 100 si prende alla fermata «Plecări» (partenze), non agli arrivi: i lavori nell'area arrivi sono in corso.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto bus 100 per il centro (circa 6 lei) e biglietto della metro: si comprano alle macchinette o ai chioschi",function(E){return true}],["par","Prenotazione telefonica del Palazzo del Parlamento (+40 733 558 102 o 103) con almeno un giorno di anticipo e carta d'identità fisica o passaporto",["parlament"]],["sat","Biglietto per il Muzeul Satului (circa 40 lei, da confermare)",["satului"]],["arc","Biglietto per l'Arcul de Triumf (15 lei)",["arcul"]],["cot","Biglietto per Palazzo Cotroceni (70 lei) con carta d'identità",["cotroceni"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche banconota in lei per mercatini e piccoli locali"]],
NUM:{1:["unu","U-nu"],2:["doi","doi"],3:["trei","trei"],4:["patru","PA-tru"],5:["cinci","cinci"],6:["șase","SHA-se"],7:["șapte","SHAP-te"],8:["opt","opt"],9:["nouă","NO-ua"],10:["zece","ZE-ce"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Bună ziua / Bună seara","BU-na ZI-ua / BU-na SA-ra"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","O masă pentru "+(N===1?"o persoană":nu[0]+" persoane")+", vă rog","o MA-sa PEN-tru "+(N===1?"o per-SO-na":nu[1]+" per-SO-a-ne")+", va rog"],["Un caffè e un dolce, per favore","O cafea și un desert, vă rog","o ca-FEA shi un de-SERT, va rog"],["Acqua del rubinetto, per favore","Apă de la robinet, vă rog","A-pa de la ro-bi-NET, va rog"],["Il conto, per favore","Nota de plată, vă rog","NO-ta de PLA-ta, va rog"],["Posso pagare con la carta?","Pot plăti cu cardul?","pot pla-TI cu CAR-dul"],["Quanto costa?","Cât costă?","cit COS-ta"],["Dov'è la metro?","Unde este metroul?","UN-de ES-te me-TRO-ul"],["Dove si prende il bus per l'aeroporto?","Unde se ia autobuzul spre aeroport?","UN-de se ia au-to-BU-zul spre a-e-ro-PORT"]];
if(M)fr=fr.concat([["Ho una prenotazione","Am o rezervare","am o re-zer-VA-re"],["Posso lasciare i bagagli?","Pot lăsa bagajele aici?","pot la-SA ba-GA-je-le a-ICI"],["A che ora è il check-out?","La ce oră este check-out-ul?","la ce O-ra ES-te ceck-AUT-ul"]]);
return fr.concat([["Mi scusi","Scuzați-mă","scu-ZATS-ma"],["Grazie mille!","Mulțumesc mult!","mul-tsu-MESC mult"]])},
taxTxt:function(tx){return "Tassa turistica di Bucarest: "+(tx[2]?"10 lei (circa "+String(tx[2]).replace(".",",")+" €) a notte per persona ("+tx[1].toLowerCase()+"), fissa e indipendente dal prezzo":"non si paga se sei ospite di amici o parenti")+". Spesso è raccolta dalla struttura o dal portale di prenotazione: controlla se è già compresa nel prezzo dell'annuncio."},
STAYTIPS:["La metro (linee M1–M5) funziona dalle 5 circa a mezzanotte circa; di notte servono Bolt, Uber o taxi con tassametro. Il centro storico si gira bene a piedi."],
ZONES:[
["🚇 Metro, bus e biglietti",["Il centro storico, Piața Unirii e l'Ateneul si fanno quasi tutti a piedi. La metro M2 (blu) collega Piața Unirii, Universitate, Piața Romană, Piața Victoriei e Aviatorilor.","Dal 1° maggio 2026 la corsa in metro costa 7 lei (circa 1,30 €); il biglietto unico metro più STB per 120 minuti 9 lei, il 24 ore integrato 23 lei.","Il bus 100 per l'aeroporto Otopeni ha il suo biglietto e si prende alla fermata «Plecări».","Di notte e in caso di fretta, usa Bolt o Uber: costano poco rispetto all'Italia."]],
["🏛️ Parlamento e centro storico",["Il Palazzo del Parlamento si visita solo con una prenotazione telefonica il giorno prima (+40 733 558 102 o 103) e con la carta d'identità fisica o il passaporto. I biglietti si comprano alla porta, non online.","Il Centrul Vechi è molto animato la sera e nel fine settimana.","Dal Parlamento al centro storico sono 20–25 minuti a piedi lungo i viali."],["parlament","centrov"]],
["🎻 Calea Victoriei e Kiseleff",["Calea Victoriei collega Piața Revoluției, l'Ateneul Român e Piața Victoriei: è la strada principale della Bucarest ottocentesca.","Il Muzeul Țăranului è di norma chiuso il lunedì.","Dall'Arcul de Triumf si può proseguire a piedi fino al Muzeul Satului e al parco Herăstrău."],["ateneu","tarani","arcul"]],
["☕ Caffè e cucina romena",["I piatti da provare sono sarmale con polenta, ciorbă (zuppe acide), mici alla griglia e, per dolce, papanași con panna acida e marmellata di amarene.","Nei locali dell'Old Town si lascia di solito una mancia di circa il 10%.","Nelle caffetterie di specialty, come Origo, la mattina del fine settimana c'è la coda."],["carubere","origo","carusel"]],
["🌅 Un giorno fuori Bucarest",["Il palazzo di Mogoșoaia è a circa 30 minuti dal centro: un castello brâncovenesco in riva a un lago (non verificato).","Per le montagne e i castelli della Transilvania (Sinaia, Brașov) servono almeno una giornata e un treno da Gara de Nord (non verificato)."]]],
WTIPS:["L'acqua del rubinetto di Bucarest è potabile, ma molti la trovano poco gradevole e preferiscono quella in bottiglia (da confermare).","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se lo chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Romania fa parte dello spazio Schengen dal 2025: per entrare dall'Italia basta la carta d'identità valida.","La moneta è il leu rumeno (RON, lei): 1 € vale circa 5,34 lei. In pochi posti si paga in euro: usa la carta o cambia pochi lei.","Bucarest ha un'ora avanti rispetto all'Italia.","Mancia: nei ristoranti di solito il 10% circa.","Taxi: usa Bolt, Uber o le colonnine ufficiali; evita chi ti ferma in strada o in aeroporto.","Il lunedì molti musei sono chiusi; a dicembre e nei giorni festivi gli orari cambiano.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Trasporti pubblici: <a href="https://www.stb.ro/" target="_blank" rel="noopener">stb.ro</a> (bus, tram) · <a href="https://www.metrorex.ro/" target="_blank" rel="noopener">metrorex.ro</a> (metro) · treni: <a href="https://www.cfrcalatori.ro/" target="_blank" rel="noopener">cfrcalatori.ro</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Bucarest: <a href="https://ambbucarest.esteri.it" target="_blank" rel="noopener">ambbucarest.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho trovato scioperi annunciati nei trasporti di Bucarest, ma non ho potuto controllarlo sui siti ufficiali. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.stb.ro/" target="_blank" rel="noopener">stb.ro</a> per bus e tram e <a href="https://www.metrorex.ro/" target="_blank" rel="noopener">metrorex.ro</a> per la metro.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 80 110 86 Q150 90 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M6 106 V70 H64 V106 Z M10 70 V60 H60 V70 Z M18 60 V52 H52 V60 Z M24 52 V46 H46 V52 Z M30 46 V40 H40 V46 Z M33 40 V30 H37 V40 Z"/></g>'+
'<g style="--k:2"><path d="M88 106 V74 H150 V106 Z M90 74 V66 H148 V74 Z M98 66 Q119 40 140 66 Z M117 44 V36 H121 V44 Z"/></g>'+
'<g style="--k:3"><path d="M176 106 V70 H188 V106 Z M200 106 V70 H212 V106 Z M170 70 H218 V62 H170 Z M174 62 V54 H214 V62 Z M190 54 Q194 38 198 54 Z"/></g>'+
'<g style="--k:4"><path d="M240 106 V60 H260 V106 Z M262 106 V74 H300 V106 Z M250 60 L250 36 L256 60 Z M268 74 L280 56 L292 74 Z M275 56 V44 H285 V56 Z"/></g>'+
'<g style="--k:5"><path d="M326 106 V54 H340 V106 Z M344 106 V62 H358 V106 Z M362 106 V48 H376 V106 Z M326 54 L333 40 L340 54 Z M362 48 L369 32 L376 48 Z M322 106 H380 V102 H322 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M14 90 h40 M14 80 h40"/><path d="M96 92 h46 M96 84 h46"/><path d="M264 94 h34"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.bucarest);
