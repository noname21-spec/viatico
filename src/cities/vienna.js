/* ===== Vienna (dati verificati l'11 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.vienna=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
VIE:{n:"Vienna Schwechat (VIE)",s:"Vienna International Schwechat",url:"https://www.viennaairport.com/en",live:"Vienna",inMin:45,buf:120,pos:[48.1103,16.5697],sd:"Aeroporto VIE · treno Railjet",rt:"Dall'aeroporto: treno (Railjet o IC) fino alla stazione centrale (Hauptbahnhof), poi metro U1 fino a Stephansplatz.",
 arr:"Dall'Italia si entra in Austria senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «Bahn» per la stazione, sotto il terminal. A causa dei lavori sulla linea ferroviaria urbana (chiusa tra Praterstern e Hauptbahnhof dal 7 settembre 2026 a ottobre 2027) la S-Bahn S7 arriva solo a St. Marx e il City Airport Train è sostituito da un bus per Wien Mitte. La soluzione più semplice è il Railjet o l'IC fino a Wien Hauptbahnhof (circa 15 minuti, più treni all'ora), poi la metro U1 fino a Stephansplatz (circa 8 minuti). In alternativa il bus Vienna Airport Lines (VAL) per Schwedenplatz o Westbahnhof, ogni 30 minuti, o il bus CAT per Wien Mitte (circa 20 minuti, 14,90 €). In tutto sono circa 35–45 minuti.",
 tk:"Biglietto: il Railjet costa da 5,30 € (senza prenotazione del posto; prezzo dal sito dell'aeroporto e da guide, da controllare su oebb.at), il bus VAL 11 €, il CAT bus 14,90 €. Il biglietto dei mezzi urbani di Vienna non vale fino all'aeroporto, che è fuori città: va comprato a parte. Per la metro dalla Hauptbahnhof serve un biglietto Wiener Linien (3,20 €), da comprare alle macchinette o con l'app WienMobil.",
 gm:"Flughafen Wien Bahnhof, Schwechat",
 tips:["I lavori sulla linea ferroviaria urbana (fino a ottobre 2027) cambiano i collegamenti con l'aeroporto: controlla sul sito dell'aeroporto o su oebb.at il giorno prima.","Il taxi per il centro costa circa 36–42 € a prezzo fisso se prenotato con le app dei taxi locali; il treno è più rapido ed economico.","Il Railjet parte dalla stazione sotto il terminal: guarda il tabellone, perché alcuni treni non fermano alla Hauptbahnhof ma proseguono per altre città."]}
};
/* linee (tracciati indicativi) */
var SEG={
rj:{c:"#c8102e",n:"Treno Railjet / IC dall'aeroporto",p:[[48.1103,16.5697,"Aeroporto",2],[48.1850,16.3761,"Hauptbahnhof",2]]},
u1:{c:"#e20613",n:"Metro U1 (rossa)",p:[[48.1862,16.3748,"Hauptbahnhof",2],[48.1925,16.3765,"Taubstummengasse"],[48.2008,16.3699,"Karlsplatz",2],[48.2086,16.3723,"Stephansplatz",2],[48.2117,16.3787,"Schwedenplatz",2],[48.2184,16.3922,"Praterstern",2]]},
u2:{c:"#a762a4",n:"Metro U2 (viola)",p:[[48.2025,16.3612,"Museumsquartier",2],[48.2056,16.3606,"Volkstheater"],[48.2117,16.3624,"Schottentor",2],[48.2184,16.3922,"Praterstern",2]]},
u3:{c:"#f47216",n:"Metro U3 (arancione)",p:[[48.2086,16.3723,"Stephansplatz",2],[48.2056,16.3606,"Volkstheater",2]]},
u4:{c:"#009a44",n:"Metro U4 (verde)",p:[[48.2008,16.3699,"Karlsplatz",2],[48.1998,16.3586,"Kettenbrückengasse",2],[48.1860,16.3340,"Meidling Hauptstraße"],[48.1860,16.3220,"Schönbrunn",2]]},
trD:{c:"#bd2127",n:"Tram D",p:[[48.2029,16.3691,"Oper",2],[48.1985,16.3719,"Karlsplatz"],[48.1915,16.3808,"Belvedere",2]]}
};
var START=[48.2086,16.3723];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
stephan:{t:"Stephansdom e Graben",z:"A",p:1,min:60,id:90,max:130,pos:[48.2086,16.3731],q:"Stephansdom, Wien",cls:"walk",sun:1,
 d:"Il Duomo gotico di Vienna, con il tetto di tegole colorate e la guglia alta 136 metri, in mezzo al centro storico. Intorno ci sono il Graben con la Colonna della Peste, e le vie con i caffè e i negozi.",
 m:"La cattedrale è aperta dalle 6 alle 22 (domenica e festivi dalle 7), ma il visitatore può visitare la navata solo fuori dalle funzioni. Si può salire sulla torre sud (ogni giorno 9–19) o con l'ascensore alla campana Pummerin (9–20:30 da aprile a dicembre, 9–17:30 da gennaio a marzo). Le catacombe e le torri hanno un biglietto a parte (prezzi sul sito stephanskirche.at: non letti)."},
hofburg:{t:"Hofburg: appartamenti imperiali e Museo di Sissi",z:"A",p:1,min:120,id:150,max:200,pos:[48.2065,16.3656],q:"Hofburg Wien, Sisi Museum",cls:"",sun:1,tk:[20,"Hofburg: Museo di Sissi e Appartamenti Imperiali (20 €)",1,1],
 win:function(){return[9*60,17*60+30]},
 d:"Il palazzo degli Asburgo, per sei secoli residenza degli imperatori d'Austria. La visita comprende gli appartamenti di Francesco Giuseppe e di Elisabetta (Sissi), il Museo di Sissi e, a parte, il Tesoro Imperiale. Fuori ci sono la Heldenplatz e il Burggarten.",
 m:"Biglietto Museo di Sissi e Appartamenti Imperiali: 20 € (sito ufficiale, via guide). Dal 6 ottobre al 18 novembre 2026 la parte del Museo di Sissi è chiusa e il biglietto costa circa il 25% in meno (circa 15 €): restano aperti gli Appartamenti Imperiali, dalle 10 alle 16:30. Il resto dell'anno 9–17:30, ultimo ingresso 16:30, tutti i giorni. Il Tesoro Imperiale costa 16 € online, 18 € alla cassa. L'Argenteria è chiusa a tempo indeterminato dal 2023. Dal 19 novembre i prezzi possono cambiare: controlla hofburg-wien.at."},
