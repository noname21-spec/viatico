/* ===== Edimburgo (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.edimburgo=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: da Italia ci sono voli diretti solo sull'aeroporto di Edimburgo (EDI) */
var PAR={
EDI:{n:"Edimburgo (EDI)",s:"Edinburgh Airport",url:"https://www.edinburghairport.com/",live:"Edinburgh",inMin:50,buf:120,pos:[55.9500,-3.3725],sd:"Aeroporto EDI · tram o bus Airlink 100",rt:"Dall'aeroporto: tram fino a St Andrew Square, in pieno centro.",
 arr:"Dall'Italia si entra nel Regno Unito con il controllo passaporti: servono il passaporto e l'ETA già approvata, e la coda può durare da pochi minuti a un'ora. Dopo il ritiro bagagli segui i cartelli «Tram» (la fermata è a pochi passi dal terminal): il tram va senza cambi fino a St Andrew Square in circa 35 minuti, con una corsa ogni 7 minuti di giorno (la prima parte dall'aeroporto alle 6:30, l'ultima alle 22:52). In alternativa il bus Airlink 100, fermata D davanti al terminal, porta a Waverley Bridge, accanto alla stazione, in circa 30 minuti, ogni 10 minuti di giorno e tutta la notte.",
 tk:"Biglietto: il tram costa 7,90 £ (circa 9,30 €) a tratta e 9,50 £ (11,20 €) andata e ritorno aperto; si compra alle macchinette alla fermata o con l'app, prima di salire. Il bus Airlink 100 costa 6 £ (7,10 €) a tratta e 8,50 £ (10 €) andata e ritorno aperto, si paga all'autista con carta contactless. Prezzi dai siti dei gestori letti il 13 ottobre 2026.",
 gm:"Edinburgh Airport tram stop",
 tips:["Il biglietto del tram per l'aeroporto non è compreso nel biglietto giornaliero dei mezzi urbani (City DAY): vale solo per le corse dentro la città.","Se arrivi o riparti di notte o molto presto, il bus Airlink 100 funziona 24 ore su 24; il tram no.","Il taxi per il centro costa di solito 20–40 £ (circa 25–50 €) e impiega 25–40 minuti: il tram è più veloce e più economico, perché non resta fermo nel traffico."]}
};
/* linee (tracciati indicativi) */
var SEG={
tram:{c:"#a4123f",n:"Tram dall'aeroporto",p:[[55.9490,-3.3609,"Aeroporto",2],[55.9465,-3.3217,"Edinburgh Gateway",2],[55.9420,-3.2408,"Murrayfield"],[55.9459,-3.2189,"Haymarket",2],[55.9494,-3.2077,"West End",2],[55.9520,-3.1985,"Princes Street"],[55.9548,-3.1923,"St Andrew Square",2]]},
airlink:{c:"#7a1f2b",n:"Bus Airlink 100",p:[[55.9490,-3.3609,"Aeroporto",2],[55.9459,-3.2189,"Haymarket",2],[55.9494,-3.2077,"West End",2],[55.9521,-3.1905,"Waverley Bridge",2]]}
};
var START=[55.9548,-3.1923];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
castle:{t:"Castello di Edimburgo",z:"A",p:1,min:120,id:150,max:210,pos:[55.9486,-3.1999],q:"Edinburgh Castle, Edinburgh",cls:"",sun:1,tk:[28,"Castello di Edimburgo (23,50 £)",1,1],
 win:function(wd,d){var o=d.slice(5),c=(o>="04-01"&&o<="09-30")?18*60:17*60;if(o==="12-25"||o==="12-26")return[0,0];return[9*60+30,c]},
 d:"La fortezza sulla roccia vulcanica che domina la città, residenza dei re di Scozia. Dentro ci sono i Gioielli della Corona di Scozia e la Pietra del Destino, la minuscola chiesa di Santa Margherita (la più antica della città), il Grande Salone e il Museo Nazionale della Guerra. Dalle mura la vista arriva fino al mare.",
 m:"Biglietto adulti 23,50 £ (circa 28 €) se comprato online, 26 £ (circa 31 €) il giorno stesso, con fascia oraria: dal sito ufficiale letto il 13 ottobre 2026. Dal 1° ottobre al 31 marzo il castello apre alle 9:30, l'ultimo ingresso è alle 16 e chiude alle 17 (da aprile a settembre di solito chiude alle 18: da confermare); è chiuso il 25 e 26 dicembre, il 24 dicembre chiude alle 16. Il «One o'Clock Gun», il colpo di cannone, spara ogni giorno alle 13 tranne la domenica. Il castello può chiudere per il maltempo: controlla edinburghcastle.scot il giorno prima. Il biglietto online esaurisce spesso: prenotalo con anticipo."},
royalmile:{t:"Royal Mile e Cattedrale di St Giles",z:"A",p:1,min:60,id:90,max:150,pos:[55.9494,-3.1909],q:"St Giles' Cathedral, Edinburgh",cls:"walk",sun:1,
 win:function(wd){return wd===6?[13*60,17*60]:wd===5?[9*60,17*60]:[10*60,18*60]},
 d:"La via che scende dal castello al palazzo reale, con i vicoli stretti (i «close») che si aprono a destra e a sinistra, i palazzi alti di pietra scura e i musicisti di strada. Al centro c'è la cattedrale di St Giles, con la corona di pietra sul campanile e le vetrate colorate.",
 m:"Si cammina gratis. St Giles è a ingresso libero, con offerta consigliata (un piccolo biglietto per la salita alla torre dell'orologio, circa 6 £): orari letti su una scheda secondaria, lunedì–venerdì 10–18, sabato 9–17, domenica 13–17, da confermare su stgilescathedral.org.uk. In mezzo alla Royal Mile le vie laterali sono per turisti: i locali veri sono nei vicoli."},
