/* ===== Cracovia (dati verificati il 12 ottobre 2026; 1 € ≈ 4,38 zł, cambio del 11 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.cracovia=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var RV=function(a){return a.slice().reverse()};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
KRK:{n:"Cracovia Balice (KRK)",s:"Kraków John Paul II",url:"https://www.krakowairport.pl/en",live:"Cracovia",inMin:50,buf:120,pos:[50.0777,19.7848],sd:"Aeroporto KRK · treno SKA",rt:"Dall'aeroporto: treno SKA fino a Kraków Główny, poi circa 15 minuti a piedi fino al Rynek.",
 arr:"Dall'Italia si entra in Polonia senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «Pociągi / Trains»: la stazione Kraków Lotnisko è collegata al terminal da un passaggio sopraelevato. I treni SKA1 della società Koleje Małopolskie arrivano alla stazione centrale (Kraków Główny) in circa 17–20 minuti, di solito ogni 30 minuti. Dalla stazione al Rynek, la piazza principale, sono circa 15 minuti a piedi attraverso il parco dei Planty e la Porta Floriana. In tutto sono circa 50 minuti.",
 tk:"Biglietto: il treno costa circa 20 zł (circa 4,60 €) a tratta secondo una fonte dell'agosto 2025: prezzo da controllare su kolejemalopolskie.com.pl. Meglio comprarlo alla macchinetta della stazione o con l'app per evitare la fila. In alternativa il bus 300 usa il biglietto urbano da 60 minuti (8 zł, circa 1,85 €), ma ferma al Museo Nazionale e a Osiedle Podwawelskie, non alla stazione. Dopo le 23 c'è il bus notturno 902 per la stazione.",
 gm:"Kraków Airport railway station, Balice",
 tips:["I treni sono circa ogni 30 minuti: controlla l'orario dell'ultimo treno prima di prenotare un volo tardi la sera, e guarda gli avvisi su kolejemalopolskie.com.pl per eventuali lavori sulla linea.","Il taxi per il centro impiega 25–30 minuti e costa circa 50–110 zł (circa 11–25 €) secondo fonti diverse: usa un'app (Bolt, Uber) o un taxi ufficiale, mai chi ti avvicina nell'atrio.","Il bus 300 è l'alternativa quando non c'è un treno: parte davanti al terminal ogni 15–30 minuti, ma va verso il quartiere di Podwawelskie e non alla stazione centrale."]}
};
/* linee (tracciati indicativi) */
var SEG={
ska:{c:"#1a5fa8",n:"Treno SKA dall'aeroporto",p:[[50.0777,19.7848,"Aeroporto",2],[50.0683,19.9475,"Kraków Główny",2]]}
};
var START=[50.0617,19.9373];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
rynek:{t:"Rynek Główny e Basilica di Santa Maria",z:"A",p:1,min:60,id:90,max:140,pos:[50.0617,19.9373],q:"Rynek Główny, Kraków",cls:"walk",sun:1,tk:[4.6,"Basilica di Santa Maria (20 zł)"],
 d:"Una delle più grandi piazze medievali d'Europa, con il mercato coperto delle Sukiennice al centro, la torre del Municipio e la chiesa di Santa Maria dalle due torri diverse. Ogni ora un trombettiere suona il «hejnał» dalla torre più alta e si ferma di colpo a metà melodia.",
 m:"La piazza è gratis e sempre aperta. La Basilica di Santa Maria si visita con un biglietto da 20 zł (circa 4,60 €; ridotto 10 zł): lunedì–sabato dalle 11:30 alle 18, domenica e festivi dalle 14 alle 18 (sito mariacki.com). Il grande altare di legno di Veit Stoss si apre di solito alle 11:50 (alle 14:10 la domenica). Si entra dal lato sud, non dal portone sulla piazza, e durante le funzioni la visita si ferma. La salita sulla torre è stagionale e si paga a parte (circa 20 zł, solo in giornata sul posto): controlla mariacki.com. Il mercatino di Natale in piazza apre di solito alla fine di novembre (date 2026 da controllare)."},
sukiennice:{t:"Sukiennice: la Galleria d'arte polacca dell'Ottocento",z:"A",p:3,min:45,id:60,max:100,pos:[50.0617,19.9373],q:"Sukiennice, Kraków",cls:"",cl:[0],sun:1,tk:[8,"Galleria delle Sukiennice (35 zł)"],
 win:function(){return[10*60,18*60]},
 d:"Il mercato coperto rinascimentale al centro della piazza: al piano terra i banchi di ambra, lino e souvenir, al primo piano la galleria del Museo Nazionale con la pittura polacca dell'Ottocento e le grandi tele storiche di Jan Matejko.",
 m:"Museo Nazionale (MNK): aperto martedì–domenica dalle 10 alle 18, chiuso il lunedì; ultimo ingresso 20 minuti prima della chiusura. Biglietto 35 zł (ridotto 25 zł, circa 8 €); 1 zł per i giovani da 7 a 26 anni (sito mnk.pl). Il sito segnalava chiusura anticipata alle 12 il 9 ottobre 2026 e l'ascensore fuori servizio. Nessun avviso di restauro per il 2026–2027 sulla pagina letta."},
sotterr:{t:"Rynek Underground: il museo sotto la piazza",z:"A",p:2,min:60,id:75,max:100,pos:[50.0620,19.9375],q:"Rynek Underground, Kraków",cls:"",sun:1,tk:[10.3,"Rynek Underground (45 zł)",1,1],
 win:function(wd){return[10*60,[19,15,19,19,20,20,20][wd]*60]},
 d:"Un museo sotto il livello della piazza: si cammina sopra gli scavi del mercato medievale, tra botteghe ricostruite, tombe e schermi che raccontano la vita della città nel Medioevo.",
 m:"Orari: lunedì 10–19, martedì 10–15, mercoledì e giovedì 10–19, venerdì–domenica 10–20; ultimo ingresso 75 minuti prima della chiusura. Chiuso il secondo lunedì del mese. Biglietto 45 zł (ridotto 35 zł, circa 10 €), online su bilety.mhk.pl; il martedì l'ingresso è gratuito, ma i biglietti si ritirano solo in cassa e sono limitati (massimo 5 a persona). Il sito del Museo di Cracovia indica chiusure il 12 ottobre, il 1°, 9, 11, 16, 17 e 18 novembre e il 24 e 25 dicembre (anche il 14: novembre o dicembre, controlla); gli anni non sono scritti, ma le date coincidono con il 2026."},
wawel:{t:"Castello e Cattedrale del Wawel",z:"B",p:1,min:150,id:210,max:300,pos:[50.0541,19.9352],q:"Wawel Royal Castle, Kraków",cls:"",sun:1,tk:[27.6,"Wawel: Castello piani 1 e 2 (95 zł) e Cattedrale (26 zł)",1,1],
 win:function(wd){return wd===0?[10*60,16*60]:[9*60,17*60]},
 d:"La collina sul fiume Vistola con il castello dei re di Polonia e la cattedrale dove sono sepolti re ed eroi nazionali. Dentro ci sono gli appartamenti reali, il Tesoro della Corona, le sale con gli arazzi e la campana Sigismondo. Sotto la collina c'è la statua del drago, legato alla leggenda più famosa di Cracovia.",
 m:"Il cortile e la collina si visitano gratis. Castello (sito wawel.krakow.pl, biglietti con orario d'ingresso): piani 1 e 2 con audioguida 95 zł (circa 21,70 €; ridotto 71 zł), un solo piano 57 zł, Tesoro della Corona o Armeria 47 zł ciascuno. Aperto martedì–domenica 9–17; il lunedì apre 10–16 solo con ingressi gratuiti a numero chiuso. La Cattedrale, la campana Sigismondo e i sarcofagi reali costano 26 zł (ridotto 18 zł, circa 5,90 €): lunedì–sabato 9–16:30, domenica 12:30–16:30, e si chiude durante le messe (katedra-wawelska.pl). La Tana del Drago è aperta solo fino al 31 ottobre (15 zł). Il 1° novembre il castello è chiuso. Biglietti online fino a un mese prima su bilety.wawel.krakow.pl."},
