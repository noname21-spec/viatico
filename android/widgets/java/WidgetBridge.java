package it.viaticum.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.view.WindowManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import com.getcapacitor.JSArray;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.RGBLuminanceSource;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.multi.GenericMultipleBarcodeReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONObject;

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

    /* v286 lettura dei codici con ZXing (QR, Aztec, PDF417, Data Matrix): più affidabile della WebView per le carte d'imbarco */
    @PluginMethod
    public void decode(PluginCall call) {
        JSArray out = new JSArray();
        try {
            byte[] b = android.util.Base64.decode(call.getString("png", ""), android.util.Base64.DEFAULT);
            Bitmap bm = BitmapFactory.decodeByteArray(b, 0, b.length);
            if (bm != null) {
                int W = bm.getWidth(), H = bm.getHeight();
                int[] px = new int[W * H];
                bm.getPixels(px, 0, W, 0, 0, W, H);
                Map<DecodeHintType, Object> h = new EnumMap<>(DecodeHintType.class);
                h.put(DecodeHintType.TRY_HARDER, Boolean.TRUE);
                h.put(DecodeHintType.POSSIBLE_FORMATS, Arrays.asList(BarcodeFormat.QR_CODE, BarcodeFormat.AZTEC, BarcodeFormat.PDF_417, BarcodeFormat.DATA_MATRIX));
                BinaryBitmap bb = new BinaryBitmap(new HybridBinarizer(new RGBLuminanceSource(W, H, px)));
                Set<String> seen = new HashSet<>();
                Result[] rs;
                try { rs = new GenericMultipleBarcodeReader(new MultiFormatReader()).decodeMultiple(bb, h); }
                catch (Exception e) { try { rs = new Result[]{ new MultiFormatReader().decode(bb, h) }; } catch (Exception e2) { rs = new Result[0]; } }
                for (Result r : rs) {
                    if (r == null || r.getText() == null || !seen.add(r.getText())) continue;
                    JSObject o = new JSObject();
                    o.put("t", r.getText());
                    BarcodeFormat f = r.getBarcodeFormat();
                    o.put("f", f == BarcodeFormat.AZTEC ? "aztec" : f == BarcodeFormat.PDF_417 ? "pdf417" : f == BarcodeFormat.DATA_MATRIX ? "data_matrix" : "qr_code");
                    com.google.zxing.ResultPoint[] pts = r.getResultPoints();
                    if (pts != null && pts.length > 0) {
                        float x0 = 1e9f, y0 = 1e9f, x1 = -1e9f, y1 = -1e9f;
                        for (com.google.zxing.ResultPoint pt : pts) { if (pt == null) continue; x0 = Math.min(x0, pt.getX()); y0 = Math.min(y0, pt.getY()); x1 = Math.max(x1, pt.getX()); y1 = Math.max(y1, pt.getY()); }
                        if (x1 > x0) { JSObject bx = new JSObject(); bx.put("x", x0); bx.put("y", y0); bx.put("w", x1 - x0); bx.put("h", Math.max(1, y1 - y0)); o.put("b", bx); }
                    }
                    out.put(o);
                }
            }
        } catch (Throwable e) {}
        JSObject r = new JSObject();
        r.put("codes", out);
        call.resolve(r);
    }

    /* file condivisi con l'app: li tengo in una cartella finché la pagina non li prende */
    static boolean stash(Context c, List<Uri> us, String type, String txt) {
        File d = new File(c.getFilesDir(), "shared");
        if (!d.exists()) d.mkdirs();
        int n = 0;
        try {
            JSONArray meta = new JSONArray(c.getSharedPreferences(VwUtil.PREFS, 0).getString("shared", "[]"));
            for (Uri u : us) {
                if (n >= 6) break;
                String mt = c.getContentResolver().getType(u);
                if (mt == null) mt = type == null ? "" : type;
                if (!mt.startsWith("image/") && !mt.equals("application/pdf")) continue;
                try (InputStream is = c.getContentResolver().openInputStream(u)) {
                    if (is == null) continue;
                    File f = new File(d, System.currentTimeMillis() + "_" + n);
                    long tot = 0;
                    try (FileOutputStream fo = new FileOutputStream(f)) {
                        byte[] buf = new byte[16384]; int k;
                        while ((k = is.read(buf)) > 0) { tot += k; if (tot > 15 * 1024 * 1024) break; fo.write(buf, 0, k); }
                    }
                    JSONObject m = new JSONObject();
                    m.put("p", f.getName());
                    m.put("m", mt);
                    meta.put(m);
                    n++;
                } catch (Exception e) {}
            }
            if (n == 0 && txt != null && !txt.trim().isEmpty()) {
                JSONObject m = new JSONObject();
                m.put("txt", txt.length() > 20000 ? txt.substring(0, 20000) : txt);
                meta.put(m);
                n++;
            }
            if (n > 0) c.getSharedPreferences(VwUtil.PREFS, 0).edit().putString("shared", meta.toString()).apply();
        } catch (Exception e) {}
        return n > 0;
    }

    @PluginMethod
    public void shared(PluginCall call) {
        Context c = getContext();
        JSArray out = new JSArray();
        try {
            JSONArray meta = new JSONArray(c.getSharedPreferences(VwUtil.PREFS, 0).getString("shared", "[]"));
            c.getSharedPreferences(VwUtil.PREFS, 0).edit().remove("shared").apply();
            File d = new File(c.getFilesDir(), "shared");
            for (int i = 0; i < meta.length(); i++) {
                JSONObject m = meta.optJSONObject(i);
                if (m == null) continue;
                JSObject o = new JSObject();
                if (m.has("txt")) { o.put("txt", m.optString("txt")); out.put(o); continue; }
                File f = new File(d, m.optString("p"));
                if (!f.exists()) continue;
                ByteArrayOutputStream bo = new ByteArrayOutputStream();
                try (FileInputStream fi = new FileInputStream(f)) { byte[] buf = new byte[16384]; int k; while ((k = fi.read(buf)) > 0) bo.write(buf, 0, k); }
                f.delete();
                o.put("m", m.optString("m"));
                o.put("b64", android.util.Base64.encodeToString(bo.toByteArray(), android.util.Base64.NO_WRAP));
                out.put(o);
            }
        } catch (Exception e) {}
        JSObject r = new JSObject();
        r.put("files", out);
        call.resolve(r);
    }

    /* v286 salvataggio di un file (PDF, calendario, copia dei dati) nella cartella Download */
    @PluginMethod
    public void saveFile(PluginCall call) {
        try {
            byte[] b = android.util.Base64.decode(call.getString("b64", ""), android.util.Base64.DEFAULT);
            String name = call.getString("name", "viaticum.bin").replaceAll("[\\/:*?\"<>|]", "_");
            String mime = call.getString("mime", "application/octet-stream");
            Context c = getContext();
            if (android.os.Build.VERSION.SDK_INT >= 29) {
                android.content.ContentValues v = new android.content.ContentValues();
                v.put(android.provider.MediaStore.MediaColumns.DISPLAY_NAME, name);
                v.put(android.provider.MediaStore.MediaColumns.MIME_TYPE, mime);
                v.put(android.provider.MediaStore.MediaColumns.RELATIVE_PATH, android.os.Environment.DIRECTORY_DOWNLOADS);
                Uri u = c.getContentResolver().insert(android.provider.MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
                if (u == null) throw new Exception("insert");
                try (java.io.OutputStream os = c.getContentResolver().openOutputStream(u)) { os.write(b); }
                JSObject r = new JSObject();
                r.put("where", "Download");
                call.resolve(r);
                /* lo apro subito, se c'è un'app per farlo */
                try {
                    android.content.Intent vi = new android.content.Intent(android.content.Intent.ACTION_VIEW).setDataAndType(u, mime).addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION | android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                    if (!mime.contains("json")) c.startActivity(vi);
                } catch (Exception e) {}
                return;
            }
            /* Android vecchi: lo condivido, così si sceglie dove metterlo */
            File d = new File(c.getCacheDir(), "out");
            d.mkdirs();
            File f = new File(d, name);
            try (FileOutputStream fo = new FileOutputStream(f)) { fo.write(b); }
            Uri u = androidx.core.content.FileProvider.getUriForFile(c, c.getPackageName() + ".fileprovider", f);
            android.content.Intent si = new android.content.Intent(android.content.Intent.ACTION_SEND).setType(mime).putExtra(android.content.Intent.EXTRA_STREAM, u).addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getActivity().startActivity(android.content.Intent.createChooser(si, name));
            JSObject r = new JSObject();
            r.put("where", "");
            call.resolve(r);
        } catch (Exception e) {
            call.reject("save");
        }
    }
}
