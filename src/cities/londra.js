/* ===== Londra (dati verificati il 10 ottobre 2026; 1 £ = 1,18 €) ===== */
window.CITIES=window.CITIES||{};
CITIES.londra=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
LHR:{n:"Heathrow",s:"London Heathrow",url:"https://www.heathrow.com/",live:"Heathrow",inMin:90,buf:140,pos:[51.4700,-0.4543],sd:"Heathrow · Elizabeth line",rt:"Dall'aeroporto: Elizabeth line diretta fino a Tottenham Court Road.",
 arr:"Dopo il controllo passaporti e il ritiro dei bagagli, segui i cartelli «Trains» e «Elizabeth line». L'Elizabeth line (la linea viola) va senza cambi fino a Tottenham Court Road, in centro, in circa 35–40 minuti. Controlla il display: alcuni treni fermano a Terminal 2 e 3, altri al 4 e al 5 (il 5 ha meno corse).",
 tk:"Biglietto: circa 15,50 £ (18 €) a tratta. Si paga con carta contactless o telefono sul lettore ai tornelli, all'ingresso e all'uscita, sempre con la stessa carta; oppure alle macchinette (scegli «Elizabeth line», non Heathrow Express).",
 gm:"Heathrow Airport Elizabeth line station",
 tips:["Più economico ma più lento: la Piccadilly line (la linea blu scuro) costa circa 5,90 £ (7 €) e porta a Leicester Square e Covent Garden in circa un'ora.","Heathrow Express arriva a Paddington in 15 minuti ma costa circa 25 £ (30 €): conviene l'Elizabeth line, che da Paddington prosegue verso il centro.","Il taxi nero costa dalle 60 £ (70 €) in su e nell'ora di punta può metterci più di un'ora."]},
LGW:{n:"Gatwick",s:"London Gatwick",url:"https://www.gatwickairport.com/",live:"Gatwick",inMin:75,buf:130,pos:[51.1537,-0.1821],sd:"Gatwick · Thameslink",rt:"Dall'aeroporto: Thameslink fino a Farringdon, poi Elizabeth line.",
 arr:"Segui i cartelli «Trains» fino alla stazione di Gatwick Airport, collegata ai due terminal. Sali su un Thameslink diretto a nord: in circa 40 minuti arrivi a Farringdon, dove cambi con l'Elizabeth line per una sola fermata fino a Tottenham Court Road.",
 tk:"Biglietto del treno Gatwick–Farringdon circa 12 £ (14 €), alle macchinette della stazione o su thameslinkrailway.com, da comprare prima dei tornelli. Da Farringdon a Tottenham Court Road basta la carta contactless (circa 3,50 €).",
 gm:"Gatwick Airport railway station",
 tips:["Il Gatwick Express porta a Victoria in 30 minuti senza fermate, ma costa di più del Thameslink.","I bus Terravision, National Express e Airport Bus costano meno, ma ci mettono 1 ora e mezza e più nelle ore di punta.","Il taxi costa dalle 80 £ (95 €) in su."]},
STN:{n:"Stansted",s:"London Stansted",url:"https://www.stanstedairport.com/",live:"Stansted",inMin:75,buf:150,pos:[51.8860,0.2389],sd:"Stansted · Stansted Express",rt:"Dall'aeroporto: Stansted Express fino a Liverpool Street, poi Elizabeth line.",
 arr:"Segui i cartelli «Trains» fino alla stazione dell'aeroporto: lo Stansted Express porta a London Liverpool Street in circa 50 minuti, con un treno ogni 15 minuti, dalle 5:30 fino a dopo mezzanotte. Da Liverpool Street l'Elizabeth line arriva a Tottenham Court Road in 2 fermate (circa 8 minuti).",
 tk:"Stansted Express: circa 20–25 £ (24–30 €) il giorno stesso, da 9,90 £ (12 €) se prenoti online in anticipo su stanstedexpress.com. Il resto del viaggio, sull'Elizabeth line, si paga con la carta contactless (circa 3,50 €).",
 gm:"Stansted Airport railway station",
 tips:["I bus per Victoria o Liverpool Street (Terravision, National Express, Airport Bus) costano circa 7–16 £ (8–19 €) ma ci mettono 1 ora e un quarto o più.","Stansted è l'aeroporto più lontano dal centro: lascia un margine in più al ritorno.","Il taxi costa dalle 90 £ (105 €) in su."]},
LTN:{n:"Luton",s:"London Luton",url:"https://www.london-luton.co.uk/",live:"Luton",inMin:65,buf:130,pos:[51.8747,-0.3683],sd:"Luton · navetta e Thameslink",rt:"Dall'aeroporto: navetta DART, Thameslink fino a Farringdon, poi Elizabeth line.",
 arr:"Dal terminal prendi la navetta DART (4 minuti, a pagamento) fino alla stazione di Luton Airport Parkway; da lì i Thameslink arrivano a Farringdon in circa 40 minuti. A Farringdon cambi con l'Elizabeth line per una fermata fino a Tottenham Court Road.",
 tk:"In tutto circa 15–22 £ (18–26 €) con navetta e treno: biglietto del treno alle macchinette della stazione di Parkway o su thameslinkrailway.com. L'ultimo tratto in Elizabeth line si paga con la carta contactless.",
 gm:"Luton Airport Parkway railway station",
 tips:["I bus per Victoria costano meno (circa 6–12 £) ma ci mettono più di un'ora.","Controlla il tabellone dei Thameslink: alcuni treni saltano le fermate e arrivano prima.","Il taxi costa dalle 80 £ (95 €) in su."]},
LCY:{n:"London City",s:"London City",url:"https://www.londoncityairport.com/",live:"London City",inMin:45,buf:90,pos:[51.5053,0.0553],sd:"London City · DLR",rt:"Dall'aeroporto: DLR fino a Bank, poi Central line.",
 arr:"La stazione del DLR (il treno leggero senza conducente) è proprio davanti al terminal. In circa 22 minuti arrivi a Bank, dove con la Central line (la linea rossa) a Tottenham Court Road ci vogliono 4 fermate, circa 8 minuti.",
 tk:"Si paga con la carta contactless o il telefono, in zona 3: circa 3,60 £ (4 €) per il DLR più il tratto in metro, con il tetto giornaliero. Non servono biglietti di carta.",
 gm:"London City Airport DLR station",
 tips:["È l'aeroporto più vicino al centro: la sera e la domenica il DLR è un po' meno frequente, controlla l'ultima corsa.","Il taxi costa circa 30–40 £ (35–47 €) fino al centro."]}
};
/* linee (tracciati indicativi) */
var SEG={
eliz:{c:"#6950a1",n:"Elizabeth line",p:[[51.4713,-0.4524,"Heathrow Terminals 2 & 3",2],[51.5030,-0.4206,"Hayes & Harlington"],[51.5057,-0.3786,"Southall"],[51.5099,-0.3414,"Hanwell"],[51.5149,-0.3017,"Ealing Broadway"],[51.5170,-0.2677,"Acton Main Line"],[51.5154,-0.1755,"Paddington",2],[51.5142,-0.1494,"Bond Street",1],[51.5165,-0.1309,"Tottenham Court Road",2],[51.5203,-0.1053,"Farringdon",2],[51.5178,-0.0823,"Liverpool Street",2],[51.5195,-0.0612,"Whitechapel"]]},
thS:{c:"#e9438f",n:"Thameslink",p:[[51.1564,-0.1610,"Gatwick Airport",2],[51.2400,-0.1650,"Redhill"],[51.3170,-0.1370,"Purley"],[51.3752,-0.0927,"East Croydon"],[51.4640,-0.1000],[51.5052,-0.0863,"London Bridge"],[51.5120,-0.1038,"Blackfriars"],[51.5203,-0.1053,"Farringdon",2]]},
thN:{c:"#e9438f",n:"Thameslink",p:[[51.8747,-0.3683,"Aeroporto di Luton",2],[51.8785,-0.3955,"Luton Airport Parkway",2],[51.7503,-0.3272,"St Albans"],[51.6130,-0.2490,"Mill Hill Broadway"],[51.5486,-0.1913,"West Hampstead"],[51.5307,-0.1260,"St Pancras"],[51.5203,-0.1053,"Farringdon",2]]},
stn:{c:"#d71920",n:"Stansted Express",p:[[51.8892,0.2610,"Stansted Airport",2],[51.8000,0.0800],[51.7000,-0.0200],[51.5882,-0.0594,"Tottenham Hale"],[51.5178,-0.0823,"Liverpool Street",2]]},
dlr:{c:"#00a4a7",n:"DLR",p:[[51.5133,-0.0886,"Bank",2],[51.5112,-0.0569,"Shadwell"],[51.5124,-0.0396,"Limehouse"],[51.5077,-0.0173,"Poplar"],[51.5147,0.0083,"Canning Town"],[51.5026,0.0227,"West Silvertown"],[51.5022,0.0328,"Pontoon Dock"],[51.5037,0.0495,"London City Airport",2]]},
cen:{c:"#e32017",n:"Central line",p:[[51.5133,-0.0886,"Bank",2],[51.5146,-0.0973,"St Paul's",2],[51.5185,-0.1111,"Chancery Lane"],[51.5174,-0.1200,"Holborn"],[51.5165,-0.1309,"Tottenham Court Road",2]]},
cir:{c:"#00782a",n:"District e Circle line",p:[[51.5098,-0.0766,"Tower Hill",2],[51.5108,-0.0863,"Monument"],[51.5113,-0.0904,"Cannon Street"],[51.5122,-0.0940,"Mansion House",2],[51.5120,-0.1038,"Blackfriars"],[51.5111,-0.1141,"Temple"],[51.5074,-0.1223,"Embankment",2],[51.5010,-0.1254,"Westminster",2],[51.4994,-0.1335,"St James's Park",2]]},
nor:{c:"#222222",n:"Northern line",p:[[51.5074,-0.1223,"Embankment",2],[51.5080,-0.1247,"Charing Cross"],[51.5113,-0.1281,"Leicester Square",2],[51.5165,-0.1309,"Tottenham Court Road",2]]},
pic:{c:"#003688",n:"Piccadilly line",p:[[51.5067,-0.1428,"Green Park",2],[51.5098,-0.1342,"Piccadilly Circus"],[51.5113,-0.1281,"Leicester Square",2],[51.5129,-0.1243,"Covent Garden",2],[51.5174,-0.1200,"Holborn"]]}
};
var START=[51.5165,-0.1309];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
covent:{t:"Covent Garden e Soho",z:"B",p:3,min:35,id:60,max:100,pos:[51.5117,-0.1240],q:"Covent Garden Piazza, London",cls:"walk",
 d:"La piazza coperta di Covent Garden con gli artisti di strada, poi i vicoli di Soho: Neal's Yard, il cortile dalle facciate colorate, Chinatown con le lanterne rosse e Carnaby Street.",
 m:"Si cammina tra le vie gratis. I negozi del Covent Garden Market sono tra i più cari della città: per mangiare scegli Chinatown o le vie laterali."},
