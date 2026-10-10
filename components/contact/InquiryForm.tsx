"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowRight, CheckIcon } from "@/components/ui/Icons";
import {
  INQUIRY_BUDGETS,
  INQUIRY_TYPES,
  validateInquiry,
  type InquiryErrors,
  type InquiryForm as FormState,
} from "@/lib/inquiry";

type Props = {
  /** Prefill when the visitor arrives from a listing (/contact?property=slug). */
  property?: { slug: string; name: string } | null;
  /**
   * "full": the Contact page form. "property": a compact form inside the property overlay,
   * already tied to one property (no type/property/budget fields; quick topic chips instead).
   */
  variant?: "full" | "property" | "brief";
  /** "brief": contact fields only; the message and source come from the parent (e.g. Find My Property). */
  brief?: { message: string; source: string };
  /** Selected unit, appended to the property in the inquiry (property variant). */
  unitName?: string | null;
};

const TOPICS = [
  "Schedule a viewing",
  "Price computation",
  "Available units",
  "Other question",
] as const;

const inputBase =
  "w-full rounded-lg border bg-ink-700/60 px-4 text-[0.95rem] text-white placeholder:text-zinc-500 transition-colors focus:border-brand focus:bg-ink-700 focus:outline-none focus:ring-2 focus:ring-brand/30";

