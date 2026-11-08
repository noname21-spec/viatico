# Sezione «Sicurezza dei dati» · risposte per Play Console

Aggiornata l'8 novembre 2026 sulla versione 1.0.70. Le risposte corrispondono a ciò che l'app fa davvero e alla pagina privacy.html: se cambia qualcosa nell'app, vanno aggiornate tutte e due.

## Domande generali
- L'app raccoglie o condivide dati degli utenti? **Sì**
- Tutti i dati sono crittografati in transito? **Sì** (tutte le richieste usano HTTPS)
- Puoi richiedere la cancellazione dei dati? **Sì** (impostazioni dell'app, oppure email)
- URL per la cancellazione dell'account: https://noname21-spec.github.io/viatico/privacy.html#cancellazione
- Metodi di accesso: Google, Apple (facoltativi; l'app funziona senza account)

## Dati raccolti

| Categoria Play | Tipo | Raccolti | Condivisi | Facoltativo | Scopo |
|---|---|---|---|---|---|
| Informazioni personali | Indirizzo email | Sì, solo se accedi | No | Sì | Gestione dell'account |
| Informazioni personali | ID utente | Sì, solo se accedi | No | Sì | Gestione dell'account, funzionalità dell'app (sincronizzazione) |
| Attività nell'app | Altri contenuti generati dall'utente (viaggi, spese, liste) | Sì, solo se accedi | No | Sì | Funzionalità dell'app (sincronizzazione) |
| Informazioni e prestazioni dell'app | Log degli arresti anomali | Sì | No | Sì (interruttore «Rapporti anonimi sugli errori») | Analisi |
| Posizione | Posizione precisa | Vedi nota | Vedi nota | Sì | Funzionalità dell'app |

Nota sulla posizione: la posizione resta sul telefono. Solo se tocchi «Percorso a piedi», le coordinate tua e della tappa vanno al servizio di percorsi di OpenStreetMap per disegnare il tragitto. Per prudenza dichiarare: **Posizione precisa → Condivisa → Funzionalità dell'app → Facoltativa**, non raccolta da te (non viene salvata).

Nota sui rapporti di errore: contengono solo tipo di errore, punto del codice, versione e piattaforma (sito, PWA, Android); nessun dato del viaggio, nessuna email, non collegati all'account. Sono attivi per impostazione predefinita e si spengono dalle impostazioni.

Dati NON raccolti: nome, telefono, indirizzo, dati finanziari, salute, messaggi, foto e video (le foto dei biglietti restano sul telefono), audio, file, calendario, contatti, cronologia web, identificatori pubblicitari.

## Servizi esterni usati dall'app
- Supabase: account, sincronizzazione (solo con accesso), rapporti di errore
- Open-Meteo: meteo (coordinate della città, non dell'utente)
- OpenStreetMap: tessere della mappa, ricerca luoghi (Nominatim, Overpass), percorsi a piedi
- Frankfurter: cambio valuta (solo il codice della valuta)
- Google / Apple: accesso facoltativo

## Altre dichiarazioni in Play Console
- Annunci: **No**
- Acquisti in app: **No**
- Accesso all'app per la revisione: **tutte le funzioni sono disponibili senza accesso**
- Pubblico di destinazione: 18 anni e oltre (non rivolta ai bambini)
- App di notizie: No · App sanitaria: No · App governativa: No · Servizi finanziari: No
- Classificazione dei contenuti (questionario IARC): categoria «Tutte le altre app»; nessuna violenza, sesso, linguaggio volgare, droghe, gioco d'azzardo; nessuna interazione tra utenti; nessuna condivisione della posizione con altri utenti. Risultato atteso: PEGI 3.
- Autorizzazioni speciali: posizione (solo in uso, per la mappa), notifiche (tappa in corso), sveglie esatte (promemoria delle tappe; se Play lo chiede: «promemoria a orario scelto dall'utente»).
