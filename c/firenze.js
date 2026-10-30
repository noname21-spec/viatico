(function(o){
/* ===== Firenze (dati verificati il 13 ottobre 2026; orari, prezzi e coordinate dei locali da confermare: vedi commento sopra V) ===== */
window.CITIES=window.CITIES||{};
CITIES.firenze=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
FLR:{n:"Firenze Peretola",s:"Firenze-Peretola Amerigo Vespucci",url:"https://www.aeroporto.net/aeroporto-firenze/",live:"Aeroporto di Firenze",inMin:30,buf:100,pos:[43.8100,11.2051],sd:"Peretola · tramvia T2",rt:"Dall'aeroporto: tramvia T2 fino alla stazione di Santa Maria Novella.",
 arr:"Segui i cartelli «Tramvia» all'uscita degli arrivi e sali sulla linea T2: in circa 20–25 minuti arriva alla stazione di Santa Maria Novella e prosegue fino a Piazza dell'Unità d'Italia, a pochi passi dalla stazione. Il tram passa ogni 5–6 minuti circa durante il giorno ed è attivo dalle 5:05 a mezzanotte (fino all'1:30 circa nel fine settimana). In alternativa c'è il Volainbus, che va senza fermate in circa 20 minuti a Via Santa Caterina da Siena, vicino alla stazione.",
 tk:"Tramvia T2: biglietto urbano di Autolinee Toscane, 2 € dal 1° agosto 2026 (era 1,70 €), valido 90 minuti; si compra alle macchinette alla fermata o nel terminal e si convalida prima di salire. Volainbus: 6 € a tratta (10 € andata e ritorno), con corse ogni 30 minuti dalle 5:30 a mezzanotte e mezza.",
 gm:"Aeroporto di Firenze Peretola",
 tips:["Il taxi dall'aeroporto al centro ha una tariffa fissa di circa 22–25 € (di più la sera dopo le 22 e nei festivi), più 1 € per ogni bagaglio: conviene solo in 3–4 persone.","Il biglietto della tramvia è lo stesso dei bus urbani: se pensi di spostarti con i mezzi in città, controlla la sezione Costi.","Sulla pagina dell'aeroporto la tariffa della tramvia compare ancora a 1,50 €: dal 1° agosto 2026 la corsa urbana costa 2 €."]},
PSA:{n:"Pisa Galilei",s:"Pisa Galileo Galilei",url:"https://www.aeroporto.net/aeroporto-pisa/",live:"Aeroporto di Pisa",inMin:80,buf:120,pos:[43.6839,10.3927],sd:"Pisa · PisaMover e treno",rt:"Dall'aeroporto: PisaMover fino a Pisa Centrale, poi treno regionale fino a Firenze Santa Maria Novella.",
 arr:"Segui i cartelli «PisaMover»: la navetta automatica porta in 5 minuti alla stazione di Pisa Centrale, con corse ogni 5–8 minuti dalle 6 a mezzanotte. Da Pisa Centrale prendi un treno regionale per Firenze Santa Maria Novella: il Regionale Veloce impiega circa 50–60 minuti, il regionale con tutte le fermate 70–75, e i treni sono molti ogni giorno (dalle 4:15 alle 22:30 circa). In tutto conta circa 1 ora e 20 minuti. In alternativa c'è un bus diretto (Flibco o Bus4Fly) per Firenze, di circa 60–75 minuti.",
 tk:"PisaMover: 2,70 € a tratta (5,40 € andata e ritorno, valido 30 giorni; dal sito dell'aeroporto, aprile 2026). Treno Pisa Centrale–Firenze Santa Maria Novella: circa 9,30–9,80 € in seconda classe (prezzi da guide e siti di viaggio, da confermare su trenitalia.com). Per il Regionale non serve prenotare il posto; il biglietto cartaceo si convalida prima di salire. Bus Flibco da circa 9 € (da confermare).",
 gm:"Aeroporto di Pisa Galileo Galilei",
 tips:["Alcuni Intercity e Frecciargento fermano a Firenze Campo di Marte, a circa 3 km dal centro, e non a Santa Maria Novella: controlla la stazione di arrivo sul biglietto.","Il taxi dall'aeroporto a Pisa Centrale costa circa 9 € (a tassametro): non serve per andare a Firenze.","Per il ritorno calcola almeno 2 ore prima del volo e controlla l'ultimo treno della sera: verso le 22:30 secondo le guide."]}
};
/* linee (tracciati indicativi) */
var SEG={
t2:{c:"#d4341c",n:"Tramvia T2",p:[[43.8094,11.2056,"Aeroporto di Firenze",2],[43.8030,11.2130],[43.7940,11.2230],[43.7850,11.2350],[43.7790,11.2440],[43.7762,11.2470,"Santa Maria Novella",2]]},
pm:{c:"#2a74c4",n:"PisaMover",p:[[43.6830,10.3930,"Aeroporto di Pisa",2],[43.6960,10.3950,"San Giusto-Aurelia"],[43.7088,10.3985,"Pisa Centrale",2]]},
trn:{c:"#c8102e",n:"Treno regionale Pisa–Firenze",p:[[43.7088,10.3985,"Pisa Centrale",2],[43.6620,10.6330,"Pontedera"],[43.7190,10.9450,"Empoli"],[43.7700,11.1600],[43.7762,11.2478,"Firenze Santa Maria Novella",2]]}
};
var START=[43.7762,11.2478];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
duomo:{t:"Duomo, Battistero e Piazza del Duomo",z:"A",p:1,min:45,id:60,max:90,pos:[43.7731,11.2556],q:"Piazza del Duomo, Firenze",cls:"",
 d:"La cattedrale di Santa Maria del Fiore, con la grande cupola rossa del Brunelleschi, il campanile di Giotto e il Battistero con le porte di bronzo. Dentro la cattedrale si entra gratis: l'interno è sobrio, con gli affreschi del Giudizio dentro la cupola.",
 m:"La cattedrale è gratuita e aperta dal lunedì al sabato, 10:15–15:45; la domenica non si visita (da guide: da confermare). Spalle e ginocchia coperte. Per salire sulla cupola (463 gradini) o sul campanile serve un biglietto a parte, con orario per la cupola: vedi la visita completa in un'altra giornata."},
cupola:{t:"Cupola, Campanile e Battistero (Brunelleschi Pass)",z:"A",p:1,min:150,id:180,max:270,pos:[43.7731,11.2556],q:"Cupola del Brunelleschi, Firenze",cls:"",multi:1,tk:[30,"Brunelleschi Pass: cupola con orario, campanile, Battistero, museo e cripta (30 €, 3 giorni)",1,1],
 win:function(wd){return wd===6?[12*60+45,16*60]:wd===5?[8*60+15,16*60]:[8*60+15,18*60]},
 d:"La salita sotto la cupola del Brunelleschi fino alla cima, con gli affreschi da vicino e la vista sui tetti di Firenze, poi il campanile di Giotto, il Battistero con i mosaici, il Museo dell'Opera del Duomo e la cripta di Santa Reparata sotto la cattedrale.",
 m:"Il Brunelleschi Pass costa 30 € e vale 3 giorni: comprende cupola, campanile, Battistero, museo e cripta, ciascuno una volta. Per la cupola serve prenotare un orario (lo stesso giorno di inizio del pass) e portare un documento: sono 463 gradini senza ascensore. Cupola: lunedì–venerdì 8:15–18:45, sabato fino alle 16:30, domenica 12:45–16:30. Il campanile (414 gradini) è chiuso dal 9 al 13 novembre 2026 per manutenzione. Il museo è chiuso il primo martedì del mese. Orari e prezzo da guide aggiornate nel 2026: conferma su duomo.firenze.it."},
signoria:{t:"Piazza della Signoria e Palazzo Vecchio",z:"A",p:2,min:35,id:50,max:100,pos:[43.7693,11.2558],q:"Piazza della Signoria, Firenze",cls:"walk",sun:1,
 d:"La piazza civile di Firenze, con Palazzo Vecchio e la sua torre merlata, la Loggia dei Lanzi con le statue (il Perseo di Cellini), la Fontana del Nettuno e la copia del David: l'originale è all'Accademia.",
 m:"La piazza è gratis. Dentro Palazzo Vecchio il museo costa 18 € e la Torre di Arnolfo 20 € (prezzi dal 1° febbraio 2026, Comune di Firenze). Di solito è aperto 9–19, il giovedì chiude alle 14 (da guide: da confermare). Intorno alla piazza i caffè storici costano cari: bevi al banco."},
uffizi:{t:"Galleria degli Uffizi",z:"A",p:1,min:90,id:120,max:180,pos:[43.7677,11.2553],q:"Galleria degli Uffizi, Firenze",cls:"",tk:[29,"Uffizi (25 € più 4 € di prenotazione)",1,1],cl:[0],
 win:function(wd){return wd===0?[0,0]:[8*60+15,18*60+15]},
 d:"Il più grande museo d'arte di Firenze, nel palazzo dei Medici: la Nascita di Venere e la Primavera di Botticelli, l'Annunciazione di Leonardo, il Tondo Doni di Michelangelo, e Raffaello, Caravaggio, Giotto. In due ore si vedono i capolavori.",
 m:"Aperto dal martedì alla domenica, 8:15–18:30 (biglietteria fino alle 17:30), chiuso il lunedì. Prenotare è fortemente consigliato: biglietto intero 25 €, più 4 € di prenotazione (cultura.gov.it; il prezzo scende nei mesi di bassa stagione, controlla su uffizi.it). La prima domenica del mese l'ingresso è gratuito ma senza prenotazione, con code lunghissime."},
accademia:{t:"Galleria dell'Accademia e il David",z:"B",p:2,min:40,id:55,max:80,pos:[43.7765,11.2589],q:"Galleria dell'Accademia, Firenze",cls:"",tk:[24,"Accademia (20 € più circa 4 € di prenotazione)",1,1],cl:[0],
 win:function(wd){return wd===0?[0,0]:[8*60+15,18*60+30]},
 d:"Il David di Michelangelo, alto più di cinque metri, in fondo a una galleria con i «Prigioni» incompiuti dello stesso artista. È un museo piccolo: in un'ora si vede tutto.",
 m:"Aperta dal martedì alla domenica, 8:15–18:50 (ultimo ingresso circa 18:20), chiusa il lunedì. Il biglietto intero costa 20 € dal 1° febbraio 2026, più circa 4 € se prenoti l'orario (consigliato). Arriva almeno 15 minuti prima del turno: un ritardo fa perdere la prenotazione. La prima domenica del mese è gratis ma non si prenota."},
pontevecchio:{t:"Ponte Vecchio e il Lungarno",z:"A",p:2,min:20,id:30,max:60,pos:[43.7680,11.2531],q:"Ponte Vecchio, Firenze",cls:"walk",sun:1,
 d:"Il ponte medievale sull'Arno con le botteghe degli orafi appese sopra il fiume. Per fotografarlo meglio, vai sul vicino Ponte Santa Trinita e guardalo da lontano, specie al tramonto.",
 m:"Si attraversa gratis a ogni ora. I negozi di gioielli aprono di giorno e di solito chiudono la domenica e nei festivi."},
santacroce:{t:"Basilica di Santa Croce",z:"C",p:3,min:40,id:55,max:80,pos:[43.7685,11.2625],q:"Basilica di Santa Croce, Firenze",cls:"",tk:[8,"Santa Croce (8 €)",1],
 win:function(wd){return wd===6?[14*60,17*60+15]:[9*60+30,17*60+15]},
 d:"La grande chiesa francescana con le tombe di Michelangelo, Galileo e Machiavelli, il cenotafio di Dante e i cicli di affreschi di Giotto. Fuori c'è una delle piazze più animate della città.",
 m:"Biglietto 8 € (basilica, museo, chiostri e Cappella dei Pazzi). Aperta lunedì–sabato 9:30–17:30, domenica e festivi 14–17:30 (da guide, marzo 2026: da confermare). Spalle e ginocchia coperte."},
smn:{t:"Basilica di Santa Maria Novella",z:"B",p:4,min:30,id:45,max:70,pos:[43.7746,11.2489],q:"Basilica di Santa Maria Novella, Firenze",cls:"",tk:[7.5,"Santa Maria Novella (7,50 €)",1],
 win:function(){return[9*60,17*60+15]},
 d:"La basilica domenicana di fronte alla stazione, con la facciata bianca e verde: dentro la Trinità di Masaccio e il Crocifisso di Giotto, poi il chiostro con gli affreschi.",
 m:"Biglietto 7,50 € (basilica, cimitero degli Avelli e museo). Da ottobre a marzo di solito 9–17:30 (da guide, marzo 2026; il venerdì e la domenica gli orari possono essere diversi: controlla su smn.it). Spalle e ginocchia coperte."},
piazzale:{t:"Piazzale Michelangelo e San Miniato al Monte",z:"D",p:3,min:50,id:70,max:110,pos:[43.7629,11.2650],q:"Piazzale Michelangelo, Firenze",cls:"walk",sun:1,
 d:"Il belvedere sulla collina a sud dell'Arno, con la vista su tutta Firenze, il Duomo e Palazzo Vecchio. Pochi minuti più su, in cima ai gradini, la chiesa romanica di San Miniato al Monte con la facciata di marmo bianco e verde.",
 m:"Il piazzale è gratis e sempre aperto. San Miniato è gratuita: di solito 9:30–13 e 15–19 (da guide: da confermare), con i vespri dei monaci in canto gregoriano verso le 17:30 nei giorni feriali. Ci si arriva con il bus 12 o 13, o a piedi: la salita dura circa 30 minuti."}
};
/* tappe in più per i viaggi di più giorni */
Object.assign(STOPS,{
pitti:{t:"Giardino di Boboli e Palazzo Pitti",z:"D",p:4,min:120,id:150,max:210,pos:[43.7651,11.2500],q:"Giardino di Boboli, Firenze",cls:"",multi:1,cl:[0],tk:[10,"Giardino di Boboli (10 €; Palazzo Pitti a parte)"],
 win:function(wd,d){if(wd===0)return[0,0];var o=d.slice(5),c=(o>="03-29"&&o<="10-24")?18*60+30:(o>="10-25"&&o<="10-31")?17*60+30:(o>="11-01"||o<="02-28")?16*60+30:17*60+30;return[8*60+15,c-30]},
 d:"La reggia dei Medici sulla sponda sud dell'Arno, con il Giardino di Boboli alle spalle: viali, fontane, statue e un grande anfiteatro che sale la collina fino al Forte Belvedere.",
 m:"Il giardino costa 10 € (13 € se prenoti prima). È chiuso il primo e l'ultimo lunedì di ogni mese; chiude alle 17:30 dal 25 ottobre (ora solare) e alle 16:30 in novembre. Il biglietto del Palazzo Pitti e delle sue gallerie è a parte: controlla i prezzi su uffizi.it."},
sanlorenzo:{t:"San Lorenzo, Mercato Centrale e Cappelle Medicee",z:"B",p:4,min:60,id:90,max:150,pos:[43.7753,11.2539],q:"Mercato Centrale, Firenze",cls:"walk",multi:1,
 d:"Il quartiere del mercato: le bancarelle di pelle e souvenir lungo le strade, il Mercato Centrale coperto con i banchi del cibo, la chiesa di San Lorenzo di Brunelleschi e, sul retro, le Cappelle Medicee con le tombe dei Medici e le sculture di Michelangelo.",
 m:"Il piano terra del Mercato Centrale è aperto dal lunedì al sabato, circa 9–15, chiuso la domenica; il primo piano (food hall) è aperto tutti i giorni fino a sera. Le bancarelle di pelle all'aperto sono chiuse il lunedì (da guide). Le Cappelle Medicee costano 11 € (dal 1° febbraio 2026), aperte dal martedì alla domenica 8:15–18:50 (da confermare)."},
santospirito:{t:"Santo Spirito e l'Oltrarno",z:"D",p:5,min:45,id:70,max:110,pos:[43.7663,11.2467],q:"Piazza Santo Spirito, Firenze",cls:"walk",multi:1,sun:1,
 d:"Il quartiere degli artigiani oltre l'Arno: botteghe di restauro, cornici e carta marmorizzata, la piazza di Santo Spirito con la chiesa di Brunelleschi e i locali dei fiorentini.",
 m:"La piazza e le botteghe si vedono gratis. Di giorno molti artigiani lavorano a porta aperta, ma lunedì mattina e domenica diverse botteghe sono chiuse."}
});
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.slice().reverse().map(function(x){return x.w?{w:x.w.slice().reverse(),dash:x.dash}:x})}}
var LEGS={};
P2("start","duomo",11,"walk","A piedi dalla stazione per Via dei Panzani e Via dei Cerretani fino al Duomo, circa 11 minuti.","A piedi per Via dei Cerretani e Via dei Panzani fino alla stazione, circa 11 minuti.",[W([[43.7762,11.2478],[43.7748,11.2503],[43.7738,11.2530],[43.7731,11.2556]])]);
P2("start","sanlorenzo",10,"walk","A piedi per Via Nazionale e Via dell'Ariento fino al Mercato Centrale, circa 10 minuti.","A piedi per Via dell'Ariento e Via Nazionale fino alla stazione, circa 10 minuti.",[W([[43.7762,11.2478],[43.7760,11.2510],[43.7753,11.2539]])]);
P2("start","accademia",17,"walk","A piedi per Via Nazionale e Via Cavour fino alla Galleria dell'Accademia, circa 17 minuti.","A piedi per Via Cavour e Via Nazionale fino alla stazione, circa 17 minuti.",[W([[43.7762,11.2478],[43.7760,11.2510],[43.7762,11.2560],[43.7765,11.2589]])]);
P2("start","signoria",15,"walk","A piedi per Via de' Cerretani, Via dei Calzaiuoli e fino a Piazza della Signoria, circa 15 minuti.","A piedi per Via dei Calzaiuoli e Via dei Cerretani fino alla stazione, circa 15 minuti.",[W([[43.7762,11.2478],[43.7738,11.2530],[43.7720,11.2553],[43.7693,11.2558]])]);
P2("start","pontevecchio",16,"walk","A piedi per Via de' Tornabuoni e il Lungarno fino a Ponte Vecchio, circa 16 minuti.","A piedi per Via de' Tornabuoni fino alla stazione, circa 16 minuti.",[W([[43.7762,11.2478],[43.7730,11.2505],[43.7700,11.2515],[43.7680,11.2531]])]);
P2("duomo","signoria",8,"walk","A piedi per Via dei Calzaiuoli fino a Piazza della Signoria, circa 8 minuti.","A piedi per Via dei Calzaiuoli fino al Duomo, circa 8 minuti.",[W([[43.7731,11.2556],[43.7710,11.2557],[43.7693,11.2558]])]);
P2("duomo","accademia",9,"walk","A piedi per Via Ricasoli fino alla Galleria dell'Accademia, circa 9 minuti.","A piedi per Via Ricasoli fino al Duomo, circa 9 minuti.",[W([[43.7731,11.2556],[43.7745,11.2570],[43.7765,11.2589]])]);
P2("duomo","sanlorenzo",7,"walk","A piedi per Via dei Martelli e Via dei Servi fino a San Lorenzo, circa 7 minuti.","A piedi per Via dei Martelli fino al Duomo, circa 7 minuti.",[W([[43.7731,11.2556],[43.7742,11.2548],[43.7753,11.2539]])]);
P2("duomo","santacroce",13,"walk","A piedi per Via del Proconsolo e Borgo dei Greci fino a Santa Croce, circa 13 minuti.","A piedi per Borgo dei Greci e Via del Proconsolo fino al Duomo, circa 13 minuti.",[W([[43.7731,11.2556],[43.7710,11.2575],[43.7695,11.2600],[43.7685,11.2625]])]);
P2("signoria","uffizi",4,"walk","A piedi dalla piazza, l'ingresso degli Uffizi è sotto il portico accanto a Palazzo Vecchio, circa 4 minuti.","A piedi sotto il portico fino a Piazza della Signoria, circa 4 minuti.",[W([[43.7693,11.2558],[43.7685,11.2556],[43.7677,11.2553]])]);
P2("signoria","pontevecchio",8,"walk","A piedi lungo il Lungarno degli Archibusieri fino a Ponte Vecchio, circa 8 minuti.","A piedi lungo il Lungarno fino a Piazza della Signoria, circa 8 minuti.",[W([[43.7693,11.2558],[43.7685,11.2535],[43.7680,11.2531]])]);
P2("uffizi","pontevecchio",5,"walk","A piedi lungo il Lungarno degli Archibusieri fino a Ponte Vecchio, circa 5 minuti.","A piedi lungo il Lungarno fino agli Uffizi, circa 5 minuti.",[W([[43.7677,11.2553],[43.7676,11.2540],[43.7680,11.2531]])]);
P2("signoria","santacroce",10,"walk","A piedi per Via dei Neri e Borgo dei Greci fino a Santa Croce, circa 10 minuti.","A piedi per Borgo dei Greci fino a Piazza della Signoria, circa 10 minuti.",[W([[43.7693,11.2558],[43.7688,11.2590],[43.7685,11.2625]])]);
P2("pontevecchio","pitti",9,"walk","A piedi oltre il ponte per Via Guicciardini fino a Palazzo Pitti, circa 9 minuti.","A piedi per Via Guicciardini fino a Ponte Vecchio, circa 9 minuti.",[W([[43.7680,11.2531],[43.7665,11.2515],[43.7651,11.2500]])]);
P2("pitti","santospirito",8,"walk","A piedi per Via Mazzetta e Via Sant'Agostino fino a Piazza Santo Spirito, circa 8 minuti.","A piedi per Via Mazzetta fino a Palazzo Pitti, circa 8 minuti.",[W([[43.7651,11.2500],[43.7655,11.2480],[43.7663,11.2467]])]);
P2("start","pitti",22,"walk","A piedi per Via dei Fossi e Ponte alla Carraia fino a Palazzo Pitti, circa 22 minuti.","A piedi per Ponte alla Carraia fino alla stazione, circa 22 minuti.",[W([[43.7762,11.2478],[43.7710,11.2450],[43.7675,11.2480],[43.7651,11.2500]])]);
P2("start","santospirito",20,"walk","A piedi per Via dei Fossi e Ponte alla Carraia fino a Piazza Santo Spirito, circa 20 minuti.","A piedi per Ponte alla Carraia fino alla stazione, circa 20 minuti.",[W([[43.7762,11.2478],[43.7710,11.2450],[43.7675,11.2455],[43.7663,11.2467]])]);
P2("santacroce","piazzale",30,"metro","In bus (linee 12 o 13) dal lungarno, oppure a piedi per Via San Niccolò e le rampe fino a Piazzale Michelangelo, circa 30 minuti.","In discesa a piedi per le rampe e il lungarno fino a Santa Croce, circa 25 minuti.",[{w:[[43.7685,11.2625],[43.7655,11.2640],[43.7629,11.2650]],dash:1}]);
P2("start","smn",3,"walk","A piedi dalla stazione, la basilica è davanti sulla piazza, circa 3 minuti.","A piedi fino alla stazione, circa 3 minuti.",[W([[43.7762,11.2478],[43.7746,11.2489]])]);
P2("smn","sanlorenzo",9,"walk","A piedi per Via del Giglio fino al Mercato Centrale, circa 9 minuti.","A piedi per Via del Giglio fino a Santa Maria Novella, circa 9 minuti.",[W([[43.7746,11.2489],[43.7752,11.2515],[43.7753,11.2539]])]);
/* ritorno in aeroporto (le altre tappe passano dalla stazione di Santa Maria Novella) */
var RET={
FLR:{
 A:{min:35,txt:"Tramvia T2 dalla fermata della stazione di Santa Maria Novella (o da Piazza dell'Unità d'Italia) fino all'aeroporto, circa 20–25 minuti, un tram ogni 5–6 minuti. Ultima corsa a mezzanotte (all'1:30 circa nel fine settimana). In alternativa Volainbus da Via Santa Caterina da Siena, 6 € e circa 20 minuti.",g:[["t2","Santa Maria Novella","Aeroporto di Firenze"]]}},
PSA:{
 A:{min:90,txt:"Treno regionale da Firenze Santa Maria Novella a Pisa Centrale (50–75 minuti secondo il treno), poi PisaMover fino all'aeroporto (5 minuti). Calcola circa 1 ora e 30 minuti in tutto e prendi un treno che arrivi almeno 2 ore prima del volo. Le guide indicano l'ultima partenza verso le 22:30: controlla gli orari su trenitalia.com.",g:[["trn","Firenze Santa Maria Novella","Pisa Centrale"],["pm","Pisa Centrale","Aeroporto di Pisa"]]}}
};
var ARR={
FLR:[["t2","Aeroporto di Firenze","Santa Maria Novella"]],
PSA:[["pm","Aeroporto di Pisa","Pisa Centrale"],["trn","Pisa Centrale","Firenze Santa Maria Novella"]]
};
/* locali: h = orari lun→dom; "" = chiuso.
   ATTENZIONE: Da Nerbone, Mercato Centrale e Mercato di Sant'Ambrogio hanno orari da guide online (ottobre 2026). Per gli altri locali orari, prezzi e coordinate sono da conoscenza generale della città e NON sono stati verificati online il 13 ottobre 2026: gli orari sono stati scritti in modo prudente, con finestre più strette di quelle reali. Le valutazioni Google non sono state lette (r:"n.d."). */
