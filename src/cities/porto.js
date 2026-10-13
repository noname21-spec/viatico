/* ===== Porto (dati verificati il 12 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.porto=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
OPO:{n:"Porto Francisco Sá Carneiro (OPO)",s:"Porto Francisco Sá Carneiro",url:"https://www.ana.pt/en/opo",live:"Porto",inMin:50,buf:120,pos:[41.2375,-8.6700],sd:"Aeroporto OPO · metro linea E",rt:"Dall'aeroporto: metro linea E (viola) fino a Trindade, poi linea D (gialla) fino a São Bento.",
 arr:"Dall'Italia non c'è il controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «Metro»: la stazione Aeroporto è proprio fuori dal terminal. Prendi la linea E (viola) verso Trindade (alcuni treni proseguono fino alla stazione ferroviaria di Campanhã, ma passano tutti da Trindade): circa 27 minuti, un treno ogni 15–20 minuti circa. A Trindade cambia con la linea D (gialla) in direzione Gaia e scendi a São Bento (circa 4 minuti). In tutto sono circa 45–50 minuti. Il metro funziona più o meno dalle 6 all'1 di notte (orari da controllare su metrodoporto.pt).",
 tk:"Biglietto: serve la carta ricaricabile Andante Azul (0,60 €, solo la prima volta) con un biglietto Z4 da 2,30 € (tariffa 2026): in tutto 2,90 € per la prima corsa. Si compra alle macchinette della stazione. Il biglietto Z4 vale 75 minuti dalla convalida e comprende il cambio a Trindade. Convalidalo alla macchinetta gialla prima di scendere ai binari. Prezzi da stampa portoghese (dicembre 2025) e guide, da controllare su metrodoporto.pt.",
 gm:"Aeroporto (Metro do Porto), Maia",
 tips:["Il bus STCP 601 o 602 arriva a Cordoaria, vicino alla Torre dos Clérigos, con lo stesso biglietto Z4 (circa 45–60 minuti): è più lento del metro (guida, da controllare su stcp.pt).","Il taxi per il centro ha il tassametro e costa di solito 25–35 € (supplemento 1,60 € per i bagagli grandi; di notte, nel fine settimana e nei festivi circa il 20% in più). Uber e Bolt costano di solito 15–22 € (guida aggiornata a ottobre 2026).","Con un volo notturno: il bus notturno 3M parte dall'aeroporto ogni ora al minuto 30, dalle 00:30 alle 05:30 (2,30 €; orari da controllare su stcp.pt)."]}
};
/* linee (tracciati indicativi) */
var SEG={
e:{c:"#8e3ba5",n:"Metro linea E (viola)",p:[[41.2372,-8.6697,"Aeroporto",2],[41.1588,-8.6307,"Casa da Música"],[41.1523,-8.6093,"Trindade",2]]},
d:{c:"#e8b800",n:"Metro linea D (gialla)",p:[[41.1386,-8.6058,"Jardim do Morro",2],[41.1405,-8.6090,"Ponte Luís I"],[41.1456,-8.6105,"São Bento",2],[41.1480,-8.6110,"Aliados"],[41.1523,-8.6093,"Trindade",2]]}
};
var START=[41.1456,-8.6105];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
saobento:{t:"Stazione di São Bento e Avenida dos Aliados",z:"A",p:2,min:30,id:45,max:70,pos:[41.1470,-8.6108],q:"Estação de São Bento, Porto",cls:"walk",
 d:"La stazione ferroviaria più bella del Portogallo: la grande sala d'ingresso è coperta da migliaia di piastrelle azzurre e bianche (azulejos) che raccontano scene di storia del paese. Poco sopra c'è l'Avenida dos Aliados, il viale con il Municipio, il cuore civile della città.",
 m:"L'ingresso nella sala degli azulejos è gratuito, perché è l'atrio di una stazione in funzione: gli orari esatti non li ho verificati (da controllare). Il Municipio e il viale si vedono da fuori."},
lello:{t:"Livraria Lello",z:"A",p:3,min:40,id:55,max:80,pos:[41.14672,-8.61488],q:"Livraria Lello, Porto",cls:"",tk:[8,"Livraria Lello (circa 8 €, da controllare)",1,1],
 win:function(){return[9*60,19*60+30]},
 d:"La libreria più famosa di Porto, aperta nel 1906: facciata neogotica, pareti di legno intagliato, soffitto di vetro colorato e una scala rossa a due rampe. Dentro si vendono libri, ma per entrare serve un biglietto.",
 m:"Aperta ogni giorno 9–19:30 (sito ufficiale, letto il 12 ottobre 2026); secondo le guide chiusa il 1° gennaio, a Pasqua, il 1° maggio, il 24 giugno e il 25 dicembre. Il biglietto è un buono che si può usare per comprare un libro: il prezzo base era di 8 € nel settembre 2024 (Time Out), oggi può essere diverso: controlla su livrarialello.pt. Compralo online con un orario preciso (vale fino a 60 minuti dopo), altrimenti si fa una lunga fila. Zaini e borse grandi non sono ammessi."},
clerigos:{t:"Torre dos Clérigos",z:"A",p:2,min:40,id:55,max:80,pos:[41.14567,-8.6146],q:"Torre dos Clérigos, Porto",cls:"",sun:1,tk:[10,"Torre dos Clérigos (8–10 €)",1,1],
 win:function(){return[9*60,18*60+30]},
 d:"Il simbolo di Porto: la torre barocca alta circa 75 metri, disegnata da Nicolau Nasoni nel Settecento, accanto alla chiesa a pianta ovale. Dopo circa 200 gradini si arriva in cima, con la vista su tutto il centro e sul fiume.",
 m:"Biglietto torre e museo: le guide danno 8–10 € (10 € secondo e-konomista.pt, giugno 2025; circa 8 € secondo dicadeportugal.com, agosto 2026); fino a 10 anni gratis: controlla su torredosclerigos.pt. Orario di solito 9–19, ultimo ingresso 18:30 (una guida non datata). Non c'è l'ascensore. La navata della chiesa, secondo le guide, si visita gratis."},
bolsa:{t:"Palácio da Bolsa e Igreja de São Francisco",z:"B",p:2,min:90,id:110,max:140,pos:[41.1412,-8.6153],q:"Palácio da Bolsa, Porto",cls:"",tk:[14,"Palácio da Bolsa (14 €)",1,1],
 win:function(){return[9*60,18*60]},
 d:"L'ex Borsa ottocentesca: dentro si entra solo con una visita guidata di circa 30–45 minuti. Il pezzo forte è il Salão Árabe, un salone ispirato all'Alhambra, pieno di stucchi dorati. Accanto c'è la chiesa di São Francisco, gotica fuori e barocca dentro, con altari coperti d'oro.",
 m:"Palácio da Bolsa 14 € (studenti e anziani 9,50 €; bambini sotto i 12 anni accompagnati gratis; dicadeportugal.com, aggiornato ad agosto 2026). Solo visita guidata a orari fissi, in portoghese, spagnolo, francese e inglese: arriva 10 minuti prima, perché i ritardatari non entrano (sito di Visit Porto). Orario indicativo: da aprile a ottobre circa 9–19, da novembre a marzo 9–13 e 14–18: controlla su palaciodabolsa.com. Igreja de São Francisco: 9 € (visitporto.travel); aperta circa 9–20, ma da novembre a febbraio 9–18."},
