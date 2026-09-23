-- =============================================================================
 -- Suresh Tour and Travels — Admin panel schema
-- Run this ONCE in the Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
-- Safe to re-run: uses "if not exists" / "or replace" throughout.
-- =============================================================================

-- ---------- shared: auto-update updated_at ----------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- packages ---------------------------------------------------------
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text,
  base_price numeric not null default 0,
  status text not null default 'draft',   -- draft | published | inactive | sold_out
  featured boolean not null default false,
  sort_order int not null default 0,
  data jsonb not null default '{}'::jsonb, -- full package object used by the UI
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists packages_set_updated_at on public.packages;
create trigger packages_set_updated_at
  before update on public.packages
  for each row execute function public.set_updated_at();

alter table public.packages enable row level security;

-- Anyone can read PUBLISHED packages.
drop policy if exists "packages_public_read" on public.packages;
create policy "packages_public_read" on public.packages
  for select using (status = 'published');

-- Signed-in admins can read everything (incl. drafts).
drop policy if exists "packages_admin_read" on public.packages;
create policy "packages_admin_read" on public.packages
  for select to authenticated using (true);

-- Signed-in admins can create / update / delete.
drop policy if exists "packages_admin_insert" on public.packages;
create policy "packages_admin_insert" on public.packages
  for insert to authenticated with check (true);

drop policy if exists "packages_admin_update" on public.packages;
create policy "packages_admin_update" on public.packages
  for update to authenticated using (true) with check (true);

drop policy if exists "packages_admin_delete" on public.packages;
create policy "packages_admin_delete" on public.packages
  for delete to authenticated using (true);

-- ---------- enquiries --------------------------------------------------------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'contact', -- contact | custom_tour | char_dham
  name text not null,
  phone text,
  email text,
  message text,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'new',      -- new | contacted | closed
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;

-- Public visitors may submit an enquiry.
drop policy if exists "enquiries_public_insert" on public.enquiries;
create policy "enquiries_public_insert" on public.enquiries
  for insert to anon, authenticated with check (true);

-- Only admins may read / update / delete.
drop policy if exists "enquiries_admin_read" on public.enquiries;
create policy "enquiries_admin_read" on public.enquiries
  for select to authenticated using (true);

drop policy if exists "enquiries_admin_update" on public.enquiries;
create policy "enquiries_admin_update" on public.enquiries
  for update to authenticated using (true) with check (true);

drop policy if exists "enquiries_admin_delete" on public.enquiries;
create policy "enquiries_admin_delete" on public.enquiries
  for delete to authenticated using (true);

-- ---------- bookings ---------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  package_slug text,
  package_name text,
  departure_label text,
  adults int not null default 1,
  children int not null default 0,
  rooms int not null default 0,
  total_amount numeric not null default 0,
  lead_name text not null,
  lead_email text,
  lead_phone text,
  travellers jsonb not null default '[]'::jsonb,
  status text not null default 'pending',  -- pending | confirmed | cancelled
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- Public visitors may create a booking request.
drop policy if exists "bookings_public_insert" on public.bookings;
create policy "bookings_public_insert" on public.bookings
  for insert to anon, authenticated with check (true);

-- Only admins may read / update / delete.
drop policy if exists "bookings_admin_read" on public.bookings;
create policy "bookings_admin_read" on public.bookings
  for select to authenticated using (true);

drop policy if exists "bookings_admin_update" on public.bookings;
create policy "bookings_admin_update" on public.bookings
  for update to authenticated using (true) with check (true);

drop policy if exists "bookings_admin_delete" on public.bookings;
create policy "bookings_admin_delete" on public.bookings
  for delete to authenticated using (true);

-- ---------- site_settings (single row, id = 1) -------------------------------
create table if not exists public.site_settings (
  id int primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

insert into public.site_settings (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

-- Anyone can read site settings (used across the public site).
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings
  for select to anon, authenticated using (true);

-- Only admins may update.
drop policy if exists "site_settings_admin_update" on public.site_settings;
create policy "site_settings_admin_update" on public.site_settings
  for update to authenticated using (true) with check (true);
