#!/bin/bash
# Prepara il progetto Xcode di Viaticum per l'App Store. Da lanciare su un Mac con Xcode e Node 22:
#   bash ios/prepara.sh
# Crea la cartella ios-app/ (non va su GitHub) con l'app Capacitor, le icone e le impostazioni.
# Poi: open ios-app/ios/App/App.xcodeproj, scegli il Team, Product › Archive.
set -euo pipefail
cd "$(dirname "$0")/.."
RADICE="$PWD"
VERSIONE="${1:-1.0.0}"
BUILD="${2:-1}"

echo "1/6 Contenuto web"
rm -rf ios-app && mkdir -p ios-app/www
cp index.html sw.js manifest.webmanifest privacy.html supporto.html pagine.css pagine.js icon-*.png apple-touch-icon.png ios-app/www/
cp -r lib c ios-app/www/
cp ios/package.json ios/capacitor.config.json ios-app/
mkdir -p ios-app/assets && cp ios/assets/icon-only.png ios-app/assets/icon-only.png

echo "2/6 Capacitor"
cd ios-app
npm install
npx cap add ios
npx cap sync ios

echo "3/6 Icone e schermata d'avvio"
npx @capacitor/assets generate --ios --iconBackgroundColor '#1F3590' --splashBackgroundColor '#14224F' --splashBackgroundColorDark '#14224F'

echo "4/6 Info.plist"
P="ios/App/App/Info.plist"
PB=/usr/libexec/PlistBuddy
set_or_add () { $PB -c "Set :$1 $3" "$P" 2>/dev/null || $PB -c "Add :$1 $2 $3" "$P"; }
set_or_add CFBundleDisplayName string "Viaticum"
set_or_add ITSAppUsesNonExemptEncryption bool false
set_or_add NSLocationWhenInUseUsageDescription string "Viaticum usa la posizione solo per mostrarti dove sei sulla mappa e, se lo chiedi, il percorso a piedi verso la tappa."
set_or_add NSCameraUsageDescription string "Per fotografare biglietti e carte d'imbarco da salvare nel viaggio."
set_or_add NSPhotoLibraryUsageDescription string "Per scegliere le foto di biglietti e carte d'imbarco da salvare nel viaggio."
# ritorno dall'accesso con Google o Apple: it.viaticum.app://auth
$PB -c "Delete :CFBundleURLTypes" "$P" 2>/dev/null || true
$PB -c "Add :CFBundleURLTypes array" "$P"
$PB -c "Add :CFBundleURLTypes:0 dict" "$P"
$PB -c "Add :CFBundleURLTypes:0:CFBundleURLName string it.viaticum.app" "$P"
$PB -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes array" "$P"
$PB -c "Add :CFBundleURLTypes:0:CFBundleURLSchemes:0 string it.viaticum.app" "$P"
# solo verticale su iPhone
$PB -c "Delete :UISupportedInterfaceOrientations" "$P" 2>/dev/null || true
$PB -c "Add :UISupportedInterfaceOrientations array" "$P"
$PB -c "Add :UISupportedInterfaceOrientations:0 string UIInterfaceOrientationPortrait" "$P"

echo "5/6 Versione $VERSIONE ($BUILD), solo iPhone"
PJ="ios/App/App.xcodeproj/project.pbxproj"
sed -i '' -E "s/MARKETING_VERSION = [^;]+;/MARKETING_VERSION = $VERSIONE;/g; s/CURRENT_PROJECT_VERSION = [^;]+;/CURRENT_PROJECT_VERSION = $BUILD;/g; s/TARGETED_DEVICE_FAMILY = \"?[0-9,]+\"?;/TARGETED_DEVICE_FAMILY = 1;/g" "$PJ"

echo "6/6 Fatto"
if [ -d "ios/App/App.xcworkspace" ]; then PROG="$RADICE/ios-app/ios/App/App.xcworkspace"; else PROG="$RADICE/ios-app/ios/App/App.xcodeproj"; fi
echo "Apri il progetto:  open \"$PROG\""
echo "In Xcode: App › Signing & Capabilities › Team, poi Product › Archive › Distribute App › App Store Connect."
