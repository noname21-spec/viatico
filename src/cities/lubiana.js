/* ===== Lubiana (dati verificati il 14 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.lubiana=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: dall'Italia non ho trovato voli diretti per Lubiana (LJU) tra metà novembre e metà dicembre 2026; per Zagreb (ZAG) sì, e da lì si arriva a Lubiana in bus o in treno in circa 2 ore e mezza */
var PAR={
LJU:{n:"Lubiana Jože Pučnik (LJU)",s:"Aeroporto di Lubiana, a Brnik",url:"https://www.lju-airport.si/en",live:"Ljubljana",inMin:70,buf:120,pos:[46.2237,14.4576],sd:"Aeroporto LJU · bus o navetta, circa 50 min",rt:"Dall'aeroporto: bus di linea (circa 50 minuti) o navetta condivisa fino alla stazione degli autobus di Lubiana, poi 10 minuti a piedi fino a Piazza Prešeren.",
 arr:"Dall'Italia si entra in Slovenia senza controllo passaporti (spazio Schengen). Attenzione: nelle mie ricerche (metà novembre–metà dicembre 2026) non ho trovato voli diretti dall'Italia per Lubiana: di norma si arriva con uno scalo, per esempio a Monaco, Francoforte, Zurigo o Amsterdam, e il biglietto costa molto più dei voli low cost per Zagabria (vedi l'altro aeroporto). L'aeroporto è a Brnik, circa 25 chilometri a nord della città e senza treno. Fuori dal terminal parte il bus di linea 28 per la stazione degli autobus di Lubiana (circa 50 minuti, corse ogni 25–60 minuti, meno frequenti nel fine settimana): la stazione è a 10 minuti a piedi da Piazza Prešeren, il centro. In alternativa la navetta condivisa (Nomago/GoOpti, circa 45 minuti, prenotabile online o al banco arrivi) oppure il taxi, 25–30 minuti.",
 tk:"Biglietti (da guide e siti di viaggio, non dal sito dell'aeroporto: da confermare): il bus costa circa 4 € e si paga in contanti all'autista, la navetta 9–14 € a persona secondo quando prenoti, il taxi circa 40 € verso il centro. Uber e Bolt non funzionano a Lubiana. Il biglietto urbano dei bus cittadini (1,50 €) non vale per l'aeroporto, che è fuori città.",
 gm:"Aeroporto di Lubiana Jože Pučnik, Brnik",
 tips:["L'ultimo bus della sera è presto (circa le 20–21, da confermare): se atterri tardi prenota la navetta o conta sul taxi.","Porta qualche euro in contanti: il bus per il centro si paga solo in contanti all'autista.","Il bus del mattino presto e quello della domenica sono rari: controlla l'orario aggiornato su lpp.si o sul sito dell'aeroporto il giorno prima."]},
ZAG:{n:"Zagabria Franjo Tuđman (ZAG), Croazia",s:"Aeroporto di Zagabria, a 2 ore e mezza da Lubiana",url:"https://www.zagreb-airport.hr/en",live:"Zagreb",inMin:170,buf:150,pos:[45.7429,16.0688],sd:"Aeroporto ZAG · bus o treno, circa 2 ore e mezza",rt:"Dall'aeroporto di Zagabria: navetta per la stazione degli autobus di Zagabria, poi bus diretto per Lubiana (circa 2 ore) o treno dalla stazione centrale.",
 arr:"Zagabria è l'aeroporto più comodo con voli diretti low cost dall'Italia (nelle mie ricerche per novembre 2026: Ryanair da Milano Bergamo e da Roma Fiumicino, Croatia Airlines da Roma), ma è in Croazia, a circa 140 chilometri da Lubiana: la gita in giornata è lunga. Dall'aeroporto si raggiunge il centro di Zagabria con la navetta per la stazione degli autobus (circa 30 minuti, da confermare). Da lì i bus diretti per Lubiana (FlixBus, Nomago, GoOpti e altri, in media 76 al giorno secondo Omio) impiegano circa 2 ore. In alternativa il treno diretto dalla stazione centrale di Zagabria (circa 6 al giorno, 2 ore e 20–40 minuti). Si attraversa il confine Croazia–Slovenia tra Stati Schengen, senza controlli sistematici; porta comunque la carta d'identità.",
 tk:"Biglietti: bus da Zagabria a Lubiana da 5 € se prenoti in anticipo, di solito 10–20 € (Omio, prezzi variabili); treno circa 9 € solo andata in seconda classe (EveryRail, aggiornato a settembre 2026, a quanto pare si compra allo sportello). La navetta per Zagabria costa circa 8 € (da confermare). Controlla le corse su flixbus.com, nomago.si o sz.si.",
 gm:"Aeroporto di Zagabria, Velika Gorica",
 tips:["Scegli un volo del mattino: con il tragitto di quasi tre ore per Lubiana, un volo di pomeriggio lascia pochissimo tempo in città.","Il bus diretto è la scelta più semplice: alcune corse partono direttamente dall'aeroporto (da confermare sul sito dell'operatore).","Per il ritorno calcola almeno 4 ore tra la partenza da Lubiana e il decollo."]}
};
/* linee (tracciati indicativi) */
var SEG={
bl:{c:"#0a6ebd",n:"Bus 28 / navetta dall'aeroporto di Lubiana",p:[[46.2237,14.4576,"Aeroporto",2],[46.0573,14.5105,"Stazione degli autobus",2]]},
bz:{c:"#2e8b57",n:"Bus o treno Zagabria–Lubiana",p:[[45.7429,16.0688,"Aeroporto di Zagabria",2],[46.0573,14.5105,"Stazione degli autobus (Lubiana)",2]]},
wk:{c:"#888888",n:"A piedi per Slovenska cesta",p:[[46.0573,14.5105,"Stazione degli autobus",2],[46.0545,14.5085,"Slovenska cesta"],[46.0514,14.5060,"Piazza Prešeren",2]]}
};
var START=[46.0514,14.5060];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
tromost:{t:"Piazza Prešeren e Triplo Ponte",z:"A",p:1,min:30,id:45,max:75,pos:[46.0509,14.5063],q:"Tromostovje, Ljubljana",cls:"walk",sun:1,
 d:"Il cuore di Lubiana: la piazza con il monumento al poeta France Prešeren, la chiesa francescana rosa e i tre ponti affiancati sul fiume Ljubljanica, disegnati dall'architetto Jože Plečnik. Da qui parte tutto il centro storico.",
 m:"Si cammina gratis, a qualunque ora. La piazza è chiusa al traffico. Di sera è illuminata ed è il posto più bello per una foto."},
