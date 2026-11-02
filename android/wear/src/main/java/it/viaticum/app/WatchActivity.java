package it.viaticum.app;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Chronometer;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.google.android.gms.wearable.DataClient;
import com.google.android.gms.wearable.DataEvent;
import com.google.android.gms.wearable.DataEventBuffer;
import com.google.android.gms.wearable.DataItem;
import com.google.android.gms.wearable.DataItemBuffer;
import com.google.android.gms.wearable.DataMapItem;
import com.google.android.gms.wearable.Wearable;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.EnumMap;
import java.util.Locale;
import java.util.Map;

/* v295 Viaticum sull'orologio: prossima tappa con conto alla rovescia, le tappe dopo, il volo e la carta d'imbarco.
   I dati arrivano dall'app del telefono (Wearable Data Layer) ogni volta che si aggiornano i widget. */
public class WatchActivity extends Activity implements DataClient.OnDataChangedListener {
    static final String PATH = "/viaticum/snap";
    static final int GOLD = 0xFFFFE08A, MUTE = 0xB3FFFFFF, ACC = 0xFF8E1F26;
    JSONObject snap = null;
    LinearLayout root;
    ScrollView sv;
    boolean showingCode = false;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        sv = new ScrollView(this);
        sv.setBackgroundColor(Color.BLACK);
        sv.setFillViewport(true);
        root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setGravity(Gravity.CENTER_HORIZONTAL);
        int pad = dp(22);
        root.setPadding(pad, dp(28), pad, dp(40));
        sv.addView(root, new ScrollView.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        setContentView(sv);
        try { snap = new JSONObject(getSharedPreferences("via_watch", 0).getString("j", "")); } catch (Exception e) { snap = null; }
        draw();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Wearable.getDataClient(this).addListener(this);
        Wearable.getDataClient(this).getDataItems(Uri.parse("wear://*" + PATH)).addOnSuccessListener(buf -> { read(buf); buf.release(); });
        if (!showingCode) draw();
    }

    @Override
    protected void onPause() {
        super.onPause();
        Wearable.getDataClient(this).removeListener(this);
    }

    @Override
    public void onDataChanged(DataEventBuffer events) {
        for (DataEvent ev : events) {
            if (ev.getType() == DataEvent.TYPE_CHANGED && PATH.equals(ev.getDataItem().getUri().getPath())) take(ev.getDataItem());
        }
        events.release();
        if (!showingCode) draw();
    }

    void read(DataItemBuffer buf) {
        for (DataItem it : buf) if (PATH.equals(it.getUri().getPath())) take(it);
        if (!showingCode) draw();
    }

    void take(DataItem it) {
        try {
            String j = DataMapItem.fromDataItem(it).getDataMap().getString("j", "");
            JSONObject o = new JSONObject(j);
            if (snap == null || o.optLong("at") >= snap.optLong("at")) {
                snap = o;
                getSharedPreferences("via_watch", 0).edit().putString("j", j).apply();
            }
        } catch (Exception ignored) {}
    }

