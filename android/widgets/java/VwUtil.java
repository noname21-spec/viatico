package it.viaticum.app;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.Paint;
import android.graphics.LinearGradient;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Shader;
import android.graphics.RectF;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.SystemClock;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Random;

/* disegno e dati dei widget di Viaticum */
public final class VwUtil {
    public static final String PREFS = "via_widgets", KEY = "snap", TICK = "it.viaticum.app.WIDGET_TICK";
    static final Class<?>[] ALL = {VwNext.class, VwSpend.class, VwMap.class, VwPass.class, VwTicket.class, VwTransit.class, VwBoard.class, VwDay.class, VwFood.class, VwDebts.class, VwFx.class, VwNextS.class, VwSpendS.class, VwFxS.class, VwBoardS.class};
    private VwUtil() {}
    /* colori del viaggio in programma più vicino */
    static int TA = 0xFF0A6F95, TB = 0xFF0E3B52;
    static void theme(JSONObject o) {
        TA = 0xFF0A6F95; TB = 0xFF0E3B52;
        JSONObject t = o.optJSONObject("theme");
        if (t == null) return;
        try { TA = Color.parseColor(t.optString("a")); } catch (Exception ignored) {}
        try { TB = Color.parseColor(t.optString("b")); } catch (Exception ignored) { TB = mix(TA, 0xFF000000, .35f); }
    }
    static int mix(int a, int b, float f) {
        return Color.rgb(Math.round(Color.red(a) * (1 - f) + Color.red(b) * f), Math.round(Color.green(a) * (1 - f) + Color.green(b) * f), Math.round(Color.blue(a) * (1 - f) + Color.blue(b) * f));
    }
    /* sfondo: sfumatura nei colori della città, un velo scuro a sinistra per il testo e un cerchio chiaro in alto a destra */
    static Bitmap bg(Context c, int w, int h, float dark) {
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        float r = Build.VERSION.SDK_INT >= 31 ? 0 : 22 * dens(c) * Math.min(1f, 520f / Math.max(w / dens(c) * dens(c), h));
        int a = mix(TA, 0xFF000000, dark), bb = mix(TB, 0xFF000000, dark);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setShader(new LinearGradient(0, 0, w, h * .6f, a, bb, Shader.TileMode.CLAMP));
        RectF rr = new RectF(0, 0, w, h);
        k.drawRoundRect(rr, r, r, p);
        p.setShader(new LinearGradient(0, 0, w * .7f, 0, 0x2E000000, 0x00000000, Shader.TileMode.CLAMP));
        k.drawRoundRect(rr, r, r, p);
        p.setShader(null);
        p.setColor(0x14FFFFFF);
        k.save();
        Path clip = new Path();
        clip.addRoundRect(rr, r, r, Path.Direction.CW);
        k.clipPath(clip);
        float cr = Math.min(w, h) * .75f;
        k.drawCircle(w - cr * .25f, -cr * .3f, cr, p);
        p.setColor(0x0DFFFFFF);
        k.drawCircle(w * .1f, h * 1.15f, cr * .6f, p);
        k.restore();
        return b;
    }
    static void skinPx(Context c, RemoteViews v, int pw, int ph, float dark) {
        float k = Math.min(1f, 520f / Math.max(pw, ph));
        v.setImageViewBitmap(R.id.bgimg, bg(c, Math.max(60, Math.round(pw * k)), Math.max(60, Math.round(ph * k)), dark));
    }
    static void skin(Context c, AppWidgetManager m, RemoteViews v, int id, int dw, int dh, float dark) {
        int[] sz = m != null ? sizePx(c, m, id, dw, dh) : new int[]{Math.round(dw * dens(c)), Math.round(dh * dens(c))};
        float k = Math.min(1f, 520f / Math.max(sz[0], sz[1]));
        v.setImageViewBitmap(R.id.bgimg, bg(c, Math.max(60, Math.round(sz[0] * k)), Math.max(60, Math.round(sz[1] * k)), dark));
    }

    /* ---------- dati ---------- */
    static JSONObject snap(Context c) {
        try { return new JSONObject(c.getSharedPreferences(PREFS, 0).getString(KEY, "{}")); } catch (Exception e) { return new JSONObject(); }
    }
    static boolean noTrip(JSONObject o) { return o.optInt("none") == 1 || o.optJSONArray("stops") == null || o.optJSONArray("stops").length() == 0; }
    static String hm(long t) { return new SimpleDateFormat("H:mm", Locale.ITALY).format(new Date(t)); }
    static String eur(double a) {
        String s = String.format(Locale.ITALY, a == Math.rint(a) ? "%.0f" : "%.2f", a);
        return s + " €";
    }
    static String inTxt(long ms) {
        long m = Math.max(0, ms / 60000);
        if (m < 60) return "tra " + m + " min";
        if (m < 24 * 60) { long h = m / 60, r = m % 60; return "tra " + h + " h" + (r > 0 ? " " + r + " min" : ""); }
        long d = Math.round(m / 1440.0);
        return d <= 1 ? "domani" : "tra " + d + " giorni";
    }
    /* tappa in corso o prossima: indice nell'elenco, -1 se il viaggio è finito */
    static int curIdx(JSONArray st, long now, boolean skipMeals) {
        for (int i = 0; i < st.length(); i++) {
            JSONObject s = st.optJSONObject(i);
            if (s == null || (skipMeals && s.optInt("meal") == 1)) continue;
            long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
            if (e > now) return i;
        }
        return -1;
    }