schonbrunn:{t:"Palazzo e giardini di Schönbrunn",z:"C",p:1,min:180,id:210,max:270,pos:[48.1845,16.3122],q:"Schloss Schönbrunn, Wien",cls:"",sun:1,tk:[38,"Schönbrunn: Palace Ticket (38 €)",1,1],
 win:function(){return[9*60+30,17*60]},
 d:"La residenza estiva degli Asburgo, con 40 sale visitabili in stile rococò, tra cui la Grande Galleria e la Sala degli Specchi dove Mozart suonò a sei anni. Il parco ha la Gloriette, un belvedere in cima alla collina, e il giardino segreto.",
 m:"Prezzi 2026: «Imperial Tour» (appartamenti di Francesco Giuseppe, 40 minuti) 28 €, «Palace Ticket» (tutta la parte nobile, 75 minuti) 38 €, Classic Pass con giardini 44 €; il parco si visita gratis dalle 6:30 (i prezzi e gli orari cambiano con le stagioni: da novembre gli orari invernali del palazzo non erano pubblicati sulle pagine che ho letto, controlla schoenbrunn.at). È obbligatoria la fascia oraria: prenota online. Il mercatino di Natale del castello è aperto dal 6 novembre 2026 al 6 gennaio 2027."},
belvedere:{t:"Belvedere e il Bacio di Klimt",z:"F",p:2,min:90,id:120,max:170,pos:[48.1915,16.3808],q:"Oberes Belvedere, Wien",cls:"",sun:1,tk:[23,"Belvedere Superiore (23 €)",1,1],
 win:function(){return[9*60,18*60]},
 d:"Il palazzo barocco di Eugenio di Savoia, con un giardino che scende fino al Belvedere Inferiore. Il Belvedere Superiore ospita la più grande raccolta di opere di Klimt, tra cui «Il Bacio», e dalla terrazza si vede tutta Vienna.",
 m:"Aperto ogni giorno dalle 9 alle 18; serve un biglietto con orario d'ingresso (gratuito da prenotare online sul sito del museo). Belvedere Superiore 23 €, Belvedere Inferiore 20 €, biglietto combinato 32 € (dal sito del museo, prezzi non datati). Il giardino si visita gratis. Il mercatino di Natale del Belvedere è aperto dal 20 novembre al 31 dicembre 2026."},
ring:{t:"Ringstraße: Parlamento, Municipio e Opera",z:"B",p:2,min:75,id:100,max:150,pos:[48.2084,16.3589],q:"Parlament Wien",cls:"walk",sun:1,
 d:"Il grande viale ad anello che ha preso il posto delle mura medievali, bordato di palazzi: il Parlamento in stile greco, il Municipio neogotico, il Burgtheater, l'Università e l'Opera di Stato. Si può fare a piedi a tratti o sul tram 1, 2 o D.",
 m:"Si cammina gratis. Dentro il Parlamento si entra solo con visita guidata prenotata; l'Opera di Stato fa visite guidate a pagamento (orari sul sito dell'Opera). Davanti al Municipio dal 13 novembre al 26 dicembre c'è il Christkindlmarkt, il mercatino di Natale più famoso di Vienna."},
museums:{t:"Museumsquartier e Museo di Storia dell'Arte",z:"B",p:3,min:120,id:150,max:210,pos:[48.2038,16.3618],q:"Kunsthistorisches Museum, Wien",cls:"",sun:1,tk:[22,"Kunsthistorisches Museum (22 € online)",1,1],
 win:function(){return[10*60,18*60]},
 d:"Il Kunsthistorisches Museum è uno dei grandi musei d'arte d'Europa: Bruegel, Raffaello, Tiziano, Vermeer e Rubens. Di fronte c'è il Museumsquartier, un ex scuderia imperiale diventata il distretto culturale della città, con le sedie colorate nel cortile.",
 m:"Aperto ogni giorno dalle 10 alle 18, il giovedì fino alle 21 (sito del museo). Biglietto 22 € online, 24 € alla cassa. Dall'8 settembre 2026 serve prenotare una fascia oraria. I minori di 19 anni entrano gratis. Il Museumsquartier è un cortile aperto a tutti."},
naschmarkt:{t:"Naschmarkt e Secessione",z:"C",p:3,min:75,id:100,max:150,pos:[48.1999,16.3639],q:"Naschmarkt, Wien",cls:"walk",sun:1,
 d:"Il mercato più grande di Vienna, lungo 500 metri: banchi di olive, spezie, formaggi, pesce e locali di tutto il mondo. In cima c'è il Palazzo della Secessione, con il Fregio di Beethoven di Klimt, e il Teatro an der Wien.",
 m:"Le bancarelle sono aperte lunedì–venerdì dalle 6 alle 21 e il sabato dalle 6 alle 18; la domenica sono chiuse (ristoranti e bar 9–21). Il sabato c'è il mercatino delle pulci. Il lunedì e il martedì sono i giorni meno affollati."},
karls:{t:"Karlskirche e Karlsplatz",z:"C",p:4,min:45,id:70,max:100,pos:[48.1982,16.3719],q:"Karlskirche, Wien",cls:"",sun:1,
 d:"La chiesa barocca con la cupola verde e le due colonne ispirate alla Colonna Traiana, che si specchia in una vasca d'acqua. Dentro si può salire con un ascensore panoramico fino alla cupola e vedere gli affreschi da vicino.",
 m:"La chiesa è visitabile di norma lunedì–sabato 9–18 e la domenica dalle 12 alle 19 (da guide, orari da controllare su karlskirche.at). L'ingresso è a pagamento, circa 9–10 € (prezzo non letto sul sito)."},
