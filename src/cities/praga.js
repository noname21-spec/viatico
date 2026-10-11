/* ===== Praga (dati verificati l'11 ottobre 2026; 1 € ≈ 24,4 CZK) ===== */
window.CITIES=window.CITIES||{};
CITIES.praga=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
PRG:{n:"Praga Václav Havel (PRG)",s:"Prague Václav Havel",url:"https://www.prg.aero/en",live:"Praga",inMin:45,buf:120,pos:[50.1008,14.2600],sd:"Aeroporto PRG · filobus e metro",rt:"Dall'aeroporto: filobus 59 fino a Nádraží Veleslavín, poi metro A fino a Můstek.",
 arr:"Dall'Italia si arriva al Terminal 2 (voli Schengen) e non c'è controllo passaporti. Fuori dall'uscita, davanti all'atrio arrivi, trovi le fermate dei mezzi pubblici. Il filobus 59 va in circa 15 minuti a Nádraží Veleslavín, dove si cambia con la metro A (linea verde): Staroměstská, la Città Vecchia, è a 5 fermate e Můstek, in cima a Piazza Venceslao, a 6. In tutto sono circa 40–45 minuti. In alternativa, l'Airport Express (AE) è un autobus diretto alla stazione centrale (Hlavní nádraží), circa 35–45 minuti, ma costa molto di più.",
 tk:"Biglietto: serve il biglietto da 90 minuti (50 corone, circa 2,05 €; 46 corone nell'app PID Lítačka, secondo il sito PID), valido per filobus e metro con il cambio; va convalidato appena salito sul filobus, non ai tornelli della metro. L'Airport Express non è compreso nei biglietti da 24 e 72 ore e costa 200 corone (circa 8,20 €), secondo il sito PID. Si compra alle macchinette gialle, nell'app o dall'autista.",
 gm:"Letiště Václava Havla Praha, Terminál 2",
 tips:["Il filobus 59 passa ogni pochi minuti: per il centro è il collegamento più rapido ed economico.","Il biglietto da 90 minuti vale anche per cambiare con tram e metro: se vai subito all'alloggio non serve comprarne un altro.","Evita i taxi non prenotati e i cambiavalute dell'aeroporto: usa un'app (Bolt, Uber) o il filobus, e preleva corone a un bancomat di una banca."]}
};
/* linee (tracciati indicativi) */
var SEG={
bus59:{c:"#8b5e3c",n:"Filobus 59 dall'aeroporto",p:[[50.1008,14.2600,"Aeroporto",2],[50.0990,14.3500,"Nádraží Veleslavín",2]]},
ma:{c:"#00a562",n:"Metro A (linea verde)",p:[[50.0990,14.3500,"Nádraží Veleslavín",2],[50.0985,14.3626,"Bořislavka"],[50.1003,14.3935,"Dejvická",2],[50.0969,14.4040,"Hradčanská",2],[50.0911,14.4098,"Malostranská",2],[50.0881,14.4172,"Staroměstská",2],[50.0840,14.4247,"Můstek",2],[50.0790,14.4300,"Muzeum",2],[50.0753,14.4378,"Náměstí Míru",2],[50.0783,14.4500,"Jiřího z Poděbrad",2]]},
mc:{c:"#ed1c24",n:"Metro C (linea rossa)",p:[[50.0790,14.4300,"Muzeum",2],[50.0734,14.4308,"I. P. Pavlova"],[50.0612,14.4304,"Vyšehrad",2]]},
t22:{c:"#b8403a",n:"Tram 22",p:[[50.0911,14.4098,"Malostranská",2],[50.0885,14.4040,"Malostranské náměstí",2],[50.0905,14.3965,"Pražský hrad",2]]},
fun:{c:"#c49b1b",n:"Funicolare di Petřín",p:[[50.0810,14.4054,"Újezd",2],[50.0834,14.3957,"Petřín",2]]}
};
var START=[50.0840,14.4247];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
starom:{t:"Piazza della Città Vecchia e Orloj",z:"A",p:1,min:50,id:70,max:110,pos:[50.0875,14.4213],q:"Staroměstské náměstí, Praha",cls:"walk",sun:1,
 d:"Il cuore medievale di Praga: la piazza con la chiesa gotica di Týn dalle due guglie nere, il Municipio con l'Orologio Astronomico (Orloj) del Quattrocento e il monumento a Jan Hus. Alle ore piene i dodici apostoli sfilano nelle finestrelle dell'Orloj.",
 m:"La piazza è gratuita. L'Orloj «suona» ogni ora intera dalle 9 alle 23 (dal sito ufficiale della città): arriva 10 minuti prima per trovare posto. Si può salire sulla torre del Municipio per la vista, con un biglietto a parte (prezzo da controllare sul sito del Municipio). Il «trdelník» non è un dolce ceco: arriva dall'Europa centrale ed è venduto soprattutto ai turisti."},
karlov:{t:"Ponte Carlo e Malá Strana",z:"B",p:1,min:60,id:90,max:140,pos:[50.0865,14.4115],q:"Karlův most, Praha",cls:"walk",sun:1,
 d:"Il ponte gotico del Trecento con trenta statue di santi, sempre pieno di artisti di strada. Oltre la Torre, il quartiere di Malá Strana (Piccolo Quartiere) ha le case barocche, il Muro di Lennon e l'isola di Kampa con il suo parco sulla Moldava.",
 m:"Il ponte è aperto sempre e gratuito: all'alba (prima delle 8) o al tramonto è molto più tranquillo. Fai attenzione ai borseggiatori nella calca. Nel Muro di Lennon si può lasciare un messaggio, ma è vietato fare graffiti con la bomboletta."},
