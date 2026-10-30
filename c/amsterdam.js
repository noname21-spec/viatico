(function(o){
/* ===== Amsterdam (dati verificati il 10 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.amsterdam=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
AMS:{n:"Schiphol",s:"Amsterdam Schiphol",url:"https://www.schiphol.nl/",live:"Schiphol",inMin:45,buf:120,pos:[52.3086,4.7639],sd:"Schiphol · treno",rt:"Dall'aeroporto: treno diretto fino ad Amsterdam Centraal.",
 arr:"Dall'Italia si entra in Olanda senza controllo passaporti (spazio Schengen), quindi dopo il ritiro dei bagagli segui i cartelli «Trains»: la stazione è sotto il terminal, a Schiphol Plaza. I treni per Amsterdam Centraal partono ogni pochi minuti e ci mettono 15–20 minuti; controlla sul tabellone che il treno fermi a Centraal (alcuni vanno verso altre città).",
 tk:"Biglietto: circa 6 € a tratta in seconda classe, alle macchinette dei treni (accettano carta) o con la carta contactless ai tornelli; non serve prenotare. Il biglietto GVB per tram e metro non vale sul treno.",
 gm:"Schiphol Airport railway station",
 tips:["Il treno è più veloce e più economico del taxi, che costa circa 50 € (listino non visto) e nell'ora di punta non arriva prima.","Alcuni treni fermano anche a Amsterdam Zuid o Sloterdijk: se il tuo alloggio è lì, scendi prima.","Controlla il tabellone: i treni «Intercity» e «Sprinter» vanno entrambi a Centraal, ma solo alcuni proseguono oltre."]},
EIN:{n:"Eindhoven",s:"Eindhoven Airport",url:"https://www.eindhovenairport.nl/",live:"Eindhoven",inMin:40,buf:105,pos:[51.4501,5.3745],sd:"Eindhoven · bus 400 e treno",rt:"Dall'aeroporto: bus 400 fino a Eindhoven Centraal, poi treno per Amsterdam Centraal.",
 arr:"Fuori dal terminal prendi il bus 400 (circa 20 minuti) fino alla stazione di Eindhoven Centraal; da lì un Intercity diretto porta ad Amsterdam Centraal in circa 1 ora e 25 minuti, con un treno ogni 15–30 minuti. Eindhoven è lontano da Amsterdam: tieni conto del viaggio in più.",
 tk:"In tutto circa 29 € a tratta (bus 400 circa 5 €, treno circa 24 € in seconda classe, listino non visto): si pagano con la carta contactless o alle macchinette della stazione.",
 gm:"Eindhoven Airport bus station",
 tips:["È il secondo aeroporto per i voli low cost, ma ad Amsterdam ci arrivi in quasi due ore dall'atterraggio.","Al ritorno lascia un margine in più: l'ultimo treno e l'ultimo bus 400 della sera vanno controllati prima.","Il taxi da Eindhoven ad Amsterdam costa più di 150 €: non conviene."]}
};
/* linee (tracciati indicativi) */
var SEG={
m52:{c:"#0f6cb3",n:"Metro 52 (Noord/Zuidlijn)",p:[[52.3939,4.9138,"Noord"],[52.3791,4.9003,"Amsterdam Centraal",2],[52.3698,4.8932,"Rokin",2],[52.3590,4.8895,"Vijzelgracht",2],[52.3531,4.8929,"De Pijp",2],[52.3405,4.8890,"Europaplein"],[52.3388,4.8728,"Zuid"]]},
t2:{c:"#d4382c",n:"Tram 2",p:[[52.3791,4.9003,"Amsterdam Centraal",2],[52.3731,4.8914,"Dam",2],[52.3690,4.8890,"Spui",2],[52.3642,4.8828,"Leidseplein",2],[52.3572,4.8805,"Museumplein",2]]},
fer:{c:"#00808a",n:"Traghetto gratuito GVB",p:[[52.3800,4.9010,"Centraal (retro)",2],[52.3838,4.9010,"Buiksloterweg",2]]},
ams:{c:"#003082",n:"Treno NS",p:[[52.3086,4.7639,"Schiphol Airport",2],[52.3892,4.8368,"Sloterdijk"],[52.3791,4.9003,"Amsterdam Centraal",2]]},
ein:{c:"#003082",n:"Bus 400 e treno NS",p:[[51.4501,5.3745,"Aeroporto di Eindhoven",2],[51.4431,5.4812,"Eindhoven Centraal",2],[51.6907,5.2936,"'s-Hertogenbosch"],[52.0894,5.1101,"Utrecht Centraal",2],[52.3791,4.9003,"Amsterdam Centraal",2]]}
};
var START=[52.3791,4.9003];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
nieuwmarkt:{t:"Zeedijk, Nieuwmarkt e Oude Kerk",z:"F",p:3,min:35,id:60,max:100,pos:[52.3729,4.9004],q:"Nieuwmarkt, Amsterdam",cls:"walk",sun:1,
 d:"La Zeedijk, la strada dei ristoranti cinesi e dei templi, la piazza del Nieuwmarkt con la Waag (la pesa del Seicento) e, poco più in là, la Oude Kerk, la chiesa più antica della città, in mezzo ai vicoli del quartiere a luci rosse.",
 m:"Di giorno la zona è tranquilla e si cammina gratis. Nel quartiere a luci rosse non si fotografano le vetrine; attenzione ai borseggiatori, soprattutto la sera. Dentro la Oude Kerk si paga."},
dam:{t:"Piazza Dam, Palazzo Reale e Nieuwe Kerk",z:"A",p:2,min:25,id:45,max:80,pos:[52.3731,4.8926],q:"Dam Square, Amsterdam",cls:"walk",sun:1,
 d:"Il cuore storico di Amsterdam: la piazza con il Monumento Nazionale, il Palazzo Reale (una volta il municipio), la Nieuwe Kerk accanto e, dietro, il labirinto delle vie dello shopping.",
 m:"Da fuori è tutto gratis. Palazzo Reale e Nieuwe Kerk si visitano dentro a pagamento, con orari che cambiano per cerimonie e mostre: controlla i siti prima di comprare."},
spui:{t:"Begijnhof, Spui e mercato dei fiori",z:"A",p:4,min:40,id:65,max:100,pos:[52.3694,4.8899],q:"Begijnhof, Amsterdam",cls:"walk",sun:1,
 d:"Il Begijnhof, un cortile nascosto del Trecento con la casa di legno più antica della città e un giardino silenzioso; poi la piazza Spui con le librerie e il Bloemenmarkt, il mercato dei fiori che galleggia sul canale Singel.",
 m:"Il Begijnhof è un luogo residenziale: parla piano e non entrare nelle case. Il mercato dei fiori è aperto di solito tutti i giorni dalle 9 alle 17:30 (la domenica dalle 11), ma è molto turistico. Allo Spui il venerdì c'è il mercato dei libri e la domenica quello dell'arte (circa 11–18)."},
canali:{t:"Canali, Nove Strade e Westerkerk",z:"B",p:1,min:50,id:90,max:130,pos:[52.3700,4.8850],q:"Negen Straatjes, Amsterdam",cls:"walk",sun:1,tk:[16.5,"Casa di Anne Frank (16,50 €)",1,1],
 d:"La passeggiata più bella di Amsterdam: lungo Herengracht, Keizersgracht e Prinsengracht, le case strette con i frontoni e i ponti. Nelle Nove Strade ci sono botteghe e piccoli caffè, e al fondo la Westerkerk, con il campanile più alto della città. Davanti c'è la Casa di Anne Frank, da vedere da fuori.",
 m:"Per entrare alla Casa di Anne Frank il biglietto si compra solo online, con orario (16,50 €): non si vende alla porta. I canali sono sempre gratis; occhio alle biciclette sui ponti."},
jordaan:{t:"Jordaan e Noordermarkt",z:"B",p:3,min:35,id:60,max:100,pos:[52.3800,4.8877],q:"Noordermarkt, Amsterdam",cls:"walk",sun:1,
 d:"Il quartiere più romantico: stradine con case basse, hofjes (cortili nascosti), gallerie e caffè di quartiere, fino al Noordermarkt e alla Brouwersgracht, il canale più fotografato.",
 m:"Il lunedì mattina (circa 9–13) il Noordermarkt ospita il mercato delle pulci e il sabato (circa 9–16) quello biologico; negli altri giorni è una piazza tranquilla."},
museumplein:{t:"Museumplein e quartiere dei musei",z:"C",p:2,min:30,id:50,max:90,pos:[52.3580,4.8810],q:"Museumplein, Amsterdam",cls:"walk",sun:1,tk:[25,"Rijksmuseum (25 €)",1,1],
 d:"Il grande prato con il Rijksmuseum sul fondo, il Museo Van Gogh e il Concertgebouw sui lati, circondato da ville dell'Ottocento. Sotto il Rijksmuseum passa un tunnel ciclabile che è una delle scorciatoie più fotografate.",
 m:"Il prato e il tunnel sono gratis. Rijksmuseum (25 €) e Van Gogh (27 €) si visitano solo con biglietto a orario, meglio online."},
pijp:{t:"De Pijp e mercato di Albert Cuyp",z:"D",p:4,min:40,id:75,max:120,pos:[52.3558,4.8955],q:"Albert Cuypmarkt, Amsterdam",cls:"walk",cl:[6],
 d:"Il quartiere più vivace e multietnico della città: il mercato di Albert Cuyp con formaggi, stroopwafel e aringhe, i caffè sotto i platani e il Sarphatipark, un parco tranquillo a due passi.",
 m:"Il mercato è aperto dal lunedì al sabato, di solito dalle 9:30 alle 17; la domenica è chiuso e il quartiere è più calmo. Alcune bancarelle accettano solo contanti."}
};
/* tappe in più per i viaggi di più giorni */
Object.assign(STOPS,{
annefrankins:{t:"Casa di Anne Frank",z:"B",p:1,min:60,id:75,max:90,pos:[52.3752,4.8840],q:"Anne Frank House, Amsterdam",cls:"",multi:1,tk:[16.5,"Casa di Anne Frank (16,50 €)"],
 win:function(wd,d){return[9*60,d==="2026-11-07"?18*60+30:22*60]},
 d:"L'alloggio segreto dove Anne Frank e la sua famiglia si sono nascoste per due anni: la libreria girevole, le stanze vuote e i suoi diari originali. Un'esperienza breve ma intensa.",
 m:"Biglietto 16,50 € (compreso 1 € di prenotazione), solo online e con orario: non si vende alla porta. Ogni martedì alle 10 mettono in vendita le visite di sei settimane dopo, quindi per questo viaggio il biglietto va cercato già adesso. Aperta di solito tutti i giorni 9–22."},
rijks:{t:"Rijksmuseum",z:"C",p:1,min:100,id:150,max:210,pos:[52.3600,4.8852],q:"Rijksmuseum, Amsterdam",cls:"",multi:1,tk:[25,"Rijksmuseum (25 €)"],
 win:function(){return[9*60,17*60]},
 d:"Il museo nazionale olandese: La ronda di notte di Rembrandt, Vermeer, i maestri del Seicento, i vascelli in miniatura e la Biblioteca Cuypers. Tre ore bastano per i capolavori.",
 m:"Biglietto 25 € (gratis sotto i 18 anni), con orario, meglio online. Aperto tutti i giorni 9–17, festivi compresi."},
vangogh:{t:"Museo Van Gogh",z:"C",p:2,min:80,id:110,max:150,pos:[52.3584,4.8811],q:"Van Gogh Museum, Amsterdam",cls:"",multi:1,tk:[27,"Museo Van Gogh (27 €)"],
 win:function(){return[9*60,17*60]},
 d:"La più grande collezione al mondo di Vincent van Gogh: I girasoli, I mangiatori di patate e l'evoluzione della sua pittura dagli esordi olandesi alle opere di Arles.",
 m:"Biglietto circa 27 €, con orario e solo online. Gli orari di norma sono 9–17, con aperture serali in alcuni giorni: controlla il sito prima di comprare (non ho potuto vedere la pagina ufficiale)."},
jodenbuurt:{t:"Waterlooplein, Plantage e Hortus",z:"E",p:5,min:50,id:80,max:120,pos:[52.3677,4.9022],q:"Waterlooplein, Amsterdam",cls:"walk",multi:1,sun:1,
 d:"L'ex quartiere ebraico: il mercato delle pulci di Waterlooplein, il teatro dell'opera Stopera sull'Amstel, la casa di Rembrandt da fuori, la Sinagoga Portoghese e, più in là, il Plantage con l'orto botanico e lo zoo Artis.",
 m:"Il mercato di Waterlooplein è aperto di solito dal lunedì al sabato, dalle 9:30 alle 18. Musei e giardini hanno biglietti propri: scegli in base al tempo."},
vondel:{t:"Vondelpark e Foodhallen",z:"G",p:4,min:60,id:90,max:150,pos:[52.3579,4.8686],q:"Vondelpark, Amsterdam",cls:"walk",multi:1,sun:1,
 d:"Il parco più amato dagli abitanti, con laghetti, prati e parrocchetti verdi sugli alberi. A Oud-West, a dieci minuti, l'ex deposito dei tram ospita le Foodhallen, un grande mercato coperto di cucina da tutto il mondo.",
 m:"Il parco è gratuito e aperto sempre. Le Foodhallen (Hannie Dankbaarpassage 16) sono aperte ogni giorno dalle 12 alle 23: ogni banco fa i suoi prezzi."},
noord:{t:"Traghetto gratuito per Amsterdam Noord e EYE",z:"F",p:6,min:60,id:100,max:160,pos:[52.3843,4.9012],q:"EYE Filmmuseum, Amsterdam",cls:"walk",multi:1,sun:1,
 d:"Dietro la Stazione Centrale partono i traghetti GVB gratuiti: in 5 minuti si arriva a Noord, dove l'edificio futuristico dell'EYE (museo del cinema) ha un caffè con terrazza sul fiume IJ e la vista sullo skyline.",
 m:"I traghetti sono gratis e partono ogni pochi minuti per pedoni e ciclisti; per l'ex area industriale NDSM c'è la linea F4 (circa 15 minuti). L'edificio dell'EYE e la terrazza sono gratuiti, mostre e film si pagano."}
});
/* collegamenti tra le tappe */
var LEGS={
"start>nieuwmarkt":{min:12,mode:"walk",txt:"A piedi dalla Stazione Centrale lungo la Zeedijk fino al Nieuwmarkt, circa 12 minuti.",g:[W([[52.3791,4.9003],[52.3760,4.9005],[52.3745,4.9008],[52.3729,4.9004]])]},
"nieuwmarkt>dam":{min:12,mode:"walk",txt:"A piedi per la Damstraat fino alla piazza Dam, circa 12 minuti.",g:[W([[52.3729,4.9004],[52.3733,4.8960],[52.3731,4.8926]])]},
"start>dam":{min:12,mode:"walk",txt:"A piedi lungo il Damrak fino alla piazza Dam, circa 12 minuti.",g:[W([[52.3791,4.9003],[52.3760,4.8955],[52.3731,4.8926]])]},
"dam>spui":{min:10,mode:"walk",txt:"A piedi lungo la Kalverstraat fino al Begijnhof e allo Spui, circa 10 minuti.",g:[W([[52.3731,4.8926],[52.3710,4.8910],[52.3694,4.8899]])]},
"dam>canali":{min:15,mode:"walk",txt:"A piedi per la Raadhuisstraat fino al Keizersgracht e alle Nove Strade, circa 15 minuti.",g:[W([[52.3731,4.8926],[52.3718,4.8895],[52.3705,4.8860],[52.3700,4.8850]])]},
"spui>canali":{min:10,mode:"walk",txt:"A piedi lungo il canale fino alle Nove Strade, circa 10 minuti.",g:[W([[52.3694,4.8899],[52.3698,4.8875],[52.3700,4.8850]])]},
"canali>jordaan":{min:15,mode:"walk",txt:"A piedi lungo la Prinsengracht, passando davanti alla Westerkerk, fino al Noordermarkt, circa 15 minuti.",g:[W([[52.3700,4.8850],[52.3745,4.8838],[52.3775,4.8850],[52.3800,4.8877]])]},
"annefrankins>canali":{min:8,mode:"walk",txt:"A piedi lungo la Prinsengracht fino alle Nove Strade, circa 8 minuti.",g:[W([[52.3752,4.8840],[52.3730,4.8845],[52.3700,4.8850]])]},
"canali>annefrankins":{min:8,mode:"walk",txt:"A piedi lungo la Prinsengracht fino alla Casa di Anne Frank, circa 8 minuti.",g:[W([[52.3700,4.8850],[52.3730,4.8845],[52.3752,4.8840]])]},
"annefrankins>jordaan":{min:10,mode:"walk",txt:"A piedi fino al Noordermarkt, circa 10 minuti.",g:[W([[52.3752,4.8840],[52.3775,4.8850],[52.3800,4.8877]])]},
"jordaan>nieuwmarkt":{min:25,mode:"walk",txt:"A piedi lungo la Haarlemmerstraat fino alla Stazione Centrale e alla Zeedijk, circa 25 minuti.",g:[W([[52.3800,4.8877],[52.3808,4.8910],[52.3800,4.8960],[52.3791,4.9003],[52.3760,4.9005],[52.3729,4.9004]])]},
"jordaan>start":{min:22,mode:"walk",txt:"A piedi lungo la Haarlemmerstraat fino alla Stazione Centrale, circa 22 minuti.",g:[W([[52.3800,4.8877],[52.3808,4.8910],[52.3800,4.8960],[52.3791,4.9003]])]},
"dam>start":{min:12,mode:"walk",txt:"A piedi lungo il Damrak fino alla Stazione Centrale, circa 12 minuti.",g:[W([[52.3731,4.8926],[52.3760,4.8955],[52.3791,4.9003]])]},
"nieuwmarkt>start":{min:10,mode:"walk",txt:"A piedi lungo la Zeedijk fino alla Stazione Centrale, circa 10 minuti.",g:[W([[52.3729,4.9004],[52.3745,4.9008],[52.3760,4.9005],[52.3791,4.9003]])]},
"spui>start":{min:15,mode:"tram",txt:"Dallo Spui prendi il tram 2 fino alla Stazione Centrale, circa 8 minuti, più il cammino alla fermata.",g:[W([[52.3694,4.8899],[52.3690,4.8890]]),["t2","Spui","Amsterdam Centraal"]]},
"canali>start":{min:22,mode:"walk",txt:"A piedi lungo la Haarlemmerstraat fino alla Stazione Centrale, circa 22 minuti.",g:[W([[52.3700,4.8850],[52.3745,4.8838],[52.3775,4.8850],[52.3800,4.8877],[52.3808,4.8910],[52.3791,4.9003]])]},
"annefrankins>start":{min:20,mode:"walk",txt:"A piedi lungo la Prinsengracht e la Haarlemmerstraat fino alla Stazione Centrale, circa 20 minuti.",g:[W([[52.3752,4.8840],[52.3775,4.8850],[52.3800,4.8877],[52.3808,4.8910],[52.3791,4.9003]])]},
"start>canali":{min:25,mode:"tram",txt:"Dalla Stazione Centrale prendi il tram 2 fino alla fermata Spui (8 minuti), poi 10 minuti a piedi fino alle Nove Strade.",g:[["t2","Amsterdam Centraal","Spui"],W([[52.3690,4.8890],[52.3698,4.8875],[52.3700,4.8850]])]},
"start>annefrankins":{min:25,mode:"walk",txt:"A piedi lungo la Haarlemmerstraat e la Prinsengracht fino alla Casa di Anne Frank, circa 25 minuti.",g:[W([[52.3791,4.9003],[52.3808,4.8910],[52.3800,4.8877],[52.3775,4.8850],[52.3752,4.8840]])]},
"start>jordaan":{min:22,mode:"walk",txt:"A piedi lungo la Haarlemmerstraat fino al Noordermarkt, circa 22 minuti.",g:[W([[52.3791,4.9003],[52.3800,4.8960],[52.3808,4.8910],[52.3800,4.8877]])]},
"start>museumplein":{min:20,mode:"tram",txt:"Dalla Stazione Centrale prendi il tram 2 fino alla fermata Museumplein, circa 20 minuti.",g:[["t2","Amsterdam Centraal","Museumplein"]]},
"start>rijks":{min:25,mode:"tram",txt:"Dalla Stazione Centrale prendi il tram 2 fino a Museumplein (circa 20 minuti), poi 5 minuti a piedi fino al Rijksmuseum.",g:[["t2","Amsterdam Centraal","Museumplein"],W([[52.3572,4.8805],[52.3590,4.8830],[52.3600,4.8852]])]},
"start>vangogh":{min:22,mode:"tram",txt:"Dalla Stazione Centrale prendi il tram 2 fino a Museumplein, circa 20 minuti, poi 2 minuti a piedi fino al Museo Van Gogh.",g:[["t2","Amsterdam Centraal","Museumplein"],W([[52.3572,4.8805],[52.3584,4.8811]])]},
"rijks>vangogh":{min:6,mode:"walk",txt:"A piedi attraverso il Museumplein, circa 6 minuti.",g:[W([[52.3600,4.8852],[52.3590,4.8830],[52.3584,4.8811]])]},
"vangogh>rijks":{min:6,mode:"walk",txt:"A piedi attraverso il Museumplein, circa 6 minuti.",g:[W([[52.3584,4.8811],[52.3590,4.8830],[52.3600,4.8852]])]},
"rijks>museumplein":{min:5,mode:"walk",txt:"A piedi lungo il Museumplein, circa 5 minuti.",g:[W([[52.3600,4.8852],[52.3590,4.8830],[52.3580,4.8810]])]},
"vangogh>museumplein":{min:4,mode:"walk",txt:"A piedi sul prato del Museumplein, circa 4 minuti.",g:[W([[52.3584,4.8811],[52.3580,4.8810]])]},
"museumplein>rijks":{min:5,mode:"walk",txt:"A piedi fino al Rijksmuseum, circa 5 minuti.",g:[W([[52.3580,4.8810],[52.3590,4.8830],[52.3600,4.8852]])]},
"museumplein>vangogh":{min:4,mode:"walk",txt:"A piedi fino al Museo Van Gogh, circa 4 minuti.",g:[W([[52.3580,4.8810],[52.3584,4.8811]])]},
"museumplein>start":{min:22,mode:"tram",txt:"Dal Museumplein prendi il tram 2 fino alla Stazione Centrale, circa 20 minuti.",g:[["t2","Museumplein","Amsterdam Centraal"]]},
"rijks>start":{min:28,mode:"tram",txt:"A piedi fino al Museumplein (5 minuti), poi tram 2 fino alla Stazione Centrale (circa 20 minuti).",g:[W([[52.3600,4.8852],[52.3590,4.8830],[52.3572,4.8805]]),["t2","Museumplein","Amsterdam Centraal"]]},
"vangogh>start":{min:25,mode:"tram",txt:"A piedi fino alla fermata Museumplein (2 minuti), poi tram 2 fino alla Stazione Centrale (circa 20 minuti).",g:[W([[52.3584,4.8811],[52.3572,4.8805]]),["t2","Museumplein","Amsterdam Centraal"]]},
"museumplein>pijp":{min:15,mode:"walk",txt:"A piedi lungo il Singelgracht fino all'Albert Cuyp, circa 15 minuti.",g:[W([[52.3580,4.8810],[52.3565,4.8870],[52.3558,4.8955]])]},
"rijks>pijp":{min:15,mode:"walk",txt:"A piedi lungo il Singelgracht fino all'Albert Cuyp, circa 15 minuti.",g:[W([[52.3600,4.8852],[52.3575,4.8900],[52.3558,4.8955]])]},
"pijp>start":{min:12,mode:"metro",txt:"Dalla fermata De Pijp prendi la metro 52 fino alla Stazione Centrale, circa 8 minuti.",g:[["m52","De Pijp","Amsterdam Centraal"]]},
"start>pijp":{min:12,mode:"metro",txt:"Dalla Stazione Centrale prendi la metro 52 fino alla fermata De Pijp, circa 8 minuti, poi 3 minuti a piedi fino al mercato.",g:[["m52","Amsterdam Centraal","De Pijp"],W([[52.3531,4.8929],[52.3558,4.8955]])]},
"pijp>jodenbuurt":{min:20,mode:"walk",txt:"A piedi lungo l'Amstel fino a Waterlooplein, circa 20 minuti.",g:[W([[52.3558,4.8955],[52.3600,4.9000],[52.3650,4.9020],[52.3677,4.9022]])]},
"jodenbuurt>pijp":{min:20,mode:"walk",txt:"A piedi lungo l'Amstel fino all'Albert Cuyp, circa 20 minuti.",g:[W([[52.3677,4.9022],[52.3650,4.9020],[52.3600,4.9000],[52.3558,4.8955]])]},
"jodenbuurt>start":{min:25,mode:"walk",txt:"A piedi per il Nieuwmarkt e la Zeedijk fino alla Stazione Centrale, circa 25 minuti.",g:[W([[52.3677,4.9022],[52.3729,4.9004],[52.3760,4.9005],[52.3791,4.9003]])]},
"start>jodenbuurt":{min:25,mode:"walk",txt:"A piedi per la Zeedijk e il Nieuwmarkt fino a Waterlooplein, circa 25 minuti.",g:[W([[52.3791,4.9003],[52.3760,4.9005],[52.3729,4.9004],[52.3677,4.9022]])]},
"start>noord":{min:18,mode:"ferry",txt:"Dietro la Stazione Centrale prendi il traghetto gratuito per Buiksloterweg (5 minuti, uno ogni pochi minuti) e poi 5 minuti a piedi fino all'EYE.",g:[W([[52.3791,4.9003],[52.3800,4.9010]]),["fer","Centraal (retro)","Buiksloterweg"],W([[52.3838,4.9010],[52.3843,4.9012]])]},
"noord>start":{min:18,mode:"ferry",txt:"A piedi fino al molo di Buiksloterweg e traghetto gratuito per la Stazione Centrale (5 minuti).",g:[W([[52.3843,4.9012],[52.3838,4.9010]]),["fer","Buiksloterweg","Centraal (retro)"],W([[52.3800,4.9010],[52.3791,4.9003]])]},
"vondel>start":{min:35,mode:"tram",txt:"A piedi fino a Leidseplein (10 minuti), poi tram 2 fino alla Stazione Centrale (circa 15 minuti).",g:[W([[52.3579,4.8686],[52.3610,4.8760],[52.3642,4.8828]]),["t2","Leidseplein","Amsterdam Centraal"]]},
"start>vondel":{min:35,mode:"tram",txt:"Tram 2 dalla Stazione Centrale fino a Leidseplein (circa 15 minuti), poi 10 minuti a piedi fino al Vondelpark.",g:[["t2","Amsterdam Centraal","Leidseplein"],W([[52.3642,4.8828],[52.3610,4.8760],[52.3579,4.8686]])]}
};
/* ritorno in aeroporto (le altre tappe passano dalla Stazione Centrale) */
var RET={
AMS:{
 A:{min:30,txt:"Treno da Amsterdam Centraal a Schiphol (15–20 minuti, uno ogni pochi minuti): controlla il tabellone, perché non tutti i treni vanno all'aeroporto.",g:[["ams","Amsterdam Centraal","Schiphol Airport"]]}},
EIN:{
 A:{min:120,txt:"Treno Intercity da Amsterdam Centraal a Eindhoven Centraal (circa 1 ora e 25), poi bus 400 fino all'aeroporto (circa 20 minuti). Controlla l'ultimo treno e l'ultimo bus della sera.",g:[["ein","Amsterdam Centraal","Aeroporto di Eindhoven"]]}}
};
var ARR={
AMS:[["ams","Schiphol Airport","Amsterdam Centraal"]],
EIN:[["ein","Aeroporto di Eindhoven","Amsterdam Centraal"]]
};
/* locali: h = orari lun→dom (siti dei locali e guide, ottobre 2026); "" = chiuso */
var V={
pancake:{n:"Pancakehouse Upstairs",a:"Grimburgwal 2",z:"A",r:"4,2",pos:[52.3688,4.8938],h:["12:00-18:00","12:00-18:00","12:00-18:00","12:00-18:00","12:00-18:00","12:00-18:00","12:00-17:00"],
 d:"Una minuscola sala al primo piano, con quattro tavoli e una scala ripida: pancake olandesi grandi e sottili, dolci o salati, preparati al momento. Si paga solo in contanti.",pr:"Un pancake costa di solito 9–13 € (listino non visto): porta contanti."},
vleminckx:{n:"Vleminckx De Sausmeester",a:"Voetboogstraat 33",z:"A",r:"4,5",pos:[52.3679,4.8905],h:["11:00-19:00","11:00-19:00","11:00-19:00","11:00-20:00","11:00-19:00","11:00-19:00","11:00-19:00"],
 d:"Un chioschetto storico: patatine olandesi fritte due volte, da mangiare in piedi, con la salsa a scelta (le salse si pagano a parte). C'è quasi sempre la fila, che scorre in fretta.",pr:"Un cono piccolo costa intorno ai 5 € e uno grande sui 7–8 €, salse escluse (listino non visto)."},
frens:{n:"Frens Haringhandel",a:"Singel 470 (Koningsplein)",z:"A",r:"4,6",pos:[52.3659,4.8909],h:["12:00-17:00","","12:00-17:00","12:00-17:00","12:00-17:00","12:00-17:00","12:00-17:00"],
 d:"Il carretto dell'aringa: il «broodje haring» (un panino con aringa cruda, cipolla e cetriolini) è il fast food olandese per eccellenza. Accanto al mercato dei fiori, si mangia in piedi sul ponte.",pr:"Un panino con l'aringa costa di solito 4–6 €. Gli orari variano a seconda delle fonti: meglio andarci a metà giornata."},
winkel43:{n:"Winkel 43",a:"Noordermarkt 43",z:"B",r:"4,5",pos:[52.3801,4.8877],h:["07:00-01:00","08:00-01:00","08:00-01:00","08:00-01:00","08:00-02:00","07:00-02:00","09:00-01:00"],
 d:"Il bar-caffè del Noordermarkt che fa la torta di mele più famosa della città: spessa, con cannella e panna montata. Tavoli all'aperto sulla piazza e colazioni semplici fino alle 15.",pr:"Colazione intorno ai 6–10 €; la torta di mele con il caffè sta sotto i 10 € (listino non visto)."},
vlaamsch:{n:"Vlaamsch Broodhuys",a:"Haarlemmerstraat 108",z:"B",r:"4,5",pos:[52.3808,4.8905],h:D7("08:00-17:00"),
 d:"Panetteria artigianale con pane a lievitazione naturale, croissant e panini farciti, nella via dei negozi più vivi del centro. Si prende da portar via o si mangia ai pochi tavoli.",pr:"Un panino o un croissant con il caffè restano sotto gli 8 € (listino non visto)."},
petit:{n:"Petit Gâteau",a:"Haarlemmerstraat 80",z:"B",r:"4,4",pos:[52.3801,4.8920],h:["","10:00-18:00","10:00-18:00","10:00-18:00","10:00-18:00","10:00-18:00",""],
 d:"Pasticceria francese della Haarlemmerstraat: tartellette, éclair, macaron e torte, da portare via o da mangiare ai tavolini. Aperta da martedì a sabato.",pr:"Un dolce con il caffè sta sotto i 9 € (listino non visto)."},
holtkamp:{n:"Patisserie Holtkamp",a:"Vijzelgracht 15",z:"C",r:"4,6",pos:[52.3587,4.8908],h:["08:30-18:00","08:30-18:00","08:30-18:00","08:30-18:00","08:30-18:00","08:30-17:00",""],
 d:"Una pasticceria di tradizione, con la vetrina di vetro e ottone e i celebri croquettes e dolci: lo spuntino classico prima o dopo i musei. Chiusa la domenica.",pr:"Un dolce con il caffè sta sotto i 9 € (listino non visto)."},
backblack:{n:"Back to Black",a:"Weteringstraat 48",z:"C",r:"4,4",pos:[52.3617,4.8868],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","09:00-18:00","09:00-18:00"],
 d:"Caffè di specialità a due passi dal Museumplein: caffè filtrato, torte e panini semplici, con tavolini all'aperto quando c'è il sole.",pr:"Caffè e dolce restano sotto i 9 € (listino non visto)."},
scandi:{n:"Scandinavian Embassy",a:"Sarphatipark 34",z:"D",r:"4,8",pos:[52.3547,4.8946],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","09:00-18:00","09:00-18:00"],
 d:"Il caffè nordico di De Pijp, accanto al Sarphatipark: caffè filtrato di grande qualità, cannella e panini aperti in stile scandinavo, in una sala luminosa.",pr:"Colazione intorno ai 10–12 € (listino non visto)."},
rudis:{n:"Rudi's Stroopwafels",a:"Albert Cuypstraat 180",z:"D",r:"4,4",pos:[52.3558,4.8953],h:["09:30-17:00","09:30-17:00","09:30-17:00","09:30-17:00","09:30-17:00","09:30-17:00",""],
 d:"Il negozio di stroopwafel sul mercato: le cialde olandesi con sciroppo di caramello si fanno al momento, calde e morbide. È lo spuntino ideale mentre si gira per il mercato.",pr:"Una stroopwafel calda costa di solito 3–4 € (listino non visto)."},
spang:{n:"Warung Spang Makandra",a:"Gerard Doustraat 33",z:"D",r:"4,4",pos:[52.3547,4.8935],h:D7("11:00-22:00"),
 d:"Cucina surinamese e indonesiana di quartiere: roti con pollo, nasi e saté, in una sala semplice di De Pijp. È una delle cene più economiche del quartiere.",pr:"Un piatto costa di solito 11–15 € (listino non visto). Gli orari sono quelli del lunedì: controlla gli altri giorni."},
stubbe:{n:"Stubbe's Haring",a:"Singel 8H (Haarlemmersluis)",z:"F",r:"4,4",pos:[52.3788,4.8944],h:["","12:00-17:00","12:00-17:00","12:00-17:00","12:00-17:00","12:00-17:00",""],
 d:"Il carretto di aringhe più vicino alla Stazione Centrale, sul ponte sopra il Singel: aringa cruda, panino con aringa e kibbeling. Si mangia in piedi e si paga solo in contanti.",pr:"Un panino costa circa 5,50 €. Le fonti danno orari diversi: meglio andarci a metà giornata, con contanti."},
bird:{n:"Thai Snackbar Bird",a:"Zeedijk 72",z:"F",r:"4,2",pos:[52.3759,4.9007],h:D7("16:00-22:00"),
 d:"Il ristorante thailandese della Zeedijk, nato come snack bar: curry, noodles e saté in una sala piccola e rumorosa. Accanto, il suo snack bar apre dalle 17 alle 23.",pr:"I piatti più economici partono da 10 €; i secondi arrivano a 20–25 € (listino non visto)."},
foodhallen:{n:"Foodhallen",a:"Hannie Dankbaarpassage 16",z:"G",r:"4,3",pos:[52.3687,4.8676],h:D7("12:00-23:00"),
 d:"Il mercato coperto nell'ex deposito dei tram, a Oud-West: 19 banchi con ramen, pizza, bao, dim sum, tacos, panini e dolci. Ognuno ordina dove vuole e si mangia insieme ai lunghi tavoli.",pr:"Un piatto di un banco costa di solito 8–14 €, bitterballen compresi (ogni banco fa i suoi prezzi)."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["winkel43","vlaamsch"],B:["winkel43","vlaamsch","petit"],C:["backblack","holtkamp"],D:["scandi","holtkamp"],E:["scandi","vlaamsch"],F:["vlaamsch","petit","winkel43"],G:["backblack","scandi"]},
pra:{A:["pancake","vleminckx","frens","vlaamsch"],B:["winkel43","vlaamsch","petit"],C:["backblack","holtkamp","scandi"],D:["scandi","spang","rudis"],E:["vleminckx","spang"],F:["stubbe","bird","vlaamsch"],G:["foodhallen","backblack"]},
cen:{A:["bird","foodhallen"],B:["foodhallen","winkel43"],C:["foodhallen","spang"],D:["spang","foodhallen"],E:["bird","spang"],F:["bird","foodhallen"],G:["foodhallen"]},
snk:{A:["frens","vleminckx","pancake"],B:["petit","winkel43"],C:["holtkamp"],D:["rudis","scandi"],E:["holtkamp","frens"],F:["stubbe","vlaamsch"],G:["foodhallen","backblack"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"canali",t:"Casa di Anne Frank, canali e Jordaan",acts:["annefrankins","canali","jordaan"],need:270,core:1},
{id:"musei",t:"Rijksmuseum e Museo Van Gogh",acts:["rijks","vangogh","museumplein"],need:340,core:1},
{id:"centro",t:"Zeedijk, Dam e Spui",acts:["nieuwmarkt","dam","spui"],need:220,core:1},
{id:"pijp",t:"De Pijp e quartiere ebraico",acts:["pijp","jodenbuurt"],need:190},
{id:"noord",t:"Amsterdam Noord e Vondelpark",acts:["noord","vondel"],need:230}
];
var ORDER=["annefrankins","canali","jordaan","nieuwmarkt","dam","spui","rijks","vangogh","museumplein","pijp","jodenbuurt","vondel","noord"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["centro","Centro storico (Dam, Spui)",[52.3702,4.8920],"A"],
["jordaan","Jordaan / Canali ovest",[52.3770,4.8830],"B"],
["centraal","Stazione Centrale / Nieuwmarkt",[52.3760,4.9000],"F"],
["museum","Museumkwartier / Vondelpark",[52.3585,4.8800],"C"],
["pijp","De Pijp",[52.3555,4.8940],"D"],
["plantage","Plantage / Waterlooplein",[52.3665,4.9100],"E"],
["oudwest","Oud-West / Foodhallen",[52.3680,4.8700],"G"],
["noord","Amsterdam Noord",[52.3880,4.9100],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[52.3731,4.8926],""]
];
/* imposta di soggiorno: percentuale sul prezzo del soggiorno */
var TAX=[["h5","Hotel 4–5 stelle",{pct:12.5}],["h3","Hotel fino a 3 stelle, B&B o appartamento",{pct:12.5}],["host","Ostello o struttura economica",{pct:12.5}],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Koffie e appeltaart","caffè e torta di mele con panna: la colazione olandese più amata."],["Un panino con formaggio","pane morbido con gouda giovane o stagionato, burro e un uovo sodo."],["Un dolce di pasticceria","tartelletta, éclair o un pezzo di torta."]],
pra:[["Broodje haring","il panino con l'aringa cruda e le cipolle: da mangiare in piedi, al mercato."],["Patatine olandesi","fritte due volte, con maionese o salse: quelle di Vleminckx sono un'istituzione."],["Pancake olandese","grandi e sottili, dolci o salati."],["Stroopwafel calda","cialda con caramello, fatta al momento."]],
cen:[["Roti o nasi","cucina surinamese e indonesiana, tra le cene più economiche della città."],["Un banco delle Foodhallen","ramen, pizza, bao o dim sum, per tutti i gusti."],["Bitterballen","crocchette di manzo fritte con senape: l'aperitivo olandese."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Le case dei canali sulla Prinsengracht","Foto","La fila di case strette e inclinate con il canale davanti: la luce migliore è al mattino presto o al tramonto.",[52.3730,4.8845],"Prinsengracht, Amsterdam","canali"],
["📷","Westerkerk dalla Prinsengracht","Foto","Il campanile più alto della città al fondo del canale: la prospettiva classica.",[52.3745,4.8838],"Westerkerk, Amsterdam","canali"],
["📷","I sette ponti di Reguliersgracht","Foto","Dall'incrocio con la Herengracht si vedono in fila sette ponti, una delle viste più sorprendenti della città.",[52.3646,4.8989],"Reguliersgracht, Amsterdam","canali"],
["🤳","Brouwersgracht con le biciclette","Selfie","Il canale più fotografato, con i ponti levatoi e le case-magazzino: porta una bicicletta con te solo in foto.",[52.3811,4.8892],"Brouwersgracht, Amsterdam","jordaan"],
["📷","Noordermarkt dalla Noorderkerk","Foto","La piazza con il bar-caffè Winkel 43 e il mercato: una delle scene più amate del Jordaan.",[52.3800,4.8877],"Noordermarkt, Amsterdam","jordaan"],
["📷","Il cortile del Begijnhof","Foto","Il giardino silenzioso con le case antiche: una luce morbida al mattino.",[52.3694,4.8899],"Begijnhof, Amsterdam","spui"],
["📷","Bloemenmarkt sul Singel","Foto","Le bancarelle di tulipani e bulbi sul canale: colorate ogni mese dell'anno.",[52.3667,4.8914],"Bloemenmarkt, Amsterdam","spui"],
["📷","Piazza Dam e Nieuwe Kerk","Foto","Il Palazzo Reale e la Nieuwe Kerk dal centro della piazza, con il Monumento Nazionale.",[52.3731,4.8926],"Dam Square, Amsterdam","dam"],
["📷","Oude Kerk e il canale","Foto","La chiesa più antica della città, con la torre che affiora sopra i tetti.",[52.3745,4.8985],"Oude Kerk, Amsterdam","nieuwmarkt"],
["📷","La Waag al Nieuwmarkt","Foto","L'antica pesa medievale con le torri a punta, specialmente dalla piazza al tramonto.",[52.3727,4.9003],"Waag, Amsterdam","nieuwmarkt"],
["📷","Il tunnel ciclabile del Rijksmuseum","Foto","Il passaggio sotto il museo, con le biciclette che scorrono e il Museumplein in fondo.",[52.3600,4.8852],"Rijksmuseum, Amsterdam","rijks"],
["📷","Rijksmuseum dal Museumplein","Foto","La facciata in mattoni con le torri, dal prato e dalla vasca.",[52.3573,4.8810],"Museumplein, Amsterdam","museumplein"],
["📷","Il mercato di Albert Cuyp","Foto","Le bancarelle con i formaggi e le stroopwafel, nelle ore del mattino.",[52.3558,4.8955],"Albert Cuypmarkt, Amsterdam","pijp"],
["📷","Magere Brug (Ponte Magro)","Foto","Il ponte levatoio di legno bianco sull'Amstel, illuminato la sera.",[52.3631,4.9020],"Magere Brug, Amsterdam","jodenbuurt"],
["📷","EYE e lo skyline dall'altra riva","Foto","Il museo del cinema con la sua forma d'astronave, e dall'altra parte del fiume IJ la Stazione Centrale.",[52.3843,4.9012],"EYE Filmmuseum, Amsterdam","noord"],
["📷","Il laghetto del Vondelpark","Foto","Prati, alberi e anatre sul lago, con i parrocchetti verdi tra i rami.",[52.3579,4.8686],"Vondelpark, Amsterdam","vondel"]
];
/* avvisi verificati il 10 ottobre 2026 */
var AVV=[
{from:"2026-10-10",to:"2026-11-30",t:"Scioperi dei bus regionali dal 14 ottobre",x:"Dal 14 ottobre sono annunciati scioperi dei bus regionali in alcune province olandesi. La rete urbana GVB di Amsterdam (tram, metro, bus e traghetti) e i treni NS non sono interessati, ma gli scioperi possono cambiare con poco preavviso: controlla gvb.nl e ns.nl nei giorni prima di partire."},
{from:"2026-10-10",to:"2026-11-07",t:"Casa di Anne Frank: biglietti solo online",x:"I biglietti non si vendono alla porta: ogni martedì alle 10 vengono messe in vendita le visite di sei settimane dopo. Il 7 novembre 2026 la casa chiude alle 18:30 invece che alle 22."}
];
/* clima medio di Amsterdam (indicativo, massime/minime) */
var CLIM=[[6,2],[7,2],[10,4],[14,6],[18,9],[20,12],[23,14],[22,14],[19,12],[14,9],[10,6],[7,3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Amsterdam: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="jordaan"&&WD===0)meta+=" Oggi è lunedì: al Noordermarkt c'è il mercato delle pulci (circa 9–13).";
if(it.id==="jordaan"&&WD===5)meta+=" Oggi è sabato: al Noordermarkt c'è il mercato biologico (circa 9–16).";
if(it.id==="pijp"&&WD===6)meta+=" Oggi è domenica: il mercato di Albert Cuyp è chiuso e molti negozi restano chiusi.";
if(it.id==="spui"&&WD===4)meta+=" Oggi è venerdì: allo Spui c'è il mercato dei libri.";
if(it.id==="spui"&&WD===6)meta+=" Oggi è domenica: allo Spui c'è il mercato dell'arte (circa 11–18), e il mercato dei fiori apre alle 11.";
if(it.id==="jodenbuurt"&&WD===6)meta+=" Oggi è domenica: il mercato di Waterlooplein di solito è chiuso.";
return meta}
Object.assign(C,{id:"amsterdam",n:"Amsterdam",cn:"Paesi Bassi",e:"🚲",flag:"🇳🇱",col:["#bf2a1f","#2c4a6e","#f39200"],k:"amsterdam olanda paesi bassi holland netherlands",
TZ:"Europe/Amsterdam",LL:[52.3676,4.9041],CC:"nl",QN:"Amsterdam",BK:"Amsterdam",ARE:/amsterdam|\b1[0-9]{3}\s?[a-z]{2}\b/i,VER:"10 ottobre 2026",
Z0:"F",LANG:"nl-NL",LANGN:"olandese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Amsterdam Centraal",q:"Amsterdam Centraal station"},
SINGLE:{acts:["nieuwmarkt","dam","spui","canali","jordaan","museumplein","pijp"],ins:[]},
EXCL:[],
DICON:{annefrankins:"📖",rijks:"🖼️",vangogh:"🌻",jodenbuurt:"🛍️",vondel:"🌳",noord:"⛴️"},
ZN:{A:"in centro, tra Dam e Spui",B:"nel Jordaan",C:"al Museumplein",D:"a De Pijp",E:"a Plantage e Waterlooplein",F:"vicino alla Stazione Centrale",G:"a Oud-West e al Vondelpark"},
NEAR:{col:"caffè",pra:"caffè o chiosco",cen:"ristorante",snk:"pasticceria"},
SE:{pancake:"🥞",vleminckx:"🍟",frens:"🐟",winkel43:"🥧",vlaamsch:"🥖",petit:"🍰",holtkamp:"🥐",backblack:"☕",scandi:"🥪",rudis:"🧇",spang:"🍛",stubbe:"🐟",bird:"🍜",foodhallen:"🍽️"},
TR:{one:3.4,cap:10,lbl:"Tram, metro, bus e traghetti (GVB)",
 air:{AMS:{one:6,n:"Treno per Schiphol"},EIN:{one:29,n:"Bus 400 e treno per Eindhoven"}},
 passes:[
 {n:"GVB 24 ore",d:1,max:1,p:10,note:"Il biglietto GVB 24 ore (10 €) vale su tram, metro, bus e traghetti di Amsterdam per un giorno intero."},
 {n:"GVB 48 ore",d:2,p:16,only:function(T){return T.n===2},note:"Il biglietto GVB 48 ore (16 €) vale su tram, metro, bus e traghetti di Amsterdam."},
 {n:"GVB 72 ore",d:3,p:21.5,only:function(T){return T.n===3},note:"Il biglietto GVB 72 ore (21,50 €) vale su tram, metro, bus e traghetti di Amsterdam."},
 {n:"GVB 4 giorni",d:4,p:27.5,only:function(T){return T.n===4},note:"Il biglietto GVB per 4 giorni (27,50 €) vale su tram, metro, bus e traghetti."},
 {n:"GVB 5 giorni",d:5,p:34,only:function(T){return T.n===5},note:"Il biglietto GVB per 5 giorni (34 €) vale su tram, metro, bus e traghetti."},
 {n:"GVB 6 giorni",d:6,p:39,only:function(T){return T.n===6},note:"Il biglietto GVB per 6 giorni (39 €) vale su tram, metro, bus e traghetti."},
 {n:"GVB 7 giorni",d:7,p:43,only:function(T){return T.n===7},note:"Il biglietto GVB per 7 giorni (43 €) vale su tram, metro, bus e traghetti."}],
 note:"Prezzi di ottobre 2026: il biglietto GVB di un'ora costa circa 3,40 €; i biglietti a durata costano 10 € (24 ore), 16 € (48 ore), 21,50 € (72 ore) e da 27,50 € a 43 € per 4–7 giorni. Si può anche pagare ogni corsa con la carta contactless (check-in e check-out al lettore). Il treno da Schiphol costa circa 6 € e non è compreso. I traghetti dietro la Stazione Centrale sono gratuiti."},
FOOD:{co:[8,"Colazione al caffè (caffè e torta o panino)"],pr:[13,"Pranzo (aringa, patatine o pancake)"],ce:[13,"Cena (roti, Foodhallen o noodles)"],sp:[5,"Stroopwafel e spuntini"]},
T:{ride:"In tram o metro",move:"tutto a piedi, in tram o in metro",bags:"«Kan ik mijn bagage hier laten?»",bagsPM:"«Kan ik mijn bagage tot vanmiddag hier laten?»",bagsAM:"«Kan ik mijn bagage tot twaalf uur hier laten?»",
pra:"Un caffè o un chiosco",praZ:{A:"Intorno alla piazza Dam e sul Damrak i ristoranti sono per turisti e costano molto: i posti buoni sono i chioschi (patatine, aringhe) e i caffè delle vie laterali.",D:"A De Pijp si mangia bene e spendendo poco: i banchi del mercato e i warung (cucina surinamese e indonesiana) fanno pranzi sotto i 10–12 €."},
freeLong:"Qualche idea: una passeggiata lungo i canali, il Vondelpark, un caffè in un «brown café», il traghetto gratuito per Noord, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata lungo un canale.",
remind:"Se vuoi entrare nella Casa di Anne Frank, al Rijksmuseum o al Museo Van Gogh, compra prima il biglietto online: sono tutti a orario e quello di Anne Frank non si vende alla porta.",
rain1:"Al coperto: il Rijksmuseum, il Museo Van Gogh, i caffè del Jordaan e le Foodhallen.",
rainM:"Al coperto: Rijksmuseum, Museo Van Gogh, Casa di Anne Frank, EYE e le Foodhallen.",
water:"Riempite la borraccia: l'acqua del rubinetto di Amsterdam è ottima e molti caffè la danno gratis («kraanwater, alstublieft»). Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"Ad Amsterdam si pranza tra le 12 e le 14 e si cena presto, tra le 17:30 e le 20:30: molte cucine chiudono alle 21–22, guarda l'orario accanto a ogni locale.",
night:[["🍺","Una birra in un «brown café» (il locale tradizionale con il legno scuro) è il modo olandese di chiudere la giornata."],["🕙","Le cucine chiudono presto, spesso alle 21–22; tram e metro vanno fino a mezzanotte e mezzo circa, poi ci sono i bus notturni."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per locali di quartiere: colazione e cena restano intorno ai 15 € a persona, ma i prezzi ad Amsterdam sono più alti che in Italia.",
taxNote:"L'imposta di soggiorno di Amsterdam è il 12,5% del prezzo del soggiorno, per ogni notte; spesso è già compresa nel prezzo, controlla l'annuncio.",
mcrit:"Criteri: almeno 4 stelle su Google, caffè, panetterie, chioschi e locali di quartiere, niente catene. Colazione e cena restano intorno o sotto i 15 € a persona (ad Amsterdam i prezzi sono più alti, il pranzo può costare di più). Valutazioni e orari da guide e siti dei locali (ottobre 2026), prezzi indicativi: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["I treni per Centraal partono ogni pochi minuti: non serve prenotare, basta il biglietto o la carta contactless al tornello.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["pay","Carta contactless o telefono con pagamenti abilitati: ad Amsterdam si paga quasi tutto con la carta"],["gvb","Biglietto GVB o carta contactless per tram, metro e bus (check-in e check-out ad ogni corsa)"],["tk","Biglietto del treno per l'aeroporto, alle macchinette NS o con la carta contactless",function(E){return["AMS","EIN"].indexOf(E.cfg.to)>=0}],["af","Biglietto con orario per la Casa di Anne Frank (annefrank.org, solo online: le date escono 6 settimane prima)",["annefrankins"]],["rijks","Biglietto con orario per il Rijksmuseum (rijksmuseum.nl)",["rijks"]],["vg","Biglietto con orario per il Museo Van Gogh (vangoghmuseum.nl)",["vangogh"]],["cash","Qualche euro in contanti per i chioschi di aringhe, il Pancakehouse Upstairs e le bancarelle del mercato"],["rain","Un impermeabile leggero: ad Amsterdam piove spesso e a lampi"]],
NUM:{1:["één","en"],2:["twee","tvee"],3:["drie","dri"],4:["vier","vir"],5:["vijf","veif"],6:["zes","zes"],7:["zeven","ZE-ven"],8:["acht","acht"],9:["negen","NE-ghen"],10:["tien","tin"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Goedemorgen / Goedenavond","CHU-de-mor-ghen / CHU-den-AH-vont"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Een tafel voor "+(N===1?"één persoon":nu[0])+", alstublieft","en TAH-fel vor "+(N===1?"en per-SON":nu[1])+", AL-stu-bleeft"],["Un caffè e una torta di mele, per favore","Een koffie en een appeltaart, alstublieft","en CO-fi en en AP-pel-tart, AL-stu-bleeft"],["Un panino con l'aringa, per favore","Een broodje haring, alstublieft","en BRO-tie HA-ring, AL-stu-bleeft"],["Acqua del rubinetto, per favore","Kraanwater, alstublieft","CRAN-va-ter, AL-stu-bleeft"],["Il conto, per favore","De rekening, alstublieft","de RE-ke-ning, AL-stu-bleeft"],["Posso pagare con la carta?","Kan ik met pin betalen?","can ik met pin be-TAH-len"],["Quanto costa?","Hoeveel kost het?","HU-veel cost het"],["Dov'è la fermata del tram?","Waar is de tramhalte?","var is de TRAM-hal-te"],["Da quale binario parte il treno per l'aeroporto?","Welk spoor gaat naar Schiphol?","velk spor gat nar SCHIP-hol"]];
if(M)fr=fr.concat([["Ho una prenotazione","Ik heb een reservering","ik hep en re-ser-VE-ring"],["Posso lasciare i bagagli?","Kan ik mijn bagage hier laten?","can ik mein ba-GA-je hir LA-ten"],["A che ora è il check-out?","Hoe laat is het uitchecken?","hu lat is het AUT-che-ken"]]);
return fr.concat([["Mi scusi","Pardon","par-DON"],["Grazie mille!","Hartelijk bedankt!","HAR-te-lek be-DANKT"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Amsterdam: "+(tx[2]&&tx[2].pct?"il "+String(tx[2].pct).replace(".",",")+"% del prezzo del soggiorno ("+tx[1].toLowerCase()+"), per ogni notte":"non si paga se sei ospite di amici o parenti")+". Spesso è già compresa nel prezzo che trovi sull'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["Tram e metro di Amsterdam funzionano fino a circa mezzanotte e mezzo; dopo ci sono i bus notturni (linee N). In centro si cammina bene e c'è sempre qualche bar aperto."],
ZONES:[
["🚇 Tram, metro, bus e traghetti",["Con la carta contactless si tocca il lettore all'inizio e alla fine di ogni corsa (check-in e check-out), sempre con la stessa carta. Se fai più corse, conviene il biglietto GVB: 10 € per 24 ore, 16 € per 48, 21,50 € per 72.","I traghetti per Amsterdam Noord, dietro la Stazione Centrale, sono gratuiti e partono ogni pochi minuti.","Attenzione alle biciclette: le piste rosse sono solo per loro, non fermarti sulla corsia e guarda sempre prima di attraversare. Sono veloci e silenziose.","I tram e la metro hanno un solo capolinea per direzione: controlla il numero e la direzione sul display."]],
["🏛️ Dam, Spui e Zeedijk",["La piazza Dam e il Damrak sono le zone più turistiche (e care) per mangiare: spostati nelle vie laterali e ai chioschi.","Il Begijnhof è un cortile residenziale: parla piano e non entrare nelle case.","Nel quartiere a luci rosse non si fotografano le vetrine, e attenzione ai borseggiatori soprattutto la sera.","Il mercato dei fiori galleggiante è colorato ma turistico: i bulbi in vendita hanno un certificato per l'espatrio, controlla prima di comprare."],["nieuwmarkt","dam","spui"]],
["📖 Anne Frank, canali e Jordaan",["La Casa di Anne Frank si visita solo con biglietto a orario comprato online: non si vende alla porta. Le visite di sei settimane dopo escono ogni martedì alle 10.","I canali più belli sono Prinsengracht, Keizersgracht e Herengracht: camminando lungo i primi due si arriva alla Westerkerk.","Il Noordermarkt ha un mercato delle pulci il lunedì mattina e uno biologico il sabato.","Il Jordaan è un quartiere residenziale: i caffè e le gallerie sono migliori nelle vie laterali."],["annefrankins","canali","jordaan"]],
["🖼️ Rijksmuseum e Van Gogh",["Rijksmuseum: 25 €, aperto tutti i giorni 9–17. Van Gogh: circa 27 €, orari da controllare sul sito. Entrambi hanno ingressi a orario: compra online.","La ronda di notte di Rembrandt è nella grande sala del primo piano: per i capolavori bastano 2–3 ore.","Il Museumplein ha un prato, una vasca e i musei attorno: ottimo per un picnic, se il tempo regge."],["rijks","vangogh","museumplein"]],
["🧇 De Pijp e quartiere ebraico",["Il mercato di Albert Cuyp è aperto dal lunedì al sabato (di solito 9:30–17); alcune bancarelle accettano solo contanti.","Per le stroopwafel scegli quelle calde, fatte al momento.","Waterlooplein ha un mercato delle pulci dal lunedì al sabato; la domenica è tutto più calmo."],["pijp","jodenbuurt"]],
["⛴️ Amsterdam Noord e Vondelpark",["I traghetti per Noord sono gratuiti; la terrazza dell'EYE ha la vista migliore sullo skyline dalla riva opposta.","Il Vondelpark è aperto sempre e gratis; le Foodhallen sono aperte ogni giorno dalle 12 alle 23.","I parrocchetti verdi del Vondelpark sono veri: sono scappati da qualche voliera negli anni Sessanta."],["noord","vondel"]]],
WTIPS:["L'acqua del rubinetto di Amsterdam è potabile e ottima: puoi chiederla gratis in ogni ristorante («kraanwater, alstublieft») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia gratis se la chiedi gentilmente.","L'acqua dei canali non è potabile: non berla e non toccare le fontane monumentali."],
GEN:["I Paesi Bassi usano l'euro, come l'Italia, e fanno parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Si paga quasi sempre con la carta o con il telefono, anche per un caffè; solo alcuni chioschi e bancarelle chiedono contanti.","Mancia: non è obbligatoria; nei ristoranti si arrotonda o si lascia il 5–10% se il servizio è stato buono.","Gli olandesi parlano quasi tutti inglese: puoi usarlo senza problemi, ma una parola in olandese è sempre apprezzata.","Attenzione alle biciclette: sono ovunque e hanno la precedenza sulle piste rosse. Non camminare sulla pista e non fermarti sulle rotaie del tram.","Attenzione ai borseggiatori alla Stazione Centrale, in piazza Dam e sui tram affollati: zaino davanti.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco) · <a class="call" href="tel:0900-8844">📞 0900-8844</a> Polizia per i casi non urgenti</li><li>🚇 Tram, metro, bus e traghetti, anche per oggetti smarriti: <a href="https://www.gvb.nl/" target="_blank" rel="noopener">gvb.nl</a>; treni: <a href="https://www.ns.nl/" target="_blank" rel="noopener">ns.nl</a>.</li><li>🇮🇹 Consolato d\'Italia ad Amsterdam: <a href="https://consamsterdam.esteri.it" target="_blank" rel="noopener">consamsterdam.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 10 ottobre 2026 sono annunciati scioperi dei bus regionali dal 14 ottobre in alcune province olandesi: la rete urbana GVB di Amsterdam (tram, metro, bus, traghetti) e i treni NS non sono interessati. Gli scioperi possono cambiare con poco preavviso: nei giorni prima controllate <a href="https://www.gvb.nl/" target="_blank" rel="noopener">gvb.nl</a> e <a href="https://www.ns.nl/" target="_blank" rel="noopener">ns.nl</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="28" r="12"/><path d="M0 106 Q60 92 120 98 T240 96 T400 100 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M8 106 V62 H38 V106 Z M8 62 Q8 52 16 50 Q20 40 23 38 Q26 40 30 50 Q38 52 38 62 Z"/><path d="M38 106 V64 H44 V58 H50 V52 H58 V58 H64 V64 H70 V106 Z"/><path d="M70 106 V60 H98 V106 Z M70 60 L84 40 L98 60 Z M83 40 V32 h2 V40 Z"/></g>'+
'<g style="--k:2"><path d="M108 106 V82 H134 V106 Z M156 106 V82 H182 V106 Z"/><path d="M134 106 V44 H156 V106 Z M136 44 V30 H154 V44 Z M139 30 V20 H151 V30 Z M139 20 Q145 4 151 20 Z M144 8 V0 h2 V8 Z"/></g>'+
'<g style="--k:3"><path d="M190 106 V68 H215 V106 Z M190 68 L202.5 48 L215 68 Z M200 48 V42 h5 V48 Z"/><path d="M215 106 V58 H245 V106 Z M215 58 Q215 50 222 48 Q226 40 230 38 Q234 40 238 48 Q245 50 245 58 Z"/><path d="M245 106 V72 H266 V106 Z M245 72 V66 H250 V60 H256 V66 H262 V72 Z"/></g>'+
'<g style="--k:4"><path d="M276 106 V78 H352 V106 Z M280 78 V58 H296 V78 Z M280 58 L288 44 L296 58 Z M332 78 V58 H348 V78 Z M332 58 L340 44 L348 58 Z M304 78 V62 L314 52 L324 62 V78 Z"/></g>'+
'<g style="--k:5"><path d="M364 106 L368 66 H384 L388 106 Z M366 66 Q376 54 386 66 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M16 76 h8 M16 86 h8 M46 80 h8 M46 90 h8 M78 78 h8 M78 90 h8 M194 80 h8 M194 90 h8 M222 70 h8 M222 82 h8 M248 84 h8 M248 94 h8"/><path d="M376 60 L358 42 M376 60 L394 42 M376 60 L360 78 M376 60 L392 78"/><path d="M146 36 v6 M286 90 h56 M286 96 h56"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="30" cy="12" r="1.6"/><circle cx="108" cy="28" r="1.3"/><circle cx="170" cy="14" r="1.3"/><circle cx="236" cy="26" r="1.3"/><circle cx="318" cy="22" r="1.3"/><circle cx="380" cy="10" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.amsterdam);

;var n=window.CITIES["amsterdam"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["amsterdam"]);
