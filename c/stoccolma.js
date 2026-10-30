(function(o){
/* ===== Stoccolma (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.stoccolma=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
ARN:{n:"Stoccolma Arlanda (ARN)",s:"Stockholm Arlanda Airport",url:"https://www.swedavia.com/arlanda/",live:"Stockholm",inMin:40,buf:120,pos:[59.6498,17.9238],sd:"Aeroporto ARN · Arlanda Express",rt:"Dall'aeroporto: treno Arlanda Express fino alla Stazione Centrale (T-Centralen), senza fermate, circa 18 minuti.",
 arr:"Dall'Italia si entra in Svezia senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «Tåg / Train» per la stazione sotto i terminal. L'Arlanda Express è la soluzione più rapida: porta alla Stazione Centrale in circa 18 minuti, con un treno ogni 15 minuti di giorno e ogni 30 la sera. Costa circa 340 corone a persona (circa 30 €) e non accetta le tessere SL. L'alternativa economica è il pullman Flygbussarna, che arriva al Cityterminalen accanto alla Stazione Centrale in circa 45 minuti e costa circa 119 corone (circa 10,60 €, meno se prenoti online). C'è anche il treno pendolari SL (circa 38–43 minuti), ma sul biglietto si somma un supplemento per l'aeroporto di circa 157 corone: in tutto sta intorno alle 200 corone. In tutto, dall'atterraggio alla Stazione Centrale, calcola circa 40–60 minuti.",
 tk:"Biglietto: Arlanda Express circa 340 corone a persona (circa 30,40 €) a tratta, con tariffe ridotte per i giovani; Flygbussarna circa 119 corone (circa 10,60 €); treno pendolari SL circa 200 corone (circa 17,90 €) con il supplemento aeroportuale. Prezzi da guide aggiornate ad agosto 2026 e da pagine non ufficiali: controlla arlandaexpress.com e flygbussarna.se prima di partire. I biglietti si comprano alle macchinette, con le app o con carta contactless dove previsto.",
 gm:"Arlanda Express Arlanda Södra station",
 tips:["L'Arlanda Express non accetta le tessere e i biglietti SL: se hai una tessera dei mezzi urbani non ti serve. Per il pullman Flygbussarna conviene comprare il biglietto online, costa un po' meno.","Per quanto ho trovato, gli unici voli diretti dall'Italia arrivano ad Arlanda. Skavsta e Västerås (a 90–110 km dalla città) non ne hanno, e Bromma ha soprattutto voli interni: se vedi un'offerta su un altro aeroporto, controlla di nuovo il tragitto prima di prenotare.","Il taxi per il centro costa circa 545–745 corone a prezzo fisso, ma solo da compagnie autorizzate fuori dai terminal: è comodo in gruppo di tre o quattro persone o con molti bagagli."]}
};
/* linee (tracciati indicativi) */
var SEG={
ae:{c:"#d2232a",n:"Treno Arlanda Express dall'aeroporto",p:[[59.6498,17.9238,"Aeroporto",2],[59.3300,18.0585,"Stoccolma Centrale",2]]},
rosso:{c:"#e3000f",n:"Metro linea rossa (verso Gamla stan e Slussen)",p:[[59.3313,18.0594,"T-Centralen",2],[59.3233,18.0675,"Gamla stan",2],[59.3195,18.0722,"Slussen",2],[59.3170,18.0637,"Mariatorget",2]]},
rossoE:{c:"#e3000f",n:"Metro linea rossa (verso Östermalmstorg)",p:[[59.3313,18.0594,"T-Centralen",2],[59.3346,18.0746,"Östermalmstorg",2]]},
verde:{c:"#00954d",n:"Metro linea verde",p:[[59.3313,18.0594,"T-Centralen",2],[59.3195,18.0722,"Slussen",2],[59.3139,18.0731,"Medborgarplatsen",2]]},
tram7:{c:"#7a6a5a",n:"Tram 7 (Djurgårdslinjen)",p:[[59.3320,18.0720,"Norrmalmstorg",2],[59.3277,18.0912,"Nordiska museet / Vasamuseet",2],[59.3253,18.1010,"Skansen",2]]}
};
var START=[59.3300,18.0585];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
gamla:{t:"Gamla Stan: la città vecchia",z:"A",p:1,min:75,id:100,max:150,pos:[59.3251,18.0710],q:"Stortorget, Gamla stan, Stockholm",cls:"walk",sun:1,
 d:"Il cuore medievale di Stoccolma, su un'isola in mezzo all'acqua: vicoli stretti di ciottoli, case color ocra e rosso, la piazza Stortorget con le case a gradini e la via Mårten Trotzigs gränd, il vicolo più stretto della città (circa 90 centimetri). Va visto a piedi, senza fretta.",
 m:"Si cammina gratis e le strade sono sempre aperte. Le botteghe e i caffè sono aperti di solito dalle 10 alle 18. Il mercatino di Natale di Stortorget è previsto dal 21 novembre al 23 dicembre 2026 (date da confermare: di solito sono pubblicate a ottobre)."},
slottet:{t:"Palazzo Reale (Kungliga slottet)",z:"A",p:2,min:90,id:120,max:170,pos:[59.3268,18.0717],q:"Kungliga slottet, Stockholm",cls:"",sun:1,tk:[24.1,"Palazzo Reale (circa 270 corone)",1,1],
 win:function(){return[10*60,17*60]},
 d:"Una delle più grandi residenze reali d'Europa ancora in uso, con più di seicento stanze: gli Appartamenti reali, la Sala di Stato, il Tesoro con le corone e il Museo Tre Kronor, che mostra i resti del castello medievale bruciato nel 1697. Davanti c'è il cambio della guardia.",
 m:"Dal sito ufficiale il Palazzo risultava aperto dalle 10 alle 17 nel giorno in cui l'ho consultato; in bassa stagione alcune sale chiudono in certi giorni e possono chiudere all'ultimo per cerimonie di Stato (controlla kungligaslotten.se). Il biglietto dell'adulto costa circa 270 corone (la tabella ufficiale è confusa: da confermare). Il cambio della guardia è di solito intorno alle 12:15, la domenica e nei festivi intorno alle 13:15, con meno giorni in inverno."},
nobel:{t:"Museo del Nobel",z:"A",p:4,min:60,id:75,max:100,pos:[59.3249,18.0709],q:"Nobelmuseet, Stortorget 2, Stockholm",cls:"",tk:[14.3,"Museo del Nobel (160 corone)",1,1],
 win:function(wd){return[10*60,wd===1?20*60:18*60]},
 d:"Il museo dei premi Nobel, nell'antica Borsa sulla piazza Stortorget: le storie dei vincitori, oggetti donati da loro e una piccola mostra sull'invenzione di Alfred Nobel. Si visita in un'ora e il caffè interno è carino.",
 m:"Biglietto adulto 160 corone nel 2026 (sito ufficiale); studenti e over 65 120 corone; fino ai 18 anni gratis. Gli orari che ho letto su una guida sono 10–18 tutti i giorni e fino alle 20 il martedì (da confermare su nobelprizemuseum.se). Chiuso il 1° gennaio, il 24 e il 25 dicembre."},
stadshuset:{t:"Stadshuset, il Municipio",z:"F",p:2,min:75,id:100,max:130,pos:[59.3275,18.0546],q:"Stockholms stadshus, Stockholm",cls:"",
 d:"Il grande palazzo di mattoni rossi sul lago Mälaren dove ogni 10 dicembre si tiene il banchetto del Nobel. Si visita solo con la visita guidata di circa 45 minuti, in inglese, che porta nella Sala Blu e nella Sala d'Oro, con i mosaici di 18 milioni di tessere d'oro e vetro. Il giardino sul lago è libero e panoramico.",
 m:"La visita guidata ha orari fissi ogni giorno, ma può saltare per eventi del Comune (controlla stadshuset.stockholm). Il prezzo non l'ho trovato su una pagina aggiornata: va controllato sul sito. La torre è aperta solo da maggio a metà agosto e nel 2027–2028 sarà chiusa per restauro, quindi in autunno non si sale. I biglietti si comprano online o alla biglietteria, che apre alle 8:30."},
vasa:{t:"Museo Vasa",z:"C",p:1,min:120,id:150,max:200,pos:[59.3280,18.0914],q:"Vasamuseet, Stockholm",cls:"",sun:1,tk:[17.4,"Museo Vasa (195 corone)",1,1],
 win:function(wd){return[10*60,wd===2?20*60:17*60]},
 d:"Il galeone di guerra svedese del 1628 che affondò dopo pochi minuti nel porto, durante il primo viaggio, e fu recuperato dopo 333 anni: oggi è l'unica nave del Seicento conservata quasi intera al mondo, alta come un palazzo di sei piani e coperta di sculture. Il museo racconta anche la vita a bordo.",
 m:"Aperto da settembre a maggio dalle 10 alle 17, il mercoledì fino alle 20; chiuso il 24 e il 25 dicembre; il 31 dicembre 10–15 (scheda ufficiale 2026). Biglietto adulto 195 corone dal 1° ottobre al 31 dicembre e dal 1° gennaio al 30 aprile; fino ai 18 anni gratis. Si arriva con il tram 7 fino alla fermata Nordiska museet/Vasamuseet."},
skansen:{t:"Skansen, il museo all'aperto",z:"C",p:2,min:150,id:180,max:240,pos:[59.3242,18.1038],q:"Skansen, Stockholm",cls:"",multi:1,sun:1,
 win:function(wd,d){if(d==="2026-12-24")return[10*60,14*60];if(d>="2026-11-27"&&d<="2026-12-20")return[10*60,(wd===4||wd===5)?17*60:wd===6?16*60:15*60];if(d>="2026-09-28"&&d<="2027-01-10")return[10*60,wd>=5?16*60:15*60];return[10*60,16*60]},
 d:"Il più antico museo all'aperto del mondo, aperto nel 1891 su una collina di Djurgården: fattorie, chiese e botteghe di tutta la Svezia, con gli artigiani in costume, il quartiere di città del Settecento e un piccolo parco con gli animali nordici (alci, orsi, linci e lupi). La vista su Stoccolma dalla collina è bellissima.",
 m:"Aperto tutti i giorni dell'anno. Dal 28 settembre 2026 al 10 gennaio 2027 gli orari sono 10–15 nei giorni feriali e 10–16 nel fine settimana (sito ufficiale), con eccezioni: mercatino di Natale dal 27 novembre al 20 dicembre (venerdì e sabato 10–17, domenica 10–16), vigilia di Natale 10–14, Capodanno 10–16 e di sera 20–24, Halloween il 24 e dal 28 al 31 ottobre con apertura serale 15–19. Il prezzo d'ingresso non l'ho letto in forma ufficiale: una guida riporta 305 corone in alta stagione, in inverno costa meno (controlla skansen.se). Ingressi e negozi accettano solo pagamenti elettronici."},
abba:{t:"ABBA The Museum",z:"C",p:3,min:120,id:150,max:200,pos:[59.3237,18.0957],q:"ABBA The Museum, Djurgårdsvägen 68, Stockholm",cls:"",tk:[22.3,"ABBA The Museum (da circa 250 corone)",1,1],
 win:function(){return[10*60,18*60]},
 d:"Un museo interattivo dedicato al gruppo svedese più famoso: costumi di scena, strumenti, dischi d'oro e una cabina per cantare con gli ABBA in versione ologramma. Si finisce nel «Polar Studio» con il mixer originale. È la tappa più divertente se ti piacciono le canzoni della band.",
 m:"Orari generalmente tra le 10 e le 18, più lunghi in estate (da guide e articoli, da confermare su abbathemuseum.com). Il biglietto ha prezzi dinamici, da circa 250 a 330 corone secondo giorno e orario: conviene prenotare online una fascia oraria."},
fotog:{t:"Fotografiska, museo di fotografia",z:"D",p:3,min:90,id:120,max:170,pos:[59.3178,18.0861],q:"Fotografiska Stockholm, Stadsgårdshamnen 22",cls:"",tk:[17.4,"Fotografiska (195 corone)",1,1],
 win:function(){return[10*60,23*60]},
 d:"Un museo di fotografia contemporanea in un edificio di mattoni dell'inizio del Novecento sul lungomare di Södermalm: mostre temporanee di grandi autori e un ristorante in cima con vista sull'acqua e su Gamla Stan. È aperto fino a tardi, un bel modo di chiudere la serata.",
 m:"Aperto tutti i giorni dalle 10 alle 23; il 24 dicembre chiude alle 20 (pagina ufficiale delle domande frequenti). Biglietto adulto 195 corone, studenti e giovani fino a 25 anni 135 corone; il mercoledì dalle 18 due biglietti al prezzo di uno. Le mostre cambiano ogni pochi mesi: guarda il programma su fotografiska.com."},
monte:{t:"Monteliusvägen e la vista su Södermalm",z:"D",p:3,min:45,id:70,max:100,pos:[59.3217,18.0553],q:"Monteliusvägen, Stockholm",cls:"walk",sun:1,
 d:"Un sentiero panoramico lungo circa 400 metri sulla collina di Mariaberget, a Södermalm, sopra il lago Mälaren: da lì si vedono il Municipio, Riddarholmen, Gamla Stan e i tetti della città. Il punto migliore per fare le foto al tramonto.",
 m:"È gratis e aperto 24 ore su 24, tutto l'anno. Dalla metro Mariatorget (linea rossa) si arriva in circa 5 minuti a piedi, da Slussen in circa 10 minuti in salita ripida. In autunno e in inverno il tramonto è presto (prima delle 16 a dicembre) e il terreno può essere scivoloso con ghiaccio."},
historiska:{t:"Museo di Storia (Historiska museet)",z:"B",p:4,min:90,id:110,max:150,pos:[59.3375,18.0776],q:"Historiska museet, Narvavägen 13-17, Stockholm",cls:"",cl:[0],tk:[16.1,"Historiska museet (180 corone)",1,1],
 win:function(wd){return[11*60,wd===2?20*60:17*60]},
 d:"Il museo della storia svedese dall'età della pietra ai Vichinghi: la mostra sui Vichinghi con gioielli, spade e navi, e la sala d'oro con più di duemila oggetti preziosi. È ben fatto e adatto anche a chi non conosce l'argomento.",
 m:"Da settembre a maggio aperto da martedì a domenica dalle 11 alle 17, il mercoledì fino alle 20; lunedì chiuso (informazioni ufficiali 2026). Biglietto adulto 180 corone (prezzo senza anno nella scheda; da confermare); fino ai 18 anni gratis."},
saluhall:{t:"Östermalms Saluhall e Strandvägen",z:"B",p:4,min:60,id:90,max:120,pos:[59.3354,18.0757],q:"Östermalms Saluhall, Stockholm",cls:"walk",cl:[6],
 win:function(wd){return[9*60+30,wd===5?17*60:19*60]},
 d:"Il mercato coperto più elegante della città, in un edificio di mattoni del 1888: banchi di pesce, formaggi, carne e dolci, con piccoli ristoranti dove si mangia in piedi o al banco. Da qui si passa a Strandvägen, il viale sul porto con i vecchi palazzi e le barche d'epoca ormeggiate.",
 m:"Aperto dal lunedì al venerdì 9:30–19 (alcune guide dicono fino alle 20 il venerdì), il sabato 9:30–17, domenica chiuso. Il mercato è caro: i banchi vanno da 95 a 225 corone, i ristoranti con tavoli da 245 a 395 corone. Si paga con la carta."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","stadshuset",9,"walk","A piedi dalla Stazione Centrale lungo il canale e Klara Mälarstrand fino allo Stadshuset, circa 9 minuti.","A piedi fino alla Stazione Centrale, circa 9 minuti.",{f:[W([[59.3300,18.0585],[59.3293,18.0560],[59.3280,18.0555],[59.3275,18.0546]])],r:[W([[59.3275,18.0546],[59.3280,18.0555],[59.3293,18.0560],[59.3300,18.0585]])]});
P2("start","gamla",5,"metro","Metro linea rossa (13 o 14) da T-Centralen a Gamla stan, una fermata (2 minuti); oppure 15 minuti a piedi per Drottninggatan.","Metro linea rossa da Gamla stan a T-Centralen, 2 minuti.",{f:[["rosso","T-Centralen","Gamla stan"]],r:[["rosso","Gamla stan","T-Centralen"]]});
P2("start","slottet",16,"walk","A piedi per Drottninggatan e il ponte Riksbron fino al Palazzo Reale, circa 16 minuti.","A piedi per il ponte Riksbron e Drottninggatan fino alla Stazione Centrale, circa 16 minuti.",{f:[W([[59.3300,18.0585],[59.3290,18.0645],[59.3275,18.0680],[59.3268,18.0717]])],r:[W([[59.3268,18.0717],[59.3275,18.0680],[59.3290,18.0645],[59.3300,18.0585]])]});
P2("gamla","slottet",4,"walk","A piedi per Slottsbacken fino al Palazzo Reale, circa 4 minuti.","A piedi per Slottsbacken fino a Stortorget, circa 4 minuti.",{f:[W([[59.3251,18.0710],[59.3260,18.0715],[59.3268,18.0717]])],r:[W([[59.3268,18.0717],[59.3260,18.0715],[59.3251,18.0710]])]});
P2("gamla","nobel",2,"walk","A piedi per pochi passi sulla piazza Stortorget: il museo è nell'edificio all'angolo.","A piedi per pochi passi sulla piazza Stortorget.",{f:[W([[59.3251,18.0710],[59.3249,18.0709]])],r:[W([[59.3249,18.0709],[59.3251,18.0710]])]});
P2("slottet","nobel",4,"walk","A piedi per Slottsbacken e Trångsund fino a Stortorget, circa 4 minuti.","A piedi per Trångsund fino al Palazzo Reale, circa 4 minuti.",{f:[W([[59.3268,18.0717],[59.3258,18.0712],[59.3249,18.0709]])],r:[W([[59.3249,18.0709],[59.3258,18.0712],[59.3268,18.0717]])]});
P2("stadshuset","gamla",18,"walk","A piedi lungo l'acqua per Riddarholmen fino a Gamla Stan, circa 18 minuti.","A piedi per Riddarholmen e il lungolago fino allo Stadshuset, circa 18 minuti.",{f:[W([[59.3275,18.0546],[59.3262,18.0615],[59.3253,18.0647],[59.3251,18.0710]])],r:[W([[59.3251,18.0710],[59.3253,18.0647],[59.3262,18.0615],[59.3275,18.0546]])]});
P2("start","vasa",25,"metro","A piedi da T-Centralen a Sergels torg (5 minuti), poi tram 7 fino alla fermata Nordiska museet/Vasamuseet (circa 12 minuti). In alternativa il bus 67 dalla Stazione Centrale (da controllare nell'app SL).","Tram 7 da Nordiska museet/Vasamuseet fino a Sergels torg e a piedi fino alla Stazione Centrale, circa 25 minuti.",{f:[W([[59.3300,18.0585],[59.3320,18.0640],[59.3320,18.0720]]),["tram7","Norrmalmstorg","Nordiska museet / Vasamuseet"]],r:[["tram7","Nordiska museet / Vasamuseet","Norrmalmstorg"],W([[59.3320,18.0720],[59.3320,18.0640],[59.3300,18.0585]])]});
P2("gamla","vasa",28,"metro","A piedi per Slottsbacken e Strömbron fino a Kungsträdgården (circa 12 minuti), poi tram 7 da Norrmalmstorg fino a Nordiska museet/Vasamuseet (circa 8 minuti).","Tram 7 fino a Norrmalmstorg e a piedi per Strömbron fino a Gamla Stan, circa 28 minuti.",{f:[W([[59.3251,18.0710],[59.3290,18.0720],[59.3320,18.0720]]),["tram7","Norrmalmstorg","Nordiska museet / Vasamuseet"]],r:[["tram7","Nordiska museet / Vasamuseet","Norrmalmstorg"],W([[59.3320,18.0720],[59.3290,18.0720],[59.3251,18.0710]])]});
P2("slottet","vasa",25,"metro","A piedi per Strömbron fino a Norrmalmstorg (circa 10 minuti), poi tram 7 fino a Nordiska museet/Vasamuseet (circa 8 minuti).","Tram 7 fino a Norrmalmstorg e a piedi per Strömbron fino al Palazzo Reale, circa 25 minuti.",{f:[W([[59.3268,18.0717],[59.3295,18.0722],[59.3320,18.0720]]),["tram7","Norrmalmstorg","Nordiska museet / Vasamuseet"]],r:[["tram7","Nordiska museet / Vasamuseet","Norrmalmstorg"],W([[59.3320,18.0720],[59.3295,18.0722],[59.3268,18.0717]])]});
P2("vasa","skansen",12,"walk","A piedi lungo Djurgårdsvägen fino all'ingresso di Skansen, circa 12 minuti; o una fermata di tram 7.","A piedi lungo Djurgårdsvägen fino al Vasamuseet, circa 12 minuti.",{f:[W([[59.3280,18.0914],[59.3265,18.0970],[59.3255,18.1015],[59.3242,18.1038]])],r:[W([[59.3242,18.1038],[59.3255,18.1015],[59.3265,18.0970],[59.3280,18.0914]])]});
P2("vasa","abba",8,"walk","A piedi lungo Djurgårdsvägen fino ad ABBA The Museum, circa 8 minuti.","A piedi lungo Djurgårdsvägen fino al Vasamuseet, circa 8 minuti.",{f:[W([[59.3280,18.0914],[59.3258,18.0940],[59.3237,18.0957]])],r:[W([[59.3237,18.0957],[59.3258,18.0940],[59.3280,18.0914]])]});
P2("abba","skansen",8,"walk","A piedi lungo Djurgårdsvägen fino a Skansen, circa 8 minuti.","A piedi lungo Djurgårdsvägen fino ad ABBA The Museum, circa 8 minuti.",{f:[W([[59.3237,18.0957],[59.3240,18.1000],[59.3242,18.1038]])],r:[W([[59.3242,18.1038],[59.3240,18.1000],[59.3237,18.0957]])]});
P2("start","fotog",25,"metro","Metro linea verde da T-Centralen a Slussen (circa 4 minuti), poi 15 minuti a piedi lungo il lungomare di Stadsgårdsleden fino a Fotografiska.","A piedi fino a Slussen, metro linea verde fino a T-Centralen, circa 25 minuti.",{f:[["verde","T-Centralen","Slussen"],W([[59.3195,18.0722],[59.3185,18.0800],[59.3178,18.0861]])],r:[W([[59.3178,18.0861],[59.3185,18.0800],[59.3195,18.0722]]),["verde","Slussen","T-Centralen"]]});
P2("fotog","monte",25,"walk","A piedi fino a Slussen (15 minuti), poi in salita per Götgatan e Hornsgatan fino a Mariaberget e Monteliusvägen (circa 10 minuti).","A piedi in discesa fino a Slussen e lungo il lungomare fino a Fotografiska, circa 25 minuti.",{f:[W([[59.3178,18.0861],[59.3195,18.0722],[59.3210,18.0640],[59.3217,18.0553]])],r:[W([[59.3217,18.0553],[59.3210,18.0640],[59.3195,18.0722],[59.3178,18.0861]])]});
P2("monte","gamla",22,"walk","A piedi in discesa a Slussen e sul ponte Slussen fino a Gamla Stan, circa 22 minuti.","A piedi per Slussen fino a Mariaberget e Monteliusvägen, circa 22 minuti in salita.",{f:[W([[59.3217,18.0553],[59.3210,18.0640],[59.3195,18.0722],[59.3233,18.0675],[59.3251,18.0710]])],r:[W([[59.3251,18.0710],[59.3233,18.0675],[59.3195,18.0722],[59.3210,18.0640],[59.3217,18.0553]])]});
P2("start","saluhall",12,"metro","Metro linea rossa da T-Centralen a Östermalmstorg (una fermata, 3 minuti); oppure 20 minuti a piedi per Birger Jarlsgatan.","Metro linea rossa da Östermalmstorg a T-Centralen, 3 minuti.",{f:[["rossoE","T-Centralen","Östermalmstorg"]],r:[["rossoE","Östermalmstorg","T-Centralen"]]});
P2("saluhall","historiska",17,"walk","A piedi lungo Karlavägen e Narvavägen fino all'Historiska museet, circa 17 minuti.","A piedi lungo Narvavägen fino a Östermalmstorg, circa 17 minuti.",{f:[W([[59.3354,18.0757],[59.3360,18.0770],[59.3375,18.0776]])],r:[W([[59.3375,18.0776],[59.3360,18.0770],[59.3354,18.0757]])]});
/* ritorno in aeroporto: Arlanda Express dalla Stazione Centrale */
var RET={
ARN:{
 A:{min:35,txt:"Vai alla Stazione Centrale (T-Centralen) e prendi l'Arlanda Express: 18 minuti fino all'aeroporto, un treno ogni 15 minuti di giorno. Biglietto circa 340 corone. In alternativa il pullman Flygbussarna dal Cityterminalen, circa 45 minuti (circa 119 corone), o il treno pendolari SL (circa 40 minuti, circa 200 corone con il supplemento aeroportuale).",g:[["ae","Stoccolma Centrale","Aeroporto"]]}}
};
var ARR={
ARN:[["ae","Aeroporto","Stoccolma Centrale"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
gyldene:{n:"Den Gyldene Freden",a:"Österlånggatan 51, Gamla Stan",z:"A",r:"4,3",pos:[59.3234,18.0742],h:["12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-24:00","12:00-24:00",""],
 d:"Una locanda del 1722 a Gamla Stan, gestita come ritrovo dall'Accademia Svedese: cucina svedese classica in sale di legno scuro con candele. È qui che si prova la cucina del Nord in un ambiente storico.",pr:"Le polpette con purè e mirtilli rossi costano circa 270 corone (circa 24 €); le portate principali partono intorno alle 300 corone (listino non letto sul sito). Orari da una guida del 2025, da confermare."},
vete:{n:"Vete-Katten",a:"Kungsgatan 55, Norrmalm",z:"A",r:"4,4",pos:[59.3355,18.0627],h:["07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","09:30-17:00","09:30-17:00"],
 d:"Il caffè-pasticceria più amato dagli svedesi, aperto dal 1928: una vetrina di torte, biscotti e panini di cannella (kanelbulle) in un salone antico e luminoso. Perfetto per la colazione o per una pausa fika.",pr:"Un caffè con un panino di cannella costa circa 8–10 € (listino non visto sul sito). Gli orari li ho scritti da conoscenza generale e non sono stati letti su una pagina aggiornata: da confermare."},
saluhall:{n:"Östermalms Saluhall",a:"Östermalmstorg, Östermalm",z:"B",r:"4,4",pos:[59.3354,18.0757],h:["09:30-19:00","09:30-19:00","09:30-19:00","09:30-19:00","09:30-19:00","09:30-17:00",""],
 d:"Il mercato coperto storico del quartiere elegante: in mezzo ai banchi ci sono piccoli ristoranti con panini di gamberi, zuppa di pesce, piatti del giorno e dolci. Si mangia in piedi o ai tavolini, circondati dai profumi del pesce fresco.",pr:"I piatti dei banchi vanno da 95 a 225 corone (circa 8,50–20 €), i ristoranti con tavoli da 245 a 395 corone (circa 22–35 €). Il panino di gamberi di Lisa Elmqvist sta tra 145 e 225 corone. Orari da guide, da confermare."},
hotorget:{n:"Hötorgshallen",a:"Hötorget, Norrmalm",z:"A",r:"4,3",pos:[59.3356,18.0634],h:["10:00-18:00","10:00-18:00","10:00-18:00","10:00-18:00","10:00-19:00","09:30-16:00",""],
 d:"Il mercato coperto sotto la sala dei concerti, vicino alla Stazione Centrale: banchi di cucina greca, mediorientale, sudamericana e asiatica, con pesce, formaggi, gyros e pasta a prezzi più bassi di Östermalm. Perfetto per un pranzo veloce.",pr:"Un pasto sta tra 95 e 175 corone (circa 8,50–15,50 €): gyros 95–125, pasta 125–175, pesce 125–195 (guida non ufficiale). Solo carta o Swish. Orari da guide, da confermare."},
saturnus:{n:"Café Saturnus",a:"Eriksbergsgatan 6, Östermalm",z:"B",r:"4,4",pos:[59.3365,18.0680],h:["07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","07:30-19:00","08:30-19:00","08:30-19:00"],
 d:"Un caffè di quartiere noto per i suoi enormi panini di cannella grandi come un piatto e per le colazioni sostanziose, in sale luminose con tavoli di legno. Frequentato da famiglie e residenti.",pr:"Un caffè con un panino di cannella costa circa 8–10 € (listino non visto). L'orario di apertura (dalle 7:30) è confermato da una guida, la chiusura serale e il weekend sono da controllare."},
mfp:{n:"Meatballs for the People",a:"Nytorgsgatan 30, Södermalm",z:"D",r:"4,3",pos:[59.3143,18.0797],h:["11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-23:59","11:00-23:59","11:00-22:00"],
 d:"Un ristorante che fa solo polpette: carne di manzo, maiale, alce, pollo o vegetariane, con purè di patate cremoso, salsa e mirtilli rossi. È il posto giusto per chi vuole assaggiare le polpette svedesi senza finire in una trappola per turisti.",pr:"Un piatto costa circa 230 corone (circa 20,50 €); l'assaggio di otto polpette per due o tre persone circa 330 corone a testa (guide). La sera conviene prenotare con una settimana d'anticipo; a pranzo di solito c'è posto."},
blaporten:{n:"Blå Porten",a:"Djurgårdsvägen 64, Djurgården",z:"C",r:"4,2",pos:[59.3245,18.0969],h:D7("11:00-20:00"),
 d:"Un caffè-ristorante in una casa gialla con un cortile, a due passi da Skansen e da ABBA The Museum: piatti svedesi semplici come polpette, salmone e zuppe, torte fatte in casa.",pr:"Le polpette costano circa 208 corone (circa 18,50 €) (guida non ufficiale). Orari da una guida del 2025, da confermare."},
rosendal:{n:"Rosendals Trädgårdskafé",a:"Rosendalsterrassen 12, Djurgården",z:"C",r:"4,5",pos:[59.3267,18.1153],h:D7("11:00-16:00"),
 d:"Il caffè nell'orto biodinamico e nelle serre sul lato est di Djurgården: pane cotto nel forno a legna, zuppe di verdure di stagione, torte con la frutta dell'orto. A ottobre e a novembre si mangia nelle serre riscaldate.",pr:"Il pranzo (dalle 11 alle 14:30) costa circa 150–200 corone (circa 13,50–18 €) (stima da guide, listino non letto). Niente prenotazioni. Orari dal sito ufficiale 'lun–dom 11–16'; d'inverno possono ridursi: controlla rosendalstradgard.se."},
kalf:{n:"Kalf & Hansen",a:"Mariatorget 2, Södermalm",z:"D",r:"4,3",pos:[59.3170,18.0637],h:["10:00-20:00","10:00-20:00","10:00-20:00","10:00-20:00","10:00-20:00","11:00-17:00","11:00-17:00"],
 d:"Un piccolo locale sulla piazza Mariatorget che propone un solo piatto tipico, il «Stockholm»: tre polpette con pane e verdure sotto aceto, e poco altro. È il pasto veloce svedese da asporto o da mangiare al banco.",pr:"Il piatto «Stockholm» con pane e tre polpette costa circa 110 corone (circa 9,80 €) (guida del 2025, da confermare). Orari da una guida, da controllare."},
soderhallarna:{n:"Söderhallarna",a:"Medborgarplatsen, Södermalm",z:"D",r:"4,2",pos:[59.3139,18.0731],h:["10:00-20:00","10:00-20:00","10:00-20:00","10:00-20:00","10:00-20:00","10:00-18:00","11:00-18:00"],
 d:"Il mercato coperto di Södermalm, accanto alla piazza Medborgarplatsen: pizza al taglio, panini, zuppe, polpette e dolci in banchi diversi, per pranzi dal costo contenuto in un quartiere vivace.",pr:"Un pezzo di pizza costa tra 45 e 85 corone (circa 4–7,50 €), un pasto completo 95–175 corone (circa 8,50–15,50 €) (guida non ufficiale). Solo carta o Swish. Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["vete","saluhall"],B:["saturnus","saluhall"],C:["saturnus","vete"],D:["kalf","saturnus"],F:["vete","saturnus"]},
pra:{A:["hotorget","vete","gyldene"],B:["saluhall","saturnus"],C:["blaporten","rosendal"],D:["soderhallarna","kalf","mfp"],F:["hotorget","vete"]},
cen:{A:["gyldene","mfp"],B:["gyldene","mfp"],C:["blaporten","gyldene"],D:["mfp","gyldene"],F:["gyldene","mfp"]},
snk:{A:["vete","hotorget"],B:["saturnus","saluhall"],C:["rosendal","blaporten"],D:["soderhallarna","kalf"],F:["vete","hotorget"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Gamla Stan, Palazzo Reale e Museo del Nobel",acts:["gamla","slottet","nobel"],need:250,core:1},
{id:"djur",t:"Djurgården: Vasa, ABBA e Skansen",acts:["vasa","abba","skansen"],need:400,core:1},
{id:"sod",t:"Fotografiska e Monteliusvägen",acts:["fotog","monte"],need:190,core:1},
{id:"stad",t:"Stadshuset, Östermalm e Museo di Storia",acts:["stadshuset","saluhall","historiska"],need:270}
];
var ORDER=["gamla","slottet","vasa","stadshuset","skansen","abba","fotog","monte","nobel","saluhall","historiska"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["gam","Gamla Stan (città vecchia)",[59.3250,18.0710],"A"],
["nor","Norrmalm / Stazione Centrale",[59.3320,18.0640],"A"],
["ost","Östermalm",[59.3370,18.0800],"B"],
["dju","Djurgården",[59.3250,18.1000],"C"],
["sod","Södermalm",[59.3170,18.0730],"D"],
["kun","Kungsholmen",[59.3330,18.0420],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[59.3300,18.0585],""]
];
/* imposta di soggiorno: in Svezia non esiste */
var TAX=[["h3","Hotel, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Kaffe och kanelbulle","caffè e panino alla cannella: la colazione svedese per eccellenza."],["Smörgås","un panino aperto con formaggio, prosciutto o salmone affumicato."],["Fika","la pausa del caffè con un dolce: un rito svedese."]],
pra:[["Köttbullar med potatismos","polpette con purè di patate, salsa e mirtilli rossi."],["Dagens rätt","il piatto del giorno, il pranzo economico dei lavoratori (con insalata, pane e caffè)."],["Räksmörgås","un panino aperto con i gamberi, maionese e uova."],["Stekt strömming","aringa fritta con purè: un pasto veloce e tradizionale."]],
cen:[["Köttbullar","le polpette svedesi con purè, salsa di panna e marmellata di mirtilli rossi."],["Gravad lax","salmone marinato con senape e aneto."],["Raggmunk med fläsk","frittella di patate con pancetta e mirtilli rossi: cucina d'autunno."],["Kladdkaka","il dolce al cioccolato appiccicoso, con la panna."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Stortorget in Gamla Stan","Foto","Le case colorate a gradini attorno alla piazza più antica: le luci della sera sono ancora più belle.",[59.3251,18.0710],"Stortorget, Stockholm","gamla"],
["🤳","Mårten Trotzigs gränd","Selfie","Il vicolo più stretto della città, largo meno di un metro: fai la foto dalla scala in fondo.",[59.3228,18.0735],"Mårten Trotzigs gränd, Stockholm","gamla"],
["📷","Il Palazzo Reale dal ponte","Foto","La facciata barocca vista dal lato di Strömbron, con l'acqua davanti.",[59.3268,18.0717],"Kungliga slottet, Stockholm","slottet"],
["🤳","La guardia davanti al Palazzo","Selfie","Le guardie in uniforme davanti all'ingresso, intorno a mezzogiorno.",[59.3262,18.0720],"Kungliga slottet, Stockholm","slottet"],
["📷","Lo Stadshuset dal lago","Foto","La torre con le tre corone dorate si specchia nel Mälaren: dal giardino sul lago è la foto classica della città.",[59.3275,18.0546],"Stockholms stadshus, Stockholm","stadshuset"],
["📷","La prua del Vasa","Foto","Le sculture dorate della poppa si vedono bene dalla passerella al piano superiore.",[59.3280,18.0914],"Vasamuseet, Stockholm","vasa"],
["📷","Le case rosse di Skansen","Foto","Le fattorie di legno rosso con il tetto d'erba, con la città sullo sfondo dalla collina.",[59.3242,18.1038],"Skansen, Stockholm","skansen"],
["🤳","ABBA The Museum","Selfie","La scritta all'ingresso e il manifesto del gruppo: ottimo sfondo per un selfie di coppia.",[59.3237,18.0957],"ABBA The Museum, Stockholm","abba"],
["📷","Gamla Stan dal Fotografiska","Foto","Dalla terrazza del ristorante si vede la Città Vecchia che si accende alla sera.",[59.3178,18.0861],"Fotografiska Stockholm","fotog"],
["📷","La vista da Monteliusvägen","Foto","Il Municipio, Riddarholmen e il Mälaren dal sentiero panoramico: l'ora d'oro è il momento migliore.",[59.3217,18.0553],"Monteliusvägen, Stockholm","monte"],
["📷","Le barche di Strandvägen","Foto","Le vecchie barche a vapore ormeggiate davanti ai palazzi del viale sul porto.",[59.3330,18.0850],"Strandvägen, Stockholm","saluhall"],
["📷","La facciata dell'Östermalms Saluhall","Foto","I mattoni rossi e la torretta del mercato storico.",[59.3354,18.0757],"Östermalms Saluhall, Stockholm","saluhall"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2027-01-10",t:"Skansen: orari ridotti fino al 10 gennaio",x:"Dal 28 settembre 2026 al 10 gennaio 2027 Skansen è aperto 10–15 nei giorni feriali e 10–16 nel fine settimana. Eccezioni: Halloween il 24 e dal 28 al 31 ottobre (apertura serale 15–19), mercatino di Natale dal 27 novembre al 20 dicembre (venerdì e sabato 10–17, domenica 10–16), 24 dicembre 10–14, Capodanno 10–16 e 20–24."},
{from:"2026-10-13",to:"2027-12-31",t:"Torre dello Stadshuset non visitabile in inverno",x:"La torre del Municipio è aperta solo da maggio a metà agosto e nel 2027–2028 resterà chiusa per restauro. In autunno e in inverno si può fare solo la visita guidata dell'interno."},
{from:"2026-11-15",to:"2026-12-23",t:"Mercatini di Natale",x:"Le luci di Kungsträdgården si accendono il 15 novembre 2026 alle 16. Il mercatino di Stortorget a Gamla Stan è previsto dal 21 novembre al 23 dicembre (domenica–giovedì 11–18, venerdì e sabato 11–19, date da confermare). Quello di Skansen è dal 27 novembre al 20 dicembre. Gamla Stan è molto più affollata."},
{from:"2026-12-06",to:"2026-12-11",t:"Premi Nobel: banchetto del 10 dicembre",x:"Il 10 dicembre il Municipio ospita il banchetto dei premi Nobel: nei giorni dei preparativi e della cerimonia le visite potrebbero essere sospese o spostate. Controlla stadshuset.stockholm. La città è molto affollata."},
{from:"2026-12-20",to:"2027-01-02",t:"Natale e Capodanno: chiusure",x:"Il 24 e il 25 dicembre il Museo Vasa e il Museo del Nobel sono chiusi e il Nobel chiude anche il 1° gennaio. Il 24 dicembre Fotografiska chiude alle 20, Skansen alle 14. Il 31 dicembre il Vasa è aperto 10–15. Negozi e molti locali sono chiusi il 24, 25 e 26 dicembre."}
];
/* clima medio di Stoccolma (indicativo, massime/minime) */
var CLIM=[[0,-4],[1,-4],[5,-1],[11,3],[17,8],[21,12],[23,15],[22,14],[17,10],[10,5],[5,1],[2,-2]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Stoccolma: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="saluhall"&&WD===6)meta+=" Oggi è domenica: Östermalms Saluhall è chiusa.";
if(it.id==="saluhall"&&WD===5)meta+=" Oggi è sabato: il mercato chiude alle 17.";
if(it.id==="vasa"&&WD===2)meta+=" Oggi è mercoledì: il Museo Vasa resta aperto fino alle 20.";
if(it.id==="historiska"&&WD===2)meta+=" Oggi è mercoledì: il Museo di Storia resta aperto fino alle 20.";
if(it.id==="nobel"&&WD===1)meta+=" Oggi è martedì: il Museo del Nobel dovrebbe restare aperto fino alle 20.";
if(it.id==="historiska"&&WD===0)meta+=" Oggi è lunedì: il Museo di Storia è chiuso.";
return meta}
Object.assign(C,{id:"stoccolma",n:"Stoccolma",cn:"Svezia",e:"🏛️",flag:"🇸🇪",col:["#1f6fb4","#f1c40f","#2b4a6b"],k:"stoccolma stockholm svezia sweden",
TZ:"Europe/Stockholm",LL:[59.3303,18.0586],CC:"se",QN:"Stockholm",BK:"Stockholm",ARE:/stockholm|stoccolma|\b1[0-9]{2} ?[0-9]{2}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"sv-SE",LANGN:"svedese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"SEK",s:"kr",e:0.0893},hub:{n:"T-Centralen",q:"T-Centralen, Stockholm"},
SINGLE:{acts:["gamla","slottet","vasa","stadshuset","fotog"],ins:[]},
EXCL:[],
DICON:{gamla:"🏘️",slottet:"👑",nobel:"🏅",stadshuset:"🏙️",vasa:"🚢",skansen:"🏡",abba:"🎤",fotog:"📷",monte:"🌅",historiska:"⚔️",saluhall:"🦐"},
ZN:{A:"a Gamla Stan e Norrmalm",B:"a Östermalm",C:"a Djurgården",D:"a Södermalm",F:"a Kungsholmen"},
NEAR:{col:"caffè",pra:"mercato coperto o locale veloce",cen:"locale",snk:"caffè o mercato"},
SE:{gyldene:"🍽️",vete:"🥐",saluhall:"🦐",hotorget:"🥙",saturnus:"🥐",mfp:"🍖",blaporten:"🍖",rosendal:"🥧",kalf:"🥪",soderhallarna:"🍕"},
TR:{one:3.8,cap:16.1,lbl:"Metro, tram e bus (SL)",
 air:{ARN:{one:10.6,n:"Pullman Flygbussarna (circa 119 corone)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:16.1,note:"Il biglietto 24 ore (circa 180 corone, circa 16,10 €) vale su metro, tram, bus e battelli SL per 24 ore dalla convalida."},
 {n:"Biglietto 72 ore",d:3,p:32.1,only:function(T){return T.n===3},note:"Il biglietto 72 ore (circa 360 corone, circa 32,10 €) vale su tutti i mezzi SL per tre giorni."},
 {n:"Biglietto 7 giorni",d:7,p:42,only:function(T){return T.n>=5},note:"Il biglietto 7 giorni (circa 470 corone, circa 42 €) vale su tutti i mezzi SL per sette giorni di fila."}],
 note:"Prezzi SL dal comunicato ufficiale di SL con la tariffa del 2025 (corsa singola 43 corone per 75 minuti, 24 ore 180, 72 ore 360, 7 giorni 470), convertiti a 1 € = 11,20 corone. Una fonte di agosto 2026 conferma ancora la corsa singola a 43 corone, ma il listino 2026 completo non l'ho trovato: controlla sl.se prima di comprare. Si paga con l'app SL, alle macchinette o, per la corsa singola, con carta contactless sulle porte della metro e sui bus. La tessera SL non vale sull'Arlanda Express; sul treno pendolari per l'aeroporto serve un supplemento di circa 157 corone. La metro, i tram, i bus e i battelli urbani usano lo stesso biglietto."},
FOOD:{co:[9,"Colazione al caffè"],pr:[14,"Pranzo (mercato coperto o piatto del giorno)"],ce:[24,"Cena (cucina svedese)"],sp:[6,"Spuntini e dolci"]},
T:{ride:"In metro o in tram",move:"tutto a piedi, in metro o in tram",bags:"«Kan jag lämna mina väskor här?»",bagsPM:"«Kan jag lämna mina väskor här till i eftermiddag?»",bagsAM:"«Kan jag lämna mina väskor här till lunch?»",
pra:"Un mercato coperto o un locale veloce",praZ:{A:"A Gamla Stan i ristoranti con il menù fuori sulle strade principali sono per turisti e hanno prezzi alti: i posti migliori sono nei vicoli laterali o ai mercati coperti di Norrmalm.",D:"Södermalm è il quartiere più giovane: i locali sono più economici di Gamla Stan e Östermalm."},
freeLong:"Qualche idea: una pausa fika in un caffè con un panino alla cannella, una passeggiata sul lungomare di Strandvägen, una visita al mercato coperto o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una pausa fika in un caffè.",
remind:"A Stoccolma quasi tutto si paga con carta o con Swish: porta una carta con cui puoi pagare all'estero. D'inverno fa buio presto (a dicembre il sole tramonta prima delle 15:00): organizza all'aperto le ore di luce.",
rain1:"Al coperto: il Museo Vasa, il Palazzo Reale, il Museo di Storia, Fotografiska e i mercati coperti.",
rainM:"Al coperto: Museo Vasa, Palazzo Reale, ABBA The Museum, Museo di Storia, Fotografiska e mercati coperti.",
water:"Riempite la borraccia: l'acqua del rubinetto di Stoccolma è tra le migliori del mondo. Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Stoccolma si pranza tra le 11 e le 14 e si cena di solito dalle 17:30 alle 21: molti ristoranti chiudono la cucina alle 21 e la domenica alcuni sono chiusi. Guarda l'orario accanto a ogni locale.",
night:[["🕯️","La sera si passeggia nei vicoli illuminati di Gamla Stan: in autunno e in inverno sono pieni di candele e di lanterne."],["🕙","Le cucine servono fino alle 21–22; la metro gira tutta la notte il venerdì e il sabato, nei giorni feriali ci sono i bus notturni."],["☕","Molti caffè aprono alle 7:30: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Stoccolma ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per mercati coperti e caffè: una colazione sta intorno ai 9–12 € e una cena con un piatto principale intorno ai 20–28 €. La Svezia è una delle società più «senza contanti» d'Europa: carte e Swish bastano quasi ovunque, mentre i contanti possono essere rifiutati.",
taxNote:"In Svezia non esiste l'imposta di soggiorno: il prezzo dell'alloggio è quello che paghi.",
mcrit:"Criteri: almeno 4 stelle su Google, mercati coperti, caffè e locali con piatti svedesi, niente catene. Colazione e cena restano sotto i 25–30 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["L'Arlanda Express porta alla Stazione Centrale in 18 minuti: è la via più rapida, ma costa circa 340 corone. Il pullman Flygbussarna costa un terzo.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto per l'aeroporto (Arlanda Express circa 340 corone o Flygbussarna circa 119 corone) e biglietto dei mezzi SL (corsa singola 43 corone, 24 ore circa 180): si comprano con l'app, alle macchinette o con la carta contactless",function(E){return true}],["vas","Biglietto per il Museo Vasa (195 corone) online per evitare la fila",["vasa"]],["abb","Biglietto per ABBA The Museum con fascia oraria (da circa 250 corone)",["abba"]],["fot","Biglietto per Fotografiska (195 corone) e controllo del programma delle mostre",["fotog"]],["pal","Biglietto per il Palazzo Reale (circa 270 corone) e orario del cambio della guardia",["slottet"]],["card","Carta d'identità o passaporto in corso di validità"],["pay","Una carta con cui si può pagare all'estero: in Svezia i contanti non servono quasi mai"]],
NUM:{1:["en","en"],2:["två","tvo"],3:["tre","tre"],4:["fyra","FIU-ra"],5:["fem","fem"],6:["sex","seks"],7:["sju","sciu"],8:["åtta","OT-ta"],9:["nio","NI-u"],10:["tio","TI-u"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","God dag / God kväll","gud dag / gud kvell"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Ett bord för "+(N===1?"en person":nu[0])+", tack","et bur för "+(N===1?"en per-SUN":nu[1])+", tak"],["Un caffè e un panino alla cannella, per favore","En kaffe och en kanelbulle, tack","en KAF-fe o en ka-NEL-bul-le, tak"],["Acqua del rubinetto, per favore","Kranvatten, tack","KRAN-vat-ten, tak"],["Il conto, per favore","Kan jag få notan, tack?","kan ia fo NO-tan, tak"],["Posso pagare con la carta?","Kan jag betala med kort?","kan ia be-TA-la med kurt"],["Quanto costa?","Hur mycket kostar det?","hiur MIK-ke KOS-tar de"],["Dov'è la metro?","Var ligger tunnelbanan?","var LIG-ger TUN-nel-BA-nan"],["Come si arriva all'aeroporto di Arlanda?","Hur tar jag mig till Arlanda?","hiur tar ia mei til ar-LAN-da"]];
if(M)fr=fr.concat([["Ho una prenotazione","Jag har en bokning","ia har en BUK-ning"],["Posso lasciare i bagagli?","Kan jag lämna mina väskor här?","kan ia LEM-na MI-na VES-kur her"],["A che ora è il check-out?","När är utcheckningen?","ner e UT-chek-ning-en"]]);
return fr.concat([["Mi scusi","Ursäkta","UR-sek-ta"],["Grazie mille!","Tack så mycket!","tak so MIK-ke"]])},
taxTxt:function(tx){return "In Svezia non c'è nessuna imposta di soggiorno ("+tx[1].toLowerCase()+"): il prezzo che vedi sull'annuncio è quello che paghi."},
STAYTIPS:["La metro (linee rossa, verde e blu), i tram, i bus e i battelli urbani si usano con lo stesso biglietto SL. Nel fine settimana la metro gira tutta la notte; nei giorni feriali ci sono i bus notturni."],
ZONES:[
["🚇 Metro, tram e biglietti",["Un solo biglietto SL vale su metro, tram, bus e battelli urbani: la corsa singola costa 43 corone e vale 75 minuti, il 24 ore circa 180 corone (listino 2025, da controllare su sl.se).","Le macchinette e l'app SL vendono tutti i biglietti; la corsa singola si può pagare anche con la carta contactless.","Per l'aeroporto il biglietto urbano non basta: l'Arlanda Express costa circa 340 corone e non accetta le tessere SL; il treno pendolari richiede un supplemento di circa 157 corone.","Il tram 7 (Djurgårdslinjen) porta da Sergels torg a Djurgården: Vasa, ABBA e Skansen."]],
["🏘️ Centro: Gamla Stan, Palazzo Reale e Nobel",["Gamla Stan si gira a piedi in un'ora e mezza: parti da Stortorget e scendi lungo Västerlånggatan.","Il Palazzo Reale e il Museo del Nobel sono a due passi da Stortorget.","Il cambio della guardia è di solito alle 12:15 (fuori stagione ci sono meno giorni)."],["gamla","slottet","nobel"]],
["🚢 Djurgården",["Djurgården è un'isola verde con tre grandi attrazioni a pochi minuti l'una dall'altra: Vasa, ABBA The Museum e Skansen.","Il tram 7 collega il centro all'isola; in alternativa c'è il battello da Slussen o da Gamla Stan (controlla l'orario stagionale).","D'inverno Skansen e molti negozi sull'isola chiudono presto: parti la mattina."],["vasa","abba","skansen"]],
["☕ Fika, la pausa svedese",["La fika è la pausa del caffè con un dolce: in Svezia è un rito quotidiano.","Il panino alla cannella (kanelbulle) e il caffè filtrato con i rabbocchi gratis sono tipici.","Non si lascia mancia obbligatoria: si arrotonda il conto per un buon servizio."],["vete","saturnus","rosendal"]],
["🌅 Un giorno fuori Stoccolma",["Uppsala è a 40 minuti di treno dalla Stazione Centrale, con la cattedrale più alta del Nord.","L'arcipelago con i battelli per Vaxholm si raggiunge in circa un'ora; in inverno il servizio è ridotto."]]],
WTIPS:["L'acqua del rubinetto di Stoccolma è ottima e sicura: puoi chiederla in ogni locale («Kranvatten, tack») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap; d'inverno molte sono spente.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Svezia usa la corona svedese (SEK), non l'euro: 1 € vale circa 11,20 corone. Quasi tutto si paga con la carta.","La Svezia fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Stoccolma ha lo stesso fuso orario dell'Italia. A dicembre il sole tramonta prima delle 15:00.","Mancia: non è obbligatoria, ma si arrotonda per un buon servizio.","Molti negozi e piccoli locali non accettano contanti: porta una carta o usa lo smartphone.","In Svezia si fa la fika: una pausa per il caffè con un dolce, a qualsiasi ora.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🏥 <a class="call" href="tel:1177">1177</a> Consulenza sanitaria (non urgente) · polizia non urgente: <a class="call" href="tel:11414">114 14</a></li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://sl.se/" target="_blank" rel="noopener">sl.se</a> · Arlanda Express: <a href="https://www.arlandaexpress.com/" target="_blank" rel="noopener">arlandaexpress.com</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Stoccolma: <a href="https://ambstoccolma.esteri.it" target="_blank" rel="noopener">ambstoccolma.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Stoccolma. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://sl.se/" target="_blank" rel="noopener">sl.se</a> e, per le informazioni di viaggio per gli italiani, <a href="https://www.viaggiaresicuri.it/" target="_blank" rel="noopener">viaggiaresicuri.it</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="358" cy="26" r="11"/><path d="M0 106 V92 Q60 80 120 86 Q165 90 190 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M14 106 V62 H44 V106 Z M10 62 H48 L29 34 Z M28 34 L29 6 L30 34 Z M20 62 V52 H24 V62 Z M34 62 V52 H38 V62 Z"/></g>'+
'<g style="--k:2"><path d="M66 106 V74 H160 V106 Z M62 74 H164 V70 H62 Z M66 70 V60 H80 V70 Z M146 70 V60 H160 V70 Z M100 74 V64 H126 V74 Z"/></g>'+
'<g style="--k:3"><path d="M182 106 V66 H206 V106 Z M180 66 H208 L194 50 Z M188 50 Q194 36 200 50 Z M193 36 V26 H195 V36 Z"/></g>'+
'<g style="--k:4"><path d="M232 106 V70 H292 V106 Z M252 70 V34 H272 V70 Z M250 34 H274 V30 H250 Z M254 30 V22 H270 V30 Z M258 22 V14 H266 V22 Z M260 14 L262 8 L264 14 Z"/></g>'+
'<g style="--k:5"><path d="M316 106 V44 H320 V106 Z M308 44 H328 L324 30 H312 Z M317 30 V10 H319 V30 Z M340 106 V74 H350 V106 Z M356 106 A18 18 0 0 1 392 106 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M72 88 v18 M92 88 v18 M112 88 v18 M132 88 v18 M150 88 v18"/><path d="M236 82 h52 M236 92 h52"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="300" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.stoccolma);

;var n=window.CITIES["stoccolma"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["stoccolma"]);