trafalgar:{t:"Trafalgar Square e National Gallery",z:"B",p:3,min:25,id:45,max:100,pos:[51.5080,-0.1281],q:"Trafalgar Square, London",cls:"walk",
 d:"La grande piazza con la colonna di Nelson e i leoni di bronzo; sul lato nord la National Gallery, con Van Gogh, Leonardo, Turner e Botticelli. In fondo a Whitehall si intravede il Big Ben.",
 m:"La National Gallery è gratis: aperta 10–18, il venerdì fino alle 21. Per i capolavori bastano 60–90 minuti; la prenotazione gratuita è facoltativa."},
westminster:{t:"Westminster: Big Ben e Parlamento",z:"A",p:1,min:25,id:40,max:70,pos:[51.5007,-0.1246],q:"Big Ben, London",cls:"walk",tk:[38,"Abbazia di Westminster (32 £)",1,1],
 d:"Il Palazzo di Westminster con la torre dell'orologio (il «Big Ben» è in realtà la campana), il Westminster Bridge con la vista sul London Eye e, di fronte al Parlamento, l'Abbazia di Westminster, dove si incoronano i re.",
 m:"Da fuori è gratis. L'Abbazia costa 32 £ (circa 38 €), la domenica non si visita e il sabato chiude intorno alle 13."},
buckingham:{t:"Buckingham Palace e St James's Park",z:"A",p:3,min:25,id:40,max:70,pos:[51.5014,-0.1419],q:"Buckingham Palace, London",cls:"walk",
 d:"Il palazzo del re con il Victoria Memorial davanti e The Mall, il viale rosso che porta a Trafalgar Square. Accanto il St James's Park, con il laghetto, i pellicani e la vista sul palazzo da un ponticello.",
 m:"Il cambio della guardia è il lunedì, il mercoledì e il venerdì alle 11:00 (può essere cancellato con poco preavviso; arriva 40 minuti prima per un posto ai cancelli). Il palazzo si visita dentro solo in alcuni periodi dell'anno."},
stpaul:{t:"Cattedrale di St Paul e Millennium Bridge",z:"D",p:2,min:25,id:40,max:70,pos:[51.5138,-0.0984],q:"St Paul's Cathedral, London",cls:"walk",tk:[32,"Cattedrale di St Paul (27 £)",1,1],
 d:"La cupola di Christopher Wren, tra le più grandi del mondo, sopra la scalinata d'ingresso; da lì si scende al Millennium Bridge, il ponte pedonale che porta in un minuto alla Tate Modern.",
 m:"Dentro costa 27 £ (circa 32 €): aperta dal lunedì al sabato 8:30–16:30 (ultimo ingresso 16:00), la domenica solo per le funzioni. Da fuori si gode benissimo la facciata."},
southbank:{t:"South Bank e Tate Modern",z:"D",p:4,min:30,id:50,max:90,pos:[51.5076,-0.0994],q:"Tate Modern, London",cls:"walk",
 d:"Si cammina lungo il Tamigi: la Tate Modern, l'ex centrale elettrica con la sala delle turbine, lo Shakespeare's Globe e i ponti, con la City di fronte.",
 m:"La Tate Modern è gratis: domenica–giovedì 10–18, venerdì e sabato 10–21 (ultimo ingresso mezz'ora prima). Il lungofiume è sempre aperto e pieno di artisti di strada."},
borough:{t:"Borough Market e Southwark",z:"D",p:4,min:35,id:60,max:100,pos:[51.5055,-0.0910],q:"Borough Market, London",cls:"walk",
 d:"Il mercato coperto più antico di Londra, con banchi di formaggi, pane, spezie e cibo di strada, accanto alla cattedrale di Southwark e a London Bridge.",
 m:"Il mercato è aperto da martedì a venerdì 10–17, sabato 9–17, domenica 10–16; il lunedì è chiuso. Per un pranzo economico prendi un piatto caldo da dividere e mangia sulle panchine lungo il fiume."},
