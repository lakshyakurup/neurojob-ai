-- NeuroJob AI – Supabase schema
-- Run this in the Supabase SQL editor (https://supabase.com/dashboard → SQL Editor)

-- Enable UUID extension if not already
create extension if not exists "uuid-ossp";

-- Analyses table: every Gemini analysis run
create table if not exists public.analyses (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,                          -- Clerk userId
  match_score integer not null check (match_score >= 0 and match_score <= 100),
  summary text,
  missing_keywords text[] default '{}',
  strengths text[] default '{}',
  weaknesses text[] default '{}',
  tailored_cover_letter text,
  interview_questions jsonb default '[]',
  ats_tips text[] default '{}',
  recommended_improvements text[] default '{}',
  job_title text,
  company text,
  resume_text text,                               -- optional snapshot for history
  job_description text,
  created_at timestamptz not null default now()
);

-- Indexes for fast user history lookups
create index if not exists analyses_user_id_idx on public.analyses (user_id);
create index if not exists analyses_created_at_idx on public.analyses (created_at desc);

-- Optional: resume versions library
create table if not exists public.resumes (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  title text not null,
  content text not null,
  is_primary boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resumes_user_id_idx on public.resumes (user_id);

-- Optional: applications pipeline
create table if not exists public.applications (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  company text not null,
  role text not null,
  status text not null default 'draft' check (status in ('draft','applied','interview','offer','rejected')),
  match_score integer,
  analysis_id uuid references public.analyses(id) on delete set null,
  notes text,
  applied_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_user_id_idx on public.applications (user_id);

-- Row Level Security (recommended)
alter table public.analyses enable row level security;
alter table public.resumes enable row level security;
alter table public.applications enable row level security;

-- For hackathon simplicity we use the service role key on the server.
-- When you move to pure client-side access, add policies like:
-- create policy "Users can read own analyses"
--   on public.analyses for select
--   using (auth.jwt() ->> 'sub' = user_id);

comment on table public.analyses is 'NeuroJob AI analysis runs linked to Clerk user IDs';
