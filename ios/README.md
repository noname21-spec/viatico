# Viaticum per iPhone

L'app per iPhone è la stessa pagina della versione web, dentro un'app Capacitor (come la versione Android).
Serve un Mac con Xcode e Node 22.

1. `bash ios/prepara.sh` (facoltativo: `bash ios/prepara.sh 1.0.1 2` per versione e numero di build).
   Crea `ios-app/` con il progetto Xcode, l'icona, il link di ritorno dell'accesso (`it.viaticum.app://auth`)
   e le frasi per i permessi di posizione e fotocamera.
2. Apri il progetto che lo script indica alla fine (`App.xcworkspace` o `App.xcodeproj`), scegli il tuo Team in Signing & Capabilities.
3. Prova su un iPhone collegato, poi Product › Archive › Distribute App › App Store Connect.

Differenze rispetto ad Android: niente widget e niente «Offrimi un caffè»; accesso con Google e Apple
dal browser di sistema; promemoria con le notifiche locali di iOS.
