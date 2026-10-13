/* ===== Roma (dati verificati il 10 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.roma=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
FCO:{n:"Fiumicino",s:"Roma-Fiumicino Leonardo da Vinci",url:"https://www.adr.it/",live:"Aeroporti di Roma",inMin:75,buf:120,pos:[41.8003,12.2389],sd:"Fiumicino · Leonardo Express",rt:"Dall'aeroporto: Leonardo Express diretto fino a Roma Termini.",
 arr:"Segui i cartelli «Treni» fino alla stazione dell'aeroporto e sali sul Leonardo Express: va senza fermate a Roma Termini in 32 minuti, con un treno ogni 15 minuti circa (il primo parte alle 5:38, l'ultimo alle 23:27).",
 tk:"Biglietto Leonardo Express: 14 € a tratta, al distributore automatico o su trenitalia.com. I biglietti ATAC non valgono su questo treno.",
 gm:"Stazione Fiumicino Aeroporto, Roma",
 tips:["Più economico ma più lento: il regionale FL1 costa circa 8 €, ferma a Trastevere (31 minuti), Ostiense e Tiburtina ma non a Termini.","Il taxi ha una tariffa fissa di 55 € per qualsiasi destinazione dentro le Mura Aureliane, bagagli compresi: conviene solo in 3–4 persone.","La sezione Costi sceglie da sola la soluzione più economica tra biglietti singoli e abbonamenti."]},
CIA:{n:"Ciampino",s:"Roma-Ciampino G. B. Pastine",url:"https://www.adr.it/",live:"Aeroporti di Roma",inMin:55,buf:100,pos:[41.7994,12.5949],sd:"Ciampino · bus per Termini",rt:"Dall'aeroporto: bus diretto fino a Roma Termini.",
 arr:"Uscendo dall'aeroporto trovi le fermate dei bus per Roma Termini (Terravision, SIT, Atral): il viaggio dura circa 40 minuti, traffico permettendo. A Termini scendi in Via Marsala o Via Giolitti, a due passi dalla stazione.",
 tk:"Il bus costa circa 6 € a tratta (7 € andata e ritorno con alcune compagnie): meglio comprarlo online o al banchetto davanti all'uscita. Il biglietto ATAC non basta.",
 gm:"Aeroporto di Roma Ciampino",
 tips:["In alternativa c'è il bus ATRAL fino alla metro A Anagnina, poi la linea A fino a Termini: circa 55 minuti, ma si risparmia un po'.","La sera tarda i bus sono meno frequenti: controlla l'ultimo orario sul sito della compagnia.","Il taxi da Ciampino ha una tariffa fissa di 31 € dentro le Mura Aureliane."]}
};
/* linee (tracciati indicativi) */
var SEG={
mA:{c:"#e8742c",n:"Metro A",p:[[41.9068,12.4573,"Ottaviano",2],[41.9107,12.4668,"Lepanto"],[41.9109,12.4763,"Flaminio",2],[41.9063,12.4823,"Spagna",2],[41.9038,12.4889,"Barberini"],[41.9023,12.4953,"Repubblica"],[41.9009,12.5014,"Termini",2],[41.8956,12.5047,"Vittorio Emanuele"],[41.8915,12.5106,"Manzoni"],[41.8858,12.5099,"San Giovanni",2]]},
mB:{c:"#2a74c4",n:"Metro B",p:[[41.9060,12.5062,"Castro Pretorio"],[41.9009,12.5014,"Termini",2],[41.8948,12.4943,"Cavour"],[41.8913,12.4909,"Colosseo",2],[41.8832,12.4875,"Circo Massimo"],[41.8760,12.4812,"Piramide",2]]},
leo:{c:"#c8102e",n:"Leonardo Express",p:[[41.7996,12.2528,"Aeroporto di Fiumicino",2],[41.8190,12.3050],[41.8450,12.3900],[41.8620,12.4400],[41.8715,12.4813,"Ostiense"],[41.9009,12.5014,"Roma Termini",2]]},
cia:{c:"#3a8a3c",n:"Bus per Ciampino",p:[[41.7994,12.5949,"Aeroporto di Ciampino",2],[41.8230,12.5780],[41.8500,12.5450],[41.8750,12.5250],[41.9009,12.5014,"Roma Termini",2]]}
};
var START=[41.9009,12.5014];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
colosseo:{t:"Colosseo e Fori Imperiali",z:"A",p:1,min:40,id:60,max:100,pos:[41.8902,12.4922],q:"Colosseo, Roma",cls:"",tk:[18,"Colosseo, Foro Romano e Palatino (24 ore)",1,1],
 d:"L'anfiteatro Flavio visto da fuori, con l'Arco di Costantino accanto, e poi Via dei Fori Imperiali, il grande viale con i resti dei Fori di Cesare, Augusto e Traiano ai lati.",
 m:"Da fuori è gratis. Per entrare servono il biglietto nominativo (18 € per Colosseo, Foro Romano e Palatino, valido 24 ore) e un documento: si compra solo su colosseo.it, 30 giorni prima, e in giornata spesso è esaurito."},
campidoglio:{t:"Piazza Venezia e Campidoglio",z:"A",p:4,min:20,id:35,max:60,pos:[41.8933,12.4829],q:"Piazza del Campidoglio, Roma",cls:"walk",
 d:"L'Altare della Patria (il «Vittoriano», che gli italiani chiamano scherzando «macchina da scrivere»), poi la scalinata di Michelangelo fino alla piazza del Campidoglio. Dietro il Palazzo Senatorio c'è il belvedere sul Foro Romano.",
 m:"Piazza e belvedere sul Foro sono gratis. Il Vittoriano si visita gratis a piano terra; la terrazza panoramica in cima è a pagamento."},
pantheon:{t:"Pantheon",z:"B",p:2,min:25,id:40,max:70,pos:[41.8986,12.4769],q:"Pantheon, Roma",cls:"",tk:[5,"Pantheon",1],
 d:"Il tempio romano meglio conservato, ancora con la cupola originale e il buco circolare al centro, da cui entra la luce (e, quando piove, l'acqua). Dentro ci sono le tombe di Raffaello e dei re d'Italia.",
 m:"L'ingresso costa 5 €. Aperto tutti i giorni 9–19 (ultimo ingresso 18:30); durante le messe del sabato sera e della domenica mattina l'accesso turistico può essere limitato."},
navona:{t:"Piazza Navona e Campo de' Fiori",z:"B",p:3,min:30,id:50,max:90,pos:[41.8992,12.4731],q:"Piazza Navona, Roma",cls:"walk",
 d:"La piazza ovale sul vecchio stadio di Domiziano, con la Fontana dei Quattro Fiumi di Bernini, poi i vicoli fino a Campo de' Fiori, dove di mattina c'è il mercato.",
 m:"Il mercato di Campo de' Fiori è aperto dal lunedì al sabato fino a metà giornata. A Navona e nelle vie intorno attenzione ai ristoranti con i camerieri che ti fermano: per mangiare spostati nei vicoli."},
trevi:{t:"Fontana di Trevi",z:"F",p:2,min:20,id:30,max:60,pos:[41.9009,12.4833],q:"Fontana di Trevi, Roma",cls:"",tk:[2,"Fontana di Trevi, accesso alla vasca",1],
 d:"La fontana barocca più grande di Roma, che riempie un'intera facciata di palazzo. Si lancia una moneta con la destra, dando le spalle alla fontana: chi lo fa tornerà a Roma.",
 m:"Dal 2 febbraio 2026 per avvicinarsi alla vasca servono 2 € (gratis per i residenti a Roma e provincia). Aperto 9–22, il venerdì dalle 11:30, ultimo ingresso 21:00; dopo la chiusura si guarda dalla piazza, gratis. Ci sono sempre i borseggiatori."},
spagna:{t:"Piazza di Spagna e Trinità dei Monti",z:"F",p:4,min:25,id:40,max:70,pos:[41.9060,12.4823],q:"Scalinata di Trinità dei Monti, Roma",cls:"walk",
 d:"La Barcaccia di Bernini ai piedi della scalinata di 135 gradini, che sale alla chiesa di Trinità dei Monti: dalla terrazza in cima si vedono i tetti di Roma fino alla cupola di San Pietro.",
 m:"Sedersi sui gradini è vietato (multe fino a 250 €). In Via dei Condotti sfilano le boutique: costa solo guardare."},