var V={
gilli:{n:"Caffè Gilli",a:"Piazza della Repubblica 39r",z:"A",r:"n.d.",pos:[43.7712,11.2541],h:D7("08:00-21:00"),
 d:"Caffè storico fondato nel 1733 in Piazza della Repubblica: marmi, specchi e vetrine di dolci. Per la colazione prendi cappuccino e cornetto al banco: costa molto meno che al tavolo in sala.",pr:"Al banco una colazione sta sui 5–7 €; al tavolo molto di più (listino non visto, da confermare)."},
rivoire:{n:"Caffè Rivoire",a:"Piazza della Signoria 4r",z:"A",r:"n.d.",pos:[43.7692,11.2558],h:["","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00"],
 d:"Il caffè storico affacciato su Palazzo Vecchio, aperto dal 1872: la cioccolata calda densa è la specialità. Chiuso il lunedì.",pr:"Al banco un caffè o una cioccolata costano poco; sedersi in piazza costa molto di più (listino non visto, da confermare)."},
nerbone:{n:"Da Nerbone",a:"Mercato Centrale, piano terra, Via dell'Ariento",z:"B",r:"n.d.",pos:[43.7766,11.2534],h:["08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00",""],
 d:"Il banco storico dentro il Mercato Centrale, attivo dal 1872: panino con il lampredotto (la trippa di manzo con salsa verde) o con il bollito, da mangiare in piedi tra la gente. Chiuso la domenica.",pr:"Fascia economica: un panino costa pochi euro (orari da guide, che indicano aperture dalle 7 o dalle 8; da confermare)."},
mercatocentrale:{n:"Mercato Centrale (primo piano)",a:"Piazza del Mercato Centrale",z:"B",r:"n.d.",pos:[43.7765,11.2535],h:["10:00-23:00","10:00-23:00","10:00-23:00","10:00-23:00","10:00-00:00","10:00-00:00","10:00-23:00"],
 d:"Il primo piano del mercato di San Lorenzo, una sala con tanti banchi: pizza, trapizzino, tartufo e cucina toscana sotto lo stesso tetto. È utile quando vi mettete d'accordo male sul cosa mangiare.",pr:"Si spende di più che nelle trattorie vere: per esempio i tagliolini al tartufo costano circa 20 €, pizza e panini molto meno (da guide, da confermare)."},
trmario:{n:"Trattoria Mario",a:"Via Rosina 2r",z:"B",r:"n.d.",pos:[43.7768,11.2536],h:["12:00-15:00","12:00-15:00","12:00-15:00","12:00-15:00","12:00-15:00","12:00-15:00",""],
 d:"Trattoria di famiglia vicino al Mercato Centrale, aperta solo a pranzo, con tavoli condivisi: ribollita, pasta, trippa e bistecca. Si paga in contanti e non si prenota. Chiusa la domenica.",pr:"Fascia economica per Firenze (listino non visto; orari e contanti da confermare)."},
gozzi:{n:"Trattoria Sergio Gozzi",a:"Piazza San Lorenzo 8r",z:"B",r:"n.d.",pos:[43.7749,11.2540],h:["12:00-15:00","12:00-15:00","12:00-15:00","12:00-15:00","12:00-15:00","12:00-15:00",""],
 d:"Trattoria all'antica di fronte alla basilica di San Lorenzo, aperta a pranzo: cucina toscana casalinga come ribollita, bollito e piatti del giorno. Chiusa la domenica.",pr:"Fascia economica (listino non visto; orari da confermare)."},
santambrogio:{n:"Mercato di Sant'Ambrogio",a:"Piazza Ghiberti",z:"C",r:"n.d.",pos:[43.7703,11.2679],h:["07:00-14:00","07:00-14:00","07:00-14:00","07:00-14:00","07:00-14:00","07:00-14:00",""],
 d:"Il mercato dei fiorentini, lontano dalla folla del centro: frutta, formaggi, pane e, dentro, la trattoria Da Rocco con cucina locale a prezzi bassi. Chiuso la domenica.",pr:"Fascia economica (orari del mercato da guide; l'orario della trattoria non è stato verificato)."},
pizzaiuolo:{n:"Il Pizzaiuolo",a:"Via dei Macci 113r",z:"C",r:"n.d.",pos:[43.7703,11.2664],h:["19:30-22:30","19:30-22:30","19:30-22:30","19:30-22:30","19:30-22:30","19:30-22:30",""],
 d:"Pizzeria napoletana molto amata dai fiorentini, vicino al mercato di Sant'Ambrogio: pizza tonda con impasto morbido e antipasti. Si riempie presto: conviene prenotare. Chiusa la domenica.",pr:"Una pizza e una bevanda restano intorno ai 15 € (prezzi non visti, da confermare)."},
casalinga:{n:"Trattoria La Casalinga",a:"Via dei Michelozzi 9r",z:"D",r:"n.d.",pos:[43.7647,11.2470],h:["12:00-14:30,19:00-21:30","12:00-14:30,19:00-21:30","12:00-14:30,19:00-21:30","12:00-14:30,19:00-21:30","12:00-14:30,19:00-21:30","12:00-14:30,19:00-21:30",""],
 d:"Trattoria di cucina toscana casalinga vicino a Piazza Santo Spirito, con tavoli ravvicinati: ribollita, pappa al pomodoro, pasta, arrosti. Chiusa la domenica.",pr:"Fascia media-bassa: un pasto con primo e acqua sta intorno ai 15–20 € (prezzi non visti, da confermare)."},
gustapizza:{n:"Gustapizza",a:"Via Maggio 46r",z:"D",r:"n.d.",pos:[43.7672,11.2498],h:["","12:30-14:30,19:30-22:30","12:30-14:30,19:30-22:30","12:30-14:30,19:30-22:30","12:30-14:30,19:30-22:30","12:30-14:30,19:30-22:30","12:30-14:30,19:30-22:30"],
 d:"Pizza napoletana a prezzi bassi, in Via Maggio, a due passi da Palazzo Pitti e da Santo Spirito: locale piccolo, con coda. Chiusa il lunedì.",pr:"Una pizza sta sotto i 10 € (listino non visto, da confermare)."},
vivoli:{n:"Gelateria Vivoli",a:"Via Isola delle Stinche 7r",z:"C",r:"n.d.",pos:[43.7688,11.2589],h:["","10:00-22:00","10:00-22:00","10:00-22:00","10:00-22:00","10:00-22:00","10:00-22:00"],
 d:"Una delle gelaterie più antiche di Firenze, a pochi passi da Santa Croce: gelato artigianale servito in coppetta o cono, con gusti classici. Chiusa il lunedì.",pr:"Una coppetta piccola costa pochi euro (listino non visto, da confermare)."},
neri:{n:"Gelateria dei Neri",a:"Via dei Neri 9/11r",z:"A",r:"n.d.",pos:[43.7687,11.2584],h:D7("11:00-22:00"),
 d:"Gelateria artigianale in una via stretta dietro gli Uffizi, tra Santa Croce e Piazza della Signoria: gusti di frutta e cioccolato, aperta fino a tardi.",pr:"Una coppetta o un cono costano pochi euro (listino non visto, da confermare)."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["gilli","rivoire"],B:["gilli","rivoire"],C:["gilli","rivoire"],D:["gilli","rivoire"]},
pra:{A:["nerbone","gozzi","trmario","mercatocentrale"],B:["nerbone","trmario","gozzi","mercatocentrale"],C:["santambrogio","gozzi","mercatocentrale"],D:["casalinga","gustapizza","mercatocentrale"]},
cen:{A:["pizzaiuolo","casalinga","mercatocentrale"],B:["mercatocentrale","pizzaiuolo","casalinga"],C:["pizzaiuolo","casalinga","mercatocentrale"],D:["casalinga","gustapizza","pizzaiuolo"]},
snk:{A:["neri","vivoli","rivoire"],B:["nerbone","neri","vivoli"],C:["vivoli","neri"],D:["neri","vivoli"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"duomo",t:"Duomo, Cupola e Piazza della Signoria",acts:["cupola","signoria","pontevecchio"],need:330,core:1},
{id:"uffizi",t:"Uffizi e Galleria dell'Accademia",acts:["uffizi","accademia"],need:300,core:1,cl:[0]},
{id:"croce",t:"Santa Croce, Piazzale Michelangelo e San Miniato",acts:["santacroce","piazzale"],need:240},
{id:"oltrarno",t:"Giardino di Boboli, Palazzo Pitti e Santo Spirito",acts:["pitti","santospirito"],need:300,cl:[0]},
{id:"lorenzo",t:"Santa Maria Novella, San Lorenzo e Mercato Centrale",acts:["smn","sanlorenzo"],need:200}
];
var ORDER=["smn","sanlorenzo","accademia","duomo","cupola","signoria","uffizi","pontevecchio","santacroce","pitti","santospirito","piazzale"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["smn","Stazione / Santa Maria Novella",[43.7750,11.2485],"B"],
["lorenzo","San Lorenzo / Mercato Centrale",[43.7755,11.2540],"B"],
["marco","San Marco / Santissima Annunziata",[43.7775,11.2600],"B"],
["duomo","Duomo / Piazza della Signoria",[43.7710,11.2558],"A"],
["croce","Santa Croce / Sant'Ambrogio",[43.7700,11.2650],"C"],
["oltrarno","Oltrarno / Santo Spirito",[43.7655,11.2480],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[43.7696,11.2558],""]
];
/* imposta di soggiorno: gli importi non sono stati verificati online, quindi non entrano nei costi */
var TAX=[["h5","Hotel 4–5 stelle",{}],["h3","Hotel fino a 3 stelle, B&B o appartamento",{}],["host","Ostello o struttura economica",{}],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Cappuccino e cornetto al banco","si paga alla cassa e si porta lo scontrino al banco: in piedi costa meno che al tavolo."],["Schiacciata","la focaccia fiorentina, bassa e unta d'olio e sale, da mangiare appena sfornata."],["Un caffè","a Firenze «un caffè» è l'espresso; il cappuccino si beve solo la mattina."]],
pra:[["Panino con il lampredotto","la trippa di manzo bollita nel panino, con salsa verde o piccante: il cibo di strada dei fiorentini."],["Ribollita","la zuppa di pane, fagioli e cavolo nero."],["Pappa al pomodoro","pane, pomodoro e basilico, servita tiepida."],["Schiacciata farcita","con prosciutto, formaggio o salumi."]],
cen:[["Bistecca alla fiorentina","la grande costata di manzo alla griglia, che si paga a peso e di solito si divide in due: chiedi sempre il prezzo prima."],["Pappardelle al cinghiale","la pasta larga con il ragù di cinghiale."],["Ribollita o peposo","la zuppa di pane e il brasato al pepe, piatti poveri della Toscana."],["Cantucci e vin santo","i biscotti alle mandorle da intingere nel vino dolce."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Duomo da Via dei Servi","Foto","L'inquadratura classica: la via dritta con la cupola del Brunelleschi che chiude lo sfondo.",[43.7742,11.2589],"Via dei Servi, Firenze","duomo"],
["🤳","Le porte del Battistero","Selfie","Le porte di bronzo dorato del Battistero, con il Duomo che si alza dietro di te.",[43.7731,11.2562],"Battistero di San Giovanni, Firenze","duomo"],
["📷","Loggia dei Lanzi e Palazzo Vecchio","Foto","Le statue sotto la loggia con la torre di Palazzo Vecchio dietro, al mattino presto o alla sera.",[43.7691,11.2557],"Loggia dei Lanzi, Firenze","signoria"],
["🤳","Il David di Piazza della Signoria","Selfie","La copia del David davanti a Palazzo Vecchio: l'originale è all'Accademia.",[43.7693,11.2560],"Piazza della Signoria, Firenze","signoria"],
["📷","Ponte Vecchio da Ponte Santa Trinita","Foto","Il ponte visto da monte, con le case sul fiume che sembrano appese: la luce migliore è al tramonto.",[43.7690,11.2500],"Ponte Santa Trinita, Firenze","pontevecchio"],
["📷","La facciata di Santa Croce","Foto","Il marmo bianco e verde della facciata dalla piazza, con la statua di Dante davanti.",[43.7685,11.2624],"Piazza di Santa Croce, Firenze","santacroce"],
["📷","Santa Maria Novella dalla piazza","Foto","La facciata bianca e verde di fronte alla stazione, con l'obelisco sui piedi di tartaruga.",[43.7747,11.2490],"Piazza Santa Maria Novella, Firenze","smn"],
["📷","Firenze da Piazzale Michelangelo","Foto","Tutta la città con il Duomo e Palazzo Vecchio e l'Arno: al tramonto c'è molta gente, all'alba è quasi deserto.",[43.7629,11.2650],"Piazzale Michelangelo, Firenze","piazzale"],
["📷","La facciata di San Miniato","Foto","La chiesa romanica in cima ai gradini, con il marmo a disegni geometrici.",[43.7598,11.2653],"Basilica di San Miniato al Monte, Firenze","piazzale"],
["📷","Piazza Santo Spirito","Foto","La piazza con la chiesa di Brunelleschi e i tavolini dei locali, di mattina senza folla.",[43.7663,11.2468],"Piazza Santo Spirito, Firenze","santospirito"]
];
/* avvisi verificati il 13 ottobre 2026 */
var AVV=[
{from:"2026-10-13",to:"2026-12-31",t:"Battistero: mosaici coperti dai ponteggi",x:"Nel 2026 i mosaici della volta del Battistero possono essere nascosti dai ponteggi per i lavori di restauro: dentro si vede ugualmente il resto, ma non tutto il soffitto."},
{from:"2026-10-25",to:"2027-03-27",t:"Orari invernali: i musei chiudono prima",x:"Con il ritorno all'ora solare (25 ottobre) il Giardino di Boboli chiude alle 17:30, e in novembre alle 16:30. Anche gli altri monumenti chiudono prima: calcola le visite al mattino."},
{from:"2026-11-01",to:"2026-11-01",t:"Prima domenica: musei statali gratis, code lunghe",x:"Domenica 1 novembre Uffizi, Accademia e Bargello sono gratuiti ma non si possono prenotare: le code sono molto lunghe. Se vuoi entrare con calma, scegli un altro giorno."},
{from:"2026-11-09",to:"2026-11-13",t:"Campanile di Giotto chiuso",x:"Dal 9 al 13 novembre 2026 il campanile di Giotto è chiuso per manutenzione. La cupola del Brunelleschi resta aperta."},
{from:"2026-12-06",to:"2026-12-06",t:"Prima domenica: musei statali gratis, code lunghe",x:"Domenica 6 dicembre Uffizi, Accademia e Bargello sono gratuiti ma non si possono prenotare: le code sono molto lunghe."}
];
/* clima medio di Firenze (indicativo, massime/minime) */
var CLIM=[[10,2],[12,3],[16,5],[20,8],[24,12],[29,16],[32,19],[32,19],[27,15],[21,11],[14,6],[10,3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Firenze: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="duomo"&&WD===6)meta+=" Oggi è domenica: la cattedrale non si visita (si entra solo per la messa) e la cupola apre dalle 12:45.";
if(it.id==="signoria"&&WD===3)meta+=" Oggi è giovedì: Palazzo Vecchio chiude alle 14.";
if(it.id==="santacroce"&&WD===6)meta+=" Oggi è domenica: Santa Croce apre solo dalle 14.";
if(it.id==="sanlorenzo"&&WD===6)meta+=" Oggi è domenica: il piano terra del Mercato Centrale è chiuso, resta aperta la food hall al primo piano.";
if(it.id==="sanlorenzo"&&WD===0)meta+=" Oggi è lunedì: le Cappelle Medicee e le bancarelle di pelle all'aperto sono chiuse.";
return meta}
Object.assign(C,{id:"firenze",n:"Firenze",cn:"Italia",e:"🌷",flag:"🇮🇹",col:["#9c2a2a","#c9a24a","#6b4a3a"],k:"firenze florence italia",
TZ:"Europe/Rome",LL:[43.7696,11.2558],CC:"it",QN:"Firenze",BK:"Florence",ARE:/firenze|florence|\b501\d{2}\b/i,VER:"13 ottobre 2026",
Z0:"B",LANG:"it-IT",LANGN:"fiorentino",NOSAY:1,WATER:"osm",TAXDEF:"h3",TAXMAXN:7,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Stazione di Santa Maria Novella",q:"Stazione di Firenze Santa Maria Novella"},
SINGLE:{acts:["duomo","accademia","signoria","uffizi","pontevecchio","santacroce","piazzale","smn"],ins:[]},
EXCL:[["cupola","duomo","La cupola, il campanile e il Battistero li visiti in un'altra giornata: oggi rimane la sosta in piazza e dentro la cattedrale, che è gratis."]],
DICON:{cupola:"⛪",uffizi:"🖼️",accademia:"🗿",pontevecchio:"🌉",santacroce:"⚱️",smn:"⛪",piazzale:"🌅",pitti:"🌳",sanlorenzo:"🥩",santospirito:"🍷"},
ZN:{A:"nel centro storico",B:"tra Santa Maria Novella e San Lorenzo",C:"a Santa Croce e Sant'Ambrogio",D:"in Oltrarno"},
NEAR:{col:"caffè storico",pra:"panino o trattoria",cen:"trattoria o pizzeria",snk:"gelateria"},
SE:{gilli:"☕",rivoire:"☕",nerbone:"🥪",mercatocentrale:"🍕",trmario:"🍝",gozzi:"🍝",santambrogio:"🥪",pizzaiuolo:"🍕",casalinga:"🍝",gustapizza:"🍕",vivoli:"🍨",neri:"🍨"},
TR:{one:2,lbl:"Bus e tramvia (Autolinee Toscane)",
 air:{FLR:{one:2,n:"Tramvia T2 per il centro"},PSA:{one:12,n:"PisaMover e treno per Firenze (circa 12 €)"}},
 passes:[],
 note:"Dal 1° agosto 2026 la corsa singola urbana di Autolinee Toscane costa 2 € (era 1,70 €) e vale 90 minuti su bus e tramvia, anche con cambi. Il centro storico è piccolo e quasi tutto si fa a piedi, quindi per la maggior parte dei viaggi bastano pochi biglietti: i prezzi dei biglietti da 24, 72 ore e settimanali non sono stati verificati, controlla su at-bus.it. Il biglietto si compra alle macchinette, in tabaccheria o con l'app, e si convalida prima di salire. L'aeroporto di Pisa non è compreso: PisaMover 2,70 € e treno circa 9–10 €."},
FOOD:{co:[5,"Colazione al banco (cappuccino e cornetto)"],pr:[12,"Pranzo (panino o trattoria)"],ce:[18,"Cena (trattoria o pizza)"],sp:[4,"Gelato e assaggi"]},
T:{ride:"A piedi, in tram o in bus",move:"quasi tutto a piedi",bags:"«Posso lasciare i bagagli?»",bagsPM:"«Posso lasciare i bagagli fino al pomeriggio?»",bagsAM:"«Posso lasciare i bagagli fino a mezzogiorno?»",
pra:"Un panino o una trattoria",praZ:{A:"Intorno al Duomo e a Piazza della Signoria molti locali espongono il menù turistico fuori dalla porta: per mangiare meglio spostati nelle vie laterali o verso San Lorenzo.",B:"Il Mercato Centrale ha il piano terra aperto fino al primo pomeriggio e il primo piano fino a sera.",C:"A Sant'Ambrogio mangiano i fiorentini: il mercato chiude intorno alle 14."},
freeLong:"Qualche idea: una passeggiata sul Lungarno, un gelato a Santa Croce, i giardini di Boboli, i vicoli dell'Oltrarno, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure passeggia lungo l'Arno e prendi un gelato.",
remind:"Per gli Uffizi, l'Accademia e la cupola del Duomo compra prima il biglietto con orario: nei giorni di punta sono esauriti. Uffizi e Accademia sono chiusi il lunedì.",
rain1:"Al coperto: il Duomo (la cattedrale è gratis), Santa Croce, Santa Maria Novella, San Lorenzo e le chiese del centro.",
rainM:"Al coperto: Uffizi, Accademia, Palazzo Vecchio, Santa Croce, il Museo dell'Opera del Duomo e le Cappelle Medicee.",
water:"L'acqua del rubinetto di Firenze è potabile: porta la borraccia e riempila in alloggio. Attivate «Acqua» sulla mappa per vedere le fontanelle più vicine, dai dati di OpenStreetMap.",
kitchen:"A Firenze si pranza tra le 12:30 e le 14:30 e si cena dalle 19:30: molte trattorie chiudono tra i due servizi e alcune sono aperte solo a pranzo, quindi guarda l'orario accanto a ogni locale.",
night:[["🍨","Un gelato dopo cena è un rito: scegli una gelateria artigianale, con colori naturali e il gelato non montato in alto."],["🕙","Le trattorie servono fino alle 22–22:30; la tramvia T2 gira fino a mezzanotte (all'1:30 circa nel fine settimana)."],["🥐","Molti caffè aprono alle 7–8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è buona)",
fuso:"Stesso fuso orario e stessa lingua: non serve adattatore né cambio",
plug:"Caricabatterie (la spina è quella italiana, nessun adattatore)",
foodNote:"I pasti sono stime per locali di quartiere: colazione e panini restano sotto i 12 €, una cena in trattoria intorno ai 18–25 €. I prezzi dei singoli locali non sono stati verificati, quindi sono indicativi.",
taxNote:"L'imposta di soggiorno di Firenze si paga a persona e a notte, di solito per un massimo di 7 notti, e dipende dalla categoria della struttura. L'importo non è stato verificato e non è compreso nei costi stimati: chiedilo alla struttura o controllalo sul sito del Comune di Firenze.",
mcrit:"Criteri: panini, trattorie, pizzerie, caffè storici e gelaterie di quartiere, niente catene. Orari e prezzi sono quelli di guide e di conoscenza della città (ottobre 2026) e non sono stati letti sui siti dei locali, né le valutazioni su Google: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il tram T2 dall'aeroporto di Firenze passa spesso e si prende dagli arrivi: il biglietto urbano (2 €) va convalidato prima di salire.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietti dei mezzi: alle macchinette alla fermata o in tabaccheria, da convalidare alla prima corsa"],["pis","Biglietto del treno da Pisa Centrale e PisaMover (2,70 €), comprati prima o alla macchinetta",function(E){return E.cfg.to==="PSA"||E.cfg.rt==="PSA"}],["uff","Biglietto con orario per gli Uffizi (uffizi.it, 25 € più 4 € di prenotazione)",["uffizi"]],["acc","Biglietto con orario per l'Accademia (David)",["accademia"]],["cup","Brunelleschi Pass (30 €) con orario per la cupola e un documento d'identità (duomo.firenze.it)",["cupola"]],["cash","Qualche euro in contanti per trattorie, mercati e bar piccoli"],["cov","Qualcosa per coprire spalle e ginocchia nelle chiese",["duomo","cupola","santacroce","smn","piazzale"]]],
NUM:{1:["una persona","U-na per-SO-na"]},
PHR:function(){return [["Andiamo!","Si va!","si VA"],["Che stai facendo?","Icché tu fai?","ik-KE tu FAI"],["Che cos'è?","Icché l'è?","ik-KE LE"],["Che vuoi?","Icché tu vòi?","ik-KE tu VOI"],["Mi piace","Mi garba","mi GAR-ba"],["Non c'è problema","Un c'è problema","un ce pro-BLE-ma"],["Non lo so","Un lo so","un lo SO"],["Dove vai?","Dove tu vai?","DO-ve tu VAI"],["Che si mangia?","Icché si mangia?","ik-KE si MAN-gia"],["Papà","Babbo","BAB-bo"]]},
PHN:"Un po' di fiorentino, per divertirsi e farsi capire dai fiorentini: la prima riga è l'italiano, sotto c'è la versione di Firenze. Una curiosità: la «c» tra due vocali si pronuncia aspirata, quasi come una «h» (la casa suona «la hasa»). Non serve la voce: sono parole da leggere e usare con un sorriso.",
taxTxt:function(tx){return "Imposta di soggiorno di Firenze: "+(tx[2]===0?"non si paga se sei ospite di amici o parenti":"si paga a persona e a notte ("+tx[1].toLowerCase()+"), di solito per un massimo di 7 notti, ma l'importo non è stato verificato: chiedilo alla struttura o controllalo sul sito del Comune di Firenze")+"."},
STAYTIPS:["La tramvia T2 va dalla stazione di Santa Maria Novella all'aeroporto fino a mezzanotte (all'1:30 circa nel fine settimana). Il centro storico è in gran parte una zona a traffico limitato: si gira a piedi."],
ZONES:[
["🚉 Stazione e mezzi",["La stazione di Santa Maria Novella è a 10 minuti a piedi dal Duomo: nel centro si cammina quasi sempre.","La corsa singola di bus e tramvia costa 2 € dal 1° agosto 2026 e vale 90 minuti; si convalida prima di salire.","La tramvia T2 collega l'aeroporto di Firenze alla stazione in 20–25 minuti.","Le auto non entrano nella zona a traffico limitato (ZTL) del centro: lascia la macchina fuori."]],
["⛪ Duomo e Battistero",["Dentro la cattedrale si entra gratis (lunedì–sabato 10:15–15:45); cupola, campanile, Battistero e museo si visitano con il Brunelleschi Pass da 30 €, valido 3 giorni.","La cupola ha 463 gradini e un orario prenotato; serve un documento d'identità.","Spalle e ginocchia coperte in tutte le chiese."],["duomo","cupola"]],
["🖼️ Uffizi e Accademia",["Uffizi: 25 € più 4 € di prenotazione, chiusi il lunedì; aperti 8:15–18:30, biglietteria fino alle 17:30.","Accademia (il David): 20 € dal 1° febbraio 2026, più circa 4 € per prenotare, chiusa il lunedì.","La prima domenica del mese i musei statali sono gratis ma non si prenota: code molto lunghe."],["uffizi","accademia"]],
["🏛️ Piazza della Signoria e Ponte Vecchio",["Palazzo Vecchio: museo 18 €, torre 20 € (prezzi dal 1° febbraio 2026); il giovedì chiude alle 14.","Per una foto di Ponte Vecchio vai sul Ponte Santa Trinita, poco a monte.","I ristoranti con il menù turistico intorno alla piazza costano molto: scegli le vie laterali."],["signoria","pontevecchio"]],
["⚱️ Santa Croce",["Biglietto 8 €; di solito aperta lunedì–sabato 9:30–17:30 e domenica dalle 14.","La piazza davanti è una delle più vive della città: di sera molti locali."],["santacroce"]],
["⛪ Santa Maria Novella e San Lorenzo",["La basilica di Santa Maria Novella è di fronte alla stazione: 7,50 € (da guide).","Il Mercato Centrale ha il piano terra con i banchi del mercato (lunedì–sabato fino al primo pomeriggio) e il primo piano con tanti locali aperti anche la sera.","Le bancarelle di pelle intorno sono per turisti: tratta sul prezzo."],["smn","sanlorenzo"]],
["🌳 Oltrarno e Piazzale Michelangelo",["Giardino di Boboli: 10 €, chiuso il primo e l'ultimo lunedì del mese, in inverno chiude alle 16:30–17:30.","Piazzale Michelangelo e San Miniato al Monte sono gratuiti: sali a piedi dal lungarno o con il bus 12 o 13.","I vespri con canto gregoriano a San Miniato sono verso le 17:30 nei giorni feriali."],["pitti","santospirito","piazzale"]]],
WTIPS:["L'acqua del rubinetto di Firenze è potabile: porta una borraccia e risparmi sulle bottigliette.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Le fontane monumentali, come quella del Nettuno, non sono da bere.","Al ristorante puoi chiedere l'acqua del rubinetto, ma di solito portano bottiglie a pagamento: se non la vuoi, dillo subito."],
GEN:["Stessa lingua e stesso fuso orario, nessuna valuta da cambiare.","A Firenze si pranza tra le 12:30 e le 14:30 e si cena dalle 19:30; molte trattorie sono chiuse la domenica.","Il coperto (di solito pochi euro a persona) è legale se segnato nel menù; la mancia non è obbligatoria.","Al bar, al banco si paga meno che al tavolo: prima si paga alla cassa, poi si porta lo scontrino al barista.","Gli Uffizi, l'Accademia e la cupola del Duomo vanno prenotati con orario: nei giorni di punta sono esauriti.","I borseggiatori lavorano sulla folla: intorno al Duomo, a Ponte Vecchio e sui bus affollati tieni lo zaino davanti.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Numero unico di emergenza · <a class="call" href="tel:118">📞 118</a> Ambulanza</li><li>🚌 Bus e tramvia, anche per oggetti smarriti: <a href="https://www.at-bus.it/" target="_blank" rel="noopener">at-bus.it</a>. Treni: <a href="https://www.trenitalia.com/" target="_blank" rel="noopener">trenitalia.com</a>.</li><li>🛡️ Per denunciare un furto: qualsiasi commissariato di Polizia di Stato o stazione dei Carabinieri.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi locali annunciati a Firenze. Nei giorni prima controllate il servizio su <a href="https://www.at-bus.it/" target="_blank" rel="noopener">at-bus.it</a> e, se usate il treno, su <a href="https://www.trenitalia.com/" target="_blank" rel="noopener">trenitalia.com</a>; gli scioperi nazionali sono elencati su <a href="https://scioperi.mit.gov.it/" target="_blank" rel="noopener">scioperi.mit.gov.it</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V92 Q60 74 120 84 Q170 92 210 106 Z"/><path d="M250 106 Q300 84 360 88 Q388 92 400 98 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 V68 H74 V106 Z M8 68 H76 V62 H8 Z M8 62 V57 H14 V62 Z M20 62 V57 H26 V62 Z M58 62 V57 H64 V62 Z M70 62 V57 H76 V62 Z"/><path d="M36 62 V32 H54 V62 Z M31 32 H59 V26 H31 Z M31 26 V22 H37 V26 Z M43 26 V22 H49 V26 Z M53 26 V22 H59 V26 Z M38 26 V16 H52 V26 Z M36 16 H54 L45 6 Z"/></g>'+
'<g style="--k:2"><path d="M92 106 V76 H178 V106 Z M100 76 Q102 46 135 26 Q168 46 170 76 Z M131 26 V14 H139 V26 Z M133 14 V6 H137 V14 Z"/></g>'+
'<g style="--k:3"><path d="M188 106 V32 H208 V106 Z M186 32 H210 V27 H186 Z M188 27 V22 H208 V27 Z"/></g>'+
'<g style="--k:4"><path d="M236 98 V74 H320 V98 Z M232 74 H324 L316 68 H240 Z M244 68 V62 H260 V68 Z M290 68 V62 H306 V68 Z M232 98 H324 V106 H232 Z"/></g>'+
'<g style="--k:5"><path d="M350 106 V78 H392 V106 Z M347 78 H395 L371 60 Z M358 60 V54 H362 V60 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M110 76 v-8 M122 76 v-18 M134 76 v-22 M146 76 v-18 M158 76 v-8"/><path d="M196 52 v8 M196 70 v8 M196 88 v8"/><path d="M248 106 Q260 92 272 106 M278 106 Q290 90 302 106 M306 106 Q316 94 326 106"/><path d="M356 84 h30 M356 94 h30"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="45" cy="12" r="1.6"/><circle cx="116" cy="14" r="1.3"/><circle cx="198" cy="10" r="1.3"/><circle cx="268" cy="30" r="1.3"/><circle cx="330" cy="14" r="1.3"/><circle cx="392" cy="40" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.firenze);

;var n=window.CITIES["firenze"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["firenze"]);
