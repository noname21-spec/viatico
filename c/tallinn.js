(function(o){
/* ===== Tallinn (dati verificati il 14 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.tallinn=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
TLL:{n:"Tallinn Lennart Meri (TLL)",s:"Lennart Meri Tallinn Airport",url:"https://www.tallinn-airport.ee/en/",live:"Tallinn",inMin:40,buf:120,pos:[59.4133,24.8328],sd:"Aeroporto TLL · tram 4",rt:"Dall'aeroporto: tram 4 fino alla fermata Hobujaama, ai piedi della città vecchia (circa 20 minuti). In alternativa bus 2 fino a Viru Keskus.",
 arr:"Dall'Italia si entra in Estonia senza controllo passaporti (spazio Schengen). È un aeroporto piccolo: dopo il ritiro bagagli esci dall'arrivo e la fermata del tram è collegata al terminal da un passaggio coperto. La soluzione più semplice è il tram 4 fino a Hobujaama, a pochi minuti a piedi dalle mura della città vecchia (circa 15–21 minuti, secondo le fonti). In alternativa il bus 2 (circa 20–25 minuti) porta in centro, fermandosi accanto a Viru Keskus. Un taxi o un'auto con app (Bolt) impiega circa 10–15 minuti. In tutto sono circa 40–50 minuti dall'atterraggio alla città vecchia.",
 tk:"Biglietto: tram e bus costano 2 € per la corsa di un'ora (tariffa turisti, 2026: da confermare su transport.tallinn.ee). Si paga con una carta contactless Visa o Mastercard sul validatore a bordo, oppure con l'app o il sito tallinn.pilet.ee; non contare sul contante. Il taxi dall'aeroporto al centro costa di solito 8–13 € (stima da guide: controlla il prezzo nell'app prima di partire). Il navetta privata per il centro costa circa 18 € (da una pagina dell'Università di Tallinn: da confermare).",
 gm:"Tallinn Airport tram stop",
 tips:["L'aeroporto è a soli 4 km dal centro: il tram 4 è la scelta più semplice ed economica.","Il tram 4 corre dalle 5:25 circa alle 00:45 (orari del 2017 da un articolo: da confermare); la notte restano taxi e app come Bolt.","Il primo biglietto va convalidato sul validatore appena salite: i controllori fanno verifiche e la multa è salata (importo da controllare)."]}
};
/* linee (tracciati indicativi) */
var SEG={
tm4:{c:"#0072ce",n:"Tram 4 dall'aeroporto",p:[[59.4133,24.8328,"Aeroporto",2],[59.4220,24.8040,"Ülemiste"],[59.4290,24.7770,"Tondi"],[59.4377,24.7502,"Hobujaama",2]]},
tm1:{c:"#e30613",n:"Tram 1 o 3 per Kadriorg",p:[[59.4377,24.7502,"Hobujaama",2],[59.4360,24.7690,"Viru–Kadriorg"],[59.4378,24.7880,"Kadriorg",2]]}
};
var START=[59.4377,24.7502];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
raekoja:{t:"Piazza del Municipio e città vecchia",z:"A",p:1,min:60,id:90,max:150,pos:[59.4372,24.7454],q:"Raekoja plats, Tallinn",cls:"walk",sun:1,
 d:"La piazza medievale di Tallinn, circondata da case di mercanti, con il Municipio gotico e la Farmacia del Consiglio, una delle più antiche d'Europa. Da qui si cammina per le stradine di ciottoli della Vanalinn, la città vecchia dentro le mura.",
 m:"La piazza si vede gratis a qualsiasi ora. La torre del Municipio apre di norma solo d'estate (circa 4 €, da una guida: non aperta in autunno e inverno). Dal 20 novembre 2026 al 6 gennaio 2027 la piazza ospita il mercatino di Natale, aperto ogni giorno dalle 10 alle 20 (fonte: visittallinn.ee). La Farmacia del Consiglio (Raeapteek) costa circa 2 € (da confermare)."},
toompea:{t:"Toompea e Cattedrale Alexander Nevskij",z:"A",p:1,min:50,id:75,max:110,pos:[59.4358,24.7394],q:"Alexander Nevsky Cathedral, Tallinn",cls:"walk",sun:1,
 d:"La collina alta della città, sede del Parlamento estone nel castello. Davanti c'è la grande cattedrale russa con le cupole a cipolla, costruita nel 1900. Dai belvedere di Kohtuotsa e Patkuli si vedono i tetti rossi della città vecchia e il mare.",
 m:"La cattedrale è gratuita; gli orari da fonte ufficiale (visitestonia.com) sono pubblicati solo per l'estate (1 maggio–30 settembre, circa 8–18), quelli invernali vanno controllati. Si entra vestiti con rispetto e in silenzio. I belvedere di Kohtuotsa e Patkuli sono sempre liberi. Il castello di Toompea si vede solo da fuori."},
oleviste:{t:"Torre della chiesa di Sant'Olaf",z:"A",p:2,min:40,id:60,max:90,pos:[59.4421,24.7508],q:"St Olaf's Church, Tallinn",cls:"",sun:1,tk:[10,"Torre di Sant'Olaf (10 €)",1,0],
 win:function(){return[10*60,17*60+30]},
 d:"La chiesa gotica con la guglia altissima, che nel Medioevo fu l'edificio più alto del mondo. Si sale una scala di circa 230 gradini fino alla piattaforma panoramica, con la vista a 360 gradi sulla città vecchia e sul mare.",
 m:"Dal sito ufficiale oleviste.ee: dal 1° aprile al 31 ottobre aperto ogni giorno dalle 10 alle 18, ultimo ingresso alla torre alle 17:30, con una pausa pranzo nel giorno. Dopo il 31 ottobre la chiesa e la piattaforma chiudono per l'inverno, quindi dal 1° novembre non si sale (periodo esatto da confermare). Biglietto 10 €, ridotto 5 €. L'ingresso può essere limitato durante le funzioni."},
kiek:{t:"Kiek in de Kök e gallerie dei bastioni",z:"A",p:2,min:75,id:100,max:150,pos:[59.4350,24.7412],q:"Kiek in de Kök, Tallinn",cls:"",cl:[0],sun:1,tk:[10,"Gallerie dei bastioni di Kiek in de Kök (10 €)",1,0],
 win:function(){return[11*60,18*60]},
 d:"Una torre d'artiglieria del Quattrocento, il cui nome significa «guarda in cucina»: dalle finestre si spiavano i cortili delle case. Nei sotterranei si percorrono le gallerie scavate sotto i bastioni, mostrate in una visita guidata o libera.",
 m:"Dal sito del museo (linnamuuseum.ee): da ottobre ad aprile aperto dal martedì alla domenica dalle 11 alle 18, chiuso il lunedì; da maggio a settembre tutti i giorni. Ingresso a tutto il museo 16 € (ridotto 10 €); le sole gallerie dei bastioni costano 10 € (ridotto 6 €); la Torre della Fanciulla 5 €. La visita guidata in italiano costa 60 € a gruppo, più il biglietto a testa."},
viru:{t:"Porta Viru e Passaggio di Santa Caterina",z:"A",p:3,min:35,id:55,max:90,pos:[59.4372,24.7470],q:"Viru Gate, Tallinn",cls:"walk",sun:1,
 d:"Le due torri della porta Viru segnano l'ingresso storico alla città vecchia. A pochi passi, nella stretta via di Santa Caterina, gli artigiani lavorano vetro, ceramica e tessuti in piccole botteghe con le lapidi medievali sul muro.",
 m:"Le torri e la strada sono gratis a qualsiasi ora. Le botteghe del Passaggio di Santa Caterina sono di norma aperte dal martedì al sabato dalle 10 alle 18 e spesso chiuse il lunedì (da una guida: da confermare)."},
kadriorg:{t:"Parco e palazzo di Kadriorg",z:"B",p:2,min:90,id:120,max:180,pos:[59.4381,24.7906],q:"Kadriorg Palace, Tallinn",cls:"",cl:[0],sun:1,
 win:function(){return[10*60,18*60]},
 d:"Il palazzo barocco che lo zar Pietro il Grande fece costruire nel 1718 per la moglie Caterina, oggi museo d'arte con dipinti dal Cinquecento al Novecento. Intorno c'è un grande parco con il laghetto dei cigni, i giardini fioriti e viali alberati.",
 m:"Il parco si visita gratis a tutte le ore. Il Museo d'Arte di Kadriorg da ottobre ad aprile è aperto il martedì dalle 10 alle 18, il mercoledì dalle 10 alle 20, dal giovedì alla domenica dalle 10 alle 18, e chiuso il lunedì (dal sito dei musei estoni muuseumikaart.ee). Il prezzo del biglietto non l'ho trovato: controlla kadriorumuuseum.ekm.ee."},
kumu:{t:"Kumu, il museo d'arte estone",z:"B",p:3,min:75,id:100,max:150,pos:[59.4340,24.7915],q:"Kumu Art Museum, Tallinn",cls:"",cl:[0],sun:1,tk:[11,"Kumu (da circa 11 €, da confermare)",1,0],
 win:function(){return[10*60,18*60]},
 d:"Un grande edificio di calcare e vetro, moderno, che raccoglie l'arte estone dal Settecento a oggi. Il museo è un buon rifugio nelle giornate fredde o piovose, con il caffè e il panorama sul parco di Kadriorg.",
 m:"Aperto dal martedì alla domenica dalle 10 alle 18, il giovedì fino alle 20, chiuso il lunedì (dal sito dei musei estoni e da una scheda locale: da confermare su kumu.ekm.ee). Il biglietto costa da 11 a 16 € secondo la mostra in corso (il sito non specifica quale sia quale: da confermare). Nelle «notti dei musei» l'ingresso costa 1 €, dopo le 18."},
lennusadam:{t:"Lennusadam, il Porto degli idrovolanti",z:"F",p:3,min:90,id:120,max:180,pos:[59.4535,24.7305],q:"Lennusadam Seaplane Harbour, Tallinn",cls:"",cl:[0],sun:1,tk:[14,"Lennusadam (14 €)",1,0],
 win:function(){return[10*60,18*60]},
 d:"Il museo marittimo nei grandi hangar in cemento del 1916, costruiti per gli idrovolanti. Dentro ci sono un sommergibile, un aereo, barche storiche e il rompighiaccio Suur Tõll, ormeggiato fuori.",
 m:"Dal sito ufficiale (meremuuseum.ee): da ottobre ad aprile aperto dal martedì alla domenica dalle 10 alle 18, chiuso il lunedì; la biglietteria chiude 30 minuti prima. Biglietto 14 € (ridotto 7 €, famiglia 28 €; i bambini fino a 8 anni entrano gratis). Chiuso il 24 dicembre 2026 e il 1° gennaio 2027; il 25, 26 e 31 dicembre aperto dalle 10 alle 17."},
telliskivi:{t:"Telliskivi Creative City",z:"C",p:4,min:60,id:90,max:140,pos:[59.4412,24.7288],q:"Telliskivi Creative City, Tallinn",cls:"walk",sun:1,
 d:"Un ex complesso industriale diventato il quartiere creativo di Tallinn: murales, negozi di designer, gallerie, caffè e bar nelle vecchie fabbriche. Il sabato di solito c'è il mercatino delle pulci.",
 m:"Si cammina gratis a qualsiasi ora; negozi e locali hanno orari propri, di solito dalle 10–11 alla sera. Il mercatino del sabato non l'ho verificato (da confermare)."},
kalamaja:{t:"Kalamaja e il mercato Balti Jaam",z:"C",p:5,min:60,id:90,max:120,pos:[59.4412,24.7352],q:"Balti Jaama Turg, Tallinn",cls:"walk",sun:1,
 d:"Il quartiere dei pescatori con le casette di legno colorate, a due passi dalla stazione. Il mercato Balti Jaam riunisce banchi di pesce, verdura, vintage e una zona di cibo di strada.",
 m:"Il mercato è aperto dal lunedì al sabato dalle 9 alle 19 e la domenica dalle 9 alle 17 (visitestonia.com). Le casette e le vie di Kalamaja si vedono gratis."}
};
/* collegamenti tra le tappe */
var LEGS={};
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
P2("start","raekoja",8,"walk","A piedi lungo via Viru, la strada pedonale piena di negozi, fino alla piazza del Municipio, circa 8 minuti.","A piedi lungo via Viru fino a Hobujaama, circa 8 minuti.",{f:[W([[59.4377,24.7502],[59.4373,24.7482],[59.4372,24.7462],[59.4372,24.7454]])],r:[W([[59.4372,24.7454],[59.4372,24.7462],[59.4373,24.7482],[59.4377,24.7502]])]});
P2("start","viru",4,"walk","A piedi per via Viru fino alla porta Viru, circa 4 minuti.","A piedi dalla porta Viru a Hobujaama, circa 4 minuti.",{f:[W([[59.4377,24.7502],[59.4374,24.7485],[59.4372,24.7470]])],r:[W([[59.4372,24.7470],[59.4374,24.7485],[59.4377,24.7502]])]});
P2("viru","raekoja",5,"walk","A piedi per via Viru e Vana Turg fino alla piazza del Municipio, circa 5 minuti.","A piedi dalla piazza del Municipio alla porta Viru, circa 5 minuti.",{f:[W([[59.4372,24.7470],[59.4372,24.7462],[59.4372,24.7454]])],r:[W([[59.4372,24.7454],[59.4372,24.7462],[59.4372,24.7470]])]});
P2("raekoja","toompea",12,"walk","A piedi per via Pikk Jalg (la «gamba lunga»), in salita, fino alla cattedrale Alexander Nevskij, circa 12 minuti.","A piedi in discesa per Pikk Jalg fino alla piazza del Municipio, circa 12 minuti.",{f:[W([[59.4372,24.7454],[59.4368,24.7425],[59.4364,24.7405],[59.4358,24.7394]])],r:[W([[59.4358,24.7394],[59.4364,24.7405],[59.4368,24.7425],[59.4372,24.7454]])]});
P2("toompea","kiek",6,"walk","A piedi per la Lühike jalg e le mura della collina fino a Kiek in de Kök, circa 6 minuti.","A piedi dalla torre Kiek in de Kök a Toompea, circa 6 minuti.",{f:[W([[59.4358,24.7394],[59.4354,24.7404],[59.4350,24.7412]])],r:[W([[59.4350,24.7412],[59.4354,24.7404],[59.4358,24.7394]])]});
P2("raekoja","kiek",10,"walk","A piedi per via Rataskaevu e Nunne fino a Kiek in de Kök, circa 10 minuti.","A piedi dalla torre Kiek in de Kök alla piazza del Municipio, circa 10 minuti.",{f:[W([[59.4372,24.7454],[59.4366,24.7435],[59.4358,24.7420],[59.4350,24.7412]])],r:[W([[59.4350,24.7412],[59.4358,24.7420],[59.4366,24.7435],[59.4372,24.7454]])]});
P2("raekoja","oleviste",9,"walk","A piedi per via Pikk, la strada dei mercanti, fino alla chiesa di Sant'Olaf, circa 9 minuti.","A piedi per via Pikk dalla chiesa di Sant'Olaf alla piazza del Municipio, circa 9 minuti.",{f:[W([[59.4372,24.7454],[59.4392,24.7478],[59.4410,24.7497],[59.4421,24.7508]])],r:[W([[59.4421,24.7508],[59.4410,24.7497],[59.4392,24.7478],[59.4372,24.7454]])]});
P2("oleviste","viru",10,"walk","A piedi per via Pikk e Müürivahe fino alla porta Viru, circa 10 minuti.","A piedi dalla porta Viru a Sant'Olaf, circa 10 minuti.",{f:[W([[59.4421,24.7508],[59.4400,24.7490],[59.4385,24.7478],[59.4372,24.7470]])],r:[W([[59.4372,24.7470],[59.4385,24.7478],[59.4400,24.7490],[59.4421,24.7508]])]});
P2("start","kadriorg",15,"metro","Tram 1 o 3 da Hobujaama fino al capolinea di Kadriorg, circa 10–12 minuti, poi 3 minuti a piedi fino al palazzo.","Tram 1 o 3 da Kadriorg fino a Hobujaama, circa 10–12 minuti.",{f:[["tm1","Hobujaama","Kadriorg"],W([[59.4378,24.7880],[59.4381,24.7906]])],r:[W([[59.4381,24.7906],[59.4378,24.7880]]),["tm1","Kadriorg","Hobujaama"]]});
P2("kadriorg","kumu",8,"walk","A piedi attraverso il parco di Kadriorg fino al Kumu, circa 8 minuti.","A piedi dal Kumu al palazzo di Kadriorg, circa 8 minuti.",{f:[W([[59.4381,24.7906],[59.4360,24.7912],[59.4340,24.7915]])],r:[W([[59.4340,24.7915],[59.4360,24.7912],[59.4381,24.7906]])]});
P2("start","kumu",18,"metro","Tram 1 o 3 da Hobujaama fino a Kadriorg, poi 8 minuti a piedi nel parco fino al Kumu, circa 18 minuti.","A piedi nel parco fino a Kadriorg, poi tram 1 o 3 fino a Hobujaama, circa 18 minuti.",{f:[["tm1","Hobujaama","Kadriorg"],W([[59.4378,24.7880],[59.4360,24.7912],[59.4340,24.7915]])],r:[W([[59.4340,24.7915],[59.4360,24.7912],[59.4378,24.7880]]),["tm1","Kadriorg","Hobujaama"]]});
P2("oleviste","lennusadam",20,"walk","A piedi lungo via Pikk e il lungomare fino al museo Lennusadam, circa 20 minuti.","A piedi dal Lennusadam alla chiesa di Sant'Olaf, circa 20 minuti.",{f:[W([[59.4421,24.7508],[59.4470,24.7440],[59.4520,24.7360],[59.4535,24.7305]])],r:[W([[59.4535,24.7305],[59.4520,24.7360],[59.4470,24.7440],[59.4421,24.7508]])]});
P2("start","lennusadam",35,"walk","A piedi per via Pikk, passando da Sant'Olaf, e lungo il mare fino al Lennusadam, circa 35 minuti. In alternativa taxi o auto con app, circa 10 minuti.","A piedi dal Lennusadam a Hobujaama, circa 35 minuti, o taxi con app.",{f:[W([[59.4377,24.7502],[59.4421,24.7508],[59.4470,24.7440],[59.4520,24.7360],[59.4535,24.7305]])],r:[W([[59.4535,24.7305],[59.4520,24.7360],[59.4470,24.7440],[59.4421,24.7508],[59.4377,24.7502]])]});
P2("start","telliskivi",25,"walk","A piedi per la città vecchia e la stazione Balti Jaam fino a Telliskivi, circa 25 minuti.","A piedi da Telliskivi alla stazione e per la città vecchia fino a Hobujaama, circa 25 minuti.",{f:[W([[59.4377,24.7502],[59.4372,24.7454],[59.4400,24.7370],[59.4412,24.7288]])],r:[W([[59.4412,24.7288],[59.4400,24.7370],[59.4372,24.7454],[59.4377,24.7502]])]});
P2("raekoja","telliskivi",22,"walk","A piedi per il parco sotto Toompea e la stazione Balti Jaam fino a Telliskivi, circa 22 minuti.","A piedi da Telliskivi, passando dalla stazione, fino alla piazza del Municipio, circa 22 minuti.",{f:[W([[59.4372,24.7454],[59.4388,24.7390],[59.4400,24.7370],[59.4412,24.7288]])],r:[W([[59.4412,24.7288],[59.4400,24.7370],[59.4388,24.7390],[59.4372,24.7454]])]});
P2("telliskivi","kalamaja",8,"walk","A piedi lungo via Telliskivi e Kopli fino al mercato Balti Jaam, circa 8 minuti.","A piedi dal mercato Balti Jaam a Telliskivi, circa 8 minuti.",{f:[W([[59.4412,24.7288],[59.4412,24.7320],[59.4412,24.7352]])],r:[W([[59.4412,24.7352],[59.4412,24.7320],[59.4412,24.7288]])]});
P2("kalamaja","lennusadam",22,"walk","A piedi per le casette di Kalamaja e lungo il mare fino al Lennusadam, circa 22 minuti.","A piedi dal Lennusadam a Kalamaja, circa 22 minuti.",{f:[W([[59.4412,24.7352],[59.4455,24.7340],[59.4500,24.7325],[59.4535,24.7305]])],r:[W([[59.4535,24.7305],[59.4500,24.7325],[59.4455,24.7340],[59.4412,24.7352]])]});
P2("start","kalamaja",22,"walk","A piedi per la città vecchia fino alla stazione Balti Jaam, circa 22 minuti.","A piedi dal mercato Balti Jaam a Hobujaama, circa 22 minuti.",{f:[W([[59.4377,24.7502],[59.4372,24.7454],[59.4395,24.7380],[59.4412,24.7352]])],r:[W([[59.4412,24.7352],[59.4395,24.7380],[59.4372,24.7454],[59.4377,24.7502]])]});
/* ritorno in aeroporto: tram 4 da Hobujaama */
var RET={
TLL:{
 A:{min:35,txt:"Tram 4 da Hobujaama (vicino a Viru Keskus) fino all'aeroporto, circa 20 minuti, con partenze frequenti. Biglietto da 2 € con carta contactless sul validatore o con l'app tallinn.pilet.ee. In alternativa il bus 2 da Viru Keskus (20–25 minuti) o un taxi con app (10–15 minuti, circa 8–13 €).",g:[["tm4","Hobujaama","Aeroporto"]]}}
};
var ARR={
TLL:[["tm4","Aeroporto","Hobujaama"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari dal portale ufficiale visitestonia.com, prezzi stime da guide: da confermare */
var V={
kompressor:{n:"Kompressor",a:"Rataskaevu 3",z:"A",r:"4,4",pos:[59.4374,24.7436],h:D7("11:00-22:00"),
 d:"Il pub delle frittelle, nel cuore della città vecchia: grandi pannkoogid sottili, dolci o salate, con ripieni di carne, funghi o marmellata. Porzioni abbondanti e prezzi onesti per il centro.",pr:"Una frittella farcita costa di solito 6–9 € (listino non visto). Orari da visitestonia.com, da confermare."},
rataskaevu:{n:"Rataskaevu 16",a:"Rataskaevu 16",z:"A",r:"4,5",pos:[59.4373,24.7413],h:["12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-24:00","12:00-24:00","12:00-23:00"],
 d:"Un ristorante di cucina estone moderna in una via laterale, con pane cotto sul posto. Si mangiano piatti di pesce, carne e verdura di stagione in un locale caldo, frequentato anche dagli abitanti.",pr:"Un piatto principale costa intorno ai 15–24 € (stima da guide, listino non visto). Orari da visitestonia.com, da confermare."},
hellhunt:{n:"Hell Hunt",a:"Pikk 39",z:"A",r:"4,3",pos:[59.4403,24.7461],h:["12:00-24:00","12:00-24:00","12:00-24:00","12:00-02:00","12:00-02:00","12:00-02:00","12:00-24:00"],
 d:"Un pub tranquillo e senza pretese, con 10 birre alla spina e una cinquantina in bottiglia: le birre della casa Maja Hele (chiara) e Tume (scura) sono le più richieste. Si mangiano panini e piatti da pub.",pr:"Un piatto da pub sta intorno ai 10–16 € e una birra ai 4–6 € (stima, listino non visto). Orari da visitestonia.com, da confermare."},
maiasmokk:{n:"Café Maiasmokk",a:"Pikk 16",z:"A",r:"4,4",pos:[59.4399,24.7479],h:D7("09:00-20:00"),
 d:"Il caffè storico della città, aperto dal 1864 e quasi immutato da più di un secolo: dolci, torte e caramelle fatte a mano. Dentro c'è anche la sala del marzapane, con una piccola mostra di figure di marzapane.",pr:"Un caffè con una fetta di torta sta intorno ai 6–9 € (listino non visto). Orari da visitestonia.com, da confermare."},
rost:{n:"RØST Bakery",a:"Rotermanni 14",z:"D",r:"4,5",pos:[59.4378,24.7500],h:["08:30-18:00","08:30-18:00","08:30-18:00","08:30-18:00","08:30-18:00","09:30-17:00",""],
 d:"Un piccolo forno nel quartiere Rotermann, in un vecchio edificio industriale, con pane a lievito naturale, panini e dolci. Famosi i rotoli alla cannella: è piccolo e spesso affollato.",pr:"Un rotolo alla cannella con un caffè sta intorno ai 5–8 € (stima, listino non visto). Domenica non risulta aperto: orari da visitestonia.com, da confermare."},
fhoone:{n:"F-hoone",a:"Telliskivi 60a",z:"C",r:"4,4",pos:[59.4411,24.7290],h:["10:00-24:00","10:00-24:00","10:00-24:00","10:00-24:00","10:00-24:00","10:00-24:00","10:00-22:00"],
 d:"Il locale simbolo di Telliskivi, in una vecchia fabbrica: colazioni, zuppe, piatti internazionali con tante opzioni vegetariane e vegane, birre artigianali e cocktail. L'atmosfera è giovane e rilassata.",pr:"Un piatto principale sta intorno ai 10–16 € (stima da guide, listino non visto). Orari da visitestonia.com, da confermare."},
baltijaam:{n:"Balti Jaama Turg",a:"Kopli 1",z:"C",r:"4,3",pos:[59.4412,24.7352],h:["09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","09:00-19:00","09:00-17:00"],
 d:"Il mercato coperto accanto alla stazione: al piano terra una zona di cibo di strada con una ventina di banchi, pesce e carne fresca, verdura e prodotti locali. Un buon posto per un pranzo veloce tra gli abitanti.",pr:"Un pasto di strada costa di solito 6–12 € (stima da guide, banchi non visti). Orari da visitestonia.com, da confermare."},
pohjala:{n:"Põhjala Tap Room",a:"Peetri 5 (Noblessner)",z:"F",r:"4,5",pos:[59.4524,24.7339],h:["","12:00-24:00","12:00-24:00","12:00-24:00","12:00-01:00","12:00-01:00","10:00-17:00"],
 d:"La birreria artigianale di Põhjala nel quartiere Noblessner, sul mare: 24 birre alla spina e un menù di barbecue stile texano, con panini caldi, insalate e dolci. Le birre porter e quelle invecchiate in botte sono il loro pezzo forte.",pr:"Un piatto di barbecue costa intorno ai 13–20 € (stima, listino non visto). Chiuso il lunedì: orari da visitestonia.com, da confermare."},
katharinenthal:{n:"Café Katharinenthal",a:"A. Weizenbergi 22",z:"B",r:"4,3",pos:[59.4376,24.7888],h:["08:30-20:00","08:30-20:00","08:30-20:30","08:30-20:30","08:30-20:30","08:30-20:30","08:30-20:30"],
 d:"Un caffè-ristorante storico accanto al laghetto dei cigni e al giardino del palazzo di Kadriorg: torte, caffè e dolci, con i rotoli alla cannella amati dagli abitanti.",pr:"Un caffè con una fetta di torta sta intorno ai 6–9 € (stima, listino non visto). Orari da visitestonia.com; la posizione sulla mappa è approssimativa: da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["maiasmokk","kompressor"],B:["katharinenthal","maiasmokk"],C:["fhoone","baltijaam"],D:["rost","maiasmokk"],F:["pohjala","fhoone"]},
pra:{A:["kompressor","hellhunt","rataskaevu"],B:["katharinenthal","kompressor"],C:["baltijaam","fhoone"],D:["kompressor","hellhunt"],F:["pohjala","fhoone"]},
cen:{A:["rataskaevu","hellhunt","kompressor"],B:["rataskaevu","hellhunt"],C:["fhoone","pohjala"],D:["rataskaevu","hellhunt"],F:["pohjala","fhoone"]},
snk:{A:["maiasmokk","rost"],B:["katharinenthal","maiasmokk"],C:["fhoone","baltijaam"],D:["rost","maiasmokk"],F:["pohjala","fhoone"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"vana",t:"Città vecchia, Toompea e porta Viru",acts:["raekoja","toompea","viru"],need:190,core:1},
{id:"torri",t:"Torre di Sant'Olaf e Kiek in de Kök",acts:["oleviste","kiek"],need:170,core:1,cl:[0]},
{id:"kadr",t:"Kadriorg e Kumu",acts:["kadriorg","kumu"],need:230,core:1,cl:[0]},
{id:"mare",t:"Il Porto degli idrovolanti",acts:["lennusadam"],need:150,cl:[0]},
{id:"nord",t:"Telliskivi e Kalamaja",acts:["telliskivi","kalamaja"],need:150}
];
var ORDER=["raekoja","toompea","oleviste","kiek","viru","kadriorg","kumu","lennusadam","telliskivi","kalamaja"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["van","Vanalinn (città vecchia)",[59.4370,24.7454],"A"],
["kes","Kesklinn / Viru / Rotermann",[59.4380,24.7535],"D"],
["kal","Kalamaja / Telliskivi",[59.4425,24.7330],"C"],
["kad","Kadriorg",[59.4370,24.7880],"B"],
["nob","Noblessner / Porto",[59.4524,24.7339],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[59.4372,24.7454],""]
];
/* imposta di soggiorno: Tallinn non ne ha una (nel 2024 il Comune ne ha chiesta l'introduzione, ma non risulta in vigore: da confermare) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Kohv ja kaneelirull","caffè e rotolo alla cannella, la colazione di tutti i giorni."],["Pannkoogid","frittelle sottili, con marmellata, panna o ripieni salati."],["Rukkileib võiga","pane di segale scuro con burro, la base della cucina estone."]],
pra:[["Pannkook","una frittella ripiena, dolce o salata, per un pranzo veloce."],["Kiluvõileib","panino aperto di pane nero con spratti e uovo."],["Pelmeenid","ravioli di carne con panna acida."],["Suppi ja sai","una zuppa calda con pane di segale."]],
cen:[["Hapukapsas ja verivorst","crauti e sanguinaccio con mirtilli rossi, piatto d'inverno."],["Räimed","aringhe del Baltico, fritte o marinate."],["Põdraliha","carne di alce, spesso in umido con funghi."],["Kama","dolce fresco con farina di cereali tostati e kefir, tipico estone."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Piazza del Municipio","Foto","Il Municipio gotico e i tetti a spiovente delle case dei mercanti sulla piazza ciottolata, soprattutto al mattino presto.",[59.4372,24.7454],"Raekoja plats, Tallinn","raekoja"],
["📷","Pikk Jalg e la torre Pikk Hermann","Foto","La salita alla collina di Toompea con la torre del castello, con il tricolore estone in cima.",[59.4366,24.7414],"Pikk Hermann, Tallinn","toompea"],
["📷","Cattedrale Alexander Nevskij","Foto","Le cupole a cipolla nere sulla piazza di Toompea, con i mosaici sopra le porte.",[59.4358,24.7394],"Alexander Nevsky Cathedral, Tallinn","toompea"],
["🤳","Il belvedere di Kohtuotsa","Selfie","Il punto più famoso sulla città: i tetti rossi, le torri e il mare, con la chiesa di Sant'Olaf sullo sfondo.",[59.4368,24.7377],"Kohtuotsa viewing platform, Tallinn","toompea"],
["📷","Il belvedere di Patkuli","Foto","Un panorama più tranquillo sulla città vecchia dal lato nord della collina.",[59.4398,24.7390],"Patkuli viewing platform, Tallinn","toompea"],
["📷","La guglia di Sant'Olaf","Foto","La chiesa dal basso, con la guglia che si vede da quasi tutta la città.",[59.4421,24.7508],"St Olaf's Church, Tallinn","oleviste"],
["📷","Mura e torri della città vecchia","Foto","Le torri con i tetti a cono accanto a Kiek in de Kök e lungo via Müürivahe.",[59.4348,24.7412],"Kiek in de Kök, Tallinn","kiek"],
["🤳","La porta Viru","Selfie","Le due torri rotonde che segnano l'ingresso alla città vecchia, con i fiorai sotto le mura.",[59.4372,24.7476],"Viru Gate, Tallinn","viru"],
["📷","Il Passaggio di Santa Caterina","Foto","La stretta via con le botteghe degli artigiani e le lapidi medievali sul muro.",[59.4373,24.7462],"St Catherine's Passage, Tallinn","viru"],
["📷","Il palazzo di Kadriorg","Foto","La facciata rosa e bianca del palazzo barocco riflessa nei giardini all'italiana.",[59.4381,24.7906],"Kadriorg Palace, Tallinn","kadriorg"],
["🤳","Il laghetto dei cigni","Selfie","Il laghetto nel parco di Kadriorg, con il ponticello e i salici, bello anche in inverno.",[59.4373,24.7893],"Swan Pond Kadriorg, Tallinn","kadriorg"],
["📷","Il rompighiaccio Suur Tõll","Foto","Il grande rompighiaccio del 1914 ormeggiato davanti al museo, con gli hangar sullo sfondo.",[59.4540,24.7325],"Suur Tõll icebreaker, Tallinn","lennusadam"],
["📷","I murales di Telliskivi","Foto","Le pareti dipinte delle vecchie fabbriche e le insegne dei negozi, tra il cortile e via Telliskivi.",[59.4412,24.7288],"Telliskivi Creative City, Tallinn","telliskivi"],
["📷","Le casette di legno di Kalamaja","Foto","Le case colorate di legno del vecchio quartiere dei pescatori, con le porte scolpite.",[59.4458,24.7380],"Kalamaja, Tallinn","kalamaja"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2026-10-31",t:"Torre di Sant'Olaf: ultimi giorni di apertura prima dell'inverno",x:"Dal sito ufficiale oleviste.ee: la torre è aperta fino al 31 ottobre (10–18, ultimo ingresso 17:30). Poi la chiesa e la piattaforma panoramica chiudono per l'inverno: le date esatte di riapertura vanno controllate."},
{from:"2026-10-14",to:"2027-04-30",t:"Musei chiusi il lunedì da ottobre ad aprile",x:"Da ottobre ad aprile il Lennusadam, il museo Kiek in de Kök, Kadriorg e Kumu sono chiusi il lunedì (orari dai siti ufficiali e dal portale dei musei estoni). Pianifica le visite dal martedì alla domenica."},
{from:"2026-11-01",to:"2027-01-06",t:"Mercatino di Natale in piazza del Municipio",x:"Dal 20 novembre 2026 al 6 gennaio 2027 il mercatino di Natale occupa la piazza del Municipio, aperto ogni giorno dalle 10 alle 20 (fonte: visittallinn.ee); i banchi di bevande restano aperti più a lungo. La città vecchia è molto più affollata."},
{from:"2026-12-15",to:"2027-01-02",t:"Natale e Capodanno: orari ridotti",x:"Il Lennusadam è chiuso il 24 dicembre 2026 e il 1° gennaio 2027, e il 25, 26 e 31 dicembre apre dalle 10 alle 17. Altri musei e locali possono avere orari propri: controllali sui siti. A dicembre il sole tramonta intorno alle 15:15, quindi pianifica le visite all'aperto la mattina."}
];
/* clima medio di Tallinn (indicativo, massime/minime) */
var CLIM=[[-2,-7],[-2,-8],[2,-5],[9,0],[15,5],[19,10],[22,13],[21,13],[16,9],[9,4],[4,0],[0,-3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Tallinn: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="kiek"&&WD===0)meta+=" Oggi è lunedì: da ottobre ad aprile il museo Kiek in de Kök è chiuso.";
if(it.id==="lennusadam"&&WD===0)meta+=" Oggi è lunedì: da ottobre ad aprile il Lennusadam è chiuso.";
if(it.id==="kumu"&&WD===3)meta+=" Oggi è giovedì: il Kumu di norma resta aperto fino alle 20.";
if(it.id==="kadriorg"&&WD===2)meta+=" Oggi è mercoledì: da ottobre ad aprile il Museo d'Arte di Kadriorg è aperto fino alle 20.";
return meta}
Object.assign(C,{id:"tallinn",n:"Tallinn",cn:"Estonia",e:"🏰",flag:"🇪🇪",col:["#0072ce","#2b2b2b","#e8e8e8"],k:"tallinn estonia",
TZ:"Europe/Tallinn",LL:[59.4372,24.7454],CC:"ee",QN:"Tallinn",BK:"Tallinn",ARE:/tallinn|harju|\b1[0-5][0-9]{3}\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"et-EE",LANGN:"estone",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Hobujaama (Viru)",q:"Hobujaama tram stop, Tallinn"},
SINGLE:{acts:["raekoja","toompea","oleviste","kiek","viru"],ins:[]},
EXCL:[],
DICON:{raekoja:"🏛️",toompea:"⛪",oleviste:"🗼",kiek:"🏰",viru:"🚪",kadriorg:"🌳",kumu:"🎨",lennusadam:"⚓",telliskivi:"🧱",kalamaja:"🏘️"},
ZN:{A:"nella città vecchia",B:"a Kadriorg",C:"a Kalamaja e Telliskivi",D:"a Viru e Rotermann",F:"a Noblessner"},
NEAR:{col:"caffè o forno",pra:"locale veloce o mercato",cen:"ristorante",snk:"caffè"},
SE:{kompressor:"🥞",rataskaevu:"🍽️",hellhunt:"🍺",maiasmokk:"🍰",rost:"🥐",fhoone:"☕",baltijaam:"🥘",pohjala:"🍖",katharinenthal:"☕"},
TR:{one:2,cap:5.5,lbl:"Tram e bus (Tallinn)",
 air:{TLL:{one:2,n:"Tram 4 o bus 2 per l'aeroporto (2 €)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:5.5,note:"Il biglietto 24 ore (5,50 €) si carica su una tessera ricaricabile (Ühiskaart, depositata a 2 €) e vale su tram, bus e filobus per 24 ore dalla prima convalida."},
 {n:"Biglietto 72 ore",d:3,p:9,only:function(T){return T.n>=3},note:"Il biglietto 72 ore (9 €) si carica sulla tessera ricaricabile e vale 3 giorni di fila su tutti i mezzi urbani."},
 {n:"Biglietto 5 giorni",d:5,p:11,only:function(T){return T.n>=5},note:"Il biglietto 5 giorni (11 €) si carica sulla tessera ricaricabile e vale 5 giorni di fila su tutti i mezzi urbani."}],
 note:"Prezzi da guide e pagine locali del 2026, non letti sul sito ufficiale: da confermare su transport.tallinn.ee. Corsa di un'ora 2 € (turisti; i residenti di Tallinn viaggiano gratis), da pagare con carta contactless sul validatore o con l'app tallinn.pilet.ee; il contante a bordo non è accettato. Biglietti 24 ore 5,50 €, 72 ore 9 €, 5 giorni 11 € si caricano su una tessera ricaricabile (2 € di deposito) venduta ai punti informazioni, in aeroporto e nei negozi R-Kiosk. La Tallinn Card (24, 48 o 72 ore, circa 43–76 € secondo la fonte) comprende i mezzi e l'ingresso a più di 50 musei: conviene solo con molte visite a pagamento. La città vecchia si gira tutta a piedi."},
FOOD:{co:[6,"Colazione al caffè o al forno"],pr:[11,"Pranzo (frittelle, zuppa o mercato)"],ce:[19,"Cena (cucina estone)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"A piedi o in tram",move:"tutto a piedi o in tram",bags:"«Kas ma võin oma pagasi siia jätta?»",bagsPM:"«Kas ma võin oma pagasi siia lõunani jätta?»",bagsAM:"«Kas ma võin oma pagasi siia õhtuni jätta?»",
pra:"Un locale veloce o il mercato",praZ:{A:"Nelle piazze intorno al Municipio e a via Viru molti ristoranti hanno menù a tema medievale pensati per i turisti e prezzi alti: per un pasto più vero cerca le vie laterali (per esempio via Rataskaevu o Pikk).",C:"A Telliskivi e al mercato Balti Jaam si mangia bene a prezzi più bassi che nella città vecchia."},
freeLong:"Qualche idea: una sosta in un caffè storico con un dolce, una passeggiata sulle mura della città vecchia, una visita a una sauna pubblica o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè.",
remind:"Da ottobre ad aprile Lennusadam, Kiek in de Kök, Kadriorg e Kumu sono chiusi il lunedì. A dicembre fa buio presto, alle 15 circa: visita la città vecchia con la luce.",
rain1:"Al coperto: Kiek in de Kök, il Lennusadam, il Kumu, il palazzo di Kadriorg, i caffè e i pub.",
rainM:"Al coperto: Kiek in de Kök, Lennusadam, Kumu, Kadriorg (interni), il mercato Balti Jaam e i caffè.",
water:"L'acqua del rubinetto in Estonia è potabile e di buona qualità: puoi riempire la borraccia in albergo e nei locali. Attivate «Acqua» sulla mappa per le fontanelle (dati OpenStreetMap, nella città vecchia sono poche).",
kitchen:"A Tallinn si pranza tra le 12 e le 14:30 e si cena dalle 18: molti ristoranti restano aperti fino alle 22–23 e i pub anche oltre; alcuni locali chiudono la domenica sera o il lunedì.",
night:[["🍺","Una birra artigianale in un pub della città vecchia o a Telliskivi, oppure un bicchiere di Vana Tallinn, il liquore estone al rum e alla cannella."],["🕙","Le cucine servono fino alle 22–23. Il tram 4 per l'aeroporto circola fino a mezzanotte e oltre (orari da confermare); di notte restano taxi e app come Bolt."],["☕","Molti caffè aprono alle 8–9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Tallinn è un'ora avanti rispetto all'Italia: sposta l'orologio avanti di un'ora",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per caffè, mercati e ristoranti semplici: una colazione sta intorno ai 5–8 €, un pranzo ai 10–14 € e una cena con un piatto principale ai 15–24 €. La carta contactless è accettata quasi ovunque, anche per cifre piccole.",
taxNote:"Tallinn non ha una tassa di soggiorno in vigore: non risulta niente da pagare in più oltre al prezzo dell'alloggio. Nel dicembre 2024 il Comune ha chiesto allo Stato il permesso di introdurne una di 1–3 € a turista, ma non ho trovato la conferma che sia stata approvata: controlla con la struttura.",
mcrit:"Criteri: caffè storici, mercati, birrerie e ristoranti di cucina estone, niente catene. Colazione e cena restano sotto gli 8 € e i 25 € a persona. Gli orari vengono dal portale ufficiale visitestonia.com, i prezzi sono stime da guide e schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il tram 4 porta alla città vecchia in circa 20 minuti con un biglietto da 2 €: la soluzione più rapida ed economica.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto per tram o bus (2 € per un'ora): carta contactless Visa o Mastercard, oppure l'app tallinn.pilet.ee",function(E){return true}],["kie","Biglietto per Kiek in de Kök e le gallerie dei bastioni (10 €): chiuso il lunedì",["kiek"]],["ole","Biglietto per la torre di Sant'Olaf (10 €): aperta fino al 31 ottobre, poi chiusa per l'inverno",["oleviste"]],["len","Biglietto per il Lennusadam (14 €): chiuso il lunedì",["lennusadam"]],["card","Carta d'identità o passaporto in corso di validità"],["warm","Giacca calda, cappello e scarpe con la suola buona: i ciottoli sono scivolosi quando c'è ghiaccio"]],
NUM:{1:["ühele","Ü-he-le"],2:["kahele","KA-he-le"],3:["kolmele","KOL-me-le"],4:["neljale","NEL-ia-le"],5:["viiele","VÌ-ie-le"],6:["kuuele","KU-u-e-le"],7:["seitsmele","SEITS-me-le"],8:["kaheksale","KA-hek-sa-le"],9:["üheksale","Ü-hek-sa-le"],10:["kümnele","KÜM-ne-le"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Tere / Tere õhtust","TE-re / TE-re EUH-tust"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Laud "+nu[0]+", palun","laud "+nu[1]+", PA-lun"],["Un caffè e una fetta di torta, per favore","Üks kohv ja üks tort, palun","iuks kohv ia iuks tort, PA-lun"],["Acqua del rubinetto, per favore","Kraanivett, palun","KRA-ni-vett, PA-lun"],["Il conto, per favore","Arve, palun","AR-ve, PA-lun"],["Posso pagare con la carta?","Kas ma saan kaardiga maksta?","kas ma saan KAR-di-ga MAK-sta"],["Quanto costa?","Kui palju see maksab?","kui PAL-iu seh MAK-sab"],["Dov'è la fermata del tram?","Kus on trammipeatus?","kus on TRAM-mi-pe-a-tus"],["Qual è il tram per l'aeroporto?","Milline tramm läheb lennujaama?","MIL-li-ne tramm LÄ-heb LEN-nu-ia-a-ma"]];
if(M)fr=fr.concat([["Ho una prenotazione","Mul on broneering","mul on BRO-ne-reeng"],["Posso lasciare i bagagli?","Kas ma võin oma pagasi siia jätta?","kas ma VÖIN O-ma PA-ga-si SI-a IÄT-ta"],["A che ora è il check-out?","Mis kell on check-out?","mis kell on ciek-AUT"]]);
return fr.concat([["Mi scusi","Vabandust","VA-ban-dust"],["Grazie mille!","Suur aitäh!","suur AI-täh"]])},
taxTxt:function(tx){return "Imposta di soggiorno: a Tallinn non risulta una tassa in vigore"+(tx[2]===0&&tx[0]==="no"?" (e comunque non si pagherebbe se sei ospite di amici o parenti)":"")+", quindi il prezzo dell'alloggio è quello che paghi, a meno che la struttura non aggiunga altri costi. Nel 2024 il Comune ne ha chiesta l'introduzione allo Stato: controlla con la struttura."},
STAYTIPS:["La città vecchia è piccola e si gira tutta a piedi; per Kadriorg, il porto e Telliskivi servono tram o un tratto a piedi. Con lo stesso biglietto di un'ora si possono cambiare più mezzi."],
ZONES:[
["🚋 Tram, bus e biglietti",["La corsa di un'ora costa 2 € e si paga con carta contactless sul validatore a bordo, oppure con l'app tallinn.pilet.ee. Il contante a bordo non è accettato.","I biglietti da 24 ore (5,50 €), 72 ore (9 €) e 5 giorni (11 €) si caricano su una tessera ricaricabile (2 € di deposito): conviene solo con molte corse.","Il tram 4 collega l'aeroporto a Hobujaama in circa 20 minuti.","Prezzi e orari da guide del 2026: controlla transport.tallinn.ee."]],
["🏰 Città vecchia e Toompea",["La città vecchia (Vanalinn) è piccola: si gira tutta a piedi in mezza giornata, con salite e discese ripide verso Toompea.","Le mura e le torri danno il meglio al tramonto, ma a dicembre il sole cala intorno alle 15:15.","I ciottoli sono scivolosi con la pioggia o il ghiaccio: porta scarpe con la suola buona."],["raekoja","toompea","kiek","viru"]],
["⛪ Sant'Olaf e le torri",["La torre di Sant'Olaf è aperta fino al 31 ottobre; poi chiude per l'inverno (date esatte da controllare su oleviste.ee).","Kiek in de Kök è chiuso il lunedì da ottobre ad aprile.","Un buon abbinamento: salita a Sant'Olaf al mattino, gallerie dei bastioni nel pomeriggio."],["oleviste","kiek"]],
["🌳 Kadriorg e Kumu",["Il palazzo e il parco di Kadriorg sono a circa 3 km dalla città vecchia, raggiungibili con il tram 1 o 3 in 10–12 minuti (da confermare).","Il Kumu e Kadriorg sono chiusi il lunedì; il giovedì il Kumu chiude più tardi.","Al caffè Katharinenthal, sul laghetto dei cigni, si prende un dolce dopo la visita."],["kadriorg","kumu"]],
["⚓ Porto, Telliskivi e Kalamaja",["Il Lennusadam è a circa 35 minuti a piedi da Hobujaama: si può fare a piedi con una sosta a Sant'Olaf o in taxi.","Telliskivi e il mercato Balti Jaam sono vicini l'uno all'altro, a 20 minuti a piedi dalla città vecchia.","Il pub-birreria Põhjala Tap Room, a Noblessner, è chiuso il lunedì."],["lennusadam","telliskivi","kalamaja"]]],
WTIPS:["L'acqua del rubinetto in Estonia è potabile e buona: puoi riempire la borraccia in albergo.","Attivate «Acqua» sulla mappa per le fontanelle vicine al percorso, dai dati di OpenStreetMap: nella città vecchia sono poche.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["L'Estonia usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida (viaggiaresicuri.it).","Tallinn è un'ora avanti rispetto all'Italia.","A Tallinn si usa la carta contactless quasi ovunque, anche per piccoli importi: porta comunque qualche euro per mercatini e bancarelle.","La mancia non è obbligatoria: si lascia di solito il 5–10% nei ristoranti, arrotondando il conto.","In inverno il sole tramonta presto (a dicembre intorno alle 15:15): organizza le visite all'aperto la mattina.","Da ottobre ad aprile molti musei sono chiusi il lunedì.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚋 Trasporti pubblici: <a href="https://transport.tallinn.ee/" target="_blank" rel="noopener">transport.tallinn.ee</a> · biglietti: <a href="https://tallinn.pilet.ee/" target="_blank" rel="noopener">tallinn.pilet.ee</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Tallinn: <a href="https://ambtallinn.esteri.it" target="_blank" rel="noopener">ambtallinn.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Tallinn. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://transport.tallinn.ee/" target="_blank" rel="noopener">transport.tallinn.ee</a> e il sito della compagnia aerea.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V96 Q60 84 120 90 Q160 94 190 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M8 106 V72 H58 V106 Z M24 72 V36 H44 V72 Z M22 36 H46 L34 20 Z M33.5 20 V6 H35.5 V20 Z"/></g>'+
'<g style="--k:2"><path d="M70 106 V68 H130 V106 Z M72 68 V58 Q78 48 84 58 V68 Z M116 68 V58 Q122 48 128 58 V68 Z M88 68 V54 Q100 36 112 54 V68 Z M100 36 Q94 28 100 18 Q106 28 100 36 Z M99.5 18 V8 H100.5 V18 Z"/></g>'+
'<g style="--k:3"><path d="M146 106 V76 H192 V106 Z M162 76 V50 H176 V76 Z M159 50 H179 V46 H159 Z M164 46 L169 16 L174 46 Z M168.5 16 V6 H169.5 V16 Z"/></g>'+
'<g style="--k:4"><path d="M208 106 V70 H252 V106 Z M206 70 H254 L230 56 Z M224 56 V42 H236 V56 Z M224 42 L230 2 L236 42 Z"/></g>'+
'<g style="--k:5"><path d="M272 106 V64 H294 V106 Z M270 64 H296 L283 44 Z M312 106 V64 H334 V106 Z M310 64 H336 L323 44 Z M294 84 H312 V106 H294 Z M346 106 V82 H392 V106 Z M346 82 L356 72 L366 82 Z M368 82 L378 72 L388 82 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M80 90 v16 M100 90 v16 M120 90 v16"/><path d="M296 74 h14 M296 94 h14"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="12" r="1.6"/><circle cx="106" cy="6" r="1.3"/><circle cx="196" cy="18" r="1.3"/><circle cx="266" cy="12" r="1.3"/><circle cx="330" cy="8" r="1.3"/><circle cx="388" cy="22" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.tallinn);

;var n=window.CITIES["tallinn"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["tallinn"]);
