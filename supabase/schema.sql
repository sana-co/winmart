create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  subject text,
  topic text,
  message text not null,
  rating integer not null default 0 check (rating between 0 and 5),
  quality integer not null default 0 check (quality between 0 and 5),
  service integer not null default 0 check (service between 0 and 5),
  music integer not null default 0 check (music between 0 and 5),
  ambience integer not null default 0 check (ambience between 0 and 5),
  price integer not null default 0 check (price between 0 and 5),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table if exists public.feedback alter column email drop not null;

create table if not exists public.loyalty_card_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  address text not null,
  email text not null,
  contact_number text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.supplier_applications (
  id uuid primary key default gen_random_uuid(),
  business text not null,
  contact text not null,
  email text not null,
  phone text,
  category text not null,
  website text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.product_managers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  image_url text not null,
  category text,
  is_new_arrival boolean not null default false,
  is_top_pick boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

alter table public.feedback enable row level security;
alter table public.loyalty_card_requests enable row level security;
alter table public.supplier_applications enable row level security;
alter table public.admin_users enable row level security;
alter table public.product_managers enable row level security;
alter table public.products enable row level security;

create policy "Only service role can manage feedback"
on public.feedback
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Only service role can manage loyalty card requests"
on public.loyalty_card_requests
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Only service role can manage supplier applications"
on public.supplier_applications
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Admins can read feedback" on public.feedback;
create policy "Admins can read feedback"
on public.feedback
for select
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can read loyalty card requests" on public.loyalty_card_requests;
create policy "Admins can read loyalty card requests"
on public.loyalty_card_requests
for select
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can read supplier applications" on public.supplier_applications;
create policy "Admins can read supplier applications"
on public.supplier_applications
for select
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can read their own admin record" on public.admin_users;
create policy "Admins can read their own admin record"
on public.admin_users
for select
using (auth.uid() = user_id);

drop policy if exists "Only service role can manage admin users" on public.admin_users;
create policy "Only service role can manage admin users"
on public.admin_users
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Product managers can read their own manager record" on public.product_managers;
create policy "Product managers can read their own manager record"
on public.product_managers
for select
using (auth.uid() = user_id);

drop policy if exists "Only service role can manage product managers" on public.product_managers;
create policy "Only service role can manage product managers"
on public.product_managers
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products
for select
using (true);

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
on public.products
for insert
with check (
  exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
);

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
on public.products
for update
using (
  exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
);

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products
for delete
using (
  exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
);

drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects
for select
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
on storage.objects
for insert
with check (
  bucket_id = 'product-images'
  and exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
);

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
on storage.objects
for update
using (
  bucket_id = 'product-images'
  and exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'product-images'
  and exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
);

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
on storage.objects
for delete
using (
  bucket_id = 'product-images'
  and exists (
    select 1 from public.product_managers
    where product_managers.user_id = auth.uid()
  )
);

drop policy if exists "Admins can delete feedback" on public.feedback;
create policy "Admins can delete feedback"
on public.feedback
for delete
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can delete loyalty card requests" on public.loyalty_card_requests;
create policy "Admins can delete loyalty card requests"
on public.loyalty_card_requests
for delete
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can delete supplier applications" on public.supplier_applications;
create policy "Admins can delete supplier applications"
on public.supplier_applications
for delete
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);
