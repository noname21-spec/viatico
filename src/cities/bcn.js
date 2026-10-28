/* ===== Barcellona (dati verificati il 10 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.bcn=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
var MO=function(d){return +d.slice(5,7)-1};
/* aeroporti */
var PAR={
BCN:{n:"El Prat",s:"Barcelona-El Prat",url:"https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html",live:"Aena",inMin:85,buf:120,pos:[41.2974,2.0833],sd:"El Prat · metro L9",rt:"Dall'aeroporto: metro L9 Sud fino a Zona Universitària, poi L3 fino a Catalunya.",
 arr:"Segui i cartelli «Metro» fino alla stazione della L9 Sud (Aeroport T1 o Aeroport T2). Scendi a Zona Universitària (circa 30 minuti) e cambia sulla L3 fino a Catalunya (circa 20 minuti): in tutto circa 55 minuti.",
 tk:"Biglietto «Aeroport» da 5,90 € a tratta alle macchinette della stazione, cambi compresi. Il T-casual non vale alle stazioni dell'aeroporto; la T-dia (12 €) e la Hola Barcelona sì.",
 gm:"Aeroport T1, Barcelona",
 tips:["Più veloce ma un po' più caro: l'Aerobús porta a Plaça Catalunya in circa 35 minuti, con partenze ogni 5–10 minuti: 7,45 € solo andata, 12,85 € andata e ritorno.","C'è anche il treno R2 Nord dal Terminal 2 verso Sants e Passeig de Gràcia, circa ogni 30 minuti. A ottobre 2026 diverse linee Rodalies hanno avuto interruzioni per il maltempo: se lo usi, controlla prima su rodalies.gencat.cat.","T-dia, Hola Barcelona, T-casual o biglietti singoli: la sezione Costi sceglie da sola la soluzione più economica."]},
GRO:{n:"Girona",s:"Girona-Costa Brava",url:"https://www.aena.es/es/girona-costa-brava.html",live:"Aena",inMin:125,buf:100,pos:[41.9010,2.7606],sd:"Girona · bus Sagalés",rt:"Dall'aeroporto: bus Sagalés fino all'Estació del Nord, poi metro L1 da Arc de Triomf a Catalunya.",xr:2,xrm:1,
 arr:"Il bus Sagalés per Barcellona parte davanti al terminal, con orari legati agli arrivi dei voli, e arriva all'Estació del Nord in circa 1 h 15, traffico permettendo. Da lì 3 minuti a piedi fino alla metro Arc de Triomf e la L1 fino a Catalunya, circa 10 minuti.",
 tk:"Bus Sagalés: 22 € a tratta secondo il sito dell'operatore (ottobre 2026), meglio comprarlo online. Per la metro serve un biglietto normale da 2,90 €.",
 gm:"Estació del Nord, Barcelona",
 tips:["Al ritorno arriva alla fermata dell'Estació del Nord con almeno 15 minuti di anticipo.","In città il biglietto singolo costa 2,90 €; con più corse conviene il T-casual da 13 € per 10 corse (è personale)."]}
};
/* linee (tracciati indicativi) */
var SEG={
l9:{c:"#f28c00",n:"Metro L9 Sud",p:[[41.2887,2.0732,"Aeroport T1",2],[41.3034,2.0729,"Aeroport T2",2],[41.3117,2.0790,"Mas Blau"],[41.3170,2.0870,"Parc Nou"],[41.3230,2.0930,"Cèntric"],[41.3297,2.0956,"El Prat Estació",1],[41.3340,2.1030,"Les Moreres"],[41.3380,2.1190,"Mercabarna"],[41.3440,2.1240,"Parc Logístic"],[41.3555,2.1247,"Fira"],[41.3600,2.1170,"Europa | Fira"],[41.3650,2.1150,"Can Tries | Gornal"],[41.3700,2.1170,"Torrassa"],[41.3757,2.1180,"Collblanc",1],[41.3846,2.1118,"Zona Universitària",2]]},
l3:{c:"#2e9a3c",n:"Metro L3",p:[[41.3846,2.1118,"Zona Universitària",2],[41.3863,2.1176,"Palau Reial"],[41.3876,2.1262,"Maria Cristina"],[41.3826,2.1305,"Les Corts"],[41.3806,2.1382,"Plaça del Centre"],[41.3790,2.1400,"Sants Estació",1],[41.3784,2.1452,"Tarragona"],[41.3752,2.1491,"Espanya",1],[41.3747,2.1608,"Poble Sec"],[41.3751,2.1683,"Paral·lel"],[41.3770,2.1757,"Drassanes"],[41.3814,2.1734,"Liceu"],[41.3870,2.1700,"Catalunya",2],[41.3917,2.1650,"Passeig de Gràcia",2]]},
l4:{c:"#f7c600",n:"Metro L4",p:[[41.3822,2.1855,"Barceloneta",2],[41.3840,2.1780,"Jaume I",2],[41.3890,2.1730,"Urquinaona"],[41.3917,2.1650,"Passeig de Gràcia",1],[41.3946,2.1700,"Girona"],[41.3992,2.1676,"Verdaguer",2]]},
l5:{c:"#2a74c4",n:"Metro L5",p:[[41.4046,2.1757,"Sagrada Família",2],[41.3992,2.1676,"Verdaguer",2],[41.3956,2.1612,"Diagonal"],[41.3893,2.1519,"Hospital Clínic"],[41.3835,2.1497,"Entença"],[41.3790,2.1400,"Sants Estació",1],[41.3755,2.1350,"Plaça de Sants"],[41.3757,2.1272,"Badal"],[41.3757,2.1180,"Collblanc",2]]},
l2:{c:"#9a4d9e",n:"Metro L2",p:[[41.4046,2.1757,"Sagrada Família",2],[41.3998,2.1797,"Monumental"],[41.3949,2.1754,"Tetuan"],[41.3917,2.1650,"Passeig de Gràcia",2]]},
l1:{c:"#e2231a",n:"Metro L1",p:[[41.3910,2.1810,"Arc de Triomf",2],[41.3890,2.1730,"Urquinaona"],[41.3870,2.1700,"Catalunya",2]]},
gro:{c:"#0085ca",n:"Bus Sagalés",p:[[41.9010,2.7606,"Aeroport de Girona",2],[41.80,2.68],[41.65,2.55],[41.53,2.40],[41.45,2.25],[41.3946,2.1830,"Barcelona Nord",2]]}
};
var START=[41.3870,2.1700];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
rambla:{t:"Plaça Catalunya, Rambla e Boqueria",z:"A",p:6,min:25,id:40,max:60,pos:[41.3818,2.1716],q:"Mercat de la Boqueria, Barcelona",cls:"walk",
 d:"Dalla piazza scendi lungo la Rambla fino al Mercat de la Boqueria, il mercato coperto più famoso della città: banchi di frutta, jamón e succhi.",
 m:"La Boqueria è chiusa la domenica. Sulla Rambla attenzione ai borseggiatori; per mangiare spostati nelle vie laterali."},
gotic:{t:"Barri Gòtic e Cattedrale",z:"A",p:1,min:40,id:70,max:100,pos:[41.3840,2.1762],q:"Catedral de Barcelona",cls:"walk",tk:[16,"Cattedrale, visita turistica",1,1],
 d:"La Cattedrale, Carrer del Bisbe con il ponte neogotico, Plaça Sant Jaume e Plaça Reial con i lampioni del giovane Gaudí. Le stradine sono il vero motivo della visita.",
 m:"Le vie sono gratis; la visita turistica della Cattedrale costa 16 €."},
born:{t:"El Born e Santa Maria del Mar",z:"B",p:2,min:35,id:55,max:80,pos:[41.3837,2.1820],q:"Santa Maria del Mar, Barcelona",cls:"walk",
 d:"Santa Maria del Mar, la grande chiesa gotica del quartiere, Carrer de Montcada con i palazzi medievali e il Mercat del Born, l'ex mercato coperto con gli scavi della città del 1714.",
 m:"Gli scavi del Born si vedono gratis dalla piazza coperta. Per Santa Maria del Mar l'ingresso turistico è a pagamento: prezzo e orari da verificare sul posto."},