    /* ---------- aggiornamento ---------- */
    public static void updateAll(Context c) {
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        for (Class<?> k : ALL) {
            int[] ids = m.getAppWidgetIds(new ComponentName(c, k));
            String kind = kindOf(k);
            for (int id : ids) render(c, m, id, kind);
        }
        schedule(c);
    }
    static String kindOf(Class<?> k) {
        if (k == VwNext.class) return "next";
        if (k == VwSpend.class) return "spend";
        if (k == VwMap.class) return "map";
        if (k == VwPass.class) return "pass";
        if (k == VwTicket.class) return "ticket";
        if (k == VwBoard.class) return "board";
        if (k == VwDay.class) return "day";
        if (k == VwFood.class) return "food";
        if (k == VwDebts.class) return "debts";
        if (k == VwFx.class) return "fx";
        if (k == VwNextS.class) return "next_s";
        if (k == VwSpendS.class) return "spend_s";
        if (k == VwFxS.class) return "fx_s";
        if (k == VwBoardS.class) return "board_s";
        return "transit";
    }
    /* il prossimo cambio (inizio o fine di una tappa), al massimo fra 15 minuti */
    public static void schedule(Context c) {
        long now = System.currentTimeMillis(), when = now + 15 * 60000L;
        JSONArray st = snap(c).optJSONArray("stops");
        if (st != null) for (int i = 0; i < st.length(); i++) {
            JSONObject s = st.optJSONObject(i);
            if (s == null) continue;
            long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
            if (t > now + 30000 && t < when) when = t;
            if (e > now + 30000 && e < when) when = e;
        }
        JSONArray fl = snap(c).optJSONArray("flights");
        if (fl != null) for (int i = 0; i < fl.length(); i++) {
            JSONObject f = fl.optJSONObject(i);
            if (f == null) continue;
            for (String k : new String[]{"imb", "dep", "arr"}) { long t = f.optLong(k); if (t > now + 30000 && t < when) when = t; }
        }
        try {
            AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
            Intent i = new Intent(c, VwNext.class).setAction(TICK);
            PendingIntent pi = PendingIntent.getBroadcast(c, 7, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
            am.set(AlarmManager.RTC, when + 1000, pi);
        } catch (Exception ignored) {}
    }

    static PendingIntent openApp(Context c, int req) {
        Intent i = c.getPackageManager().getLaunchIntentForPackage(c.getPackageName());
        if (i == null) i = new Intent(c, MainActivity.class);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(c, req, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }
    static PendingIntent maps(Context c, int req, JSONObject s) {
        String dest = s.optString("q", "");
        JSONArray ll = s.optJSONArray("ll");
        if (dest.isEmpty() && ll != null) dest = ll.optDouble(0) + "," + ll.optDouble(1);
        String mode = "walk".equals(s.optString("mo")) || s.optInt("lm") <= 12 ? "walking" : "transit";
        String u;
        try { u = "https://www.google.com/maps/dir/?api=1&destination=" + URLEncoder.encode(dest, "UTF-8") + "&travelmode=" + mode; }
        catch (Exception e) { u = "https://www.google.com/maps"; }
        Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(u)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        return PendingIntent.getActivity(c, req, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }
    static int col(Context c, int id) { return Build.VERSION.SDK_INT >= 23 ? c.getColor(id) : c.getResources().getColor(id); }
    static float dens(Context c) { return c.getResources().getDisplayMetrics().density; }
    /* misura del widget in pixel (larghezza, altezza) */
    static int[] sizePx(Context c, AppWidgetManager m, int id, int defW, int defH) {
        Bundle o = m.getAppWidgetOptions(id);
        int w = o != null ? o.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, defW) : defW;
        int h = o != null ? o.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT, defH) : defH;
        if (w <= 0) w = defW;
        if (h <= 0) h = defH;
        float d = dens(c);
        int pw = Math.round(w * d), ph = Math.round(h * d);
        float k = Math.min(1f, 900f / Math.max(pw, ph));
        return new int[]{Math.max(80, Math.round(pw * k)), Math.max(80, Math.round(ph * k))};
    }
    static RemoteViews rowB(Context c, String t) {
        RemoteViews r = new RemoteViews(c.getPackageName(), R.layout.vw_row_b);
        r.setTextViewText(R.id.row_t, t);
        return r;
    }
    static RemoteViews row(Context c, String t) {
        RemoteViews r = new RemoteViews(c.getPackageName(), R.layout.vw_row);
        r.setTextViewText(R.id.row_t, t);
        return r;
    }
    static void chrono(RemoteViews v, int id, long target, String fmt) {
        long base = SystemClock.elapsedRealtime() + (target - System.currentTimeMillis());
        v.setChronometer(id, base, fmt, true);
        if (Build.VERSION.SDK_INT >= 24) v.setChronometerCountDown(id, true);
    }

    public static void render(Context c, AppWidgetManager m, int id, String kind) {
        RemoteViews v;
        try {
            JSONObject o = snap(c);
            theme(o);
            boolean sm = kind.endsWith("_s");
            String base = sm ? kind.substring(0, kind.length() - 2) : kind;
            if (!sm && !"map".equals(base)) { Bundle op = m.getAppWidgetOptions(id); int wdp = op != null ? op.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 250) : 250; if (wdp > 0 && wdp < 190) sm = true; }
            if (sm) { RemoteViews sv = small(c, o, id, base); if (sv != null) { int[] sz = sizePx(c, m, id, 110, 110); skinPx(c, sv, sz[0], sz[1], "transit".equals(base) ? .45f : 0f); m.updateAppWidget(id, sv); return; } }
            kind = base;
            switch (kind) {
                case "next": v = next(c, o, id); break;
                case "spend": v = spend(c, o, id); break;
                case "map": v = map(c, m, o, id); break;
                case "pass": v = pass(c, m, o, id); break;
                case "ticket": v = ticket(c, o, id); break;
                case "board": v = board(c, o, id); break;
                case "day": v = day(c, o, id); break;
                case "food": v = food(c, o, id); break;
                case "debts": v = debts(c, o, id); break;
                case "fx": v = fx(c, o, id); break;
                default: v = transit(c, m, o, id); break;
            }
        } catch (Exception e) {
            v = new RemoteViews(c.getPackageName(), R.layout.vw_empty);
            v.setTextViewText(R.id.e_t, "Apri Viaticum");
            v.setTextViewText(R.id.e_s, "Il widget si aggiorna quando apri l'app.");
            v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        }
        if (!"map".equals(kind)) {
            int dh = "day".equals(kind) ? 250 : 110;
            try { skin(c, m, v, id, 250, dh, "transit".equals(kind) ? .45f : 0f); } catch (Exception ignored) {}
        }
        m.updateAppWidget(id, v);
    }
    static RemoteViews empty(Context c, int id, String t, String s) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_empty);
        v.setTextViewText(R.id.e_t, t);
        v.setTextViewText(R.id.e_s, s);
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }

    /* ---------- 1 prossima tappa ---------- */
    static RemoteViews next(Context c, JSONObject o, int id) {
        if (noTrip(o)) return empty(c, id, "Nessun viaggio in programma", "Tocca per pianificarne uno.");
        JSONArray st = o.optJSONArray("stops");
        long now = System.currentTimeMillis();
        int i = curIdx(st, now, false);
        if (i < 0) return empty(c, id, "Viaggio concluso", "Bentornato da " + o.optString("city") + ". Tocca per la cartolina.");
        JSONObject s = st.optJSONObject(i);
        long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
        boolean on = now >= t;
        long prevEnd = now - 30 * 60000L;
        if (i > 0) { JSONObject p = st.optJSONObject(i - 1); prevEnd = p.optLong("t") + p.optInt("d") * 60000L; }
        float frac = on ? (float) (now - t) / Math.max(1, e - t) : (float) (now - prevEnd) / Math.max(1, t - prevEnd);
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_next);
        v.setImageViewBitmap(R.id.ring, ring(c, Math.max(0.04f, Math.min(1f, frac)), on ? "ORA" : String.valueOf(Math.max(1, (t - now) / 60000) > 99 ? "" : Math.max(1, (t - now) / 60000) + "′"), s));
        String day = "";
        if (o.optString("from").compareTo(o.optString("to")) < 0) day = "Giorno " + (s.optInt("day") + 1) + " · ";
        v.setTextViewText(R.id.lab, (on ? "ADESSO · fino alle " + hm(e) : day + "DOPO · " + hm(t)).toUpperCase(Locale.ITALY));
        v.setTextViewText(R.id.name, s.optString("n"));
        long target = on ? e : t;
        if (target - now < 3 * 3600000L) {
            chrono(v, R.id.chrono, target, on ? "finisce tra %s" : "tra %s");
            v.setViewVisibility(R.id.chrono, View.VISIBLE);
            v.setViewVisibility(R.id.when, View.GONE);
        } else {
            v.setViewVisibility(R.id.chrono, View.GONE);
            v.setViewVisibility(R.id.when, View.VISIBLE);
            v.setTextViewText(R.id.when, inTxt(target - now));
        }
        v.removeAllViews(R.id.flip);
        int lm = s.optInt("lm");
        if (lm > 0) v.addView(R.id.flip, row(c, ("walk".equals(s.optString("mo")) ? lm + " min a piedi" : lm + " min con i mezzi")));
        JSONArray ln = s.optJSONArray("ln");
        if (ln != null && ln.length() > 0) { JSONObject l = ln.optJSONObject(0); v.addView(R.id.flip, row(c, l.optString("n") + " · " + l.optString("a") + " → " + l.optString("b"))); }
        if (s.optDouble("tk") > 0) v.addView(R.id.flip, row(c, "Biglietto " + eur(s.optDouble("tk")) + " a testa"));
        v.addView(R.id.flip, row(c, s.optInt("d") + " min di visita"));
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        if (s.optInt("ret") == 1 || s.optJSONArray("ll") == null) v.setViewVisibility(R.id.go, View.GONE);
        else { v.setViewVisibility(R.id.go, View.VISIBLE); v.setOnClickPendingIntent(R.id.go, maps(c, 1000 + id, s)); }
        v.setTextColor(R.id.go, TA);
        return v;
    }
    static Bitmap ring(Context c, float frac, String mid, JSONObject s) {
        int n = Math.round(64 * dens(c));
        Bitmap b = Bitmap.createBitmap(n, n, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setStyle(Paint.Style.STROKE);
        float sw = n * 0.11f;
        p.setStrokeWidth(sw);
        RectF r = new RectF(sw / 2 + 1, sw / 2 + 1, n - sw / 2 - 1, n - sw / 2 - 1);
        p.setColor(0x40FFFFFF);
        k.drawArc(r, 0, 360, false, p);
        p.setColor(Color.WHITE);
        p.setStrokeCap(Paint.Cap.ROUND);
        k.drawArc(r, -90, 360 * frac, false, p);
        Paint tp = new Paint(Paint.ANTI_ALIAS_FLAG);
        tp.setColor(Color.WHITE);
        tp.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        tp.setTextAlign(Paint.Align.CENTER);
        String txt = mid.isEmpty() ? (s.optInt("meal") == 1 ? "☕" : "★") : mid;
        tp.setTextSize(n * (txt.length() > 3 ? 0.22f : 0.28f));
        k.drawText(txt, n / 2f, n / 2f - (tp.descent() + tp.ascent()) / 2, tp);
        return b;
    }

    /* ---------- 8 spese ---------- */
    static RemoteViews spend(Context c, JSONObject o, int id) {
        JSONObject sp = o.optJSONObject("spend");
        if (noTrip(o) || sp == null) return empty(c, id, "Spese del viaggio", "Pianifica un viaggio: qui vedrai quanto hai speso.");
        double tot = sp.optDouble("tot"), est = sp.optDouble("est");
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_spend);
        v.setTextViewText(R.id.lab, ("Spese · " + o.optString("city")).toUpperCase(Locale.ITALY));
        v.setTextViewText(R.id.tot, eur(tot));
        v.setTextViewText(R.id.est, est > 0 ? "di ~" + eur(est) + " stimati" + (o.optInt("ppl") > 1 ? " per " + o.optInt("ppl") : "") : "spesi finora");
        JSONArray cats = sp.optJSONArray("cats");
        v.setImageViewBitmap(R.id.donut, donut(c, tot, est, cats));
        v.removeAllViews(R.id.flip);
        JSONArray last = sp.optJSONArray("last");
        if (last != null && last.length() > 0) {
            for (int i = 0; i < last.length(); i++) { JSONObject x = last.optJSONObject(i); v.addView(R.id.flip, row(c, x.optString("d") + " · " + eur(x.optDouble("a")))); }
        } else {
            v.addView(R.id.flip, row(c, "Nessuna spesa ancora"));
            v.addView(R.id.flip, row(c, "Aggiungila da Costi nell'app"));
        }
        if (est > 0) {
            double left = est - tot;
            v.addView(R.id.flip, row(c, left >= 0 ? "Restano ~" + eur(Math.round(left)) : "Oltre la stima di " + eur(Math.round(-left))));
        }
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static final int[] CAT = {0xFFFFFFFF, 0xFFFFE08A, 0xFF9EE6C4, 0xFFA9D4FF};
    static Bitmap donut(Context c, double tot, double est, JSONArray cats) {
        int n = Math.round(92 * dens(c));
        Bitmap b = Bitmap.createBitmap(n, n, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setStyle(Paint.Style.STROKE);
        float sw = n * 0.12f;
        p.setStrokeWidth(sw);
        RectF r = new RectF(sw / 2 + 1, sw / 2 + 1, n - sw / 2 - 1, n - sw / 2 - 1);
        p.setColor(0x40FFFFFF);
        k.drawArc(r, 0, 360, false, p);
        double full = Math.max(est, tot);
        if (full <= 0) full = 1;
        float a0 = -90;
        double rest = tot;
        if (cats != null) for (int i = 0; i < cats.length() && i < 4; i++) {
            double a = cats.optJSONObject(i).optDouble("a");
            rest -= a;
            float sweep = (float) (360 * a / full);
            p.setColor(CAT[i]);
            k.drawArc(r, a0, Math.max(0, sweep - 2), false, p);
            a0 += sweep;
        }
        if (rest > 0.01) { p.setColor(0x80FFFFFF); k.drawArc(r, a0, (float) (360 * rest / full), false, p); }
        Paint tp = new Paint(Paint.ANTI_ALIAS_FLAG);
        tp.setColor(Color.WHITE);
        tp.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        tp.setTextAlign(Paint.Align.CENTER);
        tp.setTextSize(n * 0.2f);
        String pct = est > 0 ? Math.round(100 * tot / est) + "%" : "€";
        k.drawText(pct, n / 2f, n / 2f - (tp.descent() + tp.ascent()) / 2, tp);
        return b;
    }

    /* ---------- 9 mappa del giorno ---------- */
    static RemoteViews map(Context c, AppWidgetManager m, JSONObject o, int id) {
        if (noTrip(o)) return empty(c, id, "Mappa del giorno", "Pianifica un viaggio: qui vedrai il percorso di oggi.");
        JSONArray st = o.optJSONArray("stops");
        long now = System.currentTimeMillis();
        int ci = curIdx(st, now, true);
        if (ci < 0) ci = st.length() - 1;
        int day = st.optJSONObject(ci).optInt("day");
        List<double[]> pts = new ArrayList<>();
        int nextP = -1;
        HashSet<String> seen = new HashSet<>();
        for (int i = 0; i < st.length(); i++) {
            JSONObject s = st.optJSONObject(i);
            if (s.optInt("day") != day || s.optInt("meal") == 1) continue;
            JSONArray ll = s.optJSONArray("ll");
            if (ll == null) continue;
            String key = ll.optDouble(0) + "," + ll.optDouble(1);
            if (!seen.add(key)) continue;
            if (i == ci) nextP = pts.size();
            pts.add(new double[]{ll.optDouble(0), ll.optDouble(1), (s.optLong("t") + s.optInt("d") * 60000L) < now ? 1 : 0});
        }
        int[] sz = sizePx(c, m, id, 250, 250);
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_map);
        v.setImageViewBitmap(R.id.map, mapBmp(c, pts, nextP, sz[0], sz[1], o.optString("city")));
        JSONObject s = st.optJSONObject(ci);
        boolean ended = curIdx(st, now, true) < 0;
        v.setTextViewText(R.id.cap_t, ended ? "Viaggio concluso" : (now >= s.optLong("t") ? "Sei a " : "Verso ") + s.optString("n"));
        int lm = s.optInt("lm");
        v.setTextViewText(R.id.cap_s, ended ? pts.size() + " tappe a " + o.optString("city") : hm(s.optLong("t")) + (lm > 0 ? " · " + lm + ("walk".equals(s.optString("mo")) ? " min a piedi" : " min con i mezzi") : "") + " · " + pts.size() + " tappe oggi");
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        if (ended || s.optJSONArray("ll") == null) v.setViewVisibility(R.id.go, View.GONE);
        else { v.setViewVisibility(R.id.go, View.VISIBLE); v.setOnClickPendingIntent(R.id.go, maps(c, 2000 + id, s)); }
        return v;
    }
    static Bitmap mapBmp(Context c, List<double[]> pts, int nextP, int w, int h, String city) {
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        float d = dens(c) * Math.min(1f, 900f / Math.max(w, h) * 1f);
        k.drawColor(col(c, R.color.vw_land));
        Paint st = new Paint(Paint.ANTI_ALIAS_FLAG);
        st.setColor(col(c, R.color.vw_street));
        st.setStrokeCap(Paint.Cap.ROUND);
        Random r = new Random(city.hashCode());
        /* strade di fantasia per dare l'idea di città */
        for (int i = 0; i < 9; i++) {
            st.setStrokeWidth((i % 3 == 0 ? 7 : 4) * d);
            float y = r.nextFloat() * h, x = r.nextFloat() * w;
            if (i % 2 == 0) k.drawLine(-10, y, w + 10, y + (r.nextFloat() - .5f) * h * .4f, st);
            else k.drawLine(x, -10, x + (r.nextFloat() - .5f) * w * .4f, h + 10, st);
        }
        Paint park = new Paint(Paint.ANTI_ALIAS_FLAG);
        park.setColor(col(c, R.color.vw_park));
        for (int i = 0; i < 2; i++) { float x = r.nextFloat() * w * .8f, y = r.nextFloat() * h * .6f; k.drawRoundRect(new RectF(x, y, x + w * .18f, y + h * .14f), 10 * d, 10 * d, park); }
        if (pts.isEmpty()) return b;
        double la0 = 90, la1 = -90, lo0 = 180, lo1 = -180;
        for (double[] p : pts) { la0 = Math.min(la0, p[0]); la1 = Math.max(la1, p[0]); lo0 = Math.min(lo0, p[1]); lo1 = Math.max(lo1, p[1]); }
        double kx = Math.cos(Math.toRadians((la0 + la1) / 2));
        double sw = Math.max((lo1 - lo0) * kx, 0.004), sh = Math.max(la1 - la0, 0.004);
        float padX = 34 * d, padTop = 30 * d, padBot = 74 * d;
        double sc = Math.min((w - 2 * padX) / sw, (h - padTop - padBot) / sh);
        double cx = (lo0 + lo1) / 2 * kx, cy = (la0 + la1) / 2;
        float ox = w / 2f, oy = padTop + (h - padTop - padBot) / 2f;
        float[][] xy = new float[pts.size()][2];
        for (int i = 0; i < pts.size(); i++) {
            xy[i][0] = (float) (ox + (pts.get(i)[1] * kx - cx) * sc);
            xy[i][1] = (float) (oy - (pts.get(i)[0] - cy) * sc);
        }
        Paint ln = new Paint(Paint.ANTI_ALIAS_FLAG);
        ln.setStyle(Paint.Style.STROKE);
        ln.setStrokeCap(Paint.Cap.ROUND);
        ln.setStrokeJoin(Paint.Join.ROUND);
        Path all = new Path();
        for (int i = 0; i < xy.length; i++) { if (i == 0) all.moveTo(xy[i][0], xy[i][1]); else all.lineTo(xy[i][0], xy[i][1]); }
        ln.setColor(Color.WHITE);
        ln.setStrokeWidth(9 * d);
        k.drawPath(all, ln);
        ln.setColor(TA);
        ln.setStrokeWidth(4.5f * d);
        ln.setPathEffect(new DashPathEffect(new float[]{1, 0}, 0));
        k.drawPath(all, ln);
        /* tratto già percorso più tenue */
        if (nextP > 0) {
            Path done = new Path();
            for (int i = 0; i <= nextP; i++) { if (i == 0) done.moveTo(xy[i][0], xy[i][1]); else done.lineTo(xy[i][0], xy[i][1]); }
            ln.setColor(col(c, R.color.vw_mute));
            k.drawPath(done, ln);
        }
        Paint pin = new Paint(Paint.ANTI_ALIAS_FLAG), tx = new Paint(Paint.ANTI_ALIAS_FLAG);
        tx.setTextAlign(Paint.Align.CENTER);
        tx.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        for (int i = 0; i < xy.length; i++) {
            boolean nx = i == nextP, done = pts.get(i)[2] == 1 && !nx;
            float rr = (nx ? 13 : 10) * d;
            if (nx) { pin.setColor(col(c, R.color.vw_acc2)); k.drawCircle(xy[i][0], xy[i][1], rr + 6 * d, pin); }
            pin.setColor(Color.WHITE);
            k.drawCircle(xy[i][0], xy[i][1], rr + 2.5f * d, pin);
            pin.setColor(done ? col(c, R.color.vw_mute) : TA);
            k.drawCircle(xy[i][0], xy[i][1], rr, pin);
            tx.setColor(Color.WHITE);
            tx.setTextSize(rr * 1.15f);
            k.drawText(String.valueOf(i + 1), xy[i][0], xy[i][1] - (tx.descent() + tx.ascent()) / 2, tx);
        }
        return b;
    }

    /* ---------- 10 passaporto ---------- */
    static RemoteViews pass(Context c, AppWidgetManager m, JSONObject o, int id) {
        JSONArray ps = o.optJSONArray("pass");
        if (ps == null || ps.length() == 0) return empty(c, id, "Il mio passaporto", "Ogni viaggio aggiunge un timbro. Tocca per pianificare il primo.");
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_pass);
        HashSet<String> cities = new HashSet<>(), countries = new HashSet<>();
        int done = 0;
        for (int i = 0; i < ps.length(); i++) { JSONObject p = ps.optJSONObject(i); cities.add(p.optString("n")); countries.add(p.optString("cn")); if (p.optInt("done") == 1) done++; }
        v.setTextViewText(R.id.title, "Il mio passaporto");
        v.setTextViewText(R.id.count, cities.size() + (cities.size() == 1 ? " città" : " città") + " · " + countries.size() + (countries.size() == 1 ? " paese" : " paesi"));
        int[] sz = sizePx(c, m, id, 250, 110);
        int pw = sz[0], ph = Math.max(60, sz[1] - Math.round(40 * dens(c)));
        v.removeAllViews(R.id.flip);
        int pages = Math.min(4, (ps.length() + 3) / 4);
        for (int pg = 0; pg < pages; pg++) {
            RemoteViews im = new RemoteViews(c.getPackageName(), R.layout.vw_img);
            im.setImageViewBitmap(R.id.img, stamps(c, ps, pg * 4, pw, ph));
            v.addView(R.id.flip, im);
        }
        if (pages > 1) v.setInt(R.id.flip, "setFlipInterval", 4500);
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static Bitmap stamps(Context c, JSONArray ps, int from, int w, int h) {
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        float d = dens(c);
        int nCol = 4;
        float cell = Math.min(w / (float) nCol, h);
        float rad = cell * 0.40f;
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setStyle(Paint.Style.STROKE);
        Paint t = new Paint(Paint.ANTI_ALIAS_FLAG);
        t.setTextAlign(Paint.Align.CENTER);
        t.setTypeface(Typeface.create("sans-serif-condensed", Typeface.BOLD));
        float[] rot = {-8, 6, -3, 9};
        boolean night = (c.getResources().getConfiguration().uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK) == android.content.res.Configuration.UI_MODE_NIGHT_YES;
        for (int i = 0; i < nCol && from + i < ps.length(); i++) {
            JSONObject s = ps.optJSONObject(from + i);
            int cc = Color.WHITE;
            float cx = (w / (float) nCol) * (i + .5f), cy = h / 2f;
            k.save();
            k.rotate(rot[i % 4], cx, cy);
            p.setColor(cc);
            p.setAlpha(s.optInt("done") == 1 ? 255 : 150);
            p.setStrokeWidth(2.6f * d);
            boolean sq = (from + i) % 2 == 1;
            RectF r = new RectF(cx - rad, cy - rad, cx + rad, cy + rad);
            if (sq) k.drawRoundRect(r, rad * .25f, rad * .25f, p); else k.drawOval(r, p);
            p.setStrokeWidth(1f * d);
            p.setPathEffect(new DashPathEffect(new float[]{3 * d, 3 * d}, 0));
            RectF r2 = new RectF(r.left + 4 * d, r.top + 4 * d, r.right - 4 * d, r.bottom - 4 * d);
            if (sq) k.drawRoundRect(r2, rad * .2f, rad * .2f, p); else k.drawOval(r2, p);
            p.setPathEffect(null);
            String nm = s.optString("q", s.optString("n")).toUpperCase(Locale.ROOT);
            t.setColor(cc);
            t.setAlpha(s.optInt("done") == 1 ? 255 : 150);
            float ts = rad * (nm.length() > 8 ? 0.30f : nm.length() > 6 ? 0.36f : 0.42f);
            t.setTextSize(ts);
            k.drawText(nm, cx, cy, t);
            t.setTextSize(rad * 0.26f);
            String when = String.format(Locale.ITALY, "%02d·%02d", s.optInt("m"), s.optInt("y") % 100);
            k.drawText(s.optInt("done") == 1 ? when : "IN ARRIVO", cx, cy + rad * 0.42f, t);
            k.restore();
        }
        return b;
    }

    /* ---------- 11 biglietto pronto ---------- */
    static RemoteViews ticket(Context c, JSONObject o, int id) {
        if (noTrip(o)) return empty(c, id, "Biglietti", "Pianifica un viaggio: qui vedrai il prossimo ingresso a pagamento.");
        JSONArray st = o.optJSONArray("stops");
        long now = System.currentTimeMillis();
        JSONObject s = null;
        for (int i = 0; i < st.length(); i++) {
            JSONObject x = st.optJSONObject(i);
            if (x.optDouble("tk") > 0 && x.optLong("t") + x.optInt("d") * 60000L > now) { s = x; break; }
        }
        if (s == null) return empty(c, id, "Nessun biglietto da mostrare", "Le prossime tappe sono gratuite.");
        int ppl = Math.max(1, o.optInt("ppl"));
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_ticket);
        JSONObject qr = s.optJSONObject("qr");
        Bitmap qb = qr != null ? VwQrActivity.code(qr.optString("t"), qr.optString("f"), Math.round(110 * dens(c))) : null;
        if (qb != null) {
            v.setImageViewBitmap(R.id.stub, qb);
            Intent qi = new Intent(c, VwQrActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK)
                .putExtra("t", qr.optString("t")).putExtra("f", qr.optString("f")).putExtra("n", s.optString("n"))
                .putExtra("s", (Math.max(1, o.optInt("ppl")) > 1 ? o.optInt("ppl") + " persone · " : "") + "entrata " + hm(s.optLong("t")) + " · mostra il codice all'ingresso");
            v.setOnClickPendingIntent(R.id.stub, PendingIntent.getActivity(c, 6000 + id, qi, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
        } else v.setImageViewBitmap(R.id.stub, stub(c, s.optDouble("tk")));
        v.setTextViewText(R.id.lab, ("Biglietto · " + (ppl == 1 ? "1 persona" : ppl + " persone") + (s.optJSONObject("qr") != null ? " · tocca il codice" : "")).toUpperCase(Locale.ITALY));
        v.setTextViewText(R.id.name, s.optString("n"));
        String tkn = s.optString("tkn");
        v.setTextViewText(R.id.desc, tkn.isEmpty() || tkn.equals(s.optString("n")) ? "Ingresso " + eur(s.optDouble("tk")) + " a testa" : tkn);
        long t = s.optLong("t");
        boolean on = now >= t;
        v.setTextViewText(R.id.chip, on ? "Entrata ora" : "Entrata " + hm(t));
        if (!on && t - now < 3 * 3600000L) { chrono(v, R.id.chrono, t, "· tra %s"); v.setViewVisibility(R.id.chrono, View.VISIBLE); }
        else { v.setViewVisibility(R.id.chrono, View.GONE); if (!on) v.setTextViewText(R.id.chip, "Entrata " + hm(t) + " · " + inTxt(t - now)); }
        v.removeAllViews(R.id.flip);
        v.addView(R.id.flip, row(c, "Totale " + eur(s.optDouble("tk") * ppl) + (ppl > 1 ? " per " + ppl : "")));
        if (s.optJSONObject("qr") == null) v.addView(R.id.flip, row(c, "Aggiungi il biglietto dall'app per avere il codice qui"));
        v.addView(R.id.flip, row(c, "Tieni pronto un documento"));
        v.addView(R.id.flip, row(c, "Prezzi indicativi: controlla il sito ufficiale"));
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static Bitmap stub(Context c, double price) {
        float d = dens(c);
        int w = Math.round(78 * d), h = Math.round(96 * d);
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setColor(Color.WHITE);
        RectF r = new RectF(0, 0, w, h);
        k.drawRoundRect(r, 14 * d, 14 * d, p);
        p.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.CLEAR));
        for (int i = 0; i < 7; i++) k.drawCircle(w, (i + .5f) * h / 7f, 3.2f * d, p);
        p.setXfermode(null);
        Paint t = new Paint(Paint.ANTI_ALIAS_FLAG);
        t.setColor(TA);
        t.setTextAlign(Paint.Align.CENTER);
        t.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        t.setTextSize(11 * d);
        t.setLetterSpacing(.12f);
        k.drawText("INGRESSO", w / 2f - 2 * d, h * .3f, t);
        t.setTextSize(24 * d);
        t.setLetterSpacing(0);
        k.drawText(eur(price), w / 2f - 2 * d, h * .62f, t);
        t.setTextSize(10 * d);
        k.drawText("a testa", w / 2f - 2 * d, h * .8f, t);
        return b;
    }

    /* ---------- 12 tabellone dei mezzi ---------- */
    static RemoteViews transit(Context c, AppWidgetManager m, JSONObject o, int id) {
        if (noTrip(o)) return empty(c, id, "I tuoi spostamenti", "Pianifica un viaggio: qui vedrai metro e bus da prendere.");
        JSONArray tr = o.optJSONArray("trans");
        long now = System.currentTimeMillis();
        List<JSONObject> up = new ArrayList<>();
        if (tr != null) for (int i = 0; i < tr.length(); i++) { JSONObject x = tr.optJSONObject(i); if (x.optLong("t") + 60000L * Math.max(3, x.optInt("min") / 2) > now) up.add(x); }
        if (up.isEmpty()) return empty(c, id, "Niente mezzi da prendere", "Le prossime tappe di " + o.optString("city") + " sono a piedi.");
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_transit);
        v.setTextViewText(R.id.hd, ("Spostamenti · " + o.optString("city")).toUpperCase(Locale.ITALY));
        int[] bid = {R.id.b1, R.id.b2, R.id.b3}, did = {R.id.d1, R.id.d2, R.id.d3}, tid = {R.id.t1, R.id.t2, R.id.t3}, rid = {R.id.r1, R.id.r2, R.id.r3};
        for (int i = 0; i < 3; i++) {
            if (i >= up.size()) { v.setViewVisibility(rid[i], View.GONE); continue; }
            JSONObject x = up.get(i);
            v.setViewVisibility(rid[i], View.VISIBLE);
            JSONArray ln = x.optJSONArray("ln");
            String lab = "BUS", cc = "#6b6475", dest = x.optString("to");
            if (ln != null && ln.length() > 0) {
                JSONObject l = ln.optJSONObject(0);
                lab = l.optString("l");
                cc = l.optString("c", cc);
                dest = l.optString("a") + " → " + l.optString("b");
                if (ln.length() > 1) dest += " +" + (ln.length() - 1);
            }
            v.setImageViewBitmap(bid[i], badge(c, lab, cc));
            v.setTextViewText(did[i], dest);
            long t = x.optLong("t");
            v.setTextViewText(tid[i], t <= now ? "ora" : hm(t));
        }
        JSONObject f = up.get(0);
        long t0 = f.optLong("t");
        if (t0 > now && t0 - now < 3 * 3600000L) { chrono(v, R.id.chrono, t0, "parti tra %s"); v.setViewVisibility(R.id.chrono, View.VISIBLE); }
        else v.setViewVisibility(R.id.chrono, View.GONE);
        v.removeAllViews(R.id.flip);
        v.addView(R.id.flip, rowB(c, "Per " + f.optString("to") + " · circa " + f.optInt("min") + " min"));
        String tx = f.optString("tx");
        if (!tx.isEmpty()) v.addView(R.id.flip, rowB(c, tx.length() > 70 ? tx.substring(0, 68).trim() + "…" : tx));
        v.addView(R.id.flip, rowB(c, "Orari dall'itinerario, non in tempo reale"));
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static Bitmap badge(Context c, String lab, String hex) {
        float d = dens(c);
        int w = Math.round(38 * d), h = Math.round(24 * d);
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        int cc;
        try { cc = Color.parseColor(hex); } catch (Exception e) { cc = 0xFF6B6475; }
        p.setColor(cc);
        k.drawRoundRect(new RectF(0, 0, w, h), 6 * d, 6 * d, p);
        Paint t = new Paint(Paint.ANTI_ALIAS_FLAG);
        t.setColor(Color.WHITE);
        t.setTextAlign(Paint.Align.CENTER);
        t.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        t.setTextSize((lab.length() > 2 ? 10 : 13) * d);
        k.drawText(lab, w / 2f, h / 2f - (t.descent() + t.ascent()) / 2, t);
        return b;
    }
    /* ---------- 3 carta d'imbarco ---------- */
    static RemoteViews board(Context c, JSONObject o, int id) {
        JSONArray fl = o.optJSONArray("flights");
        if (noTrip(o) || fl == null || fl.length() == 0) return empty(c, id, "Carta d'imbarco", "Inserisci i voli nel viaggio: qui vedrai il prossimo volo.");
        long now = System.currentTimeMillis();
        JSONObject f = null;
        for (int i = 0; i < fl.length(); i++) { JSONObject x = fl.optJSONObject(i); if (x.optLong("arr") > now) { f = x; break; } }
        if (f == null) return empty(c, id, "Bentornato", "Il viaggio a " + o.optString("city") + " è finito. Buon rientro!");
        long dep = f.optLong("dep"), arr = f.optLong("arr"), imb = f.optLong("imb");
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_board);
        boolean ret = "r".equals(f.optString("k"));
        v.setTextViewText(R.id.lab, ret ? "VOLO DI RITORNO" : "CARTA D'IMBARCO");
        v.setTextViewText(R.id.num, f.optString("num").isEmpty() ? new SimpleDateFormat("d MMM", Locale.ITALY).format(new Date(dep)) : f.optString("num") + " · " + new SimpleDateFormat("d MMM", Locale.ITALY).format(new Date(dep)));
        v.setTextViewText(R.id.from, f.optString("from").isEmpty() ? "—" : f.optString("from"));
        v.setTextViewText(R.id.to, f.optString("to").isEmpty() ? "—" : f.optString("to"));
        v.setTextViewText(R.id.fromN, f.optString("fromN") + " · " + hm(dep));
        v.setTextViewText(R.id.toN, f.optString("toN") + " · " + hm(arr));
        float frac = now < dep ? 0f : now > arr ? 1f : (float) (now - dep) / Math.max(1, arr - dep);
        v.setImageViewBitmap(R.id.arc, arc(c, frac));
        String st;
        long target;
        String fmt;
        if (now < imb) { st = "Imbarco " + hm(imb); target = imb; fmt = "· tra %s"; }
        else if (now < dep) { st = "Imbarco in corso"; target = dep; fmt = "· decollo tra %s"; }
        else { st = "In volo"; target = arr; fmt = "· atterri tra %s"; }
        v.setTextViewText(R.id.st, st);
        if (target - now < 3 * 3600000L) { chrono(v, R.id.chrono, target, fmt); v.setViewVisibility(R.id.chrono, View.VISIBLE); }
        else { v.setViewVisibility(R.id.chrono, View.GONE); v.setTextViewText(R.id.st, st + " · " + inTxt(target - now)); }
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static Bitmap arc(Context c, float frac) {
        float d = dens(c);
        int w = Math.round(150 * d), h = Math.round(44 * d);
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setStyle(Paint.Style.STROKE);
        p.setStrokeWidth(1.8f * d);
        p.setColor(0x99FFFFFF);
        p.setPathEffect(new DashPathEffect(new float[]{4 * d, 5 * d}, 0));
        float x0 = 6 * d, x1 = w - 6 * d, y0 = h - 8 * d, cy = -h * .35f;
        Path path = new Path();
        path.moveTo(x0, y0);
        path.quadTo(w / 2f, cy, x1, y0);
        k.drawPath(path, p);
        float t = frac, mt = 1 - t;
        float px = mt * mt * x0 + 2 * mt * t * (w / 2f) + t * t * x1, py = mt * mt * y0 + 2 * mt * t * cy + t * t * y0;
        float dx = 2 * mt * (w / 2f - x0) + 2 * t * (x1 - w / 2f), dy = 2 * mt * (cy - y0) + 2 * t * (y0 - cy);
        float ang = (float) Math.toDegrees(Math.atan2(dy, dx));
        Paint tp = new Paint(Paint.ANTI_ALIAS_FLAG);
        tp.setColor(Color.WHITE);
        tp.setTextAlign(Paint.Align.CENTER);
        tp.setTextSize(18 * d);
        k.save();
        k.rotate(ang, px, py);
        k.drawText("✈", px, py - (tp.descent() + tp.ascent()) / 2, tp);
        k.restore();
        return b;
    }

    /* ---------- 5 la giornata: le prossime tappe, anche dei giorni dopo se oggi ne restano poche ---------- */
    static RemoteViews day(Context c, JSONObject o, int id) {
        if (noTrip(o)) return empty(c, id, "La giornata", "Pianifica un viaggio: qui vedrai tutte le tappe di oggi.");
        JSONArray st = o.optJSONArray("stops");
        long now = System.currentTimeMillis();
        int ci = curIdx(st, now, false);
        if (ci < 0) return empty(c, id, "Viaggio concluso", "Bentornato da " + o.optString("city") + ". Tocca per la cartolina.");
        int day = st.optJSONObject(ci).optInt("day");
        int dayN = 0, dayDone = 0;
        for (int i = 0; i < st.length(); i++) { JSONObject s = st.optJSONObject(i); if (s.optInt("day") == day) { dayN++; if (s.optLong("t") + s.optInt("d") * 60000L <= now) dayDone++; } }
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_day);
        boolean multi = o.optString("from").compareTo(o.optString("to")) < 0;
        long first = st.optJSONObject(ci).optLong("t");
        String when = sameDay(first, now) ? "Oggi" : sameDay(first, now + 86400000L) ? "Domani" : new SimpleDateFormat("EEEE d MMMM", Locale.ITALY).format(new Date(first)).toLowerCase(Locale.ITALY);
        v.setTextViewText(R.id.title, when.substring(0, 1).toUpperCase(Locale.ITALY) + when.substring(1) + " a " + o.optString("city") + (multi ? " · giorno " + (day + 1) : ""));
        v.setTextViewText(R.id.count, dayDone + " di " + dayN);
        v.setProgressBar(R.id.prog, Math.max(1, dayN), dayDone, false);
        v.removeAllViews(R.id.rows);
        int ink = Color.WHITE, mute = 0xA6FFFFFF, acc = 0xFFFFE08A;
        int start = ci, shown = 0, lastDay = day;
        if (ci > 0 && st.optJSONObject(ci - 1).optInt("day") == day) start = ci - 1;
        for (int i = start; i < st.length() && shown < 9; i++) {
            JSONObject s = st.optJSONObject(i);
            if (s.optInt("day") != lastDay) {
                lastDay = s.optInt("day");
                RemoteViews hd = new RemoteViews(c.getPackageName(), R.layout.vw_day_row);
                hd.setTextViewText(R.id.dot, "");
                String dn = new SimpleDateFormat("EEEE d", Locale.ITALY).format(new Date(s.optLong("t"))).toUpperCase(Locale.ITALY);
                hd.setTextViewText(R.id.nm, (multi ? "GIORNO " + (lastDay + 1) + " · " : "") + dn);
                hd.setTextColor(R.id.nm, mute);
                hd.setTextViewText(R.id.tm, "");
                v.addView(R.id.rows, hd);
                shown++;
                if (shown >= 9) break;
            }
            long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
            boolean isDone = e <= now, isCur = i == ci;
            RemoteViews r = new RemoteViews(c.getPackageName(), R.layout.vw_day_row);
            r.setTextViewText(R.id.dot, isDone ? "✓" : isCur ? "●" : "○");
            r.setTextColor(R.id.dot, isDone ? mute : acc);
            r.setTextViewText(R.id.nm, s.optString("n"));
            r.setTextColor(R.id.nm, isDone ? mute : isCur ? acc : ink);
            r.setTextViewText(R.id.tm, hm(t));
            r.setTextColor(R.id.tm, isDone ? mute : ink);
            v.addView(R.id.rows, r);
            shown++;
        }
        v.removeAllViews(R.id.flip);
        JSONObject s = st.optJSONObject(ci);
        v.addView(R.id.flip, row(c, (now >= s.optLong("t") ? "Ora: " : "Dopo: ") + s.optString("n") + " · " + hm(s.optLong("t"))));
        int lm = s.optInt("lm");
        if (lm > 0) v.addView(R.id.flip, row(c, lm + ("walk".equals(s.optString("mo")) ? " min a piedi" : " min con i mezzi") + " per arrivarci"));
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static boolean sameDay(long a, long b) {
        SimpleDateFormat f = new SimpleDateFormat("yyyyMMdd", Locale.ITALY);
        return f.format(new Date(a)).equals(f.format(new Date(b)));
    }

    /* ---------- 30 da assaggiare: il prossimo pasto con il locale scelto ---------- */
    static RemoteViews food(Context c, JSONObject o, int id) {
        JSONArray ml = o.optJSONArray("meals");
        if (noTrip(o) || ml == null || ml.length() == 0) return empty(c, id, "Da assaggiare", "Pianifica un viaggio: qui vedrai dove mangiare.");
        long now = System.currentTimeMillis();
        JSONObject m = null;
        for (int i = 0; i < ml.length(); i++) { JSONObject x = ml.optJSONObject(i); if (x.optLong("t") + x.optInt("d") * 60000L > now && !x.optString("vn").isEmpty()) { m = x; break; } }
        if (m == null) return empty(c, id, "Buon rientro", "I pasti del viaggio a " + o.optString("city") + " sono finiti.");
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_food);
        String mk = m.optString("m");
        v.setTextViewText(R.id.ico, "col".equals(mk) ? "☕" : "cen".equals(mk) ? "🍷" : "pra".equals(mk) ? "🍝" : "🥐");
        long t = m.optLong("t");
        v.setTextViewText(R.id.lab, (m.optString("n") + " · " + (now >= t ? "adesso" : hm(t))).toUpperCase(Locale.ITALY));
        v.setTextViewText(R.id.name, m.optString("vn"));
        v.removeAllViews(R.id.flip);
        if (!m.optString("vd").isEmpty()) v.addView(R.id.flip, row(c, m.optString("vd")));
        if (!m.optString("vp").isEmpty()) v.addView(R.id.flip, row(c, m.optString("vp")));
        if (!m.optString("va").isEmpty()) v.addView(R.id.flip, row(c, m.optString("va")));
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        if (m.optJSONArray("ll") == null && m.optString("q").isEmpty()) v.setViewVisibility(R.id.go, View.GONE);
        else { v.setViewVisibility(R.id.go, View.VISIBLE); JSONObject q = new JSONObject(); try { q.put("q", m.optString("q")); q.put("ll", m.optJSONArray("ll")); q.put("mo", "walk"); q.put("lm", 5); } catch (Exception ignored) {} v.setOnClickPendingIntent(R.id.go, maps(c, 3000 + id, q)); }
        v.setTextColor(R.id.go, TA);
        return v;
    }

    /* ---------- 37 conti tra amici ---------- */
    static RemoteViews debts(Context c, JSONObject o, int id) {
        JSONObject db = o.optJSONObject("debts");
        if (noTrip(o) || db == null) return empty(c, id, "Conti tra amici", "Pianifica un viaggio in compagnia: qui vedrai chi deve cosa a chi.");
        if (db.optInt("n") < 2) return empty(c, id, "Conti tra amici", "Viaggi da solo: niente conti da fare. Aggiungi persone nel viaggio per dividere le spese.");
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_debts);
        v.setTextViewText(R.id.lab, ("Spese di gruppo · " + o.optString("city")).toUpperCase(Locale.ITALY));
        JSONArray L = db.optJSONArray("list");
        v.removeAllViews(R.id.flip);
        if (L == null || L.length() == 0) {
            v.setTextViewText(R.id.title, db.optDouble("tot") > 0 ? "Tutti in pari ✓" : "Nessuna spesa ancora");
            v.setImageViewBitmap(R.id.pair, pair(c, "✓", "", 0));
            v.addView(R.id.flip, row(c, db.optDouble("tot") > 0 ? "Spesi " + eur(db.optDouble("tot")) + " in " + db.optInt("n") : "Aggiungi le spese da Costi nell'app"));
        } else {
            JSONObject f = L.optJSONObject(0);
            v.setTextViewText(R.id.title, f.optString("f") + " deve " + eur(f.optDouble("a")) + " a " + f.optString("t"));
            v.setImageViewBitmap(R.id.pair, pair(c, f.optString("f"), f.optString("t"), 1));
            for (int i = 0; i < L.length(); i++) { JSONObject x = L.optJSONObject(i); v.addView(R.id.flip, row(c, x.optString("f") + " → " + x.optString("t") + " · " + eur(x.optDouble("a")))); }
            v.addView(R.id.flip, row(c, "Totale speso " + eur(db.optDouble("tot"))));
        }
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static Bitmap pair(Context c, String a, String b, int mode) {
        float d = dens(c);
        int w = Math.round(96 * d), h = Math.round(40 * d);
        Bitmap bm = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(bm);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG), t = new Paint(Paint.ANTI_ALIAS_FLAG);
        t.setColor(Color.WHITE);
        t.setTextAlign(Paint.Align.CENTER);
        t.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        t.setTextSize(15 * d);
        float r = 16 * d;
        if (mode == 0) {
            p.setColor(0xFF2F8F5B);
            k.drawCircle(w / 2f, h / 2f, r, p);
            k.drawText("✓", w / 2f, h / 2f - (t.descent() + t.ascent()) / 2, t);
            return bm;
        }
        Paint ln = new Paint(Paint.ANTI_ALIAS_FLAG);
        ln.setColor(0x99FFFFFF);
        ln.setStrokeWidth(2 * d);
        ln.setPathEffect(new DashPathEffect(new float[]{4 * d, 4 * d}, 0));
        k.drawLine(r * 2 + 2 * d, h / 2f, w - r * 2 - 2 * d, h / 2f, ln);
        p.setColor(Color.WHITE);
        t.setColor(TA);
        k.drawCircle(r + 1, h / 2f, r, p);
        k.drawText(a.isEmpty() ? "?" : a.substring(0, 1).toUpperCase(Locale.ITALY), r + 1, h / 2f - (t.descent() + t.ascent()) / 2, t);
        p.setColor(0xFFFFE08A);
        k.drawCircle(w - r - 1, h / 2f, r, p);
        k.drawText(b.isEmpty() ? "?" : b.substring(0, 1).toUpperCase(Locale.ITALY), w - r - 1, h / 2f - (t.descent() + t.ascent()) / 2, t);
        Paint e = new Paint(Paint.ANTI_ALIAS_FLAG);
        e.setColor(Color.WHITE);
        e.setTextAlign(Paint.Align.CENTER);
        e.setTypeface(Typeface.create("sans-serif", Typeface.BOLD));
        e.setTextSize(13 * d);
        k.drawText("€ →", w / 2f, h / 2f - 4 * d, e);
        return bm;
    }

    /* ---------- 40 cambio: la cifra la scrive chi usa il widget ---------- */
    static String num(double a) {
        if (Math.abs(a) >= 1000) return String.format(Locale.ITALY, "%,.0f", a);
        return String.format(Locale.ITALY, a == Math.rint(a) ? "%.0f" : "%.2f", a);
    }
    static RemoteViews fx(Context c, JSONObject o, int id) {
        JSONObject cu = o.optJSONObject("cur");
        if (noTrip(o)) return empty(c, id, "Cambio veloce", "Pianifica un viaggio fuori dall'euro: qui convertirai le cifre.");
        if (cu == null) return empty(c, id, "Cambio veloce", "A " + o.optString("city") + " si paga in euro: niente da cambiare.");
        double e = cu.optDouble("e", 1);
        String s = cu.optString("s");
        SharedPreferences pr = c.getSharedPreferences(PREFS, 0);
        double amt = pr.getFloat("fx_amt", 20f);
        boolean toEur = pr.getBoolean("fx_dir", false);
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_fx);
        v.setTextViewText(R.id.lab, (o.optString("city") + " · " + cu.optString("c")).toUpperCase(Locale.ITALY));
        v.setTextViewText(R.id.res, toEur ? num(amt) + " " + s + " = " + num(amt * e) + " €" : num(amt) + " € = " + num(amt / e) + " " + s);
        v.setTextViewText(R.id.rate, "1 € = " + num(1 / e) + " " + s + " · cambio indicativo");
        double[] q = toEur ? new double[]{100 / e > 1000 ? 1000 : 100, 500, 1000} : new double[]{10, 50, 100};
        if (toEur && 1 / e > 50) q = new double[]{1000, 5000, 10000};
        int[] qi = {R.id.q1, R.id.q2, R.id.q3};
        for (int i = 0; i < 3; i++) v.setTextViewText(qi[i], toEur ? num(q[i]) + " " + s + "\n" + num(q[i] * e) + " €" : num(q[i]) + " €\n" + num(q[i] / e) + " " + s);
        Intent i = new Intent(c, VwFxActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pi = PendingIntent.getActivity(c, 4000 + id, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        v.setOnClickPendingIntent(R.id.root, pi);
        v.setOnClickPendingIntent(R.id.go, pi);
        v.setTextColor(R.id.go, TA);
        return v;
    }

    /* ---------- versioni piccole (2x2) ---------- */
    static RemoteViews sm(Context c, int id, String lab, String title, String sub, Bitmap img) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_small);
        v.setTextViewText(R.id.lab, lab.toUpperCase(Locale.ITALY));
        v.setTextViewText(R.id.title, title);
        v.setTextViewText(R.id.sub, sub == null ? "" : sub);
        v.setViewVisibility(R.id.chrono, View.GONE);
        if (img != null) { v.setImageViewBitmap(R.id.img, img); v.setViewVisibility(R.id.img, View.VISIBLE); } else v.setViewVisibility(R.id.img, View.GONE);
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static void smChrono(RemoteViews v, long target, String fmt) {
        long now = System.currentTimeMillis();
        if (target > now && target - now < 3 * 3600000L) { chrono(v, R.id.chrono, target, fmt); v.setViewVisibility(R.id.chrono, View.VISIBLE); v.setViewVisibility(R.id.sub, View.GONE); }
    }
    static RemoteViews small(Context c, JSONObject o, int id, String k) {
        long now = System.currentTimeMillis();
        if (noTrip(o) && !"pass".equals(k)) return sm(c, id, "Viaticum", "Nessun viaggio", "Tocca per pianificarne uno", null);
        JSONArray st = o.optJSONArray("stops");
        switch (k) {
            case "next": case "day": {
                int i = curIdx(st, now, false);
                if (i < 0) return sm(c, id, o.optString("city"), "Viaggio concluso", "Tocca per la cartolina", null);
                JSONObject s = st.optJSONObject(i);
                long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
                boolean on = now >= t;
                long prevEnd = i > 0 ? st.optJSONObject(i - 1).optLong("t") + st.optJSONObject(i - 1).optInt("d") * 60000L : now - 1800000L;
                float frac = on ? (float) (now - t) / Math.max(1, e - t) : (float) (now - prevEnd) / Math.max(1, t - prevEnd);
                long mins = Math.max(1, (t - now) / 60000);
                RemoteViews v = sm(c, id, on ? "Adesso" : "Dopo · " + hm(t), s.optString("n"), on ? "fino alle " + hm(e) : inTxt(t - now), ring(c, Math.max(.04f, Math.min(1f, frac)), on ? "ORA" : mins > 99 ? "" : mins + "′", s));
                smChrono(v, on ? e : t, on ? "finisce tra %s" : "tra %s");
                return v;
            }
            case "spend": {
                JSONObject sp = o.optJSONObject("spend");
                double tot = sp != null ? sp.optDouble("tot") : 0, est = sp != null ? sp.optDouble("est") : 0;
                return sm(c, id, "Spese · " + o.optString("city"), eur(tot), est > 0 ? "di ~" + eur(est) + " stimati" : "spesi finora", donut(c, tot, est, sp != null ? sp.optJSONArray("cats") : null));
            }
            case "board": {
                JSONArray fl = o.optJSONArray("flights");
                JSONObject f = null;
                if (fl != null) for (int i = 0; i < fl.length(); i++) { JSONObject x = fl.optJSONObject(i); if (x.optLong("arr") > now) { f = x; break; } }
                if (f == null) return sm(c, id, "Voli", "Nessun volo", "Inserisci i voli nel viaggio", null);
                long imb = f.optLong("imb"), dep = f.optLong("dep");
                RemoteViews v = sm(c, id, f.optString("num").isEmpty() ? "Volo" : f.optString("num"), f.optString("from") + " → " + f.optString("to"), now < imb ? "Imbarco " + hm(imb) + " · " + inTxt(imb - now) : "Decollo " + hm(dep), null);
                smChrono(v, now < imb ? imb : dep, now < imb ? "imbarco tra %s" : "decollo tra %s");
                return v;
            }
            case "fx": {
                JSONObject cu = o.optJSONObject("cur");
                if (cu == null) return sm(c, id, "Cambio", "Si paga in euro", "A " + o.optString("city") + " niente da cambiare", null);
                double e = cu.optDouble("e", 1);
                SharedPreferences pr = c.getSharedPreferences(PREFS, 0);
                double amt = pr.getFloat("fx_amt", 20f);
                boolean toEur = pr.getBoolean("fx_dir", false);
                String s = cu.optString("s");
                RemoteViews v = sm(c, id, "Cambio · " + cu.optString("c"), toEur ? num(amt * e) + " €" : num(amt / e) + " " + s, (toEur ? num(amt) + " " + s : num(amt) + " €") + " · tocca per cambiare", null);
                Intent in = new Intent(c, VwFxActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                v.setOnClickPendingIntent(R.id.root, PendingIntent.getActivity(c, 5000 + id, in, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
                return v;
            }
            case "pass": {
                JSONArray ps = o.optJSONArray("pass");
                if (ps == null || ps.length() == 0) return sm(c, id, "Passaporto", "Nessun timbro", "Ogni viaggio ne aggiunge uno", null);
                HashSet<String> ci = new HashSet<>(), cn = new HashSet<>();
                for (int i = 0; i < ps.length(); i++) { ci.add(ps.optJSONObject(i).optString("n")); cn.add(ps.optJSONObject(i).optString("cn")); }
                JSONArray one = new JSONArray();
                one.put(ps.optJSONObject(0));
                float d = dens(c);
                return sm(c, id, "Passaporto", ci.size() + " città", cn.size() + (cn.size() == 1 ? " paese" : " paesi"), stamps(c, one, 0, Math.round(4 * 46 * d), Math.round(46 * d)));
            }
            case "food": {
                JSONArray ml = o.optJSONArray("meals");
                JSONObject mm = null;
                if (ml != null) for (int i = 0; i < ml.length(); i++) { JSONObject x = ml.optJSONObject(i); if (x.optLong("t") + x.optInt("d") * 60000L > now && !x.optString("vn").isEmpty()) { mm = x; break; } }
                if (mm == null) return sm(c, id, "Da assaggiare", "Pasti finiti", "Buon rientro", null);
                return sm(c, id, mm.optString("n") + " · " + hm(mm.optLong("t")), mm.optString("vn"), mm.optString("vp").isEmpty() ? mm.optString("va") : mm.optString("vp"), null);
            }
            case "debts": {
                JSONObject db = o.optJSONObject("debts");
                if (db == null || db.optInt("n") < 2) return sm(c, id, "Conti", "Viaggi da solo", "Niente conti da fare", null);
                JSONArray L = db.optJSONArray("list");
                if (L == null || L.length() == 0) return sm(c, id, "Conti", "Tutti in pari ✓", "Spesi " + eur(db.optDouble("tot")), null);
                JSONObject f = L.optJSONObject(0);
                return sm(c, id, "Conti", f.optString("f") + " → " + f.optString("t"), eur(f.optDouble("a")) + (L.length() > 1 ? " · +" + (L.length() - 1) + " altri" : ""), null);
            }
            case "ticket": {
                JSONObject s = null;
                for (int i = 0; i < st.length(); i++) { JSONObject x = st.optJSONObject(i); if (x.optDouble("tk") > 0 && x.optLong("t") + x.optInt("d") * 60000L > now) { s = x; break; } }
                if (s == null) return sm(c, id, "Biglietti", "Niente da pagare", "Le prossime tappe sono gratis", null);
                JSONObject qr = s.optJSONObject("qr");
                Bitmap qb = qr != null ? VwQrActivity.code(qr.optString("t"), qr.optString("f"), Math.round(44 * dens(c))) : null;
                RemoteViews v = sm(c, id, "Biglietto · " + eur(s.optDouble("tk")), s.optString("n"), "Entrata " + hm(s.optLong("t")), qb);
                if (qb != null) {
                    Intent qi = new Intent(c, VwQrActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK).putExtra("t", qr.optString("t")).putExtra("f", qr.optString("f")).putExtra("n", s.optString("n"));
                    v.setOnClickPendingIntent(R.id.root, PendingIntent.getActivity(c, 7000 + id, qi, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
                }
                smChrono(v, s.optLong("t"), "entrata tra %s");
                return v;
            }
            case "transit": {
                JSONArray tr = o.optJSONArray("trans");
                JSONObject x = null;
                if (tr != null) for (int i = 0; i < tr.length(); i++) { JSONObject y = tr.optJSONObject(i); if (y.optLong("t") > now - 60000) { x = y; break; } }
                if (x == null) return sm(c, id, "Spostamenti", "Tutto a piedi", "Niente mezzi da prendere", null);
                JSONArray ln = x.optJSONArray("ln");
                Bitmap bd = null;
                String dest = x.optString("to");
                if (ln != null && ln.length() > 0) { JSONObject l = ln.optJSONObject(0); bd = badge(c, l.optString("l"), l.optString("c")); dest = l.optString("a") + " → " + l.optString("b"); }
                RemoteViews v = sm(c, id, "Parti alle " + hm(x.optLong("t")), dest, "per " + x.optString("to"), bd);
                smChrono(v, x.optLong("t"), "parti tra %s");
                return v;
            }
        }
        return null;
    }
}
