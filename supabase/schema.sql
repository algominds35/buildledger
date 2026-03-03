-- ReconcileBook — Supabase schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- QBO CONNECTIONS (stores OAuth tokens per client)
-- ============================================================
create table if not exists public.qbo_connections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  realm_id text not null,
  company_name text,
  access_token text not null,
  refresh_token text not null,
  token_expires_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, realm_id)
);

alter table public.qbo_connections enable row level security;

create policy "Users can read their own QBO connections"
  on public.qbo_connections for select using (auth.uid() = user_id);

create policy "Users can delete their own QBO connections"
  on public.qbo_connections for delete using (auth.uid() = user_id);

-- ============================================================
-- SUBSCRIPTIONS (Stripe billing status per user)
-- ============================================================
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text default 'trialing' not null,
  trial_end timestamptz default (now() + interval '14 days') not null,
  current_period_end timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.subscriptions enable row level security;

create policy "Users can read their own subscription"
  on public.subscriptions for select using (auth.uid() = user_id);

create policy "Service role can manage subscriptions"
  on public.subscriptions for all using (true);
