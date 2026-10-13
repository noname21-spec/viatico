/* ===== Zurigo (dati verificati il 13 ottobre 2026; 1 CHF ≈ 1,07 €) ===== */
window.CITIES=window.CITIES||{};
CITIES.zurigo=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
ZRH:{n:"Zurigo (ZRH)",s:"Zürich Flughafen",url:"https://www.flughafen-zuerich.ch/en",live:"Zurigo",inMin:45,buf:120,pos:[47.4505,8.5611],sd:"Aeroporto ZRH · treno S-Bahn",rt:"Dall'aeroporto: treno (S-Bahn S2, S16 o S24, oppure IC/IR) fino alla stazione centrale (Hauptbahnhof), circa 11 minuti.",
 arr:"La Svizzera fa parte dello spazio Schengen: dall'Italia si arriva senza controllo passaporti, ma non è nell'Unione europea, quindi la dogana per le merci resta. Dopo il ritiro bagagli segui i cartelli «Train» per la stazione, sotto il terminal: ci vogliono circa 5 minuti a piedi. Dal binario partono treni per la stazione centrale (Zürich HB) ogni pochi minuti: la S-Bahn (S2, S16 o S24) e gli IC/IR impiegano circa 10–12 minuti. In tutto, dall'uscita all'arrivo nel centro, sono circa 30–40 minuti. In alternativa il tram 10 va a Oerlikon e alla stazione, ma è molto più lento (da controllare).",
 tk:"Biglietto: il treno per il centro è un biglietto «3 zone» da 7,20 CHF (circa 7,70 €), valido un'ora (prezzo dal sito dello ZVV, il consorzio dei trasporti di Zurigo; con la mezza tariffa svizzera costa meno). Si compra alle macchinette gialle della stazione, nell'app ZVV o SBB Mobile. Il biglietto giornaliero «zona 110» (9,40 CHF) vale solo in città: non copre l'aeroporto, che è fuori città.",
 gm:"Flughafen Zürich Bahnhof, Kloten",
 tips:["Il biglietto giornaliero a 3 zone costa 14,40 CHF (circa 15,40 €) e comprende anche il viaggio dall'aeroporto: conviene se prendi il treno più di due volte, come all'andata e al ritorno più i mezzi in città.","Dopo mezzanotte e mezza le corse si diradano: la sera tardi controlla l'orario su sbb.ch o nell'app SBB. Il taxi per il centro costa da circa 55 a 75 CHF (da controllare).","Lo Zürich Card comprende il treno per l'aeroporto, perché copre anche le zone dell'aeroporto: ti conviene solo se visiti tanti musei (vedi la sezione sui trasporti)."]}
};
/* linee (tracciati indicativi) */
var SEG={
s2:{c:"#eb0000",n:"Treno S-Bahn / IC dall'aeroporto",p:[[47.4510,8.5624,"Aeroporto",2],[47.4113,8.5441,"Oerlikon",2],[47.3779,8.5403,"Hauptbahnhof",2]]},
s10:{c:"#1a56a8",n:"Treno S10 per l'Uetliberg",p:[[47.3779,8.5403,"Hauptbahnhof",2],[47.3655,8.5290,"Selnau"],[47.3494,8.4914,"Uetliberg",2]]},
s8:{c:"#2a8f3c",n:"Treno S-Bahn per Kilchberg (Lindt)",p:[[47.3779,8.5403,"Hauptbahnhof",2],[47.3640,8.5311,"Enge",2],[47.3430,8.5320,"Wollishofen"],[47.3217,8.5436,"Kilchberg",2]]}
};
var START=[47.3779,8.5403];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
altstadt:{t:"Altstadt: Niederdorf e Limmatquai",z:"A",p:1,min:60,id:90,max:130,pos:[47.3733,8.5444],q:"Niederdorfstrasse, Zürich",cls:"walk",sun:1,
 d:"Il centro storico di Zurigo sulla riva destra della Limmat: vicoli stretti con case colorate, botteghe, locali e piazzette, e il Limmatquai lungo il fiume con i palazzi delle antiche corporazioni. Si cammina senza fretta, perché è quasi tutto pedonale.",
 m:"Si cammina gratis, a qualsiasi ora. Le botteghe chiudono la sera presto e la domenica sono quasi tutte chiuse (in Svizzera i negozi riposano); restano aperti i ristoranti e i caffè. Il sabato mattina in primavera e in estate c'è il mercato in alcune piazze."},
grossmunster:{t:"Grossmünster e la sua torre",z:"A",p:1,min:45,id:60,max:100,pos:[47.3702,8.5441],q:"Grossmünster, Zürich",cls:"",sun:1,tk:[5.4,"Torre del Grossmünster (5 CHF)",1,1],
 win:function(wd){return wd===6?[12*60+30,17*60]:[10*60,17*60]},
 d:"La grande chiesa romanica con le due torri gemelle, il simbolo di Zurigo e il luogo dove Zwingli iniziò la Riforma svizzera. Si può salire sulla Karlsturm, la torre di destra, per vedere i tetti, il fiume e il lago.",
 m:"Dal sito di Zurigo Turismo: la torre è aperta da lunedì a sabato 10–18 da marzo a ottobre e 10–17 da novembre a febbraio; la domenica apre dopo la funzione, intorno alle 12:30. La salita costa 5 CHF (circa 5,40 €), sono 187 gradini e le terrazze sono chiuse per sicurezza. Dal gennaio 2025 al 2029 sono in corso lavori di restauro alla chiesa: alcune parti possono essere coperte da ponteggi o chiuse."},
fraumunster:{t:"Fraumünster e le vetrate di Chagall",z:"B",p:1,min:30,id:45,max:70,pos:[47.3694,8.5412],q:"Fraumünster, Zürich",cls:"",sun:1,tk:[5.4,"Fraumünster (5 CHF)",1,1],
 win:function(wd){return wd===6?[12*60,17*60]:[10*60,17*60]},
 d:"La chiesa dei due campanili sottili, di fronte al Grossmünster, famosa per le cinque vetrate colorate del coro e il rosone del transetto dipinti da Marc Chagall nel 1970, con le vetrate di Augusto Giacometti. Accanto c'è il chiostro con gli affreschi.",
 m:"Dal sito di Zurigo Turismo: l'ingresso costa 5 CHF (circa 5,40 €), gratis per ragazzi fino a 16 anni e studenti. Aperta da lunedì a sabato 10–18 da marzo a ottobre e 10–17 da novembre a febbraio; la domenica apre dopo la funzione, intorno alle 12. Le vetrate di Chagall si vedono meglio la mattina, con il sole che arriva da est."},
