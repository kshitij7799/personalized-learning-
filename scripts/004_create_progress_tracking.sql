-- Create progress tracking table
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  learning_path_id uuid references public.learning_paths(id) on delete cascade,
  milestone_index integer not null,
  completed boolean default false,
  notes text,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, learning_path_id, milestone_index)
);

-- Enable RLS
alter table public.user_progress enable row level security;

-- RLS Policies for user progress
create policy "user_progress_select_own"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "user_progress_insert_own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "user_progress_update_own"
  on public.user_progress for update
  using (auth.uid() = user_id);

create policy "user_progress_delete_own"
  on public.user_progress for delete
  using (auth.uid() = user_id);

-- Create indexes for faster queries
create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists user_progress_learning_path_id_idx on public.user_progress(learning_path_id);
