(function(o){
/* ===== Milano (dati verificati il 13 ottobre 2026) ===== */
/* Fonti: Comune di Milano e stampa locale (tariffe dei musei civici), Duomo di Milano (via guide aggiornate nel 2026), Cenacolo Vinciano, Pinacoteca di Brera,
   ATM e guide (tariffe 2026), aeroporto.net e sicurauto.it (collegamenti e taxi). Dove il dato viene da una guida o da una scheda online e non dal sito ufficiale
   lo dico nel testo («da confermare»). Le coordinate dei locali segnati «da confermare» sono indicative. */
window.CITIES=window.CITIES||{};
CITIES.milano=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
LIN:{n:"Linate (LIN)",s:"Milano Linate Enrico Forlanini",url:"https://www.milanolinate-airport.com/",live:"Milano Linate",inMin:50,buf:100,pos:[45.4455,9.2767],sd:"Linate · metro M4",rt:"Dall'aeroporto: metro M4 fino a San Babila, poi metro M1 fino al Duomo.",
 arr:"Dopo il ritiro bagagli segui i cartelli «Metro M4»: la stazione Linate Aeroporto è collegata al terminal. Sali sulla linea blu (M4) in direzione San Cristoforo e scendi a San Babila, dopo circa 12–15 minuti: da lì il Duomo è a una fermata della M1 (linea rossa) o a 10 minuti a piedi. In alternativa c'è il bus 73 fino a San Babila, più lento.",
 tk:"Biglietto ordinario ATM da 2,20 €, valido 90 minuti e con cambi tra le linee. Dal 2026 il biglietto di carta non esiste più: si passa ai tornelli con la carta contactless, con l'app ATM Milano o con la tessera RicaricaMi.",
 gm:"Linate Aeroporto M4, Milano",
 tips:["Controlla sul sito di ATM (atm.it) l'orario della prima e dell'ultima corsa della M4, soprattutto la sera tardi o la mattina presto.","Il taxi dentro Milano non ha tariffa fissa: va a tassametro e in partenza da Linate costa almeno 16 €. Per Malpensa la tariffa fissa è invece di 128 €.","Linate è molto vicino alla città, ma ha pochi voli low cost: molte compagnie più economiche usano Malpensa o Bergamo."]},
MXP:{n:"Malpensa (MXP)",s:"Milano Malpensa",url:"https://www.milanomalpensa-airport.com/",live:"Milano Malpensa",inMin:90,buf:120,pos:[45.6306,8.7231],sd:"Malpensa · Malpensa Express",rt:"Dall'aeroporto: Malpensa Express fino a Milano Cadorna (o Milano Centrale), poi metro fino al Duomo.",
 arr:"Dopo il ritiro bagagli segui i cartelli «Treni / Malpensa Express»: la stazione è sotto il Terminal 1 (dal Terminal 2 una navetta gratuita porta al Terminal 1 ogni 7 minuti circa). Il Malpensa Express parte ogni 15 minuti circa, alternando Milano Cadorna (circa 40 minuti) e Milano Centrale (circa 50 minuti, con fermata a Porta Garibaldi). Da Cadorna la metro M1 arriva al Duomo in 3 fermate (circa 5 minuti): è la strada più rapida per il centro. Il servizio è attivo indicativamente dalle 4 alle 2 di notte.",
 tk:"Biglietto Malpensa Express: 15 € a tratta (7,50 € da 4 a 13 anni, gratis sotto i 4 anni; 25 € andata e ritorno online), dai distributori in aeroporto o dall'app di Trenord. Il biglietto ATM da 2,20 € non vale su questo treno, ma serve poi per la metro.",
 gm:"Aeroporto di Milano Malpensa Terminal 1",
 tips:["I pullman (Terravision, Autostradale) portano alla Stazione Centrale in circa 50–60 minuti con biglietti da circa 8 €: costano meno del treno, ma dipendono dal traffico sull'autostrada.","Il taxi ha una tariffa fissa di 114 € per qualsiasi indirizzo dentro Milano (secondo la tabella regionale citata da guide del 2026): conviene solo in 3–4 persone.","Il 21 e 22 novembre è annunciato uno sciopero del personale ENAV: possibili ritardi anche a Malpensa."]},
BGY:{n:"Bergamo Orio al Serio (BGY)",s:"Bergamo Orio al Serio Il Caravaggio",url:"https://www.milanbergamoairport.it/",live:"Bergamo Orio al Serio",inMin:100,buf:110,pos:[45.6739,9.7042],sd:"Bergamo · bus per Centrale",rt:"Dall'aeroporto: bus diretto fino alla Stazione Centrale, poi metro M3 fino al Duomo.",
 arr:"L'aeroporto è a circa 45 chilometri da Milano e non ha ancora una stazione ferroviaria (un collegamento è previsto, ma non l'ho trovato attivo): si va in autobus. Appena fuori dall'uscita trovi le fermate dei bus per la Stazione Centrale (Terravision, Autostradale, Orio Shuttle, Flibco): il viaggio dura 50–60 minuti, con corse frequenti dal primo mattino fino a mezzanotte circa. Alla Stazione Centrale prendi la metro M3 (linea gialla) fino alla fermata Duomo: sono 4 fermate, circa 8 minuti.",
 tk:"Il bus costa in genere da 6 a 10 € a tratta, secondo la compagnia (alcune offrono biglietti da circa 4 €): meglio comprarlo online, il prezzo cambia. Per la metro serve poi il biglietto ATM da 2,20 €.",
 gm:"Aeroporto di Bergamo Orio al Serio",
 tips:["In alternativa l'autobus ATB porta alla stazione di Bergamo in circa 15 minuti (circa 2,40 € prenotato in anticipo, 3 € a bordo), poi un treno regionale arriva a Milano Centrale in circa un'ora: è più lungo ma a volte più sicuro con il traffico.","Il taxi per Milano ha una tariffa fissa di 128 €: conviene solo in gruppo.","Controlla sempre l'orario dell'ultimo bus se il tuo volo atterra a notte fonda."]}
};
/* linee (tracciati indicativi) */
var SEG={
m1:{c:"#e3000f",n:"Metro M1 (rossa)",p:[[45.4680,9.1760,"Cadorna",2],[45.4685,9.1825,"Cairoli"],[45.4655,9.1855,"Cordusio"],[45.4647,9.1900,"Duomo",2],[45.4663,9.1966,"San Babila",2]]},
m3:{c:"#f2b705",n:"Metro M3 (gialla)",p:[[45.4856,9.2040,"Centrale",2],[45.4806,9.2003,"Repubblica"],[45.4742,9.1975,"Turati"],[45.4687,9.1959,"Montenapoleone"],[45.4647,9.1900,"Duomo",2]]},
m4:{c:"#1f62b5",n:"Metro M4 (blu)",p:[[45.4663,9.1966,"San Babila",2],[45.4655,9.2060,"Tricolore"],[45.4588,9.2174,"Dateo"],[45.4607,9.2386,"Forlanini FS"],[45.4600,9.2765,"Linate Aeroporto",2]]},
mxp:{c:"#c8102e",n:"Malpensa Express",p:[[45.6306,8.7231,"Aeroporto di Malpensa",2],[45.6130,8.8580],[45.6260,9.0300],[45.5030,9.1590],[45.4680,9.1760,"Milano Cadorna",2]]},
bgy:{c:"#3a8a3c",n:"Bus per Bergamo Orio al Serio",p:[[45.6739,9.7042,"Aeroporto di Bergamo",2],[45.6200,9.5500],[45.5400,9.3800],[45.5000,9.2500],[45.4863,9.2057,"Milano Centrale",2]]}
};
var START=[45.4642,9.1919];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
duomo:{t:"Duomo di Milano e terrazze",z:"A",p:1,min:60,id:100,max:150,pos:[45.46427,9.19192],q:"Duomo di Milano",cls:"",sun:1,tk:[22,"Duomo Pass: cattedrale, museo e terrazze a piedi (22 €)",1,1],
 win:function(){return[9*60,18*60+10]},
 d:"La cattedrale gotica di marmo rosa e bianco, con 135 guglie e oltre tremila statue, in cima la Madonnina dorata. Dentro si cammina tra colonne alte come alberi; fuori si sale sulle terrazze, in mezzo alle guglie, con la vista sulla piazza e, nei giorni limpidi, sulle Alpi.",
 m:"Prezzi 2026 da guide aggiornate (da confermare su duomomilano.it): Culture Pass 15 € (cattedrale, museo, area archeologica, valido 72 ore), con le terrazze a piedi 22 € o in ascensore 26 €; solo terrazze 16 € a piedi o 18 € in ascensore (si scende sempre a piedi). Cattedrale aperta indicativamente 8–18, terrazze 9–19 con ultimo accesso verso le 18:10. Spalle e ginocchia coperte; con pioggia, ghiaccio o vento forte le terrazze possono chiudere. Il Museo del Duomo è chiuso il mercoledì."},
galleria:{t:"Galleria Vittorio Emanuele II",z:"A",p:2,min:20,id:30,max:50,pos:[45.46585,9.19013],q:"Galleria Vittorio Emanuele II, Milano",cls:"walk",sun:1,
 d:"Il «salotto di Milano»: una crociera di vetro e ferro dell'Ottocento con i mosaici sul pavimento, i negozi storici e i caffè. Sul mosaico del toro, al centro, si gira su un tallone per portare fortuna.",
 m:"Gratis e sempre aperta. I caffè e i ristoranti della Galleria sono i più cari del centro: per un caffè o un panino conviene uscire dalla Galleria e cercare in una via laterale."},
scala:{t:"Teatro e Museo della Scala",z:"A",p:4,min:45,id:60,max:90,pos:[45.46745,9.18955],q:"Museo Teatrale alla Scala, Milano",cls:"",tk:[12,"Museo Teatrale alla Scala (12 €)",1],
 win:function(){return[9*60+30,17*60]},
 d:"Davanti al teatro più famoso d'Italia c'è la piazza con il monumento a Leonardo. Il museo, nello stesso edificio, raccoglie costumi, strumenti, spartiti e ricordi di Verdi, Toscanini e Callas; da una balconata si guarda la sala, quando non ci sono prove.",
 m:"Biglietto 12 € (secondo il museo, valido fino al 31 dicembre 2026). Aperto ogni giorno 9:30–17:30, ultimo ingresso alle 17:00. Chiuso il 7 dicembre, il 25 e 26 dicembre, il 1° gennaio, a Pasqua, il 1° maggio e il 15 agosto. La sala si vede solo se non ci sono prove o spettacoli: la vista dipende dal giorno."},
novecento:{t:"Museo del Novecento e Piazza Duomo",z:"A",p:4,min:60,id:75,max:110,pos:[45.46405,9.19145],q:"Museo del Novecento, Milano",cls:"",multi:1,cl:[0],tk:[10,"Museo del Novecento (10 €)",1],
 win:function(wd){return wd===0?[0,0]:[10*60,(wd===3?22*60+30:19*60+30)-30]},
 d:"Il museo dell'arte italiana del Novecento, nell'Arengario in Piazza Duomo: il «Quarto Stato» di Pellegrini da Volpedo, i futuristi (Boccioni, Balla) e Fontana. Le grandi vetrate guardano la piazza e il Duomo da una prospettiva insolita.",
 m:"Biglietto intero 10 € (tariffa dei musei civici in vigore dal 10 maggio 2026). Orari da guide, da confermare: 10–19:30, il giovedì fino alle 22:30, chiuso il lunedì. Ingresso gratuito la prima domenica del mese."},
quadrilatero:{t:"Quadrilatero della Moda",z:"A",p:5,min:30,id:40,max:70,pos:[45.46870,9.19570],q:"Via Montenapoleone, Milano",cls:"walk",sun:1,
 d:"Via Montenapoleone, Via della Spiga, Via Sant'Andrea e Via Manzoni: le vie delle grandi firme, con palazzi neoclassici, cortili nascosti e vetrine che costa solo guardare. Dietro Via Manzoni si trova il Museo Bagatti Valsecchi.",
 m:"Si passeggia gratis. I negozi aprono di solito dalle 10 alle 19–19:30; molti restano chiusi la domenica mattina."},
castello:{t:"Castello Sforzesco e Parco Sempione",z:"C",p:2,min:60,id:90,max:150,pos:[45.47030,9.17935],q:"Castello Sforzesco, Milano",cls:"walk",sun:1,
 d:"La fortezza dei duchi di Milano, con la torre del Filarete sul fossato e i cortili che fanno da cuore della città. Al suo interno ci sono i musei civici (tra i quali l'ultima scultura di Michelangelo, la Pietà Rondanini). Dietro il castello si apre il Parco Sempione, fino all'Arco della Pace.",
 m:"Cortili e Piazza d'Armi gratis dalle 7 alle 19:30. I musei sono aperti dal martedì alla domenica 10–17:30 (ultimo ingresso 16:30), chiusi il lunedì, il 25 dicembre, il 1° gennaio e il 1° maggio. Dal 10 maggio 2026 il biglietto dei musei costa 10 € (compresa la Pietà Rondanini); ingresso gratuito la prima domenica del mese. A maggio 2026 la Sala delle Asse e la sezione di preistoria erano chiuse: controlla milanocastello.it. Il parco è aperto indicativamente 6:30–21 (da guide)."},
cenacolo:{t:"Ultima Cena di Leonardo",z:"C",p:1,min:30,id:45,max:60,pos:[45.46590,9.17105],q:"Cenacolo Vinciano, Milano",cls:"",multi:1,cl:[0],tk:[15,"Cenacolo Vinciano (15 €, prenotazione obbligatoria)",1,1],
 win:function(wd){return wd===0?[0,0]:[8*60+15,18*60+45]},
 d:"Nel refettorio del convento di Santa Maria delle Grazie, Leonardo da Vinci dipinse nel 1495–98 l'Ultima Cena. La visita dura 15 minuti, a gruppi di massimo 40 persone, in un'aria climatizzata per proteggere il dipinto. Accanto c'è la chiesa di Santa Maria delle Grazie, con il chiostro.",
 m:"Biglietto 15 € (ridotto 2 € da 18 a 25 anni, gratis sotto i 18) e prenotazione obbligatoria su cenacolovinciano.org: ritira il biglietto almeno 30 minuti prima. Le vendite si aprono a blocchi di mesi e ogni mercoledì alle 12 escono i posti della settimana successiva. Aperto dal martedì alla domenica 8:15–19:00 (ultimo ingresso 18:45), chiuso il lunedì, il 1° gennaio e il 25 dicembre."},
brera:{t:"Brera",z:"A",p:3,min:40,id:60,max:100,pos:[45.47160,9.18840],q:"Via Brera, Milano",cls:"walk",sun:1,
 d:"Il quartiere degli artisti: vie acciottolate, botteghe, gallerie e locali intorno all'Accademia e alla Pinacoteca. In Via Fiori Chiari e dintorni, la terza domenica del mese (tranne agosto) c'è il mercatino dell'antiquariato.",
 m:"Si passeggia gratis. Il mercatino di Brera è, secondo le guide, la terza domenica del mese, circa 9–19, e le date possono cambiare con il maltempo. L'Orto Botanico di Brera è un giardino nascosto dietro la Pinacoteca (orari da controllare)."},
pinacoteca:{t:"Pinacoteca di Brera",z:"A",p:3,min:75,id:100,max:150,pos:[45.47210,9.18810],q:"Pinacoteca di Brera, Milano",cls:"",multi:1,cl:[0],tk:[20,"Pinacoteca di Brera, La Grande Brera con Palazzo Citterio (20 €)",1],
 win:function(wd){return wd===0?[0,0]:[8*60+30,18*60]},
 d:"La grande raccolta di pittura italiana, in un palazzo seicentesco: il «Bacio» di Hayez, il Cristo morto di Mantegna, lo Sposalizio della Vergine di Raffaello, la Cena in Emmaus di Caravaggio e la Pala di Brera di Piero della Francesca.",
 m:"Biglietto «La Grande Brera» (Pinacoteca e Palazzo Citterio) 20 €, secondo la scheda di Brera; la sola Pinacoteca costava circa 15 € nelle guide del 2025: controlla su brera.beniculturali.it. Aperta dal martedì alla domenica 8:30–19:15, ultimo ingresso 18:00, chiusa il lunedì, il 1° gennaio, il 1° maggio e il 25 dicembre. La prima domenica del mese è gratis con prenotazione."},
santambrogio:{t:"Basilica di Sant'Ambrogio",z:"C",p:3,min:30,id:45,max:70,pos:[45.46230,9.17510],q:"Basilica di Sant'Ambrogio, Milano",cls:"",sun:1,
 win:function(wd){return wd===6?[15*60,17*60]:[10*60,18*60]},
 d:"La basilica del patrono di Milano, fondata nel IV secolo da Ambrogio e ricostruita in stile romanico: l'atrio con i porticati, la chiesa con l'altare d'oro del IX secolo e i mosaici dell'abside. All'esterno si vede la colonna del Diavolo, con due buchi: la tradizione dice che siano i segni delle corna.",
 m:"L'ingresso alla basilica è gratuito. Gli orari di visita variano e vanno controllati prima di partire: secondo le guide, dal lunedì al sabato 10–12 e 14:30–18, la domenica pomeriggio 15–17, con visite sospese durante le funzioni. Il nuovo museo «Ambrosius» ha un biglietto a parte (prezzo non letto). Il 7 dicembre è la festa del patrono."},
colonne:{t:"Colonne di San Lorenzo",z:"D",p:5,min:20,id:30,max:45,pos:[45.45780,9.18090],q:"Colonne di San Lorenzo, Milano",cls:"walk",sun:1,
 d:"Sedici colonne romane del II–III secolo, davanti alla basilica di San Lorenzo: il monumento romano più importante di Milano. La sera il prato davanti alle colonne è il ritrovo di giovani e studenti.",
 m:"Si vedono gratis e sempre. La basilica ha orari suoi (da controllare). Da qui Corso di Porta Ticinese porta ai Navigli in dieci minuti."},
navigli:{t:"Navigli e Darsena",z:"D",p:3,min:60,id:90,max:150,pos:[45.45140,9.17800],q:"Darsena, Milano",cls:"walk",sun:1,
 d:"I canali del Naviglio Grande e della Darsena, un tempo il porto di Milano: le case di ringhiera con i balconi di ferro, le botteghe e i locali sull'acqua. Alla sera, dall'aperitivo in poi, è la zona più viva della città.",
 m:"Si passeggia gratis e sempre. Di giorno è tranquillo; dalle 18:30 circa i locali riempiono le sponde e un drink costa di solito di più con lo stuzzichino compreso: guarda il listino prima di sederti. L'ultima domenica del mese, secondo le guide, c'è il Mercatone dell'Antiquariato lungo il Naviglio Grande."},
portanuova:{t:"Porta Nuova: Bosco Verticale e Piazza Gae Aulenti",z:"F",p:4,min:40,id:60,max:90,pos:[45.48390,9.18980],q:"Piazza Gae Aulenti, Milano",cls:"walk",sun:1,
 d:"La Milano moderna: la piazza circolare Gae Aulenti ai piedi della Torre UniCredit, i grattacieli di vetro e, poco più in là, il Bosco Verticale, i due palazzi con ventuno mila piante sui balconi.",
 m:"Tutto gratis e sempre accessibile. Il Bosco Verticale è un condominio: si ammira da fuori, dal parco della Biblioteca degli Alberi. In dicembre sulla piazza di solito c'è un mercatino."}
};
/* collegamenti tra le tappe */
var LEGS={
"galleria>castello":{min:17,mode:"walk",txt:"A piedi attraverso Piazza Cordusio e lungo Via Dante fino al Castello, circa 17 minuti.",g:[W([[45.46585,9.19013],[45.4657,9.1857],[45.4675,9.1830],[45.4703,9.1793]])]},
"duomo>castello":{min:18,mode:"walk",txt:"A piedi per Via Mercanti, Piazza Cordusio e Via Dante fino al Castello, circa 18 minuti.",g:[W([[45.46427,9.19192],[45.4657,9.1857],[45.4675,9.1830],[45.4703,9.1793]])]},
"scala>brera":{min:8,mode:"walk",txt:"A piedi per Via Giuseppe Verdi e Via Brera, circa 8 minuti.",g:[W([[45.46745,9.18955],[45.4695,9.1885],[45.4721,9.1881]])]},
"galleria>scala":{min:3,mode:"walk",txt:"Dalla Galleria si esce dal lato opposto al Duomo, direttamente sulla Piazza della Scala: circa 3 minuti.",g:[W([[45.46585,9.19013],[45.46745,9.18955]])]},
"brera>castello":{min:13,mode:"walk",txt:"A piedi per Via Mercato e Via Broletto fino al Castello, circa 13 minuti.",g:[W([[45.4716,9.1884],[45.4715,9.1840],[45.4710,9.1810],[45.4703,9.1793]])]},
"pinacoteca>castello":{min:13,mode:"walk",txt:"A piedi per Via Mercato e Via Broletto fino al Castello, circa 13 minuti.",g:[W([[45.4721,9.1881],[45.4715,9.1840],[45.4710,9.1810],[45.4703,9.1793]])]},
"castello>cenacolo":{min:15,mode:"walk",txt:"A piedi da Largo Cairoli attraverso Cadorna e Via Magenta fino a Santa Maria delle Grazie, circa 15 minuti. In alternativa metro M1 da Cairoli a Conciliazione.",g:[W([[45.4703,9.1793],[45.4680,9.1760],[45.4665,9.1730],[45.4659,9.1711]])]},
"cenacolo>santambrogio":{min:12,mode:"walk",txt:"A piedi per Via Zenale e Via San Vittore fino alla basilica, circa 12 minuti.",g:[W([[45.4659,9.1711],[45.4640,9.1735],[45.4623,9.1751]])]},
"santambrogio>colonne":{min:14,mode:"walk",txt:"A piedi per Via Edmondo de Amicis fino alle Colonne di San Lorenzo, circa 14 minuti.",g:[W([[45.4623,9.1751],[45.4600,9.1790],[45.4578,9.1809]])]},
"colonne>navigli":{min:12,mode:"walk",txt:"A piedi lungo Corso di Porta Ticinese fino alla Darsena, circa 12 minuti.",g:[W([[45.4578,9.1809],[45.4550,9.1790],[45.4520,9.1780],[45.4514,9.1780]])]},
"santambrogio>navigli":{min:20,mode:"walk",txt:"A piedi per Via Torino e Corso di Porta Ticinese fino alla Darsena, circa 20 minuti.",g:[W([[45.4623,9.1751],[45.4570,9.1790],[45.4514,9.1780]])]}
};
/* ritorno in aeroporto (le altre tappe passano dal Duomo) */
var RET={
LIN:{
 A:{min:30,txt:"Metro M1 dal Duomo a San Babila (1 fermata), poi metro M4 fino al capolinea Linate Aeroporto (circa 12–15 minuti). Biglietto ATM da 2,20 €, valido 90 minuti e con cambio. Controlla su atm.it l'ultima corsa della M4 se parti la sera.",g:[["m1","Duomo","San Babila"],["m4","San Babila","Linate Aeroporto"]]}},
MXP:{
 A:{min:70,txt:"Metro M1 dal Duomo a Cadorna (3 fermate, circa 5 minuti), poi Malpensa Express da Cadorna al Terminal 1 (circa 40 minuti, un treno ogni 30 minuti da Cadorna). In alternativa il Malpensa Express parte anche dalla Stazione Centrale (circa 50 minuti). Per il Terminal 2 c'è la navetta gratuita dal Terminal 1.",g:[["m1","Duomo","Cadorna"],["mxp","Milano Cadorna","Aeroporto di Malpensa"]]}},
BGY:{
 A:{min:85,txt:"Metro M3 dal Duomo alla Stazione Centrale (4 fermate, circa 8 minuti), poi bus diretto per Bergamo Orio al Serio dal piazzale della stazione (Terravision, Autostradale, Orio Shuttle; circa 50–60 minuti, con il traffico di più). Prenota un bus che arrivi in aeroporto con largo anticipo e controlla l'orario dell'ultima corsa.",g:[["m3","Duomo","Centrale"],["bgy","Milano Centrale","Aeroporto di Bergamo"]]}}
};
var ARR={
LIN:[["m4","Linate Aeroporto","San Babila"],["m1","San Babila","Duomo"]],
MXP:[["mxp","Aeroporto di Malpensa","Milano Cadorna"],["m1","Cadorna","Duomo"]],
BGY:[["bgy","Aeroporto di Bergamo","Milano Centrale"],["m3","Centrale","Duomo"]]
};
/* locali: h = orari lun→dom; "" = chiuso. «da confermare» = orari o prezzi da guide e schede online, non letti sui siti dei locali */
var V={
luini:{n:"Luini Panzerotti",a:"Via Santa Radegonda 16",z:"A",r:"4,4",pos:[45.465797,9.191487],h:["10:30-20:00","10:30-20:00","10:30-20:00","10:30-20:00","10:30-20:00","10:30-20:00",""],
 d:"Dal 1949 a due passi dal Duomo: il panzerotto, una pasta morbida piegata e fritta con il ripieno caldo di pomodoro e mozzarella, da mangiare in piedi sulla strada. C'è spesso la coda, ma scorre in fretta. Chiuso la domenica.",pr:"Un panzerotto costa circa 2,50–3 € (da recensioni del 2023, listino non visto): due e una bibita stanno sotto i 10 €."},
marchesi:{n:"Pasticceria Marchesi 1824",a:"Via Santa Maria alla Porta 11/A",z:"A",r:"4,5",pos:[45.46520,9.18330],h:["07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","08:30-19:00"],
 d:"La pasticceria storica di Milano, con le sale in legno e i dolci di una volta: brioche, panettone, tartine e il caffè al banco. È cara per la colazione, ma costa poco al banco. Orari e coordinate da confermare.",pr:"Brioche e caffè al banco sui 4–5 € (listino non visto). Orari da guide, da confermare."},
taveggia:{n:"Taveggia",a:"Via Visconti di Modrone 2",z:"A",r:"4,3",pos:[45.46380,9.19600],h:["07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","08:00-19:30"],
 d:"Un caffè-pasticceria aperto dal 1909 a San Babila, con vetrine di torte, pasticcini e brioche. Una buona sosta per colazione o merenda, vicino al Duomo ma fuori dalla ressa. Orari e coordinate da confermare.",pr:"Colazione al banco sui 4–6 € (listino non visto). Orari da guide, da confermare."},
trattmil:{n:"Trattoria Milanese",a:"Via Santa Marta 11",z:"A",r:"4,0",pos:[45.46293,9.18368],h:["12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30",""],
 d:"Una trattoria storica vicino alla Biblioteca Ambrosiana, aperta dal 1933: risotto alla milanese, ossobuco, cotoletta e panettone. Cucina classica, giudizi misti sulla cottura. Chiusa la domenica.",pr:"Fascia medio-alta: con un primo e un secondo si superano di solito i 30 € a persona (da guide, listino del 2014: risotto 11 €, cotoletta 19 €, oggi di più)."},
cucchi:{n:"Pasticceria Cucchi",a:"Corso Genova 1",z:"C",r:"4,5",pos:[45.45760,9.17370],h:["","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:30-20:00"],
 d:"Una pasticceria e caffè di Sant'Agostino, aperta dal 1936: brioche e pasticcini, la torta Paradiso, il panettone nei mesi freddi e il caffè al banco. Orari e coordinate da confermare; chiusa probabilmente il lunedì.",pr:"Brioche e caffè al banco sui 3–5 € (listino non visto). Orari da guide, da confermare."},
premiata:{n:"Premiata Pizzeria",a:"Alzaia Naviglio Grande 2",z:"D",r:"4,3",pos:[45.45130,9.17520],h:D7("12:00-15:00,19:00-24:00"),
 d:"Una pizzeria storica sul Naviglio Grande: pizza napoletana al forno a legna, antipasti all'italiana e tavoli in strada nelle sere calde. Alla sera c'è sempre fila: meglio prenotare. Orari e coordinate da confermare.",pr:"Una pizza costa di solito 9–14 €: con una birra si sta intorno ai 20 € (da guide, listino non visto). Orari da guide, da confermare."},
pave:{n:"Pavè",a:"Via Felice Casati 27",z:"E",r:"4,5",pos:[45.479137,9.202569],h:D7("08:00-19:00"),
 d:"Il panificio-pasticceria di Porta Venezia, apprezzato da chi cerca cornetti sfogliati, torte da forno, pane e un caffè buono. Si mangia ai tavolini o in piedi. Orari variabili secondo le fonti: il sito indica 8–19, tutti i giorni; altre guide parlano di un riposo il lunedì.",pr:"Cornetto e cappuccino sui 5–7 €, una cioccolata con croissant arriva a circa 10 € (da recensioni, listino non visto)."},
cotoletteria:{n:"La Cotoletteria",a:"Via Domenico Cirillo 12",z:"F",r:"4,4",pos:[45.48120,9.17840],h:["","12:00-15:00,19:00-23:00","12:00-15:00,19:00-23:00","12:00-15:00,19:00-23:00","12:00-15:00,19:00-23:00","12:00-15:00,19:00-23:00","12:00-15:00,19:00-23:00"],
 d:"Un locale della zona Sarpi che fa della cotoletta alla milanese il suo piatto unico: classica, in versione panino o con salse. È tra le cotolette più economiche di Milano. Orari da confermare.",pr:"La cotoletta classica costa circa 14 € (da una guida del 2026), le varianti 15–16 €. Orari da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["marchesi","taveggia","luini"],C:["cucchi","marchesi"],D:["cucchi","marchesi"],E:["pave","taveggia"],F:["pave","marchesi"]},
pra:{A:["luini","trattmil","cotoletteria"],C:["cotoletteria","luini"],D:["premiata","luini"],E:["cotoletteria","pave"],F:["cotoletteria","luini"]},
cen:{A:["trattmil","premiata","cotoletteria"],C:["trattmil","premiata"],D:["premiata","trattmil"],E:["cotoletteria","trattmil"],F:["cotoletteria","premiata"]},
snk:{A:["luini","marchesi","taveggia"],C:["cucchi","luini"],D:["cucchi","premiata"],E:["pave","luini"],F:["pave","luini"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Duomo, Galleria, Scala e Museo del Novecento",acts:["duomo","galleria","novecento","scala","quadrilatero"],need:300,core:1},
{id:"castello",t:"Castello Sforzesco, Brera e Pinacoteca",acts:["castello","brera","pinacoteca"],need:290,core:1,cl:[0]},
{id:"cenacolo",t:"Ultima Cena, Sant'Ambrogio e Colonne di San Lorenzo",acts:["cenacolo","santambrogio","colonne"],need:210,core:1,cl:[0]},
{id:"navigli",t:"Navigli e Porta Nuova",acts:["navigli","portanuova"],need:190}
];
var ORDER=["duomo","galleria","novecento","scala","quadrilatero","castello","brera","pinacoteca","cenacolo","santambrogio","colonne","navigli","portanuova"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["duomo","Duomo / Galleria / San Babila",[45.4650,9.1930],"A"],
["brera","Brera / Castello / Moscova",[45.4720,9.1850],"A"],
["santambrogio","Sant'Ambrogio / Cadorna / Cenacolo",[45.4655,9.1750],"C"],
["navigli","Navigli / Porta Ticinese / Porta Genova",[45.4520,9.1760],"D"],
["centrale","Stazione Centrale / Porta Venezia",[45.4830,9.2040],"E"],
["garibaldi","Porta Garibaldi / Isola / Porta Nuova",[45.4830,9.1880],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[45.4642,9.1919],""]
];
/* imposta di soggiorno di Milano: importi indicativi, non verificati sul sito del Comune */
var TAX=[["h5","Hotel 5 stelle",7],["h4","Hotel 4 stelle",5],["h3","Hotel fino a 3 stelle, B&B o appartamento",4],["host","Ostello o struttura economica",2],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Cappuccino e brioche al banco","si paga alla cassa e si porta lo scontrino al banco: in piedi costa meno che al tavolo."],["Brioche vuota o alla crema","il cornetto milanese, più morbido e meno dolce di quello del Sud."],["Torta Paradiso","un dolce soffice e profumato di limone, tipico delle pasticcerie milanesi."]],
pra:[["Panzerotto","pasta fritta farcita con pomodoro e mozzarella, da mangiare in piedi."],["Risotto alla milanese","riso allo zafferano, cremoso e giallo."],["Cotoletta alla milanese","costoletta di vitello impanata e fritta nel burro, con l'osso o «orecchia d'elefante»."]],
cen:[["Risotto alla milanese con ossobuco","il piatto simbolo di Milano: riso allo zafferano con lo stinco di vitello."],["Cotoletta alla milanese","con osso e burro chiarificato; se è in carta, chiedi di averla «alla milanese» e non «alla bolognese»."],["Cassoeula","stufato di verza e maiale, da ottobre a marzo."],["Panettone","il dolce di Natale, ma si trova in pasticceria da novembre."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","La facciata del Duomo","Foto","Dal centro della piazza, con le guglie e la Madonnina: la luce migliore è al mattino presto o al tramonto, quando il marmo diventa rosato.",[45.46427,9.19192],"Piazza del Duomo, Milano","duomo"],
["📷","Le guglie dalle terrazze","Foto","Camminando tra le statue e le guglie del tetto, con la piazza sotto e i grattacieli all'orizzonte.",[45.4643,9.1920],"Terrazze del Duomo, Milano","duomo"],
["🤳","Il toro della Galleria","Selfie","Sul mosaico del toro di Torino: si gira un tallone sul punto consumato e si fa un desiderio.",[45.46585,9.19013],"Galleria Vittorio Emanuele II, Milano","galleria"],
["📷","La volta della Galleria","Foto","Inquadra verso l'alto, sotto la cupola di vetro: simmetria perfetta e luce sulla pietra.",[45.46585,9.19013],"Galleria Vittorio Emanuele II, Milano","galleria"],
["📷","Piazza della Scala","Foto","Il monumento a Leonardo con la facciata neoclassica del teatro alle spalle.",[45.46745,9.18955],"Piazza della Scala, Milano","scala"],
["📷","La Torre del Filarete","Foto","La torre del Castello vista dal fossato o dal cortile delle armi, con il cielo dietro.",[45.47030,9.17935],"Castello Sforzesco, Milano","castello"],
["📷","L'Arco della Pace","Foto","Dal prato del Parco Sempione, con le bighe di bronzo in cima e il castello alle spalle.",[45.4724,9.1730],"Arco della Pace, Milano","castello"],
["📷","Le vie di Brera","Foto","Le strade acciottolate di Brera con le insegne delle botteghe e le piante sui balconi.",[45.47160,9.18840],"Via Fiori Chiari, Milano","brera"],
["📷","La Basilica di Sant'Ambrogio","Foto","L'atrio romanico con il campanile: una foto più calma di quelle del Duomo.",[45.46230,9.17510],"Basilica di Sant'Ambrogio, Milano","santambrogio"],
["🤳","Colonne di San Lorenzo","Selfie","Le sedici colonne romane con i palazzi moderni dietro: contrasto tra antico e nuovo, specie di sera.",[45.45780,9.18090],"Colonne di San Lorenzo, Milano","colonne"],
["📷","La Darsena al tramonto","Foto","Il bacino dei Navigli con le barche e le luci dei locali che si accendono.",[45.45140,9.17800],"Darsena, Milano","navigli"],
["📷","Il Naviglio Grande","Foto","Il canale con i ponti di ferro e le case di ringhiera: meglio all'ora blu.",[45.45160,9.17250],"Naviglio Grande, Milano","navigli"],
["📷","Il Bosco Verticale","Foto","I due palazzi con gli alberi sui balconi, visti dalla Biblioteca degli Alberi.",[45.4871,9.1907],"Bosco Verticale, Milano","portanuova"],
["🤳","Piazza Gae Aulenti","Selfie","Sulla piazza circolare con i riflessi dei grattacieli e la Torre UniCredit alle spalle.",[45.48390,9.18980],"Piazza Gae Aulenti, Milano","portanuova"]
];
/* avvisi verificati il 13 ottobre 2026 */
var AVV=[
{from:"2026-10-13",to:"2027-01-31",t:"Ultima Cena: prenota con settimane di anticipo",x:"I biglietti per il Cenacolo Vinciano si vendono a blocchi di mesi e ogni mercoledì alle 12 escono i posti della settimana successiva. Spesso in giornata è esaurito: se non ne hai uno, non programmare la visita."},
{from:"2026-11-01",to:"2026-11-01",t:"Prima domenica del mese: musei gratis",x:"Domenica 1° novembre i musei civici (Castello Sforzesco, Museo del Novecento) sono gratuiti e la Pinacoteca di Brera è gratuita con prenotazione obbligatoria: attese lunghe."},
{from:"2026-12-01",to:"2027-01-06",t:"Mercatini di Natale in Piazza Duomo",x:"Di solito dal 1° dicembre al 6 gennaio, circa 9–21: il centro è molto più affollato e il Duomo ha code più lunghe."},
{from:"2026-12-04",to:"2026-12-08",t:"Sant'Ambrogio e Oh Bej! Oh Bej!",x:"Il 7 dicembre è la festa di Sant'Ambrogio, patrono di Milano, con l'apertura della stagione della Scala (la «Prima»). Il Museo della Scala è chiuso il 7 dicembre. Intorno al Castello Sforzesco si tiene di solito la fiera Oh Bej! Oh Bej! (dal 4–5 all'8 dicembre; date da confermare): il centro è affollatissimo."},
{from:"2026-12-06",to:"2026-12-06",t:"Prima domenica del mese: musei gratis",x:"Domenica 6 dicembre i musei civici (Castello Sforzesco, Museo del Novecento) sono gratuiti e la Pinacoteca di Brera è gratuita con prenotazione obbligatoria."}
];
/* clima medio di Milano (indicativo, massime/minime) */
var CLIM=[[6,-1],[9,0],[14,4],[18,8],[23,12],[27,16],[30,19],[29,18],[25,14],[18,9],[11,4],[6,0]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Milano: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="duomo"&&WD===2)meta+=" Oggi è mercoledì: il Museo del Duomo è chiuso, restano aperti la cattedrale e le terrazze.";
if(it.id==="novecento"&&WD===3)meta+=" Oggi è giovedì: il Museo del Novecento resta aperto fino alle 22:30.";
if(it.id==="santambrogio"&&WD===6)meta+=" Oggi è domenica: la basilica si visita di solito solo il pomeriggio, dalle 15.";
if(it.id==="cenacolo"&&WD===0)meta+=" Oggi è lunedì: il Cenacolo è chiuso.";
return meta}
Object.assign(C,{id:"milano",n:"Milano",cn:"Italia",e:"⛪",flag:"🇮🇹",col:["#7a1f2b","#c9a24a","#2b2b2b"],k:"milano milan italia lombardia",
TZ:"Europe/Rome",LL:[45.4642,9.1919],CC:"it",QN:"Milano",BK:"Milan",ARE:/milano|milan|\b20[0-9]{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"it-IT",LANGN:"milanese",NOSAY:1,WATER:"osm",TAXDEF:"h3",TAXMAXN:14,RETC:1,LUNCHO:0,DINO:30,
hub:{n:"Piazza del Duomo",q:"Piazza del Duomo, Milano"},
SINGLE:{acts:["duomo","galleria","brera","castello","santambrogio","navigli"],ins:[["scala","galleria"],["quadrilatero","scala"],["colonne","santambrogio"]]},
EXCL:[],
DICON:{galleria:"🛍️",scala:"🎭",novecento:"🖼️",quadrilatero:"👜",castello:"🏰",cenacolo:"🍷",brera:"🎨",pinacoteca:"🖼️",santambrogio:"⛪",colonne:"🏛️",navigli:"🚤",portanuova:"🌳"},
ZN:{A:"in centro, vicino al Duomo",C:"a Sant'Ambrogio e Cadorna",D:"ai Navigli",E:"verso Porta Venezia e la Stazione Centrale",F:"a Porta Nuova e Sarpi"},
NEAR:{col:"bar o pasticceria",pra:"panzerotto o trattoria",cen:"trattoria o pizzeria",snk:"pasticceria"},
SE:{luini:"🥟",marchesi:"🥐",taveggia:"☕",trattmil:"🍲",cucchi:"🥐",premiata:"🍕",pave:"🥐",cotoletteria:"🍖"},
TR:{one:2.2,lbl:"Metro, tram e bus (ATM)",
 air:{LIN:{one:2.2,n:"Metro M4 da Linate (biglietto ordinario)"},MXP:{one:15,n:"Malpensa Express"},BGY:{one:8,n:"Bus Bergamo Orio al Serio–Stazione Centrale (da circa 8 €)"}},
 passes:[
 {n:"Giornaliero 24 ore",d:1,max:1,p:7.6,note:"Il biglietto giornaliero (7,60 €) vale 24 ore dalla prima convalida su metro, tram e bus a Milano e nell'area urbana."},
 {n:"Biglietto 3 giorni",d:3,p:15.5,only:function(T){return T.n===3},note:"Il biglietto 3 giorni (15,50 €) vale per tre giorni consecutivi, fino alle 3:45 del terzo giorno, su metro, tram e bus."},
 {n:"Abbonamento settimanale",d:7,p:18.5,only:function(T){return T.n>=5},note:"Il settimanale (18,50 €) richiede la tessera personale RicaricaMi: prezzo da confermare per i turisti."}],
 note:"Prezzi ATM 2026 (da guide, da confermare su atm.it): biglietto ordinario 2,20 € (90 minuti, anche con cambi), giornaliero 7,60 € (24 ore), 3 giorni 15,50 €, carnet da 10 viaggi 19,50 €. Il biglietto di carta non esiste più dal 1° gennaio 2026: si usa la carta contactless ai tornelli, l'app ATM Milano o la tessera RicaricaMi. Il Malpensa Express costa 15 € e non è compreso nei biglietti ATM. I bambini sotto i 14 anni viaggiano gratis sui mezzi ATM."},
FOOD:{co:[4,"Colazione al banco (cappuccino e brioche)"],pr:[12,"Pranzo (panzerotto, cotoletta o un primo)"],ce:[20,"Cena (trattoria o pizzeria)"],sp:[5,"Gelato e spuntini"]},
T:{ride:"In metro o tram",move:"tutto a piedi, in metro o in tram",bags:"«Posso lasciare i bagagli?»",bagsPM:"«Posso lasciare i bagagli fino al pomeriggio?»",bagsAM:"«Posso lasciare i bagagli fino a mezzogiorno?»",
pra:"Un panzerotto o una trattoria",praZ:{A:"Attorno al Duomo e nella Galleria i ristoranti sono per turisti e costano molto: per un pasto vero scegli le vie laterali, a 5–10 minuti a piedi.",D:"Sui Navigli i locali con i menu in strada sono turistici; ai tavoli sul canale si paga anche la posizione."},
freeLong:"Qualche idea: un caffè in una pasticceria storica, un giro nei Giardini Pubblici di Porta Venezia, una passeggiata nel Parco Sempione, un gelato oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in una pasticceria con un caffè.",
remind:"Per l'Ultima Cena di Leonardo serve un biglietto con orario, prenotato con settimane di anticipo. Il lunedì molti musei sono chiusi.",
rain1:"Al coperto: il Duomo, il Museo del Novecento, la Galleria, Sant'Ambrogio e la Pinacoteca di Brera.",
rainM:"Al coperto: Duomo, Pinacoteca di Brera, Museo del Novecento, Castello Sforzesco (musei) e Museo della Scala.",
water:"Riempite la borraccia alle «vedovelle», le fontanelle pubbliche milanesi: l'acqua è potabile. Attivate «Acqua» sulla mappa per vedere le più vicine.",
kitchen:"A Milano si pranza tra le 12:30 e le 14:30 e si cena dalle 19:30: molte trattorie chiudono tra i due servizi, guarda l'orario accanto a ogni locale.",
night:[["🍹","L'aperitivo è un rito: dalle 18:30 circa molti bar sui Navigli, a Brera e a Porta Venezia servono un drink con stuzzichini o un buffet."],["🕙","Le trattorie servono fino alle 22–22:30; la metro chiude intorno a mezzanotte e mezza (l'ora esatta cambia per linea, controlla su atm.it)."],["🥐","Molti bar aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire alle «vedovelle»)",
fuso:"Stesso fuso orario e stessa lingua: non serve adattatore né cambio",
plug:"Caricabatterie (la spina è quella italiana, nessun adattatore)",
foodNote:"I pasti sono stime per locali di quartiere: una colazione al banco costa pochi euro, un pranzo veloce circa 10–12 € e una cena intorno ai 20 € a persona. Milano è più cara di altre città italiane.",
taxNote:"L'imposta di soggiorno di Milano si paga a persona e a notte, fino a un massimo di notti consecutive; i bambini piccoli sono esenti. Gli importi qui sono indicativi e non verificati sul sito del Comune: controllali prima. Spesso non è compresa nel prezzo e si paga alla struttura.",
mcrit:"Criteri: locali storici e di quartiere, niente catene. Colazione al banco sotto i 5–6 €, cena sotto i 20–30 € a persona. Orari e prezzi di diversi locali sono quelli di guide e schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["I biglietti del Malpensa Express e dei bus per Bergamo si comprano meglio in anticipo online, per evitare le code agli sportelli.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietti dei mezzi: carta contactless ai tornelli o app ATM Milano (non esiste più il biglietto di carta)",function(E){return true}],["mxp","Biglietto Malpensa Express (15 €), comprato in aeroporto o con l'app Trenord",function(E){return E.cfg.to==="MXP"||E.cfg.rt==="MXP"}],["bgy","Biglietto del bus per Bergamo Orio al Serio, comprato online",function(E){return E.cfg.to==="BGY"||E.cfg.rt==="BGY"}],["duo","Biglietto del Duomo con terrazze (Duomo Pass da 22 €), da comprare online",["duomo"]],["cen","Biglietto con orario per l'Ultima Cena (cenacolovinciano.org)",["cenacolo"]],["bre","Biglietto per la Pinacoteca di Brera",["pinacoteca"]],["cash","Qualche euro in contanti per bar piccoli e mercatini"],["cov","Qualcosa per coprire spalle e ginocchia nelle chiese",["duomo","santambrogio"]]],
NUM:{1:["una persona","U-na per-SO-na"]},
PHR:function(){return [["Andiamo!","Andèm!","an-DEM"],["Vieni qui","Ven chì","ven KI"],["Signora / Signore","Sciùra / Sciùr","SCIU-ra / sciur"],["Ci penso io","Ghe pensi mì","ghe PEN-si mi"],["Che belli!","Oh bej! Oh bej!","o bei, o bei"],["Il panettone","El panetùn","el pa-ne-TUN"],["Tieni duro","Tegn dur","tegn dur"],["Uno che si dà delle arie","Un bauscia","un BAU-scia"],["Andiamo a mangiare","Andèm a mangià","an-DEM a man-GIA"],["Brava gente!","Bravi!","BRA-vi"]]},
PHN:"Un po' di milanese, per divertirsi e farsi capire dai più anziani: la prima riga è l'italiano, sotto c'è la versione di Milano. Non serve la voce: le parole si scrivono in modi diversi e la pronuncia cambia da zona a zona.",
taxTxt:function(tx){return "Imposta di soggiorno di Milano (importi indicativi, da confermare sul sito del Comune): "+(tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+"), per al massimo 14 notti consecutive":"non si paga se sei ospite di amici o parenti")+"."},
STAYTIPS:["La metro M1, M2, M3, M4 e M5 apre verso le 5:30 e chiude intorno a mezzanotte e mezza (con prolungamenti nel fine settimana): controlla gli orari su atm.it. Dopo ci sono i bus notturni."],
ZONES:[
["🚇 Metro, tram e biglietti",["Un solo biglietto vale su metro, tram e bus: l'ordinario costa 2,20 € (90 minuti, anche con cambi), il giornaliero 7,60 € e il 3 giorni 15,50 €.","Dal 1° gennaio 2026 il biglietto di carta non esiste più: si passa ai tornelli con la carta contactless, l'app ATM Milano o la tessera RicaricaMi.","La M4 (blu) collega Linate a San Babila in circa 12–15 minuti. Il Malpensa Express non è compreso nei biglietti ATM e costa 15 €.","I tram gialli d'epoca (come il 1 e il 2) passano per le vie del centro: sono comodi e belli."]],
["⛪ Duomo e Galleria",["Cattedrale e terrazze: prezzi da guide, da confermare su duomomilano.it. Spalle e ginocchia coperte; con pioggia o vento le terrazze possono chiudere.","Il Museo del Duomo è chiuso il mercoledì.","I ristoranti e i caffè intorno alla piazza e in Galleria sono i più cari: per un caffè scegli un bar nelle vie laterali.","Attenzione ai borseggiatori in Piazza Duomo e sul tram."]],
["🍷 Ultima Cena",["Biglietto da 15 €, solo su prenotazione (cenacolovinciano.org), chiuso il lunedì.","Le vendite si aprono a blocchi: ogni mercoledì alle 12 escono i posti della settimana successiva.","La visita dura 15 minuti: arriva almeno 30 minuti prima per ritirare il biglietto."],["cenacolo"]],
["🏰 Castello, Brera e Parco Sempione",["Il Castello ha i cortili liberi e gratuiti dalle 7 alle 19:30; i musei costano 10 € dal 10 maggio 2026 e la prima domenica del mese sono gratis.","La Pinacoteca di Brera è aperta dal martedì alla domenica; la terza domenica del mese c'è il mercatino dell'antiquariato.","Il Parco Sempione arriva fino all'Arco della Pace: porta l'acqua e fai una sosta sul prato."],["castello","brera","pinacoteca"]],
["🚤 Navigli",["Di giorno è tranquillo e fotogenico; l'aperitivo comincia verso le 18:30.","I locali con il menu in strada sono turistici: spostati nei vicoli o prenota.","L'ultima domenica del mese c'è il Mercatone dell'Antiquariato lungo il Naviglio Grande."],["navigli","colonne"]],
["🌅 Un giorno fuori Milano",["Il lago di Como si raggiunge in treno da Milano Cadorna o Centrale in circa un'ora.","Bergamo Alta, con le mura veneziane, è a un'ora di treno da Milano Centrale.","Pavia e la Certosa, in treno, sono a mezz'ora circa."]]],
WTIPS:["Le «vedovelle» (le fontanelle di ghisa verde sparse per Milano) danno acqua potabile e fresca: porta una borraccia e risparmi sulle bottigliette.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Al ristorante puoi chiedere l'acqua del rubinetto, ma di solito portano bottiglie a pagamento: se non la vuoi, dillo subito.","Le fontane monumentali non sono da bere."],
GEN:["Stessa lingua e stesso fuso orario, nessuna valuta da cambiare.","A Milano si pranza tra le 12:30 e le 14:30 e si cena dalle 19:30.","Il coperto (di solito 1,50–3 € a persona) è legale se segnato nel menu; la mancia non è obbligatoria.","Al bar, al banco si paga meno che al tavolo: prima si paga alla cassa, poi si porta lo scontrino al barista.","I borseggiatori lavorano su Piazza Duomo, sul tram 1 e nella metro M1: zaino davanti.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Numero unico di emergenza · <a class="call" href="tel:118">📞 118</a> Ambulanza</li><li>🚇 Metro, tram e bus, anche per oggetti smarriti: <a href="https://www.atm.it/" target="_blank" rel="noopener">atm.it</a> · treni regionali: <a href="https://www.trenord.it/" target="_blank" rel="noopener">trenord.it</a>.</li><li>🛡️ Per denunciare un furto: qualsiasi commissariato di Polizia di Stato o stazione dei Carabinieri.</li>',
STRK:'Al 13 ottobre 2026 lo sciopero ATM del 9 ottobre è passato e non ho trovato altri scioperi dei mezzi di Milano già proclamati; per i prossimi giorni controllate <a href="https://www.atm.it/" target="_blank" rel="noopener">atm.it</a> e, per i treni, <a href="https://www.trenord.it/" target="_blank" rel="noopener">trenord.it</a>. Gli scioperi nazionali sono elencati su <a href="https://scioperi.mit.gov.it/" target="_blank" rel="noopener">scioperi.mit.gov.it</a> (tra gli altri: 16 ottobre easyJet, 30 ottobre sciopero generale, 21–22 novembre controllori di volo ENAV).',
SKY:'<g class="sk-back" style="--k:0"><circle cx="252" cy="24" r="10"/><path d="M0 106 V92 L40 82 L70 88 L110 72 L150 86 L190 76 L230 90 L280 72 L330 86 L370 74 L400 88 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M12 106 V60 H20 V56 H24 V60 H34 V56 H38 V60 H46 V106 Z M23 60 V36 H35 V60 Z M21 36 L29 22 L37 36 Z M28.5 22 V8 H29.5 V22 Z"/></g>'+
'<g style="--k:2"><path d="M82 106 V56 H104 V106 Z M70 50 L82 56 H104 L116 50 V28 H70 Z M70 28 L93 18 L116 28 Z"/></g>'+
'<g style="--k:3"><path d="M146 106 V76 H254 V106 Z M174 76 L200 46 L226 76 Z M193 54 V30 H207 V54 Z M196 30 L200 8 L204 30 Z M156 76 V58 L157.5 50 L159 58 V76 Z M166 76 V54 L167.5 46 L169 54 V76 Z M231 76 V54 L232.5 46 L234 54 V76 Z M241 76 V58 L242.5 50 L244 58 V76 Z"/><circle cx="200" cy="6" r="1.8"/></g>'+
'<g style="--k:4"><path d="M274 106 V40 L284 14 H296 L306 40 V106 Z"/></g>'+
'<g style="--k:5"><path d="M326 106 V84 H378 V106 Z M340 84 V44 H364 V84 Z M338 44 Q352 26 366 44 Z M351 30 V4 H353 V30 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M78 36 H108 M78 44 H108"/><path d="M290 22 V104 M284 30 V104 M296 30 V104"/><path d="M148 82 v22 M160 82 v22 M172 82 v22 M184 82 v22 M196 82 v22 M208 82 v22 M220 82 v22 M232 82 v22 M244 82 v22"/><path d="M344 52 H360 M344 62 H360 M344 72 H360"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="200" cy="4" r="1.6"/><circle cx="132" cy="30" r="1.3"/><circle cx="318" cy="22" r="1.3"/><circle cx="58" cy="30" r="1.3"/><circle cx="388" cy="30" r="1.3"/><circle cx="226" cy="14" r="1.2"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.milano);

;var n=window.CITIES["milano"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["milano"]);
