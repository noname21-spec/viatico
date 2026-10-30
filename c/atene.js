(function(o){
/* ===== Atene (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.atene=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
ATH:{n:"Atene Eleftherios Venizelos (ATH)",s:"Athens International Airport Eleftherios Venizelos",url:"https://www.aia.gr/en",live:"Athens International Airport",inMin:80,buf:120,pos:[37.9364,23.9445],sd:"Aeroporto ATH · metro linea 3",rt:"Dall'aeroporto: metro linea 3 (blu) diretta fino a Syntagma, in pieno centro.",
 arr:"Dall'Italia si entra in Grecia senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «Metro / Suburban Railway»: la stazione è collegata al terminal da un passaggio coperto. La linea 3 (blu) arriva a Syntagma in circa 40 minuti, a Monastiraki in circa 44. I treni passano ogni 30 minuti circa: il primo parte dall'aeroporto verso le 6:30 e l'ultimo prima di mezzanotte (orari da controllare sul sito della metro, perché le fonti non coincidono). In alternativa c'è il bus espresso X95, che ferma a Syntagma in 60–90 minuti ed è attivo 24 ore su 24.",
 tk:"Biglietto metro per l'aeroporto: 9 € a tratta o 16 € andata e ritorno (valido 30 giorni). Il biglietto urbano da 1,20 € e il biglietto 24 ore non valgono nel tratto dell'aeroporto: va comprato quello apposito alle macchinette o allo sportello della stazione. Il bus X95 costa 5,50 € (da guide, da confermare) e si paga con biglietto da 5,50 € comprato a bordo o in aeroporto.",
 gm:"Athens Airport Metro Station, Spata",
 tips:["La metro non gira di notte: se atterri molto tardi usa il bus X95, che è attivo 24 ore su 24, oppure un taxi.","Il taxi dall'aeroporto al centro ha una tariffa fissa indicata in circa 40 € di giorno e 55 € di notte (da guide, da confermare); conviene solo in tre o quattro persone.","Con la carta contactless Visa o Mastercard si può pagare il biglietto da 1,20 € in città, ma per l'aeroporto serve il biglietto speciale da 9 €.","La metro dall'aeroporto passa anche per Monastiraki: se dormi a Plaka o a Monastiraki conviene scendere lì invece che a Syntagma."]}
};
/* linee (tracciati indicativi) */
var SEG={
m3:{c:"#1f5fae",n:"Metro linea 3 (blu) dall'aeroporto",p:[[37.9364,23.9445,"Aeroporto",2],[38.0239,23.8336,"Doukissis Plakentias",2],[37.9764,23.7467,"Evangelismos",2],[37.9756,23.7354,"Syntagma",2],[37.9760,23.7258,"Monastiraki",2]]},
m2:{c:"#d6001c",n:"Metro linea 2 (rossa)",p:[[37.9685,23.7297,"Akropoli",2],[37.9756,23.7354,"Syntagma",2],[37.9806,23.7336,"Panepistimio"],[37.9842,23.7287,"Omonia",2]]},
m1:{c:"#00a651",n:"Metro linea 1 (verde)",p:[[37.9760,23.7258,"Monastiraki",2],[37.9768,23.7207,"Thissio",2],[37.9842,23.7287,"Omonia",2],[37.9928,23.7302,"Victoria",2]]}
};
var START=[37.9756,23.7354];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
acropoli:{t:"Acropoli e Partenone",z:"A",p:1,min:90,id:120,max:170,pos:[37.9715,23.7267],q:"Acropoli di Atene",cls:"",multi:1,sun:1,tk:[30,"Acropoli (30 €, con fascia oraria)",1,1],
 win:function(wd,d){var o=d.slice(5);return[8*60,((o>="11-01"||o<="03-31")?17*60:19*60+30)-30]},
 d:"La rocca sacra di Atene, con il Partenone del V secolo a.C. in cima, il tempio dell'Eretteo con le statue delle Cariatidi e i Propilei all'ingresso. Dalla cima si vede tutta la città fino al mare.",
 m:"Biglietto 30 € tutto l'anno, per un solo ingresso con fascia oraria di 2 ore: si compra online su hhticket.gr (60 giorni prima, in estate conviene prenotare con 1–3 settimane di anticipo) e non esistono biglietti salta-coda. Il biglietto cumulativo per più siti è stato tolto nel 2025: ogni sito ha il suo. Fino al 31 ottobre l'orario è 8:00–19:30 (ultimo ingresso 19:00), da novembre 8:00–17:00 (ultimo ingresso 16:30). Chiuso il 1° gennaio, il 25 marzo, il 1° maggio, a Pasqua greca, il 25 e 26 dicembre. Gratis il 28 ottobre (con prenotazione). Scarpe con la suola che non scivola: il marmo è lucido. Dati da guide, non letti sul sito del Ministero: da confermare."},
museoac:{t:"Museo dell'Acropoli",z:"D",p:2,min:75,id:100,max:150,pos:[37.9684,23.7285],q:"Museo dell'Acropoli, Atene",cls:"",multi:1,tk:[20,"Museo dell'Acropoli (20 €)",1,1],
 win:function(wd,d){var o=d.slice(5),w=(o>="11-01"||o<="03-31");return w?[wd===4?9*60:9*60,(wd<=3?17*60:wd===4?22*60:20*60)-30]:[8*60,(wd===4?22*60:20*60)-30]},
 d:"Il museo che custodisce le sculture, i fregi e le statue originali dell'Acropoli, in un edificio moderno di vetro costruito sopra scavi antichi. La sala del Partenone, all'ultimo piano, ha i fregi disposti come sul tempio e la vista sulla rocca.",
 m:"Biglietto 20 € tutto l'anno (ridotto 10 €). Fino al 31 ottobre aperto tutti i giorni 8:00–20:00, il venerdì fino alle 22:00; da novembre lunedì–giovedì 9:00–17:00, venerdì 9:00–22:00, sabato e domenica 9:00–20:00. Chiuso il 1° gennaio, il 1° maggio, a Pasqua greca e il 25 e 26 dicembre. Si compra online sul sito del museo (30 giorni prima). Gratis il 28 ottobre. Il venerdì sera è l'orario più bello, con l'Acropoli illuminata fuori dalle vetrate (da guide, da confermare)."},
plaka:{t:"Plaka e Anafiotika",z:"A",p:2,min:45,id:70,max:110,pos:[37.9733,23.7292],q:"Plaka, Atene",cls:"walk",multi:0,sun:1,
 d:"Il quartiere più antico, ai piedi della rocca: viuzze con case neoclassiche, bouganville e taverne. In alto, Anafiotika sembra un villaggio delle Cicladi, con casette bianche costruite dagli operai dell'isola di Anafi nell'Ottocento.",
 m:"Si cammina gratis. Le vie principali (Adrianou, Kydathineon) hanno ristoranti e negozi di souvenir per turisti: per mangiare conviene spostarsi nelle vie laterali. Per Anafiotika si sale dalle scalette di Stratonos o di Theorias."},
agora:{t:"Agorà antica e Tempio di Efesto",z:"F",p:2,min:60,id:80,max:120,pos:[37.9748,23.7218],q:"Agorà antica di Atene",cls:"",multi:1,sun:1,tk:[20,"Agorà antica e museo (20 €)",1,1],
 win:function(wd,d){var o=d.slice(5);return[8*60,((o>="11-01"||o<="03-31")?17*60:20*60)-20]},
 d:"Il centro della vita civile dell'Atene antica, dove camminavano Socrate e Demostene: il tempio di Efesto del V secolo a.C., il meglio conservato di tutta la Grecia, la Stoà di Attalo ricostruita, che ospita il museo, e la chiesa bizantina dei Santi Apostoli.",
 m:"Biglietto 20 € (comprende il museo nella Stoà di Attalo). Fino al 31 ottobre 8:00–20:00, da novembre 8:00–17:00; ultimo ingresso 20 minuti prima. Una delle entrate (via Adrianou) risulta chiusa per lavori: usa l'ingresso di Apostolou Pavlou, vicino a Thissio. Prezzi e orari da guide secondarie, da confermare."},
romana:{t:"Agorà romana, Torre dei Venti e Biblioteca di Adriano",z:"B",p:4,min:40,id:55,max:80,pos:[37.9745,23.7263],q:"Agorà romana, Atene",cls:"",multi:1,sun:1,tk:[10,"Agorà romana (10 €)",1,1],
 win:function(wd,d){var o=d.slice(5);return[8*60,((o>="11-01"||o<="03-31")?17*60:20*60)-20]},
 d:"Il mercato dell'Atene di età romana, con la Torre dei Venti, un edificio ottagonale del I secolo a.C. che era orologio ad acqua e meridiana. A due passi, accanto a piazza Monastiraki, ci sono i resti della Biblioteca di Adriano.",
 m:"Agorà romana 10 €, Biblioteca di Adriano 10 € (due biglietti separati). Fino al 31 ottobre 8:00–20:00, da novembre l'orario è ridotto (8:00–17:00 per l'Agorà romana; la Biblioteca di Adriano risulta aprire fino alle 15). Dalla strada si vedono già la Torre dei Venti e parte della Biblioteca. Da guide, da confermare."},
zeus:{t:"Tempio di Zeus Olimpio e Arco di Adriano",z:"C",p:3,min:45,id:60,max:90,pos:[37.9693,23.7330],q:"Tempio di Zeus Olimpio, Atene",cls:"",multi:1,sun:1,tk:[20,"Tempio di Zeus Olimpio (20 €)",1,1],
 win:function(wd,d,s){var o=d.slice(5);return(o>="11-01"||o<="03-31")?[8*60,15*60-20]:[8*60,Math.min(s,20*60)-20]},
 d:"Quindici colonne corinzie alte 17 metri, quel che resta del più grande tempio della Grecia, costruito in 600 anni e completato dall'imperatore Adriano. Accanto, l'Arco di Adriano segna il confine tra l'Atene greca e quella romana.",
 m:"Biglietto 20 € (da guide). Fino al 31 ottobre dalle 8:00 fino al tramonto, in inverno 8:00–15:00. L'arco e le colonne si vedono bene anche da fuori, gratis, dal viale Amalias. Orari da guide, da confermare."},
stadio:{t:"Stadio Panatenaico",z:"C",p:4,min:30,id:45,max:70,pos:[37.9684,23.7410],q:"Stadio Panatenaico, Atene",cls:"",multi:1,tk:[12,"Stadio Panatenaico (12 €)",1,1],
 win:function(wd,d){var o=d.slice(5);return[8*60,((o>="11-01"||o<="02-28")?17*60:19*60)]},
 d:"Lo stadio tutto in marmo bianco dove nel 1896 si disputarono le prime Olimpiadi moderne. Si sale fino al podio dei vincitori e si entra nel tunnel dei giochi, con un'audioguida compresa nel biglietto.",
 m:"Biglietto 12 € con audioguida in 11 lingue (da athenstourism.org, da confermare perché altre fonti indicano un prezzo più alto). Aperto ogni giorno 8:00–19:00 da marzo a ottobre, 8:00–17:00 da novembre a febbraio. Chiuso il 1° gennaio, il 1° maggio, a Pasqua greca e il 25 dicembre. I biglietti si comprano solo alla cassa dello stadio."},
syntagma:{t:"Piazza Syntagma, Parlamento e Giardino Nazionale",z:"C",p:3,min:20,id:35,max:60,pos:[37.9758,23.7356],q:"Tomba del Milite Ignoto, Atene",cls:"walk",sun:1,
 d:"Davanti al Parlamento, gli Euzoni, i soldati in gonnellino bianco e scarpe con i pompon, fanno la guardia alla Tomba del Milite Ignoto. Subito dietro il palazzo si apre il Giardino Nazionale, con alberi e stagni, e in fondo lo Zappeion.",
 m:"Gratis. Il cambio della guardia semplice è ogni ora, a ora piena, in pochi minuti; la sfilata solenne con la banda e le divise complete è la domenica alle 11:00 e dura una ventina di minuti. In piazza ci sono spesso manifestazioni e cortei: se sono molto affollati cambia strada."},
museoarch:{t:"Museo Archeologico Nazionale",z:"G",p:3,min:90,id:120,max:180,pos:[37.9890,23.7326],q:"Museo Archeologico Nazionale, Atene",cls:"",multi:1,tk:[20,"Museo Archeologico Nazionale (20 €)",1,1],
 win:function(wd,d){var o=d.slice(5),w=(o>="11-01"||o<="03-31");return[wd===0?13*60:8*60+30,(w?(wd===0?17*60:16*60):20*60)-30]},
 d:"Il più importante museo della Grecia: la maschera d'oro di Agamennone da Micene, la statua in bronzo di Poseidone (o Zeus), i kouroi arcaici, i reperti di Santorini e il meccanismo di Anticitera, un calcolatore astronomico di duemila anni fa.",
 m:"Biglietto 20 € tutto l'anno secondo due guide (un'altra fonte indica 12 € in estate e 6 in inverno: da confermare). Fino al 31 ottobre martedì–domenica 8:30–20:00, lunedì 13:00–20:00; da novembre martedì–domenica 8:30–16:00, lunedì 13:00–17:00. Chiuso il 1° gennaio, il 25 marzo, il 1° maggio, a Pasqua greca e il 25 e 26 dicembre. Gratis il 28 ottobre."},
filopappo:{t:"Collina di Filopappo",z:"D",p:4,min:45,id:60,max:90,pos:[37.9638,23.7226],q:"Collina di Filopappo, Atene",cls:"walk",multi:1,sun:1,
 d:"Una collina boscosa di fronte all'Acropoli, con un monumento romano in cima. Il punto più bello per fotografare il Partenone dall'altra parte della valle, soprattutto al tramonto.",
 m:"Gratis, sempre aperta. La salita dura 15–20 minuti su sentieri di sassi e in parte sterrati: scarpe comode. Si arriva a piedi dalla fermata Akropoli (metro linea 2) o da Thissio. Al tramonto è molto frequentata."},
licabetto:{t:"Monte Licabetto",z:"C",p:5,min:40,id:60,max:100,pos:[37.9819,23.7430],q:"Monte Licabetto, Atene",cls:"walk",multi:1,sun:1,
 d:"La collina più alta del centro (277 metri), con la cappella bianca di San Giorgio sulla cima: da lì Atene si vede tutta, con l'Acropoli e il mare in fondo.",
 m:"Gratis a piedi (circa 20 minuti di salita ripida da Kolonaki, tra scalini e sentiero). Si sale anche con la funicolare dalla base in via Aristippou (circa 7 € a tratta, 10 € andata e ritorno; ogni 30 minuti dalle 9:00 alle 2:30, dati del 2023, da confermare). Al tramonto è affollato."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","plaka",10,"walk","A piedi da Syntagma lungo Mitropoleos e le scalette di Plaka, circa 10 minuti.","A piedi da Plaka verso Syntagma, circa 10 minuti.",{f:[W([[37.9756,23.7354],[37.9748,23.7330],[37.9733,23.7292]])],r:[W([[37.9733,23.7292],[37.9748,23.7330],[37.9756,23.7354]])]});
P2("start","museoac",13,"metro","Metro linea 2 (rossa) da Syntagma a Akropoli (1 fermata, circa 3 minuti), poi 5 minuti a piedi fino al museo.","A piedi fino alla fermata Akropoli e metro linea 2 fino a Syntagma, circa 13 minuti.",{f:[["m2","Syntagma","Akropoli"],W([[37.9685,23.7297],[37.9684,23.7285]])],r:[W([[37.9684,23.7285],[37.9685,23.7297]]),["m2","Akropoli","Syntagma"]]});
P2("museoac","acropoli",12,"walk","A piedi lungo la passeggiata Dionysiou Areopagitou fino all'ingresso principale dell'Acropoli, circa 12 minuti.","A piedi lungo Dionysiou Areopagitou fino al Museo dell'Acropoli, circa 12 minuti.",{f:[W([[37.9684,23.7285],[37.9700,23.7275],[37.9715,23.7267]])],r:[W([[37.9715,23.7267],[37.9700,23.7275],[37.9684,23.7285]])]});
P2("plaka","acropoli",15,"walk","A piedi in salita per via Theorias fino all'ingresso dell'Acropoli, circa 15 minuti.","A piedi in discesa per via Theorias fino a Plaka, circa 15 minuti.",{f:[W([[37.9733,23.7292],[37.9725,23.7280],[37.9715,23.7267]])],r:[W([[37.9715,23.7267],[37.9725,23.7280],[37.9733,23.7292]])]});
P2("acropoli","agora",12,"walk","A piedi giù per la collina dell'Areopago e per via Apostolou Pavlou fino all'ingresso dell'Agorà, circa 12 minuti.","A piedi lungo Apostolou Pavlou fino all'Acropoli, circa 12 minuti.",{f:[W([[37.9715,23.7267],[37.9735,23.7240],[37.9748,23.7218]])],r:[W([[37.9748,23.7218],[37.9735,23.7240],[37.9715,23.7267]])]});
P2("agora","romana",10,"walk","A piedi per via Adrianou fino all'Agorà romana, circa 10 minuti.","A piedi per via Adrianou fino all'Agorà antica, circa 10 minuti.",{f:[W([[37.9748,23.7218],[37.9748,23.7245],[37.9745,23.7263]])],r:[W([[37.9745,23.7263],[37.9748,23.7245],[37.9748,23.7218]])]});
P2("plaka","romana",6,"walk","A piedi per via Kyrristou fino alla Torre dei Venti, circa 6 minuti.","A piedi per via Kyrristou fino a Plaka, circa 6 minuti.",{f:[W([[37.9733,23.7292],[37.9738,23.7275],[37.9745,23.7263]])],r:[W([[37.9745,23.7263],[37.9738,23.7275],[37.9733,23.7292]])]});
P2("start","zeus",14,"walk","A piedi lungo il viale Amalias, costeggiando il Giardino Nazionale, fino al Tempio di Zeus Olimpio, circa 14 minuti.","A piedi lungo Amalias fino a Syntagma, circa 14 minuti.",{f:[W([[37.9756,23.7354],[37.9725,23.7345],[37.9693,23.7330]])],r:[W([[37.9693,23.7330],[37.9725,23.7345],[37.9756,23.7354]])]});
P2("zeus","stadio",12,"walk","A piedi lungo il viale Vasilissis Olgas fino allo Stadio Panatenaico, circa 12 minuti.","A piedi lungo Vasilissis Olgas fino al Tempio di Zeus, circa 12 minuti.",{f:[W([[37.9693,23.7330],[37.9690,23.7370],[37.9684,23.7410]])],r:[W([[37.9684,23.7410],[37.9690,23.7370],[37.9693,23.7330]])]});
P2("start","stadio",18,"walk","A piedi attraverso il Giardino Nazionale e lo Zappeion fino allo Stadio Panatenaico, circa 18 minuti.","A piedi attraverso il Giardino Nazionale fino a Syntagma, circa 18 minuti.",{f:[W([[37.9756,23.7354],[37.9715,23.7385],[37.9684,23.7410]])],r:[W([[37.9684,23.7410],[37.9715,23.7385],[37.9756,23.7354]])]});
P2("acropoli","filopappo",20,"walk","A piedi dall'ingresso dell'Acropoli alla collina di Filopappo per il sentiero, circa 20 minuti.","A piedi dalla collina di Filopappo all'Acropoli, circa 20 minuti.",{f:[W([[37.9715,23.7267],[37.9680,23.7245],[37.9638,23.7226]])],r:[W([[37.9638,23.7226],[37.9680,23.7245],[37.9715,23.7267]])]});
P2("start","licabetto",25,"walk","A piedi per Kolonaki, poi in salita fino alla funicolare o alla cima, circa 25 minuti fino alla base.","A piedi dalla base del Licabetto verso Syntagma, circa 25 minuti.",{f:[W([[37.9756,23.7354],[37.9785,23.7410],[37.9794,23.7428]])],r:[W([[37.9794,23.7428],[37.9785,23.7410],[37.9756,23.7354]])]});
P2("start","museoarch",25,"metro","Metro linea 2 (rossa) da Syntagma a Omonia (2 fermate, circa 5 minuti), poi 12 minuti a piedi lungo via 28 Ottobre fino al museo.","A piedi fino a Omonia e metro linea 2 fino a Syntagma, circa 25 minuti.",{f:[["m2","Syntagma","Omonia"],W([[37.9842,23.7287],[37.9890,23.7326]])],r:[W([[37.9890,23.7326],[37.9842,23.7287]]),["m2","Omonia","Syntagma"]]});
/* ritorno in aeroporto: metro linea 3 da Syntagma */
var RET={
ATH:{
 A:{min:55,txt:"Metro linea 3 (blu) da Syntagma (o da Monastiraki) fino all'aeroporto, senza cambi, circa 40 minuti. Il treno passa ogni 30 minuti circa e l'ultimo parte poco prima di mezzanotte: calcola l'attesa. Biglietto per l'aeroporto 9 € (16 € andata e ritorno), da comprare alle macchinette in stazione. In alternativa il bus X95 da piazza Syntagma (5,50 €, 60–90 minuti, anche di notte).",g:[["m3","Syntagma","Aeroporto"]]}}
};
var ARR={
ATH:[["m3","Aeroporto","Syntagma"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
yiasemi:{n:"Yiasemi",a:"Mnisikleous 23, Plaka",z:"A",r:"n.d.",pos:[37.9733,23.7298],h:D7("09:00-22:00"),
 d:"Un piccolo caffè con giardino di gelsomino nelle vie alte di Plaka, per colazione, brunch e caffè greco. Si mangia all'aperto, all'ombra, a pochi minuti dalla salita all'Acropoli.",pr:"Colazione o brunch intorno ai 5–12 € (dato da guide). Orari non verificati: da controllare."},
tristrato:{n:"Tristrato Café",a:"Dedalou 34, Plaka",z:"A",r:"n.d.",pos:[37.9735,23.7278],h:D7("09:00-21:00"),
 d:"Un caffè in una via pedonale di Plaka dove il caffè greco arriva nel bricco di rame; accanto al caffè c'è il baklava e altri dolci di sciroppo.",pr:"Un caffè greco con un dolce costa 5–10 € (dato da guide). Orari non verificati: da controllare."},
dianthos:{n:"Dianthos",a:"Adrianou 73, Monastiraki",z:"B",r:"n.d.",pos:[37.9748,23.7247],h:D7("08:30-20:00"),
 d:"Un banco di caffè di qualità e pasticcini a pochi passi dalla piazza di Monastiraki, per un espresso o un freddo caffè greco prima di entrare all'Agorà.",pr:"Un caffè con un dolce intorno ai 4–8 € (dato da guide). Orari non verificati: da controllare."},
klepsidra:{n:"Klepsidra",a:"Klepsydras 4, Plaka",z:"A",r:"n.d.",pos:[37.9743,23.7271],h:D7("09:00-21:00"),
 d:"Un caffè in un cortile fiorito sotto la Torre dei Venti, con vista sull'Acropoli: caffè freddo, dolci e spuntini per una pausa tra una tappa e l'altra.",pr:"Un caffè con uno spuntino sta intorno ai 5–10 € (dato da guide). Orari non verificati: da controllare."},
bairaktaris:{n:"Bairaktaris",a:"Piazza Monastirakiou 2",z:"B",r:"n.d.",pos:[37.9762,23.7254],h:D7("09:00-23:59"),
 d:"La taverna del souvlaki sulla piazza di Monastiraki, aperta dal 1879: gyros e souvlaki nella pita, o servito al tavolo con patate fritte, insalata e pane. È un pasto veloce in un posto affollato e semplice, aperto fino a notte (fino alle 2).",pr:"Una pita con la carne costa circa 4 €; un piatto al tavolo 8–15 € (dato da guide). Orari da athenspotlighted.gr: 9–2 tutti i giorni, da confermare."},
kostas:{n:"Kostas Souvlaki",a:"Piazza Agias Irinis 2",z:"B",r:"n.d.",pos:[37.9775,23.7271],h:["10:00-17:00","10:00-17:00","10:00-17:00","10:00-17:00","10:00-17:00","",""],
 d:"Un piccolo chiosco del 1950 sulla piazza di Agia Irini: pochi posti, carne alla brace e pita fatta sul momento. Chiude quando finisce la carne, di solito nel primo pomeriggio.",pr:"Una pita costa circa 3,50 € (dato da guide), solo contanti. Chiuso il fine settimana secondo una scheda (un'altra dice solo la domenica): da confermare."},
diporto:{n:"Diporto Agoras",a:"Sokratous 9 e Theatrou, Atene",z:"B",r:"n.d.",pos:[37.9806,23.7261],h:["09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00",""],
 d:"Una taverna senza insegna in un seminterrato vicino al mercato centrale: non c'è menù, si mangia a tavolo comune quello che c'è, con il vino della casa spillato dalla botte. Un luogo vero, per chi non ha fretta.",pr:"Un pranzo sta intorno ai 12–18 € a testa (dato da guide), solo contanti, niente prenotazioni. Aperto per pranzo dal lunedì al sabato, domenica chiuso (da una scheda online, da confermare)."},
karamanlidika:{n:"Karamanlidika tou Fani",a:"Sokratous 1 e Evripidou 52",z:"B",r:"n.d.",pos:[37.9794,23.7266],h:["12:00-23:59","12:00-23:59","12:00-23:59","12:00-23:59","12:00-23:59","12:00-23:59","12:00-18:00"],
 d:"Una salumeria-taverna a due passi dal mercato centrale, specializzata in carni stagionate e formaggi del nord della Grecia (pastourma, salsicce, graviera) e piatti anatolici. Si mangia al banco o ai tavoli.",pr:"Un pasto con affettati, formaggi e un calice di vino sta intorno ai 25–35 € (dato da guide). Orari da una scheda online (lunedì–sabato 12–24, domenica 12–18): da confermare."},
platanos:{n:"Platanos Taverna",a:"Diogenous 4, Plaka",z:"A",r:"n.d.",pos:[37.9741,23.7264],h:D7("12:00-23:00"),
 d:"Una delle taverne più vecchie di Plaka, con tavoli sotto un platano in una piazzetta: agnello al forno (kleftiko), gigantes, polpo stufato e insalate semplici.",pr:"Un pasto con un piatto principale sta intorno ai 18–30 € (dato da guide). Orari non verificati: da controllare."},
kafeneio:{n:"To Kafeneio",a:"Epicharmou 1, Plaka",z:"A",r:"n.d.",pos:[37.9729,23.7294],h:D7("12:00-23:30"),
 d:"Un locale in stile caffè tradizionale nei vicoli alti di Plaka, con piccoli piatti da dividere e vino della casa dalla botte. A volte la sera c'è musica dal vivo.",pr:"Si mangia con circa 15–22 € a testa (dato da guide). Orari non verificati: da controllare."},
diogenis:{n:"Diogenis",a:"Lysiou 4, Plaka",z:"A",r:"n.d.",pos:[37.9740,23.7283],h:D7("12:00-23:00"),
 d:"Una piccola taverna di quartiere dietro la via principale di Plaka, con la cucina di casa: moussaka, gemista (verdure ripiene) e vino sfuso.",pr:"Si mangia con circa 15–22 € a testa (dato da guide). Orari non verificati: da controllare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["yiasemi","tristrato","klepsidra"],B:["dianthos","yiasemi"],C:["yiasemi","tristrato"],D:["tristrato","yiasemi"],F:["dianthos","tristrato"],G:["dianthos","yiasemi"]},
pra:{A:["bairaktaris","platanos","kafeneio"],B:["kostas","diporto","bairaktaris","karamanlidika"],C:["bairaktaris","kostas","kafeneio"],D:["bairaktaris","platanos"],F:["bairaktaris","diporto","karamanlidika"],G:["diporto","karamanlidika","bairaktaris"]},
cen:{A:["platanos","kafeneio","diogenis"],B:["karamanlidika","bairaktaris","platanos"],C:["kafeneio","diogenis","karamanlidika"],D:["platanos","diogenis"],F:["karamanlidika","platanos"],G:["karamanlidika","kafeneio"]},
snk:{A:["klepsidra","dianthos","yiasemi"],B:["bairaktaris","dianthos"],C:["tristrato","dianthos"],D:["tristrato","klepsidra"],F:["dianthos","bairaktaris"],G:["dianthos","bairaktaris"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"acropoli",t:"Acropoli e Museo dell'Acropoli",acts:["acropoli","museoac"],need:300,core:1},
{id:"antica",t:"Plaka, Agorà antica e Agorà romana",acts:["plaka","agora","romana"],need:270,core:1},
{id:"syn",t:"Syntagma, Zeus Olimpio e Stadio Panatenaico",acts:["syntagma","zeus","stadio"],need:240,core:1},
{id:"museo",t:"Museo Archeologico Nazionale",acts:["museoarch"],need:150},
{id:"colline",t:"Filopappo e Licabetto al tramonto",acts:["filopappo","licabetto"],need:150}
];
var ORDER=["acropoli","museoac","plaka","agora","zeus","syntagma","stadio","romana","museoarch","filopappo","licabetto"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["pla","Plaka / Monastiraki (centro storico)",[37.9745,23.7285],"A"],
["syn","Syntagma / Kolonaki",[37.9770,23.7385],"C"],
["kou","Koukaki / Makrygianni (vicino al Museo dell'Acropoli)",[37.9660,23.7280],"D"],
["thi","Thissio / Petralona / Gazi",[37.9775,23.7165],"F"],
["omo","Omonia / Exarchia (vicino al Museo Archeologico)",[37.9860,23.7310],"G"],
["altro","Altra zona (scrivi l'indirizzo)",[37.9756,23.7354],""]
];
/* imposta di soggiorno: tassa per la resilienza climatica, per camera e per notte; qui divisa per persona su una doppia */
var TAX=[["h5","Hotel 4–5 stelle",5.5],["h3","Hotel fino a 3 stelle, B&B o appartamento",2],["host","Ostello o struttura economica",0.75],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Giaùrti me mèli","yogurt greco denso con miele e noci."],["Tirópita","sfoglia ripiena di formaggio feta, dal forno."],["Koulùri","anello di pane al sesamo, la colazione di strada."],["Elinikós kafés","caffè greco: forte, in tazzina, con il fondo."]],
pra:[["Gýros pita","pita con carne di maiale o pollo, pomodoro, cipolla e salsa tzatziki."],["Souvláki","spiedino di carne alla brace, con pane e patatine."],["Choriátiki","l'insalata greca con feta, pomodori, cetrioli e olive."],["Spanakópita","sfoglia con spinaci e feta."]],
cen:[["Moussakà","strati di melanzane, carne macinata e besciamella."],["Kleftikó","agnello cotto lentamente al forno."],["Gemistá","pomodori e peperoni ripieni di riso."],["Saganáki","formaggio fritto in padella."],["Loukoumádes","frittelle con miele e cannella."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Partenone dai Propilei","Foto","Le colonne doriche del Partenone dall'alto dei gradini d'ingresso: arriva appena aperto (8:00) per avere meno gente.",[37.9715,23.7267],"Partenone, Atene","acropoli"],
["📷","L'Eretteo e le Cariatidi","Foto","Le sei statue di donne che reggono il portico: sono copie, gli originali sono nel Museo dell'Acropoli.",[37.9718,23.7260],"Eretteo, Atene","acropoli"],
["📷","L'Acropoli dal Museo","Foto","La rocca illuminata, vista dalle vetrate dell'ultimo piano, il venerdì sera.",[37.9684,23.7285],"Museo dell'Acropoli, Atene","museoac"],
["🤳","Anafiotika","Selfie","Le casette bianche con le bouganville e la rocca sopra: scatta nel vicolo, senza bloccare chi abita lì.",[37.9724,23.7300],"Anafiotika, Atene","plaka"],
["📷","Il tempio di Efesto","Foto","Il tempio dorico visto dalla collina dell'Agorà, con il sole del pomeriggio che scalda il marmo.",[37.9757,23.7217],"Tempio di Efesto, Atene","agora"],
["📷","La Torre dei Venti","Foto","L'edificio ottagonale, con i fregi dei venti scolpiti, in un angolo tranquillo dell'Agorà romana.",[37.9745,23.7263],"Torre dei Venti, Atene","romana"],
["📷","Le colonne di Zeus","Foto","Le colonne corinzie con l'Acropoli sullo sfondo, soprattutto al tramonto.",[37.9693,23.7330],"Tempio di Zeus Olimpio, Atene","zeus"],
["🤳","Gli Euzoni a Syntagma","Selfie","Il soldato in divisa bianca davanti al Parlamento: si può stare accanto ma non toccarlo.",[37.9758,23.7356],"Tomba del Milite Ignoto, Atene","syntagma"],
["📷","Il podio dello Stadio","Foto","Il marmo bianco delle gradinate dallo scalino più alto del podio.",[37.9684,23.7410],"Stadio Panatenaico, Atene","stadio"],
["📷","La maschera di Agamennone","Foto","La maschera d'oro del XVI secolo a.C., nella sala dei reperti di Micene.",[37.9890,23.7326],"Museo Archeologico Nazionale, Atene","museoarch"],
["📷","Il Partenone da Filopappo","Foto","L'Acropoli al tramonto con la valle sotto: il punto da cartolina della città.",[37.9638,23.7226],"Collina di Filopappo, Atene","filopappo"],
["📷","Atene dal Licabetto","Foto","Dalla cima la città bianca fino al mare, con l'Acropoli illuminata la sera.",[37.9819,23.7430],"Monte Licabetto, Atene","licabetto"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-10-31",t:"Dal 1° novembre orari invernali più corti",x:"Fino al 31 ottobre l'Acropoli apre 8:00–19:30 (ultimo ingresso 19:00); dal 1° novembre chiude alle 17:00 (ultimo ingresso 16:30). Anche l'Agorà antica, l'Agorà romana, il Tempio di Zeus e il Museo Archeologico Nazionale accorciano gli orari. Con la fascia oraria obbligatoria sull'Acropoli, d'inverno la giornata utile è breve."},
{from:"2026-10-13",to:"2026-10-28",t:"28 ottobre: festa nazionale e ingressi gratis",x:"Il 28 ottobre (giorno dell'«Ochi») è festa nazionale: sfilate nelle città, scuole e banche chiuse e musei e siti archeologici gratis, ma con prenotazione della fascia oraria (da guide, da confermare). Il centro e Syntagma sono molto affollati e alcune strade sono chiuse al traffico."},
{from:"2026-10-13",to:"2027-03-31",t:"Niente biglietto cumulativo: ogni sito ha il suo",x:"Il biglietto cumulativo (30 € per sette siti) è stato tolto nel 2025: ora Acropoli 30 €, Agorà antica 20 €, Tempio di Zeus Olimpio 20 €, Agorà romana 10 €, Biblioteca di Adriano 10 €. Il Ceramico (Kerameikos) risulta chiuso per restauro dal maggio 2025: controlla prima di andarci."},
{from:"2026-10-13",to:"2027-03-31",t:"Scioperi: possibili con pochi giorni di preavviso",x:"Il 13 ottobre 2026 non ho trovato scioperi dei trasporti annunciati. In Grecia gli scioperi generali sono frequenti e vengono annunciati pochi giorni prima (nell'ottobre 2025 la metro ha funzionato solo dalle 9 alle 17 in una giornata di sciopero); a volte anche il personale dei siti archeologici sospende le visite per alcune ore. Controlla il giorno prima."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: siti chiusi il 25 e 26 dicembre",x:"Acropoli, Museo dell'Acropoli, Agorà e Museo Archeologico restano chiusi il 25 e il 26 dicembre. Il 1° gennaio sono chiusi tutti i siti. Molti locali e negozi riducono gli orari."}
];
/* clima medio di Atene (indicativo, massime/minime) */
var CLIM=[[13,6],[14,7],[16,8],[20,11],[25,15],[30,20],[33,23],[33,23],[28,19],[23,15],[18,11],[14,8]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Atene: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="syntagma"&&WD===6)meta+=" Oggi è domenica: alle 11:00 c'è la sfilata solenne degli Euzoni davanti al Parlamento, con la banda.";
if(it.id==="museoac"&&WD===4)meta+=" Oggi è venerdì: il Museo dell'Acropoli resta aperto fino alle 22:00.";
if(it.id==="museoarch"&&WD===0)meta+=" Oggi è lunedì: il Museo Archeologico Nazionale apre solo nel pomeriggio (dalle 13:00).";
return meta}
var cols=function(x0,n,st,w,y1,y2){var s="";for(var i=0;i<n;i++){var x=(x0+i*st).toFixed(1);s+="M"+x+" "+y1+" V"+y2+" h"+w+" V"+y1+" Z "}return s};
Object.assign(C,{id:"atene",n:"Atene",cn:"Grecia",e:"🏺",flag:"🇬🇷",col:["#0d5eaf","#e8e8e8","#c9a24a"],k:"atene athens grecia greece",
TZ:"Europe/Athens",LL:[37.9755,23.7348],CC:"gr",QN:"Atene",BK:"Atene",ARE:/atene|athens|αθήνα|\b1[01]\d\s?\d{2}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"el-GR",LANGN:"greco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Syntagma",q:"Syntagma metro station, Athens"},
SINGLE:{acts:["acropoli","museoac","plaka","agora","syntagma"],ins:[]},
EXCL:[],
DICON:{acropoli:"🏛️",museoac:"🖼️",plaka:"🏘️",agora:"🏺",romana:"🌬️",zeus:"🏛️",stadio:"🏟️",syntagma:"💂",museoarch:"🗿",filopappo:"⛰️",licabetto:"🌄"},
ZN:{A:"a Plaka",B:"a Monastiraki e Psirì",C:"a Syntagma e Kolonaki",D:"a Koukaki e vicino al Museo dell'Acropoli",F:"a Thissio e Petralona",G:"a Omonia e al Museo Archeologico"},
NEAR:{col:"caffè",pra:"locale veloce o souvlaki",cen:"taverna",snk:"caffè o chiosco"},
SE:{yiasemi:"🥐",tristrato:"☕",dianthos:"☕",klepsidra:"🍰",bairaktaris:"🥙",kostas:"🥙",diporto:"🍷",karamanlidika:"🧀",platanos:"🍖",kafeneio:"🍷",diogenis:"🍆"},
TR:{one:1.2,cap:4.1,lbl:"Metro, tram, bus e filobus (OASA)",
 air:{ATH:{one:9,n:"Metro per l'aeroporto (9 € a tratta)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:4.1,note:"Il biglietto 24 ore (4,10 €) vale su metro, tram, bus e filobus di Atene per 24 ore dalla convalida, ma non nel tratto dell'aeroporto."},
 {n:"Biglietto turistico 5 giorni",d:5,p:8.2,only:function(T){return T.n>=3},note:"Il biglietto da 5 giorni (8,20 €) vale su tutta la rete urbana per cinque giorni dalla convalida, ma non nel tratto dell'aeroporto."}],
 note:"Prezzi da guide recenti (2026), da confermare sul sito dell'azienda dei trasporti (OASA, athenstransport.com): corsa singola 1,20 € (valida 90 minuti, con cambi illimitati), 24 ore 4,10 €, 5 giorni 8,20 €. Con carta contactless Visa o Mastercard ogni corsa costa 1,20 € e il tetto è 4,10 € al giorno. Il biglietto per l'aeroporto costa 9 € (16 € andata e ritorno) e il biglietto 3 giorni con aeroporto 20 €. Il biglietto va convalidato prima di salire a bordo di bus e tram o prima dei tornelli in metro; i controllori sono frequenti e la multa è alta."},
FOOD:{co:[6,"Colazione al caffè"],pr:[9,"Pranzo (pita, souvlaki o taverna)"],ce:[18,"Cena in taverna"],sp:[4,"Spuntini e dolci"]},
T:{ride:"In metro o in tram",move:"quasi tutto a piedi, con qualche tratto in metro",bags:"«Μπορώ να αφήσω τις βαλίτσες μου εδώ;» (boró na afìso tis valìtses mu edhó)",bagsPM:"«Μπορώ να αφήσω τις βαλίτσες μου εδώ μέχρι το απόγευμα;» (boró na afìso tis valìtses mu edhó mèchri to apòghevma)",bagsAM:"«Μπορώ να αφήσω τις βαλίτσες μου εδώ μέχρι το μεσημέρι;» (boró na afìso tis valìtses mu edhó mèchri to mesimèri)",
pra:"Un locale veloce o un souvlaki",praZ:{A:"Le taverne sulle vie principali di Plaka con i camerieri che ti chiamano sono per turisti e costano di più: per mangiare cerca le vie laterali o spostati verso Monastiraki.",B:"Intorno al mercato centrale (Athinas, Sokratous) si mangia bene e con prezzi giusti: è dove vanno gli ateniesi."},
freeLong:"Qualche idea: un caffè freddo a Plaka, una passeggiata nel Giardino Nazionale, una sosta al Museo dell'Acropoli o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè all'ombra.",
remind:"Per l'Acropoli serve il biglietto con fascia oraria (si compra online) e per salire servono scarpe con la suola che non scivola. Porta acqua e un cappello.",
rain1:"Al coperto: il Museo dell'Acropoli, il Museo Archeologico Nazionale, i caffè di Plaka e le taverne.",
rainM:"Al coperto: Museo dell'Acropoli, Museo Archeologico Nazionale, museo dell'Agorà nella Stoà di Attalo e le taverne.",
water:"L'acqua del rubinetto di Atene è potabile, ma ha un sapore piuttosto calcareo: molti preferiscono quella in bottiglia, che costa poco. Sulla rocca dell'Acropoli e nei grandi siti ci sono fontanelle: attiva «Acqua» sulla mappa.",
kitchen:"Ad Atene si pranza tardi, tra le 14 e le 16, e si cena dalle 20:30 alle 22: nelle taverne la cucina è sempre aperta fino a tardi, ma prima delle 19 i locali sono semivuoti.",
night:[["🍷","Un ouzo con i meze, o un calice di vino della casa, in una taverna di Plaka o Psirì."],["🕙","Le taverne servono fino alle 23–24; la metro gira fino a poco dopo mezzanotte (il bus X95 per l'aeroporto è attivo 24 ore su 24)."],["🌅","Per chiudere la giornata, un aperitivo su una terrazza con vista sull'Acropoli illuminata."]],
bottle:"Borraccia vuota (da riempire: l'acqua è potabile)",
fuso:"Atene è un'ora avanti rispetto all'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per taverne e chioschi: una colazione sta intorno ai 5–8 €, una pita 3,50–4 € e una cena in taverna con un piatto principale intorno ai 15–25 €. Quasi ovunque si paga con la carta; nelle taverne piccole e ai chioschi conviene avere qualche euro in contanti. Spesso si paga un piccolo coperto (pane) di 1–2 € a testa.",
taxNote:"Ad Atene si paga la tassa per la resilienza climatica, per camera e per notte: l'importo cambia con la categoria della struttura e la stagione (marzo–ottobre più alta, novembre–febbraio più bassa). Spesso non è compresa nel prezzo dell'annuncio ma si paga alla struttura: controlla. Importi indicativi da confermare.",
mcrit:"Criteri: caffè e taverne tradizionali di Plaka, Monastiraki e del mercato centrale, niente catene. Colazione e cena restano sotto i 15–25 € a persona. Gli orari e i prezzi sono quelli di guide e schede online (ottobre 2026) e non sono stati letti sui siti dei locali; le valutazioni non sono state verificate: controlla gli orari qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["La metro linea 3 arriva a Syntagma in circa 40 minuti, con un treno ogni 30 minuti: calcola l'attesa. Il biglietto per l'aeroporto costa 9 €.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto metro per l'aeroporto (9 €) e biglietto 24 ore (4,10 €): si comprano alle macchinette o con la carta contactless in città",function(E){return true}],["acr","Biglietto per l'Acropoli con fascia oraria (30 €): prenota online su hhticket.gr",["acropoli"]],["mac","Biglietto per il Museo dell'Acropoli (20 €), meglio online",["museoac"]],["ago","Biglietti per l'Agorà antica (20 €) e per l'Agorà romana (10 €): ora si comprano separati",["agora","romana"]],["zeu","Biglietto per il Tempio di Zeus Olimpio (20 €)",["zeus"]],["scarpe","Scarpe con la suola che non scivola per l'Acropoli (il marmo è lucido), cappello e acqua"],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per chioschi e taverne piccole"]],
NUM:{1:["ένα","èna"],2:["δύο","dìo"],3:["τρεις","tris"],4:["τέσσερις","tèsseris"],5:["πέντε","pènte"],6:["έξι","èxi"],7:["εφτά","eftà"],8:["οχτώ","ochtò"],9:["εννιά","ennià"],10:["δέκα","dèka"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Καλημέρα / Καλησπέρα","kalimèra / kalispèra (Kaliméra / Kalispéra)"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore",N===1?"Ένα τραπέζι για έναν, παρακαλώ":"Ένα τραπέζι για "+nu[0]+", παρακαλώ",N===1?"èna trapèzi ya ènan, parakalò (Éna trapézi gia énan, parakaló)":"èna trapèzi ya "+nu[1]+", parakalò (Éna trapézi gia "+nu[1]+", parakaló)"],["Un caffè greco, per favore","Έναν ελληνικό καφέ, παρακαλώ","ènan elinikò kafè, parakalò (Énan ellinikó kafé, parakaló)"],["Una bottiglia d'acqua, per favore","Ένα μπουκάλι νερό, παρακαλώ","èna bukàli nerò, parakalò (Éna boukáli neró, parakaló)"],["Il conto, per favore","Τον λογαριασμό, παρακαλώ","ton logariasmò, parakalò (Ton logariasmó, parakaló)"],["Posso pagare con la carta?","Μπορώ να πληρώσω με κάρτα;","boró na plirósso me kàrta (Boró na pliróso me kárta)"],["Quanto costa?","Πόσο κάνει;","pòso kàni (Póso káni)"],["Dov'è la metro?","Πού είναι το μετρό;","pu ìne to metrò (Pou eínai to metró)"],["Qual è la metro per l'aeroporto?","Ποιο μετρό πάει στο αεροδρόμιο;","pio metrò pài sto aerodròmio (Poio metró páei sto aerodrómio)"]];
if(M)fr=fr.concat([["Ho una prenotazione","Έχω κράτηση","èco kràtisi (Écho krátisi)"],["Posso lasciare i bagagli?","Μπορώ να αφήσω τις βαλίτσες μου εδώ;","boró na afìso tis valìtses mu edhò (Boró na afíso tis valítses mou edó)"],["A che ora è il check-out?","Τι ώρα είναι το check-out;","ti òra ìne to ceck-àut (Ti óra eínai to check-out)"]]);
return fr.concat([["Salute!","Γεια μας!","ya mas (Gia mas)"],["Mi scusi","Συγγνώμη","signòmi (Signómi)"],["Grazie mille!","Ευχαριστώ πολύ!","efcharistò polì (Efcharistó polí)"]])},
taxTxt:function(tx){return "Tassa per la resilienza climatica di Atene: "+(tx[2]>0?"circa "+String(tx[2]).replace(".",",")+" € a notte per persona ("+tx[1].toLowerCase()+"), calcolata sulla camera e divisa su due persone":"non si paga se sei ospite di amici o parenti")+". L'importo cambia con la categoria e la stagione (marzo–ottobre più alta, novembre–febbraio più bassa) e di solito si paga alla struttura: controlla se è già compresa nel prezzo dell'annuncio. Importi da confermare."},
STAYTIPS:["La metro (linee 1, 2, 3), il tram e i bus si usano con lo stesso biglietto da 1,20 € (valido 90 minuti). A Plaka e Monastiraki puoi muoverti quasi tutto a piedi, ma le strade sono in salita e di sera i vicoli sono animati fino a tardi."],
ZONES:[
["🚇 Metro, tram e biglietti",["Un solo biglietto vale su metro, tram, bus e filobus: la corsa singola costa 1,20 € ed è valida 90 minuti; il biglietto 24 ore costa 4,10 € e quello per 5 giorni 8,20 €.","Il biglietto per l'aeroporto è a parte e costa 9 € (16 € andata e ritorno): quello urbano non vale nel tratto dell'aeroporto.","Convalida il biglietto prima di entrare ai tornelli. Con la carta contactless Visa o Mastercard ogni corsa costa 1,20 € e il tetto giornaliero è 4,10 €.","Syntagma, Monastiraki e Akropoli sono le fermate più comode per la parte antica."]],
["🏛️ Acropoli, Agorà e siti antichi",["Il biglietto dell'Acropoli (30 €) ha una fascia oraria di 2 ore e si compra online su hhticket.gr: l'ingresso principale è dal lato ovest, dopo una salita in marmo scivoloso.","Per i siti dell'Agorà e del Tempio di Zeus ci sono biglietti separati: non esiste più il cumulativo.","Nel pomeriggio d'estate fa molto caldo sulla rocca: vai appena apre (8:00) o nel tardo pomeriggio.","Il Museo dell'Acropoli, il venerdì sera, è aperto fino alle 22:00."],["acropoli","museoac","agora","zeus"]],
["💂 Syntagma e Plaka",["Il cambio della guardia semplice è ogni ora, quello solenne la domenica alle 11:00.","Plaka e Anafiotika si visitano meglio al mattino presto o a fine giornata.","Per mangiare spostati dalle vie principali di Plaka verso Monastiraki o il mercato centrale."],["syntagma","plaka"]],
["🍽️ Mangiare ad Atene",["Pita con la carne a 3,50–4 €, taverne con piatti a 8–15 €: il pasto è economico, ma in Grecia non c'è fretta.","Spesso si paga un coperto (pane) di 1–2 € a testa: è normale.","Si lascia di solito il 5–10 % o si arrotonda al tavolo, in contanti."],["bairaktaris","kostas","karamanlidika"]],
["🌅 Un giorno fuori Atene",["Capo Sunion, con il tempio di Poseidone, è a circa un'ora e mezza di bus da Atene e si visita al tramonto.","Il Pireo e l'isola di Egina (circa un'ora di traghetto) si raggiungono in metro linea 1 più il traghetto."]]],
WTIPS:["L'acqua del rubinetto di Atene è potabile, ma molti preferiscono quella in bottiglia per il sapore calcareo.","Attiva «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Nei locali si può chiedere un bicchiere d'acqua: arriva spesso insieme al caffè o al pasto, gratis.","Le fontane monumentali non sono da bere."],
GEN:["La Grecia usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Atene è un'ora avanti rispetto all'Italia.","Mancia: nelle taverne si arrotonda o si lascia il 5–10 %, in contanti; il servizio non è incluso nel conto di solito.","In estate l'Acropoli può chiudere nelle ore più calde in caso di ondata di caldo: controlla gli avvisi.","Molti chioschi e taverne piccole accettano solo contanti: porta qualche euro.","Le manifestazioni a Syntagma sono frequenti: restano pacifiche, ma conviene evitare la piazza durante i cortei.","Controlla orari e prezzi di siti e locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (numero unico europeo). Polizia 100, ambulanza 166, vigili del fuoco 199, polizia turistica 1571.</li><li>🚇 Trasporti pubblici: <a href="https://www.oasa.gr/" target="_blank" rel="noopener">oasa.gr</a> · metro e tram: <a href="https://www.stasy.gr/" target="_blank" rel="noopener">stasy.gr</a>.</li><li>🇮🇹 Ambasciata d\'Italia ad Atene: <a href="https://ambatene.esteri.it" target="_blank" rel="noopener">ambatene.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho trovato scioperi dei trasporti annunciati per i prossimi giorni. In Grecia gli scioperi generali sono frequenti e vengono annunciati con pochi giorni di preavviso (per esempio, nell\'ottobre 2025 metro, tram e treno urbano hanno funzionato solo dalle 9 alle 17 in una giornata di sciopero); a volte anche il personale dei siti archeologici sospende le visite per alcune ore. Nei giorni prima controllate <a href="https://www.stasy.gr/" target="_blank" rel="noopener">stasy.gr</a> e <a href="https://www.oasa.gr/" target="_blank" rel="noopener">oasa.gr</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 78 110 84 Q150 88 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M4 106 Q30 34 50 34 Q74 34 96 106 Z M44 34 V26 H56 V34 Z M43 26 H57 L50 17 Z M49.5 17 V10 H50.5 V17 Z"/></g>'+
'<g style="--k:2"><path d="M108 106 L118 74 H226 L236 106 Z M122 74 V70 H222 V74 Z '+cols(125,9,11.5,4,70,52)+'M122 52 V47 H222 V52 Z M122 47 L172 36 L222 47 Z"/></g>'+
'<g style="--k:3"><path d="M244 106 V82 H262 V106 Z M242 82 H264 L253 70 Z M252.5 70 V64 H253.5 V70 Z"/></g>'+
'<g style="--k:4"><path d="M274 106 V101 H346 V106 Z '+cols(279,6,11.5,4,101,68)+'M276 68 V62 H344 V68 Z"/></g>'+
'<g style="--k:5"><path d="M356 106 V92 Q356 70 378 70 Q400 70 400 92 V106 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M364 104 Q378 80 392 104 M370 104 Q378 88 386 104"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.atene);

;var n=window.CITIES["atene"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["atene"]);
