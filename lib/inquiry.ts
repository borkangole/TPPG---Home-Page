/** Inquiry form options and validation, shared by the form (client) and the API route (server). */

export const INQUIRY_TYPES = [
  { value: "property", label: "I’m interested in a property" },
  { value: "help-choosing", label: "I need help choosing a property" },
  { value: "investment", label: "I’m looking for an investment" },
  { value: "general", label: "General inquiry" },
] as const;

export const INQUIRY_BUDGETS = [
  { value: "below-2m", label: "Below ₱2M" },
  { value: "2m-5m", label: "₱2M – ₱5M" },
  { value: "5m-10m", label: "₱5M – ₱10M" },
  { value: "above-10m", label: "Above ₱10M" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["value"];
export type InquiryBudget = (typeof INQUIRY_BUDGETS)[number]["value"];

export type InquiryForm = {
  inquiryType: InquiryType;
  name: string;
  email: string;
  mobile: string;
  property: string;
  propertySlug?: string;
  budget: InquiryBudget;
  message: string;
  consent: boolean;
  /** Honeypot: real visitors never fill this in. */
  company?: string;
};

export type InquiryErrors = Partial<Record<"name" | "email" | "mobile" | "message" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts 09XX XXX XXXX, +63 9XX XXX XXXX, or 639XXXXXXXXX. Returns +639XXXXXXXXX or null. */
export function normalizePhMobile(input: string): string | null {
  const digits = input.replace(/[^\d+]/g, "");
  const m = digits.match(/^(?:\+?63|0)(9\d{9})$/);
  return m ? `+63${m[1]}` : null;
}

export function validateInquiry(f: Partial<InquiryForm>): InquiryErrors {
  const e: InquiryErrors = {};
  if (!f.name || f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!f.email || !EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.mobile || !normalizePhMobile(f.mobile)) e.mobile = "Please enter a valid PH mobile number, e.g. 0917 123 4567.";
  if (f.message && f.message.length > 2000) e.message = "Please keep your message under 2,000 characters.";
  if (!f.consent) e.consent = "Please agree so we can contact you about your inquiry.";
  return e;
}
