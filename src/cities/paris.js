/* ===== Parigi (dati verificati il 9 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.paris=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
/* aeroporti di partenza suggeriti, con pagina ufficiale */
var FROM=[
["BLQ","Bologna","https://www.bologna-airport.it/voli/vola-da-bologna/voli-in-tempo-reale/?idC=62178"],
["MXP","Milano Malpensa","https://www.milanomalpensa-airport.com/"],
["LIN","Milano Linate","https://www.milanolinate-airport.com/"],
["BGY","Bergamo Orio al Serio","https://www.milanbergamoairport.it/"],
["FCO","Roma Fiumicino","https://www.adr.it/fiumicino"],
["CIA","Roma Ciampino","https://www.adr.it/ciampino"],
["VCE","Venezia Marco Polo","https://www.veneziaairport.it/"],
["TSF","Treviso","https://www.trevisoairport.it/"],
["VRN","Verona","https://www.aeroportoverona.it/"],
["TRN","Torino","https://www.aeroportoditorino.it/"],
["GOA","Genova","https://www.airport.genova.it/"],
["PSA","Pisa","https://www.pisa-airport.com/"],
["FLR","Firenze","https://www.aeroporto.firenze.it/"],
["NAP","Napoli","https://www.aeroportodinapoli.it/"],
["BRI","Bari","https://www.aeroportidipuglia.it/"],
["BDS","Brindisi","https://www.aeroportidipuglia.it/"],
["CTA","Catania","https://www.aeroporto.catania.it/"],
["PMO","Palermo","https://www.aeroportodipalermo.it/"],
["CAG","Cagliari","https://www.sogaer.it/"]
];
/* aeroporti di Parigi */
var PAR={
CDG:{n:"Charles de Gaulle",s:"Roissy-Charles de Gaulle",url:"https://www.parisaeroport.fr/",live:"Paris Aéroport",inMin:80,buf:120,pos:[49.0042,2.5711],
 arr:"Segui i cartelli «Paris par train» fino alla stazione del RER B (Terminal 2: stazione Aéroport CDG 2 TGV; Terminal 1: navetta gratuita CDGVAL fino alla stazione CDG 1). Il RER B porta a Châtelet–Les Halles in circa 35 minuti, senza cambi.",
 tk:"Biglietto «Paris Région <> Aéroports» da 14 € a tratta (solo digitale: su carta Navigo Easy da 2 € o nell'app Île-de-France Mobilités / Bonjour RATP).",
 gm:"Aéroport Charles de Gaulle 2 TGV"},
ORY:{n:"Orly",s:"Paris-Orly",url:"https://www.parisaeroport.fr/",live:"Paris Aéroport",inMin:60,buf:105,pos:[48.7286,2.3601],
 arr:"Segui i cartelli per la metro 14: dalla stazione Aéroport d'Orly arrivi a Châtelet in circa 25 minuti, senza cambi. L'Orlyval con cambio sul RER B ad Antony esiste ancora, ma la metro 14 è più semplice.",
 tk:"Biglietto «Paris Région <> Aéroports» da 14 € a tratta, valido per metro 14 e Orlyval (solo digitale: su carta Navigo Easy da 2 € o nell'app).",
 gm:"Aéroport d'Orly métro 14"},
BVA:{n:"Beauvais",s:"Paris-Beauvais",url:"https://www.aeroportparisbeauvais.com/",live:"Aéroport Paris-Beauvais",inMin:160,buf:100,pos:[49.4544,2.1128],
 arr:"La navetta Aérobus (linea A01) parte davanti al terminal dopo l'arrivo dei voli e arriva a Porte Maillot (22-24 boulevard Pershing) in circa 1 h 30, traffico permettendo. Da Porte Maillot la metro 1 porta a Châtelet in circa 20 minuti.",
 tk:"Navetta Aérobus Porte Maillot: 17,90 € solo andata online, 29,90 € andata e ritorno online (35 € in aeroporto). Il Navigo non vale sulla navetta.",
 gm:"Porte Maillot navette Beauvais"}
};
/* linee (tracciati indicativi) */
var SEG={
rerB:{c:"#5291ce",n:"RER B",p:[[49.0042,2.5711,"Aéroport CDG 2",2],[49.0100,2.5590,"Aéroport CDG 1",1],[48.9900,2.5350],[48.9737,2.5148,"Parc des Expositions"],[48.9600,2.5100],[48.9460,2.5050],[48.9318,2.4954,"Aulnay-sous-Bois"],[48.9330,2.4670],[48.9311,2.4256,"Le Bourget"],[48.9203,2.4044,"La Courneuve"],[48.9183,2.3620,"Stade de France"],[48.8964,2.3580],[48.8809,2.3553,"Gare du Nord",2],[48.8619,2.3470,"Châtelet–Les Halles",2],[48.8534,2.3446,"Saint-Michel Notre-Dame",1]]},
m14:{c:"#62259d",n:"Metro 14",p:[[48.7286,2.3601,"Aéroport d'Orly",2],[48.7438,2.3478,"Pont de Rungis"],[48.7570,2.3640,"M.I.N. Porte de Thiais"],[48.7728,2.3612,"Chevilly-Larue"],[48.7930,2.3615,"Villejuif–G. Roussy"],[48.8105,2.3627,"Kremlin-Bicêtre Hôpital"],[48.8221,2.3584,"Maison Blanche"],[48.8271,2.3668,"Olympiades"],[48.8299,2.3762,"Bibliothèque F. Mitterrand"],[48.8333,2.3866,"Cour Saint-Émilion"],[48.8401,2.3793,"Bercy"],[48.8443,2.3739,"Gare de Lyon",1],[48.8590,2.3470,"Châtelet",2],[48.8657,2.3343,"Pyramides",1],[48.8700,2.3245,"Madeleine",2]]},
bva:{c:"#e1253a",n:"Navetta Aérobus",p:[[49.4544,2.1128,"Aéroport de Beauvais",2],[49.40,2.13],[49.30,2.17],[49.15,2.21],[49.03,2.25],[48.93,2.27],[48.8781,2.2826,"Porte Maillot",2]]},
m1:{c:"#ffcd00",n:"Metro 1",p:[[48.8781,2.2826,"Porte Maillot",2],[48.8756,2.2894,"Argentine"],[48.8738,2.2950,"Charles de Gaulle–Étoile",2],[48.8720,2.3006,"George V"],[48.8690,2.3096,"Franklin D. Roosevelt",1],[48.8676,2.3140,"Champs-Élysées–Clemenceau"],[48.8656,2.3212,"Concorde",1],[48.8644,2.3297,"Tuileries",1],[48.8624,2.3364,"Palais Royal–Louvre",1],[48.8608,2.3409,"Louvre–Rivoli"],[48.8582,2.3474,"Châtelet",2],[48.8573,2.3518,"Hôtel de Ville"],[48.8551,2.3608,"Saint-Paul"],[48.8531,2.3691,"Bastille"],[48.8457,2.3731,"Gare de Lyon"]]},
m9:{c:"#b6bd00",n:"Metro 9",p:[[48.8690,2.3096,"Franklin D. Roosevelt",1],[48.8647,2.3010,"Alma–Marceau"],[48.8648,2.2938,"Iéna"],[48.8631,2.2870,"Trocadéro",2]]},
m8:{c:"#d282be",n:"Metro 8",p:[[48.8549,2.3064,"École Militaire",2],[48.8577,2.3105,"La Tour-Maubourg"],[48.8610,2.3145,"Invalides"],[48.8656,2.3212,"Concorde",1],[48.8700,2.3245,"Madeleine",2]]},
m12:{c:"#007852",n:"Metro 12",p:[[48.8700,2.3245,"Madeleine",2],[48.8754,2.3255,"Saint-Lazare"],[48.8763,2.3329,"Trinité"],[48.8760,2.3380,"N.-D.-de-Lorette"],[48.8785,2.3375,"Saint-Georges"],[48.8821,2.3374,"Pigalle"],[48.8844,2.3384,"Abbesses",2]]},
m6:{c:"#6eca97",n:"Metro 6",p:[[48.8539,2.2894,"Bir-Hakeim",1],[48.8576,2.2856,"Passy"],[48.8631,2.2870,"Trocadéro",1],[48.8669,2.2900,"Boissière"],[48.8715,2.2932,"Kléber"],[48.8738,2.2950,"Charles de Gaulle–Étoile",2]]},
m2:{c:"#003ca6",n:"Metro 2",p:[[48.8738,2.2950,"Charles de Gaulle–Étoile",2],[48.8781,2.2982,"Ternes"],[48.8792,2.3034,"Courcelles"],[48.8805,2.3094,"Monceau"],[48.8812,2.3158,"Villiers"],[48.8823,2.3214,"Rome"],[48.8836,2.3274,"Place de Clichy"],[48.8837,2.3325,"Blanche"],[48.8821,2.3374,"Pigalle"],[48.8829,2.3442,"Anvers",2],[48.8837,2.3497,"Barbès–Rochechouart",1]]},
m4:{c:"#cf009e",n:"Metro 4",p:[[48.8837,2.3497,"Barbès–Rochechouart",1],[48.8809,2.3553,"Gare du Nord",2]]},
rerC:{c:"#f3c300",n:"RER C",p:[[48.8534,2.3446,"Saint-Michel Notre-Dame",1],[48.8600,2.3254,"Musée d'Orsay"],[48.8628,2.3141,"Invalides"],[48.8624,2.3017,"Pont de l'Alma"],[48.8556,2.2898,"Champ de Mars–Tour Eiffel",2],[48.8471,2.2768,"Javel"],[48.8237,2.2626,"Issy"],[48.8098,2.2324,"Meudon-Val-Fleury"],[48.8017,2.1792,"Chaville-Vélizy"],[48.8008,2.1301,"Versailles Château Rive Gauche",2]]},
rerA:{c:"#e3051c",n:"RER A",p:[[48.8738,2.2950,"Charles de Gaulle–Étoile",2],[48.8726,2.3290,"Auber"],[48.8619,2.3470,"Châtelet–Les Halles",2]]}
};
var START=[48.8593,2.3473];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
marais:{t:"Marais e Place des Vosges",z:"A",p:4,min:30,id:50,max:70,pos:[48.8556,2.3655],q:"Place des Vosges, Paris",cls:"walk",
 d:"Rue des Rosiers e le stradine del Marais, poi Place des Vosges, la piazza più antica di Parigi (1612), con i portici e il giardino al centro.",
 m:"Tutto gratis. Un passaggio poco noto: il giardino dell'Hôtel de Sully, su Rue Saint-Antoine, porta dritto sotto i portici della piazza."},
notredame:{t:"Notre-Dame e Île de la Cité",z:"A",p:1,min:35,id:60,max:95,pos:[48.8530,2.3499],q:"Cathédrale Notre-Dame de Paris",cls:"",
 d:"La cattedrale riaperta nel dicembre 2024 dopo l'incendio. L'ingresso è gratuito: prenota uno slot gratis sul sito ufficiale notredamedeparis.fr (si aprono 48 ore prima, a mezzanotte) per evitare la coda, che senza prenotazione può superare l'ora. Poi il giro dell'Île de la Cité e il lungosenna.",
 m:"Le torri si visitano a parte: 16 €, 424 gradini, solo con prenotazione online."},
saintechapelle:{t:"Sainte-Chapelle",z:"A",p:7,opt:1,min:45,id:50,max:60,pos:[48.8554,2.3450],q:"Sainte-Chapelle, Paris",cls:"",
 d:"Le vetrate gotiche più spettacolari di Parigi, a 5 minuti da Notre-Dame. La prenotazione di un orario è obbligatoria: fallo online prima di partire.",
 m:""},
louvre:{t:"Louvre, Palais-Royal e Tuileries",z:"B",p:2,min:30,id:50,max:80,pos:[48.8610,2.3358],q:"Pyramide du Louvre, Paris",cls:"walk",
 d:"La Piramide e la Cour Napoléon, poi il cortile del Palais-Royal con le colonne di Buren e il Jardin des Tuileries. Da fuori è tutto gratis.",
 m:"Il museo è chiuso il martedì e per visitarlo servirebbe mezza giornata: in una gita in giornata conviene goderselo da fuori."},
