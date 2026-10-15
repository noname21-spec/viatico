# Checklist di pubblicazione · Viaticum

## A cura tua
- [ ] Aprire l'account sviluppatore Google Play (25 €, personale) e completare la verifica dell'identità
- [ ] Aggiungere i secret su GitHub (vedi sotto) per ottenere il file .aab firmato
- [ ] Raccogliere 14–15 tester con account Google (serve che almeno 12 restino per 14 giorni di fila)
- [ ] Creare l'app in Play Console: nome «Viaticum: guida di viaggio», lingua italiana, app gratuita
- [ ] Compilare: scheda (testi in play/scheda-it.md), sicurezza dei dati (play/sicurezza-dati.md), classificazione dei contenuti, pubblico target (adulti), dichiarazione sugli annunci (nessuno)
- [ ] Caricare l'AAB nel test chiuso, invitare i tester, attendere 14 giorni
- [ ] Richiedere l'accesso alla produzione

## Secret da aggiungere su GitHub
Repository → Settings → Secrets and variables → Actions → New repository secret
- UPLOAD_KEYSTORE_B64 = contenuto del file upload-keystore.b64
- UPLOAD_KEYSTORE_PASSWORD = la password nel file upload-password.txt
Poi: Actions → «Android APK» → Run workflow. L'AAB firmato compare in Releases (android-latest) come viaticum.aab.

## Rischi da controllare
- Mappa offline: tolto il download anticipato delle tessere di OpenStreetMap (vietato dalla loro politica). Resta la mappa online. Più avanti: tessere proprie (PMTiles) o un fornitore che la consente.
- La chiave di caricamento va custodita: con «Play App Signing» Google firma l'app, e se la perdi si può reimpostare dall'assistenza Google.
- Le dichiarazioni di Play (dati, privacy) devono restare coerenti con la pagina privacy.html.
