import { NextResponse } from "next/server";
import type { InquiryInput } from "@/types/property";

// Placeholder: validates, then (later) inserts a row into the `leads` table
// via the service client. See supabase/leads.sql for the planned table.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as InquiryInput | null;

  if (!body?.name?.trim() || !body?.mobile?.trim()) {
    return NextResponse.json({ error: "Name and mobile number are required." }, { status: 400 });
  }

  // TODO: spam protection (honeypot / rate limit), insert lead, notify.
  return NextResponse.json({ ok: true }, { status: 501 });
}
