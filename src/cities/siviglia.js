/* ===== Siviglia (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.siviglia=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: da Siviglia arrivano voli diretti dall'Italia solo su San Pablo (SVQ) */
var PAR={
SVQ:{n:"Siviglia San Pablo (SVQ)",s:"Aeropuerto de Sevilla-San Pablo",url:"https://www.aena.es/es/sevilla.html",live:"Siviglia",inMin:50,buf:120,pos:[37.4180,-5.8931],sd:"Aeroporto SVQ · bus EA",rt:"Dall'aeroporto: bus EA (Especial Aeropuerto) di Tussam fino al Prado de San Sebastián o a Plaza de Armas, poi a piedi o in tram fino al centro.",
 arr:"Dall'Italia si entra in Spagna senza controllo passaporti (spazio Schengen). Dopo il ritiro bagagli esci dall'area arrivi e cerca la fermata del bus «EA» (Especial Aeropuerto, Tussam), di fronte al terminal. Il bus va in centro con poche fermate: Santa Justa (la stazione dei treni), San Bernardo, Avenida de Carlos V e Paseo de Colón, fino al capolinea di Plaza de Armas. Per il centro storico scendi al Prado de San Sebastián o a Paseo de Colón, vicino al Teatro Maestranza e al Guadalquivir: da lì la Cattedrale è a 15 minuti a piedi. In tutto servono circa 35–45 minuti, con un bus ogni 15–20 minuti.",
 tk:"Il biglietto del bus EA costa 6 € solo andata e 8 € andata e ritorno, da valere lo stesso giorno (tariffa Tussam 2026, da sito di Tussam e guide; da confermare su tussam.es). Si compra a bordo dal conducente o alle macchinette e ai banchi nell'area arrivi; porta qualche euro in monete, perché la carta non sempre è accettata a bordo. Il biglietto urbano da 1,40 € non vale sulla linea dell'aeroporto.",
 gm:"Aeropuerto de Sevilla, Sevilla",
 tips:["Il bus EA fa capolinea a Plaza de Armas, dall'altra parte del fiume rispetto alla Cattedrale: per il centro storico scendi prima, al Prado de San Sebastián o a Paseo de Colón. Se ti sembra di aver sbagliato fermata, controlla sulla mappa.","Il taxi da e per l'aeroporto ha una tariffa fissa di circa 25–28 € (più cara di notte, nei festivi e nelle settimane della Semana Santa e della Feria); è utile in due o tre persone o a tarda ora. Per i prezzi ufficiali: tariffe 2025 da guide, da confermare.","Il primo bus per l'aeroporto parte dal centro verso le 4:30–5:20 e l'ultimo dall'aeroporto in centro verso l'una di notte (orari da guide, da confermare su tussam.es): se hai un volo molto presto, programma il taxi."]}
};
/* linee (tracciati indicativi) */
var SEG={
ea:{c:"#e30613",n:"Bus EA dall'aeroporto",p:[[37.4180,-5.8931,"Aeroporto",2],[37.3925,-5.9754,"Santa Justa",2],[37.3790,-5.9885,"Prado de San Sebastián",2]]},
tr:{c:"#00a650",n:"Tram Metrocentro",p:[[37.3888,-5.9960,"Plaza Nueva",2],[37.3845,-5.9930,"Archivo de Indias"],[37.3829,-5.9936,"Puerta de Jerez",2],[37.3790,-5.9885,"Prado de San Sebastián",2]]}
};
var START=[37.3888,-5.9960];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
catedral:{t:"Cattedrale e Giralda",z:"A",p:1,min:75,id:100,max:130,pos:[37.3859,-5.9932],q:"Catedral de Sevilla",cls:"",cl:[],tk:[13,"Cattedrale e Giralda (13 € online)",1,1],
 win:function(wd){return wd===6?[14*60+30,18*60]:[10*60+45,18*60]},
 d:"La più grande cattedrale gotica del mondo, costruita sul sito della grande moschea almohade: dentro c'è la tomba di Cristoforo Colombo e un altare dorato alto 20 metri. La visita finisce con la salita alla Giralda, l'antico minareto, per una rampa senza scalini e una vista su tutta la città.",
 m:"Aperta lunedì–sabato 10:45–19:00 e la domenica 14:30–19:00; la biglietteria chiude alle 18:00. Biglietto 13 € online, 14 € alla cassa (sito ufficiale, pagina dal 1° gennaio 2026); ridotto 7–8 €. Il giro dura circa 75 minuti e parte dalla Giralda. La domenica dalle 16:30 alle 18:00 c'è un ingresso gratuito, ma serve la prenotazione online. L'orario può cambiare per funzioni o eventi. Il 4–8 dicembre 2026 il Congresso Internazionale delle Confraternite limita la visita."},
alcazar:{t:"Real Alcázar",z:"A",p:1,min:120,id:150,max:210,pos:[37.3831,-5.9904],q:"Real Alcázar de Sevilla",cls:"",cl:[],tk:[15.5,"Real Alcázar (15,50 €)",1,1],
 win:function(wd,d){var o=(d||"0000-10-13").slice(5);return[9*60+30,(o>="10-29"||o<="03-31")?17*60:19*60]},
 d:"Il palazzo reale ancora in uso più antico d'Europa: il Palazzo di Pietro I è un capolavoro dell'arte mudéjar, con soffitti dorati, stucchi finissimi e il Patio de las Doncellas. Fuori ci sono giardini con fontane, pavoni e un labirinto di siepi, tra i luoghi dove è stata girata la serie «Game of Thrones».",
 m:"Dal 1° aprile al 28 ottobre aperto 9:30–19:00, dal 29 ottobre al 31 marzo 9:30–17:00, tutti i giorni; chiuso il 1° e il 6 gennaio, il Venerdì Santo e il 25 dicembre. Il biglietto base costa 15,50 € (tariffa ufficiale del Patronato dal 2025; altre guide indicano ancora 13,50–14,50 €, prezzi più vecchi: da confermare), più 5,50 € per il Cuarto Real Alto, l'appartamento reale, che si prenota a parte. Compra il biglietto sul sito ufficiale alcazarsevilla.org, l'unico venditore autorizzato, con orario d'ingresso: nei mesi più affollati si esaurisce. Il lunedì pomeriggio (16–17 in inverno) c'è un ingresso gratuito con le code lunghe e prenotazione obbligatoria."},
