import { ArrowRight, ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { CONTACT, OFFICE_DIRECTIONS_URL } from "@/lib/contact";
import { InquiryForm } from "./InquiryForm";

const OPTIONS = [
  {
    icon: PhoneIcon,
    title: "Call us",
    text: "Speak directly with the TPPG team.",
    action: "Call now",
    href: CONTACT.phone.href,
    detail: CONTACT.phone.display,
  },
  {
    icon: MailIcon,
    title: "Email us",
    text: "Send questions or your property requirements.",
    action: "Send an email",
    href: CONTACT.email.href,
    detail: CONTACT.email.display,
  },
  {
    icon: ChatIcon,
    title: "Message us",
    text: `Chat with a specialist on ${CONTACT.messenger.label}.`,
    action: "Open chat",
    href: CONTACT.messenger.href,
    external: true,
  },
  {
    icon: PinIcon,
    title: "Visit our office",
    text: `${CONTACT.office.building}, Mandurriao, Iloilo City.`,
    action: "Get directions",
    href: OFFICE_DIRECTIONS_URL,
    external: true,
  },
];

type Props = { property?: { slug: string; name: string } | null };

/** Hero, contact options, and the inquiry form, all within the first screen on desktop. */
export function ContactIntro({ property }: Props) {
  return (
    <section aria-labelledby="contact-heading" className="relative isolate overflow-hidden pt-16">
      <div aria-hidden className="absolute -left-40 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-[120px]" />

      <div className="container-site grid gap-12 pb-24 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-14 lg:pb-32">
        {/* Left: intro + ways to reach us */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start lg:pt-4">
          <p className="eyebrow rise rise-1">Contact us</p>
          <h1
            id="contact-heading"
            className="rise rise-2 mt-5 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Let’s find the right property{" "}
            <span className="font-serif font-normal italic text-brand-soft">for you.</span>
          </h1>
          <p className="rise rise-3 mt-6 max-w-md leading-relaxed text-zinc-400 sm:text-lg">
            Whether you’re buying your first home, investing in a condominium, or exploring property opportunities,
            our team is here to help.
          </p>

          <h2 className="rise rise-4 mt-12 text-sm font-semibold text-white">How can we help you?</h2>
          <ul className="rise rise-4 mt-4 divide-y divide-white/[0.07] overflow-hidden rounded-xl border border-white/[0.08] bg-ink-800">
            {OPTIONS.map(({ icon: Icon, ...o }) => (
              <li key={o.title}>
                <a
                  href={o.href}
                  {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  title={o.detail}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-ink text-brand-soft transition-colors group-hover:border-brand/50">
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">{o.title}</span>
                    <span className="block text-sm text-zinc-400">{o.text}</span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-white sm:inline-flex">
                    {o.action}
                    <ArrowRight className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand sm:hidden" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: inquiry form */}
        <div id="inquire" className="scroll-mt-24 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="border-b border-white/[0.07] px-6 py-6 sm:px-8">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">Tell us what you’re looking for</h2>
              <p className="mt-1.5 text-sm text-zinc-400">
                {property
                  ? `You’re asking about ${property.name}. A specialist will get back to you with details.`
                  : "A property specialist will get back to you with options that fit."}
              </p>
            </div>
            <InquiryForm property={property} />
          </div>
        </div>
      </div>
    </section>
  );
}
