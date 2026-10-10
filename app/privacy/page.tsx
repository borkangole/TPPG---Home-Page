import { CONTACT, OFFICE_ADDRESS } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo/metadata";

// DRAFT privacy notice based on the Data Privacy Act of 2012 (RA 10173).
// Have TPPG's data protection officer or counsel review it, and fill in the DPO contact, before launch.

export const metadata = buildMetadata({
  title: "Privacy Notice",
  description: "How The Premier Property Group collects, uses, and protects the personal information you share through this website.",
  path: "/privacy",
});

const EFFECTIVE = "October 10, 2026";

const SECTIONS: { heading: string; body: (string | string[])[] }[] = [
  {
    heading: "Who we are",
    body: [
      `The Premier Property Group (“TPPG”, “we”) is a real estate sales organization based in ${OFFICE_ADDRESS}. This notice explains how we handle personal information collected through this website, in line with the Data Privacy Act of 2012 (Republic Act No. 10173).`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "When you send an inquiry, request a shortlist, or contact us, we collect:",
      [
        "Your name, email address, and mobile number.",
        "Details of your inquiry, such as the property or unit you’re interested in, your budget range, preferred location, and your message.",
        "The page you sent the inquiry from, so we can follow up on the right property.",
      ],
    ],
  },
  {
    heading: "How we use it",
    body: [
      [
        "To respond to your inquiry and assign a TPPG property specialist to assist you.",
        "To send you the property information, computations, and viewing schedules you asked for.",
        "To keep a record of our communication with you.",
      ],
      "We do not sell your personal information.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      [
        "TPPG property specialists and staff who handle your inquiry.",
        "Property developers, only when needed to process a viewing, reservation, or purchase you choose to pursue.",
        "Service providers that host our website and database, under appropriate safeguards.",
      ],
    ],
  },
  {
    heading: "How long we keep it",
    body: ["We keep your information only for as long as needed for the purposes above, or as required by law, and then dispose of it securely."],
  },
  {
    heading: "Your rights",
    body: [
      "Under the Data Privacy Act, you have the right to be informed, to access, to object, to correct, to have your data erased or blocked, to data portability, to claim damages, and to file a complaint with the National Privacy Commission.",
      "To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    heading: "Contact us",
    body: [`Email: ${CONTACT.email.display}`, `Office: ${OFFICE_ADDRESS}`],
  },
];

export default function PrivacyPage() {
  return (
    <article className="container-site max-w-3xl pb-24 pt-28 sm:pt-32">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Privacy notice</h1>
      <p className="mt-4 text-sm text-zinc-500">Effective {EFFECTIVE}</p>

      {SECTIONS.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-white">{s.heading}</h2>
          {s.body.map((b, i) =>
            Array.isArray(b) ? (
              <ul key={i} className="mt-4 space-y-2.5">
                {b.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-zinc-300">
                    <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i} className="mt-4 leading-relaxed text-zinc-300">
                {b}
              </p>
            ),
          )}
        </section>
      ))}
    </article>
  );
}