santacruz:{t:"Barrio de Santa Cruz",z:"A",p:2,min:45,id:70,max:110,pos:[37.3866,-5.9895],q:"Barrio de Santa Cruz, Sevilla",cls:"walk",
 d:"L'antico quartiere ebraico di vicoli stretti, case bianche, balconi di ferro battuto e piazzette con aranci. Passeggia tra Plaza de Doña Elvira, Callejón del Agua e Plaza de los Venerables, e cerca i patii nascosti dietro i portoni.",
 m:"Si cammina gratis a tutte le ore. Nelle ore centrali è molto affollato: al mattino presto o a fine pomeriggio ha un'atmosfera molto più tranquilla. Le terrazze con tavolini sono spesso più care della media."},
plazaespana:{t:"Plaza de España e Parque de María Luisa",z:"D",p:1,min:50,id:80,max:130,pos:[37.3772,-5.9869],q:"Plaza de España, Sevilla",cls:"walk",
 d:"L'emiciclo monumentale di mattoni e ceramica costruito per l'Esposizione Iberoamericana del 1929: un canale con barche a remi, ponti e panchine decorate con le piastrelle dipinte di ogni provincia spagnola. Accanto c'è il Parque de María Luisa, un grande giardino all'ombra di palme e alberi alti.",
 m:"La piazza è aperta tutti i giorni dalle 8 alle 22 (Timeout, da confermare) e l'ingresso è gratuito. Si possono affittare le barche sul canale, di norma per 6–8 € a barca per mezz'ora (prezzo da guide, non letto sul sito del gestore). Il pomeriggio ha ombra solo sotto i portici."},
torre:{t:"Torre del Oro e il Guadalquivir",z:"D",p:3,min:30,id:45,max:70,pos:[37.3825,-5.9964],q:"Torre del Oro, Sevilla",cls:"",tk:[3,"Torre del Oro (3 €)",1],
 win:function(wd){return wd<5?[9*60+30,18*60+30]:[10*60+30,18*60+30]},
 d:"La torre a dodici lati sul fiume costruita dagli Almohadi nel 1220 come parte delle mura e per controllare il porto, che oggi ospita un piccolo museo navale. Il lungofiume è ottimo per una passeggiata, con il Teatro de la Maestranza e la Plaza de Toros accanto.",
 m:"Il museo è aperto lunedì–venerdì dalle 9:30 alle 19:00 e sabato e domenica dalle 10:30 alle 19:00 (scheda del Ministero della Difesa); chiude nei festivi locali e nazionali. L'ingresso costa circa 3 € (ridotto 1,50 €), con ingresso gratuito il lunedì secondo alcune guide: prezzi non letti sul sito ufficiale, da confermare."},
setas:{t:"Metropol Parasol (le Setas)",z:"B",p:3,min:40,id:60,max:90,pos:[37.3932,-5.9915],q:"Metropol Parasol, Sevilla",cls:"",tk:[15,"Metropol Parasol (circa 15 €)",1],
 win:function(wd){return[9*60+30,(wd>=4?23*60+30:23*60)]},
 d:"La grande struttura in legno a forma di onde e funghi (le «setas») sulla Plaza de la Encarnación, la più grande al mondo di questo tipo. Si sale su una passerella aerea con vista a 360 gradi sui tetti e sulla Cattedrale, bellissima al tramonto.",
 m:"Il belvedere è aperto dalle 9:30 alle 23 da domenica a giovedì e fino alle 23:30 venerdì e sabato (Timeout, da confermare). Il biglietto costa circa 15 € (da guide, prezzo non letto sul sito ufficiale: da confermare). Nei sotterranei c'è l'Antiquarium, con i resti romani e arabi trovati durante gli scavi."},
archivo:{t:"Archivio delle Indie",z:"A",p:4,min:25,id:40,max:60,pos:[37.3849,-5.9929],q:"Archivo General de Indias, Sevilla",cls:"",cl:[0],
 win:function(wd){return wd===6?[10*60,13*60+30]:[9*60+30,16*60+30]},
 d:"L'edificio rinascimentale, patrimonio dell'UNESCO, che custodisce i documenti dell'impero spagnolo nelle Americhe: lettere di Colombo, mappe antiche e atti dei conquistadores. Si visitano il grande scalone di marmo, le sale con le teche e il patio.",
 m:"La visita è gratuita. Orari: martedì–sabato 9:30–17:00, domenica e festivi 10:00–14:00; chiuso il lunedì; ultimo ingresso 30 minuti prima (da guide, da confermare sul sito del Ministero della Cultura). L'accesso può essere limitato se il locale si riempie."},
pilatos:{t:"Casa de Pilatos",z:"A",p:3,min:45,id:60,max:90,pos:[37.3897,-5.9902],q:"Casa de Pilatos, Sevilla",cls:"",tk:[12,"Casa de Pilatos, piano terra (12 €)",1],
 win:function(){return[9*60,17*60+30]},
 d:"Il palazzo dei duchi di Medinaceli, un mix di architettura mudéjar, gotica e rinascimentale: azulejos preziosi, patii con fontane, giardini all'ombra e un grande scalone con una cupola. Il piano superiore si visita con una guida.",
 m:"Aperto tutti i giorni dalle 9:00 alle 18:00 (Ticketlens, da confermare su fundacionmedinaceli.org). Il piano terra costa 12 € e il piano superiore 6 € in più (prezzi da guide, da confermare)."},
triana:{t:"Triana: ponte, mercato e Calle Betis",z:"C",p:3,min:60,id:90,max:140,pos:[37.3869,-6.0031],q:"Mercado de Triana, Sevilla",cls:"walk",
 d:"Il quartiere dei ceramisti e dei marinai dall'altra parte del fiume, con la sua anima popolare e gitana: si passa dal Puente de Isabel II, si entra nel Mercato di Triana, nei suoi banchi di pesce e frutta e nei bar, e si cammina sul lungofiume di Calle Betis, con le facciate colorate.",
 m:"Il mercato è aperto di norma dalle 9 alle 15 con i banchi, e i bar all'interno restano aperti più a lungo (orari da guide, da confermare). Calle Betis e il ponte sono sempre aperti e gratuiti. Il tramonto sul fiume è il momento migliore."},