barceloneta:{t:"Barceloneta e spiaggia",z:"B",p:4,min:20,id:35,max:70,pos:[41.3790,2.1905],q:"Platja de la Barceloneta, Barcelona",cls:"walk",
 d:"Il quartiere dei pescatori, con le vie strette e i panni stesi, poi il lungomare e la spiaggia.",
 m:"Sul lungomare evita i ristoranti con le foto della paella esposte e i camerieri che chiamano dalla strada: i locali di quartiere sono nelle vie interne."},
sagrada:{t:"Sagrada Família (da fuori)",z:"C",p:1,min:30,id:45,max:70,pos:[41.4036,2.1744],q:"Sagrada Família, Barcelona",cls:"",
 d:"La basilica di Gaudí: la Facciata della Natività, il giro intorno e la foto intera dalla Plaça de Gaudí, dall'altra parte del laghetto.",
 m:"Da fuori è gratis. Per entrare serve il biglietto con orario (da 26 €, 36 € con le torri) su sagradafamilia.org: in giornata spesso è esaurito."},
passeig:{t:"Passeig de Gràcia: Casa Batlló e La Pedrera",z:"D",p:3,min:25,id:40,max:70,pos:[41.3916,2.1649],q:"Casa Batlló, Barcelona",cls:"walk",sun:1,
 d:"Il viale del modernismo: la facciata «di ossa» di Casa Batlló, le case vicine della Manzana de la Discordia e, cinque isolati più su, La Pedrera. Guarda anche le panchine-lampione in ceramica.",
 m:"Da fuori è tutto gratis. Entrare costa: Casa Batlló da 29 € online, La Pedrera 29 € di giorno (25 € la visita al tramonto)."}
};
/* tappe in più per i viaggi di più giorni */
Object.assign(STOPS,{
sagradains:{t:"Sagrada Família, dentro",z:"C",p:1,min:90,id:105,max:130,pos:[41.4036,2.1744],q:"Sagrada Família, Barcelona",cls:"",multi:1,tk:[26,"Sagrada Família (biglietto base)"],
 win:function(wd,d){var m=MO(d),o=wd===6?10*60+30:9*60,c=(m>=10||m<=1)?18*60:(m===2||m===9)?(wd===5?18*60:19*60):(wd===5?18*60:20*60);return[o,c]},
 d:"Dentro la basilica: la foresta di colonne e la luce delle vetrate, fredda a levante e calda a ponente nel pomeriggio. Poi la Facciata della Passione e il museo sotto la chiesa.",
 m:"Biglietto base 26 €, con le torri 36 €, solo con orario su sagradafamilia.org: compralo prima di partire. Spalle e ginocchia coperte."},
parkguell:{t:"Park Güell",z:"E",p:2,min:60,id:75,max:100,pos:[41.4145,2.1527],q:"Park Güell, Barcelona",cls:"walk",multi:1,tk:[18,"Park Güell"],
 win:function(){return[9*60+30,20*60]},
 d:"La Zona Monumentale di Gaudí: la scalinata con la salamandra di mosaico, la Sala Ipostila e la grande panchina ondulata con la vista su tutta la città.",
 m:"Biglietto 18 € con orario d'ingresso, venduto dalle 9:30 alle 19:30: si entra entro 30 minuti dall'orario scelto e, se esci, non si rientra. Compralo online su parkguell.barcelona. Dalla metro L3 (Vallcarca o Lesseps) sono 15–20 minuti a piedi, in salita."},
gracia:{t:"Gràcia: piazze e vie del quartiere",z:"E",p:5,min:40,id:60,max:90,pos:[41.4018,2.1576],q:"Plaça del Sol, Barcelona",cls:"walk",multi:1,
 d:"L'ex villaggio inglobato dalla città: Plaça del Sol, Plaça de la Vila con la torre dell'orologio, Carrer de Verdi e, da fuori, Casa Vicens, la prima casa di Gaudí.",
 m:"Tutto gratis. È il quartiere dove si mangia spendendo meno: menú del día a pranzo e tapas la sera nelle vie interne."},
bunkers:{t:"Bunkers del Carmel",z:"E",p:6,min:35,id:50,max:70,pos:[41.4192,2.1619],q:"Búnquers del Carmel, Barcelona",cls:"walk",multi:1,sun:1,
 win:function(wd,d){var m=MO(d);return[9*60,(m>=3&&m<=9)?19*60+30:17*60+30]},
 d:"Le vecchie postazioni antiaeree in cima al Turó de la Rovira: il panorama a 360° su tutta Barcellona, dalla Sagrada Família al mare.",
 m:"Ingresso libero, senza prenotazione: aperto 9–19:30 d'estate e 9–17:30 d'inverno (le date del cambio non sono indicate: verifica sul posto). L'ultimo tratto è una salita ripida, e in cima non c'è né acqua né ombra."},
picasso:{t:"Museu Picasso",z:"B",p:4,min:75,id:90,max:120,pos:[41.3852,2.1809],q:"Museu Picasso, Barcelona",cls:"",multi:1,cl:[0],tk:[14,"Museu Picasso (online)"],
 win:function(){return[10*60,19*60]},
 d:"Il museo nei palazzi gotici di Carrer de Montcada: gli anni giovanili di Picasso a Barcellona e la serie delle Meninas.",
 m:"Biglietto 14 € online (15 € in biglietteria), chiuso il lunedì. Da novembre ad aprile il giovedì dalle 16 alle 19 si entra gratis."},
batllo:{t:"Casa Batlló, dentro",z:"D",p:5,min:60,id:75,max:90,pos:[41.3916,2.1649],q:"Casa Batlló, Barcelona",cls:"",multi:1,tk:[29,"Casa Batlló (Blue, online)"],
 win:function(){return[8*60+30,22*60+30]},
 d:"Dentro la casa di Gaudí: il salone affacciato sul Passeig de Gràcia, il cortile di piastrelle azzurre e la terrazza con il tetto a dorso di drago.",
 m:"Biglietto Blue da 29 € online nei giorni feriali e 35 € nel fine settimana, se comprato almeno una settimana prima; in biglietteria costa di più. Aperta tutti i giorni 8:30–22:30, ultimo ingresso 21:30."},
santpau:{t:"Recinte Modernista de Sant Pau",z:"C",p:6,min:60,id:75,max:100,pos:[41.4115,2.1745],q:"Recinte Modernista de Sant Pau, Barcelona",cls:"",multi:1,tk:[18,"Sant Pau, visita libera"],
 win:function(wd,d){var m=MO(d);return[9*60+30,(m>=3&&m<=9)?18*60+30:17*60]},
 d:"L'ex ospedale modernista di Domènech i Montaner, a 15 minuti a piedi dalla Sagrada Família lungo l'Avinguda de Gaudí: padiglioni di mattoni e ceramica, cupole e giardini.",
 m:"Visita libera 18 € prima delle 14, 17 € dopo. Aperto tutti i giorni 9:30–18:30 da aprile a ottobre e 9:30–17 da novembre a marzo; ultimo ingresso mezz'ora prima."},
pedrera:{t:"La Pedrera (Casa Milà), dentro",z:"D",p:6,min:60,id:75,max:90,pos:[41.3953,2.1619],q:"La Pedrera, Barcelona",cls:"",multi:1,tk:[29,"La Pedrera (Essential)"],
 win:function(wd,d){var o=d.slice(5);return[9*60,(o>="03-06"&&o<="11-01")?20*60+30:18*60+30]},
 d:"L'ultima casa civile di Gaudí: la terrazza con i comignoli a forma di guerriero, il sottotetto ad archi e un appartamento d'epoca.",
 m:"Biglietto Essential 29 € (la visita al tramonto parte da 25 €). Dal 6 marzo al 1° novembre aperta 9–20:30, poi fino a febbraio 9–18:30."},
mnac:{t:"Plaça d'Espanya, Font Màgica e MNAC",z:"F",p:4,min:50,id:75,max:120,pos:[41.3685,2.1534],q:"Museu Nacional d'Art de Catalunya",cls:"walk",multi:1,tk:[12,"MNAC",1,1],
 d:"Da Plaça d'Espanya si sale tra le torri veneziane fino alla Font Màgica e al Palau Nacional, sede del museo d'arte catalana: dalla terrazza davanti all'ingresso c'è una delle viste migliori sulla città.",
 m:"Scalinata e terrazza sono gratis, con le scale mobili all'aperto per salire. Il MNAC costa 12 € ed è chiuso il lunedì."},
castell:{t:"Castell de Montjuïc e giardini",z:"F",p:6,min:45,id:60,max:90,pos:[41.3634,2.1660],q:"Castell de Montjuïc, Barcelona",cls:"walk",multi:1,sun:1,tk:[12,"Castell de Montjuïc",1],
 win:function(wd,d){var m=MO(d);return[10*60,(m>=2&&m<=9)?20*60:18*60]},
 d:"La fortezza in cima alla collina, con le terrazze sul porto e sul mare. Si sale con la funivia, con il bus o a piedi tra i giardini.",
 m:"Biglietto 12 €, gratis la domenica dalle 15 e tutta la prima domenica del mese. Aperto 10–20 da marzo a ottobre, 10–18 da novembre a febbraio."}
});
/* collegamenti tra le tappe */
var LEGS={
"start>rambla":{min:8,mode:"walk",txt:"A piedi da Plaça Catalunya lungo la Rambla fino alla Boqueria, circa 8 minuti.",g:[W([[41.3870,2.1700],[41.3853,2.1712],[41.3834,2.1722],[41.3818,2.1716]])]},
"start>gotic":{min:10,mode:"walk",txt:"A piedi da Plaça Catalunya per l'Avinguda del Portal de l'Àngel fino alla Cattedrale, circa 10 minuti.",g:[W([[41.3870,2.1700],[41.3858,2.1730],[41.3846,2.1748],[41.3840,2.1762]])]},
"rambla>gotic":{min:8,mode:"walk",txt:"A piedi dalla Boqueria per Carrer de la Boqueria e Plaça Sant Jaume fino alla Cattedrale, circa 8 minuti.",g:[W([[41.3818,2.1716],[41.3820,2.1737],[41.3826,2.1770],[41.3840,2.1762]])]},
"gotic>born":{min:8,mode:"walk",txt:"Attraversa Via Laietana a Jaume I e prendi Carrer de l'Argenteria fino a Santa Maria del Mar, circa 8 minuti.",g:[W([[41.3840,2.1762],[41.3840,2.1780],[41.3836,2.1800],[41.3837,2.1820]])]},
"born>barceloneta":{min:15,mode:"walk",txt:"A piedi per Pla de Palau e Passeig de Joan de Borbó fino alla Barceloneta, circa 15 minuti.",g:[W([[41.3837,2.1820],[41.3825,2.1840],[41.3808,2.1862],[41.3792,2.1880],[41.3790,2.1905]])]},
"barceloneta>sagrada":{min:30,mode:"metro",txt:"A piedi fino alla metro Barceloneta, L4 fino a Verdaguer, poi L5 una fermata fino a Sagrada Família: circa 30 minuti.",g:[W([[41.3790,2.1905],[41.3810,2.1870],[41.3822,2.1855]]),["l4","Barceloneta","Verdaguer"],["l5","Verdaguer","Sagrada Família"],W([[41.4046,2.1757],[41.4036,2.1744]])]},
"born>sagrada":{min:25,mode:"metro",txt:"A piedi fino a Jaume I, L4 fino a Verdaguer, poi L5 una fermata fino a Sagrada Família: circa 25 minuti.",g:[W([[41.3837,2.1820],[41.3836,2.1800],[41.3840,2.1780]]),["l4","Jaume I","Verdaguer"],["l5","Verdaguer","Sagrada Família"],W([[41.4046,2.1757],[41.4036,2.1744]])]},
"gotic>sagrada":{min:25,mode:"metro",txt:"A piedi fino a Jaume I, L4 fino a Verdaguer, poi L5 una fermata fino a Sagrada Família: circa 25 minuti.",g:[W([[41.3840,2.1762],[41.3840,2.1780]]),["l4","Jaume I","Verdaguer"],["l5","Verdaguer","Sagrada Família"],W([[41.4046,2.1757],[41.4036,2.1744]])]},
"sagrada>passeig":{min:15,mode:"metro",txt:"Metro L2 da Sagrada Família a Passeig de Gràcia (3 fermate), circa 15 minuti.",g:[W([[41.4036,2.1744],[41.4046,2.1757]]),["l2","Sagrada Família","Passeig de Gràcia"]]},
"barceloneta>passeig":{min:20,mode:"metro",txt:"Metro L4 da Barceloneta a Passeig de Gràcia, circa 20 minuti.",g:[W([[41.3790,2.1905],[41.3822,2.1855]]),["l4","Barceloneta","Passeig de Gràcia"]]},
"born>passeig":{min:18,mode:"metro",txt:"A piedi fino a Jaume I, poi metro L4 fino a Passeig de Gràcia, circa 18 minuti.",g:[W([[41.3837,2.1820],[41.3840,2.1780]]),["l4","Jaume I","Passeig de Gràcia"]]},
"gotic>passeig":{min:18,mode:"metro",txt:"A piedi fino a Jaume I, poi metro L4 fino a Passeig de Gràcia, circa 18 minuti.",g:[W([[41.3840,2.1762],[41.3840,2.1780]]),["l4","Jaume I","Passeig de Gràcia"]]},
"passeig>start":{min:15,mode:"walk",txt:"A piedi lungo Passeig de Gràcia fino a Plaça Catalunya, circa 15 minuti.",g:[W([[41.3916,2.1649],[41.3895,2.1675],[41.3870,2.1700]])]}
};
/* ritorno in aeroporto (le altre tappe passano da Plaça Catalunya) */
var RET={
BCN:{
 A:{min:60,txt:"Metro L3 da Catalunya a Zona Universitària, poi L9 Sud fino ad Aeroport T2 o T1: circa 55 minuti. Controlla da quale terminal parte il volo: la L9 ferma prima al T2, poi al T1.",g:[["l3","Catalunya","Zona Universitària"],["l9","Zona Universitària","Aeroport T1"]]},
 passeig:{min:55,txt:"Metro L3 da Passeig de Gràcia a Zona Universitària, poi L9 Sud fino all'aeroporto (prima T2, poi T1): circa 50 minuti.",g:[["l3","Passeig de Gràcia","Zona Universitària"],["l9","Zona Universitària","Aeroport T1"]]},
 sagrada:{min:55,txt:"Metro L5 da Sagrada Família a Collblanc, poi L9 Sud fino all'aeroporto (prima T2, poi T1): circa 50 minuti.",g:[W([[41.4036,2.1744],[41.4046,2.1757]]),["l5","Sagrada Família","Collblanc"],["l9","Collblanc","Aeroport T1"]]}},
GRO:{
 A:{min:105,txt:"Metro L1 da Catalunya ad Arc de Triomf, a piedi fino all'Estació del Nord, poi bus Sagalés fino all'aeroporto di Girona, circa 1 h 15. Arriva alla fermata almeno 15 minuti prima.",g:[["l1","Catalunya","Arc de Triomf"],W([[41.3910,2.1810],[41.3946,2.1830]]),["gro","Barcelona Nord","Aeroport de Girona"]]}}
};
var ARR={
BCN:[["l9","Aeroport T1","Zona Universitària"],["l3","Zona Universitària","Catalunya"]],
GRO:[["gro","Aeroport de Girona","Barcelona Nord"],W([[41.3946,2.1830],[41.3910,2.1810]]),["l1","Arc de Triomf","Catalunya"]]
};
/* locali: h = orari lun→dom (Google Maps e siti dei locali, ottobre 2026); "" = chiuso */
var V={
colmena:{n:"Pastisseria La Colmena",a:"Plaça de l'Àngel 12",z:"A",r:"4,5",pos:[41.383832,2.178233],h:D7("09:00-21:00"),
 d:"Pasticceria storica tra il Gòtic e il Born: dolci catalani, torroni e caramelle al miele. Si compra al banco, da mangiare passeggiando.",pr:"Un dolce a pochi euro (listino non visto)."},
conesa:{n:"Conesa Entrepans",a:"Carrer de la Llibreteria 1",z:"A",r:"4,5",pos:[41.383086,2.177092],h:["08:30-22:15","08:30-22:15","08:30-22:15","08:30-22:15","08:30-22:15","08:30-22:15",""],
 d:"Panini caldi e piastrati a due passi da Plaça Sant Jaume, frequentati da chi lavora in zona. Buoni a colazione e come cena veloce.",pr:"Un panino resta sotto i 10 € (listino non visto)."},
elisabets:{n:"Bar Elisabets",a:"Carrer de les Ramelleres 3",z:"A",r:"4,4",pos:[41.383821,2.169175],h:["07:30-17:00","07:30-17:00","07:30-17:00","07:30-17:00","07:30-17:00","09:00-17:00",""],
 d:"Bar di quartiere del Raval, a 5 minuti da Plaça Catalunya: colazione al bancone e cucina casalinga a pranzo. Chiuso la domenica.",pr:"Prezzi da residenti (listino non visto)."},
bodeb:{n:"Bo de B",a:"Carrer de la Mercè 35",z:"A",r:"4,5",pos:[41.381224,2.181129],h:["12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-20:00"],
 d:"Panini enormi farciti al momento (falafel, pollo, verdure) nella via dei bar della Mercè. Spesso c'è la fila, ma scorre veloce.",pr:"Un panino resta sotto i 10 € (listino non visto)."},
laplata:{n:"Bar La Plata",a:"Carrer de la Mercè 28",z:"A",r:"4,7",pos:[41.38041,2.180593],h:["","11:00-15:00,18:00-23:00","11:00-15:00,18:00-23:00","11:00-15:00,18:00-23:00","11:00-15:00,18:00-23:00","11:00-15:00,18:00-23:00",""],
 d:"Bar minuscolo e storico che serve quasi solo quattro cose: pescaditos fritti, salsiccia, insalata di pomodoro e acciughe, con il vino della casa. In piedi o sulle botti.",pr:"Con due piatti e un bicchiere si resta intorno ai 15 € (listino non visto)."},
hofmann:{n:"Pastisseria Hofmann",a:"Carrer dels Flassaders 44",z:"B",r:"4,4",pos:[41.385079,2.182704],h:["09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-19:00"],
 d:"La pasticceria della scuola Hofmann, nel Born: famosa per il croissant ripieno al mascarpone. Solo da asporto.",pr:"Un dolce a pochi euro (listino non visto)."},
baluard:{n:"Baluard Barceloneta",a:"Carrer del Baluard 38",z:"B",r:"4,6",pos:[41.380013,2.188908],h:["07:30-21:00","07:30-21:00","07:30-21:00","07:30-21:00","07:30-21:00","07:30-21:00","07:30-15:00"],
 d:"Forno artigianale della Barceloneta con il forno a legna in vista: pane a lievitazione naturale, croissant e coca catalana.",pr:"Pochi euro."},
bombeta:{n:"La Bombeta",a:"Carrer de la Maquinista 3",z:"B",r:"4,3",pos:[41.380578,2.187707],h:["12:00-00:00","12:00-00:00","","12:00-00:00","12:00-00:00","12:00-00:00","12:00-00:00"],
 d:"Bar di tapas della Barceloneta che ha inventato la «bomba», la polpetta di patata ripiena con salsa piccante. Chiuso il mercoledì.",pr:"Con due o tre tapas si resta sotto i 15 € (listino non visto)."},
montolio:{n:"Montolio Can Maño",a:"Carrer del Baluard 12",z:"B",r:"4,5",pos:[41.381144,2.18849],h:["","09:00-11:00,13:00-16:00","09:00-11:00,13:00-16:00","09:00-11:00,13:00-16:00,20:00-23:00","09:00-11:00,13:00-16:00,20:00-23:00","09:00-11:00,13:00-16:00",""],
 d:"Casa di pesce semplice e familiare alla Barceloneta: fritture, calamari e piatti del giorno, tra i più economici del quartiere. Spesso c'è da aspettare.",pr:"Fascia economica (listino non visto)."},
paixano:{n:"Can Paixano",a:"Carrer de la Reina Cristina 7",z:"B",r:"4,6",pos:[41.38140,2.18380],h:["","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00",""],
 d:"Il bar del cava, in piedi al bancone: panino caldo con salsiccia o chorizo e un calice di cava rosato. Sempre pieno e rumoroso.",pr:"Panino e un paio di calici con circa 8 € (da recensioni)."},
canros:{n:"Restaurant Can Ros",a:"Carrer de l'Almirall Aixada 7",z:"B",r:"4,4",pos:[41.37870,2.18860],h:["","13:00-15:30,19:00-22:30","13:00-15:30,19:00-22:30","13:00-15:30,19:00-22:30","13:00-15:30,19:00-22:30","13:00-22:30","13:00-16:00"],
 d:"Locale di famiglia della Barceloneta specializzato in risi: paella di pesce, arròs negre e fideuà, cucinati al momento. Chiuso il lunedì.",pr:"L'arròs negre costa circa 17,50 € a testa (da recensioni)."},
cansole:{n:"Can Solé",a:"Carrer de Sant Carles 4",z:"B",r:"4,3",pos:[41.37960,2.18750],h:["","13:00-16:00,20:00-23:00","13:00-16:00,20:00-23:00","13:00-16:00,20:00-23:00","13:00-16:00,20:30-23:00","13:00-16:00,20:30-23:00","13:00-16:00"],
 d:"Aperto dal 1903, è tra i risi più rinomati della Barceloneta. Costa di più ma è un classico. Chiuso il lunedì.",pr:"Paella di pesce intorno ai 25–35 € a testa."},
bodegaros:{n:"Bar Bodega Can Ros",a:"Carrer de Roger de Flor 303",z:"C",r:"4,4",pos:[41.405008,2.164228],h:["08:00-16:00","08:00-16:00","08:00-23:00","08:00-23:00","08:00-23:00","","08:00-16:00"],
 d:"Bar di quartiere dal 1971: frittelle di baccalà, tortilla di carciofi e il panino con le polpette. Fascia economica. Il sabato è chiuso.",pr:"Con un panino e una tapa si resta sotto i 15 € (listino non visto)."},
tossa:{n:"Restaurant Tossa",a:"Carrer de Nàpols 291",z:"C",r:"4,2",pos:[41.403311,2.168588],h:["08:00-23:00","08:00-23:00","08:00-23:00","08:00-23:00","08:00-23:00","09:30-23:00","11:00-23:00"],
 d:"Bar-ristorante di quartiere a cinque minuti dalla Sagrada Família, aperto tutto il giorno: colazione, menú del día e tapas.",pr:"Prezzi da quartiere (listino non visto)."},
bendita:{n:"La Bendita",a:"Carrer de Sardenya 321",z:"C",r:"4,4",pos:[41.403884,2.172294],h:["12:30-00:00","12:30-00:00","12:30-00:00","12:30-00:00","12:30-00:00","12:30-00:00","12:30-23:00"],
 d:"Bar di tapas a due passi dalla Sagrada Família ma frequentato dalla gente del quartiere: patatas bravas, crocchette e tortilla.",pr:"Con due o tre tapas si resta intorno ai 15 € (listino non visto)."},
ciutatcomtal:{n:"Cervecería Ciutat Comtal",a:"Rambla de Catalunya 18",z:"D",r:"4,4",pos:[41.388855,2.167003],h:D7("09:00-01:00"),
 d:"Tapas bar sempre pieno su Rambla de Catalunya, a metà strada tra Plaça Catalunya e Passeig de Gràcia: montaditos, crocchette, pesce alla piastra. Non si prenota.",pr:"Fascia media: con tre tapas si superano facilmente i 15 € (listino non visto)."},
pastisseria:{n:"La Pastisseria Barcelona",a:"Carrer d'Aragó 228",z:"D",r:"4,4",pos:[41.389358,2.161544],h:["","09:00-14:00,17:00-20:00","09:00-14:00,17:00-20:00","09:00-14:00,17:00-20:00","09:00-14:00,17:00-20:00","09:00-14:00,17:00-20:00","09:00-14:30"],
 d:"Pasticceria d'autore nell'Eixample, a due isolati da Passeig de Gràcia: croissant e monoporzioni da vetrina. Chiusa il lunedì.",pr:"Un dolce intorno ai 5 € (listino non visto)."},
trebol:{n:"Xurreria Trebol",a:"Carrer de Còrsega 341",z:"D",r:"4,4",pos:[41.397925,2.160931],h:["08:00-23:00","08:00-23:00","08:00-23:00","00:00-23:59","00:00-23:59","00:00-23:59","00:00-23:59"],
 d:"Churros appena fritti e cioccolata densa, tra l'Eixample e Gràcia. Da giovedì a domenica aperta giorno e notte.",pr:"Pochi euro."},
origo:{n:"Origo Bakery",a:"Carrer de Milà i Fontanals 9",z:"E",r:"4,7",pos:[41.400495,2.163197],h:["08:00-20:30","08:00-20:30","08:00-20:30","08:00-20:30","08:00-20:30","08:00-19:00","08:00-19:00"],
 d:"Forno artigianale di Gràcia: pane a lievitazione naturale, croissant e dolci da forno, con qualche posto a sedere.",pr:"Colazione sotto i 10 € (listino non visto)."},
casi:{n:"Bar Restaurant Casi",a:"Carrer de Massens 74",z:"E",r:"4,7",pos:[41.409139,2.155875],h:["08:00-16:30","08:00-16:30","08:00-16:30","08:00-16:30","08:00-16:30","08:00-16:30",""],
 d:"Bar di quartiere nella parte alta di Gràcia, sulla strada per il Park Güell: colazione e cucina casalinga a pranzo. Chiuso la domenica.",pr:"Prezzi da residenti (listino non visto)."},
croqroll:{n:"Croq & Roll Gràcia",a:"Travessera de Gràcia 233",z:"E",r:"4,5",pos:[41.40383,2.161609],h:["18:00-23:30","18:00-23:30","18:00-23:30","18:00-23:30","12:00-23:30","12:00-23:30","12:00-23:30"],
 d:"Crocchette di tutti i gusti, classiche e creative, da mangiare al tavolo o da asporto. Dal lunedì al giovedì apre solo la sera.",pr:"Con qualche crocchetta e una birra si resta sotto i 15 € (listino non visto)."},
mistral:{n:"Forn Mistral",a:"Ronda de Sant Antoni 96",z:"F",r:"4,5",pos:[41.384733,2.164147],h:["07:30-20:30","07:30-20:30","07:30-20:30","07:30-20:30","07:30-20:30","07:30-20:30",""],
 d:"Forno di quartiere davanti al Mercat de Sant Antoni: pane, croissant e coca da asporto. Chiuso la domenica.",pr:"Pochi euro."},
fabrique:{n:"La Fabrique del Poble Sec",a:"Carrer de Radas 35",z:"F",r:"4,7",pos:[41.373341,2.16095],h:["07:30-20:30","07:30-20:30","07:30-20:30","07:30-20:30","07:30-20:30","07:30-15:00",""],
 d:"Forno-caffè ai piedi di Montjuïc: pane a lievitazione naturale, croissant e panini, qualche tavolino.",pr:"Colazione sotto i 10 € (listino non visto)."},
tasqueta:{n:"La Tasqueta de Blai",a:"Carrer de Blai 15",z:"F",r:"4,5",pos:[41.373244,2.165421],h:["11:00-00:00","11:00-00:00","11:00-00:00","11:00-00:00","11:00-01:00","11:00-01:00","11:00-00:00"],
 d:"Bar di pintxos nella via pedonale di Carrer de Blai: si prendono dal bancone e si paga contando gli stecchini.",pr:"Pintxos a pochi euro l'uno: con cinque o sei si resta intorno ai 15 € (listino non visto)."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["conesa","colmena","elisabets"],B:["baluard","hofmann","colmena"],C:["bodegaros","tossa"],D:["pastisseria","ciutatcomtal","trebol"],E:["origo","casi","trebol"],F:["mistral","fabrique"]},
pra:{A:["laplata","bodeb","conesa"],B:["canros","cansole","montolio","bombeta","paixano"],C:["tossa","bendita","bodegaros"],D:["ciutatcomtal","conesa"],E:["casi","croqroll","origo"],F:["tasqueta","fabrique"]},
cen:{A:["bodeb","laplata","conesa"],B:["bombeta","paixano","bodeb"],C:["bendita","tossa","bodegaros"],D:["ciutatcomtal","conesa","bodeb"],E:["croqroll","bendita"],F:["tasqueta"]},
snk:{A:["colmena","conesa","elisabets"],B:["hofmann","paixano","baluard"],C:["bodegaros","tossa"],D:["pastisseria","trebol"],E:["origo","trebol"],F:["mistral","fabrique"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Rambla, Gòtic e Born",acts:["rambla","gotic","born","barceloneta"],need:250,core:1},
{id:"gaudi",t:"Sagrada Família e Passeig de Gràcia",acts:["sagradains","passeig"],need:200,core:1},
{id:"gracia",t:"Park Güell e Gràcia",acts:["parkguell","gracia","bunkers"],need:240,core:1},
{id:"musei",t:"Museu Picasso e Casa Batlló",acts:["picasso","batllo"],need:200,cl:[0]},
{id:"montjuic",t:"Montjuïc",acts:["mnac","castell"],need:230},
{id:"modernisme",t:"Sant Pau e La Pedrera",acts:["santpau","pedrera"],need:190}
];
var ORDER=["rambla","gotic","picasso","born","barceloneta","sagradains","sagrada","santpau","pedrera","batllo","passeig","parkguell","gracia","bunkers","mnac","castell"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["catalunya","Plaça Catalunya / Rambla",[41.3870,2.1700],"A"],
["gotic","Barri Gòtic",[41.3825,2.1770],"A"],
["raval","El Raval",[41.3800,2.1690],"A"],
["born","El Born / Ribera",[41.3850,2.1820],"B"],
["barceloneta","Barceloneta",[41.3800,2.1890],"B"],
["eixample","Eixample / Passeig de Gràcia",[41.3920,2.1650],"D"],
["sagrada","Sagrada Família",[41.4036,2.1744],"C"],
["gracia","Gràcia",[41.4020,2.1570],"E"],
["santantoni","Sant Antoni / Poble Sec",[41.3780,2.1630],"F"],
["sants","Sants (stazione)",[41.3790,2.1400],""],
["poblenou","Poblenou",[41.4000,2.2000],""],
["altro","Altra zona (scrivi l'indirizzo)",[41.3874,2.1686],""]
];
/* tassa di soggiorno dal 1° aprile 2026 (imposta catalana più supplemento di Barcellona) */
var TAX=[["h5","Hotel 5 stelle",12],["h4","Hotel 4 stelle",8.4],["h3","Hotel fino a 3 stelle, ostello o pensione",7],["apt","Appartamento turistico (es. Airbnb)",9.5],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Café con leche e croissant","la colazione da bar. Il «cortado» è un espresso macchiato."],["Pa amb tomàquet","pane strofinato col pomodoro e olio: anche a colazione, con il prosciutto."],["Ensaïmada o xuixo","dolci da forno: la prima è una spirale soffice, il secondo un fagottino fritto ripieno di crema."]],
pra:[["Menú del día","nei giorni feriali: primo, secondo, dolce e bevanda a prezzo fisso, di solito il modo più economico per pranzare."],["Paella o arròs negre","si ordinano per almeno due persone e si cuociono al momento, circa 30 minuti."],["Agua del grifo","l'acqua del rubinetto è potabile: chiedila, anche se non tutti la portano volentieri."]],
cen:[["Patatas bravas e bombas","patate con salsa piccante e, alla Barceloneta, le polpette di patata ripiene."],["Croquetas","crocchette di jamón, baccalà o funghi."],["Una caña o un vermut","la birra piccola alla spina; il vermut è il rito dell'aperitivo catalano."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Ponte di Carrer del Bisbe","Foto","Il ponte neogotico sospeso tra due palazzi: mettiti sotto l'arco guardando verso la Cattedrale. Presto la mattina c'è meno gente.",[41.3834,2.1767],"Pont del Bisbe, Barcelona","gotic"],
["🤳","Murale «El Petó»","Selfie","Il bacio fatto di migliaia di piccole foto, a due passi dalla Cattedrale: perfetto per il selfie di coppia.",[41.3839,2.1758],"El Petó, Plaça d'Isidre Nonell, Barcelona","gotic"],
["📷","Plaça Reial","Foto","Palme, portici e i lampioni disegnati dal giovane Gaudí: inquadra un lampione con le palme dietro.",[41.3801,2.1754],"Plaça Reial, Barcelona","gotic"],
["📷","Santa Maria del Mar","Foto","La facciata gotica vista da Carrer de Santa Maria, con le vie strette ai lati.",[41.3836,2.1816],"Santa Maria del Mar, Barcelona","born"],
["📷","Palau de la Música Catalana","Foto","La facciata modernista piena di mosaici, all'angolo con Carrer de Sant Pere més alt.",[41.3875,2.1753],"Palau de la Música Catalana, Barcelona","born"],
["🤳","Spiaggia della Barceloneta","Selfie","Il mare con l'hotel a forma di vela sullo sfondo.",[41.3784,2.1925],"Platja de Sant Sebastià, Barcelona","barceloneta"],
["📷","Sagrada Família dal laghetto","Foto","Dalla Plaça de Gaudí la basilica si riflette nell'acqua e sta tutta nell'inquadratura.",[41.4052,2.1745],"Plaça de Gaudí, Barcelona","sagrada"],
["📷","Sagrada Família dal laghetto","Foto","Dalla Plaça de Gaudí la basilica si riflette nell'acqua e sta tutta nell'inquadratura.",[41.4052,2.1745],"Plaça de Gaudí, Barcelona","sagradains"],
["🤳","Le vetrate della navata","Selfie","Nel pomeriggio le vetrate di ponente tingono le colonne di arancio e rosso.",[41.4036,2.1744],"Sagrada Família, Barcelona","sagradains"],
["📷","Casa Batlló","Foto","La facciata «di ossa» fotografata dal marciapiede opposto di Passeig de Gràcia.",[41.3914,2.1652],"Casa Batlló, Barcelona","passeig"],
["📷","La terrazza di Park Güell","Foto","Dalla grande panchina ondulata: le casette dell'ingresso e il mare sullo sfondo.",[41.4139,2.1527],"Park Güell, Barcelona","parkguell"],
["🤳","La salamandra di Park Güell","Selfie","Il drago di mosaico sulla scalinata d'ingresso: c'è sempre la fila, vai appena entri.",[41.4133,2.1529],"El Drac, Park Güell, Barcelona","parkguell"],
["📷","Bunkers del Carmel","Foto","Tutta la città dall'alto, dalla Sagrada Família al mare: il punto panoramico più bello di Barcellona.",[41.4192,2.1619],"Búnquers del Carmel, Barcelona","bunkers"],
["📷","Padiglioni di Sant Pau","Foto","Dal viale centrale: il padiglione dell'Amministrazione con la torre e le cupole di ceramica.",[41.4115,2.1745],"Recinte Modernista de Sant Pau, Barcelona","santpau"],
["🤳","I guerrieri della Pedrera","Selfie","Sulla terrazza, tra i comignoli a forma di elmo: nelle giornate limpide si vede la Sagrada Família.",[41.3953,2.1619],"La Pedrera, Barcelona","pedrera"],
["📷","Terrazza del MNAC","Foto","Davanti al Palau Nacional: Plaça d'Espanya e le torri veneziane in asse, con la città dietro.",[41.3690,2.1522],"Museu Nacional d'Art de Catalunya","mnac"]
];
/* avvisi verificati il 10 ottobre 2026 */
var BUS="Sono proclamati scioperi dei bus urbani TMB l'8, 14, 15, 20, 22, 27 e 29 ottobre: circolano i servizi minimi (20% della flotta, 40% nelle ore di punta). La metro non è coinvolta e l'itinerario usa la metro.";
var AVV=[
{from:"2026-10-14",to:"2026-10-15",t:"Sciopero dei bus TMB",x:BUS},
{from:"2026-10-20",to:"2026-10-20",t:"Sciopero dei bus TMB",x:BUS},
{from:"2026-10-22",to:"2026-10-22",t:"Sciopero dei bus TMB",x:BUS},
{from:"2026-10-27",to:"2026-10-27",t:"Sciopero dei bus TMB",x:BUS},
{from:"2026-10-29",to:"2026-10-29",t:"Sciopero dei bus TMB",x:BUS},
{from:"2026-10-01",to:"2026-11-30",fl:1,ap:["BCN"],t:"Sciopero del personale di terra Groundforce a El Prat",x:"Il sindacato CGT ha proclamato uno sciopero del personale di Groundforce, che segue a terra bagagli e imbarchi di diverse compagnie, dal 1° ottobre al 30 novembre, con servizi minimi fissati dal Ministero dei Trasporti. Possibili ritardi: controlla il volo con la compagnia nei giorni prima."}
];
/* clima medio di Barcellona (indicativo, massime/minime) */
var CLIM=[[14,6],[15,7],[17,9],[19,11],[23,15],[26,19],[29,22],[29,22],[26,19],[22,15],[17,10],[15,7]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Barcellona: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd,toMin=E.toMin;
if(it.id==="gotic"){var h=WD===6?"14:00–17:00":WD===5?"9:30–17:15":"9:30–18:30";meta+=" Oggi la visita turistica è "+h+(WD<5?" (ultimo ingresso 17:45)":"")+"; fuori da questi orari la Cattedrale si vede da fuori o durante le funzioni.";var oo=toMin(h.split("–")[0]),cc=toMin(h.split("–")[1]);if(it.t+it.d<oo||it.t>cc-30)meta+=" A quell'ora la visita turistica è chiusa."}
if(it.id==="batllo"&&WD>=5)meta=meta.replace("Biglietto Blue da 29 € online nei giorni feriali e 35 € nel fine settimana","Oggi è fine settimana: biglietto Blue da 35 € online");
return meta}
Object.assign(C,{id:"bcn",n:"Barcellona",cn:"Spagna",e:"🏖️",flag:"🇪🇸",col:["#004d98","#a50044","#edbb00"],k:"barcellona barcelona spagna spain catalogna",
TZ:"Europe/Madrid",LL:[41.3874,2.1686],CC:"es",QN:"Barcelona",BK:"Barcelona",ARE:/barcelona|barcellona|\b08\d{3}\b/i,VER:"10 ottobre 2026",
LANG:"es-ES",LANGN:"spagnolo",WATER:"osm",TAXDEF:"h3",TAXMAXN:7,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Plaça Catalunya",q:"Plaça de Catalunya, Barcelona"},
SINGLE:{acts:["rambla","gotic","born","barceloneta","sagrada","passeig"],ins:[]},
EXCL:[["batllo","passeig","Casa Batlló la visiti dentro in un altro giorno del viaggio: oggi goditi il viale e La Pedrera da fuori."]],
DICON:{sagradains:"⛪",parkguell:"🦎",picasso:"🎨",mnac:"⛰️",santpau:"🏥"},
ZN:{A:"in centro",B:"al Born e alla Barceloneta",C:"vicino alla Sagrada Família",D:"verso Passeig de Gràcia",E:"a Gràcia",F:"a Montjuïc e Poble Sec"},
NEAR:{col:"cafeteria",pra:"bar de tapas",cen:"bar de tapas",snk:"forn de pa"},
SE:{colmena:"🍯",conesa:"🥪",elisabets:"☕",hofmann:"🥐",baluard:"🥖",paixano:"🥂",bodegaros:"🥟",tossa:"☕",pastisseria:"🍰",trebol:"🍫",origo:"🥐",mistral:"🥖",fabrique:"🥖"},
TR:{one:2.9,lbl:"Metro e bus in città",
 air:{BCN:{one:5.9,n:"Biglietto Aeroport (metro L9)"},GRO:{one:22,n:"Bus Sagalés per Girona"}},
 passes:[
 {n:"T-dia",d:1,max:1,p:12,air:["BCN"],note:"Con la T-dia (12 €) metro e bus sono illimitati per 24 ore, con l'andata e il ritorno dall'aeroporto compresi."},
 {n:"Hola Barcelona 48 ore",d:2,p:18.7,air:["BCN"],only:function(T){return T.n===2},note:"La Hola Barcelona copre aeroporto, metro, bus e treni della zona 1 senza limiti: online c'è uno sconto del 10%."},
 {n:"Hola Barcelona 72 ore",d:3,p:27.3,air:["BCN"],only:function(T){return T.n===3},note:"La Hola Barcelona copre aeroporto, metro, bus e treni della zona 1 senza limiti: online c'è uno sconto del 10%."},
 {n:"Hola Barcelona 96 ore",d:4,p:35.6,air:["BCN"],only:function(T){return T.n===4},note:"La Hola Barcelona copre aeroporto, metro, bus e treni della zona 1 senza limiti: online c'è uno sconto del 10%."},
 {n:"Hola Barcelona 120 ore",d:5,p:43.6,air:["BCN"],only:function(T){return T.n===5},note:"La Hola Barcelona copre aeroporto, metro, bus e treni della zona 1 senza limiti: online c'è uno sconto del 10%."},
 {n:"T-casual (10 corse)",d:99,per:10,p:13,note:"Il T-casual (13 € per 10 corse) è personale: ne serve uno a testa. Non vale alle stazioni della metro dell'aeroporto."}],
 note:"Prezzi 2026 di TMB: biglietto singolo 2,90 €, T-casual 13 € per 10 corse, T-dia 12 €, biglietto Aeroport 5,90 €."},
FOOD:{co:[5,"Colazione al bar o in forno"],pr:[15,"Pranzo economico (menú del día, tapas o panino)"],ce:[14,"Cena di tapas"],sp:[5,"Spuntini e assaggi"]},
T:{ride:"In metro",move:"tutto a piedi o in metro",bags:"«¿Puedo dejar las maletas?»",bagsPM:"«¿Puedo dejar las maletas hasta la tarde?»",bagsAM:"«¿Puedo dejar las maletas hasta mediodía?»",
pra:"Un bar di quartiere",praZ:{B:"Alla Barceloneta: tapas, fritti e panini ai banconi dei bar, per spendere poco. La paella costa 25–35 € a testa: se la vuoi, ordinala per almeno due e subito, cuoce 30 minuti."},
freeLong:"Qualche idea: la spiaggia della Barceloneta, il Parc de la Ciutadella con la cascata monumentale, il Mercat de Sant Antoni, un vermut in una bodega di quartiere, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata sul lungomare o un vermut in una bodega di quartiere.",
remind:"Se vuoi entrare nella Sagrada Família, compra prima il biglietto con orario: spesso è esaurito.",
rain1:"Al coperto: la Boqueria, la Cattedrale, Santa Maria del Mar e i portici di Plaça Reial.",
rainM:"Al coperto: Sagrada Família, Casa Batlló, La Pedrera, Museu Picasso, MNAC e la Boqueria.",
water:"Riempite la borraccia alle fontanelle pubbliche: l'acqua di Barcellona è potabile. Attivate «Acqua» sulla mappa per vedere le più vicine.",
kitchen:"A Barcellona si cena tardi e molte cucine riaprono solo verso le 20: guarda l'orario accanto a ogni locale, alcuni qui scelti restano aperti tutto il pomeriggio.",
night:[["🍷","Per un vermut o una caña dopo cena restate nel quartiere dell'alloggio: sulla Rambla e in Plaça Reial costano il doppio."],["🕙","A Barcellona si cena tardi: molte cucine aprono alle 20 e si riempiono dopo le 21."],["🥐","Molti forni aprono alle 7:30–8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire alle fontanelle)",
fuso:"Italia e Spagna hanno lo stesso fuso",
foodNote:"I pasti sono stime per locali di quartiere: colazione e cena restano sotto i 15 € a persona, la paella a pranzo costa di più.",
taxNote:"La tassa di soggiorno si paga a persona e a notte, per al massimo 7 notti, e sotto i 17 anni non si paga: spesso non è compresa nel prezzo e si paga alla struttura.",
mcrit:"Criteri: almeno 4 stelle su Google, bar, forni e bodegas di quartiere, niente catene. Colazione e cena restano intorno o sotto i 15 € a persona; la paella costa di più. Valutazioni e orari da Google Maps e dai siti dei locali (ottobre 2026), prezzi indicativi: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Al ritorno tieni il biglietto a portata di mano: alle stazioni della metro dell'aeroporto serve anche per uscire dai tornelli.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietti dei mezzi: alle macchinette della metro (anche in italiano, si paga con la carta)"],["gro","Biglietto del bus Sagalés per l'aeroporto di Girona, comprato online",function(E){return E.cfg.to==="GRO"||E.cfg.rt==="GRO"}],["sf","Biglietto con orario per la Sagrada Família (sagradafamilia.org)",["sagradains"]],["pg","Biglietto con orario per il Park Güell (parkguell.barcelona)",["parkguell"]],["mp","Biglietto per il Museu Picasso (online costa meno)",["picasso"]],["cb","Biglietto per Casa Batlló (online e almeno una settimana prima costa meno)",["batllo"]],["lp","Biglietto per La Pedrera (online)",["pedrera"]],["cash","Qualche euro in contanti per mercati e bar piccoli"],["cov","Qualcosa per coprire spalle e ginocchia in chiesa",["gotic","sagradains"]]],
NUM:{1:["una persona","U-na per-SO-na"],2:["dos","DOS"],3:["tres","TRES"],4:["cuatro","KUA-tro"],5:["cinco","SIN-ko"],6:["seis","SEIS"],7:["siete","SIE-te"],8:["ocho","O-cio"],9:["nueve","NUE-be"],10:["diez","DIES"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Buenos días / Buenas tardes","BUE-nos DI-as / BUE-nas TAR-des"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Una mesa para "+nu[0]+", por favor","U-na ME-sa PA-ra "+nu[1]+", por fa-BOR"],["Un caffellatte e un croissant, per favore","Un café con leche y un cruasán, por favor","un ka-FE kon LE-ce i un krua-SAN, por fa-BOR"],["Una paella per due","Una paella para dos","U-na pa-E-ia PA-ra DOS"],["Acqua del rubinetto, per favore","Agua del grifo, por favor","A-gua del GRI-fo, por fa-BOR"],["Il conto, per favore","La cuenta, por favor","la KUEN-ta, por fa-BOR"],["Posso pagare con la carta?","¿Puedo pagar con tarjeta?","PUE-do pa-GAR kon tar-HE-ta"],["Quanto costa?","¿Cuánto cuesta?","KUAN-to KUES-ta"],["Dov'è la metro?","¿Dónde está el metro?","DON-de es-TA el ME-tro"],["Un biglietto per l'aeroporto","Un billete para el aeropuerto","un bi-IE-te PA-ra el a-e-ro-PUER-to"]];
if(M)fr=fr.concat([["Ho una prenotazione","Tengo una reserva","TEN-go U-na re-SER-ba"],["Posso lasciare i bagagli?","¿Puedo dejar las maletas?","PUE-do de-HAR las ma-LE-tas"],["A che ora è il check-out?","¿A qué hora es la salida?","a KE O-ra es la sa-LI-da"]]);
return fr.concat([["Mi scusi","Perdone","per-DO-ne"],["Grazie mille!","¡Muchas gracias!","MU-cias GRA-sias"]])},
taxTxt:function(tx){return "Tassa di soggiorno dal 1° aprile 2026 (imposta catalana più supplemento di Barcellona): "+(tx[2]?(Math.round(tx[2]*100)/100).toLocaleString("it-IT",{minimumFractionDigits:2})+" € a persona e a notte ("+tx[1].toLowerCase()+"), per al massimo 7 notti":"non si paga se sei ospite di amici o parenti")+". Sotto i 17 anni non si paga."},
STAYTIPS:["La metro chiude verso mezzanotte dalla domenica al giovedì, alle 2 il venerdì e resta aperta tutta la notte il sabato: la sera controlla l'ultima corsa."],
ZONES:[
["🏛️ Plaça Catalunya e Rambla",["💧 In cima alla Rambla c'è la Font de Canaletes: la tradizione dice che chi ne beve torna a Barcellona.","È la zona con più borseggiatori: zaino davanti, telefono mai sul tavolo dei bar all'aperto.","Sulla Rambla i locali costano di più: per mangiare spostati di una via, per esempio su Rambla de Catalunya.","La Boqueria è chiusa la domenica; i banchi d'ingresso sono i più cari, quelli in fondo i più veri."]],
["⛪ Barri Gòtic",["La Cattedrale chiede spalle e ginocchia coperte.","Visita turistica 16 €: nei giorni feriali 9:30–18:30 (ultimo ingresso 17:45), il sabato 9:30–17:15, la domenica 14–17.","Plaça de Sant Felip Neri è un angolo tranquillo a due passi dalla Cattedrale, buono per una pausa.","💧 Nelle piazze del quartiere ci sono fontanelle in ghisa: attivate «Acqua» sulla mappa."]],
["🎶 El Born",["Le vie strette tra Carrer de Montcada e il Passeig del Born sono le più belle per passeggiare.","Il Mercat del Born, ex mercato coperto, mostra gratis gli scavi della città del 1714.","💧 Il Parc de la Ciutadella, a 5 minuti, è buono per una pausa all'ombra."]],
["🥘 Barceloneta e paella",["La paella è un piatto da pranzo e si cucina al momento: ordina appena ti siedi, ci vogliono circa 30 minuti.","Diffida dei locali con le foto delle paelle esposte e dei camerieri che ti chiamano dalla strada.","Dopo pranzo bastano 5 minuti per arrivare in spiaggia.","💧 Prima di sederti a pranzo riempi la borraccia: nei locali l'acqua in bottiglia si paga."]],
["🏗️ Sagrada Família",["Da fuori la si gode benissimo: la Facciata della Natività è la più ricca di dettagli.","Per entrare serve il biglietto con orario, da 26 € (36 € con le torri), solo su sagradafamilia.org.","Per la foto intera vai in Plaça de Gaudí, dall'altra parte del laghetto.","Attenzione ai borseggiatori tra la folla davanti all'ingresso."]],
["🏠 Passeig de Gràcia",["Casa Batlló e La Pedrera si vedono bene da fuori; entrare costa da 29 € (Batlló, online) e 29 € (Pedrera, 25 € la visita al tramonto).","Per mangiare spendendo poco spostati nelle vie laterali o verso Gràcia.","Da Passeig de Gràcia la metro L3 porta direttamente a Zona Universitària, dove si cambia per l'aeroporto."]],
["🦎 Park Güell, Gràcia e Bunkers",["Il biglietto del Park Güell (18 €) ha un orario d'ingresso: si entra entro 30 minuti e, se esci, non si rientra. La mattina presto e la sera il parco è riservato ai residenti.","Gràcia è il quartiere dove si mangia meglio spendendo meno: menú del día a pranzo e tapas la sera.","Ai Bunkers del Carmel si sale a piedi, in salita: in cima non c'è acqua né ombra, porta la borraccia piena."],["parkguell","gracia","bunkers"]],
["🎨 Museu Picasso e Casa Batlló",["Museu Picasso: 14 € online (15 € in biglietteria), chiuso il lunedì; da novembre ad aprile il giovedì dalle 16 alle 19 è gratis.","Casa Batlló costa meno online, nei giorni feriali e se compri almeno una settimana prima: Blue da 29 €, 35 € nel fine settimana. Aperta tutti i giorni 8:30–22:30."],["picasso","batllo"]],
["🏥 Sant Pau e La Pedrera",["Sant Pau: visita libera 18 € prima delle 14 e 17 € dopo, aperto tutti i giorni; dalla Sagrada Família si arriva a piedi in 15 minuti lungo l'Avinguda de Gaudí.","La Pedrera: biglietto Essential 29 €, aperta 9–20:30 fino al 1° novembre e 9–18:30 da novembre a febbraio. La terrazza può chiudere con pioggia o vento forte."],["santpau","pedrera"]],
["⛰️ Montjuïc",["Da Plaça d'Espanya al MNAC ci sono scale mobili all'aperto.","MNAC 12 €, chiuso il lunedì. Castell de Montjuïc 12 €, gratis la domenica dalle 15 e la prima domenica del mese.","Per scendere c'è un sentiero tra i giardini fino a Poble Sec, dove si mangia bene in Carrer de Blai."],["mnac","castell"]]],
WTIPS:["L'acqua delle fontanelle pubbliche di Barcellona è potabile: porta una borraccia e risparmi sulle bottigliette.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Le fontane decorative non sono da bere: usa solo quelle con il rubinetto o il pulsante.","Al bar chiedi «agua del grifo»: l'acqua del rubinetto è potabile, anche se ha un sapore un po' calcareo."],
GEN:["Italia e Spagna hanno lo stesso fuso orario.","Gli orari dei pasti sono spostati: pranzo dalle 13:30, cena dalle 20:30.","La mancia non è obbligatoria: al bar qualche moneta, al ristorante il 5–10% se il servizio è stato buono.","La carta (anche contactless) si accetta quasi ovunque; tieni qualche euro in contanti per mercati e bar piccoli.","Barcellona è famosa per i borseggiatori: zaino davanti in metro, sulla Rambla e in spiaggia.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze: gratis, anche senza credito.</li><li><a class="call" href="tel:091">📞 091</a> Polizia nazionale · <a class="call" href="tel:061">📞 061</a> Emergenze sanitarie in Catalogna</li><li>🚇 Metro e bus, anche per gli oggetti smarriti: <a href="https://www.tmb.cat/" target="_blank" rel="noopener">tmb.cat</a>.</li><li>🇮🇹 Consolato Generale d\'Italia a Barcellona: <a href="https://consbarcellona.esteri.it" target="_blank" rel="noopener">consbarcellona.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Nei giorni prima controllate il servizio su <a href="https://www.tmb.cat/" target="_blank" rel="noopener">tmb.cat</a> (metro e bus) e, se usate il treno, su <a href="https://rodalies.gencat.cat/" target="_blank" rel="noopener">rodalies.gencat.cat</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="72" cy="30" r="13"/><path d="M0 106 Q34 84 74 86 Q112 88 146 106 Z"/><path d="M262 106 Q306 76 352 80 Q382 84 400 94 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M28 106 V97 h24 V106 Z M34 97 V91 h12 V97 Z M38.5 91 V46 h3 V91 Z M36.5 46 h7 v-3 h-7z"/><circle cx="40" cy="39" r="3.2"/><path d="M39 36 v-8 h2 v8z M41 30 l5.5 -3.2 v1.3 l-5.5 3.2z"/></g>'+
'<g style="--k:2"><path d="M66 106 Q74 70 96 44 Q91 80 98 106 Z"/></g>'+
'<g style="--k:3"><path d="M118 106 Q117 88 121 72 l1.6 .3 Q119 88 120.6 106 Z"/><path d="M122 72 q-9 -2 -14 4 q8 -6 14 -4z M122 72 q9 -3 14 3 q-8 -5 -14 -3z M122 72 q-4 -8 -11 -9 q7 2 11 9z M122 72 q5 -8 12 -8 q-7 1 -12 8z"/></g>'+
'<g style="--k:4"><path d="M150 106 V78 h100 V106 Z"/><path d="M153 78 L155.25 52 Q158 40 160.75 52 L163 78 Z M164.5 78 L166.975 40 Q170 28 173.025 40 L175.5 78 Z M176.5 78 L178.975 46 Q182 34 185.025 46 L187.5 78 Z M212.5 78 L214.975 46 Q218 34 221.025 46 L223.5 78 Z M224.5 78 L226.975 40 Q230 28 233.025 40 L235.5 78 Z M237 78 L239.25 52 Q242 40 244.75 52 L247 78 Z"/><path d="M184.5 78 L186.525 32 Q189 20 191.475 32 L193.5 78 Z M206.5 78 L208.525 32 Q211 20 213.475 32 L215.5 78 Z"/><path d="M192 80 L195.6 18 Q200 6 204.4 18 L208 80 Z"/><path d="M199.1 7 v-7 h1.8 v7z M196.4 2.2 h7.2 v1.6 h-7.2z"/></g>'+
'<g style="--k:5"><path d="M286 106 V54 Q286 27 299 22 Q312 27 312 54 V106 Z"/></g>'+
'<g style="--k:6"><path d="M330 106 V72 h38 V106 h-12 V90 A7 7 0 0 0 342 90 V106 Z"/><path d="M328 72 h42 v-4 h-42z M332 68 h34 v-6 h-34z"/><path d="M379 106 Q378 88 382 74 l1.6 .3 Q380 88 381.6 106 Z"/><path d="M383 74 q-9 -2 -13 4 q7 -6 13 -4z M383 74 q9 -3 13 3 q-7 -5 -13 -3z M383 74 q-4 -8 -10 -9 q6 2 10 9z M383 74 q5 -8 11 -8 q-6 1 -11 8z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M160 88 v12 M172 86 v14 M184 86 v14 M216 86 v14 M228 86 v14 M240 88 v12 M194 96 a6 6 0 0 1 12 0 M200 30 v40 M170 46 v20 M230 46 v20"/><path d="M290 44 h18 M288 58 h22 M288 72 h22 M288 86 h22 M299 26 V104"/><path d="M334 76 h30 M349 72 V84"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="200" cy="4" r="1.6"/><circle cx="170" cy="30" r="1.3"/><circle cx="230" cy="30" r="1.3"/><circle cx="299" cy="34" r="1.4"/><circle cx="305" cy="62" r="1.3"/><circle cx="293" cy="80" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'+
'<g class="sk-sea" style="--k:9"><path d="M18 113 q7 -4 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0"/><path d="M30 120 q7 -4 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0"/></g>'
});
})(CITIES.bcn);