hrad:{t:"Castello di Praga e Cattedrale di San Vito",z:"B",p:1,min:150,id:180,max:240,pos:[50.0905,14.4005],q:"Pražský hrad, Praha",cls:"",sun:1,tk:[18.4,"Percorso principale del Castello (450 corone)",1,1],
 win:function(wd){return[(wd===6?12:9)*60,16*60]},
 d:"Il complesso di palazzi più grande d'Europa, sulla collina sopra la Moldava: la Cattedrale di San Vito con le vetrate di Mucha, l'Antico Palazzo Reale, la Basilica di San Giorgio e il Vicolo d'Oro. I cortili e i giardini si visitano gratis; per gli edifici serve il biglietto.",
 m:"Il percorso principale costa 450 corone (circa 18,40 €) e vale 2 giorni; ridotto 300 corone. Il Castello esterno è aperto ogni giorno dalle 6 alle 22; gli edifici storici dalle 9 alle 17 da aprile a ottobre e dalle 9 alle 16 da novembre a marzo (dati dal sito del Castello, via guide). La domenica la Cattedrale apre a mezzogiorno per le funzioni: l'orario può cambiare per eventi di stato, controlla hrad.cz. Il cambio della guardia è ogni giorno a mezzogiorno nel primo cortile."},
josef:{t:"Josefov: il quartiere ebraico",z:"A",p:2,min:75,id:100,max:150,pos:[50.0902,14.4180],q:"Staronová synagoga, Praha",cls:"",cl:[5],sun:1,
 win:function(){return[9*60,16*60+30]},
 d:"Il più antico quartiere ebraico d'Europa, con la Sinagoga Vecchio-Nuova del Duecento ancora in uso, la Sinagoga Pinkas con i nomi di 80.000 vittime dell'Olocausto e il Vecchio Cimitero Ebraico, dove le lapidi si sovrappongono su dodici strati.",
 m:"È chiuso il sabato e nelle feste ebraiche. Gli orari del Museo Ebraico sono, di norma, dalle 9 alle 18 da aprile a ottobre e dalle 9 alle 16:30 da novembre a marzo (domenica–venerdì): io ho preso il più prudente. Il biglietto costa più di 15 € (prezzo non letto sul sito: controlla jewishmuseum.cz) e la Sinagoga Vecchio-Nuova si paga a parte."},
vaclav:{t:"Piazza Venceslao e Nové Město",z:"C",p:3,min:50,id:80,max:120,pos:[50.0813,14.4264],q:"Václavské náměstí, Praha",cls:"walk",sun:1,
 d:"Il lungo viale che sale fino al Museo Nazionale, con la statua di San Venceslao a cavallo: qui sono nati molti momenti della storia ceca, dalla Rivoluzione di Velluto del 1989 in poi. Intorno sono le passerelle Art Nouveau e gli ingressi dei passaggi coperti della Nové Město.",
 m:"La piazza è un viale e si cammina gratis. Il Museo Nazionale in cima è aperto di norma tutti i giorni (orari e prezzi da controllare su nm.cz). Il bazar di oggetti e i locali sul viale sono molto turistici: i posti buoni sono nelle vie laterali."},
petrin:{t:"Collina di Petřín e funicolare",z:"B",p:3,min:90,id:120,max:170,pos:[50.0834,14.3957],q:"Petřínská rozhledna, Praha",cls:"",sun:1,
 d:"La collina verde che domina Malá Strana, con la torre panoramica ispirata alla Tour Eiffel e un giardino di rose. Si sale in funicolare dalla fermata Újezd e la vista sulla città, sul Castello e sul fiume è tra le più belle.",
 m:"La funicolare è un mezzo pubblico: di norma vale il biglietto dei mezzi (controlla sul sito DPP se è in funzione: a volte chiude per manutenzione). La salita sulla torre si paga a parte (pochi euro, prezzo da controllare) e gli orari variano con la stagione. Con il bel tempo vale la pena restare fino al tramonto."},
vysehrad:{t:"Vyšehrad e la Casa Danzante",z:"C",p:4,min:70,id:100,max:150,pos:[50.0644,14.4181],q:"Vyšehrad, Praha",cls:"walk",multi:1,sun:1,
 d:"La seconda fortezza di Praga, su una rupe sopra la Moldava: la Basilica dei Santi Pietro e Paolo, i bastioni con vista sul fiume e il cimitero dove riposano Dvořák, Smetana e Mucha. Lungo il fiume si passa davanti alla Casa Danzante di Frank Gehry.",
 m:"La fortezza e i giardini sono gratuiti e aperti tutto il giorno. La basilica e il cimitero hanno un biglietto o un'offerta a parte (pochi euro, orari da controllare). Per tornare si cammina in discesa fino alla metro C Vyšehrad."},
letna:{t:"Letná e il Metronomo",z:"F",p:4,min:60,id:90,max:130,pos:[50.0961,14.4153],q:"Letenské sady, Praha",cls:"walk",multi:1,sun:1,
 d:"Un parco panoramico sopra la Moldava, proprio sul punto dove un tempo c'era l'enorme statua di Stalin: oggi c'è un metronomo gigante e dal belvedere si vedono i ponti, la Città Vecchia e il Castello.",
 m:"Il parco è gratuito e aperto sempre. La birreria all'aperto (Letenský zámeček e il Beer Garden) è aperta di norma da primavera a ottobre, con il bel tempo. Da qui si torna alla Città Vecchia a piedi attraverso il ponte Čechův."},