ribeira:{t:"Ribeira e Ponte Luís I",z:"B",p:1,min:60,id:90,max:130,pos:[41.1406,-8.6130],q:"Cais da Ribeira, Porto",cls:"walk",sun:1,
 d:"Il quartiere sul fiume, patrimonio dell'umanità: case alte e colorate, portici, tavolini sulla banchina e le barche rabelo, quelle che un tempo portavano il vino. Sopra la Ribeira si alza la Ponte Luís I, il grande ponte di ferro a due piani, aperto nel 1886.",
 m:"Si cammina gratis. Per salire alla parte alta della città c'è il funicolare dos Guindais (circa 3 € a corsa, non compreso nell'Andante; guida di aprile 2026, da controllare) oppure le scale ripide. Sul piano alto del ponte passano il metro D e i pedoni: il vento può essere forte. I ristoranti con i menù fuori sulla banchina sono i più cari."},
se:{t:"Sé do Porto e il belvedere sul fiume",z:"B",p:3,min:45,id:60,max:90,pos:[41.1430,-8.6113],q:"Sé do Porto, Porto",cls:"",sun:1,
 win:function(wd,d){var m=+String(d||"").slice(5,7);return[9*60,(m>=11||m<=3)?17*60+30:18*60+30]},
 d:"La cattedrale romanica del XII secolo, con l'aspetto di una fortezza, sulla collina sopra il fiume. Dentro, il chiostro gotico è rivestito di azulejos del Settecento; dal grande piazzale davanti si vede tutta la Ribeira.",
 m:"La chiesa si visita per lo più gratis; il biglietto per il chiostro e le altre parti costa circa 3 € (portoalities.com, 2020 e 2023: da controllare). Orario indicativo: 9–18:30 da aprile a ottobre, 9–17:30 da novembre a marzo; chiusa a Natale e a Pasqua."},
gaia:{t:"Cantine del vino di Porto a Vila Nova de Gaia",z:"D",p:1,min:100,id:130,max:180,pos:[41.1388,-8.6125],q:"Cais de Gaia, Vila Nova de Gaia",cls:"",sun:1,tk:[25,"Cantina del vino di Porto con degustazione (da 25 €)",1,1],
 win:function(){return[10*60,18*60]},
 d:"Sull'altra riva del Douro, a Vila Nova de Gaia, ci sono i grandi magazzini dove il vino di Porto invecchia nelle botti. Le cantine fanno una visita guidata di circa un'ora con la degustazione di due o tre vini; dal lungofiume si vede tutta la Ribeira.",
 m:"Prezzi e orari da portoalities.com (aprile 2026), da controllare sui siti delle cantine: Taylor's 25 € con audioguida e due vini, aperta 10–19 (ultima visita alle 18); Cálem da circa 22 €, 10–19; Graham's da 30 €, 10–17:30 da aprile a ottobre e un po' prima in inverno; Ferreira da circa 23 €, 10–12:30 e 14–18. Prenota online da aprile a ottobre e nei fine settimana: le visite in inglese si esauriscono per prime. Si attraversa a piedi il piano basso del ponte (circa 15 minuti dalla Ribeira). La funivia di Gaia costa circa 6–10 € secondo le fonti, che non concordano: controlla su gaiacablecar.com; si ferma con il vento forte."},
bolhao:{t:"Mercado do Bolhão e Rua de Santa Catarina",z:"C",p:3,min:60,id:80,max:110,pos:[41.1488,-8.6070],q:"Mercado do Bolhão, Porto",cls:"walk",cl:[6],
 win:function(wd){return[8*60,(wd===5?18:20)*60]},
 d:"Il mercato coperto più amato dai portuensi, in stile neoclassico, restaurato e riaperto nel 2022: banchi di frutta, pesce, formaggi, fiori e dolci. Appena fuori c'è la Rua de Santa Catarina, la via pedonale dei negozi, con lo storico Café Majestic.",
 m:"Si entra gratis. Orari dal sito del mercato: lunedì–venerdì 8–20, sabato 8–18; chiuso la domenica e nei giorni festivi. I ristoranti del piano superiore restano aperti fino a mezzanotte (lunedì–sabato). I banchi del pesce e della frutta sono più vivaci la mattina."},