holyrood:{t:"Palazzo di Holyroodhouse",z:"B",p:2,min:75,id:100,max:150,pos:[55.9527,-3.1722],q:"Palace of Holyroodhouse, Edinburgh",cls:"",sun:1,tk:[26,"Palazzo di Holyroodhouse (22 £)",1,1],
 win:function(wd,d){if(wd===1||wd===2)return[0,0];if(d==="2026-12-25"||d==="2026-12-26")return[0,0];var w=d>="2026-11-01"?[9*60+30,15*60+15]:[9*60+30,16*60+30];return w},
 d:"La residenza ufficiale del re in Scozia, in fondo alla Royal Mile. Si visitano le stanze di Stato, la camera dove visse Maria Stuarda e le rovine gotiche dell'abbazia di Holyrood, nel giardino.",
 m:"Biglietto adulti 22 £ (circa 26 €) in anticipo, 26 £ (circa 31 €) il giorno stesso, dal sito ufficiale (rct.uk). Da ottobre a dicembre 2026 il palazzo è aperto solo da giovedì a lunedì (chiuso il martedì e il mercoledì): fino al 31 ottobre dalle 9:30 alle 18 (ultimo ingresso 16:30), dal 1° novembre dalle 9:30 alle 16:30 (ultimo ingresso 15:15); chiuso il 25 e 26 dicembre. Orari letti in un documento ufficiale di novembre 2025, quindi da confermare su rct.uk prima di partire. Il palazzo chiude quando il re o la famiglia reale lo usano."},
arthur:{t:"Arthur's Seat e Holyrood Park",z:"B",p:2,min:90,id:120,max:180,pos:[55.9441,-3.1618],q:"Arthur's Seat, Edinburgh",cls:"walk",multi:1,sun:1,
 d:"Il vulcano spento che domina la città: dalla cima, a 251 metri, si vede tutta Edimburgo, il mare e il castello. Dal palazzo di Holyrood il sentiero più semplice sale in circa 45 minuti, sul lato est.",
 m:"Il parco è aperto tutto l'anno e l'ingresso è gratuito. Calcola da 1 ora e mezza a 2 ore tra salita e discesa. Il vento in cima è quasi sempre forte: porta una giacca e scarpe con una buona suola, perché il sentiero diventa scivoloso con la pioggia. Con maltempo o poca luce è meglio rinunciare."},
nms:{t:"Museo Nazionale di Scozia",z:"A",p:2,min:75,id:120,max:200,pos:[55.9473,-3.1891],q:"National Museum of Scotland, Chambers Street, Edinburgh",cls:"",sun:1,
 win:function(wd,d){return[10*60,17*60]},
 d:"Il grande museo di Edimburgo, in un palazzo vittoriano di vetro e ferro, con la storia della Scozia, gli animali impagliati, una navicella spaziale, la pecora Dolly e la scacchiera di Lewis (le pedine di tricheco del XII secolo). Il tetto ha una terrazza panoramica gratuita.",
 m:"Ingresso gratuito alle collezioni permanenti. Aperto ogni giorno dalle 10 alle 17; chiuso il 25 dicembre (apre alle 12 il 26 dicembre e il 1° gennaio). Alcune mostre temporanee sono a pagamento. Dal sito ufficiale nms.ac.uk, letto il 13 ottobre 2026. Dedica almeno 2 ore: le sale sono molte."},
calton:{t:"Calton Hill e Nelson Monument",z:"C",p:2,min:45,id:70,max:120,pos:[55.9552,-3.1831],q:"Calton Hill, Edinburgh",cls:"walk",multi:1,sun:1,
 d:"La collina a pochi minuti da Princes Street, con il Monumento Nazionale (una specie di Partenone incompiuto), la torre dell'ammiraglio Nelson, il monumento a Dugald Stewart e un panorama sulla città, sul castello e su Arthur's Seat. Il tramonto qui è molto bello.",
 m:"La collina è aperta a tutte le ore e gratuita; la salita da Waterloo Place è di 5–10 minuti a piedi. Il Nelson Monument (143 scalini) è aperto ogni giorno dalle 10 alle 15:30 e costa 7,50 £ (circa 9 €): orari e prezzo da un sito secondario, da confermare. Il vento è forte e i gradini sono scivolosi con la pioggia."},
princes:{t:"Princes Street Gardens e Scott Monument",z:"C",p:3,min:35,id:55,max:100,pos:[55.9523,-3.1933],q:"Scott Monument, Edinburgh",cls:"walk",multi:1,sun:1,
 d:"I giardini che separano la città nuova dalla città vecchia, con una vista diretta sul castello. Vicino a Waverley c'è il Scott Monument, un'alta guglia gotica dedicata allo scrittore Walter Scott, che si può salire fino in cima.",
 m:"I giardini sono gratuiti e aperti di giorno. Il Scott Monument ha 287 scalini stretti, costa circa 8 £ (circa 9,50 €) ed è aperto circa dalle 10 alle 16 in inverno: dati da una guida online del 2026, da confermare. Nei mesi freddi i giardini ospitano il mercatino di Natale: controlla le date."},
gallery:{t:"Scottish National Gallery",z:"C",p:4,min:45,id:75,max:120,pos:[55.9509,-3.1958],q:"National Gallery of Scotland, The Mound, Edinburgh",cls:"",multi:1,sun:1,
 win:function(wd){return[10*60,17*60]},
 d:"Il museo d'arte sul Mound, a due passi dai giardini, con Tiziano, Raffaello, El Greco, Velázquez, Monet, Van Gogh e i paesaggi scozzesi di Raeburn e Ramsay. Una visita tranquilla e luminosa, soprattutto con la pioggia.",
 m:"Ingresso gratuito alla collezione permanente. Orari tipici dalle 10 alle 17 ogni giorno, ma qui non ho potuto leggerli sul sito ufficiale: da confermare su nationalgalleries.org prima di andare."},
grass:{t:"Grassmarket, Victoria Street e Greyfriars",z:"A",p:3,min:45,id:75,max:120,pos:[55.9476,-3.1951],q:"Grassmarket, Edinburgh",cls:"walk",sun:1,
 d:"La piazza dove un tempo si teneva il mercato del bestiame e dove oggi ci sono pub, negozi e caffè. Da qui sale la Victoria Street, la via curva a due livelli con le facciate colorate, e a cinque minuti c'è Greyfriars, con il cimitero e la statua del cagnolino Bobby.",
 m:"Si cammina gratis. Il cimitero di Greyfriars Kirkyard è aperto di giorno ed è gratuito; il mercato del Grassmarket c'è di solito il sabato (da confermare). Nei giorni di pioggia le strade di pietra sono scivolose."},
