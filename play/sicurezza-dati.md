# Sezione «Sicurezza dei dati» · bozza di risposte

Verifica ogni voce prima dell'invio: le dichiarazioni devono corrispondere a ciò che l'app fa davvero.

## Domande generali
- L'app raccoglie o condivide dati degli utenti? **Sì**
- Tutti i dati sono cifrati in transito? **Sì** (tutte le richieste usano HTTPS)
- Puoi richiedere la cancellazione dei dati? **Sì** (impostazioni dell'app, oppure email; vedi privacy.html#cancellazione)
- URL della pagina per la cancellazione dell'account: https://noname21-spec.github.io/viatico/privacy.html#cancellazione
- Segue la politica «Famiglie»? **No** (app per tutti, non rivolta ai bambini)

## Dati raccolti

| Categoria | Tipo | Raccolti | Condivisi | Scopo | Facoltativo |
|---|---|---|---|---|---|
| Informazioni personali | Indirizzo email | Sì, solo se accedi con Google o Apple | No | Gestione dell'account | Sì |
| Informazioni personali | ID utente | Sì, solo con l'account | No | Gestione dell'account, sincronizzazione | Sì |
| Attività nell'app | Altri contenuti generati dall'utente (viaggi, spese, liste) | Sì, solo con l'account attivo | No | Funzionalità dell'app (sincronizzazione) | Sì |
| Posizione | Posizione approssimativa/precisa | **No** (resta sul telefono, non viene inviata a me) | No | – | – |

Nota sulla posizione: se tocchi «Percorso a piedi», le coordinate dei due punti vengono inviate a un servizio di percorsi di OpenStreetMap. Google chiede di dichiarare come «condivisione» l'invio a terzi anche se serve a una funzione dell'app. Scelta consigliata: dichiarare **Posizione → Condivisa con terzi → Funzionalità dell'app → Facoltativa**, per essere prudenti.

## Servizi di terze parti che ricevono dati
- Supabase (sincronizzazione, solo con account)
- Open-Meteo (meteo: coordinate della città)
- OpenStreetMap (tessere, percorsi a piedi, ricerca luoghi)
- Google Traduttore (solo se scegli una lingua diversa dall'italiano)
- Google / Apple (solo per l'accesso)

## Altre dichiarazioni
- Pubblicità: **No**
- Acquisti in app: **No**
- Accesso richiesto per usare l'app: **No** (l'account è facoltativo)
- Classificazione dei contenuti: nessuna violenza, contenuti sessuali, giochi d'azzardo o linguaggio volgare; l'app non è un gioco. Risultato atteso: PEGI 3 / età 3+.
