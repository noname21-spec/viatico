package it.viaticum.app;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

/* base comune dei widget di Viaticum: ogni widget disegna se stesso, il tick aggiorna tutti */
public abstract class VwBase extends AppWidgetProvider {
    protected abstract String kind();

    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        for (int id : ids) VwUtil.render(c, m, id, kind());
        VwUtil.schedule(c);
    }

    @Override
    public void onAppWidgetOptionsChanged(Context c, AppWidgetManager m, int id, Bundle opts) {
        VwUtil.render(c, m, id, kind());
    }

    @Override
    public void onReceive(Context c, Intent i) {
        super.onReceive(c, i);
        String a = i.getAction();
        if (VwUtil.TICK.equals(a) || Intent.ACTION_TIME_CHANGED.equals(a) || Intent.ACTION_TIMEZONE_CHANGED.equals(a)) VwUtil.updateAll(c);
    }
}
