package it.viaticum.app;

import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.service.quicksettings.Tile;
import android.service.quicksettings.TileService;

import org.json.JSONArray;
import org.json.JSONObject;

/* v292 riquadro nelle impostazioni rapide: «Sono in ritardo», attivo quando oggi ci sono tappe da fare */
public class VwTile extends TileService {
    @Override
    public void onStartListening() {
        Tile t = getQsTile();
        if (t == null) return;
        JSONObject s = nextToday();
        t.setState(s != null ? Tile.STATE_INACTIVE : Tile.STATE_UNAVAILABLE);
        t.setLabel("In ritardo");
        if (Build.VERSION.SDK_INT >= 29) t.setSubtitle(s != null ? "dopo: " + s.optString("n") : "nessuna tappa oggi");
        t.updateTile();
    }

    JSONObject nextToday() {
        try {
            JSONObject o = VwUtil.snap(this);
            if (VwUtil.noTrip(o)) return null;
            JSONArray st = o.optJSONArray("stops");
            long now = System.currentTimeMillis();
            for (int i = 0; i < st.length(); i++) { JSONObject x = st.optJSONObject(i); if (x != null && x.optInt("ret") != 1 && x.optLong("t") > now && VwUtil.sameDay(x.optLong("t"), now)) return x; }
        } catch (Throwable ignored) {}
        return null;
    }

    @Override
    public void onClick() {
        Intent i = new Intent(this, MainActivity.class).setAction("it.viaticum.app.ACT_late").putExtra("via_act", "late").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        if (Build.VERSION.SDK_INT >= 34) startActivityAndCollapse(PendingIntent.getActivity(this, 9200, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
        else startActivityAndCollapse(i);
    }
}
