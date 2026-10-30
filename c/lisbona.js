(function(o){
/* ===== Lisbona (dati verificati il 10 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.lisbona=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
LIS:{n:"Lisbona",s:"Lisbon Humberto Delgado",url:"https://www.aeroportolisboa.pt/",live:"Lisbona",inMin:50,buf:120,pos:[38.7742,-9.1342],sd:"Aeroporto di Lisbona · metro",rt:"Dall'aeroporto: metro linea rossa fino ad Alameda, poi linea verde fino a Rossio.",
 arr:"Dopo il ritiro dei bagagli (da Italia non c'è controllo passaporti) segui i cartelli «Metro»: la stazione Aeroporto è a 5–7 minuti a piedi dal terminal. Prendi la linea rossa fino ad Alameda (circa 15 minuti), poi cambia con la linea verde per Rossio o Baixa-Chiado (5 minuti): in tutto circa 25 minuti. Il metro funziona dalle 6:30 all'1:00.",
 tk:"Biglietto: circa 1,90 € a corsa più 0,50 € per la carta ricaricabile Navegante (la prima volta); si compra alle macchinette della stazione. Si può anche pagare con carta contactless (circa 1,92 €). Prezzi da guide, non letti sul sito del metro.",
 gm:"Aeroporto metro station, Lisboa",
 tips:["Il bus 744 o 783 e l'Aerobus costano poco ma sono più lenti nelle ore di punta; il metro è più prevedibile.","Il taxi costa di solito 15–20 € per il centro, più un supplemento per i bagagli (circa 1,60 € a valigia).","Con il bagaglio grande, nel centro le salite sono ripide e i marciapiedi sono di pietra: meglio il taxi per l'ultimo tratto se l'alloggio è in cima a una collina."]}
};
/* linee (tracciati indicativi) */
var SEG={
red:{c:"#e4202a",n:"Metro linea rossa",p:[[38.7684,-9.1295,"Aeroporto",2],[38.7674,-9.0987,"Oriente",2],[38.7385,-9.1240,"Olaias"],[38.7370,-9.1335,"Alameda",2]]},
green:{c:"#00a560",n:"Metro linea verde",p:[[38.7370,-9.1335,"Alameda",2],[38.7322,-9.1347,"Arroios"],[38.7223,-9.1357,"Intendente"],[38.7170,-9.1357,"Martim Moniz",2],[38.7140,-9.1395,"Rossio",2],[38.7107,-9.1397,"Baixa-Chiado",2],[38.7068,-9.1445,"Cais do Sodré",2]]},
blue:{c:"#2277c8",n:"Metro linea blu",p:[[38.7160,-9.1405,"Restauradores",2],[38.7200,-9.1460,"Avenida"],[38.7250,-9.1500,"Marquês de Pombal",2],[38.7290,-9.1500,"Parque"],[38.7340,-9.1540,"São Sebastião",2]]},
t28:{c:"#e0a800",n:"Tram 28",p:[[38.7170,-9.1357,"Martim Moniz",2],[38.7193,-9.1303,"Graça",2],[38.7121,-9.1295,"Portas do Sol",2],[38.7098,-9.1330,"Sé",2],[38.7107,-9.1425,"Chiado",2]]},
t15:{c:"#c8102e",n:"Tram 15E",p:[[38.7143,-9.1380,"Praça da Figueira",2],[38.7068,-9.1445,"Cais do Sodré",2],[38.7040,-9.1780,"Alcântara"],[38.6975,-9.2060,"Belém",2]]}
};
var START=[38.7140,-9.1395];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
baixa:{t:"Praça do Comércio, Rua Augusta e Rossio",z:"A",p:2,min:40,id:70,max:110,pos:[38.7075,-9.1364],q:"Praça do Comércio, Lisboa",cls:"walk",sun:1,
 d:"La Baixa, il centro ricostruito dopo il terremoto del 1755: la grande piazza sul Tago con l'Arco della Rua Augusta, la via pedonale fino alla piazza Rossio con il pavimento a onde e, in alto, l'Elevador de Santa Justa.",
 m:"Si cammina gratis. All'Elevador de Santa Justa c'è quasi sempre la fila: spesso conviene guardarlo da fuori."},
chiado:{t:"Chiado, Carmo e Bairro Alto",z:"B",p:3,min:40,id:70,max:110,pos:[38.7107,-9.1408],q:"Largo do Carmo, Lisboa",cls:"walk",sun:1,
 d:"Il quartiere elegante sulla collina, con le librerie storiche e Rua Garrett, le rovine a cielo aperto del Convento do Carmo e, poco sopra, il belvedere di São Pedro de Alcântara con la vista sulla Baixa e sul castello.",
 m:"Le strade sono in salita e di pietra liscia: scarpe con la suola buona. Il Bairro Alto è più vivo la sera; di giorno è tranquillo."},
alfama:{t:"Alfama, Sé e miradouros",z:"C",p:1,min:60,id:100,max:150,pos:[38.7110,-9.1300],q:"Miradouro de Santa Luzia, Lisboa",cls:"walk",sun:1,
 d:"Il quartiere più antico, un labirinto di vicoli con i panni stesi, gli azulejos e le case a strapiombo; la Sé (la cattedrale), i belvedere di Santa Luzia e delle Portas do Sol sul Tago e, se capita il tram 28 giallo che sfiora i muri.",
 m:"La Sé è gratis, con orari che cambiano con le funzioni. Il mercato delle pulci Feira da Ladra è il martedì e il sabato. Attenzione ai borseggiatori sul tram 28 e ai punti panoramici affollati."},
castelo:{t:"Castello di São Jorge",z:"C",p:2,min:60,id:90,max:130,pos:[38.7139,-9.1334],q:"Castelo de São Jorge, Lisboa",cls:"walk",sun:1,tk:[15,"Castello di São Jorge (15 €)",1,1],
 win:function(wd,d){return[9*60,d>="2026-11-01"?18*60:21*60]},
 d:"La fortezza moresca sulla collina più alta, con le mura da percorrere, le torri e la terrazza panoramica sulla Baixa, il Tago e il ponte 25 de Abril.",
 m:"Biglietto 15 €. Fino al 31 ottobre aperto 9–21 (ultimo ingresso 20:30); dal 1° novembre 9–18 (ultimo ingresso 17:30). Le mura e le torri chiudono prima, circa mezz'ora prima del resto. Il museo interno è chiuso per lavori."},
belem:{t:"Belém: Torre, Padrão e pastéis",z:"D",p:2,min:70,id:110,max:160,pos:[38.6959,-9.2060],q:"Torre de Belém, Lisboa",cls:"walk",sun:1,tk:[8,"Torre di Belém (8 €)",1,1],
 d:"Il quartiere sul Tago da cui partirono gli esploratori portoghesi: il Padrão dos Descobrimentos, la passeggiata sul fiume, la Torre di Belém e, di fronte, la facciata del monastero dei Jerónimos. La sosta d'obbligo sono i pastéis de Belém, i dolcetti alla crema.",
 m:"Monastero e torre sono chiusi il lunedì; la Torre di Belém è in restauro e può chiudere a tratti. L'ingresso alla torre costa 8 €, al Padrão circa 6 €. Da fuori si vede tutto gratis."}
};
/* tappe in più per i viaggi di più giorni */
Object.assign(STOPS,{
jeronimosins:{t:"Mosteiro dos Jerónimos",z:"D",p:1,min:60,id:75,max:100,pos:[38.6979,-9.2068],q:"Mosteiro dos Jerónimos, Lisboa",cls:"",multi:1,cl:[0],tk:[18,"Mosteiro dos Jerónimos (18 €)"],
 win:function(){return[10*60,17*60+30]},
 d:"Il capolavoro dello stile manuelino, finanziato con i commerci delle spezie: il chiostro a due piani con le colonne scolpite, la chiesa con la tomba di Vasco da Gama e la lunga facciata sul Tago.",
 m:"Biglietto circa 18 € (le guide danno 18–21 €: controlla sul sito). Aperto dal martedì alla domenica; da ottobre ad aprile 10–17:30, ultimo ingresso 17:00; chiuso il lunedì. La chiesa si visita gratis dall'ingresso laterale."},
gulbenkian:{t:"Museo Gulbenkian e Avenidas",z:"F",p:3,min:100,id:140,max:180,pos:[38.7378,-9.1534],q:"Museu Calouste Gulbenkian, Lisboa",cls:"",multi:1,cl:[1],tk:[16,"Museo Gulbenkian (16 €)"],
 win:function(){return[10*60,18*60]},
 d:"Una delle migliori collezioni d'Europa: egizi, arte islamica, pittura europea con Rembrandt e Monet, i gioielli di Lalique. Il giardino, aperto a tutti, è un parco tranquillo in centro.",
 m:"Biglietto 16 € (comprende la Collezione del Fondatore e quella moderna, riaperta a luglio 2026); chiuso il martedì; aperto mercoledì–lunedì 10–18. La domenica dalle 14 l'ingresso è gratuito. Gli orari sono quelli dichiarati dalle guide: controlla gulbenkian.pt."},
cais:{t:"Cais do Sodré, Bica e Rua Nova do Carvalho",z:"E",p:5,min:50,id:80,max:120,pos:[38.7070,-9.1440],q:"Mercado da Ribeira, Lisboa",cls:"walk",multi:1,sun:1,
 d:"Il quartiere sul fiume: il Mercado da Ribeira (Time Out Market, molto turistico), la Rua Nova do Carvalho dipinta di rosa, il quartiere della Bica con l'Ascensor da Bica giallo e i bar sul lungotevere.",
 m:"Il Time Out Market è comodo ma più caro dei locali di quartiere: per mangiare spendendo poco scegli le vie vicine. Il Ascensor da Bica è coperto dal biglietto giornaliero."}
});
/* collegamenti tra le tappe */
var LEGS={
"start>baixa":{min:10,mode:"walk",txt:"A piedi lungo la Rua Augusta, la via pedonale della Baixa, fino a Praça do Comércio, circa 10 minuti.",g:[W([[38.7140,-9.1395],[38.7110,-9.1378],[38.7075,-9.1364]])]},
"baixa>start":{min:10,mode:"walk",txt:"A piedi lungo la Rua Augusta fino a Rossio, circa 10 minuti.",g:[W([[38.7075,-9.1364],[38.7110,-9.1378],[38.7140,-9.1395]])]},
"start>chiado":{min:10,mode:"walk",txt:"A piedi per la Rua do Carmo, salendo per le rovine del Convento do Carmo, circa 10 minuti.",g:[W([[38.7140,-9.1395],[38.7122,-9.1405],[38.7107,-9.1408]])]},
"chiado>start":{min:10,mode:"walk",txt:"A piedi in discesa verso Rossio, circa 10 minuti.",g:[W([[38.7107,-9.1408],[38.7122,-9.1405],[38.7140,-9.1395]])]},
"baixa>chiado":{min:12,mode:"walk",txt:"A piedi in salita per Rua Garrett fino a Largo do Carmo, circa 12 minuti.",g:[W([[38.7075,-9.1364],[38.7102,-9.1400],[38.7107,-9.1408]])]},
"chiado>baixa":{min:10,mode:"walk",txt:"A piedi in discesa per Rua Garrett e la Baixa, circa 10 minuti.",g:[W([[38.7107,-9.1408],[38.7102,-9.1400],[38.7075,-9.1364]])]},
"baixa>alfama":{min:18,mode:"walk",txt:"A piedi in salita dalla Baixa verso la Sé e Santa Luzia, circa 18 minuti.",g:[W([[38.7075,-9.1364],[38.7085,-9.1340],[38.7098,-9.1330],[38.7110,-9.1300]])]},
"alfama>baixa":{min:15,mode:"walk",txt:"A piedi in discesa verso la Baixa, circa 15 minuti.",g:[W([[38.7110,-9.1300],[38.7098,-9.1330],[38.7085,-9.1340],[38.7075,-9.1364]])]},
"chiado>alfama":{min:22,mode:"tram",txt:"A piedi fino a Chiado (Camões) e tram 28 fino alla Sé (circa 15 minuti), poi 6 minuti a piedi in salita fino a Santa Luzia. Il tram 28 è molto affollato: in alternativa cammina, circa 25 minuti.",g:[["t28","Chiado","Sé"],W([[38.7098,-9.1330],[38.7110,-9.1300]])]},
"alfama>chiado":{min:25,mode:"walk",txt:"A piedi in discesa per la Sé e la Baixa e poi in salita fino al Carmo, circa 25 minuti.",g:[W([[38.7110,-9.1300],[38.7098,-9.1330],[38.7085,-9.1340],[38.7102,-9.1400],[38.7107,-9.1408]])]},
"alfama>castelo":{min:12,mode:"walk",txt:"A piedi in salita per i vicoli fino all'ingresso del castello, circa 12 minuti.",g:[W([[38.7110,-9.1300],[38.7125,-9.1320],[38.7139,-9.1334]])]},
"castelo>alfama":{min:10,mode:"walk",txt:"A piedi in discesa verso le Portas do Sol, circa 10 minuti.",g:[W([[38.7139,-9.1334],[38.7125,-9.1320],[38.7110,-9.1300]])]},
"baixa>castelo":{min:22,mode:"walk",txt:"A piedi in salita dalla Baixa per l'Alfama fino al castello, circa 22 minuti.",g:[W([[38.7075,-9.1364],[38.7085,-9.1340],[38.7110,-9.1330],[38.7139,-9.1334]])]},
"castelo>baixa":{min:18,mode:"walk",txt:"A piedi in discesa dal castello fino alla Baixa, circa 18 minuti.",g:[W([[38.7139,-9.1334],[38.7110,-9.1330],[38.7085,-9.1340],[38.7075,-9.1364]])]},
"start>alfama":{min:25,mode:"walk",txt:"A piedi attraverso la Baixa e in salita fino alla Sé e a Santa Luzia, circa 25 minuti. In alternativa il tram 28 da Martim Moniz, molto affollato.",g:[W([[38.7140,-9.1395],[38.7110,-9.1378],[38.7085,-9.1340],[38.7098,-9.1330],[38.7110,-9.1300]])]},
"alfama>start":{min:20,mode:"walk",txt:"A piedi in discesa fino a Rossio, circa 20 minuti.",g:[W([[38.7110,-9.1300],[38.7098,-9.1330],[38.7110,-9.1378],[38.7140,-9.1395]])]},
"start>castelo":{min:28,mode:"walk",txt:"A piedi in salita attraverso la Baixa e l'Alfama fino al castello, circa 28 minuti.",g:[W([[38.7140,-9.1395],[38.7110,-9.1378],[38.7085,-9.1340],[38.7110,-9.1330],[38.7139,-9.1334]])]},
"castelo>start":{min:20,mode:"walk",txt:"A piedi in discesa dal castello fino a Rossio, circa 20 minuti.",g:[W([[38.7139,-9.1334],[38.7110,-9.1330],[38.7110,-9.1378],[38.7140,-9.1395]])]},
"start>belem":{min:45,mode:"tram",txt:"A piedi fino a Praça da Figueira (3 minuti) e tram 15E fino a Belém (circa 35 minuti, compreso nel biglietto giornaliero). Più veloce, ma a parte: treno CP da Cais do Sodré, 7 minuti.",g:[W([[38.7140,-9.1395],[38.7143,-9.1380]]),["t15","Praça da Figueira","Belém"]]},
"belem>start":{min:45,mode:"tram",txt:"Tram 15E da Belém a Praça da Figueira (circa 35 minuti), poi 3 minuti a piedi fino a Rossio.",g:[["t15","Belém","Praça da Figueira"],W([[38.7143,-9.1380],[38.7140,-9.1395]])]},
"start>jeronimosins":{min:45,mode:"tram",txt:"A piedi fino a Praça da Figueira (3 minuti) e tram 15E fino a Belém (circa 35 minuti).",g:[W([[38.7140,-9.1395],[38.7143,-9.1380]]),["t15","Praça da Figueira","Belém"]]},
"jeronimosins>start":{min:45,mode:"tram",txt:"Tram 15E da Belém a Praça da Figueira (circa 35 minuti), poi 3 minuti a piedi fino a Rossio.",g:[["t15","Belém","Praça da Figueira"],W([[38.7143,-9.1380],[38.7140,-9.1395]])]},
"jeronimosins>belem":{min:8,mode:"walk",txt:"A piedi lungo la Rua de Belém fino ai pastéis e al lungofiume, circa 8 minuti.",g:[W([[38.6979,-9.2068],[38.6970,-9.2050],[38.6959,-9.2060]])]},
"belem>jeronimosins":{min:8,mode:"walk",txt:"A piedi lungo la Rua de Belém fino al monastero, circa 8 minuti.",g:[W([[38.6959,-9.2060],[38.6970,-9.2050],[38.6979,-9.2068]])]},
"start>gulbenkian":{min:25,mode:"metro",txt:"A piedi fino a Restauradores (3 minuti), poi linea blu fino a São Sebastião (circa 10 minuti) e 8 minuti a piedi fino al museo.",g:[W([[38.7140,-9.1395],[38.7160,-9.1405]]),["blue","Restauradores","São Sebastião"],W([[38.7340,-9.1540],[38.7360,-9.1535],[38.7378,-9.1534]])]},
"gulbenkian>start":{min:25,mode:"metro",txt:"A piedi fino a São Sebastião (8 minuti), linea blu fino a Restauradores (circa 10 minuti) e 3 minuti a piedi fino a Rossio.",g:[W([[38.7378,-9.1534],[38.7360,-9.1535],[38.7340,-9.1540]]),["blue","São Sebastião","Restauradores"],W([[38.7160,-9.1405],[38.7140,-9.1395]])]},
"start>cais":{min:12,mode:"metro",txt:"Linea verde da Rossio a Cais do Sodré (2 fermate), circa 8 minuti, più 4 minuti a piedi.",g:[["green","Rossio","Cais do Sodré"],W([[38.7068,-9.1445],[38.7070,-9.1440]])]},
"cais>start":{min:12,mode:"metro",txt:"Linea verde da Cais do Sodré a Rossio (2 fermate), circa 8 minuti.",g:[["green","Cais do Sodré","Rossio"]]},
"baixa>cais":{min:14,mode:"walk",txt:"A piedi lungo il fiume fino a Cais do Sodré, circa 14 minuti.",g:[W([[38.7075,-9.1364],[38.7068,-9.1400],[38.7070,-9.1440]])]},
"cais>baixa":{min:14,mode:"walk",txt:"A piedi lungo il fiume fino a Praça do Comércio, circa 14 minuti.",g:[W([[38.7070,-9.1440],[38.7068,-9.1400],[38.7075,-9.1364]])]},
"chiado>cais":{min:12,mode:"walk",txt:"A piedi in discesa per la Rua do Alecrim fino a Cais do Sodré, circa 12 minuti.",g:[W([[38.7107,-9.1408],[38.7090,-9.1430],[38.7070,-9.1440]])]},
"cais>chiado":{min:15,mode:"walk",txt:"A piedi in salita per la Rua do Alecrim fino al Chiado, circa 15 minuti.",g:[W([[38.7070,-9.1440],[38.7090,-9.1430],[38.7107,-9.1408]])]}
};
/* ritorno in aeroporto (le altre tappe passano da Rossio) */
var RET={
LIS:{
 A:{min:35,txt:"Linea verde da Rossio ad Alameda (circa 8 minuti), poi linea rossa fino ad Aeroporto (circa 15 minuti): il cambio è nella stessa stazione. Il metro funziona dalle 6:30 all'1:00.",g:[["green","Rossio","Alameda"],["red","Alameda","Aeroporto"]]}}
};
var ARR={
LIS:[["red","Aeroporto","Alameda"],["green","Alameda","Rossio"]]
};
/* locali: h = orari lun→dom (guide e siti dei locali, ottobre 2026); "" = chiuso */
var V={
confeitaria:{n:"Confeitaria Nacional",a:"Praça da Figueira 18B",z:"A",r:"4,5",pos:[38.7143,-9.1384],h:["08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","09:00-20:00"],
 d:"Pasticceria storica del 1829 sulla piazza, con le vetrine di vetro e legno: dolci d'uovo, pastéis de nata e, in inverno, il bolo-rei di Natale. Il banco è comodo per un caffè in piedi.",pr:"Un dolce con il caffè sta sotto i 6 € (listino non visto)."},
fabrica:{n:"Fábrica Coffee Roasters Rossio",a:"Rua das Portas de Santo Antão 136",z:"A",r:"4,8",pos:[38.7155,-9.1395],h:D7("08:00-18:30"),
 d:"Torrefazione artigianale a due passi da Rossio: caffè di specialità, toast e dolci da forno, per una colazione tranquilla lontano dai locali turistici.",pr:"Colazione intorno ai 7–10 € (listino non visto)."},
bifanas:{n:"As Bifanas do Afonso",a:"Rua da Madalena 146",z:"A",r:"4,5",pos:[38.7118,-9.1380],h:["07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","09:00-14:00",""],
 d:"Una bottega piccolissima della Baixa che fa le bifanas: panini caldi con la fetta di maiale marinata, il cibo veloce di Lisbona. Si mangia in piedi al banco.",pr:"Una bifana costa di solito 3–4 € (listino non visto). Chiuso la domenica, sabato solo al mattino."},
alentejo:{n:"Casa do Alentejo",a:"Rua das Portas de Santo Antão 58",z:"A",r:"4,2",pos:[38.7152,-9.1403],h:D7("12:00-15:00,19:00-23:00"),
 d:"Un palazzo in stile moresco con il cortile di azulejos, sede dell'associazione degli alentejani, con un ristorante di cucina del sud del Portogallo: porzioni abbondanti e prezzi da casa.",pr:"Un piatto costa di solito 10–15 € (listino non visto)."},
manteigaria:{n:"Manteigaria Chiado",a:"Rua do Loreto 2",z:"B",r:"4,7",pos:[38.7105,-9.1427],h:D7("08:00-23:59"),
 d:"La pasticceria dei pastéis de nata appena sfornati: la crema si prepara in vista e il dolce si mangia caldo, con un caffè al bancone. Aperta fino a mezzanotte.",pr:"Un pastel de nata costa circa 1,50 € (listino non visto)."},
trevo:{n:"O Trevo",a:"Praça Luís de Camões 48",z:"B",r:"4,4",pos:[38.7107,-9.1432],h:["07:00-21:00","07:00-21:00","07:00-21:00","07:00-21:00","07:00-21:00","07:00-21:00",""],
 d:"Caffè-pasticceria di quartiere in Largo Camões: colazioni, toast, panini con la bifana o il prego (il filetto di manzo in panino) e i dolci portoghesi.",pr:"Un panino o una colazione completa sta sotto i 9 € (listino non visto)."},
kristof:{n:"Hello, Kristof",a:"Rua do Poço dos Negros 103",z:"F",r:"4,8",pos:[38.7120,-9.1488],h:["09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","",""],
 d:"Caffè di specialità e piccola cucina a Príncipe Real, con un menù di brunch semplice: caffè filtrato, toast e dolci. Aperto solo nei giorni feriali.",pr:"Brunch intorno ai 10–14 € (listino non visto)."},
flores:{n:"Taberna da Rua das Flores",a:"Rua das Flores 103",z:"B",r:"4,6",pos:[38.7101,-9.1441],h:["12:00-23:30","12:00-23:30","12:00-23:30","12:00-23:30","12:00-23:30","12:00-23:30",""],
 d:"Una tasca piccola nel Chiado: piatti da dividere (petiscos) su un menù che cambia ogni giorno, in una sala di pochi tavoli. Non si prenota e si paga solo in contanti, quindi spesso si aspetta fuori.",pr:"Tre o quattro petiscos da dividere stanno intorno ai 12–15 € a testa (listino non visto). Gli orari sono quelli del lunedì."},
ze:{n:"Zé dos Cornos",a:"Beco dos Surradores 5",z:"C",r:"4,5",pos:[38.7137,-9.1362],h:["11:30-17:00","11:30-17:00","11:30-17:00","11:30-17:00,18:30-22:00","11:30-17:00,18:30-22:00","11:30-17:00,18:30-22:00",""],
 d:"Una tasca della Mouraria con un lungo tavolo comune e le costine di maiale alla brace. Non si prenota e si paga solo in contanti: arriva presto o aspetta in coda.",pr:"Le costine alla brace costano circa 12 €; la cena è solo da giovedì a sabato."},
jaime:{n:"Tasca do Jaime",a:"Rua da Graça 91",z:"C",r:"4,3",pos:[38.7189,-9.1300],h:D7("09:00-20:00"),
 d:"Tasca di quartiere a Graça, con piatti portoghesi semplici e un clima da locali. Si paga solo in contanti e non si prenota.",pr:"Un piatto costa di solito sotto i 12 € (listino non visto)."},
pasteis:{n:"Pastéis de Belém",a:"Rua de Belém 84-92",z:"D",r:"4,8",pos:[38.6975,-9.2032],h:D7("08:00-21:00"),
 d:"La pasticceria del 1837 dove è nato il pastel de nata, con la ricetta segreta: la fila all'ingresso scorre in fretta e i tavoli interni sono in tante sale. Si mangia con cannella e zucchero a velo.",pr:"Un pastel costa circa 1,50 € (listino non visto). In estate chiude alle 22."},
manteigariab:{n:"Manteigaria Belém",a:"Rua de Belém 31",z:"D",r:"4,6",pos:[38.6970,-9.2060],h:D7("08:00-21:00"),
 d:"La succursale di Belém della Manteigaria, a pochi passi dal monastero: pastéis de nata appena fatti, con meno fila rispetto al locale storico.",pr:"Un pastel costa circa 1,50 € (listino non visto)."},
comoba:{n:"Comoba",a:"Rua da Boavista 90",z:"E",r:"4,7",pos:[38.7057,-9.1472],h:D7("08:30-17:00"),
 d:"Caffè di specialità e piccola pasticceria a Cais do Sodré, con tavoli all'aperto: colazioni e brunch semplici per iniziare la giornata.",pr:"Colazione intorno ai 8–12 € (listino non visto)."},
janis:{n:"Café Janis",a:"Rua da Moeda 1A",z:"E",r:"4,4",pos:[38.7066,-9.1456],h:D7("08:00-23:59"),
 d:"Caffè aperto dalla colazione a mezzanotte, a due passi dal Time Out Market: panini, toast e piatti semplici a prezzi onesti, comodo a ogni ora.",pr:"Un panino o un piatto sta di solito sotto i 12 € (listino non visto)."},
dear:{n:"Dear Breakfast Bica",a:"Rua das Gaivotas 17",z:"E",r:"4,4",pos:[38.7102,-9.1458],h:D7("09:00-17:00"),
 d:"Caffè per la colazione e il brunch nella Bica, vicino all'Ascensor: uova, toast, dolci e bevande calde.",pr:"Colazione intorno ai 8–12 € (listino non visto)."},
solepesca:{n:"Sol e Pesca",a:"Rua Nova do Carvalho 44",z:"E",r:"4,4",pos:[38.7062,-9.1448],h:["","12:00-02:00","12:00-02:00","12:00-03:00","12:00-03:00","12:00-03:00",""],
 d:"Il bar delle conserve di pesce sulla Rua Nova do Carvalho (la Pink Street): scatolette di tonno, sardine e sgombro servite con pane e vino, in un locale da pescatori reinventato.",pr:"Una scatoletta con il pane costa di solito 6–10 € (listino non visto). Gli orari da martedì a sabato: domenica e lunedì sono da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["fabrica","confeitaria","bifanas"],B:["manteigaria","trevo","kristof"],C:["fabrica","confeitaria","jaime"],D:["pasteis","manteigariab"],E:["comoba","dear","janis"],F:["kristof","manteigaria"]},
pra:{A:["bifanas","alentejo","confeitaria"],B:["trevo","flores","manteigaria"],C:["ze","jaime"],D:["pasteis","manteigariab"],E:["janis","solepesca","comoba"],F:["kristof","alentejo"]},
cen:{A:["alentejo","flores"],B:["flores","janis"],C:["ze","jaime","flores"],D:["janis","solepesca"],E:["solepesca","janis","flores"],F:["alentejo","flores"]},
snk:{A:["confeitaria","fabrica"],B:["manteigaria","trevo"],C:["jaime","manteigaria"],D:["pasteis","manteigariab"],E:["comoba","dear"],F:["manteigaria","kristof"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"alfama",t:"Alfama, Sé e Castello di São Jorge",acts:["alfama","castelo"],need:250,core:1},
{id:"belem",t:"Belém: Jerónimos, Torre e pastéis",acts:["jeronimosins","belem"],need:260,core:1},
{id:"baixa",t:"Baixa, Chiado e Bairro Alto",acts:["baixa","chiado"],need:200,core:1},
{id:"museo",t:"Museo Gulbenkian e Cais do Sodré",acts:["gulbenkian","cais"],need:260},
];
var ORDER=["alfama","castelo","baixa","chiado","cais","jeronimosins","belem","gulbenkian"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["baixa","Baixa / Rossio",[38.7110,-9.1380],"A"],
["chiado","Chiado / Bairro Alto",[38.7115,-9.1440],"B"],
["alfama","Alfama / Graça",[38.7120,-9.1300],"C"],
["belem","Belém",[38.6970,-9.2060],"D"],
["cais","Cais do Sodré / Santos / Bica",[38.7070,-9.1480],"E"],
["avenidas","Avenida da Liberdade / Marquês de Pombal",[38.7240,-9.1480],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[38.7140,-9.1395],""]
];
/* imposta di soggiorno: 4 € a persona e a notte, per le prime 7 notti */
var TAX=[["h5","Hotel 4–5 stelle",4],["h3","Hotel fino a 3 stelle, B&B o appartamento",4],["host","Ostello o struttura economica",4],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Uma bica e um pastel de nata","un caffè corto e il dolcetto alla crema: la colazione di Lisbona."],["Torrada o tosta mista","pane tostato con burro, o con prosciutto e formaggio."],["Un dolce di forno","una queijada, un pão de deus (brioche con cocco) o un bolo."]],
pra:[["Bifana","panino con la fetta di maiale marinata, il pasto veloce lisbonese."],["Prego no pão","panino con il filetto di manzo, con la senape."],["Prato do dia","il piatto del giorno delle tasche: carne o pesce con riso e patate."],["Sardine o conserve","con pane e un bicchiere di vino verde."]],
cen:[["Petiscos","assaggi da dividere: polpo, croquettes, formaggi e salumi."],["Costine alla brace","alla Mouraria, con pane e insalata."],["Peixe grelhado","pesce alla griglia con patate e verdure."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Praça do Comércio e l'Arco","Foto","La grande piazza gialla sul Tago, con l'Arco della Rua Augusta in fondo: ottima al tramonto.",[38.7075,-9.1364],"Praça do Comércio, Lisboa","baixa"],
["📷","Elevador de Santa Justa","Foto","La torre neogotica di ferro vista dalla Rua do Ouro o dal Carmo.",[38.7121,-9.1394],"Elevador de Santa Justa, Lisboa","baixa"],
["📷","Miradouro de São Pedro de Alcântara","Foto","La vista sulla Baixa e sul castello dal belvedere del Bairro Alto, con un caffè nel chiosco.",[38.7153,-9.1433],"Miradouro de São Pedro de Alcântara, Lisboa","chiado"],
["📷","Le rovine del Carmo","Foto","Gli archi gotici della chiesa senza tetto, crollata nel 1755: un luogo insolito e fotogenico.",[38.7122,-9.1405],"Convento do Carmo, Lisboa","chiado"],
["📷","Il tram 28 in Alfama","Foto","Il tram giallo che sfiora i muri nei vicoli stretti: aspetta il passaggio all'incrocio vicino alla Sé.",[38.7098,-9.1330],"Sé de Lisboa, Lisboa","alfama"],
["📷","Miradouro de Santa Luzia","Foto","Il pergolato con le bougainvillee, gli azulejos e la vista sui tetti di Alfama e sul Tago.",[38.7116,-9.1296],"Miradouro de Santa Luzia, Lisboa","alfama"],
["📷","Miradouro das Portas do Sol","Foto","La terrazza sui tetti rossi con la cupola di Santa Engrácia e il fiume.",[38.7123,-9.1285],"Miradouro das Portas do Sol, Lisboa","alfama"],
["🤳","Vicoli e azulejos di Alfama","Selfie","Le facciate rivestite di piastrelle e i vicoli con i panni stesi, alle prime ore del mattino.",[38.7112,-9.1305],"Alfama, Lisboa","alfama"],
["📷","Le mura del castello","Foto","Le torri del castello e il panorama a 360 gradi sulla città, soprattutto al tramonto.",[38.7139,-9.1334],"Castelo de São Jorge, Lisboa","castelo"],
["📷","Torre de Belém","Foto","La torre manuelina sul bordo del Tago, dalla passerella in pietra: la luce migliore è al mattino.",[38.6916,-9.2160],"Torre de Belém, Lisboa","belem"],
["📷","Padrão dos Descobrimentos","Foto","Il monumento a prua di caravella, con gli esploratori in pietra e la mappa del mondo sul lastricato.",[38.6937,-9.2059],"Padrão dos Descobrimentos, Lisboa","belem"],
["📷","Il chiostro dei Jerónimos","Foto","Le colonne scolpite del chiostro a due piani: una geometria perfetta con la luce di mattina.",[38.6979,-9.2068],"Mosteiro dos Jerónimos, Lisboa","jeronimosins"],
["📷","Rua Nova do Carvalho (Pink Street)","Foto","La via dipinta di rosa, con gli ombrellini appesi: più bella di giorno, quando è vuota.",[38.7062,-9.1448],"Rua Nova do Carvalho, Lisboa","cais"],
["🤳","Ascensor da Bica","Selfie","Il funicolare giallo nella strada in forte pendenza, con il Tago sullo sfondo.",[38.7090,-9.1453],"Ascensor da Bica, Lisboa","cais"],
["📷","I giardini della Gulbenkian","Foto","Il parco con il laghetto e i viali alberati, un angolo di quiete in centro.",[38.7378,-9.1534],"Jardim Gulbenkian, Lisboa","gulbenkian"]
];
/* avvisi verificati il 10 ottobre 2026 */
var AVV=[
{from:"2026-10-10",to:"2026-10-31",t:"Castello di São Jorge: orario invernale dal 1° novembre",x:"Fino al 31 ottobre il castello è aperto 9–21; dal 1° novembre l'orario scende a 9–18 (ultimo ingresso 17:30). Le mura e le torri chiudono circa mezz'ora prima."},
{from:"2026-10-10",to:"2026-12-31",t:"Torre di Belém in restauro",x:"La Torre di Belém è in restauro e può chiudere a tratti: controlla lo stato sul sito dei monumenti prima di arrivare. Monastero e torre sono chiusi il lunedì."}
];
/* clima medio di Lisbona (indicativo, massime/minime) */
var CLIM=[[15,8],[16,9],[19,11],[20,12],[23,14],[27,17],[29,19],[30,19],[27,18],[23,15],[19,12],[16,9]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Lisbona: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="belem"&&WD===0)meta+=" Oggi è lunedì: monastero e torre sono chiusi, resta la passeggiata sul fiume, il Padrão e i pastéis.";
if(it.id==="alfama"&&(WD===1||WD===5))meta+=" Oggi c'è la Feira da Ladra, il mercato delle pulci (circa 9–18).";
if(it.id==="gulbenkian"&&WD===6)meta+=" Oggi è domenica: dalle 14 l'ingresso è gratuito.";
return meta}
Object.assign(C,{id:"lisbona",n:"Lisbona",cn:"Portogallo",e:"🚋",flag:"🇵🇹",col:["#1c4f8f","#a87900","#f5c400"],k:"lisbona lisboa lisbon portogallo portugal",
TZ:"Europe/Lisbon",LL:[38.7223,-9.1393],CC:"pt",QN:"Lisboa",BK:"Lisbon",ARE:/lisboa|lisbona|lisbon|\b1[0-9]{3}-[0-9]{3}\b/i,VER:"10 ottobre 2026",
Z0:"A",LANG:"pt-PT",LANGN:"portoghese",WATER:"osm",TAXDEF:"h3",TAXMAXN:7,RETC:1,LUNCHO:30,DINO:30,
hub:{n:"Rossio",q:"Estação de metro Rossio, Lisboa"},
SINGLE:{acts:["baixa","chiado","alfama","castelo","belem"],ins:[]},
EXCL:[],
DICON:{jeronimosins:"⛪",gulbenkian:"🖼️",cais:"🌉",castelo:"🏰",belem:"🗼"},
ZN:{A:"in Baixa",B:"al Chiado",C:"ad Alfama",D:"a Belém",E:"a Cais do Sodré",F:"a Príncipe Real e all'Avenida"},
NEAR:{col:"caffè",pra:"tasca o caffè",cen:"tasca",snk:"pastelaria"},
SE:{confeitaria:"🥐",fabrica:"☕",bifanas:"🥪",alentejo:"🍽️",manteigaria:"🍮",trevo:"🥪",kristof:"☕",flores:"🍷",ze:"🍖",jaime:"🍲",pasteis:"🍮",manteigariab:"🍮",comoba:"☕",janis:"🥪",dear:"🍳",solepesca:"🐟"},
TR:{one:1.9,cap:7.25,lbl:"Metro, bus e tram (Navegante)",
 air:{LIS:{one:1.9,n:"Metro per l'aeroporto"}},
 passes:[
 {n:"Navegante 24 ore",d:1,max:1,p:7.25,note:"Il biglietto Navegante 24 ore (7,25 €) vale su metro, bus, tram e funicolari per un giorno intero."},
 {n:"Navegante 72 ore",d:3,p:18.5,only:function(T){return T.n===3},note:"Il biglietto Navegante 72 ore (18,50 €) vale su metro, bus, tram e funicolari."}],
 note:"Prezzi del 2026 secondo le guide (non letti sul sito del metro): carta Navegante 0,50 € una tantum, corsa di metro circa 1,90 € (1,72 € con la carta ricaricata), 24 ore 7,25 €, 72 ore 18,50 €. Tram 28 a bordo 3,30 €. I treni urbani CP (Cascais, Sintra) non sono compresi nel biglietto da 7,25 €."},
FOOD:{co:[7,"Colazione al caffè (bica e pastel de nata)"],pr:[11,"Pranzo (bifana, prato do dia o conserve)"],ce:[14,"Cena (petiscos o costine)"],sp:[4,"Pastéis e spuntini"]},
T:{ride:"In metro o tram",move:"tutto a piedi, in metro o in tram",bags:"«Posso deixar as malas aqui?»",bagsPM:"«Posso deixar as malas até à tarde?»",bagsAM:"«Posso deixar as malas até ao meio-dia?»",
pra:"Una tasca o un caffè",praZ:{A:"Su Rua Augusta e a Praça do Comércio i ristoranti con il menù fuori sono per turisti e costano molto: i posti buoni sono le tasche nelle vie laterali e i banchi di bifanas.",D:"A Belém i pastéis più celebri hanno la fila lunga, ma si mangia sui tavoli interni: la fila scorre in fretta."},
freeLong:"Qualche idea: una passeggiata sul lungofiume da Cais do Sodré, un miradouro al tramonto, una pausa in una pastelaria, un giro sul tram 28, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata verso un miradouro.",
remind:"Se vuoi entrare nel Monastero dei Jerónimos, alla Torre di Belém o al Castello, compra prima il biglietto online: si evita la fila lunga. Il lunedì monastero e torre sono chiusi.",
rain1:"Al coperto: il Museo Gulbenkian, le chiese (la Sé, il Carmo da sotto i portici), il Mercado da Ribeira e le pastelarias.",
rainM:"Al coperto: Museo Gulbenkian, Monastero dei Jerónimos, Castello di São Jorge, la Sé e il Mercado da Ribeira.",
water:"Riempite la borraccia: l'acqua del rubinetto di Lisbona è potabile e quasi ovunque la danno gratis («água da torneira, por favor»). Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Lisbona si pranza tra le 12:30 e le 15 e si cena tardi, dalle 19:30: molte tasche chiudono tra i due servizi, guarda l'orario accanto a ogni locale.",
night:[["🍷","Un bicchiere di vinho verde o una ginjinha (il liquore di ciliegie) in una tasca è il modo lisbonese di chiudere la giornata."],["🕙","Le cucine servono fino alle 22–23 e il metro chiude all'1:00; dopo ci sono i bus notturni."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Lisbona è un'ora indietro rispetto all'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per locali di quartiere: colazione e cena restano intorno ai 15 € a persona. Al tavolo, le olive, il pane e il burro che ti portano sono a pagamento («couvert»): se non li vuoi, rimandali indietro.",
taxNote:"La tassa di soggiorno di Lisbona è di 4 € a persona e a notte, per le prime 7 notti (i bambini piccoli sono esenti). Spesso non è compresa nel prezzo e si paga alla struttura.",
mcrit:"Criteri: almeno 4 stelle su Google, pastelarias, tasche, caffè e locali di quartiere, niente catene. Colazione e cena restano intorno o sotto i 15 € a persona; il pranzo può costare qualcosa di più. Valutazioni e orari da guide e siti dei locali (ottobre 2026), prezzi indicativi: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il metro è la scelta più veloce: dalla stazione Aeroporto a Rossio sono circa 25 minuti con un cambio ad Alameda.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["nav","Carta Navegante (0,50 €) o carta contactless per metro, tram e bus: si compra alle macchinette del metro"],["tk","Biglietto del tram 28 o del 15E: con la Navegante si paga meno che a bordo",function(E){return true}],["jer","Biglietto per il Monastero dei Jerónimos (online: meno coda; chiuso il lunedì)",["jeronimosins"]],["torre","Biglietto per la Torre di Belém (8 €; controlla se è aperta per il restauro)",["belem"]],["cas","Biglietto per il Castello di São Jorge (15 €, online)",["castelo"]],["gul","Biglietto per il Museo Gulbenkian (16 €; chiuso il martedì)",["gulbenkian"]],["shoe","Scarpe comode con la suola buona: i marciapiedi sono di pietra liscia e le salite sono ripide"],["cash","Qualche euro in contanti per Taberna da Rua das Flores, Zé dos Cornos e Tasca do Jaime (solo contanti)"],["cov","Qualcosa per coprire spalle e ginocchia in chiesa",["jeronimosins"]]],
NUM:{1:["um","um"],2:["dois","doish"],3:["três","tresh"],4:["quatro","QUA-tru"],5:["cinco","SIN-cu"],6:["seis","seish"],7:["sete","SE-te"],8:["oito","OI-tu"],9:["nove","NO-ve"],10:["dez","desh"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Bom dia / Boa noite","bom DI-a / BO-a NOI-te"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Uma mesa para "+(N===1?"uma pessoa":nu[0])+", por favor","U-ma ME-za PA-ra "+(N===1?"U-ma pe-SO-a":nu[1])+", pur fa-VOR"],["Un caffè corto e un pastel de nata, per favore","Uma bica e um pastel de nata, por favor","U-ma BI-ca i um pash-TEL de NA-ta, pur fa-VOR"],["Acqua del rubinetto, per favore","Água da torneira, por favor","A-gua da tur-NEI-ra, pur fa-VOR"],["Il conto, per favore","A conta, por favor","a CON-ta, pur fa-VOR"],["Posso pagare con la carta?","Posso pagar com cartão?","PO-su pa-GAR com car-TAUN"],["Quanto costa?","Quanto custa?","QUAN-tu CUSH-ta"],["Dov'è il metro?","Onde fica o metro?","ON-de FI-ca u me-TRO"],["Qual è la linea per l'aeroporto?","Qual é a linha para o aeroporto?","cual e a LI-nha PA-ra u a-e-ro-POR-tu"]];
if(M)fr=fr.concat([["Ho una prenotazione","Tenho uma reserva","TEN-yu U-ma re-ZER-va"],["Posso lasciare i bagagli?","Posso deixar as malas aqui?","PO-su dei-SHAR ash MA-las a-KI"],["A che ora è il check-out?","A que horas é o check-out?","a ke O-ras e u check-AUT"]]);
return fr.concat([["Mi scusi","Desculpe","desh-CUL-pe"],["Grazie mille! (un uomo dice «obrigado», una donna «obrigada»)","Muito obrigado! / Muito obrigada!","MUI-tu o-bri-GA-du / o-bri-GA-da"]])},
taxTxt:function(tx){return "Tassa di soggiorno di Lisbona: "+(tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+"), per le prime 7 notti":"non si paga se sei ospite di amici o parenti")+". I bambini piccoli sono esenti. Spesso non è compresa nel prezzo che trovi sull'annuncio."},
STAYTIPS:["Il metro di Lisbona funziona dalle 6:30 all'1:00; dopo ci sono i bus notturni della Carris. Nei quartieri in collina (Alfama, Graça, Bairro Alto) le salite sono ripide: sul valigione porta l'alloggio in taxi."],
ZONES:[
["🚇 Metro, tram e Navegante",["Compra la carta Navegante (0,50 €) alle macchinette e caricala: 24 ore a 7,25 €, 72 ore a 18,50 €. Per poche corse si può pagare anche con la carta contactless.","Il metro funziona dalle 6:30 all'1:00 con linee verde, rossa, blu e gialla; la stazione di Rossio è sulla linea verde.","Il tram 28 è la linea più famosa: a bordo costa 3,30 €, con la Navegante meno. È affollatissimo e pieno di borseggiatori: sali ai capolinea (Martim Moniz) o scegli un altro tram.","Le strade sono in salita e di pietra liscia, scivolosa con la pioggia: porta scarpe con la suola buona."]],
["🏛️ Baixa e Chiado",["La Baixa è piatta; il Chiado è in salita. Per salire al Chiado senza fatica c'è l'Elevador de Santa Justa (di solito con la fila) o la scalinata del Carmo.","Su Rua Augusta i ristoranti con il menù fuori dalla porta sono i più cari: prendi un panino in una pastelaria e siediti a Praça do Comércio.","Il couvert (pane, burro, olive) che ti portano al tavolo si paga: se non lo vuoi, rimandalo indietro."],["baixa","chiado"]],
["🏰 Alfama e Castello",["Alfama è un labirinto: perdersi fa parte del bello. Cerca la Sé, Santa Luzia e Portas do Sol per le viste migliori.","Il Castello di São Jorge costa 15 €: aperto 9–21 fino al 31 ottobre, 9–18 dal 1° novembre. Meglio salire con il tram o con un taxi, la salita è lunga.","Il martedì e il sabato c'è la Feira da Ladra, il mercato delle pulci a Campo de Santa Clara."],["alfama","castelo"]],
["⛪ Belém",["I Jerónimos sono chiusi il lunedì; da ottobre ad aprile 10–17:30. Il biglietto costa circa 18 €.","La Torre di Belém (8 €) è in restauro e può chiudere a tratti.","I pastéis de Belém si mangiano meglio ai tavoli interni: la fila fuori scorre in fretta.","La Belém bundle (monastero e torre, 21 €) conviene se visiti entrambi."],["jeronimosins","belem"]],
["🖼️ Gulbenkian e Cais do Sodré",["Il Museo Gulbenkian costa 16 € ed è chiuso il martedì; la domenica dalle 14 è gratuito.","Il giardino della Gulbenkian è aperto a tutti, anche senza biglietto.","Il Time Out Market (Mercado da Ribeira) è comodo ma più caro: nelle vie intorno si mangia con meno."],["gulbenkian","cais"]],
["🌅 Un'ora fuori Lisbona",["Sintra è raggiungibile in treno da Rossio in circa 40 minuti: il Palácio da Pena costa circa 20 € e merita una giornata intera.","Cascais e Cabo da Roca si raggiungono con il treno CP da Cais do Sodré."]]],
WTIPS:["L'acqua del rubinetto di Lisbona è potabile: puoi chiederla gratis in ogni locale («água da torneira, por favor») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali, come quelle di Praça do Comércio, non sono da bere."],
GEN:["Il Portogallo usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Lisbona è un'ora indietro rispetto all'Italia: gli orari dei voli sono sempre quelli locali.","Mancia: non è obbligatoria; nei ristoranti si lascia di solito il 5–10% se il servizio è stato buono; nelle tasche si arrotonda.","I pasti: si pranza tra le 12:30 e le 15 e si cena dalle 19:30. Il pane, le olive e il formaggio che ti portano al tavolo sono a pagamento: puoi rimandarli indietro.","Attenzione ai borseggiatori sul tram 28, in metro e a Baixa; e ai venditori che propongono droghe nelle vie turistiche: rifiuta e vai avanti.","Le strade sono di pietra liscia e in salita: porta scarpe con la suola buona.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Metro, bus e tram, anche per oggetti smarriti: <a href="https://www.metrolisboa.pt/" target="_blank" rel="noopener">metrolisboa.pt</a> · <a href="https://www.carris.pt/" target="_blank" rel="noopener">carris.pt</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Lisbona: <a href="https://amblisbona.esteri.it" target="_blank" rel="noopener">amblisbona.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 10 ottobre 2026 non ho trovato scioperi confermati nei trasporti di Lisbona (metro, Carris, treni) per ottobre e novembre. Il 3 giugno 2026 c\'è stato uno sciopero generale che ha fermato il metro, e gli scioperi in Portogallo vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.metrolisboa.pt/" target="_blank" rel="noopener">metrolisboa.pt</a> e <a href="https://www.carris.pt/" target="_blank" rel="noopener">carris.pt</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="330" cy="28" r="12"/><path d="M0 106 V92 Q40 70 100 76 Q130 80 150 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M14 94 V56 H16 V52 H19 V56 H21 V52 H24 V56 H26 V94 Z M26 94 V76 H34 V72 H37 V76 H41 V72 H44 V76 H48 V72 H51 V76 H55 V72 H58 V76 H62 V72 H65 V76 H69 V94 Z M69 94 V50 H71 V46 H74 V50 H76 V46 H79 V50 H81 V94 Z"/></g>'+
'<g style="--k:2"><path d="M114 106 V44 H126 V106 Z M112 44 H128 V38 H112 Z M110 38 H130 V32 H110 Z M116 32 V22 H124 V32 Z M118 22 L120 14 L122 22 Z M126 48 H152 V54 H126 Z"/></g>'+
'<g style="--k:3"><path d="M176 106 V62 H232 V106 Z M192 62 V54 H216 V62 Z M200 54 V46 H208 V54 Z"/></g>'+
'<g style="--k:4"><path d="M248 106 V92 H274 V106 Z M250 92 V86 H272 V92 Z M254 86 V82 H268 V86 Z"/></g>'+
'<g style="--k:5"><path d="M290 106 V84 H328 V106 Z M296 84 V62 H322 V84 Z M294 62 H324 V58 H294 Z M296 58 V50 H300 V58 Z M318 58 V50 H322 V58 Z M295 50 Q298 44 301 50 Z M317 50 Q320 44 323 50 Z"/></g>'+
'<g style="--k:6"><path d="M350 106 V44 H354 V106 Z M386 106 V44 H390 V106 Z M338 82 H400 V85 H338 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M120 54 v8 M120 70 v8 M120 84 v8"/><path d="M190 106 V84 Q204 70 218 84 V106"/><path d="M352 46 Q371 90 388 46 M338 82 Q352 80 352 44"/><path d="M300 70 h14 M300 76 h14"/><path d="M256 94 h14"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="30" cy="10" r="1.6"/><circle cx="96" cy="26" r="1.3"/><circle cx="168" cy="14" r="1.3"/><circle cx="240" cy="26" r="1.3"/><circle cx="282" cy="12" r="1.3"/><circle cx="372" cy="20" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.lisbona);

;var n=window.CITIES["lisbona"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["lisbona"]);
