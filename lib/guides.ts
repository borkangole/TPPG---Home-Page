/**
 * Buyer guides (SEO content). General information for Philippine property buyers; have a TPPG
 * specialist review before publishing, and update when policies or developer terms change.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: { title: string; text: string }[] }
  | { type: "table"; caption: string; rows: [string, string][]; note?: string }
  | { type: "tip"; text: string };

export type Guide = {
  slug: string;
  title: string;
  /** Meta description and card excerpt (≈150 characters). */
  description: string;
  category: "Buying basics" | "Payments" | "Choosing a property";
  published: string; // ISO date
  intro: string;
  sections: { heading: string; blocks: Block[] }[];
  /** Where the article's call to action should send the reader. */
  cta: { title: string; text: string; href: string; label: string };
};

export const GUIDES: Guide[] = [
  {
    slug: "how-to-buy-property-in-iloilo",
    title: "How to Buy Property in Iloilo: A Step-by-Step Guide for First-Time Buyers",
    description:
      "From setting a budget to getting your keys: the steps to buying a condo, house and lot, or lot in Iloilo, and what to prepare at each one.",
    category: "Buying basics",
    published: "2026-10-10",
    intro:
      "Buying your first property can feel like a lot of moving parts. It gets much easier when you know the order things happen in. Here is the typical path for buying a condo, house and lot, or lot in Iloilo, from your first budget check to the day you receive your keys.",
    sections: [
      {
        heading: "1. Set your budget and check your financing",
        blocks: [
          {
            type: "p",
            text: "Start with what you can comfortably pay every month, not just the total price. Most buyers pay a downpayment over several months and finance the balance through a bank, a Pag-IBIG housing loan, or the developer’s in-house financing.",
          },
          {
            type: "ul",
            items: [
              "Add up your monthly income and existing obligations.",
              "Decide how much you can set aside for the reservation fee and monthly downpayment.",
              "Ask about financing options early, since each has its own requirements and approval time.",
            ],
          },
        ],
      },
      {
        heading: "2. Choose the area and property type",
        blocks: [
          {
            type: "p",
            text: "Think about your daily routine: where you work, where your children go to school, and how you get around. Mandurriao, home to Iloilo Business Park, suits people who want to be near offices and malls. Jaro and Molo are established districts close to the city center, while towns like Pavia and Oton offer more room for homes and lots.",
          },
          {
            type: "p",
            text: "Then pick the property type that fits your plans: a condominium, a house and lot, or a lot to build on later. Our guide on choosing a property type covers the trade-offs.",
          },
        ],
      },
      {
        heading: "3. Shortlist and tour properties",
        blocks: [
          {
            type: "p",
            text: "Narrow your options to a few projects and visit them. For pre-selling projects you will usually see a showroom or model unit; for ready-for-occupancy units you can inspect the actual home.",
          },
          {
            type: "ul",
            items: [
              "Check the neighborhood at different times of day.",
              "Ask about association dues, parking, and what is included in the unit.",
              "Look up the developer’s completed projects and turnover history.",
            ],
          },
        ],
      },
      {
        heading: "4. Ask for a sample computation",
        blocks: [
          {
            type: "p",
            text: "Before you commit, ask for a written computation for the exact unit you want. It should show the total contract price, reservation fee, downpayment schedule, the balance to be financed, and any other fees. This is the clearest way to compare projects side by side.",
          },
        ],
      },
      {
        heading: "5. Reserve the unit",
        blocks: [
          {
            type: "p",
            text: "Once you’ve decided, you pay a reservation fee to take the unit off the market and sign a reservation agreement. Reservation fees are usually non-refundable, so read the agreement and confirm the terms before paying.",
          },
        ],
      },
      {
        heading: "6. Submit documents and pay the downpayment",
        blocks: [
          {
            type: "p",
            text: "The developer will ask for documents such as valid government IDs and proof of income. You then pay the downpayment, often in monthly installments, according to the agreed schedule.",
          },
        ],
      },
      {
        heading: "7. Finance the balance",
        blocks: [
          {
            type: "p",
            text: "Near the end of the downpayment period, you apply for the loan that will cover the remaining balance, or arrange to pay it in cash. Approval can take several weeks, so it helps to prepare your documents ahead of time.",
          },
        ],
      },
      {
        heading: "8. Turnover and moving in",
        blocks: [
          {
            type: "p",
            text: "When the unit is complete and your account is in order, the developer schedules turnover. Inspect the unit carefully, list anything that needs fixing, and confirm these are addressed before you accept the keys.",
          },
          {
            type: "tip",
            text: "A TPPG property specialist can walk you through every step, from the first computation to turnover, at your pace.",
          },
        ],
      },
    ],
    cta: {
      title: "Ready to start your search?",
      text: "Tell us your budget and preferred area, and a specialist will send options that fit.",
      href: "/#find-my-property",
      label: "Find my property",
    },
  },
  {
    slug: "tcp-reservation-fee-downpayment-explained",
    title: "TCP, Reservation Fee, and Downpayment Explained: What You’ll Actually Pay",
    description:
      "A plain-language guide to total contract price, reservation fees, monthly downpayments, and financing the balance, with a worked example.",
    category: "Payments",
    published: "2026-10-10",
    intro:
      "Property listings in the Philippines use a handful of payment terms that can be confusing the first time you see them. Here is what each one means, how they fit together, and an example of how a typical payment plan works out.",
    sections: [
      {
        heading: "Total contract price (TCP)",
        blocks: [
          {
            type: "p",
            text: "The total contract price is the full price of the unit as stated in your contract. Depending on the developer, it may or may not include VAT and miscellaneous fees, so always ask what the quoted TCP covers.",
          },
        ],
      },
      {
        heading: "Reservation fee",
        blocks: [
          {
            type: "p",
            text: "The reservation fee holds the unit for you while you prepare your documents and first payments. It is usually deducted from the price or the downpayment, and it is typically non-refundable if you back out, so read the reservation agreement before paying.",
          },
        ],
      },
      {
        heading: "Downpayment",
        blocks: [
          {
            type: "p",
            text: "The downpayment is the portion of the price you pay before turnover. Developers often let you spread it over monthly installments, which is the “monthly DP” you see on our listings. The required percentage and number of months vary by project.",
          },
        ],
      },
      {
        heading: "The balance and how to finance it",
        blocks: [
          {
            type: "p",
            text: "Whatever remains after the downpayment is the balance. Buyers usually pay it through one of these:",
          },
          {
            type: "ul",
            items: [
              "Bank financing: a housing loan from a bank, paid monthly over a set number of years.",
              "Pag-IBIG housing loan: a government-backed option for Pag-IBIG members.",
              "In-house financing: paying the developer directly, usually with faster approval but different rates.",
              "Cash: paying the balance in full, sometimes with a discount.",
            ],
          },
        ],
      },
      {
        heading: "A worked example",
        blocks: [
          {
            type: "table",
            caption: "Example only: a ₱3,000,000 unit with 20% downpayment over 24 months",
            rows: [
              ["Total contract price", "₱3,000,000"],
              ["Reservation fee", "₱20,000"],
              ["Downpayment (20% of TCP)", "₱600,000"],
              ["Downpayment after reservation fee", "₱580,000"],
              ["Monthly downpayment (24 months)", "≈ ₱24,167"],
              ["Balance to finance (80%)", "₱2,400,000"],
            ],
            note: "Actual terms differ per project and developer. Always ask for an official computation for the exact unit.",
          },
        ],
      },
      {
        heading: "Other costs to plan for",
        blocks: [
          {
            type: "p",
            text: "Besides the price itself, set aside money for miscellaneous fees such as title transfer, taxes, and registration, plus move-in costs and, for condos, monthly association dues. Ask for a breakdown so there are no surprises at turnover.",
          },
          {
            type: "tip",
            text: "Every TPPG listing shows the starting price and monthly downpayment. Ask a specialist for a full computation of any unit.",
          },
        ],
      },
    ],
    cta: {
      title: "Want a computation for a specific unit?",
      text: "Browse listings and request a price computation from the property page.",
      href: "/properties",
      label: "Browse properties",
    },
  },
  {
    slug: "pre-selling-vs-rfo",
    title: "Pre-Selling vs Ready-for-Occupancy: Which Property Should You Buy?",
    description:
      "Pre-selling units can cost less and spread out your payments; RFO units let you move in sooner. Here is how to decide which fits your plans.",
    category: "Choosing a property",
    published: "2026-10-10",
    intro:
      "Every listing on our site is marked either pre-selling or ready for occupancy (RFO). The difference affects how much you pay, how you pay it, and when you can move in. Here is how the two compare.",
    sections: [
      {
        heading: "What pre-selling means",
        blocks: [
          {
            type: "p",
            text: "Pre-selling units are sold before or during construction. Developers often offer them at lower launch prices, and the downpayment can be spread across the construction period, which makes the monthly amount easier to manage.",
          },
          {
            type: "ul",
            items: [
              "Lower entry price and longer time to pay the downpayment.",
              "Potential for the unit’s value to rise by the time it’s finished.",
              "You wait until construction is complete, which can take a few years.",
              "You choose from plans and a model unit rather than the actual home.",
            ],
          },
        ],
      },
      {
        heading: "What ready-for-occupancy means",
        blocks: [
          {
            type: "p",
            text: "RFO units are already built. You can inspect the exact unit you’re buying and move in once your payments and paperwork are in order.",
          },
          {
            type: "ul",
            items: [
              "Move in or rent it out soon after purchase.",
              "What you see is what you get: no waiting, no construction risk.",
              "Prices are usually higher than at pre-selling launch.",
              "The downpayment is often due over a shorter period.",
            ],
          },
        ],
      },
      {
        heading: "Which one fits you?",
        blocks: [
          {
            type: "ul",
            items: [
              "Need a place to live soon, or want rental income right away? Look at RFO.",
              "Prefer smaller monthly payments and can wait? Pre-selling may suit you.",
              "Buying as a long-term investment? Pre-selling can offer more room for appreciation.",
            ],
          },
        ],
      },
      {
        heading: "Before you buy pre-selling",
        blocks: [
          {
            type: "p",
            text: "Check that the project has a License to Sell from the Department of Human Settlements and Urban Development (DHSUD), and look at the developer’s record of finishing projects on time. Ask for the target turnover date in writing.",
          },
          {
            type: "tip",
            text: "Use the status filter on our Properties page to see only pre-selling or only RFO listings.",
          },
        ],
      },
    ],
    cta: {
      title: "Compare pre-selling and RFO listings",
      text: "Filter by selling status and see prices side by side on the map.",
      href: "/properties",
      label: "Browse properties",
    },
  },
  {
    slug: "condo-vs-house-and-lot-vs-lot",
    title: "Condo, House and Lot, or Lot: Which Property Type Is Right for You?",
    description:
      "Compare condominiums, house and lot, and residential lots by cost, space, location, and upkeep to find the property type that fits your life.",
    category: "Choosing a property",
    published: "2026-10-10",
    intro:
      "The right property type depends on how you live, what you can spend, and what you want the property to do for you. Here is how condominiums, house and lot, and residential lots compare.",
    sections: [
      {
        heading: "Condominiums",
        blocks: [
          {
            type: "p",
            text: "Condos are usually in central areas close to offices, malls, and schools, with security and amenities managed by the building.",
          },
          {
            type: "ul",
            items: [
              "Best for: first-time buyers, young professionals, and rental investors.",
              "Pros: location, amenities, security, and less upkeep.",
              "Consider: smaller spaces and monthly association dues.",
            ],
          },
        ],
      },
      {
        heading: "House and lot",
        blocks: [
          {
            type: "p",
            text: "A house and lot gives you a home on your own land, often inside a subdivision with a quieter street and room to grow.",
          },
          {
            type: "ul",
            items: [
              "Best for: growing families and buyers upgrading from a condo.",
              "Pros: more space, privacy, and ownership of the land.",
              "Consider: you handle more of the maintenance, and many projects are farther from the city center.",
            ],
          },
        ],
      },
      {
        heading: "Residential lots",
        blocks: [
          {
            type: "p",
            text: "A lot lets you build the home you want, when you’re ready, or hold the land as a long-term investment.",
          },
          {
            type: "ul",
            items: [
              "Best for: buyers who want to design their own home, and long-term investors.",
              "Pros: flexibility and often a lower entry price than a finished home.",
              "Consider: you’ll need a separate budget and time to build.",
            ],
          },
        ],
      },
      {
        heading: "Questions to ask yourself",
        blocks: [
          {
            type: "ul",
            items: [
              "How soon do I need to move in?",
              "How much space do I need now, and in five years?",
              "Do I want to live in it, rent it out, or both?",
              "How much can I pay every month, including dues and upkeep?",
            ],
          },
          {
            type: "p",
            text: "A note for foreign buyers: under Philippine law, foreign nationals generally cannot own land, but they can own condominium units as long as foreign ownership in the project stays within 40%.",
          },
        ],
      },
    ],
    cta: {
      title: "Still deciding?",
      text: "Answer four quick questions and see which properties match you.",
      href: "/#find-my-property",
      label: "Find my property",
    },
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug) ?? null;

/** Rough reading time at ~200 words per minute. */
export function readingMinutes(g: Guide): number {
  const text = [
    g.intro,
    ...g.sections.flatMap((s) =>
      s.blocks.flatMap((b) =>
        b.type === "ul" ? b.items : b.type === "ol" ? b.items.map((i) => `${i.title} ${i.text}`) : b.type === "table" ? b.rows.flat() : [b.text],
      ),
    ),
  ].join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}

export const formatGuideDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
