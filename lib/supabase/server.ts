import { createClient } from "@supabase/supabase-js";

/**
 * Read-only public client (anon key).
 * Only query PUBLIC-SAFE VIEWS here (see supabase/public_views.sql), never the raw tables.
 */
export function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Missing Supabase public env vars");
  return createClient(url, anon, { auth: { persistSession: false } });
}

/**
 * Server-only client for inserting leads. Never import this in a client component.
 */
export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase service env vars");
  return createClient(url, key, { auth: { persistSession: false } });
}
