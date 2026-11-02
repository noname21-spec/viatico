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
    static final Class<?>[] ALL = {VwNext.class, VwSpend.class, VwMap.class, VwPass.class, VwTicket.class, VwTransit.class, VwBoard.class, VwDay.class, VwFood.class, VwDebts.class, VwFx.class, VwNextS.class, VwSpendS.class, VwFxS.class, VwBoardS.class, VwNextR.class, VwLeave.class, VwFxR.class, VwToday.class, VwCount.class, VwLate.class, VwLine.class, VwGo.class, VwFly.class, VwActs.class, VwWx.class, VwMeal.class};
    private VwUtil() {}
    /* colori del viaggio in programma più vicino */
    static int TA = 0xFF0A6F95, TB = 0xFF0E3B52;
    static Bitmap SKY = null;
    static long SKYT = 0;
    static Bitmap sky(Context c) {
        java.io.File f = new java.io.File(c.getFilesDir(), "vw_sky.png");
        if (!f.exists()) return null;
        if (SKY == null || f.lastModified() != SKYT) { try { SKY = android.graphics.BitmapFactory.decodeFile(f.getAbsolutePath()); SKYT = f.lastModified(); } catch (Exception e) { SKY = null; } }
        return SKY;
    }
    static Typeface TFB = null, TFK = null;
    /* i caratteri dell'app (Outfit) anche nei disegni dei widget */
    static Typeface tf(Context c, boolean black) {
        try {
            if (Build.VERSION.SDK_INT >= 26) {
                if (black) { if (TFK == null) TFK = c.getResources().getFont(R.font.vw_outfit_black); return TFK; }
                if (TFB == null) TFB = c.getResources().getFont(R.font.vw_outfit_bold); return TFB;
            }
        } catch (Exception ignored) {}
        return Typeface.create("sans-serif", Typeface.BOLD);
    }
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
        Bitmap sk = SKYC;
        if (sk != null) {
            float sw = Math.max(w, h * 1.6f), sh = sw * sk.getHeight() / (float) sk.getWidth();
            if (sh > h * .5f) { sh = h * .5f; sw = sh * sk.getWidth() / (float) sk.getHeight(); }
            Paint bp = new Paint(Paint.ANTI_ALIAS_FLAG | Paint.FILTER_BITMAP_FLAG);
            float x0 = (w - sw) / 2f;
            k.drawBitmap(sk, null, new RectF(x0, h - sh, x0 + sw, h), bp);
            /* velo in basso per leggere il testo sopra lo skyline */
            p.setShader(new LinearGradient(0, h - sh, 0, h, 0x00000000, 0x33000000, Shader.TileMode.CLAMP));
            k.drawRect(0, h - sh, w, h, p);
            p.setShader(null);
        }
        k.restore();
        return b;
    }
    static Bitmap SKYC = null;
    static void skinPx(Context c, RemoteViews v, int pw, int ph, float dark) {
        SKYC = sky(c);
        float k = Math.min(1f, 520f / Math.max(pw, ph));
        v.setImageViewBitmap(R.id.bgimg, bg(c, Math.max(60, Math.round(pw * k)), Math.max(60, Math.round(ph * k)), dark));
    }
    static void skin(Context c, AppWidgetManager m, RemoteViews v, int id, int dw, int dh, float dark) {
        SKYC = sky(c);
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
        VwLive.update(c);
        VwShort.update(c);
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
        if (k == VwNextR.class) return "next_r";
        if (k == VwLeave.class) return "leave";
        if (k == VwFxR.class) return "fx_r";
        if (k == VwToday.class) return "today";
        if (k == VwCount.class) return "count";
        if (k == VwLate.class) return "late";
        if (k == VwLine.class) return "line";
        if (k == VwGo.class) return "go";
        if (k == VwFly.class) return "fly";
        if (k == VwActs.class) return "acts";
        if (k == VwWx.class) return "wx";
        if (k == VwMeal.class) return "meal";
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
            /* v287 «Esci adesso»: cambia colore 15 minuti prima dell'uscita e all'ora di uscire */
            long lv = t - s.optInt("lm") * 60000L;
            for (long q : new long[]{lv - 15 * 60000L, lv}) if (q > now + 30000 && q < when) when = q;
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
            if (ROW.contains(kind)) {
                RemoteViews rv = rowW(c, m, o, id, kind);
                int[] sz = sizePx(c, m, id, wide(kind) ? 250 : 110, 50);
                skinPx(c, rv, sz[0], sz[1], "fly".equals(kind) ? .3f : 0f);
                m.updateAppWidget(id, rv);
                return;
            }
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
        tp.setTypeface(tf(c, true));
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
        int n = Math.round(80 * dens(c));
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
        tp.setTypeface(tf(c, true));
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
        tx.setTypeface(tf(c, true));
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
        t.setTypeface(tf(c, true));
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
        int w = Math.round(84 * d), h = Math.round(96 * d);
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
        t.setTypeface(tf(c, true));
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
        int w = Math.round(40 * d), h = Math.round(26 * d);
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
        t.setTypeface(tf(c, true));
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
        v.setTextViewText(R.id.fromN, f.optString("fromN").isEmpty() ? hm(dep) : f.optString("fromN") + " · " + hm(dep));
        v.setTextViewText(R.id.toN, f.optString("toN").isEmpty() ? hm(arr) : f.optString("toN") + " · " + hm(arr));
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
        /* v286 la carta d'imbarco salvata nell'app: si tocca e si apre grande */
        JSONArray bp = f.optJSONArray("bp");
        JSONObject b0 = bp != null && bp.length() > 0 ? bp.optJSONObject(0) : null;
        Bitmap bb = b0 != null ? codeTile(c, b0.optString("t"), b0.optString("f")) : null;
        if (bb != null) {
            v.setImageViewBitmap(R.id.bp, bb);
            v.setViewVisibility(R.id.bp, View.VISIBLE);
            JSONArray l = new JSONArray();
            for (int i = 0; i < bp.length(); i++) {
                JSONObject x = bp.optJSONObject(i);
                if (x == null) continue;
                try {
                    JSONObject y = new JSONObject();
                    y.put("t", x.optString("t")); y.put("f", x.optString("f"));
                    y.put("n", "Carta d'imbarco · " + f.optString("from") + " → " + f.optString("to"));
                    String who = x.optString("p"), seat = x.optString("s");
                    y.put("s", (who.isEmpty() ? "" : who) + (seat.isEmpty() ? "" : (who.isEmpty() ? "" : " · ") + "posto " + seat) + (imb > 0 ? " · imbarco " + hm(imb) : ""));
                    l.put(y);
                } catch (Exception e) {}
            }
            Intent qi = new Intent(c, VwQrActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK).putExtra("list", l.toString());
            v.setOnClickPendingIntent(R.id.bp, PendingIntent.getActivity(c, 6500 + id, qi, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
            v.setTextViewText(R.id.lab, (ret ? "VOLO DI RITORNO" : "CARTA D'IMBARCO") + " · TOCCA IL CODICE");
        } else v.setViewVisibility(R.id.bp, View.GONE);
        return v;
    }
    /* il codice su una tessera bianca arrotondata, per il widget */
    static Bitmap codeTile(Context c, String t, String f) {
        float d = dens(c);
        int W = Math.round(112 * d), H = Math.round(48 * d), pad = Math.round(5 * d);
        boolean wide = "pdf417".equals(f);
        Bitmap code = VwQrActivity.code(t, f, wide ? W - 2 * pad : H - 2 * pad);
        if (code == null) return null;
        int cw = wide ? W : H + Math.round(6 * d);
        Bitmap b = Bitmap.createBitmap(cw, H, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        p.setColor(Color.WHITE);
        k.drawRoundRect(new RectF(0, 0, cw, H), 9 * d, 9 * d, p);
        float sc = Math.min((cw - 2f * pad) / code.getWidth(), (H - 2f * pad) / code.getHeight());
        float dw = code.getWidth() * sc, dh = code.getHeight() * sc;
        Paint q = new Paint();
        q.setFilterBitmap(false);
        k.drawBitmap(code, null, new RectF((cw - dw) / 2f, (H - dh) / 2f, (cw + dw) / 2f, (H + dh) / 2f), q);
        return b;
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
        int w = Math.round(104 * d), h = Math.round(44 * d);
        Bitmap bm = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(bm);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG), t = new Paint(Paint.ANTI_ALIAS_FLAG);
        t.setColor(Color.WHITE);
        t.setTextAlign(Paint.Align.CENTER);
        t.setTypeface(tf(c, true));
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
        e.setTypeface(tf(c, true));
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
                RemoteViews v = sm(c, id, f.optString("num").isEmpty() ? "Volo" : f.optString("num"), f.optString("from").isEmpty() ? "Volo per " + f.optString("to") : f.optString("to").isEmpty() ? "Ritorno da " + f.optString("from") : f.optString("from") + " → " + f.optString("to"), now < imb ? "Imbarco " + hm(imb) + " · " + inTxt(imb - now) : "Decollo " + hm(dep), null);
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

    /* ---------- v287 widget a una riga: 2x1 (un dato e un tocco) e 4x1 (una striscia) ---------- */
    static final HashSet<String> ROW = new HashSet<>(java.util.Arrays.asList("next_r", "leave", "fx_r", "today", "count", "late", "line", "go", "fly", "acts", "wx", "meal"));
    static boolean wide(String k) { return "line".equals(k) || "go".equals(k) || "fly".equals(k) || "acts".equals(k) || "wx".equals(k) || "meal".equals(k); }
    static final int W1 = 0xFFFFFFFF, CHIP = 0x2EFFFFFF;
    static String ip(String n) {
        switch (n) {
            case "pin": return "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z";
            case "walk": return "M13 3a1.6 1.6 0 1 0 0 3.2a1.6 1.6 0 1 0 0-3.2zM10 21l2.2-6.2L10 12.5l1-5L15 10l3 1M11 7.5L7.5 9.5V13M12.2 14.8L15 17l1 4";
            case "swap": return "M7 7h12l-3.5-3.5M17 17H5l3.5 3.5";
            case "wallet": return "M5.5 6h13A2.5 2.5 0 0 1 21 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-8A2.5 2.5 0 0 1 5.5 6zM3 10h18M16 14.5h2";
            case "cal": return "M5.5 5h13A2.5 2.5 0 0 1 21 7.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-11A2.5 2.5 0 0 1 5.5 5zM3 10h18M8 3v4M16 3v4";
            case "clock": return "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v5l3 2";
            case "plus": return "M12 5v14M5 12h14";
            case "map": return "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14";
            case "ticket": return "M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4zM14 7v2M14 11v2M14 15v2";
            case "sun": return "M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4";
            case "cloud": return "M7 18a4 4 0 1 1 0.9-7.9A5 5 0 0 1 17.5 11A3.5 3.5 0 0 1 17 18z";
            case "rain": return "M7 15a4 4 0 1 1 0.9-7.9A5 5 0 0 1 17.5 8A3.5 3.5 0 0 1 17 15zM9 18l-1 2.5M13 18l-1 2.5M17 18l-1 2.5";
            case "fork": return "M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 2-3 5s1 4 3 4v9";
            case "plane": return "M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-0.5-3 0-4.5 1.5L13 8L4.8 6.2c-0.5-0.1-0.9 0.1-1.1 0.5l-0.3 0.5c-0.2 0.5-0.1 1 0.3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c0.3 0.4 0.8 0.5 1.3 0.3l0.5-0.2c0.4-0.3 0.6-0.7 0.5-1.2z";
        }
        return "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z";
    }
    /* icona a tratto (come nell'app) su un cerchio di vetro */
    static Bitmap ico(Context c, String name, int dp, int bgc) {
        float d = dens(c);
        int n = Math.round(dp * d);
        Bitmap b = Bitmap.createBitmap(n, n, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        if (bgc != 0) { p.setColor(bgc); k.drawCircle(n / 2f, n / 2f, n / 2f, p); }
        try {
            Path path = svgPath(ip(name));
            float s = n * (bgc != 0 ? .54f : .86f) / 24f;
            android.graphics.Matrix mx = new android.graphics.Matrix();
            mx.setScale(s, s);
            mx.postTranslate((n - 24 * s) / 2f, (n - 24 * s) / 2f);
            path.transform(mx);
            p.setColor(W1);
            p.setStyle(Paint.Style.STROKE);
            p.setStrokeWidth(2f * s);
            p.setStrokeCap(Paint.Cap.ROUND);
            p.setStrokeJoin(Paint.Join.ROUND);
            k.drawPath(path, p);
        } catch (Throwable ignored) {}
        return b;
    }
    /* i tracciati SVG delle icone (M L H V C S Q A Z, assoluti e relativi) in un Path */
    static Path svgPath(String d) {
        Path p = new Path();
        java.util.regex.Matcher mt = java.util.regex.Pattern.compile("[MmLlHhVvCcSsQqAaZz]|-?(?:\\d+\\.?\\d*|\\.\\d+)").matcher(d);
        List<String> tk = new ArrayList<>();
        while (mt.find()) tk.add(mt.group());
        float x = 0, y = 0, sx = 0, sy = 0, lx = 0, ly = 0;
        char cmd = 'M', prev = ' ';
        int i = 0;
        while (i < tk.size()) {
            String t = tk.get(i);
            if (Character.isLetter(t.charAt(0))) {
                cmd = t.charAt(0); i++;
                if (cmd == 'Z' || cmd == 'z') { p.close(); x = sx; y = sy; prev = 'Z'; }
                continue;
            }
            boolean rel = Character.isLowerCase(cmd);
            char C = Character.toUpperCase(cmd);
            float ox = rel ? x : 0, oy = rel ? y : 0;
            int need = C == 'H' || C == 'V' ? 1 : C == 'C' ? 6 : C == 'S' || C == 'Q' ? 4 : C == 'A' ? 7 : 2;
            if (i + need > tk.size()) break;
            float[] a = new float[need];
            for (int j = 0; j < need; j++) a[j] = Float.parseFloat(tk.get(i + j));
            i += need;
            switch (C) {
                case 'M': x = ox + a[0]; y = oy + a[1]; p.moveTo(x, y); sx = x; sy = y; cmd = rel ? 'l' : 'L'; break;
                case 'L': x = ox + a[0]; y = oy + a[1]; p.lineTo(x, y); break;
                case 'H': x = ox + a[0]; p.lineTo(x, y); break;
                case 'V': y = oy + a[0]; p.lineTo(x, y); break;
                case 'C': p.cubicTo(ox + a[0], oy + a[1], ox + a[2], oy + a[3], ox + a[4], oy + a[5]); lx = ox + a[2]; ly = oy + a[3]; x = ox + a[4]; y = oy + a[5]; break;
                case 'S': { float x1 = prev == 'C' || prev == 'S' ? 2 * x - lx : x, y1 = prev == 'C' || prev == 'S' ? 2 * y - ly : y; p.cubicTo(x1, y1, ox + a[0], oy + a[1], ox + a[2], oy + a[3]); lx = ox + a[0]; ly = oy + a[1]; x = ox + a[2]; y = oy + a[3]; break; }
                case 'Q': p.quadTo(ox + a[0], oy + a[1], ox + a[2], oy + a[3]); x = ox + a[2]; y = oy + a[3]; break;
                case 'A': { float nx = ox + a[5], ny = oy + a[6]; arcSvg(p, x, y, a[0], a[1], a[3] != 0, a[4] != 0, nx, ny); x = nx; y = ny; break; }
            }
            prev = C;
        }
        return p;
    }
    static double angU(double ux, double uy, double vx, double vy) { return Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy); }
    static void arcSvg(Path p, float x0, float y0, double rx, double ry, boolean large, boolean sweep, float x, float y) {
        if (rx == 0 || ry == 0) { p.lineTo(x, y); return; }
        double dx2 = (x0 - x) / 2.0, dy2 = (y0 - y) / 2.0;
        double lam = dx2 * dx2 / (rx * rx) + dy2 * dy2 / (ry * ry);
        if (lam > 1) { double s = Math.sqrt(lam); rx *= s; ry *= s; }
        double rxs = rx * rx, rys = ry * ry, num = rxs * rys - rxs * dy2 * dy2 - rys * dx2 * dx2, den = rxs * dy2 * dy2 + rys * dx2 * dx2;
        double co = den == 0 ? 0 : Math.sqrt(Math.max(0, num / den));
        if (large == sweep) co = -co;
        double cxp = co * rx * dy2 / ry, cyp = -co * ry * dx2 / rx;
        double cx = cxp + (x0 + x) / 2.0, cy = cyp + (y0 + y) / 2.0;
        double th1 = angU(1, 0, (dx2 - cxp) / rx, (dy2 - cyp) / ry), dth = angU((dx2 - cxp) / rx, (dy2 - cyp) / ry, (-dx2 - cxp) / rx, (-dy2 - cyp) / ry);
        if (!sweep && dth > 0) dth -= 2 * Math.PI; else if (sweep && dth < 0) dth += 2 * Math.PI;
        p.arcTo(new RectF((float) (cx - rx), (float) (cy - ry), (float) (cx + rx), (float) (cy + ry)), (float) Math.toDegrees(th1), (float) Math.toDegrees(dth), false);
    }
    static PendingIntent act(Context c, int req, String a) {
        Intent i = new Intent(c, MainActivity.class).setAction("it.viaticum.app.ACT_" + a).putExtra("via_act", a);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(c, req, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }
    static String safe(String s) { return s == null ? "" : s.replace("%", ""); }
    static RemoteViews r2(Context c, int id, String title, String sub, Bitmap img) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_r2);
        v.setTextViewText(R.id.title, title);
        v.setTextViewText(R.id.sub, sub == null ? "" : sub);
        v.setViewVisibility(R.id.sub, sub == null || sub.isEmpty() ? View.GONE : View.VISIBLE);
        v.setViewVisibility(R.id.chrono, View.GONE);
        if (img != null) { v.setImageViewBitmap(R.id.img, img); v.setViewVisibility(R.id.img, View.VISIBLE); } else v.setViewVisibility(R.id.img, View.GONE);
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    static RemoteViews r4(Context c, int id, String title, String[] rows, Bitmap img) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_r4);
        v.setTextViewText(R.id.title, title);
        v.removeAllViews(R.id.flip);
        if (rows != null) for (String r : rows) if (r != null && !r.isEmpty()) v.addView(R.id.flip, row(c, r));
        v.setViewVisibility(R.id.chrono, View.GONE);
        v.setViewVisibility(R.id.go, View.GONE);
        if (img != null) { v.setImageViewBitmap(R.id.img, img); v.setViewVisibility(R.id.img, View.VISIBLE); } else v.setViewVisibility(R.id.img, View.GONE);
        v.setOnClickPendingIntent(R.id.root, openApp(c, id));
        return v;
    }
    /* conto alla rovescia (o tempo trascorso, se up) sotto il titolo, solo entro 3 ore */
    static void rCh(RemoteViews v, long target, String fmt, boolean up, boolean hideSub) {
        long now = System.currentTimeMillis();
        if (!up && (target <= now || target - now >= 3 * 3600000L)) return;
        long base = SystemClock.elapsedRealtime() + (target - now);
        v.setChronometer(R.id.chrono, base, safe(fmt).replace("{s}", "%s"), true);
        if (Build.VERSION.SDK_INT >= 24) v.setChronometerCountDown(R.id.chrono, !up);
        v.setViewVisibility(R.id.chrono, View.VISIBLE);
        if (hideSub) v.setViewVisibility(R.id.sub, View.GONE);
    }
    static void goBtn(RemoteViews v, PendingIntent pi, String t) {
        v.setTextViewText(R.id.go, t);
        v.setTextColor(R.id.go, TA);
        v.setViewVisibility(R.id.go, View.VISIBLE);
        v.setOnClickPendingIntent(R.id.go, pi);
    }
    static String how(JSONObject s) {
        int lm = s.optInt("lm");
        if (lm <= 0) return "";
        return "walk".equals(s.optString("mo")) ? lm + " min a piedi" : lm + " min con i mezzi";
    }
    static JSONObject nextFlight(JSONObject o, long now) {
        JSONArray fl = o.optJSONArray("flights");
        if (fl != null) for (int i = 0; i < fl.length(); i++) { JSONObject x = fl.optJSONObject(i); if (x != null && x.optLong("arr") > now) return x; }
        return null;
    }
    /* le carte d'imbarco del volo, da aprire grandi */
    static PendingIntent bpPi(Context c, JSONObject f, int req) {
        JSONArray bp = f.optJSONArray("bp");
        if (bp == null || bp.length() == 0) return null;
        long imb = f.optLong("imb");
        JSONArray l = new JSONArray();
        for (int i = 0; i < bp.length(); i++) {
            JSONObject x = bp.optJSONObject(i);
            if (x == null) continue;
            try {
                JSONObject y = new JSONObject();
                y.put("t", x.optString("t")); y.put("f", x.optString("f"));
                y.put("n", "Carta d'imbarco · " + f.optString("from") + " → " + f.optString("to"));
                String who = x.optString("p"), seat = x.optString("s");
                y.put("s", who + (seat.isEmpty() ? "" : (who.isEmpty() ? "" : " · ") + "posto " + seat) + (imb > 0 ? " · imbarco " + hm(imb) : ""));
                l.put(y);
            } catch (Exception e) {}
        }
        if (l.length() == 0) return null;
        Intent qi = new Intent(c, VwQrActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK).putExtra("list", l.toString());
        return PendingIntent.getActivity(c, req, qi, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }
    static float fracOf(JSONArray st, int i, long now) {
        JSONObject s = st.optJSONObject(i);
        long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
        long prevEnd = i > 0 ? st.optJSONObject(i - 1).optLong("t") + st.optJSONObject(i - 1).optInt("d") * 60000L : now - 1800000L;
        float f = now >= t ? (float) (now - t) / Math.max(1, e - t) : (float) (now - prevEnd) / Math.max(1, t - prevEnd);
        return Math.max(.04f, Math.min(1f, f));
    }
    static long day0(String ymd) {
        try { return new SimpleDateFormat("yyyy-MM-dd", Locale.ITALY).parse(ymd).getTime(); } catch (Exception e) { return 0; }
    }
    static int dDiff(long a, long b) { return (int) Math.round((b - a) / 86400000.0); }
    static boolean rainy(int w) { return (w >= 51 && w <= 67) || (w >= 80 && w <= 82) || w >= 95; }
    static String wxName(int w) {
        if (w == 0) return "sereno";
        if (w <= 2) return "poco nuvoloso";
        if (w == 3) return "nuvoloso";
        if (w <= 48) return "nebbia";
        if (w <= 57) return "pioviggine";
        if (w <= 67) return "pioggia";
        if (w <= 77) return "neve";
        if (w <= 82) return "rovesci";
        return "temporale";
    }
    static String wxIco(int w) { return rainy(w) ? "rain" : w <= 2 ? "sun" : "cloud"; }
    /* la linea della giornata: tappe come puntini, la parte fatta piena, «sei qui» dorato */
    static Bitmap lineBmp(Context c, int wpx, int n, float pos, int done) {
        float d = dens(c);
        int h = Math.round(22 * d), w = Math.max(Math.round(120 * d), wpx);
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas k = new Canvas(b);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        float r = 6 * d, x0 = r + 3 * d, x1 = w - r - 3 * d, cy = h / 2f;
        p.setStrokeCap(Paint.Cap.ROUND);
        p.setStrokeWidth(3.5f * d);
        p.setColor(0x55FFFFFF);
        k.drawLine(x0, cy, x1, cy, p);
        float px = x0 + (x1 - x0) * Math.max(0f, Math.min(1f, pos));
        p.setColor(W1);
        k.drawLine(x0, cy, px, cy, p);
        for (int i = 0; i < n; i++) {
            float x = n == 1 ? (x0 + x1) / 2f : x0 + (x1 - x0) * i / (float) (n - 1);
            boolean full = i < done || x <= px + 0.5f;
            p.setStyle(Paint.Style.FILL);
            p.setColor(full ? W1 : TB);
            k.drawCircle(x, cy, r, p);
            if (!full) { p.setStyle(Paint.Style.STROKE); p.setStrokeWidth(2.2f * d); p.setColor(0xB3FFFFFF); k.drawCircle(x, cy, r - 1.1f * d, p); p.setStrokeWidth(3.5f * d); }
        }
        p.setStyle(Paint.Style.FILL);
        p.setColor(TB);
        k.drawCircle(px, cy, 9.5f * d, p);
        p.setColor(0xFFFFE08A);
        k.drawCircle(px, cy, 7.5f * d, p);
        return b;
    }

    static RemoteViews rowW(Context c, AppWidgetManager m, JSONObject o, int id, String k) {
        long now = System.currentTimeMillis();
        JSONArray st = o.optJSONArray("stops");
        boolean none = noTrip(o);
        String city = o.optString("city");
        switch (k) {
            case "next_r": {
                if (none) return r2(c, id, "Nessun viaggio", "Tocca per pianificarne uno", ico(c, "pin", 32, CHIP));
                int i = curIdx(st, now, false);
                if (i < 0) return r2(c, id, "Viaggio concluso", "Bentornato da " + city, ico(c, "pin", 32, CHIP));
                JSONObject s = st.optJSONObject(i);
                long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
                boolean on = now >= t;
                long mins = Math.max(1, (t - now) / 60000);
                RemoteViews v = r2(c, id, s.optString("n"), on ? "adesso · fino alle " + hm(e) : hm(t) + " · " + inTxt(t - now), ring(c, fracOf(st, i, now), on ? "ORA" : mins > 99 ? "" : mins + "′", s));
                rCh(v, on ? e : t, on ? "finisce tra {s}" : hm(t) + " · tra {s}", false, true);
                if (s.optInt("ret") != 1 && s.optJSONArray("ll") != null) v.setOnClickPendingIntent(R.id.root, maps(c, 8000 + id, s));
                return v;
            }
            case "leave": {
                if (none) return r2(c, id, "Esci adesso", "Nessun viaggio in programma", ico(c, "walk", 32, CHIP));
                JSONObject s = null;
                for (int i = 0; i < st.length(); i++) { JSONObject x = st.optJSONObject(i); if (x != null && x.optLong("t") > now) { s = x; break; } }
                if (s == null) return r2(c, id, "Viaggio concluso", "Bentornato da " + city, ico(c, "walk", 32, CHIP));
                long t = s.optLong("t"), lv = t - s.optInt("lm") * 60000L, dl = lv - now;
                String dest = safe(s.optString("n")), hw = how(s);
                RemoteViews v;
                if (dl > 15 * 60000L) {
                    v = r2(c, id, "Esci alle " + hm(lv), "per " + dest + (hw.isEmpty() ? "" : " · " + hw), ico(c, "walk", 32, CHIP));
                    rCh(v, lv, "tra {s}", false, true);
                } else if (dl > 0) {
                    TA = 0xFFC2410C; TB = 0xFF7C2D12;
                    v = r2(c, id, "Esci adesso", "per " + dest + (hw.isEmpty() ? "" : " · " + hw), ico(c, "walk", 32, CHIP));
                    rCh(v, lv, "tra {s}", false, true);
                } else {
                    TA = 0xFFB3261E; TB = 0xFF6B1111;
                    v = r2(c, id, "Sei in ritardo", "tocca per ripianificare", ico(c, "clock", 32, CHIP));
                    rCh(v, lv, "da {s} · tocca", true, true);
                    v.setOnClickPendingIntent(R.id.root, act(c, 8100 + id, "late"));
                    return v;
                }
                if (s.optInt("ret") != 1 && s.optJSONArray("ll") != null) v.setOnClickPendingIntent(R.id.root, maps(c, 8100 + id, s));
                return v;
            }
            case "fx_r": {
                if (none) return r2(c, id, "Cambio veloce", "Nessun viaggio in programma", ico(c, "swap", 32, CHIP));
                JSONObject cu = o.optJSONObject("cur");
                if (cu == null) return r2(c, id, "Si paga in euro", "A " + city + " niente da cambiare", ico(c, "swap", 32, CHIP));
                double e = cu.optDouble("e", 1);
                String s = cu.optString("s");
                SharedPreferences pr = c.getSharedPreferences(PREFS, 0);
                double amt = pr.getFloat("fx_amt", 20f);
                boolean toEur = pr.getBoolean("fx_dir", false);
                RemoteViews v = r2(c, id, toEur ? num(amt) + " " + s + " = " + num(amt * e) + " €" : num(amt) + " € = " + num(amt / e) + " " + s, "1 € = " + num(1 / e) + " " + s, ico(c, "swap", 32, CHIP));
                Intent in = new Intent(c, VwFxActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                v.setOnClickPendingIntent(R.id.root, PendingIntent.getActivity(c, 8200 + id, in, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
                return v;
            }
            case "today": {
                JSONObject sp = o.optJSONObject("spend");
                if (none || sp == null) return r2(c, id, "Speso oggi", "Pianifica un viaggio", ico(c, "wallet", 32, CHIP));
                double dv = sp.optDouble("day", 0), db = sp.optDouble("dayB", 0);
                String sub;
                if (db > 0) sub = dv <= db ? "restano " + eur(Math.round(db - dv)) : "oltre di " + eur(Math.round(dv - db));
                else sub = "in tutto " + eur(sp.optDouble("tot"));
                if (db > 0 && dv > db) { TA = 0xFFB3261E; TB = 0xFF6B1111; }
                Bitmap rg = db > 0 ? ring(c, Math.max(.04f, (float) Math.min(1, dv / db)), Math.round(100 * dv / db) + "%", sp) : ico(c, "wallet", 32, CHIP);
                RemoteViews v = r2(c, id, eur(dv) + " oggi", sub, rg);
                v.setOnClickPendingIntent(R.id.root, act(c, 8300 + id, "spend"));
                return v;
            }
            case "count": {
                if (none) return r2(c, id, "Nessun viaggio", "Tocca per pianificarne uno", ico(c, "cal", 32, CHIP));
                long f = day0(o.optString("from")), to = day0(o.optString("to")), td = day0(new SimpleDateFormat("yyyy-MM-dd", Locale.ITALY).format(new Date(now)));
                if (f == 0) return r2(c, id, city, "Apri l'app per aggiornare", ico(c, "cal", 32, CHIP));
                if (to < f) to = f;
                int dTo = dDiff(td, f), dEnd = dDiff(td, to), N = dDiff(f, to) + 1;
                SimpleDateFormat dM = new SimpleDateFormat("d MMMM", Locale.ITALY), dd = new SimpleDateFormat("d", Locale.ITALY), dMs = new SimpleDateFormat("d MMM", Locale.ITALY);
                String range = N == 1 ? dMs.format(new Date(f)) : new SimpleDateFormat("MM", Locale.ITALY).format(new Date(f)).equals(new SimpleDateFormat("MM", Locale.ITALY).format(new Date(to))) ? dd.format(new Date(f)) + "–" + dMs.format(new Date(to)) : dMs.format(new Date(f)) + " – " + dMs.format(new Date(to));
                if (dTo > 0) return r2(c, id, dTo == 1 ? "Si parte domani" : "Tra " + dTo + " giorni", city + " · " + range, ring(c, Math.max(.04f, 1f - Math.min(1f, dTo / 30f)), String.valueOf(dTo), null));
                if (dEnd >= 0) {
                    int g = 1 - dTo;
                    return r2(c, id, N == 1 ? "Oggi a " + city : "Giorno " + g + " di " + N, city + " · " + (dEnd == 0 ? (N == 1 ? "buona giornata" : "ultimo giorno") : "ancora " + dEnd + (dEnd == 1 ? " giorno" : " giorni")), ring(c, g / (float) N, g + "/" + N, null));
                }
                return r2(c, id, "Bentornato", "Il viaggio a " + city + " è finito", ico(c, "cal", 32, CHIP));
            }
            case "late": {
                if (none) return r2(c, id, "In ritardo?", "Serve durante il viaggio", ico(c, "clock", 32, CHIP));
                JSONObject s = null;
                for (int i = 0; i < st.length(); i++) { JSONObject x = st.optJSONObject(i); if (x != null && x.optInt("ret") != 1 && x.optLong("t") > now && sameDay(x.optLong("t"), now)) { s = x; break; } }
                if (s == null) return r2(c, id, "In ritardo?", "Oggi niente da spostare", ico(c, "clock", 32, CHIP));
                RemoteViews v = r2(c, id, "In ritardo?", "Tocca e sposto le tappe", ico(c, "clock", 32, CHIP));
                v.setOnClickPendingIntent(R.id.root, act(c, 8400 + id, "late"));
                return v;
            }
            case "line": {
                RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_line);
                v.setOnClickPendingIntent(R.id.root, openApp(c, id));
                int i = none ? -1 : curIdx(st, now, true);
                if (i < 0) {
                    v.setTextViewText(R.id.title, none ? "Nessun viaggio in programma" : "Viaggio concluso");
                    v.setTextViewText(R.id.count, none ? "tocca per pianificarne uno" : "bentornato da " + city);
                    v.setImageViewBitmap(R.id.line, lineBmp(c, Math.round(220 * dens(c)), 5, none ? 0f : 1f, none ? 0 : 5));
                    return v;
                }
                int day = st.optJSONObject(i).optInt("day");
                List<JSONObject> L = new ArrayList<>();
                for (int j = 0; j < st.length(); j++) { JSONObject x = st.optJSONObject(j); if (x != null && x.optInt("day") == day && x.optInt("meal") != 1 && x.optInt("ret") != 1) L.add(x); }
                int n = L.size(), done = 0, cur = 0;
                float pos = 0f;
                for (int j = 0; j < n; j++) {
                    long t = L.get(j).optLong("t"), e = t + L.get(j).optInt("d") * 60000L;
                    if (e <= now) done++;
                }
                float step = n > 1 ? 1f / (n - 1) : 0f;
                if (n == 1) pos = now >= L.get(0).optLong("t") ? .5f : 0f;
                else for (int j = 0; j < n; j++) {
                    long t = L.get(j).optLong("t"), e = t + L.get(j).optInt("d") * 60000L;
                    if (now < t) { if (j == 0) pos = 0f; else { long pe = L.get(j - 1).optLong("t") + L.get(j - 1).optInt("d") * 60000L; pos = step * (j - 1) + step * Math.max(0f, Math.min(1f, (float) (now - pe) / Math.max(1, t - pe))); } cur = j; break; }
                    if (now < e) { pos = step * j; cur = j; break; }
                    pos = 1f; cur = j;
                }
                JSONObject s = L.isEmpty() ? st.optJSONObject(i) : L.get(Math.min(cur, n - 1));
                long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
                boolean on = now >= t && now < e;
                v.setTextViewText(R.id.title, (on ? "Adesso: " + s.optString("n") + " · fino alle " + hm(e) : "Prossima: " + s.optString("n") + " · " + hm(t)));
                String when = sameDay(t, now) ? "" : sameDay(t, now + 86400000L) ? "domani · " : new SimpleDateFormat("EEEE", Locale.ITALY).format(new Date(t)) + " · ";
                v.setTextViewText(R.id.count, when + done + " di " + n + " tappe");
                Bundle op = m.getAppWidgetOptions(id);
                int wdp = op != null ? op.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 250) : 250;
                if (wdp <= 0) wdp = 250;
                v.setImageViewBitmap(R.id.line, lineBmp(c, Math.round((wdp - 32) * dens(c)), Math.max(1, n), pos, done));
                return v;
            }
            case "go": {
                if (none) return r4(c, id, "Nessun viaggio in programma", new String[]{"Tocca per pianificarne uno"}, ico(c, "pin", 40, CHIP));
                int i = curIdx(st, now, false);
                if (i < 0) return r4(c, id, "Viaggio concluso", new String[]{"Bentornato da " + city}, ico(c, "pin", 40, CHIP));
                JSONObject s = st.optJSONObject(i);
                long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
                boolean on = now >= t;
                long mins = Math.max(1, (t - now) / 60000);
                List<String> rows = new ArrayList<>();
                String hw = how(s);
                if (!hw.isEmpty()) rows.add(hw);
                JSONArray ln = s.optJSONArray("ln");
                if (ln != null && ln.length() > 0) { JSONObject l = ln.optJSONObject(0); rows.add(l.optString("n") + " · " + l.optString("a") + " → " + l.optString("b")); }
                if (s.optDouble("tk") > 0) rows.add("Biglietto " + eur(s.optDouble("tk")) + " a testa");
                if (rows.isEmpty()) rows.add(s.optInt("d") + " min di visita");
                RemoteViews v = r4(c, id, s.optString("n") + " · " + (on ? "fino alle " + hm(e) : hm(t)), rows.toArray(new String[0]), ring(c, fracOf(st, i, now), on ? "ORA" : mins > 99 ? "" : mins + "′", s));
                rCh(v, on ? e : t, on ? "finisce tra {s}" : "tra {s}", false, false);
                if (s.optInt("ret") != 1 && s.optJSONArray("ll") != null) goBtn(v, maps(c, 8500 + id, s), "Vai");
                return v;
            }
            case "fly": {
                JSONObject f = none ? null : nextFlight(o, now);
                if (f == null) return r4(c, id, none ? "Nessun viaggio in programma" : "Nessun volo in arrivo", new String[]{none ? "Tocca per pianificarne uno" : "Inserisci i voli nel viaggio"}, ico(c, "plane", 40, CHIP));
                long dep = f.optLong("dep"), arr = f.optLong("arr"), imb = f.optLong("imb");
                String a = f.optString("from").isEmpty() ? f.optString("fromN") : f.optString("from"), b = f.optString("to").isEmpty() ? f.optString("toN") : f.optString("to");
                String dt = sameDay(dep, now) ? "oggi" : sameDay(dep, now + 86400000L) ? "domani" : new SimpleDateFormat("d MMM", Locale.ITALY).format(new Date(dep));
                List<String> rows = new ArrayList<>();
                rows.add((f.optString("num").isEmpty() ? "" : f.optString("num") + " · ") + dt + (imb > 0 && now < imb ? " · imbarco " + hm(imb) : ""));
                JSONArray bp = f.optJSONArray("bp");
                if (bp != null && bp.length() > 0) { JSONObject x = bp.optJSONObject(0); String seat = x.optString("s"), who = x.optString("p"); if (!seat.isEmpty() || !who.isEmpty()) rows.add((seat.isEmpty() ? "" : "Posto " + seat) + (who.isEmpty() ? "" : (seat.isEmpty() ? "" : " · ") + who) + (bp.length() > 1 ? " · +" + (bp.length() - 1) : "")); }
                rows.add("Arrivo " + hm(arr) + ("r".equals(f.optString("k")) ? " · volo di ritorno" : ""));
                String ttl = a.isEmpty() ? "Volo per " + b : b.isEmpty() ? "Ritorno da " + a : a + " → " + b;
                RemoteViews v = r4(c, id, ttl + " · " + hm(dep), rows.toArray(new String[0]), ico(c, "plane", 40, CHIP));
                if (now < imb) rCh(v, imb, "imbarco tra {s}", false, false);
                else if (now < dep) rCh(v, dep, "decollo tra {s}", false, false);
                else rCh(v, arr, "atterri tra {s}", false, false);
                PendingIntent pi = bpPi(c, f, 8600 + id);
                if (pi != null) goBtn(v, pi, "Carta");
                return v;
            }
            case "acts": {
                RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.vw_acts);
                int[] ai = {R.id.a1, R.id.a2, R.id.a3, R.id.a4}, li = {R.id.l1, R.id.l2, R.id.l3, R.id.l4}, ci = {R.id.c1, R.id.c2, R.id.c3, R.id.c4};
                String[] ic = {"plus", "map", "ticket", "clock"}, lb = {"Spesa", "Mappa", "Biglietti", "In ritardo"}, ak = {"spend", "map", "tix", "late"};
                for (int i = 0; i < 4; i++) {
                    v.setImageViewBitmap(ai[i], ico(c, ic[i], 34, CHIP));
                    v.setTextViewText(li[i], lb[i]);
                    v.setOnClickPendingIntent(ci[i], act(c, 8700 + id * 4 + i, ak[i]));
                }
                v.setOnClickPendingIntent(R.id.root, openApp(c, id));
                /* biglietti: apro subito il codice del prossimo ingresso o la carta d'imbarco, se ci sono */
                PendingIntent tp = null;
                if (!none) {
                    for (int i = 0; i < st.length() && tp == null; i++) {
                        JSONObject x = st.optJSONObject(i);
                        JSONObject qr = x != null ? x.optJSONObject("qr") : null;
                        if (qr != null && x.optLong("t") + x.optInt("d") * 60000L > now) {
                            Intent qi = new Intent(c, VwQrActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK).putExtra("t", qr.optString("t")).putExtra("f", qr.optString("f")).putExtra("n", x.optString("n"));
                            tp = PendingIntent.getActivity(c, 8690 + id, qi, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
                        }
                    }
                    JSONObject f = nextFlight(o, now);
                    if (f != null && f.optLong("dep") - now < 24 * 3600000L) { PendingIntent bpi = bpPi(c, f, 8680 + id); if (bpi != null) tp = bpi; }
                }
                if (tp != null) v.setOnClickPendingIntent(R.id.c3, tp);
                return v;
            }
            case "wx": {
                if (none) return r4(c, id, "Meteo e piano B", new String[]{"Pianifica un viaggio"}, ico(c, "sun", 40, CHIP));
                JSONArray wx = o.optJSONArray("wx");
                JSONObject cur = null;
                if (wx != null) {
                    JSONArray r0 = null;
                    for (int i = 0; i < wx.length(); i++) { JSONArray r = wx.optJSONArray(i); if (r != null && r.optLong(0) + 3600000L > now) { r0 = r; break; } }
                    if (r0 != null) { try { cur = new JSONObject().put("t", r0.optLong(0)).put("w", r0.optInt(1)).put("tp", r0.optInt(2)); } catch (Exception ignored) {} }
                }
                if (cur == null) return r4(c, id, "Meteo a " + city, new String[]{"Le previsioni ora per ora arrivano a viaggio vicino", "Apri l'app con internet per aggiornarle"}, ico(c, "cloud", 40, CHIP));
                int w0 = cur.optInt("w"), tp0 = cur.optInt("tp");
                long rs = 0, re = 0;
                int mx = tp0;
                for (int i = 0; i < wx.length(); i++) {
                    JSONArray r = wx.optJSONArray(i);
                    if (r == null) continue;
                    long t = r.optLong(0);
                    if (t + 3600000L <= now || t > now + 12 * 3600000L) continue;
                    mx = Math.max(mx, r.optInt(2));
                    boolean wet = rainy(r.optInt(1)) || (!r.isNull(3) && r.optInt(3) >= 60);
                    if (wet && rs == 0) rs = t;
                    if (!wet && rs > 0 && re == 0) re = t;
                }
                String rm = o.optString("rainM");
                RemoteViews v;
                if (rs > 0) {
                    boolean nowWet = rs <= now;
                    String t1 = nowWet ? "Piove · " + tp0 + "°" : "Pioggia dalle " + hm(rs);
                    v = r4(c, id, t1, new String[]{rm.isEmpty() ? "Piano B: scegli una tappa al coperto" : "Piano B · " + rm, nowWet ? (re > 0 ? "Smette verso le " + hm(re) : "Pioggia per qualche ora") : "Ora " + tp0 + "° · " + wxName(w0), "Porta l'ombrello"}, ico(c, "rain", 40, CHIP));
                    goBtn(v, openApp(c, 8800 + id), "Piano B");
                } else {
                    v = r4(c, id, tp0 + "° · " + wxName(w0), new String[]{"Niente pioggia nelle prossime 12 ore", "Massima " + mx + "° · " + city}, ico(c, wxIco(w0), 40, CHIP));
                }
                return v;
            }
            case "meal": {
                JSONArray ml = o.optJSONArray("meals");
                JSONObject mm = null;
                if (!none && ml != null) for (int i = 0; i < ml.length(); i++) { JSONObject x = ml.optJSONObject(i); if (x != null && x.optLong("t") + x.optInt("d") * 60000L > now && !x.optString("vn").isEmpty()) { mm = x; break; } }
                if (mm == null) return r4(c, id, none ? "Nessun viaggio in programma" : "Pasti finiti", new String[]{none ? "Tocca per pianificarne uno" : "Buon rientro da " + city}, ico(c, "fork", 40, CHIP));
                long t = mm.optLong("t");
                RemoteViews v = r4(c, id, mm.optString("n") + " · " + (now >= t ? "adesso" : hm(t)) + " · " + mm.optString("vn"), new String[]{mm.optString("va"), mm.optString("vp"), mm.optString("vd")}, ico(c, "fork", 40, CHIP));
                rCh(v, t, "tra {s}", false, false);
                if (mm.optJSONArray("ll") != null || !mm.optString("q").isEmpty()) {
                    JSONObject q = new JSONObject();
                    try { q.put("q", mm.optString("q")); q.put("ll", mm.optJSONArray("ll")); q.put("mo", "walk"); q.put("lm", 5); } catch (Exception ignored) {}
                    goBtn(v, maps(c, 8900 + id, q), "Vai");
                }
                return v;
            }
        }
        return r2(c, id, "Viaticum", "Tocca per aprire", null);
    }
}
