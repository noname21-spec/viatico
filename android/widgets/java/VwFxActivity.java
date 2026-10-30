package it.viaticum.app;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONObject;

/* finestrella del widget Cambio: scrivi una cifra e la vedi nella valuta del posto (o in euro) */
public class VwFxActivity extends Activity {
    private double e = 1;
    private String sym = "";
    private boolean toEur = false;
    private EditText in;
    private TextView res, unit, dir;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.vw_fx_act);
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE | WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
        JSONObject o = VwUtil.snap(this), cu = o.optJSONObject("cur");
        TextView title = findViewById(R.id.fx_title);
        in = findViewById(R.id.fx_in);
        res = findViewById(R.id.fx_res);
        unit = findViewById(R.id.fx_unit);
        dir = findViewById(R.id.fx_dir);
        findViewById(R.id.fx_bg).setOnClickListener(v -> finish());
        findViewById(R.id.fx_card).setOnClickListener(v -> {});
        findViewById(R.id.fx_close).setOnClickListener(v -> finish());
        if (cu == null) {
            title.setText(o.optInt("none") == 1 || o.optString("city").isEmpty() ? "Nessun viaggio fuori dall'euro" : "A " + o.optString("city") + " si paga in euro");
            in.setEnabled(false);
            dir.setVisibility(View.GONE);
            res.setText("Niente da cambiare.");
            return;
        }
        e = cu.optDouble("e", 1);
        sym = cu.optString("s");
        title.setText("Cambio · " + o.optString("city") + " (" + cu.optString("c") + ")");
        SharedPreferences pr = getSharedPreferences(VwUtil.PREFS, 0);
        toEur = pr.getBoolean("fx_dir", false);
        float last = pr.getFloat("fx_amt", 20f);
        in.setText(VwUtil.num(last).replace(".", ""));
        in.setSelection(in.getText().length());
        in.addTextChangedListener(new TextWatcher() {
            public void beforeTextChanged(CharSequence s, int a, int b2, int c) {}
            public void onTextChanged(CharSequence s, int a, int b2, int c) {}
            public void afterTextChanged(Editable s) { paint(); }
        });
        in.setOnEditorActionListener((v, act, ev) -> { if (act == EditorInfo.IME_ACTION_DONE) { finish(); return true; } return false; });
        dir.setOnClickListener(v -> { toEur = !toEur; paint(); });
        paint();
        in.requestFocus();
    }

    private double amount() {
        String s = in.getText().toString().trim().replace(" ", "");
        if (s.isEmpty()) return 0;
        /* accetta 1.234,50 e 1234.50 */
        if (s.indexOf(',') >= 0) s = s.replace(".", "").replace(',', '.');
        try { return Double.parseDouble(s); } catch (Exception x) { return 0; }
    }

    private void paint() {
        double a = amount();
        unit.setText(toEur ? sym : "€");
        dir.setText(toEur ? sym + " → €" : "€ → " + sym);
        res.setText(a <= 0 ? "Scrivi una cifra" : toEur ? VwUtil.num(a * e) + " €" : VwUtil.num(a / e) + " " + sym);
    }

    @Override
    protected void onPause() {
        super.onPause();
        double a = amount();
        SharedPreferences.Editor ed = getSharedPreferences(VwUtil.PREFS, 0).edit();
        if (a > 0) ed.putFloat("fx_amt", (float) a);
        ed.putBoolean("fx_dir", toEur).apply();
        VwUtil.updateAll(this);
    }
}
