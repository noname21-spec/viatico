(function(o){
/* ===== Valencia (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.valencia=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: Valencia (Manises) è l'unico scalo con voli diretti dall'Italia */
var PAR={
VLC:{n:"Valencia (VLC)",s:"Valencia-Manises",url:"https://www.aena.es/es/valencia.html",live:"Aena",inMin:60,buf:120,pos:[39.4893,-0.4816],sd:"Aeroporto VLC · metro L3 e L5",rt:"Dall'aeroporto: metro L3 o L5 fino alla stazione Xàtiva (Estación del Norte), poi 5 minuti a piedi fino alla Plaza del Ayuntamiento.",
 arr:"Dall'Italia si entra in Spagna senza passaporto, ma da agosto 2026 i due Paesi hanno reintrodotto controlli temporanei sui passeggeri dei voli Italia–Spagna: tieni pronta la carta d'identità o il passaporto anche all'arrivo. Dopo il ritiro bagagli segui i cartelli «Metro»: la stazione è collegata al terminal. Le linee L3 (direzione Rafelbunyol) e L5 (direzione Marítim) passano più o meno ogni 15–20 minuti e in circa 20 minuti arrivano in centro. Scendi a Xàtiva (accanto alla Estación del Norte): la Plaza del Ayuntamiento è a 5 minuti a piedi. In tutto conta circa un'ora dall'atterraggio.",
 tk:"Biglietto per l'aeroporto (zone A+B+): 4,80 € a tratta, più la tessera di supporto da 1,10 € (cartone) o circa 2,20 € (plastica), che si compra una volta sola e si ricarica. Si acquista alle macchinette delle stazioni, che accettano carte di credito e debito. In alternativa il bus 150 Metrobus parte davanti al terminal T1 e ci mette circa 45 minuti (circa 1,50 € secondo le guide, da confermare). Prezzi da visitvalencia.com e da guide: da confermare su metrovalencia.es.",
 gm:"Aeropuerto de València, Manises",
 tips:["Il taxi dal terminal costa circa 35 € per il centro secondo Visit València (tassametro, tariffa da controllare); il metro è più economico e non ha traffico.","Il bus 150 ferma anche ad Àngel Guimerà e al Mercat Central, utile se l'alloggio è vicino al mercato; di notte c'è la linea 150N con corse più rade.","Le prime e le ultime corse del metro possono cambiare nel fine settimana: controlla l'orario su metrovalencia.es il giorno prima, soprattutto per un volo all'alba."]}
};
/* linee (tracciati indicativi) */
var SEG={
l3:{c:"#d71920",n:"Metro L3 / L5 dall'aeroporto",p:[[39.4893,-0.4730,"Aeroporto",2],[39.4745,-0.4160,"Mislata"],[39.4715,-0.4000,"Avinguda del Cid"],[39.4680,-0.3775,"Xàtiva",2],[39.4728,-0.3830,"Àngel Guimerà"],[39.4700,-0.3695,"Colón",2]]}
};
var START=[39.4699,-0.3764];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti */
var STOPS={
mercado:{t:"Mercato Centrale (Mercat Central)",z:"A",p:1,min:45,id:60,max:90,pos:[39.4737,-0.3791],q:"Mercat Central, Valencia",cls:"walk",
 d:"Uno dei più grandi mercati coperti d'Europa, in un edificio modernista di ferro, vetro e ceramica: banchi di frutta e verdura, pesce, jamón, formaggi, riso per la paella e le arance di Valencia. Fuori c'è la Plaza del Mercado.",
 m:"Aperto lunedì–sabato dalle 7:30 alle 15:00; chiuso la domenica e i festivi (visitvalencia.com). L'ingresso è libero. Il momento migliore è la mattina, prima delle 13: dopo le 14 molti banchi iniziano a chiudere."},
lonja:{t:"Lonja de la Seda",z:"A",p:1,min:45,id:60,max:80,pos:[39.4742,-0.3787],q:"Lonja de la Seda, Valencia",cls:"",tk:[2,"Lonja de la Seda (2 €)"],
 win:function(wd){return wd===6?[10*60,14*60]:[10*60,19*60]},
 d:"La borsa della seta del Quattrocento, patrimonio UNESCO: la grande sala dei contratti con le colonne a spirale che salgono come palme, il cortile con gli aranci e la torre. Dall'esterno è uno dei più bei edifici gotici civili d'Europa.",
 m:"Aperta lunedì–sabato 10–19, domenica e festivi 10–14. Ingresso 2 € (1 € ridotto), gratuito la domenica e i festivi (visitvalencia.com e guide). Chiusa il 1° e il 6 gennaio, il 1° maggio e il 25 dicembre. Se la salita alla torre è aperta, il biglietto è lo stesso: chiedi alla cassa."},
seu:{t:"Cattedrale, Miguelete e Plaza de la Virgen",z:"A",p:2,min:60,id:80,max:110,pos:[39.4755,-0.3753],q:"Catedral de Valencia",cls:"",tk:[12,"Cattedrale con Santo Graal (12 €, con audioguida)"],
 win:function(wd){return wd===6?[14*60,17*60+30]:wd===5?[10*60+30,17*60+30]:[10*60+30,18*60+30]},
 d:"La cattedrale gotica, barocca e neoclassica, con la cappella dove si conserva il Santo Cáliz, il calice che per la tradizione è il Santo Graal. Accanto c'è il Miguelete (o Micalet), la torre campanaria ottagonale da cui si vede tutta la città. La Plaza de la Virgen davanti ha la fontana del Turia e la basilica dei Desamparados.",
 m:"Visita della cattedrale: lunedì–venerdì 10:30–18:30 (ultimo ingresso 17:30), sabato 10:30–17:30 (ultimo ingresso 16:30), domenica e festivi 14:00–17:30 (ultimo ingresso 16:30). Biglietto 12 €, 6 € ridotto, con audioguida (visitvalencia.com). Chiusa alle visite il 1° e il 6 gennaio, il 19 marzo, la Domenica delle Palme, il Venerdì Santo, il 9 ottobre, l'8 e il 25 dicembre. Il Miguelete ha un biglietto a parte, circa 2 € secondo le guide (da confermare), e aperto ogni giorno 10:00–18:45; i gradini sono circa 200, stretti, e non c'è ascensore."},
carmen:{t:"Barrio del Carmen e Torres de Serranos",z:"A",p:2,min:60,id:80,max:110,pos:[39.4793,-0.3763],q:"Torres de Serranos, Valencia",cls:"walk",
 d:"Il quartiere più antico, con vicoli stretti, murales, chiese e piazzette, chiuso a nord dalle Torres de Serranos, la porta medievale delle mura. Dalla cima si vede il fiume asciutto trasformato in giardino. A ovest l'altra porta, le Torres de Quart, ha i segni delle palle di cannone.",
 m:"Le vie si girano gratis. Torres de Serranos e Torres de Quart: lunedì–sabato 10–19, domenica e festivi 10–14, ultimo ingresso 30 minuti prima della chiusura (valencia.es). Ingresso circa 2 € a torre, gratuito la domenica (prezzo da una guida, da confermare). Chiuse il 1° e il 6 gennaio, il 1° maggio e il 25 dicembre. Salire a Serranos richiede scale strette e ripide."},
cac:{t:"Città delle Arti e delle Scienze (da fuori)",z:"C",p:1,min:60,id:75,max:120,pos:[39.4547,-0.3505],q:"Hemisfèric, Ciutat de les Arts i les Ciències, Valencia",cls:"walk",
 d:"Il complesso futuristico di Santiago Calatrava, bianco e acqua: l'Hemisfèric a forma di occhio, il Palau de les Arts, l'Umbracle e il Museo delle Scienze. È uno dei luoghi più fotografati della città, specie al mattino o al tramonto con i riflessi nelle vasche.",
 m:"Passeggiare nell'area e vedere gli edifici da fuori è gratis. Gli interni si pagano a parte: il biglietto combinato Oceanogràfic + Museo delle Scienze + Hemisfèric costa 47,75 € (14 € in meno per bambini e over 65; sito Visit València). Per l'Hemisfèric bisogna arrivare puntuali: a proiezione iniziata non si entra. Da Alameda ci sono circa 20 minuti a piedi."},
turia:{t:"Giardini del Turia (Jardín del Turia)",z:"A",p:3,min:45,id:70,max:130,pos:[39.4785,-0.3640],q:"Palau de la Música, Valencia",cls:"walk",
 d:"Il letto del vecchio fiume Turia, deviato dopo l'alluvione del 1957, è oggi un lungo parco a nove chilometri dentro la città, con alberi, campi da gioco, ponti storici e il Palau de la Música. Si cammina o si va in bicicletta fino alla Città delle Arti e delle Scienze.",
 m:"Ingresso libero sempre. Dopo piogge forti il parco può essere chiuso o allagato: se c'è allerta meteo sali sul livello della strada. In estate cerca l'ombra: i tratti centrali ne hanno poca."},
bellas:{t:"Museo di Belle Arti (Museo de Bellas Artes)",z:"A",p:5,min:60,id:90,max:130,pos:[39.4796,-0.3697],q:"Museo de Bellas Artes de València",cls:"",multi:1,cl:[0],
 win:function(){return[10*60,20*60]},
 d:"Uno dei più importanti musei di pittura della Spagna, nell'ex collegio di San Pío V: tavole gotiche valenciane, Velázquez, Goya e le grandi tele di Sorolla, il pittore della luce di Valencia. È accanto al giardino dei Viveros.",
 m:"Aperto martedì–domenica 10–20, chiuso il lunedì; il 24 e il 31 dicembre 10–14; chiuso il 1° gennaio e il 25 dicembre. Ingresso gratuito (valencia.es)."},
colon:{t:"Mercado de Colón, Estación del Norte e Plaza de Toros",z:"B",p:4,min:50,id:70,max:100,pos:[39.4711,-0.3702],q:"Mercado de Colón, Valencia",cls:"walk",
 d:"Il Mercado de Colón è un edificio modernista di mattoni e ceramica oggi pieno di caffè e bar; poco più in là la Estación del Norte, con le decorazioni ad arance, e la Plaza de Toros. L'Eixample di Valencia ha palazzi eleganti di inizio Novecento.",
 m:"Banchi e negozi 7:30–15:00; caffè e ristoranti restano aperti più a lungo (guide). La stazione e la piazza si vedono gratis."},
ruzafa:{t:"Ruzafa: murales, bar e mercato",z:"B",p:5,min:60,id:90,max:120,pos:[39.4620,-0.3746],q:"Mercat de Russafa, Valencia",cls:"walk",multi:1,
 d:"Il quartiere più vivo e meno turistico, con strade piene di murales, caffè di quartiere, botteghe e piccoli ristoranti. Il mercato di Ruzafa, in Plaza Baró de Cortes, è il cuore della zona.",
 m:"Il mercato è aperto lunedì–sabato 7:30–14:30. Molti locali aprono più tardi e chiudono nel pomeriggio: la sera è il momento più animato."},
ocean:{t:"Oceanogràfic",z:"C",p:3,min:180,id:210,max:270,pos:[39.4531,-0.3482],q:"Oceanogràfic Valencia",cls:"",multi:1,tk:[39.45,"Oceanogràfic (da 39,45 €)"],
 win:function(wd){return wd===5?[10*60,20*60]:[10*60,18*60]},
 d:"L'acquario più grande d'Europa, diviso per ambienti del mondo: Mediterraneo, Mar Rosso, Artico, Antartide, oceani tropicali. Ci sono squali, beluga, trichechi e un tunnel sott'acqua. Una visita completa richiede mezza giornata.",
 m:"Biglietto adulti (13–64 anni) da 39,45 € secondo il sito di biglietteria (prezzo variabile secondo la stagione, da confermare); il combinato con Museo delle Scienze e Hemisfèric costa 47,75 €. Aperto tutti i giorni: di norma 10–18 (lunedì–venerdì e domenica) e 10–20 il sabato e in alta stagione; il 24 e il 31 dicembre 10–16 (orari indicativi, da confermare). Si entra fino a un'ora prima della chiusura."},
malvarrosa:{t:"Spiaggia della Malvarrosa e Paseo Marítimo",z:"D",p:4,min:90,id:120,max:180,pos:[39.4745,-0.3235],q:"Playa de la Malvarrosa, Valencia",cls:"walk",multi:1,
 d:"La spiaggia urbana di Valencia: sabbia larga, lungomare con terrazze e ristoranti di paella. Il quartiere vicino, il Cabanyal, ha case di pescatori con le facciate di piastrelle e bar frequentati dai valenciani.",
 m:"La spiaggia è libera e gratuita. Il servizio di salvataggio è attivo di norma dal 7 giugno al 7 settembre: fuori stagione nuotare non è sorvegliato. Sul lungomare molti locali sono pensati per i turisti; per mangiare spendendo meno vai verso il Cabanyal. Dal centro è raggiungibile in tram (linee 4 e 6, circa 15–20 minuti)."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","mercado",8,"walk","A piedi per le vie del centro storico fino al Mercato Centrale, circa 8 minuti.","A piedi per le vie del centro storico fino alla Plaza del Ayuntamiento, circa 8 minuti.",{f:[W([[39.4699,-0.3764],[39.4720,-0.3778],[39.4737,-0.3791]])],r:[W([[39.4737,-0.3791],[39.4720,-0.3778],[39.4699,-0.3764]])]});
P2("start","lonja",9,"walk","A piedi per le vie del centro storico fino alla Lonja de la Seda, circa 9 minuti.","A piedi per le vie del centro storico fino alla Plaza del Ayuntamiento, circa 9 minuti.",{f:[W([[39.4699,-0.3764],[39.4720,-0.3778],[39.4742,-0.3787]])],r:[W([[39.4742,-0.3787],[39.4720,-0.3778],[39.4699,-0.3764]])]});
P2("start","seu",12,"walk","A piedi per le vie del centro fino alla Plaza de la Reina e alla cattedrale, circa 12 minuti.","A piedi per la Plaza de la Reina fino alla Plaza del Ayuntamiento, circa 12 minuti.",{f:[W([[39.4699,-0.3764],[39.4730,-0.3760],[39.4755,-0.3753]])],r:[W([[39.4755,-0.3753],[39.4730,-0.3760],[39.4699,-0.3764]])]});
P2("mercado","lonja",2,"walk","A pochi passi: la Lonja de la Seda è di fronte al mercato, circa 2 minuti.","A pochi passi: il Mercato Centrale è di fronte alla Lonja, circa 2 minuti.",{f:[W([[39.4737,-0.3791],[39.4742,-0.3787]])],r:[W([[39.4742,-0.3787],[39.4737,-0.3791]])]});
P2("lonja","seu",7,"walk","A piedi per le vie intorno alla Plaza de la Virgen fino alla cattedrale, circa 7 minuti.","A piedi dalla cattedrale alla Lonja, circa 7 minuti.",{f:[W([[39.4742,-0.3787],[39.4749,-0.3770],[39.4755,-0.3753]])],r:[W([[39.4755,-0.3753],[39.4749,-0.3770],[39.4742,-0.3787]])]});
P2("mercado","seu",8,"walk","A piedi per le vie del centro storico fino alla cattedrale, circa 8 minuti.","A piedi per le vie del centro storico fino al Mercato Centrale, circa 8 minuti.",{f:[W([[39.4737,-0.3791],[39.4746,-0.3772],[39.4755,-0.3753]])],r:[W([[39.4755,-0.3753],[39.4746,-0.3772],[39.4737,-0.3791]])]});
P2("seu","carmen",12,"walk","A piedi per i vicoli del Carmen fino alle Torres de Serranos, circa 12 minuti.","A piedi per i vicoli del Carmen fino alla cattedrale, circa 12 minuti.",{f:[W([[39.4755,-0.3753],[39.4775,-0.3765],[39.4793,-0.3763]])],r:[W([[39.4793,-0.3763],[39.4775,-0.3765],[39.4755,-0.3753]])]});
P2("mercado","carmen",14,"walk","A piedi per il Carmen fino alle Torres de Serranos, circa 14 minuti.","A piedi per il Carmen fino al Mercato Centrale, circa 14 minuti.",{f:[W([[39.4737,-0.3791],[39.4765,-0.3778],[39.4793,-0.3763]])],r:[W([[39.4793,-0.3763],[39.4765,-0.3778],[39.4737,-0.3791]])]});
P2("start","carmen",20,"walk","A piedi per Calle Colón?? ","",{f:[],r:[]});
delete LEGS["start>carmen"];delete LEGS["carmen>start"];
P2("start","carmen",18,"walk","A piedi per il centro storico fino alle Torres de Serranos, circa 18 minuti.","A piedi per il centro storico fino alla Plaza del Ayuntamiento, circa 18 minuti.",{f:[W([[39.4699,-0.3764],[39.4740,-0.3765],[39.4793,-0.3763]])],r:[W([[39.4793,-0.3763],[39.4740,-0.3765],[39.4699,-0.3764]])]});
P2("carmen","turia",15,"walk","A piedi attraverso il ponte e il giardino del Turia fino al Palau de la Música, circa 15 minuti.","A piedi lungo il giardino del Turia fino alle Torres de Serranos, circa 15 minuti.",{f:[W([[39.4793,-0.3763],[39.4790,-0.3700],[39.4785,-0.3640]])],r:[W([[39.4785,-0.3640],[39.4790,-0.3700],[39.4793,-0.3763]])]});
P2("carmen","bellas",9,"walk","A piedi oltre il ponte de Serranos fino al Museo di Belle Arti, circa 9 minuti.","A piedi oltre il ponte de Serranos fino alle Torres de Serranos, circa 9 minuti.",{f:[W([[39.4793,-0.3763],[39.4795,-0.3730],[39.4796,-0.3697]])],r:[W([[39.4796,-0.3697],[39.4795,-0.3730],[39.4793,-0.3763]])]});
P2("turia","bellas",12,"walk","A piedi lungo il giardino fino al Museo di Belle Arti, circa 12 minuti.","A piedi lungo il giardino fino al Palau de la Música, circa 12 minuti.",{f:[W([[39.4785,-0.3640],[39.4790,-0.3670],[39.4796,-0.3697]])],r:[W([[39.4796,-0.3697],[39.4790,-0.3670],[39.4785,-0.3640]])]});
P2("start","colon",9,"walk","A piedi lungo Calle Colón fino al Mercado de Colón, circa 9 minuti.","A piedi lungo Calle Colón fino alla Plaza del Ayuntamiento, circa 9 minuti.",{f:[W([[39.4699,-0.3764],[39.4705,-0.3733],[39.4711,-0.3702]])],r:[W([[39.4711,-0.3702],[39.4705,-0.3733],[39.4699,-0.3764]])]});
P2("colon","ruzafa",14,"walk","A piedi verso sud fino al mercato di Ruzafa, circa 14 minuti.","A piedi verso nord fino al Mercado de Colón, circa 14 minuti.",{f:[W([[39.4711,-0.3702],[39.4665,-0.3725],[39.4620,-0.3746]])],r:[W([[39.4620,-0.3746],[39.4665,-0.3725],[39.4711,-0.3702]])]});
P2("start","ruzafa",13,"walk","A piedi lungo Calle Xàtiva e Calle Russafa fino a Ruzafa, circa 13 minuti.","A piedi fino alla Plaza del Ayuntamiento, circa 13 minuti.",{f:[W([[39.4699,-0.3764],[39.4660,-0.3755],[39.4620,-0.3746]])],r:[W([[39.4620,-0.3746],[39.4660,-0.3755],[39.4699,-0.3764]])]});
P2("cac","ocean",6,"walk","A piedi tra le vasche fino all'Oceanogràfic, circa 6 minuti.","A piedi tra le vasche fino al centro della Città delle Arti, circa 6 minuti.",{f:[W([[39.4547,-0.3505],[39.4540,-0.3495],[39.4531,-0.3482]])],r:[W([[39.4531,-0.3482],[39.4540,-0.3495],[39.4547,-0.3505]])]});
P2("start","cac",25,"metro","Bus EMT 35 dalla Plaza del Ayuntamiento alla Città delle Arti e delle Scienze, circa 20–25 minuti (linea indicata dalla rete EMT; controlla la fermata sul sito).","Bus EMT 35 dalla Città delle Arti alla Plaza del Ayuntamiento, circa 20–25 minuti.",{f:[{w:[[39.4699,-0.3764],[39.4620,-0.3650],[39.4547,-0.3505]],dash:1}],r:[{w:[[39.4547,-0.3505],[39.4620,-0.3650],[39.4699,-0.3764]],dash:1}]});
P2("start","malvarrosa",40,"metro","Dalla Plaza del Ayuntamiento al Pont de Fusta (vicino alle Torres de Serranos), poi tram 4 o 6 fino a Eugenia Viñes o Malva-rosa, in tutto circa 40 minuti.","Tram 4 o 6 da Malva-rosa a Pont de Fusta e poi verso la Plaza del Ayuntamiento, circa 40 minuti.",{f:[{w:[[39.4699,-0.3764],[39.4814,-0.3736],[39.4745,-0.3235]],dash:1}],r:[{w:[[39.4745,-0.3235],[39.4814,-0.3736],[39.4699,-0.3764]],dash:1}]});
/* ritorno in aeroporto: metro L3 o L5 da Xàtiva */
var RET={
VLC:{
 A:{min:45,txt:"A piedi dalla Plaza del Ayuntamiento alla stazione Xàtiva (5 minuti), poi metro L3 o L5 fino a Aeroport, circa 20–25 minuti, con corse ogni 15–20 minuti. Biglietto aeroporto 4,80 € più la tessera da 1,10 € se non l'hai già. Controlla l'ultima corsa su metrovalencia.es.",g:[W([[39.4699,-0.3764],[39.4680,-0.3775]]),["l3","Xàtiva","Aeroporto"]]}}
};
var ARR={
VLC:[["l3","Aeroporto","Xàtiva"],W([[39.4680,-0.3775],[39.4699,-0.3764]])]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare */
var V={
santacat:{n:"Horchatería Santa Catalina",a:"Plaza Santa Catalina 6",z:"A",r:"4,3",pos:[39.4750,-0.3777],h:D7("08:15-21:30"),
 d:"Una horchatería storica sulla piazzetta di Santa Catalina, vicino alla Lonja: si prende la horchata, bevanda fredda di chufa (cipollino dolce), con i fartons, bastoncini dolci da inzuppare. D'inverno c'è anche il cioccolato con i churros.",pr:"Fascia economica, circa 7 € a testa per horchata e fartons (listino non visto). Orari da una scheda di Time Out, da confermare."},
centralbar:{n:"Central Bar",a:"Mercat Central, Plaza del Mercado",z:"A",r:"4,5",pos:[39.4738,-0.3790],h:["07:30-14:30","07:30-14:30","07:30-14:30","07:30-14:30","07:30-14:30","07:30-14:30",""],
 d:"Il bancone di tapas dentro il Mercato Centrale, dello chef Ricard Camarena: panini caldi (bocadillos) e piatti semplici con i prodotti dei banchi. Il bocadillo di calamari è il più noto; si mangia in piedi al banco, con una caña o un vermut.",pr:"Fascia economica (listino non visto). Chiuso la domenica. Orari da una scheda online, da confermare."},
rincon:{n:"Rincón del Mercado",a:"Plaza del Mercado 45",z:"A",r:"4,2",pos:[39.4739,-0.3786],h:["07:30-23:00","07:30-23:00","07:30-23:00","07:30-00:00","07:30-00:00","08:00-00:00","08:00-00:00"],
 d:"Un ristorante mediterraneo proprio di fronte al mercato, che usa il pesce e le verdure dei banchi vicini. Aperto dalla colazione alla sera: va bene per un pranzo con riso o per una pausa tra una tappa e l'altra.",pr:"Fascia media (listino non visto). Orari da Visit València, da confermare."},
pilareta:{n:"Bar La Pilareta",a:"Carrer del Moro Zeid 13",z:"A",r:"4,2",pos:[39.4770,-0.3790],h:["","12:30-23:30","12:30-23:30","12:30-23:30","12:00-00:00","12:00-00:00","12:00-23:30"],
 d:"Un bar di tapas valenciane nel Carmen, conosciuto per le clóchinas, le cozze piccole di Valencia (di stagione, soprattutto da maggio ad agosto), da mangiare con una caña ai tavolini.",pr:"Fascia economica (listino non visto). Chiuso il lunedì. Orari da una scheda online; non ho trovato la pausa pomeridiana: controlla il giorno prima."},
casamontana:{n:"Bodega Casa Montaña",a:"Carrer de Josep Benlliure 69, Cabanyal",z:"D",r:"4,5",pos:[39.4650,-0.3300],h:["13:00-16:00,19:30-23:30","13:00-16:00,19:30-23:30","13:00-16:00,19:30-23:30","13:00-16:00,19:30-23:30","13:00-16:00,19:30-23:30","12:30-16:00,19:30-23:30","12:30-16:00"],
 d:"Una bodega del Cabanyal aperta da generazioni: conserve di pesce, gamberi all'aglio, sardine alla griglia e tapas valenciane con una lunga carta di vini. È il posto per una cena vera nel quartiere dei pescatori.",pr:"Fascia media-alta: circa 20–35 € a testa secondo una guida, fino a 40 € secondo Visit València (listino non visto). Domenica sera chiuso. Si prenota solo per telefono."},
carmela:{n:"Casa Carmela",a:"Carrer d'Isabel de Villena 155",z:"D",r:"4,4",pos:[39.4693,-0.3236],h:["","13:00-16:00","13:00-16:00","13:00-16:00","13:00-16:00","13:00-16:00","13:00-16:00"],
 d:"La paella cotta a legna, fatta su ordinazione, come da tradizione valenciana: con pollo, coniglio e verdure, o con il pesce. È un pranzo lungo, vicino alla spiaggia: prenota prima, anche con una settimana di anticipo nei fine settimana.",pr:"Fascia alta rispetto agli altri locali: circa 25–50 € a testa per la paella (guide diverse danno prezzi diversi; listino non visto). Chiuso il lunedì, solo pranzo. Telefono per prenotare: 96 371 00 73."},
bunyols:{n:"Bunyols El Contraste",a:"Carrer de Sant Valero 12, Ruzafa",z:"B",r:"4,4",pos:[39.4618,-0.3752],h:["08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","08:00-20:00","17:00-20:00","17:00-20:00"],
 d:"Una piccola friggitoria di Ruzafa dove si assaggiano i bunyols de carabassa, frittelle di zucca tipiche dell'autunno e dell'inverno, con una tazza di cioccolata calda. Si paga solo in contanti.",pr:"Fascia economica (listino non visto). Solo contanti. Orari da una scheda online: sabato e domenica aperto solo il pomeriggio."},
cafemadrid:{n:"Café Madrid (Agua de Valencia)",a:"Carrer de l'Abadia de Sant Martí 10",z:"A",r:"4,2",pos:[39.4716,-0.3784],h:["","17:00-02:00","17:00-02:00","17:00-02:00","17:00-02:00","17:00-02:00","17:00-02:00"],
 d:"Il bar dove nel 1959 è stato inventato l'agua de Valencia, un cocktail di cava, succo d'arancia, gin e vodka. Si ordina una caraffa da dividere in due, con qualcosa da sgranocchiare: è l'aperitivo più valenciano che c'è.",pr:"Fascia economica (listino non visto). Chiuso il lunedì, aperto solo dalle 17. Orari da una scheda online, da confermare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["santacat","centralbar","rincon"],B:["bunyols","santacat","rincon"],C:["rincon","santacat"],D:["santacat","rincon"]},
pra:{A:["centralbar","rincon","pilareta","casamontana"],B:["pilareta","rincon","casamontana"],C:["rincon","pilareta"],D:["carmela","casamontana"]},
cen:{A:["pilareta","rincon","casamontana"],B:["pilareta","rincon","casamontana"],C:["rincon","pilareta"],D:["casamontana","rincon"]},
snk:{A:["santacat","cafemadrid","bunyols"],B:["bunyols","santacat","cafemadrid"],C:["santacat","cafemadrid"],D:["santacat","cafemadrid"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Mercato Centrale, Lonja e Cattedrale",acts:["mercado","lonja","seu"],need:180,core:1,cl:[6]},
{id:"cac",t:"Città delle Arti e delle Scienze e Oceanogràfic",acts:["cac","ocean"],need:270,core:1},
{id:"carmen",t:"Carmen, Torres de Serranos e giardini del Turia",acts:["carmen","turia","bellas"],need:210,core:1,cl:[0]},
{id:"colon",t:"Mercado de Colón e Ruzafa",acts:["colon","ruzafa"],need:140},
{id:"mare",t:"Spiaggia della Malvarrosa e Cabanyal",acts:["malvarrosa"],need:120}
];
var ORDER=["mercado","lonja","seu","carmen","turia","bellas","colon","ruzafa","cac","ocean","malvarrosa"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["cv","Ciutat Vella (Cattedrale, Lonja, Mercato Centrale)",[39.4750,-0.3770],"A"],
["car","El Carmen (centro storico nord)",[39.4778,-0.3796],"A"],
["ay","Plaza del Ayuntamiento / Estación del Norte",[39.4690,-0.3770],"A"],
["col","Eixample / Mercado de Colón",[39.4700,-0.3700],"B"],
["ruz","Ruzafa",[39.4610,-0.3745],"B"],
["cac","Città delle Arti e delle Scienze",[39.4560,-0.3530],"C"],
["cab","Cabanyal / Malvarrosa (al mare)",[39.4680,-0.3290],"D"],
["altro","Altra zona (scrivi l'indirizzo)",[39.4699,-0.3764],""]
];
/* imposta di soggiorno: in Comunitat Valenciana non è in vigore (legge del 2022 abrogata prima dell'entrata in vigore) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Tostada con tomate y aceite","pane tostato con pomodoro grattugiato e olio d'oliva: la colazione più diffusa."],["Café con leche","caffè con latte, come un cappuccino meno schiumoso."],["Horchata con fartons","bevanda fredda di chufa (cipollino dolce) con bastoncini dolci da inzuppare."],["Chocolate con churros","cioccolata densa con i churros, tipica d'inverno."]],
pra:[["Bocadillo de calamares","panino con calamari fritti, la specialità dei banconi del mercato."],["Menú del día","primo, secondo, dolce e bevanda a prezzo fisso, di solito a pranzo nei giorni feriali."],["Esgarraet","insalata di peperoni arrostiti e baccalà, antipasto valenciano."],["Tapas","piccoli assaggi da dividere con una caña (birra piccola)."]],
cen:[["Paella valenciana","il riso con pollo, coniglio, fagioli e verdure: si mangia a pranzo e si cucina su ordinazione, per almeno due persone."],["Arroz a banda","riso cotto nel brodo di pesce e servito con il pesce a parte."],["Fideuà","simile alla paella ma con pasta corta al posto del riso."],["Clóchinas","cozze piccole di Valencia, di stagione da maggio ad agosto."],["Agua de Valencia","cocktail di cava, arancia, gin e vodka: si ordina a caraffe."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il Micalet dalla Plaza de la Virgen","Foto","La torre ottagonale della cattedrale, con la fontana del Turia in primo piano.",[39.4753,-0.3753],"Plaza de la Virgen, Valencia","seu"],
["📷","Il Mercato Centrale","Foto","La facciata modernista con le cupole di ceramica e la grande insegna d'ingresso, dalla Plaza del Mercado.",[39.4737,-0.3790],"Mercat Central, Valencia","mercado"],
["🤳","Le colonne della Lonja","Selfie","Le colonne a spirale che sembrano palme, nella grande sala dei contratti.",[39.4742,-0.3787],"Lonja de la Seda, Valencia","lonja"],
["📷","Torres de Serranos","Foto","Le due torri merlate della porta medievale, meglio dal ponte o dal giardino del Turia.",[39.4795,-0.3760],"Torres de Serranos, Valencia","carmen"],
["📷","Il Jardín del Turia","Foto","Il verde del vecchio letto del fiume, con il Palau de la Música tra gli alberi.",[39.4785,-0.3640],"Palau de la Música, Valencia","turia"],
["📷","Mercado de Colón","Foto","La facciata modernista in mattoni e ceramica colorata, da Calle Jorge Juan.",[39.4711,-0.3702],"Mercado de Colón, Valencia","colon"],
["📷","Estación del Norte","Foto","L'atrio modernista della stazione con le decorazioni ad arance.",[39.4666,-0.3775],"Estación del Norte, Valencia","colon"],
["🤳","I murales di Ruzafa","Selfie","Le pareti dipinte delle vie di Ruzafa, più belle al mattino con la luce laterale.",[39.4615,-0.3745],"Mercat de Russafa, Valencia","ruzafa"],
["📷","L'Hemisfèric e la vasca","Foto","L'edificio a forma di occhio che si specchia nell'acqua: il riflesso è migliore con poco vento.",[39.4547,-0.3505],"Hemisfèric, Valencia","cac"],
["📷","Il Palau de les Arts","Foto","La struttura bianca dalle linee curve, vista dal giardino sul lato nord.",[39.4577,-0.3550],"Palau de les Arts Reina Sofía, Valencia","cac"],
["🤳","La spiaggia alla mattina","Selfie","La Malvarrosa guarda a est: il sole sorge sul mare, quindi la luce migliore è al mattino presto.",[39.4745,-0.3235],"Playa de la Malvarrosa, Valencia","malvarrosa"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-11-30",t:"Controlli ai documenti sui voli Italia–Spagna",x:"Da agosto 2026 Italia e Spagna hanno reintrodotto temporaneamente controlli sui passeggeri dei voli tra i due Paesi, prorogati di 15 giorni in 15 giorni (secondo la stampa la Spagna li aveva prolungati fino all'8 ottobre; non ho trovato la proroga successiva). Porta carta d'identità o passaporto validi (non bastano patente, tessera sanitaria o documenti digitali) e arriva in aeroporto con un margine in più. Controlla viaggiaresicuri.it prima di partire."},
{from:"2026-10-13",to:"2026-11-30",t:"Autunno: possibili piogge intense",x:"Tra ottobre e novembre il Mediterraneo può portare temporali forti e improvvisi. Se l'AEMET (aemet.es) emette un'allerta arancione o rossa, evita il giardino del Turia, i sottopassi e gli spostamenti non necessari, e segui le indicazioni delle autorità locali."},
{from:"2026-12-05",to:"2027-01-07",t:"Festività: chiusure di monumenti",x:"L'8 dicembre la cattedrale è chiusa alle visite; il 25 dicembre e il 1° gennaio sono chiuse anche la Lonja, le Torres de Serranos e de Quart; il 6 gennaio chiudono Lonja, torri e cattedrale. Il 24 e il 31 dicembre il Museo di Belle Arti apre solo 10–14 e l'Oceanogràfic chiude alle 16. Domenica e festivi il Mercato Centrale è chiuso."}
];
/* clima medio di Valencia (indicativo, massime/minime) */
var CLIM=[[17,6],[18,7],[20,9],[22,11],[25,14],[28,18],[31,21],[31,21],[28,18],[24,15],[20,10],[17,7]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Valencia: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="mercado"&&WD===6)meta+=" Oggi è domenica: il Mercato Centrale è chiuso. Restano aperti i bar e i ristoranti intorno alla Plaza del Mercado.";
if(it.id==="lonja"&&WD===6)meta+=" Oggi è domenica: la Lonja apre solo 10–14 e l'ingresso è gratuito.";
if(it.id==="seu"&&WD===6)meta+=" Oggi è domenica: la cattedrale si visita solo nel pomeriggio, dalle 14 alle 17:30.";
if(it.id==="bellas"&&WD===0)meta+=" Oggi è lunedì: il Museo di Belle Arti è chiuso.";
return meta}
Object.assign(C,{id:"valencia",n:"Valencia",cn:"Spagna",e:"🥘",flag:"🇪🇸",col:["#d9511c","#f1bf00","#1b5e8c"],k:"valencia spagna",
TZ:"Europe/Madrid",LL:[39.4699,-0.3764],CC:"es",QN:"Valencia",BK:"Valencia",ARE:/valencia|val[eè]ncia|\b46\d{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"es-ES",LANGN:"spagnolo",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:60,DINO:60,
hub:{n:"Plaza del Ayuntamiento",q:"Plaza del Ayuntamiento, Valencia"},
SINGLE:{acts:["mercado","lonja","seu","carmen","cac"],ins:[]},
EXCL:[],
DICON:{mercado:"🥬",lonja:"🏛️",seu:"⛪",carmen:"🏰",turia:"🌳",bellas:"🖼️",colon:"🛍️",ruzafa:"🎨",cac:"🏗️",ocean:"🐠",malvarrosa:"🏖️"},
ZN:{A:"nel centro storico",B:"a Colón e Ruzafa",C:"alla Città delle Arti e delle Scienze",D:"al Cabanyal e alla Malvarrosa"},
NEAR:{col:"bar o horchatería",pra:"bar o locale veloce",cen:"locale di tapas",snk:"horchatería o bar"},
SE:{santacat:"🥛",centralbar:"🥪",rincon:"🍽️",pilareta:"🦪",casamontana:"🍷",carmela:"🥘",bunyols:"🍩",cafemadrid:"🍹"},
TR:{one:1.5,lbl:"Metro, tram e bus (Metrovalencia ed EMT)",
 air:{VLC:{one:4.8,n:"Biglietto metro per l'aeroporto (4,80 €)"}},
 passes:[],
 note:"Prezzi da Visit València e da guide (2026), da confermare su metrovalencia.es ed emtvalencia.es: corsa singola di metro o tram nella zona A 1,50 €, biglietto aeroporto 4,80 €, più la tessera di supporto da 1,10 € (cartone) o circa 2,20 € (plastica) la prima volta. L'autobus EMT costa di norma 1,50 € a corsa. La Valencia Tourist Card (24, 48 o 72 ore) comprende metro, tram, bus e aeroporto, ma il prezzo varia nelle guide (da circa 15 € per 24 ore): conviene solo se fai molte corse. Le macchinette delle stazioni accettano le carte."},
FOOD:{co:[4,"Colazione al bar (caffè e tostada)"],pr:[14,"Pranzo (menú del día o bocadillo)"],ce:[18,"Cena di tapas"],sp:[5,"Spuntini e horchata"]},
T:{ride:"In metro, tram o bus",move:"tutto a piedi, in metro o in tram",bags:"«¿Puedo dejar las maletas?»",bagsPM:"«¿Puedo dejar las maletas hasta la tarde?»",bagsAM:"«¿Puedo dejar las maletas hasta mediodía?»",
pra:"Un bar o un locale veloce",praZ:{A:"Intorno alla cattedrale e alla Plaza de la Reina molti ristoranti con le foto della paella sul menù sono per turisti: per un pasto vero scegli i bar del Carmen o quelli intorno al mercato.",D:"La paella si ordina a pranzo e si cuoce su ordinazione (circa 45–60 minuti): arriva con calma e prenota nei fine settimana."},
freeLong:"Qualche idea: una horchata con fartons in una horchatería, una passeggiata nel giardino del Turia, il Mercado de Colón, la spiaggia della Malvarrosa o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una pausa con una horchata.",
remind:"Domenica il Mercato Centrale è chiuso e la cattedrale apre solo nel pomeriggio; il lunedì il Museo di Belle Arti è chiuso.",
rain1:"Al coperto: il Mercato Centrale, la Lonja de la Seda, la cattedrale e il Museo di Belle Arti.",
rainM:"Al coperto: Mercato Centrale, Lonja, cattedrale, Museo di Belle Arti e Oceanogràfic (in parte).",
water:"L'acqua del rubinetto di Valencia è potabile, ma ha un sapore calcareo: molti preferiscono quella in bottiglia. Attivate «Acqua» sulla mappa per le fontanelle pubbliche vicine al percorso.",
kitchen:"A Valencia si pranza tardi (dalle 14) e si cena dalle 21: molte cucine tra le 16 e le 20 sono chiuse; i bar e le horchaterías restano aperti tutto il giorno.",
night:[["🍹","Un'agua de Valencia al Café Madrid o una caña con tapas nel Carmen sono il modo più valenciano di chiudere la giornata."],["🕙","Si cena tardi: molte cucine servono fino alle 23:30; il fine settimana alcuni locali restano aperti fino a mezzanotte."],["☕","Molti bar aprono alle 7:30–8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire alle fontanelle)",
fuso:"Italia e Spagna hanno lo stesso fuso",
foodNote:"I pasti sono stime per bar e locali di quartiere: una colazione sta intorno ai 4–6 €, un menú del día intorno ai 12–16 € e una paella a pranzo costa di più (circa 25–35 € a testa). Quasi ovunque si paga con la carta; ai banchi del mercato e nelle friggitorie conviene avere qualche euro in contanti.",
taxNote:"A Valencia e nella Comunitat Valenciana oggi non c'è imposta di soggiorno (la legge del 2022 è stata abrogata prima di entrare in vigore). Se una struttura te la chiede, controlla che sia legittima e chiedi la ricevuta.",
mcrit:"Criteri: locali tipici valenciani con buona reputazione, bar, horchaterías e tapas, niente catene. Colazione e spuntini restano sotto i 10 € a testa, la cena sotto i 20–35 €; la paella costa di più. Orari e prezzi sono quelli di schede e guide online (ottobre 2026), non letti sui siti dei locali: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il metro L3 o L5 fino a Xàtiva impiega circa 20–25 minuti: tieni il biglietto a portata di mano anche per uscire dai tornelli.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara.","Per i controlli sui voli Italia–Spagna (vedi gli avvisi) arriva in aeroporto con un margine in più e tieni a portata di mano il documento."],
CHECK:[["tk","Biglietto del metro per l'aeroporto (4,80 € più la tessera da 1,10 €): si compra alle macchinette della stazione con la carta"],["oce","Biglietto per l'Oceanogràfic (da 39,45 €), meglio online prima di partire",["ocean"]],["cat","Biglietto per la cattedrale (12 €) e, se vuoi salire, per il Miguelete",["seu"]],["pae","Prenotazione per la paella a Casa Carmela (solo pranzo, chiuso il lunedì): telefono 96 371 00 73"],["card","Carta d'identità o passaporto in corso di validità: ci sono controlli sui voli Italia–Spagna"],["cash","Qualche euro in contanti per mercati, friggitorie e bar piccoli"],["cov","Qualcosa per coprire spalle e ginocchia in cattedrale",["seu"]]],
NUM:{1:["una persona","U-na per-SO-na"],2:["dos","DOS"],3:["tres","TRES"],4:["cuatro","KUA-tro"],5:["cinco","SIN-ko"],6:["seis","SEIS"],7:["siete","SIE-te"],8:["ocho","O-cio"],9:["nueve","NUE-be"],10:["diez","DIES"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,N)]||this.NUM[2];var fr=[["Buongiorno / Buonasera","Buenos días / Buenas tardes","BUE-nos DI-as / BUE-nas TAR-des"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Una mesa para "+nu[0]+", por favor","U-na ME-sa PA-ra "+nu[1]+", por fa-BOR"],["Una horchata con fartons, per favore","Una horchata con fartons, por favor","U-na or-CIA-ta kon far-TONS, por fa-BOR"],["Una paella per due","Una paella para dos","U-na pa-E-ia PA-ra DOS"],["Acqua del rubinetto, per favore","Agua del grifo, por favor","A-gua del GRI-fo, por fa-BOR"],["Il conto, per favore","La cuenta, por favor","la KUEN-ta, por fa-BOR"],["Posso pagare con la carta?","¿Puedo pagar con tarjeta?","PUE-do pa-GAR kon tar-HE-ta"],["Quanto costa?","¿Cuánto cuesta?","KUAN-to KUES-ta"],["Dov'è la metro?","¿Dónde está el metro?","DON-de es-TA el ME-tro"],["Qual è il metro per l'aeroporto?","¿Qué metro va al aeropuerto?","ke ME-tro ba al a-e-ro-PUER-to"]];
if(M)fr=fr.concat([["Ho una prenotazione","Tengo una reserva","TEN-go U-na re-SER-ba"],["Posso lasciare i bagagli?","¿Puedo dejar las maletas?","PUE-do de-HAR las ma-LE-tas"],["A che ora è il check-out?","¿A qué hora es la salida?","a KE O-ra es la sa-LI-da"]]);
return fr.concat([["Mi scusi","Perdone","per-DO-ne"],["Grazie mille!","¡Muchas gracias!","MU-cias GRA-sias"]])},
taxTxt:function(tx){return "A Valencia e nella Comunitat Valenciana oggi non c'è imposta di soggiorno ("+(tx&&tx[1]?tx[1].toLowerCase():"alloggio")+"): la legge del 2022 è stata abrogata prima di entrare in vigore. Se una struttura te la chiede, controlla che sia legittima."},
STAYTIPS:["Il metro e il tram di Metrovalencia usano la stessa tessera e lo stesso tipo di biglietto; di norma il metro funziona dalle 4:00 alle 23:30 nei giorni feriali e dalle 5:00 alle 0:30 nel fine settimana (orari da Visit València, da confermare su metrovalencia.es)."],
ZONES:[
["🚇 Metro, tram e bus",["Metro e tram di Metrovalencia usano una tessera di supporto (1,10 € di cartone, circa 2,20 € di plastica) che si compra alle macchinette e si ricarica.","La corsa singola nella zona A costa 1,50 €; per l'aeroporto serve il biglietto da 4,80 €.","Le macchinette accettano le carte. Il bus EMT parte da molte piazze del centro.","Alle fermate dei bus e del tram controlla sempre la direzione, soprattutto verso il mare."]],
["🏛️ Mercato Centrale e Lonja",["Il Mercato Centrale chiude alle 15 e la domenica: vai la mattina.","Di fronte c'è la Lonja de la Seda: il biglietto costa 2 € ed è gratuito la domenica (fino alle 14).","Nelle vie intorno ci sono bar con tapas e panini a prezzi onesti: i locali sulla piazza con il menù turistico costano di più."],["mercado","lonja"]],
["⛪ Cattedrale e Carmen",["La cattedrale ha orari ridotti: il pomeriggio della domenica e alcuni giorni chiusa (vedi la scheda).","Il Miguelete ha un biglietto a parte e circa 200 scalini senza ascensore.","Il Carmen è il quartiere dei vicoli: la sera ci sono molti bar aperti fino a tardi."],["seu","carmen"]],
["🏗️ Città delle Arti e delle Scienze",["Vedere gli edifici da fuori è gratis; dentro Oceanogràfic, Museo delle Scienze e Hemisfèric hanno biglietti separati (il combinato costa 47,75 €).","Per l'Hemisfèric arriva in orario: a proiezione iniziata non si entra.","Il bus EMT 35 collega la Plaza del Ayuntamiento alla Città delle Arti; in alternativa la passeggiata lungo il giardino del Turia dura circa 35 minuti."],["cac","ocean"]],
["🏖️ Mare e paella",["La paella autentica si mangia a pranzo ed è su ordinazione: il tempo di cottura è di circa 45–60 minuti.","Diffida dei locali con le foto delle paelle sull'ingresso o che vendono «paella per una persona a qualsiasi ora».","Il Cabanyal, dietro la spiaggia, ha bar più veri e più economici del lungomare."],["malvarrosa"]],
["🥛 Horchata e dolci",["La horchata è una bevanda fredda di chufa (cipollino dolce), servita con i fartons da inzuppare.","In autunno e inverno si trovano i bunyols de carabassa, frittelle di zucca, a Ruzafa.","Le horchaterías storiche sono in Plaza Santa Catalina, vicino alla Lonja."]]],
WTIPS:["L'acqua del rubinetto di Valencia è potabile, ma ha un sapore calcareo: puoi chiederla al bar («agua del grifo») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Le fontane monumentali non sono da bere.","In estate porta più acqua del solito: a Valencia fa molto caldo e umido."],
GEN:["La Spagna usa l'euro e fa parte dello spazio Schengen; da agosto 2026 ci sono controlli temporanei sui voli Italia–Spagna: porta carta d'identità o passaporto validi.","Italia e Spagna hanno lo stesso fuso orario.","Gli orari dei pasti sono spostati: pranzo dalle 14, cena dalle 21. Molti ristoranti tra le 16 e le 20 sono chiusi.","La mancia non è obbligatoria: al bar qualche moneta, al ristorante il 5–10% se il servizio è stato buono.","La carta (anche contactless) si accetta quasi ovunque; tieni qualche euro in contanti per mercati e friggitorie.","Nelle zone affollate e sui mezzi per l'aeroporto fai attenzione ai borseggiatori.","La lingua ufficiale è lo spagnolo; a Valencia si parla anche il valenciano: «bon dia» vale «buenos días».","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Emergenze: gratis, anche senza credito.</li><li><a class="call" href="tel:091">📞 091</a> Polizia nazionale · <a class="call" href="tel:061">📞 061</a> Emergenze sanitarie</li><li>🚇 Metro e tram: <a href="https://www.metrovalencia.es/" target="_blank" rel="noopener">metrovalencia.es</a> · bus: <a href="https://www.emtvalencia.es/" target="_blank" rel="noopener">emtvalencia.es</a>.</li><li>🇮🇹 Unità di Crisi della Farnesina (h24): <a class="call" href="tel:+39036225">+39 06 36225</a> · avvisi per chi viaggia: <a href="https://www.viaggiaresicuri.it/" target="_blank" rel="noopener">viaggiaresicuri.it</a>.</li>',
STRK:'Al 13 ottobre 2026 non ho trovato scioperi annunciati per i trasporti di Valencia. Gli scioperi vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://www.metrovalencia.es/" target="_blank" rel="noopener">metrovalencia.es</a> (metro e tram), <a href="https://www.emtvalencia.es/" target="_blank" rel="noopener">emtvalencia.es</a> (bus) e, per i voli, <a href="https://www.aena.es/es/valencia.html" target="_blank" rel="noopener">aena.es</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="24" r="11"/><path d="M0 106 V98 Q60 90 130 96 Q170 100 190 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M12 106 V40 H16 V36 H20 V40 H24 V36 H28 V40 H30 V106 Z M46 106 V40 H48 V36 H52 V40 H56 V36 H60 V40 H64 V106 Z M30 106 V58 H46 V106 Z M30 58 V54 H33 V58 Z M37 58 V54 H39 V58 Z M43 58 V54 H46 V58 Z"/></g>'+
'<g style="--k:2"><path d="M82 106 V50 H102 V106 Z M80 50 H104 V44 H80 Z M83 44 V28 H101 V44 Z M83 28 Q92 16 101 28 Z M91 16 V8 H93 V16 Z M92 8 V2 M110 106 V76 H150 V106 Z M116 76 Q130 56 144 76 Z"/></g>'+
'<g style="--k:3"><path d="M168 106 V98 H246 V106 Z M174 98 Q174 72 207 72 Q240 72 240 98 Z M165 98 Q207 50 249 98 L243 98 Q207 62 171 98 Z"/></g>'+
'<g style="--k:4"><path d="M270 106 V12 H274 V106 Z M254 100 H320 V104 H254 Z"/></g>'+
'<g style="--k:5"><path d="M328 106 Q326 64 352 48 Q372 36 392 56 Q382 60 374 72 Q372 90 374 106 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M33 106 V84 a5 5 0 0 1 10 0 V106"/><path d="M92 28 V44 M88 36 H96"/><path d="M200 86 a7 7 0 0 1 14 0 a7 7 0 0 1 -14 0"/><path d="M272 14 L256 100 M272 14 L264 100 M272 14 L282 100 M272 14 L294 100 M272 14 L306 100 M272 14 L316 100"/><path d="M340 80 Q360 60 384 64"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="30" cy="16" r="1.6"/><circle cx="116" cy="20" r="1.3"/><circle cx="176" cy="22" r="1.3"/><circle cx="238" cy="24" r="1.3"/><circle cx="318" cy="12" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.valencia);

;var n=window.CITIES["valencia"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["valencia"]);
