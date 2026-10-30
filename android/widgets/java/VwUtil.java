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
import android.graphics.Path;
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
    static final Class<?>[] ALL = {VwNext.class, VwSpend.class, VwMap.class, VwPass.class, VwTicket.class, VwTransit.class};
    private VwUtil() {}

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
            switch (kind) {
                case "next": v = next(c, o, id); break;
                case "spend": v = spend(c, o, id); break;
                case "map": v = map(c, m, o, id); break;
                case "pass": v = pass(c, m, o, id); break;
                case "ticket": v = ticket(c, o, id); break;
                default: v = transit(c, m, o, id); break;
            }
        } catch (Exception e) {
            v = new RemoteViews(c.getPackageName(), R.layout.vw_empty);
            v.setTextViewText(R.id.e_t, "Apri Viaticum");
            v.setTextViewText(R.id.e_s, "Il widget si aggiorna quando apri l'app.");
            v.setOnClickPendingIntent(R.id.root, openApp(c, id));
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
        p.setColor(col(c, R.color.vw_w2));
        k.drawArc(r, 0, 360, false, p);
        p.setColor(col(c, R.color.vw_acc));
        p.setStrokeCap(Paint.Cap.ROUND);
        k.drawArc(r, -90, 360 * frac, false, p);
        Paint tp = new Paint(Paint.ANTI_ALIAS_FLAG);
        tp.setColor(col(c, R.color.vw_ink));
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
    static final int[] CAT = {0xFF8E1F26, 0xFFF2B33D, 0xFF2F8F5B, 0xFF2F6F9E};
    static Bitmap donut(Context c, double tot, double est, JSONArray cats) {
        int n = Math.round(92 * dens(c));
        Bitmap b = Bitmap.createBitmap(n, n, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setStyle(Paint.Style.STROKE);
        float sw = n * 0.12f;
        p.setStrokeWidth(sw);
        RectF r = new RectF(sw / 2 + 1, sw / 2 + 1, n - sw / 2 - 1, n - sw / 2 - 1);
        p.setColor(col(c, R.color.vw_w2));
        k.drawArc(r, 0, 360, false, p);
        double full = Math.max(est, tot);
        if (full <= 0) full = 1;
        float a0 = -90;
        double rest = tot;
        if (cats != null) for (int i = 0; i < cats.length() && i < 4; i++) {
            double a = cats.optJSONObject(i).optDouble("a");
            rest -= a;
            float sweep = (float) (360 * a / full);
            p.setColor(i == 0 ? col(c, R.color.vw_acc) : CAT[i]);
            k.drawArc(r, a0, Math.max(0, sweep - 2), false, p);
            a0 += sweep;
        }
        if (rest > 0.01) { p.setColor(col(c, R.color.vw_mute)); k.drawArc(r, a0, (float) (360 * rest / full), false, p); }
        Paint tp = new Paint(Paint.ANTI_ALIAS_FLAG);
        tp.setColor(col(c, R.color.vw_ink));
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
        ln.setColor(col(c, R.color.vw_acc));
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
            pin.setColor(done ? col(c, R.color.vw_mute) : col(c, R.color.vw_acc));
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
            int cc;
            try { cc = Color.parseColor(s.optString("col", "#8e1f26")); } catch (Exception e) { cc = 0xFF8E1F26; }
            if (night) { float[] hsv = new float[3]; Color.colorToHSV(cc, hsv); hsv[2] = Math.max(hsv[2], .85f); hsv[1] = Math.min(hsv[1], .55f); cc = Color.HSVToColor(hsv); }
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
        v.setImageViewBitmap(R.id.stub, stub(c, s.optDouble("tk")));
        v.setTextViewText(R.id.lab, ("Biglietto · " + (ppl == 1 ? "1 persona" : ppl + " persone")).toUpperCase(Locale.ITALY));
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
        p.setColor(col(c, R.color.vw_acc));
        RectF r = new RectF(0, 0, w, h);
        k.drawRoundRect(r, 14 * d, 14 * d, p);
        p.setColor(col(c, R.color.vw_bg));
        for (int i = 0; i < 7; i++) k.drawCircle(w, (i + .5f) * h / 7f, 3.2f * d, p);
        k.drawCircle(w * .5f, 0, 0, p);
        Paint t = new Paint(Paint.ANTI_ALIAS_FLAG);
        t.setColor(col(c, R.color.vw_bg));
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
}
