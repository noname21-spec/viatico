# aggiunge al manifest il link profondo it.viaticum.app://auth (ritorno dall'accesso Google/Apple)
p = "app/src/main/AndroidManifest.xml"
s = open(p).read()
f = """
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="it.viaticum.app" android:host="auth" />
            </intent-filter>"""
i = s.index("</intent-filter>") + len("</intent-filter>")
open(p, "w").write(s[:i] + f + s[i:])
print("manifest ok")
