package it.viaticum.app;

import android.content.Context;

import com.google.android.gms.wearable.PutDataMapRequest;
import com.google.android.gms.wearable.PutDataRequest;
import com.google.android.gms.wearable.Wearable;

import org.json.JSONArray;
import org.json.JSONObject;

/* v295 manda all'orologio (app Viaticum per Wear OS) le prossime tappe e il volo, insieme ai widget */
public final class VwWear {
    private VwWear() {}
    static String last = "";

    public static void push(Context c) {
        try {
            JSONObject o = VwUtil.snap(c), w = new JSONObject();
            long now = System.currentTimeMillis();
            if (VwUtil.noTrip(o)) w.put("none", 1);
            else {
                w.put("city", o.optString("city"));
                JSONArray st = o.optJSONArray("stops"), out = new JSONArray();
                for (int i = 0; i < st.length() && out.length() < 12; i++) {
                    JSONObject s = st.optJSONObject(i);
                    if (s == null || s.optLong("t") + s.optInt("d") * 60000L <= now || s.optLong("t") > now + 36 * 3600000L) continue;
                    JSONObject y = new JSONObject();
                    y.put("n", s.optString("n")); y.put("t", s.optLong("t")); y.put("d", s.optInt("d"));
                    y.put("lm", s.optInt("lm")); y.put("mo", s.optString("mo"));
                    out.put(y);
                }
                w.put("stops", out);
                JSONObject f = VwUtil.nextFlight(o, now);
                if (f != null) {
                    JSONObject y = new JSONObject();
                    for (String k : new String[]{"from", "to", "num", "k"}) y.put(k, f.optString(k));
                    for (String k : new String[]{"dep", "arr", "imb"}) y.put(k, f.optLong(k));
                    if (f.optJSONArray("bp") != null) y.put("bp", f.optJSONArray("bp"));
                    w.put("fl", y);
                }
            }
            String body = w.toString();
            if (body.equals(last)) return;
            last = body;
            w.put("at", now);
            PutDataMapRequest r = PutDataMapRequest.create("/viaticum/snap");
            r.getDataMap().putString("j", w.toString());
            r.getDataMap().putLong("at", now);
            PutDataRequest pr = r.asPutDataRequest().setUrgent();
            Wearable.getDataClient(c).putDataItem(pr);
        } catch (Throwable ignored) {}
    }
}
