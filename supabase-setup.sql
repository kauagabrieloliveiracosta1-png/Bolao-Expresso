-- BOLÃO EXPRESSO V4 — execute este arquivo no SQL Editor do Supabase.
-- Cria perfis, armazenamento dos bolões e palpites com Row Level Security.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Participante',
  role text not null default 'participant' check (role in ('participant','admin')),
  points integer not null default 0,
  pools_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.app_data (
  id integer primary key check (id = 1),
  data jsonb not null default '{"pools":[]}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.app_data (id, data) values (1, '{"pools":[]}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.predictions (
  pool_id text not null,
  match_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  home_score integer not null check (home_score between 0 and 30),
  away_score integer not null check (away_score between 0 and 30),
  updated_at timestamptz not null default now(),
  primary key (pool_id, match_id, user_id)
);

create or replace function public.is_bolao_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created_bolao on auth.users;
create trigger on_auth_user_created_bolao after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.app_data enable row level security;
alter table public.predictions enable row level security;

drop policy if exists "profiles readable by signed users" on public.profiles;
create policy "profiles readable by signed users" on public.profiles for select to anon, authenticated using (true);
drop policy if exists "admin updates profiles" on public.profiles;
create policy "admin updates profiles" on public.profiles for update to authenticated using (public.is_bolao_admin()) with check (public.is_bolao_admin());

drop policy if exists "signed users read app data" on public.app_data;
create policy "signed users read app data" on public.app_data for select to anon, authenticated using (true);
drop policy if exists "admins insert app data" on public.app_data;
create policy "admins insert app data" on public.app_data for insert to authenticated with check (public.is_bolao_admin());
drop policy if exists "admins update app data" on public.app_data;
create policy "admins update app data" on public.app_data for update to authenticated using (public.is_bolao_admin()) with check (public.is_bolao_admin());

drop policy if exists "users read own predictions and admins read all" on public.predictions;
create policy "users read own predictions and admins read all" on public.predictions for select to authenticated using (user_id = auth.uid() or public.is_bolao_admin());
drop policy if exists "users insert own predictions" on public.predictions;
create policy "users insert own predictions" on public.predictions for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "users update own predictions" on public.predictions;
create policy "users update own predictions" on public.predictions for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "users delete own predictions" on public.predictions;
create policy "users delete own predictions" on public.predictions for delete to authenticated using (user_id = auth.uid());

-- Depois de criar sua conta pelo aplicativo e confirmar o e-mail,
-- execute separadamente a linha abaixo, substituindo pelo SEU e-mail:
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'SEU_EMAIL');
