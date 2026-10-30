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
for c, k in (("Next", "next"), ("Spend", "spend"), ("Map", "map"), ("Pass", "pass"), ("Ticket", "ticket"), ("Transit", "transit"), ("Board", "board"), ("Day", "day"), ("Food", "food"), ("Debts", "debts"), ("Fx", "fx")):
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
        <activity android:name=".VwFxActivity" android:exported="false" android:excludeFromRecents="true" android:taskAffinity="it.viaticum.app.fx" android:theme="@android:style/Theme.Translucent.NoTitleBar" android:windowSoftInputMode="stateVisible|adjustResize" />"""
i = s.rindex("</application>")
s = s[:i] + rec + "\n    " + s[i:]
open(p, "w").write(s)
print("widget ok:", len(glob.glob(os.path.join(jd, "Vw*.java"))), "classi")
