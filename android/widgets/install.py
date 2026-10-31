# copia i widget nel progetto Android generato da Capacitor e li registra nel manifest
import os, shutil, glob
here = os.path.dirname(os.path.abspath(__file__))
app = "app/src/main"
jd = os.path.join(app, "java/it/viaticum/app")
os.makedirs(jd, exist_ok=True)
for f in glob.glob(os.path.join(here, "java", "*.java")):
    shutil.copy(f, jd)
for f in glob.glob(os.path.join(here, "res", "*", "*")):
    d = os.path.join(app, "res", os.path.basename(os.path.dirname(f)))
    os.makedirs(d, exist_ok=True)
    shutil.copy(f, d)
p = os.path.join(app, "AndroidManifest.xml")
s = open(p).read()
rec = ""
for c, k in (("Next", "next"), ("Spend", "spend"), ("Map", "map"), ("Pass", "pass"), ("Ticket", "ticket"), ("Transit", "transit"), ("Board", "board"), ("Day", "day"), ("Food", "food"), ("Debts", "debts"), ("Fx", "fx"), ("NextS", "next_s"), ("SpendS", "spend_s"), ("FxS", "fx_s"), ("BoardS", "board_s")):
    rec += f"""
        <receiver android:name=".Vw{c}" android:exported="true">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
                <action android:name="android.intent.action.TIME_SET" />
                <action android:name="android.intent.action.TIMEZONE_CHANGED" />
            </intent-filter>
            <meta-data android:name="android.appwidget.provider" android:resource="@xml/vw_{k}_info" />
        </receiver>"""
rec += """
        <activity android:name=".VwQrActivity" android:exported="false" android:excludeFromRecents="true" android:taskAffinity="it.viaticum.app.qr" android:theme="@android:style/Theme.DeviceDefault.Light.NoActionBar" android:screenOrientation="portrait" />"""
rec += """
        <activity android:name=".VwFxActivity" android:exported="false" android:excludeFromRecents="true" android:taskAffinity="it.viaticum.app.fx" android:theme="@android:style/Theme.Translucent.NoTitleBar" android:windowSoftInputMode="stateVisible|adjustResize" />"""
# v286 «Condividi con Viaticum»: biglietti e carte d'imbarco (foto o PDF) da email, file e altre app
if "android.intent.action.SEND" not in s:
    share = """
            <intent-filter>
                <action android:name="android.intent.action.SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="image/*" />
                <data android:mimeType="application/pdf" />
                <data android:mimeType="text/plain" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.SEND_MULTIPLE" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="image/*" />
                <data android:mimeType="application/pdf" />
            </intent-filter>"""
    j = s.index("android.intent.category.LAUNCHER")
    j = s.index("</intent-filter>", j) + len("</intent-filter>")
    s = s[:j] + share + s[j:]
if "POST_NOTIFICATIONS" not in s:
    s = s.replace("</manifest>", '    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />\n</manifest>')
i = s.rindex("</application>")
s = s[:i] + rec + "\n    " + s[i:]
open(p, "w").write(s)
print("widget ok:", len(glob.glob(os.path.join(jd, "Vw*.java"))), "classi")

# ZXing per disegnare i codici dei biglietti nei widget
g = "app/build.gradle"
gs = open(g).read()
if "com.google.zxing:core" not in gs:
    gs = gs.replace("dependencies {", "dependencies {\n    implementation 'com.google.zxing:core:3.5.3'", 1)
    open(g, "w").write(gs)
print("zxing ok")
