-- Create profiles table for user information
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  profile_picture text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create itineraries table
create table public.itineraries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  destination text not null,
  start_date date not null,
  end_date date not null,
  total_distance numeric,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.itineraries enable row level security;

-- Itineraries policies
create policy "Users can view their own itineraries"
  on public.itineraries for select
  using (auth.uid() = user_id);

create policy "Users can create their own itineraries"
  on public.itineraries for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own itineraries"
  on public.itineraries for update
  using (auth.uid() = user_id);

create policy "Users can delete their own itineraries"
  on public.itineraries for delete
  using (auth.uid() = user_id);

-- Create itinerary_details table
create table public.itinerary_details (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  day_number integer not null,
  place_name text not null,
  description text,
  breakfast text,
  lunch text,
  dinner text,
  distance_from_previous numeric,
  photo_urls text[],
  created_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.itinerary_details enable row level security;

-- Itinerary details policies
create policy "Users can view details of their itineraries"
  on public.itinerary_details for select
  using (
    exists (
      select 1 from public.itineraries
      where itineraries.id = itinerary_details.itinerary_id
      and itineraries.user_id = auth.uid()
    )
  );

create policy "Users can create details for their itineraries"
  on public.itinerary_details for insert
  with check (
    exists (
      select 1 from public.itineraries
      where itineraries.id = itinerary_details.itinerary_id
      and itineraries.user_id = auth.uid()
    )
  );

create policy "Users can update details of their itineraries"
  on public.itinerary_details for update
  using (
    exists (
      select 1 from public.itineraries
      where itineraries.id = itinerary_details.itinerary_id
      and itineraries.user_id = auth.uid()
    )
  );

create policy "Users can delete details of their itineraries"
  on public.itinerary_details for delete
  using (
    exists (
      select 1 from public.itineraries
      where itineraries.id = itinerary_details.itinerary_id
      and itineraries.user_id = auth.uid()
    )
  );

-- Create feedback table
create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  itinerary_id uuid references public.itineraries(id) on delete set null,
  rating integer check (rating >= 1 and rating <= 5),
  comment text not null,
  created_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.feedback enable row level security;

-- Feedback policies
create policy "Users can view their own feedback"
  on public.feedback for select
  using (auth.uid() = user_id);

create policy "Users can create feedback"
  on public.feedback for insert
  with check (auth.uid() = user_id);

-- Function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_itineraries_updated_at
  before update on public.itineraries
  for each row execute function public.update_updated_at_column();