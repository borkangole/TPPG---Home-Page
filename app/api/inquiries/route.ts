import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase/server";
import {
  INQUIRY_BUDGETS,
  INQUIRY_TYPES,
  normalizePhMobile,
  validateInquiry,
  type InquiryForm,
} from "@/lib/inquiry";

const SOURCES = ["contact_page", "property_page", "find_my_property"] as const;
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as (Partial<InquiryForm> & { source?: string }) | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot: pretend success so bots don't retry.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateInquiry(body);
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please check the form.", errors }, { status: 422 });

  const inquiryType = INQUIRY_TYPES.some((t) => t.value === body.inquiryType) ? body.inquiryType : "general";
  const budget = INQUIRY_BUDGETS.some((b) => b.value === body.budget) ? body.budget : "not-sure";

  const lead = {
    name: clip(body.name, 120),
    email: clip(body.email, 200).toLowerCase(),
    mobile: normalizePhMobile(body.mobile ?? "")!,
    inquiry_type: inquiryType,
    property_interest: clip(body.property, 200) || null,
    property_slug: clip(body.propertySlug, 120) || null,
    budget,
    message: clip(body.message, 2000) || null,
    source: SOURCES.find((x) => x === body.source) ?? "contact_page",
    consent: true,
  };

  const configured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!configured) {
    // Mockup mode: Supabase isn't connected yet. Log the lead in development so the form can be tested.
    if (process.env.NODE_ENV !== "production") {
      console.info("[inquiry] (not stored: Supabase not configured)", lead);
      return NextResponse.json({ ok: true, stored: false });
    }
    return NextResponse.json({ error: "Inquiries are temporarily unavailable. Please call or message us." }, { status: 503 });
  }

  const { error } = await getServiceClient().from("leads").insert(lead);
  if (error) {
    console.error("[inquiry] insert failed", error.message);
    return NextResponse.json({ error: "We couldn’t send your inquiry. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
