package it.viaticum.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.view.WindowManager;

/* ponte tra la pagina web e i widget: la pagina manda un'istantanea del viaggio, i widget la leggono */
@CapacitorPlugin(name = "ViaWidget")
public class WidgetBridge extends Plugin {
    @PluginMethod
    public void save(PluginCall call) {
        String json = call.getString("json", "{}");
        getContext().getSharedPreferences(VwUtil.PREFS, 0).edit().putString(VwUtil.KEY, json).apply();
        VwUtil.updateAll(getContext());
        JSObject r = new JSObject();
        r.put("ok", true);
        call.resolve(r);
    }

    /* luminosità al massimo mentre si mostra il codice del biglietto */
    @PluginMethod
    public void bright(PluginCall call) {
        final boolean on = Boolean.TRUE.equals(call.getBoolean("on", false));
        getActivity().runOnUiThread(() -> {
            WindowManager.LayoutParams lp = getActivity().getWindow().getAttributes();
            lp.screenBrightness = on ? 1f : WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE;
            getActivity().getWindow().setAttributes(lp);
            if (on) getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            else getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        });
        call.resolve();
    }

    /* lo skyline della città, disegnato dalla pagina: lo uso come sfondo dei widget */
    @PluginMethod
    public void skyline(PluginCall call) {
        try {
            byte[] b = android.util.Base64.decode(call.getString("png", ""), android.util.Base64.DEFAULT);
            java.io.FileOutputStream f = new java.io.FileOutputStream(new java.io.File(getContext().getFilesDir(), "vw_sky.png"));
            f.write(b);
            f.close();
            VwUtil.SKY = null;
            VwUtil.updateAll(getContext());
            call.resolve();
        } catch (Exception e) {
            call.reject("skyline");
        }
    }
}