zizkov:{t:"Torre televisiva di Žižkov e Vinohrady",z:"D",p:5,min:75,id:110,max:150,pos:[50.0806,14.4503],q:"Žižkovská věž, Praha",cls:"",multi:1,sun:1,
 d:"La torre della televisione di 216 metri, il simbolo più discusso di Praga, con dieci bambini giganti di David Černý che si arrampicano sul fusto; a Vinohrady, il quartiere più verde, ci sono palazzi Art Nouveau e il parco Riegrovy sady, con vista sulla città.",
 m:"La piattaforma panoramica si paga (circa 15 €, prezzo non letto sul sito: controlla towerpark.cz). Riegrovy sady ha una birreria all'aperto, aperta con il bel tempo."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","starom",8,"walk","A piedi per Melantrichova e Havelská, tra le bancarelle e i palazzi, fino a Piazza della Città Vecchia, circa 8 minuti.","A piedi per Melantrichova fino a Můstek, circa 8 minuti.",{f:[W([[50.0840,14.4247],[50.0860,14.4230],[50.0875,14.4213]])],r:[W([[50.0875,14.4213],[50.0860,14.4230],[50.0840,14.4247]])]});
P2("start","vaclav",8,"walk","A piedi, Můstek è la base di Piazza Venceslao: salendo il viale si arriva al Museo Nazionale in circa 12 minuti.","A piedi in discesa fino a Můstek, circa 8 minuti.",{f:[W([[50.0840,14.4247],[50.0813,14.4264]])],r:[W([[50.0813,14.4264],[50.0840,14.4247]])]});
P2("start","josef",14,"walk","A piedi per Celetná e Piazza della Città Vecchia fino a Josefov, circa 14 minuti.","A piedi per Piazza della Città Vecchia fino a Můstek, circa 14 minuti.",{f:[W([[50.0840,14.4247],[50.0875,14.4213],[50.0902,14.4180]])],r:[W([[50.0902,14.4180],[50.0875,14.4213],[50.0840,14.4247]])]});
P2("start","karlov",16,"metro","Metro A da Můstek a Staroměstská (2 minuti), poi 8 minuti a piedi per Karlova fino al Ponte Carlo.","A piedi fino a Staroměstská (8 minuti) e metro A fino a Můstek (2 minuti).",{f:[["ma","Můstek","Staroměstská"],W([[50.0881,14.4172],[50.0865,14.4115]])],r:[W([[50.0865,14.4115],[50.0881,14.4172]]),["ma","Staroměstská","Můstek"]]});
P2("start","hrad",30,"tram","Metro A da Můstek a Malostranská (circa 5 minuti), poi tram 22 fino alla fermata Pražský hrad (circa 10 minuti).","Tram 22 dalla fermata Pražský hrad a Malostranská e metro A fino a Můstek, in tutto circa 25 minuti.",{f:[["ma","Můstek","Malostranská"],["t22","Malostranská","Pražský hrad"]],r:[["t22","Pražský hrad","Malostranská"],["ma","Malostranská","Můstek"]]});
P2("start","petrin",25,"tram","A piedi fino a Národní třída (5 minuti), tram 9, 12, 20 o 22 fino a Újezd (circa 7 minuti), poi la funicolare fino in cima.","Funicolare fino a Újezd, tram fino a Národní třída e 5 minuti a piedi fino a Můstek.",{f:[W([[50.0840,14.4247],[50.0818,14.4204],[50.0810,14.4054]]),["fun","Újezd","Petřín"]],r:[["fun","Petřín","Újezd"],W([[50.0810,14.4054],[50.0818,14.4204],[50.0840,14.4247]])]});
P2("start","vysehrad",24,"metro","Metro A da Můstek a Muzeum (2 minuti), metro C fino a Vyšehrad (circa 6 minuti), poi 10 minuti a piedi.","Metro C da Vyšehrad a Muzeum e metro A fino a Můstek, circa 15 minuti.",{f:[["ma","Můstek","Muzeum"],["mc","Muzeum","Vyšehrad"],W([[50.0612,14.4304],[50.0644,14.4181]])],r:[W([[50.0644,14.4181],[50.0612,14.4304]]),["mc","Vyšehrad","Muzeum"],["ma","Muzeum","Můstek"]]});
P2("start","letna",28,"metro","Metro A da Můstek a Staroměstská (2 minuti), poi 15 minuti a piedi attraverso il ponte Čechův fino al parco Letná.","A piedi dal Metronomo fino a Staroměstská e metro A fino a Můstek.",{f:[["ma","Můstek","Staroměstská"],W([[50.0881,14.4172],[50.0930,14.4150],[50.0961,14.4153]])],r:[W([[50.0961,14.4153],[50.0930,14.4150],[50.0881,14.4172]]),["ma","Staroměstská","Můstek"]]});
P2("start","zizkov",22,"metro","Metro A da Můstek a Jiřího z Poděbrad (circa 8 minuti), poi 10 minuti a piedi fino alla torre di Žižkov.","Dalla torre a piedi fino a Jiřího z Poděbrad e metro A fino a Můstek, circa 20 minuti.",{f:[["ma","Můstek","Jiřího z Poděbrad"],W([[50.0783,14.4500],[50.0806,14.4503]])],r:[W([[50.0806,14.4503],[50.0783,14.4500]]),["ma","Jiřího z Poděbrad","Můstek"]]});
P2("starom","josef",6,"walk","A piedi per Pařížská, il viale con i negozi di lusso, circa 6 minuti.","A piedi fino a Piazza della Città Vecchia, circa 6 minuti.",{f:[W([[50.0875,14.4213],[50.0890,14.4195],[50.0902,14.4180]])],r:[W([[50.0902,14.4180],[50.0890,14.4195],[50.0875,14.4213]])]});
P2("starom","karlov",14,"walk","A piedi per Karlova, la via stretta e piena di negozi che porta al Ponte Carlo, circa 14 minuti.","A piedi per Karlova fino a Piazza della Città Vecchia, circa 14 minuti.",{f:[W([[50.0875,14.4213],[50.0868,14.4170],[50.0865,14.4115]])],r:[W([[50.0865,14.4115],[50.0868,14.4170],[50.0875,14.4213]])]});
P2("josef","karlov",12,"walk","A piedi lungo il fiume fino al Ponte Carlo, circa 12 minuti.","A piedi lungo il fiume fino a Josefov, circa 12 minuti.",{f:[W([[50.0902,14.4180],[50.0885,14.4140],[50.0865,14.4115]])],r:[W([[50.0865,14.4115],[50.0885,14.4140],[50.0902,14.4180]])]});
P2("karlov","hrad",25,"walk","A piedi per la via Mostecká e per Nerudova, in salita fino al Castello, circa 25 minuti. In alternativa il tram 22 da Malostranské náměstí.","A piedi in discesa per Nerudova fino al Ponte Carlo, circa 20 minuti.",{f:[W([[50.0865,14.4115],[50.0885,14.4065],[50.0893,14.4030],[50.0905,14.4005]])],r:[W([[50.0905,14.4005],[50.0893,14.4030],[50.0885,14.4065],[50.0865,14.4115]])]});
P2("karlov","petrin",25,"walk","A piedi per Kampa e Újezd, circa 15 minuti; poi la funicolare fino in cima (circa 10 minuti con la fila).","Funicolare in discesa fino a Újezd e 15 minuti a piedi fino al Ponte Carlo.",{f:[W([[50.0865,14.4115],[50.0840,14.4090],[50.0810,14.4054]]),["fun","Újezd","Petřín"]],r:[["fun","Petřín","Újezd"],W([[50.0810,14.4054],[50.0840,14.4090],[50.0865,14.4115]])]});
P2("hrad","petrin",25,"walk","A piedi per il monastero di Strahov e il parco, circa 25 minuti, tutti in discesa o in piano.","A piedi per il parco di Petřín e il monastero di Strahov fino al Castello, circa 30 minuti in salita.",{f:[W([[50.0905,14.4005],[50.0870,14.3950],[50.0834,14.3957]])],r:[W([[50.0834,14.3957],[50.0870,14.3950],[50.0905,14.4005]])]});
P2("starom","vaclav",12,"walk","A piedi per Melantrichova e Václavské náměstí, circa 12 minuti.","A piedi fino alla Piazza della Città Vecchia, circa 12 minuti.",{f:[W([[50.0875,14.4213],[50.0840,14.4247],[50.0813,14.4264]])],r:[W([[50.0813,14.4264],[50.0840,14.4247],[50.0875,14.4213]])]});
P2("vaclav","vysehrad",22,"metro","Metro A da Můstek a Muzeum e metro C fino a Vyšehrad, poi 10 minuti a piedi.","Metro C da Vyšehrad a Muzeum, circa 8 minuti.",{f:[W([[50.0813,14.4264],[50.0790,14.4300]]),["mc","Muzeum","Vyšehrad"],W([[50.0612,14.4304],[50.0644,14.4181]])],r:[W([[50.0644,14.4181],[50.0612,14.4304]]),["mc","Vyšehrad","Muzeum"],W([[50.0790,14.4300],[50.0813,14.4264]])]});
P2("letna","starom",20,"walk","A piedi dal Metronomo giù per la scalinata e attraverso il ponte Čechův fino alla Piazza della Città Vecchia, circa 20 minuti.","A piedi per il ponte Čechův e in salita fino a Letná, circa 25 minuti.",{f:[W([[50.0961,14.4153],[50.0930,14.4150],[50.0900,14.4170],[50.0875,14.4213]])],r:[W([[50.0875,14.4213],[50.0900,14.4170],[50.0930,14.4150],[50.0961,14.4153]])]});
P2("letna","josef",15,"walk","A piedi per il ponte Čechův fino a Josefov, circa 15 minuti.","A piedi per il ponte Čechův fino al parco Letná, circa 20 minuti.",{f:[W([[50.0961,14.4153],[50.0930,14.4150],[50.0902,14.4180]])],r:[W([[50.0902,14.4180],[50.0930,14.4150],[50.0961,14.4153]])]});
/* ritorno in aeroporto: dal centro con metro A e filobus 59 */
var RET={
PRG:{
 A:{min:50,txt:"Metro A da Můstek fino a Nádraží Veleslavín (circa 14 minuti, direzione Nemocnice Motol), poi filobus 59 fino all'aeroporto (circa 15 minuti). Un solo biglietto da 90 minuti, 50 corone (circa 2,05 €), vale per entrambi.",g:[["ma","Můstek","Nádraží Veleslavín"],["bus59","Nádraží Veleslavín","Aeroporto"]]}}
};
var ARR={
PRG:[["bus59","Aeroporto","Nádraží Veleslavín"],["ma","Nádraží Veleslavín","Můstek"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
bakeshop:{n:"Bakeshop Praha",a:"Kozí 1",z:"A",r:"4,5",pos:[50.0904,14.4222],h:D7("07:00-19:00"),
 d:"Una panetteria con caffè a due passi da Piazza della Città Vecchia: pane, croissant, panini e dolci da forno cechi per una colazione veloce, anche da portare via.",pr:"Una colazione intorno ai 5–8 € (listino non visto). Orari da guide, da confermare."},
lokal:{n:"Lokál Dlouhááá",a:"Dlouhá 33",z:"A",r:"4,4",pos:[50.0897,14.4252],h:["11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30","11:00-23:30"],
 d:"Una birreria-trattoria ceca nel centro, con la birra spillata fresca e i piatti della tradizione: gulasch, svíčková, formaggio fritto. Si ordina al banco, i tavoli sono lunghi e condivisi.",pr:"Un piatto principale costa di solito 8–12 € e una birra circa 2 € (listino non visto). Orari da guide: controlla prima di andare."},
nasemaso:{n:"Naše maso",a:"Dlouhá 39",z:"A",r:"4,5",pos:[50.0903,14.4254],h:["11:00-20:00","11:00-20:00","11:00-20:00","11:00-20:00","11:00-20:00","11:00-20:00",""],
 d:"Una macelleria con ristorante dove si mangia un hamburger di manzo ceco o un panino con carne al banco: poche cose, fatte bene, e prezzi onesti per il centro.",pr:"Un hamburger con patatine sta intorno ai 8–12 € (listino non visto). Orari da guide, da confermare."},
louvre:{n:"Café Louvre",a:"Národní 22",z:"C",r:"4,2",pos:[50.0818,14.4204],h:["08:00-23:30","08:00-23:30","08:00-23:30","08:00-23:30","08:00-23:30","09:00-23:30","09:00-23:30"],
 d:"Il caffè storico del 1902 che frequentarono Kafka e Einstein: sale alte con i lampadari, biliardo e un menù ceco semplice. La colazione e il caffè con una torta sono i momenti migliori.",pr:"Una colazione intorno ai 8–12 € e un piatto del giorno sui 10–14 € (listino non visto). Orari da guide, da confermare."},
savoy:{n:"Café Savoy",a:"Vítězná 5",z:"B",r:"4,4",pos:[50.0801,14.4086],h:["08:00-22:30","08:00-22:30","08:00-22:30","08:00-22:30","08:00-22:30","09:00-22:30","09:00-22:30"],
 d:"Un caffè neorinascimentale di Malá Strana con soffitti dipinti e una pasticceria interna: colazioni abbondanti, dolci e pane fatto in casa. A pochi passi dalla funicolare di Petřín.",pr:"Una colazione intorno ai 10–14 € (listino non visto). Orari da guide, da confermare."},
bilek:{n:"Lokál U Bílé kuželky",a:"Míšeňská 12",z:"B",r:"4,3",pos:[50.0884,14.4066],h:D7("11:00-23:30"),
 d:"La birreria-trattoria di Malá Strana, a due passi dal Ponte Carlo: stesso stile di Lokál, con cucina ceca, birra Pilsner spillata e tavoli lunghi.",pr:"Un piatto sta intorno ai 8–12 € (listino non visto). Orari da guide: controlla prima di andare."},
kantyna:{n:"Kantýna",a:"Politických vězňů 5",z:"C",r:"4,5",pos:[50.0832,14.4286],h:["11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00"],
 d:"Una mensa-macelleria nel centro: si prende un vassoio e si ordina la carne al banco, tagliata e cotta al momento, con contorni e birra. Sempre piena di praghesi.",pr:"Un pasto con carne e contorno sta intorno ai 10–14 € (listino non visto). Orari da guide, da confermare."},
imperial:{n:"Café Imperial",a:"Na Poříčí 15",z:"C",r:"4,3",pos:[50.0894,14.4339],h:D7("07:30-23:00"),
 d:"Un caffè-ristorante Art Nouveau con le pareti coperte di piastrelle di ceramica e il soffitto a mosaico: il posto per una colazione elegante senza spendere molto.",pr:"Una colazione costa di solito 10–14 € (listino non visto). Orari da guide, da confermare."},
kmotra:{n:"Kmotra",a:"V Jirchářích 12",z:"C",r:"4,3",pos:[50.0818,14.4172],h:D7("11:00-24:00"),
 d:"Una trattoria ceca nel sottosuolo vicino al Teatro Nazionale, con la cucina della nonna: zuppe, pizza sottile alla ceca e piatti di carne con i canederi, a prezzi da locali.",pr:"Un piatto sta intorno ai 8–12 € (listino non visto). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["bakeshop","louvre"],B:["savoy","bakeshop"],C:["louvre","imperial"],D:["imperial","louvre"],F:["bakeshop","louvre"]},
pra:{A:["lokal","nasemaso","bakeshop"],B:["bilek","savoy","lokal"],C:["kantyna","kmotra","louvre"],D:["kantyna","kmotra","imperial"],F:["lokal","nasemaso","kantyna"]},
cen:{A:["lokal","nasemaso","bilek"],B:["bilek","lokal"],C:["kmotra","kantyna","lokal"],D:["kmotra","kantyna","lokal"],F:["lokal","kmotra","nasemaso"]},
snk:{A:["bakeshop","nasemaso"],B:["savoy","bakeshop"],C:["imperial","louvre"],D:["imperial","bakeshop"],F:["bakeshop","louvre"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"stare",t:"Città Vecchia e Josefov",acts:["starom","josef"],need:170,core:1,cl:[5]},
{id:"hrad",t:"Ponte Carlo e Castello",acts:["karlov","hrad"],need:290,core:1},
{id:"nove",t:"Piazza Venceslao, Vyšehrad e Žižkov",acts:["vaclav","vysehrad","zizkov"],need:260},
{id:"verdi",t:"Petřín e Letná",acts:["petrin","letna"],need:200}
];
var ORDER=["starom","karlov","hrad","josef","vaclav","petrin","vysehrad","letna","zizkov"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["stare","Staré Město (Città Vecchia)",[50.0875,14.4213],"A"],
["mala","Malá Strana",[50.0880,14.4040],"B"],
["nove","Nové Město",[50.0800,14.4240],"C"],
["vino","Vinohrady / Žižkov",[50.0770,14.4500],"D"],
["holes","Holešovice / Letná",[50.1020,14.4300],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[50.0875,14.4213],""]
];
/* imposta di soggiorno: circa 50 corone a notte per persona (≈ 2 €) */
var TAX=[["h5","Hotel 4–5 stelle",2.05],["h3","Hotel fino a 3 stelle, B&B o appartamento",2.05],["host","Ostello o struttura economica",2.05],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Snídaně","la colazione ceca: pane con burro, prosciutto o formaggio, uova, caffè."],["Koláč","dolce di pasta lievitata con marmellata, ricotta o semi di papavero, in panetteria."],["Káva a dort","un caffè con una fetta di torta, nei caffè storici."]],
pra:[["Párek v rohlíku","la salsiccia in un panino cavo con senape, dal chiosco."],["Smažený sýr","formaggio impanato fritto con patate e salsa tartara."],["Gulášová polévka","zuppa di gulasch, spesso servita nel pane."],["Bramboráky","frittelle di patate con aglio e maggiorana."]],
cen:[["Svíčková","manzo in salsa di verdure e panna con canederi: il piatto nazionale."],["Guláš s knedlíkem","gulasch di manzo con canederi di pane."],["Vepřo knedlo zelo","arrosto di maiale con canederi e crauti."],["Smažený řízek","cotoletta impanata con patate."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Orologio Astronomico","Foto","L'Orloj con i dodici apostoli: arriva 10 minuti prima dell'ora piena per un buon posto.",[50.0870,14.4208],"Staroměstský orloj, Praha","starom"],
["📷","Chiesa di Týn","Foto","Le due guglie gotiche nere viste da Piazza della Città Vecchia, di sera illuminate.",[50.0878,14.4222],"Týnský chrám, Praha","starom"],
["📷","Ponte Carlo all'alba","Foto","Le statue e le torri del ponte quando non c'è nessuno: prima delle 8 o dopo il tramonto.",[50.0865,14.4115],"Karlův most, Praha","karlov"],
["🤳","Muro di Lennon","Selfie","Il muro colorato di messaggi e graffiti, in una piazzetta di Malá Strana.",[50.0861,14.4054],"Lennonova zeď, Praha","karlov"],
["📷","Il Ponte Carlo da Kampa","Foto","La vista del ponte dal parco di Kampa, con il mulino ad acqua in primo piano.",[50.0841,14.4093],"Kampa, Praha","karlov"],
["📷","Cattedrale di San Vito","Foto","Le guglie e le vetrate di Mucha, dal terzo cortile del Castello.",[50.0909,14.4006],"Katedrála svatého Víta, Praha","hrad"],
["📷","Vista dal Castello","Foto","Il panorama sui tetti rossi dai giardini sotto il Castello.",[50.0894,14.4040],"Pražský hrad, Praha","hrad"],
["📷","Il Vicolo d'Oro","Foto","Le casette colorate dove abitavano gli orafi e, nel 1916, Franz Kafka.",[50.0912,14.4037],"Zlatá ulička, Praha","hrad"],
["📷","Cimitero Ebraico","Foto","Le lapidi accatastate, un luogo di raccoglimento: chiedi il permesso prima di fotografare.",[50.0907,14.4177],"Starý židovský hřbitov, Praha","josef"],
["📷","Piazza Venceslao","Foto","Il viale visto dal basso con il Museo Nazionale in fondo, di sera illuminato.",[50.0813,14.4264],"Václavské náměstí, Praha","vaclav"],
["📷","Torre di Petřín","Foto","La torre panoramica ispirata alla Tour Eiffel, e dall'alto Praga con il fiume.",[50.0836,14.3950],"Petřínská rozhledna, Praha","petrin"],
["🤳","Metronomo di Letná","Selfie","Il metronomo gigante con la Città Vecchia sullo sfondo, soprattutto al tramonto.",[50.0961,14.4153],"Metronom Letná, Praha","letna"],
["📷","Casa Danzante","Foto","L'edificio di Gehry e Milunić sul lungofiume, soprannominato «Fred e Ginger».",[50.0755,14.4142],"Tančící dům, Praha","vysehrad"],
["🤳","I bambini di Černý","Selfie","Le statue gigantesche di bambini che salgono sulla torre di Žižkov.",[50.0806,14.4503],"Miminka Žižkov, Praha","zizkov"]
];
/* avvisi (dati verificati l'11 ottobre 2026) */
var AVV=[
{from:"2026-10-11",to:"2027-06-30",t:"Sabato chiuso il quartiere ebraico",x:"Il Museo Ebraico di Praga e le sinagoghe di Josefov sono chiusi il sabato e nelle feste ebraiche: programma la visita da domenica a venerdì."},
{from:"2026-10-11",to:"2027-03-31",t:"Castello: orari invernali dal 1° novembre",x:"Da novembre a marzo gli edifici storici del Castello chiudono alle 16 (alle 17 da aprile a ottobre). La domenica la Cattedrale di San Vito apre a mezzogiorno. Controlla hrad.cz."},
{from:"2026-11-15",to:"2027-01-06",t:"Mercatini di Natale in Piazza della Città Vecchia",x:"I mercatini si tengono di solito dalla fine di novembre all'Epifania in Piazza della Città Vecchia e in Piazza Venceslao: le piazze sono molto più affollate (date non verificate: controlla visitczechia.com)."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale e Capodanno: orari ridotti",x:"Il 24 dicembre molti musei chiudono presto o restano chiusi, il 25 e il 26 la maggior parte dei ristoranti è chiusa. Il Castello di solito resta aperto con orari ridotti; controlla hrad.cz."}
];
/* clima medio di Praga (indicativo, massime/minime) */
var CLIM=[[2,-3],[5,-2],[10,1],[16,5],[21,10],[24,13],[26,15],[26,14],[21,10],[14,6],[7,2],[3,-1]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Praga: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="josef"&&WD===5)meta+=" Oggi è sabato: il quartiere ebraico è chiuso, ma si possono vedere le strade e le sinagoghe da fuori.";
if(it.id==="hrad"&&WD===6)meta+=" Oggi è domenica: la Cattedrale di San Vito apre a mezzogiorno per le funzioni, le altre parti del Castello aprono come di consueto.";
return meta}
Object.assign(C,{id:"praga",n:"Praga",cn:"Repubblica Ceca",e:"🏰",flag:"🇨🇿",col:["#11457e","#c8102e","#d4a017"],k:"praga prague repubblica ceca cechia",
TZ:"Europe/Prague",LL:[50.0875,14.4213],CC:"cz",QN:"Prague",BK:"Prague",ARE:/praha|prague|praga|\b1[1-9]\d ?\d{2}\b/i,VER:"11 ottobre 2026",
Z0:"A",LANG:"cs-CZ",LANGN:"ceco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Můstek",q:"Můstek metro station, Praha"},
SINGLE:{acts:["starom","karlov","hrad","josef","vaclav"],ins:[]},
EXCL:[],
DICON:{karlov:"🌉",hrad:"🏰",josef:"✡️",vaclav:"🐴",petrin:"🗼",vysehrad:"⛪",letna:"🌳",zizkov:"📡"},
ZN:{A:"a Staré Město",B:"a Malá Strana",C:"a Nové Město",D:"a Vinohrady e Žižkov",F:"a Letná e Holešovice"},
NEAR:{col:"caffè",pra:"birreria o locale veloce",cen:"locale",snk:"caffè o panetteria"},
SE:{bakeshop:"🥐",lokal:"🍺",nasemaso:"🍔",louvre:"☕",savoy:"🥐",bilek:"🍺",kantyna:"🥩",imperial:"☕",kmotra:"🍲"},
TR:{one:2.05,cap:6.15,lbl:"Metro, tram e bus (PID)",
 air:{PRG:{one:2.05,n:"Filobus 59 e metro A (biglietto 90 minuti)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:6.15,note:"Il biglietto 24 ore (150 corone, circa 6,15 €; 140 corone nell'app Lítačka) vale su metro, tram, bus, funicolare di Petřín e battelli PID per un giorno intero. Non vale per l'Airport Express."},
 {n:"Biglietto 72 ore",d:3,p:14.3,only:function(T){return T.n===3},note:"Il biglietto 72 ore (350 corone, circa 14,30 €; 340 nell'app Lítačka) vale su tutti i mezzi PID a Praga per 3 giorni. Non vale per l'Airport Express."}],
 note:"Prezzi dal sito del PID (tariffa dal 1° gennaio 2026), convertiti a 1 € = 24,4 corone: corsa da 30 minuti 39 corone (circa 1,60 €), da 90 minuti 50 corone (circa 2,05 €), 24 ore 150 corone (circa 6,15 €), 72 ore 350 corone (circa 14,30 €). Con l'app PID Lítačka costano un po' meno: 36, 46, 140 e 340 corone. L'Airport Express da Hlavní nádraží all'aeroporto costa 200 corone (circa 8,20 €) e non è compreso nei biglietti da 24 e 72 ore. I biglietti si convalidano appena saliti sul mezzo o prima di entrare in metro."},
FOOD:{co:[5,"Colazione al caffè"],pr:[8,"Pranzo (birreria o locale veloce)"],ce:[12,"Cena (cucina ceca)"],sp:[3,"Spuntini e dolci"]},
T:{ride:"In metro o tram",move:"tutto a piedi, in metro o in tram",bags:"«Můžu tady nechat zavazadla?»",bagsPM:"«Můžu tady nechat zavazadla do odpoledne?»",bagsAM:"«Můžu tady nechat zavazadla do poledne?»",
pra:"Una birreria o un locale veloce",praZ:{A:"Intorno a Piazza della Città Vecchia i ristoranti con il menù fuori e il buttadentro sono per turisti e costano il doppio: i posti buoni sono nelle vie a nord e a est, verso Dlouhá e Josefov.",B:"Sotto il Castello e sul Ponte Carlo i ristoranti sono cari: cerca la birreria di quartiere nelle vie laterali di Malá Strana."},
freeLong:"Qualche idea: un giro in battello sulla Moldava, una sosta in un caffè storico, i giardini del Castello, una birra in una birreria o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata lungo la Moldava.",
remind:"Se vuoi visitare gli interni del Castello, compra prima il biglietto online per evitare la fila. Il sabato il quartiere ebraico è chiuso.",
rain1:"Al coperto: la Cattedrale di San Vito e gli edifici del Castello, il Museo Ebraico, il Museo Nazionale e i caffè storici.",
rainM:"Al coperto: Castello, Museo Ebraico, Museo Nazionale, caffè storici e birrerie.",
water:"Riempite la borraccia: l'acqua del rubinetto di Praga è potabile. Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Praga si pranza tra le 11:30 e le 14 e si cena dalle 18: molte birrerie tradizionali servono tutto il giorno, ma guarda l'orario accanto a ogni locale.",
night:[["🍺","Una birra Pilsner in una birreria è il modo ceco di chiudere la giornata; costa meno di un caffè in piazza."],["🕙","Le cucine servono fino alle 22–23. La metro chiude a mezzanotte; dopo ci sono i tram e i bus notturni (linee 91–99 e 901–915)."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Praga ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (le prese sono compatibili con quelle italiane, nessun adattatore)",
foodNote:"I pasti sono stime per birrerie e locali di quartiere: a Praga si mangia con poco, anche una cena completa con birra resta intorno ai 15 € a persona. Nei locali centrali carta e Apple Pay sono accettati quasi ovunque; i chioschi e le bancarelle vogliono corone in contanti.",
taxNote:"L'imposta di soggiorno di Praga è di circa 50 corone a notte per persona (circa 2 €), valida per i primi 60 giorni; i minori di 18 anni di solito sono esenti. Spesso va pagata alla struttura all'arrivo, in contanti: controlla cifra e regole sul sito del Comune, perché sono in discussione aumenti.",
mcrit:"Criteri: almeno 4 stelle su Google, birrerie, caffè e locali di quartiere, niente catene né buttadentro. Colazione e cena restano sotto i 15 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il filobus 59 e la metro A sono la via più rapida: dall'aeroporto a Můstek servono circa 40–45 minuti con un solo biglietto da 50 corone.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto da 90 minuti (50 corone) per l'aeroporto e biglietto 24 ore (150 corone): si comprano alle macchinette gialle o nell'app PID Lítačka",function(E){return true}],["castle","Biglietto per il Castello (percorso principale, 450 corone): meglio online per saltare la fila",["hrad"]],["jew","Biglietto del Museo Ebraico (non è aperto il sabato): controlla jewishmuseum.cz",["josef"]],["czk","Qualche corona in contanti per bancarelle, mance e bagni pubblici (la Repubblica Ceca non usa l'euro)"],["card","Carta d'identità o passaporto in corso di validità"],["app","Un'app di taxi (Bolt, Uber) e l'app PID Lítačka"]],
NUM:{2:["dva","dva"],3:["tři","trzhi"],4:["čtyři","ctiri"],5:["pět","piet"],6:["šest","shest"],7:["sedm","sedum"],8:["osm","osum"],9:["devět","deviet"],10:["deset","deset"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,Math.max(2,N))];var fr=[["Buongiorno / Buonasera","Dobrý den / Dobrý večer","DO-bri den / DO-bri VE-cer"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Stůl pro "+(N===1?"jednoho":nu[0])+", prosím","stul pro "+(N===1?"IED-no-ho":nu[1])+", PRO-sim"],["Un caffè e una fetta di torta, per favore","Kávu a kousek dortu, prosím","KA-vu a KO-usek DOR-tu, PRO-sim"],["Acqua del rubinetto, per favore","Vodu z kohoutku, prosím","VO-du s KO-hout-ku, PRO-sim"],["Il conto, per favore","Zaplatím, prosím","ZA-pla-tim, PRO-sim"],["Posso pagare con la carta?","Můžu platit kartou?","MU-zhu PLA-tit KAR-tou"],["Quanto costa?","Kolik to stojí?","KO-lik to STO-i"],["Dov'è la metro?","Kde je metro?","gde ie ME-tro"],["Qual è il bus per l'aeroporto?","Který autobus jede na letiště?","KE-ri AU-to-bus IE-de na LE-tish-te"]];
if(M)fr=fr.concat([["Ho una prenotazione","Mám rezervaci","mam RE-zer-va-tsi"],["Posso lasciare i bagagli?","Můžu tady nechat zavazadla?","MU-zhu TA-di NE-chat ZA-va-zad-la"],["A che ora è il check-out?","V kolik hodin je odhlášení?","v KO-lik HO-din ie OD-hla-she-ni"]]);
return fr.concat([["Mi scusi","Promiňte","PRO-min-te"],["Grazie mille!","Děkuji moc!","DIE-ku-ji mots"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Praga: "+(tx[2]?"circa 50 corone (circa "+String(tx[2]).replace(".",",")+" €) a notte per persona ("+tx[1].toLowerCase()+")":"non si paga se sei ospite di amici o parenti")+". Va di solito pagata alla struttura all'arrivo, in contanti: controlla le regole sul sito del Comune."},
STAYTIPS:["La metro ha tre linee (A, B, C) e funziona fino a mezzanotte circa. Dopo la mezzanotte ci sono i tram e i bus notturni (linee 91–99 e 901–915), con lo stesso biglietto."],
ZONES:[
["🚇 Metro, tram e biglietti",["Un solo biglietto vale su metro, tram, bus e funicolare di Petřín: il 90 minuti costa 50 corone (circa 2,05 €) e il 24 ore 150 corone. Con l'app PID Lítačka costano un po' meno.","L'Airport Express (200 corone) non è compreso nei biglietti da 24 e 72 ore.","Il biglietto cartaceo va convalidato nella macchinetta gialla all'ingresso della metro o sul tram: senza convalida è come non averlo. I controllori sono in borghese e la multa è di circa 1.500 corone.","La metro funziona fino a mezzanotte circa; dopo ci sono tram e bus notturni."]],
["🏰 Città Vecchia, Ponte Carlo e Castello",["Piazza della Città Vecchia e il Ponte Carlo sono a 10 minuti a piedi da Můstek, in discesa verso il fiume.","Per il Castello il tram 22 da Malostranská risparmia la salita: scendi alla fermata Pražský hrad.","Il Ponte Carlo e le vie del centro sono il regno dei borseggiatori: tieni borse e telefono davanti."],["starom","karlov","hrad"]],
["✡️ Josefov",["Il Museo Ebraico e le sinagoghe sono chiusi il sabato e nelle feste ebraiche.","Il biglietto cumulativo comprende quasi tutto, ma non la Sinagoga Vecchio-Nuova: controlla il sito ufficiale.","Nel Cimitero Ebraico si cammina su un percorso fisso e non è permesso toccare le lapidi."],["josef"]],
["🌳 Petřín, Letná e Vyšehrad",["La funicolare di Petřín parte da Újezd e fa parte della rete PID; controlla che sia in funzione.","Letná è il posto migliore per il tramonto sulla Moldava; la birreria all'aperto è aperta nella bella stagione.","Vyšehrad è meno affollato del Castello e si raggiunge con la metro C."],["petrin","letna","vysehrad"]],
["🌅 Un giorno fuori Praga",["Kutná Hora, con l'ossario di Sedlec, è raggiungibile in treno da Praha hlavní nádraží in circa un'ora.","Karlštejn, il castello medievale, è a mezz'ora di treno dalla stazione Praha-Smíchov."]]],
WTIPS:["L'acqua del rubinetto di Praga è potabile: puoi chiederla in ogni locale («Vodu z kohoutku, prosím») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Repubblica Ceca fa parte dello spazio Schengen, ma non usa l'euro: la moneta è la corona (CZK), circa 24 corone per 1 €.","Evita i cambiavalute nelle piazze del centro, che applicano tassi molto sfavorevoli: preleva corone a un bancomat di una banca e, se la macchina o il POS propongono di pagare in euro, scegli sempre le corone.","Praga ha lo stesso fuso orario dell'Italia.","Mancia: si arrotonda al tavolo (circa 10%), dicendo la cifra al cameriere al momento di pagare.","Per i taxi usa un'app (Bolt, Uber) e non quelli fermi davanti alle piazze, che possono chiedere somme esagerate.","La carta d'identità valida basta per entrare.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.dpp.cz/" target="_blank" rel="noopener">dpp.cz</a> · <a href="https://pid.cz/" target="_blank" rel="noopener">pid.cz</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Praga: <a href="https://ambpraga.esteri.it" target="_blank" rel="noopener">ambpraga.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'All\'11 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Praga. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.dpp.cz/" target="_blank" rel="noopener">dpp.cz</a> e, per i treni, <a href="https://www.cd.cz/" target="_blank" rel="noopener">cd.cz</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="350" cy="26" r="11"/><path d="M0 106 V92 Q60 74 120 84 Q160 90 190 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M4 106 V88 H100 V106 Z M10 88 V62 L18 52 L26 62 V88 Z M78 88 V68 L86 60 L94 68 V88 Z"/></g>'+
'<g style="--k:2"><path d="M124 106 V52 L131 20 L138 52 V106 Z M152 106 V52 L159 20 L166 52 V106 Z M138 66 H152 V106 H138 Z"/></g>'+
'<g style="--k:3"><path d="M186 106 V38 H214 V106 Z M184 38 H216 L200 12 Z M196 38 V30 H204 V38 Z"/></g>'+
'<g style="--k:4"><path d="M244 106 V70 H340 V106 Z M252 70 V42 L260 18 L268 42 V70 Z M278 70 V46 L286 28 L294 46 V70 Z M304 70 V58 L322 50 L340 60 V70 Z"/></g>'+
'<g style="--k:5"><path d="M354 106 L362 42 H366 L374 106 Z M360 42 H368 V32 H360 Z M363 32 V14 H365 V32 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M18 94 v12 M46 94 v12 M74 94 v12"/><path d="M256 80 h74 M256 90 h74"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="26" r="1.3"/><circle cx="176" cy="14" r="1.3"/><circle cx="236" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.praga);