eiffel:{t:"Tour Eiffel e Trocadéro",z:"C",p:1,min:40,id:75,max:150,pos:[48.8584,2.2945],q:"Tour Eiffel, Paris",cls:"",
 d:"Esci alla fermata Trocadéro per la vista classica dalla spianata, attraversa il Pont d'Iéna, passa sotto la torre e prosegui sul Champ de Mars fino a École Militaire.",
 m:"Salire costa da 14,80 € (a piedi fino al 2° piano) a 36,70 € (ascensore fino in cima); dal 29 settembre 2026 anche i biglietti per le scale vanno prenotati online. Dopo il tramonto, all'inizio di ogni ora, la torre scintilla per qualche minuto."},
arc:{t:"Arc de Triomphe e Champs-Élysées",z:"E",p:6,opt:1,min:35,id:45,max:60,pos:[48.8738,2.2950],q:"Arc de Triomphe, Paris",cls:"walk",
 d:"L'arco visto da vicino (si raggiunge col sottopassaggio, non attraversando la rotonda) e un tratto del viale degli Champs-Élysées.",
 m:"Salire sulla terrazza è a pagamento; guardarlo da fuori è gratis."},
montmartre:{t:"Montmartre e Sacré-Cœur",z:"D",p:3,min:45,id:80,max:120,pos:[48.8867,2.3431],q:"Basilique du Sacré-Cœur de Montmartre",cls:"walk",
 d:"Da Abbesses: il Mur des je t'aime, le stradine di Rue des Trois Frères, la scalinata (o la funicolare) fino al Sacré-Cœur, poi Place du Tertre e La Maison Rose.",
 m:"La basilica è gratuita. Davanti alla scalinata attenzione a chi offre braccialetti «in regalo» e ai borseggiatori."}
};
/* tappe in più per i viaggi di più giorni (verificate il 9 ottobre 2026) */
var MO=function(d){return +d.slice(5,7)-1};
Object.assign(STOPS,{
louvremus:{t:"Museo del Louvre",z:"B",p:2,min:120,id:150,max:210,pos:[48.8606,2.3376],q:"Musée du Louvre, Paris",cls:"",multi:1,cl:[1],
 win:function(wd){return[9*60,(wd===2||wd===4?21*60:18*60)-30]},
 d:"Dentro il museo: la Gioconda, la Venere di Milo, la Nike di Samotracia e gli appartamenti di Napoleone III. Scegli due o tre ali, tutto non si vede neanche in una settimana.",
 m:"Biglietto 22 € per i residenti UE (32 € per gli altri), gratis sotto i 18 anni e per i residenti UE sotto i 26. Chiuso il martedì; mercoledì e venerdì aperto fino alle 21. Prenota l'orario su ticket.louvre.fr: senza prenotazione si entra solo se restano posti."},
orsay:{t:"Musée d'Orsay",z:"G",p:5,min:90,id:120,max:150,pos:[48.8600,2.3266],q:"Musée d'Orsay, Paris",cls:"",multi:1,cl:[0],
 win:function(wd){return[9*60+30,(wd===3?21*60+45:18*60)-15]},
 d:"Gli impressionisti in una vecchia stazione: Monet, Renoir, Van Gogh, Degas. Al quinto piano, la vista su Parigi attraverso il grande orologio.",
 m:"Biglietto 16 € online, gratis per i residenti UE sotto i 26 anni. Chiuso il lunedì; il giovedì aperto fino alle 21:45."},
stgermain:{t:"Saint-Germain-des-Prés",z:"G",p:6,min:30,id:45,max:70,pos:[48.8540,2.3336],q:"Église de Saint-Germain-des-Prés, Paris",cls:"walk",multi:1,
 d:"La chiesa più antica di Parigi, le vie di librerie e gallerie tra Rue de Buci e Rue de Seine, poi Saint-Sulpice.",
 m:"Tutto gratis. I caffè storici della piazza costano cari: per un caffè spostati di una via."},
latin:{t:"Quartiere Latino, Panthéon e Luxembourg",z:"G",p:5,min:60,id:90,max:130,pos:[48.8462,2.3464],q:"Panthéon, Paris",cls:"walk",multi:1,
 win:function(wd,d,ss){return[8*60,ss]},
 d:"La Sorbona, il Panthéon e Rue Mouffetard, poi il Jardin du Luxembourg con la Fontaine Médicis e il Palazzo del Senato.",
 m:"Il giardino è gratuito e chiude al tramonto (l'orario cambia con le stagioni). Dentro il Panthéon: 11,50 €, aperto tutti i giorni."},
opera:{t:"Opéra Garnier e Galeries Lafayette",z:"F",p:6,min:45,id:75,max:100,pos:[48.8720,2.3316],q:"Palais Garnier, Paris",cls:"",multi:1,
 win:function(wd,d){var m=+d.slice(5,7),g=+d.slice(8,10),sum=(m===7&&g>=15)||m===8;return[10*60,(sum?18*60:17*60)-15]},
 d:"Lo scalone e il foyer dorato dell'Opéra Garnier, poi la terrazza gratuita sul tetto delle Galeries Lafayette, con vista sull'Opéra e sulla Tour Eiffel.",
 m:"Visita libera 15 € per i residenti UE (25 € per gli altri), solo online su operadeparis.fr: alla cassa non si vendono biglietti. Aperto 10–17 (ultimo accesso mezz'ora prima). La sala può essere chiusa per le prove. La terrazza delle Galeries Lafayette è gratuita e può chiudere con il maltempo."},
canal:{t:"Canal Saint-Martin",z:"H",p:7,min:30,id:50,max:70,pos:[48.8710,2.3650],q:"Canal Saint-Martin, Paris",cls:"walk",multi:1,
 d:"Le passerelle di ferro, le chiuse e i caffè del quartiere più amato dai parigini, da République verso Jaurès.",
 m:"Tutto gratis. La domenica pomeriggio i lungocanale sono pedonali."},
perelachaise:{t:"Cimitero del Père-Lachaise",z:"H",p:7,min:45,id:75,max:100,pos:[48.8614,2.3934],q:"Cimetière du Père-Lachaise, Paris",cls:"walk",multi:1,
 win:function(wd,d){var o=wd===5?8*60+30:wd===6?9*60:8*60,c=(d>=d.slice(0,4)+"-03-16"&&d<=d.slice(0,4)+"-11-05")?18*60:17*60+30;return[o,c-15]},
 d:"Il cimitero-parco più famoso del mondo: le tombe di Jim Morrison, Oscar Wilde, Édith Piaf e Chopin tra viali alberati.",
 m:"Ingresso libero. Fino al 5 novembre aperto 8–18 (sabato dalle 8:30, domenica dalle 9); dal 6 novembre l'orario è invernale e chiude prima: verificalo su paris.fr. All'ingresso principale c'è la mappa delle tombe."},
versailles:{t:"Reggia di Versailles",z:"V",p:4,min:120,id:150,max:180,pos:[48.8049,2.1204],q:"Château de Versailles",cls:"",multi:1,cl:[0],
 win:function(wd,d){var m=MO(d);return[9*60,(m>=3&&m<=9?18*60+30:17*60+30)-15]},
 d:"Gli appartamenti del Re e della Regina e la Galleria degli Specchi. Arriva all'apertura: dalle 11 le sale si riempiono.",
 m:"Biglietto Passeport (castello, giardini e Trianon) da 22 €, 32 € nei giorni di Grandes Eaux e Jardins musicaux (da aprile a ottobre); 3 € in più per i visitatori non UE. L'orario d'ingresso è obbligatorio. Chiuso il lunedì; aperto 9–18:30 da aprile a ottobre, 9–17:30 da novembre a marzo."},
trianon:{t:"Giardini e Trianon di Versailles",z:"V",p:5,min:60,id:120,max:180,pos:[48.8157,2.1097],q:"Petit Trianon, Versailles",cls:"walk",multi:1,cl:[0],
 win:function(wd,d){var m=MO(d);return[12*60,(m>=3&&m<=9?18*60+30:17*60+30)-15]},
 d:"I giardini alla francese, il Grand Canal e la tenuta di Maria Antonietta: Petit Trianon e il Villaggio della Regina.",
 m:"Compresi nel Passeport. Il Trianon apre a mezzogiorno. Il parco è grande: da un capo all'altro ci sono circa 30 minuti a piedi."}
});
STOPS.saintechapelle.win=function(wd,d){var m=MO(d);return[9*60,(m>=3&&m<=8?19*60:17*60)]};
/* collegamenti tra le tappe */
var W=function(a){return {w:a}};
var LEGS={
"start>marais":{min:15,mode:"walk",txt:"A piedi da Châtelet per Rue de Rivoli e Rue des Rosiers, circa 15 minuti.",g:[W([[48.8593,2.3473],[48.8574,2.3518],[48.8570,2.3590],[48.8556,2.3655]])]},
"start>notredame":{min:10,mode:"walk",txt:"A piedi da Châtelet attraverso il Pont au Change, circa 10 minuti.",g:[W([[48.8593,2.3473],[48.8568,2.3480],[48.8545,2.3478],[48.8530,2.3499]])]},
"start>louvre":{min:12,mode:"walk",txt:"A piedi da Châtelet lungo Rue de Rivoli, circa 12 minuti.",g:[W([[48.8593,2.3473],[48.8608,2.3409],[48.8610,2.3358]])]},
"marais>notredame":{min:20,mode:"walk",txt:"A piedi da Place des Vosges sull'Île Saint-Louis (Pont Marie) e poi sul Pont Saint-Louis, circa 20 minuti.",g:[W([[48.8556,2.3655],[48.8535,2.3610],[48.8530,2.3573],[48.8522,2.3560],[48.8516,2.3525],[48.8530,2.3499]])]},
"marais>louvre":{min:30,mode:"walk",txt:"A piedi lungo Rue de Rivoli, circa 30 minuti (oppure metro 1 da Saint-Paul a Palais Royal).",g:[W([[48.8556,2.3655],[48.8574,2.3518],[48.8608,2.3409],[48.8610,2.3358]])]},
"notredame>saintechapelle":{min:5,mode:"walk",txt:"A piedi, circa 5 minuti.",g:[W([[48.8530,2.3499],[48.8545,2.3470],[48.8554,2.3450]])]},
"notredame>louvre":{min:20,mode:"walk",txt:"Lungo la Senna: Pont Neuf e Pont des Arts, circa 20 minuti a piedi.",g:[W([[48.8530,2.3499],[48.8545,2.3460],[48.8572,2.3414],[48.8583,2.3375],[48.8610,2.3358]])]},
"saintechapelle>louvre":{min:15,mode:"walk",txt:"Pont Neuf e Pont des Arts, circa 15 minuti a piedi.",g:[W([[48.8554,2.3450],[48.8572,2.3414],[48.8583,2.3375],[48.8610,2.3358]])]},
"notredame>eiffel":{min:25,mode:"metro",txt:"RER C da Saint-Michel Notre-Dame a Champ de Mars–Tour Eiffel, circa 25 minuti.",g:[W([[48.8530,2.3499],[48.8534,2.3446]]),["rerC","Saint-Michel Notre-Dame","Champ de Mars–Tour Eiffel"],W([[48.8556,2.2898],[48.8584,2.2945]])]},
"saintechapelle>eiffel":{min:25,mode:"metro",txt:"RER C da Saint-Michel Notre-Dame a Champ de Mars–Tour Eiffel, circa 25 minuti.",g:[W([[48.8554,2.3450],[48.8534,2.3446]]),["rerC","Saint-Michel Notre-Dame","Champ de Mars–Tour Eiffel"],W([[48.8556,2.2898],[48.8584,2.2945]])]},
"louvre>eiffel":{min:25,mode:"metro",txt:"Metro 1 da Tuileries a Franklin D. Roosevelt, poi metro 9 fino a Trocadéro: circa 25 minuti.",g:[W([[48.8610,2.3358],[48.8625,2.3320],[48.8644,2.3297]]),["m1","Tuileries","Franklin D. Roosevelt"],["m9","Franklin D. Roosevelt","Trocadéro"],W([[48.8631,2.2870],[48.8617,2.2890],[48.8601,2.2928],[48.8584,2.2945]])]},
"eiffel>montmartre":{min:35,mode:"metro",txt:"A piedi sul Champ de Mars fino a École Militaire, metro 8 fino a Madeleine, poi metro 12 fino ad Abbesses: circa 35 minuti.",g:[W([[48.8584,2.2945],[48.8556,2.2986],[48.8549,2.3064]]),["m8","École Militaire","Madeleine"],["m12","Madeleine","Abbesses"],W([[48.8844,2.3384],[48.8848,2.3387],[48.8848,2.3410],[48.8840,2.3430],[48.8867,2.3431]])]},
"eiffel>arc":{min:20,mode:"metro",txt:"A piedi fino a Bir-Hakeim, poi metro 6 fino a Charles de Gaulle–Étoile: circa 20 minuti.",g:[W([[48.8584,2.2945],[48.8560,2.2905],[48.8539,2.2894]]),["m6","Bir-Hakeim","Charles de Gaulle–Étoile"]]},
"arc>montmartre":{min:25,mode:"metro",txt:"Metro 2 da Charles de Gaulle–Étoile ad Anvers, poi su a piedi (o in funicolare): circa 25 minuti.",g:[["m2","Charles de Gaulle–Étoile","Anvers"],W([[48.8829,2.3442],[48.8845,2.3435],[48.8867,2.3431]])]},
"louvre>montmartre":{min:30,mode:"metro",txt:"Metro 14 da Pyramides a Madeleine, poi metro 12 fino ad Abbesses: circa 30 minuti.",g:[W([[48.8610,2.3358],[48.8657,2.3343]]),["m14","Pyramides","Madeleine"],["m12","Madeleine","Abbesses"],W([[48.8844,2.3384],[48.8867,2.3431]])]},
"notredame>montmartre":{min:35,mode:"metro",txt:"RER B da Saint-Michel a Gare du Nord, poi metro 4 e 2 fino ad Anvers: circa 35 minuti.",g:[W([[48.8530,2.3499],[48.8534,2.3446]]),["rerB","Saint-Michel Notre-Dame","Gare du Nord"],["m4","Gare du Nord","Barbès–Rochechouart"],["m2","Barbès–Rochechouart","Anvers"],W([[48.8829,2.3442],[48.8867,2.3431]])]},
"louvre>arc":{min:20,mode:"metro",txt:"Metro 1 da Palais Royal a Charles de Gaulle–Étoile, circa 20 minuti.",g:[["m1","Palais Royal–Louvre","Charles de Gaulle–Étoile"]]}
};
/* ritorno in aeroporto da ogni ultima tappa */
var RET={
CDG:{
 montmartre:{min:60,txt:"A piedi fino ad Anvers, metro 2 fino a Barbès–Rochechouart, metro 4 fino a Gare du Nord, poi RER B fino all'aeroporto CDG.",g:[W([[48.8867,2.3431],[48.8845,2.3435],[48.8829,2.3442]]),["m2","Anvers","Barbès–Rochechouart"],["m4","Barbès–Rochechouart","Gare du Nord"],["rerB","Gare du Nord","Aéroport CDG 2"]]},
 eiffel:{min:75,txt:"RER C da Champ de Mars–Tour Eiffel a Saint-Michel Notre-Dame, poi RER B fino all'aeroporto CDG.",g:[W([[48.8584,2.2945],[48.8556,2.2898]]),["rerC","Champ de Mars–Tour Eiffel","Saint-Michel Notre-Dame"],["rerB","Saint-Michel Notre-Dame","Aéroport CDG 2"]]},
 arc:{min:65,txt:"RER A da Charles de Gaulle–Étoile a Châtelet–Les Halles, poi RER B fino all'aeroporto CDG.",g:[["rerA","Charles de Gaulle–Étoile","Châtelet–Les Halles"],["rerB","Châtelet–Les Halles","Aéroport CDG 2"]]},
 louvre:{min:55,txt:"A piedi fino a Châtelet–Les Halles, poi RER B fino all'aeroporto CDG.",g:[W([[48.8610,2.3358],[48.8608,2.3409],[48.8619,2.3470]]),["rerB","Châtelet–Les Halles","Aéroport CDG 2"]]},
 A:{min:55,txt:"A piedi fino a Saint-Michel Notre-Dame o Châtelet, poi RER B fino all'aeroporto CDG.",g:[["rerB","Saint-Michel Notre-Dame","Aéroport CDG 2"]]}},
ORY:{
 montmartre:{min:65,txt:"Metro 12 da Abbesses a Madeleine, poi metro 14 fino ad Aéroport d'Orly.",g:[W([[48.8867,2.3431],[48.8844,2.3384]]),["m12","Abbesses","Madeleine"],["m14","Madeleine","Aéroport d'Orly"]]},
 eiffel:{min:65,txt:"A piedi fino a École Militaire, metro 8 fino a Madeleine, poi metro 14 fino ad Aéroport d'Orly.",g:[W([[48.8584,2.2945],[48.8556,2.2986],[48.8549,2.3064]]),["m8","École Militaire","Madeleine"],["m14","Madeleine","Aéroport d'Orly"]]},
 arc:{min:60,txt:"Metro 1 da Charles de Gaulle–Étoile a Châtelet, poi metro 14 fino ad Aéroport d'Orly.",g:[["m1","Charles de Gaulle–Étoile","Châtelet"],["m14","Châtelet","Aéroport d'Orly"]]},
 louvre:{min:50,txt:"A piedi fino a Pyramides, poi metro 14 fino ad Aéroport d'Orly.",g:[W([[48.8610,2.3358],[48.8657,2.3343]]),["m14","Pyramides","Aéroport d'Orly"]]},
 A:{min:50,txt:"A piedi fino a Châtelet, poi metro 14 fino ad Aéroport d'Orly.",g:[["m14","Châtelet","Aéroport d'Orly"]]}},
BVA:{
 montmartre:{min:140,txt:"Metro 2 da Anvers a Charles de Gaulle–Étoile, metro 1 fino a Porte Maillot, poi navetta Aérobus (circa 1 h 30). Arriva alla fermata almeno 15 minuti prima.",g:[W([[48.8867,2.3431],[48.8829,2.3442]]),["m2","Anvers","Charles de Gaulle–Étoile"],["m1","Charles de Gaulle–Étoile","Porte Maillot"],["bva","Porte Maillot","Aéroport de Beauvais"]]},
 eiffel:{min:135,txt:"A piedi fino a Bir-Hakeim, metro 6 fino a Charles de Gaulle–Étoile, metro 1 fino a Porte Maillot, poi navetta Aérobus (circa 1 h 30).",g:[W([[48.8584,2.2945],[48.8539,2.2894]]),["m6","Bir-Hakeim","Charles de Gaulle–Étoile"],["m1","Charles de Gaulle–Étoile","Porte Maillot"],["bva","Porte Maillot","Aéroport de Beauvais"]]},
 arc:{min:120,txt:"Metro 1 da Charles de Gaulle–Étoile a Porte Maillot (2 fermate), poi navetta Aérobus (circa 1 h 30).",g:[["m1","Charles de Gaulle–Étoile","Porte Maillot"],["bva","Porte Maillot","Aéroport de Beauvais"]]},
 louvre:{min:130,txt:"Metro 1 da Palais Royal–Louvre a Porte Maillot, poi navetta Aérobus (circa 1 h 30).",g:[["m1","Palais Royal–Louvre","Porte Maillot"],["bva","Porte Maillot","Aéroport de Beauvais"]]},
 A:{min:135,txt:"Metro 1 da Châtelet a Porte Maillot, poi navetta Aérobus (circa 1 h 30).",g:[["m1","Châtelet","Porte Maillot"],["bva","Porte Maillot","Aéroport de Beauvais"]]}}
};
var ARR={
CDG:[["rerB","Aéroport CDG 2","Châtelet–Les Halles"]],
ORY:[["m14","Aéroport d'Orly","Châtelet"]],
BVA:[["bva","Aéroport de Beauvais","Porte Maillot"],["m1","Porte Maillot","Châtelet"]]
};
/* locali: h = orari lun→dom (Google Maps, ottobre 2026); "" = chiuso */
var D7=function(x){return [x,x,x,x,x,x,x]};
var V={
dheilly:{n:"Boulangerie Laurent Dheilly",a:"6 Rue des Halles",z:"A",r:"4,7",pos:[48.8593,2.3473],h:["07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","08:00-20:00",""],
 d:"Boulangerie-pasticceria a due passi dall'uscita di Châtelet: croissant, pain au chocolat e la brioche al caramello. Pochi posti a sedere, meglio da asporto.",pr:"Colazione con 5–8 €."},
marnay:{n:"Maison Marnay",a:"24 Rue Saint-Martin",z:"A",r:"4,3",pos:[48.8587,2.3502],h:["07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","08:00-18:00"],
 d:"Panetteria di quartiere tra Châtelet e il Centre Pompidou, aperta anche la domenica: baguette tradition e croissant molto lodati. Niente tavoli.",pr:"Colazione con 5–8 €."},
tranche:{n:"Tranché café Marais",a:"28 Rue Saint-Antoine",z:"A",r:"4,6",pos:[48.8539,2.3656],h:D7("08:30-19:30"),
 d:"Panetteria-caffè con qualche tavolino, a 3 minuti da Place des Vosges: buona se volete sedervi con un cappuccino.",pr:"Caffè e viennoiserie sotto i 10 € (listino non visto)."},
brigat:{n:"Brigat'",a:"6 Rue du Pas de la Mule",z:"A",r:"4,7",pos:[48.8561,2.3670],h:["","07:30-20:00","07:30-20:00","07:30-20:00","07:30-20:00","08:00-20:00","08:00-20:00"],
 d:"Pasticceria a 50 metri da Place des Vosges: croissant, flan, crostate e anche gelato. Qualche tavolino dentro.",pr:"Colazione sotto i 10 € (listino non visto)."},
augustins:{n:"Le Bistro des Augustins",a:"39 Quai des Grands Augustins",z:"A",r:"4,5",pos:[48.8547,2.3420],h:D7("11:30-02:00"),
 d:"Minuscolo bistrot sul lungosenna, di fronte all'Île de la Cité, famoso per i gratin. Pochi tavoli e cucina piccola: mettete in conto un po' d'attesa.",pr:"Fascia media (listino non visto)."},
buci:{n:"Le Bistro de Buci",a:"12 Rue de Buci",z:"A",r:"4,5",pos:[48.8540,2.3373],h:D7("09:00-02:00"),
 d:"Bistrot di Saint-Germain con arredi d'epoca, frequentato anche dai parigini: zuppa di cipolle, manzo brasato, crème brûlée.",pr:"Fascia media (listino non visto)."},
victoires:{n:"Bistrot Victoires",a:"6 Rue de la Vrillière",z:"B",r:"4,4",pos:[48.8655,2.3404],h:D7("11:30-23:00"),
 d:"Bistrot classico e senza fronzoli dietro Place des Victoires, tra i più economici del centro: confit de canard, zuppa di cipolle, crème brûlée. Si riempie presto.",pr:"Fascia economica per Parigi (listino non visto)."},
louise:{n:"Louise Café",a:"8 Rue Croix des Petits Champs",z:"B",r:"4,6",pos:[48.8626,2.3395],h:["11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00",""],
 d:"Piccolo bistrot a due passi dal Louvre e dal Palais-Royal: escargot, coq au vin, purè molto lodato.",pr:"Prezzi giusti secondo le recensioni (listino non visto)."},
richelieu:{n:"Bistrot Richelieu",a:"45 Rue de Richelieu",z:"B",r:"4,4",pos:[48.8662,2.3370],h:["08:00-22:00","08:00-22:00","08:00-22:00","08:00-22:00","08:00-22:00","09:00-22:00","10:00-21:00"],
 d:"Bistrot di quartiere dietro il Palais-Royal, con cucina sempre aperta: zuppa di cipolle, bourguignon, tartare.",pr:"Fascia media (listino non visto)."},
caillou:{n:"Café Caillou",a:"210 Rue de Grenelle",z:"C",r:"4,7",pos:[48.8566,2.3031],h:["07:30-22:30","07:30-22:30","07:30-22:30","07:30-22:30","07:30-22:30","10:00-22:30","10:00-22:00"],
 d:"Bistrot piccolo e accogliente a 10 minuti dalla Tour Eiffel, lontano dalla folla: bourguignon, confit, profiteroles.",pr:"Fascia media (listino non visto)."},
crepuscule:{n:"Le Crépuscule",a:"18 Rue Amélie",z:"C",r:"4,8",pos:[48.8584,2.3076],h:["","11:00-14:30,18:30-21:00","11:00-14:30,18:30-21:00","11:00-14:30,18:30-21:00","11:00-14:30,18:30-21:00","11:00-14:30,18:30-21:00",""],
 d:"Crêperie di quartiere in una via laterale vicino a Rue Cler: galette salate di grano saraceno e crêpe dolci, porzioni abbondanti.",pr:"Una galette con un sidro dovrebbe stare sotto i 15 € (listino non visto)."},
rozell:{n:"Crêperie Rozell Café",a:"24 Rue la Vieuville",z:"D",r:"4,7",pos:[48.8847,2.3405],h:["12:10-21:00","12:00-21:00","","12:00-21:00","12:00-21:00","12:10-21:00","12:10-20:30"],
 d:"Crêperie familiare sotto il Sacré-Cœur, lodata per galette e crêpe al caramello salato fatte al momento.",pr:"Galette + crêpe + bibita 15,90 € (prezzo 2025); una galette sola resta sotto i 15 €."},
crepmm:{n:"Crêperie de Montmartre",a:"3 Rue Dancourt",z:"D",r:"4,7",pos:[48.8828,2.3418],h:D7("11:00-23:00"),
 d:"Piccola crêperie nuova vicino ad Anvers, cioccolata e panna fatte in casa. Aperta tutto il giorno.",pr:"Una galette con un sidro dovrebbe stare sotto i 15 € (listino non visto)."},
phenicien:{n:"Le Grand Phénicien",a:"4 Rue Caulaincourt",z:"D",r:"4,5",pos:[48.8850,2.3303],h:D7("11:00-00:00"),
 d:"Libanese di quartiere ai piedi di Montmartre: falafel, hummus, tabulè. Si può anche prendere da asporto.",pr:"Con un sandwich o un piatto di falafel si resta sotto i 15 € (listino non visto); i mezze misti costano di più."},
broceliande:{n:"Crêperie Brocéliande",a:"15 Rue des Trois Frères",z:"D",r:"4,7",pos:[48.8844,2.3411],h:["11:30-17:30","11:30-17:30","11:30-15:30,19:00-22:30","11:30-15:30,19:00-22:30","11:30-15:30,19:00-22:30","12:00-23:00","12:00-22:00"],
 d:"Crêperie bretone su Rue des Trois Frères, galette croccanti e anche opzioni senza glutine. Lunedì e martedì niente cena.",pr:"Prezzi ragionevoli secondo le recensioni (listino non visto)."},
stlouis:{n:"Boulangerie Saint-Louis",a:"78 Rue Saint-Louis-en-l'Île",z:"A",r:"4,2",pos:[48.8526,2.3546],h:D7("07:00-20:00"),
 d:"Panetteria dell'Île Saint-Louis con panini, quiche e croque-monsieur da asporto.",pr:"Formula panino + bibita + dolce a 9,50 € (da recensioni)."},
berthillon:{n:"Berthillon",a:"29-31 Rue Saint-Louis-en-l'Île",z:"A",r:"4,5",pos:[48.8517,2.3567],h:["","","10:00-20:00","10:00-20:00","10:00-20:00","10:00-20:00","10:00-20:00"],
 d:"Il gelato e i sorbetti storici dell'Île Saint-Louis, dal 1954. Attenzione: altri bar dell'isola vendono il suo gelato, ma il negozio originale è al 29-31.",pr:"1 pallina 4 €, 2 palline 7 € (da recensioni)."},
castel:{n:"Aux Castelblangeois",a:"168 Rue Saint-Honoré",z:"B",r:"4,1",pos:[48.8623,2.3394],h:["06:45-19:30","06:45-19:30","06:45-19:30","06:45-19:30","06:45-19:30","07:30-19:00",""],
 d:"Boulangerie a due passi dal Louvre: croissant, pain au chocolat e panini da mangiare nei giardini del Palais-Royal.",pr:"Croissant e panini a pochi euro."},
marques:{n:"Maison Marques",a:"111 Rue Saint-Dominique",z:"C",r:"4,3",pos:[48.8592,2.3054],h:D7("07:00-20:30"),
 d:"Boulangerie di quartiere a 10 minuti dalla Tour Eiffel, con la fila dei parigini al mattino. Ottima per un panino da mangiare sul Champ de Mars.",pr:"Pochi euro."},
pauline:{n:"La Pâtisserie Matthieu Pauline",a:"24 Rue Cler",z:"C",r:"4,9",pos:[48.8579,2.3057],h:["","","08:00-19:30","08:00-19:30","08:00-19:30","08:00-19:30","09:00-16:00"],
 d:"Pasticceria artigianale sulla via-mercato di Rue Cler: tarte tatin, éclair, crostata al cioccolato.",pr:"Un dolce a pochi euro."},
grenier:{n:"Le Grenier à Pain Abbesses",a:"38 Rue des Abbesses",z:"D",r:"4,4",pos:[48.8853,2.3367],h:["07:00-19:30","","07:00-19:30","07:00-19:30","07:00-19:30","07:00-19:30","07:00-19:30"],
 d:"Boulangerie pluripremiata per la baguette: provate anche i pain suisse e le madeleine.",pr:"Pochi euro."},
painpain:{n:"Pain Pain",a:"88 Rue des Martyrs",z:"D",r:"4,4",pos:[48.8835,2.3398],h:["","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30","07:30-19:30"],
 d:"Boulangerie artigianale di Montmartre: éclair, chausson aux pommes e focaccia scaldata al momento.",pr:"Éclair 4,40 € (da recensioni)."},
manege:{n:"Crêperie du Manège",a:"Place des Abbesses",z:"D",r:"4,6",pos:[48.8845,2.3385],h:["14:30-19:30","14:30-19:30","14:30-19:30","14:30-19:30","14:30-19:30","10:30-19:30","10:30-19:30"],
 d:"Chiosco accanto alla giostra di Place des Abbesses, a 15 metri dal Mur des je t'aime: crêpe al volo, anche salate.",pr:"Prezzi bassi per la zona, caffè 1,50 € (da recensioni)."}
};
/* locali delle zone in più (Google Maps, ottobre 2026) */
Object.assign(V,{
richelieu2:null,
union:{n:"Union Boulangerie",a:"2 Rue Bleue",z:"F",r:"4,8",pos:[48.8759,2.3475],h:["08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","08:00-15:00",""],
 d:"Boulangerie di quartiere nel 9° arrondissement, famosa per il brownie e la baguette tradition; ottimi anche croissant e kouign-amann. Niente tavoli.",pr:"Colazione con 5–8 €."},
miche:{n:"Boulangerie Miche de Pain",a:"42 Rue Cadet",z:"F",r:"4,8",pos:[48.8765,2.3444],h:["07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00",""],
 d:"Panetteria-pasticceria di quartiere con un titolare simpaticissimo: éclair al caffè, pain au chocolat alle mandorle e panini su baguette fresca.",pr:"Pochi euro."},
quignon:{n:"Quignon",a:"14 Rue Richer",z:"F",r:"4,7",pos:[48.8742,2.3467],h:["08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","","08:00-14:30"],
 d:"Boulangerie con qualche tavolo: croissant ben sfogliati, flan e panini da colazione.",pr:"Colazione sotto i 10 € (listino non visto)."},
auvergne:{n:"Pâtisserie de la Tour d'Auvergne",a:"38 Rue Claude Rodier",z:"F",r:"4,8",pos:[48.8793,2.3434],h:["07:00-21:00","07:00-21:00","","07:00-21:00","07:00-21:00","07:00-21:00","07:30-21:00"],
 d:"Piccolo forno a conduzione familiare tra Opéra e Montmartre: croissant alle mandorle e chouquettes.",pr:"Pochi euro."},
lucette:{n:"Lucette Fait des Crêpes",a:"12 Rue de Trévise",z:"F",r:"4,8",pos:[48.8734,2.3453],h:D7("12:00-22:00"),
 d:"Crêperie accogliente con dehors: galette e crêpe tra 7 e 11 €, a pranzo formula con due portate e bibita a 17,50 € (da recensioni).",pr:"Una galette con un sidro resta sotto i 15 €."},
lorette:{n:"Lorette",a:"9 Rue Saint-Lazare",z:"F",r:"4,6",pos:[48.8767,2.3380],h:["12:00-00:00","12:00-00:00","12:00-00:00","12:00-00:00","12:00-00:00","12:30-00:00","12:30-00:00"],
 d:"Brasserie frequentata dalla gente del quartiere: steak-frites al pepe, porri in vinaigrette, pain perdu.",pr:"Fascia media-alta (listino non visto)."},
suzette:{n:"Suzette Crêperie Urbaine",a:"13 Rue Cadet",z:"F",r:"4,9",pos:[48.8755,2.3433],h:["11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:30","11:00-22:30","11:00-22:00"],
 d:"Piccola crêperie su Rue Cadet, via pedonale di negozi: caramello e cioccolato fatti in casa, tavolini all'aperto.",pr:"Prezzi bassi secondo le recensioni: galette e crêpe sotto i 15 €."},
galetezen:{n:"Galetezen",a:"78 Rue La Fayette",z:"F",r:"4,9",pos:[48.8763,2.3459],h:["12:00-15:00","11:30-21:30","12:00-21:30","11:30-21:30","11:30-15:00,18:00-21:30","12:00-21:30","12:00-21:30"],
 d:"Galette bretoni con ingredienti di qualità e sidro artigianale; menu breve. Il lunedì solo a pranzo.",pr:"Prezzi ragionevoli (listino non visto)."},
fournil:{n:"Le Fournil de Mouffetard",a:"123 Rue Mouffetard",z:"G",r:"4,4",pos:[48.8402,2.3499],h:["","07:00-19:45","07:00-19:45","07:00-19:45","07:00-19:45","07:00-19:45","07:00-18:25"],
 d:"Boulangerie in fondo a Rue Mouffetard, la via-mercato del Quartiere Latino: croissant leggerissimi e quiche scaldate al momento.",pr:"Pochi euro."},
gisele:{n:"Crêperie Gisèle",a:"65 Rue de Rennes",z:"G",r:"4,6",pos:[48.8517,2.3314],h:D7("07:00-00:00"),
 d:"Crêperie-bistrot aperta dalle 7 a mezzanotte, a due passi da Saint-Germain: galette abbondanti, anche a colazione.",pr:"Una galette resta sotto i 15 € (listino non visto)."},
tournbride:{n:"Café TournBride",a:"104 Rue Mouffetard",z:"G",r:"4,5",pos:[48.8411,2.3495],h:["07:30-00:00","07:30-00:00","07:30-00:00","07:30-00:00","07:00-01:00","07:00-01:00","07:30-00:00"],
 d:"Bistrot di quartiere su Rue Mouffetard: anatra confit, salsiccia con purè, tarte aux pommes. Al mattino anche caffè e croissant.",pr:"Fascia media (listino non visto)."},
vieuxbistrot:{n:"Le Vieux Bistrot",a:"54 Rue Mouffetard",z:"G",r:"4,7",pos:[48.8433,2.3495],h:["12:00-23:00","18:00-23:00","18:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00"],
 d:"Bistrot d'altri tempi su Rue Mouffetard: zuppa di cipolle, bourguignon, crème brûlée. Martedì e mercoledì apre solo la sera.",pr:"Fascia media (listino non visto)."},
perraudin:{n:"Perraudin",a:"157 Rue Saint-Jacques",z:"G",r:"4,6",pos:[48.8463,2.3433],h:["12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00",""],
 d:"Bistrot storico a due passi dal Panthéon, con le tovaglie a quadretti: steak-frites e bourguignon.",pr:"Formula due portate 31 € (da recensioni)."},
clown:{n:"La Crêperie du Clown",a:"6 Rue des Canettes",z:"G",r:"4,6",pos:[48.8524,2.3336],h:["11:30-15:00","11:30-22:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-23:00","11:30-22:00"],
 d:"Crêperie amatissima vicino a Saint-Sulpice: menu enorme di galette di grano saraceno, cioccolato fatto in casa. Il lunedì solo a pranzo.",pr:"Prezzi accessibili secondo le recensioni: galette e sidro sotto i 15 €."},
germain:{n:"Crêperie Chez Germain",a:"33 Rue Saint-André des Arts",z:"G",r:"4,3",pos:[48.8532,2.3418],h:["12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-22:00","12:00-15:00,19:00-23:00","12:00-15:00,19:00-23:00","12:00-23:00","12:00-15:00,19:00-22:00"],
 d:"Crêperie decorata a mosaico a due passi da Saint-Michel; a pranzo formula con due crêpe da 11 € (da recensioni).",pr:"Sotto i 15 €."},
littlebreizh:{n:"Crêperie Little Breizh",a:"11 Rue Grégoire de Tours",z:"G",r:"4,7",pos:[48.8532,2.3379],h:["","11:40-14:40,18:40-22:30","11:40-14:40,18:40-22:30","11:40-14:40,18:40-22:30","11:40-14:40,18:40-22:30","11:40-15:15,18:40-22:30",""],
 d:"Crêperie bretone minuscola e autentica: le crêpe si vedono preparare in cucina. Chiusa domenica e lunedì.",pr:"Prezzi giusti secondo le recensioni (listino non visto)."},
copains:{n:"Le Pain des Copains",a:"96 Rue du Faubourg Saint-Martin",z:"H",r:"4,7",pos:[48.8730,2.3581],h:["06:30-19:30","06:30-19:30","06:30-19:30","06:30-19:30","06:30-19:30","06:30-19:00",""],
 d:"Boulangerie-caffè di quartiere vicino a Gare de l'Est, con prezzi da residenti: flan alla vaniglia e panini fatti al momento.",pr:"Pochi euro."},
marie:{n:"Maison Marie",a:"32 Rue de Lancry",z:"H",r:"4,4",pos:[48.8709,2.3615],h:["","06:30-21:00","06:30-21:00","06:30-21:00","06:30-21:00","06:30-21:00",""],
 d:"Boulangerie a due passi dal Canal Saint-Martin: escargot pistacchio e cioccolato, pane a lievitazione naturale.",pr:"Pochi euro."},
robinet:{n:"Le Robinet d'Or",a:"7 Rue Eugène Varlin",z:"H",r:"4,7",pos:[48.8781,2.3647],h:D7("07:00-01:00"),
 d:"Bistrot sul Canal Saint-Martin con cucina francese classica: anatra confit, lumache, formaggi. La sera meglio prenotare.",pr:"Fascia media (listino non visto)."},
bistrotpere:{n:"Bistrot Père",a:"10 Avenue du Père Lachaise",z:"H",r:"4,7",pos:[48.8640,2.3979],h:["09:00-23:30","09:00-23:30","09:00-23:30","09:00-23:00","09:00-23:30","09:00-23:30","10:00-17:00"],
 d:"Bistrot di quartiere all'uscita del Père-Lachaise, frequentato da residenti: pollo arrosto, insalate, tiramisù.",pr:"Prezzi contenuti secondo le recensioni."},
tablespl:{n:"Aux Tables du Père Lachaise",a:"44 Boulevard de Ménilmontant",z:"H",r:"4,3",pos:[48.8632,2.3875],h:["07:30-02:00","07:30-02:00","07:30-02:00","07:30-02:00","07:30-02:00","08:00-02:00","08:00-02:00"],
 d:"Bistrot davanti al cimitero: croissant ottimi al mattino, piatti abbondanti a pranzo.",pr:"Fascia media (listino non visto)."},
auguste:{n:"Dr. Auguste",a:"9 Place Auguste Métivier",z:"H",r:"4,7",pos:[48.8633,2.3881],h:["11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-22:00",""],
 d:"Locale semplice vicino al Père-Lachaise: bagel, burger, insalate e zuppe; zuppa e caffè a 7 € (da recensioni).",pr:"Sotto i 15 €."},
cantina:{n:"La Cantina",a:"4 Boulevard de Ménilmontant",z:"H",r:"4,8",pos:[48.8586,2.3900],h:D7("10:00-02:00"),
 d:"Pizzeria-bar di quartiere tra Père-Lachaise e Oberkampf. La cucina chiude prima del bar: chiedi al tavolo.",pr:"Una pizza resta intorno ai 15 € (listino non visto)."},
fermepains:{n:"Aux Pains de la Ferme",a:"9 Rue Royale, Versailles",z:"V",r:"4,7",pos:[48.7986,2.1276],h:["07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","07:00-20:00","",""],
 d:"Boulangerie di quartiere a pochi minuti dalla stazione, con la fila dei residenti: baguette, croissant e panini per un picnic nei giardini.",pr:"Pochi euro."},
polome:{n:"Maison Polomé",a:"19 Rue de Satory, Versailles",z:"V",r:"4,2",pos:[48.8002,2.1250],h:D7("07:00-20:00"),
 d:"Panetteria-pasticceria vicino al castello, aperta tutti i giorni: croissant, insalate e wrap da asporto.",pr:"Pochi euro."},
blenoir:{n:"Blé Noir",a:"9 Rue de Satory, Versailles",z:"V",r:"4,7",pos:[48.8007,2.1252],h:["11:00-14:30,18:00-21:00","11:00-21:00","11:00-21:00","11:00-22:00","11:00-22:00","11:00-22:00","11:00-21:30"],
 d:"Crêperie a 5 minuti dal castello, porzioni generose e prezzi giusti per la zona.",pr:"Una galette resta sotto i 15 € (listino non visto)."},
tonton:{n:"Les Crêpes à Tonton",a:"33-35 Rue du Vieux Versailles",z:"V",r:"4,4",pos:[48.8004,2.1245],h:["12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30","12:00-14:30,19:00-22:30","12:00-14:30,19:00-23:00","12:00-14:30,18:30-23:00","12:00-14:30,19:00-22:30"],
 d:"Crêperie frequentata dai versagliesi, galette di grano saraceno; formula galette, crêpe e bibita a 18 € (da recensioni).",pr:"Una galette sotto i 15 €."},
carre:{n:"Carré aux Crêpes",a:"22 Rue d'Anjou, Versailles",z:"V",r:"4,5",pos:[48.7970,2.1256],h:["12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00","12:00-14:00,19:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00"],
 d:"Crêperie nel quartiere Saint-Louis di Versailles, sidro e birra alla spina, formule a pranzo.",pr:"Prezzi accessibili (listino non visto)."}
});
delete V.richelieu2;
/* quali locali per pasto e zona */
var MEAL={
col:{A:["dheilly","marnay","tranche","brigat"],B:["castel","richelieu"],C:["marques","caillou","pauline"],D:["grenier","painpain"],F:["union","miche","quignon","auvergne"],G:["fournil","gisele","tournbride"],H:["copains","marie","tablespl"],V:["polome","fermepains"]},
pra:{A:["augustins","buci","stlouis"],B:["victoires","louise","richelieu"],C:["caillou","crepuscule"],E:["caillou","crepuscule"],D:["crepmm","phenicien","rozell"],F:["lucette","lorette","suzette"],G:["vieuxbistrot","perraudin","tournbride","clown"],H:["robinet","bistrotpere","tablespl"],V:["blenoir","tonton","carre","fermepains"]},
cen:{D:["rozell","crepmm","phenicien","broceliande"],C:["crepuscule","marques"],E:["crepuscule","marques"],B:["castel","stlouis"],A:["stlouis","castel"],F:["suzette","lucette","galetezen"],G:["clown","germain","littlebreizh","gisele"],H:["auguste","cantina","robinet"],V:["blenoir","tonton","carre"]},
snk:{A:["berthillon","stlouis","brigat"],B:["castel"],C:["marques","pauline"],E:["marques"],D:["grenier","painpain","manege"],F:["union","miche"],G:["fournil","berthillon"],H:["copains","marie"],V:["fermepains","polome"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Centro storico",acts:["marais","notredame","louvre"],need:210,core:1},
{id:"eiffel",t:"Tour Eiffel e Champs-Élysées",acts:["eiffel","arc"],need:170,core:1},
{id:"montmartre",t:"Opéra e Montmartre",acts:["opera","montmartre"],need:190,core:1},
{id:"louvremus",t:"Museo del Louvre",acts:["louvremus"],need:170,cl:[1]},
{id:"rive",t:"Rive gauche e Orsay",acts:["stgermain","latin","orsay"],need:290},
{id:"versailles",t:"Versailles",acts:["versailles","trianon"],need:420,cl:[0],full:1},
{id:"est",t:"Canal Saint-Martin e Père-Lachaise",acts:["canal","perelachaise"],need:170}
];
var ORDER=["louvremus","marais","notredame","saintechapelle","louvre","stgermain","latin","orsay","eiffel","arc","opera","montmartre","canal","perelachaise","versailles","trianon"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["chatelet","Châtelet / Les Halles",[48.8607,2.3470],"A"],
["marais","Marais / Bastille",[48.8566,2.3622],"A"],
["louvre","Louvre / Palais-Royal",[48.8640,2.3380],"B"],
["opera","Opéra / Grands Boulevards",[48.8740,2.3420],"F"],
["latin","Quartiere Latino / St-Germain",[48.8500,2.3420],"G"],
["eiffel","Tour Eiffel / Invalides",[48.8560,2.3030],"C"],
["montmartre","Montmartre / Pigalle",[48.8840,2.3390],"D"],
["canal","République / Canal St-Martin",[48.8700,2.3620],"H"],
["nord","Gare du Nord / Gare de l'Est",[48.8780,2.3570],"H"],
["montparnasse","Montparnasse",[48.8420,2.3210],""],
["lyon","Gare de Lyon / Bercy",[48.8440,2.3740],""],
["altro","Altra zona (scrivi l'indirizzo)",[48.8566,2.3522],""]
];
/* dall'alloggio all'aeroporto, da Châtelet */
var AIRG={CDG:[["rerB","Châtelet–Les Halles","Aéroport CDG 2"]],ORY:[["m14","Châtelet","Aéroport d'Orly"]],BVA:[["m1","Châtelet","Porte Maillot"],["bva","Porte Maillot","Aéroport de Beauvais"]]};
var AIRT={CDG:"poi RER B da Châtelet–Les Halles (o da Gare du Nord) fino all'aeroporto Charles de Gaulle, circa 35 minuti.",ORY:"poi metro 14 da Châtelet fino ad Aéroport d'Orly, circa 25 minuti.",BVA:"poi metro 1 fino a Porte Maillot e navetta Aérobus fino a Beauvais, circa 1 h 30. Arriva alla fermata almeno 15 minuti prima."};
/* prezzi 2026 */
var PVIS={1:30.6,2:45.4,3:63.8,5:78};
var TAX=[["h1","Hotel 1 stella o chambre d'hôtes",2.6],["h2","Hotel 2 stelle",3.25],["h3","Hotel 3 stelle",5.53],["h4","Hotel 4 stelle",8.45],["h5","Hotel 5 stelle",11.7],["nc","Appartamento o alloggio non classificato (es. Airbnb)",-1],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Croissant au beurre e pain au chocolat","il croissant «au beurre» è quello col burro vero, di solito diritto e non a mezzaluna."],["Flan parisien","budino alla vaniglia in pasta sfoglia: una fetta basta per due."],["Un café crème","il cappuccino francese. «Un café» è un espresso."]],
pra:[["Soupe à l'oignon","la zuppa di cipolle gratinata, perfetta in autunno."],["Confit de canard o steak-frites","i due classici del bistrot."],["Une carafe d'eau","l'acqua del rubinetto è gratis: chiedetela, nessuno si offende."]],
cen:[["Galette complète","crêpe salata di grano saraceno con prosciutto, formaggio e uovo."],["Crêpe beurre-sucre o caramel au beurre salé","il dolce bretone per eccellenza."],["Une bolée de cidre","il sidro servito nella tazza di ceramica."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Trocadéro","Foto","La vista classica sulla torre dalla spianata del Palais de Chaillot. Scendi qualche gradino per avere meno gente davanti.",[48.8620,2.2884],"Trocadéro, Paris","eiffel"],
["🤳","Pont de Bir-Hakeim","Selfie","Il ponte a due piani con la metro sopra e la torre di lato: il colonnato centrale fa da cornice.",[48.8556,2.2877],"Pont de Bir-Hakeim, Paris","eiffel"],
["📷","Rue de l'Université","Foto","La torre che spunta in fondo a una via di palazzi haussmanniani: lo scorcio da cartolina.",[48.8580,2.3010],"Rue de l'Université et Avenue Bosquet, Paris","eiffel"],
["🤳","Piramide del Louvre","Selfie","Il gioco della prospettiva: «tocca» la punta della piramide con le dita.",[48.8608,2.3352],"Pyramide du Louvre, Paris","louvre"],
["🤳","Colonnes de Buren","Selfie","Le colonne a strisce bianche e nere nel cortile del Palais-Royal: salitene una.",[48.8634,2.3368],"Colonnes de Buren, Paris","louvre"],
["📷","Pont des Arts","Foto","Dal centro del ponte: l'Île de la Cité, il Pont Neuf e la cupola dell'Institut de France.",[48.8583,2.3375],"Pont des Arts, Paris","louvre"],
["📷","Square René-Viviani","Foto","Notre-Dame vista di tre quarti attraverso gli alberi, dalla riva sinistra.",[48.8524,2.3471],"Square René-Viviani, Paris","notredame"],
["📷","Pont de la Tournelle","Foto","L'abside di Notre-Dame con gli archi rampanti, con la Senna in primo piano.",[48.8508,2.3550],"Pont de la Tournelle, Paris","notredame"],
["📷","Place des Vosges","Foto","Sotto i portici, inquadrando la piazza con le facciate di mattoni rossi.",[48.8556,2.3655],"Place des Vosges, Paris","marais"],
["🤳","Mur des je t'aime","Selfie","«Ti amo» in 250 lingue: cercate la frase in italiano.",[48.8848,2.3387],"Le Mur des je t'aime, Paris","montmartre"],
["🤳","Scalinata del Sacré-Cœur","Selfie","Tutta Parigi alle spalle: il momento migliore è verso il tramonto.",[48.8862,2.3431],"Basilique du Sacré-Cœur de Montmartre","montmartre"],
["📷","La Maison Rose","Foto","La casetta rosa all'angolo di Rue de l'Abreuvoir, con la via in salita.",[48.8874,2.3397],"La Maison Rose, Paris","montmartre"],
["📷","Fontaine Médicis","Foto","La fontana più romantica del Jardin du Luxembourg, con la vasca lunga e i platani.",[48.8484,2.3398],"Fontaine Médicis, Paris","latin"],
["🤳","Terrazza delle Galeries Lafayette","Selfie","Sul tetto, gratis: l'Opéra Garnier in primo piano e la Tour Eiffel all'orizzonte.",[48.8735,2.3320],"Galeries Lafayette Haussmann, Paris","opera"],
["📷","Orologio del Musée d'Orsay","Foto","Al quinto piano, il quadrante trasparente con il Louvre e Montmartre sullo sfondo.",[48.8600,2.3266],"Musée d'Orsay, Paris","orsay"],
["📷","Passerelle del Canal Saint-Martin","Foto","Dalle passerelle di ferro verde, il canale con le chiuse e gli alberi.",[48.8716,2.3654],"Passerelle Alibert, Paris","canal"],
["🤳","Galleria degli Specchi","Selfie","357 specchi e i lampadari di cristallo: il momento migliore è all'apertura.",[48.8048,2.1203],"Galerie des Glaces, Versailles","versailles"]
];
/* avvisi verificati il 9 ottobre 2026 */
var AVV=[
{from:"2026-10-06",to:"2026-11-10",wd:[1,2,3,4,5],ap:["CDG"],after:22*60+45,t:"Lavori sul RER B",x:"Dal lunedì al venerdì, dalle 22:45, il RER B è interrotto tra Châtelet–Les Halles e l'aeroporto CDG (ci sono bus sostitutivi). Se arrivi tardi o rientri di sera, conta più tempo."},
{from:"2026-10-05",to:"2026-10-30",wd:[1,2,3,4,5],ap:["ORY"],after:23*60,t:"Lavori sul RER C verso Orly",x:"Nei giorni feriali dalle 23 il RER C è sospeso verso Orly. Non riguarda la metro 14, che è il collegamento consigliato."},
{from:"2026-10-17",to:"2026-10-21",fl:1,t:"Preavviso di sciopero del personale di volo in Francia",x:"Cinque sindacati di piloti e assistenti di volo hanno proclamato uno sciopero dal 17 al 21 ottobre 2026. Controlla il tuo volo con la compagnia nei giorni prima."}
];
/* clima medio di Parigi (indicativo, massime/minime) */
var CLIM=[[8,3],[9,3],[13,5],[16,7],[20,11],[23,14],[25,16],[25,16],[21,13],[16,10],[11,6],[8,4]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,AIRG:AIRG,AIRT:AIRT,PVIS:PVIS,TAX:TAX};
})();

/* ===== Parigi: comportamenti e testi propri della città ===== */
(function(C){
var VERS={versailles:1,trianon:1};
function versLeg(a,b,E){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var toV=!!VERS[b],other=toV?a:b,po=posOf(other),sm=[48.8534,2.3446],st=[48.8008,2.1301],vp=toV?S[b].pos:S[a].pos,walk=(toV?b:a)==="trianon"?30:8,acc=estMin(po,sm);
var hb=b==="home";
if(toV)return{min:acc+40+walk,mode:"metro",rides:1,txt:"Raggiungi una stazione del RER C (Saint-Michel Notre-Dame, Musée d'Orsay o Invalides), poi RER C direzione Versailles Château Rive Gauche: circa 40 minuti, più "+walk+" a piedi. Basta il biglietto metro-treno-RER da 2,55 €.",g:[{w:[po,sm],dash:1},["rerC","Saint-Michel Notre-Dame","Versailles Château Rive Gauche"],{w:[st,vp]}]};
return{min:acc+40+walk,mode:"metro",rides:1,txt:"A piedi fino alla stazione Versailles Château Rive Gauche ("+walk+" minuti), poi RER C verso Parigi: circa 40 minuti fino a Saint-Michel Notre-Dame"+(hb?", poi all'alloggio (Google Maps ti indica la strada).":"."),g:[{w:[vp,st]},["rerC","Versailles Château Rive Gauche","Saint-Michel Notre-Dame"],{w:[sm,po],dash:1}]}}
/* dall'alloggio all'aeroporto */
/* stazione della linea dell'aeroporto più comoda per l'alloggio (d = minuti in più o in meno rispetto a Châtelet) */
var AST={CDG:{ln:"rerB",nm:"RER B",dal:"dal RER B",end:"Aéroport CDG 2",ride:35,st:[["Châtelet–Les Halles",[48.8619,2.3470],0],["Saint-Michel Notre-Dame",[48.8534,2.3446],2],["Gare du Nord",[48.8809,2.3553],-5]]},
ORY:{ln:"m14",nm:"metro 14",dal:"dalla metro 14",end:"Aéroport d'Orly",ride:25,st:[["Châtelet",[48.8590,2.3470],0],["Pyramides",[48.8657,2.3343],2],["Madeleine",[48.8700,2.3245],3],["Gare de Lyon",[48.8443,2.3739],-3],["Bercy",[48.8401,2.3793],-4],["Cour Saint-Émilion",[48.8333,2.3866],-5],["Bibliothèque F. Mitterrand",[48.8299,2.3762],-6],["Olympiades",[48.8271,2.3668],-7]]},
BVA:{ln:"m1",nm:"metro 1",dal:"dalla metro 1",end:"Porte Maillot",st:[["Châtelet",[48.8582,2.3474],0],["Hôtel de Ville",[48.8573,2.3518],1],["Saint-Paul",[48.8551,2.3608],3],["Bastille",[48.8531,2.3691],4],["Gare de Lyon",[48.8457,2.3731],6],["Louvre–Rivoli",[48.8608,2.3409],-1],["Palais Royal–Louvre",[48.8624,2.3364],-2],["Tuileries",[48.8644,2.3297],-3],["Concorde",[48.8656,2.3212],-5],["Champs-Élysées–Clemenceau",[48.8676,2.3140],-6],["Franklin D. Roosevelt",[48.8690,2.3096],-7],["George V",[48.8720,2.3006],-8],["Charles de Gaulle–Étoile",[48.8738,2.2950],-9],["Argentine",[48.8756,2.2894],-11],["Porte Maillot",[48.8781,2.2826],-12]]}};
function nbva(c){return (c.to==="BVA"?1:0)+((c.rt||c.to)==="BVA"?1:0)}
function airStation(E,ret){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var ap=ret?(CFG.rt||CFG.to):CFG.to,S0=AST[ap],h=home().pos,best=null;
S0.st.forEach(function(x){var a=access(h,x[1]),v=a.min+x[2];if(!best||v<best.v-1)best={v:v,a:a,n:x[0],pos:x[1],dl:x[2]}});return Object.assign(best,{S:S0,ap:ap})}
/* dall'alloggio all'aeroporto */
function homeAir(E){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var b=airStation(E,1),ap=b.ap,S0=b.S,pm=b.n==="Porte Maillot",wk=b.a.mode==="walk";
var ride=ap==="BVA"?(pm?"poi navetta Aérobus da Porte Maillot fino a Beauvais, circa 1 h 15. Arriva alla fermata almeno 15 minuti prima.":"poi metro 1 fino a Porte Maillot e navetta Aérobus fino a Beauvais, circa 1 h 30. Arriva alla fermata almeno 15 minuti prima."):"poi "+S0.nm+" da "+b.n+" fino "+(ap==="CDG"?"all'aeroporto Charles de Gaulle":"ad Aéroport d'Orly")+", circa "+(S0.ride+b.dl)+" minuti.";
var g=[{w:[home().pos,b.pos],dash:wk?0:1}];if(ap==="BVA"){if(!pm)g.push(["m1",b.n,"Porte Maillot"]);g.push(["bva","Porte Maillot","Aéroport de Beauvais"])}else g.push([S0.ln,b.n,S0.end]);
return{min:b.a.min+C.RET[ap].A.min-5+b.dl,txt:(wk?"A piedi fino a ":"In metro fino a ")+b.n+" ("+b.a.min+" minuti), "+ride,g:g}}
/* dall'arrivo in città all'alloggio, il primo giorno */
function arrLeg(E){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var b=airStation(E),S0=b.S,wk=b.a.mode==="walk",chat=b.dl===0,first=CFG.to==="BVA"?"Dalla navetta prendi la metro 1 fino a ":"Scendi "+S0.dal+" a ";
var txt=(chat?"Da "+b.n+": ":first+b.n+", poi ")+(wk?(b.a.d<0.25?"l'alloggio è a due passi.":"a piedi fino all'alloggio, circa "+b.a.min+" minuti."):"in metro fino all'alloggio, circa "+b.a.min+" minuti: Google Maps ti indica la linea migliore.");
var g=[];if(!chat)g.push([S0.ln,AST[CFG.to].st[0][0],b.n]);g.push({w:[b.pos,home().pos],dash:wk?0:1});
return{min:Math.max(3,b.a.min+b.dl),mode:b.a.mode,txt:txt,g:g}}
function meta(it,meta,E){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
if(it.id==="notredame"){var op=WD>=5?"8:15–19:30":WD===3?"7:50–22:00":"7:50–19:00";meta+=" Oggi la cattedrale è aperta "+op+" (ultimo ingresso mezz'ora prima).";var oo=toMin(op.split("–")[0]),cc=toMin(op.split("–")[1]);if(it.t<oo)meta+=" Arrivi prima dell'apertura: goditi il sagrato e l'Île de la Cité.";else if(it.t>cc-30)meta+=" A quell'ora è chiusa: si vede solo da fuori."}
if(it.id==="saintechapelle"){var mo=dateObj(P.date).getUTCMonth(),wi=(mo>=10||mo<=2);meta=(wi?"Biglietto 15 € (tariffa da novembre a marzo), aperta 9:00–17:00.":"Biglietto 20 € (tariffa da aprile a ottobre)"+((mo>=3&&mo<=8)?".":", aperta 9:00–17:00."))+" Prenotazione dell'orario obbligatoria."}
return meta}
var PRICE={louvremus:[22,"Museo del Louvre (residenti UE)"],orsay:[16,"Musée d'Orsay (online)"],opera:[15,"Opéra Garnier (residenti UE)"],versailles:[22,"Versailles, Passeport"]};
function transport(E){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var c=CFG,n=TRIP.n,T=[],alt=[],cityDay=function(r){return Math.min(r*2.55,12.30)},city=TRIP.days.reduce(function(s,d){return s+cityDay(d.rides)},0),rides=TRIP.days.reduce(function(s,d){return s+d.rides},0);
function cityRows(){if(!rides)return[];var navJ=TRIP.days.filter(function(d){return d.rides*2.55>12.30}).length;return[["tr2",navJ?"Metro e RER in città ("+rides+" corse, con "+navJ+" Navigo Jour)":"Metro e RER in città, "+rides+" corse da 2,55 €",city]]}
var nb=nbva(c),bva=nb>0,pre=bva?[["tr0",nb===2?"Navetta Aérobus a/r online":"Navetta Aérobus (una tratta) online",nb*14.95]]:[];
if(nb===2&&n===1)return{T:pre.concat(cityRows()),alt:alt};
var opts=[{k:"single",v:(nb===2?0:nb?14:28)+city,rows:(nb===2?[]:[["tr1",nb?"Biglietto aeroporto (una tratta, 14 €)":"Biglietto aeroporto a/r (2 × 14 €)",nb?14:28]]).concat(cityRows())}];
var pk=n<=3?n:n<=5?5:0;if(pk)opts.push({k:"pv",v:C.PVIS[pk],rows:[["tr1","Paris Visite "+pk+(pk===1?" giorno":" giorni")+(pk>n?" (non esiste da "+n+")":""),C.PVIS[pk]]]});
var w0=TRIP.days[0].wd;if(n>=3&&w0+n-1<=6)opts.push({k:"ns",v:32.4+5,rows:[["tr1","Navigo Semaine (da lunedì a domenica, "+(bva?"Beauvais escluso":"aeroporti compresi")+")",32.4],["tr3","Carta Navigo Découverte (con foto tessera)",5]]});
opts.sort(function(a,b){return a.v-b.v});opts.slice(1).forEach(function(o){alt.push((o.k==="single"?"biglietti singoli":o.k==="pv"?"Paris Visite":"Navigo Semaine")+" "+eur(o.v))});
return{T:pre.concat(opts[0].rows),alt:alt,best:opts[0].k}}
function costModel(E){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var c=CFG,N=c.ppl,mo=dateObj(c.date).getUTCMonth(),acts=allActs(),tr=transport(E),T=tr.T.slice(),AT=[],F=[],AL=[],h=TRIP.multi?home():null,nights=TRIP.n-1;
if(tr.best!=="ns")T.push(["nav","Carta Navigo Easy",2,1]);
if(acts.indexOf("saintechapelle")>=0)AT.push(["sc","Sainte-Chapelle",(mo>=10||mo<=2)?15:20,1]);
AT.push(["nd","Notre-Dame",0]);
Object.keys(PRICE).forEach(function(k){if(acts.indexOf(k)>=0)AT.push([k,PRICE[k][1],PRICE[k][0],1])});
AT.push(["tnd","Torri di Notre-Dame",16,1,1]);
if(acts.indexOf("eiffel")>=0)AT.push(["te","Tour Eiffel, a piedi al 2° piano",14.8,1,1]);
if(acts.indexOf("latin")>=0)AT.push(["pan","Panthéon",11.5,1,1]);
var nb=0,nl=0,nd=0;TRIP.days.forEach(function(d){if(d.B)nb++;if(d.L)nl++;if(d.D)nd++});
var x=function(k){return TRIP.n>1&&k>1?" (× "+k+")":""};
if(nb)F.push(["co","Colazione in boulangerie"+x(nb),8*nb]);if(nl)F.push(["pr","Pranzo in bistrot"+x(nl),25*nl]);if(nd)F.push(["ce","Cena in crêperie"+x(nd),14*nd]);
F.push(["sp","Spuntini e assaggi"+x(TRIP.n),6*TRIP.n]);
if(TRIP.multi){var tx=C.TAX.filter(function(t){return t[0]===h.type})[0]||C.TAX[2],pp=tx[2]<0?(h.price?Math.min(15.93,0.1625*(h.price/nights/N)):0):tx[2];
AL.push(["al",h.price?"Alloggio, "+nights+(nights===1?" notte":" notti")+" ("+eur(h.price)+" in tutto"+(N>1?", diviso per "+N:"")+")":"Alloggio: inserisci il prezzo totale (⚙️)",h.price?h.price/N:0]);
if(pp)AL.push(["tax","Tassa di soggiorno ("+eur(pp)+" a notte"+(tx[2]<0?", stima":"")+")",pp*nights,1])}
function on(r){if(!r[3])return true;var k=COPT[r[0]];return k==null?!r[4]:!!k}
var sum=function(a){return a.reduce(function(s,r){return s+(on(r)?r[2]:0)},0)};
return{N:N,T:T,AT:AT,F:F,AL:AL,on:on,tT:sum(T),tA:sum(AT),tF:sum(F),tL:sum(AL),alt:tr.alt,best:tr.best}}
function costNote(E,M){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var nt="";
if(nbva(CFG)<2)nt+=(M.best==="pv"?"Il Paris Visite copre aeroporto, metro e RER senza limiti e qui costa meno dei biglietti singoli. ":M.best==="ns"?"Il Navigo Semaine vale da lunedì a domenica, aeroporti compresi: si carica su una carta Navigo Découverte da 5 € con una foto tessera (in biglietteria). ":"Con poche corse i biglietti singoli costano meno degli abbonamenti. ")+(M.alt.length?"Alternative: "+M.alt.join(", ")+". ":"");
nt+="La carta Navigo Easy serve solo se non comprate i biglietti nell'app sul telefono. Il biglietto metro-treno-RER da 2,55 € vale in tutta l'Île-de-France, Versailles compresa, ma non per gli aeroporti. Prezzi 2026 di Île-de-France Mobilités"+(nbva(CFG)?" e di Aérobus":"")+"; i pasti sono stime per locali di quartiere: colazione e cena restano sotto i 15 € a persona.";
if(allActs().some(function(a){return PRICE[a]}))nt+=" Musei: prezzi per i residenti UE; Louvre e Orsay sono gratis sotto i 26 anni per i residenti UE.";
if(TRIP.multi)nt+=" La tassa di soggiorno di Parigi si paga a persona e a notte (gli under 18 sono esenti): spesso non è compresa nel prezzo e si paga alla struttura.";
return nt}
function voliTip(E){var S=E.S,CFG=E.cfg,TRIP=E.trip,P=E.plan,WD=E.wd,home=E.home,access=E.access,hav=E.hav,estMin=E.est,posOf=E.posOf,legOf=E.legOf,fmt=E.fmt,fdur=E.fdur,eur=E.eur,esc=E.esc,toMin=E.toMin,dateObj=E.dateObj,allActs=E.allActs,COPT=E.copt;
var c=CFG,pv=TRIP.n<=5?C.PVIS[TRIP.n===4?5:TRIP.n]:0;return (nbva(c)<2?(pv?'<li>Con il Paris Visite '+(TRIP.n===4?5:TRIP.n)+(TRIP.n===1?' giorno':' giorni')+' ('+eur(pv)+') i viaggi da e per l\'aeroporto e tutte le corse in città sono compresi: la sezione Costi sceglie da sola la soluzione più economica.</li>':''):'<li>La navetta parte e arriva in base agli orari dei voli: per il ritorno l\'aeroporto consiglia di essere alla fermata di Porte Maillot con largo anticipo.</li>')}

Object.assign(C,{id:"paris",n:"Parigi",cn:"Francia",e:"🗼",flag:"🇫🇷",col:["#0b1f4b","#3a5a8c","#f2e6cc"],k:"paris parigi francia france",
TZ:"Europe/Paris",LL:[48.8566,2.3522],CC:"fr",QN:"Paris",BK:"Paris",ARE:/paris|versailles|\d{5}/i,QSKIP:/Versailles/,VER:"9 ottobre 2026",
LANG:"fr-FR",LANGN:"francese",WATER:"paris",TAXDEF:"h3",
hub:{n:"Châtelet",q:"Châtelet-Les Halles, Paris"},
SINGLE:{acts:["marais","notredame","louvre","eiffel","montmartre"],ins:[["saintechapelle","notredame"],["arc","eiffel","montmartre",1]]},
EXCL:[["louvremus","louvre","Oggi solo da fuori: il museo è in programma un altro giorno."]],
DICON:{versailles:"🏰",louvremus:"🖼️"},
ZN:{A:"in centro",B:"vicino al Louvre",C:"vicino alla Tour Eiffel",D:"a Montmartre",E:"vicino all'Arc de Triomphe",F:"all'Opéra",G:"a Saint-Germain",H:"al Canal Saint-Martin",V:"a Versailles"},
NEAR:{col:"boulangerie",pra:"bistrot",cen:"crêperie",snk:"boulangerie"},
SE:{berthillon:"🍨",manege:"🥞",pauline:"🍰",castel:"🥐",marques:"🥖",grenier:"🥖",painpain:"🥐",stlouis:"🥪",brigat:"🍮",union:"🍫",miche:"🥐",fournil:"🥐",copains:"🍮",marie:"🥖",fermepains:"🥖",polome:"🥐"},
T:{ride:"In metro",move:"tutto a piedi o con metro e RER",bags:"«Je peux laisser mes bagages ?»",bagsPM:"«Je peux laisser mes bagages jusqu'à cet après-midi ?»",bagsAM:"«Je peux laisser mes bagages jusqu'à midi ?»",
pra:"Un bistrot di quartiere",praZ:{V:"Fuori dal parco ci sono crêperie a 5–10 minuti; oppure compra un panino in boulangerie per un picnic nei giardini."},
freeLong:"Qualche idea: una crociera sulla Senna (circa un'ora, partenze dal Pont Neuf o dalla Tour Eiffel), la terrazza panoramica gratuita delle Galeries Lafayette, il Jardin du Luxembourg, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure goditi un caffè in terrazza o una passeggiata lungo la Senna.",
remind:"Ricorda di prenotare lo slot gratuito per Notre-Dame.",
rain1:"Al coperto: Notre-Dame e la Sainte-Chapelle, la Galerie Vivienne (passage coperto vicino al Palais-Royal), i portici di Place des Vosges.",
rainM:"Al coperto: musei, Notre-Dame, la Galerie Vivienne.",
water:"Riempite la borraccia alle fontane Wallace (quelle verdi in ghisa): l'acqua è potabile. Attivate «Acqua» sulla mappa per vedere le più vicine.",
kitchen:"Molti bistrot chiudono la cucina tra le 15 e le 19: le crêperie e i locali scelti qui sono aperti anche al pomeriggio.",
night:[["🍷","Per un bicchiere dopo cena scegliete un bar di quartiere vicino all'alloggio: nelle zone dei monumenti costa il doppio."],["🥐","Molte boulangerie aprono alle 7: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire alle fontane Wallace)",
fuso:"Italia e Francia hanno lo stesso fuso"},
fx:{leg:function(a,b,E){var S=E.S;if((VERS[a]||VERS[b])&&!(VERS[a]&&VERS[b]))return versLeg(a,b,E);if(a==="versailles"&&b==="trianon")return{min:25,mode:"walk",txt:"A piedi nel parco fino al Trianon, circa 25 minuti (c'è anche il trenino a pagamento).",g:[{w:[S.versailles.pos,[48.8090,2.1120],S.trianon.pos]}]};return null},
homeAir:homeAir,arrLeg:arrLeg,meta:meta,cost:costModel,costNote:costNote,voliTip:voliTip},
AIRTIPS:["Tenete il biglietto fino all'uscita: sul RER serve anche per passare i tornelli in uscita, e i controlli sono frequenti.","💧 Passate i controlli con la borraccia vuota e riempitela dopo: l'acqua in aeroporto costa cara."],
CHECK:[["nav",function(E){return nbva(E.cfg)===2?"Biglietto della navetta Aérobus comprato online":"App Île-de-France Mobilités o Bonjour RATP installata (o carta Navigo Easy) per i biglietti"}],["aer","Biglietto della navetta Aérobus per Beauvais, comprato online",function(E){return nbva(E.cfg)===1}],["nd","Slot gratuito per Notre-Dame prenotato (si apre 48 ore prima)"],["sc","Biglietto con orario per la Sainte-Chapelle",["saintechapelle"]],["lv","Biglietto con orario per il Louvre (ticket.louvre.fr)",["louvremus"]],["or","Biglietto per il Musée d'Orsay (meglio online)",["orsay"]],["op","Biglietto per l'Opéra Garnier (solo online, si apre 30 giorni prima)",["opera"]],["ve","Biglietto con orario per Versailles (obbligatorio)",["versailles"]]],
NUM:{1:["une personne","ün per-SÒN"],2:["deux","DÖ"],3:["trois","TRUÀ"],4:["quatre","KATR"],5:["cinq","SANK"],6:["six","SIS"],7:["sept","SET"],8:["huit","UIT"],9:["neuf","NÖF"],10:["dix","DIS"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Bonjour / Bonsoir","bon-JUR / bon-SUAR"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Une table pour "+nu[0]+", s'il vous plaît","ün TABL pur "+nu[1]+", sil vu PLÈ"],["Un caffè e un croissant, per favore","Un café et un croissant, s'il vous plaît","an ka-FÈ e an krua-SAN, sil vu PLÈ"],["Una caraffa d'acqua, per favore","Une carafe d'eau, s'il vous plaît","ün ka-RAF DO, sil vu PLÈ"],["Il conto, per favore","L'addition, s'il vous plaît","la-di-SIÒN, sil vu PLÈ"],["Posso pagare con la carta?","Je peux payer par carte ?","jö PÖ pe-IÉ par KART"],["Quanto costa?","C'est combien ?","sè kom-BIÀN"],["Dov'è la metro?","Où est le métro ?","u È lö me-TRÒ"],["Un biglietto per l'aeroporto","Un billet pour l'aéroport","an bi-IÈ pur la-e-ro-PÒR"]];
if(M)fr=fr.concat([["Ho una prenotazione","J'ai une réservation","jè ün re-zer-va-SIÒN"],["Posso lasciare i bagagli?","Je peux laisser mes bagages ?","jö PÖ le-SÉ me ba-GÀJ"],["A che ora è il check-out?","Le départ est à quelle heure ?","lö de-PÀR è a kel ÖR"]]);
return fr.concat([["Mi scusi","Excusez-moi","ek-skü-ZÉ-mua"],["Grazie mille!","Merci beaucoup !","mer-SÌ bo-KÙ"]])},
taxTxt:function(tx){return "Tassa di soggiorno 2026: "+(tx[2]<0?"per appartamenti e alloggi non classificati è il 5% del prezzo a persona e a notte più le maggiorazioni, fino a 15,93 €":tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+")":"non si paga se sei ospite di amici o parenti")+". Gli under 18 non pagano."},
STAYTIPS:["La sera, prima di rientrare, controlla l'ultima corsa della metro: di solito verso l'1 (più tardi il venerdì e il sabato)."],
ZONES:[
["🧱 Marais e Place des Vosges",["Il quartiere più vivo anche la domenica, quando molti negozi qui restano aperti.","Rue des Rosiers è la via storica del quartiere ebraico: a pranzo ci sono lunghe code per il falafel.","💧 Le fontane Wallace verdi sono sparse per tutto il quartiere: attivate «Acqua» sulla mappa."]],
["⛪ Notre-Dame e Île de la Cité",["Prenotate lo slot gratuito su notredamedeparis.fr: si apre 48 ore prima, a mezzanotte. Diffidate di chi vende biglietti «salta-fila» per la cattedrale: l'ingresso è gratis.","Il momento più tranquillo è presto la mattina; il giovedì la cattedrale resta aperta fino alle 22.","Le torri (16 €) e la Sainte-Chapelle vanno prenotate a parte.","💧 Prima di mettervi in coda riempite la borraccia: la fila all'aperto può essere lunga."]],
["🖼️ Louvre, Palais-Royal e Tuileries",["Il museo è chiuso il martedì: da fuori Piramide e cortili sono sempre visitabili.","Se piove, la Galerie Vivienne, a due passi dal Palais-Royal, è un passage coperto dell'Ottocento.","I giardini del Palais-Royal hanno panchine all'ombra, buone per un panino.","💧 Nel Jardin des Tuileries ci sono fontanelle: controllate sulla mappa quelle attive."]],
["🎨 Dentro il Louvre",["Biglietto 22 € per i residenti UE (32 € per gli altri); gratis sotto i 18 anni e per i residenti UE sotto i 26. Prenota l'orario su ticket.louvre.fr.","Mercoledì e venerdì è aperto fino alle 21: la sera c'è meno gente.","La sala della Gioconda è la più affollata: andateci subito all'apertura o verso la chiusura.","L'ultimo ingresso è un'ora prima della chiusura e le sale si svuotano mezz'ora prima."],["louvremus"]],
["📚 Rive gauche: Saint-Germain, Quartiere Latino e Orsay",["Il Musée d'Orsay è chiuso il lunedì e il giovedì resta aperto fino alle 21:45; biglietto 16 € online.","Il Jardin du Luxembourg è gratuito e chiude al tramonto: l'orario cambia con le stagioni.","Il Panthéon (11,50 €) è aperto tutti i giorni; dalla terrazza panoramica (3,50 € in più) si vede tutta Parigi.","Rue Mouffetard è la via-mercato del quartiere: boulangerie, formaggi e frutta a prezzi da residenti."],["orsay","latin","stgermain"]],
["🗼 Tour Eiffel e Trocadéro",["Per la foto classica uscite a Trocadéro, non a Bir-Hakeim.","Intorno alla torre girano venditori abusivi e giochi delle tre carte: tirate dritto.","Rue Cler, a 10 minuti, è una via-mercato con boulangerie e frutta: perfetta per uno spuntino.","Dal tramonto, all'inizio di ogni ora, la torre scintilla per qualche minuto."]],
["🎭 Opéra e Galeries Lafayette",["La visita dell'Opéra Garnier costa 15 € per i residenti UE e si compra solo online: alla cassa non si vendono biglietti.","La sala può essere chiusa per le prove: il biglietto non garantisce di vederla.","La terrazza sul tetto delle Galeries Lafayette è gratuita, segue gli orari del negozio e può chiudere con il maltempo."],["opera"]],
["🎨 Montmartre e Sacré-Cœur",["Alla base della scalinata qualcuno vi annoda un braccialetto al polso e poi chiede soldi: tenete le mani in tasca e proseguite.","La funicolare evita la scalinata e accetta i biglietti dei trasporti.","Place du Tertre è bella ma cara: per mangiare scendete verso Abbesses.","💧 Riempite la borraccia prima di salire: in cima ci sono poche fontanelle."]],
["🛶 Canal Saint-Martin e Père-Lachaise",["Il Père-Lachaise è gratuito: fino al 5 novembre è aperto 8–18 (sabato dalle 8:30, domenica dalle 9), poi l'orario è invernale.","All'ingresso principale, su Boulevard de Ménilmontant, c'è la mappa con le tombe famose.","Lungo il canale i bistrot sono frequentati dai parigini e costano meno che in centro."],["canal","perelachaise"]],
["🏰 Versailles",["Chiuso il lunedì. Il castello è aperto 9–18:30 da aprile a ottobre e 9–17:30 da novembre a marzo; il Trianon apre a mezzogiorno.","Passeport da 22 € (32 € nei giorni di Grandes Eaux e Jardins musicaux), 3 € in più per i non residenti UE. L'orario d'ingresso è obbligatorio: prenota online.","Si arriva col RER C fino a Versailles Château Rive Gauche: basta il biglietto metro-treno-RER da 2,55 €, valido in tutta l'Île-de-France.","Per pranzo: picnic nei giardini con un panino da Aux Pains de la Ferme, oppure una crêperie in città."],["versailles"]]],
WTIPS:["Le fontane Wallace, verdi in ghisa con le quattro cariatidi, danno acqua potabile gratis.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso secondo i dati aperti del Comune di Parigi.","Alcune fontane vengono spente d'inverno o per lavori: la mappa nasconde quelle segnalate fuori servizio.","Al ristorante chiedete «une carafe d'eau»: l'acqua del rubinetto è sempre gratuita."],
GEN:["Italia e Francia hanno lo stesso fuso orario.","La mancia non è obbligatoria: il servizio è già compreso nel conto. Lasciare qualche euro per un buon servizio è gentile.","La carta (anche contactless) si accetta quasi ovunque; tenete qualche euro in contanti per chioschi e mercati.","Sulla metro 1, sul RER B e nelle stazioni affollate attenzione ai borseggiatori: zaino davanti.","Le toilette pubbliche automatiche (sanisettes) sono gratuite.","Controllate orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze: gratis, anche senza credito.</li><li><a class="call" href="tel:15">📞 15</a> Ambulanza (SAMU) · <a class="call" href="tel:17">📞 17</a> Polizia · <a class="call" href="tel:18">📞 18</a> Vigili del fuoco</li><li>🚇 Traffico in tempo reale e oggetti smarriti sui mezzi: <a href="https://www.ratp.fr/infos-trafic" target="_blank" rel="noopener">ratp.fr</a> o l\'app Bonjour RATP.</li><li>🇮🇹 Consolato Generale d\'Italia a Parigi: <a href="https://consparigi.esteri.it" target="_blank" rel="noopener">consparigi.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Nei giorni prima controllate il traffico sull\'app Bonjour RATP o su <a href="https://www.ratp.fr/infos-trafic" target="_blank" rel="noopener">ratp.fr</a>.'
});
Object.assign(C.PAR.CDG,{sd:"Charles de Gaulle · RER B",tips:["Paris Visite, Navigo Semaine o biglietti singoli: l'app sceglie da sola la soluzione più economica nella sezione Costi."]});
Object.assign(C.PAR.ORY,{sd:"Orly · metro 14",tips:["Paris Visite, Navigo Semaine o biglietti singoli: l'app sceglie da sola la soluzione più economica nella sezione Costi."]});
Object.assign(C.PAR.BVA,{sd:"Beauvais · navetta",xr:2,xrm:1,hubq:"Porte Maillot, Paris",tips:["In città il biglietto metro-RER costa 2,55 € ed è valido 2 ore con i cambi; dalle 5 corse in su conviene il Navigo Jour da 12,30 €."]});
C.STOPS.eiffel.sun=1;C.STOPS.montmartre.sun=1;
C.SKY='<g class="sk-back" style="--k:0"><circle cx="262" cy="30" r="14"/><path d="M0 106 Q20 92 40 94 Q70 96 96 86 Q120 80 150 92 L150 106 Z"/><path d="M276 106 Q296 86 326 84 Q362 84 400 98 V106 Z"/></g><g class="sk-main"><g style="--k:1"><path d="M30 106 V58 h18 V106 Z M62 106 V58 h18 V106 Z M48 106 V72 h14 V106 Z"/><path d="M29 58 h20 v-3 h-20z M61 58 h20 v-3 h-20z M30 55 v-3 h3 v3z M36 55 v-3 h3 v3z M42 55 v-3 h3 v3z M45 55 v-3 h3 v3z M62 55 v-3 h3 v3z M68 55 v-3 h3 v3z M74 55 v-3 h3 v3z M77 55 v-3 h3 v3z"/><path d="M80 106 V82 L84 78 H112 L116 82 V106 Z"/><path d="M97 78 L100 34 L103 78 Z M99.3 34 v-6 h1.4 v6z M97.5 30 h5 v1.3 h-5z"/></g><g style="--k:2"><path d="M122 106 L146 78 L170 106 Z"/></g><g style="--k:3"><path d="M176 106 Q184 86 190 66 L195 42 L198.4 20 L199.3 8 L199.3 2 L200.7 2 L200.7 8 L201.6 20 L205 42 L210 66 Q216 86 224 106 L213 106 Q211 92 200 90 Q189 92 187 106 Z"/><path d="M186 69 h28 v-3.2 h-28z M193 44 h14 v-2.6 h-14z M197.4 21 h5.2 v-2 h-5.2z"/></g><g style="--k:4"><path d="M234 106 V72 h40 V106 h-11 V92 A9 9 0 0 0 245 92 V106 Z"/><path d="M232 72 h44 v-4 h-44z M235 68 h38 v-5 h-38z"/></g><g style="--k:5"><path d="M298 106 V86 h64 V106 Z"/><path d="M318 86 V72 h24 V86 Z"/><path d="M315 72 Q330 34 345 72 Z"/><path d="M328.4 55 v-9 h3.2 v9z M329.4 46 v-4 h1.2 v4z"/><path d="M300 86 Q307 72 314 86 Z M346 86 Q353 72 360 86 Z"/><path d="M365 106 V62 h9 V106 Z M363.5 62 Q369.5 48 375.5 62 Z"/></g></g><g class="sk-lines"><path d="M71 80 a5 5 0 1 0 0.01 0 M39 64 v10 M71 64 v10 M39 80 v14 M71 86 v8"/><path d="M146 78 V106 M134 92 h24 M140 85 h12 M128 99 h36 M146 78 L134 106 M146 78 L158 106"/><path d="M190 69 L210 88 M210 69 L190 88 M195 44 L205 66 M205 44 L195 66 M198 21 L202 42 M202 21 L198 42"/><path d="M238 76 h32 M254 72 V82"/><path d="M330 72 V86 M322 76 v8 M338 76 v8 M306 92 v10 M318 92 v10 M330 92 v10 M342 92 v10 M354 92 v10"/></g><g class="sk-spark" style="--k:6"><circle cx="200" cy="10" r="1.6"/><circle cx="196" cy="34" r="1.3"/><circle cx="204" cy="52" r="1.3"/><circle cx="192" cy="76" r="1.4"/><circle cx="209" cy="84" r="1.4"/><circle cx="200" cy="60" r="1.2"/></g><rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:7"/><g class="sk-sea" style="--k:8"><path d="M18 113 q7 -4 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0"/><path d="M30 120 q7 -4 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0"/></g>';
})(CITIES.paris);