bellas:{t:"Museo de Bellas Artes",z:"B",p:5,min:60,id:90,max:140,pos:[37.3917,-5.9958],q:"Museo de Bellas Artes de Sevilla",cls:"",cl:[0],
 win:function(wd){return wd===1?[14*60+30,20*60+30]:wd===6?[9*60,14*60+30]:[9*60,20*60+30]},
 d:"Uno dei più bei musei d'arte spagnoli, in un ex convento: la collezione di pittura barocca di Murillo, Zurbarán e Valdés Leal e le sale con dipinti sacri, affreschi e soffitti decorati.",
 m:"Aperto martedì 14:30–20:30, mercoledì–sabato 9:00–20:30, domenica 9:00–14:30; chiuso il lunedì (da sevillacitycentre.com, da confermare). Biglietto 1,50 €; per i cittadini dell'Unione Europea, italiani compresi, è gratuito con un documento."},
sierpes:{t:"Plaza Nueva, Sierpes e il centro commerciale",z:"A",p:5,min:30,id:50,max:80,pos:[37.3888,-5.9960],q:"Calle Sierpes, Sevilla",cls:"walk",
 d:"Il cuore commerciale della città: Plaza Nueva con il Municipio plateresco, la lunga Calle Sierpes pedonale con caffè e negozi storici, la piazza di San Francisco e le viuzze con tavolini e banconi di tapas.",
 m:"Si cammina gratis. I negozi sono aperti di solito 10–14 e 17–21; molti chiudono la domenica e fanno una pausa nel primo pomeriggio."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","catedral",6,"walk","A piedi da Plaza Nueva lungo Avenida de la Constitución fino alla Cattedrale, circa 6 minuti.","A piedi lungo Avenida de la Constitución fino a Plaza Nueva, circa 6 minuti.",{f:[W([[37.3888,-5.9960],[37.3873,-5.9946],[37.3859,-5.9932]])],r:[W([[37.3859,-5.9932],[37.3873,-5.9946],[37.3888,-5.9960]])]});
P2("catedral","alcazar",5,"walk","A piedi per Plaza del Triunfo fino all'ingresso del Real Alcázar (Puerta del León), circa 5 minuti.","A piedi per Plaza del Triunfo fino alla Cattedrale, circa 5 minuti.",{f:[W([[37.3859,-5.9932],[37.3844,-5.9917],[37.3831,-5.9904]])],r:[W([[37.3831,-5.9904],[37.3844,-5.9917],[37.3859,-5.9932]])]});
P2("catedral","archivo",3,"walk","A piedi dalla Cattedrale fino all'Archivo de Indias, di fronte, circa 3 minuti.","A piedi fino alla Cattedrale, circa 3 minuti.",{f:[W([[37.3859,-5.9932],[37.3849,-5.9929]])],r:[W([[37.3849,-5.9929],[37.3859,-5.9932]])]});
P2("alcazar","santacruz",6,"walk","A piedi per Calle Judería fino a Santa Cruz, circa 6 minuti.","A piedi per Calle Judería fino al Real Alcázar, circa 6 minuti.",{f:[W([[37.3831,-5.9904],[37.3855,-5.9900],[37.3866,-5.9895]])],r:[W([[37.3866,-5.9895],[37.3855,-5.9900],[37.3831,-5.9904]])]});
P2("catedral","santacruz",8,"walk","A piedi per Calle Mateos Gago fino a Santa Cruz, circa 8 minuti.","A piedi per Calle Mateos Gago fino alla Cattedrale, circa 8 minuti.",{f:[W([[37.3859,-5.9932],[37.3864,-5.9912],[37.3866,-5.9895]])],r:[W([[37.3866,-5.9895],[37.3864,-5.9912],[37.3859,-5.9932]])]});
P2("santacruz","pilatos",9,"walk","A piedi per Calle Doña Guiomar e Calle Imagen fino a Casa de Pilatos, circa 9 minuti.","A piedi per Calle Doña Guiomar fino a Santa Cruz, circa 9 minuti.",{f:[W([[37.3866,-5.9895],[37.3882,-5.9895],[37.3897,-5.9902]])],r:[W([[37.3897,-5.9902],[37.3882,-5.9895],[37.3866,-5.9895]])]});
P2("pilatos","sierpes",10,"walk","A piedi per Calle Águilas e Calle Francos fino a Calle Sierpes, circa 10 minuti.","A piedi per Calle Águilas fino a Casa de Pilatos, circa 10 minuti.",{f:[W([[37.3897,-5.9902],[37.3894,-5.9930],[37.3888,-5.9960]])],r:[W([[37.3888,-5.9960],[37.3894,-5.9930],[37.3897,-5.9902]])]});
P2("sierpes","setas",12,"walk","A piedi per Calle Sierpes e Calle Laraña fino alle Setas, circa 12 minuti.","A piedi per Calle Laraña e Calle Sierpes fino a Plaza Nueva, circa 12 minuti.",{f:[W([[37.3888,-5.9960],[37.3910,-5.9940],[37.3932,-5.9915]])],r:[W([[37.3932,-5.9915],[37.3910,-5.9940],[37.3888,-5.9960]])]});
P2("setas","bellas",8,"walk","A piedi per Calle Imagen e Plaza del Museo fino al Museo de Bellas Artes, circa 8 minuti.","A piedi dal museo fino alle Setas, circa 8 minuti.",{f:[W([[37.3932,-5.9915],[37.3924,-5.9938],[37.3917,-5.9958]])],r:[W([[37.3917,-5.9958],[37.3924,-5.9938],[37.3932,-5.9915]])]});
P2("start","setas",10,"walk","A piedi per Calle Sierpes e Calle Laraña fino alle Setas, circa 10 minuti.","A piedi fino a Plaza Nueva, circa 10 minuti.",{f:[W([[37.3888,-5.9960],[37.3910,-5.9940],[37.3932,-5.9915]])],r:[W([[37.3932,-5.9915],[37.3910,-5.9940],[37.3888,-5.9960]])]});
P2("start","bellas",9,"walk","A piedi per Calle Alfonso XII fino al Museo de Bellas Artes, circa 9 minuti.","A piedi per Calle Alfonso XII fino a Plaza Nueva, circa 9 minuti.",{f:[W([[37.3888,-5.9960],[37.3905,-5.9960],[37.3917,-5.9958]])],r:[W([[37.3917,-5.9958],[37.3905,-5.9960],[37.3888,-5.9960]])]});
P2("alcazar","torre",10,"walk","A piedi lungo Avenida de la Constitución e Paseo de Colón fino alla Torre del Oro, circa 10 minuti.","A piedi per Paseo de Colón fino al Real Alcázar, circa 10 minuti.",{f:[W([[37.3831,-5.9904],[37.3829,-5.9936],[37.3825,-5.9964]])],r:[W([[37.3825,-5.9964],[37.3829,-5.9936],[37.3831,-5.9904]])]});
P2("catedral","torre",9,"walk","A piedi per Calle Santo Tomás e Paseo de Colón fino alla Torre del Oro, circa 9 minuti.","A piedi fino alla Cattedrale, circa 9 minuti.",{f:[W([[37.3859,-5.9932],[37.3842,-5.9950],[37.3825,-5.9964]])],r:[W([[37.3825,-5.9964],[37.3842,-5.9950],[37.3859,-5.9932]])]});
P2("torre","triana",14,"walk","A piedi lungo il fiume per il Puente de Isabel II fino al Mercato di Triana, circa 14 minuti.","A piedi per il Puente de Isabel II fino alla Torre del Oro, circa 14 minuti.",{f:[W([[37.3825,-5.9964],[37.3862,-6.0006],[37.3869,-6.0031]])],r:[W([[37.3869,-6.0031],[37.3862,-6.0006],[37.3825,-5.9964]])]});
P2("catedral","triana",15,"walk","A piedi per Calle Adriano e il Puente de Isabel II fino a Triana, circa 15 minuti.","A piedi per il ponte fino alla Cattedrale, circa 15 minuti.",{f:[W([[37.3859,-5.9932],[37.3866,-5.9990],[37.3869,-6.0031]])],r:[W([[37.3869,-6.0031],[37.3866,-5.9990],[37.3859,-5.9932]])]});
P2("start","plazaespana",20,"metro","Tram Metrocentro da Plaza Nueva fino al Prado de San Sebastián (circa 7 minuti), poi 12 minuti a piedi per il Parque de María Luisa fino a Plaza de España.","A piedi fino al Prado, tram Metrocentro fino a Plaza Nueva, circa 20 minuti.",{f:[["tr","Plaza Nueva","Prado de San Sebastián"],W([[37.3790,-5.9885],[37.3775,-5.9876],[37.3772,-5.9869]])],r:[W([[37.3772,-5.9869],[37.3775,-5.9876],[37.3790,-5.9885]]),["tr","Prado de San Sebastián","Plaza Nueva"]]});
P2("alcazar","plazaespana",14,"walk","A piedi per l'Avenida de Roma e il Parque de María Luisa fino a Plaza de España, circa 14 minuti.","A piedi per il Parque de María Luisa fino al Real Alcázar, circa 14 minuti.",{f:[W([[37.3831,-5.9904],[37.3790,-5.9885],[37.3772,-5.9869]])],r:[W([[37.3772,-5.9869],[37.3790,-5.9885],[37.3831,-5.9904]])]});
P2("plazaespana","torre",17,"walk","A piedi per Paseo de las Delicias e il lungofiume fino alla Torre del Oro, circa 17 minuti.","A piedi per Paseo de las Delicias fino a Plaza de España, circa 17 minuti.",{f:[W([[37.3772,-5.9869],[37.3800,-5.9930],[37.3825,-5.9964]])],r:[W([[37.3825,-5.9964],[37.3800,-5.9930],[37.3772,-5.9869]])]});
/* ritorno in aeroporto: bus EA dal Prado de San Sebastián / Paseo de Colón */
var RET={
SVQ:{
 A:{min:50,txt:"A piedi o in tram fino al Prado de San Sebastián, poi bus EA di Tussam fino all'aeroporto (circa 35–45 minuti, un bus ogni 15–20 minuti). Biglietto 6 € solo andata o 8 € andata e ritorno (se l'hai già preso all'arrivo). Il bus fa capolinea a Plaza de Armas, ma conviene prenderlo al Prado de San Sebastián o a Paseo de Colón. Alternativa: taxi con tariffa fissa di circa 25–28 €.",g:[["tr","Plaza Nueva","Prado de San Sebastián"],["ea","Prado de San Sebastián","Aeroporto"]]}}
};
var ARR={
SVQ:[["ea","Aeroporto","Prado de San Sebastián"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Locali storici e conosciuti; orari, ratings e prezzi da guide e dalla conoscenza della città, non letti sui siti o su Google Maps: da confermare */
var V={
rinconcillo:{n:"El Rinconcillo",a:"Calle Gerona 40",z:"B",r:"4,3",pos:[37.3951,-5.9890],h:D7("13:00-23:59"),
 d:"La taverna più antica di Siviglia, aperta dal 1670: banco di legno, soffitto a travi, il conto che il barista scrive con il gesso sul bancone. Si prende una caña di birra con le tapas del giorno, come le espinacas con garbanzos, le albóndigas o il solomillo al whisky.",pr:"Una tapa costa di solito 3–5 €; per un pasto leggero servono 15–20 € a testa (listino non visto). Orari da guide, da confermare."},
romero:{n:"Bodeguita Romero",a:"Calle Harinas 10",z:"A",r:"4,5",pos:[37.3901,-5.9959],h:D7("12:30-16:30,20:00-23:59"),
 d:"Una taverna che prepara da decenni il montadito de pringá, il panino caldo con carne di stufato, e altre tapas della cucina sivigliana. Si mangia in piedi al banco o a un tavolino, con una caña o un bicchiere di vino del Condado.",pr:"Un montadito costa 3–5 €; un pasto semplice sta tra 15 e 22 € a testa (listino non visto). Orari da guide, da confermare."},
morales:{n:"Casa Morales",a:"Calle García de Vinuesa 11",z:"A",r:"4,4",pos:[37.3874,-5.9951],h:["12:00-16:30,19:30-23:30","12:00-16:30,19:30-23:30","12:00-16:30,19:30-23:30","12:00-16:30,19:30-23:30","12:00-16:30,19:30-23:30","12:00-16:30,19:30-23:30",""],
 d:"Una bodega aperta nel 1850, con le botti di vino, le vecchie giare di terracotta e le tapas da banco: formaggio, prosciutto, tortilla e il salmorejo, una crema fredda di pomodoro. Qui si beve vino di Montilla o di Jerez.",pr:"Una tapa o un mezzo piatto costa 3–6 €; mangiare bene ne richiede 14–20 a testa (listino non visto). Orari da guide, da confermare."},
teresas:{n:"Bar Las Teresas",a:"Calle Santa Teresa 2",z:"A",r:"4,4",pos:[37.3862,-5.9892],h:D7("11:00-23:30"),
 d:"Un bar del 1870 nel quartiere di Santa Cruz, con prosciutti appesi, pareti di azulejos e foto d'epoca: tapas di jamón, cola de toro e tortilla, con un bicchiere di vino bianco della casa.",pr:"Una tapa si paga 3–6 €; una colazione o uno spuntino 5–8 € (listino non visto). Orari da guide, da confermare."},
columnas:{n:"Bodega Santa Cruz «Las Columnas»",a:"Calle Rodrigo Caro 1",z:"A",r:"4,2",pos:[37.3872,-5.9905],h:D7("09:00-23:59"),
 d:"Una bodega all'angolo con Calle Mateos Gago, sempre piena di sivigliani all'ora delle tapas, con i tavolini in strada: tapas della casa e un piatto di affettati; si ordina al banco con il gessetto.",pr:"Una tapa costa 3–5 €; una colazione 4–6 € (listino non visto). Orari da guide, da confermare."},
campana:{n:"Confitería La Campana",a:"Calle Sierpes 1",z:"A",r:"4,3",pos:[37.3894,-5.9941],h:D7("08:00-21:00"),
 d:"La pasticceria storica del 1885 all'inizio di Calle Sierpes: croissant, tostadas, yemas, panini e dolci da portar via o da mangiare in piedi al banco.",pr:"Un caffè con una tostada costa circa 4–6 € (listino non visto). Orari da guide, da confermare."},
mercado:{n:"Mercado de Triana",a:"Calle San Jorge 6",z:"C",r:"4,3",pos:[37.3869,-6.0031],h:["09:00-15:00","09:00-15:00","09:00-15:00","09:00-15:00","09:00-15:00","09:00-15:00",""],
 d:"Il mercato coperto sul sito dell'antico castello di San Jorge: banchi di pesce, frutta, prosciutti e bar dove si mangiano tapas di pesce fritto, ceviche e tortillas. Si va a fare colazione o un pranzo veloce tra i banchi.",pr:"Una tapa o un panino costa 3–6 €; un pranzo leggero 10–16 € (listino non visto). Orari e giorni di apertura da guide, da confermare."},
cuesta:{n:"Casa Cuesta",a:"Calle Castilla 3",z:"C",r:"4,3",pos:[37.3863,-6.0035],h:D7("09:00-23:30"),
 d:"Una taverna di Triana aperta dal 1880, con il bancone a ferro di cavallo e i tavolini in strada: cucina andalusa semplice, con carrillada, salmorejo, pescado frito e vini sfusi.",pr:"Tapas e mezze porzioni da 3–6 €; un pasto sta intorno ai 15–22 € a testa (listino non visto). Orari da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["campana","teresas","columnas"],B:["campana","rinconcillo"],C:["mercado","cuesta"],D:["campana","columnas"]},
pra:{A:["romero","morales","teresas"],B:["rinconcillo","romero"],C:["mercado","cuesta"],D:["romero","morales","columnas"]},
cen:{A:["morales","romero","rinconcillo"],B:["rinconcillo","morales"],C:["cuesta","rinconcillo"],D:["morales","romero","rinconcillo"]},
snk:{A:["campana","columnas","teresas"],B:["rinconcillo","campana"],C:["cuesta","mercado"],D:["campana","columnas"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Cattedrale, Giralda e Real Alcázar",acts:["catedral","alcazar","archivo"],need:260,core:1},
{id:"santa",t:"Santa Cruz e Casa de Pilatos",acts:["santacruz","pilatos"],need:150},
{id:"espana",t:"Plaza de España e Torre del Oro",acts:["plazaespana","torre"],need:170,core:1},
{id:"triana",t:"Triana e il fiume",acts:["triana"],need:120},
{id:"setas",t:"Setas, Bellas Artes e Calle Sierpes",acts:["setas","bellas","sierpes"],need:200}
];
var ORDER=["catedral","alcazar","plazaespana","santacruz","setas","pilatos","triana","torre","archivo","bellas","sierpes"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cas","Centro storico (Cattedrale, Santa Cruz)",[37.3866,-5.9930],"A"],
["ala","Alameda / Encarnación / Setas",[37.3950,-5.9910],"B"],
["tri","Triana",[37.3860,-6.0020],"C"],
["pra","El Arenal / Prado / María Luisa",[37.3800,-5.9920],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[37.3888,-5.9960],""]
];
/* imposta di soggiorno: a Siviglia e in Andalusia non c'è (verificare prima di partire) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Tostada con aceite y tomate","pane tostato con olio d'oliva e pomodoro grattugiato."],["Tostada de manteca colorá","pane tostato con la manteca colorá, un patè di maiale speziato con paprika."],["Café con leche y churros","caffellatte con churros, le frittelle lunghe da inzuppare."]],
pra:[["Montadito de pringá","panino caldo con la carne di stufato sfilacciata."],["Espinacas con garbanzos","spinaci e ceci speziati con cumino: un piatto tipico."],["Salmorejo","crema fredda di pomodoro con prosciutto e uovo sodo."],["Tortilla de patatas","frittata di patate, in porzione o nel panino."]],
cen:[["Carrillada al vino tinto","guanciale di maiale stufato nel vino rosso."],["Solomillo al whisky","filetto di maiale con salsa all'aglio e whisky: il piatto simbolo dei bar sivigliani."],["Pescaíto frito","pesce fritto misto, leggerissimo."],["Cola de toro","coda di toro stufata, un classico andaluso."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","La Giralda","Foto","La torre vista da Calle Mateos Gago, con la Cattedrale che spunta tra le case bianche: l'inquadratura più bella a fine pomeriggio.",[37.3862,-5.9915],"Giralda, Sevilla","catedral"],
["📷","Plaza del Triunfo","Foto","La piazza tra Cattedrale, Alcázar e Archivio, con i balconi e le carrozze a cavalli.",[37.3844,-5.9917],"Plaza del Triunfo, Sevilla","catedral"],
["📷","I patii del Real Alcázar","Foto","Il Patio de las Doncellas con le arcate in stucco, specie la mattina presto.",[37.3836,-5.9900],"Real Alcázar de Sevilla","alcazar"],
["🤳","I giardini dell'Alcázar","Selfie","Il labirinto di siepi e la fontana del Giardino, con i pavoni che passeggiano.",[37.3820,-5.9890],"Jardines del Real Alcázar, Sevilla","alcazar"],
["📷","Callejón del Agua","Foto","Il vicolo lungo il muro dell'Alcázar, con i fiori sui balconi e le arance.",[37.3858,-5.9895],"Callejón del Agua, Sevilla","santacruz"],
["📷","Plaza de España","Foto","Il grande emiciclo di mattoni visto dal ponte sul canale, con le barche a remi.",[37.3772,-5.9869],"Plaza de España, Sevilla","plazaespana"],
["🤳","Le panchine delle province","Selfie","Le panche con le piastrelle di azulejo dipinte per ogni provincia spagnola: cerca la tua preferita.",[37.3775,-5.9866],"Plaza de España Sevilla azulejos","plazaespana"],
["📷","Torre del Oro al tramonto","Foto","La torre vista dall'altra riva o dal lungofiume, con la luce arancione del tramonto.",[37.3825,-5.9964],"Torre del Oro, Sevilla","torre"],
["📷","Le Setas dall'alto","Foto","La passerella ondulata vista da sotto, con i giochi di luce della sera.",[37.3932,-5.9915],"Metropol Parasol, Sevilla","setas"],
["📷","Il Puente de Isabel II","Foto","Il ponte di ferro, detto anche ponte di Triana, con la Torre del Oro e la Giralda in lontananza.",[37.3862,-6.0006],"Puente de Isabel II, Sevilla","triana"],
["📷","Calle Betis","Foto","Le case colorate del lungofiume di Triana, viste dall'altra sponda al tramonto.",[37.3850,-6.0020],"Calle Betis, Sevilla","triana"],
["📷","Casa de Pilatos","Foto","Il patio principale con le fontane, gli azulejos e le arcate mudéjar.",[37.3897,-5.9902],"Casa de Pilatos, Sevilla","pilatos"],
["📷","Plaza Nueva","Foto","Il Municipio plateresco con la piazza davanti e le palme.",[37.3888,-5.9960],"Plaza Nueva, Sevilla","sierpes"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-10-28",t:"Real Alcázar: ultimi giorni con l'orario estivo",x:"Fino al 28 ottobre il Real Alcázar chiude alle 19:00. Dal 29 ottobre al 31 marzo l'orario invernale è 9:30–17:00 (alcune fonti indicano 16:30): conta di entrare entro metà pomeriggio. Compra il biglietto con orario sul sito ufficiale."},
{from:"2026-10-13",to:"2027-03-31",t:"Prezzi e orari da controllare",x:"Il Real Alcázar costa 15,50 € (tariffa ufficiale 2025; altre guide indicano ancora 13,50–14,50 €, prezzi vecchi). La Cattedrale costa 13 € online e 14 € alla cassa. Controlla alcazarsevilla.org e catedraldesevilla.es prima di partire."},
{from:"2026-12-01",to:"2026-12-08",t:"Congresso delle Confraternite: Cattedrale limitata",x:"Il Congresso Internazionale delle Confraternite e della Pietà Popolare limita la Cattedrale: il 4–7 dicembre si visitano solo la Giralda e la mostra del Fons Pietatis; l'8 dicembre la visita culturale è sospesa."},
{from:"2026-12-20",to:"2027-01-06",t:"Natale: orari ridotti e chiusure",x:"Il Real Alcázar è chiuso il 25 dicembre e il 1° e 6 gennaio. Il 24 e il 31 dicembre molti negozi e locali chiudono presto; il 25 dicembre e il 1° e 6 gennaio sono festivi in Spagna, con musei e molti ristoranti chiusi o a orario ridotto."}
];
/* clima medio di Siviglia (indicativo, massime/minime) */
var CLIM=[[16,6],[18,7],[21,9],[24,11],[28,14],[33,18],[36,20],[36,20],[32,18],[26,14],[20,10],[16,7]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Siviglia: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="catedral"&&WD===6)meta+=" Oggi è domenica: la Cattedrale apre solo dalle 14:30; dalle 16:30 alle 18:00 c'è l'ingresso gratuito con prenotazione.";
if(it.id==="alcazar"&&WD===0)meta+=" Oggi è lunedì: nel pomeriggio c'è un'ora di ingresso gratuito (16–17 in inverno), ma la coda è lunga e serve la prenotazione online.";
if(it.id==="archivo"&&WD===6)meta+=" Oggi è domenica: l'Archivio apre solo dalle 10 alle 14.";
if(it.id==="bellas"&&WD===1)meta+=" Oggi è martedì: il Museo di Belle Arti apre soltanto dalle 14:30.";
return meta}
Object.assign(C,{id:"siviglia",n:"Siviglia",cn:"Spagna",e:"💃",flag:"🇪🇸",col:["#aa151b","#f1bf00","#2d6a4f"],k:"siviglia sevilla seville spagna",
TZ:"Europe/Madrid",LL:[37.3886,-5.9953],CC:"es",QN:"Sevilla",BK:"Siviglia",ARE:/sevilla|siviglia|seville|\b41\d{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"es-ES",LANGN:"spagnolo",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Plaza Nueva",q:"Plaza Nueva, Sevilla"},
SINGLE:{acts:["catedral","alcazar","santacruz","plazaespana","torre"],ins:[]},
EXCL:[],
DICON:{catedral:"⛪",alcazar:"🏰",santacruz:"🏘️",plazaespana:"🏛️",torre:"🗼",setas:"🍄",archivo:"📜",pilatos:"🏺",triana:"🌉",bellas:"🖼️",sierpes:"🛍️"},
ZN:{A:"nel centro storico",B:"verso le Setas e l'Alameda",C:"a Triana",D:"a El Arenal e al Prado"},
NEAR:{col:"cafetería o pasticceria",pra:"bar de tapas",cen:"bar de tapas",snk:"bar o pasticceria"},
SE:{rinconcillo:"🍷",romero:"🥪",morales:"🍷",teresas:"🍤",columnas:"🥘",campana:"🥐",mercado:"🐟",cuesta:"🍴"},
TR:{one:1.4,cap:5,lbl:"Bus e tram (Tussam)",
 air:{SVQ:{one:6,n:"Bus EA per l'aeroporto (6 € a tratta, 8 € andata e ritorno)"}},
 passes:[
 {n:"Tarjeta turística 1 giorno",d:1,max:1,p:5,note:"La tarjeta turística Tussam di 1 giorno (5 €) vale su tutti i bus urbani di Siviglia per 24 ore; non comprende il bus EA per l'aeroporto."},
 {n:"Tarjeta turística 3 giorni",d:3,p:10,only:function(T){return T.n>=3},note:"La tarjeta turística di 3 giorni (10 €) vale su tutti i bus urbani di Siviglia per tre giorni di fila; non comprende il bus EA."}],
 note:"Prezzi 2026 da RedTransporte e Sevilla Secreta, che riportano le tariffe Tussam: biglietto singolo 1,40 €, bus EA per l'aeroporto 6 € (8 € andata e ritorno nello stesso giorno), tarjeta turística 5 € per 1 giorno e 10 € per 3 giorni; metro 1,35–1,80 € a corsa; da confermare su tussam.es. Il centro si visita quasi tutto a piedi. Il bus EA per l'aeroporto non è compreso nei biglietti urbani."},
FOOD:{co:[4,"Colazione (tostada e caffè)"],pr:[12,"Pranzo (tapas o montadito)"],ce:[18,"Cena (tapas e un piatto)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"In tram o in bus",move:"tutto a piedi, o in tram e in bus",bags:"«¿Puedo dejar las maletas aquí?»",bagsPM:"«¿Puedo dejar las maletas hasta esta tarde?»",bagsAM:"«¿Puedo dejar las maletas hasta mediodía?»",
pra:"Un bar de tapas",praZ:{A:"Intorno alla Cattedrale e a Santa Cruz molti locali con il menù in piazza sono per turisti e costano molto: per tapas vere cerca le taverne un po' più interne (Calle Mateos Gago, Calle Rodrigo Caro, Calle Harinas).",C:"A Triana, tra il mercato e Calle Betis, si mangia meglio e a prezzi più bassi che sull'altra riva del fiume."},
freeLong:"Qualche idea: una passeggiata nei giardini del Parque de María Luisa, un bicchiere di vino bianco a una bodega, i tramonti sul Guadalquivir da Calle Betis, o un riposo all'alloggio nelle ore calde.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata sul lungofiume e una sosta in una bodega.",
remind:"Per il Real Alcázar compra prima il biglietto con orario sul sito ufficiale: nei mesi più affollati si esaurisce. La Cattedrale ha orari ridotti la domenica.",
rain1:"Al coperto: la Cattedrale, il Real Alcázar (i palazzi), la Casa de Pilatos, il Museo de Bellas Artes e il Mercato di Triana.",
rainM:"Al coperto: Cattedrale, i palazzi dell'Alcázar, Casa de Pilatos, Museo de Bellas Artes e Archivio delle Indie.",
water:"Riempite la borraccia: l'acqua del rubinetto di Siviglia si può bere. Attivate «Acqua» sulla mappa per vedere le fontanelle pubbliche vicino al percorso.",
kitchen:"A Siviglia si pranza tra le 13:30 e le 16 e si cena dalle 20:30: molte taverne chiudono la cucina nel pomeriggio, ma i bar di tapas del centro restano aperti tutto il giorno.",
night:[["🍷","Un bicchiere di vino bianco del Condado o un fino con le tapas è il modo andaluso di chiudere la giornata: i locali si riempiono dalle 21."],["🕙","Le cucine servono fino alle 23 circa; il tram Metrocentro e la metro girano fino a tarda sera, e di notte c'è il servizio bus notturno B1–B6."],["☕","Molti bar aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è buona)",
fuso:"Siviglia ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per bar di tapas e taverne: una tostada con caffè costa 3–5 €, una tapa 3–6 € e una cena con un paio di piatti circa 15–22 €. Si paga quasi ovunque con la carta, ma nei bar piccoli conviene avere qualche euro in contanti.",
taxNote:"A Siviglia, e in tutta l'Andalusia, non c'è tassa di soggiorno (all'ottobre 2026, da confermare): il prezzo dell'alloggio è quello che paghi.",
mcrit:"Criteri: bar e taverne storiche del centro e di Triana, con buone valutazioni e prezzi popolari, niente catene. Una colazione e una cena restano sotto i 15–22 € a persona. Orari, valutazioni e prezzi sono quelli di guide e di conoscenza della città (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Al ritorno il bus EA parte dal Prado de San Sebastián e da Paseo de Colón: tieni le monete per il biglietto, perché a bordo la carta non sempre funziona.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto del bus EA per l'aeroporto (6 €, o 8 € andata e ritorno): ai distributori e a bordo, con monete",function(E){return true}],["alc","Biglietto per il Real Alcázar con orario d'ingresso (15,50 €): prenota sul sito ufficiale",["alcazar"]],["cat","Biglietto per la Cattedrale e la Giralda (13 € online)",["catedral"]],["pil","Biglietto per la Casa de Pilatos (12 € il piano terra)",["pilatos"]],["set","Biglietto per le Setas (circa 15 €)",["setas"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per i bar piccoli e per il bus"]],
NUM:{1:["uno","UNO"],2:["dos","dos"],3:["tres","tres"],4:["cuatro","KUA-tro"],5:["cinco","TSIN-ko"],6:["seis","seis"],7:["siete","SIE-te"],8:["ocho","O-cio"],9:["nueve","NUE-ve"],10:["diez","diez"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Buenos días / Buenas tardes","BUE-nos DI-as / BUE-nas TAR-des"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Una mesa para "+(N===1?"una persona":nu[0])+", por favor","U-na ME-sa PA-ra "+(N===1?"U-na per-SO-na":nu[1])+", por fa-VOR"],["Una caña e una tapa di tortilla, per favore","Una caña y una tapa de tortilla, por favor","U-na KA-nia i U-na TA-pa de tor-TI-ia, por fa-VOR"],["Acqua del rubinetto, per favore","Agua del grifo, por favor","A-gua del GRI-fo, por fa-VOR"],["Il conto, per favore","La cuenta, por favor","la KUEN-ta, por fa-VOR"],["Posso pagare con la carta?","¿Puedo pagar con tarjeta?","PUE-do pa-GAR kon tar-HE-ta"],["Quanto costa?","¿Cuánto cuesta?","KUAN-to KUES-ta"],["Dov'è la fermata del bus?","¿Dónde está la parada del autobús?","DON-de es-TA la pa-RA-da del au-to-BUS"],["Qual è il bus per l'aeroporto?","¿Cuál es el autobús al aeropuerto?","kual es el au-to-BUS al ae-ro-PUER-to"]];
if(M)fr=fr.concat([["Ho una prenotazione","Tengo una reserva","TEN-go U-na re-SER-va"],["Posso lasciare i bagagli?","¿Puedo dejar las maletas aquí?","PUE-do de-HAR las ma-LE-tas a-KI"],["A che ora è il check-out?","¿A qué hora es el check-out?","a ke O-ra es el chek-AUT"]]);
return fr.concat([["Mi scusi","Perdone","per-DO-ne"],["Grazie mille!","¡Muchas gracias!","MU-cias GRA-sias"]])},
taxTxt:function(tx){return "A Siviglia non c'è tassa di soggiorno (all'ottobre 2026, da confermare): il prezzo che trovi sull'annuncio è quello che paghi."},
STAYTIPS:["Il centro storico è piccolo e quasi tutto si fa a piedi; il tram Metrocentro e i bus Tussam servono per spostarsi verso Plaza de España e il Prado. D'estate il caldo di mezzogiorno è forte: le ore migliori per camminare sono la mattina presto e la sera."],
ZONES:[
["🚌 Bus, tram e biglietti",["Il biglietto singolo costa 1,40 €; la tarjeta turística Tussam costa 5 € per 1 giorno e 10 € per 3 giorni e vale sui bus urbani. Il bus EA per l'aeroporto costa 6 € (8 € andata e ritorno) e non è compreso.","Il tram Metrocentro collega Plaza Nueva e il Prado de San Sebastián in pochi minuti; la metro di Siviglia ha una sola linea e al centro serve poco.","Il centro storico si percorre quasi tutto a piedi: Cattedrale, Alcázar, Santa Cruz e Archivio sono a pochi minuti l'uno dall'altro."]],
["🏛️ Cattedrale, Alcázar e Santa Cruz",["La Cattedrale si visita entrando da Puerta del Lagarto per i biglietti online; la visita parte dalla Giralda e dura circa 75 minuti.","Il Real Alcázar ha l'ingresso da Plaza del Triunfo: compra il biglietto con orario sul sito ufficiale, perché nei mesi affollati si esaurisce.","Santa Cruz è fatta di vicoli stretti: perdersi è parte del piacere, e a fine pomeriggio è molto più tranquilla."],["catedral","alcazar","santacruz"]],
["🌳 Plaza de España e Triana",["Plaza de España è nel Parque de María Luisa, a una ventina di minuti a piedi dal centro o a pochi minuti dal Prado de San Sebastián.","Triana si raggiunge a piedi dal Puente de Isabel II; sul lungofiume di Calle Betis si mangia e si guarda il tramonto.","I bar di Triana, a parte quelli del mercato, costano meno di quelli del centro."],["plazaespana","triana"]],
["🍷 Tapas e bodegas",["A Siviglia si mangia «de tapas»: una caña (un piccolo bicchiere di birra alla spina) con una tapa è lo schema base, e un piatto intero si chiama «ración» (o «media ración» se è piccolo).","In molte taverne storiche il barista segna il conto con il gesso sul banco: dì «la cuenta» quando hai finito.","Ordina al banco, dove costa meno; se ti siedi a un tavolino in terrazza, i prezzi salgono del 10–20%."],["rinconcillo","romero","morales"]],
["🌅 Un giorno fuori Siviglia",["Córdoba, con la Mezquita, si raggiunge in treno AVE in circa 45 minuti dalla stazione di Santa Justa.","Cádiz e Jerez de la Frontera sono a circa 1 ora e mezza di treno dalla stazione di Santa Justa."]]],
WTIPS:["L'acqua del rubinetto di Siviglia si può bere: puoi chiederla in ogni locale («agua del grifo, por favor») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti bar riempiono la borraccia se lo chiedi gentilmente.","Le fontane monumentali, come quelle dei giardini dell'Alcázar, non sono da bere."],
GEN:["La Spagna usa l'euro e fa parte dello spazio Schengen: per entrare basta la carta d'identità valida.","Siviglia ha lo stesso fuso orario dell'Italia.","Si pranza tardi (13:30–16) e si cena ancora più tardi (dalle 20:30): fuori da questi orari le cucine di molti ristoranti sono chiuse.","Mancia: non è obbligatoria, ma si lasciano di solito qualche moneta o il 5–10% al tavolo.","La domenica molti negozi sono chiusi; sono aperti ristoranti, bar e le attrazioni principali.","Nel primo pomeriggio (14–17) molti negozi piccoli chiudono per la siesta; a mezzogiorno d'estate il caldo è forte.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚌 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.tussam.es/" target="_blank" rel="noopener">tussam.es</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Madrid: <a href="https://ambmadrid.esteri.it" target="_blank" rel="noopener">ambmadrid.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Siviglia. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.tussam.es/" target="_blank" rel="noopener">tussam.es</a> e, per i voli, il sito della compagnia aerea.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V94 Q50 78 110 84 Q150 88 170 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M16 106 V46 H48 V106 Z M20 46 V32 H44 V46 Z M24 32 V22 H40 V32 Z M27 22 Q32 8 37 22 Z M31.2 8 V2 H32.8 V8 Z"/></g>'+
'<g style="--k:2"><path d="M62 106 V66 H152 V106 Z M58 66 H156 V62 H58 Z M70 62 V50 H76 V62 Z M96 62 V42 H116 V62 Z M100 42 Q106 30 112 42 Z M134 62 V50 H140 V62 Z"/></g>'+
'<g style="--k:3"><path d="M176 106 V66 H206 V106 Z M174 66 H208 V60 H174 Z M180 60 V44 H202 V60 Z M184 44 H198 L196 38 H186 Z M188 38 Q191 28 194 38 Z"/></g>'+
'<g style="--k:4"><path d="M232 106 V86 H238 V106 Z M262 106 V82 H268 V106 Z M290 106 V86 H296 V106 Z M226 80 Q244 56 262 74 Q280 56 298 78 Q310 84 304 88 Q286 72 266 88 Q246 72 228 88 Z"/></g>'+
'<g style="--k:5"><path d="M318 106 V76 H326 V106 Z M316 76 H328 V70 H316 Z M318 70 L322 58 L326 70 Z M376 106 V76 H384 V106 Z M374 76 H386 V70 H374 Z M376 70 L380 58 L384 70 Z M326 98 Q351 82 376 98 V106 H326 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M82 90 v16 M100 90 v16 M118 90 v16 M136 90 v16"/><path d="M336 100 v6 M346 100 v6 M356 100 v6 M366 100 v6"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="226" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.siviglia);
