import { createClient } from "@supabase/supabase-js";

/*
-- Run this DDL in your Supabase SQL editor:

create table quiz_leads (
  id uuid primary key default gen_random_uuid(),
  email text,
  archetype_id text not null,
  answers jsonb,
  created_at timestamptz default now()
);
*/

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
