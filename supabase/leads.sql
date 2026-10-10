-- Planned `leads` table for website inquiries. Run in the Supabase SQL Editor
-- AFTER confirming column names against the Portal schema.

create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  mobile         text not null,
  email          text,
  message        text,
  inquiry_type   text,            -- property | help-choosing | investment | general
  property_interest text,         -- free text from the form (name, location, or type)
  property_slug  text,            -- set when the visitor came from a listing (/contact?property=slug)
  property_id    uuid,            -- link to properties (confirm table/column name)
  location       text,
  budget         text,            -- below-2m | 2m-5m | 5m-10m | above-10m | not-sure
  source         text,            -- property_page | contact_page | find_my_property | hero
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  status         text not null default 'new',   -- new | assigned | contacted | viewing | reserved | sold | lost
  assigned_to    text,            -- agent ID (e.g. AGT-xxxxx), set by Admin in the Portal
  consent        boolean not null default false -- data privacy consent
);

-- Public site must NOT read leads. Inserts go through the server API route
-- using the service role key, so no public policies are created.
alter table public.leads enable row level security;