sanpietro:{t:"Basilica di San Pietro",z:"C",p:1,min:50,id:75,max:110,pos:[41.9022,12.4539],q:"Basilica di San Pietro, Roma",cls:"",tk:[10,"Cupola di San Pietro (a piedi)",1,1],
 d:"Il colonnato del Bernini e la piazza, poi la basilica più grande del mondo: la Pietà di Michelangelo, il baldacchino di bronzo e la cupola. All'ingresso si passa il controllo di sicurezza.",
 m:"Ingresso gratuito. Spalle e ginocchia coperte, senza eccezioni. La basilica è aperta 7–18:30 (da ottobre), il mercoledì mattina chiude per l'udienza del Papa. La salita alla cupola costa circa 10 € a piedi o 15 € con l'ascensore, fino alle 16:30."},
trastevere:{t:"Trastevere",z:"D",p:3,min:40,id:60,max:100,pos:[41.8896,12.4698],q:"Basilica di Santa Maria in Trastevere, Roma",cls:"walk",
 d:"I vicoli con l'edera, Piazza di Santa Maria in Trastevere con i mosaici d'oro della basilica e le vie del quartiere fino a Piazza Trilussa.",
 m:"La basilica è gratis e aperta fino a sera. Di sera il quartiere si riempie e i locali sulle piazze costano di più: i posti buoni sono nei vicoli."},