vecchio:{t:"Città vecchia: Stari trg, Mestni trg e Ponte dei Draghi",z:"A",p:1,min:45,id:75,max:120,pos:[46.0500,14.5072],q:"Stari trg, Ljubljana",cls:"walk",sun:1,
 d:"Le stradine della Lubiana medievale sotto la collina del castello, con case colorate, botteghe e locali sulle rive del fiume. A nord il Ponte dei Draghi, del 1901, ha quattro draghi di bronzo, simbolo della città.",
 m:"Si cammina gratis. Le botteghe chiudono presto e la domenica molte restano chiuse; i locali sul fiume restano aperti fino a sera. Il centro storico è pedonale."},
mercato:{t:"Mercato centrale, Colonnato di Plečnik e Cattedrale",z:"A",p:2,min:60,id:90,max:120,pos:[46.0507,14.5085],q:"Central Market, Ljubljana",cls:"walk",sun:0,
 d:"Il mercato all'aperto di Piazza Vodnik e le bancarelle sotto il lungo colonnato di Plečnik sul fiume: frutta, verdura, formaggi, salumi, miele e prodotti locali. Lì accanto c'è la Cattedrale di San Nicola, barocca, con le porte di bronzo.",
 m:"Il mercato è aperto dal lunedì al sabato, di norma dalle 6 alle 18 (il sabato fino alle 16, d'inverno si chiude prima, da confermare), e la domenica è chiuso. La Cattedrale si visita gratis fuori dalle funzioni (orari non letti: da confermare). Dall'autunno la sera le bancarelle sono smontate."},
castello:{t:"Castello di Lubiana",z:"A",p:1,min:120,id:150,max:210,pos:[46.0488,14.5088],q:"Ljubljana Castle",cls:"",sun:1,tk:[19,"Castello di Lubiana con funicolare andata e ritorno (circa 19 €)",1,1],
 win:function(){return[9*60,21*60]},
 d:"Il castello medievale che domina la città dalla collina, con la torre panoramica da cui si vede tutta Lubiana fino alle Alpi, il museo di storia della Slovenia e lo spettacolo del «castello virtuale». Si sale in 3 minuti con la funicolare o a piedi in circa 15–20 minuti.",
 m:"Aperto ogni giorno, di norma dalle 9 alle 21 d'inverno (ultimo ingresso mezz'ora prima): le fonti che ho letto non concordano su orari e prezzi, quindi controlla ljubljanskigrad.si. Prezzi da guide: ingresso al castello 13–15 €, con funicolare andata e ritorno circa 19 €; solo funicolare 6 € a/r (da confermare). La funicolare parte da Krekov trg, vicino al mercato. Il cortile si visita gratis."},
crociera:{t:"Crociera in barca sul fiume Ljubljanica",z:"A",p:3,min:50,id:60,max:75,pos:[46.0467,14.5043],q:"Breg 1, Ljubljana",cls:"",sun:1,tk:[15.82,"Crociera sulla Ljubljanica (15,82 €)",1,1],
 d:"Una gita di 50 minuti in barca lungo il fiume, sotto i ponti del centro, con una guida che racconta la storia della città. È un modo comodo per vedere Lubiana da una prospettiva diversa e riposare le gambe.",
 m:"Biglietto adulti 15,82 €, bambini 6–13 anni 8,44 €, sotto i 6 anni gratis (visitljubljana.com). Parte dal molo di Breg 1. Gli orari e se le gite siano attive in autunno e in inverno non li ho trovati: controlla il calendario sul sito di Visit Ljubljana e prenota online."},
