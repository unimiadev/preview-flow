-- ═══════════════════════════════════════
-- PreviewFlow: Brands Table Migration
-- ═══════════════════════════════════════
-- Run this in the Supabase SQL Editor.

create table brands (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  username text,
  headline text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Row Level Security
alter table brands enable row level security;

create policy "Users can view own brands" on brands
  for select using (auth.uid() = user_id);

create policy "Users can insert own brands" on brands
  for insert with check (auth.uid() = user_id);

create policy "Users can update own brands" on brands
  for update using (auth.uid() = user_id);

create policy "Users can delete own brands" on brands
  for delete using (auth.uid() = user_id);
