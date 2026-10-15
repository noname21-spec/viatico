# Viaticum per Android

L'app Android è un involucro (Capacitor) attorno alla stessa pagina `index.html` della versione web.
L'APK si costruisce da solo con GitHub Actions (`.github/workflows/android.yml`):
- a mano: scheda Actions, "Android APK", Run workflow;
- oppure ogni volta che cambia qualcosa dentro `android/` (basta modificare questo file).

Il file finito è in Releases, voce `android-latest`, `viaticum.apk`.

`viaticum.keystore` firma l'APK per l'installazione diretta (stessa firma a ogni versione, così si aggiorna sopra la precedente).
Per il Play Store si usa una chiave di caricamento separata, non questa.