tivoli:{t:"Parco Tivoli",z:"B",p:4,min:60,id:90,max:120,pos:[46.0580,14.4990],q:"Tivoli Park, Ljubljana",cls:"walk",sun:1,
 d:"Il grande parco della città, a pochi minuti dal centro, con viali alberati, la villa Cekin e il castello di Tivoli sullo sfondo. È il posto dove i abitanti di Lubiana vanno a correre e a passeggiare.",
 m:"Il parco è aperto sempre e si visita gratis. Il tratto più bello è il lungo viale Jakopič, con le mostre fotografiche all'aperto. Ci si arriva a piedi in circa 15 minuti da Piazza Prešeren."},
congressi:{t:"Piazza dei Congressi e Biblioteca Nazionale",z:"B",p:5,min:30,id:45,max:60,pos:[46.0489,14.5039],q:"Kongresni trg, Ljubljana",cls:"walk",sun:1,
 d:"La grande piazza del 1821 dove si riunirono le potenze europee dopo Napoleone, con l'Università, la filarmonica e il giardino. A pochi passi la Biblioteca Nazionale e Universitaria, opera di Plečnik, con la facciata di pietra e mattoni.",
 m:"La piazza si visita gratis a qualunque ora; la biblioteca si guarda da fuori (per la visita all'interno non ho trovato orari: da confermare)."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","tromost",2,"walk","A due passi: il Triplo Ponte è a 2 minuti da Piazza Prešeren.","A due passi fino a Piazza Prešeren, circa 2 minuti.",{f:[W([[46.0514,14.5060],[46.0509,14.5063]])],r:[W([[46.0509,14.5063],[46.0514,14.5060]])]});
P2("tromost","vecchio",5,"walk","A piedi lungo il fiume per Mestni trg e Stari trg, circa 5 minuti.","A piedi per Mestni trg fino al Triplo Ponte, circa 5 minuti.",{f:[W([[46.0509,14.5063],[46.0503,14.5070],[46.0500,14.5072]])],r:[W([[46.0500,14.5072],[46.0503,14.5070],[46.0509,14.5063]])]});
P2("tromost","mercato",4,"walk","A piedi lungo la riva del fiume fino al mercato, circa 4 minuti.","A piedi lungo il fiume fino al Triplo Ponte, circa 4 minuti.",{f:[W([[46.0509,14.5063],[46.0508,14.5075],[46.0507,14.5085]])],r:[W([[46.0507,14.5085],[46.0508,14.5075],[46.0509,14.5063]])]});
P2("vecchio","castello",20,"walk","A piedi per Stari trg e il sentiero in salita fino al castello, circa 20 minuti (o 5 minuti a piedi fino alla funicolare di Krekov trg e 3 minuti di corsa).","In discesa a piedi fino a Stari trg, circa 12 minuti, oppure con la funicolare.",{f:[W([[46.0500,14.5072],[46.0495,14.5085],[46.0488,14.5088]])],r:[W([[46.0488,14.5088],[46.0495,14.5085],[46.0500,14.5072]])]});
P2("mercato","castello",10,"walk","Dalla funicolare di Krekov trg, a pochi passi dal mercato, in 3 minuti si arriva al castello; a piedi circa 15 minuti.","In discesa con la funicolare o a piedi fino a Krekov trg, circa 10 minuti.",{f:[W([[46.0507,14.5085],[46.0500,14.5090],[46.0488,14.5088]])],r:[W([[46.0488,14.5088],[46.0500,14.5090],[46.0507,14.5085]])]});
P2("mercato","crociera",8,"walk","A piedi lungo il fiume fino al molo di Breg, circa 8 minuti.","A piedi lungo il fiume fino al mercato, circa 8 minuti.",{f:[W([[46.0507,14.5085],[46.0490,14.5060],[46.0467,14.5043]])],r:[W([[46.0467,14.5043],[46.0490,14.5060],[46.0507,14.5085]])]});
P2("crociera","vecchio",5,"walk","A piedi lungo Stari trg, circa 5 minuti.","A piedi fino al molo di Breg, circa 5 minuti.",{f:[W([[46.0467,14.5043],[46.0485,14.5060],[46.0500,14.5072]])],r:[W([[46.0500,14.5072],[46.0485,14.5060],[46.0467,14.5043]])]});
P2("start","congressi",6,"walk","A piedi per Čopova ulica e Kongresni trg, circa 6 minuti.","A piedi fino a Piazza Prešeren, circa 6 minuti.",{f:[W([[46.0514,14.5060],[46.0500,14.5048],[46.0489,14.5039]])],r:[W([[46.0489,14.5039],[46.0500,14.5048],[46.0514,14.5060]])]});
P2("congressi","crociera",8,"walk","A piedi lungo il fiume fino al molo di Breg, circa 8 minuti.","A piedi fino a Piazza dei Congressi, circa 8 minuti.",{f:[W([[46.0489,14.5039],[46.0478,14.5040],[46.0467,14.5043]])],r:[W([[46.0467,14.5043],[46.0478,14.5040],[46.0489,14.5039]])]});
P2("start","tivoli",15,"walk","A piedi per Čopova ulica e il sottopasso fino al Parco Tivoli, circa 15 minuti.","A piedi per Čopova ulica fino a Piazza Prešeren, circa 15 minuti.",{f:[W([[46.0514,14.5060],[46.0540,14.5020],[46.0580,14.4990]])],r:[W([[46.0580,14.4990],[46.0540,14.5020],[46.0514,14.5060]])]});
P2("congressi","tivoli",15,"walk","A piedi per Slovenska cesta fino al Parco Tivoli, circa 15 minuti.","A piedi per Slovenska cesta fino a Piazza dei Congressi, circa 15 minuti.",{f:[W([[46.0489,14.5039],[46.0535,14.5010],[46.0580,14.4990]])],r:[W([[46.0580,14.4990],[46.0535,14.5010],[46.0489,14.5039]])]});
/* ritorno in aeroporto: a piedi fino alla stazione degli autobus, poi bus o navetta */
var RET={
LJU:{
 A:{min:70,txt:"A piedi (10 minuti) fino alla stazione degli autobus, poi il bus per l'aeroporto (circa 50 minuti, circa 4 € in contanti) oppure la navetta prenotata (circa 45 minuti, 9–14 €). L'ultimo bus utile è presto: se il volo è la sera tardi o al mattino presto, prenota la navetta o il taxi (circa 40 €). Orari da confermare.",g:[["wk","Piazza Prešeren","Stazione degli autobus"],["bl","Stazione degli autobus","Aeroporto"]]}},
ZAG:{
 A:{min:170,txt:"A piedi (10 minuti) fino alla stazione degli autobus, poi bus diretto per Zagabria (circa 2 ore, da 5 €) e navetta per l'aeroporto. In alternativa il treno per Zagabria (2 ore e 20–40 minuti, circa 9 €). Prevedi almeno 4 ore prima del volo.",g:[["wk","Piazza Prešeren","Stazione degli autobus"],["bz","Stazione degli autobus (Lubiana)","Aeroporto di Zagabria"]]}}
};
var ARR={
LJU:[["bl","Aeroporto","Stazione degli autobus"],["wk","Stazione degli autobus","Piazza Prešeren"]],
ZAG:[["bz","Aeroporto di Zagabria","Stazione degli autobus (Lubiana)"],["wk","Stazione degli autobus","Piazza Prešeren"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
nobel:{n:"Nobel Burek",a:"Prešernov trg (vicino al Triplo Ponte)",z:"A",r:"4,2",pos:[46.0510,14.5058],h:D7("00:00-24:00"),
 d:"Il chiosco del burek, la sfoglia ripiena di formaggio o carne, tipica dei Balcani e della colazione di Lubiana: si mangia caldo, spesso con un bicchiere di yogurt. Aperto giorno e notte.",pr:"Un burek costa 2–4 € (fascia dalle guide, listino non visto). Orari da una scheda online, da confermare."},
klobasarna:{n:"Klobasarna",a:"Ciril-Metod\u006fv trg 15",z:"A",r:"4,3",pos:[46.0515,14.5079],h:["10:00-21:00","10:00-21:00","10:00-21:00","10:00-21:00","10:00-21:00","10:00-21:00","10:00-16:00"],
 d:"Una piccola salumeria-osteria vicino alla Cattedrale che serve la kranjska klobasa, la salsiccia della Carniola, con senape e rafano, e piatti caldi come la jota, la zuppa di crauti, e il ričet, la zuppa d'orzo.",pr:"Un piatto costa di solito 4–10 € (listino non visto). Orari da una scheda online, da confermare."},
sokol:{n:"Gostilna Sokol",a:"Ciril-Metod\u006fv trg 18",z:"A",r:"4,2",pos:[46.0517,14.5080],h:["07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","10:00-23:00"],
 d:"Una trattoria in sale rustiche decorate in stile tradizionale, con camerieri in costume e piatti sloveni: zuppe, arrosti, carne alla griglia e dolci della casa, con una buona carta di vini sloveni.",pr:"Un piatto principale sta intorno ai 12–20 € (stima, listino non visto). Orari da una scheda online, da confermare."},
druga:{n:"Druga Violina",a:"Stari trg 21",z:"A",r:"4,4",pos:[46.0494,14.5069],h:["","08:00-24:00","08:00-24:00","08:00-24:00","08:00-24:00","08:00-24:00","08:00-24:00"],
 d:"Una trattoria nel centro storico dove lavorano anche persone con disabilità: cucina slovena semplice, con zuppa di manzo e tagliolini, kranjska klobasa e štruklji (rotolini di pasta ripieni, dolci o salati).",pr:"Un piatto sta intorno ai 6–10 € (fascia dalle guide, listino non visto). Orari da Visit Ljubljana; il lunedì risulta chiuso, ma la scheda non lo dice in modo esplicito: da confermare."},
ribca:{n:"Ribca",a:"Adamič-Lundrovo nabrežje 1 (sotto il colonnato di Plečnik)",z:"A",r:"4,2",pos:[46.0509,14.5083],h:["08:00-16:00","08:00-21:00","08:00-21:00","08:00-21:00","08:00-21:00","08:00-21:00","11:30-18:00"],
 d:"Una piccola pescheria-ristorante sulla riva del fiume, con pesce, calamari e gamberi freschi, comprati nel mercato del pesce accanto. Ha un menù del giorno a prezzo fisso per il pranzo.",pr:"Il menù del pranzo costa circa 10,50 €; gli altri piatti di pesce 8–14 € (da guide, da confermare). Orari da una scheda online, da confermare."},
sestica:{n:"Gostilna Šestica",a:"Slovenska cesta 40",z:"B",r:"4,2",pos:[46.0540,14.5008],h:["10:00-23:00","10:00-23:00","10:00-23:00","10:00-23:00","10:00-23:00","12:00-23:00","12:00-22:00"],
 d:"Una delle trattorie più antiche della città, dal 1776: piatti sloveni tradizionali come la jota e la kranjska klobasa, serviti da camerieri in costume, e la prekmurska gibanica, un dolce a strati di semi di papavero, noci, mele e ricotta.",pr:"Un piatto principale sta intorno ai 12–18 € (stima, listino non visto). Orari da Visit Ljubljana."},
zvezda:{n:"Kavarna Zvezda",a:"Wolfova 14",z:"B",r:"4,3",pos:[46.0494,14.5035],h:["07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","07:00-23:00","10:00-20:00"],
 d:"Un caffè luminoso e frequentato da studenti e abitanti del quartiere, a due passi da Piazza dei Congressi, con caffè forte, torte e gelato. È un po' più caro della media.",pr:"Un caffè con una torta sta intorno agli 7–10 € (stima, listino non visto). Orari da una scheda online, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["nobel","druga","sokol"],B:["zvezda","sestica"],C:["zvezda","nobel"],D:["nobel","zvezda"],F:["zvezda","nobel"]},
pra:{A:["klobasarna","ribca","druga","nobel"],B:["sestica","klobasarna"],C:["sestica","ribca"],D:["klobasarna","nobel"],F:["klobasarna","sestica"]},
cen:{A:["druga","sokol","sestica"],B:["sestica","sokol"],C:["sestica","druga"],D:["sestica","sokol"],F:["sestica","druga"]},
snk:{A:["nobel","zvezda","klobasarna"],B:["zvezda","nobel"],C:["zvezda","nobel"],D:["zvezda","nobel"],F:["zvezda","nobel"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Prešeren, Città vecchia e Mercato",acts:["tromost","vecchio","mercato"],need:150,core:1},
{id:"castello",t:"Castello e crociera sul fiume",acts:["castello","crociera"],need:190,core:1},
{id:"verde",t:"Piazza dei Congressi e Parco Tivoli",acts:["congressi","tivoli"],need:130}
];
var ORDER=["tromost","vecchio","castello","mercato","crociera","congressi","tivoli"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cen","Centro storico (Piazza Prešeren, Città vecchia)",[46.0510,14.5068],"A"],
["tiv","Slovenska cesta e Tivoli",[46.0545,14.5020],"B"],
["sta","Stazione e Bežigrad",[46.0585,14.5110],"D"],
["tr","Trnovo / Krakovo (a sud del fiume)",[46.0420,14.5040],"C"],
["altro","Altra zona (scrivi l'indirizzo)",[46.0514,14.5060],""]
];
/* imposta di soggiorno di Lubiana: cifra a persona e a notte, da confermare */
var TAX=[["h5","Hotel 4–5 stelle",3.13],["h3","Hotel fino a 3 stelle, B&B o appartamento",3.13],["host","Ostello o struttura economica",3.13],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Burek in jogurt","la sfoglia ripiena di formaggio o carne con un bicchiere di yogurt: la colazione veloce di Lubiana."],["Kava in štrudelj","caffè e strudel di mele."],["Kava in kos torte","un caffè con una fetta di torta."]],
pra:[["Kranjska klobasa","la salsiccia della Carniola con senape e rafano."],["Jota","la zuppa tradizionale di crauti, fagioli e patate."],["Ričet","zuppa d'orzo con carne affumicata, piatto contadino."],["Ribje meni","il menù del pranzo a base di pesce."]],
cen:[["Štruklji","rotolini di pasta ripieni di ricotta, noci o erbe, il piatto simbolo sloveno."],["Idrijski žlikrofi","gnocchetti ripieni di patate della zona di Idrija, con sugo di carne."],["Kranjska klobasa s kislim zeljem","salsiccia con crauti."],["Prekmurska gibanica","dolce a strati di semi di papavero, noci, mele e ricotta."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Triplo Ponte e Piazza Prešeren","Foto","I tre ponti di Plečnik con la chiesa francescana rosa sullo sfondo: la vista più classica, soprattutto al tramonto.",[46.0509,14.5063],"Tromostovje, Ljubljana","tromost"],
["🤳","Il monumento a Prešeren","Selfie","Il poeta sul piedistallo, la Musa sopra di lui e la chiesa rosa dietro.",[46.0514,14.5060],"Prešernov trg, Ljubljana","tromost"],
["📷","Il Ponte dei Draghi","Foto","Uno dei quattro draghi di bronzo, simbolo della città, sul ponte del 1901.",[46.0522,14.5115],"Zmajski most, Ljubljana","vecchio"],
["📷","Le rive del fiume","Foto","Le case colorate e i tavolini dei locali sul fiume Ljubljanica, in Cankarjevo nabrežje.",[46.0495,14.5062],"Cankarjevo nabrežje, Ljubljana","vecchio"],
["📷","Il Colonnato di Plečnik","Foto","Il lungo portico bianco sul fiume vicino al mercato, con le bancarelle.",[46.0505,14.5085],"Plečnikove arkade, Ljubljana","mercato"],
["📷","Lubiana dal castello","Foto","La città dall'alto dalla torre del castello, con i tetti rossi e le Alpi lontane quando il cielo è limpido.",[46.0488,14.5088],"Ljubljana Castle","castello"],
["📷","Il castello dal basso","Foto","Il castello sulla collina visto da Mestni trg o dalle rive del fiume.",[46.0495,14.5075],"Mestni trg, Ljubljana","castello"],
["📷","La crociera sotto i ponti","Foto","Il Triplo Ponte visto dalla barca, da una posizione bassa sull'acqua.",[46.0509,14.5063],"Tromostovje, Ljubljana","crociera"],
["📷","Il viale del Tivoli","Foto","Il lungo viale alberato Jakopič con le fotografie esposte all'aperto, d'autunno pieno di foglie.",[46.0586,14.4998],"Jakopičevo sprehajališče, Ljubljana","tivoli"],
["📷","Piazza dei Congressi","Foto","La grande piazza con il giardino e i palazzi neoclassici dell'Università.",[46.0489,14.5039],"Kongresni trg, Ljubljana","congressi"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2027-03-31",t:"Voli diretti dall'Italia: Zagabria al posto di Lubiana",x:"Nelle mie ricerche del 14 ottobre 2026 non risultano voli diretti dall'Italia per Lubiana tra metà novembre e metà dicembre 2026. Per Zagabria ci sono voli diretti (Ryanair da Milano Bergamo e Roma Fiumicino, Croatia Airlines da Roma), poi 2 ore di bus o treno per Lubiana. Controlla le rotte prima di prenotare."},
{from:"2026-11-15",to:"2027-01-06",t:"Mercatini di Natale di Lubiana",x:"Di solito il «Dicembre festoso» apre i primi di dicembre e dura fino all'Epifania, con le casette sulle rive del fiume, in Pogačarjev trg e nel cortile del castello (nel 2018 i mercatini erano aperti dal 30 novembre al 6 gennaio). Le date 2026 non le ho trovate: controlla sul sito di Visit Ljubljana. Il centro è molto più affollato."},
{from:"2026-10-14",to:"2027-03-31",t:"Castello e funicolare: orari invernali da confermare",x:"Le fonti non concordano su orari e prezzi del castello e della funicolare in autunno e in inverno. Controlla ljubljanskigrad.si prima di salire; ultimo ingresso mezz'ora prima della chiusura."}
];
/* clima medio di Lubiana (indicativo, massime/minime) */
var CLIM=[[3,-3],[6,-2],[11,1],[16,5],[21,10],[25,13],[28,15],[28,15],[22,11],[16,7],[8,3],[3,-1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Lubiana: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="mercato"&&WD===6)meta+=" Oggi è domenica: il mercato centrale è chiuso, ma il colonnato e la cattedrale si vedono.";
if(it.id==="mercato"&&WD===5)meta+=" Oggi è sabato: il mercato chiude prima, di solito alle 16.";
if(it.id==="vecchio"&&WD===6)meta+=" Oggi è domenica: molte botteghe del centro storico sono chiuse.";
return meta}
Object.assign(C,{id:"lubiana",n:"Lubiana",cn:"Slovenia",e:"🐉",flag:"🇸🇮",col:["#0a6ebd","#2e8b57","#e8e8e8"],k:"lubiana ljubljana slovenia",
TZ:"Europe/Ljubljana",LL:[46.0514,14.5060],CC:"si",QN:"Ljubljana",BK:"Ljubljana",ARE:/ljubljana|lubiana|\b1000\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"sl-SI",LANGN:"sloveno",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Piazza Prešeren",q:"Prešernov trg, Ljubljana"},
SINGLE:{acts:["tromost","vecchio","castello","mercato"],ins:[]},
EXCL:[],
DICON:{tromost:"🌉",vecchio:"🏘️",mercato:"🧺",castello:"🏰",crociera:"⛵",tivoli:"🌳",congressi:"🏛️"},
ZN:{A:"nel centro storico",B:"a Slovenska cesta e Tivoli",C:"a Trnovo e Krakovo",D:"alla stazione e a Bežigrad",F:"nel centro"},
NEAR:{col:"burek o caffè",pra:"locale veloce",cen:"trattoria",snk:"caffè o chiosco"},
SE:{nobel:"🥧",klobasarna:"🌭",sokol:"🍲",druga:"🍲",ribca:"🐟",sestica:"🍲",zvezda:"☕"},
TR:{one:1.5,lbl:"Autobus cittadini (LPP)",
 air:{LJU:{one:4,n:"Bus 28 per l'aeroporto (circa 4 €)"},ZAG:{one:12,n:"Bus Zagabria–Lubiana (circa 12 €, prezzo variabile)"}},
 passes:[],
 note:"A Lubiana non ci sono metro né tram: nel centro storico (zona pedonale) si va quasi sempre a piedi. Per gli autobus cittadini (LPP) serve la carta Urbana, che costa 2 € e si ricarica alle macchinette verdi (Urbanomat) e nei punti vendita: la corsa singola, valida 90 minuti compresi i cambi, costa 1,50 € (prezzi da visitljubljana.com, da confermare). Tutta la città è nella zona 1. L'aeroporto è fuori città: il bus per Brnik non è compreso nel biglietto urbano. Il castello si raggiunge a piedi o con la funicolare."},
FOOD:{co:[5,"Colazione (burek o caffè)"],pr:[9,"Pranzo (zuppa o salsiccia)"],ce:[16,"Cena (cucina slovena)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"A piedi",move:"quasi tutto a piedi",bags:"«Ali lahko pustim kovčke tukaj?»",bagsPM:"«Ali lahko pustim kovčke do popoldneva?»",bagsAM:"«Ali lahko pustim kovčke do poldneva?»",
pra:"Un locale veloce",praZ:{A:"Lungo le rive del fiume i ristoranti con i tavolini sono molto turistici e cari: per un pasto più vero cerca le vie laterali, per esempio vicino alla Cattedrale (Ciril-Metod\u006fv trg).",B:"Su Slovenska cesta si trovano trattorie classiche e locali per studenti, più tranquilli e meno cari del centro storico."},
freeLong:"Qualche idea: un caffè sulle rive del fiume, una passeggiata nel Parco Tivoli, il mercato del sabato mattina o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè sul fiume.",
remind:"Il castello è aperto ogni giorno, ma la domenica il mercato è chiuso. Porta qualche euro in contanti per il bus e i chioschi.",
rain1:"Al coperto: il museo del castello, la Cattedrale, i caffè sul fiume e le trattorie del centro.",
rainM:"Al coperto: il castello (musei), la Cattedrale e i caffè, con una pausa nel mercato coperto.",
water:"Riempite la borraccia: l'acqua del rubinetto di Lubiana è ottima e sicura. Ci sono fontanelle pubbliche in centro: attivate «Acqua» sulla mappa.",
kitchen:"A Lubiana si pranza tra le 12 e le 15 e si cena dalle 18 alle 22: molte trattorie tradizionali chiudono presto la domenica, i caffè restano aperti tutto il giorno.",
night:[["🍷","Un bicchiere di vino sloveno o una birra artigianale sulle rive del fiume: è il modo tipico di chiudere la serata."],["🕙","Le cucine di solito servono fino alle 21–22; non c'è metro e i bus serali sono pochi: il centro si gira a piedi."],["☕","Molti caffè aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Lubiana ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per trattorie, chioschi e caffè: una colazione sta intorno ai 4–8 € e una cena completa con un piatto principale intorno ai 14–20 €. Quasi ovunque si paga con la carta; al mercato e ai chioschi conviene avere qualche euro in contanti.",
taxNote:"L'imposta di soggiorno di Lubiana è circa 3,13 € a persona e a notte (cifra da confermare, i bambini piccoli di norma sono esenti). Spesso non è compresa nel prezzo dell'annuncio: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: trattorie e locali tradizionali o storici, niente catene. Colazione e cena restano sotto i 15–20 € a persona. Orari e prezzi sono quelli di guide e schede online (ottobre 2026), con l'eccezione di Šestica e Druga Violina presi dal sito di Visit Ljubljana: controllali qualche giorno prima. Alcune voci possono essere cambiate."},
fx:{meta:meta},
AIRTIPS:["💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara.","Il bus 28 per Lubiana si paga in contanti all'autista: tieni qualche euro in tasca."],
CHECK:[["tk","Biglietto del bus dall'aeroporto (circa 4 € in contanti) e carta Urbana per gli autobus cittadini (2 €)",function(E){return true}],["cas","Biglietto del castello con la funicolare (circa 19 €): lo compri alla stazione a valle",["castello"]],["boat","Prenotazione della crociera sul fiume (15,82 €) sul sito di Visit Ljubljana",["crociera"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per bus, mercato e chioschi"]],
NUM:{1:["eno","E-no"],2:["dva","dva"],3:["tri","tri"],4:["štiri","SHTI-ri"],5:["pet","pet"],6:["šest","shest"],7:["sedem","SE-dem"],8:["osem","O-sem"],9:["devet","DE-vet"],10:["deset","DE-set"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Dober dan / Dober večer","DO-ber dan / DO-ber VE-cher"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Mizo za "+(N===1?"eno osebo":nu[0])+", prosim","MI-zo za "+(N===1?"E-no O-so-bo":nu[1])+", PRO-sim"],["Un caffè e una fetta di torta, per favore","Kavo in kos torte, prosim","KA-vo in kos TOR-te, PRO-sim"],["Acqua del rubinetto, per favore","Vodo iz pipe, prosim","VO-do iz PI-pe, PRO-sim"],["Il conto, per favore","Račun, prosim","RA-chun, PRO-sim"],["Posso pagare con la carta?","Lahko plačam s kartico?","LA-ko PLA-cham s KAR-ti-tso"],["Quanto costa?","Koliko stane?","ko-LI-ko STA-ne"],["Dov'è la fermata dell'autobus?","Kje je avtobusna postaja?","kie ie av-TO-bus-na po-STA-ia"],["Qual è il bus per l'aeroporto?","Kateri avtobus vozi na letališče?","ka-TE-ri av-TO-bus VO-zi na le-TA-lish-che"]];
if(M)fr=fr.concat([["Ho una prenotazione","Imam rezervacijo","I-mam re-ZER-va-tsi-io"],["Posso lasciare i bagagli?","Ali lahko pustim prtljago tukaj?","A-li LA-ko PU-stim PRT-lia-go TU-kai"],["A che ora è il check-out?","Ob kateri uri je odjava?","ob ka-TE-ri U-ri ie od-IA-va"]]);
return fr.concat([["Mi scusi","Oprostite","o-PRO-sti-te"],["Grazie mille!","Najlepša hvala!","NAI-lep-sha HVA-la"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Lubiana: "+(tx[2]?"circa "+(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+"), cifra da confermare":"non si paga se sei ospite di amici o parenti")+". I bambini piccoli di norma sono esenti. Spesso non è compresa nel prezzo che trovi sull'annuncio."},
STAYTIPS:["Lubiana è piccola: dal centro storico si va quasi ovunque a piedi. Non ci sono metro né tram, solo autobus, ma in pratica servono solo per l'aeroporto e per i quartieri fuori dal centro."],
ZONES:[
["🚌 Autobus e biglietti",["Gli autobus cittadini (LPP) si usano con la carta Urbana (2 €) o con la carta di credito a bordo: la corsa costa 1,50 € e vale 90 minuti.","Il centro storico è pedonale: in auto non si entra.","Il bus per l'aeroporto è una linea a parte, circa 4 €, da pagare in contanti all'autista.","Uber e Bolt non operano a Lubiana: i taxi si chiamano al telefono o si trovano nei posteggi."]],
["🏰 Centro e castello",["Piazza Prešeren, il Triplo Ponte e il mercato sono a pochi passi l'uno dall'altro.","Il castello si raggiunge con la funicolare da Krekov trg (circa 3 minuti) o a piedi in 15–20 minuti.","In cima c'è anche un ristorante, ma ci sono prezzi più alti: i locali in centro costano meno."],["tromost","castello","mercato"]],
["⛵ Il fiume e i ponti",["Le rive della Ljubljanica sono piene di caffè e ristoranti con i tavolini: sono belli, ma più cari della media.","Il Ponte dei Draghi e il Triplo Ponte sono a 10 minuti a piedi l'uno dall'altro."],["crociera","vecchio"]],
["🌅 Un giorno fuori Lubiana",["Il lago di Bled si raggiunge con un bus in circa un'ora e mezza (non ho verificato orari e prezzi: da confermare).","Le grotte di Postumia e il castello di Predjama sono a circa un'ora di strada."]]],
WTIPS:["L'acqua del rubinetto di Lubiana è ottima e sicura: puoi chiederla in ogni locale («Vodo iz pipe, prosim») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Slovenia usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Lubiana ha lo stesso fuso orario dell'Italia.","Mancia: non è obbligatoria; si arrotonda o si lascia il 5–10% se il servizio è stato buono.","La domenica molti negozi del centro sono chiusi e il mercato è chiuso; restano aperti caffè, ristoranti e musei.","Molti chioschi e piccoli locali preferiscono i contanti: porta qualche euro.","Il centro è pedonale: per l'aeroporto serve il bus o la navetta, non c'è treno.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚌 Autobus cittadini, anche per oggetti smarriti: <a href="https://www.lpp.si/" target="_blank" rel="noopener">lpp.si</a> · treni: <a href="https://potniski.sz.si/" target="_blank" rel="noopener">potniski.sz.si</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Lubiana: <a href="https://amblubiana.esteri.it" target="_blank" rel="noopener">amblubiana.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti della Slovenia. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.lpp.si/" target="_blank" rel="noopener">lpp.si</a> e, per i treni, <a href="https://potniski.sz.si/" target="_blank" rel="noopener">potniski.sz.si</a>; per la Croazia e i voli, <a href="https://www.viaggiaresicuri.it/" target="_blank" rel="noopener">viaggiaresicuri.it</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="360" cy="26" r="11"/><path d="M0 106 V92 Q60 70 130 80 Q190 88 230 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 V60 H44 V106 Z M8 60 H46 L27 34 Z M26 34 V16 H28 V34 Z M16 60 V50 H38 V60 Z"/></g>'+
'<g style="--k:2"><path d="M62 106 V74 H138 V106 Z M62 74 H138 V70 H62 Z M72 70 V56 H84 V70 Z M116 70 V50 H128 V70 Z M70 56 L78 44 L86 56 Z M114 50 L122 38 L130 50 Z"/></g>'+
'<g style="--k:3"><path d="M160 106 V46 H190 V106 Z M156 46 H194 L175 22 Z M174 22 V8 H176 V22 Z M168 60 H182 V70 H168 Z"/></g>'+
'<g style="--k:4"><path d="M214 106 V80 Q250 52 286 80 V106 Z M232 80 Q250 66 268 80 Z M250 54 V44 H252 V54 Z"/></g>'+
'<g style="--k:5"><path d="M304 106 V72 H388 V106 Z M304 72 V66 H388 V72 Z M322 66 V54 H336 V66 Z M356 66 V46 H370 V66 Z M320 54 L329 40 L338 54 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M64 90 h72 M64 98 h72"/><path d="M308 84 h76 M308 94 h76"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="100" cy="14" r="1.3"/><circle cx="150" cy="18" r="1.3"/><circle cx="210" cy="22" r="1.3"/><circle cx="300" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.lubiana);
