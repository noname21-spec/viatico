/* ===== Helsinki (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.helsinki=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti */
var PAR={
HEL:{n:"Helsinki-Vantaa (HEL)",s:"Helsinki-Vantaa",url:"https://www.finavia.fi/en/airports/helsinki-airport",live:"Helsinki",inMin:45,buf:120,pos:[60.3172,24.9633],sd:"Aeroporto HEL · treno I o P",rt:"Dall'aeroporto: treno I o P (circa 30 minuti) fino alla stazione centrale di Helsinki, in pieno centro.",
 arr:"Dall'Italia si entra in Finlandia senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli segui i cartelli «Juna / Train» per la stazione ferroviaria dell'aeroporto, collegata ai terminal. Il treno ad anello (Ring Rail) è la scelta più semplice: la linea I (circa 27 minuti) o la P (circa 32 minuti) ti porta alla stazione centrale (Rautatientori), nel centro della città, con un treno ogni 10–15 minuti di giorno. In alternativa c'è il bus 615 (circa 40 minuti, stesso biglietto). In tutto calcola 40–50 minuti dall'uscita dell'aeroporto.",
 tk:"Biglietto: l'aeroporto è nella zona C, quindi serve il biglietto ABC dell'azienda dei trasporti HSL, che costa 4,50 € nell'app, alle macchinette o con la tessera HSL, e 4,80 € se paghi in contactless con la carta direttamente ai varchi (prezzi HSL dal 1° gennaio 2026). Vale 90 minuti e si usa anche per metro, tram e bus del centro. Il biglietto AB da 3,30 € non basta per l'aeroporto. Il taxi costa di solito 35–55 € ed è molto più caro del treno.",
 gm:"Lentoaseman asema, Vantaa",
 tips:["Compra il biglietto ABC prima di salire sul treno (app HSL, macchinetta o contactless ai varchi): senza biglietto i controllori fanno una multa di 100 € (importo da controllare).","Nei giorni di maltempo o di lavori sulla linea ferroviaria la frequenza dei treni cambia: guarda l'app HSL o hsl.fi il giorno prima.","Il treno I e il treno P hanno lo stesso prezzo e arrivano alla stazione centrale: prendi il primo che parte."]}
};
/* linee (tracciati indicativi) */
var SEG={
tr:{c:"#8c4799",n:"Treno I / P dall'aeroporto",p:[[60.3172,24.9633,"Aeroporto",2],[60.1990,24.9335,"Pasila",2],[60.1719,24.9414,"Stazione centrale",2]]},
fe:{c:"#1f5fa8",n:"Traghetto per Suomenlinna",p:[[60.1670,24.9560,"Kauppatori",2],[60.1450,24.9890,"Suomenlinna",2]]},
tm:{c:"#00985f",n:"Tram e bus HSL",p:[[60.1719,24.9414,"Stazione centrale",2],[60.1670,24.9560,"Kauppatori",2]]}
};
var START=[60.1719,24.9414];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
senate:{t:"Piazza del Senato e Cattedrale",z:"A",p:1,min:45,id:60,max:100,pos:[60.1704,24.9522],q:"Helsinki Cathedral",cls:"walk",sun:1,
 d:"Il cuore storico di Helsinki: la grande piazza neoclassica con la Cattedrale luterana bianca dalla cupola verde, in cima a una scalinata, e intorno l'Università e il Palazzo del Governo. È l'immagine più famosa della città.",
 m:"La piazza si vede gratis in ogni momento. Dentro la cattedrale l'ingresso è a pagamento per gli adulti: 8 € dal 1° settembre al 31 ottobre (gratis sotto i 18 anni), con la mostra Helios di Luke Jerram esposta fino al 1° novembre; la cripta è gratuita fino al 31 ottobre. Gli orari d'autunno non sono pubblicati sulla pagina che ho letto (in estate lunedì–giovedì 9–18, venerdì 9–14, domenica 12–17): controlla helsingintuomiokirkko.fi. La chiesa chiude ai visitatori durante le funzioni."},
suomenlinna:{t:"Suomenlinna, la fortezza sul mare",z:"F",p:1,min:150,id:210,max:300,pos:[60.1450,24.9890],q:"Suomenlinna, Helsinki",cls:"",sun:1,
 win:function(){return[10*60,17*60]},
 d:"Un'isola fortificata del Settecento, patrimonio dell'Unesco, a 15 minuti di traghetto dal centro. Si cammina tra bastioni, cannoni, gallerie e casette di legno colorate, con vista sul mare e sul Golfo di Finlandia. Ci vivono ancora circa 800 persone.",
 m:"Il traghetto di linea parte tutto l'anno dal Kauppatori (lato est, davanti al Palazzo Presidenziale): vale il biglietto AB (3,30 € nell'app o alle macchinette, 3,50 € in contactless) e non si compra a bordo. Da fine ottobre c'è almeno una corsa all'ora. Il Centro visitatori è aperto ogni giorno 10–16. L'isola si gira gratis; i musei (Museo di Suomenlinna e Museo militare aperti tutto l'anno, il sommergibile Vesikko e il Museo Ehrensvärd solo d'estate) hanno biglietti a parte, da confermare su suomenlinna.fi. D'autunno e d'inverno fa freddo e vento e molti caffè sono chiusi: vestiti a strati."},
uspenski:{t:"Cattedrale Uspenski",z:"F",p:2,min:25,id:40,max:60,pos:[60.1676,24.9588],q:"Uspenski Cathedral, Helsinki",cls:"",cl:[0],sun:1,
 win:function(wd){return wd===5?[9*60+30,14*60]:wd===6?[12*60,15*60]:[9*60+30,16*60]},
 d:"La più grande chiesa di rito greco-russo dell'Europa occidentale, in mattoni rossi con tredici cupole dorate a cipolla, sulla collina di Katajanokka. Dentro ci sono icone dorate, lampadari e un'atmosfera raccolta, molto diversa dalla cattedrale luterana.",
 m:"Chiusa il lunedì. Orari da una guida di viaggio (da confermare su hos.fi/uspenski): martedì–venerdì 9:30–16, sabato 9:30–14, domenica 12–15. L'ingresso è gratuito secondo una guida, mentre un'altra riporta un biglietto d'ingresso di 5 €: controlla il giorno prima. Durante le funzioni religiose non si visita."},
