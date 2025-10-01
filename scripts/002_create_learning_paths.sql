-- Create learning paths table
create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  difficulty_level text check (difficulty_level in ('beginner', 'intermediate', 'advanced')),
  estimated_duration text,
  topics jsonb default '[]'::jsonb,
  milestones jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.learning_paths enable row level security;

-- RLS Policies for learning paths
create policy "learning_paths_select_own"
  on public.learning_paths for select
  using (auth.uid() = user_id);

create policy "learning_paths_insert_own"
  on public.learning_paths for insert
  with check (auth.uid() = user_id);

create policy "learning_paths_update_own"
  on public.learning_paths for update
  using (auth.uid() = user_id);

create policy "learning_paths_delete_own"
  on public.learning_paths for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists learning_paths_user_id_idx on public.learning_paths(user_id);
