create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  topic text,
  message text not null,
  rating integer not null default 0 check (rating between 0 and 5),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

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

alter table public.feedback enable row level security;
alter table public.loyalty_card_requests enable row level security;
alter table public.supplier_applications enable row level security;

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