planty:{t:"Porta Floriana, Barbacane e Planty",z:"A",p:3,min:40,id:60,max:90,pos:[50.0653,19.9417],q:"Brama Floriańska, Kraków",cls:"walk",sun:1,tk:[5,"Barbacane e mura (22 zł)"],
 d:"Le mura medievali di Cracovia: la Porta Floriana con la sua torre, il Barbacane rotondo con le torrette e, tutto intorno al centro storico, il parco ad anello dei Planty, al posto dell'antico fossato. Dalla porta parte la via Floriańska, che porta dritta al Rynek.",
 m:"Il passaggio e i Planty sono gratis. Il Barbacane e le mura difensive (Museo di Cracovia) sono aperti martedì–domenica dalle 10 alle 16, chiusi il lunedì; biglietto 22 zł (circa 5 €). Le sale interne sono tra le più piccole della città: bastano 20 minuti."},
czart:{t:"Museo Czartoryski e la Dama con l'ermellino",z:"A",p:3,min:60,id:80,max:120,pos:[50.0655,19.9398],q:"Czartoryski Museum, Kraków",cls:"",cl:[0],sun:1,tk:[14.8,"Museo Czartoryski (65 zł)",1,1],
 win:function(){return[10*60,18*60]},
 d:"Il museo custodisce la «Dama con l'ermellino» di Leonardo da Vinci, l'unico suo dipinto in Polonia, e il «Paesaggio con il buon samaritano» di Rembrandt, insieme ad armi, ceramiche e oggetti raccolti dalla famiglia dei principi Czartoryski.",
 m:"Via Pijarska 15. Aperto martedì–domenica dalle 10 alle 18, chiuso il lunedì; ultimo ingresso un'ora prima della chiusura. Biglietto 65 zł (ridotto 50 zł, circa 14,80 €; 1 zł per i giovani da 7 a 26 anni) con data e orario, online su bilety.mnk.pl. Il martedì l'ingresso alle collezioni permanenti è gratuito, con biglietti limitati ritirati in cassa. Audioguida 15 zł. Nessun avviso di chiusura per restauro sulla pagina letta."},
kazimierz:{t:"Kazimierz: il quartiere ebraico",z:"C",p:1,min:90,id:120,max:180,pos:[50.0514,19.9466],q:"Szeroka, Kraków",cls:"",sun:1,tk:[5,"Vecchia Sinagoga (22 zł; gratis il lunedì)"],
 d:"L'antico quartiere ebraico di Cracovia, oggi pieno di caffè, locali e murales. Intorno alla via Szeroka ci sono la Vecchia Sinagoga, una delle più antiche della Polonia, che ospita il museo della storia degli ebrei di Cracovia, e il piccolo cimitero accanto alla sinagoga Remuh. A Plac Nowy c'è la rotonda delle «zapiekanki», le baguette tostate.",
 m:"Le strade si percorrono gratis. Vecchia Sinagoga (Szeroka 24, Museo di Cracovia): lunedì 10–15 con ingresso gratuito, martedì–domenica 9–17; ultimo ingresso 30 minuti prima della chiusura. Biglietto 22 zł (ridotto 16 zł, circa 5 €). Chiusa l'8 ottobre, il 1°, 11 e 12 novembre, il 10, 24, 25 e 31 dicembre e nelle feste ebraiche (date dal sito muzeumkrakowa.pl, senza anno). Le sinagoghe ancora in uso, come la Remuh, hanno orari e prezzi propri che non ho verificato: sono chiuse ai visitatori durante le funzioni e di solito il sabato, controlla prima. Il tono è di rispetto: voce bassa, spalle e ginocchia coperte dentro i luoghi di culto."},
schindler:{t:"Fabbrica di Schindler e Podgórze",z:"D",p:2,min:90,id:120,max:150,pos:[50.0476,19.9618],q:"Oskar Schindler's Enamel Factory, Kraków",cls:"",sun:1,tk:[13.7,"Fabbrica di Schindler (60 zł)",1,1],
 win:function(wd){return wd===0?[10*60,15*60]:[9*60,20*60]},
 d:"L'ex fabbrica di smalti di Oskar Schindler, oggi museo sulla Cracovia occupata dai nazisti (1939–1945): la vita sotto l'occupazione, il ghetto e la deportazione, ricostruiti con stanze, foto e voci dei testimoni. Non è il racconto del film: è un percorso serio su una città e sui suoi abitanti, ebrei e polacchi.",
 m:"Via Lipowa 4. Aperto lunedì 10–15 (ingresso gratuito, solo biglietti in cassa e limitati) e martedì–domenica 9–20; ultimo ingresso un'ora e mezza prima della chiusura. Chiuso il primo martedì del mese (3 novembre e 1° dicembre), il 1° e l'11 novembre e il 24 e 25 dicembre; il 18 dicembre chiude alle 14, il 26 apre 10–18, il 31 apre 10–15. Biglietto 60 zł (ridotto 45 zł, circa 13,70 €): si compra online fino a 90 giorni prima (vendita chiusa 6 ore prima della visita), con documento d'identità se il biglietto è nominativo. In cassa si vendono solo biglietti per il primo orario libero della giornata. Il sito non indica un'età minima: valuta con cura se portare bambini piccoli."},
