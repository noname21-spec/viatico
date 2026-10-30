(function(o){
/* ===== Berlino (dati verificati il 10 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.berlino=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
BER:{n:"Berlino Brandenburg (BER)",s:"Berlin Brandenburg Willy Brandt",url:"https://ber.berlin-airport.de/",live:"Berlino",inMin:45,buf:120,pos:[52.3667,13.5033],sd:"Aeroporto BER · treno",rt:"Dall'aeroporto: treno Flughafen-Express (FEX) fino a Berlin Hauptbahnhof.",
 arr:"Dall'Italia si entra in Germania senza controllo passaporti (spazio Schengen). Dopo il ritiro dei bagagli segui i cartelli «Bahn» per la stazione, sotto il terminal. Il Flughafen-Express (FEX) per la Hauptbahnhof, la stazione centrale, parte ogni 15 minuti e ci mette circa 23 minuti; c'è anche un regionale (RE20) ogni ora. Per Alexanderplatz c'è la S-Bahn S9 ogni 20 minuti, circa 40 minuti senza cambi.",
 tk:"Biglietto: serve il biglietto ABC, 5,00 € a corsa (tariffa 2026 dal sito del VBB), valido 2 ore con i cambi. Il biglietto AB da 4 € non basta, perché il BER è nella zona C. Si compra alle macchinette in stazione o con l'app BVG.",
 gm:"Flughafen BER Terminal 1-2 Bahnhof, Schönefeld",
 tips:["Il FEX è il più veloce ma i regionali sulla stessa linea fermano di più: controlla il tabellone prima di salire.","Il taxi per il centro costa di solito oltre 50 € (listino non visto): il treno è più rapido e molto più economico.","Il biglietto ABC è valido anche per cambiare con U-Bahn, tram e bus nelle 2 ore: se vai subito all'alloggio non serve comprarne un altro."]}
};
/* linee (tracciati indicativi) */
var SEG={
fex:{c:"#d7182a",n:"Treno FEX dall'aeroporto",p:[[52.3667,13.5033,"BER",2],[52.5250,13.3694,"Hauptbahnhof",2]]},
u5:{c:"#7e5330",n:"U-Bahn linea U5",p:[[52.5250,13.3694,"Hauptbahnhof",2],[52.5206,13.3735,"Bundestag"],[52.5164,13.3794,"Brandenburger Tor",2],[52.5170,13.3888,"Unter den Linden",2],[52.5178,13.3990,"Museumsinsel",2],[52.5190,13.4082,"Rotes Rathaus"],[52.5219,13.4132,"Alexanderplatz",2]]},
sb:{c:"#0a6ebd",n:"S-Bahn (S5, S7, S9)",p:[[52.5250,13.3694,"Hauptbahnhof",2],[52.5201,13.3871,"Friedrichstraße",2],[52.5226,13.4022,"Hackescher Markt",2],[52.5219,13.4132,"Alexanderplatz",2],[52.5107,13.4346,"Ostbahnhof",2],[52.5058,13.4482,"Warschauer Straße",2]]},
u6:{c:"#8c6dab",n:"U-Bahn linea U6",p:[[52.5201,13.3871,"Friedrichstraße",2],[52.5105,13.3897,"Stadtmitte"],[52.5074,13.3908,"Kochstraße / Checkpoint Charlie",2],[52.4936,13.3880,"Mehringdamm",2]]},
u2:{c:"#e5471e",n:"U-Bahn linea U2",p:[[52.5412,13.4122,"Eberswalder Straße",2],[52.5219,13.4132,"Alexanderplatz",2],[52.5105,13.3897,"Stadtmitte"],[52.5094,13.3764,"Potsdamer Platz",2]]},
u1:{c:"#7dad4c",n:"U-Bahn linea U1",p:[[52.5058,13.4482,"Warschauer Straße",2],[52.5011,13.4417,"Schlesisches Tor"],[52.4991,13.4280,"Görlitzer Bahnhof",2]]},
m10:{c:"#c9a400",n:"Tram M10",p:[[52.5250,13.3694,"Hauptbahnhof",2],[52.5355,13.3904,"Gedenkstätte Berliner Mauer",2],[52.5412,13.4122,"Eberswalder Straße",2]]}
};
var START=[52.5250,13.3694];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
reichstag:{t:"Reichstag, Porta di Brandeburgo e Memoriale dell'Olocausto",z:"A",p:1,min:60,id:90,max:140,pos:[52.5186,13.3762],q:"Reichstag, Berlin",cls:"walk",sun:1,
 d:"Il Parlamento tedesco con la cupola di vetro di Norman Foster, a due passi dalla Porta di Brandeburgo, il simbolo della città: dalla piazza si arriva a piedi anche al Memoriale agli ebrei assassinati d'Europa, il campo di 2.711 stele di cemento.",
 m:"La salita alla cupola è gratuita ma serve la prenotazione sul sito del Bundestag, con nome e data di nascita e il documento originale all'ingresso; senza prenotazione, quando c'è posto, si può chiedere allo sportello vicino al Berlin-Pavillon fino a 2 ore prima. La cupola è chiusa per pulizia dal 19 al 30 ottobre (la terrazza sul tetto resta aperta)."},
linden:{t:"Unter den Linden, Gendarmenmarkt e Humboldt Forum",z:"A",p:2,min:50,id:80,max:120,pos:[52.5139,13.3925],q:"Gendarmenmarkt, Berlin",cls:"walk",sun:1,
 d:"Il grande viale del centro storico: l'Opernplatz con l'Opera di Stato, la Neue Wache, il Duomo francese e il Duomo tedesco ai lati dello Gendarmenmarkt (la piazza più bella di Berlino), fino al castello ricostruito che ospita lo Humboldt Forum.",
 m:"Si cammina gratis. Lo Humboldt Forum ha il cortile e il ristorante aperti a tutti; le mostre sono a pagamento. La piazza dello Gendarmenmarkt è particolarmente suggestiva al tramonto."},
museum:{t:"Isola dei Musei e Duomo",z:"A",p:2,min:100,id:130,max:200,pos:[52.5190,13.3984],q:"Neues Museum, Berlin",cls:"",cl:[0],tk:[14,"Neues Museum con Nefertiti (14 €)",1,1],
 win:function(wd){return[10*60,(wd>=1&&wd<=4)?17*60:18*60]},
 d:"L'isola sulla Sprea con cinque musei patrimonio UNESCO. Il più amato è il Neues Museum con il celebre busto di Nefertiti; poco lontano, sul Lustgarten, c'è il Duomo di Berlino con la cupola panoramica.",
 m:"Neues Museum, Altes Museum e Bode-Museum costano 14 € ciascuno; il biglietto giornaliero dell'isola costa 24 €. Orari: martedì–domenica dalle 10; il Neues Museum chiude alle 18, Altes e Bode alle 17 (martedì–venerdì) e alle 18 (sabato e domenica). Chiusi il lunedì. Il Pergamonmuseum è chiuso per restauro fino al 4 giugno 2027. Duomo: lunedì–giovedì 10–18, venerdì e sabato 10–17, domenica 12–17 (orari dichiarati dal sito: controlla il prezzo)."},
fernseh:{t:"Alexanderplatz e Fernsehturm",z:"A",p:3,min:60,id:90,max:130,pos:[52.5208,13.4094],q:"Berliner Fernsehturm, Berlin",cls:"",sun:1,tk:[20,"Fernsehturm (da 20 €)",1,1],
 win:function(){return[9*60,23*60]},
 d:"La torre della televisione della Germania Est, alta 368 metri, che si vede da quasi ovunque: dalla piattaforma a 203 metri si ha la vista a 360 gradi su tutta Berlino. Ai suoi piedi c'è Alexanderplatz, il cuore dell'ex Berlino Est, con l'Orologio dell'Universo.",
 m:"Aperta ogni giorno dalle 9 alle 23. Il biglietto standard parte da 20 € (prezzo «da» dal sito); prenotare online evita la lunga fila. Il 23 novembre 2026 la torre è chiusa."},
mauer:{t:"Il Muro di Berlino: Bernauer Straße",z:"B",p:2,min:70,id:100,max:150,pos:[52.5352,13.3903],q:"Gedenkstätte Berliner Mauer, Bernauer Straße 111, Berlin",cls:"walk",sun:1,
 d:"Il tratto meglio conservato del confine: la striscia della morte con un pezzo di muro originale, la cappella della Riconciliazione e le mostre all'aperto con le foto degli abitanti che scappavano dalle finestre. La torre del centro di documentazione permette di vedere dall'alto la «striscia».",
 m:"La mostra all'aperto è aperta ogni giorno dalle 8 alle 22 e il centro visitatori e il centro di documentazione sono aperti martedì–domenica 10–18 (ultimo accesso alla torre 17:45), chiusi il lunedì. L'ingresso è gratuito. Chiuso il 24, 25 e 31 dicembre."},
eastside:{t:"East Side Gallery e Oberbaumbrücke",z:"D",p:2,min:60,id:80,max:120,pos:[52.5050,13.4397],q:"East Side Gallery, Mühlenstraße, Berlin",cls:"walk",sun:1,
 d:"1,3 chilometri di Muro originale ridipinti nel 1990 da artisti di tutto il mondo: il murale del bacio tra Breznev e Honecker è il più famoso. Il tratto finisce sull'Oberbaumbrücke, il ponte in mattoni rossi sulla Sprea.",
 m:"Si cammina gratis e senza orari lungo Mühlenstraße. Il tratto vicino all'Ostbahnhof è il più affollato e i murales sono sotto restauro a turni: il lato meno frequentato è quello vicino al ponte."},
potsdamer:{t:"Topografia del Terrore e Potsdamer Platz",z:"F",p:2,min:75,id:110,max:160,pos:[52.5100,13.3790],q:"Topographie des Terrors, Berlin",cls:"",sun:1,
 win:function(){return[10*60,20*60]},
 d:"Un museo gratuito all'aperto e al coperto costruito dove sorgeva la sede della Gestapo e delle SS, accanto a un tratto di Muro originale; poco lontano Potsdamer Platz, il quartiere moderno nato sul vuoto lasciato dal Muro, e il Checkpoint Charlie, molto turistico.",
 m:"La mostra è gratuita. Orari dichiarati dalle guide: ogni giorno 10–20 (la parte all'aperto chiude al tramonto): controlla topographie.de. Il Checkpoint Charlie è una ricostruzione con figuranti a pagamento: meglio guardarlo da fuori."},
kreuz:{t:"Kreuzberg: Markthalle Neun e Bergmannkiez",z:"C",p:4,min:90,id:130,max:200,pos:[52.5020,13.4313],q:"Markthalle Neun, Berlin",cls:"walk",multi:1,sun:1,
 d:"Il quartiere più vario di Berlino, tra murales, botteghe turche e locali alternativi: la Markthalle Neun è un mercato coperto dell'Ottocento con produttori e cucina di strada, l'Oranienstraße è il cuore della vita notturna.",
 m:"Il giovedì dalle 17 alle 22 c'è lo «Street Food Thursday» (la sera più affollata). Mercato piccolo lun–gio 12–18, grande venerdì 12–18 e sabato 10–18."},
prenz:{t:"Prenzlauer Berg e Mauerpark",z:"B",p:4,min:90,id:130,max:200,pos:[52.5405,13.4020],q:"Mauerpark, Berlin",cls:"walk",multi:1,sun:1,
 d:"Il quartiere di palazzi liberty e caffè, con il Mauerpark: un parco che era la striscia di confine, con un tratto di Muro e, la domenica, il mercatino delle pulci e il karaoke all'aperto.",
 m:"Il mercatino delle pulci del Mauerpark è di solito la domenica, circa 10–18 (confermato nelle guide: verifica prima di andare)."},
tiergarten:{t:"Tiergarten e Siegessäule",z:"F",p:5,min:75,id:110,max:150,pos:[52.5145,13.3501],q:"Siegessäule, Berlin",cls:"walk",multi:1,sun:1,
 d:"Il grande parco nel centro, con i vialoni alberati, il laghetto del Neuer See e la Colonna della Vittoria dorata sulla rotatoria. Dalla Colonna si sale per la vista sui viali.",
 m:"Il parco è gratuito e aperto sempre. La salita alla Siegessäule è a pagamento (circa 4 €, non letto sul sito: controlla)."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","reichstag",14,"walk","A piedi lungo la Sprea e il Tiergarten fino al Reichstag, circa 14 minuti.","A piedi dal Reichstag lungo la Sprea fino alla Hauptbahnhof, circa 14 minuti.",{f:[W([[52.5250,13.3694],[52.5222,13.3712],[52.5186,13.3762]])],r:[W([[52.5186,13.3762],[52.5222,13.3712],[52.5250,13.3694]])]});
P2("reichstag","linden",16,"walk","A piedi attraverso la Porta di Brandeburgo e giù per il viale Unter den Linden fino allo Gendarmenmarkt, circa 16 minuti.","A piedi dallo Gendarmenmarkt per Unter den Linden fino al Reichstag, circa 16 minuti.",{f:[W([[52.5186,13.3762],[52.5163,13.3777],[52.5170,13.3888],[52.5139,13.3925]])],r:[W([[52.5139,13.3925],[52.5170,13.3888],[52.5163,13.3777],[52.5186,13.3762]])]});
P2("reichstag","museum",22,"walk","A piedi per la Porta di Brandeburgo e Unter den Linden fino all'Isola dei Musei, circa 22 minuti. In alternativa la U5 da Bundestag fino a Museumsinsel (5 minuti).","A piedi per Unter den Linden fino al Reichstag, circa 22 minuti.",{f:[W([[52.5186,13.3762],[52.5163,13.3777],[52.5170,13.3888],[52.5178,13.3990],[52.5190,13.3984]])],r:[W([[52.5190,13.3984],[52.5178,13.3990],[52.5170,13.3888],[52.5163,13.3777],[52.5186,13.3762]])]});
P2("linden","museum",12,"walk","A piedi per Unter den Linden fino allo Humboldt Forum e all'Isola dei Musei, circa 12 minuti.","A piedi per Unter den Linden fino allo Gendarmenmarkt, circa 12 minuti.",{f:[W([[52.5139,13.3925],[52.5170,13.3960],[52.5190,13.3984]])],r:[W([[52.5190,13.3984],[52.5170,13.3960],[52.5139,13.3925]])]});
P2("museum","fernseh",12,"walk","A piedi lungo la Spandauer Straße fino alla Fernsehturm, circa 12 minuti.","A piedi dalla Fernsehturm fino all'Isola dei Musei, circa 12 minuti.",{f:[W([[52.5190,13.3984],[52.5200,13.4040],[52.5208,13.4094]])],r:[W([[52.5208,13.4094],[52.5200,13.4040],[52.5190,13.3984]])]});
P2("linden","fernseh",22,"walk","A piedi per Unter den Linden e l'Isola dei Musei fino alla Fernsehturm, circa 22 minuti.","A piedi per Unter den Linden fino allo Gendarmenmarkt, circa 22 minuti.",{f:[W([[52.5139,13.3925],[52.5190,13.3984],[52.5208,13.4094]])],r:[W([[52.5208,13.4094],[52.5190,13.3984],[52.5139,13.3925]])]});
P2("start","museum",18,"metro","U5 dalla Hauptbahnhof fino a Museumsinsel (circa 8 minuti), poi 3 minuti a piedi.","U5 da Museumsinsel fino alla Hauptbahnhof (circa 8 minuti).",{f:[["u5","Hauptbahnhof","Museumsinsel"],W([[52.5178,13.3990],[52.5190,13.3984]])],r:[W([[52.5190,13.3984],[52.5178,13.3990]]),["u5","Museumsinsel","Hauptbahnhof"]]});
P2("start","linden",16,"metro","U5 dalla Hauptbahnhof fino a Unter den Linden (circa 6 minuti), poi 6 minuti a piedi fino allo Gendarmenmarkt.","U5 da Unter den Linden fino alla Hauptbahnhof (circa 6 minuti).",{f:[["u5","Hauptbahnhof","Unter den Linden"],W([[52.5170,13.3888],[52.5139,13.3925]])],r:[W([[52.5139,13.3925],[52.5170,13.3888]]),["u5","Unter den Linden","Hauptbahnhof"]]});
P2("start","fernseh",16,"metro","U5 dalla Hauptbahnhof fino ad Alexanderplatz (circa 11 minuti): la torre è lì accanto.","U5 da Alexanderplatz fino alla Hauptbahnhof (circa 11 minuti).",{f:[["u5","Hauptbahnhof","Alexanderplatz"],W([[52.5219,13.4132],[52.5208,13.4094]])],r:[W([[52.5208,13.4094],[52.5219,13.4132]]),["u5","Alexanderplatz","Hauptbahnhof"]]});
P2("start","mauer",16,"tram","Tram M10 dalla Hauptbahnhof fino alla fermata Gedenkstätte Berliner Mauer, circa 10 minuti.","Tram M10 dalla fermata Gedenkstätte Berliner Mauer fino alla Hauptbahnhof, circa 10 minuti.",{f:[["m10","Hauptbahnhof","Gedenkstätte Berliner Mauer"]],r:[["m10","Gedenkstätte Berliner Mauer","Hauptbahnhof"]]});
P2("reichstag","mauer",26,"tram","A piedi fino alla Hauptbahnhof (14 minuti) e tram M10 fino alla fermata Gedenkstätte Berliner Mauer (circa 10 minuti).","Tram M10 dalla fermata Gedenkstätte Berliner Mauer fino alla Hauptbahnhof (10 minuti), poi 14 minuti a piedi fino al Reichstag.",{f:[W([[52.5186,13.3762],[52.5222,13.3712],[52.5250,13.3694]]),["m10","Hauptbahnhof","Gedenkstätte Berliner Mauer"]],r:[["m10","Gedenkstätte Berliner Mauer","Hauptbahnhof"],W([[52.5250,13.3694],[52.5222,13.3712],[52.5186,13.3762]])]});
P2("mauer","prenz",20,"walk","A piedi per Bernauer Straße fino al Mauerpark, circa 20 minuti.","A piedi per Bernauer Straße fino al Muro, circa 20 minuti.",{f:[W([[52.5352,13.3903],[52.5380,13.3980],[52.5405,13.4020]])],r:[W([[52.5405,13.4020],[52.5380,13.3980],[52.5352,13.3903]])]});
P2("start","eastside",28,"metro","S-Bahn dalla Hauptbahnhof fino a Ostbahnhof (circa 14 minuti), poi 8 minuti a piedi fino a Mühlenstraße.","A piedi fino all'Ostbahnhof (8 minuti) e S-Bahn fino alla Hauptbahnhof (circa 14 minuti).",{f:[["sb","Hauptbahnhof","Ostbahnhof"],W([[52.5107,13.4346],[52.5080,13.4390],[52.5050,13.4397]])],r:[W([[52.5050,13.4397],[52.5080,13.4390],[52.5107,13.4346]]),["sb","Ostbahnhof","Hauptbahnhof"]]});
P2("fernseh","eastside",20,"metro","S-Bahn da Alexanderplatz fino a Ostbahnhof (4 minuti), poi 8 minuti a piedi fino a Mühlenstraße.","A piedi fino all'Ostbahnhof (8 minuti) e S-Bahn fino ad Alexanderplatz (4 minuti).",{f:[["sb","Alexanderplatz","Ostbahnhof"],W([[52.5107,13.4346],[52.5080,13.4390],[52.5050,13.4397]])],r:[W([[52.5050,13.4397],[52.5080,13.4390],[52.5107,13.4346]]),["sb","Ostbahnhof","Alexanderplatz"]]});
P2("museum","eastside",26,"metro","A piedi fino ad Alexanderplatz (12 minuti), S-Bahn fino a Ostbahnhof (4 minuti) e 8 minuti a piedi fino a Mühlenstraße.","A piedi fino all'Ostbahnhof, S-Bahn fino ad Alexanderplatz e 12 minuti a piedi fino all'Isola dei Musei, in tutto circa 26 minuti.",{f:[W([[52.5190,13.3984],[52.5219,13.4132]]),["sb","Alexanderplatz","Ostbahnhof"],W([[52.5107,13.4346],[52.5050,13.4397]])],r:[W([[52.5050,13.4397],[52.5107,13.4346]]),["sb","Ostbahnhof","Alexanderplatz"],W([[52.5219,13.4132],[52.5190,13.3984]])]});
P2("eastside","kreuz",16,"metro","A piedi fino a Warschauer Straße (10 minuti), U1 fino a Görlitzer Bahnhof (4 minuti) e 5 minuti a piedi fino alla Markthalle Neun.","U1 da Görlitzer Bahnhof a Warschauer Straße e a piedi fino alla East Side Gallery, circa 16 minuti.",{f:[W([[52.5050,13.4397],[52.5058,13.4482]]),["u1","Warschauer Straße","Görlitzer Bahnhof"],W([[52.4991,13.4280],[52.5020,13.4313]])],r:[W([[52.5020,13.4313],[52.4991,13.4280]]),["u1","Görlitzer Bahnhof","Warschauer Straße"],W([[52.5058,13.4482],[52.5050,13.4397]])]});
P2("start","potsdamer",22,"metro","Bus M85 dalla Hauptbahnhof fino a Potsdamer Platz (circa 12 minuti), poi 5 minuti a piedi. In alternativa 30 minuti a piedi per il Reichstag e il Tiergarten.","Bus M85 da Potsdamer Platz alla Hauptbahnhof (circa 12 minuti).",{f:[W([[52.5250,13.3694],[52.5186,13.3762],[52.5139,13.3787],[52.5100,13.3790]])],r:[W([[52.5100,13.3790],[52.5139,13.3787],[52.5186,13.3762],[52.5250,13.3694]])]});
P2("reichstag","potsdamer",18,"walk","A piedi dalla Porta di Brandeburgo, passando per il Memoriale dell'Olocausto, fino alla Topografia del Terrore, circa 18 minuti.","A piedi dalla Topografia del Terrore, passando per il Memoriale dell'Olocausto, fino al Reichstag, circa 18 minuti.",{f:[W([[52.5186,13.3762],[52.5139,13.3787],[52.5100,13.3790]])],r:[W([[52.5100,13.3790],[52.5139,13.3787],[52.5186,13.3762]])]});
P2("linden","potsdamer",18,"walk","A piedi per Wilhelmstraße e Leipziger Straße fino alla Topografia del Terrore, circa 18 minuti.","A piedi per Leipziger Straße fino allo Gendarmenmarkt, circa 18 minuti.",{f:[W([[52.5139,13.3925],[52.5120,13.3850],[52.5100,13.3790]])],r:[W([[52.5100,13.3790],[52.5120,13.3850],[52.5139,13.3925]])]});
P2("potsdamer","tiergarten",20,"walk","A piedi attraverso il Tiergarten fino alla Colonna della Vittoria, circa 20 minuti.","A piedi attraverso il Tiergarten fino a Potsdamer Platz, circa 20 minuti.",{f:[W([[52.5100,13.3790],[52.5130,13.3650],[52.5145,13.3501]])],r:[W([[52.5145,13.3501],[52.5130,13.3650],[52.5100,13.3790]])]});
P2("reichstag","tiergarten",22,"walk","A piedi lungo il viale 17 Giugno, tra gli alberi del Tiergarten, fino alla Colonna della Vittoria, circa 22 minuti.","A piedi per il viale 17 Giugno fino al Reichstag, circa 22 minuti.",{f:[W([[52.5186,13.3762],[52.5165,13.3600],[52.5145,13.3501]])],r:[W([[52.5145,13.3501],[52.5165,13.3600],[52.5186,13.3762]])]});
P2("start","tiergarten",25,"metro","S-Bahn dalla Hauptbahnhof fino a Bellevue (3 minuti) e 12 minuti a piedi nel Tiergarten fino alla Colonna della Vittoria.","A piedi nel Tiergarten fino a Bellevue (12 minuti) e S-Bahn fino alla Hauptbahnhof (3 minuti).",{f:[W([[52.5250,13.3694],[52.5200,13.3470],[52.5145,13.3501]])],r:[W([[52.5145,13.3501],[52.5200,13.3470],[52.5250,13.3694]])]});
/* ritorno in aeroporto (le altre tappe passano dalla Hauptbahnhof) */
var RET={
BER:{
 A:{min:35,txt:"Dalla Hauptbahnhof il treno Flughafen-Express (FEX) per l'aeroporto parte ogni 15 minuti e impiega circa 23 minuti. Il biglietto ABC da 5,00 € vale con i cambi.",g:[["fex","Hauptbahnhof","BER"]]}}
};
var ARR={
BER:[["fex","BER","Hauptbahnhof"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Verificati sui siti: Konnopke's, Markthalle Neun, Bonanza, Curry 36, Café am Neuen See; gli altri da guide (da confermare) */
var V={
bonanza:{n:"Bonanza Coffee Heroes",a:"Oderberger Straße 35",z:"B",r:"4,6",pos:[52.5416,13.4053],h:["09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","10:00-18:00","10:00-18:00"],
 d:"Una delle torrefazioni di specialità che hanno fatto la fama dei caffè di Berlino: caffè di qualità e dolci da forno in un locale luminoso nel quartiere di Prenzlauer Berg.",pr:"Un caffè con un dolce sta intorno ai 6–9 € (listino non visto). Orari dal sito."},
konnopke:{n:"Konnopke's Imbiss",a:"Schönhauser Allee 44B",z:"B",r:"4,4",pos:[52.5400,13.4125],h:["","11:00-18:00","11:00-18:00","11:00-18:00","11:00-18:00","12:00-19:00",""],
 d:"Il chiosco della currywurst sotto la U-Bahn sopraelevata dal 1930, un'istituzione della ex Berlino Est: la salsiccia con la salsa al curry e le patatine si mangia in piedi sotto la linea gialla della U2.",pr:"Una currywurst con patatine sta di solito intorno ai 6–8 € (listino non visto). Chiuso lunedì e domenica."},
distrikt:{n:"Distrikt Coffee",a:"Bergstraße 68",z:"A",r:"4,5",pos:[52.5342,13.3980],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","09:00-18:00","09:00-18:00"],
 d:"Caffè di specialità e piccola cucina in stile australiano a Mitte, a pochi passi dalla Bernauer Straße: caffè filtrato, toast e dolci per una colazione senza fretta.",pr:"Una colazione con un caffè intorno ai 9–13 € (listino non visto). Orari da confermare."},
vuong:{n:"Monsieur Vuong",a:"Alte Schönhauser Straße 46",z:"A",r:"4,3",pos:[52.5265,13.4067],h:D7("12:00-23:00"),
 d:"Una cucina vietnamita minuscola a Mitte, con pochi sgabelli: zuppe di noodle, curry e riso con carne o tofu, cotti al momento. È uno dei locali più amati dai berlinesi per un pasto veloce e saporito.",pr:"Un piatto costa di solito 9–13 € (listino non visto). Gli orari sono da confermare e il locale è piccolo: si fa un po' di fila."},
barcomis:{n:"Barcomi's Deli",a:"Bergmannstraße 21",z:"C",r:"4,4",pos:[52.4905,13.3920],h:["09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00","09:00-18:00"],
 d:"Un caffè storico del Bergmannkiez con la torta al formaggio americana e un buon brunch: colazioni, torte e panini in un cortile ombreggiato.",pr:"Una colazione intorno ai 10–14 € (listino non visto). Orari da confermare."},
markthalle:{n:"Markthalle Neun",a:"Eisenbahnstraße 42-43",z:"C",r:"4,6",pos:[52.5020,13.4313],h:["08:00-20:00","08:00-20:00","08:00-20:00","08:00-22:00","08:00-20:00","08:00-20:00",""],
 d:"Il mercato coperto di Kreuzberg con produttori locali, panettieri e banchi di cucina da tutto il mondo. Il giovedì sera (17–22) diventa lo Street Food Thursday, con decine di banchi di cibo di strada.",pr:"Un piatto di strada costa di solito 7–12 € (listino non visto). Orari dal sito della sala; i singoli banchi aprono dalle 12 circa. Domenica non è aperto come mercato (c'è un mercatino per bambini 12–16)."},
curry36:{n:"Curry 36",a:"Mehringdamm 36",z:"C",r:"4,2",pos:[52.4934,13.3881],h:D7("09:00-23:59"),
 d:"Un altro chiosco di currywurst storico, a Kreuzberg, aperto fino alle 5 di notte: la ricetta classica con la salsiccia (anche vegetariana) e il curry, da mangiare al banco.",pr:"Una currywurst con patatine sta intorno ai 6–8 € (listino non visto). Orari dal sito: aperto tutti i giorni dalle 9 alle 5 del giorno dopo."},
mustafa:{n:"Mustafas Gemüse Kebap",a:"Mehringdamm 32",z:"C",r:"4,3",pos:[52.4936,13.3880],h:D7("10:00-23:59"),
 d:"Il chiosco di kebab di verdure più famoso di Berlino: pane caldo con pollo, verdure arrosto, feta e limone. La fila è lunga a ogni ora, ma scorre.",pr:"Un kebab costa di solito circa 6–7 € (listino non visto). Orari da guide: aperto fino a tarda notte; la fila vale la pena solo se non hai fretta."},
zurhenne:{n:"Zur Henne",a:"Leuschnerdamm 25",z:"C",r:"4,4",pos:[52.5034,13.4180],h:["","17:00-23:00","17:00-23:00","17:00-23:00","17:00-23:00","12:00-23:00","12:00-23:00"],
 d:"Una locanda di Kreuzberg specializzata in un solo piatto, il pollo arrosto con insalata di patate e crauti: la formula è la stessa da più di cento anni, con prezzi ancora onesti.",pr:"Mezzo pollo con contorno sta intorno ai 12–15 € (listino non visto). Orari da guide: chiuso il lunedì; meglio prenotare la sera."},
datscha:{n:"Café Datscha",a:"Gabriel-Max-Straße 1",z:"D",r:"4,5",pos:[52.5012,13.4571],h:D7("10:00-23:00"),
 d:"Un caffè russo-ucraino a Friedrichshain, con una sala piena di oggetti d'epoca: colazioni abbondanti, pelmeni, borscht e torte fatte in casa.",pr:"Una colazione o un piatto sta di solito sotto i 14 € (listino non visto). Orari da guide, da confermare."},
neuensee:{n:"Café am Neuen See",a:"Lichtensteinallee 2",z:"F",r:"4,2",pos:[52.5090,13.3465],h:D7("09:00-23:59"),
 d:"La birreria all'aperto sul laghetto del Tiergarten: tavoli sotto gli alberi, pizza, Flammkuchen, piatti tedeschi e colazioni. D'autunno e d'inverno si sta nelle sale riscaldate.",pr:"Un piatto sta di solito intorno ai 12–16 € (listino non visto). Orari dal sito: aperto tutti i giorni 9–24."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["distrikt","bonanza","neuensee"],B:["bonanza","distrikt"],C:["barcomis","markthalle"],D:["datscha","barcomis"],F:["neuensee","distrikt"]},
pra:{A:["vuong","konnopke","curry36"],B:["konnopke","vuong","bonanza"],C:["markthalle","mustafa","curry36"],D:["datscha","mustafa","markthalle"],F:["neuensee","vuong","curry36"]},
cen:{A:["vuong","zurhenne","mustafa"],B:["vuong","zurhenne"],C:["zurhenne","markthalle","mustafa"],D:["datscha","zurhenne","mustafa"],F:["neuensee","zurhenne","vuong"]},
snk:{A:["konnopke","bonanza"],B:["bonanza","konnopke"],C:["mustafa","curry36"],D:["datscha","mustafa"],F:["neuensee","bonanza"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"mitte",t:"Reichstag, Porta di Brandeburgo e Unter den Linden",acts:["reichstag","linden"],need:200,core:1},
{id:"isola",t:"Isola dei Musei e Alexanderplatz",acts:["museum","fernseh"],need:260,core:1,cl:[0]},
{id:"muro",t:"Il Muro: Bernauer Straße ed East Side Gallery",acts:["mauer","eastside"],need:250,core:1},
{id:"storia",t:"Topografia del Terrore e Tiergarten",acts:["potsdamer","tiergarten"],need:240},
{id:"kiez",t:"Kreuzberg e Prenzlauer Berg",acts:["kreuz","prenz"],need:260}
];
var ORDER=["reichstag","linden","museum","fernseh","mauer","eastside","potsdamer","tiergarten","kreuz","prenz"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["mitte","Mitte / Hackescher Markt",[52.5240,13.4010],"A"],
["prenz","Prenzlauer Berg",[52.5400,13.4130],"B"],
["kreuz","Kreuzberg",[52.4990,13.4200],"C"],
["fhain","Friedrichshain",[52.5120,13.4540],"D"],
["tier","Tiergarten / Potsdamer Platz",[52.5120,13.3700],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[52.5200,13.4050],""]
];
/* imposta di soggiorno: 7,5% del prezzo della camera, ogni notte */
var TAX=[["h5","Hotel 4–5 stelle",{pct:7.5}],["h3","Hotel fino a 3 stelle, B&B o appartamento",{pct:7.5}],["host","Ostello o struttura economica",{pct:7.5}],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Frühstück","il classico: panini freschi con burro, formaggio e salumi, uova e caffè."],["Kaffee und Kuchen","un caffè con un pezzo di torta, abitudine di Berlino."],["Brezel o Brötchen","un pretzel o un panino con burro e miele o formaggio."]],
pra:[["Currywurst","salsiccia a rondelle con salsa al curry e patatine: il piatto simbolo di Berlino."],["Döner o Gemüse Kebap","il kebab è nato a Berlino: pane con carne o verdure, salse e insalata."],["Bratwurst","la salsiccia alla griglia nel panino, per strada."],["Una zuppa o noodle","vietnamiti, nei locali di Mitte."]],
cen:[["Schnitzel","cotoletta con patate: la porzione è abbondante."],["Brathähnchen","pollo arrosto con insalata di patate."],["Eintopf o Königsberger Klopse","un piatto unico tradizionale: stufato o polpette in salsa di capperi."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Porta di Brandeburgo","Foto","Il simbolo di Berlino: la piazza è più vuota la mattina presto; la luce migliore è al tramonto, con la Quadriga in controluce.",[52.5163,13.3777],"Brandenburger Tor, Berlin","reichstag"],
["📷","La cupola del Reichstag","Foto","La spirale di vetro di Foster vista da fuori e, se hai prenotato, la vista dall'alto sulla città.",[52.5186,13.3762],"Reichstag, Berlin","reichstag"],
["📷","Memoriale dell'Olocausto","Foto","Le stele di cemento sono più fotogeniche con la luce bassa; mantieni il rispetto del luogo.",[52.5139,13.3787],"Denkmal für die ermordeten Juden Europas, Berlin","reichstag"],
["📷","Gendarmenmarkt","Foto","Il Konzerthaus tra i due Duomi, con la scalinata: una delle piazze più belle d'Europa, di sera con le luci.",[52.5139,13.3925],"Gendarmenmarkt, Berlin","linden"],
["📷","Isola dei Musei dal ponte","Foto","La colonnata dell'Altes Museum e la cupola del Duomo dalla riva della Sprea.",[52.5190,13.3984],"Museumsinsel, Berlin","museum"],
["📷","La Fernsehturm","Foto","La torre con la palla argentata, vista da Alexanderplatz o dal Marx-Engels-Forum.",[52.5208,13.4094],"Berliner Fernsehturm, Berlin","fernseh"],
["📷","Il Muro in Bernauer Straße","Foto","Le sbarre d'acciaio che ricordano la striscia della morte, con il pezzo originale del Muro.",[52.5352,13.3903],"Gedenkstätte Berliner Mauer, Berlin","mauer"],
["🤳","Bacio fraterno, East Side Gallery","Selfie","Il murale di Breznev e Honecker che si baciano è il più fotografato: meglio il mattino per evitare la coda.",[52.5050,13.4397],"East Side Gallery, Berlin","eastside"],
["📷","Oberbaumbrücke","Foto","Il ponte in mattoni rossi con le torri neogotiche e la U1 che passa sopra: bella al tramonto.",[52.5014,13.4457],"Oberbaumbrücke, Berlin","eastside"],
["📷","Topografia del Terrore","Foto","Il tratto di Muro con le pietre erose e la mostra all'aperto.",[52.5067,13.3835],"Topographie des Terrors, Berlin","potsdamer"],
["📷","Siegessäule","Foto","La Colonna della Vittoria dorata, dalla rotatoria o dal parco.",[52.5145,13.3501],"Siegessäule, Berlin","tiergarten"],
["🤳","Murales di Kreuzberg","Selfie","Le facciate dipinte intorno a Oranienstraße e Oberbaumbrücke: l'arte di strada più famosa di Berlino.",[52.5010,13.4220],"Oranienstraße, Berlin","kreuz"],
["📷","Mauerpark","Foto","Il tratto di Muro coperto di graffiti: gli artisti lo ridipingono di continuo.",[52.5405,13.4020],"Mauerpark, Berlin","prenz"]
];
/* avvisi verificati il 10 ottobre 2026 */
var AVV=[
{from:"2026-10-10",to:"2026-10-30",t:"Cupola del Reichstag chiusa dal 19 al 30 ottobre",x:"La cupola è chiusa per pulizia dal 19 al 30 ottobre; la terrazza sul tetto resta aperta. La visita è gratuita ma richiede la prenotazione sul sito del Bundestag (nome, data di nascita, documento originale all'ingresso)."},
{from:"2026-10-10",to:"2027-06-03",t:"Pergamonmuseum chiuso fino al 4 giugno 2027",x:"Il Pergamonmuseum è in restauro dal 2023 e riapre il 4 giugno 2027 (ala nord e padiglione centrale; l'ala sud nel 2037). Il Neues Museum, l'Altes Museum e il Bode-Museum sono aperti, chiusi il lunedì."},
{from:"2026-10-10",to:"2026-11-23",t:"Fernsehturm chiusa il 23 novembre",x:"La torre della televisione è chiusa il 23 novembre 2026; negli altri giorni è aperta dalle 9 alle 23."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: musei e memoriali chiusi",x:"Il Memoriale del Muro in Bernauer Straße e il Centro d'informazione sul Memoriale dell'Olocausto sono chiusi il 24 e il 25 dicembre; a Capodanno gli orari sono ridotti."}
];
/* clima medio di Berlino (indicativo, massime/minime) */
var CLIM=[[3,-2],[5,-1],[10,2],[15,5],[20,9],[23,13],[25,15],[25,14],[20,11],[14,7],[8,3],[4,0]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Berlino: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="museum"&&WD===0)meta+=" Oggi è lunedì: i musei dell'isola sono chiusi, resta il Duomo e il Lustgarten.";
if(it.id==="mauer"&&WD===0)meta+=" Oggi è lunedì: il centro di documentazione è chiuso, ma la mostra all'aperto è visitabile.";
if(it.id==="prenz"&&WD===6)meta+=" Oggi è domenica: c'è il mercatino delle pulci del Mauerpark.";
if(it.id==="kreuz"&&WD===3)meta+=" Oggi è giovedì: dalle 17 alle 22 c'è lo Street Food Thursday alla Markthalle Neun.";
return meta}
Object.assign(C,{id:"berlino",n:"Berlino",cn:"Germania",e:"🐻",flag:"🇩🇪",col:["#b3122a","#3b3f4a","#f0b323"],k:"berlino berlin germania germany",
TZ:"Europe/Berlin",LL:[52.5200,13.4050],CC:"de",QN:"Berlin",BK:"Berlin",ARE:/berlin|berlino|\b1[0-4][0-9]{3}\b/i,VER:"10 ottobre 2026",
Z0:"A",LANG:"de-DE",LANGN:"tedesco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Hauptbahnhof",q:"Berlin Hauptbahnhof"},
SINGLE:{acts:["reichstag","linden","museum","fernseh","mauer"],ins:[]},
EXCL:[],
DICON:{museum:"🏛️",fernseh:"🗼",mauer:"🧱",eastside:"🎨",potsdamer:"🏙️",kreuz:"🥙",prenz:"🌳",tiergarten:"🌲"},
ZN:{A:"a Mitte",B:"a Prenzlauer Berg",C:"a Kreuzberg",D:"a Friedrichshain",F:"al Tiergarten"},
NEAR:{col:"caffè",pra:"chiosco o locale veloce",cen:"locale",snk:"caffè o chiosco"},
SE:{bonanza:"☕",konnopke:"🌭",distrikt:"☕",vuong:"🍜",barcomis:"🥐",markthalle:"🥙",curry36:"🌭",mustafa:"🥙",zurhenne:"🍗",datscha:"🥟",neuensee:"🍺"},
TR:{one:4,cap:11.2,lbl:"U-Bahn, S-Bahn, tram e bus (BVG)",
 air:{BER:{one:5,n:"Treno per l'aeroporto (biglietto ABC)"}},
 passes:[
 {n:"Biglietto 24 ore AB",d:1,max:1,p:11.2,note:"Il biglietto 24 ore AB (11,20 €) vale su U-Bahn, S-Bahn, tram e bus a Berlino per un giorno intero."}],
 note:"Prezzi 2026 dal sito del VBB e dal sito ufficiale di Berlino: biglietto singolo AB 4,00 € (valido 2 ore, cambi compresi), Kurzstrecke (3 fermate di U-/S-Bahn o 6 di bus/tram) 2,80 €, 24 ore AB 11,20 €, biglietto singolo ABC (aeroporto) 5,00 €. Il biglietto 7 giorni non si vende più dal 2026; per più giorni conviene il Deutschlandticket (abbonamento mensile, prezzo da controllare sul sito BVG) o la Berlin WelcomeCard (48 ore, 72 ore o 5 giorni, con sconti: prezzi non letti)."},
FOOD:{co:[8,"Colazione al caffè"],pr:[9,"Pranzo (currywurst, kebab o noodle)"],ce:[13,"Cena (pollo arrosto, locale di quartiere)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"In U-Bahn o S-Bahn",move:"tutto a piedi, in U-Bahn, S-Bahn o tram",bags:"«Kann ich meine Koffer hier lassen?»",bagsPM:"«Kann ich meine Koffer bis heute Nachmittag hier lassen?»",bagsAM:"«Kann ich meine Koffer bis Mittag hier lassen?»",
pra:"Un chiosco o un locale veloce",praZ:{A:"Nei dintorni di Unter den Linden e dell'Isola dei Musei i ristoranti con il menù fuori sono per turisti e costano molto: i posti buoni sono i chioschi (Imbiss) e i locali vietnamiti nelle vie laterali di Mitte.",C:"A Kreuzberg si mangia benissimo con poco, ma i chioschi più famosi hanno la fila: porta pazienza."},
freeLong:"Qualche idea: un giro in barca sulla Sprea, un caffè con una fetta di torta, i giardini del Tiergarten, una passeggiata al Mauerpark o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata lungo la Sprea.",
remind:"Se vuoi salire sulla cupola del Reichstag o sulla Fernsehturm, prenota prima online (la cupola è gratuita, ma richiede la registrazione). Il lunedì i musei dell'isola sono chiusi.",
rain1:"Al coperto: Neues Museum, Topografia del Terrore, il centro del Memoriale del Muro, la Markthalle Neun e le gallerie dell'Humboldt Forum.",
rainM:"Al coperto: musei dell'isola, Topografia del Terrore, Humboldt Forum, Memoriale del Muro e Markthalle Neun.",
water:"Riempite la borraccia: l'acqua del rubinetto di Berlino è potabile e si beve ovunque. Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Berlino si pranza tra le 12 e le 14:30 e si cena dalle 18: molti locali tradizionali chiudono tra i due servizi, guarda l'orario accanto a ogni locale.",
night:[["🍺","Una birra o un bicchiere di Weißbier in una birreria è il modo berlinese di chiudere la giornata."],["🕙","Le cucine servono fino alle 22–23; U-Bahn e S-Bahn nel fine settimana girano tutta la notte, durante la settimana ci sono i bus notturni."],["☕","Molti caffè aprono alle 9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Berlino ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per chioschi e locali di quartiere: colazione e cena restano intorno ai 15 € a persona. In molti locali si paga con la carta, ma i chioschi più piccoli e i mercatini accettano solo contanti.",
taxNote:"L'imposta di soggiorno di Berlino è il 7,5% del prezzo della camera, per ogni notte (anche per i viaggi di lavoro, dal 2024). Spesso è già compresa nel prezzo che vedi sull'annuncio: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: almeno 4 stelle su Google, chioschi, caffè e locali di quartiere, niente catene. Colazione e cena restano intorno o sotto i 15 € a persona; il pranzo può costare qualcosa di più. Orari verificati sui siti di Konnopke's, Markthalle Neun, Bonanza, Curry 36 e Café am Neuen See; per gli altri locali gli orari sono quelli delle guide e delle schede online (ottobre 2026): controllali qualche giorno prima. Prezzi indicativi, non letti sui listini."},
fx:{meta:meta},
AIRTIPS:["Il Flughafen-Express è il più veloce: dal BER alla Hauptbahnhof sono circa 23 minuti, con un treno ogni 15 minuti.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto ABC per l'aeroporto (5 €) e biglietto AB 24 ore (11,20 €): si comprano alle macchinette o con l'app BVG",function(E){return true}],["rei","Prenotazione per la cupola del Reichstag (gratuita, sul sito del Bundestag): nome, data di nascita e documento originale",["reichstag"]],["tv","Biglietto per la Fernsehturm (da 20 €, online per evitare la fila)",["fernseh"]],["mus","Biglietto per il Neues Museum (14 €; chiuso il lunedì)",["museum"]],["card","Carta d'identità o passaporto: il documento originale serve per salire sulla cupola del Reichstag",["reichstag"]],["cash","Qualche euro in contanti per chioschi e mercatini (Konnopke's, banchi del mercato)"]],
NUM:{1:["ein","ain"],2:["zwei","zvai"],3:["drei","drai"],4:["vier","fir"],5:["fünf","fünf"],6:["sechs","zeks"],7:["sieben","ZI-ben"],8:["acht","acht"],9:["neun","noin"],10:["zehn","zen"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Guten Tag / Guten Abend","GU-ten tag / GU-ten A-bent"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Einen Tisch für "+(N===1?"eine Person":nu[0])+", bitte","AI-nen tish für "+(N===1?"AI-ne per-ZON":nu[1])+", BIT-te"],["Un caffè e un pezzo di torta, per favore","Einen Kaffee und ein Stück Kuchen, bitte","AI-nen KAF-fe unt ain shtük KU-chen, BIT-te"],["Acqua del rubinetto, per favore","Leitungswasser, bitte","LAI-tungs-vas-ser, BIT-te"],["Il conto, per favore","Die Rechnung, bitte","di REH-nung, BIT-te"],["Posso pagare con la carta?","Kann ich mit Karte zahlen?","kan ich mit KAR-te TSA-len"],["Quanto costa?","Wie viel kostet das?","vi fil KOS-tet das"],["Dov'è la U-Bahn?","Wo ist die U-Bahn?","vo ist di U-ban"],["Qual è il treno per l'aeroporto?","Welcher Zug fährt zum Flughafen?","VEL-cher tsug fert tsum FLUG-ha-fen"]];
if(M)fr=fr.concat([["Ho una prenotazione","Ich habe eine Reservierung","ich HA-be AI-ne re-ser-VI-rung"],["Posso lasciare i bagagli?","Kann ich meine Koffer hier lassen?","kan ich MAI-ne KOF-fer hir LAS-sen"],["A che ora è il check-out?","Um wie viel Uhr ist das Check-out?","um vi fil ur ist das tsek-AUT"]]);
return fr.concat([["Mi scusi","Entschuldigung","ent-SHUL-di-gung"],["Grazie mille!","Vielen Dank!","FI-len dank"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Berlino: "+(tx[2]&&tx[2].pct?"il "+String(tx[2].pct).replace(".",",")+"% del prezzo della camera ("+tx[1].toLowerCase()+"), per ogni notte":"non si paga se sei ospite di amici o parenti")+". Spesso è già compresa nel prezzo che trovi sull'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["La BVG (U-Bahn, tram e bus) e la S-Bahn si usano con lo stesso biglietto. Le linee notturne sono pochissime durante la settimana, ma nel fine settimana U-Bahn e S-Bahn girano tutta la notte."],
ZONES:[
["🚇 U-Bahn, S-Bahn e biglietti",["Un solo biglietto vale su U-Bahn, S-Bahn, tram e bus: il singolo AB costa 4,00 € e vale 2 ore; il 24 ore AB 11,20 €. Il Kurzstrecke (3 fermate) costa 2,80 €.","Per l'aeroporto serve l'ABC: 5,00 € a corsa.","I biglietti si comprano alle macchinette o con l'app BVG: non vanno timbrati se acquistati su app o alle macchinette con data già stampata. Controlli a sorpresa con multa di 60 €: tieni sempre il biglietto.","Il biglietto 7 giorni non esiste più dal 2026."]],
["🏛️ Mitte, Reichstag e Isola dei Musei",["Il Reichstag e la Porta di Brandeburgo sono a 10–15 minuti a piedi dalla Hauptbahnhof; Unter den Linden è un lungo viale fino all'Isola dei Musei.","La cupola del Reichstag è gratuita, ma serve la prenotazione sul sito del Bundestag: porta il documento originale.","I musei dell'isola sono chiusi il lunedì; il Pergamonmuseum riapre il 4 giugno 2027."],["reichstag","linden","museum","fernseh"]],
["🧱 Il Muro",["Il Memoriale di Bernauer Straße è gratuito; il centro di documentazione è chiuso il lunedì. La mostra all'aperto è aperta 8–22 ogni giorno.","L'East Side Gallery è un tratto di Muro all'aperto, gratuito e sempre accessibile; i tratti più famosi sono affollati.","Il Checkpoint Charlie è una ricostruzione per turisti con figuranti a pagamento: non serve fermarsi."],["mauer","eastside","potsdamer"]],
["🥙 Kreuzberg e Prenzlauer Berg",["Il giovedì dalle 17 alle 22 la Markthalle Neun ospita lo Street Food Thursday.","La domenica c'è il mercatino delle pulci del Mauerpark e, spesso, il karaoke all'aperto.","Il kebab è nato a Berlino: i chioschi di Kreuzberg fanno il meglio, ma la fila da Mustafa è lunga."],["kreuz","prenz"]],
["🌅 Un'ora fuori Berlino",["Potsdam è raggiungibile con l'S-Bahn S7 (biglietto ABC) in circa 40 minuti: il parco e il castello di Sanssouci sono tra i luoghi più belli della regione.","Sachsenhausen, l'ex campo di concentramento, è raggiungibile con l'S1 per Oranienburg (biglietto ABC)."]]],
WTIPS:["L'acqua del rubinetto di Berlino è potabile: puoi chiederla in ogni locale («Leitungswasser, bitte») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Germania usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Berlino ha lo stesso fuso orario dell'Italia.","Mancia: si arrotonda al tavolo (5–10%), dicendo la cifra al cameriere al momento di pagare, non lasciandola sul tavolo.","Molti chioschi, mercatini e piccoli locali accettano solo contanti: porta qualche euro.","Il segnale del semaforo pedonale rosso vale davvero: i berlinesi aspettano anche se non passa nessuno.","Le biciclette hanno una corsia propria sul marciapiede: non camminarci sopra.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.bvg.de/" target="_blank" rel="noopener">bvg.de</a> · <a href="https://sbahn.berlin/" target="_blank" rel="noopener">sbahn.berlin</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Berlino: <a href="https://ambberlino.esteri.it" target="_blank" rel="noopener">ambberlino.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 10 ottobre 2026 non ho trovato scioperi annunciati nei trasporti di Berlino. Nel 2026 la BVG ha avuto due scioperi (2–3 febbraio e 27 febbraio–1 marzo) e il 27 marzo 2026 BVG e Verdi hanno firmato il nuovo contratto, con durata di 48 mesi. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.bvg.de/" target="_blank" rel="noopener">bvg.de</a> e, per le ferrovie, <a href="https://www.bahn.de/" target="_blank" rel="noopener">bahn.de</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 76 110 82 Q150 86 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M6 106 V58 H92 V106 H84 V62 H76 V106 H68 V62 H58 V106 H50 V62 H40 V106 H32 V62 H22 V106 Z M2 58 H96 V50 H2 Z M30 50 V44 H68 V50 Z M44 44 V36 H54 V44 Z M46 36 L49 28 L52 36 Z"/></g>'+
'<g style="--k:2"><path d="M130 106 V42 H134 V106 Z M131.5 42 V12 H132.5 V42 Z"/><circle cx="132" cy="36" r="8"/></g>'+
'<g style="--k:3"><path d="M166 106 V72 H238 V106 Z M178 72 V62 H226 V72 Z M186 62 Q202 30 218 62 Z M200 34 V24 H204 V34 Z"/></g>'+
'<g style="--k:4"><path d="M254 106 V68 H336 V106 Z M254 68 V62 H336 V68 Z M278 62 Q295 38 312 62 Z M293 40 V32 H297 V40 Z"/></g>'+
'<g style="--k:5"><path d="M356 106 V54 H368 V106 Z M352 54 H372 V48 H352 Z M358 48 V36 H366 V48 Z"/><circle cx="362" cy="31" r="5"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M22 70 v22 M40 70 v22 M58 70 v22 M76 70 v22"/><path d="M180 82 h52 M180 92 h52"/><path d="M262 78 h68 M262 88 h68"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="26" r="1.3"/><circle cx="158" cy="14" r="1.3"/><circle cx="246" cy="22" r="1.3"/><circle cx="342" cy="10" r="1.3"/><circle cx="384" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.berlino);

;var n=window.CITIES["berlino"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["berlino"]);
