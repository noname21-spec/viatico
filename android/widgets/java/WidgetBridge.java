package it.viaticum.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

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
}
