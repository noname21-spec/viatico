# Attivare account e sincronizzazione

1. Crea un progetto gratuito su https://supabase.com.
2. SQL Editor → incolla `supabase/setup.sql` → Run.
3. Authentication → Providers → abilita **Google** (serve un OAuth client su Google Cloud Console) e **Apple** (serve un account Apple Developer).
4. Authentication → URL Configuration → Site URL e Redirect URLs: `https://noname21-spec.github.io/viatico/`
5. Project Settings → API: copia **Project URL** e la chiave **anon public**.
6. Crea `src/supabase.json`: `{"url":"https://XXXX.supabase.co","key":"LA_CHIAVE_ANON"}` e ricostruisci con `python3 src/build.py`.

Finché il file non esiste, i pulsanti di accesso restano nascosti. La chiave anon è pensata per essere pubblica: i dati sono protetti dalle policy RLS.