kauppatori:{t:"Kauppatori e Vecchio mercato coperto",z:"A",p:2,min:45,id:75,max:120,pos:[60.1670,24.9540],q:"Kauppatori, Helsinki",cls:"walk",
 win:function(wd){return wd===6?[10*60,17*60]:[8*60,18*60]},
 d:"La piazza del mercato davanti al porto, con i banchi del pesce, e accanto il Vecchio mercato coperto (Vanha Kauppahalli) del 1889: un salone di mattoni con banchi di salmone affumicato, formaggi, pasticcini e piatti caldi, tra cui la zuppa di salmone con pane a volontà.",
 m:"Il Vecchio mercato coperto è aperto dal lunedì al sabato 8–18 (la domenica la guida riporta 10–17, da confermare); sabato 31 ottobre apre con orario speciale 10–17. I banchi all'aperto in piazza lavorano soprattutto d'estate e a ottobre molti sono chiusi o ridotti. Quasi tutti i banchi accettano la carta."},
ateneum:{t:"Ateneum, il museo d'arte finlandese",z:"A",p:3,min:75,id:100,max:150,pos:[60.1700,24.9439],q:"Ateneum, Helsinki",cls:"",cl:[0],sun:1,tk:[23,"Ateneum (circa 23 €)",1,1],
 win:function(wd){return wd===5||wd===6?[10*60,17*60]:(wd===2||wd===3)?[10*60,20*60]:[10*60,18*60]},
 d:"Il museo nazionale d'arte classica, in un palazzo neoclassico di fronte alla stazione. Raccoglie la pittura finlandese dell'Ottocento e del primo Novecento (Gallen-Kallela, Schjerfbeck) e opere di Van Gogh, Cézanne e Munch.",
 m:"Chiuso il lunedì. Orari: martedì e venerdì 10–18, mercoledì e giovedì 10–20, sabato e domenica 10–17 (dalla scheda dei musei finlandesi, museot.fi). Il biglietto sta intorno ai 23 €: la scheda riporta «23/21/13/0 €» senza dire a quale categoria si riferisce, quindi controlla il prezzo su ateneum.fi. I minori di 18 anni entrano gratis."},
temppeliaukio:{t:"Chiesa nella roccia (Temppeliaukio)",z:"D",p:2,min:30,id:45,max:70,pos:[60.1731,24.9255],q:"Temppeliaukio Church, Helsinki",cls:"",sun:1,tk:[8,"Chiesa nella roccia (8 €)",1,1],
 win:function(wd){return wd===6?[12*60,17*60]:[9*60,16*60]},
 d:"Una chiesa luterana scavata nella roccia viva e coperta da una cupola di rame, con la luce che entra da una fascia di vetro tutt'intorno. Le pareti sono di granito grezzo e l'acustica è così buona che ci fanno concerti.",
 m:"Aperta lunedì–sabato 9–16, domenica 12–17 (museot.fi; l'ultimo ingresso è 10 minuti prima della chiusura). Biglietto 8 €, gratis sotto i 18 anni. È chiusa ai visitatori durante matrimoni, battesimi, funerali e la messa della domenica (ore 10, circa un'ora e mezza): gli orari vengono aggiornati ogni settimana su temppeliaukionkirkko.fi."},
oodi:{t:"Oodi, la biblioteca centrale",z:"B",p:3,min:30,id:40,max:70,pos:[60.1740,24.9381],q:"Oodi Helsinki Central Library",cls:"",sun:1,
 win:function(wd){return wd>=5?[10*60,20*60]:[8*60,21*60]},
 d:"La biblioteca del 2018, un edificio di legno e vetro a forma di onda davanti al Parlamento. Dentro ci sono libri, una sala cinema, una terrazza panoramica sopra la piazza e spazi dove le persone lavorano o suonano. L'ingresso è libero per tutti.",
 m:"Aperta lunedì–venerdì 8–21, sabato e domenica 10–20 (sito oodihelsinki.fi, orari straordinari per i festivi). L'ingresso è gratuito; il terzo piano, con il caffè e la terrazza, è aperto a tutti."},
kiasma:{t:"Kiasma, il museo d'arte contemporanea",z:"A",p:4,min:60,id:90,max:130,pos:[60.1716,24.9376],q:"Kiasma, Helsinki",cls:"",cl:[0],sun:1,tk:[23,"Kiasma (circa 23 €)",1,1],
 win:function(wd){return wd===5||wd===6?[10*60,17*60]:(wd===1||wd===4)?[10*60,20*60]:[10*60,18*60]},
 d:"Il museo di arte contemporanea finlandese e internazionale, in un edificio curvo di Steven Holl a pochi passi dalla stazione. Le mostre cambiano spesso: video, installazioni, fotografia e pittura.",
 m:"Chiuso il lunedì. Orari: martedì e venerdì 10–20, mercoledì e giovedì 10–18, sabato e domenica 10–17 (museot.fi). Il biglietto sta intorno ai 23 €: la scheda riporta «23/13/0 €» senza specificare le categorie, quindi controlla il prezzo su kiasma.fi. Venerdì 6 novembre e venerdì 4 dicembre 2026 l'ingresso è gratuito."},
sibelius:{t:"Monumento a Sibelius",z:"D",p:4,min:30,id:45,max:70,pos:[60.1827,24.9136],q:"Sibelius Monument, Helsinki",cls:"walk",sun:1,
 d:"Il monumento al compositore Jean Sibelius, scolpito da Eila Hiltunen nel 1967: seicento tubi d'acciaio saldati insieme che ricordano le canne di un organo, in un parco sul mare. Vicino c'è la testa in bronzo del compositore.",
 m:"Il parco e il monumento sono sempre accessibili e gratuiti. In autunno e inverno il parco è buio nel tardo pomeriggio. Il caffè Regatta, a pochi passi, è aperto tutto l'anno."},
