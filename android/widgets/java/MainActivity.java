package it.viaticum.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(WidgetBridge.class);
        super.onCreate(savedInstanceState);
        take(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        if (take(intent)) {
            try { getBridge().triggerWindowJSEvent("viashare"); } catch (Exception e) {}
        }
    }

    /* «Condividi con Viaticum»: copio i file ricevuti nella cartella dell'app, la pagina li legge con ViaWidget.shared() */
    private boolean take(Intent in) {
        if (in == null) return false;
        String a = in.getAction();
        if (!Intent.ACTION_SEND.equals(a) && !Intent.ACTION_SEND_MULTIPLE.equals(a)) return false;
        ArrayList<Uri> us = new ArrayList<>();
        try {
            if (Intent.ACTION_SEND.equals(a)) { Uri u = in.getParcelableExtra(Intent.EXTRA_STREAM); if (u != null) us.add(u); }
            else { ArrayList<Uri> l = in.getParcelableArrayListExtra(Intent.EXTRA_STREAM); if (l != null) us.addAll(l); }
        } catch (Exception e) {}
        String txt = in.getStringExtra(Intent.EXTRA_TEXT);
        boolean ok = WidgetBridge.stash(this, us, in.getType(), txt);
        in.setAction(Intent.ACTION_MAIN);
        return ok;
    }
}