ghetto:{t:"Piazza degli Eroi del Ghetto e Farmacia Sotto l'Aquila",z:"D",p:4,min:30,id:45,max:70,pos:[50.0471,19.9527],q:"Plac Bohaterów Getta, Kraków",cls:"walk",multi:1,cl:[],sun:1,tk:[5,"Farmacia Sotto l'Aquila (22 zł)"],
 d:"La piazza dove, dal 1941 al 1943, si trovava il cuore del ghetto ebraico. Oggi è un luogo di memoria con decine di grandi sedie di metallo vuote, in ricordo degli abitanti deportati. Sul lato c'è la Farmacia Sotto l'Aquila, dove il farmacista Tadeusz Pankiewicz aiutò gli abitanti del ghetto.",
 m:"La piazza è sempre accessibile e gratuita: è un luogo di raccoglimento, comportati con rispetto. La Farmacia Sotto l'Aquila (Plac Bohaterów Getta 18, Museo di Cracovia) è aperta mercoledì–domenica dalle 9 alle 17, chiusa lunedì e martedì; biglietto 22 zł (circa 5 €), gratis il mercoledì. Chiusa il 1° e l'11 novembre e il 24, 25, 26 e 31 dicembre."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
var L_W=[[50.0617,19.9373],[50.0610,19.9382],[50.0595,19.9387],[50.0572,19.9378],[50.0553,19.9365],[50.0541,19.9352]];
var L_K=[[50.0617,19.9373],[50.0590,19.9395],[50.0555,19.9425],[50.0527,19.9448],[50.0514,19.9466]];
var L_S=[[50.0617,19.9373],[50.0590,19.9395],[50.0555,19.9425],[50.0514,19.9466],[50.0497,19.9448],[50.0486,19.9462],[50.0477,19.9500],[50.0474,19.9575],[50.0476,19.9618]];
var L_G=[[50.0617,19.9373],[50.0590,19.9395],[50.0555,19.9425],[50.0514,19.9466],[50.0497,19.9448],[50.0486,19.9462],[50.0477,19.9500],[50.0471,19.9527]];
var L_C=[[50.0617,19.9373],[50.0635,19.9385],[50.0650,19.9392],[50.0655,19.9398]];
var L_P=[[50.0617,19.9373],[50.0635,19.9395],[50.0653,19.9417]];
var L_WK=[[50.0541,19.9352],[50.0534,19.9390],[50.0527,19.9425],[50.0518,19.9448],[50.0514,19.9466]];
var L_KG=[[50.0514,19.9466],[50.0497,19.9448],[50.0486,19.9462],[50.0477,19.9500],[50.0471,19.9527]];
var L_GS=[[50.0471,19.9527],[50.0474,19.9575],[50.0476,19.9618]];
var L_KS=[[50.0514,19.9466],[50.0497,19.9448],[50.0486,19.9462],[50.0477,19.9500],[50.0474,19.9575],[50.0476,19.9618]];
var L_CP=[[50.0655,19.9398],[50.0653,19.9417]];
P2("start","wawel",13,"walk","A piedi lungo la via Grodzka, la strada che scende dal Rynek, fino alla collina del Wawel, circa 13 minuti.","A piedi lungo la via Grodzka dal Wawel fino al Rynek, circa 13 minuti.",{f:[W(L_W)],r:[W(RV(L_W))]});
P2("start","kazimierz",20,"walk","A piedi per la via Grodzka e Stradomska, poi per la Dietla, fino alla via Szeroka a Kazimierz, circa 20 minuti.","A piedi dalla via Szeroka fino al Rynek, circa 20 minuti.",{f:[W(L_K)],r:[W(RV(L_K))]});
P2("start","schindler",32,"walk","A piedi attraverso Kazimierz e la passerella pedonale sulla Vistola fino a Podgórze e alla via Lipowa, circa 32 minuti; in alternativa il tram (controlla la linea sull'app Jakdojade).","A piedi fino a Kazimierz e di lì al Rynek, circa 32 minuti, oppure in tram.",{f:[W(L_S)],r:[W(RV(L_S))]});
P2("start","ghetto",28,"walk","A piedi attraverso Kazimierz e la passerella sulla Vistola fino a Plac Bohaterów Getta, circa 28 minuti.","A piedi fino a Kazimierz e al Rynek, circa 28 minuti.",{f:[W(L_G)],r:[W(RV(L_G))]});
P2("start","czart",8,"walk","A piedi per la via Floriańska e la Pijarska fino al Museo Czartoryski, circa 8 minuti.","A piedi per la Pijarska e la via Floriańska fino al Rynek, circa 8 minuti.",{f:[W(L_C)],r:[W(RV(L_C))]});
P2("start","planty",7,"walk","A piedi per la via Floriańska, la strada con i negozi, fino alla Porta Floriana, circa 7 minuti.","A piedi per la via Floriańska dalla Porta Floriana fino al Rynek, circa 7 minuti.",{f:[W(L_P)],r:[W(RV(L_P))]});
P2("rynek","wawel",13,"walk","A piedi lungo la via Grodzka fino alla collina del Wawel, circa 13 minuti.","A piedi lungo la via Grodzka dal Wawel fino al Rynek, circa 13 minuti.",{f:[W(L_W)],r:[W(RV(L_W))]});
P2("rynek","kazimierz",20,"walk","A piedi per la Grodzka, la Stradomska e la Dietla fino alla via Szeroka, circa 20 minuti.","A piedi dalla via Szeroka fino al Rynek, circa 20 minuti.",{f:[W(L_K)],r:[W(RV(L_K))]});
P2("rynek","czart",8,"walk","A piedi per la via Floriańska e la Pijarska fino al Museo Czartoryski, circa 8 minuti.","A piedi dal museo fino al Rynek, circa 8 minuti.",{f:[W(L_C)],r:[W(RV(L_C))]});
P2("rynek","planty",7,"walk","A piedi per la via Floriańska fino alla Porta Floriana, circa 7 minuti.","A piedi per la via Floriańska fino al Rynek, circa 7 minuti.",{f:[W(L_P)],r:[W(RV(L_P))]});
P2("czart","planty",3,"walk","A piedi lungo la Pijarska fino alla Porta Floriana e al Barbacane, circa 3 minuti.","A piedi lungo la Pijarska fino al Museo Czartoryski, circa 3 minuti.",{f:[W(L_CP)],r:[W(RV(L_CP))]});
P2("wawel","kazimierz",15,"walk","A piedi per la via Stradomska e la Dietla fino alla via Szeroka, circa 15 minuti.","A piedi lungo la Dietla e la Stradomska fino al Wawel, circa 15 minuti.",{f:[W(L_WK)],r:[W(RV(L_WK))]});
P2("kazimierz","ghetto",17,"walk","A piedi per Plac Wolnica e la passerella pedonale sulla Vistola fino a Plac Bohaterów Getta, circa 17 minuti.","A piedi per la passerella sulla Vistola e Plac Wolnica fino a Kazimierz, circa 17 minuti.",{f:[W(L_KG)],r:[W(RV(L_KG))]});
P2("ghetto","schindler",10,"walk","A piedi per la via Lwowska fino alla Fabbrica di Schindler, circa 10 minuti.","A piedi fino a Plac Bohaterów Getta, circa 10 minuti.",{f:[W(L_GS)],r:[W(RV(L_GS))]});
P2("kazimierz","schindler",22,"walk","A piedi per Plac Wolnica e la passerella sulla Vistola fino alla via Lipowa, circa 22 minuti.","A piedi fino a Plac Wolnica e a Kazimierz, circa 22 minuti.",{f:[W(L_KS)],r:[W(RV(L_KS))]});
/* ritorno in aeroporto: a piedi fino alla stazione centrale e treno SKA */
var RET={
KRK:{
 A:{min:45,txt:"A piedi dal Rynek fino alla stazione Kraków Główny, passando per la via Floriańska e il parco dei Planty (circa 15 minuti), poi il treno SKA per Kraków Lotnisko (circa 18 minuti, di solito ogni 30 minuti). Biglietto del treno circa 20 zł (circa 4,60 €), da controllare su kolejemalopolskie.com.pl. In alternativa il bus 300 dal centro (biglietto urbano da 60 minuti, 8 zł).",g:[W([[50.0617,19.9373],[50.0635,19.9395],[50.0652,19.9417],[50.0665,19.9440],[50.0683,19.9475]]),["ska","Kraków Główny","Aeroporto"]]}}
};
var ARR={
KRK:[["ska","Aeroporto","Kraków Główny"],W([[50.0683,19.9475],[50.0665,19.9440],[50.0652,19.9417],[50.0635,19.9395],[50.0617,19.9373]])]
};
/* locali: h = orari lun→dom; "" = chiuso. Indirizzi, orari, prezzi e voti NON sono stati letti sui siti dei locali (ricerca non riuscita): da confermare */
var V={
jama:{n:"Jama Michalika",a:"Floriańska 45",z:"A",r:"4,3",pos:[50.0643,19.9408],h:D7("09:00-22:00"),
 d:"Un caffè storico del 1895 vicino alla Porta Floriana, con sale in stile Liberty piene di quadri e decorazioni, famoso per i suoi dolci e per il cabaret degli artisti di inizio Novecento. È un posto da colazione o da fetta di torta, non da pasto veloce.",pr:"Un caffè con una torta costa di solito 35–50 zł (8–11 €) e un piatto del giorno 45–70 zł (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
endzior:{n:"Endzior (zapiekanki di Plac Nowy)",a:"Plac Nowy 1",z:"C",r:"4,4",pos:[50.0514,19.9443],h:D7("10:00-22:00"),
 d:"Uno dei chioschi della rotonda di Plac Nowy, a Kazimierz, dove si mangia la «zapiekanka»: mezza baguette tostata con funghi, formaggio e salse. È lo street food più tipico della città, da mangiare in piedi.",pr:"Una zapiekanka costa di solito 15–25 zł (3,50–6 €) (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
hawelka:{n:"Hawełka",a:"Rynek Główny 34",z:"A",r:"4,3",pos:[50.0612,19.9371],h:D7("12:00-22:00"),
 d:"Un ristorante storico sulla piazza principale, aperto dall'Ottocento, con cucina polacca tradizionale: zuppe, pierogi, cotolette e stufati. È uno dei pochi locali sul Rynek che non vive solo di turisti, ma resta il più caro della lista.",pr:"Un piatto principale costa di solito 55–90 zł (12,50–20 €) (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
starka:{n:"Starka",a:"Józefa 14",z:"C",r:"4,5",pos:[50.0510,19.9450],h:D7("12:00-22:00"),
 d:"Un ristorante di cucina polacca nel cuore di Kazimierz, con piatti da casa come i pierogi, il bigos, la cotoletta e la zuppa di segale, e la vodka invecchiata che gli dà il nome. Sala calda e ambiente rilassato.",pr:"Un piatto principale costa di solito 45–75 zł (10–17 €) (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
hevre:{n:"Hevre",a:"Meiselsa 18",z:"C",r:"4,3",pos:[50.0510,19.9437],h:D7("12:00-22:00"),
 d:"Un locale ricavato in un'ex sala di preghiera ebraica, in una strada tranquilla di Kazimierz: pareti dipinte, soffitto a volta e una carta con piatti polacchi e mediterranei. Va bene per una cena senza fretta.",pr:"Un piatto principale costa di solito 45–75 zł (10–17 €) (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
mleczarnia:{n:"Mleczarnia",a:"Meiselsa 20",z:"C",r:"4,5",pos:[50.0511,19.9435],h:D7("10:00-22:00"),
 d:"Un caffè-trattoria nel quartiere ebraico, con un cortile all'aperto e un'atmosfera da casa vecchia: colazioni, torte, zuppe e piatti polacchi semplici. È un posto buono a ogni ora, ma al sole del cortile si sta meglio da primavera a ottobre.",pr:"Una colazione o una zuppa con il pane costa di solito 25–45 zł (6–10 €) (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
camelot:{n:"Café Camelot",a:"Świętego Tomasza 17",z:"A",r:"4,4",pos:[50.0627,19.9408],h:D7("09:00-21:00"),
 d:"Un caffè storico a due passi dal Rynek, con sale a volta, legno scuro e candele: colazioni polacche, torte fatte in casa e tè. Si sta bene anche da soli, con un libro.",pr:"Un caffè con una torta costa di solito 30–45 zł (7–10 €) (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
aniolami:{n:"Pod Aniołami",a:"Grodzka 35",z:"B",r:"4,5",pos:[50.0580,19.9381],h:D7("12:00-22:00"),
 d:"Un ristorante nelle cantine medievali della via Grodzka, a metà strada tra il Rynek e il Wawel: cucina polacca di impronta antica, con carni alla griglia, anatra e zuppe, in sale a volta di pietra.",pr:"Un piatto principale costa di solito 60–100 zł (14–23 €), è tra i più cari della lista (stima, listino non visto). Indirizzo e orari non verificati: da confermare."},
bunkier:{n:"Café Bunkier",a:"Plac Szczepański 3a",z:"A",r:"4,4",pos:[50.0629,19.9356],h:D7("09:00-21:00"),
 d:"Un caffè con terrazza dentro il Bunkier Sztuki, la galleria d'arte moderna sul bordo del parco dei Planty, a pochi passi dal Rynek: colazioni, panini, torte e un angolo tranquillo per riposare.",pr:"Un caffè con una torta costa di solito 30–45 zł (7–10 €) (stima, listino non visto). Indirizzo e orari non verificati: da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["jama","camelot","bunkier"],B:["camelot","jama"],C:["mleczarnia","camelot"],D:["mleczarnia","jama"]},
pra:{A:["hawelka","endzior","camelot"],B:["aniolami","hawelka"],C:["endzior","mleczarnia","starka"],D:["endzior","starka","mleczarnia"]},
cen:{A:["hawelka","starka","aniolami"],B:["aniolami","hawelka"],C:["starka","hevre","mleczarnia"],D:["starka","hevre","aniolami"]},
snk:{A:["jama","endzior","bunkier"],B:["jama","camelot"],C:["endzior","mleczarnia"],D:["endzior","jama"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Rynek, Basilica e Museo sotterraneo",acts:["rynek","sotterr"],need:180,core:1},
{id:"wawel",t:"Castello e Cattedrale del Wawel",acts:["wawel"],need:230,core:1},
{id:"kaz",t:"Kazimierz, Podgórze e Fabbrica di Schindler",acts:["kazimierz","ghetto","schindler"],need:330,core:1},
{id:"arte",t:"Sukiennice, Museo Czartoryski e Planty",acts:["planty","czart","sukiennice"],need:200,cl:[0]}
];
var ORDER=["rynek","wawel","kazimierz","schindler","sotterr","sukiennice","czart","planty","ghetto"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["stare","Stare Miasto (Città Vecchia)",[50.0617,19.9373],"A"],
["wawel","Wawel e via Grodzka",[50.0570,19.9370],"B"],
["kaz","Kazimierz",[50.0514,19.9444],"C"],
["pod","Podgórze / Zabłocie",[50.0470,19.9530],"D"],
["staz","Stazione e Galeria Krakowska",[50.0683,19.9475],"A"],
["altro","Altra zona (scrivi l'indirizzo)",[50.0617,19.9373],""]
];
/* tassa di soggiorno: a Cracovia non c'è (verificato nel comunicato del Comune del 26 maggio 2026) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Śniadanie","la colazione polacca: pane con burro, prosciutto, formaggio e uova, con tè o caffè."],["Obwarzanek krakowski","anello di pane intrecciato con sesamo o semi di papavero, venduto nei chioschi: lo spuntino tipico di Cracovia."],["Sernik","la torta di ricotta, un classico dei caffè."]],
pra:[["Zapiekanka","mezza baguette tostata con funghi e formaggio: la specialità di Plac Nowy."],["Pierogi","ravioli ripieni di patate e ricotta, carne, oppure cavolo e funghi."],["Żurek","zuppa acida di segale servita nel pane, con salsiccia e uovo sodo."],["Barszcz","zuppa di barbabietola, spesso con piccoli ravioli."]],
cen:[["Bigos","stufato di crauti con carni diverse: il piatto tradizionale polacco."],["Kotlet schabowy","cotoletta di maiale impanata con patate e insalata di cavolo."],["Gołąbki","involtini di cavolo ripieni di carne e riso, con salsa di pomodoro."],["Placek ziemniaczany","frittella di patate grattugiate, con gulasch o panna."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Rynek con le Sukiennice","Foto","Il mercato coperto con gli archi e le facciate colorate: la luce migliore è al mattino presto, con la piazza ancora vuota.",[50.0617,19.9373],"Sukiennice, Kraków","rynek"],
["📷","Le due torri di Santa Maria","Foto","La chiesa di mattoni con la torre alta e quella più piccola con la cupola, vista dal lato sud della piazza.",[50.0617,19.9393],"Bazylika Mariacka, Kraków","rynek"],
["📷","La torre del Municipio","Foto","La torre solitaria nel mezzo della piazza, di sera illuminata.",[50.0614,19.9369],"Wieża Ratuszowa, Kraków","rynek"],
["🤳","La grande testa di Eros","Selfie","La scultura di bronzo sdraiata sulla piazza, un ritrovo per gli appuntamenti: è fotografata da tutti.",[50.0617,19.9389],"Eros Bendato, Rynek Główny, Kraków","rynek"],
["📷","Il Sigismondo dal cortile del Wawel","Foto","La cupola dorata della cappella di Sigismondo e le torri della cattedrale dal cortile del castello.",[50.0545,19.9355],"Katedra Wawelska, Kraków","wawel"],
["📷","Il drago del Wawel","Foto","La statua del drago ai piedi della collina, che di solito sputa fuoco a intervalli.",[50.0532,19.9340],"Smok Wawelski, Kraków","wawel"],
["📷","Il Wawel dal fiume","Foto","La collina con il castello vista dalla riva della Vistola, al tramonto.",[50.0525,19.9335],"Bulwary Wiślane Wawel, Kraków","wawel"],
["📷","La Porta Floriana","Foto","La torre gotica della Porta Floriana vista dalla via Floriańska, con il Barbacane rotondo a pochi passi.",[50.0653,19.9417],"Brama Floriańska, Kraków","planty"],
["📷","I Planty in autunno","Foto","Il parco ad anello intorno al centro storico, con i viali di alberi gialli e le panchine.",[50.0640,19.9380],"Planty, Kraków","planty"],
["📷","Plac Nowy","Foto","La rotonda dell'ex mercato, circondata dai chioschi, con le insegne dei locali e la gente in coda.",[50.0514,19.9443],"Plac Nowy, Kraków","kazimierz"],
["📷","La via Szeroka","Foto","La piazza lunga di Kazimierz con la Vecchia Sinagoga sullo sfondo: al mattino è più silenziosa.",[50.0514,19.9466],"Szeroka, Kraków","kazimierz"],
["📷","Le sedie del ghetto","Foto","Le grandi sedie di metallo vuote sulla piazza: scatta con rispetto, non in posa, senza sedersi sulle sedie.",[50.0471,19.9527],"Plac Bohaterów Getta, Kraków","ghetto"],
["📷","L'ingresso della Fabbrica di Schindler","Foto","Il cancello della fabbrica di smalti e la facciata dell'ex palazzo degli uffici, in via Lipowa.",[50.0476,19.9618],"Oskar Schindler's Enamel Factory, Kraków","schindler"],
["📷","Il cortile del Museo Czartoryski","Foto","I palazzi del museo e il vicolo vicino alla Porta Floriana; dentro, in genere, le foto sono vietate o limitate in alcune sale.",[50.0655,19.9398],"Czartoryski Museum, Kraków","czart"]
];
/* avvisi (verificati il 12 ottobre 2026) */
var AVV=[
{from:"2026-10-12",to:"2026-11-18",t:"Musei di Cracovia: giorni di chiusura in autunno",x:"Secondo il sito del Museo di Cracovia il Rynek Underground è chiuso il 12 ottobre e il 1°, 9, 11, 16, 17 e 18 novembre; la Fabbrica di Schindler il 1°, il 3 e l'11 novembre; la Vecchia Sinagoga il 1°, l'11 e il 12 novembre. Le date non riportano l'anno ma coincidono con il 2026: controlla muzeumkrakowa.pl prima di prenotare."},
{from:"2026-10-12",to:"2026-11-30",t:"Wawel: Tana del Drago chiusa da novembre e «Novembre gratuito»",x:"La Tana del Drago è aperta solo fino al 31 ottobre. A novembre il Wawel partecipa a «Novembre gratuito 2026»: alcune sale hanno ingresso gratuito, con biglietto da ritirare alle casse o online (il lunedì, per esempio, il primo piano del castello); quali sale e quando, controlla wawel.krakow.pl. Il 1° novembre il castello è chiuso e l'11 novembre ha orari limitati."},
{from:"2026-10-30",to:"2026-11-11",t:"1° e 11 novembre: feste nazionali",x:"Il 1° novembre (Ognissanti) e l'11 novembre (Festa dell'Indipendenza) sono festivi in Polonia: i negozi sono chiusi e i principali musei chiudono o riducono gli orari (Wawel chiuso il 1°; Fabbrica di Schindler, Rynek Underground e Vecchia Sinagoga chiusi in entrambe le date). Attorno ai cimiteri il 1° novembre c'è molta gente."},
{from:"2026-10-12",to:"2027-01-31",t:"Auschwitz: orari invernali e prenotazione obbligatoria",x:"Il Memoriale di Auschwitz-Birkenau è aperto ogni giorno tranne il 25 dicembre, il 1° gennaio e la domenica di Pasqua. L'ultimo ingresso è alle 17 in ottobre, alle 15 in novembre, alle 14 in dicembre e alle 15 in gennaio (sito auschwitz.org). Per entrare serve una tessera nominativa prenotata online su visit.auschwitz.org, anche per la visita gratuita: non si vende all'ingresso."},
{from:"2026-11-20",to:"2027-01-06",t:"Mercatino di Natale al Rynek",x:"Di solito il mercatino di Natale occupa il Rynek Główny dalla fine di novembre fino a inizio gennaio (date esatte del 2026 da controllare). La piazza è molto più affollata."},
{from:"2026-12-18",to:"2027-01-06",t:"Natale e Capodanno: musei chiusi o con orari ridotti",x:"Il 24 e 25 dicembre (la vigilia è festiva in Polonia dal 2025) le principali sedi del Museo di Cracovia sono chiuse. Il 18 dicembre Vecchia Sinagoga, Fabbrica di Schindler e Rynek Underground chiudono alle 14; il 26 dicembre aprono 10–18 (Vecchia Sinagoga 10–17); il 31 dicembre Schindler e Underground aprono 10–15 e la Vecchia Sinagoga è chiusa; il 1° gennaio tutte le sedi sono chiuse e il 6 gennaio quasi tutte. Auschwitz chiude il 25 dicembre e il 1° gennaio. Date dal sito muzeumkrakowa.pl, senza anno: controlla."},
{from:"2026-10-12",to:"2027-03-31",t:"Smog invernale",x:"Da ottobre a marzo, con il freddo e senza vento, l'aria di Cracovia può peggiorare. Se hai problemi respiratori, controlla ogni mattina l'indice di qualità dell'aria con un'app locale."}
];
/* clima medio di Cracovia (indicativo, massime/minime) */
var CLIM=[[1,-5],[3,-4],[8,0],[15,4],[20,9],[23,13],[25,15],[25,14],[19,10],[14,5],[7,1],[2,-3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Cracovia: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd,P=E.plan,dt=(P&&P.date)||"",dd=dt?+dt.split("-")[2]:0;
var CL={sotterr:["2026-10-12","2026-11-01","2026-11-09","2026-11-11","2026-11-16","2026-11-17","2026-11-18","2026-12-24","2026-12-25"],schindler:["2026-11-01","2026-11-03","2026-11-11","2026-12-01","2026-12-24","2026-12-25"],kazimierz:["2026-11-01","2026-11-11","2026-11-12","2026-12-10","2026-12-24","2026-12-25","2026-12-31"],wawel:["2026-11-01"],ghetto:["2026-11-01","2026-11-11","2026-12-24","2026-12-25","2026-12-26","2026-12-31"]};
if(CL[it.id]&&CL[it.id].indexOf(dt)>=0)meta+=" Attenzione: in questa data il sito del museo la indica come giornata di chiusura: scegli un altro giorno o controlla prima.";
if(it.id==="sotterr"&&WD===0&&dd>=8&&dd<=14)meta+=" Oggi è il secondo lunedì del mese: il Rynek Underground è chiuso.";
if(it.id==="sotterr"&&WD===1)meta+=" Oggi è martedì: il museo chiude alle 15 e l'ingresso è gratuito, ma i biglietti sono limitati e si ritirano solo in cassa.";
if(it.id==="schindler"&&WD===1&&dd>=1&&dd<=7)meta+=" Oggi è il primo martedì del mese: la Fabbrica di Schindler è chiusa.";
if(it.id==="schindler"&&WD===0)meta+=" Oggi è lunedì: la Fabbrica di Schindler apre dalle 10 alle 15 con ingresso gratuito (biglietti solo in cassa e limitati).";
if(it.id==="wawel"&&WD===0)meta+=" Oggi è lunedì: il castello apre dalle 10 alle 16 solo con biglietti gratuiti a numero chiuso, da ritirare alle casse.";
if(it.id==="wawel"&&WD===6)meta+=" Oggi è domenica: la Cattedrale apre solo alle 12:30.";
if(it.id==="kazimierz"&&WD===0)meta+=" Oggi è lunedì: la Vecchia Sinagoga è aperta dalle 10 alle 15 con ingresso gratuito.";
if(it.id==="kazimierz"&&WD===5)meta+=" Oggi è sabato: le sinagoghe ancora in uso, come la Remuh, di solito non ricevono visitatori.";
if(it.id==="rynek"&&WD===6)meta+=" Oggi è domenica: la Basilica di Santa Maria apre ai visitatori solo dalle 14.";
return meta}
Object.assign(C,{id:"cracovia",n:"Cracovia",cn:"Polonia",e:"🐉",flag:"🇵🇱",col:["#c8102e","#e8e8e8","#8c6a3a"],k:"cracovia krakow polonia poland",
TZ:"Europe/Warsaw",LL:[50.0617,19.9373],CC:"pl",QN:"Krakow",BK:"Krakow",ARE:/krak[oó]w|cracovia|cracow|\b3[0-3]-\d{3}\b/i,VER:"12 ottobre 2026",
Z0:"A",LANG:"pl-PL",LANGN:"polacco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"PLN",s:"zł",e:1/4.38},hub:{n:"Rynek Główny",q:"Rynek Główny, Kraków"},
SINGLE:{acts:["rynek","wawel","kazimierz","schindler","sotterr"],ins:[]},
EXCL:[],
DICON:{wawel:"👑",kazimierz:"✡️",schindler:"📖",czart:"🖼️",sukiennice:"🎨",planty:"🌳",rynek:"⛪"},
ZN:{A:"nella Città Vecchia",B:"ai piedi del Wawel",C:"a Kazimierz",D:"a Podgórze"},
NEAR:{col:"caffè",pra:"locale veloce",cen:"locale",snk:"caffè o chiosco"},
SE:{jama:"🍰",endzior:"🥖",hawelka:"🍲",starka:"🍲",hevre:"🍷",mleczarnia:"🍺",camelot:"☕",aniolami:"🍖",bunkier:"☕"},
TR:{one:1.83,cap:4.57,lbl:"Tram e bus (MPK)",
 air:{KRK:{one:4.57,n:"Treno SKA per l'aeroporto (circa 20 zł)"}},
 passes:[
 {n:"Biglietto 24 ore (zona I)",d:1,max:1,p:4.57,note:"Il biglietto 24 ore per la zona I (20 zł, circa 4,60 €) vale su tram e bus della città per 24 ore dalla convalida. Il biglietto per tutte le zone costa 25 zł (circa 5,70 €). Il treno per l'aeroporto si paga a parte."},
 {n:"Biglietto 48 ore",d:2,only:function(T){return T.n===2},p:9.13,note:"Il biglietto 48 ore (40 zł, circa 9,10 €) vale su tram e bus in tutte le zone per 48 ore dalla convalida."},
 {n:"Biglietto 72 ore",d:3,only:function(T){return T.n===3},p:12.56,note:"Il biglietto 72 ore (55 zł, circa 12,60 €) vale su tram e bus in tutte le zone per 72 ore dalla convalida."},
 {n:"Biglietto 7 giorni (zona I)",d:7,only:function(T){return T.n>=5},p:14.84,note:"Il biglietto 7 giorni per la zona I (65 zł, circa 14,85 €) vale per sette giorni su tram e bus della città; per tutte le zone costa 80 zł (circa 18,25 €)."}],
 note:"Prezzi dall'ordinanza del Comune di Cracovia in vigore dal 2 marzo 2026, convertiti a 1 € = 4,38 zł: corsa da 15 minuti 4 zł (circa 0,90 €), da 30 minuti 6 zł (circa 1,35 €), da 60 minuti 8 zł (circa 1,85 €), da 90 minuti 9 zł (circa 2,05 €), 24 ore 20 zł nella zona I e 25 zł in tutte le zone, 48 ore 40 zł, 72 ore 55 zł, 7 giorni 65 zł nella zona I e 80 zł in tutte le zone. Il centro storico si gira a piedi: servono tram o bus soprattutto per Podgórze e per l'aeroporto. Il treno SKA per l'aeroporto è un biglietto a parte, circa 20 zł (da controllare). I biglietti cartacei si convalidano a bordo; la multa senza biglietto è di 400 zł (200 zł se paghi entro 7 giorni)."},
FOOD:{co:[6,"Colazione al caffè"],pr:[8,"Pranzo (zapiekanka, pierogi o zuppa)"],ce:[14,"Cena (cucina polacca)"],sp:[3,"Spuntini e dolci"]},
T:{ride:"In tram o a piedi",move:"quasi tutto a piedi, o in tram",bags:"«Czy mogę zostawić tu bagaże?»",bagsPM:"«Czy mogę zostawić tu bagaże do popołudnia?»",bagsAM:"«Czy mogę zostawić tu bagaże do południa?»",
pra:"Un locale veloce o una zapiekanka",praZ:{A:"Sul Rynek e nelle vie intorno molti ristoranti con i tavoli in piazza sono per turisti e costano di più: per un pasto vero cerca le vie laterali, a nord di Floriańska o verso Kazimierz.",C:"A Kazimierz i locali più vicini a Szeroka sono i più turistici: i posti buoni sono tra Plac Nowy e la via Meiselsa."},
freeLong:"Qualche idea: una sosta in un caffè storico con una fetta di torta, una passeggiata sui Planty o lungo la Vistola ai piedi del Wawel, un riposo all'alloggio, un giro nelle gallerie delle Sukiennice.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata sui Planty.",
remind:"Per il Wawel, la Fabbrica di Schindler e il Museo Czartoryski conviene comprare prima il biglietto online. La domenica quasi tutti i negozi sono chiusi.",
rain1:"Al coperto: Sukiennice, Museo Czartoryski, Rynek Underground, Fabbrica di Schindler e i caffè storici.",
rainM:"Al coperto: Wawel (interni), Sukiennice, Museo Czartoryski, Rynek Underground, Fabbrica di Schindler e caffè storici.",
water:"Riempite la borraccia: l'acqua del rubinetto di Cracovia è considerata potabile (conferma con il tuo alloggio, perché nei palazzi vecchi i tubi interni possono dare sapore). Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Cracovia si pranza di solito tra le 12 e le 15 e si cena dalle 18: molti ristoranti aprono verso le 12 e non chiudono tra i due servizi, ma guarda l'orario accanto a ogni locale.",
night:[["🍺","Una birra polacca in un locale di Kazimierz è il modo di chiudere la giornata; Plac Nowy resta animata fino a tarda sera."],["🕙","Le cucine servono fino alle 22–23. I tram si fermano verso le 23; dopo ci sono i bus e i tram notturni (linee della serie 600)."],["☕","Molti caffè aprono alle 9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è considerata potabile)",
fuso:"Cracovia ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (le prese sono compatibili con quelle italiane, nessun adattatore)",
foodNote:"I pasti sono stime per locali di quartiere e caffè: a Cracovia si mangia con poco, una cena completa con un piatto principale sta intorno ai 12–18 € a persona. Quasi ovunque si paga con la carta; per chioschi e bancarelle conviene avere qualche złoty. Cambio usato: 1 € = 4,38 zł.",
taxNote:"A Cracovia non si paga la tassa di soggiorno: il comunicato del Comune del 26 maggio 2026 spiega che in Polonia non c'è una base di legge per una tassa turistica, che la città chiede da tempo. Il prezzo dell'annuncio è quello che paghi, ma controlla prima di partire: la regola potrebbe cambiare.",
mcrit:"Criteri: caffè storici, trattorie e locali indipendenti, niente catene. Colazione e cena restano sotto i 15–25 € a persona. Indirizzi, orari, prezzi e voti sono stime da guide e dalla conoscenza della città: non sono stati letti sui siti dei locali (ricerca online non riuscita), controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il treno SKA per Kraków Główny impiega circa 18 minuti ed è la via più rapida dall'aeroporto al centro; controlla gli orari su kolejemalopolskie.com.pl.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto del treno per l'aeroporto (circa 20 zł) e biglietto da 60 minuti (8 zł): si comprano alle macchinette o con un'app per i biglietti",function(E){return true}],["wawel","Biglietto per il Castello del Wawel (piani 1 e 2: 95 zł) e per la Cattedrale (26 zł): con orario d'ingresso, online",["wawel"]],["sch","Biglietto per la Fabbrica di Schindler (60 zł): online, con documento",["schindler"]],["czart","Biglietto per il Museo Czartoryski (65 zł): con data e orario, online",["czart"]],["und","Biglietto per il Rynek Underground (45 zł): online",["sotterr"]],["exc","Se vai ad Auschwitz o a Wieliczka: la tessera d'ingresso (Auschwitz: solo su visit.auschwitz.org) o il biglietto vanno prenotati prima",function(E){return !!(E.trip&&E.trip.n>=3)}],["pln","Qualche złoty in contanti per chioschi e bancarelle (la Polonia non usa l'euro)"],["card","Carta d'identità o passaporto in corso di validità"],["app","Un'app di taxi (Bolt, Uber) e un'app per i biglietti dei mezzi"]],
NUM:{2:["dwóch","dvuh"],3:["trzech","tsceh"],4:["czterech","CTE-reh"],5:["pięciu","PIEN-ciu"],6:["sześciu","SCEC-ciu"],7:["siedmiu","SIED-miu"],8:["ośmiu","OS-miu"],9:["dziewięciu","gie-VIEN-ciu"],10:["dziesięciu","gie-SCEN-ciu"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,Math.max(2,N))];var fr=[["Buongiorno / Buonasera","Dzień dobry / Dobry wieczór","gien DO-bri / DO-bri VIE-ciur"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Stolik dla "+(N===1?"jednej osoby":nu[0]+" osób")+", proszę","STO-lik dla "+(N===1?"IED-nei o-SO-bi":nu[1]+" O-sub")+", PRO-sce"],["Un caffè e una fetta di torta, per favore","Kawę i kawałek ciasta, proszę","KA-ve i ka-VA-uek CIA-sta, PRO-sce"],["Acqua del rubinetto, per favore","Wodę z kranu, proszę","VO-de s KRA-nu, PRO-sce"],["Il conto, per favore","Poproszę rachunek","po-PRO-sce ra-HU-nek"],["Posso pagare con la carta?","Czy mogę zapłacić kartą?","ci MO-ge za-PUA-cic KAR-tom"],["Quanto costa?","Ile to kosztuje?","I-le to kosc-TU-ie"],["Dov'è la fermata del tram?","Gdzie jest przystanek tramwajowy?","gdie iest psci-STA-nek tram-va-IO-vi"],["Dov'è la stazione dei treni?","Gdzie jest dworzec kolejowy?","gdie iest DVO-zhets ko-le-IO-vi"]];
if(M)fr=fr.concat([["Ho una prenotazione","Mam rezerwację","mam re-zer-VA-tsie"],["Posso lasciare i bagagli?","Czy mogę zostawić bagaże?","ci MO-ge zo-STA-vic ba-GA-ze"],["A che ora è il check-out?","O której godzinie jest wymeldowanie?","o KTU-rei go-GI-nie iest vi-mel-do-VA-nie"]]);
return fr.concat([["Mi scusi","Przepraszam","psce-PRA-sciam"],["Grazie mille!","Dziękuję bardzo!","gien-KU-ie BAR-dzo"]])},
taxTxt:function(tx){return "A Cracovia non c'è la tassa di soggiorno ("+tx[1].toLowerCase()+"): il prezzo dell'annuncio è quello che paghi. Il Comune ne chiede l'introduzione da tempo, ma al 26 maggio 2026 non esisteva una norma che la permettesse."},
STAYTIPS:["Il centro storico (Stare Miasto) e Kazimierz si girano a piedi; i tram sono utili per Podgórze e per le zone più lontane. I tram si fermano verso le 23; dopo ci sono i bus e i tram notturni della serie 600, con un biglietto urbano."],
ZONES:[
["🚇 Tram, bus e biglietti",["Un solo biglietto vale su tram e bus: la corsa da 60 minuti costa 8 zł (circa 1,85 €), quella da 90 minuti 9 zł e il 24 ore (zona I) 20 zł. Non c'è la metro.","Il biglietto cartaceo va convalidato a bordo, nella macchinetta gialla o blu vicino alla porta. La multa senza biglietto è di 400 zł (200 zł se paghi entro 7 giorni).","Il treno SKA per l'aeroporto è un biglietto a parte (circa 20 zł, da controllare).","Il centro storico è piccolo: dal Rynek al Wawel o a Kazimierz si arriva a piedi in 13–20 minuti."]],
["🏛️ Rynek, Floriańska e Wawel",["Il Rynek è il punto di partenza: da lì la via Floriańska porta in 7 minuti alla Porta Floriana, e la via Grodzka in 13 minuti al Wawel.","Il trombettiere suona il «hejnał» ogni ora dalla torre alta di Santa Maria: si ferma di colpo a metà melodia, in ricordo di una leggenda medievale.","Per il Wawel il biglietto del castello ha un orario d'ingresso: compralo online. La Cattedrale ha un biglietto a parte."],["rynek","sukiennice","wawel","planty"]],
["✡️ Kazimierz e Podgórze",["Kazimierz e Podgórze sono stati il quartiere ebraico e il ghetto della città: oltre ai locali, ci sono luoghi di memoria. Parla piano, non fare foto in posa sui luoghi di dolore.","La passerella pedonale sulla Vistola collega Kazimierz a Podgórze: da Szeroka alla Piazza degli Eroi del Ghetto sono circa 17 minuti a piedi.","Il lunedì la Vecchia Sinagoga e la Fabbrica di Schindler hanno ingresso gratuito a numero chiuso, ma orari ridotti (10–15)."],["kazimierz","ghetto","schindler"]],
["🎨 Musei",["Sukiennice e Museo Czartoryski (Museo Nazionale) sono chiusi il lunedì. Il martedì l'ingresso al Czartoryski è gratuito con biglietto da ritirare in cassa.","Il Rynek Underground ha orari diversi ogni giorno: martedì chiude alle 15; chiuso il secondo lunedì del mese.","Per la «Dama con l'ermellino» di Leonardo da Vinci prenota con data e orario: i biglietti si comprano su bilety.mnk.pl."],["sukiennice","czart","sotterr"]],
["🌅 Un giorno fuori Cracovia: Wieliczka e Auschwitz",["Miniera di sale di Wieliczka: è a circa 14 km. Si va in treno (SKA1 dalla stazione centrale, 20–30 minuti fino a Wieliczka Rynek-Kopalnia). Il percorso turistico dura 2–3 ore, con centinaia di scalini e circa 17–18 °C sotto terra. Prezzi di bassa stagione (1 ottobre–31 dicembre), in lingua straniera: 143 zł intero e 121 zł ridotto (circa 32,65 € e 27,65 €) secondo un articolo del 2026; il sito ufficiale kopalnia.pl indica «da 82 zł»: conferma prima di prenotare. Biglietti online su bilety.kopalnia.pl. Orari: dal sito 8–18, ma d'inverno possono essere più corti, da controllare.","Auschwitz-Birkenau è un luogo di memoria dove furono uccise oltre un milione di persone, in grande maggioranza ebrei. È a circa 70 km da Cracovia: in autobus dalla stazione MDA (via Bosacka 18) ci vogliono circa 1 ora e 40 minuti. Chiedi il biglietto per la fermata «Auschwitz Muzeum».","Per entrare serve una tessera nominativa prenotata online su visit.auschwitz.org: non si compra all'ingresso. Fino alla sera si entra con una guida (circa 3,5 ore, due sedi e navetta inclusi; il prezzo non l'ho letto sul sito ufficiale: circa 25 € secondo una fonte non ufficiale); la visita libera e gratuita, sempre con tessera, comincia dalle 16 in ottobre, dalle 14 in novembre, dalle 13 in dicembre.","Il Museo consiglia la visita dai 14 anni. Vestiti sobri e comodi, silenzio, niente cibo né bevande né candele fuori dai punti consentiti, niente flash né treppiedi; zaini al massimo 35×25×15 cm. Arriva 30 minuti prima per i controlli. Conta una giornata intera: metà della giornata sarà viaggio."]]],
WTIPS:["L'acqua del rubinetto di Cracovia è considerata potabile: puoi chiederla nei locali («Wodę z kranu, proszę») e riempire la borraccia; conferma con il tuo alloggio.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Polonia fa parte dello spazio Schengen, ma non usa l'euro: la moneta è lo złoty (PLN), circa 4,4 zł per 1 € (4,38 zł l'11 ottobre 2026). Le carte funzionano quasi ovunque.","Se uno sportello o il POS propone di pagare in euro invece che in złoty, scegli sempre gli złoty: il cambio proposto è peggiore. Evita i cambiavalute del centro e gli sportelli bancomat non bancari.","Cracovia ha lo stesso fuso orario dell'Italia.","Mancia: si lascia di solito il 10% al tavolo, a voce o arrotondando.","La domenica quasi tutti i negozi sono chiusi (ci sono pochissime domeniche di apertura all'anno); restano aperti ristoranti, caffè e musei. Nei giorni festivi come il 1° novembre, il 24 e il 25 dicembre i negozi sono chiusi.","Per i taxi usa un'app (Bolt, Uber): evita chi ti avvicina in aeroporto o in stazione.","La carta d'identità valida basta per entrare.","Auschwitz e il quartiere del ghetto sono luoghi di memoria: vestiti sobri, voce bassa, nessuna foto in posa.","Controlla orari e prezzi dei locali e dei musei qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (numero unico europeo; in Polonia anche 999 ambulanza e 997 polizia)</li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.mpk.krakow.pl/" target="_blank" rel="noopener">mpk.krakow.pl</a> · biglietti e tariffe: <a href="https://www.ztp.krakow.pl/" target="_blank" rel="noopener">ztp.krakow.pl</a> · treni: <a href="https://www.kolejemalopolskie.com.pl/" target="_blank" rel="noopener">kolejemalopolskie.com.pl</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Varsavia: <a href="https://ambvarsavia.esteri.it" target="_blank" rel="noopener">ambvarsavia.esteri.it</a>, per documenti persi o rubati (cerca sul sito anche il consolato a Cracovia).</li>',
STRK:'Al 12 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Cracovia. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.mpk.krakow.pl/" target="_blank" rel="noopener">mpk.krakow.pl</a> e, per i treni, <a href="https://www.kolejemalopolskie.com.pl/" target="_blank" rel="noopener">kolejemalopolskie.com.pl</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="356" cy="26" r="11"/><path d="M0 106 V92 Q40 76 84 82 Q116 86 134 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M6 106 V66 H72 V106 Z M10 66 V48 H22 V66 Z M8 48 H24 L16 36 Z M42 66 V40 H52 V66 Z M41 40 H53 L47 26 Z M56 66 V54 Q62 42 68 54 V66 Z M61 44 V38 H63 V44 Z"/></g>'+
'<g style="--k:2"><path d="M96 106 V70 H158 V106 Z M98 70 V38 H114 V70 Z M100 38 V30 H112 V38 Z M99 30 H113 L106 10 Z M105 10 V4 H107 V10 Z M130 70 V48 H146 V70 Z M129 48 H147 Q138 30 129 48 Z M137 36 V30 H139 V36 Z"/></g>'+
'<g style="--k:3"><path d="M176 106 V78 H252 V106 Z M174 78 V60 H184 V78 Z M244 78 V60 H254 V78 Z M184 78 V72 H244 V78 Z M190 72 V68 H196 V72 Z M204 72 V68 H210 V72 Z M218 72 V68 H224 V72 Z M232 72 V68 H238 V72 Z"/></g>'+
'<g style="--k:4"><path d="M270 106 V54 H286 V106 Z M268 54 H288 V50 H268 Z M272 50 Q278 34 284 50 Z M277 36 V26 H279 V36 Z"/></g>'+
'<g style="--k:5"><path d="M304 106 V84 H346 V106 Z M306 84 V76 L310 70 L314 76 V84 Z M318 84 V76 L322 70 L326 76 V84 Z M332 84 V76 L336 70 L340 76 V84 Z M356 106 V56 H380 V106 Z M354 56 H382 V52 H354 Z M358 52 V44 L368 34 L378 44 V52 Z M367 34 V24 H369 V34 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M192 98 v8 M208 98 v8 M224 98 v8 M240 98 v8"/><path d="M14 88 h50 M14 96 h50"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="90" cy="22" r="1.3"/><circle cx="170" cy="14" r="1.3"/><circle cx="262" cy="20" r="1.3"/><circle cx="316" cy="10" r="1.3"/><circle cx="392" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.cracovia);