esplanadi:{t:"Esplanadi e Via Pohjoisesplanadi",z:"A",p:3,min:30,id:50,max:80,pos:[60.1680,24.9475],q:"Esplanadi, Helsinki",cls:"walk",sun:1,
 d:"Il lungo viale alberato nel centro, con aiuole, panchine, musicisti di strada e ai lati i negozi di design. Va dalla piazza del Teatro Svedese fino al Kauppatori e si percorre in meno di dieci minuti.",
 m:"Il parco è aperto sempre e gratis. I negozi sono aperti di solito lunedì–venerdì 10–19, sabato 10–18, domenica spesso 12–16. In inverno, tra fine novembre e Natale, si accende l'illuminazione natalizia."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","ateneum",3,"walk","A piedi dalla stazione centrale attraversando Rautatientori, circa 3 minuti.","A piedi fino alla stazione centrale, circa 3 minuti.",{f:[W([[60.1719,24.9414],[60.1710,24.9425],[60.1700,24.9439]])],r:[W([[60.1700,24.9439],[60.1710,24.9425],[60.1719,24.9414]])]});
P2("start","kiasma",6,"walk","A piedi lungo Mannerheimintie fino a Kiasma, circa 6 minuti.","A piedi lungo Mannerheimintie fino alla stazione, circa 6 minuti.",{f:[W([[60.1719,24.9414],[60.1717,24.9395],[60.1716,24.9376]])],r:[W([[60.1716,24.9376],[60.1717,24.9395],[60.1719,24.9414]])]});
P2("start","oodi",9,"walk","A piedi lungo Mannerheimintie e il Parlamento fino a Oodi, circa 9 minuti.","A piedi dalla biblioteca Oodi alla stazione centrale, circa 9 minuti.",{f:[W([[60.1719,24.9414],[60.1735,24.9395],[60.1740,24.9381]])],r:[W([[60.1740,24.9381],[60.1735,24.9395],[60.1719,24.9414]])]});
P2("start","esplanadi",10,"walk","A piedi per Aleksanterinkatu fino a Esplanadi, circa 10 minuti.","A piedi per Aleksanterinkatu fino alla stazione, circa 10 minuti.",{f:[W([[60.1719,24.9414],[60.1700,24.9445],[60.1680,24.9475]])],r:[W([[60.1680,24.9475],[60.1700,24.9445],[60.1719,24.9414]])]});
P2("start","senate",15,"walk","A piedi per Aleksanterinkatu fino alla Piazza del Senato, circa 15 minuti.","A piedi per Aleksanterinkatu fino alla stazione, circa 15 minuti.",{f:[W([[60.1719,24.9414],[60.1708,24.9470],[60.1704,24.9522]])],r:[W([[60.1704,24.9522],[60.1708,24.9470],[60.1719,24.9414]])]});
P2("start","kauppatori",20,"walk","A piedi per Esplanadi fino al Kauppatori, circa 20 minuti. In alternativa un tram dalla stazione fino al porto (controlla la linea nell'app HSL).","A piedi per Esplanadi fino alla stazione, circa 20 minuti.",{f:[W([[60.1719,24.9414],[60.1690,24.9475],[60.1670,24.9540]])],r:[W([[60.1670,24.9540],[60.1690,24.9475],[60.1719,24.9414]])]});
P2("start","suomenlinna",40,"metro","Dalla stazione centrale a piedi o in tram fino al Kauppatori (circa 20 minuti), poi traghetto HSL per Suomenlinna (circa 15 minuti, biglietto AB).","Traghetto HSL fino al Kauppatori (circa 15 minuti), poi a piedi o in tram fino alla stazione.",{f:[["tm","Stazione centrale","Kauppatori"],["fe","Kauppatori","Suomenlinna"]],r:[["fe","Suomenlinna","Kauppatori"],["tm","Kauppatori","Stazione centrale"]]});
P2("start","uspenski",25,"walk","A piedi per Aleksanterinkatu e il ponte di Katajanokka fino alla cattedrale Uspenski, circa 25 minuti.","A piedi fino alla stazione centrale, circa 25 minuti.",{f:[W([[60.1719,24.9414],[60.1700,24.9520],[60.1676,24.9588]])],r:[W([[60.1676,24.9588],[60.1700,24.9520],[60.1719,24.9414]])]});
P2("start","temppeliaukio",24,"walk","A piedi lungo Mannerheimintie e Lutherinkatu fino alla chiesa nella roccia, circa 24 minuti. In alternativa un autobus lungo Mannerheimintie (controlla l'app HSL).","A piedi fino alla stazione centrale, circa 24 minuti.",{f:[W([[60.1719,24.9414],[60.1725,24.9330],[60.1731,24.9255]])],r:[W([[60.1731,24.9255],[60.1725,24.9330],[60.1719,24.9414]])]});
P2("start","sibelius",25,"metro","Autobus 24 dalla stazione centrale fino al parco Sibelius (circa 20 minuti), poi 3 minuti a piedi. Controlla la linea e la fermata nell'app HSL.","Autobus dal parco Sibelius alla stazione centrale, circa 25 minuti.",{f:[W([[60.1719,24.9414],[60.1790,24.9250],[60.1827,24.9136]])],r:[W([[60.1827,24.9136],[60.1790,24.9250],[60.1719,24.9414]])]});
P2("senate","kauppatori",8,"walk","A piedi per Unioninkatu fino al Kauppatori, circa 8 minuti.","A piedi per Unioninkatu fino alla Piazza del Senato, circa 8 minuti.",{f:[W([[60.1704,24.9522],[60.1688,24.9532],[60.1670,24.9540]])],r:[W([[60.1670,24.9540],[60.1688,24.9532],[60.1704,24.9522]])]});
P2("kauppatori","uspenski",10,"walk","A piedi lungo il porto e il ponte di Katajanokka fino alla cattedrale Uspenski, circa 10 minuti.","A piedi fino al Kauppatori, circa 10 minuti.",{f:[W([[60.1670,24.9540],[60.1675,24.9570],[60.1676,24.9588]])],r:[W([[60.1676,24.9588],[60.1675,24.9570],[60.1670,24.9540]])]});
P2("senate","uspenski",12,"walk","A piedi per Unioninkatu e il ponte di Katajanokka fino alla cattedrale Uspenski, circa 12 minuti.","A piedi fino alla Piazza del Senato, circa 12 minuti.",{f:[W([[60.1704,24.9522],[60.1690,24.9560],[60.1676,24.9588]])],r:[W([[60.1676,24.9588],[60.1690,24.9560],[60.1704,24.9522]])]});
P2("kauppatori","suomenlinna",25,"metro","Traghetto HSL dal Kauppatori a Suomenlinna, circa 15 minuti più l'attesa (biglietto AB).","Traghetto HSL da Suomenlinna al Kauppatori, circa 15 minuti più l'attesa.",{f:[["fe","Kauppatori","Suomenlinna"]],r:[["fe","Suomenlinna","Kauppatori"]]});
P2("kauppatori","esplanadi",6,"walk","A piedi lungo Esplanadi, circa 6 minuti.","A piedi lungo Esplanadi fino al Kauppatori, circa 6 minuti.",{f:[W([[60.1670,24.9540],[60.1675,24.9505],[60.1680,24.9475]])],r:[W([[60.1680,24.9475],[60.1675,24.9505],[60.1670,24.9540]])]});
P2("esplanadi","ateneum",8,"walk","A piedi per Mikonkatu fino all'Ateneum, circa 8 minuti.","A piedi per Mikonkatu fino a Esplanadi, circa 8 minuti.",{f:[W([[60.1680,24.9475],[60.1690,24.9455],[60.1700,24.9439]])],r:[W([[60.1700,24.9439],[60.1690,24.9455],[60.1680,24.9475]])]});
P2("ateneum","kiasma",6,"walk","A piedi lungo Mannerheimintie fino a Kiasma, circa 6 minuti.","A piedi lungo Mannerheimintie fino all'Ateneum, circa 6 minuti.",{f:[W([[60.1700,24.9439],[60.1708,24.9408],[60.1716,24.9376]])],r:[W([[60.1716,24.9376],[60.1708,24.9408],[60.1700,24.9439]])]});
P2("kiasma","oodi",5,"walk","A piedi dietro il Parlamento fino a Oodi, circa 5 minuti.","A piedi fino a Kiasma, circa 5 minuti.",{f:[W([[60.1716,24.9376],[60.1728,24.9378],[60.1740,24.9381]])],r:[W([[60.1740,24.9381],[60.1728,24.9378],[60.1716,24.9376]])]});
P2("oodi","temppeliaukio",13,"walk","A piedi lungo Töölönkatu e Lutherinkatu fino alla chiesa nella roccia, circa 13 minuti.","A piedi fino a Oodi, circa 13 minuti.",{f:[W([[60.1740,24.9381],[60.1735,24.9320],[60.1731,24.9255]])],r:[W([[60.1731,24.9255],[60.1735,24.9320],[60.1740,24.9381]])]});
P2("temppeliaukio","sibelius",35,"walk","A piedi per Nordenskiöldinkatu e il parco fino al monumento a Sibelius, circa 35 minuti. In alternativa autobus (controlla l'app HSL).","A piedi fino alla chiesa nella roccia, circa 35 minuti.",{f:[W([[60.1731,24.9255],[60.1790,24.9190],[60.1827,24.9136]])],r:[W([[60.1827,24.9136],[60.1790,24.9190],[60.1731,24.9255]])]});
P2("ateneum","senate",14,"walk","A piedi per Aleksanterinkatu fino alla Piazza del Senato, circa 14 minuti.","A piedi per Aleksanterinkatu fino all'Ateneum, circa 14 minuti.",{f:[W([[60.1700,24.9439],[60.1702,24.9480],[60.1704,24.9522]])],r:[W([[60.1704,24.9522],[60.1702,24.9480],[60.1700,24.9439]])]});
/* ritorno in aeroporto: treno I o P dalla stazione centrale */
var RET={
HEL:{
 A:{min:45,txt:"A piedi o in tram fino alla stazione centrale di Helsinki, poi treno I o P per l'aeroporto (circa 27–32 minuti, un treno ogni 10–15 minuti di giorno). Biglietto ABC da 4,50 € (4,80 € in contactless): il biglietto AB da 3,30 € non vale fino all'aeroporto. In alternativa il bus 615 (circa 40 minuti, stesso biglietto) o il taxi (35–55 €).",g:[["tr","Stazione centrale","Aeroporto"]]}}
};
var ARR={
HEL:[["tr","Aeroporto","Stazione centrale"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti: da confermare */
var V={
ekberg:{n:"Ekberg",a:"Bulevardi 9",z:"B",r:"4,4",pos:[60.1647,24.9347],h:["08:00-19:00","08:00-19:00","08:00-19:00","08:00-19:00","08:00-21:00","09:00-21:00","09:00-18:00"],
 d:"La pasticceria e il caffè più antichi della Finlandia, aperti dal 1861 in una via alberata di Punavuori: colazione a buffet ogni giorno, torte e pane fresco dal forno accanto, e a pranzo piatti semplici della cucina finlandese.",pr:"Una colazione a buffet sta intorno ai 15–20 € e un caffè con un dolce intorno ai 8–10 € (listino non visto). Orari estivi (fino al 6 settembre) da ekberg.fi: in autunno possono cambiare, da confermare."},
soppa:{n:"Soppakeittiö (Vecchio mercato coperto)",a:"Eteläranta 18, dentro il Vanha Kauppahalli",z:"A",r:"4,3",pos:[60.1666,24.9534],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","10:00-17:00"],
 d:"Il banco di zuppe del mercato coperto: la lohikeitto, la zuppa cremosa di salmone con patate ed erba cipollina, si mangia con pane di segale a volontà, seduti ai tavolini accanto al banco.",pr:"Una zuppa di salmone sta intorno agli 11–13 € (cifra di una guida, listino non visto). Gli orari sono quelli del mercato coperto: il singolo banco può chiudere prima, da confermare."},
regatta:{n:"Cafe Regatta",a:"Merikannontie 8",z:"D",r:"4,5",pos:[60.1786,24.9093],h:["08:00-21:00","08:00-21:00","08:00-21:00","08:00-21:00","08:00-21:00","08:00-21:00","10:00-20:00"],
 d:"Una piccola casetta rossa di legno sul mare a Töölö, con un interno di campagna d'altri tempi: korvapuusti (rotoli alla cannella) appena sfornati, caffè e, nel cortile, salsicce da grigliare sul fuoco. I prezzi sono popolari.",pr:"Un caffè con un rotolo alla cannella sta intorno ai 7–9 € (listino non visto). Orari da guide, da confermare; posizione indicativa."},
aalto:{n:"Café Aalto",a:"Pohjoisesplanadi 39, nella libreria Akateeminen",z:"A",r:"4,3",pos:[60.1693,24.9455],h:["09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","09:00-20:00","11:00-18:00","11:00-18:00"],
 d:"Il caffè al primo piano della libreria Akateeminen, nell'edificio disegnato da Alvar Aalto: sale luminose con lucernari, sedie di design e una carta di panini, zuppe e dolci. Si può restare a leggere ore con una sola consumazione.",pr:"Un caffè con una fetta di torta sta intorno ai 9–11 € e un panino intorno ai 10–14 € (listino non visto). Orari da una guida (il sabato è lo stesso della domenica, da confermare)."},
hakan:{n:"Hakaniemi Market Hall (banchi del pranzo)",a:"Hämeentie 1 A",z:"C",r:"4,3",pos:[60.1790,24.9515],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00",""],
 d:"Il mercato coperto del quartiere di Kallio, meno turistico di quello del porto: banchi di pesce, formaggi, pane e pasticcini, e al piano di sopra i banchi del pranzo con piatti casalinghi finlandesi e di altre cucine, a prezzi popolari.",pr:"Un pranzo sta intorno ai 10–15 € (listino non visto). Aperto dal lunedì al sabato 8–18; sabato 31 ottobre il mercato coperto è chiuso (dal sito del mercato). Orari dei singoli banchi da confermare."},
savotta:{n:"Ravintola Savotta",a:"Aleksanterinkatu 22",z:"A",r:"4,2",pos:[60.1707,24.9519],h:["12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","12:00-23:00","18:00-22:00"],
 d:"Un ristorante di cucina tradizionale finlandese in un palazzo affacciato sulla Piazza del Senato, dentro a un ambiente da baita di legno: menu corto con piatti nordici come renna, pesce di lago e zuppa di salmone, e birra locale.",pr:"Un piatto principale sta intorno ai 25–35 € (listino non visto: il prezzo è una stima). Orari da una guida, da confermare."},
seahorse:{n:"Sea Horse (Merihevonen)",a:"Kapteeninkatu 11",z:"F",r:"4,4",pos:[60.1623,24.9556],h:["12:00-22:00","12:00-22:00","12:00-23:00","12:00-23:00","12:00-23:00","15:00-23:00","15:00-22:00"],
 d:"Una trattoria del 1934 vicino al porto, conosciuta dai finlandesi per l'onion steak e per il pesce: aringhe fritte del Baltico, vorschmack e un classico «Wienerschnitzel». Nelle sere da mercoledì a sabato il guardaroba costa 2,50 € in più.",pr:"Un piatto principale sta intorno ai 20–30 € (listino non visto: il prezzo è una stima). Orari dal sito del locale; la cucina chiude un'ora e mezza prima."},
fazer:{n:"Karl Fazer Café",a:"Kluuvikatu 3",z:"A",r:"4,4",pos:[60.1691,24.9459],h:["07:30-22:00","07:30-22:00","07:30-22:00","07:30-22:00","07:30-22:00","10:00-20:00","10:00-20:00"],
 d:"Il caffè storico della famiglia del cioccolato Fazer, dal 1891, a due passi dall'Esplanadi: sale ampie con tavolini di marmo, torte, pasticcini e una colazione ricca. Il cioccolato Fazer si compra nel negozio all'ingresso.",pr:"Un caffè con una torta sta intorno ai 9–12 € (listino non visto). Orari lunedì–venerdì e domenica da una guida; il sabato è lo stesso della domenica, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["aalto","fazer","ekberg"],B:["ekberg","aalto"],C:["hakan","ekberg"],D:["regatta","aalto"],F:["soppa","fazer"]},
pra:{A:["soppa","aalto","fazer"],B:["ekberg","aalto"],C:["hakan","soppa"],D:["regatta","aalto"],F:["soppa","seahorse"]},
cen:{A:["savotta","seahorse"],B:["seahorse","savotta"],C:["seahorse","savotta"],D:["savotta","seahorse"],F:["seahorse","savotta"]},
snk:{A:["fazer","aalto","soppa"],B:["ekberg","aalto"],C:["hakan","ekberg"],D:["regatta","aalto"],F:["fazer","aalto"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Piazza del Senato, Uspenski e Kauppatori",acts:["senate","uspenski","kauppatori"],need:150,core:1},
{id:"suo",t:"Suomenlinna",acts:["suomenlinna"],need:200,core:1},
{id:"arte",t:"Ateneum, Kiasma e Oodi",acts:["ateneum","kiasma","oodi"],need:190,core:1},
{id:"roccia",t:"Chiesa nella roccia e Sibelius",acts:["temppeliaukio","sibelius"],need:100},
{id:"espl",t:"Esplanadi e negozi di design",acts:["esplanadi"],need:40}
];
var ORDER=["senate","suomenlinna","kauppatori","uspenski","temppeliaukio","ateneum","oodi","esplanadi","kiasma","sibelius"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cen","Centro (Kluuvi, Kruununhaka, Kaartinkaupunki)",[60.1695,24.9505],"A"],
["kam","Kamppi e Punavuori (Design District)",[60.1650,24.9390],"B"],
["kal","Kallio e Hakaniemi",[60.1840,24.9500],"C"],
["too","Töölö",[60.1770,24.9220],"D"],
["kat","Katajanokka e Ullanlinna",[60.1670,24.9650],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[60.1699,24.9384],""]
];
/* imposta di soggiorno: Helsinki non ne prevede */
var TAX=[["h3","Qualsiasi alloggio (hotel, B&B, appartamento)",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Aamiainen","la colazione finlandese: pane di segale con formaggio e burro, uova, porridge e caffè."],["Korvapuusti ja kahvi","un rotolo alla cannella con un caffè filtro."],["Karjalanpiirakka","un pasticcino salato di segale con riso, da mangiare con burro all'uovo."]],
pra:[["Lohikeitto","zuppa di salmone cremosa con pane di segale."],["Kalakukko","pasticcio di pane di segale ripieno di pesce e pancetta."],["Poronkäristys","renna saltata con purè di patate e mirtilli rossi."],["Lihapiirakka","focaccia fritta ripiena di carne e riso, da mangiare con senape."]],
cen:[["Lohikeitto","zuppa di salmone con pane di segale, il piatto simbolo."],["Poronkäristys","renna saltata con purè di patate e mirtilli rossi."],["Karjalanpaisti","spezzatino di carne di maiale e di manzo, cotto a lungo."],["Silakka","aringa del Baltico fritta, con purè di patate."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","La Cattedrale dalla scalinata","Foto","La facciata bianca con la cupola verde vista dalla Piazza del Senato, meglio al mattino con il sole di lato.",[60.1704,24.9522],"Helsinki Cathedral","senate"],
["🤳","Statua di Alessandro II","Selfie","La statua dello zar al centro della piazza, con la cattedrale alle spalle.",[60.1700,24.9525],"Senate Square, Helsinki","senate"],
["📷","Le cupole dorate di Uspenski","Foto","Le tredici cupole a cipolla sopra i mattoni rossi, vista dal lato del porto.",[60.1676,24.9588],"Uspenski Cathedral, Helsinki","uspenski"],
["📷","Il porto e il Kauppatori","Foto","Le barche, i gabbiani e i banchi colorati davanti al Palazzo Presidenziale.",[60.1670,24.9540],"Kauppatori, Helsinki","kauppatori"],
["🤳","Il traghetto per Suomenlinna","Selfie","Il ponte del traghetto con il porto di Helsinki che si allontana alle spalle.",[60.1670,24.9560],"Kauppatori ferry Suomenlinna","suomenlinna"],
["📷","Il Cancello del Re","Foto","La porta di granito sull'isola, dove attraccava l'imbarcazione dei re.",[60.1440,24.9895],"King's Gate Suomenlinna","suomenlinna"],
["📷","I cannoni sul bastione","Foto","I cannoni puntati sul mare, con il golfo e le isole all'orizzonte.",[60.1420,24.9880],"Suomenlinna Kustaanmiekka","suomenlinna"],
["📷","La cupola della chiesa nella roccia","Foto","Il soffitto di rame visto dall'interno, con la luce che filtra dai vetri.",[60.1731,24.9255],"Temppeliaukio Church, Helsinki","temppeliaukio"],
["📷","La scalinata dell'Ateneum","Foto","La facciata neoclassica illuminata di sera sulla piazza della stazione.",[60.1700,24.9439],"Ateneum, Helsinki","ateneum"],
["🤳","La stazione centrale","Selfie","Le due coppie di giganti con le lampade in granito all'ingresso principale, un simbolo di Helsinki.",[60.1719,24.9414],"Helsinki Central Station","ateneum"],
["📷","La terrazza di Oodi","Foto","La vista sul Parlamento e sul centro dal balcone di legno al terzo piano.",[60.1740,24.9381],"Oodi Helsinki Central Library","oodi"],
["📷","I tubi di Sibelius","Foto","Il monumento visto da sotto, con il cielo che passa tra i tubi d'acciaio.",[60.1827,24.9136],"Sibelius Monument, Helsinki","sibelius"],
["📷","Esplanadi in autunno","Foto","Il viale con gli alberi gialli e rossi e i caffè ai lati, in ottobre.",[60.1680,24.9475],"Esplanadi, Helsinki","esplanadi"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-11-01",t:"Cattedrale di Helsinki: mostra Helios e ingresso a pagamento",x:"Fino al 1° novembre 2026 nella cattedrale luterana c'è la mostra Helios di Luke Jerram. Dal 1° settembre al 31 ottobre l'ingresso per gli adulti costa 8 €; la cripta è gratuita fino al 31 ottobre. Gli orari d'autunno non sono pubblicati sulla pagina che ho letto: controlla helsingintuomiokirkko.fi."},
{from:"2026-10-13",to:"2026-11-01",t:"Mercati coperti: orari speciali il 23 e il 31 ottobre",x:"Il Vecchio mercato coperto apre sabato 31 ottobre solo dalle 10 alle 17; il mercato coperto di Hakaniemi resta chiuso quel giorno (venerdì 23 ottobre rimane aperto fino alle 21)."},
{from:"2026-10-13",to:"2026-12-06",t:"Kiasma: ingressi gratuiti il 6 novembre e il 4 dicembre",x:"Il museo d'arte contemporanea Kiasma ha ingresso gratuito venerdì 6 novembre e venerdì 4 dicembre 2026. È chiuso ogni lunedì, come l'Ateneum."},
{from:"2026-10-13",to:"2027-03-31",t:"Buio presto e traghetti più rari",x:"A metà ottobre il sole tramonta intorno alle 18, a fine novembre prima delle 16. Il traghetto per Suomenlinna continua tutto l'anno, in inverno con almeno una corsa all'ora; i caffè dell'isola sono in gran parte chiusi. Il Centro visitatori è aperto ogni giorno 10–16."},
{from:"2026-12-01",to:"2026-12-27",t:"Indipendenza e Natale: negozi e musei chiusi",x:"Il 6 dicembre (Festa dell'Indipendenza), il 24, il 25 e il 26 dicembre la maggior parte dei negozi, dei musei e dei ristoranti è chiusa o ha orari ridotti. Il mercatino di Natale della Piazza del Senato apre di solito all'inizio di dicembre: le date 2026 non le ho trovate, controllale su myhelsinki.fi."}
];
/* clima medio di Helsinki (indicativo, massime/minime) */
var CLIM=[[-2,-7],[-2,-8],[2,-4],[8,1],[15,6],[19,10],[22,14],[20,13],[15,9],[9,4],[4,1],[0,-3]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Helsinki: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="ateneum"&&(WD===2||WD===3))meta+=" Oggi è "+(WD===2?"mercoledì":"giovedì")+": l'Ateneum resta aperto fino alle 20.";
if(it.id==="kiasma"&&(WD===1||WD===4))meta+=" Oggi è "+(WD===1?"martedì":"venerdì")+": Kiasma resta aperto fino alle 20.";
if(it.id==="uspenski"&&WD===6)meta+=" Oggi è domenica: la cattedrale Uspenski apre solo dalle 12 alle 15.";
if(it.id==="kauppatori"&&WD===6)meta+=" Oggi è domenica: il mercato coperto ha orario ridotto (10–17).";
if(it.id==="temppeliaukio"&&WD===6)meta+=" Oggi è domenica: la messa delle 10 dura circa un'ora e mezza, quindi la chiesa apre solo dalle 12.";
return meta}
Object.assign(C,{id:"helsinki",n:"Helsinki",cn:"Finlandia",e:"🦌",flag:"🇫🇮",col:["#1f5fa8","#e8e8e8","#5a8fc4"],k:"helsinki finlandia finland",
TZ:"Europe/Helsinki",LL:[60.1699,24.9384],CC:"fi",QN:"Helsinki",BK:"Helsinki",ARE:/helsinki|helsingfors|\b00[0-9]{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"fi-FI",LANGN:"finlandese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
hub:{n:"Stazione centrale",q:"Helsinki Central Railway Station"},
SINGLE:{acts:["senate","uspenski","kauppatori","esplanadi","ateneum"],ins:[]},
EXCL:[],
DICON:{suomenlinna:"🏰",uspenski:"⛪",kauppatori:"🐟",ateneum:"🖼️",temppeliaukio:"🪨",oodi:"📚",kiasma:"🎨",sibelius:"🎼",esplanadi:"🌳"},
ZN:{A:"nel centro",B:"a Kamppi e Punavuori",C:"a Kallio e Hakaniemi",D:"a Töölö",F:"a Katajanokka e Ullanlinna"},
NEAR:{col:"caffè",pra:"locale veloce o mercato coperto",cen:"ristorante",snk:"caffè"},
SE:{ekberg:"🥐",soppa:"🍲",regatta:"🥮",aalto:"☕",hakan:"🥖",savotta:"🦌",seahorse:"🐟",fazer:"🍫"},
TR:{one:3.3,lbl:"Tram, metro, bus e traghetti (HSL, zone AB)",
 air:{HEL:{one:4.5,n:"Treno per l'aeroporto (biglietto ABC, 4,50 €)"}},
 passes:[],
 note:"Prezzi dal sito HSL, tariffa del 1° gennaio 2026: biglietto singolo AB 3,30 € (nell'app, alle macchinette o con la tessera HSL) o 3,50 € se paghi in contactless con la carta; ABC 4,50 € (4,80 € in contactless). Il biglietto vale 90 minuti su tram, metro, bus, treni urbani e traghetto per Suomenlinna. Esistono anche i biglietti giornalieri, da 1 a 13 giorni, e la Helsinki Card: non ho trovato i prezzi aggiornati, controllali su hsl.fi o nell'app HSL e valuta se conviene in base a quante corse fai. L'aeroporto è nella zona C: serve il biglietto ABC, l'AB non basta."},
FOOD:{co:[12,"Colazione al caffè"],pr:[14,"Pranzo (mercato coperto o zuppa)"],ce:[27,"Cena (cucina finlandese)"],sp:[7,"Spuntini e dolci"]},
T:{ride:"In tram, metro o a piedi",move:"tutto a piedi, in tram o in metro",bags:"«Voinko jättää laukut tänne?»",bagsPM:"«Voinko jättää laukut tänne iltapäivään asti?»",bagsAM:"«Voinko jättää laukut tänne puoleenpäivään asti?»",
pra:"Un mercato coperto o un locale veloce",praZ:{A:"Intorno alla Piazza del Senato e a Esplanadi i ristoranti sulla piazza sono per turisti e costano molto: per un pasto vero scegli i banchi del mercato coperto o i locali nelle vie laterali.",C:"A Kallio e Hakaniemi i prezzi sono più bassi che in centro: il mercato coperto di Hakaniemi è un buon posto per pranzare."},
freeLong:"Qualche idea: una sosta in un caffè con un rotolo alla cannella, una passeggiata sul mare a Töölönlahti, una visita alla biblioteca Oodi o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure siediti in un caffè.",
remind:"Ateneum e Kiasma sono chiusi il lunedì. Compra il biglietto HSL prima di salire sui mezzi: il traghetto per Suomenlinna non vende biglietti a bordo.",
rain1:"Al coperto: l'Ateneum, Kiasma, la biblioteca Oodi, la chiesa nella roccia, il Vecchio mercato coperto e i caffè.",
rainM:"Al coperto: Ateneum, Kiasma, Oodi, chiesa nella roccia, mercato coperto e caffè.",
water:"Riempite la borraccia: l'acqua del rubinetto di Helsinki è tra le più pure al mondo e arriva da un'enorme falda e dal fiume Päijänne. Si beve ovunque: attivate «Acqua» sulla mappa.",
kitchen:"In Finlandia si pranza presto, tra le 11 e le 14, e si cena dalle 17 alle 21: molti ristoranti chiudono la cucina verso le 21–22, e il lunedì alcuni sono chiusi.",
night:[["🍷","Una birra locale o un bicchiere di vino in un locale del centro: gli alcolici si servono nei ristoranti e nei bar; nei negozi si vendono solo birra e sidro leggeri."],["🕙","La cucina chiude presto, spesso alle 21–22; di notte i mezzi pubblici sono pochi, ma di notte girano alcuni tram e autobus (controlla l'app HSL)."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Helsinki è un'ora avanti rispetto all'Italia: sposta l'orologio avanti di un'ora",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per caffè, mercati coperti e ristoranti semplici: una colazione sta intorno ai 10–15 €, una zuppa o un pranzo ai 11–15 € e una cena con un piatto principale ai 25–35 €. La Finlandia è cara, ma si paga quasi dappertutto con la carta e la mancia non è richiesta.",
taxNote:"Helsinki non ha un'imposta di soggiorno: non si paga niente in più oltre al prezzo dell'alloggio.",
mcrit:"Criteri: caffè storici, mercati coperti e ristoranti di cucina finlandese, niente catene. Colazione e cena restano sotto i 15 € e i 35 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il treno I o P per la stazione centrale impiega circa 30 minuti, con un treno ogni 10–15 minuti di giorno: è il modo più semplice per andare in centro.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto HSL ABC per l'aeroporto (4,50 €) e biglietti AB per la città (3,30 €): si comprano nell'app HSL, alle macchinette o in contactless",function(E){return true}],["suo","Biglietto AB per il traghetto di Suomenlinna (non si compra a bordo)",["suomenlinna"]],["ate","Biglietto per l'Ateneum (circa 23 €); chiuso il lunedì",["ateneum"]],["kia","Biglietto per Kiasma (circa 23 €); chiuso il lunedì",["kiasma"]],["tem","Biglietto per la chiesa nella roccia (8 €)",["temppeliaukio"]],["card","Carta d'identità o passaporto in corso di validità"],["cloth","Giacca a vento e strati caldi: a ottobre e novembre fa freddo e il vento sul mare è forte"]],
NUM:{1:["yhdelle","ÜH-del-le"],2:["kahdelle","KAH-del-le"],3:["kolmelle","KOL-mel-le"],4:["neljälle","NEL-iäl-le"],5:["viidelle","VII-del-le"],6:["kuudelle","KUU-del-le"],7:["seitsemälle","SEI-tse-mäl-le"],8:["kahdeksalle","KAH-dek-sal-le"],9:["yhdeksälle","ÜH-dek-säl-le"],10:["kymmenelle","KÜM-me-nel-le"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Hyvää päivää / Hyvää iltaa","HÜ-vää PAI-vää / HÜ-vää IL-taa"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Pöytä "+nu[0]+", kiitos","PÖ-tü "+nu[1]+", KII-tos"],["Un caffè e un rotolo alla cannella, per favore","Kahvi ja korvapuusti, kiitos","KAH-vi ia KOR-va-puus-ti, KII-tos"],["Acqua del rubinetto, per favore","Hanavettä, kiitos","HA-na-vet-tä, KII-tos"],["Il conto, per favore","Saisinko laskun, kiitos","SAI-sin-ko LAS-kun, KII-tos"],["Posso pagare con la carta?","Voinko maksaa kortilla?","VOI-n-ko MAK-saa KOR-til-la"],["Quanto costa?","Paljonko se maksaa?","PAL-ion-ko se MAK-saa"],["Dov'è la fermata del tram?","Missä on raitiovaunupysäkki?","MIS-sä on RAI-tio-vau-nu-pü-säk-ki"],["Qual è il treno per l'aeroporto?","Mikä juna menee lentokentälle?","MI-kä IU-na ME-nee LEN-to-ken-täl-le"]];
if(M)fr=fr.concat([["Ho una prenotazione","Minulla on varaus","MI-nul-la on VA-raus"],["Posso lasciare i bagagli?","Voinko jättää laukut tänne?","VOI-n-ko IÄT-tää LAU-kut TÄN-ne"],["A che ora è il check-out?","Mihin aikaan on uloskirjautuminen?","MI-hin AI-kaan on U-los-kir-iau-tu-mi-nen"]]);
return fr.concat([["Mi scusi","Anteeksi","AN-teek-si"],["Grazie mille!","Kiitos paljon!","KII-tos PAL-ion"]])},
taxTxt:function(tx){return "Imposta di soggiorno: Helsinki non ne prevede, quindi non si paga niente in più oltre al prezzo dell'alloggio."},
STAYTIPS:["Tram, metro, bus, treni urbani e traghetti si usano con lo stesso biglietto HSL (zone AB per la città, ABC per l'aeroporto). Di notte girano meno mezzi: controlla l'app HSL."],
ZONES:[
["🚇 Tram, metro e biglietti",["Un solo biglietto HSL vale su tram, metro, bus, treni urbani e traghetto per Suomenlinna: AB 3,30 € nell'app o alle macchinette (3,50 € in contactless), ABC 4,50 € (4,80 € in contactless), valido 90 minuti.","Il biglietto si compra prima di salire. I controllori sono in borghese e la multa è di circa 100 € (importo da controllare).","L'aeroporto è in zona C: serve il biglietto ABC, l'AB non basta.","Il centro è piccolo: la maggior parte delle tappe si fa a piedi."]],
["🏛️ Centro: Senato, Uspenski e Kauppatori",["La Piazza del Senato è a 15 minuti a piedi dalla stazione centrale; il Kauppatori e il porto sono 8 minuti più in là.","La cattedrale Uspenski è chiusa il lunedì e apre per poche ore: guarda gli orari prima di andare.","Per Suomenlinna il traghetto parte dal Kauppatori (lato est): non si compra il biglietto a bordo."],["senate","uspenski","kauppatori","suomenlinna"]],
["🎨 Ateneum, Kiasma e Oodi",["L'Ateneum, Kiasma e Oodi sono a pochi minuti l'uno dall'altro, attorno alla stazione centrale e al Parlamento.","L'Ateneum e Kiasma sono chiusi il lunedì; Oodi è aperta ogni giorno e l'ingresso è libero.","Kiasma ha ingresso gratuito venerdì 6 novembre e venerdì 4 dicembre 2026."],["ateneum","kiasma","oodi"]],
["🪨 Chiesa nella roccia e Sibelius",["La chiesa nella roccia è a circa 25 minuti a piedi dalla stazione centrale; la domenica apre solo dalle 12.","Il monumento a Sibelius è più lontano, in un parco sul mare: conviene arrivarci in autobus (controlla linea e fermata nell'app HSL).","Il caffè Regatta, a pochi passi dal monumento, è un buon posto per una pausa."],["temppeliaukio","sibelius"]],
["🌅 Un giorno fuori Helsinki",["Tallinn, in Estonia, è raggiungibile in traghetto in circa due ore dal porto di Helsinki (richiede documento d'identità).","Porvoo, la cittadina di legno dall'aspetto d'altri tempi, si raggiunge in autobus in circa un'ora."]]],
WTIPS:["L'acqua del rubinetto di Helsinki è tra le più pure al mondo e si beve ovunque: puoi chiederla in ogni locale («Hanavettä, kiitos») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap. In autunno e inverno le fontanelle all'aperto sono spente.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Le fontane monumentali non sono da bere."],
GEN:["La Finlandia usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Helsinki è un'ora avanti rispetto all'Italia.","Mancia: non è richiesta; se il servizio è stato ottimo, si arrotonda il conto.","La domenica molti negozi sono aperti con orario ridotto (spesso 12–16); i musei e i ristoranti sono aperti.","Si paga con la carta o con il telefono quasi dappertutto, anche per un caffè: i contanti servono pochissimo.","A ottobre e novembre fa freddo, piove e fa buio presto: porta una giacca impermeabile e strati caldi.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.hsl.fi/en" target="_blank" rel="noopener">hsl.fi</a> · treni: <a href="https://www.vr.fi/en" target="_blank" rel="noopener">vr.fi</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Helsinki: <a href="https://ambhelsinki.esteri.it" target="_blank" rel="noopener">ambhelsinki.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho trovato scioperi annunciati nei trasporti di Helsinki. Gli scioperi in Finlandia vengono annunciati con alcuni giorni di preavviso e riguardano spesso i voli o il personale a terra dell\'aeroporto: nei giorni prima controllate <a href="https://www.hsl.fi/en" target="_blank" rel="noopener">hsl.fi</a>, <a href="https://www.vr.fi/en" target="_blank" rel="noopener">vr.fi</a> e il sito della compagnia aerea.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 80 110 86 Q150 90 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M12 106 V66 H66 V106 Z M34 66 V54 Q26 48 32 38 Q37 30 39 16 Q41 30 46 38 Q52 48 44 54 V66 Z M38 16 V6 H40 V16 Z M16 66 V58 Q14 52 20 46 Q26 52 24 58 V66 Z M54 66 V58 Q52 52 58 46 Q64 52 62 58 V66 Z"/></g>'+
'<g style="--k:2"><path d="M90 106 V72 H190 V106 Z M94 72 L140 60 L186 72 Z M122 60 V48 H158 V60 Z M122 48 Q140 22 158 48 Z M138 26 V16 H142 V26 Z M96 72 V62 Q101 54 106 62 V72 Z M174 72 V62 Q179 54 184 62 V72 Z"/></g>'+
'<g style="--k:3"><path d="M210 106 V66 H250 V106 Z M226 66 V32 H234 V66 Z M224 32 H236 L230 20 Z"/></g>'+
'<g style="--k:4"><path d="M268 106 V50 H272 V106 Z M274 106 V38 H278 V106 Z M280 106 V28 H284 V106 Z M286 106 V42 H290 V106 Z M292 106 V54 H296 V106 Z M298 106 V64 H302 V106 Z"/></g>'+
'<g style="--k:5"><path d="M330 106 V92 Q362 84 394 92 V106 Z M357 92 V14 H365 V92 Z M356 14 H366 L361 8 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M96 90 v16 M110 90 v16 M124 90 v16 M138 90 v16 M152 90 v16 M166 90 v16 M180 90 v16"/><path d="M210 98 h40 M308 100 h20"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="12" r="1.3"/><circle cx="176" cy="16" r="1.3"/><circle cx="260" cy="14" r="1.3"/><circle cx="320" cy="10" r="1.3"/><circle cx="388" cy="26" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.helsinki);
