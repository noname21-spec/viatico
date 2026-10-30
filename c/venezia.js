(function(o){
/* ===== Venezia (dati verificati il 13 ottobre 2026) =====
   Verificati su fonti web il 13 ottobre 2026: calendario e importi del contributo d'accesso 2026 (Sky TG24, Il Post, QualityTravel, Wego),
   prezzi dei biglietti ACTV e dei transfer aeroportuali (veneziaunica.it, aeroporto.net, europeforvisitors.com).
   Da confermare: orari e prezzi dei musei e delle chiese, orari dei locali e imposta di soggiorno (non letti sui siti ufficiali),
   prezzo del bus ATVO per Marco Polo, ratings dei locali (non indicati), posizioni (indicative, da controllare su Google Maps). */
window.CITIES=window.CITIES||{};
CITIES.venezia=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
VCE:{n:"Venezia Marco Polo (VCE)",s:"Venezia Marco Polo",url:"https://www.veneziaairport.it/",live:"Venezia",inMin:65,buf:120,pos:[45.5053,12.3519],sd:"Marco Polo · bus per Piazzale Roma",rt:"Dall'aeroporto: bus diretto fino a Piazzale Roma, poi vaporetto o a piedi.",
 arr:"Dopo il ritiro bagagli esci dall'area arrivi: davanti al terminal ci sono le fermate dei bus. L'ATVO Express va senza fermate a Piazzale Roma in circa 20 minuti (un bus ogni 20 minuti, più frequenti nelle ore di punta); l'ACTV linea 5 «Aerobus» ferma lungo la strada e impiega 25–30 minuti. Se preferisci arrivare in barca, segui la passerella coperta fino alla darsena (circa 7 minuti a piedi) e prendi l'Alilaguna: la linea Blu arriva a San Marco in circa un'ora e un quarto, l'Arancio passa dal Canal Grande. In tutti i casi a Piazzale Roma si finisce sul bordo della città: da lì si continua a piedi o col vaporetto, perché a Venezia non ci sono auto.",
 tk:"Biglietti: i transfer ACTV (Aerobus 5, bus 15 e 45) costano 10 € a corsa o 18 € andata e ritorno (veneziaunica.it); l'ATVO Express ha una tariffa simile, controlla su atvo.it. L'Alilaguna costa da 18 €. Il biglietto urbano ACTV da 9,50 € non vale sulle linee dell'aeroporto.",
 gm:"Aeroporto di Venezia Marco Polo",
 tips:["Il treno non arriva all'aeroporto: per la stazione di Venezia Santa Lucia si prende il bus fino a Mestre (20–25 minuti) e poi un regionale (10 minuti).","Il taxi per Piazzale Roma costa circa 40 € (tariffa da confermare prima di partire); il water taxi parte da circa 100 €.","Gli orari dei bus ATVO vanno dalle 5:20 alle 1:20 dall'aeroporto (guide, da confermare): se atterri a notte fonda, controlla l'ultimo bus."]},
TSF:{n:"Treviso Canova (TSF)",s:"Treviso Antonio Canova",url:"https://www.trevisoairport.it/",live:"Treviso",inMin:100,buf:130,pos:[45.6484,12.1944],sd:"Treviso · bus ATVO",rt:"Dall'aeroporto: bus ATVO diretto fino a Piazzale Roma, poi vaporetto o a piedi.",
 arr:"L'aeroporto di Treviso è a una trentina di chilometri da Venezia, in un'altra città. All'uscita dell'area arrivi trovi la fermata dell'ATVO (uscita D, seconda corsia): il bus corre fino a Piazzale Roma in 50–70 minuti, con una sosta a Mestre dopo circa 40. Parte in coincidenza con gli arrivi dei voli low cost, almeno una volta all'ora. In alternativa i bus Barzi/Flibco arrivano alla stazione di Mestre in circa 40 minuti e costano un po' meno. Da Mestre si prosegue in treno (10 minuti) fino a Venezia Santa Lucia o col tram T1 fino a Piazzale Roma.",
 tk:"Biglietto ATVO: 14 € a tratta (da veneziaunica.it; con andata e ritorno si spende circa 24 €), gratis fino a 6 anni. Si compra al banco dell'ATVO nel terminal, alla macchinetta vicino ai bus o su atvo.it. Il biglietto va timbrato prima di salire.",
 gm:"Aeroporto di Treviso Antonio Canova",
 tips:["Più economico: i bus Barzi/Flibco per la stazione di Mestre costano circa 10–12 € e impiegano circa 40 minuti; poi si prende il treno per Venezia.","Il taxi a tariffa fissa costa 76 € fino a Piazzale Roma e 64 € fino a Mestre (fino a 4 persone).","Il ritorno all'aeroporto richiede più tempo del solito: parti da Piazzale Roma almeno tre ore prima del volo."]}
};
/* linee (tracciati indicativi) */
var SEG={
v1:{c:"#1f6f8b",n:"Vaporetto linea 1 (Canal Grande)",p:[[45.4383,12.3178,"Piazzale Roma",2],[45.4412,12.3213,"Ferrovia",2],[45.4440,12.3262],[45.4412,12.3335],[45.4387,12.3359,"Rialto",2],[45.4367,12.3315],[45.4322,12.3283,"Accademia",2],[45.4308,12.3350,"Salute",2],[45.4331,12.3378,"San Marco",2],[45.4337,12.3436,"San Zaccaria",2]]},
vce:{c:"#c9a24a",n:"Bus per Marco Polo",p:[[45.5053,12.3519,"Aeroporto Marco Polo",2],[45.4980,12.3000],[45.4800,12.2600],[45.4560,12.2700],[45.4430,12.3060],[45.4383,12.3178,"Piazzale Roma",2]]},
tsf:{c:"#8c2f39",n:"Bus ATVO da Treviso",p:[[45.6484,12.1944,"Aeroporto di Treviso",2],[45.5700,12.2200],[45.5000,12.2300],[45.4700,12.2500],[45.4430,12.3060],[45.4383,12.3178,"Piazzale Roma",2]]}
};
var START=[45.4383,12.3178];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
sanmarco:{t:"Piazza San Marco e Basilica",z:"A",p:1,min:60,id:90,max:130,pos:[45.4345,12.3396],q:"Basilica di San Marco, Venezia",cls:"",sun:1,tk:[3,"Basilica di San Marco (circa 3 €, con prenotazione)",1,1],
 win:function(wd){return wd===6?[14*60,16*60]:[9*60+30,16*60+30]},
 d:"La piazza più famosa di Venezia, con la Basilica dai mosaici dorati e dalle cinque cupole, il Campanile alto 98 metri e le Procuratie ai lati. Dentro la basilica ci sono i mosaici sul fondo oro, il pavimento a onde e la Pala d'Oro.",
 m:"Piazza gratis. Per la basilica servono spalle e ginocchia coperte e niente zaini grandi (c'è un deposito vicino). Ingresso a circa 3 € con prenotazione dell'orario su basilicasanmarco.it; Pala d'Oro e Tesoro hanno un biglietto a parte. Di solito aperta lunedì–sabato dalle 9:30 alle 17, domenica e festivi solo dal pomeriggio (orari da confermare). Il Campanile costa circa 10 € (non verificato)."},
palazzoducale:{t:"Palazzo Ducale e Ponte dei Sospiri",z:"A",p:1,min:90,id:120,max:170,pos:[45.4337,12.3403],q:"Palazzo Ducale, Venezia",cls:"",sun:1,tk:[30,"Palazzo Ducale e Musei di Piazza San Marco (circa 30 €)",1,1],
 win:function(wd,d){var o=d.slice(5);return o>="04-01"&&o<="10-31"?[9*60,18*60]:[9*60,17*60]},
 d:"Il palazzo dei dogi, simbolo del potere della Repubblica di Venezia: il cortile, la Scala dei Giganti, le sale del Maggior Consiglio con il «Paradiso» del Tintoretto e il Ponte dei Sospiri, che portava alle prigioni.",
 m:"Biglietto cumulativo dei Musei di Piazza San Marco (Palazzo Ducale, Museo Correr, Museo Archeologico e Biblioteca Marciana) a circa 30 € su palazzoducale.visitmuve.it, valido più giorni. Aperto di solito tutti i giorni 9–19 da aprile a ottobre, 9–18 da novembre a marzo (ultimo ingresso un'ora prima); chiuso il 25 dicembre e il 1° gennaio. Orari e prezzo da confermare."},
rialto:{t:"Ponte di Rialto e mercato",z:"B",p:2,min:35,id:50,max:90,pos:[45.4380,12.3359],q:"Ponte di Rialto, Venezia",cls:"walk",sun:1,
 d:"Il ponte di pietra più antico sul Canal Grande, del 1591, fiancheggiato da negozi, e subito dopo il mercato di Rialto con i banchi di frutta, verdura e pesce e i bacari dove si assaggiano i cicchetti.",
 m:"Il ponte si attraversa gratis. Il mercato di frutta e verdura è aperto dal lunedì al sabato la mattina; la pescheria (nel palazzo gotico) da martedì a sabato la mattina, chiusa il lunedì e la domenica (da confermare). Il ponte è pieno di gente: attenzione ai borseggiatori."},
accademia:{t:"Gallerie dell'Accademia",z:"C",p:3,min:90,id:110,max:150,pos:[45.4311,12.3281],q:"Gallerie dell'Accademia, Venezia",cls:"",tk:[15,"Gallerie dell'Accademia (circa 15 €)",1,1],
 win:function(wd){return wd===0?[8*60+15,13*60]:[8*60+15,18*60+15]},
 d:"Il museo della pittura veneziana, in un'antica scuola con le opere di Tiziano, Tintoretto, Veronese, Giorgione e Canaletto. Si vedono anche la «Tempesta» di Giorgione e il grande ciclo di Carpaccio sulle storie di Sant'Orsola.",
 m:"Biglietto a circa 15 €, meglio con orario prenotato su gallerieaccademia.gov.it. Orari di solito: martedì–domenica 8:15–19:15, lunedì 8:15–14 (da confermare). Si entra con ingressi contingentati."},
salute:{t:"Basilica della Salute e Punta della Dogana",z:"C",p:3,min:30,id:45,max:70,pos:[45.4307,12.3347],q:"Basilica di Santa Maria della Salute, Venezia",cls:"",sun:1,
 win:function(){return[9*60+30,17*60]},
 d:"La grande chiesa barocca a cupola costruita dopo la peste del 1630, all'ingresso del Canal Grande. Dentro ci sono opere di Tiziano e Tintoretto. Dalla punta della Dogana, qui accanto, si vede San Marco dall'altra parte del bacino.",
 m:"Ingresso gratis alla chiesa (spalle e ginocchia coperte), di solito aperta dalle 9:30 alle 12 e dalle 15 alle 17:30, con pausa a mezzogiorno (da confermare). La sacrestia ha un biglietto a parte. Il 21 novembre c'è la festa della Madonna della Salute, con un ponte di barche sul Canal Grande."},
peggy:{t:"Collezione Peggy Guggenheim",z:"C",p:4,min:90,id:100,max:130,pos:[45.4308,12.3314],q:"Collezione Peggy Guggenheim, Venezia",cls:"",cl:[1],tk:[16,"Collezione Peggy Guggenheim (circa 16 €)",1,1],
 win:function(){return[10*60,17*60+30]},
 d:"La raccolta d'arte moderna di Peggy Guggenheim nel palazzo che fu la sua casa sul Canal Grande: Picasso, Pollock, Kandinsky, Magritte e Dalí, e un giardino con sculture.",
 m:"Biglietto a circa 16 €, meglio online su guggenheim-venice.it. Aperta dalle 10 alle 18, chiusa il martedì e il 25 dicembre (da confermare). Non si fotografa in alcune sale."},
frari:{t:"Basilica dei Frari",z:"B",p:4,min:40,id:55,max:80,pos:[45.4366,12.3265],q:"Basilica di Santa Maria Gloriosa dei Frari, Venezia",cls:"",tk:[5,"Basilica dei Frari (circa 5 €)",1],
 win:function(wd){return wd===6?[13*60,17*60+30]:[9*60,17*60+30]},
 d:"La grande chiesa gotica in mattoni dei frati francescani, con l'«Assunta» di Tiziano sull'altare maggiore, le tombe di Tiziano e di Canova e una Madonna di Giovanni Bellini nella sagrestia.",
 m:"Biglietto a circa 5 € (da confermare). Aperta lunedì–sabato 9–18, domenica dalle 13 (orari da confermare). Vicina c'è la Scuola Grande di San Rocco, con i grandi cicli del Tintoretto, a pagamento."},
ghetto:{t:"Ghetto ebraico e Cannaregio",z:"D",p:5,min:60,id:80,max:110,pos:[45.4453,12.3277],q:"Campo del Ghetto Nuovo, Venezia",cls:"walk",
 d:"Il primo ghetto del mondo, istituito nel 1516: le case altissime sul Campo del Ghetto Nuovo, le sinagoghe e il Museo Ebraico. Da lì si passa lungo i canali di Cannaregio, un quartiere dove vivono ancora tanti veneziani.",
 m:"La piazza e le calli si girano gratis. Il Museo Ebraico e le visite guidate alle sinagoghe sono a pagamento e chiusi il sabato e nelle festività ebraiche. A Cannaregio la Fondamenta degli Ormesini e la Fondamenta della Misericordia sono piene di bacari."},
castello:{t:"Riva degli Schiavoni e Castello",z:"A",p:5,min:45,id:70,max:100,pos:[45.4337,12.3465],q:"Riva degli Schiavoni, Venezia",cls:"walk",sun:1,
 d:"La passeggiata sul bacino di San Marco, verso est, fino all'Arsenale e ai Giardini: il quartiere di Castello è più tranquillo del centro e ha calli, giardini e i cantieri navali dell'antica Repubblica.",
 m:"Gratis. Fino al 22 novembre 2026 ai Giardini e all'Arsenale c'è la Biennale d'Arte (biglietto a parte, chiusa di solito il lunedì: controlla su labiennale.org)."},
zattere:{t:"Zattere e Squero di San Trovaso",z:"C",p:6,min:45,id:60,max:90,pos:[45.4281,12.3275],q:"Zattere, Venezia",cls:"walk",multi:1,sun:1,
 d:"La lunga passeggiata sul bordo di Dorsoduro, al sole, davanti alla Giudecca. Vicino, lo Squero di San Trovaso, uno dei pochi cantieri dove si costruiscono e si riparano ancora le gondole.",
 m:"Gratis. Lo squero si vede dalla fondamenta di fronte (non si entra). Al tramonto è un buon posto per sedersi e guardare le barche."},
isole:{t:"Murano, Burano e Torcello",z:"G",p:3,min:240,id:300,max:360,pos:[45.4853,12.4167],q:"Burano, Venezia",cls:"",multi:1,
 win:function(){return[9*60,16*60]},
 d:"Tre isole nella laguna nord: Murano, con le fornaci del vetro, Burano, con le case dipinte di rosso, giallo e azzurro e i merletti, e Torcello, con la cattedrale bizantina del VII secolo e i mosaici più antichi della laguna.",
 m:"Si raggiungono col vaporetto dalle Fondamente Nove (linea 12 per Murano, Burano e Torcello; Burano dista circa 40 minuti, da confermare). Il contributo d'accesso non si paga per le isole minori. Alcuni laboratori del vetro a Murano chiudono nel pomeriggio."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
LEGS["start>sanmarco"]={min:45,mode:"metro",txt:"Vaporetto linea 1 da Piazzale Roma, con tutte le fermate lungo il Canal Grande, fino a San Marco Vallaresso: circa 45 minuti. È il giro più bello di Venezia. A piedi servono 45 minuti.",g:[["v1","Piazzale Roma","San Marco"]]};
LEGS["sanmarco>start"]={min:45,mode:"metro",txt:"Vaporetto linea 1 da San Marco fino a Piazzale Roma (circa 45 minuti), oppure a piedi per circa 45.",g:[["v1","San Marco","Piazzale Roma"]]};
LEGS["start>palazzoducale"]={min:48,mode:"metro",txt:"Vaporetto linea 1 da Piazzale Roma fino a San Zaccaria (circa 45 minuti), poi 3 minuti a piedi fino al Palazzo Ducale.",g:[["v1","Piazzale Roma","San Zaccaria"],W([[45.4337,12.3436],[45.4337,12.3403]])]};
LEGS["palazzoducale>start"]={min:48,mode:"metro",txt:"A San Zaccaria (3 minuti a piedi), poi vaporetto linea 1 fino a Piazzale Roma: circa 48 minuti.",g:[W([[45.4337,12.3403],[45.4337,12.3436]]),["v1","San Zaccaria","Piazzale Roma"]]};
LEGS["start>rialto"]={min:22,mode:"metro",txt:"Vaporetto linea 1 da Piazzale Roma fino alla fermata Rialto, circa 22 minuti. A piedi sono circa 25 minuti dietro alle indicazioni per Rialto.",g:[["v1","Piazzale Roma","Rialto"]]};
LEGS["rialto>start"]={min:22,mode:"metro",txt:"Vaporetto linea 1 da Rialto a Piazzale Roma, circa 22 minuti, oppure a piedi per circa 25.",g:[["v1","Rialto","Piazzale Roma"]]};
LEGS["start>accademia"]={min:28,mode:"metro",txt:"Vaporetto linea 1 da Piazzale Roma fino a Accademia, circa 28 minuti. A piedi sono circa 25 minuti, passando per Dorsoduro.",g:[["v1","Piazzale Roma","Accademia"]]};
LEGS["accademia>start"]={min:28,mode:"metro",txt:"Vaporetto linea 1 da Accademia a Piazzale Roma, circa 28 minuti.",g:[["v1","Accademia","Piazzale Roma"]]};
LEGS["start>peggy"]={min:33,mode:"metro",txt:"Vaporetto linea 1 da Piazzale Roma fino a Accademia (28 minuti), poi 4 minuti a piedi fino al museo.",g:[["v1","Piazzale Roma","Accademia"],W([[45.4322,12.3283],[45.4308,12.3314]])]};
LEGS["peggy>start"]={min:33,mode:"metro",txt:"A piedi fino alla fermata Accademia (4 minuti), poi vaporetto linea 1 fino a Piazzale Roma.",g:[W([[45.4308,12.3314],[45.4322,12.3283]]),["v1","Accademia","Piazzale Roma"]]};
LEGS["start>salute"]={min:35,mode:"metro",txt:"Vaporetto linea 1 da Piazzale Roma fino alla fermata Salute, circa 35 minuti.",g:[["v1","Piazzale Roma","Salute"]]};
LEGS["salute>start"]={min:35,mode:"metro",txt:"Vaporetto linea 1 dalla Salute a Piazzale Roma, circa 35 minuti.",g:[["v1","Salute","Piazzale Roma"]]};
LEGS["start>frari"]={min:15,mode:"walk",txt:"A piedi da Piazzale Roma per Santa Croce e San Rocco fino ai Frari, circa 15 minuti: segui le indicazioni «Ferrovia» e poi «Frari».",g:[W([[45.4383,12.3178],[45.4390,12.3210],[45.4375,12.3250],[45.4366,12.3265]])]};
LEGS["frari>start"]={min:15,mode:"walk",txt:"A piedi dai Frari fino a Piazzale Roma per San Rocco e Santa Croce, circa 15 minuti.",g:[W([[45.4366,12.3265],[45.4375,12.3250],[45.4390,12.3210],[45.4383,12.3178]])]};
LEGS["start>ghetto"]={min:20,mode:"walk",txt:"A piedi da Piazzale Roma alla stazione di Santa Lucia e per la Lista di Spagna fino al Ghetto, circa 20 minuti.",g:[W([[45.4383,12.3178],[45.4410,12.3208],[45.4430,12.3240],[45.4453,12.3277]])]};
LEGS["ghetto>start"]={min:20,mode:"walk",txt:"A piedi dal Ghetto per la Lista di Spagna fino alla stazione e a Piazzale Roma, circa 20 minuti.",g:[W([[45.4453,12.3277],[45.4430,12.3240],[45.4410,12.3208],[45.4383,12.3178]])]};
LEGS["start>isole"]={min:75,mode:"metro",txt:"A piedi o in vaporetto fino alle Fondamente Nove (circa 30 minuti, Google Maps indica la linea migliore), poi vaporetto linea 12 fino a Burano (circa 40 minuti): in tutto circa 75 minuti.",g:[{w:[[45.4383,12.3178],[45.4452,12.3414],[45.4853,12.4167]],dash:1}]};
LEGS["isole>start"]={min:75,mode:"metro",txt:"Vaporetto linea 12 da Burano alle Fondamente Nove (circa 40 minuti), poi circa 30 minuti a piedi o in vaporetto fino a Piazzale Roma.",g:[{w:[[45.4853,12.4167],[45.4452,12.3414],[45.4383,12.3178]],dash:1}]};
P2("sanmarco","palazzoducale",3,"walk","A piedi per la Piazzetta, tra le due colonne, fino al Palazzo Ducale, circa 3 minuti.","A piedi per la Piazzetta fino alla Basilica, circa 3 minuti.",{f:[W([[45.4345,12.3396],[45.4338,12.3400],[45.4337,12.3403]])],r:[W([[45.4337,12.3403],[45.4338,12.3400],[45.4345,12.3396]])]});
P2("sanmarco","rialto",12,"walk","A piedi per le Mercerie, la strada dei negozi che porta da San Marco a Rialto, circa 12 minuti.","A piedi per le Mercerie fino a Piazza San Marco, circa 12 minuti.",{f:[W([[45.4345,12.3396],[45.4358,12.3385],[45.4370,12.3372],[45.4380,12.3359]])],r:[W([[45.4380,12.3359],[45.4370,12.3372],[45.4358,12.3385],[45.4345,12.3396]])]});
P2("palazzoducale","rialto",14,"walk","A piedi per la Riva degli Schiavoni... segui le frecce gialle «Rialto» attraverso le Mercerie, circa 14 minuti.","A piedi per le Mercerie fino al Palazzo Ducale, circa 14 minuti.",{f:[W([[45.4337,12.3403],[45.4358,12.3385],[45.4380,12.3359]])],r:[W([[45.4380,12.3359],[45.4358,12.3385],[45.4337,12.3403]])]});
P2("rialto","frari",13,"walk","A piedi per Campo San Polo e le calli del sestiere di San Polo fino ai Frari, circa 13 minuti.","A piedi per le calli di San Polo fino a Rialto, circa 13 minuti.",{f:[W([[45.4380,12.3359],[45.4385,12.3320],[45.4377,12.3290],[45.4366,12.3265]])],r:[W([[45.4366,12.3265],[45.4377,12.3290],[45.4385,12.3320],[45.4380,12.3359]])]});
P2("frari","accademia",17,"walk","A piedi per Campo Santa Margherita e Rio Terà Canal fino al Ponte dell'Accademia, circa 17 minuti.","A piedi per Campo Santa Margherita fino ai Frari, circa 17 minuti.",{f:[W([[45.4366,12.3265],[45.4345,12.3255],[45.4325,12.3270],[45.4311,12.3281]])],r:[W([[45.4311,12.3281],[45.4325,12.3270],[45.4345,12.3255],[45.4366,12.3265]])]});
P2("accademia","peggy",4,"walk","A piedi per la Fondamenta Venier fino al museo, circa 4 minuti.","A piedi fino alle Gallerie dell'Accademia, circa 4 minuti.",{f:[W([[45.4311,12.3281],[45.4308,12.3314]])],r:[W([[45.4308,12.3314],[45.4311,12.3281]])]});
P2("accademia","salute",9,"walk","A piedi lungo il Canal Grande fino alla Salute, circa 9 minuti.","A piedi lungo il Canal Grande fino all'Accademia, circa 9 minuti.",{f:[W([[45.4311,12.3281],[45.4307,12.3315],[45.4307,12.3347]])],r:[W([[45.4307,12.3347],[45.4307,12.3315],[45.4311,12.3281]])]});
P2("peggy","salute",7,"walk","A piedi per le calli di Dorsoduro fino alla Salute, circa 7 minuti.","A piedi fino alla Collezione Peggy Guggenheim, circa 7 minuti.",{f:[W([[45.4308,12.3314],[45.4307,12.3347]])],r:[W([[45.4307,12.3347],[45.4308,12.3314]])]});
P2("salute","sanmarco",10,"metro","Vaporetto linea 1 o 2 dalla Salute a San Marco Vallaresso (pochi minuti di viaggio, un po' di attesa), circa 10 minuti.","Vaporetto linea 1 o 2 da San Marco Vallaresso alla Salute, circa 10 minuti.",{f:[W([[45.4307,12.3347],[45.4331,12.3378],[45.4345,12.3396]])],r:[W([[45.4345,12.3396],[45.4331,12.3378],[45.4307,12.3347]])]});
P2("rialto","accademia",20,"walk","A piedi per Campo Sant'Angelo e Campo Santo Stefano fino al Ponte dell'Accademia, circa 20 minuti.","A piedi per Campo Santo Stefano e Campo Sant'Angelo fino a Rialto, circa 20 minuti.",{f:[W([[45.4380,12.3359],[45.4367,12.3315],[45.4335,12.3300],[45.4311,12.3281]])],r:[W([[45.4311,12.3281],[45.4335,12.3300],[45.4367,12.3315],[45.4380,12.3359]])]});
P2("sanmarco","accademia",15,"walk","A piedi per Calle Larga XXII Marzo e Campo Santo Stefano fino al Ponte dell'Accademia, circa 15 minuti.","A piedi per Campo Santo Stefano fino a Piazza San Marco, circa 15 minuti.",{f:[W([[45.4345,12.3396],[45.4337,12.3350],[45.4325,12.3310],[45.4311,12.3281]])],r:[W([[45.4311,12.3281],[45.4325,12.3310],[45.4337,12.3350],[45.4345,12.3396]])]});
P2("sanmarco","castello",12,"walk","A piedi lungo la Riva degli Schiavoni, con il bacino a destra, circa 12 minuti.","A piedi lungo la Riva degli Schiavoni fino a San Marco, circa 12 minuti.",{f:[W([[45.4345,12.3396],[45.4337,12.3436],[45.4337,12.3465]])],r:[W([[45.4337,12.3465],[45.4337,12.3436],[45.4345,12.3396]])]});
P2("palazzoducale","castello",9,"walk","A piedi lungo la Riva degli Schiavoni, circa 9 minuti.","A piedi lungo la Riva degli Schiavoni fino al Palazzo Ducale, circa 9 minuti.",{f:[W([[45.4337,12.3403],[45.4337,12.3436],[45.4337,12.3465]])],r:[W([[45.4337,12.3465],[45.4337,12.3436],[45.4337,12.3403]])]});
P2("castello","rialto",20,"walk","A piedi per Campo Santa Maria Formosa e le calli fino a Rialto, circa 20 minuti.","A piedi per Santa Maria Formosa fino a Castello, circa 20 minuti.",{f:[W([[45.4337,12.3465],[45.4370,12.3430],[45.4375,12.3390],[45.4380,12.3359]])],r:[W([[45.4380,12.3359],[45.4375,12.3390],[45.4370,12.3430],[45.4337,12.3465]])]});
P2("rialto","ghetto",20,"walk","A piedi lungo la Strada Nova, la via più larga di Venezia, e poi per Cannaregio fino al Ghetto, circa 20 minuti.","A piedi per Cannaregio e la Strada Nova fino a Rialto, circa 20 minuti.",{f:[W([[45.4380,12.3359],[45.4415,12.3335],[45.4440,12.3300],[45.4453,12.3277]])],r:[W([[45.4453,12.3277],[45.4440,12.3300],[45.4415,12.3335],[45.4380,12.3359]])]});
/* ritorno in aeroporto (le altre tappe passano da Piazzale Roma) */
var RET={
VCE:{
 A:{min:45,txt:"Bus ATVO o ACTV (linea 5) da Piazzale Roma all'aeroporto Marco Polo (20–30 minuti): il bus parte dal lato nord della piazza, davanti alle biglietterie. L'ultimo bus dal centro è poco dopo le 23 (guide, da confermare). In alternativa l'Alilaguna parte dalle fermate lungo il Canal Grande e dura più di un'ora.",g:[["vce","Piazzale Roma","Aeroporto Marco Polo"]]}},
TSF:{
 A:{min:85,txt:"Bus ATVO da Piazzale Roma all'aeroporto di Treviso (50–70 minuti): parte dal lato nord della piazza, vicino alla biglietteria dell'ATVO. Il bus è in coincidenza con i voli low cost, ma controlla l'orario: arriva in aeroporto con almeno due ore e mezza di anticipo.",g:[["tsf","Piazzale Roma","Aeroporto di Treviso"]]}}
};
var ARR={
VCE:[["vce","Aeroporto Marco Polo","Piazzale Roma"]],
TSF:[["tsf","Aeroporto di Treviso","Piazzale Roma"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare. r = valutazione non verificata */
var V={
domori:{n:"Cantina Do Mori",a:"Calle Do Mori 429, San Polo",z:"B",r:"n.d.",pos:[45.4386,12.3345],h:["08:30-20:30","08:30-20:30","08:30-20:30","08:30-20:30","08:30-20:30","08:30-20:00",""],
 d:"Il bacaro più antico di Venezia (dal 1462), a due passi da Rialto: banco di cicchetti (polpette, baccalà, tramezzini) e vini al calice. Si mangia in piedi, a bassa voce, con i pentolini di rame appesi sopra la testa. Chiuso la domenica.",pr:"Un cicchetto costa circa 2–3 €, un'ombra di vino circa 2–3 €: con quattro cicchetti e un calice si sta sui 12–15 € (da guide, listino non visto)."},
allarco:{n:"All'Arco",a:"Calle dell'Occhialer 436, San Polo",z:"B",r:"n.d.",pos:[45.4391,12.3357],h:["08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00",""],
 d:"Piccolo bacaro vicino al mercato di Rialto: cicchetti con pesce fresco, crostini e panini, serviti da chi lavora al mercato. Aperto la mattina e a pranzo, chiuso la domenica.",pr:"Un cicchetto 2–4 €; un pranzo di sei pezzi e un'ombra sui 15 € (da guide, listino non visto)."},
madonna:{n:"Trattoria alla Madonna",a:"Calle della Madonna 594, San Polo",z:"B",r:"n.d.",pos:[45.4385,12.3340],h:["12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00"],
 d:"Una trattoria storica vicino a Rialto, grande e rumorosa, con cucina veneziana: sarde in saor, spaghetti alle vongole, fritto di pesce. Chiusa il mercoledì.",pr:"Un primo costa circa 14–18 €; un pasto completo sui 30–35 € (da guide, listino non visto)."},
tonolo:{n:"Pasticceria Tonolo",a:"Calle San Pantalon 3764, Dorsoduro",z:"C",r:"n.d.",pos:[45.4344,12.3238],h:["","07:00-19:30","07:00-19:30","07:00-19:30","07:00-19:30","07:00-19:30","07:30-13:30"],
 d:"La pasticceria di quartiere dei veneziani, aperta dal 1886 vicino ai Frari: brioche, krapfen, fritole e dolci tradizionali. Chiusa il lunedì.",pr:"Colazione con cappuccino e brioche sui 4–5 € (da guide, listino non visto)."},
squero:{n:"Osteria Al Squero",a:"Fondamenta Nani 943, Dorsoduro",z:"C",r:"n.d.",pos:[45.4274,12.3239],h:D7("08:00-20:30"),
 d:"Piccolo bacaro davanti allo Squero di San Trovaso: si prendono cicchetti e un'ombra e si mangia sulla fondamenta guardando i gondolieri al lavoro.",pr:"Cicchetti sui 2–3 € l'uno, vino al calice sui 2–4 € (da guide, listino non visto)."},
ildoge:{n:"Gelateria Il Doge",a:"Campo Santa Margherita 3058, Dorsoduro",z:"C",r:"n.d.",pos:[45.4337,12.3203],h:D7("10:00-23:00"),
 d:"Gelateria artigianale sul campo più vivace di Dorsoduro, frequentato da studenti: gusti di stagione, frutta e pistacchio, da mangiare sulle panchine del campo.",pr:"Un cono o una coppetta costa circa 2,50–4 € (da guide, listino non visto)."},
timon:{n:"Al Timon",a:"Fondamenta degli Ormesini 2754, Cannaregio",z:"D",r:"n.d.",pos:[45.4458,12.3304],h:D7("11:00-00:00"),
 d:"Bacaro di Cannaregio sul canale: si ordinano cicchetti, tagli di salumi e vino al calice e si mangia seduti sulla barca ormeggiata o sulla fondamenta. Aperto anche la sera.",pr:"Un cicchetto 2–3 €, un tagliere circa 12–15 €: una cena leggera sta sui 15–20 € (da guide, listino non visto)."},
dalmas:{n:"Pasticceria Dal Mas",a:"Lista di Spagna 150, Cannaregio",z:"D",r:"n.d.",pos:[45.4416,12.3197],h:D7("07:00-20:00"),
 d:"Pasticceria a due passi dalla stazione: brioche, torte e pasticcini, caffè al banco. Comoda per una colazione veloce all'arrivo o prima del treno.",pr:"Colazione sui 4–6 € (da guide, listino non visto)."},
rivetta:{n:"Trattoria Alla Rivetta",a:"Ponte San Provolo 4625, Castello",z:"A",r:"n.d.",pos:[45.4343,12.3425],h:["","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00"],
 d:"Trattoria semplice e popolare a due minuti da San Marco, frequentata anche da veneziani: pasta, pesce fritto e piatti del giorno a prezzi più onesti del centro. Chiusa il lunedì.",pr:"Un primo 10–14 €; un pasto sui 25–30 € (da guide, listino non visto)."},
rosasalva:{n:"Pasticceria Rosa Salva",a:"Campo San Giovanni e Paolo 6779, Castello",z:"A",r:"n.d.",pos:[45.4392,12.3416],h:D7("07:30-19:30"),
 d:"Storica pasticceria veneziana (dal 1879) davanti alla basilica dei Santi Giovanni e Paolo: brioche, krapfen, dolci tradizionali e gelato, anche da asporto.",pr:"Colazione sui 5–7 € (da guide, listino non visto)."},
palmisano:{n:"Pasticceria Palmisano",a:"Via Galuppi, Burano",z:"G",r:"n.d.",pos:[45.4849,12.4170],h:D7("07:30-18:30"),
 d:"Forno-pasticceria di Burano che vende i bussolà, i biscotti a ciambella dell'isola, e dolci di forno da mangiare passeggiando tra le case colorate.",pr:"Una busta di biscotti sui 5–8 € (da guide, listino non visto)."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["rosasalva","rivetta"],B:["tonolo","domori"],C:["tonolo","ildoge"],D:["dalmas","timon"],F:["dalmas","tonolo"],G:["palmisano"]},
pra:{A:["rivetta","rosasalva"],B:["domori","allarco","madonna"],C:["squero","ildoge"],D:["timon","dalmas"],F:["timon","squero"],G:["palmisano"]},
cen:{A:["rivetta","madonna"],B:["madonna","domori"],C:["squero","madonna"],D:["timon","madonna"],F:["timon","madonna"],G:["palmisano"]},
snk:{A:["rosasalva","rivetta"],B:["domori","allarco"],C:["ildoge","squero"],D:["timon","dalmas"],F:["dalmas","timon"],G:["palmisano"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"marco",t:"San Marco, Palazzo Ducale e Castello",acts:["sanmarco","palazzoducale","castello"],need:300,core:1},
{id:"canale",t:"Rialto, Frari e Cannaregio",acts:["rialto","frari","ghetto"],need:230,core:1},
{id:"dorsoduro",t:"Dorsoduro: Accademia, Peggy Guggenheim, Salute e Zattere",acts:["accademia","peggy","salute","zattere"],need:310,core:1,cl:[1]},
{id:"isole",t:"Murano, Burano e Torcello",acts:["isole"],need:320}
];
var ORDER=["zattere","frari","accademia","peggy","salute","sanmarco","palazzoducale","castello","rialto","ghetto","isole"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["marco","San Marco / Castello",[45.4345,12.3380],"A"],
["rialto","Rialto / San Polo",[45.4385,12.3340],"B"],
["dorso","Dorsoduro",[45.4310,12.3260],"C"],
["canna","Cannaregio",[45.4450,12.3240],"D"],
["croce","Santa Croce / Piazzale Roma",[45.4395,12.3195],"F"],
["mestre","Mestre (terraferma)",[45.4890,12.2450],""],
["altro","Altra zona (scrivi l'indirizzo)",[45.4371,12.3326],""]
];
/* imposta di soggiorno di Venezia: importi indicativi a persona e notte, cambiano con categoria e stagione; massimo 5 notti. DA CONFERMARE su comune.venezia.it */
var TAX=[["h5","Hotel 4–5 stelle",5],["h3","Hotel fino a 3 stelle, B&B o appartamento",4],["host","Ostello o struttura economica",2],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Cappuccino e brioche","si paga alla cassa e si porta lo scontrino al banco: in piedi costa meno."],["Fritole o krapfen","i dolci fritti veneziani, di carnevale e non solo."],["Bussolà","il biscotto a ciambella di Burano, buono con il caffè."]],
pra:[["Cicchetti","gli stuzzichini del bacaro: polpette, baccalà mantecato, crostini, sarde in saor."],["Un'ombra di vino","il bicchierino di vino che si beve in piedi al bancone."],["Tramezzini","i panini triangolari morbidi, con ripieni di tonno, uova o prosciutto."]],
cen:[["Sarde in saor","sarde fritte con cipolle, uvetta e pinoli, il piatto veneziano per eccellenza."],["Bigoli in salsa","spaghetti integrali con cipolla e acciughe."],["Fegato alla veneziana","fegato di vitello con cipolle, con la polenta."],["Baccalà mantecato","merluzzo montato a crema, da spalmare su crostini di polenta."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Piazza San Marco e la Basilica","Foto","La facciata con le cinque cupole e i mosaici d'oro dal centro della piazza: al mattino presto è quasi vuota.",[45.4340,12.3380],"Piazza San Marco, Venezia","sanmarco"],
["📷","Le due colonne della Piazzetta","Foto","Le colonne con il leone di San Marco e San Teodoro, con il bacino e San Giorgio Maggiore dietro.",[45.4335,12.3410],"Colonne di San Marco e San Teodoro, Venezia","palazzoducale"],
["📷","Il Ponte dei Sospiri","Foto","Il ponte bianco visto dal Ponte della Paglia, lungo la Riva degli Schiavoni.",[45.4338,12.3416],"Ponte della Paglia, Venezia","palazzoducale"],
["🤳","Ponte di Rialto","Selfie","Dall'alto del ponte con il Canal Grande dietro, meglio la mattina presto, quando c'è poca gente.",[45.4380,12.3359],"Ponte di Rialto, Venezia","rialto"],
["📷","Canal Grande da Rialto","Foto","La vista lungo il canale, con i palazzi e le barche: un classico da non perdere al tramonto.",[45.4385,12.3355],"Canal Grande, Rialto, Venezia","rialto"],
["📷","Il Ponte dell'Accademia","Foto","Il Canal Grande con la Salute in fondo, dal ponte di legno: la vista più fotografata di Venezia.",[45.4316,12.3282],"Ponte dell'Accademia, Venezia","accademia"],
["📷","La Salute da Punta della Dogana","Foto","La basilica vista dalla punta, con il bacino di San Marco davanti.",[45.4309,12.3366],"Punta della Dogana, Venezia","salute"],
["🤳","Lo Squero di San Trovaso","Selfie","Le gondole in costruzione sul canale: scatta dalla fondamenta di fronte.",[45.4287,12.3252],"Squero di San Trovaso, Venezia","zattere"],
["📷","Le Zattere al tramonto","Foto","La passeggiata sull'acqua e la Giudecca con le luci della sera.",[45.4275,12.3290],"Zattere, Venezia","zattere"],
["📷","Il Ghetto Nuovo","Foto","Le case altissime sulla piazza, costruite in verticale per mancanza di spazio.",[45.4453,12.3277],"Campo del Ghetto Nuovo, Venezia","ghetto"],
["📷","Ponte delle Guglie","Foto","Il ponte sul Canale di Cannaregio, con i palazzi e le barche dei residenti.",[45.4439,12.3243],"Ponte delle Guglie, Venezia","ghetto"],
["📷","Riva degli Schiavoni","Foto","Il bacino con la Salute e San Giorgio Maggiore, specie al tramonto.",[45.4335,12.3450],"Riva degli Schiavoni, Venezia","castello"],
["📷","Le case colorate di Burano","Foto","Le facciate rosse, gialle, azzurre lungo il canale: chiedi il permesso prima di fotografare chi abita lì.",[45.4850,12.4170],"Burano, Venezia","isole"],
["📷","La torre pendente di Burano","Foto","Il campanile di San Martino, che pende di lato, dietro le case colorate.",[45.4852,12.4167],"Chiesa di San Martino, Burano","isole"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-12-31",t:"Contributo d'accesso: il calendario 2026 è finito",x:"Il contributo d'accesso (5 € se prenoti almeno 4 giorni prima, 10 € dopo, per chi entra nel centro storico di giorno tra le 8:30 e le 16) si è pagato in 60 giorni tra il 3 aprile e il 26 luglio 2026. Nessuna data risulta in calendario per l'autunno 2026; per il 2027 le date non sono ancora note. Controlla cda.ve.it prima di partire."},
{from:"2026-10-13",to:"2026-11-22",t:"Biennale Arte 2026",x:"Fino al 22 novembre ai Giardini e all'Arsenale c'è la Biennale d'Arte (di solito chiusa il lunedì, biglietto a parte). Nei weekend la città e il vaporetto sono più pieni e gli alloggi più cari. Orari e prezzi su labiennale.org."},
{from:"2026-10-13",to:"2027-01-31",t:"Acqua alta in autunno e inverno",x:"Da ottobre a gennaio possono esserci maree alte: il MOSE (le barriere mobili all'ingresso della laguna) si alza quando la marea prevista supera i 110 cm. Se l'acqua entra in città, ci sono passerelle in alcuni percorsi e conviene avere scarpe impermeabili o stivali di gomma monouso (si comprano a pochi euro). Previsioni su comune.venezia.it/maree."},
{from:"2026-11-20",to:"2026-11-22",t:"Festa della Madonna della Salute",x:"Il 21 novembre un ponte di barche attraversa il Canal Grande tra Santa Maria del Giglio e la Salute per la processione: la basilica è piena e il passaggio da una riva all'altra del canale si fa solo su questo ponte."},
{from:"2027-01-30",to:"2027-02-09",t:"Carnevale di Venezia",x:"Il Carnevale cade più o meno tra il 30 gennaio e il 9 febbraio 2027 (date da confermare): la città è piena di maschere, i prezzi degli alloggi salgono e il vaporetto è affollato."}
];
/* clima medio di Venezia (indicativo, massime/minime) */
var CLIM=[[6,0],[8,1],[12,5],[17,9],[22,13],[26,17],[29,19],[29,19],[24,16],[18,11],[12,6],[7,2]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Venezia: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="rialto"&&(WD===0||WD===6))meta+=" Oggi la pescheria di Rialto è chiusa"+(WD===6?" (la domenica anche il mercato di frutta e verdura è chiuso).":".");
if(it.id==="accademia"&&WD===0)meta+=" Oggi è lunedì: le Gallerie chiudono alle 14.";
if(it.id==="sanmarco"&&WD===6)meta+=" Oggi è domenica: la basilica apre di solito solo nel pomeriggio.";
if(it.id==="frari"&&WD===6)meta+=" Oggi è domenica: i Frari aprono alle 13.";
if(it.id==="ghetto"&&WD===5)meta+=" Oggi è sabato: il Museo Ebraico è chiuso.";
if(it.id==="peggy"&&WD===1)meta+=" Oggi è martedì: la Collezione Peggy Guggenheim è chiusa.";
return meta}
function boatLeg(a,b,E){var pa=E.posOf(a),pb=E.posOf(b),d=E.hav(pa,pb),hb=b==="home";
if(d<2.4){var w=Math.round(d*1.5/4.7*60)+3;return{min:w,mode:"walk",txt:"A piedi"+(hb?" fino all'alloggio":"")+", circa "+w+" minuti: a Venezia le calli fanno dei giri, segui Google Maps o le frecce gialle.",g:[{w:[pa,pb]}]}}
if(pa[0]>45.46||pb[0]>45.46){var m=Math.round(15+d*3.2);return{min:m,mode:"metro",txt:"Dal Piazzale Roma a Mestre in treno o col tram T1 (circa 15 minuti), poi a piedi o in vaporetto: in tutto circa "+m+" minuti. Google Maps indica la soluzione migliore.",g:[{w:[pa,pb],dash:1}]}}
var m2=Math.round(18+d*6);return{min:m2,mode:"metro",txt:"In vaporetto"+(hb?" fino all'alloggio":"")+", circa "+m2+" minuti: Google Maps indica la linea migliore (la 1 percorre il Canal Grande con tutte le fermate).",g:[{w:[pa,pb],dash:1}]}}
Object.assign(C,{id:"venezia",n:"Venezia",cn:"Italia",e:"🛶",flag:"🇮🇹",col:["#1f6f8b","#c9a24a","#8c2f39"],k:"venezia venice italia veneto",
TZ:"Europe/Rome",LL:[45.4371,12.3326],CC:"it",QN:"Venezia",BK:"Venice",ARE:/venezia|venice|mestre|\b301\d{2}\b/i,VER:"13 ottobre 2026",
Z0:"F",LANG:"it-IT",LANGN:"veneziano",NOSAY:1,WATER:"osm",TAXDEF:"h3",TAXMAXN:5,RETC:1,LUNCHO:30,DINO:30,
hub:{n:"Piazzale Roma",q:"Piazzale Roma, Venezia"},
SINGLE:{acts:["sanmarco","palazzoducale","rialto","accademia","salute","frari"],ins:[]},
EXCL:[],
DICON:{sanmarco:"⛪",palazzoducale:"🏛️",rialto:"🌉",accademia:"🖼️",salute:"⛪",peggy:"🎨",frari:"🕍",ghetto:"🕎",castello:"⚓",zattere:"🌅",isole:"🏝️"},
ZN:{A:"tra San Marco e Castello",B:"a Rialto e San Polo",C:"a Dorsoduro",D:"a Cannaregio",F:"vicino a Piazzale Roma e alla stazione",G:"a Burano"},
NEAR:{col:"bar o pasticceria",pra:"bacaro o osteria",cen:"bacaro, osteria o trattoria",snk:"bacaro o gelateria"},
SE:{domori:"🥂",allarco:"🥪",madonna:"🍝",tonolo:"🥐",squero:"🥂",ildoge:"🍨",timon:"🥂",dalmas:"🥐",rivetta:"🍝",rosasalva:"🥐",palmisano:"🍪"},
TR:{one:9.5,lbl:"Vaporetti e bus in città (ACTV)",
 air:{VCE:{one:10,n:"Bus per Marco Polo (ACTV, 10 € a corsa)"},TSF:{one:14,n:"Bus ATVO da/per Treviso (14 €)"}},
 passes:[
 {n:"Biglietto 1 giorno",d:1,max:1,p:25,note:"Il biglietto 1 giorno (25 €, «Venezia Daily Pass») vale 24 ore su vaporetti e bus ACTV in città, tram e People Mover."},
 {n:"Biglietto 2 giorni",d:2,p:35,only:function(T){return T.n===2},note:"Il biglietto 2 giorni (35 €) vale su vaporetti e bus ACTV, tram e People Mover."},
 {n:"Biglietto 3 giorni",d:3,p:45,only:function(T){return T.n===3},note:"Il biglietto 3 giorni (45 €) vale su vaporetti e bus ACTV, tram e People Mover. Chi ha tra i 6 e i 29 anni può prendere la Rolling Venice card e il 3 giorni a 33 €."},
 {n:"Biglietto 7 giorni",d:7,p:65,only:function(T){return T.n>=4},note:"Il biglietto 7 giorni (65 €) vale su vaporetti e bus ACTV, tram e People Mover."}],
 note:"Prezzi di veneziaunica.it, ottobre 2026: corsa singola da 9,50 € (vale 75 minuti dalla convalida, anche con cambi), 1 giorno da 25 €, 2 giorni da 35 €, 3 giorni da 45 €, 7 giorni da 65 €. I biglietti urbani non valgono sulle linee per l'aeroporto, che costano a parte. Il biglietto va convalidato alla colonnina prima di salire; senza biglietto valido si rischia una multa."},
FOOD:{co:[4,"Colazione al banco (brioche e cappuccino)"],pr:[13,"Pranzo (cicchetti e un'ombra)"],ce:[22,"Cena (bacaro o trattoria)"],sp:[5,"Gelato e assaggi"]},
T:{ride:"In vaporetto",move:"a piedi o in vaporetto",bags:"«Posso lasciare i bagagli?»",bagsPM:"«Posso lasciare i bagagli fino al pomeriggio?»",bagsAM:"«Posso lasciare i bagagli fino a mezzogiorno?»",
pra:"Un bacaro o una trattoria",praZ:{A:"Intorno a San Marco molti ristoranti hanno il menù turistico e prezzi alti: per mangiare bene allontanati di qualche calle verso Castello.",B:"Intorno a Rialto i bacari sono ottimi a pranzo, ma poco dopo le 14 molti chiudono la cucina."},
freeLong:"Qualche idea: una passeggiata a caso tra le calli, una sosta con un'ombra di vino in un bacaro, il traghetto (la gondola per attraversare il Canal Grande, circa 2 €) o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai due passi per le calli e un gelato.",
remind:"Per la Basilica di San Marco, il Palazzo Ducale e il Guggenheim conviene prenotare l'orario. Il vaporetto si compra prima e si convalida alla colonnina.",
rain1:"Al coperto: la Basilica di San Marco, i Frari, la Salute e le chiese del centro, tutte gratis o a pochi euro.",
rainM:"Al coperto: Palazzo Ducale, Gallerie dell'Accademia, Collezione Peggy Guggenheim, Museo Correr e le chiese.",
water:"Riempite la borraccia alle fontanelle: l'acqua pubblica di Venezia è potabile. Attivate «Acqua» sulla mappa per vedere le più vicine.",
kitchen:"A Venezia si pranza tra le 12 e le 14:30 e si cena dalle 19 alle 21:30: molte cucine chiudono presto. I cicchetti nei bacari si mangiano a tutte le ore, in piedi.",
night:[["🥂","Un'ombra di vino con due cicchetti in un bacaro è il modo veneziano di chiudere la giornata."],["🕙","Le cucine chiudono presto, verso le 22. Il vaporetto di notte (linea N) passa raramente: ricorda l'ultima corsa."],["🥐","Molti bar aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire alle fontanelle)",
fuso:"Stesso fuso orario e stessa lingua: non serve adattatore né cambio",
plug:"Caricabatterie (la spina è quella italiana, nessun adattatore)",
foodNote:"I pasti sono stime per bacari e trattorie di quartiere: colazione e cena leggera con i cicchetti sono intorno ai 15–20 €, una cena seduta in trattoria sui 25–35 €. Venezia costa più del resto d'Italia.",
taxNote:"L'imposta di soggiorno si paga a persona e a notte, per al massimo 5 notti; l'importo cambia con la categoria della struttura e la stagione. Spesso non è compresa nel prezzo e si paga alla struttura. Gli importi qui sono indicativi: da confermare su comune.venezia.it.",
mcrit:"Criteri: bacari, pasticcerie, trattorie e gelaterie di quartiere, niente catene. Colazione e cicchetti restano intorno ai 15–20 € a persona; una cena in trattoria costa di più. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali; le valutazioni su Google non sono indicate: controlla orari e prezzi qualche giorno prima."},
fx:{meta:meta,leg:boatLeg},
AIRTIPS:["Il biglietto del bus per l'aeroporto si controlla al salire: tienilo a portata di mano. Quello urbano da 9,50 € non basta.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietti ACTV per i vaporetti (corsa singola 9,50 € o giornaliero 25 €): alle macchinette o alle biglietterie delle fermate, da convalidare alla colonnina prima di salire"],["ap","Biglietto del bus per l'aeroporto, comprato prima",function(E){return E.cfg.to==="VCE"||E.cfg.to==="TSF"||E.cfg.rt==="VCE"||E.cfg.rt==="TSF"}],["pdu","Biglietto per il Palazzo Ducale (palazzoducale.visitmuve.it)",["palazzoducale"]],["bas","Prenotazione per la Basilica di San Marco (basilicasanmarco.it)",["sanmarco"]],["acc","Biglietto per le Gallerie dell'Accademia (gallerieaccademia.gov.it)",["accademia"]],["peg","Biglietto con orario per la Collezione Peggy Guggenheim (guggenheim-venice.it)",["peggy"]],["cash","Qualche euro in contanti per i bacari e il traghetto"],["cov","Qualcosa per coprire spalle e ginocchia in chiesa",["sanmarco","salute","frari"]],["shoe","Scarpe comode e antiscivolo: a Venezia si cammina molto e le calli possono essere bagnate"]],
NUM:{1:["una persona","U-na per-SO-na"]},
PHR:function(){return [["Andiamo!","Andemo!","an-DE-mo"],["Che bello!","Che bèo!","ke BE-o"],["Ho sete","Go sé","go SE"],["Ho fame","Go fame","go FA-me"],["Andiamo a mangiare","Andemo a magnàr","an-DE-mo a ma-NIAR"],["Un bicchiere di vino, per favore","Un'ombra, par piaser","un OM-bra, par pia-SER"],["Come stai?","Come stastu?","KO-me sta-STU"],["Non c'è problema","No ghe xe problemi","no ge dze pro-BLE-mi"],["Mi piace tantissimo","Me piase tanto","me PIA-ze TAN-to"],["Grazie","Grassie","GRAS-sie"]]},
PHN:"Un po' di veneziano, per divertirsi e farsi capire dai veneziani: la prima riga è l'italiano, sotto c'è la versione veneta. La pronuncia scritta è solo indicativa (la «x» si legge come una «s» sonora). Non serve la voce: sono parole da leggere e usare con un sorriso.",
taxTxt:function(tx){return "Imposta di soggiorno di Venezia (importi indicativi, da confermare su comune.venezia.it): "+(tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+"), per al massimo 5 notti. L'importo cambia con la categoria e la stagione":"non si paga se sei ospite di amici o parenti")+"."},
STAYTIPS:["I vaporetti girano tutta la notte con la linea N, ma con poche corse: controlla gli orari. Dal Piazzale Roma e dalla stazione non ci sono altri mezzi: si va a piedi o in barca."],
ZONES:[
["🚤 Vaporetti, biglietti e orari",["Biglietto singolo ACTV: 9,50 € e vale 75 minuti. Giornaliero 25 €, 2 giorni 35 €, 3 giorni 45 €, 7 giorni 65 € (veneziaunica.it, ottobre 2026).","La linea 1 percorre tutto il Canal Grande con tutte le fermate (45 minuti da Piazzale Roma a San Marco); è lenta ma è la più bella. Google Maps indica le altre linee.","I biglietti si convalidano alla colonnina prima di salire. Le biglietterie sono alle fermate più grandi, altrimenti si compra in tabaccheria o alle macchinette.","I biglietti urbani non valgono sulle linee per l'aeroporto (Aerobus 5, bus 15 e 45, Alilaguna)."]],
["🎟️ Contributo d'accesso al centro storico",["Nel 2026 il contributo si è pagato in 60 giorni, dal 3 aprile al 26 luglio: 5 € se prenoti almeno 4 giorni prima, 10 € dopo, dalle 8:30 alle 16.","Per i prossimi mesi non risultano date, e le date 2027 non sono ancora note: controlla cda.ve.it.","Non pagano, tra gli altri, chi dorme in città (che versa l'imposta di soggiorno), i minori di 14 anni e i residenti in Veneto. I controlli si fanno al QR code e la multa va da 50 a 300 €. Murano, Burano e Lido sono escluse."]],
["⛪ San Marco e Palazzo Ducale",["La Basilica di San Marco richiede spalle e ginocchia coperte e niente zaini grandi (c'è un deposito vicino).","Il Palazzo Ducale è incluso nel biglietto dei Musei di Piazza San Marco (circa 30 €): compra online per evitare la coda.","Il caffè ai tavolini sulla piazza costa molto, a volte più di 10 €: bevilo al banco in una pasticceria vicina."],["sanmarco","palazzoducale"]],
["🎨 Dorsoduro: musei e Zattere",["Gallerie dell'Accademia (circa 15 €) e Collezione Peggy Guggenheim (circa 16 €, chiusa il martedì) sono a pochi minuti l'una dall'altra.","La Salute è gratis; la sacrestia ha un biglietto a parte.","Il traghetto (gondola di passaggio) costa circa 2 € e attraversa il Canal Grande in pochi minuti."],["accademia","peggy","salute","zattere"]],
["🛒 Rialto, Frari e Cannaregio",["Il mercato di Rialto è un bel posto da visitare la mattina, ma i borseggiatori lavorano proprio lì.","Gran parte dei bacari è a San Polo e a Cannaregio: la Fondamenta degli Ormesini e quella della Misericordia sono le vie dei veneziani.","Il Museo Ebraico è chiuso il sabato."],["rialto","frari","ghetto"]],
["🏝️ Murano, Burano e Torcello",["Si arriva col vaporetto dalle Fondamente Nove: la linea 12 va a Murano, Burano e Torcello (circa 40 minuti fino a Burano). Un giornaliero conviene.","Sono escluse dal contributo d'accesso.","Alle fornaci di Murano diffida di chi offre «visite gratis»: spesso portano a negozi con prezzi alti."],["isole"]],
["🛶 Gondola",["Le tariffe ufficiali, per una gondola fino a 6 persone e per 30 minuti, sono circa 90 € di giorno e circa 110 € dopo le 19 (da confermare). Non si paga a persona.","Si concorda il prezzo prima di salire. Per un'esperienza più economica c'è il traghetto, circa 2 €."]]],
WTIPS:["L'acqua delle fontanelle pubbliche di Venezia è potabile: porta una borraccia e risparmi sulle bottigliette.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","L'acqua dei canali non è da bere né da toccare.","Al ristorante puoi chiedere l'acqua del rubinetto, ma spesso portano bottiglie a pagamento: se non la vuoi, dillo subito."],
GEN:["Stessa lingua e stesso fuso orario, nessuna valuta da cambiare.","A Venezia non ci sono auto: si cammina molto, con molti ponti a gradini. Con una valigia con le rotelle conviene un bagaglio piccolo.","Il regolamento comunale vieta di sedersi a mangiare sui ponti, sui gradini dei monumenti e per terra, e di fare il bagno nei canali: ci sono multe.","Il coperto (di solito 1,50–3 € a persona) è legale se segnato nel menu; la mancia non è obbligatoria.","Al banco il caffè costa meno che al tavolo: prima si paga alla cassa, poi si porta lo scontrino al barista.","I borseggiatori lavorano su Rialto, sul vaporetto 1 e a San Marco: zaino davanti.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Numero unico di emergenza · <a class="call" href="tel:118">📞 118</a> Ambulanza</li><li>🚤 Vaporetti e bus, anche per oggetti smarriti: <a href="https://actv.avmspa.it/" target="_blank" rel="noopener">actv.avmspa.it</a> e <a href="https://www.veneziaunica.it/" target="_blank" rel="noopener">veneziaunica.it</a>.</li><li>🛡️ Per denunciare un furto: qualsiasi commissariato di Polizia di Stato o stazione dei Carabinieri.</li>',
STRK:'Nei giorni prima controllate il servizio su <a href="https://actv.avmspa.it/" target="_blank" rel="noopener">actv.avmspa.it</a> e, se usate il treno, su <a href="https://www.trenitalia.com/" target="_blank" rel="noopener">trenitalia.com</a>; gli scioperi nazionali sono elencati su <a href="https://scioperi.mit.gov.it/" target="_blank" rel="noopener">scioperi.mit.gov.it</a>. Al 13 ottobre 2026 non ho verificato scioperi locali dei trasporti di Venezia.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="372" cy="26" r="11"/><path d="M0 106 Q50 92 110 96 Q150 98 176 106 Z"/><path d="M270 106 Q320 94 400 98 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M30 106 V46 H48 V106 Z M27 46 H51 V42 H27 Z M31 42 V28 H47 V42 Z M29 28 H49 L39 10 Z M39 10 V4 M36 6 h6"/></g>'+
'<g style="--k:2"><path d="M64 106 V76 H152 V106 Z M68 76 Q76 56 84 76 Z M88 76 Q108 40 128 76 Z M132 76 Q140 56 148 76 Z M108 40 V32 H110 V40 Z"/></g>'+
'<g style="--k:3"><path d="M164 106 V74 H232 V106 Z M164 74 V68 H232 V74 Z M170 68 V60 H226 V68 Z"/></g>'+
'<g style="--k:4"><path d="M246 106 V86 H308 V106 Z M254 86 V70 H300 V86 Z M254 70 Q277 28 300 70 Z M273 40 V30 H281 V40 Z M248 86 V62 Q252 56 256 62 V86 Z M298 86 V62 Q302 56 306 62 V86 Z"/></g>'+
'<g style="--k:5"><path d="M318 92 Q352 64 386 92 V98 H318 Z M318 98 V106 H328 V98 Z M376 98 V106 H386 V98 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M33 56 v8 M39 56 v8 M45 56 v8 M32 78 v22 M38 78 v22 M44 78 v22"/><path d="M70 90 v12 M80 90 v12 M90 90 v12 M100 90 v12 M110 90 v12 M120 90 v12 M130 90 v12 M140 90 v12"/><path d="M170 82 v20 M180 82 v20 M190 82 v20 M200 82 v20 M210 82 v20 M220 82 v20"/><path d="M322 84 h58 M322 92 h58"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="39" cy="16" r="1.6"/><circle cx="108" cy="22" r="1.3"/><circle cx="195" cy="40" r="1.3"/><circle cx="277" cy="14" r="1.4"/><circle cx="352" cy="46" r="1.3"/><circle cx="14" cy="38" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.venezia);

;var n=window.CITIES["venezia"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["venezia"]);
