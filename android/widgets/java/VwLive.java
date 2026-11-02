package it.viaticum.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.Icon;
import android.os.Build;
import android.os.Bundle;

import org.json.JSONArray;
import org.json.JSONObject;

import java.lang.reflect.Method;

/* v291 notifica «in corso» (Live Update di Android 16): sui Samsung con One UI 8 finisce nella Now Bar.
   Solo in due momenti: la giornata di viaggio in corso e il giorno del volo, dall'imbarco all'atterraggio. */
public final class VwLive {
    static final String CH = "via_live", DISMISS = "it.viaticum.app.LIVE_DISMISS";
    static final int NID = 4242;
    private VwLive() {}

    static boolean enabled(Context c) { return c.getSharedPreferences(VwUtil.PREFS, 0).getBoolean("live_on", true); }

    static void channel(Context c, NotificationManager nm) {
        if (Build.VERSION.SDK_INT < 26 || nm.getNotificationChannel(CH) != null) return;
        NotificationChannel ch = new NotificationChannel(CH, "Viaggio in corso", NotificationManager.IMPORTANCE_LOW);
        ch.setDescription("La prossima tappa e il volo del giorno, sempre in vista (anche nella Now Bar dei Samsung)");
        ch.setShowBadge(false);
        nm.createNotificationChannel(ch);
    }