dean:{t:"Dean Village e Stockbridge",z:"D",p:4,min:60,id:90,max:140,pos:[55.9525,-3.2184],q:"Dean Village, Edinburgh",cls:"walk",multi:1,sun:1,
 d:"Un angolo di campagna in città: Dean Village è un vecchio quartiere di mugnai con case di mattoni rossi sul torrente Water of Leith. Da qui un sentiero lungo l'acqua porta in circa 20 minuti a Stockbridge, un quartiere di negozi indipendenti e caffè.",
 m:"Il sentiero e il villaggio sono gratuiti e aperti sempre. Il mercato di Stockbridge è di solito la domenica (da confermare). Il percorso lungo l'acqua è in piano, ma può essere fangoso."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
function WW(a,b,min,t1,t2,p){var r=p.slice().reverse();P2(a,b,min,"walk",t1,t2,{f:[W(p)],r:[W(r)]})}
var LEGS={};
WW("start","royalmile",10,"A piedi per il North Bridge fino alla High Street, circa 10 minuti.","A piedi lungo la High Street e il North Bridge fino a St Andrew Square, circa 10 minuti.",[[55.9548,-3.1923],[55.9525,-3.1898],[55.9505,-3.1895],[55.9494,-3.1909]]);
WW("start","castle",20,"A piedi per Princes Street e il Mound, poi su per la scalinata fino al castello, circa 20 minuti.","A piedi dal castello per il Mound fino a St Andrew Square, circa 20 minuti.",[[55.9548,-3.1923],[55.9523,-3.1948],[55.9510,-3.1951],[55.9497,-3.1963],[55.9490,-3.1985],[55.9486,-3.1999]]);
WW("royalmile","castle",8,"A piedi in salita lungo la Lawnmarket e Castlehill fino al castello, circa 8 minuti.","A piedi in discesa lungo Castlehill e la Lawnmarket fino a St Giles, circa 8 minuti.",[[55.9494,-3.1909],[55.9490,-3.1950],[55.9486,-3.1999]]);
WW("royalmile","holyrood",20,"A piedi lungo la Canongate fino al palazzo di Holyroodhouse, circa 20 minuti.","A piedi lungo la Canongate fino a St Giles, circa 20 minuti.",[[55.9494,-3.1909],[55.9505,-3.1850],[55.9517,-3.1795],[55.9522,-3.1740],[55.9527,-3.1722]]);
WW("start","holyrood",25,"A piedi per il North Bridge e la Canongate fino al palazzo di Holyroodhouse, circa 25 minuti.","A piedi per la Canongate e il North Bridge fino a St Andrew Square, circa 25 minuti.",[[55.9548,-3.1923],[55.9525,-3.1898],[55.9505,-3.1850],[55.9517,-3.1795],[55.9527,-3.1722]]);
WW("holyrood","arthur",10,"A piedi nel parco di Holyrood fino all'inizio del sentiero per Arthur's Seat, circa 10 minuti.","A piedi dal sentiero fino al palazzo di Holyroodhouse, circa 10 minuti.",[[55.9527,-3.1722],[55.9490,-3.1680],[55.9441,-3.1618]]);
WW("start","calton",13,"A piedi per Waterloo Place fino a Calton Hill, circa 13 minuti.","A piedi per Waterloo Place fino a St Andrew Square, circa 13 minuti.",[[55.9548,-3.1923],[55.9553,-3.1890],[55.9555,-3.1850],[55.9552,-3.1831]]);
WW("calton","holyrood",15,"A piedi in discesa per Regent Road fino al palazzo di Holyroodhouse, circa 15 minuti.","A piedi per Regent Road fino a Calton Hill, circa 15 minuti.",[[55.9552,-3.1831],[55.9535,-3.1790],[55.9527,-3.1722]]);
WW("start","princes",6,"A piedi per Princes Street fino al Scott Monument, circa 6 minuti.","A piedi lungo Princes Street fino a St Andrew Square, circa 6 minuti.",[[55.9548,-3.1923],[55.9535,-3.1930],[55.9523,-3.1933]]);
WW("princes","castle",13,"A piedi per i giardini e la scalinata sul Mound fino al castello, circa 13 minuti.","A piedi dal castello giù per il Mound fino ai Princes Street Gardens, circa 13 minuti.",[[55.9523,-3.1933],[55.9510,-3.1960],[55.9486,-3.1999]]);
WW("princes","gallery",5,"A piedi per il Mound fino alla National Gallery, circa 5 minuti.","A piedi dalla National Gallery ai Princes Street Gardens, circa 5 minuti.",[[55.9523,-3.1933],[55.9509,-3.1958]]);
WW("gallery","castle",10,"A piedi su per il Mound fino al castello, circa 10 minuti.","A piedi giù per il Mound fino alla National Gallery, circa 10 minuti.",[[55.9509,-3.1958],[55.9497,-3.1963],[55.9486,-3.1999]]);
WW("castle","grass",8,"A piedi giù per la Victoria Street fino al Grassmarket, circa 8 minuti.","A piedi su per la Victoria Street fino al castello, circa 8 minuti.",[[55.9486,-3.1999],[55.9482,-3.1962],[55.9476,-3.1951]]);
WW("grass","nms",8,"A piedi per Candlemaker Row e Greyfriars fino al Museo Nazionale, circa 8 minuti.","A piedi per Greyfriars fino al Grassmarket, circa 8 minuti.",[[55.9476,-3.1951],[55.9468,-3.1922],[55.9473,-3.1891]]);
WW("royalmile","nms",6,"A piedi per la George IV Bridge fino al Museo Nazionale, circa 6 minuti.","A piedi per la George IV Bridge fino a St Giles, circa 6 minuti.",[[55.9494,-3.1909],[55.9480,-3.1900],[55.9473,-3.1891]]);
WW("start","nms",16,"A piedi per il North Bridge e la South Bridge fino al Museo Nazionale, circa 16 minuti.","A piedi per la South Bridge e il North Bridge fino a St Andrew Square, circa 16 minuti.",[[55.9548,-3.1923],[55.9525,-3.1898],[55.9495,-3.1880],[55.9473,-3.1891]]);
WW("start","dean",28,"A piedi per George Street e Charlotte Square, poi giù per Randolph Crescent fino al Water of Leith, circa 28 minuti.","A piedi dal Water of Leith su per Randolph Crescent e lungo George Street fino a St Andrew Square, circa 28 minuti.",[[55.9548,-3.1923],[55.9525,-3.2058],[55.9520,-3.2090],[55.9525,-3.2184]]);
/* ritorno in aeroporto: tram da St Andrew Square */
var RET={
EDI:{
 A:{min:55,txt:"Tram da St Andrew Square all'aeroporto, senza cambi, in circa 35 minuti (una corsa ogni 7 minuti di giorno; controlla l'orario dell'ultima corsa della sera sul sito di Edinburgh Trams). Biglietto 7,90 £ (9,30 €) alle macchinette o con l'app. In alternativa il bus Airlink 100 da Waverley Bridge, 6 £ (7,10 €), circa 30 minuti, anche di notte.",g:[["tram","St Andrew Square","Aeroporto"]]}}
};
var ARR={
EDI:[["tram","Aeroporto","St Andrew Square"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi indicativi da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
larder:{n:"The Edinburgh Larder",a:"15 Blackfriars Street",z:"A",r:"4,5",pos:[55.9503,-3.1857],h:["08:30-16:00","08:30-16:00","08:30-16:00","08:30-16:00","08:30-16:00","08:30-16:00","09:00-16:00"],
 d:"Un caffè di cucina scozzese a km zero in un vicolo a due passi dalla Royal Mile: colazioni con uova e pancetta, porridge, zuppe e panini con prodotti locali. Il tipo di posto dove la gente del posto va a pranzo.",pr:"Una colazione o un pranzo stanno intorno ai 9–14 £ (circa 11–17 €), listino non visto. Orari e prezzi da guide, da confermare."},
clarinda:{n:"Clarinda's Tearoom",a:"69 Canongate",z:"B",r:"4,5",pos:[55.9516,-3.1795],h:D7("09:00-16:30"),
 d:"Una sala da tè all'antica sulla Canongate, a metà strada tra il castello e il palazzo di Holyrood: colazioni scozzesi, scones con panna e marmellata e un tè nelle tazze di porcellana.",pr:"Un tè con scone sta intorno ai 6–9 £ (circa 7–11 €); una colazione piena 9–13 £ (11–15 €); listino non visto. Orari da guide, da confermare."},
mums:{n:"Mums Great Comfort Food",a:"4a Forrest Road",z:"A",r:"4,3",pos:[55.9467,-3.1913],h:D7("09:00-21:30"),
 d:"Un locale informale vicino a Greyfriars con cucina scozzese di casa: salsicce e purè, polpettone, pie di carne, haggis e un porridge a colazione. Porzioni abbondanti per prezzi giusti.",pr:"Un piatto con purè e salsicce sta intorno ai 12–16 £ (circa 14–19 €), listino non visto. Orari da guide, da confermare."},
oink:{n:"Oink",a:"34 Victoria Street",z:"A",r:"4,5",pos:[55.9485,-3.1934],h:D7("10:30-17:00"),
 d:"Una finestrella sulla Victoria Street che serve da anni panini con maiale arrosto affettato al momento, con stuffing e salsa di mele: il pranzo veloce tipico, da mangiare in strada.",pr:"Un panino costa intorno ai 6–8 £ (circa 7–9,50 €), listino non visto. Orari da guide, da confermare: chiude quando la carne finisce."},
dogs:{n:"The Dogs",a:"110 Hanover Street",z:"C",r:"4,4",pos:[55.9531,-3.1963],h:["12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00","12:00-22:00"],
 d:"Un ristorante con cucina scozzese moderna, in una delle vie più eleganti della città nuova: carne e pesce di stagione, spesso con prodotti di piccoli produttori, a prezzi più bassi dei locali vicini di George Street.",pr:"Una cena con un piatto e un dolce sta intorno ai 25–35 £ (circa 30–40 €), listino non visto. Orari da guide, da confermare."},
caferoyal:{n:"Café Royal",a:"19 West Register Street",z:"C",r:"4,5",pos:[55.9546,-3.1900],h:D7("11:00-23:00"),
 d:"Un pub vittoriano del 1863 con le piastrelle di ceramica e le vetrate: l'Oyster Bar serve ostriche e pesce, il Circle Bar fish and chips e birre scozzesi. Nel cuore della città nuova, a un minuto da St Andrew Square.",pr:"Fish and chips o una pie con birra stanno intorno ai 15–22 £ (circa 18–26 €), listino non visto. Orari da guide, da confermare."},
tingthai:{n:"Ting Thai Caravan",a:"8 Teviot Place",z:"A",r:"4,4",pos:[55.9468,-3.1893],h:D7("12:00-21:00"),
 d:"Una cucina thai di strada, vicino all'università e al Museo Nazionale: noodles di riso, curry e padelle da condividere, con un buon rapporto tra qualità e prezzo.",pr:"Un piatto sta intorno ai 11–15 £ (circa 13–18 €), listino non visto. Orari da guide, da confermare."},
pantry:{n:"The Pantry",a:"1 North West Circus Place",z:"D",r:"4,6",pos:[55.9568,-3.2105],h:["09:00-16:00","09:00-16:00","09:00-16:00","09:00-16:00","09:00-16:00","09:00-16:30","09:00-16:30"],
 d:"Un caffè per colazioni e brunch a Stockbridge, famoso per il porridge, le uova con salmone affumicato scozzese e il pane fatto in casa. Un posto da quartiere residenziale, a un quarto d'ora da Dean Village.",pr:"Colazione o brunch intorno ai 10–15 £ (circa 12–18 €), listino non visto. Orari da guide, da confermare."},
hectors:{n:"Hector's",a:"47 Deanhaugh Street",z:"D",r:"4,3",pos:[55.9582,-3.2088],h:D7("11:00-23:00"),
 d:"Un pub di Stockbridge con tavoli all'aperto e cucina scozzese semplice: pie, fish and chips, hamburger e birre alla spina. Frequentato dagli abitanti del quartiere.",pr:"Un piatto sta intorno ai 13–18 £ (circa 15–21 €), listino non visto. Orari da guide, da confermare."},
marys:{n:"Mary's Milk Bar",a:"19 Grassmarket",z:"A",r:"4,6",pos:[55.9476,-3.1950],h:D7("10:00-18:00"),
 d:"Una gelateria di quartiere nel Grassmarket, con gelati fatti in casa a gusti scozzesi (shortbread, toffee, tè), un cioccolato caldo denso e piccoli dolci. Per una pausa dolce dopo il castello.",pr:"Un gelato o un cioccolato stanno intorno ai 4–6 £ (circa 5–7 €), listino non visto. Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["larder","marys"],B:["clarinda","larder"],C:["pantry","clarinda"],D:["pantry","larder"]},
pra:{A:["oink","mums","tingthai","larder"],B:["clarinda","oink"],C:["caferoyal","dogs"],D:["hectors","pantry"]},
cen:{A:["mums","tingthai","caferoyal"],B:["caferoyal","mums"],C:["dogs","caferoyal"],D:["hectors","dogs"]},
snk:{A:["marys","oink","larder"],B:["clarinda","marys"],C:["caferoyal","marys"],D:["pantry","hectors"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"vecchia",t:"Castello e Royal Mile",acts:["castle","royalmile"],need:230,core:1},
{id:"holy",t:"Holyrood e Arthur's Seat",acts:["holyrood","arthur"],need:220,core:1},
{id:"museo",t:"Museo Nazionale e Grassmarket",acts:["nms","grass"],need:170},
{id:"new",t:"Calton Hill e Princes Street",acts:["calton","princes","gallery"],need:190},
{id:"dean",t:"Dean Village e Stockbridge",acts:["dean"],need:110}
];
var ORDER=["castle","royalmile","holyrood","arthur","nms","calton","princes","gallery","grass","dean"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["old","Old Town (Royal Mile, Grassmarket)",[55.9490,-3.1930],"A"],
["canon","Canongate / Holyrood",[55.9515,-3.1780],"B"],
["new","New Town / Princes Street",[55.9550,-3.1950],"C"],
["west","West End / Haymarket",[55.9460,-3.2180],"C"],
["stock","Stockbridge / Dean Village",[55.9580,-3.2090],"D"],
["south","Southside / Newington",[55.9420,-3.1800],"A"],
["altro","Altra zona (scrivi l'indirizzo)",[55.9548,-3.1923],""]
];
/* imposta di soggiorno: Visitor Levy di Edimburgo, 5% del prezzo della camera (IVA esclusa), solo per le prime 5 notti */
var TAX=[["h5","Hotel 4–5 stelle",{pct:5}],["h3","Hotel fino a 3 stelle, B&B o appartamento",{pct:5}],["host","Ostello o struttura economica",{pct:5}],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Full Scottish breakfast","la colazione scozzese completa: uova, pancetta, salsiccia, fagioli, funghi e il tattie scone, una frittella di patate."],["Porridge","fiocchi d'avena cotti nel latte o nell'acqua, di solito con miele o frutta."],["Scone with jam and cream","un panino dolce con marmellata e panna rappresa, da mangiare con il tè."]],
pra:[["Cullen skink","zuppa cremosa di eglefino affumicato e patate."],["Scotch pie","pasticcio di carne di montone a crosta dura, da mangiare caldo."],["Roast pork roll","panino con maiale arrosto, stuffing e salsa di mele."],["Toastie","toast tostato col formaggio, un pranzo veloce."]],
cen:[["Haggis, neeps and tatties","haggis (trippa e avena speziata) con rape e purè di patate: il piatto simbolo della Scozia."],["Fish and chips","pesce impanato con patatine, da condire con aceto di malto."],["Scottish salmon","salmone scozzese, spesso affumicato o alla griglia."],["Sticky toffee pudding","il dolce con datteri e salsa al caramello."],["Cranachan","dolce di panna, lamponi, avena e whisky."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il castello da Princes Street Gardens","Foto","La rocca e le mura viste dai giardini, con il Scott Monument davanti: al tramonto la pietra diventa dorata.",[55.9510,-3.1960],"Princes Street Gardens, Edinburgh","princes"],
["📷","La Royal Mile e St Giles","Foto","La corona di pietra di St Giles dalla High Street, con i vicoli stretti sul lato.",[55.9494,-3.1909],"St Giles' Cathedral, Edinburgh","royalmile"],
["🤳","Il castello dall'esplanade","Foto","Il portone del castello visto dalla grande spianata davanti all'ingresso, con la bandiera della Scozia.",[55.9488,-3.1982],"Edinburgh Castle Esplanade","castle"],
["📷","Victoria Street","Foto","La via curva a due livelli con le facciate colorate: la mattina presto è senza gente.",[55.9485,-3.1934],"Victoria Street, Edinburgh","grass"],
["🤳","La statua di Greyfriars Bobby","Selfie","Il cagnolino di bronzo davanti al cimitero di Greyfriars, con il naso lucido per i tanti che lo accarezzano.",[55.9469,-3.1913],"Greyfriars Bobby, Edinburgh","grass"],
["📷","Panorama da Calton Hill","Foto","La città con il castello e la corona di St Giles, vista dalla collina all'ora del tramonto.",[55.9549,-3.1823],"Calton Hill, Edinburgh","calton"],
["🤳","Il National Monument","Foto","Le dodici colonne incompiute sulla cima di Calton Hill: una posa da Atene al nord.",[55.9552,-3.1820],"National Monument of Scotland, Calton Hill","calton"],
["📷","Arthur's Seat dal palazzo","Foto","La collina verde e rocciosa dietro il palazzo di Holyrood, con la luce di mattina.",[55.9455,-3.1630],"Arthur's Seat, Edinburgh","arthur"],
["📷","Dean Village","Foto","Le case di mattoni rossi lungo il Water of Leith e il ponte di Telford, quasi sempre senza folla.",[55.9525,-3.2184],"Dean Village, Edinburgh","dean"],
["🤳","Il Water of Leith a Stockbridge","Selfie","Il sentiero lungo il torrente con gli alberi: l'autunno colora tutto di rosso.",[55.9570,-3.2080],"Water of Leith Walkway, Stockbridge, Edinburgh","dean"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2027-12-31",t:"ETA obbligatoria per il Regno Unito",x:"Dal 2 aprile 2025 gli italiani devono avere l'autorizzazione elettronica ETA (20 £, circa 24 €, valida 2 anni e collegata al passaporto) prima di partire: si chiede su gov.uk/eta o con l'app ufficiale UK ETA, e di solito la risposta arriva in uno-tre giorni. Alla frontiera serve il passaporto: la carta d'identità non basta."},
{from:"2026-10-13",to:"2027-12-31",t:"Edimburgo: tassa di soggiorno del 5%",x:"Dal 24 luglio 2026 Edimburgo applica una tassa del 5% sul prezzo della camera (IVA esclusa), per le prime 5 notti di ogni soggiorno. Vale per le prenotazioni fatte dal 1° ottobre 2025: spesso non è compresa nel prezzo dell'annuncio."},
{from:"2026-10-13",to:"2026-12-31",t:"Palazzo di Holyroodhouse: orario ridotto da novembre",x:"Il palazzo è aperto solo da giovedì a lunedì; dal 1° novembre apre dalle 9:30 alle 16:30 (ultimo ingresso 15:15). È chiuso il 25 e 26 dicembre. Orari da un documento ufficiale di novembre 2025: da confermare su rct.uk."},
{from:"2026-12-15",to:"2027-01-03",t:"Natale e Capodanno a Edimburgo",x:"Il castello è chiuso il 25 e 26 dicembre (il 24 chiude alle 16) e il 1° gennaio apre alle 11. Il Museo Nazionale è chiuso il 25 dicembre. Per Natale e per Hogmanay (la notte del 31 dicembre, con feste in strada su biglietto) la città è molto affollata e le camere costano molto di più: prenota con anticipo."}
];
/* clima medio di Edimburgo (indicativo, massime/minime) */
var CLIM=[[7,2],[7,2],[9,3],[12,4],[15,7],[18,10],[20,12],[19,12],[17,10],[13,7],[9,4],[7,2]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Edimburgo: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="holyrood"&&(WD===1||WD===2))meta+=" Oggi il palazzo di Holyroodhouse è chiuso (apre solo da giovedì a lunedì): se puoi, sposta la visita.";
if(it.id==="castle"&&WD===6)meta+=" Oggi è domenica: il colpo di cannone delle 13 non spara.";
if(it.id==="royalmile"&&WD===6)meta+=" Oggi è domenica: la cattedrale di St Giles apre solo dalle 13.";
return meta}
Object.assign(C,{id:"edimburgo",n:"Edimburgo",cn:"Scozia",e:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",flag:"\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",col:["#1f3a6b","#6b4a8c","#c9a24a"],k:"edimburgo edinburgh scozia scotland regno unito",
TZ:"Europe/London",LL:[55.9533,-3.1883],CC:"gb",QN:"Edinburgh",BK:"Edinburgh",ARE:/edinburgh|edimburgo|\beh\d{1,2}\s*\d[a-z]{2}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"en-GB",LANGN:"inglese",WATER:"osm",TAXDEF:"h3",TAXMAXN:5,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"GBP",s:"£",e:1.18},hub:{n:"St Andrew Square",q:"St Andrew Square tram stop, Edinburgh"},
SINGLE:{acts:["castle","royalmile","grass","nms","calton"],ins:[]},
EXCL:[],
DICON:{castle:"🏰",royalmile:"⛪",holyrood:"👑",arthur:"⛰️",nms:"🦕",calton:"🌄",princes:"🌳",gallery:"🖼️",grass:"🍺",dean:"🌉"},
ZN:{A:"nella Old Town",B:"sulla Canongate e a Holyrood",C:"nella New Town",D:"a Stockbridge e Dean Village"},
NEAR:{col:"caffè",pra:"pub o caffè",cen:"pub o ristorante",snk:"caffè o gelateria"},
SE:{larder:"☕",clarinda:"🫖",mums:"🍲",oink:"🥪",dogs:"🍽️",caferoyal:"🍺",tingthai:"🍜",pantry:"🥐",hectors:"🍺",marys:"🍦"},
TR:{one:2.8,cap:6.7,lbl:"Bus e tram in città (Lothian Buses, carta contactless)",
 air:{EDI:{one:9.3,n:"Tram per l'aeroporto (7,90 £)"}},
 passes:[
 {n:"Biglietto giornaliero City DAY",d:1,max:1,p:7.1,note:"Il City DAY (6 £, circa 7,10 €) vale un giorno su tutti i bus Lothian e sui tram in città. Non vale per il tram dell'aeroporto, per l'Airlink né per i bus notturni. Con la carta contactless, il tetto giornaliero (TapTapCap) è 5,70 £ (6,70 €): conviene sempre."},
 {n:"Biglietto settimanale (City WEEK)",d:7,p:31.3,only:function(T){return T.n>=5},note:"Il biglietto City WEEK (26,50 £, circa 31 €) vale sette giorni su bus e tram della città; anche con la carta contactless il tetto settimanale è 26,50 £."}],
 note:"Prezzi di ottobre 2026 (1 £ = 1,18 €), dai siti di Lothian Buses ed Edinburgh Trams: una corsa in bus o in tram in città costa 2,40 £ (circa 2,80 €), con la carta contactless si paga al massimo 5,70 £ (6,70 €) al giorno e 26,50 £ (31 €) alla settimana. Non serve un abbonamento. Il tram dell'aeroporto costa 7,90 £ (9,30 €) e l'Airlink 100 6 £ (7,10 €), ma non rientrano nel tetto. Il centro si gira bene a piedi: le salite e le scalinate sono la parte più faticosa."},
FOOD:{co:[10,"Colazione al caffè (colazione scozzese o scone)"],pr:[11,"Pranzo (panino, pie o zuppa)"],ce:[20,"Cena (haggis, fish and chips o piatto al pub)"],sp:[5,"Spuntini e assaggi"]},
T:{doc:"Passaporto valido (la carta d'identità non basta per entrare nel Regno Unito)",ride:"A piedi o in bus",move:"quasi tutto a piedi, con qualche bus o tram",bags:"«Can I leave my bags here?»",bagsPM:"«Can I leave my bags until this afternoon?»",bagsAM:"«Can I leave my bags until midday?»",
pra:"Un pub o un caffè",praZ:{A:"Sulla Royal Mile i locali con il menù fuori sono per turisti e costano di più: per un pranzo vero scendi nel Grassmarket o nelle vie laterali verso la Victoria Street.",C:"In George Street e Princes Street i ristoranti sono cari: nelle vie laterali, come Hanover Street, trovi locali migliori."},
freeLong:"Qualche idea: una pausa in un pub con una pinta e un piatto caldo, il Museo Nazionale (gratis), i Princes Street Gardens, oppure un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata nei Princes Street Gardens.",
remind:"Compra prima online il biglietto del castello di Edimburgo (23,50 £): l'ingresso ha fasce orarie e a volte esaurisce. Il palazzo di Holyroodhouse è chiuso il martedì e il mercoledì.",
rain1:"Al coperto: il Museo Nazionale di Scozia, la National Gallery, la cattedrale di St Giles, il castello (sale interne) e i pub storici.",
rainM:"Al coperto: Museo Nazionale, National Gallery, castello, palazzo di Holyroodhouse, St Giles e i pub.",
water:"Riempite la borraccia: l'acqua del rubinetto di Edimburgo è potabile e tra le più buone d'Europa, e molti caffè la riempiono gratis. Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Edimburgo si pranza tra le 12 e le 14:30 e si cena presto, dalle 18: molte cucine chiudono alle 21–22, guarda l'orario accanto a ogni locale.",
night:[["🥃","Un whisky scozzese o una pinta di ale in un pub storico, nei vicoli della Old Town, è il modo tipico di chiudere la giornata."],["🕙","Le cucine chiudono presto, spesso alle 21–22; i bus notturni circolano tutta la notte."],["☕","Molti caffè aprono alle 8:30–9: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è potabile)",
fuso:"Edimburgo è un'ora indietro rispetto all'Italia",
plug:"Adattatore per la spina britannica (tipo G, tre poli piatti) e caricabatterie",
foodNote:"I pasti sono stime per locali di quartiere: una colazione sta intorno ai 10 € e una cena con un piatto intorno ai 20 €. Le sterline sono convertite a 1 £ = 1,18 €. Quasi ovunque si paga con la carta o con il telefono.",
taxNote:"Dal 24 luglio 2026 a Edimburgo si paga una tassa del 5% sul prezzo della camera, al netto dell'IVA, per le prime 5 notti. Spesso non è compresa nel prezzo dell'annuncio: controlla se la struttura la fa pagare a parte.",
mcrit:"Criteri: almeno 4 stelle su Google, caffè, pub e locali di quartiere, niente catene. Colazione e pranzo restano sotto i 15 €, la cena sotto i 25–30 €. Orari, valutazioni e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["L'ETA è collegata al passaporto: viaggia con lo stesso passaporto usato per la richiesta. Al controllo di frontiera la coda può durare da pochi minuti a un'ora.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["eta","ETA britannica approvata (gov.uk/eta, 20 £) e passaporto valido: la carta d'identità non basta"],["pay","Carta contactless o telefono con pagamenti abilitati, per bus e tram"],["tel","Piano dati per il Regno Unito: dopo la Brexit il roaming UE non vale, controlla il tuo operatore"],["tk","Biglietto del tram per l'aeroporto (7,90 £) o dell'Airlink (6 £), alle macchinette o con l'app"],["cas","Biglietto con orario d'ingresso per il castello di Edimburgo (edinburghcastle.scot, 23,50 £)",["castle"]],["hol","Biglietto per il palazzo di Holyroodhouse (rct.uk, 22 £): aperto solo da giovedì a lunedì",["holyrood"]],["arth","Scarpe con una buona suola per Arthur's Seat (sentiero con sassi)",["arthur"]],["rain","Una giacca impermeabile: a Edimburgo piove spesso e il vento è forte"],["lay","Strati caldi e un cappello: sulle colline il vento è freddo anche d'estate"]],
NUM:{1:["one person","uan PER-son"],2:["two","tu"],3:["three","tri"],4:["four","for"],5:["five","faiv"],6:["six","sics"],7:["seven","SE-ven"],8:["eight","eit"],9:["nine","nain"],10:["ten","ten"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Good morning / Good evening","gud MOR-ning / gud IV-ning"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","A table for "+nu[0]+", please","e TEI-bol for "+nu[1]+", pliz"],["Un porridge e un tè, per favore","Porridge and a tea, please","POR-ridg end e ti, pliz"],["Haggis, neeps and tatties, per favore","Haggis, neeps and tatties, please","HA-ghis, nips end TA-tiz, pliz"],["Acqua del rubinetto, per favore","Tap water, please","tap UO-ter, pliz"],["Il conto, per favore","Could we have the bill, please?","cud ui hav de bil, pliz"],["Posso pagare con la carta?","Can I pay by card?","can ai pei bai card"],["Quanto costa?","How much is it?","hau mac is it"],["Dov'è la fermata del tram?","Where is the tram stop?","uer is de tram stop"],["Da quale fermata parte il bus per l'aeroporto?","Which stop is the airport bus from?","uic stop is di ER-port bas from"]];
if(M)fr=fr.concat([["Ho una prenotazione","I have a reservation","ai hav e re-ser-VEI-scion"],["Posso lasciare i bagagli?","Can I leave my bags here?","can ai liv mai bags hir"],["A che ora è il check-out?","What time is check-out?","uot taim is CEC-aut"]]);
return fr.concat([["Mi scusi","Excuse me","ec-SCIUS mi"],["Grazie mille!","Thank you so much!","tenk iu sou mac"]])},
taxTxt:function(tx){return "Tassa di soggiorno di Edimburgo (Visitor Levy): "+(tx[2]&&tx[2].pct?"il "+String(tx[2].pct).replace(".",",")+"% del prezzo della camera al netto dell'IVA ("+tx[1].toLowerCase()+"), per ogni notte, ma solo per le prime 5 notti":"non si paga se sei ospite di amici o parenti")+". Spesso non è compresa nel prezzo che trovi sull'annuncio: controlla se la struttura la fa pagare a parte."},
STAYTIPS:["Il centro è piccolo e collinare: dalla New Town alla Old Town si cammina in 10–15 minuti. I bus notturni circolano tutta la notte; il tram va fino a mezzanotte circa."],
ZONES:[
["🚌 Bus, tram e carta contactless",["Appoggia la carta contactless o il telefono sul lettore: il tetto giornaliero è di 5,70 £ (circa 6,70 €), il settimanale di 26,50 £ (31 €). Usa sempre la stessa carta.","Il tram dell'aeroporto (7,90 £) e l'Airlink 100 (6 £) non rientrano nel tetto giornaliero: si pagano a parte.","Il centro si gira bene a piedi, ma tra la New Town e la Old Town c'è una salita: i tram fermano in Princes Street, ai piedi.","Quando attraversi guarda a destra: le auto vengono dal lato opposto rispetto all'Italia."]],
["🏰 Castello e Royal Mile",["Il castello si visita con un biglietto a fascia oraria: comprare online costa meno (23,50 £, circa 28 €) e non fa fare la coda.","La Royal Mile ha molti negozi di souvenir e di kilt: i locali buoni sono nelle traverse, non sulla via principale.","I «close» sono i vicoli che si aprono tra le case, spesso con una scalinata: alcuni sono bellissimi e quasi deserti."],["castle","royalmile"]],
["👑 Holyrood e Arthur's Seat",["Il palazzo di Holyroodhouse costa 22 £ (circa 26 €) in anticipo ed è aperto solo da giovedì a lunedì (orari da confermare).","Il sentiero per Arthur's Seat parte accanto al palazzo: calcola 45 minuti di salita.","Con vento forte o pioggia fitta la cima è sconsigliata."],["holyrood","arthur"]],
["🌄 New Town e Calton Hill",["Calton Hill è gratuita, aperta sempre e con la vista migliore al tramonto.","La New Town ha piazze eleganti in stile georgiano: George Street e Charlotte Square sono le più belle.","Il Nelson Monument (143 scalini) costa circa 7,50 £ (9 €)."],["calton","princes","gallery"]],
["🦕 Musei gratuiti",["Il Museo Nazionale di Scozia e la National Gallery sono gratis. Nel primo la terrazza sul tetto ha un bel panorama.","Per le mostre temporanee si paga a parte."],["nms","gallery"]],
["🌉 Dean Village e Stockbridge",["Il percorso lungo il Water of Leith è in piano e quasi sempre tranquillo.","Stockbridge ha caffè, negozi di libri usati e un mercato di solito la domenica (da confermare)."],["dean"]],
["🌅 Un giorno fuori Edimburgo",["Da Waverley partono treni per St Andrews e per Glasgow (circa 50 minuti).","Il villaggio di Roslin e la Rosslyn Chapel si raggiungono in bus in circa 40 minuti."]]],
WTIPS:["L'acqua del rubinetto di Edimburgo è potabile e tra le più buone d'Europa: puoi chiederla gratis nei locali («tap water, please») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè e pub riempiono la borraccia se lo chiedi gentilmente.","Le fontane monumentali, come quella nei Princes Street Gardens, non sono da bere."],
GEN:["Il Regno Unito non è nell'UE: servono il passaporto (non la carta d'identità) e l'ETA; la valuta è la sterlina, 1 £ vale circa 1,18 €.","Edimburgo è un'ora indietro rispetto all'Italia: gli orari dei voli sono sempre quelli locali.","Si paga quasi sempre con la carta o con il telefono, anche per un caffè.","Mancia: se il conto non include già il «service charge», lasciare circa il 10% è l'uso; nei pub si ordina e si paga al bancone, senza mancia.","In Scozia il tempo cambia in fretta: porta sempre una giacca impermeabile.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:999">📞 999</a> Emergenze (polizia, ambulanza, vigili del fuoco) · <a class="call" href="tel:112">📞 112</a> numero europeo, funziona anche qui</li><li><a class="call" href="tel:111">📞 111</a> Urgenze mediche non gravi (servizio sanitario NHS)</li><li>🚌 Bus, tram e oggetti smarriti: <a href="https://www.lothianbuses.com/" target="_blank" rel="noopener">lothianbuses.com</a> · <a href="https://edinburghtrams.com/" target="_blank" rel="noopener">edinburghtrams.com</a>.</li><li>🇮🇹 Consolato Generale d\'Italia a Edimburgo: <a href="https://consedimburgo.esteri.it" target="_blank" rel="noopener">consedimburgo.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei bus, nei tram o nei treni di Edimburgo. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.lothianbuses.com/" target="_blank" rel="noopener">lothianbuses.com</a>, <a href="https://edinburghtrams.com/" target="_blank" rel="noopener">edinburghtrams.com</a> e, per i treni, <a href="https://www.scotrail.co.uk/" target="_blank" rel="noopener">scotrail.co.uk</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="232" cy="24" r="10"/><path d="M296 106 Q330 56 362 50 Q388 50 400 78 V106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M0 106 V72 Q20 62 40 66 L104 70 Q116 82 122 106 Z M22 66 V46 h14 V66 Z M20 46 h18 l-9 -12 Z M28.6 34 V26 h1.2 V34 Z M46 66 V52 h42 V66 Z M52 52 V44 h6 V52 Z M70 52 V40 h8 V52 Z M69 40 h10 l-5 -8 Z M90 66 V54 h12 V66 Z"/></g>'+
'<g style="--k:2"><path d="M138 106 V60 h18 V106 Z M140 60 V52 h14 V60 Z M141 52 Q147 32 153 52 Z M146.4 38 V28 h1.2 V38 Z M136 106 V70 h4 V106 Z M154 106 V70 h4 V106 Z"/></g>'+
'<g style="--k:3"><path d="M176 106 V86 h28 V106 Z M180 86 V62 h20 V86 Z M182 62 V46 h16 V62 Z M184 46 V32 h12 V46 Z M186 32 L190 8 L194 32 Z M189.4 8 V2 h1.2 V8 Z"/></g>'+
'<g style="--k:4"><path d="M236 106 Q270 74 318 76 Q344 80 360 106 Z M296 78 V56 h10 V78 Z M294 56 h14 V52 h-14 Z M298 52 V42 h6 V52 Z M300 42 V34 h2 V42 Z M262 80 V58 h4 V80 Z M270 80 V58 h4 V80 Z M278 80 V58 h4 V80 Z M286 80 V58 h4 V80 Z M260 58 H292 V54 H260 Z"/></g>'+
'<g style="--k:5"><path d="M358 106 V88 h40 V106 Z M362 88 V76 h8 V88 Z M376 88 V80 h6 V88 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M50 60 h34 M50 56 h34 M139 80 h18 M139 90 h18"/><path d="M181 74 h18 M183 54 h14"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="16" r="1.6"/><circle cx="100" cy="20" r="1.3"/><circle cx="170" cy="14" r="1.3"/><circle cx="270" cy="28" r="1.3"/><circle cx="340" cy="12" r="1.3"/><circle cx="388" cy="30" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.edimburgo);