    int dp(float v) { return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, getResources().getDisplayMetrics())); }
    static String hm(long t) { return new SimpleDateFormat("H:mm", Locale.ITALY).format(new Date(t)); }

    TextView tv(String s, float sp, int color, boolean bold) {
        TextView t = new TextView(this);
        t.setText(s);
        t.setTextSize(TypedValue.COMPLEX_UNIT_SP, sp);
        t.setTextColor(color);
        t.setGravity(Gravity.CENTER);
        if (bold) t.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        root.addView(t, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        return t;
    }
    void gap(int h) { View v = new View(this); root.addView(v, new LinearLayout.LayoutParams(1, dp(h))); }
    void chrono(long target, String fmt) {
        Chronometer c = new Chronometer(this);
        c.setBase(SystemClock.elapsedRealtime() + (target - System.currentTimeMillis()));
        c.setCountDown(true);
        c.setFormat(fmt);
        c.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        c.setTextColor(GOLD);
        c.setGravity(Gravity.CENTER);
        c.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        root.addView(c, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        c.start();
    }
    TextView button(String s, View.OnClickListener l) {
        TextView t = new TextView(this);
        t.setText(s);
        t.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
        t.setTextColor(Color.WHITE);
        t.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        t.setGravity(Gravity.CENTER);
        t.setMinHeight(dp(48));
        t.setPadding(dp(14), dp(8), dp(14), dp(8));
        GradientDrawable g = new GradientDrawable();
        g.setColor(ACC);
        g.setCornerRadius(dp(24));
        t.setBackground(g);
        t.setOnClickListener(l);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.topMargin = dp(10);
        root.addView(t, lp);
        return t;
    }

    void draw() {
        showingCode = false;
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        WindowManager.LayoutParams wl = getWindow().getAttributes();
        wl.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE;
        getWindow().setAttributes(wl);
        root.removeAllViews();
        root.setBackgroundColor(Color.BLACK);
        sv.setBackgroundColor(Color.BLACK);
        long now = System.currentTimeMillis();
        if (snap == null || snap.optInt("none") == 1) {
            tv("Viaticum", 16, Color.WHITE, true);
            gap(6);
            tv(snap == null ? "Apri Viaticum sul telefono: le tappe arrivano qui da sole." : "Nessun viaggio in programma.", 13, MUTE, false);
            return;
        }
        String city = snap.optString("city");
        JSONObject f = snap.optJSONObject("fl");
        boolean flightSoon = f != null && f.optLong("arr") > now && f.optLong("dep") - now < 6 * 3600000L;
        JSONArray st = snap.optJSONArray("stops");
        JSONObject cur = null;
        int ci = -1;
        if (st != null) for (int i = 0; i < st.length(); i++) { JSONObject s = st.optJSONObject(i); if (s != null && s.optLong("t") + s.optInt("d") * 60000L > now) { cur = s; ci = i; break; } }

        if (flightSoon) drawFlight(f, now);
        if (cur != null) {
            if (flightSoon) gap(16);
            long t = cur.optLong("t"), e = t + cur.optInt("d") * 60000L;
            boolean on = now >= t;
            tv((on ? "ADESSO" : "PROSSIMA · " + hm(t)) + (city.isEmpty() ? "" : " · " + city.toUpperCase(Locale.ITALY)), 11, MUTE, true);
            gap(4);
            tv(cur.optString("n"), 18, Color.WHITE, true);
            gap(4);
            long target = on ? e : t;
            if (target - now < 3 * 3600000L) chrono(target, on ? "finisce tra %s" : "tra %s");
            else tv(on ? "fino alle " + hm(e) : "alle " + hm(t), 14, GOLD, true);
            int lm = cur.optInt("lm");
            if (!on && lm > 0) {
                long lv = t - lm * 60000L;
                gap(2);
                tv(("walk".equals(cur.optString("mo")) ? lm + " min a piedi" : lm + " min con i mezzi") + " · esci alle " + hm(lv), 12, MUTE, false);
            }
            if (st != null && ci + 1 < st.length()) {
                gap(12);
                tv("DOPO", 11, MUTE, true);
                for (int j = ci + 1; j < Math.min(st.length(), ci + 5); j++) {
                    JSONObject s = st.optJSONObject(j);
                    if (s == null) continue;
                    tv(hm(s.optLong("t")) + "  " + s.optString("n"), 13, Color.WHITE, false);
                }
            }
        } else if (!flightSoon) {
            tv(city.isEmpty() ? "Viaticum" : city, 16, Color.WHITE, true);
            gap(6);
            tv("Nessuna tappa in arrivo.", 13, MUTE, false);
        }
        if (!flightSoon && f != null && f.optLong("arr") > now) {
            gap(16);
            tv("VOLO · " + new SimpleDateFormat("d MMM", Locale.ITALY).format(new Date(f.optLong("dep"))), 11, MUTE, true);
            tv(route(f) + " · " + hm(f.optLong("dep")), 13, Color.WHITE, false);
            bpButton(f);
        }
    }

    static String route(JSONObject f) {
        String a = f.optString("from"), b = f.optString("to");
        return a.isEmpty() ? "Volo per " + b : b.isEmpty() ? "Ritorno da " + a : a + " → " + b;
    }

    void drawFlight(JSONObject f, long now) {
        long dep = f.optLong("dep"), arr = f.optLong("arr"), imb = f.optLong("imb");
        tv("VOLO" + (f.optString("num").isEmpty() ? "" : " · " + f.optString("num")), 11, MUTE, true);
        gap(4);
        tv(route(f), 18, Color.WHITE, true);
        gap(4);
        if (imb > 0 && now < imb) { tv("Imbarco alle " + hm(imb), 13, Color.WHITE, false); chrono(imb, "tra %s"); }
        else if (now < dep) { tv("Imbarco in corso", 13, Color.WHITE, false); chrono(dep, "decollo tra %s"); }
        else { tv("In volo", 13, Color.WHITE, false); chrono(arr, "atterri tra %s"); }
        bpButton(f);
    }

    void bpButton(JSONObject f) {
        JSONArray bp = f.optJSONArray("bp");
        if (bp == null || bp.length() == 0) return;
        for (int i = 0; i < bp.length(); i++) {
            final JSONObject x = bp.optJSONObject(i);
            if (x == null) continue;
            String who = x.optString("p"), seat = x.optString("s");
            String lab = "Carta d'imbarco" + (bp.length() > 1 && !who.isEmpty() ? " · " + who : "") + (seat.isEmpty() ? "" : " · " + seat);
            button(lab, v -> showCode(x));
        }
    }

    /* il codice a tutto schermo, bianco e luminoso, per il varco d'imbarco: un tocco per tornare */
    void showCode(JSONObject x) {
        showingCode = true;
        root.removeAllViews();
        root.setBackgroundColor(Color.WHITE);
        sv.setBackgroundColor(Color.WHITE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        WindowManager.LayoutParams wl = getWindow().getAttributes();
        wl.screenBrightness = 1f;
        getWindow().setAttributes(wl);
        int w = getResources().getDisplayMetrics().widthPixels;
        Bitmap b = code(x.optString("t"), x.optString("f"), (int) (w * 0.62f));
        ImageView iv = new ImageView(this);
        iv.setImageBitmap(b);
        iv.setAdjustViewBounds(true);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.topMargin = dp(10);
        root.addView(iv, lp);
        TextView t = tv((x.optString("p") + (x.optString("s").isEmpty() ? "" : " · posto " + x.optString("s"))).trim(), 12, Color.BLACK, true);
        t.setPadding(0, dp(6), 0, 0);
        root.setOnClickListener(v -> { root.setOnClickListener(null); draw(); });
        iv.setOnClickListener(v -> { root.setOnClickListener(null); draw(); });
    }

    static Bitmap code(String text, String fmt, int size) {
        try {
            BarcodeFormat bf = "aztec".equals(fmt) ? BarcodeFormat.AZTEC : "pdf417".equals(fmt) ? BarcodeFormat.PDF_417 : "data_matrix".equals(fmt) ? BarcodeFormat.DATA_MATRIX : BarcodeFormat.QR_CODE;
            Map<EncodeHintType, Object> h = new EnumMap<>(EncodeHintType.class);
            h.put(EncodeHintType.MARGIN, 1);
            int w = size, hh = bf == BarcodeFormat.PDF_417 ? size / 3 : size;
            BitMatrix m = new MultiFormatWriter().encode(text, bf, w, hh, h);
            Bitmap b = Bitmap.createBitmap(m.getWidth(), m.getHeight(), Bitmap.Config.RGB_565);
            for (int y = 0; y < m.getHeight(); y++) for (int x = 0; x < m.getWidth(); x++) b.setPixel(x, y, m.get(x, y) ? Color.BLACK : Color.WHITE);
            return b;
        } catch (Exception e) {
            return Bitmap.createBitmap(1, 1, Bitmap.Config.RGB_565);
        }
    }
}