    /* ricalcola cosa mostrare: chiamata a ogni aggiornamento dei widget e a ogni cambio di tappa */
    public static void update(Context c) {
        try {
            NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm == null) return;
            if (!enabled(c)) { nm.cancel(NID); return; }
            JSONObject o = VwUtil.snap(c);
            VwUtil.theme(o);
            long now = System.currentTimeMillis();
            Notification n = flight(c, o, now);
            if (n == null) n = day(c, o, now);
            if (n == null) { nm.cancel(NID); return; }
            channel(c, nm);
            nm.notify(NID, n);
        } catch (Throwable ignored) {}
    }

    /* l'utente l'ha tolta: non la ripropongo per lo stesso momento (stessa giornata o stesso volo) */
    static boolean skipped(Context c, String key) { return key.equals(c.getSharedPreferences(VwUtil.PREFS, 0).getString("live_skip", "")); }
    public static void dismissed(Context c, Intent i) {
        String k = i.getStringExtra("key");
        if (k != null) c.getSharedPreferences(VwUtil.PREFS, 0).edit().putString("live_skip", k).apply();
    }

    static Notification.Builder base(Context c, String key) {
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(c, CH) : new Notification.Builder(c);
        b.setSmallIcon(R.drawable.ic_stat_viaticum)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setShowWhen(true)
            .setCategory(Notification.CATEGORY_STATUS)
            .setVisibility(Notification.VISIBILITY_PUBLIC)
            .setContentIntent(VwUtil.openApp(c, 9100));
        Intent d = new Intent(c, VwNext.class).setAction(DISMISS).putExtra("key", key);
        b.setDeleteIntent(PendingIntent.getBroadcast(c, 9101, d, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
        if (Build.VERSION.SDK_INT >= 21) b.setColor(VwUtil.TA);
        /* richiesta di promozione a Live Update (Android 16): la chiave è la stessa di Notification.EXTRA_REQUEST_PROMOTED_ONGOING */
        Bundle x = new Bundle();
        x.putBoolean("android.requestPromotedOngoing", true);
        b.addExtras(x);
        return b;
    }
    /* testo breve nella pillola della barra di stato (Android 16), se il telefono lo conosce */
    static void chip(Notification.Builder b, String t) {
        try { Method m = b.getClass().getMethod("setShortCriticalText", String.class); m.invoke(b, t); } catch (Throwable ignored) {}
    }
    static void countdown(Notification.Builder b, long target) {
        b.setWhen(target).setUsesChronometer(true);
        if (Build.VERSION.SDK_INT >= 24) b.setChronometerCountDown(true);
    }
    static void action(Notification.Builder b, Context c, String label, PendingIntent pi) {
        if (pi == null) return;
        if (Build.VERSION.SDK_INT >= 23) b.addAction(new Notification.Action.Builder(Icon.createWithResource(c, R.drawable.ic_stat_viaticum), label, pi).build());
        else b.addAction(R.drawable.ic_stat_viaticum, label, pi);
    }
    static String mins(long ms) {
        long m = Math.max(1, Math.round(ms / 60000.0));
        return m < 60 ? m + " min" : (m / 60) + " h" + (m % 60 > 0 ? " " + (m % 60) : "");
    }

    /* v296 prova: una notifica di esempio subito, per vedere com'è e far comparire Viaticum tra le app con notifiche live.
       Sparisce da sola dopo 10 minuti */
    public static void demo(Context c) {
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        channel(c, nm);
        long now = System.currentTimeMillis(), t = now + 10 * 60000L;
        Notification.Builder nb = base(c, "demo");
        String text = "Prova di Viaticum: così vedrai la prossima tappa durante il viaggio";
        nb.setContentTitle("Galleria Borghese alle " + VwUtil.hm(t)).setContentText(text).setStyle(new Notification.BigTextStyle().bigText(text));
        countdown(nb, t);
        chip(nb, "prova");
        nb.setProgress(4, 1, false);
        if (Build.VERSION.SDK_INT >= 26) nb.setTimeoutAfter(10 * 60000L);
        nm.notify(NID, nb.build());
    }

    /* il giorno del volo: da un'ora prima dell'imbarco all'atterraggio */
    static Notification flight(Context c, JSONObject o, long now) {
        if (VwUtil.noTrip(o)) return null;
        JSONObject f = VwUtil.nextFlight(o, now);
        if (f == null) return null;
        long dep = f.optLong("dep"), arr = f.optLong("arr"), imb = f.optLong("imb");
        long start = (imb > 0 ? imb : dep - 45 * 60000L) - 60 * 60000L;
        if (now < start || now > arr) return null;
        String key = "fl:" + dep;
        if (skipped(c, key)) return null;
        String a = f.optString("from"), b = f.optString("to");
        String route = a.isEmpty() ? "Volo per " + b : b.isEmpty() ? "Ritorno da " + a : a + " → " + b;
        String num = f.optString("num");
        Notification.Builder nb = base(c, key);
        String title, text;
        long target;
        if (imb > 0 && now < imb) { title = "Imbarco alle " + VwUtil.hm(imb); target = imb; chip(nb, "imb " + VwUtil.hm(imb)); }
        else if (now < dep) { title = "Imbarco in corso"; target = dep; chip(nb, "decollo " + VwUtil.hm(dep)); }
        else { title = "In volo"; target = arr; chip(nb, "atterri " + VwUtil.hm(arr)); }
        JSONArray bp = f.optJSONArray("bp");
        String seat = "";
        if (bp != null && bp.length() > 0) { JSONObject x = bp.optJSONObject(0); if (x != null && !x.optString("s").isEmpty()) seat = " · posto " + x.optString("s"); }
        text = route + (num.isEmpty() ? "" : " · " + num) + seat + " · decollo " + VwUtil.hm(dep);
        nb.setContentTitle(title).setContentText(text).setStyle(new Notification.BigTextStyle().bigText(text + "\nArrivo previsto " + VwUtil.hm(arr)));
        countdown(nb, target);
        action(nb, c, "Carta d'imbarco", VwUtil.bpPi(c, f, 9102));
        action(nb, c, "Apri il viaggio", VwUtil.openApp(c, 9103));
        return nb.build();
    }

    /* la giornata in corso: dalla mezz'ora prima della prima tappa alla fine dell'ultima, solo oggi */
    static Notification day(Context c, JSONObject o, long now) {
        if (VwUtil.noTrip(o)) return null;
        JSONArray st = o.optJSONArray("stops");
        int first = -1, last = -1;
        for (int i = 0; i < st.length(); i++) {
            JSONObject s = st.optJSONObject(i);
            if (s == null || s.optInt("ret") == 1 || !VwUtil.sameDay(s.optLong("t"), now)) continue;
            if (first < 0) first = i;
            last = i;
        }
        if (first < 0) return null;
        JSONObject fs = st.optJSONObject(first), ls = st.optJSONObject(last);
        long dStart = fs.optLong("t") - 30 * 60000L, dEnd = ls.optLong("t") + ls.optInt("d") * 60000L;
        if (now < dStart || now > dEnd) return null;
        String key = "day:" + VwUtil.day0(new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.ITALY).format(new java.util.Date(now)));
        if (skipped(c, key)) return null;
        int i = VwUtil.curIdx(st, now, false);
        if (i < 0) return null;
        JSONObject s = st.optJSONObject(i);
        long t = s.optLong("t"), e = t + s.optInt("d") * 60000L;
        boolean on = now >= t;
        int done = 0, tot = 0;
        for (int j = first; j <= last; j++) { JSONObject x = st.optJSONObject(j); if (x == null || x.optInt("meal") == 1) continue; tot++; if (x.optLong("t") + x.optInt("d") * 60000L <= now) done++; }
        Notification.Builder nb = base(c, key);
        String name = s.optString("n"), hw = VwUtil.how(s), title, text;
        boolean late = false;
        if (on) {
            title = "Adesso: " + name;
            text = "Fino alle " + VwUtil.hm(e);
            JSONObject nx = i + 1 < st.length() ? st.optJSONObject(i + 1) : null;
            if (nx != null && VwUtil.sameDay(nx.optLong("t"), now) && nx.optInt("ret") != 1) text += " · dopo: " + nx.optString("n") + " alle " + VwUtil.hm(nx.optLong("t"));
            countdown(nb, e);
            chip(nb, "fino " + VwUtil.hm(e));
        } else {
            long lv = t - s.optInt("lm") * 60000L;
            if (now >= lv) { late = lv < now - 60000L; title = late ? "Sei in ritardo per " + name : "Esci adesso per " + name; }
            else title = name + " alle " + VwUtil.hm(t);
            text = (now < lv ? "Esci alle " + VwUtil.hm(lv) : "Arrivo previsto " + VwUtil.hm(t)) + (hw.isEmpty() ? "" : " · " + hw);
            countdown(nb, now < lv ? lv : t);
            chip(nb, now < lv ? "esci " + VwUtil.hm(lv) : VwUtil.hm(t));
        }
        if (tot > 0) { nb.setProgress(tot, done, false); text += " · " + done + " di " + tot + " tappe"; }
        nb.setContentTitle(title).setContentText(text).setStyle(new Notification.BigTextStyle().bigText(text));
        if (s.optInt("ret") != 1 && s.optJSONArray("ll") != null) action(nb, c, "Portami lì", VwUtil.maps(c, 9104, s));
        action(nb, c, late ? "Ripianifica" : "Sono in ritardo", VwUtil.act(c, 9105, "late"));
        return nb.build();
    }
}
