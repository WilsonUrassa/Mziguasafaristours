-- Run this in Supabase: SQL Editor > New query > paste > Run
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (length(name) <= 200),
  email text not null check (length(email) <= 200),
  package text check (length(package) <= 200),
  start_date date,
  people int default 1 check (people between 1 and 100),
  message text check (length(message) <= 2000),
  status text not null default 'new' check (status in ('new','contacted','confirmed','cancelled')),
  session_id text
);
create table public.page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path text check (length(path) <= 300),
  referrer text check (length(referrer) <= 500),
  device text, language text, screen text, session_id text
);
alter table public.bookings enable row level security;
alter table public.page_views enable row level security;
-- Visitors may only ADD rows. They can never read them.
create policy "visitors can book" on public.bookings for insert to anon with check (status = 'new');
create policy "visitors can log views" on public.page_views for insert to anon with check (true);
-- Logged-in admin only
create policy "admin reads bookings" on public.bookings for select to authenticated using (true);
create policy "admin updates bookings" on public.bookings for update to authenticated using (true) with check (true);
create policy "admin reads views" on public.page_views for select to authenticated using (true);

-- ===== Pictures managed from the admin page =====
create table public.site_images (
  slot text primary key,
  path text not null,
  object text,
  updated_at timestamptz not null default now()
);
alter table public.site_images enable row level security;
create policy "everyone sees site images" on public.site_images for select to anon, authenticated using (true);
create policy "admin adds site images" on public.site_images for insert to authenticated with check (true);
create policy "admin changes site images" on public.site_images for update to authenticated using (true) with check (true);
create policy "admin removes site images" on public.site_images for delete to authenticated using (true);

insert into storage.buckets (id, name, public) values ('site-images', 'site-images', true) on conflict (id) do nothing;
create policy "public reads site-images" on storage.objects for select using (bucket_id = 'site-images');
create policy "admin uploads site-images" on storage.objects for insert to authenticated with check (bucket_id = 'site-images');
create policy "admin updates site-images" on storage.objects for update to authenticated using (bucket_id = 'site-images');
create policy "admin deletes site-images" on storage.objects for delete to authenticated using (bucket_id = 'site-images');