lindenhof:{t:"Lindenhof",z:"B",p:2,min:30,id:45,max:60,pos:[47.3731,8.5412],q:"Lindenhof, Zürich",cls:"walk",sun:1,
 d:"Una terrazza alberata sulla collina del primo insediamento romano, sopra la Limmat, con la fontana, il vecchio gioco degli scacchi giganti e una delle viste più belle sul fiume e sui due campanili.",
 m:"È una piazza aperta a tutti, gratis, a qualsiasi ora. Si arriva da Rennweg o da Schipfe con una breve salita di scale."},
bahnhofstrasse:{t:"Bahnhofstrasse e Paradeplatz",z:"B",p:2,min:60,id:75,max:120,pos:[47.3697,8.5391],q:"Paradeplatz, Zürich",cls:"walk",sun:1,
 d:"Il viale più elegante e costoso di Zurigo, lungo 1,4 chilometri dalla stazione fino al lago: vetrine di orologi e gioielli, le banche, i tram e, a Paradeplatz, la Confiserie Sprüngli. Si cammina in un quarto d'ora, ma ci si ferma tanto.",
 m:"Si cammina gratis. I negozi sono aperti di norma da lunedì a sabato fino alle 18:30–20, la domenica sono chiusi (salvo nella stazione centrale, dove lo Shopville è aperto tutti i giorni, anche la domenica)."},
landesmuseum:{t:"Landesmuseum: Museo nazionale svizzero",z:"D",p:3,min:90,id:120,max:180,pos:[47.3790,8.5414],q:"Landesmuseum Zürich",cls:"",sun:1,cl:[0],tk:[14,"Landesmuseum (13 CHF)",1,1],
 win:function(){return[10*60,17*60]},
 d:"Il museo di storia svizzera, in un castello neogotico accanto alla stazione: armature, vetrate, stanze originali dal Medioevo in poi e una mostra sulla storia del Paese («Geschichte Schweiz»). Ha anche un parco e un bistrot.",
 m:"Dal sito del museo: martedì–domenica 10–17, chiuso il lunedì. Ingresso 13 CHF (circa 14 €), ridotto 10 CHF, gratis fino a 16 anni e con lo Zürich Card. Il 24 dicembre chiude alle 14."},
kunsthaus:{t:"Kunsthaus Zürich",z:"A",p:3,min:90,id:120,max:180,pos:[47.3702,8.5481],q:"Kunsthaus Zürich",cls:"",sun:1,cl:[0],tk:[26,"Kunsthaus Zürich: collezione (24 CHF)",1,1],
 win:function(wd){return wd===3?[10*60,20*60]:[10*60,18*60]},
 d:"Il museo d'arte più importante della Svizzera: Giacometti, Munch, Monet, Van Gogh, Picasso, Chagall e un'ampia raccolta di arte moderna, con una sala dedicata ai pittori svizzeri. Il nuovo edificio di David Chipperfield ospita le mostre temporanee.",
 m:"Dal sito del museo: martedì, mercoledì e da venerdì a domenica 10–18, giovedì 10–20, lunedì chiuso. Collezione e piccole mostre 24 CHF (circa 25,70 €), ridotto 17 CHF; la collezione è gratuita ogni mercoledì. Con una grande mostra il biglietto sale a 31 CHF. Il 25 dicembre e il 1° gennaio è chiuso; il 24 e il 31 dicembre apre 10–16."},
lago:{t:"Lungolago: Bürkliplatz e Zürichsee",z:"C",p:2,min:60,id:90,max:150,pos:[47.3660,8.5413],q:"Bürkliplatz, Zürich",cls:"walk",sun:1,
 d:"Il lago di Zurigo, con la passeggiata che va dal Bürkliplatz verso Bellevue e il Zürichhorn: platani, panchine, barche a vela e, nelle giornate limpide, le Alpi sullo sfondo. Dal Bürkliplatz partono i battelli per le gite sul lago.",
 m:"La passeggiata è gratuita e aperta sempre. I battelli (ZSG) a ottobre hanno un orario ridotto e in inverno ancora meno corse: controlla gli orari su zsg.ch. Il martedì e il venerdì mattina c'è il mercato in Bürkliplatz."},
poly:{t:"Polybahn e Polyterrasse (ETH)",z:"A",p:5,min:30,id:45,max:60,pos:[47.3764,8.5481],q:"Polyterrasse ETH Zürich",cls:"walk",sun:1,
 d:"La funicolare del 1889 che sale da Central alla terrazza dell'Università Politecnica (ETH): da lassù si ha la vista più bella sul centro storico, con la Limmat, i tetti e le torri del Grossmünster.",
 m:"La Polybahn è inclusa nei biglietti ZVV; è aperta di giorno, con corse ogni pochi minuti (orari da controllare). La terrazza è gratis, a qualsiasi ora."},
uetliberg:{t:"Uetliberg: il belvedere sulla città",z:"D",p:3,min:150,id:180,max:240,pos:[47.3494,8.4914],q:"Uetliberg, Zürich",cls:"walk",multi:1,sun:1,
 d:"La montagna di Zurigo, a 870 metri: un treno ci arriva in circa 20 minuti dalla stazione centrale e in dieci minuti a piedi si è in cima. Dalla torre panoramica si vedono la città, il lago e, col bel tempo, le Alpi.",
 m:"Si sale con il treno S10 dal binario 21 o 22 della stazione centrale (circa due corse all'ora, di più nei fine settimana); il biglietto giornaliero «zona 110» non basta, perché la stazione è fuori dalla zona della città: servono i biglietti per le zone extra (circa 7,20 CHF per 3 zone, da controllare nell'app ZVV). La torre panoramica ha un biglietto di 2–5 CHF a seconda del periodo e dell'ente, da controllare sul posto. Con la neve o il ghiaccio il sentiero è scivoloso."},
