-- Create library resources table
create table if not exists public.library_resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  resource_type text check (resource_type in ('article', 'video', 'course', 'book', 'tutorial', 'documentation')),
  url text,
  content text,
  tags jsonb default '[]'::jsonb,
  difficulty_level text check (difficulty_level in ('beginner', 'intermediate', 'advanced')),
  is_favorite boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.library_resources enable row level security;

-- RLS Policies for library resources
create policy "library_resources_select_own"
  on public.library_resources for select
  using (auth.uid() = user_id);

create policy "library_resources_insert_own"
  on public.library_resources for insert
  with check (auth.uid() = user_id);

create policy "library_resources_update_own"
  on public.library_resources for update
  using (auth.uid() = user_id);

create policy "library_resources_delete_own"
  on public.library_resources for delete
  using (auth.uid() = user_id);

-- Create indexes for faster queries
create index if not exists library_resources_user_id_idx on public.library_resources(user_id);
create index if not exists library_resources_tags_idx on public.library_resources using gin(tags);
