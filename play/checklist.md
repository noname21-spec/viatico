# Checklist di pubblicazione · Viaticum

Aggiornata l'8 novembre 2026.

## Già fatto
- [x] Chiave di caricamento e secret su GitHub: a ogni build l'AAB viene firmato da solo (viaticum.aab in Releases → android-latest)
- [x] AAB verificato: versione 1.0.71 (codice 71), firmato con la chiave di caricamento, target SDK 36
- [x] Testi della scheda (scheda-it.md), risposte sulla sicurezza dei dati (sicurezza-dati.md), immagini (cartella img)
- [x] Pagina privacy aggiornata: https://noname21-spec.github.io/viatico/privacy.html

## A cura tua in Play Console
1. Crea l'account sviluppatore personale (25 $, una volta) e completa la verifica dell'identità e del telefono.
2. «Crea app»: nome «Viaticum: itinerari di viaggio», lingua predefinita Italiano, App, Gratuita; accetta le dichiarazioni.
3. «Configura l'app»: privacy (link sopra), accesso all'app (tutto disponibile senza accesso), annunci (no), classificazione dei contenuti, pubblico di destinazione (18+), sicurezza dei dati (copia da sicurezza-dati.md), categoria Viaggi e informazioni locali, contatti.
4. «Scheda dello Store principale»: testi da scheda-it.md, icona, grafica in primo piano e screenshot da img/.
5. «Test chiuso»: crea un canale, carica viaticum.aab, accetta «Firma dell'app di Google Play», aggiungi almeno 12 tester (email Google) e manda loro il link di adesione.
6. Aspetta che almeno 12 tester restino iscritti per 14 giorni di fila, poi «Richiedi l'accesso alla produzione» e rispondi alle domande sul test.
7. Pubblica in produzione (revisione di solito da qualche ora a qualche giorno).

## Per gli aggiornamenti successivi
Ogni build crea un nuovo viaticum.aab con codice versione più alto: caricalo in un nuovo rilascio dello stesso canale.

## Da ricordare
- Custodisci la chiave di caricamento (upload-keystore): se la perdi si reimposta dall'assistenza Google, ma serve tempo.
- L'app per l'orologio (viaticum-orologio.apk) non è nell'AAB: per pubblicarla su Wear OS serve un canale «Wear OS» a parte, da fare dopo.
- Dichiarazioni di Play e privacy.html devono restare coerenti: se aggiungi un servizio esterno, aggiorna entrambe.
