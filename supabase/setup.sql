-- Viatico: tabella per la sincronizzazione (SQL Editor di Supabase → Run)
create table if not exists public.viatico_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.viatico_data enable row level security;
create policy "leggi i tuoi dati" on public.viatico_data for select using (auth.uid() = user_id);
create policy "scrivi i tuoi dati" on public.viatico_data for insert with check (auth.uid() = user_id);
create policy "aggiorna i tuoi dati" on public.viatico_data for update using (auth.uid() = user_id);
create policy "elimina i tuoi dati" on public.viatico_data for delete using (auth.uid() = user_id);
create or replace function public.viatico_touch() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists viatico_touch on public.viatico_data;
create trigger viatico_touch before insert or update on public.viatico_data for each row execute function public.viatico_touch();
