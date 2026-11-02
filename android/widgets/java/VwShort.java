package it.viaticum.app;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.net.Uri;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/* v292 scorciatoie dell'icona (tenendo premuta l'icona di Viaticum): aggiornate insieme ai widget */
public final class VwShort {
    private VwShort() {}

    static Intent act(Context c, String a) {
        return new Intent(c, MainActivity.class).setAction("it.viaticum.app.ACT_" + a).putExtra("via_act", a).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
    }
    static ShortcutInfo sc(Context c, String id, String shortL, String longL, String icon, Intent in) {
        return new ShortcutInfo.Builder(c, id).setShortLabel(shortL).setLongLabel(longL).setIcon(Icon.createWithBitmap(VwUtil.ico(c, icon, 48, VwUtil.TA))).setIntent(in).build();
    }

    public static void update(Context c) {
        if (Build.VERSION.SDK_INT < 25) return;
        try {
            ShortcutManager sm = c.getSystemService(ShortcutManager.class);
            if (sm == null) return;
            JSONObject o = VwUtil.snap(c);
            VwUtil.theme(o);
            long now = System.currentTimeMillis();
            List<ShortcutInfo> L = new ArrayList<>();
            boolean none = VwUtil.noTrip(o);
            /* prossima tappa: le indicazioni nelle mappe, altrimenti l'app */
            JSONArray st = o.optJSONArray("stops");
            int i = none ? -1 : VwUtil.curIdx(st, now, false);
            JSONObject s = i >= 0 ? st.optJSONObject(i) : null;
            if (s != null && s.optInt("ret") != 1 && s.optJSONArray("ll") != null) {
                String dest = s.optString("q", "");
                JSONArray ll = s.optJSONArray("ll");
                if (dest.isEmpty()) dest = ll.optDouble(0) + "," + ll.optDouble(1);
                String mode = "walk".equals(s.optString("mo")) || s.optInt("lm") <= 12 ? "walking" : "transit";
                Intent mi = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.google.com/maps/dir/?api=1&destination=" + URLEncoder.encode(dest, "UTF-8") + "&travelmode=" + mode));
                L.add(sc(c, "next", "Prossima tappa", "Portami a " + s.optString("n"), "pin", mi));
            } else {
                Intent oi = c.getPackageManager().getLaunchIntentForPackage(c.getPackageName());
                if (oi == null) oi = new Intent(c, MainActivity.class);
                oi.setAction(Intent.ACTION_MAIN);
                L.add(sc(c, "next", "Prossima tappa", "Apri la giornata", "pin", oi));
            }
            /* carta d'imbarco del prossimo volo, se salvata; altrimenti aggiungi biglietti */
            JSONObject f = none ? null : VwUtil.nextFlight(o, now);
            JSONArray bp = f != null ? f.optJSONArray("bp") : null;
            if (bp != null && bp.length() > 0) {
                JSONArray l = new JSONArray();
                for (int j = 0; j < bp.length(); j++) {
                    JSONObject x = bp.optJSONObject(j);
                    if (x == null) continue;
                    JSONObject y = new JSONObject();
                    y.put("t", x.optString("t")); y.put("f", x.optString("f"));
                    y.put("n", "Carta d'imbarco");
                    String who = x.optString("p"), seat = x.optString("s");
                    y.put("s", who + (seat.isEmpty() ? "" : (who.isEmpty() ? "" : " · ") + "posto " + seat));
                    l.put(y);
                }
                Intent qi = new Intent(c, VwQrActivity.class).setAction(Intent.ACTION_VIEW).putExtra("list", l.toString()).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                L.add(sc(c, "bp", "Carta d'imbarco", "Mostra la carta d'imbarco", "plane", qi));
            } else L.add(sc(c, "bp", "Biglietti", "Aggiungi biglietti o carte d'imbarco", "ticket", act(c, "tix")));
            L.add(sc(c, "spend", "Aggiungi spesa", "Aggiungi una spesa", "plus", act(c, "spend")));
            L.add(sc(c, "late", "Sono in ritardo", "Sono in ritardo: sposta le tappe", "clock", act(c, "late")));
            int max = Math.min(4, sm.getMaxShortcutCountPerActivity());
            sm.setDynamicShortcuts(L.subList(0, Math.min(max, L.size())));
        } catch (Throwable ignored) {}
    }
}
