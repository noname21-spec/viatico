/* ===== Málaga (dati verificati il 14 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.malaga=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: a Málaga arrivano voli diretti dall'Italia solo su Málaga-Costa del Sol (AGP) */
var PAR={
AGP:{n:"Málaga Costa del Sol (AGP)",s:"Aeropuerto de Málaga-Costa del Sol",url:"https://www.aena.es/es/malaga-costa-del-sol.html",live:"Aena",inMin:40,buf:120,pos:[36.6749,-4.4991],sd:"Aeroporto AGP · treno C1 e bus A",rt:"Dall'aeroporto: treno Cercanías C1 fino alla stazione Centro-Alameda (circa 12 minuti), oppure bus A fino a Paseo del Parque, poi a piedi fino al centro storico.",
 arr:"Dall'Italia si entra in Spagna con la carta d'identità o il passaporto: in agosto 2026 la Spagna ha introdotto controlli temporanei su chi arriva dall'Italia, in vigore fino al 7 settembre (dire.it). Non so se siano stati prorogati: tieni i documenti a portata di mano e guarda viaggiaresicuri.it. Dopo il ritiro bagagli hai due strade. Il treno Cercanías C1 parte dalla stazione collegata al terminal (segui i cartelli «Cercanías»), passa dalla stazione María Zambrano e arriva a Centro-Alameda in circa 12 minuti, con un treno ogni 20 minuti circa: da lì il centro storico è a 10–15 minuti a piedi. Il bus A (EMT, «Línea A Aeropuerto») parte dall'uscita arrivi e arriva in circa 20 minuti a Paseo del Parque, a 5 minuti a piedi dalla Cattedrale: è più comodo se hai le valigie.",
 tk:"Treno Cercanías C1: 1,80 € a tratta, biglietto alle macchinette della stazione (tariffe Renfe 2026 da RedTransporte, da confermare su renfe.com). Bus A: 4 € a tratta, si paga a bordo o alle macchinette, i bagagli viaggiano gratis (EMT Málaga, da RedTransporte e Wego, da confermare su emtmalaga.es). Il biglietto urbano da 1,40 € non vale sulla linea A.",
 gm:"Aeropuerto de Málaga-Costa del Sol",
 tips:["Il bus A parte dall'aeroporto dalle 7:00 circa e l'ultima corsa verso la città è alle 23:10 il lunedì, alle 23:59 da martedì a sabato e alle 23:50 la domenica e i festivi (da Wego, luglio 2026, da confermare su emtmalaga.es). Per gli orari esatti del treno guarda renfe.com: non ho verificato la prima e l'ultima corsa.","Il taxi usa il tassametro: da una guida risultano minimi di circa 17–25 € dall'aeroporto, a seconda del giorno e dell'ora, più 0,56 € a valigia nel bagagliaio. Il totale dipende dall'indirizzo (da confermare).","Il treno C1 ha avuto ritardi e disagi nei mesi scorsi: se hai un volo da prendere, lasciati un margine in più oppure usa il bus A."]}
};
/* linee (tracciati indicativi) */
var SEG={
ca:{c:"#e30613",n:"Treno C1 dall'aeroporto",p:[[36.6749,-4.4991,"Aeroporto",2],[36.7118,-4.4331,"María Zambrano",2],[36.7142,-4.4285,"Centro-Alameda",2]]},
ba:{c:"#00709a",n:"Bus A dall'aeroporto",p:[[36.6749,-4.4991,"Aeroporto",2],[36.7175,-4.4225,"Paseo del Parque",2]]}
};
var START=[36.7213,-4.4214];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
function winAlc(wd,d){var o=(d||"0000-10-14").slice(5);return[9*60,(o>="11-01"||o<="03-31")?18*60:20*60]}
var STOPS={
alcazaba:{t:"Alcazaba",z:"B",p:1,min:75,id:100,max:120,pos:[36.7213,-4.4156],q:"Alcazaba de Málaga",cls:"",cl:[],tk:[7,"Alcazaba (7 €, 10 € con il Gibralfaro)",1,1],
 win:winAlc,
 d:"La fortezza-palazzo moresca dell'XI secolo, la meglio conservata di Spagna: mura merlate, porte ad arco, cortili con fontane e giardini di aranci e gelsomini, con vista sul porto e sulla Cattedrale. Si sale a piedi tra rampe e scalini, a tratti ripidi.",
 m:"Aperta tutti i giorni: dal 1° aprile al 31 ottobre 9–20 (ultimo ingresso 19), dal 1° novembre al 31 marzo 9–18 (ultimo ingresso 17) (sito del Comune, alcazabaygibralfaro.malaga.eu). Biglietto 7 € per un solo monumento, 10 € con il Castello di Gibralfaro (ridotto 3 e 5 €). Da una guida risulta l'ingresso gratuito la domenica dalle 14: non l'ho trovato sul sito ufficiale, da confermare. Il lunedì l'ascensore per i palazzi nasridi può essere fermo (guida, da confermare)."},
gibralfaro:{t:"Castello di Gibralfaro",z:"B",p:2,min:60,id:90,max:100,pos:[36.7229,-4.4108],q:"Castillo de Gibralfaro, Málaga",cls:"",cl:[],tk:[3,"Gibralfaro (con il biglietto combinato, 3 € in più)",1],
 win:winAlc,
 d:"Il castello in cima alla collina che domina la città, costruito nel XIV secolo, con una passeggiata sulle mura da cui si vede tutto: Alcazaba, Cattedrale, porto, arena e mare. Per arrivarci si sale per circa 15–20 minuti a piedi dall'Alcazaba oppure in bus.",
 m:"Stessi orari dell'Alcazaba: 9–20 fino al 31 ottobre, 9–18 dal 1° novembre (ultimo ingresso un'ora prima). Solo Gibralfaro 7 €, biglietto combinato con l'Alcazaba 10 € (sito del Comune). Il bus EMT linea 35 sale dal centro fino al castello (da confermare su emtmalaga.es). Il percorso a piedi è ripido: scarpe comode e acqua."},
teatro:{t:"Teatro Romano",z:"B",p:3,min:20,id:30,max:40,pos:[36.7215,-4.4162],q:"Teatro Romano de Málaga",cls:"",cl:[],
 d:"Il teatro costruito nel I secolo d.C. sotto Augusto, ai piedi dell'Alcazaba, riscoperto solo nel 1951. Si vedono le gradinate semicircolari e i resti della scena; accanto c'è il centro di accoglienza con i reperti.",
 m:"L'ingresso è gratuito (guida, da confermare). Non ho trovato gli orari ufficiali: controlla su malaga.eu prima di andare. Anche da fuori, dalla strada, lo si vede bene."},
catedral:{t:"Cattedrale",z:"A",p:1,min:60,id:80,max:100,pos:[36.7197,-4.4194],q:"Catedral de Málaga",cls:"",cl:[],tk:[10,"Cattedrale (10 €, con audioguida)",1,1],
 win:function(wd){return wd===6?[14*60,18*60]:wd===5?[10*60,18*60]:[10*60,18*60+30]},
 d:"La cattedrale rinascimentale detta «la Manquita», la «monca», perché una delle due torri non fu mai finita. Dentro ci sono un coro in legno intagliato e molte cappelle. Con una visita guidata a parte si sale sulle coperture (circa 200 scalini).",
 m:"Aperta lunedì–venerdì 10–18:30 (d'estate fino alle 20, il sito indica orari che non coincidono: da confermare), sabato 10–18, domenica e festivi 14–18; ultimo ingresso 45 minuti prima della chiusura. Biglietto 10 € con audioguida (sito ufficiale malagacatedral.com); una guida indica 12 € con le coperture. La salita alle coperture è a parte, su prenotazione. Chiusa il 25 dicembre e il 1° gennaio; il 24 e il 31 dicembre 10–15. Vestiti in modo decoroso. Il sabato e la domenica durante le funzioni non si visita."},
picasso:{t:"Museo Picasso",z:"B",p:2,min:75,id:100,max:120,pos:[36.7219,-4.4184],q:"Museo Picasso Málaga",cls:"",cl:[],tk:[9.5,"Museo Picasso, collezione (9,50 €)",1],
 win:function(){return[10*60,19*60]},
 d:"Il museo nel Palazzo di Buenavista, nella città dove Picasso nacque nel 1881: oltre 200 opere donate dalla famiglia, dai primi disegni alle ceramiche, in un palazzo rinascimentale con tracce romane e fenicie nei sotterranei.",
 m:"Aperto tutti i giorni 10–19 (da una guida, da confermare sul sito del museo: in alcuni periodi apre più tardi). La collezione costa 9,50 € (ridotto 7,50 €); con le mostre temporanee fino a 12 €. Ingresso gratuito la domenica nelle ultime due ore e in alcuni giorni dell'anno, tra cui il 27 ottobre, anniversario del museo (guida, da confermare)."},
pompidou:{t:"Centre Pompidou",z:"C",p:4,min:60,id:90,max:100,pos:[36.7165,-4.4180],q:"Centre Pompidou Málaga",cls:"",cl:[1],tk:[9,"Centre Pompidou (9 €)",1],
 win:function(){return[9*60+30,20*60]},
 d:"La succursale spagnola del museo di Parigi nel porto, riconoscibile dal «cubo» di vetro colorato. La collezione permanente ha opere di Picasso, Magritte, Frida Kahlo e Kandinsky, spesso accompagnate da mostre temporanee.",
 m:"Aperto tutti i giorni tranne il martedì, 9:30–20 (ultimo ingresso 30 minuti prima), anche nei festivi; il 24 e il 31 dicembre chiude alle 15 (da una scheda, da confermare sul sito del museo). Il biglietto parte da 9 € (collezione permanente più temporanee; Ticketlens). Ingresso gratuito la domenica dalle 16 (guida, da confermare)."},
thyssen:{t:"Museo Carmen Thyssen",z:"A",p:4,min:60,id:90,max:100,pos:[36.7222,-4.4226],q:"Museo Carmen Thyssen Málaga",cls:"",cl:[0],tk:[12,"Museo Carmen Thyssen (12 €)",1],
 win:function(){return[10*60,20*60]},
 d:"Un palazzo del Cinquecento in pieno centro, con la grande collezione di pittura ottocentesca andalusa: paesaggi, scene popolari, corride e ritratti. Sotto il museo si vedono i resti archeologici di una casa romana.",
 m:"Aperto da martedì a domenica 10–20 (ultimo ingresso 30 minuti prima), chiuso il lunedì tranne il 18 maggio, il 12 ottobre e il 7 dicembre. Il 24 e il 31 dicembre chiude alle 15; chiuso il 25 dicembre, il 1° e il 6 gennaio. Biglietto 12 € (15 € con il sito archeologico), ridotto 8 € (sito ufficiale, tariffe da gennaio 2026). Gratis la domenica dalle 16."},
atarazanas:{t:"Mercato di Atarazanas",z:"A",p:3,min:40,id:50,max:70,pos:[36.7185,-4.4253],q:"Mercado Central de Atarazanas, Málaga",cls:"walk",cl:[6],
 win:function(){return[8*60,15*60]},
 d:"Il mercato coperto della città in un edificio nel quale sopravvive un portale moresco del XIV secolo, con una vetrata che raffigura la storia di Málaga. Banchi di pesce fresco, frutta, olive, prosciutti e formaggi; dentro ci sono bar dove si mangia in piedi.",
 m:"Aperto da lunedì a sabato 8–15, chiuso la domenica (guide; da confermare). Per il pesce conviene andare prima delle 11. L'ingresso è libero. Per mangiare i banchi vicino all'ingresso costano di più, il bar interno prepara pescaíto e boquerones."},
larios:{t:"Calle Larios e Plaza de la Constitución",z:"A",p:3,min:35,id:45,max:70,pos:[36.7208,-4.4216],q:"Calle Larios, Málaga",cls:"walk",
 d:"La via pedonale più elegante della città, con facciate chiare di fine Ottocento, negozi e caffè, che parte dalla Plaza de la Constitución e scende fino al Paseo del Parque. Di sera è molto frequentata e, nel periodo natalizio, famosa per le luci.",
 m:"Si cammina liberamente e gratis a tutte le ore. I negozi aprono di solito 10–21 e molti restano aperti anche la domenica nel centro. Le luci di Natale vengono accese da fine novembre (data da confermare)."},
muelle:{t:"Muelle Uno e il porto",z:"C",p:4,min:45,id:60,max:90,pos:[36.7168,-4.4172],q:"Muelle Uno, Málaga",cls:"walk",
 d:"La banchina del porto trasformata in passeggiata con negozi, bar e ristoranti, vicino al Pompidou. Da qui si vedono le navi, il faro La Farola e, sopra, l'Alcazaba. Per arrivare, dal Paseo del Parque si attraversa la strada del porto.",
 m:"Si cammina liberamente e gratis. I negozi e i locali hanno orari propri: in genere aprono dalle 10 e chiudono a tarda sera (da confermare)."}
};
/* collegamenti tra le tappe: calcolati dalle posizioni, a piedi */
var LEGS={};
(function(){
var NM={start:"a Plaza de la Constitución",alcazaba:"all'Alcazaba",gibralfaro:"al Castello di Gibralfaro",teatro:"al Teatro Romano",catedral:"alla Cattedrale",picasso:"al Museo Picasso",pompidou:"al Centre Pompidou",thyssen:"al Museo Carmen Thyssen",atarazanas:"al Mercato di Atarazanas",larios:"a Calle Larios",muelle:"a Muelle Uno"};
var POS={start:START};Object.keys(STOPS).forEach(function(k){POS[k]=STOPS[k].pos});
function hv(a,b){var r=Math.PI/180,R=6371000,dl=(b[0]-a[0])*r,dg=(b[1]-a[1])*r,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dg/2)*Math.sin(dg/2);return 2*R*Math.asin(Math.sqrt(x))}
function up(s){return s.charAt(0).toUpperCase()+s.slice(1)}
var ks=Object.keys(POS);
for(var i=0;i<ks.length;i++)for(var j=0;j<ks.length;j++){if(i===j)continue;var a=ks[i],b=ks[j];if(a==="start"&&b==="larios"||a==="larios"&&b==="start")continue;
var d=hv(POS[a],POS[b]),hill=(a==="gibralfaro"||b==="gibralfaro"),mn=Math.max(2,Math.round(d*(hill?1.6:1.25)/(hill?55:75)));
LEGS[a+">"+b]={min:mn,mode:"walk",txt:"A piedi fino "+NM[b]+", circa "+mn+" minuti"+(b==="gibralfaro"?", in salita (c'è anche il bus EMT linea 35, da confermare)":a==="gibralfaro"?", in discesa":"")+".",g:[W([POS[a],POS[b]])]}}
LEGS["start>larios"]={min:2,mode:"walk",txt:"Calle Larios comincia proprio da Plaza de la Constitución: due minuti a piedi.",g:[W([START,POS.larios])]};
LEGS["larios>start"]={min:2,mode:"walk",txt:"A piedi fino a Plaza de la Constitución, circa 2 minuti.",g:[W([POS.larios,START])]};
})();
/* ritorno in aeroporto: treno C1 da Centro-Alameda */
var RET={
AGP:{
 A:{min:40,txt:"A piedi fino alla stazione Centro-Alameda (10–15 minuti), poi treno Cercanías C1 fino all'aeroporto (circa 12 minuti, un treno ogni 20 minuti circa). Biglietto 1,80 €. In alternativa bus A da Paseo del Parque fino all'aeroporto (circa 20 minuti, 4 €): l'ultima corsa dalla città è verso mezzanotte.",g:[W([[36.7213,-4.4214],[36.7180,-4.4252],[36.7142,-4.4285]]),["ca","Centro-Alameda","Aeroporto"]]}}
};
var ARR={
AGP:[["ca","Aeroporto","Centro-Alameda"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari da guide e portali turistici (andalucia.org, InYourPocket, Cargest): non letti sui siti dei locali, da confermare */
var V={
aranda:{n:"Casa Aranda",a:"Calle Herrería del Rey 3",z:"A",r:"4,3",pos:[36.7215,-4.4226],h:["08:00-12:30,17:00-20:15","08:00-12:30,17:00-20:15","08:00-12:30,17:00-20:15","08:00-12:30,17:00-20:15","08:00-12:30,17:00-20:15","08:00-12:30,17:00-20:15","08:00-12:30,17:00-20:15"],
 d:"Una churrería storica del centro: churros e porras da inzuppare nella cioccolata densa. Si mangia in piedi o ai tavolini, con la coda soprattutto il sabato e la domenica mattina.",pr:"Churros con cioccolata circa 4–6 € (Cargest e guide, listino non visto). Gli orari variano di mezz'ora tra le fonti (InYourPocket indica 7:30–13 e 17–21): da confermare."},
canasta:{n:"La Canasta",a:"Plaza de la Constitución 13",z:"A",r:"3,8",pos:[36.7213,-4.4214],h:D7("08:00-21:30"),
 d:"Un forno-pasticceria sulla piazza principale, con pane fresco, dolci e panini. Per una colazione veloce (caffè e tostada) o uno spuntino da portar via.",pr:"Colazione circa 2–5 € (Cargest, listino non visto). Orari da guida, da confermare."},
julieta:{n:"La Bella Julieta",a:"Calle Puerta del Mar 20",z:"A",r:"4,2",pos:[36.7196,-4.4230],h:["08:00-20:30","08:00-20:30","08:00-20:30","08:00-20:30","08:00-20:30","09:00-20:30","09:00-20:30"],
 d:"Un caffè-pasticceria luminoso vicino a Calle Larios: caffè, torte, dolci e colazioni più abbondanti, con un po' di scelta per chi vuole qualcosa di diverso dalla solita tostada.",pr:"Colazione circa 6–12 € a persona (Cargest, listino non visto). Orari da guida, da confermare."},
quitapenas:{n:"Bodegas Quitapenas (Taberna Marín García)",a:"Calle Marín García 4",z:"A",r:"4,1",pos:[36.7206,-4.4228],h:D7("11:30-16:00,19:30-23:59"),
 d:"Una bodega con botti di vino dolce di Málaga, vermouth e tapas semplici: boquerones fritti, acciughe, salumi e formaggi. Aperta tutti i giorni, a due passi da Calle Larios.",pr:"Tapas da 3–6 € circa, vino a bicchiere 2–4 € (listino non visto). Orari da andalucia.org, da confermare."},
lola:{n:"Taberna Casa Lola",a:"Calle Granada 46",z:"B",r:"4,2",pos:[36.7217,-4.4192],h:D7("12:00-23:30"),
 d:"Una taverna sempre piena in una via del centro, con croquetas, gamberi alla piastra, ajoblanco malagueño e piccoli montaditos, da bere con un vermouth freddo. Conviene arrivare presto o prenotare.",pr:"Tapas da 3,50 a 6 € (Malaga Travel Guide, listino non visto); un pasto leggero 15–22 € a testa circa. Orari da TableJourney, da confermare."},
pimpi:{n:"El Pimpi",a:"Calle Granada 62",z:"B",r:"4,3",pos:[36.7218,-4.4177],h:D7("10:00-23:59"),
 d:"La bodega più famosa della città, in un palazzo con tante sale e botti firmate da personaggi famosi. Si assaggia il vino dolce di Málaga con tapas come le berenjenas con miel, di fronte al Teatro Romano e all'Alcazaba. Frequentata dai turisti, ma resta un classico.",pr:"Tapas 4–7 €, vino dolce circa 3 € (Malaga Travel Guide, listino non visto). Orari da andalucia.org, da confermare: in genere resta aperta fino alle 2, il venerdì e il sabato fino alle 3."},
guardia:{n:"Antigua Casa de Guardia",a:"Alameda Principal 18",z:"D",r:"4,5",pos:[36.7180,-4.4250],h:["10:00-22:00","10:00-22:00","10:00-22:00","10:00-22:00","10:00-23:45","10:00-23:45",""],
 d:"La bodega più antica di Málaga, aperta nel 1840: botti di legno lungo il banco e il conto che il barista scrive con il gesso. Si beve vino dolce o secco di Málaga e si prendono frutti di mare e tapas al banco.",pr:"Un bicchiere di vino costa pochi euro, le tapas e i frutti di mare 4–10 € circa (listino non visto). Orari da InYourPocket, da confermare: chiusa la domenica."},
atarazanas_bar:{n:"Bar Mercado Atarazanas",a:"Calle Atarazanas 10 (dentro il mercato)",z:"A",r:"4,1",pos:[36.7185,-4.4254],h:["09:00-15:00","09:00-15:00","09:00-15:00","09:00-15:00","09:00-15:00","09:00-15:00",""],
 d:"Il bar dentro il mercato: pesce fritto, boquerones al limone e spiedini di gamberi, serviti in piedi a un banco di metallo. Molto affollato all'ora di pranzo.",pr:"Tapas e porzioni di pesce 5–10 € circa (Malaga Travel Guide, listino non visto). Orari e chiusura domenicale da guide, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["canasta","aranda","julieta"],B:["aranda","canasta"],C:["canasta","julieta"],D:["julieta","canasta"]},
pra:{A:["atarazanas_bar","quitapenas","lola"],B:["lola","pimpi","quitapenas"],C:["quitapenas","lola"],D:["guardia","atarazanas_bar","quitapenas"]},
cen:{A:["quitapenas","lola","pimpi"],B:["pimpi","lola","quitapenas"],C:["quitapenas","pimpi"],D:["guardia","quitapenas","lola"]},
snk:{A:["aranda","canasta","julieta"],B:["pimpi","aranda"],C:["canasta","julieta"],D:["guardia","julieta"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"fort",t:"Alcazaba, Teatro Romano e Gibralfaro",acts:["alcazaba","teatro","gibralfaro"],need:200,core:1},
{id:"centro",t:"Cattedrale, Museo Picasso e Calle Larios",acts:["catedral","picasso","larios"],need:190,core:1},
{id:"mercato",t:"Atarazanas e Museo Thyssen",acts:["atarazanas","thyssen"],need:120},
{id:"porto",t:"Muelle Uno e Centre Pompidou",acts:["muelle","pompidou"],need:130}
];
var ORDER=["alcazaba","catedral","gibralfaro","picasso","teatro","atarazanas","larios","thyssen","muelle","pompidou"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cen","Centro storico (Cattedrale, Calle Larios)",[36.7210,-4.4210],"A"],
["alc","Alcazaba / Plaza de la Merced / Museo Picasso",[36.7222,-4.4175],"B"],
["por","Porto e Muelle Uno",[36.7172,-4.4165],"C"],
["ala","Alameda / Soho / stazione María Zambrano",[36.7150,-4.4270],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[36.7213,-4.4214],""]
];
/* imposta di soggiorno: a Málaga non risulta in vigore (da confermare) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Tostada con aceite y tomate","pane tostato con olio d'oliva e pomodoro grattugiato."],["Churros con chocolate","frittelle lunghe da inzuppare nella cioccolata densa."],["Café «mitad»","a Málaga il caffè si ordina così: «mitad» è metà caffè e metà latte, «sombra» è con più latte, «nube» con pochissimo caffè."]],
pra:[["Boquerones fritos","acciughe fresche fritte, il piatto simbolo di Málaga."],["Espeto de sardinas","sardine infilate in una canna e cotte alla brace sulla spiaggia."],["Ajoblanco","crema fredda di mandorle e aglio, da bere o con l'uvetta."],["Porra antequerana","crema densa e fredda di pomodoro, simile al salmorejo, con prosciutto e uovo."]],
cen:[["Berenjenas con miel","melanzane fritte con miele di canna, tipiche di Málaga."],["Gambas al pil-pil","gamberi nell'olio con aglio e peperoncino."],["Fritura malagueña","fritto misto di pesce, leggerissimo."],["Vino dulce de Málaga","vino dolce locale, ottimo a fine pasto o con un dolce."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","L'Alcazaba dal basso","Foto","Le mura dell'Alcazaba viste da Calle Alcazabilla, con il Teatro Romano in primo piano.",[36.7212,-4.4162],"Alcazaba de Málaga","alcazaba"],
["📷","I patii dell'Alcazaba","Foto","Gli archi e le fontane dei cortili, con le arance sugli alberi e la luce del mattino.",[36.7213,-4.4156],"Alcazaba de Málaga","alcazaba"],
["📷","La vista da Gibralfaro","Foto","Il panorama su porto, arena e Cattedrale dal camminamento delle mura, al tramonto.",[36.7229,-4.4108],"Castillo de Gibralfaro, Málaga","gibralfaro"],
["🤳","Le mura di Gibralfaro","Selfie","Un selfie sul camminamento con Málaga e il mare dietro di te.",[36.7228,-4.4110],"Castillo de Gibralfaro, Málaga","gibralfaro"],
["📷","Il Teatro Romano","Foto","Le gradinate semicircolari ai piedi dell'Alcazaba, visibili anche dalla strada.",[36.7215,-4.4162],"Teatro Romano de Málaga","teatro"],
["📷","La Manquita","Foto","La Cattedrale con la sua unica torre completa, vista da Calle Molina Lario o dalla Plaza del Obispo.",[36.7199,-4.4196],"Catedral de Málaga","catedral"],
["📷","Plaza del Obispo","Foto","La facciata barocca della Cattedrale e la piazza con i tavolini.",[36.7208,-4.4185],"Plaza del Obispo, Málaga","catedral"],
["📷","Il Museo Picasso","Foto","L'ingresso del Palazzo di Buenavista in Calle San Agustín.",[36.7219,-4.4184],"Museo Picasso Málaga","picasso"],
["📷","Calle Larios di sera","Foto","La via pedonale illuminata, vista dalla Plaza de la Constitución.",[36.7208,-4.4216],"Calle Larios, Málaga","larios"],
["📷","Il Pompidou e il suo cubo","Foto","Il cubo di vetro colorato sulla banchina, con il mare dietro.",[36.7165,-4.4180],"Centre Pompidou Málaga","pompidou"],
["🤳","La Farola","Selfie","Il faro del porto, con le navi e il mare.",[36.7137,-4.4150],"La Farola, Málaga","muelle"],
["📷","Il portale di Atarazanas","Foto","Il portale moresco del XIV secolo all'ingresso del mercato.",[36.7185,-4.4253],"Mercado Central de Atarazanas, Málaga","atarazanas"]
];
/* avvisi (verificati il 14 ottobre 2026) */
var AVV=[
{from:"2026-10-14",to:"2026-10-31",t:"Alcazaba e Gibralfaro: ultimi giorni con l'orario estivo",x:"Fino al 31 ottobre Alcazaba e Gibralfaro chiudono alle 20 (ultimo ingresso alle 19). Dal 1° novembre al 31 marzo l'orario è 9–18 (ultimo ingresso alle 17): conta di arrivare entro metà pomeriggio."},
{from:"2026-10-14",to:"2026-10-31",t:"Controlli sui voli dall'Italia: da verificare",x:"Dall'8 agosto al 7 settembre 2026 la Spagna ha avviato controlli temporanei su chi arriva dall'Italia (dire.it). Non ho trovato conferme su una proroga: porta carta d'identità o passaporto validi per l'espatrio e controlla viaggiaresicuri.it prima di partire."},
{from:"2026-10-14",to:"2027-03-31",t:"Biglietto EMT: possibile aumento a 1,50 €",x:"Il biglietto del bus EMT costa 1,40 €. L'amministrazione di Málaga ha avviato una nuova ordinanza che lo porterebbe a 1,50 € (approvazione iniziale pubblicata il 7 luglio 2026, El Español): non so se sia già in vigore. La linea A per l'aeroporto resta a 4 €."},
{from:"2026-10-20",to:"2026-10-28",t:"27 ottobre: Museo Picasso gratuito",x:"Il 27 ottobre, anniversario del museo, l'ingresso al Museo Picasso è gratuito (guida, da confermare sul sito del museo). Aspettati code lunghe."},
{from:"2026-12-01",to:"2026-12-08",t:"Museo Thyssen: apre anche lunedì 7 dicembre",x:"Il Museo Carmen Thyssen è di norma chiuso il lunedì, ma lunedì 7 dicembre apre eccezionalmente dalle 10 alle 20 (sito ufficiale)."},
{from:"2026-12-20",to:"2027-01-06",t:"Natale: orari ridotti e chiusure",x:"La Cattedrale è chiusa il 25 dicembre e il 1° gennaio e il 24 e 31 dicembre apre dalle 10 alle 15; il 6 gennaio dalle 14 alle 18. Il Museo Thyssen è chiuso il 25 dicembre, il 1° e il 6 gennaio e il 24 e 31 chiude alle 15. Il 25 dicembre, il 1° e il 6 gennaio sono festivi in Spagna, con molti ristoranti chiusi."}
];
/* clima medio di Málaga (indicativo, massime/minime) */
var CLIM=[[17,9],[18,9],[20,11],[22,13],[25,15],[29,19],[31,22],[31,22],[29,20],[25,16],[21,12],[18,10]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Málaga: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="catedral"&&WD===6)meta+=" Oggi è domenica: la Cattedrale apre solo dalle 14 alle 18.";
if(it.id==="picasso"&&WD===6)meta+=" Oggi è domenica: l'ingresso è gratuito nelle ultime due ore (17–19), ma c'è coda.";
if(it.id==="pompidou"&&WD===6)meta+=" Oggi è domenica: dalle 16 l'ingresso è gratuito.";
if(it.id==="thyssen"&&WD===6)meta+=" Oggi è domenica: dalle 16 l'ingresso è gratuito.";
if(it.id==="alcazaba"&&WD===6)meta+=" Oggi è domenica: da una guida risulta l'ingresso gratuito dalle 14, da confermare.";
return meta}
Object.assign(C,{id:"malaga",n:"Málaga",cn:"Spagna",e:"☀️",flag:"🇪🇸",col:["#c8102e","#f1bf00","#1f6f8b"],k:"malaga spagna spain costa del sol",
TZ:"Europe/Madrid",LL:[36.7213,-4.4214],CC:"es",QN:"Málaga",BK:"Málaga",ARE:/málaga|malaga|\b29\d{3}\b/i,VER:"14 ottobre 2026",
Z0:"A",LANG:"es-ES",LANGN:"spagnolo",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Plaza de la Constitución",q:"Plaza de la Constitución, Málaga"},
SINGLE:{acts:["alcazaba","teatro","catedral","picasso","larios"],ins:[]},
EXCL:[],
DICON:{alcazaba:"🏰",gibralfaro:"🌄",teatro:"🏛️",catedral:"⛪",picasso:"🎨",pompidou:"🖼️",thyssen:"🖌️",atarazanas:"🐟",larios:"🛍️",muelle:"⚓"},
ZN:{A:"nel centro storico",B:"verso l'Alcazaba e il Museo Picasso",C:"al porto",D:"verso l'Alameda"},
NEAR:{col:"cafetería o churrería",pra:"bar de tapas",cen:"bodega o bar de tapas",snk:"bar o pasticceria"},
SE:{aranda:"🥐",canasta:"🥖",julieta:"☕",quitapenas:"🍷",lola:"🍤",pimpi:"🍷",guardia:"🥂",atarazanas_bar:"🐟"},
TR:{one:1.4,lbl:"Bus EMT e treno Cercanías",
 air:{AGP:{one:1.8,n:"Treno Cercanías C1 per l'aeroporto (1,80 € a tratta); bus A 4 €"}},
 passes:[],
 note:"Prezzi 2026 da RedTransporte e da Wego, che riportano le tariffe di EMT Málaga e Renfe: biglietto singolo del bus 1,40 € (in progetto un aumento a 1,50 €), bus A per l'aeroporto 4 €, treno C1 per l'aeroporto 1,80 € (zone 1–2, andata e ritorno 3,60 €), metro 1,35 € a corsa (non serve il centro). Da confermare su emtmalaga.es e renfe.com. Il centro si visita quasi tutto a piedi; il bus 35 sale a Gibralfaro."},
FOOD:{co:[4,"Colazione (churros o tostada e caffè)"],pr:[13,"Pranzo (tapas o fritto di pesce)"],ce:[18,"Cena (tapas e un piatto)"],sp:[4,"Spuntini e dolci"]},
T:{ride:"In bus o in treno",move:"quasi tutto a piedi, o in bus",bags:"«¿Puedo dejar las maletas aquí?»",bagsPM:"«¿Puedo dejar las maletas hasta esta tarde?»",bagsAM:"«¿Puedo dejar las maletas hasta mediodía?»",
pra:"Un bar de tapas",praZ:{A:"Intorno alla Cattedrale e a Calle Larios molti locali con foto sul menù sono per turisti e costano di più: per tapas e pesce vero scegli le taverne un po' più interne o il bar del mercato di Atarazanas.",B:"Calle Granada è piena di locali: Casa Lola e El Pimpi sono molto frequentati, quindi arriva presto o prenota."},
freeLong:"Qualche idea: una passeggiata al tramonto sul Paseo del Parque e sul porto, un bagno o una camminata sulla spiaggia della Malagueta, un vino dolce in una bodega o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata sul porto e una sosta in una bodega.",
remind:"Per l'Alcazaba e il Gibralfaro compra il biglietto online sul sito del Comune, e ricorda che dal 1° novembre chiudono alle 18. La Cattedrale ha orari ridotti la domenica.",
rain1:"Al coperto: la Cattedrale, il Museo Picasso, il Centre Pompidou, il Museo Thyssen e il Mercato di Atarazanas.",
rainM:"Al coperto: Cattedrale, Museo Picasso, Centre Pompidou, Museo Thyssen e il Mercato di Atarazanas.",
water:"Riempite la borraccia: l'acqua del rubinetto di Málaga si può bere. Attivate «Acqua» sulla mappa per vedere le fontanelle pubbliche vicino al percorso.",
kitchen:"A Málaga si pranza tra le 13:30 e le 16 e si cena dalle 20:30: molte taverne chiudono la cucina nel pomeriggio, ma i bar di tapas del centro restano spesso aperti.",
night:[["🍷","Un bicchiere di vino dolce di Málaga con le tapas è il modo giusto di chiudere la giornata: i locali si riempiono dalle 21."],["🕙","Le cucine servono fino alle 23 circa; il bus A per l'aeroporto parte fino a mezzanotte circa."],["☕","Molti bar aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è buona)",
fuso:"Málaga ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea, nessun adattatore)",
foodNote:"I pasti sono stime per bar di tapas e taverne: una colazione con churros costa 4–6 €, una tapa 3–6 € e una cena con un paio di piatti circa 15–22 €. Si paga quasi ovunque con la carta, ma nei bar piccoli conviene avere qualche euro in contanti.",
taxNote:"A Málaga non risulta in vigore una tassa di soggiorno (all'ottobre 2026, da confermare): il Comune la chiede da tempo, ma serve il via libera della Regione. Il prezzo dell'alloggio è quello che paghi.",
mcrit:"Criteri: bodegas, churrerie e bar di tapas del centro con buone valutazioni e prezzi popolari, niente catene. Una colazione e una cena restano sotto i 15–22 € a persona. Orari, valutazioni e prezzi sono quelli di guide e portali turistici (ottobre 2026) e non sono stati letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Al ritorno il treno C1 parte da Centro-Alameda; il bus A da Paseo del Parque. Controlla gli orari su renfe.com e emtmalaga.es il giorno prima.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto del treno C1 (1,80 €) o del bus A (4 €) per l'aeroporto",function(E){return true}],["alc","Biglietto per l'Alcazaba e il Gibralfaro (10 € combinato): comprali online",["alcazaba","gibralfaro"]],["cat","Biglietto per la Cattedrale (10 €)",["catedral"]],["pic","Biglietto per il Museo Picasso (9,50 €)",["picasso"]],["pom","Biglietto per il Centre Pompidou (9 €)",["pompidou"]],["thy","Biglietto per il Museo Carmen Thyssen (12 €)",["thyssen"]],["card","Carta d'identità o passaporto in corso di validità"],["cash","Qualche euro in contanti per i bar piccoli e per il bus"]],
NUM:{1:["uno","UNO"],2:["dos","dos"],3:["tres","tres"],4:["cuatro","KUA-tro"],5:["cinco","TSIN-ko"],6:["seis","seis"],7:["siete","SIE-te"],8:["ocho","O-cio"],9:["nueve","NUE-ve"],10:["diez","diez"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Buenos días / Buenas tardes","BUE-nos DI-as / BUE-nas TAR-des"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Una mesa para "+(N===1?"una persona":nu[0])+", por favor","U-na ME-sa PA-ra "+(N===1?"U-na per-SO-na":nu[1])+", por fa-VOR"],["Una caña e una tapa di tortilla, per favore","Una caña y una tapa de tortilla, por favor","U-na KA-nia i U-na TA-pa de tor-TI-ia, por fa-VOR"],["Un caffè «mitad» (metà caffè e metà latte)","Un café mitad, por favor","un ka-FE mi-TAD, por fa-VOR"],["Acqua del rubinetto, per favore","Agua del grifo, por favor","A-gua del GRI-fo, por fa-VOR"],["Il conto, per favore","La cuenta, por favor","la KUEN-ta, por fa-VOR"],["Posso pagare con la carta?","¿Puedo pagar con tarjeta?","PUE-do pa-GAR kon tar-HE-ta"],["Quanto costa?","¿Cuánto cuesta?","KUAN-to KUES-ta"],["Dov'è la fermata del bus?","¿Dónde está la parada del autobús?","DON-de es-TA la pa-RA-da del au-to-BUS"],["Qual è il bus per l'aeroporto?","¿Cuál es el autobús al aeropuerto?","kual es el au-to-BUS al ae-ro-PUER-to"]];
if(M)fr=fr.concat([["Ho una prenotazione","Tengo una reserva","TEN-go U-na re-SER-va"],["Posso lasciare i bagagli?","¿Puedo dejar las maletas aquí?","PUE-do de-HAR las ma-LE-tas a-KI"],["A che ora è il check-out?","¿A qué hora es el check-out?","a ke O-ra es el chek-AUT"]]);
return fr.concat([["Mi scusi","Perdone","per-DO-ne"],["Grazie mille!","¡Muchas gracias!","MU-cias GRA-sias"]])},
taxTxt:function(tx){return "A Málaga non risulta in vigore una tassa di soggiorno (all'ottobre 2026, da confermare): il prezzo che trovi sull'annuncio è quello che paghi."},
STAYTIPS:["Il centro storico è piccolo e quasi tutto si fa a piedi; il bus serve soprattutto per salire a Gibralfaro o per l'aeroporto. D'estate il caldo di mezzogiorno è forte: le ore migliori per camminare sono la mattina presto e la sera."],
ZONES:[
["🚌 Bus, treno e biglietti",["Il biglietto singolo del bus EMT costa 1,40 € (in progetto 1,50 €); la linea A per l'aeroporto costa 4 € e il treno C1 1,80 €. Non ho trovato una tessera turistica a tariffa conveniente: conviene pagare le singole corse.","Il treno C1 collega l'aeroporto, la stazione María Zambrano e Centro-Alameda; il metro di Málaga non serve il centro storico.","Il centro si percorre quasi tutto a piedi: Cattedrale, Museo Picasso, Alcazaba e Calle Larios sono a pochi minuti l'uno dall'altro."]],
["🏰 Alcazaba, Gibralfaro e Teatro Romano",["L'Alcazaba e il Gibralfaro si visitano con un biglietto combinato da 10 €; il Teatro Romano, ai piedi dell'Alcazaba, è gratuito.","Dall'Alcazaba una salita di 15–20 minuti porta al Gibralfaro; in alternativa il bus 35 sale dal centro.","Dal 1° novembre le due fortezze chiudono alle 18: pianifica la salita nel primo pomeriggio."],["alcazaba","gibralfaro","teatro"]],
["⛪ Cattedrale, Picasso e musei",["La Cattedrale (la «Manquita») si visita con audioguida; il biglietto base costa 10 € e la salita alle coperture è a parte.","Il Museo Picasso è nel palazzo di Buenavista, a 5 minuti dalla Cattedrale; ingresso gratuito la domenica nelle ultime due ore.","Il Centre Pompidou è chiuso il martedì, il Museo Thyssen il lunedì."],["catedral","picasso","pompidou","thyssen"]],
["🍷 Tapas e bodegas",["A Málaga si mangia «de tapas»: una caña (un piccolo bicchiere di birra alla spina) con una tapa è lo schema base, e un piatto intero si chiama «ración» (o «media ración» se è piccolo).","Nelle bodegas storiche come l'Antigua Casa de Guardia il barista segna il conto con il gesso sul banco.","Il vino dolce di Málaga è il classico dopo cena; il caffè si ordina in modo speciale: «mitad», «sombra» o «nube»."],["pimpi","guardia","lola"]],
["🌅 Un giorno fuori Málaga",["Nerja, Ronda e il Caminito del Rey sono mete frequenti da Málaga: i collegamenti e i biglietti vanno controllati prima, perché io non li ho verificati.","Il Caminito del Rey è un sentiero sospeso che richiede la prenotazione e un giorno intero."]]],
WTIPS:["L'acqua del rubinetto di Málaga si può bere: puoi chiederla in ogni locale («agua del grifo, por favor») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti bar riempiono la borraccia se lo chiedi gentilmente.","Le fontane monumentali, come quelle dell'Alcazaba, non sono da bere."],
GEN:["La Spagna usa l'euro e fa parte dello spazio Schengen, ma ad agosto 2026 ha avviato controlli temporanei su chi arriva dall'Italia: porta la carta d'identità o il passaporto validi per l'espatrio.","Málaga ha lo stesso fuso orario dell'Italia.","Si pranza tardi (13:30–16) e si cena ancora più tardi (dalle 20:30): fuori da questi orari le cucine di molti ristoranti sono chiuse.","Mancia: non è obbligatoria, ma si lasciano di solito qualche moneta o il 5–10% al tavolo.","La domenica molti negozi sono chiusi; sono aperti ristoranti, bar e le attrazioni principali.","Nel primo pomeriggio (14–17) molti negozi piccoli chiudono per la siesta; a mezzogiorno d'estate il caldo è forte.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze (polizia, ambulanza, vigili del fuoco)</li><li>🚌 Trasporti pubblici, anche per oggetti smarriti: <a href="https://www.emtmalaga.es/" target="_blank" rel="noopener">emtmalaga.es</a> · treni: <a href="https://www.renfe.com/" target="_blank" rel="noopener">renfe.com</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Madrid: <a href="https://ambmadrid.esteri.it" target="_blank" rel="noopener">ambmadrid.esteri.it</a>, per documenti persi o rubati. Unità di Crisi della Farnesina (24 ore su 24): +39 06 36225.</li>',
STRK:'Al 14 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Málaga. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.emtmalaga.es/" target="_blank" rel="noopener">emtmalaga.es</a>, <a href="https://www.renfe.com/" target="_blank" rel="noopener">renfe.com</a> e, per i voli, il sito della compagnia aerea.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="348" cy="24" r="11"/><path d="M0 106 V82 Q40 60 90 68 Q130 74 156 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M66 70 V56 H72 V52 H76 V56 H82 V52 H86 V56 H92 V52 H96 V56 H100 V70 Z M72 56 V44 H94 V56 Z M80 44 V38 H86 V44 Z"/></g>'+
'<g style="--k:2"><path d="M110 106 V76 H118 V72 H122 V76 H130 V72 H134 V76 H142 V72 H146 V76 H156 V106 Z M120 76 V62 H134 V76 Z M122 62 V56 H132 V62 Z"/></g>'+
'<g style="--k:3"><path d="M176 106 V70 H224 V106 Z M174 70 V63 H226 V70 Z M186 63 V28 H202 V63 Z M188 28 L194 14 L200 28 Z M210 63 Q218 48 226 63 Z"/></g>'+
'<g style="--k:4"><path d="M254 106 V74 H290 V106 Z M259 80 V101 H285 V80 Z"/><path d="M258 74 L272 66 L286 74 Z"/></g>'+
'<g style="--k:5"><path d="M326 106 V70 H334 V106 Z M324 70 H336 V64 H324 Z M326 64 V56 H334 V64 Z M328 56 L330 44 L332 56 Z M300 106 V94 H316 V106 Z M338 106 V92 H370 V106 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M120 92 v14 M138 92 v14 M184 80 v26 M196 80 v26 M214 80 v26"/><path d="M350 98 q8 -5 16 0 t16 0"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="14" r="1.6"/><circle cx="106" cy="14" r="1.3"/><circle cx="170" cy="18" r="1.3"/><circle cx="236" cy="22" r="1.3"/><circle cx="310" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.malaga);