serralves:{t:"Fundação de Serralves",z:"E",p:4,min:150,id:180,max:240,pos:[41.1595,-8.6590],q:"Fundação de Serralves, Porto",cls:"",multi:1,tk:[24,"Fundação de Serralves, biglietto completo (24 €)"],
 win:function(wd,d){var m=+String(d||"").slice(5,7),w=(m>=10||m<=3);return[10*60,(wd>=5?(w?19:20):(w?18:19))*60]},
 d:"Un grande parco con il museo d'arte contemporanea e una villa rosa in stile Art Déco, circondati da giardini, un laghetto e un percorso sospeso tra le cime degli alberi. È un posto tranquillo, lontano dal centro.",
 m:"Biglietto completo (museo, villa, parco, casa del cinema) 24 €; solo parco 15 € (eurodicas.com.br e dicadeportugal.com, aggiornato ad agosto 2026). Da ottobre a marzo: lunedì–venerdì 10–18, sabato, domenica e festivi 10–19; da aprile a settembre un'ora in più. Chiuso il 25 dicembre e il 1° gennaio; il 24 e il 31 dicembre chiude alle 16. Secondo il portale turistico dell'area metropolitana (iPorto) non c'è un giorno di chiusura settimanale; alcune guide parlano di una chiusura il lunedì o il martedì, quindi controlla su serralves.pt. Fino a gennaio 2027 ci sono le mostre di Jenny Holzer, Lee Ufan e Alice Neel (dn.pt)."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","saobento",5,"walk","A piedi dalla stazione di São Bento: si esce dalla sala degli azulejos e si sale per l'Avenida dos Aliados, circa 5 minuti.","A piedi in discesa dall'Avenida dos Aliados fino alla stazione di São Bento, circa 5 minuti.",{f:[W([[41.1456,-8.6105],[41.1463,-8.6107],[41.1470,-8.6108]])],r:[W([[41.1470,-8.6108],[41.1463,-8.6107],[41.1456,-8.6105]])]});
P2("start","lello",9,"walk","A piedi in salita da São Bento per la Rua das Carmelitas fino alla Livraria Lello, circa 9 minuti.","A piedi in discesa fino a São Bento, circa 9 minuti.",{f:[W([[41.1456,-8.6105],[41.1462,-8.6130],[41.14672,-8.61488]])],r:[W([[41.14672,-8.61488],[41.1462,-8.6130],[41.1456,-8.6105]])]});
P2("start","clerigos",8,"walk","A piedi in salita da São Bento fino alla Torre dos Clérigos, circa 8 minuti.","A piedi in discesa fino a São Bento, circa 8 minuti.",{f:[W([[41.1456,-8.6105],[41.1458,-8.6128],[41.14567,-8.6146]])],r:[W([[41.14567,-8.6146],[41.1458,-8.6128],[41.1456,-8.6105]])]});
P2("saobento","lello",8,"walk","A piedi per la Rua dos Clérigos fino alla Livraria Lello, circa 8 minuti.","A piedi fino all'Avenida dos Aliados, circa 8 minuti.",{f:[W([[41.1470,-8.6108],[41.1468,-8.6130],[41.14672,-8.61488]])],r:[W([[41.14672,-8.61488],[41.1468,-8.6130],[41.1470,-8.6108]])]});
P2("saobento","clerigos",8,"walk","A piedi dall'Avenida dos Aliados fino alla Torre dos Clérigos, circa 8 minuti.","A piedi fino all'Avenida dos Aliados, circa 8 minuti.",{f:[W([[41.1470,-8.6108],[41.1463,-8.6128],[41.14567,-8.6146]])],r:[W([[41.14567,-8.6146],[41.1463,-8.6128],[41.1470,-8.6108]])]});
P2("lello","clerigos",3,"walk","A piedi, appena 3 minuti, dalla Livraria Lello alla Torre dos Clérigos.","A piedi, appena 3 minuti, dalla Torre dos Clérigos alla Livraria Lello.",{f:[W([[41.14672,-8.61488],[41.14567,-8.6146]])],r:[W([[41.14567,-8.6146],[41.14672,-8.61488]])]});
P2("clerigos","bolsa",10,"walk","A piedi in discesa verso il fiume fino al Palácio da Bolsa, circa 10 minuti.","A piedi in salita dal Palácio da Bolsa fino alla Torre dos Clérigos, circa 12 minuti.",{f:[W([[41.14567,-8.6146],[41.1435,-8.6152],[41.1412,-8.6153]])],r:[W([[41.1412,-8.6153],[41.1435,-8.6152],[41.14567,-8.6146]])]});
P2("lello","bolsa",11,"walk","A piedi in discesa verso il fiume fino al Palácio da Bolsa, circa 11 minuti.","A piedi in salita fino alla Livraria Lello, circa 13 minuti.",{f:[W([[41.14672,-8.61488],[41.1440,-8.6152],[41.1412,-8.6153]])],r:[W([[41.1412,-8.6153],[41.1440,-8.6152],[41.14672,-8.61488]])]});
P2("start","bolsa",10,"walk","A piedi da São Bento per la Rua das Flores fino al Palácio da Bolsa, circa 10 minuti.","A piedi per la Rua das Flores fino a São Bento, in salita, circa 12 minuti.",{f:[W([[41.1456,-8.6105],[41.1435,-8.6128],[41.1412,-8.6153]])],r:[W([[41.1412,-8.6153],[41.1435,-8.6128],[41.1456,-8.6105]])]});
P2("bolsa","ribeira",5,"walk","A piedi in discesa dal Palácio da Bolsa fino al lungofiume della Ribeira, circa 5 minuti.","A piedi in salita dalla Ribeira fino al Palácio da Bolsa, circa 6 minuti.",{f:[W([[41.1412,-8.6153],[41.1409,-8.6140],[41.1406,-8.6130]])],r:[W([[41.1406,-8.6130],[41.1409,-8.6140],[41.1412,-8.6153]])]});
P2("start","ribeira",13,"walk","A piedi in discesa da São Bento per la Rua das Flores e le vie ripide fino alla Ribeira, circa 13 minuti.","A piedi in salita dalla Ribeira fino a São Bento, circa 18 minuti.",{f:[W([[41.1456,-8.6105],[41.1435,-8.6118],[41.1420,-8.6125],[41.1406,-8.6130]])],r:[W([[41.1406,-8.6130],[41.1420,-8.6125],[41.1435,-8.6118],[41.1456,-8.6105]])]});
P2("ribeira","se",11,"walk","A piedi in salita dalla Ribeira per le scale fino al piazzale della Sé, circa 11 minuti.","A piedi in discesa dalla Sé fino alla Ribeira, circa 8 minuti.",{f:[W([[41.1406,-8.6130],[41.1418,-8.6120],[41.1430,-8.6113]])],r:[W([[41.1430,-8.6113],[41.1418,-8.6120],[41.1406,-8.6130]])]});
P2("start","se",8,"walk","A piedi in salita da São Bento fino alla cattedrale, circa 8 minuti.","A piedi in discesa dalla Sé fino a São Bento, circa 8 minuti.",{f:[W([[41.1456,-8.6105],[41.1443,-8.6108],[41.1430,-8.6113]])],r:[W([[41.1430,-8.6113],[41.1443,-8.6108],[41.1456,-8.6105]])]});
P2("bolsa","se",11,"walk","A piedi in salita dal Palácio da Bolsa fino alla Sé, circa 11 minuti.","A piedi in discesa dalla Sé fino al Palácio da Bolsa, circa 10 minuti.",{f:[W([[41.1412,-8.6153],[41.1420,-8.6130],[41.1430,-8.6113]])],r:[W([[41.1430,-8.6113],[41.1420,-8.6130],[41.1412,-8.6153]])]});
P2("ribeira","gaia",15,"walk","A piedi sul piano basso della Ponte Luís I fino alle cantine sul lungofiume di Gaia, circa 15 minuti.","A piedi sul piano basso della Ponte Luís I fino alla Ribeira, circa 15 minuti.",{f:[W([[41.1406,-8.6130],[41.1403,-8.6100],[41.1395,-8.6105],[41.1388,-8.6125]])],r:[W([[41.1388,-8.6125],[41.1395,-8.6105],[41.1403,-8.6100],[41.1406,-8.6130]])]});
P2("se","gaia",20,"walk","A piedi dal piazzale della Sé al piano alto della Ponte Luís I (3 minuti), poi si attraversa il ponte e si scende per le scale e le stradine fino al lungofiume di Gaia: circa 20 minuti.","A piedi dal lungofiume di Gaia si risale (o con la funivia) fino al piano alto del ponte e si attraversa fino alla Sé: circa 25 minuti.",{f:[W([[41.1430,-8.6113],[41.1420,-8.6105],[41.1405,-8.6094],[41.1395,-8.6100],[41.1388,-8.6125]])],r:[W([[41.1388,-8.6125],[41.1395,-8.6100],[41.1405,-8.6094],[41.1420,-8.6105],[41.1430,-8.6113]])]});
P2("start","gaia",25,"metro","Dalla stazione di São Bento metro D in direzione Gaia fino a Jardim do Morro (una fermata, 3 minuti: si attraversa il ponte sul piano alto), poi a piedi in discesa verso il lungofiume e le cantine, circa 15 minuti. In alternativa a piedi per la Ribeira, circa 30 minuti.","Si risale a piedi (o con la funivia) fino a Jardim do Morro e si prende il metro D fino a São Bento, circa 25 minuti.",{f:[["d","São Bento","Jardim do Morro"],W([[41.1386,-8.6058],[41.1388,-8.6090],[41.1388,-8.6125]])],r:[W([[41.1388,-8.6125],[41.1388,-8.6090],[41.1386,-8.6058]]),["d","Jardim do Morro","São Bento"]]});
P2("saobento","bolhao",9,"walk","A piedi per le vie dei negozi dall'Avenida dos Aliados fino al Mercado do Bolhão, circa 9 minuti.","A piedi fino all'Avenida dos Aliados, circa 9 minuti.",{f:[W([[41.1470,-8.6108],[41.1480,-8.6090],[41.1488,-8.6070]])],r:[W([[41.1488,-8.6070],[41.1480,-8.6090],[41.1470,-8.6108]])]});
P2("start","bolhao",11,"walk","A piedi da São Bento per l'Avenida dos Aliados fino al Mercado do Bolhão, circa 11 minuti.","A piedi fino a São Bento, circa 11 minuti.",{f:[W([[41.1456,-8.6105],[41.1470,-8.6100],[41.1488,-8.6070]])],r:[W([[41.1488,-8.6070],[41.1470,-8.6100],[41.1456,-8.6105]])]});
P2("bolhao","clerigos",12,"walk","A piedi dal Bolhão verso ovest fino alla Torre dos Clérigos, circa 12 minuti.","A piedi dalla Torre dos Clérigos fino al Mercado do Bolhão, circa 12 minuti.",{f:[W([[41.1488,-8.6070],[41.1475,-8.6110],[41.14567,-8.6146]])],r:[W([[41.14567,-8.6146],[41.1475,-8.6110],[41.1488,-8.6070]])]});
P2("bolhao","lello",13,"walk","A piedi dal Bolhão fino alla Livraria Lello, circa 13 minuti.","A piedi dalla Livraria Lello fino al Mercado do Bolhão, circa 13 minuti.",{f:[W([[41.1488,-8.6070],[41.1478,-8.6110],[41.14672,-8.61488]])],r:[W([[41.14672,-8.61488],[41.1478,-8.6110],[41.1488,-8.6070]])]});
P2("start","serralves",40,"metro","Da São Bento metro D fino a Trindade, poi una linea verso Casa da Música (linee A, B, C, E, F), e da lì autobus, taxi o una camminata di circa 30 minuti fino a Serralves: in tutto circa 40 minuti. Google Maps ti indica la combinazione migliore.","Da Serralves a Casa da Música (autobus, taxi o a piedi), poi metro fino a Trindade e linea D fino a São Bento: circa 40 minuti.",{f:[W([[41.1456,-8.6105],[41.1523,-8.6093]]),["e","Trindade","Casa da Música"],W([[41.1588,-8.6307],[41.1595,-8.6590]])],r:[W([[41.1595,-8.6590],[41.1588,-8.6307]]),["e","Casa da Música","Trindade"],W([[41.1523,-8.6093],[41.1456,-8.6105]])]});
/* ritorno in aeroporto: metro D fino a Trindade e linea E */
var RET={
OPO:{
 A:{min:45,txt:"Metro linea D (gialla) da São Bento a Trindade (circa 4 minuti), cambio con la linea E (viola) fino a Aeroporto (circa 27 minuti, un treno ogni 15–20 minuti circa). Biglietto Z4 da 2,30 € (più 0,60 € per la carta Andante la prima volta). Il metro gira più o meno dalle 6 all'1 di notte: se voli presto controlla gli orari su metrodoporto.pt oppure usa il taxi.",g:[["d","São Bento","Trindade"],["e","Trindade","Aeroporto"]]}}
};
var ARR={
OPO:[["e","Aeroporto","Trindade"],["d","Trindade","São Bento"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari, valutazioni e posizioni dalle schede di Google Maps (12 ottobre 2026); prezzi da guide, da confermare */
var V={
padaria:{n:"Padaria Ribeiro",a:"Praça de Guilherme Gomes Fernandes 21",z:"A",r:"4,2",pos:[41.14756,-8.61495],h:D7("08:00-20:00"),
 d:"Un forno e pasticceria aperto dal 1878, a due passi dalla Torre dos Clérigos: pastéis de nata, dolci di mandorle, salatini come i rissóis di gamberi e un buon caffè, al banco o ai tavolini.",pr:"Un caffè con un pastel de nata sta intorno ai 2–3 € (listino non visto). Orari dalla scheda Google, da confermare."},
piolho:{n:"Café Piolho",a:"Praça de Parada Leitão 45",z:"A",r:"4,2",pos:[41.14684,-8.61656],h:["08:00-02:00","08:00-02:00","08:00-02:00","08:00-02:00","08:00-02:00","08:00-02:00",""],
 d:"Il caffè degli studenti, aperto dal 1909 davanti all'università, tra la Torre dos Clérigos e i giardini della Cordoaria: panini, francesinha, cachorrinho e birra a prezzi bassi, in un'atmosfera da vecchio caffè di quartiere. Resta aperto fino a tardi.",pr:"Un panino o un piatto semplice sta di solito sotto i 10 € (listino non visto). Chiuso la domenica."},
conga:{n:"Conga – Casa das Bifanas",a:"Rua do Bonjardim 318",z:"A",r:"4,4",pos:[41.14894,-8.60938],h:["11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00","11:30-22:00",""],
 d:"La casa delle bifanas di Porto: il panino con la fetta di maiale cotta a lungo in una salsa piccante, servito caldo e grondante. Locale semplice e rumoroso su due piani, pieno di portuensi; la coda all'ora di pranzo scorre in fretta.",pr:"Una bifana costa circa 3,50 € e una birra piccola 1,50 € (guida di maggio 2026). Chiuso la domenica."},
candelabro:{n:"Café Candelabro",a:"Rua da Conceição 3",z:"A",r:"4,5",pos:[41.14995,-8.61318],h:D7("12:00-23:59"),
 d:"Una libreria-caffè diventata un ritrovo serale dei portuensi, in una piazzetta vicino a Praça Carlos Alberto: vecchi libri alle pareti, vino al calice a prezzi onesti, piccoli piatti e buona musica.",pr:"Un calice di vino con un piattino sta intorno ai 6–12 € (listino non visto). Orari dalla scheda Google, da confermare."},
santiago:{n:"Café Santiago",a:"Rua de Passos Manuel 226",z:"C",r:"4,4",pos:[41.14638,-8.60483],h:["12:00-22:45","12:00-22:45","12:00-22:45","12:00-22:45","12:00-22:45","12:00-22:45",""],
 d:"Il locale più famoso per la francesinha, il panino-simbolo di Porto: pane, bistecca, salsiccia e prosciutto, coperti di formaggio fuso e di una salsa piccante di birra e pomodoro, spesso con un uovo sopra e le patatine. Una porzione basta quasi per due.",pr:"Una francesinha costa di solito 12–16 € (listino non visto). Chiuso la domenica; spesso c'è coda all'ora di cena."},
guedes:{n:"Casa Guedes Tradicional",a:"Praça dos Poveiros 130",z:"C",r:"4,5",pos:[41.14602,-8.60349],h:["11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:59","11:00-23:59","11:00-23:59"],
 d:"La taverna del panino di pernil, la coscia di maiale arrosto tagliata sottile, da solo o con il formaggio di pecora della Serra da Estrela. Si mangia ai tavoli o sulla piazza; ci sono anche piatti caldi e salumi del nord.",pr:"Il panino di pernil classico costa circa 5–6 € (guida di maggio 2026). Gli antipasti che portano al tavolo si pagano: se non li vuoi, rimandali indietro."},
majestic:{n:"Café Majestic",a:"Rua de Santa Catarina 112",z:"C",r:"4,1",pos:[41.14718,-8.6066],h:["09:00-23:00","09:00-23:00","09:00-23:00","09:00-23:00","09:00-23:00","09:00-23:00",""],
 d:"Il caffè storico di Porto, aperto nel 1921 sulla via pedonale dei negozi: sale con specchi, stucchi dorati e tavolini di marmo, a volte con il pianoforte. Si viene per l'atmosfera: è molto più caro della media.",pr:"Un caffè con latte arriva a circa 7 € e un dolce con il caffè supera i 10 € (recensioni recenti, listino non visto). Chiuso la domenica."},
bolhaoconf:{n:"Confeitaria do Bolhão",a:"Rua Formosa 339",z:"C",r:"4,3",pos:[41.14853,-8.60755],h:["06:00-20:00","06:00-20:00","06:00-20:00","06:00-20:00","06:00-20:00","06:00-19:00",""],
 d:"Una pasticceria storica del 1896 accanto al mercato, sempre piena di portuensi: dolci di uova, bolas de Berlim, pastéis de bacalhau e toast. Si sceglie al banco, si riceve un biglietto e si paga alla cassa vicino alla porta.",pr:"Un caffè con un dolce sta sotto i 5 € (listino non visto). Chiuso la domenica."},
padeirinha:{n:"Padeirinha Doce",a:"Rua de Augusto Rosa 46",z:"B",r:"4,5",pos:[41.14364,-8.60772],h:["06:30-20:00","06:30-20:00","06:30-20:00","06:30-20:00","06:30-20:00","06:30-20:00",""],
 d:"Una pasticceria di quartiere tra la Sé e la Batalha, frequentata dai portuensi: pastéis de nata generosi, toast, uova e caffè a prezzi bassi, e a pranzo anche la francesinha.",pr:"Un caffè con un pastel de nata sta intorno ai 2–3 € (listino non visto). Chiuso la domenica."},
cantina32:{n:"Cantina 32",a:"Rua das Flores 32",z:"B",r:"4,3",pos:[41.14354,-8.61421],h:["12:30-15:00,18:30-22:00","12:30-15:00,18:30-22:00","12:30-15:00,18:30-22:00","12:30-15:00,18:30-22:00","12:30-15:00,18:30-22:30","12:30-15:00,18:30-22:30",""],
 d:"Un ristorante informale sulla Rua das Flores, la via pedonale che scende verso la Ribeira: piatti portoghesi rivisitati da dividere, come il polpo intero, i calamari alla griglia e una francesinha della casa. Si riempie in fretta: arriva all'apertura o prenota.",pr:"Più caro delle tasche: tra antipasti e un piatto si spendono di solito 20–30 € a testa (listino non visto). Chiuso la domenica."},
adega:{n:"Adega São Nicolau",a:"Rua de São Nicolau 1",z:"B",r:"4,3",pos:[41.14043,-8.6149],h:["12:00-22:30","12:00-22:30","12:00-22:30","12:00-22:30","12:00-22:30","12:00-22:30",""],
 d:"Una taverna tradizionale in un vicolo a scalini sopra la banchina della Ribeira, con i tavolini all'aperto e la vista sul ponte: sardine e branzino alla griglia, filetti di polpo con il riso, baccalà. A cena di solito c'è coda.",pr:"Un piatto sta di solito sui 12–18 € (listino non visto). Chiuso la domenica."},
saogoncalo:{n:"Adega São Gonçalo",a:"Rua Oliveira Barros 149, Vila Nova de Gaia",z:"D",r:"4,8",pos:[41.13836,-8.62697],h:["","12:00-19:30","12:00-19:30","12:00-19:30","12:00-19:30","12:00-19:30",""],
 d:"Una piccola osteria di quartiere a Gaia, a dieci minuti a piedi dalle cantine e lontana dal lungofiume turistico: panini con il prosciutto stagionato in casa, prego, taglieri di formaggi e salumi e il vino della casa, in mezzo alla gente del posto.",pr:"Un panino o un tagliere con un bicchiere di vino sta intorno ai 8–12 € (recensioni, listino non visto). Aperto da martedì a sabato, solo fino alle 19:30."},
toca:{n:"Toca d'Avenida",a:"Avenida da França 84",z:"E",r:"4,6",pos:[41.15968,-8.62843],h:["09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00",""],
 d:"Un ristorante di quartiere strettissimo, a pochi passi dalla Casa da Música: ogni giorno tre piatti portoghesi fissi, porzioni abbondanti, una caraffa di vino e clienti quasi tutti del posto. Accetta solo contanti.",pr:"Un piatto del giorno sta di solito sotto i 10–12 € (listino non visto). Chiuso la domenica; solo contanti."},
rotunda:{n:"Churrasqueira Rotunda da Boavista",a:"Praça de Mouzinho de Albuquerque 153",z:"E",r:"4,1",pos:[41.15689,-8.62997],h:D7("10:00-22:30"),
 d:"Una griglieria tradizionale sulla grande rotonda della Boavista, frequentata soprattutto dai portuensi: picanha, costine, pollo alla brace e baccalà, con riso, fagioli neri e insalata. Le porzioni per una persona sono grandi.",pr:"Un piatto alla brace sta di solito sui 10–16 € (listino non visto). Gli assaggi portati al tavolo si pagano."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["padaria","piolho","bolhaoconf"],B:["padeirinha","padaria"],C:["bolhaoconf","majestic","padeirinha"],D:["padeirinha","bolhaoconf"],E:["toca","padaria"]},
pra:{A:["conga","piolho","guedes"],B:["adega","padeirinha","cantina32"],C:["conga","guedes","santiago"],D:["saogoncalo","adega"],E:["toca","rotunda"]},
cen:{A:["guedes","santiago","candelabro"],B:["adega","cantina32","guedes"],C:["santiago","guedes","conga"],D:["adega","cantina32"],E:["rotunda","santiago"]},
snk:{A:["padaria","candelabro","piolho"],B:["padeirinha","padaria"],C:["bolhaoconf","majestic"],D:["saogoncalo","padeirinha"],E:["toca","padaria"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"ribeira",t:"Palácio da Bolsa, Ribeira e Sé",acts:["bolsa","ribeira","se"],need:230,core:1},
{id:"gaia",t:"Cantine del vino di Porto a Gaia",acts:["gaia"],need:140,core:1},
{id:"centro",t:"São Bento, Livraria Lello e Torre dos Clérigos",acts:["saobento","lello","clerigos","bolhao"],need:210,core:1},
{id:"serralves",t:"Fundação de Serralves",acts:["serralves"],need:210}
];
var ORDER=["saobento","lello","clerigos","bolhao","bolsa","ribeira","se","gaia","serralves"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["baixa","Baixa / Aliados / Clérigos",[41.1465,-8.6115],"A"],
["ribeira","Ribeira / Sé / Miragaia",[41.1415,-8.6130],"B"],
["bolhao","Bolhão / Santa Catarina",[41.1485,-8.6075],"C"],
["gaia","Vila Nova de Gaia",[41.1370,-8.6130],"D"],
["boavista","Boavista / Casa da Música",[41.1580,-8.6300],"E"],
["altro","Altra zona (scrivi l'indirizzo)",[41.1470,-8.6110],""]
];
/* tassa di soggiorno: 3 € a persona e a notte, per le prime 7 notti */
var TAX=[["h5","Hotel 4–5 stelle",3],["h3","Hotel fino a 3 stelle, B&B o appartamento",3],["host","Ostello o struttura economica",3],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Cimbalino e pastel de nata","un espresso (a Porto lo chiamano «cimbalino») e il dolcetto alla crema."],["Galão e torrada","caffè lungo con latte in bicchiere alto e pane tostato con burro."],["Un dolce di forno","una fetta di pão de ló o un dolce di uova della pasticceria."]],
pra:[["Francesinha","il panino-simbolo di Porto: carne e salsiccia, formaggio fuso e salsa piccante, spesso con un uovo."],["Bifana","panino con la fetta di maiale marinata."],["Prato do dia","il piatto del giorno: carne o pesce con riso e patate."],["Tripas à moda do Porto","trippa con fagioli, il piatto tradizionale dei portuensi."]],
cen:[["Bacalhau à Gomes de Sá","baccalà con patate, cipolla e uova, un piatto nato a Porto."],["Polvo grelhado","polpo alla griglia con patate."],["Petiscos","assaggi da dividere: formaggi, salumi, croquettes e baccalà."],["Peixe grelhado","pesce alla griglia con patate e verdure."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Stazione di São Bento","Foto","La sala d'ingresso rivestita di azulejos azzurri e bianchi: la luce migliore è a metà mattina.",[41.1456,-8.6105],"Estação de São Bento, Porto","saobento"],
["🤳","La scala di Livraria Lello","Selfie","La scala rossa a due rampe sotto il soffitto di vetro colorato: arriva all'apertura per trovare meno gente.",[41.14672,-8.61488],"Livraria Lello, Porto","lello"],
["📷","La Torre dos Clérigos","Foto","La torre barocca vista dalla Rua dos Clérigos o dai giardini della Cordoaria.",[41.14567,-8.6146],"Torre dos Clérigos, Porto","clerigos"],
["📷","Il Salão Árabe","Foto","Il salone di stucchi dorati del Palácio da Bolsa: durante la visita guidata chiedi alla guida se si può fotografare.",[41.1412,-8.6153],"Palácio da Bolsa, Porto","bolsa"],
["📷","La Ribeira dal lungofiume","Foto","Le case colorate e i portici sulla banchina, con il ponte alle spalle: più bella al mattino o al tramonto.",[41.1406,-8.6130],"Cais da Ribeira, Porto","ribeira"],
["🤳","La Ponte Luís I dal piano alto","Selfie","Camminando sul piano alto si vedono il fiume, la Ribeira e le cantine di Gaia: tieni salda la borsa e il telefono.",[41.1405,-8.6094],"Ponte Luís I, Porto","ribeira"],
["📷","Il piazzale della Sé","Foto","Dal grande piazzale davanti alla cattedrale si vedono i tetti rossi della Ribeira e il fiume.",[41.1430,-8.6113],"Sé do Porto, Porto","se"],
["📷","Il chiostro della Sé","Foto","Le pareti del chiostro gotico rivestite di azulejos del Settecento.",[41.1431,-8.6112],"Sé do Porto, Porto","se"],
["📷","Le barche rabelo","Foto","Le barche a vela quadrata ormeggiate di fronte alle cantine, con la Ribeira sullo sfondo.",[41.1390,-8.6120],"Cais de Gaia, Vila Nova de Gaia","gaia"],
["📷","Porto dal Cais de Gaia","Foto","La vista sulla Ribeira dalla banchina di Gaia: è il punto più fotografato della città.",[41.1388,-8.6125],"Cais de Gaia, Vila Nova de Gaia","gaia"],
["📷","Il tramonto da Jardim do Morro","Foto","Il giardino in cima alla collina di Gaia, vicino alla fermata del metro: i portuensi vengono qui a vedere il tramonto sul fiume.",[41.1386,-8.6050],"Jardim do Morro, Vila Nova de Gaia","gaia"],
["📷","Il Mercado do Bolhão","Foto","La facciata neoclassica e i banchi colorati di frutta, fiori e dolci.",[41.1488,-8.6070],"Mercado do Bolhão, Porto","bolhao"],
["📷","Il Café Majestic","Foto","Le sale di specchi e stucchi dorati: vale una foto anche senza fermarsi a consumare.",[41.1471,-8.6067],"Café Majestic, Porto","bolhao"],
["📷","I giardini di Serralves","Foto","La villa rosa Art Déco circondata dal parco, con il viale di alberi davanti.",[41.1595,-8.6590],"Fundação de Serralves, Porto","serralves"]
];
/* avvisi (verificati il 12 ottobre 2026) */
var AVV=[
{from:"2026-10-12",to:"2026-12-31",t:"Tassa di soggiorno di Porto in revisione",x:"Oggi la tassa di soggiorno di Porto è di 3 € a persona e a notte, per le prime 7 notti. A fine settembre 2026 il Comune ha avviato la revisione del regolamento: il sindaco ha parlato di un possibile aumento a 4 €, ma l'importo non è ancora deciso. Controlla l'importo esatto con la tua struttura."},
{from:"2026-10-12",to:"2026-12-31",t:"Trasporti gratuiti: solo per i residenti",x:"Il Comune di Porto ha annunciato a luglio 2026 il trasporto pubblico gratuito per i residenti. I visitatori continuano a pagare il biglietto: convalida sempre la carta Andante a ogni salita."},
{from:"2026-10-12",to:"2026-10-31",t:"Orario invernale dal 1° novembre",x:"Da novembre cambiano gli orari: la Igreja de São Francisco chiude alle 18 (fino a febbraio), il Palácio da Bolsa fa una pausa a mezzogiorno (circa 13–14, da controllare) e la Sé chiude alle 17:30. Prima di andare, controlla il sito di ogni luogo."},
{from:"2026-10-30",to:"2026-11-01",t:"1° novembre: festa di Ognissanti",x:"Il 1° novembre (domenica) è festa nazionale in Portogallo: molti negozi sono chiusi. Musei e ristoranti seguono orari ridotti. Controlla prima di andare."},
{from:"2026-11-28",to:"2026-12-08",t:"1° e 8 dicembre: giorni festivi",x:"L'1 dicembre (Restaurazione dell'indipendenza) e l'8 dicembre (Immacolata) sono giorni festivi in Portogallo, entrambi di martedì nel 2026. Molti negozi e alcuni musei sono chiusi o hanno orari ridotti."},
{from:"2026-12-20",to:"2027-01-02",t:"Natale e Capodanno: chiusure",x:"La Livraria Lello e la Fundação de Serralves sono chiuse il 25 dicembre e il 1° gennaio. Serralves chiude alle 16 il 24 e il 31 dicembre. La Torre dos Clérigos e le cantine di Gaia hanno orari ridotti in questi giorni (da controllare)."}
];
/* clima medio di Porto (indicativo, massime/minime) */
var CLIM=[[14,6],[15,6],[17,8],[19,9],[21,11],[24,14],[26,15],[26,15],[25,14],[21,12],[17,9],[14,7]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Porto: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="bolhao"&&WD===6)meta+=" Oggi è domenica: il Mercado do Bolhão è chiuso. Resta la passeggiata sulla Rua de Santa Catarina.";
if(it.id==="bolhao"&&WD===5)meta+=" Oggi è sabato: il mercato chiude alle 18.";
if(it.id==="serralves"&&(WD===0||WD===1))meta+=" Alcune guide danno Serralves chiuso il lunedì o il martedì (il portale iPorto no): controlla su serralves.pt.";
if(it.id==="gaia"&&WD===6)meta+=" Oggi è domenica: prenota la cantina, perché nei fine settimana le visite in inglese si esauriscono presto.";
return meta}
Object.assign(C,{id:"porto",n:"Porto",cn:"Portogallo",e:"🍷",flag:"🇵🇹",col:["#1c4f8f","#c9a24a","#7a2e2e"],k:"porto oporto portogallo",
TZ:"Europe/Lisbon",LL:[41.1470,-8.6110],CC:"pt",QN:"Porto",BK:"Porto",ARE:/porto|oporto|vila nova de gaia|\b4[0-4][0-9]{2}-[0-9]{3}\b/i,VER:"12 ottobre 2026",
Z0:"A",LANG:"pt-PT",LANGN:"portoghese",WATER:"osm",TAXDEF:"h3",TAXMAXN:7,RETC:1,LUNCHO:30,DINO:30,
hub:{n:"São Bento",q:"Estação de metro São Bento, Porto"},
SINGLE:{acts:["saobento","clerigos","bolsa","ribeira","gaia"],ins:[]},
EXCL:[],
DICON:{saobento:"🚉",lello:"📚",clerigos:"🗼",bolsa:"🏛️",ribeira:"🌉",se:"⛪",gaia:"🍷",bolhao:"🥖",serralves:"🌳"},
ZN:{A:"in Baixa e agli Aliados",B:"alla Ribeira",C:"al Bolhão",D:"a Vila Nova de Gaia",E:"alla Boavista"},
NEAR:{col:"caffè",pra:"locale tipico",cen:"tasca o ristorante",snk:"pasticceria o caffè"},
SE:{padaria:"🥐",piolho:"🍺",conga:"🥪",candelabro:"🍷",santiago:"🥪",guedes:"🥖",majestic:"☕",bolhaoconf:"🍮",padeirinha:"🥐",cantina32:"🍽️",adega:"🐟",saogoncalo:"🧀",toca:"🍲",rotunda:"🍖"},
TR:{one:1.4,lbl:"Metro, bus e Andante",
 air:{OPO:{one:2.3,n:"Metro per l'aeroporto (linea E, biglietto Z4)"}},
 passes:[
 {n:"Andante Tour 1 (24 ore)",d:1,max:1,p:7.75,note:"L'Andante Tour 1 (7,75 €) vale 24 ore dalla prima convalida su metro, bus e treni urbani di tutta la rete Andante, anche per l'aeroporto. Non vale sul tram storico né sul funicolare dos Guindais."},
 {n:"Andante Tour 3 (72 ore)",d:3,p:16.55,only:function(T){return T.n===3},note:"L'Andante Tour 3 (16,55 €) vale 72 ore dalla prima convalida su metro, bus e treni urbani di tutta la rete Andante. Non vale sul tram storico né sul funicolare dos Guindais."}],
 note:"Prezzi 2026 da andante.pt (Andante Tour) e dalla stampa portoghese (biglietti occasionali): carta Andante Azul 0,60 € una tantum (ogni viaggiatore ha la sua), biglietto Z2 per il centro 1,40 € (vale 1 ora), Z3 1,85 €, Z4 2,30 € (aeroporto, vale 75 minuti), Andante Tour 1 7,75 € (24 ore) e Tour 3 16,55 € (72 ore). Caricando 10 biglietti se ne riceve uno in più. Il tram storico (circa 5 € a corsa a bordo) e il funicolare dos Guindais (circa 3 €) non sono compresi nell'Andante. I trasporti gratuiti annunciati dal Comune sono per i residenti. Convalida la carta a ogni salita e a ogni cambio: la multa per chi viaggia senza biglietto valido è alta (importo da controllare)."},
FOOD:{co:[6,"Colazione al caffè (cimbalino e pastel de nata)"],pr:[11,"Pranzo (francesinha, bifana o prato do dia)"],ce:[16,"Cena (petiscos o baccalà)"],sp:[4,"Pastéis e spuntini"]},
T:{ride:"In metro",move:"tutto a piedi o in metro",bags:"«Posso deixar as malas aqui?»",bagsPM:"«Posso deixar as malas até à tarde?»",bagsAM:"«Posso deixar as malas até ao meio-dia?»",
pra:"Una tasca o un caffè",praZ:{B:"Sulla banchina della Ribeira i ristoranti con il menù fuori sono per turisti e costano molto: nelle vie dietro (Rua de São Nicolau, Rua dos Mercadores) si mangia meglio e si spende meno.",D:"Sul lungofiume di Gaia i ristoranti sono cari e pensati per i turisti: se hai tempo, torna dall'altra parte del ponte per mangiare."},
freeLong:"Qualche idea: una pausa in un caffè storico, i giardini della Cordoaria, il tramonto da Jardim do Morro, una camminata sul lungofiume o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata verso il fiume.",
remind:"Per la Livraria Lello, il Palácio da Bolsa e le cantine di Gaia conviene prenotare online: i posti per orario si esauriscono. Convalida sempre la carta Andante a ogni salita.",
rain1:"Al coperto: la Livraria Lello, il Palácio da Bolsa con la chiesa di São Francisco, le cantine di Gaia, il Mercado do Bolhão e i caffè storici.",
rainM:"Al coperto: Livraria Lello, Palácio da Bolsa, Igreja de São Francisco, Sé (chiostro), cantine di Gaia, Serralves (museo) e i caffè storici.",
water:"Riempite la borraccia: l'acqua del rubinetto di Porto è potabile e quasi ovunque la danno gratis («água da torneira, por favor»). Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Porto si pranza tra le 12:30 e le 15 e si cena dalle 19:30: molte tasche chiudono tra i due servizi, guarda l'orario accanto a ogni locale.",
night:[["🍷","Un calice di vino di Porto o un vinho verde in una taverna è il modo portuense di chiudere la giornata."],["🕙","Le cucine servono fino alle 22–23 e il metro gira fino all'1:00 circa; dopo ci sono i bus notturni."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Porto è un'ora indietro rispetto all'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per locali di quartiere: colazione e cena restano intorno ai 6–16 € a persona. Al tavolo, il pane, il burro e le olive che ti portano sono a pagamento («couvert»): se non li vuoi, rimandali indietro.",
taxNote:"La tassa di soggiorno di Porto è di 3 € a persona e a notte, per le prime 7 notti (i bambini fino a 13 anni sono esenti). Il Comune sta rivedendo il regolamento e un aumento a 4 € è stato solo ipotizzato. Spesso non è compresa nel prezzo e si paga alla struttura.",
mcrit:"Criteri: almeno 4 stelle su Google, pasticcerie, caffè storici, tasche, taverne e locali di quartiere, niente catene. Colazione e cena restano per lo più sotto i 15–18 € a persona (Cantina 32 e il Café Majestic costano di più). Orari e valutazioni dalle schede di Google Maps (12 ottobre 2026), prezzi da guide e recensioni: non sono stati letti sui siti dei locali, controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il metro è la strada più semplice: dalla stazione Aeroporto a Trindade sono circa 27 minuti, poi il cambio sulla linea D per São Bento. Compra la carta Andante e un biglietto Z4.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["and","Carta Andante Azul (0,60 €) con un biglietto Z4 per l'aeroporto (2,30 €) e uno Z2 per il centro (1,40 €): si comprano alle macchinette del metro"],["tk","Se fai molti giri in un giorno: Andante Tour 1 (7,75 €, 24 ore). Convalida la carta a ogni salita",function(E){return true}],["lel","Biglietto per la Livraria Lello con orario (circa 8 €, si scala dai libri): compralo online",["lello"]],["cle","Biglietto per la Torre dos Clérigos (8–10 €; non c'è l'ascensore)",["clerigos"]],["bol","Palácio da Bolsa (14 €): solo visita guidata a orari fissi, arriva 10 minuti prima",["bolsa"]],["gai","Prenota online la visita alle cantine di Gaia (da 22–25 € con degustazione)",["gaia"]],["ser","Biglietto per la Fundação de Serralves (24 €; solo parco 15 €)",["serralves"]],["shoe","Scarpe comode con la suola buona: le strade sono ripide e di pietra liscia",function(E){return true}],["rain","Giacca antipioggia o ombrello: a Porto piove spesso"],["cash","Qualche euro in contanti: Toca d'Avenida accetta solo contanti e nei piccoli locali è comodo averne"],["cov","Qualcosa per coprire spalle e ginocchia in chiesa",["bolsa","se"]]],
NUM:{1:["um","um"],2:["dois","doish"],3:["três","tresh"],4:["quatro","QUA-tru"],5:["cinco","SIN-cu"],6:["seis","seish"],7:["sete","SE-te"],8:["oito","OI-tu"],9:["nove","NO-ve"],10:["dez","desh"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Bom dia / Boa noite","bom DI-a / BO-a NOI-te"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Uma mesa para "+(N===1?"uma pessoa":nu[0])+", por favor","U-ma ME-za PA-ra "+(N===1?"U-ma pe-SO-a":nu[1])+", pur fa-VOR"],["Un espresso e un pastel de nata, per favore","Um cimbalino e um pastel de nata, por favor","um sim-ba-LI-nu i um pash-TEL de NA-ta, pur fa-VOR"],["Acqua del rubinetto, per favore","Água da torneira, por favor","A-gua da tur-NEI-ra, pur fa-VOR"],["Il conto, per favore","A conta, por favor","a CON-ta, pur fa-VOR"],["Posso pagare con la carta?","Posso pagar com cartão?","PO-su pa-GAR com car-TAUN"],["Quanto costa?","Quanto custa?","QUAN-tu CUSH-ta"],["Dov'è il metro?","Onde fica o metro?","ON-de FI-ca u me-TRO"],["Qual è la linea per l'aeroporto?","Qual é a linha para o aeroporto?","cual e a LI-nha PA-ra u a-e-ro-POR-tu"]];
if(M)fr=fr.concat([["Ho una prenotazione","Tenho uma reserva","TEN-yu U-ma re-ZER-va"],["Posso lasciare i bagagli?","Posso deixar as malas aqui?","PO-su dei-SHAR ash MA-las a-KI"],["A che ora è il check-out?","A que horas é o check-out?","a ke O-ras e u check-AUT"]]);
return fr.concat([["Mi scusi","Desculpe","desh-CUL-pe"],["Grazie mille! (un uomo dice «obrigado», una donna «obrigada»)","Muito obrigado! / Muito obrigada!","MUI-tu o-bri-GA-du / o-bri-GA-da"]])},
taxTxt:function(tx){return "Tassa di soggiorno di Porto: "+(tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+"), per le prime 7 notti":"non si paga se sei ospite di amici o parenti")+". I bambini fino a 13 anni sono esenti. Il Comune sta rivedendo il regolamento e un aumento a 4 € è solo ipotizzato. Spesso non è compresa nel prezzo che trovi sull'annuncio."},
STAYTIPS:["Il metro di Porto funziona più o meno dalle 6 all'1 di notte; dopo ci sono i bus notturni. Il centro è in forte salita e le strade sono di pietra: con il valigione conviene andare all'alloggio in taxi."],
ZONES:[
["🚇 Metro, bus e Andante",["Compra alle macchinette del metro la carta Andante Azul (0,60 €, una per persona) e caricaci il biglietto: Z2 per il centro 1,40 € (vale 1 ora), Z4 per l'aeroporto 2,30 € (vale 75 minuti). Z3 costa 1,85 €.","Convalida la carta a ogni salita e a ogni cambio: nel metro alle macchinette prima dei binari, sul bus all'ingresso. Senza convalida si rischia una multa.","L'Andante Tour 1 (7,75 €, 24 ore) e il Tour 3 (16,55 €, 72 ore) valgono su metro, bus e treni urbani, ma non sul tram storico né sul funicolare dos Guindais. La carta Tour non si ricarica.","I trasporti gratuiti annunciati dal Comune sono solo per i residenti.","Il metro gira più o meno dalle 6 all'1 di notte."]],
["🏛️ Centro: São Bento, Lello e Clérigos",["La sala degli azulejos di São Bento è gratuita; il Municipio e l'Avenida dos Aliados sono a due passi.","Alla Livraria Lello si entra solo con un biglietto a orario, da comprare online; non sono ammessi zaini.","Alla Torre dos Clérigos si salgono circa 200 gradini senza ascensore.","Il Palácio da Bolsa si visita solo con la guida, a orari fissi: arriva 10 minuti prima."],["saobento","lello","clerigos","bolsa"]],
["🌉 Ribeira, Sé e il ponte",["La Ribeira è in fondo alla collina: scendi a piedi e risali con il funicolare dos Guindais (circa 3 €, non compreso nell'Andante).","Il piano alto della Ponte Luís I si attraversa a piedi o con il metro D; dal piazzale della Sé si vede la Ribeira dall'alto.","Sulla banchina i ristoranti con il menù fuori dalla porta sono i più cari: mangia nelle vie dietro."],["ribeira","se"]],
["🍷 Le cantine di Gaia",["Le visite durano circa un'ora e includono la degustazione di due o tre vini: prenota online, soprattutto da aprile a ottobre e nei fine settimana.","Orari tipici delle cantine: 10–19 (Graham's chiude un po' prima, Ferreira fa una pausa a pranzo).","Si attraversa il Douro a piedi sul piano basso del ponte, oppure con il metro D fino a Jardim do Morro."],["gaia"]],
["🌳 Serralves e la Boavista",["Serralves è a circa 40 minuti dal centro: metro fino a Casa da Música, poi autobus, taxi o camminata di circa 30 minuti.","Da ottobre a marzo è aperto 10–18 nei giorni feriali e 10–19 nel fine settimana (portale iPorto): controlla su serralves.pt prima di andare."],["serralves"]],
["🌅 Un giorno fuori Porto",["Guimarães e Braga si raggiungono in treno dalla stazione di Porto-São Bento o di Campanhã in circa un'ora (da controllare su cp.pt).","La valle del Douro, con le colline di vigne, si raggiunge in treno da São Bento (da controllare su cp.pt)."]]],
WTIPS:["L'acqua del rubinetto di Porto è potabile: puoi chiederla gratis in ogni locale («água da torneira, por favor») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali, come quelle delle piazze, non sono da bere."],
GEN:["Il Portogallo usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Porto è un'ora indietro rispetto all'Italia: gli orari dei voli sono sempre quelli locali.","Mancia: non è obbligatoria; nei ristoranti si lascia di solito il 5–10% se il servizio è stato buono; nei caffè si arrotonda.","I pasti: si pranza tra le 12:30 e le 15 e si cena dalle 19:30. Il pane, il burro e le olive che ti portano al tavolo sono a pagamento (couvert): puoi rimandarli indietro.","Attenzione ai borseggiatori nelle zone affollate (Ribeira, ponte, Lello) e in metro.","Porto è costruita su colline ripide e le strade sono di pietra, scivolose con la pioggia: porta scarpe con la suola buona e una giacca antipioggia.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Metro, bus e Andante, anche per oggetti smarriti: <a href="https://www.metrodoporto.pt/" target="_blank" rel="noopener">metrodoporto.pt</a> · <a href="https://www.stcp.pt/" target="_blank" rel="noopener">stcp.pt</a> · <a href="https://www.andante.pt/" target="_blank" rel="noopener">andante.pt</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Lisbona: <a href="https://amblisbona.esteri.it" target="_blank" rel="noopener">amblisbona.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 12 ottobre 2026 non ho potuto verificare scioperi annunciati nei trasporti di Porto (metro, STCP, treni CP). Gli scioperi in Portogallo vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.metrodoporto.pt/" target="_blank" rel="noopener">metrodoporto.pt</a>, <a href="https://www.stcp.pt/" target="_blank" rel="noopener">stcp.pt</a> e <a href="https://www.cp.pt/" target="_blank" rel="noopener">cp.pt</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="355" cy="22" r="11"/><path d="M0 106 V96 Q60 86 130 92 Q180 98 205 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M8 106 V70 H84 V106 Z M10 70 V44 H32 V70 Z M60 70 V44 H82 V70 Z M10 44 Q21 28 32 44 Z M60 44 Q71 28 82 44 Z M33 70 V62 H59 V70 Z"/></g>'+
'<g style="--k:2"><path d="M98 106 V80 H122 V106 Z M102 80 V34 H118 V80 Z M100 34 H120 V30 H100 Z M103 30 V16 H117 V30 Z M107 16 V8 H113 V16 Z M109 8 L110 2 L111 8 Z"/></g>'+
'<g style="--k:3"><path d="M134 44 H262 V48 H134 Z M156 105 Q200 -9 244 105 H239 Q200 5 161 105 Z M152 84 H248 V88 H152 Z"/></g>'+
'<g style="--k:4"><path d="M284 106 V80 H334 V106 Z M296 80 V66 H322 V80 Z M293 66 Q309 38 325 66 Z M307 42 V34 H311 V42 Z M308 34 V28 H310 V34 Z"/></g>'+
'<g style="--k:5"><path d="M342 100 Q366 110 392 98 L388 93 H346 Z M365 93 V66 H367 V93 Z M358 70 H374 V82 H358 Z M346 93 L336 80 L338 78 L349 91 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M42 80 v10 M50 80 v10"/><path d="M21 52 v10 M71 52 v10"/><path d="M110 42 v8 M110 56 v8"/><path d="M172 72 V84 M186 55 V84 M200 49 V84 M214 55 V84 M228 72 V84"/><path d="M298 90 h24"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="40" cy="14" r="1.6"/><circle cx="92" cy="22" r="1.3"/><circle cx="150" cy="14" r="1.3"/><circle cx="270" cy="12" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="392" cy="40" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.porto);