export function InquiryForm({ property, variant = "full", unitName, brief }: Props) {
  const compact = variant !== "full";
  const isBrief = variant === "brief";
  const pad = compact ? "py-2.5 xl:short:py-2" : "py-3";
  const [topic, setTopic] =
    useState<(typeof TOPICS)[number]>("Schedule a viewing");
  const uid = useId();
  const [form, setForm] = useState<FormState>({
    inquiryType: "property",
    name: "",
    email: "",
    mobile: "",
    property: property?.name ?? "",
    propertySlug: property?.slug,
    budget: "not-sure",
    message: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof InquiryErrors, boolean>>
  >({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    const next = { ...form, [key]: value };
    // If the visitor edits the property field, it's no longer tied to the listing they came from.
    if (key === "property" && value !== property?.name)
      next.propertySlug = undefined;
    setForm(next);
    if (touched[key as keyof InquiryErrors]) setErrors(validateInquiry(next));
  };

  const blur = (key: keyof InquiryErrors) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateInquiry(form));
  };

  const shown = (key: keyof InquiryErrors) =>
    touched[key] ? errors[key] : undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateInquiry(form);
    setErrors(errs);
    setTouched({
      name: true,
      email: true,
      mobile: true,
      message: true,
      consent: true,
    });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isBrief
            ? { ...form, inquiryType: "help-choosing", source: brief?.source, message: brief?.message ?? "" }
            : compact
            ? {
                ...form,
                source: "property_page",
                property: unitName
                  ? `${form.property} · ${unitName}`
                  : form.property,
                message: `[${topic}] ${form.message}`.trim(),
              }
            : form,
        ),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  if (status === "sent") {
    const first = form.name.trim().split(/\s+/)[0];
    return (
      <div
        role="status"
        className={`flex flex-col items-center justify-center px-6 text-center ${compact ? "py-12" : "min-h-[32rem] py-16"}`}
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/15 ring-1 ring-brand/40">
          <CheckIcon className="h-7 w-7 text-brand-soft" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-white">
          Thank you, {first}.
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-zinc-400">
          Your inquiry is in. A TPPG property specialist will contact you at{" "}
          <span className="text-zinc-200">{form.mobile}</span> or{" "}
          <span className="text-zinc-200">{form.email}</span>.
        </p>
        {!compact && (
          <Link href="/properties" className="btn-ghost mt-8">
            Browse properties while you wait
            <ArrowRight />
          </Link>
        )}
      </div>
    );
  }

  const field = (key: keyof InquiryErrors) => ({
    id: `${uid}-${key}`,
    name: key,
    "aria-invalid": !!shown(key) || undefined,
    "aria-describedby": shown(key) ? `${uid}-${key}-err` : undefined,
  });

  const Err = ({ k }: { k: keyof InquiryErrors }) =>
    shown(k) ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-xs text-red-400">
        {shown(k)}
      </p>
    ) : null;

  const borderFor = (k: keyof InquiryErrors) =>
    shown(k) ? "border-red-500/70" : "border-white/10";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className={isBrief ? "" : compact ? "p-5 sm:p-6 xl:short:p-5" : "p-6 sm:p-8"}
    >
      {isBrief ? null : compact ? (
        <fieldset>
          <legend className="text-sm font-medium text-zinc-300">
            I’d like to…
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <label
                key={t}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${
                  topic === t
                    ? "border-brand bg-brand text-white"
                    : "border-white/10 text-zinc-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={t}
                  checked={topic === t}
                  onChange={() => setTopic(t)}
                  className="sr-only"
                />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <fieldset>
          <legend className="text-sm font-semibold text-white">
            What can we help you with?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {INQUIRY_TYPES.map((t) => (
              <label
                key={t.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${
                  form.inquiryType === t.value
                    ? "border-brand/70 bg-brand/10 text-white"
                    : "border-white/10 text-zinc-300 hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="inquiryType"
                  value={t.value}
                  checked={form.inquiryType === t.value}
                  onChange={() => set("inquiryType", t.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                    form.inquiryType === t.value
                      ? "border-brand"
                      : "border-zinc-500"
                  }`}
                >
                  {form.inquiryType === t.value && (
                    <span className="h-2 w-2 rounded-full bg-brand" />
                  )}
                </span>
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className={`grid ${compact ? `${isBrief ? "" : "mt-5"} grid-cols-2 gap-x-3 gap-y-4` : "mt-7 gap-5 sm:grid-cols-2"}`}>
        <div className={compact ? "col-span-2" : "sm:col-span-2"}>
          <label
            htmlFor={`${uid}-name`}
            className="text-sm font-medium text-zinc-300"
          >
            Full name <span className="text-brand">*</span>
          </label>
          <input
            {...field("name")}
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            placeholder="Juan Dela Cruz"
            className={`mt-2 ${inputBase} ${pad} ${borderFor("name")}`}
          />
          <Err k="name" />
        </div>

        <div>
          <label
            htmlFor={`${uid}-email`}
            className="text-sm font-medium text-zinc-300"
          >
            Email address <span className="text-brand">*</span>
          </label>
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            placeholder={compact ? "you@email.com" : "you@example.com"}
            className={`mt-2 ${inputBase} ${pad} ${borderFor("email")}`}
          />
          <Err k="email" />
        </div>

        <div>
          <label
            htmlFor={`${uid}-mobile`}
            className="text-sm font-medium text-zinc-300"
          >
            Mobile number <span className="text-brand">*</span>
          </label>
          <input
            {...field("mobile")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            onBlur={() => blur("mobile")}
            placeholder="09XX XXX XXXX"
            className={`mt-2 ${inputBase} ${pad} ${borderFor("mobile")}`}
          />
          <Err k="mobile" />
        </div>

        {!compact && (
          <div className="sm:col-span-2">
            <label
              htmlFor={`${uid}-property`}
              className="text-sm font-medium text-zinc-300"
            >
              Property of interest{" "}
              <span className="font-normal text-zinc-500">(optional)</span>
            </label>
            <input
              id={`${uid}-property`}
              name="property"
              value={form.property}
              onChange={(e) => set("property", e.target.value)}
              placeholder="Property name, location, or type"
              className={`mt-2 ${inputBase} ${pad} border-white/10`}
            />
          </div>
        )}
      </div>

      {!compact && (
        <fieldset className="mt-7">
          <legend className="text-sm font-medium text-zinc-300">
            Budget range
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {INQUIRY_BUDGETS.map((b) => (
              <label
                key={b.value}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${
                  form.budget === b.value
                    ? "border-brand bg-brand text-white"
                    : "border-white/10 text-zinc-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={b.value}
                  checked={form.budget === b.value}
                  onChange={() => set("budget", b.value)}
                  className="sr-only"
                />
                {b.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {!isBrief && (
      <div className={compact ? "mt-4" : "mt-7"}>
        <label
          htmlFor={`${uid}-message`}
          className="text-sm font-medium text-zinc-300"
        >
          Message <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <textarea
          {...field("message")}
          rows={compact ? 2 : 4}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={() => blur("message")}
          placeholder={
            compact
              ? "Preferred viewing dates, unit type, or any questions."
              : "Preferred location, property type, move-in timeline, or any questions."
          }
          className={`mt-2 resize-y ${inputBase} ${pad} ${borderFor("message")}`}
        />
        <Err k="message" />
      </div>
      )}

      {/* Honeypot (hidden from people and screen readers) */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </label>
      </div>

      <div className={compact ? "mt-4" : "mt-6"}>
        <label
          className={`flex cursor-pointer items-start gap-3 leading-relaxed text-zinc-400 ${compact ? "text-xs" : "text-sm"}`}
        >
          <input
            {...field("consent")}
            type="checkbox"
            checked={form.consent}
            onChange={(e) => {
              set("consent", e.target.checked);
              setTouched((t) => ({ ...t, consent: true }));
            }}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-white/20 bg-ink-700 accent-[#F97316]"
          />
          <span>
            I agree to be contacted by TPPG about this inquiry. My details will
            be handled in line with our{" "}
            <Link href="/privacy" target="_blank" className="underline decoration-white/30 underline-offset-2 hover:text-white">
              privacy notice
            </Link>{" "}
            and the Data Privacy Act of 2012.
          </span>
        </label>
        <Err k="consent" />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`btn-primary w-full text-[0.95rem] disabled:cursor-wait disabled:opacity-70 ${compact ? "mt-5 py-3" : "mt-7 py-3.5"}`}
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Send inquiry
            <ArrowRight />
          </>
        )}
      </button>
    </form>
  );
}