lindt:{t:"Lindt Home of Chocolate",z:"C",p:4,min:120,id:150,max:200,pos:[47.3218,8.5500],q:"Lindt Home of Chocolate, Kilchberg",cls:"",multi:1,sun:1,tk:[18.2,"Lindt Home of Chocolate (17 CHF)",1,1],
 win:function(){return[10*60,19*60]},
 d:"Il museo del cioccolato della Lindt, sul lago, a sud di Zurigo: dalla storia del cacao alla produzione, con una grande fontana di cioccolato e un negozio con assaggi gratuiti a ogni piano. Si arriva in treno o in battello.",
 m:"Dal sito di Zurigo Turismo: aperto tutti i giorni 10–19; adulti 17 CHF (circa 18,20 €), ragazzi 8–15 anni 10 CHF, bambini fino a 7 anni gratis. Conviene prenotare l'orario online. La fontana, il negozio e il caffè sono accessibili senza biglietto. Orari e prezzi dalla pagina del 2025: da confermare sul sito ufficiale."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
function PW(a,b,min,tab,tba,pts){var r=pts.slice().reverse();P2(a,b,min,"walk",tab,tba,{f:[W(pts)],r:[W(r)]})}
var LEGS={};
PW("start","altstadt",12,"A piedi dalla stazione per il Bahnhofquai e il ponte sulla Limmat fino al Niederdorf, circa 12 minuti.","A piedi dal Niederdorf per il Limmatquai e il Bahnhofquai fino alla stazione, circa 12 minuti.",[[47.3779,8.5403],[47.3763,8.5424],[47.3745,8.5436],[47.3733,8.5444]]);
PW("start","landesmuseum",4,"A piedi, subito accanto alla stazione: il museo è dietro l'edificio, circa 4 minuti.","A piedi fino alla stazione centrale, circa 4 minuti.",[[47.3779,8.5403],[47.3785,8.5409],[47.3790,8.5414]]);
PW("start","bahnhofstrasse",16,"A piedi lungo la Bahnhofstrasse fino a Paradeplatz, circa 16 minuti (o tram 2, 8 o 9 per tre fermate).","A piedi lungo la Bahnhofstrasse fino alla stazione, circa 16 minuti.",[[47.3779,8.5403],[47.3745,8.5393],[47.3715,8.5390],[47.3697,8.5391]]);
PW("altstadt","grossmunster",5,"A piedi per la Niederdorfstrasse e le scalette fino al Grossmünster, circa 5 minuti.","A piedi dal Grossmünster per Zwingliplatz e Niederdorfstrasse, circa 5 minuti.",[[47.3733,8.5444],[47.3715,8.5443],[47.3702,8.5441]]);
PW("grossmunster","fraumunster",8,"A piedi sulla Münsterbrücke e per Münsterhof fino al Fraumünster, circa 8 minuti.","A piedi per Münsterhof e sulla Münsterbrücke fino al Grossmünster, circa 8 minuti.",[[47.3702,8.5441],[47.3699,8.5425],[47.3694,8.5412]]);
PW("fraumunster","lindenhof",7,"A piedi per la Schipfe e la scalinata fino al Lindenhof, circa 7 minuti.","A piedi per le scale e la Schipfe fino al Fraumünster, circa 7 minuti.",[[47.3694,8.5412],[47.3712,8.5410],[47.3731,8.5412]]);
PW("lindenhof","grossmunster",10,"A piedi dal Lindenhof per la Rathausbrücke fino al Grossmünster, circa 10 minuti.","A piedi dal Grossmünster per la Rathausbrücke fino al Lindenhof, circa 10 minuti.",[[47.3731,8.5412],[47.3722,8.5430],[47.3712,8.5438],[47.3702,8.5441]]);
PW("fraumunster","bahnhofstrasse",4,"A piedi per Münsterhof fino a Paradeplatz, circa 4 minuti.","A piedi da Paradeplatz fino al Fraumünster, circa 4 minuti.",[[47.3694,8.5412],[47.3696,8.5400],[47.3697,8.5391]]);
PW("bahnhofstrasse","lago",8,"A piedi lungo la Bärengasse e il Bürkliplatz fino al lago, circa 8 minuti.","A piedi dal Bürkliplatz fino a Paradeplatz, circa 8 minuti.",[[47.3697,8.5391],[47.3680,8.5400],[47.3660,8.5413]]);
PW("grossmunster","kunsthaus",10,"A piedi per Hirschengraben fino al Kunsthaus, circa 10 minuti.","A piedi per Hirschengraben fino al Grossmünster, circa 10 minuti.",[[47.3702,8.5441],[47.3703,8.5462],[47.3702,8.5481]]);
PW("altstadt","poly",12,"A piedi fino a Central, poi la Polybahn (2 minuti) fino alla Polyterrasse, circa 12 minuti in tutto.","Dalla Polyterrasse la Polybahn scende a Central; poi a piedi nel Niederdorf, circa 12 minuti.",[[47.3733,8.5444],[47.3750,8.5442],[47.3763,8.5434],[47.3764,8.5481]]);
PW("poly","kunsthaus",9,"A piedi dalla Polyterrasse per la Rämistrasse fino al Kunsthaus, circa 9 minuti.","A piedi dal Kunsthaus per la Rämistrasse fino alla Polyterrasse, circa 9 minuti.",[[47.3764,8.5481],[47.3735,8.5485],[47.3702,8.5481]]);
PW("landesmuseum","altstadt",14,"A piedi lungo la Limmat fino al Niederdorf, circa 14 minuti.","A piedi dal Niederdorf lungo la Limmat fino al Landesmuseum, circa 14 minuti.",[[47.3790,8.5414],[47.3763,8.5424],[47.3745,8.5436],[47.3733,8.5444]]);
PW("lago","kunsthaus",17,"A piedi per il Bellevue e la Rämistrasse fino al Kunsthaus, circa 17 minuti.","A piedi per la Rämistrasse e il Bellevue fino al lago, circa 17 minuti.",[[47.3660,8.5413],[47.3668,8.5447],[47.3690,8.5470],[47.3702,8.5481]]);
P2("start","uetliberg",35,"metro","Treno S10 dal binario 21 o 22 della stazione centrale fino all'Uetliberg (circa 20 minuti), poi 10 minuti a piedi fino alla cima.","Dalla cima a piedi fino alla stazione dell'Uetliberg e treno S10 fino alla stazione centrale, circa 35 minuti.",{f:[["s10","Hauptbahnhof","Uetliberg"],W([[47.3500,8.4900],[47.3494,8.4914]])],r:[["s10","Uetliberg","Hauptbahnhof"]]});
P2("start","lindt",35,"metro","Treno S-Bahn S8 (o S24) dalla stazione centrale fino a Kilchberg (circa 15 minuti), poi 10 minuti a piedi fino al museo. In alternativa il battello dal Bürkliplatz (circa 45 minuti).","A piedi fino alla stazione di Kilchberg e treno fino alla stazione centrale, circa 35 minuti.",{f:[["s8","Hauptbahnhof","Kilchberg"],W([[47.3217,8.5436],[47.3218,8.5500]])],r:[W([[47.3218,8.5500],[47.3217,8.5436]]),["s8","Kilchberg","Hauptbahnhof"]]});
/* ritorno in aeroporto: a piedi o in tram alla stazione centrale e treno */
var RET={
ZRH:{
 A:{min:40,txt:"Dal centro vai alla stazione centrale (Zürich HB, a piedi o in tram) e prendi la S-Bahn S2, S16 o S24 oppure un IC/IR per l'aeroporto dal binario indicato sul tabellone (circa 11 minuti, più treni all'ora). Biglietto da 7,20 CHF (circa 7,70 €) per 3 zone: compralo alla macchinetta o nell'app ZVV. Alla stazione dell'aeroporto segui i cartelli per le partenze: il check-in è a pochi minuti a piedi. In tutto conta 40 minuti.",g:[["s2","Hauptbahnhof","Aeroporto"]]}}
};
var ARR={
ZRH:[["s2","Aeroporto","Hauptbahnhof"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari dai siti di Zurigo Turismo (ottobre 2026), prezzi stimati: da confermare */
var V={
zeughaus:{n:"Zeughauskeller",a:"Bahnhofstrasse 28a",z:"B",r:"4,1",pos:[47.3710,8.5392],h:D7("11:30-23:00"),
 d:"Un ex deposito di armi del Quattrocento vicino a Paradeplatz, diventato una grande sala di legno con lunghi tavoli: la cucina svizzera di una volta, con salsicce, Zürcher Geschnetzeltes, Wiener schnitzel, cordon bleu e un'insalata di salsiccia e formaggio.",pr:"Un piatto principale costa di solito 25–35 CHF (circa 27–37 €); è il locale tipico più economico della zona (listino non visto). Orari dal sito di Zurigo Turismo."},
spruengli:{n:"Confiserie Sprüngli",a:"Bahnhofstrasse 21 (Paradeplatz)",z:"B",r:"4,4",pos:[47.3699,8.5391],h:["08:30-18:30","08:30-18:30","08:30-18:30","08:30-18:30","08:30-18:30","09:00-18:30","09:00-17:00"],
 d:"La pasticceria più famosa di Zurigo, aperta dal 1836 a Paradeplatz: sala con i tavolini, cioccolato, torte e i Luxemburgerli, i piccoli macaron della casa. Il caffè del piano terra serve anche colazioni e piatti leggeri.",pr:"Un caffè con una fetta di torta sta intorno ai 12–16 CHF; i Luxemburgerli si comprano a pezzo, pochi franchi (listino non visto). Orari dal sito di Zurigo Turismo."},
hiltl:{n:"Haus Hiltl",a:"Sihlstrasse 28",z:"B",r:"4,3",pos:[47.3723,8.5385],h:["07:00-22:00","07:00-22:00","07:00-22:00","07:00-22:00","07:00-23:00","08:00-23:00","10:00-22:00"],
 d:"Il più antico ristorante vegetariano del mondo (dal 1898): un buffet con oltre cento piatti caldi e freddi, che si paga a peso, e una colazione ricca. Ci sono opzioni vegane e anche per chi non è vegetariano.",pr:"Si paga a peso: un piatto ben pieno sta di solito sui 20–30 CHF; la colazione 15–25 CHF (listino non visto). Orari dal sito di Zurigo Turismo."},
chuchi:{n:"Swiss Chuchi (Hotel Adler)",a:"Rosengasse 10",z:"A",r:"4,2",pos:[47.3723,8.5439],h:["07:00-10:00,11:30-23:15","07:00-10:00,11:30-23:15","07:00-10:00,11:30-23:15","07:00-10:00,11:30-23:15","07:00-10:00,11:30-23:15","07:00-10:30,12:00-23:15","07:00-10:30,12:00-23:15"],
 d:"Un ristorante tipico svizzero nel cuore del Niederdorf, con l'atmosfera da baita: fonduta di formaggio, raclette, Zürcher Geschnetzeltes con rösti e i macaroni alpini. Serve anche la colazione svizzera, con muesli Bircher, formaggi e salumi.",pr:"Una fonduta costa di solito 30–40 CHF a persona; una colazione 20–25 CHF (listino non visto). Orari dal sito di Zurigo Turismo."},
schober:{n:"Conditorei Schober",a:"Napfgasse 4",z:"A",r:"4,2",pos:[47.3726,8.5446],h:D7("09:00-19:00"),
 d:"Una pasticceria storica del Niederdorf, con sale rivestite di legno e velluto: la star della casa è la cioccolata calda con panna, accompagnata da torte e praline fatte in casa.",pr:"Una cioccolata calda con panna costa circa 8–10 CHF e una fetta di torta altrettanto (listino non visto). Orari da una guida di viaggio, da confermare."},
wolf:{n:"Bierhalle Wolf",a:"Limmatquai 132",z:"A",r:"4,0",pos:[47.3750,8.5436],h:["11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-00:00","11:00-00:00","11:00-22:00"],
 d:"Una grande birreria stile bavarese lungo la Limmat, con boccali enormi e una cucina semplice di piatti caldi: schnitzel, cordon bleu in varie versioni, spätzle e bratwurst, serviti con i pretzel. Il locale è vivace e rumoroso, con musica dal vivo.",pr:"Un piatto principale sta di solito sui 25–35 CHF (listino non visto). Orari dal sito di Zurigo Turismo."},
rheinfelder:{n:"Rheinfelder Bierhalle",a:"Niederdorfstrasse 76",z:"A",r:"4,0",pos:[47.3743,8.5446],h:D7("09:00-00:00"),
 d:"Una vera birreria del Niederdorf, senza turisti da cartolina: porzioni abbondanti di cucina svizzera casalinga, come il fegato di maiale (Schweinsleberli), la bratwurst, i rösti e i chnöpfli, e un cordon bleu gigantesco, che è la specialità della casa.",pr:"Piatti a 20–30 CHF, tra i più economici del centro (listino non visto). La cucina chiude alle 23:15; orari da una guida online, da confermare."},
oepfel:{n:"Restaurant Oepfelchammer",a:"Rindermarkt 12",z:"A",r:"4,2",pos:[47.3721,8.5440],h:["","11:30-14:00,18:00-00:00","11:30-14:00,18:00-00:00","11:30-14:00,18:00-00:00","11:30-14:00,18:00-00:00","11:30-00:00",""],
 d:"Un'osteria del 1801 in una casa a graticcio, con le travi di legno basse e la tradizione di arrampicarsi su un trave per bere un bicchiere a testa in giù. Serve piatti della cucina di Zurigo e specialità stagionali.",pr:"Un piatto sta di solito sui 25–40 CHF (listino non visto). Chiuso il lunedì e la domenica; orari dal sito di Zurigo Turismo."},
odeon:{n:"Café Bar Odeon",a:"Limmatquai 2",z:"C",r:"4,1",pos:[47.3667,8.5456],h:["07:00-00:00","07:00-00:00","07:00-00:00","07:00-00:00","07:00-00:00","09:00-00:00","09:00-00:00"],
 d:"Un caffè storico del 1912 vicino al Bellevue, con soffitti alti, specchi e una clientela di artisti e studenti: colazioni, caffè, torte e piatti semplici in una sala.",pr:"Un caffè con una fetta di torta sta sui 10–14 CHF; la colazione 12–20 CHF (listino non visto). Orari dal sito di Zurigo Turismo (apre fino alle 2 il venerdì e il sabato)."},
sternen:{n:"Sternen Grill",a:"Theaterstrasse 22",z:"C",r:"4,3",pos:[47.3664,8.5458],h:D7("11:00-20:00").map(function(x,i){return i===6?"":x}),
 d:"Il chiosco-grill della bratwurst di San Gallo, sempre pieno vicino al Bellevue: la salsiccia grande e grassa si mangia con un panino secco e senape, in piedi o ai tavolini. È il pranzo veloce tipico di Zurigo.",pr:"Una bratwurst con pane sta di solito sui 8–11 CHF (listino non visto). Orari dal sito di Switzerland Tourism: aperto da lunedì a sabato, la domenica non risulta; da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["schober","chuchi","odeon"],B:["spruengli","hiltl","schober"],C:["odeon","spruengli"],D:["hiltl","spruengli"]},
pra:{A:["rheinfelder","sternen","wolf"],B:["zeughaus","hiltl","sternen"],C:["sternen","wolf"],D:["hiltl","zeughaus"]},
cen:{A:["chuchi","oepfel","rheinfelder"],B:["zeughaus","hiltl","chuchi"],C:["wolf","chuchi","zeughaus"],D:["hiltl","zeughaus"]},
snk:{A:["schober","odeon"],B:["spruengli","schober"],C:["odeon","sternen"],D:["spruengli","hiltl"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"altstadt",t:"Altstadt, Grossmünster e Lindenhof",acts:["altstadt","grossmunster","lindenhof"],need:200,core:1},
{id:"banca",t:"Fraumünster, Bahnhofstrasse e lago",acts:["fraumunster","bahnhofstrasse","lago"],need:220,core:1},
{id:"musei",t:"Landesmuseum e Kunsthaus",acts:["landesmuseum","kunsthaus"],need:230,core:1},
{id:"uet",t:"Uetliberg",acts:["uetliberg"],need:180},
{id:"lindt",t:"Lindt Home of Chocolate",acts:["lindt"],need:150}
];
var ORDER=["altstadt","grossmunster","fraumunster","lindenhof","bahnhofstrasse","lago","kunsthaus","landesmuseum","uetliberg","lindt","poly"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["alt","Altstadt (Niederdorf e Limmatquai)",[47.3722,8.5442],"A"],
["bah","Bahnhofstrasse, Paradeplatz e Enge",[47.3690,8.5385],"B"],
["lag","Bellevue e Seefeld (lago)",[47.3660,8.5450],"C"],
["hb","Hauptbahnhof, Langstrasse e Zürich West",[47.3800,8.5350],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[47.3769,8.5417],""]
];
/* imposta di soggiorno: l'importo non è stato verificato, vedi taxNote */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Birchermüesli","il muesli svizzero con yogurt, mela grattugiata e frutta secca."],["Zopf mit Butter und Konfitüre","il pane intrecciato della domenica, con burro e marmellata."],["Heisse Schokolade mit Rahm","cioccolata calda con panna montata, la specialità dei caffè storici."]],
pra:[["Bratwurst mit Bürli","la salsiccia di San Gallo con un panino secco e senape."],["Rösti","il tortino di patate grattugiate, con uovo o formaggio."],["Eine Suppe des Tages","la zuppa del giorno, di solito con pane."],["Sandwich","un panino al formaggio o al prosciutto, da una panetteria."]],
cen:[["Zürcher Geschnetzeltes mit Rösti","straccetti di vitello in salsa di panna e funghi con i rösti: il piatto simbolo di Zurigo."],["Käsefondue","la fonduta di formaggio con pane, per due o più persone."],["Raclette","formaggio fuso su patate e sottaceti."],["Cordon bleu","cotoletta di vitello ripiena di prosciutto e formaggio."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Le due torri del Grossmünster","Foto","Dal lato opposto della Limmat, dal Münsterbrücke o dal Limmatquai, con le torri che si specchiano nel fiume.",[47.3706,8.5430],"Grossmünster, Zürich","grossmunster"],
["📷","Il Lindenhof e la Limmat","Foto","La vista dalla terrazza sul fiume, con i campanili sullo sfondo, al tramonto.",[47.3731,8.5412],"Lindenhof, Zürich","lindenhof"],
["📷","Le vetrate di Chagall","Foto","I colori delle vetrate nel coro del Fraumünster, soprattutto di mattina (controlla se la foto è consentita).",[47.3694,8.5412],"Fraumünster, Zürich","fraumunster"],
["🤳","Il campanile di St. Peter","Selfie","Il più grande quadrante d'orologio d'Europa, sulla chiesa di St. Peter, sopra i tetti della Altstadt.",[47.3714,8.5415],"St. Peter Zürich","altstadt"],
["📷","Il Niederdorf di sera","Foto","I vicoli illuminati e i palazzi colorati, con l'insegna dei locali che si accendono.",[47.3733,8.5444],"Niederdorfstrasse, Zürich","altstadt"],
["📷","Paradeplatz e i tram","Foto","I tram blu e bianchi davanti agli edifici delle banche, un classico di Zurigo.",[47.3697,8.5391],"Paradeplatz, Zürich","bahnhofstrasse"],
["📷","Il lago dal Bürkliplatz","Foto","Il lago, i battelli e le Alpi sullo sfondo nei giorni limpidi.",[47.3660,8.5413],"Bürkliplatz, Zürich","lago"],
["📷","Il Landesmuseum","Foto","Il castello neogotico accanto alla stazione, visto dalla Platzspitz.",[47.3790,8.5414],"Landesmuseum Zürich","landesmuseum"],
["📷","Zurigo dall'Uetliberg","Foto","La città, il lago e la catena delle Alpi dalla torre panoramica o dal belvedere.",[47.3494,8.4914],"Uetliberg, Zürich","uetliberg"],
["🤳","La Polyterrasse","Selfie","La terrazza dell'ETH con tutto il centro storico dietro di te.",[47.3764,8.5481],"Polyterrasse ETH Zürich","poly"],
["📷","La fontana di cioccolato","Foto","La fontana alta nove metri nel museo Lindt, con il cioccolato che scende.",[47.3218,8.5500],"Lindt Home of Chocolate, Kilchberg","lindt"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2029-12-31",t:"Grossmünster: lavori di restauro fino al 2029",x:"Dal gennaio 2025 al 2029 la chiesa è in restauro: alcune parti possono essere coperte da ponteggi o chiuse. La torre (Karlsturm) è visitabile, ma le terrazze sono chiuse per sicurezza. Controlla su zuerich.com prima di salire."},
{from:"2026-10-13",to:"2026-12-31",t:"Dal 13 dicembre i biglietti ZVV costano un po' di più",x:"Il consorzio dei trasporti di Zurigo (ZVV) aumenta le tariffe del 2,1% in media sui biglietti singoli dal cambio d'orario del 13 dicembre 2026 (fonte: Cantone di Zurigo). I prezzi indicati in questa guida sono quelli in vigore a ottobre 2026."},
{from:"2026-11-15",to:"2027-01-06",t:"Mercatini di Natale a Zurigo",x:"Di solito dalla seconda metà di novembre al 24 dicembre: il mercatino al coperto della stazione centrale, il «Wienachtsdorf» in Sechseläutenplatz e il Singing Christmas Tree in Werdmühleplatz (nel 2025 dal 20 novembre al 23–24 dicembre). Le date del 2026 non sono state verificate. Il centro è molto più affollato e gli alberghi più cari."},
{from:"2026-12-20",to:"2027-01-03",t:"Natale e Capodanno: orari ridotti",x:"Il 24 dicembre il Landesmuseum chiude alle 14, il Kunsthaus alle 16; il 25 dicembre il Kunsthaus è chiuso (e l'1 gennaio). In Svizzera i negozi sono chiusi la domenica e nei festivi: restano aperti solo i negozi della stazione centrale e dell'aeroporto."}
];
/* clima medio di Zurigo (indicativo, massime/minime) */
var CLIM=[[3,-2],[6,-2],[11,1],[16,4],[20,8],[24,12],[26,14],[26,14],[21,10],[15,6],[8,2],[4,-1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Zurigo: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="kunsthaus"&&WD===3)meta+=" Oggi è giovedì: il Kunsthaus resta aperto fino alle 20.";
if(it.id==="kunsthaus"&&WD===2)meta+=" Oggi è mercoledì: la collezione permanente del Kunsthaus è gratis per tutti.";
if(it.id==="grossmunster"&&WD===6)meta+=" Oggi è domenica: la torre apre solo dopo la funzione, intorno alle 12:30.";
if(it.id==="fraumunster"&&WD===6)meta+=" Oggi è domenica: la chiesa apre solo dopo la funzione, intorno alle 12.";
if(it.id==="bahnhofstrasse"&&WD===6)meta+=" Oggi è domenica: i negozi sono chiusi, restano aperti solo quelli della stazione centrale (Shopville).";
return meta}
Object.assign(C,{id:"zurigo",n:"Zurigo",cn:"Svizzera",e:"⌚",flag:"🇨🇭",col:["#d52b1e","#1f3a6b","#e8e8e8"],k:"zurigo zurich svizzera switzerland",
TZ:"Europe/Zurich",LL:[47.3769,8.5417],CC:"ch",QN:"Zurich",BK:"Zurich",ARE:/zürich|zurich|zurigo|\b80\d\d\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"de-CH",LANGN:"tedesco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"CHF",s:"CHF",e:1.073},hub:{n:"Hauptbahnhof",q:"Zürich Hauptbahnhof"},
SINGLE:{acts:["altstadt","grossmunster","fraumunster","lindenhof","bahnhofstrasse"],ins:[]},
EXCL:[],
DICON:{grossmunster:"⛪",fraumunster:"🪟",lindenhof:"🌳",bahnhofstrasse:"⌚",landesmuseum:"🏰",kunsthaus:"🖼️",lago:"⛵",poly:"🚡",uetliberg:"⛰️",lindt:"🍫"},
ZN:{A:"nella Altstadt",B:"a Bahnhofstrasse e Paradeplatz",C:"sul lago, a Bellevue",D:"alla stazione centrale"},
NEAR:{col:"caffè",pra:"chiosco o birreria",cen:"locale",snk:"caffè o pasticceria"},
SE:{zeughaus:"🍖",spruengli:"🍰",hiltl:"🥗",chuchi:"🧀",schober:"☕",wolf:"🍺",rheinfelder:"🍺",oepfel:"🍷",odeon:"☕",sternen:"🌭"},
TR:{one:5.0,cap:10.1,lbl:"Tram, bus e S-Bahn (ZVV)",
 air:{ZRH:{one:7.7,n:"Treno per l'aeroporto (biglietto 3 zone, 7,20 CHF)"}},
 passes:[
 {n:"Biglietto 24 ore (zone 1–2, in città)",d:1,max:1,p:10.1,note:"Il biglietto giornaliero ZVV per le zone 110 e vicine costa 9,40 CHF (circa 10,10 €) e vale su tram, bus, battelli del Limmat e treni della città per 24 ore dalla convalida. Non copre l'aeroporto né l'Uetliberg: per quelli ci vogliono 3 zone, 14,40 CHF (circa 15,40 €)."}],
 note:"Prezzi dal sito dello ZVV (tariffa in vigore a ottobre 2026), convertiti a 1 CHF = 1,07 €: corsa breve (Kurzstrecke, mezz'ora) 2,80 CHF (circa 3,00 €), corsa di un'ora a 1–2 zone 4,70 CHF (circa 5,00 €), a 3 zone 7,20 CHF (circa 7,70 €), biglietto giornaliero a 1–2 zone 9,40 CHF (circa 10,10 €), a 3 zone 14,40 CHF (circa 15,40 €). Dal 13 dicembre 2026 i prezzi salgono in media del 2,1%. Lo Zürich Card costa 29 CHF per 24 ore (circa 31 €) e 56 CHF per 72 ore (circa 60 €): comprende tutti i mezzi della città e dell'aeroporto, l'ingresso gratuito a molti musei (Kunsthaus, Landesmuseum), le chiese della Altstadt e la salita sull'Uetliberg, ma conviene solo se visiti due o tre musei al giorno. Il biglietto va comprato prima di salire; i controllori passano a campione e la multa è alta (circa 100 CHF, da controllare). Le macchinette accettano le carte; si può comprare anche con l'app ZVV o SBB Mobile."},
FOOD:{co:[11,"Colazione al caffè"],pr:[18,"Pranzo (bratwurst, buffet o piatto del giorno)"],ce:[32,"Cena (cucina svizzera)"],sp:[9,"Spuntini e dolci"]},
T:{doc:"Carta d'identità (valida per l'espatrio) o passaporto: la Svizzera è nello spazio Schengen ma non nell'UE",ride:"A piedi o in tram",move:"tutto a piedi o in tram",bags:"«Kann ich meine Koffer hier lassen?»",bagsPM:"«Kann ich meine Koffer bis heute Nachmittag hier lassen?»",bagsAM:"«Kann ich meine Koffer bis Mittag hier lassen?»",
pra:"Una bratwurst, un buffet o un locale veloce",praZ:{A:"Nel Niederdorf e lungo il Limmatquai molti ristoranti con il menù fuori sono per turisti e costano tanto: per mangiare spendendo meno cerca le birrerie e le vie laterali.",B:"Sulla Bahnhofstrasse i prezzi sono tra i più alti d'Europa: per il pranzo le soluzioni più economiche sono una bratwurst al chiosco o un buffet a peso."},
freeLong:"Qualche idea: una passeggiata sul lungolago fino al Zürichhorn, una sosta in una pasticceria con la cioccolata calda, una salita sulla Polyterrasse o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in una pasticceria con una cioccolata calda.",
remind:"In Svizzera si paga in franchi svizzeri (CHF), non in euro: il bancomat o la carta ti danno il cambio migliore. La domenica i negozi sono chiusi, tranne quelli della stazione centrale.",
rain1:"Al coperto: il Kunsthaus, il Landesmuseum, il Fraumünster con le vetrate di Chagall e le pasticcerie del centro.",
rainM:"Al coperto: Kunsthaus, Landesmuseum, Fraumünster, Grossmünster, Lindt Home of Chocolate e le pasticcerie del centro.",
water:"Riempite la borraccia: l'acqua del rubinetto di Zurigo arriva dal lago e dalle sorgenti ed è ottima. In città ci sono oltre 1.200 fontane con acqua potabile: attivate «Acqua» sulla mappa.",
kitchen:"A Zurigo si pranza tra le 11:30 e le 14 e si cena presto, dalle 18: molti ristoranti tradizionali chiudono tra i due servizi, e le cucine spesso chiudono verso le 22.",
night:[["🍫","Una cioccolata calda o un calice di vino bianco svizzero in un caffè storico è il modo di chiudere la giornata."],["🕙","Le cucine servono fino alle 22–23; i tram finiscono verso mezzanotte e mezza, poi nel fine settimana ci sono le linee notturne con un supplemento (circa 5 CHF)."],["☕","Molti caffè aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Zurigo ha lo stesso fuso orario dell'Italia",
plug:"Adattatore svizzero (tipo J): le spine a due poli sottili entrano, quelle italiane a tre poli no",
foodNote:"I prezzi in Svizzera sono tra i più alti d'Europa: i pasti sono stime per birrerie, buffet e pasticcerie. Una colazione sta intorno agli 11–15 € (12–16 CHF), una cena con un piatto principale intorno ai 30–40 € (28–38 CHF). Gli importi in franchi sono convertiti a 1 CHF = 1,07 €. Il servizio è già compreso nel conto. Quasi ovunque si paga con la carta; qualche chiosco e baracchino preferisce i contanti.",
taxNote:"A Zurigo esiste una piccola imposta di soggiorno per notte, di solito già compresa nel prezzo dell'alloggio. Non sono riuscito a verificare l'importo del 2026, quindi non è inclusa nei calcoli: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: almeno 4 stelle su Google, birrerie, pasticcerie e ristoranti tipici, niente catene. Orari dai siti di Zurigo Turismo (ottobre 2026); prezzi stimati in base a guide e menù, non letti sui siti dei locali: a Zurigo cambiano spesso, controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Dopo l'atterraggio il roaming del telefono non è più incluso: la Svizzera non fa parte dell'Unione europea, quindi i dati e le chiamate possono costare. Controlla il tuo operatore o attiva un pacchetto prima di partire.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara, ma ci sono fontanelle gratuite oltre i controlli."],
CHECK:[["tk","Biglietto per il treno dell'aeroporto (7,20 CHF) e biglietto giornaliero ZVV (9,40 CHF): si comprano alle macchinette o con l'app ZVV",function(E){return true}],["doc2","Roaming: la Svizzera non è nell'UE, controlla il piano dati del tuo operatore (o usa una eSIM)"],["chf","Qualche franco svizzero in contanti o una carta senza commissioni: gli euro non sono accettati quasi ovunque e il resto si dà in franchi"],["kun","Biglietto per il Kunsthaus (24 CHF, gratis la collezione di mercoledì)",["kunsthaus"]],["lnd","Biglietto per il Landesmuseum (13 CHF)",["landesmuseum"]],["gm","Biglietto della torre del Grossmünster (5 CHF, in cassa)",["grossmunster"]],["lin","Biglietto per Lindt Home of Chocolate con orario (17 CHF, meglio online)",["lindt"]],["card","Carta d'identità o passaporto in corso di validità"]],
NUM:{1:["ein","ain"],2:["zwei","tsvai"],3:["drei","drai"],4:["vier","fir"],5:["fünf","fünf"],6:["sechs","zeks"],7:["sieben","ZI-ben"],8:["acht","acht"],9:["neun","noin"],10:["zehn","tsen"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Grüezi / Guten Abend","GRÜ-e-tsi / GU-ten A-bent"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Einen Tisch für "+(N===1?"eine Person":nu[0])+", bitte","AI-nen tish für "+(N===1?"AI-ne per-ZON":nu[1])+", BIT-te"],["Una cioccolata calda e una fetta di torta, per favore","Eine heisse Schokolade und ein Stück Torte, bitte","AI-ne HAI-se sho-ko-LA-de unt ain shtük TOR-te, BIT-te"],["Acqua del rubinetto, per favore","Hahnenwasser, bitte","HA-nen-vas-ser, BIT-te"],["Il conto, per favore","Zahlen, bitte","TSA-len, BIT-te"],["Posso pagare con la carta?","Kann ich mit Karte zahlen?","kan ich mit KAR-te TSA-len"],["Quanto costa?","Was kostet das?","vas KOS-tet das"],["Dov'è la stazione?","Wo ist der Bahnhof?","vo ist der BAN-hof"],["Qual è il treno per l'aeroporto?","Welcher Zug fährt zum Flughafen?","VEL-cher tsug fert tsum FLUG-ha-fen"]];
if(M)fr=fr.concat([["Ho una prenotazione","Ich habe eine Reservierung","ich HA-be AI-ne re-ser-VI-rung"],["Posso lasciare i bagagli?","Kann ich meine Koffer hier lassen?","kan ich MAI-ne KOF-fer hir LAS-sen"],["A che ora è il check-out?","Um wie viel Uhr ist das Check-out?","um vi fil ur ist das tsek-AUT"]]);
return fr.concat([["Mi scusi","Entschuldigung","ent-SHUL-di-gung"],["Grazie mille!","Danke vielmals!","DAN-ke FIL-mals"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Zurigo: una piccola somma per persona e per notte, di solito già compresa nel prezzo che trovi sull'annuncio. Non ho potuto verificare l'importo 2026 e non è inclusa nei conti: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["Il tram, il bus e la S-Bahn si usano con lo stesso biglietto ZVV. I tram finiscono verso mezzanotte e mezza; nel fine settimana ci sono le linee notturne con un supplemento."],
ZONES:[
["🚋 Tram, treni e biglietti",["Un solo biglietto ZVV vale su tram, bus, battelli del Limmat e treni locali: la corsa di un'ora a 1–2 zone costa 4,70 CHF, il biglietto giornaliero 9,40 CHF e per l'aeroporto servono 3 zone (7,20 CHF).","Il biglietto si compra prima di salire, alle macchinette o con l'app ZVV: i controllori passano a campione e la multa è alta.","Zurigo è piccola: la maggior parte delle tappe si fa a piedi; per l'Uetliberg e la Lindt serve il treno.","Lo Zürich Card (29 CHF per 24 ore, 56 per 72) comprende i mezzi e l'ingresso a molti musei: conviene solo con due o tre musei al giorno."]],
["⛪ Altstadt: Grossmünster e Fraumünster",["Il Grossmünster e il Fraumünster sono uno di fronte all'altro, ai due lati della Limmat: li vedi in meno di un'ora, ma la torre costa 5 CHF.","Le vetrate di Chagall sono al Fraumünster (5 CHF); nei giorni di funzione la visita può essere limitata.","Il Lindenhof è la terrazza dove nacque Zurigo: salita facile e vista bellissima sul fiume.","Il Grossmünster è in restauro fino al 2029: possono esserci ponteggi."],["grossmunster","fraumunster","lindenhof","altstadt"]],
["⌚ Bahnhofstrasse e il lago",["La Bahnhofstrasse è il viale degli orologi e delle banche: si cammina in un quarto d'ora, dalla stazione al lago.","La Confiserie Sprüngli a Paradeplatz è il posto dei Luxemburgerli, i piccoli macaron della casa.","Il Bürkliplatz è il punto di partenza dei battelli: i giri sul lago durano da 1 a 2 ore e non sono economici.","La domenica i negozi sono chiusi, ma la passeggiata sul lago è piena di zurighesi."],["bahnhofstrasse","lago"]],
["🖼️ Kunsthaus e Landesmuseum",["Il Kunsthaus è chiuso il lunedì, il giovedì resta aperto fino alle 20 e il mercoledì la collezione permanente è gratis.","Il Landesmuseum è accanto alla stazione: se arrivi in treno, è un'ottima prima tappa. È chiuso il lunedì.","Per il Kunsthaus calcola un paio d'ore: la collezione di arte moderna è grande."],["kunsthaus","landesmuseum"]],
["⛰️ Uetliberg e Lindt",["Per l'Uetliberg il treno S10 parte ogni mezz'ora dalla stazione centrale: la cima è a 10 minuti a piedi dalla stazione, molto facile.","Il Lindt Home of Chocolate è a Kilchberg, a sud del lago: calcola mezza giornata andata e ritorno.","Il battello dal Bürkliplatz alla Lindt è la via più bella ma più lenta (circa 45 minuti)."],["uetliberg","lindt"]],
["🌅 Un giorno fuori Zurigo",["Lucerna è a 45 minuti di treno dalla stazione centrale (viaggio diretto).","Le cascate del Reno a Sciaffusa si raggiungono in circa un'ora di treno.","Basilea è a un'ora circa di treno diretto."]]],
WTIPS:["L'acqua del rubinetto di Zurigo è ottima e si beve ovunque: chiedila come «Hahnenwasser» (nei ristoranti però di solito si paga).","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap; la città ha oltre 1.200 fontane con acqua potabile.","Molti negozi riempiono la borraccia se la chiedi gentilmente.","Le fontane dove c'è scritto «Kein Trinkwasser» non sono da bere."],
GEN:["La Svizzera fa parte dello spazio Schengen ma non dell'Unione europea: per entrare basta la carta d'identità valida per l'espatrio o il passaporto, ma la dogana per le merci c'è.","La moneta è il franco svizzero (CHF): 1 CHF vale circa 1,07 €. Quasi ovunque si paga con la carta; molti negozi accettano gli euro solo con un cambio sfavorevole e danno il resto in franchi.","Il servizio è compreso nel conto, ma si lascia volentieri un piccolo arrotondamento (5–10%) per un buon servizio.","La domenica e nei festivi quasi tutti i negozi sono chiusi; restano aperti i ristoranti, i musei e i negozi della stazione centrale e dell'aeroporto.","Zurigo ha lo stesso fuso orario dell'Italia. Si parla svizzero tedesco: in città quasi tutti capiscono l'inglese e parlano bene il tedesco standard; l'italiano si sente poco.","I prezzi sono tra i più alti d'Europa: un caffè costa circa 4–5 CHF e una cena 30–45 CHF.","Il roaming dell'UE non vale in Svizzera: controlla il piano dati del tuo operatore.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (numero unico europeo, risponde anche in italiano); <a class="call" href="tel:117">117</a> polizia, <a class="call" href="tel:144">144</a> ambulanza, <a class="call" href="tel:118">118</a> vigili del fuoco.</li><li>🚋 Trasporti pubblici: <a href="https://www.zvv.ch/" target="_blank" rel="noopener">zvv.ch</a> · treni e oggetti smarriti: <a href="https://www.sbb.ch/" target="_blank" rel="noopener">sbb.ch</a>.</li><li>🇮🇹 Consolato generale d\'Italia a Zurigo: <a href="https://conszurigo.esteri.it" target="_blank" rel="noopener">conszurigo.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Zurigo; in Svizzera sono rari e quasi sempre preannunciati. Nei giorni prima controllate <a href="https://www.zvv.ch/" target="_blank" rel="noopener">zvv.ch</a> e, per i treni, <a href="https://www.sbb.ch/" target="_blank" rel="noopener">sbb.ch</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V86 Q40 64 90 74 Q140 84 160 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M36 76 V48 H40 V76 Z M33 48 H43 V44 H33 Z M36 44 V36 H40 V44 Z"/></g>'+
'<g style="--k:2"><path d="M76 106 V82 H112 V106 Z M72 82 H116 L94 70 Z M120 106 V56 H130 V106 Z M118 56 H132 L125 12 Z"/></g>'+
'<g style="--k:3"><path d="M160 106 V52 H178 V106 Z M158 52 Q169 28 180 52 Z M194 106 V52 H212 V106 Z M192 52 Q203 28 214 52 Z M178 106 V78 H194 V106 Z M176 78 H196 L186 68 Z"/></g>'+
'<g style="--k:4"><path d="M236 106 V84 H262 V106 Z M234 84 H264 L249 72 Z M268 106 V60 H286 V106 Z M266 60 H288 L277 28 Z"/></g>'+
'<g style="--k:5"><path d="M304 106 V38 H320 V106 Z M307 38 V32 H317 V38 Z M310 32 V26 H314 V32 Z"/></g>'+
'<g style="--k:6"><path d="M346 98 V72 L366 98 Z M342 100 H370 L366 104 H346 Z M378 98 V82 L388 98 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M169 70 v10 M203 70 v10 M274 44 v8 M270 48 h8"/><path d="M326 100 h20 M372 102 h24"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="30" cy="14" r="1.6"/><circle cx="100" cy="14" r="1.3"/><circle cx="150" cy="18" r="1.3"/><circle cx="226" cy="20" r="1.3"/><circle cx="300" cy="12" r="1.3"/><circle cx="388" cy="18" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.zurigo);