towerbridge:{t:"Tower Bridge e Torre di Londra da fuori",z:"D",p:2,min:30,id:50,max:80,pos:[51.5055,-0.0754],q:"Tower Bridge, London",cls:"walk",tk:[21,"Tower Bridge Exhibition (18 £)",1,1],
 d:"Il ponte levatoio vittoriano si attraversa a piedi, con la Torre di Londra sul lato nord e la vista sullo Shard e sul Tamigi. Le inquadrature migliori sono dal lungofiume di Potters Fields, sulla riva sud.",
 m:"Attraversare il ponte è gratis. La Tower Bridge Exhibition (passerelle in alto con il pavimento di vetro e la sala macchine) costa 18 £ (circa 21 €), aperta tutti i giorni 9:30–18:00 (ultimo ingresso 17:00)."}
};
/* tappe in più per i viaggi di più giorni */
Object.assign(STOPS,{
abbeyins:{t:"Abbazia di Westminster e Big Ben",z:"A",p:1,min:70,id:90,max:120,pos:[51.4993,-0.1273],q:"Westminster Abbey, London",cls:"",multi:1,cl:[6],tk:[38,"Abbazia di Westminster (32 £)"],
 win:function(wd){return wd===5?[9*60,13*60]:[9*60+30,15*60+30]},
 d:"L'Abbazia dove si incoronano i re inglesi dal 1066: la tomba di Elisabetta I, l'Angolo dei Poeti e i chiostri. Fuori, il Palazzo di Westminster con la torre del Big Ben e il Westminster Bridge.",
 m:"Biglietto 32 £ (circa 38 €), meglio online. Aperta dal lunedì al sabato (giorni feriali 9:30–15:30, sabato 9:00–13:00), chiusa ai turisti la domenica. Dentro non si fotografa e serve un abbigliamento decoroso."},
stpaulins:{t:"Cattedrale di St Paul",z:"D",p:1,min:70,id:95,max:130,pos:[51.5138,-0.0984],q:"St Paul's Cathedral, London",cls:"",multi:1,cl:[6],tk:[32,"Cattedrale di St Paul (27 £)"],
 win:function(){return[8*60+30,16*60+30]},
 d:"La cattedrale di Wren con la cupola da 111 metri: la Whispering Gallery, dove un sussurro si sente dall'altra parte, la cripta con le tombe di Nelson e Wellington e, per chi ha gambe, la salita alla Golden Gallery per il panorama.",
 m:"Biglietto 27 £ (circa 32 €), meglio online: aperta dal lunedì al sabato 8:30–16:30 (ultimo ingresso 16:00; la cupola dalle 9:30), chiusa alle visite la domenica. Dentro non si fotografa."},
toweroflondon:{t:"Torre di Londra",z:"D",p:1,min:120,id:150,max:200,pos:[51.5081,-0.0759],q:"Tower of London, London",cls:"",multi:1,tk:[45,"Torre di Londra (38 £)"],
 win:function(wd,d){var cl=d>="2026-11-01"?16*60+30:17*60+30,op=(wd===0||wd===6)?10*60:9*60;return[op,cl]},
 d:"La fortezza di Guglielmo il Conquistatore: i gioielli della Corona, la Torre Bianca con le armature, le mura con la vista sul fiume e la visita guidata dei Yeoman Warders (i «Beefeaters»), compresa nel biglietto.",
 m:"Biglietto 38 £ (circa 45 €), meglio online. In ottobre aperta 9–17:30 (lunedì e domenica dalle 10), ultimo ingresso 16:30, ultima visita guidata alle 15:15; da novembre di solito chiude prima, intorno alle 16:30."},
british:{t:"British Museum",z:"C",p:1,min:100,id:150,max:210,pos:[51.5194,-0.1270],q:"British Museum, London",cls:"",multi:1,
 win:function(wd){return[10*60,wd===4?20*60+30:17*60]},
 d:"La Stele di Rosetta, i marmi del Partenone, le mummie egizie e la Grande Corte coperta di vetro: due ore bastano per i capolavori, per vederlo tutto servirebbero giorni.",
 m:"Ingresso gratuito alla collezione permanente (prenotare un ingresso gratis è consigliato). Aperto tutti i giorni 10–17, il venerdì fino alle 20:30; ultimo ingresso 45 minuti prima. Le mostre temporanee si pagano a parte."},
museums:{t:"South Kensington: Storia Naturale e V&A",z:"F",p:2,min:120,id:170,max:240,pos:[51.4966,-0.1764],q:"Natural History Museum, London",cls:"",multi:1,
 win:function(){return[10*60,17*60+45]},
 d:"Il Museo di Storia Naturale, in un palazzo in stile romanico con lo scheletro di balenottera nella grande sala d'ingresso, e di fronte il Victoria and Albert Museum, con arti decorative, moda e gioielli da tutto il mondo.",
 m:"Entrambi gratuiti. Storia Naturale 10–17:50 (ultimo ingresso 17:30); V&A 10–17:45, il venerdì fino alle 22. Con poco tempo scegline uno solo."},
kensington:{t:"Hyde Park e Kensington Palace",z:"F",p:4,min:50,id:80,max:130,pos:[51.5053,-0.1877],q:"Kensington Palace, London",cls:"walk",multi:1,sun:1,tk:[29,"Kensington Palace (24,70 £)",1,1],
 d:"Una passeggiata nel grande parco del centro: il laghetto Serpentine, i Kensington Gardens, il giardino ribassato e la facciata del palazzo dove ha vissuto Diana.",
 m:"I parchi sono gratis, aperti dalle 5 a mezzanotte. Il palazzo costa 24,70 £ (circa 29 €), con orari e giorni di apertura variabili (di solito 10–18, ultimo ingresso 17:00); gli Appartamenti della Regina sono chiusi fino alla primavera 2027. Controlla il calendario sul sito prima di comprare."},
notting:{t:"Notting Hill e Portobello Road",z:"F",p:5,min:45,id:75,max:110,pos:[51.5152,-0.2050],q:"Portobello Road, London",cls:"walk",multi:1,
 d:"Le case color pastello di Notting Hill, le stradine intorno a Lancaster Road e Portobello Road, con le bancarelle di antiquariato, i negozi vintage e le facciate colorate.",
 m:"Il giorno più vivo è il sabato, con il mercato dell'antiquariato aperto tutto il giorno; negli altri giorni le bancarelle sono meno e molti negozi chiudono presto."},
camden:{t:"Camden Town e Primrose Hill",z:"G",p:5,min:60,id:100,max:150,pos:[51.5413,-0.1466],q:"Camden Lock Market, London",cls:"walk",multi:1,sun:1,
 d:"I mercati di Camden Lock e Stables, il canale con le chiuse e i negozi alternativi, poi lungo il Regent's Canal fino a Primrose Hill, la collina con la vista sullo skyline di Londra.",
 m:"I mercati sono aperti tutti i giorni, di solito fino alle 18, e nel weekend sono molto affollati. A Primrose Hill si sale gratis e il panorama è più bello al tramonto."},
eastend:{t:"Brick Lane, Spitalfields e Shoreditch",z:"E",p:5,min:60,id:90,max:130,pos:[51.5215,-0.0715],q:"Brick Lane, London",cls:"walk",multi:1,
 d:"Brick Lane con i murales e i locali di curry, il mercato coperto di Old Spitalfields e le strade di Shoreditch piene di street art.",
 m:"La domenica c'è il mercato di Brick Lane (circa 10–17); Old Spitalfields è aperto anche negli altri giorni, con orari variabili. La panetteria Beigel Bake, aperta 24 ore su 24, è la tappa classica."},
greenwich:{t:"Greenwich: Osservatorio e Cutty Sark",z:"H",p:4,min:120,id:170,max:220,pos:[51.4769,-0.0005],q:"Royal Observatory Greenwich, London",cls:"",multi:1,sun:1,
 win:function(){return[10*60,17*60]},
 d:"Il villaggio sul Tamigi con il veliero Cutty Sark, il mercato coperto, la Queen's House e, in cima alla collina di Greenwich Park, il Royal Observatory, dove passa il meridiano zero.",
 m:"Il parco, il mercato (tutti i giorni circa 10–17:30) e la Queen's House sono gratis; l'Osservatorio e la Cutty Sark hanno un biglietto (controlla i prezzi sul sito). Si arriva col battello Thames Clipper (30–40 minuti da Westminster) o con la DLR fino a Cutty Sark."},
eye:{t:"London Eye",z:"A",p:6,min:40,id:45,max:60,pos:[51.5033,-0.1195],q:"London Eye, London",cls:"",multi:1,tk:[34,"London Eye (29 £, online)",1,1],
 win:function(){return[10*60,20*60+30]},
 d:"La ruota panoramica sulla riva sud del Tamigi, con la vista sul Big Ben e sul Parlamento. Un giro dura circa 30 minuti.",
 m:"Biglietto da circa 29 £ (34 €) online, 39 £ (46 €) in biglietteria: meglio prenotare l'orario. Aperta circa 10–20:30."}
});
/* collegamenti tra le tappe */
var LEGS={
"start>covent":{min:12,mode:"walk",txt:"A piedi da Tottenham Court Road attraverso Soho fino a Covent Garden, circa 12 minuti.",g:[W([[51.5165,-0.1309],[51.5139,-0.1305],[51.5125,-0.1270],[51.5117,-0.1240]])]},
"covent>trafalgar":{min:12,mode:"walk",txt:"A piedi per St Martin's Lane fino a Trafalgar Square, circa 12 minuti.",g:[W([[51.5117,-0.1240],[51.5105,-0.1260],[51.5090,-0.1270],[51.5080,-0.1281]])]},
"trafalgar>westminster":{min:15,mode:"walk",txt:"A piedi lungo Whitehall, con le Horse Guards e Downing Street, fino al Big Ben, circa 15 minuti.",g:[W([[51.5080,-0.1281],[51.5040,-0.1260],[51.5020,-0.1255],[51.5007,-0.1246]])]},
"westminster>buckingham":{min:18,mode:"walk",txt:"A piedi attraverso il St James's Park fino ai cancelli del palazzo, circa 18 minuti.",g:[W([[51.5007,-0.1246],[51.4999,-0.1300],[51.5018,-0.1360],[51.5014,-0.1419]])]},
"abbeyins>buckingham":{min:18,mode:"walk",txt:"A piedi attraverso il St James's Park fino ai cancelli del palazzo, circa 18 minuti.",g:[W([[51.4993,-0.1273],[51.4999,-0.1300],[51.5018,-0.1360],[51.5014,-0.1419]])]},
"buckingham>trafalgar":{min:18,mode:"walk",txt:"A piedi lungo The Mall, il viale rosso, fino a Trafalgar Square, circa 18 minuti.",g:[W([[51.5014,-0.1419],[51.5047,-0.1340],[51.5065,-0.1300],[51.5080,-0.1281]])]},
"buckingham>stpaul":{min:35,mode:"metro",txt:"Dalla stazione di St James's Park prendi la District o la Circle line fino a Mansion House (circa 15 minuti), poi 8 minuti a piedi fino alla cattedrale: circa 35 minuti in tutto.",g:[W([[51.5014,-0.1419],[51.5000,-0.1380],[51.4994,-0.1335]]),["cir","St James's Park","Mansion House"],W([[51.5122,-0.0940],[51.5130,-0.0960],[51.5138,-0.0984]])]},
"stpaul>towerbridge":{min:30,mode:"walk",txt:"A piedi per Cannon Street e Eastcheap fino alla Torre di Londra e a Tower Bridge, circa 30 minuti.",g:[W([[51.5138,-0.0984],[51.5113,-0.0904],[51.5108,-0.0863],[51.5098,-0.0766],[51.5055,-0.0754]])]},
"stpaul>borough":{min:22,mode:"walk",txt:"A piedi attraverso il Millennium Bridge e lungo il fiume fino a Borough Market, circa 22 minuti.",g:[W([[51.5138,-0.0984],[51.5096,-0.0988],[51.5076,-0.0994],[51.5062,-0.0925],[51.5055,-0.0910]])]},
"trafalgar>buckingham":{min:18,mode:"walk",txt:"A piedi lungo The Mall, il viale rosso, fino ai cancelli del palazzo, circa 18 minuti.",g:[W([[51.5080,-0.1281],[51.5065,-0.1300],[51.5047,-0.1340],[51.5014,-0.1419]])]},
"start>trafalgar":{min:15,mode:"walk",txt:"A piedi per Charing Cross Road e Leicester Square fino a Trafalgar Square, circa 15 minuti.",g:[W([[51.5165,-0.1309],[51.5140,-0.1300],[51.5113,-0.1281],[51.5080,-0.1281]])]},
"westminster>stpaul":{min:30,mode:"metro",txt:"Dalla stazione di Westminster prendi la District o la Circle line fino a Mansion House (circa 18 minuti), poi 8 minuti a piedi fino alla cattedrale: circa 30 minuti in tutto.",g:[W([[51.5007,-0.1246],[51.5010,-0.1254]]),["cir","Westminster","Mansion House"],W([[51.5122,-0.0940],[51.5130,-0.0960],[51.5138,-0.0984]])]},
"stpaul>southbank":{min:8,mode:"walk",txt:"A piedi attraverso il Millennium Bridge fino alla Tate Modern, circa 8 minuti.",g:[W([[51.5138,-0.0984],[51.5123,-0.0985],[51.5096,-0.0988],[51.5076,-0.0994]])]},
"stpaulins>southbank":{min:8,mode:"walk",txt:"A piedi attraverso il Millennium Bridge fino alla Tate Modern, circa 8 minuti.",g:[W([[51.5138,-0.0984],[51.5123,-0.0985],[51.5096,-0.0988],[51.5076,-0.0994]])]},
"southbank>borough":{min:15,mode:"walk",txt:"A piedi lungo il Tamigi (Thames Path) fino a Borough Market, circa 15 minuti.",g:[W([[51.5076,-0.0994],[51.5072,-0.0955],[51.5062,-0.0925],[51.5055,-0.0910]])]},
"borough>towerbridge":{min:18,mode:"walk",txt:"A piedi lungo il fiume e Shad Thames fino a Tower Bridge, circa 18 minuti.",g:[W([[51.5055,-0.0910],[51.5052,-0.0860],[51.5048,-0.0800],[51.5055,-0.0754]])]},
"towerbridge>toweroflondon":{min:8,mode:"walk",txt:"A piedi attraverso il ponte fino all'ingresso della Torre di Londra, circa 8 minuti.",g:[W([[51.5055,-0.0754],[51.5072,-0.0760],[51.5081,-0.0759]])]},
"toweroflondon>towerbridge":{min:8,mode:"walk",txt:"A piedi attraverso il ponte, circa 8 minuti.",g:[W([[51.5081,-0.0759],[51.5072,-0.0760],[51.5055,-0.0754]])]},
"towerbridge>eastend":{min:25,mode:"walk",txt:"A piedi per Aldgate e Middlesex Street fino a Spitalfields, circa 25 minuti.",g:[W([[51.5055,-0.0754],[51.5120,-0.0750],[51.5180,-0.0760],[51.5215,-0.0715]])]},
"towerbridge>start":{min:35,mode:"metro",txt:"A piedi fino a Tower Hill (5 minuti), District o Circle line fino a Embankment e Northern line fino a Tottenham Court Road: circa 35 minuti.",g:[W([[51.5055,-0.0754],[51.5080,-0.0760],[51.5098,-0.0766]]),["cir","Tower Hill","Embankment"],["nor","Embankment","Tottenham Court Road"]]},
"toweroflondon>start":{min:32,mode:"metro",txt:"A piedi fino a Tower Hill (3 minuti), District o Circle line fino a Embankment e Northern line fino a Tottenham Court Road: circa 32 minuti.",g:[W([[51.5081,-0.0759],[51.5098,-0.0766]]),["cir","Tower Hill","Embankment"],["nor","Embankment","Tottenham Court Road"]]},
"borough>start":{min:25,mode:"metro",txt:"Northern line da London Bridge a Bank (1 fermata), poi Central line fino a Tottenham Court Road: circa 25 minuti.",g:[W([[51.5055,-0.0910],[51.5052,-0.0864]]),{w:[[51.5052,-0.0864],[51.5133,-0.0886]],dash:1},["cen","Bank","Tottenham Court Road"]]},
"stpaul>start":{min:15,mode:"metro",txt:"Central line da St Paul's a Tottenham Court Road (4 fermate), circa 15 minuti.",g:[["cen","St Paul's","Tottenham Court Road"]]},
"stpaulins>start":{min:15,mode:"metro",txt:"Central line da St Paul's a Tottenham Court Road (4 fermate), circa 15 minuti.",g:[["cen","St Paul's","Tottenham Court Road"]]},
"trafalgar>start":{min:15,mode:"walk",txt:"A piedi per Charing Cross Road e Leicester Square fino a Tottenham Court Road, circa 15 minuti.",g:[W([[51.5080,-0.1281],[51.5113,-0.1281],[51.5140,-0.1300],[51.5165,-0.1309]])]},
"covent>start":{min:10,mode:"walk",txt:"A piedi per Shaftesbury Avenue o Soho fino a Tottenham Court Road, circa 10 minuti.",g:[W([[51.5117,-0.1240],[51.5125,-0.1270],[51.5139,-0.1305],[51.5165,-0.1309]])]},
"westminster>start":{min:20,mode:"metro",txt:"District o Circle line da Westminster a Embankment, poi Northern line fino a Tottenham Court Road: circa 20 minuti.",g:[["cir","Westminster","Embankment"],["nor","Embankment","Tottenham Court Road"]]},
"buckingham>start":{min:25,mode:"metro",txt:"A piedi fino a Green Park (10 minuti), Piccadilly line fino a Leicester Square (2 fermate) e 5 minuti a piedi fino a Tottenham Court Road: circa 25 minuti.",g:[W([[51.5014,-0.1419],[51.5040,-0.1425],[51.5067,-0.1428]]),["pic","Green Park","Leicester Square"],W([[51.5113,-0.1281],[51.5140,-0.1300],[51.5165,-0.1309]])]}
};
/* ritorno in aeroporto (le altre tappe passano da Tottenham Court Road) */
var RET={
LHR:{
 A:{min:60,txt:"Elizabeth line da Tottenham Court Road all'aeroporto di Heathrow (circa 35–40 minuti, senza cambi): controlla il display del treno, perché alcuni fermano a Terminal 2 e 3, altri proseguono per il 4 o il 5 (il 5 ha meno corse).",g:[["eliz","Tottenham Court Road","Heathrow Terminals 2 & 3"]]}},
LGW:{
 A:{min:85,txt:"Elizabeth line da Tottenham Court Road a Farringdon (1 fermata), poi Thameslink verso sud fino a Gatwick Airport (circa 40 minuti, con un treno ogni pochi minuti): scegli un treno che ferma a Gatwick.",g:[["eliz","Tottenham Court Road","Farringdon"],["thS","Farringdon","Gatwick Airport"]]}},
STN:{
 A:{min:90,txt:"Elizabeth line da Tottenham Court Road a Liverpool Street (2 fermate), poi Stansted Express fino all'aeroporto (circa 50 minuti, un treno ogni 15 minuti). Controlla l'ultimo treno della sera.",g:[["eliz","Tottenham Court Road","Liverpool Street"],["stn","Liverpool Street","Stansted Airport"]]}},
LTN:{
 A:{min:95,txt:"Elizabeth line da Tottenham Court Road a Farringdon (1 fermata), poi Thameslink per Luton Airport Parkway (circa 40 minuti) e la navetta DART di 4 minuti fino al terminal.",g:[["eliz","Tottenham Court Road","Farringdon"],["thN","Farringdon","Aeroporto di Luton"]]}},
LCY:{
 A:{min:55,txt:"Central line da Tottenham Court Road a Bank (4 fermate), poi DLR fino a London City Airport (circa 22 minuti): cambio facile, nella stessa stazione.",g:[["cen","Tottenham Court Road","Bank"],["dlr","Bank","London City Airport"]]}}
};
var ARR={
LHR:[["eliz","Heathrow Terminals 2 & 3","Tottenham Court Road"]],
LGW:[["thS","Gatwick Airport","Farringdon"],["eliz","Farringdon","Tottenham Court Road"]],
STN:[["stn","Stansted Airport","Liverpool Street"],["eliz","Liverpool Street","Tottenham Court Road"]],
LTN:[["thN","Aeroporto di Luton","Farringdon"],["eliz","Farringdon","Tottenham Court Road"]],
LCY:[["dlr","London City Airport","Bank"],["cen","Bank","Tottenham Court Road"]]
};
/* locali: h = orari lun→dom (Google Maps e siti dei locali, ottobre 2026); "" = chiuso */
var V={
regency:{n:"Regency Cafe",a:"17-19 Regency Street",z:"A",r:"4,7",pos:[51.49421,-0.13227],h:["07:00-15:30","07:00-15:30","07:00-15:30","07:00-15:30","07:00-15:30","07:00-15:30",""],
 d:"Storico caffè di Pimlico con le piastrelle bianche e verdi: colazioni inglesi complete, toast e tè serviti in fretta e senza fronzoli. Si ordina al bancone e si mangia ai tavoli stretti.",pr:"Una colazione completa con il tè resta in genere sotto i 12 € (listino non visto)."},
rocksole:{n:"Rock & Sole Plaice",a:"47 Endell Street",z:"B",r:"4,3",pos:[51.51482,-0.12513],h:["12:00-21:00","12:00-21:00","12:00-21:00","12:00-21:00","12:00-22:00","12:00-22:00","12:00-20:00"],
 d:"Il fish and chips di Covent Garden, in una via laterale: pesce fritto in pastella croccante con patatine, da mangiare ai tavoli o da portare via. Le porzioni sono abbondanti: si può dividere.",pr:"Un piatto di pesce e patatine costa di solito 15–20 €; da portare via è più economico (listino non visto)."},
monmouthcg:{n:"Monmouth Coffee Company (Covent Garden)",a:"27 Monmouth Street",z:"B",r:"4,5",pos:[51.51439,-0.12680],h:["08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00",""],
 d:"Torrefazione artigianale a due passi da Seven Dials: caffè filtrato e cappuccini, pane e dolci appena sfornati. Si ordina in coda e si beve in piedi o ai tavoli comuni.",pr:"Caffè e dolce restano sotto i 9 € (listino non visto)."},
bertaux:{n:"Maison Bertaux",a:"28 Greek Street",z:"B",r:"4,3",pos:[51.51334,-0.13021],h:D7("09:30-18:00"),
 d:"Pasticceria francese di Soho, aperta dal 1871: éclair, torte alla frutta e croissant sui tavolini piccoli al piano di sopra, in un salottino un po' vintage.",pr:"Un dolce con il tè resta sotto i 9 € (listino non visto)."},
bunhouse:{n:"Bun House Chinatown",a:"26-27 Lisle Street",z:"B",r:"4,5",pos:[51.51176,-0.12986],h:D7("12:00-21:00"),
 d:"Panini cinesi al vapore (bao) con ripieno di maiale, pollo o uova salate, nel cuore di Chinatown: il pasto veloce ed economico di Soho.",pr:"Due o tre bao con un tè restano intorno ai 10–12 € (listino non visto)."},
lanzhou:{n:"Lanzhou Lamian Noodle Bar",a:"33 Cranbourn Street",z:"B",r:"4,2",pos:[51.51149,-0.12780],h:["10:00-02:00","10:00-02:00","10:00-02:00","10:00-02:00","10:00-05:00","10:00-05:00","10:00-22:00"],
 d:"Noodles di grano tirati a mano davanti a te, in brodo o saltati, in una sala semplice vicino a Leicester Square; aperto fino a tardi.",pr:"Una ciotola costa circa 10–13 € (listino non visto)."},
tongue:{n:"Tongue & Brisket",a:"199 Wardour Street",z:"B",r:"4,6",pos:[51.51562,-0.13582],h:["08:30-20:00","08:30-20:00","08:30-20:00","08:30-20:00","08:30-20:00","11:00-20:00","11:00-18:30"],
 d:"Sandwich di manzo in salamoia e pastrami in stile newyorkese, serviti caldi in una sala piccola di Soho. Se mangi al tavolo si paga 1 £ in più.",pr:"Un panino costa circa 10–13 € (listino non visto)."},
leverbloom:{n:"Lever & Bloom",a:"222 Shaftesbury Avenue",z:"B",r:"4,9",pos:[51.51652,-0.12604],h:["08:30-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:30-18:00","08:30-18:00"],
 d:"Panetteria di quartiere con cornetti, rotoli alla cannella e pane a lievitazione naturale, da portare via: dentro non ci sono tavoli.",pr:"Un cornetto e un caffè restano sotto i 8 € (listino non visto)."},
bloomscoffee:{n:"Bloomsbury Coffee",a:"40 Bloomsbury Way",z:"C",r:"4,8",pos:[51.51746,-0.12488],h:["07:30-17:00","07:30-17:00","07:30-17:00","07:30-17:00","07:30-17:00","07:30-18:00","07:30-17:00"],
 d:"Caffè di specialità a due passi dal British Museum, con pasticceria e toast: comodo per una colazione tranquilla prima del museo.",pr:"Caffè e dolce restano sotto i 9 € (listino non visto)."},
victoriahouse:{n:"Victoria House Coffee & Food",a:"5 Coptic Street",z:"C",r:"4,8",pos:[51.51742,-0.12639],h:D7("08:00-16:00"),
 d:"Caffè e cucina di quartiere di fronte al British Museum, per colazioni e pranzi leggeri in una sala luminosa.",pr:"Colazione o panino restano sotto i 12 € (listino non visto)."},
italiauno:{n:"Italia Uno",a:"91 Charlotte Street",z:"C",r:"4,7",pos:[51.52053,-0.13703],h:D7("10:00-22:00"),
 d:"Pizzeria e cucina italiana di Fitzrovia, a dieci minuti da Tottenham Court Road: pizza tonda e primi semplici, per una cena che sa di casa.",pr:"Una pizza costa circa 12–15 € (listino non visto)."},
padella:{n:"Padella",a:"6 Southwark Street",z:"D",r:"4,7",pos:[51.50517,-0.08992],h:["11:30-15:45,17:00-22:30","11:30-15:45,17:00-22:30","11:30-15:45,17:00-22:30","11:30-15:45,17:00-22:30","11:30-15:45,17:00-22:30","11:30-15:45,17:00-22:30","11:30-15:45,17:00-21:00"],
 d:"Pasta fresca fatta a mano ogni giorno, in porzioni piccole ed economiche, accanto a Borough Market. Non si prenota: ci si mette in coda (o in lista virtuale) e si mangia al bancone.",pr:"Una pasta fresca costa di solito sotto i 15 € (listino non visto)."},
kappa:{n:"Kappacasein",a:"1 Stoney Street",z:"D",r:"4,5",pos:[51.50500,-0.09077],h:["","","","10:00-17:00","10:00-17:00","09:00-17:00",""],
 d:"Bancarella di Borough Market famosa per il toastie di formaggio raclette e cipolla: un panino croccante e filante da mangiare in piedi. Aperta solo da giovedì a sabato.",pr:"Il toastie costa circa 8 £ (9–10 €)."},
manze:{n:"M. Manze",a:"87 Tower Bridge Road",z:"D",r:"4,6",pos:[51.49629,-0.08277],h:["10:30-17:45","10:30-17:45","10:30-17:45","10:30-17:45","10:00-18:45","10:00-19:45","11:00-14:45"],
 d:"Il pie and mash, un classico londinese da più di un secolo: torta di carne con purè e liquor (la salsa verde al prezzemolo), nel locale piastrellato di Bermondsey.",pr:"Pie, purè e liquor restano intorno ai 10 € (listino non visto)."},
monmouthb:{n:"Monmouth Coffee Company (Borough)",a:"2 Park Street",z:"D",r:"4,5",pos:[51.50553,-0.09141],h:["07:30-18:00","07:30-18:00","07:30-18:00","07:30-18:00","07:30-18:00","07:30-18:00",""],
 d:"La sede accanto a Borough Market: caffè filtrato, pane e dolci appena sfornati. Si beve in piedi o ai tavoli comuni; da Monmouth c'è una cauzione di 5 £ per le tazze riutilizzabili, restituita quando la riporti.",pr:"Un caffè e un dolce restano sotto i 9 € (un latte costa circa 4,20 £)."},
beigel:{n:"Beigel Bake",a:"159 Brick Lane",z:"E",r:"4,4",pos:[51.52450,-0.07176],h:D7("00:00-23:59"),
 d:"Panetteria aperta 24 ore su 24 a Brick Lane: bagel caldi con manzo in salamoia e senape, o con salmone e crema di formaggio, da mangiare per strada.",pr:"Un bagel con il manzo costa circa 7–9 € (listino non visto)."},
pellicci:{n:"E. Pellicci",a:"332 Bethnal Green Road",z:"E",r:"4,8",pos:[51.52648,-0.06343],h:["08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00","08:00-15:00",""],
 d:"Storico caffè italiano-londinese di famiglia, con gli interni Art Déco in legno: colazioni inglesi, panini e piatti semplici in una sala piccola e rumorosa.",pr:"Colazione completa sotto i 12 € (listino non visto)."},
sipandrise:{n:"Sip & Rise Café & Bakery",a:"73 Kensington Church Street",z:"F",r:"4,8",pos:[51.50463,-0.19373],h:["07:30-17:30","07:30-17:30","07:30-17:30","07:30-17:30","07:30-18:00","07:30-18:00","07:30-18:00"],
 d:"Caffè e panetteria di Kensington con cornetti, pane e dolci fatti in casa, e tavolini per fermarsi.",pr:"Colazione sotto i 10 € (listino non visto)."},
kenterrace:{n:"Kensington Terrace Cafe",a:"15-16 Prince of Wales Terrace",z:"F",r:"4,7",pos:[51.50123,-0.18602],h:["07:00-14:00","07:00-14:00","07:00-14:00","07:00-14:00","07:00-15:00","07:00-15:00","07:00-15:00"],
 d:"Caffè all'ingresso dei Kensington Gardens: colazioni e panini a due passi dal parco e dal palazzo.",pr:"Colazione o panino sotto i 12 € (listino non visto)."},
churchill:{n:"The Churchill Arms",a:"119 Kensington Church Street",z:"F",r:"4,5",pos:[51.50691,-0.19480],h:["11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","11:00-23:00","12:00-22:30"],
 d:"Il pub più fotografato di Londra, coperto di fiori all'esterno, con un ristorante thailandese nella sala sul retro: curry e noodles a prezzi da pub. La cucina può chiudere prima del bancone: arriva presto.",pr:"Un piatto thai costa di solito 12–15 € (listino non visto)."},
truly:{n:"Truly Scrumptious Cafe",a:"67-68 Chalk Farm Road",z:"G",r:"4,4",pos:[51.54337,-0.15053],h:D7("07:00-21:00"),
 d:"Caffè accanto a Camden Lock con colazioni inglesi, panini e burger a prezzi onesti, aperto dal mattino alla sera.",pr:"La colazione completa costa 9,90 £ (circa 12 €)."},
fields:{n:"The Fields Beneath",a:"52a Prince of Wales Road",z:"G",r:"4,6",pos:[51.54654,-0.14667],h:["07:30-16:00","07:30-16:00","07:30-16:00","07:30-16:00","07:30-16:00","08:00-17:00","09:00-17:00"],
 d:"Caffè vegano di Kentish Town, con panini, dolci e un buon caffè: va bene anche per chi non è vegano.",pr:"Colazione o panino sotto i 12 € (listino non visto)."},
pedro:{n:"Pedro's Cafe",a:"165 Kentish Town Road",z:"G",r:"4,6",pos:[51.54585,-0.14191],h:["07:00-17:00","07:00-17:00","07:00-17:00","07:00-17:00","07:00-17:00","07:00-17:00","08:00-17:00"],
 d:"Caffè di quartiere con colazioni, toast e panini preparati al momento, frequentato dai residenti.",pr:"Colazione o panino sotto i 10 € (listino non visto)."},
goddards:{n:"Goddards at Greenwich",a:"22 King William Walk",z:"H",r:"4,6",pos:[51.48140,-0.00837],h:["10:00-19:30","10:00-19:30","10:00-19:30","10:00-19:30","10:00-20:00","10:00-20:00","10:00-19:30"],
 d:"Pie and mash a Greenwich da oltre un secolo: pasticcio di carne con purè e liquor, a due passi dal mercato.",pr:"Un piatto resta intorno ai 10–12 € (listino non visto)."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["regency","bloomscoffee"],B:["monmouthcg","leverbloom","bertaux"],C:["bloomscoffee","victoriahouse"],D:["monmouthb","kappa"],E:["pellicci","beigel"],F:["kenterrace","sipandrise"],G:["pedro","fields","truly"],H:["goddards"]},
pra:{A:["regency","tongue"],B:["tongue","bunhouse","rocksole","lanzhou"],C:["victoriahouse","italiauno"],D:["manze","padella","kappa"],E:["pellicci","beigel"],F:["churchill","kenterrace"],G:["truly","pedro","fields"],H:["goddards"]},
cen:{A:["tongue","bunhouse","rocksole"],B:["bunhouse","rocksole","lanzhou","tongue"],C:["italiauno"],D:["padella","manze"],E:["beigel"],F:["churchill"],G:["truly"],H:["goddards"]},
snk:{A:["bertaux","monmouthcg"],B:["bertaux","leverbloom","monmouthcg"],C:["victoriahouse","bloomscoffee"],D:["monmouthb","kappa","manze"],E:["beigel","pellicci"],F:["sipandrise","kenterrace"],G:["fields","pedro","truly"],H:["goddards"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"westminster",t:"Westminster, Buckingham Palace e Trafalgar Square",acts:["abbeyins","westminster","buckingham","trafalgar","eye"],need:320,core:1},
{id:"city",t:"St Paul, South Bank e Borough Market",acts:["stpaulins","stpaul","southbank","borough"],need:260,core:1},
{id:"tower",t:"Torre di Londra, Tower Bridge e East End",acts:["toweroflondon","towerbridge","eastend"],need:340,core:1},
{id:"british",t:"British Museum, Covent Garden e Soho",acts:["british","covent"],need:250,core:1},
{id:"kensington",t:"South Kensington e Hyde Park",acts:["museums","kensington"],need:290},
{id:"camden",t:"Notting Hill e Camden",acts:["notting","camden"],need:230},
{id:"greenwich",t:"Greenwich",acts:["greenwich"],need:200}
];
var ORDER=["abbeyins","westminster","buckingham","trafalgar","british","covent","eye","stpaulins","stpaul","southbank","borough","toweroflondon","towerbridge","eastend","museums","kensington","notting","camden","greenwich"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["covent","Covent Garden / Soho",[51.5125,-0.1275],"B"],
["bloomsbury","Bloomsbury / Fitzrovia",[51.5195,-0.1310],"C"],
["kingscross","King's Cross / St Pancras",[51.5308,-0.1238],"C"],
["westminster","Westminster / Victoria",[51.4975,-0.1357],"A"],
["southbank","South Bank / London Bridge",[51.5040,-0.0890],"D"],
["tower","Tower Hill / Bermondsey",[51.5070,-0.0780],"D"],
["shoreditch","Shoreditch / Brick Lane",[51.5240,-0.0780],"E"],
["kensington","South Kensington / Earl's Court",[51.4950,-0.1800],"F"],
["notting","Notting Hill / Paddington",[51.5150,-0.1900],"F"],
["camden","Camden / Regent's Park",[51.5390,-0.1430],"G"],
["greenwich","Greenwich",[51.4826,-0.0077],"H"],
["altro","Altra zona (scrivi l'indirizzo)",[51.5074,-0.1278],""]
];
/* a Londra non c'è imposta di soggiorno */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Flat white o tè con latte","il caffè all'inglese; il tè nero è forte e si beve con un goccio di latte."],["Full English breakfast","uova, bacon, salsiccia, fagioli, funghi e toast: sazia fino a sera."],["Un dolce di forno","scone con burro e marmellata, cinnamon roll o un bagel."]],
pra:[["Pie and mash","torta di carne con purè e salsa verde al prezzemolo, il piatto della Londra operaia."],["Fish and chips","pesce fritto in pastella con patatine: porzioni abbondanti, da dividere."],["Bao o noodles","Chinatown è la scelta economica del centro."],["Un sandwich","di pastrami o manzo, a Soho e a Camden, sostanziosi."]],
cen:[["Pasta fresca","a Borough le porzioni sono piccole e costano poco."],["Un curry o dei noodles","nei locali di quartiere, a prezzi da pub."],["Fish and chips","a cena nelle vie secondarie di Covent Garden."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Big Ben dal Westminster Bridge","Foto","La torre dell'orologio con il Palazzo di Westminster: dal ponte si inquadra intera, con un bus rosso in primo piano.",[51.5009,-0.1226],"Westminster Bridge, London","westminster"],
["🤳","Selfie in Parliament Square","Selfie","Con la statua di Churchill e la torre alle spalle: meglio al mattino presto, quando la piazza è vuota.",[51.5005,-0.1265],"Parliament Square, London","westminster"],
["📷","Buckingham Palace dal Victoria Memorial","Foto","Il palazzo e i cancelli dorati, con il cambio della guardia (lunedì, mercoledì e venerdì alle 11:00).",[51.5019,-0.1409],"Victoria Memorial, London","buckingham"],
["📷","Trafalgar Square","Foto","La colonna di Nelson e i leoni di bronzo: meglio all'alba o al tramonto.",[51.5080,-0.1281],"Trafalgar Square, London","trafalgar"],
["📷","Covent Garden Piazza","Foto","Le arcate del mercato con gli artisti di strada, nelle ore del mattino.",[51.5123,-0.1223],"Covent Garden Piazza, London","covent"],
["📷","Neal's Yard","Foto","Il cortile di Soho dalle facciate azzurre, rosse e gialle, tra Covent Garden e Seven Dials.",[51.5146,-0.1267],"Neal's Yard, London","covent"],
["📷","St Paul's dal Millennium Bridge","Foto","La cupola in fondo al ponte pedonale: la prospettiva classica, soprattutto al tramonto.",[51.5095,-0.0985],"Millennium Bridge, London","stpaul"],
["📷","Waterloo Bridge al tramonto","Foto","Da qui si vedono insieme St Paul, lo Shard e il Tamigi: la vista più bella sulla città al calar del sole.",[51.5087,-0.1165],"Waterloo Bridge, London","southbank"],
["📷","Tower Bridge da Potters Fields","Foto","Il ponte intero con il Tamigi davanti; al tramonto si accendono le luci.",[51.5035,-0.0780],"Potters Fields Park, London","towerbridge"],
["📷","Torre di Londra e il fossato","Foto","Le mura della fortezza viste dal Tower Hill, con il City alle spalle.",[51.5098,-0.0766],"Tower Hill, London","toweroflondon"],
["📷","Brick Lane e i murales","Foto","Le pareti dipinte e la street art di Shoreditch, da Brick Lane a Hanbury Street.",[51.5225,-0.0715],"Brick Lane, London","eastend"],
["📷","Il pub fiorito Churchill Arms","Foto","La facciata coperta di fiori è la più fotografata di Londra; in dicembre diventa un albero di Natale.",[51.5069,-0.1948],"Churchill Arms Kensington, London","kensington"],
["📷","Le case pastello di Notting Hill","Foto","Portobello Road e le vie intorno a Lancaster Road, con le facciate rosa, azzurre e gialle.",[51.5152,-0.2050],"Portobello Road, London","notting"],
["📷","Camden Lock e il canale","Foto","Le chiuse e le barche sul Regent's Canal, con i mercati sullo sfondo.",[51.5416,-0.1469],"Camden Lock, London","camden"],
["📷","Primrose Hill","Foto","Il panorama sullo skyline di Londra dalla collina, al tramonto.",[51.5395,-0.1608],"Primrose Hill, London","camden"],
["📷","Meridiano zero a Greenwich","Foto","La linea di ottone al Royal Observatory: un piede nell'emisfero est e uno in quello ovest.",[51.4769,-0.0005],"Royal Observatory Greenwich, London","greenwich"],
["📷","Canary Wharf da Greenwich Park","Foto","La Queen's House in primo piano e i grattacieli di Canary Wharf all'orizzonte.",[51.4760,-0.0040],"Greenwich Park, London","greenwich"]
];
/* avvisi verificati il 10 ottobre 2026 */
var AVV=[
{from:"2026-10-10",to:"2027-12-31",t:"ETA obbligatoria per il Regno Unito",x:"Dal 2 aprile 2025 gli italiani devono avere l'autorizzazione elettronica ETA (20 £, circa 24 €, valida 2 anni e collegata al passaporto) prima di partire: si chiede su gov.uk/eta o con l'app ufficiale UK ETA, e di solito la risposta arriva in uno-tre giorni. Alla frontiera serve il passaporto: la carta d'identità non basta."},
{from:"2026-10-10",to:"2026-10-31",t:"Bus a 1,75 £ fino al 31 ottobre",x:"Il biglietto singolo del bus resta a 1,75 £ (circa 2 €) fino al 31 ottobre; dal 1° novembre è previsto a 1,85 £. Il tetto giornaliero dei bus sale da 5,25 £ a 5,55 £."}
];
/* clima medio di Londra (indicativo, massime/minime) */
var CLIM=[[8,3],[9,3],[12,5],[16,7],[19,10],[22,13],[25,15],[24,15],[21,12],[16,9],[11,6],[8,4]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Londra: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="borough"&&WD===0)meta="Il lunedì il mercato è chiuso: restano la cattedrale di Southwark, London Bridge e il lungofiume. Per pranzo meglio Padella, che apre alle 11:30.";
if(it.id==="stpaul"&&WD===6)meta+=" Oggi è domenica: la cattedrale è chiusa alle visite, vedi la facciata e la cupola da fuori.";
if(it.id==="westminster"&&WD===6)meta+=" Oggi è domenica: l'Abbazia non si visita.";
if(it.id==="buckingham"){var g=WD===0||WD===2||WD===4;meta+=g?(it.t<=11*60+15&&it.t+it.d>=11*60?" Oggi è giorno di cambio della guardia: ci sei all'ora giusta, alle 11:00.":" Oggi è giorno di cambio della guardia (alle 11:00), ma con questo programma ci arrivi a un'altra ora: se vuoi vederlo, anticipa questa tappa."):" Oggi non c'è il cambio della guardia (è il lunedì, il mercoledì e il venerdì alle 11:00).";}
return meta}
Object.assign(C,{id:"londra",n:"Londra",cn:"Regno Unito",e:"🎡",flag:"🇬🇧",col:["#14306f","#c8102e","#e0b22e"],k:"londra london uk regno unito inghilterra england",
TZ:"Europe/London",LL:[51.5074,-0.1278],CC:"gb",QN:"London",BK:"London",ARE:/london|londra|\b(?:ec|wc|nw|se|sw|e|n|w)\d{1,2}[a-z]?\s*\d[a-z]{2}\b/i,VER:"10 ottobre 2026",
Z0:"B",LANG:"en-GB",LANGN:"inglese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"GBP",s:"£",e:1.18},hub:{n:"Tottenham Court Road",q:"Tottenham Court Road station, London"},
SINGLE:{acts:["covent","trafalgar","westminster","buckingham","stpaul","southbank","borough","towerbridge"],ins:[]},
EXCL:[["abbeyins","westminster","L'Abbazia e il Big Ben li vedi con calma in un'altra giornata del viaggio: qui rimane la passeggiata sul Westminster Bridge."],["stpaulins","stpaul","La cattedrale la visiti dentro in un'altra giornata del viaggio: qui rimane il Millennium Bridge."]],
DICON:{toweroflondon:"🏰",abbeyins:"👑",stpaulins:"⛪",british:"🏺",museums:"🦕",kensington:"🌳",notting:"🎨",camden:"🎸",greenwich:"🧭"},
ZN:{A:"a Westminster",B:"a Soho e Covent Garden",C:"a Bloomsbury",D:"sul South Bank e a Borough",E:"nell'East End",F:"a Kensington",G:"a Camden",H:"a Greenwich"},
NEAR:{col:"caffè",pra:"pub o caffè",cen:"pub o ristorante",snk:"panetteria"},
SE:{regency:"☕",rocksole:"🐟",monmouthcg:"☕",bertaux:"🍰",bunhouse:"🥟",lanzhou:"🍜",tongue:"🥪",leverbloom:"🥐",bloomscoffee:"☕",victoriahouse:"🥐",italiauno:"🍕",padella:"🍝",kappa:"🧀",manze:"🥧",monmouthb:"☕",beigel:"🥯",pellicci:"🍳",sipandrise:"🥐",kenterrace:"☕",churchill:"🍛",truly:"🍳",fields:"🥪",pedro:"🥪",goddards:"🥧"},
TR:{one:3.5,cap:10.5,lbl:"Metro, DLR e bus (carta contactless)",
 air:{LHR:{one:18.3,n:"Elizabeth line per Heathrow"},LGW:{one:16,n:"Thameslink per Gatwick"},STN:{one:22,n:"Stansted Express"},LTN:{one:21,n:"Navetta e Thameslink per Luton"},LCY:{one:7,n:"DLR per London City"}},
 passes:[],
 note:"Prezzi di ottobre 2026 (1 £ = 1,18 €): una corsa in metro nella zona 1 costa circa 3,10 £ (3,65 €), un bus 1,75 £ (2 €). Con la carta contactless il tetto giornaliero nelle zone 1–2 è di 8,90 £ (10,50 €): non servono abbonamenti. Aeroporto: Elizabeth line per Heathrow 15,50 £, Gatwick e Luton circa 12–18 £, Stansted Express circa 20–25 £ (da 9,90 £ in anticipo), London City con il DLR circa 4 £."},
FOOD:{co:[7,"Colazione al caffè (caffè e dolce)"],pr:[14,"Pranzo (pie, panino o noodles)"],ce:[15,"Cena (pasta, fish and chips o curry)"],sp:[5,"Spuntini e assaggi"]},
T:{doc:"Passaporto valido (la carta d'identità non basta per entrare nel Regno Unito)",ride:"In metro o bus",move:"tutto a piedi o in metro",bags:"«Can I leave my bags here?»",bagsPM:"«Can I leave my bags until this afternoon?»",bagsAM:"«Can I leave my bags until midday?»",
pra:"Un pub o un caffè",praZ:{B:"Intorno a Leicester Square e al Covent Garden Market i locali sono per turisti e costano di più: i posti buoni sono a Chinatown e nelle vie laterali.",D:"A Borough Market si mangia in piedi: prendi un piatto caldo da dividere e siediti sulle panchine lungo il fiume."},
freeLong:"Qualche idea: un parco (Hyde Park o St James's), una passeggiata lungo il Tamigi, una visita gratuita al British Museum o alla National Gallery, un tè in un caffè, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata lungo il Tamigi o in un parco.",
remind:"Se vuoi entrare nella Torre di Londra, a St Paul o all'Abbazia di Westminster, compra prima il biglietto online: costa meno e c'è meno coda.",
rain1:"Al coperto: la National Gallery, la Tate Modern, il British Museum e il Museo di Storia Naturale, tutti gratis.",
rainM:"Al coperto: British Museum, National Gallery, Tate Modern, Storia Naturale, V&A e la Torre di Londra.",
water:"Riempite la borraccia: l'acqua del rubinetto di Londra è potabile e molti caffè e pub (con l'adesivo «Refill») la riempiono gratis. Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Londra si pranza tra le 12 e le 14:30 e si cena presto, dalle 18: molte cucine chiudono alle 21–22, guarda l'orario accanto a ogni locale.",
night:[["🍵","Un tè con latte o una pinta in un pub di quartiere è il modo londinese di chiudere la giornata."],["🕙","Le cucine chiudono presto, spesso alle 21–22; la metro va fino a mezzanotte circa (venerdì e sabato tutta la notte su alcune linee)."],["☕","Molti caffè aprono alle 7:30: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Londra è un'ora indietro rispetto all'Italia",
plug:"Adattatore per la spina britannica (tipo G, tre poli piatti) e caricabatterie",
foodNote:"I pasti sono stime per locali di quartiere: colazione e cena restano intorno ai 15 € a persona, ma a Londra i prezzi sono più alti. Le sterline sono convertite a 1 £ = 1,18 €.",
taxNote:"A Londra non si paga la tassa di soggiorno.",
mcrit:"Criteri: almeno 4 stelle su Google, caffè, panetterie, pub e locali di quartiere, niente catene. Colazione e cena restano intorno o sotto i 15 € a persona (a Londra i prezzi sono più alti, il pranzo può costare di più). Valutazioni e orari da Google Maps e dai siti dei locali (ottobre 2026), prezzi indicativi: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["L'ETA è collegata al passaporto: viaggia con lo stesso passaporto usato per la richiesta. Al controllo di frontiera la coda può durare da pochi minuti a un'ora.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["eta","ETA britannica approvata (gov.uk/eta, 20 £) e passaporto valido: la carta d'identità non basta"],["pay","Carta contactless o telefono con pagamenti abilitati, per metro e bus: i biglietti di carta quasi non esistono"],["tel","Piano dati per il Regno Unito: dopo la Brexit il roaming UE non vale, controlla il tuo operatore"],["tk","Biglietto del treno per l'aeroporto, comprato alle macchinette o online",function(E){return["LGW","LTN","STN"].indexOf(E.cfg.to)>=0}],["twr","Biglietto con orario per la Torre di Londra (hrp.org.uk, meglio online)",["toweroflondon"]],["stp","Biglietto per la cattedrale di St Paul (stpauls.co.uk, online)",["stpaulins"]],["abb","Biglietto per l'Abbazia di Westminster (westminster-abbey.org, online)",["abbeyins"]],["bm","Ingresso gratuito prenotato al British Museum (consigliato)",["british"]],["eye","Biglietto con orario per il London Eye (londoneye.com, online costa meno)",["eye"]],["cov","Qualcosa per coprire spalle e ginocchia in chiesa",["abbeyins","stpaulins"]],["rain","Un ombrello o un impermeabile leggero: a Londra la pioggia arriva senza avviso"]],
NUM:{1:["one person","uan PER-son"],2:["two","tu"],3:["three","tri"],4:["four","for"],5:["five","faiv"],6:["six","sics"],7:["seven","SE-ven"],8:["eight","eit"],9:["nine","nain"],10:["ten","ten"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Good morning / Good evening","gud MOR-ning / gud IV-ning"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","A table for "+nu[0]+", please","e TEI-bol for "+nu[1]+", pliz"],["Un flat white e un croissant, per favore","A flat white and a croissant, please","e flat uait end e kruas-SON, pliz"],["Fish and chips, per favore","Fish and chips, please","fish end cips, pliz"],["Acqua del rubinetto, per favore","Tap water, please","tap UO-ter, pliz"],["Il conto, per favore","Could we have the bill, please?","cud ui hav de bil, pliz"],["Posso pagare con la carta?","Can I pay by card?","can ai pei bai card"],["Quanto costa?","How much is it?","hau mac is it"],["Dov'è la metropolitana?","Where is the Tube station?","uer is de tiub STEI-scion"],["Da quale binario parte il treno per l'aeroporto?","Which platform for the airport, please?","uic PLAT-form for di ER-port, pliz"]];
if(M)fr=fr.concat([["Ho una prenotazione","I have a reservation","ai hav e re-ser-VEI-scion"],["Posso lasciare i bagagli?","Can I leave my bags here?","can ai liv mai bags hir"],["A che ora è il check-out?","What time is check-out?","uot taim is CEC-aut"]]);
return fr.concat([["Mi scusi","Excuse me","ec-SCIUS mi"],["Grazie mille!","Thank you so much!","tenk iu sou mac"]])},
taxTxt:function(tx){return "A Londra non c'è tassa di soggiorno, né a livello nazionale né comunale: il prezzo che trovi sull'alloggio è quello che paghi."},
STAYTIPS:["La metropolitana di Londra chiude verso mezzanotte; il venerdì e il sabato le linee Central, Jubilee, Piccadilly, Victoria e parte della Northern restano aperte tutta la notte (Night Tube). Dopo mezzanotte ci sono i bus notturni (linee N)."],
ZONES:[
["🚇 Metro, bus e carta contactless",["Non servono biglietti di carta: appoggia la carta contactless o il telefono sui lettori gialli, all'ingresso e all'uscita, sempre con la stessa carta. Il tetto giornaliero (zone 1–2) è di 8,90 £, circa 10,50 €.","Sulle scale mobili stai a destra e lascia libera la sinistra per chi ha fretta.","I bus non accettano contanti: solo carta contactless. Il bus costa 1,75 £ fino al 31 ottobre e 1,85 £ dopo; con l'«Hopper» cambi bus per un'ora senza pagare di nuovo.","Quando attraversi guarda a destra: le auto vengono dal lato opposto rispetto all'Italia."]],
["🎭 Covent Garden e Soho",["Il Covent Garden Market e Leicester Square sono le zone più care per mangiare: spostati a Chinatown (Lisle Street e Gerrard Street) o nelle vie laterali di Soho.","Neal's Yard e i vicoli di Seven Dials sono più tranquilli e belli da fotografare.","💧 Molti caffè riempiono la borraccia gratis: cerca l'adesivo «Refill»."]],
["👑 Westminster e Buckingham Palace",["L'Abbazia di Westminster costa 32 £ (circa 38 €): aperta dal lunedì al sabato, chiusa ai turisti la domenica; il sabato chiude intorno alle 13.","Il cambio della guardia è il lunedì, mercoledì e venerdì alle 11:00 e può essere cancellato con poco preavviso: arriva 40 minuti prima.","Dal St James's Park si vede il palazzo di Buckingham dal ponticello sul laghetto: una delle viste migliori e gratis.","Attenzione ai ladri in scooter che strappano il telefono dalle mani: non usarlo sul bordo del marciapiede."],["abbeyins","westminster","buckingham"]],
["⛪ City, St Paul e South Bank",["St Paul: 27 £ (circa 32 €), aperta dal lunedì al sabato 8:30–16:30; la domenica è chiusa alle visite. La salita alla cupola chiede molte scale.","Il Millennium Bridge porta alla Tate Modern: gratis, aperta fino alle 18 (21 il venerdì e il sabato).","Borough Market è aperto da martedì a domenica; il lunedì è chiuso. Per il pranzo evita i banchi con la fila più lunga e cerca quelli dove mangiano i londinesi."],["stpaulins","stpaul","southbank","borough"]],
["🏰 Torre di Londra e Tower Bridge",["Torre di Londra: 38 £ (circa 45 €), aperta 9–17:30 in ottobre (lunedì e domenica dalle 10); da novembre di solito chiude alle 16:30. Dedica almeno 2 ore e mezza.","Tower Bridge Exhibition: 18 £ (circa 21 €), aperta 9:30–18:00 (ultimo ingresso 17:00); attraversare il ponte è gratis.","Per la foto del ponte intero vai sulla riva sud, a Potters Fields."],["toweroflondon","towerbridge","eastend"]],
["🏺 British Museum e Bloomsbury",["Ingresso gratuito alla collezione permanente, con prenotazione gratuita consigliata. Aperto 10–17, il venerdì fino alle 20:30.","Dopo il museo le vie di Bloomsbury sono piene di caffè e librerie: per mangiare spendendo poco allontanati di due strade.","Il venerdì sera il museo è molto meno affollato."],["british"]],
["🦕 South Kensington e Hyde Park",["Storia Naturale e V&A sono gratis. Storia Naturale 10–17:50; V&A 10–17:45 (venerdì fino alle 22).","Kensington Palace: 24,70 £ (circa 29 €), con giorni e orari variabili; gli Appartamenti della Regina sono chiusi fino alla primavera 2027.","Il parco è aperto dalle 5 a mezzanotte, gratis: porta la borraccia piena."],["museums","kensington"]],
["🎨 Notting Hill e Camden",["Il sabato Portobello Road è piena di bancarelle: negli altri giorni c'è meno gente ma anche meno mercato.","Camden Market è aperto tutti i giorni, di solito fino alle 18, ed è molto affollato nel weekend.","A Primrose Hill il panorama è più bello al tramonto: porta una felpa."],["notting","camden"]],
["🧭 Greenwich",["Il battello Thames Clipper è il modo più bello per arrivare (30–40 minuti da Westminster Pier) e si paga con la carta contactless; in alternativa la DLR fino a Cutty Sark.","Greenwich Park e Queen's House sono gratis; l'Osservatorio e la Cutty Sark hanno un biglietto.","Il mercato di Greenwich è aperto tutti i giorni, circa 10–17:30."],["greenwich"]]],
WTIPS:["L'acqua del rubinetto di Londra è potabile: puoi chiederla gratis in ogni ristorante («tap water, please») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè e pub aderiscono al progetto Refill e riempiono la borraccia gratis: cerca l'adesivo sulla vetrina.","Le fontane monumentali, come quelle di Trafalgar Square, non sono da bere."],
GEN:["Il Regno Unito non è nell'UE: servono il passaporto (non la carta d'identità) e l'ETA; la valuta è la sterlina, 1 £ vale circa 1,18 €.","Londra è un'ora indietro rispetto all'Italia: gli orari dei voli sono sempre quelli locali.","Si paga quasi sempre con la carta o con il telefono, anche per un caffè: i contanti servono quasi mai.","Mancia: se il conto non include già il «service charge» (di solito il 12,5%), lasciare circa il 10% è l'uso; nei pub si ordina e si paga al bancone, senza mancia.","Nei pub si ordina e si paga al bancone; nei ristoranti ti accompagnano al tavolo. Si pranza tra le 12 e le 14:30 e si cena dalle 18.","Attenzione ai ladri in scooter che strappano il telefono e ai borseggiatori in metro e nei mercati: zaino davanti.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:999">📞 999</a> Emergenze (polizia, ambulanza, vigili del fuoco) · <a class="call" href="tel:112">📞 112</a> numero europeo, funziona anche qui</li><li><a class="call" href="tel:111">📞 111</a> Urgenze mediche non gravi (servizio sanitario NHS)</li><li>🚇 Metro, bus e treni, anche per oggetti smarriti: <a href="https://tfl.gov.uk/" target="_blank" rel="noopener">tfl.gov.uk</a>.</li><li>🇮🇹 Consolato Generale d\'Italia a Londra: <a href="https://conslondra.esteri.it" target="_blank" rel="noopener">conslondra.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 10 ottobre 2026 non risultano scioperi confermati nella metropolitana o nei treni di Londra per ottobre e novembre, ma vengono annunciati con poco preavviso: nei giorni prima controllate <a href="https://tfl.gov.uk/status-updates/" target="_blank" rel="noopener">tfl.gov.uk/status-updates</a> e, per i treni, <a href="https://www.nationalrail.co.uk/" target="_blank" rel="noopener">nationalrail.co.uk</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="40" cy="30" r="13"/><path d="M0 106 Q40 80 90 88 Q130 94 160 106 Z"/><path d="M252 106 Q296 78 340 84 Q380 88 400 100 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M20 106 V48 h20 V106 Z M18 48 h24 v-8 h-24 Z M20 40 L30 10 L40 40 Z M29.4 10 V3 h1.2 V10 Z"/><path d="M40 106 V80 h60 V106 Z M46 80 V70 h3 V80 Z M62 80 V68 h3 V80 Z M80 80 V70 h3 V80 Z M94 80 V72 h3 V80 Z M100 106 V76 h10 V106 Z M99 76 L105 64 L111 76 Z"/></g>'+
'<g style="--k:2"><path fill-rule="evenodd" d="M150 24 a38 38 0 1 0 .01 0 Z M150 27 a35 35 0 1 1 -.01 0 Z"/><path d="M140 106 L150 62 L160 106 Z"/></g>'+
'<g style="--k:3"><path d="M196 106 V84 h54 V106 Z M202 84 V72 h42 V84 Z M204 72 Q204 48 223 46 Q242 48 242 72 Z M219 46 V36 h8 V46 Z M220 36 h6 v-4 h-6 Z M222.4 32 V22 h1.2 V32 Z M220 25 h6 v1.2 h-6 Z M190 106 V78 h8 V106 Z M190 78 h8 l-4 -8 Z M248 106 V78 h8 V106 Z M248 78 h8 l-4 -8 Z"/></g>'+
'<g style="--k:4"><path d="M258 106 V72 Q258 54 266 48 Q274 54 274 72 V106 Z"/><path d="M280 106 L292 14 L304 106 Z M291.4 14 V4 h1.2 V14 Z"/></g>'+
'<g style="--k:5"><path d="M318 106 V56 h14 V106 Z M316 56 L325 44 L334 56 Z M362 106 V56 h14 V106 Z M360 56 L369 44 L378 56 Z M332 66 h30 v4 h-30 Z M332 96 h30 v4 h-30 Z M306 96 h12 v4 h-12 Z M376 96 h24 v4 h-24 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M25 44 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M24 58 h12 M24 66 h12 M24 74 h12"/><path d="M150 27 V97 M115 62 H185 M125 37 L175 87 M175 37 L125 87"/><path d="M202 92 h44 M210 76 v8 M223 76 v8 M236 76 v8"/><path d="M332 62 Q347 78 362 62 M318 62 Q310 76 304 92 M376 62 Q388 76 400 90"/></g>'+
'<g class="sk-spark" style="--k:7"><circle cx="30" cy="4" r="1.6"/><circle cx="108" cy="30" r="1.3"/><circle cx="223" cy="12" r="1.3"/><circle cx="292" cy="30" r="1.3"/><circle cx="350" cy="30" r="1.3"/><circle cx="80" cy="46" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.londra);