ghetto:{t:"Ghetto, Portico d'Ottavia e Isola Tiberina",z:"B",p:5,min:30,id:45,max:70,pos:[41.8925,12.4772],q:"Portico d'Ottavia, Roma",cls:"walk",
 d:"Il quartiere ebraico, il più antico d'Europa, con le rovine del Portico d'Ottavia, la Fontana delle Tartarughe e il Tevere con l'Isola Tiberina.",
 m:"Tutto gratis. Assaggia la torta di ricotta e visciole del forno Boccione e, in stagione, i carciofi alla giudia."}
};
/* tappe in più per i viaggi di più giorni */
Object.assign(STOPS,{
colosseoins:{t:"Colosseo, Foro Romano e Palatino",z:"A",p:1,min:180,id:210,max:240,pos:[41.8902,12.4922],q:"Colosseo, Roma",cls:"",multi:1,tk:[18,"Colosseo, Foro Romano e Palatino (24 ore)"],
 win:function(wd,d){var o=d.slice(5),c=(o>="03-29"&&o<="09-30")?19*60+15:(o>="10-01"&&o<="10-24")?18*60+30:(o>="10-25"||o<="02-15")?16*60+30:(o<="03-15")?17*60:17*60+30;return[9*60,c-30]},
 d:"Dentro l'anfiteatro, sull'arena e ai piani alti; poi il Foro Romano con la Via Sacra e l'Arco di Tito, e il Palatino, la collina dei palazzi imperiali, con la vista sul Circo Massimo.",
 m:"Biglietto nominativo da 18 € su colosseo.it, in vendita 30 giorni prima, valido 24 ore (un ingresso al Colosseo e uno all'area archeologica). Colosseo aperto 8:30, Foro e Palatino 9:00; fino al 24 ottobre si chiude alle 18:30, dal 25 ottobre alle 16:30 (ultimo ingresso un'ora prima). Ingresso gratuito il 4 novembre e la prima domenica del mese."},
vaticani:{t:"Musei Vaticani e Cappella Sistina",z:"C",p:1,min:180,id:210,max:240,pos:[41.9065,12.4536],q:"Musei Vaticani, Roma",cls:"",multi:1,cl:[6],tk:[25,"Musei Vaticani (20 € più 5 € di prenotazione)"],
 win:function(){return[9*60,19*60+30]},
 d:"Un chilometro e mezzo di gallerie: la Galleria delle Carte Geografiche, le Stanze di Raffaello con la «Scuola di Atene» e, alla fine, la Cappella Sistina con il Giudizio Universale di Michelangelo.",
 m:"Biglietto 20 € più 5 € per prenotare l'orario: sul sito ufficiale museivaticani.va. Chiusi la domenica, tranne l'ultima del mese (gratis, solo mattina, con code molto lunghe), e il 1° novembre. Nella Sistina si sta in silenzio e non si fotografa; spalle e ginocchia coperte."},
castel:{t:"Castel Sant'Angelo",z:"C",p:5,min:75,id:90,max:120,pos:[41.9031,12.4663],q:"Castel Sant'Angelo, Roma",cls:"",multi:1,tk:[16,"Castel Sant'Angelo"],
 win:function(){return[9*60,19*60]},
 d:"Il mausoleo dell'imperatore Adriano diventato fortezza dei papi: rampe, appartamenti affrescati e, in cima, la terrazza con la vista su tutta Roma. Davanti c'è il Ponte Sant'Angelo con le statue degli angeli.",
 m:"Biglietto 16 €. Aperto tutti i giorni 9–19:30 (ingresso fino alle 18:30). Dal ponte si vede bene anche senza entrare."},
gianicolo:{t:"Gianicolo",z:"D",p:6,min:40,id:55,max:80,pos:[41.8918,12.4612],q:"Terrazza del Gianicolo, Roma",cls:"walk",multi:1,sun:1,
 d:"La terrazza sul colle sopra Trastevere, con la vista più ampia su Roma: la cupola di San Pietro, il Pantheon e i colli sullo sfondo. Si passa per la Fontana dell'Acqua Paola, il «Fontanone».",
 m:"Gratis e sempre aperto. La salita da Trastevere è ripida (circa 20 minuti a piedi); in alternativa c'è il bus 115."},
borghese:{t:"Galleria Borghese",z:"F",p:2,min:120,id:120,max:130,pos:[41.9142,12.4921],q:"Galleria Borghese, Roma",cls:"",multi:1,cl:[0],tk:[18,"Galleria Borghese (16 € più 2 € di prenotazione)"],
 win:function(){return[9*60,19*60]},
 d:"La collezione del cardinale Scipione Borghese: il Ratto di Proserpina e l'Apollo e Dafne di Bernini, la Paolina Borghese di Canova, e i dipinti di Caravaggio e Raffaello. In due ore esatte.",
 m:"La prenotazione dell'orario è obbligatoria (16 € più 2 € di prenotazione) su galleriaborghese.it, e la visita dura due ore con turni di ingresso fissi. Chiusa il lunedì. Arriva mezz'ora prima per ritirare il biglietto."},
pincio:{t:"Villa Borghese, Pincio e Piazza del Popolo",z:"F",p:5,min:45,id:60,max:100,pos:[41.9115,12.4790],q:"Terrazza del Pincio, Roma",cls:"walk",multi:1,sun:1,
 d:"Il grande parco di Roma: i viali alberati, il laghetto del Giardino del Lago e la Terrazza del Pincio, con la vista sull'intera Piazza del Popolo e, al tramonto, sui tetti rosa della città.",
 m:"Gratis. Il parco chiude al tramonto per i veicoli, ma i viali restano percorribili; la terrazza del Pincio è sempre aperta."},
aventino:{t:"Aventino: Giardino degli Aranci e buco della serratura",z:"G",p:6,min:40,id:55,max:75,pos:[41.8847,12.4797],q:"Giardino degli Aranci, Roma",cls:"walk",multi:1,sun:1,
 d:"Sul colle Aventino il Giardino degli Aranci, con il belvedere sul Tevere e su San Pietro. Poco più in là, la piazza dei Cavalieri di Malta: dal buco della serratura del portone si vede la cupola di San Pietro incorniciata dal verde.",
 m:"Il giardino è gratis, aperto fino al tramonto. Per la serratura c'è di solito qualche minuto di coda."},
bocca:{t:"Bocca della Verità e Circo Massimo",z:"G",p:6,min:30,id:45,max:70,pos:[41.8883,12.4813],q:"Bocca della Verità, Roma",cls:"walk",multi:1,sun:1,
 d:"La maschera di pietra nel portico di Santa Maria in Cosmedin, dove la leggenda vuole che la mano di chi mente venga morsa, e il vicino Circo Massimo, l'enorme prato dove un tempo correvano le bighe.",
 m:"Per la Bocca della Verità c'è un'offerta libera (di solito 1–2 €) e spesso la coda. Il Circo Massimo si vede gratis dal bordo."},
caracalla:{t:"Terme di Caracalla",z:"G",p:6,min:60,id:75,max:100,pos:[41.8789,12.4925],q:"Terme di Caracalla, Roma",cls:"",multi:1,cl:[0],tk:[8,"Terme di Caracalla"],
 win:function(){return[9*60,17*60]},
 d:"Gli enormi bagni pubblici dell'imperatore Caracalla (III secolo): muri alti decine di metri, mosaici e gli ambienti sotterranei dove lavoravano migliaia di schiavi.",
 m:"Biglietto 8 €. Chiuse il lunedì. Gli orari seguono la luce del giorno e cambiano con le stagioni: in autunno chiudono prima del tramonto, controlla su coopculture.it."},
testaccio:{t:"Testaccio e il suo mercato",z:"G",p:7,min:50,id:75,max:100,pos:[41.8777,12.4738],q:"Mercato di Testaccio, Roma",cls:"walk",multi:1,
 win:function(wd){return wd===6?[0,0]:[7*60,wd===5?15*60:15*60+30]},
 d:"Il quartiere ex-mattatoio, patria della cucina romana povera: il mercato coperto con i banchi dei panini (porchetta, trippa), le vie con le trattorie dei romani e il Monte Testaccio, la collina fatta di cocci di anfore.",
 m:"Il mercato è aperto dal lunedì al sabato, 7–15:30, chiuso la domenica; i banchi chiudono presto, meglio arrivare entro mezzogiorno."}
});
/* collegamenti tra le tappe */
var LEGS={
"start>colosseo":{min:15,mode:"metro",txt:"Metro B da Termini a Colosseo (3 fermate), circa 15 minuti. La stazione è proprio davanti all'anfiteatro.",g:[["mB","Termini","Colosseo"],W([[41.8913,12.4909],[41.8902,12.4922]])]},
"start>pantheon":{min:25,mode:"walk",txt:"A piedi da Termini lungo Via Nazionale e Via del Corso, circa 25 minuti; in alternativa metro A fino a Barberini e 15 minuti a piedi.",g:[W([[41.9009,12.5014],[41.8995,12.4950],[41.8985,12.4850],[41.8986,12.4769]])]},
"colosseo>campidoglio":{min:15,mode:"walk",txt:"A piedi lungo Via dei Fori Imperiali, con i Fori ai lati, fino a Piazza Venezia, circa 15 minuti.",g:[W([[41.8902,12.4922],[41.8921,12.4880],[41.8941,12.4846],[41.8933,12.4829]])]},
"campidoglio>pantheon":{min:12,mode:"walk",txt:"A piedi per Via del Plebiscito e Via del Gesù fino al Pantheon, circa 12 minuti.",g:[W([[41.8933,12.4829],[41.8955,12.4810],[41.8975,12.4785],[41.8986,12.4769]])]},
"pantheon>navona":{min:6,mode:"walk",txt:"A piedi per Via della Maddalena e Corso del Rinascimento fino a Piazza Navona, circa 6 minuti.",g:[W([[41.8986,12.4769],[41.8990,12.4745],[41.8992,12.4731]])]},
"navona>trevi":{min:22,mode:"walk",txt:"A piedi per Via del Corso e il vicolo della Pilotta fino a Trevi, circa 22 minuti: segui le frecce per la fontana, dal rumore dell'acqua si capisce quando manca poco.",g:[W([[41.8992,12.4731],[41.8998,12.4790],[41.9004,12.4815],[41.9009,12.4833]])]},
"pantheon>trevi":{min:12,mode:"walk",txt:"A piedi per Via dei Pastini e Via del Corso fino alla Fontana di Trevi, circa 12 minuti.",g:[W([[41.8986,12.4769],[41.8995,12.4800],[41.9005,12.4820],[41.9009,12.4833]])]},
"trevi>spagna":{min:10,mode:"walk",txt:"A piedi per Via della Stamperia e Via dei Due Macelli fino alla scalinata, circa 10 minuti.",g:[W([[41.9009,12.4833],[41.9030,12.4830],[41.9050,12.4825],[41.9060,12.4823]])]},
"spagna>sanpietro":{min:25,mode:"metro",txt:"Metro A da Spagna a Ottaviano (4 fermate), poi 10 minuti a piedi lungo Via Ottaviano e Borgo Pio fino a San Pietro: circa 25 minuti.",g:[W([[41.9060,12.4823],[41.9063,12.4823]]),["mA","Spagna","Ottaviano"],W([[41.9068,12.4573],[41.9050,12.4560],[41.9022,12.4539]])]},
"sanpietro>trastevere":{min:30,mode:"metro",txt:"Bus 23 da Piazza Risorgimento lungo il Tevere fino a Trastevere, oppure 35 minuti a piedi per Ponte Sisto: circa 30 minuti.",g:[{w:[[41.9022,12.4539],[41.8896,12.4698]],dash:1}]},
"trevi>sanpietro":{min:35,mode:"metro",txt:"A piedi fino alla metro Barberini o Spagna, linea A fino a Ottaviano e 10 minuti a piedi: circa 35 minuti.",g:[W([[41.9009,12.4833],[41.9040,12.4830],[41.9063,12.4823]]),["mA","Spagna","Ottaviano"],W([[41.9068,12.4573],[41.9022,12.4539]])]},
"navona>sanpietro":{min:25,mode:"walk",txt:"A piedi lungo Corso Vittorio Emanuele II e Via della Conciliazione fino alla piazza, circa 25 minuti.",g:[W([[41.8992,12.4731],[41.9020,12.4680],[41.9015,12.4600],[41.9022,12.4539]])]},
"sanpietro>ghetto":{min:30,mode:"metro",txt:"Bus 40 o 64 da Largo Argentina in poi, oppure a piedi lungo il Tevere: circa 30 minuti.",g:[{w:[[41.9022,12.4539],[41.8925,12.4772]],dash:1}]},
"trastevere>start":{min:25,mode:"metro",txt:"Tram 8 fino a Largo Argentina o a piedi a Ponte Sisto, poi bus 40 o 64 fino a Termini: circa 25 minuti.",g:[{w:[[41.8896,12.4698],[41.9009,12.5014]],dash:1}]},
"spagna>start":{min:12,mode:"metro",txt:"Metro A da Spagna a Termini (3 fermate), circa 12 minuti.",g:[W([[41.9060,12.4823],[41.9063,12.4823]]),["mA","Spagna","Termini"]]},
"trevi>start":{min:20,mode:"metro",txt:"A piedi fino a Barberini (5 minuti), poi metro A fino a Termini: circa 20 minuti.",g:[W([[41.9009,12.4833],[41.9038,12.4889]]),["mA","Barberini","Termini"]]},
"colosseo>start":{min:15,mode:"metro",txt:"Metro B da Colosseo a Termini (3 fermate), circa 15 minuti.",g:[W([[41.8902,12.4922],[41.8913,12.4909]]),["mB","Colosseo","Termini"]]}
};
/* ritorno in aeroporto (le altre tappe passano da Termini) */
var RET={
FCO:{
 A:{min:50,txt:"Leonardo Express da Termini all'aeroporto di Fiumicino (32 minuti, un treno ogni 15 minuti circa): parte dai binari 23–24, controlla il tabellone. Ultima partenza alle 23:05.",g:[["leo","Roma Termini","Aeroporto di Fiumicino"]]}},
CIA:{
 A:{min:65,txt:"Bus per l'aeroporto di Ciampino da Via Marsala, davanti a Termini (circa 40 minuti): meglio prendere quello almeno 2 ore prima del volo. Controlla gli orari della compagnia.",g:[["cia","Roma Termini","Aeroporto di Ciampino"]]}}
};
var ARR={
FCO:[["leo","Aeroporto di Fiumicino","Roma Termini"]],
CIA:[["cia","Aeroporto di Ciampino","Roma Termini"]]
};
/* locali: h = orari lun→dom (Google Maps e siti dei locali, ottobre 2026); "" = chiuso */
var V={
serpenti:{n:"Antico Forno Serpenti",a:"Via dei Serpenti 122",z:"A",r:"4,6",pos:[41.896246,12.490267],h:D7("08:00-21:00"),
 d:"Forno di quartiere a Monti: pizza al taglio a peso, supplì e dolci, con il caffè da servirsi da soli alla macchina. Si mangia in piedi o ai tavolini stretti.",pr:"Un pezzo di pizza e un caffè restano sotto i 6 € (listino non visto)."},
mary:{n:"Mary Microforno",a:"Piazza della Madonna dei Monti 9",z:"A",r:"4,6",pos:[41.894790,12.490960],h:D7("07:30-22:30"),
 d:"Microforno con gelateria sulla piazzetta della fontana di Monti: cornetti, pizza bianca, panini e gelato fino a tardi.",pr:"Colazione o spuntino sotto i 6 € (listino non visto)."},
panmonti:{n:"Panificio Monti",a:"Via Urbana 22",z:"A",r:"4,7",pos:[41.896570,12.494440],h:["08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00","08:00-18:00",""],
 d:"Panificio di quartiere: pane, pizza bianca, biscotti e dolci da forno. Chiuso la domenica.",pr:"Pochi euro."},
licata:{n:"La Licata",a:"Via dei Serpenti 165",z:"A",r:"4,5",pos:[41.894650,12.490900],h:["05:30-14:30","05:30-21:00","05:30-21:00","05:30-21:00","05:30-23:00","05:30-23:00","06:30-23:00"],
 d:"Il bar dei residenti di Monti: colazione al banco con cornetti e caffè, panini e aperitivo a fine giornata. Il lunedì chiude alle 14:30.",pr:"Cappuccino e cornetto al banco intorno ai 3–4 € (listino non visto)."},
roscioli:{n:"Antico Forno Roscioli",a:"Via dei Chiavari 34",z:"B",r:"4,5",pos:[41.894567,12.474278],h:D7("07:30-20:00"),
 d:"Il forno storico vicino a Campo de' Fiori: pizza bianca e rossa, supplì, pasticceria. Si indica la dimensione del pezzo e lo pesano. C'è spesso un po' di coda ma scorre.",pr:"Un pezzo di pizza e un dolce restano sotto i 10 € (listino non visto)."},
campofiori:{n:"Forno Campo de' Fiori",a:"Campo de' Fiori 22",z:"B",r:"4,5",pos:[41.895860,12.471560],h:["08:00-14:30,16:30-19:30","08:00-14:30,16:30-19:30","08:00-14:30,16:30-19:30","08:00-14:30,16:30-19:30","08:00-14:30,16:30-19:30","08:00-14:30,16:30-19:30",""],
 d:"Forno sulla piazza del mercato: pizza bianca farcita con mortadella o prosciutto, da mangiare camminando. Chiuso la domenica.",pr:"Un panino di pizza bianca sotto i 7 € (listino non visto)."},
supplizio:{n:"Supplizio",a:"Via dei Banchi Vecchi 143",z:"B",r:"4,5",pos:[41.897487,12.467911],h:["12:00-15:30,17:00-21:30","12:00-15:30,17:00-21:30","12:00-15:30,17:00-21:30","12:00-15:30,17:00-21:30","12:00-15:30,17:00-21:30","12:00-15:30,17:00-21:30",""],
 d:"Suppli fritti al momento, classico al telefono (con il filo di mozzarella), cacio e pepe e carbonara. Poche sedie, si mangia in piedi o sulla piazzetta. Chiuso la domenica.",pr:"Un supplì costa circa 3,50–4 €: con tre e una bibita si sta sotto i 15 € (da recensioni)."},
coronari:{n:"I Supplì dei Coronari",a:"Via dei Coronari 25",z:"B",r:"4,7",pos:[41.900437,12.471095],h:["11:30-21:30","","11:30-21:30","11:30-21:30","11:30-21:30","11:30-21:30","11:30-21:00"],
 d:"Piccolo locale di supplì e pasta fresca fatta al momento, con un'allegra sala dove si firma il tavolo con un pennarello. Chiuso il martedì.",pr:"Fascia economica (listino non visto)."},
boccione:{n:"Pasticceria Boccione",a:"Via del Portico d'Ottavia 1",z:"B",r:"4,2",pos:[41.893226,12.476999],h:["07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","07:30-14:30","","07:30-17:30"],
 d:"Forno ebraico da oltre 200 anni, senza insegna: torta di ricotta e visciole, torta di ricotta e cioccolato, mandorle. Si pagano a peso. Chiuso il sabato.",pr:"Una fetta costa pochi euro (listino non visto)."},
baffetto:{n:"Pizzeria da Baffetto",a:"Via del Governo Vecchio 114",z:"B",r:"4,1",pos:[41.898276,12.470294],h:["12:00-15:30,18:00-00:00","","12:00-15:30,18:00-00:00","12:00-15:30,18:00-00:00","12:00-15:30,18:00-00:00","12:00-15:30,18:00-00:00","12:00-15:30,18:00-00:00"],
 d:"Pizzeria storica a due passi da Piazza Navona: pizza tonda romana, sottile e croccante, una a testa. Si paga solo in contanti e c'è la coda. Chiusa il martedì.",pr:"Margherita sui 8 € e una birra: sotto i 15 € (da recensioni, solo contanti)."},
parenti:{n:"Pasticceria Parenti",a:"Via Ottaviano 33",z:"C",r:"4,7",pos:[41.907230,12.457730],h:["","07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00"],
 d:"Pasticceria di quartiere vicino alla metro Ottaviano, a 8 minuti dal Vaticano: cornetti, maritozzi e dolci di forno. Chiusa il lunedì.",pr:"Colazione sotto i 6 € (listino non visto)."},
cornetteria:{n:"La Cornetteria",a:"Via Angelo Emo 25",z:"C",r:"4,5",pos:[41.905450,12.448100],h:D7("06:00-02:00"),
 d:"Laboratorio di cornetti in Prati, aperto quasi sempre: cornetti caldi con crema, cioccolato o marmellata, anche per chi esce tardi.",pr:"Un cornetto costa circa 1,50 € (listino non visto)."},
pizzarium:{n:"Bonci Pizzarium",a:"Via della Meloria 43",z:"C",r:"4,1",pos:[41.906676,12.446671],h:D7("11:15-22:00"),
 d:"La pizza al taglio di Gabriele Bonci vicino ai Musei Vaticani: impasti lievitati a lungo e farciture di stagione, venduti a peso. Si prende il numero e si aspetta, spesso a lungo.",pr:"Due pezzi e una bibita sui 12–15 €; si paga a peso (da recensioni)."},
suegiu:{n:"Su e Giù",a:"Via Tacito 42",z:"C",r:"4,6",pos:[41.907400,12.467350],h:["12:30-15:00,19:00-23:00","12:30-15:00,19:00-23:00","12:30-15:00,19:00-23:00","12:30-15:00,19:00-23:00","12:30-15:00,19:00-23:00","12:30-15:00,19:00-23:00",""],
 d:"Trattoria di famiglia in Prati, frequentata dai residenti: carbonara, cacio e pepe, gricia, gnocchi e trippa. Chiusa la domenica.",pr:"Un primo costa circa 10–13 € (da recensioni): con il solo primo e l'acqua si sta intorno ai 15 €."},
levain:{n:"Le Levain",a:"Via Luigi Santini 22",z:"D",r:"4,6",pos:[41.887143,12.468721],h:D7("08:00-20:00"),
 d:"Forno di stile francese a Trastevere: croissant sfogliati, pane a lievitazione naturale e caffè filtrato.",pr:"Colazione sotto i 10 € (listino non visto)."},
checco:{n:"Checco er Carettiere (pasticceria)",a:"Via Benedetta 13",z:"D",r:"4,5",pos:[41.891501,12.469579],h:D7("06:30-01:00"),
 d:"Pasticceria e bar del locale storico di Trastevere, aperti dalla mattina a notte: cornetti ripieni alla crema di pistacchio, gelato e dolci.",pr:"Cornetto e cappuccino sui 4–5 € (listino non visto)."},
aimarmi:{n:"Ai Marmi",a:"Viale di Trastevere 53",z:"D",r:"4,2",pos:[41.888251,12.473713],h:["18:30-02:00","18:30-02:00","","18:30-02:00","18:30-02:00","18:30-02:00","18:30-02:00"],
 d:"Pizzeria dei romani, detta anche «L'Obitorio» per i tavoli di marmo: pizza sottile, supplì e fiori di zucca. Si aspetta in strada. Chiusa il mercoledì.",pr:"Due pizze e una bottiglia d'acqua sui 22 €, quindi circa 11 € a testa (da recensioni)."},
darpoeta:{n:"Dar Poeta",a:"Vicolo del Bologna 45",z:"D",r:"4,3",pos:[41.891388,12.468544],h:D7("11:30-00:00"),
 d:"Pizzeria del vicolo dietro Piazza Trilussa: pizza con impasto più soffice, bruschette e supplì. Aperta tutti i giorni.",pr:"Una pizza sui 8–11 €; con una birra si sta sotto i 15 € (da recensioni)."},
nannarella:{n:"Nannarella",a:"Piazza di San Calisto 7",z:"D",r:"4,7",pos:[41.888920,12.470730],h:D7("11:30-23:30"),
 d:"Trattoria sulla piazza di San Calisto: pasta all'uovo e primi romani, come amatriciana, carbonara e gricia, con porzioni generose.",pr:"Un primo costa circa 12–14 € (da recensioni): con il solo primo e l'acqua si sta intorno ai 15 €."},
regoli:{n:"Pasticceria Regoli",a:"Via dello Statuto 60",z:"E",r:"4,5",pos:[41.894817,12.500949],h:["07:00-19:00","","07:00-19:00","07:00-19:00","07:00-19:00","07:00-19:00","07:00-19:00"],
 d:"Pasticceria all'Esquilino, a 15 minuti a piedi da Termini: ottimi maritozzi alla panna e crostata di fragole. Cassa separata dal banco. Chiusa il martedì.",pr:"Il maritozzo costa circa 4,50 € (da recensioni): colazione sui 7–8 €."},
cecio:{n:"Trattoria Cecio",a:"Via Principe Amedeo 104",z:"E",r:"4,5",pos:[41.898430,12.501220],h:D7("12:00-14:30,18:00-22:45"),
 d:"Trattoria a due passi da Termini ma per i residenti dell'Esquilino: piatti romani semplici, come amatriciana, gricia e coda alla vaccinara.",pr:"Un primo costa circa 9–12 € (listino non visto)."},
manzoni:{n:"Trattoria Manzoni",a:"Viale Manzoni 93",z:"E",r:"4,8",pos:[41.893810,12.510620],h:D7("12:00-01:00"),
 d:"Trattoria vicina alla metro A Manzoni, tra l'Esquilino e San Giovanni: cucina romana abbondante, aperta tutto il giorno.",pr:"Fascia media-bassa (listino non visto)."},
fornotrevi:{n:"L'Antico Forno di Fontana di Trevi",a:"Via delle Muratte 8",z:"F",r:"4,1",pos:[41.900646,12.483096],h:D7("07:00-20:00"),
 d:"Forno a due passi dalla fontana: cornetti ripieni di cioccolato o pistacchio a prezzi onesti, sempre un po' di coda ma veloce.",pr:"Un cornetto sui 2,50–3 € (da recensioni, solo da asporto)."},
trecaffe:{n:"Trecaffè",a:"Via dei Due Macelli 107",z:"F",r:"4,7",pos:[41.903351,12.485107],h:["06:30-20:00","06:30-20:00","06:30-20:00","06:30-20:00","06:30-21:00","06:30-21:00","06:30-20:30"],
 d:"Caffè moderno vicino a Piazza di Spagna: maritozzi al pistacchio, croissant e caffè buono, anche per un brunch.",pr:"Colazione al banco sui 6–8 € (listino non visto)."},
guerra:{n:"Pastificio Guerra",a:"Via della Croce 8",z:"F",r:"4,3",pos:[41.906446,12.480939],h:D7("13:00-21:00"),
 d:"Pasta fresca da asporto a due passi dalla scalinata di Trinità dei Monti: ogni giorno due piatti, uno di carne e uno vegetariano, da mangiare in piedi o sui gradini della piazza.",pr:"Un piatto costa circa 4–5 € con l'acqua inclusa (da recensioni)."},
remo:{n:"Pizzeria Remo",a:"Piazza di Santa Maria Liberatrice 44",z:"G",r:"4,4",pos:[41.880905,12.475464],h:["19:00-01:00","19:00-01:00","19:00-01:00","19:00-01:00","19:00-01:00","19:00-01:00",""],
 d:"Pizzeria dei romani a Testaccio: pizza tonda sottile e supplì, tavoli fitti e rumore. Non si prenota. Chiusa la domenica.",pr:"Una pizza sui 8–10 €; con una birra si sta sotto i 15 € (da recensioni)."},
mercatotest:{n:"Mercato di Testaccio",a:"Via Aldo Manuzio 66b",z:"G",r:"4,4",pos:[41.877685,12.473846],h:["07:00-15:30","07:00-15:30","07:00-15:30","07:00-15:30","07:00-15:30","07:00-15:30",""],
 d:"Il mercato coperto del quartiere, con banchi che servono panini con porchetta o trippa, supplì e piatti del giorno da mangiare tra i banchi. Chiuso la domenica.",pr:"Un panino sui 5–7 € (listino non visto)."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["licata","mary","panmonti","serpenti"],B:["roscioli","campofiori","boccione"],C:["parenti","cornetteria"],D:["levain","checco"],E:["regoli","licata"],F:["fornotrevi","trecaffe"],G:["mercatotest","levain"]},
pra:{A:["serpenti","mary","licata"],B:["supplizio","coronari","roscioli","campofiori"],C:["pizzarium","suegiu"],D:["nannarella","darpoeta","aimarmi"],E:["cecio","manzoni"],F:["guerra","fornotrevi"],G:["mercatotest","remo"]},
cen:{A:["mary","serpenti"],B:["baffetto","supplizio","coronari"],C:["pizzarium","suegiu"],D:["aimarmi","darpoeta","nannarella"],E:["manzoni","cecio"],F:["guerra"],G:["remo"]},
snk:{A:["serpenti","mary"],B:["supplizio","roscioli","coronari"],C:["pizzarium","parenti"],D:["checco","levain"],E:["regoli","cecio"],F:["fornotrevi","guerra"],G:["mercatotest","remo"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"antica",t:"Colosseo, Foro Romano e Campidoglio",acts:["colosseoins","campidoglio","ghetto"],need:300,core:1},
{id:"vaticano",t:"Musei Vaticani, San Pietro e Castel Sant'Angelo",acts:["vaticani","sanpietro","castel"],need:380,core:1,cl:[6]},
{id:"storico",t:"Pantheon, Navona, Trevi e Piazza di Spagna",acts:["pantheon","navona","trevi","spagna"],need:230,core:1},
{id:"trastevere",t:"Trastevere e Gianicolo",acts:["trastevere","gianicolo"],need:170},
{id:"borghese",t:"Galleria Borghese e Villa Borghese",acts:["borghese","pincio"],need:200,cl:[0]},
{id:"aventino",t:"Aventino, Terme di Caracalla e Testaccio",acts:["aventino","bocca","caracalla","testaccio"],need:260,cl:[0]}
];
var ORDER=["campidoglio","colosseo","colosseoins","ghetto","pantheon","navona","trevi","spagna","pincio","borghese","vaticani","sanpietro","castel","gianicolo","trastevere","bocca","aventino","caracalla","testaccio"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["termini","Termini / Esquilino",[41.9005,12.5025],"E"],
["monti","Monti / Colosseo",[41.8948,12.4910],"A"],
["pantheon","Pantheon / Navona",[41.8990,12.4750],"B"],
["campo","Campo de' Fiori / Ghetto",[41.8940,12.4745],"B"],
["trastevere","Trastevere",[41.8885,12.4690],"D"],
["prati","Prati / Vaticano",[41.9070,12.4620],"C"],
["spagna","Piazza di Spagna / Trevi",[41.9040,12.4840],"F"],
["veneto","Via Veneto / Repubblica",[41.9045,12.4925],"F"],
["testaccio","Testaccio / Aventino",[41.8800,12.4780],"G"],
["sangiovanni","San Giovanni",[41.8860,12.5100],""],
["altro","Altra zona (scrivi l'indirizzo)",[41.8986,12.4768],""]
];
/* imposta di soggiorno di Roma (tariffe 2023, ancora in vigore): massimo 10 notti */
var TAX=[["h5","Hotel 5 stelle",10],["h4","Hotel 4 stelle",7.5],["h3","Hotel fino a 3 stelle, B&B o appartamento (categoria 1)",6],["apt","Appartamento turistico (categoria 2)",5],["host","Ostello o struttura economica",3.5],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Cappuccino e cornetto al banco","si paga alla cassa e si porta lo scontrino al banco: in piedi costa meno che al tavolo."],["Maritozzo con la panna","il dolce romano della colazione: un panino dolce farcito di panna montata."],["Pizza bianca","la focaccia romana, semplice o farcita con mortadella: la merenda dei romani."]],
pra:[["Pizza al taglio","si indica la dimensione del pezzo e si paga a peso."],["Supplì","la crocchetta di riso fritta con il cuore di mozzarella filante."],["I quattro primi romani","cacio e pepe, carbonara, amatriciana e gricia."]],
cen:[["Pizza tonda romana","sottile e croccante, una a testa."],["Carciofi alla romana o alla giudia","in stagione, da novembre."],["Un gelato","in cono o coppetta; diffida di quelli montati in altezza e dai colori troppo vivaci."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Colosseo dall'Arco di Costantino","Foto","L'anfiteatro intero in un'inquadratura, con l'arco in primo piano: meglio al tramonto, quando la pietra diventa dorata.",[41.8896,12.4905],"Arco di Costantino, Roma","colosseo"],
["📷","Il Colosseo dalla metro Colosseo","Foto","Appena esci dalla stazione ti trovi davanti l'anfiteatro: il punto più semplice per un selfie con il monumento dietro.",[41.8909,12.4908],"Colosseo, Roma","colosseo"],
["📷","Belvedere sul Foro Romano","Foto","Dietro il Palazzo Senatorio: la vista sul Foro, l'Arco di Settimio Severo e il Colosseo in fondo. Gratis.",[41.8928,12.4843],"Belvedere Foro Romano, Campidoglio","campidoglio"],
["📷","Piazza del Campidoglio","Foto","La piazza di Michelangelo con la statua di Marco Aurelio, vista dalla cordonata.",[41.8933,12.4829],"Piazza del Campidoglio, Roma","campidoglio"],
["🤳","L'oculus del Pantheon","Selfie","Il fascio di luce che entra dal foro in cima: inquadra verso l'alto da sotto.",[41.8986,12.4769],"Pantheon, Roma","pantheon"],
["📷","Fontana dei Quattro Fiumi","Foto","Bernini a Piazza Navona: la fontana con l'obelisco e Sant'Agnese in Agone dietro.",[41.8992,12.4731],"Fontana dei Quattro Fiumi, Roma","navona"],
["🤳","Fontana di Trevi","Selfie","Meglio presto la mattina o la sera dopo le 21, quando la folla diminuisce.",[41.9009,12.4833],"Fontana di Trevi, Roma","trevi"],
["📷","Terrazza di Trinità dei Monti","Foto","In cima alla scalinata: i tetti di Roma e la cupola di San Pietro all'orizzonte.",[41.9063,12.4826],"Trinità dei Monti, Roma","spagna"],
["📷","Cupola di San Pietro da Via della Conciliazione","Foto","Il viale dritto che porta alla basilica: l'inquadratura simmetrica più classica.",[41.9022,12.4600],"Via della Conciliazione, Roma","sanpietro"],
["🤳","Piazza San Pietro","Selfie","Al centro, tra le due fontane: dietro, il colonnato di Bernini e la facciata di Maderno.",[41.9022,12.4573],"Piazza San Pietro, Roma","sanpietro"],
["📷","Vicoli di Trastevere","Foto","Le facciate color ocra con l'edera e le lanterne in Via della Scala e Vicolo del Cedro.",[41.8895,12.4680],"Vicolo del Cedro, Roma","trastevere"],
["📷","Ponte Sant'Angelo","Foto","Gli angeli del Bernini con Castel Sant'Angelo alle spalle, soprattutto al tramonto.",[41.9029,12.4663],"Ponte Sant'Angelo, Roma","castel"],
["📷","Il Fontanone del Gianicolo","Foto","La fontana dell'Acqua Paola e, di fianco, la terrazza con Roma ai piedi.",[41.8885,12.4617],"Fontanone del Gianicolo, Roma","gianicolo"],
["📷","Terrazza del Pincio","Foto","Piazza del Popolo vista dall'alto, con le due chiese gemelle: la luce migliore è al tramonto.",[41.9115,12.4790],"Terrazza del Pincio, Roma","pincio"],
["🤳","Buco della serratura dell'Aventino","Selfie","La cupola di San Pietro incorniciata dal verde: inquadra con il telefono appoggiato al portone.",[41.8826,12.4794],"Piazza dei Cavalieri di Malta, Roma","aventino"],
["📷","Circo Massimo dall'Aventino","Foto","La grande pista del circo vista dall'alto, con il Palatino alle spalle.",[41.8845,12.4850],"Circo Massimo, Roma","bocca"]
];
/* avvisi verificati il 10 ottobre 2026 */
var AVV=[
{from:"2026-10-25",to:"2026-10-25",t:"Musei Vaticani gratuiti: code lunghe",x:"Domenica 25 ottobre è l'ultima domenica del mese: i Musei Vaticani sono aperti gratis solo la mattina e con code molto lunghe. Se vuoi entrare con calma, scegli un altro giorno."},
{from:"2026-10-25",to:"2026-10-25",t:"Il Colosseo chiude prima",x:"Dal 25 ottobre, con il ritorno all'ora solare, il Colosseo e l'area archeologica chiudono alle 16:30 (ultimo ingresso alle 15:30)."},
{from:"2026-11-01",to:"2026-11-01",t:"Musei Vaticani chiusi",x:"Il 1° novembre (Ognissanti) i Musei Vaticani sono chiusi. San Pietro resta aperta ma con molta gente."},
{from:"2026-11-04",to:"2026-11-04",t:"Colosseo gratuito",x:"Il 4 novembre l'ingresso al Colosseo e all'area archeologica è gratuito, ma serve comunque prenotare l'orario: attese lunghe."},
{from:"2026-11-29",to:"2026-11-29",t:"Musei Vaticani gratuiti: code lunghe",x:"Domenica 29 novembre è l'ultima domenica del mese: i Musei Vaticani sono aperti gratis solo la mattina e con code molto lunghe."}
];
/* clima medio di Roma (indicativo, massime/minime) */
var CLIM=[[13,4],[14,5],[17,7],[20,9],[25,13],[29,17],[32,20],[32,20],[28,16],[23,12],[17,8],[13,5]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Roma: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="trevi"&&WD===4)meta=meta.replace("Aperto 9–22, il venerdì dalle 11:30","Oggi, venerdì, apre alle 11:30 (chiude alle 22)");
if(it.id==="sanpietro"&&WD===2)meta+=" Oggi è mercoledì: la basilica apre solo dopo l'udienza del Papa, verso le 12:30.";
return meta}
Object.assign(C,{id:"roma",n:"Roma",cn:"Italia",e:"🏛️",flag:"🇮🇹",col:["#8e1b1b","#c7962c","#f2c14e"],k:"roma rome italia lazio",
TZ:"Europe/Rome",LL:[41.9028,12.4964],CC:"it",QN:"Roma",BK:"Rome",ARE:/roma|rome|\b00\d{3}\b/i,VER:"10 ottobre 2026",
LANG:"it-IT",LANGN:"romanesco",NOSAY:1,WATER:"osm",TAXDEF:"h3",TAXMAXN:10,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Roma Termini",q:"Stazione Roma Termini"},
SINGLE:{acts:["colosseo","campidoglio","pantheon","navona","trevi","spagna","sanpietro","trastevere"],ins:[["ghetto","campidoglio"]]},
EXCL:[["colosseoins","colosseo","Il Colosseo lo visiti dentro in un'altra giornata: oggi rimane la passeggiata sui Fori."]],
DICON:{colosseoins:"🏛️",vaticani:"🎨",castel:"🏰",gianicolo:"🌅",borghese:"🗿",pincio:"🌳",caracalla:"♨️",testaccio:"🥙"},
ZN:{A:"a Monti e al Colosseo",B:"nel centro storico",C:"in Prati, vicino al Vaticano",D:"a Trastevere",E:"vicino a Termini",F:"verso Trevi e Piazza di Spagna",G:"a Testaccio"},
NEAR:{col:"bar",pra:"trattoria o pizza al taglio",cen:"pizzeria o trattoria",snk:"forno"},
SE:{serpenti:"🍕",mary:"🥐",panmonti:"🥖",licata:"☕",roscioli:"🍕",campofiori:"🥪",supplizio:"🍙",coronari:"🍙",boccione:"🍰",parenti:"🥐",cornetteria:"🥐",levain:"🥐",checco:"🥐",regoli:"🍰",fornotrevi:"🥐",trecaffe:"☕",guerra:"🍝",mercatotest:"🥪"},
TR:{one:1.5,lbl:"Metro e bus in città",
 air:{FCO:{one:14,n:"Leonardo Express"},CIA:{one:6,n:"Bus Ciampino–Termini"}},
 passes:[
 {n:"Roma 24 ore",d:1,max:1,p:8.5,note:"Il biglietto Roma 24 ore (8,50 €) vale su metro, bus, tram e treni urbani per un giorno intero."},
 {n:"Roma 48 ore",d:2,p:15,only:function(T){return T.n===2},note:"Il Roma 48 ore (15 €) vale su metro, bus e tram."},
 {n:"Roma 72 ore",d:3,p:22,only:function(T){return T.n===3},note:"Il Roma 72 ore (22 €) vale su metro, bus e tram."},
 {n:"CIS settimanale",d:7,p:29,note:"La carta settimanale CIS (29 €) è personale e vale su metro, bus e tram."}],
 note:"Prezzi 2026 di Roma Mobilità: biglietto singolo BIT 1,50 € (vale 100 minuti, anche con cambi), Roma 24 ore 8,50 €, 48 ore 15 €, 72 ore 22 €, CIS settimanale 29 €. Il Leonardo Express costa 14 € e non è compreso."},
FOOD:{co:[4,"Colazione al banco (cappuccino e cornetto)"],pr:[14,"Pranzo (pizza al taglio o un primo)"],ce:[14,"Cena (pizza tonda o un primo)"],sp:[5,"Gelati e assaggi"]},
T:{ride:"In metro o bus",move:"tutto a piedi o in metro",bags:"«Posso lasciare i bagagli?»",bagsPM:"«Posso lasciare i bagagli fino al pomeriggio?»",bagsAM:"«Posso lasciare i bagagli fino a mezzogiorno?»",
pra:"Una trattoria o una pizza al taglio",praZ:{B:"Nel centro storico evita i ristoranti con il menu turistico fuori dalla porta: i buoni posti sono nei vicoli, sotto i 15 € a testa.",G:"A Testaccio si mangia dove mangiano i romani: il mercato è aperto fino al primo pomeriggio."},
freeLong:"Qualche idea: i giardini di Villa Borghese, una passeggiata a Trastevere, un gelato sul lungotevere, il mercato di Testaccio, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata lungo il Tevere o un gelato nel quartiere.",
remind:"Se vuoi entrare nel Colosseo o ai Musei Vaticani, compra prima il biglietto con orario: in giornata è spesso esaurito.",
rain1:"Al coperto: il Pantheon, la basilica di San Pietro, Santa Maria in Trastevere e le chiese del centro, tutte gratis.",
rainM:"Al coperto: Musei Vaticani, Galleria Borghese, Castel Sant'Angelo, i Musei Capitolini e il Pantheon.",
water:"Riempite la borraccia ai «nasoni», le fontanelle di ghisa sparse per Roma: l'acqua è potabile e freschissima. Attivate «Acqua» sulla mappa per vedere le più vicine.",
kitchen:"A Roma si pranza tra le 12:30 e le 15 e si cena dalle 19:30: molte trattorie chiudono tra i due servizi, guarda l'orario accanto a ogni locale.",
night:[["🍨","Un gelato dopo cena è un rito: scegli una gelateria artigianale, con colori naturali e la panna non montata in alto."],["🕙","Le trattorie servono fino alle 22:30–23; la metro chiude alle 23:30 (all'1:30 il venerdì e il sabato)."],["🥐","Molti bar aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire ai «nasoni»)",
fuso:"Stesso fuso orario e stessa lingua: non serve adattatore né cambio",
plug:"Caricabatterie (la spina è quella italiana, nessun adattatore)",
foodNote:"I pasti sono stime per locali di quartiere: colazione e cena restano sotto i 15 € a persona.",
taxNote:"L'imposta di soggiorno si paga a persona e a notte, per al massimo 10 notti; sotto i 10 anni non si paga. Spesso non è compresa nel prezzo e si paga alla struttura.",
mcrit:"Criteri: almeno 4 stelle su Google, forni, trattorie, pizzerie e bar di quartiere, niente catene. Colazione e cena restano intorno o sotto i 15 € a persona; il pranzo può costare qualcosa di più. Valutazioni e orari da Google Maps e dai siti dei locali (ottobre 2026), prezzi indicativi: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il biglietto del Leonardo Express si controlla all'uscita dal treno e al tornello in stazione: tienilo a portata di mano.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietti dei mezzi: dai distributori nelle stazioni o dalle tabaccherie, da timbrare o validare alla prima corsa"],["cia","Biglietto del bus per Ciampino, comprato online",function(E){return E.cfg.to==="CIA"||E.cfg.rt==="CIA"}],["col","Biglietto con orario per il Colosseo (colosseo.it, nominativo)",["colosseoins"]],["vat","Biglietto con orario per i Musei Vaticani (museivaticani.va)",["vaticani"]],["bor","Prenotazione della Galleria Borghese (galleriaborghese.it)",["borghese"]],["cash","Qualche euro in contanti per pizzerie, mercati e bar piccoli"],["cov","Qualcosa per coprire spalle e ginocchia in chiesa e in Vaticano",["sanpietro","vaticani","castel"]]],
NUM:{1:["una persona","U-na per-SO-na"]},
PHR:function(){return [["Andiamo!","Annamo!","an-NA-mo"],["Dai, forza!","Daje!","DA-je"],["Guarda che bello!","Anvedi che bbello!","an-VE-di ke BBEL-lo"],["Che stai facendo?","Che stai a fà?","ke stai a FA"],["Non ti preoccupare","Nun te preoccupà","nun te pre-oc-cu-PA"],["Sto mangiando","Sto a magnà","sto a ma-GNA"],["Facciamo una foto?","Famo 'na foto?","FA-mo na FO-to"],["Non c'è problema","Nun c'è problema","nun ce pro-BLE-ma"],["Ho una gran sete","Ciò 'na sete!","cio na SE-te"],["Mi piace tantissimo","Me piace 'n botto","me PIA-ce n BOT-to"]]},
PHN:"Un po' di romanesco, per divertirsi e farsi capire dai romani: la prima riga è l'italiano, sotto c'è la versione di Roma. Non serve la voce: sono parole da leggere e usare con un sorriso.",
taxTxt:function(tx){return "Imposta di soggiorno di Roma (tariffe 2023, in vigore): "+(tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+"), per al massimo 10 notti":"non si paga se sei ospite di amici o parenti")+". Sotto i 10 anni non si paga."},
STAYTIPS:["La metro A e B apre alle 5:30 e chiude alle 23:30; il venerdì e il sabato resta aperta fino all'1:30. Dopo si usano i bus notturni (linee N)."],
ZONES:[
["🚉 Termini e Esquilino",["Alla stazione e nei dintorni ci sono molti borseggiatori: zaino davanti, telefono in tasca.","Ai ristoranti intorno alla stazione preferisci le trattorie delle vie dell'Esquilino, a 5–10 minuti.","Il Leonardo Express parte dai binari 23–24; il bus per Ciampino da Via Marsala, a lato della stazione.","Le ore serali intorno a Termini sono meno tranquille: per tornare tardi preferisci le vie principali."]],
["🏛️ Colosseo e Fori",["Colosseo, Foro Romano e Palatino: 18 € con biglietto nominativo (colosseo.it), valido 24 ore. Il 4 novembre e la prima domenica del mese l'ingresso è gratuito.","Da fuori l'Arco di Costantino, la Via dei Fori Imperiali e il belvedere del Campidoglio non costano niente.","Evita i venditori che offrono «salta fila» e i «gladiatori» in costume: chiedono soldi per le foto."]],
["⛲ Pantheon, Navona e Trevi",["Pantheon: 5 € di ingresso, aperto 9–19 (ultimo ingresso 18:30).","Fontana di Trevi: dal 2 febbraio 2026 servono 2 € per scendere alla vasca (gratis per i residenti di Roma e provincia); la sera tardi si vede dalla piazza gratis.","Intorno a Navona e a Trevi i ristoranti con le foto dei piatti sono per turisti: scegli un forno o una trattoria nei vicoli.","💧 In molti angoli del centro trovi i «nasoni», le fontanelle di ghisa: attivate «Acqua» sulla mappa."]],
["⛪ Vaticano e San Pietro",["Servono spalle e ginocchia coperte per entrare in San Pietro. Si passa un controllo di sicurezza, e la coda può essere di mezz'ora.","Il mercoledì mattina la basilica è chiusa per l'udienza generale del Papa.","Musei Vaticani: 20 € più 5 € di prenotazione, chiusi la domenica tranne l'ultima del mese (gratis la mattina, con code lunghe).","Intorno alla piazza i locali costano di più: a 10 minuti, in Prati, si mangia meglio."]],
["🌿 Trastevere",["Di giorno è un quartiere tranquillo, di sera si riempie: i posti migliori sono nei vicoli, non sulle piazze.","La basilica di Santa Maria in Trastevere, gratis, ha i mosaici d'oro più belli di Roma.","Per la vista sul Gianicolo si sale per Via Garibaldi: sono 20 minuti di salita, oppure il bus 115."]],
["🏛️ Musei Vaticani e Castel Sant'Angelo",["Musei Vaticani: prenota un orario sul sito ufficiale, calcola tre ore tra Gallerie, Stanze di Raffaello e Cappella Sistina (silenzio e niente foto).","Castel Sant'Angelo: 16 €, aperto tutti i giorni 9–19:30 (ultimo ingresso 18:30).","Dal Ponte Sant'Angelo la vista sul castello al tramonto è tra le più belle di Roma."],["vaticani","castel"]],
["🗿 Galleria Borghese e Villa Borghese",["La prenotazione della Galleria è obbligatoria: 16 € più 2 €, con due ore di visita a orario fisso. Chiusa il lunedì.","Il parco di Villa Borghese è gratis: porta l'acqua e vai al Pincio per il tramonto."],["borghese","pincio"]],
["🌳 Aventino, Circo Massimo e Terme di Caracalla",["Il Giardino degli Aranci e il buco della serratura sono gratis; la fila del buco è breve ma costante.","Terme di Caracalla: 8 €, chiuse il lunedì; in autunno chiudono prima del tramonto.","Il mercato di Testaccio è aperto dal lunedì al sabato fino alle 15:30: arriva entro mezzogiorno per i banchi migliori."],["aventino","bocca","caracalla","testaccio"]]],
WTIPS:["L'acqua dei «nasoni» (le fontanelle di ghisa) è potabile e freschissima: porta una borraccia e risparmi sulle bottigliette.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Le fontane monumentali, come Trevi e Navona, non sono da bere.","Al ristorante puoi chiedere l'acqua del rubinetto, ma di solito portano bottiglie a pagamento: se non la vuoi, dillo subito."],
GEN:["Stessa lingua e stesso fuso orario, nessuna valuta da cambiare.","A Roma si pranza tra le 12:30 e le 15 e si cena dalle 19:30.","Il coperto (di solito 1,50–3 € a persona) è legale se segnato nel menu; la mancia non è obbligatoria.","Al bar, al banco si paga meno che al tavolo: prima si paga alla cassa, poi si porta lo scontrino al barista.","I borseggiatori lavorano su Termini, in metro A, sul bus 64 e a Trevi: zaino davanti.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Numero unico di emergenza · <a class="call" href="tel:118">📞 118</a> Ambulanza</li><li>🚇 Metro, bus e tram, anche per oggetti smarriti: <a href="https://www.atac.roma.it/" target="_blank" rel="noopener">atac.roma.it</a> e <a href="https://romamobilita.it/" target="_blank" rel="noopener">romamobilita.it</a>.</li><li>🛡️ Per denunciare un furto: qualsiasi commissariato di Polizia di Stato o stazione dei Carabinieri.</li>',
STRK:'Nei giorni prima controllate il servizio su <a href="https://www.atac.roma.it/" target="_blank" rel="noopener">atac.roma.it</a> e, se usate il treno, su <a href="https://www.trenitalia.com/" target="_blank" rel="noopener">trenitalia.com</a>; gli scioperi nazionali sono elencati su <a href="https://scioperi.mit.gov.it/" target="_blank" rel="noopener">scioperi.mit.gov.it</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="40" cy="30" r="13"/><path d="M0 106 Q40 80 90 88 Q130 94 160 106 Z"/><path d="M252 106 Q296 78 340 84 Q380 88 400 100 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 V70 Q10 62 20 62 H124 Q134 62 134 70 V106 Z"/><path d="M20 62 Q26 54 40 52 H104 Q118 54 124 62 Z"/></g>'+
'<g style="--k:2"><path d="M166 106 V70 h58 V106 Z M170 70 V62 h50 V70 Z M174 62 V52 h42 V62 Z"/><path d="M174 52 Q174 30 195 28 Q216 30 216 52 Z"/><path d="M192 28 V18 h6 V28 Z M194.4 16 h1.2 v-8 h-1.2z M191 11.5 h8 v1.2 h-8z"/><path d="M158 106 V84 h8 V106 Z M224 106 V84 h8 V106 Z"/></g>'+
'<g style="--k:3"><path d="M246 106 V80 h56 V106 Z M244 80 H304 V76 H244 Z M248 76 L275 56 L302 76 Z"/><path d="M262 56 Q262 44 275 42 Q288 44 288 56 Z"/></g>'+
'<g style="--k:4"><path d="M318 106 V66 h36 V106 Z M314 66 h44 v-4 h-44z M322 62 V50 h28 V62 Z M326 50 V44 h20 V50 Z"/><path d="M336 44 V34 h0 M333 34 h6 v-2 h-6z"/></g>'+
'<g style="--k:5"><path d="M374 106 V68 h4 V106 Z"/><path d="M356 68 Q364 52 376 52 Q390 52 398 68 Q388 62 376 62 Q364 62 356 68 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M24 76 v22 M38 76 v22 M52 76 v22 M66 76 v22 M80 76 v22 M94 76 v22 M108 76 v22 M122 76 v22 M20 70 H124 M20 82 H124 M14 92 H130"/><path d="M178 72 v32 M190 72 v32 M202 72 v32 M214 72 v32 M180 56 v6 M192 56 v6 M204 56 v6"/><path d="M252 82 v22 M262 82 v22 M274 82 v22 M286 82 v22 M296 82 v22"/><path d="M322 74 h28 M322 84 h28 M322 94 h28"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="195" cy="6" r="1.6"/><circle cx="148" cy="30" r="1.3"/><circle cx="242" cy="30" r="1.3"/><circle cx="275" cy="30" r="1.4"/><circle cx="336" cy="22" r="1.3"/><circle cx="72" cy="38" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.roma);
