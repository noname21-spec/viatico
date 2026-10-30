(function(o){
/* ===== Oslo (dati verificati il 13 ottobre 2026) ===== */
window.CITIES=window.CITIES||{};
CITIES.oslo=(function(){
var G=function(q){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
var FROM=CITIES.paris?CITIES.paris.FROM:[];
var W=function(a){return {w:a}};
var D7=function(x){return [x,x,x,x,x,x,x]};
/* aeroporti: cambio usato 1 corona norvegese = 0,0932 € (circa 10,7 corone per 1 €) */
var PAR={
OSL:{n:"Oslo Gardermoen (OSL)",s:"Oslo Lufthavn Gardermoen",url:"https://avinor.no/en/airport/oslo-airport/",live:"Oslo",inMin:35,buf:120,pos:[60.1939,11.1004],sd:"Aeroporto OSL · treno Flytoget o Vy",rt:"Dall'aeroporto: treno Flytoget o treno regionale Vy fino alla stazione centrale di Oslo (Oslo S), nel cuore della città.",
 arr:"Dall'Italia si entra in Norvegia senza controllo passaporti (spazio Schengen), ma la Norvegia non è nell'UE: ci sono controlli doganali e regole proprie su alcolici, tabacco e cibi. Dopo il ritiro bagagli segui i cartelli «Tog / Train»: la stazione è sotto il terminal. Il Flytoget, il treno veloce, arriva a Oslo S in circa 19–20 minuti, con partenze ogni 10 minuti circa di giorno (ogni 20 la mattina presto, la sera, nel fine settimana e nelle vacanze scolastiche). I treni regionali Vy (linea L12) arrivano alla stessa stazione in 25–30 minuti, tre volte all'ora circa. In alternativa il bus Flybussen impiega 40–50 minuti ed è utile se l'alloggio è lontano da Oslo S. In tutto, dallo sbarco all'ingresso in città, contate circa 35–45 minuti.",
 tk:"Biglietti (guide e siti di viaggio 2026, da confermare nelle app): Flytoget circa 243 corone (circa 22,60 €); treno Vy circa 124 corone con l'app (circa 11,60 €), da 99 a 190 corone a seconda di quando e dove lo compri; bus Flybussen circa 219 corone (circa 20,40 €). Si comprano con le app Flytoget, Vy o Entur, alle macchinette dell'aeroporto o allo sportello arrivi: a bordo costano di più. Il biglietto dei mezzi urbani di Oslo (zona 1) non vale fino all'aeroporto, che sta in un'altra zona.",
 gm:"Oslo Lufthavn Gardermoen stasjon",
 tips:["Il Flytoget non è valido con l'Oslo Pass; i treni Vy sì. Se compri il Pass, controlla cosa comprende prima di usarlo per l'aeroporto.","Il taxi per il centro costa di solito 700–900 corone (circa 65–85 €) e dura 30–45 minuti: conviene solo in quattro. Usa solo taxi ordinati con le macchinette o online, perché i prezzi alla corsa possono essere molto più alti.","Entrambi i treni arrivano a Oslo S, dove cambi con tram, bus e metro (T-bane). Con l'app Ruter o Entur controlli tutto in tempo reale."]},
TRF:{n:"Sandefjord Torp (TRF)",s:"Sandefjord Lufthavn Torp",url:"https://www.torp.no/en/",live:"Sandefjord",inMin:125,buf:120,pos:[59.1867,10.2586],sd:"Aeroporto TRF · bus Torp-ekspressen (circa 2 ore)",rt:"Dall'aeroporto: bus Torp-ekspressen fino al terminal dei bus accanto a Oslo S, circa 2 ore.",
 arr:"Torp è lo scalo low cost a sud di Oslo, a più di 100 km dalla città. Secondo gli aggregatori di voli (Momondo, ottobre 2026) ha voli diretti dall'Italia con Ryanair da Bergamo e da Pisa; gli orari cambiano con la stagione, controllali al momento di prenotare. Dall'aeroporto il collegamento più semplice per Oslo è il bus Torp-ekspressen, che arriva al terminal dei bus vicino alla stazione centrale (Oslo S) in circa 1 ora e 45–2 ore. Dato non verificato su fonte ufficiale: controlla orari e prezzo su torpekspressen.no. Per una gita in giornata questo scalo fa perdere molto tempo: se puoi, cerca voli per Gardermoen.",
 tk:"Il prezzo del bus Torp-ekspressen non l'ho potuto verificare su una fonte ufficiale: controlla torpekspressen.no o l'app Entur prima di partire. Il biglietto dei mezzi urbani di Oslo non vale per questo viaggio.",
 gm:"Sandefjord Lufthavn Torp",
 tips:["Per una gita in giornata il tragitto da e per Torp (circa 4 ore tra andata e ritorno) pesa molto: valuta se conviene.","Torp-ekspressen ha orari legati ai voli: controlla di avere un bus utile dopo l'atterraggio e prima della partenza.","Dall'aeroporto non si arriva in città con la rete urbana di Oslo: serve un biglietto a parte."]}
};
/* linee (tracciati indicativi) */
var SEG={
fl:{c:"#c8102e",n:"Treno Flytoget o Vy dall'aeroporto",p:[[60.1939,11.1004,"Aeroporto",2],[59.9110,10.7528,"Oslo S",2]]},
tp:{c:"#6b6b6b",n:"Bus Torp-ekspressen",p:[[59.1867,10.2586,"Aeroporto Torp",2],[59.9124,10.7570,"Oslo S",2]]},
t1:{c:"#00a3e0",n:"Metro (T-bane) linea 1",p:[[59.9110,10.7528,"Oslo S",2],[59.9129,10.7406,"Stortinget",2],[59.9146,10.7338,"Nationaltheatret",2],[59.9297,10.7135,"Majorstuen",2],[59.9634,10.6677,"Holmenkollen",2]]},
tr12:{c:"#1f3a6b",n:"Tram 12",p:[[59.9110,10.7528,"Oslo S",2],[59.9146,10.7338,"Nationaltheatret",2],[59.9215,10.7100,"Frogner plass",2],[59.9265,10.7035,"Vigelandsparken",2]]},
b30:{c:"#2e7d32",n:"Bus 30 per Bygdøy",p:[[59.9110,10.7528,"Oslo S",2],[59.9146,10.7338,"Nationaltheatret",2],[59.9040,10.6990,"Museo Fram",2]]}
};
var START=[59.9110,10.7528];
/* tappe: p = priorità (1 = irrinunciabile), durate in minuti; wd: 0 = lunedì … 6 = domenica */
var STOPS={
opera:{t:"Operahuset: il tetto dell'Opera",z:"C",p:1,min:45,id:60,max:90,pos:[59.9075,10.7529],q:"Operahuset Oslo",cls:"walk",sun:1,
 d:"Il teatro dell'Opera di Oslo è un grande edificio bianco di marmo e vetro che scende fino all'acqua del fiordo: si cammina sul tetto in pendenza, come su una piazza, e dall'alto si vede tutta la città e il porto. Intorno ci sono i nuovi quartieri di Bjørvika.",
 m:"Il tetto è libero, sempre aperto, 24 ore su 24, senza biglietto (guide di viaggio). Dentro si entra gratis nel foyer; spettacoli e visite guidate sono a pagamento (orari su operaen.no, non letti). Il pavimento di marmo può essere scivoloso con pioggia o ghiaccio: da novembre fai attenzione."},
munch:{t:"MUNCH: il museo di Edvard Munch",z:"C",p:2,min:120,id:150,max:200,pos:[59.9063,10.7566],q:"MUNCH, Edvard Munchs plass 1, Oslo",cls:"",sun:1,tk:[26.1,"MUNCH (280 corone)",1,1],
 win:function(wd){return[10*60,(wd>=2&&wd<=5)?21*60:18*60]},
 d:"Il museo dedicato a Edvard Munch, in una torre di vetro e acciaio sul porto: ospita la più grande raccolta al mondo delle sue opere, tra cui versioni dell'«Urlo» e del «Vampiro». Dai piani alti ci sono belle viste sul fiordo e sull'Opera.",
 m:"Aperto lunedì, martedì e domenica 10–18, da mercoledì a sabato 10–21 (sito del museo). Biglietto adulti 280 corone (circa 26 €) di giorno e 200 corone (circa 18,60 €) la sera dopo le 18, secondo una guida del 2026: da confermare su munch.no. Chiuso il 1° maggio; il 24 e il 31 dicembre orario ridotto. «L'Urlo» e altre versioni sono esposte a rotazione tra il MUNCH e il Nasjonalmuseet: guarda sul sito del museo cosa c'è in sala nei giorni della visita."},
akershus:{t:"Fortezza di Akershus e il porto",z:"A",p:2,min:60,id:90,max:130,pos:[59.9075,10.7365],q:"Akershus festning, Oslo",cls:"walk",sun:1,
 d:"La fortezza medievale che sorveglia il porto da più di settecento anni: bastioni, cannoni, il castello e viste larghe sul fiordo. Si cammina senza biglietto lungo le mura e nei cortili.",
 m:"I cancelli principali sono aperti dalle 6 alle 21 tutti i giorni; da ottobre ad aprile anche i cancelli laterali dalle 7 alle 21 (sito ufficiale dell'area). L'ingresso alla fortezza e al museo delle Forze Armate è gratuito; altre mostre, il Museo della Resistenza (circa 80–100 corone, circa 7,50–9,50 €) e le visite guidate sono a pagamento. L'area è militare e può chiudere con poco preavviso: se trovi un cancello chiuso passa dal Centro visitatori (+47 23 09 39 17)."},
radhuset:{t:"Municipio di Oslo (Rådhuset)",z:"B",p:1,min:45,id:60,max:90,pos:[59.9118,10.7337],q:"Oslo rådhus",cls:"",
 win:function(wd){return wd===6?[0,0]:[9*60,15*60+30]},
 d:"L'edificio di mattoni rossi con due torri squadrate sul porto, dove ogni 10 dicembre si consegna il Premio Nobel per la Pace. All'interno le sale sono coperte di grandi dipinti e affreschi sulla storia e sulla vita dei norvegesi.",
 m:"Aperto dal lunedì al sabato dalle 9 alle 16, chiuso la domenica; ingresso gratuito con controllo di sicurezza all'ingresso (sito del Comune di Oslo). Il sito elenca alcuni giorni di chiusura tra ottobre e dicembre 2026 e avverte che possono aggiungersene altri: guarda oslo.kommune.no il giorno prima. Alcune sale possono essere chiuse per eventi. Le visite guidate gratuite ci sono «a volte»: non ho trovato gli orari."},
slottet:{t:"Karl Johans gate e Palazzo Reale",z:"A",p:2,min:45,id:60,max:90,pos:[59.9170,10.7275],q:"Det kongelige slott, Oslo",cls:"walk",sun:1,
 d:"Il viale principale di Oslo, che va dalla stazione fino al Palazzo Reale in cima alla collina, passando davanti al Parlamento e al Teatro Nazionale. Il palazzo è circondato da un parco pubblico dove si cammina liberamente.",
 m:"Il parco intorno al palazzo (Slottsparken) è aperto a tutti tutto l'anno. Il cambio della guardia davanti al palazzo è ogni giorno alle 13:30 (guide di viaggio, da confermare). Le visite agli interni del palazzo non sono sempre in programma e di norma sono previste solo d'estate: controlla royalcourt.no."},
vigeland:{t:"Parco delle sculture di Vigeland",z:"F",p:1,min:75,id:100,max:150,pos:[59.9270,10.7006],q:"Vigelandsparken, Oslo",cls:"walk",sun:1,
 d:"Un grande parco con più di duecento sculture in bronzo e granito dell'artista Gustav Vigeland: persone di tutte le età, abbracci, giochi e il Monolito, una colonna di centoventi figure intrecciate. È un luogo di passeggio per gli abitanti di Oslo.",
 m:"Il parco è aperto 24 ore su 24, gratuito (guide di viaggio). Il vicino Museo Vigeland si paga a parte (prezzo e orari non letti). La luce in autunno e inverno dura poco: a metà ottobre il sole tramonta verso le 17:30, a dicembre intorno alle 15:15, quindi conviene andarci a metà giornata."},
nasjonal:{t:"Nasjonalmuseet: il Museo Nazionale",z:"B",p:3,min:120,id:150,max:210,pos:[59.9126,10.7258],q:"Nasjonalmuseet, Brynjulf Bulls plass 3, Oslo",cls:"",sun:1,tk:[20.5,"Nasjonalmuseet (220 corone)",1,1],
 win:function(wd){return wd===0?[0,0]:[10*60,17*60]},
 d:"Il più grande museo d'arte della Scandinavia, in un edificio nuovo sul porto accanto al Municipio: pittura norvegese e internazionale, design, architettura e una sala con le opere di Munch. Il museo è tra i luoghi dove è conservata una versione dell'«Urlo».",
 m:"Biglietto adulti circa 220 corone (circa 20,50 €; le fonti variano da 160 a 220, minori di 18 anni gratis): da confermare su nasjonalmuseet.no. Orari non uniformi nelle fonti che ho letto: la più completa dà 10–17 da martedì a domenica, con chiusura il lunedì (a giugno–agosto aperto anche il lunedì); un'altra segnala aperture serali. Chiuso il 24, 25 e 26 dicembre, il 31 dicembre e il 1° gennaio. Controlla gli orari sul sito."},
brygge:{t:"Aker Brygge, Tjuvholmen e Nobel Peace Center",z:"B",p:3,min:75,id:100,max:150,pos:[59.9100,10.7255],q:"Aker Brygge, Oslo",cls:"walk",sun:1,
 d:"Il lungomare moderno di Oslo, con le vecchie banchine dei cantieri navali trasformate in locali, negozi e piazze sull'acqua. Più avanti, a Tjuvholmen, ci sono le gallerie d'arte e le sculture all'aperto. Accanto c'è il Nobel Peace Center.",
 m:"La passeggiata è sempre libera. Il Nobel Peace Center, nella vecchia stazione Vestbanen, costa circa 180 corone (circa 16,80 €, una guida di metà 2026: un'altra dà 130): da settembre a metà giugno è aperto da martedì a domenica 11–17 (mercoledì fino alle 20) e il lunedì è chiuso (guida, da confermare su nobelpeacecenter.org). I ristoranti sul fronte del porto sono cari: per un caffè o un pranzo veloce meglio spostarsi."},
fram:{t:"Museo Fram e penisola di Bygdøy",z:"F",p:4,min:75,id:100,max:140,pos:[59.9034,10.6994],q:"Frammuseet, Oslo",cls:"",sun:1,tk:[16.8,"Museo Fram (180 corone)",1,1],
 win:function(){return[10*60,16*60]},
 d:"Il museo della nave polare Fram, che portò gli esploratori norvegesi Nansen e Amundsen al Polo Nord e al Polo Sud: si sale a bordo della vera nave, in un grande edificio a forma di tenda. Sulla penisola di Bygdøy ci sono anche altri musei del mare e il museo Kon-Tiki.",
 m:"Da ottobre ad aprile aperto ogni giorno dalle 10 alle 17; biglietto adulti 180 corone (circa 16,80 €) secondo una guida del 2026 (altre fonti danno 170): da confermare su frammuseum.no. Il biglietto combinato Fram e Kon-Tiki costa 325 corone (circa 30 €). Il traghetto estivo da Rådhusbrygga non va d'inverno: si arriva in bus 30. Il Museo delle navi vichinghe di Bygdøy è chiuso dal 2023 per i lavori e dovrebbe riaprire nel 2027 (data non ancora confermata): per i reperti vichinghi c'è il Museo di Storia Culturale in centro (circa 140 corone)."},
holm:{t:"Holmenkollen: il trampolino e il museo dello sci",z:"F",p:4,min:75,id:100,max:140,pos:[59.9638,10.6670],q:"Holmenkollen Ski Museum, Oslo",cls:"",sun:1,tk:[18.6,"Holmenkollen: museo e torre (200 corone)",1,1],
 win:function(){return[10*60,15*60]},
 d:"Il celebre trampolino da sci della collina nord di Oslo, con il museo dello sci più antico del mondo e una torre da cui si vede tutta la città e il fiordo. Si arriva in metro in mezz'ora dal centro.",
 m:"Da ottobre a dicembre aperto ogni giorno dalle 10 alle 16 (24 e 31 dicembre 10–14); biglietto adulti 200 corone (circa 18,60 €, museo e torre compresi), giovani sotto 30 anni 150 corone (sito ufficiale). La torre del trampolino è chiusa dal 13 al 16 ottobre per manutenzione: in quei giorni il museo e la vista dal piazzale restano comunque una buona visita. Si arriva con la metro linea 1 fino alla fermata Holmenkollen."},
grun:{t:"Grünerløkka, Mathallen e l'Akerselva",z:"D",p:3,min:90,id:120,max:180,pos:[59.9227,10.7524],q:"Mathallen Oslo, Vulkan 5",cls:"walk",sun:1,
 d:"Il quartiere più vivace di Oslo, di caffè, negozi indipendenti e murales. Lungo il fiume Akerselva, tra vecchi mulini e cascate, si arriva alla Mathallen, il mercato coperto con una trentina di banchi di cibo norvegese e internazionale.",
 m:"La passeggiata sul fiume è sempre libera. Mathallen è aperta da martedì a venerdì 10–20, sabato 10–18, domenica 11–17, chiusa il lunedì (guida, da confermare): alcuni banchi chiudono prima, soprattutto la domenica. Il lunedì Grünerløkka resta una buona passeggiata ma alcuni caffè sono chiusi."}
};
/* collegamenti tra le tappe */
function P2(a,b,min,mode,tab,tba,pts){LEGS[a+">"+b]={min:min,mode:mode,txt:tab,g:pts.f};LEGS[b+">"+a]={min:min,mode:mode,txt:tba,g:pts.r}}
var LEGS={};
P2("start","opera",9,"walk","A piedi per Dronning Eufemias gate e la piazza di Bjørvika fino all'Opera, circa 9 minuti.","A piedi dall'Opera fino a Oslo S, circa 9 minuti.",{f:[W([[59.9110,10.7528],[59.9090,10.7525],[59.9075,10.7529]])],r:[W([[59.9075,10.7529],[59.9090,10.7525],[59.9110,10.7528]])]});
P2("opera","munch",6,"walk","A piedi lungo il lungomare di Bjørvika fino al MUNCH, circa 6 minuti.","A piedi dal MUNCH fino all'Opera, circa 6 minuti.",{f:[W([[59.9075,10.7529],[59.9068,10.7550],[59.9063,10.7566]])],r:[W([[59.9063,10.7566],[59.9068,10.7550],[59.9075,10.7529]])]});
P2("start","munch",14,"walk","A piedi per Bjørvika, passando davanti all'Opera, fino al MUNCH, circa 14 minuti.","A piedi dal MUNCH fino a Oslo S passando davanti all'Opera, circa 14 minuti.",{f:[W([[59.9110,10.7528],[59.9090,10.7525],[59.9075,10.7529],[59.9063,10.7566]])],r:[W([[59.9063,10.7566],[59.9075,10.7529],[59.9090,10.7525],[59.9110,10.7528]])]});
P2("start","akershus",14,"walk","A piedi per Skippergata e le banchine fino ai cancelli della fortezza, circa 14 minuti.","A piedi dalla fortezza fino a Oslo S, circa 14 minuti.",{f:[W([[59.9110,10.7528],[59.9090,10.7460],[59.9075,10.7390],[59.9075,10.7365]])],r:[W([[59.9075,10.7365],[59.9075,10.7390],[59.9090,10.7460],[59.9110,10.7528]])]});
P2("opera","akershus",16,"walk","A piedi lungo il porto e la banchina di Akershusstranda fino alla fortezza, circa 16 minuti.","A piedi lungo il porto dalla fortezza fino all'Opera, circa 16 minuti.",{f:[W([[59.9075,10.7529],[59.9070,10.7450],[59.9073,10.7390],[59.9075,10.7365]])],r:[W([[59.9075,10.7365],[59.9073,10.7390],[59.9070,10.7450],[59.9075,10.7529]])]});
P2("akershus","radhuset",13,"walk","A piedi lungo Akershusstranda e il porto fino al Municipio, circa 13 minuti.","A piedi dal Municipio lungo il porto fino alla fortezza, circa 13 minuti.",{f:[W([[59.9075,10.7365],[59.9095,10.7350],[59.9118,10.7337]])],r:[W([[59.9118,10.7337],[59.9095,10.7350],[59.9075,10.7365]])]});
P2("start","radhuset",16,"walk","A piedi per Karl Johans gate e poi giù verso il porto fino al Municipio, circa 16 minuti.","A piedi fino a Karl Johans gate e a Oslo S, circa 16 minuti.",{f:[W([[59.9110,10.7528],[59.9128,10.7440],[59.9140,10.7390],[59.9118,10.7337]])],r:[W([[59.9118,10.7337],[59.9140,10.7390],[59.9128,10.7440],[59.9110,10.7528]])]});
P2("radhuset","brygge",6,"walk","A piedi lungo il porto fino ad Aker Brygge, circa 6 minuti.","A piedi dal porto fino al Municipio, circa 6 minuti.",{f:[W([[59.9118,10.7337],[59.9108,10.7290],[59.9100,10.7255]])],r:[W([[59.9100,10.7255],[59.9108,10.7290],[59.9118,10.7337]])]});
P2("radhuset","nasjonal",8,"walk","A piedi verso ovest fino alla vecchia stazione e al Museo Nazionale, circa 8 minuti.","A piedi dal Museo Nazionale al Municipio, circa 8 minuti.",{f:[W([[59.9118,10.7337],[59.9122,10.7295],[59.9126,10.7258]])],r:[W([[59.9126,10.7258],[59.9122,10.7295],[59.9118,10.7337]])]});
P2("brygge","nasjonal",4,"walk","A piedi dal lungomare al Museo Nazionale, circa 4 minuti.","A piedi dal Museo Nazionale al lungomare di Aker Brygge, circa 4 minuti.",{f:[W([[59.9100,10.7255],[59.9113,10.7256],[59.9126,10.7258]])],r:[W([[59.9126,10.7258],[59.9113,10.7256],[59.9100,10.7255]])]});
P2("nasjonal","slottet",11,"walk","A piedi in salita lungo Drammensveien fino al Palazzo Reale, circa 11 minuti.","A piedi in discesa dal Palazzo Reale fino al Museo Nazionale, circa 11 minuti.",{f:[W([[59.9126,10.7258],[59.9148,10.7265],[59.9170,10.7275]])],r:[W([[59.9170,10.7275],[59.9148,10.7265],[59.9126,10.7258]])]});
P2("radhuset","slottet",12,"walk","A piedi per Karl Johans gate, passando davanti al Teatro Nazionale, fino al Palazzo Reale, circa 12 minuti.","A piedi per Karl Johans gate dal Palazzo Reale al Municipio, circa 12 minuti.",{f:[W([[59.9118,10.7337],[59.9145,10.7335],[59.9158,10.7300],[59.9170,10.7275]])],r:[W([[59.9170,10.7275],[59.9158,10.7300],[59.9145,10.7335],[59.9118,10.7337]])]});
P2("start","slottet",22,"walk","A piedi per tutta Karl Johans gate, davanti al Parlamento e al Teatro Nazionale, fino al Palazzo Reale, circa 22 minuti.","A piedi per tutta Karl Johans gate fino a Oslo S, circa 22 minuti.",{f:[W([[59.9110,10.7528],[59.9129,10.7406],[59.9146,10.7338],[59.9170,10.7275]])],r:[W([[59.9170,10.7275],[59.9146,10.7338],[59.9129,10.7406],[59.9110,10.7528]])]});
P2("start","vigeland",25,"metro","Tram 12 da Oslo S fino alla fermata Vigelandsparken (circa 20 minuti, controlla il percorso su Ruter), poi pochi passi fino al cancello del parco.","Tram 12 dalla fermata Vigelandsparken fino a Oslo S, circa 20 minuti.",{f:[["tr12","Oslo S","Vigelandsparken"],W([[59.9265,10.7035],[59.9270,10.7006]])],r:[W([[59.9270,10.7006],[59.9265,10.7035]]),["tr12","Vigelandsparken","Oslo S"]]});
P2("nasjonal","vigeland",20,"metro","Tram 12 da Nationaltheatret o da Solli fino alla fermata Vigelandsparken, circa 15 minuti più qualche passo.","Tram 12 dalla fermata Vigelandsparken fino a Nationaltheatret, circa 15 minuti.",{f:[["tr12","Nationaltheatret","Vigelandsparken"],W([[59.9265,10.7035],[59.9270,10.7006]])],r:[W([[59.9270,10.7006],[59.9265,10.7035]]),["tr12","Vigelandsparken","Nationaltheatret"]]});
P2("start","fram",30,"metro","Bus 30 da Oslo S o da Nationaltheatret fino a Bygdøy (circa 25 minuti), poi 5 minuti a piedi fino al Museo Fram. Controlla la fermata su Ruter.","Bus 30 da Bygdøy fino a Nationaltheatret e Oslo S, circa 25 minuti.",{f:[["b30","Oslo S","Museo Fram"]],r:[["b30","Museo Fram","Oslo S"]]});
P2("start","holm",38,"metro","Metro (T-bane) linea 1 da Oslo S fino a Holmenkollen (circa 28 minuti), poi circa 10 minuti a piedi in salita fino al trampolino.","Metro linea 1 da Holmenkollen fino a Oslo S, circa 28 minuti più il tratto a piedi in discesa.",{f:[["t1","Oslo S","Holmenkollen"],W([[59.9634,10.6677],[59.9638,10.6670]])],r:[W([[59.9638,10.6670],[59.9634,10.6677]]),["t1","Holmenkollen","Oslo S"]]});
P2("start","grun",22,"metro","Tram 11 o 12 da Oslo S fino a Schous plass (circa 8 minuti), poi 8–10 minuti a piedi lungo il fiume fino a Mathallen.","Tram 11 o 12 da Schous plass fino a Oslo S, circa 8 minuti, dopo i 10 minuti a piedi dal mercato.",{f:[W([[59.9110,10.7528],[59.9170,10.7560],[59.9226,10.7590],[59.9227,10.7524]])],r:[W([[59.9227,10.7524],[59.9226,10.7590],[59.9170,10.7560],[59.9110,10.7528]])]});
/* ritorno in aeroporto: da Oslo S con Flytoget o treno Vy */
var RET={
OSL:{
 A:{min:35,txt:"Da Oslo S prendi il Flytoget (circa 20 minuti, circa 243 corone) o un treno regionale Vy (25–30 minuti, circa 124 corone con l'app): partono dai binari sotto la stazione e arrivano sotto il terminal. Compra il biglietto nell'app Flytoget o Vy, che è più economico che a bordo.",g:[["fl","Oslo S","Aeroporto"]]}},
TRF:{
 A:{min:120,txt:"Dal terminal dei bus accanto a Oslo S prendi il bus Torp-ekspressen per l'aeroporto di Torp: circa 1 ora e 45–2 ore. Orari e prezzo da verificare su torpekspressen.no. Parti con almeno 3 ore e mezza di anticipo sul volo.",g:[["tp","Oslo S","Aeroporto Torp"]]}}
};
var ARR={
OSL:[["fl","Aeroporto","Oslo S"]],
TRF:[["tp","Aeroporto Torp","Oslo S"]]
};
/* locali: h = orari lun→dom; "" = chiuso. Orari e prezzi da guide e schede online, non letti sui siti dei locali: da confermare.
   Dove l'orario non si trova (indicato nel testo) ho messo una fascia prudente: controlla prima di andare. */
var V={
tim:{n:"Tim Wendelboe",a:"Grüners gate 1",z:"D",r:"4,6",pos:[59.9226,10.7587],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","10:00-17:00","10:00-17:00"],
 d:"Il caffè di uno dei più famosi torrefattori del mondo, a Grünerløkka: un piccolo bancone dove si beve un espresso o un filtro di caffè in grani di una sola origine, preparato con cura.",pr:"Un espresso costa circa 48 corone, un filtro 55 e un caffè al latte 52–60 (circa 4,50–5,60 €, listino da una guida del 2026, non visto). Orari da guide, da confermare."},
supreme:{n:"Supreme Roastworks",a:"Thorvald Meyers gate 2",z:"D",r:"4,5",pos:[59.9229,10.7594],h:["08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","08:00-18:00","09:00-18:00","09:00-18:00"],
 d:"Una torrefazione e caffè sulla via principale di Grünerløkka, con espresso e caffè filtro in grani tostati lì: un posto semplice dove fare colazione o una pausa tra una tappa e l'altra.",pr:"Un espresso costa circa 45–55 corone, un caffè al latte circa 58 (circa 4,20–5,40 €, listino da una guida del 2026, non visto). Orari da guide, da confermare."},
mathallen:{n:"Mathallen Oslo",a:"Vulkan 5",z:"D",r:"4,4",pos:[59.9227,10.7524],h:["","10:00-20:00","10:00-20:00","10:00-20:00","10:00-20:00","10:00-18:00","11:00-17:00"],
 d:"Il mercato coperto di Oslo, in un ex stabilimento sul fiume: una trentina di banchi con zuppa di pesce, panini aperti norvegesi (smørbrød), formaggi, salumi, piatti asiatici e pasticcini. Si sceglie un banco e si mangia ai tavoli comuni.",pr:"Un pranzo costa di solito 115–180 corone (circa 11–17 €): zuppa di pesce con pane circa 120–150, smørbrød 75–130. Orari da una guida del 2026, non visti sul sito; la domenica alcuni banchi chiudono prima. Chiuso il lunedì."},
godt:{n:"Godt Brød",a:"Thorvald Meyers gate 57",z:"D",r:"4,4",pos:[59.9244,10.7595],h:["07:00-17:00","07:00-17:00","07:00-17:00","07:00-17:00","07:00-17:00","09:00-17:00","09:00-17:00"],
 d:"Una panetteria cooperativa a Grünerløkka, nota per il pane a lievitazione naturale e per le kanelbolle, i panini alla cannella: una colazione norvegese semplice e buona, con il caffè.",pr:"Una kanelbolle costa circa 40–50 corone, un pezzo di pane o un dolce 55–90 (circa 3,70–8,40 €, guide, non visto). Orari: solo l'apertura dei giorni feriali (7:00) risulta dalle guide; chiusura e fine settimana sono una fascia prudente, da controllare."},
sara:{n:"Café Sara",a:"Thorvald Meyers gate 27",z:"D",r:"4,3",pos:[59.9238,10.7590],h:D7("11:00-20:00"),
 d:"Un caffè-ristorante informale a Grünerløkka con zuppe, insalate, panini aperti e una buona carta di birre: pranzo semplice o cena senza pretese, in un ambiente da quartiere.",pr:"Il pranzo costa circa 120–180 corone, i piatti della sera 180–250 (circa 11–23 €, guide, non visto). Orari non trovati: ho messo una fascia prudente, controlla prima di andare."},
elias:{n:"Elias Mat og Sant",a:"Thorvald Meyers gate 10",z:"D",r:"4,4",pos:[59.9232,10.7590],h:D7("11:00-17:00"),
 d:"Un locale di cucina di stagione, con molti piatti vegetariani, a Grünerløkka: il pranzo prevede una zuppa del giorno e piatti freschi a prezzi medi.",pr:"Un pranzo costa circa 145–185 corone (circa 13,50–17 €, guide, non visto). Orari non trovati: ho messo una fascia prudente, controlla prima di andare."},
olympen:{n:"Olympen",a:"Grønlandsleiret 15",z:"C",r:"4,3",pos:[59.9137,10.7610],h:D7("12:00-21:00"),
 d:"Una vecchia trattoria-birreria del 1892 in zona Grønland, con soffitti alti e lampadari: piatti norvegesi di casa come kjøttkaker (polpette con salsa), lapskaus (spezzatino con verdure) e, in autunno, fårikål (agnello con cavolo).",pr:"Un piatto principale costa circa 200–295 corone (circa 19–27,50 €, guide, non visto). Orari non trovati: ho messo una fascia prudente, controlla prima di andare."},
engebret:{n:"Engebret Café",a:"Bankplassen 1",z:"A",r:"4,3",pos:[59.9094,10.7406],h:D7("12:00-21:00"),
 d:"Un ristorante storico del 1857 vicino alla fortezza e al Municipio, frequentato da artisti: cucina norvegese tradizionale con pesce, carne e i piatti stagionali dell'autunno, come il fårikål.",pr:"Il fårikål come piatto principale costa circa 265–295 corone (circa 25–27,50 €, guide, non visto): è un locale a prezzo medio. Orari non trovati: ho messo una fascia prudente, controlla prima di andare."},
egget:{n:"Egget",a:"Josefines gate 16",z:"F",r:"4,4",pos:[59.9243,10.7222],h:D7("09:00-16:00"),
 d:"Un bistrot per colazione e pranzo a Majorstuen: uova su pane tostato e panini aperti in un ambiente tranquillo, vicino al quartiere di Frogner e al parco Vigeland.",pr:"Le uova su pane e gli smørbrød costano circa 85–150 corone (circa 8–14 €, guide, non visto). Orari non trovati: ho messo una fascia prudente, controlla prima di andare."},
solberg:{n:"Solberg & Hansen Kaffebar",a:"Stranden 3, Aker Brygge",z:"B",r:"4,4",pos:[59.9099,10.7266],h:D7("08:00-17:00"),
 d:"Un caffè di una storica torrefazione di Oslo sul lungomare di Aker Brygge: una pausa più economica dei ristoranti sul fronte del porto, con un caffè o un dolce.",pr:"Un caffè costa circa 45–60 corone (circa 4,20–5,60 €, stima da guide, non visto). Orari non trovati: ho messo una fascia prudente, controlla prima di andare."}
};
/* quali locali per pasto e zona */
var MEAL={
col:{A:["godt","solberg","tim"],B:["solberg","egget"],C:["tim","godt","supreme"],D:["tim","supreme","godt"],F:["egget","tim"]},
pra:{A:["mathallen","elias","engebret"],B:["elias","sara"],C:["olympen","mathallen"],D:["mathallen","elias","sara"],F:["egget","elias"]},
cen:{A:["engebret","olympen","sara"],B:["engebret","olympen"],C:["olympen","engebret"],D:["sara","olympen"],F:["engebret","sara"]},
snk:{A:["solberg","godt"],B:["solberg","egget"],C:["tim","supreme"],D:["supreme","godt","tim"],F:["egget","tim"]}
};
/* giornate a tema per i viaggi di più giorni, in ordine di priorità */
var BUNDLES=[
{id:"centro",t:"Municipio, Palazzo Reale e Aker Brygge",acts:["slottet","radhuset","brygge"],need:240,core:1},
{id:"bjorv",t:"Opera, MUNCH e Fortezza di Akershus",acts:["opera","munch","akershus"],need:270,core:1},
{id:"vige",t:"Parco di Vigeland e Museo Nazionale",acts:["vigeland","nasjonal"],need:240,core:1},
{id:"bygdoy",t:"Museo Fram e Bygdøy",acts:["fram"],need:150},
{id:"holm",t:"Holmenkollen e Grünerløkka",acts:["holm","grun"],need:240}
];
var ORDER=["opera","radhuset","vigeland","munch","akershus","slottet","nasjonal","brygge","grun","fram","holm"];
/* zone dell'alloggio: nome, centro indicativo, zona dei locali */
var HZ=[
["sen","Sentrum (Oslo S, Karl Johans gate)",[59.9127,10.7461],"A"],
["bry","Aker Brygge / Vika / Tjuvholmen",[59.9115,10.7280],"B"],
["bjo","Bjørvika / Grønland / Tøyen",[59.9100,10.7600],"C"],
["gru","Grünerløkka / Sagene",[59.9230,10.7580],"D"],
["fro","Frogner / Majorstuen",[59.9235,10.7170],"F"],
["altro","Altra zona (scrivi l'indirizzo)",[59.9127,10.7461],""]
];
/* imposta di soggiorno: a Oslo non ho trovato una tassa in vigore (da confermare) */
var TAX=[["h5","Hotel 4–5 stelle",0],["h3","Hotel fino a 3 stelle, B&B o appartamento",0],["host","Ostello o struttura economica",0],["no","Ospite di amici o parenti",0]];
var ORD={
col:[["Kanelbolle og kaffe","il panino alla cannella, il dolce norvegese per eccellenza, con un caffè."],["Frokost","la colazione norvegese: pane, formaggio (anche il brunost, il formaggio marrone dolce), uova e caffè."],["Smørbrød","il panino aperto con salmone, uova o gamberetti."]],
pra:[["Smørbrød","il panino aperto con salmone affumicato, gamberetti o uova."],["Fiskesuppe","zuppa di pesce con pane."],["Fiskekaker","polpette di pesce con salsa e patate."],["Dagens rett","il piatto del giorno, di solito con una zuppa o un caffè compresi."]],
cen:[["Kjøttkaker","polpette di carne in salsa con patate e mirtilli rossi."],["Lapskaus","spezzatino di carne e verdure, piatto di casa."],["Fårikål","agnello e cavolo cotti lentamente: il piatto nazionale d'autunno."],["Fiskesuppe","zuppa di pesce, il piatto caldo più semplice."]]
};
/* punti per foto e selfie (posizioni indicative) */
var PH=[
["📷","Il tetto dell'Opera","Foto","Al tramonto, con il fiordo e il porto sullo sfondo: la rampa bianca sale verso il cielo.",[59.9078,10.7527],"Operahuset Oslo","opera"],
["🤳","Selfie sulla rampa","Selfie","In cima al tetto dell'Opera, con la città alle spalle.",[59.9075,10.7525],"Operahuset Oslo","opera"],
["📷","Il MUNCH visto dal porto","Foto","La torre del museo sul lungomare di Bjørvika: si fotografa meglio dall'acqua, dal lato dell'Opera.",[59.9068,10.7550],"MUNCH, Oslo","munch"],
["📷","Le mura di Akershus","Foto","Cannoni e bastioni con il porto sotto: il lato sud-ovest al mattino, con la luce di fronte.",[59.9070,10.7360],"Akershus festning, Oslo","akershus"],
["📷","Le torri del Municipio","Foto","Le due torri di mattoni rossi viste dalla piazza sul porto; all'interno, in sala, i grandi affreschi.",[59.9118,10.7337],"Oslo rådhus","radhuset"],
["📷","Il Palazzo Reale","Foto","La facciata gialla in cima alla collina, vista dal basso di Karl Johans gate.",[59.9165,10.7283],"Det kongelige slott, Oslo","slottet"],
["🤳","Il Monolito di Vigeland","Selfie","La colonna di figure intrecciate in cima alle scale: scatta dal basso per includere tutta l'altezza.",[59.9270,10.7006],"Vigelandsparken Monolitten","vigeland"],
["📷","Il ponte delle statue","Foto","Il ponte con i bronzi di Vigeland all'ingresso del parco, con la statua del bambino arrabbiato.",[59.9268,10.6999],"Vigelandsparken bridge, Oslo","vigeland"],
["📷","Il lungomare di Aker Brygge","Foto","Le banchine con le barche e le vetrine: la sera con le luci accese sull'acqua.",[59.9100,10.7255],"Aker Brygge, Oslo","brygge"],
["📷","La nave Fram","Foto","La nave polare dentro il museo, vista dal ponte superiore.",[59.9034,10.6994],"Frammuseet, Oslo","fram"],
["📷","Il trampolino di Holmenkollen","Foto","Il trampolino visto dal piazzale sotto la torre: lo si fotografa meglio dal lato della collina.",[59.9638,10.6670],"Holmenkollen Ski Museum, Oslo","holm"],
["📷","La cascata dell'Akerselva","Foto","Le cascate e i vecchi mulini lungo il fiume, a pochi passi da Mathallen.",[59.9215,10.7525],"Akerselva, Oslo","grun"]
];
/* avvisi (verificati il 13 ottobre 2026) */
var AVV=[
{from:"2026-10-13",to:"2026-10-16",t:"Holmenkollen: la torre del trampolino è chiusa",x:"Il sito di Holmenkollen segnala che la torre del trampolino è chiusa dal 13 al 16 ottobre per manutenzione. Il museo dello sci e il piazzale restano aperti (10–16)."},
{from:"2026-10-13",to:"2027-04-30",t:"Bygdøy: niente traghetto d'inverno",x:"Il traghetto da Rådhusbrygga per Bygdøy circola solo in stagione calda: d'inverno si arriva in bus 30. Il Museo delle navi vichinghe è chiuso dal 2023 per la ristrutturazione e dovrebbe riaprire nel 2027 (data non confermata): per i reperti vichinghi c'è il Museo di Storia Culturale in centro."},
{from:"2026-10-13",to:"2026-12-31",t:"Municipio: giorni di chiusura",x:"Il sito del Comune di Oslo elenca alcuni giorni di chiusura del Municipio tra ottobre e dicembre 2026 e avverte che possono aggiungersene altri con poco preavviso. Controlla oslo.kommune.no il giorno prima. Il 10 dicembre si tiene la cerimonia del Premio Nobel per la Pace: la zona può avere più controlli di sicurezza."},
{from:"2026-11-15",to:"2027-01-31",t:"Giornate molto corte",x:"A dicembre il sole sorge intorno alle 9 e tramonta verso le 15:15: pianificate le visite all'aperto (Vigeland, Akershus, Holmenkollen) nelle ore centrali della giornata."},
{from:"2026-12-20",to:"2026-12-31",t:"Natale: orari ridotti",x:"Il 24 dicembre il MUNCH chiude alle 14 e Holmenkollen alle 14 (stesso orario il 31 dicembre). Il Nasjonalmuseet è chiuso il 24, 25 e 26 dicembre e il 31 dicembre. In Norvegia i negozi sono chiusi la domenica e nei giorni festivi (ristoranti, caffè e musei restano aperti)."}
];
/* clima medio di Oslo (indicativo, massime/minime) */
var CLIM=[[-2,-7],[-1,-7],[4,-3],[10,1],[17,6],[21,10],[23,13],[21,12],[16,8],[9,3],[3,-1],[-1,-5]];
return {G:G,FROM:FROM,PAR:PAR,SEG:SEG,START:START,STOPS:STOPS,LEGS:LEGS,RET:RET,ARR:ARR,V:V,MEAL:MEAL,ORD:ORD,PH:PH,AVV:AVV,CLIM:CLIM,BUNDLES:BUNDLES,ORDER:ORDER,HZ:HZ,TAX:TAX};
})();

/* ===== Oslo: comportamenti e testi propri della città ===== */
(function(C){
function meta(it,meta,E){var WD=E.wd;
if(it.id==="radhuset"&&WD===6)meta+=" Oggi è domenica: il Municipio è chiuso dentro; la piazza e le facciate si vedono da fuori.";
if(it.id==="nasjonal"&&WD===0)meta+=" Oggi è lunedì: il Nasjonalmuseet in autunno e inverno di norma è chiuso (da confermare sul sito).";
if(it.id==="munch"&&WD>=2&&WD<=5)meta+=" Oggi il MUNCH resta aperto fino alle 21.";
if(it.id==="grun"&&WD===0)meta+=" Oggi è lunedì: Mathallen è chiusa, e alcuni caffè di Grünerløkka riposano.";
return meta}
Object.assign(C,{id:"oslo",n:"Oslo",cn:"Norvegia",e:"⛷️",flag:"🇳🇴",col:["#c8102e","#1f3a6b","#e8e8e8"],k:"oslo norvegia norway",
TZ:"Europe/Oslo",LL:[59.9127,10.7461],CC:"no",QN:"Oslo",BK:"Oslo",ARE:/oslo|norway|norvegia|\b0[0-9]{3}\b/i,VER:"13 ottobre 2026",
Z0:"A",LANG:"nb-NO",LANGN:"norvegese",WATER:"osm",TAXDEF:"h3",TAXMAXN:99,RETC:1,LUNCHO:0,DINO:0,
CUR:{c:"NOK",s:"kr",e:0.0932},hub:{n:"Oslo S",q:"Oslo Sentralstasjon, Oslo"},
SINGLE:{acts:["opera","munch","akershus","radhuset","vigeland"],ins:[]},
EXCL:[],
DICON:{opera:"🎭",munch:"🖼️",akershus:"🏰",radhuset:"🏛️",slottet:"👑",vigeland:"🗿",nasjonal:"🎨",brygge:"⚓",fram:"🚢",holm:"⛷️",grun:"🥐"},
ZN:{A:"in centro",B:"ad Aker Brygge",C:"a Bjørvika e Grønland",D:"a Grünerløkka",F:"a Frogner e Majorstuen"},
NEAR:{col:"caffè o panetteria",pra:"locale veloce",cen:"locale",snk:"caffè o panetteria"},
SE:{tim:"☕",supreme:"☕",mathallen:"🍽️",godt:"🥐",sara:"🥪",elias:"🥗",olympen:"🍲",engebret:"🍲",egget:"🍳",solberg:"☕"},
TR:{one:4.3,cap:12.8,lbl:"Metro, tram e bus (Ruter)",
 air:{OSL:{one:11.6,n:"Treno Vy per l'aeroporto (circa 124 corone)"},TRF:{one:0,n:"Bus Torp-ekspressen (prezzo da verificare)"}},
 passes:[
 {n:"Biglietto 24 ore",d:1,max:1,p:12.8,note:"Il biglietto 24 ore (137 corone, circa 12,80 €, zona 1) vale su metro, tram, bus e battelli urbani di Oslo per 24 ore dall'attivazione."},
 {n:"Biglietto 7 giorni",d:7,p:35.3,only:function(T){return T.n>=5},note:"Il biglietto 7 giorni (379 corone, circa 35,30 €, zona 1) vale per sette giorni su metro, tram, bus e battelli urbani."}],
 note:"Prezzi di Ruter e di guide di viaggio 2026 (la tariffa di Ruter cambia ogni anno a fine gennaio), convertiti a 1 corona = 0,0932 €: corsa singola 46 corone (circa 4,30 €, valida 60 minuti con i cambi), 24 ore 137 corone (circa 12,80 €), 7 giorni 379 corone (circa 35,30 €). Valgono per la zona 1; il biglietto 24 ore e quello da 7 giorni sono confermati da una sola guida, controlla l'app Ruter. Per il centro basta la zona 1. L'aeroporto è fuori città: il Flytoget costa circa 243 corone (circa 22,60 €) e il treno Vy circa 124 corone (circa 11,60 €), da comprare a parte. L'Oslo Pass (24 ore 580 corone, 48 ore 845, 72 ore 995) comprende mezzi e molti musei ma costa più dei musei visti in due giorni: conviene solo se ne visiti molti. I biglietti si comprano con l'app Ruter, alle macchinette (solo carta) o nei chioschi; sul tram e sulla metro non si compra a bordo."},
FOOD:{co:[10,"Colazione in un caffè o panetteria"],pr:[15,"Pranzo (smørbrød, zuppa o piatto del giorno)"],ce:[25,"Cena (cucina norvegese)"],sp:[7,"Spuntini e dolci"]},
T:{ride:"In metro o tram",move:"tutto a piedi, in tram o in metro",bags:"«Kan jeg la bagasjen min stå her?»",bagsPM:"«Kan jeg la bagasjen min stå her til i ettermiddag?»",bagsAM:"«Kan jeg la bagasjen min stå her til lunsj?»",
pra:"Un locale veloce",praZ:{A:"Lungo Karl Johans gate i ristoranti sono per turisti e un piatto di salmone costa 300–400 corone: per un pasto vero cerca le vie laterali o il mercato di Mathallen.",B:"Sul fronte del porto di Aker Brygge i ristoranti sono i più cari della città: per un caffè o un pranzo veloce spostati di qualche isolato."},
freeLong:"Qualche idea: una passeggiata sul tetto dell'Opera, i sentieri sul lungofiume Akerselva, il parco Vigeland o un riposo all'alloggio.",
freeShort:"Riposati all'alloggio, oppure fai una passeggiata sul lungomare.",
remind:"Il Municipio è chiuso la domenica. La domenica la maggior parte dei negozi è chiusa; aperti ristoranti, caffè e musei. In inverno il sole tramonta presto.",
rain1:"Al coperto: il MUNCH, il Nasjonalmuseet, il Municipio, il museo Fram e i caffè.",
rainM:"Al coperto: MUNCH, Nasjonalmuseet, Municipio, Fram, Mathallen e i caffè.",
water:"Riempite la borraccia: l'acqua del rubinetto di Oslo è ottima e potabile. Attivate «Acqua» sulla mappa per le fontanelle più vicine.",
kitchen:"A Oslo si pranza tra le 11:30 e le 14 e si cena presto, dalle 17:30: molti caffè chiudono verso le 17–18, quindi la cena si fa nei ristoranti.",
night:[["🍺","Una birra artigianale in un locale di Grünerløkka, il modo più semplice per chiudere la giornata."],["🕙","Le cucine servono di solito fino alle 21–22. La metro e il tram circolano fino a mezzanotte circa; il venerdì e sabato notte ci sono bus notturni (controlla ruter.no)."],["☕","Molti caffè aprono alle 8: la colazione di domani è nella prima tappa dell'itinerario."]],
bottle:"Borraccia vuota (da riempire: l'acqua del rubinetto è ottima)",
fuso:"Oslo ha lo stesso fuso orario dell'Italia",
plug:"Caricabatterie (la spina è quella europea; le spine italiane a tre poli grandi possono non entrare, porta un adattatore se ne hai uno)",
foodNote:"I pasti sono stime per caffè e locali di quartiere: Oslo è cara. Una colazione sta intorno ai 8–12 €, un pranzo veloce intorno ai 13–17 € e una cena con un piatto principale intorno ai 20–30 €. Si paga con la carta quasi ovunque, anche per un caffè; i contanti servono quasi mai.",
taxNote:"A Oslo, al 13 ottobre 2026, non ho trovato un'imposta di soggiorno in vigore (dato non confermato su fonte ufficiale): in genere il prezzo che vedi sull'annuncio è quello finale. Controlla comunque che la struttura non aggiunga una tassa a parte.",
mcrit:"Criteri: caffè, panetterie e locali di quartiere con almeno 4 stelle su Google, niente catene. Colazione e cena restano intorno ai 10 e ai 25 € a persona. Orari e prezzi sono quelli delle guide e delle schede online (ottobre 2026) e non sono stati letti sui siti dei locali; per i locali senza orario trovato ho messo una fascia prudente: controllali qualche giorno prima."},
fx:{meta:meta},
AIRTIPS:["Il Flytoget impiega circa 20 minuti fino a Oslo S, con partenze ogni 10 minuti: è la via più rapida; il treno Vy costa la metà e impiega solo 5–10 minuti in più.","💧 Passa i controlli con la borraccia vuota e riempila dopo: in aeroporto l'acqua costa cara."],
CHECK:[["tk","Biglietto per l'aeroporto (Flytoget o treno Vy) e biglietto 24 ore o corse singole Ruter: si comprano nelle app Ruter, Flytoget o Vy",function(E){return true}],["munch","Biglietto MUNCH con orario d'ingresso (280 corone): meglio prenotare online",["munch"]],["nas","Biglietto Nasjonalmuseet (circa 220 corone): controlla gli orari sul sito",["nasjonal"]],["fram","Biglietto del Museo Fram (circa 180 corone)",["fram"]],["holm","Biglietto Holmenkollen (200 corone): la torre è chiusa dal 13 al 16 ottobre",["holm"]],["card","Carta d'identità o passaporto in corso di validità"],["pay","Carta di pagamento con codice: in Norvegia si usa quasi solo la carta, anche per un caffè"]],
NUM:{1:["en","en"],2:["to","tu"],3:["tre","tre"],4:["fire","FI-re"],5:["fem","fem"],6:["seks","seks"],7:["sju","shiu"],8:["åtte","OT-te"],9:["ni","ni"],10:["ti","ti"]},
PHR:function(N,M){var nu=this.NUM[Math.min(10,Math.max(1,N))]||this.NUM[2];var fr=[["Buongiorno / Buonasera","God dag / God kveld","gu dag / gu kvel"],[N===1?"Un tavolo per una persona, per favore":"Un tavolo per "+N+", per favore","Et bord til "+(N===1?"én person":nu[0])+", takk","et bor til "+(N===1?"en per-SON":nu[1])+", tak"],["Un caffè e una kanelbolle, per favore","En kaffe og en kanelbolle, takk","en CAF-fe o en ka-NEL-bol-le, tak"],["Acqua del rubinetto, per favore","Vann fra springen, takk","van fra SPRIN-gen, tak"],["Il conto, per favore","Kan jeg få regningen, takk?","kan iei fo REI-ning-en, tak"],["Posso pagare con la carta?","Kan jeg betale med kort?","kan iei be-TA-le me cort"],["Quanto costa?","Hvor mye koster det?","vur MI-e COS-ter de"],["Dov'è la metro?","Hvor er T-banen?","vur er TE-ba-nen"],["Qual è il treno per l'aeroporto?","Hvilket tog går til flyplassen?","VIL-ket tog gor til FLI-plas-sen"]];
if(M)fr=fr.concat([["Ho una prenotazione","Jeg har en reservasjon","iei har en re-ser-va-SHON"],["Posso lasciare i bagagli?","Kan jeg la bagasjen min stå her?","kan iei la ba-GA-shen min sto her"],["A che ora è il check-out?","Når er utsjekk?","nor er UT-shek"]]);
return fr.concat([["Mi scusi","Unnskyld","UN-shil"],["Grazie mille!","Tusen takk!","TU-sen tak"]])},
taxTxt:function(tx){return "Imposta di soggiorno di Oslo: "+(tx[2]===0&&tx[0]==="no"?"non si paga se sei ospite di amici o parenti":"al 13 ottobre 2026 non ho trovato una tassa in vigore ("+tx[1].toLowerCase()+"); dato non confermato su fonte ufficiale")+". Controlla che la struttura non la aggiunga a parte."},
STAYTIPS:["La metro (T-bane, cinque linee che si incontrano in centro), i tram e i bus si usano con lo stesso biglietto Ruter. Il venerdì e il sabato notte ci sono bus notturni: controlla ruter.no."],
ZONES:[
["🚇 Metro, tram e biglietti",["Un solo biglietto Ruter vale su metro, tram, bus e battelli urbani: la corsa singola (46 corone) dura 60 minuti con i cambi, il 24 ore costa 137 corone. Il centro è tutto in zona 1.","Il biglietto si compra con l'app Ruter o alle macchinette, solo con carta. Sul tram e sulla metro non si può comprare a bordo; sul bus costa 20 corone in più in contanti.","I controlli sono a campione e le multe sono pesanti (circa 1.200 corone sul posto, importo da controllare): tieni sempre il biglietto attivo.","L'aeroporto è fuori città: il Flytoget costa circa 243 corone e i treni Vy circa 124, e non sono compresi nei biglietti urbani."]],
["🏛️ Centro: Karl Johans gate, Municipio e porto",["Karl Johans gate va dalla stazione al Palazzo Reale in 20 minuti a piedi, passando davanti al Parlamento e al Teatro Nazionale.","Dal Municipio si raggiunge a piedi Aker Brygge e il Nasjonalmuseet in 5–8 minuti.","L'Opera, il MUNCH e la Fortezza di Akershus sono a 10–15 minuti a piedi dalla stazione."],["radhuset","slottet","opera","akershus"]],
["🎨 Munch e Nasjonalmuseet",["Le versioni dell'«Urlo» di Munch sono esposte a rotazione al MUNCH e al Nasjonalmuseet: guarda sul sito di ciascun museo cosa c'è in sala.","Il MUNCH è aperto fino alle 21 da mercoledì a sabato: se vuoi evitare la folla, vai la sera con il biglietto serale più economico.","Il Nasjonalmuseet di solito è chiuso il lunedì in autunno e in inverno."],["munch","nasjonal"]],
["☕ Caffè e mangiare",["Oslo è una delle città più care d'Europa: pranzo con un piatto del giorno (dagens rett) o in un mercato coperto costa molto meno di una cena.","I caffè di Grünerløkka e i torrefattori sono ottimi per colazione e pause.","Si paga con la carta quasi ovunque; la mancia non è obbligatoria (si arrotonda o si lascia il 5–10% se il servizio è stato buono)."],["tim","supreme","mathallen"]],
["🌅 Un giorno fuori Oslo",["Le isole del fiordo si raggiungono con i battelli Ruter in 15–25 minuti dal Rådhusbrygga (in autunno meno corse).","Per la natura vicino alla città, dal centro in mezz'ora di metro si arriva ai sentieri di Holmenkollen e della foresta di Nordmarka."]]],
WTIPS:["L'acqua del rubinetto di Oslo è potabile e ottima: puoi chiederla ovunque («Vann fra springen, takk») e riempire la borraccia.","Attivate «Acqua» sulla mappa: mostra le fontanelle vicine al percorso, dai dati di OpenStreetMap.","Molti caffè riempiono la borraccia se la chiedi gentilmente.","Nelle gelide giornate invernali tieni la borraccia vicino al corpo: l'acqua nello zaino può ghiacciare."],
GEN:["La Norvegia non è nell'UE ma è nello spazio Schengen: per entrare dall'Italia basta la carta d'identità valida. Alla dogana valgono regole proprie su alcolici, tabacco, carne e latticini: per una gita breve non portare cibi freschi.","La moneta è la corona norvegese (NOK): 1 € vale circa 10,7 corone. Si paga con la carta quasi ovunque, anche per un caffè.","Oslo ha lo stesso fuso orario dell'Italia.","La mancia non è obbligatoria: se il servizio è buono si arrotonda il conto o si lascia circa il 5–10%.","La domenica e nei festivi la maggior parte dei negozi è chiusa; sono aperti ristoranti, caffè e musei.","Gli alcolici forti si comprano solo nei negozi Vinmonopolet, che chiudono presto e la domenica; la birra e il vino leggero sono nei supermercati con orari limitati.","Controlla orari e prezzi dei locali qualche giorno prima: possono cambiare."],
NUMS:'<li><a class="call" href="tel:112">📞 112</a> Polizia · <a class="call" href="tel:113">113</a> Ambulanza · <a class="call" href="tel:110">110</a> Vigili del fuoco</li><li>🚇 Trasporti pubblici, anche per oggetti smarriti: <a href="https://ruter.no/" target="_blank" rel="noopener">ruter.no</a> · treni: <a href="https://www.vy.no/" target="_blank" rel="noopener">vy.no</a> · Flytoget: <a href="https://www.flytoget.no/" target="_blank" rel="noopener">flytoget.no</a>.</li><li>🇮🇹 Ambasciata d\'Italia a Oslo: <a href="https://ambosloo.esteri.it" target="_blank" rel="noopener">ambosloo.esteri.it</a>, per documenti persi o rubati.</li>',
STRK:'Al 13 ottobre 2026 non ho verificato scioperi annunciati nei trasporti di Oslo. Gli scioperi in Norvegia vengono annunciati con pochi giorni di preavviso: nei giorni prima controllate <a href="https://ruter.no/" target="_blank" rel="noopener">ruter.no</a> e, per i treni, <a href="https://www.vy.no/" target="_blank" rel="noopener">vy.no</a>.',
SKY:'<g class="sk-back" style="--k:0"><circle cx="352" cy="26" r="11"/><path d="M0 106 V90 Q40 74 90 82 Q130 88 150 106 Z"/></g>'+
'<g class="sk-main">'+
'<g style="--k:1"><path d="M14 106 V44 H26 V106 Z M8 44 H32 V36 H8 Z M32 38 L74 92 V106 H68 V96 L30 46 Z"/></g>'+
'<g style="--k:2"><path d="M92 106 V80 H156 V106 Z M92 80 V76 H98 V80 Z M104 80 V76 H110 V80 Z M116 80 V76 H122 V80 Z M128 80 V76 H134 V80 Z M140 80 V76 H146 V80 Z M104 80 V58 H134 V80 Z M102 58 H136 L119 42 Z M118 42 V32 H120 V42 Z"/></g>'+
'<g style="--k:3"><path d="M172 106 V32 H190 V106 Z M214 106 V26 H232 V106 Z M190 106 V64 H214 V106 Z M172 32 H190 V28 H172 Z M214 26 H232 V22 H214 Z"/></g>'+
'<g style="--k:4"><path d="M246 106 L248 102 L296 62 H324 V106 Z M296 62 V50 H324 V62 Z"/></g>'+
'<g style="--k:5"><path d="M352 106 V16 Q352 10 358 10 Q364 10 364 16 V106 Z M340 106 V100 H376 V106 Z M344 100 V94 H372 V100 Z M348 94 V88 H368 V94 Z"/></g>'+
'</g>'+
'<g class="sk-lines"><path d="M178 44 v8 M178 58 v8 M222 38 v8 M222 52 v8 M198 74 v10 M206 74 v10"/><path d="M300 76 h20 M300 88 h20"/></g>'+
'<g class="sk-spark" style="--k:6"><circle cx="40" cy="14" r="1.6"/><circle cx="120" cy="14" r="1.3"/><circle cx="196" cy="12" r="1.3"/><circle cx="270" cy="22" r="1.3"/><circle cx="330" cy="10" r="1.3"/><circle cx="388" cy="24" r="1.3"/></g>'+
'<rect class="sk-ground" x="0" y="105" width="400" height="2.5" rx="1.2" style="--k:8"/>'
});
})(CITIES.oslo);

;var n=window.CITIES["oslo"];if(n&&o&&n!==o)for(var k in o)if(k!=="lazy"&&!(k in n))n[k]=o[k]})(window.CITIES&&window.CITIES["oslo"]);
