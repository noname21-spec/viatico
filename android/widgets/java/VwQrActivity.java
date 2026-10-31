package it.viaticum.app;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.view.View;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;

import java.util.HashMap;
import java.util.Map;

/* il codice del biglietto a tutto schermo, con la luminosità al massimo */
public class VwQrActivity extends Activity {
    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        if (Build.VERSION.SDK_INT >= 27) { setShowWhenLocked(true); setTurnScreenOn(true); }
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        WindowManager.LayoutParams lp = getWindow().getAttributes();
        lp.screenBrightness = 1f;
        getWindow().setAttributes(lp);
        setContentView(R.layout.vw_qr_act);
        findViewById(R.id.qr_back).setOnClickListener(v -> finish());
        /* più codici (una carta d'imbarco per persona): «Avanti» passa al successivo */
        try { String l = getIntent().getStringExtra("list"); if (l != null) list = new JSONArray(l); } catch (Exception e) { list = null; }
        TextView nx = findViewById(R.id.qr_next);
        if (list != null && list.length() > 1) { nx.setVisibility(View.VISIBLE); nx.setOnClickListener(v -> { idx = (idx + 1) % list.length(); show(); }); }
        else nx.setVisibility(View.GONE);
        show();
    }

    private JSONArray list = null;
    private int idx = 0;

    private void show() {
        String txt = getIntent().getStringExtra("t"), fmt = getIntent().getStringExtra("f"), name = getIntent().getStringExtra("n"), sub = getIntent().getStringExtra("s");
        if (list != null && list.length() > 0) {
            JSONObject o = list.optJSONObject(idx);
            if (o != null) { txt = o.optString("t"); fmt = o.optString("f"); if (!o.optString("n").isEmpty()) name = o.optString("n"); if (!o.optString("s").isEmpty()) sub = o.optString("s"); }
            if (list.length() > 1) sub = (sub == null ? "" : sub + " · ") + (idx + 1) + " di " + list.length();
        }
        ((TextView) findViewById(R.id.qr_title)).setText(name == null ? "Biglietto" : name);
        ((TextView) findViewById(R.id.qr_sub)).setText(sub == null ? "Mostra il codice all'ingresso" : sub);
        int w = Math.min(getResources().getDisplayMetrics().widthPixels, 1200) * 86 / 100;
        Bitmap bm = code(txt, fmt, w);
        if (bm != null) ((ImageView) findViewById(R.id.qr_img)).setImageBitmap(bm);
        else ((TextView) findViewById(R.id.qr_sub)).setText("Non riesco a disegnare il codice: aprilo dall'app.");
    }

    static BarcodeFormat fmtOf(String f) {
        if ("aztec".equals(f)) return BarcodeFormat.AZTEC;
        if ("pdf417".equals(f)) return BarcodeFormat.PDF_417;
        if ("data_matrix".equals(f)) return BarcodeFormat.DATA_MATRIX;
        return BarcodeFormat.QR_CODE;
    }

    /* disegna il codice in bianco e nero, con il margine bianco intorno */
    static Bitmap code(String txt, String f, int size) {
        if (txt == null || txt.isEmpty()) return null;
        try {
            BarcodeFormat bf = fmtOf(f);
            Map<EncodeHintType, Object> h = new HashMap<>();
            h.put(EncodeHintType.MARGIN, 2);
            h.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            int hh = bf == BarcodeFormat.PDF_417 ? size / 3 : size;
            BitMatrix m = new MultiFormatWriter().encode(txt, bf, size, hh, h);
            int W = m.getWidth(), H = m.getHeight();
            int[] px = new int[W * H];
            for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) px[y * W + x] = m.get(x, y) ? Color.BLACK : Color.WHITE;
            Bitmap b = Bitmap.createBitmap(W, H, Bitmap.Config.ARGB_8888);
            b.setPixels(px, 0, W, 0, 0, W, H);
            return b;
        } catch (Exception e) {
            return null;
        }
    }
}
