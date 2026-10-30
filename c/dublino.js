(function(o){
/* ===== Dublino (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.dublino=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Dublino ha un solo aeroporto, con due terminal (T1 e T2) */
var PAR={
DUB:{n:"Dublino (DUB)",s:"Dublin Airport",url:"https://www.dublinairport.com/",live:"Dublin",inMin:75,buf:150,pos:[53.4264,-6.2499],sd:"Aeroporto DUB · bus Aircoach",rt:"Dall'aeroporto: bus Aircoach 700 o Dublin Express fino al centro, circa 30 minuti.",
 arr:"L'Irlanda non fa parte dello spazio Schengen: all'arrivo c'è il controllo documenti, quindi tieni a portata di mano il passaporto o la carta d'identità e mettiti in coda agli «Arrivals». Dopo il ritiro bagagli esci e segui i cartelli «Bus and Coach». Dall'aeroporto non partono né treni né Luas: si va in centro in autobus. I più comodi sono l'Aircoach 700 (24 ore su 24, fino a ogni 15 minuti, fermate a O'Connell Street, O'Connell Bridge e Kildare Street) e il Dublin Express (fermate a Trinity College, Temple Bar e O'Connell Street, circa ogni 15 minuti dalle 4 alle 00:30). Il viaggio dura da 20 a 40 minuti, di più nelle ore di punta (7–9 e 16–19). In tutto, dall'uscita dal terminal a Trinity College, calcola circa 45–60 minuti.",
 tk:"Biglietto: l'Aircoach 700 costa circa 9 € a tratta se lo compri online (alcune offerte partono da 6 €), il ritorno da 12 €; il Dublin Express circa 9 €, anche con carta o telefono alla fermata. Gli autobus di linea 16 e 41 costano 2 € con la carta Leap (2,60 € in contanti, importo esatto) e impiegano 40–60 minuti. Prezzi dai siti degli operatori e da guide del 2026, da confermare.",
 gm:"Dublin Airport Terminal 1 bus stops",
 tips:["Controlla da quale terminal parti o arrivi (T1 o T2): le fermate dei bus sono davanti a ciascun terminal.","Il taxi per il centro costa di solito 30–45 € a tassametro, di più di notte, la domenica e nei festivi; il bus è più economico e spesso non più lento.","Nell'ora di punta il traffico può raddoppiare i tempi: se hai un volo di mattina presto, prenota il bus la sera prima e arriva in aeroporto con almeno due ore e mezza di anticipo."]}
};
/* linee (tracciati indicativi) */
var SEG={
ab:{c:"#169b62",n:"Bus Aircoach / Dublin Express dall'aeroporto",p:[[53.4264,-6.2499,"Aeroporto",2],[53.3520,-6.2601,"O'Connell Street",2],[53.3441,-6.2593,"College Green",2]]},
lr:{c:"#d8232a",n:"Luas linea rossa",p:[[53.3485,-6.2578,"Abbey Street",2],[53.3484,-6.2650,"Jervis"],[53.3472,-6.2740,"Four Courts"],[53.3477,-6.2787,"Smithfield"],[53.3476,-6.2866,"Museum"],[53.3467,-6.2926,"Heuston",2],[53.3414,-6.2940,"James's",2],[53.3390,-6.3045,"Suir Road",2]]}
};
var START=[53.3441,-6.2593];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
trinity:{t:"Trinity College e Book of Kells",z:"A",p:1,min:75,id:100,max:150,pos:[53.3440,-6.2566],q:"Trinity College Dublin Old Library",cls:"",sun:1,tk:[25,"Trinity College: Book of Kells Experience (da 25 €)",1,1],
 win:function(wd){return wd<=3?[8*60+30,17*60+30]:wd<=5?[8*60+30,18*60]:[9*60,17*60+30]},
 d:"L'università più antica d'Irlanda, fondata nel 1592, con le piazze di pietra e il Campanile. Nella Old Library si vede il Book of Kells, il manoscritto miniato dei quattro Vangeli del IX secolo, e la lunga sala delle librerie, la Long Room.",
 m:"Si entra con biglietto a orario da prenotare online su visittrinity.ie: l'ingresso base al Book of Kells Experience parte da 25 € (prezzo letto sul sito ufficiale, varia con la fascia). Orari: lunedì–giovedì 8:30–18:30, venerdì e sabato 8:30–19:00, domenica 9:00–18:30; d'inverno possono accorciarsi. Nella Long Room quasi tutti i libri sono stati portati via per i lavori di rinnovo della Old Library (restano solo le prime quattro campate): il Book of Kells si vede comunque, ma non si può fotografare. Mercoledì 14 ottobre 2026 il Trinity College è chiuso per lo sciopero nazionale."},
guinness:{t:"Guinness Storehouse",z:"C",p:1,min:90,id:120,max:180,pos:[53.3419,-6.2867],q:"Guinness Storehouse, Dublin",cls:"",sun:1,tk:[30,"Guinness Storehouse (da 26 a 36 €, con pinta)",1,1],
 win:function(){return[9*60+30,17*60]},
 d:"Il museo della birra più famosa d'Irlanda, in un vecchio magazzino di fermentazione del 1904 a forma di grande bicchiere: sette piani che raccontano come si fa la Guinness, con la pinta compresa nel biglietto, da bere nel bar panoramico all'ultimo piano.",
 m:"Aperto ogni giorno dalle 9:30; secondo una guida chiude e fa l'ultimo ingresso alle 17 da settembre a giugno e alle 18 in luglio e agosto (da confermare su guinness-storehouse.com). Si entra con fascia oraria, meglio prenotare online. Il biglietto standard con la pinta costa da circa 26 € nei giorni feriali a 30–36 € nei fine settimana; ridotto da circa 22 € per studenti e over 65. Alla cassa si paga solo con carta."},
kilmainham:{t:"Kilmainham Gaol",z:"C",p:1,min:75,id:90,max:120,pos:[53.3420,-6.3100],q:"Kilmainham Gaol, Dublin",cls:"",sun:1,tk:[8,"Kilmainham Gaol (8 €, solo con visita guidata)",1,1],
 win:function(){return[9*60+30,16*60+15]},
 d:"L'ex prigione dove furono rinchiusi e fucilati i capi della rivolta del 1916: un luogo chiave della storia dell'indipendenza irlandese. Si vede il corridoio vittoriano illuminato dall'alto, le celle e il cortile delle esecuzioni.",
 m:"Si visita solo con visita guidata, con biglietto da comprare online sul sito del museo o su heritageireland.ie: i biglietti di altri siti non valgono. Prezzi 2026: adulti 8 €, over 65 6 €, studenti 4 €, famiglie 20 €; i minori di 12 anni entrano gratis ma serve comunque il biglietto. Il centro visitatori è aperto 9:30–17:15 e il museo 10:30–17:15, l'ultimo tour parte prima. Chiuso dal 24 al 27 dicembre. Arriva 15 minuti prima del tour (30–40 minuti prima per gli ultimi due della giornata)."},
christ:{t:"Christ Church Cathedral",z:"C",p:2,min:45,id:60,max:90,pos:[53.3434,-6.2711],q:"Christ Church Cathedral, Dublin",cls:"",sun:1,tk:[12,"Christ Church Cathedral e cripta (12 €)",1,1],
 win:function(wd,d){if(wd===6)return[12*60+30,d>="2026-11-01"?13*60+45:14*60+15];return[9*60+30,(d>="2026-11-01"?17*60:18*60)-45]},
 d:"La cattedrale medievale di Dublino, fondata nell'XI secolo dai vichinghi e ricostruita in pietra dai normanni. La parte più antica è la cripta, la più lunga d'Irlanda, con tesori d'argento e il gatto mummificato «Tom» insieme al topo.",
 m:"Prezzi 2026 da guide: adulti 12 €, ragazzi 13–17 anni e over 65 10 €, bambini 2–12 anni 4 €, con la cripta. Orari: lunedì–sabato 9:30–18 in ottobre e 9:30–17 da novembre; la domenica solo a fasce (circa 12:30–15 e 16:30–18 in ottobre, 12:30–14:30 da novembre). L'ultimo ingresso è 45 minuti prima della chiusura e la cattedrale può chiudere per le funzioni: orari da confermare su christchurchcathedral.ie."},
patrick:{t:"St Patrick's Cathedral",z:"C",p:3,min:40,id:55,max:80,pos:[53.3395,-6.2719],q:"St Patrick's Cathedral, Dublin",cls:"",
 win:function(){return[9*60+30,16*60+30]},
 d:"La cattedrale più grande d'Irlanda, nel punto dove secondo la tradizione San Patrizio battezzò i primi cristiani. Qui è sepolto Jonathan Swift, l'autore dei «Viaggi di Gulliver», che fu decano della cattedrale.",
 m:"Aperta lunedì–sabato 9:30–17; la domenica l'accesso ai turisti è molto limitato per le funzioni (gratuite). Ingresso adulti 11,50 € con audioguida, ridotto circa 9 € (prezzi da guide, da confermare su stpatrickscathedral.ie). Ci sono visite guidate gratuite dal lunedì al sabato."},
temple:{t:"Temple Bar e Ha'penny Bridge",z:"A",p:2,min:45,id:70,max:110,pos:[53.3455,-6.2644],q:"Temple Bar, Dublin",cls:"walk",sun:1,
 d:"Il quartiere dei vicoli acciottolati sulla riva sud del fiume Liffey, con i pub colorati e la musica dal vivo. Di fianco, il Ha'penny Bridge, il ponte pedonale di ghisa del 1816, è il simbolo di Dublino.",
 m:"Si cammina gratis e a tutte le ore. Di giorno è tranquillo, la sera e nel fine settimana è molto affollato e i prezzi di birra e cibo sono più alti che altrove: per mangiare meglio allontanati di qualche via."},
grafton:{t:"Grafton Street e St Stephen's Green",z:"B",p:3,min:60,id:80,max:130,pos:[53.3405,-6.2598],q:"Grafton Street, Dublin",cls:"walk",sun:1,
 d:"La via pedonale dello shopping, piena di artisti di strada, che porta al grande parco vittoriano di St Stephen's Green con il laghetto, i ponticelli e le anatre. Lungo la strada c'è anche la statua di Molly Malone.",
 m:"La via è sempre percorribile. Il parco è gratuito e di norma chiude al tramonto (orari che cambiano con la stagione). La domenica i negozi aprono più tardi."},
archaeo:{t:"Museo Nazionale d'Archeologia",z:"B",p:3,min:60,id:90,max:150,pos:[53.3404,-6.2548],q:"National Museum of Ireland Archaeology, Kildare Street, Dublin",cls:"",sun:1,
 win:function(wd){return(wd===0||wd===6)?[13*60,16*60+30]:[10*60,16*60+30]},
 d:"Il museo dei tesori irlandesi: l'oro dell'età del bronzo, il Calice di Ardagh e la Spilla di Tara, e i «corpi delle torbiere», uomini dell'età del ferro conservati dalla torba per 2000 anni.",
 m:"Ingresso gratuito. Orari: martedì–sabato 10–17, domenica e lunedì 13–17; si consiglia l'ultimo ingresso alle 16:30. Chiuso il 25 e 26 dicembre e il Venerdì Santo, il 24 dicembre 10–12. Non c'è il deposito bagagli: valigie e zaini grandi non entrano. Alcune sale possono chiudere senza preavviso."},
merrion:{t:"National Gallery e Merrion Square",z:"B",p:4,min:60,id:90,max:140,pos:[53.3409,-6.2519],q:"National Gallery of Ireland, Dublin",cls:"",multi:1,sun:1,
 win:function(wd){return wd===3?[9*60+15,20*60]:(wd===0||wd===6)?[11*60,17*60]:[9*60+15,17*60]},
 d:"La pinacoteca nazionale, con Caravaggio, Vermeer e Goya e una grande sala dedicata ai pittori irlandesi, a due passi dal Merrion Square: la piazza georgiana con le porte colorate delle case e la statua di Oscar Wilde sdraiato su un masso.",
 m:"Orari: lunedì e domenica 11–17:30, martedì, mercoledì, venerdì e sabato 9:15–17:30, giovedì 9:15–20:30. Le audioguide sono gratuite. La collezione permanente di norma è gratuita (la pagina letta non lo precisa: da confermare su nationalgallery.ie). Il giardino della piazza chiude al tramonto."},
epic:{t:"EPIC, il Museo dell'Emigrazione Irlandese",z:"D",p:4,min:75,id:100,max:140,pos:[53.3494,-6.2480],q:"EPIC The Irish Emigration Museum, Dublin",cls:"",multi:1,sun:1,tk:[22,"EPIC Museo dell'Emigrazione (22 €)",1,1],
 win:function(){return[10*60,16*60+30]},
 d:"Il museo interattivo che racconta dieci milioni di irlandesi emigrati e la loro storia nel mondo, in un magazzino sotterraneo nel quartiere dei Docks. È più coinvolgente di un museo tradizionale: si ascolta, si tocca e si cerca anche il proprio cognome.",
 m:"Aperto ogni giorno 10–18:45 (dalle 9 da giugno ad agosto), chiuso dal 24 al 26 dicembre. Biglietto online 22 € adulti, 11 € bambini, gratuito sotto i 6 anni. Ultimo ingresso alle 16:30 o alle 17 (il sito riporta due orari): arriva prima. Dal centro è a circa 20 minuti a piedi lungo il fiume."},
phoenix:{t:"Phoenix Park e Dublin Zoo",z:"D",p:4,min:90,id:150,max:240,pos:[53.3562,-6.3070],q:"Phoenix Park, Dublin",cls:"walk",multi:1,sun:1,
 d:"Uno dei più grandi parchi cittadini recintati d'Europa, ad appena un'ora a piedi dal centro. Ci vivono centinaia di daini, e dentro ci sono il Dublin Zoo, il Wellington Monument (l'obelisco più alto d'Europa) e la residenza del presidente irlandese.",
 m:"Il parco è aperto 24 ore su 24 (i cancelli secondari dalle 7 alle 22:45 circa, secondo una guida). Il Dublin Zoo in ottobre è aperto 9:30–17:30, con ultimo ingresso alle 16:30 (prezzi su dublinzoo.ie, non letti). L'Áras an Uachtaráin, la residenza del presidente, si visita di solito il sabato (da confermare). In autunno il sole tramonta presto: arriva con la luce."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","trinity",3,"walk","A piedi, la porta del Trinity College è proprio a College Green, circa 3 minuti.","A piedi fino a College Green, circa 3 minuti.",{f:[W([[53.3441,-6.2593],[53.3440,-6.2575],[53.3440,-6.2566]])],r:[W([[53.3440,-6.2566],[53.3440,-6.2575],[53.3441,-6.2593]])]});
P2("start","temple",6,"walk","A piedi per Dame Street e Temple Bar, circa 6 minuti.","A piedi per Dame Street fino a College Green, circa 6 minuti.",{f:[W([[53.3441,-6.2593],[53.3449,-6.2620],[53.3455,-6.2644]])],r:[W([[53.3455,-6.2644],[53.3449,-6.2620],[53.3441,-6.2593]])]});
P2("trinity","temple",7,"walk","A piedi per Dame Street e Temple Bar, circa 7 minuti.","A piedi per Dame Street fino al Trinity College, circa 7 minuti.",{f:[W([[53.3440,-6.2566],[53.3441,-6.2593],[53.3449,-6.2620],[53.3455,-6.2644]])],r:[W([[53.3455,-6.2644],[53.3449,-6.2620],[53.3441,-6.2593],[53.3440,-6.2566]])]});
P2("trinity","grafton",8,"walk","A piedi per Nassau Street e Grafton Street, circa 8 minuti.","A piedi per Grafton Street e Nassau Street fino al Trinity College, circa 8 minuti.",{f:[W([[53.3440,-6.2566],[53.3421,-6.2590],[53.3405,-6.2598]])],r:[W([[53.3405,-6.2598],[53.3421,-6.2590],[53.3440,-6.2566]])]});
P2("temple","christ",9,"walk","A piedi lungo Essex Street e Christchurch Place fino alla cattedrale, circa 9 minuti.","A piedi lungo Fishamble Street e Essex Street fino a Temple Bar, circa 9 minuti.",{f:[W([[53.3455,-6.2644],[53.3448,-6.2680],[53.3434,-6.2711]])],r:[W([[53.3434,-6.2711],[53.3448,-6.2680],[53.3455,-6.2644]])]});
P2("christ","patrick",7,"walk","A piedi per Patrick Street fino a St Patrick's Cathedral, circa 7 minuti.","A piedi per Patrick Street fino a Christ Church, circa 7 minuti.",{f:[W([[53.3434,-6.2711],[53.3415,-6.2715],[53.3395,-6.2719]])],r:[W([[53.3395,-6.2719],[53.3415,-6.2715],[53.3434,-6.2711]])]});
P2("patrick","guinness",17,"walk","A piedi per Thomas Street e James's Street fino al Guinness Storehouse, circa 17 minuti.","A piedi per James's Street e Thomas Street fino a St Patrick's Cathedral, circa 17 minuti.",{f:[W([[53.3395,-6.2719],[53.3420,-6.2780],[53.3419,-6.2867]])],r:[W([[53.3419,-6.2867],[53.3420,-6.2780],[53.3395,-6.2719]])]});
P2("christ","guinness",18,"walk","A piedi per High Street e Thomas Street fino al Guinness Storehouse, circa 18 minuti.","A piedi per Thomas Street e High Street fino a Christ Church, circa 18 minuti.",{f:[W([[53.3434,-6.2711],[53.3430,-6.2790],[53.3419,-6.2867]])],r:[W([[53.3419,-6.2867],[53.3430,-6.2790],[53.3434,-6.2711]])]});
P2("grafton","archaeo",9,"walk","A piedi per Kildare Street fino al Museo d'Archeologia, circa 9 minuti.","A piedi per Kildare Street fino a Grafton Street, circa 9 minuti.",{f:[W([[53.3405,-6.2598],[53.3404,-6.2575],[53.3404,-6.2548]])],r:[W([[53.3404,-6.2548],[53.3404,-6.2575],[53.3405,-6.2598]])]});
P2("archaeo","merrion",5,"walk","A piedi per Kildare Street e Merrion Street fino alla National Gallery, circa 5 minuti.","A piedi per Merrion Street fino al Museo d'Archeologia, circa 5 minuti.",{f:[W([[53.3404,-6.2548],[53.3407,-6.2530],[53.3409,-6.2519]])],r:[W([[53.3409,-6.2519],[53.3407,-6.2530],[53.3404,-6.2548]])]});
P2("grafton","merrion",12,"walk","A piedi per Kildare Street e Merrion Square fino alla National Gallery, circa 12 minuti.","A piedi per Merrion Square e Kildare Street fino a Grafton Street, circa 12 minuti.",{f:[W([[53.3405,-6.2598],[53.3406,-6.2560],[53.3409,-6.2519]])],r:[W([[53.3409,-6.2519],[53.3406,-6.2560],[53.3405,-6.2598]])]});
P2("start","epic",20,"walk","A piedi lungo i quais del Liffey (Custom House Quay) fino a EPIC, circa 20 minuti. In alternativa Luas linea rossa fino a Busáras o George's Dock.","A piedi lungo i quais fino a College Green, circa 20 minuti.",{f:[W([[53.3441,-6.2593],[53.3470,-6.2570],[53.3485,-6.2520],[53.3494,-6.2480]])],r:[W([[53.3494,-6.2480],[53.3485,-6.2520],[53.3470,-6.2570],[53.3441,-6.2593]])]});
P2("start","guinness",30,"metro","Luas linea rossa da Abbey Street a James's (6 fermate, circa 14 minuti), poi 7 minuti a piedi fino al Guinness Storehouse. In alternativa a piedi per Dame Street e Thomas Street, circa 30 minuti.","Luas linea rossa da James's ad Abbey Street, o a piedi per Thomas Street e Dame Street, circa 30 minuti.",{f:[W([[53.3441,-6.2593],[53.3472,-6.2592],[53.3485,-6.2578]]),["lr","Abbey Street","James's"],W([[53.3414,-6.2940],[53.3419,-6.2867]])],r:[W([[53.3419,-6.2867],[53.3414,-6.2940]]),["lr","James's","Abbey Street"],W([[53.3485,-6.2578],[53.3472,-6.2592],[53.3441,-6.2593]])]});
P2("start","kilmainham",40,"metro","Luas linea rossa da Abbey Street a Suir Road (circa 20 minuti), poi circa 10 minuti a piedi fino a Kilmainham Gaol.","Dal Kilmainham Gaol a piedi fino a Suir Road, poi Luas linea rossa fino ad Abbey Street, circa 40 minuti.",{f:[W([[53.3441,-6.2593],[53.3472,-6.2592],[53.3485,-6.2578]]),["lr","Abbey Street","Suir Road"],W([[53.3390,-6.3045],[53.3420,-6.3100]])],r:[W([[53.3420,-6.3100],[53.3390,-6.3045]]),["lr","Suir Road","Abbey Street"],W([[53.3485,-6.2578],[53.3472,-6.2592],[53.3441,-6.2593]])]});
P2("guinness","kilmainham",25,"metro","A piedi lungo la Luas rossa fino a James's e Suir Road, oppure in Luas da James's a Suir Road, circa 25 minuti in tutto.","In Luas da Suir Road a James's, poi a piedi fino al Guinness Storehouse, circa 25 minuti.",{f:[W([[53.3419,-6.2867],[53.3414,-6.2940]]),["lr","James's","Suir Road"],W([[53.3390,-6.3045],[53.3420,-6.3100]])],r:[W([[53.3420,-6.3100],[53.3390,-6.3045]]),["lr","Suir Road","James's"],W([[53.3414,-6.2940],[53.3419,-6.2867]])]});
P2("start","phoenix",35,"metro","Luas linea rossa da Abbey Street a Heuston (circa 12 minuti), poi 15 minuti a piedi per il Parkgate e lo zoo.","A piedi fino a Heuston, poi Luas linea rossa fino ad Abbey Street, circa 35 minuti.",{f:[W([[53.3441,-6.2593],[53.3472,-6.2592],[53.3485,-6.2578]]),["lr","Abbey Street","Heuston"],W([[53.3467,-6.2926],[53.3480,-6.2990],[53.3530,-6.3040],[53.3562,-6.3070]])],r:[W([[53.3562,-6.3070],[53.3530,-6.3040],[53.3480,-6.2990],[53.3467,-6.2926]]),["lr","Heuston","Abbey Street"],W([[53.3485,-6.2578],[53.3472,-6.2592],[53.3441,-6.2593]])]});
/* ritorno in aeroporto: bus Aircoach o Dublin Express da College Green */
var RET={
DUB:{
 A:{min:50,txt:"Bus Aircoach 700 (24 ore su 24, da O'Connell Street, O'Connell Bridge o Kildare Street) oppure Dublin Express (da Trinity College, Temple Bar o O'Connell Street) fino all'aeroporto, circa 30 minuti (da 20 a 40 con il traffico, di più alle 7–9 e alle 16–19). Biglietto circa 9 € a tratta, meno se lo compri online. Alternativa più economica ma più lenta: bus 16 o 41 da O'Connell Street (2 € con la carta Leap, 40–60 minuti).",g:[["ab","College Green","Aeroporto"]]}}
};
var ARR={
DUB:[["ab","Aeroporto","College Green"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
brother:{n:"Brother Hubbard North",a:"153 Capel Street",z:"D",r:"4+",pos:[53.3482,-6.2692],h:["07:30-17:00","07:30-17:00","07:30-22:00","07:30-22:00","07:30-22:00","09:30-22:00","09:30-17:00"],
 d:"Un locale luminoso da brunch con ispirazione mediorientale, sulla riva nord del Liffey: shakshuka con il pane della casa, french toast al cardamomo e un buon flat white. Il fine settimana si fa la coda prima dell'apertura.",pr:"Fascia economica o media: un brunch sta indicativamente intorno ai 12–16 € (listino non visto). Sabato e domenica solo senza prenotazione. Orari da una scheda online, da confermare."},
queen:{n:"Queen of Tarts",a:"4 Cork Hill, Dame Street",z:"A",r:"4+",pos:[53.3436,-6.2670],h:["08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00","09:00-19:00","10:00-18:00"],
 d:"Una pasticceria-caffè irlandese di fronte a Dublin Castle: torte salate di patate e cipolla, tarte alla frutta, scones e crumble di mele, con tè o caffè. Ottima per una colazione o un tè del pomeriggio.",pr:"Fascia economica o media: un dolce con il tè sta intorno ai 8–12 € (listino non visto). Orari da una scheda online, da confermare."},
leo:{n:"Leo Burdock",a:"2 Werburgh Street",z:"C",r:"4+",pos:[53.3426,-6.2706],h:D7("11:30-22:30"),
 d:"Il fish and chips più famoso della città, aperto dal 1913, a un passo da Christ Church: il merluzzo fritto con patatine si mangia da asporto, per strada o in un parco vicino.",pr:"Fascia economica: un fish and chips sta indicativamente intorno ai 12–16 € (listino non visto). Orari da una scheda online, da confermare."},
brazen:{n:"The Brazen Head",a:"20 Lower Bridge Street",z:"C",r:"4+",pos:[53.3449,-6.2766],h:D7("12:00-21:00"),
 d:"Il pub più antico di Dublino, con una licenza che risale al 1198: sale basse in legno, un cortile e musica tradizionale dal vivo la sera. Si mangiano stufato irlandese, fish and chips, pasticcio del pastore.",pr:"Fascia media: un piatto sta intorno ai 16–22 € (listino non visto). La cucina serve fino alle 21; il locale resta aperto fino a tardi. Orari dal sito del pub, da confermare."},
gallagher:{n:"Gallagher's Boxty House",a:"20-21 Temple Bar",z:"A",r:"4+",pos:[53.3455,-6.2641],h:["09:00-22:00","09:00-22:00","09:00-22:00","09:00-22:00","09:00-22:00","09:00-22:00","10:00-22:00"],
 d:"Un ristorante di cucina tradizionale irlandese a Temple Bar, specializzato nel boxty, la frittella di patate ripiena. Si trovano anche lo stufato di manzo con Guinness e il pasticcio del pastore, in un ambiente accogliente.",pr:"Fascia media: un piatto principale sta intorno ai 18–24 € (listino non visto); una scheda online indica «30 € o meno» a persona. Orari da OpenTable, da confermare."},
cornucopia:{n:"Cornucopia",a:"19-20 Wicklow Street",z:"B",r:"4+",pos:[53.3419,-6.2622],h:["08:00-19:00","08:00-19:00","08:00-19:00","08:00-20:00","08:00-20:00","08:00-20:00","09:00-19:00"],
 d:"Un ristorante vegetariano e vegano storico, a due passi da Grafton Street: banco con insalate, zuppe, torte e piatti caldi del giorno, da prendere al bancone. Una pausa leggera nel cuore dello shopping.",pr:"Fascia economica o media: un pranzo sta intorno ai 12–16 € (una scheda online indica 20–30 $ a persona, listino non visto). Orari da una scheda online, da confermare."},
kaph:{n:"Kaph",a:"31 Drury Street",z:"B",r:"4+",pos:[53.3419,-6.2650],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","10:00-18:00"],
 d:"Un caffè di specialità in una via laterale vicino a Grafton Street: espresso e caffè filtro curati, latti vegetali e qualcosa da mangiare. È un posto per una colazione tranquilla o per una pausa di mezza mattina.",pr:"Fascia economica: un caffè con un dolce sta intorno ai 6–9 € (listino non visto). Orari da una scheda online, da confermare."},
panem:{n:"Panem",a:"21 Lower Ormond Quay",z:"D",r:"4+",pos:[53.3462,-6.2630],h:["08:00-17:30","08:00-17:30","08:00-17:30","08:00-17:30","08:00-17:30","09:00-17:30","09:30-17:30"],
 d:"Un piccolo caffè italo-francese di fronte al Ha'penny Bridge, sulla riva nord: croissant, brioche al cioccolato, focacce farcite e zuppe, con caffè arabica siciliano. Pochi tavoli, qualità alta.",pr:"Fascia economica: una colazione sta intorno ai 6–10 € (listino non visto). Secondo una scheda online non accetta carte: porta contanti. Orari da quella scheda, da confermare."},
windingstair:{n:"The Winding Stair",a:"40 Lower Ormond Quay",z:"D",r:"4+",pos:[53.3462,-6.2646],h:["17:30-21:00","17:30-21:00","12:00-15:00,17:00-21:00","12:00-15:00,17:30-22:00","12:00-15:00,17:30-22:00","12:00-15:00,17:30-22:00","12:00-15:00,17:30-21:00"],
 d:"Un ristorante sopra una storica libreria che dà sul fiume, con cucina irlandese di stagione: pesce affumicato, merluzzo con purè di cheddar, pudding al pane con salsa al whiskey. Meglio prenotare la sera.",pr:"Fascia media: antipasti intorno ai 14 €, piatti principali intorno ai 25 € (alcuni prezzi letti su una guida, non datati). Orari da una guida online, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["queen","kaph","panem"],B:["kaph","cornucopia","queen"],C:["queen","kaph"],D:["brother","panem"]},
pra:{A:["gallagher","queen","panem"],B:["cornucopia","kaph","gallagher"],C:["leo","brazen"],D:["brother","panem","windingstair"]},
cen:{A:["gallagher","windingstair","brazen"],B:["gallagher","windingstair","leo"],C:["brazen","leo"],D:["brother","windingstair"]},
snk:{A:["queen","panem"],B:["kaph","cornucopia"],C:["leo","queen"],D:["panem","brother"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Trinity College, Temple Bar e Grafton Street",acts:["trinity","temple","grafton"],need:210,core:1},
{id:"lib",t:"Cattedrali e Guinness Storehouse",acts:["christ","patrick","guinness"],need:270,core:1},
{id:"kil",t:"Kilmainham Gaol e Phoenix Park",acts:["kilmainham","phoenix"],need:270,core:1},
{id:"musei",t:"Museo d'Archeologia e National Gallery",acts:["archaeo","merrion"],need:170},
{id:"epic",t:"EPIC e i quais del Liffey",acts:["epic"],need:110}
];
var ORDER=["trinity","guinness","kilmainham","christ","patrick","temple","grafton","archaeo","merrion","epic","phoenix"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cen","Centro: Temple Bar / Trinity / Dame Street",[53.3441,-6.2620],"A"],
["geo","Dublino georgiana: St Stephen's Green / Merrion Square",[53.3395,-6.2540],"B"],
["lib","Liberties / Kilmainham",[53.3415,-6.2790],"C"],
["nor","Riva nord: O'Connell Street / Capel Street / Smithfield",[53.3490,-6.2650],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[53.3441,-6.2593],""]
];
/* in Irlanda non c'è un'imposta di soggiorno */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Irish breakfast","la colazione irlandese: uova, pancetta, salsiccia, pomodoro, funghi, pane e un tè."],["Scone and tea","un dolce tipo focaccina con burro e marmellata, e un tè."],["Porridge","il porridge di avena, caldo, con miele o frutta."]],
pra:[["Fish and chips","pesce fritto con patatine, spesso da asporto."],["Soup and brown bread","zuppa del giorno con il pane scuro irlandese."],["Boxty","la frittella di patate ripiena, specialità irlandese."],["Seafood chowder","zuppa densa di pesce e latte, ottima nelle giornate fredde."]],
cen:[["Irish stew","stufato di agnello o manzo con patate e carote: il piatto simbolo dell'Irlanda."],["Beef and Guinness stew","stufato di manzo cotto nella birra Guinness."],["Shepherd's pie","pasticcio di carne macinata coperto di purè di patate."],["Sticky toffee pudding","il dolce caldo al caramello, con gelato o panna."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Campanile del Trinity College","Foto","La torre di pietra al centro di Front Square, vista dal prato dopo il cancello.",[53.3438,-6.2559],"Campanile Trinity College Dublin","trinity"],
["📷","Il Ha'penny Bridge","Foto","Il ponte di ghisa bianco con i lampioni, soprattutto al tramonto, dalla banchina a est.",[53.3463,-6.2635],"Ha'penny Bridge, Dublin","temple"],
["🤳","Le facciate rosse di Temple Bar","Selfie","Il pub rosso più fotografato d'Irlanda, in mezzo ai vicoli con le lanterne.",[53.3455,-6.2644],"The Temple Bar Pub, Dublin","temple"],
["📷","Christ Church dalla strada","Foto","La facciata e la torre della cattedrale, con il ponte che attraversa la via.",[53.3434,-6.2711],"Christ Church Cathedral, Dublin","christ"],
["📷","St Patrick's Cathedral e il parco","Foto","La guglia della cattedrale vista dal piccolo giardino sul lato nord.",[53.3395,-6.2719],"St Patrick's Park, Dublin","patrick"],
["📷","Il Guinness Storehouse","Foto","L'ingresso dell'antica fabbrica, con l'arpa e la scritta di mattoni rossi.",[53.3419,-6.2867],"Guinness Storehouse, Dublin","guinness"],
["📷","Kilmainham Gaol","Foto","La facciata scura della prigione con il portone, dalla strada davanti.",[53.3420,-6.3100],"Kilmainham Gaol, Dublin","kilmainham"],
["🤳","Molly Malone","Selfie","La statua della pescivendola della canzone, all'inizio di Grafton Street.",[53.3438,-6.2610],"Molly Malone statue, Dublin","grafton"],
["📷","Fusiliers' Arch","Foto","L'arco di pietra all'ingresso nord di St Stephen's Green.",[53.3394,-6.2619],"Fusiliers' Arch, Dublin","grafton"],
["🤳","Oscar Wilde a Merrion Square","Selfie","La statua dello scrittore sdraiato sul masso di quarzo, nell'angolo nord-ovest del giardino.",[53.3410,-6.2496],"Oscar Wilde statue, Merrion Square, Dublin","merrion"],
["📷","Le porte georgiane","Foto","Le file di porte dai colori vivaci intorno a Merrion Square.",[53.3395,-6.2490],"Merrion Square, Dublin","merrion"],
["📷","Il Samuel Beckett Bridge","Foto","Il ponte bianco a forma di arpa sul Liffey, dai Docks vicino a EPIC.",[53.3478,-6.2433],"Samuel Beckett Bridge, Dublin","epic"],
["📷","I daini di Phoenix Park","Foto","Il branco di daini nei prati, più visibile al mattino presto e in autunno.",[53.3600,-6.3350],"Phoenix Park deer, Dublin","phoenix"],
["📷","Il Wellington Monument","Foto","L'obelisco di pietra visto dal viale che sale dal Parkgate.",[53.3600,-6.3260],"Wellington Monument, Phoenix Park, Dublin","phoenix"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-10-14",t:"14 ottobre: possibile sciopero dei dipendenti pubblici",x:"Mercoledì 14 ottobre 2026 si prevede uno sciopero nazionale dei dipendenti pubblici (sanità, scuole e altri). Il Trinity College e il Book of Kells restano chiusi quel giorno. Non ho trovato scioperi dei trasporti annunciati, ma controlla tfi.ie."},
{from:"2026-10-13",to:"2027-01-31",t:"Dublin Castle chiuso fino a gennaio 2027",x:"Il Castello di Dublino è chiuso al pubblico fino a gennaio 2027 perché ospita gli eventi della presidenza irlandese dell'Unione Europea (luglio–dicembre 2026). Per questo non è tra le tappe. Nel centro possono esserci strade chiuse e controlli di sicurezza."},
{from:"2026-10-13",to:"2027-12-31",t:"Trinity College: lavori nella Long Room",x:"Per i lavori di rinnovo della Old Library nella Long Room sono stati tolti quasi tutti i libri. Il Book of Kells si visita ancora. Una recensione parla di una chiusura più lunga dal 2027, ma non è una notizia ufficiale: controlla visittrinity.ie prima di prenotare."},
{from:"2026-10-20",to:"2026-10-27",t:"Lunedì 26 ottobre è festa nazionale",x:"L'ultimo lunedì di ottobre in Irlanda è festivo (October Bank Holiday): i trasporti seguono l'orario festivo e in città c'è più gente. Controlla gli orari di musei e locali."},
{from:"2026-12-18",to:"2026-12-31",t:"Natale: chiusure e servizi ridotti",x:"Il Kilmainham Gaol è chiuso dal 24 al 27 dicembre, EPIC dal 24 al 26, il Museo d'Archeologia il 25 e il 26 (il 24 apre solo 10–12). Il 25 dicembre i trasporti pubblici sono molto ridotti o fermi e la maggior parte dei locali è chiusa."}
];
/* clima medio di Dublino (massime/minime, indicativo) */
var CLIM=[[8,3],[8,3],[10,4],[12,5],[15,8],[18,11],[20,13],[19,13],[17,11],[14,8],[10,5],[8,4]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Dublino: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="archaeo"&&(WD===0||WD===6))meta+=" Oggi il museo apre solo dalle 13 (fino alle 17).";
if(it.id==="merrion"&&WD===3)meta+=" Oggi è giovedì: la National Gallery resta aperta fino alle 20:30.";
if(it.id==="christ"&&WD===6)meta+=" Oggi è domenica: la cattedrale è aperta solo a fasce (circa dalle 12:30 alle 15), controlla l'orario.";
if(it.id==="patrick"&&WD===6)meta+=" Oggi è domenica: l'accesso ai turisti è molto limitato per le funzioni.";
return meta}
Object.assign(C,{id:"dublino",n:"Dublino",cn:"Irlanda",e:"🍀",flag:"🇮🇪",col:["#169b62","#ff883e","#e8e8e8"],k:"dublino dublin irlanda ireland",
TZ:"Europe/Dublin",LL:[53.3441,-6.2593],CC:"ie",QN:"Dublin",BK:"Dublin",ARE:/dublin|dublino|\bD(0?[1-9]|1[0-9]|2[0-4]|6W)\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"en-IE",LANGN:"inglese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"College Green",q:"College Green, Dublin"},
SINGLE:{acts:["trinity","temple","christ","guinness","grafton"],ins:[]},
EXCL:[],
DICON:{trinity:"📖",guinness:"🍺",kilmainham:"⛓️",christ:"⛪",patrick:"🔔",temple:"🎶",grafton:"🛍️",archaeo:"🏺",merrion:"🎨",epic:"🧳",phoenix:"🦌"},
ZN:{A:"a Temple Bar e Trinity",B:"a Grafton Street e St Stephen's Green",C:"nei Liberties",D:"sulla riva nord del Liffey"},
NEAR:{col:"caffè",pra:"pub o caffè",cen:"pub o ristorante",snk:"caffè o chipper"},
SE:{brother:"🍳",queen:"🥧",leo:"🐟",brazen:"🍺",gallagher:"🥔",cornucopia:"🥗",kaph:"☕",panem:"🥐",windingstair:"🍽️"},
TR:{one:2,cap:6,lbl:"Bus, Luas e DART (carta Leap)",
 air:{DUB:{one:9,n:"Bus per l'aeroporto (Aircoach o Dublin Express, circa 9 €)"}},
 passes:[],
 note:"Prezzi del 2026 dal sito dei trasporti irlandesi (transportforireland.ie) e da guide: con la carta Leap un bus costa 2 € per 90 minuti (1,50 € per le tratte brevi), il Luas 1,50 € per le tratte brevi; in contanti sul bus 2,60 € (importo esatto, senza resto), sul Luas 2 €. Il tetto giornaliero della carta Leap per un adulto è di 6 € al giorno e 24 € a settimana. La carta Leap ha una cauzione di 5 € e si ricarica; esiste anche una Leap Visitor Card con corse illimitate (prezzi diversi tra le guide: controlla leapcard.ie), ma con il tetto di 6 € la carta normale basta. Con il Luas si tocca la carta sia salendo sia scendendo. L'Aircoach non accetta la carta Leap. Aeroporto: bus Aircoach o Dublin Express circa 9 € a tratta."},
FOOD:{co:[10,"Colazione al caffè"],pr:[14,"Pranzo (zuppa, panino o fish and chips)"],ce:[22,"Cena (pub o ristorante di quartiere)"],sp:[5,"Spuntini e dolci"]},
T:{doc:"Passaporto o carta d'identità in corso di validità (l'Irlanda non è nello spazio Schengen: all'arrivo c'è il controllo documenti)",ride:"In Luas o bus",move:"tutto a piedi, in Luas o in bus",bags:"«Can I leave my bags here?»",bagsPM:"«Can I leave my bags until this afternoon?»",bagsAM:"«Can I leave my bags until midday?»",
pra:"Un pub o un caffè",praZ:{A:"Temple Bar è la zona più turistica e più cara: per un pranzo vero cerca nelle vie laterali (Drury Street, Fownes Street) o sulla riva nord.",C:"Nei Liberties ci sono pub e chipper storici: dopo il Guinness Storehouse o le cattedrali mangia in zona, non a Temple Bar."},
freeLong:"Qualche idea: un tè con uno scone in un caffè, una passeggiata a St Stephen's Green, un museo gratuito (Archeologia o National Gallery), un pub con musica dal vivo la sera, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata a St Stephen's Green o lungo il fiume.",
remind:"Per il Book of Kells, il Guinness Storehouse e il Kilmainham Gaol serve il biglietto a orario: prenotalo online prima. Porta un impermeabile: la pioggia a Dublino arriva senza avviso.",
rain1:"Al coperto: il Trinity College con il Book of Kells, il Guinness Storehouse, il Museo d'Archeologia, la National Gallery e le cattedrali.",
rainM:"Al coperto: Book of Kells, Guinness Storehouse, Kilmainham Gaol (visita guidata), Museo d'Archeologia, National Gallery, EPIC e i pub.",
water:"Riempite la borraccia: l'acqua del rubinetto di Dublino è potabile e buona; nei caffè e nei pub la chiedete con «tap water, please». Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Dublino si pranza tra le 12 e le 14:30 e si cena presto, dalle 17:30–18: molte cucine dei pub chiudono alle 21, guarda l'orario accanto a ogni locale.",
night:[["🍺","Una pinta in un pub di quartiere o con musica tradizionale dal vivo è il modo irlandese di chiudere la giornata (fuori da Temple Bar costa meno)."],["🕙","Le cucine chiudono presto, spesso alle 21; dopo mezzanotte i mezzi pubblici sono pochi: rientra con il taxi o scegli un alloggio vicino al centro."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Dublino è un'ora indietro rispetto all'Italia",
plug:"Adattatore per la presa irlandese (tipo G, tre poli piatti) e caricabatterie",
foodNote:"I pasti sono stime per locali di quartiere: in Irlanda i prezzi sono più alti che in Italia. Una colazione sta intorno ai 8–12 €, un pranzo veloce intorno ai 12–16 €, una cena con un piatto principale intorno ai 20–25 €. Si paga quasi ovunque con la carta; un paio di locali piccoli accettano solo contanti.",
taxNote:"A Dublino, come in tutta l'Irlanda, a quanto risulta non c'è un'imposta di soggiorno: il prezzo che trovi sull'alloggio è quello che paghi (da confermare con la struttura).",
mcrit:"Criteri: caffè, pub, chipper e locali tradizionali o di quartiere, niente catene. Colazione e pranzo restano sotto i 15 € a persona, la cena sotto i 25 €. Le valutazioni sono indicative (almeno 4 stelle); orari e prezzi sono quelli di guide e schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Tieni il passaporto o la carta d'identità a portata di mano: all'arrivo c'è il controllo documenti e la coda può durare da 10 a 40 minuti. Anche la partenza chiede più tempo: arriva con almeno due ore e mezza di anticipo.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto del bus per l'aeroporto (Aircoach o Dublin Express, circa 9 €): online costa meno",function(E){return true}],["leap","Carta Leap o contanti esatti per il bus (non danno resto); il Luas si paga con la Leap o a una macchinetta"],["trn","Biglietto a orario per il Book of Kells Experience (visittrinity.ie, online)",["trinity"]],["gui","Biglietto a orario per il Guinness Storehouse (guinness-storehouse.com, online)",["guinness"]],["kil","Biglietto per Kilmainham Gaol (8 €, solo online e con visita guidata)",["kilmainham"]],["epic","Biglietto per EPIC (22 € online)",["epic"]],["plug","Adattatore per la presa irlandese (tipo G)"],["rain","Un impermeabile leggero o un ombrello: a Dublino la pioggia arriva senza avviso"]],
NUM:{1:["one person","uan PER-son"],2:["two","tu"],3:["three","tri"],4:["four","for"],5:["five","faiv"],6:["six","sics"],7:["seven","SE-ven"],8:["eight","eit"],9:["nine","nain"],10:["ten","ten"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Good morning / Good evening","gud MOR-ning / gud IV-ning"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","A table for "+nu[0]+", please","e TEI-bol for "+nu[1]+", pliz"],["Una tazza di tè e uno scone, per favore","A cup of tea and a scone, please","e cap ov ti end e scon, pliz"],["Una pinta di Guinness, per favore","A pint of Guinness, please","e paint ov GHI-nis, pliz"],["Acqua del rubinetto, per favore","Tap water, please","tap UO-ter, pliz"],["Il conto, per favore","Could we have the bill, please?","cud ui hav de bil, pliz"],["Posso pagare con la carta?","Can I pay by card?","can ai pei bai card"],["Quanto costa?","How much is it?","hau mac is it"],["Dov'è la fermata del Luas?","Where is the Luas stop?","uer is de LUAS stop"],["Quale bus va all'aeroporto?","Which bus goes to the airport?","uic bas gous tu di ER-port"]];
if(M)fr=fr.concat([["Ho una prenotazione","I have a reservation","ai hav e re-ser-VEI-scion"],["Posso lasciare i bagagli?","Can I leave my bags here?","can ai liv mai bags hir"],["A che ora è il check-out?","What time is check-out?","uot taim is CEC-aut"]]);
return fr.concat([["Mi scusi","Excuse me","ec-SCIUS mi"],["Grazie mille!","Thank you so much!","tenk iu sou mac"]])},
taxTxt:function(tx){return "A Dublino, come in tutta l'Irlanda, a quanto risulta non c'è un'imposta di soggiorno: il prezzo che trovi sull'alloggio è quello che paghi (da confermare con la struttura)."},
STAYTIPS:["Dopo mezzanotte i mezzi pubblici sono pochi: se rientri tardi, scegli un alloggio vicino al centro o conta sul taxi. Il Luas ferma verso mezzanotte e mezza."],
ZONES:[
["🚌 Bus, Luas e carta Leap",["Con la carta Leap un bus costa 2 € per 90 minuti e il tetto è di 6 € al giorno per un adulto; in contanti sul bus 2,60 €, importo esatto e senza resto. Il Luas (tram) costa 1,50 € per le tratte brevi con la Leap, 2 € in contanti.","La carta Leap ha una cauzione di 5 € e si ricarica alle macchinette o con l'app TFI Go. Sul Luas si tocca la carta sia salendo sia scendendo.","L'aeroporto non ha treni né Luas: si prende il bus (Aircoach o Dublin Express, circa 9 €), che non accetta la carta Leap.","In Irlanda si guida a sinistra: quando attraversi guarda prima a destra."]],
["📖 Trinity e Temple Bar",["Il Book of Kells si visita con biglietto a orario da prenotare online: nei fine settimana e in estate si esaurisce con giorni di anticipo.","Temple Bar di giorno è un bel quartiere di vicoli; di sera diventa molto affollato e i prezzi salgono: per un pub più tranquillo allontanati di qualche via.","Il Ha'penny Bridge si attraversa gratis e porta ai caffè della riva nord."],["trinity","temple"]],
["🍺 Cattedrali e Guinness",["Christ Church e St Patrick's costano circa 12 € e 11,50 € l'una: scegline una se il budget è limitato (la cripta di Christ Church è la parte più antica).","Il Guinness Storehouse si prenota online per fascia oraria; il biglietto comprende una pinta nel bar panoramico.","La zona dei Liberties è la più autentica: pub di quartiere, chipper storici e il mercato del sabato."],["christ","patrick","guinness"]],
["⛓️ Kilmainham Gaol",["Si visita solo con visita guidata: prenota il biglietto sul sito ufficiale (8 €); i biglietti di altri siti non valgono.","Arriva 15 minuti prima del tour (30–40 per gli ultimi due della giornata).","Dal centro si arriva con il Luas rosso fino a Suir Road e circa 10 minuti a piedi."],["kilmainham"]],
["🏺 Musei gratuiti e Georgian Dublin",["Il Museo d'Archeologia è gratuito e vale la visita per l'oro e per i corpi delle torbiere; non ha il deposito bagagli.","Merrion Square e le porte colorate delle case georgiane sono tra i posti più fotografati della città.","La National Gallery ha un orario lungo il giovedì (fino alle 20:30)."],["archaeo","merrion","grafton"]],
["🦌 Phoenix Park",["Il parco è enorme: per vedere i daini e lo zoo calcola almeno mezza giornata.","Dal centro: Luas rosso fino a Heuston e 15 minuti a piedi, oppure bus dal centro.","In autunno il sole tramonta presto: arriva con la luce."],["phoenix"]],
["🌅 Un giorno fuori Dublino",["Howth, un villaggio di pescatori con sentieri sulle scogliere, è a circa 30 minuti di DART (il treno costiero) da Tara Street o Connolly.","Dalkey e Dún Laoghaire, a sud, si raggiungono con il DART in circa 25 minuti: passeggiate sul mare e caffè.","Per Glendalough e le montagne di Wicklow ci sono gite organizzate in giornata dal centro."]]],
WTIPS:["L'acqua del rubinetto di Dublino è potabile e buona: la puoi chiedere in ogni locale («tap water, please») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se lo chiedi con gentilezza.","Le fontane decorative non sono da bere."],
GEN:["L'Irlanda usa l'euro ed è nell'UE, ma non nello spazio Schengen: serve un documento valido (passaporto o carta d'identità) e all'arrivo c'è il controllo documenti.","Dublino è un'ora indietro rispetto all'Italia: gli orari dei voli sono sempre quelli locali.","La presa è di tipo G (tre poli piatti): serve un adattatore. Il roaming è come in Italia, perché l'Irlanda è nell'UE.","Mancia: non è obbligatoria; nei ristoranti si lascia circa il 10–12,5% se il servizio non è già incluso nel conto, nei pub non serve per la birra.","Nei pub si ordina e si paga al bancone; spesso la cucina chiude alle 21.","In Irlanda si guida a sinistra: attento quando attraversi.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> o <a class="call" href="tel:999">999</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚌 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.tfi.ie/" target="_blank" rel="noopener">tfi.ie</a> · Dublin Bus: <a href="https://www.dublinbus.ie/" target="_blank" rel="noopener">dublinbus.ie</a> · Luas: <a href="https://luas.ie/" target="_blank" rel="noopener">luas.ie</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Dublino: <a href="https://ambdublino.esteri.it" target="_blank" rel="noopener">ambdublino.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho trovato scioperi dei trasporti di Dublino. È però annunciata un\'azione sindacale dei dipendenti pubblici (sanità e scuole) con possibile sciopero il 14 ottobre: il Trinity College resta chiuso quel giorno. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.tfi.ie/" target="_blank" rel="noopener">tfi.ie</a> e <a href="https://www.irishrail.ie/" target="_blank" rel="noopener">irishrail.ie</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="372" cy="24" r="10"/><path d="M0 106 V92 Q60 72 120 84 Q200 98 260 80 Q330 62 400 88 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M10 106 L13 22 H17 L20 106 Z M24 106 L27 14 H31 L34 106 Z M12 22 H18 V18 H12 Z M26 14 H32 V10 H26 Z"/></g>'+
'<g style="--k:2"><path d="M62 106 V66 H130 V106 Z M62 66 V58 H72 V66 Z M90 66 V40 H112 V66 Z M88 40 L101 20 L114 40 Z M100 20 V10 H102 V20 Z M118 66 V54 H130 V66 Z"/></g>'+
'<g style="--k:3"><path d="M160 98 Q200 50 240 98 V102 H233 Q200 64 167 102 H160 Z M158 98 H242 V102 H158 Z M176 98 V84 H179 V98 Z M199 82 V68 H202 V82 Z M222 98 V84 H225 V98 Z"/></g>'+
'<g style="--k:4"><path d="M252 106 L255.2 4 H256.8 L260 106 Z M248 106 V101 H264 V106 Z"/></g>'+
'<g style="--k:5"><path d="M282 106 V62 H326 V106 Z M288 62 V52 H320 V62 Z M296 52 V44 H312 V52 Z M338 106 V30 H346 V106 Z M336 30 H348 V26 H336 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M72 78 v16 M82 78 v16 M118 78 v16 M126 78 v16"/><path d="M290 72 h30 M290 82 h30 M290 92 h30"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="46" cy="14" r="1.6"/><circle cx="140" cy="12" r="1.3"/><circle cx="206" cy="22" r="1.3"/><circle cx="296" cy="14" r="1.3"/><circle cx="386" cy="50" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.dublino);

;var n=window.CITIES["dublino"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["dublino"]);