prater:{t:"Prater e Riesenrad",z:"D",p:4,min:75,id:100,max:150,pos:[48.2166,16.3959],q:"Wiener Riesenrad",cls:"",multi:1,sun:1,tk:[14.5,"Riesenrad (14,50 €)",1,1],
 win:function(){return[9*60,23*60+45]},
 d:"Il parco di divertimenti più antico d'Europa, con la ruota panoramica gigante del 1897 resa celebre dal film «Il terzo uomo». Il viale del Prater, lungo cinque chilometri, è un ottimo posto per passeggiare.",
 m:"Il Riesenrad è aperto di norma ogni giorno dalle 9 alle 23:45; il biglietto costa 14,50 € (prezzo dal sito di Vienna Turismo, non datato). Le giostre sono aperte tutto l'anno ma molte chiudono con il freddo. Il «Wintermarkt» del Prater apre di solito nella seconda metà di novembre."},
hundert:{t:"Hundertwasserhaus e Stadtpark",z:"A",p:5,min:60,id:90,max:120,pos:[48.2074,16.3944],q:"Hundertwasserhaus, Wien",cls:"walk",multi:1,sun:1,
 d:"Il palazzo di case popolari colorato, ondulato e coperto di alberi, progettato dall'artista Friedensreich Hundertwasser: si vede da fuori, perché dentro vivono gli inquilini. Il vicino Stadtpark ha il monumento dorato a Johann Strauss.",
 m:"La facciata e la strada si vedono gratis; la casa non si può visitare all'interno. Il «Hundertwasser Village» di fronte è un negozio e un caffè turistici."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","hofburg",9,"walk","A piedi per Graben e Kohlmarkt, tra le boutique, fino alla Hofburg, circa 9 minuti.","A piedi per Kohlmarkt e Graben fino a Stephansplatz, circa 9 minuti.",{f:[W([[48.2086,16.3723],[48.2090,16.3690],[48.2072,16.3660],[48.2065,16.3656]])],r:[W([[48.2065,16.3656],[48.2072,16.3660],[48.2090,16.3690],[48.2086,16.3723]])]});
P2("stephan","hofburg",9,"walk","A piedi per Graben e Kohlmarkt fino alla Hofburg, circa 9 minuti.","A piedi per Kohlmarkt e Graben fino allo Stephansdom, circa 9 minuti.",{f:[W([[48.2086,16.3731],[48.2090,16.3690],[48.2072,16.3660],[48.2065,16.3656]])],r:[W([[48.2065,16.3656],[48.2072,16.3660],[48.2090,16.3690],[48.2086,16.3731]])]});
P2("hofburg","ring",12,"walk","A piedi per la Heldenplatz e il Volksgarten fino al Parlamento, circa 12 minuti.","A piedi per il Volksgarten e la Heldenplatz fino alla Hofburg, circa 12 minuti.",{f:[W([[48.2065,16.3656],[48.2065,16.3620],[48.2084,16.3589]])],r:[W([[48.2084,16.3589],[48.2065,16.3620],[48.2065,16.3656]])]});
P2("ring","museums",12,"walk","A piedi lungo il Burgring fino al Museo di Storia dell'Arte, circa 12 minuti.","A piedi lungo il Burgring fino al Parlamento, circa 12 minuti.",{f:[W([[48.2084,16.3589],[48.2062,16.3600],[48.2038,16.3618]])],r:[W([[48.2038,16.3618],[48.2062,16.3600],[48.2084,16.3589]])]});
P2("hofburg","museums",10,"walk","A piedi attraverso la Heldenplatz e la Maria-Theresien-Platz fino al Museo di Storia dell'Arte, circa 10 minuti.","A piedi per la Maria-Theresien-Platz e la Heldenplatz fino alla Hofburg, circa 10 minuti.",{f:[W([[48.2065,16.3656],[48.2052,16.3640],[48.2038,16.3618]])],r:[W([[48.2038,16.3618],[48.2052,16.3640],[48.2065,16.3656]])]});
P2("museums","naschmarkt",14,"walk","A piedi per la Getreidemarkt fino al Naschmarkt, circa 14 minuti.","A piedi per la Getreidemarkt fino al Museumsquartier, circa 14 minuti.",{f:[W([[48.2038,16.3618],[48.2015,16.3628],[48.1999,16.3639]])],r:[W([[48.1999,16.3639],[48.2015,16.3628],[48.2038,16.3618]])]});
P2("naschmarkt","karls",12,"walk","A piedi lungo il Naschmarkt e la Wienzeile fino a Karlsplatz, circa 12 minuti.","A piedi per Karlsplatz fino al Naschmarkt, circa 12 minuti.",{f:[W([[48.1999,16.3639],[48.1995,16.3690],[48.1982,16.3719]])],r:[W([[48.1982,16.3719],[48.1995,16.3690],[48.1999,16.3639]])]});
P2("start","schonbrunn",30,"metro","Metro U1 da Stephansplatz a Karlsplatz (2 minuti), poi U4 fino a Schönbrunn (circa 12 minuti) e 5 minuti a piedi fino al palazzo.","A piedi fino a Schönbrunn U4, metro U4 fino a Karlsplatz e U1 fino a Stephansplatz, circa 25 minuti.",{f:[["u1","Stephansplatz","Karlsplatz"],["u4","Karlsplatz","Schönbrunn"],W([[48.1860,16.3220],[48.1845,16.3122]])],r:[W([[48.1845,16.3122],[48.1860,16.3220]]),["u4","Schönbrunn","Karlsplatz"],["u1","Karlsplatz","Stephansplatz"]]});
P2("schonbrunn","naschmarkt",22,"metro","U4 da Schönbrunn a Kettenbrückengasse (circa 10 minuti), poi 3 minuti a piedi fino al Naschmarkt.","U4 da Kettenbrückengasse a Schönbrunn, circa 10 minuti.",{f:[W([[48.1845,16.3122],[48.1860,16.3220]]),["u4","Schönbrunn","Kettenbrückengasse"],W([[48.1998,16.3586],[48.1999,16.3639]])],r:[W([[48.1999,16.3639],[48.1998,16.3586]]),["u4","Kettenbrückengasse","Schönbrunn"],W([[48.1860,16.3220],[48.1845,16.3122]])]});
P2("start","belvedere",22,"metro","Metro U1 fino a Südtiroler Platz-Hauptbahnhof (circa 8 minuti), poi 10 minuti a piedi fino al Belvedere Superiore. In alternativa tram D da Karlsplatz.","A piedi fino alla Hauptbahnhof, metro U1 fino a Stephansplatz, circa 22 minuti.",{f:[["u1","Stephansplatz","Hauptbahnhof"],W([[48.1862,16.3748],[48.1890,16.3790],[48.1915,16.3808]])],r:[W([[48.1915,16.3808],[48.1890,16.3790],[48.1862,16.3748]]),["u1","Hauptbahnhof","Stephansplatz"]]});
P2("belvedere","karls",15,"walk","A piedi lungo il Rennweg e il Schwarzenbergplatz fino a Karlsplatz, circa 15 minuti.","A piedi lungo la Prinz-Eugen-Straße fino al Belvedere Superiore, circa 15 minuti.",{f:[W([[48.1915,16.3808],[48.1950,16.3760],[48.1982,16.3719]])],r:[W([[48.1982,16.3719],[48.1950,16.3760],[48.1915,16.3808]])]});
P2("start","prater",20,"metro","Metro U1 da Stephansplatz fino a Praterstern (circa 7 minuti), poi 10 minuti a piedi per la Praterstraße fino al Riesenrad.","A piedi fino a Praterstern e metro U1 fino a Stephansplatz, circa 20 minuti.",{f:[["u1","Stephansplatz","Praterstern"],W([[48.2184,16.3922],[48.2175,16.3940],[48.2166,16.3959]])],r:[W([[48.2166,16.3959],[48.2175,16.3940],[48.2184,16.3922]]),["u1","Praterstern","Stephansplatz"]]});
P2("prater","hundert",20,"metro","Metro U1 da Praterstern a Schwedenplatz poi U4 a Landstraße e 5 minuti a piedi, circa 25 minuti. In alternativa tram O.","Tram O fino a Praterstern e a piedi fino al Riesenrad, circa 20 minuti.",{f:[W([[48.2166,16.3959],[48.2120,16.3945],[48.2074,16.3944]])],r:[W([[48.2074,16.3944],[48.2120,16.3945],[48.2166,16.3959]])]});
/* ritorno in aeroporto: metro U1 fino alla Hauptbahnhof e Railjet */
var RET={
VIE:{
 A:{min:45,txt:"Metro U1 da Stephansplatz fino a Südtiroler Platz-Hauptbahnhof (circa 8 minuti), poi Railjet o IC per l'aeroporto dalla stazione (circa 15 minuti, più treni all'ora). Biglietto Railjet da 5,30 € e biglietto metro 3,20 €. Con i lavori sulla linea ferroviaria urbana (fino a ottobre 2027) è la strada più semplice: in alternativa bus VAL da Schwedenplatz (11 €) o CAT bus da Wien Mitte (14,90 €).",g:[["u1","Stephansplatz","Hauptbahnhof"],["rj","Hauptbahnhof","Aeroporto"]]}}
};
var ARR={
VIE:[["rj","Aeroporto","Hauptbahnhof"],["u1","Hauptbahnhof","Stephansplatz"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
kameel:{n:"Zum Schwarzen Kameel",a:"Bognergasse 5",z:"A",r:"4,4",pos:[48.2093,16.3668],h:["08:00-23:00","08:00-23:00","08:00-23:00","08:00-23:00","08:00-23:00","08:00-23:00","09:00-23:00"],
 d:"Una gastronomia storica del 1618 con un banco di panini al buffet e un ristorante dal soffitto Art Nouveau: i piccoli panini con salmone, prosciutto o formaggio si mangiano in piedi o ai tavoli, con un calice di vino.",pr:"Tre panini e un calice sono circa 10–14 €; una colazione completa 12–16 € (listino non visto). Orari da guide, da confermare."},
trzes:{n:"Trzesniewski",a:"Dorotheergasse 1",z:"A",r:"4,3",pos:[48.2083,16.3693],h:["08:30-19:00","08:30-19:00","08:30-19:00","08:30-19:00","08:30-19:00","09:00-18:00","10:00-18:00"],
 d:"La catena viennese dei panini aperti: dal 1902 si servono piccoli tramezzini con le creme di uova, tonno, cetriolini o rafano, da mangiare in piedi con un bicchiere di birra. Era il preferito di Kafka.",pr:"Un tramezzino costa circa 1,8–2,2 €; tre bastano per uno spuntino (listino non visto). Orari da guide, da confermare."},
bitzinger:{n:"Bitzinger Würstelstand Albertina",a:"Augustinerstraße 1",z:"A",r:"4,2",pos:[48.2042,16.3680],h:D7("09:00-23:59"),
 d:"Il chiosco di salsicce davanti all'Albertina, dietro l'Opera: Käsekrainer, la salsiccia al formaggio, e Bosna, con senape e pane. È la pausa pranzo tipica dei viennesi.",pr:"Una salsiccia con pane costa di solito 6–8 € (listino non visto). Orari da guide, da confermare."},
gulasch:{n:"Gulaschmuseum",a:"Schulerstraße 20",z:"A",r:"4,3",pos:[48.2092,16.3763],h:D7("10:00-23:00"),
 d:"Un locale a due passi dallo Stephansdom con una carta dedicata al gulasch in tante varianti, con il pane o i canederi: cucina viennese semplice, a prezzi decenti per il centro.",pr:"Un gulasch con pane o canederi sta intorno ai 12–16 € (listino non visto). Orari da guide, da confermare."},
landtmann:{n:"Café Landtmann",a:"Universitätsring 4",z:"B",r:"4,4",pos:[48.2118,16.3611],h:D7("07:30-22:00"),
 d:"Un caffè storico del 1873 sul Ring, davanti al Burgtheater, frequentato da Freud: marmi, tavolini ricoperti di giornali e una carta di Wiener Schnitzel, Apfelstrudel e Melange.",pr:"Un caffè con una torta sta intorno ai 10–13 € e un piatto del giorno sui 15–20 € (listino non visto). Orari dal sito, da confermare."},
museum:{n:"Café Museum",a:"Operngasse 7",z:"C",r:"4,3",pos:[48.2013,16.3677],h:D7("08:00-22:00"),
 d:"Il caffè progettato da Adolf Loos nel 1899, sobrio e luminoso, a due passi dall'Opera: colazioni viennesi, torte e piatti semplici in sale ariose.",pr:"Una colazione intorno ai 10–14 € e un piatto sui 13–18 € (listino non visto). Orari da guide, da confermare."},
sperl:{n:"Café Sperl",a:"Gumpendorfer Straße 11",z:"C",r:"4,5",pos:[48.1984,16.3609],h:["07:00-22:00","07:00-22:00","07:00-22:00","07:00-22:00","07:00-22:00","07:00-22:00","10:00-20:00"],
 d:"Uno dei caffè viennesi più autentici, aperto dal 1880 vicino al Naschmarkt: biliardo, giornali e un'atmosfera immobile dal Novecento. Si prende una Melange o un Einspänner con la Sachertorte.",pr:"Un caffè con una fetta di torta sta intorno ai 9–12 € (listino non visto). Orari da guide, da confermare."},
prueckel:{n:"Café Prückel",a:"Stubenring 24",z:"A",r:"4,2",pos:[48.2077,16.3813],h:D7("08:30-22:00"),
 d:"Un caffè anni Cinquanta sul Ring, di fronte al Museo delle Arti Applicate: poltrone azzurre, giornali e una carta di torte e piatti semplici.",pr:"Un caffè con una torta sta intorno ai 8–11 € (listino non visto). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["kameel","trzes","prueckel"],B:["landtmann","museum"],C:["sperl","museum"],D:["prueckel","kameel"],F:["museum","sperl"]},
pra:{A:["bitzinger","trzes","gulasch"],B:["landtmann","bitzinger"],C:["sperl","bitzinger","museum"],D:["bitzinger","gulasch"],F:["sperl","bitzinger"]},
cen:{A:["gulasch","kameel","sperl"],B:["landtmann","gulasch"],C:["sperl","gulasch","kameel"],D:["gulasch","prueckel"],F:["sperl","gulasch"]},
snk:{A:["trzes","bitzinger","kameel"],B:["landtmann","trzes"],C:["museum","sperl"],D:["prueckel","trzes"],F:["museum","sperl"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Stephansdom, Graben e Hofburg",acts:["stephan","hofburg"],need:200,core:1},
{id:"schon",t:"Schönbrunn e Naschmarkt",acts:["schonbrunn","naschmarkt"],need:270,core:1},
{id:"belv",t:"Belvedere e Karlskirche",acts:["belvedere","karls"],need:190,core:1},
{id:"ring",t:"Ringstraße e Museo di Storia dell'Arte",acts:["ring","museums"],need:210},
{id:"prater",t:"Prater e Hundertwasserhaus",acts:["prater","hundert"],need:150}
];
var ORDER=["stephan","hofburg","schonbrunn","belvedere","ring","museums","naschmarkt","karls","prater","hundert"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["inn","Innere Stadt (centro storico)",[48.2086,16.3731],"A"],
["neu","Neubau / Museumsquartier / Josefstadt",[48.2030,16.3500],"B"],
["wie","Wieden / Naschmarkt / Karlsplatz",[48.1950,16.3700],"C"],
["leo","Leopoldstadt / Prater",[48.2150,16.3900],"D"],
["lan","Landstraße / Belvedere",[48.1960,16.3900],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[48.2086,16.3723],""]
];
/* imposta di soggiorno: Ortstaxe di Vienna, 5% del prezzo netto della camera (8% dal 1° luglio 2027) */
var TAX=[["h5","Hotel 4–5 stelle",{pct:5}],["h3","Hotel fino a 3 stelle, B&B o appartamento",{pct:5}],["host","Ostello o struttura economica",{pct:5}],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Wiener Frühstück","la colazione viennese: panini freschi (Semmel) con burro e marmellata, un uovo e un caffè."],["Melange und Topfenstrudel","caffè con latte schiumato (Melange) e un dolce con ricotta."],["Kaffee und Kuchen","un caffè con una fetta di torta, specialità dei caffè storici."]],
pra:[["Käsekrainer","salsiccia al formaggio con pane e senape, dal chiosco."],["Schnitzelsemmel","un panino con la cotoletta impanata."],["Eine kleine Gulaschsuppe","zuppa di gulasch, pasto veloce e caldo."],["Brötchen","piccoli panini aperti, da mangiare in piedi."]],
cen:[["Wiener Schnitzel","cotoletta di vitello impanata con insalata di patate: il piatto simbolo di Vienna."],["Tafelspitz","bollito di manzo con rafano e mele, il piatto preferito dell'imperatore."],["Gulasch mit Knödel","gulasch con canederi di pane."],["Apfelstrudel","il dolce classico, con panna o salsa alla vaniglia."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il tetto dello Stephansdom","Foto","Le tegole colorate a zig-zag viste dalla piazza: si fotografa meglio dal lato nord, con la guglia sullo sfondo.",[48.2086,16.3731],"Stephansdom, Wien","stephan"],
["📷","Graben e Colonna della Peste","Foto","La colonna barocca sul viale, specie di sera con le luci dei negozi.",[48.2084,16.3697],"Pestsäule, Wien","stephan"],
["📷","Heldenplatz e la Hofburg","Foto","La cupola della Hofburg e le statue equestri sulla grande piazza, soprattutto al mattino.",[48.2062,16.3640],"Heldenplatz, Wien","hofburg"],
["🤳","Il Burggarten e Mozart","Selfie","Il monumento a Mozart con la chiave di violino di fiori, nel parco dietro la Hofburg.",[48.2040,16.3664],"Mozart Denkmal Burggarten, Wien","hofburg"],
["📷","La Gloriette di Schönbrunn","Foto","Il belvedere in cima alla collina, con il castello giallo e il parco sotto.",[48.1790,16.3125],"Gloriette Schönbrunn, Wien","schonbrunn"],
["📷","Il Belvedere dal basso","Foto","Dal laghetto davanti al Belvedere Superiore si riflette tutto il palazzo.",[48.1915,16.3800],"Oberes Belvedere, Wien","belvedere"],
["📷","Vienna dal Belvedere","Foto","La città con lo Stephansdom in lontananza, dalla terrazza del palazzo.",[48.1925,16.3808],"Oberes Belvedere, Wien","belvedere"],
["📷","L'Opera di Stato","Foto","La facciata neorinascimentale di sera, con i lampioni accesi.",[48.2029,16.3691],"Wiener Staatsoper, Wien","ring"],
["📷","Il Municipio","Foto","La torre neogotica del Rathaus, a novembre circondata dalle luci del Christkindlmarkt.",[48.2108,16.3578],"Wiener Rathaus, Wien","ring"],
["🤳","Le sedie del Museumsquartier","Selfie","I grandi sedili colorati nel cortile, un ritrovo dei viennesi.",[48.2030,16.3590],"Museumsquartier Wien","museums"],
["📷","I banchi del Naschmarkt","Foto","Le bancarelle di olive e spezie in file colorate: chiedi sempre il permesso prima di fotografare i venditori.",[48.1999,16.3639],"Naschmarkt, Wien","naschmarkt"],
["📷","La Karlskirche","Foto","La cupola e le due colonne riflesse nella vasca davanti alla chiesa.",[48.1982,16.3719],"Karlskirche, Wien","karls"],
["🤳","Il Riesenrad","Selfie","La ruota panoramica del Prater: le cabine rosse sono un ottimo sfondo.",[48.2166,16.3959],"Wiener Riesenrad","prater"],
["📷","Hundertwasserhaus","Foto","La facciata colorata e ondulata, con gli alberi sui balconi.",[48.2074,16.3944],"Hundertwasserhaus, Wien","hundert"]
];
/* avvisi (verificati l'11 ottobre 2026) */
var AVV=[
{from:"2026-10-11",to:"2026-11-18",t:"Hofburg: il Museo di Sissi è chiuso fino al 18 novembre",x:"Dal 6 ottobre al 18 novembre 2026 il Museo di Sissi è chiuso; restano aperti gli Appartamenti Imperiali (10–16:30) con un biglietto di circa il 25% meno caro (circa 15 €). Dal 19 novembre i prezzi possono cambiare."},
{from:"2026-10-11",to:"2027-10-31",t:"Lavori sulla S-Bahn fino a ottobre 2027",x:"Dal 7 settembre 2026 la linea ferroviaria urbana è chiusa tra Praterstern e Hauptbahnhof: la S7 per l'aeroporto arriva solo a St. Marx e il City Airport Train è sostituito da un bus per Wien Mitte. Il Railjet dalla Hauptbahnhof e i bus Vienna Airport Lines funzionano senza limitazioni."},
{from:"2026-11-06",to:"2027-01-06",t:"Mercatini di Natale di Vienna",x:"Il Christkindlmarkt del Municipio apre dal 13 novembre al 26 dicembre 2026 (10–22), quello dello Spittelberg dal 13 novembre al 23 dicembre, quello di Schönbrunn dal 6 novembre al 6 gennaio e quello del Belvedere dal 20 novembre al 31 dicembre. Il centro è molto più affollato."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: orari ridotti e negozi chiusi",x:"Il 24 dicembre i mercatini chiudono prima (Municipio alle 18:30, Schönbrunn alle 16). In Austria i negozi sono chiusi la domenica e nei giorni festivi, il 25 e il 26 dicembre compresi."}
];
/* clima medio di Vienna (indicativo, massime/minime) */
var CLIM=[[3,-2],[6,-1],[11,2],[17,6],[22,11],[25,14],[28,16],[27,16],[22,12],[15,7],[8,3],[4,0]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Vienna: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="naschmarkt"&&WD===6)meta+=" Oggi è domenica: le bancarelle del Naschmarkt sono chiuse, restano aperti ristoranti e bar (9–21).";
if(it.id==="naschmarkt"&&WD===5)meta+=" Oggi è sabato: c'è anche il mercatino delle pulci accanto al Naschmarkt.";
if(it.id==="museums"&&WD===3)meta+=" Oggi è giovedì: il Museo di Storia dell'Arte resta aperto fino alle 21.";
if(it.id==="karls"&&WD===6)meta+=" Oggi è domenica: la Karlskirche di norma apre solo dalle 12.";
return meta}
Object.assign(C,{id:"vienna",n:"Vienna",cn:"Austria",e:"🎻",flag:"🇦🇹",col:["#a7102a","#d9b25f","#ffffff"],k:"vienna wien austria",
TZ:"Europe/Vienna",LL:[48.2086,16.3723],CC:"at",QN:"Vienna",BK:"Vienna",ARE:/wien|vienna|\b1[0-2][0-9]0\b/i,VER:"11 ottobre 2026",
Z0:"A",LANG:"de-AT",LANGN:"tedesco",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Stephansplatz",q:"Stephansplatz U-Bahn, Wien"},
SINGLE:{acts:["stephan","hofburg","belvedere","ring","naschmarkt"],ins:[]},
EXCL:[],
DICON:{hofburg:"👑",schonbrunn:"🏰",belvedere:"🖼️",ring:"🏛️",museums:"🎨",naschmarkt:"🥙",karls:"⛪",prater:"🎡",hundert:"🌈"},
ZN:{A:"nella Innere Stadt",B:"a Neubau e al Museumsquartier",C:"a Wieden e al Naschmarkt",D:"a Leopoldstadt",F:"a Landstraße"},
NEAR:{col:"caffè",pra:"chiosco o locale veloce",cen:"locale",snk:"caffè o chiosco"},
SE:{kameel:"🥪",trzes:"🥪",bitzinger:"🌭",gulasch:"🍲",landtmann:"☕",museum:"☕",sperl:"🍰",prueckel:"☕"},
TR:{one:3.2,cap:10.2,lbl:"Metro, tram e bus (Wiener Linien)",
 air:{VIE:{one:5.3,n:"Treno per l'aeroporto (Railjet, da 5,30 €)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:10.2,note:"Il biglietto 24 ore (10,20 €; 9,70 € online) vale su metro, tram e bus a Vienna per 24 ore dalla convalida."},
 {n:"Biglietto 7 giorni",d:7,p:28.9,only:function(T){return T.n>=5},note:"Il biglietto 7 giorni (28,90 €; 25,20 € online) vale per sette giorni di calendario di fila su tutti i mezzi urbani di Vienna."}],
 note:"Prezzi dalla stampa locale e da wien.info, tariffa del 1° gennaio 2026: corsa singola 3,20 € (3,00 € online o con l'app; 3,40 € a bordo del tram), 24 ore 10,20 € (9,70 € online), 7 giorni 28,90 € (25,20 € online). I biglietti da 48 e 72 ore sono stati tolti dal 2026. La Vienna City Card (da 19 €, da 24 a 72 ore) comprende i mezzi e piccoli sconti ai musei: conviene solo se visiti molti musei con lo sconto. L'aeroporto è fuori città: il biglietto urbano non vale. I biglietti si convalidano prima di salire sul mezzo o in metro."},
FOOD:{co:[8,"Colazione al caffè"],pr:[10,"Pranzo (chiosco, panino o gulasch)"],ce:[15,"Cena (cucina viennese)"],sp:[5,"Spuntini e dolci"]},
T:{ride:"In metro o tram",move:"tutto a piedi, in metro o in tram",bags:"«Kann ich meine Koffer hier lassen?»",bagsPM:"«Kann ich meine Koffer bis heute Nachmittag hier lassen?»",bagsAM:"«Kann ich meine Koffer bis Mittag hier lassen?»",
pra:"Un chiosco o un locale veloce",praZ:{A:"Intorno allo Stephansdom e al Graben i ristoranti con il menù in piazza sono per turisti e costano molto: per un pasto vero cerca le vie laterali (Schulerstraße, Bäckerstraße).",C:"Il Naschmarkt ha ottimi banchi, ma i ristoranti più in vista hanno prezzi alti: i locali più economici sono nelle vie laterali."},
freeLong:"Qualche idea: una sosta in un caffè storico con una fetta di torta (i viennesi restano ore), una passeggiata nel Burggarten, i giardini di Schönbrunn o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè storico.",
remind:"Per Schönbrunn, il Belvedere e il Kunsthistorisches serve la prenotazione di una fascia oraria: prenota online. Domenica i negozi sono chiusi.",
rain1:"Al coperto: la Hofburg, il Kunsthistorisches Museum, il Belvedere Superiore, lo Stephansdom e i caffè storici.",
rainM:"Al coperto: Hofburg, Schönbrunn (interni), Kunsthistorisches, Belvedere Superiore e caffè storici.",
water:"Riempite la borraccia: l'acqua del rubinetto di Vienna arriva dalle Alpi ed è tra le più buone d'Europa. Ci sono molte fontanelle pubbliche: attivate «Acqua» sulla mappa.",
kitchen:"A Vienna si pranza tra le 12 e le 14:30 e si cena dalle 18: i caffè servono tutto il giorno, ma i ristoranti tradizionali spesso chiudono tra i due servizi.",
night:[["🍷","Un calice di vino bianco con uno Spritzer o un Heuriger, la taverna del vino nuovo: è il modo viennese di chiudere la giornata."],["🕙","Le cucine servono fino alle 22–23; la metro nel fine settimana gira tutta la notte (U1–U4, venerdì e sabato), durante la settimana ci sono i bus notturni."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Vienna ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per chioschi e caffè storici: una colazione sta intorno agli 8–12 € e una cena completa con un piatto principale intorno ai 15–20 €. Quasi ovunque si paga con la carta; ai chioschi e ai mercatini conviene avere qualche euro in contanti.",
taxNote:"L'imposta di soggiorno di Vienna (Ortstaxe) è il 5% del prezzo della camera al netto dell'IVA e della colazione, per ogni notte; salirà all'8% dal 1° luglio 2027. Spesso è già compresa nel prezzo dell'annuncio: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: almeno 4 stelle su Google, caffè storici, chioschi e locali tradizionali, niente catene. Colazione e cena restano sotto i 15–20 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il Railjet per la Hauptbahnhof impiega circa 15 minuti, con più treni all'ora: è la via più rapida mentre la S-Bahn è chiusa per i lavori.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto Railjet per l'aeroporto (da 5,30 €) e biglietto 24 ore (10,20 €): si comprano alle macchinette o con l'app WienMobil",function(E){return true}],["sch","Biglietto per Schönbrunn con orario d'ingresso (Palace Ticket 38 €): prenota online",["schonbrunn"]],["bel","Biglietto per il Belvedere Superiore con fascia oraria (23 €)",["belvedere"]],["hof","Biglietto per la Hofburg (20 €; il Museo di Sissi è chiuso fino al 18 novembre)",["hofburg"]],["khm","Biglietto per il Kunsthistorisches Museum con fascia oraria (22 €)",["museums"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per chioschi e mercatini"]],
NUM:{1:["ein","ain"],2:["zwei","zvai"],3:["drei","drai"],4:["vier","fir"],5:["fünf","fünf"],6:["sechs","zeks"],7:["sieben","ZI-ben"],8:["acht","acht"],9:["neun","noin"],10:["zehn","zen"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Grüß Gott / Guten Abend","grüs got / GU-ten A-bent"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Einen Tisch für "+(N===1?"eine Person":nu[0])+", bitte","AI-nen tish für "+(N===1?"AI-ne per-ZON":nu[1])+", BIT-te"],["Una Melange e una fetta di torta, per favore","Eine Melange und ein Stück Torte, bitte","AI-ne me-LANSH unt ain shtük TOR-te, BIT-te"],["Acqua del rubinetto, per favore","Leitungswasser, bitte","LAI-tungs-vas-ser, BIT-te"],["Il conto, per favore","Zahlen, bitte","TSA-len, BIT-te"],["Posso pagare con la carta?","Kann ich mit Karte zahlen?","kan ich mit KAR-te TSA-len"],["Quanto costa?","Wie viel kostet das?","vi fil KOS-tet das"],["Dov'è la metro?","Wo ist die U-Bahn?","vo ist di U-ban"],["Qual è il treno per l'aeroporto?","Welcher Zug fährt zum Flughafen?","VEL-cher tsug fert tsum FLUG-ha-fen"]];
if(M)fr=fr.concat([["Ho una prenotazione","Ich habe eine Reservierung","ich HA-be AI-ne re-ser-VI-rung"],["Posso lasciare i bagagli?","Kann ich meine Koffer hier lassen?","kan ich MAI-ne KOF-fer hir LAS-sen"],["A che ora è il check-out?","Um wie viel Uhr ist das Check-out?","um vi fil ur ist das tsek-AUT"]]);
return fr.concat([["Mi scusi","Entschuldigung","ent-SHUL-di-gung"],["Grazie mille!","Vielen Dank!","FI-len dank"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Vienna (Ortstaxe): "+(tx[2]&&tx[2].pct?"il "+String(tx[2].pct).replace(".",",")+"% del prezzo della camera al netto di IVA e colazione ("+tx[1].toLowerCase()+"), per ogni notte":"non si paga se sei ospite di amici o parenti")+"; dal 1° luglio 2027 salirà all'8%. Spesso è già compresa nel prezzo che trovi sull'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["La metro (U1–U6), i tram e i bus si usano con lo stesso biglietto. Il venerdì e il sabato le linee U1–U4 e U6 girano tutta la notte; durante la settimana ci sono i bus notturni."],
ZONES:[
["🚇 Metro, tram e biglietti",["Un solo biglietto vale su metro, tram e bus: la corsa singola costa 3,20 €, il 24 ore 10,20 € (9,70 € online) e il 7 giorni 28,90 €. I biglietti da 48 e 72 ore sono stati tolti dal 2026.","Il biglietto cartaceo va convalidato prima di salire. I controllori sono in borghese e la multa è di 105 €: tieni sempre il biglietto (importo da controllare).","L'aeroporto è fuori città: il Railjet costa da 5,30 € e non è compreso nei biglietti urbani.","Il tram D e il tram 1 e 2 fanno il giro del Ring: sono un ottimo modo per vedere i palazzi seduti."]],
["🏛️ Centro: Stephansdom, Hofburg e Ring",["Lo Stephansdom è a pochi passi da Stephansplatz; il Graben e il Kohlmarkt portano alla Hofburg in 10 minuti a piedi.","La Hofburg ha più ingressi: il biglietto per gli Appartamenti Imperiali si compra al Michaelertor.","Il Museo di Sissi è chiuso fino al 18 novembre 2026."],["stephan","hofburg","ring"]],
["👑 Schönbrunn e Belvedere",["Per Schönbrunn prendi la U4 da Karlsplatz fino a Schönbrunn: è a 5 minuti dalla stazione.","Per il Belvedere Superiore la strada più semplice è il tram D da Karlsplatz o la U1 fino a Südtiroler Platz.","Per entrambi serve la prenotazione di una fascia oraria."],["schonbrunn","belvedere"]],
["☕ I caffè viennesi",["Nei caffè storici si può stare ore con una sola consumazione: nessuno ti manda via.","L'acqua arriva sempre insieme al caffè, gratis: una Melange è un cappuccino, un Einspänner un caffè con panna.","Si paga al tavolo e si lascia il 5–10% di mancia, dicendo la cifra al cameriere."],["landtmann","museum","sperl"]],
["🌅 Un giorno fuori Vienna",["Bratislava è a un'ora di treno dalla Hauptbahnhof.","La Wachau, con le colline di vigne e l'abbazia di Melk, si raggiunge in treno e battello in circa due ore."]]],
WTIPS:["L'acqua del rubinetto di Vienna arriva direttamente dalle sorgenti alpine ed è ottima: puoi chiederla in ogni locale («Leitungswasser, bitte») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap; la città ha oltre 1.000 fontanelle.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["L'Austria usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Vienna ha lo stesso fuso orario dell'Italia.","Mancia: si arrotonda al tavolo (5–10%), dicendo la cifra al cameriere al momento di pagare, non lasciandola sul tavolo.","La domenica e nei festivi i negozi sono chiusi; sono aperti ristoranti, caffè, musei e le stazioni.","Molti chioschi, mercatini e piccoli locali accettano solo contanti: porta qualche euro.","La metro e il tram sono precisi: l'orario sul tabellone è quello reale.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.wienerlinien.at/" target="_blank" rel="noopener">wienerlinien.at</a> · treni: <a href="https://www.oebb.at/" target="_blank" rel="noopener">oebb.at</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Vienna: <a href="https://ambvienna.esteri.it" target="_blank" rel="noopener">ambvienna.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'All\'11 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Vienna. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.wienerlinien.at/" target="_blank" rel="noopener">wienerlinien.at</a> e, per i treni, <a href="https://www.oebb.at/" target="_blank" rel="noopener">oebb.at</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 78 110 84 Q150 88 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M14 106 V54 H42 V106 Z M10 54 H46 L28 26 Z M27 26 V8 H29 V26 Z M16 54 H40 V60 H16 Z"/></g>'+
'<g style="--k:2"><path d="M70 106 V72 H156 V106 Z M80 72 V62 Q113 28 146 62 V72 Z M110 30 V20 H116 V30 Z M72 72 V56 H78 V72 Z M148 72 V56 H154 V72 Z"/></g>'+
'<g style="--k:3"><path d="M180 106 V58 H208 V106 Z M178 58 H210 L194 36 Z M192 36 V22 H196 V36 Z"/></g>'+
'<g style="--k:4"><path d="M236 106 A34 34 0 1 1 304 106 H298 A28 28 0 1 0 242 106 Z M268 106 V72 H272 V106 Z M234 106 H306 V102 H234 Z"/></g>'+
'<g style="--k:5"><path d="M326 106 V74 H388 V106 Z M326 74 V68 H388 V74 Z M340 68 V60 H374 V68 Z M354 60 V52 H360 V60 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M82 88 v18 M102 88 v18 M122 88 v18 M142 88 v18"/><path d="M334 82 h46 M334 92 h46"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.vienna);
