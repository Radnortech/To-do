-- Update todos table with user_id
alter table todos add column user_id uuid references auth.users(id);

-- Update RLS policies
drop policy if exists "Allow public read access" on todos;
drop policy if exists "Allow insert access" on todos;
drop policy if exists "Allow update access" on todos;
drop policy if exists "Allow delete access" on todos;

-- Create new policies
create policy "Users can view their own todos" on todos
  for select using (auth.uid() = user_id);

create policy "Users can insert their own todos" on todos
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own todos" on todos
  for update using (auth.uid() = user_id);

create policy "Users can delete their own todos" on todos
  for delete using (auth.uid() = user_id);
